import { useEffect, useMemo, useState } from "react";
import CodeBlock from "../../../components/CodeBlock/CodeBlock";
import "../../../components/SimuladorFind/SimuladorFind.css";
import "./SimuladorConsoleLog.css";

const MODOS = [
  { id: "argumentos", label: "Argumentos separados" },
  { id: "template", label: "Template Literal" },
  { id: "llaves", label: "Truco de las llaves" },
];

const comillas = (texto) => JSON.stringify(texto);

const aNumero = (valor, defecto) => {
  if (String(valor).trim() === "") return defecto;
  const n = Number(valor);
  return Number.isFinite(n) ? Math.trunc(n) : defecto;
};

export default function SimuladorConsoleLog() {
  const [modo, setModo] = useState("argumentos");
  const [nombre, setNombre] = useState("Satoshi");
  const [edad, setEdad] = useState("35");
  const [host, setHost] = useState("localhost");
  const [puerto, setPuerto] = useState("8080");
  const [mutar, setMutar] = useState(false);
  const [paso, setPaso] = useState(0);
  const [playing, setPlaying] = useState(false);

  const edadNum = aNumero(edad, 35);
  const puertoNum = aNumero(puerto, 8080);
  const puertoMutado = puertoNum + 1000;
  const modoLabel = MODOS.find((m) => m.id === modo)?.label ?? modo;

  const codigo = useMemo(() => {
    if (modo === "argumentos") {
      return `const nombre = ${comillas(nombre)};
const edad = ${edadNum};

console.log("Nombre del usuario:", nombre, "Edad:", edad);`;
    }

    if (modo === "template") {
      return `const nombre = ${comillas(nombre)};
const edad = ${edadNum};

console.log(\`Hola, mi nombre es \${nombre} y tengo \${edad} años.\`);`;
    }

    const base = `const config = { puerto: ${puertoNum}, host: ${comillas(host)} };

console.log({ config });`;

    return mutar
      ? `${base}

config.puerto = ${puertoMutado}; // ⚠️ mutación posterior al log`
      : base;
  }, [modo, nombre, edadNum, host, puertoNum, mutar, puertoMutado]);

  const salida = useMemo(() => {
    if (modo === "argumentos") {
      return `Nombre del usuario: ${nombre} Edad: ${edadNum}`;
    }

    if (modo === "template") {
      return `Hola, mi nombre es ${nombre} y tengo ${edadNum} años.`;
    }

    const puertoMostrado = mutar ? puertoMutado : puertoNum;
    return `{ config: { puerto: ${puertoMostrado}, host: ${comillas(host)} } }`;
  }, [modo, nombre, edadNum, host, puertoNum, puertoMutado, mutar]);

  const pasos = useMemo(() => {
    const lista = [
      {
        tipo: "system",
        msg: `▶ Ejecutando console.log() · modo: ${modoLabel}`,
      },
    ];

    if (modo === "argumentos") {
      lista.push({
        tipo: "iteration",
        msg: `① Se evalúan 4 argumentos: "Nombre del usuario:", ${comillas(nombre)}, "Edad:", ${edadNum}`,
      });
      lista.push({
        tipo: "iteration",
        msg: "② Cada valor se convierte a texto legible y se une con un espacio",
      });
    } else if (modo === "template") {
      lista.push({
        tipo: "iteration",
        msg: `① Se evalúan las expresiones \${nombre} → ${comillas(nombre)} y \${edad} → ${edadNum}`,
      });
      lista.push({
        tipo: "iteration",
        msg: "② El template se resuelve en una sola cadena antes de llamar a console.log()",
      });
    } else {
      lista.push({
        tipo: "iteration",
        msg: `① Se crea el objeto config → { puerto: ${puertoNum}, host: ${comillas(host)} }`,
      });
      lista.push({
        tipo: "iteration",
        msg: "② console.log({ config }) agrupa la variable con su nombre para mostrarla con claridad",
      });
      if (mutar) {
        lista.push({
          tipo: "error",
          msg: `⚠️ Después del log, config.puerto cambia a ${puertoMutado}. La consola guarda una referencia y muestra el estado actual.`,
        });
      }
    }

    lista.push({
      tipo: "success",
      msg: "③ La representación legible se envía a la consola de depuración",
    });
    lista.push({ tipo: "result", msg: `⏹ Salida: ${salida}` });
    if (modo === "llaves" && mutar) {
      lista.push({
        tipo: "system",
        msg: `💡 Para congelar el valor: console.log(JSON.parse(JSON.stringify(config))) → puerto ${puertoNum}`,
      });
    }

    return lista;
  }, [modo, modoLabel, nombre, edadNum, host, puertoNum, puertoMutado, mutar, salida]);

  useEffect(() => {
    if (!playing || paso >= pasos.length) return;
    const timer = setTimeout(() => {
      const siguiente = Math.min(paso + 1, pasos.length);
      setPaso(siguiente);
      if (siguiente >= pasos.length) setPlaying(false);
    }, 750);
    return () => clearTimeout(timer);
  }, [playing, paso, pasos.length]);

  const reset = () => {
    setPlaying(false);
    setPaso(0);
  };

  const avanzar = () => setPaso((p) => Math.min(p + 1, pasos.length));

  const toggleEjecutar = () => {
    if (playing) {
      setPlaying(false);
      return;
    }
    if (paso >= pasos.length) reset();
    setPlaying(true);
  };

  const terminado = paso > 0 && paso >= pasos.length;

  const cambiar = (setter) => (event) => {
    setter(event.target.value);
    reset();
  };

  return (
    <div className="sim-container clog-sim">
      <div className="sim-header">
        <h3>
          🖨️ Simulador Interactivo: <code>console.log()</code>
        </h3>
        <p className="clog-subtitle">
          Cambia los valores y el modo de impresión para ver cómo se construye la
          salida de la consola. ✨
        </p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">
          console.log() · {modoLabel} · los valores se evalúan de izquierda a derecha
        </div>

        <div className="clog-controls">
          <label className="clog-field">
            <span>👤 Nombre</span>
            <input
              className="sim-input clog-input"
              type="text"
              value={nombre}
              onChange={cambiar(setNombre)}
              disabled={playing}
            />
          </label>

          <label className="clog-field">
            <span>🎂 Edad</span>
            <input
              className="sim-input clog-input clog-input--short"
              type="number"
              value={edad}
              onChange={cambiar(setEdad)}
              disabled={playing}
            />
          </label>

          <label className="clog-field">
            <span>🎛️ Modo</span>
            <select
              className="sim-input clog-input"
              value={modo}
              onChange={cambiar(setModo)}
              disabled={playing}
            >
              {MODOS.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.label}
                </option>
              ))}
            </select>
          </label>

          {modo === "llaves" && (
            <>
              <label className="clog-field">
                <span>🌐 Host</span>
                <input
                  className="sim-input clog-input"
                  type="text"
                  value={host}
                  onChange={cambiar(setHost)}
                  disabled={playing}
                />
              </label>

              <label className="clog-field">
                <span>🔌 Puerto</span>
                <input
                  className="sim-input clog-input clog-input--short"
                  type="number"
                  value={puerto}
                  onChange={cambiar(setPuerto)}
                  disabled={playing}
                />
              </label>

              <label className="clog-check">
                <input
                  type="checkbox"
                  checked={mutar}
                  onChange={(e) => {
                    setMutar(e.target.checked);
                    reset();
                  }}
                  disabled={playing}
                />
                <span>🔁 Mutar config después del log</span>
              </label>
            </>
          )}
        </div>

        <div className="clog-code">
          <CodeBlock code={codigo} />
        </div>

        <div className="sim-controls clog-actions">
          <button
            type="button"
            onClick={toggleEjecutar}
            className="sim-btn primary"
            disabled={terminado && !playing}
          >
            {playing ? "⏸ Pausar" : "▶ Ejecutar"}
          </button>
          <button
            type="button"
            onClick={avanzar}
            className="sim-btn"
            disabled={playing || terminado}
          >
            ⏭ Paso
          </button>
          <button type="button" onClick={reset} className="sim-btn">
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="clog-pipeline" aria-hidden="true">
        <div className={`clog-node ${paso > 0 ? "is-active" : ""}`}>
          <span className="clog-node__icon">🧩</span>
          <span className="clog-node__label">Argumentos</span>
          <small>valores originales</small>
        </div>
        <span className="clog-arrow">→</span>
        <div className={`clog-node ${paso > 1 ? "is-active" : ""}`}>
          <span className="clog-node__icon">🔄</span>
          <span className="clog-node__label">Texto legible</span>
          <small>representación</small>
        </div>
        <span className="clog-arrow">→</span>
        <div className={`clog-node ${terminado ? "is-done" : ""}`}>
          <span className="clog-node__icon">🖥️</span>
          <span className="clog-node__label">Consola</span>
          <small>salida</small>
        </div>
      </div>

      <div className="clog-terminal">
        <div className="clog-terminal__head">
          <span>🖥️ Consola · DevTools</span>
          <span className="clog-terminal__tag">console</span>
        </div>
        <div className="clog-terminal__body">
          {!terminado ? (
            <span className="clog-empty">
              Esperando ejecución... pulsa <strong>▶ Ejecutar</strong> o avanza
              paso a paso. 👀
            </span>
          ) : (
            <>
              <div className="clog-log-line">{salida}</div>
              {modo === "llaves" && mutar && (
                <div className="clog-warning">
                  ⚠️ La consola muestra el estado actual del objeto
                  (<strong>puerto {puertoMutado}</strong>), no el estado que tenía
                  al ejecutar el log (<strong>puerto {puertoNum}</strong>). Usa un
                  snapshot con <code>JSON.parse(JSON.stringify(config))</code>.
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="sim-console">
        <div className="sim-console-header">Traza paso a paso</div>
        <div className="sim-console-body">
          {paso === 0 && (
            <span className="log-system">
              Listo para simular. 🚀
            </span>
          )}
          {pasos.slice(0, paso).map((log, i) => (
            <div key={i} className={`log-${log.tipo}`}>
              {log.msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
