/* Utilidades compartidas por los simuladores de JavaScript. */

/** Representación legible de un valor de JavaScript. */
export function fmt(value) {
  if (value === undefined) return "undefined";
  if (typeof value === "string") return JSON.stringify(value);
  if (typeof value === "number") {
    if (Number.isNaN(value)) return "NaN";
    if (value === Infinity) return "Infinity";
    if (value === -Infinity) return "-Infinity";
    if (Object.is(value, -0)) return "-0";
    return String(value);
  }
  if (typeof value === "bigint") return `${value}n`;
  if (Array.isArray(value)) return `[${value.map(fmt).join(", ")}]`;
  if (value && typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}

/** Convierte el texto de un input en número (NaN si no lo es). */
export function toNumber(text) {
  const limpio = String(text ?? "").trim();
  if (limpio === "") return NaN;
  return Number(limpio.replace(",", "."));
}

/** Convierte una lista escrita por el usuario ("3, 5, -2") en números. */
export function toNumberList(text, separador = /[\s,;]+/) {
  return String(text ?? "")
    .split(separador)
    .map((parte) => parte.trim())
    .filter(Boolean)
    .map(Number);
}
