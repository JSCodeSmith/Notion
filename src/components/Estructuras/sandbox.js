/* Ejecuta código del usuario en un Worker aislado con límite de tiempo.
   Así un bucle infinito no bloquea la interfaz: se termina el Worker. */

const WORKER_SOURCE = `
const formatear = (valor) => {
  if (typeof valor === "string") return valor;
  if (typeof valor === "undefined") return "undefined";
  if (valor === null) return "null";
  if (typeof valor === "function") return "ƒ " + (valor.name || "anónima") + "()";
  if (typeof valor === "number" || typeof valor === "boolean" || typeof valor === "bigint") return String(valor);
  if (valor instanceof Error) return valor.name + ": " + valor.message;
  try {
    const texto = JSON.stringify(valor);
    return texto === undefined ? String(valor) : texto;
  } catch {
    return String(valor);
  }
};

self.onmessage = (evento) => {
  const codigo = evento.data.codigo;
  const enviar = (tipo, texto) => self.postMessage({ tipo, texto });
  const escribir = (tipo) => (...args) => enviar(tipo, Array.from(args).map(formatear).join(" "));
  const consola = {
    log: escribir("log"),
    info: escribir("info"),
    warn: escribir("warn"),
    error: escribir("error"),
    table: escribir("log"),
  };

  try {
    const fn = new Function("console", '"use strict";\\n' + codigo);
    const retorno = fn(consola);
    if (typeof retorno !== "undefined") enviar("retorno", formatear(retorno));
  } catch (error) {
    const nombre = error && error.name ? error.name : "Error";
    const mensaje = error && error.message ? error.message : String(error);
    enviar("error", nombre + ": " + mensaje);
  } finally {
    enviar("fin", "");
  }
};
`;

export function ejecutarSandbox(codigo, { timeout = 2500 } = {}) {
  return new Promise((resolve) => {
    const blob = new Blob([WORKER_SOURCE], { type: "text/javascript" });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);
    const lineas = [];
    let terminado = false;

    const cerrar = (agotado) => {
      if (terminado) return;
      terminado = true;
      clearTimeout(temporizador);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve({ lineas, timeout: agotado });
    };

    const temporizador = setTimeout(() => {
      lineas.push({
        tipo: "error",
        texto: "⏱️ Tiempo agotado (2.5 s). Revisa si tienes un bucle sin salida.",
      });
      cerrar(true);
    }, timeout);

    worker.onmessage = (evento) => {
      const { tipo, texto } = evento.data || {};
      if (tipo === "fin") {
        cerrar(false);
        return;
      }
      lineas.push({ tipo: tipo || "log", texto: texto ?? "" });
    };

    worker.onerror = (evento) => {
      lineas.push({
        tipo: "error",
        texto: "💥 Error del sandbox: " + (evento.message || "desconocido"),
      });
      cerrar(false);
    };

    worker.postMessage({ codigo });
  });
}
