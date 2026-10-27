export const CARRERAS = [
  {
    id: "programacion",
    nombre: "Programación",
    emoji: "💻",
    categoria: "Tecnología",
    resumen: "Fundamentos, desarrollo, datos y sistemas.",
    tags: ["Código", "Sistemas"],
    cursos: [
      {
        id: "fundamentos",
        nombre: "Fundamentos de Programación",
        icon: "🧠",
        nivel: "Principiante",
      },
      {
        id: "lenguajes",
        nombre: "Lenguajes de Programación",
        icon: "💻",
        nivel: "Intermedio",
      },
      { id: "web", nombre: "Desarrollo Web", icon: "🌐", nivel: "Intermedio" },
      {
        id: "bases-datos",
        nombre: "Bases de Datos",
        icon: "🗄️",
        nivel: "Intermedio",
      },
      {
        id: "estructuras",
        nombre: "Estructuras de Datos",
        icon: "🧩",
        nivel: "Avanzado",
      },
      { id: "algoritmia", nombre: "Algoritmia", icon: "📐", nivel: "Avanzado" },
      {
        id: "herramientas",
        nombre: "Herramientas y Control de Versiones",
        icon: "⚙️",
        nivel: "Intermedio",
      },
      {
        id: "sistemas-operativos",
        nombre: "Sistemas Operativos",
        icon: "🖥️",
        nivel: "Avanzado",
      },
      { id: "redes", nombre: "Redes", icon: "🌐", nivel: "Avanzado" },
      {
        id: "ciberseguridad",
        nombre: "Ciberseguridad",
        icon: "🔒",
        nivel: "Avanzado",
      },
      {
        id: "cloud",
        nombre: "Computación en la Nube",
        icon: "☁️",
        nivel: "Avanzado",
      },
    ],
  },
  {
    id: "administracion",
    nombre: "Administración y Negocios",
    emoji: "🏢",
    categoria: "Negocios",
    resumen: "Gestión empresarial, liderazgo y estrategia.",
    tags: ["Gestión", "Estrategia"],
    cursos: [
      {
        id: "admin-gestion",
        nombre: "Administración y Gestión",
        icon: "🧠",
        nivel: "Principiante",
      },
      {
        id: "estrategia",
        nombre: "Estrategia Empresarial",
        icon: "🎯",
        nivel: "Intermedio",
      },
      {
        id: "emprendimiento",
        nombre: "Emprendimiento y Startups",
        icon: "🚀",
        nivel: "Intermedio",
      },
      {
        id: "innovacion",
        nombre: "Innovación",
        icon: "💡",
        nivel: "Intermedio",
      },
      {
        id: "operaciones",
        nombre: "Operaciones y Procesos",
        icon: "⚙️",
        nivel: "Intermedio",
      },
      {
        id: "liderazgo",
        nombre: "Organización y Liderazgo",
        icon: "🗣️",
        nivel: "Avanzado",
      },
    ],
  },
];

