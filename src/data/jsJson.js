export const JS_JSON = {
  id: "json",
  label: "JSON",
  icon: "📦",
  titulo: "JSON en JavaScript",
  descripcion:
    "Serializa y deserializa datos para guardarlos en localStorage, enviarlos a una API o procesar respuestas JSON.",
  grupos: [
    {
      seccion: "Serialización y deserialización",
      metodos: [
        {
          id: "json-stringify",
          nombre: "JSON.stringify()",
          firma: "JSON.stringify(valor, replacer, espacio)",
          icon: "📤",
        },
        {
          id: "json-parse",
          nombre: "JSON.parse()",
          firma: "JSON.parse(textoJSON, reviver)",
          icon: "📥",
        },
      ],
    },
  ],
};

export const JS_JSON_DOCS = {
  "json-stringify": {
    id: "json-stringify",
    titulo: "JSON.stringify()",
    icon: "📤",
    categoria: "JSON",
    firma: "JSON.stringify(valor, replacer, espacio)",
    simulador: "json",

    definicion: [
      "Es un método estático del objeto global `JSON` que convierte un valor de JavaScript en una **cadena de texto** con formato JSON. 📦",
      "El resultado siempre es un `string` (salvo casos especiales en la raíz, como `undefined`).",
    ],

    queEs: [
      "Es la herramienta estándar para **serializar** datos: transformar objetos y arreglos en texto que pueda almacenarse o transmitirse. 🔄",
      "Forma parte del estándar ECMAScript y no necesita ninguna librería externa.",
    ],

    paraQueSirve: [
      "💾 Guardar objetos en `localStorage` o `sessionStorage`, que solo aceptan cadenas.",
      "🌐 Enviar datos a una API con `fetch()` usando `Content-Type: application/json`.",
      "📤 Exportar configuraciones o información a un archivo `.json`.",
      "📋 Compartir datos entre lenguajes y sistemas distintos.",
    ],

    comoFunciona: [
      "Recibe un valor de JavaScript (objeto, array, string, número, booleano o `null`).",
      "Recorre todas sus propiedades y convierte los tipos compatibles al formato JSON.",
      "Las funciones, los símbolos y las propiedades con `undefined` se **omiten**.",
      "Devuelve una cadena con el JSON resultante. Si el valor raíz no es serializable, devuelve `undefined`.",
      "El argumento `replacer` permite filtrar o transformar propiedades; `espacio` añade sangría para hacerlo legible.",
    ],

    sintaxis: [
      {
        code: `const json = JSON.stringify(valor);`,
      },
      {
        caption: "Versión completa con filtro y formato:",
        code: `const json = JSON.stringify(valor, replacer, espacio);

// replacer: array de claves o función
// espacio: número de espacios o string de sangría
JSON.stringify(persona, ["nombre", "edad"], 2);`,
      },
      {
        caption: "Guardar y recuperar de localStorage:",
        code: `localStorage.setItem("usuario", JSON.stringify(usuario));
const guardado = JSON.parse(localStorage.getItem("usuario"));`,
      },
    ],

    nota: "💡 `JSON.stringify()` no puede serializar referencias circulares: lanza un `TypeError`. Para copias profundas con ciclos, usa `structuredClone()`.",

    ejemplos: [
      {
        titulo: "1. 📦 Objeto simple",
        code: `const usuario = { nombre: "Ana", edad: 25 };
console.log(JSON.stringify(usuario));
// {"nombre":"Ana","edad":25}`,
      },
      {
        titulo: "2. 📚 Array",
        code: `const numeros = [10, 20, 30];
console.log(JSON.stringify(numeros));
// [10,20,30]`,
      },
      {
        titulo: "3. 🎨 Con formato legible",
        code: `const persona = { nombre: "Luis", edad: 30 };
console.log(JSON.stringify(persona, null, 4));
// {
//     "nombre": "Luis",
//     "edad": 30
// }`,
      },
      {
        titulo: "4. 🔍 Filtrar propiedades con replacer",
        code: `const usuario = { nombre: "Ana", edad: 25, password: "1234" };
const seguro = JSON.stringify(usuario, ["nombre", "edad"]);
console.log(seguro);
// {"nombre":"Ana","edad":25}`,
      },
      {
        titulo: "5. 💾 Guardar en localStorage",
        code: `const usuario = { nombre: "Carlos", edad: 18 };
localStorage.setItem("usuario", JSON.stringify(usuario));
console.log(localStorage.getItem("usuario"));
// {"nombre":"Carlos","edad":18}`,
      },
    ],

    errores: [
      "**Creer que devuelve un objeto:** devuelve un `string`. Comprobarlo con `typeof` ayuda: `typeof JSON.stringify({ a: 1 }) === \"string\"`.",
      "**Intentar serializar funciones:** se omiten silenciosamente. `JSON.stringify({ nombre: \"Ana\", saludar() {} })` devuelve `{\"nombre\":\"Ana\"}`.",
      "**Serializar `undefined` en la raíz:** `JSON.stringify(undefined)` devuelve `undefined`, no una cadena JSON.",
      "**Referencias circulares:** `persona.amigo = persona` provoca `TypeError: Converting circular structure to JSON`.",
      "**Olvidar `JSON.parse()` al leer:** `localStorage.getItem()` devuelve texto; si no lo parseas, trabajas con un string.",
    ],

    casos: [
      "💾 Persistir el estado de una aplicación o las preferencias del usuario.",
      "🌐 Enviar el cuerpo de un `POST` a una API REST.",
      "📊 Registrar objetos en logs o archivos de texto.",
      "🔐 Filtrar campos sensibles antes de guardar o enviar datos.",
    ],

    relacion: [
      "**`JSON.parse()`:** hace el proceso inverso, de string JSON a valor de JavaScript.",
      "**`localStorage`:** solo almacena texto, por eso se combina con `stringify` y `parse`.",
      "**`fetch()`:** se usa para construir el `body` de peticiones `POST` o `PUT`.",
      "**`structuredClone()`:** alternativa para copias profundas que sí admite `Date`, `Map`, `Set` y ciclos.",
      "**APIs REST:** el formato de intercambio más habitual es JSON.",
    ],

    analogia:
      "Imagina que tienes una maleta llena de objetos (un objeto de JavaScript). Para enviarla por correo necesitas empacarla en una caja con un formato estándar. 🧳 La maleta es el objeto, la caja etiquetada es la cadena JSON y `JSON.stringify()` es el proceso de empaquetar. Al llegar al destino, `JSON.parse()` abre la caja y recupera los objetos.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Siempre devuelve un string, excepto cuando el valor raíz es `undefined`.",
      "✅ Omite funciones, símbolos y propiedades con `undefined`.",
      "✅ No admite referencias circulares.",
      "💡 Regla: `stringify` = objeto → texto JSON; `parse` = texto JSON → objeto.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve JSON.stringify({ a: 1 })?",
        opciones: [
          "El objeto original",
          'La cadena \'{"a":1}\'',
          "El número 1",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué ocurre con las funciones al usar JSON.stringify()?",
        opciones: [
          "Se convierten en null",
          "Se omiten del resultado",
          "Lanzan un SyntaxError",
          "Se convierten en texto",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué provoca una referencia circular en JSON.stringify()?",
        opciones: [
          "Un TypeError",
          "Un SyntaxError",
          "Devuelve undefined",
          "La ignora",
        ],
        correcta: 0,
      },
      {
        id: 4,
        pregunta: "¿Para qué sirve el tercer parámetro de JSON.stringify()?",
        opciones: [
          "Para filtrar claves",
          "Para añadir sangría y hacer legible el JSON",
          "Para convertir a Base64",
          "Para ordenar el array",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué método revierte el proceso de JSON.stringify()?",
        opciones: ["JSON.decode()", "JSON.parse()", "JSON.toObject()", "atob()"],
        correcta: 1,
      },
    ],
  },

  "json-parse": {
    id: "json-parse",
    titulo: "JSON.parse()",
    icon: "📥",
    categoria: "JSON",
    firma: "JSON.parse(textoJSON, reviver)",
    simulador: "json",

    definicion: [
      "Es un método estático del objeto global `JSON` que convierte una **cadena con formato JSON** en un valor de JavaScript: objeto, array, número, booleano o `null`. 📥",
      "Es el proceso inverso de `JSON.stringify()`.",
    ],

    queEs: [
      "Es la herramienta estándar para **deserializar** datos JSON. 🔓",
      "Analiza el texto y reconstruye la estructura de datos que JavaScript puede manipular.",
    ],

    paraQueSirve: [
      "💾 Recuperar objetos guardados en `localStorage`.",
      "🌐 Leer la respuesta de una API con `response.json()` o `JSON.parse()`.",
      "📄 Procesar archivos `.json` y archivos de configuración.",
      "🔗 Decodificar datos que viajan como texto en una URL o en un mensaje.",
    ],

    comoFunciona: [
      "Recibe una cadena con formato JSON válido.",
      "Analiza el contenido y valida su sintaxis.",
      "Convierte el texto en un valor de JavaScript.",
      "Devuelve ese valor; si el texto no es JSON válido, lanza un `SyntaxError`.",
      "El argumento opcional `reviver` permite transformar cada clave y valor durante la conversión.",
    ],

    sintaxis: [
      {
        code: `const valor = JSON.parse(textoJSON);`,
      },
      {
        caption: "Con reviver para transformar valores:",
        code: `const persona = JSON.parse(textoJSON, (clave, valor) => {
  if (clave === "edad") return valor + 1;
  return valor;
});`,
      },
      {
        caption: "Lectura desde localStorage:",
        code: `const usuario = JSON.parse(localStorage.getItem("usuario"));
console.log(usuario.nombre);`,
      },
    ],

    nota: "💡 JSON exige comillas dobles en claves y strings. Las comillas simples, las comas finales y las claves sin comillas provocan `SyntaxError`.",

    ejemplos: [
      {
        titulo: "1. 📦 Convertir un objeto JSON",
        code: `const json = '{"nombre":"Ana","edad":25}';
const persona = JSON.parse(json);
console.log(persona.nombre); // Ana`,
      },
      {
        titulo: "2. 📚 Convertir un array",
        code: `const json = "[10,20,30]";
const numeros = JSON.parse(json);
console.log(numeros); // [10, 20, 30]`,
      },
      {
        titulo: "3. 💾 Leer desde localStorage",
        code: `const usuario = JSON.parse(localStorage.getItem("usuario"));
console.log(usuario.nombre);`,
      },
      {
        titulo: "4. 🔁 Usar reviver para transformar la edad",
        code: `const json = '{"nombre":"Luis","edad":30}';
const persona = JSON.parse(json, (clave, valor) => {
  if (clave === "edad") return valor + 1;
  return valor;
});
console.log(persona); // { nombre: "Luis", edad: 31 }`,
      },
    ],

    errores: [
      "**Pasar un objeto en lugar de un string:** `JSON.parse({ nombre: \"Ana\" })` lanza `SyntaxError`; primero hay que usar `JSON.stringify()`.",
      "**JSON mal formado:** `JSON.parse(\"{nombre:'Juan'}\")` falla porque las claves y los strings deben usar comillas dobles.",
      "**Comas sobrantes:** `JSON.parse('{\"nombre\":\"Juan\",}')` lanza `SyntaxError`.",
      "**Confundir objeto JavaScript con JSON:** `{ nombre: \"Juan\" }` es un objeto; `'{\"nombre\":\"Juan\"}'` es JSON.",
      "**No manejar errores:** al parsear datos externos conviene envolver la llamada en `try...catch`.",
    ],

    casos: [
      "🌐 Leer respuestas JSON de una API.",
      "💾 Recuperar el estado guardado en `localStorage`.",
      "📄 Cargar configuraciones o archivos de datos.",
      "🔗 Decodificar un payload JSON que llegó como texto.",
    ],

    relacion: [
      "**`JSON.stringify()`:** convierte un objeto de JavaScript en texto JSON.",
      "**`response.json()`:** atajo de `fetch` que internamente parsea el cuerpo JSON.",
      "**`localStorage`:** los datos se guardan como texto y se recuperan con `JSON.parse()`.",
      "**`reviver`:** permite transformar valores, por ejemplo convertir fechas en objetos `Date`.",
      "**`structuredClone()`:** no necesita serializar a texto y conserva más tipos de datos.",
    ],

    analogia:
      "Imagina que recibes una caja sellada con instrucciones y objetos perfectamente organizados. 📦 La caja es la cadena JSON, los objetos dentro son los datos de JavaScript y `JSON.parse()` es abrir la caja y sacar los objetos para utilizarlos. Antes de enviarla se usó `JSON.stringify()`; al recibirla se usa `JSON.parse()`.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Convierte una cadena JSON en un valor de JavaScript.",
      "✅ Es el proceso inverso de `JSON.stringify()`.",
      "✅ El texto debe ser JSON válido o lanzará `SyntaxError`.",
      "✅ Se usa constantemente con APIs, `fetch()` y `localStorage`.",
      "💡 Regla: `parse` = texto JSON → objeto; `stringify` = objeto → texto JSON.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué recibe JSON.parse() como primer argumento?",
        opciones: [
          "Un objeto JavaScript",
          "Una cadena con formato JSON",
          "Un array de promesas",
          "Una función",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué error lanza JSON.parse() con un JSON mal formado?",
        opciones: ["TypeError", "SyntaxError", "URIError", "AggregateError"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Cuál de estas cadenas es JSON válido?",
        opciones: [
          "{nombre:'Juan'}",
          '{"nombre":"Juan",}',
          '{"nombre":"Juan"}',
          "{nombre:\"Juan\"}",
        ],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Para qué sirve el parámetro reviver?",
        opciones: [
          "Para ordenar las claves",
          "Para transformar los valores durante el parseo",
          "Para validar la URL",
          "Para comprimir el JSON",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué método convierte un objeto en texto JSON?",
        opciones: [
          "JSON.parse()",
          "JSON.stringify()",
          "JSON.toText()",
          "encodeURIComponent()",
        ],
        correcta: 1,
      },
    ],
  },
};
