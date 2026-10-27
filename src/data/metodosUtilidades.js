// Formato inline permitido en los textos: **negrita**, *cursiva* y `código`
// Los items de las listas pueden ser string o { texto, code, nota }
// simulador: true -> SimuladorBusqueda | 'mutador' -> SimuladorMutador | 'utilidad' -> SimuladorUtilidad

export const METODOS_UTILIDADES = {
  /* ============================ Array.of() ============================ */
  of: {
    id: "of",
    titulo: "Array.of()",
    simulador: "utilidad",
    definicion: [
      "Es un **método estático** de `Array` que crea un nuevo array utilizando los argumentos que recibe como elementos.",
      "Devuelve un **nuevo array**; no modifica nada existente.",
    ],
    queEs: [
      "Piensa en él como una forma directa de decir: *convierte estos valores en un array*.",
      "Al ser estático, se llama desde el constructor global (`Array.of(...)`) y no desde una instancia.",
      "Existe para evitar el comportamiento especial de `new Array()` cuando recibe **un solo número**.",
    ],
    paraQueSirve: [
      "Crear arrays a partir de uno o varios valores individuales.",
      "Evitar la ambigüedad entre `new Array(5)` (5 huecos vacíos) y `Array.of(5)` (el array `[5]`).",
      "Trabajar de forma predecible con la API de `Array`, por ejemplo al extender la clase `Array`.",
    ],
    comoFunciona: [
      "Recibe **cero o más argumentos** de cualquier tipo (números, strings, objetos, `null`...).",
      "Cada argumento se convierte en un elemento del nuevo array, respetando el orden.",
      "La propiedad `length` queda igual a la cantidad de argumentos.",
      "Retorna el nuevo array. Sin argumentos retorna `[]`.",
    ],
    sintaxis: [
      {
        code: `const nuevo = Array.of(elemento0, elemento1, ..., elementoN);`,
      },
      {
        caption: "Puede recibir cero, uno o varios argumentos:",
        code: `Array.of();         // []
Array.of(10);       // [10]
Array.of(10, 20);   // [10, 20]`,
      },
    ],
    nota: "**Parámetros:** cero o más argumentos. **Retorno:** un nuevo objeto `Array`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Varios valores",
        code: `const numeros = Array.of(10, 20, 30);
console.log(numeros); // [10, 20, 30]`,
      },
      {
        titulo: "Ejemplo 2: Un solo número (el ejemplo clave)",
        code: `console.log(Array.of(5));  // [5]  -> 5 es un ELEMENTO
console.log(new Array(5)); // [ <5 empty items> ] -> 5 es la LONGITUD`,
      },
      {
        titulo: "Ejemplo 3: Sin argumentos",
        code: `console.log(Array.of()); // []`,
      },
      {
        titulo: "Ejemplo 4: Diferentes tipos",
        code: `const datos = Array.of(25, "Josue", true, null);
console.log(datos); // [25, "Josue", true, null]`,
      },
    ],
    errores: [
      {
        texto:
          "**Confundir `Array.of()` con `Array.from()`:** `of` usa sus argumentos como elementos; `from` convierte un iterable o array-like.",
        code: `Array.of(1, 2, 3);     // [1, 2, 3]
Array.from("Hola");    // ["H", "o", "l", "a"]
Array.of("Hola");      // ["Hola"]`,
      },
      {
        texto:
          "**Creer que `Array.of(5)` crea un array de longitud 5:** crea `[5]`. Para una longitud fija usa `new Array(5)` o `Array(5).fill(0)`.",
        code: `Array.of(5).length;   // 1
new Array(5).length;  // 5`,
      },
    ],
    casos: [
      {
        texto: "**Funciones que reciben valores sueltos:**",
        code: `function crearLista(...valores) {
  return Array.of(...valores);
}
crearLista("A", "B", "C"); // ["A", "B", "C"]`,
      },
      "**Subclases de `Array`:** `MiArray.of(...)` crea una instancia de la subclase, algo que un literal `[...]` no hace.",
      "**Código genérico:** cuando quieres que cada argumento sea un elemento sin importar su tipo ni su cantidad.",
    ],
    relacion: [
      "**`Array.from()`:** crea un array desde un iterable o array-like (strings, `Set`, `NodeList`).",
      "**`new Array()`:** el constructor. Con un único número lo interpreta como longitud.",
      "**Literal `[...]`:** casi siempre es suficiente. `Array.of()` destaca cuando trabajas con la API de `Array` o con subclases.",
    ],
    analogia:
      'Imagina una caja. Con `Array.of(5)` le dices: **"mete el número 5 dentro de la caja"** y obtienes `[5]`. Con `new Array(5)` le dices: **"hazme una caja con espacio para 5 elementos"** y obtienes 5 casilleros vacíos. Por eso `Array.of()` es más predecible: cada argumento es un elemento.',
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** `of` significa *de estos valores*. `Array.of(A, B, C)` da `[A, B, C]`, siempre.",
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve Array.of(5)?",
        opciones: ["[5]", "Un array con 5 huecos vacíos", "5", "undefined"],
        correcta: 0,
      },
      {
        id: 2,
        pregunta: "¿Qué crea new Array(5)?",
        opciones: [
          "[5]",
          "Un array de longitud 5 con huecos vacíos",
          "Un error",
          "[0, 0, 0, 0, 0]",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué tipo de método es Array.of()?",
        opciones: [
          "De instancia (Array.prototype)",
          "Estático",
          "Una propiedad",
          "Un getter",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué devuelve Array.of() sin argumentos?",
        opciones: ["undefined", "[]", "[undefined]", "Un error"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: 'Array.of(10, "Hola", true, null) devuelve...',
        opciones: [
          "[10]",
          '[10, "Hola", true, null]',
          "Un error por tipos mixtos",
          '["10", "Hola", "true", "null"]',
        ],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿Cuál es la diferencia entre Array.of() y Array.from()?",
        opciones: [
          "from convierte un iterable o array-like; of usa sus argumentos como elementos",
          "Son idénticos",
          "of acepta iterables",
          "from es estático y of no",
        ],
        correcta: 0,
      },
      {
        id: 7,
        pregunta: "¿Qué devuelve new Array(1, 2, 3)?",
        opciones: ["[1, 2, 3]", "Un array con 3 huecos", "[3]", "Un error"],
        correcta: 0,
      },
      {
        id: 8,
        pregunta: "¿Cuándo aparece la diferencia entre of y new Array?",
        opciones: [
          "Con strings",
          "Con objetos",
          "Cuando recibe un único número",
          "Siempre",
        ],
        correcta: 2,
      },
    ],
  },

  /* ============================ some() ============================ */
  some: {
    id: "some",
    titulo: "Array.prototype.some()",
    simulador: true,
    definicion: [
      "Es un método iterativo de `Array.prototype` que comprueba si **al menos un elemento** del array cumple una condición definida por una función callback.",
      "Devuelve un **booleano**: `true` si encuentra un elemento que cumple, `false` si ninguno cumple.",
    ],
    queEs: [
      "Es un método de orden superior que forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
      "Ejecuta el callback sobre cada elemento y se detiene en cuanto obtiene `true` (*short-circuit*).",
    ],
    paraQueSirve: [
      "Verificar si existe algún elemento que cumpla una regla.",
      "Validar permisos, disponibilidad de datos o campos vacíos antes de ejecutar una acción.",
      "Buscar coincidencias cuando **no te importa cuál** elemento es, solo si existe.",
    ],
    comoFunciona: [
      "Recorre el array desde el índice `0` en adelante.",
      "Ejecuta el callback con cada elemento.",
      "**Cortocircuito:** en cuanto el callback devuelve un valor truthy, se detiene y devuelve `true`.",
      "Si termina todo el array sin coincidencias (o el array está vacío), devuelve `false`.",
    ],
    sintaxis: [
      {
        code: `const hayAlguno = array.some((elemento, indice, array) => {
  // Condición que debe devolver true o false
  return condicion;
}, thisArg);`,
      },
      {
        caption: "Forma corta:",
        code: `const existe = array.some(elemento => elemento > 10);`,
      },
    ],
    nota: "**Parámetros:** `callback(elemento, indice, array)` y `thisArg` (opcional, el valor de `this` dentro del callback). **Retorno:** `true` o `false`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Comprobar si hay algún mayor de edad",
        code: `const edades = [12, 15, 20, 14];
const hayAdulto = edades.some(edad => edad >= 18);

console.log(hayAdulto); // true (se detiene en 20)`,
      },
      {
        titulo: "Ejemplo 2: Buscar un administrador en objetos",
        code: `const usuarios = [
  { nombre: "Ana", admin: false },
  { nombre: "Luis", admin: true }
];
const existeAdmin = usuarios.some(u => u.admin);

console.log(existeAdmin); // true`,
      },
      {
        titulo: "Ejemplo 3: Cuando ninguno cumple, y el array vacío",
        code: `console.log([1, 2, 3].some(n => n > 10)); // false
console.log([].some(n => n > 0));         // false (no hay elementos)`,
      },
    ],
    errores: [
      {
        texto:
          "**Confundir `some()` con `every()`:** `some` pregunta *¿existe al menos uno?*; `every` pregunta *¿todos cumplen?*.",
        code: `[2, 5, 8].some(x => x % 2 === 0);  // true
[2, 5, 8].every(x => x % 2 === 0); // false`,
      },
      {
        texto:
          "**Esperar el elemento encontrado:** `some()` devuelve `true`, no el valor. Para obtener el elemento usa `find()`.",
        code: `[1, 2, 3].some(x => x === 2); // true  (no 2)
[1, 2, 3].find(x => x === 2); // 2`,
      },
      {
        texto:
          "**Olvidar el `return` con llaves:** sin `return`, el callback devuelve `undefined` y `some()` siempre da `false`.",
        code: `// ❌ Siempre false
numeros.some(n => { n > 5; });

// ✅ Correcto
numeros.some(n => { return n > 5; });`,
      },
    ],
    casos: [
      "**Validar permisos:** `permisos.some(p => p === 'eliminar')`.",
      "**Validación de formularios:** `campos.some(c => c === '')` para detectar campos vacíos.",
      "**Disponibilidad:** `productos.some(p => p.stock > 0)` para saber si hay algo en stock.",
    ],
    relacion: [
      "**`every()`:** ¿todos cumplen?",
      "**`find()`:** devuelve el primer elemento que cumple.",
      "**`filter()`:** devuelve todos los que cumplen.",
      "**`includes()`:** busca un valor exacto, sin callback.",
    ],
    analogia:
      'Imagina un detector de humo en una casa con varias habitaciones: sala, cocina y dormitorio. El detector pregunta **"¿hay humo en alguna habitación?"**. En cuanto encuentra una con humo dice que sí, y no necesita revisar las demás. Eso es `some()`.',
    fuente: "MDN Web Docs | ECMAScript Specification",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve some()?",
        opciones: [
          "El primer elemento que cumple",
          "Un booleano",
          "Un nuevo array",
          "El índice del elemento",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve [].some(x => x > 0)?",
        opciones: ["true", "undefined", "false", "Un error"],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿Qué pasa cuando some() encuentra una coincidencia?",
        opciones: [
          "Sigue recorriendo el array",
          "Se detiene y devuelve true",
          "Devuelve el elemento",
          "Lanza un error",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Cuál es la diferencia entre some() y every()?",
        opciones: [
          "some: ¿existe al menos uno? every: ¿todos cumplen?",
          "Son iguales",
          "every es más rápido",
          "some modifica el array",
        ],
        correcta: 0,
      },
      {
        id: 5,
        pregunta:
          "Si necesitas el elemento encontrado y no un booleano, usas...",
        opciones: ["some()", "find()", "every()", "join()"],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿some() modifica el array original?",
        opciones: ["Sí", "Solo con objetos", "No", "Depende del callback"],
        correcta: 2,
      },
      {
        id: 7,
        pregunta:
          "Con [12, 15, 20, 14].some(e => e >= 18), ¿cuántos elementos evalúa?",
        opciones: ["4", "3", "1", "2"],
        correcta: 1,
      },
      {
        id: 8,
        pregunta: "¿Por qué numeros.some(n => { n > 5; }) siempre da false?",
        opciones: [
          "Porque some no acepta llaves",
          "Porque falta el return y el callback devuelve undefined",
          "Porque n es muy pequeño",
          "Porque el array está vacío",
        ],
        correcta: 1,
      },
    ],
  },

  /* ============================ Array.isArray() ============================ */
  isarray: {
    id: "isarray",
    titulo: "Array.isArray()",
    simulador: "utilidad",
    definicion: [
      "Es un **método estático** de `Array` que determina si el valor recibido es un arreglo.",
      "Devuelve un **booleano** (`true` o `false`).",
    ],
    queEs: [
      "A diferencia de `push()` o `map()`, **no está en el prototipo**: no se llama sobre una instancia (`lista.isArray()` falla), sino desde el constructor: `Array.isArray(lista)`.",
      "Es la solución estándar y confiable para verificar si un valor es realmente un arreglo.",
    ],
    paraQueSirve: [
      "**Validar tipos de datos** con precisión.",
      "En JavaScript, arreglos, objetos, `null` y otros se identifican con `typeof` como `'object'`. `Array.isArray()` separa los arreglos reales de todo lo demás.",
    ],
    comoFunciona: [
      "Analiza la estructura interna del valor proporcionado.",
      "Devuelve `true` si es un arreglo creado con `[]` o con `new Array()`.",
      "Devuelve `false` para cualquier otro valor: objetos planos, strings, números, `null`, `undefined`, objetos array-like (`arguments`, `NodeList`).",
      "Funciona incluso con arreglos creados en otro contexto de ejecución (por ejemplo, un `iframe`).",
    ],
    sintaxis: [
      {
        code: `const esArreglo = Array.isArray(valorAVerificar);`,
      },
    ],
    nota: "**Parámetro:** `valorAVerificar`, cualquier valor. **Retorno:** `true` si es un arreglo, `false` en caso contrario.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Evaluaciones que dan true",
        code: `console.log(Array.isArray([]));              // true
console.log(Array.isArray([1, 2, 3]));       // true
console.log(Array.isArray(new Array()));     // true
console.log(Array.isArray(Array.prototype)); // true (curiosamente, también es un arreglo)`,
      },
      {
        titulo: "Ejemplo 2: Evaluaciones que dan false",
        code: `console.log(Array.isArray({}));        // false (objeto plano)
console.log(Array.isArray(null));      // false
console.log(Array.isArray(undefined)); // false
console.log(Array.isArray("[]"));      // false (es un string)`,
      },
    ],
    errores: [
      {
        texto: "**Llamarlo desde una instancia:** es un método estático.",
        code: `const lista = [1, 2];

// ❌ TypeError: lista.isArray is not a function
lista.isArray();

// ✅ Correcto
Array.isArray(lista); // true`,
      },
      {
        texto:
          "**Confundir objetos array-like con arreglos:** `arguments` y `NodeList` tienen índices y `length`, pero no son arreglos.",
        code: `const parrafos = document.querySelectorAll("p"); // NodeList
console.log(Array.isArray(parrafos));            // false
console.log(Array.isArray(Array.from(parrafos))); // true`,
        nota: "Si necesitas tratarlo como arreglo, conviértelo antes con `Array.from()`.",
      },
    ],
    casos: [
      {
        texto:
          "**Defensa en funciones reutilizables:** validar que el parámetro sea un arreglo antes de procesarlo.",
        code: `function procesarLista(datos) {
  if (!Array.isArray(datos)) {
    throw new TypeError("Se esperaba un arreglo de elementos.");
  }
  datos.forEach((elemento) => console.log(elemento));
}`,
      },
      "**APIs con respuestas variables:** comprobar si una respuesta llegó como lista o como objeto único antes de iterarla.",
    ],
    relacion: [
      "**`typeof`:** `typeof []` devuelve `'object'`, igual que un objeto plano. No sirve para distinguirlos.",
      "**`instanceof`:** `[] instanceof Array` funciona casi siempre, pero **falla** con arreglos creados en otro contexto (un `iframe`), porque cada contexto tiene su propio constructor `Array`. `Array.isArray()` es inmune a ese problema.",
      "**`Array.from()`:** convierte objetos array-like en arreglos reales.",
    ],
    analogia:
      'Imagina que eres un oficial de aduanas y recibes paquetes de todas formas y tamaños. `typeof` es un escáner básico que solo dice **"es una caja de cartón"** (`"object"`). `Array.isArray()` es un **perro detector de arreglos**: sin importar la etiqueta ni el país de origen (`iframe`), solo ladra (`true`) si dentro hay un arreglo de verdad.',
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla de oro:** olvídate de `typeof` o de trucos como `objeto.constructor === Array` para validar arreglos. Usa `Array.isArray()` como estándar.",
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve Array.isArray()?",
        opciones: ["El tipo del valor", "Un booleano", "El length", "Un array"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Cómo se llama correctamente?",
        opciones: [
          "lista.isArray()",
          "Array.isArray(lista)",
          "lista.isArray",
          "isArray(lista)",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve typeof []?",
        opciones: ['"array"', '"object"', '"list"', '"undefined"'],
        correcta: 1,
      },
      {
        id: 4,
        pregunta:
          "¿Qué devuelve Array.isArray(document.querySelectorAll('p'))?",
        opciones: [
          "true",
          "false, porque un NodeList es array-like",
          "Un error",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Por qué isArray es mejor que instanceof Array?",
        opciones: [
          "Es más corto",
          "Funciona con arreglos de otros contextos como un iframe",
          "Acepta callbacks",
          "No hay diferencia",
        ],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿Qué devuelve Array.isArray(null)?",
        opciones: ["true", "false", "undefined", "Un error"],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿Cómo conviertes un NodeList en un arreglo real?",
        opciones: [
          "Array.isArray(lista)",
          "Array.from(lista)",
          "lista.toArray()",
          "lista.join()",
        ],
        correcta: 1,
      },
      {
        id: 8,
        pregunta: "¿Qué devuelve Array.isArray('[]')?",
        opciones: ["true", "false", "Un error", "undefined"],
        correcta: 1,
      },
    ],
  },

  /* ============================ at() ============================ */
  at: {
    id: "at",
    titulo: "Array.prototype.at()",
    simulador: "utilidad",
    definicion: [
      "Es un método de `Array.prototype` que recibe un entero (positivo o negativo) y devuelve el elemento que está en esa posición.",
      "Es de **solo lectura**: no modifica el array.",
    ],
    queEs: [
      "Introducido en ECMAScript 2022, es un método de conveniencia para acceder a elementos.",
      "A diferencia de `arreglo[indice]`, `at()` acepta **valores negativos**, que cuentan desde el final hacia el principio.",
    ],
    paraQueSirve: [
      "Acceder al **último elemento** (o a los finales) de forma legible: `arr.at(-1)`.",
      "Evitar la sintaxis repetitiva `arr[arr.length - 1]`.",
      "Usar el mismo acceso con arreglos, strings y TypedArrays.",
    ],
    comoFunciona: [
      "**Índice ≥ 0:** se comporta igual que los corchetes. `arr.at(0)` es el primer elemento.",
      "**Índice < 0:** cuenta desde el final. Internamente usa `length + indice`: `at(-1)` es el último, `at(-2)` el penúltimo.",
      "**Decimales:** el índice se trunca a entero (como `Math.trunc()`).",
      "**Fuera de rango:** devuelve `undefined` sin lanzar error.",
    ],
    sintaxis: [
      {
        code: `const elemento = arreglo.at(indice);`,
      },
    ],
    nota: "**Parámetro:** `indice`, un entero que puede ser negativo. **Retorno:** el elemento en esa posición o `undefined`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Acceder al último elemento",
        code: `const tecnologias = ["HTML", "CSS", "JavaScript", "React"];

// Enfoque clásico
const ultimoClasico = tecnologias[tecnologias.length - 1]; // "React"

// Enfoque moderno
const ultimoModerno = tecnologias.at(-1); // "React"`,
      },
      {
        titulo: "Ejemplo 2: Índices positivos, negativos y fuera de rango",
        code: `const notas = [12, 15, 18, 20];

console.log(notas.at(1));   // 15 (segundo elemento)
console.log(notas.at(-2));  // 18 (penúltimo)
console.log(notas.at(10));  // undefined (fuera de rango)`,
      },
    ],
    errores: [
      {
        texto:
          "**Intentar asignar con `at()`:** solo sirve para leer. No puedes usarlo para modificar un elemento.",
        code: `const frutas = ["manzana", "pera"];

// ❌ Error de sintaxis
frutas.at(-1) = "plátano";

// ✅ Usa corchetes para asignar
frutas[frutas.length - 1] = "plátano";`,
      },
      "**Creer que lanza error al salirse del rango:** no lo hace, devuelve `undefined`. Si lo encadenas con otras propiedades sin validar, el error aparece después.",
    ],
    casos: [
      "**Último elemento de una colección:** el último mensaje recibido en un chat, el último registro de un historial.",
      {
        texto:
          "**Pipelines de métodos encadenados:** acceder a un elemento tras transformar, sin guardar un resultado intermedio.",
        code: `const masViejo = usuarios
  .filter((u) => u.activo)
  .toSorted((a, b) => a.edad - b.edad)
  .at(-1); // usuario activo de mayor edad`,
      },
    ],
    relacion: [
      {
        texto:
          "**`String.prototype.at()`:** los strings tienen el mismo método.",
        code: `"JavaScript".at(-1); // "t"`,
      },
      "**TypedArrays:** `Int32Array`, `Uint8Array` y similares también lo implementan.",
      "**Corchetes `arr[i]`:** siguen siendo la convención para accesos estáticos desde el inicio, como `arr[0]`.",
    ],
    analogia:
      'Imagina una fila de personas. Con corchetes tienes que contar desde el principio: "la persona 0, la 1, la 2...". Con `at()` es como tener un megáfono: **"¡el que está al final!"** (`at(-1)`) o **"¡el penúltimo!"** (`at(-2)`). No necesitas saber cuánta gente hay en la fila.',
    fuente: "MDN Web Docs | ECMAScript 2022 Specification (TC39)",
    notasPersonales: [
      "**Cuándo usarlo:** haz de `.at(-1)` tu opción por defecto para el último elemento. Para accesos desde el inicio como `arr[0]`, los corchetes siguen siendo la convención más rápida.",
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve [10, 20, 30].at(-1)?",
        opciones: ["10", "20", "30", "undefined"],
        correcta: 2,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve at() si el índice está fuera de rango?",
        opciones: ["-1", "null", "Un error", "undefined"],
        correcta: 3,
      },
      {
        id: 3,
        pregunta: "¿Cuál es la ventaja principal de at() sobre los corchetes?",
        opciones: [
          "Es más rápido",
          "Acepta índices negativos",
          "Permite asignar valores",
          "Modifica el array",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué pasa con arr.at(1.9)?",
        opciones: [
          "Redondea a 2",
          "Se trunca a 1",
          "Lanza un error",
          "Devuelve undefined",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Se puede hacer arr.at(-1) = 'x'?",
        opciones: [
          "Sí",
          "Solo con strings",
          "No, at() es de solo lectura",
          "Solo con números",
        ],
        correcta: 2,
      },
      {
        id: 6,
        pregunta: "Con [12, 15, 18, 20], ¿qué devuelve at(-2)?",
        opciones: ["15", "18", "20", "12"],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿En qué versión de ECMAScript se introdujo at()?",
        opciones: ["ES5", "ES2015", "ES2022", "ES2010"],
        correcta: 2,
      },
      {
        id: 8,
        pregunta: "¿at() también existe en los strings?",
        opciones: [
          "No",
          "Sí, con el mismo comportamiento",
          "Sí, pero solo con índices positivos",
          "Solo en TypedArrays",
        ],
        correcta: 1,
      },
    ],
  },

  /* ============================ length ============================ */
  length: {
    id: "length",
    titulo: "Array.prototype.length",
    simulador: "utilidad",
    definicion: [
      "Es una **propiedad** de las instancias de `Array` que representa el **número de elementos** del arreglo.",
      "Su valor es un entero de 32 bits sin signo.",
    ],
    queEs: [
      "A diferencia de los métodos anteriores, `length` **no es una función**: no se invoca con paréntesis.",
      "Es una propiedad de **lectura y escritura**: además de reflejar el tamaño, puede modificarse para truncar o extender el arreglo.",
    ],
    paraQueSirve: [
      "Saber cuántos elementos contiene una colección.",
      "Vaciar un arreglo rápidamente: `arr.length = 0`.",
      "Eliminar elementos del final (truncar).",
      "Agregar un elemento en la última posición disponible: `arr[arr.length] = x`.",
    ],
    comoFunciona: [
      "**Actualización automática:** al agregar o quitar elementos (`push`, `pop`, `shift`, asignación por índice...), JavaScript actualiza `length`.",
      "**Regla del índice más alto:** `length` siempre es **uno más** que el índice más grande. Si el índice más alto es `4`, `length` es `5`.",
      "**Si reduces `length`:** los elementos sobrantes se eliminan de forma destructiva y permanente.",
      "**Si aumentas `length`:** el arreglo se extiende con **huecos vacíos** que devuelven `undefined` al leerlos.",
    ],
    sintaxis: [
      {
        caption: "Para leer el tamaño:",
        code: `const tamaño = arreglo.length;`,
      },
      {
        caption: "Para modificar el tamaño:",
        code: `arreglo.length = nuevoTamaño;`,
      },
    ],
    nota: "**Valores válidos:** enteros entre `0` y `4294967295`. Cualquier otro valor lanza `RangeError: Invalid array length`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Lectura básica",
        code: `const animales = ["perro", "gato", "mapache"];
console.log(animales.length); // 3`,
      },
      {
        titulo: "Ejemplo 2: Truncar un arreglo",
        code: `const numeros = [1, 2, 3, 4, 5];
numeros.length = 3;

console.log(numeros); // [1, 2, 3] (el 4 y el 5 se eliminaron)`,
      },
      {
        titulo: "Ejemplo 3: Vaciar un arreglo",
        code: `let carrito = ["iPhone", "Funda", "Cargador"];
carrito.length = 0;

console.log(carrito); // []`,
      },
      {
        titulo: "Ejemplo 4: Extender un arreglo",
        code: `const lista = ["a", "b"];
lista.length = 4;

console.log(lista); // ["a", "b", <2 empty items>]`,
      },
    ],
    errores: [
      {
        texto:
          "**Llamarlo como función:** error típico al venir de lenguajes donde se usa `length()`.",
        code: `const nombres = ["Ana", "Juan"];
console.log(nombres.length());
// ❌ TypeError: nombres.length is not a function`,
      },
      {
        texto:
          "**Confundirse con arreglos dispersos (sparse):** `length` mide el índice más alto + 1, no la cantidad de elementos reales.",
        code: `const raro = [];
raro[100] = "Sorpresa";

console.log(raro.length); // 101 (aunque solo hay un elemento real)`,
      },
      "**Truncar sin darse cuenta:** `arr.length = 2` borra todo lo que estaba después y no hay forma de recuperarlo.",
    ],
    casos: [
      {
        texto: "**Bucles `for` clásicos:** `length` marca el límite.",
        code: `for (let i = 0; i < arreglo.length; i++) {
  console.log(arreglo[i]);
}`,
      },
      {
        texto: "**Añadir un elemento al final sin `push()`:**",
        code: `const lista = ["a", "b"];
lista[lista.length] = "c"; // lista = ["a", "b", "c"]`,
      },
    ],
    relacion: [
      "**`String.prototype.length`:** los strings también la tienen, pero es de **solo lectura**: `'hola'.length = 2` no hace nada.",
      "**`Function.prototype.length`:** indica cuántos parámetros espera la función (su aridad).",
      "**`push()` / `pop()`:** modifican `length` automáticamente.",
    ],
    analogia:
      "Imagina un tren de vagones de carga. `length` es una **barrera física** colocada justo después del último vagón. Si enganchas un vagón nuevo, la barrera se mueve sola un espacio hacia atrás. Si tú arrastras la barrera hacia adelante (reduces `length`), los vagones que queden del otro lado se desenganchan y se pierden.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    quiz: [
      {
        id: 1,
        pregunta: "¿length es una función o una propiedad?",
        opciones: [
          "Una función",
          "Una propiedad",
          "Un método estático",
          "Un getter de solo lectura",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué pasa con const a = [1, 2, 3, 4, 5]; a.length = 2;?",
        opciones: [
          "No cambia nada",
          "a queda [1, 2]",
          "a queda [4, 5]",
          "Lanza un error",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Cómo se vacía un arreglo con length?",
        opciones: [
          "arr.length = 1",
          "arr.length = 0",
          "arr.length = null",
          "arr.length()",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta:
          "Si el índice más alto de un arreglo es 4, ¿cuánto vale length?",
        opciones: ["4", "5", "3", "Depende"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "const r = []; r[100] = 'x'; ¿cuánto vale r.length?",
        opciones: ["1", "100", "101", "0"],
        correcta: 2,
      },
      {
        id: 6,
        pregunta:
          "¿Qué pasa al aumentar length más allá de los elementos existentes?",
        opciones: [
          "Se rellenan con 0",
          "Se crean huecos vacíos",
          "Se rellenan con null",
          "Lanza un error",
        ],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿Qué ocurre con arr.length = -1?",
        opciones: [
          "Vacía el arreglo",
          "Lanza RangeError: Invalid array length",
          "Elimina el último elemento",
          "No hace nada",
        ],
        correcta: 1,
      },
      {
        id: 8,
        pregunta: "¿length de un string es de lectura y escritura?",
        opciones: [
          "Sí",
          "No, es de solo lectura",
          "Solo en modo estricto",
          "Depende del navegador",
        ],
        correcta: 1,
      },
    ],
  },

  /* ============================ concat() ============================ */
  concat: {
    id: "concat",
    titulo: "Array.prototype.concat()",
    simulador: "utilidad",
    definicion: [
      "Es un método de `Array.prototype` que **une dos o más arrays o valores** y devuelve un **nuevo array** con todos los elementos combinados.",
      "Es **inmutable**: no modifica los arrays originales.",
    ],
    queEs: [
      "Es un método heredado de `Array.prototype` que forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
      "Sirve para crear combinaciones de arrays sin alterar los datos de origen.",
    ],
    paraQueSirve: [
      "Unir arrays y combinar listas de datos.",
      "Crear copias extendidas de un array.",
      "Evitar mutaciones cuando trabajas con datos inmutables (por ejemplo, en React).",
      "Combinar resultados de distintas fuentes.",
    ],
    comoFunciona: [
      "Recibe uno o varios argumentos (arrays o valores sueltos).",
      "Copia los elementos del array original en un array nuevo.",
      "**Arrays como argumento:** agrega sus elementos (aplana **un solo nivel**).",
      "**Valores sueltos:** los agrega tal cual. Devuelve el nuevo array.",
    ],
    sintaxis: [
      {
        code: `const nuevo = array.concat(valor1, valor2, ..., valorN);`,
      },
    ],
    nota: "**Parámetros:** arrays o valores individuales, en cualquier cantidad. **Retorno:** un nuevo array combinado.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Unir dos arrays",
        code: `const frutas = ["Manzana", "Pera"];
const frutas2 = ["Uva", "Fresa"];
const todas = frutas.concat(frutas2);

console.log(todas); // ["Manzana", "Pera", "Uva", "Fresa"]`,
      },
      {
        titulo: "Ejemplo 2: Agregar valores individuales",
        code: `const numeros = [1, 2, 3];
console.log(numeros.concat(4, 5)); // [1, 2, 3, 4, 5]`,
      },
      {
        titulo: "Ejemplo 3: Combinar varios arrays y valores mixtos",
        code: `const a = [1, 2];
const b = [3, 4];
const c = [5, 6];

console.log(a.concat(b, c));         // [1, 2, 3, 4, 5, 6]
console.log(a.concat("Hola", true)); // [1, 2, "Hola", true]`,
      },
      {
        titulo: "Ejemplo 4: No modifica el original",
        code: `const colores = ["Rojo", "Azul"];
colores.concat("Verde");
console.log(colores); // ["Rojo", "Azul"]

// Para conservar el resultado, guárdalo:
const nuevos = colores.concat("Verde");`,
      },
    ],
    errores: [
      {
        texto:
          "**Pensar que modifica el array original:** `concat()` devuelve un array nuevo; si no lo guardas, el resultado se pierde.",
        code: `const numeros = [1, 2];
numeros.concat([3, 4]);
console.log(numeros); // [1, 2]`,
      },
      {
        texto:
          "**Confundirlo con `push()`:** `push()` muta el array y devuelve la nueva longitud; `concat()` no muta y devuelve un array.",
        code: `const a = [1, 2];
a.concat(3);
console.log(a); // [1, 2]

a.push(3);
console.log(a); // [1, 2, 3]`,
      },
      {
        texto:
          "**Esperar una copia profunda:** `concat()` hace una copia **superficial**. Los objetos internos siguen compartiendo referencia.",
        code: `const datos = [{ nombre: "Ana" }];
const copia = datos.concat();
copia[0].nombre = "Luis";

console.log(datos[0].nombre); // "Luis"`,
      },
    ],
    casos: [
      {
        texto: "**Combinar resultados de APIs:**",
        code: `const todos = usuariosActivos.concat(usuariosNuevos);`,
      },
      "**Nuevos estados en React:** crear una lista nueva sin mutar el estado actual.",
      "**Programación funcional:** encadenar transformaciones sin efectos secundarios.",
    ],
    relacion: [
      {
        texto:
          "**Spread `[...a, ...b]`:** alternativa moderna que produce el mismo resultado.",
        code: `a.concat(b);   // [1, 2, 3, 4]
[...a, ...b];  // [1, 2, 3, 4]`,
      },
      "**`push()`:** agrega al final **mutando** el original.",
      "**`slice()`:** copia partes de un array.",
      "**`String.prototype.concat()`:** existe para strings, pero es un método distinto.",
    ],
    analogia:
      "Imagina dos listas de compras: la lista A (Pan, Leche) y la lista B (Huevos, Arroz). `concat()` crea una **tercera lista** con Pan, Leche, Huevos y Arroz, pero las dos listas originales siguen igual. Es como hacer una fotocopia combinada, no pegar físicamente las hojas originales.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve concat()?",
        opciones: [
          "La nueva longitud",
          "Un nuevo array combinado",
          "El array original modificado",
          "Un string",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿concat() modifica el array original?",
        opciones: ["Sí", "No", "Solo con números", "Solo con strings"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve [1, 2].concat([3, 4], 5)?",
        opciones: [
          "[1, 2, [3, 4], 5]",
          "[1, 2, 3, 4, 5]",
          "[3, 4, 5]",
          "[1, 2, 3, 4]",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué tipo de copia hace concat()?",
        opciones: [
          "Profunda",
          "Superficial",
          "Ninguna",
          "Depende del contenido",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Cuál es la diferencia entre concat() y push()?",
        opciones: [
          "concat no muta y devuelve un array; push muta y devuelve la longitud",
          "Son iguales",
          "push no muta",
          "concat devuelve la longitud",
        ],
        correcta: 0,
      },
      {
        id: 6,
        pregunta: "¿Cuántos niveles aplana concat() cuando recibe arrays?",
        opciones: ["Ninguno", "Uno", "Todos", "Dos"],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿Cuál es la alternativa moderna a a.concat(b)?",
        opciones: ["[...a, ...b]", "a.push(b)", "a + b", "a.join(b)"],
        correcta: 0,
      },
      {
        id: 8,
        pregunta: "¿Qué devuelve original.concat()?",
        opciones: [
          "undefined",
          "Una copia superficial del array",
          "Un array vacío",
          "Un error",
        ],
        correcta: 1,
      },
    ],
  },

  /* ============================ join() ============================ */
  join: {
    id: "join",
    titulo: "Array.prototype.join()",
    simulador: "utilidad",
    definicion: [
      "Es un método de `Array.prototype` que **une todos los elementos de un array en una cadena de texto**, usando un separador opcional.",
      "Devuelve un **nuevo string** y **no modifica el array original**.",
    ],
    queEs: [
      "Es un método de arrays que forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
      "Realiza la operación inversa de `split()`: `join()` va de **Array a String** y `split()` va de **String a Array**.",
    ],
    paraQueSirve: [
      "Convertir arrays en textos y crear frases dinámicamente.",
      "Generar URLs, rutas y listas separadas por comas.",
      "Construir mensajes y formatear datos para mostrarlos al usuario.",
    ],
    comoFunciona: [
      "Toma todos los elementos del array.",
      "Convierte cada elemento a texto (`null` y `undefined` se convierten en cadena vacía).",
      "Une los valores colocando el separador entre cada par.",
      "Devuelve un string. Si no indicas separador, usa la coma `,`.",
    ],
    sintaxis: [
      {
        code: `const texto = array.join(separador);`,
      },
      {
        caption: "Sin argumento, el separador es una coma:",
        code: `[1, 2, 3].join();  // "1,2,3"`,
      },
    ],
    nota: "**Parámetro:** `separador` (opcional), el texto que va entre elementos. **Retorno:** un `string`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Coma y espacio",
        code: `const nombres = ["Ana", "Luis", "Carlos"];
console.log(nombres.join(", ")); // "Ana, Luis, Carlos"`,
      },
      {
        titulo: "Ejemplo 2: Crear una frase y una fecha",
        code: `const palabras = ["JavaScript", "es", "poderoso"];
console.log(palabras.join(" ")); // "JavaScript es poderoso"

const fecha = [2026, 7, 27];
console.log(fecha.join("-")); // "2026-7-27"`,
      },
      {
        titulo: "Ejemplo 3: Elementos vacíos",
        code: `const datos = ["A", "", "C"];
console.log(datos.join("-")); // "A--C"`,
      },
      {
        titulo: "Ejemplo 4: Rutas",
        code: `const ruta = ["usuarios", "15", "perfil"];
console.log("/" + ruta.join("/")); // "/usuarios/15/perfil"`,
      },
    ],
    errores: [
      {
        texto: "**Pensar que modifica el array:** el array original no cambia.",
        code: `const frutas = ["Manzana", "Pera"];
frutas.join("-");
console.log(frutas); // ["Manzana", "Pera"]`,
      },
      {
        texto:
          "**Olvidar que siempre devuelve string:** aunque unes números, el resultado es texto.",
        code: `const resultado = [1, 2, 3].join("");
console.log(resultado);         // "123"
console.log(typeof resultado);  // "string"`,
      },
      {
        texto:
          "**Usar `join()` con objetos directamente:** cada objeto se convierte en `[object Object]`.",
        code: `const usuarios = [{ nombre: "Ana" }, { nombre: "Luis" }];

console.log(usuarios.join(","));
// "[object Object],[object Object]"

// ✅ Extrae primero la propiedad con map():
usuarios.map((u) => u.nombre).join(", "); // "Ana, Luis"`,
      },
    ],
    casos: [
      {
        texto: "**Etiquetas o categorías:**",
        code: `const tags = ["JavaScript", "Frontend", "Web"];
tags.join(" | "); // "JavaScript | Frontend | Web"`,
      },
      "**Rutas y URLs:** unir segmentos con `/`.",
      {
        texto: "**Mostrar listas en la interfaz:**",
        code: `elemento.textContent = habilidades.join(", ");`,
      },
    ],
    relacion: [
      "**`split()`:** la operación inversa, de String a Array.",
      "**`concat()`:** une arrays (devuelve un array), no textos.",
      "**`toString()`:** equivale a `join()` con la coma por defecto.",
      "**`map()`:** transforma elementos antes de unirlos.",
    ],
    analogia:
      "Imagina palabras escritas en tarjetas: [Hola] [Mundo] [JS]. `join(' ')` las pega con un espacio entre cada una para formar **Hola Mundo JS**. Es como colocar pegamento entre cada tarjeta para formar una frase. Las tarjetas originales siguen existiendo.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve join()?",
        opciones: ["Un array", "Un string", "La longitud", "undefined"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Cuál es el separador por defecto de join()?",
        opciones: ["Espacio", "Guion", "Coma", "Nada"],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: '¿Qué devuelve ["A", "", "C"].join("-")?',
        opciones: ['"A-C"', '"A--C"', '"A-undefined-C"', '"AC"'],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿join() modifica el array original?",
        opciones: ["Sí", "No", "Solo con strings", "Depende del separador"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué devuelve [{ a: 1 }].join()?",
        opciones: ['"a:1"', '"[object Object]"', '"{a:1}"', '"1"'],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿Qué método realiza la operación inversa de join()?",
        opciones: ["concat()", "split()", "map()", "slice()"],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿Qué devuelve [1, 2, 3].join('')?",
        opciones: ["[1, 2, 3]", '"1,2,3"', '"123"', "123"],
        correcta: 2,
      },
      {
        id: 8,
        pregunta: "¿Cómo conviertes un array de objetos en un texto legible?",
        opciones: [
          "usuarios.join()",
          "usuarios.map(u => u.nombre).join(', ')",
          "usuarios.concat()",
          "usuarios.toString(',')",
        ],
        correcta: 1,
      },
    ],
  },
};
