export const JS_REGEXP = {
  id: "regexp",
  label: "RegExp",
  icon: "🔎",
  titulo: "Expresiones regulares en JavaScript",
  descripcion:
    "Encuentra, extrae, reemplaza y divide texto con patrones: la base de las validaciones y del procesamiento de cadenas en JavaScript.",
  grupos: [
    {
      seccion: "Métodos de RegExp",
      metodos: [
        {
          id: "regexp-test-method",
          nombre: "RegExp.prototype.test()",
          firma: "regex.test(texto)",
          icon: "✅",
        },
        {
          id: "regexp-exec",
          nombre: "RegExp.prototype.exec()",
          firma: "regex.exec(texto)",
          icon: "🎯",
        },
      ],
    },
    {
      seccion: "Métodos de String con RegExp",
      metodos: [
        {
          id: "regexp-string-match",
          nombre: "String.prototype.match()",
          firma: "texto.match(regex)",
          icon: "🧩",
        },
        {
          id: "regexp-string-matchall",
          nombre: "String.prototype.matchAll()",
          firma: "texto.matchAll(regex)",
          icon: "🔁",
        },
        {
          id: "regexp-string-replace",
          nombre: "String.prototype.replace() con RegExp",
          firma: "texto.replace(regex, reemplazo)",
          icon: "🔄",
        },
        {
          id: "regexp-string-replaceall",
          nombre: "String.prototype.replaceAll() con RegExp",
          firma: "texto.replaceAll(regex, reemplazo)",
          icon: "♻️",
        },
        {
          id: "regexp-string-split",
          nombre: "String.prototype.split() con RegExp",
          firma: "texto.split(regex, limite)",
          icon: "✂️",
        },
        {
          id: "regexp-string-search",
          nombre: "String.prototype.search()",
          firma: "texto.search(regex)",
          icon: "🔍",
        },
      ],
    },
  ],
};

