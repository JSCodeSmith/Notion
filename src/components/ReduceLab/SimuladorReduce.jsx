import { useEffect, useMemo, useState } from "react";

const OPERACIONES = {
  suma: {
    label: "Suma",
    icono: "➕",
    signo: "+",
    inicial: "0",
    fn: (acc, n) => acc + n,
    formula: (acc, n) => `${acc} + ${n}`,
    codigo: "(acc, n) => acc + n",
  },
  producto: {
    label: "Producto",
    icono: "✖️",
    signo: "×",
    inicial: "1",
    fn: (acc, n) => acc * n,
    formula: (acc, n) => `${acc} × ${n}`,
    codigo: "(acc, n) => acc * n",
  },
  maximo: {
    label: "Máximo",
    icono: "⬆️",
    signo: "max",
    inicial: "0",
    fn: (acc, n) => Math.max(acc, n),
    formula: (acc, n) => `Math.max(${acc}, ${n})`,
    codigo: "(acc, n) => Math.max(acc, n)",
  },
  minimo: {
    label: "Mínimo",
    icono: "⬇️",
    signo: "min",
    inicial: "99",
    fn: (acc, n) => Math.min(acc, n),
    formula: (acc, n) => `Math.min(${acc}, ${n})`,
    codigo: "(acc, n) => Math.min(acc, n)",
  },
};

const VELOCIDADES = [
  { valor: 1, label: "1×" },
  { valor: 2, label: "2×" },
  { valor: 0.5, label: "0.5×" },
];

const parsearLista = (texto) => {
  const partes = texto.split(/[,\s]+/).filter(Boolean);
  if (partes.length === 0) return { numeros: [], error: "Escribe al menos un número." };
  if (partes.length > 12) return { numeros: [], error: "Usa como máximo 12 números." };
  const numeros = partes.map(Number);
  if (numeros.some((n) => !Number.isFinite(n))) {
    return { numeros: [], error: "Solo números separados por comas o espacios." };
  }
  return { numeros, error: "" };
};

