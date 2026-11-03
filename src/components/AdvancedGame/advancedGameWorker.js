/* Worker aislado que ejecuta el código del jugador.
   Se crea uno nuevo por ejecución y se termina al recibir la respuesta
   (o al agotarse el tiempo desde el hilo principal). */

import { firma, formatear, serializar } from "./serializar";

const crearConsola = (registros) => {
  const anotar = (nivel) => (...args) => {
    registros.push({
      nivel,
      texto: args.map((arg) => formatear(arg)).join(" "),
    });
  };

  const consola = {
    log: anotar("log"),
    info: anotar("info"),
    warn: anotar("warn"),
    error: anotar("error"),
    debug: anotar("debug"),
    table: anotar("log"),
    trace: anotar("debug"),
    dir: anotar("log"),
    group: () => {},
    groupCollapsed: () => {},
    groupEnd: () => {},
    time: () => {},
    timeEnd: () => {},
    timeLog: () => {},
    count: () => {},
    countReset: () => {},
    assert: (condicion, ...args) => {
      if (!condicion) anotar("error")("Assertion failed:", ...args)
    },
    clear: () => {},
  };

  return consola;
};

self.onmessage = async (evento) => {
  const { id, codigo, preludio = "" } = evento.data
  const registros = []

  try {
    const ejecutar = new Function(
      "console",
      `"use strict";\nreturn (async () => {\n${preludio}\n${codigo}\n})();`,
    )

    const resultado = await ejecutar(crearConsola(registros))

    self.postMessage({
      id,
      ok: true,
      logs: registros,
      valor: serializar(resultado),
      texto: formatear(resultado),
      firma: firma(resultado),
    })
  } catch (error) {
    const texto =
      error instanceof Error
        ? `${error.name}: ${error.message}`
        : String(error)

    self.postMessage({
      id,
      ok: false,
      logs: registros,
      error: texto,
    })
  }
}
