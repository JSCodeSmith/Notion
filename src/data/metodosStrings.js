const Q = (rows) =>
  rows.map(([pregunta, opciones, correcta], i) => ({
    id: i + 1,
    pregunta,
    opciones,
    correcta,
  }));

/* ======================================================================
   LISTA PARA LA TABLA (misma forma que METODOS_ARRAYS)
   ====================================================================== */
export const METODOS_STRINGS = [
  {
    seccion: "Unicode y Códigos",
    metodos: [
      {
        id: "codepointat",
        nombre: "codePointAt()",
        firma: "String.prototype.codePointAt(index)",
        icon: "🔢",
      },
      {
        id: "charcodeat",
        nombre: "charCodeAt()",
        firma: "String.prototype.charCodeAt(index)",
        icon: "🔢",
      },
      {
        id: "fromcharcode",
        nombre: "String.fromCharCode()",
        firma: "String.fromCharCode(...codeUnits)",
        icon: "🔤",
      },
      {
        id: "fromcodepoint",
        nombre: "String.fromCodePoint()",
        firma: "String.fromCodePoint(...codePoints)",
        icon: "😀",
      },
      {
        id: "iswellformed",
        nombre: "isWellFormed()",
        firma: "String.prototype.isWellFormed()",
        icon: "🩺",
      },
      {
        id: "towellformed",
        nombre: "toWellFormed()",
        firma: "String.prototype.toWellFormed()",
        icon: "🩹",
      },
      {
        id: "normalize",
        nombre: "normalize()",
        firma: "String.prototype.normalize(form)",
        icon: "🔤",
      },
    ],
  },
  {
    seccion: "Búsqueda y Comparación",
    metodos: [
      {
        id: "startswith",
        nombre: "startsWith()",
        firma: "String.prototype.startsWith(searchString, position)",
        icon: "⏮️",
      },
      {
        id: "endswith",
        nombre: "endsWith()",
        firma: "String.prototype.endsWith(searchString, length)",
        icon: "⏭️",
      },
      {
        id: "includes",
        nombre: "includes()",
        firma: "String.prototype.includes(searchString, position)",
        icon: "🔍",
      },
      {
        id: "indexof",
        nombre: "indexOf()",
        firma: "String.prototype.indexOf(searchValue, fromIndex)",
        icon: "📍",
      },
      {
        id: "search",
        nombre: "search()",
        firma: "String.prototype.search(regexp)",
        icon: "🔎",
      },
      {
        id: "match",
        nombre: "match()",
        firma: "String.prototype.match(regexp)",
        icon: "🎯",
      },
      {
        id: "matchall",
        nombre: "matchAll()",
        firma: "String.prototype.matchAll(regexp)",
        icon: "🎯",
      },
      {
        id: "localecompare",
        nombre: "localeCompare()",
        firma:
          "String.prototype.localeCompare(compareString, locales, options)",
        icon: "🌐",
      },
    ],
  },
  {
    seccion: "Transformación de Mayúsculas",
    metodos: [
      {
        id: "touppercase",
        nombre: "toUpperCase()",
        firma: "String.prototype.toUpperCase()",
        icon: "🔼",
      },
      {
        id: "tolowercase",
        nombre: "toLowerCase()",
        firma: "String.prototype.toLowerCase()",
        icon: "🔽",
      },
      {
        id: "tolocaleuppercase",
        nombre: "toLocaleUpperCase()",
        firma: "String.prototype.toLocaleUpperCase(locales)",
        icon: "🔼",
      },
      {
        id: "tolocalelowercase",
        nombre: "toLocaleLowerCase()",
        firma: "String.prototype.toLocaleLowerCase(locales)",
        icon: "🔽",
      },
    ],
  },
  {
    seccion: "Reemplazo",
    metodos: [
      {
        id: "replace",
        nombre: "replace()",
        firma: "String.prototype.replace(pattern, replacement)",
        icon: "🔁",
      },
      {
        id: "replaceall",
        nombre: "replaceAll()",
        firma: "String.prototype.replaceAll(pattern, replacement)",
        icon: "🔁",
      },
    ],
  },
  {
    seccion: "Limpieza (Trimming)",
    metodos: [
      {
        id: "trim",
        nombre: "trim()",
        firma: "String.prototype.trim()",
        icon: "🧹",
      },
      {
        id: "trimstart",
        nombre: "trimStart()",
        firma: "String.prototype.trimStart()",
        icon: "🧹",
      },
      {
        id: "trimleft",
        nombre: "trimLeft()",
        firma: "String.prototype.trimLeft()",
        icon: "🧹",
        badge: { texto: "Alias", tipo: "info" },
      },
      {
        id: "trimend",
        nombre: "trimEnd()",
        firma: "String.prototype.trimEnd()",
        icon: "🧹",
      },
      {
        id: "trimright",
        nombre: "trimRight()",
        firma: "String.prototype.trimRight()",
        icon: "🧹",
        badge: { texto: "Alias", tipo: "info" },
      },
    ],
  },
  {
    seccion: "Relleno (Padding)",
    metodos: [
      {
        id: "padstart",
        nombre: "padStart()",
        firma: "String.prototype.padStart(targetLength, padString)",
        icon: "⬅️",
      },
      {
        id: "padend",
        nombre: "padEnd()",
        firma: "String.prototype.padEnd(targetLength, padString)",
        icon: "➡️",
      },
    ],
  },
  {
    seccion: "Extracción y División",
    metodos: [
      {
        id: "slice",
        nombre: "slice()",
        firma: "String.prototype.slice(indexStart, indexEnd)",
        icon: "✂️",
      },
      {
        id: "substring",
        nombre: "substring()",
        firma: "String.prototype.substring(indexStart, indexEnd)",
        icon: "✂️",
      },
      {
        id: "substr",
        nombre: "substr()",
        firma: "String.prototype.substr(start, length)",
        icon: "✂️",
        badge: { texto: "Obsoleto", tipo: "warn" },
      },
      {
        id: "charat",
        nombre: "charAt()",
        firma: "String.prototype.charAt(index)",
        icon: "🔤",
      },
      {
        id: "split",
        nombre: "split()",
        firma: "String.prototype.split(separator, limit)",
        icon: "🧩",
      },
    ],
  },
  {
    seccion: "Construcción y Repetición",
    metodos: [
      {
        id: "raw",
        nombre: "String.raw()",
        firma: "String.raw(strings, ...substitutions)",
        icon: "📄",
      },
      {
        id: "repeat",
        nombre: "repeat()",
        firma: "String.prototype.repeat(count)",
        icon: "🔁",
      },
    ],
  },
];

/* ======================================================================
   DOCUMENTOS (misma forma que METODOS_DOCS)
   ====================================================================== */