export const METODOS_ARRAYS = [
  {
    seccion: "Búsqueda y Evaluación",
    metodos: [
      {
        id: "find",
        nombre: "find()",
        firma: "Array.prototype.find(callbackFn, thisArg)",
        icon: "🔍",
      },
      {
        id: "findindex",
        nombre: "findIndex()",
        firma: "Array.prototype.findIndex(callbackFn, thisArg)",
        icon: "🔍",
      },
      {
        id: "findlast",
        nombre: "findLast()",
        firma: "Array.prototype.findLast(callbackFn, thisArg)",
        icon: "🔎",
      },
      {
        id: "findlastindex",
        nombre: "findLastIndex()",
        firma: "Array.prototype.findLastIndex(callbackFn, thisArg)",
        icon: "🔎",
      },
      {
        id: "indexof",
        nombre: "indexOf()",
        firma: "Array.prototype.indexOf(searchElement, fromIndex)",
        icon: "📍",
      },
      {
        id: "lastindexof",
        nombre: "lastIndexOf()",
        firma: "Array.prototype.lastIndexOf(searchElement, fromIndex)",
        icon: "📍",
      },
      {
        id: "every",
        nombre: "every()",
        firma: "Array.prototype.every(callbackFn, thisArg)",
        icon: "✅",
      },
      {
        id: "some",
        nombre: "some()",
        firma: "Array.prototype.some(callbackFn, thisArg)",
        icon: "❓",
      },
    ],
  },
  {
    seccion: "Transformación y Copia",
    metodos: [
      {
        id: "map",
        nombre: "map()",
        firma: "Array.prototype.map(callbackFn, thisArg)",
        icon: "🔄",
      },
      {
        id: "filter",
        nombre: "filter()",
        firma: "Array.prototype.filter(callbackFn, thisArg)",
        icon: "🧹",
      },
      {
        id: "flatmap",
        nombre: "flatMap()",
        firma: "Array.prototype.flatMap(callbackFn, thisArg)",
        icon: "🫓",
      },
      {
        id: "slice",
        nombre: "slice()",
        firma: "Array.prototype.slice(start, end)",
        icon: "✂️",
      },
      {
        id: "fill",
        nombre: "fill()",
        firma: "Array.prototype.fill(value, start, end)",
        icon: "🪣",
      },
      {
        id: "with",
        nombre: "with()",
        firma: "Array.prototype.with(index, value)",
        icon: "📝",
      },
      {
        id: "from",
        nombre: "Array.from()",
        firma: "Array.from(arrayLike, mapFn, thisArg)",
        icon: "🏗️",
      },
      {
        id: "toreversed",
        nombre: "toReversed()",
        firma: "Array.prototype.toReversed()",
        icon: "🔃",
      },
      {
        id: "reverse",
        nombre: "reverse()",
        firma: "Array.prototype.reverse()",
        icon: "🔃",
      },
      {
        id: "flat",
        nombre: "flat()",
        firma: "Array.prototype.flat(depth)",
        icon: "🫓",
      },
      {
        id: "copywithin",
        nombre: "copyWithin()",
        firma: "Array.prototype.copyWithin(target, start, end)",
        icon: "📋",
      },
    ],
  },
  {
    seccion: "Iteradores",
    metodos: [
      {
        id: "entries",
        nombre: "entries()",
        firma: "Array.prototype.entries()",
        icon: "🗂️",
      },
      {
        id: "keys",
        nombre: "keys()",
        firma: "Array.prototype.keys()",
        icon: "🔑",
      },
      {
        id: "values",
        nombre: "values()",
        firma: "Array.prototype.values()",
        icon: "📦",
      },
    ],
  },
  {
    seccion: "Mutación y Agregación",
    metodos: [
      {
        id: "push",
        nombre: "push()",
        firma: "Array.prototype.push(...items)",
        icon: "➕",
      },
      {
        id: "pop",
        nombre: "pop()",
        firma: "Array.prototype.pop()",
        icon: "➖",
      },
      {
        id: "shift",
        nombre: "shift()",
        firma: "Array.prototype.shift()",
        icon: "⬅️",
      },
      {
        id: "unshift",
        nombre: "unshift()",
        firma: "Array.prototype.unshift(...items)",
        icon: "➡️",
      },
      {
        id: "splice",
        nombre: "splice()",
        firma: "Array.prototype.splice(start, deleteCount, ...items)",
        icon: "✂️",
      },
      {
        id: "tospliced",
        nombre: "toSpliced()",
        firma: "Array.prototype.toSpliced(start, deleteCount, ...items)",
        icon: "✂️",
      },
      {
        id: "reduce",
        nombre: "reduce()",
        firma: "Array.prototype.reduce(callbackFn, initialValue)",
        icon: "📉",
      },
      {
        id: "reduceright",
        nombre: "reduceRight()",
        firma: "Array.prototype.reduceRight(callbackFn, initialValue)",
        icon: "📉",
      },
      {
        id: "foreach",
        nombre: "forEach()",
        firma: "Array.prototype.forEach(callbackFn, thisArg)",
        icon: "🔁",
      },
      {
        id: "concat",
        nombre: "concat()",
        firma: "Array.prototype.concat(...items)",
        icon: "🔗",
      },
      {
        id: "join",
        nombre: "join()",
        firma: "Array.prototype.join(separator)",
        icon: "🧵",
      },
    ],
  },
  {
    seccion: "Ordenamiento y Utilidades",
    metodos: [
      {
        id: "sort",
        nombre: "sort()",
        firma: "Array.prototype.sort(compareFn)",
        icon: "🔤",
      },
      {
        id: "tosorted",
        nombre: "toSorted()",
        firma: "Array.prototype.toSorted(compareFn)",
        icon: "🔤",
      },
      {
        id: "uint8from",
        nombre: "Uint8Array.from()",
        firma: "Uint8Array.from(arrayLike, mapFn, thisArg)",
        icon: "🔢",
      },
      {
        id: "typedset",
        nombre: "TypedArray.set()",
        firma: "TypedArray.prototype.set(array, offset)",
        icon: "📥",
      },
      {
        id: "of",
        nombre: "Array.of()",
        firma: "Array.of(...items)",
        icon: "🏭",
      },
      {
        id: "isarray",
        nombre: "Array.isArray()",
        firma: "Array.isArray(value)",
        icon: "🛡️",
      },
      {
        id: "at",
        nombre: "at()",
        firma: "Array.prototype.at(index)",
        icon: "🎯",
      },
      {
        id: "length",
        nombre: "length",
        firma: "Array.prototype.length",
        icon: "📏",
      },
    ],
  },
];

export const normalize = (value = "") =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

export function buildSearchIndex(carreras) {
  const index = [];
  for (const carrera of carreras) {
    index.push({
      id: `carrera:${carrera.id}`,
      type: "carrera",
      careerId: carrera.id,
      title: carrera.nombre,
      subtitle: `${carrera.cursos.length} temas`,
      icon: carrera.emoji,
      keywords: `${carrera.categoria} ${carrera.tags?.join(" ") || ""}`,
    });
    for (const curso of carrera.cursos) {
      index.push({
        id: `curso:${carrera.id}:${curso.id}`,
        type: "curso",
        careerId: carrera.id,
        title: curso.nombre,
        subtitle: `${carrera.nombre}`,
        icon: curso.icon || "📄",
        keywords: `${carrera.nombre} ${curso.nivel || ""}`,
      });
    }
  }
  return index;
}
