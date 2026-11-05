/* Generado desde Apuntes/ — JS Core.
   Regenerar con: node scripts/generate-js-core.mjs */

export const JS_CORE_TYPEDARRAY = {
  "id": "js-typedarray",
  "label": "TypedArray",
  "icon": "🔢",
  "titulo": "TypedArray: buffers binarios",
  "descripcion": "Trabaja con arrays tipados y bytes: Uint8Array, set() y from() para datos binarios.",
  "simulador": "typedarray",
  "grupos": [
    {
      "seccion": "Manipulación de bytes",
      "metodos": [
        {
          "id": "js-typedarray-set",
          "nombre": "TypedArray.prototype.set()`",
          "firma": "typedArray.set(source, offset)",
          "icon": "📥",
        },
        {
          "id": "js-uint8array-from",
          "nombre": "Uint8Array.from",
          "firma": "Uint8Array.from(arrayLike, mapFn)",
          "icon": "🔢",
        },
      ],
    },
  ],
};

export const JS_CORE_TYPEDARRAY_DOCS = {
  "js-typedarray-set": {
    "id": "js-typedarray-set",
    "titulo": "TypedArray.prototype.set()`",
    "icon": "📥",
    "categoria": "TypedArray",
    "firma": "typedArray.set(source, offset)",
    "simulador": "typedarray",
    "definicion": [
      "Copia los elementos de un **array, TypedArray u objeto iterable compatible** dentro de un TypedArray existente, comenzando desde una posición determinada.",
    ],
    "queEs": [
      "Es un método para **copiar varios valores de una sola vez** hacia un `TypedArray`.",
      "Por ejemplo:",
      "La copia comienza desde el índice `0` por defecto.",
    ],
    "paraQueSirve": [
      "Principalmente para:",
      "Copiar datos rápidamente a un `TypedArray`.",
      "Transferir datos entre TypedArrays.",
      "Colocar un bloque de datos en una posición específica.",
      "Trabajar con datos binarios y buffers.",
    ],
    "comoFunciona": [
      "Imagina que tienes:",
      "El `2` indica **desde qué posición del destino comenzar a copiar**:",
      "La estructura es:",
      "📌 **Importante:** `set()` **modifica el TypedArray original**.",
    ],
    "sintaxis": [
      {
        "code": "typedArray.set(source,offset);",
      },
      {
        "caption": "Parámetros",
        "code": "offset=0",
      },
      {
        "caption": "Retorno",
        "code": "undefined",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Copiar desde el inicio",
        "code": "const numeros=new Uint8Array(5);\nnumeros.set([10,20,30]);\nconsole.log(numeros);// Uint8Array(5) [10, 20, 30, 0, 0]",
      },
      {
        "titulo": "2. Copiar desde una posición específica",
        "code": "const numeros=new Uint8Array(6);\nnumeros.set([10,20,30],2);\nconsole.log(numeros);// Uint8Array(6) [0, 0, 10, 20, 30, 0]",
      },
      {
        "titulo": "3. Copiar un TypedArray dentro de otro",
        "code": "const origen=new Uint8Array([10,20,30]);\nconst destino=new Uint8Array(5);\ndestino.set(origen,1);\nconsole.log(destino);// Uint8Array(5) [0, 10, 20, 30, 0]",
      },
      {
        "titulo": "4. Sobrescribir datos existentes",
        "code": "const numeros=new Uint8Array([1,2,3,4,5]);\nnumeros.set([100,200],1);\nconsole.log(numeros);// Uint8Array(5) [1, 100, 200, 4, 5]",
      },
    ],
    "errores": [
      {
        "texto": "**1. Confundirlo con **`Array.prototype.set()` Los Arrays normales no tienen `.set()`: `set()` pertenece a los **TypedArrays**.",
        "code": "const array= [1,2,3];\narray.set([4,5]);// ❌ Error",
      },
      {
        "texto": "**2. Intentar copiar demasiados elementos** Desde el índice `2` solamente hay espacio para un elemento.",
        "code": "const datos=new Uint8Array(3);\ndatos.set([10,20,30],2);// ❌ No hay suficiente espacio",
      },
      {
        "texto": "**3. Pensar que devuelve el TypedArray** El TypedArray se modifica directamente.",
        "code": "const datos=new Uint8Array(3);\nconst resultado=datos.set([1,2,3]);\nconsole.log(resultado);// undefined",
      },
    ],
    "casos": [
      "Manipulación de datos binarios.",
      "`ArrayBuffer` y memoria binaria.",
      "Procesamiento de archivos.",
      "Imágenes y audio.",
      "APIs que trabajan con bytes.",
      "Copiar bloques de información entre TypedArrays.",
      "Programación de bajo nivel en JavaScript.",
    ],
    "relacion": [
      "Una diferencia importante:",
      "➡️ **copia datos hacia el TypedArray existente.**",
      "Mientras:",
      "➡️ **crea un nuevo TypedArray con una copia.**",
    ],
    "analogia": "Imagina una caja con compartimentos: Haces: Y JavaScript coloca los objetos empezando en el compartimento `1`:",
    "fuente": "MDN Web Docs — `TypedArray.prototype.set()`.",
    "notasPersonales": [
      "**Palabras clave:** `TypedArray` · copiar · bloque de datos · `offset` · modificación directa · `undefined`.",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de TypedArray.prototype.set()`?",
        "opciones": [
          "Todas las anteriores",
          "typedArray.set(source, offset)",
          "Uint8Array.from(arrayLike, mapFn)",
          "Ninguna de las anteriores",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve TypedArray.prototype.set()`?",
        "opciones": [
          "Principalmente para convertir colecciones de valores en una secuencia de bytes.",
          "Principalmente para: Copiar datos rápidamente a un TypedArray.",
          "Todas las anteriores",
          "Ninguna de las anteriores",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a TypedArray.prototype.set()`?",
        "opciones": [
          "1. Pensar que conserva cualquier número No almacenará 300, porque un Uint8Array solo representa un byte. 2. Confundirlo con…",
          "1. Confundirlo con Array.prototype.set() Los Arrays normales no tienen .set(): set() pertenece a los TypedArrays.",
          "Todas las anteriores",
          "Ninguna de las anteriores",
        ],
        "correcta": 1,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-typedarray-set-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es un método para copiar varios valores de una sola vez hacia un `TypedArray`.",
            },
            {
              "concepto": "¿Para qué sirve?",
              "descripcion": "Principalmente para:",
            },
            {
              "concepto": "Error común",
              "descripcion": "1. Confundirlo con `Array.prototype.set()` Los Arrays normales no tienen `.set()`: `set()` pertenece a los TypedArrays.",
            },
            {
              "concepto": "Caso de uso",
              "descripcion": "Manipulación de datos binarios.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "¿Qué es? → Es un método para copiar varios valores de una sola vez hacia un `TypedArray`. · ¿Para qué sirve? → Principalmente para: · Error común → 1. Confundirlo con `Array.prototype.set()` Los Arrays normales no tienen `.set()`: `set()` pertenece a los TypedArrays. · Caso de uso → Manipulación de datos binarios.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "1. Copiar desde el inicio",
          "explicacion": "",
          "codigo": "const numeros=new Uint8Array(5);\nnumeros.set([10,20,30]);\nconsole.log(numeros);// Uint8Array(5) [10, 20, 30, 0, 0]",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "2. Copiar desde una posición específica",
          "explicacion": "",
          "codigo": "const numeros=new Uint8Array(6);\nnumeros.set([10,20,30],2);\nconsole.log(numeros);// Uint8Array(6) [0, 0, 10, 20, 30, 0]",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "3. Copiar un TypedArray dentro de otro",
          "explicacion": "",
          "codigo": "const origen=new Uint8Array([10,20,30]);\nconst destino=new Uint8Array(5);\ndestino.set(origen,1);\nconsole.log(destino);// Uint8Array(5) [0, 10, 20, 30, 0]",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "4. Sobrescribir datos existentes",
          "explicacion": "",
          "codigo": "const numeros=new Uint8Array([1,2,3,4,5]);\nnumeros.set([100,200],1);\nconsole.log(numeros);// Uint8Array(5) [1, 100, 200, 4, 5]",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-uint8array-from": {
    "id": "js-uint8array-from",
    "titulo": "Uint8Array.from",
    "icon": "🔢",
    "categoria": "TypedArray",
    "firma": "Uint8Array.from(arrayLike, mapFn)",
    "simulador": "typedarray",
    "definicion": [
      "`Uint8Array.from()`",
      "Es un **método estático** que crea una nueva instancia de `Uint8Array` a partir de un objeto iterable o array-like, copiando sus valores y convirtiéndolos en **enteros sin signo de 8 bits**.",
    ],
    "queEs": [
      "Es la versión de `from()` específica de `Uint8Array`.",
      "Permite tomar datos como un `Array`, una cadena iterable o cualquier otro iterable y convertirlos en un **Typed Array de bytes**.",
      "Cada elemento ocupa **1 byte** y puede representar valores de `0` a `255`.",
    ],
    "paraQueSirve": [
      "Principalmente para **convertir colecciones de valores en una secuencia de bytes**.",
      "Es especialmente útil cuando trabajas con:",
      "Datos binarios.",
      "`ArrayBuffer`.",
      "APIs que trabajan con bytes.",
      "Archivos.",
      "`TextEncoder`.",
      "Codificación y decodificación Base64.",
      "Procesamiento de datos de bajo nivel.",
    ],
    "comoFunciona": [
      "Conceptualmente:",
      "Cada valor se convierte a un entero sin signo de **8 bits**.",
      "Por ejemplo:",
      "Los valores que no pueden representarse directamente en `0–255` se convierten mediante la conversión a entero sin signo de 8 bits.",
    ],
    "sintaxis": [
      {
        "code": "Uint8Array.from(arrayLike)",
      },
      {
        "caption": "También admite una función de transformación:",
        "code": "Uint8Array.from(arrayLike,mapFn)",
      },
      {
        "caption": "**Parámetros:**",
        "code": "mapFn(element,index)",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "descripcion": "**1. Desde un **`Array`",
        "code": "const numeros= [10,20,30];\nconst bytes=Uint8Array.from(numeros);\nconsole.log(bytes);// Uint8Array(3) [10, 20, 30]\n\nconst datos=new Set([10,20,30]);\nconst bytes=Uint8Array.from(datos);\nconsole.log(bytes);// Uint8Array(3) [10, 20, 30]\n\nconst numeros= [1,2,3];\nconst bytes=Uint8Array.from(numeros,numero =>numero*10);\nconsole.log(bytes);// Uint8Array(3) [10, 20, 30]\n\n1 → 10\n2 → 20\n3 → 30\n\nconst bytes=Uint8Array.from([255,256,257]);\nconsole.log(bytes);// Uint8Array(3) [255, 0, 1]",
      },
    ],
    "errores": [
      {
        "texto": "**1. Pensar que conserva cualquier número** No almacenará `300`, porque un `Uint8Array` solo representa un byte. **2. Confundirlo con **`Array.from()` crea un **Array normal**. crea un **Typed Array de bytes**. **3. Confundir **`Uint8Array.from()`** con **`new Uint8Array()` Ambos pueden crear un `Uint8Array`, pero tienen usos diferentes: está pensado para **crear el Typed Array a partir de valores**. Mientras: crea un Typed Array con **3 posiciones inicializadas en 0**.",
        "code": "Uint8Array.from([300]);\n\n// Uint8Array(1) [44]\n\nArray.from(...)\n\nUint8Array.from(...)\n\nArray.from()\n    ↓\nArray\n\nUint8Array.from()\n    ↓\nUint8Array\n\nUint8Array.from([10,20,30]);\n\nnewUint8Array(3);",
      },
    ],
    "casos": [
      "Un caso muy relacionado con `btoa()` es convertir datos en bytes antes de realizar operaciones con Base64.",
      "Por ejemplo:",
      "Estos valores corresponden a bytes que pueden representar texto.",
      "También es común utilizar `Uint8Array` para manipular:",
    ],
    "relacion": [
      "Y dentro del ecosistema de datos binarios:",
      "También tiene una relación directa con:",
      "`Array.from()` → conversión a `Array`.",
      "`TextEncoder` → convierte texto en `Uint8Array`.",
      "`TextDecoder` → convierte bytes nuevamente en texto.",
      "`ArrayBuffer` → memoria binaria subyacente.",
      "`btoa()` / `atob()` → Base64.",
    ],
    "analogia": "Imagina una **caja de pequeñas casillas**, donde cada casilla solamente puede guardar un número entre **0 y 255**. Tienes: y dices: \"Quiero meter cada uno de estos valores en una casilla de 1 byte.\" Entonces: crea la caja:",
    "fuente": "**MDN Web Docs — **`Uint8Array.from()`",
    "notasPersonales": [
      "`Uint8Array.from()` es **estático**.",
      "Crea un **nuevo **`Uint8Array`.",
      "Convierte los elementos a enteros sin signo de **8 bits**.",
      "Rango representable: **0–255**.",
      "Cada elemento ocupa **1 byte**.",
      "Es muy útil para trabajar con **datos binarios**.",
      "`Array.from()` → `Array`.",
      "`Uint8Array.from()` → `Uint8Array`.",
      "`TextEncoder` devuelve un `Uint8Array`, por lo que ambos conceptos están estrechamente relacionados.",
      "**Idea clave:** `Uint8Array.from()` = **\"toma estos valores y conviértelos en una colección de bytes.\"**",
    ],
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Uint8Array.from?",
        "opciones": [
          "Ninguna de las anteriores",
          "Uint8Array.from(arrayLike, mapFn)",
          "typedArray.set(source, offset)",
          "Todas las anteriores",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Uint8Array.from?",
        "opciones": [
          "Es un método estático que crea una nueva instancia de Uint8Array a partir de un objeto iterable o array-like, copiando sus valores y…",
          "Ninguna de las anteriores",
          "Copia los elementos de un array, TypedArray u objeto iterable compatible dentro de un TypedArray existente, comenzando desde una posición…",
          "Todas las anteriores",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Uint8Array.from?",
        "opciones": [
          "1. Pensar que conserva cualquier número No almacenará 300, porque un Uint8Array solo representa un byte. 2. Confundirlo con…",
          "Ninguna de las anteriores",
          "1. Confundirlo con Array.prototype.set() Los Arrays normales no tienen .set(): set() pertenece a los TypedArrays.",
          "Todas las anteriores",
        ],
        "correcta": 0,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-uint8array-from-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es la versión de `from()` específica de `Uint8Array`.",
            },
            {
              "concepto": "¿Para qué sirve?",
              "descripcion": "Principalmente para convertir colecciones de valores en una secuencia de bytes.",
            },
            {
              "concepto": "Error común",
              "descripcion": "1. Pensar que conserva cualquier número No almacenará `300`, porque un `Uint8Array` solo representa un byte. 2. Confundirlo con `Array.from()` crea un Array normal. crea…",
            },
            {
              "concepto": "Caso de uso",
              "descripcion": "Un caso muy relacionado con `btoa()` es convertir datos en bytes antes de realizar operaciones con Base64.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "¿Qué es? → Es la versión de `from()` específica de `Uint8Array`. · ¿Para qué sirve? → Principalmente para convertir colecciones de valores en una secuencia de bytes. · Error común → 1. Pensar que conserva cualquier número No almacenará `300`, porque un `Uint8Array` solo representa un byte. 2. Confundirlo con `Array.from()` crea un Array normal. crea… · Caso de uso → Un caso muy relacionado con `btoa()` es convertir datos en bytes antes de realizar operaciones con Base64.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "Ejemplo 1",
          "explicacion": "**1. Desde un **`Array`",
          "codigo": "const numeros= [10,20,30];\nconst bytes=Uint8Array.from(numeros);\nconsole.log(bytes);// Uint8Array(3) [10, 20, 30]\n\nconst datos=new Set([10,20,30]);\nconst bytes=Uint8Array.from(datos);\nconsole.log(bytes);// Uint8Array(3) [10, 20, 30]\n\nconst numeros= [1,2,3];\nconst bytes=Uint8Array.from(numeros,numero =>numero*10);\nconsole.log(bytes);// Uint8Array(3) [10, 20, 30]\n\n1 → 10\n2 → 20\n3 → 30\n\nconst bytes=Uint8Array.from([255,256,257]);\nconsole.log(bytes);// Uint8Array(3) [255, 0, 1]",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
};
