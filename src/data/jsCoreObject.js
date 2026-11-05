/* Generado desde Apuntes/ — JS Core.
   Regenerar con: node scripts/generate-js-core.mjs */

export const JS_CORE_OBJECT = {
  "id": "js-object",
  "label": "Object",
  "icon": "📦",
  "titulo": "Object: creación, clonación y control",
  "descripcion": "Métodos estáticos y del prototipo para crear, copiar, enumerar, congelar y proteger objetos.",
  "simulador": "object",
  "grupos": [
    {
      "seccion": "Comparación y existencia",
      "metodos": [
        {
          "id": "js-object-is",
          "nombre": "Object.is()",
          "firma": "Object.is(valor1, valor2)",
          "icon": "⚖️",
        },
        {
          "id": "js-object-hasown",
          "nombre": "Object.hasOwn()`",
          "firma": "Object.hasOwn(obj, prop)",
          "icon": "✅",
        },
        {
          "id": "js-hasownproperty",
          "nombre": "hasOwnProperty()",
          "firma": "obj.hasOwnProperty(prop)",
          "icon": "✅",
        },
      ],
    },
    {
      "seccion": "Creación y clonación",
      "metodos": [
        {
          "id": "js-object-assign",
          "nombre": "Object.assign",
          "firma": "Object.assign(destino, ...fuentes)",
          "icon": "📋",
        },
        {
          "id": "js-object-create",
          "nombre": "Object.create()**",
          "firma": "Object.create(proto, descriptores)",
          "icon": "🆕",
        },
        {
          "id": "js-new-object",
          "nombre": "new Object()",
          "firma": "new Object(valor)",
          "icon": "🆕",
        },
      ],
    },
    {
      "seccion": "Enumeración",
      "metodos": [
        {
          "id": "js-object-keys",
          "nombre": "Object.keys()",
          "firma": "Object.keys(obj)",
          "icon": "🔑",
        },
        {
          "id": "js-object-values",
          "nombre": "Object.values()",
          "firma": "Object.values(obj)",
          "icon": "📦",
        },
        {
          "id": "js-object-entries",
          "nombre": "Object.entries()",
          "firma": "Object.entries(obj)",
          "icon": "📑",
        },
        {
          "id": "js-object-fromentries",
          "nombre": "Object.fromEntries()",
          "firma": "Object.fromEntries(iterable)",
          "icon": "🔄",
        },
        {
          "id": "js-object-groupby",
          "nombre": "Object.groupBy()",
          "firma": "Object.groupBy(iterable, fn)",
          "icon": "🗂️",
        },
      ],
    },
    {
      "seccion": "Bloqueo de objetos",
      "metodos": [
        {
          "id": "js-object-freeze",
          "nombre": "Object.freeze()",
          "firma": "Object.freeze(obj)",
          "icon": "🧊",
        },
        {
          "id": "js-object-seal",
          "nombre": "Object.seal()",
          "firma": "Object.seal(obj)",
          "icon": "🔒",
        },
        {
          "id": "js-object-preventextensions",
          "nombre": "Object.preventExtensions",
          "firma": "Object.preventExtensions(obj)",
          "icon": "🛡️",
        },
        {
          "id": "js-object-isfrozen",
          "nombre": "Object.isFrozen()`",
          "firma": "Object.isFrozen(obj)",
          "icon": "❄️",
        },
        {
          "id": "js-object-issealed",
          "nombre": "Object.isSealed",
          "firma": "Object.isSealed(obj)",
          "icon": "🛡️",
        },
        {
          "id": "js-object-isextensible",
          "nombre": "Object.isExtensible",
          "firma": "Object.isExtensible(obj)",
          "icon": "🪟",
        },
      ],
    },
    {
      "seccion": "Descriptores y prototipos",
      "metodos": [
        {
          "id": "js-object-defineproperty",
          "nombre": "Object.defineProperty()",
          "firma": "Object.defineProperty(obj, prop, desc)",
          "icon": "⚙️",
        },
        {
          "id": "js-object-defineproperties",
          "nombre": "Object.defineProperties",
          "firma": "Object.defineProperties(obj, descs)",
          "icon": "⚙️",
        },
        {
          "id": "js-object-getownpropertydescriptor",
          "nombre": "Object.getOwnPropertyDescriptor`",
          "firma": "Object.getOwnPropertyDescriptor(obj, prop)",
          "icon": "🔍",
        },
        {
          "id": "js-object-getprototypeof",
          "nombre": "Object.getPrototypeOf",
          "firma": "Object.getPrototypeOf(obj)",
          "icon": "🧬",
        },
        {
          "id": "js-object-setprototypeof",
          "nombre": "Object.setPrototypeOf",
          "firma": "Object.setPrototypeOf(obj, proto)",
          "icon": "🔗",
        },
        {
          "id": "js-object-tostring",
          "nombre": "Object.prototype.toString()",
          "firma": "obj.toString()",
          "icon": "🪞",
        },
        {
          "id": "js-object-valueof",
          "nombre": "Object.prototype.valueOf()",
          "firma": "obj.valueOf()",
          "icon": "🔓",
        },
      ],
    },
  ],
};

