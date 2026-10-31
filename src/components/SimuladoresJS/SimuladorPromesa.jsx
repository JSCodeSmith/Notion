import { useState } from "react";
import CodeBlock from "../CodeBlock/CodeBlock";
import "../SimuladorFind/SimuladorFind.css";
import "./SimuladoresJS.css";

const CONFIG = {
  "promise-all": {
    icon: "📦",
    nombre: "Promise.all()",
    intro:
      "Configura el resultado y el retraso de cada promesa. Si una falla, todo el combinador se rechaza.",
    code: `Promise.all([p1, p2, p3])
  .then((resultados) => console.log(resultados))
  .catch((error) => console.error(error));`,
    inicial: [
      { resultado: "resolve", valor: "Usuario cargado", delay: 1200 },
      { resultado: "resolve", valor: "Productos cargados", delay: 800 },
      { resultado: "resolve", valor: "Pedidos cargados", delay: 1500 },
    ],
  },
  "promise-allsettled": {
    icon: "📋",
    nombre: "Promise.allSettled()",
    intro:
      "Mezcla éxitos y errores. El combinador espera a todas y devuelve el estado de cada promesa.",
    code: `Promise.allSettled([p1, p2, p3])
  .then((resultados) => console.log(resultados));`,
    inicial: [
      { resultado: "resolve", valor: "Archivo 1", delay: 1000 },
      { resultado: "reject", valor: "Archivo 2 falló", delay: 1400 },
      { resultado: "resolve", valor: "Archivo 3", delay: 700 },
    ],
  },
  "promise-any": {
    icon: "🏆",
    nombre: "Promise.any()",
    intro:
      "La primera promesa que se resuelve gana. Los rechazos se ignoran hasta que todas fallan.",
    code: `Promise.any([p1, p2, p3])
  .then((resultado) => console.log(resultado))
  .catch((error) => console.error(error.errors));`,
    inicial: [
      { resultado: "reject", valor: "Error en p1", delay: 600 },
      { resultado: "resolve", valor: "Éxito en p2", delay: 1200 },
      { resultado: "resolve", valor: "Éxito en p3", delay: 1800 },
    ],
  },
};

const parseValor = (texto) => {
  const limpio = String(texto).trim();
  if (limpio === "") return "";
  try {
    return JSON.parse(limpio);
  } catch {
    return texto;
  }
};

const mostrar = (valor) =>
  typeof valor === "string" ? valor : JSON.stringify(valor);

