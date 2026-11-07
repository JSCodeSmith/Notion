import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getLiveExample } from "./liveExampleConfigs";
import "./LiveExamples.css";

const PALETA = [
  "🍎",
  "🍌",
  "🍇",
  "🍊",
  "🍓",
  "🍒",
  "🥝",
  "🍍",
  "🍉",
  "🥑",
  "🍕",
  "🍔",
  "🍟",
  "🌮",
  "🍩",
  "🍪",
  "🍿",
  "🐉",
  "🦄",
  "🤖",
  "👾",
  "🚀",
  "⭐",
  "💎",
  "🎮",
  "🕹️",
  "🎲",
  "🔥",
  "🌈",
  "✨",
];

const ARRAY_INICIAL = ["🍎", "🐉", "🍌", "⭐", "🍎"];
const NUMEROS_INICIALES = [4, 7.5, -2, 0, 123.456];
const FECHA_INICIAL = {
  year: 2024,
  month: 5,
  day: 15,
  hour: 10,
  minute: 30,
  second: 0,
};

const MAX_EMOJIS = 20;
const MAX_NUMEROS = 12;
const TIMEOUT_MS = 4000;

const CAMPOS_FECHA = [
  { campo: "year", etiqueta: "Año", min: 1970, max: 2100 },
  { campo: "month", etiqueta: "Mes", min: 1, max: 12 },
  { campo: "day", etiqueta: "Día", min: 1, max: 31 },
  { campo: "hour", etiqueta: "Hora", min: 0, max: 23 },
  { campo: "minute", etiqueta: "Min", min: 0, max: 59 },
  { campo: "second", etiqueta: "Seg", min: 0, max: 59 },
];

/* Comprueba que el ejemplo se pueda ejecutar sin romper el laboratorio.
   Solo analiza la sintaxis: no ejecuta nada. */
const esSintaxisValida = (codigo) => {
  try {
    new Function(`return (async () => {\n${codigo}\n})();`);
    return true;
  } catch {
    return false;
  }
};

const TEXTOS = {
  array: {
    desc: "Construye tu propio array con emojis, ajusta el código y ejecútalo en un sandbox aislado con su propia consola.",
    paso: "1 · Construye tu array con emojis",
    ayuda:
      "Pulsa un emoji para añadirlo. Pulsa una ficha del array para quitarla.",
    inyectado: (
      <>
        📥 El array se inyecta automáticamente como{" "}
        <code>const emojis = ...;</code> antes de tu código.
      </>
    ),
    reinicio: "♻️ Ejemplo restaurado con el array inicial. ¡Listo para experimentar!",
    consola:
      "Tu array se inyecta como `emojis` antes del código. Pulsa Ejecutar para ver el resultado.",
  },
  texto: {
    desc: "Construye tu texto con emojis, ajusta el código y ejecútalo en un sandbox aislado con su propia consola.",
    paso: "1 · Construye tu texto con emojis",
    ayuda:
      "Cada emoji se une con espacios para formar `texto`; el array sigue disponible como `emojis`.",
    inyectado: (
      <>
        📥 Se inyectan <code>const emojis = ...;</code> y{" "}
        <code>const texto = emojis.join(" ");</code>.
      </>
    ),
    reinicio: "♻️ Ejemplo restaurado con el texto inicial. ¡Listo para experimentar!",
    consola:
      "Se inyectan `emojis` y `texto` antes del código. Pulsa Ejecutar para ver el resultado.",
  },
  numero: {
    desc: "Ajusta tu lista de números, edita el código y ejecútalo en un sandbox aislado con su propia consola.",
    paso: "1 · Ajusta tu lista de números",
    ayuda:
      "Escribe un número y pulsa Añadir. Pulsa una ficha de la lista para quitarla.",
    inyectado: (
      <>
        📥 La lista se inyecta automáticamente como{" "}
        <code>const numeros = [...];</code> antes de tu código.
      </>
    ),
    reinicio: "♻️ Ejemplo restaurado con la lista inicial de números.",
    consola:
      "Tu lista se inyecta como `numeros` antes del código. Pulsa Ejecutar para ver el resultado.",
  },
  fecha: {
    desc: "Elige una fecha y hora, ajusta el código y ejecútalo en un sandbox aislado con su propia consola.",
    paso: "1 · Elige una fecha y hora",
    ayuda:
      "Los campos modifican la fecha que se inyecta en el sandbox. Mes va de 1 a 12.",
    inyectado: (
      <>
        📥 La fecha se inyecta automáticamente como{" "}
        <code>const fecha = new Date(...);</code> antes de tu código.
      </>
    ),
    reinicio: "♻️ Ejemplo restaurado con la fecha inicial.",
    consola:
      "Tu fecha se inyecta como `fecha` antes del código. Pulsa Ejecutar para ver el resultado.",
  },
};

