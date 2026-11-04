/* Ejemplos vivos para los apuntes de Object.
   El worker inyecta `emojis`, `texto`, `numeros` y `fecha`; aquí no se declaran.
   Todos los ejemplos construyen objetos a partir de `emojis` y usan la
   categoría "array" del constructor de datos. */

export const OBJECT_CONFIGS = {
  "object-keys": {
    titulo: "Lista las claves del inventario",
    descripcion:
      "Object.keys() devuelve un array con los nombres de las propiedades propias y enumerables. Aquí cada emoji se guarda con una clave numerada.",
    prueba:
      "Añade o quita emojis en el constructor: el array de claves crece o se reduce, pero nunca incluye propiedades heredadas.",
    codigo: `const inventario = {};
emojis.forEach((emoji, indice) => {
  inventario["emoji_" + (indice + 1)] = emoji;
});
const claves = Object.keys(inventario);
console.log("Inventario:", inventario);
console.log("Claves propias:", claves);
console.log("Total de propiedades:", claves.length);
return claves;`,
  },

  "object-values": {
    titulo: "Lee solo los valores",
    descripcion:
      "Object.values() devuelve los valores de las propiedades propias y enumerables, en el mismo orden que sus claves.",
    prueba:
      "Cada ficha guarda el emoji y su posición. Observa que el array contiene los valores completos, no las claves.",
    codigo: `const inventario = {};
emojis.forEach((emoji, indice) => {
  inventario["emoji_" + (indice + 1)] = {
    emoji: emoji,
    posicion: indice + 1,
  };
});
const valores = Object.values(inventario);
console.log("Objeto:", inventario);
console.log("Valores:", valores);
console.log(
  "Posiciones:",
  valores.map((ficha) => ficha.posicion),
);
return valores;`,
  },

  "object-entries": {
    titulo: "Pares clave-valor",
    descripcion:
      "Object.entries() convierte el objeto en un array de pares [clave, valor], ideal para recorrer ambos datos a la vez.",
    prueba:
      "Cada línea de la consola muestra una clave y su emoji. Cambia el orden de los emojis y vuelve a ejecutar.",
    codigo: `const inventario = {};
emojis.forEach((emoji, indice) => {
  inventario["emoji_" + (indice + 1)] = emoji;
});
const entradas = Object.entries(inventario);
console.log("Pares:", entradas);
entradas.forEach(([clave, valor], posicion) => {
  console.log(posicion + 1 + ". " + clave + " → " + valor);
});
return entradas;`,
  },

  "object-fromentries": {
    titulo: "Reconstruye un objeto desde pares",
    descripcion:
      "Object.fromEntries() crea un objeto a partir de un iterable de pares [clave, valor]. Es el inverso de Object.entries().",
    prueba:
      "Los pares se generan con map y se convierten en objeto. Cambia los emojis y comprueba que las claves se regeneran.",
    codigo: `const pares = emojis.map((emoji, indice) => [
  "emoji_" + (indice + 1),
  {
    emoji: emoji,
    puntos: numeros[indice % numeros.length],
  },
]);
console.log("Pares de entrada:", pares);
const inventario = Object.fromEntries(pares);
console.log("Objeto construido:", inventario);
console.log("Claves resultantes:", Object.keys(inventario));
return inventario;`,
  },

  "object-assign": {
    titulo: "Fusiona configuraciones",
    descripcion:
      "Object.assign() copia propiedades de una o varias fuentes en un destino y devuelve ese mismo destino. La copia es superficial.",
    prueba:
      "Compara base y copia: son objetos distintos. Luego observa que assign devuelve exactamente el objeto destino.",
    codigo: `const base = {
  total: emojis.length,
  origen: "emojis",
};
const copia = Object.assign({}, base, {
  emojis: emojis.slice(),
  creado: fecha.toISOString(),
});
console.log("Base:", base);
console.log("Copia:", copia);
console.log("¿Misma referencia?", base === copia);

const destino = { nombre: "panel" };
const resultado = Object.assign(destino, {
  emojis: emojis.slice(),
});
console.log("¿assign muta el destino?", resultado === destino);
return copia;`,
  },

  "object-freeze": {
    titulo: "Congela el inventario",
    descripcion:
      "Object.freeze() impide añadir, borrar o reasignar propiedades. En modo estricto, cualquier intento lanza un TypeError.",
    prueba:
      "El código intenta modificar y borrar propiedades dentro de try/catch: verás los TypeError y el objeto intacto.",
    codigo: `const inventario = Object.freeze({
  total: emojis.length,
  emojis: emojis.slice(),
  creado: fecha.toISOString(),
});
console.log("Inventario congelado:", inventario);
console.log("¿Está congelado?", Object.isFrozen(inventario));

try {
  inventario.total = 999;
} catch (error) {
  console.log("No se pudo cambiar total:", error.name);
}

try {
  delete inventario.emojis;
} catch (error) {
  console.log("No se pudo borrar emojis:", error.name);
}

console.log("Estado final:", inventario);
return {
  congelado: Object.isFrozen(inventario),
  total: inventario.total,
};`,
  },

  "object-hasown": {
    titulo: "Distingue lo propio de lo heredado",
    descripcion:
      "Object.hasOwn() comprueba si una propiedad pertenece directamente al objeto, sin mirar su prototipo.",
    prueba:
      "toString existe en el objeto por herencia, pero hasOwn devuelve false. El operador in, en cambio, devuelve true.",
    codigo: `const inventario = {};
emojis.forEach((emoji, indice) => {
  inventario["emoji_" + (indice + 1)] = emoji;
});
const resultado = {
  propia: Object.hasOwn(inventario, "emoji_1"),
  inexistente: Object.hasOwn(inventario, "emoji_999"),
  heredada: Object.hasOwn(inventario, "toString"),
  disponiblePorHerencia: "toString" in inventario,
};
console.log("Claves propias:", Object.keys(inventario));
console.log("Resultados:", resultado);
return resultado;`,
  },

  "object-create": {
    titulo: "Crea fichas con un prototipo",
    descripcion:
      "Object.create() crea un objeto nuevo enlazado a un prototipo. Las propiedades y métodos del prototipo se comparten sin copiarse.",
    prueba:
      "La ficha solo tiene emoji, posición y total como propiedades propias; describir() y esUltimo viven en el prototipo.",
    codigo: `const prototipo = {
  describir() {
    return this.emoji + " · posición " + this.posicion + " de " + this.total;
  },
  get esUltimo() {
    return this.posicion === this.total;
  },
};

const ficha = Object.create(prototipo);
ficha.emoji = emojis[0];
ficha.posicion = 1;
ficha.total = emojis.length;

console.log("Ficha:", ficha);
console.log("Descripción:", ficha.describir());
console.log("¿Es el último?", ficha.esUltimo);
console.log("¿Comparte el prototipo?", Object.getPrototypeOf(ficha) === prototipo);

const diccionario = Object.create(null);
emojis.forEach((emoji, indice) => {
  diccionario["emoji_" + (indice + 1)] = emoji;
});
console.log("Diccionario sin prototipo:", diccionario);
console.log("Su prototipo es:", Object.getPrototypeOf(diccionario));
return ficha.describir();`,
  },
};

export const OBJECT_CATEGORIAS = {
  "object-keys": "array",
  "object-values": "array",
  "object-entries": "array",
  "object-fromentries": "array",
  "object-assign": "array",
  "object-freeze": "array",
  "object-hasown": "array",
  "object-create": "array",
};
