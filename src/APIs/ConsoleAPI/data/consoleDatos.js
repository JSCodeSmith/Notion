export const CONSOLE_TABLE = {
  id: "console-table",
  titulo: "console.table()",
  icon: "📊",
  categoria: "Console API",
  firma: "console.table(valor [, columnas])",
  simulador: "table",

  definicion: [
    "Es un método del objeto `console` que muestra datos en forma de **tabla** dentro de la consola del navegador o entorno de ejecución. 📊",
    "Es especialmente útil para visualizar arrays y objetos de una manera organizada. 🗂️",
  ],

  queEs: [
    "Es un método de la **Console API**, parte de las Web APIs proporcionadas por los navegadores. 🌐",
    "Permite representar datos estructurados en filas y columnas. 📋",
    "Acepta principalmente arrays, objetos y arrays de objetos. 🧩",
  ],

  paraQueSirve: [
    "🔍 **Inspeccionar arrays rápidamente.**",
    "🧱 **Visualizar objetos complejos.**",
    "🐞 **Depurar código (debugging).**",
    "⚖️ **Comparar datos y analizar respuestas de APIs.**",
    "🧪 **Revisar estructuras de datos.**",
  ],

  comoFunciona: [
    "Recibe un valor como argumento. ⚙️",
    "Analiza si el dato puede representarse como tabla. 🔎",
    "Crea columnas y filas automáticamente a partir de las propiedades. 🧱",
    "Muestra la información en la consola del navegador. 🖥️",
  ],

  sintaxis: [
    {
      code: `console.table(valor);`,
    },
    {
      caption: "También puedes limitar las columnas que quieres mostrar:",
      code: `console.table(productos, ["nombre", "precio"]);`,
    },
  ],

  nota: "💡 **Tip Pro:** `console.table()` solo imprime información. No modifica los datos y devuelve `undefined`; no lo uses esperando un valor de retorno.",

  ejemplos: [
    {
      titulo: "1. 🍎 Mostrar un array",
      code: `const frutas = ["Manzana", "Pera", "Uva"];
console.table(frutas);

// Resultado:
// (Índice) | Valor
// 0        | Manzana
// 1        | Pera
// 2        | Uva`,
    },
    {
      titulo: "2. 👤 Mostrar un objeto",
      code: `const usuario = {
  nombre: "Josué",
  edad: 17,
  lenguaje: "JavaScript"
};

console.table(usuario);

// (Índice)  | Valor
// nombre    | Josué
// edad      | 17
// lenguaje  | JavaScript`,
    },
    {
      titulo: "3. 👥 Array de objetos (el caso más usado)",
      code: `const usuarios = [
  { id: 1, nombre: "Ana", edad: 20 },
  { id: 2, nombre: "Luis", edad: 25 }
];

console.table(usuarios);

// (Índice) | id | nombre | edad
// 0        | 1  | Ana    | 20
// 1        | 2  | Luis   | 25`,
    },
    {
      titulo: "4. 🎯 Mostrar columnas específicas",
      code: `const productos = [
  { nombre: "Laptop", precio: 2500, stock: 5 },
  { nombre: "Mouse", precio: 50, stock: 20 }
];

console.table(productos, ["nombre", "precio"]);`,
    },
  ],

  errores: [
    "🧠 **Pensar que modifica los datos:** `console.table()` solo muestra información; no altera el array ni el objeto.",
    "↩️ **Esperar un valor de retorno:** devuelve `undefined` porque solo imprime en consola.",
    "📏 **Esperar una tabla perfecta con cualquier dato:** un string como `console.table(\"Hola\")` puede mostrarse como un valor simple.",
    "🖨️ **Confundirlo con `console.log()`:** `log` muestra el objeto completo; `table` lo organiza en filas y columnas.",
  ],

  casos: [
    "👨‍💻 **Depuración de aplicaciones.**",
    "🔍 **Revisar datos obtenidos de una API:** `fetch(\"/usuarios\").then(r => r.json()).then(data => console.table(data))`.",
    "📊 **Analizar arrays de objetos.**",
    "🧪 **Probar estructuras de datos y encontrar errores rápidamente.**",
  ],

  relacion: [
    "🖨️ **`console.log()`:** mostrar información general.",
    "❌ **`console.error()`:** mostrar errores.",
    "⚠️ **`console.warn()`:** mostrar advertencias.",
    "⏱️ **`console.time()` / `console.timeEnd()`:** medir rendimiento.",
    "🧩 **Arrays y objetos:** estructuras que `console.table()` representa mejor.",
  ],

  analogia:
    "Imagina que tienes una lista de estudiantes escrita en hojas sueltas: `{nombre:\"Ana\", edad:20, curso:\"JS\"}`, `{nombre:\"Luis\", edad:22, curso:\"Python\"}`. 📄 `console.table()` es convertir esas hojas desordenadas en una hoja de Excel con columnas de Nombre, Edad y Curso. Todo se ve de un vistazo. 📊",

  fuente: "📚 MDN Web Docs — console.table() · WHATWG Console Standard",

  notasPersonales: [
    "💡 **Tip Pro:** usa el segundo argumento para mostrar solo las columnas relevantes.",
    "↩️ **Recuerda:** devuelve `undefined` y no modifica los datos.",
    "📊 **Ideal para:** arrays de objetos y respuestas de APIs.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Qué estructura representa mejor console.table()?",
      opciones: [
        "Un array de objetos",
        "Una función",
        "Una promesa",
        "Un string suelto",
      ],
      correcta: 0,
    },
    {
      id: 2,
      pregunta: "¿Qué devuelve console.table()?",
      opciones: ["La tabla", "El array modificado", "undefined", "true"],
      correcta: 2,
    },
    {
      id: 3,
      pregunta: "¿Cómo se muestran solo algunas columnas?",
      opciones: [
        "console.table(datos, [\"nombre\", \"precio\"])",
        "console.table(datos).only(\"nombre\")",
        "console.columns(datos)",
        "console.table(datos, \"nombre\")",
      ],
      correcta: 0,
    },
  ],
};

