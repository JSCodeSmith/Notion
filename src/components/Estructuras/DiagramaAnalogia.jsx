import { useMemo, useState } from "react";
import "./Estructuras.css";

const limpiar = (texto) => String(texto).replace(/\*\*/g, "").replace(/`/g, "");

export default function DiagramaAnalogia({ metodo }) {
  const diagrama = useMemo(() => {
    if (metodo.analogiaDiagrama?.nodos?.length) return metodo.analogiaDiagrama;
    const partes = limpiar(metodo.analogia ?? "")
      .split(/(?<=\.)\s+/)
      .filter(Boolean)
      .slice(0, 4);
    return {
      centro: metodo.titulo ?? "Concepto",
      nota: limpiar(metodo.analogia ?? ""),
      nodos: partes.map((parte, i) => ({
        emoji: ["🧩", "🔑", "💡", "🎯"][i] ?? "✨",
        label: `Idea ${i + 1}`,
        detalle: parte,
      })),
    };
  }, [metodo]);

  const [activo, setActivo] = useState(null);
  const nodoActivo = activo === null ? null : diagrama.nodos[activo];

  return (
    <div className="est-tool">
      <div className="est-tool__head">
        <div>
          <h4 className="est-tool__title">🎨 Diagrama conceptual de la analogía</h4>
          <p className="est-tool__sub">
            Cada tarjeta traduce una parte de la analogía a un concepto real de JavaScript.
            Pulsa una tarjeta para leer su explicación.
          </p>
        </div>
        <span className="est-tool__badge">analogía visual</span>
      </div>

      <div className="analogia">
        <div className="analogia__centro">
          🧠 {diagrama.centro}
          {diagrama.nota && <small>{diagrama.nota}</small>}
        </div>
        <div className="analogia__linea" />
        <div className="analogia__grid">
          {diagrama.nodos.map((nodo, i) => (
            <button
              key={`${nodo.label}-${i}`}
              type="button"
              className={`analogia__nodo${activo === i ? " is-active" : ""}`}
              onClick={() => setActivo(activo === i ? null : i)}
              aria-pressed={activo === i}
            >
              <span className="analogia__emoji">{nodo.emoji ?? "✨"}</span>
              <span>
                <strong>{nodo.label}</strong>
                <span>{nodo.detalle}</span>
              </span>
            </button>
          ))}
        </div>
        {nodoActivo && (
          <div className="analogia__detalle">
            <strong>
              {nodoActivo.emoji} {nodoActivo.label}
            </strong>
            <br />
            {nodoActivo.detalle}
          </div>
        )}
      </div>
    </div>
  );
}
