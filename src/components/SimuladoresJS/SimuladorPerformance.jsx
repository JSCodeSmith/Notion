import { useMemo, useState } from "react";
import MarcoSimulador from "./MarcoSimulador";

const formatear = (n) => n.toFixed(3) + " ms";

export default function SimuladorPerformance({ metodoId }) {
  const [vista, setVista] = useState(
    metodoId === "performance-now" ? "now" : "marks",
  );
  const [timeOrigin] = useState(() => performance.timeOrigin);
  const [iteraciones, setIteraciones] = useState(1000000);
  const [resultado, setResultado] = useState(null);
  const [marca, setMarca] = useState("inicio");
  const [marcas, setMarcas] = useState([]);
  const [medidas, setMedidas] = useState([]);
  const [inicio, setInicio] = useState("inicio");
  const [fin, setFin] = useState("fin");
  const [error, setError] = useState(null);

  const ejecutar = () => {
    const t0 = performance.now();
    let suma = 0;
    for (let i = 0; i < iteraciones; i++) suma += i;
    const t1 = performance.now();

    setResultado({ duracion: t1 - t0, iteraciones, suma });
    setError(null);
  };

  const anadirMarca = () => {
    if (!marca.trim()) return;

    performance.mark(marca);
    setMarcas((prev) => [
      ...prev,
      { nombre: marca, tiempo: performance.now() },
    ]);
    setError(null);
  };

  const medir = () => {
    try {
      performance.measure("medida-" + (medidas.length + 1), inicio, fin);
      const entradas = performance.getEntriesByName(
        "medida-" + (medidas.length + 1),
      );
      const ultima = entradas[entradas.length - 1];

      setMedidas((prev) => [
        ...prev,
        {
          nombre: inicio + " → " + fin,
          duracion: ultima ? ultima.duration : 0,
        },
      ]);
      setError(null);
    } catch (err) {
      setError(err.name + ": " + err.message);
    }
  };

  const limpiar = () => {
    performance.clearMarks();
    performance.clearMeasures();
    setMarcas([]);
    setMedidas([]);
    setResultado(null);
    setError(null);
  };

  const maximo = useMemo(
    () => Math.max(0.001, ...medidas.map((m) => m.duracion)),
    [medidas],
  );

  const codigo =
    vista === "now"
      ? `const inicio = performance.now();

for (let i = 0; i < ${iteraciones}; i++) {
  // trabajo
}

const fin = performance.now();
console.log((fin - inicio).toFixed(3) + " ms");`
      : `performance.mark("inicio");
// ... trabajo ...
performance.mark("fin");

performance.measure("mi-operacion", "inicio", "fin");
const [m] = performance.getEntriesByName("mi-operacion");
console.log(m.duration.toFixed(3) + " ms");`;

  return (
    <MarcoSimulador
      icon="⚡"
      titulo="Performance API"
      descripcion="Mide tiempos reales con performance.now(), crea marcas con nombre y calcula la duración entre ellas con performance.measure()."
      codigo={codigo}
      consola={
        error ? (
          <div className="log-error">❌ {error}</div>
        ) : vista === "now" ? (
          !resultado ? (
            <span className="log-system">
              Pulsa «Medir bucle» para cronometrar el trabajo.
            </span>
          ) : (
            <>
              <div className="log-success">
                ✅ {resultado.iteraciones.toLocaleString("es-ES")} iteraciones
              </div>
              <div className="log-result">
                {formatear(resultado.duracion)}
              </div>
              <div className="log-iteration">
                performance.now() es monotónico y devuelve decimales.
              </div>
            </>
          )
        ) : (
          <>
            <div className="log-success">
              📍 {marcas.length} marca(s) · 📏 {medidas.length} medida(s)
            </div>
            {marcas.map((m, i) => (
              <div className="log-iteration" key={i}>
                mark "{m.nombre}" en {m.tiempo.toFixed(1)} ms
              </div>
            ))}
            {medidas.map((m, i) => (
              <div className="log-result" key={i}>
                {m.nombre}: {formatear(m.duracion)}
              </div>
            ))}
          </>
        )
      }
    >
      <div className="sjs-actions">
        <button
          type="button"
          className={`sjs-btn ${vista === "now" ? "sjs-btn--primary" : ""}`}
          onClick={() => setVista("now")}
        >
          ⏱️ performance.now()
        </button>
        <button
          type="button"
          className={`sjs-btn ${vista === "marks" ? "sjs-btn--primary" : ""}`}
          onClick={() => setVista("marks")}
        >
          📍 mark() y measure()
        </button>
        <button type="button" className="sjs-btn" onClick={limpiar}>
          🧹 Limpiar timeline
        </button>
      </div>

      {vista === "now" ? (
        <>
          <div className="sjs-toolbar">
            <label className="sjs-field">
              <span>Iteraciones del bucle</span>
              <select
                className="sjs-select"
                value={iteraciones}
                onChange={(e) => setIteraciones(Number(e.target.value))}
              >
                <option value={100000}>100 000</option>
                <option value={1000000}>1 000 000</option>
                <option value={10000000}>10 000 000</option>
              </select>
            </label>
            <button
              type="button"
              className="sjs-btn sjs-btn--primary"
              onClick={ejecutar}
            >
              ▶ Medir bucle
            </button>
          </div>

          <div className="sjs-grid-2">
            <div className="sjs-card">
              <div className="sjs-card__label">
                <span>⏱️ Duración</span>
                {resultado && (
                  <span className="sjs-tag sjs-tag--ok">medida real</span>
                )}
              </div>
              <div
                className={`sjs-output ${resultado ? "sjs-output--ok" : "sjs-output--muted"}`}
              >
                {resultado
                  ? formatear(resultado.duracion)
                  : "Sin medir todavía"}
              </div>
              <div className="sjs-tags">
                <span className="sjs-tag">
                  timeOrigin: {timeOrigin.toFixed(0)}
                </span>
                <span className="sjs-tag sjs-tag--info">
                  reloj monotónico
                </span>
              </div>
            </div>

            <div className="sjs-card">
              <div className="sjs-card__label">📌 Diferencia clave</div>
              <div className="sjs-output sjs-output--warn">
                {`performance.now() → ms desde timeOrigin, con decimales y monotónico\n\nDate.now() → ms desde 1970, enteros y puede retroceder`}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="sjs-toolbar">
            <label className="sjs-field sjs-field--grow">
              <span>Nombre de la marca</span>
              <input
                className="sjs-input"
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                placeholder="inicio, fin, render..."
              />
            </label>
            <button
              type="button"
              className="sjs-btn sjs-btn--primary"
              onClick={anadirMarca}
            >
              📍 performance.mark()
            </button>
          </div>

          <div className="sjs-card" style={{ marginBottom: 14 }}>
            <div className="sjs-card__label">
              <span>🗂️ Marcas en el timeline</span>
              <span className="sjs-tag">{marcas.length}</span>
            </div>
            {marcas.length === 0 ? (
              <div className="sjs-output sjs-output--muted">
                Añade marcas como «inicio» y «fin».
              </div>
            ) : (
              <div className="sjs-tags" style={{ marginTop: 0 }}>
                {marcas.map((m, i) => (
                  <span key={i} className="sjs-tag sjs-tag--info">
                    {m.nombre} · {m.tiempo.toFixed(1)} ms
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="sjs-toolbar">
            <label className="sjs-field">
              <span>Marca de inicio</span>
              <select
                className="sjs-select"
                value={inicio}
                onChange={(e) => setInicio(e.target.value)}
              >
                {marcas.length === 0 ? (
                  <option>inicio</option>
                ) : (
                  [...new Set(marcas.map((m) => m.nombre))].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))
                )}
              </select>
            </label>
            <label className="sjs-field">
              <span>Marca de fin</span>
              <select
                className="sjs-select"
                value={fin}
                onChange={(e) => setFin(e.target.value)}
              >
                {marcas.length === 0 ? (
                  <option>fin</option>
                ) : (
                  [...new Set(marcas.map((m) => m.nombre))].map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))
                )}
              </select>
            </label>
            <button
              type="button"
              className="sjs-btn"
              onClick={medir}
              disabled={marcas.length < 2}
            >
              📏 performance.measure()
            </button>
          </div>

          <div className="sjs-card">
            <div className="sjs-card__label">📏 Medidas</div>
            {medidas.length === 0 ? (
              <div className="sjs-output sjs-output--muted">
                Crea al menos dos marcas y pulsa «measure()».
              </div>
            ) : (
              <div className="sjs-timeline">
                {medidas.map((m, i) => (
                  <div className="sjs-timeline__row" key={i}>
                    <span className="sjs-timeline__label">{m.nombre}</span>
                    <div className="sjs-timeline__track">
                      <div
                        className="sjs-timeline__bar sjs-timeline__bar--ok"
                        style={{
                          width:
                            Math.max(2, (m.duracion / maximo) * 100) + "%",
                        }}
                      />
                    </div>
                    <span className="sjs-timeline__value">
                      {formatear(m.duracion)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      <div className="sjs-note">
        💡 Las marcas y medidas se guardan en el timeline del navegador y se
        pueden ver en DevTools → Performance. Recuerda limpiarlas con{" "}
        <code>performance.clearMarks()</code> y{" "}
        <code>performance.clearMeasures()</code>.
      </div>
    </MarcoSimulador>
  );
}
