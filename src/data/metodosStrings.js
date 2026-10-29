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
};
