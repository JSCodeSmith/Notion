import { useState } from "react";
import CodeBlock from "../../../components/CodeBlock/CodeBlock";
import "../../../components/SimuladorFind/SimuladorFind.css";
import "./SimuladorConsola.css";

const ESCENARIOS = {
  comprar: {
    label: "🛒 comprarProducto()",
    titulo: "🔍 Rastro de actualización:",
    codigo: `function actualizarInventario() {
  console.trace("🔍 Rastro de actualización:");
}

function comprarProducto() {
  actualizarInventario();
}

comprarProducto();`,
    frames: [
      { fn: "actualizarInventario", file: "inventario.js", line: 2 },
      { fn: "comprarProducto", file: "carrito.js", line: 6 },
      { fn: "(global)", file: "index.js", line: 9 },
    ],
  },
  cancelar: {
    label: "❌ cancelarPedido()",
    titulo: "🔍 Rastro de cancelación:",
    codigo: `function actualizarInventario() {
  console.trace("🔍 Rastro de cancelación:");
}

function cancelarPedido() {
  actualizarInventario();
}

cancelarPedido();`,
    frames: [
      { fn: "actualizarInventario", file: "inventario.js", line: 2 },
      { fn: "cancelarPedido", file: "pedidos.js", line: 6 },
      { fn: "(global)", file: "index.js", line: 9 },
    ],
  },
  evento: {
    label: "⚡ Manejador de evento",
    titulo: "🧭 Rastro de clic:",
    codigo: `function manejarClic(evento) {
  console.trace("🧭 Rastro de clic:", {
    id: evento.target.id,
    accion: "abrirModal"
  });
}

document
  .querySelector("#abrir-modal")
  .addEventListener("click", manejarClic);`,
    frames: [
      { fn: "manejarClic", file: "ui.js", line: 2 },
      { fn: "HTMLButtonElement.dispatch", file: "events.js", line: 1 },
      { fn: "(anonymous)", file: "browser", line: 0 },
    ],
  },
  tiempo: {
    label: "⏱️ Callback asíncrono",
    titulo: "🕐 Rastro asíncrono:",
    codigo: `setTimeout(() => {
  console.trace("🕐 Rastro asíncrono:");
}, 1000);`,
    frames: [
      { fn: "(anonymous)", file: "timers.js", line: 2 },
      { fn: "Timer.processTimers", file: "node:internal/timers", line: 1 },
    ],
  },
};

export default function SimuladorTrace() {
  const [escenario, setEscenario] = useState("comprar");
  const [conContexto, setConContexto] = useState(false);
  const [ejecutado, setEjecutado] = useState(false);

  const config = ESCENARIOS[escenario];

  return (
    <div className="sim-container csim-sim">
      <div className="sim-header">
        <h3>
          🧭 Simulador Interactivo: <code>console.trace()</code>
        </h3>
        <p className="csim-intro">
          Dispara la función desde distintos orígenes y observa la pila de
          llamadas que reconstruye la consola. 🧱
        </p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">
          console.trace() · muestra el call stack sin detener la ejecución
        </div>

        <div className="csim-controls">
          <label className="csim-field">
            <span>🎬 Origen de la llamada</span>
            <select
              className="sim-input csim-input"
              value={escenario}
              onChange={(e) => {
                setEscenario(e.target.value);
                setEjecutado(false);
              }}
            >
              {Object.entries(ESCENARIOS).map(([id, item]) => (
                <option key={id} value={id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="csim-check">
            <input
              type="checkbox"
              checked={conContexto}
              onChange={(e) => {
                setConContexto(e.target.checked);
                setEjecutado(false);
              }}
            />
            <span>🏷️ Añadir objeto de contexto</span>
          </label>
        </div>

        <div className="csim-code">
          <CodeBlock code={config.codigo} />
        </div>

        <div className="csim-actions">
          <button
            type="button"
            className="sim-btn primary"
            onClick={() => setEjecutado(true)}
          >
            ▶ Ejecutar
          </button>
          <button
            type="button"
            className="sim-btn"
            onClick={() => {
              setEscenario("comprar");
              setConContexto(false);
              setEjecutado(false);
            }}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="csim-terminal">
        <div className="csim-term-head">
          <span>🖥️ Consola · DevTools</span>
          <span className="csim-term-tag">{config.frames.length} frames</span>
        </div>
        <div className="csim-term-body">
          {!ejecutado ? (
            <span className="csim-empty">
              Esperando ejecución... pulsa <strong>▶ Ejecutar</strong>. 👀
            </span>
          ) : (
            <>
              <div className="csim-trace-header">
                {config.titulo}
                {conContexto && (
                  <span className="csim-code-inline" style={{ marginLeft: 8 }}>
                    {"{ idUsuario: 45 }"}
                  </span>
                )}
              </div>

              <div className="csim-stack" style={{ marginLeft: 0 }}>
                {config.frames.map((frame, i) => (
                  <div key={i} className="csim-trace-frame">
                    <span className="csim-trace-frame__index">{i}</span>
                    <span className="csim-trace-frame__fn">
                      at <strong>{frame.fn}</strong>
                    </span>
                    <span className="csim-trace-frame__file">
                      ({frame.file}
                      <span className="csim-trace-frame__line">
                        {frame.line > 0 ? `:${frame.line}` : ""}
                      </span>
                      )
                    </span>
                  </div>
                ))}
              </div>

              <div className="csim-note" style={{ marginTop: 12 }}>
                💡 El frame <strong>0</strong> es el punto donde se llamó a{" "}
                <code>console.trace()</code>; los siguientes muestran quién llamó
                a esa función, de dentro hacia fuera.
              </div>
            </>
          )}
        </div>
      </div>

      <div className="csim-note">
        💡 Los argumentos opcionales de <code>console.trace()</code> actúan como
        título o contexto del rastro. En DevTools puedes hacer clic en un frame
        para saltar al código fuente.
      </div>
    </div>
  );
}
