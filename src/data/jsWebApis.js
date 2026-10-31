export const JS_WEBAPIS = {
  id: "webapis",
  label: "Web APIs",
  icon: "🌐",
  titulo: "Web APIs del navegador",
  descripcion:
    "Peticiones HTTP, clones profundos, expresiones regulares, archivos y codificación de texto para trabajar en el navegador.",
  grupos: [
    {
      seccion: "Red",
      metodos: [
        {
          id: "fetch",
          nombre: "fetch()",
          firma: "fetch(url, opciones) → Promise<Response>",
          icon: "📡",
        },
      ],
    },
    {
      seccion: "Clonación y validación",
      metodos: [
        {
          id: "structuredclone",
          nombre: "structuredClone()",
          firma: "structuredClone(valor, opciones)",
          icon: "🧬",
        },
        {
          id: "regexp-test",
          nombre: "RegExp.prototype.test()",
          firma: "regex.test(cadena)",
          icon: "🔍",
        },
      ],
    },
    {
      seccion: "Archivos y URLs",
      metodos: [
        {
          id: "url-createobjecturl",
          nombre: "URL.createObjectURL()",
          firma: "URL.createObjectURL(blob | file)",
          icon: "🔗",
        },
        {
          id: "url-revokeobjecturl",
          nombre: "URL.revokeObjectURL()",
          firma: "URL.revokeObjectURL(objectURL)",
          icon: "🗑️",
        },
      ],
    },
    {
      seccion: "Codificación",
      metodos: [
        {
          id: "btoa",
          nombre: "btoa()",
          firma: "btoa(stringToEncode)",
          icon: "🔐",
        },
        {
          id: "atob",
          nombre: "atob()",
          firma: "atob(cadenaBase64)",
          icon: "🔓",
        },
        {
          id: "encodeuricomponent",
          nombre: "encodeURIComponent()",
          firma: "encodeURIComponent(string)",
          icon: "🔗",
        },
        {
          id: "decodeuricomponent",
          nombre: "decodeURIComponent()",
          firma: "decodeURIComponent(encodedString)",
          icon: "🔁",
        },
      ],
    },
  ],
};