export const JS_CORE_OBJECT_DOCS = {
  "js-object-is": {
    "id": "js-object-is",
    "titulo": "Object.is()",
    "icon": "⚖️",
    "categoria": "Object",
    "firma": "Object.is(valor1, valor2)",
    "simulador": "object",
    "definicion": [
      "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de los operadores tradicionales de comparación.",
    ],
    "queEs": [
      "Es un **método de comparación de ultra precisión** del objeto global `Object`.",
      "Evalúa la igualdad entre dos elementos de forma casi idéntica al operador de triple igual o igualdad estricta (`===`), pero con dos excepciones cruciales de diseño: el manejo de los valores `NaN` y los signos del número cero (`-0` y `+0`).",
    ],
    "paraQueSirve": [
      "**Comparaciones matemáticas perfectas:** Validar de forma certera si una operación matemática resultó en `NaN` sin tener que recurrir a funciones auxiliares.",
      "**Algoritmos de renderizado eficientes:** Determinar si un dato realmente ha cambiado de estado. Es la herramienta por excelencia que usan internamente librerías como React (en su algoritmo de reconciliación) para saber si un componente debe volver a dibujarse en pantalla.",
      "**Control estricto de flujos:** Distinguir entre el cero positivo (`+0`) y el cero negativo (`0`) en cálculos de física, geometría o finanzas avanzadas.",
    ],
    "comoFunciona": [
      "Al ejecutar `Object.is(valor1, valor2)`, el método devuelve un booleano (`true` o `false`).",
      "Dos valores son el mismo valor si se cumple una de las siguientes condiciones:",
      "Ambos son `undefined` o ambos son `null`.",
      "Ambos son `true` o ambos son `false`.",
      "Ambos son cadenas de texto (*strings*) con la misma longitud y los mismos caracteres en el mismo orden.",
      "Ambos apuntan al mismo objeto en memoria (misma referencia).",
      "Ambos son números y cumplen con ser: El mismo número entero o decimal. Ambos `NaN`. Ambos `+0` o ambos `0`.",
    ],
    "sintaxis": [
      {
        "code": "Object.is(value1, value2);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Las dos grandes diferencias frente al operador `===`",
        "code": "// ❌ Caso 1: El misterio de NaN en JavaScript tradicional\nconsole.log(NaN === NaN);         // false (Un sinsentido histórico de JS)\nconsole.log(Object.is(NaN, NaN)); // true  (¡Correcto!)\n\n// ❌ Caso 2: El signo del cero\nconsole.log(-0 === +0);           // true  (Los trata como iguales)\nconsole.log(Object.is(-0, +0));   // false (Detecta con precisión que tienen signos distintos)",
      },
      {
        "titulo": "2. Comportamiento estándar (Idéntico a `===`)",
        "code": "// Comparación de tipos primitivos comunes\nconsole.log(Object.is(\"hola\", \"hola\")); // true\nconsole.log(Object.is(5, \"5\"));         // false (Evalúa estrictamente el tipo de dato)\n\n// Comparación de objetos por referencia\nconst objA = { id: 1 };\nconst objB = { id: 1 };\nconsole.log(Object.is(objA, objB));     // false (Tienen los mismos datos, pero son cajas de memoria distintas)\nconsole.log(Object.is(objA, objA));     // true  (Es exactamente la misma referencia)",
      },
    ],
    "errores": [
      "**Creer que compara el interior de los objetos (Igualdad Profunda):** Al igual que `===`, `Object.is({}, {})` dará `false`.",
      "No sirve para comparar si dos objetos o arreglos independientes tienen las mismas propiedades internas; para eso necesitas una función de comparación profunda (*Deep Equal*).",
      "**Reemplazar masivamente a **`===`** sin necesidad:** No se recomienda cambiar todos tus `===` del código por `Object.is()`.",
      "El operador `===` sigue siendo la opción estándar por legibilidad y velocidad nativa en el 99% de los casos (como comparar strings, booleanos o números comunes).",
      "Usa `Object.is()` explícitamente cuando dependas de la lógica de `NaN` o `0`.",
    ],
    "casos": [
      "**Arquitectura de Gestión de Estados (Hooks):** Herramientas como los Hooks de React (`useState`) utilizan `Object.is` tras bambalinas para verificar si el nuevo estado que le pasas a una variable es idéntico al anterior. Si `Object.is(estadoViejo, estadoNuevo)` da `true`, React optimiza recursos y cancela el re-renderizado de la pantalla de forma segura.",
      "**Validación de cálculos de división por cero:** En matemáticas de computación, dividir un número positivo por `0` da `Infinity`, y un número positivo por `0` da `Infinity`. Usar `Object.is` te ayuda a predecir y validar estos flujos antes de que corrompan tus reportes numéricos.",
    ],
    "relacion": [
      "**Operador **`==`** (Igualdad débil):** Compara valores forzando la conversión de tipos (ej. `5 == '5'` es `true`). Altamente desaconsejado en la industria.",
      "**Operador **`===`** (Igualdad estricta):** Compara valores y tipos sin conversión, fallando únicamente en las dos anomalías matemáticas (`NaN` y cero firmado).",
      "`Number.isNaN()`**:** El método estándar para verificar si una variable específica contiene un valor que no es un número válido.",
    ],
    "analogia": "Imagínate que eres un inspector de aduanas muy estricto que revisa **pasaportes**. El operador `==` es como un guardia perezoso que deja pasar a cualquiera si el nombre suena parecido. El operador `===` es un inspector excelente, pero tiene **dos pequeños puntos ciegos en su manual de reglas**: si ve a dos gemelos idénticos llamados \"NaN\", se confunde y dice que son personas distintas; y si ve dos monedas de cero centavos, ignora si una está limpia (`+`) o sucia (`-`). `Object.is()` es el equivalente exacto a **un escaner biométrico digital de última generación**: no tiene puntos ciegos, detecta de forma impecable a los gemelos \"NaN\" como el mismo error matemático, y nota de inmediato la mínima diferencia física entre el cero positivo y el cero negativo.",
    "fuente": "MDN Web Docs - Object.is()",
    "notasPersonales": [
      "💡 *Tip Pro:* Si necesitas implementar un polyfill casero o entender la lógica matemática pura detrás de este método, la especificación de ECMAScript define `Object.is` con una lógica fascinante en solo un par de líneas: Si ambos números son `0`, verifica si `1 / x === 1 / y` (lo cual diferencia `1 / 0 -> Infinity` de `1 / -0 -> -Infinity`). Y si ambos números son diferentes a sí mismos (`x !== x`), deduce inmediatamente que se trata de un `NaN`. ¡Un truco brillante de ingeniería de software!",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.is()?",
        "opciones": [
          "Object.assign(destino, ...fuentes)",
          "obj.hasOwnProperty(prop)",
          "Object.hasOwn(obj, prop)",
          "Object.is(valor1, valor2)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.is()?",
        "opciones": [
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Object.create() es un método estático de JavaScript que crea un nuevo objeto utilizando un objeto existente como prototipo del nuevo objeto…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.is()?",
        "opciones": [
          "Crear contenedores de datos: Inicializar un objeto vacío para añadirle propiedades de manera dinámica más adelante.",
          "Crear objetos con herencia prototípica personalizada.",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.is()?",
        "opciones": [
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Pensar que hace una copia profunda (deep copy) — Resultado: ¿Por qué? Porque Object.assign() solo copia la primera capa. Es una:…",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
        ],
        "correcta": 3,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-is-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "Comparaciones matemáticas perfectas",
              "descripcion": "Validar de forma certera si una operación matemática resultó en `NaN` sin tener que recurrir a funciones auxiliares.",
            },
            {
              "concepto": "Control estricto de flujos",
              "descripcion": "Distinguir entre el cero positivo (`+0`) y el cero negativo (`0`) en cálculos de física, geometría o finanzas avanzadas.",
            },
            {
              "concepto": "Operador `==` (Igualdad débil)",
              "descripcion": "Compara valores forzando la conversión de tipos (ej. `5 == '5'` es `true`). Altamente desaconsejado en la industria.",
            },
            {
              "concepto": "Operador `===` (Igualdad estricta)",
              "descripcion": "Compara valores y tipos sin conversión, fallando únicamente en las dos anomalías matemáticas (`NaN` y cero firmado).",
            },
            {
              "concepto": "`Number.isNaN()`",
              "descripcion": "El método estándar para verificar si una variable específica contiene un valor que no es un número válido.",
            },
            {
              "concepto": "Reemplazar masivamente a `===` sin necesidad",
              "descripcion": "No se recomienda cambiar todos tus `===` del código por `Object.is()`.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "Comparaciones matemáticas perfectas → Validar de forma certera si una operación matemática resultó en `NaN` sin tener que recurrir a funciones auxiliares. · Control estricto de flujos → Distinguir entre el cero positivo (`+0`) y el cero negativo (`0`) en cálculos de física, geometría o finanzas avanzadas. · Operador `==` (Igualdad débil) → Compara valores forzando la conversión de tipos (ej. `5 == '5'` es `true`). Altamente desaconsejado en la industria. · Operador `===` (Igualdad estricta) → Compara valores y tipos sin conversión, fallando únicamente en las dos anomalías matemáticas (`NaN` y cero firmado). · `Number.isNaN()` → El método estándar para verificar si una variable específica contiene un valor que no es un número válido. · Reemplazar masivamente a `===` sin necesidad → No se recomienda cambiar todos tus `===` del código por `Object.is()`.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Las dos grandes diferencias frente al operador `===`",
          "explicacion": "",
          "codigo": "// ❌ Caso 1: El misterio de NaN en JavaScript tradicional\nconsole.log(NaN === NaN);         // false (Un sinsentido histórico de JS)\nconsole.log(Object.is(NaN, NaN)); // true  (¡Correcto!)\n\n// ❌ Caso 2: El signo del cero\nconsole.log(-0 === +0);           // true  (Los trata como iguales)\nconsole.log(Object.is(-0, +0));   // false (Detecta con precisión que tienen signos distintos)",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Comportamiento estándar (Idéntico a `===`)",
          "explicacion": "",
          "codigo": "// Comparación de tipos primitivos comunes\nconsole.log(Object.is(\"hola\", \"hola\")); // true\nconsole.log(Object.is(5, \"5\"));         // false (Evalúa estrictamente el tipo de dato)\n\n// Comparación de objetos por referencia\nconst objA = { id: 1 };\nconst objB = { id: 1 };\nconsole.log(Object.is(objA, objB));     // false (Tienen los mismos datos, pero son cajas de memoria distintas)\nconsole.log(Object.is(objA, objA));     // true  (Es exactamente la misma referencia)",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-hasown": {
    "id": "js-object-hasown",
    "titulo": "Object.hasOwn()`",
    "icon": "✅",
    "categoria": "Object",
    "firma": "Object.hasOwn(obj, prop)",
    "simulador": "object",
    "definicion": [
      "`Object.hasOwn()`",
      "Es un **método estático de **`Object` que comprueba si un objeto posee una propiedad **propia** con un nombre o `Symbol` determinado.",
    ],
    "queEs": [
      "Es una forma moderna y segura de preguntar:",
      "**\"¿Esta propiedad pertenece directamente a este objeto?\"**",
      "Pero si la propiedad viene heredada desde el prototipo:",
      "`toString` existe, pero no es una propiedad propia de `persona`.",
    ],
    "paraQueSirve": [
      "Sirve para:",
      "🔍 Comprobar si una propiedad pertenece directamente a un objeto.",
      "🧬 Distinguir propiedades propias de propiedades heredadas.",
      "🛡️ Evitar problemas al trabajar con objetos que tienen prototipos personalizados.",
      "🧩 Trabajar con objetos dinámicamente.",
      "🔄 Validar propiedades antes de acceder a ellas.",
    ],
    "comoFunciona": [
      "Recibe dos argumentos:",
      "El proceso conceptual es:",
      "Ejemplo:",
      "La propiedad está directamente dentro de `usuario`.",
    ],
    "sintaxis": [
      {
        "code": "Object.hasOwn(obj,prop)",
      },
      {
        "caption": "Parámetros",
        "code": "Object.hasOwn(usuario,\"nombre\");",
      },
      {
        "caption": "Retorno",
        "code": "true  → la propiedad es propia del objeto\nfalse → la propiedad no es propia del objeto",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Propiedad propia",
        "code": "const persona= {\n    nombre:\"Josué\"\n};\nconsole.log(Object.hasOwn(persona,\"nombre\"));// true",
      },
      {
        "titulo": "2. Propiedad inexistente",
        "code": "const persona= {\n    nombre:\"Josué\"\n};\nconsole.log(Object.hasOwn(persona,\"edad\"));// false",
      },
      {
        "titulo": "3. Propiedad heredada",
        "code": "const persona= {};\nconsole.log(Object.hasOwn(persona,\"toString\"));// false\n\nconsole.log(persona.toString);// existe\n\npersona\n   │\n   └── [[Prototype]]\n          ↓\n     Object.prototype\n          │\n          └── toString\n\nObject.hasOwn(persona,\"toString\");// false",
      },
      {
        "titulo": "4. Diferencia con `in`",
        "descripcion": "Esta diferencia es **muy importante**:",
        "code": "const persona= {};\nconsole.log(\"toString\"inpersona);// true\n\nobjeto + cadena de prototipos\n\nObject.hasOwn(persona,\"toString\");// false\n\nobjeto\n\n\"prop\" in objeto\n       ↓\n¿Existe en el objeto O en su prototipo?\n\nObject.hasOwn(objeto, \"prop\")\n       ↓\n¿Existe directamente en el objeto?",
      },
      {
        "titulo": "5. Propiedades con `Symbol`",
        "descripcion": "También funciona con `Symbol`:",
        "code": "const id=Symbol(\"id\");\nconst usuario= {\n    [id]:123\n};\nconsole.log(Object.hasOwn(usuario,id));// true",
      },
    ],
    "errores": [
      {
        "texto": "1. Confundirlo con `in` — Pero: `in` → objeto + prototipo. `Object.hasOwn()` → solamente propiedades propias.",
        "code": "\"toString\"in {};// true\n\nObject.hasOwn({},\"toString\");// false",
      },
      {
        "texto": "2. Pensar que comprueba si la propiedad tiene un valor — Aunque el valor sea `undefined`, la propiedad **sí existe**. Esto es diferente de: que daría:",
        "code": "const usuario= {\n    nombre:undefined\n};\nconsole.log(Object.hasOwn(usuario,\"nombre\"));// true\n\nusuario.nombre!==undefined\n\nfalse",
      },
      {
        "texto": "3. Usar `hasOwnProperty()` sin considerar sus limitaciones — Tradicionalmente se utilizaba: Pero esto puede ser problemático si el objeto no tiene `hasOwnProperty` disponible o si una propiedad lo sobrescribe. Por ejemplo: En cambio: es una forma más directa y robusta.",
        "code": "obj.hasOwnProperty(\"nombre\");\n\nconst objeto= {\n    hasOwnProperty:\"Hola\"\n};\n\nObject.hasOwn(objeto,\"hasOwnProperty\");// true",
      },
    ],
    "casos": [
      "🔍 Comprobar propiedades de objetos.",
      "📦 Procesar datos recibidos dinámicamente.",
      "🔄 Recorrer objetos.",
      "🧩 Trabajar con objetos creados mediante `Object.create()`.",
      "🛡️ Validar estructuras de datos.",
      "🛠️ Desarrollo de librerías y utilidades.",
      "Un patrón frecuente:",
    ],
    "relacion": [
      "También se relaciona directamente con:",
      "`in`",
      "`hasOwnProperty()`",
      "`Object.prototype`",
      "`[[Prototype]]`",
      "Cadena de prototipos",
      "Propiedades propias",
      "Propiedades heredadas",
    ],
    "analogia": "Imagina una casa 🏠 y su familia. `Object.hasOwn()` pregunta: **\"¿Esta cosa está dentro de MI casa?\"** No pregunta si puedes acceder a ella desde algún lugar de la familia. Por eso: pero una propiedad heredada:",
    "fuente": "MDN Web Docs — `Object.hasOwn()`.",
    "notasPersonales": [
      "`Object.hasOwn()` permite comprobar de forma directa si una propiedad pertenece **directamente al objeto**, sin considerar la cadena de prototipos.",
      "**Idea clave:**",
      "🔥 **Regla mental:**",
      "`hasOwn()`** = \"¿Es MÍA esta propiedad?\"**",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.hasOwn()`?",
        "opciones": [
          "obj.hasOwnProperty(prop)",
          "Object.assign(destino, ...fuentes)",
          "Object.is(valor1, valor2)",
          "Object.hasOwn(obj, prop)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.hasOwn()`?",
        "opciones": [
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Es un método estático de Object que comprueba si un objeto posee una propiedad propia con un nombre o Symbol determinado.",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.hasOwn()`?",
        "opciones": [
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Crear objetos con herencia prototípica personalizada.",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Sirve para: 🔍 Comprobar si una propiedad pertenece directamente a un objeto.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.hasOwn()`?",
        "opciones": [
          "Pensar que hace una copia profunda (deep copy) — Resultado: ¿Por qué? Porque Object.assign() solo copia la primera capa. Es una:…",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
        ],
        "correcta": 3,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-hasown-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "1. Confundirlo con `in` — Pero",
              "descripcion": "`in` → objeto + prototipo. `Object.hasOwn()` → solamente propiedades propias.",
            },
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es una forma moderna y segura de preguntar:",
            },
            {
              "concepto": "¿Cómo funciona?",
              "descripcion": "Recibe dos argumentos:",
            },
            {
              "concepto": "Error común",
              "descripcion": "1. Confundirlo con `in` — Pero: `in` → objeto + prototipo. `Object.hasOwn()` → solamente propiedades propias.",
            },
            {
              "concepto": "Caso de uso",
              "descripcion": "🔍 Comprobar propiedades de objetos.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "1. Confundirlo con `in` — Pero → `in` → objeto + prototipo. `Object.hasOwn()` → solamente propiedades propias. · ¿Qué es? → Es una forma moderna y segura de preguntar: · ¿Cómo funciona? → Recibe dos argumentos: · Error común → 1. Confundirlo con `in` — Pero: `in` → objeto + prototipo. `Object.hasOwn()` → solamente propiedades propias. · Caso de uso → 🔍 Comprobar propiedades de objetos.",
        },
        {
          "id": "js-object-hasown-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "Es un __________ `Object` que comprueba si un objeto posee una propiedad propia con un nombre o `Symbol` determinado.",
          "opciones": [
            "método estático de",
            "directa y propia",
            "método estático del objeto global",
            "método estático",
          ],
          "correcto": "método estático de",
          "pista": "El término empieza por «m…».",
          "solucion": "método estático de: Es un método estático de `Object` que comprueba si un objeto posee una propiedad propia con un nombre o `Symbol` determinado.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Propiedad propia",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Josué\"\n};\nconsole.log(Object.hasOwn(persona,\"nombre\"));// true",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Propiedad inexistente",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Josué\"\n};\nconsole.log(Object.hasOwn(persona,\"edad\"));// false",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "3. Propiedad heredada",
          "explicacion": "",
          "codigo": "const persona= {};\nconsole.log(Object.hasOwn(persona,\"toString\"));// false\n\nconsole.log(persona.toString);// existe\n\npersona\n   │\n   └── [[Prototype]]\n          ↓\n     Object.prototype\n          │\n          └── toString\n\nObject.hasOwn(persona,\"toString\");// false",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "4. Diferencia con `in`",
          "explicacion": "Esta diferencia es **muy importante**:",
          "codigo": "const persona= {};\nconsole.log(\"toString\"inpersona);// true\n\nobjeto + cadena de prototipos\n\nObject.hasOwn(persona,\"toString\");// false\n\nobjeto\n\n\"prop\" in objeto\n       ↓\n¿Existe en el objeto O en su prototipo?\n\nObject.hasOwn(objeto, \"prop\")\n       ↓\n¿Existe directamente en el objeto?",
          "salida": "",
        },
        {
          "paso": 5,
          "titulo": "5. Propiedades con `Symbol`",
          "explicacion": "También funciona con `Symbol`:",
          "codigo": "const id=Symbol(\"id\");\nconst usuario= {\n    [id]:123\n};\nconsole.log(Object.hasOwn(usuario,id));// true",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-hasownproperty": {
    "id": "js-hasownproperty",
    "titulo": "hasOwnProperty()",
    "icon": "✅",
    "categoria": "Object",
    "firma": "obj.hasOwnProperty(prop)",
    "simulador": "object",
    "definicion": [
      "Es un método de instancia que devuelve un booleano (`true` o `false`) indicando si el objeto tiene la propiedad especificada como una propiedad **directa y propia**, en lugar de haberla heredado a través de la cadena de prototipos.",
    ],
    "queEs": [
      "Es un **método de verificación y seguridad estructural** heredado por casi todos los objetos en JavaScript a través de `Object.prototype`.",
      "Permite auditar el origen real de una propiedad dentro de la memoria del objeto.",
    ],
    "paraQueSirve": [
      "**Filtrar herencia:** Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones globales en el prototipo nativo.",
      "**Validación de datos seguros:** Verificar si un objeto de configuración o una respuesta JSON trae una propiedad obligatoria antes de intentar leerla.",
      "**Control en bucles antiguos:** Filtrar las llaves al usar un bucle `for...in` para procesar únicamente los datos reales del elemento.",
    ],
    "comoFunciona": [
      "Al ejecutar `miObjeto.hasOwnProperty('propiedad')`:",
      "El motor de JavaScript busca la llave directamente dentro de las propiedades del objeto en cuestión.",
      "Si la encuentra allí, devuelve `true`.",
      "Si no la encuentra, o si la propiedad existe pero pertenece a su prototipo superior (como `toString` o `valueOf`), devuelve `false`.",
    ],
    "sintaxis": [
      {
        "code": "miObjeto.hasOwnProperty(prop);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Diferencia entre propiedad propia y heredada",
        "code": "const usuario = {\n    nombre: \"Satoshi\"\n};\n\nconsole.log(usuario.hasOwnProperty(\"nombre\"));   // true  (Le pertenece directamente)\nconsole.log(usuario.hasOwnProperty(\"toString\")); // false (Existe en el usuario, pero es heredado del prototipo)",
      },
      {
        "titulo": "2. El clásico filtro en bucles `for...in`",
        "code": "// Si una librería externa modificara el prototipo global de forma peligrosa:\nObject.prototype.metodoIntruso = function(){};\n\nconst precios = { pan: 1.5, leche: 2.0 };\n\nfor (const producto in precios) {\n    // 🛡️ Filtramos para procesar solo lo propio\n    if (precios.hasOwnProperty(producto)) {\n        console.log(`${producto}: $${precios[producto]}`);\n    }\n}\n// Salida: sólo imprimirá 'pan' y 'leche'. Ignora 'metodoIntruso'.",
      },
    ],
    "errores": [
      "**Romperse en objetos limpios (Sin Prototipo):** Si creas un objeto puro usando `Object.create(null)`, este objeto no heredará de `Object.prototype`.",
      "Al intentar ejecutar `obj.hasOwnProperty('prop')` lanzará un error crítico: `TypeError: obj.hasOwnProperty is not a function`.",
      "**Propiedades sobreescritas:** Si por error un objeto define una propiedad llamada exactamente igual que el método (ej. `{ hasOwnProperty: false }`), el método nativo quedará oculto e inservible en esa instancia.",
    ],
    "casos": [
      "**Sanitización de payloads e inputs de formularios:** Verificar que los datos enviados por un usuario en un objeto JSON contengan las propiedades requeridas antes de guardarlos en una base de datos.",
      "**Código de librerías (Defensa extrema):** Los desarrolladores de librerías usan este método para proteger sus algoritmos de desarrolladores externos que suelen \"contaminar\" los prototipos nativos globales de JavaScript.",
    ],
    "relacion": [
      "**Operador **`in`**:** A diferencia de `hasOwnProperty()`, el operador `in` (ej. `\"toString\" in usuario`) devuelve `true` tanto para propiedades propias como para heredadas.",
      "`Object.hasOwn()`** (ES2022):** La alternativa moderna, robusta y recomendada. Es un método estático (`Object.hasOwn(obj, prop)`) que elimina de raíz los problemas con objetos `create(null)` o propiedades sobreescritas.",
    ],
    "analogia": "Imagínate que estás en tu casa y necesitas un **martillo**. Si tú **compraste el martillo y está guardado en tu caja de herramientas**, `hasOwnProperty('martillo')` es `true`. Ahora, imagínate que necesitas una **cortadora de césped**; tú no tienes una, pero tu **padre (tu prototipo) tiene una en su garaje** y te la presta siempre que la necesitas. Si usas el operador `in`, dirá que \"tienes acceso\" a la cortadora. Pero si ejecutas `hasOwnProperty('cortadora')`, la respuesta será un rotundo `false`: la herramienta es de la familia, no es de tu propiedad privada.",
    "fuente": "MDN Web Docs - Object.prototype.hasOwnProperty()",
    "notasPersonales": [
      "💡 *Tip Pro:* Si tienes que dar soporte a entornos antiguos y necesitas usar `hasOwnProperty` de forma 100% segura en objetos que sospechas que podrían venir sin prototipo, evita llamarlo desde la instancia. Usa el prototipo de forma directa mediante un préstamo de método: `Object.prototype.hasOwnProperty.call(miObjeto, 'propiedad')`. ¡Este truco jamás fallará, sin importar cómo se haya creado el objeto!",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de hasOwnProperty()?",
        "opciones": [
          "Object.hasOwn(obj, prop)",
          "Object.is(valor1, valor2)",
          "Object.assign(destino, ...fuentes)",
          "obj.hasOwnProperty(prop)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor hasOwnProperty()?",
        "opciones": [
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Object.create() es un método estático de JavaScript que crea un nuevo objeto utilizando un objeto existente como prototipo del nuevo objeto…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve hasOwnProperty()?",
        "opciones": [
          "Crear objetos con herencia prototípica personalizada.",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Crear contenedores de datos: Inicializar un objeto vacío para añadirle propiedades de manera dinámica más adelante.",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a hasOwnProperty()?",
        "opciones": [
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Pensar que hace una copia profunda (deep copy) — Resultado: ¿Por qué? Porque Object.assign() solo copia la primera capa. Es una:…",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
        ],
        "correcta": 3,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-hasownproperty-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "Filtrar herencia",
              "descripcion": "Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones globales en el prototipo nativo.",
            },
            {
              "concepto": "Validación de datos seguros",
              "descripcion": "Verificar si un objeto de configuración o una respuesta JSON trae una propiedad obligatoria antes de intentar leerla.",
            },
            {
              "concepto": "Control en bucles antiguos",
              "descripcion": "Filtrar las llaves al usar un bucle `for...in` para procesar únicamente los datos reales del elemento.",
            },
            {
              "concepto": "Operador `in`",
              "descripcion": "A diferencia de `hasOwnProperty()`, el operador `in` (ej. `\"toString\" in usuario`) devuelve `true` tanto para propiedades propias como para heredadas.",
            },
            {
              "concepto": "Sanitización de payloads e inputs de formularios",
              "descripcion": "Verificar que los datos enviados por un usuario en un objeto JSON contengan las propiedades requeridas antes de guardarlos en una base de datos.",
            },
            {
              "concepto": "Código de librerías (Defensa extrema)",
              "descripcion": "Los desarrolladores de librerías usan este método para proteger sus algoritmos de desarrolladores externos que suelen \"contaminar\" los prototipos nativos…",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "Filtrar herencia → Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones globales en el prototipo nativo. · Validación de datos seguros → Verificar si un objeto de configuración o una respuesta JSON trae una propiedad obligatoria antes de intentar leerla. · Control en bucles antiguos → Filtrar las llaves al usar un bucle `for...in` para procesar únicamente los datos reales del elemento. · Operador `in` → A diferencia de `hasOwnProperty()`, el operador `in` (ej. `\"toString\" in usuario`) devuelve `true` tanto para propiedades propias como para heredadas. · Sanitización de payloads e inputs de formularios → Verificar que los datos enviados por un usuario en un objeto JSON contengan las propiedades requeridas antes de guardarlos en una base de datos. · Código de librerías (Defensa extrema) → Los desarrolladores de librerías usan este método para proteger sus algoritmos de desarrolladores externos que suelen \"contaminar\" los prototipos nativos…",
        },
        {
          "id": "js-hasownproperty-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "Es un método de instancia que devuelve un booleano (`true` o `false`) indicando si el objeto tiene la propiedad especificada como una propiedad __________, en lugar de haberla heredado a través de la cadena de prototipos.",
          "opciones": [
            "directa y propia",
            "método estático del objeto global",
            "método estático",
            "método estático del objeto global",
          ],
          "correcto": "directa y propia",
          "pista": "El término empieza por «d…».",
          "solucion": "directa y propia: Es un método de instancia que devuelve un booleano (`true` o `false`) indicando si el objeto tiene la propiedad especificada como una propiedad directa y propia, en lugar de haberla heredado a través de la cadena de…",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Diferencia entre propiedad propia y heredada",
          "explicacion": "",
          "codigo": "const usuario = {\n    nombre: \"Satoshi\"\n};\n\nconsole.log(usuario.hasOwnProperty(\"nombre\"));   // true  (Le pertenece directamente)\nconsole.log(usuario.hasOwnProperty(\"toString\")); // false (Existe en el usuario, pero es heredado del prototipo)",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. El clásico filtro en bucles `for...in`",
          "explicacion": "",
          "codigo": "// Si una librería externa modificara el prototipo global de forma peligrosa:\nObject.prototype.metodoIntruso = function(){};\n\nconst precios = { pan: 1.5, leche: 2.0 };\n\nfor (const producto in precios) {\n    // 🛡️ Filtramos para procesar solo lo propio\n    if (precios.hasOwnProperty(producto)) {\n        console.log(`${producto}: $${precios[producto]}`);\n    }\n}\n// Salida: sólo imprimirá 'pan' y 'leche'. Ignora 'metodoIntruso'.",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-assign": {
    "id": "js-object-assign",
    "titulo": "Object.assign",
    "icon": "📋",
    "categoria": "Object",
    "firma": "Object.assign(destino, ...fuentes)",
    "simulador": "object-assign",
    "definicion": [
      "`Object.assign()` es un **método estático del objeto global **`Object` que permite **copiar propiedades de uno o varios objetos origen hacia un objeto destino**.",
      "Devuelve el objeto destino después de haber recibido las propiedades copiadas.",
    ],
    "queEs": [
      "Es un **método estático** de `Object`.",
      "**Forma parte del lenguaje JavaScript (ECMAScript)**, **no de una Web API**.",
      "Se utiliza principalmente para: Copiar objetos. Combinar objetos (*merge*). Actualizar propiedades existentes.",
      "Ejemplo:",
      "Resultado:",
    ],
    "paraQueSirve": [
      "Se utiliza para:",
      "Copiar propiedades de objetos.",
      "Fusionar configuraciones.",
      "Crear copias superficiales (*shallow copy*).",
      "Actualizar objetos existentes.",
      "Combinar datos provenientes de diferentes fuentes.",
    ],
    "comoFunciona": [
      "Recibe un **objeto destino**.",
      "Recibe uno o varios **objetos origen**.",
      "Copia las propiedades enumerables propias del origen.",
      "Si una propiedad ya existe, la reemplaza.",
      "Devuelve el objeto destino.",
      "Ejemplo:",
      "Proceso:",
      "Antes:",
      "Después:",
      "La propiedad `nombre` fue sobrescrita.",
    ],
    "sintaxis": [
      {
        "code": "Object.assign(objetivo, ...fuentes);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Copiar propiedades de un objeto",
        "code": "const usuario= {\n    nombre:\"Josué\",\n    edad:17\n};\nconst copia= Object.assign({},usuario);\nconsole.log(copia);\n\n{nombre:\"Josué\",edad:17\n}",
      },
      {
        "titulo": "Combinar objetos",
        "code": "const datosPersonales= {\n    nombre:\"Ana\"\n};\nconst datosTrabajo= {\n    profesion:\"Programadora\"\n};\nconst persona=Object.assign(\n    {},datosPersonales,datosTrabajo\n);\nconsole.log(persona);\n\n{nombre:\"Ana\",profesion:\"Programadora\"}",
      },
      {
        "titulo": "Sobrescribir propiedades",
        "code": "const usuario= {\n    nombre:\"Luis\",\n    edad:20\n};\nObject.assign(usuario, {\n    edad:25\n});\nconsole.log(usuario);\n\n{nombre:\"Luis\",edad:25}",
      },
      {
        "titulo": "Copiar varios objetos",
        "code": "const objeto=Object.assign(\n    {},\n    {a:1},\n    {b:2},\n    {c:3}\n);\nconsole.log(objeto);\n\n{a:1,b:2,c:3}",
      },
      {
        "titulo": "Usar múltiples fuentes",
        "code": "const configuracionBase= {\n    idioma:\"es\",\n    modo:\"claro\"\n};\nconst configuracionUsuario= {\n    modo:\"oscuro\"\n};\nconst config=Object.assign(\n    {},configuracionBase,configuracionUsuario\n);\nconsole.log(config);\n\n{idioma:\"es\",modo:\"oscuro\"}",
      },
    ],
    "errores": [
      {
        "texto": "❌ Pensar que hace una copia profunda (*deep copy*) — Resultado: ¿Por qué? Porque `Object.assign()` solo copia la primera capa. Es una: No:",
        "code": "const usuario= {\n    nombre:\"Ana\",\n    direccion: {\n        ciudad:\"Lima\"\n    }\n};\nconst copia=Object.assign({},usuario);\ncopia.direccion.ciudad=\"Cusco\";\nconsole.log(usuario.direccion.ciudad);\n\nCusco\n\nShallow Copy ✅\n\nDeep Copy ❌",
      },
      {
        "texto": "❌ Olvidar que modifica el primer objeto — Resultado: El objeto `a` fue cambiado.",
        "code": "const a= {\n    nombre:\"Luis\"\n};\nObject.assign(a, {\n    edad:20\n});\nconsole.log(a);\n\n{nombre:\"Luis\",edad:20\n}",
      },
      {
        "texto": "❌ Confundirlo con spread operator — También puedes hacer: Ambos hacen copia superficial:",
        "code": "const copia= {\n    ...usuario\n};\n\nObject.assign({},usuario);\n\n{\n    ...usuario\n}",
      },
      {
        "texto": "❌ No considerar propiedades repetidas — Resultado: La última propiedad gana.",
        "code": "Object.assign(\n    {},\n    {nombre:\"Ana\"},\n    {nombre:\"Luis\"}\n);\n\n{nombre:\"Luis\"\n}",
      },
    ],
    "casos": [
      "Crear configuraciones personalizadas.",
      "Combinar estados en aplicaciones.",
      "Actualizar objetos.",
      "Copiar datos antes de modificarlos.",
      "Trabajar con patrones de programación funcional.",
      "Ejemplo:",
    ],
    "relacion": [
      "`Object.keys()` → Obtiene claves del objeto",
      "`Object.values()` → Obtiene valores",
      "`Object.entries()` → Obtiene pares clave-valor",
      "`Object.fromEntries()` → Convierte entradas en objeto",
      "Spread operator (`...`) → Alternativa moderna",
      "Shallow copy → Copia solo el primer nivel",
      "Deep copy → Copia todos los niveles internos",
      "Comparación:",
    ],
    "analogia": "Imagina que tienes una carpeta 📁: **Carpeta A:** **Carpeta B:** `Object.assign()` toma la información de ambas carpetas y la coloca en una nueva: Pero si dos carpetas tienen la misma etiqueta: La última información reemplaza a la anterior.",
    "fuente": "**MDN Web Docs:** https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/assign **Especificación ECMAScript:** https://tc39.es/ecma262/#sec-object.assign",
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.assign?",
        "opciones": [
          "Object.hasOwn(obj, prop)",
          "Object.assign(destino, ...fuentes)",
          "Object.is(valor1, valor2)",
          "obj.hasOwnProperty(prop)",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.assign?",
        "opciones": [
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Object.create() es un método estático de JavaScript que crea un nuevo objeto utilizando un objeto existente como prototipo del nuevo objeto…",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.assign?",
        "opciones": [
          "Se utiliza para: Copiar propiedades de objetos.",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Crear objetos con herencia prototípica personalizada.",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.assign?",
        "opciones": [
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "Pensar que hace una copia profunda (deep copy) — Resultado: ¿Por qué? Porque Object.assign() solo copia la primera capa. Es una:…",
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
        ],
        "correcta": 1,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-assign-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "❌ Olvidar que modifica el primer objeto — Resultado",
              "descripcion": "El objeto `a` fue cambiado.",
            },
            {
              "concepto": "❌ Confundirlo con spread operator — También puedes hacer",
              "descripcion": "Ambos hacen copia superficial:",
            },
            {
              "concepto": "❌ No considerar propiedades repetidas — Resultado",
              "descripcion": "La última propiedad gana.",
            },
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es un método estático de `Object`.",
            },
            {
              "concepto": "¿Cómo funciona?",
              "descripcion": "Recibe un objeto destino.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "❌ Olvidar que modifica el primer objeto — Resultado → El objeto `a` fue cambiado. · ❌ Confundirlo con spread operator — También puedes hacer → Ambos hacen copia superficial: · ❌ No considerar propiedades repetidas — Resultado → La última propiedad gana. · ¿Qué es? → Es un método estático de `Object`. · ¿Cómo funciona? → Recibe un objeto destino.",
        },
        {
          "id": "js-object-assign-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "`Object.assign()` es un __________ `Object` que permite copiar propiedades de uno o varios objetos origen hacia un objeto destino.",
          "opciones": [
            "método estático del objeto global",
            "directa y propia",
            "método estático",
            "método",
          ],
          "correcto": "método estático del objeto global",
          "pista": "El término empieza por «m…».",
          "solucion": "método estático del objeto global: `Object.assign()` es un método estático del objeto global `Object` que permite copiar propiedades de uno o varios objetos origen hacia un objeto destino.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "Copiar propiedades de un objeto",
          "explicacion": "",
          "codigo": "const usuario= {\n    nombre:\"Josué\",\n    edad:17\n};\nconst copia= Object.assign({},usuario);\nconsole.log(copia);\n\n{nombre:\"Josué\",edad:17\n}",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "Combinar objetos",
          "explicacion": "",
          "codigo": "const datosPersonales= {\n    nombre:\"Ana\"\n};\nconst datosTrabajo= {\n    profesion:\"Programadora\"\n};\nconst persona=Object.assign(\n    {},datosPersonales,datosTrabajo\n);\nconsole.log(persona);\n\n{nombre:\"Ana\",profesion:\"Programadora\"}",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "Sobrescribir propiedades",
          "explicacion": "",
          "codigo": "const usuario= {\n    nombre:\"Luis\",\n    edad:20\n};\nObject.assign(usuario, {\n    edad:25\n});\nconsole.log(usuario);\n\n{nombre:\"Luis\",edad:25}",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "Copiar varios objetos",
          "explicacion": "",
          "codigo": "const objeto=Object.assign(\n    {},\n    {a:1},\n    {b:2},\n    {c:3}\n);\nconsole.log(objeto);\n\n{a:1,b:2,c:3}",
          "salida": "",
        },
        {
          "paso": 5,
          "titulo": "Usar múltiples fuentes",
          "explicacion": "",
          "codigo": "const configuracionBase= {\n    idioma:\"es\",\n    modo:\"claro\"\n};\nconst configuracionUsuario= {\n    modo:\"oscuro\"\n};\nconst config=Object.assign(\n    {},configuracionBase,configuracionUsuario\n);\nconsole.log(config);\n\n{idioma:\"es\",modo:\"oscuro\"}",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-create": {
    "id": "js-object-create",
    "titulo": "Object.create()**",
    "icon": "🆕",
    "categoria": "Object",
    "firma": "Object.create(proto, descriptores)",
    "simulador": "object",
    "definicion": [
      "`Object.create()` es un **método estático** de JavaScript que **crea un nuevo objeto** utilizando un objeto existente como **prototipo** del nuevo objeto creado.",
    ],
    "queEs": [
      "Es una función nativa de JavaScript (ES5, 2009) que permite crear objetos **especificando explícitamente su prototipo**.",
      "A diferencia de `new` o de los literales `{}`, aquí tú decides directamente **de quién hereda** el nuevo objeto.",
    ],
    "paraQueSirve": [
      "Crear objetos con **herencia prototípica** personalizada.",
      "Implementar **patrones de herencia** sin usar clases.",
      "Crear objetos **sin prototipo** (`Object.create(null)`).",
      "Definir propiedades con **descriptores** (writable, enumerable, configurable).",
      "Evitar el uso de `__proto__` (mala práctica).",
    ],
    "comoFunciona": [
      "Recibe un **primer argumento**: el objeto que será el **prototipo** (`[[Prototype]]`).",
      "Opcionalmente recibe un **segundo argumento**: un objeto con **descriptores de propiedades**.",
      "Devuelve un **nuevo objeto** cuyo prototipo es el indicado.",
      "Si el primer argumento es `null`, el objeto **no hereda nada** (ni siquiera de `Object.prototype`).",
    ],
    "sintaxis": [
      {
        "code": "Object.create(proto)\nObject.create(proto, propiedadesDescriptoras)",
      },
      {
        "caption": "**Descriptor válido:**",
        "code": "{\n  value: ...,\n  writable: true|false,\n  enumerable: true|false,\n  configurable: true|false,\n  get() {...},\n  set(v) {...}\n}",
      },
    ],
    "ejemplos": [
      {
        "titulo": "**🔹 Ejemplo 1: Herencia básica**",
        "code": "const animal = {\n  hablar() {\n    console.log(`${this.nombre} hace un sonido`);\n  }\n};\n\nconst perro = Object.create(animal);\nperro.nombre = \"Rex\";\nperro.hablar(); // \"Rex hace un sonido\"",
      },
      {
        "titulo": "**🔹 Ejemplo 2: Objeto sin prototipo**",
        "code": "const limpio = Object.create(null);\nconsole.log(limpio.toString); // undefined",
      },
      {
        "titulo": "**🔹 Ejemplo 3: Con descriptores**",
        "code": "const persona = Object.create(Object.prototype, {\n  nombre: {\n    value: \"Ana\",\n    writable: false,\n    enumerable: true\n  }\n});\nconsole.log(persona.nombre); // \"Ana\"\npersona.nombre = \"Luis\";      // ❌ no cambia (writable: false)",
      },
      {
        "titulo": "**🔹 Ejemplo 4: Herencia en cadena**",
        "code": "const A = { a: 1 };\nconst B = Object.create(A);\nconst C = Object.create(B);\nconsole.log(C.a); // 1 (heredado)",
      },
    ],
    "errores": [
      "`Object.create(undefined)` → ❌ TypeError: solo acepta objeto o `null`",
      "Confundir `proto` con propiedades → El primer argumento **no** son propiedades, es el **prototipo**",
      "Olvidar `enumerable: true` → Las propiedades no aparecen en `for...in` ni `Object.keys`",
      "Usar `Object.create` con clases → No copia métodos de instancia, solo enlaza prototipos",
      "Modificar el prototipo después → Afecta a **todos** los objetos que lo usan",
    ],
    "casos": [
      "✅ **Herencia prototípica** pura (sin clases).",
      "✅ Crear **objetos diccionario** sin métodos heredados → `Object.create(null)`.",
      "✅ Implementar **mixins** y composición.",
      "✅ Crear objetos con propiedades **de solo lectura** o **no enumerables**.",
      "✅ Polimorfismo basado en prototipos.",
      "✅ Evitar contaminar `Object.prototype`.",
    ],
    "relacion": [
      "`__proto__` → `Object.create(p)` es equivalente a `{ __proto__: p }` (pero más seguro)",
      "`Object.getPrototypeOf()` → Devuelve el prototipo creado con `Object.create`",
      "`new` → `new F()` también crea objetos con `F.prototype`, pero con más pasos",
      "`class` → Azúcar sintáctico sobre herencia prototípica",
      "`Object.assign()` → Copia propiedades; `Object.create` establece el prototipo",
      "`Object.setPrototypeOf()` → Cambia el prototipo **después** de creado",
    ],
    "analogia": "Imagina que vas a **fabricar un mueble nuevo**. `Object.create(muebleBase)` es como decir: *\"Hazme un mueble igual al modelo base, pero con mis propios detalles.\"* El **modelo base** = el prototipo (hereda forma, color, estructura). El **mueble nuevo** = tu objeto (puede añadir o modificar cosas). Y `Object.create(null)` sería un mueble **sin plano, sin modelo**: existe, pero no hereda nada.",
    "fuente": "📘 MDN Web Docs – Object.create() 📗 ECMAScript 2023 Language Specification – §20.1.2.2 📕 \"JavaScript: The Definitive Guide\" – David Flanagan 📙 \"You Don't Know JS: this & Object Prototypes\" – Kyle Simpson",
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.create()**?",
        "opciones": [
          "Object.create(proto, descriptores)",
          "obj.hasOwnProperty(prop)",
          "Object.hasOwn(obj, prop)",
          "Object.is(valor1, valor2)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.create()**?",
        "opciones": [
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Object.create() es un método estático de JavaScript que crea un nuevo objeto utilizando un objeto existente como prototipo del nuevo objeto…",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
        ],
        "correcta": 2,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.create()**?",
        "opciones": [
          "Crear contenedores de datos: Inicializar un objeto vacío para añadirle propiedades de manera dinámica más adelante.",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Crear objetos con herencia prototípica personalizada.",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
        ],
        "correcta": 2,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.create()**?",
        "opciones": [
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "Object.create(undefined) → TypeError: solo acepta objeto o null",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
        ],
        "correcta": 2,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-create-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "`Object.create(undefined)` → ❌ TypeError",
              "descripcion": "solo acepta objeto o `null`",
            },
            {
              "concepto": "Olvidar `enumerable",
              "descripcion": "true` → Las propiedades no aparecen en `for...in` ni `Object.keys`",
            },
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es una función nativa de JavaScript (ES5, 2009) que permite crear objetos especificando explícitamente su prototipo.",
            },
            {
              "concepto": "¿Para qué sirve?",
              "descripcion": "Crear objetos con herencia prototípica personalizada.",
            },
            {
              "concepto": "¿Cómo funciona?",
              "descripcion": "Recibe un primer argumento: el objeto que será el prototipo (`[[Prototype]]`).",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "`Object.create(undefined)` → ❌ TypeError → solo acepta objeto o `null` · Olvidar `enumerable → true` → Las propiedades no aparecen en `for...in` ni `Object.keys` · ¿Qué es? → Es una función nativa de JavaScript (ES5, 2009) que permite crear objetos especificando explícitamente su prototipo. · ¿Para qué sirve? → Crear objetos con herencia prototípica personalizada. · ¿Cómo funciona? → Recibe un primer argumento: el objeto que será el prototipo (`[[Prototype]]`).",
        },
        {
          "id": "js-object-create-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "`Object.create()` es un __________ de JavaScript que crea un nuevo objeto utilizando un objeto existente como prototipo del nuevo objeto creado.",
          "opciones": [
            "método estático",
            "directa y propia",
            "método estático del objeto global",
            "método estático del objeto global",
          ],
          "correcto": "método estático",
          "pista": "El término empieza por «m…».",
          "solucion": "método estático: `Object.create()` es un método estático de JavaScript que crea un nuevo objeto utilizando un objeto existente como prototipo del nuevo objeto creado.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "**🔹 Ejemplo 1: Herencia básica**",
          "explicacion": "",
          "codigo": "const animal = {\n  hablar() {\n    console.log(`${this.nombre} hace un sonido`);\n  }\n};\n\nconst perro = Object.create(animal);\nperro.nombre = \"Rex\";\nperro.hablar(); // \"Rex hace un sonido\"",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "**🔹 Ejemplo 2: Objeto sin prototipo**",
          "explicacion": "",
          "codigo": "const limpio = Object.create(null);\nconsole.log(limpio.toString); // undefined",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "**🔹 Ejemplo 3: Con descriptores**",
          "explicacion": "",
          "codigo": "const persona = Object.create(Object.prototype, {\n  nombre: {\n    value: \"Ana\",\n    writable: false,\n    enumerable: true\n  }\n});\nconsole.log(persona.nombre); // \"Ana\"\npersona.nombre = \"Luis\";      // ❌ no cambia (writable: false)",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "**🔹 Ejemplo 4: Herencia en cadena**",
          "explicacion": "",
          "codigo": "const A = { a: 1 };\nconst B = Object.create(A);\nconst C = Object.create(B);\nconsole.log(C.a); // 1 (heredado)",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-new-object": {
    "id": "js-new-object",
    "titulo": "new Object()",
    "icon": "🆕",
    "categoria": "Object",
    "firma": "new Object(valor)",
    "simulador": "object",
    "definicion": [
      "Es el constructor nativo de JavaScript que se utiliza para crear un nuevo objeto genérico, inicializando un contenedor vacío de propiedades clave-valor.",
    ],
    "queEs": [
      "Es una forma explícita de invocar al constructor global `Object`.",
      "Al utilizar la palabra clave `new`, se instancia un nuevo objeto que hereda los métodos y propiedades del prototipo base (`Object.prototype`).",
    ],
    "paraQueSirve": [
      "**Crear contenedores de datos:** Inicializar un objeto vacío para añadirle propiedades de manera dinámica más adelante.",
      "**Conversión de tipos (Casting):** Forzar a que un valor primitivo (como un string o un número) se transforme en su respectivo objeto contenedor (*wrapper*).",
    ],
    "comoFunciona": [
      "Cuando el motor de JavaScript ejecuta `new Object(valor)`:",
      "Si no se le pasa ningún argumento, o si se le pasa `null` o `undefined`, crea y devuelve un objeto vacío (`{}`).",
      "Si se le pasa un valor que ya es un objeto, simplemente devuelve ese mismo objeto (mantiene la referencia).",
      "Si se le pasa un valor primitivo (número, cadena, booleano), devuelve un objeto contenedor de ese tipo primitivo (*Object Wrapper*).",
    ],
    "sintaxis": [
      {
        "code": "const miObjeto = new Object([valor]);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Inicialización básica y asignación dinámica",
        "code": "// Crear un objeto vacío\nconst usuario = new Object();\n\n// Añadir propiedades\nusuario.nombre = \"Satoshi\";\nusuario.edad = 35;\n\nconsole.log(usuario); // { nombre: 'Satoshi', edad: 35 }",
      },
      {
        "titulo": "2. Conversión de un primitivo a objeto (Wrapper)",
        "code": "const textoPrimitivo = \"Hola\";\nconst textoObjeto = new Object(textoPrimitivo);\n\nconsole.log(typeof textoPrimitivo); // \"string\"\nconsole.log(typeof textoObjeto);    // \"object\"",
      },
    ],
    "errores": [
      "**Desatender las guías de estilo (Uso innecesario):** Usar `new Object()` para crear objetos vacíos es considerado una mala práctica o código redundante. La comunidad y los linters (como ESLint) exigen usar la **notación literal (**`{}`**)**, la cual es más corta, limpia y ligeramente más rápida en rendimiento.",
      "**Confundir referencias:** Creer que pasar un objeto existente a `new Object(objetoExistente)` crea una copia nueva. No lo hace; ambas variables apuntarán al mismo espacio de memoria.",
    ],
    "casos": [
      "Prácticamente ninguno en el desarrollo moderno cotidiano. Se prefiere al 100% el uso de la sintaxis literal `{}`.",
      "Su uso hoy en día queda relegado a:",
      "Compiladores e intérpretes (como Babel) que traducen código moderno a versiones antiguas de JavaScript.",
      "Casos muy específicos de metaprogramación donde se necesita forzar dinámicamente un envoltorio de objetos sobre tipos desconocidos.",
    ],
    "relacion": [
      "**Notación Literal (**`{}`**):** El equivalente moderno y recomendado para crear objetos.",
      "`const obj = {}` tras bambalinas hace algo muy similar a `new Object()`.",
      "`Object.create()`**:** Un método avanzado para crear objetos permitiendo definir explícitamente cuál será su prototipo base, ofreciendo mayor control que `new Object()`.",
    ],
    "analogia": "Imagínate que necesitas una caja de plástico transparente para guardar cosas. Usar `new Object()` es como **ir a una fábrica de cajas, llenar un formulario burocrático formal de solicitud y esperar a que te entreguen una caja vacía** en el mostrador. En cambio, usar la notación literal (`{}`) es como **estirar la mano y tomar una caja que ya tienes apilada en tu habitación**. Ambas cajas sirven exactamente para lo mismo, pero la segunda opción te ahorró tiempo y papeleo.",
    "fuente": "MDN Web Docs - Constructor Object()",
    "notasPersonales": [
      "💡 *Tip Pro:* Si en una entrevista técnica te preguntan cuál es la diferencia real entre `const a = {};` y `const b = new Object();`, la respuesta correcta es: **Semánticamente y en su resultado final, ninguna.** Ambos crean un objeto que hereda de `Object.prototype`. Sin embargo, `{}` es la opción estándar de la industria por legibilidad, velocidad de escritura y optimización del motor de JavaScript. ¡No uses `new Object()` a menos que tengas un motivo muy extravagante!",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de new Object()?",
        "opciones": [
          "Object.hasOwn(obj, prop)",
          "Object.is(valor1, valor2)",
          "new Object(valor)",
          "obj.hasOwnProperty(prop)",
        ],
        "correcta": 2,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor new Object()?",
        "opciones": [
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Es el constructor nativo de JavaScript que se utiliza para crear un nuevo objeto genérico, inicializando un contenedor vacío de propiedades…",
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
        ],
        "correcta": 2,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve new Object()?",
        "opciones": [
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Crear contenedores de datos: Inicializar un objeto vacío para añadirle propiedades de manera dinámica más adelante.",
          "Crear objetos con herencia prototípica personalizada.",
        ],
        "correcta": 2,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a new Object()?",
        "opciones": [
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "Desatender las guías de estilo (Uso innecesario): Usar new Object() para crear objetos vacíos es considerado una mala práctica o…",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
        ],
        "correcta": 2,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-new-object-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "Crear contenedores de datos",
              "descripcion": "Inicializar un objeto vacío para añadirle propiedades de manera dinámica más adelante.",
            },
            {
              "concepto": "Conversión de tipos (Casting)",
              "descripcion": "Forzar a que un valor primitivo (como un string o un número) se transforme en su respectivo objeto contenedor (*wrapper*).",
            },
            {
              "concepto": "Notación Literal (`{}`)",
              "descripcion": "El equivalente moderno y recomendado para crear objetos.",
            },
            {
              "concepto": "`Object.create()`",
              "descripcion": "Un método avanzado para crear objetos permitiendo definir explícitamente cuál será su prototipo base, ofreciendo mayor control que `new Object()`.",
            },
            {
              "concepto": "Confundir referencias",
              "descripcion": "Creer que pasar un objeto existente a `new Object(objetoExistente)` crea una copia nueva. No lo hace; ambas variables apuntarán al mismo espacio de memoria.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "Crear contenedores de datos → Inicializar un objeto vacío para añadirle propiedades de manera dinámica más adelante. · Conversión de tipos (Casting) → Forzar a que un valor primitivo (como un string o un número) se transforme en su respectivo objeto contenedor (*wrapper*). · Notación Literal (`{}`) → El equivalente moderno y recomendado para crear objetos. · `Object.create()` → Un método avanzado para crear objetos permitiendo definir explícitamente cuál será su prototipo base, ofreciendo mayor control que `new Object()`. · Confundir referencias → Creer que pasar un objeto existente a `new Object(objetoExistente)` crea una copia nueva. No lo hace; ambas variables apuntarán al mismo espacio de memoria.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Inicialización básica y asignación dinámica",
          "explicacion": "",
          "codigo": "// Crear un objeto vacío\nconst usuario = new Object();\n\n// Añadir propiedades\nusuario.nombre = \"Satoshi\";\nusuario.edad = 35;\n\nconsole.log(usuario); // { nombre: 'Satoshi', edad: 35 }",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Conversión de un primitivo a objeto (Wrapper)",
          "explicacion": "",
          "codigo": "const textoPrimitivo = \"Hola\";\nconst textoObjeto = new Object(textoPrimitivo);\n\nconsole.log(typeof textoPrimitivo); // \"string\"\nconsole.log(typeof textoObjeto);    // \"object\"",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-keys": {
    "id": "js-object-keys",
    "titulo": "Object.keys()",
    "icon": "🔑",
    "categoria": "Object",
    "firma": "Object.keys(obj)",
    "simulador": "object-keys",
    "definicion": [
      "Es un método estático en JavaScript que devuelve un arreglo (*array*) cuyos elementos son las cadenas de texto que corresponden a los nombres de las propiedades heredables y enumerables propias de un objeto.",
    ],
    "queEs": [
      "Es un **método estático** del objeto global `Object`.",
      "Al ser estático, se invoca directamente usando la palabra clave `Object` (la clase madre) pasando el objeto objetivo como argumento, en lugar de invocarlo desde la instancia del objeto.",
    ],
    "paraQueSirve": [
      "**Listar propiedades:** Obtener un catálogo limpio de todas las llaves o claves (*keys*) que componen un objeto.",
      "**Iterar objetos:** Convertir la estructura de un objeto en un arreglo para poder recorrerlo usando métodos modernos como `.forEach()`, `.map()` o `.filter()`.",
      "**Contar propiedades:** Averiguar fácilmente cuántas propiedades tiene un objeto midiendo la longitud (`.length`) del arreglo devuelto.",
    ],
    "comoFunciona": [
      "Cuando pasas un objeto a `Object.keys(objeto)`:",
      "El método examina el objeto en busca de sus propiedades.",
      "Filtra únicamente aquellas propiedades que son **propias** (que pertenecen al objeto directamente y no a su prototipo superior) y **enumerables** (visibles).",
      "Devuelve un arreglo de strings con los nombres de las llaves en el mismo orden en que se obtendrían al recorrer el objeto manualmente con un bucle `for...in`.",
    ],
    "sintaxis": [
      {
        "code": "Object.keys(objeto);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Extracción básica de llaves y conteo",
        "code": "const auto = {\n    marca: \"Toyota\",\n    modelo: \"Corolla\",\n    año: 2024\n};\n\nconst llaves = Object.keys(auto);\nconsole.log(llaves); // Salida: ['marca', 'modelo', 'año']\nconsole.log(llaves.length); // Salida: 3 (Cantidad de propiedades)",
      },
      {
        "titulo": "2. Recorrer un objeto usando métodos de arreglos",
        "code": "const inventario = { manzanas: 10, peras: 5, plátanos: 12 };\n\nObject.keys(inventario).forEach(fruta => {\n    console.log(`Hay ${inventario[fruta]} unidades de ${fruta}.`);\n});\n/* Salida:\nHay 10 unidades de manzanas.\nHay 5 unidades de peras.\nHay 12 unidades de plátanos.\n*/",
      },
    ],
    "errores": [
      "**Pasarle valores **`null`** o **`undefined`**:** Si intentas ejecutar `Object.keys(null)` u `Object.keys(undefined)`, el código arrojará un error crítico de tipo `TypeError`. Asegúrate siempre de que el valor sea un objeto válido antes de pasarlo.",
      "**Esperar propiedades no enumerables o Symbols:** Propiedades creadas explícitamente como no enumerables (usando `Object.defineProperty`) o aquellas que usan un `Symbol` como llave **no** serán extraídas por este método.",
      "**Asumir un orden estricto en strings/números mezclados:** Si tu objeto tiene llaves numéricas (ej. `{ 10: 'a', 2: 'b' }`), JavaScript ordenará las llaves numéricas de menor a mayor en el arreglo final de forma automática, rompiendo el orden original de escritura.",
    ],
    "casos": [
      "**Validación de formularios u objetos vacíos:** Una forma clásica de saber si un objeto está completamente vacío (`{}`) es verificar si `Object.keys(obj).length === 0`.",
      "**Transformación de datos:** Mapear la configuración o estructura de un objeto para renderizar componentes dinámicos en interfaces de usuario (como filas o columnas de una tabla basados en las llaves del objeto).",
    ],
    "relacion": [
      "`Object.values()`**:** Devuelve un arreglo con los **valores** del objeto (ej. `['Toyota', 'Corolla', 2024]`).",
      "`Object.entries()`**:** Devuelve un arreglo de arreglos con los pares **[llave, valor]** combinados.",
      "**Bucle **`for...in`**:** Recorre las llaves de un objeto, pero a diferencia de `Object.keys()`, `for...in` también lista las propiedades heredadas a través de la cadena de prototipos, lo que a veces causa bugs.",
    ],
    "analogia": "Imagínate que vas al supermercado y compras un **frasco de conservas surtidas**. El frasco tiene pegada una **etiqueta nutricional con una lista de ingredientes** impresos en el lateral. `Object.keys()` es el equivalente exacto a **tomar una tijera, recortar únicamente la lista de los nombres de los ingredientes y pegarla en una tira de papel aparte**. Ahora tienes una lista plana de palabras en un papel (un arreglo) que puedes leer de arriba a abajo individualmente, separada del frasco original.",
    "fuente": "MDN Web Docs - Object.keys()",
    "notasPersonales": [
      "💡 *Tip Pro:* En el JavaScript moderno, si le pasas un tipo primitivo como un string o un número a `Object.keys()`, el método no romperá el código; en su lugar, forzará al primitivo a convertirse en objeto. Por ejemplo, `Object.keys(\"OK\")` te devolverá `['0', '1']` (los índices de las letras). Sin embargo, para evitar comportamientos confusos, acostúmbrate a usarlo únicamente sobre objetos puros u objetos literales.",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.keys()?",
        "opciones": [
          "Object.hasOwn(obj, prop)",
          "obj.hasOwnProperty(prop)",
          "Object.is(valor1, valor2)",
          "Object.keys(obj)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.keys()?",
        "opciones": [
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Es un método estático en JavaScript que devuelve un arreglo (array) cuyos elementos son las cadenas de texto que corresponden a los nombres…",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.keys()?",
        "opciones": [
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Crear objetos con herencia prototípica personalizada.",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Listar propiedades: Obtener un catálogo limpio de todas las llaves o claves (keys) que componen un objeto.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.keys()?",
        "opciones": [
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "Pasarle valores null o undefined: Si intentas ejecutar Object.keys(null) u Object.keys(undefined), el código arrojará un error…",
        ],
        "correcta": 3,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-keys-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "Listar propiedades",
              "descripcion": "Obtener un catálogo limpio de todas las llaves o claves (*keys*) que componen un objeto.",
            },
            {
              "concepto": "Iterar objetos",
              "descripcion": "Convertir la estructura de un objeto en un arreglo para poder recorrerlo usando métodos modernos como `.forEach()`, `.map()` o `.filter()`.",
            },
            {
              "concepto": "Contar propiedades",
              "descripcion": "Averiguar fácilmente cuántas propiedades tiene un objeto midiendo la longitud (`.length`) del arreglo devuelto.",
            },
            {
              "concepto": "`Object.values()`",
              "descripcion": "Devuelve un arreglo con los valores del objeto (ej. `['Toyota', 'Corolla', 2024]`).",
            },
            {
              "concepto": "`Object.entries()`",
              "descripcion": "Devuelve un arreglo de arreglos con los pares [llave, valor] combinados.",
            },
            {
              "concepto": "Validación de formularios u objetos vacíos",
              "descripcion": "Una forma clásica de saber si un objeto está completamente vacío (`{}`) es verificar si `Object.keys(obj).length === 0`.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "Listar propiedades → Obtener un catálogo limpio de todas las llaves o claves (*keys*) que componen un objeto. · Iterar objetos → Convertir la estructura de un objeto en un arreglo para poder recorrerlo usando métodos modernos como `.forEach()`, `.map()` o `.filter()`. · Contar propiedades → Averiguar fácilmente cuántas propiedades tiene un objeto midiendo la longitud (`.length`) del arreglo devuelto. · `Object.values()` → Devuelve un arreglo con los valores del objeto (ej. `['Toyota', 'Corolla', 2024]`). · `Object.entries()` → Devuelve un arreglo de arreglos con los pares [llave, valor] combinados. · Validación de formularios u objetos vacíos → Una forma clásica de saber si un objeto está completamente vacío (`{}`) es verificar si `Object.keys(obj).length === 0`.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Extracción básica de llaves y conteo",
          "explicacion": "",
          "codigo": "const auto = {\n    marca: \"Toyota\",\n    modelo: \"Corolla\",\n    año: 2024\n};\n\nconst llaves = Object.keys(auto);\nconsole.log(llaves); // Salida: ['marca', 'modelo', 'año']\nconsole.log(llaves.length); // Salida: 3 (Cantidad de propiedades)",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Recorrer un objeto usando métodos de arreglos",
          "explicacion": "",
          "codigo": "const inventario = { manzanas: 10, peras: 5, plátanos: 12 };\n\nObject.keys(inventario).forEach(fruta => {\n    console.log(`Hay ${inventario[fruta]} unidades de ${fruta}.`);\n});\n/* Salida:\nHay 10 unidades de manzanas.\nHay 5 unidades de peras.\nHay 12 unidades de plátanos.\n*/",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-values": {
    "id": "js-object-values",
    "titulo": "Object.values()",
    "icon": "📦",
    "categoria": "Object",
    "firma": "Object.values(obj)",
    "simulador": "object",
    "definicion": [
      "Es un método estático en JavaScript que devuelve un arreglo (*array*) cuyos elementos son los valores de las propiedades enumerables propias de un objeto.",
    ],
    "queEs": [
      "Es un **método estático** del objeto global `Object`.",
      "Al igual que `Object.keys()`, se invoca directamente desde la clase madre `Object` pasando el objeto objetivo como argumento, en lugar de ser llamado desde la instancia concreta del objeto.",
    ],
    "paraQueSirve": [
      "**Extraer los datos:** Obtener una lista limpia de los contenidos o valores almacenados en un objeto, ignorando por completo los nombres de las llaves o claves.",
      "**Procesar colecciones de datos:** Convertir los valores de un objeto en un arreglo para poder aplicar filtros (`.filter()`), acumuladores (`.reduce()`), ordenamientos (`.sort()`) o iteraciones.",
      "**Sumas y operaciones matemáticas:** Ideal cuando un objeto guarda valores numéricos y necesitas calcular un total o un promedio rápidamente.",
    ],
    "comoFunciona": [
      "Cuando pasas un objeto a `Object.values(objeto)`:",
      "El método recorre las propiedades del objeto.",
      "Filtra únicamente aquellas propiedades que son **propias** y **enumerables**.",
      "Extrae sus valores y los deposita en un nuevo arreglo.",
      "El orden de los elementos coincide exactamente con el orden obtenido al recorrer el objeto manualmente.",
    ],
    "sintaxis": [
      {
        "code": "Object.values(objeto);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Extracción básica de valores",
        "code": "const usuario = {\n    nombre: \"Satoshi\",\n    rol: \"Admin\",\n    activo: true\n};\n\nconst valores = Object.values(usuario);\nconsole.log(valores);\n// Salida: ['Satoshi', 'Admin', true]",
      },
      {
        "titulo": "2. Sumar valores numéricos de un objeto (Uso de .reduce)",
        "code": "const gastosmensuales = {\n    luz: 45,\n    agua: 15,\n    internet: 30\n};\n\n// Convertimos los valores a un arreglo y los sumamos\nconst totalGastos = Object.values(gastosmensuales).reduce((total, gasto) => total + gasto, 0);\n\nconsole.log(`Gasto total: $${totalGastos}`);\n// Salida: Gasto total: $90",
      },
    ],
    "errores": [
      "**Pasarle valores **`null`** o **`undefined`**:** Intentar ejecutar `Object.values(null)` u `Object.values(undefined)` provocará de inmediato un error crítico de tipo `TypeError`. Siempre valida que el objeto exista.",
      "**Confundir el orden de los elementos:** Si las llaves del objeto son numéricas (ej: `{ 10: 'gato', 1: 'perro' }`), JavaScript ordenará internamente las propiedades por su clave numérica de menor a mayor. Por ende, `Object.values()` devolverá `['perro', 'gato']`, alterando el orden en que los escribiste originalmente.",
      "**Esperar valores de propiedades no enumerables:** Si una propiedad fue definida con la opción `enumerable: false`, su valor será completamente omitido en el arreglo final.",
    ],
    "casos": [
      "**Búsquedas de datos:** Verificar si un valor específico existe dentro de un objeto de configuraciones (ej: `Object.values(rolesValidos).includes(usuario.rol)`).",
      "**Renderizado de listas:** Tomar un objeto que funciona como diccionario de datos cargado desde una API y transformarlo en un arreglo para pintar elementos dinámicos en interfaces de usuario (como las filas de un catálogo).",
    ],
    "relacion": [
      "`Object.keys()`**:** Devuelve un arreglo únicamente con los nombres de las **llaves** (claves) del objeto.",
      "`Object.entries()`**:** Devuelve un arreglo bidimensional que contiene parejas de `[llave, valor]` por cada propiedad.",
    ],
    "analogia": "Regresemos al ejemplo del **frasco de conservas surtidas**. El frasco tiene una etiqueta lateral que dice los nombres de los ingredientes (las llaves) y adentro contiene los trozos reales de frutas (los valores). `Object.values()` es el equivalente exacto a **abrir el frasco, vaciar únicamente los trozos de fruta en un plato hondo y tirar el frasco y la etiqueta a la basura**. Ahora tienes un plato (un arreglo) lleno de comida real lista para consumir, sin importar cómo se llamaba cada pedazo originalmente.",
    "fuente": "MDN Web Docs - Object.values()",
    "notasPersonales": [
      "💡 *Tip Pro:* Si le pasas una cadena de texto a `Object.values()`, por ejemplo `Object.values(\"ZIP\")`, te devolverá un arreglo con las letras individuales: `['Z', 'I', 'P']`. Esto ocurre porque JavaScript transforma temporalmente el string en un objeto indexado por números (`{ 0: 'Z', 1: 'I', 2: 'P' }`). Aunque funciona, mantén las buenas prácticas aplicándolo principalmente sobre objetos estructurales.",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.values()?",
        "opciones": [
          "Object.hasOwn(obj, prop)",
          "Object.is(valor1, valor2)",
          "Object.values(obj)",
          "obj.hasOwnProperty(prop)",
        ],
        "correcta": 2,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.values()?",
        "opciones": [
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Es un método estático en JavaScript que devuelve un arreglo (array) cuyos elementos son los valores de las propiedades enumerables propias…",
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
        ],
        "correcta": 2,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.values()?",
        "opciones": [
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Extraer los datos: Obtener una lista limpia de los contenidos o valores almacenados en un objeto, ignorando por completo los…",
          "Crear objetos con herencia prototípica personalizada.",
        ],
        "correcta": 2,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.values()?",
        "opciones": [
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Pasarle valores null o undefined: Intentar ejecutar Object.values(null) u Object.values(undefined) provocará de inmediato un…",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
        ],
        "correcta": 2,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-values-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "Extraer los datos",
              "descripcion": "Obtener una lista limpia de los contenidos o valores almacenados en un objeto, ignorando por completo los nombres de las llaves o claves.",
            },
            {
              "concepto": "Procesar colecciones de datos",
              "descripcion": "Convertir los valores de un objeto en un arreglo para poder aplicar filtros (`.filter()`), acumuladores (`.reduce()`), ordenamientos (`.sort()`) o iteraciones.",
            },
            {
              "concepto": "Sumas y operaciones matemáticas",
              "descripcion": "Ideal cuando un objeto guarda valores numéricos y necesitas calcular un total o un promedio rápidamente.",
            },
            {
              "concepto": "`Object.keys()`",
              "descripcion": "Devuelve un arreglo únicamente con los nombres de las llaves (claves) del objeto.",
            },
            {
              "concepto": "`Object.entries()`",
              "descripcion": "Devuelve un arreglo bidimensional que contiene parejas de `[llave, valor]` por cada propiedad.",
            },
            {
              "concepto": "Búsquedas de datos",
              "descripcion": "Verificar si un valor específico existe dentro de un objeto de configuraciones (ej: `Object.values(rolesValidos).includes(usuario.rol)`).",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "Extraer los datos → Obtener una lista limpia de los contenidos o valores almacenados en un objeto, ignorando por completo los nombres de las llaves o claves. · Procesar colecciones de datos → Convertir los valores de un objeto en un arreglo para poder aplicar filtros (`.filter()`), acumuladores (`.reduce()`), ordenamientos (`.sort()`) o iteraciones. · Sumas y operaciones matemáticas → Ideal cuando un objeto guarda valores numéricos y necesitas calcular un total o un promedio rápidamente. · `Object.keys()` → Devuelve un arreglo únicamente con los nombres de las llaves (claves) del objeto. · `Object.entries()` → Devuelve un arreglo bidimensional que contiene parejas de `[llave, valor]` por cada propiedad. · Búsquedas de datos → Verificar si un valor específico existe dentro de un objeto de configuraciones (ej: `Object.values(rolesValidos).includes(usuario.rol)`).",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Extracción básica de valores",
          "explicacion": "",
          "codigo": "const usuario = {\n    nombre: \"Satoshi\",\n    rol: \"Admin\",\n    activo: true\n};\n\nconst valores = Object.values(usuario);\nconsole.log(valores);\n// Salida: ['Satoshi', 'Admin', true]",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Sumar valores numéricos de un objeto (Uso de .reduce)",
          "explicacion": "",
          "codigo": "const gastosmensuales = {\n    luz: 45,\n    agua: 15,\n    internet: 30\n};\n\n// Convertimos los valores a un arreglo y los sumamos\nconst totalGastos = Object.values(gastosmensuales).reduce((total, gasto) => total + gasto, 0);\n\nconsole.log(`Gasto total: $${totalGastos}`);\n// Salida: Gasto total: $90",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-entries": {
    "id": "js-object-entries",
    "titulo": "Object.entries()",
    "icon": "📑",
    "categoria": "Object",
    "firma": "Object.entries(obj)",
    "simulador": "object-entries",
    "definicion": [
      "Es un método estático en JavaScript que devuelve un arreglo (*array*) de arreglos bidimensional, donde cada subarreglo es un par compuesto por `[llave, valor]` correspondiente a las propiedades enumerables propias de un objeto.",
    ],
    "queEs": [
      "Es un **método estático** del objeto global `Object`.",
      "Permite deconstruir la estructura de un objeto transformándolo por completo en una matriz (un arreglo de arreglos) para facilitar la manipulación simultánea de sus claves y contenidos.",
    ],
    "paraQueSirve": [
      "**Iteración completa:** Recorrer un objeto teniendo acceso directo tanto al nombre de la propiedad (`llave`) como a su contenido (`valor`) en cada ciclo, idealmente usando desestructuración.",
      "**Transformar objetos en otros tipos:** Convertir fácilmente un objeto literal en una estructura de datos moderna como un `Map`.",
      "**Filtrar u ordenar estructuras complejas:** Al convertir el objeto en una matriz, se pueden aplicar filtros combinados que dependan tanto del nombre de la llave como del valor almacenado.",
    ],
    "comoFunciona": [
      "Cuando pasas un objeto a `Object.entries(objeto)`:",
      "Recorre todas las propiedades del objeto.",
      "Filtra aquellas que son **propias** y **enumerables**.",
      "Por cada propiedad, crea un pequeño arreglo de dos posiciones: la posición `[0]` guarda la llave (como string) y la posición `[1]` guarda el valor.",
      "Empaqueta todos estos pequeños arreglos dentro de un arreglo contenedor principal.",
    ],
    "sintaxis": [
      {
        "code": "Object.entries(objeto);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Extracción básica y desestructuración en un bucle",
        "code": "const puntajes = {\n    Satoshi: 100,\n    Hal: 95\n};\n\n// Usamos un bucle for...of junto con desestructuración [llave, valor]\nfor (const [usuario, puntos] of Object.entries(puntajes)) {\n    console.log(`El usuario ${usuario} tiene un puntaje de ${puntos}.`);\n}\n/* Salida:\nEl usuario Satoshi tiene un puntaje de 100.\nEl usuario Hal tiene un puntaje de 95.\n*/",
      },
      {
        "titulo": "2. Convertir un Objeto Literal en un `Map`",
        "code": "const configuracion = { idioma: \"es\", tema: \"oscuro\" };\n\n// El constructor de Map acepta directamente la matriz generada por entries\nconst mapaConfig = new Map(Object.entries(configuracion));\n\nconsole.log(mapaConfig.get(\"tema\")); // Salida: \"oscuro\"",
      },
    ],
    "errores": [
      "**Pasarle valores **`null`** o **`undefined`**:** Invocar `Object.entries(null)` u `Object.entries(undefined)` romperá la aplicación inmediatamente con un error de tipo `TypeError`.",
      "**Modificar el subarreglo creyendo que muta el objeto:** Si modificas el contenido de uno de los arreglos temporales generados (ej. `miMatriz[0][1] = \"nuevo\"`), **no** estarás cambiando el valor dentro del objeto original; solo estás alterando la matriz que devolvió el método.",
      "**Asumir orden estricto con llaves numéricas:** Al igual que sus métodos hermanos, si las llaves del objeto son números, JavaScript las ordenará de menor a mayor automáticamente en la matriz devuelta.",
    ],
    "casos": [
      "**Filtrar las propiedades de un objeto:** Limpiar un objeto eliminando propiedades basadas en sus valores (por ejemplo, remover claves con valores `null` o vacíos) combinando `Object.entries()`, `.filter()` y `Object.fromEntries()`.",
      "**Construcción de URLs dinámicas:** Tomar un objeto de parámetros de búsqueda (`{ query: \"javascript\", page: 2 }`) e iterarlo para armar una cadena de texto de consulta para una API (*Query String*).",
    ],
    "relacion": [
      "`Object.keys()`**:** Extrae únicamente los nombres de las claves (posición `[0]` de entries).",
      "`Object.values()`**:** Extrae únicamente los datos de los valores (posición `[1]` de entries).",
      "`Object.fromEntries()`**:** El proceso inverso exacto. Toma una matriz de pares `[llave, valor]` y la vuelve a transformar en un objeto literal clásico de JavaScript.",
    ],
    "analogia": "Regresemos al **frasco de conservas surtidas** que tiene pegada su etiqueta nutricional (llaves) y frutas por dentro (valores). `Object.entries()` es el equivalente exacto a **sacar cada fruta del frasco junto con el pedacito de etiqueta que le corresponde, meterlos juntos en una bolsita transparente individual, y alinear todas las bolsitas en una bandeja**. Ahora tienes una bandeja llena de bolsas (matriz) y en cada bolsa tienes amarrados tanto el nombre del ingrediente como la fruta real en sí.",
    "fuente": "MDN Web Docs - Object.entries()",
    "notasPersonales": [
      "💡 *Tip Pro:* Una de las combinaciones más potentes del JavaScript moderno para transformar objetos es la siguiente línea: `const limpio = Object.fromEntries(Object.entries(original).filter(([_, v]) => v !== null));` Esta instrucción convierte el objeto en matriz, filtra todos los elementos cuyo valor (`v`) sea `null` (usando un guion bajo `_` para ignorar la llave en la desestructuración) y vuelve a armar el objeto limpio en un segundo. ¡Guárdate este truco!",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.entries()?",
        "opciones": [
          "Object.is(valor1, valor2)",
          "Object.hasOwn(obj, prop)",
          "obj.hasOwnProperty(prop)",
          "Object.entries(obj)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.entries()?",
        "opciones": [
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Es un método estático en JavaScript que devuelve un arreglo (array) de arreglos bidimensional, donde cada subarreglo es un par compuesto…",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.entries()?",
        "opciones": [
          "Crear objetos con herencia prototípica personalizada.",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Iteración completa: Recorrer un objeto teniendo acceso directo tanto al nombre de la propiedad (llave) como a su contenido…",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.entries()?",
        "opciones": [
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "Pasarle valores null o undefined: Invocar Object.entries(null) u Object.entries(undefined) romperá la aplicación inmediatamente…",
        ],
        "correcta": 3,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-entries-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "Iteración completa",
              "descripcion": "Recorrer un objeto teniendo acceso directo tanto al nombre de la propiedad (`llave`) como a su contenido (`valor`) en cada ciclo, idealmente usando…",
            },
            {
              "concepto": "Transformar objetos en otros tipos",
              "descripcion": "Convertir fácilmente un objeto literal en una estructura de datos moderna como un `Map`.",
            },
            {
              "concepto": "Filtrar u ordenar estructuras complejas",
              "descripcion": "Al convertir el objeto en una matriz, se pueden aplicar filtros combinados que dependan tanto del nombre de la llave como del valor almacenado.",
            },
            {
              "concepto": "`Object.keys()`",
              "descripcion": "Extrae únicamente los nombres de las claves (posición `[0]` de entries).",
            },
            {
              "concepto": "`Object.values()`",
              "descripcion": "Extrae únicamente los datos de los valores (posición `[1]` de entries).",
            },
            {
              "concepto": "`Object.fromEntries()`",
              "descripcion": "El proceso inverso exacto. Toma una matriz de pares `[llave, valor]` y la vuelve a transformar en un objeto literal clásico de JavaScript.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "Iteración completa → Recorrer un objeto teniendo acceso directo tanto al nombre de la propiedad (`llave`) como a su contenido (`valor`) en cada ciclo, idealmente usando… · Transformar objetos en otros tipos → Convertir fácilmente un objeto literal en una estructura de datos moderna como un `Map`. · Filtrar u ordenar estructuras complejas → Al convertir el objeto en una matriz, se pueden aplicar filtros combinados que dependan tanto del nombre de la llave como del valor almacenado. · `Object.keys()` → Extrae únicamente los nombres de las claves (posición `[0]` de entries). · `Object.values()` → Extrae únicamente los datos de los valores (posición `[1]` de entries). · `Object.fromEntries()` → El proceso inverso exacto. Toma una matriz de pares `[llave, valor]` y la vuelve a transformar en un objeto literal clásico de JavaScript.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Extracción básica y desestructuración en un bucle",
          "explicacion": "",
          "codigo": "const puntajes = {\n    Satoshi: 100,\n    Hal: 95\n};\n\n// Usamos un bucle for...of junto con desestructuración [llave, valor]\nfor (const [usuario, puntos] of Object.entries(puntajes)) {\n    console.log(`El usuario ${usuario} tiene un puntaje de ${puntos}.`);\n}\n/* Salida:\nEl usuario Satoshi tiene un puntaje de 100.\nEl usuario Hal tiene un puntaje de 95.\n*/",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Convertir un Objeto Literal en un `Map`",
          "explicacion": "",
          "codigo": "const configuracion = { idioma: \"es\", tema: \"oscuro\" };\n\n// El constructor de Map acepta directamente la matriz generada por entries\nconst mapaConfig = new Map(Object.entries(configuracion));\n\nconsole.log(mapaConfig.get(\"tema\")); // Salida: \"oscuro\"",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-fromentries": {
    "id": "js-object-fromentries",
    "titulo": "Object.fromEntries()",
    "icon": "🔄",
    "categoria": "Object",
    "firma": "Object.fromEntries(iterable)",
    "simulador": "object",
    "definicion": [
      "Es un método estático en JavaScript que toma una lista de pares clave-valor (como un arreglo de arreglos o una estructura iterable) y la transforma en un objeto literal clásico.",
    ],
    "queEs": [
      "Es un **método estático** del objeto global `Object`.",
      "Actúa como la operación inversa o simétrica de `Object.entries()`, permitiendo reconstruir o crear objetos a partir de estructuras de datos basadas en matrices u objetos iterables (como un `Map`).",
    ],
    "paraQueSirve": [
      "**Reconstruir objetos:** Volver a armar un objeto literal después de haberlo transformado en un arreglo para filtrarlo, ordenarlo o modificarlo.",
      "**Convertir estructuras modernas:** Transformar fácilmente un objeto de tipo `Map` en un objeto literal común (`{}`).",
      "**Procesar parámetros de URL:** Convertir los parámetros de búsqueda de una dirección web (*Query Strings*) en un objeto manipulable en segundos.",
    ],
    "comoFunciona": [
      "Cuando pasas una estructura a `Object.fromEntries(iterable)`:",
      "El método valida que el argumento sea una estructura iterable (como un `Array`, `Map`, etc.).",
      "Recorre cada elemento de la estructura esperando encontrar un par de datos (donde el primer elemento actúa como la clave/llave y el segundo como el valor).",
      "Va insertando dinámicamente cada par dentro de un nuevo objeto literal y, al finalizar, devuelve dicho objeto estructurado.",
    ],
    "sintaxis": [
      {
        "code": "Object.fromEntries(iterable);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Crear un objeto a partir de una matriz bidimensional",
        "code": "const matrizProductos = [\n    [\"id\", 101],\n    [\"nombre\", \"Teclado Mecánico\"],\n    [\"precio\", 75]\n];\n\nconst productoObjeto = Object.fromEntries(matrizProductos);\nconsole.log(productoObjeto);\n// Salida: { id: 101, nombre: 'Teclado Mecánico', precio: 75 }",
      },
      {
        "titulo": "2. Filtrar las propiedades de un objeto (El ciclo completo)",
        "code": "const precios = { laptop: 1200, mouse: 25, monitor: 300 };\n\n// 1. Convertimos a matriz (entries)\n// 2. Filtramos artículos que cuesten menos de $100 (.filter)\n// 3. Reconstruimos el objeto con de regreso (fromEntries)\nconst economicos = Object.fromEntries(\n    Object.entries(precios).filter(([articulo, precio]) => precio < 100)\n);\n\nconsole.log(economicos); // Salida: { mouse: 25 }",
      },
    ],
    "errores": [
      "**Pasarle elementos que no contengan pares:** Si le pasas un arreglo plano como `Object.fromEntries([\"a\", \"b\", \"c\"])`, el código fallará arrojando un error de tipo `TypeError` porque el método no sabrá qué valor asignarle a cada llave.",
      "**Duplicar llaves en la lista:** Si en tu lista iterable incluyes dos veces la misma llave con valores diferentes (ej. `[['id', 1], ['id', 2]]`), el método no fallará, pero **la última aparición sobreescribirá a las anteriores**, dejando el objeto como `{ id: 2 }`.",
    ],
    "casos": [
      "**Manipulación de URLs:** Convertir los parámetros de una URL leídos mediante `URLSearchParams` directamente en un objeto JavaScript limpio para leer las búsquedas del usuario:",
      "Código: const params = new URLSearchParams(\"?buscar=zapatos&color=negro\");",
      "**Migración de datos:** Convertir configuraciones guardadas dentro de un objeto `Map` a un formato JSON plano (haciendo primero un `fromEntries` y luego un `JSON.stringify`).",
    ],
    "relacion": [
      "`Object.entries()`**:** Su contraparte exacta. Rompe el objeto en un arreglo de parejas `[llave, valor]`.",
      "**Iterable:** Protocolo de JavaScript que permite que ciertas estructuras (como `Array`, `Map` o `Set`) puedan ser recorridas elemento por elemento.",
    ],
    "analogia": "Imagínate que tienes una **bandeja llena de bolsitas transparentes individuales** (`Object.entries()`). En cada bolsita tienes amarrados un trozo de fruta (el valor) y un pedazo de papel con el nombre del ingrediente (la llave). `Object.fromEntries()` es el equivalente exacto a **tomar todas esas bolsitas, abrirlas una por una, vaciar todas las frutas dentro de un gran frasco de vidrio nuevo y pegarle sus respectivas etiquetas en el lateral**. Has regresado todo a un formato de frasco contenedor único y ordenado (un objeto literal).",
    "fuente": "MDN Web Docs - Object.fromEntries()",
    "notasPersonales": [
      "💡 *Tip Pro:* Una ventaja oculta de `Object.fromEntries()` es que maneja de forma impecable las llaves duplicadas si lo que buscas es precisamente quedarte con la última actualización de un registro de datos. Si procesas un flujo de logs históricos ordenados por tiempo en forma de matriz, pasárselos a este método te generará un objeto instantáneo con el \"último estado conocido\" de cada variable sin necesidad de programar lógica de control manual. ¡Eficiencia pura!",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.fromEntries()?",
        "opciones": [
          "Object.hasOwn(obj, prop)",
          "Object.is(valor1, valor2)",
          "obj.hasOwnProperty(prop)",
          "Object.fromEntries(iterable)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.fromEntries()?",
        "opciones": [
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Es un método estático en JavaScript que toma una lista de pares clave-valor (como un arreglo de arreglos o una estructura iterable) y la…",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.fromEntries()?",
        "opciones": [
          "Crear objetos con herencia prototípica personalizada.",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Reconstruir objetos: Volver a armar un objeto literal después de haberlo transformado en un arreglo para filtrarlo, ordenarlo o…",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.fromEntries()?",
        "opciones": [
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "Pasarle elementos que no contengan pares: Si le pasas un arreglo plano como Object.fromEntries([\"a\", \"b\", \"c\"]), el código…",
        ],
        "correcta": 3,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-fromentries-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "Reconstruir objetos",
              "descripcion": "Volver a armar un objeto literal después de haberlo transformado en un arreglo para filtrarlo, ordenarlo o modificarlo.",
            },
            {
              "concepto": "Convertir estructuras modernas",
              "descripcion": "Transformar fácilmente un objeto de tipo `Map` en un objeto literal común (`{}`).",
            },
            {
              "concepto": "Procesar parámetros de URL",
              "descripcion": "Convertir los parámetros de búsqueda de una dirección web (*Query Strings*) en un objeto manipulable en segundos.",
            },
            {
              "concepto": "`Object.entries()`",
              "descripcion": "Su contraparte exacta. Rompe el objeto en un arreglo de parejas `[llave, valor]`.",
            },
            {
              "concepto": "Iterable",
              "descripcion": "Protocolo de JavaScript que permite que ciertas estructuras (como `Array`, `Map` o `Set`) puedan ser recorridas elemento por elemento.",
            },
            {
              "concepto": "Manipulación de URLs",
              "descripcion": "Convertir los parámetros de una URL leídos mediante `URLSearchParams` directamente en un objeto JavaScript limpio para leer las búsquedas del usuario:",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "Reconstruir objetos → Volver a armar un objeto literal después de haberlo transformado en un arreglo para filtrarlo, ordenarlo o modificarlo. · Convertir estructuras modernas → Transformar fácilmente un objeto de tipo `Map` en un objeto literal común (`{}`). · Procesar parámetros de URL → Convertir los parámetros de búsqueda de una dirección web (*Query Strings*) en un objeto manipulable en segundos. · `Object.entries()` → Su contraparte exacta. Rompe el objeto en un arreglo de parejas `[llave, valor]`. · Iterable → Protocolo de JavaScript que permite que ciertas estructuras (como `Array`, `Map` o `Set`) puedan ser recorridas elemento por elemento. · Manipulación de URLs → Convertir los parámetros de una URL leídos mediante `URLSearchParams` directamente en un objeto JavaScript limpio para leer las búsquedas del usuario:",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Crear un objeto a partir de una matriz bidimensional",
          "explicacion": "",
          "codigo": "const matrizProductos = [\n    [\"id\", 101],\n    [\"nombre\", \"Teclado Mecánico\"],\n    [\"precio\", 75]\n];\n\nconst productoObjeto = Object.fromEntries(matrizProductos);\nconsole.log(productoObjeto);\n// Salida: { id: 101, nombre: 'Teclado Mecánico', precio: 75 }",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Filtrar las propiedades de un objeto (El ciclo completo)",
          "explicacion": "",
          "codigo": "const precios = { laptop: 1200, mouse: 25, monitor: 300 };\n\n// 1. Convertimos a matriz (entries)\n// 2. Filtramos artículos que cuesten menos de $100 (.filter)\n// 3. Reconstruimos el objeto con de regreso (fromEntries)\nconst economicos = Object.fromEntries(\n    Object.entries(precios).filter(([articulo, precio]) => precio < 100)\n);\n\nconsole.log(economicos); // Salida: { mouse: 25 }",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-groupby": {
    "id": "js-object-groupby",
    "titulo": "Object.groupBy()",
    "icon": "🗂️",
    "categoria": "Object",
    "firma": "Object.groupBy(iterable, fn)",
    "simulador": "object",
    "definicion": [
      "Es un método estático en JavaScript que toma una colección de elementos (como un arreglo) y los agrupa en un objeto literal clásico, clasificándolos según las cadenas de texto devueltas por una función callback personalizada.",
    ],
    "queEs": [
      "Es un **método estático de organización de colecciones** del objeto global `Object`.",
      "Fue introducido formalmente en el estándar ECMAScript (ES2024) para estandarizar una de las tareas de manipulación de datos más recurrentes en el desarrollo web: agrupar listas de objetos basados en una propiedad común sin necesidad de escribir bucles manuales o instalar librerías externas como *Lodash*.",
    ],
    "paraQueSirve": [
      "**Clasificación de datos en un clic:** Agrupar registros según un criterio (ej. clasificar productos por su categoría o usuarios por su rol).",
      "**Segmentación de reportes:** Dividir listas numéricas o de estados en bloques legibles (ej. separar tareas pendientes de tareas completadas).",
      "**Eliminar dependencias externas:** Reemplazar funciones personalizadas de ordenamiento o utilitarios externos, mejorando el peso y rendimiento de la aplicación.",
    ],
    "comoFunciona": [
      "El método recibe dos argumentos: el iterable (usualmente un arreglo) y una función callback de criterio.",
      "Recorre cada elemento de la lista pasándolo por la función callback.",
      "La función callback debe devolver un string (o un valor que se convierta a string) que actúe como el \"nombre de la categoría\".",
      "`Object.groupBy()` crea un objeto vacío.",
      "Cada \"nombre de categoría\" se convierte en una llave (*key*) del objeto, y su valor correspondiente es un arreglo con todos los elementos originales que encajaron en esa categoría.",
    ],
    "sintaxis": [
      {
        "code": "Object.groupBy(iterable, callbackFn);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Agrupar productos por su categoría",
        "code": "const productos = [\n    { nombre: \"Manzana\", tipo: \"fruta\" },\n    { nombre: \"Brócoli\", tipo: \"verdura\" },\n    { nombre: \"Plátano\", tipo: \"fruta\" }\n];\n\n// Agrupamos usando el valor de la propiedad 'tipo'\nconst resultado = Object.groupBy(productos, (producto) => producto.tipo);\n\nconsole.log(resultado);\n/* Salida:\n{\n  fruta: [\n    { nombre: 'Manzana', tipo: 'fruta' },\n    { nombre: 'Plátano', tipo: 'fruta' }\n  ],\n  verdura: [\n    { nombre: 'Brócoli', tipo: 'verdura' }\n  ]\n}\n*/",
      },
      {
        "titulo": "2. Clasificación dinámica basada en condiciones lógicas",
        "code": "const alumnos = [\n    { nombre: \"Ana\", nota: 18 },\n    { nombre: \"Luis\", nota: 09 },\n    { nombre: \"Pedro\", nota: 14 }\n];\n\n// Clasificamos dinámicamente evaluando la nota\nconst alumnosClasificados = Object.groupBy(alumnos, (alumno) => {\n    return alumno.nota >= 11 ? \"aprobados\" : \"desaprobados\";\n});\n\nconsole.log(alumnosClasificados.aprobados); // [{ nombre: \"Ana\", ... }, { nombre: \"Pedro\", ... }]",
      },
    ],
    "errores": [
      "**Retornar tipos de datos complejos en el callback:** Las llaves de un objeto común de JavaScript solo pueden ser cadenas de texto (*strings*) o *Symbols*.",
      "Si tu función callback devuelve un objeto o un arreglo, JavaScript lo forzará a convertirse en el string `\"[object Object]\"`, agrupando todo bajo una misma llave genérica y rompiendo tu lógica. (Si necesitas agrupar usando objetos complejos como llaves, debes usar el método hermano `Map.groupBy()`).",
      "**Llamarlo como método de instancia:** Escribir `misDatos.groupBy(...)` causará un error de tipo `TypeError`.",
      "Recuerda que es un método estático: se debe invocar obligatoriamente desde la mayúscula inicial `Object.groupBy(misDatos, ...)`.",
    ],
    "casos": [
      "**Paneles de Control (Dashboards) y Gráficos:** Estructurar los datos crudos provenientes de una base de datos para agrupar ventas por mes, gastos por departamento o logs de servidor por tipo de error (`info`, `warning`, `error`).",
      "**Interfaces de Comercio Electrónico:** Separar un inventario masivo en bloques categorizados para mostrarlos ordenadamente en pestañas o secciones visuales en la aplicación web del cliente.",
    ],
    "relacion": [
      "`Map.groupBy()`**:** Lanzado al mismo tiempo. Funciona exactamente igual, pero en lugar de devolver un objeto literal, devuelve un objeto de tipo `Map`. Es ideal cuando las llaves de tus categorías requieren ser objetos o tipos de datos no primitivos.",
      "`Array.prototype.reduce()`**:** El método que se usaba tradicionalmente en JavaScript para lograr este comportamiento mediante acumuladores manuales complejos.",
    ],
    "analogia": "Imagínate que eres un empleado de logística en el almacén de una **oficina postal** y recibes una gigantesca caja llena de **cartas de correspondencia mezcladas**. Tu trabajo es organizarlas. `Object.groupBy()` es el equivalente exacto a **colocar una fila de cajas vacías sobre tu mesa de trabajo y empezar a leer la ciudad de destino de cada carta**. Si la carta va para \"Lima\", la lanzas a la caja de Lima; si va para \"Madrid\", la lanzas a la caja de Madrid. Al final, en lugar de un desorden de cartas sueltas, tienes un grupo de cajas perfectamente rotuladas (las llaves) y adentro de cada una están todos los sobres que pertenecen allí (los arreglos).",
    "fuente": "MDN Web Docs - Object.groupBy()",
    "notasPersonales": [
      "💡 *Tip Pro:* Al usar `Object.groupBy()`, puedes aprovechar el segundo parámetro opcional que recibe la función callback: el índice del elemento. Esto te permite hacer agrupaciones matemáticas abstractas muy curiosas, como por ejemplo separar elementos en grupos de \"posiciones pares\" e \"invitados en posiciones impares\" (`index % 2 === 0`) para lógicas de sorteos o distribución de cargas en hilos de trabajo. ¡Sácale provecho!",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.groupBy()?",
        "opciones": [
          "Object.hasOwn(obj, prop)",
          "obj.hasOwnProperty(prop)",
          "Object.groupBy(iterable, fn)",
          "Object.is(valor1, valor2)",
        ],
        "correcta": 2,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.groupBy()?",
        "opciones": [
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método estático en JavaScript que toma una colección de elementos (como un arreglo) y los agrupa en un objeto literal clásico,…",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
        ],
        "correcta": 2,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.groupBy()?",
        "opciones": [
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Clasificación de datos en un clic: Agrupar registros según un criterio (ej. clasificar productos por su categoría o usuarios por…",
          "Crear objetos con herencia prototípica personalizada.",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.groupBy()?",
        "opciones": [
          "Retornar tipos de datos complejos en el callback: Las llaves de un objeto común de JavaScript solo pueden ser cadenas de texto…",
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
        ],
        "correcta": 0,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-groupby-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "Clasificación de datos en un clic",
              "descripcion": "Agrupar registros según un criterio (ej. clasificar productos por su categoría o usuarios por su rol).",
            },
            {
              "concepto": "Segmentación de reportes",
              "descripcion": "Dividir listas numéricas o de estados en bloques legibles (ej. separar tareas pendientes de tareas completadas).",
            },
            {
              "concepto": "Eliminar dependencias externas",
              "descripcion": "Reemplazar funciones personalizadas de ordenamiento o utilitarios externos, mejorando el peso y rendimiento de la aplicación.",
            },
            {
              "concepto": "`Array.prototype.reduce()`",
              "descripcion": "El método que se usaba tradicionalmente en JavaScript para lograr este comportamiento mediante acumuladores manuales complejos.",
            },
            {
              "concepto": "Interfaces de Comercio Electrónico",
              "descripcion": "Separar un inventario masivo en bloques categorizados para mostrarlos ordenadamente en pestañas o secciones visuales en la aplicación web del cliente.",
            },
            {
              "concepto": "Retornar tipos de datos complejos en el callback",
              "descripcion": "Las llaves de un objeto común de JavaScript solo pueden ser cadenas de texto (*strings*) o *Symbols*.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "Clasificación de datos en un clic → Agrupar registros según un criterio (ej. clasificar productos por su categoría o usuarios por su rol). · Segmentación de reportes → Dividir listas numéricas o de estados en bloques legibles (ej. separar tareas pendientes de tareas completadas). · Eliminar dependencias externas → Reemplazar funciones personalizadas de ordenamiento o utilitarios externos, mejorando el peso y rendimiento de la aplicación. · `Array.prototype.reduce()` → El método que se usaba tradicionalmente en JavaScript para lograr este comportamiento mediante acumuladores manuales complejos. · Interfaces de Comercio Electrónico → Separar un inventario masivo en bloques categorizados para mostrarlos ordenadamente en pestañas o secciones visuales en la aplicación web del cliente. · Retornar tipos de datos complejos en el callback → Las llaves de un objeto común de JavaScript solo pueden ser cadenas de texto (*strings*) o *Symbols*.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Agrupar productos por su categoría",
          "explicacion": "",
          "codigo": "const productos = [\n    { nombre: \"Manzana\", tipo: \"fruta\" },\n    { nombre: \"Brócoli\", tipo: \"verdura\" },\n    { nombre: \"Plátano\", tipo: \"fruta\" }\n];\n\n// Agrupamos usando el valor de la propiedad 'tipo'\nconst resultado = Object.groupBy(productos, (producto) => producto.tipo);\n\nconsole.log(resultado);\n/* Salida:\n{\n  fruta: [\n    { nombre: 'Manzana', tipo: 'fruta' },\n    { nombre: 'Plátano', tipo: 'fruta' }\n  ],\n  verdura: [\n    { nombre: 'Brócoli', tipo: 'verdura' }\n  ]\n}\n*/",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Clasificación dinámica basada en condiciones lógicas",
          "explicacion": "",
          "codigo": "const alumnos = [\n    { nombre: \"Ana\", nota: 18 },\n    { nombre: \"Luis\", nota: 09 },\n    { nombre: \"Pedro\", nota: 14 }\n];\n\n// Clasificamos dinámicamente evaluando la nota\nconst alumnosClasificados = Object.groupBy(alumnos, (alumno) => {\n    return alumno.nota >= 11 ? \"aprobados\" : \"desaprobados\";\n});\n\nconsole.log(alumnosClasificados.aprobados); // [{ nombre: \"Ana\", ... }, { nombre: \"Pedro\", ... }]",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-freeze": {
    "id": "js-object-freeze",
    "titulo": "Object.freeze()",
    "icon": "🧊",
    "categoria": "Object",
    "firma": "Object.freeze(obj)",
    "simulador": "object-freeze",
    "definicion": [
      "`Object.freeze()` es un **método estático del objeto global **`Object` que permite **congelar un objeto**, evitando que sus propiedades puedan ser agregadas, eliminadas o modificadas.",
      "Devuelve el mismo objeto que fue congelado.",
    ],
    "queEs": [
      "Es un **método estático** de `Object`.",
      "**Forma parte del lenguaje JavaScript (ECMAScript)**, **no de una Web API**.",
      "Convierte un objeto en un estado de **solo lectura superficial (*shallow read-only*)**.",
      "Cuando un objeto está congelado:",
      "✅ Puedes:",
      "Leer propiedades.",
      "Acceder a sus valores.",
      "❌ No puedes:",
      "Agregar nuevas propiedades.",
      "Eliminar propiedades existentes.",
      "Cambiar valores.",
      "Cambiar configuraciones de propiedades.",
    ],
    "paraQueSirve": [
      "Se utiliza para:",
      "Proteger objetos importantes contra modificaciones accidentales.",
      "Crear constantes de configuración.",
      "Evitar cambios en datos compartidos.",
      "Mantener estados inmutables en aplicaciones.",
      "Ayudar en patrones como programación funcional y gestión de estados.",
    ],
    "comoFunciona": [
      "Cuando ejecutas:",
      "JavaScript realiza dos acciones principales:",
      "Evita que se agreguen nuevas propiedades.",
      "Hace que las propiedades existentes sean: `writable: false` → no se pueden modificar. `configurable: false` → no se pueden eliminar.",
      "Ejemplo:",
      "Antes:",
      "Después:",
      "Intentos:",
    ],
    "sintaxis": [
      {
        "code": "Object.freeze(objeto);",
      },
      {
        "caption": "Valor de retorno",
        "code": "const resultado=Object.freeze(usuario);\nconsole.log(resultado===usuario);",
      },
      {
        "caption": "Resultado:",
        "code": "true",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Congelar un objeto",
        "code": "const persona= {\n    nombre:\"Luis\",\n    edad:25\n};\nObject.freeze(persona);\npersona.edad=30;\nconsole.log(persona);\n\n{nombre:\"Luis\",edad:25\n}",
      },
      {
        "titulo": "Intentar agregar una propiedad",
        "code": "const producto= {\n    nombre:\"Laptop\"\n};\nObject.freeze(producto);producto.precio=2500;console.log(producto);\n\n{nombre:\"Laptop\"\n}",
      },
      {
        "titulo": "Intentar eliminar una propiedad",
        "code": "const usuario= {\n    nombre:\"Ana\",\n    edad:20\n};\nObject.freeze(usuario);deleteusuario.edad;console.log(usuario);\n\n{nombre:\"Ana\",edad:20\n}",
      },
      {
        "titulo": "Verificar si está congelado",
        "code": "const config= {\n    modo:\"oscuro\"\n};Object.freeze(config);console.log(Object.isFrozen(config));\n\ntrue",
      },
      {
        "titulo": "Congelar un array",
        "descripcion": "Los arrays también son objetos:",
        "code": "const numeros= [1,2,3];\nObject.freeze(numeros);\nnumeros.push(4);\n\nError",
      },
    ],
    "errores": [
      {
        "texto": "❌ Pensar que congela objetos internos — Resultado: ¿Por qué? Porque `freeze()` solo congela el **primer nivel**. Es una: No una:",
        "code": "const usuario= {\n    nombre:\"Ana\",\n    direccion: {\n        ciudad:\"Lima\"\n    }\n};\nObject.freeze(usuario);\nusuario.direccion.ciudad=\"Cusco\";\nconsole.log(usuario);\n\n{nombre:\"Ana\",direccion: {ciudad:\"Cusco\"\n }\n}\n\nShallow Freeze ✅\n\nDeep Freeze ❌",
      },
      "❌ Confundirlo con `Object.seal()`",
      "`Object.seal()` → ❌ · ❌ · ✅",
      "`Object.freeze()` → ❌ · ❌ · ❌",
      {
        "texto": "❌ Pensar que crea una copia — No crea otro objeto. Es el mismo: Resultado:",
        "code": "const nuevo=Object.freeze(objeto);\n\nnuevo===objeto\n\ntrue",
      },
      {
        "texto": "❌ No usar modo estricto para detectar errores — Sin `\"use strict\"`: Puede fallar silenciosamente. Con: JavaScript lanzará un error.",
        "code": "objeto.nombre=\"Pedro\";\n\n\"use strict\";",
      },
    ],
    "casos": [
      "Configuraciones constantes",
      "Estados inmutables",
      "Ejemplo en aplicaciones:",
      "Evitar modificaciones accidentales",
      "Librerías.",
      "Constantes globales.",
      "Datos compartidos.",
      "Objetos de configuración.",
    ],
    "relacion": [
      "`Object.preventExtensions()` → No permite agregar propiedades",
      "`Object.seal()` → No permite agregar ni eliminar",
      "`Object.freeze()` → No permite agregar, eliminar ni modificar",
      "`Object.isFrozen()` → Comprueba si está congelado",
      "Jerarquía de protección:",
      "Relación con inmutabilidad",
      "`Object.freeze()` ayuda a crear objetos inmutables:",
      "Pero recuerda:",
      "Congelación superficial → solo primer nivel.",
      "Para estructuras profundas se necesita una técnica de **deep freeze**.",
    ],
    "analogia": "Imagina una estatua de hielo 🧊: Antes: Puedes: Añadir piezas. Quitar piezas. Cambiar partes. Después de `Object.freeze()`: Solo puedes observarla: 👀 Leer → ✅ ➕ Agregar → ❌ ➖ Eliminar → ❌ ✏️ Modificar → ❌",
    "fuente": "**MDN Web Docs:** https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze **Especificación ECMAScript:** https://tc39.es/ecma262/#sec-object.freeze",
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.freeze()?",
        "opciones": [
          "Object.freeze(obj)",
          "Object.is(valor1, valor2)",
          "obj.hasOwnProperty(prop)",
          "Object.hasOwn(obj, prop)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.freeze()?",
        "opciones": [
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Object.freeze() es un método estático del objeto global Object que permite congelar un objeto, evitando que sus propiedades puedan ser…",
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.freeze()?",
        "opciones": [
          "Se utiliza para: Proteger objetos importantes contra modificaciones accidentales.",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Crear objetos con herencia prototípica personalizada.",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.freeze()?",
        "opciones": [
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "Confundirlo con Object.seal()",
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
        ],
        "correcta": 2,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-freeze-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "❌ Pensar que congela objetos internos — Resultado",
              "descripcion": "¿Por qué? Porque `freeze()` solo congela el primer nivel. Es una: No una:",
            },
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es un método estático de `Object`.",
            },
            {
              "concepto": "Error común",
              "descripcion": "❌ Pensar que congela objetos internos — Resultado: ¿Por qué? Porque `freeze()` solo congela el primer nivel. Es una: No una:",
            },
            {
              "concepto": "Caso de uso",
              "descripcion": "Configuraciones constantes",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "❌ Pensar que congela objetos internos — Resultado → ¿Por qué? Porque `freeze()` solo congela el primer nivel. Es una: No una: · ¿Qué es? → Es un método estático de `Object`. · Error común → ❌ Pensar que congela objetos internos — Resultado: ¿Por qué? Porque `freeze()` solo congela el primer nivel. Es una: No una: · Caso de uso → Configuraciones constantes",
        },
        {
          "id": "js-object-freeze-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "`Object.freeze()` es un __________ `Object` que permite congelar un objeto, evitando que sus propiedades puedan ser agregadas, eliminadas o modificadas.",
          "opciones": [
            "método estático del objeto global",
            "directa y propia",
            "método estático",
            "método",
          ],
          "correcto": "método estático del objeto global",
          "pista": "El término empieza por «m…».",
          "solucion": "método estático del objeto global: `Object.freeze()` es un método estático del objeto global `Object` que permite congelar un objeto, evitando que sus propiedades puedan ser agregadas, eliminadas o modificadas.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "Congelar un objeto",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Luis\",\n    edad:25\n};\nObject.freeze(persona);\npersona.edad=30;\nconsole.log(persona);\n\n{nombre:\"Luis\",edad:25\n}",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "Intentar agregar una propiedad",
          "explicacion": "",
          "codigo": "const producto= {\n    nombre:\"Laptop\"\n};\nObject.freeze(producto);producto.precio=2500;console.log(producto);\n\n{nombre:\"Laptop\"\n}",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "Intentar eliminar una propiedad",
          "explicacion": "",
          "codigo": "const usuario= {\n    nombre:\"Ana\",\n    edad:20\n};\nObject.freeze(usuario);deleteusuario.edad;console.log(usuario);\n\n{nombre:\"Ana\",edad:20\n}",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "Verificar si está congelado",
          "explicacion": "",
          "codigo": "const config= {\n    modo:\"oscuro\"\n};Object.freeze(config);console.log(Object.isFrozen(config));\n\ntrue",
          "salida": "",
        },
        {
          "paso": 5,
          "titulo": "Congelar un array",
          "explicacion": "Los arrays también son objetos:",
          "codigo": "const numeros= [1,2,3];\nObject.freeze(numeros);\nnumeros.push(4);\n\nError",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-seal": {
    "id": "js-object-seal",
    "titulo": "Object.seal()",
    "icon": "🔒",
    "categoria": "Object",
    "firma": "Object.seal(obj)",
    "simulador": "object-seal",
    "definicion": [
      "`Object.seal()` es un **método estático del objeto global **`Object` que permite **sellar un objeto**, evitando que se puedan **agregar o eliminar propiedades**, pero permitiendo **modificar los valores de las propiedades existentes**.",
    ],
    "queEs": [
      "Es un **método estático** de `Object`.",
      "**Forma parte del lenguaje JavaScript (ECMAScript)**, **no de una Web API**.",
      "Cambia el estado interno del objeto usando el concepto de **propiedades configurables (**`configurable`**)**.",
      "Cuando un objeto es sellado:",
      "✅ Puedes:",
      "Leer propiedades.",
      "Modificar valores existentes.",
      "❌ No puedes:",
      "Agregar nuevas propiedades.",
      "Eliminar propiedades existentes.",
      "Cambiar la configuración de las propiedades.",
    ],
    "paraQueSirve": [
      "Se utiliza para:",
      "Proteger estructuras de datos contra cambios de forma accidental.",
      "Evitar que otras partes del programa agreguen o eliminen propiedades.",
      "Crear objetos con una estructura fija.",
      "Mejorar la seguridad y control del código.",
    ],
    "comoFunciona": [
      "Cuando ejecutas:",
      "JavaScript modifica las propiedades internas del objeto:",
      "Antes:",
      "Puedes:",
      "Después de `seal()`:",
      "La estructura queda bloqueada.",
      "Pero:",
      "Sí funciona.",
    ],
    "sintaxis": [
      {
        "code": "Object.seal(objeto);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Sellar un objeto",
        "code": "const usuario= {\n    nombre:\"Josué\",\n    edad:17\n};\nObject.seal(usuario);\nusuario.edad=18;\nconsole.log(usuario);\n\n{nombre:\"Josué\",edad:18}",
      },
      {
        "titulo": "Intentar agregar una propiedad",
        "code": "const persona= {\n    nombre:\"Ana\"\n};\nObject.seal(persona);\npersona.edad=25;\nconsole.log(persona);\n\n{nombre:\"Ana\"\n}",
      },
      {
        "titulo": "Intentar eliminar una propiedad",
        "code": "const producto= {\n    nombre:\"Laptop\",\n    precio:2500\n}\n;Object.seal(producto);\ndelete producto.precio;\nconsole.log(producto);\n\n{nombre:\"Laptop\",precio:2500\n}",
      },
      {
        "titulo": "Verificar si un objeto está sellado",
        "code": "const usuario= {\n    nombre:\"Luis\"\n}\n;\nObject.seal(usuario);\nconsole.log(Object.isSealed(usuario));\n\ntrue",
      },
    ],
    "errores": [
      {
        "texto": "❌ Pensar que congela completamente el objeto — Resultado: `seal()` permite modificar valores. Para bloquear todo:",
        "code": "const usuario= {\n    nombre:\"Ana\"\n};\nObject.seal(usuario);\nusuario.nombre=\"María\";console.log(usuario);\n\n{nombre:\"María\"\n}\n\nObject.freeze();",
      },
      "❌ Confundir `seal()` con `freeze()`",
      "`Object.seal()` → ❌ · ❌ · ✅",
      "`Object.freeze()` → ❌ · ❌ · ❌",
      {
        "texto": "❌ Pensar que crea una copia — No crea un nuevo objeto. Devuelve el mismo: Resultado:",
        "code": "const copia=Object.seal(usuario);\n\ncopia===usuario\n\ntrue",
      },
      {
        "texto": "❌ No considerar objetos anidados — Esto funciona. ¿Por qué? Porque `seal()` solo protege el primer nivel. Es una protección **superficial** (*shallow*).",
        "code": "const usuario= {\n    direccion: {\n        ciudad:\"Lima\"\n    }\n};\nObject.seal(usuario);\nusuario.direccion.ciudad=\"Cusco\";",
      },
    ],
    "casos": [
      "Configuraciones que no deben cambiar de estructura:",
      "Objetos compartidos entre módulos.",
      "Modelos de datos con propiedades definidas.",
      "Evitar errores accidentales durante desarrollo.",
      "Controlar modificaciones en aplicaciones grandes.",
    ],
    "relacion": [
      "`Object.preventExtensions()` → Impide agregar propiedades nuevas",
      "`Object.seal()` → Impide agregar y eliminar propiedades",
      "`Object.freeze()` → Bloquea completamente el objeto",
      "`Object.isSealed()` → Comprueba si está sellado",
      "`Object.isFrozen()` → Comprueba si está congelado",
      "Jerarquía:",
      "Cada nivel agrega más restricciones.",
    ],
    "analogia": "Imagina una casa 🏠:",
    "fuente": "**MDN Web Docs:** https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/seal **Especificación ECMAScript:** https://tc39.es/ecma262/#sec-object.seal",
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.seal()?",
        "opciones": [
          "Object.hasOwn(obj, prop)",
          "Object.is(valor1, valor2)",
          "obj.hasOwnProperty(prop)",
          "Object.seal(obj)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.seal()?",
        "opciones": [
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Object.seal() es un método estático del objeto global Object que permite sellar un objeto, evitando que se puedan agregar o eliminar…",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.seal()?",
        "opciones": [
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Crear objetos con herencia prototípica personalizada.",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Se utiliza para: Proteger estructuras de datos contra cambios de forma accidental.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.seal()?",
        "opciones": [
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "Confundir seal() con freeze()",
        ],
        "correcta": 3,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-seal-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "❌ Pensar que congela completamente el objeto — Resultado",
              "descripcion": "`seal()` permite modificar valores. Para bloquear todo:",
            },
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es un método estático de `Object`.",
            },
            {
              "concepto": "Error común",
              "descripcion": "❌ Pensar que congela completamente el objeto — Resultado: `seal()` permite modificar valores. Para bloquear todo:",
            },
            {
              "concepto": "Caso de uso",
              "descripcion": "Configuraciones que no deben cambiar de estructura:",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "❌ Pensar que congela completamente el objeto — Resultado → `seal()` permite modificar valores. Para bloquear todo: · ¿Qué es? → Es un método estático de `Object`. · Error común → ❌ Pensar que congela completamente el objeto — Resultado: `seal()` permite modificar valores. Para bloquear todo: · Caso de uso → Configuraciones que no deben cambiar de estructura:",
        },
        {
          "id": "js-object-seal-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "`Object.seal()` es un __________ `Object` que permite sellar un objeto, evitando que se puedan agregar o eliminar propiedades, pero permitiendo modificar los valores de las propiedades existentes.",
          "opciones": [
            "método estático del objeto global",
            "directa y propia",
            "método estático",
            "método",
          ],
          "correcto": "método estático del objeto global",
          "pista": "El término empieza por «m…».",
          "solucion": "método estático del objeto global: `Object.seal()` es un método estático del objeto global `Object` que permite sellar un objeto, evitando que se puedan agregar o eliminar propiedades, pero permitiendo modificar los valores de las propiedades existentes.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "Sellar un objeto",
          "explicacion": "",
          "codigo": "const usuario= {\n    nombre:\"Josué\",\n    edad:17\n};\nObject.seal(usuario);\nusuario.edad=18;\nconsole.log(usuario);\n\n{nombre:\"Josué\",edad:18}",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "Intentar agregar una propiedad",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Ana\"\n};\nObject.seal(persona);\npersona.edad=25;\nconsole.log(persona);\n\n{nombre:\"Ana\"\n}",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "Intentar eliminar una propiedad",
          "explicacion": "",
          "codigo": "const producto= {\n    nombre:\"Laptop\",\n    precio:2500\n}\n;Object.seal(producto);\ndelete producto.precio;\nconsole.log(producto);\n\n{nombre:\"Laptop\",precio:2500\n}",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "Verificar si un objeto está sellado",
          "explicacion": "",
          "codigo": "const usuario= {\n    nombre:\"Luis\"\n}\n;\nObject.seal(usuario);\nconsole.log(Object.isSealed(usuario));\n\ntrue",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-preventextensions": {
    "id": "js-object-preventextensions",
    "titulo": "Object.preventExtensions",
    "icon": "🛡️",
    "categoria": "Object",
    "firma": "Object.preventExtensions(obj)",
    "simulador": "object",
    "definicion": [
      "`Object.preventExtensions()`",
      "Es un **método estático de **`Object` que impide que se **agreguen nuevas propiedades** a un objeto.",
    ],
    "queEs": [
      "Es una herramienta para convertir un objeto en **no extensible**.",
      "El objeto sigue existiendo y sus propiedades actuales pueden continuar siendo modificadas o eliminadas, dependiendo de sus descriptores.",
    ],
    "paraQueSirve": [
      "Sirve para:",
      "🔒 Evitar que se agreguen propiedades accidentalmente.",
      "🛡️ Controlar la estructura de un objeto.",
      "🧩 Crear objetos cuya cantidad de propiedades no pueda aumentar.",
      "🧪 Aplicar restricciones durante validaciones o configuraciones.",
    ],
    "comoFunciona": [
      "Después:",
      "La propiedad `email` **no podrá agregarse**.",
      "Pero las propiedades existentes todavía pueden modificarse:",
      "Y también pueden eliminarse:",
      "Por eso:",
      "`preventExtensions()`** bloquea la adición de propiedades, no todas las modificaciones.**",
    ],
    "sintaxis": [
      {
        "code": "Object.preventExtensions(obj)",
      },
      {
        "caption": "Retorno",
        "code": "const usuario= {};\nconst resultado=Object.preventExtensions(usuario);\nconsole.log(resultado===usuario);",
      },
      {
        "caption": "Resultado:",
        "code": "true",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Impedir nuevas propiedades",
        "code": "const persona= {\n    nombre:\"Josué\"\n};\nObject.preventExtensions(persona);\npersona.edad=17;\nconsole.log(persona);",
      },
      {
        "titulo": "2. Las propiedades existentes sí pueden modificarse",
        "code": "const persona= {\n    nombre:\"Josué\"\n};\nObject.preventExtensions(persona);\npersona.nombre=\"Juan\";\nconsole.log(persona.nombre);\n\nJuan",
      },
      {
        "titulo": "3. Las propiedades existentes pueden eliminarse",
        "code": "const persona= {\n    nombre:\"Josué\",\n    edad:17\n};\nObject.preventExtensions(persona);\ndelete persona.edad;\nconsole.log(persona);\n\n{\n\tnombre:\"Josué\"\n}",
      },
      {
        "titulo": "4. Comprobar si el objeto es extensible",
        "descripcion": "Puedes utilizar:",
        "code": "Object.isExtensible(persona);\n\nconst persona= {};\nconsole.log(Object.isExtensible(persona));// true\nObject.preventExtensions(persona);\nconsole.log(Object.isExtensible(persona));// false",
      },
    ],
    "errores": [
      "Confundirlo con `Object.seal()` — No son lo mismo.",
      "`preventExtensions()` → ❌ · ✅ · ✅",
      "`seal()` → ❌ · ✅ · ❌",
      "`freeze()` → ❌ · ❌ · ❌",
      {
        "texto": "La progresión mental es:",
        "code": "preventExtensions()\n        ↓\n\"No agregues propiedades\"\n\nseal()\n        ↓\n\"No agregues ni elimines propiedades\"\n\nfreeze()\n        ↓\n\"No agregues, elimines ni modifiques propiedades\"",
      },
      {
        "texto": "Pensar que vuelve al objeto completamente inmutable — Esto: **NO significa**: Significa:",
        "code": "Object.preventExtensions(obj);\n\nobjeto inmutable ❌\n\nobjeto no extensible ✅",
      },
    ],
    "casos": [
      "Proteger la estructura de objetos.",
      "Evitar propiedades agregadas accidentalmente.",
      "Validaciones de objetos.",
      "APIs o configuraciones donde la estructura debe permanecer limitada.",
      "Programación defensiva.",
    ],
    "relacion": [
      "También se relaciona con:",
      "porque los **descriptores de propiedades** determinan qué operaciones siguen siendo posibles.",
    ],
    "analogia": "Imagina un local 🏪. `Object.preventExtensions()` coloca un cartel: 🚫 **“No se pueden agregar nuevas habitaciones.”** Pero las habitaciones que ya existen todavía pueden: cambiarse 🔧 remodelarse 🎨 incluso eliminarse 🗑️ Es decir:",
    "fuente": "MDN Web Docs — `Object.preventExtensions()`",
    "notasPersonales": [
      "**Regla mental:**",
      "`preventExtensions()` = **“Puedes modificar lo que ya existe, pero no puedes agregar nuevas propiedades.”**",
      "🔒 **Bloquea la extensión del objeto, no lo congela**",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.preventExtensions?",
        "opciones": [
          "Object.hasOwn(obj, prop)",
          "obj.hasOwnProperty(prop)",
          "Object.is(valor1, valor2)",
          "Object.preventExtensions(obj)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.preventExtensions?",
        "opciones": [
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Es un método estático de Object que impide que se agreguen nuevas propiedades a un objeto.",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.preventExtensions?",
        "opciones": [
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Crear objetos con herencia prototípica personalizada.",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Sirve para: 🔒 Evitar que se agreguen propiedades accidentalmente.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.preventExtensions?",
        "opciones": [
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Confundirlo con Object.seal() — No son lo mismo.",
        ],
        "correcta": 3,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-preventextensions-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "Pensar que vuelve al objeto completamente inmutable — Esto",
              "descripcion": "NO significa: Significa:",
            },
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es una herramienta para convertir un objeto en no extensible.",
            },
            {
              "concepto": "Error común",
              "descripcion": "Confundirlo con `Object.seal()` — No son lo mismo.",
            },
            {
              "concepto": "Caso de uso",
              "descripcion": "Proteger la estructura de objetos.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "Pensar que vuelve al objeto completamente inmutable — Esto → NO significa: Significa: · ¿Qué es? → Es una herramienta para convertir un objeto en no extensible. · Error común → Confundirlo con `Object.seal()` — No son lo mismo. · Caso de uso → Proteger la estructura de objetos.",
        },
        {
          "id": "js-object-preventextensions-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "Es un __________ `Object` que impide que se agreguen nuevas propiedades a un objeto.",
          "opciones": [
            "método estático de",
            "directa y propia",
            "método estático del objeto global",
            "método estático",
          ],
          "correcto": "método estático de",
          "pista": "El término empieza por «m…».",
          "solucion": "método estático de: Es un método estático de `Object` que impide que se agreguen nuevas propiedades a un objeto.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Impedir nuevas propiedades",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Josué\"\n};\nObject.preventExtensions(persona);\npersona.edad=17;\nconsole.log(persona);",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Las propiedades existentes sí pueden modificarse",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Josué\"\n};\nObject.preventExtensions(persona);\npersona.nombre=\"Juan\";\nconsole.log(persona.nombre);\n\nJuan",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "3. Las propiedades existentes pueden eliminarse",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Josué\",\n    edad:17\n};\nObject.preventExtensions(persona);\ndelete persona.edad;\nconsole.log(persona);\n\n{\n\tnombre:\"Josué\"\n}",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "4. Comprobar si el objeto es extensible",
          "explicacion": "Puedes utilizar:",
          "codigo": "Object.isExtensible(persona);\n\nconst persona= {};\nconsole.log(Object.isExtensible(persona));// true\nObject.preventExtensions(persona);\nconsole.log(Object.isExtensible(persona));// false",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-isfrozen": {
    "id": "js-object-isfrozen",
    "titulo": "Object.isFrozen()`",
    "icon": "❄️",
    "categoria": "Object",
    "firma": "Object.isFrozen(obj)",
    "simulador": "object",
    "definicion": [
      "`Object.isFrozen()` es un **método estático del objeto global **`Object` que permite comprobar si un objeto está **congelado (*frozen*)**.",
      "Devuelve un valor booleano: `true` → si el objeto está congelado. `false` → si no está congelado.",
    ],
    "queEs": [
      "Es un **método estático** de `Object`.",
      "**Forma parte del lenguaje JavaScript (ECMAScript)**, **no de una Web API**.",
      "Se utiliza principalmente para verificar objetos que fueron protegidos mediante:",
      "Un objeto congelado significa:",
      "✅ Puede ser leído.",
      "❌ No puede agregar propiedades nuevas.",
      "❌ No puede eliminar propiedades existentes.",
      "❌ No puede modificar valores existentes.",
    ],
    "paraQueSirve": [
      "Se utiliza para:",
      "Verificar si un objeto está protegido contra cambios.",
      "Validar estados inmutables.",
      "Crear controles de seguridad en aplicaciones.",
      "Detectar si una configuración fue congelada.",
      "Realizar pruebas (*testing*) sobre objetos.",
    ],
    "comoFunciona": [
      "Recibe un objeto.",
      "Revisa las características internas del objeto: Si no permite extensiones. Si todas sus propiedades son no modificables (`writable: false`). Si sus propiedades no pueden eliminarse (`configurable: false`).",
      "Devuelve:",
      "si cumple las condiciones de un objeto congelado.",
      "Ejemplo:",
      "Proceso:",
    ],
    "sintaxis": [
      {
        "code": "Object.isFrozen(objeto);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Objeto normal",
        "code": "const persona= {\n    nombre:\"Luis\"\n};\nconsole.log(Object.isFrozen(persona));\n\nfalse",
      },
      {
        "titulo": "Objeto congelado",
        "code": "const usuario= {\n    nombre:\"Ana\",\n    edad:20\n};\nObject.freeze(usuario);\nconsole.log(Object.isFrozen(usuario));\n\ntrue",
      },
      {
        "titulo": "Comparación con `Object.seal()`",
        "code": "const producto= {\n    nombre:\"Laptop\"\n};\nObject.seal(producto);console.log(Object.isFrozen(producto));\n\nfalse\n\nproducto.nombre=\"PC\";",
      },
      {
        "titulo": "Un objeto congelado también está sellado",
        "code": "const config= {\n    modo:\"oscuro\"\n};Object.freeze(config);console.log(Object.isSealed(config));\n\ntrue\n\nfreeze()\n   ↓\nseal()\n   ↓\npreventExtensions()",
      },
      {
        "titulo": "Arrays congelados",
        "descripcion": "Los arrays también son objetos:",
        "code": "const numeros= [1,2,3];\nObject.freeze(numeros);console.log(Object.isFrozen(numeros));\n\ntrue",
      },
    ],
    "errores": [
      {
        "texto": "❌ Pensar que congela objetos internos — Resultado: ¿Por qué? Porque `freeze()` solo protege el primer nivel. Es una congelación: No:",
        "code": "const usuario= {\n    perfil: {\n        edad:17\n    }\n};\nObject.freeze(usuario);usuario.perfil.edad=18;console.log(usuario.perfil.edad);\n\n18\n\nShallow Freeze ✅\n\nDeep Freeze ❌",
      },
      {
        "texto": "❌ Confundir `isFrozen()` con `freeze()` — Incorrecto: No congela nada. Solo pregunta: \"¿Este objeto ya está congelado?\" Para congelar:",
        "code": "Object.isFrozen(usuario);\n\nObject.freeze(usuario);",
      },
      {
        "texto": "❌ Pensar que devuelve una copia — Resultado: No devuelve el objeto, devuelve un booleano.",
        "code": "const resultado=Object.isFrozen(usuario);\n\ntrue",
      },
      "❌ Confundirlo con `Object.isSealed()`",
      "`Object.isSealed()` → ¿Está sellado?",
      "`Object.isFrozen()` → ¿Está congelado?",
      {
        "texto": "Un objeto congelado: también es:",
        "code": "Object.isFrozen(obj)\n\nObject.isSealed(obj)",
      },
    ],
    "casos": [
      "Verificar configuraciones protegidas:",
      "Validar estados inmutables.",
      "Pruebas unitarias.",
      "Librerías que requieren objetos sin modificaciones.",
      "Depuración de aplicaciones grandes.",
    ],
    "relacion": [
      "`Object.freeze()` → Congela un objeto",
      "`Object.isFrozen()` → Comprueba si está congelado",
      "`Object.seal()` → Sella un objeto",
      "`Object.isSealed()` → Comprueba si está sellado",
      "`Object.preventExtensions()` → Bloquea nuevas propiedades",
      "`Object.isExtensible()` → Comprueba si permite extensiones",
      "Comparación completa",
      "Objeto normal → ✅ · ✅ · ✅",
      "`preventExtensions()` → ❌ · ✅ · ✅",
      "`seal()` → ❌ · ❌ · ✅",
      "`freeze()` → ❌ · ❌ · ❌",
    ],
    "analogia": "Imagina una caja de cristal 🧊:",
    "fuente": "**MDN Web Docs:** https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/isFrozen **Especificación ECMAScript:** https://tc39.es/ecma262/#sec-object.isfrozen",
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.isFrozen()`?",
        "opciones": [
          "obj.hasOwnProperty(prop)",
          "Object.is(valor1, valor2)",
          "Object.hasOwn(obj, prop)",
          "Object.isFrozen(obj)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.isFrozen()`?",
        "opciones": [
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Object.isFrozen() es un método estático del objeto global Object que permite comprobar si un objeto está congelado (frozen).",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.isFrozen()`?",
        "opciones": [
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Crear objetos con herencia prototípica personalizada.",
          "Se utiliza para: Verificar si un objeto está protegido contra cambios.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.isFrozen()`?",
        "opciones": [
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "Pensar que devuelve una copia — Resultado: No devuelve el objeto, devuelve un booleano.",
        ],
        "correcta": 3,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-isfrozen-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "❌ Pensar que congela objetos internos — Resultado",
              "descripcion": "¿Por qué? Porque `freeze()` solo protege el primer nivel. Es una congelación: No:",
            },
            {
              "concepto": "❌ Confundir `isFrozen()` con `freeze()` — Incorrecto",
              "descripcion": "No congela nada. Solo pregunta: \"¿Este objeto ya está congelado?\" Para congelar:",
            },
            {
              "concepto": "❌ Pensar que devuelve una copia — Resultado",
              "descripcion": "No devuelve el objeto, devuelve un booleano.",
            },
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es un método estático de `Object`.",
            },
            {
              "concepto": "Error común",
              "descripcion": "❌ Pensar que congela objetos internos — Resultado: ¿Por qué? Porque `freeze()` solo protege el primer nivel. Es una congelación: No:",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "❌ Pensar que congela objetos internos — Resultado → ¿Por qué? Porque `freeze()` solo protege el primer nivel. Es una congelación: No: · ❌ Confundir `isFrozen()` con `freeze()` — Incorrecto → No congela nada. Solo pregunta: \"¿Este objeto ya está congelado?\" Para congelar: · ❌ Pensar que devuelve una copia — Resultado → No devuelve el objeto, devuelve un booleano. · ¿Qué es? → Es un método estático de `Object`. · Error común → ❌ Pensar que congela objetos internos — Resultado: ¿Por qué? Porque `freeze()` solo protege el primer nivel. Es una congelación: No:",
        },
        {
          "id": "js-object-isfrozen-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "`Object.isFrozen()` es un __________ `Object` que permite comprobar si un objeto está congelado (*frozen*).",
          "opciones": [
            "método estático del objeto global",
            "directa y propia",
            "método estático",
            "método",
          ],
          "correcto": "método estático del objeto global",
          "pista": "El término empieza por «m…».",
          "solucion": "método estático del objeto global: `Object.isFrozen()` es un método estático del objeto global `Object` que permite comprobar si un objeto está congelado (*frozen*).",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "Objeto normal",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Luis\"\n};\nconsole.log(Object.isFrozen(persona));\n\nfalse",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "Objeto congelado",
          "explicacion": "",
          "codigo": "const usuario= {\n    nombre:\"Ana\",\n    edad:20\n};\nObject.freeze(usuario);\nconsole.log(Object.isFrozen(usuario));\n\ntrue",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "Comparación con `Object.seal()`",
          "explicacion": "",
          "codigo": "const producto= {\n    nombre:\"Laptop\"\n};\nObject.seal(producto);console.log(Object.isFrozen(producto));\n\nfalse\n\nproducto.nombre=\"PC\";",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "Un objeto congelado también está sellado",
          "explicacion": "",
          "codigo": "const config= {\n    modo:\"oscuro\"\n};Object.freeze(config);console.log(Object.isSealed(config));\n\ntrue\n\nfreeze()\n   ↓\nseal()\n   ↓\npreventExtensions()",
          "salida": "",
        },
        {
          "paso": 5,
          "titulo": "Arrays congelados",
          "explicacion": "Los arrays también son objetos:",
          "codigo": "const numeros= [1,2,3];\nObject.freeze(numeros);console.log(Object.isFrozen(numeros));\n\ntrue",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-issealed": {
    "id": "js-object-issealed",
    "titulo": "Object.isSealed",
    "icon": "🛡️",
    "categoria": "Object",
    "firma": "Object.isSealed(obj)",
    "simulador": "object",
    "definicion": [
      "`Object.isSealed()` es un **método estático del objeto global **`Object` que permite comprobar si un objeto está **sellado (*sealed*)**.",
      "Devuelve un valor booleano: `true` → si el objeto está sellado. `false` → si no está sellado.",
    ],
    "queEs": [
      "Es un **método estático** de `Object`.",
      "**Forma parte del lenguaje JavaScript (ECMAScript)**, **no de una Web API**.",
      "Se utiliza principalmente para verificar el estado de un objeto después de usar:",
      "Un objeto sellado significa:",
      "✅ Puede modificar valores existentes.",
      "❌ No puede agregar nuevas propiedades.",
      "❌ No puede eliminar propiedades existentes.",
    ],
    "paraQueSirve": [
      "Se utiliza para:",
      "Verificar si un objeto fue sellado con `Object.seal()`.",
      "Validar el estado de objetos antes de modificarlos.",
      "Crear controles de seguridad en aplicaciones.",
      "Evitar cambios estructurales inesperados.",
    ],
    "comoFunciona": [
      "Recibe un objeto.",
      "Revisa las características internas del objeto: Si está extensible o no. Si sus propiedades tienen `configurable: false`.",
      "Devuelve:",
      "si cumple las condiciones de un objeto sellado.",
      "Ejemplo:",
      "Proceso:",
    ],
    "sintaxis": [
      {
        "code": "Object.isSealed(objeto);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Objeto no sellado",
        "code": "const persona= {\n    nombre:\"Luis\"\n};\nconsole.log(Object.isSealed(persona));\n\nfalse",
      },
      {
        "titulo": "Objeto sellado",
        "code": "const usuario= {\n    nombre:\"Ana\",\n    edad:20\n};\nObject.seal(usuario);\nconsole.log(Object.isSealed(usuario));\n\ntrue",
      },
      {
        "titulo": "Modificar una propiedad después de sellar",
        "code": "const producto= {\n    nombre:\"Laptop\",\n    precio:2500\n}; Object.seal(producto);\nproducto.precio=3000;\nconsole.log(Object.isSealed(producto));\nconsole.log(producto);\n\ntrue\n\n{nombre:\"Laptop\",precio:3000\n}",
      },
      {
        "titulo": "Comparación con `Object.freeze()`",
        "code": "const config= {\n    modo:\"oscuro\"\n};\nObject.freeze(config);console.log(Object.isSealed(config));\n\ntrue",
      },
    ],
    "errores": [
      {
        "texto": "❌ Pensar que verifica si fue creado con `Object.seal()` — Incorrecto: No pregunta: \"¿Usaste exactamente Object.seal()?\" Pregunta: \"¿El objeto tiene las características de un objeto sellado?\"",
        "code": "Object.isSealed(objeto);",
      },
      "❌ Confundirlo con `Object.isFrozen()`",
      {
        "texto": "`Object.isSealed()` — Comprueba: Pero puede modificar valores.",
        "code": "¿No puede agregar?\n¿No puede eliminar?",
      },
      {
        "texto": "`Object.isFrozen()` — Comprueba:",
        "code": "¿No puede agregar?\n¿No puede eliminar?\n¿No puede modificar?",
      },
      {
        "texto": "❌ Usarlo con valores primitivos — Ejemplo: Resultado: Los valores primitivos se consideran sellados porque no pueden modificarse como objetos.",
        "code": "Object.isSealed(10);\n\ntrue",
      },
      {
        "texto": "❌ Pensar que revisa objetos internos — Resultado: Porque solo se selló el objeto externo.",
        "code": "const usuario= {\n    datos: {\n        edad:20\n    }\n};\nObject.seal(usuario);\nconsole.log(Object.isSealed(usuario.datos));\n\nfalse",
      },
    ],
    "casos": [
      "Validar objetos protegidos:",
      "Sistemas donde varios módulos comparten objetos.",
      "Pruebas (*testing*) para comprobar restricciones.",
      "Depuración de código.",
      "Librerías que necesitan verificar estados internos.",
    ],
    "relacion": [
      "`Object.seal()` → Sella un objeto",
      "`Object.isSealed()` → Comprueba si está sellado",
      "`Object.freeze()` → Congela un objeto",
      "`Object.isFrozen()` → Comprueba si está congelado",
      "`Object.preventExtensions()` → Evita nuevas propiedades",
      "`Object.isExtensible()` → Comprueba si permite nuevas propiedades",
      "Relación:",
    ],
    "analogia": "Imagina una caja 📦:",
    "fuente": "**MDN Web Docs:** https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object/isSealed **Especificación ECMAScript:** https://tc39.es/ecma262/#sec-object.issealed",
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.isSealed?",
        "opciones": [
          "Object.hasOwn(obj, prop)",
          "Object.is(valor1, valor2)",
          "Object.isSealed(obj)",
          "obj.hasOwnProperty(prop)",
        ],
        "correcta": 2,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.isSealed?",
        "opciones": [
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Object.isSealed() es un método estático del objeto global Object que permite comprobar si un objeto está sellado (sealed).",
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
        ],
        "correcta": 2,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.isSealed?",
        "opciones": [
          "Se utiliza para: Verificar si un objeto fue sellado con Object.seal().",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Crear objetos con herencia prototípica personalizada.",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.isSealed?",
        "opciones": [
          "Pensar que verifica si fue creado con Object.seal() — Incorrecto: No pregunta: \"¿Usaste exactamente Object.seal()?\" Pregunta:…",
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
        ],
        "correcta": 0,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-issealed-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "`Object.isSealed()` — Comprueba",
              "descripcion": "Pero puede modificar valores.",
            },
            {
              "concepto": "❌ Usarlo con valores primitivos — Ejemplo",
              "descripcion": "Resultado: Los valores primitivos se consideran sellados porque no pueden modificarse como objetos.",
            },
            {
              "concepto": "❌ Pensar que revisa objetos internos — Resultado",
              "descripcion": "Porque solo se selló el objeto externo.",
            },
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es un método estático de `Object`.",
            },
            {
              "concepto": "Error común",
              "descripcion": "❌ Pensar que verifica si fue creado con `Object.seal()` — Incorrecto: No pregunta: \"¿Usaste exactamente Object.seal()?\" Pregunta: \"¿El objeto tiene las características de…",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "`Object.isSealed()` — Comprueba → Pero puede modificar valores. · ❌ Usarlo con valores primitivos — Ejemplo → Resultado: Los valores primitivos se consideran sellados porque no pueden modificarse como objetos. · ❌ Pensar que revisa objetos internos — Resultado → Porque solo se selló el objeto externo. · ¿Qué es? → Es un método estático de `Object`. · Error común → ❌ Pensar que verifica si fue creado con `Object.seal()` — Incorrecto: No pregunta: \"¿Usaste exactamente Object.seal()?\" Pregunta: \"¿El objeto tiene las características de…",
        },
        {
          "id": "js-object-issealed-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "`Object.isSealed()` es un __________ `Object` que permite comprobar si un objeto está sellado (*sealed*).",
          "opciones": [
            "método estático del objeto global",
            "directa y propia",
            "método estático",
            "método",
          ],
          "correcto": "método estático del objeto global",
          "pista": "El término empieza por «m…».",
          "solucion": "método estático del objeto global: `Object.isSealed()` es un método estático del objeto global `Object` que permite comprobar si un objeto está sellado (*sealed*).",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "Objeto no sellado",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Luis\"\n};\nconsole.log(Object.isSealed(persona));\n\nfalse",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "Objeto sellado",
          "explicacion": "",
          "codigo": "const usuario= {\n    nombre:\"Ana\",\n    edad:20\n};\nObject.seal(usuario);\nconsole.log(Object.isSealed(usuario));\n\ntrue",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "Modificar una propiedad después de sellar",
          "explicacion": "",
          "codigo": "const producto= {\n    nombre:\"Laptop\",\n    precio:2500\n}; Object.seal(producto);\nproducto.precio=3000;\nconsole.log(Object.isSealed(producto));\nconsole.log(producto);\n\ntrue\n\n{nombre:\"Laptop\",precio:3000\n}",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "Comparación con `Object.freeze()`",
          "explicacion": "",
          "codigo": "const config= {\n    modo:\"oscuro\"\n};\nObject.freeze(config);console.log(Object.isSealed(config));\n\ntrue",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-isextensible": {
    "id": "js-object-isextensible",
    "titulo": "Object.isExtensible",
    "icon": "🪟",
    "categoria": "Object",
    "firma": "Object.isExtensible(obj)",
    "simulador": "object",
    "definicion": [
      "`Object.isExtensible()`",
      "Es un **método estático de **`Object` que determina si un objeto **puede recibir nuevas propiedades**.",
    ],
    "queEs": [
      "Es una herramienta que permite comprobar si un objeto es **extensible**.",
      "En otras palabras, pregunta:",
      "**“¿A este objeto todavía se le pueden agregar nuevas propiedades?”**",
      "Devuelve únicamente:",
    ],
    "paraQueSirve": [
      "Sirve para:",
      "🔍 Comprobar si un objeto permite nuevas propiedades.",
      "🛡️ Verificar restricciones aplicadas a un objeto.",
      "🧩 Comprobar el efecto de `Object.preventExtensions()`.",
      "🔒 Detectar si un objeto fue sellado o congelado.",
      "🧪 Validar el estado de un objeto antes de modificarlo.",
    ],
    "comoFunciona": [
      "Un objeto normal es extensible:",
      "Resultado:",
      "Después podemos impedir que se agreguen nuevas propiedades:",
      "Resultado:",
      "Por lo tanto:",
    ],
    "sintaxis": [
      {
        "code": "Object.isExtensible(obj)",
      },
      {
        "caption": "Retorno",
        "code": "true",
      },
      {
        "caption": "si el objeto es extensible.",
        "code": "false",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Objeto extensible",
        "code": "const persona= {\n    nombre:\"Josué\"\n};\nconsole.log(Object.isExtensible(persona));\n\ntrue",
      },
      {
        "titulo": "2. Después de `Object.preventExtensions()`",
        "code": "const persona= {\n    nombre:\"Josué\"\n};\nObject.preventExtensions(persona);\nconsole.log(Object.isExtensible(persona));\n\nfalse",
      },
      {
        "titulo": "3. Con `Object.seal()`",
        "descripcion": "Un objeto sellado tampoco es extensible:",
        "code": "const persona= {\n    nombre:\"Josué\"\n};\nObject.seal(persona);\nconsole.log(Object.isExtensible(persona));\n\nfalse",
      },
      {
        "titulo": "4. Con `Object.freeze()`",
        "descripcion": "Un objeto congelado tampoco es extensible:",
        "code": "const persona= {\n    nombre:\"Josué\"\n};\nObject.freeze(persona);\nconsole.log(Object.isExtensible(persona));\n\nfalse\n\npreventExtensions() → false\nseal()              → false\nfreeze()            → false",
      },
    ],
    "errores": [
      {
        "texto": "Confundir extensible con modificable — Que un objeto sea: **no significa necesariamente que sus propiedades existentes no puedan modificarse.** Por ejemplo: Resultado: El objeto **no acepta propiedades nuevas**, pero todavía puede modificar propiedades existentes.",
        "code": "Object.isExtensible(obj)===false\n\nconst persona= {\n    nombre:\"Josué\"\n};\nObject.preventExtensions(persona);\npersona.nombre=\"Juan\";\nconsole.log(persona.nombre);\n\nJuan",
      },
      {
        "texto": "Confundirlo con `Object.isFrozen()` — `Object.isExtensible()` pregunta: **¿Puede recibir nuevas propiedades?** Mientras: pregunta si el objeto está **congelado**. Son preguntas diferentes.",
        "code": "Object.isFrozen(obj)",
      },
    ],
    "casos": [
      "Comprobar el estado de un objeto antes de modificarlo.",
      "Validar objetos recibidos por una función.",
      "Detectar si un objeto fue restringido.",
      "Trabajar junto con `preventExtensions()`, `seal()` y `freeze()`.",
      "Depuración de estructuras de objetos.",
    ],
    "relacion": [
      "La relación más directa es:",
      "Uno **restringe** y el otro **comprueba**.",
    ],
    "analogia": "Imagina una mochila 🎒. Una mochila normal: `Object.preventExtensions()` pone un cierre: `Object.isExtensible()` simplemente revisa el estado: **“¿Todavía puedo meter cosas?”** Y responde:",
    "fuente": "MDN Web Docs — `Object.isExtensible()`",
    "notasPersonales": [
      "**Regla mental:**",
      "`Object.isExtensible()` = **“¿Este objeto todavía acepta nuevas propiedades?”**",
      "🔍 **No modifica nada; solamente comprueba si el objeto puede extenderse.**",
      "**Pareja conceptual:**",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.isExtensible?",
        "opciones": [
          "Object.hasOwn(obj, prop)",
          "obj.hasOwnProperty(prop)",
          "Object.is(valor1, valor2)",
          "Object.isExtensible(obj)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.isExtensible?",
        "opciones": [
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Es un método estático de Object que determina si un objeto puede recibir nuevas propiedades.",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.isExtensible?",
        "opciones": [
          "Crear objetos con herencia prototípica personalizada.",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Sirve para: 🔍 Comprobar si un objeto permite nuevas propiedades.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.isExtensible?",
        "opciones": [
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Confundir extensible con modificable — Que un objeto sea: no significa necesariamente que sus propiedades existentes no puedan…",
        ],
        "correcta": 3,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-isextensible-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es una herramienta que permite comprobar si un objeto es extensible.",
            },
            {
              "concepto": "¿Cómo funciona?",
              "descripcion": "Un objeto normal es extensible:",
            },
            {
              "concepto": "Error común",
              "descripcion": "Confundir extensible con modificable — Que un objeto sea: no significa necesariamente que sus propiedades existentes no puedan modificarse. Por ejemplo: Resultado: El…",
            },
            {
              "concepto": "Caso de uso",
              "descripcion": "Comprobar el estado de un objeto antes de modificarlo.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "¿Qué es? → Es una herramienta que permite comprobar si un objeto es extensible. · ¿Cómo funciona? → Un objeto normal es extensible: · Error común → Confundir extensible con modificable — Que un objeto sea: no significa necesariamente que sus propiedades existentes no puedan modificarse. Por ejemplo: Resultado: El… · Caso de uso → Comprobar el estado de un objeto antes de modificarlo.",
        },
        {
          "id": "js-object-isextensible-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "Es un __________ `Object` que determina si un objeto puede recibir nuevas propiedades.",
          "opciones": [
            "método estático de",
            "directa y propia",
            "método estático del objeto global",
            "método estático",
          ],
          "correcto": "método estático de",
          "pista": "El término empieza por «m…».",
          "solucion": "método estático de: Es un método estático de `Object` que determina si un objeto puede recibir nuevas propiedades.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Objeto extensible",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Josué\"\n};\nconsole.log(Object.isExtensible(persona));\n\ntrue",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Después de `Object.preventExtensions()`",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Josué\"\n};\nObject.preventExtensions(persona);\nconsole.log(Object.isExtensible(persona));\n\nfalse",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "3. Con `Object.seal()`",
          "explicacion": "Un objeto sellado tampoco es extensible:",
          "codigo": "const persona= {\n    nombre:\"Josué\"\n};\nObject.seal(persona);\nconsole.log(Object.isExtensible(persona));\n\nfalse",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "4. Con `Object.freeze()`",
          "explicacion": "Un objeto congelado tampoco es extensible:",
          "codigo": "const persona= {\n    nombre:\"Josué\"\n};\nObject.freeze(persona);\nconsole.log(Object.isExtensible(persona));\n\nfalse\n\npreventExtensions() → false\nseal()              → false\nfreeze()            → false",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-defineproperty": {
    "id": "js-object-defineproperty",
    "titulo": "Object.defineProperty()",
    "icon": "⚙️",
    "categoria": "Object",
    "firma": "Object.defineProperty(obj, prop, desc)",
    "simulador": "object",
    "definicion": [
      "Es un método estático en JavaScript que permite definir una nueva propiedad directamente sobre un objeto, o modificar una propiedad ya existente, configurando de manera ultra precisa el comportamiento y las restricciones de dicha propiedad a través de un descriptor de propiedades.",
    ],
    "queEs": [
      "Es un **método de metaprogramación y control avanzado** del objeto global `Object`.",
      "A diferencia de la asignación tradicional (como `objeto.propiedad = valor`), este método otorga el control absoluto sobre las reglas internas de la propiedad, decidiendo si se puede borrar, si se puede modificar, si aparece en los bucles, o incluso vinculando funciones de obtención y establecimiento (*getters* y *setters*).",
    ],
    "paraQueSirve": [
      "**Crear propiedades de solo lectura:** Proteger variables críticas dentro de un objeto para que ningún otro script o desarrollador pueda sobrescribir su valor por accidente.",
      "**Ocultar propiedades en iteraciones:** Crear llaves internas que funcionen en el objeto pero que no aparezcan al usar `Object.keys()` o bucles `for...in`.",
      "**Inmutabilidad quirúrgica:** Impedir que una propiedad específica sea eliminada del objeto mediante el operador `delete`.",
      "**Reactividad y Computación de datos:** Interceptar el momento exacto en que alguien lee o modifica un valor para ejecutar código personalizado (base de la reactividad en frameworks de Frontend).",
    ],
    "comoFunciona": [
      "El método recibe tres argumentos: el objeto objetivo, el nombre de la llave y un **objeto descriptor**. Este descriptor puede ser de dos tipos (no se pueden mezclar):",
      "**Descriptor de Datos:** Configura un valor directo mediante las banderas: `value`: El valor real de la propiedad (cualquier tipo de JavaScript). `writable`: Si es `true`, el valor se puede cambiar. Por defecto es `false`. `enumerable`: Si es `true`, aparece en bucles y listados. Por defecto es `false`. `configurable`: Si es `true`, la propiedad puede ser eliminada o sus banderas modificadas en el futuro. Por defecto es `false`.",
      "**Descriptor de Acceso:** Configura funciones interceptoras en lugar de un valor directo: `get`: Una función que se ejecuta automáticamente al leer la propiedad. `set`: Una función que recibe el nuevo valor asignado y se ejecuta al intentar modificarla.",
    ],
    "sintaxis": [
      {
        "code": "Object.defineProperty(obj, prop, descriptor);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Crear una constante de solo lectura y oculta",
        "code": "const configuracion = {};\n\nObject.defineProperty(configuracion, \"PI\", {\n    value: 3.14159,\n    writable: false,      // No se puede cambiar el valor\n    enumerable: false,    // No aparecerá en Object.keys()\n    configurable: false   // No se puede borrar con delete\n});\n\nconfiguracion.PI = 5; // Es ignorado silenciosamente (o lanza error en 'use strict')\nconsole.log(configuracion.PI); // Salida: 3.14159\nconsole.log(Object.keys(configuracion)); // Salida: [] (Está oculta)",
      },
      {
        "titulo": "2. Uso de Getters y Setters para validación dinámicas",
        "code": "const usuario = { _edad: 20 };\n\nObject.defineProperty(usuario, \"edad\", {\n    get() {\n        return `${this._edad} años`;\n    },\n    set(nuevaEdad) {\n        if (nuevaEdad < 0) {\n            console.error(\"❌ La edad no puede ser negativa.\");\n        } else {\n            this._edad = nuevaEdad;\n        }\n    }\n});\n\nconsole.log(usuario.edad); // Salida: \"20 años\"\nusuario.edad = -5;         // Salida: ❌ La edad no puede ser negativa.",
      },
    ],
    "errores": [
      "**Mezclar llaves prohibidas:** Intentar poner `value` o `writable` en el mismo descriptor donde declaraste un `get` o un `set` provocará un error crítico de tipo `TypeError`.",
      "**Causar bucles infinitos en setters/getters:** Si dentro del `get()` de la propiedad `\"edad\"` mandas a llamar a `this.edad`, la función se llamará a sí misma indefinidamente hasta romper la memoria (*Maximum call stack size exceeded*).",
      "Por eso se suelen usar variables internas con guion bajo (ej. `this._edad`).",
      "**Olvidar que por defecto todo es **`false`**:** Al usar `defineProperty`, las banderas `writable`, `enumerable` y `configurable` se inicializan en `false` si no las declaras explícitamente.",
      "(Al crear propiedades de forma tradicional con el punto `{ a: 1 }`, todas nacen en `true`).",
    ],
    "casos": [
      "**Creación de librerías y SDKs corporativos:** Asegurar que los tokens de configuración o las URLs base del sistema no puedan ser alteradas en tiempo de ejecución por scripts de terceros.",
      "**Sistemas de Reactividad:** Versiones clásicas de frameworks como Vue.js (Vue 2) utilizaban masivamente `Object.defineProperty()` para recorrer todas las propiedades de tus componentes y transformarlas en *getters* y *setters*, logrando actualizar la pantalla automáticamente cuando cambiabas un dato.",
    ],
    "relacion": [
      "`Object.defineProperties()`**:** Su hermano mayor, el cual permite definir múltiples propiedades configuradas al mismo tiempo pasando un objeto masivo de descriptores.",
      "`Object.getOwnPropertyDescriptor()`**:** El método inverso. Te permite pasarle un objeto y una llave para inspeccionar cuáles son sus banderas de configuración actuales (`writable`, `enumerable`, etc.).",
      "`Proxy`** (ES6):** La alternativa moderna y más potente de JavaScript para interceptar objetos completos de manera global en lugar de tener que configurar propiedad por propiedad.",
    ],
    "analogia": "Imagínate que estás construyendo una **casa** y vas a instalar las **puertas**. Poner una propiedad de forma normal (`obj.puerta = 'madera'`) es como comprar una puerta de madera común de ferretería: cualquiera puede abrirla, pintarla, cerrarla o quitarla con un destornillador. Usar `Object.defineProperty()` es el equivalente exacto a **contratar a un ingeniero especializado para blindar la puerta**: tú configuras mediante un panel si la puerta se puede pintar (`writable`), si es invisible a los ojos de los vecinos (`enumerable`), o si está cementada a la pared para que nadie pueda removerla jamás de la estructura de la casa (`configurable`).",
    "fuente": "MDN Web Docs - Object.defineProperty()",
    "notasPersonales": [
      "💡 *Tip Pro:* Si estás trabajando en modo estricto de JavaScript (`\"use strict\";`), cualquier intento de violar una regla de `defineProperty` (como intentar escribir sobre una propiedad que tiene `writable: false`) detendrá el programa inmediatamente lanzando un error en la consola. Esto es ideal en entornos de desarrollo exigentes porque te avisa al instante si alguien está intentando hackear o romper el flujo esperado de tus estructuras de datos.",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.defineProperty()?",
        "opciones": [
          "obj.hasOwnProperty(prop)",
          "Object.defineProperty(obj, prop, desc)",
          "Object.hasOwn(obj, prop)",
          "Object.is(valor1, valor2)",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.defineProperty()?",
        "opciones": [
          "Es un método estático en JavaScript que permite definir una nueva propiedad directamente sobre un objeto, o modificar una propiedad ya…",
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.defineProperty()?",
        "opciones": [
          "Crear objetos con herencia prototípica personalizada.",
          "Crear propiedades de solo lectura: Proteger variables críticas dentro de un objeto para que ningún otro script o desarrollador…",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.defineProperty()?",
        "opciones": [
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "Mezclar llaves prohibidas: Intentar poner value o writable en el mismo descriptor donde declaraste un get o un set provocará un…",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
        ],
        "correcta": 2,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-defineproperty-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "Crear propiedades de solo lectura",
              "descripcion": "Proteger variables críticas dentro de un objeto para que ningún otro script o desarrollador pueda sobrescribir su valor por accidente.",
            },
            {
              "concepto": "Ocultar propiedades en iteraciones",
              "descripcion": "Crear llaves internas que funcionen en el objeto pero que no aparezcan al usar `Object.keys()` o bucles `for...in`.",
            },
            {
              "concepto": "Inmutabilidad quirúrgica",
              "descripcion": "Impedir que una propiedad específica sea eliminada del objeto mediante el operador `delete`.",
            },
            {
              "concepto": "Reactividad y Computación de datos",
              "descripcion": "Interceptar el momento exacto en que alguien lee o modifica un valor para ejecutar código personalizado (base de la reactividad en frameworks de Frontend).",
            },
            {
              "concepto": "`Object.defineProperties()`",
              "descripcion": "Su hermano mayor, el cual permite definir múltiples propiedades configuradas al mismo tiempo pasando un objeto masivo de descriptores.",
            },
            {
              "concepto": "`Object.getOwnPropertyDescriptor()`",
              "descripcion": "El método inverso. Te permite pasarle un objeto y una llave para inspeccionar cuáles son sus banderas de configuración actuales (`writable`, `enumerable`,…",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "Crear propiedades de solo lectura → Proteger variables críticas dentro de un objeto para que ningún otro script o desarrollador pueda sobrescribir su valor por accidente. · Ocultar propiedades en iteraciones → Crear llaves internas que funcionen en el objeto pero que no aparezcan al usar `Object.keys()` o bucles `for...in`. · Inmutabilidad quirúrgica → Impedir que una propiedad específica sea eliminada del objeto mediante el operador `delete`. · Reactividad y Computación de datos → Interceptar el momento exacto en que alguien lee o modifica un valor para ejecutar código personalizado (base de la reactividad en frameworks de Frontend). · `Object.defineProperties()` → Su hermano mayor, el cual permite definir múltiples propiedades configuradas al mismo tiempo pasando un objeto masivo de descriptores. · `Object.getOwnPropertyDescriptor()` → El método inverso. Te permite pasarle un objeto y una llave para inspeccionar cuáles son sus banderas de configuración actuales (`writable`, `enumerable`,…",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Crear una constante de solo lectura y oculta",
          "explicacion": "",
          "codigo": "const configuracion = {};\n\nObject.defineProperty(configuracion, \"PI\", {\n    value: 3.14159,\n    writable: false,      // No se puede cambiar el valor\n    enumerable: false,    // No aparecerá en Object.keys()\n    configurable: false   // No se puede borrar con delete\n});\n\nconfiguracion.PI = 5; // Es ignorado silenciosamente (o lanza error en 'use strict')\nconsole.log(configuracion.PI); // Salida: 3.14159\nconsole.log(Object.keys(configuracion)); // Salida: [] (Está oculta)",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Uso de Getters y Setters para validación dinámicas",
          "explicacion": "",
          "codigo": "const usuario = { _edad: 20 };\n\nObject.defineProperty(usuario, \"edad\", {\n    get() {\n        return `${this._edad} años`;\n    },\n    set(nuevaEdad) {\n        if (nuevaEdad < 0) {\n            console.error(\"❌ La edad no puede ser negativa.\");\n        } else {\n            this._edad = nuevaEdad;\n        }\n    }\n});\n\nconsole.log(usuario.edad); // Salida: \"20 años\"\nusuario.edad = -5;         // Salida: ❌ La edad no puede ser negativa.",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-defineproperties": {
    "id": "js-object-defineproperties",
    "titulo": "Object.defineProperties",
    "icon": "⚙️",
    "categoria": "Object",
    "firma": "Object.defineProperties(obj, descs)",
    "simulador": "object",
    "definicion": [
      "`Object.defineProperties()`",
      "Es un **método estático de **`Object` que permite **crear o modificar varias propiedades de un objeto al mismo tiempo**, definiendo sus características mediante **property descriptors**.",
    ],
    "queEs": [
      "Es una herramienta para controlar con precisión cómo se comportan las propiedades de un objeto.",
      "Por ejemplo, puedes decidir si una propiedad:",
      "puede cambiar su valor (`writable`)",
      "puede aparecer en `Object.keys()` (`enumerable`)",
      "puede ser eliminada o modificada (`configurable`)",
      "utiliza `get` y `set`",
    ],
    "paraQueSirve": [
      "Principalmente para:",
      "⚙️ Definir varias propiedades con características específicas.",
      "🔒 Controlar si una propiedad puede modificarse.",
      "👀 Controlar si una propiedad es enumerable.",
      "🗑️ Controlar si puede configurarse o eliminarse.",
      "🧮 Crear propiedades mediante `get` y `set`.",
      "🧩 Construir objetos con un comportamiento más controlado.",
    ],
    "comoFunciona": [
      "Recibe **dos argumentos principales**:",
      "El primero es el objeto que queremos modificar.",
      "El segundo es un objeto que describe **cada propiedad que queremos definir**.",
    ],
    "sintaxis": [
      {
        "code": "Object.defineProperties(obj, {\n    propiedad1: {\n        value:valor,\n        writable:true,\n        enumerable:true,\n        configurable:true\n    },\n\n    propiedad2: {\n        value:valor\n    }\n});",
      },
      {
        "caption": "Retorno",
        "code": "const persona= {};\nconst resultado=Object.defineProperties(persona, {\n    nombre: {\n        value:\"Josué\"\n    }\n});console.log(resultado===persona);// true",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Crear varias propiedades",
        "code": "const usuario= {};\nObject.defineProperties(usuario, {\n    nombre: {\n        value:\"Josué\",\n        writable:true,\n        enumerable:true,\n        configurable:true\n    },\n\n    edad: {\n        value:17,\n        writable:true,\n        enumerable:true,\n        configurable:true\n    }\n});\nconsole.log(usuario.nombre);\nconsole.log(usuario.edad);",
      },
      {
        "titulo": "2. Crear una propiedad que no pueda modificarse",
        "code": "const usuario= {};\nObject.defineProperties(usuario, {\n    id: {\n        value:100,\n        writable:false\n    }\n});\nusuario.id=200;\nconsole.log(usuario.id);// 100",
      },
      {
        "titulo": "3. Controlar `enumerable`",
        "code": "const usuario= {};\nObject.defineProperties(usuario, {\n    nombre: {\n        value:\"Josué\",\n        enumerable:true\n    },\n\n    password: {\n        value:\"123456\",\n        enumerable:false\n    }\n});\nconsole.log(Object.keys(usuario));\n\n[\"nombre\"]",
      },
      {
        "titulo": "4. Utilizar `get` y `set`",
        "code": "const persona= {\n    nombre:\"Josué\",\n    apellido:\"Rodriguez\"\n};\nObject.defineProperties(persona, {\n    nombreCompleto: {\n        get() {\n\t\t        return`${this.nombre}${this.apellido}`;\n        }\n    }\n});\nconsole.log(persona.nombreCompleto);// \"Josué Rodriguez\"",
      },
      {
        "titulo": "5. Varias propiedades a la vez",
        "descripcion": "Esta es justamente la principal diferencia frente a `Object.defineProperty()`:",
        "code": "Object.defineProperty(objeto,\"nombre\",descriptor);\n\nObject.defineProperties(objeto, {\n    nombre:descriptor,\n    edad:descriptor,\n    email:descriptor\n});",
      },
    ],
    "errores": [
      {
        "texto": "1. Confundirlo con `Object.defineProperty()` — → una propiedad. → varias propiedades.",
        "code": "Object.defineProperty()\n\nObject.defineProperties()",
      },
      {
        "texto": "2. Olvidar que los valores predeterminados de los descriptores son restrictivos — Por ejemplo: Si no especificas `writable`, `enumerable` o `configurable`, sus valores son `false`. Conceptualmente: Por eso, cuando quieres una propiedad que se comporte como una propiedad normal, suele ser necesario especificar explícitamente:",
        "code": "const obj= {};\nObject.defineProperties(obj, {\n    nombre: {\n        value:\"Josué\"\n    }\n});\n\n{\n\tvalue:\"Josué\",\n\twritable:false,\n\tenumerable:false,\n\tconfigurable:false\n}\n\n{\n\tvalue:\"Josué\",\n\twritable:true,\n\tenumerable:true,\n\tconfigurable:true\n}",
      },
      {
        "texto": "3. Mezclar `value` con `get`/`set` — Un descriptor es de tipo **data descriptor** o **accessor descriptor**. No debes definir simultáneamente: Es decir, `value`/`writable` pertenecen a un tipo, mientras `get`/`set` pertenecen al otro.",
        "code": "{\n\tvalue:10,\n\tget() {\n\t\treturn 10;\n\t}\n}",
      },
    ],
    "casos": [
      "Creación de objetos con propiedades controladas.",
      "Definición de propiedades de solo lectura.",
      "Creación de getters y setters.",
      "Diseño de objetos con comportamiento personalizado.",
      "Implementación de APIs y librerías.",
      "Control avanzado de objetos.",
      "Programación orientada a objetos en JavaScript.",
    ],
    "relacion": [
      "También se relaciona con:",
      "`Object.getOwnPropertyDescriptor()`",
      "`Object.getOwnPropertyDescriptors()`",
      "`Object.keys()`",
      "`Object.getOwnPropertyNames()`",
      "`Object.preventExtensions()`",
      "`Object.seal()`",
      "`Object.freeze()`",
    ],
    "analogia": "Imagina que estás construyendo una casa 🏠. Una propiedad normal sería simplemente: \"Esta habitación existe.\" Pero un **descriptor** permite poner reglas: \"Esta habitación existe, el dueño puede cambiarla, los visitantes pueden verla y además no se puede eliminar.\" `Object.defineProperties()` sería como **configurar varias habitaciones de la casa de una sola vez**, estableciendo las reglas de cada una.",
    "fuente": "MDN Web Docs — `Object.defineProperties()`.",
    "notasPersonales": [
      "`Object.defineProperties()` es un método estático de `Object` utilizado para definir o modificar **múltiples propiedades** mediante descriptores de propiedades.",
      "**Idea clave:**",
      "Y el concepto fundamental detrás de ambos es:",
      "**Property Descriptor → controlar cómo se comporta una propiedad.**",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.defineProperties?",
        "opciones": [
          "Object.is(valor1, valor2)",
          "Object.hasOwn(obj, prop)",
          "obj.hasOwnProperty(prop)",
          "Object.defineProperties(obj, descs)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.defineProperties?",
        "opciones": [
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Es un método estático de Object que permite crear o modificar varias propiedades de un objeto al mismo tiempo, definiendo sus…",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.defineProperties?",
        "opciones": [
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Crear objetos con herencia prototípica personalizada.",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Principalmente para: ⚙️ Definir varias propiedades con características específicas.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.defineProperties?",
        "opciones": [
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "1. Confundirlo con Object.defineProperty() — → una propiedad. → varias propiedades.",
        ],
        "correcta": 3,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-defineproperties-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es una herramienta para controlar con precisión cómo se comportan las propiedades de un objeto.",
            },
            {
              "concepto": "¿Para qué sirve?",
              "descripcion": "Principalmente para:",
            },
            {
              "concepto": "¿Cómo funciona?",
              "descripcion": "Recibe dos argumentos principales:",
            },
            {
              "concepto": "Error común",
              "descripcion": "1. Confundirlo con `Object.defineProperty()` — → una propiedad. → varias propiedades.",
            },
            {
              "concepto": "Caso de uso",
              "descripcion": "Creación de objetos con propiedades controladas.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "¿Qué es? → Es una herramienta para controlar con precisión cómo se comportan las propiedades de un objeto. · ¿Para qué sirve? → Principalmente para: · ¿Cómo funciona? → Recibe dos argumentos principales: · Error común → 1. Confundirlo con `Object.defineProperty()` — → una propiedad. → varias propiedades. · Caso de uso → Creación de objetos con propiedades controladas.",
        },
        {
          "id": "js-object-defineproperties-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "Es un __________ `Object` que permite crear o modificar varias propiedades de un objeto al mismo tiempo, definiendo sus características mediante property descriptors.",
          "opciones": [
            "método estático de",
            "directa y propia",
            "método estático del objeto global",
            "método estático",
          ],
          "correcto": "método estático de",
          "pista": "El término empieza por «m…».",
          "solucion": "método estático de: Es un método estático de `Object` que permite crear o modificar varias propiedades de un objeto al mismo tiempo, definiendo sus características mediante property descriptors.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Crear varias propiedades",
          "explicacion": "",
          "codigo": "const usuario= {};\nObject.defineProperties(usuario, {\n    nombre: {\n        value:\"Josué\",\n        writable:true,\n        enumerable:true,\n        configurable:true\n    },\n\n    edad: {\n        value:17,\n        writable:true,\n        enumerable:true,\n        configurable:true\n    }\n});\nconsole.log(usuario.nombre);\nconsole.log(usuario.edad);",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Crear una propiedad que no pueda modificarse",
          "explicacion": "",
          "codigo": "const usuario= {};\nObject.defineProperties(usuario, {\n    id: {\n        value:100,\n        writable:false\n    }\n});\nusuario.id=200;\nconsole.log(usuario.id);// 100",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "3. Controlar `enumerable`",
          "explicacion": "",
          "codigo": "const usuario= {};\nObject.defineProperties(usuario, {\n    nombre: {\n        value:\"Josué\",\n        enumerable:true\n    },\n\n    password: {\n        value:\"123456\",\n        enumerable:false\n    }\n});\nconsole.log(Object.keys(usuario));\n\n[\"nombre\"]",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "4. Utilizar `get` y `set`",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Josué\",\n    apellido:\"Rodriguez\"\n};\nObject.defineProperties(persona, {\n    nombreCompleto: {\n        get() {\n\t\t        return`${this.nombre}${this.apellido}`;\n        }\n    }\n});\nconsole.log(persona.nombreCompleto);// \"Josué Rodriguez\"",
          "salida": "",
        },
        {
          "paso": 5,
          "titulo": "5. Varias propiedades a la vez",
          "explicacion": "Esta es justamente la principal diferencia frente a `Object.defineProperty()`:",
          "codigo": "Object.defineProperty(objeto,\"nombre\",descriptor);\n\nObject.defineProperties(objeto, {\n    nombre:descriptor,\n    edad:descriptor,\n    email:descriptor\n});",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-getownpropertydescriptor": {
    "id": "js-object-getownpropertydescriptor",
    "titulo": "Object.getOwnPropertyDescriptor`",
    "icon": "🔍",
    "categoria": "Object",
    "firma": "Object.getOwnPropertyDescriptor(obj, prop)",
    "simulador": "object",
    "definicion": [
      "`Object.getOwnPropertyDescriptor()`",
      "Es un **método estático de **`Object` que obtiene el **descriptor de una propiedad propia** de un objeto.",
    ],
    "queEs": [
      "Es una herramienta que permite **inspeccionar cómo está configurada una propiedad**.",
      "Por ejemplo:",
      "Devuelve un objeto similar a:",
      "Es decir, permite descubrir las \"reglas internas\" de una propiedad.",
    ],
    "paraQueSirve": [
      "Sirve para:",
      "🔍 Inspeccionar propiedades de un objeto.",
      "⚙️ Conocer si una propiedad es modificable.",
      "👀 Saber si una propiedad es enumerable.",
      "🗑️ Saber si puede configurarse o eliminarse.",
      "🧮 Inspeccionar getters y setters.",
      "🧩 Trabajar con **Property Descriptors**.",
      "🛠️ Crear herramientas, librerías y sistemas de metaprogramación.",
    ],
    "comoFunciona": [
      "Recibe un objeto y el nombre de una propiedad:",
      "El proceso es:",
      "Por ejemplo:",
    ],
    "sintaxis": [
      {
        "code": "Object.getOwnPropertyDescriptor(obj,prop)",
      },
      {
        "caption": "Parámetros",
        "code": "Object.getOwnPropertyDescriptor(obj,\"nombre\");",
      },
      {
        "caption": "Retorno",
        "code": "{\n\tvalue: ...,\n\twritable: ...,\n\tenumerable: ...,\n\tconfigurable: ...\n}",
      },
      {
        "caption": "Si la propiedad **no existe como propiedad propia**, devuelve:",
        "code": "undefined",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Inspeccionar una propiedad",
        "code": "const persona= {\n    nombre:\"Josué\"\n};\nconst descriptor=Object.getOwnPropertyDescriptor(persona,\"nombre\");\nconsole.log(descriptor);\n\n{\n\t\tvalue:\"Josué\",\n\t\twritable:true,\n\t\tenumerable:true,\n\t\tconfigurable:true\n}",
      },
      {
        "titulo": "2. Comprobar `writable`",
        "code": "const persona= {\n    nombre:\"Josué\"\n};\nconst descriptor=Object.getOwnPropertyDescriptor(persona,\"nombre\");\nconsole.log(descriptor.writable);// true",
      },
      {
        "titulo": "3. Inspeccionar una propiedad creada con `defineProperty()`",
        "code": "const usuario= {};\nObject.defineProperty(usuario,\"id\", {\n    value:100,\n    writable:false,\n    enumerable:false,\n    configurable:false\n});\nconst descriptor=Object.getOwnPropertyDescriptor(usuario,\"id\");\nconsole.log(descriptor);\n\n{\n\tvalue:100,\n\twritable:false,\n\tenumerable:false,\n\tconfigurable:false\n}\n\nObject.defineProperty()\n        ↓\n    CONFIGURA\n        ↓\nProperty Descriptor\n        ↑\n    INSPECCIONA\n        ↑\nObject.getOwnPropertyDescriptor()",
      },
      {
        "titulo": "4. Inspeccionar un getter",
        "code": "const persona= {\n    nombre:\"Josué\"\n};\nObject.defineProperty(persona,\"nombreCompleto\", {\n    get() {\n\t\t    return persona.nombre;\n    }\n});\nconst descriptor=Object.getOwnPropertyDescriptor(persona,\"nombreCompleto\");\nconsole.log(descriptor);\n\n{\n\tget: [Function:get],\n\tset:undefined,\n\tenumerable:false,\n\tconfigurable:false\n}",
      },
    ],
    "errores": [
      {
        "texto": "1. Confundirlo con `Object.getOwnPropertyDescriptors()` — → obtiene el descriptor de **una propiedad**. → obtiene los descriptores de **todas las propiedades propias**.",
        "code": "Object.getOwnPropertyDescriptor(obj,\"nombre\");\n\nObject.getOwnPropertyDescriptors(obj);",
      },
      {
        "texto": "2. Confundir propiedad propia con propiedad heredada — Resultado: ¿Por qué? Porque `nombre` pertenece a `padre`, no directamente a `hijo`. `getOwnPropertyDescriptor()` solamente inspecciona **propiedades propias**.",
        "code": "const padre= {\n    nombre:\"Josué\"\n};\nconst hijo=Object.create(padre);\nconsole.log(Object.getOwnPropertyDescriptor(hijo,\"nombre\"));\n\nundefined\n\nhijo\n │\n └── [[Prototype]]\n       ↓\n     padre\n       └── nombre",
      },
      {
        "texto": "3. Pensar que modifica la propiedad — Este método: **no modifica** la propiedad. Solo la inspecciona. Para modificar/configurar propiedades se utilizan métodos como:",
        "code": "Object.getOwnPropertyDescriptor(obj,\"nombre\");\n\nObject.defineProperty();\nObject.defineProperties();",
      },
    ],
    "casos": [
      "🔍 Inspeccionar objetos.",
      "🧪 Testing.",
      "🛠️ Desarrollo de librerías.",
      "🧩 Metaprogramación.",
      "🔒 Analizar propiedades de solo lectura.",
      "🧮 Inspeccionar getters y setters.",
      "⚙️ Crear herramientas que trabajan dinámicamente con objetos.",
    ],
    "relacion": [
      "Este método forma parte del grupo de herramientas de **Property Descriptors**:",
      "Y los descriptores pueden contener:",
    ],
    "analogia": "Imagina que una propiedad es una **puerta** 🚪. `Object.defineProperty()` sería quien instala la puerta y decide sus reglas: \"Esta puerta puede abrirse, puede verse y no puede eliminarse.\" `Object.getOwnPropertyDescriptor()` sería el **inspector** 🔎 que llega después y pregunta: \"¿Cómo está configurada esta puerta?\" Y devuelve:",
    "fuente": "MDN Web Docs — `Object.getOwnPropertyDescriptor()`.",
    "notasPersonales": [
      "`Object.getOwnPropertyDescriptor()` **inspecciona el descriptor de una propiedad propia** de un objeto.",
      "**Idea clave:**",
      "👉 Es, en esencia, **\"dime cuáles son las reglas de esta propiedad\"**.",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.getOwnPropertyDescriptor`?",
        "opciones": [
          "obj.hasOwnProperty(prop)",
          "Object.getOwnPropertyDescriptor(obj, prop)",
          "Object.hasOwn(obj, prop)",
          "Object.is(valor1, valor2)",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.getOwnPropertyDescriptor`?",
        "opciones": [
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método estático de Object que obtiene el descriptor de una propiedad propia de un objeto.",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.getOwnPropertyDescriptor`?",
        "opciones": [
          "Sirve para: 🔍 Inspeccionar propiedades de un objeto.",
          "Crear objetos con herencia prototípica personalizada.",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.getOwnPropertyDescriptor`?",
        "opciones": [
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "1. Confundirlo con Object.getOwnPropertyDescriptors() — → obtiene el descriptor de una propiedad. → obtiene los descriptores de…",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
        ],
        "correcta": 2,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-getownpropertydescriptor-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "3. Pensar que modifica la propiedad — Este método",
              "descripcion": "no modifica la propiedad. Solo la inspecciona. Para modificar/configurar propiedades se utilizan métodos como:",
            },
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es una herramienta que permite inspeccionar cómo está configurada una propiedad.",
            },
            {
              "concepto": "¿Cómo funciona?",
              "descripcion": "Recibe un objeto y el nombre de una propiedad:",
            },
            {
              "concepto": "Error común",
              "descripcion": "1. Confundirlo con `Object.getOwnPropertyDescriptors()` — → obtiene el descriptor de una propiedad. → obtiene los descriptores de todas las propiedades propias.",
            },
            {
              "concepto": "Caso de uso",
              "descripcion": "🔍 Inspeccionar objetos.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "3. Pensar que modifica la propiedad — Este método → no modifica la propiedad. Solo la inspecciona. Para modificar/configurar propiedades se utilizan métodos como: · ¿Qué es? → Es una herramienta que permite inspeccionar cómo está configurada una propiedad. · ¿Cómo funciona? → Recibe un objeto y el nombre de una propiedad: · Error común → 1. Confundirlo con `Object.getOwnPropertyDescriptors()` — → obtiene el descriptor de una propiedad. → obtiene los descriptores de todas las propiedades propias. · Caso de uso → 🔍 Inspeccionar objetos.",
        },
        {
          "id": "js-object-getownpropertydescriptor-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "Es un __________ `Object` que obtiene el descriptor de una propiedad propia de un objeto.",
          "opciones": [
            "método estático de",
            "directa y propia",
            "método estático del objeto global",
            "método estático",
          ],
          "correcto": "método estático de",
          "pista": "El término empieza por «m…».",
          "solucion": "método estático de: Es un método estático de `Object` que obtiene el descriptor de una propiedad propia de un objeto.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Inspeccionar una propiedad",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Josué\"\n};\nconst descriptor=Object.getOwnPropertyDescriptor(persona,\"nombre\");\nconsole.log(descriptor);\n\n{\n\t\tvalue:\"Josué\",\n\t\twritable:true,\n\t\tenumerable:true,\n\t\tconfigurable:true\n}",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Comprobar `writable`",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Josué\"\n};\nconst descriptor=Object.getOwnPropertyDescriptor(persona,\"nombre\");\nconsole.log(descriptor.writable);// true",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "3. Inspeccionar una propiedad creada con `defineProperty()`",
          "explicacion": "",
          "codigo": "const usuario= {};\nObject.defineProperty(usuario,\"id\", {\n    value:100,\n    writable:false,\n    enumerable:false,\n    configurable:false\n});\nconst descriptor=Object.getOwnPropertyDescriptor(usuario,\"id\");\nconsole.log(descriptor);\n\n{\n\tvalue:100,\n\twritable:false,\n\tenumerable:false,\n\tconfigurable:false\n}\n\nObject.defineProperty()\n        ↓\n    CONFIGURA\n        ↓\nProperty Descriptor\n        ↑\n    INSPECCIONA\n        ↑\nObject.getOwnPropertyDescriptor()",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "4. Inspeccionar un getter",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Josué\"\n};\nObject.defineProperty(persona,\"nombreCompleto\", {\n    get() {\n\t\t    return persona.nombre;\n    }\n});\nconst descriptor=Object.getOwnPropertyDescriptor(persona,\"nombreCompleto\");\nconsole.log(descriptor);\n\n{\n\tget: [Function:get],\n\tset:undefined,\n\tenumerable:false,\n\tconfigurable:false\n}",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-getprototypeof": {
    "id": "js-object-getprototypeof",
    "titulo": "Object.getPrototypeOf",
    "icon": "🧬",
    "categoria": "Object",
    "firma": "Object.getPrototypeOf(obj)",
    "simulador": "object",
    "definicion": [
      "`Object.getPrototypeOf()`",
      "Es un **método estático de **`Object` que devuelve el **prototipo (**`[[Prototype]]`**) de un objeto**.",
    ],
    "queEs": [
      "Es una herramienta para **consultar qué objeto está conectado como prototipo** de otro objeto.",
      "En otras palabras, permite preguntar:",
      "**“¿Cuál es el prototipo de este objeto?”**",
    ],
    "paraQueSirve": [
      "Sirve para:",
      "🔍 Inspeccionar la cadena de prototipos.",
      "🧬 Saber de qué objeto hereda otro objeto.",
      "🛠️ Trabajar con herencia basada en prototipos.",
      "🔗 Complementar `Object.setPrototypeOf()`.",
      "🧪 Analizar objetos creados mediante `Object.create()`.",
      "📚 Comprender cómo funciona la **prototype chain**.",
    ],
    "comoFunciona": [
      "JavaScript utiliza una propiedad interna llamada `[[Prototype]]`.",
      "Cuando haces:",
      "`persona` normalmente tiene como prototipo a `Object.prototype`.",
      "Puedes consultarlo:",
      "Resultado aproximado:",
      "La función **no busca propiedades directamente**; simplemente devuelve el objeto que está conectado como prototipo.",
    ],
    "sintaxis": [
      {
        "code": "Object.getPrototypeOf(obj)",
      },
      {
        "caption": "Parámetro",
        "code": "obj",
      },
      {
        "caption": "Retorno",
        "code": "null",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Obtener el prototipo de un objeto",
        "code": "const persona= {};\nconst prototipo=Object.getPrototypeOf(persona);\nconsole.log(prototipo===Object.prototype);\n\ntrue",
      },
      {
        "titulo": "2. Objeto creado con `Object.create()`",
        "code": "const animal= {\n    comer() {\n\t    console.log(\"Comiendo...\");\n    }\n};\nconst perro=Object.create(animal);\nconsole.log(Object.getPrototypeOf(perro)===animal);\n\ntrue\n\nperro\n  ↓\nanimal\n  ↓\nObject.prototype\n  ↓\nnull",
      },
      {
        "titulo": "3. Obtener el prototipo de un array",
        "code": "const numeros= [1,2,3];\nconsole.log(Object.getPrototypeOf(numeros)===Array.prototype);\n\ntrue",
      },
      {
        "titulo": "4. Obtener el prototipo de una instancia de clase",
        "code": "class Persona {}\nconst josue= new Persona();\nconsole.log(Object.getPrototypeOf(josue)===Persona.prototype);\n\ntrue\n\njosue\n  ↓\nPersona.prototype\n  ↓\nObject.prototype\n  ↓\nnull",
      },
      {
        "titulo": "5. Un objeto sin prototipo",
        "code": "const objeto=Object.create(null);\nconsole.log(Object.getPrototypeOf(objeto));\n\nnull",
      },
    ],
    "errores": [
      {
        "texto": "Confundirlo con `Object.prototype` — Esto: **obtiene el prototipo de **`objeto`. Mientras que: es directamente el objeto prototipo base de los objetos normales.",
        "code": "Object.getPrototypeOf(objeto)\n\nObject.prototype",
      },
      {
        "texto": "Confundirlo con `Object.setPrototypeOf()` — `get` → **obtiene** `set` → **cambia** Una forma fácil de recordarlo:",
        "code": "Object.getPrototypeOf(obj);\n\nObject.setPrototypeOf(obj,nuevoPrototipo);\n\nget → leer 🔍\nset → cambiar 🔧",
      },
      {
        "texto": "Confundirlo con `obj.__proto__` — También puedes encontrarte con: pero `__proto__` es una propiedad heredada histórica/accesor especial. Para consultar el prototipo, la forma recomendada es:",
        "code": "obj.__proto__\n\nObject.getPrototypeOf(obj);",
      },
    ],
    "casos": [
      "Inspeccionar herencia prototípica.",
      "Depurar objetos.",
      "Comprobar relaciones entre instancias y prototipos.",
      "Trabajar con `Object.create()`.",
      "Analizar clases y sus instancias.",
      "Estudiar la **cadena de prototipos**.",
      "Complementar operaciones con `Object.setPrototypeOf()`.",
    ],
    "relacion": [
      "Especialmente importante:",
      "⬇️ consulta",
      "Mientras:",
      "⬇️ modifica",
    ],
    "analogia": "Imagina que cada objeto tiene un **padre de referencia** 👨‍👦. `Object.getPrototypeOf(perro)` pregunta: **“¿Quién es el padre de referencia de **`perro`**?”** Y devuelve:",
    "fuente": "MDN Web Docs — `Object.getPrototypeOf()`",
    "notasPersonales": [
      "**Regla mental:**",
      "`Object.getPrototypeOf()` = **“Dime cuál es el prototipo de este objeto.”**",
      "Y recuerda la pareja:",
      "**Idea clave:** `Object.getPrototypeOf()` no modifica el objeto; **solo inspecciona su **`[[Prototype]]`.",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.getPrototypeOf?",
        "opciones": [
          "Object.getPrototypeOf(obj)",
          "obj.hasOwnProperty(prop)",
          "Object.hasOwn(obj, prop)",
          "Object.is(valor1, valor2)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.getPrototypeOf?",
        "opciones": [
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método estático de Object que devuelve el prototipo ([[Prototype]]) de un objeto.",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.getPrototypeOf?",
        "opciones": [
          "Crear objetos con herencia prototípica personalizada.",
          "Sirve para: 🔍 Inspeccionar la cadena de prototipos.",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.getPrototypeOf?",
        "opciones": [
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "Confundirlo con Object.prototype — Esto: obtiene el prototipo de objeto. Mientras que: es directamente el objeto prototipo base…",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
        ],
        "correcta": 2,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-getprototypeof-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "Confundirlo con `Object.prototype` — Esto",
              "descripcion": "obtiene el prototipo de `objeto`. Mientras que: es directamente el objeto prototipo base de los objetos normales.",
            },
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es una herramienta para consultar qué objeto está conectado como prototipo de otro objeto.",
            },
            {
              "concepto": "¿Cómo funciona?",
              "descripcion": "JavaScript utiliza una propiedad interna llamada `[[Prototype]]`.",
            },
            {
              "concepto": "Error común",
              "descripcion": "Confundirlo con `Object.prototype` — Esto: obtiene el prototipo de `objeto`. Mientras que: es directamente el objeto prototipo base de los objetos normales.",
            },
            {
              "concepto": "Caso de uso",
              "descripcion": "Inspeccionar herencia prototípica.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "Confundirlo con `Object.prototype` — Esto → obtiene el prototipo de `objeto`. Mientras que: es directamente el objeto prototipo base de los objetos normales. · ¿Qué es? → Es una herramienta para consultar qué objeto está conectado como prototipo de otro objeto. · ¿Cómo funciona? → JavaScript utiliza una propiedad interna llamada `[[Prototype]]`. · Error común → Confundirlo con `Object.prototype` — Esto: obtiene el prototipo de `objeto`. Mientras que: es directamente el objeto prototipo base de los objetos normales. · Caso de uso → Inspeccionar herencia prototípica.",
        },
        {
          "id": "js-object-getprototypeof-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "Es un __________ `Object` que devuelve el prototipo (`[[Prototype]]`) de un objeto.",
          "opciones": [
            "método estático de",
            "directa y propia",
            "método estático del objeto global",
            "método estático",
          ],
          "correcto": "método estático de",
          "pista": "El término empieza por «m…».",
          "solucion": "método estático de: Es un método estático de `Object` que devuelve el prototipo (`[[Prototype]]`) de un objeto.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Obtener el prototipo de un objeto",
          "explicacion": "",
          "codigo": "const persona= {};\nconst prototipo=Object.getPrototypeOf(persona);\nconsole.log(prototipo===Object.prototype);\n\ntrue",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Objeto creado con `Object.create()`",
          "explicacion": "",
          "codigo": "const animal= {\n    comer() {\n\t    console.log(\"Comiendo...\");\n    }\n};\nconst perro=Object.create(animal);\nconsole.log(Object.getPrototypeOf(perro)===animal);\n\ntrue\n\nperro\n  ↓\nanimal\n  ↓\nObject.prototype\n  ↓\nnull",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "3. Obtener el prototipo de un array",
          "explicacion": "",
          "codigo": "const numeros= [1,2,3];\nconsole.log(Object.getPrototypeOf(numeros)===Array.prototype);\n\ntrue",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "4. Obtener el prototipo de una instancia de clase",
          "explicacion": "",
          "codigo": "class Persona {}\nconst josue= new Persona();\nconsole.log(Object.getPrototypeOf(josue)===Persona.prototype);\n\ntrue\n\njosue\n  ↓\nPersona.prototype\n  ↓\nObject.prototype\n  ↓\nnull",
          "salida": "",
        },
        {
          "paso": 5,
          "titulo": "5. Un objeto sin prototipo",
          "explicacion": "",
          "codigo": "const objeto=Object.create(null);\nconsole.log(Object.getPrototypeOf(objeto));\n\nnull",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-setprototypeof": {
    "id": "js-object-setprototypeof",
    "titulo": "Object.setPrototypeOf",
    "icon": "🔗",
    "categoria": "Object",
    "firma": "Object.setPrototypeOf(obj, proto)",
    "simulador": "object",
    "definicion": [
      "`Object.setPrototypeOf()`",
      "Es un **método estático de **`Object` que permite **establecer o cambiar el prototipo (**`[[Prototype]]`**) de un objeto existente**.",
    ],
    "queEs": [
      "Es una forma de modificar la **cadena de prototipos** de un objeto.",
      "Por ejemplo:",
      "Aunque `comer()` no está directamente dentro de `perro`, JavaScript lo encuentra en su prototipo:",
    ],
    "paraQueSirve": [
      "Principalmente para:",
      "🧬 Cambiar la relación de herencia de un objeto.",
      "🔗 Modificar la cadena de prototipos.",
      "🧩 Crear relaciones de prototipado dinámicamente.",
      "🔍 Experimentar o trabajar con metaprogramación.",
      "🛠️ Modificar objetos existentes cuando realmente se necesita.",
    ],
    "comoFunciona": [
      "Recibe:",
      "El primer argumento es el objeto que será modificado.",
      "El segundo es el nuevo prototipo.",
      "Después de cambiarlo, las búsquedas de propiedades y métodos pueden continuar hacia el nuevo prototipo.",
      "Ejemplo",
      "Resultado:",
      "Porque:",
    ],
    "sintaxis": [
      {
        "code": "Object.setPrototypeOf(obj,prototype)",
      },
      {
        "caption": "Parámetros",
        "code": "Object.setPrototypeOf(obj,otroObjeto);",
      },
      {
        "caption": "También:",
        "code": "Object.setPrototypeOf(obj,null);",
      },
      {
        "caption": "Retorno",
        "code": "const objeto= {};\nconst resultado=Object.setPrototypeOf(objeto,null);\nconsole.log(resultado===objeto);// true",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Cambiar el prototipo",
        "code": "const animal= {\n    comer() {\n\t\t    console.log(\"Comiendo\");\n    }\n};\nconst perro= {};\nObject.setPrototypeOf(perro,animal);\nperro.comer();// Comiendo",
      },
      {
        "titulo": "2. Cambiar el prototipo después de crear el objeto",
        "code": "const objeto= {\n    nombre:\"Josué\"\n};\nconst metodos= {\n    saludar() {\n\t\t    console.log(`Hola, soy${this.nombre}`);\n    }\n};\nObject.setPrototypeOf(objeto,metodos);\nobjeto.saludar();// Hola, soy Josué",
      },
      {
        "titulo": "3. Utilizar `null` como prototipo",
        "descripcion": "También puedes eliminar la cadena de prototipos:",
        "code": "const objeto= {};\nObject.setPrototypeOf(objeto,null);\n\nconsole.log(Object.getPrototypeOf(objeto));// null\n\nconsole.log(objeto.toString);// undefined",
      },
      {
        "titulo": "4. Verificar el nuevo prototipo",
        "descripcion": "Puedes utilizar `Object.getPrototypeOf()`:",
        "code": "const padre= {};\nconst hijo= {};\nObject.setPrototypeOf(hijo,padre);\nconsole.log(Object.getPrototypeOf(hijo)===padre);// true",
      },
    ],
    "errores": [
      {
        "texto": "1. Confundirlo con `Object.create()` — Ambos están relacionados con prototipos, pero hacen cosas diferentes. → **crea un nuevo objeto** con ese prototipo. → **modifica un objeto existente**.",
        "code": "Object.create(prototipo);\n\nObject.setPrototypeOf(objeto,prototipo);\n\nObject.create()\n      ↓\nCREAR + establecer prototipo\n\nObject.setPrototypeOf()\n      ↓\nCAMBIAR prototipo de objeto existente",
      },
      {
        "texto": "2. Confundir el prototipo con una clase — El prototipo no es simplemente \"la clase\". JavaScript utiliza una **cadena de prototipos** para realizar búsquedas de propiedades y métodos.",
        "code": "objeto\n   ↓\nprototipo\n   ↓\notro prototipo\n   ↓\nObject.prototype\n   ↓\nnull",
      },
      {
        "texto": "3. Cambiar prototipos constantemente — Aunque es posible, modificar el prototipo de objetos existentes puede afectar el rendimiento del motor de JavaScript. Por eso, cuando sea posible, normalmente es mejor establecer el prototipo **al crear el objeto** mediante: o utilizar:",
        "code": "Object.create();\n\nclass",
      },
    ],
    "casos": [
      "🧩 Metaprogramación.",
      "🧪 Experimentos con prototipos.",
      "🔗 Modificación dinámica de cadenas de prototipos.",
      "🛠️ Implementación de ciertas estructuras avanzadas.",
      "📚 Aprendizaje del sistema de prototipos de JavaScript.",
      "En código cotidiano, **no suele ser la primera opción**.",
    ],
    "relacion": [
      "Este método pertenece directamente al conjunto de herramientas relacionadas con prototipos:",
      "También se relaciona con:",
      "`[[Prototype]]`",
      "`Object.prototype`",
      "`Object.create()`",
      "`Object.getPrototypeOf()`",
      "`class`",
      "`extends`",
      "Cadena de prototipos",
      "Herencia prototípica",
      "Relación conceptual",
    ],
    "analogia": "Imagina que cada objeto tiene una **persona a la que puede pedir ayuda**. Si haces: estás diciendo: \"A partir de ahora, cuando `perro` no encuentre algo por sí mismo, puede buscarlo en `animal`.\" Cambiar el prototipo es como **cambiar a quién puede acudir el objeto cuando no encuentra una propiedad o método**. 🧬",
    "fuente": "MDN Web Docs — `Object.setPrototypeOf()`.",
    "notasPersonales": [
      "`Object.setPrototypeOf()` permite **cambiar el **`[[Prototype]]`** de un objeto existente**, modificando así su cadena de prototipos.",
      "**Idea clave:**",
      "🔥 **Regla mental:**",
      "`setPrototypeOf()`** = \"cambia quién es el prototipo de este objeto\".**",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.setPrototypeOf?",
        "opciones": [
          "Object.hasOwn(obj, prop)",
          "Object.is(valor1, valor2)",
          "obj.hasOwnProperty(prop)",
          "Object.setPrototypeOf(obj, proto)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.setPrototypeOf?",
        "opciones": [
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Es un método estático de Object que permite establecer o cambiar el prototipo ([[Prototype]]) de un objeto existente.",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.setPrototypeOf?",
        "opciones": [
          "Crear objetos con herencia prototípica personalizada.",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Principalmente para: 🧬 Cambiar la relación de herencia de un objeto.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.setPrototypeOf?",
        "opciones": [
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "1. Confundirlo con Object.create() — Ambos están relacionados con prototipos, pero hacen cosas diferentes. → crea un nuevo objeto…",
        ],
        "correcta": 3,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-setprototypeof-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es una forma de modificar la cadena de prototipos de un objeto.",
            },
            {
              "concepto": "¿Para qué sirve?",
              "descripcion": "Principalmente para:",
            },
            {
              "concepto": "Error común",
              "descripcion": "1. Confundirlo con `Object.create()` — Ambos están relacionados con prototipos, pero hacen cosas diferentes. → crea un nuevo objeto con ese prototipo. → modifica un…",
            },
            {
              "concepto": "Caso de uso",
              "descripcion": "🧩 Metaprogramación.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "¿Qué es? → Es una forma de modificar la cadena de prototipos de un objeto. · ¿Para qué sirve? → Principalmente para: · Error común → 1. Confundirlo con `Object.create()` — Ambos están relacionados con prototipos, pero hacen cosas diferentes. → crea un nuevo objeto con ese prototipo. → modifica un… · Caso de uso → 🧩 Metaprogramación.",
        },
        {
          "id": "js-object-setprototypeof-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "Es un __________ `Object` que permite establecer o cambiar el prototipo (`[[Prototype]]`) de un objeto existente.",
          "opciones": [
            "método estático de",
            "directa y propia",
            "método estático del objeto global",
            "método estático",
          ],
          "correcto": "método estático de",
          "pista": "El término empieza por «m…».",
          "solucion": "método estático de: Es un método estático de `Object` que permite establecer o cambiar el prototipo (`[[Prototype]]`) de un objeto existente.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Cambiar el prototipo",
          "explicacion": "",
          "codigo": "const animal= {\n    comer() {\n\t\t    console.log(\"Comiendo\");\n    }\n};\nconst perro= {};\nObject.setPrototypeOf(perro,animal);\nperro.comer();// Comiendo",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Cambiar el prototipo después de crear el objeto",
          "explicacion": "",
          "codigo": "const objeto= {\n    nombre:\"Josué\"\n};\nconst metodos= {\n    saludar() {\n\t\t    console.log(`Hola, soy${this.nombre}`);\n    }\n};\nObject.setPrototypeOf(objeto,metodos);\nobjeto.saludar();// Hola, soy Josué",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "3. Utilizar `null` como prototipo",
          "explicacion": "También puedes eliminar la cadena de prototipos:",
          "codigo": "const objeto= {};\nObject.setPrototypeOf(objeto,null);\n\nconsole.log(Object.getPrototypeOf(objeto));// null\n\nconsole.log(objeto.toString);// undefined",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "4. Verificar el nuevo prototipo",
          "explicacion": "Puedes utilizar `Object.getPrototypeOf()`:",
          "codigo": "const padre= {};\nconst hijo= {};\nObject.setPrototypeOf(hijo,padre);\nconsole.log(Object.getPrototypeOf(hijo)===padre);// true",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-tostring": {
    "id": "js-object-tostring",
    "titulo": "Object.prototype.toString()",
    "icon": "🪞",
    "categoria": "Object",
    "firma": "obj.toString()",
    "simulador": "object",
    "definicion": [
      "`Object.prototype.toString()` es un **método** definido en `Object.prototype` que devuelve una **cadena de texto** con el tipo interno del objeto sobre el que se invoca.",
      "Es uno de los métodos más confiables para identificar el tipo real de un valor en JavaScript.",
    ],
    "queEs": [
      "Es un método heredado por la mayoría de los objetos en JavaScript.",
      "Devuelve una cadena con el formato:",
      "Por ejemplo:",
      "A diferencia del operador `typeof`, este método puede distinguir entre diferentes tipos de objetos.",
    ],
    "paraQueSirve": [
      "Se utiliza para:",
      "Identificar el tipo real de un objeto.",
      "Diferenciar entre `Array`, `Date`, `Map`, `Set`, etc.",
      "Depurar (debugging).",
      "Validar datos.",
      "Crear funciones que acepten distintos tipos de valores.",
    ],
    "comoFunciona": [
      "Se ejecuta sobre un objeto.",
      "JavaScript consulta su tipo interno (`[[Class]]` o la etiqueta definida por `Symbol.toStringTag`).",
      "Devuelve una cadena con el formato:",
      "Ejemplo del proceso:",
      "Resultado:",
      "**Nota:** Normalmente se utiliza con `.call()` para inspeccionar cualquier valor.",
    ],
    "sintaxis": [
      {
        "caption": "Sobre un objeto",
        "code": "objeto.toString()",
      },
      {
        "caption": "Forma recomendada para identificar tipos",
        "code": "Object.prototype.toString.call(valor)",
      },
      {
        "caption": "Valor de retorno",
        "code": "[object Tipo]",
      },
    ],
    "nota": "Es uno de los métodos más confiables para identificar el tipo real de un valor en JavaScript.",
    "ejemplos": [
      {
        "titulo": "Ejemplo 1: Objeto",
        "code": "const persona= {\n    nombre:\"Ana\"\n};console.log(Object.prototype.toString.call(persona));\n\n[object Object]",
      },
      {
        "titulo": "Ejemplo 2: Array",
        "code": "const numeros= [1,2,3];console.log(Object.prototype.toString.call(numeros));\n\n[object Array]",
      },
      {
        "titulo": "Ejemplo 3: Fecha",
        "code": "const fecha=new Date();console.log(Object.prototype.toString.call(fecha));\n\n[object Date]",
      },
      {
        "titulo": "Ejemplo 4: Map",
        "code": "const mapa=new Map();console.log(Object.prototype.toString.call(mapa));\n\n[object Map]",
      },
      {
        "titulo": "Ejemplo 5: Null y Undefined",
        "code": "console.log(Object.prototype.toString.call(null));\nconsole.log(Object.prototype.toString.call(undefined));\n\n[object Null]\n[object Undefined]",
      },
    ],
    "errores": [
      {
        "texto": "❌ Confundirlo con `toString()` de otros objetos — Resultado: Este es el método `toString()` específico del arreglo, **no** el de `Object.prototype`.",
        "code": "const numeros= [1,2,3];\nconsole.log(numeros.toString());\n\n1,2,3",
      },
      {
        "texto": "❌ Usar `typeof` para distinguir objetos — Resultado: También: Resultado: Con `Object.prototype.toString()`: Resultado:",
        "code": "typeof [];\n\nobject\n\ntypeof new Date();\n\nobject\n\nObject.prototype.toString.call([]);\n\n[object Array]",
      },
      {
        "texto": "❌ Llamar directamente sobre `null` — Resultado: La forma correcta es:",
        "code": "null.toString();\n\nTypeError\n\nObject.prototype.toString.call(null);",
      },
    ],
    "casos": [
      "Validar el tipo de un dato.",
      "Crear funciones genéricas.",
      "Depurar aplicaciones.",
      "Verificar datos recibidos desde APIs.",
      "Implementar bibliotecas o utilidades.",
    ],
    "relacion": [
      "`typeof` → Devuelve el tipo básico de un valor, pero no distingue bien entre distintos objetos.",
      "`instanceof` → Comprueba si un objeto pertenece a una clase o constructor específico.",
      "`Array.isArray()` → Forma específica y recomendada para saber si un valor es un arreglo.",
      "`Symbol.toStringTag` → Permite personalizar el texto que devuelve `Object.prototype.toString()` para algunos objetos.",
    ],
    "analogia": "Imagina una oficina donde cada persona lleva una **credencial oficial**. A simple vista todos parecen empleados (`typeof` dice `\"object\"`). Pero al revisar la credencial (`Object.prototype.toString()`), puedes saber exactamente qué función tiene cada uno: 👤 `[object Object]` 📅 `[object Date]` 📚 `[object Array]` 🗺️ `[object Map]` Es una identificación mucho más específica que simplemente decir \"es un empleado\".",
    "fuente": "Documentación oficial de JavaScript (MDN). Especificación ECMAScript.",
    "notasPersonales": [
      "✅ `Object.prototype.toString()` devuelve un **string** con el tipo interno del valor.",
      "✅ La forma recomendada para identificar tipos es `Object.prototype.toString.call(valor)`.",
      "✅ Es más preciso que `typeof` para distinguir objetos como `Array`, `Date`, `Map` o `Set`.",
      "✅ Puede identificar correctamente `null` y `undefined`.",
      "✅ No debe confundirse con los métodos `toString()` específicos de clases como `Array`, `Date` o `Number`.",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.prototype.toString()?",
        "opciones": [
          "Object.hasOwn(obj, prop)",
          "obj.toString()",
          "obj.hasOwnProperty(prop)",
          "Object.is(valor1, valor2)",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.prototype.toString()?",
        "opciones": [
          "Object.prototype.toString() es un método definido en Object.prototype que devuelve una cadena de texto con el tipo interno del objeto sobre…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.prototype.toString()?",
        "opciones": [
          "Se utiliza para: Identificar el tipo real de un objeto.",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
          "Crear objetos con herencia prototípica personalizada.",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.prototype.toString()?",
        "opciones": [
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "Confundirlo con toString() de otros objetos — Resultado: Este es el método toString() específico del arreglo, no el de…",
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
        ],
        "correcta": 1,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-tostring-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "❌ Confundirlo con `toString()` de otros objetos — Resultado",
              "descripcion": "Este es el método `toString()` específico del arreglo, no el de `Object.prototype`.",
            },
            {
              "concepto": "❌ Usar `typeof` para distinguir objetos — Resultado",
              "descripcion": "También: Resultado: Con `Object.prototype.toString()`: Resultado:",
            },
            {
              "concepto": "❌ Llamar directamente sobre `null` — Resultado",
              "descripcion": "La forma correcta es:",
            },
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es un método heredado por la mayoría de los objetos en JavaScript.",
            },
            {
              "concepto": "¿Cómo funciona?",
              "descripcion": "Se ejecuta sobre un objeto.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "❌ Confundirlo con `toString()` de otros objetos — Resultado → Este es el método `toString()` específico del arreglo, no el de `Object.prototype`. · ❌ Usar `typeof` para distinguir objetos — Resultado → También: Resultado: Con `Object.prototype.toString()`: Resultado: · ❌ Llamar directamente sobre `null` — Resultado → La forma correcta es: · ¿Qué es? → Es un método heredado por la mayoría de los objetos en JavaScript. · ¿Cómo funciona? → Se ejecuta sobre un objeto.",
        },
        {
          "id": "js-object-tostring-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "`Object.prototype.toString()` es un __________ definido en `Object.prototype` que devuelve una cadena de texto con el tipo interno del objeto sobre el que se invoca.",
          "opciones": [
            "método",
            "directa y propia",
            "método estático del objeto global",
            "método estático",
          ],
          "correcto": "método",
          "pista": "El término empieza por «m…».",
          "solucion": "método: `Object.prototype.toString()` es un método definido en `Object.prototype` que devuelve una cadena de texto con el tipo interno del objeto sobre el que se invoca.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "Ejemplo 1: Objeto",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Ana\"\n};console.log(Object.prototype.toString.call(persona));\n\n[object Object]",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "Ejemplo 2: Array",
          "explicacion": "",
          "codigo": "const numeros= [1,2,3];console.log(Object.prototype.toString.call(numeros));\n\n[object Array]",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "Ejemplo 3: Fecha",
          "explicacion": "",
          "codigo": "const fecha=new Date();console.log(Object.prototype.toString.call(fecha));\n\n[object Date]",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "Ejemplo 4: Map",
          "explicacion": "",
          "codigo": "const mapa=new Map();console.log(Object.prototype.toString.call(mapa));\n\n[object Map]",
          "salida": "",
        },
        {
          "paso": 5,
          "titulo": "Ejemplo 5: Null y Undefined",
          "explicacion": "",
          "codigo": "console.log(Object.prototype.toString.call(null));\nconsole.log(Object.prototype.toString.call(undefined));\n\n[object Null]\n[object Undefined]",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-object-valueof": {
    "id": "js-object-valueof",
    "titulo": "Object.prototype.valueOf()",
    "icon": "🔓",
    "categoria": "Object",
    "firma": "obj.valueOf()",
    "simulador": "object",
    "definicion": [
      "`Object.prototype.valueOf()` es un **método** definido en `Object.prototype` que devuelve el **valor primitivo** asociado a un objeto.",
      "En el caso de un objeto común (`Object`), devuelve el propio objeto.",
      "Este método suele ser sobrescrito por objetos como `Number`, `String`, `Boolean` y `Date` para devolver un valor primitivo más útil.",
    ],
    "queEs": [
      "Es un método heredado por la mayoría de los objetos en JavaScript.",
      "Su propósito es obtener el **valor primitivo** de un objeto cuando existe.",
      "Para un objeto literal (`{}`), simplemente devuelve el mismo objeto.",
    ],
    "paraQueSirve": [
      "Se utiliza para:",
      "Obtener el valor primitivo de objetos envoltorio (*wrapper objects*).",
      "Permitir conversiones automáticas de objetos a valores primitivos.",
      "Participar en operaciones matemáticas y comparaciones.",
      "Personalizar el comportamiento de objetos mediante la sobrescritura del método.",
    ],
    "comoFunciona": [
      "Se invoca sobre un objeto.",
      "JavaScript intenta obtener un valor primitivo.",
      "Si el objeto tiene una implementación propia de `valueOf()`, la utiliza.",
      "Si es un objeto común, devuelve el propio objeto.",
      "Ejemplo del proceso:",
      "Resultado:",
    ],
    "sintaxis": [
      {
        "code": "objeto.valueOf()",
      },
    ],
    "nota": "Este método suele ser sobrescrito por objetos como `Number`, `String`, `Boolean` y `Date` para devolver un valor primitivo más útil.",
    "ejemplos": [
      {
        "titulo": "Ejemplo 1: Objeto común",
        "code": "const persona= {\n    nombre:\"Ana\"\n};\nconsole.log(persona.valueOf());\n\n{nombre:\"Ana\" }",
      },
      {
        "titulo": "Ejemplo 2: Objeto `Number`",
        "code": "const numero=new Number(100);\nconsole.log(numero.valueOf());\n\n100\n\nconsole.log(typeof numero.valueOf());\n\n\"number\"",
      },
      {
        "titulo": "Ejemplo 3: Objeto `String`",
        "code": "const texto=new String(\"Hola\");console.log(texto.valueOf());\n\n\"Hola\"",
      },
      {
        "titulo": "Ejemplo 4: Objeto `Boolean`",
        "code": "const activo=new Boolean(true);console.log(activo.valueOf());\n\ntrue",
      },
      {
        "titulo": "Ejemplo 5: Objeto `Date`",
        "code": "const fecha=new Date(\"2026-07-22\");console.log(fecha.valueOf());\n\n1784678400000",
      },
    ],
    "errores": [
      {
        "texto": "❌ Pensar que siempre devuelve un valor primitivo — Resultado: Los objetos comunes devuelven el propio objeto.",
        "code": "const persona= {\n    nombre:\"Luis\"\n};\nconsole.log(persona.valueOf());\n\n{nombre:\"Luis\" }",
      },
      {
        "texto": "❌ Confundir `valueOf()` con `toString()` — Resultado: Mientras que: Resultado: `toString()` devuelve un **string** y `valueOf()` devuelve el **valor primitivo**.",
        "code": "const numero=new Number(25);console.log(numero.toString());\n\n\"25\"\n\nconsole.log(numero.valueOf());\n\n25",
      },
      {
        "texto": "❌ Crear objetos envoltorio innecesariamente — Es preferible: Los objetos `Number`, `String` y `Boolean` rara vez son necesarios.",
        "code": "const numero=new Number(10);\n\nconst numero=10;",
      },
    ],
    "casos": [
      "Obtener el valor primitivo de un objeto `Number`.",
      "Obtener el texto contenido en un objeto `String`.",
      "Obtener el valor booleano de un objeto `Boolean`.",
      "Obtener la marca de tiempo (timestamp) de un objeto `Date`.",
      "Personalizar conversiones en objetos propios.",
    ],
    "relacion": [
      "`toString()` → Convierte un valor en una cadena de texto.",
      "**Conversión de tipos (Type Coercion)** → JavaScript puede llamar automáticamente a `valueOf()` al necesitar un valor primitivo.",
      "**Objetos envoltorio (**`Number`**, **`String`**, **`Boolean`**)** → Implementan su propia versión de `valueOf()`.",
      "`Symbol.toPrimitive` → Mecanismo moderno para personalizar la conversión de objetos a valores primitivos; tiene prioridad sobre `valueOf()`.",
    ],
    "analogia": "Imagina una **caja de regalo** 🎁. La caja representa un **objeto**. El contenido representa el **valor primitivo**. `valueOf()` es como **abrir la caja** para obtener lo que realmente contiene. Ejemplos: 🎁 `new Number(50)` → abre la caja → `50` 🎁 `new String(\"Hola\")` → abre la caja → `\"Hola\"` 🎁 `new Boolean(true)` → abre la caja → `true` Pero una caja vacía (un objeto común) no tiene un valor primitivo especial: Simplemente obtienes la misma caja.",
    "fuente": "Documentación oficial de JavaScript (MDN). Especificación ECMAScript.",
    "notasPersonales": [
      "✅ `Object.prototype.valueOf()` intenta devolver el **valor primitivo** de un objeto.",
      "✅ En un objeto común (`{}`), devuelve el propio objeto.",
      "✅ Clases como `Number`, `String`, `Boolean` y `Date` sobrescriben este método para devolver un valor primitivo útil.",
      "✅ JavaScript puede llamar automáticamente a `valueOf()` durante comparaciones u operaciones matemáticas.",
      "✅ No debe confundirse con `toString()`, que devuelve una representación en texto.",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Object.prototype.valueOf()?",
        "opciones": [
          "Object.is(valor1, valor2)",
          "obj.hasOwnProperty(prop)",
          "obj.valueOf()",
          "Object.hasOwn(obj, prop)",
        ],
        "correcta": 2,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Object.prototype.valueOf()?",
        "opciones": [
          "Object.assign() es un método estático del objeto global Object que permite copiar propiedades de uno o varios objetos origen hacia un…",
          "Object.prototype.valueOf() es un método definido en Object.prototype que devuelve el valor primitivo asociado a un objeto.",
          "Es un método estático en JavaScript que determina si dos valores son exactamente el mismo valor, resolviendo inconsistencias históricas de…",
          "Es un método de instancia que devuelve un booleano (true o false) indicando si el objeto tiene la propiedad especificada como una propiedad…",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Object.prototype.valueOf()?",
        "opciones": [
          "Se utiliza para: Obtener el valor primitivo de objetos envoltorio (wrapper objects).",
          "Crear objetos con herencia prototípica personalizada.",
          "Comparaciones matemáticas perfectas: Validar de forma certera si una operación matemática resultó en NaN sin tener que recurrir a…",
          "Filtrar herencia: Asegurar que una llave pertenece al objeto mismo y no fue inyectada por librerías externas o extensiones…",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Object.prototype.valueOf()?",
        "opciones": [
          "Romperse en objetos limpios (Sin Prototipo): Si creas un objeto puro usando Object.create(null), este objeto no heredará de…",
          "Pensar que siempre devuelve un valor primitivo — Resultado: Los objetos comunes devuelven el propio objeto.",
          "Creer que compara el interior de los objetos (Igualdad Profunda): Al igual que ===, Object.is({}, {}) dará false.",
          "1. Confundirlo con in — Pero: in → objeto + prototipo. Object.hasOwn() → solamente propiedades propias.",
        ],
        "correcta": 1,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-object-valueof-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "❌ Pensar que siempre devuelve un valor primitivo — Resultado",
              "descripcion": "Los objetos comunes devuelven el propio objeto.",
            },
            {
              "concepto": "❌ Confundir `valueOf()` con `toString()` — Resultado",
              "descripcion": "Mientras que: Resultado: `toString()` devuelve un string y `valueOf()` devuelve el valor primitivo.",
            },
            {
              "concepto": "❌ Crear objetos envoltorio innecesariamente — Es preferible",
              "descripcion": "Los objetos `Number`, `String` y `Boolean` rara vez son necesarios.",
            },
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es un método heredado por la mayoría de los objetos en JavaScript.",
            },
            {
              "concepto": "¿Cómo funciona?",
              "descripcion": "Se invoca sobre un objeto.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "❌ Pensar que siempre devuelve un valor primitivo — Resultado → Los objetos comunes devuelven el propio objeto. · ❌ Confundir `valueOf()` con `toString()` — Resultado → Mientras que: Resultado: `toString()` devuelve un string y `valueOf()` devuelve el valor primitivo. · ❌ Crear objetos envoltorio innecesariamente — Es preferible → Los objetos `Number`, `String` y `Boolean` rara vez son necesarios. · ¿Qué es? → Es un método heredado por la mayoría de los objetos en JavaScript. · ¿Cómo funciona? → Se invoca sobre un objeto.",
        },
        {
          "id": "js-object-valueof-completar",
          "tipo": "completar",
          "titulo": "Completa la definición",
          "dificultad": "Fácil",
          "xp": 60,
          "frase": "`Object.prototype.valueOf()` es un __________ definido en `Object.prototype` que devuelve el valor primitivo asociado a un objeto.",
          "opciones": [
            "método",
            "directa y propia",
            "método estático del objeto global",
            "método estático",
          ],
          "correcto": "método",
          "pista": "El término empieza por «m…».",
          "solucion": "método: `Object.prototype.valueOf()` es un método definido en `Object.prototype` que devuelve el valor primitivo asociado a un objeto.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "Ejemplo 1: Objeto común",
          "explicacion": "",
          "codigo": "const persona= {\n    nombre:\"Ana\"\n};\nconsole.log(persona.valueOf());\n\n{nombre:\"Ana\" }",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "Ejemplo 2: Objeto `Number`",
          "explicacion": "",
          "codigo": "const numero=new Number(100);\nconsole.log(numero.valueOf());\n\n100\n\nconsole.log(typeof numero.valueOf());\n\n\"number\"",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "Ejemplo 3: Objeto `String`",
          "explicacion": "",
          "codigo": "const texto=new String(\"Hola\");console.log(texto.valueOf());\n\n\"Hola\"",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "Ejemplo 4: Objeto `Boolean`",
          "explicacion": "",
          "codigo": "const activo=new Boolean(true);console.log(activo.valueOf());\n\ntrue",
          "salida": "",
        },
        {
          "paso": 5,
          "titulo": "Ejemplo 5: Objeto `Date`",
          "explicacion": "",
          "codigo": "const fecha=new Date(\"2026-07-22\");console.log(fecha.valueOf());\n\n1784678400000",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
};
