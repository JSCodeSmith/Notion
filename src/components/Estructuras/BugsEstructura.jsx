import { useEffect, useMemo, useState } from "react";
import CodeBlock from "../CodeBlock/CodeBlock";
import { ejecutarSandbox } from "./sandbox";
import "./Estructuras.css";

const EMOJI = {
  log: "📘",
  info: "ℹ️",
  warn: "⚠️",
  error: "❌",
  retorno: "🎁",
};

const crearBugs = (metodo) => {
  if (metodo.bugs?.length) return metodo.bugs;
  return (metodo.errores ?? [])
    .filter((error) => typeof error === "object" && error.code)
    .map((error, i) => ({
      titulo: `Error frecuente ${i + 1}`,
      codigo: error.code,
      problemas: [String(error.texto).replace(/\*\*/g, "").replace(/`/g, "")],
      corregido: "",
      explicacion:
        "Compara el código marcado como incorrecto con la versión correcta del ejemplo.",
    }));
};

export default function BugsEstructura({ metodo }) {
  const bugs = useMemo(() => crearBugs(metodo), [metodo]);
  const [activo, setActivo] = useState(0);
  const [analizados, setAnalizados] = useState({});
  const [corregido, setCorregido] = useState(false);
  const [lineas, setLineas] = useState([]);
  const [ejecutando, setEjecutando] = useState(false);

  const bug = bugs[activo];

  useEffect(() => {
    setActivo(0);
    setAnalizados({});
    setCorregido(false);
    setLineas([]);
  }, [metodo.id]);

  useEffect(() => {
    setCorregido(false);
    setLineas([]);
  }, [activo]);

  if (!bug) return null;

  const analizar = async () => {
    setAnalizados((prev) => ({ ...prev, [activo]: true }));
    if (!bug.codigo || ejecutando) return;
    setEjecutando(true);
    setLineas([]);
    const resultado = await ejecutarSandbox(bug.codigo, { timeout: 2200 });
    setLineas(resultado.lineas);
    setEjecutando(false);
  };

  return (
    <div className="est-tool">
      <div className="est-tool__head">
        <div>
          <h4 className="est-tool__title">🐞 Simulador de bugs y linter interactivo</h4>
          <p className="est-tool__sub">
            Elige un error, pulsa <strong>Analizar</strong> para ver qué está mal y ejecuta el
            código roto para comprobar el fallo real. Después compara con la corrección.
          </p>
        </div>
        <span className="est-tool__badge">{bugs.length} caso(s)</span>
      </div>

      <div className="bugs__tabs" role="tablist" aria-label="Errores comunes">
        {bugs.map((b, i) => (
          <button
            key={`${b.titulo}-${i}`}
            type="button"
            className={`bugs__tab${i === activo ? " is-active" : ""}`}
            onClick={() => setActivo(i)}
            role="tab"
            aria-selected={i === activo}
          >
            🐞 {b.titulo ?? `Caso ${i + 1}`}
          </button>
        ))}
      </div>

      <div className="bugs__panel">
        <div className="est-panel">
          <div className="est-panel__label">
            <span>💥 Código con el problema</span>
            <span className="est-chip est-chip--var">bug</span>
          </div>
          <CodeBlock code={bug.codigo} />
          <div className="est-editor__acciones" style={{ marginBottom: 0 }}>
            <button type="button" className="est-btn est-btn--danger" onClick={analizar}>
              {ejecutando ? "⏳ Ejecutando..." : "🔍 Analizar"}
            </button>
            {bug.corregido && (
              <button
                type="button"
                className={`est-btn${corregido ? " est-btn--green" : ""}`}
                onClick={() => setCorregido((v) => !v)}
              >
                {corregido ? "🙈 Ocultar corrección" : "🛠 Ver corrección"}
              </button>
            )}
          </div>

          {analizados[activo] && (
            <div style={{ marginTop: 12 }}>
              <div className="est-panel__label" style={{ marginBottom: 6 }}>
                <span>🧠 Diagnóstico del linter</span>
              </div>
              {bug.problemas?.map((problema, i) => (
                <div
                  key={i}
                  className="bugs__problema"
                  style={{ animationDelay: `${i * 70}ms` }}
                >
                  <span>⚠️</span>
                  <span>{problema}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="est-panel">
          <div className="est-panel__label">
            <span>🖥️ Ejecución real</span>
            <span className="est-chip">{ejecutando ? "corriendo" : "consola"}</span>
          </div>
          <div className="est-console">
            {lineas.length ? (
              lineas.map((linea, i) => (
                <div
                  key={`${linea.tipo}-${i}`}
                  className={`est-console__line est-console__line--${linea.tipo}`}
                  style={{ animationDelay: `${Math.min(i * 50, 350)}ms` }}
                >
                  <span>{EMOJI[linea.tipo] ?? "•"}</span>
                  <span>{linea.texto}</span>
                </div>
              ))
            ) : (
              <p className="est-empty">
                Pulsa <strong>🔍 Analizar</strong> para ejecutar el código roto y ver el error.
              </p>
            )}
          </div>

          {corregido && bug.corregido && (
            <div className="bugs__correccion">
              <strong>✅ Versión corregida</strong>
              <div style={{ marginTop: 8 }}>
                <CodeBlock code={bug.corregido} />
              </div>
              {bug.explicacion && (
                <p style={{ margin: "8px 0 0" }}>💡 {bug.explicacion}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
