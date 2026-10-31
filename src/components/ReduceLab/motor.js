/* Motor de REDUCE LAB: ejecuta el reducer del jugador, traza iteraciones
   y calcula rangos, medallas y progreso. */

export const XP_DIFICULTAD = { Fácil: 80, Medio: 120, Difícil: 170 };

export const PROGRESO_INICIAL = {
  xp: 0,
  resueltas: {},
  racha: 0,
  mejorRacha: 0,
  experto: false,
  solucionesVistas: [],
};

export const RANGOS = [
  { xp: 0, nombre: "Aprendiz del Núcleo", icono: "🌱" },
  { xp: 220, nombre: "Analista de Datos", icono: "🔬" },
  { xp: 520, nombre: "Ingeniero de Reducción", icono: "⚙️" },
  { xp: 900, nombre: "Arquitecto de Acumuladores", icono: "🏛️" },
  { xp: 1400, nombre: "Maestro del Núcleo", icono: "👑" },
];

/* ---------- Valores ---------- */

export function clonar(valor) {
  if (valor === undefined) return undefined;
  if (typeof structuredClone === "function") {
    try {
      return structuredClone(valor);
    } catch {
      /* sigue con JSON */
    }
  }
  return JSON.parse(JSON.stringify(valor));
}

const ordenarClaves = (valor) => {
  if (Array.isArray(valor)) return valor.map(ordenarClaves);
  if (valor && typeof valor === "object") {
    return Object.fromEntries(
      Object.keys(valor)
        .sort()
        .map((clave) => [clave, ordenarClaves(valor[clave])]),
    );
  }
  return valor;
};

export const serializar = (valor) => JSON.stringify(ordenarClaves(valor));

export const mismoResultado = (a, b) => serializar(a) === serializar(b);

export function formatear(valor) {
  if (valor === undefined) return "undefined";
  if (typeof valor === "string") return `"${valor}"`;
  if (typeof valor === "number" && !Number.isFinite(valor)) return String(valor);
  try {
    return JSON.stringify(valor);
  } catch {
    return String(valor);
  }
}

/* ---------- Ejecución del código del jugador ---------- */

export function compilar(codigo) {
  let fn;
  try {
    fn = new Function(`"use strict"; return (${codigo});`)();
  } catch (error) {
    throw new Error(`No se pudo compilar el callback: ${error.message}`);
  }
  if (typeof fn !== "function") {
    throw new Error(
      "El editor debe contener una función. Ejemplo: (acc, item) => acc + item",
    );
  }
  return fn;
}

export function ejecutar(codigo, datos, inicial, usarInicial = true) {
  const fn = compilar(codigo);
  const copia = datos.map(clonar);
  return usarInicial ? copia.reduce(fn, clonar(inicial)) : copia.reduce(fn);
}

/* Devuelve la evolución completa del acumulador, paso a paso. */
export function trazar(codigo, datos, inicial, usarInicial = true) {
  const fn = compilar(codigo);
  const lista = datos.map(clonar);
  const pasos = [];
  const arranque = usarInicial ? 0 : 1;
  let acc = usarInicial ? clonar(inicial) : clonar(lista[0]);

  pasos.push({
    n: 0,
    indice: usarInicial ? -1 : 0,
    anterior: null,
    elemento: usarInicial ? null : clonar(lista[0]),
    actual: clonar(acc),
    nota: usarInicial ? "valorInicial" : "primer elemento como acumulador",
  });

  for (let i = arranque; i < lista.length; i += 1) {
    const anterior = clonar(acc);
    const elemento = lista[i];
    acc = fn(acc, elemento, i, lista);
    pasos.push({
      n: pasos.length,
      indice: i,
      anterior,
      elemento: clonar(elemento),
      actual: clonar(acc),
      nota: "",
    });
  }

  return { pasos, resultado: clonar(acc) };
}

/* ---------- Rangos y medallas ---------- */

export function rangoDe(xp) {
  let actual = RANGOS[0];
  let siguiente = null;
  for (const rango of RANGOS) {
    if (xp >= rango.xp) actual = rango;
    else if (!siguiente) siguiente = rango;
  }
  return { actual, siguiente };
}

export function calcularMedallas(progreso, modos) {
  const resueltas = progreso.resueltas;
  const idsResueltos = Object.keys(resueltas);
  const total = modos.reduce((acc, modo) => acc + modo.misiones.length, 0);
  const medallas = [
    {
      id: "primer-nucleo",
      nombre: "Primer núcleo",
      icono: "⚛️",
      descripcion: "Resuelve tu primera misión.",
      obtenida: idsResueltos.length >= 1,
    },
    {
      id: "sin-pistas",
      nombre: "Mente limpia",
      icono: "🧠",
      descripcion: "Resuelve una misión sin usar pistas.",
      obtenida: idsResueltos.some((id) => resueltas[id].limpia),
    },
    {
      id: "racha",
      nombre: "Imparable",
      icono: "🔥",
      descripcion: "Encadena 3 aciertos seguidos.",
      obtenida: progreso.mejorRacha >= 3,
    },
    ...modos.map((modo) => ({
      id: `modo-${modo.id}`,
      nombre: modo.nombre,
      icono: modo.icono,
      descripcion: `Completa las 3 misiones de ${modo.nombre}.`,
      obtenida: modo.misiones.every((mision) => Boolean(resueltas[mision.id])),
    })),
    {
      id: "maestro",
      nombre: "Maestro del Núcleo",
      icono: "👑",
      descripcion: "Completa las 15 misiones del laboratorio.",
      obtenida: total > 0 && idsResueltos.length >= total,
    },
  ];
  return medallas;
}

export function cargarProgreso() {
  if (typeof window === "undefined") return { ...PROGRESO_INICIAL };
  try {
    const crudo = window.localStorage.getItem("reduce-lab:v1");
    if (!crudo) return { ...PROGRESO_INICIAL };
    const datos = JSON.parse(crudo);
    return {
      ...PROGRESO_INICIAL,
      ...datos,
      resueltas: datos.resueltas ?? {},
      solucionesVistas: Array.isArray(datos.solucionesVistas) ? datos.solucionesVistas : [],
    };
  } catch {
    return { ...PROGRESO_INICIAL };
  }
}

export function guardarProgreso(progreso) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem("reduce-lab:v1", JSON.stringify(progreso));
  } catch {
    /* almacenamiento lleno o bloqueado */
  }
}
