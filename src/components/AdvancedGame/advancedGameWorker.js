/* Worker aislado que ejecuta el código del jugador.
   Se crea uno nuevo por ejecución y se termina al recibir la respuesta
   (o al agotarse el tiempo desde el hilo principal). */

import { firma, formatear, serializar } from "./serializar";
import { instrumentar } from "./traza";

const MAX_TRAZA = 450;

const crearConsola = (registros, obtenerPaso = () => -1) => {
  const contadores = new Map();
  const tiempos = new Map();
  let profundidad = 0;

  const anotar = (nivel) => (...args) => {
    registros.push({
      nivel,
      paso: obtenerPaso(),
      texto:
        "  ".repeat(profundidad) +
        args.map((arg) => formatear(arg)).join(" "),
    });
  };

  const ahora = () =>
    typeof performance !== "undefined" ? performance.now() : Date.now();

  const duracion = (etiqueta) => {
    const inicio = tiempos.get(etiqueta);
    if (inicio === undefined) return null;
    return Math.round((ahora() - inicio) * 100) / 100;
  };

  const abrirGrupo = (...args) => {
    if (args.length) anotar("log")(...args);
    profundidad += 1;
  };

  const consola = {
    log: anotar("log"),
    info: anotar("info"),
    warn: anotar("warn"),
    error: anotar("error"),
    debug: anotar("debug"),
    dir: anotar("log"),
    dirxml: anotar("log"),
    table: (...args) => {
      registros.push({
        nivel: "log",
        paso: obtenerPaso(),
        texto:
          "  ".repeat(profundidad) +
          args.map((arg) => formatear(arg)).join("\n"),
      });
    },
    trace: (...args) => {
      anotar("debug")("Traza de pila:", ...args);
    },
    group: abrirGrupo,
    groupCollapsed: abrirGrupo,
    groupEnd: () => {
      profundidad = Math.max(0, profundidad - 1);
    },
    time: (etiqueta = "default") => {
      tiempos.set(String(etiqueta), ahora());
    },
    timeLog: (etiqueta = "default", ...args) => {
      const clave = String(etiqueta);
      const ms = duracion(clave);
      anotar("log")(
        clave + ": " + (ms === null ? "cronómetro no iniciado" : ms + " ms"),
        ...args,
      );
    },
    timeEnd: (etiqueta = "default") => {
      const clave = String(etiqueta);
      const ms = duracion(clave);
      tiempos.delete(clave);
      anotar("log")(
        clave + ": " + (ms === null ? "cronómetro no iniciado" : ms + " ms"),
      );
    },
    timeStamp: (etiqueta = "") => {
      anotar("log")("⏱️ " + (String(etiqueta) || "timestamp") + " → " + Date.now());
    },
    count: (etiqueta = "default") => {
      const clave = String(etiqueta);
      const siguiente = (contadores.get(clave) ?? 0) + 1;
      contadores.set(clave, siguiente);
      anotar("log")(clave + ": " + siguiente);
    },
    countReset: (etiqueta = "default") => {
      const clave = String(etiqueta);
      contadores.set(clave, 0);
      anotar("log")(clave + ": 0");
    },
    assert: (condicion, ...args) => {
      if (!condicion) anotar("error")("Assertion failed:", ...args);
    },
    clear: () => {
      registros.push({
        nivel: "sistema",
        paso: obtenerPaso(),
        texto: "🧹 console.clear() solicitado",
      });
    },
  };

  return consola;
};

self.onmessage = async (evento) => {
  const { id, codigo, preludio = "", estricto = true, trazar = false } = evento.data
  const registros = []
  const traza = []
  let truncada = false
  let pasoActual = -1
  let codigoEjecutar = codigo

  if (trazar) {
    const instrumentado = instrumentar(codigo)
    if (!instrumentado.ok) {
      self.postMessage({
        id,
        ok: false,
        logs: [],
        traza: [],
        error: instrumentado.error,
        linea: instrumentado.linea,
        columna: null,
      })
      return
    }
    codigoEjecutar = instrumentado.codigo
  }

  const __trace = (linea, obtener) => {
    if (traza.length >= MAX_TRAZA) {
      truncada = true
      return
    }
    let variables = []
    try {
      const valores = obtener?.() ?? {}
      variables = Object.entries(valores)
        .slice(0, 60)
        .map(([nombre, valor]) => [nombre, formatear(valor)])
    } catch {
      variables = []
    }
    traza.push({ linea, variables })
    pasoActual = traza.length - 1
  }

  try {
    const cuerpo = `${estricto ? '"use strict";\n' : ""}return (async () => {\n${preludio}\n${codigoEjecutar}\n})();`
    const ejecutar = trazar
      ? new Function("console", "__trace", cuerpo)
      : new Function("console", cuerpo)

    const consola = crearConsola(registros, () => pasoActual)
    const resultado = trazar
      ? await ejecutar(consola, __trace)
      : await ejecutar(consola)

    self.postMessage({
      id,
      ok: true,
      logs: registros,
      valor: serializar(resultado),
      texto: formatear(resultado),
      firma: firma(resultado),
      traza,
      truncada,
    })
  } catch (error) {
    const texto =
      error instanceof Error
        ? `${error.name}: ${error.message}`
        : String(error)

    /* Traduce la línea del stack de `new Function` a la línea real del
       editor. V8 añade 2 líneas de función + el envoltorio async; la línea
       de "use strict" solo existe cuando el modo estricto está activo. */
    const pila = error instanceof Error ? String(error.stack ?? "") : ""
    const coincidencia = pila.match(/<anonymous>:(\d+):(\d+)/)
    const lineasPreludio = preludio ? preludio.split("\n").length : 0
    const offset = estricto ? 4 : 3
    const lineaTraza = traza.length
      ? traza[traza.length - 1].linea
      : null
    const linea = trazar
      ? lineaTraza
      : coincidencia
        ? Math.max(1, Number(coincidencia[1]) - offset - lineasPreludio)
        : null
    const columna = coincidencia ? Number(coincidencia[2]) : null

    self.postMessage({
      id,
      ok: false,
      logs: registros,
      error: texto,
      linea,
      columna,
      traza,
      truncada,
    })
  }
}
