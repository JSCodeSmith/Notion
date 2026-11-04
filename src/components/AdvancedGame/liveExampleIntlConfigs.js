/* Ejemplos vivos para los apuntes de Intl.
   El sandbox inyecta `emojis`, `texto`, `numeros` y `fecha` sin declararlos.
   El código se ejecuta en un Web Worker: no hay DOM ni red. */

export const INTL_CONFIGS = {
  "intl-numberformat": {
    titulo: "Formatea números por locale",
    descripcion:
      "Intl.NumberFormat convierte un número en texto con los separadores y decimales del idioma indicado.",
    prueba:
      "Añade o quita números de la lista: cada uno se formatea con el mismo criterio, sin cambiar el valor original.",
    codigo: `const formato = new Intl.NumberFormat("es-ES");
const formateados = numeros.map((numero) => formato.format(numero));
console.log("Números originales:", numeros);
console.log("Formateados en es-ES:", formateados);
const compacto = new Intl.NumberFormat("es-ES", {
  notation: "compact",
  maximumFractionDigits: 1,
});
const resumen = numeros.map((numero) => compacto.format(numero));
console.log("Notación compacta:", resumen);
return {
  originales: numeros,
  formateados: formateados,
  compacto: resumen,
};`,
  },

  "intl-currency": {
    titulo: "Muestra importes con su moneda",
    descripcion:
      "La opción style currency añade el símbolo o el código ISO de la divisa y respeta sus decimales habituales.",
    prueba:
      "Cambia los números: el total y cada importe se recalculan, pero el formato de moneda se mantiene.",
    codigo: `const euros = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});
const dolares = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
const total = numeros.reduce(
  (suma, numero) => suma + (Number.isFinite(numero) ? numero : 0),
  0,
);
console.log("Total en euros:", euros.format(total));
console.log("Total en dólares:", dolares.format(total));
const detalle = numeros.map((numero) => euros.format(numero));
console.log("Detalle:", detalle);
return {
  total: total,
  euros: euros.format(total),
  dolares: dolares.format(total),
  detalle: detalle,
};`,
  },

  "intl-percent": {
    titulo: "Convierte proporciones en porcentajes",
    descripcion:
      "Con style percent, Intl.NumberFormat multiplica el valor por cien y añade el signo de porcentaje del locale.",
    prueba:
      "Prueba con números grandes y pequeños: el reparto muestra qué parte del total representa cada uno.",
    codigo: `const formato = new Intl.NumberFormat("es-ES", {
  style: "percent",
  maximumFractionDigits: 1,
});
const total = numeros.reduce(
  (suma, numero) => suma + (Number.isFinite(numero) ? numero : 0),
  0,
);
const primera = numeros.length && total !== 0 ? numeros[0] / total : 0;
console.log("Total de referencia:", total);
console.log("Primera proporción:", formato.format(primera));
const reparto = numeros.map((numero) =>
  formato.format(total !== 0 ? numero / total : 0),
);
console.log("Reparto:", reparto);
console.log("Mitad exacta:", formato.format(0.5));
return {
  total: total,
  primera: formato.format(primera),
  reparto: reparto,
};`,
  },

  "intl-datetimeformat": {
    titulo: "Presenta la fecha en varios idiomas",
    descripcion:
      "Intl.DateTimeFormat traduce y ordena los componentes de una fecha según el locale, sin construir el texto a mano.",
    prueba:
      "La fecha del constructor es la misma; compara cómo cambia el orden y los nombres de meses entre español e inglés.",
    codigo: `const espanol = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "full",
  timeStyle: "short",
});
const ingles = new Intl.DateTimeFormat("en-US", {
  dateStyle: "long",
  timeStyle: "short",
});
console.log("Fecha recibida:", fecha.toISOString());
console.log("En español:", espanol.format(fecha));
console.log("En inglés:", ingles.format(fecha));
const partes = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
}).formatToParts(fecha);
const resumen = partes.map((parte) => parte.type + "=" + parte.value).join(", ");
console.log("Partes:", resumen);
return {
  espanol: espanol.format(fecha),
  ingles: ingles.format(fecha),
  partes: partes.map((parte) => ({
    tipo: parte.type,
    valor: parte.value,
  })),
};`,
  },

  "intl-relativetimeformat": {
    titulo: "Expresa distancias de tiempo",
    descripcion:
      "Intl.RelativeTimeFormat redacta frases como «hace 3 días» o «dentro de 2 semanas» a partir de una cantidad y una unidad.",
    prueba:
      "Cambia el primer número: se usa como distancia en días, semanas, meses y años. El signo negativo indica pasado.",
    codigo: `const formato = new Intl.RelativeTimeFormat("es-ES", {
  numeric: "auto",
});
const valor = numeros.length ? Math.abs(Math.round(numeros[0])) : 1;
const cantidad = Math.max(1, valor);
const pasado = formato.format(-cantidad, "day");
const futuro = formato.format(cantidad, "day");
const semanas = formato.format(-cantidad, "week");
const meses = formato.format(cantidad, "month");
console.log("Cantidad base:", cantidad);
console.log("Pasado:", pasado);
console.log("Futuro:", futuro);
console.log("Semanas atrás:", semanas);
console.log("Meses adelante:", meses);
console.log("Ayer:", formato.format(-1, "day"));
return {
  cantidad: cantidad,
  pasado: pasado,
  futuro: futuro,
  semanas: semanas,
  meses: meses,
};`,
  },

  "intl-listformat": {
    titulo: "Une listas con conjunciones",
    descripcion:
      "Intl.ListFormat construye enumeraciones naturales: comas y «y» en español, con las variantes de cada idioma.",
    prueba:
      "Edita los emojis o el texto: la lista se reconstruye con las conjunciones correctas y sin duplicar separadores.",
    codigo: `const lista = new Intl.ListFormat("es-ES", {
  style: "long",
  type: "conjunction",
});
const alternativas = new Intl.ListFormat("es-ES", {
  style: "long",
  type: "disjunction",
});
const unidades = new Intl.ListFormat("es-ES", {
  style: "short",
  type: "unit",
});
const palabras = texto
  .split(/\\s+/)
  .filter((palabra) => palabra.length > 0)
  .slice(0, 4);
console.log("Emojis:", lista.format(emojis));
console.log("Alternativas:", alternativas.format(emojis));
console.log("Unidades:", unidades.format(emojis));
console.log("Palabras del texto:", lista.format(palabras));
return {
  emojis: lista.format(emojis),
  alternativas: alternativas.format(emojis),
  unidades: unidades.format(emojis),
  palabras: lista.format(palabras),
};`,
  },

  "intl-collator": {
    titulo: "Ordena con el alfabeto correcto",
    descripcion:
      "Intl.Collator compara cadenas según las reglas del idioma y entiende acentos, mayúsculas y números.",
    prueba:
      "Añade emojis y cambia los números: la ordenación natural coloca «versión 2» antes que «versión 10».",
    codigo: `const collator = new Intl.Collator("es-ES", { sensitivity: "base" });
const palabras = ["árbol", "Zebra", "ábaco", "Banana", "éxito", "Casa"];
const ordenadas = palabras.slice().sort(collator.compare);
console.log("Orden español:", ordenadas);
const numerico = new Intl.Collator("es-ES", { numeric: true });
const versiones = ["versión 10", "versión 2", "versión 1"];
const naturales = versiones.slice().sort(numerico.compare);
console.log("Orden natural:", naturales);
const ingles = new Intl.Collator("en-US", { sensitivity: "base" });
console.log("Mismo par en inglés:", ingles.compare("árbol", "arbol"));
const emojisOrdenados = emojis.slice().sort(collator.compare);
console.log("Emojis ordenados:", emojisOrdenados);
return {
  ordenadas: ordenadas,
  naturales: naturales,
  equivalencia: collator.compare("árbol", "arbol"),
  emojis: emojisOrdenados,
};`,
  },

  "intl-pluralrules": {
    titulo: "Elige singular o plural",
    descripcion:
      "Intl.PluralRules clasifica una cantidad en una categoría gramatical para que elijas la forma correcta del texto.",
    prueba:
      "Cambia los números: verás cuándo la categoría es one y cuándo pasa a other en español.",
    codigo: `const reglas = new Intl.PluralRules("es-ES");
const formas = { one: "elemento", other: "elementos" };
const cantidades = numeros.length
  ? numeros.slice(0, 5).map((numero) => Math.abs(Math.round(numero)))
  : [0, 1, 2, 5];
const categorias = cantidades.map((cantidad) => reglas.select(cantidad));
const mensajes = cantidades.map(
  (cantidad) => cantidad + " " + formas[reglas.select(cantidad)],
);
console.log("Cantidades:", cantidades);
console.log("Categorías:", categorias);
console.log("Mensajes:", mensajes);
const ingles = new Intl.PluralRules("en-US");
console.log("Categorías en inglés:", cantidades.map((cantidad) => ingles.select(cantidad)));
return {
  cantidades: cantidades,
  categorias: categorias,
  mensajes: mensajes,
};`,
  },
};

export const INTL_CATEGORIAS = {
  "intl-numberformat": "numero",
  "intl-currency": "numero",
  "intl-percent": "numero",
  "intl-datetimeformat": "fecha",
  "intl-relativetimeformat": "fecha",
  "intl-listformat": "array",
  "intl-collator": "array",
  "intl-pluralrules": "numero",
};
