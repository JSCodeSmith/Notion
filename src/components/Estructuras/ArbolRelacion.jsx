import { useMemo, useState } from "react";
import "./Estructuras.css";

const limpiar = (texto) =>
  String(texto).replace(/\*\*/g, "").replace(/`/g, "");

export function construirArbol(metodo) {
  if (metodo.relacionArbol?.raiz) return metodo.relacionArbol;
  return {
    raiz: {
      label: metodo.titulo ?? "Concepto",
      detalle: metodo.firma ?? "Mapa de relaciones",
      hijos: (metodo.relacion ?? []).map((texto, i) => ({
        emoji: "🔗",
        label: limpiar(texto).split(":")[0].slice(0, 42),
        detalle: limpiar(texto),
      })),
    },
    cadena: metodo.relacionCadena,
  };
}

function Nodo({ nodo, nivel = 0 }) {
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
        {tieneHijos && <span className="arbol__flecha">{abierto ? "▾" : "▸"}</span>}
      </button>
      {tieneHijos && abierto && (
        <div className="arbol__hijos">
          {nodo.hijos.map((hijo, i) => (
            <Nodo key={`${hijo.label}-${i}`} nodo={hijo} nivel={nivel + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ArbolRelacion({ metodo }) {
  const arbol = useMemo(() => construirArbol(metodo), [metodo]);
  return (
    <div className="est-tool">
      <div className="est-tool__head">
        <div>
          <h4 className="est-tool__title">🌳 Diagrama de árbol · relaciones y scope chain</h4>
          <p className="est-tool__sub">
            Pulsa cualquier nodo para plegar o desplegar sus conexiones. El nodo raíz es el
            concepto y las ramas muestran cómo se relaciona con el resto de JavaScript.
          </p>
        </div>
        <span className="est-tool__badge">árbol conceptual</span>
      </div>
      <div className="arbol">
        <div className="arbol__raiz">
          <span>{arbol.raiz.emoji ? `${arbol.raiz.emoji} ` : ""}{arbol.raiz.label}</span>
          <small>{arbol.raiz.detalle}</small>
        </div>
        <div className="arbol__hijos">
          {(arbol.raiz.hijos ?? []).map((hijo, i) => (
            <Nodo key={`${hijo.label}-${i}`} nodo={hijo} nivel={1} />
          ))}
        </div>
        {arbol.cadena?.length > 0 && (
          <div className="arbol__cadena" aria-label="Cadena de ámbito">
            {arbol.cadena.map((eslabon, i) => (
              <span key={`${eslabon}-${i}`} className="arbol__eslabon">
                {eslabon}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
