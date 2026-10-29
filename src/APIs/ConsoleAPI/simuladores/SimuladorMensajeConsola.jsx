import { useState } from "react";
import CodeBlock from "../../../components/CodeBlock/CodeBlock";
import "../../../components/SimuladorFind/SimuladorFind.css";
import "./SimuladorConsola.css";

const CONFIG = {
  "console-error": {
    nombre: "console.error()",
    tipo: "error",
    icon: "❌",
    categoria: "Errors",
    mensaje: "Ocurrió un error al procesar la operación",
    etiquetaOpcion: "Mostrar stack trace",
    opcionDefecto: true,
    nota: "console.error() muestra el mensaje en rojo y añade un stack trace, pero NO detiene la ejecución.",
  },
  "console-warn": {
    nombre: "console.warn()",
    tipo: "warn",
    icon: "⚠️",
    categoria: "Warnings",
    mensaje: "Esta función está obsoleta. Usa la nueva versión",
    etiquetaOpcion: "Mostrar stack trace",
    opcionDefecto: true,
    nota: "console.warn() destaca la advertencia en amarillo. No es un error crítico, pero conviene atenderla.",
  },
  "console-info": {
    nombre: "console.info()",
    tipo: "info",
    icon: "ℹ️",
    categoria: "Info",
    mensaje: "Aplicación inicializada correctamente en el puerto 3000",
    etiquetaOpcion: "Mostrar nivel Info",
    opcionDefecto: true,
    nota: "console.info() se usa para hitos e información del sistema. Su diferencia principal es semántica y de filtrado.",
  },
  "console-debug": {
    nombre: "console.debug()",
    tipo: "debug",
    icon: "🐞",
    categoria: "Verbose",
    mensaje: "[Coordenadas] X: 120, Y: 340",
    etiquetaOpcion: "Activar nivel Verbose",
    opcionDefecto: false,
    nota: "console.debug() está oculto por defecto en las DevTools. Activa el nivel Verbose para verlo.",
  },
};

const STACK = [
  { fn: "procesarPago", file: "app.js", line: 42 },
  { fn: "onSubmit", file: "form.js", line: 18 },
  { fn: "HTMLButtonElement.dispatch", file: "event.js", line: 1 },
];

const escapar = (texto) =>
  String(texto).replace(/\\/g, "\\\\").replace(/"/g, '\\"');

export default function SimuladorMensajeConsola({ metodoId }) {
  const config = CONFIG[metodoId] ?? CONFIG["console-error"];

  const [mensaje, setMensaje] = useState(config.mensaje);
  const [opcion, setOpcion] = useState(config.opcionDefecto);
  const [ejecutado, setEjecutado] = useState(false);

  const esDebugOInfo = metodoId === "console-info" || metodoId === "console-debug";
  const oculto = esDebugOInfo && !opcion;
  const mostrarStack = !esDebugOInfo && opcion;

  const codigo = `console.${metodoId.replace("console-", "")}("${escapar(mensaje)}");`;

  const ejecutar = () => setEjecutado(true);

  const reiniciar = () => {
    setMensaje(config.mensaje);
    setOpcion(config.opcionDefecto);
    setEjecutado(false);
  };

  return (
    <div className="sim-container csim-sim">
      <div className="sim-header">
        <h3>
          {config.icon} Simulador Interactivo: <code>{config.nombre}</code>
        </h3>
        <p className="csim-intro">
          Escribe un mensaje y ejecuta el método para ver cómo lo presenta la
          consola y qué opciones afectan su visibilidad. ✨
        </p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">
          {config.nombre} · nivel {config.categoria}
        </div>

        <div className="csim-controls">
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

          <label className="csim-check">
            <input
              type="checkbox"
              checked={opcion}
              onChange={(e) => {
                setOpcion(e.target.checked);
                setEjecutado(false);
              }}
            />
            <span>{config.etiquetaOpcion}</span>
          </label>
        </div>

        <div className="csim-code">
          <CodeBlock code={codigo} />
        </div>

        <div className="csim-actions">
          <button type="button" className="sim-btn primary" onClick={ejecutar}>
            ▶ Ejecutar
          </button>
          <button type="button" className="sim-btn" onClick={reiniciar}>
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="csim-terminal">
        <div className="csim-term-head">
          <span>🖥️ Consola · DevTools</span>
          <span className="csim-term-tag">{config.categoria}</span>
        </div>
        <div className="csim-term-body">
          {!ejecutado ? (
            <span className="csim-empty">
              Esperando ejecución... pulsa <strong>▶ Ejecutar</strong>. 👀
            </span>
          ) : oculto ? (
            <div className="csim-line csim-line--muted">
              🔇 El mensaje existe, pero está oculto porque el nivel{" "}
              {metodoId === "console-debug" ? "Verbose" : "Info"} está
              desactivado en las DevTools.
            </div>
          ) : (
            <>
              <div className={`csim-line csim-line--${config.tipo}`}>
                <span className="csim-line__icon">{config.icon}</span>
                <span>{mensaje}</span>
              </div>

              {mostrarStack && (
                <div className="csim-stack">
                  {STACK.map((frame) => (
                    <span key={frame.fn} className="csim-frame">
                      at <strong>{frame.fn}</strong> ({frame.file}:{frame.line})
                    </span>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="csim-note">💡 {config.nota}</div>
    </div>
  );
}