export default function SimuladorReduce() {
  const [entrada, setEntrada] = useState("10, 20, 30, 40");
  const [inicialTexto, setInicialTexto] = useState("0");
  const [operacionId, setOperacionId] = useState("suma");
  const [paso, setPaso] = useState(0);
  const [reproduciendo, setReproduciendo] = useState(false);
  const [velocidad, setVelocidad] = useState(1);

  const operacion = OPERACIONES[operacionId];
  const { numeros, error } = useMemo(() => parsearLista(entrada), [entrada]);
  const inicial = Number.isFinite(Number(inicialTexto)) ? Number(inicialTexto) : 0;

  const pasos = useMemo(() => {
    if (error || numeros.length === 0) return [];
    const lista = [{ indice: -1, elemento: null, anterior: null, actual: inicial, final: false }];
    let acc = inicial;
    numeros.forEach((numero, indice) => {
      const anterior = acc;
      acc = operacion.fn(acc, numero);
      lista.push({ indice, elemento: numero, anterior, actual: acc, final: indice === numeros.length - 1 });
    });
    return lista;
  }, [numeros, inicial, operacion, error]);

  const ultimo = Math.max(pasos.length - 1, 0);
  const actual = pasos[Math.min(paso, ultimo)] ?? null;

  useEffect(() => {
    if (!reproduciendo || paso >= ultimo) return;
    const id = setTimeout(() => {
      setPaso((valor) => Math.min(valor + 1, ultimo));
    }, 900 / velocidad);
    return () => clearTimeout(id);
  }, [reproduciendo, paso, ultimo, velocidad]);

  const cambiarEntrada = (valor) => {
    setEntrada(valor);
    setPaso(0);
    setReproduciendo(false);
  };

  const cambiarInicial = (valor) => {
    setInicialTexto(valor);
    setPaso(0);
    setReproduciendo(false);
  };

  const cambiarOperacion = (id) => {
    setOperacionId(id);
    setInicialTexto(OPERACIONES[id].inicial);
    setPaso(0);
    setReproduciendo(false);
  };

  const anterior = () => {
    setReproduciendo(false);
    setPaso((valor) => Math.max(valor - 1, 0));
  };
  const siguiente = () => {
    setReproduciendo(false);
    setPaso((valor) => Math.min(valor + 1, ultimo));
  };
  const reiniciar = () => {
    setReproduciendo(false);
    setPaso(0);
  };
  const alternarReproduccion = () => {
    if (terminado) {
      setPaso(0);
      setReproduciendo(true);
      return;
    }
    setReproduciendo((valor) => !valor);
  };

  const progreso = ultimo === 0 ? 0 : Math.round((Math.min(paso, ultimo) / ultimo) * 100);
  const terminado = paso >= ultimo && ultimo > 0;

  return (
    <section className="rl-app rl-sim">
      <header className="rl-sim__head">
        <div>
          <span className="rl-kicker">🧪 Simulador visual</span>
          <h3 className="rl-sim__title">reduce() paso a paso</h3>
          <p className="rl-sim__sub">
            Observa cómo el acumulador viaja por el array. Avanza, retrocede o deja que se ejecute
            solo.
          </p>
        </div>
        <div className="rl-sim__resultado">
          <span>Resultado final</span>
          <strong>{error || pasos.length === 0 ? "—" : pasos[ultimo]?.actual}</strong>
          {terminado && <em>✔ completado</em>}
        </div>
      </header>

      <div className="rl-sim__toolbar">
        <label className="rl-field">
          <span>Array</span>
          <input
            value={entrada}
            onChange={(evento) => cambiarEntrada(evento.target.value)}
            spellCheck={false}
            aria-label="Array de números"
          />
        </label>
        <label className="rl-field rl-field--short">
          <span>valorInicial</span>
          <input
            value={inicialTexto}
            onChange={(evento) => cambiarInicial(evento.target.value)}
            spellCheck={false}
            aria-label="Valor inicial del acumulador"
          />
        </label>
        <div className="rl-ops" role="group" aria-label="Operación de reducción">
          {Object.entries(OPERACIONES).map(([id, op]) => (
            <button
              key={id}
              type="button"
              className={`rl-chip ${id === operacionId ? "is-active" : ""}`}
              onClick={() => cambiarOperacion(id)}
              aria-pressed={id === operacionId}
            >
              <span>{op.icono}</span> {op.label}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <p className="rl-sim__error">⚠️ {error}</p>
      ) : (
        <>
          <div className="rl-sim__controls">
            <button type="button" className="rl-btn" onClick={reiniciar} aria-label="Reiniciar">
              ⏮️
            </button>
            <button type="button" className="rl-btn" onClick={anterior} aria-label="Paso anterior" disabled={paso === 0}>
              ◀
            </button>
            <button type="button" className="rl-btn rl-btn--primary" onClick={alternarReproduccion}>
              {terminado ? "↻ Repetir" : reproduciendo ? "⏸️ Pausar" : "▶ Reproducir"}
            </button>
            <button type="button" className="rl-btn" onClick={siguiente} aria-label="Paso siguiente" disabled={paso >= ultimo}>
              ▶
            </button>
            <label className="rl-field rl-field--short rl-speed">
              <span>Velocidad</span>
              <select value={velocidad} onChange={(evento) => setVelocidad(Number(evento.target.value))}>
                {VELOCIDADES.map((v) => (
                  <option key={v.valor} value={v.valor}>
                    {v.label}
                  </option>
                ))}
              </select>
            </label>
            <span className="rl-sim__step">
              Paso <strong>{Math.min(paso, ultimo)}</strong> / {ultimo}
            </span>
          </div>

          <div className="rl-progress" aria-hidden="true">
            <span style={{ width: `${progreso}%` }} />
          </div>

          <div className="rl-sim__grid">
            <div className="rl-panel">
              <div className="rl-panel__label">
                <span>📦 Array original</span>
                <span className="rl-mono">n = {numeros.length}</span>
              </div>
              <div className="rl-array">
                {numeros.map((numero, indice) => {
                  const estado =
                    actual && actual.indice === indice
                      ? "is-current"
                      : actual && actual.indice > indice
                        ? "is-past"
                        : "is-future";
                  return (
                    <div key={indice} className={`rl-array__cell ${estado}`}>
                      <span className="rl-array__idx">{indice}</span>
                      <strong>{numero}</strong>
                    </div>
                  );
                })}
              </div>

              <div className="rl-panel__label" style={{ marginTop: 18 }}>
                <span>🧠 Acumulador</span>
                <span className="rl-mono">{actual?.indice === -1 ? "inicio" : `iteración ${actual?.indice}`}</span>
              </div>
              <div className={`rl-acc ${terminado ? "is-done" : ""}`}>
                {actual?.anterior !== null && actual?.anterior !== undefined && (
                  <span className="rl-acc__old">{actual.anterior}</span>
                )}
                <strong className="rl-acc__value">{actual ? String(actual.actual) : inicial}</strong>
                {actual?.anterior !== null && actual?.anterior !== undefined && (
                  <span className="rl-acc__hint">
                    {operacion.formula(actual.anterior, actual.elemento)} = {actual.actual}
                  </span>
                )}
                {actual?.indice === -1 && (
                  <span className="rl-acc__hint">valorInicial = {inicial}</span>
                )}
              </div>
            </div>

            <div className="rl-panel">
              <div className="rl-panel__label">
                <span>🔁 Iteración</span>
                <span className="rl-mono">{actual?.indice === -1 ? "antes del bucle" : `elemento [${actual?.indice}]`}</span>
              </div>
              <div className="rl-formula">
                {actual?.indice === -1 ? (
                  <>
                    <code>acc</code> = <b>{inicial}</b>
                    <span className="rl-formula__nota">El acumulador arranca con el valorInicial.</span>
                  </>
                ) : (
                  <>
                    <span className="rl-formula__label">anterior</span>
                    <b>{actual.anterior}</b>
                    <span className="rl-formula__label">elemento</span>
                    <b>{actual.elemento}</b>
                    <span className="rl-formula__label">nuevo acc</span>
                    <b className="rl-formula__ok">{actual.actual}</b>
                    <code className="rl-formula__code">
                      {operacion.formula(actual.anterior, actual.elemento)}
                    </code>
                  </>
                )}
              </div>

              <pre className="rl-code">{`const resultado = numeros.reduce(
  ${operacion.codigo},
  ${inicial}
);`}</pre>

              <div className="rl-log">
                <div className="rl-log__title">Historial</div>
                {pasos.slice(0, Math.min(paso, ultimo) + 1).map((item) => (
                  <div key={item.indice} className="rl-log__row">
                    <span>{item.indice === -1 ? "inicio" : `i=${item.indice}`}</span>
                    <span className="rl-mono">
                      {item.indice === -1
                        ? String(item.actual)
                        : `${item.anterior} ${operacion.signo} ${item.elemento} → ${item.actual}`}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
}
