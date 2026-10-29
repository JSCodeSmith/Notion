import { useState } from "react";
import CodeBlock from "../../../components/CodeBlock/CodeBlock";
import "../../../components/SimuladorFind/SimuladorFind.css";
import "./SimuladorConsola.css";

const comillas = (texto) => JSON.stringify(texto);

export default function SimuladorContador({ metodoId }) {
  const esReset = metodoId === "console-count-reset";

  const [etiqueta, setEtiqueta] = useState("Usuario procesado");
  const [contadores, setContadores] = useState({});
  const [logs, setLogs] = useState([]);
  const [aviso, setAviso] = useState(null);

  const clave = etiqueta.trim() || "default";
  const actual = contadores[clave] ?? 0;
  const activos = Object.entries(contadores);

  const codigo = `console.${esReset ? "countReset" : "count"}(${comillas(clave)});${
    esReset ? "" : `\n// Contador actual: ${actual} → siguiente: ${actual + 1}`
  }`;

  const incrementar = (veces = 1) => {
    const base = contadores[clave] ?? 0;
    const nuevos = Array.from({ length: veces }, (_, i) => ({
      tipo: "log",
      texto: `${clave}: ${base + i + 1}`,
    }));

    setContadores({ ...contadores, [clave]: base + veces });
    setLogs([...logs, ...nuevos]);
    setAviso(null);
  };

  const reiniciar = () => {
    const existe = contadores[clave] !== undefined;

    if (!existe) {
      setLogs([
        ...logs,
        {
          tipo: "warn",
          texto: `Warning: Count for '${clave}' does not exist`,
        },
      ]);
      setAviso("inexistente");
      return;
    }

    setContadores({ ...contadores, [clave]: 0 });
    setLogs([
      ...logs,
      {
        tipo: "system",
        texto: `🔄 console.countReset(${comillas(clave)}) → contador a 0`,
      },
    ]);
    setAviso("reiniciado");
  };

  const limpiarTodo = () => {
    setContadores({});
    setLogs([]);
    setAviso(null);
  };

  return (
    <div className="sim-container csim-sim">
      <div className="sim-header">
        <h3>
          {esReset ? "🔄" : "🔢"} Simulador Interactivo:{" "}
          <code>{esReset ? "console.countReset()" : "console.count()"}</code>
        </h3>
        <p className="csim-intro">
          {esReset
            ? "Incrementa contadores, cambia de etiqueta y reinicia solo el que te interesa sin borrar la consola. 🧼"
            : "Ejecuta el método varias veces y observa cómo cada etiqueta mantiene su propio contador independiente. 📈"}
        </p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">
          {esReset
            ? "console.countReset() · devuelve a cero un contador concreto"
            : "console.count() · incrementa el contador de la etiqueta actual"}
        </div>

        <div className="csim-controls">
          <label className="csim-field">
            <span>🏷️ Etiqueta</span>
            <input
              className="sim-input csim-input"
              type="text"
              value={etiqueta}
              onChange={(e) => {
                setEtiqueta(e.target.value);
                setAviso(null);
              }}
              placeholder="default"
            />
          </label>

          <div className="csim-field">
            <span>📊 Contador actual</span>
            <div className="csim-counter-badge">
              {clave} <strong>{actual}</strong>
            </div>
          </div>
        </div>

        <div className="csim-code">
          <CodeBlock code={codigo} />
        </div>

        <div className="csim-actions">
          <button
            type="button"
            className={`sim-btn ${!esReset ? "primary" : ""}`}
            onClick={() => incrementar(1)}
          >
            ➕ console.count()
          </button>
          <button
            type="button"
            className={`sim-btn ${esReset ? "primary" : ""}`}
            onClick={reiniciar}
          >
            🔄 console.countReset()
          </button>
          <button
            type="button"
            className="sim-btn"
            onClick={() => incrementar(3)}
          >
            🔁 Simular 3 iteraciones
          </button>
          <button type="button" className="sim-btn" onClick={limpiarTodo}>
            🧹 Limpiar todo
          </button>
        </div>

        {activos.length > 0 && (
          <div className="csim-counter-list">
            {activos.map(([nombre, valor]) => (
              <span
                key={nombre}
                className={`csim-counter-chip ${
                  nombre === clave ? "is-active" : ""
                }`}
              >
                {nombre}: <strong>{valor}</strong>
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="csim-terminal">
        <div className="csim-term-head">
          <span>🖥️ Consola · DevTools</span>
          <span className="csim-term-tag">
            {activos.length} {activos.length === 1 ? "contador" : "contadores"}
          </span>
        </div>
        <div className="csim-term-body">
          {logs.length === 0 ? (
            <span className="csim-empty">
              Esperando ejecución... pulsa <strong>➕ console.count()</strong>. 👀
            </span>
          ) : (
            logs.map((log, i) => (
              <div key={i} className={`csim-line csim-line--${log.tipo}`}>
                <span className="csim-line__icon">
                  {log.tipo === "warn" ? "⚠️" : log.tipo === "system" ? "🔄" : "🔢"}
                </span>
                <span>{log.texto}</span>
              </div>
            ))
          )}

          {aviso === "inexistente" && (
            <div className="csim-note csim-note--warn" style={{ marginTop: 10 }}>
              ⚠️ No existía un contador con la etiqueta{" "}
              <code>{clave}</code>. Algunos navegadores muestran esta advertencia
              y no crean el contador.
            </div>
          )}

          {aviso === "reiniciado" && (
            <div className="csim-note" style={{ marginTop: 10 }}>
              ✅ El contador <code>{clave}</code> volvió a 0. La próxima llamada a{" "}
              <code>console.count()</code> empezará en 1.
            </div>
          )}
        </div>
      </div>

      <div className="csim-note">
        💡 Cada etiqueta mantiene su propio contador y distingue mayúsculas de
        minúsculas. Si omites la etiqueta, todas las llamadas comparten el
        contador <code>default</code>.
      </div>
    </div>
  );
}
