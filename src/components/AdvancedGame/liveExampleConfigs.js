/* Ejemplos vivos por método.
   Según la categoría, el constructor inyecta en el sandbox:
   - `emojis`            → array editable con emojis
   - `emojis` + `texto`  → array y su versión unida con espacios
   - `numeros`           → lista editable de números
   - `fecha`             → new Date(año, mes, día, hora, minuto, segundo)
   Cada ejemplo puede usar esas variables sin declararlas. */

import {
  EXTRA_CONFIGS,
  EXTRA_CATEGORIAS,
} from "./liveExampleExtraConfigs.js";
import {
  OBJECT_CONFIGS,
  OBJECT_CATEGORIAS,
} from "./liveExampleObjectConfigs.js";
import {
  MAP_SET_CONFIGS,
  MAP_SET_CATEGORIAS,
} from "./liveExampleMapSetConfigs.js";
import {
  REGEXP_CONFIGS,
  REGEXP_CATEGORIAS,
} from "./liveExampleRegexpConfigs.js";
import { INTL_CONFIGS, INTL_CATEGORIAS } from "./liveExampleIntlConfigs.js";
import {
  APUNTES_HTML_CONFIGS,
  APUNTES_HTML_CATEGORIAS,
} from "./liveExampleApuntesHtmlConfigs.js";

/* ============================================================
   Ejemplos personalizados (los 15 métodos con juego avanzado)
   ============================================================ */

const EJEMPLOS = {
  find: {
    etiqueta: "Array.prototype.find()",
    titulo: "Encuentra el primer emoji",
    descripcion:
      "find() devuelve el primer emoji que cumple la condición. Aquí busca una coincidencia con el primer emoji de tu array.",
    prueba:
      "Duplica el primer emoji para comprobar que find() se queda con la primera aparición.",
    codigo: `const objetivo = emojis[0];
console.log("Buscando:", objetivo);
return emojis.find((emoji) => emoji === objetivo);`,
  },

  findindex: {
    etiqueta: "Array.prototype.findIndex()",
    titulo: "Encuentra la posición",
    descripcion:
      "findIndex() devuelve el índice de la primera coincidencia, o -1 si no existe.",
    prueba:
      "Cambia el orden de los emojis con 🔀 Mezclar y observa cómo cambia el índice.",
    codigo: `const objetivo = emojis[2] ?? emojis[0];
console.log("Buscando índice de:", objetivo);
return emojis.findIndex((emoji) => emoji === objetivo);`,
  },

  findlast: {
    etiqueta: "Array.prototype.findLast()",
    titulo: "La última coincidencia",
    descripcion:
      "findLast() recorre el array desde el final y devuelve el último emoji que cumple la condición.",
    prueba:
      "Duplica el primer emoji: find() devolvería el primero y findLast() el último.",
    codigo: `const objetivo = emojis[0];
console.log("Buscando la última aparición de:", objetivo);
return emojis.findLast((emoji) => emoji === objetivo);`,
  },

  findlastindex: {
    etiqueta: "Array.prototype.findLastIndex()",
    titulo: "La última posición",
    descripcion:
      "findLastIndex() busca desde el final y devuelve el índice de la última coincidencia.",
    prueba:
      "Añade un emoji repetido al final para ver cómo cambia el índice devuelto.",
    codigo: `const objetivo = emojis[0];
console.log("Buscando el último índice de:", objetivo);
return emojis.findLastIndex((emoji) => emoji === objetivo);`,
  },

  "string-indexof": {
    etiqueta: "String.prototype.indexOf()",
    titulo: "Busca dentro del texto",
    descripcion:
      "indexOf() busca una subcadena y devuelve la posición de su primera aparición. Tu array se convierte en una cadena separada por guiones.",
    prueba:
      "Cada emoji ocupa 2 unidades UTF-16; añade emojis al inicio y mira cómo se mueve el offset.",
    codigo: `const cadena = emojis.join("-");
const objetivo = emojis[0];
console.log("Cadena:", cadena);
return cadena.indexOf(objetivo);`,
  },

  lastindexof: {
    etiqueta: "Array.prototype.lastIndexOf()",
    titulo: "La última aparición",
    descripcion:
      "lastIndexOf() devuelve el índice de la última aparición de un valor dentro del array.",
    prueba:
      "Duplica el primer emoji y compara lastIndexOf() con indexOf().",
    codigo: `const objetivo = emojis[0];
console.log("Buscando la última aparición de:", objetivo);
return emojis.lastIndexOf(objetivo);`,
  },

  every: {
    etiqueta: "Array.prototype.every()",
    titulo: "¿Todos cumplen?",
    descripcion:
      "every() devuelve true solo si todos los emojis cumplen la condición. Aquí comprueba que ninguno sea un dragón.",
    prueba:
      "Añade un 🐉 con la paleta para que el resultado cambie a false.",
    codigo: `return emojis.every((emoji) => emoji !== "🐉");`,
  },

  some: {
    etiqueta: "Array.prototype.some()",
    titulo: "¿Existe alguno?",
    descripcion:
      "some() devuelve true si al menos un emoji cumple la condición. Aquí busca un dragón.",
    prueba:
      "Vacía el array o quita todos los 🐉 para obtener false.",
    codigo: `return emojis.some((emoji) => emoji === "🐉");`,
  },

  map: {
    etiqueta: "Array.prototype.map()",
    titulo: "Transforma cada emoji",
    descripcion:
      "map() crea un array nuevo con el mismo número de elementos, transformando cada uno.",
    prueba:
      "Cambia el número por un emoji, por ejemplo: emoji + \"✨\".",
    codigo: `return emojis.map((emoji, indice) => emoji + (indice + 1));`,
  },

  filter: {
    etiqueta: "Array.prototype.filter()",
    titulo: "Filtra el array",
    descripcion:
      "filter() devuelve un array nuevo solo con los emojis que cumplen la condición.",
    prueba:
      "Conserva las posiciones pares. Añade o quita emojis para ver cómo se recalcula.",
    codigo: `return emojis.filter((emoji, indice) => indice % 2 === 0);`,
  },

  flatmap: {
    etiqueta: "Array.prototype.flatMap()",
    titulo: "Transforma y aplana",
    descripcion:
      "flatMap() transforma cada emoji y aplana el resultado un nivel, devolviendo un solo array.",
    prueba:
      "Devuelve [emoji, emoji] para duplicar cada emoji en un único array.",
    codigo: `return emojis.flatMap((emoji) => [emoji, emoji]);`,
  },

  "string-slice": {
    etiqueta: "String.prototype.slice()",
    titulo: "Corta la cadena",
    descripcion:
      "slice() extrae una porción de la cadena sin modificar la original. Tu array se une en un solo texto.",
    prueba:
      "Cada emoji ocupa 2 unidades UTF-16. Prueba otros índices y observa si el corte parte un emoji.",
    codigo: `const cadena = emojis.join("");
console.log("Texto:", cadena);
return cadena.slice(2, 6);`,
  },

  "string-at": {
    titulo: "Accede desde el final",
    descripcion:
      "at() devuelve el carácter de una posición y acepta índices negativos: -1 es el último.",
    prueba:
      "Cambia el índice por -2 o -3 y comprueba cómo se mueve la letra seleccionada.",
    codigo: `const cadena = emojis.join("");
const primero = cadena.at(0);
const ultimo = cadena.at(-1);
console.log("Texto:", cadena);
console.log("Primero:", primero);
console.log("Último:", ultimo);
return { primero, ultimo };`,
  },

  "string-length": {
    titulo: "Mide la cadena",
    descripcion:
      "length cuenta las unidades UTF-16 del texto. Los emojis suelen ocupar dos unidades.",
    prueba:
      "Añade o quita emojis: length cambia de dos en dos. Compara con [...texto].length.",
    codigo: `const cadena = emojis.join("");
const unidades = cadena.length;
const visibles = [...cadena].length;
console.log("Texto:", cadena);
console.log("Unidades UTF-16:", unidades);
console.log("Caracteres visibles:", visibles);
return { unidades, visibles };`,
  },

  fill: {
    etiqueta: "Array.prototype.fill()",
    titulo: "Rellena una copia",
    descripcion:
      "fill() modifica el array y devuelve la misma referencia. Aquí trabajamos sobre una copia para no tocar tu array original.",
    prueba:
      "Cambia los índices 1 y 3 para rellenar otra zona del array.",
    codigo: `const copia = [...emojis];
return copia.fill("⭐", 1, 3);`,
  },

  with: {
    etiqueta: "Array.prototype.with()",
    titulo: "Sustituye sin mutar",
    descripcion:
      "with() devuelve una copia nueva con un emoji sustituido en el índice indicado.",
    prueba:
      "Prueba un índice negativo, por ejemplo emojis.with(-1, \"🐉\").",
    codigo: `if (emojis.length === 0) return "Añade al menos un emoji";
return emojis.with(0, "🐉");`,
  },

  push: {
    etiqueta: "Array.prototype.push()",
    titulo: "Añade al final",
    descripcion:
      "push() añade elementos al final, modifica el array y devuelve la nueva longitud.",
    prueba:
      "Mira la consola: el array de la copia cambia, pero el array original del builder no.",
    codigo: `const copia = [...emojis];
const longitud = copia.push("🚀", "🎉");
console.log("Array después de push:", copia);
return longitud;`,
  },
};

