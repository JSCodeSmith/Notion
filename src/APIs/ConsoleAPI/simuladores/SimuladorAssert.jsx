import { useState } from "react";
import CodeBlock from "../../../components/CodeBlock/CodeBlock";
import "../../../components/SimuladorFind/SimuladorFind.css";
import "./SimuladorConsola.css";

const ESCENARIOS = {
  carrito: {
    label: "🛒 Carrito de compras",
    valorLabel: "Productos en el carrito",
    defecto: "0",
    mensaje: "El carrito de compras no tiene productos.",
    condicion: (n) => n > 0,
    codigo: (mensaje) => `console.assert(
  carrito.length > 0,
  "${mensaje.replace(/"/g, '\\"')}"
);`,
  },
  nota: {
    label: "🎓 Calificación",
    valorLabel: "Nota recibida",
    defecto: "25",
    mensaje: "La nota está fuera del rango permitido (0 a 20).",
    condicion: (n) => n >= 0 && n <= 20,
    codigo: (mensaje) => `console.assert(
  nota >= 0 && nota <= 20,
  "${mensaje.replace(/"/g, '\\"')}"
);`,
  },
};

const STACK = [
  { fn: "asignarCalificacion", file: "app.js", line: 12 },
  { fn: "registrarNota", file: "form.js", line: 27 },
  { fn: "(global)", file: "index.js", line: 5 },
];

export default function SimuladorAssert() {
  const [escenario, setEscenario] = useState("carrito");
  const [valor, setValor] = useState(ESCENARIOS.carrito.defecto);
  const [mensaje, setMensaje] = useState(ESCENARIOS.carrito.mensaje);
  const [ejecutado, setEjecutado] = useState(false);

  const config = ESCENARIOS[escenario];
  const numero = Number(valor);
  const cumple = Number.isFinite(numero) && config.condicion(numero);
  const codigo = config.codigo(mensaje);

  const cambiarEscenario = (id) => {
    setEscenario(id);
    setValor(ESCENARIOS[id].defecto);
    setMensaje(ESCENARIOS[id].mensaje);
    setEjecutado(false);
  };

  return (
    <div className="sim-container csim-sim">
      <div className="sim-header">
        <h3>
          ✅ Simulador Interactivo: <code>console.assert()</code>
        </h3>
        <p className="csim-intro">
          Cambia el valor y comprueba cómo la consola permanece en silencio si
          la condición se cumple y muestra un error si falla. 🤫
        </p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">
          console.assert() · el mensaje solo se imprime cuando la condición es false
        </div>

        <div className="csim-controls">
          <label className="csim-field">
            <span>🎬 Escenario</span>
            <select
              className="sim-input csim-input"
              value={escenario}
              onChange={(e) => cambiarEscenario(e.target.value)}
            >
              {Object.entries(ESCENARIOS).map(([id, item]) => (
                <option key={id} value={id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="csim-field">
            <span>🔢 {config.valorLabel}</span>
            <input
              className="sim-input csim-input csim-input--short"
              type="number"
              value={valor}
              onChange={(e) => {
                setValor(e.target.value);
                setEjecutado(false);
              }}
            />
          </label>

          <label className="csim-field">
            <span>💬 Mensaje</span>
            <input
              className="sim-input csim-input"
              type="text"
              value={mensaje}
              onChange={(e) => {
                setMensaje(e.target.value);
                setEjecutado(false);
              }}
            />
          </label>
        </div>

        <div className="csim-code">
          <CodeBlock code={codigo} />
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
              setValor(config.defecto);
              setMensaje(config.mensaje);
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
          <span className="csim-term-tag">
            condición: {cumple ? "true ✅" : "false ❌"}
          </span>
        </div>
        <div className="csim-term-body">
          {!ejecutado ? (
            <span className="csim-empty">
              Esperando ejecución... pulsa <strong>▶ Ejecutar</strong>. 👀
            </span>
          ) : cumple ? (
            <div className="csim-line csim-line--success">
              <span className="csim-line__icon">✅</span>
              <span>
                La condición es verdadera. console.assert() no imprime nada: la
                consola queda vacía.
              </span>
            </div>
          ) : (
            <>
              <div className="csim-line csim-line--error">
                <span className="csim-line__icon">❌</span>
                <span>Assertion failed: {mensaje}</span>
              </div>
              <div className="csim-stack">
                {STACK.map((frame) => (
                  <span key={frame.fn} className="csim-frame">
                    at <strong>{frame.fn}</strong> ({frame.file}:{frame.line})
                  </span>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="csim-note">
        💡 Recuerda: `console.assert(condicion, mensaje)` muestra el mensaje
        cuando la condición es <strong>falsa</strong>. No lanza una excepción ni
        detiene el programa.
      </div>
    </div>
  );
}
