/* Motor del NEGOCIOS LAB: progreso, XP, rangos y medallas.
   El progreso es global para los 63 apuntes y se guarda en
   localStorage con la clave "negocios-lab:v1". */

export const XP_DIFICULTAD = { Fácil: 60, Medio: 90, Difícil: 120 };

export const PROGRESO_INICIAL = {
  xp: 0,
  resueltas: {},
  racha: 0,
  mejorRacha: 0,
  solucionesVistas: [],
};

export const RANGOS = [
  { xp: 0, nombre: "Aprendiz de Negocios", icono: "🌱" },
  { xp: 600, nombre: "Analista de Empresa", icono: "📊" },
  { xp: 1800, nombre: "Estratega", icono: "🧭" },
  { xp: 3800, nombre: "Director General", icono: "🏢" },
  { xp: 6500, nombre: "Magnate del Mercado", icono: "👑" },
];

const CLAVE = "negocios-lab:v1";

/* ---------- XP ---------- */

export function calcularXp(mision, pistas, solucionVista) {
  const penalizacion = Math.min(pistas * 15, Math.floor(mision.xp * 0.6));
  let base = Math.max(mision.xp - penalizacion, Math.round(mision.xp * 0.3));
  if (solucionVista) base = Math.round(base * 0.25);
  return Math.max(base, 10);
}

/* ---------- Rangos ---------- */

export function rangoDe(xp) {
  let actual = RANGOS[0];
  let siguiente = null;
  for (const rango of RANGOS) {
    if (xp >= rango.xp) actual = rango;
    else if (!siguiente) siguiente = rango;
  }
  return { actual, siguiente };
}

export function avanceDe(xp) {
  const { actual, siguiente } = rangoDe(xp);
  if (!siguiente) return { actual, siguiente, tramo: 1, avance: 100 };
  const tramo = Math.max(1, siguiente.xp - actual.xp);
  const avance = Math.min(100, Math.round(((xp - actual.xp) / tramo) * 100));
  return { actual, siguiente, tramo, avance };
}

/* ---------- Progreso guardado ---------- */

export function cargarProgreso() {
  if (typeof window === "undefined") return { ...PROGRESO_INICIAL };
  try {
    const crudo = window.localStorage.getItem(CLAVE);
    if (!crudo) return { ...PROGRESO_INICIAL };
    const datos = JSON.parse(crudo);
    return {
      ...PROGRESO_INICIAL,
      ...datos,
      resueltas: datos.resueltas ?? {},
      solucionesVistas: Array.isArray(datos.solucionesVistas)
        ? datos.solucionesVistas
        : [],
    };
  } catch {
    return { ...PROGRESO_INICIAL };
  }
}

export function guardarProgreso(progreso) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(CLAVE, JSON.stringify(progreso));
  } catch {
    /* almacenamiento lleno o bloqueado */
  }
}

/* ---------- Medallas ---------- */

export function calcularMedallas(progreso, misiones) {
  const resueltas = progreso.resueltas;
  const ids = Object.keys(resueltas);
  const total = misiones.length;
  const tipoResuelto = (tipo) =>
    misiones.some((m) => m.tipo === tipo && resueltas[m.id]);

  return [
    {
      id: "primera",
      nombre: "Primer negocio",
      icono: "🥇",
      descripcion: "Resuelve tu primera misión.",
      obtenida: ids.length >= 1,
    },
    {
      id: "limpia",
      nombre: "Mente fría",
      icono: "🧠",
      descripcion: "Resuelve una misión sin pistas ni solución.",
      obtenida: ids.some((id) => resueltas[id]?.limpia),
    },
    {
      id: "racha",
      nombre: "Imparable",
      icono: "🔥",
      descripcion: "Encadena 3 aciertos seguidos.",
      obtenida: progreso.mejorRacha >= 3,
    },
    {
      id: "emparejar",
      nombre: "Conector",
      icono: "🧩",
      descripcion: "Completa una misión de emparejar.",
      obtenida: tipoResuelto("emparejar"),
    },
    {
      id: "clasificar",
      nombre: "Clasificador",
      icono: "🗂️",
      descripcion: "Completa una misión de clasificar.",
      obtenida: tipoResuelto("clasificar"),
    },
    {
      id: "ordenar",
      nombre: "Paso a paso",
      icono: "🔢",
      descripcion: "Completa una misión de ordenar.",
      obtenida: tipoResuelto("ordenar"),
    },
    {
      id: "veinticinco",
      nombre: "Cuadro de mando",
      icono: "📈",
      descripcion: "Resuelve 25 misiones del laboratorio.",
      obtenida: ids.length >= 25,
    },
    {
      id: "maestro",
      nombre: "Cátedra de Negocios",
      icono: "👑",
      descripcion: "Completa todas las misiones del laboratorio.",
      obtenida: total > 0 && ids.length >= total,
    },
  ];
}

/* ---------- Misiones ---------- */

/** Misiones de un apunte: primero las curadas, luego las automáticas. */
export function misionesDe(nota, curadas) {
  return [...curadas, ...(nota.lab?.misiones ?? [])];
}

/** Barajado determinista para que servidor y cliente coincidan. */
export function mezclar(lista, clave = "") {
  let semilla = 2166136261;
  for (let i = 0; i < clave.length; i += 1) {
    semilla ^= clave.charCodeAt(i);
    semilla = Math.imul(semilla, 16777619);
  }
  const random = () => {
    semilla |= 0;
    semilla = (semilla + 0x6d2b79f5) | 0;
    let t = Math.imul(semilla ^ (semilla >>> 15), 1 | semilla);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  const salida = [...lista];
  for (let i = salida.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [salida[i], salida[j]] = [salida[j], salida[i]];
  }
  return salida;
}
