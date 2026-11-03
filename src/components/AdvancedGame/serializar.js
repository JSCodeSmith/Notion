/* Utilidades compartidas entre el hilo principal y el worker del juego.
   - serializar(): convierte cualquier valor en una estructura JSON segura.
   - firma(): representación estable para comparar el resultado con el esperado.
   - formatear(): texto bonito para la consola. */

export function serializar(valor, vistos = new WeakSet()) {
  if (valor === undefined) return { $tipo: "undefined" }

  if (typeof valor === "number") {
    if (Number.isNaN(valor)) return { $tipo: "number", valor: "NaN" }
    if (valor === Infinity) return { $tipo: "number", valor: "Infinity" }
    if (valor === -Infinity) return { $tipo: "number", valor: "-Infinity" }
    if (Object.is(valor, -0)) return { $tipo: "number", valor: "-0" }
    return valor
  }

  if (typeof valor === "string" || typeof valor === "boolean") return valor
  if (typeof valor === "bigint")
    return { $tipo: "bigint", valor: String(valor) }
  if (typeof valor === "symbol")
    return { $tipo: "symbol", valor: String(valor) }
  if (typeof valor === "function")
    return { $tipo: "function", valor: valor.name || "anonymous" }
  if (valor === null) return null

  if (vistos.has(valor)) return { $tipo: "circular" }
  vistos.add(valor)

  try {
    if (Array.isArray(valor)) {
      const salida = []
      for (let i = 0; i < valor.length; i += 1) {
        salida.push(
          i in valor ? serializar(valor[i], vistos) : { $tipo: "hueco" },
        )
      }
      return salida
    }

    if (valor instanceof Date)
      return { $tipo: "date", valor: valor.toISOString() }
    if (valor instanceof RegExp)
      return { $tipo: "regexp", valor: String(valor) }
    if (valor instanceof Map) {
      return {
        $tipo: "map",
        valor: [...valor.entries()].map(([clave, dato]) => [
          serializar(clave, vistos),
          serializar(dato, vistos),
        ]),
      }
    }
    if (valor instanceof Set) {
      return {
        $tipo: "set",
        valor: [...valor].map((dato) => serializar(dato, vistos)),
      }
    }

    const objeto = {}
    for (const clave of Object.keys(valor).sort()) {
      objeto[clave] = serializar(valor[clave], vistos)
    }
    return objeto
  } finally {
    vistos.delete(valor)
  }
}

export function firma(valor) {
  try {
    return JSON.stringify(serializar(valor))
  } catch {
    return String(valor)
  }
}

const esPrimitivo = (valor) =>
  valor === null ||
  ["string", "number", "boolean", "undefined"].includes(typeof valor)

export function formatear(valor, nivel = 0, vistos = new WeakSet()) {
  if (valor === undefined) return "undefined"
  if (valor === null) return "null"

  if (typeof valor === "string") return JSON.stringify(valor)
  if (typeof valor === "number") {
    if (Number.isNaN(valor)) return "NaN"
    if (valor === Infinity) return "Infinity"
    if (valor === -Infinity) return "-Infinity"
    if (Object.is(valor, -0)) return "-0"
    return String(valor)
  }
  if (typeof valor === "boolean") return String(valor)
  if (typeof valor === "bigint") return `${valor}n`
  if (typeof valor === "symbol") return String(valor)
  if (typeof valor === "function")
    return `[Function ${valor.name || "anonymous"}]`

  if (vistos.has(valor)) return "[Circular]"
  vistos.add(valor)

  const pad = " ".repeat(nivel)
  const padHijo = " ".repeat(nivel + 2)

  try {
    if (Array.isArray(valor)) {
      if (valor.length === 0) return "[]"
      if (valor.every(esPrimitivo)) {
        return `[${valor.map((dato) => formatear(dato, nivel, vistos)).join(", ")}]`
      }
      return `[\n${valor
        .map((dato) => `${padHijo}${formatear(dato, nivel + 2, vistos)}`)
        .join(",\n")}\n${pad}]`
    }

    if (valor instanceof Date) return `Date(${valor.toISOString()})`
    if (valor instanceof RegExp) return String(valor)
    if (valor instanceof Map) {
      if (valor.size === 0) return "Map(0) {}"
      const filas = [...valor.entries()].map(
        ([clave, dato]) =>
          `${padHijo}${formatear(clave, nivel + 2, vistos)} => ${formatear(
            dato,
            nivel + 2,
            vistos,
          )}`,
      )
      return `Map(${valor.size}) {\n${filas.join(",\n")}\n${pad}}`
    }
    if (valor instanceof Set) {
      if (valor.size === 0) return "Set(0) {}"
      const filas = [...valor].map(
        (dato) => `${padHijo}${formatear(dato, nivel + 2, vistos)}`,
      )
      return `Set(${valor.size}) {\n${filas.join(",\n")}\n${pad}}`
    }

    const entradas = Object.entries(valor)
    if (entradas.length === 0) return "{}"
    return `{\n${entradas
      .map(
        ([clave, dato]) =>
          `${padHijo}${JSON.stringify(clave)}: ${formatear(
            dato,
            nivel + 2,
            vistos,
          )}`,
      )
      .join(",\n")}\n${pad}}`
  } finally {
    vistos.delete(valor)
  }
}
