import { useEffect, useRef, useState } from "react";
import MarcoSimulador from "../SimuladoresJS/MarcoSimulador";
import "../SimuladoresJS/SimuladoresJS.css";
import "./SimuladoresDOM.css";

const crearPistaFalsa = (kind, label) => ({
  kind,
  label,
  readyState: "live",
  enabled: true,
  muted: false,
  id: `sim-${kind}`,
  getSettings: () => ({
    deviceId: "simulado",
    width: kind === "video" ? 1280 : undefined,
    height: kind === "video" ? 720 : undefined,
    sampleRate: kind === "audio" ? 48000 : undefined,
    echoCancellation: kind === "audio" ? true : undefined,
  }),
  stop() {
    this.readyState = "ended";
    this.enabled = false;
    this.muted = true;
  },
});

const crearStreamFalso = () => {
  const pistas = [
    crearPistaFalsa("audio", "Micrófono simulado"),
    crearPistaFalsa("video", "Cámara simulada"),
  ];
  const stream = {
    id: "stream-simulado",
    activo: true,
    getTracks: () => pistas,
    getAudioTracks: () => pistas.filter((p) => p.kind === "audio"),
    getVideoTracks: () => pistas.filter((p) => p.kind === "video"),
    get active() {
      return pistas.some((p) => p.readyState === "live");
    },
    get __fake() {
      return true;
    },
  };
  return stream;
};

