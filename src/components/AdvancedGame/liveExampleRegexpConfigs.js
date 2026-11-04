/* Ejemplos vivos para los métodos de expresiones regulares.
   Se ejecutan en un Worker con `emojis`, `texto` y `numeros` inyectados.
   `texto` es la unión de `emojis` con espacios. */

export const REGEXP_CONFIGS = {
  "regexp-test-method": {
    titulo: "Comprueba si el patrón aparece",
    descripcion:
      "test() recorre el texto y devuelve true o false según si encuentra el patrón. Es la validación más rápida.",
    prueba:
      "Añade o quita emojis y observa cómo cambian los booleanos y la longitud del texto.",
    codigo: `const empiezaSinEspacio = /^\\S/.test(texto);
const terminaSinEspacio = /\\S$/.test(texto);
console.log("¿Empieza sin espacio?", empiezaSinEspacio);
console.log("¿Termina sin espacio?", terminaSinEspacio);

const primero = emojis[0] ?? "";
const patronInicio = new RegExp("^" + primero);
console.log("¿Empieza por el primer emoji?", patronInicio.test(texto));
console.log("Longitud del texto:", texto.length);

return empiezaSinEspacio && terminaSinEspacio;`,
  },

  "regexp-exec": {
    titulo: "Extrae cada coincidencia con su posición",
    descripcion:
      "exec() devuelve un array con el texto encontrado, su índice y sus grupos. Con la bandera g recorre todas las apariciones.",
    prueba:
      "Duplica un emoji en el constructor y comprueba que exec() encuentra las dos apariciones.",
    codigo: `const patron = /\\S+/g;
const encontrados = [];
let resultado;

while ((resultado = patron.exec(texto)) !== null) {
  encontrados.push({ emoji: resultado[0], indice: resultado.index });
}

console.log("Coincidencias encontradas:", encontrados.length);
console.log("Primera:", encontrados[0]);
console.log("Última:", encontrados[encontrados.length - 1]);

return encontrados.length;`,
  },

  "regexp-string-match": {
    titulo: "Recoge todas las coincidencias",
    descripcion:
      "match() devuelve la primera coincidencia o, con la bandera g, un array con todos los fragmentos encontrados.",
    prueba:
      "Cambia el separador de los emojis para ver cómo afecta al número de coincidencias.",
    codigo: `const todas = texto.match(/\\S+/g);
console.log("Todas las palabras:", todas);

const primera = texto.match(/^\\S+/);
console.log("Primera coincidencia:", primera ? primera[0] : "ninguna");
console.log("Índice de la primera:", primera ? primera.index : -1);
console.log("Cantidad total:", todas ? todas.length : 0);

return todas ? todas.length : 0;`,
  },

  "regexp-string-matchall": {
    titulo: "Itera todas las coincidencias con detalles",
    descripcion:
      "matchAll() devuelve un iterador con cada coincidencia, incluyendo índice y grupos de captura. Exige la bandera g.",
    prueba:
      "Añade emojis repetidos y observa que el iterador conserva la posición de cada uno.",
    codigo: `const iterador = texto.matchAll(/(\\S+)/g);
const coincidencias = [];

for (const resultado of iterador) {
  coincidencias.push({ emoji: resultado[0], indice: resultado.index });
  console.log("Coincidencia:", resultado[0], "en", resultado.index);
}

console.log("Total de coincidencias:", coincidencias.length);
return coincidencias;`,
  },

  "regexp-string-replace": {
    titulo: "Sustituye la primera coincidencia",
    descripcion:
      "replace() devuelve un texto nuevo con la primera coincidencia cambiada. Con la bandera g alcanza todas.",
    prueba:
      "Quita la bandera g del segundo reemplazo y comprueba que solo se transforma el primer emoji.",
    codigo: `console.log("Original:", texto);

const primero = texto.replace(/\\s/, " · ");
console.log("Solo el primer espacio:", primero);

const marcado = texto.replace(/\\S+/g, (emoji) => "[" + emoji + "]");
console.log("Cada emoji marcado:", marcado);

const sinEspacios = texto.replace(/\\s+/g, "");
console.log("Sin espacios:", sinEspacios);

return primero;`,
  },

  "regexp-string-replaceall": {
    titulo: "Sustituye todas las coincidencias",
    descripcion:
      "replaceAll() cambia todas las apariciones del patrón. Si recibe una expresión regular, debe incluir la bandera g.",
    prueba:
      "Añade más emojis al constructor y observa que todos los separadores se sustituyen a la vez.",
    codigo: `const separado = texto.replaceAll(/\\s+/g, " | ");
console.log("Separado:", separado);

const doble = texto.replaceAll(/(\\S+)/g, "$1$1");
console.log("Duplicado:", doble);

const limpio = texto.replaceAll(/\\s+/g, " ").trim();
console.log("Limpio:", limpio);

return separado;`,
  },

  "regexp-string-split": {
    titulo: "Divide el texto en partes",
    descripcion:
      "split() corta el texto usando el patrón como separador. Los grupos de captura añaden el separador al resultado.",
    prueba:
      "Edita los emojis para comprobar cómo cambia el número de partes y qué ocurre con el límite.",
    codigo: `const partes = texto.split(/\\s+/);
console.log("Partes:", partes);

const conSeparadores = texto.split(/(\\s+)/);
console.log("Con separadores:", conSeparadores);

const dos = texto.split(/\\s+/, 2);
console.log("Solo dos partes:", dos);
console.log("Total de partes:", partes.length);

return partes;`,
  },

  "regexp-string-search": {
    titulo: "Localiza la primera coincidencia",
    descripcion:
      "search() devuelve el índice donde empieza la primera coincidencia, o -1 si el patrón no aparece.",
    prueba:
      "Cambia los emojis o añade dígitos al texto para ver cómo se mueve el índice encontrado.",
    codigo: `const espacio = texto.search(/\\s/);
console.log("Primer espacio en:", espacio);

const primerEmoji = emojis[0] ?? "";
const posicion = primerEmoji ? texto.search(new RegExp(primerEmoji)) : -1;
console.log("Primer emoji en:", posicion);

const digito = texto.search(/\\d/);
console.log("Primer dígito en:", digito);

if (espacio === -1) {
  console.log("No hay espacios: el texto es una sola palabra");
}

return espacio;`,
  },
};

export const REGEXP_CATEGORIAS = {
  "regexp-test-method": "texto",
  "regexp-exec": "texto",
  "regexp-string-match": "texto",
  "regexp-string-matchall": "texto",
  "regexp-string-replace": "texto",
  "regexp-string-replaceall": "texto",
  "regexp-string-split": "texto",
  "regexp-string-search": "texto",
};
