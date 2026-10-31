import { useEffect, useMemo, useRef, useState } from "react";
import MarcoSimulador from "./MarcoSimulador";
import "./SimuladoresExtras.css";

const FRASES = [
  "Hola, esto es una prueba de dictado por voz.",
  "Abre la configuración y activa el modo oscuro.",
  "Busca recetas de pasta en la web.",
];

export default function SimuladorVoz({ metodoId }) {
  const [vista, setVista] = useState(() => {
    if (metodoId === "voz-utterance") return "utterance";
    if (metodoId === "voz-onspeechend") return "speechend";
    if (metodoId === "voz-recognition") return "recognition";
    if (metodoId === "voz-stop") return "stop";
    return "speak";
  });

  /* ---------------- Síntesis de voz ---------------- */
  const [texto, setTexto] = useState("Hola, bienvenido a tus apuntes de JavaScript.");
  const [ritmo, setRitmo] = useState(1);
  const [tono, setTono] = useState(1);
  const [volumen, setVolumen] = useState(1);
  const [idioma, setIdioma] = useState("es-ES");
  const [voz, setVoz] = useState("");
  const [voces, setVoces] = useState([]);
  const [hablando, setHablando] = useState(false);
  const [sintesisLog, setSintesisLog] = useState([]);
  const utteranceRef = useRef(null);

  const synth = typeof window !== "undefined" ? window.speechSynthesis : null;

  useEffect(() => {
    if (!synth) return;
    const cargar = () => setVoces(synth.getVoices() ?? []);
    cargar();
    if (typeof synth.addEventListener === "function") {
      synth.addEventListener("voiceschanged", cargar);
      return () => synth.removeEventListener("voiceschanged", cargar);
    }
    synth.onvoiceschanged = cargar;
    return () => {
      synth.onvoiceschanged = null;
    };
  }, [synth]);

  useEffect(() => () => synth?.cancel(), [synth]);

  const logSintesis = (tipo, msg) =>
    setSintesisLog((prev) => [...prev.slice(-7), { tipo, msg }]);

  const hablar = () => {
    if (!synth) {
      logSintesis("error", "❌ speechSynthesis no está disponible en este navegador.");
      return;
    }
    synth.cancel();
    const utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = idioma;
    utterance.rate = Number(ritmo);
    utterance.pitch = Number(tono);
    utterance.volume = Number(volumen);
    const elegida = voces.find((v) => v.name === voz);
    if (elegida) utterance.voice = elegida;

    utterance.onstart = () => {
      setHablando(true);
      logSintesis("success", "▶ start · el navegador empieza a leer");
    };
    utterance.onboundary = (evento) => {
      const palabra = texto.slice(evento.charIndex).split(/\s+/)[0];
      logSintesis("iteration", `⟶ boundary · palabra «${palabra}» (charIndex ${evento.charIndex})`);
    };
    utterance.onpause = () => logSintesis("warn", "⏸ pause");
    utterance.onresume = () => logSintesis("iteration", "▶ resume");
    utterance.onend = () => {
      setHablando(false);
      logSintesis("success", "🏁 end · la lectura ha terminado");
    };
    utterance.onerror = (evento) => {
      setHablando(false);
      logSintesis("error", `❌ error · ${evento.error || "desconocido"}`);
    };

    utteranceRef.current = utterance;
    synth.speak(utterance);
    logSintesis(
      "system",
      `speechSynthesis.speak(utterance) · ${synth.pending ? "en cola" : "hablando"} · lang=${idioma}`,
    );
  };

  const control = (accion) => {
    if (!synth) return;
    if (accion === "pause") {
      synth.pause();
      logSintesis("warn", "speechSynthesis.pause()");
    } else if (accion === "resume") {
      synth.resume();
      logSintesis("iteration", "speechSynthesis.resume()");
    } else {
      synth.cancel();
      setHablando(false);
      logSintesis("error", "speechSynthesis.cancel() · se vacía la cola");
    }
  };

  /* ---------------- Reconocimiento (simulado) ---------------- */
  const [escuchando, setEscuchando] = useState(false);
  const [transcripcion, setTranscripcion] = useState("");
  const [parcial, setParcial] = useState("");
  const [continuo, setContinuo] = useState(false);
  const [soporte] = useState(
    () =>
      typeof window !== "undefined" &&
      Boolean(window.SpeechRecognition || window.webkitSpeechRecognition),
  );
  const [recLog, setRecLog] = useState([]);
  const timersRef = useRef([]);

  const logRec = (tipo, msg) => setRecLog((prev) => [...prev.slice(-10), { tipo, msg }]);

  const limpiarTimers = () => {
    timersRef.current.forEach((id) => clearTimeout(id));
    timersRef.current = [];
  };

  useEffect(() => () => limpiarTimers(), []);

  const programar = (fn, ms) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  };

  const iniciarDictado = () => {
    limpiarTimers();
    setEscuchando(true);
    setTranscripcion("");
    setParcial("");
    const frase = FRASES[Math.floor(Math.random() * FRASES.length)];
    const palabras = frase.split(" ");

    logRec("success", "speechstart · el micrófono detecta voz");
    palabras.forEach((_, indice) => {
      programar(() => {
        setParcial(palabras.slice(0, indice + 1).join(" "));
        logRec("iteration", `result (interino) · «${palabras.slice(0, indice + 1).join(" ")}»`);
      }, 350 * (indice + 1));
    });

    const finParcial = 350 * (palabras.length + 1);
    programar(() => {
      setParcial("");
      setTranscripcion(frase);
      logRec("success", `result (final) · «${frase}»`);
      logRec("success", "speechend · el usuario deja de hablar");
    }, finParcial);

    programar(() => {
      setEscuchando(false);
      logRec("system", "end · el reconocimiento se detiene");
      if (continuo) {
        logRec("warn", "continuous: true · el navegador puede reiniciarse solo");
      }
    }, finParcial + 700);
  };

  const detener = (modo = "stop") => {
    limpiarTimers();
    if (!escuchando) {
      logRec("error", "❌ InvalidStateError: recognition no está activo.");
      return;
    }
    if (modo === "abort") {
      setParcial("");
      setEscuchando(false);
      logRec("error", "abort() · se descartan los resultados pendientes");
      logRec("system", "end · sin resultado final");
      return;
    }
    setEscuchando(false);
    if (parcial) {
      setTranscripcion(parcial);
      setParcial("");
      logRec("warn", `stop() · se entrega el resultado parcial «${parcial}»`);
    } else {
      logRec("system", "stop() · deja de escuchar y espera el resultado final");
    }
    logRec("success", "speechend → end · el dictado termina de forma ordenada");
  };

  /* ---------------- Métricas ---------------- */
  const objetos = useMemo(
    () => [
      ["speechSynthesis", synth ? "✅ disponible" : "❌ no disponible"],
      ["SpeechRecognition", soporte ? "✅ disponible" : "⚠️ solo en navegadores compatibles"],
      ["voces instaladas", String(voces.length)],
      ["utterance.lang", idioma],
      ["utterance.rate", String(ritmo)],
      ["utterance.pitch", String(tono)],
    ],
    [synth, soporte, voces.length, idioma, ritmo, tono],
  );

  const codigo =
    vista === "speak"
      ? `const utterance = new SpeechSynthesisUtterance("${texto.slice(0, 48)}…");
utterance.lang = "${idioma}";
utterance.rate = ${ritmo};
speechSynthesis.speak(utterance);`
      : vista === "utterance"
        ? `const utterance = new SpeechSynthesisUtterance(texto);

utterance.lang = "es-ES";   // idioma
utterance.rate = 1;         // velocidad (0.1 - 10)
utterance.pitch = 1;        // tono (0 - 2)
utterance.volume = 1;       // volumen (0 - 1)

utterance.onstart = () => console.log("start");
utterance.onend = () => console.log("end");`
        : vista === "speechend"
          ? `recognition.onspeechend = () => {
  console.log("El usuario ha dejado de hablar");
  recognition.stop();
};

// También con addEventListener:
recognition.addEventListener("speechend", handler);`
          : vista === "recognition"
            ? `const recognition = new (window.SpeechRecognition ||
  window.webkitSpeechRecognition)();

recognition.lang = "es-ES";
recognition.continuous = ${continuo};
recognition.interimResults = true;

recognition.onresult = (event) => {
  const texto = event.results[0][0].transcript;
  console.log(texto);
};

recognition.start();`
            : `recognition.stop();   // termina y entrega el resultado
recognition.abort();  // cancela y descarta el resultado`;

  return (
    <MarcoSimulador
      icon="🗣️"
      titulo="Síntesis y reconocimiento de voz"
      descripcion="Escucha texto con voces reales del navegador y simula un dictado para entender los eventos de SpeechRecognition."
      codigo={codigo}
      nota={
        <>
          💡 La síntesis usa la API real (<code>speechSynthesis</code>). El dictado está
          simulado para no pedir permiso de micrófono: reproduce el orden{" "}
          <code>speechstart → result → speechend → end</code>.
        </>
      }
      consola={
        vista === "speak" || vista === "utterance" ? (
          <>
            <div className="log-system">🔊 SpeechSynthesis</div>
            {sintesisLog.length === 0 ? (
              <span className="log-system">Pulsa «Hablar» para empezar.</span>
            ) : (
              sintesisLog.map((linea, i) => (
                <div key={i} className={`log-${linea.tipo}`}>
                  {linea.msg}
                </div>
              ))
            )}
            <div className="log-system">
              speechSynthesis.speaking → {String(hablando)} · pending →{" "}
              {String(Boolean(synth?.pending))} · paused → {String(Boolean(synth?.paused))}
            </div>
          </>
        ) : (
          <>
            <div className="log-system">🎙️ SpeechRecognition (simulado)</div>
            {recLog.length === 0 ? (
              <span className="log-system">Inicia un dictado para ver los eventos.</span>
            ) : (
              recLog.map((linea, i) => (
                <div key={i} className={`log-${linea.tipo}`}>
                  {linea.msg}
                </div>
              ))
            )}
          </>
        )
      }
    >
      <div className="sjs-actions">
        <button
          type="button"
          className={`sjs-btn ${vista === "speak" ? "sjs-btn--primary" : ""}`}
          onClick={() => setVista("speak")}
        >
          🔊 speak()
        </button>
        <button
          type="button"
          className={`sjs-btn ${vista === "utterance" ? "sjs-btn--primary" : ""}`}
          onClick={() => setVista("utterance")}
        >
          💬 Utterance
        </button>
        <button
          type="button"
          className={`sjs-btn ${vista === "recognition" ? "sjs-btn--primary" : ""}`}
          onClick={() => setVista("recognition")}
        >
          🎙️ recognition
        </button>
        <button
          type="button"
          className={`sjs-btn ${vista === "speechend" ? "sjs-btn--primary" : ""}`}
          onClick={() => setVista("speechend")}
        >
          🏁 onspeechend
        </button>
        <button
          type="button"
          className={`sjs-btn ${vista === "stop" ? "sjs-btn--primary" : ""}`}
          onClick={() => setVista("stop")}
        >
          ⏹️ stop()
        </button>
      </div>

      {(vista === "speak" || vista === "utterance") && (
        <>
          <label className="sjs-field" style={{ marginBottom: 12 }}>
            <span>texto del utterance</span>
            <textarea
              className="sjs-textarea"
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </label>

          <div className="sjs-grid-3">
            <label className="sjs-field">
              <span>idioma</span>
              <select
                className="sjs-select"
                value={idioma}
                onChange={(e) => setIdioma(e.target.value)}
              >
                {["es-ES", "es-MX", "en-US", "fr-FR", "de-DE"].map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </label>
            <label className="sjs-field">
              <span>voz ({voces.length})</span>
              <select
                className="sjs-select"
                value={voz}
                onChange={(e) => setVoz(e.target.value)}
              >
                <option value="">Automática</option>
                {voces.map((v) => (
                  <option key={v.name} value={v.name}>
                    {v.name} · {v.lang}
                  </option>
                ))}
              </select>
            </label>
            <label className="sjs-field">
              <span>rate · {ritmo}</span>
              <input
                className="sjs-input"
                type="range"
                min="0.5"
                max="2"
                step="0.1"
                value={ritmo}
                onChange={(e) => setRitmo(e.target.value)}
              />
            </label>
            <label className="sjs-field">
              <span>pitch · {tono}</span>
              <input
                className="sjs-input"
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={tono}
                onChange={(e) => setTono(e.target.value)}
              />
            </label>
            <label className="sjs-field">
              <span>volume · {volumen}</span>
              <input
                className="sjs-input"
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={volumen}
                onChange={(e) => setVolumen(e.target.value)}
              />
            </label>
            <label className="sjs-check" style={{ alignSelf: "end" }}>
              <input
                type="checkbox"
                checked={vista === "utterance"}
                onChange={() => setVista(vista === "utterance" ? "speak" : "utterance")}
              />
              modo utterance
            </label>
          </div>

          <div className="sjs-actions" style={{ marginTop: 14 }}>
            <button type="button" className="sjs-btn sjs-btn--primary" onClick={hablar}>
              ▶️ speak(utterance)
            </button>
            <button type="button" className="sjs-btn" onClick={() => control("pause")}>
              ⏸ pause()
            </button>
            <button type="button" className="sjs-btn" onClick={() => control("resume")}>
              ⏵ resume()
            </button>
            <button type="button" className="sjs-btn sjs-btn--danger" onClick={() => control("cancel")}>
              🛑 cancel()
            </button>
          </div>
        </>
      )}

      {vista !== "speak" && vista !== "utterance" && (
        <>
          <div className="sjs-grid-2">
            <div className="sjs-card">
              <div className="sjs-card__label">
                <span>🎙️ Micrófono</span>
                <span
                  className={`sjs-pill ${escuchando ? "sjs-pill--ok" : "sjs-pill--pending"}`}
                >
                  {escuchando ? "escuchando" : "en espera"}
                </span>
              </div>

              <div className={`ex-mic ${escuchando ? "is-listening" : ""}`}>
                <div className="ex-mic__ring" />
                <span className="ex-mic__icon">🎙️</span>
              </div>

              <div className="sjs-actions" style={{ justifyContent: "center" }}>
                <button
                  type="button"
                  className="sjs-btn sjs-btn--primary"
                  onClick={iniciarDictado}
                  disabled={escuchando}
                >
                  ▶️ start()
                </button>
                <button
                  type="button"
                  className="sjs-btn"
                  onClick={() => detener("stop")}
                  disabled={!escuchando}
                >
                  ⏹️ stop()
                </button>
                <button
                  type="button"
                  className="sjs-btn sjs-btn--danger"
                  onClick={() => detener("abort")}
                  disabled={!escuchando}
                >
                  🛑 abort()
                </button>
              </div>

              <label className="sjs-check" style={{ marginTop: 10 }}>
                <input
                  type="checkbox"
                  checked={continuo}
                  onChange={(e) => setContinuo(e.target.checked)}
                />
                continuous: {String(continuo)}
              </label>
            </div>

            <div className="sjs-card">
              <div className="sjs-card__label">
                <span>📝 Transcripción</span>
                <span className="sjs-tag sjs-tag--info">interimResults</span>
              </div>
              <div className="sjs-output" style={{ minHeight: 90 }}>
                {transcripcion || (
                  <span className="sjs-empty">Aquí aparecerá el texto reconocido…</span>
                )}
                {parcial && (
                  <div style={{ color: "#f3d489", marginTop: 8 }}>
                    {parcial}
                    <span className="ex-caret">▌</span>
                  </div>
                )}
              </div>
              <div className="sjs-tags">
                <span className={`sjs-tag ${soporte ? "sjs-tag--ok" : "sjs-tag--warn"}`}>
                  API {soporte ? "disponible" : "no disponible"}
                </span>
                <span className="sjs-tag">es-ES</span>
                <span className="sjs-tag">continuous: {String(continuo)}</span>
              </div>
            </div>
          </div>

          <div className="sjs-note">
            {vista === "speechend" ? (
              <>
                <strong>speechend</strong> se dispara cuando el usuario deja de hablar,{" "}
                <em>antes</em> de <code>end</code>. En <code>continuous: true</code> puede
                dispararse varias veces: limpia los timers y no inicies otro dictado sin
                comprobar el estado.
              </>
            ) : vista === "stop" ? (
              <>
                <strong>stop()</strong> deja de escuchar y entrega el resultado pendiente;{" "}
                <strong>abort()</strong> lo descarta. En ambos casos llega <code>end</code>, pero
                el flujo de eventos es distinto.
              </>
            ) : (
              <>
                <strong>webkitSpeechRecognition</strong> es el prefijo histórico de Chrome. Usa
                siempre <code>window.SpeechRecognition || window.webkitSpeechRecognition</code> y
                comprueba el soporte antes de instanciarlo.
              </>
            )}
          </div>
        </>
      )}

      <div className="sjs-card" style={{ marginTop: 14 }}>
        <div className="sjs-card__label">
          <span>📊 Estado</span>
        </div>
        <dl className="sjs-kv">
          {objetos.map(([clave, valor]) => (
            <div key={clave} style={{ display: "contents" }}>
              <dt>{clave}</dt>
              <dd>{valor}</dd>
            </div>
          ))}
        </dl>
      </div>
    </MarcoSimulador>
  );
}
