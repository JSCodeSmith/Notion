import { useEffect, useMemo, useState } from "react";
import "./Estructuras.css";

const crearPasosPorDefecto = (metodo) =>
  (metodo.comoFunciona ?? []).map((texto, i) => ({
    linea: i + 1,
    pila: ["global"],
    vars: {},
    salida: "",
    nota: String(texto).replace(/\*\*/g, "").replace(/`/g, ""),
  }));

function NodoArbol({ nodo, nivel = 0 }) {
  const [abierto, setAbierto] = useState(nivel < 2);
  const tieneHijos = Boolean(nodo.hijos?.length);
  return (
    <div className="arbol__nodo">
      <button
        type="button"
        className={`arbol__ficha${abierto ? " is-open" : ""}`}
        onClick={() => tieneHijos && setAbierto((v) => !v)}
        aria-expanded={tieneHijos ? abierto : undefined}
      >
        {nodo.emoji && <span className="arbol__emoji">{nodo.emoji}</span>}
        <span className="arbol__label">{nodo.label}</span>
        {nodo.detalle && <span className="arbol__detalle">{nodo.detalle}</span>}
        {tieneHijos && (
          <span className="arbol__flecha">{abierto ? "▾" : "▸"}</span>
        )}
      </button>
      {tieneHijos && abierto && (
        <div className="arbol__hijos">
          {nodo.hijos.map((hijo, i) => (
            <NodoArbol key={`${hijo.label}-${i}`} nodo={hijo} nivel={nivel + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TrazaEstructura({ metodo }) {
  const pasos = useMemo(
    () =>
      metodo.demo?.pasos?.length
        ? metodo.demo.pasos
        : crearPasosPorDefecto(metodo),
    [metodo],
  );
  const codigo =
    metodo.demo?.codigo ??
    metodo.sintaxis?.[0]?.code ??
    "// Sin código de ejemplo para trazar.";
  const lineas = useMemo(() => codigo.split("\n"), [codigo]);
  const [indice, setIndice] = useState(0);
  const [auto, setAuto] = useState(false);
  const [vista, setVista] = useState("traza");

  const paso = pasos[Math.min(indice, pasos.length - 1)] ?? {
    linea: 1,
    pila: ["global"],
    vars: {},
    salida: "",
    nota: "",
  };

  useEffect(() => {
    if (!auto) return;
    if (indice >= pasos.length - 1) {
      setAuto(false);
      return;
    }
    const t = setTimeout(() => setIndice((i) => Math.min(i + 1, pasos.length - 1)), 1300);
    return () => clearTimeout(t);
  }, [auto, indice, pasos.length]);

  useEffect(() => {
    setIndice(0);
    setAuto(false);
  }, [metodo.id]);

  const ir = (delta) => {
    setAuto(false);
    setIndice((i) => Math.max(0, Math.min(pasos.length - 1, i + delta)));
  };

  const arbolPaso = {
    label: "🌐 global",
    detalle: "Ámbito global · execution context",
    hijos: [
      ...(paso.pila ?? [])
        .filter((frame) => frame !== "global")
        .map((frame) => ({
          emoji: "🔧",
          label: frame,
          detalle: "Función en ejecución · frame activo",
        })),
      ...Object.entries(paso.vars ?? {}).map(([nombre, valor]) => ({
        emoji: "🔹",
        label: nombre,
        detalle: String(valor),
      })),
    ],
  };

  return (
    <div className="est-tool">
      <div className="est-tool__head">
        <div>
          <h4 className="est-tool__title">🔎 Visualizador paso a paso · Execution Trace</h4>
          <p className="est-tool__sub">
            Avanza instrucción por instrucción y observa la pila de llamadas, las
            variables y la salida. Cambia a <strong>Execution Tree</strong> para ver
            el contexto como árbol.
          </p>
        </div>
        <span className="est-tool__badge">Paso {indice + 1} / {pasos.length}</span>
      </div>

      <div className="traza__controls">
        <button type="button" className="est-btn" onClick={() => ir(-1)} disabled={indice === 0}>
          ◀ Anterior
        </button>
        <button
          type="button"
          className="est-btn est-btn--primary"
          onClick={() => {
            if (indice >= pasos.length - 1) setIndice(0);
            setAuto((v) => !v);
          }}
        >
          {auto ? "⏸ Pausar" : "▶ Reproducir"}
        </button>
        <button
          type="button"
          className="est-btn"
          onClick={() => ir(1)}
          disabled={indice >= pasos.length - 1}
        >
          Siguiente ▶
        </button>
        <button
          type="button"
          className="est-btn est-btn--ghost"
          onClick={() => {
            setAuto(false);
            setIndice(0);
          }}
        >
          ↺ Reiniciar
        </button>
        <div className="traza__progress" aria-hidden="true">
          <span style={{ width: `${((indice + 1) / pasos.length) * 100}%` }} />
        </div>
        <span className="traza__contador">
          <button
            type="button"
            className={`est-btn${vista === "traza" ? " est-btn--primary" : " est-btn--ghost"}`}
            onClick={() => setVista("traza")}
          >
            🧭 Traza
          </button>{" "}
          <button
            type="button"
            className={`est-btn${vista === "arbol" ? " est-btn--primary" : " est-btn--ghost"}`}
            onClick={() => setVista("arbol")}
          >
            🌳 Árbol
          </button>
        </span>
      </div>

      {vista === "traza" ? (
        <div className="est-grid-2">
          <div className="est-panel">
            <div className="est-panel__label">
              <span>🧾 Código</span>
              <span className="est-chip">línea {paso.linea}</span>
            </div>
            <div className="est-code">
              {lineas.map((linea, i) => (
                <div
                  key={i}
                  className={`est-code__line${i + 1 === paso.linea ? " is-active" : ""}`}
                >
                  <span className="est-code__num">{i + 1}</span>
                  <span className="est-code__text">{linea || " "}</span>
                </div>
              ))}
            </div>
            {paso.nota && <div className="traza__note">💡 {paso.nota}</div>}
          </div>

          <div className="traza__stack">
            <div className="est-panel">
              <div className="est-panel__label">
                <span>🥞 Call stack</span>
                <span className="est-chip">{paso.pila?.length ?? 1} frame(s)</span>
              </div>
              <div className="traza__stack">
                {(paso.pila ?? ["global"]).map((frame, i) => (
                  <div
                    key={`${frame}-${i}`}
                    className={`traza__frame${i === (paso.pila?.length ?? 1) - 1 ? " is-top" : ""}`}
                  >
                    <span>{frame === "global" ? "🌐" : "🔧"}</span>
                    <span>{frame}</span>
                    <small>{frame === "global" ? "contexto global" : "en ejecución"}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="est-panel">
              <div className="est-panel__label">
                <span>📦 Variables del paso</span>
                <span className="est-chip">{Object.keys(paso.vars ?? {}).length}</span>
              </div>
              {Object.keys(paso.vars ?? {}).length ? (
                <table className="traza__vars">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Valor</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(paso.vars).map(([nombre, valor]) => (
                      <tr key={nombre}>
                        <td>{nombre}</td>
                        <td>{String(valor)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="est-empty">Todavía no hay variables en este paso.</p>
              )}
            </div>

            <div className="est-panel">
              <div className="est-panel__label">
                <span>🖥️ Salida</span>
                <span className="est-chip">console</span>
              </div>
              <div className="traza__salida">
                {paso.salida ? paso.salida : <span className="est-empty">(sin salida en este paso)</span>}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="est-grid-2">
          <div className="est-panel">
            <div className="est-panel__label">
              <span>🌳 Execution Tree</span>
              <span className="est-chip">contexto actual</span>
            </div>
            <div className="arbol">
              <div className="arbol__raiz">
                <span>{arbolPaso.label}</span>
                <small>{arbolPaso.detalle}</small>
              </div>
              <div className="arbol__hijos">
                {arbolPaso.hijos.length ? (
                  arbolPaso.hijos.map((hijo, i) => (
                    <NodoArbol key={`${hijo.label}-${i}`} nodo={hijo} nivel={1} />
                  ))
                ) : (
                  <p className="est-empty">Este paso no tiene variables ni funciones activas.</p>
                )}
              </div>
            </div>
          </div>
          <div className="est-panel">
            <div className="est-panel__label">
              <span>🧠 Lectura del árbol</span>
            </div>
            <p className="est-tool__sub" style={{ color: "#c6d5ea" }}>
              El nodo <strong>global</strong> es el contexto base. Cada variable aparece como
              una hoja con su valor actual y cada función activa aparece como una rama
              <strong> 🔧</strong>. Cuando la función termina, su rama desaparece de la pila.
            </p>
            <div className="traza__note" style={{ marginTop: 12 }}>
              💡 {paso.nota || "Avanza para ver cómo cambia el árbol de ejecución."}
            </div>
            <div className="traza__salida" style={{ marginTop: 10 }}>
              {paso.salida ? paso.salida : "(sin salida en este paso)"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