export const METODOS_STRINGS_DOCS = {
  /* ============================ String.raw() ============================ */
  raw: {
    id: "raw",
    titulo: "String.raw()",
    simulador: "string",
    definicion: [
      "Es un **método estático** de `String` que devuelve el texto de un *template literal* **sin procesar las secuencias de escape**.",
    ],
    queEs: [
      "Normalmente JavaScript interpreta los escapes: `\\n` se convierte en un salto de línea.",
      "Con `String.raw` se conserva literalmente: quedan los dos caracteres `\\` y `n`.",
      "Se usa como **etiqueta** (*tag*) pegada a un template literal.",
      "La idea clave: **obtiene el texto «crudo» (raw), respetando las barras invertidas escritas.**",
    ],
    paraQueSirve: [
      "**Rutas de archivos** de Windows (`C:\\Users\\...`).",
      "**Expresiones regulares** con muchas barras invertidas.",
      "Textos donde quieres conservar los `\\` tal cual.",
      "Cadenas con muchos caracteres de escape.",
    ],
    comoFunciona: [
      "Se escribe `String.raw` pegado a un template literal (con comillas invertidas).",
      "JavaScript le entrega las partes literales en su versión **raw** (sin interpretar escapes).",
      "Las interpolaciones `${...}` **sí** se sustituyen.",
      "Devuelve un `string` con todo unido.",
    ],
    sintaxis: [
      {
        caption: "Uso habitual (como tag):",
        code: `String.raw\`template literal\``,
      },
      {
        caption:
          "Como función normal (rara vez se usa): recibe un objeto con la propiedad raw:",
        code: `String.raw(strings, ...sustituciones);

String.raw({ raw: ["Hola", "Mundo"] }, "-"); // "Hola-Mundo"`,
      },
    ],
    nota: "**Retorno:** un `string`. En el uso habitual **no escribes los parámetros**: JavaScript los pasa solo.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Con \\n",
        code: `const texto = String.raw\`\\n\`;
console.log(texto); // \\n  (dos caracteres: barra y n)

console.log("\\n");  // salto de línea real`,
      },
      {
        titulo: "Ejemplo 2: Con una ruta de Windows",
        code: `const ruta = String.raw\`C:\\Users\\Josue\\Documentos\`;
console.log(ruta); // C:\\Users\\Josue\\Documentos

// Sin String.raw habría que duplicar cada barra:
const ruta2 = "C:\\\\Users\\\\Josue\\\\Documentos";`,
      },
      {
        titulo: "Ejemplo 3: Con interpolación",
        descripcion:
          "El `\\n` se queda literal, pero `${nombre}` sí se sustituye.",
        code: `const nombre = "Josue";
const texto = String.raw\`Hola\\n\${nombre}\`;

console.log(texto); // Hola\\nJosue`,
      },
      {
        titulo: "Ejemplo 4: Para una expresión regular",
        code: `const patron = String.raw\`\\d+\\.\\d+\`;
console.log(patron); // \\d+\\.\\d+

console.log(new RegExp(patron).test("3.14")); // true`,
      },
    ],
    errores: [
      {
        texto:
          "**Pensar que `String.raw` elimina las barras `\\`:** hace justo lo contrario, las conserva.",
        code: `String.raw\`\\n\`; // "\\n" (dos caracteres), no un salto de línea`,
      },
      {
        texto:
          "**Confundirlo con `JSON.stringify()`:** `String.raw` trabaja con *template literals* y escapes; `JSON.stringify` convierte datos a texto JSON.",
      },
      {
        texto:
          "**Llamarlo con comillas normales:** necesita un template literal (o un objeto con `raw`).",
        code: `String.raw("\\\\n"); // ❌ TypeError
String.raw\`\\n\`;      // ✅`,
      },
      {
        texto:
          "**Terminar el template con una barra:** la `\\` final escapa la comilla invertida de cierre.",
        code: `String.raw\`C:\\Users\\\`; // ❌ SyntaxError
String.raw\`C:\\Users\` + "\\\\"; // ✅`,
      },
    ],
    casos: [
      {
        texto: "**Rutas de Windows:**",
        code: `const ruta = String.raw\`C:\\Users\\Josue\\Desktop\\proyecto\`;`,
      },
      {
        texto: "**Patrones con muchas barras:**",
        code: `const patron = String.raw\`\\d+\\.\\d+\`; // conserva \\d+\\.\\d+`,
      },
    ],
    relacion: [
      "**Template literals:** `String.raw` solo funciona como etiqueta de uno.",
      "**`String.fromCharCode()`:** crea texto desde códigos UTF-16.",
      "**`String.fromCodePoint()`:** crea texto desde code points Unicode.",
      "**`JSON.stringify()`:** otro mundo: convierte datos a JSON.",
    ],
    analogia:
      "Imagina que JavaScript es un **traductor**. Si le entregas `\\n`, normalmente dice: *«eso significa salto de línea»*. Con `String.raw` le dices: **«no interpretes el mensaje; dame exactamente los caracteres que están escritos»**.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** `String.raw` = *«dame el template literal en bruto»*. `String.raw` + `\\n` da `\\n`, **no** un salto de línea.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve String.raw`\\n`?",
        [
          "Un salto de línea",
          "Los dos caracteres \\ y n",
          "undefined",
          "Un error",
        ],
        1,
      ],
      [
        "¿Qué tipo de método es String.raw()?",
        ["De instancia", "Estático", "Una propiedad", "Un getter"],
        1,
      ],
      [
        "¿Qué pasa con las interpolaciones ${...} dentro de String.raw?",
        [
          "Se ignoran",
          "Se sustituyen normalmente",
          "Lanzan error",
          "Se convierten en \\${}",
        ],
        1,
      ],
      [
        "¿Para qué es muy útil String.raw?",
        [
          "Ordenar arrays",
          "Rutas de Windows y regex con muchas barras invertidas",
          "Repetir texto",
          "Validar emojis",
        ],
        1,
      ],
      [
        "¿Qué resultado da String.raw`Hola\\n${'Josue'}`?",
        [
          "Hola\\nJosue",
          "Hola⏎Josue (con salto de línea real)",
          "HolaJosue",
          "Un error",
        ],
        0,
      ],
      [
        "¿String.raw elimina las barras invertidas?",
        ["Sí, siempre", "No, las conserva", "Solo las dobles", "Solo en rutas"],
        1,
      ],
      [
        "¿Qué pasa con String.raw`C:\\Users\\`?",
        [
          "Funciona bien",
          "SyntaxError, la barra final escapa la comilla de cierre",
          "Devuelve undefined",
          "Devuelve C:",
        ],
        1,
      ],
      [
        "¿Es lo mismo String.raw que JSON.stringify?",
        [
          "Sí",
          "No: raw conserva escapes de un template; stringify convierte datos a JSON",
          "Solo con objetos",
          "Solo con números",
        ],
        1,
      ],
    ]),
  },

  /* ============================ codePointAt() ============================ */
  codepointat: {
    id: "codepointat",
    titulo: "String.prototype.codePointAt()",
    simulador: "string",
    definicion: [
      "Método de `String` que devuelve el **valor Unicode (code point)** del carácter que **comienza** en una posición específica de la cadena.",
    ],
    queEs: [
      "Permite obtener el **código Unicode** de un carácter dado su índice.",
      "A diferencia de `charCodeAt()`, representa correctamente caracteres que ocupan **dos unidades UTF-16**, como muchos emojis.",
      "Su pareja natural es `String.fromCodePoint()` (hace el camino inverso).",
    ],
    paraQueSirve: [
      "Obtener el valor Unicode de un carácter.",
      "Trabajar con caracteres fuera del **Basic Multilingual Plane (BMP)**.",
      "Analizar emojis y otros caracteres con **pares sustitutos** (*surrogate pairs*).",
      "Convertir luego el número a carácter con `String.fromCodePoint()`.",
    ],
    comoFunciona: [
      "Recibe un **índice** (empieza en `0`).",
      "Busca la unidad de código UTF-16 que comienza en esa posición.",
      "Si es la primera mitad de un **par sustituto** y a continuación viene la segunda mitad, combina las dos unidades.",
      "Devuelve el valor como número. Si el índice está fuera de rango, devuelve `undefined`.",
    ],
    sintaxis: [
      {
        code: `cadena.codePointAt(indice);`,
      },
    ],
    nota: "**Parámetro:** `indice` (número, base 0). **Retorno:** un `number` (el code point) o `undefined` si el índice no existe. ⚠️ JavaScript usa **UTF-16**: un emoji como `😀` tiene `length` 2, y `codePointAt(1)` devuelve solo la mitad baja (`56832`).",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Una letra",
        code: `"A".codePointAt(0); // 65   (U+0041)
"a".codePointAt(0); // 97`,
      },
      {
        titulo: "Ejemplo 2: Un emoji",
        code: `"😀".codePointAt(0); // 128512  (U+1F600)`,
      },
      {
        titulo: "Ejemplo 3: Varios caracteres",
        code: `const texto = "ABC";
console.log(texto.codePointAt(0)); // 65
console.log(texto.codePointAt(1)); // 66
console.log(texto.codePointAt(2)); // 67`,
      },
      {
        titulo: "Ejemplo 4: length e índices con un emoji",
        code: `const emoji = "😀";
console.log(emoji.length);          // 2
console.log(emoji.codePointAt(0));  // 128512
console.log(emoji.codePointAt(1));  // 56832 (solo la mitad baja)`,
      },
      {
        titulo: "Ejemplo 5: Ida y vuelta con fromCodePoint()",
        code: `const codigo = "😀".codePointAt(0);
console.log(codigo);                       // 128512
console.log(String.fromCodePoint(codigo)); // "😀"`,
      },
    ],
    errores: [
      {
        texto: "**Confundirlo con `charCodeAt()`:**",
        code: `"😀".charCodeAt(0);  // 55357  (solo una unidad UTF-16)
"😀".codePointAt(0); // 128512 (code point completo)`,
      },
      '**Confundir `length` con la cantidad de caracteres:** `"😀".length` es `2`, aunque visualmente sea uno.',
      {
        texto: "**Usar un índice inexistente:**",
        code: `"Hola".codePointAt(20); // undefined`,
      },
      {
        texto:
          "**Recorrer un emoji por índices:** para recorrer caracteres completos usa `for...of`.",
        code: `for (const caracter of "A😀B") {
  console.log(caracter, caracter.codePointAt(0));
}`,
      },
    ],
    casos: [
      "Procesamiento de Unicode y texto internacional.",
      "Análisis de emojis.",
      "Conversión entre caracteres y valores Unicode.",
      "Algoritmos que necesitan trabajar con code points.",
    ],
    relacion: [
      "**`fromCodePoint()`:** code point → carácter (la pareja).",
      "**`charCodeAt()`:** carácter → unidad UTF-16.",
      "**`fromCharCode()`:** unidades UTF-16 → cadena.",
      {
        texto: "**Resumen de parejas:**",
        code: `codePointAt()  ↔ fromCodePoint()   // code points Unicode
charCodeAt()   ↔ fromCharCode()    // unidades UTF-16`,
      },
    ],
    analogia:
      "Imagina que cada carácter tiene un **DNI universal** 🌎. `codePointAt()` es decir: **«dime el DNI Unicode del carácter que está en esta posición»**. El DNI de `😀` es `128512`.",
    fuente: "MDN Web Docs | String.prototype.codePointAt()",
    notasPersonales: [
      "**Idea para recordar:** `codePointAt()` = *obtener el número Unicode de un carácter*. Su pareja: `fromCodePoint()` = *convertir un número Unicode en carácter*.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'A'.codePointAt(0)?",
        ["'A'", "65", "97", "undefined"],
        1,
      ],
      [
        "¿Qué devuelve '😀'.codePointAt(0)?",
        ["55357", "128512", "2", "56832"],
        1,
      ],
      [
        "¿Qué devuelve 'Hola'.codePointAt(20)?",
        ["NaN", "0", "undefined", "Un error"],
        2,
      ],
      ["¿Cuál es el length de '😀'?", ["1", "2", "4", "0"], 1],
      [
        "¿Qué diferencia hay con charCodeAt() en un emoji?",
        [
          "Ninguna",
          "codePointAt devuelve el code point completo; charCodeAt solo una unidad UTF-16",
          "charCodeAt es más moderno",
          "codePointAt devuelve un string",
        ],
        1,
      ],
      [
        "¿Qué método hace el camino inverso (número → carácter)?",
        ["charAt()", "fromCodePoint()", "at()", "toString()"],
        1,
      ],
      [
        "¿Qué devuelve '😀'.codePointAt(1)?",
        ["128512", "undefined", "56832", "55357"],
        2,
      ],
      [
        "¿Cómo recorres caracteres completos (sin partir emojis)?",
        ["for (i...length)", "for...of", "while con length", "forEach"],
        1,
      ],
    ]),
  },

  /* ============================ charCodeAt() ============================ */
  charcodeat: {
    id: "charcodeat",
    titulo: "String.prototype.charCodeAt()",
    simulador: "string",
    definicion: [
      "Método de los strings que devuelve el **código Unicode UTF-16 (número entero)** de la unidad de código ubicada en una posición específica.",
    ],
    queEs: [
      "Es un método nativo antiguo de JavaScript (desde ES1).",
      "Te dice **«en qué número está representado ese carácter»**.",
      "Devuelve un valor entre `0` y `65535` (una *unidad de código* UTF-16).",
    ],
    paraQueSirve: [
      "Obtener el **valor numérico** de un carácter.",
      "**Comparar caracteres** por su código.",
      "**Validar rangos** (mayúscula, minúscula, número...).",
      "Algoritmos de criptografía o codificación sencilla.",
      "Generar texto en combinación con `fromCharCode()`.",
    ],
    comoFunciona: [
      "Toma un índice (base 0). Si no se indica, usa `0`.",
      "Si el índice es válido, devuelve el código de la unidad en esa posición.",
      "Si es inválido (menor que 0 o mayor/igual a `length`), devuelve `NaN`.",
      "Con emojis y caracteres fuera del BMP devuelve **solo una mitad** del par sustituto: para eso existe `codePointAt()`.",
    ],
    sintaxis: [
      {
        code: `cadena.charCodeAt(indice);`,
      },
    ],
    nota: "**Parámetro:** `indice` (opcional, por defecto `0`). **Retorno:** un `number` de 0 a 65535, o `NaN` si el índice no es válido.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Básico",
        code: `const texto = "Hola";
console.log(texto.charCodeAt(0)); // 72  (H)
console.log(texto.charCodeAt(1)); // 111 (o)
console.log(texto.charCodeAt(2)); // 108 (l)
console.log(texto.charCodeAt(3)); // 97  (a)`,
      },
      {
        titulo: "Ejemplo 2: Sin índice y fuera de rango",
        code: `console.log("Hola".charCodeAt());   // 72 (usa 0 por defecto)
console.log("Hola".charCodeAt(10)); // NaN`,
      },
      {
        titulo: "Ejemplo 3: Códigos útiles",
        code: `" ".charCodeAt(0); // 32
"0".charCodeAt(0); // 48
"A".charCodeAt(0); // 65
"a".charCodeAt(0); // 97
"ñ".charCodeAt(0); // 241`,
      },
      {
        titulo: "Ejemplo 4: Emojis (¡ojo!)",
        code: `console.log("😂".charCodeAt(0));   // 55357 (parte alta del par)
console.log("😂".charCodeAt(1));   // 56834 (parte baja del par)
console.log("😂".codePointAt(0));  // 128514 (código completo)`,
      },
    ],
    errores: [
      {
        texto: "**Confundir `charCodeAt()` con `codePointAt()`:**",
        code: `"😂".charCodeAt(0);  // 55357  ❌ incompleto
"😂".codePointAt(0); // 128514 ✅ completo`,
      },
      {
        texto:
          "**No validar el índice:** `NaN` es *falsy*, pero lo correcto es comprobar con `isNaN()`.",
        code: `const codigo = "Hola".charCodeAt(10);
if (!isNaN(codigo)) {
  // seguro de usar
}`,
      },
      {
        texto:
          "**Creer que devuelve el carácter:** devuelve el número. Para el carácter usa `charAt()` o corchetes.",
        code: `"Hola".charCodeAt(0); // 72
"Hola"[0];            // "H"`,
      },
      '**Los índices empiezan en 0:** en `"Hola"`, `charCodeAt(4)` es `NaN` y el último es `charCodeAt(3)`.',
    ],
    casos: [
      {
        texto: "**Verificar si es mayúscula:**",
        code: `function esMayuscula(letra) {
  const codigo = letra.charCodeAt(0);
  return codigo >= 65 && codigo <= 90;
}
esMayuscula("A"); // true
esMayuscula("a"); // false`,
      },
      {
        texto: "**Verificar si es un número:**",
        code: `function esNumero(c) {
  const codigo = c.charCodeAt(0);
  return codigo >= 48 && codigo <= 57;
}
esNumero("5"); // true`,
      },
      {
        texto: "**Checksum simple (suma de códigos):**",
        code: `function checksum(texto) {
  let suma = 0;
  for (let i = 0; i < texto.length; i++) {
    suma += texto.charCodeAt(i);
  }
  return suma;
}
checksum("Hola"); // 388`,
      },
      {
        texto: "**Mayúscula a minúscula a mano:**",
        code: `function aMinuscula(letra) {
  const codigo = letra.charCodeAt(0);
  if (codigo >= 65 && codigo <= 90) {
    return String.fromCharCode(codigo + 32);
  }
  return letra;
}
aMinuscula("A"); // "a"`,
      },
    ],
    relacion: [
      "**`codePointAt()`:** code point completo (soporta emojis).",
      "**`charAt()`:** devuelve el carácter, no su código.",
      "**`fromCharCode()`:** el inverso (código → carácter).",
      "**`fromCodePoint()`:** inverso de `codePointAt()`.",
      {
        texto: "**Tabla comparativa:**",
        code: `charCodeAt(i)     → number (UTF-16)       ❌ emojis
codePointAt(i)    → number (Unicode)      ✅ emojis
charAt(i)         → string                ✅
fromCharCode(n)   → string                ❌ emojis
fromCodePoint(n)  → string                ✅ emojis`,
      },
    ],
    analogia:
      "Imagina un **diccionario numérico** para caracteres. Tienes un libro (el string) y una página (el índice). Le preguntas: *«¿qué número le corresponde a la letra de esta página?»*. `charCodeAt()` te da ese número, el **DNI** del carácter, y `String.fromCharCode()` hace lo inverso.",
    fuente: "MDN Web Docs | ECMAScript Specification | Unicode Standard",
    notasPersonales: [
      "**Rangos útiles:** `0-127` coincide con ASCII. `65-90` = mayúsculas (A-Z), `97-122` = minúsculas (a-z), `48-57` = números (0-9), `32` = espacio.",
      "**IMPORTANTE:** para emojis y caracteres complejos usa `codePointAt()`.",
    ],
    quiz: Q([
      ["¿Qué devuelve 'Hola'.charCodeAt(0)?", ["72", "104", "'H'", "0"], 0],
      [
        "¿Qué devuelve 'Hola'.charCodeAt(10)?",
        ["undefined", "0", "NaN", "-1"],
        2,
      ],
      [
        "¿Qué devuelve 'Hola'.charCodeAt() sin argumentos?",
        ["NaN", "72", "El último código", "Un error"],
        1,
      ],
      [
        "¿Qué rango de valores devuelve charCodeAt()?",
        ["0 a 255", "0 a 65535", "0 a 1114111", "-1 a 127"],
        1,
      ],
      ["¿Qué devuelve '😂'.charCodeAt(0)?", ["128514", "55357", "1", "NaN"], 1],
      [
        "¿Qué método usas para emojis en lugar de charCodeAt()?",
        ["charAt()", "codePointAt()", "at()", "indexOf()"],
        1,
      ],
      [
        "¿Qué rango de códigos corresponde a las mayúsculas A-Z?",
        ["48-57", "65-90", "97-122", "32-64"],
        1,
      ],
      [
        "¿Cuál es el inverso de charCodeAt()?",
        ["String.fromCharCode()", "charAt()", "padStart()", "String.raw()"],
        0,
      ],
    ]),
  },

  /* ============================ String.fromCharCode() ============================ */
  fromcharcode: {
    id: "fromcharcode",
    titulo: "String.fromCharCode()",
    simulador: "string",
    definicion: [
      "Método estático de `String` que crea una cadena a partir de uno o varios **valores de unidades de código UTF-16**.",
    ],
    queEs: [
      "Hace prácticamente el proceso inverso de `charCodeAt()`: **código UTF-16 → carácter**.",
      "El número `65` representa la letra `A`.",
      "⚠️ Trabaja con **unidades de código UTF-16**, no con code points completos. Para eso existe `String.fromCodePoint()`.",
    ],
    paraQueSirve: [
      "Crear caracteres a partir de sus valores UTF-16.",
      "Convertir códigos numéricos en texto.",
      "Construir cadenas mediante códigos de caracteres.",
      "Ejercicios de Unicode y codificación de texto.",
    ],
    comoFunciona: [
      "Recibe uno o varios números.",
      "Cada número se convierte en **una** unidad de código UTF-16 (se toman solo sus **16 bits** bajos).",
      "Todas las unidades se unen en una sola cadena.",
      "Devuelve un `string`.",
    ],
    sintaxis: [
      {
        code: `String.fromCharCode(num1, num2, ...);`,
      },
    ],
    nota: "**Parámetros:** uno o varios números (unidades UTF-16). **Retorno:** un `string`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Una letra",
        code: `String.fromCharCode(65); // "A"`,
      },
      {
        titulo: "Ejemplo 2: Una palabra",
        code: `String.fromCharCode(72, 111, 108, 97); // "Hola"

// 72 → H, 111 → o, 108 → l, 97 → a`,
      },
      {
        titulo: "Ejemplo 3: Ida y vuelta con charCodeAt()",
        code: `const letra = "A";
const codigo = letra.charCodeAt(0);        // 65
const resultado = String.fromCharCode(codigo); // "A"`,
      },
      {
        titulo: "Ejemplo 4: Con un array usando spread",
        code: `const codigos = [72, 111, 108, 97];
const texto = String.fromCharCode(...codigos);
console.log(texto); // "Hola"`,
      },
    ],
    errores: [
      {
        texto: "**Confundirlo con `String.fromCodePoint()`:**",
        code: `String.fromCharCode(0x1F600);  // ❌ no da 😀: se trunca a 16 bits (U+F600)
String.fromCodePoint(0x1F600); // ✅ "😀"`,
        nota: "`fromCharCode()` → unidades UTF-16. `fromCodePoint()` → code points Unicode.",
      },
      "**Pensar que cualquier número Unicode funciona:** `fromCharCode()` trabaja con 16 bits. Para caracteres que requieren dos unidades usa `fromCodePoint()` o entrega manualmente el par sustituto.",
    ],
    casos: [
      "Conversión de códigos UTF-16 a texto.",
      "Construcción programática de cadenas.",
      "APIs o datos que entregan unidades de código.",
      "Ejercicios de Unicode y codificación.",
    ],
    relacion: [
      {
        texto: "**Familia de cuatro métodos:**",
        code: `charCodeAt()    ↔ fromCharCode()    // unidades UTF-16
codePointAt()   ↔ fromCodePoint()   // code points Unicode`,
      },
      "**Regla rápida:** *Code Point* → `fromCodePoint()`; *Code Unit* → `fromCharCode()`.",
    ],
    analogia:
      'Cada carácter tiene un **número de identificación**. `charCodeAt()` pregunta: *«¿cuál es el número de esta pieza?»*. `fromCharCode()` hace lo contrario: *«tengo el número 65, ¿qué carácter representa?»* → `"A"`.',
    fuente: "MDN Web Docs | String.fromCharCode()",
    notasPersonales: [
      "**Para memorizarlo:** `charCodeAt()` → carácter → código. `fromCharCode()` → código → carácter.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve String.fromCharCode(65)?",
        ["65", "'A'", "'a'", "undefined"],
        1,
      ],
      [
        "¿Qué devuelve String.fromCharCode(72, 111, 108, 97)?",
        ["'7211110897'", "'Hola'", "['H','o','l','a']", "Un error"],
        1,
      ],
      [
        "¿Con qué trabaja fromCharCode()?",
        [
          "Code points Unicode completos",
          "Unidades de código UTF-16",
          "Bytes UTF-8",
          "Índices",
        ],
        1,
      ],
      [
        "¿Qué método es su inverso?",
        ["charCodeAt()", "padEnd()", "repeat()", "trim()"],
        0,
      ],
      [
        "¿Qué pasa con String.fromCharCode(0x1F600)?",
        [
          "Devuelve 😀",
          "Se trunca a 16 bits y no da el emoji",
          "Lanza RangeError",
          "Devuelve ''",
        ],
        1,
      ],
      [
        "¿Qué método usas para crear 😀 desde su número?",
        ["String.fromCharCode", "String.fromCodePoint", "String.raw", "charAt"],
        1,
      ],
      [
        "¿Cómo conviertes [72, 111, 108, 97] a texto?",
        [
          "String.fromCharCode(...codigos)",
          "String.fromCharCode(codigos)",
          "codigos.toString()",
          "String.raw(codigos)",
        ],
        0,
      ],
      [
        "Regla rápida: Code Unit →",
        ["fromCodePoint()", "fromCharCode()", "raw()", "repeat()"],
        1,
      ],
    ]),
  },

  /* ============================ String.fromCodePoint() ============================ */
  fromcodepoint: {
    id: "fromcodepoint",
    titulo: "String.fromCodePoint()",
    simulador: "string",
    definicion: [
      "Método estático de `String` que convierte uno o varios **code points Unicode** en una cadena de texto.",
    ],
    queEs: [
      "Recibe números que representan **code points Unicode** y devuelve los caracteres correspondientes.",
      "`128512` es el valor decimal del code point `U+1F600` (😀).",
      "Es especialmente útil para caracteres fuera del **Basic Multilingual Plane (BMP)**, como muchos emojis.",
    ],
    paraQueSirve: [
      "Convertir un **code point Unicode → carácter**.",
      "Crear emojis y otros caracteres mediante su valor numérico.",
      "Reconstruir caracteres obtenidos con `codePointAt()`.",
      "Crear cadenas a partir de varios code points.",
    ],
    comoFunciona: [
      "Recibe uno o varios valores Unicode.",
      "Valida que cada uno esté en el rango `0x000000` → `0x10FFFF`.",
      "Convierte cada code point en su carácter (si es mayor que `0xFFFF` usa **dos** unidades UTF-16).",
      "Une todo y devuelve un `string`.",
    ],
    sintaxis: [
      {
        code: `String.fromCodePoint(num1, num2, ...);`,
      },
    ],
    nota: "**Parámetros:** uno o varios números entre `0` y `0x10FFFF`. **Retorno:** un `string`. Fuera de rango lanza `RangeError`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Una letra",
        code: `String.fromCodePoint(65); // "A"`,
      },
      {
        titulo: "Ejemplo 2: Un emoji (hexadecimal o decimal)",
        code: `String.fromCodePoint(0x1F600); // "😀"
String.fromCodePoint(128512);  // "😀"`,
      },
      {
        titulo: "Ejemplo 3: Una palabra",
        code: `String.fromCodePoint(72, 111, 108, 97); // "Hola"`,
      },
      {
        titulo: "Ejemplo 4: Ida y vuelta con codePointAt()",
        code: `const emoji = "😀";
const codigo = emoji.codePointAt(0);       // 128512
const resultado = String.fromCodePoint(codigo); // "😀"`,
      },
      {
        titulo: "Ejemplo 5: Varios emojis",
        code: `const texto = String.fromCodePoint(0x1F600, 0x1F602, 0x1F60D);
console.log(texto); // "😀😂😍"`,
      },
    ],
    errores: [
      {
        texto: "**Confundirlo con `fromCharCode()`:**",
        code: `String.fromCharCode(0x1F600);  // ❌ no produce 😀
String.fromCodePoint(0x1F600); // ✅ "😀"`,
      },
      "**Confundir code point con índice:** `String.fromCodePoint(128512)` no significa *«busca la posición 128512»*, sino *«construye el carácter cuyo code point es 128512»*.",
      {
        texto:
          "**Usar un número fuera del rango Unicode:** el máximo es `U+10FFFF`.",
        code: `String.fromCodePoint(0x110000); // ❌ RangeError`,
      },
    ],
    casos: [
      "Crear emojis mediante Unicode.",
      "Procesar texto internacional.",
      "Convertir valores obtenidos con `codePointAt()`.",
      "Construir cadenas dinámicamente.",
      "Procesamiento de caracteres fuera del BMP.",
    ],
    relacion: [
      {
        texto: "**Las parejas a memorizar:**",
        code: `codePointAt()  ↔ fromCodePoint()
charCodeAt()   ↔ fromCharCode()`,
      },
      "**`codePointAt()`:** carácter → code point (el inverso).",
      "**`fromCharCode()`:** trabaja con unidades UTF-16 y no sirve para emojis directamente.",
    ],
    analogia:
      "Cada carácter tiene un **código de identificación universal**. `codePointAt()` pregunta: *«¿cuál es el código de este carácter?»*. `fromCodePoint()` hace el camino inverso: *«tengo este código, dame el carácter»*. `128512` → 😀.",
    fuente: "MDN Web Docs | String.fromCodePoint()",
    notasPersonales: [
      "**En una frase:** `String.fromCodePoint()` convierte un code point Unicode en su carácter correspondiente.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve String.fromCodePoint(128512)?",
        ["'128512'", "'😀'", "'A'", "Un error"],
        1,
      ],
      [
        "¿Cuál es el máximo code point válido?",
        ["0xFFFF", "0x10FFFF", "0xFFFFFF", "255"],
        1,
      ],
      [
        "¿Qué pasa con String.fromCodePoint(0x110000)?",
        [
          "Devuelve ''",
          "Devuelve '?'",
          "Lanza RangeError",
          "Devuelve undefined",
        ],
        2,
      ],
      [
        "¿Qué método es su pareja natural?",
        ["codePointAt()", "charAt()", "padStart()", "slice()"],
        0,
      ],
      [
        "¿Qué devuelve String.fromCodePoint(72, 111, 108, 97)?",
        ["'Hola'", "'H'", "[72,111,108,97]", "Un error"],
        0,
      ],
      [
        "¿Qué diferencia tiene con fromCharCode()?",
        [
          "Ninguna",
          "fromCodePoint usa code points Unicode; fromCharCode unidades UTF-16",
          "fromCharCode es más moderno",
          "fromCodePoint devuelve un array",
        ],
        1,
      ],
      [
        "¿Qué significa String.fromCodePoint(128512)?",
        [
          "Busca la posición 128512",
          "Construye el carácter con ese code point",
          "Repite 128512 veces",
          "Devuelve el length",
        ],
        1,
      ],
      [
        "¿Qué devuelve String.fromCodePoint(0x1F600, 0x1F602)?",
        ["'😀😂'", "'😂😀'", "Un error", "'1F6001F602'"],
        0,
      ],
    ]),
  },

  /* ============================ repeat() ============================ */
  repeat: {
    id: "repeat",
    titulo: "String.prototype.repeat()",
    simulador: "string",
    definicion: [
      "Método de `String.prototype` que devuelve **una nueva cadena** formada por la repetición de la cadena original un número determinado de veces.",
    ],
    queEs: [
      "Es un método heredado de `String.prototype`.",
      "Forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
      "**No modifica la cadena original**: como los strings son *inmutables*, siempre devuelve uno nuevo.",
    ],
    paraQueSirve: [
      "Repetir un texto varias veces.",
      "Crear líneas o separadores.",
      "Generar patrones de texto.",
      "Rellenar contenido de forma sencilla.",
      "Mostrar barras de progreso simples.",
    ],
    comoFunciona: [
      "Se llama sobre una cadena.",
      "Se indica cuántas veces debe repetirse.",
      "JavaScript concatena la cadena consigo misma esa cantidad de veces.",
      "Devuelve una nueva cadena; la original permanece sin cambios.",
    ],
    sintaxis: [
      {
        code: `cadena.repeat(cantidad);`,
      },
    ],
    nota: "**Parámetro:** `cantidad`, entero mayor o igual que `0`. **Retorno:** un `string`. Negativo o `Infinity` lanza `RangeError`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Repetir una palabra",
        code: `const texto = "Hola ";
console.log(texto.repeat(3)); // "Hola Hola Hola "`,
      },
      {
        titulo: "Ejemplo 2: Repetir un carácter",
        code: `console.log("*".repeat(10)); // "**********"`,
      },
      {
        titulo: "Ejemplo 3: Línea divisoria",
        code: `console.log("-".repeat(30)); // "------------------------------"`,
      },
      {
        titulo: "Ejemplo 4: Repetir un emoji",
        code: `console.log("🎉".repeat(5)); // "🎉🎉🎉🎉🎉"`,
      },
      {
        titulo: "Ejemplo 5: La cadena original no cambia",
        code: `const saludo = "Hi";
const nuevo = saludo.repeat(2);

console.log(saludo); // "Hi"
console.log(nuevo);  // "HiHi"`,
      },
    ],
    errores: [
      {
        texto: "**Pensar que modifica la cadena original:**",
        code: `let texto = "Hola";
texto.repeat(3);
console.log(texto); // "Hola"

// Hay que guardar el resultado:
texto = texto.repeat(3);`,
      },
      {
        texto: "**Usar un número negativo:**",
        code: `"Hola".repeat(-1); // ❌ RangeError`,
      },
      {
        texto: "**Usar `Infinity`:**",
        code: `"Hola".repeat(Infinity); // ❌ RangeError`,
      },
      {
        texto:
          '**Pasar texto como cantidad:** `"abc"` se convierte en `NaN`, que se trata como `0`, y el resultado es una cadena vacía.',
        code: `"Hola".repeat("abc"); // ""`,
      },
      {
        texto:
          "**Olvidar los paréntesis:** devuelve la referencia, no ejecuta.",
        code: `texto.repeat; // [Function: repeat]`,
      },
    ],
    casos: [
      "Crear separadores visuales.",
      "Generar patrones de texto.",
      "Rellenar cadenas.",
      "Mostrar barras de progreso simples.",
      {
        texto: "**Barra de progreso:**",
        code: `const progreso = 6;
console.log("█".repeat(progreso) + "░".repeat(10 - progreso)); // ██████░░░░`,
      },
    ],
    relacion: [
      "**`padStart()`:** rellena una cadena al inicio.",
      "**`padEnd()`:** rellena una cadena al final.",
      "**`concat()`:** une cadenas sin repetirlas automáticamente.",
      "**Inmutabilidad:** `repeat()` devuelve una cadena nueva.",
    ],
    analogia:
      "Imagina un **sello** con la palabra *«Hola»*. Cada vez que lo presionas sobre una hoja aparece una copia. `repeat(3)` → **HolaHolaHola**. El sello original nunca cambia; solo se usa para crear más copias.",
    fuente: "MDN Web Docs | ECMAScript Specification (String.prototype.repeat)",
    quiz: Q([
      [
        "¿Qué devuelve 'ab'.repeat(3)?",
        ["'ab'", "'ababab'", "['ab','ab','ab']", "'aaabbb'"],
        1,
      ],
      [
        "¿Qué devuelve 'Hola'.repeat(0)?",
        ["'Hola'", "undefined", "''", "Un error"],
        2,
      ],
      [
        "¿Qué pasa con 'Hola'.repeat(-1)?",
        [
          "Devuelve ''",
          "Lanza RangeError",
          "Devuelve 'aloH'",
          "Devuelve 'Hola'",
        ],
        1,
      ],
      [
        "¿Qué pasa con 'Hola'.repeat(Infinity)?",
        ["Se cuelga", "Lanza RangeError", "Devuelve ''", "Devuelve 'Hola'"],
        1,
      ],
      [
        "¿repeat() modifica la cadena original?",
        ["Sí", "No, devuelve una nueva", "Solo si es let", "Solo con emojis"],
        1,
      ],
      [
        "¿Qué devuelve 'Hola'.repeat('abc')?",
        ["Un error", "''", "'Hola'", "'abc'"],
        1,
      ],
      [
        "¿Cómo haces una línea de 30 guiones?",
        ["'-'.repeat(30)", "'-' * 30", "'-'.fill(30)", "repeat('-', 30)"],
        0,
      ],
      [
        "¿Qué método rellena al inicio hasta una longitud?",
        ["padStart()", "repeat()", "concat()", "trim()"],
        0,
      ],
    ]),
  },

  /* ============================ isWellFormed() ============================ */
  iswellformed: {
    id: "iswellformed",
    titulo: "String.prototype.isWellFormed()",
    simulador: "string",
    definicion: [
      "Método built-in de JavaScript que verifica si una cadena está **bien formada** (*well-formed*): que **no contiene unidades de código Unicode desemparejadas** (*lone surrogates*).",
    ],
    queEs: [
      "Una función de validación de integridad Unicode introducida en **ECMAScript 2023 (ES14)**.",
      "Devuelve un booleano (`true` o `false`) y permite saber si el texto se puede codificar de forma segura (UTF-8, JSON, URLs).",
    ],
    paraQueSirve: [
      "**Validar antes de procesar o enviar:** funciones como `encodeURIComponent()` lanzan `URIError` con caracteres desemparejados.",
      "**Sanear datos de entrada:** detectar texto corrupto o fragmentos incompletos de emojis/símbolos complejos.",
    ],
    comoFunciona: [
      "JavaScript guarda los textos como secuencias **UTF-16**.",
      "Los caracteres complejos (la mayoría de emojis) se forman con **dos unidades** (un *surrogate pair*).",
      "Si una cadena contiene solo la mitad de esa pareja (*lone surrogate*), está mal formada.",
      "`isWellFormed()` recorre la cadena comprobando que cada mitad tenga su pareja.",
    ],
    sintaxis: [
      {
        code: `cadena.isWellFormed();`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** `true` si no hay *lone surrogates*, `false` si hay al menos uno.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Cadenas bien formadas",
        code: `console.log("Hola mundo".isWellFormed());    // true
console.log("JavaScript 🚀".isWellFormed()); // true (el emoji tiene su par)`,
      },
      {
        titulo: "Ejemplo 2: Detectar un lone surrogate",
        code: `// \\uD83D es la primera mitad de la pareja de un emoji
const malFormada = "Texto incompleto \\uD83D";

console.log(malFormada.isWellFormed()); // false`,
      },
      {
        titulo: "Ejemplo 3: Evitar el error de encodeURIComponent()",
        code: `const textoUsuario = "Subida \\uD83D";

if (textoUsuario.isWellFormed()) {
  console.log(encodeURIComponent(textoUsuario));
} else {
  console.log("Error: la cadena contiene caracteres corruptos.");
}`,
      },
    ],
    errores: [
      "**Confundirlo con validar HTML o JSON:** `isWellFormed()` **no** comprueba etiquetas ni sintaxis JSON; solo valida la estructura **UTF-16** del texto.",
      "**Asumir soporte en entornos antiguos:** es de ES2023. Requiere Node.js 20+, Chrome 111+, Firefox 119+, Safari 16.4+.",
      {
        texto: "**Llamarlo sobre el resultado de `console.log()`:**",
        code: `console.log("Hola").isWellFormed(); // ❌ console.log devuelve undefined
"Hola".isWellFormed();               // ✅ true`,
      },
    ],
    casos: [
      "**Bases de datos:** prevenir errores en sistemas que exigen UTF-8 estricto.",
      "**APIs y redes:** validar textos antes de serializar a JSON o enviarlos por WebSocket/Fetch.",
      "**Middleware de validación** antes de procesar texto externo.",
    ],
    relacion: [
      "**`toWellFormed()`:** su hermano; en vez de verificar, **corrige** reemplazando los *lone surrogates* por `U+FFFD` (�).",
      "**`encodeURIComponent()`:** lanza `URIError` si la cadena no está bien formada.",
      "**UTF-16 y surrogate pairs:** el sistema con el que JavaScript representa los caracteres.",
    ],
    analogia:
      "Los caracteres complejos de UTF-16 son como **pares de calcetines** 🧦. Una cadena está bien formada cuando todos los calcetines tienen compañero. `isWellFormed()` echa un vistazo al cajón y te confirma si hay algún calcetín suelto.",
    fuente: "MDN Web Docs | ECMAScript 2023 (ECMA-262)",
    notasPersonales: [
      "Usar `isWellFormed()` en middleware de validación antes de llamar a APIs. Si devuelve `false`, aplicar `.toWellFormed()` para reparar el texto.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'Hola'.isWellFormed()?",
        ["true", "false", "undefined", "Un error"],
        0,
      ],
      [
        "¿Qué es un lone surrogate?",
        [
          "Un emoji completo",
          "Una mitad de par sustituto sin su pareja",
          "Un carácter ASCII",
          "Un salto de línea",
        ],
        1,
      ],
      [
        "¿Qué devuelve ('a\\uD83D').isWellFormed()?",
        ["true", "false", "NaN", "Un error"],
        1,
      ],
      [
        "¿En qué versión de ECMAScript se introdujo?",
        ["ES5", "ES2015", "ES2023", "ES2010"],
        2,
      ],
      [
        "¿Qué lanza encodeURIComponent con un lone surrogate?",
        ["TypeError", "URIError", "RangeError", "Nada"],
        1,
      ],
      [
        "¿isWellFormed() valida que un JSON esté bien escrito?",
        [
          "Sí",
          "No, solo la estructura UTF-16",
          "Solo con objetos",
          "Solo en Node",
        ],
        1,
      ],
      [
        "¿Cuál es su método hermano que repara la cadena?",
        ["toWellFormed()", "normalize()", "trim()", "fix()"],
        0,
      ],
      [
        "¿Qué parámetros recibe isWellFormed()?",
        ["Un índice", "Un callback", "Ninguno", "Un string"],
        2,
      ],
    ]),
  },

  /* ============================ toWellFormed() ============================ */
  towellformed: {
    id: "towellformed",
    titulo: "String.prototype.toWellFormed()",
    simulador: "string",
    definicion: [
      "Método built-in de JavaScript que devuelve una **nueva cadena** en la que cada unidad de código desemparejada (*lone surrogate*) es **reemplazada por el carácter de reemplazo Unicode `U+FFFD`** (�).",
    ],
    queEs: [
      "La herramienta de **reparación y saneamiento** introducida en **ECMAScript 2023 (ES14)**.",
      "A diferencia de `isWellFormed()` (que solo comprueba), `toWellFormed()` **soluciona** el problema para que el texto se pueda procesar, serializar o transmitir sin errores.",
    ],
    paraQueSirve: [
      "**Reparar texto mal formado:** convertir cadenas corruptas en versiones válidas.",
      "**Garantizar la serialización:** evitar `URIError` en `encodeURIComponent()`.",
      "**Normalizar entradas** de fuentes externas no confiables (APIs, scraping, archivos corruptos) antes de guardarlas.",
    ],
    comoFunciona: [
      "Recorre la cadena buscando unidades *surrogate* de UTF-16.",
      "Si encuentra una **pareja válida**, la mantiene intacta.",
      "Si encuentra un *surrogate* sin pareja, lo sustituye por **`U+FFFD`** (�).",
      "Devuelve la nueva cadena; la original no cambia.",
    ],
    sintaxis: [
      {
        code: `cadena.toWellFormed();`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** una **nueva** cadena bien formada.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Limpiar un lone surrogate",
        code: `// \\uD83D es la primera mitad incompleta de un emoji
const cadenaCorrupta = "Hola \\uD83D mundo";

console.log(cadenaCorrupta.toWellFormed());
// "Hola � mundo"`,
      },
      {
        titulo: "Ejemplo 2: Evitar el error en encodeURIComponent()",
        code: `const entradaMala = "Subida \\uD83D";

// encodeURIComponent(entradaMala); // ❌ URIError

const entradaSegura = entradaMala.toWellFormed();
console.log(encodeURIComponent(entradaSegura));
// "Subida%20%EF%BF%BD"`,
      },
      {
        titulo: "Ejemplo 3: Si ya está bien formada, no cambia",
        code: `const textoNormal = "JavaScript 🚀";
console.log(textoNormal.toWellFormed() === textoNormal); // true`,
      },
    ],
    errores: [
      "**Esperar que recupere el emoji original:** `toWellFormed()` no puede adivinar la mitad faltante, solo reemplaza la parte rota con �. La información perdida no se recupera.",
      "**Asumir que modifica el string original:** como todos los métodos de `String`, **retorna una nueva cadena**.",
    ],
    casos: [
      "**Middleware de saneamiento:** sanear los campos de texto recibidos en peticiones HTTP.",
      "**Integración con APIs estrictas** que no toleran UTF-16 mal formado.",
      "**Importación masiva de datos:** evitar que un registro corrupto detenga todo el script.",
    ],
    relacion: [
      "**`isWellFormed()`:** su hermano; solo evalúa (`true`/`false`).",
      "**`\\uFFFD` (carácter de reemplazo):** el valor estándar para algo desconocido o no procesable.",
      "**`encodeURIComponent()`:** la función que más se beneficia de pasar antes por `toWellFormed()`.",
    ],
    analogia:
      "Si `isWellFormed()` es un **inspector de calidad** que avisa que a una mesa le falta una pata, `toWellFormed()` es el **carpintero**: no sabe cómo era la pata original, pero le pone un soporte estándar (el símbolo �) para que la mesa no se caiga.",
    fuente: "MDN Web Docs | ECMAScript 2023 (ECMA-262)",
    notasPersonales: [
      "Crear un helper de limpieza que aplique `.trim().toWellFormed()` a todas las entradas de formularios.",
      "Soportado de forma nativa desde Node.js 20+ y navegadores modernos (2023 en adelante).",
    ],
    quiz: Q([
      [
        "¿Qué reemplaza toWellFormed() por cada lone surrogate?",
        ["Un espacio", "U+FFFD (�)", "Una cadena vacía", "Un '?'"],
        1,
      ],
      [
        "¿Qué devuelve toWellFormed()?",
        [
          "Un booleano",
          "Una nueva cadena",
          "El mismo string mutado",
          "undefined",
        ],
        1,
      ],
      [
        "¿Qué hace con un surrogate pair válido?",
        ["Lo elimina", "Lo mantiene intacto", "Lo reemplaza", "Lanza error"],
        1,
      ],
      [
        "¿Recupera el emoji original perdido?",
        [
          "Sí",
          "No, solo reemplaza la parte rota",
          "Solo en Node",
          "Solo con emojis",
        ],
        1,
      ],
      [
        "¿Qué diferencia hay con isWellFormed()?",
        [
          "Ninguna",
          "isWellFormed comprueba; toWellFormed corrige",
          "toWellFormed solo comprueba",
          "isWellFormed devuelve string",
        ],
        1,
      ],
      [
        "¿Qué devuelve 'JavaScript 🚀'.toWellFormed() === 'JavaScript 🚀'?",
        ["true", "false", "undefined", "Un error"],
        0,
      ],
      [
        "¿Qué función evita fallar si antes pasas el texto por toWellFormed()?",
        ["encodeURIComponent()", "parseInt()", "Math.max()", "Array.from()"],
        0,
      ],
      [
        "¿toWellFormed() modifica el string original?",
        ["Sí", "No", "Solo si es let", "Depende"],
        1,
      ],
    ]),
  },

  /* ============================ startsWith() ============================ */
  startswith: {
    id: "startswith",
    titulo: "String.prototype.startsWith()",
    simulador: "string",
    definicion: [
      "Método built-in de los `String` que evalúa si una cadena **comienza con los caracteres especificados** en otra cadena.",
    ],
    queEs: [
      "Función de búsqueda y comprobación introducida en **ECMAScript 2015 (ES6)**.",
      "Devuelve un booleano (`true` o `false`).",
      "Es **sensible a mayúsculas y minúsculas** (*case-sensitive*).",
    ],
    paraQueSirve: [
      "**Validar prefijos:** protocolos de URL (`https://`).",
      "**Filtrar listados** que comiencen con una letra, prefijo o código (`+51`, `+34`).",
      "**Procesar texto/Markdown:** detectar si una línea empieza con `#` o con un carácter especial.",
    ],
    comoFunciona: [
      "Compara el inicio de la cadena con la cadena de búsqueda.",
      "Opcionalmente, una **posición inicial** indica desde dónde empieza la comparación.",
      "Devuelve `true` si todos los caracteres coinciden, `false` en caso contrario.",
    ],
    sintaxis: [
      {
        code: `cadena.startsWith(searchString, position);`,
      },
    ],
    nota: "**`searchString`:** lo que buscas al inicio. **`position`** *(opcional)*: desde dónde empieza la comprobación (por defecto `0`). **Retorno:** `true` o `false`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico",
        code: `const texto = "JavaScript es genial";

console.log(texto.startsWith("JavaScript")); // true
console.log(texto.startsWith("javascript")); // false (case-sensitive)
console.log(texto.startsWith("genial"));     // false`,
      },
      {
        titulo: "Ejemplo 2: Con el parámetro position",
        code: `const mensaje = "Hola Mundo";

// ¿empieza por "Mundo" a partir del índice 5?
console.log(mensaje.startsWith("Mundo", 5)); // true`,
      },
      {
        titulo: "Ejemplo 3: Validar el protocolo de una URL",
        code: `function esConexionSegura(url) {
  return url.startsWith("https://");
}

esConexionSegura("https://ejemplo.com"); // true
esConexionSegura("http://ejemplo.com");  // false`,
      },
    ],
    errores: [
      {
        texto: "**Sensibilidad a mayúsculas y minúsculas:**",
        code: `"HTTP://sitio.com".startsWith("http://"); // false

// Solución: normalizar antes
"HTTP://sitio.com".toLowerCase().startsWith("http://"); // true`,
      },
      "**Pasar una expresión regular:** `startsWith()` **no acepta** `RegExp`; lanza `TypeError`.",
      '**Confundir con `indexOf()`:** `str.indexOf("x") === 0` logra algo similar, pero `startsWith()` es más legible y expresivo.',
    ],
    casos: [
      {
        texto: "**Rutas y navegación:**",
        code: `location.pathname.startsWith("/admin");`,
      },
      "**Parsers de comandos:** detectar prefijos como `!help` o `/start`.",
      "**Sanitización de datos:** comprobar si un teléfono incluye el código de país.",
    ],
    relacion: [
      "**`endsWith()`:** su contraparte; evalúa cómo **termina**.",
      "**`includes()`:** busca en **cualquier posición**.",
      "**`indexOf()`:** devuelve el índice donde empieza una subcadena (o `-1`).",
    ],
    analogia:
      "Es como **revisar las primeras palabras de una carta**. No lees toda la página: solo miras el encabezado para ver si empieza con *«Estimado señor»* o con *«Hola»*, ignorando el resto.",
    fuente: "MDN Web Docs | ECMAScript Specification (ECMA-262)",
    notasPersonales: [
      "Búsquedas flexibles: `str.toLowerCase().startsWith(busqueda.toLowerCase())`.",
      "Disponible en todos los entornos modernos desde ES6 (2015).",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'JavaScript'.startsWith('Java')?",
        ["true", "false", "0", "undefined"],
        0,
      ],
      [
        "¿Qué devuelve 'JavaScript'.startsWith('java')?",
        ["true", "false", "Un error", "undefined"],
        1,
      ],
      [
        "¿Para qué sirve el segundo parámetro?",
        [
          "Longitud máxima",
          "Posición desde donde se comprueba",
          "Cantidad de resultados",
          "Un callback",
        ],
        1,
      ],
      [
        "¿Qué devuelve 'Hola Mundo'.startsWith('Mundo', 5)?",
        ["true", "false", "5", "Un error"],
        0,
      ],
      [
        "¿Qué pasa si le pasas una RegExp?",
        ["Funciona", "Lanza TypeError", "Devuelve false", "Devuelve true"],
        1,
      ],
      [
        "¿En qué versión de ECMAScript se introdujo?",
        ["ES5", "ES2015 (ES6)", "ES2023", "ES2010"],
        1,
      ],
      [
        "¿Cuál es su contraparte para el final del texto?",
        ["endsWith()", "includes()", "indexOf()", "slice()"],
        0,
      ],
      [
        "¿Cómo ignoras mayúsculas al usar startsWith()?",
        [
          "No se puede",
          "Aplicando toLowerCase() a ambos antes",
          "Con un flag i",
          "Con position = -1",
        ],
        1,
      ],
    ]),
  },

  /* ============================ endsWith() ============================ */
  endswith: {
    id: "endswith",
    titulo: "String.prototype.endsWith()",
    simulador: "string",
    definicion: [
      "Método built-in de los `String` que evalúa si una cadena **termina con los caracteres especificados** en otra cadena.",
    ],
    queEs: [
      "Función de búsqueda y validación introducida en **ECMAScript 2015 (ES6)**.",
      "Devuelve un booleano (`true` o `false`).",
      "Es **sensible a mayúsculas y minúsculas** (*case-sensitive*).",
    ],
    paraQueSirve: [
      "Validar **extensiones de archivos** (`.pdf`, `.png`, `.js`).",
      "Verificar dominios y URLs (si termina en `.com` o `.org`).",
      "Comprobar patrones al final de un texto (signos de puntuación, sufijos).",
    ],
    comoFunciona: [
      "Compara el final de la cadena con la cadena de búsqueda.",
      "Opcionalmente, un segundo parámetro (`length`) limita la longitud que se evalúa.",
      "Con `length`, el método se comporta como si la cadena tuviera solo esa longitud.",
    ],
    sintaxis: [
      {
        code: `cadena.endsWith(searchString, length);`,
      },
    ],
    nota: "**`searchString`:** lo que buscas al final. **`length`** *(opcional)*: longitud a considerar (por defecto `str.length`). **Retorno:** `true` o `false`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico",
        code: `const texto = "Hola mundo JavaScript";

console.log(texto.endsWith("JavaScript")); // true
console.log(texto.endsWith("javascript")); // false (case-sensitive)
console.log(texto.endsWith("mundo"));      // false`,
      },
      {
        titulo: "Ejemplo 2: Con el parámetro length",
        code: `const archivo = "documento_v1_final.pdf";

// Solo se evalúan los primeros 9 caracteres: "documento"
console.log(archivo.endsWith("mento", 9)); // true

// Solo los primeros 12: "documento_v1"
console.log(archivo.endsWith("v1", 12));   // true`,
      },
      {
        titulo: "Ejemplo 3: Validar la extensión de un archivo",
        code: `function esImagen(nombreArchivo) {
  return nombreArchivo.endsWith(".png") || nombreArchivo.endsWith(".jpg");
}

esImagen("foto.png");  // true
esImagen("script.js"); // false`,
      },
    ],
    errores: [
      {
        texto: "**Confundir mayúsculas y minúsculas:**",
        code: `"FOTO.PNG".endsWith(".png"); // false

// Solución: normalizar antes
"FOTO.PNG".toLowerCase().endsWith(".png"); // true`,
      },
      "**Malentender `length`:** no indica desde dónde empieza la búsqueda, sino el **límite máximo** hacia la derecha (la longitud simulada de la cadena).",
      "**Pasar una expresión regular:** solo acepta strings; con una `RegExp` lanza `TypeError`.",
    ],
    casos: [
      "**Subida de archivos:** verificar que el usuario suba solo extensiones permitidas.",
      {
        texto: "**Detectar preguntas o exclamaciones:**",
        code: `const esPregunta = (texto) => texto.trim().endsWith("?");`,
      },
      "**Enrutamiento web:** comprobar si una ruta termina en `/` o en cierta extensión.",
    ],
    relacion: [
      "**`startsWith()`:** evalúa cómo **empieza** una cadena.",
      "**`includes()`:** evalúa si el texto está en **cualquier parte**.",
      "**`indexOf()` / `lastIndexOf()`:** métodos clásicos previos a ES6 para lograr algo similar buscando la posición.",
    ],
    analogia:
      "Es como mirar **solo las últimas letras de una palabra** para ver si riman o tienen cierto sufijo (como *-mente* o *-ción*), ignorando todo lo que estaba escrito antes.",
    fuente: "MDN Web Docs | ECMAScript Language Specification (ECMA-262)",
    notasPersonales: [
      "Aplica `.toLowerCase()` antes de `endsWith()` con inputs de usuarios donde las mayúsculas no importen.",
      "Disponible desde ES6 (todos los navegadores modernos y Node.js).",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'foto.png'.endsWith('.png')?",
        ["true", "false", "4", "undefined"],
        0,
      ],
      [
        "¿Qué devuelve 'FOTO.PNG'.endsWith('.png')?",
        ["true", "false", "Un error", "undefined"],
        1,
      ],
      [
        "¿Qué indica el parámetro length?",
        [
          "Desde dónde empieza la búsqueda",
          "La longitud simulada de la cadena (límite a la derecha)",
          "Cuántas veces buscar",
          "El número de resultados",
        ],
        1,
      ],
      [
        "¿Qué devuelve 'documento_v1_final.pdf'.endsWith('mento', 9)?",
        ["true", "false", "9", "Un error"],
        0,
      ],
      [
        "¿Qué pasa si le pasas una RegExp?",
        ["Funciona", "Lanza TypeError", "Devuelve false", "Devuelve true"],
        1,
      ],
      [
        "¿Cuál es su contraparte para el inicio?",
        ["startsWith()", "includes()", "slice()", "padStart()"],
        0,
      ],
      [
        "¿Para qué sirve en un sistema de subida de archivos?",
        [
          "Comprimir el archivo",
          "Verificar que tenga una extensión permitida",
          "Renombrarlo",
          "Calcular su tamaño",
        ],
        1,
      ],
      [
        "¿Qué devuelve '¿Cómo estás?'.endsWith('?')?",
        ["true", "false", "'?'", "undefined"],
        0,
      ],
    ]),
  },

  /* ============================ substr() ============================ */
  substr: {
    id: "substr",
    titulo: "String.prototype.substr()",
    simulador: "string",
    obsoleto: true,
    definicion: [
      "Era un método de `String.prototype` que devolvía una **nueva cadena** extrayendo una cantidad específica de caracteres desde una posición inicial.",
      "**Actualmente está obsoleto (deprecated)** y **no se recomienda utilizarlo** en código nuevo. Usa `slice()` o `substring()` en su lugar.",
    ],
    queEs: [
      "Es un **método heredado** de `String.prototype`, marcado como **obsoleto** en el estándar.",
      "No modifica la cadena original: devuelve una nueva.",
      "Aunque muchos navegadores aún lo soportan por compatibilidad, podría desaparecer en el futuro.",
    ],
    paraQueSirve: [
      "Históricamente se usaba para extraer una parte de una cadena indicando **cuántos caracteres** tomar desde un punto.",
      "Hoy se recomienda reemplazarlo por `slice()` (más flexible) o `substring()`.",
    ],
    comoFunciona: [
      "Se indica la posición inicial.",
      "Se indica cuántos caracteres se desean extraer (segundo parámetro = **longitud**, no índice final).",
      "JavaScript crea una nueva cadena con esos caracteres.",
      "La cadena original permanece sin cambios.",
    ],
    sintaxis: [
      {
        code: `cadena.substr(inicio);
cadena.substr(inicio, longitud);`,
      },
    ],
    nota: "**`inicio`:** posición de inicio (puede ser negativa). **`longitud` (opcional):** número de caracteres a extraer. Si se omite, extrae hasta el final.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Extraer desde una posición",
        code: `const texto = "JavaScript";
console.log(texto.substr(4)); // "Script"`,
      },
      {
        titulo: "Ejemplo 2: Extraer una cantidad específica",
        code: `const texto = "JavaScript";
console.log(texto.substr(0, 4)); // "Java"`,
      },
      {
        titulo: "Ejemplo 3: Índice negativo",
        code: `const texto = "JavaScript";
console.log(texto.substr(-6, 6)); // "Script"`,
      },
      {
        titulo: "Ejemplo 4: La cadena original no cambia",
        code: `const texto = "Hola Mundo";
const parte = texto.substr(5);
console.log(texto); // "Hola Mundo"
console.log(parte); // "Mundo"`,
      },
    ],
    errores: [
      {
        texto:
          "**Usarlo en proyectos nuevos:** está obsoleto. Aunque funcione, no se recomienda.",
        code: `// ❌ En código nuevo
texto.substr(0, 5);

// ✅ Alternativa recomendada
texto.slice(0, 5);`,
      },
      {
        texto:
          "**Confundir el segundo parámetro:** en `substr()` el segundo argumento es la **cantidad de caracteres**, no el índice final.",
        code: `"JavaScript".substr(2, 4);    // "vaSc" (4 caracteres desde el 2)
"JavaScript".substring(2, 4); // "va"   (del índice 2 al 4)`,
      },
      {
        texto: "**Pensar que modifica la cadena:** los strings son inmutables.",
        code: `let texto = "Hola";
texto.substr(1);
console.log(texto); // "Hola"`,
      },
    ],
    casos: [
      "**Históricamente:** extraer fragmentos de texto con cantidad fija.",
      "**Hoy:** sustituirlo por `slice()` o `substring()`.",
    ],
    relacion: [
      {
        texto:
          "**`slice()`:** alternativa moderna y recomendada (acepta índices negativos).",
        code: `"JavaScript".slice(0, 4); // "Java"`,
      },
      {
        texto: "**`substring()`:** extrae por rango de índices (inicio, fin).",
        code: `"JavaScript".substring(0, 4); // "Java"`,
      },
      "**Deprecated:** aunque sigue funcionando en muchos entornos, no forma parte del estándar ECMAScript actual.",
    ],
    analogia:
      'Imagina que estás leyendo un libro. Con `substr()` dices: **"empieza en la página 20 y léeme las siguientes 5 páginas"**. No importa dónde termine el libro: solo quieres una **cantidad específica** de páginas. Con `slice()` dirías: **"léeme desde la página 20 hasta la página 25"**. Esa diferencia es clave.',
    fuente: "MDN Web Docs | String.prototype.substr() (Obsoleto)",
    notasPersonales: [
      "**Regla:** si ves `substr()` en código ajeno, entiende que el segundo argumento es **longitud**, no índice final. Y si puedes, migra a `slice()`.",
    ],
    quiz: Q([
      [
        '¿Qué devuelve "JavaScript".substr(4)?',
        ['"Java"', '"Script"', '"JavaScript"', "Un error"],
        1,
      ],
      [
        '¿Qué devuelve "JavaScript".substr(0, 4)?',
        ['"Java"', '"Script"', '"Scri"', '"Jav"'],
        0,
      ],
      [
        "¿Qué significa el segundo parámetro de substr()?",
        [
          "Índice final",
          "Cantidad de caracteres a extraer",
          "Separador",
          "Un callback",
        ],
        1,
      ],
      [
        '¿Qué devuelve "JavaScript".substr(-6, 6)?',
        ['"Script"', '"Java"', '"ScriptJ"', "Un error"],
        0,
      ],
      [
        "¿substr() modifica la cadena original?",
        [
          "Sí",
          "No, devuelve una nueva",
          "Solo con strings largos",
          "Depende del navegador",
        ],
        1,
      ],
      [
        "¿Qué método se recomienda en su lugar?",
        ["slice()", "concat()", "repeat()", "charCodeAt()"],
        0,
      ],
      [
        '¿Qué devuelve "JavaScript".substr(2, 4)?',
        ['"vaSc"', '"va"', '"vascript"', '"avaS"'],
        0,
      ],
      [
        "¿substr() forma parte del estándar ECMAScript actual?",
        [
          "Sí",
          "No, está obsoleto",
          "Solo en navegadores modernos",
          "Solo en Node.js",
        ],
        1,
      ],
    ]),
  },
  /* ============================ toUpperCase() ============================ */
  touppercase: {
    id: "touppercase",
    titulo: "String.prototype.toUpperCase()",
    simulador: "string",
    definicion: [
      "Es un método built-in de los objetos `String` que devuelve la cadena de texto con **todos sus caracteres alfabéticos convertidos a mayúsculas**.",
    ],
    queEs: [
      "Es un método de **transformación y normalización** de cadenas de texto.",
      "**No modifica la cadena original** (los *strings* en JavaScript son inmutables), sino que retorna un **nuevo texto** con la conversión aplicada.",
      "Trabaja carácter por carácter según el mapeo Unicode de mayúsculas.",
    ],
    paraQueSirve: [
      "**Normalización de datos:** comparar cadenas sin importar cómo las escribió el usuario (emails, códigos promocionales, usernames).",
      "**Formato de UI:** mostrar encabezados, siglas o etiquetas totalmente en mayúsculas por diseño.",
      "**Búsquedas insensibles a mayúsculas:** facilitar comprobaciones junto a `endsWith()`, `startsWith()` o `includes()`.",
    ],
    comoFunciona: [
      "Recorre cada carácter del string original.",
      "Si detecta una letra minúscula, la reemplaza por su equivalente en mayúscula según el mapeo Unicode.",
      "Los caracteres que no son letras (números, símbolos, espacios, emojis) se mantienen **exactamente igual**.",
      "Devuelve una nueva cadena; la original permanece intacta.",
    ],
    sintaxis: [
      {
        code: `str.toUpperCase();`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** una nueva cadena con todas las letras en mayúsculas.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico",
        code: `const mensaje = "hola mundo 123!";
const enMayusculas = mensaje.toUpperCase();

console.log(enMayusculas); // "HOLA MUNDO 123!"
console.log(mensaje);      // "hola mundo 123!" (el original no cambia)`,
      },
      {
        titulo: "Ejemplo 2: Normalización para comparaciones",
        code: `const codigoIngresado = "descuento2026";
const codigoValido = "DESCUENTO2026";

if (codigoIngresado.toUpperCase() === codigoValido.toUpperCase()) {
  console.log("¡Código de descuento aplicado!");
}`,
      },
      {
        titulo: "Ejemplo 3: Encadenamiento de métodos",
        code: `const archivo = "Documento.PDF";

if (archivo.toUpperCase().endsWith(".PDF")) {
  console.log("Es un archivo PDF.");
}`,
      },
    ],
    errores: [
      {
        texto:
          "**Creer que modifica el string original:** las cadenas son inmutables. Hacer `texto.toUpperCase()` no cambia la variable `texto`.",
        code: `// ❌ El original no cambia
let texto = "hola";
texto.toUpperCase();
console.log(texto); // "hola"

// ✅ Hay que reasignar
texto = texto.toUpperCase();
console.log(texto); // "HOLA"`,
      },
      {
        texto:
          "**Llamarlo sobre `null` o `undefined`:** lanza `TypeError`. Usa encadenamiento opcional si el valor puede faltar.",
        code: `// ❌ TypeError
const val = null;
val.toUpperCase();

// ✅ Seguro con optional chaining
val?.toUpperCase(); // undefined`,
      },
      "**Casos especiales de idioma (Localización):** en idiomas como el turco, la `i` minúscula no se convierte en la `I` estándar. Para eso existe `toLocaleUpperCase()`.",
    ],
    casos: [
      "**Códigos de cupón / Tokens:** estandarizar entradas de usuario para que `cupon20` y `CUPON20` funcionen igual.",
      "**Abreviaturas:** convertir entradas de países (`es`, `mx`) o identificadores a su estándar en mayúsculas (`ES`, `MX`).",
      "**Limpieza de inputs:** normalizar entradas antes de guardarlas en una base de datos o enviarlas a una API.",
    ],
    relacion: [
      "**`String.prototype.toLowerCase()`:** su contraparte directa; convierte todo el texto a minúsculas.",
      "**`String.prototype.toLocaleUpperCase()`:** variante que respeta las reglas de mapeo según la configuración regional (*locale*).",
      "**Inmutabilidad:** principio de JS por el cual los métodos de string nunca alteran la cadena existente, sino que retornan una nueva.",
    ],
    analogia:
      "Es como activar el **Bloq Mayús** (*Caps Lock*) en tu teclado antes de empezar a escribir un documento, o usar un sello con todas las letras en mayúscula: la información y el mensaje siguen siendo los mismos, pero cambia la presentación visual de cada letra.",
    fuente:
      "MDN Web Docs - String.prototype.toUpperCase() | Especificación ECMAScript (ECMA-262)",
    notasPersonales: [
      "**Siempre** guardar o asignar el resultado a una variable, ya que la cadena original nunca se modifica.",
      "**Para comparaciones case-insensitive:** la práctica habitual es llevar ambas cadenas a `.toLowerCase()` o a `.toUpperCase()` antes de evaluar la igualdad.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'hola'.toUpperCase()?",
        ["'hola'", "'HOLA'", "'Hola'", "undefined"],
        1,
      ],
      [
        "¿toUpperCase() modifica la cadena original?",
        [
          "Sí, siempre",
          "No, devuelve una nueva",
          "Solo si es let",
          "Solo con strings largos",
        ],
        1,
      ],
      [
        "¿Qué pasa con los números y símbolos al aplicar toUpperCase()?",
        [
          "Se convierten a mayúsculas",
          "Se eliminan",
          "Se mantienen igual",
          "Lanzan un error",
        ],
        2,
      ],
      [
        "¿Qué devuelve 'abc123!'.toUpperCase()?",
        ["'ABC123!'", "'abc123!'", "'ABC'", "'123!'"],
        0,
      ],
      [
        "¿Qué pasa si llamas toUpperCase() sobre null?",
        [
          "Devuelve 'null'",
          "Devuelve ''",
          "Lanza TypeError",
          "Devuelve undefined",
        ],
        2,
      ],
      [
        "¿Qué método hace la operación inversa?",
        ["toLocaleUpperCase()", "toLowerCase()", "trim()", "padEnd()"],
        1,
      ],
      [
        "¿Cuál es la variante que respeta el idioma (locale)?",
        [
          "toUpperCase()",
          "toLocaleUpperCase()",
          "toLocaleLowerCase()",
          "localeCompare()",
        ],
        1,
      ],
      [
        "¿Por qué es mejor usar toUpperCase() antes de comparar códigos como 'PROMO2026'?",
        [
          "Para que se vea más bonito",
          "Porque las cadenas son inmutables",
          "Para ignorar mayúsculas y minúsculas en la comparación",
          "Para limpiar espacios",
        ],
        2,
      ],
    ]),
  },

  /* ============================ toLowerCase() ============================ */
  tolowercase: {
    id: "tolowercase",
    titulo: "String.prototype.toLowerCase()",
    simulador: "string",
    definicion: [
      "Es un método built-in de los objetos `String` que devuelve la cadena de texto con **todos sus caracteres alfabéticos convertidos a minúsculas**.",
    ],
    queEs: [
      "Es un método de **transformación y normalización** de cadenas de texto.",
      "**No modifica la cadena original** (los *strings* en JavaScript son inmutables), sino que retorna un **nuevo texto** con la conversión aplicada.",
      "Trabaja carácter por carácter según el mapeo Unicode de minúsculas.",
    ],
    paraQueSirve: [
      "**Normalización de datos:** comparar cadenas sin importar cómo las escribió el usuario (emails, usernames, búsquedas).",
      "**Formato de UI:** mostrar etiquetas, párrafos o mensajes en minúsculas por diseño.",
      "**Búsquedas insensibles a mayúsculas:** facilitar comprobaciones junto a `endsWith()`, `startsWith()` o `includes()`.",
    ],
    comoFunciona: [
      "Recorre cada carácter del string original.",
      "Si detecta una letra mayúscula, la reemplaza por su equivalente en minúscula según el mapeo Unicode.",
      "Los caracteres que no son letras (números, símbolos, espacios, emojis) se mantienen **exactamente igual**.",
      "Devuelve una nueva cadena; la original permanece intacta.",
    ],
    sintaxis: [
      {
        code: `str.toLowerCase();`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** una nueva cadena con todas las letras en minúsculas.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico",
        code: `const mensaje = "HOLA MUNDO 123!";
const enMinusculas = mensaje.toLowerCase();

console.log(enMinusculas); // "hola mundo 123!"
console.log(mensaje);      // "HOLA MUNDO 123!" (el original no cambia)`,
      },
      {
        titulo: "Ejemplo 2: Normalización para comparaciones",
        code: `const usuarioIngresado = "ADMIN";
if (usuarioIngresado.toLowerCase() === "admin") {
  console.log("Acceso permitido");
}`,
      },
      {
        titulo: "Ejemplo 3: Encadenamiento de métodos",
        code: `const archivo = "DOCUMENTO.PDF";

if (archivo.toLowerCase().endsWith(".pdf")) {
  console.log("Es un archivo PDF.");
}`,
      },
    ],
    errores: [
      {
        texto:
          "**Creer que modifica el string original:** las cadenas son inmutables. Hacer `texto.toLowerCase()` no cambia la variable `texto`.",
        code: `// ❌ El original no cambia
let texto = "HOLA";
texto.toLowerCase();
console.log(texto); // "HOLA"

// ✅ Hay que reasignar
texto = texto.toLowerCase();
console.log(texto); // "hola"`,
      },
      {
        texto:
          "**Llamarlo sobre `null` o `undefined`:** lanza `TypeError`. Usa encadenamiento opcional si el valor puede faltar.",
        code: `// ❌ TypeError
const val = null;
val.toLowerCase();

// ✅ Seguro con optional chaining
val?.toLowerCase(); // undefined`,
      },
      "**Casos especiales de idioma (Localización):** en idiomas como el turco, la `I` mayúscula no se convierte en la `i` estándar. Para eso existe `toLocaleLowerCase()`.",
    ],
    casos: [
      "**Normalización de emails:** `email.toLowerCase().trim()` antes de guardar o comparar.",
      "**Búsquedas de productos:** comparar la entrada del usuario en minúsculas con un catálogo ya normalizado.",
      "**Identificadores de usuario:** guardar los usernames en minúsculas para evitar duplicados como `Admin` y `admin`.",
    ],
    relacion: [
      "**`String.prototype.toUpperCase()`:** su contraparte directa; convierte todo el texto a mayúsculas.",
      "**`String.prototype.toLocaleLowerCase()`:** variante que respeta las reglas de mapeo según la configuración regional (*locale*).",
      "**`String.prototype.trim()`:** se combina con `toLowerCase()` para normalizar entradas de usuario.",
      "**Inmutabilidad:** principio de JS por el cual los métodos de string nunca alteran la cadena existente, sino que retornan una nueva.",
    ],
    analogia:
      "Imagina que tienes un documento escrito completamente en **MAYÚSCULAS**. `toLowerCase()` es como hacer una **fotocopia** del documento y convertir todas las letras de esa copia a **minúsculas**: el original queda intacto y tú trabajas con la copia en minúsculas.",
    fuente:
      "MDN Web Docs - String.prototype.toLowerCase() | Especificación ECMAScript (ECMA-262)",
    notasPersonales: [
      "**Siempre** guardar o asignar el resultado a una variable, ya que la cadena original nunca se modifica.",
      "**Para comparaciones case-insensitive:** la práctica habitual es llevar ambas cadenas a `.toLowerCase()` o a `.toUpperCase()` antes de evaluar la igualdad.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'HOLA'.toLowerCase()?",
        ["'HOLA'", "'hola'", "'Hola'", "undefined"],
        1,
      ],
      [
        "¿toLowerCase() modifica la cadena original?",
        [
          "Sí, siempre",
          "No, devuelve una nueva",
          "Solo si es let",
          "Solo con strings largos",
        ],
        1,
      ],
      [
        "¿Qué pasa con los números y símbolos al aplicar toLowerCase()?",
        [
          "Se convierten a mayúsculas",
          "Se eliminan",
          "Se mantienen igual",
          "Lanzan un error",
        ],
        2,
      ],
      [
        "¿Qué devuelve 'ABC123!'.toLowerCase()?",
        ["'abc123!'", "'ABC123!'", "'abc'", "'123!'"],
        0,
      ],
      [
        "¿Qué pasa si llamas toLowerCase() sobre undefined?",
        [
          "Devuelve 'undefined'",
          "Devuelve ''",
          "Lanza TypeError",
          "Devuelve null",
        ],
        2,
      ],
      [
        "¿Qué método hace la operación inversa?",
        ["toLocaleLowerCase()", "toUpperCase()", "trim()", "padEnd()"],
        1,
      ],
      [
        "¿Cuál es la variante que respeta el idioma (locale)?",
        [
          "toLowerCase()",
          "toLocaleLowerCase()",
          "toLocaleUpperCase()",
          "localeCompare()",
        ],
        1,
      ],
      [
        "¿Por qué es buena práctica usar toLowerCase() en emails antes de guardarlos?",
        [
          "Para que se vean mejor",
          "Para ignorar mayúsculas y evitar duplicados",
          "Porque ocupa menos",
          "Para borrar espacios",
        ],
        1,
      ],
    ]),
  },

  /* ============================ toLocaleUpperCase() ============================ */
  tolocaleuppercase: {
    id: "tolocaleuppercase",
    titulo: "String.prototype.toLocaleUpperCase()",
    simulador: "string",
    definicion: [
      "Es un método built-in de los objetos `String` que devuelve la cadena de texto con **todos sus caracteres alfabéticos convertidos a mayúsculas**, teniendo en cuenta las **reglas de conversión específicas de un `locale`** (idioma/región).",
    ],
    queEs: [
      "Es un método de **transformación e internacionalización (i18n)** de cadenas de texto.",
      "Funciona igual que `toUpperCase()` en la mayoría de idiomas, pero puede producir **resultados distintos** cuando el idioma tiene reglas especiales de mayúsculas.",
      "**No modifica la cadena original**, sino que retorna un **nuevo texto** con la conversión aplicada.",
    ],
    paraQueSirve: [
      "**Internacionalización (i18n):** mostrar texto correctamente en mayúsculas en idiomas con reglas especiales (ej. turco, azerí, lituano).",
      "**Formularios multilingües:** normalizar nombres o campos de texto respetando el idioma del usuario.",
      "**Interfaces localizadas:** aplicar el estilo correcto (`MAYÚSCULAS`, `mayúsculas`) según la región.",
    ],
    comoFunciona: [
      "Recibe **opcionalmente** uno o varios `locales` como etiquetas BCP 47 (`'tr'`, `'en'`, `['tr','en']`).",
      "Si no se pasa ningún locale, usa el **locale predeterminado del entorno**.",
      "Recorre cada carácter y aplica el mapeo de mayúsculas **según las reglas Unicode del locale indicado**.",
      "Los caracteres que no son letras (números, símbolos, espacios, emojis) se mantienen **igual**.",
      "Devuelve una nueva cadena; la original permanece intacta.",
    ],
    sintaxis: [
      {
        code: `str.toLocaleUpperCase();
str.toLocaleUpperCase(locales);`,
      },
    ],
    nota: "**`locales` (opcional):** string o array de etiquetas BCP 47. **Retorno:** una nueva cadena con todas las letras en mayúsculas según el locale.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico sin locale",
        code: `const texto = "hola mundo";
console.log(texto.toLocaleUpperCase()); // "HOLA MUNDO"`,
      },
      {
        titulo: "Ejemplo 2: Especificando español",
        code: `const texto = "hola mundo";
console.log(texto.toLocaleUpperCase("es")); // "HOLA MUNDO"`,
      },
      {
        titulo: "Ejemplo 3: El caso especial del turco 🇹🇷",
        descripcion:
          "En turco, la `i` minúscula se convierte en `İ` (con punto), no en `I`.",
        code: `console.log("i".toUpperCase());              // "I"  (regla general)
console.log("i".toLocaleUpperCase("tr"));   // "İ"  (regla turca)

console.log("istanbul".toUpperCase());            // "ISTANBUL"
console.log("istanbul".toLocaleUpperCase("tr"));  // "İSTANBUL"`,
      },
      {
        titulo: "Ejemplo 4: No modifica el original",
        code: `const palabra = "hola";
const mayuscula = palabra.toLocaleUpperCase();

console.log(palabra);   // "hola"
console.log(mayuscula); // "HOLA"`,
      },
    ],
    errores: [
      {
        texto:
          "**Creer que traduce texto:** `toLocaleUpperCase()` solo **cambia la capitalización**; no traduce el texto al idioma del locale.",
        code: `// ❌ No traduce "hello" a "HOLA"
"hello".toLocaleUpperCase("es"); // "HELLO" (sigue siendo inglés)`,
      },
      {
        texto:
          "**Pensar que modifica el string original:** las cadenas son inmutables.",
        code: `// ❌ El original no cambia
let texto = "hola";
texto.toLocaleUpperCase();
console.log(texto); // "hola"

// ✅ Hay que reasignar
texto = texto.toLocaleUpperCase();
console.log(texto); // "HOLA"`,
      },
      {
        texto: "**Usar un locale inválido:** lanza `RangeError`.",
        code: `// ❌ RangeError: Incorrect locale information
"hola".toLocaleUpperCase("esto-no-es-un-locale");`,
      },
      "**Confundirlo con `toUpperCase()`:** en la mayoría de casos producen lo mismo; la diferencia aparece con idiomas que tienen reglas especiales (turco, lituano, azerí...).",
    ],
    casos: [
      "**Aplicaciones multilingües:** mostrar nombres o etiquetas correctamente en cada idioma.",
      "**Formularios con locale:** transformar entradas según la región del usuario.",
      "**Contenido con caracteres especiales:** respetar reglas de idiomas como el turco.",
    ],
    relacion: [
      "**`String.prototype.toUpperCase()`:** versión general (sin locale). Suele coincidir, pero no siempre.",
      "**`String.prototype.toLocaleLowerCase()`:** contraparte a minúsculas respetando locale.",
      "**`String.prototype.localeCompare()`:** también usa reglas de locale, pero para **comparar** en lugar de transformar.",
      "**`Intl` API:** familia de objetos de internacionalización de JS.",
      "**BCP 47:** estándar para etiquetas de idioma (`'es-MX'`, `'tr'`, `'en-US'`).",
    ],
    analogia:
      "Imagina que tienes un **traductor** que sabe que **cada idioma tiene sus propias reglas de escritura**. `toUpperCase()` dice: *«convierte esto a mayúsculas con la regla general»*. `toLocaleUpperCase('tr')` dice: *«convierte esto a mayúsculas **siguiendo específicamente las reglas del turco**»*. No traduce el texto, solo adapta la capitalización.",
    fuente:
      "MDN Web Docs - String.prototype.toLocaleUpperCase() | Especificación ECMA-402 (Intl)",
    notasPersonales: [
      "**Palabras clave:** `String` · `Mayúsculas` · `Locale` · `Internacionalización` · `i18n` · `Unicode`.",
      "**Recordar:** `toLocaleUpperCase()` = convertir a MAYÚSCULAS respetando reglas de un locale.",
      "**No confundir:** *locale* **no** significa traducir. Solo adapta determinadas reglas de conversión al locale indicado.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'hola'.toLocaleUpperCase()?",
        ["'hola'", "'HOLA'", "'Hola'", "undefined"],
        1,
      ],
      [
        "¿Para qué sirve el parámetro 'locales'?",
        [
          "Para traducir el texto",
          "Para elegir reglas de conversión según idioma/región",
          "Para cambiar el color",
          "Para ordenar el array",
        ],
        1,
      ],
      [
        "¿Qué devuelve 'i'.toLocaleUpperCase('tr')?",
        ["'I'", "'İ'", "'i'", "Un error"],
        1,
      ],
      [
        "¿Qué devuelve 'i'.toUpperCase()?",
        ["'I'", "'İ'", "'i'", "Un error"],
        0,
      ],
      [
        "¿toLocaleUpperCase() modifica el string original?",
        [
          "Sí, siempre",
          "No, devuelve una nueva",
          "Solo con let",
          "Depende del locale",
        ],
        1,
      ],
      [
        "¿toLocaleUpperCase() traduce el texto al idioma del locale?",
        [
          "Sí",
          "No, solo cambia la capitalización",
          "Solo en turco",
          "Solo si se pasan dos locales",
        ],
        1,
      ],
      [
        "¿Qué pasa si se pasa un locale inválido?",
        [
          "Devuelve el original",
          "Lanza RangeError",
          "Lanza TypeError",
          "Devuelve undefined",
        ],
        1,
      ],
      [
        "¿Cuál es la contraparte de toLocaleUpperCase() para minúsculas?",
        [
          "toLowerCase()",
          "toLocaleLowerCase()",
          "toUpperCase()",
          "localeCompare()",
        ],
        1,
      ],
    ]),
  },

  /* ============================ toLocaleLowerCase() ============================ */
  tolocalelowercase: {
    id: "tolocalelowercase",
    titulo: "String.prototype.toLocaleLowerCase()",
    simulador: "string",
    definicion: [
      "Es un método built-in de los objetos `String` que devuelve la cadena de texto con **todos sus caracteres alfabéticos convertidos a minúsculas**, teniendo en cuenta las **reglas de conversión específicas de un `locale`** (idioma/región).",
    ],
    queEs: [
      "Es un método de **transformación e internacionalización (i18n)** de cadenas de texto.",
      "Funciona igual que `toLowerCase()` en la mayoría de idiomas, pero puede producir **resultados distintos** cuando el idioma tiene reglas especiales de minúsculas.",
      "**No modifica la cadena original**, sino que retorna un **nuevo texto** con la conversión aplicada.",
    ],
    paraQueSirve: [
      "**Internacionalización (i18n):** mostrar texto correctamente en minúsculas en idiomas con reglas especiales (ej. turco, azerí).",
      "**Formularios multilingües:** normalizar campos de texto respetando el idioma del usuario.",
      "**Búsquedas locales:** comparar textos en minúsculas respetando las reglas del idioma para evitar falsos negativos.",
    ],
    comoFunciona: [
      "Recibe **opcionalmente** uno o varios `locales` como etiquetas BCP 47 (`'tr'`, `'en'`, `['tr','en']`).",
      "Si no se pasa ningún locale, usa el **locale predeterminado del entorno**.",
      "Recorre cada carácter y aplica el mapeo de minúsculas **según las reglas Unicode del locale indicado**.",
      "Los caracteres que no son letras (números, símbolos, espacios, emojis) se mantienen **igual**.",
      "Devuelve una nueva cadena; la original permanece intacta.",
    ],
    sintaxis: [
      {
        code: `str.toLocaleLowerCase();
str.toLocaleLowerCase(locales);`,
      },
    ],
    nota: "**`locales` (opcional):** string o array de etiquetas BCP 47. **Retorno:** una nueva cadena con todas las letras en minúsculas según el locale.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico sin locale",
        code: `const texto = "HOLA MUNDO";
console.log(texto.toLocaleLowerCase()); // "hola mundo"`,
      },
      {
        titulo: "Ejemplo 2: Especificando español",
        code: `const texto = "HOLA MUNDO";
console.log(texto.toLocaleLowerCase("es")); // "hola mundo"`,
      },
      {
        titulo: "Ejemplo 3: El caso especial del turco 🇹🇷",
        descripcion:
          "En turco, la `I` mayúscula se convierte en `ı` (i sin punto), no en `i`.",
        code: `console.log("I".toLowerCase());                // "i"  (regla general)
console.log("I".toLocaleLowerCase("tr"));     // "ı"  (regla turca, sin punto)

console.log("ISTANBUL".toLowerCase());             // "istanbul"
console.log("ISTANBUL".toLocaleLowerCase("tr"));   // "ıstanbul"`,
      },
      {
        titulo: "Ejemplo 4: No modifica el original",
        code: `const palabra = "HOLA";
const minuscula = palabra.toLocaleLowerCase();

console.log(palabra);   // "HOLA"
console.log(minuscula); // "hola"`,
      },
    ],
    errores: [
      {
        texto:
          "**Creer que traduce texto:** `toLocaleLowerCase()` solo **cambia la capitalización**; no traduce el texto al idioma del locale.",
        code: `// ❌ No traduce "HELLO" a "hola"
"HELLO".toLocaleLowerCase("es"); // "hello" (sigue siendo inglés)`,
      },
      {
        texto:
          "**Pensar que modifica el string original:** las cadenas son inmutables.",
        code: `// ❌ El original no cambia
let texto = "HOLA";
texto.toLocaleLowerCase();
console.log(texto); // "HOLA"

// ✅ Hay que reasignar
texto = texto.toLocaleLowerCase();
console.log(texto); // "hola"`,
      },
      {
        texto: "**Usar un locale inválido:** lanza `RangeError`.",
        code: `// ❌ RangeError: Incorrect locale information
"HOLA".toLocaleLowerCase("esto-no-es-un-locale");`,
      },
      "**Confundirlo con `toLowerCase()`:** en la mayoría de casos producen lo mismo; la diferencia aparece con idiomas que tienen reglas especiales (turco, azerí...).",
    ],
    casos: [
      "**Aplicaciones multilingües:** mostrar nombres o etiquetas correctamente en cada idioma.",
      "**Normalización de emails o usernames en entornos locales:** respetar la conversión de la `I` en turco para evitar confusiones.",
      "**Búsquedas insensibles a mayúsculas** que respeten reglas del idioma del usuario.",
    ],
    relacion: [
      "**`String.prototype.toLowerCase()`:** versión general (sin locale). Suele coincidir, pero no siempre.",
      "**`String.prototype.toLocaleUpperCase()`:** contraparte a mayúsculas respetando locale.",
      "**`String.prototype.localeCompare()`:** también usa reglas de locale, pero para **comparar** en lugar de transformar.",
      "**`Intl` API:** familia de objetos de internacionalización de JS.",
      "**BCP 47:** estándar para etiquetas de idioma (`'es-MX'`, `'tr'`, `'en-US'`).",
    ],
    analogia:
      "Imagina que tienes un **corrector** que conoce las reglas generales de un idioma. `toLowerCase()` dice: *«pon todo en minúsculas con la regla general»*. `toLocaleLowerCase('tr')` dice: *«pon todo en minúsculas **siguiendo específicamente las reglas del turco**»*. No traduce el texto, solo adapta la capitalización.",
    fuente:
      "MDN Web Docs - String.prototype.toLocaleLowerCase() | Especificación ECMA-402 (Intl)",
    notasPersonales: [
      "**Palabras clave:** `String` · `minúsculas` · `locale` · `Unicode` · `internacionalización` · `i18n`.",
      "**Recordar:** `toLocaleLowerCase()` = convertir a minúsculas respetando las reglas del locale.",
      "**Diferencia fundamental:** `toLowerCase()` → minúsculas (regla general). `toLocaleLowerCase()` → minúsculas + reglas del locale.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'HOLA'.toLocaleLowerCase()?",
        ["'HOLA'", "'hola'", "'Hola'", "undefined"],
        1,
      ],
      [
        "¿Para qué sirve el parámetro 'locales'?",
        [
          "Para traducir el texto",
          "Para elegir reglas de conversión según idioma/región",
          "Para cambiar el color",
          "Para ordenar el array",
        ],
        1,
      ],
      [
        "¿Qué devuelve 'I'.toLocaleLowerCase('tr')?",
        ["'i'", "'ı'", "'I'", "Un error"],
        1,
      ],
      [
        "¿Qué devuelve 'I'.toLowerCase()?",
        ["'i'", "'ı'", "'I'", "Un error"],
        0,
      ],
      [
        "¿toLocaleLowerCase() modifica el string original?",
        [
          "Sí, siempre",
          "No, devuelve una nueva",
          "Solo con let",
          "Depende del locale",
        ],
        1,
      ],
      [
        "¿toLocaleLowerCase() traduce el texto al idioma del locale?",
        [
          "Sí",
          "No, solo cambia la capitalización",
          "Solo en turco",
          "Solo si se pasan dos locales",
        ],
        1,
      ],
      [
        "¿Qué pasa si se pasa un locale inválido?",
        [
          "Devuelve el original",
          "Lanza RangeError",
          "Lanza TypeError",
          "Devuelve undefined",
        ],
        1,
      ],
      [
        "¿Cuál es la contraparte de toLocaleLowerCase() para mayúsculas?",
        [
          "toUpperCase()",
          "toLocaleUpperCase()",
          "toLowerCase()",
          "localeCompare()",
        ],
        1,
      ],
    ]),
  },
  /* ============================ toLocaleLowerCase() ============================ */
  tolocalelowercase: {
    id: "tolocalelowercase",
    titulo: "String.prototype.toLocaleLowerCase()",
    simulador: "string",
    definicion: [
      "Es un método built-in de los objetos `String` que devuelve la cadena de texto con **todos sus caracteres alfabéticos convertidos a minúsculas**, teniendo en cuenta las **reglas de conversión específicas de un `locale`** (idioma/región).",
    ],
    queEs: [
      "Es un método de **transformación e internacionalización (i18n)** de cadenas de texto.",
      "Funciona igual que `toLowerCase()` en la mayoría de idiomas, pero puede producir **resultados distintos** cuando el idioma tiene reglas especiales de minúsculas.",
      "**No modifica la cadena original**, sino que retorna un **nuevo texto** con la conversión aplicada.",
    ],
    paraQueSirve: [
      "**Internacionalización (i18n):** mostrar texto correctamente en minúsculas en idiomas con reglas especiales (ej. turco, azerí).",
      "**Formularios multilingües:** normalizar campos de texto respetando el idioma del usuario.",
      "**Búsquedas locales:** comparar textos en minúsculas respetando las reglas del idioma para evitar falsos negativos.",
    ],
    comoFunciona: [
      "Recibe **opcionalmente** uno o varios `locales` como etiquetas BCP 47 (`'tr'`, `'en'`, `['tr','en']`).",
      "Si no se pasa ningún locale, usa el **locale predeterminado del entorno**.",
      "Recorre cada carácter y aplica el mapeo de minúsculas **según las reglas Unicode del locale indicado**.",
      "Los caracteres que no son letras (números, símbolos, espacios, emojis) se mantienen **igual**.",
      "Devuelve una nueva cadena; la original permanece intacta.",
    ],
    sintaxis: [
      {
        code: `str.toLocaleLowerCase();
str.toLocaleLowerCase(locales);`,
      },
    ],
    nota: "**`locales` (opcional):** string o array de etiquetas BCP 47. **Retorno:** una nueva cadena con todas las letras en minúsculas según el locale.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico sin locale",
        code: `const texto = "HOLA MUNDO";
console.log(texto.toLocaleLowerCase()); // "hola mundo"`,
      },
      {
        titulo: "Ejemplo 2: Especificando español",
        code: `const texto = "HOLA MUNDO";
console.log(texto.toLocaleLowerCase("es")); // "hola mundo"`,
      },
      {
        titulo: "Ejemplo 3: El caso especial del turco 🇹🇷",
        descripcion:
          "En turco, la `I` mayúscula se convierte en `ı` (i sin punto), no en `i`.",
        code: `console.log("I".toLowerCase());                // "i"  (regla general)
console.log("I".toLocaleLowerCase("tr"));     // "ı"  (regla turca, sin punto)

console.log("ISTANBUL".toLowerCase());             // "istanbul"
console.log("ISTANBUL".toLocaleLowerCase("tr"));   // "ıstanbul"`,
      },
      {
        titulo: "Ejemplo 4: No modifica el original",
        code: `const palabra = "HOLA";
const minuscula = palabra.toLocaleLowerCase();

console.log(palabra);   // "HOLA"
console.log(minuscula); // "hola"`,
      },
    ],
    errores: [
      {
        texto:
          "**Creer que traduce texto:** `toLocaleLowerCase()` solo **cambia la capitalización**; no traduce el texto al idioma del locale.",
        code: `// ❌ No traduce "HELLO" a "hola"
"HELLO".toLocaleLowerCase("es"); // "hello" (sigue siendo inglés)`,
      },
      {
        texto:
          "**Pensar que modifica el string original:** las cadenas son inmutables.",
        code: `// ❌ El original no cambia
let texto = "HOLA";
texto.toLocaleLowerCase();
console.log(texto); // "HOLA"

// ✅ Hay que reasignar
texto = texto.toLocaleLowerCase();
console.log(texto); // "hola"`,
      },
      {
        texto: "**Usar un locale inválido:** lanza `RangeError`.",
        code: `// ❌ RangeError: Incorrect locale information
"HOLA".toLocaleLowerCase("esto-no-es-un-locale");`,
      },
      "**Confundirlo con `toLowerCase()`:** en la mayoría de casos producen lo mismo; la diferencia aparece con idiomas que tienen reglas especiales (turco, azerí...).",
    ],
    casos: [
      "**Aplicaciones multilingües:** mostrar nombres o etiquetas correctamente en cada idioma.",
      "**Normalización de emails o usernames en entornos locales:** respetar la conversión de la `I` en turco para evitar confusiones.",
      "**Búsquedas insensibles a mayúsculas** que respeten reglas del idioma del usuario.",
    ],
    relacion: [
      "**`String.prototype.toLowerCase()`:** versión general (sin locale). Suele coincidir, pero no siempre.",
      "**`String.prototype.toLocaleUpperCase()`:** contraparte a mayúsculas respetando locale.",
      "**`String.prototype.localeCompare()`:** también usa reglas de locale, pero para **comparar** en lugar de transformar.",
      "**`Intl` API:** familia de objetos de internacionalización de JS.",
      "**BCP 47:** estándar para etiquetas de idioma (`'es-MX'`, `'tr'`, `'en-US'`).",
    ],
    analogia:
      "Imagina que tienes un **corrector** que conoce las reglas generales de un idioma. `toLowerCase()` dice: *«pon todo en minúsculas con la regla general»*. `toLocaleLowerCase('tr')` dice: *«pon todo en minúsculas **siguiendo específicamente las reglas del turco**»*. No traduce el texto, solo adapta la capitalización.",
    fuente:
      "MDN Web Docs - String.prototype.toLocaleLowerCase() | Especificación ECMA-402 (Intl)",
    notasPersonales: [
      "**Palabras clave:** `String` · `minúsculas` · `locale` · `Unicode` · `internacionalización` · `i18n`.",
      "**Recordar:** `toLocaleLowerCase()` = convertir a minúsculas respetando las reglas del locale.",
      "**Diferencia fundamental:** `toLowerCase()` → minúsculas (regla general). `toLocaleLowerCase()` → minúsculas + reglas del locale.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'HOLA'.toLocaleLowerCase()?",
        ["'HOLA'", "'hola'", "'Hola'", "undefined"],
        1,
      ],
      [
        "¿Para qué sirve el parámetro 'locales'?",
        [
          "Para traducir el texto",
          "Para elegir reglas de conversión según idioma/región",
          "Para cambiar el color",
          "Para ordenar el array",
        ],
        1,
      ],
      [
        "¿Qué devuelve 'I'.toLocaleLowerCase('tr')?",
        ["'i'", "'ı'", "'I'", "Un error"],
        1,
      ],
      [
        "¿Qué devuelve 'I'.toLowerCase()?",
        ["'i'", "'ı'", "'I'", "Un error"],
        0,
      ],
      [
        "¿toLocaleLowerCase() modifica el string original?",
        [
          "Sí, siempre",
          "No, devuelve una nueva",
          "Solo con let",
          "Depende del locale",
        ],
        1,
      ],
      [
        "¿toLocaleLowerCase() traduce el texto al idioma del locale?",
        [
          "Sí",
          "No, solo cambia la capitalización",
          "Solo en turco",
          "Solo si se pasan dos locales",
        ],
        1,
      ],
      [
        "¿Qué pasa si se pasa un locale inválido?",
        [
          "Devuelve el original",
          "Lanza RangeError",
          "Lanza TypeError",
          "Devuelve undefined",
        ],
        1,
      ],
      [
        "¿Cuál es la contraparte de toLocaleLowerCase() para mayúsculas?",
        [
          "toUpperCase()",
          "toLocaleUpperCase()",
          "toLowerCase()",
          "localeCompare()",
        ],
        1,
      ],
    ]),
  },

  /* ============================ trim() ============================ */
  trim: {
    id: "trim",
    titulo: "String.prototype.trim()",
    simulador: "string",
    definicion: [
      "Es un método built-in de JavaScript que **elimina los espacios en blanco en ambos extremos** (inicio y final) de una cadena de texto.",
    ],
    queEs: [
      "Es uno de los métodos de **saneamiento y limpieza de datos** más utilizados en JavaScript, estandarizado en **ECMAScript 5 (ES5)**.",
      "Retorna una **nueva cadena** sin modificar el string original, quitando espacios, tabulaciones y saltos de línea iniciales o finales.",
      "Los espacios **internos** entre palabras se conservan intactos.",
    ],
    paraQueSirve: [
      "**Limpiar entradas de usuario:** eliminar los espacios accidentales que los usuarios suelen dejar al inicio o final de un campo de texto.",
      '**Validar campos vacíos:** evitar que un usuario envíe únicamente espacios (`"   "`) para pasar una validación de campo requerido.',
      "**Normalizar datos:** asegurar la consistencia de textos antes de guardarlos en bases de datos o compararlos.",
    ],
    comoFunciona: [
      "Escanea la cadena desde ambos extremos hacia el centro.",
      'Detecta todos los caracteres considerados **whitespace**: espacios (`" "`), tabulaciones (`\\t`), saltos de línea (`\\n`, `\\r`) y espacios de no separación (`\\u00A0`).',
      "Recorta esos caracteres de los bordes externos.",
      "Conserva intactos los espacios que estén **dentro** del texto (entre palabras).",
      "Devuelve una nueva cadena; la original permanece sin cambios.",
    ],
    sintaxis: [
      {
        code: `str.trim();`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** una nueva cadena sin espacios en blanco en ninguno de sus dos extremos.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico",
        code: `const entrada = "   Hola Mundo   ";

console.log(entrada.trim()); // "Hola Mundo"
console.log(entrada);        // "   Hola Mundo   " (el original permanece intacto)`,
      },
      {
        titulo: "Ejemplo 2: Validar que un input no esté vacío",
        code: `const comentarioUsuario = "      ";

if (comentarioUsuario.trim() === "") {
  console.log("Por favor, escribe un comentario válido.");
}`,
      },
      {
        titulo: "Ejemplo 3: Limpieza de saltos de línea y tabulaciones",
        code: `const textoConFormato = "\\n\\t Mensaje con espacios y saltos \\n ";

console.log(textoConFormato.trim());
// "Mensaje con espacios y saltos"`,
      },
      {
        titulo: "Ejemplo 4: Los espacios internos se conservan",
        code: `const frase = "  Hola    Mundo  ";
console.log(frase.trim()); // "Hola    Mundo" (los espacios internos quedan)`,
      },
    ],
    errores: [
      {
        texto:
          "**Creer que elimina espacios entre palabras:** `trim()` solo elimina espacios en los **bordes**.",
        code: `"Hola Mundo".trim(); // "Hola Mundo" (no se toca el espacio interno)

// Para eliminar TODOS los espacios internos:
"Hola Mundo".replace(/\\s+/g, "");  // "HolaMundo"
// O para colapsarlos a uno solo:
"Hola   Mundo".replace(/\\s+/g, " "); // "Hola Mundo"`,
      },
      {
        texto:
          "**Intentar ejecutarlo sobre `null` o `undefined`:** lanza `TypeError`.",
        code: `// ❌ TypeError
const val = null;
val.trim();

// ✅ Seguro con optional chaining
val?.trim(); // undefined`,
      },
      "**Pensar que modifica el string original:** los strings son inmutables. Hay que guardar el resultado o reasignar.",
    ],
    casos: [
      "**Formularios de inicio de sesión / registro:** limpiar el campo de correo, ya que los teclados móviles suelen agregar un espacio al final autocompletado.",
      "**Procesamiento de archivos CSV / TXT:** limpiar espacios sobrantes al separar columnas o líneas de texto plano.",
      "**Buscadores:** limpiar el término de búsqueda antes de enviarlo al servidor.",
      {
        texto: "**Combinación típica con `toLowerCase()` en emails:**",
        code: `const email = "  Usuario@Ejemplo.COM  ";
const limpio = email.trim().toLowerCase();
// "usuario@ejemplo.com"`,
      },
    ],
    relacion: [
      "**`String.prototype.trimStart()`** (o `trimLeft`): elimina espacios únicamente al **inicio** (izquierda).",
      "**`String.prototype.trimEnd()`** (o `trimRight`): elimina espacios únicamente al **final** (derecha).",
      "**`String.prototype.replace()`:** alternativa cuando se quieren eliminar espacios internos o patrones más complejos.",
      "**Inmutabilidad:** al igual que otros métodos de `String`, no altera el valor original.",
    ],
    analogia:
      "Es como **recortar los bordes sobrantes** de una hoja de papel tras imprimir un documento. No cambias ni tocas el texto o las imágenes del centro: solo eliminas los márgenes vacíos e innecesarios de las orillas.",
    fuente:
      "MDN Web Docs - String.prototype.trim() | Especificación ECMAScript (ECMA-262)",
    notasPersonales: [
      "**Buenas prácticas:** aplicar siempre `.trim()` a todos los campos de texto recibidos de un formulario antes de validar su longitud o enviarlos a la base de datos.",
      "**Para limpiar emails:** `email.toLowerCase().trim()` combina dos de las mejores prácticas de sanitización.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve '   Hola   '.trim()?",
        ["'   Hola   '", "'Hola'", "' Hola '", "'Hola   '"],
        1,
      ],
      [
        "¿trim() modifica la cadena original?",
        [
          "Sí, siempre",
          "No, devuelve una nueva",
          "Solo si es let",
          "Depende del navegador",
        ],
        1,
      ],
      [
        "¿Qué espacios elimina trim()?",
        [
          "Solo los del inicio",
          "Solo los del final",
          "Los del inicio y el final",
          "Todos los espacios",
        ],
        2,
      ],
      [
        "¿Qué devuelve 'Hola Mundo'.trim()?",
        ["'Hola Mundo'", "'HolaMundo'", "'Hola'", "'Mundo'"],
        0,
      ],
      [
        "¿Qué pasa si llamas trim() sobre null?",
        [
          "Devuelve ''",
          "Lanza TypeError",
          "Devuelve null",
          "Devuelve undefined",
        ],
        1,
      ],
      [
        "¿Qué método elimina solo los espacios al inicio?",
        ["trimEnd()", "trimStart()", "replaceAll()", "slice()"],
        1,
      ],
      [
        "¿Cómo limpias todos los espacios internos de 'Hola Mundo'?",
        ["trim()", "slice()", "replace(/\\s+/g, '')", "toUpperCase()"],
        2,
      ],
      [
        "¿Qué suele devolver '   '.trim() === ''?",
        ["true", "false", "undefined", "Lanza error"],
        0,
      ],
    ]),
  },
  /* ============================ trimStart() ============================ */
  trimstart: {
    id: "trimstart",
    titulo: "String.prototype.trimStart()",
    simulador: "string",
    definicion: [
      "Es un método built-in de JavaScript que **elimina los espacios en blanco del inicio** de una cadena de texto, sin tocar los del final.",
    ],
    queEs: [
      "Es un método de **saneamiento y limpieza de datos** estandarizado en **ECMAScript 2019 (ES10)**.",
      "Retorna una **nueva cadena** sin modificar el string original, quitando espacios, tabulaciones y saltos de línea **solo al inicio**.",
      "También es conocido por su nombre histórico **`trimLeft()`**, aunque **`trimStart()` es el nombre recomendado** por el estándar.",
    ],
    paraQueSirve: [
      "**Eliminar espacios al inicio de un texto:** limpiar entradas de usuario que suelen empezar con espacios.",
      "**Normalizar cadenas:** preparar textos antes de compararlos o almacenarlos.",
      '**Evitar errores:** eliminar espacios que rompen comparaciones o búsquedas (`" Hola"` ≠ `"Hola"`).',
      "**Preservar el final:** cuando necesitas conservar espacios del final (poco común, pero posible).",
    ],
    comoFunciona: [
      "Escanea la cadena desde el **inicio** hacia el final.",
      'Detecta todos los caracteres considerados **whitespace**: espacios (`" "`), tabulaciones (`\\t`), saltos de línea (`\\n`, `\\r`) y espacios de no separación (`\\u00A0`).',
      "Recorta esos caracteres **solo del extremo izquierdo**.",
      "Conserva intactos los espacios del final y los internos.",
      "Devuelve una nueva cadena; la original permanece sin cambios.",
    ],
    sintaxis: [
      {
        code: `str.trimStart();`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** una nueva cadena sin espacios en blanco al inicio.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico",
        code: `const texto = "    Hola Mundo";
console.log(texto.trimStart()); // "Hola Mundo"`,
      },
      {
        titulo: "Ejemplo 2: Los espacios del final permanecen",
        code: `const texto = "    Hola Mundo    ";
console.log(texto.trimStart()); // "Hola Mundo    "  (los del final quedan)`,
      },
      {
        titulo: "Ejemplo 3: Con tabulaciones y saltos de línea",
        code: `const texto = "\\n\\tHola";
console.log(texto.trimStart()); // "Hola"`,
      },
      {
        titulo: "Ejemplo 4: La cadena original no cambia",
        code: `const texto = "   JavaScript";
const nuevoTexto = texto.trimStart();

console.log(texto);      // "   JavaScript"
console.log(nuevoTexto); // "JavaScript"`,
      },
    ],
    errores: [
      {
        texto:
          "**Pensar que modifica la cadena original:** los strings son inmutables. Hay que guardar el resultado o reasignar.",
        code: `// ❌ El original no cambia
let texto = "   Hola";
texto.trimStart();
console.log(texto); // "   Hola"

// ✅ Hay que reasignar
texto = texto.trimStart();
console.log(texto); // "Hola"`,
      },
      {
        texto:
          "**Confundirlo con `trim()`:** `trimStart()` solo elimina los espacios del **inicio**.",
        code: `const texto = "   Hola   ";
texto.trimStart(); // "Hola   "  (los del final quedan)
texto.trim();      // "Hola"    (ambos lados)`,
      },
      {
        texto:
          "**Pensar que elimina espacios internos:** los espacios entre palabras permanecen.",
        code: `"Hola     Mundo".trimStart(); // "Hola     Mundo" (no cambia nada)`,
      },
      {
        texto:
          "**Olvidar los paréntesis:** `texto.trimStart` (sin paréntesis) devuelve la referencia al método, no lo ejecuta.",
        code: `texto.trimStart;  // [Function: trimStart]
texto.trimStart(); // ejecuta`,
      },
    ],
    casos: [
      "**Limpiar datos de formularios:** eliminar espacios iniciales que el usuario pudo dejar sin darse cuenta.",
      "**Procesar archivos de texto:** quitar indentación inicial de líneas.",
      '**Comparar cadenas correctamente:** `"  Hola".trimStart() === "Hola"`.',
      "**Preparar datos antes de almacenarlos:** normalizar antes de guardar en BD.",
    ],
    relacion: [
      "**`String.prototype.trim()`:** elimina espacios al **inicio y al final**.",
      "**`String.prototype.trimEnd()`:** elimina espacios **solo al final**.",
      "**`String.prototype.trimLeft()`:** alias histórico de `trimStart()`.",
      "**Inmutabilidad:** devuelve una nueva cadena, no modifica la original.",
    ],
    analogia:
      "Imagina que escribes un documento y dejas varias hojas en blanco **antes** de la primera página. `trimStart()` es como retirar únicamente esas hojas del principio, dejando el resto del documento intacto.",
    fuente:
      "MDN Web Docs - String.prototype.trimStart() | Especificación ECMAScript (ES10)",
    notasPersonales: [
      "**Regla:** si solo tienes que limpiar un lado, `trimStart()` / `trimEnd()` son más expresivos que `trim()`.",
      "**`trimStart()` es el nombre recomendado** por el estándar; `trimLeft()` existe solo por compatibilidad.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve '   Hola'.trimStart()?",
        ["'   Hola'", "'Hola'", "'Hola   '", "undefined"],
        1,
      ],
      [
        "¿trimStart() modifica la cadena original?",
        [
          "Sí, siempre",
          "No, devuelve una nueva",
          "Solo si es let",
          "Depende del navegador",
        ],
        1,
      ],
      [
        "¿Qué espacios elimina trimStart()?",
        [
          "Solo los del inicio",
          "Solo los del final",
          "Los del inicio y el final",
          "Todos los espacios",
        ],
        0,
      ],
      [
        "¿Qué devuelve '   Hola   '.trimStart()?",
        ["'   Hola   '", "'Hola'", "'Hola   '", "'   Hola'"],
        2,
      ],
      [
        "¿Qué pasa si llamas trimStart() sobre un string vacío ''?",
        [
          "Lanza TypeError",
          "Devuelve ''",
          "Devuelve null",
          "Devuelve undefined",
        ],
        1,
      ],
      [
        "¿Cuál es el alias histórico de trimStart()?",
        ["trimEnd()", "trimLeft()", "trimRight()", "slice()"],
        1,
      ],
      [
        "¿En qué versión de ECMAScript se estandarizó trimStart()?",
        ["ES5", "ES2015", "ES2019", "ES2023"],
        2,
      ],
      [
        "¿Qué devuelve 'Hola Mundo'.trimStart()?",
        ["'Hola Mundo'", "'HolaMundo'", "'Hola'", "'Mundo'"],
        0,
      ],
    ]),
  },

  /* ============================ trimEnd() ============================ */
  trimend: {
    id: "trimend",
    titulo: "String.prototype.trimEnd()",
    simulador: "string",
    definicion: [
      "Es un método built-in de JavaScript que **elimina los espacios en blanco del final** de una cadena de texto, sin tocar los del inicio.",
    ],
    queEs: [
      "Es un método de **saneamiento y limpieza de datos** estandarizado en **ECMAScript 2019 (ES10)**.",
      "Retorna una **nueva cadena** sin modificar el string original, quitando espacios, tabulaciones y saltos de línea **solo al final**.",
      "También es conocido por su nombre histórico **`trimRight()`**, aunque **`trimEnd()` es el nombre recomendado** por el estándar.",
    ],
    paraQueSirve: [
      "**Eliminar espacios al final de un texto:** limpiar entradas de usuario que suelen terminar con espacios.",
      "**Normalizar cadenas:** preparar textos antes de compararlos o almacenarlos.",
      '**Evitar errores:** eliminar espacios que rompen comparaciones o búsquedas (`"Hola "` ≠ `"Hola"`).',
      "**Preservar el inicio:** cuando necesitas conservar espacios del inicio (raro, pero posible).",
    ],
    comoFunciona: [
      "Escanea la cadena desde el **final** hacia el inicio.",
      'Detecta todos los caracteres considerados **whitespace**: espacios (`" "`), tabulaciones (`\\t`), saltos de línea (`\\n`, `\\r`) y espacios de no separación (`\\u00A0`).',
      "Recorta esos caracteres **solo del extremo derecho**.",
      "Conserva intactos los espacios del inicio y los internos.",
      "Devuelve una nueva cadena; la original permanece sin cambios.",
    ],
    sintaxis: [
      {
        code: `str.trimEnd();`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** una nueva cadena sin espacios en blanco al final.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico",
        code: `const texto = "Hola Mundo    ";
console.log(texto.trimEnd()); // "Hola Mundo"`,
      },
      {
        titulo: "Ejemplo 2: Los espacios del inicio permanecen",
        code: `const texto = "    Hola Mundo    ";
console.log(texto.trimEnd()); // "    Hola Mundo"  (los del inicio quedan)`,
      },
      {
        titulo: "Ejemplo 3: Con tabulaciones y saltos de línea",
        code: `const texto = "Hola\\t\\n";
console.log(texto.trimEnd()); // "Hola"`,
      },
      {
        titulo: "Ejemplo 4: La cadena original no cambia",
        code: `const texto = "JavaScript   ";
const nuevoTexto = texto.trimEnd();

console.log(texto);      // "JavaScript   "
console.log(nuevoTexto); // "JavaScript"`,
      },
    ],
    errores: [
      {
        texto:
          "**Pensar que modifica la cadena original:** los strings son inmutables. Hay que guardar el resultado o reasignar.",
        code: `// ❌ El original no cambia
let texto = "Hola   ";
texto.trimEnd();
console.log(texto); // "Hola   "

// ✅ Hay que reasignar
texto = texto.trimEnd();
console.log(texto); // "Hola"`,
      },
      {
        texto:
          "**Confundirlo con `trim()`:** `trimEnd()` solo elimina los espacios del **final**.",
        code: `const texto = "   Hola   ";
texto.trimEnd(); // "   Hola"  (los del inicio quedan)
texto.trim();    // "Hola"    (ambos lados)`,
      },
      {
        texto:
          "**Pensar que elimina espacios internos:** los espacios entre palabras permanecen.",
        code: `"Hola     Mundo".trimEnd(); // "Hola     Mundo" (no cambia nada)`,
      },
      {
        texto:
          "**Olvidar los paréntesis:** `texto.trimEnd` (sin paréntesis) devuelve la referencia al método, no lo ejecuta.",
        code: `texto.trimEnd;  // [Function: trimEnd]
texto.trimEnd(); // ejecuta`,
      },
    ],
    casos: [
      "**Limpiar datos de formularios:** eliminar espacios finales que el usuario pudo dejar al pulsar la barra espaciadora.",
      "**Procesar archivos de texto:** quitar espacios antes de saltos de línea.",
      '**Comparar cadenas correctamente:** `"Hola  ".trimEnd() === "Hola"`.',
      "**Preparar datos antes de almacenarlos:** normalizar antes de guardar en BD.",
    ],
    relacion: [
      "**`String.prototype.trim()`:** elimina espacios al **inicio y al final**.",
      "**`String.prototype.trimStart()`:** elimina espacios **solo al inicio**.",
      "**`String.prototype.trimRight()`:** alias histórico de `trimEnd()`.",
      "**Inmutabilidad:** devuelve una nueva cadena, no modifica la original.",
    ],
    analogia:
      "Imagina que escribes una carta y, al terminar, dejas varias hojas en blanco **al final**. `trimEnd()` es como retirar únicamente esas hojas en blanco del final, dejando el contenido y el inicio de la carta exactamente igual.",
    fuente:
      "MDN Web Docs - String.prototype.trimEnd() | Especificación ECMAScript (ES10)",
    notasPersonales: [
      "**Regla:** si solo tienes que limpiar un lado, `trimStart()` / `trimEnd()` son más expresivos que `trim()`.",
      "**`trimEnd()` es el nombre recomendado** por el estándar; `trimRight()` existe solo por compatibilidad.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'Hola   '.trimEnd()?",
        ["'Hola   '", "'Hola'", "'   Hola'", "undefined"],
        1,
      ],
      [
        "¿trimEnd() modifica la cadena original?",
        [
          "Sí, siempre",
          "No, devuelve una nueva",
          "Solo si es let",
          "Depende del navegador",
        ],
        1,
      ],
      [
        "¿Qué espacios elimina trimEnd()?",
        [
          "Solo los del inicio",
          "Solo los del final",
          "Los del inicio y el final",
          "Todos los espacios",
        ],
        1,
      ],
      [
        "¿Qué devuelve '   Hola   '.trimEnd()?",
        ["'   Hola   '", "'Hola'", "'   Hola'", "'Hola   '"],
        2,
      ],
      [
        "¿Qué pasa si llamas trimEnd() sobre un string vacío ''?",
        [
          "Lanza TypeError",
          "Devuelve ''",
          "Devuelve null",
          "Devuelve undefined",
        ],
        1,
      ],
      [
        "¿Cuál es el alias histórico de trimEnd()?",
        ["trimLeft()", "trimStart()", "trimRight()", "slice()"],
        2,
      ],
      [
        "¿En qué versión de ECMAScript se estandarizó trimEnd()?",
        ["ES5", "ES2015", "ES2019", "ES2023"],
        2,
      ],
      [
        "¿Qué devuelve 'Hola Mundo'.trimEnd()?",
        ["'Hola Mundo'", "'HolaMundo'", "'Hola'", "'Mundo'"],
        0,
      ],
    ]),
  },

  /* ============================ trimLeft() ============================ */
  trimleft: {
    id: "trimleft",
    titulo: "String.prototype.trimLeft()",
    simulador: "string",
    esAlias: "trimstart",
    definicion: [
      "Es un método built-in de JavaScript que **elimina los espacios en blanco del inicio** de una cadena de texto, sin tocar los del final.",
      "**`trimLeft()` es un alias de `trimStart()`**: se comportan exactamente igual.",
    ],
    queEs: [
      "Es un **método heredado** de `String.prototype` que existe únicamente por **compatibilidad histórica** con navegadores antiguos.",
      "Su nombre recomendado por el estándar es **`trimStart()`**, así que en código moderno usa siempre ese.",
      "No modifica la cadena original: devuelve una nueva.",
    ],
    paraQueSirve: [
      "**Compatibilidad con código legacy:** si encuentras `trimLeft()` en código viejo, ahora ya sabes qué hace.",
      "**Migración a código moderno:** el objetivo es reemplazar `trimLeft()` por `trimStart()`.",
    ],
    comoFunciona: [
      "Escanea la cadena desde el **inicio** hacia el final.",
      "Detecta todos los caracteres considerados **whitespace** (espacios, `\\t`, `\\n`, `\\r`, `\\u00A0`).",
      "Recorta esos caracteres **solo del extremo izquierdo**.",
      "Conserva intactos los espacios del final y los internos.",
      "Devuelve una nueva cadena; la original permanece sin cambios.",
      "Se comporta **exactamente igual** que `trimStart()`.",
    ],
    sintaxis: [
      {
        code: `str.trimLeft(); // ⚠️ alias de trimStart()`,
      },
      {
        caption: "Forma recomendada en código moderno:",
        code: `str.trimStart();`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** una nueva cadena sin espacios en blanco al inicio. **Recomendación:** usa `trimStart()`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico (idéntico a trimStart)",
        code: `const texto = "    Hola Mundo";
console.log(texto.trimLeft());  // "Hola Mundo"
console.log(texto.trimStart()); // "Hola Mundo"  (mismo resultado)`,
      },
      {
        titulo: "Ejemplo 2: Los espacios del final permanecen",
        code: `const texto = "    Hola Mundo    ";
console.log(texto.trimLeft()); // "Hola Mundo    "`,
      },
      {
        titulo: "Ejemplo 3: Migración recomendada",
        code: `// ❌ Código legacy
const limpio = texto.trimLeft();

// ✅ Código moderno
const limpioModerno = texto.trimStart();`,
      },
    ],
    errores: [
      {
        texto:
          "**Usar `trimLeft()` en código nuevo:** aunque funcione, se considera legado. Usa `trimStart()`.",
        code: `// ❌ En código nuevo
texto.trimLeft();

// ✅ Recomendado
texto.trimStart();`,
      },
      {
        texto:
          "**Pensar que recorta ambos lados:** solo recorta al **inicio**.",
        code: `"   Hola   ".trimLeft(); // "Hola   "  (los del final quedan)
"   Hola   ".trim();     // "Hola"     (ambos lados)`,
      },
      {
        texto:
          "**Pensar que modifica el string original:** los strings son inmutables.",
        code: `let texto = "   Hola";
texto.trimLeft();
console.log(texto); // "   Hola"`,
      },
    ],
    casos: [
      "**Compatibilidad con código antiguo:** mantener aplicaciones legacy.",
      "**Migración a código moderno:** reemplazar todas las apariciones por `trimStart()`.",
    ],
    relacion: [
      "**`String.prototype.trimStart()`:** el método canónico (recomendado). **Hace lo mismo.**",
      "**`String.prototype.trim()`:** elimina espacios al inicio y al final.",
      "**`String.prototype.trimEnd()` / `trimRight()`:** solo al final.",
      "**`String.prototype.trimLeft()`** es equivalente a **`trimStart()`**.",
    ],
    analogia:
      "Es como tener **dos nombres para la misma persona**: `trimLeft` y `trimStart` son la misma función. La diferencia es que `trimStart` es el nombre actual y oficial, mientras que `trimLeft` es el apodo antiguo que aún se conserva por compatibilidad.",
    fuente: "MDN Web Docs - String.prototype.trimStart() (alias trimLeft)",
    notasPersonales: [
      "**Equivalencia literal:** `texto.trimLeft()` ⟺ `texto.trimStart()`.",
      "**Recordar:** `trimLeft` = elimina del **inicio**.",
      "**Regla del proyecto:** en código nuevo, siempre `trimStart()`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve '   Hola'.trimLeft()?",
        ["'   Hola'", "'Hola'", "'Hola   '", "undefined"],
        1,
      ],
      [
        "¿trimLeft() es alias de qué método?",
        ["trimEnd()", "trimStart()", "trimRight()", "trim()"],
        1,
      ],
      [
        "¿Qué espacios elimina trimLeft()?",
        [
          "Solo los del inicio",
          "Solo los del final",
          "Los del inicio y el final",
          "Todos los espacios",
        ],
        0,
      ],
      [
        "¿Qué devuelve '   Hola   '.trimLeft()?",
        ["'   Hola   '", "'Hola'", "'Hola   '", "'   Hola'"],
        2,
      ],
      [
        "¿Cuál es el nombre recomendado por el estándar?",
        ["trimLeft()", "trimStart()", "trimBoth()", "trim()"],
        1,
      ],
      [
        "¿trimLeft() modifica la cadena original?",
        [
          "Sí",
          "No, devuelve una nueva",
          "Solo con let",
          "Depende del navegador",
        ],
        1,
      ],
      [
        "¿Qué método limpia solo el final?",
        ["trimLeft()", "trimStart()", "trimEnd()", "trim()"],
        2,
      ],
      [
        "¿Qué devuelve 'Hola Mundo'.trimLeft()?",
        ["'Hola Mundo'", "'HolaMundo'", "'Hola'", "'Mundo'"],
        0,
      ],
    ]),
  },

  /* ============================ trimRight() ============================ */
  trimright: {
    id: "trimright",
    titulo: "String.prototype.trimRight()",
    simulador: "string",
    esAlias: "trimend",
    definicion: [
      "Es un método built-in de JavaScript que **elimina los espacios en blanco del final** de una cadena de texto, sin tocar los del inicio.",
      "**`trimRight()` es un alias de `trimEnd()`**: se comportan exactamente igual.",
    ],
    queEs: [
      "Es un **método heredado** de `String.prototype` que existe únicamente por **compatibilidad histórica** con navegadores antiguos.",
      "Su nombre recomendado por el estándar es **`trimEnd()`**, así que en código moderno usa siempre ese.",
      "No modifica la cadena original: devuelve una nueva.",
    ],
    paraQueSirve: [
      "**Compatibilidad con código legacy:** si encuentras `trimRight()` en código viejo, ahora ya sabes qué hace.",
      "**Migración a código moderno:** el objetivo es reemplazar `trimRight()` por `trimEnd()`.",
    ],
    comoFunciona: [
      "Escanea la cadena desde el **final** hacia el inicio.",
      "Detecta todos los caracteres considerados **whitespace** (espacios, `\\t`, `\\n`, `\\r`, `\\u00A0`).",
      "Recorta esos caracteres **solo del extremo derecho**.",
      "Conserva intactos los espacios del inicio y los internos.",
      "Devuelve una nueva cadena; la original permanece sin cambios.",
      "Se comporta **exactamente igual** que `trimEnd()`.",
    ],
    sintaxis: [
      {
        code: `str.trimRight(); // ⚠️ alias de trimEnd()`,
      },
      {
        caption: "Forma recomendada en código moderno:",
        code: `str.trimEnd();`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** una nueva cadena sin espacios en blanco al final. **Recomendación:** usa `trimEnd()`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico (idéntico a trimEnd)",
        code: `const texto = "Hola Mundo    ";
console.log(texto.trimRight()); // "Hola Mundo"
console.log(texto.trimEnd());   // "Hola Mundo"  (mismo resultado)`,
      },
      {
        titulo: "Ejemplo 2: Los espacios del inicio permanecen",
        code: `const texto = "    Hola Mundo    ";
console.log(texto.trimRight()); // "    Hola Mundo"`,
      },
      {
        titulo: "Ejemplo 3: Migración recomendada",
        code: `// ❌ Código legacy
const limpio = texto.trimRight();

// ✅ Código moderno
const limpioModerno = texto.trimEnd();`,
      },
    ],
    errores: [
      {
        texto:
          "**Usar `trimRight()` en código nuevo:** aunque funcione, se considera legado. Usa `trimEnd()`.",
        code: `// ❌ En código nuevo
texto.trimRight();

// ✅ Recomendado
texto.trimEnd();`,
      },
      {
        texto: "**Pensar que recorta ambos lados:** solo recorta al **final**.",
        code: `"   Hola   ".trimRight(); // "   Hola"  (los del inicio quedan)
"   Hola   ".trim();      // "Hola"     (ambos lados)`,
      },
      {
        texto:
          "**Pensar que modifica el string original:** los strings son inmutables.",
        code: `let texto = "Hola   ";
texto.trimRight();
console.log(texto); // "Hola   "`,
      },
    ],
    casos: [
      "**Compatibilidad con código antiguo:** mantener aplicaciones legacy.",
      "**Migración a código moderno:** reemplazar todas las apariciones por `trimEnd()`.",
    ],
    relacion: [
      "**`String.prototype.trimEnd()`:** el método canónico (recomendado). **Hace lo mismo.**",
      "**`String.prototype.trim()`:** elimina espacios al inicio y al final.",
      "**`String.prototype.trimStart()` / `trimLeft()`:** solo al inicio.",
      "**`String.prototype.trimRight()`** es equivalente a **`trimEnd()`**.",
    ],
    analogia:
      "Es como tener **dos nombres para la misma persona**: `trimRight` y `trimEnd` son la misma función. La diferencia es que `trimEnd` es el nombre actual y oficial, mientras que `trimRight` es el apodo antiguo que aún se conserva por compatibilidad.",
    fuente: "MDN Web Docs - String.prototype.trimEnd() (alias trimRight)",
    notasPersonales: [
      "**Equivalencia literal:** `texto.trimRight()` ⟺ `texto.trimEnd()`.",
      "**Recordar:** `trimRight` = elimina del **final**.",
      "**Regla del proyecto:** en código nuevo, siempre `trimEnd()`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'Hola   '.trimRight()?",
        ["'Hola   '", "'Hola'", "'   Hola'", "undefined"],
        1,
      ],
      [
        "¿trimRight() es alias de qué método?",
        ["trimStart()", "trimEnd()", "trimLeft()", "trim()"],
        1,
      ],
      [
        "¿Qué espacios elimina trimRight()?",
        [
          "Solo los del inicio",
          "Solo los del final",
          "Los del inicio y el final",
          "Todos los espacios",
        ],
        1,
      ],
      [
        "¿Qué devuelve '   Hola   '.trimRight()?",
        ["'   Hola   '", "'Hola'", "'   Hola'", "'Hola   '"],
        2,
      ],
      [
        "¿Cuál es el nombre recomendado por el estándar?",
        ["trimRight()", "trimEnd()", "trimBoth()", "trim()"],
        1,
      ],
      [
        "¿trimRight() modifica la cadena original?",
        [
          "Sí",
          "No, devuelve una nueva",
          "Solo con let",
          "Depende del navegador",
        ],
        1,
      ],
      [
        "¿Qué método limpia solo el inicio?",
        ["trimRight()", "trimEnd()", "trimStart()", "trim()"],
        2,
      ],
      [
        "¿Qué devuelve 'Hola Mundo'.trimRight()?",
        ["'Hola Mundo'", "'HolaMundo'", "'Hola'", "'Mundo'"],
        0,
      ],
    ]),
  },

  /* ============================ padStart() ============================ */
  padstart: {
    id: "padstart",
    titulo: "String.prototype.padStart()",
    simulador: "string",
    definicion: [
      "Es un método built-in de JavaScript que **rellena el inicio de una cadena de texto** con otra cadena dada (repetida si es necesario) hasta alcanzar una longitud total especificada.",
    ],
    queEs: [
      "Es un método de **formato y alineación de texto** introducido en **ECMAScript 2017 (ES8)**.",
      "Retorna una **nueva cadena** con el relleno (*padding*) aplicado al principio (a la izquierda).",
      "**No modifica la cadena original** (los *strings* son inmutables).",
    ],
    paraQueSirve: [
      '**Formatear números con ceros a la izquierda:** representar fechas, horas, minutos o códigos numéricos (`"05"` en vez de `"5"`).',
      "**Enmascarar datos sensibles:** ocultar los primeros dígitos de números de tarjetas de crédito o identificación dejando solo los últimos visibles.",
      "**Alinear texto a la derecha:** organizar columnas numéricas o montos de dinero en reportes y consolas.",
    ],
    comoFunciona: [
      "Recibe `targetLength` (longitud total final deseada) y opcionalmente `padString`.",
      "Si la longitud actual es **menor** que `targetLength`, inserta `padString` (repetido si hace falta) al inicio hasta alcanzar la longitud exacta.",
      "Si la longitud actual es **mayor o igual** que `targetLength`, retorna el string original sin cambios.",
      "Si `padString` no cabe completo en el hueco, se **trunca** para no exceder `targetLength`.",
      "Devuelve una nueva cadena; la original permanece intacta.",
    ],
    sintaxis: [
      {
        code: `str.padStart(targetLength);
str.padStart(targetLength, padString);`,
      },
    ],
    nota: '**`targetLength`:** longitud total final de la cadena. **`padString` (opcional):** con qué se rellena al inicio. Por defecto es `" "` (espacio). **Retorno:** una nueva cadena rellenada por la izquierda.',
    ejemplos: [
      {
        titulo: "Ejemplo 1: Ceros a la izquierda (formato de hora)",
        code: `const minutos = "5";
const segundos = "9";

const reloj = \`\${minutos.padStart(2, "0")}:\${segundos.padStart(2, "0")}\`;
console.log(reloj); // "05:09"`,
      },
      {
        titulo: "Ejemplo 2: Enmascarar tarjeta de crédito",
        code: `const ultimosCuatro = "4321";
const enmascarada = ultimosCuatro.padStart(16, "*");

console.log(enmascarada); // "************4321"`,
      },
      {
        titulo: "Ejemplo 3: Alinear montos de dinero a la derecha",
        code: `const precios = ["15.00", "120.50", "3.99"];

precios.forEach((precio) => {
  console.log(\`$\${precio.padStart(8, " ")}\`);
});

/* Resultado:
$   15.00
$  120.50
$    3.99
*/`,
      },
      {
        titulo: "Ejemplo 4: Si ya es más larga, no cambia",
        code: `const texto = "JavaScript";
console.log(texto.padStart(5, "0")); // "JavaScript" (sin cambios)`,
      },
    ],
    errores: [
      {
        texto:
          "**Intentar usarlo sobre un número:** es un método exclusivo de strings. Convierte antes.",
        code: `// ❌ TypeError
(5).padStart(2, "0");

// ✅ Convierte primero
String(5).padStart(2, "0"); // "05"
(5).toString().padStart(2, "0"); // "05"`,
      },
      {
        texto:
          "**Confundir `targetLength` con la cantidad de caracteres a añadir:** es la longitud **total final**, no el relleno.",
        code: `"1234".padStart(3, "0"); // "1234" (ya tiene length 4 > 3, no cambia)
"12".padStart(4, "0");   // "0012" (rellena 2 ceros)`,
      },
      {
        texto:
          "**Olvidar que `padString` puede truncarse:** si no cabe completo, solo se usa la parte necesaria.",
        code: `"A".padStart(5, "12345"); // "A1234" (solo caben 4 caracteres del padString)`,
      },
      {
        texto:
          "**Pensar que modifica el string original:** los strings son inmutables.",
        code: `let texto = "5";
texto.padStart(2, "0");
console.log(texto); // "5"

// ✅ Hay que reasignar
texto = texto.padStart(2, "0");
console.log(texto); // "05"`,
      },
    ],
    casos: [
      '**Generación de folios / correlativos:** crear identificadores estandarizados tipo `"INV-00042"`.',
      "**Relojes y cronómetros:** formatear valores numéricos de tiempo en interfaces de usuario.",
      "**Muestreo de datos financieros:** alinear cifras con decimales a la derecha en reportes de texto plano.",
      "**Enmascarado de datos sensibles:** mostrar solo los últimos dígitos de una tarjeta o cuenta.",
    ],
    relacion: [
      "**`String.prototype.padEnd()`:** su contraparte; añade el relleno al **final** (derecha).",
      "**`String.prototype.repeat()`:** repite una cadena N veces sin límite de longitud total.",
      "**`Number.prototype.toFixed()`:** ajusta la cantidad de decimales de un número antes de convertirlo a string.",
      "**Inmutabilidad:** al igual que otros métodos de `String`, no altera el valor original.",
    ],
    analogia:
      "Es como escribir en un **formulario que exige un código de 5 dígitos**. Si tu número es solo `42`, rellenas los primeros casilleros a la izquierda escribiendo ceros hasta llenar la casilla: `00042`.",
    fuente:
      "MDN Web Docs - String.prototype.padStart() | Especificación ECMAScript 2017 (ES8)",
    notasPersonales: [
      "**Truco rápido** para formatear números de un solo dígito: `String(num).padStart(2, '0')`.",
      "Soportado en todos los entornos y navegadores modernos desde 2017.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve '5'.padStart(3, '0')?",
        ["'5'", "'005'", "'500'", "undefined"],
        1,
      ],
      [
        "¿padStart() modifica la cadena original?",
        [
          "Sí, siempre",
          "No, devuelve una nueva",
          "Solo si es let",
          "Depende del navegador",
        ],
        1,
      ],
      [
        "¿En qué lado añade el relleno padStart()?",
        [
          "Al inicio (izquierda)",
          "Al final (derecha)",
          "En el medio",
          "En ambos lados",
        ],
        0,
      ],
      [
        "¿Qué devuelve 'JavaScript'.padStart(5, '0')?",
        ["'JavaScript'", "'00000JavaScript'", "'5'", "Un error"],
        0,
      ],
      [
        "¿Qué devuelve 'A'.padStart(5, '12345')?",
        ["'A1234'", "1234A", "'AAAAA'", "'A12345'"],
        0,
      ],
      [
        "¿Qué pasa si llamas padStart() sobre un número?",
        ["Funciona normal", "Lanza TypeError", "Devuelve NaN", "Devuelve null"],
        1,
      ],
      ["¿Cuál es el padString por defecto?", ["'0'", "' '", "'-'", "'*'"], 1],
      [
        "¿Qué método hace el relleno al final en lugar del inicio?",
        ["padEnd()", "padStart()", "repeat()", "fill()"],
        0,
      ],
    ]),
  },
  /* ============================ padEnd() ============================ */
  padend: {
    id: "padend",
    titulo: "String.prototype.padEnd()",
    simulador: "string",
    definicion: [
      "Es un método built-in de JavaScript que **rellena el final de una cadena de texto** con otra cadena dada (repetida si es necesario) hasta alcanzar una longitud total especificada.",
    ],
    queEs: [
      "Es un método de **formato y alineación de texto** introducido en **ECMAScript 2017 (ES8)**.",
      "Retorna una **nueva cadena** con el relleno (*padding*) aplicado al final (a la derecha).",
      "**No modifica la cadena original** (los *strings* son inmutables).",
    ],
    paraQueSirve: [
      "**Alinear texto en tablas o consola:** garantizar que múltiples líneas de texto tengan exactamente el mismo ancho visual.",
      "**Formatear datos estructurados:** rellenar campos de longitud fija (tickets, reportes de texto, códigos).",
      "**Completar cadenas con caracteres repetidos:** agregar puntos, guiones o espacios para completar un diseño o interfaz en modo texto.",
    ],
    comoFunciona: [
      "Recibe `targetLength` (longitud total final deseada) y opcionalmente `padString`.",
      "Si la longitud actual es **menor** que `targetLength`, inserta `padString` (repetido si hace falta) al final hasta alcanzar la longitud exacta.",
      "Si la longitud actual es **mayor o igual** que `targetLength`, retorna el string original sin cambios.",
      "Si `padString` no cabe completo en el hueco, se **trunca** para no exceder `targetLength`.",
      "Devuelve una nueva cadena; la original permanece intacta.",
    ],
    sintaxis: [
      {
        code: `str.padEnd(targetLength);
str.padEnd(targetLength, padString);`,
      },
    ],
    nota: '**`targetLength`:** longitud total final de la cadena. **`padString` (opcional):** con qué se rellena al final. Por defecto es `" "` (espacio). **Retorno:** una nueva cadena rellenada por la derecha.',
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico (espacios por defecto)",
        code: `const cadena = "Hola";

console.log(cadena.padEnd(10));
// "Hola      " (agrega 6 espacios al final para sumar 10)`,
      },
      {
        titulo: "Ejemplo 2: Relleno con un carácter específico",
        code: `const titulo = "Capítulo 1";

console.log(titulo.padEnd(20, "."));
// "Capítulo 1.........."`,
      },
      {
        titulo: "Ejemplo 3: Crear una tabla alineada en consola",
        code: `const items = [
  { producto: "Manzana", precio: "$1.50" },
  { producto: "Pan integral", precio: "$2.00" },
  { producto: "Leche", precio: "$0.99" },
];

items.forEach((item) => {
  const nombreAlineado = item.producto.padEnd(15, ".");
  console.log(\`\${nombreAlineado} \${item.precio}\`);
});

/* Resultado:
Manzana........ $1.50
Pan integral... $2.00
Leche.......... $0.99
*/`,
      },
      {
        titulo: "Ejemplo 4: Si ya es más larga, no cambia",
        code: `const texto = "JavaScript";
console.log(texto.padEnd(5, "0")); // "JavaScript" (sin cambios)`,
      },
    ],
    errores: [
      {
        texto:
          "**Intentar usarlo sobre un número:** es un método exclusivo de strings. Convierte antes.",
        code: `// ❌ TypeError
(5).padEnd(3, "0");

// ✅ Convierte primero
String(5).padEnd(3, "0"); // "500"`,
      },
      {
        texto:
          "**Confundir `targetLength` con la cantidad de caracteres a añadir:** es la longitud **total final**, no el relleno.",
        code: `"1234".padEnd(3, "0"); // "1234" (ya tiene length 4 > 3, no cambia)
"12".padEnd(4, "0");   // "1200" (rellena 2 ceros)`,
      },
      {
        texto:
          "**Olvidar que `padString` puede truncarse:** si no cabe completo, solo se usa la parte necesaria.",
        code: `"A".padEnd(5, "12345"); // "A1234" (solo caben 4 caracteres del padString)`,
      },
      {
        texto:
          "**Pensar que modifica el string original:** los strings son inmutables.",
        code: `let texto = "Hola";
texto.padEnd(10, ".");
console.log(texto); // "Hola"

// ✅ Hay que reasignar
texto = texto.padEnd(10, ".");
console.log(texto); // "Hola......"`,
      },
    ],
    casos: [
      "**Formatos de impresión/facturación:** crear tickets de venta o archivos de texto plano con anchos de columna fijos.",
      "**Formatos de salida CLI:** alinear nombres de comandos y sus descripciones al construir herramientas de línea de comandos.",
      "**Máscaras de datos:** rellenar el final con caracteres para completar diseños o interfaces en modo texto.",
    ],
    relacion: [
      "**`String.prototype.padStart()`:** su contraparte; añade el relleno al **inicio** (izquierda).",
      "**`String.prototype.repeat()`:** repite una cadena N veces sin límite de longitud total.",
      "**Inmutabilidad:** al igual que otros métodos de `String`, no altera el valor original.",
    ],
    analogia:
      "Es como escribir en un **formulario en papel** donde cada campo tiene casilleros contados. Si tu respuesta es más corta que la fila de casilleros, `padEnd()` rellena los casilleros vacíos de la **derecha** con guiones o espacios hasta llegar al borde final.",
    fuente:
      "MDN Web Docs - String.prototype.padEnd() | Especificación ECMAScript 2017 (ES8)",
    notasPersonales: [
      "`padEnd()` siempre trabaja con la propiedad `.length` del string.",
      "Si necesitas transformar un número antes de rellenarlo, conviértelo primero a string con `String(numero)` o `numero.toString()`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve '5'.padEnd(3, '0')?",
        ["'5'", "'005'", "'500'", "undefined"],
        2,
      ],
      [
        "¿padEnd() modifica la cadena original?",
        [
          "Sí, siempre",
          "No, devuelve una nueva",
          "Solo si es let",
          "Depende del navegador",
        ],
        1,
      ],
      [
        "¿En qué lado añade el relleno padEnd()?",
        [
          "Al inicio (izquierda)",
          "Al final (derecha)",
          "En el medio",
          "En ambos lados",
        ],
        1,
      ],
      [
        "¿Qué devuelve 'JavaScript'.padEnd(5, '0')?",
        ["'JavaScript'", "'00000JavaScript'", "'5'", "Un error"],
        0,
      ],
      [
        "¿Qué devuelve 'A'.padEnd(5, '12345')?",
        ["'A1234'", "'1234A'", "'AAAAA'", "'A12345'"],
        0,
      ],
      [
        "¿Qué pasa si llamas padEnd() sobre un número?",
        ["Funciona normal", "Lanza TypeError", "Devuelve NaN", "Devuelve null"],
        1,
      ],
      ["¿Cuál es el padString por defecto?", ["'0'", "' '", "'-'", "'*'"], 1],
      [
        "¿Qué método hace el relleno al inicio en lugar del final?",
        ["padEnd()", "padStart()", "repeat()", "fill()"],
        1,
      ],
    ]),
  },

  /* ============================ substring() ============================ */
  substring: {
    id: "substring",
    titulo: "String.prototype.substring()",
    simulador: "string",
    definicion: [
      "Es un método built-in de los objetos `String` que **devuelve un subconjunto (una sección) de una cadena de texto**, extraído entre dos índices especificados.",
    ],
    queEs: [
      "Es un método tradicional de **extracción de subcadenas** presente desde **ECMAScript 1 (ES1)**.",
      "Retorna un **nuevo string** con los caracteres comprendidos entre el índice de inicio y el índice de fin, **sin modificar la cadena original**.",
      "A diferencia de `slice()`, **no acepta índices negativos** (los convierte a `0`) y **no intercambia** los argumentos silenciosamente.",
    ],
    paraQueSirve: [
      "**Recortar textos:** extraer los primeros 100 caracteres de una noticia para una vista previa.",
      '**Aislar partes de una estructura:** extraer el año de `"2026-07-20"`, o partes fijas de un código/identificador.',
      "**Formatear datos:** combinar con `indexOf()` para recortar antes o después de un carácter delimitador.",
    ],
    comoFunciona: [
      "Toma los caracteres desde `indexStart` hasta `indexEnd` (**sin incluir** el carácter en `indexEnd`).",
      "Si `indexStart` es mayor que `indexEnd`, `substring()` **los intercambia automáticamente** (ej. `substring(5, 2)` equivale a `substring(2, 5)`).",
      "Cualquier argumento negativo o `NaN` se trata como si fuera `0`.",
      "Si un índice es mayor que `str.length`, se trata como `str.length`.",
      "Devuelve una nueva cadena; la original permanece intacta.",
    ],
    sintaxis: [
      {
        code: `str.substring(indexStart);
str.substring(indexStart, indexEnd);`,
      },
    ],
    nota: "**`indexStart`:** primer carácter a incluir. **`indexEnd` (opcional):** primer carácter a **excluir**. **Retorno:** un nuevo `String` con la sección extraída.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico",
        code: `const texto = "JavaScript";

console.log(texto.substring(0, 4)); // "Java"   (índice 4 excluido)
console.log(texto.substring(4));    // "Script" (hasta el final)`,
      },
      {
        titulo: "Ejemplo 2: Intercambio automático e índices negativos",
        code: `const palabra = "Desarrollo";

// Como inicio (5) > fin (2), los intercambia
console.log(palabra.substring(5, 2)); // "sar"

// Los negativos se convierten en 0
console.log(palabra.substring(-3, 3)); // "Des" (equivale a substring(0, 3))`,
      },
      {
        titulo: "Ejemplo 3: Extraer partes dinámicas con indexOf()",
        code: `const email = "usuario@ejemplo.com";
const posArroba = email.indexOf("@");

const nombreUsuario = email.substring(0, posArroba);
console.log(nombreUsuario); // "usuario"`,
      },
      {
        titulo: "Ejemplo 4: La cadena original no cambia",
        code: `const original = "Hola Mundo";
const parte = original.substring(0, 4);

console.log(original); // "Hola Mundo"
console.log(parte);    // "Hola"`,
      },
    ],
    errores: [
      {
        texto:
          "**Confundir con el método obsoleto `substr()`:** `substr(inicio, longitud)` toma una cantidad, mientras que `substring(inicio, fin)` usa índices.",
        code: `"JavaScript".substring(2, 4); // "va"   (índices)
"JavaScript".substr(2, 4);    // "vaSc" (2 desde el 2)`,
      },
      {
        texto:
          "**Esperar índices negativos (como en `slice()`):** `substring()` los convierte a `0`.",
        code: `"Hola".substring(-2); // "Hola" (¡no son las últimas letras!)
"Hola".slice(-2);     // "la"   (esto sí)`,
      },
      {
        texto:
          "**Olvidar que el límite superior es excluyente:** `substring(0, 3)` devuelve los índices 0, 1 y 2.",
        code: `"JavaScript".substring(0, 3); // "Jav"  (no "Java")`,
      },
      {
        texto:
          "**Pensar que lanza error con índices invertidos:** los intercambia en silencio (a diferencia de `slice()`).",
        code: `"JavaScript".substring(5, 2); // "vaS"  (equivale a 2, 5)
"JavaScript".slice(5, 2);     // ""     (slice devuelve vacío)`,
      },
    ],
    casos: [
      '**Acortar textos en UI:** crear truncados de texto (`texto.substring(0, 50) + "..."`).',
      '**Formateo de fechas:** separar partes de una cadena formateada (`"20260720"` → año, mes, día).',
      "**Limpieza de prefijos/sufijos:** remover caracteres fijos al inicio si se conoce su longitud.",
      "**Extracción tras `indexOf()`:** recortar antes o después de un separador conocido.",
    ],
    relacion: [
      "**`String.prototype.slice()`:** método muy similar y **más recomendado** en código moderno (acepta negativos y no intercambia argumentos en silencio).",
      "**`String.prototype.substr()`:** método obsoleto que usaba `longitud` en lugar de índice final.",
      "**`String.prototype.indexOf()`:** se combina con `substring()` para recortar en posiciones dinámicas.",
      "**Inmutabilidad:** al igual que otros métodos de `String`, no altera el valor original.",
    ],
    analogia:
      "Es como marcar una cita en una **cinta de cassette o de película**. Le dices a la máquina: *«empieza a grabar en la marca del segundo 2 y detente justo al llegar al segundo 5»*. La cinta resultante contiene únicamente el tramo grabado entre esas dos marcas.",
    fuente:
      "MDN Web Docs - String.prototype.substring() | Especificación ECMAScript (ECMA-262)",
    notasPersonales: [
      "En el desarrollo JS moderno suele preferirse `.slice()` en lugar de `.substring()` por su soporte intuitivo de índices negativos.",
      "`str.substring(0, 1)` equivale a `str.charAt(0)` o `str[0]`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'JavaScript'.substring(0, 4)?",
        ["'Java'", "'JavaS'", "'Jav'", "'Script'"],
        0,
      ],
      [
        "¿Qué devuelve 'JavaScript'.substring(4)?",
        ["'Java'", "'Script'", "'JavaS'", "undefined"],
        1,
      ],
      [
        "¿Qué hace substring() si indexStart > indexEnd?",
        [
          "Lanza error",
          "Devuelve ''",
          "Los intercambia automáticamente",
          "Devuelve null",
        ],
        2,
      ],
      [
        "¿Qué devuelve 'Desarrollo'.substring(-3, 3)?",
        ["'Des'", "'Desarrollo'", "'sar'", "Un error"],
        0,
      ],
      [
        "¿Qué devuelve 'JavaScript'.substring(0, 3)?",
        ["'Java'", "'Jav'", "'J'", "'Script'"],
        1,
      ],
      [
        "¿Qué diferencia clave tiene con slice()?",
        [
          "substring no acepta negativos y slice sí",
          "Son idénticos",
          "slice no acepta negativos",
          "substring muta la cadena",
        ],
        0,
      ],
      [
        "¿Qué devuelve 'JavaScript'.substring(5, 2)?",
        ["''", "'vaS'", "Un error", "'Scr'"],
        1,
      ],
      [
        "¿Qué método es su antecesor obsoleto con 'longitud' en el segundo argumento?",
        ["slice()", "substr()", "charAt()", "split()"],
        1,
      ],
    ]),
  },
  /* ============================ slice() ============================ */
  slice: {
    id: "slice",
    titulo: "String.prototype.slice()",
    simulador: "string",
    definicion: [
      "Es un método built-in de JavaScript que **extrae una sección de una cadena de texto** y la devuelve como una nueva cadena, sin modificar el *string* original.",
    ],
    queEs: [
      "Es el método **estándar y más recomendado en JavaScript moderno** para extraer subcadenas.",
      "A diferencia de `substring()`, soporta **índices negativos**, lo que permite contar posiciones desde el final de la cadena hacia atrás.",
      "**No modifica la cadena original**: los *strings* son inmutables.",
    ],
    paraQueSirve: [
      "**Extraer tramos desde el final:** obtener los últimos N caracteres de un texto (últimos 4 dígitos de una tarjeta, extensión de un archivo).",
      "**Recortar textos:** obtener fragmentos específicos indicando posiciones de inicio y fin.",
      "**Eliminar caracteres de los extremos:** quitar fácilmente el primer o último carácter de una cadena.",
    ],
    comoFunciona: [
      "Toma los caracteres desde `indexStart` hasta `indexEnd` (**sin incluir** el carácter en `indexEnd`).",
      "**Índices positivos:** cuentan desde el inicio (`0` = primer carácter).",
      "**Índices negativos:** cuentan desde el final hacia atrás (`-1` = último carácter, `-2` = penúltimo).",
      "**Índice final excluyente:** el carácter situado en `indexEnd` no entra.",
      'Si `indexStart >= indexEnd`, devuelve una cadena vacía (`""`).',
      "Devuelve una nueva cadena; la original permanece intacta.",
    ],
    sintaxis: [
      {
        code: `str.slice(indexStart);
str.slice(indexStart, indexEnd);`,
      },
    ],
    nota: "**`indexStart`:** índice de inicio (negativos cuentan desde el final). **`indexEnd` (opcional):** índice final **excluido** (negativos cuentan desde el final). **Retorno:** un nuevo `String` con la sección extraída.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Extracción básica con índices positivos",
        code: `const texto = "JavaScript";

console.log(texto.slice(0, 4)); // "Java"
console.log(texto.slice(4));    // "Script"`,
      },
      {
        titulo: "Ejemplo 2: Índices negativos (contar desde el final)",
        code: `const tarjeta = "1234567890123456";

const ultimosDigitos = tarjeta.slice(-4);
console.log(ultimosDigitos); // "3456"

console.log(tarjeta.slice(0, -6)); // "1234567890"`,
      },
      {
        titulo: "Ejemplo 3: Quitar el primer y último carácter",
        code: `const entreComillas = '"Hola Mundo"';
const limpio = entreComillas.slice(1, -1);
console.log(limpio); // "Hola Mundo"`,
      },
      {
        titulo: "Ejemplo 4: La cadena original no cambia",
        code: `const original = "JavaScript";
const parte = original.slice(0, 4);

console.log(original); // "JavaScript"
console.log(parte);    // "Java"`,
      },
    ],
    errores: [
      {
        texto:
          "**Inversión silenciosa de parámetros:** a diferencia de `substring()`, `slice()` **no intercambia** los argumentos si `indexStart > indexEnd`.",
        code: `"Hola".slice(3, 1);     // ""  (devuelve vacío)
"Hola".substring(3, 1); // "ol" (intercambia)`,
      },
      {
        texto:
          "**Confundir con `Array.prototype.slice()`:** funcionan exactamente igual a nivel conceptual, pero uno opera sobre strings y el otro sobre arrays.",
        code: `"Hola".slice(1, 3);   // "ol"
[1, 2, 3, 4].slice(1, 3); // [2, 3]`,
      },
      {
        texto:
          "**Confundir con el método obsoleto `substr()`:** `substr(inicio, longitud)` toma una cantidad, mientras que `slice(inicio, fin)` usa índices.",
        code: `"JavaScript".slice(2, 4);  // "va"   (índices)
"JavaScript".substr(2, 4); // "vaSc" (cantidad)`,
      },
      {
        texto:
          "**Pensar que modifica el string original:** los strings son inmutables.",
        code: `let texto = "Hola";
texto.slice(0, 2);
console.log(texto); // "Hola"

// ✅ Hay que reasignar
texto = texto.slice(0, 2);
console.log(texto); // "Ho"`,
      },
    ],
    casos: [
      '**Enmascarar datos sensibles:** ocultar números de tarjeta dejando visibles solo los últimos dígitos (`"****" + numero.slice(-4)`).',
      '**Obtener extensiones de archivos:** `nombre.slice(nombre.lastIndexOf("."))`.',
      '**Formateador de cadenas:** formatear horas o números agregando ceros a la izquierda (`("0" + minuto).slice(-2)`).',
      "**Quitar wrappers:** eliminar comillas, corchetes o etiquetas fijas del inicio y fin.",
    ],
    relacion: [
      "**`String.prototype.substring()`:** alternativa tradicional que convierte valores negativos a `0` y conmuta los parámetros si están invertidos.",
      "**`Array.prototype.slice()`:** equivalente directo para arreglos.",
      "**`String.prototype.at()`:** método para obtener un solo carácter aceptando también índices negativos.",
      "**`String.prototype.substr()`:** método obsoleto con `longitud` como segundo argumento.",
    ],
    analogia:
      "Es como **recortar con tijeras una tira de papel**. Puedes decirle a la tijera: *«haz el primer corte tras pasar 2 centímetros desde la izquierda y el segundo corte a 3 centímetros antes de llegar al final del papel»*. El trozo recortado entre ambas marcas es el resultado.",
    fuente:
      "MDN Web Docs - String.prototype.slice() | Especificación ECMAScript (ECMA-262)",
    notasPersonales: [
      "**Es el método preferido en JS moderno** para extraer subcadenas, gracias a su soporte limpio e intuitivo de índices negativos.",
      "**Truco rápido:** para obtener los últimos N caracteres de cualquier cadena, usa `str.slice(-N)`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'JavaScript'.slice(0, 4)?",
        ["'Java'", "'JavaS'", "'Jav'", "'Script'"],
        0,
      ],
      [
        "¿Qué devuelve '1234567890'.slice(-4)?",
        ["'1234'", "'7890'", "'567890'", "undefined"],
        1,
      ],
      [
        "¿slice() acepta índices negativos?",
        [
          "No",
          "Sí, cuentan desde el final",
          "Solo en strings",
          "Solo en arrays",
        ],
        1,
      ],
      [
        "¿Qué devuelve 'Hola'.slice(3, 1)?",
        ["'ol'", "''", "Un error", "'Ho'"],
        1,
      ],
      [
        "¿Qué devuelve 'Hola'.substring(3, 1)?",
        ["'ol'", "''", "Un error", "'Ho'"],
        0,
      ],
      [
        "¿Qué devuelve '\"Hola\"'.slice(1, -1)?",
        ["'Hola'", "'\"Hol'", "'Hola\"'", "'ol'"],
        0,
      ],
      [
        "¿slice() modifica la cadena original?",
        [
          "Sí",
          "No, devuelve una nueva",
          "Solo con let",
          "Depende del navegador",
        ],
        1,
      ],
      [
        "¿Qué diferencia clave hay entre slice() y substring()?",
        [
          "slice acepta negativos y no intercambia; substring convierte negativos a 0 e intercambia",
          "Son idénticos",
          "slice muta la cadena",
          "substring acepta negativos",
        ],
        0,
      ],
    ]),
  },
  /* ============================ charAt() ============================ */
  charat: {
    id: "charat",
    titulo: "String.prototype.charAt()",
    simulador: "string",
    definicion: [
      "Es un método built-in de JavaScript que **devuelve el carácter ubicado en el índice (posición) especificado** de una cadena de texto.",
    ],
    queEs: [
      "Es un método clásico de **acceso a caracteres individuales** dentro de un *string*, presente desde **ECMAScript 1 (ES1)**.",
      "Devuelve un nuevo *string* que contiene únicamente el carácter encontrado en esa posición.",
      'A diferencia de `str[i]`, **nunca devuelve `undefined`**: si el índice no existe, retorna una cadena vacía `""`.',
    ],
    paraQueSirve: [
      "**Obtener un carácter específico:** extraer la primera letra de un nombre (para iniciales), el último carácter de un código, o un símbolo en una posición dada.",
      "**Inspeccionar texto posición por posición:** recorrer cadenas dentro de bucles tradicionales.",
      '**Acceso seguro a índices inexistentes:** obtener `""` en lugar de `undefined` cuando el índice está fuera de rango.',
    ],
    comoFunciona: [
      "Recibe un número que representa el índice basado en cero (*zero-based index*).",
      "Si el índice está dentro del rango `0` a `length - 1`, devuelve el carácter de esa posición.",
      'Si el índice es **menor a 0** o **mayor/igual a la longitud**, devuelve una **cadena vacía** (`""`).',
      "Si no se le pasa ningún argumento, toma por defecto el índice `0`.",
      "Devuelve una nueva cadena; la original permanece intacta.",
    ],
    sintaxis: [
      {
        code: `str.charAt();
str.charAt(index);`,
      },
    ],
    nota: '**`index` (opcional):** un entero entre `0` y `str.length - 1`. Si se omite, el valor predeterminado es `0`. **Retorno:** un `String` de un solo carácter, o `""` si el índice está fuera de rango.',
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico y valor por defecto",
        code: `const texto = "JavaScript";

console.log(texto.charAt(0)); // "J"  (primer carácter)
console.log(texto.charAt(4)); // "S"
console.log(texto.charAt());  // "J"  (sin parámetro equivale a charAt(0))`,
      },
      {
        titulo: "Ejemplo 2: Obtener el último carácter",
        code: `const palabra = "Desarrollo";
const ultimoCaracter = palabra.charAt(palabra.length - 1);

console.log(ultimoCaracter); // "o"`,
      },
      {
        titulo: "Ejemplo 3: Fuera de rango (comparado con corchetes)",
        code: `const texto = "Hola";

console.log(texto.charAt(10)); // ""          (charAt → cadena vacía)
console.log(texto[10]);        // undefined   (corchetes → undefined)`,
      },
      {
        titulo: "Ejemplo 4: Capitalizar la primera letra",
        code: `const nombre = "josue";
const capitalizado = nombre.charAt(0).toUpperCase() + nombre.slice(1);

console.log(capitalizado); // "Josue"`,
      },
    ],
    errores: [
      {
        texto:
          "**Incompatibilidad con pares sustitutos Unicode (*Surrogate Pairs*):** `charAt()` trabaja con unidades de código UTF-16. Con emojis devuelve solo la primera mitad.",
        code: `// ❌ Mitad de un emoji (carácter no imprimible)
"😀".charAt(0); // "\\uD83D"

// ✅ Alternativas Unicode-safe
[...\"😀\"][0];               // "😀"
"😀".codePointAt(0);          // 128512`,
      },
      {
        texto:
          "**Intentar pasar índices negativos:** a diferencia de `.at()`, `charAt(-1)` no cuenta desde el final.",
        code: `"Hola".charAt(-1); // ""   (fuera de rango)
"Hola".at(-1);     // "a"  (cuenta desde el final)`,
      },
      {
        texto:
          "**Pensar que modifica la cadena original:** los strings son inmutables.",
        code: `let texto = "Hola";
texto.charAt(0);
console.log(texto); // "Hola"`,
      },
      {
        texto:
          "**Olvidar los paréntesis:** `texto.charAt` (sin paréntesis) devuelve la referencia al método, no lo ejecuta.",
        code: `texto.charAt;   // [Function: charAt]
texto.charAt(); // ejecuta`,
      },
    ],
    casos: [
      "**Creación de iniciales:** extraer la primera letra de nombres propios (`nombre.charAt(0).toUpperCase()`).",
      "**Capitalizar textos:** `texto.charAt(0).toUpperCase() + texto.slice(1)`.",
      "**Compatibilidad heredada (legacy):** garantizar soporte en entornos extremadamente antiguos.",
      "**Búsquedas de caracteres por posición fija:** inspeccionar códigos donde una posición concreta tiene significado (ej. `charAt(2) === '-'`).",
    ],
    relacion: [
      "**Notación de corchetes (`str[index]`)**: alternativa moderna (ES5) más corta para acceder a caracteres, aunque devuelve `undefined` si el índice no existe.",
      "**`String.prototype.at()`**: método moderno (ES2022) que **sí permite índices negativos** (`at(-1)` = último carácter).",
      "**`String.prototype.charCodeAt()`**: devuelve el valor numérico Unicode (código UTF-16) del carácter en esa posición, en lugar del carácter mismo.",
      "**`String.prototype.codePointAt()`**: variante segura para emojis y caracteres fuera del BMP.",
    ],
    analogia:
      "Es como pedirle a alguien que lea la **letra N° X** de una palabra escrita en una lista. Si le pides la letra en la posición 1, te la dirá; pero si le pides la letra en la posición 50 de una palabra de 5 letras, simplemente no dirá nada (cadena vacía).",
    fuente:
      "MDN Web Docs - String.prototype.charAt() | Especificación ECMAScript (ECMA-262)",
    notasPersonales: [
      "**Para código moderno**, suele preferirse la notación de corchetes `str[0]` por brevedad, o `str.at(-1)` cuando necesitas contar desde el final.",
      "**Para capitalizar la primera letra:** `str.charAt(0).toUpperCase() + str.slice(1)`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'JavaScript'.charAt(0)?",
        ["'JavaScript'", "'J'", "'a'", "undefined"],
        1,
      ],
      [
        "¿Qué devuelve 'JavaScript'.charAt()?",
        ["''", "'J'", "'t'", "undefined"],
        1,
      ],
      [
        "¿Qué devuelve 'Hola'.charAt(10)?",
        ["undefined", "null", "''", "Un error"],
        2,
      ],
      ["¿Qué devuelve 'Hola'[10]?", ["''", "undefined", "null", "Un error"], 1],
      [
        "¿charAt(-1) cuenta desde el final?",
        [
          "Sí",
          "No, devuelve ''",
          "Solo en strings largos",
          "Depende del navegador",
        ],
        1,
      ],
      [
        "¿Qué método sí acepta índices negativos?",
        ["charAt()", "at()", "charCodeAt()", "indexOf()"],
        1,
      ],
      [
        "¿Qué devuelve 'Desarrollo'.charAt(9)?",
        ["'o'", "'D'", "'ll'", "undefined"],
        0,
      ],
      [
        "¿Qué devuelve '😀'.charAt(0)?",
        [
          "'😀'",
          "La mitad del par sustituto (no imprimible)",
          "''",
          "Un error",
        ],
        1,
      ],
    ]),
  },

  /* ============================ split() ============================ */
  split: {
    id: "split",
    titulo: "String.prototype.split()",
    simulador: "string",
    definicion: [
      "Es un método built-in de JavaScript que **divide una cadena de texto en un arreglo (`Array`) de subcadenas**, utilizando un separador especificado.",
    ],
    queEs: [
      "Es una de las funciones de **manipulación de texto más importantes y utilizadas** en JavaScript, presente desde **ECMAScript 1 (ES1)**.",
      "Permite **descomponer un *string*** en partes manejables basadas en un carácter, secuencia de caracteres o expresión regular.",
      "Acepta un segundo parámetro `limit` que restringe el número de elementos del array resultante.",
    ],
    paraQueSirve: [
      "**Convertir texto en arreglos:** transformar listas separadas por comas (CSV), palabras de una oración o líneas de un párrafo en un `Array` para iterar sobre ellos.",
      "**Extraer partes de una cadena:** obtener la extensión de un archivo, el dominio de un correo o los parámetros de una URL.",
      "**Procesamiento de datos:** limpiar y estructurar texto plano para su análisis.",
    ],
    comoFunciona: [
      "Busca todas las apariciones del separador dentro del *string*.",
      "Cada vez que encuentra el separador, **corta la cadena** y guarda el fragmento como un nuevo elemento del array.",
      "El separador **se elimina** del resultado (no forma parte de los fragmentos).",
      "Si se especifica un `limit`, el proceso se detiene en cuanto el array alcanza esa cantidad de elementos.",
      "Devuelve un **array** con las subcadenas; la cadena original permanece intacta.",
    ],
    sintaxis: [
      {
        code: `str.split();
str.split(separator);
str.split(separator, limit);`,
      },
    ],
    nota: "**`separator` (opcional):** patrón que determina dónde cortar (string o `RegExp`). Si se omite, el array contiene un único elemento con la cadena completa. **`limit` (opcional):** máximo de elementos del array. **Retorno:** un `Array` de cadenas.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Separar por un carácter o delimitador",
        code: `const lenguajes = "JavaScript,Python,PHP,Java";
const lista = lenguajes.split(",");

console.log(lista); // ["JavaScript", "Python", "PHP", "Java"]`,
      },
      {
        titulo: "Ejemplo 2: Dividir en palabras o caracteres individuales",
        code: `const frase = "Hola Mundo";

console.log(frase.split(" ")); // ["Hola", "Mundo"]
console.log(frase.split(""));  // ["H", "o", "l", "a", " ", "M", "u", "n", "d", "o"]`,
      },
      {
        titulo: "Ejemplo 3: Usar el parámetro limit",
        code: `const etiquetas = "js-css-html-react-vue";
const primerasTres = etiquetas.split("-", 3);

console.log(primerasTres); // ["js", "css", "html"]`,
      },
      {
        titulo:
          "Ejemplo 4: Uso con Expresiones Regulares (múltiples separadores)",
        code: `const texto = "manzana, pera; uva / melon";
const frutas = texto.split(/\\s*[,;/]\\s*/);

console.log(frutas); // ["manzana", "pera", "uva", "melon"]`,
      },
    ],
    errores: [
      {
        texto:
          '**Problemas con emojis/Unicode al usar `split("")`:** rompe los caracteres que usan *surrogate pairs* (como la mayoría de los emojis).',
        code: `// ❌ Rompe el emoji en dos mitades corruptas
"🚀".split("");          // ["\\uD83D", "\\uDE80"]

// ✅ Alternativas Unicode-seguras
Array.from("🚀");        // ["🚀"]
[...\"🚀\"];               // ["🚀"]`,
      },
      {
        texto:
          "**Olvidar pasar un separador:** `split()` sin argumentos no divide nada.",
        code: `"Hola Mundo".split(); // ["Hola Mundo"]  (un único elemento)`,
      },
      {
        texto:
          "**Inmutabilidad:** `split()` **no modifica** la cadena original; genera un nuevo `Array`.",
        code: `let texto = "a,b,c";
texto.split(",");
console.log(texto); // "a,b,c"`,
      },
      {
        texto:
          "**`limit` no corta la cadena, corta el array:** el último elemento contendrá el resto del texto.",
        code: `"a,b,c,d".split(",", 2); // ["a", "b"]  (c y d se descartan)
"a,b,c,d".split(",", 3); // ["a", "b", "c"]  (d se descarta)`,
      },
    ],
    casos: [
      '**Invertir una cadena:** `str.split("").reverse().join("")` (o `[...str].reverse().join("")` para Unicode seguro).',
      '**Obtener la extensión de un archivo:** `nombreArchivo.split(".").pop()`.',
      '**Parsear parámetros de consulta (URL Query Params):** separar `key1=val1&key2=val2` con `split("&")`.',
      '**Procesar CSV:** `fila.split(",")` para obtener las columnas.',
    ],
    relacion: [
      "**`Array.prototype.join()`:** el método **inverso** de `split()`; une los elementos de un arreglo en una sola cadena de texto.",
      '**`Array.from()` / Operador Spread (`[...]`)**: alternativas modernas y Unicode-seguras a `str.split("")`.',
      "**`String.prototype.match()` / `matchAll()`:** para búsquedas avanzadas con regex.",
      "**`String.prototype.replace()`:** permite reemplazar en lugar de dividir.",
    ],
    analogia:
      "Piensa en una cadena de texto como una **salchicha larga o una cuerda**, y en el separador como la marca donde un cocinero va a hacer **cortes con un cuchillo**. Cada trozo resultante se coloca dentro de un plato (el `Array`), y las marcas sobre las que cortaste desaparecen en el proceso.",
    fuente:
      "MDN Web Docs - String.prototype.split() | Especificación ECMAScript (ECMA-262)",
    notasPersonales: [
      "**Para dividir cadenas por salto de línea** sin importar el sistema operativo (Windows/Linux/Mac), usa `.split(/\\r?\\n/)`.",
      '**Para convertir un string a array de caracteres reales respetando emojis:** `[...str]` es superior a `str.split("")`.',
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'a,b,c'.split(',')?",
        ["'abc'", "['a', 'b', 'c']", "'a, b, c'", "['abc']"],
        1,
      ],
      [
        "¿Qué devuelve 'Hola Mundo'.split(' ')?",
        [
          "['Hola', 'Mundo']",
          "['Hola Mundo']",
          "'HolaMundo'",
          "['H', 'o', 'l', 'a']",
        ],
        0,
      ],
      [
        "¿Qué devuelve 'a,b,c,d'.split(',', 2)?",
        ["['a', 'b', 'c', 'd']", "['a', 'b']", "['a', 'b', 'c']", "['a']"],
        1,
      ],
      [
        "¿Qué devuelve 'a,b'.split() (sin argumentos)?",
        ["['a', 'b']", "['a,b']", "['a']", "[]"],
        1,
      ],
      [
        "¿Qué problema tiene '🚀'.split('')?",
        [
          "Ninguno",
          "Rompe el emoji en dos mitades corruptas",
          "Lanza un error",
          "Devuelve []",
        ],
        1,
      ],
      [
        "¿Qué método es el inverso de split()?",
        ["join()", "replace()", "concat()", "slice()"],
        0,
      ],
      [
        "¿Qué devuelve 'Hola'.split(',')?",
        ["['Hola']", "[]", "['H', 'o', 'l', 'a']", "'Hola'"],
        0,
      ],
      [
        "¿Cuál es la alternativa Unicode-segura a '🚀'.split('')?",
        ["[...'🚀']", "'🚀'.slice(0)", "'🚀'.charAt(0)", "'🚀'.split(' ')"],
        0,
      ],
    ]),
  },

  /* ============================ replace() ============================ */
  replace: {
    id: "replace",
    titulo: "String.prototype.replace()",
    simulador: "string",
    definicion: [
      "Es un **método** de `String.prototype` que devuelve **una nueva cadena** donde una parte del texto original es reemplazada por otro valor.",
      "Permite reemplazar **una coincidencia** (o todas con regex y flag `g`) mediante un texto o una expresión regular.",
    ],
    queEs: [
      "Es un **método** heredado de `String.prototype`.",
      "**Forma parte del lenguaje JavaScript (ECMAScript)**, **no de una Web API**.",
      "Es un método **inmutable**: **no modifica la cadena original**.",
      "Si se necesita reemplazar **todas** las coincidencias de un texto literal, es más cómodo `replaceAll()` o una expresión regular con la flag `g`.",
    ],
    paraQueSirve: [
      "**Cambiar palabras** dentro de un texto.",
      "**Corregir información** o limpiar datos.",
      "**Reemplazar patrones** usando expresiones regulares.",
      '**Ocultar información sensible** (ej. `"1234-5678".replace(/\\d/g, "*")`).',
      "**Transformar cadenas** dinámicamente con una función de reemplazo.",
    ],
    comoFunciona: [
      "Se llama `replace()` sobre una cadena.",
      "Busca el patrón indicado (`string` o `RegExp`).",
      "**Si el patrón es un string**, solo reemplaza la **primera** aparición.",
      "**Si es una `RegExp`:** reemplaza solo la primera coincidencia, **salvo** que lleve la flag `g`, en cuyo caso reemplaza **todas**.",
      "El segundo argumento puede ser un **string de reemplazo** (con patrones `$1`, `$&`, etc.) o una **función** que retorna el nuevo valor.",
      "Devuelve una nueva cadena; la original permanece intacta.",
    ],
    sintaxis: [
      {
        code: `cadena.replace(busqueda, reemplazo);`,
      },
    ],
    nota: "**`busqueda`:** texto o `RegExp` a encontrar. **`reemplazo`:** texto o función que sustituye la coincidencia. **Retorno:** una nueva cadena con el reemplazo aplicado.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Reemplazar una palabra",
        code: `const texto = "Hola mundo";
const resultado = texto.replace("mundo", "JavaScript");

console.log(resultado); // "Hola JavaScript"`,
      },
      {
        titulo: "Ejemplo 2: La cadena original no cambia",
        code: `const texto = "Hola mundo";
texto.replace("mundo", "JS");

console.log(texto); // "Hola mundo"  (hay que guardar el resultado)

// ✅ Forma correcta
const nuevoTexto = texto.replace("mundo", "JS");`,
      },
      {
        titulo: "Ejemplo 3: Solo la primera coincidencia con string",
        code: `const texto = "gato gato gato";
console.log(texto.replace("gato", "perro"));
// "perro gato gato"  (solo la primera)`,
      },
      {
        titulo: "Ejemplo 4: Reemplazar todas con regex + flag g",
        code: `const texto = "gato gato gato";
console.log(texto.replace(/gato/g, "perro"));
// "perro perro perro"`,
      },
      {
        titulo: "Ejemplo 5: Función como reemplazo",
        code: `const texto = "javascript";
const resultado = texto.replace("javascript", (palabra) => palabra.toUpperCase());

console.log(resultado); // "JAVASCRIPT"`,
      },
      {
        titulo: "Ejemplo 6: Reemplazar números",
        code: `const texto = "Tengo 3 manzanas";
const resultado = texto.replace(/\\d/, "5");

console.log(resultado); // "Tengo 5 manzanas"`,
      },
    ],
    errores: [
      {
        texto:
          "**Pensar que modifica la cadena original:** los strings son inmutables.",
        code: `let texto = "Hola mundo";
texto.replace("mundo", "JS");
console.log(texto); // "Hola mundo"

// ✅ Hay que reasignar
texto = texto.replace("mundo", "JS");
console.log(texto); // "Hola JS"`,
      },
      {
        texto:
          "**Pensar que reemplaza todas las coincidencias automáticamente:** con string solo reemplaza la primera.",
        code: `"hola hola".replace("hola", "adiós");     // "adiós hola"
"hola hola".replace(/hola/g, "adiós");   // "adiós adiós"
"hola hola".replaceAll("hola", "adiós"); // "adiós adiós"`,
      },
      {
        texto: "**Confundir `replace()` con `replaceAll()`:**",
        code: `replace()    // primera coincidencia (o todas si regex tiene /g)
replaceAll() // todas las coincidencias de un string literal`,
      },
      {
        texto: "**Olvidar que distingue mayúsculas y minúsculas:**",
        code: `"Hola".replace("hola", "Adiós"); // "Hola"  (no encuentra)

// ✅ Añade la flag i a la regex
"Hola".replace(/hola/i, "Adiós"); // "Adiós"`,
      },
    ],
    casos: [
      "**Limpiar formularios:** reemplazar caracteres no permitidos antes de guardar.",
      "**Corregir errores ortográficos** en un texto plano.",
      {
        texto: "**Ocultar información sensible:**",
        code: `"1234-5678".replace(/\\d/g, "*");
// "****-****"`,
      },
      "**Modificar URLs:** reemplazar partes dinámicas del path.",
      "**Procesar texto recibido de usuarios:** sanitizar antes de guardarlo.",
      "**Transformar datos antes de guardarlos:** aplicar mayúsculas a ciertas palabras con una función.",
    ],
    relacion: [
      "**`String.prototype.replaceAll()`:** reemplaza **todas** las coincidencias de un texto literal sin necesidad de regex.",
      "**Expresiones regulares (RegExp):** permiten búsquedas avanzadas.",
      "**`String.prototype.match()`:** busca coincidencias dentro de una cadena.",
      "**`String.prototype.split()`:** divide una cadena en partes.",
      "**Inmutabilidad:** `replace()` devuelve una nueva cadena, no modifica la original.",
    ],
    analogia:
      'Imagina un documento escrito: *"Comprar pan, comprar pan, comprar pan"*. Usando `replace()` con un string dices: *"cambia la primera frase que encuentres"*. Resultado: *"Comprar leche, comprar pan, comprar pan"*. Si quieres cambiar todas, usa `replaceAll()` o una regex con `/g`.',
    fuente:
      "MDN Web Docs - String.prototype.replace() | Especificación ECMAScript (ECMA-262)",
    notasPersonales: [
      "**Regla del proyecto:** si necesitas reemplazar **todas** las apariciones de un texto literal, prefiere `replaceAll()`. Si necesitas regex, usa `replace()` con flag `g`.",
      "**Patrones útiles en el reemplazo:** `$&` (coincidencia completa), `$1`..`$n` (grupos capturados), `` $` `` (antes), `$'` (después).",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'Hola mundo'.replace('mundo', 'JS')?",
        ["'Hola mundo'", "'Hola JS'", "'JS Hola'", "undefined"],
        1,
      ],
      [
        "¿Qué devuelve 'gato gato gato'.replace('gato', 'perro')?",
        [
          "'perro perro perro'",
          "'perro gato gato'",
          "'gato perro gato'",
          "'gato gato perro'",
        ],
        1,
      ],
      [
        "¿Cómo reemplazas todas las apariciones con replace()?",
        [
          "Usando replaceAll()",
          "Con una RegExp con flag g",
          "Llamando replace() N veces",
          "No se puede",
        ],
        1,
      ],
      [
        "¿replace() modifica la cadena original?",
        [
          "Sí, siempre",
          "No, devuelve una nueva",
          "Solo si es let",
          "Depende del patrón",
        ],
        1,
      ],
      [
        "¿Qué devuelve 'Hola'.replace('hola', 'Adiós')?",
        [
          "'Adiós'",
          "'Hola' (no encuentra, distingue mayúsculas)",
          "Un error",
          "undefined",
        ],
        1,
      ],
      [
        "¿Qué devuelve 'gato gato'.replace(/gato/g, 'perro')?",
        ["'perro gato'", "'perro perro'", "'gato perro'", "'gato gato'"],
        1,
      ],
      [
        "¿Qué devuelve '1234-5678'.replace(/\\d/g, '*')?",
        ["'1234-5678'", "'****-****'", "'1***-*678'", "Un error"],
        1,
      ],
      [
        "¿Qué método reemplaza todas las apariciones de un texto literal sin regex?",
        ["replace()", "replaceAll()", "replaceOne()", "replaceMany()"],
        1,
      ],
    ]),
  },

  /* ============================ replaceAll() ============================ */
  replaceall: {
    id: "replaceall",
    titulo: "String.prototype.replaceAll()",
    simulador: "string",
    definicion: [
      "Es un método built-in de los objetos `String` en JavaScript que devuelve una **nueva cadena de texto** donde **todas las coincidencias** de un patrón (cadena o expresión regular) son reemplazadas por un nuevo texto o el resultado de una función.",
    ],
    queEs: [
      "Es una función de **reemplazo global** introducida en **ECMAScript 2021 (ES12)**.",
      "Nació para solucionar la incomodidad de tener que usar expresiones regulares con la bandera global (`/patron/g`) en `replace()` cuando solo se quería reemplazar todas las apariciones de un **texto plano**.",
      "**No modifica la cadena original**: los *strings* son inmutables.",
    ],
    paraQueSirve: [
      "**Reemplazo masivo de subcadenas:** sustituir todas las apariciones de una palabra, espacio o carácter de forma directa.",
      "**Limpieza y formateo de datos:** cambiar todos los separadores de un formato a otro (ej. convertir guiones en espacios, comas por puntos).",
      "**Estandarización de plantillas:** reemplazar todas las variables o marcadores (*placeholders*) en una plantilla de texto.",
    ],
    comoFunciona: [
      "Busca **todas las ocurrencias** del primer parámetro (`pattern`) dentro de la cadena.",
      "Las sustituye por el segundo parámetro (`replacement`).",
      "**Si `pattern` es un `string`:** reemplaza cada coincidencia literal, **sin necesidad de regex**.",
      "**Si `pattern` es una `RegExp`:** es **obligatorio** que incluya la flag `g`; de lo contrario, **lanza `TypeError`**.",
      "Devuelve una nueva cadena; la original permanece intacta.",
    ],
    sintaxis: [
      {
        code: `str.replaceAll(pattern, replacement);`,
      },
    ],
    nota: "**`pattern`:** subcadena o `RegExp` (obligatorio con `/g`). **`replacement`:** cadena o función que sustituye cada coincidencia. **Retorno:** una nueva cadena con todas las coincidencias reemplazadas.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Reemplazo básico con cadenas de texto",
        code: `const texto = "manzana, pera, manzana, uva, manzana";

const resultado = texto.replaceAll("manzana", "fresa");

console.log(resultado);
// "fresa, pera, fresa, uva, fresa"  (todas, sin regex)`,
      },
      {
        titulo: "Ejemplo 2: Cambiar formatos de fechas o separadores",
        code: `const fechaGuiones = "2026-07-20";
const fechaBarras = fechaGuiones.replaceAll("-", "/");

console.log(fechaBarras); // "2026/07/20"`,
      },
      {
        titulo: "Ejemplo 3: Uso con Expresión Regular (OBLIGATORIO /g)",
        code: `const expresion = /gato/gi; // 'g' = global, 'i' = case-insensitive
const textoMascotas = "El Gato persa y el gato montés";

console.log(textoMascotas.replaceAll(expresion, "perro"));
// "El perro persa y el perro montés"`,
      },
      {
        titulo: "Ejemplo 4: Función como reemplazo",
        code: `const texto = "a1 b2 c3";
const resultado = texto.replaceAll(/\\d/g, (num) => String(Number(num) + 1));

console.log(resultado); // "a2 b3 c4"`,
      },
    ],
    errores: [
      {
        texto:
          "**Pasar una `RegExp` sin la flag global (`g`):** `replaceAll()` lanza `TypeError` inmediatamente.",
        code: `// ❌ TypeError: String.prototype.replaceAll called with a non-global RegExp
"gato gato".replaceAll(/gato/, "perro");

// ✅ Hay que añadir /g
"gato gato".replaceAll(/gato/g, "perro");`,
      },
      {
        texto:
          "**Olvidar que no modifica la cadena original:** hay que guardar el resultado o reasignar.",
        code: `// ❌ El original no cambia
let texto = "manzana manzana";
texto.replaceAll("manzana", "fresa");
console.log(texto); // "manzana manzana"

// ✅ Reasignar
texto = texto.replaceAll("manzana", "fresa");
console.log(texto); // "fresa fresa"`,
      },
      {
        texto:
          "**Incompatibilidad con entornos muy antiguos:** es de ES2021. Node.js 15+, Chrome 85+, Firefox 77+. No funciona en navegadores legacy (IE).",
      },
      {
        texto: "**Confundir `replace()` con `replaceAll()`:**",
        code: `"hola hola".replace("hola", "adiós");    // "adiós hola"
"hola hola".replaceAll("hola", "adiós"); // "adiós adiós"`,
      },
    ],
    casos: [
      "**Sanitizar texto de usuario:** eliminar o reemplazar etiquetas o caracteres no permitidos a lo largo de todo un párrafo.",
      "**Motor de plantillas simple:** reemplazar marcadores tipo `{{nombre}}` por datos reales en correos o documentos.",
      "**Formateo de monedas/números:** reemplazar separadores de miles o decimales importados de otros idiomas.",
      '**Normalización de separadores:** `"a,b,c".replaceAll(",", "-")` → `"a-b-c"`.',
    ],
    relacion: [
      "**`String.prototype.replace()`:** su antecesor; si le pasas un string literal solo reemplaza la **primera** coincidencia.",
      '**Expresiones Regulares (RegExp) con bandera `/g`:** la alternativa tradicional previa a ES2021 para lograr reemplazos globales (`str.replace(/patron/g, "nuevo")`).',
      "**`String.prototype.split()` + `join()`:** otra forma de reemplazar todas las apariciones (menos directa).",
      "**Inmutabilidad:** igual que `replace()`, no modifica la cadena original.",
    ],
    analogia:
      "Es como usar la función **«Reemplazar todo» (Ctrl + H / Cmd + H)** en un procesador de textos como Microsoft Word. En lugar de ir buscando coincidencia por coincidencia y darle a «Sustituir» una por una, le ordenas al programa que busque todas las palabras iguales en el documento y las cambie al instante.",
    fuente:
      "MDN Web Docs - String.prototype.replaceAll() | Especificación ECMAScript 2021 (ES12)",
    notasPersonales: [
      '**Para reemplazar todas las apariciones de un texto plano**, prefiere `.replaceAll("buscar", "reemplazo")` sobre `.replace(/buscar/g, "reemplazo")` para mejorar la legibilidad y evitar escapar caracteres especiales de RegExp.',
      "**Regla clave:** si pasas un `string`, no hay problema. Si pasas una `RegExp`, **obligatorio** `/g`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'manzana manzana'.replaceAll('manzana', 'fresa')?",
        ["'fresa manzana'", "'fresa fresa'", "'manzana fresa'", "Un error"],
        1,
      ],
      [
        "¿Qué pasa al usar replaceAll() con una RegExp SIN la flag g?",
        [
          "Funciona normal",
          "Lanza TypeError",
          "Solo reemplaza la primera",
          "Devuelve ''",
        ],
        1,
      ],
      [
        "¿replaceAll() modifica la cadena original?",
        ["Sí", "No, devuelve una nueva", "Solo con let", "Depende del patrón"],
        1,
      ],
      [
        "¿Qué devuelve 'a-b-c'.replaceAll('-', ' ')?",
        ["'a-b-c'", "'a b c'", "' a b c '", "Un error"],
        1,
      ],
      [
        "¿En qué versión de ECMAScript se introdujo replaceAll()?",
        ["ES5", "ES2015", "ES2021", "ES2023"],
        2,
      ],
      [
        "¿Cuál es la principal ventaja frente a replace() con string literal?",
        [
          "Es más rápido",
          "Reemplaza TODAS las coincidencias sin necesidad de regex",
          "Modifica la cadena",
          "Acepta funciones",
        ],
        1,
      ],
      [
        "¿Qué devuelve 'gato gato'.replaceAll(/gato/g, 'perro')?",
        ["'perro gato'", "'perro perro'", "'gato perro'", "Un error"],
        1,
      ],
      [
        "¿Qué método reemplaza solo la primera coincidencia con string literal?",
        ["replace()", "replaceAll()", "replaceOne()", "replaceFirst()"],
        0,
      ],
    ]),
  },

  /* ============================ includes() ============================ */
  includes: {
    id: "includes",
    titulo: "String.prototype.includes()",
    simulador: "string",
    definicion: [
      "`includes()` es un **método** de `String.prototype` que permite comprobar si una cadena de texto contiene una determinada secuencia de caracteres.",
      "Devuelve un valor booleano (`true` o `false`) dependiendo de si encuentra o no la coincidencia.",
    ],
    queEs: [
      "Es un **método** heredado de `String.prototype`.",
      "**Forma parte del lenguaje JavaScript (ECMAScript)**, **no de una Web API**.",
      "Es un método de **búsqueda de texto**.",
      "La búsqueda distingue entre **mayúsculas y minúsculas** (*case-sensitive*).",
    ],
    paraQueSirve: [
      "Verificar si un texto contiene una palabra o fragmento.",
      "Validar entradas del usuario.",
      "Realizar búsquedas simples.",
      "Filtrar información.",
      "Comprobar la existencia de caracteres dentro de una cadena.",
    ],
    comoFunciona: [
      "Se llama `includes()` sobre una cadena.",
      "JavaScript busca la secuencia indicada en **cualquier posición** del texto.",
      "Si encuentra coincidencia, devuelve `true`.",
      "Si no encuentra coincidencia, devuelve `false`.",
      "La cadena original no cambia.",
    ],
    sintaxis: [
      {
        code: `cadena.includes(busqueda, posicionInicial);`,
      },
    ],
    nota: "**`busqueda`:** texto que se desea encontrar dentro de la cadena. **`posicionInicial` (opcional):** índice desde donde comienza la búsqueda (por defecto `0`). **Retorno:** `true` si encuentra la cadena, `false` si no existe.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Comprobar si existe una palabra",
        code: `const texto = "Aprendiendo JavaScript";
console.log(texto.includes("JavaScript")); // true`,
      },
      {
        titulo: "Ejemplo 2: Cuando no existe",
        code: `const texto = "Hola mundo";
console.log(texto.includes("Python")); // false`,
      },
      {
        titulo: "Ejemplo 3: Diferencia entre mayúsculas y minúsculas",
        code: `const texto = "JavaScript";
console.log(texto.includes("javascript")); // false
// Porque: "JavaScript" ≠ "javascript"`,
      },
      {
        titulo: "Ejemplo 4: Usar posición inicial",
        code: `const texto = "JavaScript";
console.log(texto.includes("Script", 4)); // true
// La búsqueda empieza desde el índice 4`,
      },
      {
        titulo: "Ejemplo 5: Buscar caracteres",
        code: `const palabra = "Hola";
console.log(palabra.includes("o")); // true`,
      },
      {
        titulo: "Ejemplo 6: Validar un usuario",
        code: `const usuario = "admin123";
if (usuario.includes("admin")) {
  console.log("Usuario administrador");
}
// "Usuario administrador"`,
      },
    ],
    errores: [
      {
        texto: "**Confundir `includes()` con `indexOf()`:**",
        code: `texto.includes("hola"); // → true
texto.indexOf("hola");  // → 0  (o -1 si no existe)`,
      },
      {
        texto:
          "**Pensar que modifica la cadena:** `includes()` solo consulta, no modifica.",
        code: `let texto = "Hola Mundo";
texto.includes("Hola");
console.log(texto); // "Hola Mundo"`,
      },
      {
        texto: "**Olvidar que distingue mayúsculas:**",
        code: `"PERRO".includes("perro"); // false`,
      },
      {
        texto: "**Usarlo sobre valores que no son strings:**",
        code: `// ❌ TypeError
const numero = 12345;
numero.includes("2");

// ✅ Convertir antes
numero.toString().includes("2");`,
      },
    ],
    casos: [
      "Buscar palabras en textos.",
      {
        texto: "Validar extensiones de archivos:",
        code: `archivo.includes(".pdf");`,
      },
      "Detectar palabras prohibidas.",
      "Filtrar resultados.",
      "Validar formularios.",
      "Crear sistemas de búsqueda simples.",
    ],
    relacion: [
      "**`Array.prototype.includes()`:** también existe para arreglos y busca elementos dentro de arrays.",
      "**`indexOf()`:** devuelve la posición donde aparece el texto.",
      "**`startsWith()`:** comprueba si una cadena comienza con un texto.",
      "**`endsWith()`:** comprueba si una cadena termina con un texto.",
      "**`search()`:** permite búsquedas mediante expresiones regulares.",
      "**Booleanos:** `includes()` siempre devuelve `true` o `false`.",
    ],
    analogia:
      "Imagina que tienes un libro 📖 y preguntas: *«¿Este libro contiene la palabra JavaScript?»*. `includes()` funciona como un buscador: si encuentra la palabra → ✅ `true`; si no la encuentra → ❌ `false`. No cambia el libro, solamente revisa si existe esa información.",
    fuente:
      "MDN Web Docs - String.prototype.includes() | Especificación ECMAScript (ECMA-262)",
    notasPersonales: [
      "`includes()` es más rápido que `indexOf()` para búsquedas simples porque no necesita devolver la posición.",
      "**Para búsquedas case-insensitive:** aplica `toLowerCase()` a ambos lados antes de comparar.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'JavaScript'.includes('Script')?",
        ["true", "false", "4", "undefined"],
        0,
      ],
      [
        "¿Qué devuelve 'JavaScript'.includes('script')?",
        ["true", "false", "Un error", "undefined"],
        1,
      ],
      [
        "¿Para qué sirve el segundo parámetro de includes()?",
        [
          "Longitud máxima",
          "Posición desde donde empezar a buscar",
          "Cantidad de resultados",
          "Un callback",
        ],
        1,
      ],
      [
        "¿includes() modifica la cadena original?",
        [
          "Sí",
          "No, es de solo lectura",
          "Solo con let",
          "Depende del navegador",
        ],
        1,
      ],
      [
        "¿Cuál es la diferencia entre includes() e indexOf()?",
        [
          "includes devuelve booleano; indexOf devuelve posición",
          "Son idénticos",
          "includes devuelve posición",
          "indexOf devuelve booleano",
        ],
        0,
      ],
      [
        "¿Qué devuelve 'PERRO'.includes('perro')?",
        ["true", "false", "Un error", "undefined"],
        1,
      ],
      [
        "¿Qué pasa si llamas includes() sobre un número?",
        [
          "Funciona normal",
          "Lanza TypeError",
          "Devuelve NaN",
          "Devuelve false",
        ],
        1,
      ],
      [
        "¿Cuál es la forma de hacer una búsqueda case-insensitive?",
        [
          "includes(texto, {i: true})",
          "toLowerCase().includes(toLowerCase())",
          "includes(/texto/i)",
          "No se puede",
        ],
        1,
      ],
    ]),
  },

  /* ============================ indexOf() ============================ */
  indexof: {
    id: "indexof",
    titulo: "String.prototype.indexOf()",
    simulador: "string",
    definicion: [
      "Método de `String` que busca la **primera aparición** de una cadena dentro de otra y devuelve el **índice** donde comienza.",
    ],
    queEs: [
      "Es un **método** heredado de `String.prototype`.",
      "**Forma parte del lenguaje JavaScript (ECMAScript)**, **no de una Web API**.",
      "Es la versión clásica (pre-ES6) de la búsqueda de texto: lo que hace `includes()` pero devolviendo la **posición** en lugar de un booleano.",
      "La búsqueda distingue entre **mayúsculas y minúsculas** (*case-sensitive*).",
    ],
    paraQueSirve: [
      "Buscar una cadena dentro de otra.",
      "Saber la **posición** de una coincidencia.",
      "Comprobar si un texto contiene determinado contenido (aunque `includes()` es más expresivo para eso).",
      "Buscar desde una posición específica.",
      "Trabajar con texto sin necesidad de expresiones regulares.",
    ],
    comoFunciona: [
      "Recibe el texto que quieres buscar y, opcionalmente, una posición desde donde comenzar.",
      "Recorre la cadena **de izquierda a derecha** desde `posicionInicial` (por defecto `0`).",
      "Devuelve el **índice de la primera coincidencia** encontrada.",
      "Si existen varias coincidencias, devuelve **solamente la primera**.",
      "Si **no encuentra** el texto, devuelve **`-1`**.",
    ],
    sintaxis: [
      {
        code: `cadena.indexOf(valorBuscado);
cadena.indexOf(valorBuscado, posicionInicial);`,
      },
    ],
    nota: "**`valorBuscado`:** texto a encontrar. **`posicionInicial` (opcional):** índice desde donde buscar (por defecto `0`). **Retorno:** un `number` — el índice de la primera coincidencia, o `-1` si no existe.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Buscar una palabra",
        code: `const texto = "Me gusta JavaScript";
console.log(texto.indexOf("JavaScript")); // 9`,
      },
      {
        titulo: "Ejemplo 2: Cuando no existe",
        code: `"Hola mundo".indexOf("Python"); // -1`,
      },
      {
        titulo: "Ejemplo 3: Buscar un carácter",
        code: `"JavaScript".indexOf("S"); // 4`,
      },
      {
        titulo: "Ejemplo 4: Buscar la primera aparición",
        code: `"banana".indexOf("a"); // 1

// Aunque 'a' también aparece en 3 y 5, devuelve 1`,
      },
      {
        titulo: "Ejemplo 5: Empezar la búsqueda desde una posición",
        code: `const texto = "banana";
console.log(texto.indexOf("a", 2)); // 3
// Busca 'a' comenzando desde el índice 2`,
      },
      {
        titulo: "Ejemplo 6: Comprobar si existe",
        descripcion:
          "Forma clásica y correcta (importante comparar con `!== -1`).",
        code: `const texto = "Hola JavaScript";
if (texto.indexOf("JavaScript") !== -1) {
  console.log("Encontrado");
}`,
      },
    ],
    errores: [
      {
        texto: "**Pensar que devuelve `true` o `false`:** devuelve un número.",
        code: `"Hola".indexOf("H"); // 0  (no true)
"Hola".indexOf("x"); // -1 (no false)`,
      },
      {
        texto:
          "**Confundir `0` con `false`:** el error más clásico de JavaScript. `0` es *falsy*, así que un `if (resultado)` fallará si la coincidencia está en la posición 0.",
        code: `// ❌ Bug clásico
const resultado = "Hola".indexOf("H");
if (resultado) {
  console.log("Encontrado"); // ❌ NO se ejecuta (0 es falsy)
}

// ✅ Forma correcta
if (resultado !== -1) {
  console.log("Encontrado"); // ✅
}`,
      },
      {
        texto:
          "**Pensar que devuelve la última aparición:** para eso existe `lastIndexOf()`.",
        code: `"banana".indexOf("a");     // 1
"banana".lastIndexOf("a"); // 5`,
      },
      {
        texto:
          "**Confundir `indexOf()` de String con el de Array:** ambos existen, pero trabajan sobre estructuras diferentes.",
        code: `"Hola".indexOf("H");             // String → busca texto
["Hola","Mundo"].indexOf("Mundo"); // Array  → busca elemento`,
      },
    ],
    casos: [
      "Buscar palabras dentro de textos.",
      "Validar contenido de una cadena.",
      "Encontrar posiciones para luego usar `substring()` / `slice()`.",
      "Procesar texto.",
      "Detectar extensiones o partes de una URL.",
      "Buscar caracteres específicos.",
      "Encontrar una segunda o tercera coincidencia utilizando `posicionInicial`.",
      {
        texto: "**Detectar extensión de un archivo:**",
        code: `const archivo = "documento.pdf";
const posicion = archivo.indexOf(".");
console.log(posicion); // 9`,
      },
    ],
    relacion: [
      "**`String.prototype.lastIndexOf()`:** busca la **última** aparición.",
      "**`String.prototype.includes()`:** devuelve `true`/`false` en lugar de la posición.",
      "**`String.prototype.startsWith()`:** comprueba si comienza con un patrón.",
      "**`String.prototype.endsWith()`:** comprueba si termina con un patrón.",
      "**`String.prototype.search()`:** variante que acepta expresiones regulares.",
      "**`Array.prototype.indexOf()`:** versión para arreglos.",
    ],
    analogia:
      "Imagina una fila de casilleros numerados: `0 H`, `1 o`, `2 l`, `3 a`, `4 (espacio)`, `5 M`... Le preguntas a `indexOf()`: *«¿Dónde está la primera `M`?»* Y responde: `5`. Si no encuentra el elemento: `-1`. Por eso puedes recordar: **`indexOf()` = «dame el índice»**.",
    fuente:
      "MDN Web Docs - String.prototype.indexOf() | Especificación ECMAScript (ECMA-262)",
    notasPersonales: [
      "**Regla de oro:** si solo necesitas saber **si existe**, usa `includes()`. Si necesitas la **posición**, usa `indexOf()`.",
      '**Nunca** hagas `if (texto.indexOf("x"))`. **Siempre** `if (texto.indexOf("x") !== -1)`.',
      "Para búsquedas case-insensitive: `texto.toLowerCase().indexOf(busqueda.toLowerCase())`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'JavaScript'.indexOf('S')?",
        ["'S'", "4", "true", "undefined"],
        1,
      ],
      [
        "¿Qué devuelve 'Hola mundo'.indexOf('Python')?",
        ["undefined", "null", "-1", "0"],
        2,
      ],
      [
        "¿Por qué if (texto.indexOf('x')) puede fallar?",
        [
          "Porque devuelve strings",
          "Porque 0 es falsy y -1 es truthy",
          "Porque devuelve true/false",
          "Porque necesita un callback",
        ],
        1,
      ],
      ["¿Qué devuelve 'banana'.indexOf('a', 2)?", ["1", "2", "3", "5"], 2],
      [
        "¿Cuál es la forma correcta de comprobar existencia con indexOf?",
        [
          "if (resultado)",
          "if (resultado !== -1)",
          "if (resultado === 0)",
          "if (resultado === true)",
        ],
        1,
      ],
      [
        "¿Qué método busca la última aparición?",
        ["indexOf()", "lastIndexOf()", "search()", "includes()"],
        1,
      ],
      [
        "¿Qué método usar si solo quieres saber si existe (booleano)?",
        ["indexOf()", "includes()", "lastIndexOf()", "search()"],
        1,
      ],
      ["¿Qué devuelve 'banana'.indexOf('a')?", ["1", "3", "5", "0"], 0],
    ]),
  },

  /* ============================ search() ============================ */
  search: {
    id: "search",
    titulo: "String.prototype.search()",
    simulador: "string",
    definicion: [
      "Método de los strings en JavaScript que **busca la primera coincidencia** de una expresión regular dentro de una cadena de texto y devuelve la **posición (índice)** donde se encuentra.",
    ],
    queEs: [
      "Es un método nativo de JavaScript que permite encontrar la ubicación de un patrón definido por una **expresión regular** dentro de un string.",
      "A diferencia de `match()`, **no devuelve el texto encontrado**, sino su **posición numérica**.",
      "Es la versión «avanzada» de `indexOf()` que acepta expresiones regulares.",
      "La flag `g` (global) **no tiene efecto**: `search()` siempre devuelve la **primera** coincidencia.",
    ],
    paraQueSirve: [
      "**Encontrar la posición** de un patrón en un texto.",
      "**Verificar si existe** un patrón (aunque para eso es más eficiente `test()`).",
      "**Obtener el índice** para luego usar `substring()` o `slice()`.",
      "**Buscar patrones complejos** cuando solo necesitas la ubicación, no el texto.",
      "**Validar posiciones** de caracteres especiales.",
    ],
    comoFunciona: [
      "Toma una expresión regular como argumento (o un string, que se convierte automáticamente a `RegExp`).",
      "Aplica el patrón al string y devuelve el **índice del primer carácter** de la primera coincidencia.",
      "Si encuentra coincidencia: devuelve un **número** (el índice).",
      "Si **no encuentra**: devuelve **`-1`**.",
      "Ignora la propiedad `lastIndex` de la RegExp: **siempre comienza desde el inicio**.",
    ],
    sintaxis: [
      {
        code: `str.search(regexp);`,
      },
    ],
    nota: "**`regexp`:** expresión regular a buscar (si se pasa un string se convierte a `RegExp`). **Retorno:** un `number` — índice de la primera coincidencia, o `-1` si no existe.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Búsqueda básica con expresión regular",
        code: `const texto = "Hola mundo, hoy es 17 de agosto";
const posicion = texto.search(/mundo/);

console.log(posicion); // 5  (posición donde comienza "mundo")`,
      },
      {
        titulo: "Ejemplo 2: Búsqueda con patrón complejo (dígitos)",
        code: `const posicionNumero = texto.search(/\\d+/);
console.log(posicionNumero); // 19  (posición del "17")`,
      },
      {
        titulo: "Ejemplo 3: Con string literal (se convierte a RegExp)",
        code: `const posicionLiteral = "JavaScript es genial".search("es");
console.log(posicionLiteral); // 11`,
      },
      {
        titulo: "Ejemplo 4: Sin coincidencias",
        code: `const sinCoincidencia = "Hola mundo".search(/xyz/);
console.log(sinCoincidencia); // -1`,
      },
      {
        titulo: "Ejemplo 5: Búsqueda sin distinguir mayúsculas/minúsculas",
        code: `const posicionInsensible = "JavaScript".search(/javascript/i);
console.log(posicionInsensible); // 0  (la flag i hace case-insensitive)`,
      },
      {
        titulo: "Ejemplo 6: Con caracteres especiales (protocolo de URL)",
        code: `const url = "https://ejemplo.com/pagina";
const posicionProtocolo = url.search(/^https?:\\/\\//);

console.log(posicionProtocolo); // 0  (el protocolo está al inicio)`,
      },
    ],
    errores: [
      {
        texto:
          "**Confundir con `indexOf()`:** `search()` acepta `RegExp`, mientras que `indexOf()` solo texto literal. Pero cuidado: los caracteres especiales de regex tienen significado.",
        code: `// ❌ Si necesitas buscar el punto literal
"a.b.c".search(".");    // → 0  (porque "." en RegExp significa "cualquier carácter")

// ✅ Escapar el punto
"a.b.c".search(/\\./);   // → 1  (busca punto literal)`,
      },
      {
        texto:
          "**Esperar que devuelva todas las posiciones:** `search()` **solo devuelve la primera**.",
        code: `"aaa".search(/a/g); // → 0  (solo la primera, la flag g se ignora)`,
      },
      {
        texto:
          "**Usarlo para saber si existe un patrón cuando solo necesitas true/false:**",
        code: `// ❌ Menos eficiente
if (texto.search(/patron/) !== -1) { ... }

// ✅ Más idiomático
if (/patron/.test(texto)) { ... }`,
      },
      {
        texto: "**No escapar caracteres especiales** en búsquedas dinámicas:",
        code: `const buscar = "a.b";
// ❌ Interpretará "a" + cualquier carácter + "b"
"a1b".search(buscar); // → 0

// ✅ Escapar caracteres especiales
"a1b".search(buscar.replace(/[.*+?^\${}()|[\]\\]/g, "\\\\$&")); // → -1`,
      },
    ],
    casos: [
      {
        texto: "**Encontrar posición para luego extraer subcadena:**",
        code: `const texto = "Usuario: juan.perez, Edad: 30";
const inicio = texto.search(/Usuario:/);
const fin = texto.search(/,/);
const usuario = texto.substring(inicio + 8, fin).trim(); // "juan.perez"`,
      },
      {
        texto: "**Validar formato al inicio del string:**",
        code: `const email = "usuario@dominio.com";
const posArroba = email.search(/@/);
if (posArroba > 0 && posArroba < email.length - 1) {
  console.log("Email válido");
}`,
      },
      {
        texto: "**Detectar tipo de contenido en un archivo:**",
        code: `const archivo = "foto.jpg";
const extension = archivo.search(/\\.(jpg|png|gif)$/);
if (extension !== -1) console.log("Es una imagen");`,
      },
      "**Buscar posición de palabras clave.**",
      "**Encontrar URLs en texto.**",
    ],
    relacion: [
      "**`match()`:** devuelve el **texto** encontrado (o array con coincidencias), no la posición.",
      "**`indexOf()`:** similar pero solo acepta texto literal, no `RegExp`. Es más rápido para búsquedas simples.",
      "**`includes()`:** devuelve `true`/`false`, no posición.",
      "**`RegExp.prototype.test()`:** devuelve `true`/`false` de forma más directa.",
      "**`RegExp.prototype.exec()`:** devuelve información detallada de la coincidencia.",
      "**`matchAll()`:** devuelve todas las coincidencias con toda su información.",
      "**`startsWith()` / `endsWith()`:** verifican posición concreta.",
    ],
    analogia:
      "Imagina que `search()` es un **detective que solo te dice el número de página** donde aparece algo, sin decirte qué hay escrito. Es como cuando buscas una palabra en un libro y el buscador te dice: *«Aparece por primera vez en la página 42»*, pero no te muestra el texto. `search()` es el «GPS» de los strings: no te dice qué hay en el destino, solo **dónde está** la primera aparición.",
    fuente:
      "MDN Web Docs - String.prototype.search() | Especificación ECMAScript (ECMA-262)",
    notasPersonales: [
      "`search()` es menos usado que `indexOf()` porque la mayoría de las veces que necesitas RegExp también necesitas el texto encontrado (ahí gana `match()`).",
      "Para búsquedas de **texto literal simple**, `indexOf()` es **más rápido** que `search()`.",
      "La flag `g` en la RegExp **no tiene efecto** en `search()`: siempre devuelve la primera coincidencia.",
      "Para verificar existencia sin importar la posición, es mejor usar `RegExp.test()`.",
      "`search()` **ignora** la propiedad `lastIndex` de la RegExp: siempre comienza desde el inicio.",
      "Combinar `search()` con `substring()` es un patrón común para extraer partes de un texto.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'Hola mundo'.search(/mundo/)?",
        ["'mundo'", "5", "true", "undefined"],
        1,
      ],
      [
        "¿Qué devuelve 'Hola mundo'.search(/xyz/)?",
        ["null", "-1", "0", "undefined"],
        1,
      ],
      [
        "¿Qué tipo de argumento acepta search()?",
        [
          "Solo strings",
          "Solo RegExp",
          "RegExp o string (que se convierte a RegExp)",
          "Solo números",
        ],
        2,
      ],
      [
        "¿Cuál es la diferencia clave entre search() e indexOf()?",
        [
          "search acepta RegExp; indexOf solo string literal",
          "Son idénticos",
          "indexOf acepta RegExp",
          "search modifica la cadena",
        ],
        0,
      ],
      [
        "¿Qué devuelve 'JavaScript'.search(/javascript/i)?",
        ["-1", "0", "Un error", "undefined"],
        1,
      ],
      [
        "¿La flag g en search() afecta el resultado?",
        [
          "Sí, devuelve todas",
          "No, siempre devuelve la primera",
          "Devuelve un array",
          "Lanza error",
        ],
        1,
      ],
      ["¿Qué devuelve 'a.b.c'.search(/\\./)?", ["0", "1", "2", "-1"], 1],
      [
        "¿Qué método es más eficiente para saber si un patrón existe (true/false)?",
        ["search()", "RegExp.test()", "indexOf()", "match()"],
        1,
      ],
    ]),
  },

  /* ============================ match() ============================ */
  match: {
    id: "match",
    titulo: "String.prototype.match()",
    simulador: "string",
    definicion: [
      "Método de los strings en JavaScript que **busca coincidencias** de una expresión regular dentro de una cadena de texto y devuelve los resultados como un array.",
    ],
    queEs: [
      "Es un método nativo de JavaScript que **permite encontrar todas las ocurrencias (o la primera) de un patrón** definido por una expresión regular dentro de un string.",
      "Es la forma más potente y flexible de buscar texto en cadenas porque aprovecha toda la capacidad de las **expresiones regulares (RegExp)**.",
      "Su comportamiento **cambia radicalmente** según la flag `g`:",
      "- **Sin `/g`** → array con la **primera** coincidencia + `index`, `input` y **grupos de captura**.",
      "- **Con `/g`** → array con **solo los textos** de **todas** las coincidencias.",
    ],
    paraQueSirve: [
      "**Extraer información** de un texto (emails, URLs, fechas).",
      "**Validar formatos** de datos.",
      "**Realizar búsquedas avanzadas** con patrones complejos.",
      "**Obtener grupos de captura** de una coincidencia.",
      "**Contar ocurrencias** de un patrón en un texto.",
    ],
    comoFunciona: [
      "Toma una expresión regular como argumento (o un string, que se convierte con `new RegExp`).",
      "**Sin flag `g`:** devuelve un array con la **primera** coincidencia completa, más propiedades `index`, `input` y los **grupos de captura** si existen.",
      "**Con flag `g`:** devuelve un array con **todas** las coincidencias como strings simples (sin info extra).",
      "Si **no encuentra coincidencias**, devuelve **`null`** (¡no un array vacío!).",
    ],
    sintaxis: [
      {
        code: `str.match(regexp);`,
      },
    ],
    nota: "**`regexp`:** expresión regular a buscar (obligatorio). **Retorno:** `Array` o `null` según el caso. **Sin `g`:** array con la primera coincidencia + `index`, `input`, `groups`. **Con `g`:** array con todas las coincidencias (solo strings). **Sin coincidencias:** `null`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Sin flag 'g' - primera coincidencia",
        code: `const texto = "Hola 123, tengo 456 y también 789";

const resultado = texto.match(/\\d+/);
console.log(resultado);
// ['123', index: 5, input: 'Hola 123, tengo 456 y también 789', groups: undefined]`,
      },
      {
        titulo: "Ejemplo 2: Con flag 'g' - todas las coincidencias",
        code: `const texto = "Hola 123, tengo 456 y también 789";

const resultado = texto.match(/\\d+/g);
console.log(resultado);
// ['123', '456', '789']`,
      },
      {
        titulo: "Ejemplo 3: Con grupos de captura (sin /g)",
        code: `const email = "Mi correo es juan@email.com y otro es ana@empresa.org";

const resultado = email.match(/(\\w+)@(\\w+)\\.(\\w+)/);
console.log(resultado);
// [
//   'juan@email.com',   // coincidencia completa
//   'juan',             // grupo 1
//   'email',            // grupo 2
//   'com',              // grupo 3
//   index: 13,
//   input: 'Mi correo es juan@email.com y otro es ana@empresa.org',
//   groups: undefined
// ]`,
      },
      {
        titulo: "Ejemplo 4: Sin coincidencias (devuelve null, no [])",
        code: `const resultado = "Hola mundo".match(/xyz/);
console.log(resultado); // null`,
      },
    ],
    errores: [
      {
        texto:
          "**Confundir `null` con `[]`:** si no hay coincidencias, devuelve `null`. Acceder a `.length` o iterar sobre `null` lanza `TypeError`.",
        code: `const resultado = "abc".match(/x/);

// ❌ Error: Cannot read property 'length' of null
if (resultado.length) { ... }

// ✅ Comprobar null primero
if (resultado !== null) { ... }`,
      },
      {
        texto: "**Olvidar la flag `g`** cuando quieres todas las ocurrencias:",
        code: `"aaa".match(/a/);  // ['a'] (solo una)
"aaa".match(/a/g); // ['a', 'a', 'a'] (todas)`,
      },
      {
        texto:
          "**Usar `match()` con strings literales** cuando necesitas patrones complejos:",
        code: `// ❌ Funciona pero es limitado
"Hola mundo".match("mundo");

// ✅ Para búsquedas simples, usa includes() o indexOf()
"Hola mundo".includes("mundo");`,
      },
      {
        texto: "**No escapar caracteres especiales** en RegExp dinámicas:",
        code: `const palabra = "a.b";
// ❌ Interpreta '.' como "cualquier carácter"
"a.b".match(palabra);

// ✅ Escapar
"a.b".match(palabra.replace(/[.*+?^\${}()|[\\\]\\\\]/g, "\\\\$&"));`,
      },
    ],
    casos: [
      {
        texto: "**🔍 Extraer emails de un texto:**",
        code: `const texto = "Contacta a pedro@gmail.com o a maria@hotmail.com";
const emails = texto.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g);
// → ['pedro@gmail.com', 'maria@hotmail.com']`,
      },
      {
        texto: "**📊 Extraer precios de un texto:**",
        code: `const factura = "Total: $45.99, IVA: $8.50, Subtotal: $37.49";
const precios = factura.match(/\\$\\d+\\.\\d{2}/g);
// → ['$45.99', '$8.50', '$37.49']`,
      },
      {
        texto: "**🗂️ Validar formato de fecha:**",
        code: `const fecha = "2026-08-17";
const valida = fecha.match(/^\\d{4}-\\d{2}-\\d{2}$/);
// → ['2026-08-17', index: 0, input: '2026-08-17', ...]`,
      },
      {
        texto: "**🎯 Extraer nombres de variables en código:**",
        code: `const codigo = "const nombre = 'Juan'; let edad = 30;";
const variables = codigo.match(/\\b(?:const|let|var)\\s+(\\w+)/g);
// → ['const nombre', 'let edad']`,
      },
    ],
    relacion: [
      "**`search()`:** devuelve solo la **posición** de la coincidencia, no el texto.",
      "**`matchAll()`:** similar a `match()` con `g`, pero devuelve un **iterador** con más info (grupos, índice).",
      "**`RegExp.prototype.exec()`:** método de `RegExp`, similar a `match()` pero se puede ejecutar repetidamente.",
      "**`RegExp.prototype.test()`:** solo devuelve `true`/`false`.",
      "**`replace()` / `replaceAll()`:** busca y **reemplaza** coincidencias.",
      "**`split()`:** divide el string usando una expresión regular.",
      "**`includes()`:** búsqueda simple de texto literal.",
      "**`indexOf()`:** devuelve la posición de un texto literal.",
    ],
    analogia:
      "Imagina que tienes un **libro enorme** (el string) y **`match()`** es un **detective con una lupa y una lista de patrones**. **Sin la flag `g`:** el detective busca **solo la primera** ocurrencia, te la muestra y te dice en qué página está. **Con la flag `g`:** el detective encuentra **todas** las ocurrencias, las subraya y te da una lista de todas. Los **grupos de captura** serían como **marcadores de colores**: en lugar de solo subrayar la frase completa, también marca partes específicas (ej. el nombre de usuario, el dominio, etc.).",
    fuente:
      "MDN Web Docs - String.prototype.match() | ECMAScript Specification",
    notasPersonales: [
      "`match()` es **más lento** que `includes()` o `indexOf()` para búsquedas simples por el *overhead* de RegExp.",
      "Al usarlo con `g`, **pierdes acceso** a `index` y grupos de captura. Para eso usa `matchAll()`.",
      "**Siempre verifica** que el resultado **no sea `null`** antes de acceder a propiedades.",
      "Combinado con `RegExp` y grupos con nombres (`(?<nombre>...)`) se vuelve muy poderoso.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'Hola 123 tengo 456'.match(/\\d+/)?",
        ["['123']", "['123', '456']", "'123'", "123"],
        0,
      ],
      [
        "¿Qué devuelve 'Hola 123 tengo 456'.match(/\\d+/g)?",
        ["['123']", "['123', '456']", "'123456'", "123"],
        1,
      ],
      [
        "¿Qué devuelve 'Hola mundo'.match(/xyz/)?",
        ["[]", "null", "undefined", "-1"],
        1,
      ],
      [
        "¿Cuál es la diferencia principal entre match() sin g y con g?",
        [
          "Sin g: primera coincidencia con index/input/grupos; con g: todas solo como strings",
          "Son idénticos",
          "Con g: primera; sin g: todas",
          "Sin g: null",
        ],
        0,
      ],
      [
        "¿Qué propiedad del array permite saber la posición de la coincidencia sin g?",
        ["input", "index", "position", "offset"],
        1,
      ],
      [
        "¿Por qué es peligroso acceder a .length del resultado sin comprobar null?",
        [
          "No es peligroso",
          "Porque si no hay coincidencias es null y lanza TypeError",
          "Porque devuelve undefined",
          "Porque devuelve []",
        ],
        1,
      ],
      [
        "¿Qué método devuelve todas las coincidencias como iterador con más info?",
        ["match()", "matchAll()", "search()", "exec()"],
        1,
      ],
      [
        "¿Qué método usar para saber si un patrón existe sin necesitar el texto?",
        ["match()", "test()", "search()", "matchAll()"],
        1,
      ],
    ]),
  },

  /* ============================ matchAll() ============================ */
  matchall: {
    id: "matchall",
    titulo: "String.prototype.matchAll()",
    simulador: "string",
    definicion: [
      "Método de `String` que busca **todas las coincidencias** de una expresión regular dentro de una cadena y devuelve un **iterador** con los resultados de cada coincidencia.",
    ],
    queEs: [
      "`matchAll()` permite encontrar **todas las coincidencias** de un patrón y obtener **información detallada** de cada una.",
      "La diferencia importante con `match()` es que **`matchAll()` no devuelve directamente un array**: devuelve un **iterador** (`Iterator`) que puedes recorrer.",
      "Conserva **toda** la información de cada coincidencia: `index`, `input`, `groups` y **grupos de captura**.",
      "**Requiere** que la expresión regular use la flag `g` (global). Sin ella, lanza `TypeError`.",
    ],
    paraQueSirve: [
      "Encontrar **todas** las coincidencias de una expresión regular.",
      "Obtener **información detallada** de cada coincidencia.",
      "Obtener los **grupos capturados** de una expresión regular.",
      "Obtener la **posición** (`index`) de cada coincidencia.",
      "Procesar resultados mediante `for...of`, `[...iterador]`, `Array.from()`, etc.",
    ],
    comoFunciona: [
      "Se llama sobre un string con una **RegExp con flag `g`**.",
      "Devuelve un **iterador** que produce objetos `RegExpMatchArray`, uno por cada coincidencia.",
      "Cada objeto tiene: `[0]` (coincidencia completa), `[1..n]` (grupos), `index` (posición), `input` (string original), `groups` (grupos nombrados).",
      "**No se puede reutilizar el iterador** después de agotado: hay que crear uno nuevo con otra llamada a `matchAll()`.",
      "Convertirlo a array con `[...iter]` o `Array.from(iter)`.",
    ],
    sintaxis: [
      {
        code: `cadena.matchAll(expresionRegular);`,
      },
    ],
    nota: "**`regexp`:** expresión regular a buscar. **DEBE tener flag `g`** o lanza `TypeError`. **Retorno:** un `Iterator` que produce objetos `RegExpMatchArray`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Encontrar todos los números",
        code: `const texto = "Tengo 15 manzanas y 20 naranjas";
const resultados = texto.matchAll(/\\d+/g);

for (const resultado of resultados) {
  console.log(resultado[0]);
}
// 15
// 20`,
      },
      {
        titulo: "Ejemplo 2: Convertir los resultados en un Array",
        code: `const texto = "Tengo 15 manzanas y 20 naranjas";

const resultados = Array.from(texto.matchAll(/\\d+/g));
console.log(resultados);
// o con spread:
const resultados2 = [...texto.matchAll(/\\d+/g)];`,
      },
      {
        titulo: "Ejemplo 3: Obtener la posición de cada coincidencia",
        code: `const texto = "Hola mundo, hola JavaScript";

for (const resultado of texto.matchAll(/hola/gi)) {
  console.log(resultado[0]);
  console.log(resultado.index);
}
// "Hola"  → 0
// "hola"  → 12`,
      },
      {
        titulo: "Ejemplo 4: Obtener grupos capturados",
        descripcion: "Aquí `matchAll()` se vuelve especialmente útil.",
        code: `const texto = "Juan: 20, Pedro: 25";
const regex = /(\\w+):\\s(\\d+)/g;

for (const resultado of texto.matchAll(regex)) {
  console.log(resultado[1]); // nombre
  console.log(resultado[2]); // edad
}
// "Juan", "20"
// "Pedro", "25"`,
      },
      {
        titulo: "Ejemplo 5: Grupos nombrados",
        code: `const texto = "Juan: 20, Pedro: 25";
const regex = /(?<nombre>\\w+):\\s(?<edad>\\d+)/g;

for (const resultado of texto.matchAll(regex)) {
  console.log(resultado.groups.nombre);
  console.log(resultado.groups.edad);
}
// "Juan", "20"
// "Pedro", "25"`,
      },
    ],
    errores: [
      {
        texto:
          "**Olvidar la bandera `g`:** `matchAll()` **lanza `TypeError`** si la RegExp no es global.",
        code: `// ❌ TypeError
"hola hola".matchAll(/hola/);

// ✅ Correcto
"hola hola".matchAll(/hola/g);`,
      },
      {
        texto: "**Pensar que devuelve un Array:** devuelve un **iterador**.",
        code: `const resultados = "a b c".matchAll(/\\w/g);
console.log(resultados); // No es un array directo

// ✅ Convertirlo
const arr = [..."a b c".matchAll(/\\w/g)];`,
      },
      {
        texto:
          "**Confundir con `match()`:** aunque parecidos, su comportamiento difiere.",
        code: `match()    // → resultado de coincidencias (array o null)
matchAll() // → iterador de coincidencias detalladas`,
      },
      {
        texto:
          "**Reutilizar el iterador agotado:** hay que volver a llamar a `matchAll()`.",
        code: `const iter = "a a a".matchAll(/a/g);
console.log([...iter]); // ['a', 'a', 'a']
console.log([...iter]); // []  ← ¡ya se consumió!`,
      },
    ],
    casos: [
      "**Extraer números** de un texto.",
      "**Extraer información** mediante expresiones regulares.",
      "**Analizar textos estructurados.**",
      "**Extraer nombres, fechas, IDs, correos,** etc.",
      "**Procesar grupos capturados.**",
      "**Obtener la posición de cada coincidencia.**",
      "**Analizar grandes cantidades de texto** mediante iteración.",
      {
        texto: "**Ejemplo práctico: parsear usuarios de un texto**",
        code: `const texto = \`
usuario: Josue
usuario: Carlos
usuario: Ana
\`;
const regex = /usuario:\\s(\\w+)/g;

for (const resultado of texto.matchAll(regex)) {
  console.log(resultado[1]);
}
// "Josue", "Carlos", "Ana"`,
      },
    ],
    relacion: [
      "**`match()`:** devuelve el resultado de coincidencias (array o null).",
      "**`matchAll()`:** devuelve un iterador de coincidencias detalladas.",
      "**`search()`:** devuelve el índice de la primera coincidencia.",
      "**`replace()` / `replaceAll()`:** reemplazan coincidencias.",
      "**`RegExp`:** las expresiones regulares son la base de `matchAll()`.",
      "**`for...of` / `Array.from()` / spread:** formas de consumir el iterador.",
    ],
    analogia:
      "Imagina que tienes un documento de 500 páginas y buscas la palabra **«JavaScript»**. `match()` sería como decir: *«Dime las coincidencias»*. Mientras `matchAll()` sería como: *«Dame **cada coincidencia una por una**, junto con dónde apareció y los datos capturados alrededor de ella»*. Coincidencia 1 → posición + grupos. Coincidencia 2 → posición + grupos. Coincidencia 3 → posición + grupos...",
    fuente:
      "MDN Web Docs — String.prototype.matchAll() | Especificación ECMAScript (ES2020)",
    notasPersonales: [
      "**Palabras clave:** `String` · `RegExp` · `Iterator` · `g` · `match` · `capturing groups` · `index`.",
      "**Para memorizar:** `matchAll()` = obtener todas las coincidencias de una RegExp como un **iterador**, conservando información detallada de cada coincidencia.",
      "**La pareja conceptual:** `match()` → coincidencias; `matchAll()` → todas las coincidencias + información detallada.",
      "Introducido en **ES2020 (ES11)**, disponible en todos los entornos modernos.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve matchAll()?",
        [
          "Un array de strings",
          "Un iterador de coincidencias detalladas",
          "Un string",
          "null",
        ],
        1,
      ],
      [
        "¿Qué pasa si usas matchAll() con una RegExp SIN flag g?",
        [
          "Funciona normal",
          "Lanza TypeError",
          "Solo devuelve la primera",
          "Devuelve []",
        ],
        1,
      ],
      [
        "¿Cómo conviertes el iterador de matchAll() en un array?",
        [
          "iter.toArray()",
          "[...iter] o Array.from(iter)",
          "iter[0]",
          "iter.length",
        ],
        1,
      ],
      [
        "¿Qué información conserva matchAll() que match() con g pierde?",
        [
          "Nada, son iguales",
          "index, input y grupos de captura",
          "Solo el texto",
          "Solo la posición",
        ],
        1,
      ],
      [
        "¿Qué pasa si intentas recorrer el mismo iterador dos veces?",
        [
          "Devuelve lo mismo",
          "La segunda vez devuelve [] porque ya se agotó",
          "Lanza error",
          "Se reinicia automáticamente",
        ],
        1,
      ],
      [
        "¿Qué devuelve resultado.groups en matchAll()?",
        [
          "El texto completo",
          "Los grupos nombrados (si existen)",
          "El índice",
          "El array de coincidencias",
        ],
        1,
      ],
      [
        "¿Qué método usar si solo quieres las coincidencias como strings sin más info?",
        ["match() con g", "matchAll()", "search()", "test()"],
        0,
      ],
      [
        "¿En qué versión de ECMAScript se introdujo matchAll()?",
        ["ES5", "ES2015", "ES2020", "ES2023"],
        2,
      ],
    ]),
  },
  /* ============================ localeCompare() ============================ */
  localecompare: {
    id: "localecompare",
    titulo: "String.prototype.localeCompare()",
    simulador: "string",
    definicion: [
      "Es un método built-in de JavaScript que compara la cadena de texto actual con otra y devuelve un número que indica si la cadena original va **antes (-1), después (1) o en la misma posición (0)** dentro del orden alfabético según un idioma (*locale*) específico.",
    ],
    queEs: [
      "Es la forma estándar e internacionalizada de **ordenar textos correctamente** en JavaScript.",
      "A diferencia de los operadores habituales (`<`, `>`), respeta los caracteres especiales, acentos, diacríticos y reglas ortográficas propias de cada país/idioma (como la `ñ` en español o las vocales con tilde en francés/alemán).",
      "Pertenece a la familia de internacionalización de JavaScript (`Intl`).",
    ],
    paraQueSirve: [
      "**Ordenar listas alfabéticamente** mediante `.sort()` de forma regionalizada.",
      "Tratar caracteres especiales correctamente (ej. colocar la `ñ` después de la `n` en español).",
      "Ordenar strings ignorando acentos, mayúsculas o puntuación si se configuran sus opciones.",
      'Ordenar números escritos dentro de textos de forma lógica (ej. `"2"` antes que `"10"` en lugar de la ordenación lexicográfica clásica).',
    ],
    comoFunciona: [
      "Internamente consulta las reglas internacionales de clasificación Unicode (API `Intl.Collator`) según el idioma del navegador o el que le indiques explícitamente.",
      "Retorna un **número negativo** si el string va *antes* del string comparado.",
      "Retorna un **número positivo** si el string va *después*.",
      "Retorna `0` si ambos strings se consideran equivalentes en ese idioma.",
      "**Importante:** la especificación permite devolver cualquier entero negativo o positivo, no solo `-1` o `1`. Compara siempre con `< 0` o `> 0`.",
    ],
    sintaxis: [
      {
        code: `referenceStr.localeCompare(compareString);
referenceStr.localeCompare(compareString, locales);
referenceStr.localeCompare(compareString, locales, options);`,
      },
    ],
    nota: "**`compareString`:** la cadena contra la que vas a comparar. **`locales` (opcional):** código del idioma (ej. `'es'`, `'en'`, `'fr'`). Si se omite, usa el idioma configurado en el entorno. **`options` (opcional):** objeto con opciones como `sensitivity`, `numeric`, `ignorePunctuation`. **Retorno:** un `number` negativo, `0` o positivo.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Ordenación de un Array (el caso de uso ideal)",
        code: `const palabras = ["zona", "año", "manzana", "ñandú"];

// .sort() tradicional fallaría poniendo 'ñandú' al final
palabras.sort((a, b) => a.localeCompare(b, "es"));

console.log(palabras);
// Resultado correcto: ["año", "manzana", "ñandú", "zona"]`,
      },
      {
        titulo: "Ejemplo 2: Comparación numérica natural (numeric: true)",
        code: `const archivos = ["foto10.jpg", "foto2.jpg", "foto1.jpg"];

archivos.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

console.log(archivos);
// ["foto1.jpg", "foto2.jpg", "foto10.jpg"]`,
      },
      {
        titulo: "Ejemplo 3: Ignorar mayúsculas y acentos (sensitivity: 'base')",
        code: `console.log("canción".localeCompare("CANCION", "es", { sensitivity: "base" }));
// Devuelve 0 (se consideran equivalentes)`,
      },
      {
        titulo: "Ejemplo 4: El valor de retorno en la práctica",
        code: `console.log("a".localeCompare("b")); // -1 (a va antes que b)
console.log("b".localeCompare("a")); // 1  (b va después de a)
console.log("a".localeCompare("a")); // 0  (son iguales)`,
      },
    ],
    errores: [
      {
        texto:
          "**Retorno estricto de -1 o 1:** aunque la mayoría de navegadores devuelven `-1`, `1` o `0`, la especificación permite que devuelva cualquier entero negativo o positivo (ej. `-2` o `2`).",
        code: `// ❌ Puede fallar en algunos navegadores
if (a.localeCompare(b) === -1) { ... }

// ✅ Forma correcta
if (a.localeCompare(b) < 0) { ... }`,
      },
      {
        texto:
          "**Uso directo sin `.sort()` en listas grandes:** crear las opciones de `localeCompare` repetidamente en loops masivos puede restar rendimiento.",
        code: `// ❌ Crea un Intl.Collator nuevo en cada comparación
array.sort((a, b) => a.localeCompare(b, "es"));

// ✅ Reutilizar el collator
const collator = new Intl.Collator("es");
array.sort(collator.compare);`,
      },
      {
        texto:
          "**Depender del idioma por defecto:** si no pasas el parámetro `locales`, el resultado variará según el idioma de la computadora donde corra el código.",
        code: `// ❌ En una máquina en inglés, la "ñ" se ordena distinto
"ñ".localeCompare("n");

// ✅ Fijar el idioma
"ñ".localeCompare("n", "es");`,
      },
      {
        texto:
          "**Pensar que el resultado exacto es `-1`/`0`/`1`:** siempre compara con `< 0`, `=== 0`, `> 0`.",
        code: `// ✅ Forma robusta
const result = a.localeCompare(b);
if (result < 0)      { /* a va antes que b */ }
else if (result > 0) { /* a va después de b */ }
else                 { /* son equivalentes */ }`,
      },
    ],
    casos: [
      {
        texto:
          "**Tablas de datos (DataTables):** ordenar columnas alfabéticamente por nombres, países o apellidos.",
        code: `usuarios.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));`,
      },
      {
        texto:
          "**Buscadores/Autocompletados:** ordenar sugerencias respetando acentos y diacríticos locales.",
        code: `sugerencias.sort((a, b) => a.localeCompare(b, "es"));`,
      },
      {
        texto:
          "**Gestores de archivos:** ordenar carpetas y archivos con sufijos numéricos (`v1`, `v2`, `v10`).",
        code: `archivos.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));`,
      },
    ],
    relacion: [
      "**`Array.prototype.sort()`:** el método de arreglos con el que se suele combinar `localeCompare` para realizar ordenamientos.",
      "**`Intl.Collator`:** la API de internacionalización subyacente que utiliza `localeCompare()` por detrás para las reglas lingüísticas.",
      "**`String.prototype.toLocaleUpperCase()` / `toLocaleLowerCase()`:** también usan reglas de locale, pero para transformar texto, no para comparar.",
      "**Operadores `<`, `>`:** comparan por código Unicode, **no** por reglas de idioma.",
    ],
    analogia:
      "Es como llamar a un **traductor nativo** para que organice una biblioteca. En lugar de ordenar los libros usando solo el número binario/ASCII del carácter (como haría la computadora), el traductor aplica las reglas reales del diccionario del país correspondiente: la `ñ` después de la `n`, las tildes como si no existieran (si así se configura), etc.",
    fuente:
      "MDN Web Docs - String.prototype.localeCompare() | Especificación ECMAScript (ECMA-402 API de Internacionalización)",
    notasPersonales: [
      "**Siempre usar en la función de comparación de `.sort((a, b) => a.localeCompare(b))`** cuando se trabaje con interfaces en español para evitar el clásico fallo del orden de la `Ñ` y las vocales con tilde.",
      "**Nunca compares con `=== -1` o `=== 1`:** usa `< 0`, `> 0`, `=== 0`.",
      "**Para listas grandes,** reutiliza `new Intl.Collator(locale).compare` en lugar de llamar a `localeCompare` en cada iteración.",
      "**Opciones útiles:** `sensitivity` (`'base'`, `'accent'`, `'case'`, `'variant'`), `numeric: true` (ordena `\"2\"` antes que `\"10\"`), `ignorePunctuation: true`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'a'.localeCompare('b')?",
        ["-1 (o número negativo)", "1 (o número positivo)", "0", "true"],
        0,
      ],
      [
        "¿Qué devuelve 'b'.localeCompare('a')?",
        ["-1", "1 (o número positivo)", "0", "false"],
        1,
      ],
      [
        "¿Qué devuelve 'a'.localeCompare('a')?",
        ["-1", "1", "0", "undefined"],
        2,
      ],
      [
        "¿Para qué se usa principalmente localeCompare()?",
        [
          "Para buscar substrings",
          "Para ordenar cadenas respetando el idioma",
          "Para concatenar strings",
          "Para dividir strings",
        ],
        1,
      ],
      [
        "¿Qué compara 'ñ'.localeCompare('n', 'es') vs 'ñ'.localeCompare('n', 'en')?",
        [
          "Es lo mismo",
          "En español la ñ va después de la n; en inglés puede ser distinto",
          "Siempre lanza error",
          "Siempre devuelve 0",
        ],
        1,
      ],
      [
        "¿Qué opción permite ordenar 'foto2' antes que 'foto10'?",
        [
          "{ sensitivity: 'base' }",
          "{ numeric: true }",
          "{ ignorePunctuation: true }",
          "{ caseFirst: 'upper' }",
        ],
        1,
      ],
      [
        "¿Por qué es mejor comparar con < 0 o > 0 en lugar de === -1?",
        [
          "Porque localeCompare solo devuelve -1/1",
          "Porque la especificación permite cualquier entero negativo o positivo",
          "Porque los números no son iguales",
          "Porque así lo exige el estándar",
        ],
        1,
      ],
      [
        "¿Qué API usa internamente localeCompare()?",
        ["RegExp", "Intl.Collator", "JSON", "Math"],
        1,
      ],
    ]),
  },

  /* ============================ codePointAt() ============================ */
  codepointat: {
    id: "codepointat",
    titulo: "String.prototype.codePointAt()",
    simulador: "string",
    definicion: [
      "Método de `String` que devuelve el **valor Unicode (code point)** del carácter que **comienza** en una posición específica de la cadena.",
    ],
    queEs: [
      "Permite obtener el **código Unicode** de un carácter dado su índice.",
      "A diferencia de `charCodeAt()`, representa correctamente caracteres que ocupan **dos unidades UTF-16**, como muchos emojis.",
      "Su pareja natural es `String.fromCodePoint()` (hace el camino inverso).",
    ],
    paraQueSirve: [
      "Obtener el valor Unicode de un carácter.",
      "Trabajar con caracteres fuera del **Basic Multilingual Plane (BMP)**.",
      "Analizar emojis y otros caracteres con **pares sustitutos** (*surrogate pairs*).",
      "Convertir luego el número a carácter con `String.fromCodePoint()`.",
    ],
    comoFunciona: [
      "Recibe un **índice** (empieza en `0`).",
      "Busca la unidad de código UTF-16 que comienza en esa posición.",
      "Si es la primera mitad de un **par sustituto** y a continuación viene la segunda mitad, combina las dos unidades.",
      "Devuelve el valor como número. Si el índice está fuera de rango, devuelve `undefined`.",
      "**Importante:** JavaScript usa **UTF-16**: un emoji como `😀` tiene `length` 2, y `codePointAt(1)` devuelve solo la mitad baja.",
    ],
    sintaxis: [
      {
        code: `cadena.codePointAt(indice);`,
      },
    ],
    nota: "**Parámetro:** `indice` (número, base 0). **Retorno:** un `number` (el code point) o `undefined` si el índice no existe.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Una letra",
        code: `"A".codePointAt(0); // 65   (U+0041)
"a".codePointAt(0); // 97`,
      },
      {
        titulo: "Ejemplo 2: Un emoji",
        code: `"😀".codePointAt(0); // 128512  (U+1F600)`,
      },
      {
        titulo: "Ejemplo 3: Varios caracteres",
        code: `const texto = "ABC";
console.log(texto.codePointAt(0)); // 65
console.log(texto.codePointAt(1)); // 66
console.log(texto.codePointAt(2)); // 67`,
      },
      {
        titulo: "Ejemplo 4: length e índices con un emoji",
        code: `const emoji = "😀";
console.log(emoji.length);          // 2
console.log(emoji.codePointAt(0));  // 128512
console.log(emoji.codePointAt(1));  // 56832 (solo la mitad baja)`,
      },
      {
        titulo: "Ejemplo 5: Ida y vuelta con fromCodePoint()",
        code: `const codigo = "😀".codePointAt(0);
console.log(codigo);                       // 128512
console.log(String.fromCodePoint(codigo)); // "😀"`,
      },
    ],
    errores: [
      {
        texto: "**Confundirlo con `charCodeAt()`:**",
        code: `"😀".charCodeAt(0);  // 55357  (solo una unidad UTF-16)
"😀".codePointAt(0); // 128512 (code point completo)`,
      },
      {
        texto:
          '**Confundir `length` con la cantidad de caracteres:** `"😀".length` es `2`, aunque visualmente sea uno.',
      },
      {
        texto: "**Usar un índice inexistente:**",
        code: `"Hola".codePointAt(20); // undefined`,
      },
      {
        texto:
          "**Recorrer un emoji por índices:** para recorrer caracteres completos usa `for...of`.",
        code: `for (const caracter of "A😀B") {
  console.log(caracter, caracter.codePointAt(0));
}`,
      },
    ],
    casos: [
      "Procesamiento de Unicode y texto internacional.",
      "Análisis de emojis.",
      "Conversión entre caracteres y valores Unicode.",
      "Algoritmos que necesitan trabajar con code points.",
    ],
    relacion: [
      "**`fromCodePoint()`:** code point → carácter (la pareja).",
      "**`charCodeAt()`:** carácter → unidad UTF-16.",
      "**`fromCharCode()`:** unidades UTF-16 → cadena.",
      {
        texto: "**Resumen de parejas:**",
        code: `codePointAt()  ↔ fromCodePoint()   // code points Unicode
charCodeAt()   ↔ fromCharCode()    // unidades UTF-16`,
      },
    ],
    analogia:
      "Imagina que cada carácter tiene un **DNI universal** 🌎. `codePointAt()` es decir: **«dime el DNI Unicode del carácter que está en esta posición»**. El DNI de `😀` es `128512`.",
    fuente: "MDN Web Docs | String.prototype.codePointAt()",
    notasPersonales: [
      "**Idea para recordar:** `codePointAt()` = *obtener el número Unicode de un carácter*. Su pareja: `fromCodePoint()` = *convertir un número Unicode en carácter*.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve 'A'.codePointAt(0)?",
        ["'A'", "65", "97", "undefined"],
        1,
      ],
      [
        "¿Qué devuelve '😀'.codePointAt(0)?",
        ["55357", "128512", "2", "56832"],
        1,
      ],
      [
        "¿Qué devuelve 'Hola'.codePointAt(20)?",
        ["NaN", "0", "undefined", "Un error"],
        2,
      ],
      ["¿Cuál es el length de '😀'?", ["1", "2", "4", "0"], 1],
      [
        "¿Qué diferencia hay con charCodeAt() en un emoji?",
        [
          "Ninguna",
          "codePointAt devuelve el code point completo; charCodeAt solo una unidad UTF-16",
          "charCodeAt es más moderno",
          "codePointAt devuelve un string",
        ],
        1,
      ],
      [
        "¿Qué método hace el camino inverso (número → carácter)?",
        ["charAt()", "fromCodePoint()", "at()", "toString()"],
        1,
      ],
      [
        "¿Qué devuelve '😀'.codePointAt(1)?",
        ["128512", "undefined", "56832", "55357"],
        2,
      ],
      [
        "¿Cómo recorres caracteres completos (sin partir emojis)?",
        ["for (i...length)", "for...of", "while con length", "forEach"],
        1,
      ],
    ]),
  },

  /* ============================ normalize() ============================ */
  normalize: {
    id: "normalize",
    titulo: "String.prototype.normalize()",
    simulador: "string",
    definicion: [
      "`String.prototype.normalize()` es un método de JavaScript que devuelve la **forma normalizada Unicode** de una cadena de texto, asegurando que caracteres con representaciones múltiples (como letras acentuadas) se conviertan a una forma canónica consistente.",
    ],
    queEs: [
      "En Unicode, muchos caracteres pueden representarse de **múltiples maneras**.",
      'Por ejemplo: `"é"` puede representarse como un solo carácter (`U+00E9`, LATIN SMALL LETTER E WITH ACUTE), o como dos caracteres: `"e"` (`U+0065`) + `"◌́"` (`U+0301`, COMBINING ACUTE ACCENT).',
      "`normalize()` resuelve este problema transformando todas las representaciones a una **forma estándar**, facilitando comparaciones, búsquedas y procesamiento de texto.",
    ],
    paraQueSirve: [
      "Comparar cadenas que contienen caracteres acentuados o diacríticos.",
      "Normalizar entradas de usuario para **búsquedas y filtros**.",
      "Preparar texto para **ordenamiento** y **colaciones**.",
      "**Indexar** y **buscar** en bases de datos con consistencia.",
      "Procesar texto en **aplicaciones internacionales** y multilingües.",
      "**Tokenizar** y **analizar** cadenas correctamente.",
      "Generar **URLs amigables** (slugs) desde texto acentuado.",
      "Implementar **comparaciones insensibles a acentos**.",
    ],
    comoFunciona: [
      "El método recorre la cadena y convierte cada carácter a una **forma de normalización Unicode**.",
      "Existen cuatro formas de normalización:",
    ],
    comoFuncionaSinNumerar: true,
    sintaxis: [
      {
        code: `str.normalize();
str.normalize(form);`,
      },
    ],
    nota: '**`form` (opcional):** `"NFC"` (por defecto), `"NFD"`, `"NFKC"`, `"NFKD"`. **Retorno:** un nuevo string normalizado según la forma especificada. Lanza `RangeError` si la forma no es válida.',
    ejemplos: [
      {
        titulo: "Ejemplo 1: Normalización básica",
        code: `const str1 = '\\u00E9';      // "é" (U+00E9)
const str2 = 'e\\u0301';     // "e" + combinación de acento

console.log(str1 === str2);                       // false (son diferentes bytes)
console.log(str1.normalize() === str2.normalize()); // true (NFC)`,
      },
      {
        titulo: "Ejemplo 2: Comparación de strings acentuados",
        code: `function compareAccents(text1, text2) {
  return text1.normalize('NFC') === text2.normalize('NFC');
}

console.log(compareAccents('café', 'cafe\\u0301')); // true
console.log(compareAccents('ñ', 'n\\u0303'));       // true`,
      },
      {
        titulo: "Ejemplo 3: Eliminar diacríticos (quitar tildes)",
        code: `function removeDiacritics(text) {
  return text.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
}

console.log(removeDiacritics('café'));    // "cafe"
console.log(removeDiacritics('españa'));  // "espana"`,
      },
      {
        titulo: "Ejemplo 4: Diferentes formas de normalización",
        code: `const text = 'ﬁ café e\\u0301';

console.log('Original:', text);
console.log('NFC:',  text.normalize('NFC'));  // "ﬁ café é"
console.log('NFD:',  text.normalize('NFD'));  // "ﬁ cafe ́ e ́"
console.log('NFKC:', text.normalize('NFKC')); // "fi café é"
console.log('NFKD:', text.normalize('NFKD')); // "fi cafe ́ e ́"`,
      },
      {
        titulo: "Ejemplo 5: Búsqueda insensible a acentos",
        code: `function filterText(text, search) {
  const normalized = text.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
  const normalizedSearch = search.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
  return normalized.includes(normalizedSearch);
}

const users = ['José', 'Jose', 'María', 'Maria'];
const results = users.filter(user => filterText(user, 'Jose'));
console.log(results); // ["José", "Jose"]`,
      },
      {
        titulo: "Ejemplo 6: Generar slugs desde texto acentuado",
        code: `function generateSlug(text) {
  return text
    .normalize('NFD')
    .replace(/[\\u0300-\\u036f]/g, '')  // Eliminar diacríticos
    .replace(/[^a-zA-Z0-9\\s-]/g, '')   // Eliminar caracteres especiales
    .trim()
    .replace(/\\s+/g, '-')
    .toLowerCase();
}

console.log(generateSlug('Hola, ¿cómo estás?')); // "hola-como-estas"
console.log(generateSlug('¡España y café!'));    // "espana-y-cafe"`,
      },
    ],
    errores: [
      {
        texto:
          "**Asumir que strings visualmente iguales son iguales en memoria:**",
        code: `// ❌ MAL
'café' === 'cafe\\u0301' // false

// ✅ BIEN
'café'.normalize() === 'cafe\\u0301'.normalize() // true`,
      },
      "**No usar normalización en comparaciones de bases de datos:** puede causar duplicados o resultados faltantes.",
      {
        texto: "**Usar la forma incorrecta para el caso de uso:**",
        code: `NFC   // la más común (compuesta)
NFKC  // para compatibilidad y búsquedas más flexibles
NFD   // para descomponer y eliminar diacríticos`,
      },
      "**No considerar el rendimiento:** normalizar strings largos puede ser costoso. Cachea el resultado si lo usas repetidamente.",
    ],
    casos: [
      {
        texto: "**Búsqueda insensible a acentos en aplicaciones:**",
        code: `class SearchEngine {
  constructor(data, searchField) {
    this.data = data;
    this.searchField = searchField;
    this.index = this.buildIndex();
  }
  buildIndex() {
    return this.data.map(item => ({
      ...item,
      normalized: this.normalizeText(item[this.searchField])
    }));
  }
  normalizeText(text) {
    return text.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '').toLowerCase();
  }
  search(query) {
    const normalizedQuery = this.normalizeText(query);
    return this.index.filter(item =>
      item.normalized.includes(normalizedQuery)
    );
  }
}`,
      },
      {
        texto: "**Generación de URLs amigables (slugs):**",
        code: `function createSlug(title) {
  return title
    .normalize('NFKD')
    .replace(/[\\u0300-\\u036f]/g, '')
    .replace(/[^\\w\\s-]/g, '')
    .trim()
    .replace(/\\s+/g, '-')
    .toLowerCase();
}`,
      },
      {
        texto: "**Comparación de nombres en bases de datos:**",
        code: `function compareNames(name1, name2) {
  const normalized1 = name1.normalize('NFC').toLowerCase();
  const normalized2 = name2.normalize('NFC').toLowerCase();
  return normalized1 === normalized2;
}

compareNames('José', 'Jose\\u0301'); // true`,
      },
      {
        texto: "**Procesamiento de texto multilingüe:**",
        code: `function processMultilingualText(text) {
  return text
    .normalize('NFKC')
    .replace(/[^\\p{L}\\p{N}\\s]/gu, '')
    .toLowerCase();
}`,
      },
      {
        texto: "**Formularios con validación:**",
        code: `function validateName(name) {
  const normalized = name.normalize('NFC');
  return /^[\\p{L}\\s]+$/u.test(normalized);
}`,
      },
    ],
    relacion: [
      "**Unicode:** estándar que define la representación de caracteres en todo el mundo.",
      "**Diacríticos:** acentos, tildes y otros signos sobre caracteres.",
      "**`toLocaleLowerCase()` / `toLocaleUpperCase()`:** localización de mayúsculas/minúsculas.",
      "**`localeCompare()`:** comparación de strings con localización.",
      "**`String.fromCharCode()` / `charCodeAt()`:** trabajo con códigos de caracteres.",
      "**`Intl.Collator`:** comparación de strings más avanzada y localizada.",
    ],
    analogia:
      'Imagina que escribir `"é"` es como tener dos formas de escribir la misma palabra en un pizarrón: opción 1, escribes la letra `"é"` con un solo trazo (carácter compuesto); opción 2, escribes la letra `"e"` y luego agregas el acento encima (carácter base + combinación). `normalize()` es como un **corrector** que siempre usa una forma consistente, ya sea la opción 1 o la 2, dependiendo de lo que necesites. Así, cuando busques la palabra, siempre encontrarás coincidencias sin importar cómo fue escrita originalmente.',
    fuente:
      "MDN Web Docs – normalize() | Unicode Normalization Forms | ECMAScript Specification – String.prototype.normalize | JavaScript.info – String normalization",
    notasPersonales: [
      "**Regla clave:** si comparas strings con acentos, **siempre** normaliza ambos lados antes de comparar.",
      "**Para quitar tildes:** `text.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')`. Esta es la receta estándar.",
      "**NFC** para almacenar y comparar (es la forma más común). **NFD** para procesar (descomponer y eliminar diacríticos). **NFKC/NFKD** para compatibilidad (ligaduras, formas especiales).",
    ],
    quiz: Q([
      [
        "¿Qué hace normalize()?",
        [
          "Convierte a mayúsculas",
          "Devuelve la forma normalizada Unicode de un string",
          "Elimina espacios",
          "Ordena caracteres",
        ],
        1,
      ],
      [
        "¿Qué forma es la predeterminada si no se pasa argumento?",
        ["NFC", "NFD", "NFKC", "NFKD"],
        0,
      ],
      [
        "¿Qué devuelve 'café' === 'cafe\\u0301'?",
        ["true", "false (son diferentes bytes)", "undefined", "Un error"],
        1,
      ],
      [
        "¿Qué devuelve 'café'.normalize() === 'cafe\\u0301'.normalize()?",
        ["true (NFC los iguala)", "false", "Un error", "undefined"],
        0,
      ],
      [
        "¿Qué forma se usa para eliminar diacríticos (tildes)?",
        ["NFC", "NFD", "NFKC", "NFKD"],
        1,
      ],
      [
        "¿Qué diferencia hay entre NFC y NFD?",
        [
          "NFC compone (é = 1 carácter), NFD descompone (é = e + ́)",
          "Son idénticas",
          "NFC es para números",
          "NFD compone",
        ],
        0,
      ],
      [
        "¿Qué forma convierte 'ﬁ' en 'fi' (ligaduras)?",
        ["NFC", "NFD", "NFKC o NFKD (compatibilidad)", "Ninguna"],
        2,
      ],
      [
        "¿Qué pasa si pasas una forma inválida a normalize()?",
        [
          "Devuelve el original",
          "Lanza RangeError",
          "Lanza TypeError",
          "Devuelve null",
        ],
        1,
      ],
    ]),
  },
};
