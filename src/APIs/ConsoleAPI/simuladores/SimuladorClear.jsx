import { useState } from "react";
import CodeBlock from "../../../components/CodeBlock/CodeBlock";
import "../../../components/SimuladorFind/SimuladorFind.css";
import "./SimuladorConsola.css";

const LOGS_INICIALES = [
  { tipo: "log", icon: "🖨️", texto: "Cargando módulo de usuarios..." },
  { tipo: "info", icon: "ℹ️", texto: "Servidor escuchando en el puerto 3000" },
  { tipo: "warn", icon: "⚠️", texto: "La caché está deshabilitada en desarrollo" },
  { tipo: "log", icon: "🖨️", texto: "Petición GET /api/usuarios → 200 OK" },
  { tipo: "debug", icon: "🐞", texto: "Render del componente Dashboard (42 ms)" },
];

const LOGS_NUEVOS = [
  { tipo: "system", icon: "🚀", texto: "Iniciando nueva simulación..." },
  { tipo: "log", icon: "🖨️", texto: "Paso 1: datos cargados correctamente" },
  { tipo: "success", icon: "✅", texto: "Proceso finalizado sin errores" },
];

export default function SimuladorClear() {
  const [logs, setLogs] = useState(LOGS_INICIALES);
  const [preserveLog, setPreserveLog] = useState(false);
  const [ultimoIntento, setUltimoIntento] = useState(null);

  const limpiar = () => {
    if (preserveLog) {
      setUltimoIntento("ignorado");
      return;
    }
    setLogs([]);
    setUltimoIntento("limpiado");
  };

  const agregarLogs = () => {
    setLogs((prev) => [...prev, ...LOGS_NUEVOS]);
    setUltimoIntento(null);
  };

  const reiniciar = () => {
    setLogs(LOGS_INICIALES);
    setPreserveLog(false);
    setUltimoIntento(null);
  };

  return (
    <div className="sim-container csim-sim">
      <div className="sim-header">
        <h3>
          🧹 Simulador Interactivo: <code>console.clear()</code>
        </h3>
        <p className="csim-intro">
          Llena la consola de mensajes, activa la opción <strong>Preserve log</strong>{" "}
          y observa cuándo el comando se ignora. ✨
        </p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">
          console.clear() · no recibe argumentos · solo borra la salida visual
        </div>

        <div className="csim-controls">
          <label className="csim-check">
            <input
              type="checkbox"
              checked={preserveLog}
              onChange={(e) => {
                setPreserveLog(e.target.checked);
                setUltimoIntento(null);
              }}
            />
            <span>🛡️ Preserve log (DevTools)</span>
          </label>
        </div>

        <div className="csim-code">
          <CodeBlock code={`console.clear();`} />
        </div>

        <div className="csim-actions">
          <button type="button" className="sim-btn primary" onClick={limpiar}>
            🧹 Ejecutar console.clear()
          </button>
          <button type="button" className="sim-btn" onClick={agregarLogs}>
            🖨️ Generar logs
          </button>
          <button type="button" className="sim-btn" onClick={reiniciar}>
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="csim-terminal">
        <div className="csim-term-head">
          <span>🖥️ Consola · DevTools</span>
          <span className="csim-term-tag">
            {logs.length} {logs.length === 1 ? "mensaje" : "mensajes"}
          </span>
        </div>
        <div className="csim-term-body">
          {logs.length === 0 ? (
            <div className="csim-empty">
              🧽 Consola vacía. {ultimoIntento === "limpiado" && "console.clear() borró el historial visual."}
            </div>
          ) : (
            logs.map((log, i) => (
              <div key={`${log.texto}-${i}`} className={`csim-line csim-line--${log.tipo}`}>
                <span className="csim-line__icon">{log.icon}</span>
                <span>{log.texto}</span>
              </div>
            ))
          )}

          {ultimoIntento === "ignorado" && (
            <div className="csim-note csim-note--warn" style={{ marginTop: 10 }}>
              🛡️ <strong>Preserve log</strong> está activo: la consola ignora{" "}
              <span className="csim-code-inline">console.clear()</span> y conserva
              todos los mensajes anteriores.
            </div>
          )}
        </div>
      </div>

      <div className="csim-note">
        💡 <code>console.clear()</code> no borra variables, memoria ni estado del
        programa: solo vacía el texto visible de la consola. En la mayoría de
        navegadores puedes lograr lo mismo con <strong>Ctrl + L</strong>.
      </div>
    </div>
  );
}
