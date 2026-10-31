import { useEffect, useRef, useState } from "react";
import CodeBlock from "../CodeBlock/CodeBlock";
import "../SimuladorFind/SimuladorFind.css";
import "./SimuladoresJS.css";

const CONFIG = {
  settimeout: {
    tipo: "timeout",
    delay: 3000,
    icon: "⏳",
    nombre: "setTimeout()",
    intro:
      "Programa un callback, observa la cuenta regresiva y comprueba que el código sigue ejecutándose sin bloquearse.",
    cancelar: "clearTimeout(id)",
    callback: 'console.log("⏰ ¡Tiempo cumplido!")',
  },
  cleartimeout: {
    tipo: "timeout",
    delay: 5000,
    icon: "❌",
    nombre: "clearTimeout()",
    intro:
      "Programa un temporizador y cancélalo antes de que se cumpla. El callback nunca llegará a la cola de tareas.",
    cancelar: "clearTimeout(id)",
    callback: 'console.log("💥 Anuncio que no debería verse")',
  },
  setinterval: {
    tipo: "interval",
    delay: 1000,
    icon: "🔁",
    nombre: "setInterval()",
    intro:
      "Inicia un ciclo y mira cómo el callback se repite cada intervalo hasta que lo detienes.",
    cancelar: "clearInterval(id)",
    callback: 'console.log("🔁 tick del intervalo")',
  },
  clearinterval: {
    tipo: "interval",
    delay: 1000,
    icon: "🛑",
    nombre: "clearInterval()",
    intro:
      "Deja correr el intervalo unos cuantos ticks y detenlo con clearInterval(). El ciclo se corta de inmediato.",
    cancelar: "clearInterval(id)",
    callback: 'console.log("⏹️ tick antes de detener")',
  },
};