/* ============================================================
   Categorías del constructor
   ============================================================ */

const IDS_ARRAY = [
  "find",
  "findindex",
  "findlast",
  "findlastindex",
  "lastindexof",
  "push",
  "pop",
  "shift",
  "unshift",
  "splice",
  "tospliced",
  "sort",
  "tosorted",
  "of",
  "some",
  "isarray",
  "at",
  "length",
  "concat",
  "join",
  "map",
  "filter",
  "flatmap",
  "fill",
  "with",
  "from",
  "toreversed",
  "reverse",
  "flat",
  "copywithin",
  "entries",
  "keys",
  "values",
  "foreach",
  "reduce",
  "reduceright",
  "every",
  "json-stringify",
  "json-parse",
  "dom-getelementbyid",
  "dom-getelementsbyclassname",
  "dom-getelementsbytagname",
  "dom-queryselector",
  "dom-queryselectorall",
];

const IDS_TEXTO = [
  "string-indexof",
  "string-slice",
  "string-at",
  "string-length",
  "raw",
  "codepointat",
  "charcodeat",
  "fromcharcode",
  "fromcodepoint",
  "repeat",
  "iswellformed",
  "towellformed",
  "startswith",
  "endswith",
  "substr",
  "touppercase",
  "tolowercase",
  "tolocaleuppercase",
  "tolocalelowercase",
  "trim",
  "trimstart",
  "trimend",
  "trimleft",
  "trimright",
  "padstart",
  "padend",
  "substring",
  "charat",
  "split",
  "replace",
  "replaceall",
  "includes",
  "search",
  "match",
  "matchall",
  "localecompare",
  "normalize",
  "filereader-readastext",
  "filereader-readasdataurl",
  "fullscreen-request",
  "fullscreen-exit",
  "storage-localstorage",
  "storage-sessionstorage",
  "storage-setitem",
  "storage-getitem",
  "storage-removeitem",
  "storage-key",
  "storage-clear",
  "voz-speak",
  "voz-utterance",
  "voz-onspeechend",
  "voz-recognition",
  "voz-stop",
];

const IDS_NUMERO = [
  "isinteger",
  "issafeinteger",
  "isfinite",
  "isnan",
  "parseint",
  "parsefloat",
  "tofixed",
  "settimeout",
  "cleartimeout",
  "setinterval",
  "clearinterval",
];

const IDS_FECHA = [
  "newdate",
  "datenow",
  "gettime",
  "getfullyear",
  "getmonth",
  "getdate",
  "getday",
  "gethours",
  "getminutes",
  "getseconds",
  "setfullyear",
  "setdate",
  "sethours",
  "setminutes",
  "toisostring",
  "tolocalestring",
  "tolocaledatestring",
  "tolocaletimestring",
];

const CATEGORIAS = Object.fromEntries([
  ...IDS_ARRAY.map((id) => [id, "array"]),
  ...IDS_TEXTO.map((id) => [id, "texto"]),
  ...IDS_NUMERO.map((id) => [id, "numero"]),
  ...IDS_FECHA.map((id) => [id, "fecha"]),
]);

Object.assign(
  CATEGORIAS,
  EXTRA_CATEGORIAS,
  OBJECT_CATEGORIAS,
  MAP_SET_CATEGORIAS,
  REGEXP_CATEGORIAS,
  INTL_CATEGORIAS,
  APUNTES_HTML_CATEGORIAS,
);

/* ============================================================
   Plantillas genéricas
   ============================================================ */

/* ============================================================
   Entornos simulados para APIs que no existen en un Worker
   ============================================================ */

const PRELUDIO_DOM = `const crearNodo = (etiqueta, datos, hijos) => {
  const info = datos || {};
  return {
    tagName: etiqueta.toUpperCase(),
    id: info.id || "",
    className: info.className || "",
    textContent: info.textContent || "",
    children: hijos || [],
    classList: {
      contains: (clase) => (info.className || "").split(" ").includes(clase),
    },
    getAttribute: (nombre) => info[nombre] || null,
  };
};
const tituloDOM = crearNodo("h1", {
  id: "titulo",
  className: "titulo grande",
  textContent: "Mi página de emojis",
});
const cajaDOM = crearNodo("div", {
  id: "miCaja",
  className: "caja",
  textContent: "Hola mundo",
});
const listaDOM = crearNodo("ul", { id: "lista", className: "lista" });
const itemsDOM = emojis.map((emoji, indice) =>
  crearNodo("li", {
    className: "item",
    textContent: indice + 1 + ". " + emoji,
  }),
);
listaDOM.children = itemsDOM;
const nodosDOM = [tituloDOM, cajaDOM, listaDOM].concat(itemsDOM);
const buscarDOM = (selector) => {
  const sel = String(selector).trim();
  if (sel === "*") return nodosDOM.slice();
  if (sel.charAt(0) === "#") {
    return nodosDOM.filter((nodo) => nodo.id === sel.slice(1));
  }
  if (sel.charAt(0) === ".") {
    return nodosDOM.filter((nodo) => nodo.classList.contains(sel.slice(1)));
  }
  const partes = sel.split(".");
  const etiqueta = partes[0].toLowerCase();
  const clase = partes[1];
  return nodosDOM.filter(
    (nodo) =>
      nodo.tagName.toLowerCase() === etiqueta &&
      (!clase || nodo.classList.contains(clase)),
  );
};
const document = {
  getElementById: (id) => nodosDOM.find((nodo) => nodo.id === String(id)) || null,
  getElementsByClassName: (clase) =>
    nodosDOM.filter((nodo) => nodo.classList.contains(String(clase))),
  getElementsByTagName: (etiqueta) =>
    nodosDOM.filter(
      (nodo) => nodo.tagName.toLowerCase() === String(etiqueta).toLowerCase(),
    ),
  querySelector: (selector) => buscarDOM(selector)[0] || null,
  querySelectorAll: (selector) => buscarDOM(selector),
};`;

const PRELUDIO_STORAGE = `const crearAlmacen = () => {
  const datos = new Map();
  return {
    get length() {
      return datos.size;
    },
    key: (indice) =>
      indice >= 0 && indice < datos.size ? [...datos.keys()][indice] : null,
    getItem: (clave) =>
      datos.has(String(clave)) ? datos.get(String(clave)) : null,
    setItem: (clave, valor) => {
      datos.set(String(clave), String(valor));
    },
    removeItem: (clave) => {
      datos.delete(String(clave));
    },
    clear: () => {
      datos.clear();
    },
  };
};
const localStorage = crearAlmacen();
const sessionStorage = crearAlmacen();`;

const PRELUDIO_VOZ = `class SpeechSynthesisUtterance {
  constructor(texto) {
    this.text = texto;
    this.lang = "es-ES";
    this.rate = 1;
    this.pitch = 1;
    this.volume = 1;
    this.onstart = null;
    this.onend = null;
  }
}
const speechSynthesis = {
  hablando: false,
  speak(utterance) {
    this.hablando = true;
    if (typeof utterance.onstart === "function") utterance.onstart();
    console.log("🔊 [voz simulada] " + utterance.text);
    setTimeout(() => {
      this.hablando = false;
      if (typeof utterance.onend === "function") utterance.onend();
    }, 250);
  },
  cancel() {
    this.hablando = false;
    console.log("⏹️ [voz simulada] Cola cancelada");
  },
  pause() {
    console.log("⏸️ [voz simulada] Pausada");
  },
  resume() {
    console.log("▶️ [voz simulada] Reanudada");
  },
  getVoices() {
    return [{ name: "Voz simulada ES", lang: "es-ES", default: true }];
  },
};
class SpeechRecognition {
  constructor() {
    this.lang = "es-ES";
    this.continuous = false;
    this.onresult = null;
    this.onend = null;
  }
  start() {
    console.log("🎙️ [reconocimiento simulado] Escuchando…");
    setTimeout(() => {
      const evento = { results: [[{ transcript: texto, confidence: 0.95 }]] };
      if (typeof this.onresult === "function") this.onresult(evento);
      if (typeof this.onend === "function") this.onend();
    }, 200);
  }
  stop() {
    if (typeof this.onend === "function") this.onend();
  }
}`;

