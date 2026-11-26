import { useEffect, useMemo, useRef, useState } from "react";
import { ejecutarSandbox } from "./sandbox";
import "./Estructuras.css";

const EMOJI = {
  log: "📘",
  info: "ℹ️",
  warn: "⚠️",
  error: "❌",
  retorno: "🎁",
};

export default function EditorEstructura({ metodo }) {
  const config = metodo.editor ?? {};
  const retos = useMemo(() => config.retos ?? [], [config.retos]);
  const [retoActivo, setRetoActivo] = useState(0);
  const inicial = retos[retoActivo]?.codigo ?? config.inicial ?? metodo.ejemplos?.[0]?.code ?? "";
  const consigna =
    retos[retoActivo]?.consigna ??
    config.consigna ??
    "Edita el código, ejecútalo y observa cada salida. Prueba a cambiar valores para comprobar que entiendes la estructura.";
  const pista = retos[retoActivo]?.pista ?? config.pista ?? "Ctrl + Enter para ejecutar";

  const [codigo, setCodigo] = useState(inicial);
  const [lineas, setLineas] = useState([]);
  const [ejecutando, setEjecutando] = useState(false);
  const [tiempo, setTiempo] = useState(null);
  const areaRef = useRef(null);

  useEffect(() => {
    setCodigo(inicial);
    setLineas([]);
    setTiempo(null);
  }, [metodo.id, retoActivo, inicial]);

  const ejecutar = async () => {
    if (ejecutando) return;
    setEjecutando(true);
    setLineas([]);
    const inicio = performance.now();
    const resultado = await ejecutarSandbox(codigo, { timeout: 2500 });
    setTiempo(Math.round(performance.now() - inicio));
    setLineas(resultado.lineas);
    setEjecutando(false);
  };

  return (
    <div className="est-tool">
      <div className="est-tool__head">
        <div>
          <h4 className="est-tool__title">🧪 Simulador editable</h4>
          <p className="est-tool__sub">
            Este laboratorio ejecuta tu código en un <strong>Worker aislado</strong> con límite de
            2.5 segundos. Así puedes probar bucles y condiciones sin bloquear la página.
          </p>
        </div>
        <span className="est-tool__badge">{ejecutando ? "⏳ ejecutando" : "listo"}</span>
      </div>

      {retos.length > 0 && (
        <div className="bugs__tabs" role="tablist" aria-label="Retos del laboratorio">
          {retos.map((reto, i) => (
            <button
              key={reto.titulo ?? i}
              type="button"
              className={`bugs__tab${i === retoActivo ? " is-active" : ""}`}
              onClick={() => setRetoActivo(i)}
              role="tab"
              aria-selected={i === retoActivo}
            >
              {reto.titulo ?? `Reto ${i + 1}`}
            </button>
          ))}
        </div>
      )}

      <div className="est-editor__consigna">🎯 {consigna}</div>

      <div className="est-grid-2">
        <div className="est-panel">
          <div className="est-panel__label">
            <span>✏️ Tu código</span>
            <span className="est-chip">JavaScript puro</span>
          </div>
          <textarea
            ref={areaRef}
            className="est-editor__textarea"
            value={codigo}
            spellCheck={false}
            onChange={(e) => setCodigo(e.target.value)}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
                e.preventDefault();
                ejecutar();
              }
              if (e.key === "Tab") {
                e.preventDefault();
                const el = e.currentTarget;
                const inicioSel = el.selectionStart;
                const finSel = el.selectionEnd;
                const nuevo = `${codigo.slice(0, inicioSel)}  ${codigo.slice(finSel)}`;
                setCodigo(nuevo);
                requestAnimationFrame(() => {
                  el.selectionStart = el.selectionEnd = inicioSel + 2;
                });
              }
            }}
            aria-label="Editor de código"
          />
          <div className="est-editor__acciones">
            <button
              type="button"
              className="est-btn est-btn--primary"
              onClick={ejecutar}
              disabled={ejecutando}
            >
              {ejecutando ? "⏳ Ejecutando..." : "▶ Ejecutar"}
            </button>
            <button
              type="button"
              className="est-btn"
              onClick={() => {
                setCodigo(inicial);
                setLineas([]);
                setTiempo(null);
              }}
            >
              ↺ Restaurar
            </button>
            <span className="est-editor__pista">⌨️ {pista}</span>
          </div>
        </div>

        <div className="est-panel">
          <div className="est-panel__label">
            <span>🖥️ Consola</span>
            <span className="est-chip">{tiempo !== null ? `${tiempo} ms` : "sin ejecutar"}</span>
          </div>
          <div className="est-console">
            {lineas.length ? (
              lineas.map((linea, i) => (
                <div
                  key={`${linea.tipo}-${i}`}
                  className={`est-console__line est-console__line--${linea.tipo}`}
                  style={{ animationDelay: `${Math.min(i * 45, 360)}ms` }}
                >
                  <span>{EMOJI[linea.tipo] ?? "•"}</span>
                  <span>{linea.texto}</span>
                </div>
              ))
            ) : (
              <p className="est-empty">
                Pulsa <strong>Ejecutar</strong> para ver la salida de <code>console.log</code>.
                {ejecutando ? " Procesando..." : ""}
              </p>
            )}
          </div>
          <p className="est-tool__sub" style={{ marginTop: 10 }}>
            💡 Si tu código entra en un bucle infinito, el Worker se detiene automáticamente y verás
            un aviso en rojo.
          </p>
        </div>
      </div>
    </div>
  );
}
