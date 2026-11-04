/* Ejemplos vivos de Map y Set.
   El worker inyecta `emojis`, `texto`, `numeros` y `fecha`.
   Todos los ejemplos de esta categoría construyen las colecciones
   a partir del array `emojis`, por eso su categoría es "array". */

export const MAP_SET_CONFIGS = {
  "map-set": {
    titulo: "Crea y actualiza entradas",
    descripcion:
      "set() guarda un par clave-valor en el Map. Si la clave ya existe, reemplaza el valor sin cambiar el orden.",
    prueba:
      "Cambia el segundo argumento de mapa.set(0, ...) y observa cómo se sustituye el primer valor.",
    codigo: `const mapa = new Map();
emojis.forEach((emoji, indice) => {
  mapa.set(indice, emoji);
});
console.log("Entradas iniciales:", Array.from(mapa.entries()));
mapa.set("extra", "✨");
mapa.set(0, "🚀");
console.log("Tamaño tras las inserciones:", mapa.size);
console.log("Claves:", Array.from(mapa.keys()));
return Array.from(mapa.entries());`,
  },

  "map-get": {
    titulo: "Lee el valor de una clave",
    descripcion:
      "get() devuelve el valor asociado a una clave y undefined cuando esa clave no existe.",
    prueba:
      "Sustituye la clave inexistente por una que sí esté en el Map y compara los resultados.",
    codigo: `const longitudes = new Map(
  emojis.map((emoji) => [emoji, emoji.length]),
);
const primero = emojis[0];
console.log("Claves:", Array.from(longitudes.keys()));
console.log("Longitud del primero:", longitudes.get(primero));
console.log("Clave inexistente:", longitudes.get("🛸"));
const longitud = longitudes.get(primero) ?? 0;
return { clave: primero, longitud: longitud, total: longitudes.size };`,
  },

  "map-has": {
    titulo: "Comprueba si una clave existe",
    descripcion:
      "has() responde true o false según si la clave está registrada en el Map.",
    prueba:
      "Añade el emoji 🛸 a tu array: la comprobación que antes era false pasará a true.",
    codigo: `const mapa = new Map();
emojis.forEach((emoji, indice) => {
  mapa.set(emoji, indice);
});
const primero = emojis[0];
const existePrimero = mapa.has(primero);
const existeNuevo = mapa.has("🛸");
console.log("¿Existe " + primero + "?", existePrimero);
console.log("¿Existe 🛸?", existeNuevo);
console.log("Tamaño del mapa:", mapa.size);
return {
  existePrimero: existePrimero,
  existeNuevo: existeNuevo,
  total: mapa.size,
};`,
  },

  "map-delete": {
    titulo: "Elimina una entrada",
    descripcion:
      "delete() borra el par asociado a una clave y devuelve true solo si la entrada existía.",
    prueba:
      "Ejecuta el ejemplo dos veces mentalmente: el segundo delete de la misma clave devuelve false.",
    codigo: `const mapa = new Map();
emojis.forEach((emoji, indice) => {
  mapa.set(indice, emoji);
});
const clave = 0;
const borrado = mapa.delete(clave);
const repetido = mapa.delete(clave);
console.log("delete(" + clave + "):", borrado);
console.log("Repetir el mismo delete:", repetido);
console.log("Tamaño tras borrar:", mapa.size);
return {
  borrado: borrado,
  repetido: repetido,
  restantes: Array.from(mapa.values()),
};`,
  },

  "map-foreach": {
    titulo: "Recorre claves y valores",
    descripcion:
      "forEach() ejecuta una función por cada par. El callback recibe primero el valor y después la clave.",
    prueba:
      "Añade un emoji y comprueba que el total de caracteres crece sin tocar el orden del recorrido.",
    codigo: `const mapa = new Map();
emojis.forEach((emoji, indice) => {
  mapa.set("clave-" + indice, emoji);
});
let totalCaracteres = 0;
mapa.forEach((valor, clave) => {
  totalCaracteres += valor.length;
  console.log(clave + " → " + valor);
});
console.log("Longitud total:", totalCaracteres);
console.log("Entradas recorridas:", mapa.size);
return { totalCaracteres: totalCaracteres, entradas: mapa.size };`,
  },

  "map-entries": {
    titulo: "Obtén los pares del Map",
    descripcion:
      "entries() devuelve un iterador de pares [clave, valor] que se puede recorrer o convertir en array.",
    prueba:
      "Prueba a filtrar los pares con .filter(([indice]) => indice % 2 === 0) para quedarte con las claves pares.",
    codigo: `const mapa = new Map();
emojis.forEach((emoji, indice) => {
  mapa.set(indice, emoji);
});
const pares = [...mapa.entries()];
console.log("Pares:", pares);
for (const [indice, emoji] of mapa.entries()) {
  console.log("Entrada", indice + ":", emoji);
}
const descripcion = pares.map(([indice, emoji]) => indice + ": " + emoji);
console.log("Descripción:", descripcion);
return { total: pares.length, primero: pares[0] };`,
  },

  "set-add": {
    titulo: "Añade valores únicos",
    descripcion:
      "add() incorpora un valor solo si no estaba ya. Repetir un emoji no aumenta el tamaño del Set.",
    prueba:
      "Duplica un emoji en tu array: el Set seguirá teniendo el mismo número de valores únicos.",
    codigo: `const set = new Set();
emojis.forEach((emoji) => set.add(emoji));
const unicos = set.size;
set.add(emojis[0]);
set.add(emojis[0]);
console.log("Emojis en el array:", emojis.length);
console.log("Valores únicos:", unicos);
console.log("Tras repetir el primero:", set.size);
set.add("✨");
console.log("Tras añadir ✨:", set.size);
return {
  enArray: emojis.length,
  unicos: unicos,
  final: set.size,
  valores: [...set],
};`,
  },

  "set-has": {
    titulo: "Pregunta si un valor está",
    descripcion:
      "has() comprueba la pertenencia a un Set y devuelve un booleano sin modificar la colección.",
    prueba:
      "Cambia la cadena 🛸 por cualquiera de tus emojis para ver cómo la respuesta pasa a true.",
    codigo: `const set = new Set(emojis);
const primero = emojis[0];
let duplicados = 0;
emojis.forEach((emoji, indice) => {
  if (emojis.indexOf(emoji) !== indice) duplicados += 1;
});
console.log("Conjunto:", [...set]);
console.log("¿Está " + primero + "?", set.has(primero));
console.log("¿Está 🛸?", set.has("🛸"));
console.log("Duplicados en el array:", duplicados);
return {
  primero: primero,
  existe: set.has(primero),
  existeNuevo: set.has("🛸"),
  unicos: set.size,
  duplicados: duplicados,
};`,
  },

  "set-delete": {
    titulo: "Elimina un valor",
    descripcion:
      "delete() quita un valor del Set y devuelve true si realmente estaba presente.",
    prueba:
      "Borra dos veces el mismo emoji: la primera devuelve true y la segunda false.",
    codigo: `const set = new Set(emojis);
const objetivo = emojis[0];
const borrado = set.delete(objetivo);
const otraVez = set.delete(objetivo);
console.log("delete(" + objetivo + "):", borrado);
console.log("Repetir el mismo delete:", otraVez);
console.log("Tamaño tras borrar:", set.size);
if (set.size > 0) {
  const siguiente = [...set][0];
  console.log("Primer valor restante:", siguiente);
}
return { borrado: borrado, otraVez: otraVez, restantes: [...set] };`,
  },

  "set-foreach": {
    titulo: "Recorre los valores únicos",
    descripcion:
      "forEach() visita cada valor del Set en orden de inserción. Los dos primeros argumentos del callback son el mismo valor.",
    prueba:
      "Añade emojis repetidos al array y comprueba que el contador de valores recorridos no cambia.",
    codigo: `const set = new Set(emojis);
let contador = 0;
let longitudTotal = 0;
set.forEach((valor) => {
  contador += 1;
  longitudTotal += valor.length;
  console.log(contador + " → " + valor);
});
console.log("Valores recorridos:", contador);
console.log("Tamaño del Set:", set.size);
return {
  recorridos: contador,
  longitudTotal: longitudTotal,
  unicos: set.size,
};`,
  },
};

export const MAP_SET_CATEGORIAS = {
  "map-set": "array",
  "map-get": "array",
  "map-has": "array",
  "map-delete": "array",
  "map-foreach": "array",
  "map-entries": "array",
  "set-add": "array",
  "set-has": "array",
  "set-delete": "array",
  "set-foreach": "array",
};