const PRELUDIO_FULLSCREEN = `const elementoPantalla = {
  id: "demo",
  textContent: texto,
  requestFullscreen: async () => {
    document.fullscreenElement = elementoPantalla;
    console.log("🖥️ [pantalla completa simulada] Activada");
    return true;
  },
};
const document = {
  fullscreenElement: null,
  documentElement: elementoPantalla,
  exitFullscreen: async () => {
    document.fullscreenElement = null;
    console.log("🖥️ [pantalla completa simulada] Desactivada");
    return true;
  },
};`;

const ENTORNO_DOM =
  "🧪 Entorno simulado: `document` incluye #titulo, #miCaja, #lista y un <li> por cada emoji de tu array.";
const ENTORNO_STORAGE =
  "🧪 Entorno simulado: `localStorage` y `sessionStorage` son almacenes en memoria del worker.";
const ENTORNO_VOZ =
  "🧪 Entorno simulado: la voz y el reconocimiento se registran en la consola, sin reproducir audio.";
const ENTORNO_FULLSCREEN =
  "🧪 Entorno simulado: `document` recrea requestFullscreen() y exitFullscreen().";

const PLANTILLAS = {
  /* ---------------- Arrays ---------------- */

  pop: {
    titulo: "Extrae el último emoji",
    descripcion:
      "pop() elimina el último elemento, modifica el array y devuelve ese elemento.",
    prueba:
      "Vacía el array y observa qué devuelve pop() cuando no queda nada.",
    codigo: `const copia = [...emojis];
const eliminado = copia.pop();
console.log("Eliminado:", eliminado);
return copia;`,
  },

  shift: {
    titulo: "Extrae el primer emoji",
    descripcion:
      "shift() elimina el primer elemento, desplaza el resto y devuelve el elemento extraído.",
    prueba:
      "Compara el array antes y después: todos los índices bajan una posición.",
    codigo: `const copia = [...emojis];
const eliminado = copia.shift();
console.log("Eliminado:", eliminado);
return copia;`,
  },

  unshift: {
    titulo: "Añade al inicio",
    descripcion:
      "unshift() añade elementos al principio y devuelve la nueva longitud del array.",
    prueba:
      "Cambia los emojis que se añaden y ejecuta de nuevo.",
    codigo: `const copia = [...emojis];
const longitud = copia.unshift("🚀", "🎉");
console.log("Nueva longitud:", longitud);
return copia;`,
  },

  splice: {
    titulo: "Corta y sustituye",
    descripcion:
      "splice() elimina elementos desde una posición y puede insertar otros en su lugar. Modifica el array original.",
    prueba:
      "Cambia el índice inicial y la cantidad de elementos eliminados.",
    codigo: `const copia = [...emojis];
const eliminados = copia.splice(1, 2, "🦄", "🔥");
console.log("Eliminados:", eliminados);
return copia;`,
  },

  tospliced: {
    titulo: "Corta sin mutar",
    descripcion:
      "toSpliced() devuelve una copia con elementos eliminados y sustituidos, sin tocar el array original.",
    prueba:
      "Ejecuta y comprueba que tu array del builder sigue igual.",
    codigo: `return emojis.toSpliced(1, 2, "🦄", "🔥");`,
  },

  sort: {
    titulo: "Ordena una copia",
    descripcion:
      "sort() ordena los elementos del array. Aquí ordenamos una copia con localeCompare.",
    prueba:
      "Prueba a quitar el comparador para ver el orden por unidades UTF-16.",
    codigo: `const copia = [...emojis];
copia.sort((a, b) => a.localeCompare(b));
return copia;`,
  },

  tosorted: {
    titulo: "Ordena sin mutar",
    descripcion:
      "toSorted() devuelve un array ordenado nuevo, dejando intacto el original.",
    prueba:
      "Cambia el comparador para ordenar de otra forma.",
    codigo: `return emojis.toSorted((a, b) => a.localeCompare(b));`,
  },

  of: {
    titulo: "Crea un array nuevo",
    descripcion:
      "Array.of() crea un array con los argumentos que recibe, sin importar su tipo o cantidad.",
    prueba:
      "Añade o quita emojis y observa cómo se construye el nuevo array.",
    codigo: `const nuevo = Array.of(...emojis, "✨");
console.log("Creado con Array.of:", nuevo);
return nuevo;`,
  },

  isarray: {
    titulo: "¿Es un array?",
    descripcion:
      "Array.isArray() comprueba si un valor es un array real, algo más fiable que typeof.",
    prueba:
      "Cambia el valor comprobado por un texto o un número.",
    codigo: `return {
  valor: emojis,
  esArray: Array.isArray(emojis),
  tipo: typeof emojis,
};`,
  },

  at: {
    titulo: "Accede por posición",
    descripcion:
      "at() permite acceder a un elemento por índice y acepta índices negativos para contar desde el final.",
    prueba:
      "Prueba at(-2) o at(100) y observa qué devuelve.",
    codigo: `return {
  primero: emojis.at(0),
  ultimo: emojis.at(-1),
  indice2: emojis.at(2),
};`,
  },

  length: {
    titulo: "Longitud del array",
    descripcion:
      "length indica cuántos elementos tiene el array. Es una propiedad, no una función.",
    prueba:
      "Añade o quita emojis y mira cómo cambia la longitud.",
    codigo: `return {
  longitud: emojis.length,
  primero: emojis[0] ?? null,
  ultimo: emojis.at(-1) ?? null,
};`,
  },

  concat: {
    titulo: "Une arrays",
    descripcion:
      "concat() crea un array nuevo combinando el original con otros arrays o valores.",
    prueba:
      "Añade más arrays al concat y observa el resultado.",
    codigo: `return emojis.concat(["🦄", "🔥"], emojis.slice(0, 2));`,
  },

  join: {
    titulo: "Convierte en texto",
    descripcion:
      "join() une todos los elementos en una cadena usando el separador indicado.",
    prueba:
      "Cambia el separador por \"-\" o por \"\" y ejecuta de nuevo.",
    codigo: `return emojis.join(" · ");`,
  },

  from: {
    titulo: "Crea desde un iterable",
    descripcion:
      "Array.from() construye un array a partir de un iterable o array-like y permite transformar cada elemento.",
    prueba:
      "Cambia la transformación para devolver dos emojis por elemento.",
    codigo: `return Array.from(emojis, (emoji, indice) => emoji + (indice + 1));`,
  },

  toreversed: {
    titulo: "Invierte sin mutar",
    descripcion:
      "toReversed() devuelve una copia invertida sin modificar el array original.",
    prueba:
      "Compara el resultado con tu array del builder: no cambia.",
    codigo: `return emojis.toReversed();`,
  },

  reverse: {
    titulo: "Invierte una copia",
    descripcion:
      "reverse() invierte el array en el mismo sitio y devuelve esa misma referencia.",
    prueba:
      "Trabajamos sobre una copia para que el builder no se modifique.",
    codigo: `const copia = [...emojis];
copia.reverse();
return copia;`,
  },

  flat: {
    titulo: "Aplana un nivel",
    descripcion:
      "flat() convierte arrays anidados en un único array, hasta la profundidad indicada.",
    prueba:
      "Añade más niveles de anidación y prueba flat(2).",
    codigo: `const anidado = emojis.map((emoji) => [emoji, "✨"]);
console.log("Antes:", anidado);
return anidado.flat();`,
  },

  copywithin: {
    titulo: "Copia dentro del array",
    descripcion:
      "copyWithin() copia una parte del array a otra posición del mismo array, sin cambiar su longitud.",
    prueba:
      "Cambia los índices de origen y destino para ver qué zona se sobrescribe.",
    codigo: `const copia = [...emojis];
copia.copyWithin(0, 2);
return copia;`,
  },

  entries: {
    titulo: "Pares índice-valor",
    descripcion:
      "entries() devuelve un iterador con pares [índice, valor] de cada elemento.",
    prueba:
      "Recorre el resultado con un bucle for...of en la consola.",
    codigo: `return [...emojis.entries()];`,
  },

  keys: {
    titulo: "Solo los índices",
    descripcion:
      "keys() devuelve un iterador con los índices del array, de 0 a length - 1.",
    prueba:
      "Vacía el array y comprueba que el iterador queda sin elementos.",
    codigo: `return [...emojis.keys()];`,
  },

  values: {
    titulo: "Solo los valores",
    descripcion:
      "values() devuelve un iterador con los valores del array, en orden.",
    prueba:
      "Es el iterador que usa for...of por defecto al recorrer un array.",
    codigo: `return [...emojis.values()];`,
  },

  foreach: {
    titulo: "Recorre sin devolver array",
    descripcion:
      "forEach() ejecuta una función por cada elemento. No devuelve un array nuevo; aquí guardamos el resultado a mano.",
    prueba:
      "Cambia el console.log para mostrar también el índice.",
    codigo: `const resultado = [];
emojis.forEach((emoji, indice) => {
  console.log(indice, emoji);
  resultado.push(emoji + indice);
});
return resultado;`,
  },

  reduce: {
    titulo: "Reduce a un valor",
    descripcion:
      "reduce() recorre el array acumulando un único resultado. Aquí une todos los emojis con guiones.",
    prueba:
      "Cambia el valor inicial o el acumulador para sumar longitudes.",
    codigo: `return emojis.reduce(
  (acc, emoji, indice) => acc + (indice ? "-" : "") + emoji,
  "",
);`,
  },

  reduceright: {
    titulo: "Reduce desde la derecha",
    descripcion:
      "reduceRight() acumula los elementos empezando por el final del array.",
    prueba:
      "Compara el resultado con reduce() y observa el orden.",
    codigo: `return emojis.reduceRight((acc, emoji) => acc + emoji, "");`,
  },

  /* ---------------- Strings ---------------- */

  raw: {
    titulo: "Texto sin procesar escapes",
    descripcion:
      "String.raw es una etiqueta de template literal que conserva las barras invertidas sin interpretar escapes.",
    prueba:
      "Cambia la ruta y observa que \\n no se convierte en salto de línea.",
    codigo: `const ruta = String.raw\`C:\\Users\\MASTER\\notas.txt\`;
console.log("Ruta cruda:", ruta);
return ruta;`,
  },

  codepointat: {
    titulo: "Código Unicode completo",
    descripcion:
      "codePointAt() devuelve el punto de código Unicode del carácter en la posición indicada, incluyendo emojis.",
    prueba:
      "Prueba distintas posiciones y compara con charCodeAt().",
    codigo: `const codigo = texto.codePointAt(0);
return {
  caracter: texto.charAt(0),
  codigo,
  hexadecimal: codigo === undefined ? null : "0x" + codigo.toString(16),
};`,
  },

  charcodeat: {
    titulo: "Unidad UTF-16",
    descripcion:
      "charCodeAt() devuelve la unidad de código UTF-16 en una posición. Los emojis ocupan dos unidades.",
    prueba:
      "Prueba la posición 0 y la 1 para ver los dos surrogates de un emoji.",
    codigo: `return {
  posicion0: texto.charCodeAt(0),
  posicion1: texto.charCodeAt(1),
  longitud: texto.length,
};`,
  },

  fromcharcode: {
    titulo: "Crea texto desde códigos",
    descripcion:
      "String.fromCharCode() crea una cadena a partir de unidades de código UTF-16.",
    prueba:
      "Añade más códigos, por ejemplo 128512 para 😀.",
    codigo: `return String.fromCharCode(65, 66, 67, 32, 128512);`,
  },

  fromcodepoint: {
    titulo: "Crea texto desde Unicode",
    descripcion:
      "String.fromCodePoint() crea una cadena desde puntos de código Unicode completos, incluidos emojis.",
    prueba:
      "Cambia los códigos por 0x1f680 (🚀) o 0x2b50 (⭐).",
    codigo: `return String.fromCodePoint(0x1f34e, 0x1f409, 0x2b50);`,
  },

  repeat: {
    titulo: "Repite el texto",
    descripcion:
      "repeat() devuelve una cadena con el texto repetido el número de veces indicado.",
    prueba:
      "Cambia el número de repeticiones y observa la longitud.",
    codigo: `return texto.repeat(2);`,
  },

  iswellformed: {
    titulo: "¿Está bien formado?",
    descripcion:
      "isWellFormed() comprueba si la cadena no contiene surrogates sueltos, es decir, si es Unicode válido.",
    prueba:
      "Añade un surrogate suelto con String.fromCharCode(0xd800) para obtener false.",
    codigo: `const roto = texto + String.fromCharCode(0xd800);
return {
  originalBienFormado: texto.isWellFormed(),
  rotoBienFormado: roto.isWellFormed(),
};`,
  },

  towellformed: {
    titulo: "Repara surrogates sueltos",
    descripcion:
      "toWellFormed() sustituye los surrogates sueltos por el carácter de reemplazo, devolviendo una cadena válida.",
    prueba:
      "Compara la longitud antes y después de reparar la cadena.",
    codigo: `const roto = String.fromCharCode(0xd800) + " " + texto;
console.log("Antes:", roto.length);
const arreglado = roto.toWellFormed();
return {
  arreglado,
  longitudAntes: roto.length,
  longitudDespues: arreglado.length,
};`,
  },

  startswith: {
    titulo: "¿Empieza por...?",
    descripcion:
      "startsWith() comprueba si la cadena comienza con la subcadena indicada.",
    prueba:
      "Cambia el emoji de búsqueda o prueba una posición inicial distinta.",
    codigo: `return {
  texto,
  empiezaPorPrimero: texto.startsWith(emojis[0] ?? ""),
};`,
  },

  endswith: {
    titulo: "¿Termina en...?",
    descripcion:
      "endsWith() comprueba si la cadena termina con la subcadena indicada.",
    prueba:
      "Quita el último emoji y observa cómo cambia el resultado.",
    codigo: `return {
  texto,
  terminaEnUltimo: texto.endsWith(emojis.at(-1) ?? ""),
};`,
  },

  substr: {
    titulo: "Extrae con longitud",
    descripcion:
      "substr() extrae una parte de la cadena desde una posición y con una longitud concreta. Está obsoleto, pero sigue disponible.",
    prueba:
      "Cambia la posición inicial y la longitud para ver otros cortes.",
    codigo: `return texto.substr(0, 4);`,
  },

  touppercase: {
    titulo: "Convierte a mayúsculas",
    descripcion:
      "toUpperCase() devuelve una copia de la cadena en mayúsculas.",
    prueba:
      "Los emojis no cambian, pero las letras sí.",
    codigo: `return texto.toUpperCase();`,
  },

  tolowercase: {
    titulo: "Convierte a minúsculas",
    descripcion:
      "toLowerCase() devuelve una copia de la cadena en minúsculas.",
    prueba:
      "Añade letras al texto y compara el resultado.",
    codigo: `return texto.toLowerCase();`,
  },

  tolocaleuppercase: {
    titulo: "Mayúsculas según idioma",
    descripcion:
      "toLocaleUpperCase() convierte a mayúsculas usando las reglas del idioma indicado.",
    prueba:
      "Prueba con \"tr\" para ver diferencias en la letra i.",
    codigo: `return texto.toLocaleUpperCase("es");`,
  },

  tolocalelowercase: {
    titulo: "Minúsculas según idioma",
    descripcion:
      "toLocaleLowerCase() convierte a minúsculas usando las reglas del idioma indicado.",
    prueba:
      "Prueba con \"tr\" para ver diferencias en la letra I.",
    codigo: `return texto.toLocaleLowerCase("es");`,
  },

  trim: {
    titulo: "Quita espacios de los extremos",
    descripcion:
      "trim() elimina los espacios en blanco al principio y al final de la cadena.",
    prueba:
      "Añade más espacios a los lados y comprueba que desaparecen.",
    codigo: `const conEspacios = "   " + texto + "   ";
return {
  antes: conEspacios,
  despues: conEspacios.trim(),
};`,
  },

  trimstart: {
    titulo: "Quita espacios del inicio",
    descripcion:
      "trimStart() elimina solo los espacios del principio de la cadena.",
    prueba:
      "Cambia los espacios iniciales por saltos de línea.",
    codigo: `const conEspacios = "   " + texto;
return conEspacios.trimStart();`,
  },

  trimend: {
    titulo: "Quita espacios del final",
    descripcion:
      "trimEnd() elimina solo los espacios del final de la cadena.",
    prueba:
      "Cambia los espacios finales por tabulaciones.",
    codigo: `const conEspacios = texto + "   ";
return conEspacios.trimEnd();`,
  },

  trimleft: {
    titulo: "Alias de trimStart",
    descripcion:
      "trimLeft() es un alias histórico de trimStart(): quita espacios del inicio.",
    prueba:
      "Compara trimLeft() con trimStart(): devuelven lo mismo.",
    codigo: `const conEspacios = "   " + texto;
return conEspacios.trimLeft();`,
  },

  trimright: {
    titulo: "Alias de trimEnd",
    descripcion:
      "trimRight() es un alias histórico de trimEnd(): quita espacios del final.",
    prueba:
      "Compara trimRight() con trimEnd(): devuelven lo mismo.",
    codigo: `const conEspacios = texto + "   ";
return conEspacios.trimRight();`,
  },

  padstart: {
    titulo: "Rellena por delante",
    descripcion:
      "padStart() añade caracteres al principio hasta alcanzar la longitud indicada.",
    prueba:
      "Cambia el relleno por \"0\" y la longitud para simular códigos.",
    codigo: `return texto.padStart(texto.length + 4, "⭐");`,
  },

  padend: {
    titulo: "Rellena por detrás",
    descripcion:
      "padEnd() añade caracteres al final hasta alcanzar la longitud indicada.",
    prueba:
      "Reduce la longitud objetivo por debajo del texto y observa que no recorta.",
    codigo: `return texto.padEnd(texto.length + 4, "⭐");`,
  },

  substring: {
    titulo: "Extrae entre índices",
    descripcion:
      "substring() devuelve la parte de la cadena entre dos índices, sin incluir el final.",
    prueba:
      "Invierte los índices: substring los intercambia automáticamente.",
    codigo: `return texto.substring(0, 6);`,
  },

  charat: {
    titulo: "Carácter por posición",
    descripcion:
      "charAt() devuelve el carácter en una posición concreta, o una cadena vacía si no existe.",
    prueba:
      "Prueba una posición mayor que la longitud del texto.",
    codigo: `return {
  primero: texto.charAt(0),
  ultimo: texto.charAt(texto.length - 1),
};`,
  },

  split: {
    titulo: "Divide en un array",
    descripcion:
      "split() divide la cadena en un array usando el separador indicado.",
    prueba:
      "Cambia el separador por \"\" para separar carácter a carácter.",
    codigo: `return texto.split(" ");`,
  },

  replace: {
    titulo: "Sustituye la primera",
    descripcion:
      "replace() sustituye la primera aparición de un texto o patrón.",
    prueba:
      "Cambia el reemplazo por un emoji distinto.",
    codigo: `return texto.replace(emojis[0] ?? "", "🐉");`,
  },

  replaceall: {
    titulo: "Sustituye todas",
    descripcion:
      "replaceAll() sustituye todas las apariciones del texto o patrón.",
    prueba:
      "Duplica un emoji y compara replace() con replaceAll().",
    codigo: `return texto.replaceAll(emojis[0] ?? "", "🐉");`,
  },

  includes: {
    titulo: "¿Contiene el texto?",
    descripcion:
      "includes() comprueba si la cadena contiene la subcadena indicada.",
    prueba:
      "Busca el último emoji o una palabra que no exista.",
    codigo: `return {
  texto,
  incluyePrimero: texto.includes(emojis[0] ?? ""),
};`,
  },

  search: {
    titulo: "Busca con expresión regular",
    descripcion:
      "search() devuelve la posición de la primera coincidencia de una expresión regular, o -1 si no hay.",
    prueba:
      "Cambia la expresión regular para buscar el primer emoji.",
    codigo: `return {
  texto,
  posicionVocal: texto.search(/[aeiou]/i),
};`,
  },

  match: {
    titulo: "Encuentra coincidencias",
    descripcion:
      "match() busca una expresión regular y devuelve las coincidencias encontradas.",
    prueba:
      "Añade la bandera g o cambia el patrón.",
    codigo: `return texto.match(/[^\\s]+/g);`,
  },

  matchall: {
    titulo: "Todas las coincidencias",
    descripcion:
      "matchAll() devuelve un iterador con todas las coincidencias y sus grupos.",
    prueba:
      "Recorre el resultado con for...of para ver cada coincidencia.",
    codigo: `return [...texto.matchAll(/[^\\s]+/g)].map(
  (coincidencia) => coincidencia[0],
);`,
  },

  localecompare: {
    titulo: "Compara textos",
    descripcion:
      "localeCompare() compara dos cadenas según las reglas del idioma y devuelve -1, 0 o 1.",
    prueba:
      "Cambia el texto de comparación para obtener otros valores.",
    codigo: `return {
  comparacion: texto.localeCompare("🍎 🐉 🍌"),
  texto,
};`,
  },

  normalize: {
    titulo: "Normaliza Unicode",
    descripcion:
      "normalize() convierte la cadena a una forma Unicode concreta, útil para comparar acentos.",
    prueba:
      "Compara el texto descompuesto con el normalizado.",
    codigo: `const descompuesto = "e\\u0301";
return {
  descompuesto,
  normalizado: descompuesto.normalize("NFC"),
};`,
  },

  /* ---------------- Números ---------------- */

  isinteger: {
    titulo: "¿Es un entero?",
    descripcion:
      "Number.isInteger() indica si un valor es un número entero, sin decimales.",
    prueba:
      "Añade 7.5 y -2.0 al constructor y compara los resultados.",
    codigo: `return numeros.map((numero) => ({
  numero,
  esEntero: Number.isInteger(numero),
}));`,
  },

  issafeinteger: {
    titulo: "¿Es un entero seguro?",
    descripcion:
      "Number.isSafeInteger() comprueba si el entero puede representarse con precisión.",
    prueba:
      "Añade 9007199254740993 y observa que deja de ser seguro.",
    codigo: `return numeros.map((numero) => ({
  numero,
  esSeguro: Number.isSafeInteger(numero),
}));`,
  },

  isfinite: {
    titulo: "¿Es un número finito?",
    descripcion:
      "Number.isFinite() devuelve true solo para números finitos, sin convertir textos.",
    prueba:
      "Compara con isFinite(\"10\"): la versión global convierte el texto.",
    codigo: `return numeros.map((numero) => ({
  numero,
  esFinito: Number.isFinite(numero),
}));`,
  },

  isnan: {
    titulo: "¿Es NaN?",
    descripcion:
      "Number.isNaN() comprueba si el valor es exactamente NaN, sin convertir otros tipos.",
    prueba:
      "Añadimos Number(\"no es un número\") para provocar un NaN real.",
    codigo: `const valores = [...numeros, Number("no es un número")];
return valores.map((numero) => ({
  numero: Number.isNaN(numero) ? "NaN" : numero,
  esNaN: Number.isNaN(numero),
}));`,
  },

  parseint: {
    titulo: "Convierte a entero",
    descripcion:
      "Number.parseInt() lee un texto y devuelve su parte entera en la base indicada.",
    prueba:
      "Añade números con decimales para ver cómo se descarta la parte decimal.",
    codigo: `return numeros.map((numero) => ({
  texto: String(numero),
  entero: Number.parseInt(String(numero), 10),
}));`,
  },

  parsefloat: {
    titulo: "Convierte a decimal",
    descripcion:
      "Number.parseFloat() lee un texto y devuelve el número decimal que encuentra.",
    prueba:
      "Añade 3.1416 y compara con parseInt().",
    codigo: `return numeros.map((numero) => ({
  texto: String(numero),
  decimal: Number.parseFloat(String(numero)),
}));`,
  },

  tofixed: {
    titulo: "Fija los decimales",
    descripcion:
      "toFixed() devuelve una cadena con el número redondeado al número de decimales indicado.",
    prueba:
      "Cambia el 2 por 0 o por 4 y observa el redondeo.",
    codigo: `return numeros.map((numero) => ({
  numero,
  dosDecimales: Number(numero).toFixed(2),
}));`,
  },

  /* ---------------- Fechas ---------------- */

  newdate: {
    titulo: "Crea una fecha",
    descripcion:
      "new Date() construye un objeto Date con la fecha y hora indicadas o con el momento actual.",
    prueba:
      "Cambia los campos del constructor y compara tu fecha con la actual.",
    codigo: `return {
  tuFecha: fecha.toLocaleString("es-ES"),
  ahora: new Date().toLocaleString("es-ES"),
};`,
  },

  datenow: {
    titulo: "Timestamp actual",
    descripcion:
      "Date.now() devuelve los milisegundos transcurridos desde el 1 de enero de 1970.",
    prueba:
      "Ejecuta dos veces y observa cómo cambia el valor.",
    codigo: `return {
  ahoraMs: Date.now(),
  tuFechaMs: fecha.getTime(),
  diferenciaSegundos: Math.round((Date.now() - fecha.getTime()) / 1000),
};`,
  },

  gettime: {
    titulo: "Milisegundos de la fecha",
    descripcion:
      "getTime() devuelve el timestamp de una fecha concreta en milisegundos.",
    prueba:
      "Resta dos getTime() para calcular una diferencia de tiempo.",
    codigo: `return fecha.getTime();`,
  },

  getfullyear: {
    titulo: "Obtén el año",
    descripcion:
      "getFullYear() devuelve el año completo de la fecha, con cuatro cifras.",
    prueba:
      "Cambia el año en el constructor y ejecuta de nuevo.",
    codigo: `return fecha.getFullYear();`,
  },

  getmonth: {
    titulo: "Obtén el mes",
    descripcion:
      "getMonth() devuelve el mes entre 0 (enero) y 11 (diciembre).",
    prueba:
      "Elige diciembre y comprueba que devuelve 11.",
    codigo: `return {
  indice: fecha.getMonth(),
  mes: fecha.getMonth() + 1,
};`,
  },

  getdate: {
    titulo: "Día del mes",
    descripcion:
      "getDate() devuelve el día del mes, de 1 a 31.",
    prueba:
      "Cambia el día a 31 en un mes corto y observa el desbordamiento.",
    codigo: `return fecha.getDate();`,
  },

  getday: {
    titulo: "Día de la semana",
    descripcion:
      "getDay() devuelve el día de la semana: 0 es domingo y 6 es sábado.",
    prueba:
      "Elige un domingo y comprueba que devuelve 0.",
    codigo: `const dias = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];
return {
  indice: fecha.getDay(),
  dia: dias[fecha.getDay()],
};`,
  },

  gethours: {
    titulo: "Obtén la hora",
    descripcion:
      "getHours() devuelve la hora local de la fecha, de 0 a 23.",
    prueba:
      "Cambia la hora por 23 y ejecuta de nuevo.",
    codigo: `return fecha.getHours();`,
  },

  getminutes: {
    titulo: "Obtén los minutos",
    descripcion:
      "getMinutes() devuelve los minutos de la fecha, de 0 a 59.",
    prueba:
      "Prueba con 59 minutos y observa el resultado.",
    codigo: `return fecha.getMinutes();`,
  },

  getseconds: {
    titulo: "Obtén los segundos",
    descripcion:
      "getSeconds() devuelve los segundos de la fecha, de 0 a 59.",
    prueba:
      "Prueba con 59 segundos y ejecuta de nuevo.",
    codigo: `return fecha.getSeconds();`,
  },

  setfullyear: {
    titulo: "Cambia el año",
    descripcion:
      "setFullYear() modifica el año de la fecha y devuelve el nuevo timestamp.",
    prueba:
      "Cambia 2030 por otro año y compara la fecha resultante.",
    codigo: `const copia = new Date(fecha);
copia.setFullYear(2030);
console.log("Año original:", fecha.getFullYear());
return copia;`,
  },

  setdate: {
    titulo: "Cambia el día del mes",
    descripcion:
      "setDate() modifica el día del mes y ajusta automáticamente el resto de la fecha.",
    prueba:
      "Prueba setDate(0) para ir al último día del mes anterior.",
    codigo: `const copia = new Date(fecha);
copia.setDate(1);
return copia;`,
  },

  sethours: {
    titulo: "Cambia la hora",
    descripcion:
      "setHours() modifica la hora, los minutos, los segundos y los milisegundos.",
    prueba:
      "Cambia la hora a 0, 12 y 23 para comparar.",
    codigo: `const copia = new Date(fecha);
copia.setHours(23, 59, 0);
return copia;`,
  },

  setminutes: {
    titulo: "Cambia los minutos",
    descripcion:
      "setMinutes() modifica los minutos y, opcionalmente, los segundos y milisegundos.",
    prueba:
      "Cambia los minutos a 0 y después a 59.",
    codigo: `const copia = new Date(fecha);
copia.setMinutes(0);
return copia;`,
  },

  toisostring: {
    titulo: "Formato ISO",
    descripcion:
      "toISOString() devuelve la fecha en formato ISO 8601, siempre en UTC.",
    prueba:
      "Cambia la hora y observa el desplazamiento respecto a tu zona horaria.",
    codigo: `return fecha.toISOString();`,
  },

  tolocalestring: {
    titulo: "Fecha y hora local",
    descripcion:
      "toLocaleString() devuelve la fecha y la hora formateadas según el idioma indicado.",
    prueba:
      "Prueba con \"en-US\" y \"es-ES\" para comparar formatos.",
    codigo: `return fecha.toLocaleString("es-ES");`,
  },

  tolocaledatestring: {
    titulo: "Solo la fecha local",
    descripcion:
      "toLocaleDateString() devuelve únicamente la fecha formateada según el idioma.",
    prueba:
      "Prueba con \"en-GB\" y \"es-ES\" para ver el orden de día y mes.",
    codigo: `return fecha.toLocaleDateString("es-ES");`,
  },

  tolocaletimestring: {
    titulo: "Solo la hora local",
    descripcion:
      "toLocaleTimeString() devuelve únicamente la hora formateada según el idioma.",
    prueba:
      "Cambia la hora y prueba con \"en-US\" para ver el formato de 12 horas.",
    codigo: `return fecha.toLocaleTimeString("es-ES");`,
  },

  /* ---------------- JSON ---------------- */

  "json-stringify": {
    titulo: "Convierte datos en JSON",
    descripcion:
      "JSON.stringify() transforma un valor de JavaScript en una cadena JSON. Aquí serializa tu array de emojis con formato legible.",
    prueba:
      "Cambia el tercer argumento (2) por 0 o por 4 para ajustar la indentación.",
    codigo: `const json = JSON.stringify(emojis, null, 2);
console.log(json);
return json;`,
  },

  "json-parse": {
    titulo: "Reconstruye datos desde JSON",
    descripcion:
      "JSON.parse() convierte una cadena JSON de vuelta a un valor de JavaScript. El array se serializa y se recupera.",
    prueba:
      "Modifica el JSON a mano, por ejemplo añadiendo un emoji más, y ejecuta de nuevo.",
    codigo: `const json = JSON.stringify(emojis);
console.log("JSON:", json);
const recuperado = JSON.parse(json);
console.log("Array recuperado:", recuperado);
return recuperado;`,
  },

  /* ---------------- Temporizadores ---------------- */

  settimeout: {
    titulo: "Ejecuta después de un tiempo",
    descripcion:
      "setTimeout() programa una función para que se ejecute una vez tras el retardo indicado. El retardo sale del primer número de tu lista.",
    prueba:
      "Cambia el primer número para ajustar la espera (se limita entre 50 y 1000 ms).",
    codigo: `const bruto = numeros[0];
const valor = Number.isFinite(bruto) ? Math.round(bruto) : 300;
const retardo = Math.max(50, Math.min(1000, valor));
console.log("Esperando " + retardo + " ms…");
await new Promise((resolver) => setTimeout(resolver, retardo));
return "¡Pasaron " + retardo + " ms!";`,
  },

  cleartimeout: {
    titulo: "Cancela un timeout",
    descripcion:
      "clearTimeout() cancela un temporizador programado con setTimeout() antes de que se ejecute.",
    prueba:
      "Comprueba en la consola que el mensaje del timeout cancelado nunca aparece.",
    codigo: `const bruto = numeros[0];
const valor = Number.isFinite(bruto) ? Math.round(bruto) : 300;
const retardo = Math.max(50, Math.min(1000, valor));
const id = setTimeout(
  () => console.log("❌ Este mensaje no debería aparecer"),
  retardo,
);
clearTimeout(id);
await new Promise((resolver) => setTimeout(resolver, retardo + 100));
return "Timeout cancelado antes de ejecutarse";`,
  },

  setinterval: {
    titulo: "Repite cada intervalo",
    descripcion:
      "setInterval() ejecuta una función repetidamente cada cierto tiempo hasta que se cancela.",
    prueba:
      "Cambia el primer número para ajustar el intervalo (entre 50 y 500 ms).",
    codigo: `const bruto = numeros[0];
const valor = Number.isFinite(bruto) ? Math.round(bruto) : 150;
const intervalo = Math.max(50, Math.min(500, valor));
let ticks = 0;
const id = setInterval(() => {
  ticks += 1;
  console.log("Tick", ticks);
  if (ticks >= 3) clearInterval(id);
}, intervalo);
await new Promise((resolver) => setTimeout(resolver, intervalo * 3 + 150));
return "Ticks recibidos: " + ticks;`,
  },

  clearinterval: {
    titulo: "Detiene un intervalo",
    descripcion:
      "clearInterval() cancela un intervalo creado con setInterval() y detiene las repeticiones.",
    prueba:
      "Compara este ejemplo con setInterval(): aquí se detiene tras el primer tick.",
    codigo: `const bruto = numeros[0];
const valor = Number.isFinite(bruto) ? Math.round(bruto) : 150;
const intervalo = Math.max(50, Math.min(500, valor));
let ticks = 0;
const id = setInterval(() => {
  ticks += 1;
  console.log("Tick", ticks);
}, intervalo);
await new Promise((resolver) => setTimeout(resolver, intervalo + 100));
clearInterval(id);
await new Promise((resolver) => setTimeout(resolver, intervalo + 50));
return "Intervalo detenido tras " + ticks + " tick(s)";`,
  },

  /* ---------------- Archivos ---------------- */

  "filereader-readastext": {
    titulo: "Lee un archivo como texto",
    descripcion:
      "FileReader.readAsText() lee el contenido de un archivo Blob o File como una cadena de texto.",
    prueba:
      "El archivo se crea con el texto de tus emojis. Añade más y vuelve a leerlo.",
    codigo: `const archivo = new File([texto], "nota.txt", { type: "text/plain" });
console.log("Archivo:", archivo.name, "·", archivo.size, "bytes");
const lector = new FileReader();
const contenido = await new Promise((resolver, rechazar) => {
  lector.onload = () => resolver(lector.result);
  lector.onerror = () => rechazar(lector.error);
  lector.readAsText(archivo);
});
console.log("Contenido:", contenido);
return contenido;`,
  },

  "filereader-readasdataurl": {
    titulo: "Lee un archivo como Data URL",
    descripcion:
      "FileReader.readAsDataURL() convierte el archivo en una URL de datos codificada, útil para previsualizar imágenes.",
    prueba:
      "Observa el prefijo data:text/plain y el contenido codificado en base64.",
    codigo: `const archivo = new File([texto], "nota.txt", { type: "text/plain" });
const lector = new FileReader();
const dataUrl = await new Promise((resolver, rechazar) => {
  lector.onload = () => resolver(lector.result);
  lector.onerror = () => rechazar(lector.error);
  lector.readAsDataURL(archivo);
});
console.log("Data URL:", dataUrl.slice(0, 80) + "…");
return dataUrl;`,
  },

  /* ---------------- Pantalla completa ---------------- */

  "fullscreen-request": {
    titulo: "Activa la pantalla completa",
    descripcion:
      "requestFullscreen() pide al navegador mostrar un elemento a pantalla completa. Aquí se simula el documento en el worker.",
    prueba:
      "Cambia el texto del constructor: aparecerá como contenido del elemento simulado.",
    entorno: ENTORNO_FULLSCREEN,
    preludio: PRELUDIO_FULLSCREEN,
    codigo: `await document.documentElement.requestFullscreen();
return {
  activa: document.fullscreenElement !== null,
  contenido: document.fullscreenElement?.textContent ?? null,
};`,
  },

  "fullscreen-exit": {
    titulo: "Sale de pantalla completa",
    descripcion:
      "document.exitFullscreen() abandona el modo de pantalla completa y devuelve el control a la página.",
    prueba:
      "Observa el estado antes y después de llamar a exitFullscreen().",
    entorno: ENTORNO_FULLSCREEN,
    preludio: PRELUDIO_FULLSCREEN,
    codigo: `await document.documentElement.requestFullscreen();
console.log("Antes:", document.fullscreenElement !== null);
await document.exitFullscreen();
return { activa: document.fullscreenElement !== null };`,
  },

  /* ---------------- DOM · Selección ---------------- */

  "dom-getelementbyid": {
    titulo: "Selecciona por id",
    descripcion:
      "getElementById() devuelve el elemento cuyo id coincide con el texto indicado, o null si no existe.",
    prueba:
      "Cambia \"titulo\" por \"miCaja\" o por un id inexistente.",
    entorno: ENTORNO_DOM,
    preludio: PRELUDIO_DOM,
    codigo: `const elemento = document.getElementById("titulo");
console.log("Encontrado:", elemento?.tagName);
return elemento ? elemento.textContent : null;`,
  },

  "dom-getelementsbyclassname": {
    titulo: "Selecciona por clase",
    descripcion:
      "getElementsByClassName() devuelve todos los elementos que tienen la clase indicada.",
    prueba:
      "La clase item existe en un <li> por cada emoji de tu array.",
    entorno: ENTORNO_DOM,
    preludio: PRELUDIO_DOM,
    codigo: `const items = document.getElementsByClassName("item");
console.log("Cantidad:", items.length);
return [...items].map((item) => item.textContent);`,
  },

  "dom-getelementsbytagname": {
    titulo: "Selecciona por etiqueta",
    descripcion:
      "getElementsByTagName() devuelve todos los elementos con la etiqueta HTML indicada.",
    prueba:
      "Prueba con \"li\", \"div\" o \"h1\" y compara las cantidades.",
    entorno: ENTORNO_DOM,
    preludio: PRELUDIO_DOM,
    codigo: `const items = document.getElementsByTagName("li");
console.log("Elementos li:", items.length);
return [...items].map((item) => item.textContent);`,
  },

  "dom-queryselector": {
    titulo: "Selecciona el primero",
    descripcion:
      "querySelector() devuelve el primer elemento que coincide con un selector CSS.",
    prueba:
      "Prueba selectores como \"#titulo\", \".item\" o \"#lista\".",
    entorno: ENTORNO_DOM,
    preludio: PRELUDIO_DOM,
    codigo: `const primero = document.querySelector(".item");
console.log("Primer item:", primero?.textContent);
return primero ? primero.textContent : null;`,
  },

  "dom-queryselectorall": {
    titulo: "Selecciona todos",
    descripcion:
      "querySelectorAll() devuelve todos los elementos que coinciden con un selector CSS.",
    prueba:
      "Cambia el selector por \"#lista\" o \"li.item\" y observa el resultado.",
    entorno: ENTORNO_DOM,
    preludio: PRELUDIO_DOM,
    codigo: `const items = document.querySelectorAll(".item");
console.log("Coincidencias:", items.length);
return [...items].map((item) => item.textContent);`,
  },

  /* ---------------- Web Storage ---------------- */

  "storage-localstorage": {
    titulo: "Almacenamiento persistente",
    descripcion:
      "localStorage guarda pares clave-valor que sobreviven al cierre del navegador. Aquí usamos un almacén simulado en memoria.",
    prueba:
      "Guarda varias claves y comprueba localStorage.length y getItem().",
    entorno: ENTORNO_STORAGE,
    preludio: PRELUDIO_STORAGE,
    codigo: `localStorage.setItem("tema", "oscuro");
localStorage.setItem("texto", texto);
console.log("Claves guardadas:", localStorage.length);
return {
  tema: localStorage.getItem("tema"),
  texto: localStorage.getItem("texto"),
};`,
  },

  "storage-sessionstorage": {
    titulo: "Almacenamiento por sesión",
    descripcion:
      "sessionStorage funciona como localStorage, pero los datos se borran al cerrar la pestaña.",
    prueba:
      "Guarda un paso y un texto, y recupéralos con getItem().",
    entorno: ENTORNO_STORAGE,
    preludio: PRELUDIO_STORAGE,
    codigo: `sessionStorage.setItem("paso", "1");
sessionStorage.setItem("texto", texto);
console.log("Longitud:", sessionStorage.length);
return {
  paso: sessionStorage.getItem("paso"),
  texto: sessionStorage.getItem("texto"),
};`,
  },

  "storage-setitem": {
    titulo: "Guarda un valor",
    descripcion:
      "setItem(clave, valor) guarda un par clave-valor. Los valores se convierten a string.",
    prueba:
      "Guarda un objeto con JSON.stringify y recupéralo con JSON.parse.",
    entorno: ENTORNO_STORAGE,
    preludio: PRELUDIO_STORAGE,
    codigo: `const perfil = { texto, emojis, creado: "hoy" };
localStorage.setItem("perfil", JSON.stringify(perfil));
const guardado = localStorage.getItem("perfil");
console.log("Guardado:", guardado);
return JSON.parse(guardado);`,
  },

  "storage-getitem": {
    titulo: "Recupera un valor",
    descripcion:
      "getItem(clave) devuelve el valor asociado a una clave, o null si no existe.",
    prueba:
      "Consulta también una clave que no hayas guardado.",
    entorno: ENTORNO_STORAGE,
    preludio: PRELUDIO_STORAGE,
    codigo: `localStorage.setItem("saludo", texto);
const valor = localStorage.getItem("saludo");
console.log("Recuperado:", valor);
console.log("Clave inexistente:", localStorage.getItem("no-existe"));
return valor;`,
  },

  "storage-removeitem": {
    titulo: "Elimina una clave",
    descripcion:
      "removeItem(clave) elimina únicamente el par clave-valor indicado.",
    prueba:
      "Comprueba que la otra clave sigue existiendo después de eliminar la primera.",
    entorno: ENTORNO_STORAGE,
    preludio: PRELUDIO_STORAGE,
    codigo: `localStorage.setItem("uno", emojis[0] ?? "🍎");
localStorage.setItem("dos", emojis[1] ?? "🐉");
localStorage.removeItem("uno");
console.log("Longitud:", localStorage.length);
return {
  uno: localStorage.getItem("uno"),
  dos: localStorage.getItem("dos"),
};`,
  },

  "storage-key": {
    titulo: "Obtén una clave por índice",
    descripcion:
      "key(indice) devuelve el nombre de la clave que ocupa esa posición en el almacén.",
    prueba:
      "Añade más claves y recorre los índices con un map.",
    entorno: ENTORNO_STORAGE,
    preludio: PRELUDIO_STORAGE,
    codigo: `localStorage.setItem("a", emojis[0] ?? "🍎");
localStorage.setItem("b", emojis[1] ?? "🐉");
localStorage.setItem("c", emojis[2] ?? "🍌");
return [0, 1, 2, 3].map((indice) => localStorage.key(indice));`,
  },

  "storage-clear": {
    titulo: "Vacía el almacén",
    descripcion:
      "clear() elimina todas las claves del almacén de una sola vez.",
    prueba:
      "Compara la longitud antes y después de llamar a clear().",
    entorno: ENTORNO_STORAGE,
    preludio: PRELUDIO_STORAGE,
    codigo: `localStorage.setItem("a", "1");
localStorage.setItem("b", "2");
console.log("Antes:", localStorage.length);
localStorage.clear();
console.log("Después:", localStorage.length);
return localStorage.getItem("a");`,
  },

  /* ---------------- Voz ---------------- */

  "voz-speak": {
    titulo: "Reproduce un texto",
    descripcion:
      "speechSynthesis.speak() envía un SpeechSynthesisUtterance a la cola de voz del navegador. Aquí la voz está simulada.",
    prueba:
      "Cambia el texto desde el constructor y observa lo que se envía a la cola.",
    entorno: ENTORNO_VOZ,
    preludio: PRELUDIO_VOZ,
    codigo: `const utterance = new SpeechSynthesisUtterance(texto);
utterance.lang = "es-ES";
speechSynthesis.speak(utterance);
await new Promise((resolver) => setTimeout(resolver, 300));
return "Se envió a la cola: " + utterance.text;`,
  },

  "voz-utterance": {
    titulo: "Configura la locución",
    descripcion:
      "SpeechSynthesisUtterance contiene el texto y ajustes como lang, rate, pitch y volume.",
    prueba:
      "Cambia rate y pitch para simular una voz más rápida o más grave.",
    entorno: ENTORNO_VOZ,
    preludio: PRELUDIO_VOZ,
    codigo: `const utterance = new SpeechSynthesisUtterance(texto);
utterance.lang = "es-ES";
utterance.rate = 1.2;
utterance.pitch = 0.9;
console.log("Configuración:", {
  lang: utterance.lang,
  rate: utterance.rate,
  pitch: utterance.pitch,
});
return {
  texto: utterance.text,
  lang: utterance.lang,
  rate: utterance.rate,
  pitch: utterance.pitch,
};`,
  },

  "voz-onspeechend": {
    titulo: "Detecta el final",
    descripcion:
      "El evento end del utterance avisa de que la locución ha terminado, algo útil para encadenar acciones.",
    prueba:
      "Observa el orden de los mensajes: primero habla y después llega end.",
    entorno: ENTORNO_VOZ,
    preludio: PRELUDIO_VOZ,
    codigo: `const utterance = new SpeechSynthesisUtterance(texto);
const terminar = new Promise((resolver) => {
  utterance.onend = () => {
    console.log("Evento end recibido");
    resolver("Voz terminada");
  };
});
speechSynthesis.speak(utterance);
return await terminar;`,
  },

  "voz-recognition": {
    titulo: "Reconoce una frase",
    descripcion:
      "SpeechRecognition escucha el micrófono y entrega una transcripción. Aquí el reconocimiento está simulado con tu texto.",
    prueba:
      "Cambia el texto del constructor para simular otra transcripción.",
    entorno: ENTORNO_VOZ,
    preludio: PRELUDIO_VOZ,
    codigo: `const reconocimiento = new SpeechRecognition();
reconocimiento.lang = "es-ES";
const escuchar = new Promise((resolver) => {
  reconocimiento.onresult = (evento) => {
    const transcripcion = evento.results[0][0].transcript;
    console.log("Transcripción:", transcripcion);
    resolver(transcripcion);
  };
});
reconocimiento.start();
return await escuchar;`,
  },

  "voz-stop": {
    titulo: "Detiene la voz",
    descripcion:
      "speechSynthesis.cancel() vacía la cola y detiene la locución en curso.",
    prueba:
      "Comprueba el estado hablando antes y después de cancelar.",
    entorno: ENTORNO_VOZ,
    preludio: PRELUDIO_VOZ,
    codigo: `const utterance = new SpeechSynthesisUtterance(texto);
speechSynthesis.speak(utterance);
console.log("Hablando:", speechSynthesis.hablando);
speechSynthesis.cancel();
return { hablando: speechSynthesis.hablando };`,
  },
};