export default function SimuladorTemporizador({ metodoId }) {
  const config = CONFIG[metodoId] ?? CONFIG.settimeout;
  const esIntervalo = config.tipo === "interval";

  const [delay, setDelay] = useState(config.delay);
  const [estado, setEstado] = useState("idle"); // idle | running | done | cancelled
  const [restante, setRestante] = useState(config.delay);
  const [ticks, setTicks] = useState(0);
  const [logs, setLogs] = useState([]);

  const tickRef = useRef(0);
  const ticksRef = useRef(0);

  const agregarLog = (texto, tipo = "info") => {
    setLogs((prev) => [...prev, { id: Date.now() + Math.random(), texto, tipo }]);
  };

  useEffect(() => {
    if (estado !== "running") return undefined;

    const id = window.setInterval(() => {
      tickRef.current += 100;
      const izquierda = delay - tickRef.current;

      if (izquierda > 0) {
        setRestante(izquierda);
        return;
      }

      if (esIntervalo) {
        tickRef.current = 0;
        ticksRef.current += 1;
        setTicks(ticksRef.current);
        setRestante(delay);
        agregarLog(`🔁 Tick #${ticksRef.current}: callback ejecutado`, "ok");
      } else {
        setRestante(0);
        setEstado("done");
        agregarLog("✅ Tiempo cumplido: el callback se ejecuta", "ok");
      }
    }, 100);

    return () => window.clearInterval(id);
  }, [estado, delay, esIntervalo]);

  const iniciar = () => {
    tickRef.current = 0;
    ticksRef.current = 0;
    setTicks(0);
    setRestante(delay);
    setEstado("running");
    setLogs([
      {
        id: Date.now(),
        texto: `▶ ${config.nombre} programado con ${delay} ms (id = 1)`,
        tipo: "info",
      },
    ]);
  };

  const cancelar = () => {
    const transcurrido = Math.max(0, delay - restante);
    setEstado("cancelled");
    agregarLog(
      `❌ ${config.cancelar} → cancelado tras ${transcurrido} ms`,
      "bad",
    );
    agregarLog("🚫 El callback nunca llega a la cola de tareas", "warn");
  };

  const reiniciar = () => {
    tickRef.current = 0;
    ticksRef.current = 0;
    setTicks(0);
    setRestante(delay);
    setEstado("idle");
    setLogs([]);
  };

  const progreso =
    estado === "done"
      ? 100
      : estado === "idle"
        ? 0
        : Math.min(100, Math.max(0, ((delay - restante) / delay) * 100));

  const estadoTexto =
    estado === "running"
      ? esIntervalo
        ? "En ejecución"
        : "Esperando..."
      : estado === "done"
        ? "Ejecutado"
        : estado === "cancelled"
          ? "Cancelado"
          : "Detenido";

  const codigo = esIntervalo
    ? `const id = setInterval(() => {
  ${config.callback};
}, ${delay});

// Detener el ciclo
${config.cancelar};`
    : `const id = setTimeout(() => {
  ${config.callback};
}, ${delay});

// Cancelar antes de que se cumpla
clearTimeout(id);`;

  return (
    <div className="sim-container sjs-sim">
      <div className="sim-header">
        <h3>
          {config.icon} Simulador interactivo: <code>{config.nombre}</code>
        </h3>
        <p className="sjs-intro">{config.intro}</p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">Temporizador en el Event Loop</div>

        <div className="sjs-toolbar">
          <label className="sjs-field">
            <span>Retraso (ms)</span>
            <input
              className="sjs-input sjs-input--short"
              type="number"
              min="200"
              step="100"
              value={delay}
              disabled={estado === "running"}
              onChange={(e) => {
                const valor = Math.max(200, Number(e.target.value) || 200);
                setDelay(valor);
                setRestante(valor);
              }}
            />
          </label>

          <button
            type="button"
            className="sjs-btn sjs-btn--primary"
            onClick={iniciar}
            disabled={estado === "running"}
          >
            ▶ {esIntervalo ? "Iniciar intervalo" : "Programar timeout"}
          </button>

          <button
            type="button"
            className="sjs-btn sjs-btn--danger"
            onClick={cancelar}
            disabled={estado !== "running"}
          >
            🛑 {config.cancelar}
          </button>

          <button type="button" className="sjs-btn" onClick={reiniciar}>
            🔄 Reset
          </button>
        </div>

        <div className="sjs-grid-2">
          <div className="sjs-card">
            <div className="sjs-card__label">
              <span>⏱️ Cuenta</span>
              <span
                className={`sjs-pill ${
                  estado === "running"
                    ? "sjs-pill--pending"
                    : estado === "done"
                      ? "sjs-pill--ok"
                      : estado === "cancelled"
                        ? "sjs-pill--bad"
                        : ""
                }`}
              >
                {estadoTexto}
              </span>
            </div>

            <div className="sjs-status">
              <span>
                Restante: <strong>{(restante / 1000).toFixed(1)} s</strong>
              </span>
              {esIntervalo && (
                <span>
                  Ticks: <strong>{ticks}</strong>
                </span>
              )}
            </div>

            <div className="sjs-progress">
              <div
                className={`sjs-progress__fill ${
                  estado === "done"
                    ? "sjs-progress__fill--ok"
                    : estado === "cancelled"
                      ? "sjs-progress__fill--bad"
                      : ""
                }`}
                style={{ width: `${progreso}%` }}
              />
            </div>

            <div className="sjs-tags">
              <span className="sjs-tag">delay: {delay} ms</span>
              <span className="sjs-tag">
                {esIntervalo ? "se repite" : "una sola vez"}
              </span>
              {estado === "running" && (
                <span className="sjs-tag sjs-tag--warn">no bloqueante</span>
              )}
            </div>
          </div>

          <div className="sjs-card">
            <div className="sjs-card__label">🧾 Código</div>
            <CodeBlock code={codigo} />
          </div>
        </div>

        <div className="sjs-note">
          {estado === "running" && !esIntervalo && (
            <>
              ⏳ El callback está programado. Pulsa{" "}
              <strong>{config.cancelar}</strong> antes de que llegue a cero para
              cancelarlo.
            </>
          )}
          {estado === "running" && esIntervalo && (
            <>
              🔁 El intervalo se repite indefinidamente. Pulsa{" "}
              <strong>{config.cancelar}</strong> para liberar el temporizador y
              detener los ticks.
            </>
          )}
          {estado === "idle" && (
            <>
              💡 El retraso es el <strong>tiempo mínimo</strong> de espera. El
              callback se ejecuta cuando el hilo principal queda libre.
            </>
          )}
          {estado === "done" && (
            <>
              ✅ El callback ya se ejecutó. Llamar a{" "}
              <code>clearTimeout(id)</code> después no tendría efecto.
            </>
          )}
          {estado === "cancelled" && (
            <>
              🛑 El temporizador fue eliminado del registro. El callback{" "}
              <strong>nunca</strong> llegará a la cola de tareas.
            </>
          )}
        </div>
      </div>

      <div className="sim-console">
        <div className="sim-console-header">Consola · Event Loop</div>
        <div className="sjs-log">
          {logs.length === 0 && (
            <div className="sjs-empty">Esperando ejecución...</div>
          )}
          {logs.map((log) => (
            <div key={log.id} className={`sjs-log__line sjs-log__line--${log.tipo}`}>
              {log.texto}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
