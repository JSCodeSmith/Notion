import { useState } from "react";
import { apuntesAritmeticaDe } from "./apuntesAritmeticaLab";

const limpiar = (texto = "") =>
  String(texto)
    .replace(/\*\*/g, "")
    .replace(/^\s*\d\uFE0F?\u20E3\s*/, "")
    .trim();

/* Laboratorio guiado de un apunte de aritmética: recorre los pasos del
   concepto, permite marcarlos como revisados y muestra los apuntes propios
   escritos para acompañar la práctica. */
export default function LaboratorioAritmetica({ nota }) {
  const apuntes = apuntesAritmeticaDe(nota);
  const pasos = nota?.lab?.pasoAPaso ?? [];
  const [actual, setActual] = useState(0);
  const [revisados, setRevisados] = useState(() => new Set());

  const total = pasos.length;
  const indice = Math.min(actual, Math.max(0, total - 1));
  const paso = pasos[indice];
  const progreso = total ? Math.round((revisados.size / total) * 100) : 0;

  const alternarRevisado = (posicion) => {
    setRevisados((anteriores) => {
      const siguientes = new Set(anteriores);
      if (siguientes.has(posicion)) siguientes.delete(posicion);
      else siguientes.add(posicion);
      return siguientes;
    });
  };

  return (
    <section className="narit-lab">
      <header className="narit-lab__head">
        <div>
          <p className="narit-lab__eyebrow">🧪 Laboratorio paso a paso</p>
          <h3>Recorre el concepto y revisa tus apuntes</h3>
          <p className="narit-lab__desc">
            Cambia los datos del simulador de arriba, avanza por los pasos y
            marca los que ya sepas explicar. Los apuntes propios te dan la idea,
            el modelo mental y un reto para comprobar que lo entendiste.
          </p>
        </div>
        <span className="narit-lab__badge">
          {total ? `${total} pasos` : "Sin pasos"}
        </span>
      </header>

      {total > 0 && (
        <>
          <div className="narit-lab__progreso">
            <div className="narit-lab__barra">
              <span style={{ width: `${progreso}%` }} />
            </div>
            <span>
              {revisados.size} / {total} pasos revisados
            </span>
          </div>

          <div className="narit-lab__cuerpo">
            <div
              className="narit-lab__rail"
              role="tablist"
              aria-label="Pasos del laboratorio de aritmética"
            >
              {pasos.map((item, posicion) => (
                <button
                  key={`${item.paso ?? posicion}-${posicion}`}
                  type="button"
                  role="tab"
                  aria-selected={posicion === indice}
                  className={`narit-lab__dot${
                    posicion === indice ? " is-active" : ""
                  }${revisados.has(posicion) ? " is-hecho" : ""}`}
                  onClick={() => setActual(posicion)}
                  title={limpiar(item.titulo)}
                >
                  <span>{revisados.has(posicion) ? "✓" : posicion + 1}</span>
                  <small>{limpiar(item.titulo)}</small>
                </button>
              ))}
            </div>

            {paso && (
              <div className="narit-lab__paso">
                <div className="narit-lab__paso-head">
                  <span className="narit-lab__paso-num">
                    Paso {indice + 1} de {total}
                  </span>
                  <button
                    type="button"
                    className={`narit-lab__hecho${
                      revisados.has(indice) ? " is-active" : ""
                    }`}
                    onClick={() => alternarRevisado(indice)}
                  >
                    {revisados.has(indice)
                      ? "✓ Revisado"
                      : "Marcar como revisado"}
                  </button>
                </div>

                <h4>{limpiar(paso.titulo)}</h4>
                {paso.explicacion && (
                  <p className="narit-lab__explicacion">
                    {limpiar(paso.explicacion)}
                  </p>
                )}
                {paso.codigo && (
                  <pre className="narit-lab__codigo">
                    <code>{paso.codigo}</code>
                  </pre>
                )}
                {paso.salida && (
                  <p className="narit-lab__salida">{limpiar(paso.salida)}</p>
                )}

                <div className="narit-lab__nav">
                  <button
                    type="button"
                    onClick={() => setActual(Math.max(0, indice - 1))}
                    disabled={indice === 0}
                  >
                    ← Anterior
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setActual(Math.min(total - 1, indice + 1))
                    }
                    disabled={indice === total - 1}
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {apuntes && (
        <div className="narit-notas">
          <div className="narit-notas__head">
            <p className="narit-lab__eyebrow">
              📝 Tus apuntes propios que hiciste autónomamente
            </p>
            <p className="narit-notas__sub">
              Notas escritas para esta práctica: idea de fondo, modelo mental,
              comprobaciones y un reto.
            </p>
          </div>

          <div className="narit-notas__grid">
            {apuntes.idea && (
              <div className="narit-nota narit-nota--idea">
                <span>La idea</span>
                <p>{apuntes.idea}</p>
              </div>
            )}
            {apuntes.modelo && (
              <div className="narit-nota">
                <span>Modelo mental</span>
                <p>{apuntes.modelo}</p>
              </div>
            )}
            {apuntes.checklist?.length > 0 && (
              <div className="narit-nota narit-nota--check">
                <span>Checklist</span>
                <ul>
                  {apuntes.checklist.map((punto, posicion) => (
                    <li key={posicion}>{punto}</li>
                  ))}
                </ul>
              </div>
            )}
            {apuntes.reto && (
              <div className="narit-nota narit-nota--reto">
                <span>Reto con el simulador</span>
                <p>{apuntes.reto}</p>
              </div>
            )}
            {apuntes.pista && (
              <div className="narit-nota narit-nota--pista">
                <span>Pista</span>
                <p>{apuntes.pista}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