export default function SimuladorPromesa({ metodoId }) {
  const esResolve = metodoId === "promise-resolve";
  const config = CONFIG[metodoId] ?? CONFIG["promise-all"];

  const [filas, setFilas] = useState(config.inicial ?? []);
  const [resultado, setResultado] = useState(null);
  const [valorResolve, setValorResolve] = useState("42");

  const actualizar = (indice, campo, valor) => {
    setFilas((prev) =>
      prev.map((fila, i) => (i === indice ? { ...fila, [campo]: valor } : fila)),
    );
    setResultado(null);
  };

  const ejecutar = () => {
    const ordenadas = filas
      .map((fila, indice) => ({ ...fila, indice }))
      .sort((a, b) => a.delay - b.delay);
    const tiempoTotal = Math.max(...filas.map((f) => f.delay), 0);

    if (metodoId === "promise-allsettled") {
      setResultado({
        estado: "fulfilled",
        valor: filas.map((fila) =>
          fila.resultado === "resolve"
            ? { status: "fulfilled", value: parseValor(fila.valor) }
            : { status: "rejected", reason: fila.valor },
        ),
        tiempo: tiempoTotal,
        mensaje: "Siempre se resuelve: todas terminaron.",
      });
      return;
    }

    if (metodoId === "promise-any") {
      const ganadora = ordenadas.find((fila) => fila.resultado === "resolve");
      if (ganadora) {
        setResultado({
          estado: "fulfilled",
          valor: parseValor(ganadora.valor),
          tiempo: ganadora.delay,
          mensaje: `Ganó p${ganadora.indice + 1}; los rechazos anteriores se ignoraron.`,
        });
      } else {
        setResultado({
          estado: "rejected",
          valor: new Error("AggregateError"),
          errores: filas.map((fila) => fila.valor),
          tiempo: tiempoTotal,
          mensaje: "Todas se rechazaron: AggregateError.",
        });
      }
      return;
    }

    const primerRechazo = ordenadas.find(
      (fila) => fila.resultado === "reject",
    );
    if (primerRechazo) {
      setResultado({
        estado: "rejected",
        valor: primerRechazo.valor,
        tiempo: primerRechazo.delay,
        mensaje: `p${primerRechazo.indice + 1} falló: Promise.all() se rechaza.`,
      });
    } else {
      setResultado({
        estado: "fulfilled",
        valor: filas.map((fila) => parseValor(fila.valor)),
        tiempo: tiempoTotal,
        mensaje: "Todas se resolvieron: array de resultados en orden.",
      });
    }
  };

  const ejecutarResolve = () => {
    const valor = parseValor(valorResolve);
    setResultado({
      estado: "fulfilled",
      valor,
      tiempo: 0,
      mensaje: "Promise.resolve() devuelve una promesa ya resuelta.",
    });
  };

  if (esResolve) {
    return (
      <div className="sim-container sjs-sim">
        <div className="sim-header">
          <h3>
            ✅ Simulador interactivo: <code>Promise.resolve()</code>
          </h3>
          <p className="sjs-intro">
            Escribe cualquier valor y observa cómo se envuelve en una promesa ya
            resuelta. Si el valor ya es una promesa, se devuelve tal cual. ✨
          </p>
        </div>

        <div className="sim-editor">
          <div className="sim-editor-header">Valor a resolver</div>

          <div className="sjs-toolbar">
            <label className="sjs-field sjs-field--grow">
              <span>valor</span>
              <input
                className="sjs-input"
                type="text"
                value={valorResolve}
                onChange={(e) => {
                  setValorResolve(e.target.value);
                  setResultado(null);
                }}
              />
            </label>

            <button
              type="button"
              className="sjs-btn sjs-btn--primary"
              onClick={ejecutarResolve}
            >
              ▶ Ejecutar Promise.resolve()
            </button>

            <button
              type="button"
              className="sjs-btn"
              onClick={() => {
                setValorResolve("42");
                setResultado(null);
              }}
            >
              🔄 Reset
            </button>
          </div>

          <div className="sjs-grid-2">
            <div className="sjs-card">
              <div className="sjs-card__label">🧾 Código</div>
              <CodeBlock
                code={`const promesa = Promise.resolve(${valorResolve || "undefined"});

promesa.then((valor) => {
  console.log(valor);
});`}
              />
            </div>

            <div className="sjs-card">
              <div className="sjs-card__label">
                <span>✅ Resultado</span>
                {resultado && (
                  <span className="sjs-tag sjs-tag--ok">fulfilled</span>
                )}
              </div>

              {!resultado ? (
                <div className="sjs-output sjs-output--muted">
                  Pulsa «Ejecutar» para crear la promesa resuelta.
                </div>
              ) : (
                <>
                  <div className="sjs-output sjs-output--ok">
                    {JSON.stringify(resultado.valor, null, 2)}
                  </div>
                  <div className="sjs-tags">
                    <span className="sjs-tag sjs-tag--ok">estado: fulfilled</span>
                    <span className="sjs-tag">
                      tipo: {Array.isArray(resultado.valor)
                        ? "array"
                        : typeof resultado.valor}
                    </span>
                    <span className="sjs-tag sjs-tag--info">
                      .then() en microtarea
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="sjs-note">
            💡 <code>Promise.resolve(x)</code> equivale a{" "}
            <code>new Promise((resolve) =&gt; resolve(x))</code>. Si recibe una
            promesa, la devuelve sin envolverla otra vez.
          </div>
        </div>

        <div className="sim-console">
          <div className="sim-console-header">Consola</div>
          <div className="sim-console-body">
            {!resultado && (
              <span className="log-system">Esperando ejecución...</span>
            )}
            {resultado && (
              <>
                <div className="log-success">
                  ✅ Promesa resuelta con: {mostrar(resultado.valor)}
                </div>
                <div className="log-result">
                  .then((valor) =&gt; console.log(valor))
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }

  const maxDelay = Math.max(...filas.map((fila) => fila.delay), 1);

  return (
    <div className="sim-container sjs-sim">
      <div className="sim-header">
        <h3>
          {config.icon} Simulador interactivo: <code>{config.nombre}</code>
        </h3>
        <p className="sjs-intro">{config.intro}</p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">Promesas en paralelo</div>

        <div className="sjs-grid-3">
          {filas.map((fila, indice) => (
            <div className="sjs-card" key={indice}>
              <div className="sjs-card__label">
                <span>p{indice + 1}</span>
                <span
                  className={`sjs-pill ${
                    fila.resultado === "resolve"
                      ? "sjs-pill--ok"
                      : "sjs-pill--bad"
                  }`}
                >
                  {fila.resultado}
                </span>
              </div>

              <div className="sjs-field" style={{ marginBottom: 10 }}>
                <span>Resultado</span>
                <select
                  className="sjs-select"
                  value={fila.resultado}
                  onChange={(e) =>
                    actualizar(indice, "resultado", e.target.value)
                  }
                >
                  <option value="resolve">resolve</option>
                  <option value="reject">reject</option>
                </select>
              </div>

              <div className="sjs-field" style={{ marginBottom: 10 }}>
                <span>Valor / error</span>
                <input
                  className="sjs-input"
                  type="text"
                  value={fila.valor}
                  onChange={(e) => actualizar(indice, "valor", e.target.value)}
                />
              </div>

              <div className="sjs-field">
                <span>Retraso (ms)</span>
                <input
                  className="sjs-input sjs-input--short"
                  type="number"
                  min="100"
                  step="100"
                  value={fila.delay}
                  onChange={(e) =>
                    actualizar(
                      indice,
                      "delay",
                      Math.max(100, Number(e.target.value) || 100),
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>

        <div className="sjs-actions" style={{ marginTop: 14 }}>
          <button
            type="button"
            className="sjs-btn sjs-btn--primary"
            onClick={ejecutar}
          >
            ▶ Ejecutar {config.nombre}
          </button>
          <button
            type="button"
            className="sjs-btn"
            onClick={() => {
              setFilas(config.inicial);
              setResultado(null);
            }}
          >
            🔄 Reset
          </button>
        </div>

        <div className="sjs-grid-2">
          <div className="sjs-card">
            <div className="sjs-card__label">🧾 Código</div>
            <CodeBlock code={config.code} />
          </div>

          <div className="sjs-card">
            <div className="sjs-card__label">
              <span>📤 Resultado</span>
              {resultado && (
                <span
                  className={`sjs-tag ${
                    resultado.estado === "fulfilled"
                      ? "sjs-tag--ok"
                      : "sjs-tag--bad"
                  }`}
                >
                  {resultado.estado}
                </span>
              )}
            </div>

            {!resultado ? (
              <div className="sjs-output sjs-output--muted">
                Configura las promesas y pulsa «Ejecutar».
              </div>
            ) : (
              <>
                <div
                  className={`sjs-output ${
                    resultado.estado === "fulfilled"
                      ? "sjs-output--ok"
                      : "sjs-output--error"
                  }`}
                >
                  {resultado.errores
                    ? `AggregateError\n${JSON.stringify(resultado.errores, null, 2)}`
                    : JSON.stringify(resultado.valor, null, 2)}
                </div>
                <div className="sjs-tags">
                  <span className="sjs-tag">
                    tiempo: {resultado.tiempo} ms
                  </span>
                  <span className="sjs-tag sjs-tag--info">
                    {resultado.mensaje}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="sjs-card" style={{ marginTop: 14 }}>
          <div className="sjs-card__label">⏱️ Línea de tiempo</div>
          <div className="sjs-timeline">
            {filas.map((fila, indice) => (
              <div className="sjs-timeline__row" key={indice}>
                <span className="sjs-timeline__label">p{indice + 1}</span>
                <span className="sjs-timeline__track">
                  <span
                    className={`sjs-timeline__bar ${
                      fila.resultado === "resolve"
                        ? "sjs-timeline__bar--ok"
                        : "sjs-timeline__bar--bad"
                    }`}
                    style={{
                      width: `${Math.max(4, (fila.delay / maxDelay) * 100)}%`,
                      display: "block",
                    }}
                  />
                </span>
                <span className="sjs-timeline__value">
                  {fila.resultado} · {fila.delay} ms
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="sjs-note">
          {metodoId === "promise-all" && (
            <>
              📦 <code>Promise.all()</code> se rechaza en cuanto una promesa
              falla, aunque las demás sigan ejecutándose. Para tolerar fallos usa{" "}
              <code>Promise.allSettled()</code>.
            </>
          )}
          {metodoId === "promise-allsettled" && (
            <>
              📋 <code>Promise.allSettled()</code> nunca se rechaza: siempre
              devuelve un array con <code>status</code> y{" "}
              <code>value</code> o <code>reason</code>.
            </>
          )}
          {metodoId === "promise-any" && (
            <>
              🏆 <code>Promise.any()</code> ignora los rechazos y se queda con la
              primera promesa resuelta. Si todas fallan, lanza un{" "}
              <code>AggregateError</code>.
            </>
          )}
        </div>
      </div>

      <div className="sim-console">
        <div className="sim-console-header">Consola</div>
        <div className="sim-console-body">
          {!resultado && (
            <span className="log-system">Esperando ejecución...</span>
          )}
          {resultado && (
            <>
              <div
                className={
                  resultado.estado === "fulfilled" ? "log-success" : "log-error"
                }
              >
                {resultado.estado === "fulfilled"
                  ? "✅ Promesa resuelta"
                  : "❌ Promesa rechazada"}
              </div>
              <div className="log-iteration">{resultado.mensaje}</div>
              <div className="log-result">
                {resultado.errores
                  ? `AggregateError: ${resultado.errores.join(", ")}`
                  : mostrar(resultado.valor)}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
