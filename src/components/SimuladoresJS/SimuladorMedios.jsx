import { useEffect, useMemo, useRef, useState } from "react";
import MarcoSimulador from "./MarcoSimulador";
import "./SimuladoresExtras.css";

const MIMES = [
  "video/webm",
  "video/webm;codecs=vp9",
  "video/webm;codecs=vp8",
  "video/webm;codecs=h264",
  "video/mp4",
  "video/mp4;codecs=avc1",
  "audio/webm",
  "audio/webm;codecs=opus",
  "audio/mp4",
  "audio/ogg;codecs=opus",
];

const tamano = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

export default function SimuladorMedios({ metodoId }) {
  const [vista, setVista] = useState(() => {
    if (metodoId === "medios-getusermedia") return "camara";
    if (metodoId === "medios-istypesupported") return "tipos";
    if (metodoId === "medios-ondataavailable") return "chunks";
    if (metodoId === "medios-stop") return "stop";
    if (metodoId === "medios-start") return "grabar";
    return "camara";
  });

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const urlRef = useRef(null);
  const timerRef = useRef(null);

  const [stream, setStream] = useState(null);
  const [pistas, setPistas] = useState([]);
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const [conAudio, setConAudio] = useState(true);
  const [conVideo, setConVideo] = useState(true);

  const [grabando, setGrabando] = useState(false);
  const [pausado, setPausado] = useState(false);
  const [chunks, setChunks] = useState([]);
  const [grabacion, setGrabacion] = useState(null);
  const [mime, setMime] = useState("video/webm;codecs=vp9");
  const [timeslice, setTimeslice] = useState("1000");
  const [segundos, setSegundos] = useState(0);
  const [mimeCustom, setMimeCustom] = useState("video/webm;codecs=vp9");
  const [log, setLog] = useState([]);

  const soportes = useMemo(
    () =>
      MIMES.map((tipo) => [
        tipo,
        typeof MediaRecorder !== "undefined" && MediaRecorder.isTypeSupported(tipo),
      ]),
    [],
  );

  const registrar = (tipoLog, msg) =>
    setLog((prev) => [...prev.slice(-9), { tipo: tipoLog, msg }]);

  const refrescarPistas = (s) =>
    setPistas(
      s
        ? s.getTracks().map((pista) => ({
            id: pista.id.slice(0, 8),
            tipo: pista.kind,
            etiqueta: pista.label || "(sin etiqueta)",
            estado: pista.readyState,
            activa: pista.enabled,
          }))
        : [],
    );

  const pedirMedios = async (constraints = { video: conVideo, audio: conAudio }) => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setError("navigator.mediaDevices.getUserMedia no está disponible (necesita HTTPS o localhost).");
      registrar("error", "❌ getUserMedia no disponible");
      return null;
    }
    setCargando(true);
    setError("");
    try {
      const nuevo = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current?.getTracks().forEach((pista) => pista.stop());
      streamRef.current = nuevo;
      setStream(nuevo);
      refrescarPistas(nuevo);
      registrar(
        "success",
        `✅ getUserMedia({ video: ${constraints.video}, audio: ${constraints.audio} }) → MediaStream con ${nuevo.getTracks().length} pista(s)`,
      );
      return nuevo;
    } catch (err) {
      const mensajes = {
        NotAllowedError: "Permiso denegado por el usuario o por la política del navegador.",
        NotFoundError: "No se encontró ninguna cámara o micrófono disponible.",
        NotReadableError: "El dispositivo está siendo usado por otra aplicación.",
        OverconstrainedError: "Las restricciones solicitadas no se pueden cumplir.",
        SecurityError: "El contexto no es seguro (usa HTTPS o localhost).",
      };
      const texto = `${err.name}: ${mensajes[err.name] ?? err.message}`;
      setError(texto);
      registrar("error", `❌ ${texto}`);
      return null;
    } finally {
      setCargando(false);
    }
  };

  const detenerPistas = () => {
    streamRef.current?.getTracks().forEach((pista) => pista.stop());
    streamRef.current = null;
    setStream(null);
    refrescarPistas(null);
    registrar("system", "🛑 Las pistas se han detenido con track.stop()");
  };

  useEffect(() => {
    if (videoRef.current) videoRef.current.srcObject = stream;
  }, [stream]);

  const limpiarGrabacion = () => {
    if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    urlRef.current = null;
    chunksRef.current = [];
    setChunks([]);
    setGrabacion(null);
    setSegundos(0);
  };

  const iniciarGrabacion = async () => {
    if (typeof MediaRecorder === "undefined") {
      setError("MediaRecorder no está disponible en este navegador.");
      registrar("error", "❌ MediaRecorder no disponible");
      return;
    }
    const activo = streamRef.current ?? (await pedirMedios());
    if (!activo) return;

    const soportado = !mime || MediaRecorder.isTypeSupported(mime);
    const opciones = soportado ? { mimeType: mime } : undefined;
    if (!soportado) {
      registrar("error", `⚠️ ${mime} no es compatible; se usa el formato por defecto`);
    }

    limpiarGrabacion();
    let recorder;
    try {
      recorder = new MediaRecorder(activo, opciones);
    } catch (err) {
      setError(`${err.name}: ${err.message}`);
      registrar("error", `❌ ${err.name}: ${err.message}`);
      return;
    }

    recorderRef.current = recorder;
    chunksRef.current = [];

    recorder.onstart = () => {
      setGrabando(true);
      setPausado(false);
      registrar("success", `▶ onstart · state = "${recorder.state}" · mimeType = ${recorder.mimeType || "auto"}`);
    };

    recorder.ondataavailable = (evento) => {
      if (!evento.data || evento.data.size === 0) {
        registrar("warn", "ondataavailable con un Blob vacío: no lo guardes");
        return;
      }
      chunksRef.current.push(evento.data);
      setChunks([...chunksRef.current]);
      registrar(
        "iteration",
        `📦 ondataavailable · ${tamano(evento.data.size)} · ${evento.data.type || "sin tipo"}`,
      );
    };

    recorder.onpause = () => {
      setPausado(true);
      registrar("warn", '⏸ onpause · state = "paused"');
    };
    recorder.onresume = () => {
      setPausado(false);
      registrar("iteration", '▶ onresume · state = "recording"');
    };

    recorder.onerror = (evento) => {
      const err = evento.error ?? evento;
      registrar("error", `❌ onerror · ${err.name || "Error"}: ${err.message || ""}`);
    };

    recorder.onstop = () => {
      setGrabando(false);
      setPausado(false);
      const tipo = recorder.mimeType || mime || "video/webm";
      const blob = new Blob(chunksRef.current, { type: tipo });
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      urlRef.current = blob.size ? URL.createObjectURL(blob) : null;
      setGrabacion({
        size: blob.size,
        type: blob.type || tipo,
        url: urlRef.current,
        trozos: chunksRef.current.length,
      });
      registrar(
        "success",
        `⏹ onstop · Blob final de ${tamano(blob.size)} en ${chunksRef.current.length} trozo(s)`,
      );
    };

    const ms = Number(timeslice);
    if (Number.isFinite(ms) && ms > 0) {
      recorder.start(ms);
      registrar("system", `recorder.start(${ms}) · se emitirá un chunk cada ${ms} ms`);
    } else {
      recorder.start();
      registrar("system", "recorder.start() · un único chunk al detener");
    }
  };

  const detenerGrabacion = () => {
    const recorder = recorderRef.current;
    if (!recorder) return;
    if (recorder.state === "inactive") {
      registrar("error", "❌ InvalidStateError: recorder.state ya es \"inactive\"");
      return;
    }
    recorder.stop();
  };

  useEffect(() => {
    if (!grabando || pausado) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => setSegundos((s) => s + 1), 1000);
    return () => clearInterval(timerRef.current);
  }, [grabando, pausado]);

  useEffect(
    () => () => {
      clearInterval(timerRef.current);
      if (recorderRef.current?.state === "recording") {
        try {
          recorderRef.current.onstop = null;
          recorderRef.current.ondataavailable = null;
          recorderRef.current.stop();
        } catch {
          /* noop */
        }
      }
      streamRef.current?.getTracks().forEach((pista) => pista.stop());
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
    },
    [],
  );

  const codigo =
    vista === "camara"
      ? `const stream = await navigator.mediaDevices.getUserMedia({
  video: true,
  audio: true,
});

video.srcObject = stream;

// Al terminar, libera la cámara:
stream.getTracks().forEach((track) => track.stop());`
      : vista === "tipos"
        ? `MediaRecorder.isTypeSupported("video/webm;codecs=vp9");
// → true o false

const mime = ["video/webm;codecs=vp9", "video/mp4"]
  .find((tipo) => MediaRecorder.isTypeSupported(tipo));`
        : vista === "chunks"
          ? `recorder.ondataavailable = (event) => {
  if (event.data.size > 0) {
    chunks.push(event.data);
  }
};

recorder.start(1000); // un chunk por segundo`
          : vista === "stop"
            ? `btnDetener.addEventListener("click", () => {
  if (recorder.state === "recording") {
    recorder.stop(); // dispara ondataavailable + onstop
  }
});

// track.stop() NO detiene la grabación: hay que llamar a recorder.stop()`
            : `const recorder = new MediaRecorder(stream, { mimeType });
recorder.start(1000); // timeslice opcional

recorder.onstop = () => {
  const blob = new Blob(chunks, { type: recorder.mimeType });
  video.src = URL.createObjectURL(blob);
};`;

  return (
    <MarcoSimulador
      icon="🎥"
      titulo="Cámara, micrófono y MediaRecorder"
      descripcion="Solicita permisos reales, inspecciona las pistas del MediaStream y graba un clip con MediaRecorder."
      codigo={codigo}
      nota={
        <>
          💡 <code>getUserMedia()</code> y <code>MediaRecorder</code> requieren un contexto
          seguro (HTTPS o localhost) y permiso del usuario. <code>track.stop()</code> apaga la
          cámara; <code>recorder.stop()</code> cierra la grabación y emite el último{" "}
          <code>dataavailable</code>.
        </>
      }
      consola={
        <>
          {log.length === 0 ? (
            <span className="log-system">Pide acceso a la cámara para empezar.</span>
          ) : (
            log.map((linea, i) => (
              <div key={i} className={`log-${linea.tipo}`}>
                {linea.msg}
              </div>
            ))
          )}
          {error && <div className="log-error">⚠️ {error}</div>}
        </>
      }
    >
      <div className="sjs-actions">
        {[
          ["camara", "📷 getUserMedia"],
          ["grabar", "⏺️ start()"],
          ["tipos", "🧾 isTypeSupported()"],
          ["chunks", "📦 ondataavailable"],
          ["stop", "⏹️ stop()"],
        ].map(([id, texto]) => (
          <button
            key={id}
            type="button"
            className={`sjs-btn ${vista === id ? "sjs-btn--primary" : ""}`}
            onClick={() => setVista(id)}
          >
            {texto}
          </button>
        ))}
      </div>

      <div className="sjs-grid-2">
        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>📺 MediaStream</span>
            <span
              className={`sjs-pill ${grabando ? "sjs-pill--bad" : stream ? "sjs-pill--ok" : "sjs-pill--pending"}`}
            >
              {grabando ? `REC ${segundos}s` : stream ? "en vivo" : "sin cámara"}
            </span>
          </div>

          <div className="ex-video-stage">
            {stream ? (
              <video
                ref={videoRef}
                className="ex-video"
                autoPlay
                playsInline
                muted
                aria-label="Vista previa de la cámara"
              />
            ) : (
              <div className="ex-video__empty">
                <span>📷</span>
                <p>Sin señal. Pulsa «Pedir cámara».</p>
              </div>
            )}
            {grabando && <span className="ex-rec">● REC</span>}
          </div>

          <div className="sjs-actions" style={{ marginTop: 12 }}>
            <button
              type="button"
              className="sjs-btn sjs-btn--primary"
              onClick={() => pedirMedios()}
              disabled={cargando}
            >
              {cargando ? "⏳ Pidiendo…" : "📷 Pedir cámara"}
            </button>
            <button type="button" className="sjs-btn" onClick={detenerPistas} disabled={!stream}>
              🛑 track.stop()
            </button>
            <label className="sjs-check">
              <input
                type="checkbox"
                checked={conVideo}
                onChange={(e) => setConVideo(e.target.checked)}
              />
              video
            </label>
            <label className="sjs-check">
              <input
                type="checkbox"
                checked={conAudio}
                onChange={(e) => setConAudio(e.target.checked)}
              />
              audio
            </label>
          </div>

          {pistas.length > 0 && (
            <table className="sjs-table" style={{ marginTop: 10 }}>
              <thead>
                <tr>
                  <th>kind</th>
                  <th>label</th>
                  <th>readyState</th>
                </tr>
              </thead>
              <tbody>
                {pistas.map((pista) => (
                  <tr key={pista.id}>
                    <td>{pista.tipo}</td>
                    <td>{pista.etiqueta}</td>
                    <td>{pista.estado}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="sjs-card">
          {vista === "tipos" ? (
            <>
              <div className="sjs-card__label">
                <span>🧾 MediaRecorder.isTypeSupported()</span>
              </div>
              <table className="sjs-table">
                <tbody>
                  {soportes.map(([tipo, soportado]) => (
                    <tr key={tipo}>
                      <td>{tipo}</td>
                      <td style={{ color: soportado ? "#6ee7a0" : "#ff9b9b" }}>
                        {String(soportado)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="sjs-actions" style={{ marginTop: 12 }}>
                <input
                  className="sjs-input"
                  value={mimeCustom}
                  onChange={(e) => setMimeCustom(e.target.value)}
                  spellCheck={false}
                  style={{ flex: 1 }}
                />
                <button
                  type="button"
                  className="sjs-btn"
                  onClick={() =>
                    registrar(
                      typeof MediaRecorder !== "undefined" &&
                        MediaRecorder.isTypeSupported(mimeCustom)
                        ? "success"
                        : "error",
                      `isTypeSupported("${mimeCustom}") → ${String(
                        typeof MediaRecorder !== "undefined" &&
                          MediaRecorder.isTypeSupported(mimeCustom),
                      )}`,
                    )
                  }
                >
                  Comprobar
                </button>
              </div>
            </>
          ) : vista === "chunks" ? (
            <>
              <div className="sjs-card__label">
                <span>📦 Chunks recibidos</span>
                <span className="sjs-tag">{chunks.length}</span>
              </div>
              {chunks.length === 0 ? (
                <div className="sjs-output sjs-output--muted">
                  Graba con un timeslice para ver los chunks llegar uno a uno.
                </div>
              ) : (
                <table className="sjs-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>tamaño</th>
                      <th>tipo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chunks.map((chunk, indice) => (
                      <tr key={indice}>
                        <td>{indice + 1}</td>
                        <td>{tamano(chunk.size)}</td>
                        <td>{chunk.type || "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <div className="sjs-note" style={{ marginTop: 10 }}>
                Con <code>start(1000)</code> llega un bloque por segundo. Sin timeslice solo
                llega un bloque al llamar a <code>stop()</code>.
              </div>
            </>
          ) : vista === "camara" ? (
            <>
              <div className="sjs-card__label">
                <span>🎛️ Restricciones</span>
              </div>
              <div className="sjs-output">{`{\n  video: ${conVideo},\n  audio: ${conAudio}\n}`}</div>
              <div className="sjs-tags">
                <span className="sjs-tag">MediaStream</span>
                <span className="sjs-tag">Promise&lt;MediaStream&gt;</span>
                <span className="sjs-tag sjs-tag--warn">requiere permiso</span>
              </div>
              <div className="sjs-note" style={{ marginTop: 10 }}>
                Si el usuario deniega el permiso, la promesa se rechaza con{" "}
                <code>NotAllowedError</code>. Nunca olvides <code>track.stop()</code> al
                terminar.
              </div>
            </>
          ) : (
            <>
              <div className="sjs-card__label">
                <span>⏺️ MediaRecorder</span>
                <span className="sjs-tag">
                  {grabando ? (pausado ? "paused" : "recording") : "inactive"}
                </span>
              </div>
              <label className="sjs-field" style={{ marginBottom: 8 }}>
                <span>mimeType</span>
                <select className="sjs-select" value={mime} onChange={(e) => setMime(e.target.value)}>
                  {MIMES.map((tipo) => (
                    <option key={tipo} value={tipo}>
                      {tipo}
                    </option>
                  ))}
                </select>
              </label>
              <label className="sjs-field" style={{ marginBottom: 10 }}>
                <span>timeslice (ms, 0 = sin cortes)</span>
                <input
                  className="sjs-input"
                  value={timeslice}
                  onChange={(e) => setTimeslice(e.target.value)}
                  inputMode="numeric"
                />
              </label>
              <div className="sjs-actions">
                {!grabando ? (
                  <button
                    type="button"
                    className="sjs-btn sjs-btn--primary"
                    onClick={iniciarGrabacion}
                  >
                    ⏺️ start({timeslice || "—"})
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      className="sjs-btn"
                      onClick={() =>
                        pausado ? recorderRef.current?.resume() : recorderRef.current?.pause()
                      }
                    >
                      {pausado ? "▶ resume()" : "⏸ pause()"}
                    </button>
                    <button
                      type="button"
                      className="sjs-btn sjs-btn--danger"
                      onClick={detenerGrabacion}
                    >
                      ⏹️ stop()
                    </button>
                  </>
                )}
              </div>

              {grabacion && (
                <div style={{ marginTop: 12 }}>
                  <div className="sjs-output sjs-output--ok">
                    Blob {tamano(grabacion.size)} · {grabacion.trozos} trozo(s) ·{" "}
                    {grabacion.type || "sin tipo"}
                  </div>
                  {grabacion.url && (
                    <a
                      className="sjs-btn"
                      style={{ display: "inline-block", marginTop: 8, textDecoration: "none" }}
                      href={grabacion.url}
                      download={`grabacion.${grabacion.type.includes("mp4") ? "mp4" : "webm"}`}
                    >
                      ⬇️ Descargar grabación
                    </a>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </MarcoSimulador>
  );
}