/* ============================================================
   API pública
   ============================================================ */

Object.assign(
  PLANTILLAS,
  EXTRA_CONFIGS,
  OBJECT_CONFIGS,
  MAP_SET_CONFIGS,
  REGEXP_CONFIGS,
  INTL_CONFIGS,
  APUNTES_HTML_CONFIGS,
);

export const LIVE_EXAMPLE_IDS = new Set([
  ...Object.keys(EJEMPLOS),
  ...Object.keys(PLANTILLAS),
]);

export function getLiveExample(metodo) {
  const id = typeof metodo === "string" ? metodo : metodo?.id;
  if (!id) return null;

  /* Los apuntes HTML usan ids con prefijo (`js-object-defineproperty`),
     mientras que algunos ejemplos vivos se registraron sin él
     (`object-defineproperty`). Probamos ambas formas y estos alias. */
  const alias = {
    "js-hasownproperty": "object-prototype-hasownproperty",
    "js-new-object": "object-new",
    "js-object-tostring": "object-prototype-tostring",
    "js-object-valueof": "object-prototype-valueof",
  };
  const candidatos = [id, alias[id]].filter(Boolean);
  const sinPrefijo = id.replace(/^js-/, "");
  if (sinPrefijo !== id && !candidatos.includes(sinPrefijo)) {
    candidatos.push(sinPrefijo);
  }

  const etiqueta =
    typeof metodo === "string" ? id : metodo.titulo ?? metodo.nombre ?? id;

  for (const candidato of candidatos) {
    const categoria = CATEGORIAS[candidato] ?? "array";

    if (EJEMPLOS[candidato]) {
      return { categoria, ...EJEMPLOS[candidato] };
    }

    const plantilla = PLANTILLAS[candidato];
    if (!plantilla) continue;

    return {
      categoria,
      etiqueta,
      titulo: plantilla.titulo,
      descripcion:
        plantilla.descripcion ??
        `Ejecuta ${etiqueta} con tus propios datos y observa el resultado en la consola.`,
      prueba:
        plantilla.prueba ??
        "Cambia los datos del constructor, edita el código y vuelve a ejecutar.",
      codigo: plantilla.codigo,
      preludio: plantilla.preludio,
      entorno: plantilla.entorno,
      estricto: plantilla.estricto,
    };
  }

  return null;
}
