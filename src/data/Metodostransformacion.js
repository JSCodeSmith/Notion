// Formato inline permitido en los textos: **negrita**, *cursiva* y `código`
// Los items de las listas pueden ser string o { texto, code, nota }
// Todos usan simulador: "utilidad" -> SimuladorUtilidad (ids: map, filter, flatmap, slice, fill,
// with, from, toreversed, reverse, flat, copywithin, entries, keys, values)

export const METODOS_TRANSFORMACION = {
  /* ============================ map() ============================ */
  map: {
    id: "map",
    titulo: "Array.prototype.map()",
    simulador: "utilidad",
    definicion: [
      "Es un método de orden superior que **transforma** cada elemento de un array aplicándole una función, y devuelve un **nuevo array** con los resultados.",
      "No modifica el array original.",
    ],
    queEs: [
      "Es una herramienta fundamental de la **programación funcional**.",
      "En lugar de usar bucles (`for`, `while`) para modificar los datos a mano, `map()` automatiza la iteración de forma declarativa: le dices *qué* quieres hacer con cada dato, no *cómo* recorrerlos.",
      "El array resultante **siempre tiene el mismo `length`** que el original.",
    ],
    paraQueSirve: [
      "**Transformar datos:** cambiar el formato o tipo de los elementos (por ejemplo, de números a strings).",
      "**Inmutabilidad:** mantiene los datos originales intactos, lo que previene errores en aplicaciones complejas.",
      "**Limpieza de código:** reemplaza bloques repetitivos por una sola línea clara y legible.",
    ],
    comoFunciona: [
      "Recibe como argumento una **función callback** (la regla de transformación).",
      "Recorre la colección elemento por elemento.",
      "Pasa cada elemento por el callback.",
      "Guarda el valor que retorna el callback en un nuevo array.",
      "Devuelve ese nuevo array cuando termina el recorrido.",
    ],
    sintaxis: [
      {
        code: `const nuevoArray = arrayOriginal.map(function (elemento, indice, array) {
  // Código de transformación
  return nuevoElemento;
});`,
      },
      {
        caption: "Con función flecha (sintaxis moderna):",
        code: `const nuevoArray = arrayOriginal.map(elemento => elemento * 2);`,
      },
    ],
    nota: "**Parámetros:** `callback(elemento, indice, array)` y `thisArg` (opcional). **Retorno:** un nuevo array con el resultado del callback para cada elemento.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Multiplicar números por 2",
        code: `const numeros = [1, 2, 3, 4];
const dobles = numeros.map(num => num * 2);

console.log(dobles);  // [2, 4, 6, 8]
console.log(numeros); // [1, 2, 3, 4] (el original sigue igual)`,
      },
      {
        titulo: "Ejemplo 2: Extraer datos de objetos",
        code: `const usuarios = [
  { nombre: "Ana", edad: 25 },
  { nombre: "Luis", edad: 30 }
];

const nombres = usuarios.map(u => u.nombre);
console.log(nombres); // ["Ana", "Luis"]`,
      },
      {
        titulo: "Ejemplo 3: Usar el índice (segundo parámetro)",
        code: `const letras = ["a", "b", "c"];
const numeradas = letras.map((letra, i) => (i + 1) + ". " + letra);

console.log(numeradas); // ["1. a", "2. b", "3. c"]`,
      },
    ],
    errores: [
      {
        texto:
          "**Olvidar el `return`:** si usas llaves `{}` en una función flecha y no pones `return`, el nuevo array se llena de `undefined`.",
        code: `// ❌ ERROR
const dobles = numeros.map(num => { num * 2 }); // [undefined, undefined, ...]

// ✅ CORRECTO
const dobles2 = numeros.map(num => num * 2);`,
      },
      "**Usarlo solo para efectos secundarios:** si no vas a guardar el array resultante, `map()` no es la herramienta. Para imprimir en consola o modificar variables externas usa `forEach()`.",
      {
        texto:
          "**La trampa de `map(parseInt)`:** `map` le pasa `(elemento, indice)` al callback, y `parseInt` interpreta el segundo argumento como base numérica.",
        code: `["1", "2", "3"].map(parseInt);          // [1, NaN, NaN]
["1", "2", "3"].map(n => parseInt(n));  // [1, 2, 3]`,
      },
    ],
    casos: [
      {
        texto:
          "**Renderizar listas en el Frontend (React):** transformar datos en elementos JSX.",
        code: `usuarios.map(u => <li key={u.id}>{u.nombre}</li>)`,
      },
      "**Formatear dinero:** convertir una lista de precios numéricos en strings con el símbolo de moneda (`$10.00`).",
      "**Normalizar datos de APIs:** adaptar las propiedades de un objeto externo al formato que necesita tu aplicación.",
    ],
    relacion: [
      "**`filter()`:** a diferencia de `map()` (que transforma todos los elementos), `filter()` decide cuáles se quedan y reduce el tamaño del array.",
      "**`reduce()`:** mientras `map()` devuelve otra lista, `reduce()` condensa toda la lista en un solo valor (como una suma total).",
      "**`flatMap()`:** es `map()` seguido de `flat(1)`.",
      "**Inmutabilidad:** principio que prohíbe cambiar los datos existentes; `map()` lo respeta al crear un array nuevo.",
    ],
    analogia:
      "Imagina una **fábrica de galletas**. Tienes una bandeja con círculos de masa cruda (el array original). Pasas la bandeja por una máquina moldeadora (`map()`) que le estampa un corazón a cada masa. Al final obtienes una **nueva bandeja** con galletas en forma de corazón, y la bandeja original no cambió: cada pieza fue transformada individualmente bajo la misma regla.",
    fuente: "MDN Web Docs | Array.prototype.map()",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve map()?",
        opciones: [
          "El array original modificado",
          "Un nuevo array con los resultados del callback",
          "La longitud del array",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿map() modifica el array original?",
        opciones: [
          "Sí, siempre",
          "No, es inmutable",
          "Solo con números",
          "Solo con objetos",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta:
          "Si el callback es n => { n * 2 } (con llaves y sin return), ¿qué obtienes?",
        opciones: [
          "[2, 4, 6]",
          "Un array lleno de undefined",
          "Un error de sintaxis",
          "El array original",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué length tiene el array que devuelve map()?",
        opciones: [
          "Menor que el original",
          "Mayor que el original",
          "El mismo que el original",
          "Depende del callback",
        ],
        correcta: 2,
      },
      {
        id: 5,
        pregunta:
          "Si no vas a usar el array resultante y solo quieres imprimir cada elemento, ¿qué método conviene?",
        opciones: ["map()", "forEach()", "flat()", "slice()"],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿Qué devuelve [1, 2, 3].map(n => n * 2)?",
        opciones: ["[1, 2, 3]", "[2, 4, 6]", "6", "[2, 3, 4]"],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿Cuál es la diferencia principal entre map() y filter()?",
        opciones: [
          "map() transforma todos los elementos; filter() decide cuáles se conservan",
          "Son idénticos",
          "filter() transforma y map() filtra",
          "map() muta el array",
        ],
        correcta: 0,
      },
      {
        id: 8,
        pregunta:
          'Si ["1", "2", "3"].map(parseInt) devuelve [1, NaN, NaN], ¿por qué?',
        opciones: [
          "Porque map() no funciona con strings",
          "Porque parseInt recibe el índice como segundo argumento (la base)",
          "Porque parseInt es asíncrono",
          "Porque el array está vacío",
        ],
        correcta: 1,
      },
    ],
  },

  /* ============================ filter() ============================ */
  filter: {
    id: "filter",
    titulo: "Array.prototype.filter()",
    simulador: "utilidad",
    definicion: [
      "Es un método de `Array.prototype` que crea un **nuevo array** con todos los elementos que cumplen una condición definida por una función callback.",
      "No modifica el array original: es un método **inmutable**.",
    ],
    queEs: [
      "Es un método iterativo de arrays que forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
      "Ejecuta el callback sobre cada elemento: si devuelve un valor truthy el elemento se incluye en el nuevo array; si devuelve falsy, se descarta.",
    ],
    paraQueSirve: [
      "Filtrar datos de un array según una condición.",
      "Buscar **todos** los elementos que cumplan una regla (a diferencia de `find()`, que devuelve solo el primero).",
      "Eliminar elementos no deseados sin modificar el original.",
      "Filtrar resultados de APIs y construir búsquedas en tiempo real.",
    ],
    comoFunciona: [
      "Recorre cada elemento del array.",
      "Ejecuta el callback con ese elemento.",
      "Si el callback devuelve `true` (o truthy), conserva el elemento; si devuelve `false`, lo descarta.",
      "Devuelve un nuevo array con los elementos conservados (puede estar vacío).",
    ],
    sintaxis: [
      {
        code: `const resultado = array.filter((elemento, indice, array) => {
  // Condición que debe devolver true o false
  return condicion;
}, thisArg);`,
      },
      {
        caption: "Forma corta:",
        code: `const pares = numeros.filter(n => n % 2 === 0);`,
      },
    ],
    nota: "**Parámetros:** `callback(elemento, indice, array)` y `thisArg` (opcional). **Retorno:** un nuevo array con los elementos que cumplen (si ninguno cumple, `[]`).",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Filtrar números",
        code: `const numeros = [5, 10, 15, 20];
const mayores = numeros.filter(n => n > 10);

console.log(mayores); // [15, 20]
console.log(numeros); // [5, 10, 15, 20] (intacto)`,
      },
      {
        titulo: "Ejemplo 2: Filtrar objetos",
        code: `const usuarios = [
  { nombre: "Ana", activo: true },
  { nombre: "Luis", activo: false },
  { nombre: "Carlos", activo: true }
];

const activos = usuarios.filter(u => u.activo);
console.log(activos); // [{ nombre: "Ana", ... }, { nombre: "Carlos", ... }]`,
      },
      {
        titulo: "Ejemplo 3: Quitar valores falsy con Boolean",
        code: `const datos = [0, "Hola", false, "", null, 10];
const validos = datos.filter(Boolean);

console.log(validos); // ["Hola", 10]`,
      },
      {
        titulo: "Ejemplo 4: Filtrar y luego transformar (encadenamiento)",
        code: `const nombresActivos = usuarios
  .filter(u => u.activo)
  .map(u => u.nombre);

console.log(nombresActivos); // ["Ana", "Carlos"]`,
      },
    ],
    errores: [
      {
        texto:
          "**Pensar que modifica el array original:** `filter()` devuelve un array nuevo.",
        code: `const numeros = [1, 2, 3, 4];
numeros.filter(n => n > 2);
console.log(numeros); // [1, 2, 3, 4]`,
      },
      {
        texto:
          "**Confundirlo con `find()`:** `filter()` devuelve **todos** los que cumplen (en un array); `find()` devuelve solo el primero.",
        code: `[10, 20, 30].filter(x => x > 10); // [20, 30]
[10, 20, 30].find(x => x > 10);   // 20`,
      },
      {
        texto:
          "**Olvidar el `return` con llaves:** el callback devuelve `undefined` (falsy) y el resultado siempre es `[]`.",
        code: `// ❌ Siempre []
numeros.filter(n => { n > 5; });

// ✅ Correcto
numeros.filter(n => { return n > 5; });`,
      },
      "**Usarlo para modificar datos:** `filter()` solo decide qué se queda. Para transformar los elementos usa `map()`.",
    ],
    casos: [
      {
        texto: "**Buscar productos disponibles:**",
        code: `const disponibles = productos.filter(p => p.stock > 0);`,
      },
      {
        texto: "**Búsqueda en tiempo real:**",
        code: `const resultado = productos.filter(p => p.nombre.includes("Lap"));`,
      },
      "**Eliminar un elemento de forma inmutable (React):** `lista.filter(item => item.id !== idABorrar)`.",
    ],
    relacion: [
      "**`find()`:** devuelve el primer elemento que cumple.",
      "**`findIndex()`:** devuelve la posición del primero que cumple.",
      "**`map()`:** transforma cada elemento.",
      "**`reduce()`:** reduce todo a un único valor.",
      "**`every()` / `some()`:** devuelven un booleano (¿todos cumplen? / ¿alguno cumple?).",
    ],
    analogia:
      "Imagina un **filtro de café** ☕. Tienes muchos granos y el filtro deja pasar solo los que cumplen la condición; los demás quedan fuera. El resultado es una nueva colección más limpia, y el costal original no se tocó.",
    fuente: "MDN Web Docs | Array.prototype.filter()",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve filter()?",
        opciones: [
          "El primer elemento que cumple",
          "Un nuevo array con los elementos que cumplen",
          "Un booleano",
          "El índice del elemento",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta:
          "¿Qué devuelve filter() si ningún elemento cumple la condición?",
        opciones: ["undefined", "null", "-1", "Un array vacío []"],
        correcta: 3,
      },
      {
        id: 3,
        pregunta: "¿filter() modifica el array original?",
        opciones: [
          "Sí",
          "No",
          "Solo con objetos",
          "Solo si el callback devuelve true",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Cuál es la diferencia entre filter() y find()?",
        opciones: [
          "filter() devuelve todos los que cumplen en un array; find() devuelve solo el primero",
          "Son iguales",
          "find() devuelve un array",
          "filter() se detiene al primer true",
        ],
        correcta: 0,
      },
      {
        id: 5,
        pregunta:
          "¿Qué devuelve [0, 'Hola', false, '', null, 10].filter(Boolean)?",
        opciones: [
          "[0, false, '', null]",
          "['Hola', 10]",
          "[]",
          "[0, 'Hola', false, '', null, 10]",
        ],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿Qué obtienes con numeros.filter(n => { n > 5; })?",
        opciones: [
          "Los números mayores que 5",
          "Siempre un array vacío, porque falta el return",
          "Un error",
          "El array original",
        ],
        correcta: 1,
      },
      {
        id: 7,
        pregunta:
          "Para obtener solo los nombres de los usuarios activos, ¿qué encadenas?",
        opciones: [
          "usuarios.map(u => u.nombre).filter(u => u.activo)",
          "usuarios.filter(u => u.activo).map(u => u.nombre)",
          "usuarios.find(u => u.activo).nombre",
          "usuarios.flat()",
        ],
        correcta: 1,
      },
      {
        id: 8,
        pregunta: "¿Cómo eliminas de forma inmutable un elemento por su id?",
        opciones: [
          "lista.splice(id, 1)",
          "lista.filter(item => item.id !== id)",
          "lista.pop()",
          "lista.shift()",
        ],
        correcta: 1,
      },
    ],
  },

  /* ============================ flatMap() ============================ */
  flatmap: {
    id: "flatmap",
    titulo: "Array.prototype.flatMap()",
    simulador: "utilidad",
    definicion: [
      "Es un método de `Array.prototype` que **aplica una función a cada elemento (`map`) y luego aplana el resultado un nivel (`flat`)**.",
      "Equivale a `map()` + `flat(1)` y devuelve un **nuevo array** sin modificar el original.",
    ],
    queEs: [
      "Es un método iterativo de arrays, parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
      "Fue introducido en **ECMAScript 2019 (ES10)**.",
      "Sirve para transformar elementos y, al mismo tiempo, eliminar un nivel de arrays anidados.",
    ],
    paraQueSirve: [
      "Transformar y aplanar en un solo paso (evita encadenar `map().flat()`).",
      "Expandir un elemento en **varios** valores.",
      "Filtrar y transformar a la vez, devolviendo `[]` para descartar un elemento.",
      "Extraer listas anidadas de objetos (cursos de usuarios, temas de cursos, etc.).",
    ],
    comoFunciona: [
      "**Paso 1:** ejecuta `map()` con el callback sobre cada elemento.",
      "**Paso 2:** aplica `flat(1)` al resultado: abre un nivel de arrays.",
      "Si el callback devuelve un valor que **no** es array, se agrega tal cual.",
      "Si devuelve `[]`, ese elemento desaparece del resultado.",
    ],
    sintaxis: [
      {
        code: `const resultado = array.flatMap((elemento, indice, array) => {
  // Devuelve un valor o un array de valores
  return nuevoValorOArray;
}, thisArg);`,
      },
      {
        caption: "Equivalencia:",
        code: `array.flatMap(fn);
// es casi lo mismo que
array.map(fn).flat(1);`,
      },
    ],
    nota: "**Parámetros:** `callback(elemento, indice, array)` y `thisArg` (opcional). **Retorno:** un nuevo array transformado y aplanado **un solo nivel**.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Un elemento → varios valores",
        code: `const numeros = [1, 2, 3];
const resultado = numeros.flatMap(n => [n, n * 2]);

console.log(resultado); // [1, 2, 2, 4, 3, 6]`,
      },
      {
        titulo: "Ejemplo 2: Separar palabras de varias frases",
        code: `const frases = ["Hola Mundo", "JavaScript es genial"];
const palabras = frases.flatMap(frase => frase.split(" "));

console.log(palabras); // ["Hola", "Mundo", "JavaScript", "es", "genial"]`,
      },
      {
        titulo: "Ejemplo 3: Filtrar y transformar a la vez",
        descripcion:
          "Devolver `[]` descarta el elemento; devolver `[valor]` lo conserva transformado.",
        code: `const numeros = [1, 2, 3, 4, 5];
const resultado = numeros.flatMap(n => (n % 2 === 0 ? [n * 10] : []));

console.log(resultado); // [20, 40]`,
      },
      {
        titulo: "Ejemplo 4: Extraer listas anidadas de objetos",
        code: `const cursos = [
  { nombre: "JavaScript", temas: ["Arrays", "Objetos"] },
  { nombre: "Python", temas: ["Funciones", "Clases"] }
];

const temas = cursos.flatMap(curso => curso.temas);
console.log(temas); // ["Arrays", "Objetos", "Funciones", "Clases"]`,
      },
    ],
    errores: [
      {
        texto:
          "**Creer que aplana todos los niveles:** `flatMap()` solo aplana **uno**.",
        code: `[1, 2].flatMap(n => [[n]]); // [[1], [2]]  (queda un nivel anidado)`,
        nota: "Para más niveles usa `map(...).flat(2)` o `flat(Infinity)`.",
      },
      {
        texto:
          "**Confundirlo con `map()`:** con el mismo callback, `map()` deja los arrays anidados y `flatMap()` los abre.",
        code: `[1, 2, 3].map(x => [x, x]);     // [[1, 1], [2, 2], [3, 3]]
[1, 2, 3].flatMap(x => [x, x]); // [1, 1, 2, 2, 3, 3]`,
      },
      {
        texto: "**Pensar que modifica el array original:** es inmutable.",
        code: `const numeros = [1, 2, 3];
numeros.flatMap(x => [x * 2]);
console.log(numeros); // [1, 2, 3]`,
      },
    ],
    casos: [
      "**Procesar datos de APIs:** obtener todos los cursos de todos los usuarios con `usuarios.flatMap(u => u.cursos)`.",
      "**Construir listas desde estructuras complejas:** menús, categorías, productos, comentarios, permisos.",
      {
        texto: "**Reemplazar el patrón antiguo:**",
        code: `// Antes
array.map(fn).flat();

// Ahora
array.flatMap(fn);`,
      },
    ],
    relacion: [
      "**`map()`:** transforma elementos, sin aplanar.",
      "**`flat()`:** aplana arrays, sin transformar.",
      "**`filter()`:** filtra elementos (con `flatMap` puedes filtrar devolviendo `[]`).",
      "**`reduce()`:** reduce a un solo valor.",
    ],
    analogia:
      "Imagina una **fábrica** 🏭 con cajas: Caja 1 → [Producto A, Producto B], Caja 2 → [Producto C]. `map()` cambia cada caja; `flat()` abre todas las cajas y junta los productos; `flatMap()` hace las dos cosas: modifica los productos y los deja todos en **una sola lista**.",
    fuente: "MDN Web Docs | Array.prototype.flatMap() | ECMAScript 2019",
    quiz: [
      {
        id: 1,
        pregunta: "¿A qué equivale arr.flatMap(fn)?",
        opciones: [
          "arr.map(fn)",
          "arr.map(fn).flat(1)",
          "arr.flat(1).map(fn)",
          "arr.filter(fn)",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Cuántos niveles aplana flatMap()?",
        opciones: ["Ninguno", "Uno", "Dos", "Todos"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve [1, 2, 3].flatMap(x => [x, x])?",
        opciones: [
          "[[1, 1], [2, 2], [3, 3]]",
          "[1, 1, 2, 2, 3, 3]",
          "[1, 2, 3]",
          "[2, 4, 6]",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué pasa con un elemento cuyo callback devuelve []?",
        opciones: [
          "Se agrega undefined",
          "Desaparece del resultado",
          "Lanza un error",
          "Se agrega []",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta:
          "¿Qué devuelve [1, 2, 3, 4, 5].flatMap(n => (n % 2 === 0 ? [n * 10] : []))?",
        opciones: ["[10, 20]", "[20, 40]", "[2, 4]", "[1, 3, 5]"],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿En qué versión de ECMAScript se introdujo flatMap()?",
        opciones: ["ES5", "ES2015", "ES2019", "ES2023"],
        correcta: 2,
      },
      {
        id: 7,
        pregunta: "¿Qué devuelve [1, 2].flatMap(n => [[n]])?",
        opciones: ["[1, 2]", "[[1], [2]]", "[[[1]], [[2]]]", "Un error"],
        correcta: 1,
      },
      {
        id: 8,
        pregunta: "¿flatMap() modifica el array original?",
        opciones: [
          "Sí",
          "No, devuelve un array nuevo",
          "Solo si el callback devuelve arrays",
          "Depende del navegador",
        ],
        correcta: 1,
      },
    ],
  },

  /* ============================ slice() ============================ */
  slice: {
    id: "slice",
    titulo: "Array.prototype.slice()",
    simulador: "utilidad",
    definicion: [
      'Es un método que **extrae una sección (una "rebanada")** de un array y la devuelve dentro de un **nuevo array**, sin modificar el original.',
      "También existe en strings (`String.prototype.slice()`), con la misma idea.",
    ],
    queEs: [
      "Es un método de **copia superficial** (*shallow copy*).",
      "En lugar de alterar la lista original eliminando o agregando elementos, `slice()` actúa como un bisturí de precisión: le indicas un punto de inicio y uno de final, y te entrega un duplicado de ese fragmento.",
    ],
    paraQueSirve: [
      '**Subdividir datos:** obtener los primeros *N* elementos (ej. el "Top 3" de un ranking).',
      "**Paginación:** cortar una lista larga en bloques más pequeños.",
      "**Clonar arrays:** copiar un array completo para trabajar sin alterar el original.",
    ],
    comoFunciona: [
      "Recibe dos parámetros opcionales: el índice de **inicio** y el de **fin**.",
      "**El inicio es inclusivo:** el elemento en esa posición sí entra en el resultado.",
      "**El fin es exclusivo:** el corte se hace justo *antes* de esa posición (ese elemento no entra).",
      "Con números negativos, la cuenta empieza desde el final hacia atrás (`length + indice`).",
      "Si `inicio >= fin`, devuelve `[]`.",
    ],
    sintaxis: [
      {
        code: `const nuevoArray = arrayOriginal.slice(inicio, fin);`,
      },
    ],
    nota: "**`inicio` (opcional):** por defecto `0`. **`fin` (opcional):** por defecto `array.length`. **Retorno:** un nuevo array con la porción copiada.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Corte básico",
        code: `const frutas = ["Manzana", "Plátano", "Fresa", "Mango", "Uva"];

// Desde el índice 1 hasta el 4 (el 4 no se incluye)
const seleccionadas = frutas.slice(1, 4);

console.log(seleccionadas); // ["Plátano", "Fresa", "Mango"]
console.log(frutas);        // la lista original sigue intacta`,
      },
      {
        titulo: "Ejemplo 2: Índices negativos",
        code: `const numeros = [10, 20, 30, 40, 50];

console.log(numeros.slice(-2));     // [40, 50]  (los últimos 2)
console.log(numeros.slice(1, -1));  // [20, 30, 40]`,
      },
      {
        titulo: "Ejemplo 3: Clonar un array",
        code: `const original = [1, 2, 3];
const clon = original.slice();

console.log(clon);              // [1, 2, 3]
console.log(clon === original); // false (son arrays distintos)`,
      },
      {
        titulo: "Ejemplo 4: Paginación",
        code: `const pagina = 2;
const porPagina = 10;
const inicio = (pagina - 1) * porPagina;

const registros = usuarios.slice(inicio, inicio + porPagina);`,
      },
    ],
    errores: [
      "**Confundirlo con `splice()`:** `slice()` (con **c** de *copia*) corta y **no** modifica el original; `splice()` (con **p** de *peligro*) cambia el original eliminando, reemplazando o agregando elementos.",
      "**Olvidar que el final no se incluye:** `slice(0, 3)` devuelve los elementos de las posiciones 0, 1 y 2, no la 3.",
      {
        texto:
          "**Esperar una copia profunda:** si el array contiene objetos, `slice()` copia las *referencias*; modificar un objeto del nuevo array se refleja en el original.",
        code: `const datos = [{ n: 1 }, { n: 2 }];
const copia = datos.slice();
copia[0].n = 99;

console.log(datos[0].n); // 99`,
      },
    ],
    casos: [
      "**Paginación en tablas:** mostrar la página 2 con `usuarios.slice(10, 20)`.",
      {
        texto: "**Procesamiento de strings:** extraer extensiones o códigos.",
        code: `"archivo.pdf".slice(-4); // ".pdf"`,
      },
      "**Seguridad en funciones:** pasar `arr.slice()` a una función para que no altere por accidente tus datos originales.",
    ],
    relacion: [
      "**`splice()`:** su contraparte destructiva (muta el array).",
      "**`toSpliced()`:** la versión inmutable de `splice()`.",
      "**Inmutabilidad:** igual que `map()` y `filter()`, `slice()` nunca edita la fuente de datos original (clave en React).",
      "**Copia superficial:** copia referencias, no objetos nuevos.",
    ],
    analogia:
      "Imagina una **barra de pan de molde**. Usar `slice()` es como tomar un cuchillo y cortar de la tercera a la quinta rebanada para hacerte un sándwich. Tienes las rebanadas en un plato nuevo, pero la barra original sigue igual en su bolsa.",
    fuente: "MDN Web Docs | Array.prototype.slice() y String.prototype.slice()",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve slice()?",
        opciones: [
          "El array original modificado",
          "Un nuevo array con la porción extraída",
          "Los elementos eliminados",
          "La nueva longitud",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve [10, 20, 30, 40, 50].slice(1, 4)?",
        opciones: [
          "[20, 30, 40, 50]",
          "[20, 30, 40]",
          "[10, 20, 30, 40]",
          "[30, 40]",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "En slice(inicio, fin), ¿qué índices se incluyen?",
        opciones: [
          "Ambos",
          "Solo el fin",
          "Inicio inclusivo, fin exclusivo",
          "Inicio exclusivo, fin inclusivo",
        ],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Qué devuelve [10, 20, 30, 40, 50].slice(-2)?",
        opciones: ["[10, 20]", "[40, 50]", "[50]", "[30, 40]"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Cuál es la diferencia entre slice() y splice()?",
        opciones: [
          "slice() copia sin mutar; splice() muta el array original",
          "Son iguales",
          "slice() muta el array",
          "splice() devuelve una copia sin mutar",
        ],
        correcta: 0,
      },
      {
        id: 6,
        pregunta: "¿Qué hace arr.slice() sin argumentos?",
        opciones: [
          "Vacía el array",
          "Devuelve una copia superficial del array completo",
          "Lanza un error",
          "Devuelve undefined",
        ],
        correcta: 1,
      },
      {
        id: 7,
        pregunta:
          "Si el array contiene objetos y modificas uno del resultado de slice(), ¿qué pasa?",
        opciones: [
          "El original no cambia",
          "El original también cambia, porque se copian las referencias",
          "Lanza un error",
          "Se crea un objeto nuevo automáticamente",
        ],
        correcta: 1,
      },
      {
        id: 8,
        pregunta: "¿Qué devuelve [1, 2, 3].slice(2, 1)?",
        opciones: ["[2]", "[3]", "[]", "[2, 3]"],
        correcta: 2,
      },
    ],
  },

  /* ============================ fill() ============================ */
  fill: {
    id: "fill",
    titulo: "Array.prototype.fill()",
    simulador: "utilidad",
    definicion: [
      "Es un método **mutador** que **rellena** todos los elementos de un array (o solo una parte) con un **valor estático**.",
      "Modifica el array original y devuelve **ese mismo array** (la misma referencia).",
    ],
    queEs: [
      "A diferencia de `map()` o `slice()`, `fill()` es **destructivo**: cambia directamente los datos originales.",
      "Se usa sobre todo para inicializar arrays con valores por defecto o resetear datos de forma masiva, sin escribir un bucle `for`.",
    ],
    paraQueSirve: [
      "**Inicializar arrays:** crear una lista de tamaño fijo llena de ceros, strings vacíos o `null`.",
      "**Resetear datos:** restablecer un array a un estado base (ej. un tablero de juego en blanco).",
      "**Enmascarar datos:** ocultar partes de un dato sensible (como los dígitos de una tarjeta, guardados en un array de caracteres).",
    ],
    comoFunciona: [
      "Recibe un valor obligatorio y dos parámetros opcionales: **inicio** y **fin**.",
      "Modifica el array **en el lugar** (afecta a la variable original).",
      "**El inicio es inclusivo** y **el fin es exclusivo**; ambos aceptan negativos.",
      "Si no se indican índices, rellena el array completo.",
      "Retorna el mismo array ya modificado.",
    ],
    sintaxis: [
      {
        code: `arrayOriginal.fill(valor, inicio, fin);`,
      },
    ],
    nota: "**`valor`:** con qué se rellena. **`inicio` (opcional):** por defecto `0`. **`fin` (opcional):** por defecto `array.length`. **Retorno:** el mismo array.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Inicializar un array desde cero",
        code: `// Crear un array de 5 posiciones y llenarlo con 0
const puntuaciones = new Array(5).fill(0);

console.log(puntuaciones); // [0, 0, 0, 0, 0]`,
      },
      {
        titulo: "Ejemplo 2: Rellenado parcial",
        code: `const productos = ["Manzana", "Plátano", "Pera", "Naranja", "Uva"];

// Del índice 1 al 4 (el 4 no se incluye)
productos.fill("Agotado", 1, 4);

console.log(productos);
// ["Manzana", "Agotado", "Agotado", "Agotado", "Uva"]`,
      },
      {
        titulo: "Ejemplo 3: Tablero de Tres en Raya (Gato)",
        code: `const tablero = new Array(9).fill(null);
console.log(tablero); // [null, null, null, null, null, null, null, null, null]`,
      },
    ],
    errores: [
      {
        texto:
          "**El peligro de los objetos (referencia compartida):** si rellenas con un objeto, **todas las posiciones apuntan al mismo objeto** en memoria. Si modificas uno, cambias todos.",
        code: `// ❌ ERROR PELIGROSO
const matriz = new Array(3).fill({ puntos: 0 });
matriz[0].puntos = 5;
console.log(matriz); // [{puntos: 5}, {puntos: 5}, {puntos: 5}]

// ✅ SOLUCIÓN: un objeto nuevo por posición
const segura = Array.from({ length: 3 }, () => ({ puntos: 0 }));`,
      },
      {
        texto:
          "**Olvidar que muta el array original:** si necesitas conservarlo, clónalo antes.",
        code: `const copia = [...original].fill(0);`,
      },
      "**Confundir el valor de retorno:** `fill()` no devuelve un array nuevo, devuelve el mismo que modificó.",
    ],
    casos: [
      "**Tableros de juegos:** ajedrez, buscaminas o tres en raya con casillas vacías (`new Array(9).fill(null)`).",
      "**Enmascarar datos:** `digitos.fill('*', 0, 12)` sobre un array de caracteres para mostrar solo los últimos dígitos.",
      {
        texto: "**Generar rangos numéricos:** combinado con `map`.",
        code: `Array(5).fill(0).map((_, i) => i + 1); // [1, 2, 3, 4, 5]`,
      },
    ],
    relacion: [
      "**Mutabilidad:** a diferencia de los métodos funcionales puros, `fill()` viola la inmutabilidad porque edita la fuente original.",
      "**`Array.from()`:** alternativa más segura cuando necesitas objetos independientes en cada posición.",
      "**`map()`:** se combina con `fill()` porque `map()` ignora los huecos de un array recién creado.",
    ],
    analogia:
      "Imagina una **cubitera para hielo** vacía. Usar `fill()` es abrir el grifo y llenarla por completo (o solo llenar las primeras 3 ranuras). No compras una cubitera nueva: alteras el estado de la que ya tenías sobre la mesa, echando el mismo contenido en cada compartimento.",
    fuente: "MDN Web Docs | Array.prototype.fill()",
    notasPersonales: [
      "**Truco profesional:** para generar un array del 1 al 5 sin bucle `for`: `Array(5).fill(0).map((_, i) => i + 1)`. El `fill` es necesario porque `map()` ignora las posiciones vacías de un array recién creado.",
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve fill()?",
        opciones: [
          "Un array nuevo",
          "El mismo array modificado",
          "La longitud",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿fill() modifica el array original?",
        opciones: [
          "No",
          "Sí, es un método mutador",
          "Solo con números",
          "Solo con strings",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué crea new Array(5).fill(0)?",
        opciones: [
          "[5]",
          "[0, 0, 0, 0, 0]",
          "Un array con 5 huecos vacíos",
          "[0]",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "En fill(valor, inicio, fin), ¿qué índices se rellenan?",
        opciones: [
          "Ambos incluidos",
          "Inicio inclusivo, fin exclusivo",
          "Inicio exclusivo, fin inclusivo",
          "Solo el inicio",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué problema tiene new Array(3).fill({ puntos: 0 })?",
        opciones: [
          "Lanza un error",
          "Las 3 posiciones comparten el mismo objeto (misma referencia)",
          "No rellena nada",
          "Crea 3 objetos independientes",
        ],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿Cómo creas 3 objetos independientes?",
        opciones: [
          "new Array(3).fill({})",
          "Array.from({ length: 3 }, () => ({ puntos: 0 }))",
          "[{}].fill(3)",
          "Array(3).slice()",
        ],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿Qué devuelve [1, 2, 3, 4, 5].fill(0, 1, 4)?",
        opciones: [
          "[0, 0, 0, 0, 0]",
          "[1, 0, 0, 0, 5]",
          "[1, 0, 0, 0, 0]",
          "[0, 0, 0, 4, 5]",
        ],
        correcta: 1,
      },
      {
        id: 8,
        pregunta: "¿Cómo evitas mutar el original al usar fill()?",
        opciones: [
          "No se puede",
          "Clonándolo antes: [...arr].fill(...)",
          "Usando pop()",
          "Usando push()",
        ],
        correcta: 1,
      },
    ],
  },

  /* ============================ with() ============================ */
  with: {
    id: "with",
    titulo: "Array.prototype.with()",
    simulador: "utilidad",
    definicion: [
      "Es un método de copia que **reemplaza el valor de un elemento en un índice específico** y devuelve un **nuevo array** con el cambio.",
      "El array original permanece intacto.",
    ],
    queEs: [
      "Es la alternativa **inmutable** y moderna a la asignación por corchetes (`array[indice] = nuevoValor`).",
      "Pertenece a la familia de métodos de ES2023 que modifican sin mutar la fuente: `toReversed()`, `toSorted()`, `toSpliced()` y `with()`.",
    ],
    paraQueSirve: [
      "**Modificaciones seguras:** cambiar un dato específico sin alterar el estado original de la aplicación.",
      "**Frameworks reactivos:** actualizar estados en React, Redux o Vue, donde la inmutabilidad es obligatoria.",
      "**Evitar la clonación manual:** reemplaza copiar con spread (`[...]`) solo para cambiar un elemento.",
    ],
    comoFunciona: [
      "Recibe dos argumentos: el **índice** a modificar y el **nuevo valor**.",
      "Admite **índices negativos** (`-1` es el último elemento).",
      "Crea una copia superficial (*shallow copy*) del array.",
      "Sustituye el valor en esa posición dentro de la copia.",
      "Devuelve el nuevo array. Si el índice está fuera de rango, lanza `RangeError`.",
    ],
    sintaxis: [
      {
        code: `const nuevoArray = arrayOriginal.with(indice, nuevoValor);`,
      },
    ],
    nota: "**`indice`:** posición a cambiar (acepta negativos). **`nuevoValor`:** el valor que ocupará esa posición. **Retorno:** un nuevo array.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Modificación básica",
        code: `const meses = ["Enero", "Febrero", "Marzo", "Abril"];

const modificados = meses.with(2, "Mayo");

console.log(modificados); // ["Enero", "Febrero", "Mayo", "Abril"]
console.log(meses);       // ["Enero", "Febrero", "Marzo", "Abril"] (intacto)`,
      },
      {
        titulo: "Ejemplo 2: Índices negativos",
        code: `const puntuaciones = [100, 250, 400, 500];

// Modificar el último elemento con -1
const nuevas = puntuaciones.with(-1, 600);

console.log(nuevas); // [100, 250, 400, 600]`,
      },
      {
        titulo: "Ejemplo 3: Comparación con la asignación tradicional",
        code: `const a = [1, 2, 3];

// Mutable: cambia el original
a[0] = 99;

// Inmutable: crea uno nuevo
const b = [1, 2, 3].with(0, 99);`,
      },
    ],
    errores: [
      '**Esperar que el array original cambie:** si haces `miArray.with(0, "X")` sin guardar el resultado en una variable, la línea no sirve de nada.',
      {
        texto:
          "**Índices fuera de rango:** lanza `RangeError` (a diferencia de `at()`, que devuelve `undefined`).",
        code: `[1, 2, 3].with(5, 99); // ❌ RangeError: Invalid index`,
      },
      "**Soporte en entornos antiguos:** es una característica de ES2023; en proyectos legacy sin transpilar (Babel) los navegadores viejos no la reconocen.",
      "**Copia superficial:** si el array contiene objetos, `with()` solo cambia la referencia o valor de esa celda; los demás objetos siguen compartidos con el original.",
    ],
    casos: [
      {
        texto:
          "**Gestión de estado en React:** actualizar un elemento de la lista de forma limpia.",
        code: `setTodos(prev => prev.with(index, todoActualizado));`,
      },
      "**Corrección rápida de datos:** reemplazar un elemento erróneo tras una validación sin riesgo de corromper la lista original.",
    ],
    relacion: [
      "**Asignación por corchetes (`arr[i] = v`):** hace lo mismo, pero es **mutable**.",
      "**Inmutabilidad:** `with()` nació para cumplir este principio sin perder legibilidad.",
      "**Métodos hermanos (ES2023):** `toReversed()`, `toSorted()` y `toSpliced()` son las versiones no destructivas de `reverse()`, `sort()` y `splice()`.",
      "**`at()`:** lee un elemento (también acepta negativos); `with()` lo reemplaza en una copia.",
    ],
    analogia:
      "Imagina una **fotografía impresa** de tu grupo de amigos donde uno salió con los ojos cerrados. La asignación tradicional (`array[i] = x`) es como pintar con un plumón sobre la foto original. `.with()` es **escanear** la foto, corregir la cara en la computadora e **imprimir una foto nueva**, dejando la original intacta en tu álbum.",
    fuente: "MDN Web Docs | Array.prototype.with() | ECMAScript 2023 (ES14)",
    notasPersonales: [
      "**¡Ojo!** Al igual que `slice()` y `map()`, la copia es superficial. Si el array contiene objetos y modificas las propiedades de uno que no reemplazaste, la referencia sigue compartida. `with()` solo cambia el valor o la referencia de la celda de nivel superior.",
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve with()?",
        opciones: [
          "El array original modificado",
          "Un nuevo array con el cambio",
          "El elemento reemplazado",
          "La longitud",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿with() modifica el array original?",
        opciones: [
          "Sí",
          "No, permanece intacto",
          "Solo con números",
          "Solo con índices negativos",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve [100, 250, 400, 500].with(-1, 600)?",
        opciones: [
          "[600, 250, 400, 500]",
          "[100, 250, 400, 600]",
          "[100, 250, 600, 500]",
          "Un error",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué pasa con [1, 2, 3].with(5, 99)?",
        opciones: [
          "Devuelve [1, 2, 3, undefined, undefined, 99]",
          "Devuelve undefined",
          "Lanza RangeError",
          "Devuelve [1, 2, 3]",
        ],
        correcta: 2,
      },
      {
        id: 5,
        pregunta: "¿Cuál es la versión mutable equivalente de with()?",
        opciones: [
          "arr[i] = valor",
          "arr.slice(i)",
          "arr.concat(valor)",
          "arr.flat()",
        ],
        correcta: 0,
      },
      {
        id: 6,
        pregunta: "¿En qué versión de ECMAScript se añadió with()?",
        opciones: ["ES5", "ES2015", "ES2019", "ES2023"],
        correcta: 3,
      },
      {
        id: 7,
        pregunta:
          "¿Cuál de estos métodos NO pertenece a la misma familia no mutante que with()?",
        opciones: ["toSorted()", "toReversed()", "toSpliced()", "push()"],
        correcta: 3,
      },
      {
        id: 8,
        pregunta:
          "¿Cómo actualizas un elemento del estado de React con with()?",
        opciones: [
          "setTodos(prev => prev.with(index, nuevo))",
          "setTodos(todos.with)",
          "todos.with(index, nuevo)",
          "setTodos(todos[index] = nuevo)",
        ],
        correcta: 0,
      },
    ],
  },

  /* ============================ Array.from() ============================ */
  from: {
    id: "from",
    titulo: "Array.from()",
    simulador: "utilidad",
    definicion: [
      "Es un **método estático** de `Array` que crea una **nueva instancia de Array** (copia superficial) a partir de un objeto **iterable** (como un `Set` o un `Map`) o de un objeto **array-like** (con propiedad `length` e índices).",
    ],
    queEs: [
      "A diferencia de los métodos que se llaman desde una lista existente (`.map()`, `.slice()`), `Array.from()` es un **método de fábrica**: se llama desde el constructor global `Array`.",
      'Actúa como un puente entre estructuras que "parecen" arrays pero no lo son (strings, `Set`, `Map`, `NodeList`) y un array real, para poder usar todos los métodos de array.',
    ],
    paraQueSirve: [
      "**Conversión de tipos:** transformar `NodeList`, `String`, `Set` o `Map` en arrays.",
      "**Generación de secuencias:** crear arrays de un tamaño dado con datos dinámicos.",
      "**Transformación al vuelo:** mapear los elementos mientras se convierte, ahorrando un paso.",
    ],
    comoFunciona: [
      "Recibe un objeto fuente obligatorio (iterable o array-like).",
      "Extrae sus elementos (un iterable entrega sus valores; un array-like se lee por índice hasta `length`).",
      "**Parámetro opcional de mapeo:** un callback como segundo argumento que actúa como un `.map()` sobre cada elemento antes de añadirlo.",
      "Devuelve un array real con los elementos procesados.",
    ],
    sintaxis: [
      {
        code: `const nuevoArray = Array.from(objetoFuente, function mapFn(elemento, indice) {
  // Transformación opcional
  return nuevoElemento;
});`,
      },
      {
        caption: "Con función flecha:",
        code: `const nuevoArray = Array.from(objetoFuente, (elem, i) => elem * 2);`,
      },
    ],
    nota: "**Parámetros:** `objetoFuente` (obligatorio), `mapFn` (opcional) y `thisArg` (opcional). **Retorno:** un nuevo `Array` real.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Convertir un String y un Set",
        code: `// String → array de caracteres
console.log(Array.from("Hola")); // ["H", "o", "l", "a"]

// Set → array (elimina duplicados automáticamente)
const miSet = new Set([1, 2, 2, 3]);
console.log(Array.from(miSet));  // [1, 2, 3]`,
      },
      {
        titulo: "Ejemplo 2: Generar rangos con la función de mapeo",
        code: `// Del 1 al 5
const rango = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(rango); // [1, 2, 3, 4, 5]`,
      },
      {
        titulo:
          "Ejemplo 3: Objetos independientes (solución al problema de fill)",
        code: `const matriz = Array.from({ length: 3 }, () => ({ puntos: 0 }));

matriz[0].puntos = 5;
console.log(matriz);
// [{puntos: 5}, {puntos: 0}, {puntos: 0}] → no comparten referencia`,
      },
    ],
    errores: [
      "**Llamarlo desde una instancia:** escribir `miLista.from()` en lugar de `Array.from(miLista)`. Al ser estático, pertenece a la clase global `Array`.",
      {
        texto:
          "**Olvidar `length` en objetos personalizados:** un objeto plano sin `length` ni iterador devuelve `[]`.",
        code: `// ❌ Devuelve []
Array.from({ a: 1, b: 2 });

// ✅ Correcto
Array.from({ 0: "a", 1: "b", length: 2 }); // ["a", "b"]`,
      },
      "**Esperar una copia profunda:** si la fuente contiene objetos, se copian las referencias.",
    ],
    casos: [
      {
        texto:
          "**Manipulación del DOM:** convertir el `NodeList` de `querySelectorAll` en un array para usar `filter()` o `reduce()`.",
        code: `const divs = Array.from(document.querySelectorAll("div"));`,
      },
      "**Generación de rangos numéricos:** secuencias de números al instante (ej. del 0 al 99).",
      {
        texto: "**Eliminación rápida de duplicados:**",
        code: `const unicos = Array.from(new Set(arrayConDuplicados));`,
      },
    ],
    relacion: [
      "**`Array.of()`:** usa sus argumentos como elementos; `from` convierte un iterable o array-like.",
      "**`fill()`:** rellena con valores estáticos (y comparte referencias si son objetos); `Array.from()` puede ejecutar una función por cada celda y crear elementos únicos.",
      {
        texto:
          "**Operador spread (`[...]`):** hace algo muy parecido, pero solo funciona con iterables reales; `Array.from()` también acepta objetos con solo `length`.",
        code: `[...new Set([1, 2])];     // ✅
Array.from({ length: 3 }); // ✅
[...{ length: 3 }];        // ❌ TypeError (no es iterable)`,
      },
    ],
    analogia:
      'Imagina un grupo de **personas haciendo fila** en el banco. Tienen orden y cantidad (`length`), pero no son un equipo oficial de fútbol: no tienen los "superpoderes" de un array. Usar `Array.from()` es ponerles a todos el mismo uniforme del club. Ya uniformados (convertidos en un array real) pueden jugar el partido con cualquier jugada del manual (los métodos de array).',
    fuente: "MDN Web Docs | Array.from() | ECMAScript 2015 (ES6)",
    notasPersonales: [
      "**Truco avanzado:** para un rango del 1 al 5 con el segundo parámetro: `Array.from({ length: 5 }, (_, i) => i + 1)`. El guion bajo `_` se usa por convención para indicar que el valor actual no importa, solo el índice `i`.",
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué tipo de método es Array.from()?",
        opciones: [
          "De instancia (Array.prototype)",
          "Estático",
          "Una propiedad",
          "Un getter",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: 'Array.from("Hola") devuelve...',
        opciones: ['["Hola"]', '["H", "o", "l", "a"]', '"Hola"', "[]"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve Array.from(new Set([1, 2, 2, 3]))?",
        opciones: ["[1, 2, 2, 3]", "[1, 2, 3]", "[1, 2]", "Un Set"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué devuelve Array.from({ length: 3 }, (_, i) => i + 1)?",
        opciones: [
          "[0, 1, 2]",
          "[1, 2, 3]",
          "[undefined, undefined, undefined]",
          "[3]",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué devuelve Array.from({ a: 1, b: 2 })?",
        opciones: ["[1, 2]", '["a", "b"]', "[]", "Un error"],
        correcta: 2,
      },
      {
        id: 6,
        pregunta:
          "¿Cuál es la ventaja de Array.from({ length: 3 }, () => ({})) frente a new Array(3).fill({})?",
        opciones: [
          "Crea objetos independientes en cada posición",
          "Es más corto",
          "Muta el array original",
          "No tiene ventajas",
        ],
        correcta: 0,
      },
      {
        id: 7,
        pregunta:
          "¿Qué puede hacer Array.from() que el spread [...x] no puede?",
        opciones: [
          "Convertir un Set",
          "Convertir un objeto array-like que solo tiene length",
          "Convertir un string",
          "Nada, son idénticos",
        ],
        correcta: 1,
      },
      {
        id: 8,
        pregunta:
          "¿Cómo conviertes el resultado de document.querySelectorAll('div') en un array real?",
        opciones: [
          "Array.isArray(lista)",
          "Array.from(lista)",
          "lista.toArray()",
          "lista.join()",
        ],
        correcta: 1,
      },
    ],
  },

  /* ============================ toReversed() ============================ */
  toreversed: {
    id: "toreversed",
    titulo: "Array.prototype.toReversed()",
    simulador: "utilidad",
    definicion: [
      "Es un método de copia que **invierte el orden de los elementos** de un array y devuelve un **nuevo array** (del último al primero), sin modificar el original.",
      "Fue introducido en **ECMAScript 2023**.",
    ],
    queEs: [
      "Es la versión **inmutable** del clásico `.reverse()`.",
      "Mientras `.reverse()` altera el array sobre el que se ejecuta (es destructivo), `.toReversed()` hereda la filosofía funcional y mantiene tus datos originales seguros.",
    ],
    paraQueSirve: [
      "**Inversión segura:** cambiar el orden de una lista (ej. del más antiguo al más reciente) sin corromper el estado global.",
      "**Simplificar código:** elimina la combinación `[...array].reverse()` que se usaba solo para no mutar el original.",
      "**Encadenamiento fluido:** al devolver un nuevo array, permite seguir con `.map()` o `.filter()`.",
    ],
    comoFunciona: [
      "Se invoca sobre un array existente (sin parámetros).",
      "Crea una copia superficial (*shallow copy*).",
      "Invierte las posiciones en la copia: el elemento `0` pasa al final y el `length - 1` pasa al inicio.",
      "Devuelve la nueva lista invertida.",
    ],
    sintaxis: [
      {
        code: `const nuevoArrayInvertido = arrayOriginal.toReversed();`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** un nuevo array con el orden invertido.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: toReversed() vs. reverse()",
        code: `const numeros = [1, 2, 3, 4];

const invertidos = numeros.toReversed();

console.log(invertidos); // [4, 3, 2, 1]
console.log(numeros);    // [1, 2, 3, 4] (¡intacto!)
// Con numeros.reverse() la variable habría mutado a [4, 3, 2, 1]`,
      },
      {
        titulo: "Ejemplo 2: Encadenamiento limpio",
        code: `const palabras = ["hola", "mundo", "javascript"];

const resultado = palabras.toReversed().map(p => p.toUpperCase());

console.log(resultado); // ["JAVASCRIPT", "MUNDO", "HOLA"]`,
      },
    ],
    errores: [
      "**Esperar mutación del original:** si ejecutas `miArray.toReversed()` sin guardar el resultado, el cambio se pierde.",
      "**Entornos antiguos:** al ser ES2023, falla en navegadores o versiones de Node.js desactualizadas si no hay transpilador (Babel).",
      "**Copia superficial:** si el array contiene objetos, se invierte la posición de los elementos pero los objetos siguen apuntando a la misma referencia.",
    ],
    casos: [
      "**Feeds y comentarios:** mostrar las publicaciones en orden cronológico inverso (de las más nuevas a las más viejas) manteniendo el array base en orden secuencial.",
      "**Interfaces (React / Vue):** reordenar visualmente elementos sin romper la inmutabilidad del estado.",
    ],
    relacion: [
      "**`reverse()`:** misma lógica de ordenamiento, pero **mutable**.",
      "**Familia ES2023:** `toSorted()`, `toSpliced()` y `with()` son sus hermanos inmutables.",
      "**Spread `[...arr].reverse()`:** el patrón antiguo que `toReversed()` vuelve obsoleto, siendo más explícito.",
    ],
    analogia:
      "Imagina una **pila de libros** ordenados del volumen 1 al 4. El viejo `.reverse()` es desacomodar físicamente tus libros para ponerlos del 4 al 1. `.toReversed()` es tomarle una **fotografía** a la pila, invertir la imagen digital e imprimirla: tu estante físico sigue ordenado como lo dejaste.",
    fuente:
      "MDN Web Docs | Array.prototype.toReversed() | ECMAScript 2023 (ES14)",
    notasPersonales: [
      "**Ventaja oculta:** `.reverse()` preserva los huecos vacíos (*sparse arrays*), mientras `.toReversed()` los convierte en `undefined`, lo que da un comportamiento más predecible al iterar después.",
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve toReversed()?",
        opciones: [
          "El mismo array invertido",
          "Un nuevo array invertido",
          "La longitud",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué le pasa al array original al usar toReversed()?",
        opciones: ["Se invierte", "Queda intacto", "Se vacía", "Se ordena"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta:
          "¿Cuál era la forma antigua de invertir sin mutar el original?",
        opciones: [
          "[...arr].reverse()",
          "arr.reverse()",
          "arr.sort()",
          "arr.slice(-1)",
        ],
        correcta: 0,
      },
      {
        id: 4,
        pregunta: "¿Qué parámetros recibe toReversed()?",
        opciones: ["Un índice", "Un callback", "Ninguno", "Un separador"],
        correcta: 2,
      },
      {
        id: 5,
        pregunta: "¿En qué versión de ECMAScript se introdujo toReversed()?",
        opciones: ["ES5", "ES2015", "ES2019", "ES2023"],
        correcta: 3,
      },
      {
        id: 6,
        pregunta: "¿Qué devuelve [1, 2, 3, 4].toReversed()?",
        opciones: ["[1, 2, 3, 4]", "[4, 3, 2, 1]", "[2, 1, 4, 3]", "[4]"],
        correcta: 1,
      },
      {
        id: 7,
        pregunta:
          "¿Qué hace toReversed() con los huecos vacíos de un array disperso?",
        opciones: [
          "Los conserva como huecos",
          "Los convierte en undefined",
          "Los elimina",
          "Lanza un error",
        ],
        correcta: 1,
      },
      {
        id: 8,
        pregunta: "¿Qué tipo de copia realiza toReversed()?",
        opciones: [
          "Profunda",
          "Superficial",
          "Ninguna",
          "Depende del contenido",
        ],
        correcta: 1,
      },
    ],
  },

  /* ============================ reverse() ============================ */
  reverse: {
    id: "reverse",
    titulo: "Array.prototype.reverse()",
    simulador: "utilidad",
    definicion: [
      "Es un método de `Array.prototype` que **invierte el orden de los elementos** de un array, **modificando el original**.",
      "Devuelve la **misma referencia** al arreglo ya invertido.",
    ],
    queEs: [
      "Es un método heredado de `Array.prototype`.",
      "Forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
      "Es **mutable**: cambia directamente el contenido del array original.",
      "Si necesitas invertir **sin** modificar el original, usa `toReversed()` (ES2023).",
    ],
    paraQueSirve: [
      "Invertir el orden de los elementos de un array.",
      "Mostrar datos del último al primero (ej. mensajes del más reciente al más antiguo).",
      "Preparar datos para ciertos algoritmos o presentaciones.",
    ],
    comoFunciona: [
      "Se llama sobre un array (sin parámetros).",
      "Intercambia el primer elemento con el último, el segundo con el penúltimo, y así sucesivamente hasta el centro.",
      "El array original queda modificado.",
      "Devuelve la misma referencia al array invertido.",
    ],
    sintaxis: [
      {
        code: `array.reverse();`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** el mismo array, ahora con sus elementos en orden inverso.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Invertir un arreglo",
        code: `const numeros = [1, 2, 3, 4];
numeros.reverse();

console.log(numeros); // [4, 3, 2, 1]`,
      },
      {
        titulo: "Ejemplo 2: El retorno es la misma referencia",
        code: `const frutas = ["Manzana", "Pera", "Uva"];
const invertido = frutas.reverse();

console.log(frutas);    // ["Uva", "Pera", "Manzana"]
console.log(invertido); // ["Uva", "Pera", "Manzana"]
console.log(frutas === invertido); // true (mismo arreglo)`,
      },
      {
        titulo: "Ejemplo 3: Invertir sin modificar el original",
        code: `const numeros = [1, 2, 3];

const copia = [...numeros].reverse(); // con spread
const moderna = numeros.toReversed(); // ES2023

console.log(numeros); // [1, 2, 3]
console.log(copia);   // [3, 2, 1]`,
      },
    ],
    errores: [
      {
        texto:
          "**Pensar que crea un nuevo array:** `reverse()` modifica el original.",
        code: `const numeros = [1, 2, 3];
numeros.reverse();
console.log(numeros); // [3, 2, 1]`,
      },
      {
        texto:
          "**Confundir `reverse()` con ordenar de mayor a menor:** solo invierte la posición actual, no ordena.",
        code: `[10, 5, 20].reverse();         // [20, 5, 10]
[10, 5, 20].sort((a, b) => b - a); // [20, 10, 5]`,
      },
      "**Mutación en React:** usar `reverse()` directamente sobre el estado muta la referencia original; copia primero con `[...lista].reverse()` o usa `toReversed()`.",
    ],
    casos: [
      "Mostrar mensajes del más reciente al más antiguo.",
      "Procesar datos desde el final.",
      "Algoritmos que requieren recorrer datos en sentido inverso.",
      "Crear efectos visuales en interfaces.",
    ],
    relacion: [
      "**`toReversed()`:** devuelve un nuevo array invertido sin modificar el original.",
      "**`sort()`:** ordena los elementos (no solo los invierte).",
      "**Mutabilidad vs. inmutabilidad:** `reverse()` muta; `toReversed()` mantiene intacto el original.",
      "**Spread (`...`):** permite copiar antes de invertir.",
    ],
    analogia:
      "Imagina una **fila de personas**: Ana → Luis → Carla → Pedro. `reverse()` es pedirles que se den la vuelta y cambien completamente el orden: Pedro → Carla → Luis → Ana. No se crea una fila nueva; **la misma fila cambia de orden**.",
    fuente:
      "MDN Web Docs | Array.prototype.reverse() | ECMAScript Specification",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve reverse()?",
        opciones: [
          "Un nuevo array",
          "La misma referencia del array ya invertido",
          "La longitud",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿reverse() modifica el array original?",
        opciones: [
          "No",
          "Sí, es mutable",
          "Solo con strings",
          "Solo con números",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve [10, 5, 20].reverse()?",
        opciones: ["[5, 10, 20]", "[20, 10, 5]", "[20, 5, 10]", "[10, 5, 20]"],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿reverse() ordena de mayor a menor?",
        opciones: [
          "Sí",
          "No, solo invierte la posición actual",
          "Solo con números",
          "Solo con strings",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta:
          "Si const a = [1, 2]; const b = a.reverse(); ¿cuánto vale a === b?",
        opciones: ["false", "true", "undefined", "Depende"],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿Cuál es la alternativa moderna e inmutable a reverse()?",
        opciones: ["toReversed()", "toSorted()", "flat()", "fill()"],
        correcta: 0,
      },
      {
        id: 7,
        pregunta:
          "¿Cómo inviertes un array sin mutar el original usando spread?",
        opciones: [
          "arr.reverse()",
          "[...arr].reverse()",
          "arr.slice(-1)",
          "arr.concat()",
        ],
        correcta: 1,
      },
      {
        id: 8,
        pregunta: "¿Qué hace internamente reverse()?",
        opciones: [
          "Intercambia el primer elemento con el último, el segundo con el penúltimo, etc.",
          "Ordena alfabéticamente",
          "Crea una copia y la invierte",
          "Elimina duplicados",
        ],
        correcta: 0,
      },
    ],
  },

  /* ============================ flat() ============================ */
  flat: {
    id: "flat",
    titulo: "Array.prototype.flat()",
    simulador: "utilidad",
    definicion: [
      "Es un método de `Array.prototype` que devuelve **un nuevo arreglo** con los elementos de los subarreglos concatenados hasta una **profundidad** especificada.",
    ],
    queEs: [
      "Es un método heredado de `Array.prototype`, parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
      "Es **inmutable**: no modifica el arreglo original.",
      '"Aplana" un arreglo anidado, eliminando uno o más niveles de anidación.',
    ],
    paraQueSirve: [
      "Convertir arreglos anidados en un arreglo más simple.",
      "Reducir niveles de profundidad.",
      "Facilitar el procesamiento de datos antes de recorrerlos o filtrarlos.",
    ],
    comoFunciona: [
      "Se llama sobre un arreglo, opcionalmente con una **profundidad** (por defecto `1`).",
      "Recorre sus elementos.",
      "Si encuentra un subarreglo, extrae sus elementos según la profundidad indicada.",
      "Devuelve un **nuevo arreglo**; el original permanece sin cambios.",
      "También **elimina los huecos vacíos** (*empty slots*) de los niveles que aplana.",
    ],
    sintaxis: [
      {
        code: `array.flat();            // profundidad 1
array.flat(profundidad); // profundidad indicada`,
      },
    ],
    nota: "**`profundidad` (opcional):** número de niveles a aplanar; por defecto `1`. Usa `Infinity` para aplanar todo. **Retorno:** un nuevo arreglo aplanado.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Aplanar un nivel",
        code: `const numeros = [1, 2, [3, 4]];
console.log(numeros.flat()); // [1, 2, 3, 4]`,
      },
      {
        titulo: "Ejemplo 2: Aplanar dos niveles",
        code: `const datos = [1, [2, [3, 4]]];
console.log(datos.flat(2)); // [1, 2, 3, 4]`,
      },
      {
        titulo: "Ejemplo 3: Aplanar completamente",
        code: `const datos = [1, [2, [3, [4, [5]]]]];
console.log(datos.flat(Infinity)); // [1, 2, 3, 4, 5]`,
      },
      {
        titulo: "Ejemplo 4: Eliminar espacios vacíos",
        code: `const datos = [1, , 2, [3, , 4]];
console.log(datos.flat()); // [1, 2, 3, 4]`,
      },
    ],
    errores: [
      {
        texto:
          "**Pensar que modifica el arreglo original:** devuelve uno nuevo.",
        code: `const numeros = [1, [2, 3]];
numeros.flat();
console.log(numeros); // [1, [2, 3]]`,
      },
      {
        texto:
          "**Creer que aplana todos los niveles por defecto:** solo aplana **un** nivel.",
        code: `[1, [2, [3]]].flat(); // [1, 2, [3]]`,
      },
      {
        texto: "**Olvidar guardar el resultado:**",
        code: `const datos = [1, [2, 3]];
datos.flat();               // ❌ el resultado se pierde
const plano = datos.flat(); // ✅`,
      },
      "**Confundir `flat()` con `flatMap()`:** `flat()` solo aplana; `flatMap()` primero transforma cada elemento con `map()` y luego aplana un nivel.",
    ],
    casos: [
      "Procesar datos provenientes de APIs.",
      "Simplificar arreglos anidados.",
      "Preparar datos para `map()`, `filter()` o `reduce()`.",
      "Unir listas contenidas dentro de otras listas.",
    ],
    relacion: [
      "**`flatMap()`:** combina `map()` y `flat(1)`.",
      "**`map()`:** transforma elementos sin aplanarlos.",
      "**`concat()`:** une arreglos, pero no elimina niveles de anidación automáticamente.",
      "**Inmutabilidad:** devuelve un arreglo nuevo y conserva el original.",
    ],
    analogia:
      "Imagina una **caja con otras cajas dentro**. Usar `flat()` es abrir **una capa** de cajas y colocar su contenido en la caja principal. Si hay cajas dentro de cajas, usas una profundidad mayor (`flat(2)`, `flat(3)`) o `flat(Infinity)` para abrirlas todas.",
    fuente: "MDN Web Docs | Array.prototype.flat() | ECMAScript Specification",
    quiz: [
      {
        id: 1,
        pregunta: "¿Cuál es la profundidad por defecto de flat()?",
        opciones: ["0", "1", "2", "Infinity"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve [1, [2, [3]]].flat()?",
        opciones: ["[1, 2, 3]", "[1, 2, [3]]", "[1, [2, 3]]", "[[1], 2, 3]"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Cómo aplanas un arreglo con cualquier nivel de anidación?",
        opciones: ["flat(0)", "flat(-1)", "flat(Infinity)", "flat(null)"],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿flat() modifica el arreglo original?",
        opciones: [
          "Sí",
          "No, devuelve uno nuevo",
          "Solo con números",
          "Depende de la profundidad",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué hace flat() con los elementos vacíos (empty slots)?",
        opciones: [
          "Los conserva",
          "Los elimina",
          "Los convierte en null",
          "Lanza un error",
        ],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿Cuál es la diferencia entre flat() y flatMap()?",
        opciones: [
          "flat() solo aplana; flatMap() primero transforma con map() y luego aplana un nivel",
          "Son idénticos",
          "flatMap() aplana todos los niveles",
          "flat() acepta un callback",
        ],
        correcta: 0,
      },
      {
        id: 7,
        pregunta: "¿Qué devuelve [1, [2, [3, [4]]]].flat(2)?",
        opciones: [
          "[1, 2, 3, 4]",
          "[1, 2, 3, [4]]",
          "[1, 2, [3, [4]]]",
          "[1, [2, 3, 4]]",
        ],
        correcta: 1,
      },
      {
        id: 8,
        pregunta: "¿Qué devuelve [1, 2, 3].flat()?",
        opciones: ["[[1, 2, 3]]", "[1, 2, 3] (una copia)", "[]", "Un error"],
        correcta: 1,
      },
    ],
  },

  /* ============================ copyWithin() ============================ */
  copywithin: {
    id: "copywithin",
    titulo: "Array.prototype.copyWithin()",
    simulador: "utilidad",
    definicion: [
      "Es un método **mutador** que **copia una parte de un array en otra posición del mismo array**, sobrescribiendo lo que haya ahí, **sin cambiar su longitud**.",
      "Devuelve el mismo array modificado (misma referencia).",
    ],
    queEs: [
      "Permite **mover o duplicar** bloques de elementos dentro de un mismo array de forma eficiente.",
      "Copia una porción (definida por `start` y `end`) y la pega desde la posición `target`, sobrescribiendo los elementos que encuentre.",
      "Es parecido a `splice()`, pero **nunca cambia el `length`**.",
    ],
    paraQueSirve: [
      "Duplicar secciones del array en otras ubicaciones.",
      "Desplazar elementos sin cambiar la longitud (buffers, ventanas deslizantes).",
      "Implementar algoritmos de rotación o de manipulación de memoria sobre arrays.",
      "Operaciones eficientes sobre `TypedArray` (audio, gráficos, binarios).",
    ],
    comoFunciona: [
      "Toma la porción desde `start` hasta `end` (sin incluir `end`).",
      "La pega a partir del índice `target`, sobrescribiendo lo existente.",
      "**Siempre lee los valores originales** (como si primero hiciera una copia temporal), así que las zonas que se solapan se manejan correctamente.",
      "Los índices pueden ser negativos (cuentan desde el final).",
      "Lo que no cabe después de `target` se descarta: la longitud no cambia.",
    ],
    sintaxis: [
      {
        code: `array.copyWithin(target, start, end);`,
      },
    ],
    nota: "**`target`:** dónde se empieza a pegar. **`start` (opcional):** desde dónde copia (por defecto `0`). **`end` (opcional):** hasta dónde copia, sin incluirlo (por defecto `length`). **Retorno:** el mismo array.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Copiar elementos al principio",
        code: `const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3);

console.log(arr); // [4, 5, 3, 4, 5]`,
      },
      {
        titulo: "Ejemplo 2: Copiar un bloque a otra posición",
        code: `const arr = [1, 2, 3, 4, 5];
arr.copyWithin(2, 0, 2);

console.log(arr); // [1, 2, 1, 2, 5]`,
      },
      {
        titulo: "Ejemplo 3: Índices negativos",
        code: `const arr = [1, 2, 3, 4, 5];
arr.copyWithin(-1, -3);

// target = 4, start = 2: solo cabe 1 elemento (el 3)
console.log(arr); // [1, 2, 3, 4, 3]`,
      },
      {
        titulo: "Ejemplo 4: Zonas que se solapan",
        code: `const arr = [1, 2, 3, 4, 5];
arr.copyWithin(1, 0, 3);

// Copia [1, 2, 3] sobre los índices 1..3, leyendo los valores originales
console.log(arr); // [1, 1, 2, 3, 5]`,
      },
    ],
    errores: [
      {
        texto:
          "**Olvidar que modifica el array original:** no devuelve una copia, devuelve el mismo array.",
        code: `const original = [1, 2, 3, 4, 5];
const nuevo = original.copyWithin(0, 3);

console.log(nuevo === original); // true
console.log(original);           // [4, 5, 3, 4, 5]

// Para no mutar: clona primero
const copia = [...original].copyWithin(0, 3);`,
      },
      "**Confundir `start` y `end`:** `end` es **excluyente**. `arr.copyWithin(4, 0, 3)` copia los índices 0, 1 y 2.",
      "**Esperar que cambie el length:** nunca lo hace; lo que no cabe se descarta.",
      "**Confundir `target` con el origen:** `target` es donde se **pega**, `start` es desde donde se **copia**.",
    ],
    casos: [
      {
        texto:
          "**Desplazar un buffer a la izquierda** (descartando el primer elemento):",
        code: `buffer.copyWithin(0, 1);
buffer[buffer.length - 1] = 0;`,
      },
      "**Procesamiento de audio o gráficos:** mover bloques de muestras en un `Float32Array` o `Uint8Array` sin crear arrays nuevos.",
      "**Algoritmos de rotación o inserción** donde se necesita mover bloques sin reasignar memoria.",
    ],
    relacion: [
      "**`slice()`:** copia una sección a un **nuevo** array (no modifica el original).",
      "**`splice()`:** agrega o elimina elementos y **sí** cambia la longitud.",
      "**`fill()`:** rellena con un valor fijo, no con elementos existentes.",
      "**`TypedArray.prototype.copyWithin()`:** la misma idea para arrays tipados.",
    ],
    analogia:
      "Imagina un **estante con libros**. `copyWithin()` es como **fotocopiar** algunos libros de una sección y **pegar las copias encima** de los de otra sección del mismo estante. El número total de libros no cambia; lo que cambia es qué hay en cada posición.",
    fuente:
      "MDN Web Docs | Array.prototype.copyWithin() | ECMAScript Specification",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve copyWithin()?",
        opciones: [
          "Un nuevo array",
          "El mismo array modificado",
          "La longitud",
          "Los elementos copiados",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿copyWithin() cambia el length del array?",
        opciones: [
          "Sí, lo aumenta",
          "Sí, lo reduce",
          "No, nunca",
          "Depende de target",
        ],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve [1, 2, 3, 4, 5].copyWithin(0, 3)?",
        opciones: [
          "[4, 5, 3, 4, 5]",
          "[1, 2, 3, 4, 5]",
          "[4, 5, 3, 4]",
          "[3, 4, 5, 4, 5]",
        ],
        correcta: 0,
      },
      {
        id: 4,
        pregunta: "En copyWithin(target, start, end), ¿qué indica target?",
        opciones: [
          "Desde dónde copia",
          "Dónde empieza a pegar",
          "Hasta dónde copia",
          "Cuántos elementos copia",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué devuelve [1, 2, 3, 4, 5].copyWithin(2, 0, 2)?",
        opciones: [
          "[1, 2, 1, 2, 5]",
          "[1, 2, 3, 1, 2]",
          "[1, 1, 2, 4, 5]",
          "[1, 2, 1, 2, 3]",
        ],
        correcta: 0,
      },
      {
        id: 6,
        pregunta: "¿Qué pasa con los elementos que no caben después de target?",
        opciones: [
          "Se agregan al final",
          "Se descartan (el length no cambia)",
          "Lanza un error",
          "Se pegan al inicio",
        ],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿Cuál es la diferencia entre copyWithin() y slice()?",
        opciones: [
          "copyWithin() muta el mismo array; slice() copia a un array nuevo",
          "Son idénticos",
          "slice() muta el array",
          "copyWithin() devuelve un array nuevo",
        ],
        correcta: 0,
      },
      {
        id: 8,
        pregunta: "¿Cómo evitas mutar el original al usar copyWithin()?",
        opciones: [
          "No se puede",
          "Clonándolo antes: [...arr].copyWithin(...)",
          "Usando pop()",
          "Usando with()",
        ],
        correcta: 1,
      },
    ],
  },

  /* ============================ entries() ============================ */
  entries: {
    id: "entries",
    titulo: "Array.prototype.entries()",
    simulador: "utilidad",
    definicion: [
      "Es un método que devuelve un **nuevo objeto iterador** que contiene los pares **`[índice, valor]`** de cada elemento del array.",
    ],
    queEs: [
      "Permite **iterar un array obteniendo el índice y el valor** de cada elemento a la vez.",
      "Devuelve un **iterador** (no un array) que se recorre con `for...of`, `Array.from()` o el operador spread.",
      "Es **de solo lectura**: no modifica el array original.",
      "Es **perezoso** (*lazy*): genera cada par solo cuando se le pide.",
    ],
    paraQueSirve: [
      "Iterar obteniendo **índice y valor** simultáneamente.",
      "Crear arrays de pares `[índice, valor]` para procesarlos.",
      "Construir un `Map` o un objeto a partir de un array.",
      "Algoritmos que necesitan conocer la posición del elemento.",
    ],
    comoFunciona: [
      "Devuelve un objeto **Array Iterator** (implementa los protocolos Iterable e Iterator).",
      "Cada llamada a `next()` entrega `{ value: [indice, valor], done: false }`.",
      "Al terminar entrega `{ value: undefined, done: true }`.",
      "Los huecos de un array disperso se entregan con valor `undefined`.",
      "El iterador **se agota**: no se reinicia solo, hay que crear uno nuevo.",
    ],
    sintaxis: [
      {
        code: `array.entries();`,
      },
      {
        caption: "Uso típico con desestructuración:",
        code: `for (const [indice, valor] of array.entries()) {
  console.log(indice, valor);
}`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** un `Array Iterator` de pares `[indice, valor]`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Recorrer con for...of",
        code: `const frutas = ["manzana", "banana", "naranja"];

for (const [indice, valor] of frutas.entries()) {
  console.log("Índice " + indice + ": " + valor);
}
// Índice 0: manzana
// Índice 1: banana
// Índice 2: naranja`,
      },
      {
        titulo: "Ejemplo 2: Convertir a array de pares",
        code: `const arr = ["a", "b", "c"];

console.log(Array.from(arr.entries())); // [[0, "a"], [1, "b"], [2, "c"]]
console.log([...arr.entries()]);        // lo mismo con spread`,
      },
      {
        titulo: "Ejemplo 3: Iterador manual con next()",
        code: `const iter = ["rojo", "verde"].entries();

console.log(iter.next()); // { value: [0, "rojo"], done: false }
console.log(iter.next()); // { value: [1, "verde"], done: false }
console.log(iter.next()); // { value: undefined, done: true }`,
      },
      {
        titulo: "Ejemplo 4: Crear un Map",
        code: `const colores = ["rojo", "verde", "azul"];
const mapa = new Map(colores.entries());

console.log(mapa); // Map(3) { 0 => "rojo", 1 => "verde", 2 => "azul" }`,
      },
    ],
    errores: [
      {
        texto:
          "**Recorrer dos veces el mismo iterador:** la segunda vez ya está agotado.",
        code: `const iter = [1, 2, 3].entries();
console.log([...iter]); // [[0, 1], [1, 2], [2, 3]]
console.log([...iter]); // [] ← ¡ya se consumió!`,
      },
      "**Confundir `Array.entries()` con `Object.entries()`:** el primero devuelve `[índice, valor]` de un array; el segundo devuelve `[clave, valor]` de un objeto.",
      "**Pensar que devuelve un array:** devuelve un iterador. `Array.isArray(arr.entries())` es `false`.",
      {
        texto:
          "**No usar desestructuración:** funciona, pero es menos legible.",
        code: `// Menos legible
for (const par of arr.entries()) console.log(par[0], par[1]);

// ✅ Mejor
for (const [i, v] of arr.entries()) console.log(i, v);`,
      },
    ],
    casos: [
      {
        texto: "**Agregar IDs automáticos:**",
        code: `const conIds = [...items.entries()].map(([i, item]) => ({ ...item, id: i + 1 }));`,
      },
      {
        texto: "**Filtrar por posición:**",
        code: `const pares = [...numeros.entries()]
  .filter(([i]) => i % 2 === 0)
  .map(([_, valor]) => valor);`,
      },
      "**Recorrer matrices** con índices de fila y columna usando `entries()` anidados.",
    ],
    relacion: [
      "**`keys()`:** iterador solo con los índices.",
      "**`values()`:** iterador solo con los valores.",
      "**`Object.entries()`:** la versión para objetos (`[clave, valor]`).",
      "**`Map`:** puede construirse directamente desde `entries()`.",
      "**`for...of` y `Array.from()`:** las formas de consumir un iterador.",
    ],
    analogia:
      "Imagina un **archivo indexado** en una biblioteca. Cada libro tiene una **etiqueta con su número de estante** (índice) y el **contenido del libro** (valor). `entries()` te entrega una tarjeta por cada libro con ambos datos, para que sepas qué hay y exactamente dónde está.",
    fuente: "MDN Web Docs | Array.prototype.entries() | Iteration protocols",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve entries()?",
        opciones: [
          "Un array de pares",
          "Un iterador de pares [índice, valor]",
          "Solo los índices",
          "Solo los valores",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve Array.isArray(arr.entries())?",
        opciones: ["true", "false", "undefined", "Un error"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve [...['a', 'b'].entries()]?",
        opciones: [
          "['a', 'b']",
          "[[0, 'a'], [1, 'b']]",
          "[0, 1]",
          "[['a', 0], ['b', 1]]",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta:
          "¿Qué pasa si recorres el mismo iterador dos veces con [...iter]?",
        opciones: [
          "Devuelve lo mismo",
          "La segunda vez devuelve [] porque ya se agotó",
          "Lanza un error",
          "Se reinicia solo",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta:
          "¿Qué devuelve iter.next() cuando ya recorrió todos los elementos?",
        opciones: [
          "{ value: undefined, done: true }",
          "null",
          "{ value: 0, done: false }",
          "Un error",
        ],
        correcta: 0,
      },
      {
        id: 6,
        pregunta:
          "¿Cuál es la diferencia entre Array.entries() y Object.entries()?",
        opciones: [
          "Array devuelve [índice, valor] de un array; Object devuelve [clave, valor] de un objeto",
          "Son idénticos",
          "Object.entries() devuelve un iterador",
          "Array.entries() devuelve claves",
        ],
        correcta: 0,
      },
      {
        id: 7,
        pregunta: "¿Cómo se recorre normalmente entries() con índice y valor?",
        opciones: [
          "for (const [i, v] of arr.entries())",
          "for (const i in arr.entries())",
          "arr.entries().forEach",
          "arr.entries()[0]",
        ],
        correcta: 0,
      },
      {
        id: 8,
        pregunta: "¿entries() modifica el array original?",
        opciones: [
          "Sí",
          "No, es de solo lectura",
          "Solo con objetos",
          "Depende del bucle",
        ],
        correcta: 1,
      },
    ],
  },

  /* ============================ keys() ============================ */
  keys: {
    id: "keys",
    titulo: "Array.prototype.keys()",
    simulador: "utilidad",
    definicion: [
      "Es un método que devuelve un **iterador con los índices (posiciones)** de un array.",
    ],
    queEs: [
      "Permite recorrer las **posiciones** de un array sin obtener directamente sus valores.",
      "Devuelve un **iterador** (`Array Iterator`), no un array.",
      "Es de solo lectura: no modifica el array original.",
    ],
    paraQueSirve: [
      "Obtener los índices de un array.",
      "Recorrer posiciones con `for...of`.",
      "Trabajar con índices independientemente de los valores.",
      "Iterar también las posiciones vacías de arrays dispersos (*sparse arrays*).",
    ],
    comoFunciona: [
      "Crea un iterador perezoso sobre el array.",
      "Cada llamada a `next()` entrega el siguiente índice: `0, 1, 2...`.",
      "Al terminar entrega `{ value: undefined, done: true }`.",
      "Para obtener un array real, se convierte con `[...iter]` o `Array.from(iter)`.",
    ],
    sintaxis: [
      {
        code: `array.keys();`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** un `Array Iterator` de índices.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Obtener los índices",
        code: `const frutas = ["🍎", "🍌", "🍊"];
const indices = frutas.keys();

console.log([...indices]); // [0, 1, 2]`,
      },
      {
        titulo: "Ejemplo 2: Recorrer con for...of",
        code: `const frutas = ["🍎", "🍌", "🍊"];

for (const indice of frutas.keys()) {
  console.log(indice);
}
// 0
// 1
// 2`,
      },
      {
        titulo: "Ejemplo 3: Índice y valor accediendo al array",
        code: `for (const indice of frutas.keys()) {
  console.log(indice, frutas[indice]);
}
// 0 🍎
// 1 🍌
// 2 🍊`,
      },
    ],
    errores: [
      {
        texto:
          "**Pensar que devuelve los valores:** devuelve **índices**; los valores los entrega `values()`.",
        code: `const frutas = ["🍎", "🍌", "🍊"];
console.log([...frutas.keys()]); // [0, 1, 2]`,
      },
      {
        texto: "**Pensar que devuelve un array:** es un iterador.",
        code: `const resultado = frutas.keys();
console.log(Array.isArray(resultado)); // false`,
      },
      "**Reutilizar un iterador agotado:** una vez recorrido, hay que llamar de nuevo a `keys()`.",
    ],
    casos: [
      "Recorrer los índices de un array.",
      "Trabajar con posiciones de elementos.",
      "Iterar arrays mediante `for...of`.",
      "Combinar índices con acceso al array.",
      "Trabajar con arrays dispersos (*sparse arrays*), porque `keys()` también entrega los huecos.",
    ],
    relacion: [
      "**`values()`:** iterador de los valores.",
      "**`entries()`:** iterador de pares `[índice, valor]`.",
      {
        texto: "**Los tres métodos juntos:**",
        code: `const frutas = ["🍎", "🍌"];

[...frutas.keys()];    // [0, 1]
[...frutas.values()];  // ["🍎", "🍌"]
[...frutas.entries()]; // [[0, "🍎"], [1, "🍌"]]`,
      },
    ],
    analogia:
      "Imagina un **edificio**: Piso 0 → 🍎, Piso 1 → 🍌, Piso 2 → 🍊. `keys()` no te dice qué hay en cada piso: te entrega **los números de los pisos** (0, 1, 2).",
    fuente: "MDN Web Docs | Array.prototype.keys()",
    notasPersonales: ["**Para memorizar:** `keys()` → **posiciones/índices**."],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve keys()?",
        opciones: [
          "Un array de valores",
          "Un iterador de índices",
          "Un array de índices",
          "Un booleano",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve [...['a', 'b', 'c'].keys()]?",
        opciones: [
          "['a', 'b', 'c']",
          "[0, 1, 2]",
          "[1, 2, 3]",
          "[[0, 'a'], [1, 'b'], [2, 'c']]",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve Array.isArray(arr.keys())?",
        opciones: ["true", "false", "undefined", "Un error"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué método devuelve los valores en lugar de los índices?",
        opciones: ["keys()", "values()", "entries()", "flat()"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué método devuelve pares [índice, valor]?",
        opciones: ["keys()", "values()", "entries()", "concat()"],
        correcta: 2,
      },
      {
        id: 6,
        pregunta: "¿Cómo conviertes el iterador de keys() en un array real?",
        opciones: [
          "arr.keys().toArray()",
          "[...arr.keys()]",
          "arr.keys()[0]",
          "arr.keys.length",
        ],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿keys() modifica el array original?",
        opciones: ["Sí", "No", "Solo con números", "Depende del bucle"],
        correcta: 1,
      },
      {
        id: 8,
        pregunta:
          "Si const frutas = ['🍎', '🍌', '🍊'], ¿qué índices recorre for (const i of frutas.keys())?",
        opciones: ["1, 2, 3", "0, 1, 2", "'🍎', '🍌', '🍊'", "Solo el 0"],
        correcta: 1,
      },
    ],
  },

  /* ============================ values() ============================ */
  values: {
    id: "values",
    titulo: "Array.prototype.values()",
    simulador: "utilidad",
    definicion: [
      "Es un método que devuelve un **iterador con los valores** contenidos en un array.",
    ],
    queEs: [
      "Permite recorrer los **elementos/valores** de un array mediante un iterador.",
      "Devuelve un `Array Iterator`, no un array.",
      "Es de solo lectura: no modifica el array original.",
    ],
    paraQueSirve: [
      "Obtener los valores de un array mediante un iterador.",
      "Recorrer elementos con `for...of`.",
      "Trabajar con los valores sin acceder manualmente mediante índices.",
    ],
    comoFunciona: [
      "Crea un iterador perezoso sobre el array.",
      "Cada llamada a `next()` entrega el siguiente valor.",
      "Al terminar entrega `{ value: undefined, done: true }`.",
      "Para obtener un array real se convierte con `[...iter]` o `Array.from(iter)`.",
      "`values()` es el iterador por defecto de los arrays: `for (const x of arr)` usa lo mismo internamente.",
    ],
    sintaxis: [
      {
        code: `array.values();`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** un `Array Iterator` de valores.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Obtener los valores",
        code: `const frutas = ["🍎", "🍌", "🍊"];
const valores = frutas.values();

console.log([...valores]); // ["🍎", "🍌", "🍊"]`,
      },
      {
        titulo: "Ejemplo 2: Recorrer con for...of",
        code: `for (const fruta of frutas.values()) {
  console.log(fruta);
}
// 🍎
// 🍌
// 🍊`,
      },
      {
        titulo: "Ejemplo 3: Comparación con keys()",
        code: `console.log([...frutas.keys()]);   // [0, 1, 2]
console.log([...frutas.values()]); // ["🍎", "🍌", "🍊"]`,
      },
      {
        titulo: "Ejemplo 4: Si necesitas índice y valor, usa entries()",
        code: `for (const [indice, fruta] of frutas.entries()) {
  console.log(indice, fruta);
}`,
      },
    ],
    errores: [
      {
        texto: "**Pensar que devuelve un array:**",
        code: `const resultado = frutas.values();
console.log(Array.isArray(resultado)); // false

// Para convertirlo
const array = [...frutas.values()];`,
      },
      "**Confundir `values()` con `keys()`:** `keys()` entrega posiciones; `values()` entrega valores.",
      "**Usar `entries()` cuando solo necesitas los valores:** si no te importa el índice, `values()` (o directamente `for...of` sobre el array) es suficiente.",
    ],
    casos: [
      "Recorrer los valores de un array.",
      "Utilizar iteradores en general.",
      "Trabajar con `for...of`.",
      "Pasar los valores a operaciones que acepten iterables.",
    ],
    relacion: [
      "**`keys()`:** iterador de índices.",
      "**`entries()`:** iterador de pares `[índice, valor]`.",
      "**`Object.values()`:** versión para objetos (devuelve un array, no un iterador).",
      "**`for...of`:** consume el iterador de valores de forma directa.",
    ],
    analogia:
      "Imagina una **estantería**: Posición 0 → 🍎, Posición 1 → 🍌, Posición 2 → 🍊. `keys()` te dice **dónde están** (0, 1, 2); `values()` te dice **qué hay** (🍎, 🍌, 🍊); `entries()` te da **ambas cosas** ([0, 🍎], [1, 🍌], [2, 🍊]).",
    fuente: "MDN Web Docs | Array.prototype.values()",
    notasPersonales: [
      "**Para memorizar:** `values()` → **valores del array**.",
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve values()?",
        opciones: [
          "Un array de valores",
          "Un iterador de valores",
          "Un iterador de índices",
          "Un booleano",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve [...['a', 'b'].values()]?",
        opciones: [
          "[0, 1]",
          "['a', 'b']",
          "[[0, 'a'], [1, 'b']]",
          "['b', 'a']",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve Array.isArray(arr.values())?",
        opciones: ["true", "false", "undefined", "Un error"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Cuál es la diferencia entre keys() y values()?",
        opciones: [
          "keys() entrega índices; values() entrega valores",
          "Son idénticos",
          "values() entrega índices",
          "keys() entrega pares",
        ],
        correcta: 0,
      },
      {
        id: 5,
        pregunta: "Si necesitas índice y valor a la vez, ¿qué método usas?",
        opciones: ["keys()", "values()", "entries()", "flat()"],
        correcta: 2,
      },
      {
        id: 6,
        pregunta: "¿Cómo conviertes el iterador de values() en un array real?",
        opciones: [
          "arr.values().toArray()",
          "[...arr.values()]",
          "arr.values()[0]",
          "arr.values.length",
        ],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿Qué iterador usa por defecto for (const x of arr)?",
        opciones: ["keys()", "values()", "entries()", "Ninguno"],
        correcta: 1,
      },
      {
        id: 8,
        pregunta: "¿values() modifica el array original?",
        opciones: ["Sí", "No", "Solo con strings", "Depende del bucle"],
        correcta: 1,
      },
    ],
  },
};