export const JS_REGEXP_DOCS = {
  "regexp-test-method": {
    id: "regexp-test-method",
    titulo: "RegExp.prototype.test()",
    icon: "✅",
    categoria: "RegExp",
    firma: "regex.test(texto)",
    simulador: "webapi",

    definicion: [
      "Es un método de las instancias de `RegExp` que comprueba si el patrón coincide con algún fragmento de una cadena y devuelve un **booleano**. ✅",
      "No devuelve la coincidencia ni su posición: solo responde `true` o `false`.",
    ],

    queEs: [
      "Es la forma más directa de hacer una **validación booleana** con expresiones regulares. 🔍",
      "Cada `RegExp` guarda un estado interno llamado `lastIndex` que solo influye en los patrones con las banderas `g` o `y`.",
    ],

    paraQueSirve: [
      "✅ Validar formularios: correo, teléfono, contraseña o código postal.",
      "🔎 Comprobar si un texto contiene una palabra o un carácter concreto.",
      "🚦 Decidir si ejecutar una rama de código según el contenido.",
      "🧪 Probar patrones rápidamente sin necesidad de extraer coincidencias.",
    ],

    comoFunciona: [
      "Recibe el texto que se quiere comprobar; si no es un string, se convierte con `String()`.",
      "Busca la primera coincidencia del patrón dentro del texto.",
      "Devuelve `true` en cuanto la encuentra y `false` si no hay ninguna.",
      "Con la bandera `g`, comienza en `regex.lastIndex` y actualiza esa posición tras cada llamada.",
      "Con la bandera `y` (sticky), solo acepta una coincidencia exactamente en `lastIndex`.",
    ],

    sintaxis: [
      {
        code: `const cumple = /^[a-z]+$/.test(texto);`,
      },
      {
        caption: "Con un patrón construido dinámicamente:",
        code: `const patron = new RegExp("^" + prefijo, "i");
const cumple = patron.test(texto);`,
      },
      {
        caption: "Validación típica de un formulario:",
        code: `const email = "ana@mail.com";
if (/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email)) {
  console.log("Correo válido");
}`,
      },
    ],

    nota: "💡 `test()` no extrae la coincidencia. Si necesitas saber qué se encontró o en qué posición, usa `exec()` o `String.prototype.match()`.",

    ejemplos: [
      {
        titulo: "1. ✅ Comprobación básica",
        code: `const texto = "Hola mundo";
console.log(/mundo/.test(texto)); // true
console.log(/adios/.test(texto)); // false`,
      },
      {
        titulo: "2. 🔢 Detectar dígitos",
        code: `console.log(/\\d+/.test("pedido 42")); // true
console.log(/\\d+/.test("pedido")); // false`,
      },
      {
        titulo: "3. 🔠 Ignorar mayúsculas con la bandera i",
        code: `const patron = /javascript/i;
console.log(patron.test("Aprender JavaScript")); // true
console.log(patron.test("Aprender JAVA")); // false`,
      },
      {
        titulo: "4. 🔁 El estado de lastIndex con la bandera g",
        code: `const patron = /a/g;
const texto = "casa";
console.log(patron.test(texto), patron.lastIndex); // true 2
console.log(patron.test(texto), patron.lastIndex); // true 4
console.log(patron.test(texto), patron.lastIndex); // false 0`,
      },
    ],

    errores: [
      "**Olvidar anclar el patrón:** `/ana/` también acepta `\"banana\"`. Usa `^` y `$` para exigir el texto completo.",
      "**Reutilizar un patrón con `g`:** `lastIndex` persiste y dos llamadas seguidas pueden dar resultados distintos. Crea un patrón nuevo o reinicia `lastIndex = 0`.",
      "**Confundir `test()` con extracción:** devuelve un booleano, no la coincidencia encontrada.",
      "**No escapar caracteres especiales:** el punto `.` coincide con cualquier carácter; para un punto literal hay que escribir `\\.`.",
      "**Pensar que ignora mayúsculas:** sin la bandera `i`, `\"Hola\"` y `\"hola\"` son textos distintos.",
    ],

    casos: [
      "✅ Validar el correo o la contraseña antes de enviar un formulario.",
      "🚫 Bloquear palabras prohibidas en un comentario o un chat.",
      "🔍 Comprobar si una URL pertenece a un dominio concreto.",
      "🧾 Verificar que un código de pedido tiene el formato esperado.",
    ],

    relacion: [
      "**`exec()`:** devuelve la coincidencia completa cuando además de saber si existe necesitas sus datos.",
      "**`String.prototype.match()`:** atajo que devuelve la coincidencia o una lista de ellas.",
      "**`String.prototype.search()`:** devuelve la posición de la primera coincidencia, no un booleano.",
      "**`String.prototype.includes()`:** sirve para texto literal, sin patrones ni banderas.",
      "**Banderas:** `i` ignora mayúsculas, `g` recorre todas las coincidencias y `y` exige continuidad.",
    ],

    analogia:
      "Imagina un portero con un detector de metales en la entrada de un concierto. 🚪 No le interesa qué objeto metálico llevas ni dónde está: solo necesita responder «sí» o «no» para dejarte pasar. `test()` es ese portero: recorre el texto, comprueba si el patrón aparece y devuelve un booleano, sin darte más detalles.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Devuelve siempre `true` o `false`.",
      "✅ Con `g` o `y`, cada llamada avanza `lastIndex`.",
      "💡 Para validar un formato completo, ancla con `^` y `$`.",
      "⚠️ Evita reutilizar un patrón global si no controlas `lastIndex`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve /hola/.test('hola mundo')?",
        opciones: ["La cadena 'hola'", "true", "El índice 0", "null"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué tipo de dato devuelve siempre test()?",
        opciones: ["Un array", "Un número", "Un booleano", "Un string"],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿Qué bandera hace que test() avance lastIndex entre llamadas?",
        opciones: ["i", "g", "m", "s"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué patrón exige que TODO el texto sean letras minúsculas?",
        opciones: ["/[a-z]+/", "/^[a-z]+$/", "/[a-z]$/", "/^[a-z]/"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué ocurre con /ana/.test('banana')?",
        opciones: [
          "Devuelve false porque no empieza por ana",
          "Devuelve true porque ana está dentro",
          "Lanza un error",
          "Devuelve el índice 1",
        ],
        correcta: 1,
      },
    ],
  },

  "regexp-exec": {
    id: "regexp-exec",
    titulo: "RegExp.prototype.exec()",
    icon: "🎯",
    categoria: "RegExp",
    firma: "regex.exec(texto)",

    definicion: [
      "Es un método de las instancias de `RegExp` que busca el patrón en una cadena y devuelve un **array especial** con la coincidencia, su posición y sus grupos de captura. 🎯",
      "Si no encuentra nada, devuelve `null`.",
    ],

    queEs: [
      "Es el método de extracción más completo de `RegExp`: expone la coincidencia, el índice, el texto original y los grupos. 🧭",
      "Es la base sobre la que funcionan internamente `String.prototype.match()` y `String.prototype.matchAll()`.",
    ],

    paraQueSirve: [
      "🎯 Extraer un fragmento concreto de un texto y saber dónde estaba.",
      "🧩 Leer grupos de captura, por ejemplo el año y el mes de una fecha.",
      "🔁 Recorrer todas las coincidencias cuando el patrón tiene la bandera `g`.",
      "🧪 Inspeccionar el resultado detallado de un patrón durante una prueba.",
    ],

    comoFunciona: [
      "Recibe el texto y busca la siguiente coincidencia del patrón.",
      "Si la encuentra, devuelve un array cuya posición `0` es el texto coincidente.",
      "Ese array añade las propiedades `index` (posición inicial) y `input` (texto original).",
      "Los grupos de captura aparecen en las posiciones `1`, `2`, etc.; los grupos con nombre se guardan en `.groups`.",
      "Con la bandera `g`, cada llamada empieza en `lastIndex` y lo actualiza; al terminar devuelve `null` y reinicia el índice a `0`.",
    ],

    sintaxis: [
      {
        code: `const resultado = /\\d+/.exec("Pedido 42");`,
      },
      {
        caption: "Leer la coincidencia, su posición y los grupos:",
        code: `const patron = /(\\d{4})-(\\d{2})-(\\d{2})/;
const resultado = patron.exec("Fecha: 2026-11-03");
console.log(resultado[0]); // 2026-11-03
console.log(resultado[1]); // 2026
console.log(resultado.index); // 7`,
      },
      {
        caption: "Recorrer todas las coincidencias con g:",
        code: `const patron = /\\d+/g;
let coincidencia;
while ((coincidencia = patron.exec("12 y 34")) !== null) {
  console.log(coincidencia[0], coincidencia.index);
}`,
      },
    ],

    nota: "💡 Con la bandera `g` debes recorrer con un bucle hasta obtener `null`; si llamas a `exec()` una sola vez solo obtendrás la primera coincidencia y `lastIndex` quedará a medias.",

    ejemplos: [
      {
        titulo: "1. 🎯 Primera coincidencia",
        code: `const resultado = /mundo/.exec("Hola mundo");
console.log(resultado[0]); // mundo
console.log(resultado.index); // 5
console.log(resultado.input); // Hola mundo`,
      },
      {
        titulo: "2. 🧩 Grupos de captura",
        code: `const patron = /(\\w+)@(\\w+)\\.com/;
const resultado = patron.exec("Contacto: ana@mail.com");
console.log(resultado[1]); // ana
console.log(resultado[2]); // mail`,
      },
      {
        titulo: "3. 🔁 Todas las coincidencias",
        code: `const patron = /\\d+/g;
let resultado;
while ((resultado = patron.exec("3 manzanas y 12 peras")) !== null) {
  console.log(resultado[0], "en", resultado.index);
}
// 3 en 0
// 12 en 13`,
      },
      {
        titulo: "4. 🏷️ Grupos con nombre",
        code: `const patron = /(?<usuario>\\w+)@(?<dominio>[\\w.]+)/;
const resultado = patron.exec("ana@mail.com");
console.log(resultado.groups.usuario); // ana
console.log(resultado.groups.dominio); // mail.com`,
      },
    ],

    errores: [
      "**No comprobar `null`:** si el patrón no coincide, `resultado[0]` lanza `TypeError: Cannot read properties of null`.",
      "**Olvidar la bandera `g` al iterar:** sin `g`, `lastIndex` no avanza y el bucle `while` se vuelve infinito.",
      "**Confundir `index` con la longitud:** `index` es la posición inicial de la coincidencia, no cuántos caracteres ocupa.",
      "**Esperar un array normal:** el resultado es un array con propiedades extra; por eso `JSON.stringify()` no incluye `index` ni `groups`.",
      "**Reutilizar un patrón global entre funciones:** el `lastIndex` compartido provoca saltos inesperados; reinícialo o crea otro patrón.",
    ],

    casos: [
      "🎯 Extraer el dominio y el usuario de una dirección de correo.",
      "📅 Descomponer una fecha ISO en año, mes y día.",
      "💬 Recorrer todas las menciones `@usuario` de un comentario.",
      "🧾 Analizar líneas de un archivo con un formato fijo.",
    ],

    relacion: [
      "**`test()`:** solo dice si hay coincidencia; `exec()` además la describe.",
      "**`String.prototype.match()`:** sin `g` devuelve lo mismo que `exec()`; con `g` devuelve solo los textos.",
      "**`String.prototype.matchAll()`:** devuelve un iterador con todos los resultados detallados, sin bucle manual.",
      "**`lastIndex`:** propiedad que `exec()` lee y actualiza cuando el patrón es global.",
      "**Grupos de captura:** paréntesis del patrón cuyos valores aparecen en el array resultado.",
    ],

    analogia:
      "`exec()` es como un detective que no solo confirma que encontró una pista, sino que además anota dónde estaba, cómo era y qué partes la componían. 🕵️ Con la bandera `g` es un detective que sigue buscando pistas nuevas cada vez que se le llama, hasta que ya no queda ninguna y devuelve `null`.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Devuelve un array o `null`, nunca `undefined`.",
      "✅ `resultado[0]` es la coincidencia completa.",
      "✅ `index` es la posición inicial y `input` el texto original.",
      "🔁 Con `g`, itera hasta `null` y recuerda que al final `lastIndex` vuelve a 0.",
      "🏷️ Los grupos con nombre están en `resultado.groups`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve exec() cuando no encuentra coincidencias?",
        opciones: ["Un array vacío", "null", "undefined", "false"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Dónde se guarda la posición inicial de la coincidencia?",
        opciones: ["resultado[0]", "resultado.index", "resultado.position", "resultado.start"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué hace la bandera g en exec()?",
        opciones: [
          "Ignora mayúsculas",
          "Busca todas las coincidencias avanzando lastIndex",
          "Devuelve null siempre",
          "Convierte el resultado en string",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "En /(\\d+)-(\\d+)/.exec('12-34'), ¿qué contiene resultado[1]?",
        opciones: ["'12-34'", "'12'", "'34'", "12"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué propiedad contiene los grupos con nombre?",
        opciones: ["resultado.named", "resultado.groups", "resultado.captures", "resultado.index"],
        correcta: 1,
      },
    ],
  },

  "regexp-string-match": {
    id: "regexp-string-match",
    titulo: "String.prototype.match()",
    icon: "🧩",
    categoria: "RegExp",
    firma: "texto.match(regex)",

    definicion: [
      "Es un método de `String` que busca un patrón y devuelve la primera coincidencia o una lista con todas, según las banderas del patrón. 🧩",
      "Si no encuentra nada, devuelve `null`.",
    ],

    queEs: [
      "Es un atajo práctico sobre `RegExp.prototype.exec()` que se lee de izquierda a derecha: primero el texto, después el patrón. 🔄",
      "Su comportamiento cambia de forma importante según use o no la bandera `g`.",
    ],

    paraQueSirve: [
      "🧩 Obtener la primera coincidencia de un patrón sin escribir un bucle.",
      "📋 Recolectar todos los fragmentos que cumplen un patrón con la bandera `g`.",
      "🏷️ Leer grupos de captura cuando el patrón no es global.",
      "🔎 Extraer números, palabras o etiquetas de un texto de forma rápida.",
    ],

    comoFunciona: [
      "Convierte el argumento en un `RegExp` si se pasa una cadena.",
      "Sin la bandera `g`, equivale a `regex.exec(texto)`: devuelve un array con `index`, `input` y grupos.",
      "Con la bandera `g`, recorre todas las coincidencias y devuelve un array de strings.",
      "En el modo global **no** incluye `index`, `input` ni grupos de captura.",
      "Si no hay coincidencias devuelve `null`, no un array vacío.",
    ],

    sintaxis: [
      {
        code: `const primera = texto.match(/\\d+/);`,
      },
      {
        caption: "Todas las coincidencias con g:",
        code: `const numeros = "3 peras y 12 manzanas".match(/\\d+/g);
console.log(numeros); // ["3", "12"]`,
      },
      {
        caption: "Primera coincidencia con grupos:",
        code: `const resultado = "ana@mail.com".match(/(\\w+)@(\\w+)/);
console.log(resultado[0]); // ana@mail
console.log(resultado[1]); // ana`,
      },
    ],

    nota: "💡 Si necesitas todas las coincidencias **y** sus grupos o posiciones, usa `matchAll()`: `match()` con `g` descarta esa información.",

    ejemplos: [
      {
        titulo: "1. 🧩 Primera coincidencia",
        code: `const resultado = "Hola mundo".match(/mundo/);
console.log(resultado[0]); // mundo
console.log(resultado.index); // 5`,
      },
      {
        titulo: "2. 📋 Todas las palabras",
        code: `const palabras = "uno dos tres".match(/\\w+/g);
console.log(palabras); // ["uno", "dos", "tres"]`,
      },
      {
        titulo: "3. 🔢 Extraer números",
        code: `const precios = "Pan 2, leche 3 y café 5".match(/\\d+/g);
console.log(precios); // ["2", "3", "5"]`,
      },
      {
        titulo: "4. 🏷️ Grupos de una fecha",
        code: `const fecha = "2026-11-03".match(/(\\d{4})-(\\d{2})-(\\d{2})/);
console.log(fecha[1], fecha[2], fecha[3]); // 2026 11 03`,
      },
    ],

    errores: [
      "**No comprobar `null`:** si no hay coincidencia, acceder a `resultado[0]` lanza un `TypeError`.",
      "**Esperar grupos con `g`:** en modo global el resultado solo contiene strings; los grupos se pierden.",
      "**Esperar `index` con `g`:** el array global no tiene la propiedad `index`.",
      "**Creer que devuelve un array vacío:** cuando no encuentra nada devuelve `null`.",
      "**Confundir `match()` con `test()`:** `test()` devuelve un booleano; `match()` devuelve datos de la coincidencia.",
    ],

    casos: [
      "📋 Obtener todas las etiquetas `#hashtag` de una publicación.",
      "🔢 Extraer todos los números de una factura en texto.",
      "🧩 Leer el primer enlace o correo de un párrafo.",
      "🏷️ Capturar partes de una fecha o de un código con grupos.",
    ],

    relacion: [
      "**`exec()`:** devuelve un resultado detallado por cada llamada; `match()` lo automatiza.",
      "**`matchAll()`:** conserva índices y grupos al recorrer todas las coincidencias.",
      "**`test()`:** solo comprueba existencia y devuelve un booleano.",
      "**`search()`:** devuelve únicamente la posición de la primera coincidencia.",
      "**`replace()`:** usa el mismo motor de patrones para sustituir texto.",
    ],

    analogia:
      "`match()` es como pedir fotos de un paisaje. 📸 Sin la bandera `g` te entregan una sola foto con todos los detalles del reverso (dónde se tomó y qué personas salen). Con `g` te entregan un álbum con todas las fotos, pero sin comentarios ni ubicaciones: solo las imágenes.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Devuelve un array o `null`.",
      "✅ Sin `g` incluye `index`, `input` y grupos.",
      "✅ Con `g` devuelve solo los textos coincidentes.",
      "⚠️ `match()` con `g` no sirve para leer grupos de captura.",
      "💡 Para todo a la vez: `matchAll()`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve 'hola'.match(/adios/)?",
        opciones: ["[]", "null", "undefined", "false"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve 'a1 b2'.match(/\\d/g)?",
        opciones: ["['1', '2']", "['a1', 'b2']", "null", "2"],
        correcta: 0,
      },
      {
        id: 3,
        pregunta: "¿Qué información se pierde con match() y la bandera g?",
        opciones: [
          "Las coincidencias",
          "Los índices y los grupos de captura",
          "El texto original",
          "Las mayúsculas",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "Sin bandera g, ¿qué propiedad indica la posición de la coincidencia?",
        opciones: ["match.index", "match.position", "match.start", "match.offset"],
        correcta: 0,
      },
      {
        id: 5,
        pregunta: "¿Qué método conviene usar para obtener todas las coincidencias con sus grupos?",
        opciones: ["test()", "search()", "matchAll()", "split()"],
        correcta: 2,
      },
    ],
  },

  "regexp-string-matchall": {
    id: "regexp-string-matchall",
    titulo: "String.prototype.matchAll()",
    icon: "🔁",
    categoria: "RegExp",
    firma: "texto.matchAll(regex)",

    definicion: [
      "Es un método de `String` que devuelve un **iterador** con todas las coincidencias de un patrón global, incluyendo índice, texto original y grupos. 🔁",
      "Cada elemento del iterador tiene la misma forma que el resultado de `exec()`.",
    ],

    queEs: [
      "Es la versión moderna y segura de recorrer todas las coincidencias sin manipular `lastIndex` a mano. 🆕",
      "Exige que el patrón tenga la bandera `g`; sin ella lanza un `TypeError`.",
    ],

    paraQueSirve: [
      "🔁 Recorrer todas las coincidencias conservando sus posiciones y grupos.",
      "🏷️ Extraer datos estructurados de un texto repetido, como fechas o menciones.",
      "🧩 Evitar los bucles manuales con `exec()` y `lastIndex`.",
      "📋 Convertir un iterador en array para filtrar, mapear o contar resultados.",
    ],

    comoFunciona: [
      "Comprueba que el patrón sea global; si no lo es, lanza `TypeError: String.prototype.matchAll called with a non-global RegExp argument`.",
      "Devuelve un iterador perezoso: no calcula todas las coincidencias hasta que se consume.",
      "Cada coincidencia es un array como el de `exec()`: texto completo, grupos, `index`, `input` y `groups`.",
      "Trabaja sobre una copia del patrón, por lo que no modifica el `lastIndex` del original.",
      "Se consume con `for...of`, con el operador spread `[...]` o con `Array.from()`.",
    ],

    sintaxis: [
      {
        code: `const coincidencias = texto.matchAll(/\\d+/g);`,
      },
      {
        caption: "Recorrer con for...of:",
        code: `for (const coincidencia of "3 y 12".matchAll(/\\d+/g)) {
  console.log(coincidencia[0], coincidencia.index);
}`,
      },
      {
        caption: "Convertir el iterador en array para usar métodos:",
        code: `const lista = [...texto.matchAll(/(\\w+)@(\\w+)/g)];
const correos = lista.map((c) => c[0]);
console.log(correos);`,
      },
    ],

    nota: "💡 `matchAll()` no devuelve un array: devuelve un iterador. Por eso no tiene `length` ni se puede acceder con `[0]`; conviértelo con `[...resultado]` si necesitas un array.",

    ejemplos: [
      {
        titulo: "1. 🔁 Recorrer todas las palabras",
        code: `for (const resultado of "uno dos tres".matchAll(/\\w+/g)) {
  console.log(resultado[0], resultado.index);
}
// uno 0
// dos 4
// tres 8`,
      },
      {
        titulo: "2. 📋 Convertir en array",
        code: `const numeros = [..."3 peras y 12 manzanas".matchAll(/\\d+/g)];
console.log(numeros.length); // 2
console.log(numeros[0][0]); // 3`,
      },
      {
        titulo: "3. 🏷️ Grupos con nombre",
        code: `const patron = /(?<usuario>\\w+)@(?<dominio>[\\w.]+)/g;
for (const c of "ana@mail.com y luis@web.es".matchAll(patron)) {
  console.log(c.groups.usuario, c.groups.dominio);
}`,
      },
      {
        titulo: "4. 📅 Extraer fechas con su posición",
        code: `const texto = "Inicio 2026-01-05, fin 2026-12-20";
const fechas = [...texto.matchAll(/(\\d{4})-(\\d{2})-(\\d{2})/g)];
console.log(fechas.map((f) => f[0]));
console.log(fechas[0].index); // 7`,
      },
    ],

    errores: [
      "**Olvidar la bandera `g`:** `matchAll()` lanza `TypeError` con un patrón no global.",
      "**Tratarlo como array:** el iterador no tiene `length` ni índices; usa spread o `Array.from()`.",
      "**Reutilizar un iterador agotado:** una vez consumido no vuelve a empezar; crea uno nuevo si lo necesitas dos veces.",
      "**Modificar el texto mientras iteras:** los índices calculados dejan de ser fiables.",
      "**Confundir el `lastIndex` del patrón:** `matchAll()` no lo modifica; si esperabas ese efecto, no ocurre.",
    ],

    casos: [
      "💬 Extraer todas las menciones `@usuario` con su posición.",
      "📅 Analizar varias fechas dentro de un documento largo.",
      "🏷️ Leer etiquetas HTML simples o marcadores personalizados.",
      "📊 Contar y clasificar coincidencias sin escribir bucles con `exec()`.",
    ],

    relacion: [
      "**`match()`:** con `g` devuelve solo textos; `matchAll()` añade índices y grupos.",
      "**`exec()`:** obtiene una coincidencia por llamada; `matchAll()` las genera todas.",
      "**`lastIndex`:** `matchAll()` usa una copia del patrón y no altera el original.",
      "**Iteradores:** el resultado se consume con `for...of`, spread o `Array.from()`.",
      "**`replaceAll()`:** comparte la exigencia de la bandera `g` en patrones.",
    ],

    analogia:
      "`matchAll()` es como recibir una cinta transportadora con todas las piezas encontradas. 🎞️ Cada vez que tomas una, obtienes la pieza, su etiqueta y el lugar exacto donde estaba. `match()` con `g`, en cambio, te da solo una bolsa con las piezas, sin etiquetas ni posiciones.",

    fuente: "MDN Web Docs · ECMAScript 2020",

    notasPersonales: [
      "✅ Requiere obligatoriamente la bandera `g`.",
      "✅ Devuelve un iterador, no un array.",
      "✅ Cada elemento conserva `index`, `input` y `groups`.",
      "⚠️ El iterador se consume una sola vez.",
      "💡 `[...texto.matchAll(patron)]` es el patrón habitual.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué ocurre si se llama a matchAll() con un patrón sin g?",
        opciones: [
          "Devuelve null",
          "Lanza un TypeError",
          "Devuelve solo la primera coincidencia",
          "Funciona igual",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve matchAll()?",
        opciones: ["Un array", "Un iterador", "Un string", "Un booleano"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Cómo se convierte el resultado en un array?",
        opciones: [
          "resultado.toArray()",
          "Array.from(resultado) o [...resultado]",
          "resultado.array()",
          "JSON.parse(resultado)",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué propiedad de cada coincidencia indica dónde empieza?",
        opciones: ["start", "index", "position", "offset"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué diferencia clave tiene con match() y g?",
        opciones: [
          "Conserva índices y grupos de captura",
          "Ignora mayúsculas automáticamente",
          "Solo funciona con números",
          "Devuelve un string",
        ],
        correcta: 0,
      },
    ],
  },

  "regexp-string-replace": {
    id: "regexp-string-replace",
    titulo: "String.prototype.replace() con RegExp",
    icon: "🔄",
    categoria: "RegExp",
    firma: "texto.replace(regex, reemplazo)",

    definicion: [
      "Es un método de `String` que devuelve una **copia** del texto con la primera coincidencia del patrón sustituida por el reemplazo indicado. 🔄",
      "El string original nunca se modifica, porque los strings en JavaScript son inmutables.",
    ],

    queEs: [
      "Es la forma estándar de sustituir fragmentos que siguen un patrón, no solo texto literal. 🔧",
      "El reemplazo puede ser una cadena con comodines o una función que calcula el valor.",
    ],

    paraQueSirve: [
      "🔄 Cambiar la primera aparición de un patrón por otro texto.",
      "🧹 Limpiar espacios, guiones o caracteres no deseados.",
      "🏷️ Reordenar grupos de captura, por ejemplo pasar de `nombre apellido` a `apellido, nombre`.",
      "🎭 Enmascarar datos sensibles como correos o teléfonos.",
    ],

    comoFunciona: [
      "Busca la primera coincidencia del patrón dentro del texto.",
      "Si el patrón tiene la bandera `g`, sustituye **todas** las coincidencias.",
      "Si el reemplazo es una cadena, admite comodines como `$1`, `$&` o `$<nombre>`.",
      "Si el reemplazo es una función, recibe la coincidencia, los grupos, el índice y el texto original.",
      "Devuelve un string nuevo; no altera la variable original.",
    ],

    sintaxis: [
      {
        code: `const nuevo = texto.replace(/patron/, "reemplazo");`,
      },
      {
        caption: "Comodines habituales en el reemplazo:",
        code: `const nuevo = "Ana Pérez".replace(/(\\w+) (\\w+)/, "$2, $1");
// Pérez, Ana

// $&  -> coincidencia completa
// $1  -> primer grupo
// $<nombre> -> grupo con nombre`,
      },
      {
        caption: "Reemplazo con función:",
        code: `const nuevo = "a1 b2".replace(/\\d/g, (numero) => String(Number(numero) * 2));
console.log(nuevo); // a2 b4`,
      },
    ],

    nota: "💡 Sin la bandera `g`, `replace()` solo cambia la **primera** coincidencia. Para sustituir todas, usa `/patrón/g` o `replaceAll()`.",

    ejemplos: [
      {
        titulo: "1. 🔄 Primera sustitución",
        code: `const texto = "hola mundo mundo";
console.log(texto.replace(/mundo/, "JS"));
// hola JS mundo`,
      },
      {
        titulo: "2. 🌍 Sustituir todas con g",
        code: `const texto = "hola mundo mundo";
console.log(texto.replace(/mundo/g, "JS"));
// hola JS JS`,
      },
      {
        titulo: "3. 🏷️ Reordenar con grupos",
        code: `const nombre = "Ana Pérez";
console.log(nombre.replace(/(\\w+) (\\w+)/, "$2, $1"));
// Pérez, Ana`,
      },
      {
        titulo: "4. 🎭 Enmascarar con una función",
        code: `const correo = "ana@mail.com";
const oculto = correo.replace(/(\\w+)@/, (_, usuario) => {
  return usuario[0] + "***@";
});
console.log(oculto); // a***@mail.com`,
      },
    ],

    errores: [
      "**Esperar que sustituya todo:** sin `g` solo cambia la primera coincidencia.",
      "**Usar `$` literal en el reemplazo:** `$&`, `$1` y `$$` tienen significado especial; para un dólar literal escribe `$$`.",
      "**Olvidar escapar el punto:** `/www.ejemplo.com/` también coincide con `wwwXejemploYcom`.",
      "**Creer que modifica el string:** los strings son inmutables; hay que guardar el resultado.",
      "**Devolver `undefined` en la función de reemplazo:** se inserta literalmente el texto `\"undefined\"`.",
    ],

    casos: [
      "🧹 Normalizar espacios múltiples en un párrafo.",
      "📞 Enmascarar parte de un teléfono o un correo antes de mostrarlo.",
      "🏷️ Convertir `apellido, nombre` en `nombre apellido`.",
      "🔗 Cambiar el dominio de todas las URL de un texto.",
    ],

    relacion: [
      "**`replaceAll()`:** sustituye todas las coincidencias y exige `g` si se usa un patrón.",
      "**`match()`:** encuentra coincidencias; `replace()` las transforma.",
      "**Grupos de captura:** permiten reutilizar partes del texto encontrado.",
      "**`split()` y `join()`:** alternativa para sustituciones simples de texto literal.",
      "**Funciones de reemplazo:** reciben la coincidencia, los grupos, el índice y el texto completo.",
    ],

    analogia:
      "`replace()` es como un corrector con una sola pasada de pintura blanca. 🖌️ Sin la bandera `g`, tapa únicamente la primera palabra que coincide y deja las demás intactas. Con `g`, recorre todo el documento y corrige cada aparición, siempre sobre una fotocopia: el original queda sin tocar.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Devuelve un string nuevo.",
      "✅ Sin `g` solo reemplaza la primera coincidencia.",
      "✅ El reemplazo puede ser string o función.",
      "💡 `$1`, `$&` y `$<nombre>` son comodines del reemplazo.",
      "⚠️ Para un `$` literal, escribe `$$`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Cuántas coincidencias sustituye replace() sin la bandera g?",
        opciones: ["Todas", "Solo la primera", "Ninguna", "Solo la última"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué representa $1 en el reemplazo?",
        opciones: [
          "El texto original",
          "El primer grupo de captura",
          "Un dólar literal",
          "La posición de la coincidencia",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve replace()?",
        opciones: [
          "El mismo string modificado",
          "Un string nuevo",
          "Un array de coincidencias",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué comodín representa la coincidencia completa?",
        opciones: ["$0", "$&", "$*", "$full"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué pasa si la función de reemplazo no devuelve nada?",
        opciones: [
          "Se mantiene el texto original",
          "Se inserta 'undefined'",
          "Lanza un error",
          "Se elimina la coincidencia",
        ],
        correcta: 1,
      },
    ],
  },

  "regexp-string-replaceall": {
    id: "regexp-string-replaceall",
    titulo: "String.prototype.replaceAll() con RegExp",
    icon: "♻️",
    categoria: "RegExp",
    firma: "texto.replaceAll(regex, reemplazo)",

    definicion: [
      "Es un método de `String` que devuelve una copia del texto con **todas** las coincidencias del patrón sustituidas. ♻️",
      "Cuando recibe un `RegExp`, ese patrón debe incluir obligatoriamente la bandera `g`.",
    ],

    queEs: [
      "Es la alternativa moderna a `replace()` con `/g`, pensada para dejar clara la intención de sustituir todo. 🆕",
      "También acepta un string como primer argumento, caso en el que sustituye todas las apariciones literales.",
    ],

    paraQueSirve: [
      "♻️ Reemplazar todas las apariciones de un patrón sin depender de recordar la `g`.",
      "🧹 Limpiar un texto completo: espacios, saltos de línea o signos repetidos.",
      "🎭 Enmascarar todos los correos o teléfonos de una lista.",
      "🔗 Actualizar de una vez todas las URL o etiquetas de un documento.",
    ],

    comoFunciona: [
      "Verifica que el primer argumento sea un `RegExp` global; si no lo es, lanza un `TypeError`.",
      "Recorre el texto y sustituye cada coincidencia, no solo la primera.",
      "El reemplazo puede ser una cadena con comodines (`$1`, `$&`, `$<nombre>`) o una función.",
      "Si el reemplazo es una función, se ejecuta una vez por cada coincidencia.",
      "Devuelve un string nuevo y no modifica el original.",
    ],

    sintaxis: [
      {
        code: `const nuevo = texto.replaceAll(/patron/g, "reemplazo");`,
      },
      {
        caption: "Con función de reemplazo:",
        code: `const nuevo = "a1 b2".replaceAll(/\\d/g, (numero) => String(Number(numero) * 2));
console.log(nuevo); // a2 b4`,
      },
      {
        caption: "Error típico si se olvida la g:",
        code: `// TypeError: replaceAll must be called with a global RegExp
texto.replaceAll(/patron/, "reemplazo");`,
      },
    ],

    nota: "💡 `replaceAll()` no es solo un alias de `replace()`: con un `RegExp` sin `g` lanza un `TypeError`, mientras que `replace()` acepta el mismo patrón y sustituye solo la primera coincidencia.",

    ejemplos: [
      {
        titulo: "1. ♻️ Sustituir todas las apariciones",
        code: `const texto = "sol sol sol";
console.log(texto.replaceAll(/sol/g, "luna"));
// luna luna luna`,
      },
      {
        titulo: "2. 🧹 Normalizar espacios",
        code: `const texto = "uno    dos   tres";
console.log(texto.replaceAll(/\\s+/g, " "));
// uno dos tres`,
      },
      {
        titulo: "3. 🎭 Enmascarar todos los correos",
        code: `const texto = "ana@mail.com y luis@web.es";
const oculto = texto.replaceAll(/[\\w.]+@/g, "***@");
console.log(oculto); // ***@mail.com y ***@web.es`,
      },
      {
        titulo: "4. 🏷️ Usar grupos con función",
        code: `const texto = "2026-01-05 y 2026-12-20";
const cambiado = texto.replaceAll(/(\\d{4})-(\\d{2})-(\\d{2})/g, (_, a, m, d) => {
  return d + "/" + m + "/" + a;
});
console.log(cambiado); // 05/01/2026 y 20/12/2026`,
      },
    ],

    errores: [
      "**Pasar un `RegExp` sin `g`:** lanza `TypeError: replaceAll must be called with a global RegExp`.",
      "**Confundir con `replace()`:** `replace()` sin `g` solo cambia la primera coincidencia y no lanza error.",
      "**Olvidar `$` especiales:** en el reemplazo, `$&`, `$1` y `$$` se interpretan como comodines.",
      "**Creer que modifica el texto:** devuelve un string nuevo; hay que asignarlo.",
      "**Usar `replaceAll` con un motor antiguo:** no existe en navegadores previos a 2020; comprueba la compatibilidad.",
    ],

    casos: [
      "🧹 Reemplazar todos los saltos de línea por espacios.",
      "🎭 Ocultar todos los correos de un registro antes de compartirlo.",
      "🔗 Cambiar el dominio de todas las URL de un documento.",
      "📝 Sustituir varias palabras prohibidas en un comentario.",
    ],

    relacion: [
      "**`replace()`:** versión clásica; con `g` se comporta de forma parecida.",
      "**`matchAll()`:** también exige la bandera `g` en el patrón.",
      "**`split()` + `join()`:** alternativa para sustituciones literales sencillas.",
      "**Expresiones regulares:** aportan patrones en lugar de texto exacto.",
      "**Funciones de reemplazo:** permiten transformar cada coincidencia de forma distinta.",
    ],

    analogia:
      "`replaceAll()` es como una fotocopiadora que corrige todas las erratas del documento de una sola pasada. ♻️ Si le entregas las instrucciones sin la marca de «todas» (la bandera `g`), se niega a empezar y avisa del error, en lugar de corregir solo la primera como haría `replace()`.",

    fuente: "MDN Web Docs · ECMAScript 2021",

    notasPersonales: [
      "✅ Sustituye todas las coincidencias.",
      "✅ Con `RegExp`, exige la bandera `g`.",
      "✅ Acepta string o función como reemplazo.",
      "⚠️ No modifica el original: devuelve uno nuevo.",
      "💡 Si dudas de la compatibilidad, usa `replace()` con `/g`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué ocurre con replaceAll(/a/, 'b')?",
        opciones: [
          "Sustituye solo la primera a",
          "Lanza un TypeError por no ser global",
          "Sustituye todas",
          "Devuelve null",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué bandera debe tener el RegExp de replaceAll()?",
        opciones: ["i", "m", "g", "s"],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve replaceAll()?",
        opciones: ["Un array", "Un string nuevo", "El texto modificado", "Un booleano"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿En qué se diferencia de replace() con /g?",
        opciones: [
          "replaceAll() no admite funciones",
          "replaceAll() exige la g y deja clara la intención",
          "replaceAll() solo acepta strings",
          "No hay ninguna diferencia",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué pasa si el reemplazo es una función?",
        opciones: [
          "Se ejecuta una vez por cada coincidencia",
          "Se ejecuta solo al final",
          "No se permite",
          "Se convierte en string",
        ],
        correcta: 0,
      },
    ],
  },

  "regexp-string-split": {
    id: "regexp-string-split",
    titulo: "String.prototype.split() con RegExp",
    icon: "✂️",
    categoria: "RegExp",
    firma: "texto.split(regex, limite)",

    definicion: [
      "Es un método de `String` que divide el texto usando un patrón como separador y devuelve un **array** con las partes resultantes. ✂️",
      "El separador puede ser texto literal o una expresión regular, lo que permite dividir por varios formatos a la vez.",
    ],

    queEs: [
      "Es la herramienta clásica para convertir una cadena en una lista de fragmentos. 📋",
      "A diferencia de otros métodos, el separador no forma parte del resultado salvo que esté dentro de un grupo de captura.",
    ],

    paraQueSirve: [
      "✂️ Dividir por espacios, comas, puntos y coma o saltos de línea.",
      "📋 Procesar listas escritas como `\"manzana, pera, uva\"`.",
      "🧹 Ignorar espacios variables alrededor de un separador.",
      "🔢 Limitar la cantidad de partes con el segundo argumento.",
    ],

    comoFunciona: [
      "Recorre el texto buscando coincidencias del separador.",
      "Cada coincidencia marca un corte; el separador se descarta.",
      "Devuelve un array con los fragmentos entre cortes.",
      "Si el patrón contiene grupos de captura, los textos capturados **se incluyen** en el array.",
      "El segundo argumento `limite` corta el array cuando alcanza esa cantidad de elementos.",
    ],

    sintaxis: [
      {
        code: `const partes = texto.split(/\\s+/);`,
      },
      {
        caption: "Separadores alternativos:",
        code: `const partes = "a, b; c".split(/[,;]\\s*/);
console.log(partes); // ["a", "b", "c"]`,
      },
      {
        caption: "Limitar el número de resultados:",
        code: `const partes = "uno dos tres cuatro".split(/\\s+/, 2);
console.log(partes); // ["uno", "dos"]`,
      },
    ],

    nota: "💡 Si el patrón usa grupos de captura, `split()` los añade al array como elementos extra. Para un corte limpio, usa grupos no capturadores `(?:...)` o evita los paréntesis.",

    ejemplos: [
      {
        titulo: "1. ✂️ Dividir por espacios",
        code: `const texto = "uno  dos   tres";
console.log(texto.split(/\\s+/));
// ["uno", "dos", "tres"]`,
      },
      {
        titulo: "2. 📋 Lista con comas y espacios",
        code: `const lista = "manzana, pera , uva";
console.log(lista.split(/\\s*,\\s*/));
// ["manzana", "pera", "uva"]`,
      },
      {
        titulo: "3. 🧩 Conservar el separador con un grupo",
        code: `const texto = "a-b_c";
console.log(texto.split(/([-_])/));
// ["a", "-", "b", "_", "c"]`,
      },
      {
        titulo: "4. 🔢 Limitar las partes",
        code: `const texto = "2026-11-03";
console.log(texto.split(/-/, 2));
// ["2026", "11"]`,
      },
    ],

    errores: [
      "**Usar grupos por accidente:** `split(/(\\s+)/)` devuelve también los espacios como elementos.",
      "**Esperar que el separador se conserve:** sin grupos de captura, el separador desaparece del resultado.",
      "**Usar un límite de 0:** `split(/\\s+/, 0)` devuelve un array vacío porque no se permite ninguna parte.",
      "**Dividir con una cadena vacía:** `split(\"\")` separa por unidades de código, lo que puede romper emojis compuestos.",
      "**Confundir el array con el texto:** `split()` siempre devuelve un array, aunque no haya separadores.",
    ],

    casos: [
      "📋 Procesar una lista de etiquetas separadas por comas.",
      "✂️ Dividir las líneas de un archivo de texto con `/\\r?\\n/`.",
      "🔢 Separar una fecha o un código por guiones.",
      "🧹 Limpiar y dividir entradas escritas con espacios irregulares.",
    ],

    relacion: [
      "**`Array.prototype.join()`:** hace el proceso inverso, unir un array en un string.",
      "**`replaceAll()`:** sustituye el separador en lugar de dividir.",
      "**`match()`:** extrae las coincidencias en lugar de las partes entre ellas.",
      "**Grupos de captura:** modifican el resultado de `split()` al añadir los separadores capturados.",
      "**Banderas:** `u` ayuda a dividir texto con emojis sin romper pares surrogados.",
    ],

    analogia:
      "`split()` es como cortar una barra de pan por las marcas que ya tiene. 🥖 El cuchillo (el patrón) marca dónde cortar, pero las marcas no se guardan en los trozos. Si dejas una marca dentro de un aro (un grupo de captura), esa marca también acaba en el plato.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Devuelve siempre un array.",
      "✅ El separador se descarta, salvo en grupos de captura.",
      "✅ El segundo argumento limita el número de partes.",
      "⚠️ Los grupos capturados añaden elementos al resultado.",
      "💡 Para separar por saltos de línea: `/\\r?\\n/`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve 'a,b,c'.split(/,/)?",
        opciones: ["'abc'", "['a', 'b', 'c']", "['a,b,c']", "3"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué ocurre si el patrón tiene grupos de captura?",
        opciones: [
          "Se ignoran",
          "Los separadores capturados se incluyen en el array",
          "Lanza un error",
          "Se duplican los elementos",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Para qué sirve el segundo argumento de split()?",
        opciones: [
          "Para ignorar mayúsculas",
          "Para limitar el número de elementos",
          "Para unir el resultado",
          "Para convertir a números",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué devuelve 'uno dos'.split(/\\s+/, 1)?",
        opciones: ["['uno']", "['uno', 'dos']", "['dos']", "[]"],
        correcta: 0,
      },
      {
        id: 5,
        pregunta: "¿Qué método hace lo inverso de split()?",
        opciones: ["slice()", "join()", "concat()", "trim()"],
        correcta: 1,
      },
    ],
  },

  "regexp-string-search": {
    id: "regexp-string-search",
    titulo: "String.prototype.search()",
    icon: "🔍",
    categoria: "RegExp",
    firma: "texto.search(regex)",

    definicion: [
      "Es un método de `String` que devuelve la **posición** de la primera coincidencia de un patrón, o `-1` si no la encuentra. 🔍",
      "No devuelve el texto encontrado ni los grupos de captura: solo el índice.",
    ],

    queEs: [
      "Es la versión de búsqueda posicional: responde «¿dónde está?» en lugar de «¿existe?» o «¿qué es?». 📍",
      "Ignora la bandera `g` y el estado de `lastIndex`: siempre empieza desde el principio.",
    ],

    paraQueSirve: [
      "🔍 Saber en qué posición empieza un patrón dentro de un texto.",
      "🚦 Ordenar o comparar fragmentos según la posición de una palabra.",
      "🧹 Detectar si un carácter aparece y dónde, sin extraerlo.",
      "📄 Localizar encabezados o marcas en un documento de texto.",
    ],

    comoFunciona: [
      "Convierte el argumento en un `RegExp` si recibe una cadena.",
      "Busca la primera coincidencia desde el inicio del texto.",
      "Devuelve el índice de su primer carácter, contando desde `0`.",
      "Si no hay coincidencia, devuelve `-1`.",
      "La bandera `g` no cambia el resultado; `lastIndex` no se usa ni se modifica.",
    ],

    sintaxis: [
      {
        code: `const posicion = texto.search(/patron/);`,
      },
      {
        caption: "Comprobar si existe y dónde:",
        code: `const texto = "Pedido 42 confirmado";
const posicion = texto.search(/\\d+/);
if (posicion !== -1) {
  console.log("Los números empiezan en", posicion); // 7
}`,
      },
      {
        caption: "Con un patrón construido dinámicamente:",
        code: `const palabra = "confirmado";
const posicion = texto.search(new RegExp(palabra, "i"));
console.log(posicion); // 10`,
      },
    ],

    nota: "💡 `search()` devuelve un índice, no un booleano ni un array. Compara siempre con `-1` para saber si no hubo coincidencia; recuerda que la posición `0` es válida y es falsy.",

    ejemplos: [
      {
        titulo: "1. 🔍 Posición de una palabra",
        code: `console.log("Hola mundo".search(/mundo/)); // 5
console.log("Hola mundo".search(/adios/)); // -1`,
      },
      {
        titulo: "2. 🔢 Primer dígito",
        code: `const texto = "Pedido 42";
console.log(texto.search(/\\d/)); // 7`,
      },
      {
        titulo: "3. 🔠 Ignorar mayúsculas",
        code: `console.log("Aprender JavaScript".search(/javascript/i)); // 9`,
      },
      {
        titulo: "4. 🧹 Primer espacio en blanco",
        code: `const texto = "uno dos tres";
console.log(texto.search(/\\s/)); // 3`,
      },
    ],

    errores: [
      "**Esperar un array:** `search()` devuelve un número, no la coincidencia.",
      "**Pensar que `g` devuelve todas:** la bandera global no influye en `search()`.",
      "**Usar `if (posicion)`:** si la coincidencia está en la posición `0`, el valor es falsy; compara con `!== -1`.",
      "**Confundir con `indexOf()`:** `indexOf()` busca texto literal; `search()` acepta expresiones regulares.",
      "**Olvidar que devuelve `-1`:** no devuelve `null` ni `undefined` cuando no encuentra nada.",
    ],

    casos: [
      "📍 Localizar la primera aparición de un número en una línea.",
      "📄 Encontrar encabezados que cumplen un patrón dentro de un texto.",
      "🚦 Decidir si una palabra aparece antes que otra comparando índices.",
      "🔍 Marcar la posición de una etiqueta para resaltarla después.",
    ],

    relacion: [
      "**`indexOf()`:** devuelve la posición de un texto literal exacto.",
      "**`test()`:** devuelve un booleano en lugar de la posición.",
      "**`match()`:** devuelve la coincidencia y sus datos, no solo el índice.",
      "**`exec()`:** ofrece un resultado detallado de la coincidencia.",
      "**Bandera `i`:** permite localizar el patrón sin distinguir mayúsculas.",
    ],

    analogia:
      "`search()` es como usar la regla de un mapa para señalar el kilómetro exacto donde aparece un pueblo. 📍 No te enseña una foto del pueblo ni te dice cuántas casas tiene: solo marca el punto de inicio. Si el pueblo no existe en el mapa, la aguja se queda en `-1`.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Devuelve un número: índice o `-1`.",
      "✅ La posición `0` es una coincidencia válida.",
      "✅ Ignora `g` y no altera `lastIndex`.",
      "⚠️ Compara con `!== -1`, no con un `if` directo.",
      "💡 Para el texto encontrado, usa `match()` o `exec()`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve 'hola'.search(/adios/)?",
        opciones: ["0", "null", "-1", "undefined"],
        correcta: 2,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve 'hola mundo'.search(/mundo/)?",
        opciones: ["5", "6", "true", "'mundo'"],
        correcta: 0,
      },
      {
        id: 3,
        pregunta: "¿Qué efecto tiene la bandera g en search()?",
        opciones: [
          "Devuelve todas las posiciones",
          "Ninguno: sigue devolviendo la primera",
          "Lanza un error",
          "Devuelve un array",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Por qué no conviene usar if (resultado) con search()?",
        opciones: [
          "Porque devuelve un array",
          "Porque la posición 0 es falsy",
          "Porque lanza un error",
          "Porque devuelve null",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué método devuelve la posición de un texto literal?",
        opciones: ["search()", "indexOf()", "match()", "exec()"],
        correcta: 1,
      },
    ],
  },
};