const ICONOS = {
  sistema: "🛰️",
  log: "›",
  info: "ℹ️",
  warn: "⚠️",
  error: "⛔",
  debug: "🐞",
  resultado: "📦",
};

const ESTADOS = {
  idle: { texto: "Listo", clase: "idle" },
  running: { texto: "Ejecutando…", clase: "running" },
  ok: { texto: "Sin errores", clase: "ok" },
  error: { texto: "Con error", clase: "error" },
};

const mezclar = (lista) => {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};

const elegir = (lista) => lista[Math.floor(Math.random() * lista.length)];

const numeroACodigo = (numero) => {
  if (Number.isNaN(numero)) return "NaN";
  if (numero === Infinity) return "Infinity";
  if (numero === -Infinity) return "-Infinity";
  if (Object.is(numero, -0)) return "-0";
  return String(numero);
};

const formatearNumero = (numero) => numeroACodigo(numero);

export default function LiveExamples({ metodo, metodoId }) {
  const config = getLiveExample(metodo ?? metodoId);
  const categoria = config?.categoria ?? "array";
  const textos = TEXTOS[categoria] ?? TEXTOS.array;

  /* Pasos guiados: salen de los ejemplos del propio apunte, así cualquier
     método (aunque no tenga simulador propio) estrena laboratorio. */
  const pasos = useMemo(() => {
    const ejemplos = (metodo?.ejemplos ?? [])
      .filter((ej) => ej?.code && esSintaxisValida(ej.code))
      .map((ejemplo, indice) => ({
        titulo: ejemplo.titulo ?? `Paso ${indice + 1}`,
        descripcion: ejemplo.descripcion ?? "",
        codigo: ejemplo.code,
      }));

    const curado = config?.codigo
      ? [
          {
            titulo: config.titulo ?? "Ejecuta el ejemplo base",
            descripcion: config.descripcion ?? "",
            codigo: config.codigo,
          },
        ]
      : [];

    const vistos = new Set();
    return [...curado, ...ejemplos].filter((paso) => {
      const clave = paso.codigo.trim();
      if (vistos.has(clave)) return false;
      vistos.add(clave);
      return true;
    });
  }, [metodo, config]);

  const [array, setArray] = useState(ARRAY_INICIAL);
  const [numeros, setNumeros] = useState(NUMEROS_INICIALES);
  const [fechaPartes, setFechaPartes] = useState(FECHA_INICIAL);
  const [entradaNumero, setEntradaNumero] = useState("");
  const [codigo, setCodigo] = useState(() => config?.codigo ?? "");
  const [logs, setLogs] = useState(() =>
    config
      ? [
          {
            nivel: "sistema",
            texto: `🧩 Sandbox listo · ${config.etiqueta}`,
          },
          {
            nivel: "info",
            texto: textos.consola,
          },
        ]
      : [],
  );
  const [estado, setEstado] = useState("idle");
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [lineaError, setLineaError] = useState(null);
  const [depuracion, setDepuracion] = useState(false);
  const [pasoActual, setPasoActual] = useState(0);
  const [pasosAbiertos, setPasosAbiertos] = useState(true);

  const workerRef = useRef(null);
  const timeoutRef = useRef(null);
  const runIdRef = useRef(0);
  const editorRef = useRef(null);
  const gutterRef = useRef(null);

  const cancelar = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  useEffect(() => () => cancelar(), [cancelar]);

  const limpiarSalida = useCallback(
    (texto) => {
      cancelar();
      setEstado("idle");
      setResultado(null);
      setError(null);
      setLineaError(null);
      setLogs([{ nivel: "sistema", texto }]);
    },
    [cancelar],
  );

  /* ---------------- Constructor de emojis ---------------- */

  const agregar = (emoji) => {
    if (array.length >= MAX_EMOJIS) return;
    limpiarSalida(
      `➕ Añadido ${emoji}. El array tiene ${array.length + 1} emojis. Ejecuta para ver el resultado.`,
    );
    setArray((actuales) => [...actuales, emoji]);
  };

  const quitar = (indice) => {
    const emoji = array[indice];
    limpiarSalida(`➖ Quitado ${emoji} del índice ${indice}.`);
    setArray((actuales) => actuales.filter((_, i) => i !== indice));
  };

  const barajar = () => {
    if (array.length < 2) return;
    limpiarSalida("🔀 Array mezclado. Ejecuta para ver cómo cambia el resultado.");
    setArray((actuales) => mezclar(actuales));
  };

  const aleatorio = () => {
    const nuevos = Array.from({ length: 6 }, () => elegir(PALETA));
    limpiarSalida("🎲 Array aleatorio generado. Ejecuta el ejemplo.");
    setArray(nuevos);
  };

  const vaciar = () => {
    limpiarSalida(
      "🧹 Array vacío. Muchos métodos devuelven un resultado curioso sin elementos.",
    );
    setArray([]);
  };

  /* ---------------- Constructor de números ---------------- */

  const agregarNumero = () => {
    const limpio = entradaNumero.trim().replace(",", ".");

    if (limpio === "") return;

    if (numeros.length >= MAX_NUMEROS) {
      limpiarSalida(`⚠️ La lista ya tiene el máximo de ${MAX_NUMEROS} números.`);
      return;
    }

    const minusculas = limpio.toLowerCase();
    const especiales = {
      nan: NaN,
      infinity: Infinity,
      "-infinity": -Infinity,
    };
    const valor = Object.prototype.hasOwnProperty.call(especiales, minusculas)
      ? especiales[minusculas]
      : Number(limpio);

    if (!Object.prototype.hasOwnProperty.call(especiales, minusculas) && !Number.isFinite(valor)) {
      limpiarSalida(`⚠️ "${entradaNumero}" no es un número válido.`);
      setEntradaNumero("");
      return;
    }

    limpiarSalida(
      `➕ Añadido ${formatearNumero(valor)}. La lista tiene ${numeros.length + 1} números.`,
    );
    setNumeros((actuales) => [...actuales, valor]);
    setEntradaNumero("");
  };

  const quitarNumero = (indice) => {
    limpiarSalida(`➖ Quitado ${formatearNumero(numeros[indice])} de la lista.`);
    setNumeros((actuales) => actuales.filter((_, i) => i !== indice));
  };

  const numerosAleatorios = () => {
    const nuevos = Array.from({ length: 6 }, () => {
      const entero = Math.floor(Math.random() * 200) - 100;
      return Math.random() > 0.5 ? entero : Math.round((entero / 3) * 100) / 100;
    });
    limpiarSalida("🎲 Lista aleatoria generada. Ejecuta el ejemplo.");
    setNumeros(nuevos);
  };

  const vaciarNumeros = () => {
    limpiarSalida("🧹 Lista vacía. Observa qué hace el método sin números.");
    setNumeros([]);
  };

  /* ---------------- Constructor de fechas ---------------- */

  const cambiarFecha = (campo, min, max) => (evento) => {
    const valor = Number(evento.target.value);
    if (!Number.isFinite(valor)) return;
    const acotado = Math.min(max, Math.max(min, Math.trunc(valor)));
    setFechaPartes((actual) => ({ ...actual, [campo]: acotado }));
  };

  const usarAhora = () => {
    const ahora = new Date();
    setFechaPartes({
      year: ahora.getFullYear(),
      month: ahora.getMonth() + 1,
      day: ahora.getDate(),
      hour: ahora.getHours(),
      minute: ahora.getMinutes(),
      second: ahora.getSeconds(),
    });
    limpiarSalida("🕒 Fecha y hora actuales cargadas en el constructor.");
  };

  /* ---------------- Común ---------------- */

  const restaurarTodo = () => {
    if (categoria === "numero") setNumeros(NUMEROS_INICIALES);
    else if (categoria === "fecha") setFechaPartes(FECHA_INICIAL);
    else setArray(ARRAY_INICIAL);
    setEntradaNumero("");
    setCodigo(config?.codigo ?? "");
    setPasoActual(0);
    limpiarSalida(textos.reinicio);
  };

  const restaurarCodigo = () => {
    setCodigo(config?.codigo ?? "");
    setPasoActual(0);
    limpiarSalida("↺ Código del ejemplo restaurado. Tus datos se conservan.");
  };

  const preludioDatos = useMemo(() => {
    switch (categoria) {
      case "texto":
        return `const emojis = ${JSON.stringify(array)};\nconst texto = emojis.join(" ");\n`;
      case "numero":
        return `const numeros = [${numeros.map(numeroACodigo).join(", ")}];\n`;
      case "fecha":
        return `const fecha = new Date(${fechaPartes.year}, ${
          fechaPartes.month - 1
        }, ${fechaPartes.day}, ${fechaPartes.hour}, ${fechaPartes.minute}, ${
          fechaPartes.second
        });\n`;
      default:
        return `const emojis = ${JSON.stringify(array)};\n`;
    }
  }, [categoria, array, numeros, fechaPartes]);

  const cargarPaso = (indice) => {
    const paso = pasos[indice];
    if (!paso) return;
    setPasoActual(indice);
    setCodigo(paso.codigo);
    setLineaError(null);
    setEstado("idle");
    setResultado(null);
    setError(null);
    setLogs([
      {
        nivel: "sistema",
        texto: `🧭 Paso ${indice + 1} de ${pasos.length} cargado en el editor. Ejecútalo para ver el resultado.`,
      },
      { nivel: "info", texto: paso.titulo },
    ]);
  };

  const ejecutarPaso = (indice) => {
    const paso = pasos[indice];
    if (!paso) return;
    setPasoActual(indice);
    setCodigo(paso.codigo);
    ejecutar(paso.codigo);
  };

  const ejecutar = (codigoOverride) => {
    if (!config || estado === "running") return;
    const codigoActivo =
      typeof codigoOverride === "string" ? codigoOverride : codigo;

    cancelar();

    if (typeof window === "undefined" || typeof Worker === "undefined") {
      setEstado("error");
      setError("Este sandbox necesita un navegador con soporte de Web Workers.");
      return;
    }

    const id = runIdRef.current + 1;
    runIdRef.current = id;
    const preludio = config.preludio
      ? `${preludioDatos}${config.preludio}\n`
      : preludioDatos;
    const base = [
      {
        nivel: "sistema",
        texto: `▶ Ejecutando ${config.etiqueta} en un worker aislado…`,
      },
      {
        nivel: "info",
        texto: preludioDatos.trim(),
      },
    ];

    if (config.entorno) {
      base.push({ nivel: "info", texto: config.entorno });
    }

    setEstado("running");
    setResultado(null);
    setError(null);
    setLineaError(null);
    setLogs(base);

    let worker;
    try {
      worker = new Worker(new URL("./advancedGameWorker.js", import.meta.url), {
        type: "module",
      });
    } catch {
      setEstado("error");
      setError("No se pudo iniciar el sandbox.");
      return;
    }

    workerRef.current = worker;

    timeoutRef.current = window.setTimeout(() => {
      if (runIdRef.current !== id) return;
      cancelar();
      setEstado("error");
      setError("⏱️ Tiempo agotado (4 s). Revisa si hay un bucle infinito.");
      setLogs([
        ...base,
        {
          nivel: "error",
          texto: "⏱️ Ejecución detenida: el código tardó más de 4 segundos.",
        },
      ]);
    }, TIMEOUT_MS);

    worker.onmessage = (evento) => {
      const data = evento.data ?? {};
      if (runIdRef.current !== id) return;

      cancelar();

      const logsWorker = Array.isArray(data.logs)
        ? data.logs.map((log) => ({
            nivel: log?.nivel ?? "log",
            texto: String(log?.texto ?? ""),
          }))
        : [];

      if (!data.ok) {
        const textoError = data.error || "Error desconocido";
        setEstado("error");
        setResultado(null);
        setError(textoError);
        setLineaError(
          Number.isFinite(data.linea) && data.linea > 0 ? data.linea : null,
        );
        setLogs([
          ...base,
          ...logsWorker,
          { nivel: "error", texto: `💥 ${textoError}` },
        ]);
        return;
      }

      const textoResultado = data.texto ?? "undefined";
      setEstado("ok");
      setLineaError(null);
      setResultado({ texto: textoResultado });
      setLogs([
        ...base,
        ...logsWorker,
        { nivel: "resultado", texto: `return → ${textoResultado}` },
      ]);
    };

    worker.onerror = (evento) => {
      if (runIdRef.current !== id) return;
      cancelar();
      setEstado("error");
      setError(evento?.message || "El sandbox no pudo ejecutar el código.");
      setLogs([
        ...base,
        {
          nivel: "error",
          texto: `💥 ${evento?.message || "Fallo del entorno de ejecución."}`,
        },
      ]);
    };

    worker.postMessage({ id, codigo: codigoActivo, preludio, estricto: config.estricto !== false });
  };

  const manejarTecla = (evento) => {
    if (evento.key === "Tab") {
      evento.preventDefault();
      const { selectionStart, selectionEnd, value } = evento.currentTarget;
      const nuevo = `${value.slice(0, selectionStart)}  ${value.slice(selectionEnd)}`;
      setCodigo(nuevo);
      window.requestAnimationFrame(() => {
        const editor = editorRef.current;
        if (!editor) return;
        editor.selectionStart = selectionStart + 2;
        editor.selectionEnd = selectionStart + 2;
      });
      return;
    }
    if ((evento.ctrlKey || evento.metaKey) && evento.key === "Enter") {
      evento.preventDefault();
      ejecutar();
    }
  };

  const sincronizarScroll = (evento) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = evento.currentTarget.scrollTop;
    }
  };

  const vistaPrevia = useMemo(() => {
    if (categoria === "numero") return `[${numeros.map(formatearNumero).join(", ")}]`;
    if (categoria === "fecha") {
      return `${fechaPartes.year}-${String(fechaPartes.month).padStart(2, "0")}-${String(
        fechaPartes.day,
      ).padStart(2, "0")} ${String(fechaPartes.hour).padStart(2, "0")}:${String(
        fechaPartes.minute,
      ).padStart(2, "0")}`;
    }
    return JSON.stringify(array);
  }, [categoria, array, numeros, fechaPartes]);

  if (!config) return null;

  const lineas = codigo.split("\n");
  const chip = ESTADOS[estado] ?? ESTADOS.idle;
  const esEmoji = categoria === "array" || categoria === "texto";

  return (
    <section className="le">
      <div className="le__aura" aria-hidden="true" />

      <header className="le-hero">
        <div className="le-hero__main">
          <div className="le-hero__icon" aria-hidden="true">
            🧩
          </div>
          <div className="le-hero__text">
            <p className="le-hero__eyebrow">SANDBOX SEGURO · EJEMPLO EN VIVO</p>
            <h2 className="le-hero__title">Ejemplos vivos</h2>
            <p className="le-hero__desc">{textos.desc}</p>
          </div>
        </div>
        <div className="le-hero__side">
          <span className="le-method">{config.etiqueta}</span>
          <span className="le-lock">🔒 Worker aislado · 4 s</span>
          {config.entorno && (
            <span className="le-lock le-lock--demo">🧪 Entorno simulado</span>
          )}
        </div>
      </header>

      {pasos.length > 0 && (
        <section className="le-lab">
          <div className="le-lab__head">
            <div>
              <p className="le-step">🧭 Laboratorio paso a paso</p>
              <p className="le-help">
                Recorre los {pasos.length} pasos del apunte, cárgalos en el
                editor, ejecútalos y depura lo que ocurra en la consola.
              </p>
            </div>
            <button
              type="button"
              className="le-mini"
              onClick={() => setPasosAbiertos((valor) => !valor)}
              aria-expanded={pasosAbiertos}
            >
              {pasosAbiertos ? "▾ Ocultar pasos" : "▸ Ver pasos"}
            </button>
          </div>

          {pasosAbiertos && (
            <>
              <div className="le-lab__rail" role="tablist" aria-label="Pasos del laboratorio">
                {pasos.map((paso, indice) => (
                  <button
                    key={`${paso.titulo}-${indice}`}
                    type="button"
                    role="tab"
                    aria-selected={indice === pasoActual}
                    className={`le-lab__dot ${
                      indice === pasoActual ? "is-active" : ""
                    }`}
                    onClick={() => setPasoActual(indice)}
                    title={paso.titulo}
                  >
                    <span>{indice + 1}</span>
                    <small>{paso.titulo}</small>
                  </button>
                ))}
              </div>

              <div className="le-lab__card">
                <div className="le-lab__card-head">
                  <div>
                    <p className="le-lab__eyebrow">
                      Paso {pasoActual + 1} de {pasos.length}
                    </p>
                    <h3>{pasos[pasoActual].titulo}</h3>
                    {pasos[pasoActual].descripcion && (
                      <p className="le-lab__desc">
                        {pasos[pasoActual].descripcion}
                      </p>
                    )}
                  </div>
                  <span className="le-lab__badge">📚 Del apunte</span>
                </div>

                <pre className="le-lab__code">
                  <code>{pasos[pasoActual].codigo}</code>
                </pre>

                <div className="le-lab__actions">
                  <button
                    type="button"
                    className="le-btn"
                    onClick={() => cargarPaso(pasoActual)}
                  >
                    📥 Cargar en el editor
                  </button>
                  <button
                    type="button"
                    className="le-btn le-btn--primary"
                    onClick={() => ejecutarPaso(pasoActual)}
                    disabled={estado === "running"}
                  >
                    ▶ Ejecutar este paso
                  </button>
                  <button
                    type="button"
                    className="le-mini"
                    onClick={() => setPasoActual((valor) => Math.max(0, valor - 1))}
                    disabled={pasoActual === 0}
                  >
                    ← Anterior
                  </button>
                  <button
                    type="button"
                    className="le-mini"
                    onClick={() =>
                      setPasoActual((valor) =>
                        Math.min(pasos.length - 1, valor + 1),
                      )
                    }
                    disabled={pasoActual === pasos.length - 1}
                  >
                    Siguiente →
                  </button>
                </div>
              </div>
            </>
          )}
        </section>
      )}

      <div className="le-builder">
        <div className="le-builder__head">
          <div>
            <p className="le-step">{textos.paso}</p>
            <p className="le-help">{textos.ayuda}</p>
          </div>
          <div className="le-builder__actions">
            {esEmoji ? (
              <>
                <button type="button" className="le-mini" onClick={aleatorio}>
                  🎲 Aleatorio
                </button>
                <button
                  type="button"
                  className="le-mini"
                  onClick={barajar}
                  disabled={array.length < 2}
                >
                  🔀 Mezclar
                </button>
                <button
                  type="button"
                  className="le-mini"
                  onClick={vaciar}
                  disabled={array.length === 0}
                >
                  🧹 Vaciar
                </button>
              </>
            ) : categoria === "numero" ? (
              <>
                <button type="button" className="le-mini" onClick={numerosAleatorios}>
                  🎲 Aleatorio
                </button>
                <button
                  type="button"
                  className="le-mini"
                  onClick={() => {
                    limpiarSalida("🔀 Lista mezclada. Ejecuta el ejemplo.");
                    setNumeros((actuales) => mezclar(actuales));
                  }}
                  disabled={numeros.length < 2}
                >
                  🔀 Mezclar
                </button>
                <button
                  type="button"
                  className="le-mini"
                  onClick={vaciarNumeros}
                  disabled={numeros.length === 0}
                >
                  🧹 Vaciar
                </button>
              </>
            ) : (
              <button type="button" className="le-mini" onClick={usarAhora}>
                🕒 Ahora
              </button>
            )}
            <button type="button" className="le-mini" onClick={restaurarTodo}>
              ♻️ Reiniciar
            </button>
          </div>
        </div>

        {esEmoji && (
          <div className="le-palette">
            {PALETA.map((emoji) => (
              <button
                type="button"
                className="le-palette__btn"
                key={emoji}
                onClick={() => agregar(emoji)}
                disabled={array.length >= MAX_EMOJIS}
                title={`Añadir ${emoji}`}
                aria-label={`Añadir ${emoji} al array`}
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        {categoria === "numero" && (
          <form
            className="le-number-form"
            onSubmit={(evento) => {
              evento.preventDefault();
              agregarNumero();
            }}
          >
            <input
              className="le-number-input"
              value={entradaNumero}
              onChange={(evento) => setEntradaNumero(evento.target.value)}
              placeholder="Escribe un número: 42, 3.14, -7…"
              inputMode="decimal"
              aria-label="Número que quieres añadir a la lista"
            />
            <button type="submit" className="le-mini le-mini--add">
              ➕ Añadir
            </button>
            <span className="le-number-hint">
              {numeros.length} / {MAX_NUMEROS}
            </span>
          </form>
        )}

        {categoria === "fecha" && (
          <div className="le-date">
            {CAMPOS_FECHA.map(({ campo, etiqueta, min, max }) => (
              <label className="le-date__field" key={campo}>
                <span>{etiqueta}</span>
                <input
                  className="le-date__input"
                  type="number"
                  min={min}
                  max={max}
                  value={fechaPartes[campo]}
                  onChange={cambiarFecha(campo, min, max)}
                />
              </label>
            ))}
          </div>
        )}

        <div className="le-array">
          <div className="le-array__head">
            <span className="le-array__caption">
              {esEmoji ? "Tu array" : categoria === "numero" ? "Tu lista" : "Tu fecha"}{" "}
              <span>
                {esEmoji
                  ? `${array.length} / ${MAX_EMOJIS}`
                  : categoria === "numero"
                    ? `${numeros.length} / ${MAX_NUMEROS}`
                    : "editable"}
              </span>
            </span>
            <code
              className="le-array__json"
              title="Datos que se inyectan en el sandbox"
            >
              {vistaPrevia}
            </code>
          </div>

          {esEmoji && (
            <>
              <div className="le-array__decl">
                <span className="le-kw">const</span>{" "}
                <span className="le-var">emojis</span> = [
              </div>
              <div className="le-array__items">
                {array.length === 0 && (
                  <span className="le-array__empty">
                    // array vacío · usa la paleta para añadir emojis
                  </span>
                )}
                {array.map((emoji, indice) => (
                  <button
                    type="button"
                    className="le-chip"
                    key={`${emoji}-${indice}`}
                    onClick={() => quitar(indice)}
                    title={`Quitar ${emoji}`}
                    aria-label={`Quitar ${emoji} del índice ${indice}`}
                  >
                    <span className="le-chip__index">{indice}</span>
                    <span className="le-chip__emoji">{emoji}</span>
                    <span className="le-chip__x" aria-hidden="true">
                      ×
                    </span>
                  </button>
                ))}
              </div>
              <div className="le-array__decl le-array__decl--close">];</div>
            </>
          )}

          {categoria === "numero" && (
            <>
              <div className="le-array__decl">
                <span className="le-kw">const</span>{" "}
                <span className="le-var">numeros</span> = [
              </div>
              <div className="le-array__items">
                {numeros.length === 0 && (
                  <span className="le-array__empty">
                    // lista vacía · añade números con el campo de arriba
                  </span>
                )}
                {numeros.map((numero, indice) => (
                  <button
                    type="button"
                    className="le-chip le-chip--number"
                    key={`${formatearNumero(numero)}-${indice}`}
                    onClick={() => quitarNumero(indice)}
                    title={`Quitar ${formatearNumero(numero)}`}
                    aria-label={`Quitar ${formatearNumero(numero)} de la lista`}
                  >
                    <span className="le-chip__index">{indice}</span>
                    <span className="le-chip__value">{formatearNumero(numero)}</span>
                    <span className="le-chip__x" aria-hidden="true">
                      ×
                    </span>
                  </button>
                ))}
              </div>
              <div className="le-array__decl le-array__decl--close">];</div>
            </>
          )}

          {categoria === "fecha" && (
            <>
              <div className="le-array__decl">
                <span className="le-kw">const</span>{" "}
                <span className="le-var">fecha</span> ={" "}
                <span className="le-kw">new</span> Date(
              </div>
              <div className="le-date__preview">
                {fechaPartes.year}, {fechaPartes.month - 1}, {fechaPartes.day},{" "}
                {fechaPartes.hour}, {fechaPartes.minute}, {fechaPartes.second}
              </div>
              <div className="le-array__decl le-array__decl--close">);</div>
            </>
          )}
        </div>
      </div>

      <div className="le-explain">
        <div className="le-explain__main">
          <span className="le-explain__method">{config.titulo}</span>
          <p className="le-explain__desc">{config.descripcion}</p>
          <p className="le-explain__try">💡 Prueba esto: {config.prueba}</p>
        </div>
        <button type="button" className="le-reset-code" onClick={restaurarCodigo}>
          ↺ Restaurar código
        </button>
      </div>

      <div className="le-workbench">
        <div className="le-panel">
          <div className="le-panel__head">
            <span className="le-panel__title">
              <span className="le-dot le-dot--red" />
              <span className="le-dot le-dot--yellow" />
              <span className="le-dot le-dot--green" />
              <span className="le-panel__file">ejemplo.js</span>
            </span>
            <span className="le-panel__hint">Ctrl + Enter para ejecutar</span>
          </div>

          <div className="le-editor">
            <div className="le-gutter" ref={gutterRef} aria-hidden="true">
              {lineas.map((_, indice) => (
                <span
                  key={indice}
                  className={
                    lineaError === indice + 1 ? "is-error" : undefined
                  }
                >
                  {lineaError === indice + 1 ? "●" : indice + 1}
                </span>
              ))}
            </div>
            <textarea
              ref={editorRef}
              className="le-textarea"
              value={codigo}
              onChange={(evento) => setCodigo(evento.target.value)}
              onKeyDown={manejarTecla}
              onScroll={sincronizarScroll}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              aria-label={`Editor de ejemplo vivo para ${config.etiqueta}`}
            />
          </div>

          {lineaError && (
            <div className="le-line-error" role="alert">
              <strong>🐞 Línea {lineaError}</strong>
              <code>{lineas[lineaError - 1] ?? ""}</code>
            </div>
          )}

          <div className="le-actions">
            <button
              type="button"
              className="le-btn le-btn--primary"
              onClick={ejecutar}
              disabled={estado === "running"}
            >
              {estado === "running" ? (
                <>
                  <span className="le-spinner" /> Ejecutando…
                </>
              ) : (
                <>▶ Ejecutar ejemplo</>
              )}
            </button>
            <button
              type="button"
              className="le-btn"
              onClick={() => limpiarSalida("🧹 Consola limpia. Pulsa Ejecutar.")}
              disabled={estado === "running"}
            >
              🧹 Limpiar consola
            </button>
            <button
              type="button"
              className={`le-btn ${depuracion ? "is-active" : ""}`}
              onClick={() => setDepuracion((valor) => !valor)}
              aria-pressed={depuracion}
            >
              🐞 {depuracion ? "Depuración activa" : "Depurar"}
            </button>
            <span className={`le-chip-estado le-chip-estado--${chip.clase}`}>
              <span /> {chip.texto}
            </span>
          </div>

          <p className="le-injected">{textos.inyectado}</p>
        </div>

        <div className={`le-console le-console--${estado}`}>
          <div className="le-panel__head">
            <span className="le-panel__title">
              <span className="le-console__live" /> Consola
            </span>
            <span className="le-panel__hint">{logs.length} líneas</span>
          </div>

          <div className="le-console__body" aria-live="polite">
            {logs.map((log, indice) => (
              <div
                className={`le-log le-log--${log.nivel}`}
                key={`${indice}-${log.nivel}`}
              >
                <span className="le-log__icon" aria-hidden="true">
                  {ICONOS[log.nivel] ?? "›"}
                </span>
                <span className="le-log__text">{log.texto}</span>
              </div>
            ))}
            {estado === "running" && (
              <div className="le-log le-log--sistema">
                <span className="le-log__icon">
                  <span className="le-spinner le-spinner--sm" />
                </span>
                <span className="le-log__text">Ejecutando en el worker…</span>
              </div>
            )}
          </div>

          {resultado && (
            <div className="le-result">
              <span className="le-result__label">Resultado de tu código</span>
              <code className="le-result__code">{resultado.texto}</code>
            </div>
          )}

          {error && (
            <div className="le-error">
              <strong>Error</strong>
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>

      {depuracion && (
        <section className="le-debug">
          <div className="le-debug__head">
            <div>
              <p className="le-step">🐞 Depuración guiada</p>
              <p className="le-help">
                Estado de la última ejecución, línea exacta del error y pistas
                sacadas de los errores comunes del apunte.
              </p>
            </div>
            <button
              type="button"
              className="le-mini"
              onClick={() => setDepuracion(false)}
            >
              Cerrar
            </button>
          </div>

          <div className="le-debug__grid">
            <div className="le-debug__cell">
              <span>Estado</span>
              <strong className={`le-debug__state is-${chip.clase}`}>
                {chip.texto}
              </strong>
            </div>
            <div className="le-debug__cell">
              <span>Línea del error</span>
              <strong>{lineaError ?? "—"}</strong>
            </div>
            <div className="le-debug__cell">
              <span>Resultado</span>
              <code>{resultado?.texto ?? "—"}</code>
            </div>
          </div>

          {error && (
            <div className="le-debug__error">
              <strong>Error detectado</strong>
              <span>{error}</span>
              {lineaError && (
                <code>{lineas[lineaError - 1] ?? ""}</code>
              )}
            </div>
          )}

          {!error && (
            <p className="le-debug__ok">
              ✅ Sin excepciones. Revisa la consola para comprobar cada salida y
              compara el resultado con lo que esperabas.
            </p>
          )}

          {metodo?.errores?.length > 0 && (
            <div className="le-debug__tips">
              <strong>⚠️ Errores comunes que conviene revisar</strong>
              <ul>
                {metodo.errores.slice(0, 3).map((texto, indice) => (
                  <li key={indice}>{texto}</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      )}
    </section>
  );
}