export const CONSOLE_DIRXML = {
  id: "console-dirxml",
  titulo: "console.dirxml()",
  icon: "🌳",
  categoria: "Console API",
  firma: "console.dirxml(object)",
  simulador: "dirxml",

  definicion: [
    "Es una función incorporada en JavaScript que muestra una **representación interactiva en formato de árbol XML o HTML** de un elemento u objeto, siempre que sea posible. 🌳",
    "Está diseñada para analizar la estructura de etiquetas del DOM o fragmentos XML. 🏗️",
  ],

  queEs: [
    "Es un método de inspección visual del objeto global `console`. 🌐",
    "Permite navegar por nodos, atributos y elementos hijos como en la pestaña **Elements** del navegador. 🧭",
    "Si recibe un objeto común, se comporta como `console.log()` o `console.dir()`. 🔄",
  ],

  paraQueSirve: [
    "🏗️ **Inspeccionar el DOM:** visualizar un nodo HTML completo con clases, selectores y jerarquías.",
    "📄 **Depurar XML:** analizar cadenas o respuestas XML de forma gráfica.",
    "🔎 **Diferenciar objetos de elementos:** asegurar que el navegador renderice un árbol de etiquetas en lugar de un objeto plano.",
  ],

  comoFunciona: [
    "El navegador detecta si el parámetro tiene una estructura de nodos de marcado válida. ⚙️",
    "Si es así, pinta un árbol jerárquico expandible que imita al inspector de código. 🌳",
    "Puedes hacer clic en los triángulos para desplegar etiquetas hijas. 🔽",
    "Si le pasas un objeto común, muestra sus propiedades como un log o dir normal. 🧱",
  ],

  sintaxis: [
    {
      code: `console.dirxml(object);`,
    },
    {
      caption: "El objeto puede ser un elemento del DOM, un documento XML o un objeto JS:",
      code: `const miBoton = document.querySelector(".btn-guardar");
console.dirxml(miBoton);`,
    },
  ],

  nota: "💡 **Tip Pro:** si un elemento HTML se imprime como objeto plano por culpa de una librería que mutó el prototipo, envuélvelo con `console.dirxml(el)`. Forzará al inspector a mostrar el árbol de etiquetas puro.",

  ejemplos: [
    {
      titulo: "1. 🔘 Inspeccionar un contenedor HTML",
      code: `const miBoton = document.querySelector(".btn-guardar");
console.dirxml(miBoton);

/* Salida visual (expandible):
▼ <button class="btn-guardar" id="save-id" disabled>
    <span>Guardar Cambios</span>
  </button>
*/`,
    },
    {
      titulo: "2. 🧱 Diferencia de comportamiento en objetos comunes",
      code: `const usuario = { nombre: "Satoshi", id: 21 };
console.dirxml(usuario);

// Al no ser HTML, se comporta como un log/dir normal:
// Salida: { nombre: 'Satoshi', id: 21 }`,
    },
    {
      titulo: "3. 🧭 Comparación con console.dir()",
      code: `const boton = document.querySelector("button");

console.dirxml(boton); // 🌳 Muestra el árbol HTML
console.dir(boton);    // 🧱 Muestra el objeto JS y sus propiedades`,
    },
  ],

  errores: [
    "👀 **No ver diferencias con `console.log()`:** en navegadores modernos `log` ya muestra árboles HTML, pero `dirxml` lo fuerza explícitamente.",
    "🖥️ **Usarlo en Node.js:** no existe el DOM nativo; se comporta como un `console.log()` plano en la terminal.",
    "🧱 **Esperar un árbol con objetos comunes:** si el valor no es HTML/XML, se muestra como objeto normal.",
  ],

  casos: [
    "🧱 **Vanilla JS y manipulación del DOM:** auditar bloques HTML inyectados con `innerHTML`.",
    "📄 **Respuestas SOAP o XML:** inspeccionar el árbol de un documento XML recibido de una API antigua.",
  ],

  relacion: [
    "🧱 **`console.dir()`:** fuerza la vista de objeto JavaScript con todas sus propiedades internas.",
    "🌳 **DOM (Document Object Model):** estructura que representa las etiquetas HTML en memoria.",
    "🖨️ **`console.log()`:** muestra información general; `dirxml` fuerza el árbol de etiquetas.",
  ],

  analogia:
    "Imagínate que vas a comprar una tienda de campaña. ⛺ `console.log()` es una foto genérica de la caja; `console.dir()` es abrir el instructivo técnico para ver materiales, peso y estacas; `console.dirxml()` es ver la tienda completamente armada en la exhibición: estructura espacial, cierres, ventanas y cómo se conecta el techo con las paredes. 👀",

  fuente: "📚 MDN Web Docs — console.dirxml()",

  notasPersonales: [
    "💡 **Tip Pro:** úsalo para forzar la vista de árbol cuando `console.log()` muestra un objeto plano.",
    "🖥️ **En Node.js:** degrada a un log normal.",
    "🧱 **Combínalo con `console.dir()`** para comparar árbol HTML vs objeto JS.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Qué formato fuerza console.dirxml()?",
      opciones: [
        "Tabla",
        "Árbol XML/HTML",
        "Gráfico",
        "Texto plano",
      ],
      correcta: 1,
    },
    {
      id: 2,
      pregunta: "¿Qué pasa si le pasas un objeto JavaScript común?",
      opciones: [
        "Lanza un error",
        "Se comporta como console.log()/dir()",
        "Borra la consola",
        "Crea una tabla",
      ],
      correcta: 1,
    },
    {
      id: 3,
      pregunta: "¿Qué método muestra el objeto JS con sus propiedades internas?",
      opciones: ["console.dir()", "console.table()", "console.trace()", "console.clear()"],
      correcta: 0,
    },
  ],
};