export const JS_WEBAPIS_DOCS = {
  fetch: {
    id: "fetch",
    titulo: "fetch()",
    icon: "📡",
    categoria: "Web APIs · Red",
    firma: "fetch(url, opciones) → Promise<Response>",
    simulador: "webapi",

    definicion: [
      "Es una función global que permite realizar **peticiones HTTP asíncronas** y devuelve una promesa que se resuelve con un objeto `Response`. 📡",
      "Es la forma moderna de hacer peticiones de red en el navegador y en Node.js desde la versión 18.",
    ],

    queEs: [
      "Reemplaza al antiguo `XMLHttpRequest` con una API basada en promesas. 🌐",
      "Forma parte del estándar Fetch y es la base sobre la que se construyen librerías como Axios.",
    ],

    paraQueSirve: [
      "🌐 Consumir APIs REST con `GET`, `POST`, `PUT`, `PATCH` o `DELETE`.",
      "📦 Enviar y recibir JSON.",
      "📤 Subir archivos con `FormData`.",
      "🖼️ Descargar imágenes o recursos binarios.",
      "🔐 Enviar cabeceras y tokens de autenticación.",
      "⚡ Lanzar peticiones concurrentes con `Promise.all()`.",
    ],

    comoFunciona: [
      "Recibe una URL y, opcionalmente, un objeto de opciones.",
      "Devuelve inmediatamente una `Promise<Response>`.",
      "La promesa se resuelve cuando llegan las **cabeceras**, no el cuerpo completo.",
      "No se rechaza por errores HTTP como 404 o 500: hay que revisar `response.ok`.",
      "Solo se rechaza por errores de red (sin conexión, DNS, CORS).",
      "Para leer el cuerpo se usa `response.json()`, `.text()`, `.blob()` o `.arrayBuffer()`, que devuelven otra promesa.",
    ],

    sintaxis: [
      {
        code: `fetch(url, opciones)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));`,
      },
      {
        caption: "Con async/await y verificación de estado:",
        code: `async function pedir(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error("HTTP " + res.status);
  }
  return res.json();
}`,
      },
      {
        caption: "POST con JSON:",
        code: `const res = await fetch("/api/usuarios", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ nombre: "Ana", edad: 30 }),
});`,
      },
    ],

    nota: "💡 `fetch()` usa dos promesas: la primera cuando llegan las cabeceras y la segunda cuando se lee el cuerpo con `.json()` o `.text()`.",

    ejemplos: [
      {
        titulo: "1. 🌐 GET básico",
        code: `fetch("https://api.github.com/users/torvalds")
  .then((res) => res.json())
  .then((data) => console.log(data.name))
  .catch((err) => console.error(err));`,
      },
      {
        titulo: "2. 🛡️ Verificar errores HTTP",
        code: `async function obtenerUsuario() {
  const res = await fetch("/api/usuario");
  if (!res.ok) {
    throw new Error("HTTP " + res.status);
  }
  return res.json();
}`,
      },
      {
        titulo: "3. 📤 POST con JSON",
        code: `const nuevo = { nombre: "Ana", edad: 30 };

const res = await fetch("/api/usuarios", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(nuevo),
});

const data = await res.json();`,
      },
      {
        titulo: "4. 🛑 Cancelar con AbortController",
        code: `const controller = new AbortController();

fetch("/api/lento", { signal: controller.signal })
  .catch((err) => {
    if (err.name === "AbortError") console.log("Cancelado");
  });

setTimeout(() => controller.abort(), 2000);`,
      },
      {
        titulo: "5. ⚡ Peticiones concurrentes",
        code: `const [usuarios, posts] = await Promise.all([
  fetch("/api/usuarios").then((r) => r.json()),
  fetch("/api/posts").then((r) => r.json()),
]);`,
      },
    ],

    errores: [
      "**Creer que rechaza en 404/500:** no lo hace; revisa `response.ok` o `response.status`.",
      "**Olvidar `await res.json()`:** obtienes una promesa, no los datos.",
      "**Poner `Content-Type` con `FormData`:** rompe el boundary; deja que el navegador lo configure.",
      "**No usar `JSON.stringify()` en el body:** el objeto se convierte en `[object Object]`.",
      "**Leer el body dos veces:** produce `TypeError: Body already read`; usa `res.clone()`.",
      "**No cancelar peticiones al desmontar:** puede provocar fugas; usa `AbortController`.",
    ],

    casos: [
      "📝 Formularios con envío asíncrono.",
      "🔐 Login y registro con JWT o cookies.",
      "📤 Subida de archivos e imágenes.",
      "📊 Paneles con datos en tiempo real.",
      "🖼️ Galerías con carga progresiva.",
      "🤖 Integración con APIs de IA.",
    ],

    relacion: [
      "**`Promise`:** `fetch()` devuelve una promesa.",
      "**`async/await`:** sintaxis más limpia para consumirla.",
      "**`Response`:** objeto que representa la respuesta HTTP.",
      "**`JSON.stringify()` / `JSON.parse()`:** serializan el body enviado y leído.",
      "**`AbortController`:** permite cancelar peticiones.",
      "**`URL.createObjectURL()`:** se usa para mostrar blobs descargados.",
      "**CORS:** política del navegador que puede bloquear peticiones.",
    ],

    analogia:
      "Imagina que `fetch()` es un mensajero 📬. Le das la dirección (URL) y las instrucciones (método, cabeceras, body). Te entrega un recibo inmediatamente (la promesa). Cuando llega a la puerta te avisa que llegó (cabeceras) y obtienes el `Response`. Pero el paquete no está abierto: debes abrirlo con `.json()` o `.text()`. Si el paquete viene roto (404, 500), el mensajero no te avisa del error: tú debes revisar `res.ok`. Solo te avisa si no pudo llegar (sin internet, DNS, CORS).",

    fuente: "MDN Web Docs · WHATWG Fetch Standard",

    notasPersonales: [
      "✅ Devuelve una promesa con un objeto `Response`.",
      "✅ No rechaza por códigos HTTP de error.",
      "✅ El cuerpo se lee con `.json()`, `.text()`, `.blob()`...",
      "✅ Usa `AbortController` para cancelar.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Con qué se resuelve la promesa de fetch()?",
        opciones: [
          "Con un objeto Response",
          "Con los datos JSON directamente",
          "Con un string",
          "Con undefined",
        ],
        correcta: 0,
      },
      {
        id: 2,
        pregunta: "¿fetch() se rechaza ante un 404?",
        opciones: [
          "Sí, siempre",
          "No, solo en errores de red",
          "Solo con POST",
          "Solo en Node.js",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué propiedad indica si la respuesta fue exitosa?",
        opciones: ["res.status === 200", "res.ok", "res.success", "res.valid"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué método lee el cuerpo como objeto JavaScript?",
        opciones: ["res.text()", "res.json()", "res.blob()", "res.body()"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué clase permite cancelar una petición fetch?",
        opciones: ["AbortController", "CancelToken", "Promise.race", "XMLHttpRequest"],
        correcta: 0,
      },
    ],
  },

  structuredclone: {
    id: "structuredclone",
    titulo: "structuredClone()",
    icon: "🧬",
    categoria: "Web APIs · Clonación",
    firma: "structuredClone(valor, opciones)",
    simulador: "webapi",

    definicion: [
      "Es una función global que crea una **copia profunda** de un valor usando el algoritmo de clonación estructurada del estándar HTML. 🧬",
      "Está disponible en navegadores modernos desde 2022 y en Node.js desde la versión 17.",
    ],

    queEs: [
      "Permite clonar objetos complejos sin librerías externas como `lodash.cloneDeep` ni trucos como `JSON.parse(JSON.stringify())`. 📦",
      "Usa el mismo algoritmo que `postMessage`, `IndexedDB` o `history.pushState`.",
    ],

    paraQueSirve: [
      "🧊 Hacer copias profundas de objetos y arrays.",
      "🗂️ Clonar estructuras complejas: `Map`, `Set`, `Date`, `RegExp`, `ArrayBuffer`, `Blob`...",
      "🚫 Evitar mutaciones accidentales al compartir referencias.",
      "🧵 Transferir datos entre hilos o contextos.",
      "↩️ Implementar undo/redo con copias inmutables.",
    ],

    comoFunciona: [
      "Recibe un valor a clonar.",
      "Recorre recursivamente toda su estructura.",
      "Crea nuevas referencias para cada objeto, array, mapa, etc.",
      "Preserva correctamente las referencias circulares.",
      "El segundo argumento `options.transfer` permite transferir recursos en lugar de copiarlos.",
    ],

    sintaxis: [
      {
        code: `const copia = structuredClone(valor);`,
      },
      {
        caption: "Transferir un ArrayBuffer:",
        code: `const copia = structuredClone(buffer, {
  transfer: [buffer],
});`,
      },
    ],

    nota: "💡 `structuredClone()` no puede clonar funciones, símbolos, nodos del DOM, promesas ni `WeakMap`/`WeakSet`: lanza `DataCloneError`.",

    ejemplos: [
      {
        titulo: "1. 🧊 Copia profunda básica",
        code: `const original = { a: 1, b: { c: 2 } };
const copia = structuredClone(original);

copia.b.c = 99;
console.log(original.b.c); // 2 ✅`,
      },
      {
        titulo: "2. 🗂️ Con Map, Set y Date",
        code: `const original = {
  fecha: new Date(),
  mapa: new Map([["a", 1]]),
  set: new Set([1, 2, 3]),
};

const copia = structuredClone(original);
console.log(copia.mapa instanceof Map);  // true
console.log(copia.fecha instanceof Date); // true`,
      },
      {
        titulo: "3. 🔄 Referencias circulares",
        code: `const obj = { nombre: "Ana" };
obj.self = obj;

const copia = structuredClone(obj);
console.log(copia.self === copia); // true`,
      },
      {
        titulo: "4. 📦 Transferencia de ArrayBuffer",
        code: `const buffer = new ArrayBuffer(16);
const copia = structuredClone(buffer, { transfer: [buffer] });

console.log(buffer.byteLength); // 0 (fue transferido)
console.log(copia.byteLength);  // 16`,
      },
    ],

    errores: [
      "**Clonar funciones:** lanza `DataCloneError`.",
      "**Clonar clases personalizadas:** pierde el prototipo y devuelve un objeto plano.",
      "**Clonar nodos del DOM o símbolos:** no está soportado.",
      "**Esperar que copie getters/setters:** los evalúa y copia el valor resultante.",
      "**Confundirlo con `JSON.parse(JSON.stringify())`:** esa alternativa pierde `Date`, `Map`, `undefined`, etc.",
      "**Usarlo en navegadores antiguos:** no está disponible antes de 2022.",
    ],

    casos: [
      "🧊 Clonar el estado de Redux o Vuex para snapshots.",
      "🧵 Enviar datos complejos a Web Workers.",
      "↩️ Implementar undo/redo.",
      "🗄️ Guardar objetos en IndexedDB.",
      "🧪 Evitar mutaciones colaterales en funciones puras.",
    ],

    relacion: [
      "**`JSON.parse(JSON.stringify())`:** alternativa antigua que pierde tipos.",
      "**`Object.assign()` y spread:** copia superficial, no profunda.",
      "**`postMessage()`:** usa el mismo algoritmo internamente.",
      "**`lodash.cloneDeep()`:** alternativa de librería, innecesaria en muchos casos.",
      "**`WeakMap` / `Promise`:** no son clonables.",
    ],

    analogia:
      "Tienes una casa con muebles, cuadros y una caja fuerte. Una copia superficial (`{ ...obj }`) te da otra dirección, pero los muebles son los mismos: si mueves uno, se mueve en ambas casas. `structuredClone()` te construye una casa idéntica con muebles, cuadros y caja fuerte nuevos. Con `transfer` te mudan la caja fuerte original a la nueva casa: en la vieja ya no queda nada.",

    fuente: "MDN Web Docs · HTML Standard · Node.js Docs",

    notasPersonales: [
      "✅ Copia profunda nativa y sin dependencias.",
      "✅ Conserva `Date`, `Map`, `Set`, `RegExp` y ciclos.",
      "❌ No clona funciones, símbolos, DOM ni promesas.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué tipo de copia realiza structuredClone()?",
        opciones: ["Superficial", "Profunda", "Solo de arrays", "Solo de strings"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué ocurre al intentar clonar una función?",
        opciones: [
          "Se copia normalmente",
          "Se omite",
          "Lanza DataCloneError",
          "Devuelve null",
        ],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿Cuál de estos tipos conserva structuredClone()?",
        opciones: ["Nodos del DOM", "Date y Map", "Funciones", "Promesas"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué permite options.transfer?",
        opciones: [
          "Filtrar propiedades",
          "Transferir recursos en lugar de copiarlos",
          "Convertir a JSON",
          "Ordenar claves",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué diferencia hay con JSON.parse(JSON.stringify())?",
        opciones: [
          "Ninguna",
          "structuredClone conserva Date, Map y undefined",
          "JSON conserva más tipos",
          "structuredClone no acepta objetos",
        ],
        correcta: 1,
      },
    ],
  },

  "regexp-test": {
    id: "regexp-test",
    titulo: "RegExp.prototype.test()",
    icon: "🔍",
    categoria: "Web APIs · Validación",
    firma: "regex.test(cadena)",
    simulador: "webapi",

    definicion: [
      "Es un método de las instancias de `RegExp` que comprueba si una cadena coincide con el patrón. 🔍",
      "Devuelve `true` si encuentra una coincidencia y `false` si no la encuentra.",
    ],

    queEs: [
      "Es un método de comprobación: responde a la pregunta «¿esta cadena coincide o contiene algo que coincida con este patrón?». ❓",
      "Pertenece a `RegExp.prototype` y se usa con expresiones regulares.",
    ],

    paraQueSirve: [
      "🔎 Comprobar si existe una palabra o un fragmento de texto.",
      "✅ Validar formatos: correos, teléfonos, códigos postales.",
      "🔢 Detectar números o identificadores.",
      "🛡️ Validar parcialmente la entrada de un usuario.",
    ],

    comoFunciona: [
      "Recibe una cadena y la compara con el patrón de la expresión regular.",
      "Si encuentra una coincidencia, devuelve `true`.",
      "Si no encuentra nada, devuelve `false`.",
      "No devuelve el texto encontrado: para eso se usa `match()` o `exec()`.",
      "Con la bandera `g`, el método modifica `lastIndex` y puede alternar resultados en llamadas sucesivas.",
    ],

    sintaxis: [
      {
        code: `const regex = /patron/;
regex.test("cadena a comprobar");`,
      },
      {
        caption: "Con banderas:",
        code: `const regex = /javascript/i; // i: ignora mayúsculas
const soloDigitos = /^\\d+$/;  // solo números`,
      },
    ],

    nota: "💡 Si reutilizas una regex con la bandera `g`, reinicia `regex.lastIndex = 0` antes de cada comprobación o crea una nueva instancia.",

    ejemplos: [
      {
        titulo: "1. 🔎 Comprobar una palabra",
        code: `const regex = /perro/;
console.log(regex.test("Tengo un perro")); // true`,
      },
      {
        titulo: "2. ❌ Cuando no existe",
        code: `const regex = /gato/;
console.log(regex.test("Tengo un perro")); // false`,
      },
      {
        titulo: "3. 🔠 Ignorar mayúsculas y minúsculas",
        code: `const regex = /javascript/i;
console.log(regex.test("Estoy aprendiendo JAVASCRIPT")); // true`,
      },
      {
        titulo: "4. 🔢 Comprobar si contiene un número",
        code: `const regex = /\\d/;
console.log(regex.test("Edad: 17")); // true
console.log(regex.test("Hola"));     // false`,
      },
      {
        titulo: "5. ✅ Validar un formato",
        code: `const regex = /^\\d{4}$/;
console.log(regex.test("2026")); // true
console.log(regex.test("26"));   // false`,
      },
      {
        titulo: "6. 📧 Validar un correo",
        code: `const email = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
console.log(email.test("usuario@example.com")); // true`,
      },
    ],

    errores: [
      "**Pensar que devuelve la coincidencia:** devuelve solo `true` o `false`; usa `match()` o `exec()` para obtener información.",
      "**Confundir `test()` con `match()`:** `regex.test(texto)` comprueba; `texto.match(regex)` devuelve información de la coincidencia.",
      "**No tener cuidado con la bandera `g`:** `test()` mantiene un estado interno en `lastIndex` y puede dar resultados alternos.",
      "**Olvidar anclar el patrón:** `/\\d{4}/` encuentra cuatro dígitos en cualquier parte; `/^\\d{4}$/` exige exactamente cuatro.",
    ],

    casos: [
      "✅ Validar entradas de formularios.",
      "📧 Comprobar correos electrónicos.",
      "🔍 Detectar palabras clave en logs o mensajes.",
      "🔢 Validar códigos y números.",
    ],

    relacion: [
      "**`exec()`:** devuelve información detallada de la coincidencia.",
      "**`String.prototype.match()`:** obtiene las coincidencias desde el string.",
      "**`String.prototype.replace()`:** sustituye coincidencias.",
      "**Banderas:** `g` global, `i` insensible a mayúsculas, `m` multilínea.",
    ],

    analogia:
      "Imagina un detector de seguridad con un patrón: `/dinero/`. Haces pasar una cadena: «Necesito dinero». El detector pregunta: «¿encuentro lo que estoy buscando?». Si la respuesta es sí, devuelve `true`; si no, `false`. No te dice dónde está ni cuánto encontró: solo confirma si hay coincidencia.",

    fuente: "MDN Web Docs · RegExp.prototype.test()",

    notasPersonales: [
      "✅ Devuelve un booleano, no la coincidencia.",
      "✅ Usa `i` para ignorar mayúsculas.",
      "⚠️ Con `g`, revisa `lastIndex`.",
      "💡 `test()` = ¿coincide?; `match()` = ¿qué coincidió?",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve RegExp.prototype.test()?",
        opciones: [
          "La coincidencia encontrada",
          "Un booleano true o false",
          "Un array de coincidencias",
          "El índice de la coincidencia",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué bandera ignora mayúsculas y minúsculas?",
        opciones: ["g", "i", "m", "s"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué método devuelve información sobre la coincidencia?",
        opciones: ["test()", "match()", "some()", "includes()"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué patrón exige exactamente cuatro dígitos?",
        opciones: ["/\\d{4}/", "/^\\d{4}$/", "/\\d+/", "/[0-9]/"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué problema puede causar la bandera g con test()?",
        opciones: [
          "Ninguno",
          "Modifica lastIndex y alterna resultados",
          "Lanza un error",
          "Convierte el string en número",
        ],
        correcta: 1,
      },
    ],
  },

  "url-createobjecturl": {
    id: "url-createobjecturl",
    titulo: "URL.createObjectURL()",
    icon: "🔗",
    categoria: "Web APIs · Archivos",
    firma: "URL.createObjectURL(blob | file)",
    simulador: "webapi",

    definicion: [
      "Es un método estático de `URL` que crea una **URL temporal** (Object URL) que apunta a un `File`, `Blob` o `MediaSource`. 🔗",
      "Permite acceder a archivos locales desde el navegador sin convertirlos a Base64.",
    ],

    queEs: [
      "Genera una referencia temporal en memoria hacia un archivo. 🧠",
      "No convierte el archivo en texto: crea un enlace interno que el navegador puede usar en `<img>`, `<video>`, `<a>`, etc.",
      "El resultado tiene la forma `blob:https://mi-app.com/uuid`.",
    ],

    paraQueSirve: [
      "🖼️ Crear vistas previas de imágenes antes de subirlas.",
      "🎬 Reproducir vídeos locales.",
      "📄 Mostrar PDFs en el navegador.",
      "📥 Descargar archivos generados dinámicamente.",
      "📦 Trabajar con archivos grandes de forma eficiente.",
    ],

    comoFunciona: [
      "El usuario selecciona un archivo con `<input type=\"file\">`.",
      "JavaScript recibe un objeto `File`.",
      "`createObjectURL()` crea una URL temporal en memoria.",
      "El navegador usa esa URL para acceder al archivo.",
      "Cuando ya no se necesita, se libera con `URL.revokeObjectURL()`.",
    ],

    sintaxis: [
      {
        code: `const url = URL.createObjectURL(archivo);
imagen.src = url;

// Liberar cuando ya no se usa
URL.revokeObjectURL(url);`,
      },
      {
        caption: "Descargar un Blob generado:",
        code: `const blob = new Blob(["Hola JavaScript"], {
  type: "text/plain",
});
const url = URL.createObjectURL(blob);

const enlace = document.createElement("a");
enlace.href = url;
enlace.download = "archivo.txt";
enlace.click();

URL.revokeObjectURL(url);`,
      },
    ],

    nota: "💡 La URL es temporal y solo válida en la sesión actual. No la guardes en una base de datos ni la compartas con otros usuarios.",

    ejemplos: [
      {
        titulo: "1. 🖼️ Vista previa de una imagen",
        code: `const input = document.getElementById("imagen");
const img = document.getElementById("preview");

input.addEventListener("change", () => {
  const archivo = input.files[0];
  const url = URL.createObjectURL(archivo);
  img.src = url;
});`,
      },
      {
        titulo: "2. 🎬 Mostrar un vídeo local",
        code: `const input = document.getElementById("video");
const video = document.getElementById("player");

input.addEventListener("change", () => {
  video.src = URL.createObjectURL(input.files[0]);
});`,
      },
      {
        titulo: "3. 📥 Descargar un archivo generado",
        code: `const blob = new Blob(["Contenido"], { type: "text/plain" });
const url = URL.createObjectURL(blob);

const enlace = document.createElement("a");
enlace.href = url;
enlace.download = "archivo.txt";
enlace.click();

URL.revokeObjectURL(url);`,
      },
      {
        titulo: "4. 🧹 Liberar memoria",
        code: `const url = URL.createObjectURL(archivo);
imagen.src = url;

imagen.onload = () => {
  URL.revokeObjectURL(url);
};`,
      },
    ],

    errores: [
      "**Olvidar liberar la URL:** crear muchas URLs sin revocarlas consume memoria.",
      "**Pensar que convierte a Base64:** genera una URL `blob:`, no un `data:image/...;base64`. Para Base64 se usa `FileReader.readAsDataURL()`.",
      "**Usarlo con cualquier dato:** solo acepta `File`, `Blob` o `MediaSource`.",
      "**Guardar la URL permanentemente:** deja de funcionar al cerrar la página o al revocarla.",
    ],

    casos: [
      "🖼️ Previsualizar imágenes antes de subirlas.",
      "🎥 Reproducir vídeos locales.",
      "📄 Visualizar PDFs.",
      "📥 Descargar archivos generados en el navegador.",
      "🖌️ Aplicaciones de edición multimedia.",
    ],

    relacion: [
      "**`URL.revokeObjectURL()`:** libera la URL creada.",
      "**`FileReader.readAsDataURL()`:** convierte el archivo a Base64 en lugar de crear una URL.",
      "**`Blob`:** representa datos binarios inmutables.",
      "**`File`:** representa un archivo seleccionado por el usuario.",
    ],

    analogia:
      "Tienes una caja con un objeto dentro 📦. `readAsDataURL()` sería hacer una copia completa del objeto y convertirla en un código escrito. `URL.createObjectURL()` es poner una etiqueta con una dirección temporal en la caja: el navegador sabe dónde encontrar el objeto sin copiarlo. Cuando terminas, retiras la etiqueta con `revokeObjectURL()`.",

    fuente: "MDN Web Docs · File API Specification",

    notasPersonales: [
      "✅ Crea una URL temporal para un File o Blob.",
      "✅ Es más eficiente que Base64 para archivos grandes.",
      "✅ No convierte el archivo: solo crea una referencia.",
      "⚠️ Debe acompañarse de `revokeObjectURL()`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué crea URL.createObjectURL()?",
        opciones: [
          "Una cadena Base64",
          "Una URL temporal blob:",
          "Un archivo en el servidor",
          "Un objeto File",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué tipos acepta createObjectURL()?",
        opciones: [
          "Cualquier string",
          "File, Blob o MediaSource",
          "Solo imágenes",
          "Solo JSON",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué método libera la URL creada?",
        opciones: [
          "URL.deleteObjectURL()",
          "URL.revokeObjectURL()",
          "URL.clearObjectURL()",
          "clearInterval()",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿La URL blob: es permanente?",
        opciones: [
          "Sí, se guarda en la base de datos",
          "No, es temporal",
          "Solo en Node.js",
          "Sí, dura un año",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué alternativa convierte el archivo a Base64?",
        opciones: [
          "URL.createObjectURL()",
          "FileReader.readAsDataURL()",
          "JSON.stringify()",
          "btoa()",
        ],
        correcta: 1,
      },
    ],
  },

  "url-revokeobjecturl": {
    id: "url-revokeobjecturl",
    titulo: "URL.revokeObjectURL()",
    icon: "🗑️",
    categoria: "Web APIs · Archivos",
    firma: "URL.revokeObjectURL(objectURL)",
    simulador: "webapi",

    definicion: [
      "Es un método estático de `URL` que libera una Object URL creada previamente con `URL.createObjectURL()`. 🗑️",
      "Invalida la URL y permite que el navegador recupere la memoria asociada.",
    ],

    queEs: [
      "Forma parte de la Web API del navegador, no del lenguaje JavaScript. 🌐",
      "Se utiliza junto con `URL.createObjectURL()` para una gestión correcta de la memoria.",
    ],

    paraQueSirve: [
      "🧠 Liberar la memoria ocupada por una Object URL.",
      "🚫 Evitar fugas de memoria.",
      "♻️ Invalidar una URL temporal cuando ya no se necesita.",
      "⚡ Optimizar aplicaciones que trabajan con archivos.",
    ],

    comoFunciona: [
      "Se crea una Object URL con `URL.createObjectURL()`.",
      "La URL se usa en un `<img>`, `<video>` o para descargar un archivo.",
      "Cuando deja de ser necesaria, se llama a `URL.revokeObjectURL()`.",
      "El navegador invalida la URL y libera los recursos.",
      "Después de revocarla, la URL ya no puede utilizarse.",
    ],

    sintaxis: [
      {
        code: `const url = URL.createObjectURL(blob);
// usar la URL...
URL.revokeObjectURL(url);`,
      },
    ],

    nota: "💡 Libera la URL después de que el recurso termine de cargar. Si la revocas demasiado pronto, la imagen o el vídeo no podrán mostrarse.",

    ejemplos: [
      {
        titulo: "1. 🧹 Liberar una Object URL",
        code: `const blob = new Blob(["Hola Mundo"], { type: "text/plain" });
const url = URL.createObjectURL(blob);

console.log(url);
URL.revokeObjectURL(url);`,
      },
      {
        titulo: "2. 📥 Después de descargar un archivo",
        code: `const blob = new Blob(["Contenido"], { type: "text/plain" });
const url = URL.createObjectURL(blob);

const enlace = document.createElement("a");
enlace.href = url;
enlace.download = "archivo.txt";
enlace.click();

URL.revokeObjectURL(url);`,
      },
      {
        titulo: "3. 🖼️ Después de mostrar una imagen",
        code: `const imagen = document.querySelector("img");
const url = URL.createObjectURL(file);

imagen.src = url;
imagen.onload = () => {
  URL.revokeObjectURL(url);
};`,
      },
    ],

    errores: [
      "**Pensar que pertenece a JavaScript:** es una Web API del navegador.",
      "**Usarlo con una URL normal:** solo funciona con URLs creadas por `createObjectURL()`.",
      "**Liberar demasiado pronto:** si revocas antes de que la imagen cargue, no se mostrará.",
      "**Olvidar liberar:** la memoria puede quedar ocupada innecesariamente.",
    ],

    casos: [
      "🖼️ Mostrar imágenes seleccionadas por el usuario.",
      "🎬 Reproducir vídeos o audios locales.",
      "📥 Descargar archivos generados dinámicamente.",
      "📄 Visualizar PDFs temporales.",
    ],

    relacion: [
      "**`URL.createObjectURL()`:** crea la URL que luego se libera.",
      "**`Blob`:** datos binarios usados para crear Object URLs.",
      "**`File`:** hereda de `Blob` y puede convertirse en Object URL.",
      "**`FileReader`:** otra forma de leer archivos, devuelve el contenido en lugar de una URL.",
      "**Gestión de memoria:** `revokeObjectURL()` ayuda a liberar recursos.",
    ],

    analogia:
      "Alquilas una sala para un evento. `URL.createObjectURL()` es recibir la llave para usarla temporalmente. Mientras tienes la llave, puedes entrar y usar la sala. Cuando terminas, `URL.revokeObjectURL()` es devolver la llave para que la sala quede libre. Si nunca la devuelves, el recurso permanece reservado innecesariamente.",

    fuente: "MDN Web Docs · File API Specification",

    notasPersonales: [
      "✅ Libera una Object URL creada con createObjectURL().",
      "✅ No devuelve ningún valor.",
      "⚠️ Después de revocarla, la URL deja de funcionar.",
      "✅ Es clave para evitar memory leaks.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué hace URL.revokeObjectURL()?",
        opciones: [
          "Crea una URL temporal",
          "Libera una Object URL y su memoria",
          "Descarga un archivo",
          "Convierte a Base64",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Con qué URL funciona?",
        opciones: [
          "Con cualquier URL https",
          "Solo con URLs creadas por createObjectURL()",
          "Con data URLs",
          "Con rutas relativas",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué ocurre si revocas la URL antes de cargar la imagen?",
        opciones: [
          "La imagen se carga igual",
          "La imagen no se puede cargar",
          "Se descarga sola",
          "Lanza un SyntaxError",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué devuelve revokeObjectURL()?",
        opciones: ["true", "La URL liberada", "undefined", "Un Blob"],
        correcta: 2,
      },
      {
        id: 5,
        pregunta: "¿Por qué es importante llamarlo?",
        opciones: [
          "Para evitar fugas de memoria",
          "Para convertir el archivo",
          "Para subirlo al servidor",
          "Para comprimirlo",
        ],
        correcta: 0,
      },
    ],
  },

  btoa: {
    id: "btoa",
    titulo: "btoa()",
    icon: "🔐",
    categoria: "Web APIs · Codificación",
    firma: "btoa(stringToEncode)",
    simulador: "webapi",

    definicion: [
      "Es una función global que codifica una cadena de caracteres en una representación **Base64**. 🔐",
      "`btoa` significa *Binary to ASCII*: convierte datos en texto seguro para transportar.",
    ],

    queEs: [
      "Convierte una cadena cuyos caracteres pertenecen al rango de un byte en una cadena Base64 usando caracteres ASCII. 🔤",
      "No es cifrado: Base64 es una codificación reversible con `atob()`, no proporciona seguridad.",
    ],

    paraQueSirve: [
      "📦 Representar datos binarios o cadenas de bytes como texto.",
      "🌐 Transportar datos en APIs que esperan Base64.",
      "🖼️ Crear representaciones Base64 para data URLs.",
      "🔁 Codificar contenido que luego se decodifica con `atob()`.",
      "🧪 Probar codificación y decodificación.",
    ],

    comoFunciona: [
      "Recibe una cadena de texto.",
      "Toma sus bytes y los agrupa de tres en tres.",
      "Convierte cada grupo en cuatro caracteres del alfabeto Base64.",
      "Añade el padding `=` necesario para completar múltiplos de cuatro.",
      "Devuelve la cadena Base64 resultante.",
    ],

    sintaxis: [
      {
        code: `const resultado = btoa("Hola");
console.log(resultado); // "SG9sYQ=="`,
      },
    ],

    nota: "💡 Para texto Unicode (acentos, emojis) usa primero `TextEncoder`: `btoa(String.fromCharCode(...new TextEncoder().encode(texto)))`.",

    ejemplos: [
      {
        titulo: "1. 🔐 Codificar texto",
        code: `const texto = "Hola mundo";
const codificado = btoa(texto);
console.log(codificado); // "SG9sYSBtdW5kbw=="`,
      },
      {
        titulo: "2. 🔤 Codificar una palabra",
        code: `console.log(btoa("JavaScript")); // "SmF2YVNjcmlwdA=="`,
      },
      {
        titulo: "3. 🔁 Codificar y decodificar",
        code: `const original = "Hola";
const codificado = btoa(original);
const decodificado = atob(codificado);

console.log(codificado);   // "SG9sYQ=="
console.log(decodificado); // "Hola"`,
      },
      {
        titulo: "4. 🌍 UTF-8 seguro con TextEncoder",
        code: `function btoaUTF8(texto) {
  const bytes = new TextEncoder().encode(texto);
  return btoa(String.fromCharCode(...bytes));
}

console.log(btoaUTF8("Hola ñandú 🦙"));`,
      },
    ],

    errores: [
      "**Confundir Base64 con cifrado:** no protege contraseñas ni datos sensibles.",
      "**Codificar Unicode directamente:** `btoa(\"😎\")` lanza `InvalidCharacterError`; convierte antes con `TextEncoder`.",
      "**Confundir `btoa()` con `atob()`:** `btoa` codifica; `atob` decodifica.",
      "**Asumir que el resultado es más pequeño:** Base64 ocupa aproximadamente un 33 % más.",
    ],

    casos: [
      "🔐 Transportar credenciales básicas en una cabecera (siempre sobre HTTPS).",
      "🖼️ Generar data URLs para imágenes pequeñas.",
      "📦 Codificar datos binarios para APIs.",
      "🧪 Probar funciones de codificación.",
    ],

    relacion: [
      "**`atob()`:** decodifica Base64.",
      "**`TextEncoder` / `TextDecoder`:** convierten texto a bytes UTF-8 y viceversa.",
      "**Data URLs:** usan Base64 para incrustar recursos.",
      "**`encodeURIComponent()`:** codifica para URLs, no para Base64.",
      "**JWT:** usa Base64 URL-safe, una variante con `-` y `_`.",
    ],

    analogia:
      "Tienes una caja con objetos que un sistema solo acepta como paquetes de texto. `btoa()` empaqueta esos datos en un formato que el sistema puede transportar. Al otro lado, `atob()` los desempaqueta y recupera los datos originales.",

    fuente: "MDN Web Docs · Window: btoa()",

    notasPersonales: [
      "✅ btoa = Binary to ASCII.",
      "✅ Codifica a Base64, no cifra.",
      "✅ atob realiza el proceso inverso.",
      "⚠️ Para Unicode necesita un paso extra con TextEncoder.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué hace btoa()?",
        opciones: [
          "Decodifica Base64",
          "Codifica texto a Base64",
          "Cifra con AES",
          "Comprime datos",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Base64 proporciona seguridad?",
        opciones: [
          "Sí, es cifrado fuerte",
          "No, es solo codificación reversible",
          "Solo con HTTPS",
          "Solo para contraseñas",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué función decodifica Base64?",
        opciones: ["btoa()", "atob()", "decodeURIComponent()", "JSON.parse()"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué ocurre con btoa(\"😎\")?",
        opciones: [
          "Funciona siempre",
          "Lanza InvalidCharacterError",
          "Devuelve null",
          "Lo ignora",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué se usa para convertir texto Unicode a bytes antes de btoa()?",
        opciones: ["TextEncoder", "FileReader", "URLSearchParams", "JSON.stringify"],
        correcta: 0,
      },
    ],
  },

  atob: {
    id: "atob",
    titulo: "atob()",
    icon: "🔓",
    categoria: "Web APIs · Codificación",
    firma: "atob(cadenaBase64)",
    simulador: "webapi",

    definicion: [
      "Es una función global que decodifica una cadena codificada en **Base64** y devuelve el string binario original. 🔓",
      "`atob` significa *ASCII to binary*: de Base64 a texto.",
    ],

    queEs: [
      "Es la función inversa de `btoa()`. 🔁",
      "Devuelve un string donde cada carácter representa un byte (0-255); no interpreta UTF-8 directamente.",
      "Lanza `InvalidCharacterError` si la cadena contiene caracteres no válidos de Base64.",
    ],

    paraQueSirve: [
      "🔓 Decodificar datos Base64 recibidos.",
      "🖼️ Procesar imágenes en data URLs.",
      "📧 Leer el payload de un token JWT.",
      "📦 Leer archivos codificados en Base64.",
      "🌐 Manejar respuestas de APIs que devuelven Base64.",
    ],

    comoFunciona: [
      "Recibe una cadena codificada en Base64.",
      "Verifica que solo contenga caracteres válidos: `A-Z`, `a-z`, `0-9`, `+`, `/` y `=` de padding.",
      "Decodifica cada grupo de cuatro caracteres en tres bytes.",
      "Devuelve un string donde cada carácter representa un byte.",
      "No interpreta UTF-8: para caracteres especiales hay que reconstruir los bytes con `TextDecoder`.",
    ],

    sintaxis: [
      {
        code: `const texto = atob("SG9sYSBtdW5kbw==");
console.log(texto); // "Hola mundo"`,
      },
      {
        caption: "Decodificar UTF-8 correctamente:",
        code: `function atobUTF8(base64) {
  const binario = atob(base64);
  const bytes = Uint8Array.from(binario, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}`,
      },
    ],

    nota: "💡 Base64 URL-safe usa `-` y `_` en lugar de `+` y `/`. Normaliza antes de llamar a `atob()`: `str.replace(/-/g, \"+\").replace(/_/g, \"/\")`.",

    ejemplos: [
      {
        titulo: "1. 🔓 Decodificación simple",
        code: `const codificado = "SG9sYSBtdW5kbw==";
const decodificado = atob(codificado);
console.log(decodificado); // "Hola mundo"`,
      },
      {
        titulo: "2. 🔁 Verificar ida y vuelta",
        code: `const original = "JavaScript";
const codificado = btoa(original);
const decodificado = atob(codificado);

console.log(original === decodificado); // true`,
      },
      {
        titulo: "3. ❌ Error con caracteres inválidos",
        code: `try {
  atob("esto no es base64!");
} catch (err) {
  console.error(err.name); // "InvalidCharacterError"
}`,
      },
      {
        titulo: "4. 🌍 Decodificar UTF-8 con TextDecoder",
        code: `function atobUTF8(base64) {
  const binario = atob(base64);
  const bytes = Uint8Array.from(binario, (c) => c.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}`,
      },
      {
        titulo: "5. 🔐 Decodificar un JWT",
        code: `function decodificarJWT(token) {
  const [header, payload] = token.split(".");
  return {
    header: JSON.parse(atob(header)),
    payload: JSON.parse(atob(payload)),
  };
}`,
      },
      {
        titulo: "6. 🔢 Convertir Base64 a bytes",
        code: `function base64ABytes(base64) {
  const binario = atob(base64);
  return Uint8Array.from(binario, (c) => c.charCodeAt(0));
}`,
      },
    ],

    errores: [
      "**Usarlo con UTF-8 directamente:** falla con caracteres mayores de 255.",
      "**Esperar que devuelva bytes:** devuelve un string binario; conviértelo con `Uint8Array` si necesitas bytes.",
      "**Pasar `null` o `undefined`:** lanza `TypeError`.",
      "**Base64 URL-safe sin normalizar:** puede lanzar `InvalidCharacterError`.",
      "**Asumir que siempre es válido:** si el string no es Base64, lanza `InvalidCharacterError`.",
      "**Confundir con `btoa()`:** uno codifica y el otro decodifica.",
    ],

    casos: [
      "🔓 Decodificar datos Base64 de APIs.",
      "🖼️ Mostrar imágenes desde data URLs.",
      "📧 Leer tokens JWT.",
      "📦 Descargar archivos codificados.",
      "🔍 Depurar tokens y sesiones.",
    ],

    relacion: [
      "**`btoa()`:** codifica a Base64.",
      "**`TextEncoder` / `TextDecoder`:** manejan UTF-8.",
      "**`Uint8Array`:** trabaja con bytes reales.",
      "**`Blob`:** crea archivos a partir de bytes.",
      "**Base64 URL-safe:** variante usada por JWT.",
      "**`encodeURIComponent()`:** otra forma de codificar texto, pensada para URLs.",
    ],

    analogia:
      "Base64 es como un código donde cada cuatro letras representan tres bytes originales. `btoa()` es el traductor de texto a código y `atob()` el traductor de código a texto. El traductor solo conoce 64 símbolos: si le das símbolos raros se confunde (`InvalidCharacterError`); si le das acentos o emojis no los entiende porque no son Latin-1, y necesitas otro traductor (`TextDecoder`) que reensamble los bytes UTF-8.",

    fuente: "MDN Web Docs · HTML Standard · MDN Base64",

    notasPersonales: [
      "✅ Es la función inversa de `btoa()`.",
      "✅ Devuelve un string, no un array de bytes.",
      "⚠️ No maneja UTF-8 directamente.",
      "💡 Base64 ocupa aproximadamente un 33 % más.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué hace atob()?",
        opciones: [
          "Codifica a Base64",
          "Decodifica Base64 a texto",
          "Cifra datos",
          "Convierte a JSON",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué error lanza atob() con caracteres inválidos?",
        opciones: ["SyntaxError", "InvalidCharacterError", "TypeError", "URIError"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve atob()?",
        opciones: [
          "Un Uint8Array",
          "Un string binario",
          "Un Blob",
          "Un objeto",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Cómo se decodifica correctamente UTF-8 desde Base64?",
        opciones: [
          "atob directamente",
          "atob + TextDecoder",
          "JSON.parse",
          "decodeURI",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué caracteres usa Base64 URL-safe?",
        opciones: ["+ y /", "- y _", "= y &", "% y #"],
        correcta: 1,
      },
    ],
  },

  encodeuricomponent: {
    id: "encodeuricomponent",
    titulo: "encodeURIComponent()",
    icon: "🔗",
    categoria: "Web APIs · Codificación",
    firma: "encodeURIComponent(string)",
    simulador: "webapi",

    definicion: [
      "Es una función global que codifica una cadena para usarla como **componente de una URL**, escapando los caracteres que no son seguros. 🔗",
      "Convierte espacios, acentos y símbolos en su representación porcentual `%XX` en UTF-8.",
    ],

    queEs: [
      "Es la herramienta estándar para sanear texto que se incluye en una URL como parámetro, path o query string. 🧼",
      "Codifica todos los caracteres excepto `A-Z`, `a-z`, `0-9`, `-`, `_`, `.` y `~`.",
      "Es más agresiva que `encodeURI()` y reversible con `decodeURIComponent()`.",
    ],

    paraQueSirve: [
      "🔗 Codificar parámetros de consulta (query strings).",
      "📝 Codificar valores de formularios enviados por GET.",
      "📁 Codificar rutas y nombres de archivos.",
      "🌍 Codificar textos con acentos, ñ o espacios.",
      "📦 Codificar JSON para enviarlo dentro de una URL.",
      "🛡️ Prevenir errores e inyecciones en URLs.",
    ],

    comoFunciona: [
      "Recorre la cadena y detecta los caracteres que no son seguros.",
      "Reemplaza cada uno por su escape porcentual `%XX` en UTF-8.",
      "Los caracteres seguros permanecen igual.",
      "Devuelve la cadena codificada.",
      "Lanza `URIError` si la cadena contiene un surrogate inválido.",
    ],

    sintaxis: [
      {
        code: `const codificado = encodeURIComponent("Hola Mundo!");
console.log(codificado); // "Hola%20Mundo%21"`,
      },
      {
        caption: "Construir una query string:",
        code: `const nombre = "Juan Pérez";
const url = "https://api.com?nombre=" + encodeURIComponent(nombre);`,
      },
    ],

    nota: "💡 No codifiques una URL completa con `encodeURIComponent()`: también codificaría `:` y `/`. Codifica solo los valores de los parámetros.",

    ejemplos: [
      {
        titulo: "1. 🔗 Uso básico",
        code: `const text = "Hola Mundo!";
console.log(encodeURIComponent(text)); // "Hola%20Mundo%21"`,
      },
      {
        titulo: "2. 🌍 Acentos y caracteres especiales",
        code: `const español = "España, café y pingüino";
console.log(encodeURIComponent(español));
// "Espa%C3%B1a%2C%20caf%C3%A9%20y%20ping%C3%BCino"`,
      },
      {
        titulo: "3. 🔗 URL como parámetro",
        code: `const url = "https://ejemplo.com/path?param=value&otro=2";
console.log(encodeURIComponent(url));
// "https%3A%2F%2Fejemplo.com%2Fpath%3Fparam%3Dvalue%26otro%3D2"`,
      },
      {
        titulo: "4. 🧱 Construir una query string",
        code: `const params = {
  nombre: "Juan Pérez",
  ciudad: "Madrid",
};

const query = Object.entries(params)
  .map(([k, v]) => encodeURIComponent(k) + "=" + encodeURIComponent(v))
  .join("&");`,
      },
      {
        titulo: "5. 😊 Codificar un emoji",
        code: `console.log(encodeURIComponent("😊")); // "%F0%9F%98%8A"`,
      },
      {
        titulo: "6. 🔁 Ida y vuelta",
        code: `const original = "Mi nombre: José, edad: 25";
const encoded = encodeURIComponent(original);
const decoded = decodeURIComponent(encoded);

console.log(decoded === original); // true`,
      },
    ],

    errores: [
      "**Usar `encodeURI()` para parámetros:** no codifica `&`, `?`, `=`, `#` ni `/`, y puede romper la URL.",
      "**No codificar los valores:** espacios y símbolos rompen la URL.",
      "**Codificar la URL completa:** `encodeURIComponent(\"https://ejemplo.com\")` codifica los dos puntos y las barras.",
      "**No decodificar al recibir:** los datos llegan como `%C3%A9` y hay que usar `decodeURIComponent()`.",
      "**Pasar objetos o arrays:** se convierten a `[object Object]`; usa `JSON.stringify()` primero.",
    ],

    casos: [
      "🔎 Construir URLs de búsqueda con filtros.",
      "📤 Enviar parámetros seguros a una API.",
      "🔗 Generar enlaces para compartir estado.",
      "📝 Codificar datos de formularios.",
      "📦 Codificar JSON dentro de una URL.",
    ],

    relacion: [
      "**`decodeURIComponent()`:** función inversa.",
      "**`encodeURI()`:** codifica una URL completa, menos agresivo.",
      "**`URLSearchParams`:** API moderna para construir query strings.",
      "**`btoa()` / `atob()`:** codificación Base64, no para URLs.",
      "**`escape()`:** obsoleto, no usar.",
    ],

    analogia:
      "`encodeURIComponent()` es como un traductor estricto para URLs. Cuando quieres enviar un mensaje con espacios, acentos o símbolos, los traduce a un idioma que la URL entiende (`%XX`). Así el mensaje llega intacto al otro lado, sin que un `&` o un `?` se interprete como parte de la estructura de la URL.",

    fuente: "MDN Web Docs · ECMAScript Specification · RFC 3986",

    notasPersonales: [
      "✅ Codifica todo excepto `A-Z a-z 0-9 - _ . ~`.",
      "✅ Es reversible con `decodeURIComponent()`.",
      "⚠️ No la uses para la URL completa.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué caracteres NO codifica encodeURIComponent()?",
        opciones: [
          "A-Z, a-z, 0-9, - _ . ~",
          "Solo letras",
          "&, ?, =, #",
          "Espacios y acentos",
        ],
        correcta: 0,
      },
      {
        id: 2,
        pregunta: "¿Cómo se codifica un espacio?",
        opciones: ["%2F", "%20", "%3D", "+"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué función revierte la codificación?",
        opciones: [
          "encodeURI()",
          "decodeURIComponent()",
          "decodeURI()",
          "atob()",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué diferencia hay con encodeURI()?",
        opciones: [
          "Ninguna",
          "encodeURIComponent codifica también &, ?, =, # y /",
          "encodeURI es más agresiva",
          "encodeURIComponent no acepta strings",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué ocurre si pasas un objeto?",
        opciones: [
          "Se serializa a JSON automáticamente",
          "Se convierte a [object Object]",
          "Lanza URIError",
          "Devuelve null",
        ],
        correcta: 1,
      },
    ],
  },

  decodeuricomponent: {
    id: "decodeuricomponent",
    titulo: "decodeURIComponent()",
    icon: "🔁",
    categoria: "Web APIs · Codificación",
    firma: "decodeURIComponent(encodedString)",
    simulador: "webapi",

    definicion: [
      "Es una función global que decodifica una cadena previamente codificada con `encodeURIComponent()`, restaurando los caracteres especiales. 🔁",
      "Convierte las secuencias porcentuales (`%20`, `%C3%A9`) de vuelta a los caracteres originales.",
    ],

    queEs: [
      "Es la función inversa de `encodeURIComponent()`. 🔄",
      "Permite recuperar datos que fueron enviados a través de una URL.",
      "Lanza `URIError` si encuentra una secuencia de escape malformada.",
    ],

    paraQueSirve: [
      "🔎 Decodificar parámetros de consulta.",
      "📝 Decodificar datos de formularios recibidos por GET.",
      "📁 Decodificar rutas y nombres de archivos.",
      "📦 Procesar JSON codificado dentro de una URL.",
      "🌍 Recuperar textos con acentos, espacios y símbolos.",
      "🔗 Parsear enlaces compartidos.",
    ],

    comoFunciona: [
      "Recorre la cadena y busca secuencias `%XX`.",
      "Reemplaza cada escape por el carácter UTF-8 que representa.",
      "Los caracteres no codificados permanecen igual.",
      "Devuelve la cadena decodificada.",
      "Si la secuencia es inválida, lanza `URIError`.",
    ],

    sintaxis: [
      {
        code: `const texto = decodeURIComponent("Hola%20Mundo%21");
console.log(texto); // "Hola Mundo!"`,
      },
      {
        caption: "Con manejo de errores:",
        code: `try {
  const texto = decodeURIComponent(valor);
} catch (error) {
  console.error("Secuencia inválida", error);
}`,
      },
    ],

    nota: "💡 No decodifiques dos veces el mismo valor: si ya está decodificado, una segunda pasada es redundante y puede alterar el contenido.",

    ejemplos: [
      {
        titulo: "1. 🔁 Uso básico",
        code: `const encoded = "Hola%20Mundo%21";
console.log(decodeURIComponent(encoded)); // "Hola Mundo!"`,
      },
      {
        titulo: "2. 🌍 Acentos y caracteres especiales",
        code: `const encoded = "Espa%C3%B1a%2C%20caf%C3%A9%20y%20ping%C3%BCino";
console.log(decodeURIComponent(encoded));
// "España, café y pingüino"`,
      },
      {
        titulo: "3. 🔗 URL como parámetro",
        code: `const encoded = "https%3A%2F%2Fejemplo.com%2Fpath%3Fparam%3Dvalue";
console.log(decodeURIComponent(encoded));
// "https://ejemplo.com/path?param=value"`,
      },
      {
        titulo: "4. 🔎 Parsear una query string",
        code: `function parseQueryString(queryString) {
  const params = {};
  queryString.split("&").forEach((pair) => {
    const [key, value] = pair.split("=");
    params[decodeURIComponent(key)] = decodeURIComponent(value || "");
  });
  return params;
}`,
      },
      {
        titulo: "5. 🛡️ Manejo seguro de errores",
        code: `function safeDecode(valor) {
  try {
    return decodeURIComponent(valor);
  } catch {
    return valor;
  }
}`,
      },
      {
        titulo: "6. 📦 Decodificar JSON",
        code: `function decodeJSON(encoded) {
  try {
    return JSON.parse(decodeURIComponent(encoded));
  } catch (error) {
    console.error("JSON inválido", error);
    return null;
  }
}`,
      },
    ],

    errores: [
      "**No manejar errores:** una secuencia inválida lanza `URIError`.",
      "**Decodificar dos veces:** es redundante y puede alterar el contenido.",
      "**Usar `decodeURI()` en lugar de `decodeURIComponent()`:** `decodeURI()` no decodifica `&`, `?`, `=`, `#` ni `/`.",
      "**No decodificar al recibir parámetros:** se muestran como `%C3%A9` en la interfaz.",
      "**Asumir que decodifica todos los formatos:** solo procesa escapes porcentuales UTF-8.",
    ],

    casos: [
      "🔎 Leer parámetros de una URL en el frontend.",
      "📝 Procesar formularios enviados por GET.",
      "🔗 Recuperar el estado de un enlace compartido.",
      "📦 Decodificar JSON que viaja en la URL.",
      "🌍 Internacionalización y mensajes codificados.",
    ],

    relacion: [
      "**`encodeURIComponent()`:** función inversa que codifica.",
      "**`decodeURI()`:** decodifica una URL completa, menos agresivo.",
      "**`URLSearchParams`:** API moderna que decodifica automáticamente.",
      "**`JSON.parse()`:** se combina para leer JSON codificado.",
      "**`escape()` / `unescape()`:** obsoletos, no usar.",
    ],

    analogia:
      "`decodeURIComponent()` es un traductor inverso para URLs. Recibes un mensaje en un código especial (`%20`, `%C3%A9`) y lo traduces de vuelta al idioma original. Así «Hola%20Mundo%21» se convierte en «Hola Mundo!».",

    fuente: "MDN Web Docs · ECMAScript Specification · RFC 3986",

    notasPersonales: [
      "✅ Es la función inversa de `encodeURIComponent()`.",
      "✅ Solo decodifica escapes porcentuales válidos.",
      "⚠️ Lanza `URIError` si la secuencia está malformada.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué hace decodeURIComponent()?",
        opciones: [
          "Codifica una URL",
          "Decodifica secuencias porcentuales",
          "Convierte a Base64",
          "Cifra texto",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué error lanza ante una secuencia inválida?",
        opciones: ["SyntaxError", "URIError", "TypeError", "InvalidCharacterError"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve decodeURIComponent(\"%20\")?",
        opciones: ["Un espacio", "%20", "null", "undefined"],
        correcta: 0,
      },
      {
        id: 4,
        pregunta: "¿Qué diferencia hay con decodeURI()?",
        opciones: [
          "Ninguna",
          "decodeURIComponent decodifica también &, ?, =, # y /",
          "decodeURI es más agresivo",
          "decodeURIComponent no acepta strings",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué API moderna decodifica query strings automáticamente?",
        opciones: ["URLSearchParams", "JSON.parse", "atob", "FileReader"],
        correcta: 0,
      },
    ],
  },
};