export default function SimuladorMedia({ metodoId }) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [modo, setModo] = useState(null);
  const [error, setError] = useState(null);
  const [log, setLog] = useState([]);
  const [salida, setSalida] = useState(null);
  const [, setTick] = useState(0);

  const pushLog = (tipo, texto) =>
    setLog((prev) => [...prev.slice(-24), { tipo, texto, id: Date.now() + Math.random() }]);

  const actualizar = () => setTick((t) => t + 1);

  useEffect(() => {
    if (modo === "real" && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
      videoRef.current.play?.().catch(() => {});
    }
  }, [modo, stream]);

  useEffect(() => {
    return () => {
      const actual = streamRef.current;
      if (actual && !actual.__fake) {
        actual.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const activar = async () => {
    setError(null);
    setSalida(null);
    const anterior = streamRef.current;
    if (anterior) {
      anterior.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
      if (videoRef.current) videoRef.current.srcObject = null;
    }
    const mediaDevices = navigator.mediaDevices;
    if (!mediaDevices?.getUserMedia) {
      const falso = crearStreamFalso();
      streamRef.current = falso;
      setStream(falso);
      setModo("simulado");
      pushLog("warn", "getUserMedia() no está disponible en este navegador: usando stream simulado");
      return;
    }

    try {
      const real = await mediaDevices.getUserMedia({ video: true, audio: true });
      streamRef.current = real;
      setStream(real);
      setModo("real");
      if (videoRef.current) {
        videoRef.current.srcObject = real;
        videoRef.current.play?.().catch(() => {});
      }
      pushLog("ok", "getUserMedia({ video: true, audio: true }) → permisos concedidos");
    } catch (err) {
      const falso = crearStreamFalso();
      streamRef.current = falso;
      setStream(falso);
      setModo("simulado");
      setError(`${err.name}: ${err.message}`);
      pushLog("warn", `⚠️ ${err.name}: usando stream simulado para poder practicar`);
    }
  };

  const detenerTodo = () => {
    const actual = streamRef.current;
    if (!actual) {
      pushLog("warn", "Todavía no hay un stream activo");
      return;
    }
    actual.getTracks().forEach((track) => track.stop());
    if (videoRef.current) videoRef.current.srcObject = null;
    setSalida({
      texto: "stream.getTracks().forEach(track => track.stop());\n\nTodas las pistas quedaron en readyState = \"ended\".",
      tipo: "ok",
    });
    pushLog("ok", "stop() aplicado a todas las pistas");
    actualizar();
  };

  const listar = (filtro) => {
    const actual = streamRef.current;
    if (!actual) {
      pushLog("warn", "Primero activa la cámara y el micrófono");
      return;
    }
    const pistas =
      filtro === "audio"
        ? actual.getAudioTracks()
        : filtro === "video"
          ? actual.getVideoTracks()
          : actual.getTracks();
    const llamada =
      filtro === "audio"
        ? "stream.getAudioTracks()"
        : filtro === "video"
          ? "stream.getVideoTracks()"
          : "stream.getTracks()";

    setSalida({
      texto: `${llamada}\n\nCantidad: ${pistas.length}\n\n${
        pistas.length
          ? pistas
              .map(
                (p, i) =>
                  `[${i}] kind=${p.kind} · label="${p.label || "(sin etiqueta)"}" · readyState=${p.readyState} · enabled=${p.enabled}`,
              )
              .join("\n")
          : "(sin pistas de ese tipo)"
      }`,
      tipo: pistas.length ? "ok" : "warn",
    });
    pushLog(pistas.length ? "ok" : "warn", `${llamada} → ${pistas.length} pista(s)`);
  };

  const alternar = (track) => {
    track.enabled = !track.enabled;
    pushLog(
      "info",
      `track.enabled = ${track.enabled} · la pista sigue ${track.readyState} (la cámara NO se apaga)`,
    );
    actualizar();
  };

  const detenerPista = (track) => {
    track.stop();
    if (track.kind === "video" && videoRef.current) {
      videoRef.current.srcObject = null;
    }
    pushLog("ok", `track.stop() → kind=${track.kind} · readyState=${track.readyState}`);
    actualizar();
  };

  const pistas = stream?.getTracks() ?? [];
  const codigo =
    metodoId === "media-getaudiotracks"
      ? `const stream = await navigator.mediaDevices.getUserMedia({ audio: true });\n\nconst pistasAudio = stream.getAudioTracks();\nconsole.log(pistasAudio);`
      : metodoId === "media-getvideotracks"
        ? `const stream = await navigator.mediaDevices.getUserMedia({ video: true });\n\nconst pistasVideo = stream.getVideoTracks();\nconsole.log(pistasVideo);`
        : metodoId === "media-trackstop"
          ? `const [track] = stream.getTracks();\n\ntrack.stop();\nconsole.log(track.readyState); // "ended"`
          : `const stream = await navigator.mediaDevices.getUserMedia({\n  video: true,\n  audio: true\n});\n\nconst pistas = stream.getTracks();\nconsole.log(pistas);`;

  const consola = log.length ? (
    log.map((linea) => (
      <div key={linea.id} className={`sjs-log__line sjs-log__line--${linea.tipo}`}>
        {linea.texto}
      </div>
    ))
  ) : (
    <span className="log-system">Activa la cámara y el micrófono para empezar...</span>
  );

  return (
    <MarcoSimulador
      icon="🎥"
      titulo={metodoId === "media-trackstop" ? "MediaStreamTrack.stop()" : "MediaStream y sus pistas"}
      descripcion="Solicita acceso real a la cámara y al micrófono. Si el navegador lo bloquea, se activa un stream simulado para que puedas practicar los métodos."
      codigo={codigo}
      consola={consola}
      nota="⚠️ getUserMedia solo funciona en HTTPS o localhost. Al terminar, detén las pistas: la cámara y el micrófono deben liberarse."
    >
      <div className="dom-lab">
        <div>
          <div className="sjs-card__label">
            <span>📷 Vista previa</span>
            <span className={`sjs-tag ${modo === "real" ? "sjs-tag--ok" : modo === "simulado" ? "sjs-tag--warn" : ""}`}>
              {modo === "real" ? "stream real" : modo === "simulado" ? "modo simulado" : "sin stream"}
            </span>
          </div>

          <div className="media-preview">
            {modo === "real" ? (
              <video ref={videoRef} autoPlay playsInline muted />
            ) : (
              <div className="media-preview__empty">
                {modo === "simulado"
                  ? "🧪 Stream simulado: aquí verías la imagen de tu cámara si concedes el permiso."
                  : "Sin cámara activa. Pulsa «Activar cámara y micrófono» para solicitar permisos."}
              </div>
            )}
          </div>

          {error && (
            <div className="sjs-output sjs-output--warn" style={{ marginTop: 12 }}>
              {error}
            </div>
          )}

          <div className="media-tracks">
            {pistas.length ? (
              pistas.map((track, index) => (
                <div key={`${track.kind}-${index}`} className="media-track">
                  <span>{track.kind === "video" ? "🎥" : "🎤"}</span>
                  <strong>{track.kind}</strong>
                  <span>{track.label || "(sin etiqueta)"}</span>
                  <span className={`sjs-tag ${track.readyState === "ended" ? "sjs-tag--bad" : "sjs-tag--ok"}`}>
                    {track.readyState}
                  </span>
                  <span className="sjs-tag">
                    enabled={String(track.enabled)}
                  </span>
                  <button type="button" className="sjs-btn" onClick={() => alternar(track)}>
                    {track.enabled ? "🔇 Silenciar" : "🔊 Activar"}
                  </button>
                  <button type="button" className="sjs-btn sjs-btn--danger" onClick={() => detenerPista(track)}>
                    ⏹ stop()
                  </button>
                </div>
              ))
            ) : (
              <span className="sjs-empty">Sin pistas todavía</span>
            )}
          </div>
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🎛️ Acciones</span>
            <span className="sjs-tag">{pistas.length} pista(s)</span>
          </div>

          <div className="sjs-actions">
            <button type="button" className="sjs-btn sjs-btn--primary" onClick={activar}>
              🎥 Activar cámara y micrófono
            </button>
            <button type="button" className="sjs-btn sjs-btn--danger" onClick={detenerTodo}>
              ⏹ Detener todas
            </button>
          </div>

          <div className="sjs-actions" style={{ marginTop: 12 }}>
            <button
              type="button"
              className={`sjs-btn${metodoId === "media-gettracks" ? " sjs-btn--primary" : ""}`}
              onClick={() => listar("todas")}
            >
              📹 getTracks()
            </button>
            <button
              type="button"
              className={`sjs-btn${metodoId === "media-getaudiotracks" ? " sjs-btn--primary" : ""}`}
              onClick={() => listar("audio")}
            >
              🎤 getAudioTracks()
            </button>
            <button
              type="button"
              className={`sjs-btn${metodoId === "media-getvideotracks" ? " sjs-btn--primary" : ""}`}
              onClick={() => listar("video")}
            >
              🎥 getVideoTracks()
            </button>
          </div>

          <div className="sjs-note" style={{ marginTop: 14 }}>
            💡 <code>enabled = false</code> solo silencia o pausa la pista: el
            dispositivo sigue encendido. <code>stop()</code> apaga la cámara de
            verdad y la deja en <code>"ended"</code>.
          </div>
        </div>
      </div>

      {salida && (
        <div className={`sjs-output sjs-output--${salida.tipo}`} style={{ marginTop: 14 }}>
          {salida.texto}
        </div>
      )}
    </MarcoSimulador>
  );
}
