// src/data/Metodostransformacion.js
var METODOS_TRANSFORMACION = {
	map: {
		id: "map",
		titulo: "Array.prototype.map()",
		simulador: "utilidad",
		definicion: ["Es un método de orden superior que **transforma** cada elemento de un array aplicándole una función, y devuelve un **nuevo array** con los resultados.", "No modifica el array original."],
		queEs: [
			"Es una herramienta fundamental de la **programación funcional**.",
			"En lugar de usar bucles (`for`, `while`) para modificar los datos a mano, `map()` automatiza la iteración de forma declarativa: le dices *qué* quieres hacer con cada dato, no *cómo* recorrerlos.",
			"El array resultante **siempre tiene el mismo `length`** que el original."
		],
		paraQueSirve: [
			"**Transformar datos:** cambiar el formato o tipo de los elementos (por ejemplo, de números a strings).",
			"**Inmutabilidad:** mantiene los datos originales intactos, lo que previene errores en aplicaciones complejas.",
			"**Limpieza de código:** reemplaza bloques repetitivos por una sola línea clara y legible."
		],
		comoFunciona: [
			"Recibe como argumento una **función callback** (la regla de transformación).",
			"Recorre la colección elemento por elemento.",
			"Pasa cada elemento por el callback.",
			"Guarda el valor que retorna el callback en un nuevo array.",
			"Devuelve ese nuevo array cuando termina el recorrido."
		],
		sintaxis: [{ code: `const nuevoArray = arrayOriginal.map(function (elemento, indice, array) {
  // Código de transformación
  return nuevoElemento;
});` }, {
			caption: "Con función flecha (sintaxis moderna):",
			code: `const nuevoArray = arrayOriginal.map(elemento => elemento * 2);`
		}],
		nota: "**Parámetros:** `callback(elemento, indice, array)` y `thisArg` (opcional). **Retorno:** un nuevo array con el resultado del callback para cada elemento.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Multiplicar números por 2",
				code: `const numeros = [1, 2, 3, 4];
const dobles = numeros.map(num => num * 2);

console.log(dobles);  // [2, 4, 6, 8]
console.log(numeros); // [1, 2, 3, 4] (el original sigue igual)`
			},
			{
				titulo: "Ejemplo 2: Extraer datos de objetos",
				code: `const usuarios = [
  { nombre: "Ana", edad: 25 },
  { nombre: "Luis", edad: 30 }
];

const nombres = usuarios.map(u => u.nombre);
console.log(nombres); // ["Ana", "Luis"]`
			},
			{
				titulo: "Ejemplo 3: Usar el índice (segundo parámetro)",
				code: `const letras = ["a", "b", "c"];
const numeradas = letras.map((letra, i) => (i + 1) + ". " + letra);

console.log(numeradas); // ["1. a", "2. b", "3. c"]`
			}
		],
		errores: [
			{
				texto: "**Olvidar el `return`:** si usas llaves `{}` en una función flecha y no pones `return`, el nuevo array se llena de `undefined`.",
				code: `// ❌ ERROR
const dobles = numeros.map(num => { num * 2 }); // [undefined, undefined, ...]

// ✅ CORRECTO
const dobles2 = numeros.map(num => num * 2);`
			},
			"**Usarlo solo para efectos secundarios:** si no vas a guardar el array resultante, `map()` no es la herramienta. Para imprimir en consola o modificar variables externas usa `forEach()`.",
			{
				texto: "**La trampa de `map(parseInt)`:** `map` le pasa `(elemento, indice)` al callback, y `parseInt` interpreta el segundo argumento como base numérica.",
				code: `["1", "2", "3"].map(parseInt);          // [1, NaN, NaN]
["1", "2", "3"].map(n => parseInt(n));  // [1, 2, 3]`
			}
		],
		casos: [
			{
				texto: "**Renderizar listas en el Frontend (React):** transformar datos en elementos JSX.",
				code: `usuarios.map(u => <li key={u.id}>{u.nombre}</li>)`
			},
			"**Formatear dinero:** convertir una lista de precios numéricos en strings con el símbolo de moneda (`$10.00`).",
			"**Normalizar datos de APIs:** adaptar las propiedades de un objeto externo al formato que necesita tu aplicación."
		],
		relacion: [
			"**`filter()`:** a diferencia de `map()` (que transforma todos los elementos), `filter()` decide cuáles se quedan y reduce el tamaño del array.",
			"**`reduce()`:** mientras `map()` devuelve otra lista, `reduce()` condensa toda la lista en un solo valor (como una suma total).",
			"**`flatMap()`:** es `map()` seguido de `flat(1)`.",
			"**Inmutabilidad:** principio que prohíbe cambiar los datos existentes; `map()` lo respeta al crear un array nuevo."
		],
		analogia: "Imagina una **fábrica de galletas**. Tienes una bandeja con círculos de masa cruda (el array original). Pasas la bandeja por una máquina moldeadora (`map()`) que le estampa un corazón a cada masa. Al final obtienes una **nueva bandeja** con galletas en forma de corazón, y la bandeja original no cambió: cada pieza fue transformada individualmente bajo la misma regla.",
		fuente: "MDN Web Docs | Array.prototype.map()",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve map()?",
				opciones: [
					"El array original modificado",
					"Un nuevo array con los resultados del callback",
					"La longitud del array",
					"undefined"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿map() modifica el array original?",
				opciones: [
					"Sí, siempre",
					"No, es inmutable",
					"Solo con números",
					"Solo con objetos"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "Si el callback es n => { n * 2 } (con llaves y sin return), ¿qué obtienes?",
				opciones: [
					"[2, 4, 6]",
					"Un array lleno de undefined",
					"Un error de sintaxis",
					"El array original"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Qué length tiene el array que devuelve map()?",
				opciones: [
					"Menor que el original",
					"Mayor que el original",
					"El mismo que el original",
					"Depende del callback"
				],
				correcta: 2
			},
			{
				id: 5,
				pregunta: "Si no vas a usar el array resultante y solo quieres imprimir cada elemento, ¿qué método conviene?",
				opciones: [
					"map()",
					"forEach()",
					"flat()",
					"slice()"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Qué devuelve [1, 2, 3].map(n => n * 2)?",
				opciones: [
					"[1, 2, 3]",
					"[2, 4, 6]",
					"6",
					"[2, 3, 4]"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Cuál es la diferencia principal entre map() y filter()?",
				opciones: [
					"map() transforma todos los elementos; filter() decide cuáles se conservan",
					"Son idénticos",
					"filter() transforma y map() filtra",
					"map() muta el array"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "Si [\"1\", \"2\", \"3\"].map(parseInt) devuelve [1, NaN, NaN], ¿por qué?",
				opciones: [
					"Porque map() no funciona con strings",
					"Porque parseInt recibe el índice como segundo argumento (la base)",
					"Porque parseInt es asíncrono",
					"Porque el array está vacío"
				],
				correcta: 1
			}
		]
	},
	filter: {
		id: "filter",
		titulo: "Array.prototype.filter()",
		simulador: "utilidad",
		definicion: ["Es un método de `Array.prototype` que crea un **nuevo array** con todos los elementos que cumplen una condición definida por una función callback.", "No modifica el array original: es un método **inmutable**."],
		queEs: ["Es un método iterativo de arrays que forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.", "Ejecuta el callback sobre cada elemento: si devuelve un valor truthy el elemento se incluye en el nuevo array; si devuelve falsy, se descarta."],
		paraQueSirve: [
			"Filtrar datos de un array según una condición.",
			"Buscar **todos** los elementos que cumplan una regla (a diferencia de `find()`, que devuelve solo el primero).",
			"Eliminar elementos no deseados sin modificar el original.",
			"Filtrar resultados de APIs y construir búsquedas en tiempo real."
		],
		comoFunciona: [
			"Recorre cada elemento del array.",
			"Ejecuta el callback con ese elemento.",
			"Si el callback devuelve `true` (o truthy), conserva el elemento; si devuelve `false`, lo descarta.",
			"Devuelve un nuevo array con los elementos conservados (puede estar vacío)."
		],
		sintaxis: [{ code: `const resultado = array.filter((elemento, indice, array) => {
  // Condición que debe devolver true o false
  return condicion;
}, thisArg);` }, {
			caption: "Forma corta:",
			code: `const pares = numeros.filter(n => n % 2 === 0);`
		}],
		nota: "**Parámetros:** `callback(elemento, indice, array)` y `thisArg` (opcional). **Retorno:** un nuevo array con los elementos que cumplen (si ninguno cumple, `[]`).",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Filtrar números",
				code: `const numeros = [5, 10, 15, 20];
const mayores = numeros.filter(n => n > 10);

console.log(mayores); // [15, 20]
console.log(numeros); // [5, 10, 15, 20] (intacto)`
			},
			{
				titulo: "Ejemplo 2: Filtrar objetos",
				code: `const usuarios = [
  { nombre: "Ana", activo: true },
  { nombre: "Luis", activo: false },
  { nombre: "Carlos", activo: true }
];

const activos = usuarios.filter(u => u.activo);
console.log(activos); // [{ nombre: "Ana", ... }, { nombre: "Carlos", ... }]`
			},
			{
				titulo: "Ejemplo 3: Quitar valores falsy con Boolean",
				code: `const datos = [0, "Hola", false, "", null, 10];
const validos = datos.filter(Boolean);

console.log(validos); // ["Hola", 10]`
			},
			{
				titulo: "Ejemplo 4: Filtrar y luego transformar (encadenamiento)",
				code: `const nombresActivos = usuarios
  .filter(u => u.activo)
  .map(u => u.nombre);

console.log(nombresActivos); // ["Ana", "Carlos"]`
			}
		],
		errores: [
			{
				texto: "**Pensar que modifica el array original:** `filter()` devuelve un array nuevo.",
				code: `const numeros = [1, 2, 3, 4];
numeros.filter(n => n > 2);
console.log(numeros); // [1, 2, 3, 4]`
			},
			{
				texto: "**Confundirlo con `find()`:** `filter()` devuelve **todos** los que cumplen (en un array); `find()` devuelve solo el primero.",
				code: `[10, 20, 30].filter(x => x > 10); // [20, 30]
[10, 20, 30].find(x => x > 10);   // 20`
			},
			{
				texto: "**Olvidar el `return` con llaves:** el callback devuelve `undefined` (falsy) y el resultado siempre es `[]`.",
				code: `// ❌ Siempre []
numeros.filter(n => { n > 5; });

// ✅ Correcto
numeros.filter(n => { return n > 5; });`
			},
			"**Usarlo para modificar datos:** `filter()` solo decide qué se queda. Para transformar los elementos usa `map()`."
		],
		casos: [
			{
				texto: "**Buscar productos disponibles:**",
				code: `const disponibles = productos.filter(p => p.stock > 0);`
			},
			{
				texto: "**Búsqueda en tiempo real:**",
				code: `const resultado = productos.filter(p => p.nombre.includes("Lap"));`
			},
			"**Eliminar un elemento de forma inmutable (React):** `lista.filter(item => item.id !== idABorrar)`."
		],
		relacion: [
			"**`find()`:** devuelve el primer elemento que cumple.",
			"**`findIndex()`:** devuelve la posición del primero que cumple.",
			"**`map()`:** transforma cada elemento.",
			"**`reduce()`:** reduce todo a un único valor.",
			"**`every()` / `some()`:** devuelven un booleano (¿todos cumplen? / ¿alguno cumple?)."
		],
		analogia: "Imagina un **filtro de café** ☕. Tienes muchos granos y el filtro deja pasar solo los que cumplen la condición; los demás quedan fuera. El resultado es una nueva colección más limpia, y el costal original no se tocó.",
		fuente: "MDN Web Docs | Array.prototype.filter()",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve filter()?",
				opciones: [
					"El primer elemento que cumple",
					"Un nuevo array con los elementos que cumplen",
					"Un booleano",
					"El índice del elemento"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve filter() si ningún elemento cumple la condición?",
				opciones: [
					"undefined",
					"null",
					"-1",
					"Un array vacío []"
				],
				correcta: 3
			},
			{
				id: 3,
				pregunta: "¿filter() modifica el array original?",
				opciones: [
					"Sí",
					"No",
					"Solo con objetos",
					"Solo si el callback devuelve true"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Cuál es la diferencia entre filter() y find()?",
				opciones: [
					"filter() devuelve todos los que cumplen en un array; find() devuelve solo el primero",
					"Son iguales",
					"find() devuelve un array",
					"filter() se detiene al primer true"
				],
				correcta: 0
			},
			{
				id: 5,
				pregunta: "¿Qué devuelve [0, 'Hola', false, '', null, 10].filter(Boolean)?",
				opciones: [
					"[0, false, '', null]",
					"['Hola', 10]",
					"[]",
					"[0, 'Hola', false, '', null, 10]"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Qué obtienes con numeros.filter(n => { n > 5; })?",
				opciones: [
					"Los números mayores que 5",
					"Siempre un array vacío, porque falta el return",
					"Un error",
					"El array original"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "Para obtener solo los nombres de los usuarios activos, ¿qué encadenas?",
				opciones: [
					"usuarios.map(u => u.nombre).filter(u => u.activo)",
					"usuarios.filter(u => u.activo).map(u => u.nombre)",
					"usuarios.find(u => u.activo).nombre",
					"usuarios.flat()"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "¿Cómo eliminas de forma inmutable un elemento por su id?",
				opciones: [
					"lista.splice(id, 1)",
					"lista.filter(item => item.id !== id)",
					"lista.pop()",
					"lista.shift()"
				],
				correcta: 1
			}
		]
	},
	flatmap: {
		id: "flatmap",
		titulo: "Array.prototype.flatMap()",
		simulador: "utilidad",
		definicion: ["Es un método de `Array.prototype` que **aplica una función a cada elemento (`map`) y luego aplana el resultado un nivel (`flat`)**.", "Equivale a `map()` + `flat(1)` y devuelve un **nuevo array** sin modificar el original."],
		queEs: [
			"Es un método iterativo de arrays, parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
			"Fue introducido en **ECMAScript 2019 (ES10)**.",
			"Sirve para transformar elementos y, al mismo tiempo, eliminar un nivel de arrays anidados."
		],
		paraQueSirve: [
			"Transformar y aplanar en un solo paso (evita encadenar `map().flat()`).",
			"Expandir un elemento en **varios** valores.",
			"Filtrar y transformar a la vez, devolviendo `[]` para descartar un elemento.",
			"Extraer listas anidadas de objetos (cursos de usuarios, temas de cursos, etc.)."
		],
		comoFunciona: [
			"**Paso 1:** ejecuta `map()` con el callback sobre cada elemento.",
			"**Paso 2:** aplica `flat(1)` al resultado: abre un nivel de arrays.",
			"Si el callback devuelve un valor que **no** es array, se agrega tal cual.",
			"Si devuelve `[]`, ese elemento desaparece del resultado."
		],
		sintaxis: [{ code: `const resultado = array.flatMap((elemento, indice, array) => {
  // Devuelve un valor o un array de valores
  return nuevoValorOArray;
}, thisArg);` }, {
			caption: "Equivalencia:",
			code: `array.flatMap(fn);
// es casi lo mismo que
array.map(fn).flat(1);`
		}],
		nota: "**Parámetros:** `callback(elemento, indice, array)` y `thisArg` (opcional). **Retorno:** un nuevo array transformado y aplanado **un solo nivel**.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Un elemento → varios valores",
				code: `const numeros = [1, 2, 3];
const resultado = numeros.flatMap(n => [n, n * 2]);

console.log(resultado); // [1, 2, 2, 4, 3, 6]`
			},
			{
				titulo: "Ejemplo 2: Separar palabras de varias frases",
				code: `const frases = ["Hola Mundo", "JavaScript es genial"];
const palabras = frases.flatMap(frase => frase.split(" "));

console.log(palabras); // ["Hola", "Mundo", "JavaScript", "es", "genial"]`
			},
			{
				titulo: "Ejemplo 3: Filtrar y transformar a la vez",
				descripcion: "Devolver `[]` descarta el elemento; devolver `[valor]` lo conserva transformado.",
				code: `const numeros = [1, 2, 3, 4, 5];
const resultado = numeros.flatMap(n => (n % 2 === 0 ? [n * 10] : []));

console.log(resultado); // [20, 40]`
			},
			{
				titulo: "Ejemplo 4: Extraer listas anidadas de objetos",
				code: `const cursos = [
  { nombre: "JavaScript", temas: ["Arrays", "Objetos"] },
  { nombre: "Python", temas: ["Funciones", "Clases"] }
];

const temas = cursos.flatMap(curso => curso.temas);
console.log(temas); // ["Arrays", "Objetos", "Funciones", "Clases"]`
			}
		],
		errores: [
			{
				texto: "**Creer que aplana todos los niveles:** `flatMap()` solo aplana **uno**.",
				code: `[1, 2].flatMap(n => [[n]]); // [[1], [2]]  (queda un nivel anidado)`,
				nota: "Para más niveles usa `map(...).flat(2)` o `flat(Infinity)`."
			},
			{
				texto: "**Confundirlo con `map()`:** con el mismo callback, `map()` deja los arrays anidados y `flatMap()` los abre.",
				code: `[1, 2, 3].map(x => [x, x]);     // [[1, 1], [2, 2], [3, 3]]
[1, 2, 3].flatMap(x => [x, x]); // [1, 1, 2, 2, 3, 3]`
			},
			{
				texto: "**Pensar que modifica el array original:** es inmutable.",
				code: `const numeros = [1, 2, 3];
numeros.flatMap(x => [x * 2]);
console.log(numeros); // [1, 2, 3]`
			}
		],
		casos: [
			"**Procesar datos de APIs:** obtener todos los cursos de todos los usuarios con `usuarios.flatMap(u => u.cursos)`.",
			"**Construir listas desde estructuras complejas:** menús, categorías, productos, comentarios, permisos.",
			{
				texto: "**Reemplazar el patrón antiguo:**",
				code: `// Antes
array.map(fn).flat();

// Ahora
array.flatMap(fn);`
			}
		],
		relacion: [
			"**`map()`:** transforma elementos, sin aplanar.",
			"**`flat()`:** aplana arrays, sin transformar.",
			"**`filter()`:** filtra elementos (con `flatMap` puedes filtrar devolviendo `[]`).",
			"**`reduce()`:** reduce a un solo valor."
		],
		analogia: "Imagina una **fábrica** 🏭 con cajas: Caja 1 → [Producto A, Producto B], Caja 2 → [Producto C]. `map()` cambia cada caja; `flat()` abre todas las cajas y junta los productos; `flatMap()` hace las dos cosas: modifica los productos y los deja todos en **una sola lista**.",
		fuente: "MDN Web Docs | Array.prototype.flatMap() | ECMAScript 2019",
		quiz: [
			{
				id: 1,
				pregunta: "¿A qué equivale arr.flatMap(fn)?",
				opciones: [
					"arr.map(fn)",
					"arr.map(fn).flat(1)",
					"arr.flat(1).map(fn)",
					"arr.filter(fn)"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Cuántos niveles aplana flatMap()?",
				opciones: [
					"Ninguno",
					"Uno",
					"Dos",
					"Todos"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Qué devuelve [1, 2, 3].flatMap(x => [x, x])?",
				opciones: [
					"[[1, 1], [2, 2], [3, 3]]",
					"[1, 1, 2, 2, 3, 3]",
					"[1, 2, 3]",
					"[2, 4, 6]"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Qué pasa con un elemento cuyo callback devuelve []?",
				opciones: [
					"Se agrega undefined",
					"Desaparece del resultado",
					"Lanza un error",
					"Se agrega []"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Qué devuelve [1, 2, 3, 4, 5].flatMap(n => (n % 2 === 0 ? [n * 10] : []))?",
				opciones: [
					"[10, 20]",
					"[20, 40]",
					"[2, 4]",
					"[1, 3, 5]"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿En qué versión de ECMAScript se introdujo flatMap()?",
				opciones: [
					"ES5",
					"ES2015",
					"ES2019",
					"ES2023"
				],
				correcta: 2
			},
			{
				id: 7,
				pregunta: "¿Qué devuelve [1, 2].flatMap(n => [[n]])?",
				opciones: [
					"[1, 2]",
					"[[1], [2]]",
					"[[[1]], [[2]]]",
					"Un error"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "¿flatMap() modifica el array original?",
				opciones: [
					"Sí",
					"No, devuelve un array nuevo",
					"Solo si el callback devuelve arrays",
					"Depende del navegador"
				],
				correcta: 1
			}
		]
	},
	slice: {
		id: "slice",
		titulo: "Array.prototype.slice()",
		simulador: "utilidad",
		definicion: ["Es un método que **extrae una sección (una \"rebanada\")** de un array y la devuelve dentro de un **nuevo array**, sin modificar el original.", "También existe en strings (`String.prototype.slice()`), con la misma idea."],
		queEs: ["Es un método de **copia superficial** (*shallow copy*).", "En lugar de alterar la lista original eliminando o agregando elementos, `slice()` actúa como un bisturí de precisión: le indicas un punto de inicio y uno de final, y te entrega un duplicado de ese fragmento."],
		paraQueSirve: [
			"**Subdividir datos:** obtener los primeros *N* elementos (ej. el \"Top 3\" de un ranking).",
			"**Paginación:** cortar una lista larga en bloques más pequeños.",
			"**Clonar arrays:** copiar un array completo para trabajar sin alterar el original."
		],
		comoFunciona: [
			"Recibe dos parámetros opcionales: el índice de **inicio** y el de **fin**.",
			"**El inicio es inclusivo:** el elemento en esa posición sí entra en el resultado.",
			"**El fin es exclusivo:** el corte se hace justo *antes* de esa posición (ese elemento no entra).",
			"Con números negativos, la cuenta empieza desde el final hacia atrás (`length + indice`).",
			"Si `inicio >= fin`, devuelve `[]`."
		],
		sintaxis: [{ code: `const nuevoArray = arrayOriginal.slice(inicio, fin);` }],
		nota: "**`inicio` (opcional):** por defecto `0`. **`fin` (opcional):** por defecto `array.length`. **Retorno:** un nuevo array con la porción copiada.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Corte básico",
				code: `const frutas = ["Manzana", "Plátano", "Fresa", "Mango", "Uva"];

// Desde el índice 1 hasta el 4 (el 4 no se incluye)
const seleccionadas = frutas.slice(1, 4);

console.log(seleccionadas); // ["Plátano", "Fresa", "Mango"]
console.log(frutas);        // la lista original sigue intacta`
			},
			{
				titulo: "Ejemplo 2: Índices negativos",
				code: `const numeros = [10, 20, 30, 40, 50];

console.log(numeros.slice(-2));     // [40, 50]  (los últimos 2)
console.log(numeros.slice(1, -1));  // [20, 30, 40]`
			},
			{
				titulo: "Ejemplo 3: Clonar un array",
				code: `const original = [1, 2, 3];
const clon = original.slice();

console.log(clon);              // [1, 2, 3]
console.log(clon === original); // false (son arrays distintos)`
			},
			{
				titulo: "Ejemplo 4: Paginación",
				code: `const pagina = 2;
const porPagina = 10;
const inicio = (pagina - 1) * porPagina;

const registros = usuarios.slice(inicio, inicio + porPagina);`
			}
		],
		errores: [
			"**Confundirlo con `splice()`:** `slice()` (con **c** de *copia*) corta y **no** modifica el original; `splice()` (con **p** de *peligro*) cambia el original eliminando, reemplazando o agregando elementos.",
			"**Olvidar que el final no se incluye:** `slice(0, 3)` devuelve los elementos de las posiciones 0, 1 y 2, no la 3.",
			{
				texto: "**Esperar una copia profunda:** si el array contiene objetos, `slice()` copia las *referencias*; modificar un objeto del nuevo array se refleja en el original.",
				code: `const datos = [{ n: 1 }, { n: 2 }];
const copia = datos.slice();
copia[0].n = 99;

console.log(datos[0].n); // 99`
			}
		],
		casos: [
			"**Paginación en tablas:** mostrar la página 2 con `usuarios.slice(10, 20)`.",
			{
				texto: "**Procesamiento de strings:** extraer extensiones o códigos.",
				code: `"archivo.pdf".slice(-4); // ".pdf"`
			},
			"**Seguridad en funciones:** pasar `arr.slice()` a una función para que no altere por accidente tus datos originales."
		],
		relacion: [
			"**`splice()`:** su contraparte destructiva (muta el array).",
			"**`toSpliced()`:** la versión inmutable de `splice()`.",
			"**Inmutabilidad:** igual que `map()` y `filter()`, `slice()` nunca edita la fuente de datos original (clave en React).",
			"**Copia superficial:** copia referencias, no objetos nuevos."
		],
		analogia: "Imagina una **barra de pan de molde**. Usar `slice()` es como tomar un cuchillo y cortar de la tercera a la quinta rebanada para hacerte un sándwich. Tienes las rebanadas en un plato nuevo, pero la barra original sigue igual en su bolsa.",
		fuente: "MDN Web Docs | Array.prototype.slice() y String.prototype.slice()",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve slice()?",
				opciones: [
					"El array original modificado",
					"Un nuevo array con la porción extraída",
					"Los elementos eliminados",
					"La nueva longitud"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve [10, 20, 30, 40, 50].slice(1, 4)?",
				opciones: [
					"[20, 30, 40, 50]",
					"[20, 30, 40]",
					"[10, 20, 30, 40]",
					"[30, 40]"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "En slice(inicio, fin), ¿qué índices se incluyen?",
				opciones: [
					"Ambos",
					"Solo el fin",
					"Inicio inclusivo, fin exclusivo",
					"Inicio exclusivo, fin inclusivo"
				],
				correcta: 2
			},
			{
				id: 4,
				pregunta: "¿Qué devuelve [10, 20, 30, 40, 50].slice(-2)?",
				opciones: [
					"[10, 20]",
					"[40, 50]",
					"[50]",
					"[30, 40]"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Cuál es la diferencia entre slice() y splice()?",
				opciones: [
					"slice() copia sin mutar; splice() muta el array original",
					"Son iguales",
					"slice() muta el array",
					"splice() devuelve una copia sin mutar"
				],
				correcta: 0
			},
			{
				id: 6,
				pregunta: "¿Qué hace arr.slice() sin argumentos?",
				opciones: [
					"Vacía el array",
					"Devuelve una copia superficial del array completo",
					"Lanza un error",
					"Devuelve undefined"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "Si el array contiene objetos y modificas uno del resultado de slice(), ¿qué pasa?",
				opciones: [
					"El original no cambia",
					"El original también cambia, porque se copian las referencias",
					"Lanza un error",
					"Se crea un objeto nuevo automáticamente"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "¿Qué devuelve [1, 2, 3].slice(2, 1)?",
				opciones: [
					"[2]",
					"[3]",
					"[]",
					"[2, 3]"
				],
				correcta: 2
			}
		]
	},
	fill: {
		id: "fill",
		titulo: "Array.prototype.fill()",
		simulador: "utilidad",
		definicion: ["Es un método **mutador** que **rellena** todos los elementos de un array (o solo una parte) con un **valor estático**.", "Modifica el array original y devuelve **ese mismo array** (la misma referencia)."],
		queEs: ["A diferencia de `map()` o `slice()`, `fill()` es **destructivo**: cambia directamente los datos originales.", "Se usa sobre todo para inicializar arrays con valores por defecto o resetear datos de forma masiva, sin escribir un bucle `for`."],
		paraQueSirve: [
			"**Inicializar arrays:** crear una lista de tamaño fijo llena de ceros, strings vacíos o `null`.",
			"**Resetear datos:** restablecer un array a un estado base (ej. un tablero de juego en blanco).",
			"**Enmascarar datos:** ocultar partes de un dato sensible (como los dígitos de una tarjeta, guardados en un array de caracteres)."
		],
		comoFunciona: [
			"Recibe un valor obligatorio y dos parámetros opcionales: **inicio** y **fin**.",
			"Modifica el array **en el lugar** (afecta a la variable original).",
			"**El inicio es inclusivo** y **el fin es exclusivo**; ambos aceptan negativos.",
			"Si no se indican índices, rellena el array completo.",
			"Retorna el mismo array ya modificado."
		],
		sintaxis: [{ code: `arrayOriginal.fill(valor, inicio, fin);` }],
		nota: "**`valor`:** con qué se rellena. **`inicio` (opcional):** por defecto `0`. **`fin` (opcional):** por defecto `array.length`. **Retorno:** el mismo array.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Inicializar un array desde cero",
				code: `// Crear un array de 5 posiciones y llenarlo con 0
const puntuaciones = new Array(5).fill(0);

console.log(puntuaciones); // [0, 0, 0, 0, 0]`
			},
			{
				titulo: "Ejemplo 2: Rellenado parcial",
				code: `const productos = ["Manzana", "Plátano", "Pera", "Naranja", "Uva"];

// Del índice 1 al 4 (el 4 no se incluye)
productos.fill("Agotado", 1, 4);

console.log(productos);
// ["Manzana", "Agotado", "Agotado", "Agotado", "Uva"]`
			},
			{
				titulo: "Ejemplo 3: Tablero de Tres en Raya (Gato)",
				code: `const tablero = new Array(9).fill(null);
console.log(tablero); // [null, null, null, null, null, null, null, null, null]`
			}
		],
		errores: [
			{
				texto: "**El peligro de los objetos (referencia compartida):** si rellenas con un objeto, **todas las posiciones apuntan al mismo objeto** en memoria. Si modificas uno, cambias todos.",
				code: `// ❌ ERROR PELIGROSO
const matriz = new Array(3).fill({ puntos: 0 });
matriz[0].puntos = 5;
console.log(matriz); // [{puntos: 5}, {puntos: 5}, {puntos: 5}]

// ✅ SOLUCIÓN: un objeto nuevo por posición
const segura = Array.from({ length: 3 }, () => ({ puntos: 0 }));`
			},
			{
				texto: "**Olvidar que muta el array original:** si necesitas conservarlo, clónalo antes.",
				code: `const copia = [...original].fill(0);`
			},
			"**Confundir el valor de retorno:** `fill()` no devuelve un array nuevo, devuelve el mismo que modificó."
		],
		casos: [
			"**Tableros de juegos:** ajedrez, buscaminas o tres en raya con casillas vacías (`new Array(9).fill(null)`).",
			"**Enmascarar datos:** `digitos.fill('*', 0, 12)` sobre un array de caracteres para mostrar solo los últimos dígitos.",
			{
				texto: "**Generar rangos numéricos:** combinado con `map`.",
				code: `Array(5).fill(0).map((_, i) => i + 1); // [1, 2, 3, 4, 5]`
			}
		],
		relacion: [
			"**Mutabilidad:** a diferencia de los métodos funcionales puros, `fill()` viola la inmutabilidad porque edita la fuente original.",
			"**`Array.from()`:** alternativa más segura cuando necesitas objetos independientes en cada posición.",
			"**`map()`:** se combina con `fill()` porque `map()` ignora los huecos de un array recién creado."
		],
		analogia: "Imagina una **cubitera para hielo** vacía. Usar `fill()` es abrir el grifo y llenarla por completo (o solo llenar las primeras 3 ranuras). No compras una cubitera nueva: alteras el estado de la que ya tenías sobre la mesa, echando el mismo contenido en cada compartimento.",
		fuente: "MDN Web Docs | Array.prototype.fill()",
		notasPersonales: ["**Truco profesional:** para generar un array del 1 al 5 sin bucle `for`: `Array(5).fill(0).map((_, i) => i + 1)`. El `fill` es necesario porque `map()` ignora las posiciones vacías de un array recién creado."],
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve fill()?",
				opciones: [
					"Un array nuevo",
					"El mismo array modificado",
					"La longitud",
					"undefined"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿fill() modifica el array original?",
				opciones: [
					"No",
					"Sí, es un método mutador",
					"Solo con números",
					"Solo con strings"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Qué crea new Array(5).fill(0)?",
				opciones: [
					"[5]",
					"[0, 0, 0, 0, 0]",
					"Un array con 5 huecos vacíos",
					"[0]"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "En fill(valor, inicio, fin), ¿qué índices se rellenan?",
				opciones: [
					"Ambos incluidos",
					"Inicio inclusivo, fin exclusivo",
					"Inicio exclusivo, fin inclusivo",
					"Solo el inicio"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Qué problema tiene new Array(3).fill({ puntos: 0 })?",
				opciones: [
					"Lanza un error",
					"Las 3 posiciones comparten el mismo objeto (misma referencia)",
					"No rellena nada",
					"Crea 3 objetos independientes"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Cómo creas 3 objetos independientes?",
				opciones: [
					"new Array(3).fill({})",
					"Array.from({ length: 3 }, () => ({ puntos: 0 }))",
					"[{}].fill(3)",
					"Array(3).slice()"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Qué devuelve [1, 2, 3, 4, 5].fill(0, 1, 4)?",
				opciones: [
					"[0, 0, 0, 0, 0]",
					"[1, 0, 0, 0, 5]",
					"[1, 0, 0, 0, 0]",
					"[0, 0, 0, 4, 5]"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "¿Cómo evitas mutar el original al usar fill()?",
				opciones: [
					"No se puede",
					"Clonándolo antes: [...arr].fill(...)",
					"Usando pop()",
					"Usando push()"
				],
				correcta: 1
			}
		]
	},
	with: {
		id: "with",
		titulo: "Array.prototype.with()",
		simulador: "utilidad",
		definicion: ["Es un método de copia que **reemplaza el valor de un elemento en un índice específico** y devuelve un **nuevo array** con el cambio.", "El array original permanece intacto."],
		queEs: ["Es la alternativa **inmutable** y moderna a la asignación por corchetes (`array[indice] = nuevoValor`).", "Pertenece a la familia de métodos de ES2023 que modifican sin mutar la fuente: `toReversed()`, `toSorted()`, `toSpliced()` y `with()`."],
		paraQueSirve: [
			"**Modificaciones seguras:** cambiar un dato específico sin alterar el estado original de la aplicación.",
			"**Frameworks reactivos:** actualizar estados en React, Redux o Vue, donde la inmutabilidad es obligatoria.",
			"**Evitar la clonación manual:** reemplaza copiar con spread (`[...]`) solo para cambiar un elemento."
		],
		comoFunciona: [
			"Recibe dos argumentos: el **índice** a modificar y el **nuevo valor**.",
			"Admite **índices negativos** (`-1` es el último elemento).",
			"Crea una copia superficial (*shallow copy*) del array.",
			"Sustituye el valor en esa posición dentro de la copia.",
			"Devuelve el nuevo array. Si el índice está fuera de rango, lanza `RangeError`."
		],
		sintaxis: [{ code: `const nuevoArray = arrayOriginal.with(indice, nuevoValor);` }],
		nota: "**`indice`:** posición a cambiar (acepta negativos). **`nuevoValor`:** el valor que ocupará esa posición. **Retorno:** un nuevo array.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Modificación básica",
				code: `const meses = ["Enero", "Febrero", "Marzo", "Abril"];

const modificados = meses.with(2, "Mayo");

console.log(modificados); // ["Enero", "Febrero", "Mayo", "Abril"]
console.log(meses);       // ["Enero", "Febrero", "Marzo", "Abril"] (intacto)`
			},
			{
				titulo: "Ejemplo 2: Índices negativos",
				code: `const puntuaciones = [100, 250, 400, 500];

// Modificar el último elemento con -1
const nuevas = puntuaciones.with(-1, 600);

console.log(nuevas); // [100, 250, 400, 600]`
			},
			{
				titulo: "Ejemplo 3: Comparación con la asignación tradicional",
				code: `const a = [1, 2, 3];

// Mutable: cambia el original
a[0] = 99;

// Inmutable: crea uno nuevo
const b = [1, 2, 3].with(0, 99);`
			}
		],
		errores: [
			"**Esperar que el array original cambie:** si haces `miArray.with(0, \"X\")` sin guardar el resultado en una variable, la línea no sirve de nada.",
			{
				texto: "**Índices fuera de rango:** lanza `RangeError` (a diferencia de `at()`, que devuelve `undefined`).",
				code: `[1, 2, 3].with(5, 99); // ❌ RangeError: Invalid index`
			},
			"**Soporte en entornos antiguos:** es una característica de ES2023; en proyectos legacy sin transpilar (Babel) los navegadores viejos no la reconocen.",
			"**Copia superficial:** si el array contiene objetos, `with()` solo cambia la referencia o valor de esa celda; los demás objetos siguen compartidos con el original."
		],
		casos: [{
			texto: "**Gestión de estado en React:** actualizar un elemento de la lista de forma limpia.",
			code: `setTodos(prev => prev.with(index, todoActualizado));`
		}, "**Corrección rápida de datos:** reemplazar un elemento erróneo tras una validación sin riesgo de corromper la lista original."],
		relacion: [
			"**Asignación por corchetes (`arr[i] = v`):** hace lo mismo, pero es **mutable**.",
			"**Inmutabilidad:** `with()` nació para cumplir este principio sin perder legibilidad.",
			"**Métodos hermanos (ES2023):** `toReversed()`, `toSorted()` y `toSpliced()` son las versiones no destructivas de `reverse()`, `sort()` y `splice()`.",
			"**`at()`:** lee un elemento (también acepta negativos); `with()` lo reemplaza en una copia."
		],
		analogia: "Imagina una **fotografía impresa** de tu grupo de amigos donde uno salió con los ojos cerrados. La asignación tradicional (`array[i] = x`) es como pintar con un plumón sobre la foto original. `.with()` es **escanear** la foto, corregir la cara en la computadora e **imprimir una foto nueva**, dejando la original intacta en tu álbum.",
		fuente: "MDN Web Docs | Array.prototype.with() | ECMAScript 2023 (ES14)",
		notasPersonales: ["**¡Ojo!** Al igual que `slice()` y `map()`, la copia es superficial. Si el array contiene objetos y modificas las propiedades de uno que no reemplazaste, la referencia sigue compartida. `with()` solo cambia el valor o la referencia de la celda de nivel superior."],
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve with()?",
				opciones: [
					"El array original modificado",
					"Un nuevo array con el cambio",
					"El elemento reemplazado",
					"La longitud"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿with() modifica el array original?",
				opciones: [
					"Sí",
					"No, permanece intacto",
					"Solo con números",
					"Solo con índices negativos"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Qué devuelve [100, 250, 400, 500].with(-1, 600)?",
				opciones: [
					"[600, 250, 400, 500]",
					"[100, 250, 400, 600]",
					"[100, 250, 600, 500]",
					"Un error"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Qué pasa con [1, 2, 3].with(5, 99)?",
				opciones: [
					"Devuelve [1, 2, 3, undefined, undefined, 99]",
					"Devuelve undefined",
					"Lanza RangeError",
					"Devuelve [1, 2, 3]"
				],
				correcta: 2
			},
			{
				id: 5,
				pregunta: "¿Cuál es la versión mutable equivalente de with()?",
				opciones: [
					"arr[i] = valor",
					"arr.slice(i)",
					"arr.concat(valor)",
					"arr.flat()"
				],
				correcta: 0
			},
			{
				id: 6,
				pregunta: "¿En qué versión de ECMAScript se añadió with()?",
				opciones: [
					"ES5",
					"ES2015",
					"ES2019",
					"ES2023"
				],
				correcta: 3
			},
			{
				id: 7,
				pregunta: "¿Cuál de estos métodos NO pertenece a la misma familia no mutante que with()?",
				opciones: [
					"toSorted()",
					"toReversed()",
					"toSpliced()",
					"push()"
				],
				correcta: 3
			},
			{
				id: 8,
				pregunta: "¿Cómo actualizas un elemento del estado de React con with()?",
				opciones: [
					"setTodos(prev => prev.with(index, nuevo))",
					"setTodos(todos.with)",
					"todos.with(index, nuevo)",
					"setTodos(todos[index] = nuevo)"
				],
				correcta: 0
			}
		]
	},
	from: {
		id: "from",
		titulo: "Array.from()",
		simulador: "utilidad",
		definicion: ["Es un **método estático** de `Array` que crea una **nueva instancia de Array** (copia superficial) a partir de un objeto **iterable** (como un `Set` o un `Map`) o de un objeto **array-like** (con propiedad `length` e índices)."],
		queEs: ["A diferencia de los métodos que se llaman desde una lista existente (`.map()`, `.slice()`), `Array.from()` es un **método de fábrica**: se llama desde el constructor global `Array`.", "Actúa como un puente entre estructuras que \"parecen\" arrays pero no lo son (strings, `Set`, `Map`, `NodeList`) y un array real, para poder usar todos los métodos de array."],
		paraQueSirve: [
			"**Conversión de tipos:** transformar `NodeList`, `String`, `Set` o `Map` en arrays.",
			"**Generación de secuencias:** crear arrays de un tamaño dado con datos dinámicos.",
			"**Transformación al vuelo:** mapear los elementos mientras se convierte, ahorrando un paso."
		],
		comoFunciona: [
			"Recibe un objeto fuente obligatorio (iterable o array-like).",
			"Extrae sus elementos (un iterable entrega sus valores; un array-like se lee por índice hasta `length`).",
			"**Parámetro opcional de mapeo:** un callback como segundo argumento que actúa como un `.map()` sobre cada elemento antes de añadirlo.",
			"Devuelve un array real con los elementos procesados."
		],
		sintaxis: [{ code: `const nuevoArray = Array.from(objetoFuente, function mapFn(elemento, indice) {
  // Transformación opcional
  return nuevoElemento;
});` }, {
			caption: "Con función flecha:",
			code: `const nuevoArray = Array.from(objetoFuente, (elem, i) => elem * 2);`
		}],
		nota: "**Parámetros:** `objetoFuente` (obligatorio), `mapFn` (opcional) y `thisArg` (opcional). **Retorno:** un nuevo `Array` real.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Convertir un String y un Set",
				code: `// String → array de caracteres
console.log(Array.from("Hola")); // ["H", "o", "l", "a"]

// Set → array (elimina duplicados automáticamente)
const miSet = new Set([1, 2, 2, 3]);
console.log(Array.from(miSet));  // [1, 2, 3]`
			},
			{
				titulo: "Ejemplo 2: Generar rangos con la función de mapeo",
				code: `// Del 1 al 5
const rango = Array.from({ length: 5 }, (_, i) => i + 1);
console.log(rango); // [1, 2, 3, 4, 5]`
			},
			{
				titulo: "Ejemplo 3: Objetos independientes (solución al problema de fill)",
				code: `const matriz = Array.from({ length: 3 }, () => ({ puntos: 0 }));

matriz[0].puntos = 5;
console.log(matriz);
// [{puntos: 5}, {puntos: 0}, {puntos: 0}] → no comparten referencia`
			}
		],
		errores: [
			"**Llamarlo desde una instancia:** escribir `miLista.from()` en lugar de `Array.from(miLista)`. Al ser estático, pertenece a la clase global `Array`.",
			{
				texto: "**Olvidar `length` en objetos personalizados:** un objeto plano sin `length` ni iterador devuelve `[]`.",
				code: `// ❌ Devuelve []
Array.from({ a: 1, b: 2 });

// ✅ Correcto
Array.from({ 0: "a", 1: "b", length: 2 }); // ["a", "b"]`
			},
			"**Esperar una copia profunda:** si la fuente contiene objetos, se copian las referencias."
		],
		casos: [
			{
				texto: "**Manipulación del DOM:** convertir el `NodeList` de `querySelectorAll` en un array para usar `filter()` o `reduce()`.",
				code: `const divs = Array.from(document.querySelectorAll("div"));`
			},
			"**Generación de rangos numéricos:** secuencias de números al instante (ej. del 0 al 99).",
			{
				texto: "**Eliminación rápida de duplicados:**",
				code: `const unicos = Array.from(new Set(arrayConDuplicados));`
			}
		],
		relacion: [
			"**`Array.of()`:** usa sus argumentos como elementos; `from` convierte un iterable o array-like.",
			"**`fill()`:** rellena con valores estáticos (y comparte referencias si son objetos); `Array.from()` puede ejecutar una función por cada celda y crear elementos únicos.",
			{
				texto: "**Operador spread (`[...]`):** hace algo muy parecido, pero solo funciona con iterables reales; `Array.from()` también acepta objetos con solo `length`.",
				code: `[...new Set([1, 2])];     // ✅
Array.from({ length: 3 }); // ✅
[...{ length: 3 }];        // ❌ TypeError (no es iterable)`
			}
		],
		analogia: "Imagina un grupo de **personas haciendo fila** en el banco. Tienen orden y cantidad (`length`), pero no son un equipo oficial de fútbol: no tienen los \"superpoderes\" de un array. Usar `Array.from()` es ponerles a todos el mismo uniforme del club. Ya uniformados (convertidos en un array real) pueden jugar el partido con cualquier jugada del manual (los métodos de array).",
		fuente: "MDN Web Docs | Array.from() | ECMAScript 2015 (ES6)",
		notasPersonales: ["**Truco avanzado:** para un rango del 1 al 5 con el segundo parámetro: `Array.from({ length: 5 }, (_, i) => i + 1)`. El guion bajo `_` se usa por convención para indicar que el valor actual no importa, solo el índice `i`."],
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué tipo de método es Array.from()?",
				opciones: [
					"De instancia (Array.prototype)",
					"Estático",
					"Una propiedad",
					"Un getter"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "Array.from(\"Hola\") devuelve...",
				opciones: [
					"[\"Hola\"]",
					"[\"H\", \"o\", \"l\", \"a\"]",
					"\"Hola\"",
					"[]"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Qué devuelve Array.from(new Set([1, 2, 2, 3]))?",
				opciones: [
					"[1, 2, 2, 3]",
					"[1, 2, 3]",
					"[1, 2]",
					"Un Set"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Qué devuelve Array.from({ length: 3 }, (_, i) => i + 1)?",
				opciones: [
					"[0, 1, 2]",
					"[1, 2, 3]",
					"[undefined, undefined, undefined]",
					"[3]"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Qué devuelve Array.from({ a: 1, b: 2 })?",
				opciones: [
					"[1, 2]",
					"[\"a\", \"b\"]",
					"[]",
					"Un error"
				],
				correcta: 2
			},
			{
				id: 6,
				pregunta: "¿Cuál es la ventaja de Array.from({ length: 3 }, () => ({})) frente a new Array(3).fill({})?",
				opciones: [
					"Crea objetos independientes en cada posición",
					"Es más corto",
					"Muta el array original",
					"No tiene ventajas"
				],
				correcta: 0
			},
			{
				id: 7,
				pregunta: "¿Qué puede hacer Array.from() que el spread [...x] no puede?",
				opciones: [
					"Convertir un Set",
					"Convertir un objeto array-like que solo tiene length",
					"Convertir un string",
					"Nada, son idénticos"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "¿Cómo conviertes el resultado de document.querySelectorAll('div') en un array real?",
				opciones: [
					"Array.isArray(lista)",
					"Array.from(lista)",
					"lista.toArray()",
					"lista.join()"
				],
				correcta: 1
			}
		]
	},
	toreversed: {
		id: "toreversed",
		titulo: "Array.prototype.toReversed()",
		simulador: "utilidad",
		definicion: ["Es un método de copia que **invierte el orden de los elementos** de un array y devuelve un **nuevo array** (del último al primero), sin modificar el original.", "Fue introducido en **ECMAScript 2023**."],
		queEs: ["Es la versión **inmutable** del clásico `.reverse()`.", "Mientras `.reverse()` altera el array sobre el que se ejecuta (es destructivo), `.toReversed()` hereda la filosofía funcional y mantiene tus datos originales seguros."],
		paraQueSirve: [
			"**Inversión segura:** cambiar el orden de una lista (ej. del más antiguo al más reciente) sin corromper el estado global.",
			"**Simplificar código:** elimina la combinación `[...array].reverse()` que se usaba solo para no mutar el original.",
			"**Encadenamiento fluido:** al devolver un nuevo array, permite seguir con `.map()` o `.filter()`."
		],
		comoFunciona: [
			"Se invoca sobre un array existente (sin parámetros).",
			"Crea una copia superficial (*shallow copy*).",
			"Invierte las posiciones en la copia: el elemento `0` pasa al final y el `length - 1` pasa al inicio.",
			"Devuelve la nueva lista invertida."
		],
		sintaxis: [{ code: `const nuevoArrayInvertido = arrayOriginal.toReversed();` }],
		nota: "**Parámetros:** ninguno. **Retorno:** un nuevo array con el orden invertido.",
		ejemplos: [{
			titulo: "Ejemplo 1: toReversed() vs. reverse()",
			code: `const numeros = [1, 2, 3, 4];

const invertidos = numeros.toReversed();

console.log(invertidos); // [4, 3, 2, 1]
console.log(numeros);    // [1, 2, 3, 4] (¡intacto!)
// Con numeros.reverse() la variable habría mutado a [4, 3, 2, 1]`
		}, {
			titulo: "Ejemplo 2: Encadenamiento limpio",
			code: `const palabras = ["hola", "mundo", "javascript"];

const resultado = palabras.toReversed().map(p => p.toUpperCase());

console.log(resultado); // ["JAVASCRIPT", "MUNDO", "HOLA"]`
		}],
		errores: [
			"**Esperar mutación del original:** si ejecutas `miArray.toReversed()` sin guardar el resultado, el cambio se pierde.",
			"**Entornos antiguos:** al ser ES2023, falla en navegadores o versiones de Node.js desactualizadas si no hay transpilador (Babel).",
			"**Copia superficial:** si el array contiene objetos, se invierte la posición de los elementos pero los objetos siguen apuntando a la misma referencia."
		],
		casos: ["**Feeds y comentarios:** mostrar las publicaciones en orden cronológico inverso (de las más nuevas a las más viejas) manteniendo el array base en orden secuencial.", "**Interfaces (React / Vue):** reordenar visualmente elementos sin romper la inmutabilidad del estado."],
		relacion: [
			"**`reverse()`:** misma lógica de ordenamiento, pero **mutable**.",
			"**Familia ES2023:** `toSorted()`, `toSpliced()` y `with()` son sus hermanos inmutables.",
			"**Spread `[...arr].reverse()`:** el patrón antiguo que `toReversed()` vuelve obsoleto, siendo más explícito."
		],
		analogia: "Imagina una **pila de libros** ordenados del volumen 1 al 4. El viejo `.reverse()` es desacomodar físicamente tus libros para ponerlos del 4 al 1. `.toReversed()` es tomarle una **fotografía** a la pila, invertir la imagen digital e imprimirla: tu estante físico sigue ordenado como lo dejaste.",
		fuente: "MDN Web Docs | Array.prototype.toReversed() | ECMAScript 2023 (ES14)",
		notasPersonales: ["**Ventaja oculta:** `.reverse()` preserva los huecos vacíos (*sparse arrays*), mientras `.toReversed()` los convierte en `undefined`, lo que da un comportamiento más predecible al iterar después."],
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve toReversed()?",
				opciones: [
					"El mismo array invertido",
					"Un nuevo array invertido",
					"La longitud",
					"undefined"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué le pasa al array original al usar toReversed()?",
				opciones: [
					"Se invierte",
					"Queda intacto",
					"Se vacía",
					"Se ordena"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Cuál era la forma antigua de invertir sin mutar el original?",
				opciones: [
					"[...arr].reverse()",
					"arr.reverse()",
					"arr.sort()",
					"arr.slice(-1)"
				],
				correcta: 0
			},
			{
				id: 4,
				pregunta: "¿Qué parámetros recibe toReversed()?",
				opciones: [
					"Un índice",
					"Un callback",
					"Ninguno",
					"Un separador"
				],
				correcta: 2
			},
			{
				id: 5,
				pregunta: "¿En qué versión de ECMAScript se introdujo toReversed()?",
				opciones: [
					"ES5",
					"ES2015",
					"ES2019",
					"ES2023"
				],
				correcta: 3
			},
			{
				id: 6,
				pregunta: "¿Qué devuelve [1, 2, 3, 4].toReversed()?",
				opciones: [
					"[1, 2, 3, 4]",
					"[4, 3, 2, 1]",
					"[2, 1, 4, 3]",
					"[4]"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Qué hace toReversed() con los huecos vacíos de un array disperso?",
				opciones: [
					"Los conserva como huecos",
					"Los convierte en undefined",
					"Los elimina",
					"Lanza un error"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "¿Qué tipo de copia realiza toReversed()?",
				opciones: [
					"Profunda",
					"Superficial",
					"Ninguna",
					"Depende del contenido"
				],
				correcta: 1
			}
		]
	},
	reverse: {
		id: "reverse",
		titulo: "Array.prototype.reverse()",
		simulador: "utilidad",
		definicion: ["Es un método de `Array.prototype` que **invierte el orden de los elementos** de un array, **modificando el original**.", "Devuelve la **misma referencia** al arreglo ya invertido."],
		queEs: [
			"Es un método heredado de `Array.prototype`.",
			"Forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
			"Es **mutable**: cambia directamente el contenido del array original.",
			"Si necesitas invertir **sin** modificar el original, usa `toReversed()` (ES2023)."
		],
		paraQueSirve: [
			"Invertir el orden de los elementos de un array.",
			"Mostrar datos del último al primero (ej. mensajes del más reciente al más antiguo).",
			"Preparar datos para ciertos algoritmos o presentaciones."
		],
		comoFunciona: [
			"Se llama sobre un array (sin parámetros).",
			"Intercambia el primer elemento con el último, el segundo con el penúltimo, y así sucesivamente hasta el centro.",
			"El array original queda modificado.",
			"Devuelve la misma referencia al array invertido."
		],
		sintaxis: [{ code: `array.reverse();` }],
		nota: "**Parámetros:** ninguno. **Retorno:** el mismo array, ahora con sus elementos en orden inverso.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Invertir un arreglo",
				code: `const numeros = [1, 2, 3, 4];
numeros.reverse();

console.log(numeros); // [4, 3, 2, 1]`
			},
			{
				titulo: "Ejemplo 2: El retorno es la misma referencia",
				code: `const frutas = ["Manzana", "Pera", "Uva"];
const invertido = frutas.reverse();

console.log(frutas);    // ["Uva", "Pera", "Manzana"]
console.log(invertido); // ["Uva", "Pera", "Manzana"]
console.log(frutas === invertido); // true (mismo arreglo)`
			},
			{
				titulo: "Ejemplo 3: Invertir sin modificar el original",
				code: `const numeros = [1, 2, 3];

const copia = [...numeros].reverse(); // con spread
const moderna = numeros.toReversed(); // ES2023

console.log(numeros); // [1, 2, 3]
console.log(copia);   // [3, 2, 1]`
			}
		],
		errores: [
			{
				texto: "**Pensar que crea un nuevo array:** `reverse()` modifica el original.",
				code: `const numeros = [1, 2, 3];
numeros.reverse();
console.log(numeros); // [3, 2, 1]`
			},
			{
				texto: "**Confundir `reverse()` con ordenar de mayor a menor:** solo invierte la posición actual, no ordena.",
				code: `[10, 5, 20].reverse();         // [20, 5, 10]
[10, 5, 20].sort((a, b) => b - a); // [20, 10, 5]`
			},
			"**Mutación en React:** usar `reverse()` directamente sobre el estado muta la referencia original; copia primero con `[...lista].reverse()` o usa `toReversed()`."
		],
		casos: [
			"Mostrar mensajes del más reciente al más antiguo.",
			"Procesar datos desde el final.",
			"Algoritmos que requieren recorrer datos en sentido inverso.",
			"Crear efectos visuales en interfaces."
		],
		relacion: [
			"**`toReversed()`:** devuelve un nuevo array invertido sin modificar el original.",
			"**`sort()`:** ordena los elementos (no solo los invierte).",
			"**Mutabilidad vs. inmutabilidad:** `reverse()` muta; `toReversed()` mantiene intacto el original.",
			"**Spread (`...`):** permite copiar antes de invertir."
		],
		analogia: "Imagina una **fila de personas**: Ana → Luis → Carla → Pedro. `reverse()` es pedirles que se den la vuelta y cambien completamente el orden: Pedro → Carla → Luis → Ana. No se crea una fila nueva; **la misma fila cambia de orden**.",
		fuente: "MDN Web Docs | Array.prototype.reverse() | ECMAScript Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve reverse()?",
				opciones: [
					"Un nuevo array",
					"La misma referencia del array ya invertido",
					"La longitud",
					"undefined"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿reverse() modifica el array original?",
				opciones: [
					"No",
					"Sí, es mutable",
					"Solo con strings",
					"Solo con números"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Qué devuelve [10, 5, 20].reverse()?",
				opciones: [
					"[5, 10, 20]",
					"[20, 10, 5]",
					"[20, 5, 10]",
					"[10, 5, 20]"
				],
				correcta: 2
			},
			{
				id: 4,
				pregunta: "¿reverse() ordena de mayor a menor?",
				opciones: [
					"Sí",
					"No, solo invierte la posición actual",
					"Solo con números",
					"Solo con strings"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "Si const a = [1, 2]; const b = a.reverse(); ¿cuánto vale a === b?",
				opciones: [
					"false",
					"true",
					"undefined",
					"Depende"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Cuál es la alternativa moderna e inmutable a reverse()?",
				opciones: [
					"toReversed()",
					"toSorted()",
					"flat()",
					"fill()"
				],
				correcta: 0
			},
			{
				id: 7,
				pregunta: "¿Cómo inviertes un array sin mutar el original usando spread?",
				opciones: [
					"arr.reverse()",
					"[...arr].reverse()",
					"arr.slice(-1)",
					"arr.concat()"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "¿Qué hace internamente reverse()?",
				opciones: [
					"Intercambia el primer elemento con el último, el segundo con el penúltimo, etc.",
					"Ordena alfabéticamente",
					"Crea una copia y la invierte",
					"Elimina duplicados"
				],
				correcta: 0
			}
		]
	},
	flat: {
		id: "flat",
		titulo: "Array.prototype.flat()",
		simulador: "utilidad",
		definicion: ["Es un método de `Array.prototype` que devuelve **un nuevo arreglo** con los elementos de los subarreglos concatenados hasta una **profundidad** especificada."],
		queEs: [
			"Es un método heredado de `Array.prototype`, parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
			"Es **inmutable**: no modifica el arreglo original.",
			"\"Aplana\" un arreglo anidado, eliminando uno o más niveles de anidación."
		],
		paraQueSirve: [
			"Convertir arreglos anidados en un arreglo más simple.",
			"Reducir niveles de profundidad.",
			"Facilitar el procesamiento de datos antes de recorrerlos o filtrarlos."
		],
		comoFunciona: [
			"Se llama sobre un arreglo, opcionalmente con una **profundidad** (por defecto `1`).",
			"Recorre sus elementos.",
			"Si encuentra un subarreglo, extrae sus elementos según la profundidad indicada.",
			"Devuelve un **nuevo arreglo**; el original permanece sin cambios.",
			"También **elimina los huecos vacíos** (*empty slots*) de los niveles que aplana."
		],
		sintaxis: [{ code: `array.flat();            // profundidad 1
array.flat(profundidad); // profundidad indicada` }],
		nota: "**`profundidad` (opcional):** número de niveles a aplanar; por defecto `1`. Usa `Infinity` para aplanar todo. **Retorno:** un nuevo arreglo aplanado.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Aplanar un nivel",
				code: `const numeros = [1, 2, [3, 4]];
console.log(numeros.flat()); // [1, 2, 3, 4]`
			},
			{
				titulo: "Ejemplo 2: Aplanar dos niveles",
				code: `const datos = [1, [2, [3, 4]]];
console.log(datos.flat(2)); // [1, 2, 3, 4]`
			},
			{
				titulo: "Ejemplo 3: Aplanar completamente",
				code: `const datos = [1, [2, [3, [4, [5]]]]];
console.log(datos.flat(Infinity)); // [1, 2, 3, 4, 5]`
			},
			{
				titulo: "Ejemplo 4: Eliminar espacios vacíos",
				code: `const datos = [1, , 2, [3, , 4]];
console.log(datos.flat()); // [1, 2, 3, 4]`
			}
		],
		errores: [
			{
				texto: "**Pensar que modifica el arreglo original:** devuelve uno nuevo.",
				code: `const numeros = [1, [2, 3]];
numeros.flat();
console.log(numeros); // [1, [2, 3]]`
			},
			{
				texto: "**Creer que aplana todos los niveles por defecto:** solo aplana **un** nivel.",
				code: `[1, [2, [3]]].flat(); // [1, 2, [3]]`
			},
			{
				texto: "**Olvidar guardar el resultado:**",
				code: `const datos = [1, [2, 3]];
datos.flat();               // ❌ el resultado se pierde
const plano = datos.flat(); // ✅`
			},
			"**Confundir `flat()` con `flatMap()`:** `flat()` solo aplana; `flatMap()` primero transforma cada elemento con `map()` y luego aplana un nivel."
		],
		casos: [
			"Procesar datos provenientes de APIs.",
			"Simplificar arreglos anidados.",
			"Preparar datos para `map()`, `filter()` o `reduce()`.",
			"Unir listas contenidas dentro de otras listas."
		],
		relacion: [
			"**`flatMap()`:** combina `map()` y `flat(1)`.",
			"**`map()`:** transforma elementos sin aplanarlos.",
			"**`concat()`:** une arreglos, pero no elimina niveles de anidación automáticamente.",
			"**Inmutabilidad:** devuelve un arreglo nuevo y conserva el original."
		],
		analogia: "Imagina una **caja con otras cajas dentro**. Usar `flat()` es abrir **una capa** de cajas y colocar su contenido en la caja principal. Si hay cajas dentro de cajas, usas una profundidad mayor (`flat(2)`, `flat(3)`) o `flat(Infinity)` para abrirlas todas.",
		fuente: "MDN Web Docs | Array.prototype.flat() | ECMAScript Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Cuál es la profundidad por defecto de flat()?",
				opciones: [
					"0",
					"1",
					"2",
					"Infinity"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve [1, [2, [3]]].flat()?",
				opciones: [
					"[1, 2, 3]",
					"[1, 2, [3]]",
					"[1, [2, 3]]",
					"[[1], 2, 3]"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Cómo aplanas un arreglo con cualquier nivel de anidación?",
				opciones: [
					"flat(0)",
					"flat(-1)",
					"flat(Infinity)",
					"flat(null)"
				],
				correcta: 2
			},
			{
				id: 4,
				pregunta: "¿flat() modifica el arreglo original?",
				opciones: [
					"Sí",
					"No, devuelve uno nuevo",
					"Solo con números",
					"Depende de la profundidad"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Qué hace flat() con los elementos vacíos (empty slots)?",
				opciones: [
					"Los conserva",
					"Los elimina",
					"Los convierte en null",
					"Lanza un error"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Cuál es la diferencia entre flat() y flatMap()?",
				opciones: [
					"flat() solo aplana; flatMap() primero transforma con map() y luego aplana un nivel",
					"Son idénticos",
					"flatMap() aplana todos los niveles",
					"flat() acepta un callback"
				],
				correcta: 0
			},
			{
				id: 7,
				pregunta: "¿Qué devuelve [1, [2, [3, [4]]]].flat(2)?",
				opciones: [
					"[1, 2, 3, 4]",
					"[1, 2, 3, [4]]",
					"[1, 2, [3, [4]]]",
					"[1, [2, 3, 4]]"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "¿Qué devuelve [1, 2, 3].flat()?",
				opciones: [
					"[[1, 2, 3]]",
					"[1, 2, 3] (una copia)",
					"[]",
					"Un error"
				],
				correcta: 1
			}
		]
	},
	copywithin: {
		id: "copywithin",
		titulo: "Array.prototype.copyWithin()",
		simulador: "utilidad",
		definicion: ["Es un método **mutador** que **copia una parte de un array en otra posición del mismo array**, sobrescribiendo lo que haya ahí, **sin cambiar su longitud**.", "Devuelve el mismo array modificado (misma referencia)."],
		queEs: [
			"Permite **mover o duplicar** bloques de elementos dentro de un mismo array de forma eficiente.",
			"Copia una porción (definida por `start` y `end`) y la pega desde la posición `target`, sobrescribiendo los elementos que encuentre.",
			"Es parecido a `splice()`, pero **nunca cambia el `length`**."
		],
		paraQueSirve: [
			"Duplicar secciones del array en otras ubicaciones.",
			"Desplazar elementos sin cambiar la longitud (buffers, ventanas deslizantes).",
			"Implementar algoritmos de rotación o de manipulación de memoria sobre arrays.",
			"Operaciones eficientes sobre `TypedArray` (audio, gráficos, binarios)."
		],
		comoFunciona: [
			"Toma la porción desde `start` hasta `end` (sin incluir `end`).",
			"La pega a partir del índice `target`, sobrescribiendo lo existente.",
			"**Siempre lee los valores originales** (como si primero hiciera una copia temporal), así que las zonas que se solapan se manejan correctamente.",
			"Los índices pueden ser negativos (cuentan desde el final).",
			"Lo que no cabe después de `target` se descarta: la longitud no cambia."
		],
		sintaxis: [{ code: `array.copyWithin(target, start, end);` }],
		nota: "**`target`:** dónde se empieza a pegar. **`start` (opcional):** desde dónde copia (por defecto `0`). **`end` (opcional):** hasta dónde copia, sin incluirlo (por defecto `length`). **Retorno:** el mismo array.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Copiar elementos al principio",
				code: `const arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3);

console.log(arr); // [4, 5, 3, 4, 5]`
			},
			{
				titulo: "Ejemplo 2: Copiar un bloque a otra posición",
				code: `const arr = [1, 2, 3, 4, 5];
arr.copyWithin(2, 0, 2);

console.log(arr); // [1, 2, 1, 2, 5]`
			},
			{
				titulo: "Ejemplo 3: Índices negativos",
				code: `const arr = [1, 2, 3, 4, 5];
arr.copyWithin(-1, -3);

// target = 4, start = 2: solo cabe 1 elemento (el 3)
console.log(arr); // [1, 2, 3, 4, 3]`
			},
			{
				titulo: "Ejemplo 4: Zonas que se solapan",
				code: `const arr = [1, 2, 3, 4, 5];
arr.copyWithin(1, 0, 3);

// Copia [1, 2, 3] sobre los índices 1..3, leyendo los valores originales
console.log(arr); // [1, 1, 2, 3, 5]`
			}
		],
		errores: [
			{
				texto: "**Olvidar que modifica el array original:** no devuelve una copia, devuelve el mismo array.",
				code: `const original = [1, 2, 3, 4, 5];
const nuevo = original.copyWithin(0, 3);

console.log(nuevo === original); // true
console.log(original);           // [4, 5, 3, 4, 5]

// Para no mutar: clona primero
const copia = [...original].copyWithin(0, 3);`
			},
			"**Confundir `start` y `end`:** `end` es **excluyente**. `arr.copyWithin(4, 0, 3)` copia los índices 0, 1 y 2.",
			"**Esperar que cambie el length:** nunca lo hace; lo que no cabe se descarta.",
			"**Confundir `target` con el origen:** `target` es donde se **pega**, `start` es desde donde se **copia**."
		],
		casos: [
			{
				texto: "**Desplazar un buffer a la izquierda** (descartando el primer elemento):",
				code: `buffer.copyWithin(0, 1);
buffer[buffer.length - 1] = 0;`
			},
			"**Procesamiento de audio o gráficos:** mover bloques de muestras en un `Float32Array` o `Uint8Array` sin crear arrays nuevos.",
			"**Algoritmos de rotación o inserción** donde se necesita mover bloques sin reasignar memoria."
		],
		relacion: [
			"**`slice()`:** copia una sección a un **nuevo** array (no modifica el original).",
			"**`splice()`:** agrega o elimina elementos y **sí** cambia la longitud.",
			"**`fill()`:** rellena con un valor fijo, no con elementos existentes.",
			"**`TypedArray.prototype.copyWithin()`:** la misma idea para arrays tipados."
		],
		analogia: "Imagina un **estante con libros**. `copyWithin()` es como **fotocopiar** algunos libros de una sección y **pegar las copias encima** de los de otra sección del mismo estante. El número total de libros no cambia; lo que cambia es qué hay en cada posición.",
		fuente: "MDN Web Docs | Array.prototype.copyWithin() | ECMAScript Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve copyWithin()?",
				opciones: [
					"Un nuevo array",
					"El mismo array modificado",
					"La longitud",
					"Los elementos copiados"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿copyWithin() cambia el length del array?",
				opciones: [
					"Sí, lo aumenta",
					"Sí, lo reduce",
					"No, nunca",
					"Depende de target"
				],
				correcta: 2
			},
			{
				id: 3,
				pregunta: "¿Qué devuelve [1, 2, 3, 4, 5].copyWithin(0, 3)?",
				opciones: [
					"[4, 5, 3, 4, 5]",
					"[1, 2, 3, 4, 5]",
					"[4, 5, 3, 4]",
					"[3, 4, 5, 4, 5]"
				],
				correcta: 0
			},
			{
				id: 4,
				pregunta: "En copyWithin(target, start, end), ¿qué indica target?",
				opciones: [
					"Desde dónde copia",
					"Dónde empieza a pegar",
					"Hasta dónde copia",
					"Cuántos elementos copia"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Qué devuelve [1, 2, 3, 4, 5].copyWithin(2, 0, 2)?",
				opciones: [
					"[1, 2, 1, 2, 5]",
					"[1, 2, 3, 1, 2]",
					"[1, 1, 2, 4, 5]",
					"[1, 2, 1, 2, 3]"
				],
				correcta: 0
			},
			{
				id: 6,
				pregunta: "¿Qué pasa con los elementos que no caben después de target?",
				opciones: [
					"Se agregan al final",
					"Se descartan (el length no cambia)",
					"Lanza un error",
					"Se pegan al inicio"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Cuál es la diferencia entre copyWithin() y slice()?",
				opciones: [
					"copyWithin() muta el mismo array; slice() copia a un array nuevo",
					"Son idénticos",
					"slice() muta el array",
					"copyWithin() devuelve un array nuevo"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "¿Cómo evitas mutar el original al usar copyWithin()?",
				opciones: [
					"No se puede",
					"Clonándolo antes: [...arr].copyWithin(...)",
					"Usando pop()",
					"Usando with()"
				],
				correcta: 1
			}
		]
	},
	entries: {
		id: "entries",
		titulo: "Array.prototype.entries()",
		simulador: "utilidad",
		definicion: ["Es un método que devuelve un **nuevo objeto iterador** que contiene los pares **`[índice, valor]`** de cada elemento del array."],
		queEs: [
			"Permite **iterar un array obteniendo el índice y el valor** de cada elemento a la vez.",
			"Devuelve un **iterador** (no un array) que se recorre con `for...of`, `Array.from()` o el operador spread.",
			"Es **de solo lectura**: no modifica el array original.",
			"Es **perezoso** (*lazy*): genera cada par solo cuando se le pide."
		],
		paraQueSirve: [
			"Iterar obteniendo **índice y valor** simultáneamente.",
			"Crear arrays de pares `[índice, valor]` para procesarlos.",
			"Construir un `Map` o un objeto a partir de un array.",
			"Algoritmos que necesitan conocer la posición del elemento."
		],
		comoFunciona: [
			"Devuelve un objeto **Array Iterator** (implementa los protocolos Iterable e Iterator).",
			"Cada llamada a `next()` entrega `{ value: [indice, valor], done: false }`.",
			"Al terminar entrega `{ value: undefined, done: true }`.",
			"Los huecos de un array disperso se entregan con valor `undefined`.",
			"El iterador **se agota**: no se reinicia solo, hay que crear uno nuevo."
		],
		sintaxis: [{ code: `array.entries();` }, {
			caption: "Uso típico con desestructuración:",
			code: `for (const [indice, valor] of array.entries()) {
  console.log(indice, valor);
}`
		}],
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
// Índice 2: naranja`
			},
			{
				titulo: "Ejemplo 2: Convertir a array de pares",
				code: `const arr = ["a", "b", "c"];

console.log(Array.from(arr.entries())); // [[0, "a"], [1, "b"], [2, "c"]]
console.log([...arr.entries()]);        // lo mismo con spread`
			},
			{
				titulo: "Ejemplo 3: Iterador manual con next()",
				code: `const iter = ["rojo", "verde"].entries();

console.log(iter.next()); // { value: [0, "rojo"], done: false }
console.log(iter.next()); // { value: [1, "verde"], done: false }
console.log(iter.next()); // { value: undefined, done: true }`
			},
			{
				titulo: "Ejemplo 4: Crear un Map",
				code: `const colores = ["rojo", "verde", "azul"];
const mapa = new Map(colores.entries());

console.log(mapa); // Map(3) { 0 => "rojo", 1 => "verde", 2 => "azul" }`
			}
		],
		errores: [
			{
				texto: "**Recorrer dos veces el mismo iterador:** la segunda vez ya está agotado.",
				code: `const iter = [1, 2, 3].entries();
console.log([...iter]); // [[0, 1], [1, 2], [2, 3]]
console.log([...iter]); // [] ← ¡ya se consumió!`
			},
			"**Confundir `Array.entries()` con `Object.entries()`:** el primero devuelve `[índice, valor]` de un array; el segundo devuelve `[clave, valor]` de un objeto.",
			"**Pensar que devuelve un array:** devuelve un iterador. `Array.isArray(arr.entries())` es `false`.",
			{
				texto: "**No usar desestructuración:** funciona, pero es menos legible.",
				code: `// Menos legible
for (const par of arr.entries()) console.log(par[0], par[1]);

// ✅ Mejor
for (const [i, v] of arr.entries()) console.log(i, v);`
			}
		],
		casos: [
			{
				texto: "**Agregar IDs automáticos:**",
				code: `const conIds = [...items.entries()].map(([i, item]) => ({ ...item, id: i + 1 }));`
			},
			{
				texto: "**Filtrar por posición:**",
				code: `const pares = [...numeros.entries()]
  .filter(([i]) => i % 2 === 0)
  .map(([_, valor]) => valor);`
			},
			"**Recorrer matrices** con índices de fila y columna usando `entries()` anidados."
		],
		relacion: [
			"**`keys()`:** iterador solo con los índices.",
			"**`values()`:** iterador solo con los valores.",
			"**`Object.entries()`:** la versión para objetos (`[clave, valor]`).",
			"**`Map`:** puede construirse directamente desde `entries()`.",
			"**`for...of` y `Array.from()`:** las formas de consumir un iterador."
		],
		analogia: "Imagina un **archivo indexado** en una biblioteca. Cada libro tiene una **etiqueta con su número de estante** (índice) y el **contenido del libro** (valor). `entries()` te entrega una tarjeta por cada libro con ambos datos, para que sepas qué hay y exactamente dónde está.",
		fuente: "MDN Web Docs | Array.prototype.entries() | Iteration protocols",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve entries()?",
				opciones: [
					"Un array de pares",
					"Un iterador de pares [índice, valor]",
					"Solo los índices",
					"Solo los valores"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve Array.isArray(arr.entries())?",
				opciones: [
					"true",
					"false",
					"undefined",
					"Un error"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Qué devuelve [...['a', 'b'].entries()]?",
				opciones: [
					"['a', 'b']",
					"[[0, 'a'], [1, 'b']]",
					"[0, 1]",
					"[['a', 0], ['b', 1]]"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Qué pasa si recorres el mismo iterador dos veces con [...iter]?",
				opciones: [
					"Devuelve lo mismo",
					"La segunda vez devuelve [] porque ya se agotó",
					"Lanza un error",
					"Se reinicia solo"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Qué devuelve iter.next() cuando ya recorrió todos los elementos?",
				opciones: [
					"{ value: undefined, done: true }",
					"null",
					"{ value: 0, done: false }",
					"Un error"
				],
				correcta: 0
			},
			{
				id: 6,
				pregunta: "¿Cuál es la diferencia entre Array.entries() y Object.entries()?",
				opciones: [
					"Array devuelve [índice, valor] de un array; Object devuelve [clave, valor] de un objeto",
					"Son idénticos",
					"Object.entries() devuelve un iterador",
					"Array.entries() devuelve claves"
				],
				correcta: 0
			},
			{
				id: 7,
				pregunta: "¿Cómo se recorre normalmente entries() con índice y valor?",
				opciones: [
					"for (const [i, v] of arr.entries())",
					"for (const i in arr.entries())",
					"arr.entries().forEach",
					"arr.entries()[0]"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "¿entries() modifica el array original?",
				opciones: [
					"Sí",
					"No, es de solo lectura",
					"Solo con objetos",
					"Depende del bucle"
				],
				correcta: 1
			}
		]
	},
	keys: {
		id: "keys",
		titulo: "Array.prototype.keys()",
		simulador: "utilidad",
		definicion: ["Es un método que devuelve un **iterador con los índices (posiciones)** de un array."],
		queEs: [
			"Permite recorrer las **posiciones** de un array sin obtener directamente sus valores.",
			"Devuelve un **iterador** (`Array Iterator`), no un array.",
			"Es de solo lectura: no modifica el array original."
		],
		paraQueSirve: [
			"Obtener los índices de un array.",
			"Recorrer posiciones con `for...of`.",
			"Trabajar con índices independientemente de los valores.",
			"Iterar también las posiciones vacías de arrays dispersos (*sparse arrays*)."
		],
		comoFunciona: [
			"Crea un iterador perezoso sobre el array.",
			"Cada llamada a `next()` entrega el siguiente índice: `0, 1, 2...`.",
			"Al terminar entrega `{ value: undefined, done: true }`.",
			"Para obtener un array real, se convierte con `[...iter]` o `Array.from(iter)`."
		],
		sintaxis: [{ code: `array.keys();` }],
		nota: "**Parámetros:** ninguno. **Retorno:** un `Array Iterator` de índices.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Obtener los índices",
				code: `const frutas = ["🍎", "🍌", "🍊"];
const indices = frutas.keys();

console.log([...indices]); // [0, 1, 2]`
			},
			{
				titulo: "Ejemplo 2: Recorrer con for...of",
				code: `const frutas = ["🍎", "🍌", "🍊"];

for (const indice of frutas.keys()) {
  console.log(indice);
}
// 0
// 1
// 2`
			},
			{
				titulo: "Ejemplo 3: Índice y valor accediendo al array",
				code: `for (const indice of frutas.keys()) {
  console.log(indice, frutas[indice]);
}
// 0 🍎
// 1 🍌
// 2 🍊`
			}
		],
		errores: [
			{
				texto: "**Pensar que devuelve los valores:** devuelve **índices**; los valores los entrega `values()`.",
				code: `const frutas = ["🍎", "🍌", "🍊"];
console.log([...frutas.keys()]); // [0, 1, 2]`
			},
			{
				texto: "**Pensar que devuelve un array:** es un iterador.",
				code: `const resultado = frutas.keys();
console.log(Array.isArray(resultado)); // false`
			},
			"**Reutilizar un iterador agotado:** una vez recorrido, hay que llamar de nuevo a `keys()`."
		],
		casos: [
			"Recorrer los índices de un array.",
			"Trabajar con posiciones de elementos.",
			"Iterar arrays mediante `for...of`.",
			"Combinar índices con acceso al array.",
			"Trabajar con arrays dispersos (*sparse arrays*), porque `keys()` también entrega los huecos."
		],
		relacion: [
			"**`values()`:** iterador de los valores.",
			"**`entries()`:** iterador de pares `[índice, valor]`.",
			{
				texto: "**Los tres métodos juntos:**",
				code: `const frutas = ["🍎", "🍌"];

[...frutas.keys()];    // [0, 1]
[...frutas.values()];  // ["🍎", "🍌"]
[...frutas.entries()]; // [[0, "🍎"], [1, "🍌"]]`
			}
		],
		analogia: "Imagina un **edificio**: Piso 0 → 🍎, Piso 1 → 🍌, Piso 2 → 🍊. `keys()` no te dice qué hay en cada piso: te entrega **los números de los pisos** (0, 1, 2).",
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
					"Un booleano"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve [...['a', 'b', 'c'].keys()]?",
				opciones: [
					"['a', 'b', 'c']",
					"[0, 1, 2]",
					"[1, 2, 3]",
					"[[0, 'a'], [1, 'b'], [2, 'c']]"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Qué devuelve Array.isArray(arr.keys())?",
				opciones: [
					"true",
					"false",
					"undefined",
					"Un error"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Qué método devuelve los valores en lugar de los índices?",
				opciones: [
					"keys()",
					"values()",
					"entries()",
					"flat()"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Qué método devuelve pares [índice, valor]?",
				opciones: [
					"keys()",
					"values()",
					"entries()",
					"concat()"
				],
				correcta: 2
			},
			{
				id: 6,
				pregunta: "¿Cómo conviertes el iterador de keys() en un array real?",
				opciones: [
					"arr.keys().toArray()",
					"[...arr.keys()]",
					"arr.keys()[0]",
					"arr.keys.length"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿keys() modifica el array original?",
				opciones: [
					"Sí",
					"No",
					"Solo con números",
					"Depende del bucle"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "Si const frutas = ['🍎', '🍌', '🍊'], ¿qué índices recorre for (const i of frutas.keys())?",
				opciones: [
					"1, 2, 3",
					"0, 1, 2",
					"'🍎', '🍌', '🍊'",
					"Solo el 0"
				],
				correcta: 1
			}
		]
	},
	values: {
		id: "values",
		titulo: "Array.prototype.values()",
		simulador: "utilidad",
		definicion: ["Es un método que devuelve un **iterador con los valores** contenidos en un array."],
		queEs: [
			"Permite recorrer los **elementos/valores** de un array mediante un iterador.",
			"Devuelve un `Array Iterator`, no un array.",
			"Es de solo lectura: no modifica el array original."
		],
		paraQueSirve: [
			"Obtener los valores de un array mediante un iterador.",
			"Recorrer elementos con `for...of`.",
			"Trabajar con los valores sin acceder manualmente mediante índices."
		],
		comoFunciona: [
			"Crea un iterador perezoso sobre el array.",
			"Cada llamada a `next()` entrega el siguiente valor.",
			"Al terminar entrega `{ value: undefined, done: true }`.",
			"Para obtener un array real se convierte con `[...iter]` o `Array.from(iter)`.",
			"`values()` es el iterador por defecto de los arrays: `for (const x of arr)` usa lo mismo internamente."
		],
		sintaxis: [{ code: `array.values();` }],
		nota: "**Parámetros:** ninguno. **Retorno:** un `Array Iterator` de valores.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Obtener los valores",
				code: `const frutas = ["🍎", "🍌", "🍊"];
const valores = frutas.values();

console.log([...valores]); // ["🍎", "🍌", "🍊"]`
			},
			{
				titulo: "Ejemplo 2: Recorrer con for...of",
				code: `for (const fruta of frutas.values()) {
  console.log(fruta);
}
// 🍎
// 🍌
// 🍊`
			},
			{
				titulo: "Ejemplo 3: Comparación con keys()",
				code: `console.log([...frutas.keys()]);   // [0, 1, 2]
console.log([...frutas.values()]); // ["🍎", "🍌", "🍊"]`
			},
			{
				titulo: "Ejemplo 4: Si necesitas índice y valor, usa entries()",
				code: `for (const [indice, fruta] of frutas.entries()) {
  console.log(indice, fruta);
}`
			}
		],
		errores: [
			{
				texto: "**Pensar que devuelve un array:**",
				code: `const resultado = frutas.values();
console.log(Array.isArray(resultado)); // false

// Para convertirlo
const array = [...frutas.values()];`
			},
			"**Confundir `values()` con `keys()`:** `keys()` entrega posiciones; `values()` entrega valores.",
			"**Usar `entries()` cuando solo necesitas los valores:** si no te importa el índice, `values()` (o directamente `for...of` sobre el array) es suficiente."
		],
		casos: [
			"Recorrer los valores de un array.",
			"Utilizar iteradores en general.",
			"Trabajar con `for...of`.",
			"Pasar los valores a operaciones que acepten iterables."
		],
		relacion: [
			"**`keys()`:** iterador de índices.",
			"**`entries()`:** iterador de pares `[índice, valor]`.",
			"**`Object.values()`:** versión para objetos (devuelve un array, no un iterador).",
			"**`for...of`:** consume el iterador de valores de forma directa."
		],
		analogia: "Imagina una **estantería**: Posición 0 → 🍎, Posición 1 → 🍌, Posición 2 → 🍊. `keys()` te dice **dónde están** (0, 1, 2); `values()` te dice **qué hay** (🍎, 🍌, 🍊); `entries()` te da **ambas cosas** ([0, 🍎], [1, 🍌], [2, 🍊]).",
		fuente: "MDN Web Docs | Array.prototype.values()",
		notasPersonales: ["**Para memorizar:** `values()` → **valores del array**."],
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve values()?",
				opciones: [
					"Un array de valores",
					"Un iterador de valores",
					"Un iterador de índices",
					"Un booleano"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve [...['a', 'b'].values()]?",
				opciones: [
					"[0, 1]",
					"['a', 'b']",
					"[[0, 'a'], [1, 'b']]",
					"['b', 'a']"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Qué devuelve Array.isArray(arr.values())?",
				opciones: [
					"true",
					"false",
					"undefined",
					"Un error"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Cuál es la diferencia entre keys() y values()?",
				opciones: [
					"keys() entrega índices; values() entrega valores",
					"Son idénticos",
					"values() entrega índices",
					"keys() entrega pares"
				],
				correcta: 0
			},
			{
				id: 5,
				pregunta: "Si necesitas índice y valor a la vez, ¿qué método usas?",
				opciones: [
					"keys()",
					"values()",
					"entries()",
					"flat()"
				],
				correcta: 2
			},
			{
				id: 6,
				pregunta: "¿Cómo conviertes el iterador de values() en un array real?",
				opciones: [
					"arr.values().toArray()",
					"[...arr.values()]",
					"arr.values()[0]",
					"arr.values.length"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Qué iterador usa por defecto for (const x of arr)?",
				opciones: [
					"keys()",
					"values()",
					"entries()",
					"Ninguno"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "¿values() modifica el array original?",
				opciones: [
					"Sí",
					"No",
					"Solo con strings",
					"Depende del bucle"
				],
				correcta: 1
			}
		]
	}
};
// src/data/metodosMutadores.js
var METODOS_MUTADORES = {
	push: {
		id: "push",
		titulo: "Array.prototype.push()",
		simulador: "mutador",
		definicion: ["Es un método **mutador** integrado en JavaScript que se utiliza para añadir uno o más elementos al **final** de un array.", "Devuelve la **nueva longitud** (el número total de elementos) que tiene el array después de la modificación."],
		queEs: ["Es uno de los métodos más básicos e importantes para la manipulación de arrays.", "A diferencia de los métodos de búsqueda que vimos antes, `push()` es un método **mutador**, lo que significa que modifica directamente el array original sobre el cual se ejecuta."],
		paraQueSirve: ["Sirve para hacer crecer una lista dinámicamente.", "Es el método por excelencia cuando estás recolectando datos secuencialmente, guardando registros en un historial, o agregando elementos a una lista de tareas (To-Do list) a medida que el usuario los introduce."],
		comoFunciona: [
			"Toma los argumentos que le pases (pueden ser números, strings, objetos, u otros arrays).",
			"Los coloca en orden en las posiciones finales del array, asignándoles los nuevos índices correspondientes.",
			"Actualiza internamente la propiedad `.length` del array.",
			"Al terminar la operación, **retorna un número entero** que representa la nueva cantidad de elementos del array."
		],
		sintaxis: [{ code: `// Añadir un solo elemento
array.push(elemento1);

// Añadir múltiples elementos a la vez
array.push(elemento1, elemento2, elementoN);` }],
		ejemplos: [{
			titulo: "Ejemplo 1: Uso básico con tipos primitivos",
			code: `const carrito = ["Laptop", "Mouse"];
const nuevaLongitud = carrito.push("Teclado");

console.log(carrito);       // Resultado: ["Laptop", "Mouse", "Teclado"] (Array modificado)
console.log(nuevaLongitud); // Resultado: 3 (Devuelve la cantidad de elementos)`
		}, {
			titulo: "Ejemplo 2: Añadir múltiples elementos a la vez",
			code: `const numeros = [1, 2];
numeros.push(3, 4, 5);
console.log(numeros); // Resultado: [1, 2, 3, 4, 5]`
		}],
		errores: [{
			texto: "**Confundir el valor de retorno:** Un error clásico de principiante es intentar asignar el resultado de `push()` a una variable esperando el array actualizado.",
			code: `const misNotas = ["Nota 1"];
const misNotasActualizadas = misNotas.push("Nota 2");
console.log(misNotasActualizadas); // Resultado: 2 (¡Es la longitud, no el array!)`
		}, {
			texto: "**Romper la inmutabilidad en React:** En React, nunca debes usar `push()` directamente sobre el estado, porque mutarías el estado original de forma invisible y React no renderizará los cambios.",
			code: `// ❌ INCORRECTO EN REACT:
setNotas(notas.push("Nueva Nota"));

// ✅ CORRECTO EN REACT (Usando Spread Operator para crear un nuevo array):
setNotas([...notas, "Nueva Nota"]);`
		}],
		casos: ["**Acumulación de datos:** Guardar las acciones o logs de un usuario en un array cronológico a medida que ocurren.", "**Algoritmos de estructuras de datos:** Implementar el comportamiento de una estructura tipo Pila (Stack), donde el último en entrar es el primero en salir."],
		relacion: [
			"**`pop()`:** Es su hermano opuesto. Remueve el último elemento del array y lo retorna.",
			"**`unshift()`:** Hace lo mismo que `push()`, pero añade los elementos al principio del array (índice 0), desplazando todos los demás hacia la derecha (lo cual es más costoso en rendimiento).",
			"**Operador Spread (`[...]`):** Es la alternativa inmutable a `push()`. Consigue el mismo resultado visual sin modificar el array original."
		],
		analogia: "Imagina que estás en la fila de un banco. Cuando llega un cliente nuevo, no se mete al principio ni en el medio; por educación, se coloca **al final de la fila**. La fila se vuelve más larga y el contador de personas en espera aumenta en uno. Eso es exactamente lo que hace `push()`.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve push()?",
				opciones: [
					"El array modificado",
					"La nueva longitud del array",
					"El elemento agregado",
					"undefined"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿push() modifica el array original?",
				opciones: [
					"No, crea una copia",
					"Sí, es un método mutador",
					"Solo si contiene números",
					"Depende del navegador"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Dónde añade push() los elementos?",
				opciones: [
					"Al principio",
					"En el medio",
					"Al final",
					"En una posición aleatoria"
				],
				correcta: 2
			},
			{
				id: 4,
				pregunta: "Si const a = [1, 2] y ejecuto a.push(3, 4, 5), ¿cómo queda a?",
				opciones: [
					"[1, 2]",
					"[1, 2, 3, 4, 5]",
					"[3, 4, 5]",
					"[1, 2, [3, 4, 5]]"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Qué pasa con setNotas(notas.push(\"Nueva Nota\")) en React?",
				opciones: [
					"Funciona perfecto",
					"Guarda un número (la longitud) y muta el estado original",
					"Agrega la nota al inicio",
					"Lanza un error de sintaxis"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Cuál es la alternativa inmutable a push() en React?",
				opciones: [
					"pop()",
					"[...notas, \"Nueva Nota\"]",
					"shift()",
					"splice()"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Qué estructura de datos se modela con push() y pop()?",
				opciones: [
					"Pila (Stack, LIFO)",
					"Cola (Queue, FIFO)",
					"Árbol binario",
					"Tabla hash"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "¿Por qué unshift() es más costoso que push()?",
				opciones: [
					"Porque devuelve más datos",
					"Porque debe desplazar todos los elementos existentes",
					"Porque crea una copia del array",
					"Porque usa recursión"
				],
				correcta: 1
			}
		]
	},
	pop: {
		id: "pop",
		titulo: "Array.prototype.pop()",
		simulador: "mutador",
		definicion: ["Es un método **mutador** integrado en JavaScript que se utiliza para eliminar el **último** elemento de un array.", "Modifica el tamaño del array original y devuelve el **elemento exacto que fue eliminado**."],
		queEs: ["Es el hermano opuesto del método `push()`.", "Mientras que `push()` hace crecer el array por el final, `pop()` lo encoge desde el mismo extremo. Al igual que `push()`, pertenece al \"bajo mundo\" de los métodos **mutadores**, ya que altera directamente la estructura y longitud de los datos originales en la memoria."],
		paraQueSirve: ["Sirve para extraer de forma secuencial el elemento más reciente de una lista.", "Se utiliza mucho en algoritmos donde necesitas procesar elementos en orden inverso al que entraron, limpiar un historial paso a paso o implementar mecánicas de \"deshacer\" (Undo)."],
		comoFunciona: [
			"Ubica el último elemento disponible en el array (el que se encuentra en la posición `array.length - 1`).",
			"Remueve físicamente ese elemento del array en la memoria RAM.",
			"Actualiza de manera automática la propiedad `.length`, reduciéndola en 1.",
			"**Retorna el elemento eliminado**. Si el array ya estaba vacío antes de ejecutar el método, no hace nada y devuelve `undefined`."
		],
		sintaxis: [{ code: `// No recibe ningún argumento o parámetro
const elementoRemovido = array.pop();` }],
		ejemplos: [{
			titulo: "Ejemplo 1: Uso básico con extracción de valor",
			code: `const pestañasBrowser = ["Inicio", "Notion", "GitHub"];
const pestañaCerrada = pestañasBrowser.pop();

console.log(pestañasBrowser); // Resultado: ["Inicio", "Notion"] (Arreglo mutado)
console.log(pestañaCerrada);   // Resultado: "GitHub" (El elemento que sacamos)`
		}, {
			titulo: "Ejemplo 2: Ejecución sobre un array vacío",
			code: `const vacio = [];
const resultado = vacio.pop();

console.log(resultado); // Resultado: undefined
console.log(vacio.length); // Resultado: 0`
		}],
		errores: [{
			texto: "**Confundir el valor de retorno con el array modificado:** A diferencia de `push()` (que devuelve la longitud), `pop()` devuelve el objeto o valor extraído. Si intentas guardar el resultado esperando ver el array sin el último elemento, perderás el array.",
			code: `let tareas = ["Diseñar", "Programar"];
tareas = tareas.pop();
console.log(tareas); // Resultado: "Programar" (¡Destruiste el arreglo!)`
		}, {
			texto: "**Mutación involuntaria en React:** Al igual que con `push()`, usar `pop()` directamente sobre una variable de estado en React modificará la dirección de memoria original de manera destructiva sin disparar un nuevo renderizado de la interfaz.",
			code: `// ❌ INCORRECTO EN REACT:
setHistorial(historial.pop());

// ✅ CORRECTO EN REACT (Extraer de forma inmutable usando slicing o filtrado):
setHistorial(historial.slice(0, -1)); // Crea un nuevo array sin el último elemento`
		}],
		casos: ["**Mecánica de Deshacer (Undo):** Guardar los estados de una acción en un array y usar `pop()` para remover el último cambio cuando el usuario presiona Ctrl+Z.", "**Estructuras de Datos (Pilas / Stacks):** Junto con `push()`, permite modelar de forma perfecta el comportamiento *LIFO (Last In, First Out)*, donde el último plato en la pila es el primero que lavas."],
		relacion: [
			"**`push()`:** Añade elementos al final de la estructura.",
			"**`shift()`:** Es el equivalente a `pop()`, pero elimina el **primer** elemento del array (índice 0), obligando a reindexar toda la lista en memoria (más costoso en rendimiento).",
			"**`slice(0, -1)`:** Es la alternativa inmutable si solo deseas obtener una copia del array sin el último elemento, protegiendo el original."
		],
		analogia: "Imagina un tubo vertical lleno de pelotas de tenis. No puedes sacar una pelota del fondo ni del medio sin armar un desastre. La única forma física y natural de vaciar el tubo es quitando **la pelota que está arriba del todo**. Retiras esa pelota, la sostienes en tu mano (valor de retorno) y el tubo ahora tiene una pelota menos. Eso es `pop()`.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve pop()?",
				opciones: [
					"La nueva longitud",
					"El array sin el último elemento",
					"El elemento eliminado",
					"true"
				],
				correcta: 2
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve pop() si el array está vacío?",
				opciones: [
					"null",
					"-1",
					"Un error",
					"undefined"
				],
				correcta: 3
			},
			{
				id: 3,
				pregunta: "¿Qué elemento elimina pop()?",
				opciones: [
					"El primero",
					"El último",
					"El del medio",
					"El que indiques por índice"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "Si hago let tareas = [\"Diseñar\", \"Programar\"]; tareas = tareas.pop(); ¿cuánto vale tareas?",
				opciones: [
					"[\"Diseñar\"]",
					"\"Programar\"",
					"2",
					"undefined"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Cuál es la alternativa inmutable a pop() en React?",
				opciones: [
					"historial.slice(0, -1)",
					"historial.pop()",
					"historial.shift()",
					"historial.push()"
				],
				correcta: 0
			},
			{
				id: 6,
				pregunta: "¿Qué principio modelan juntos push() y pop()?",
				opciones: [
					"FIFO",
					"LIFO",
					"Round Robin",
					"Prioridad"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Por qué pop() es más rápido que shift()?",
				opciones: [
					"No necesita reindexar los demás elementos",
					"Porque no modifica el array",
					"Porque usa menos memoria",
					"Porque es asíncrono"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "¿Qué parámetros recibe pop()?",
				opciones: [
					"Un índice",
					"Un callback",
					"Ninguno",
					"Una cantidad"
				],
				correcta: 2
			}
		]
	},
	shift: {
		id: "shift",
		titulo: "Array.prototype.shift()",
		simulador: "mutador",
		definicion: ["Es un método **mutador** integrado en JavaScript que se utiliza para eliminar el **primer** elemento de un array (el que se encuentra en el índice `0`).", "Modifica el tamaño del array original, desplaza todos los elementos restantes una posición hacia la izquierda y devuelve el **elemento exacto que fue eliminado**."],
		queEs: [
			"Es el equivalente a `pop()`, pero operando en el extremo opuesto del array.",
			"Pertenece al \"bajo mundo\" de los métodos **mutadores**.",
			"Al alterar el índice `0`, obliga a JavaScript a reescribir las posiciones de memoria de todos los demás elementos, lo que lo hace un método más costoso en rendimiento que `pop()`."
		],
		paraQueSirve: ["Sirve para extraer elementos secuencialmente respetando el orden en el que llegaron.", "Es el método fundamental para procesar listas de espera, colas de impresión o flujos de tareas donde el primero en llegar debe ser el primero en ser atendido."],
		comoFunciona: [
			"Ubica el elemento en el índice `0` del array.",
			"Remueve físicamente ese elemento de la memoria RAM.",
			"**Reindexa el array:** Mueve el elemento del índice `1` al `0`, el del `2` al `1`, y así sucesivamente.",
			"Actualiza de manera automática la propiedad `.length`, reduciéndola en 1.",
			"**Retorna el elemento eliminado**. Si el array ya estaba vacío, devuelve `undefined`."
		],
		sintaxis: [{ code: `// No recibe ningún argumento o parámetro
const primerElementoRemovido = array.shift();` }],
		ejemplos: [{
			titulo: "Ejemplo 1: Uso básico con extracción de valor",
			code: `const filaBanco = ["Josue", "Ana", "Hugo"];
const atendido = filaBanco.shift();

console.log(filaBanco); // Resultado: ["Ana", "Hugo"] (Arreglo mutado y reindexado)
console.log(atendido);  // Resultado: "Josue" (El elemento que sacamos del principio)`
		}, {
			titulo: "Ejemplo 2: Ejecución sobre un array vacío",
			code: `const tareas = [];
const resultado = tareas.shift();

console.log(resultado); // Resultado: undefined`
		}],
		errores: ["**Ignorar el costo de rendimiento (Big O):** Usar `shift()` en arrays gigantescos (ej. 100,000 elementos) puede ralentizar tu app, porque la computadora tiene que reescribir 99,999 índices en memoria uno por uno.", {
			texto: "**Mutación involuntaria en React:** Al igual que `pop()` o `push()`, usar `shift()` directamente sobre un estado modificará la dirección de memoria original sin que React se entere, rompiendo el renderizado.",
			code: `// ❌ INCORRECTO EN REACT:
setLista(lista.shift());

// ✅ CORRECTO EN REACT (Extraer de forma inmutable usando destructuring y rest):
const [primerElemento, ...resto] = lista;
setLista(resto); // Pasamos un array nuevo sin el primer elemento`
		}],
		casos: ["**Estructuras de Datos (Colas / Queues):** Junto con `push()`, implementa el comportamiento *FIFO (First In, First Out)*: el primero en entrar es el primero en salir (como la fila del supermercado).", "**Procesamiento de Streams:** Consumir mensajes o eventos de un búfer cronológicamente a medida que el sistema los procesa."],
		relacion: [
			"**`unshift()`:** Su hermano opuesto. Añade elementos al **principio** del array (índice 0) y desplaza el resto a la derecha.",
			"**`pop()`:** Elimina el **último** elemento del array (no requiere reindexar, es más rápido).",
			"**Destructuring / Rest (`const [primero, ...resto] = array`):** La alternativa inmutable moderna para separar el primer elemento sin tocar el array original."
		],
		analogia: "Imagina la cola para entrar a un concierto. La seguridad del evento solo atiende a la persona que está **al principio de la fila** (índice 0). En cuanto esa persona muestra su boleto y entra (valor de retorno), la fila se mueve hacia adelante: el que era el segundo ahora pasa a ser el primero, el tercero pasa a ser el segundo, etc. Eso es `shift()`.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué elemento elimina shift()?",
				opciones: [
					"El último",
					"El primero (índice 0)",
					"Uno aleatorio",
					"Todos"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve shift()?",
				opciones: [
					"La nueva longitud",
					"El array reindexado",
					"El elemento eliminado",
					"Siempre undefined"
				],
				correcta: 2
			},
			{
				id: 3,
				pregunta: "¿Qué comportamiento implementa shift() junto con push()?",
				opciones: [
					"LIFO",
					"FIFO",
					"Ordenamiento",
					"Búsqueda binaria"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Por qué shift() es más costoso que pop()?",
				opciones: [
					"Porque debe reindexar todos los elementos restantes",
					"Porque copia el array",
					"Porque es recursivo",
					"No es más costoso"
				],
				correcta: 0
			},
			{
				id: 5,
				pregunta: "Si const fila = [\"Josue\", \"Ana\", \"Hugo\"] y ejecuto fila.shift(), ¿cómo queda fila?",
				opciones: [
					"[\"Josue\", \"Ana\"]",
					"[\"Ana\", \"Hugo\"]",
					"[\"Josue\"]",
					"[\"Hugo\"]"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Cuál es la alternativa inmutable moderna a shift()?",
				opciones: [
					"const [primero, ...resto] = lista",
					"lista.pop()",
					"lista.push()",
					"lista.sort()"
				],
				correcta: 0
			},
			{
				id: 7,
				pregunta: "¿Qué devuelve shift() sobre un array vacío?",
				opciones: [
					"undefined",
					"0",
					"null",
					"Un error"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "¿Qué método es el hermano opuesto que añade elementos al principio?",
				opciones: [
					"push()",
					"unshift()",
					"pop()",
					"splice()"
				],
				correcta: 1
			}
		]
	},
	unshift: {
		id: "unshift",
		titulo: "Array.prototype.unshift()",
		simulador: "mutador",
		definicion: ["Es un método **mutador** integrado en JavaScript que se utiliza para añadir uno o más elementos al **principio** de un array (en el índice `0`).", "Modifica el tamaño del array original, desplaza todos los elementos existentes hacia la derecha y devuelve la **nueva longitud** del array."],
		queEs: ["Es el hermano opuesto del método `push()`. Mientras que `push()` inyecta elementos al final, `unshift()` los inyecta al inicio de la lista.", "Pertenece al \"bajo mundo\" de los métodos **mutadores**. Al alterar la posición inicial, obliga a JavaScript a desplazar los índices de todos los elementos existentes en memoria, compartiendo el mismo coste de rendimiento que `shift()`."],
		paraQueSirve: ["Sirve para dar prioridad absoluta a los elementos nuevos.", "Se utiliza mucho en sistemas de notificaciones en tiempo real, muros de redes sociales (donde los posts más recientes deben aparecer arriba del todo) o historiales de navegación donde lo último que hiciste encabeza la lista."],
		comoFunciona: [
			"Toma los elementos que le pases como argumentos.",
			"Desplaza todos los elementos que ya estaban en el array hacia la derecha en la memoria RAM (el índice `0` pasa a ser `1`, el `1` pasa a ser `2`, etc.).",
			"Inserta los nuevos elementos en los huecos liberados al principio del array.",
			"Actualiza automáticamente la propiedad `.length`.",
			"**Retorna la nueva longitud del array** (un número entero)."
		],
		sintaxis: [{ code: `// Añadir un solo elemento al inicio
array.unshift(elemento1);

// Añadir múltiples elementos a la vez
array.unshift(elemento1, elemento2, elementoN);` }],
		ejemplos: [{
			titulo: "Ejemplo 1: Uso básico con inyección al principio",
			code: `const notificaciones = ["Mensaje de Ana", "Alerta de Sistema"];
const conteoTotal = notificaciones.unshift("Nuevo correo recibido");

console.log(notificaciones); // Resultado: ["Nuevo correo recibido", "Mensaje de Ana", "Alerta de Sistema"]
console.log(conteoTotal);    // Resultado: 3 (Devuelve la nueva longitud)`
		}, {
			titulo: "Ejemplo 2: Insertar múltiples elementos (mantiene el orden de inserción)",
			code: `const numeros = [3, 4];
numeros.unshift(1, 2);
console.log(numeros); // Resultado: [1, 2, 3, 4]`
		}],
		errores: [
			{
				texto: "**Confundir el valor de retorno:** Al igual que `push()`, `unshift()` devuelve la **longitud** (un número) y no el array modificado.",
				code: `let lista = ["B"];
lista = lista.unshift("A");
console.log(lista); // Resultado: 2 (¡Sobreescribiste tu arreglo con un número!)`
			},
			"**Rendimiento degradado (Big O):** Usar `unshift()` repetidamente dentro de bucles grandes con arreglos de miles de elementos puede ralentizar tu app, ya que la computadora tiene que mover todos los índices hacia la derecha en cada iteración.",
			{
				texto: "**Mutación invisible en React:** Usar `unshift()` sobre un estado mutará la dirección de memoria original de manera destructiva. React no se enterará del cambio y la pantalla no se actualizará.",
				code: `// ❌ INCORRECTO EN REACT:
setMensajes(mensajes.unshift("Nuevo"));

// ✅ CORRECTO EN REACT (Usando Spread Operator de forma inmutable):
setMensajes(["Nuevo", ...mensajes]); // El elemento va al principio del nuevo arreglo`
			}
		],
		casos: ["**Feeds de Noticias / Redes Sociales:** Insertar publicaciones nuevas al principio de la lista para que el usuario las vea inmediatamente sin necesidad de scroll.", "**Historiales Recientes:** Mostrar las últimas búsquedas o los archivos abiertos recientemente ordenados del más nuevo al más antiguo."],
		relacion: [
			"**`push()`:** Añade elementos al **final** del array (operación mucho más rápida ya que no requiere reindexar nada).",
			"**`shift()`:** Remueve el **primer** elemento del array (índice 0).",
			"**Operador Spread (`[\"Nuevo\", ...original]`):** La alternativa inmutable moderna para colocar elementos al principio sin mutar la dirección de memoria original."
		],
		analogia: "Imagina la fila para abordar un avión. De repente, llega un pasajero de Primera Clase (VIP). La tripulación no lo manda al final; lo colocan **al principio de la fila** (índice 0). Para que esto suceda, absolutamente todas las personas que ya estaban formadas tienen que dar un paso hacia atrás (reindexación) para cederle el espacio. La fila ahora es más larga. Eso es `unshift()`.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve unshift()?",
				opciones: [
					"El array modificado",
					"La nueva longitud",
					"El primer elemento",
					"undefined"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Dónde añade unshift() los elementos?",
				opciones: [
					"Al final",
					"Al principio (índice 0)",
					"En el medio",
					"Donde indiques"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "Si const n = [3, 4] y ejecuto n.unshift(1, 2), ¿cómo queda n?",
				opciones: [
					"[3, 4, 1, 2]",
					"[1, 2, 3, 4]",
					"[2, 1, 3, 4]",
					"[1, 2]"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Por qué unshift() degrada el rendimiento en bucles grandes?",
				opciones: [
					"Desplaza todos los índices a la derecha en cada ejecución",
					"Crea muchos arrays nuevos",
					"Es asíncrono",
					"No tiene problemas de rendimiento"
				],
				correcta: 0
			},
			{
				id: 5,
				pregunta: "¿Qué es setMensajes([\"Nuevo\", ...mensajes]) en React?",
				opciones: [
					"Algo incorrecto porque muta el estado",
					"La alternativa inmutable con spread",
					"Lo mismo que push()",
					"Un error de sintaxis"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Cuál es un caso de uso típico de unshift()?",
				opciones: [
					"Feeds y notificaciones donde lo nuevo aparece arriba",
					"Ordenar una lista",
					"Eliminar duplicados",
					"Buscar índices"
				],
				correcta: 0
			},
			{
				id: 7,
				pregunta: "¿Cuál es más rápido en arrays grandes?",
				opciones: [
					"unshift()",
					"push()",
					"Son idénticos",
					"Depende del tipo de dato"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "Si hago let lista = [\"B\"]; lista = lista.unshift(\"A\"); ¿cuánto vale lista?",
				opciones: [
					"[\"A\", \"B\"]",
					"\"A\"",
					"2",
					"1"
				],
				correcta: 2
			}
		]
	},
	splice: {
		id: "splice",
		titulo: "Array.prototype.splice()",
		simulador: "mutador",
		definicion: ["Es un método **mutador** integrado en JavaScript que sirve para **cambiar el contenido de un array** eliminando elementos existentes, reemplazándolos o agregando elementos nuevos en cualquier posición intermedia.", "Modifica el array original y devuelve un **nuevo array con los elementos eliminados**."],
		queEs: [
			"Es la herramienta de manipulación más potente y destructiva del prototipo de arrays.",
			"A diferencia de `push`, `pop`, `shift` o `unshift`, que están limitados a los extremos, `splice()` puede operar en el **medio** del array.",
			"Pertenece al \"bajo mundo\" de los métodos **mutadores**, alterando drásticamente los índices y la estructura de la memoria RAM."
		],
		paraQueSirve: ["Sirve para realizar cirugías precisas en tus datos: eliminar un elemento específico mediante su ID (obtenido previamente con `findIndex`), insertar un ítem en una posición exacta (por ejemplo, mover una canción a un puesto específico en una playlist), o reemplazar datos viejos por nuevos de un solo golpe."],
		comoFunciona: [
			"**Punto de partida:** Recibe un índice de inicio (`start`). Si es negativo, cuenta desde el final del array.",
			"**Corte:** Recibe un segundo parámetro (`deleteCount`) que indica cuántos elementos borrar a partir de ahí.",
			"**Inserción:** Recibe parámetros opcionales adicionales (`item1, item2...`) para insertarlos exactamente en el hueco que se abrió.",
			"**Reindexación:** JavaScript reacomoda automáticamente todos los elementos restantes a la izquierda o derecha en la memoria.",
			"**Retorno:** Devuelve un array con los elementos que fueron removidos (si no se borró ninguno, devuelve `[]`)."
		],
		sintaxis: [{ code: `// array.splice(inicio, cantidadABorrar, item1, item2, ...);

// Caso 1: Solo borrar a partir de una posición
const eliminados = array.splice(indiceInicio, cantidadABorrar);

// Caso 2: Insertar elementos sin borrar nada
array.splice(indiceInicio, 0, 'nuevoItem1', 'nuevoItem2');

// Caso 3: Reemplazar elementos (borrar e insertar en el mismo lugar)
array.splice(indiceInicio, 2, 'reemplazo1', 'reemplazo2');` }],
		ejemplos: [{
			titulo: "Ejemplo 1: Eliminar un elemento específico",
			code: `const tareas = ["Diseñar", "Programar", "Testear"];
// Borrar 1 elemento en el índice 1 ("Programar")
const borradas = tareas.splice(1, 1);

console.log(tareas);   // Resultado: ["Diseñar", "Testear"] (Array mutado)
console.log(borradas); // Resultado: ["Programar"] (Array con el elemento eliminado)`
		}, {
			titulo: "Ejemplo 2: Insertar en medio sin borrar nada",
			code: `const playlist = ["Canción 1", "Canción 3"];
// En el índice 1, borra 0 elementos e inyecta "Canción 2"
playlist.splice(1, 0, "Canción 2");

console.log(playlist); // Resultado: ["Canción 1", "Canción 2", "Canción 3"]`
		}],
		errores: [
			"**Confundir `splice()` con `slice()`:** `splice()` (con **P** de **P**eligro/Mutador) destruye y cambia el array original. `slice()` (con **C** de **C**opia) extrae una porción de forma inmutable sin tocar el original.",
			{
				texto: "**Confundir el valor de retorno:** Pensar que `splice()` devuelve el array modificado. Devuelve los elementos **eliminados en forma de array**.",
				code: `let lista = ["A", "B", "C"];
lista = lista.splice(1, 1);
console.log(lista); // Resultado: ["B"] (¡Te quedaste solo con lo que borraste!)`
			},
			{
				texto: "**Mutación destructiva en React:** Usar `splice()` en un estado altera la referencia original. React no detectará el cambio y no redibujará la UI.",
				code: `// ❌ INCORRECTO EN REACT:
setComponentes(componentes.splice(2, 1));

// ✅ CORRECTO EN REACT (Clonar primero con spread, luego aplicar splice en la copia):
const nuevaLista = [...componentes];
nuevaLista.splice(2, 1);
setComponentes(nuevaLista);`
			}
		],
		casos: ["**Eliminar por índice:** Borrar un registro específico de una tabla tras hacer clic en un botón \"Eliminar\".", "**Sistemas de Arrastrar y Soltar (Drag and Drop):** Remover un elemento de una posición (`splice(origen, 1)`) e insertarlo en su nueva posición (`splice(destino, 0, item)`)."],
		relacion: ["**`toSpliced()` (ES2023):** Es la versión **inmutable** moderna de `splice()`. Hace exactamente lo mismo, pero en lugar de mutar el original, te devuelve un array nuevo ya modificado. ¡Ideal para React!", "**`findIndex()`:** Su compañero ideal. Lo usas para buscar el índice de un objeto por una propiedad interna, y luego le pasas ese índice a `splice()` para removerlo."],
		analogia: "Imagina una libreta con hojas de argollas. Si usas `splice(2, 1, \"Hoja Nueva\")`, vas a la página 3 (índice 2), **arrancas** esa hoja física de la libreta (la guardas en tu mano como valor de retorno) y en ese mismo espacio **enganchas** una hoja nueva. La libreta cambió físicamente su contenido en el medio.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve splice()?",
				opciones: [
					"El array modificado",
					"Un array con los elementos eliminados",
					"La nueva longitud",
					"El primer elemento"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿splice() modifica el array original?",
				opciones: [
					"No",
					"Sí, es un método mutador",
					"Solo al insertar",
					"Solo al borrar"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "Si const t = [\"Diseñar\", \"Programar\", \"Testear\"] y ejecuto t.splice(1, 1), ¿cómo queda t?",
				opciones: [
					"[\"Diseñar\", \"Testear\"]",
					"[\"Programar\"]",
					"[\"Diseñar\", \"Programar\"]",
					"[\"Testear\"]"
				],
				correcta: 0
			},
			{
				id: 4,
				pregunta: "Para insertar elementos sin borrar nada, ¿qué valor va en deleteCount?",
				opciones: [
					"1",
					"-1",
					"0",
					"null"
				],
				correcta: 2
			},
			{
				id: 5,
				pregunta: "¿Qué pasa si el índice start es negativo?",
				opciones: [
					"Lanza un error",
					"Cuenta desde el final del array",
					"Se ignora",
					"Equivale a 0"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Cuál es la diferencia entre splice() y slice()?",
				opciones: [
					"splice() muta el array y slice() devuelve una copia sin tocar el original",
					"Son iguales",
					"slice() muta el array",
					"splice() es inmutable"
				],
				correcta: 0
			},
			{
				id: 7,
				pregunta: "¿Cuál es la versión inmutable moderna de splice()?",
				opciones: [
					"toSpliced()",
					"toSorted()",
					"with()",
					"flat()"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "¿Qué método es el compañero ideal de splice() para obtener el índice a borrar?",
				opciones: [
					"findIndex()",
					"push()",
					"join()",
					"concat()"
				],
				correcta: 0
			}
		]
	},
	tospliced: {
		id: "tospliced",
		titulo: "Array.prototype.toSpliced()",
		simulador: "mutador",
		definicion: ["Es un método **inmutable** integrado en JavaScript (añadido en ECMAScript 2023) que sirve para cambiar el contenido de un array eliminando, reemplazando o agregando elementos en cualquier posición intermedia.", "A diferencia de `splice()`, este método **no modifica el array original**, sino que devuelve un **array completamente nuevo** con los cambios aplicados."],
		queEs: ["Es la versión segura y \"amigable con React\" del clásico `splice()`. Pertenece al \"mundo de la inmutabilidad\".", "En lugar de mutar los datos en la dirección de memoria original, automáticamente reserva un nuevo bloque en la memoria RAM, copia los elementos y aplica la cirugía en el aire, devolviendo la nueva referencia."],
		paraQueSirve: ["Sirve para realizar las mismas cirugías precisas que `splice()` (borrar, insertar o reemplazar en medio de una lista) pero cumpliendo con el principio de **inmutabilidad** por defecto.", "Es ideal para actualizar estados en React, arquitecturas Redux o programación funcional sin necesidad de clonar previamente con el operador spread (`[...]`)."],
		comoFunciona: [
			"**Clonación Implícita:** JavaScript crea automáticamente un nuevo array en una dirección de memoria distinta.",
			"**Corte e Inserción:** Aplica los mismos tres parámetros que ya conoces: `start` (índice donde inicia la operación, acepta negativos), `deleteCount` (opcional: cuántos elementos eliminar) e `item1, item2...` (opcional: elementos a insertar en ese hueco).",
			"**Retorno:** Devuelve el **nuevo array modificado**. El array original permanece intacto en su casilla de memoria."
		],
		sintaxis: [{ code: `// const nuevoArray = array.toSpliced(inicio, cantidadABorrar, item1, item2, ...);

// Caso 1: Borrar elementos de forma inmutable
const listaSinItems = array.toSpliced(indiceInicio, cantidadABorrar);

// Caso 2: Insertar elementos de forma inmutable
const listaConNuevos = array.toSpliced(indiceInicio, 0, 'nuevo1', 'nuevo2');` }],
		ejemplos: [{
			titulo: "Ejemplo 1: Eliminar un elemento en React (Comparativa)",
			code: `const frameworkOriginal = ["Angular", "React", "Vue"];

// Con el toSpliced moderno (ES2023)
const nuevoFrameworks = frameworkOriginal.toSpliced(0, 1);

console.log(frameworkOriginal); // Resultado: ["Angular", "React", "Vue"] (¡A salvo, inmutable!)
console.log(nuevoFrameworks);   // Resultado: ["React", "Vue"] (Nueva dirección de memoria)`
		}, {
			titulo: "Ejemplo 2: Reemplazo masivo en medio del array",
			code: `const numeros = [1, 10, 11, 4];
// En el índice 1, borra 2 elementos e inyecta el 2 y el 3
const secuenciaCorrecta = numeros.toSpliced(1, 2, 2, 3);

console.log(numeros);           // Resultado: [1, 10, 11, 4]
console.log(secuenciaCorrecta); // Resultado: [1, 2, 3, 4]`
		}],
		errores: [{
			texto: "**Confundir el valor de retorno con `splice()`:** Recordar que `splice()` devuelve *lo que borraste*, mientras que `toSpliced()` devuelve *el resultado final de la lista*.",
			code: `const letras = ["A", "B", "C"];
const resultado = letras.toSpliced(1, 1);

console.log(resultado); // Resultado: ["A", "C"] (El array final con la cirugía hecha)
// ¡Si esto hubiera sido .splice(), resultado valdría ["B"]!`
		}, "**Soporte en entornos antiguos (Browsers viejos):** Al ser un método moderno, si trabajas en proyectos legados muy antiguos sin Babel o configuraciones actualizadas de empaquetadores (Vite/Webpack), podría dar un error de `undefined`. En entornos modernos (2026) está totalmente estandarizado."],
		casos: [{
			texto: "**Actualización directa de estados en React:** Modificar listas en el estado de forma limpia y directa.",
			code: `// Modificación inmutable perfecta de un solo golpe:
setTareas(prev => prev.toSpliced(indiceDestino, 1));`
		}, "**Pipelines de datos funcionales:** Transformar arrays encadenando métodos sin alterar la fuente original de la información."],
		relacion: [
			"**`splice()`:** Su hermano destructivo y mutador que altera la memoria RAM original.",
			"**`slice()`:** Extrae fragmentos sin alterar el original, pero no permite realizar inserciones o reemplazos directos en medio como sí lo hace `toSpliced()`.",
			"**Copia Superficial (Shallow Copy):** Al igual que el spread operator, `toSpliced()` hace una copia superficial; si el array contiene objetos, las referencias de los objetos internos siguen apuntando a los mismos casilleros de memoria."
		],
		analogia: "Imagina que tienes una fotografía impresa. En lugar de agarrar unas tijeras y pegamento para recortar y alterar la foto original físicamente (`splice`), le tomas una fotocopia digital exacta, usas un software de edición en la pantalla para quitar o poner una persona en el medio, e imprimes una **foto completamente nueva** (`toSpliced`). Tienes dos fotos físicas separadas y la original no sufrió ningún daño.",
		fuente: "MDN Web Docs | ECMAScript 2023 Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve toSpliced()?",
				opciones: [
					"Los elementos eliminados",
					"Un nuevo array con los cambios aplicados",
					"La nueva longitud",
					"undefined"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿toSpliced() modifica el array original?",
				opciones: [
					"Sí",
					"No, permanece intacto",
					"Solo al insertar",
					"Solo si contiene objetos"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿En qué versión de ECMAScript se añadió toSpliced()?",
				opciones: [
					"ES5",
					"ES2015",
					"ES2023",
					"ES2010"
				],
				correcta: 2
			},
			{
				id: 4,
				pregunta: "Si const letras = [\"A\", \"B\", \"C\"], ¿qué devuelve letras.toSpliced(1, 1)?",
				opciones: [
					"[\"B\"]",
					"[\"A\", \"C\"]",
					"[\"A\", \"B\"]",
					"[\"C\"]"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Qué tipo de copia realiza toSpliced()?",
				opciones: [
					"Profunda (deep copy)",
					"Superficial (shallow copy)",
					"No copia nada",
					"Solo copia las referencias de los objetos"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Qué ventaja tiene toSpliced() frente a splice() en React?",
				opciones: [
					"Evita tener que clonar manualmente con spread antes de modificar",
					"Es siempre más rápido",
					"Funciona en navegadores muy antiguos",
					"Devuelve los elementos eliminados"
				],
				correcta: 0
			},
			{
				id: 7,
				pregunta: "Si const numeros = [1, 10, 11, 4], ¿qué devuelve numeros.toSpliced(1, 2, 2, 3)?",
				opciones: [
					"[1, 2, 3, 4]",
					"[1, 10, 11, 4]",
					"[2, 3]",
					"[1, 2, 3, 10, 11, 4]"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "¿Qué puede hacer toSpliced() que slice() no puede?",
				opciones: [
					"Insertar o reemplazar elementos en medio del array",
					"Copiar un fragmento",
					"No mutar el original",
					"Aceptar índices negativos"
				],
				correcta: 0
			}
		]
	},
	sort: {
		id: "sort",
		titulo: "Array.prototype.sort()",
		simulador: "mutador",
		comoFuncionaSinNumerar: true,
		definicion: ["Es un método incorporado en el prototipo de los arreglos (`Array`) en JavaScript que ordena los elementos de un arreglo **en el mismo lugar** (mutando el arreglo original) y devuelve el arreglo ordenado."],
		queEs: [
			"Es un método de orden superior que permite organizar los elementos de una colección de datos.",
			"Por defecto, el ordenamiento es **alfabético y ascendente**, basado en el valor Unicode de los caracteres.",
			"Para realizar ordenamientos numéricos o personalizados, requiere que se le pase una **función de comparación** como argumento."
		],
		paraQueSirve: [
			"Ordenar strings alfabéticamente (con o sin sensibilidad a mayúsculas/acentos).",
			"Ordenar números de menor a mayor (o viceversa).",
			"Ordenar un arreglo de objetos basándose en el valor de una de sus propiedades (por ejemplo, ordenar usuarios por edad o productos por precio)."
		],
		comoFunciona: [
			"**Muta el arreglo original:** No crea una copia; modifica los elementos dentro del arreglo sobre el cual se invoca.",
			"**Conversión a String por defecto:** Si no se proporciona una función de comparación, `sort()` convierte todos los elementos que no sean `undefined` a cadenas de texto (`strings`) y los compara según su posición en el estándar Unicode.",
			"**Tratamiento de `undefined`:** Todos los elementos `undefined` se mueven automáticamente al final del arreglo, y no se pasan a la función de comparación.",
			"**Algoritmo interno:** Los motores modernos (como V8 de Chrome/Node.js) utilizan algoritmos de ordenamiento **estables** (como *Timsort*), garantizando que los elementos con valores idénticos mantengan su orden relativo original."
		],
		sintaxis: [{ code: `arreglo.sort(function comparar(primerElemento, segundoElemento){
  // Tu lógica de comparación aquí
});` }],
		nota: "**Parámetro `comparar` (opcional):** función que define el orden y debe retornar un número. **Negativo (< 0):** `primerElemento` va antes que `segundoElemento`. **Cero (0):** se mantiene el orden original entre ellos (en motores estables). **Positivo (> 0):** `segundoElemento` va antes que `primerElemento`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: El comportamiento por defecto (Strings)",
				code: `const frutas = ['plátano', 'manzana', 'cereza'];
frutas.sort();

console.log(frutas); // Salida: ['cereza', 'manzana', 'plátano']`
			},
			{
				titulo: "Ejemplo 2: Ordenar números (Requiere función de comparación)",
				descripcion: "Para ordenar números de forma ascendente, restamos el segundo del primero: `a - b`.",
				code: `const numeros = [10, 5, 80, 2];

// Orden ascendente
numeros.sort((a, b) => a - b);
console.log(numeros); // Salida: [2, 5, 10, 80]

// Orden descendente
numeros.sort((a, b) => b - a);
console.log(numeros); // Salida: [80, 10, 5, 2]`
			},
			{
				titulo: "Ejemplo 3: Ordenar objetos por propiedad",
				code: `const usuarios = [
  { nombre: 'Sofía', edad: 28 },
  { nombre: 'Lucas', edad: 22 },
  { nombre: 'Ana', edad: 35 }
];

// Ordenar por edad de menor a mayor
usuarios.sort((a, b) => a.edad - b.edad);

console.log(usuarios);
// Salida: Lucas (22), Sofía (28), Ana (35)`
			}
		],
		errores: [{
			texto: "**Ordenar números sin función de comparación:** Es el error más clásico de JavaScript.",
			code: `const numeros = [10, 5, 80, 2];
numeros.sort();
console.log(numeros); // ❌ Salida: [10, 2, 5, 80]`,
			nota: "*¿Por qué pasa?* Porque convierte los números a texto. En orden alfabético, `\"10\"` va antes que `\"2\"`, de la misma forma que `\"Abel\"` va antes que `\"Belén\"`."
		}, {
			texto: "**Olvidar que muta el arreglo original:**",
			code: `const original = [3, 1, 2];
const ordenado = original.sort();

// ❌ ¡Ambos arreglos ahora están ordenados [1, 2, 3]!
console.log(original); // [1, 2, 3]`,
			nota: "*Solución:* Si necesitas mantener el original intacto, haz una copia antes de ordenar usando el operador spread: `const ordenado = [...original].sort();` o utiliza el método moderno `.toSorted()`."
		}],
		casos: ["**Tablas interactivas de datos:** Permitir al usuario ordenar columnas (por precio, fecha, orden alfabético).", "**Rankings o Leaderboards:** Mostrar listas de puntuaciones máximas de manera descendente en un videojuego o aplicación financiera."],
		relacion: ["**`sort()` vs `toSorted()`:** Introducido en especificaciones recientes de ECMAScript, **`toSorted()`** hace exactamente lo mismo que `sort()`, pero **no muta** el arreglo original; en su lugar, devuelve una nueva copia ordenada. Es la alternativa ideal para evitar mutaciones accidentales.", {
			texto: "**`localeCompare()`:** Para ordenar strings con caracteres especiales, tildes o eñes de forma correcta según el idioma, se debe combinar `sort()` con `localeCompare()`:",
			code: `const nombres = ['Álvaro', 'Zapato', 'Ángel'];
nombres.sort((a, b) => a.localeCompare(b, 'es'));
// Salida correcta: ['Álvaro', 'Ángel', 'Zapato']`
		}],
		analogia: "Imagina que eres un **organizador de libros** en una biblioteca escolar. Si no te dan instrucciones (sin función de comparación), tu instinto por defecto es ordenarlos estrictamente por su título alfabético (empezando por la primera letra, luego la segunda, etc.). Si el director te pide ordenarlos por \"año de publicación\" o por \"grosor del libro\", te está dando una **función de comparación personalizada** para que dejes de mirar las letras del título y compares activamente dos libros basándote en un criterio diferente.",
		fuente: "MDN Web Docs | ECMAScript 2026 Language Specification",
		notasPersonales: ["**Atajo mental:** Grábate a fuego esta fórmula para números: `(a, b) => a - b` ordena de **menor a mayor** (Ascendente). Si quieres lo contrario, simplemente invierte el orden de la resta: `(a, b) => b - a` (Descendente). No intentes reinventar la rueda con condicionales `if (a > b)` a menos que sea estrictamente necesario."],
		quiz: [
			{
				id: 1,
				pregunta: "¿Cuál es el orden por defecto de sort() sin función de comparación?",
				opciones: [
					"Numérico ascendente",
					"Alfabético ascendente por Unicode (convierte a strings)",
					"Descendente",
					"Aleatorio"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve [10, 5, 80, 2].sort()?",
				opciones: [
					"[2, 5, 10, 80]",
					"[10, 2, 5, 80]",
					"[80, 10, 5, 2]",
					"[10, 5, 80, 2]"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Qué función de comparación ordena números de menor a mayor?",
				opciones: [
					"(a, b) => b - a",
					"(a, b) => a - b",
					"(a, b) => a + b",
					"No hace falta ninguna"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿sort() modifica el array original?",
				opciones: [
					"No, trabaja con una copia",
					"Sí, y devuelve el mismo array ordenado",
					"Solo con strings",
					"Solo con objetos"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Qué hace sort() con los elementos undefined?",
				opciones: [
					"Los pone al principio",
					"Los mueve al final sin pasarlos a la función de comparación",
					"Los elimina",
					"Los convierte en 0"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "Si la función de comparación devuelve un valor negativo, ¿qué significa?",
				opciones: [
					"primerElemento va antes que segundoElemento",
					"segundoElemento va antes que primerElemento",
					"Se mantiene el orden",
					"Se produce un error"
				],
				correcta: 0
			},
			{
				id: 7,
				pregunta: "¿Qué método se combina con sort() para ordenar bien tildes y eñes?",
				opciones: [
					"localeCompare()",
					"push()",
					"includes()",
					"Math.max()"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "¿Cuál es la alternativa moderna a sort() que no muta el original?",
				opciones: [
					"toSorted()",
					"reverse()",
					"splice()",
					"flat()"
				],
				correcta: 0
			}
		]
	},
	tosorted: {
		id: "tosorted",
		titulo: "Array.prototype.toSorted()",
		simulador: "mutador",
		comoFuncionaSinNumerar: true,
		definicion: ["Es un método incorporado en el prototipo de los arreglos (`Array`) en JavaScript que devuelve un **nuevo arreglo** con los elementos ordenados en orden ascendente, manteniendo el arreglo original **completamente intacto** (sin mutaciones)."],
		queEs: ["Introducido formalmente en la especificación ECMAScript 2023, `toSorted()` es la versión **no mutante** (pura) del clásico método `Array.prototype.sort()`.", "Sigue la filosofía moderna de la programación funcional, donde se prioriza la inmutabilidad de los datos para evitar efectos secundarios imprevistos en la aplicación."],
		paraQueSirve: [
			"Aplicaciones basadas en arquitecturas de estado predecibles (como React, Redux o librerías de gestión de estado).",
			"Flujos de datos donde el arreglo original se necesita conservar en su orden de creación o de base de datos.",
			"Evitar tener que clonar manualmente arreglos antes de ordenarlos (ej. `[...arr].sort()`)."
		],
		comoFunciona: [
			"**Copia implícita:** Internamente, realiza una copia superficial (*shallow copy*) del arreglo original.",
			"**Ordenamiento:** Aplica el mismo algoritmo de ordenamiento estable que `sort()` sobre la copia.",
			"**Retorno:** Devuelve el nuevo arreglo ordenado.",
			"**Comportamiento por defecto:** Al igual que `sort()`, si no se le proporciona una función de comparación, convierte los elementos a cadenas de texto (`strings`) y los ordena según su valor Unicode. Los elementos `undefined` se envían al final."
		],
		sintaxis: [{ code: `const nuevoArregloOrdenado = arregloOriginal.toSorted(function comparar(primerElemento, segundoElemento){
  // Tu lógica de comparación aquí
});` }],
		nota: "**Parámetro `comparar` (opcional):** la misma función de comparación utilizada en `.sort()`. Debe retornar un número negativo, cero, o un número positivo para determinar el orden de precedencia.",
		ejemplos: [{
			titulo: "Ejemplo 1: Comparativa básica con sort() (Inmutabilidad)",
			descripcion: "Observa cómo el arreglo original no se ve afectado al usar `toSorted()`:",
			code: `const meses = ['Marzo', 'Enero', 'Diciembre'];

// Ordenamos sin modificar el original
const mesesOrdenados = meses.toSorted();

console.log(meses);          // Salida: ['Marzo', 'Enero', 'Diciembre'] (¡Intacto!)
console.log(mesesOrdenados); // Salida: ['Diciembre', 'Enero', 'Marzo']`
		}, {
			titulo: "Ejemplo 2: Ordenamiento numérico ascendente",
			code: `const calificaciones = [10, 5, 8, 3, 9];

const ordenadas = calificaciones.toSorted((a, b) => a - b);

console.log(calificaciones); // Salida: [10, 5, 8, 3, 9] (Original intacto)
console.log(ordenadas);      // Salida: [3, 5, 8, 9, 10]`
		}],
		errores: [{
			texto: "**Esperar una copia profunda (*Deep Copy*):** Al igual que la mayoría de métodos de copia en JS, `toSorted()` realiza una copia superficial. Si el arreglo contiene objetos anidados, las referencias a esos objetos internos seguirán siendo las mismas.",
			code: `const usuarios = [{ nombre: 'Ana', config: { activo: true } }];
const ordenados = usuarios.toSorted();

// Modificar un objeto anidado en el nuevo arreglo afectará también al original
ordenados[0].config.activo = false;
console.log(usuarios[0].config.activo); // ❌ false`
		}, {
			texto: "**Olvidar que hereda las reglas de conversión a texto de `sort()`:** Si no pasas una función comparadora para números, cometerás el mismo error de ordenación que con `sort()`.",
			code: `const numeros = [10, 5, 80, 2];
console.log(numeros.toSorted()); // ❌ Salida: [10, 2, 5, 80]`
		}],
		casos: ["**Visualización en interfaces de usuario (React/Vue):** Cuando tienes un estado que contiene una lista de productos y el usuario selecciona \"ordenar por menor precio\", puedes renderizar `productos.toSorted((a, b) => a.precio - b.precio)` directamente sin alterar el estado original de la aplicación.", {
			texto: "**Pipelines de datos limpios:** Encadenar métodos de arreglos de manera segura:",
			code: `const nombresFiltradosYOrdenados = nombres
  .filter(n => n.startsWith('A'))
  .toSorted(); // No muta nada en el camino`
		}],
		relacion: ["**`toSorted()` vs `[...arr].sort()`:** Antes de existir `toSorted()`, la forma estándar de no mutar el original era escribir `const copia = [...original].sort()`. `toSorted()` elimina este \"truco\" o *workaround*, haciendo el código mucho más legible, expresivo y semántico.", "**Familia \"to\" en JS moderno:** `toSorted()` forma parte de un grupo de métodos no mutantes que llegaron juntos a JavaScript: `toReversed()` (versión no mutante de `reverse()`), `toSpliced()` (versión no mutante de `splice()`) y `with()` (reemplaza un elemento en un índice específico de forma no mutante)."],
		analogia: "Imagina que tienes una **hoja de papel original** con una lista de nombres desordenados. Usar `.sort()` es como borrar y reescribir sobre esa misma hoja para ordenarla: la lista original desaparece para siempre. Usar `.toSorted()` es como **sacarle una fotocopia** a la hoja, sentarte en tu escritorio a ordenar los nombres en la copia y entregársela a tu jefe. Conservas tu hoja original impecable en tu carpeta por si la necesitas después.",
		fuente: "MDN Web Docs | ECMAScript 2026 Language Specification",
		notasPersonales: ["**Consejo de compatibilidad:** Aunque `toSorted()` es ampliamente compatible en navegadores modernos y entornos de Node.js (desde Node 20+), si estás trabajando en un proyecto antiguo o con soporte para navegadores muy viejos sin transpiladores (como Babel), es posible que necesites un *polyfill* o seguir usando el clásico `[...arreglo].sort()`. Para proyectos modernos, ¡conviértelo en tu estándar predeterminado!"],
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve toSorted()?",
				opciones: [
					"El mismo array ordenado",
					"Un nuevo array ordenado",
					"La longitud del array",
					"undefined"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué le pasa al array original al usar toSorted()?",
				opciones: [
					"Queda ordenado",
					"Queda intacto",
					"Se vacía",
					"Se invierte"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Cuál era la forma antigua de ordenar sin mutar el original?",
				opciones: [
					"[...arr].sort()",
					"arr.reverse()",
					"arr.slice(0, -1)",
					"arr.concat()"
				],
				correcta: 0
			},
			{
				id: 4,
				pregunta: "¿Qué devuelve [10, 5, 80, 2].toSorted() sin función de comparación?",
				opciones: [
					"[2, 5, 10, 80]",
					"[10, 2, 5, 80]",
					"[80, 10, 5, 2]",
					"Lanza un error"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Qué tipo de copia realiza toSorted()?",
				opciones: [
					"Superficial (shallow copy)",
					"Profunda (deep copy)",
					"Ninguna",
					"Depende del contenido"
				],
				correcta: 0
			},
			{
				id: 6,
				pregunta: "¿En qué versión de ECMAScript se introdujo toSorted()?",
				opciones: [
					"ES2015",
					"ES2023",
					"ES2018",
					"ES2010"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Cuál de estos métodos pertenece a la misma familia no mutante que toSorted()?",
				opciones: [
					"toReversed()",
					"reverse()",
					"push()",
					"pop()"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "¿Cuál es un caso de uso ideal para toSorted()?",
				opciones: [
					"Mostrar una lista ordenada en React sin alterar el estado original",
					"Eliminar elementos del estado",
					"Agregar elementos al final",
					"Buscar índices"
				],
				correcta: 0
			}
		]
	}
};
// src/data/metodosUtilidades.js
var METODOS_UTILIDADES = {
	of: {
		id: "of",
		titulo: "Array.of()",
		simulador: "utilidad",
		definicion: ["Es un **método estático** de `Array` que crea un nuevo array utilizando los argumentos que recibe como elementos.", "Devuelve un **nuevo array**; no modifica nada existente."],
		queEs: [
			"Piensa en él como una forma directa de decir: *convierte estos valores en un array*.",
			"Al ser estático, se llama desde el constructor global (`Array.of(...)`) y no desde una instancia.",
			"Existe para evitar el comportamiento especial de `new Array()` cuando recibe **un solo número**."
		],
		paraQueSirve: [
			"Crear arrays a partir de uno o varios valores individuales.",
			"Evitar la ambigüedad entre `new Array(5)` (5 huecos vacíos) y `Array.of(5)` (el array `[5]`).",
			"Trabajar de forma predecible con la API de `Array`, por ejemplo al extender la clase `Array`."
		],
		comoFunciona: [
			"Recibe **cero o más argumentos** de cualquier tipo (números, strings, objetos, `null`...).",
			"Cada argumento se convierte en un elemento del nuevo array, respetando el orden.",
			"La propiedad `length` queda igual a la cantidad de argumentos.",
			"Retorna el nuevo array. Sin argumentos retorna `[]`."
		],
		sintaxis: [{ code: `const nuevo = Array.of(elemento0, elemento1, ..., elementoN);` }, {
			caption: "Puede recibir cero, uno o varios argumentos:",
			code: `Array.of();         // []
Array.of(10);       // [10]
Array.of(10, 20);   // [10, 20]`
		}],
		nota: "**Parámetros:** cero o más argumentos. **Retorno:** un nuevo objeto `Array`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Varios valores",
				code: `const numeros = Array.of(10, 20, 30);
console.log(numeros); // [10, 20, 30]`
			},
			{
				titulo: "Ejemplo 2: Un solo número (el ejemplo clave)",
				code: `console.log(Array.of(5));  // [5]  -> 5 es un ELEMENTO
console.log(new Array(5)); // [ <5 empty items> ] -> 5 es la LONGITUD`
			},
			{
				titulo: "Ejemplo 3: Sin argumentos",
				code: `console.log(Array.of()); // []`
			},
			{
				titulo: "Ejemplo 4: Diferentes tipos",
				code: `const datos = Array.of(25, "Josue", true, null);
console.log(datos); // [25, "Josue", true, null]`
			}
		],
		errores: [{
			texto: "**Confundir `Array.of()` con `Array.from()`:** `of` usa sus argumentos como elementos; `from` convierte un iterable o array-like.",
			code: `Array.of(1, 2, 3);     // [1, 2, 3]
Array.from("Hola");    // ["H", "o", "l", "a"]
Array.of("Hola");      // ["Hola"]`
		}, {
			texto: "**Creer que `Array.of(5)` crea un array de longitud 5:** crea `[5]`. Para una longitud fija usa `new Array(5)` o `Array(5).fill(0)`.",
			code: `Array.of(5).length;   // 1
new Array(5).length;  // 5`
		}],
		casos: [
			{
				texto: "**Funciones que reciben valores sueltos:**",
				code: `function crearLista(...valores) {
  return Array.of(...valores);
}
crearLista("A", "B", "C"); // ["A", "B", "C"]`
			},
			"**Subclases de `Array`:** `MiArray.of(...)` crea una instancia de la subclase, algo que un literal `[...]` no hace.",
			"**Código genérico:** cuando quieres que cada argumento sea un elemento sin importar su tipo ni su cantidad."
		],
		relacion: [
			"**`Array.from()`:** crea un array desde un iterable o array-like (strings, `Set`, `NodeList`).",
			"**`new Array()`:** el constructor. Con un único número lo interpreta como longitud.",
			"**Literal `[...]`:** casi siempre es suficiente. `Array.of()` destaca cuando trabajas con la API de `Array` o con subclases."
		],
		analogia: "Imagina una caja. Con `Array.of(5)` le dices: **\"mete el número 5 dentro de la caja\"** y obtienes `[5]`. Con `new Array(5)` le dices: **\"hazme una caja con espacio para 5 elementos\"** y obtienes 5 casilleros vacíos. Por eso `Array.of()` es más predecible: cada argumento es un elemento.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: ["**Regla para memorizar:** `of` significa *de estos valores*. `Array.of(A, B, C)` da `[A, B, C]`, siempre."],
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve Array.of(5)?",
				opciones: [
					"[5]",
					"Un array con 5 huecos vacíos",
					"5",
					"undefined"
				],
				correcta: 0
			},
			{
				id: 2,
				pregunta: "¿Qué crea new Array(5)?",
				opciones: [
					"[5]",
					"Un array de longitud 5 con huecos vacíos",
					"Un error",
					"[0, 0, 0, 0, 0]"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Qué tipo de método es Array.of()?",
				opciones: [
					"De instancia (Array.prototype)",
					"Estático",
					"Una propiedad",
					"Un getter"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Qué devuelve Array.of() sin argumentos?",
				opciones: [
					"undefined",
					"[]",
					"[undefined]",
					"Un error"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "Array.of(10, \"Hola\", true, null) devuelve...",
				opciones: [
					"[10]",
					"[10, \"Hola\", true, null]",
					"Un error por tipos mixtos",
					"[\"10\", \"Hola\", \"true\", \"null\"]"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Cuál es la diferencia entre Array.of() y Array.from()?",
				opciones: [
					"from convierte un iterable o array-like; of usa sus argumentos como elementos",
					"Son idénticos",
					"of acepta iterables",
					"from es estático y of no"
				],
				correcta: 0
			},
			{
				id: 7,
				pregunta: "¿Qué devuelve new Array(1, 2, 3)?",
				opciones: [
					"[1, 2, 3]",
					"Un array con 3 huecos",
					"[3]",
					"Un error"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "¿Cuándo aparece la diferencia entre of y new Array?",
				opciones: [
					"Con strings",
					"Con objetos",
					"Cuando recibe un único número",
					"Siempre"
				],
				correcta: 2
			}
		]
	},
	some: {
		id: "some",
		titulo: "Array.prototype.some()",
		simulador: true,
		definicion: ["Es un método iterativo de `Array.prototype` que comprueba si **al menos un elemento** del array cumple una condición definida por una función callback.", "Devuelve un **booleano**: `true` si encuentra un elemento que cumple, `false` si ninguno cumple."],
		queEs: ["Es un método de orden superior que forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.", "Ejecuta el callback sobre cada elemento y se detiene en cuanto obtiene `true` (*short-circuit*)."],
		paraQueSirve: [
			"Verificar si existe algún elemento que cumpla una regla.",
			"Validar permisos, disponibilidad de datos o campos vacíos antes de ejecutar una acción.",
			"Buscar coincidencias cuando **no te importa cuál** elemento es, solo si existe."
		],
		comoFunciona: [
			"Recorre el array desde el índice `0` en adelante.",
			"Ejecuta el callback con cada elemento.",
			"**Cortocircuito:** en cuanto el callback devuelve un valor truthy, se detiene y devuelve `true`.",
			"Si termina todo el array sin coincidencias (o el array está vacío), devuelve `false`."
		],
		sintaxis: [{ code: `const hayAlguno = array.some((elemento, indice, array) => {
  // Condición que debe devolver true o false
  return condicion;
}, thisArg);` }, {
			caption: "Forma corta:",
			code: `const existe = array.some(elemento => elemento > 10);`
		}],
		nota: "**Parámetros:** `callback(elemento, indice, array)` y `thisArg` (opcional, el valor de `this` dentro del callback). **Retorno:** `true` o `false`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Comprobar si hay algún mayor de edad",
				code: `const edades = [12, 15, 20, 14];
const hayAdulto = edades.some(edad => edad >= 18);

console.log(hayAdulto); // true (se detiene en 20)`
			},
			{
				titulo: "Ejemplo 2: Buscar un administrador en objetos",
				code: `const usuarios = [
  { nombre: "Ana", admin: false },
  { nombre: "Luis", admin: true }
];
const existeAdmin = usuarios.some(u => u.admin);

console.log(existeAdmin); // true`
			},
			{
				titulo: "Ejemplo 3: Cuando ninguno cumple, y el array vacío",
				code: `console.log([1, 2, 3].some(n => n > 10)); // false
console.log([].some(n => n > 0));         // false (no hay elementos)`
			}
		],
		errores: [
			{
				texto: "**Confundir `some()` con `every()`:** `some` pregunta *¿existe al menos uno?*; `every` pregunta *¿todos cumplen?*.",
				code: `[2, 5, 8].some(x => x % 2 === 0);  // true
[2, 5, 8].every(x => x % 2 === 0); // false`
			},
			{
				texto: "**Esperar el elemento encontrado:** `some()` devuelve `true`, no el valor. Para obtener el elemento usa `find()`.",
				code: `[1, 2, 3].some(x => x === 2); // true  (no 2)
[1, 2, 3].find(x => x === 2); // 2`
			},
			{
				texto: "**Olvidar el `return` con llaves:** sin `return`, el callback devuelve `undefined` y `some()` siempre da `false`.",
				code: `// ❌ Siempre false
numeros.some(n => { n > 5; });

// ✅ Correcto
numeros.some(n => { return n > 5; });`
			}
		],
		casos: [
			"**Validar permisos:** `permisos.some(p => p === 'eliminar')`.",
			"**Validación de formularios:** `campos.some(c => c === '')` para detectar campos vacíos.",
			"**Disponibilidad:** `productos.some(p => p.stock > 0)` para saber si hay algo en stock."
		],
		relacion: [
			"**`every()`:** ¿todos cumplen?",
			"**`find()`:** devuelve el primer elemento que cumple.",
			"**`filter()`:** devuelve todos los que cumplen.",
			"**`includes()`:** busca un valor exacto, sin callback."
		],
		analogia: "Imagina un detector de humo en una casa con varias habitaciones: sala, cocina y dormitorio. El detector pregunta **\"¿hay humo en alguna habitación?\"**. En cuanto encuentra una con humo dice que sí, y no necesita revisar las demás. Eso es `some()`.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve some()?",
				opciones: [
					"El primer elemento que cumple",
					"Un booleano",
					"Un nuevo array",
					"El índice del elemento"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve [].some(x => x > 0)?",
				opciones: [
					"true",
					"undefined",
					"false",
					"Un error"
				],
				correcta: 2
			},
			{
				id: 3,
				pregunta: "¿Qué pasa cuando some() encuentra una coincidencia?",
				opciones: [
					"Sigue recorriendo el array",
					"Se detiene y devuelve true",
					"Devuelve el elemento",
					"Lanza un error"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Cuál es la diferencia entre some() y every()?",
				opciones: [
					"some: ¿existe al menos uno? every: ¿todos cumplen?",
					"Son iguales",
					"every es más rápido",
					"some modifica el array"
				],
				correcta: 0
			},
			{
				id: 5,
				pregunta: "Si necesitas el elemento encontrado y no un booleano, usas...",
				opciones: [
					"some()",
					"find()",
					"every()",
					"join()"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿some() modifica el array original?",
				opciones: [
					"Sí",
					"Solo con objetos",
					"No",
					"Depende del callback"
				],
				correcta: 2
			},
			{
				id: 7,
				pregunta: "Con [12, 15, 20, 14].some(e => e >= 18), ¿cuántos elementos evalúa?",
				opciones: [
					"4",
					"3",
					"1",
					"2"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "¿Por qué numeros.some(n => { n > 5; }) siempre da false?",
				opciones: [
					"Porque some no acepta llaves",
					"Porque falta el return y el callback devuelve undefined",
					"Porque n es muy pequeño",
					"Porque el array está vacío"
				],
				correcta: 1
			}
		]
	},
	isarray: {
		id: "isarray",
		titulo: "Array.isArray()",
		simulador: "utilidad",
		definicion: ["Es un **método estático** de `Array` que determina si el valor recibido es un arreglo.", "Devuelve un **booleano** (`true` o `false`)."],
		queEs: ["A diferencia de `push()` o `map()`, **no está en el prototipo**: no se llama sobre una instancia (`lista.isArray()` falla), sino desde el constructor: `Array.isArray(lista)`.", "Es la solución estándar y confiable para verificar si un valor es realmente un arreglo."],
		paraQueSirve: ["**Validar tipos de datos** con precisión.", "En JavaScript, arreglos, objetos, `null` y otros se identifican con `typeof` como `'object'`. `Array.isArray()` separa los arreglos reales de todo lo demás."],
		comoFunciona: [
			"Analiza la estructura interna del valor proporcionado.",
			"Devuelve `true` si es un arreglo creado con `[]` o con `new Array()`.",
			"Devuelve `false` para cualquier otro valor: objetos planos, strings, números, `null`, `undefined`, objetos array-like (`arguments`, `NodeList`).",
			"Funciona incluso con arreglos creados en otro contexto de ejecución (por ejemplo, un `iframe`)."
		],
		sintaxis: [{ code: `const esArreglo = Array.isArray(valorAVerificar);` }],
		nota: "**Parámetro:** `valorAVerificar`, cualquier valor. **Retorno:** `true` si es un arreglo, `false` en caso contrario.",
		ejemplos: [{
			titulo: "Ejemplo 1: Evaluaciones que dan true",
			code: `console.log(Array.isArray([]));              // true
console.log(Array.isArray([1, 2, 3]));       // true
console.log(Array.isArray(new Array()));     // true
console.log(Array.isArray(Array.prototype)); // true (curiosamente, también es un arreglo)`
		}, {
			titulo: "Ejemplo 2: Evaluaciones que dan false",
			code: `console.log(Array.isArray({}));        // false (objeto plano)
console.log(Array.isArray(null));      // false
console.log(Array.isArray(undefined)); // false
console.log(Array.isArray("[]"));      // false (es un string)`
		}],
		errores: [{
			texto: "**Llamarlo desde una instancia:** es un método estático.",
			code: `const lista = [1, 2];

// ❌ TypeError: lista.isArray is not a function
lista.isArray();

// ✅ Correcto
Array.isArray(lista); // true`
		}, {
			texto: "**Confundir objetos array-like con arreglos:** `arguments` y `NodeList` tienen índices y `length`, pero no son arreglos.",
			code: `const parrafos = document.querySelectorAll("p"); // NodeList
console.log(Array.isArray(parrafos));            // false
console.log(Array.isArray(Array.from(parrafos))); // true`,
			nota: "Si necesitas tratarlo como arreglo, conviértelo antes con `Array.from()`."
		}],
		casos: [{
			texto: "**Defensa en funciones reutilizables:** validar que el parámetro sea un arreglo antes de procesarlo.",
			code: `function procesarLista(datos) {
  if (!Array.isArray(datos)) {
    throw new TypeError("Se esperaba un arreglo de elementos.");
  }
  datos.forEach((elemento) => console.log(elemento));
}`
		}, "**APIs con respuestas variables:** comprobar si una respuesta llegó como lista o como objeto único antes de iterarla."],
		relacion: [
			"**`typeof`:** `typeof []` devuelve `'object'`, igual que un objeto plano. No sirve para distinguirlos.",
			"**`instanceof`:** `[] instanceof Array` funciona casi siempre, pero **falla** con arreglos creados en otro contexto (un `iframe`), porque cada contexto tiene su propio constructor `Array`. `Array.isArray()` es inmune a ese problema.",
			"**`Array.from()`:** convierte objetos array-like en arreglos reales."
		],
		analogia: "Imagina que eres un oficial de aduanas y recibes paquetes de todas formas y tamaños. `typeof` es un escáner básico que solo dice **\"es una caja de cartón\"** (`\"object\"`). `Array.isArray()` es un **perro detector de arreglos**: sin importar la etiqueta ni el país de origen (`iframe`), solo ladra (`true`) si dentro hay un arreglo de verdad.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: ["**Regla de oro:** olvídate de `typeof` o de trucos como `objeto.constructor === Array` para validar arreglos. Usa `Array.isArray()` como estándar."],
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve Array.isArray()?",
				opciones: [
					"El tipo del valor",
					"Un booleano",
					"El length",
					"Un array"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Cómo se llama correctamente?",
				opciones: [
					"lista.isArray()",
					"Array.isArray(lista)",
					"lista.isArray",
					"isArray(lista)"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Qué devuelve typeof []?",
				opciones: [
					"\"array\"",
					"\"object\"",
					"\"list\"",
					"\"undefined\""
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Qué devuelve Array.isArray(document.querySelectorAll('p'))?",
				opciones: [
					"true",
					"false, porque un NodeList es array-like",
					"Un error",
					"undefined"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Por qué isArray es mejor que instanceof Array?",
				opciones: [
					"Es más corto",
					"Funciona con arreglos de otros contextos como un iframe",
					"Acepta callbacks",
					"No hay diferencia"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Qué devuelve Array.isArray(null)?",
				opciones: [
					"true",
					"false",
					"undefined",
					"Un error"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Cómo conviertes un NodeList en un arreglo real?",
				opciones: [
					"Array.isArray(lista)",
					"Array.from(lista)",
					"lista.toArray()",
					"lista.join()"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "¿Qué devuelve Array.isArray('[]')?",
				opciones: [
					"true",
					"false",
					"Un error",
					"undefined"
				],
				correcta: 1
			}
		]
	},
	at: {
		id: "at",
		titulo: "Array.prototype.at()",
		simulador: "utilidad",
		definicion: ["Es un método de `Array.prototype` que recibe un entero (positivo o negativo) y devuelve el elemento que está en esa posición.", "Es de **solo lectura**: no modifica el array."],
		queEs: ["Introducido en ECMAScript 2022, es un método de conveniencia para acceder a elementos.", "A diferencia de `arreglo[indice]`, `at()` acepta **valores negativos**, que cuentan desde el final hacia el principio."],
		paraQueSirve: [
			"Acceder al **último elemento** (o a los finales) de forma legible: `arr.at(-1)`.",
			"Evitar la sintaxis repetitiva `arr[arr.length - 1]`.",
			"Usar el mismo acceso con arreglos, strings y TypedArrays."
		],
		comoFunciona: [
			"**Índice ≥ 0:** se comporta igual que los corchetes. `arr.at(0)` es el primer elemento.",
			"**Índice < 0:** cuenta desde el final. Internamente usa `length + indice`: `at(-1)` es el último, `at(-2)` el penúltimo.",
			"**Decimales:** el índice se trunca a entero (como `Math.trunc()`).",
			"**Fuera de rango:** devuelve `undefined` sin lanzar error."
		],
		sintaxis: [{ code: `const elemento = arreglo.at(indice);` }],
		nota: "**Parámetro:** `indice`, un entero que puede ser negativo. **Retorno:** el elemento en esa posición o `undefined`.",
		ejemplos: [{
			titulo: "Ejemplo 1: Acceder al último elemento",
			code: `const tecnologias = ["HTML", "CSS", "JavaScript", "React"];

// Enfoque clásico
const ultimoClasico = tecnologias[tecnologias.length - 1]; // "React"

// Enfoque moderno
const ultimoModerno = tecnologias.at(-1); // "React"`
		}, {
			titulo: "Ejemplo 2: Índices positivos, negativos y fuera de rango",
			code: `const notas = [12, 15, 18, 20];

console.log(notas.at(1));   // 15 (segundo elemento)
console.log(notas.at(-2));  // 18 (penúltimo)
console.log(notas.at(10));  // undefined (fuera de rango)`
		}],
		errores: [{
			texto: "**Intentar asignar con `at()`:** solo sirve para leer. No puedes usarlo para modificar un elemento.",
			code: `const frutas = ["manzana", "pera"];

// ❌ Error de sintaxis
frutas.at(-1) = "plátano";

// ✅ Usa corchetes para asignar
frutas[frutas.length - 1] = "plátano";`
		}, "**Creer que lanza error al salirse del rango:** no lo hace, devuelve `undefined`. Si lo encadenas con otras propiedades sin validar, el error aparece después."],
		casos: ["**Último elemento de una colección:** el último mensaje recibido en un chat, el último registro de un historial.", {
			texto: "**Pipelines de métodos encadenados:** acceder a un elemento tras transformar, sin guardar un resultado intermedio.",
			code: `const masViejo = usuarios
  .filter((u) => u.activo)
  .toSorted((a, b) => a.edad - b.edad)
  .at(-1); // usuario activo de mayor edad`
		}],
		relacion: [
			{
				texto: "**`String.prototype.at()`:** los strings tienen el mismo método.",
				code: `"JavaScript".at(-1); // "t"`
			},
			"**TypedArrays:** `Int32Array`, `Uint8Array` y similares también lo implementan.",
			"**Corchetes `arr[i]`:** siguen siendo la convención para accesos estáticos desde el inicio, como `arr[0]`."
		],
		analogia: "Imagina una fila de personas. Con corchetes tienes que contar desde el principio: \"la persona 0, la 1, la 2...\". Con `at()` es como tener un megáfono: **\"¡el que está al final!\"** (`at(-1)`) o **\"¡el penúltimo!\"** (`at(-2)`). No necesitas saber cuánta gente hay en la fila.",
		fuente: "MDN Web Docs | ECMAScript 2022 Specification (TC39)",
		notasPersonales: ["**Cuándo usarlo:** haz de `.at(-1)` tu opción por defecto para el último elemento. Para accesos desde el inicio como `arr[0]`, los corchetes siguen siendo la convención más rápida."],
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve [10, 20, 30].at(-1)?",
				opciones: [
					"10",
					"20",
					"30",
					"undefined"
				],
				correcta: 2
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve at() si el índice está fuera de rango?",
				opciones: [
					"-1",
					"null",
					"Un error",
					"undefined"
				],
				correcta: 3
			},
			{
				id: 3,
				pregunta: "¿Cuál es la ventaja principal de at() sobre los corchetes?",
				opciones: [
					"Es más rápido",
					"Acepta índices negativos",
					"Permite asignar valores",
					"Modifica el array"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Qué pasa con arr.at(1.9)?",
				opciones: [
					"Redondea a 2",
					"Se trunca a 1",
					"Lanza un error",
					"Devuelve undefined"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Se puede hacer arr.at(-1) = 'x'?",
				opciones: [
					"Sí",
					"Solo con strings",
					"No, at() es de solo lectura",
					"Solo con números"
				],
				correcta: 2
			},
			{
				id: 6,
				pregunta: "Con [12, 15, 18, 20], ¿qué devuelve at(-2)?",
				opciones: [
					"15",
					"18",
					"20",
					"12"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿En qué versión de ECMAScript se introdujo at()?",
				opciones: [
					"ES5",
					"ES2015",
					"ES2022",
					"ES2010"
				],
				correcta: 2
			},
			{
				id: 8,
				pregunta: "¿at() también existe en los strings?",
				opciones: [
					"No",
					"Sí, con el mismo comportamiento",
					"Sí, pero solo con índices positivos",
					"Solo en TypedArrays"
				],
				correcta: 1
			}
		]
	},
	length: {
		id: "length",
		titulo: "Array.prototype.length",
		simulador: "utilidad",
		definicion: ["Es una **propiedad** de las instancias de `Array` que representa el **número de elementos** del arreglo.", "Su valor es un entero de 32 bits sin signo."],
		queEs: ["A diferencia de los métodos anteriores, `length` **no es una función**: no se invoca con paréntesis.", "Es una propiedad de **lectura y escritura**: además de reflejar el tamaño, puede modificarse para truncar o extender el arreglo."],
		paraQueSirve: [
			"Saber cuántos elementos contiene una colección.",
			"Vaciar un arreglo rápidamente: `arr.length = 0`.",
			"Eliminar elementos del final (truncar).",
			"Agregar un elemento en la última posición disponible: `arr[arr.length] = x`."
		],
		comoFunciona: [
			"**Actualización automática:** al agregar o quitar elementos (`push`, `pop`, `shift`, asignación por índice...), JavaScript actualiza `length`.",
			"**Regla del índice más alto:** `length` siempre es **uno más** que el índice más grande. Si el índice más alto es `4`, `length` es `5`.",
			"**Si reduces `length`:** los elementos sobrantes se eliminan de forma destructiva y permanente.",
			"**Si aumentas `length`:** el arreglo se extiende con **huecos vacíos** que devuelven `undefined` al leerlos."
		],
		sintaxis: [{
			caption: "Para leer el tamaño:",
			code: `const tamaño = arreglo.length;`
		}, {
			caption: "Para modificar el tamaño:",
			code: `arreglo.length = nuevoTamaño;`
		}],
		nota: "**Valores válidos:** enteros entre `0` y `4294967295`. Cualquier otro valor lanza `RangeError: Invalid array length`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Lectura básica",
				code: `const animales = ["perro", "gato", "mapache"];
console.log(animales.length); // 3`
			},
			{
				titulo: "Ejemplo 2: Truncar un arreglo",
				code: `const numeros = [1, 2, 3, 4, 5];
numeros.length = 3;

console.log(numeros); // [1, 2, 3] (el 4 y el 5 se eliminaron)`
			},
			{
				titulo: "Ejemplo 3: Vaciar un arreglo",
				code: `let carrito = ["iPhone", "Funda", "Cargador"];
carrito.length = 0;

console.log(carrito); // []`
			},
			{
				titulo: "Ejemplo 4: Extender un arreglo",
				code: `const lista = ["a", "b"];
lista.length = 4;

console.log(lista); // ["a", "b", <2 empty items>]`
			}
		],
		errores: [
			{
				texto: "**Llamarlo como función:** error típico al venir de lenguajes donde se usa `length()`.",
				code: `const nombres = ["Ana", "Juan"];
console.log(nombres.length());
// ❌ TypeError: nombres.length is not a function`
			},
			{
				texto: "**Confundirse con arreglos dispersos (sparse):** `length` mide el índice más alto + 1, no la cantidad de elementos reales.",
				code: `const raro = [];
raro[100] = "Sorpresa";

console.log(raro.length); // 101 (aunque solo hay un elemento real)`
			},
			"**Truncar sin darse cuenta:** `arr.length = 2` borra todo lo que estaba después y no hay forma de recuperarlo."
		],
		casos: [{
			texto: "**Bucles `for` clásicos:** `length` marca el límite.",
			code: `for (let i = 0; i < arreglo.length; i++) {
  console.log(arreglo[i]);
}`
		}, {
			texto: "**Añadir un elemento al final sin `push()`:**",
			code: `const lista = ["a", "b"];
lista[lista.length] = "c"; // lista = ["a", "b", "c"]`
		}],
		relacion: [
			"**`String.prototype.length`:** los strings también la tienen, pero es de **solo lectura**: `'hola'.length = 2` no hace nada.",
			"**`Function.prototype.length`:** indica cuántos parámetros espera la función (su aridad).",
			"**`push()` / `pop()`:** modifican `length` automáticamente."
		],
		analogia: "Imagina un tren de vagones de carga. `length` es una **barrera física** colocada justo después del último vagón. Si enganchas un vagón nuevo, la barrera se mueve sola un espacio hacia atrás. Si tú arrastras la barrera hacia adelante (reduces `length`), los vagones que queden del otro lado se desenganchan y se pierden.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿length es una función o una propiedad?",
				opciones: [
					"Una función",
					"Una propiedad",
					"Un método estático",
					"Un getter de solo lectura"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué pasa con const a = [1, 2, 3, 4, 5]; a.length = 2;?",
				opciones: [
					"No cambia nada",
					"a queda [1, 2]",
					"a queda [4, 5]",
					"Lanza un error"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Cómo se vacía un arreglo con length?",
				opciones: [
					"arr.length = 1",
					"arr.length = 0",
					"arr.length = null",
					"arr.length()"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "Si el índice más alto de un arreglo es 4, ¿cuánto vale length?",
				opciones: [
					"4",
					"5",
					"3",
					"Depende"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "const r = []; r[100] = 'x'; ¿cuánto vale r.length?",
				opciones: [
					"1",
					"100",
					"101",
					"0"
				],
				correcta: 2
			},
			{
				id: 6,
				pregunta: "¿Qué pasa al aumentar length más allá de los elementos existentes?",
				opciones: [
					"Se rellenan con 0",
					"Se crean huecos vacíos",
					"Se rellenan con null",
					"Lanza un error"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Qué ocurre con arr.length = -1?",
				opciones: [
					"Vacía el arreglo",
					"Lanza RangeError: Invalid array length",
					"Elimina el último elemento",
					"No hace nada"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "¿length de un string es de lectura y escritura?",
				opciones: [
					"Sí",
					"No, es de solo lectura",
					"Solo en modo estricto",
					"Depende del navegador"
				],
				correcta: 1
			}
		]
	},
	concat: {
		id: "concat",
		titulo: "Array.prototype.concat()",
		simulador: "utilidad",
		definicion: ["Es un método de `Array.prototype` que **une dos o más arrays o valores** y devuelve un **nuevo array** con todos los elementos combinados.", "Es **inmutable**: no modifica los arrays originales."],
		queEs: ["Es un método heredado de `Array.prototype` que forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.", "Sirve para crear combinaciones de arrays sin alterar los datos de origen."],
		paraQueSirve: [
			"Unir arrays y combinar listas de datos.",
			"Crear copias extendidas de un array.",
			"Evitar mutaciones cuando trabajas con datos inmutables (por ejemplo, en React).",
			"Combinar resultados de distintas fuentes."
		],
		comoFunciona: [
			"Recibe uno o varios argumentos (arrays o valores sueltos).",
			"Copia los elementos del array original en un array nuevo.",
			"**Arrays como argumento:** agrega sus elementos (aplana **un solo nivel**).",
			"**Valores sueltos:** los agrega tal cual. Devuelve el nuevo array."
		],
		sintaxis: [{ code: `const nuevo = array.concat(valor1, valor2, ..., valorN);` }],
		nota: "**Parámetros:** arrays o valores individuales, en cualquier cantidad. **Retorno:** un nuevo array combinado.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Unir dos arrays",
				code: `const frutas = ["Manzana", "Pera"];
const frutas2 = ["Uva", "Fresa"];
const todas = frutas.concat(frutas2);

console.log(todas); // ["Manzana", "Pera", "Uva", "Fresa"]`
			},
			{
				titulo: "Ejemplo 2: Agregar valores individuales",
				code: `const numeros = [1, 2, 3];
console.log(numeros.concat(4, 5)); // [1, 2, 3, 4, 5]`
			},
			{
				titulo: "Ejemplo 3: Combinar varios arrays y valores mixtos",
				code: `const a = [1, 2];
const b = [3, 4];
const c = [5, 6];

console.log(a.concat(b, c));         // [1, 2, 3, 4, 5, 6]
console.log(a.concat("Hola", true)); // [1, 2, "Hola", true]`
			},
			{
				titulo: "Ejemplo 4: No modifica el original",
				code: `const colores = ["Rojo", "Azul"];
colores.concat("Verde");
console.log(colores); // ["Rojo", "Azul"]

// Para conservar el resultado, guárdalo:
const nuevos = colores.concat("Verde");`
			}
		],
		errores: [
			{
				texto: "**Pensar que modifica el array original:** `concat()` devuelve un array nuevo; si no lo guardas, el resultado se pierde.",
				code: `const numeros = [1, 2];
numeros.concat([3, 4]);
console.log(numeros); // [1, 2]`
			},
			{
				texto: "**Confundirlo con `push()`:** `push()` muta el array y devuelve la nueva longitud; `concat()` no muta y devuelve un array.",
				code: `const a = [1, 2];
a.concat(3);
console.log(a); // [1, 2]

a.push(3);
console.log(a); // [1, 2, 3]`
			},
			{
				texto: "**Esperar una copia profunda:** `concat()` hace una copia **superficial**. Los objetos internos siguen compartiendo referencia.",
				code: `const datos = [{ nombre: "Ana" }];
const copia = datos.concat();
copia[0].nombre = "Luis";

console.log(datos[0].nombre); // "Luis"`
			}
		],
		casos: [
			{
				texto: "**Combinar resultados de APIs:**",
				code: `const todos = usuariosActivos.concat(usuariosNuevos);`
			},
			"**Nuevos estados en React:** crear una lista nueva sin mutar el estado actual.",
			"**Programación funcional:** encadenar transformaciones sin efectos secundarios."
		],
		relacion: [
			{
				texto: "**Spread `[...a, ...b]`:** alternativa moderna que produce el mismo resultado.",
				code: `a.concat(b);   // [1, 2, 3, 4]
[...a, ...b];  // [1, 2, 3, 4]`
			},
			"**`push()`:** agrega al final **mutando** el original.",
			"**`slice()`:** copia partes de un array.",
			"**`String.prototype.concat()`:** existe para strings, pero es un método distinto."
		],
		analogia: "Imagina dos listas de compras: la lista A (Pan, Leche) y la lista B (Huevos, Arroz). `concat()` crea una **tercera lista** con Pan, Leche, Huevos y Arroz, pero las dos listas originales siguen igual. Es como hacer una fotocopia combinada, no pegar físicamente las hojas originales.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve concat()?",
				opciones: [
					"La nueva longitud",
					"Un nuevo array combinado",
					"El array original modificado",
					"Un string"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿concat() modifica el array original?",
				opciones: [
					"Sí",
					"No",
					"Solo con números",
					"Solo con strings"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Qué devuelve [1, 2].concat([3, 4], 5)?",
				opciones: [
					"[1, 2, [3, 4], 5]",
					"[1, 2, 3, 4, 5]",
					"[3, 4, 5]",
					"[1, 2, 3, 4]"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Qué tipo de copia hace concat()?",
				opciones: [
					"Profunda",
					"Superficial",
					"Ninguna",
					"Depende del contenido"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Cuál es la diferencia entre concat() y push()?",
				opciones: [
					"concat no muta y devuelve un array; push muta y devuelve la longitud",
					"Son iguales",
					"push no muta",
					"concat devuelve la longitud"
				],
				correcta: 0
			},
			{
				id: 6,
				pregunta: "¿Cuántos niveles aplana concat() cuando recibe arrays?",
				opciones: [
					"Ninguno",
					"Uno",
					"Todos",
					"Dos"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Cuál es la alternativa moderna a a.concat(b)?",
				opciones: [
					"[...a, ...b]",
					"a.push(b)",
					"a + b",
					"a.join(b)"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "¿Qué devuelve original.concat()?",
				opciones: [
					"undefined",
					"Una copia superficial del array",
					"Un array vacío",
					"Un error"
				],
				correcta: 1
			}
		]
	},
	join: {
		id: "join",
		titulo: "Array.prototype.join()",
		simulador: "utilidad",
		definicion: ["Es un método de `Array.prototype` que **une todos los elementos de un array en una cadena de texto**, usando un separador opcional.", "Devuelve un **nuevo string** y **no modifica el array original**."],
		queEs: ["Es un método de arrays que forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.", "Realiza la operación inversa de `split()`: `join()` va de **Array a String** y `split()` va de **String a Array**."],
		paraQueSirve: [
			"Convertir arrays en textos y crear frases dinámicamente.",
			"Generar URLs, rutas y listas separadas por comas.",
			"Construir mensajes y formatear datos para mostrarlos al usuario."
		],
		comoFunciona: [
			"Toma todos los elementos del array.",
			"Convierte cada elemento a texto (`null` y `undefined` se convierten en cadena vacía).",
			"Une los valores colocando el separador entre cada par.",
			"Devuelve un string. Si no indicas separador, usa la coma `,`."
		],
		sintaxis: [{ code: `const texto = array.join(separador);` }, {
			caption: "Sin argumento, el separador es una coma:",
			code: `[1, 2, 3].join();  // "1,2,3"`
		}],
		nota: "**Parámetro:** `separador` (opcional), el texto que va entre elementos. **Retorno:** un `string`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Coma y espacio",
				code: `const nombres = ["Ana", "Luis", "Carlos"];
console.log(nombres.join(", ")); // "Ana, Luis, Carlos"`
			},
			{
				titulo: "Ejemplo 2: Crear una frase y una fecha",
				code: `const palabras = ["JavaScript", "es", "poderoso"];
console.log(palabras.join(" ")); // "JavaScript es poderoso"

const fecha = [2026, 7, 27];
console.log(fecha.join("-")); // "2026-7-27"`
			},
			{
				titulo: "Ejemplo 3: Elementos vacíos",
				code: `const datos = ["A", "", "C"];
console.log(datos.join("-")); // "A--C"`
			},
			{
				titulo: "Ejemplo 4: Rutas",
				code: `const ruta = ["usuarios", "15", "perfil"];
console.log("/" + ruta.join("/")); // "/usuarios/15/perfil"`
			}
		],
		errores: [
			{
				texto: "**Pensar que modifica el array:** el array original no cambia.",
				code: `const frutas = ["Manzana", "Pera"];
frutas.join("-");
console.log(frutas); // ["Manzana", "Pera"]`
			},
			{
				texto: "**Olvidar que siempre devuelve string:** aunque unes números, el resultado es texto.",
				code: `const resultado = [1, 2, 3].join("");
console.log(resultado);         // "123"
console.log(typeof resultado);  // "string"`
			},
			{
				texto: "**Usar `join()` con objetos directamente:** cada objeto se convierte en `[object Object]`.",
				code: `const usuarios = [{ nombre: "Ana" }, { nombre: "Luis" }];

console.log(usuarios.join(","));
// "[object Object],[object Object]"

// ✅ Extrae primero la propiedad con map():
usuarios.map((u) => u.nombre).join(", "); // "Ana, Luis"`
			}
		],
		casos: [
			{
				texto: "**Etiquetas o categorías:**",
				code: `const tags = ["JavaScript", "Frontend", "Web"];
tags.join(" | "); // "JavaScript | Frontend | Web"`
			},
			"**Rutas y URLs:** unir segmentos con `/`.",
			{
				texto: "**Mostrar listas en la interfaz:**",
				code: `elemento.textContent = habilidades.join(", ");`
			}
		],
		relacion: [
			"**`split()`:** la operación inversa, de String a Array.",
			"**`concat()`:** une arrays (devuelve un array), no textos.",
			"**`toString()`:** equivale a `join()` con la coma por defecto.",
			"**`map()`:** transforma elementos antes de unirlos."
		],
		analogia: "Imagina palabras escritas en tarjetas: [Hola] [Mundo] [JS]. `join(' ')` las pega con un espacio entre cada una para formar **Hola Mundo JS**. Es como colocar pegamento entre cada tarjeta para formar una frase. Las tarjetas originales siguen existiendo.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve join()?",
				opciones: [
					"Un array",
					"Un string",
					"La longitud",
					"undefined"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Cuál es el separador por defecto de join()?",
				opciones: [
					"Espacio",
					"Guion",
					"Coma",
					"Nada"
				],
				correcta: 2
			},
			{
				id: 3,
				pregunta: "¿Qué devuelve [\"A\", \"\", \"C\"].join(\"-\")?",
				opciones: [
					"\"A-C\"",
					"\"A--C\"",
					"\"A-undefined-C\"",
					"\"AC\""
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿join() modifica el array original?",
				opciones: [
					"Sí",
					"No",
					"Solo con strings",
					"Depende del separador"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Qué devuelve [{ a: 1 }].join()?",
				opciones: [
					"\"a:1\"",
					"\"[object Object]\"",
					"\"{a:1}\"",
					"\"1\""
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Qué método realiza la operación inversa de join()?",
				opciones: [
					"concat()",
					"split()",
					"map()",
					"slice()"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Qué devuelve [1, 2, 3].join('')?",
				opciones: [
					"[1, 2, 3]",
					"\"1,2,3\"",
					"\"123\"",
					"123"
				],
				correcta: 2
			},
			{
				id: 8,
				pregunta: "¿Cómo conviertes un array de objetos en un texto legible?",
				opciones: [
					"usuarios.join()",
					"usuarios.map(u => u.nombre).join(', ')",
					"usuarios.concat()",
					"usuarios.toString(',')"
				],
				correcta: 1
			}
		]
	}
};
// src/data/Metodositerativos.js
var METODOS_ITERATIVOS = {
	foreach: {
		id: "foreach",
		titulo: "Array.prototype.forEach()",
		simulador: "utilidad",
		definicion: ["Es un método iterativo del prototipo de `Array` que **ejecuta una función una vez por cada elemento** del arreglo, en orden ascendente.", "**No devuelve nada** (retorna `undefined`)."],
		queEs: ["Es un método de **orden superior** (recibe otra función como argumento) diseñado para recorrer colecciones.", "A diferencia de un bucle `for`, `forEach` abstrae el manejo del índice y del control del bucle, con una sintaxis más declarativa y limpia."],
		paraQueSirve: [
			"Sirve para **ejecutar efectos secundarios** a partir de los elementos de un arreglo.",
			"Modificar el DOM para mostrar cada elemento.",
			"Guardar datos en `localStorage` o enviar una petición por elemento.",
			"Actualizar variables externas al flujo del arreglo."
		],
		comoFunciona: [
			"Toma una función callback y la ejecuta para cada elemento que tenga un valor asignado (**ignora los huecos** de arreglos dispersos).",
			"**No devuelve nada:** siempre retorna `undefined`.",
			"No altera el tamaño del arreglo por sí mismo (aunque tu callback sí podría hacerlo, y no es recomendable).",
			"**No se puede detener:** `break` y `continue` no funcionan dentro del callback."
		],
		sintaxis: [{ code: `arreglo.forEach(function callback(elementoActual, indice, arregloCompleto) {
  // Tu código aquí
}, thisArg);` }],
		nota: "**Parámetros:** `callback(elementoActual, indice, arregloCompleto)` y `thisArg` (opcional, el valor de `this` dentro del callback). **Retorno:** `undefined`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Recorrido básico con arrow function",
				code: `const frutas = ["manzana", "plátano", "cereza"];

frutas.forEach(fruta => {
  console.log("Me gusta: " + fruta);
});
// Me gusta: manzana
// Me gusta: plátano
// Me gusta: cereza`
			},
			{
				titulo: "Ejemplo 2: Usando el índice",
				code: `const tareas = ["Comprar pan", "Lavar ropa", "Estudiar JS"];

tareas.forEach((tarea, index) => {
  console.log((index + 1) + ". " + tarea);
});
// 1. Comprar pan
// 2. Lavar ropa
// 3. Estudiar JS`
			},
			{
				titulo: "Ejemplo 3: Acumular en una variable externa",
				code: `const precios = [10, 20, 30];
let total = 0;

precios.forEach(p => { total += p; });
console.log(total); // 60`
			}
		],
		errores: [
			{
				texto: "**Intentar usar `break` o `continue`:** `forEach` no tiene un mecanismo para detener la iteración.",
				code: `// ❌ SyntaxError: Illegal break statement
[1, 2, 3].forEach(num => {
  if (num === 2) break;
});`,
				nota: "Si necesitas cortar el recorrido, usa `for...of`, `some()`, `every()` o `find()`."
			},
			{
				texto: "**Esperar que devuelva un nuevo arreglo:** se confunde con `map()`.",
				code: `// ❌ dobles es undefined
const dobles = [1, 2, 3].forEach(num => num * 2);

// ✅ Para transformar usa map()
const dobles2 = [1, 2, 3].map(num => num * 2);`
			},
			{
				texto: "**Operaciones asíncronas:** `forEach` no espera a que las promesas se resuelvan antes de pasar al siguiente elemento.",
				code: `// ❌ No espera: todas las llamadas arrancan casi a la vez
numeros.forEach(async (num) => {
  await guardarEnBaseDeDatos(num);
});

// ✅ Respeta el orden
for (const num of numeros) {
  await guardarEnBaseDeDatos(num);
}`
			}
		],
		casos: [{
			texto: "**Renderizado de listas en el DOM (JavaScript vainilla):**",
			code: `usuarios.forEach(usuario => {
  const li = document.createElement("li");
  li.textContent = usuario;
  listaUL.appendChild(li);
});`
		}, {
			texto: "**Contar frecuencias:**",
			code: `const votos = ["si", "no", "si", "si", "no"];
const conteo = {};

votos.forEach(voto => {
  conteo[voto] = (conteo[voto] || 0) + 1;
}); // { si: 3, no: 2 }`
		}],
		relacion: [
			"**`map()`:** devuelve un nuevo arreglo transformado; `forEach` no devuelve nada.",
			"**`filter()`:** devuelve un arreglo filtrado.",
			"**`reduce()`:** condensa el arreglo en un solo valor.",
			"**`for...of`:** permite `break`, `continue` y `await` dentro del bucle."
		],
		analogia: "Imagina un **repartidor de correo** (`forEach`) con un saco de cartas (el arreglo). Tu única tarea es ir buzón por buzón y dejar la carta correspondiente (el callback). No te importa qué hace la gente con las cartas, no cambias las casas físicas, y no puedes simplemente detenerte a la mitad: tienes que pasar por todas las casas que tengan correspondencia.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: ["**Regla de oro:** si dentro de `forEach` usas `.push()` para llenar un nuevo arreglo que declaraste afuera (`let resultado = [];`), detente: lo que necesitas es un `.map()`. Mantén el código declarativo y libre de mutaciones innecesarias."],
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve forEach()?",
				opciones: [
					"Un nuevo array",
					"El mismo array",
					"undefined",
					"Un booleano"
				],
				correcta: 2
			},
			{
				id: 2,
				pregunta: "¿Para qué sirve principalmente forEach()?",
				opciones: [
					"Para transformar datos en un nuevo array",
					"Para ejecutar efectos secundarios por cada elemento",
					"Para filtrar elementos",
					"Para ordenar un array"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Qué pasa si usas break dentro del callback de forEach?",
				opciones: [
					"Detiene el recorrido",
					"Lanza un SyntaxError",
					"Salta al siguiente elemento",
					"No pasa nada"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Qué valor tiene dobles en const dobles = [1, 2, 3].forEach(n => n * 2)?",
				opciones: [
					"[2, 4, 6]",
					"[1, 2, 3]",
					"undefined",
					"6"
				],
				correcta: 2
			},
			{
				id: 5,
				pregunta: "¿Qué alternativa usarías para poder cortar el recorrido?",
				opciones: [
					"map()",
					"for...of o some()",
					"flat()",
					"concat()"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿forEach espera a las promesas de un callback async?",
				opciones: [
					"Sí, siempre",
					"No, no espera a que se resuelvan antes de seguir",
					"Solo con await",
					"Solo con try/catch"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Qué hace forEach con los huecos de un array disperso?",
				opciones: [
					"Los ignora",
					"Los recorre como undefined",
					"Lanza un error",
					"Los rellena con null"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "Si dentro de forEach haces push() a un array externo, ¿qué método te conviene?",
				opciones: [
					"map()",
					"pop()",
					"fill()",
					"join()"
				],
				correcta: 0
			}
		]
	},
	reduce: {
		id: "reduce",
		titulo: "Array.prototype.reduce()",
		simulador: "reduce-lab",
		definicion: ["Es un método iterativo de `Array` que ejecuta una función **reductora** sobre cada elemento y devuelve **un único valor** acumulado."],
		queEs: ["Es uno de los métodos de orden superior más potentes y versátiles de JavaScript.", "A diferencia de `forEach` o `map`, que procesan elementos de forma aislada, `reduce` mantiene un **acumulador** (una *memoria*) que viaja de una iteración a la siguiente, permitiendo combinar todos los elementos en un solo resultado."],
		paraQueSirve: [
			"Sumar, multiplicar o promediar números.",
			"Aplanar matrices.",
			"Transformar un arreglo de objetos en un solo objeto (indexar o agrupar).",
			"Replicar el comportamiento de `map()` o `filter()`."
		],
		comoFunciona: [
			"Recibe una función **callback (reductora)** y un **valorInicial** (opcional, pero muy recomendable).",
			"El callback se ejecuta por cada elemento y el valor que **retorna** se convierte en el `acumulador` de la siguiente iteración.",
			"Al terminar, devuelve el último valor del acumulador.",
			"**Sin `valorInicial`:** el primer elemento (índice 0) es el acumulador inicial y la iteración empieza en el índice 1.",
			"Con un array vacío y sin `valorInicial` lanza `TypeError`."
		],
		sintaxis: [{ code: `arreglo.reduce(function callback(acumulador, elementoActual, indice, arregloCompleto) {
  // Tu lógica aquí
  return nuevoAcumulador;
}, valorInicial);` }],
		nota: "**`acumulador`:** lo devuelto en la iteración anterior (o `valorInicial` en la primera). **`elementoActual`:** el elemento procesado. **`valorInicial`** *(opcional)*: primer valor del acumulador.",
		ejemplos: [{
			titulo: "Ejemplo 1: Suma de números",
			code: `const numeros = [10, 20, 30, 40];

const sumaTotal = numeros.reduce((acumulador, numero) => {
  return acumulador + numero;
}, 0); // 0 es el valorInicial

console.log(sumaTotal); // 100`
		}, {
			titulo: "Ejemplo 2: Agrupar objetos por una propiedad",
			code: `const productos = [
  { nombre: "Camisa", categoria: "Ropa" },
  { nombre: "Laptop", categoria: "Tecnología" },
  { nombre: "Pantalón", categoria: "Ropa" }
];

const agrupados = productos.reduce((acumulador, producto) => {
  const cat = producto.categoria;
  if (!acumulador[cat]) acumulador[cat] = [];
  acumulador[cat].push(producto.nombre);
  return acumulador;
}, {}); // un objeto vacío como valorInicial

console.log(agrupados);
// { Ropa: ["Camisa", "Pantalón"], Tecnología: ["Laptop"] }`
		}],
		errores: [
			{
				texto: "**Olvidar el `return` dentro del callback:** la siguiente iteración recibe `undefined` como acumulador.",
				code: `// ❌ Devuelve NaN
const total = [1, 2, 3].reduce((acc, num) => {
  acc + num; // falta el return
}, 0);`
			},
			{
				texto: "**No poner `valorInicial` cuando el tipo de dato cambia:** JavaScript usa el primer elemento (un objeto, por ejemplo) como acumulador y la lógica se rompe.",
				code: `const carrito = [{ precio: 10 }, { precio: 20 }];

// ❌ Resultado absurdo: "[object Object]20"
carrito.reduce((acc, item) => acc + item.precio);

// ✅ Pasa 0 como valor inicial
carrito.reduce((acc, item) => acc + item.precio, 0); // 30`
			},
			{
				texto: "**Array vacío sin `valorInicial`:** lanza error.",
				code: `[].reduce((a, n) => a + n);    // ❌ TypeError
[].reduce((a, n) => a + n, 0); // ✅ 0`
			}
		],
		casos: [{
			texto: "**Aplanar una matriz:**",
			code: `const matriz = [[1, 2], [3, 4], [5, 6]];
const plano = matriz.reduce((acc, sub) => acc.concat(sub), []);
// [1, 2, 3, 4, 5, 6]`
		}, {
			texto: "**Contar ocurrencias (histograma):**",
			code: `const frutas = ["manzana", "pera", "manzana", "platano", "pera"];
const conteo = frutas.reduce((acc, fruta) => {
  acc[fruta] = (acc[fruta] || 0) + 1;
  return acc;
}, {});
// { manzana: 2, pera: 2, platano: 1 }`
		}],
		relacion: [
			"**`map()` + `filter()`:** muchas veces un `reduce()` reemplaza el encadenamiento y recorre el arreglo una sola vez.",
			"**`reduceRight()`:** igual que `reduce`, pero de derecha a izquierda.",
			"**`forEach()`:** procesa elementos de forma aislada, sin acumulador."
		],
		analogia: "Imagina una **bola de nieve** (el acumulador) rodando colina abajo por una pista llena de juguetes sueltos (los elementos). Cada juguete que toca se integra a la bola. Al final de la colina ya no hay juguetes sueltos: tienes **una única y gran bola de nieve** que contiene todo lo recolectado.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: ["**Consejo pro:** aunque `reduce` puede hacer *absolutamente todo* (filtrar, mapear, buscar), no significa que *debas* usarlo. Si resuelves con `map()` o `filter()`, hazlo: tu código será más legible. Usa `reduce` cuando la complejidad de la transformación realmente lo justifique."],
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve reduce()?",
				opciones: [
					"Un nuevo array",
					"Un único valor acumulado",
					"undefined",
					"Un booleano"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué es el acumulador?",
				opciones: [
					"El elemento actual",
					"El valor que viaja de una iteración a la siguiente",
					"El índice",
					"El array original"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "Sin valorInicial, ¿qué es el acumulador inicial?",
				opciones: [
					"0",
					"undefined",
					"El primer elemento del array",
					"El último elemento"
				],
				correcta: 2
			},
			{
				id: 4,
				pregunta: "¿Qué pasa con [].reduce((a, n) => a + n)?",
				opciones: [
					"Devuelve 0",
					"Devuelve undefined",
					"Lanza TypeError",
					"Devuelve []"
				],
				correcta: 2
			},
			{
				id: 5,
				pregunta: "¿Qué devuelve [10, 20, 30, 40].reduce((a, n) => a + n, 0)?",
				opciones: [
					"100",
					"90",
					"[100]",
					"0"
				],
				correcta: 0
			},
			{
				id: 6,
				pregunta: "¿Qué pasa si el callback de reduce no devuelve nada?",
				opciones: [
					"Mantiene el acumulador",
					"La siguiente iteración recibe undefined y suele dar NaN",
					"Lanza un error",
					"Devuelve el array"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Qué valorInicial usas para agrupar objetos en un objeto?",
				opciones: [
					"0",
					"[]",
					"{}",
					"null"
				],
				correcta: 2
			},
			{
				id: 8,
				pregunta: "¿Cuántos parámetros del callback son obligatorios en la práctica?",
				opciones: [
					"Ninguno",
					"acumulador y elementoActual",
					"Solo el índice",
					"Los cuatro"
				],
				correcta: 1
			}
		]
	},
	reduceright: {
		id: "reduceright",
		titulo: "Array.prototype.reduceRight()",
		simulador: "utilidad",
		definicion: ["Es un método iterativo de `Array` que ejecuta una función reductora sobre cada elemento procesándolo **de derecha a izquierda** (del último al primero) y devuelve **un único valor** acumulado."],
		queEs: ["Es el hermano gemelo de `.reduce()`.", "Comparte la misma filosofía del **acumulador**, con una diferencia crucial: invierte el sentido del recorrido (empieza en el índice `n - 1` y termina en el `0`)."],
		paraQueSirve: [
			"Problemas de reducción donde el **orden de las operaciones importa** (operaciones no conmutativas) y se debe empezar por el final.",
			"Evaluar expresiones de derecha a izquierda (potencias en cadena, algunas operaciones algebraicas).",
			"Componer funciones en el orden matemático estándar: `f(g(x))`.",
			"Procesar estructuras anidadas desde las hojas hacia la raíz."
		],
		comoFunciona: [
			"Toma una función callback reductora y un valorInicial opcional.",
			"Comienza en el **último índice** y se mueve hacia atrás.",
			"**Sin `valorInicial`:** el último elemento es el acumulador inicial y la iteración empieza en el penúltimo.",
			"Con un array vacío y sin `valorInicial` lanza `TypeError`.",
			"El índice que recibe el callback va **decrementando**: `n-1, n-2, ..., 0`."
		],
		sintaxis: [{ code: `arreglo.reduceRight(function callback(acumulador, elementoActual, indice, arregloCompleto) {
  // Tu lógica aquí
  return nuevoAcumulador;
}, valorInicial);` }],
		nota: "**Parámetros:** idénticos a `reduce()`. **Retorno:** un único valor acumulado.",
		ejemplos: [{
			titulo: "Ejemplo 1: Operaciones no conmutativas (resta)",
			code: `const numeros = [1, 2, 3, 4];

// reduce (izquierda → derecha): ((1 - 2) - 3) - 4
numeros.reduce((acc, cur) => acc - cur);      // -8

// reduceRight (derecha → izquierda): ((4 - 3) - 2) - 1
numeros.reduceRight((acc, cur) => acc - cur); // -2`
		}, {
			titulo: "Ejemplo 2: Composición de funciones (compose)",
			descripcion: "En la composición matemática `f(g(x))` primero se ejecuta `g` y luego `f`, es decir, de derecha a izquierda.",
			code: `const duplicar = x => x * 2;
const alCuadrado = x => x * x;

const funciones = [duplicar, alCuadrado];

// duplicar(alCuadrado(5)) → duplicar(25) → 50
const resultado = funciones.reduceRight((valor, fn) => fn(valor), 5);

console.log(resultado); // 50`
		}],
		errores: [{
			texto: "**No ser consciente de la dirección:** al concatenar, el acumulador empieza con el último elemento y puedes invertir tus datos sin darte cuenta.",
			code: `const palabras = ["Mundo", "Hola"];
// acc empieza en "Hola", cur es "Mundo"
palabras.reduceRight((acc, cur) => acc + " " + cur); // "Hola Mundo"`
		}, "**Usarlo cuando el orden no importa:** con operaciones conmutativas (suma, producto, máximo) `reduce()` da el mismo resultado y es más habitual."],
		casos: ["**Composición de funciones y middleware:** ejecutar una cadena de funciones de derecha a izquierda.", "**Procesamiento de árboles o nodos (como el DOM):** evaluar los elementos finales antes de subir hacia los contenedores padres."],
		relacion: ["**`reduce()`:** lo mismo, pero de izquierda a derecha.", {
			texto: "**`reverse().reduce()`:** parece equivalente, pero `reverse()` **muta** el arreglo original (o exige clonarlo, con más memoria). `reduceRight` lee al revés sin tocar nada.",
			code: `// ❌ muta arr
arr.reverse().reduce(fn);

// ✅ no muta
arr.reduceRight(fn);`
		}],
		analogia: "Imagina una **pila de libros**. Con `.reduce()` tendrías que sacar primero el libro de hasta abajo y tirarías la pila. `.reduceRight()` es **desmontar la pila de forma natural**: tomas el libro de arriba del todo (el último que se agregó) y vas trabajando hacia abajo hasta la base.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: ["**Cuándo usarlo:** en el día a día usarás `.reduce()` el 95% de las veces. Guarda `.reduceRight()` para cuando construyas un motor de *middleware* o librerías de programación funcional donde la composición matemática estricta sea requerida."],
		quiz: [
			{
				id: 1,
				pregunta: "¿En qué dirección recorre reduceRight()?",
				opciones: [
					"De izquierda a derecha",
					"De derecha a izquierda",
					"Desde el medio",
					"Aleatoria"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve [1, 2, 3, 4].reduceRight((acc, cur) => acc - cur)?",
				opciones: [
					"-8",
					"-2",
					"2",
					"0"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "Sin valorInicial, ¿cuál es el acumulador inicial de reduceRight()?",
				opciones: [
					"El primer elemento",
					"El último elemento",
					"0",
					"undefined"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Qué índices recibe el callback de reduceRight()?",
				opciones: [
					"0, 1, 2...",
					"n-1, n-2, ..., 0",
					"Solo el último",
					"Aleatorios"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Qué ventaja tiene reduceRight() sobre reverse().reduce()?",
				opciones: [
					"Es más corto",
					"No muta el array original",
					"Devuelve un array",
					"Funciona con strings"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Qué devuelve ['Mundo', 'Hola'].reduceRight((acc, cur) => acc + ' ' + cur)?",
				opciones: [
					"'Mundo Hola'",
					"'Hola Mundo'",
					"'HolaMundo'",
					"Un error"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Cuándo importa la diferencia entre reduce() y reduceRight()?",
				opciones: [
					"Con operaciones no conmutativas",
					"Siempre",
					"Nunca",
					"Solo con strings"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "¿Qué pasa con [].reduceRight(fn) sin valorInicial?",
				opciones: [
					"Devuelve undefined",
					"Devuelve []",
					"Lanza TypeError",
					"Devuelve 0"
				],
				correcta: 2
			}
		]
	},
	every: {
		id: "every",
		titulo: "Array.prototype.every()",
		simulador: "utilidad",
		definicion: ["Es un método de `Array.prototype` que comprueba si **todos los elementos** del array cumplen una condición definida por una función de prueba.", "Devuelve un **booleano**: `true` si **todos** cumplen, `false` si **al menos uno** no cumple."],
		queEs: [
			"Es un método iterativo de arrays que forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
			"Ejecuta el callback sobre cada elemento y es **inmutable**: no modifica el array original.",
			"Es el opuesto lógico de `some()`."
		],
		paraQueSirve: [
			"Validar que todos los elementos cumplan una regla.",
			"Comprobar permisos y validar formularios.",
			"Revisar estados de datos antes de ejecutar una acción."
		],
		comoFunciona: [
			"Recorre el array elemento por elemento.",
			"Ejecuta el callback para cada elemento.",
			"**Cortocircuito:** si un elemento devuelve `false`, se detiene de inmediato y devuelve `false`.",
			"Si todos devuelven `true`, el resultado es `true`.",
			"En un **array vacío** devuelve `true` (ningún elemento contradice la condición)."
		],
		sintaxis: [{ code: `const todosCumplen = array.every((elemento, indice, array) => {
  return condicion;
}, thisArg);` }],
		nota: "**Parámetros:** `callback(elemento, indice, array)` y `thisArg` (opcional). **Retorno:** `true` si todos cumplen; `false` si alguno falla.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Todos cumplen",
				code: `const numeros = [5, 10, 20];
console.log(numeros.every(n => n > 0)); // true`
			},
			{
				titulo: "Ejemplo 2: Uno falla (cortocircuito)",
				code: `const numeros = [5, -2, 10];
console.log(numeros.every(n => n > 0)); // false

// 5 → true
// -2 → false ❌ se detiene aquí, el 10 ni se revisa`
			},
			{
				titulo: "Ejemplo 3: Validar usuarios activos",
				code: `const usuarios = [
  { nombre: "Ana", activo: true },
  { nombre: "Luis", activo: true }
];

console.log(usuarios.every(u => u.activo)); // true`
			},
			{
				titulo: "Ejemplo 4: Usando el índice y el array vacío",
				code: `console.log([10, 20, 30].every((n, i) => i < n)); // true
console.log([].every(v => v > 0));                // true (array vacío)`
			}
		],
		errores: [
			{
				texto: "**Confundir `every()` con `some()`:** `every` pregunta *¿todos cumplen?*; `some` pregunta *¿al menos uno cumple?*.",
				code: `[2, 4, 6].every(x => x % 2 === 0); // true
[1, 3, 4].some(x => x % 2 === 0);  // true`
			},
			{
				texto: "**Pensar que devuelve los elementos:** devuelve un booleano.",
				code: `[1, 2, 3].every(x => x > 0); // true  (no [1, 2, 3])`
			},
			{
				texto: "**No devolver una condición en el callback:** con llaves y sin `return`, el callback devuelve `undefined` (falsy) y el resultado es `false`.",
				code: `// ❌ false
numeros.every(n => { n > 0; });

// ✅ Correcto
numeros.every(n => { return n > 0; });`
			},
			"**Olvidar el caso del array vacío:** `[].every(...)` siempre es `true`; si no quieres eso, comprueba `length` antes."
		],
		casos: [
			{
				texto: "**Validación de formularios:**",
				code: `const completos = campos.every(campo => campo.length > 0);`
			},
			{
				texto: "**Permisos:**",
				code: `const tieneTodo = requeridos.every(p => usuario.permisos.includes(p));`
			},
			{
				texto: "**Sistemas de compra:**",
				code: `const disponibles = productos.every(p => p.stock > 0);`
			}
		],
		relacion: [
			"**`some()`:** ¿alguno cumple?",
			"**`filter()`:** obtiene los elementos que cumplen.",
			"**`find()`:** encuentra el primer elemento que cumple.",
			"**`includes()`:** busca la existencia de un valor exacto.",
			"**`forEach()`:** ejecuta una función por elemento, sin devolver nada."
		],
		analogia: "Imagina una profesora revisando exámenes y preguntándose **\"¿todos los alumnos aprobaron?\"**. Revisa uno por uno: Ana aprobó ✅, Luis aprobó ✅, Pedro desaprobó ❌. En cuanto aparece Pedro ya sabe que la respuesta es `false`: **no todos aprobaron**, y no necesita revisar al resto.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve every()?",
				opciones: [
					"El primer elemento que cumple",
					"Un booleano",
					"Un nuevo array",
					"El índice"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve [].every(x => x > 0)?",
				opciones: [
					"false",
					"undefined",
					"true",
					"Un error"
				],
				correcta: 2
			},
			{
				id: 3,
				pregunta: "¿Qué pasa cuando every() encuentra un elemento que no cumple?",
				opciones: [
					"Sigue recorriendo",
					"Se detiene y devuelve false",
					"Lo elimina",
					"Lanza un error"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Qué devuelve [5, -2, 10].every(n => n > 0)?",
				opciones: [
					"true",
					"false",
					"[5, 10]",
					"-2"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Cuál es la diferencia entre every() y some()?",
				opciones: [
					"every: ¿todos cumplen? some: ¿al menos uno cumple?",
					"Son iguales",
					"some es más lento",
					"every modifica el array"
				],
				correcta: 0
			},
			{
				id: 6,
				pregunta: "¿every() modifica el array original?",
				opciones: [
					"Sí",
					"No",
					"Solo con números",
					"Depende del callback"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Qué devuelve [10, 20, 30].every((n, i) => i < n)?",
				opciones: [
					"false",
					"true",
					"undefined",
					"Un error"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "¿Por qué numeros.every(n => { n > 0; }) da false?",
				opciones: [
					"Porque falta el return y el callback devuelve undefined",
					"Porque every no acepta llaves",
					"Porque n es negativo",
					"Porque el array está vacío"
				],
				correcta: 0
			}
		]
	}
};
// src/data/metodosStrings.js
var Q$2 = (rows) => rows.map(([pregunta, opciones, correcta], i) => ({
	id: i + 1,
	pregunta,
	opciones,
	correcta
}));
var METODOS_STRINGS_DOCS = {
	raw: {
		id: "raw",
		titulo: "String.raw()",
		simulador: "string",
		definicion: ["Es un **método estático** de `String` que devuelve el texto de un *template literal* **sin procesar las secuencias de escape**."],
		queEs: [
			"Normalmente JavaScript interpreta los escapes: `\\n` se convierte en un salto de línea.",
			"Con `String.raw` se conserva literalmente: quedan los dos caracteres `\\` y `n`.",
			"Se usa como **etiqueta** (*tag*) pegada a un template literal.",
			"La idea clave: **obtiene el texto «crudo» (raw), respetando las barras invertidas escritas.**"
		],
		paraQueSirve: [
			"**Rutas de archivos** de Windows (`C:\\Users\\...`).",
			"**Expresiones regulares** con muchas barras invertidas.",
			"Textos donde quieres conservar los `\\` tal cual.",
			"Cadenas con muchos caracteres de escape."
		],
		comoFunciona: [
			"Se escribe `String.raw` pegado a un template literal (con comillas invertidas).",
			"JavaScript le entrega las partes literales en su versión **raw** (sin interpretar escapes).",
			"Las interpolaciones `${...}` **sí** se sustituyen.",
			"Devuelve un `string` con todo unido."
		],
		sintaxis: [{
			caption: "Uso habitual (como tag):",
			code: `String.raw\`template literal\``
		}, {
			caption: "Como función normal (rara vez se usa): recibe un objeto con la propiedad raw:",
			code: `String.raw(strings, ...sustituciones);

String.raw({ raw: ["Hola", "Mundo"] }, "-"); // "Hola-Mundo"`
		}],
		nota: "**Retorno:** un `string`. En el uso habitual **no escribes los parámetros**: JavaScript los pasa solo.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Con \\n",
				code: `const texto = String.raw\`\\n\`;
console.log(texto); // \\n  (dos caracteres: barra y n)

console.log("\\n");  // salto de línea real`
			},
			{
				titulo: "Ejemplo 2: Con una ruta de Windows",
				code: `const ruta = String.raw\`C:\\Users\\Josue\\Documentos\`;
console.log(ruta); // C:\\Users\\Josue\\Documentos

// Sin String.raw habría que duplicar cada barra:
const ruta2 = "C:\\\\Users\\\\Josue\\\\Documentos";`
			},
			{
				titulo: "Ejemplo 3: Con interpolación",
				descripcion: "El `\\n` se queda literal, pero `${nombre}` sí se sustituye.",
				code: `const nombre = "Josue";
const texto = String.raw\`Hola\\n\${nombre}\`;

console.log(texto); // Hola\\nJosue`
			},
			{
				titulo: "Ejemplo 4: Para una expresión regular",
				code: `const patron = String.raw\`\\d+\\.\\d+\`;
console.log(patron); // \\d+\\.\\d+

console.log(new RegExp(patron).test("3.14")); // true`
			}
		],
		errores: [
			{
				texto: "**Pensar que `String.raw` elimina las barras `\\`:** hace justo lo contrario, las conserva.",
				code: `String.raw\`\\n\`; // "\\n" (dos caracteres), no un salto de línea`
			},
			{ texto: "**Confundirlo con `JSON.stringify()`:** `String.raw` trabaja con *template literals* y escapes; `JSON.stringify` convierte datos a texto JSON." },
			{
				texto: "**Llamarlo con comillas normales:** necesita un template literal (o un objeto con `raw`).",
				code: `String.raw("\\\\n"); // ❌ TypeError
String.raw\`\\n\`;      // ✅`
			},
			{
				texto: "**Terminar el template con una barra:** la `\\` final escapa la comilla invertida de cierre.",
				code: `String.raw\`C:\\Users\\\`; // ❌ SyntaxError
String.raw\`C:\\Users\` + "\\\\"; // ✅`
			}
		],
		casos: [{
			texto: "**Rutas de Windows:**",
			code: `const ruta = String.raw\`C:\\Users\\Josue\\Desktop\\proyecto\`;`
		}, {
			texto: "**Patrones con muchas barras:**",
			code: `const patron = String.raw\`\\d+\\.\\d+\`; // conserva \\d+\\.\\d+`
		}],
		relacion: [
			"**Template literals:** `String.raw` solo funciona como etiqueta de uno.",
			"**`String.fromCharCode()`:** crea texto desde códigos UTF-16.",
			"**`String.fromCodePoint()`:** crea texto desde code points Unicode.",
			"**`JSON.stringify()`:** otro mundo: convierte datos a JSON."
		],
		analogia: "Imagina que JavaScript es un **traductor**. Si le entregas `\\n`, normalmente dice: *«eso significa salto de línea»*. Con `String.raw` le dices: **«no interpretes el mensaje; dame exactamente los caracteres que están escritos»**.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: ["**Regla para memorizar:** `String.raw` = *«dame el template literal en bruto»*. `String.raw` + `\\n` da `\\n`, **no** un salto de línea."],
		quiz: Q$2([
			[
				"¿Qué devuelve String.raw`\\n`?",
				[
					"Un salto de línea",
					"Los dos caracteres \\ y n",
					"undefined",
					"Un error"
				],
				1
			],
			[
				"¿Qué tipo de método es String.raw()?",
				[
					"De instancia",
					"Estático",
					"Una propiedad",
					"Un getter"
				],
				1
			],
			[
				"¿Qué pasa con las interpolaciones ${...} dentro de String.raw?",
				[
					"Se ignoran",
					"Se sustituyen normalmente",
					"Lanzan error",
					"Se convierten en \\${}"
				],
				1
			],
			[
				"¿Para qué es muy útil String.raw?",
				[
					"Ordenar arrays",
					"Rutas de Windows y regex con muchas barras invertidas",
					"Repetir texto",
					"Validar emojis"
				],
				1
			],
			[
				"¿Qué resultado da String.raw`Hola\\n${'Josue'}`?",
				[
					"Hola\\nJosue",
					"Hola⏎Josue (con salto de línea real)",
					"HolaJosue",
					"Un error"
				],
				0
			],
			[
				"¿String.raw elimina las barras invertidas?",
				[
					"Sí, siempre",
					"No, las conserva",
					"Solo las dobles",
					"Solo en rutas"
				],
				1
			],
			[
				"¿Qué pasa con String.raw`C:\\Users\\`?",
				[
					"Funciona bien",
					"SyntaxError, la barra final escapa la comilla de cierre",
					"Devuelve undefined",
					"Devuelve C:"
				],
				1
			],
			[
				"¿Es lo mismo String.raw que JSON.stringify?",
				[
					"Sí",
					"No: raw conserva escapes de un template; stringify convierte datos a JSON",
					"Solo con objetos",
					"Solo con números"
				],
				1
			]
		])
	},
	codepointat: {
		id: "codepointat",
		titulo: "String.prototype.codePointAt()",
		simulador: "string",
		definicion: ["Método de `String` que devuelve el **valor Unicode (code point)** del carácter que **comienza** en una posición específica de la cadena."],
		queEs: [
			"Permite obtener el **código Unicode** de un carácter dado su índice.",
			"A diferencia de `charCodeAt()`, representa correctamente caracteres que ocupan **dos unidades UTF-16**, como muchos emojis.",
			"Su pareja natural es `String.fromCodePoint()` (hace el camino inverso)."
		],
		paraQueSirve: [
			"Obtener el valor Unicode de un carácter.",
			"Trabajar con caracteres fuera del **Basic Multilingual Plane (BMP)**.",
			"Analizar emojis y otros caracteres con **pares sustitutos** (*surrogate pairs*).",
			"Convertir luego el número a carácter con `String.fromCodePoint()`."
		],
		comoFunciona: [
			"Recibe un **índice** (empieza en `0`).",
			"Busca la unidad de código UTF-16 que comienza en esa posición.",
			"Si es la primera mitad de un **par sustituto** y a continuación viene la segunda mitad, combina las dos unidades.",
			"Devuelve el valor como número. Si el índice está fuera de rango, devuelve `undefined`."
		],
		sintaxis: [{ code: `cadena.codePointAt(indice);` }],
		nota: "**Parámetro:** `indice` (número, base 0). **Retorno:** un `number` (el code point) o `undefined` si el índice no existe. ⚠️ JavaScript usa **UTF-16**: un emoji como `😀` tiene `length` 2, y `codePointAt(1)` devuelve solo la mitad baja (`56832`).",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Una letra",
				code: `"A".codePointAt(0); // 65   (U+0041)
"a".codePointAt(0); // 97`
			},
			{
				titulo: "Ejemplo 2: Un emoji",
				code: `"😀".codePointAt(0); // 128512  (U+1F600)`
			},
			{
				titulo: "Ejemplo 3: Varios caracteres",
				code: `const texto = "ABC";
console.log(texto.codePointAt(0)); // 65
console.log(texto.codePointAt(1)); // 66
console.log(texto.codePointAt(2)); // 67`
			},
			{
				titulo: "Ejemplo 4: length e índices con un emoji",
				code: `const emoji = "😀";
console.log(emoji.length);          // 2
console.log(emoji.codePointAt(0));  // 128512
console.log(emoji.codePointAt(1));  // 56832 (solo la mitad baja)`
			},
			{
				titulo: "Ejemplo 5: Ida y vuelta con fromCodePoint()",
				code: `const codigo = "😀".codePointAt(0);
console.log(codigo);                       // 128512
console.log(String.fromCodePoint(codigo)); // "😀"`
			}
		],
		errores: [
			{
				texto: "**Confundirlo con `charCodeAt()`:**",
				code: `"😀".charCodeAt(0);  // 55357  (solo una unidad UTF-16)
"😀".codePointAt(0); // 128512 (code point completo)`
			},
			"**Confundir `length` con la cantidad de caracteres:** `\"😀\".length` es `2`, aunque visualmente sea uno.",
			{
				texto: "**Usar un índice inexistente:**",
				code: `"Hola".codePointAt(20); // undefined`
			},
			{
				texto: "**Recorrer un emoji por índices:** para recorrer caracteres completos usa `for...of`.",
				code: `for (const caracter of "A😀B") {
  console.log(caracter, caracter.codePointAt(0));
}`
			}
		],
		casos: [
			"Procesamiento de Unicode y texto internacional.",
			"Análisis de emojis.",
			"Conversión entre caracteres y valores Unicode.",
			"Algoritmos que necesitan trabajar con code points."
		],
		relacion: [
			"**`fromCodePoint()`:** code point → carácter (la pareja).",
			"**`charCodeAt()`:** carácter → unidad UTF-16.",
			"**`fromCharCode()`:** unidades UTF-16 → cadena.",
			{
				texto: "**Resumen de parejas:**",
				code: `codePointAt()  ↔ fromCodePoint()   // code points Unicode
charCodeAt()   ↔ fromCharCode()    // unidades UTF-16`
			}
		],
		analogia: "Imagina que cada carácter tiene un **DNI universal** 🌎. `codePointAt()` es decir: **«dime el DNI Unicode del carácter que está en esta posición»**. El DNI de `😀` es `128512`.",
		fuente: "MDN Web Docs | String.prototype.codePointAt()",
		notasPersonales: ["**Idea para recordar:** `codePointAt()` = *obtener el número Unicode de un carácter*. Su pareja: `fromCodePoint()` = *convertir un número Unicode en carácter*."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'A'.codePointAt(0)?",
				[
					"'A'",
					"65",
					"97",
					"undefined"
				],
				1
			],
			[
				"¿Qué devuelve '😀'.codePointAt(0)?",
				[
					"55357",
					"128512",
					"2",
					"56832"
				],
				1
			],
			[
				"¿Qué devuelve 'Hola'.codePointAt(20)?",
				[
					"NaN",
					"0",
					"undefined",
					"Un error"
				],
				2
			],
			[
				"¿Cuál es el length de '😀'?",
				[
					"1",
					"2",
					"4",
					"0"
				],
				1
			],
			[
				"¿Qué diferencia hay con charCodeAt() en un emoji?",
				[
					"Ninguna",
					"codePointAt devuelve el code point completo; charCodeAt solo una unidad UTF-16",
					"charCodeAt es más moderno",
					"codePointAt devuelve un string"
				],
				1
			],
			[
				"¿Qué método hace el camino inverso (número → carácter)?",
				[
					"charAt()",
					"fromCodePoint()",
					"at()",
					"toString()"
				],
				1
			],
			[
				"¿Qué devuelve '😀'.codePointAt(1)?",
				[
					"128512",
					"undefined",
					"56832",
					"55357"
				],
				2
			],
			[
				"¿Cómo recorres caracteres completos (sin partir emojis)?",
				[
					"for (i...length)",
					"for...of",
					"while con length",
					"forEach"
				],
				1
			]
		])
	},
	charcodeat: {
		id: "charcodeat",
		titulo: "String.prototype.charCodeAt()",
		simulador: "string",
		definicion: ["Método de los strings que devuelve el **código Unicode UTF-16 (número entero)** de la unidad de código ubicada en una posición específica."],
		queEs: [
			"Es un método nativo antiguo de JavaScript (desde ES1).",
			"Te dice **«en qué número está representado ese carácter»**.",
			"Devuelve un valor entre `0` y `65535` (una *unidad de código* UTF-16)."
		],
		paraQueSirve: [
			"Obtener el **valor numérico** de un carácter.",
			"**Comparar caracteres** por su código.",
			"**Validar rangos** (mayúscula, minúscula, número...).",
			"Algoritmos de criptografía o codificación sencilla.",
			"Generar texto en combinación con `fromCharCode()`."
		],
		comoFunciona: [
			"Toma un índice (base 0). Si no se indica, usa `0`.",
			"Si el índice es válido, devuelve el código de la unidad en esa posición.",
			"Si es inválido (menor que 0 o mayor/igual a `length`), devuelve `NaN`.",
			"Con emojis y caracteres fuera del BMP devuelve **solo una mitad** del par sustituto: para eso existe `codePointAt()`."
		],
		sintaxis: [{ code: `cadena.charCodeAt(indice);` }],
		nota: "**Parámetro:** `indice` (opcional, por defecto `0`). **Retorno:** un `number` de 0 a 65535, o `NaN` si el índice no es válido.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Básico",
				code: `const texto = "Hola";
console.log(texto.charCodeAt(0)); // 72  (H)
console.log(texto.charCodeAt(1)); // 111 (o)
console.log(texto.charCodeAt(2)); // 108 (l)
console.log(texto.charCodeAt(3)); // 97  (a)`
			},
			{
				titulo: "Ejemplo 2: Sin índice y fuera de rango",
				code: `console.log("Hola".charCodeAt());   // 72 (usa 0 por defecto)
console.log("Hola".charCodeAt(10)); // NaN`
			},
			{
				titulo: "Ejemplo 3: Códigos útiles",
				code: `" ".charCodeAt(0); // 32
"0".charCodeAt(0); // 48
"A".charCodeAt(0); // 65
"a".charCodeAt(0); // 97
"ñ".charCodeAt(0); // 241`
			},
			{
				titulo: "Ejemplo 4: Emojis (¡ojo!)",
				code: `console.log("😂".charCodeAt(0));   // 55357 (parte alta del par)
console.log("😂".charCodeAt(1));   // 56834 (parte baja del par)
console.log("😂".codePointAt(0));  // 128514 (código completo)`
			}
		],
		errores: [
			{
				texto: "**Confundir `charCodeAt()` con `codePointAt()`:**",
				code: `"😂".charCodeAt(0);  // 55357  ❌ incompleto
"😂".codePointAt(0); // 128514 ✅ completo`
			},
			{
				texto: "**No validar el índice:** `NaN` es *falsy*, pero lo correcto es comprobar con `isNaN()`.",
				code: `const codigo = "Hola".charCodeAt(10);
if (!isNaN(codigo)) {
  // seguro de usar
}`
			},
			{
				texto: "**Creer que devuelve el carácter:** devuelve el número. Para el carácter usa `charAt()` o corchetes.",
				code: `"Hola".charCodeAt(0); // 72
"Hola"[0];            // "H"`
			},
			"**Los índices empiezan en 0:** en `\"Hola\"`, `charCodeAt(4)` es `NaN` y el último es `charCodeAt(3)`."
		],
		casos: [
			{
				texto: "**Verificar si es mayúscula:**",
				code: `function esMayuscula(letra) {
  const codigo = letra.charCodeAt(0);
  return codigo >= 65 && codigo <= 90;
}
esMayuscula("A"); // true
esMayuscula("a"); // false`
			},
			{
				texto: "**Verificar si es un número:**",
				code: `function esNumero(c) {
  const codigo = c.charCodeAt(0);
  return codigo >= 48 && codigo <= 57;
}
esNumero("5"); // true`
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
checksum("Hola"); // 388`
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
aMinuscula("A"); // "a"`
			}
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
fromCodePoint(n)  → string                ✅ emojis`
			}
		],
		analogia: "Imagina un **diccionario numérico** para caracteres. Tienes un libro (el string) y una página (el índice). Le preguntas: *«¿qué número le corresponde a la letra de esta página?»*. `charCodeAt()` te da ese número, el **DNI** del carácter, y `String.fromCharCode()` hace lo inverso.",
		fuente: "MDN Web Docs | ECMAScript Specification | Unicode Standard",
		notasPersonales: ["**Rangos útiles:** `0-127` coincide con ASCII. `65-90` = mayúsculas (A-Z), `97-122` = minúsculas (a-z), `48-57` = números (0-9), `32` = espacio.", "**IMPORTANTE:** para emojis y caracteres complejos usa `codePointAt()`."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'Hola'.charCodeAt(0)?",
				[
					"72",
					"104",
					"'H'",
					"0"
				],
				0
			],
			[
				"¿Qué devuelve 'Hola'.charCodeAt(10)?",
				[
					"undefined",
					"0",
					"NaN",
					"-1"
				],
				2
			],
			[
				"¿Qué devuelve 'Hola'.charCodeAt() sin argumentos?",
				[
					"NaN",
					"72",
					"El último código",
					"Un error"
				],
				1
			],
			[
				"¿Qué rango de valores devuelve charCodeAt()?",
				[
					"0 a 255",
					"0 a 65535",
					"0 a 1114111",
					"-1 a 127"
				],
				1
			],
			[
				"¿Qué devuelve '😂'.charCodeAt(0)?",
				[
					"128514",
					"55357",
					"1",
					"NaN"
				],
				1
			],
			[
				"¿Qué método usas para emojis en lugar de charCodeAt()?",
				[
					"charAt()",
					"codePointAt()",
					"at()",
					"indexOf()"
				],
				1
			],
			[
				"¿Qué rango de códigos corresponde a las mayúsculas A-Z?",
				[
					"48-57",
					"65-90",
					"97-122",
					"32-64"
				],
				1
			],
			[
				"¿Cuál es el inverso de charCodeAt()?",
				[
					"String.fromCharCode()",
					"charAt()",
					"padStart()",
					"String.raw()"
				],
				0
			]
		])
	},
	fromcharcode: {
		id: "fromcharcode",
		titulo: "String.fromCharCode()",
		simulador: "string",
		definicion: ["Método estático de `String` que crea una cadena a partir de uno o varios **valores de unidades de código UTF-16**."],
		queEs: [
			"Hace prácticamente el proceso inverso de `charCodeAt()`: **código UTF-16 → carácter**.",
			"El número `65` representa la letra `A`.",
			"⚠️ Trabaja con **unidades de código UTF-16**, no con code points completos. Para eso existe `String.fromCodePoint()`."
		],
		paraQueSirve: [
			"Crear caracteres a partir de sus valores UTF-16.",
			"Convertir códigos numéricos en texto.",
			"Construir cadenas mediante códigos de caracteres.",
			"Ejercicios de Unicode y codificación de texto."
		],
		comoFunciona: [
			"Recibe uno o varios números.",
			"Cada número se convierte en **una** unidad de código UTF-16 (se toman solo sus **16 bits** bajos).",
			"Todas las unidades se unen en una sola cadena.",
			"Devuelve un `string`."
		],
		sintaxis: [{ code: `String.fromCharCode(num1, num2, ...);` }],
		nota: "**Parámetros:** uno o varios números (unidades UTF-16). **Retorno:** un `string`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Una letra",
				code: `String.fromCharCode(65); // "A"`
			},
			{
				titulo: "Ejemplo 2: Una palabra",
				code: `String.fromCharCode(72, 111, 108, 97); // "Hola"

// 72 → H, 111 → o, 108 → l, 97 → a`
			},
			{
				titulo: "Ejemplo 3: Ida y vuelta con charCodeAt()",
				code: `const letra = "A";
const codigo = letra.charCodeAt(0);        // 65
const resultado = String.fromCharCode(codigo); // "A"`
			},
			{
				titulo: "Ejemplo 4: Con un array usando spread",
				code: `const codigos = [72, 111, 108, 97];
const texto = String.fromCharCode(...codigos);
console.log(texto); // "Hola"`
			}
		],
		errores: [{
			texto: "**Confundirlo con `String.fromCodePoint()`:**",
			code: `String.fromCharCode(0x1F600);  // ❌ no da 😀: se trunca a 16 bits (U+F600)
String.fromCodePoint(0x1F600); // ✅ "😀"`,
			nota: "`fromCharCode()` → unidades UTF-16. `fromCodePoint()` → code points Unicode."
		}, "**Pensar que cualquier número Unicode funciona:** `fromCharCode()` trabaja con 16 bits. Para caracteres que requieren dos unidades usa `fromCodePoint()` o entrega manualmente el par sustituto."],
		casos: [
			"Conversión de códigos UTF-16 a texto.",
			"Construcción programática de cadenas.",
			"APIs o datos que entregan unidades de código.",
			"Ejercicios de Unicode y codificación."
		],
		relacion: [{
			texto: "**Familia de cuatro métodos:**",
			code: `charCodeAt()    ↔ fromCharCode()    // unidades UTF-16
codePointAt()   ↔ fromCodePoint()   // code points Unicode`
		}, "**Regla rápida:** *Code Point* → `fromCodePoint()`; *Code Unit* → `fromCharCode()`."],
		analogia: "Cada carácter tiene un **número de identificación**. `charCodeAt()` pregunta: *«¿cuál es el número de esta pieza?»*. `fromCharCode()` hace lo contrario: *«tengo el número 65, ¿qué carácter representa?»* → `\"A\"`.",
		fuente: "MDN Web Docs | String.fromCharCode()",
		notasPersonales: ["**Para memorizarlo:** `charCodeAt()` → carácter → código. `fromCharCode()` → código → carácter."],
		quiz: Q$2([
			[
				"¿Qué devuelve String.fromCharCode(65)?",
				[
					"65",
					"'A'",
					"'a'",
					"undefined"
				],
				1
			],
			[
				"¿Qué devuelve String.fromCharCode(72, 111, 108, 97)?",
				[
					"'7211110897'",
					"'Hola'",
					"['H','o','l','a']",
					"Un error"
				],
				1
			],
			[
				"¿Con qué trabaja fromCharCode()?",
				[
					"Code points Unicode completos",
					"Unidades de código UTF-16",
					"Bytes UTF-8",
					"Índices"
				],
				1
			],
			[
				"¿Qué método es su inverso?",
				[
					"charCodeAt()",
					"padEnd()",
					"repeat()",
					"trim()"
				],
				0
			],
			[
				"¿Qué pasa con String.fromCharCode(0x1F600)?",
				[
					"Devuelve 😀",
					"Se trunca a 16 bits y no da el emoji",
					"Lanza RangeError",
					"Devuelve ''"
				],
				1
			],
			[
				"¿Qué método usas para crear 😀 desde su número?",
				[
					"String.fromCharCode",
					"String.fromCodePoint",
					"String.raw",
					"charAt"
				],
				1
			],
			[
				"¿Cómo conviertes [72, 111, 108, 97] a texto?",
				[
					"String.fromCharCode(...codigos)",
					"String.fromCharCode(codigos)",
					"codigos.toString()",
					"String.raw(codigos)"
				],
				0
			],
			[
				"Regla rápida: Code Unit →",
				[
					"fromCodePoint()",
					"fromCharCode()",
					"raw()",
					"repeat()"
				],
				1
			]
		])
	},
	fromcodepoint: {
		id: "fromcodepoint",
		titulo: "String.fromCodePoint()",
		simulador: "string",
		definicion: ["Método estático de `String` que convierte uno o varios **code points Unicode** en una cadena de texto."],
		queEs: [
			"Recibe números que representan **code points Unicode** y devuelve los caracteres correspondientes.",
			"`128512` es el valor decimal del code point `U+1F600` (😀).",
			"Es especialmente útil para caracteres fuera del **Basic Multilingual Plane (BMP)**, como muchos emojis."
		],
		paraQueSirve: [
			"Convertir un **code point Unicode → carácter**.",
			"Crear emojis y otros caracteres mediante su valor numérico.",
			"Reconstruir caracteres obtenidos con `codePointAt()`.",
			"Crear cadenas a partir de varios code points."
		],
		comoFunciona: [
			"Recibe uno o varios valores Unicode.",
			"Valida que cada uno esté en el rango `0x000000` → `0x10FFFF`.",
			"Convierte cada code point en su carácter (si es mayor que `0xFFFF` usa **dos** unidades UTF-16).",
			"Une todo y devuelve un `string`."
		],
		sintaxis: [{ code: `String.fromCodePoint(num1, num2, ...);` }],
		nota: "**Parámetros:** uno o varios números entre `0` y `0x10FFFF`. **Retorno:** un `string`. Fuera de rango lanza `RangeError`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Una letra",
				code: `String.fromCodePoint(65); // "A"`
			},
			{
				titulo: "Ejemplo 2: Un emoji (hexadecimal o decimal)",
				code: `String.fromCodePoint(0x1F600); // "😀"
String.fromCodePoint(128512);  // "😀"`
			},
			{
				titulo: "Ejemplo 3: Una palabra",
				code: `String.fromCodePoint(72, 111, 108, 97); // "Hola"`
			},
			{
				titulo: "Ejemplo 4: Ida y vuelta con codePointAt()",
				code: `const emoji = "😀";
const codigo = emoji.codePointAt(0);       // 128512
const resultado = String.fromCodePoint(codigo); // "😀"`
			},
			{
				titulo: "Ejemplo 5: Varios emojis",
				code: `const texto = String.fromCodePoint(0x1F600, 0x1F602, 0x1F60D);
console.log(texto); // "😀😂😍"`
			}
		],
		errores: [
			{
				texto: "**Confundirlo con `fromCharCode()`:**",
				code: `String.fromCharCode(0x1F600);  // ❌ no produce 😀
String.fromCodePoint(0x1F600); // ✅ "😀"`
			},
			"**Confundir code point con índice:** `String.fromCodePoint(128512)` no significa *«busca la posición 128512»*, sino *«construye el carácter cuyo code point es 128512»*.",
			{
				texto: "**Usar un número fuera del rango Unicode:** el máximo es `U+10FFFF`.",
				code: `String.fromCodePoint(0x110000); // ❌ RangeError`
			}
		],
		casos: [
			"Crear emojis mediante Unicode.",
			"Procesar texto internacional.",
			"Convertir valores obtenidos con `codePointAt()`.",
			"Construir cadenas dinámicamente.",
			"Procesamiento de caracteres fuera del BMP."
		],
		relacion: [
			{
				texto: "**Las parejas a memorizar:**",
				code: `codePointAt()  ↔ fromCodePoint()
charCodeAt()   ↔ fromCharCode()`
			},
			"**`codePointAt()`:** carácter → code point (el inverso).",
			"**`fromCharCode()`:** trabaja con unidades UTF-16 y no sirve para emojis directamente."
		],
		analogia: "Cada carácter tiene un **código de identificación universal**. `codePointAt()` pregunta: *«¿cuál es el código de este carácter?»*. `fromCodePoint()` hace el camino inverso: *«tengo este código, dame el carácter»*. `128512` → 😀.",
		fuente: "MDN Web Docs | String.fromCodePoint()",
		notasPersonales: ["**En una frase:** `String.fromCodePoint()` convierte un code point Unicode en su carácter correspondiente."],
		quiz: Q$2([
			[
				"¿Qué devuelve String.fromCodePoint(128512)?",
				[
					"'128512'",
					"'😀'",
					"'A'",
					"Un error"
				],
				1
			],
			[
				"¿Cuál es el máximo code point válido?",
				[
					"0xFFFF",
					"0x10FFFF",
					"0xFFFFFF",
					"255"
				],
				1
			],
			[
				"¿Qué pasa con String.fromCodePoint(0x110000)?",
				[
					"Devuelve ''",
					"Devuelve '?'",
					"Lanza RangeError",
					"Devuelve undefined"
				],
				2
			],
			[
				"¿Qué método es su pareja natural?",
				[
					"codePointAt()",
					"charAt()",
					"padStart()",
					"slice()"
				],
				0
			],
			[
				"¿Qué devuelve String.fromCodePoint(72, 111, 108, 97)?",
				[
					"'Hola'",
					"'H'",
					"[72,111,108,97]",
					"Un error"
				],
				0
			],
			[
				"¿Qué diferencia tiene con fromCharCode()?",
				[
					"Ninguna",
					"fromCodePoint usa code points Unicode; fromCharCode unidades UTF-16",
					"fromCharCode es más moderno",
					"fromCodePoint devuelve un array"
				],
				1
			],
			[
				"¿Qué significa String.fromCodePoint(128512)?",
				[
					"Busca la posición 128512",
					"Construye el carácter con ese code point",
					"Repite 128512 veces",
					"Devuelve el length"
				],
				1
			],
			[
				"¿Qué devuelve String.fromCodePoint(0x1F600, 0x1F602)?",
				[
					"'😀😂'",
					"'😂😀'",
					"Un error",
					"'1F6001F602'"
				],
				0
			]
		])
	},
	repeat: {
		id: "repeat",
		titulo: "String.prototype.repeat()",
		simulador: "string",
		definicion: ["Método de `String.prototype` que devuelve **una nueva cadena** formada por la repetición de la cadena original un número determinado de veces."],
		queEs: [
			"Es un método heredado de `String.prototype`.",
			"Forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
			"**No modifica la cadena original**: como los strings son *inmutables*, siempre devuelve uno nuevo."
		],
		paraQueSirve: [
			"Repetir un texto varias veces.",
			"Crear líneas o separadores.",
			"Generar patrones de texto.",
			"Rellenar contenido de forma sencilla.",
			"Mostrar barras de progreso simples."
		],
		comoFunciona: [
			"Se llama sobre una cadena.",
			"Se indica cuántas veces debe repetirse.",
			"JavaScript concatena la cadena consigo misma esa cantidad de veces.",
			"Devuelve una nueva cadena; la original permanece sin cambios."
		],
		sintaxis: [{ code: `cadena.repeat(cantidad);` }],
		nota: "**Parámetro:** `cantidad`, entero mayor o igual que `0`. **Retorno:** un `string`. Negativo o `Infinity` lanza `RangeError`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Repetir una palabra",
				code: `const texto = "Hola ";
console.log(texto.repeat(3)); // "Hola Hola Hola "`
			},
			{
				titulo: "Ejemplo 2: Repetir un carácter",
				code: `console.log("*".repeat(10)); // "**********"`
			},
			{
				titulo: "Ejemplo 3: Línea divisoria",
				code: `console.log("-".repeat(30)); // "------------------------------"`
			},
			{
				titulo: "Ejemplo 4: Repetir un emoji",
				code: `console.log("🎉".repeat(5)); // "🎉🎉🎉🎉🎉"`
			},
			{
				titulo: "Ejemplo 5: La cadena original no cambia",
				code: `const saludo = "Hi";
const nuevo = saludo.repeat(2);

console.log(saludo); // "Hi"
console.log(nuevo);  // "HiHi"`
			}
		],
		errores: [
			{
				texto: "**Pensar que modifica la cadena original:**",
				code: `let texto = "Hola";
texto.repeat(3);
console.log(texto); // "Hola"

// Hay que guardar el resultado:
texto = texto.repeat(3);`
			},
			{
				texto: "**Usar un número negativo:**",
				code: `"Hola".repeat(-1); // ❌ RangeError`
			},
			{
				texto: "**Usar `Infinity`:**",
				code: `"Hola".repeat(Infinity); // ❌ RangeError`
			},
			{
				texto: "**Pasar texto como cantidad:** `\"abc\"` se convierte en `NaN`, que se trata como `0`, y el resultado es una cadena vacía.",
				code: `"Hola".repeat("abc"); // ""`
			},
			{
				texto: "**Olvidar los paréntesis:** devuelve la referencia, no ejecuta.",
				code: `texto.repeat; // [Function: repeat]`
			}
		],
		casos: [
			"Crear separadores visuales.",
			"Generar patrones de texto.",
			"Rellenar cadenas.",
			"Mostrar barras de progreso simples.",
			{
				texto: "**Barra de progreso:**",
				code: `const progreso = 6;
console.log("█".repeat(progreso) + "░".repeat(10 - progreso)); // ██████░░░░`
			}
		],
		relacion: [
			"**`padStart()`:** rellena una cadena al inicio.",
			"**`padEnd()`:** rellena una cadena al final.",
			"**`concat()`:** une cadenas sin repetirlas automáticamente.",
			"**Inmutabilidad:** `repeat()` devuelve una cadena nueva."
		],
		analogia: "Imagina un **sello** con la palabra *«Hola»*. Cada vez que lo presionas sobre una hoja aparece una copia. `repeat(3)` → **HolaHolaHola**. El sello original nunca cambia; solo se usa para crear más copias.",
		fuente: "MDN Web Docs | ECMAScript Specification (String.prototype.repeat)",
		quiz: Q$2([
			[
				"¿Qué devuelve 'ab'.repeat(3)?",
				[
					"'ab'",
					"'ababab'",
					"['ab','ab','ab']",
					"'aaabbb'"
				],
				1
			],
			[
				"¿Qué devuelve 'Hola'.repeat(0)?",
				[
					"'Hola'",
					"undefined",
					"''",
					"Un error"
				],
				2
			],
			[
				"¿Qué pasa con 'Hola'.repeat(-1)?",
				[
					"Devuelve ''",
					"Lanza RangeError",
					"Devuelve 'aloH'",
					"Devuelve 'Hola'"
				],
				1
			],
			[
				"¿Qué pasa con 'Hola'.repeat(Infinity)?",
				[
					"Se cuelga",
					"Lanza RangeError",
					"Devuelve ''",
					"Devuelve 'Hola'"
				],
				1
			],
			[
				"¿repeat() modifica la cadena original?",
				[
					"Sí",
					"No, devuelve una nueva",
					"Solo si es let",
					"Solo con emojis"
				],
				1
			],
			[
				"¿Qué devuelve 'Hola'.repeat('abc')?",
				[
					"Un error",
					"''",
					"'Hola'",
					"'abc'"
				],
				1
			],
			[
				"¿Cómo haces una línea de 30 guiones?",
				[
					"'-'.repeat(30)",
					"'-' * 30",
					"'-'.fill(30)",
					"repeat('-', 30)"
				],
				0
			],
			[
				"¿Qué método rellena al inicio hasta una longitud?",
				[
					"padStart()",
					"repeat()",
					"concat()",
					"trim()"
				],
				0
			]
		])
	},
	iswellformed: {
		id: "iswellformed",
		titulo: "String.prototype.isWellFormed()",
		simulador: "string",
		definicion: ["Método built-in de JavaScript que verifica si una cadena está **bien formada** (*well-formed*): que **no contiene unidades de código Unicode desemparejadas** (*lone surrogates*)."],
		queEs: ["Una función de validación de integridad Unicode introducida en **ECMAScript 2023 (ES14)**.", "Devuelve un booleano (`true` o `false`) y permite saber si el texto se puede codificar de forma segura (UTF-8, JSON, URLs)."],
		paraQueSirve: ["**Validar antes de procesar o enviar:** funciones como `encodeURIComponent()` lanzan `URIError` con caracteres desemparejados.", "**Sanear datos de entrada:** detectar texto corrupto o fragmentos incompletos de emojis/símbolos complejos."],
		comoFunciona: [
			"JavaScript guarda los textos como secuencias **UTF-16**.",
			"Los caracteres complejos (la mayoría de emojis) se forman con **dos unidades** (un *surrogate pair*).",
			"Si una cadena contiene solo la mitad de esa pareja (*lone surrogate*), está mal formada.",
			"`isWellFormed()` recorre la cadena comprobando que cada mitad tenga su pareja."
		],
		sintaxis: [{ code: `cadena.isWellFormed();` }],
		nota: "**Parámetros:** ninguno. **Retorno:** `true` si no hay *lone surrogates*, `false` si hay al menos uno.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Cadenas bien formadas",
				code: `console.log("Hola mundo".isWellFormed());    // true
console.log("JavaScript 🚀".isWellFormed()); // true (el emoji tiene su par)`
			},
			{
				titulo: "Ejemplo 2: Detectar un lone surrogate",
				code: `// \\uD83D es la primera mitad de la pareja de un emoji
const malFormada = "Texto incompleto \\uD83D";

console.log(malFormada.isWellFormed()); // false`
			},
			{
				titulo: "Ejemplo 3: Evitar el error de encodeURIComponent()",
				code: `const textoUsuario = "Subida \\uD83D";

if (textoUsuario.isWellFormed()) {
  console.log(encodeURIComponent(textoUsuario));
} else {
  console.log("Error: la cadena contiene caracteres corruptos.");
}`
			}
		],
		errores: [
			"**Confundirlo con validar HTML o JSON:** `isWellFormed()` **no** comprueba etiquetas ni sintaxis JSON; solo valida la estructura **UTF-16** del texto.",
			"**Asumir soporte en entornos antiguos:** es de ES2023. Requiere Node.js 20+, Chrome 111+, Firefox 119+, Safari 16.4+.",
			{
				texto: "**Llamarlo sobre el resultado de `console.log()`:**",
				code: `console.log("Hola").isWellFormed(); // ❌ console.log devuelve undefined
"Hola".isWellFormed();               // ✅ true`
			}
		],
		casos: [
			"**Bases de datos:** prevenir errores en sistemas que exigen UTF-8 estricto.",
			"**APIs y redes:** validar textos antes de serializar a JSON o enviarlos por WebSocket/Fetch.",
			"**Middleware de validación** antes de procesar texto externo."
		],
		relacion: [
			"**`toWellFormed()`:** su hermano; en vez de verificar, **corrige** reemplazando los *lone surrogates* por `U+FFFD` (�).",
			"**`encodeURIComponent()`:** lanza `URIError` si la cadena no está bien formada.",
			"**UTF-16 y surrogate pairs:** el sistema con el que JavaScript representa los caracteres."
		],
		analogia: "Los caracteres complejos de UTF-16 son como **pares de calcetines** 🧦. Una cadena está bien formada cuando todos los calcetines tienen compañero. `isWellFormed()` echa un vistazo al cajón y te confirma si hay algún calcetín suelto.",
		fuente: "MDN Web Docs | ECMAScript 2023 (ECMA-262)",
		notasPersonales: ["Usar `isWellFormed()` en middleware de validación antes de llamar a APIs. Si devuelve `false`, aplicar `.toWellFormed()` para reparar el texto."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'Hola'.isWellFormed()?",
				[
					"true",
					"false",
					"undefined",
					"Un error"
				],
				0
			],
			[
				"¿Qué es un lone surrogate?",
				[
					"Un emoji completo",
					"Una mitad de par sustituto sin su pareja",
					"Un carácter ASCII",
					"Un salto de línea"
				],
				1
			],
			[
				"¿Qué devuelve ('a\\uD83D').isWellFormed()?",
				[
					"true",
					"false",
					"NaN",
					"Un error"
				],
				1
			],
			[
				"¿En qué versión de ECMAScript se introdujo?",
				[
					"ES5",
					"ES2015",
					"ES2023",
					"ES2010"
				],
				2
			],
			[
				"¿Qué lanza encodeURIComponent con un lone surrogate?",
				[
					"TypeError",
					"URIError",
					"RangeError",
					"Nada"
				],
				1
			],
			[
				"¿isWellFormed() valida que un JSON esté bien escrito?",
				[
					"Sí",
					"No, solo la estructura UTF-16",
					"Solo con objetos",
					"Solo en Node"
				],
				1
			],
			[
				"¿Cuál es su método hermano que repara la cadena?",
				[
					"toWellFormed()",
					"normalize()",
					"trim()",
					"fix()"
				],
				0
			],
			[
				"¿Qué parámetros recibe isWellFormed()?",
				[
					"Un índice",
					"Un callback",
					"Ninguno",
					"Un string"
				],
				2
			]
		])
	},
	towellformed: {
		id: "towellformed",
		titulo: "String.prototype.toWellFormed()",
		simulador: "string",
		definicion: ["Método built-in de JavaScript que devuelve una **nueva cadena** en la que cada unidad de código desemparejada (*lone surrogate*) es **reemplazada por el carácter de reemplazo Unicode `U+FFFD`** (�)."],
		queEs: ["La herramienta de **reparación y saneamiento** introducida en **ECMAScript 2023 (ES14)**.", "A diferencia de `isWellFormed()` (que solo comprueba), `toWellFormed()` **soluciona** el problema para que el texto se pueda procesar, serializar o transmitir sin errores."],
		paraQueSirve: [
			"**Reparar texto mal formado:** convertir cadenas corruptas en versiones válidas.",
			"**Garantizar la serialización:** evitar `URIError` en `encodeURIComponent()`.",
			"**Normalizar entradas** de fuentes externas no confiables (APIs, scraping, archivos corruptos) antes de guardarlas."
		],
		comoFunciona: [
			"Recorre la cadena buscando unidades *surrogate* de UTF-16.",
			"Si encuentra una **pareja válida**, la mantiene intacta.",
			"Si encuentra un *surrogate* sin pareja, lo sustituye por **`U+FFFD`** (�).",
			"Devuelve la nueva cadena; la original no cambia."
		],
		sintaxis: [{ code: `cadena.toWellFormed();` }],
		nota: "**Parámetros:** ninguno. **Retorno:** una **nueva** cadena bien formada.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Limpiar un lone surrogate",
				code: `// \\uD83D es la primera mitad incompleta de un emoji
const cadenaCorrupta = "Hola \\uD83D mundo";

console.log(cadenaCorrupta.toWellFormed());
// "Hola � mundo"`
			},
			{
				titulo: "Ejemplo 2: Evitar el error en encodeURIComponent()",
				code: `const entradaMala = "Subida \\uD83D";

// encodeURIComponent(entradaMala); // ❌ URIError

const entradaSegura = entradaMala.toWellFormed();
console.log(encodeURIComponent(entradaSegura));
// "Subida%20%EF%BF%BD"`
			},
			{
				titulo: "Ejemplo 3: Si ya está bien formada, no cambia",
				code: `const textoNormal = "JavaScript 🚀";
console.log(textoNormal.toWellFormed() === textoNormal); // true`
			}
		],
		errores: ["**Esperar que recupere el emoji original:** `toWellFormed()` no puede adivinar la mitad faltante, solo reemplaza la parte rota con �. La información perdida no se recupera.", "**Asumir que modifica el string original:** como todos los métodos de `String`, **retorna una nueva cadena**."],
		casos: [
			"**Middleware de saneamiento:** sanear los campos de texto recibidos en peticiones HTTP.",
			"**Integración con APIs estrictas** que no toleran UTF-16 mal formado.",
			"**Importación masiva de datos:** evitar que un registro corrupto detenga todo el script."
		],
		relacion: [
			"**`isWellFormed()`:** su hermano; solo evalúa (`true`/`false`).",
			"**`\\uFFFD` (carácter de reemplazo):** el valor estándar para algo desconocido o no procesable.",
			"**`encodeURIComponent()`:** la función que más se beneficia de pasar antes por `toWellFormed()`."
		],
		analogia: "Si `isWellFormed()` es un **inspector de calidad** que avisa que a una mesa le falta una pata, `toWellFormed()` es el **carpintero**: no sabe cómo era la pata original, pero le pone un soporte estándar (el símbolo �) para que la mesa no se caiga.",
		fuente: "MDN Web Docs | ECMAScript 2023 (ECMA-262)",
		notasPersonales: ["Crear un helper de limpieza que aplique `.trim().toWellFormed()` a todas las entradas de formularios.", "Soportado de forma nativa desde Node.js 20+ y navegadores modernos (2023 en adelante)."],
		quiz: Q$2([
			[
				"¿Qué reemplaza toWellFormed() por cada lone surrogate?",
				[
					"Un espacio",
					"U+FFFD (�)",
					"Una cadena vacía",
					"Un '?'"
				],
				1
			],
			[
				"¿Qué devuelve toWellFormed()?",
				[
					"Un booleano",
					"Una nueva cadena",
					"El mismo string mutado",
					"undefined"
				],
				1
			],
			[
				"¿Qué hace con un surrogate pair válido?",
				[
					"Lo elimina",
					"Lo mantiene intacto",
					"Lo reemplaza",
					"Lanza error"
				],
				1
			],
			[
				"¿Recupera el emoji original perdido?",
				[
					"Sí",
					"No, solo reemplaza la parte rota",
					"Solo en Node",
					"Solo con emojis"
				],
				1
			],
			[
				"¿Qué diferencia hay con isWellFormed()?",
				[
					"Ninguna",
					"isWellFormed comprueba; toWellFormed corrige",
					"toWellFormed solo comprueba",
					"isWellFormed devuelve string"
				],
				1
			],
			[
				"¿Qué devuelve 'JavaScript 🚀'.toWellFormed() === 'JavaScript 🚀'?",
				[
					"true",
					"false",
					"undefined",
					"Un error"
				],
				0
			],
			[
				"¿Qué función evita fallar si antes pasas el texto por toWellFormed()?",
				[
					"encodeURIComponent()",
					"parseInt()",
					"Math.max()",
					"Array.from()"
				],
				0
			],
			[
				"¿toWellFormed() modifica el string original?",
				[
					"Sí",
					"No",
					"Solo si es let",
					"Depende"
				],
				1
			]
		])
	},
	startswith: {
		id: "startswith",
		titulo: "String.prototype.startsWith()",
		simulador: "string",
		definicion: ["Método built-in de los `String` que evalúa si una cadena **comienza con los caracteres especificados** en otra cadena."],
		queEs: [
			"Función de búsqueda y comprobación introducida en **ECMAScript 2015 (ES6)**.",
			"Devuelve un booleano (`true` o `false`).",
			"Es **sensible a mayúsculas y minúsculas** (*case-sensitive*)."
		],
		paraQueSirve: [
			"**Validar prefijos:** protocolos de URL (`https://`).",
			"**Filtrar listados** que comiencen con una letra, prefijo o código (`+51`, `+34`).",
			"**Procesar texto/Markdown:** detectar si una línea empieza con `#` o con un carácter especial."
		],
		comoFunciona: [
			"Compara el inicio de la cadena con la cadena de búsqueda.",
			"Opcionalmente, una **posición inicial** indica desde dónde empieza la comparación.",
			"Devuelve `true` si todos los caracteres coinciden, `false` en caso contrario."
		],
		sintaxis: [{ code: `cadena.startsWith(searchString, position);` }],
		nota: "**`searchString`:** lo que buscas al inicio. **`position`** *(opcional)*: desde dónde empieza la comprobación (por defecto `0`). **Retorno:** `true` o `false`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico",
				code: `const texto = "JavaScript es genial";

console.log(texto.startsWith("JavaScript")); // true
console.log(texto.startsWith("javascript")); // false (case-sensitive)
console.log(texto.startsWith("genial"));     // false`
			},
			{
				titulo: "Ejemplo 2: Con el parámetro position",
				code: `const mensaje = "Hola Mundo";

// ¿empieza por "Mundo" a partir del índice 5?
console.log(mensaje.startsWith("Mundo", 5)); // true`
			},
			{
				titulo: "Ejemplo 3: Validar el protocolo de una URL",
				code: `function esConexionSegura(url) {
  return url.startsWith("https://");
}

esConexionSegura("https://ejemplo.com"); // true
esConexionSegura("http://ejemplo.com");  // false`
			}
		],
		errores: [
			{
				texto: "**Sensibilidad a mayúsculas y minúsculas:**",
				code: `"HTTP://sitio.com".startsWith("http://"); // false

// Solución: normalizar antes
"HTTP://sitio.com".toLowerCase().startsWith("http://"); // true`
			},
			"**Pasar una expresión regular:** `startsWith()` **no acepta** `RegExp`; lanza `TypeError`.",
			"**Confundir con `indexOf()`:** `str.indexOf(\"x\") === 0` logra algo similar, pero `startsWith()` es más legible y expresivo."
		],
		casos: [
			{
				texto: "**Rutas y navegación:**",
				code: `location.pathname.startsWith("/admin");`
			},
			"**Parsers de comandos:** detectar prefijos como `!help` o `/start`.",
			"**Sanitización de datos:** comprobar si un teléfono incluye el código de país."
		],
		relacion: [
			"**`endsWith()`:** su contraparte; evalúa cómo **termina**.",
			"**`includes()`:** busca en **cualquier posición**.",
			"**`indexOf()`:** devuelve el índice donde empieza una subcadena (o `-1`)."
		],
		analogia: "Es como **revisar las primeras palabras de una carta**. No lees toda la página: solo miras el encabezado para ver si empieza con *«Estimado señor»* o con *«Hola»*, ignorando el resto.",
		fuente: "MDN Web Docs | ECMAScript Specification (ECMA-262)",
		notasPersonales: ["Búsquedas flexibles: `str.toLowerCase().startsWith(busqueda.toLowerCase())`.", "Disponible en todos los entornos modernos desde ES6 (2015)."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'JavaScript'.startsWith('Java')?",
				[
					"true",
					"false",
					"0",
					"undefined"
				],
				0
			],
			[
				"¿Qué devuelve 'JavaScript'.startsWith('java')?",
				[
					"true",
					"false",
					"Un error",
					"undefined"
				],
				1
			],
			[
				"¿Para qué sirve el segundo parámetro?",
				[
					"Longitud máxima",
					"Posición desde donde se comprueba",
					"Cantidad de resultados",
					"Un callback"
				],
				1
			],
			[
				"¿Qué devuelve 'Hola Mundo'.startsWith('Mundo', 5)?",
				[
					"true",
					"false",
					"5",
					"Un error"
				],
				0
			],
			[
				"¿Qué pasa si le pasas una RegExp?",
				[
					"Funciona",
					"Lanza TypeError",
					"Devuelve false",
					"Devuelve true"
				],
				1
			],
			[
				"¿En qué versión de ECMAScript se introdujo?",
				[
					"ES5",
					"ES2015 (ES6)",
					"ES2023",
					"ES2010"
				],
				1
			],
			[
				"¿Cuál es su contraparte para el final del texto?",
				[
					"endsWith()",
					"includes()",
					"indexOf()",
					"slice()"
				],
				0
			],
			[
				"¿Cómo ignoras mayúsculas al usar startsWith()?",
				[
					"No se puede",
					"Aplicando toLowerCase() a ambos antes",
					"Con un flag i",
					"Con position = -1"
				],
				1
			]
		])
	},
	endswith: {
		id: "endswith",
		titulo: "String.prototype.endsWith()",
		simulador: "string",
		definicion: ["Método built-in de los `String` que evalúa si una cadena **termina con los caracteres especificados** en otra cadena."],
		queEs: [
			"Función de búsqueda y validación introducida en **ECMAScript 2015 (ES6)**.",
			"Devuelve un booleano (`true` o `false`).",
			"Es **sensible a mayúsculas y minúsculas** (*case-sensitive*)."
		],
		paraQueSirve: [
			"Validar **extensiones de archivos** (`.pdf`, `.png`, `.js`).",
			"Verificar dominios y URLs (si termina en `.com` o `.org`).",
			"Comprobar patrones al final de un texto (signos de puntuación, sufijos)."
		],
		comoFunciona: [
			"Compara el final de la cadena con la cadena de búsqueda.",
			"Opcionalmente, un segundo parámetro (`length`) limita la longitud que se evalúa.",
			"Con `length`, el método se comporta como si la cadena tuviera solo esa longitud."
		],
		sintaxis: [{ code: `cadena.endsWith(searchString, length);` }],
		nota: "**`searchString`:** lo que buscas al final. **`length`** *(opcional)*: longitud a considerar (por defecto `str.length`). **Retorno:** `true` o `false`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico",
				code: `const texto = "Hola mundo JavaScript";

console.log(texto.endsWith("JavaScript")); // true
console.log(texto.endsWith("javascript")); // false (case-sensitive)
console.log(texto.endsWith("mundo"));      // false`
			},
			{
				titulo: "Ejemplo 2: Con el parámetro length",
				code: `const archivo = "documento_v1_final.pdf";

// Solo se evalúan los primeros 9 caracteres: "documento"
console.log(archivo.endsWith("mento", 9)); // true

// Solo los primeros 12: "documento_v1"
console.log(archivo.endsWith("v1", 12));   // true`
			},
			{
				titulo: "Ejemplo 3: Validar la extensión de un archivo",
				code: `function esImagen(nombreArchivo) {
  return nombreArchivo.endsWith(".png") || nombreArchivo.endsWith(".jpg");
}

esImagen("foto.png");  // true
esImagen("script.js"); // false`
			}
		],
		errores: [
			{
				texto: "**Confundir mayúsculas y minúsculas:**",
				code: `"FOTO.PNG".endsWith(".png"); // false

// Solución: normalizar antes
"FOTO.PNG".toLowerCase().endsWith(".png"); // true`
			},
			"**Malentender `length`:** no indica desde dónde empieza la búsqueda, sino el **límite máximo** hacia la derecha (la longitud simulada de la cadena).",
			"**Pasar una expresión regular:** solo acepta strings; con una `RegExp` lanza `TypeError`."
		],
		casos: [
			"**Subida de archivos:** verificar que el usuario suba solo extensiones permitidas.",
			{
				texto: "**Detectar preguntas o exclamaciones:**",
				code: `const esPregunta = (texto) => texto.trim().endsWith("?");`
			},
			"**Enrutamiento web:** comprobar si una ruta termina en `/` o en cierta extensión."
		],
		relacion: [
			"**`startsWith()`:** evalúa cómo **empieza** una cadena.",
			"**`includes()`:** evalúa si el texto está en **cualquier parte**.",
			"**`indexOf()` / `lastIndexOf()`:** métodos clásicos previos a ES6 para lograr algo similar buscando la posición."
		],
		analogia: "Es como mirar **solo las últimas letras de una palabra** para ver si riman o tienen cierto sufijo (como *-mente* o *-ción*), ignorando todo lo que estaba escrito antes.",
		fuente: "MDN Web Docs | ECMAScript Language Specification (ECMA-262)",
		notasPersonales: ["Aplica `.toLowerCase()` antes de `endsWith()` con inputs de usuarios donde las mayúsculas no importen.", "Disponible desde ES6 (todos los navegadores modernos y Node.js)."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'foto.png'.endsWith('.png')?",
				[
					"true",
					"false",
					"4",
					"undefined"
				],
				0
			],
			[
				"¿Qué devuelve 'FOTO.PNG'.endsWith('.png')?",
				[
					"true",
					"false",
					"Un error",
					"undefined"
				],
				1
			],
			[
				"¿Qué indica el parámetro length?",
				[
					"Desde dónde empieza la búsqueda",
					"La longitud simulada de la cadena (límite a la derecha)",
					"Cuántas veces buscar",
					"El número de resultados"
				],
				1
			],
			[
				"¿Qué devuelve 'documento_v1_final.pdf'.endsWith('mento', 9)?",
				[
					"true",
					"false",
					"9",
					"Un error"
				],
				0
			],
			[
				"¿Qué pasa si le pasas una RegExp?",
				[
					"Funciona",
					"Lanza TypeError",
					"Devuelve false",
					"Devuelve true"
				],
				1
			],
			[
				"¿Cuál es su contraparte para el inicio?",
				[
					"startsWith()",
					"includes()",
					"slice()",
					"padStart()"
				],
				0
			],
			[
				"¿Para qué sirve en un sistema de subida de archivos?",
				[
					"Comprimir el archivo",
					"Verificar que tenga una extensión permitida",
					"Renombrarlo",
					"Calcular su tamaño"
				],
				1
			],
			[
				"¿Qué devuelve '¿Cómo estás?'.endsWith('?')?",
				[
					"true",
					"false",
					"'?'",
					"undefined"
				],
				0
			]
		])
	},
	substr: {
		id: "substr",
		titulo: "String.prototype.substr()",
		simulador: "string",
		obsoleto: true,
		definicion: ["Era un método de `String.prototype` que devolvía una **nueva cadena** extrayendo una cantidad específica de caracteres desde una posición inicial.", "**Actualmente está obsoleto (deprecated)** y **no se recomienda utilizarlo** en código nuevo. Usa `slice()` o `substring()` en su lugar."],
		queEs: [
			"Es un **método heredado** de `String.prototype`, marcado como **obsoleto** en el estándar.",
			"No modifica la cadena original: devuelve una nueva.",
			"Aunque muchos navegadores aún lo soportan por compatibilidad, podría desaparecer en el futuro."
		],
		paraQueSirve: ["Históricamente se usaba para extraer una parte de una cadena indicando **cuántos caracteres** tomar desde un punto.", "Hoy se recomienda reemplazarlo por `slice()` (más flexible) o `substring()`."],
		comoFunciona: [
			"Se indica la posición inicial.",
			"Se indica cuántos caracteres se desean extraer (segundo parámetro = **longitud**, no índice final).",
			"JavaScript crea una nueva cadena con esos caracteres.",
			"La cadena original permanece sin cambios."
		],
		sintaxis: [{ code: `cadena.substr(inicio);
cadena.substr(inicio, longitud);` }],
		nota: "**`inicio`:** posición de inicio (puede ser negativa). **`longitud` (opcional):** número de caracteres a extraer. Si se omite, extrae hasta el final.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Extraer desde una posición",
				code: `const texto = "JavaScript";
console.log(texto.substr(4)); // "Script"`
			},
			{
				titulo: "Ejemplo 2: Extraer una cantidad específica",
				code: `const texto = "JavaScript";
console.log(texto.substr(0, 4)); // "Java"`
			},
			{
				titulo: "Ejemplo 3: Índice negativo",
				code: `const texto = "JavaScript";
console.log(texto.substr(-6, 6)); // "Script"`
			},
			{
				titulo: "Ejemplo 4: La cadena original no cambia",
				code: `const texto = "Hola Mundo";
const parte = texto.substr(5);
console.log(texto); // "Hola Mundo"
console.log(parte); // "Mundo"`
			}
		],
		errores: [
			{
				texto: "**Usarlo en proyectos nuevos:** está obsoleto. Aunque funcione, no se recomienda.",
				code: `// ❌ En código nuevo
texto.substr(0, 5);

// ✅ Alternativa recomendada
texto.slice(0, 5);`
			},
			{
				texto: "**Confundir el segundo parámetro:** en `substr()` el segundo argumento es la **cantidad de caracteres**, no el índice final.",
				code: `"JavaScript".substr(2, 4);    // "vaSc" (4 caracteres desde el 2)
"JavaScript".substring(2, 4); // "va"   (del índice 2 al 4)`
			},
			{
				texto: "**Pensar que modifica la cadena:** los strings son inmutables.",
				code: `let texto = "Hola";
texto.substr(1);
console.log(texto); // "Hola"`
			}
		],
		casos: ["**Históricamente:** extraer fragmentos de texto con cantidad fija.", "**Hoy:** sustituirlo por `slice()` o `substring()`."],
		relacion: [
			{
				texto: "**`slice()`:** alternativa moderna y recomendada (acepta índices negativos).",
				code: `"JavaScript".slice(0, 4); // "Java"`
			},
			{
				texto: "**`substring()`:** extrae por rango de índices (inicio, fin).",
				code: `"JavaScript".substring(0, 4); // "Java"`
			},
			"**Deprecated:** aunque sigue funcionando en muchos entornos, no forma parte del estándar ECMAScript actual."
		],
		analogia: "Imagina que estás leyendo un libro. Con `substr()` dices: **\"empieza en la página 20 y léeme las siguientes 5 páginas\"**. No importa dónde termine el libro: solo quieres una **cantidad específica** de páginas. Con `slice()` dirías: **\"léeme desde la página 20 hasta la página 25\"**. Esa diferencia es clave.",
		fuente: "MDN Web Docs | String.prototype.substr() (Obsoleto)",
		notasPersonales: ["**Regla:** si ves `substr()` en código ajeno, entiende que el segundo argumento es **longitud**, no índice final. Y si puedes, migra a `slice()`."],
		quiz: Q$2([
			[
				"¿Qué devuelve \"JavaScript\".substr(4)?",
				[
					"\"Java\"",
					"\"Script\"",
					"\"JavaScript\"",
					"Un error"
				],
				1
			],
			[
				"¿Qué devuelve \"JavaScript\".substr(0, 4)?",
				[
					"\"Java\"",
					"\"Script\"",
					"\"Scri\"",
					"\"Jav\""
				],
				0
			],
			[
				"¿Qué significa el segundo parámetro de substr()?",
				[
					"Índice final",
					"Cantidad de caracteres a extraer",
					"Separador",
					"Un callback"
				],
				1
			],
			[
				"¿Qué devuelve \"JavaScript\".substr(-6, 6)?",
				[
					"\"Script\"",
					"\"Java\"",
					"\"ScriptJ\"",
					"Un error"
				],
				0
			],
			[
				"¿substr() modifica la cadena original?",
				[
					"Sí",
					"No, devuelve una nueva",
					"Solo con strings largos",
					"Depende del navegador"
				],
				1
			],
			[
				"¿Qué método se recomienda en su lugar?",
				[
					"slice()",
					"concat()",
					"repeat()",
					"charCodeAt()"
				],
				0
			],
			[
				"¿Qué devuelve \"JavaScript\".substr(2, 4)?",
				[
					"\"vaSc\"",
					"\"va\"",
					"\"vascript\"",
					"\"avaS\""
				],
				0
			],
			[
				"¿substr() forma parte del estándar ECMAScript actual?",
				[
					"Sí",
					"No, está obsoleto",
					"Solo en navegadores modernos",
					"Solo en Node.js"
				],
				1
			]
		])
	},
	touppercase: {
		id: "touppercase",
		titulo: "String.prototype.toUpperCase()",
		simulador: "string",
		definicion: ["Es un método built-in de los objetos `String` que devuelve la cadena de texto con **todos sus caracteres alfabéticos convertidos a mayúsculas**."],
		queEs: [
			"Es un método de **transformación y normalización** de cadenas de texto.",
			"**No modifica la cadena original** (los *strings* en JavaScript son inmutables), sino que retorna un **nuevo texto** con la conversión aplicada.",
			"Trabaja carácter por carácter según el mapeo Unicode de mayúsculas."
		],
		paraQueSirve: [
			"**Normalización de datos:** comparar cadenas sin importar cómo las escribió el usuario (emails, códigos promocionales, usernames).",
			"**Formato de UI:** mostrar encabezados, siglas o etiquetas totalmente en mayúsculas por diseño.",
			"**Búsquedas insensibles a mayúsculas:** facilitar comprobaciones junto a `endsWith()`, `startsWith()` o `includes()`."
		],
		comoFunciona: [
			"Recorre cada carácter del string original.",
			"Si detecta una letra minúscula, la reemplaza por su equivalente en mayúscula según el mapeo Unicode.",
			"Los caracteres que no son letras (números, símbolos, espacios, emojis) se mantienen **exactamente igual**.",
			"Devuelve una nueva cadena; la original permanece intacta."
		],
		sintaxis: [{ code: `str.toUpperCase();` }],
		nota: "**Parámetros:** ninguno. **Retorno:** una nueva cadena con todas las letras en mayúsculas.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico",
				code: `const mensaje = "hola mundo 123!";
const enMayusculas = mensaje.toUpperCase();

console.log(enMayusculas); // "HOLA MUNDO 123!"
console.log(mensaje);      // "hola mundo 123!" (el original no cambia)`
			},
			{
				titulo: "Ejemplo 2: Normalización para comparaciones",
				code: `const codigoIngresado = "descuento2026";
const codigoValido = "DESCUENTO2026";

if (codigoIngresado.toUpperCase() === codigoValido.toUpperCase()) {
  console.log("¡Código de descuento aplicado!");
}`
			},
			{
				titulo: "Ejemplo 3: Encadenamiento de métodos",
				code: `const archivo = "Documento.PDF";

if (archivo.toUpperCase().endsWith(".PDF")) {
  console.log("Es un archivo PDF.");
}`
			}
		],
		errores: [
			{
				texto: "**Creer que modifica el string original:** las cadenas son inmutables. Hacer `texto.toUpperCase()` no cambia la variable `texto`.",
				code: `// ❌ El original no cambia
let texto = "hola";
texto.toUpperCase();
console.log(texto); // "hola"

// ✅ Hay que reasignar
texto = texto.toUpperCase();
console.log(texto); // "HOLA"`
			},
			{
				texto: "**Llamarlo sobre `null` o `undefined`:** lanza `TypeError`. Usa encadenamiento opcional si el valor puede faltar.",
				code: `// ❌ TypeError
const val = null;
val.toUpperCase();

// ✅ Seguro con optional chaining
val?.toUpperCase(); // undefined`
			},
			"**Casos especiales de idioma (Localización):** en idiomas como el turco, la `i` minúscula no se convierte en la `I` estándar. Para eso existe `toLocaleUpperCase()`."
		],
		casos: [
			"**Códigos de cupón / Tokens:** estandarizar entradas de usuario para que `cupon20` y `CUPON20` funcionen igual.",
			"**Abreviaturas:** convertir entradas de países (`es`, `mx`) o identificadores a su estándar en mayúsculas (`ES`, `MX`).",
			"**Limpieza de inputs:** normalizar entradas antes de guardarlas en una base de datos o enviarlas a una API."
		],
		relacion: [
			"**`String.prototype.toLowerCase()`:** su contraparte directa; convierte todo el texto a minúsculas.",
			"**`String.prototype.toLocaleUpperCase()`:** variante que respeta las reglas de mapeo según la configuración regional (*locale*).",
			"**Inmutabilidad:** principio de JS por el cual los métodos de string nunca alteran la cadena existente, sino que retornan una nueva."
		],
		analogia: "Es como activar el **Bloq Mayús** (*Caps Lock*) en tu teclado antes de empezar a escribir un documento, o usar un sello con todas las letras en mayúscula: la información y el mensaje siguen siendo los mismos, pero cambia la presentación visual de cada letra.",
		fuente: "MDN Web Docs - String.prototype.toUpperCase() | Especificación ECMAScript (ECMA-262)",
		notasPersonales: ["**Siempre** guardar o asignar el resultado a una variable, ya que la cadena original nunca se modifica.", "**Para comparaciones case-insensitive:** la práctica habitual es llevar ambas cadenas a `.toLowerCase()` o a `.toUpperCase()` antes de evaluar la igualdad."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'hola'.toUpperCase()?",
				[
					"'hola'",
					"'HOLA'",
					"'Hola'",
					"undefined"
				],
				1
			],
			[
				"¿toUpperCase() modifica la cadena original?",
				[
					"Sí, siempre",
					"No, devuelve una nueva",
					"Solo si es let",
					"Solo con strings largos"
				],
				1
			],
			[
				"¿Qué pasa con los números y símbolos al aplicar toUpperCase()?",
				[
					"Se convierten a mayúsculas",
					"Se eliminan",
					"Se mantienen igual",
					"Lanzan un error"
				],
				2
			],
			[
				"¿Qué devuelve 'abc123!'.toUpperCase()?",
				[
					"'ABC123!'",
					"'abc123!'",
					"'ABC'",
					"'123!'"
				],
				0
			],
			[
				"¿Qué pasa si llamas toUpperCase() sobre null?",
				[
					"Devuelve 'null'",
					"Devuelve ''",
					"Lanza TypeError",
					"Devuelve undefined"
				],
				2
			],
			[
				"¿Qué método hace la operación inversa?",
				[
					"toLocaleUpperCase()",
					"toLowerCase()",
					"trim()",
					"padEnd()"
				],
				1
			],
			[
				"¿Cuál es la variante que respeta el idioma (locale)?",
				[
					"toUpperCase()",
					"toLocaleUpperCase()",
					"toLocaleLowerCase()",
					"localeCompare()"
				],
				1
			],
			[
				"¿Por qué es mejor usar toUpperCase() antes de comparar códigos como 'PROMO2026'?",
				[
					"Para que se vea más bonito",
					"Porque las cadenas son inmutables",
					"Para ignorar mayúsculas y minúsculas en la comparación",
					"Para limpiar espacios"
				],
				2
			]
		])
	},
	tolowercase: {
		id: "tolowercase",
		titulo: "String.prototype.toLowerCase()",
		simulador: "string",
		definicion: ["Es un método built-in de los objetos `String` que devuelve la cadena de texto con **todos sus caracteres alfabéticos convertidos a minúsculas**."],
		queEs: [
			"Es un método de **transformación y normalización** de cadenas de texto.",
			"**No modifica la cadena original** (los *strings* en JavaScript son inmutables), sino que retorna un **nuevo texto** con la conversión aplicada.",
			"Trabaja carácter por carácter según el mapeo Unicode de minúsculas."
		],
		paraQueSirve: [
			"**Normalización de datos:** comparar cadenas sin importar cómo las escribió el usuario (emails, usernames, búsquedas).",
			"**Formato de UI:** mostrar etiquetas, párrafos o mensajes en minúsculas por diseño.",
			"**Búsquedas insensibles a mayúsculas:** facilitar comprobaciones junto a `endsWith()`, `startsWith()` o `includes()`."
		],
		comoFunciona: [
			"Recorre cada carácter del string original.",
			"Si detecta una letra mayúscula, la reemplaza por su equivalente en minúscula según el mapeo Unicode.",
			"Los caracteres que no son letras (números, símbolos, espacios, emojis) se mantienen **exactamente igual**.",
			"Devuelve una nueva cadena; la original permanece intacta."
		],
		sintaxis: [{ code: `str.toLowerCase();` }],
		nota: "**Parámetros:** ninguno. **Retorno:** una nueva cadena con todas las letras en minúsculas.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico",
				code: `const mensaje = "HOLA MUNDO 123!";
const enMinusculas = mensaje.toLowerCase();

console.log(enMinusculas); // "hola mundo 123!"
console.log(mensaje);      // "HOLA MUNDO 123!" (el original no cambia)`
			},
			{
				titulo: "Ejemplo 2: Normalización para comparaciones",
				code: `const usuarioIngresado = "ADMIN";
if (usuarioIngresado.toLowerCase() === "admin") {
  console.log("Acceso permitido");
}`
			},
			{
				titulo: "Ejemplo 3: Encadenamiento de métodos",
				code: `const archivo = "DOCUMENTO.PDF";

if (archivo.toLowerCase().endsWith(".pdf")) {
  console.log("Es un archivo PDF.");
}`
			}
		],
		errores: [
			{
				texto: "**Creer que modifica el string original:** las cadenas son inmutables. Hacer `texto.toLowerCase()` no cambia la variable `texto`.",
				code: `// ❌ El original no cambia
let texto = "HOLA";
texto.toLowerCase();
console.log(texto); // "HOLA"

// ✅ Hay que reasignar
texto = texto.toLowerCase();
console.log(texto); // "hola"`
			},
			{
				texto: "**Llamarlo sobre `null` o `undefined`:** lanza `TypeError`. Usa encadenamiento opcional si el valor puede faltar.",
				code: `// ❌ TypeError
const val = null;
val.toLowerCase();

// ✅ Seguro con optional chaining
val?.toLowerCase(); // undefined`
			},
			"**Casos especiales de idioma (Localización):** en idiomas como el turco, la `I` mayúscula no se convierte en la `i` estándar. Para eso existe `toLocaleLowerCase()`."
		],
		casos: [
			"**Normalización de emails:** `email.toLowerCase().trim()` antes de guardar o comparar.",
			"**Búsquedas de productos:** comparar la entrada del usuario en minúsculas con un catálogo ya normalizado.",
			"**Identificadores de usuario:** guardar los usernames en minúsculas para evitar duplicados como `Admin` y `admin`."
		],
		relacion: [
			"**`String.prototype.toUpperCase()`:** su contraparte directa; convierte todo el texto a mayúsculas.",
			"**`String.prototype.toLocaleLowerCase()`:** variante que respeta las reglas de mapeo según la configuración regional (*locale*).",
			"**`String.prototype.trim()`:** se combina con `toLowerCase()` para normalizar entradas de usuario.",
			"**Inmutabilidad:** principio de JS por el cual los métodos de string nunca alteran la cadena existente, sino que retornan una nueva."
		],
		analogia: "Imagina que tienes un documento escrito completamente en **MAYÚSCULAS**. `toLowerCase()` es como hacer una **fotocopia** del documento y convertir todas las letras de esa copia a **minúsculas**: el original queda intacto y tú trabajas con la copia en minúsculas.",
		fuente: "MDN Web Docs - String.prototype.toLowerCase() | Especificación ECMAScript (ECMA-262)",
		notasPersonales: ["**Siempre** guardar o asignar el resultado a una variable, ya que la cadena original nunca se modifica.", "**Para comparaciones case-insensitive:** la práctica habitual es llevar ambas cadenas a `.toLowerCase()` o a `.toUpperCase()` antes de evaluar la igualdad."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'HOLA'.toLowerCase()?",
				[
					"'HOLA'",
					"'hola'",
					"'Hola'",
					"undefined"
				],
				1
			],
			[
				"¿toLowerCase() modifica la cadena original?",
				[
					"Sí, siempre",
					"No, devuelve una nueva",
					"Solo si es let",
					"Solo con strings largos"
				],
				1
			],
			[
				"¿Qué pasa con los números y símbolos al aplicar toLowerCase()?",
				[
					"Se convierten a mayúsculas",
					"Se eliminan",
					"Se mantienen igual",
					"Lanzan un error"
				],
				2
			],
			[
				"¿Qué devuelve 'ABC123!'.toLowerCase()?",
				[
					"'abc123!'",
					"'ABC123!'",
					"'abc'",
					"'123!'"
				],
				0
			],
			[
				"¿Qué pasa si llamas toLowerCase() sobre undefined?",
				[
					"Devuelve 'undefined'",
					"Devuelve ''",
					"Lanza TypeError",
					"Devuelve null"
				],
				2
			],
			[
				"¿Qué método hace la operación inversa?",
				[
					"toLocaleLowerCase()",
					"toUpperCase()",
					"trim()",
					"padEnd()"
				],
				1
			],
			[
				"¿Cuál es la variante que respeta el idioma (locale)?",
				[
					"toLowerCase()",
					"toLocaleLowerCase()",
					"toLocaleUpperCase()",
					"localeCompare()"
				],
				1
			],
			[
				"¿Por qué es buena práctica usar toLowerCase() en emails antes de guardarlos?",
				[
					"Para que se vean mejor",
					"Para ignorar mayúsculas y evitar duplicados",
					"Porque ocupa menos",
					"Para borrar espacios"
				],
				1
			]
		])
	},
	tolocaleuppercase: {
		id: "tolocaleuppercase",
		titulo: "String.prototype.toLocaleUpperCase()",
		simulador: "string",
		definicion: ["Es un método built-in de los objetos `String` que devuelve la cadena de texto con **todos sus caracteres alfabéticos convertidos a mayúsculas**, teniendo en cuenta las **reglas de conversión específicas de un `locale`** (idioma/región)."],
		queEs: [
			"Es un método de **transformación e internacionalización (i18n)** de cadenas de texto.",
			"Funciona igual que `toUpperCase()` en la mayoría de idiomas, pero puede producir **resultados distintos** cuando el idioma tiene reglas especiales de mayúsculas.",
			"**No modifica la cadena original**, sino que retorna un **nuevo texto** con la conversión aplicada."
		],
		paraQueSirve: [
			"**Internacionalización (i18n):** mostrar texto correctamente en mayúsculas en idiomas con reglas especiales (ej. turco, azerí, lituano).",
			"**Formularios multilingües:** normalizar nombres o campos de texto respetando el idioma del usuario.",
			"**Interfaces localizadas:** aplicar el estilo correcto (`MAYÚSCULAS`, `mayúsculas`) según la región."
		],
		comoFunciona: [
			"Recibe **opcionalmente** uno o varios `locales` como etiquetas BCP 47 (`'tr'`, `'en'`, `['tr','en']`).",
			"Si no se pasa ningún locale, usa el **locale predeterminado del entorno**.",
			"Recorre cada carácter y aplica el mapeo de mayúsculas **según las reglas Unicode del locale indicado**.",
			"Los caracteres que no son letras (números, símbolos, espacios, emojis) se mantienen **igual**.",
			"Devuelve una nueva cadena; la original permanece intacta."
		],
		sintaxis: [{ code: `str.toLocaleUpperCase();
str.toLocaleUpperCase(locales);` }],
		nota: "**`locales` (opcional):** string o array de etiquetas BCP 47. **Retorno:** una nueva cadena con todas las letras en mayúsculas según el locale.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico sin locale",
				code: `const texto = "hola mundo";
console.log(texto.toLocaleUpperCase()); // "HOLA MUNDO"`
			},
			{
				titulo: "Ejemplo 2: Especificando español",
				code: `const texto = "hola mundo";
console.log(texto.toLocaleUpperCase("es")); // "HOLA MUNDO"`
			},
			{
				titulo: "Ejemplo 3: El caso especial del turco 🇹🇷",
				descripcion: "En turco, la `i` minúscula se convierte en `İ` (con punto), no en `I`.",
				code: `console.log("i".toUpperCase());              // "I"  (regla general)
console.log("i".toLocaleUpperCase("tr"));   // "İ"  (regla turca)

console.log("istanbul".toUpperCase());            // "ISTANBUL"
console.log("istanbul".toLocaleUpperCase("tr"));  // "İSTANBUL"`
			},
			{
				titulo: "Ejemplo 4: No modifica el original",
				code: `const palabra = "hola";
const mayuscula = palabra.toLocaleUpperCase();

console.log(palabra);   // "hola"
console.log(mayuscula); // "HOLA"`
			}
		],
		errores: [
			{
				texto: "**Creer que traduce texto:** `toLocaleUpperCase()` solo **cambia la capitalización**; no traduce el texto al idioma del locale.",
				code: `// ❌ No traduce "hello" a "HOLA"
"hello".toLocaleUpperCase("es"); // "HELLO" (sigue siendo inglés)`
			},
			{
				texto: "**Pensar que modifica el string original:** las cadenas son inmutables.",
				code: `// ❌ El original no cambia
let texto = "hola";
texto.toLocaleUpperCase();
console.log(texto); // "hola"

// ✅ Hay que reasignar
texto = texto.toLocaleUpperCase();
console.log(texto); // "HOLA"`
			},
			{
				texto: "**Usar un locale inválido:** lanza `RangeError`.",
				code: `// ❌ RangeError: Incorrect locale information
"hola".toLocaleUpperCase("esto-no-es-un-locale");`
			},
			"**Confundirlo con `toUpperCase()`:** en la mayoría de casos producen lo mismo; la diferencia aparece con idiomas que tienen reglas especiales (turco, lituano, azerí...)."
		],
		casos: [
			"**Aplicaciones multilingües:** mostrar nombres o etiquetas correctamente en cada idioma.",
			"**Formularios con locale:** transformar entradas según la región del usuario.",
			"**Contenido con caracteres especiales:** respetar reglas de idiomas como el turco."
		],
		relacion: [
			"**`String.prototype.toUpperCase()`:** versión general (sin locale). Suele coincidir, pero no siempre.",
			"**`String.prototype.toLocaleLowerCase()`:** contraparte a minúsculas respetando locale.",
			"**`String.prototype.localeCompare()`:** también usa reglas de locale, pero para **comparar** en lugar de transformar.",
			"**`Intl` API:** familia de objetos de internacionalización de JS.",
			"**BCP 47:** estándar para etiquetas de idioma (`'es-MX'`, `'tr'`, `'en-US'`)."
		],
		analogia: "Imagina que tienes un **traductor** que sabe que **cada idioma tiene sus propias reglas de escritura**. `toUpperCase()` dice: *«convierte esto a mayúsculas con la regla general»*. `toLocaleUpperCase('tr')` dice: *«convierte esto a mayúsculas **siguiendo específicamente las reglas del turco**»*. No traduce el texto, solo adapta la capitalización.",
		fuente: "MDN Web Docs - String.prototype.toLocaleUpperCase() | Especificación ECMA-402 (Intl)",
		notasPersonales: [
			"**Palabras clave:** `String` · `Mayúsculas` · `Locale` · `Internacionalización` · `i18n` · `Unicode`.",
			"**Recordar:** `toLocaleUpperCase()` = convertir a MAYÚSCULAS respetando reglas de un locale.",
			"**No confundir:** *locale* **no** significa traducir. Solo adapta determinadas reglas de conversión al locale indicado."
		],
		quiz: Q$2([
			[
				"¿Qué devuelve 'hola'.toLocaleUpperCase()?",
				[
					"'hola'",
					"'HOLA'",
					"'Hola'",
					"undefined"
				],
				1
			],
			[
				"¿Para qué sirve el parámetro 'locales'?",
				[
					"Para traducir el texto",
					"Para elegir reglas de conversión según idioma/región",
					"Para cambiar el color",
					"Para ordenar el array"
				],
				1
			],
			[
				"¿Qué devuelve 'i'.toLocaleUpperCase('tr')?",
				[
					"'I'",
					"'İ'",
					"'i'",
					"Un error"
				],
				1
			],
			[
				"¿Qué devuelve 'i'.toUpperCase()?",
				[
					"'I'",
					"'İ'",
					"'i'",
					"Un error"
				],
				0
			],
			[
				"¿toLocaleUpperCase() modifica el string original?",
				[
					"Sí, siempre",
					"No, devuelve una nueva",
					"Solo con let",
					"Depende del locale"
				],
				1
			],
			[
				"¿toLocaleUpperCase() traduce el texto al idioma del locale?",
				[
					"Sí",
					"No, solo cambia la capitalización",
					"Solo en turco",
					"Solo si se pasan dos locales"
				],
				1
			],
			[
				"¿Qué pasa si se pasa un locale inválido?",
				[
					"Devuelve el original",
					"Lanza RangeError",
					"Lanza TypeError",
					"Devuelve undefined"
				],
				1
			],
			[
				"¿Cuál es la contraparte de toLocaleUpperCase() para minúsculas?",
				[
					"toLowerCase()",
					"toLocaleLowerCase()",
					"toUpperCase()",
					"localeCompare()"
				],
				1
			]
		])
	},
	tolocalelowercase: {
		id: "tolocalelowercase",
		titulo: "String.prototype.toLocaleLowerCase()",
		simulador: "string",
		definicion: ["Es un método built-in de los objetos `String` que devuelve la cadena de texto con **todos sus caracteres alfabéticos convertidos a minúsculas**, teniendo en cuenta las **reglas de conversión específicas de un `locale`** (idioma/región)."],
		queEs: [
			"Es un método de **transformación e internacionalización (i18n)** de cadenas de texto.",
			"Funciona igual que `toLowerCase()` en la mayoría de idiomas, pero puede producir **resultados distintos** cuando el idioma tiene reglas especiales de minúsculas.",
			"**No modifica la cadena original**, sino que retorna un **nuevo texto** con la conversión aplicada."
		],
		paraQueSirve: [
			"**Internacionalización (i18n):** mostrar texto correctamente en minúsculas en idiomas con reglas especiales (ej. turco, azerí).",
			"**Formularios multilingües:** normalizar campos de texto respetando el idioma del usuario.",
			"**Búsquedas locales:** comparar textos en minúsculas respetando las reglas del idioma para evitar falsos negativos."
		],
		comoFunciona: [
			"Recibe **opcionalmente** uno o varios `locales` como etiquetas BCP 47 (`'tr'`, `'en'`, `['tr','en']`).",
			"Si no se pasa ningún locale, usa el **locale predeterminado del entorno**.",
			"Recorre cada carácter y aplica el mapeo de minúsculas **según las reglas Unicode del locale indicado**.",
			"Los caracteres que no son letras (números, símbolos, espacios, emojis) se mantienen **igual**.",
			"Devuelve una nueva cadena; la original permanece intacta."
		],
		sintaxis: [{ code: `str.toLocaleLowerCase();
str.toLocaleLowerCase(locales);` }],
		nota: "**`locales` (opcional):** string o array de etiquetas BCP 47. **Retorno:** una nueva cadena con todas las letras en minúsculas según el locale.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico sin locale",
				code: `const texto = "HOLA MUNDO";
console.log(texto.toLocaleLowerCase()); // "hola mundo"`
			},
			{
				titulo: "Ejemplo 2: Especificando español",
				code: `const texto = "HOLA MUNDO";
console.log(texto.toLocaleLowerCase("es")); // "hola mundo"`
			},
			{
				titulo: "Ejemplo 3: El caso especial del turco 🇹🇷",
				descripcion: "En turco, la `I` mayúscula se convierte en `ı` (i sin punto), no en `i`.",
				code: `console.log("I".toLowerCase());                // "i"  (regla general)
console.log("I".toLocaleLowerCase("tr"));     // "ı"  (regla turca, sin punto)

console.log("ISTANBUL".toLowerCase());             // "istanbul"
console.log("ISTANBUL".toLocaleLowerCase("tr"));   // "ıstanbul"`
			},
			{
				titulo: "Ejemplo 4: No modifica el original",
				code: `const palabra = "HOLA";
const minuscula = palabra.toLocaleLowerCase();

console.log(palabra);   // "HOLA"
console.log(minuscula); // "hola"`
			}
		],
		errores: [
			{
				texto: "**Creer que traduce texto:** `toLocaleLowerCase()` solo **cambia la capitalización**; no traduce el texto al idioma del locale.",
				code: `// ❌ No traduce "HELLO" a "hola"
"HELLO".toLocaleLowerCase("es"); // "hello" (sigue siendo inglés)`
			},
			{
				texto: "**Pensar que modifica el string original:** las cadenas son inmutables.",
				code: `// ❌ El original no cambia
let texto = "HOLA";
texto.toLocaleLowerCase();
console.log(texto); // "HOLA"

// ✅ Hay que reasignar
texto = texto.toLocaleLowerCase();
console.log(texto); // "hola"`
			},
			{
				texto: "**Usar un locale inválido:** lanza `RangeError`.",
				code: `// ❌ RangeError: Incorrect locale information
"HOLA".toLocaleLowerCase("esto-no-es-un-locale");`
			},
			"**Confundirlo con `toLowerCase()`:** en la mayoría de casos producen lo mismo; la diferencia aparece con idiomas que tienen reglas especiales (turco, azerí...)."
		],
		casos: [
			"**Aplicaciones multilingües:** mostrar nombres o etiquetas correctamente en cada idioma.",
			"**Normalización de emails o usernames en entornos locales:** respetar la conversión de la `I` en turco para evitar confusiones.",
			"**Búsquedas insensibles a mayúsculas** que respeten reglas del idioma del usuario."
		],
		relacion: [
			"**`String.prototype.toLowerCase()`:** versión general (sin locale). Suele coincidir, pero no siempre.",
			"**`String.prototype.toLocaleUpperCase()`:** contraparte a mayúsculas respetando locale.",
			"**`String.prototype.localeCompare()`:** también usa reglas de locale, pero para **comparar** en lugar de transformar.",
			"**`Intl` API:** familia de objetos de internacionalización de JS.",
			"**BCP 47:** estándar para etiquetas de idioma (`'es-MX'`, `'tr'`, `'en-US'`)."
		],
		analogia: "Imagina que tienes un **corrector** que conoce las reglas generales de un idioma. `toLowerCase()` dice: *«pon todo en minúsculas con la regla general»*. `toLocaleLowerCase('tr')` dice: *«pon todo en minúsculas **siguiendo específicamente las reglas del turco**»*. No traduce el texto, solo adapta la capitalización.",
		fuente: "MDN Web Docs - String.prototype.toLocaleLowerCase() | Especificación ECMA-402 (Intl)",
		notasPersonales: [
			"**Palabras clave:** `String` · `minúsculas` · `locale` · `Unicode` · `internacionalización` · `i18n`.",
			"**Recordar:** `toLocaleLowerCase()` = convertir a minúsculas respetando las reglas del locale.",
			"**Diferencia fundamental:** `toLowerCase()` → minúsculas (regla general). `toLocaleLowerCase()` → minúsculas + reglas del locale."
		],
		quiz: Q$2([
			[
				"¿Qué devuelve 'HOLA'.toLocaleLowerCase()?",
				[
					"'HOLA'",
					"'hola'",
					"'Hola'",
					"undefined"
				],
				1
			],
			[
				"¿Para qué sirve el parámetro 'locales'?",
				[
					"Para traducir el texto",
					"Para elegir reglas de conversión según idioma/región",
					"Para cambiar el color",
					"Para ordenar el array"
				],
				1
			],
			[
				"¿Qué devuelve 'I'.toLocaleLowerCase('tr')?",
				[
					"'i'",
					"'ı'",
					"'I'",
					"Un error"
				],
				1
			],
			[
				"¿Qué devuelve 'I'.toLowerCase()?",
				[
					"'i'",
					"'ı'",
					"'I'",
					"Un error"
				],
				0
			],
			[
				"¿toLocaleLowerCase() modifica el string original?",
				[
					"Sí, siempre",
					"No, devuelve una nueva",
					"Solo con let",
					"Depende del locale"
				],
				1
			],
			[
				"¿toLocaleLowerCase() traduce el texto al idioma del locale?",
				[
					"Sí",
					"No, solo cambia la capitalización",
					"Solo en turco",
					"Solo si se pasan dos locales"
				],
				1
			],
			[
				"¿Qué pasa si se pasa un locale inválido?",
				[
					"Devuelve el original",
					"Lanza RangeError",
					"Lanza TypeError",
					"Devuelve undefined"
				],
				1
			],
			[
				"¿Cuál es la contraparte de toLocaleLowerCase() para mayúsculas?",
				[
					"toUpperCase()",
					"toLocaleUpperCase()",
					"toLowerCase()",
					"localeCompare()"
				],
				1
			]
		])
	},
	tolocalelowercase: {
		id: "tolocalelowercase",
		titulo: "String.prototype.toLocaleLowerCase()",
		simulador: "string",
		definicion: ["Es un método built-in de los objetos `String` que devuelve la cadena de texto con **todos sus caracteres alfabéticos convertidos a minúsculas**, teniendo en cuenta las **reglas de conversión específicas de un `locale`** (idioma/región)."],
		queEs: [
			"Es un método de **transformación e internacionalización (i18n)** de cadenas de texto.",
			"Funciona igual que `toLowerCase()` en la mayoría de idiomas, pero puede producir **resultados distintos** cuando el idioma tiene reglas especiales de minúsculas.",
			"**No modifica la cadena original**, sino que retorna un **nuevo texto** con la conversión aplicada."
		],
		paraQueSirve: [
			"**Internacionalización (i18n):** mostrar texto correctamente en minúsculas en idiomas con reglas especiales (ej. turco, azerí).",
			"**Formularios multilingües:** normalizar campos de texto respetando el idioma del usuario.",
			"**Búsquedas locales:** comparar textos en minúsculas respetando las reglas del idioma para evitar falsos negativos."
		],
		comoFunciona: [
			"Recibe **opcionalmente** uno o varios `locales` como etiquetas BCP 47 (`'tr'`, `'en'`, `['tr','en']`).",
			"Si no se pasa ningún locale, usa el **locale predeterminado del entorno**.",
			"Recorre cada carácter y aplica el mapeo de minúsculas **según las reglas Unicode del locale indicado**.",
			"Los caracteres que no son letras (números, símbolos, espacios, emojis) se mantienen **igual**.",
			"Devuelve una nueva cadena; la original permanece intacta."
		],
		sintaxis: [{ code: `str.toLocaleLowerCase();
str.toLocaleLowerCase(locales);` }],
		nota: "**`locales` (opcional):** string o array de etiquetas BCP 47. **Retorno:** una nueva cadena con todas las letras en minúsculas según el locale.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico sin locale",
				code: `const texto = "HOLA MUNDO";
console.log(texto.toLocaleLowerCase()); // "hola mundo"`
			},
			{
				titulo: "Ejemplo 2: Especificando español",
				code: `const texto = "HOLA MUNDO";
console.log(texto.toLocaleLowerCase("es")); // "hola mundo"`
			},
			{
				titulo: "Ejemplo 3: El caso especial del turco 🇹🇷",
				descripcion: "En turco, la `I` mayúscula se convierte en `ı` (i sin punto), no en `i`.",
				code: `console.log("I".toLowerCase());                // "i"  (regla general)
console.log("I".toLocaleLowerCase("tr"));     // "ı"  (regla turca, sin punto)

console.log("ISTANBUL".toLowerCase());             // "istanbul"
console.log("ISTANBUL".toLocaleLowerCase("tr"));   // "ıstanbul"`
			},
			{
				titulo: "Ejemplo 4: No modifica el original",
				code: `const palabra = "HOLA";
const minuscula = palabra.toLocaleLowerCase();

console.log(palabra);   // "HOLA"
console.log(minuscula); // "hola"`
			}
		],
		errores: [
			{
				texto: "**Creer que traduce texto:** `toLocaleLowerCase()` solo **cambia la capitalización**; no traduce el texto al idioma del locale.",
				code: `// ❌ No traduce "HELLO" a "hola"
"HELLO".toLocaleLowerCase("es"); // "hello" (sigue siendo inglés)`
			},
			{
				texto: "**Pensar que modifica el string original:** las cadenas son inmutables.",
				code: `// ❌ El original no cambia
let texto = "HOLA";
texto.toLocaleLowerCase();
console.log(texto); // "HOLA"

// ✅ Hay que reasignar
texto = texto.toLocaleLowerCase();
console.log(texto); // "hola"`
			},
			{
				texto: "**Usar un locale inválido:** lanza `RangeError`.",
				code: `// ❌ RangeError: Incorrect locale information
"HOLA".toLocaleLowerCase("esto-no-es-un-locale");`
			},
			"**Confundirlo con `toLowerCase()`:** en la mayoría de casos producen lo mismo; la diferencia aparece con idiomas que tienen reglas especiales (turco, azerí...)."
		],
		casos: [
			"**Aplicaciones multilingües:** mostrar nombres o etiquetas correctamente en cada idioma.",
			"**Normalización de emails o usernames en entornos locales:** respetar la conversión de la `I` en turco para evitar confusiones.",
			"**Búsquedas insensibles a mayúsculas** que respeten reglas del idioma del usuario."
		],
		relacion: [
			"**`String.prototype.toLowerCase()`:** versión general (sin locale). Suele coincidir, pero no siempre.",
			"**`String.prototype.toLocaleUpperCase()`:** contraparte a mayúsculas respetando locale.",
			"**`String.prototype.localeCompare()`:** también usa reglas de locale, pero para **comparar** en lugar de transformar.",
			"**`Intl` API:** familia de objetos de internacionalización de JS.",
			"**BCP 47:** estándar para etiquetas de idioma (`'es-MX'`, `'tr'`, `'en-US'`)."
		],
		analogia: "Imagina que tienes un **corrector** que conoce las reglas generales de un idioma. `toLowerCase()` dice: *«pon todo en minúsculas con la regla general»*. `toLocaleLowerCase('tr')` dice: *«pon todo en minúsculas **siguiendo específicamente las reglas del turco**»*. No traduce el texto, solo adapta la capitalización.",
		fuente: "MDN Web Docs - String.prototype.toLocaleLowerCase() | Especificación ECMA-402 (Intl)",
		notasPersonales: [
			"**Palabras clave:** `String` · `minúsculas` · `locale` · `Unicode` · `internacionalización` · `i18n`.",
			"**Recordar:** `toLocaleLowerCase()` = convertir a minúsculas respetando las reglas del locale.",
			"**Diferencia fundamental:** `toLowerCase()` → minúsculas (regla general). `toLocaleLowerCase()` → minúsculas + reglas del locale."
		],
		quiz: Q$2([
			[
				"¿Qué devuelve 'HOLA'.toLocaleLowerCase()?",
				[
					"'HOLA'",
					"'hola'",
					"'Hola'",
					"undefined"
				],
				1
			],
			[
				"¿Para qué sirve el parámetro 'locales'?",
				[
					"Para traducir el texto",
					"Para elegir reglas de conversión según idioma/región",
					"Para cambiar el color",
					"Para ordenar el array"
				],
				1
			],
			[
				"¿Qué devuelve 'I'.toLocaleLowerCase('tr')?",
				[
					"'i'",
					"'ı'",
					"'I'",
					"Un error"
				],
				1
			],
			[
				"¿Qué devuelve 'I'.toLowerCase()?",
				[
					"'i'",
					"'ı'",
					"'I'",
					"Un error"
				],
				0
			],
			[
				"¿toLocaleLowerCase() modifica el string original?",
				[
					"Sí, siempre",
					"No, devuelve una nueva",
					"Solo con let",
					"Depende del locale"
				],
				1
			],
			[
				"¿toLocaleLowerCase() traduce el texto al idioma del locale?",
				[
					"Sí",
					"No, solo cambia la capitalización",
					"Solo en turco",
					"Solo si se pasan dos locales"
				],
				1
			],
			[
				"¿Qué pasa si se pasa un locale inválido?",
				[
					"Devuelve el original",
					"Lanza RangeError",
					"Lanza TypeError",
					"Devuelve undefined"
				],
				1
			],
			[
				"¿Cuál es la contraparte de toLocaleLowerCase() para mayúsculas?",
				[
					"toUpperCase()",
					"toLocaleUpperCase()",
					"toLowerCase()",
					"localeCompare()"
				],
				1
			]
		])
	},
	trim: {
		id: "trim",
		titulo: "String.prototype.trim()",
		simulador: "string",
		definicion: ["Es un método built-in de JavaScript que **elimina los espacios en blanco en ambos extremos** (inicio y final) de una cadena de texto."],
		queEs: [
			"Es uno de los métodos de **saneamiento y limpieza de datos** más utilizados en JavaScript, estandarizado en **ECMAScript 5 (ES5)**.",
			"Retorna una **nueva cadena** sin modificar el string original, quitando espacios, tabulaciones y saltos de línea iniciales o finales.",
			"Los espacios **internos** entre palabras se conservan intactos."
		],
		paraQueSirve: [
			"**Limpiar entradas de usuario:** eliminar los espacios accidentales que los usuarios suelen dejar al inicio o final de un campo de texto.",
			"**Validar campos vacíos:** evitar que un usuario envíe únicamente espacios (`\"   \"`) para pasar una validación de campo requerido.",
			"**Normalizar datos:** asegurar la consistencia de textos antes de guardarlos en bases de datos o compararlos."
		],
		comoFunciona: [
			"Escanea la cadena desde ambos extremos hacia el centro.",
			"Detecta todos los caracteres considerados **whitespace**: espacios (`\" \"`), tabulaciones (`\\t`), saltos de línea (`\\n`, `\\r`) y espacios de no separación (`\\u00A0`).",
			"Recorta esos caracteres de los bordes externos.",
			"Conserva intactos los espacios que estén **dentro** del texto (entre palabras).",
			"Devuelve una nueva cadena; la original permanece sin cambios."
		],
		sintaxis: [{ code: `str.trim();` }],
		nota: "**Parámetros:** ninguno. **Retorno:** una nueva cadena sin espacios en blanco en ninguno de sus dos extremos.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico",
				code: `const entrada = "   Hola Mundo   ";

console.log(entrada.trim()); // "Hola Mundo"
console.log(entrada);        // "   Hola Mundo   " (el original permanece intacto)`
			},
			{
				titulo: "Ejemplo 2: Validar que un input no esté vacío",
				code: `const comentarioUsuario = "      ";

if (comentarioUsuario.trim() === "") {
  console.log("Por favor, escribe un comentario válido.");
}`
			},
			{
				titulo: "Ejemplo 3: Limpieza de saltos de línea y tabulaciones",
				code: `const textoConFormato = "\\n\\t Mensaje con espacios y saltos \\n ";

console.log(textoConFormato.trim());
// "Mensaje con espacios y saltos"`
			},
			{
				titulo: "Ejemplo 4: Los espacios internos se conservan",
				code: `const frase = "  Hola    Mundo  ";
console.log(frase.trim()); // "Hola    Mundo" (los espacios internos quedan)`
			}
		],
		errores: [
			{
				texto: "**Creer que elimina espacios entre palabras:** `trim()` solo elimina espacios en los **bordes**.",
				code: `"Hola Mundo".trim(); // "Hola Mundo" (no se toca el espacio interno)

// Para eliminar TODOS los espacios internos:
"Hola Mundo".replace(/\\s+/g, "");  // "HolaMundo"
// O para colapsarlos a uno solo:
"Hola   Mundo".replace(/\\s+/g, " "); // "Hola Mundo"`
			},
			{
				texto: "**Intentar ejecutarlo sobre `null` o `undefined`:** lanza `TypeError`.",
				code: `// ❌ TypeError
const val = null;
val.trim();

// ✅ Seguro con optional chaining
val?.trim(); // undefined`
			},
			"**Pensar que modifica el string original:** los strings son inmutables. Hay que guardar el resultado o reasignar."
		],
		casos: [
			"**Formularios de inicio de sesión / registro:** limpiar el campo de correo, ya que los teclados móviles suelen agregar un espacio al final autocompletado.",
			"**Procesamiento de archivos CSV / TXT:** limpiar espacios sobrantes al separar columnas o líneas de texto plano.",
			"**Buscadores:** limpiar el término de búsqueda antes de enviarlo al servidor.",
			{
				texto: "**Combinación típica con `toLowerCase()` en emails:**",
				code: `const email = "  Usuario@Ejemplo.COM  ";
const limpio = email.trim().toLowerCase();
// "usuario@ejemplo.com"`
			}
		],
		relacion: [
			"**`String.prototype.trimStart()`** (o `trimLeft`): elimina espacios únicamente al **inicio** (izquierda).",
			"**`String.prototype.trimEnd()`** (o `trimRight`): elimina espacios únicamente al **final** (derecha).",
			"**`String.prototype.replace()`:** alternativa cuando se quieren eliminar espacios internos o patrones más complejos.",
			"**Inmutabilidad:** al igual que otros métodos de `String`, no altera el valor original."
		],
		analogia: "Es como **recortar los bordes sobrantes** de una hoja de papel tras imprimir un documento. No cambias ni tocas el texto o las imágenes del centro: solo eliminas los márgenes vacíos e innecesarios de las orillas.",
		fuente: "MDN Web Docs - String.prototype.trim() | Especificación ECMAScript (ECMA-262)",
		notasPersonales: ["**Buenas prácticas:** aplicar siempre `.trim()` a todos los campos de texto recibidos de un formulario antes de validar su longitud o enviarlos a la base de datos.", "**Para limpiar emails:** `email.toLowerCase().trim()` combina dos de las mejores prácticas de sanitización."],
		quiz: Q$2([
			[
				"¿Qué devuelve '   Hola   '.trim()?",
				[
					"'   Hola   '",
					"'Hola'",
					"' Hola '",
					"'Hola   '"
				],
				1
			],
			[
				"¿trim() modifica la cadena original?",
				[
					"Sí, siempre",
					"No, devuelve una nueva",
					"Solo si es let",
					"Depende del navegador"
				],
				1
			],
			[
				"¿Qué espacios elimina trim()?",
				[
					"Solo los del inicio",
					"Solo los del final",
					"Los del inicio y el final",
					"Todos los espacios"
				],
				2
			],
			[
				"¿Qué devuelve 'Hola Mundo'.trim()?",
				[
					"'Hola Mundo'",
					"'HolaMundo'",
					"'Hola'",
					"'Mundo'"
				],
				0
			],
			[
				"¿Qué pasa si llamas trim() sobre null?",
				[
					"Devuelve ''",
					"Lanza TypeError",
					"Devuelve null",
					"Devuelve undefined"
				],
				1
			],
			[
				"¿Qué método elimina solo los espacios al inicio?",
				[
					"trimEnd()",
					"trimStart()",
					"replaceAll()",
					"slice()"
				],
				1
			],
			[
				"¿Cómo limpias todos los espacios internos de 'Hola Mundo'?",
				[
					"trim()",
					"slice()",
					"replace(/\\s+/g, '')",
					"toUpperCase()"
				],
				2
			],
			[
				"¿Qué suele devolver '   '.trim() === ''?",
				[
					"true",
					"false",
					"undefined",
					"Lanza error"
				],
				0
			]
		])
	},
	trimstart: {
		id: "trimstart",
		titulo: "String.prototype.trimStart()",
		simulador: "string",
		definicion: ["Es un método built-in de JavaScript que **elimina los espacios en blanco del inicio** de una cadena de texto, sin tocar los del final."],
		queEs: [
			"Es un método de **saneamiento y limpieza de datos** estandarizado en **ECMAScript 2019 (ES10)**.",
			"Retorna una **nueva cadena** sin modificar el string original, quitando espacios, tabulaciones y saltos de línea **solo al inicio**.",
			"También es conocido por su nombre histórico **`trimLeft()`**, aunque **`trimStart()` es el nombre recomendado** por el estándar."
		],
		paraQueSirve: [
			"**Eliminar espacios al inicio de un texto:** limpiar entradas de usuario que suelen empezar con espacios.",
			"**Normalizar cadenas:** preparar textos antes de compararlos o almacenarlos.",
			"**Evitar errores:** eliminar espacios que rompen comparaciones o búsquedas (`\" Hola\"` ≠ `\"Hola\"`).",
			"**Preservar el final:** cuando necesitas conservar espacios del final (poco común, pero posible)."
		],
		comoFunciona: [
			"Escanea la cadena desde el **inicio** hacia el final.",
			"Detecta todos los caracteres considerados **whitespace**: espacios (`\" \"`), tabulaciones (`\\t`), saltos de línea (`\\n`, `\\r`) y espacios de no separación (`\\u00A0`).",
			"Recorta esos caracteres **solo del extremo izquierdo**.",
			"Conserva intactos los espacios del final y los internos.",
			"Devuelve una nueva cadena; la original permanece sin cambios."
		],
		sintaxis: [{ code: `str.trimStart();` }],
		nota: "**Parámetros:** ninguno. **Retorno:** una nueva cadena sin espacios en blanco al inicio.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico",
				code: `const texto = "    Hola Mundo";
console.log(texto.trimStart()); // "Hola Mundo"`
			},
			{
				titulo: "Ejemplo 2: Los espacios del final permanecen",
				code: `const texto = "    Hola Mundo    ";
console.log(texto.trimStart()); // "Hola Mundo    "  (los del final quedan)`
			},
			{
				titulo: "Ejemplo 3: Con tabulaciones y saltos de línea",
				code: `const texto = "\\n\\tHola";
console.log(texto.trimStart()); // "Hola"`
			},
			{
				titulo: "Ejemplo 4: La cadena original no cambia",
				code: `const texto = "   JavaScript";
const nuevoTexto = texto.trimStart();

console.log(texto);      // "   JavaScript"
console.log(nuevoTexto); // "JavaScript"`
			}
		],
		errores: [
			{
				texto: "**Pensar que modifica la cadena original:** los strings son inmutables. Hay que guardar el resultado o reasignar.",
				code: `// ❌ El original no cambia
let texto = "   Hola";
texto.trimStart();
console.log(texto); // "   Hola"

// ✅ Hay que reasignar
texto = texto.trimStart();
console.log(texto); // "Hola"`
			},
			{
				texto: "**Confundirlo con `trim()`:** `trimStart()` solo elimina los espacios del **inicio**.",
				code: `const texto = "   Hola   ";
texto.trimStart(); // "Hola   "  (los del final quedan)
texto.trim();      // "Hola"    (ambos lados)`
			},
			{
				texto: "**Pensar que elimina espacios internos:** los espacios entre palabras permanecen.",
				code: `"Hola     Mundo".trimStart(); // "Hola     Mundo" (no cambia nada)`
			},
			{
				texto: "**Olvidar los paréntesis:** `texto.trimStart` (sin paréntesis) devuelve la referencia al método, no lo ejecuta.",
				code: `texto.trimStart;  // [Function: trimStart]
texto.trimStart(); // ejecuta`
			}
		],
		casos: [
			"**Limpiar datos de formularios:** eliminar espacios iniciales que el usuario pudo dejar sin darse cuenta.",
			"**Procesar archivos de texto:** quitar indentación inicial de líneas.",
			"**Comparar cadenas correctamente:** `\"  Hola\".trimStart() === \"Hola\"`.",
			"**Preparar datos antes de almacenarlos:** normalizar antes de guardar en BD."
		],
		relacion: [
			"**`String.prototype.trim()`:** elimina espacios al **inicio y al final**.",
			"**`String.prototype.trimEnd()`:** elimina espacios **solo al final**.",
			"**`String.prototype.trimLeft()`:** alias histórico de `trimStart()`.",
			"**Inmutabilidad:** devuelve una nueva cadena, no modifica la original."
		],
		analogia: "Imagina que escribes un documento y dejas varias hojas en blanco **antes** de la primera página. `trimStart()` es como retirar únicamente esas hojas del principio, dejando el resto del documento intacto.",
		fuente: "MDN Web Docs - String.prototype.trimStart() | Especificación ECMAScript (ES10)",
		notasPersonales: ["**Regla:** si solo tienes que limpiar un lado, `trimStart()` / `trimEnd()` son más expresivos que `trim()`.", "**`trimStart()` es el nombre recomendado** por el estándar; `trimLeft()` existe solo por compatibilidad."],
		quiz: Q$2([
			[
				"¿Qué devuelve '   Hola'.trimStart()?",
				[
					"'   Hola'",
					"'Hola'",
					"'Hola   '",
					"undefined"
				],
				1
			],
			[
				"¿trimStart() modifica la cadena original?",
				[
					"Sí, siempre",
					"No, devuelve una nueva",
					"Solo si es let",
					"Depende del navegador"
				],
				1
			],
			[
				"¿Qué espacios elimina trimStart()?",
				[
					"Solo los del inicio",
					"Solo los del final",
					"Los del inicio y el final",
					"Todos los espacios"
				],
				0
			],
			[
				"¿Qué devuelve '   Hola   '.trimStart()?",
				[
					"'   Hola   '",
					"'Hola'",
					"'Hola   '",
					"'   Hola'"
				],
				2
			],
			[
				"¿Qué pasa si llamas trimStart() sobre un string vacío ''?",
				[
					"Lanza TypeError",
					"Devuelve ''",
					"Devuelve null",
					"Devuelve undefined"
				],
				1
			],
			[
				"¿Cuál es el alias histórico de trimStart()?",
				[
					"trimEnd()",
					"trimLeft()",
					"trimRight()",
					"slice()"
				],
				1
			],
			[
				"¿En qué versión de ECMAScript se estandarizó trimStart()?",
				[
					"ES5",
					"ES2015",
					"ES2019",
					"ES2023"
				],
				2
			],
			[
				"¿Qué devuelve 'Hola Mundo'.trimStart()?",
				[
					"'Hola Mundo'",
					"'HolaMundo'",
					"'Hola'",
					"'Mundo'"
				],
				0
			]
		])
	},
	trimend: {
		id: "trimend",
		titulo: "String.prototype.trimEnd()",
		simulador: "string",
		definicion: ["Es un método built-in de JavaScript que **elimina los espacios en blanco del final** de una cadena de texto, sin tocar los del inicio."],
		queEs: [
			"Es un método de **saneamiento y limpieza de datos** estandarizado en **ECMAScript 2019 (ES10)**.",
			"Retorna una **nueva cadena** sin modificar el string original, quitando espacios, tabulaciones y saltos de línea **solo al final**.",
			"También es conocido por su nombre histórico **`trimRight()`**, aunque **`trimEnd()` es el nombre recomendado** por el estándar."
		],
		paraQueSirve: [
			"**Eliminar espacios al final de un texto:** limpiar entradas de usuario que suelen terminar con espacios.",
			"**Normalizar cadenas:** preparar textos antes de compararlos o almacenarlos.",
			"**Evitar errores:** eliminar espacios que rompen comparaciones o búsquedas (`\"Hola \"` ≠ `\"Hola\"`).",
			"**Preservar el inicio:** cuando necesitas conservar espacios del inicio (raro, pero posible)."
		],
		comoFunciona: [
			"Escanea la cadena desde el **final** hacia el inicio.",
			"Detecta todos los caracteres considerados **whitespace**: espacios (`\" \"`), tabulaciones (`\\t`), saltos de línea (`\\n`, `\\r`) y espacios de no separación (`\\u00A0`).",
			"Recorta esos caracteres **solo del extremo derecho**.",
			"Conserva intactos los espacios del inicio y los internos.",
			"Devuelve una nueva cadena; la original permanece sin cambios."
		],
		sintaxis: [{ code: `str.trimEnd();` }],
		nota: "**Parámetros:** ninguno. **Retorno:** una nueva cadena sin espacios en blanco al final.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico",
				code: `const texto = "Hola Mundo    ";
console.log(texto.trimEnd()); // "Hola Mundo"`
			},
			{
				titulo: "Ejemplo 2: Los espacios del inicio permanecen",
				code: `const texto = "    Hola Mundo    ";
console.log(texto.trimEnd()); // "    Hola Mundo"  (los del inicio quedan)`
			},
			{
				titulo: "Ejemplo 3: Con tabulaciones y saltos de línea",
				code: `const texto = "Hola\\t\\n";
console.log(texto.trimEnd()); // "Hola"`
			},
			{
				titulo: "Ejemplo 4: La cadena original no cambia",
				code: `const texto = "JavaScript   ";
const nuevoTexto = texto.trimEnd();

console.log(texto);      // "JavaScript   "
console.log(nuevoTexto); // "JavaScript"`
			}
		],
		errores: [
			{
				texto: "**Pensar que modifica la cadena original:** los strings son inmutables. Hay que guardar el resultado o reasignar.",
				code: `// ❌ El original no cambia
let texto = "Hola   ";
texto.trimEnd();
console.log(texto); // "Hola   "

// ✅ Hay que reasignar
texto = texto.trimEnd();
console.log(texto); // "Hola"`
			},
			{
				texto: "**Confundirlo con `trim()`:** `trimEnd()` solo elimina los espacios del **final**.",
				code: `const texto = "   Hola   ";
texto.trimEnd(); // "   Hola"  (los del inicio quedan)
texto.trim();    // "Hola"    (ambos lados)`
			},
			{
				texto: "**Pensar que elimina espacios internos:** los espacios entre palabras permanecen.",
				code: `"Hola     Mundo".trimEnd(); // "Hola     Mundo" (no cambia nada)`
			},
			{
				texto: "**Olvidar los paréntesis:** `texto.trimEnd` (sin paréntesis) devuelve la referencia al método, no lo ejecuta.",
				code: `texto.trimEnd;  // [Function: trimEnd]
texto.trimEnd(); // ejecuta`
			}
		],
		casos: [
			"**Limpiar datos de formularios:** eliminar espacios finales que el usuario pudo dejar al pulsar la barra espaciadora.",
			"**Procesar archivos de texto:** quitar espacios antes de saltos de línea.",
			"**Comparar cadenas correctamente:** `\"Hola  \".trimEnd() === \"Hola\"`.",
			"**Preparar datos antes de almacenarlos:** normalizar antes de guardar en BD."
		],
		relacion: [
			"**`String.prototype.trim()`:** elimina espacios al **inicio y al final**.",
			"**`String.prototype.trimStart()`:** elimina espacios **solo al inicio**.",
			"**`String.prototype.trimRight()`:** alias histórico de `trimEnd()`.",
			"**Inmutabilidad:** devuelve una nueva cadena, no modifica la original."
		],
		analogia: "Imagina que escribes una carta y, al terminar, dejas varias hojas en blanco **al final**. `trimEnd()` es como retirar únicamente esas hojas en blanco del final, dejando el contenido y el inicio de la carta exactamente igual.",
		fuente: "MDN Web Docs - String.prototype.trimEnd() | Especificación ECMAScript (ES10)",
		notasPersonales: ["**Regla:** si solo tienes que limpiar un lado, `trimStart()` / `trimEnd()` son más expresivos que `trim()`.", "**`trimEnd()` es el nombre recomendado** por el estándar; `trimRight()` existe solo por compatibilidad."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'Hola   '.trimEnd()?",
				[
					"'Hola   '",
					"'Hola'",
					"'   Hola'",
					"undefined"
				],
				1
			],
			[
				"¿trimEnd() modifica la cadena original?",
				[
					"Sí, siempre",
					"No, devuelve una nueva",
					"Solo si es let",
					"Depende del navegador"
				],
				1
			],
			[
				"¿Qué espacios elimina trimEnd()?",
				[
					"Solo los del inicio",
					"Solo los del final",
					"Los del inicio y el final",
					"Todos los espacios"
				],
				1
			],
			[
				"¿Qué devuelve '   Hola   '.trimEnd()?",
				[
					"'   Hola   '",
					"'Hola'",
					"'   Hola'",
					"'Hola   '"
				],
				2
			],
			[
				"¿Qué pasa si llamas trimEnd() sobre un string vacío ''?",
				[
					"Lanza TypeError",
					"Devuelve ''",
					"Devuelve null",
					"Devuelve undefined"
				],
				1
			],
			[
				"¿Cuál es el alias histórico de trimEnd()?",
				[
					"trimLeft()",
					"trimStart()",
					"trimRight()",
					"slice()"
				],
				2
			],
			[
				"¿En qué versión de ECMAScript se estandarizó trimEnd()?",
				[
					"ES5",
					"ES2015",
					"ES2019",
					"ES2023"
				],
				2
			],
			[
				"¿Qué devuelve 'Hola Mundo'.trimEnd()?",
				[
					"'Hola Mundo'",
					"'HolaMundo'",
					"'Hola'",
					"'Mundo'"
				],
				0
			]
		])
	},
	trimleft: {
		id: "trimleft",
		titulo: "String.prototype.trimLeft()",
		simulador: "string",
		esAlias: "trimstart",
		definicion: ["Es un método built-in de JavaScript que **elimina los espacios en blanco del inicio** de una cadena de texto, sin tocar los del final.", "**`trimLeft()` es un alias de `trimStart()`**: se comportan exactamente igual."],
		queEs: [
			"Es un **método heredado** de `String.prototype` que existe únicamente por **compatibilidad histórica** con navegadores antiguos.",
			"Su nombre recomendado por el estándar es **`trimStart()`**, así que en código moderno usa siempre ese.",
			"No modifica la cadena original: devuelve una nueva."
		],
		paraQueSirve: ["**Compatibilidad con código legacy:** si encuentras `trimLeft()` en código viejo, ahora ya sabes qué hace.", "**Migración a código moderno:** el objetivo es reemplazar `trimLeft()` por `trimStart()`."],
		comoFunciona: [
			"Escanea la cadena desde el **inicio** hacia el final.",
			"Detecta todos los caracteres considerados **whitespace** (espacios, `\\t`, `\\n`, `\\r`, `\\u00A0`).",
			"Recorta esos caracteres **solo del extremo izquierdo**.",
			"Conserva intactos los espacios del final y los internos.",
			"Devuelve una nueva cadena; la original permanece sin cambios.",
			"Se comporta **exactamente igual** que `trimStart()`."
		],
		sintaxis: [{ code: `str.trimLeft(); // ⚠️ alias de trimStart()` }, {
			caption: "Forma recomendada en código moderno:",
			code: `str.trimStart();`
		}],
		nota: "**Parámetros:** ninguno. **Retorno:** una nueva cadena sin espacios en blanco al inicio. **Recomendación:** usa `trimStart()`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico (idéntico a trimStart)",
				code: `const texto = "    Hola Mundo";
console.log(texto.trimLeft());  // "Hola Mundo"
console.log(texto.trimStart()); // "Hola Mundo"  (mismo resultado)`
			},
			{
				titulo: "Ejemplo 2: Los espacios del final permanecen",
				code: `const texto = "    Hola Mundo    ";
console.log(texto.trimLeft()); // "Hola Mundo    "`
			},
			{
				titulo: "Ejemplo 3: Migración recomendada",
				code: `// ❌ Código legacy
const limpio = texto.trimLeft();

// ✅ Código moderno
const limpioModerno = texto.trimStart();`
			}
		],
		errores: [
			{
				texto: "**Usar `trimLeft()` en código nuevo:** aunque funcione, se considera legado. Usa `trimStart()`.",
				code: `// ❌ En código nuevo
texto.trimLeft();

// ✅ Recomendado
texto.trimStart();`
			},
			{
				texto: "**Pensar que recorta ambos lados:** solo recorta al **inicio**.",
				code: `"   Hola   ".trimLeft(); // "Hola   "  (los del final quedan)
"   Hola   ".trim();     // "Hola"     (ambos lados)`
			},
			{
				texto: "**Pensar que modifica el string original:** los strings son inmutables.",
				code: `let texto = "   Hola";
texto.trimLeft();
console.log(texto); // "   Hola"`
			}
		],
		casos: ["**Compatibilidad con código antiguo:** mantener aplicaciones legacy.", "**Migración a código moderno:** reemplazar todas las apariciones por `trimStart()`."],
		relacion: [
			"**`String.prototype.trimStart()`:** el método canónico (recomendado). **Hace lo mismo.**",
			"**`String.prototype.trim()`:** elimina espacios al inicio y al final.",
			"**`String.prototype.trimEnd()` / `trimRight()`:** solo al final.",
			"**`String.prototype.trimLeft()`** es equivalente a **`trimStart()`**."
		],
		analogia: "Es como tener **dos nombres para la misma persona**: `trimLeft` y `trimStart` son la misma función. La diferencia es que `trimStart` es el nombre actual y oficial, mientras que `trimLeft` es el apodo antiguo que aún se conserva por compatibilidad.",
		fuente: "MDN Web Docs - String.prototype.trimStart() (alias trimLeft)",
		notasPersonales: [
			"**Equivalencia literal:** `texto.trimLeft()` ⟺ `texto.trimStart()`.",
			"**Recordar:** `trimLeft` = elimina del **inicio**.",
			"**Regla del proyecto:** en código nuevo, siempre `trimStart()`."
		],
		quiz: Q$2([
			[
				"¿Qué devuelve '   Hola'.trimLeft()?",
				[
					"'   Hola'",
					"'Hola'",
					"'Hola   '",
					"undefined"
				],
				1
			],
			[
				"¿trimLeft() es alias de qué método?",
				[
					"trimEnd()",
					"trimStart()",
					"trimRight()",
					"trim()"
				],
				1
			],
			[
				"¿Qué espacios elimina trimLeft()?",
				[
					"Solo los del inicio",
					"Solo los del final",
					"Los del inicio y el final",
					"Todos los espacios"
				],
				0
			],
			[
				"¿Qué devuelve '   Hola   '.trimLeft()?",
				[
					"'   Hola   '",
					"'Hola'",
					"'Hola   '",
					"'   Hola'"
				],
				2
			],
			[
				"¿Cuál es el nombre recomendado por el estándar?",
				[
					"trimLeft()",
					"trimStart()",
					"trimBoth()",
					"trim()"
				],
				1
			],
			[
				"¿trimLeft() modifica la cadena original?",
				[
					"Sí",
					"No, devuelve una nueva",
					"Solo con let",
					"Depende del navegador"
				],
				1
			],
			[
				"¿Qué método limpia solo el final?",
				[
					"trimLeft()",
					"trimStart()",
					"trimEnd()",
					"trim()"
				],
				2
			],
			[
				"¿Qué devuelve 'Hola Mundo'.trimLeft()?",
				[
					"'Hola Mundo'",
					"'HolaMundo'",
					"'Hola'",
					"'Mundo'"
				],
				0
			]
		])
	},
	trimright: {
		id: "trimright",
		titulo: "String.prototype.trimRight()",
		simulador: "string",
		esAlias: "trimend",
		definicion: ["Es un método built-in de JavaScript que **elimina los espacios en blanco del final** de una cadena de texto, sin tocar los del inicio.", "**`trimRight()` es un alias de `trimEnd()`**: se comportan exactamente igual."],
		queEs: [
			"Es un **método heredado** de `String.prototype` que existe únicamente por **compatibilidad histórica** con navegadores antiguos.",
			"Su nombre recomendado por el estándar es **`trimEnd()`**, así que en código moderno usa siempre ese.",
			"No modifica la cadena original: devuelve una nueva."
		],
		paraQueSirve: ["**Compatibilidad con código legacy:** si encuentras `trimRight()` en código viejo, ahora ya sabes qué hace.", "**Migración a código moderno:** el objetivo es reemplazar `trimRight()` por `trimEnd()`."],
		comoFunciona: [
			"Escanea la cadena desde el **final** hacia el inicio.",
			"Detecta todos los caracteres considerados **whitespace** (espacios, `\\t`, `\\n`, `\\r`, `\\u00A0`).",
			"Recorta esos caracteres **solo del extremo derecho**.",
			"Conserva intactos los espacios del inicio y los internos.",
			"Devuelve una nueva cadena; la original permanece sin cambios.",
			"Se comporta **exactamente igual** que `trimEnd()`."
		],
		sintaxis: [{ code: `str.trimRight(); // ⚠️ alias de trimEnd()` }, {
			caption: "Forma recomendada en código moderno:",
			code: `str.trimEnd();`
		}],
		nota: "**Parámetros:** ninguno. **Retorno:** una nueva cadena sin espacios en blanco al final. **Recomendación:** usa `trimEnd()`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico (idéntico a trimEnd)",
				code: `const texto = "Hola Mundo    ";
console.log(texto.trimRight()); // "Hola Mundo"
console.log(texto.trimEnd());   // "Hola Mundo"  (mismo resultado)`
			},
			{
				titulo: "Ejemplo 2: Los espacios del inicio permanecen",
				code: `const texto = "    Hola Mundo    ";
console.log(texto.trimRight()); // "    Hola Mundo"`
			},
			{
				titulo: "Ejemplo 3: Migración recomendada",
				code: `// ❌ Código legacy
const limpio = texto.trimRight();

// ✅ Código moderno
const limpioModerno = texto.trimEnd();`
			}
		],
		errores: [
			{
				texto: "**Usar `trimRight()` en código nuevo:** aunque funcione, se considera legado. Usa `trimEnd()`.",
				code: `// ❌ En código nuevo
texto.trimRight();

// ✅ Recomendado
texto.trimEnd();`
			},
			{
				texto: "**Pensar que recorta ambos lados:** solo recorta al **final**.",
				code: `"   Hola   ".trimRight(); // "   Hola"  (los del inicio quedan)
"   Hola   ".trim();      // "Hola"     (ambos lados)`
			},
			{
				texto: "**Pensar que modifica el string original:** los strings son inmutables.",
				code: `let texto = "Hola   ";
texto.trimRight();
console.log(texto); // "Hola   "`
			}
		],
		casos: ["**Compatibilidad con código antiguo:** mantener aplicaciones legacy.", "**Migración a código moderno:** reemplazar todas las apariciones por `trimEnd()`."],
		relacion: [
			"**`String.prototype.trimEnd()`:** el método canónico (recomendado). **Hace lo mismo.**",
			"**`String.prototype.trim()`:** elimina espacios al inicio y al final.",
			"**`String.prototype.trimStart()` / `trimLeft()`:** solo al inicio.",
			"**`String.prototype.trimRight()`** es equivalente a **`trimEnd()`**."
		],
		analogia: "Es como tener **dos nombres para la misma persona**: `trimRight` y `trimEnd` son la misma función. La diferencia es que `trimEnd` es el nombre actual y oficial, mientras que `trimRight` es el apodo antiguo que aún se conserva por compatibilidad.",
		fuente: "MDN Web Docs - String.prototype.trimEnd() (alias trimRight)",
		notasPersonales: [
			"**Equivalencia literal:** `texto.trimRight()` ⟺ `texto.trimEnd()`.",
			"**Recordar:** `trimRight` = elimina del **final**.",
			"**Regla del proyecto:** en código nuevo, siempre `trimEnd()`."
		],
		quiz: Q$2([
			[
				"¿Qué devuelve 'Hola   '.trimRight()?",
				[
					"'Hola   '",
					"'Hola'",
					"'   Hola'",
					"undefined"
				],
				1
			],
			[
				"¿trimRight() es alias de qué método?",
				[
					"trimStart()",
					"trimEnd()",
					"trimLeft()",
					"trim()"
				],
				1
			],
			[
				"¿Qué espacios elimina trimRight()?",
				[
					"Solo los del inicio",
					"Solo los del final",
					"Los del inicio y el final",
					"Todos los espacios"
				],
				1
			],
			[
				"¿Qué devuelve '   Hola   '.trimRight()?",
				[
					"'   Hola   '",
					"'Hola'",
					"'   Hola'",
					"'Hola   '"
				],
				2
			],
			[
				"¿Cuál es el nombre recomendado por el estándar?",
				[
					"trimRight()",
					"trimEnd()",
					"trimBoth()",
					"trim()"
				],
				1
			],
			[
				"¿trimRight() modifica la cadena original?",
				[
					"Sí",
					"No, devuelve una nueva",
					"Solo con let",
					"Depende del navegador"
				],
				1
			],
			[
				"¿Qué método limpia solo el inicio?",
				[
					"trimRight()",
					"trimEnd()",
					"trimStart()",
					"trim()"
				],
				2
			],
			[
				"¿Qué devuelve 'Hola Mundo'.trimRight()?",
				[
					"'Hola Mundo'",
					"'HolaMundo'",
					"'Hola'",
					"'Mundo'"
				],
				0
			]
		])
	},
	padstart: {
		id: "padstart",
		titulo: "String.prototype.padStart()",
		simulador: "string",
		definicion: ["Es un método built-in de JavaScript que **rellena el inicio de una cadena de texto** con otra cadena dada (repetida si es necesario) hasta alcanzar una longitud total especificada."],
		queEs: [
			"Es un método de **formato y alineación de texto** introducido en **ECMAScript 2017 (ES8)**.",
			"Retorna una **nueva cadena** con el relleno (*padding*) aplicado al principio (a la izquierda).",
			"**No modifica la cadena original** (los *strings* son inmutables)."
		],
		paraQueSirve: [
			"**Formatear números con ceros a la izquierda:** representar fechas, horas, minutos o códigos numéricos (`\"05\"` en vez de `\"5\"`).",
			"**Enmascarar datos sensibles:** ocultar los primeros dígitos de números de tarjetas de crédito o identificación dejando solo los últimos visibles.",
			"**Alinear texto a la derecha:** organizar columnas numéricas o montos de dinero en reportes y consolas."
		],
		comoFunciona: [
			"Recibe `targetLength` (longitud total final deseada) y opcionalmente `padString`.",
			"Si la longitud actual es **menor** que `targetLength`, inserta `padString` (repetido si hace falta) al inicio hasta alcanzar la longitud exacta.",
			"Si la longitud actual es **mayor o igual** que `targetLength`, retorna el string original sin cambios.",
			"Si `padString` no cabe completo en el hueco, se **trunca** para no exceder `targetLength`.",
			"Devuelve una nueva cadena; la original permanece intacta."
		],
		sintaxis: [{ code: `str.padStart(targetLength);
str.padStart(targetLength, padString);` }],
		nota: "**`targetLength`:** longitud total final de la cadena. **`padString` (opcional):** con qué se rellena al inicio. Por defecto es `\" \"` (espacio). **Retorno:** una nueva cadena rellenada por la izquierda.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Ceros a la izquierda (formato de hora)",
				code: `const minutos = "5";
const segundos = "9";

const reloj = \`\${minutos.padStart(2, "0")}:\${segundos.padStart(2, "0")}\`;
console.log(reloj); // "05:09"`
			},
			{
				titulo: "Ejemplo 2: Enmascarar tarjeta de crédito",
				code: `const ultimosCuatro = "4321";
const enmascarada = ultimosCuatro.padStart(16, "*");

console.log(enmascarada); // "************4321"`
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
*/`
			},
			{
				titulo: "Ejemplo 4: Si ya es más larga, no cambia",
				code: `const texto = "JavaScript";
console.log(texto.padStart(5, "0")); // "JavaScript" (sin cambios)`
			}
		],
		errores: [
			{
				texto: "**Intentar usarlo sobre un número:** es un método exclusivo de strings. Convierte antes.",
				code: `// ❌ TypeError
(5).padStart(2, "0");

// ✅ Convierte primero
String(5).padStart(2, "0"); // "05"
(5).toString().padStart(2, "0"); // "05"`
			},
			{
				texto: "**Confundir `targetLength` con la cantidad de caracteres a añadir:** es la longitud **total final**, no el relleno.",
				code: `"1234".padStart(3, "0"); // "1234" (ya tiene length 4 > 3, no cambia)
"12".padStart(4, "0");   // "0012" (rellena 2 ceros)`
			},
			{
				texto: "**Olvidar que `padString` puede truncarse:** si no cabe completo, solo se usa la parte necesaria.",
				code: `"A".padStart(5, "12345"); // "A1234" (solo caben 4 caracteres del padString)`
			},
			{
				texto: "**Pensar que modifica el string original:** los strings son inmutables.",
				code: `let texto = "5";
texto.padStart(2, "0");
console.log(texto); // "5"

// ✅ Hay que reasignar
texto = texto.padStart(2, "0");
console.log(texto); // "05"`
			}
		],
		casos: [
			"**Generación de folios / correlativos:** crear identificadores estandarizados tipo `\"INV-00042\"`.",
			"**Relojes y cronómetros:** formatear valores numéricos de tiempo en interfaces de usuario.",
			"**Muestreo de datos financieros:** alinear cifras con decimales a la derecha en reportes de texto plano.",
			"**Enmascarado de datos sensibles:** mostrar solo los últimos dígitos de una tarjeta o cuenta."
		],
		relacion: [
			"**`String.prototype.padEnd()`:** su contraparte; añade el relleno al **final** (derecha).",
			"**`String.prototype.repeat()`:** repite una cadena N veces sin límite de longitud total.",
			"**`Number.prototype.toFixed()`:** ajusta la cantidad de decimales de un número antes de convertirlo a string.",
			"**Inmutabilidad:** al igual que otros métodos de `String`, no altera el valor original."
		],
		analogia: "Es como escribir en un **formulario que exige un código de 5 dígitos**. Si tu número es solo `42`, rellenas los primeros casilleros a la izquierda escribiendo ceros hasta llenar la casilla: `00042`.",
		fuente: "MDN Web Docs - String.prototype.padStart() | Especificación ECMAScript 2017 (ES8)",
		notasPersonales: ["**Truco rápido** para formatear números de un solo dígito: `String(num).padStart(2, '0')`.", "Soportado en todos los entornos y navegadores modernos desde 2017."],
		quiz: Q$2([
			[
				"¿Qué devuelve '5'.padStart(3, '0')?",
				[
					"'5'",
					"'005'",
					"'500'",
					"undefined"
				],
				1
			],
			[
				"¿padStart() modifica la cadena original?",
				[
					"Sí, siempre",
					"No, devuelve una nueva",
					"Solo si es let",
					"Depende del navegador"
				],
				1
			],
			[
				"¿En qué lado añade el relleno padStart()?",
				[
					"Al inicio (izquierda)",
					"Al final (derecha)",
					"En el medio",
					"En ambos lados"
				],
				0
			],
			[
				"¿Qué devuelve 'JavaScript'.padStart(5, '0')?",
				[
					"'JavaScript'",
					"'00000JavaScript'",
					"'5'",
					"Un error"
				],
				0
			],
			[
				"¿Qué devuelve 'A'.padStart(5, '12345')?",
				[
					"'A1234'",
					"1234A",
					"'AAAAA'",
					"'A12345'"
				],
				0
			],
			[
				"¿Qué pasa si llamas padStart() sobre un número?",
				[
					"Funciona normal",
					"Lanza TypeError",
					"Devuelve NaN",
					"Devuelve null"
				],
				1
			],
			[
				"¿Cuál es el padString por defecto?",
				[
					"'0'",
					"' '",
					"'-'",
					"'*'"
				],
				1
			],
			[
				"¿Qué método hace el relleno al final en lugar del inicio?",
				[
					"padEnd()",
					"padStart()",
					"repeat()",
					"fill()"
				],
				0
			]
		])
	},
	padend: {
		id: "padend",
		titulo: "String.prototype.padEnd()",
		simulador: "string",
		definicion: ["Es un método built-in de JavaScript que **rellena el final de una cadena de texto** con otra cadena dada (repetida si es necesario) hasta alcanzar una longitud total especificada."],
		queEs: [
			"Es un método de **formato y alineación de texto** introducido en **ECMAScript 2017 (ES8)**.",
			"Retorna una **nueva cadena** con el relleno (*padding*) aplicado al final (a la derecha).",
			"**No modifica la cadena original** (los *strings* son inmutables)."
		],
		paraQueSirve: [
			"**Alinear texto en tablas o consola:** garantizar que múltiples líneas de texto tengan exactamente el mismo ancho visual.",
			"**Formatear datos estructurados:** rellenar campos de longitud fija (tickets, reportes de texto, códigos).",
			"**Completar cadenas con caracteres repetidos:** agregar puntos, guiones o espacios para completar un diseño o interfaz en modo texto."
		],
		comoFunciona: [
			"Recibe `targetLength` (longitud total final deseada) y opcionalmente `padString`.",
			"Si la longitud actual es **menor** que `targetLength`, inserta `padString` (repetido si hace falta) al final hasta alcanzar la longitud exacta.",
			"Si la longitud actual es **mayor o igual** que `targetLength`, retorna el string original sin cambios.",
			"Si `padString` no cabe completo en el hueco, se **trunca** para no exceder `targetLength`.",
			"Devuelve una nueva cadena; la original permanece intacta."
		],
		sintaxis: [{ code: `str.padEnd(targetLength);
str.padEnd(targetLength, padString);` }],
		nota: "**`targetLength`:** longitud total final de la cadena. **`padString` (opcional):** con qué se rellena al final. Por defecto es `\" \"` (espacio). **Retorno:** una nueva cadena rellenada por la derecha.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico (espacios por defecto)",
				code: `const cadena = "Hola";

console.log(cadena.padEnd(10));
// "Hola      " (agrega 6 espacios al final para sumar 10)`
			},
			{
				titulo: "Ejemplo 2: Relleno con un carácter específico",
				code: `const titulo = "Capítulo 1";

console.log(titulo.padEnd(20, "."));
// "Capítulo 1.........."`
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
*/`
			},
			{
				titulo: "Ejemplo 4: Si ya es más larga, no cambia",
				code: `const texto = "JavaScript";
console.log(texto.padEnd(5, "0")); // "JavaScript" (sin cambios)`
			}
		],
		errores: [
			{
				texto: "**Intentar usarlo sobre un número:** es un método exclusivo de strings. Convierte antes.",
				code: `// ❌ TypeError
(5).padEnd(3, "0");

// ✅ Convierte primero
String(5).padEnd(3, "0"); // "500"`
			},
			{
				texto: "**Confundir `targetLength` con la cantidad de caracteres a añadir:** es la longitud **total final**, no el relleno.",
				code: `"1234".padEnd(3, "0"); // "1234" (ya tiene length 4 > 3, no cambia)
"12".padEnd(4, "0");   // "1200" (rellena 2 ceros)`
			},
			{
				texto: "**Olvidar que `padString` puede truncarse:** si no cabe completo, solo se usa la parte necesaria.",
				code: `"A".padEnd(5, "12345"); // "A1234" (solo caben 4 caracteres del padString)`
			},
			{
				texto: "**Pensar que modifica el string original:** los strings son inmutables.",
				code: `let texto = "Hola";
texto.padEnd(10, ".");
console.log(texto); // "Hola"

// ✅ Hay que reasignar
texto = texto.padEnd(10, ".");
console.log(texto); // "Hola......"`
			}
		],
		casos: [
			"**Formatos de impresión/facturación:** crear tickets de venta o archivos de texto plano con anchos de columna fijos.",
			"**Formatos de salida CLI:** alinear nombres de comandos y sus descripciones al construir herramientas de línea de comandos.",
			"**Máscaras de datos:** rellenar el final con caracteres para completar diseños o interfaces en modo texto."
		],
		relacion: [
			"**`String.prototype.padStart()`:** su contraparte; añade el relleno al **inicio** (izquierda).",
			"**`String.prototype.repeat()`:** repite una cadena N veces sin límite de longitud total.",
			"**Inmutabilidad:** al igual que otros métodos de `String`, no altera el valor original."
		],
		analogia: "Es como escribir en un **formulario en papel** donde cada campo tiene casilleros contados. Si tu respuesta es más corta que la fila de casilleros, `padEnd()` rellena los casilleros vacíos de la **derecha** con guiones o espacios hasta llegar al borde final.",
		fuente: "MDN Web Docs - String.prototype.padEnd() | Especificación ECMAScript 2017 (ES8)",
		notasPersonales: ["`padEnd()` siempre trabaja con la propiedad `.length` del string.", "Si necesitas transformar un número antes de rellenarlo, conviértelo primero a string con `String(numero)` o `numero.toString()`."],
		quiz: Q$2([
			[
				"¿Qué devuelve '5'.padEnd(3, '0')?",
				[
					"'5'",
					"'005'",
					"'500'",
					"undefined"
				],
				2
			],
			[
				"¿padEnd() modifica la cadena original?",
				[
					"Sí, siempre",
					"No, devuelve una nueva",
					"Solo si es let",
					"Depende del navegador"
				],
				1
			],
			[
				"¿En qué lado añade el relleno padEnd()?",
				[
					"Al inicio (izquierda)",
					"Al final (derecha)",
					"En el medio",
					"En ambos lados"
				],
				1
			],
			[
				"¿Qué devuelve 'JavaScript'.padEnd(5, '0')?",
				[
					"'JavaScript'",
					"'00000JavaScript'",
					"'5'",
					"Un error"
				],
				0
			],
			[
				"¿Qué devuelve 'A'.padEnd(5, '12345')?",
				[
					"'A1234'",
					"'1234A'",
					"'AAAAA'",
					"'A12345'"
				],
				0
			],
			[
				"¿Qué pasa si llamas padEnd() sobre un número?",
				[
					"Funciona normal",
					"Lanza TypeError",
					"Devuelve NaN",
					"Devuelve null"
				],
				1
			],
			[
				"¿Cuál es el padString por defecto?",
				[
					"'0'",
					"' '",
					"'-'",
					"'*'"
				],
				1
			],
			[
				"¿Qué método hace el relleno al inicio en lugar del final?",
				[
					"padEnd()",
					"padStart()",
					"repeat()",
					"fill()"
				],
				1
			]
		])
	},
	substring: {
		id: "substring",
		titulo: "String.prototype.substring()",
		simulador: "string",
		definicion: ["Es un método built-in de los objetos `String` que **devuelve un subconjunto (una sección) de una cadena de texto**, extraído entre dos índices especificados."],
		queEs: [
			"Es un método tradicional de **extracción de subcadenas** presente desde **ECMAScript 1 (ES1)**.",
			"Retorna un **nuevo string** con los caracteres comprendidos entre el índice de inicio y el índice de fin, **sin modificar la cadena original**.",
			"A diferencia de `slice()`, **no acepta índices negativos** (los convierte a `0`) y **no intercambia** los argumentos silenciosamente."
		],
		paraQueSirve: [
			"**Recortar textos:** extraer los primeros 100 caracteres de una noticia para una vista previa.",
			"**Aislar partes de una estructura:** extraer el año de `\"2026-07-20\"`, o partes fijas de un código/identificador.",
			"**Formatear datos:** combinar con `indexOf()` para recortar antes o después de un carácter delimitador."
		],
		comoFunciona: [
			"Toma los caracteres desde `indexStart` hasta `indexEnd` (**sin incluir** el carácter en `indexEnd`).",
			"Si `indexStart` es mayor que `indexEnd`, `substring()` **los intercambia automáticamente** (ej. `substring(5, 2)` equivale a `substring(2, 5)`).",
			"Cualquier argumento negativo o `NaN` se trata como si fuera `0`.",
			"Si un índice es mayor que `str.length`, se trata como `str.length`.",
			"Devuelve una nueva cadena; la original permanece intacta."
		],
		sintaxis: [{ code: `str.substring(indexStart);
str.substring(indexStart, indexEnd);` }],
		nota: "**`indexStart`:** primer carácter a incluir. **`indexEnd` (opcional):** primer carácter a **excluir**. **Retorno:** un nuevo `String` con la sección extraída.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico",
				code: `const texto = "JavaScript";

console.log(texto.substring(0, 4)); // "Java"   (índice 4 excluido)
console.log(texto.substring(4));    // "Script" (hasta el final)`
			},
			{
				titulo: "Ejemplo 2: Intercambio automático e índices negativos",
				code: `const palabra = "Desarrollo";

// Como inicio (5) > fin (2), los intercambia
console.log(palabra.substring(5, 2)); // "sar"

// Los negativos se convierten en 0
console.log(palabra.substring(-3, 3)); // "Des" (equivale a substring(0, 3))`
			},
			{
				titulo: "Ejemplo 3: Extraer partes dinámicas con indexOf()",
				code: `const email = "usuario@ejemplo.com";
const posArroba = email.indexOf("@");

const nombreUsuario = email.substring(0, posArroba);
console.log(nombreUsuario); // "usuario"`
			},
			{
				titulo: "Ejemplo 4: La cadena original no cambia",
				code: `const original = "Hola Mundo";
const parte = original.substring(0, 4);

console.log(original); // "Hola Mundo"
console.log(parte);    // "Hola"`
			}
		],
		errores: [
			{
				texto: "**Confundir con el método obsoleto `substr()`:** `substr(inicio, longitud)` toma una cantidad, mientras que `substring(inicio, fin)` usa índices.",
				code: `"JavaScript".substring(2, 4); // "va"   (índices)
"JavaScript".substr(2, 4);    // "vaSc" (2 desde el 2)`
			},
			{
				texto: "**Esperar índices negativos (como en `slice()`):** `substring()` los convierte a `0`.",
				code: `"Hola".substring(-2); // "Hola" (¡no son las últimas letras!)
"Hola".slice(-2);     // "la"   (esto sí)`
			},
			{
				texto: "**Olvidar que el límite superior es excluyente:** `substring(0, 3)` devuelve los índices 0, 1 y 2.",
				code: `"JavaScript".substring(0, 3); // "Jav"  (no "Java")`
			},
			{
				texto: "**Pensar que lanza error con índices invertidos:** los intercambia en silencio (a diferencia de `slice()`).",
				code: `"JavaScript".substring(5, 2); // "vaS"  (equivale a 2, 5)
"JavaScript".slice(5, 2);     // ""     (slice devuelve vacío)`
			}
		],
		casos: [
			"**Acortar textos en UI:** crear truncados de texto (`texto.substring(0, 50) + \"...\"`).",
			"**Formateo de fechas:** separar partes de una cadena formateada (`\"20260720\"` → año, mes, día).",
			"**Limpieza de prefijos/sufijos:** remover caracteres fijos al inicio si se conoce su longitud.",
			"**Extracción tras `indexOf()`:** recortar antes o después de un separador conocido."
		],
		relacion: [
			"**`String.prototype.slice()`:** método muy similar y **más recomendado** en código moderno (acepta negativos y no intercambia argumentos en silencio).",
			"**`String.prototype.substr()`:** método obsoleto que usaba `longitud` en lugar de índice final.",
			"**`String.prototype.indexOf()`:** se combina con `substring()` para recortar en posiciones dinámicas.",
			"**Inmutabilidad:** al igual que otros métodos de `String`, no altera el valor original."
		],
		analogia: "Es como marcar una cita en una **cinta de cassette o de película**. Le dices a la máquina: *«empieza a grabar en la marca del segundo 2 y detente justo al llegar al segundo 5»*. La cinta resultante contiene únicamente el tramo grabado entre esas dos marcas.",
		fuente: "MDN Web Docs - String.prototype.substring() | Especificación ECMAScript (ECMA-262)",
		notasPersonales: ["En el desarrollo JS moderno suele preferirse `.slice()` en lugar de `.substring()` por su soporte intuitivo de índices negativos.", "`str.substring(0, 1)` equivale a `str.charAt(0)` o `str[0]`."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'JavaScript'.substring(0, 4)?",
				[
					"'Java'",
					"'JavaS'",
					"'Jav'",
					"'Script'"
				],
				0
			],
			[
				"¿Qué devuelve 'JavaScript'.substring(4)?",
				[
					"'Java'",
					"'Script'",
					"'JavaS'",
					"undefined"
				],
				1
			],
			[
				"¿Qué hace substring() si indexStart > indexEnd?",
				[
					"Lanza error",
					"Devuelve ''",
					"Los intercambia automáticamente",
					"Devuelve null"
				],
				2
			],
			[
				"¿Qué devuelve 'Desarrollo'.substring(-3, 3)?",
				[
					"'Des'",
					"'Desarrollo'",
					"'sar'",
					"Un error"
				],
				0
			],
			[
				"¿Qué devuelve 'JavaScript'.substring(0, 3)?",
				[
					"'Java'",
					"'Jav'",
					"'J'",
					"'Script'"
				],
				1
			],
			[
				"¿Qué diferencia clave tiene con slice()?",
				[
					"substring no acepta negativos y slice sí",
					"Son idénticos",
					"slice no acepta negativos",
					"substring muta la cadena"
				],
				0
			],
			[
				"¿Qué devuelve 'JavaScript'.substring(5, 2)?",
				[
					"''",
					"'vaS'",
					"Un error",
					"'Scr'"
				],
				1
			],
			[
				"¿Qué método es su antecesor obsoleto con 'longitud' en el segundo argumento?",
				[
					"slice()",
					"substr()",
					"charAt()",
					"split()"
				],
				1
			]
		])
	},
	slice: {
		id: "slice",
		titulo: "String.prototype.slice()",
		simulador: "string",
		definicion: ["Es un método built-in de JavaScript que **extrae una sección de una cadena de texto** y la devuelve como una nueva cadena, sin modificar el *string* original."],
		queEs: [
			"Es el método **estándar y más recomendado en JavaScript moderno** para extraer subcadenas.",
			"A diferencia de `substring()`, soporta **índices negativos**, lo que permite contar posiciones desde el final de la cadena hacia atrás.",
			"**No modifica la cadena original**: los *strings* son inmutables."
		],
		paraQueSirve: [
			"**Extraer tramos desde el final:** obtener los últimos N caracteres de un texto (últimos 4 dígitos de una tarjeta, extensión de un archivo).",
			"**Recortar textos:** obtener fragmentos específicos indicando posiciones de inicio y fin.",
			"**Eliminar caracteres de los extremos:** quitar fácilmente el primer o último carácter de una cadena."
		],
		comoFunciona: [
			"Toma los caracteres desde `indexStart` hasta `indexEnd` (**sin incluir** el carácter en `indexEnd`).",
			"**Índices positivos:** cuentan desde el inicio (`0` = primer carácter).",
			"**Índices negativos:** cuentan desde el final hacia atrás (`-1` = último carácter, `-2` = penúltimo).",
			"**Índice final excluyente:** el carácter situado en `indexEnd` no entra.",
			"Si `indexStart >= indexEnd`, devuelve una cadena vacía (`\"\"`).",
			"Devuelve una nueva cadena; la original permanece intacta."
		],
		sintaxis: [{ code: `str.slice(indexStart);
str.slice(indexStart, indexEnd);` }],
		nota: "**`indexStart`:** índice de inicio (negativos cuentan desde el final). **`indexEnd` (opcional):** índice final **excluido** (negativos cuentan desde el final). **Retorno:** un nuevo `String` con la sección extraída.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Extracción básica con índices positivos",
				code: `const texto = "JavaScript";

console.log(texto.slice(0, 4)); // "Java"
console.log(texto.slice(4));    // "Script"`
			},
			{
				titulo: "Ejemplo 2: Índices negativos (contar desde el final)",
				code: `const tarjeta = "1234567890123456";

const ultimosDigitos = tarjeta.slice(-4);
console.log(ultimosDigitos); // "3456"

console.log(tarjeta.slice(0, -6)); // "1234567890"`
			},
			{
				titulo: "Ejemplo 3: Quitar el primer y último carácter",
				code: `const entreComillas = '"Hola Mundo"';
const limpio = entreComillas.slice(1, -1);
console.log(limpio); // "Hola Mundo"`
			},
			{
				titulo: "Ejemplo 4: La cadena original no cambia",
				code: `const original = "JavaScript";
const parte = original.slice(0, 4);

console.log(original); // "JavaScript"
console.log(parte);    // "Java"`
			}
		],
		errores: [
			{
				texto: "**Inversión silenciosa de parámetros:** a diferencia de `substring()`, `slice()` **no intercambia** los argumentos si `indexStart > indexEnd`.",
				code: `"Hola".slice(3, 1);     // ""  (devuelve vacío)
"Hola".substring(3, 1); // "ol" (intercambia)`
			},
			{
				texto: "**Confundir con `Array.prototype.slice()`:** funcionan exactamente igual a nivel conceptual, pero uno opera sobre strings y el otro sobre arrays.",
				code: `"Hola".slice(1, 3);   // "ol"
[1, 2, 3, 4].slice(1, 3); // [2, 3]`
			},
			{
				texto: "**Confundir con el método obsoleto `substr()`:** `substr(inicio, longitud)` toma una cantidad, mientras que `slice(inicio, fin)` usa índices.",
				code: `"JavaScript".slice(2, 4);  // "va"   (índices)
"JavaScript".substr(2, 4); // "vaSc" (cantidad)`
			},
			{
				texto: "**Pensar que modifica el string original:** los strings son inmutables.",
				code: `let texto = "Hola";
texto.slice(0, 2);
console.log(texto); // "Hola"

// ✅ Hay que reasignar
texto = texto.slice(0, 2);
console.log(texto); // "Ho"`
			}
		],
		casos: [
			"**Enmascarar datos sensibles:** ocultar números de tarjeta dejando visibles solo los últimos dígitos (`\"****\" + numero.slice(-4)`).",
			"**Obtener extensiones de archivos:** `nombre.slice(nombre.lastIndexOf(\".\"))`.",
			"**Formateador de cadenas:** formatear horas o números agregando ceros a la izquierda (`(\"0\" + minuto).slice(-2)`).",
			"**Quitar wrappers:** eliminar comillas, corchetes o etiquetas fijas del inicio y fin."
		],
		relacion: [
			"**`String.prototype.substring()`:** alternativa tradicional que convierte valores negativos a `0` y conmuta los parámetros si están invertidos.",
			"**`Array.prototype.slice()`:** equivalente directo para arreglos.",
			"**`String.prototype.at()`:** método para obtener un solo carácter aceptando también índices negativos.",
			"**`String.prototype.substr()`:** método obsoleto con `longitud` como segundo argumento."
		],
		analogia: "Es como **recortar con tijeras una tira de papel**. Puedes decirle a la tijera: *«haz el primer corte tras pasar 2 centímetros desde la izquierda y el segundo corte a 3 centímetros antes de llegar al final del papel»*. El trozo recortado entre ambas marcas es el resultado.",
		fuente: "MDN Web Docs - String.prototype.slice() | Especificación ECMAScript (ECMA-262)",
		notasPersonales: ["**Es el método preferido en JS moderno** para extraer subcadenas, gracias a su soporte limpio e intuitivo de índices negativos.", "**Truco rápido:** para obtener los últimos N caracteres de cualquier cadena, usa `str.slice(-N)`."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'JavaScript'.slice(0, 4)?",
				[
					"'Java'",
					"'JavaS'",
					"'Jav'",
					"'Script'"
				],
				0
			],
			[
				"¿Qué devuelve '1234567890'.slice(-4)?",
				[
					"'1234'",
					"'7890'",
					"'567890'",
					"undefined"
				],
				1
			],
			[
				"¿slice() acepta índices negativos?",
				[
					"No",
					"Sí, cuentan desde el final",
					"Solo en strings",
					"Solo en arrays"
				],
				1
			],
			[
				"¿Qué devuelve 'Hola'.slice(3, 1)?",
				[
					"'ol'",
					"''",
					"Un error",
					"'Ho'"
				],
				1
			],
			[
				"¿Qué devuelve 'Hola'.substring(3, 1)?",
				[
					"'ol'",
					"''",
					"Un error",
					"'Ho'"
				],
				0
			],
			[
				"¿Qué devuelve '\"Hola\"'.slice(1, -1)?",
				[
					"'Hola'",
					"'\"Hol'",
					"'Hola\"'",
					"'ol'"
				],
				0
			],
			[
				"¿slice() modifica la cadena original?",
				[
					"Sí",
					"No, devuelve una nueva",
					"Solo con let",
					"Depende del navegador"
				],
				1
			],
			[
				"¿Qué diferencia clave hay entre slice() y substring()?",
				[
					"slice acepta negativos y no intercambia; substring convierte negativos a 0 e intercambia",
					"Son idénticos",
					"slice muta la cadena",
					"substring acepta negativos"
				],
				0
			]
		])
	},
	charat: {
		id: "charat",
		titulo: "String.prototype.charAt()",
		simulador: "string",
		definicion: ["Es un método built-in de JavaScript que **devuelve el carácter ubicado en el índice (posición) especificado** de una cadena de texto."],
		queEs: [
			"Es un método clásico de **acceso a caracteres individuales** dentro de un *string*, presente desde **ECMAScript 1 (ES1)**.",
			"Devuelve un nuevo *string* que contiene únicamente el carácter encontrado en esa posición.",
			"A diferencia de `str[i]`, **nunca devuelve `undefined`**: si el índice no existe, retorna una cadena vacía `\"\"`."
		],
		paraQueSirve: [
			"**Obtener un carácter específico:** extraer la primera letra de un nombre (para iniciales), el último carácter de un código, o un símbolo en una posición dada.",
			"**Inspeccionar texto posición por posición:** recorrer cadenas dentro de bucles tradicionales.",
			"**Acceso seguro a índices inexistentes:** obtener `\"\"` en lugar de `undefined` cuando el índice está fuera de rango."
		],
		comoFunciona: [
			"Recibe un número que representa el índice basado en cero (*zero-based index*).",
			"Si el índice está dentro del rango `0` a `length - 1`, devuelve el carácter de esa posición.",
			"Si el índice es **menor a 0** o **mayor/igual a la longitud**, devuelve una **cadena vacía** (`\"\"`).",
			"Si no se le pasa ningún argumento, toma por defecto el índice `0`.",
			"Devuelve una nueva cadena; la original permanece intacta."
		],
		sintaxis: [{ code: `str.charAt();
str.charAt(index);` }],
		nota: "**`index` (opcional):** un entero entre `0` y `str.length - 1`. Si se omite, el valor predeterminado es `0`. **Retorno:** un `String` de un solo carácter, o `\"\"` si el índice está fuera de rango.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico y valor por defecto",
				code: `const texto = "JavaScript";

console.log(texto.charAt(0)); // "J"  (primer carácter)
console.log(texto.charAt(4)); // "S"
console.log(texto.charAt());  // "J"  (sin parámetro equivale a charAt(0))`
			},
			{
				titulo: "Ejemplo 2: Obtener el último carácter",
				code: `const palabra = "Desarrollo";
const ultimoCaracter = palabra.charAt(palabra.length - 1);

console.log(ultimoCaracter); // "o"`
			},
			{
				titulo: "Ejemplo 3: Fuera de rango (comparado con corchetes)",
				code: `const texto = "Hola";

console.log(texto.charAt(10)); // ""          (charAt → cadena vacía)
console.log(texto[10]);        // undefined   (corchetes → undefined)`
			},
			{
				titulo: "Ejemplo 4: Capitalizar la primera letra",
				code: `const nombre = "josue";
const capitalizado = nombre.charAt(0).toUpperCase() + nombre.slice(1);

console.log(capitalizado); // "Josue"`
			}
		],
		errores: [
			{
				texto: "**Incompatibilidad con pares sustitutos Unicode (*Surrogate Pairs*):** `charAt()` trabaja con unidades de código UTF-16. Con emojis devuelve solo la primera mitad.",
				code: `// ❌ Mitad de un emoji (carácter no imprimible)
"😀".charAt(0); // "\\uD83D"

// ✅ Alternativas Unicode-safe
[...\"😀\"][0];               // "😀"
"😀".codePointAt(0);          // 128512`
			},
			{
				texto: "**Intentar pasar índices negativos:** a diferencia de `.at()`, `charAt(-1)` no cuenta desde el final.",
				code: `"Hola".charAt(-1); // ""   (fuera de rango)
"Hola".at(-1);     // "a"  (cuenta desde el final)`
			},
			{
				texto: "**Pensar que modifica la cadena original:** los strings son inmutables.",
				code: `let texto = "Hola";
texto.charAt(0);
console.log(texto); // "Hola"`
			},
			{
				texto: "**Olvidar los paréntesis:** `texto.charAt` (sin paréntesis) devuelve la referencia al método, no lo ejecuta.",
				code: `texto.charAt;   // [Function: charAt]
texto.charAt(); // ejecuta`
			}
		],
		casos: [
			"**Creación de iniciales:** extraer la primera letra de nombres propios (`nombre.charAt(0).toUpperCase()`).",
			"**Capitalizar textos:** `texto.charAt(0).toUpperCase() + texto.slice(1)`.",
			"**Compatibilidad heredada (legacy):** garantizar soporte en entornos extremadamente antiguos.",
			"**Búsquedas de caracteres por posición fija:** inspeccionar códigos donde una posición concreta tiene significado (ej. `charAt(2) === '-'`)."
		],
		relacion: [
			"**Notación de corchetes (`str[index]`)**: alternativa moderna (ES5) más corta para acceder a caracteres, aunque devuelve `undefined` si el índice no existe.",
			"**`String.prototype.at()`**: método moderno (ES2022) que **sí permite índices negativos** (`at(-1)` = último carácter).",
			"**`String.prototype.charCodeAt()`**: devuelve el valor numérico Unicode (código UTF-16) del carácter en esa posición, en lugar del carácter mismo.",
			"**`String.prototype.codePointAt()`**: variante segura para emojis y caracteres fuera del BMP."
		],
		analogia: "Es como pedirle a alguien que lea la **letra N° X** de una palabra escrita en una lista. Si le pides la letra en la posición 1, te la dirá; pero si le pides la letra en la posición 50 de una palabra de 5 letras, simplemente no dirá nada (cadena vacía).",
		fuente: "MDN Web Docs - String.prototype.charAt() | Especificación ECMAScript (ECMA-262)",
		notasPersonales: ["**Para código moderno**, suele preferirse la notación de corchetes `str[0]` por brevedad, o `str.at(-1)` cuando necesitas contar desde el final.", "**Para capitalizar la primera letra:** `str.charAt(0).toUpperCase() + str.slice(1)`."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'JavaScript'.charAt(0)?",
				[
					"'JavaScript'",
					"'J'",
					"'a'",
					"undefined"
				],
				1
			],
			[
				"¿Qué devuelve 'JavaScript'.charAt()?",
				[
					"''",
					"'J'",
					"'t'",
					"undefined"
				],
				1
			],
			[
				"¿Qué devuelve 'Hola'.charAt(10)?",
				[
					"undefined",
					"null",
					"''",
					"Un error"
				],
				2
			],
			[
				"¿Qué devuelve 'Hola'[10]?",
				[
					"''",
					"undefined",
					"null",
					"Un error"
				],
				1
			],
			[
				"¿charAt(-1) cuenta desde el final?",
				[
					"Sí",
					"No, devuelve ''",
					"Solo en strings largos",
					"Depende del navegador"
				],
				1
			],
			[
				"¿Qué método sí acepta índices negativos?",
				[
					"charAt()",
					"at()",
					"charCodeAt()",
					"indexOf()"
				],
				1
			],
			[
				"¿Qué devuelve 'Desarrollo'.charAt(9)?",
				[
					"'o'",
					"'D'",
					"'ll'",
					"undefined"
				],
				0
			],
			[
				"¿Qué devuelve '😀'.charAt(0)?",
				[
					"'😀'",
					"La mitad del par sustituto (no imprimible)",
					"''",
					"Un error"
				],
				1
			]
		])
	},
	split: {
		id: "split",
		titulo: "String.prototype.split()",
		simulador: "string",
		definicion: ["Es un método built-in de JavaScript que **divide una cadena de texto en un arreglo (`Array`) de subcadenas**, utilizando un separador especificado."],
		queEs: [
			"Es una de las funciones de **manipulación de texto más importantes y utilizadas** en JavaScript, presente desde **ECMAScript 1 (ES1)**.",
			"Permite **descomponer un *string*** en partes manejables basadas en un carácter, secuencia de caracteres o expresión regular.",
			"Acepta un segundo parámetro `limit` que restringe el número de elementos del array resultante."
		],
		paraQueSirve: [
			"**Convertir texto en arreglos:** transformar listas separadas por comas (CSV), palabras de una oración o líneas de un párrafo en un `Array` para iterar sobre ellos.",
			"**Extraer partes de una cadena:** obtener la extensión de un archivo, el dominio de un correo o los parámetros de una URL.",
			"**Procesamiento de datos:** limpiar y estructurar texto plano para su análisis."
		],
		comoFunciona: [
			"Busca todas las apariciones del separador dentro del *string*.",
			"Cada vez que encuentra el separador, **corta la cadena** y guarda el fragmento como un nuevo elemento del array.",
			"El separador **se elimina** del resultado (no forma parte de los fragmentos).",
			"Si se especifica un `limit`, el proceso se detiene en cuanto el array alcanza esa cantidad de elementos.",
			"Devuelve un **array** con las subcadenas; la cadena original permanece intacta."
		],
		sintaxis: [{ code: `str.split();
str.split(separator);
str.split(separator, limit);` }],
		nota: "**`separator` (opcional):** patrón que determina dónde cortar (string o `RegExp`). Si se omite, el array contiene un único elemento con la cadena completa. **`limit` (opcional):** máximo de elementos del array. **Retorno:** un `Array` de cadenas.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Separar por un carácter o delimitador",
				code: `const lenguajes = "JavaScript,Python,PHP,Java";
const lista = lenguajes.split(",");

console.log(lista); // ["JavaScript", "Python", "PHP", "Java"]`
			},
			{
				titulo: "Ejemplo 2: Dividir en palabras o caracteres individuales",
				code: `const frase = "Hola Mundo";

console.log(frase.split(" ")); // ["Hola", "Mundo"]
console.log(frase.split(""));  // ["H", "o", "l", "a", " ", "M", "u", "n", "d", "o"]`
			},
			{
				titulo: "Ejemplo 3: Usar el parámetro limit",
				code: `const etiquetas = "js-css-html-react-vue";
const primerasTres = etiquetas.split("-", 3);

console.log(primerasTres); // ["js", "css", "html"]`
			},
			{
				titulo: "Ejemplo 4: Uso con Expresiones Regulares (múltiples separadores)",
				code: `const texto = "manzana, pera; uva / melon";
const frutas = texto.split(/\\s*[,;/]\\s*/);

console.log(frutas); // ["manzana", "pera", "uva", "melon"]`
			}
		],
		errores: [
			{
				texto: "**Problemas con emojis/Unicode al usar `split(\"\")`:** rompe los caracteres que usan *surrogate pairs* (como la mayoría de los emojis).",
				code: `// ❌ Rompe el emoji en dos mitades corruptas
"🚀".split("");          // ["\\uD83D", "\\uDE80"]

// ✅ Alternativas Unicode-seguras
Array.from("🚀");        // ["🚀"]
[...\"🚀\"];               // ["🚀"]`
			},
			{
				texto: "**Olvidar pasar un separador:** `split()` sin argumentos no divide nada.",
				code: `"Hola Mundo".split(); // ["Hola Mundo"]  (un único elemento)`
			},
			{
				texto: "**Inmutabilidad:** `split()` **no modifica** la cadena original; genera un nuevo `Array`.",
				code: `let texto = "a,b,c";
texto.split(",");
console.log(texto); // "a,b,c"`
			},
			{
				texto: "**`limit` no corta la cadena, corta el array:** el último elemento contendrá el resto del texto.",
				code: `"a,b,c,d".split(",", 2); // ["a", "b"]  (c y d se descartan)
"a,b,c,d".split(",", 3); // ["a", "b", "c"]  (d se descarta)`
			}
		],
		casos: [
			"**Invertir una cadena:** `str.split(\"\").reverse().join(\"\")` (o `[...str].reverse().join(\"\")` para Unicode seguro).",
			"**Obtener la extensión de un archivo:** `nombreArchivo.split(\".\").pop()`.",
			"**Parsear parámetros de consulta (URL Query Params):** separar `key1=val1&key2=val2` con `split(\"&\")`.",
			"**Procesar CSV:** `fila.split(\",\")` para obtener las columnas."
		],
		relacion: [
			"**`Array.prototype.join()`:** el método **inverso** de `split()`; une los elementos de un arreglo en una sola cadena de texto.",
			"**`Array.from()` / Operador Spread (`[...]`)**: alternativas modernas y Unicode-seguras a `str.split(\"\")`.",
			"**`String.prototype.match()` / `matchAll()`:** para búsquedas avanzadas con regex.",
			"**`String.prototype.replace()`:** permite reemplazar en lugar de dividir."
		],
		analogia: "Piensa en una cadena de texto como una **salchicha larga o una cuerda**, y en el separador como la marca donde un cocinero va a hacer **cortes con un cuchillo**. Cada trozo resultante se coloca dentro de un plato (el `Array`), y las marcas sobre las que cortaste desaparecen en el proceso.",
		fuente: "MDN Web Docs - String.prototype.split() | Especificación ECMAScript (ECMA-262)",
		notasPersonales: ["**Para dividir cadenas por salto de línea** sin importar el sistema operativo (Windows/Linux/Mac), usa `.split(/\\r?\\n/)`.", "**Para convertir un string a array de caracteres reales respetando emojis:** `[...str]` es superior a `str.split(\"\")`."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'a,b,c'.split(',')?",
				[
					"'abc'",
					"['a', 'b', 'c']",
					"'a, b, c'",
					"['abc']"
				],
				1
			],
			[
				"¿Qué devuelve 'Hola Mundo'.split(' ')?",
				[
					"['Hola', 'Mundo']",
					"['Hola Mundo']",
					"'HolaMundo'",
					"['H', 'o', 'l', 'a']"
				],
				0
			],
			[
				"¿Qué devuelve 'a,b,c,d'.split(',', 2)?",
				[
					"['a', 'b', 'c', 'd']",
					"['a', 'b']",
					"['a', 'b', 'c']",
					"['a']"
				],
				1
			],
			[
				"¿Qué devuelve 'a,b'.split() (sin argumentos)?",
				[
					"['a', 'b']",
					"['a,b']",
					"['a']",
					"[]"
				],
				1
			],
			[
				"¿Qué problema tiene '🚀'.split('')?",
				[
					"Ninguno",
					"Rompe el emoji en dos mitades corruptas",
					"Lanza un error",
					"Devuelve []"
				],
				1
			],
			[
				"¿Qué método es el inverso de split()?",
				[
					"join()",
					"replace()",
					"concat()",
					"slice()"
				],
				0
			],
			[
				"¿Qué devuelve 'Hola'.split(',')?",
				[
					"['Hola']",
					"[]",
					"['H', 'o', 'l', 'a']",
					"'Hola'"
				],
				0
			],
			[
				"¿Cuál es la alternativa Unicode-segura a '🚀'.split('')?",
				[
					"[...'🚀']",
					"'🚀'.slice(0)",
					"'🚀'.charAt(0)",
					"'🚀'.split(' ')"
				],
				0
			]
		])
	},
	replace: {
		id: "replace",
		titulo: "String.prototype.replace()",
		simulador: "string",
		definicion: ["Es un **método** de `String.prototype` que devuelve **una nueva cadena** donde una parte del texto original es reemplazada por otro valor.", "Permite reemplazar **una coincidencia** (o todas con regex y flag `g`) mediante un texto o una expresión regular."],
		queEs: [
			"Es un **método** heredado de `String.prototype`.",
			"**Forma parte del lenguaje JavaScript (ECMAScript)**, **no de una Web API**.",
			"Es un método **inmutable**: **no modifica la cadena original**.",
			"Si se necesita reemplazar **todas** las coincidencias de un texto literal, es más cómodo `replaceAll()` o una expresión regular con la flag `g`."
		],
		paraQueSirve: [
			"**Cambiar palabras** dentro de un texto.",
			"**Corregir información** o limpiar datos.",
			"**Reemplazar patrones** usando expresiones regulares.",
			"**Ocultar información sensible** (ej. `\"1234-5678\".replace(/\\d/g, \"*\")`).",
			"**Transformar cadenas** dinámicamente con una función de reemplazo."
		],
		comoFunciona: [
			"Se llama `replace()` sobre una cadena.",
			"Busca el patrón indicado (`string` o `RegExp`).",
			"**Si el patrón es un string**, solo reemplaza la **primera** aparición.",
			"**Si es una `RegExp`:** reemplaza solo la primera coincidencia, **salvo** que lleve la flag `g`, en cuyo caso reemplaza **todas**.",
			"El segundo argumento puede ser un **string de reemplazo** (con patrones `$1`, `$&`, etc.) o una **función** que retorna el nuevo valor.",
			"Devuelve una nueva cadena; la original permanece intacta."
		],
		sintaxis: [{ code: `cadena.replace(busqueda, reemplazo);` }],
		nota: "**`busqueda`:** texto o `RegExp` a encontrar. **`reemplazo`:** texto o función que sustituye la coincidencia. **Retorno:** una nueva cadena con el reemplazo aplicado.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Reemplazar una palabra",
				code: `const texto = "Hola mundo";
const resultado = texto.replace("mundo", "JavaScript");

console.log(resultado); // "Hola JavaScript"`
			},
			{
				titulo: "Ejemplo 2: La cadena original no cambia",
				code: `const texto = "Hola mundo";
texto.replace("mundo", "JS");

console.log(texto); // "Hola mundo"  (hay que guardar el resultado)

// ✅ Forma correcta
const nuevoTexto = texto.replace("mundo", "JS");`
			},
			{
				titulo: "Ejemplo 3: Solo la primera coincidencia con string",
				code: `const texto = "gato gato gato";
console.log(texto.replace("gato", "perro"));
// "perro gato gato"  (solo la primera)`
			},
			{
				titulo: "Ejemplo 4: Reemplazar todas con regex + flag g",
				code: `const texto = "gato gato gato";
console.log(texto.replace(/gato/g, "perro"));
// "perro perro perro"`
			},
			{
				titulo: "Ejemplo 5: Función como reemplazo",
				code: `const texto = "javascript";
const resultado = texto.replace("javascript", (palabra) => palabra.toUpperCase());

console.log(resultado); // "JAVASCRIPT"`
			},
			{
				titulo: "Ejemplo 6: Reemplazar números",
				code: `const texto = "Tengo 3 manzanas";
const resultado = texto.replace(/\\d/, "5");

console.log(resultado); // "Tengo 5 manzanas"`
			}
		],
		errores: [
			{
				texto: "**Pensar que modifica la cadena original:** los strings son inmutables.",
				code: `let texto = "Hola mundo";
texto.replace("mundo", "JS");
console.log(texto); // "Hola mundo"

// ✅ Hay que reasignar
texto = texto.replace("mundo", "JS");
console.log(texto); // "Hola JS"`
			},
			{
				texto: "**Pensar que reemplaza todas las coincidencias automáticamente:** con string solo reemplaza la primera.",
				code: `"hola hola".replace("hola", "adiós");     // "adiós hola"
"hola hola".replace(/hola/g, "adiós");   // "adiós adiós"
"hola hola".replaceAll("hola", "adiós"); // "adiós adiós"`
			},
			{
				texto: "**Confundir `replace()` con `replaceAll()`:**",
				code: `replace()    // primera coincidencia (o todas si regex tiene /g)
replaceAll() // todas las coincidencias de un string literal`
			},
			{
				texto: "**Olvidar que distingue mayúsculas y minúsculas:**",
				code: `"Hola".replace("hola", "Adiós"); // "Hola"  (no encuentra)

// ✅ Añade la flag i a la regex
"Hola".replace(/hola/i, "Adiós"); // "Adiós"`
			}
		],
		casos: [
			"**Limpiar formularios:** reemplazar caracteres no permitidos antes de guardar.",
			"**Corregir errores ortográficos** en un texto plano.",
			{
				texto: "**Ocultar información sensible:**",
				code: `"1234-5678".replace(/\\d/g, "*");
// "****-****"`
			},
			"**Modificar URLs:** reemplazar partes dinámicas del path.",
			"**Procesar texto recibido de usuarios:** sanitizar antes de guardarlo.",
			"**Transformar datos antes de guardarlos:** aplicar mayúsculas a ciertas palabras con una función."
		],
		relacion: [
			"**`String.prototype.replaceAll()`:** reemplaza **todas** las coincidencias de un texto literal sin necesidad de regex.",
			"**Expresiones regulares (RegExp):** permiten búsquedas avanzadas.",
			"**`String.prototype.match()`:** busca coincidencias dentro de una cadena.",
			"**`String.prototype.split()`:** divide una cadena en partes.",
			"**Inmutabilidad:** `replace()` devuelve una nueva cadena, no modifica la original."
		],
		analogia: "Imagina un documento escrito: *\"Comprar pan, comprar pan, comprar pan\"*. Usando `replace()` con un string dices: *\"cambia la primera frase que encuentres\"*. Resultado: *\"Comprar leche, comprar pan, comprar pan\"*. Si quieres cambiar todas, usa `replaceAll()` o una regex con `/g`.",
		fuente: "MDN Web Docs - String.prototype.replace() | Especificación ECMAScript (ECMA-262)",
		notasPersonales: ["**Regla del proyecto:** si necesitas reemplazar **todas** las apariciones de un texto literal, prefiere `replaceAll()`. Si necesitas regex, usa `replace()` con flag `g`.", "**Patrones útiles en el reemplazo:** `$&` (coincidencia completa), `$1`..`$n` (grupos capturados), `` $` `` (antes), `$'` (después)."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'Hola mundo'.replace('mundo', 'JS')?",
				[
					"'Hola mundo'",
					"'Hola JS'",
					"'JS Hola'",
					"undefined"
				],
				1
			],
			[
				"¿Qué devuelve 'gato gato gato'.replace('gato', 'perro')?",
				[
					"'perro perro perro'",
					"'perro gato gato'",
					"'gato perro gato'",
					"'gato gato perro'"
				],
				1
			],
			[
				"¿Cómo reemplazas todas las apariciones con replace()?",
				[
					"Usando replaceAll()",
					"Con una RegExp con flag g",
					"Llamando replace() N veces",
					"No se puede"
				],
				1
			],
			[
				"¿replace() modifica la cadena original?",
				[
					"Sí, siempre",
					"No, devuelve una nueva",
					"Solo si es let",
					"Depende del patrón"
				],
				1
			],
			[
				"¿Qué devuelve 'Hola'.replace('hola', 'Adiós')?",
				[
					"'Adiós'",
					"'Hola' (no encuentra, distingue mayúsculas)",
					"Un error",
					"undefined"
				],
				1
			],
			[
				"¿Qué devuelve 'gato gato'.replace(/gato/g, 'perro')?",
				[
					"'perro gato'",
					"'perro perro'",
					"'gato perro'",
					"'gato gato'"
				],
				1
			],
			[
				"¿Qué devuelve '1234-5678'.replace(/\\d/g, '*')?",
				[
					"'1234-5678'",
					"'****-****'",
					"'1***-*678'",
					"Un error"
				],
				1
			],
			[
				"¿Qué método reemplaza todas las apariciones de un texto literal sin regex?",
				[
					"replace()",
					"replaceAll()",
					"replaceOne()",
					"replaceMany()"
				],
				1
			]
		])
	},
	replaceall: {
		id: "replaceall",
		titulo: "String.prototype.replaceAll()",
		simulador: "string",
		definicion: ["Es un método built-in de los objetos `String` en JavaScript que devuelve una **nueva cadena de texto** donde **todas las coincidencias** de un patrón (cadena o expresión regular) son reemplazadas por un nuevo texto o el resultado de una función."],
		queEs: [
			"Es una función de **reemplazo global** introducida en **ECMAScript 2021 (ES12)**.",
			"Nació para solucionar la incomodidad de tener que usar expresiones regulares con la bandera global (`/patron/g`) en `replace()` cuando solo se quería reemplazar todas las apariciones de un **texto plano**.",
			"**No modifica la cadena original**: los *strings* son inmutables."
		],
		paraQueSirve: [
			"**Reemplazo masivo de subcadenas:** sustituir todas las apariciones de una palabra, espacio o carácter de forma directa.",
			"**Limpieza y formateo de datos:** cambiar todos los separadores de un formato a otro (ej. convertir guiones en espacios, comas por puntos).",
			"**Estandarización de plantillas:** reemplazar todas las variables o marcadores (*placeholders*) en una plantilla de texto."
		],
		comoFunciona: [
			"Busca **todas las ocurrencias** del primer parámetro (`pattern`) dentro de la cadena.",
			"Las sustituye por el segundo parámetro (`replacement`).",
			"**Si `pattern` es un `string`:** reemplaza cada coincidencia literal, **sin necesidad de regex**.",
			"**Si `pattern` es una `RegExp`:** es **obligatorio** que incluya la flag `g`; de lo contrario, **lanza `TypeError`**.",
			"Devuelve una nueva cadena; la original permanece intacta."
		],
		sintaxis: [{ code: `str.replaceAll(pattern, replacement);` }],
		nota: "**`pattern`:** subcadena o `RegExp` (obligatorio con `/g`). **`replacement`:** cadena o función que sustituye cada coincidencia. **Retorno:** una nueva cadena con todas las coincidencias reemplazadas.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Reemplazo básico con cadenas de texto",
				code: `const texto = "manzana, pera, manzana, uva, manzana";

const resultado = texto.replaceAll("manzana", "fresa");

console.log(resultado);
// "fresa, pera, fresa, uva, fresa"  (todas, sin regex)`
			},
			{
				titulo: "Ejemplo 2: Cambiar formatos de fechas o separadores",
				code: `const fechaGuiones = "2026-07-20";
const fechaBarras = fechaGuiones.replaceAll("-", "/");

console.log(fechaBarras); // "2026/07/20"`
			},
			{
				titulo: "Ejemplo 3: Uso con Expresión Regular (OBLIGATORIO /g)",
				code: `const expresion = /gato/gi; // 'g' = global, 'i' = case-insensitive
const textoMascotas = "El Gato persa y el gato montés";

console.log(textoMascotas.replaceAll(expresion, "perro"));
// "El perro persa y el perro montés"`
			},
			{
				titulo: "Ejemplo 4: Función como reemplazo",
				code: `const texto = "a1 b2 c3";
const resultado = texto.replaceAll(/\\d/g, (num) => String(Number(num) + 1));

console.log(resultado); // "a2 b3 c4"`
			}
		],
		errores: [
			{
				texto: "**Pasar una `RegExp` sin la flag global (`g`):** `replaceAll()` lanza `TypeError` inmediatamente.",
				code: `// ❌ TypeError: String.prototype.replaceAll called with a non-global RegExp
"gato gato".replaceAll(/gato/, "perro");

// ✅ Hay que añadir /g
"gato gato".replaceAll(/gato/g, "perro");`
			},
			{
				texto: "**Olvidar que no modifica la cadena original:** hay que guardar el resultado o reasignar.",
				code: `// ❌ El original no cambia
let texto = "manzana manzana";
texto.replaceAll("manzana", "fresa");
console.log(texto); // "manzana manzana"

// ✅ Reasignar
texto = texto.replaceAll("manzana", "fresa");
console.log(texto); // "fresa fresa"`
			},
			{ texto: "**Incompatibilidad con entornos muy antiguos:** es de ES2021. Node.js 15+, Chrome 85+, Firefox 77+. No funciona en navegadores legacy (IE)." },
			{
				texto: "**Confundir `replace()` con `replaceAll()`:**",
				code: `"hola hola".replace("hola", "adiós");    // "adiós hola"
"hola hola".replaceAll("hola", "adiós"); // "adiós adiós"`
			}
		],
		casos: [
			"**Sanitizar texto de usuario:** eliminar o reemplazar etiquetas o caracteres no permitidos a lo largo de todo un párrafo.",
			"**Motor de plantillas simple:** reemplazar marcadores tipo `{{nombre}}` por datos reales en correos o documentos.",
			"**Formateo de monedas/números:** reemplazar separadores de miles o decimales importados de otros idiomas.",
			"**Normalización de separadores:** `\"a,b,c\".replaceAll(\",\", \"-\")` → `\"a-b-c\"`."
		],
		relacion: [
			"**`String.prototype.replace()`:** su antecesor; si le pasas un string literal solo reemplaza la **primera** coincidencia.",
			"**Expresiones Regulares (RegExp) con bandera `/g`:** la alternativa tradicional previa a ES2021 para lograr reemplazos globales (`str.replace(/patron/g, \"nuevo\")`).",
			"**`String.prototype.split()` + `join()`:** otra forma de reemplazar todas las apariciones (menos directa).",
			"**Inmutabilidad:** igual que `replace()`, no modifica la cadena original."
		],
		analogia: "Es como usar la función **«Reemplazar todo» (Ctrl + H / Cmd + H)** en un procesador de textos como Microsoft Word. En lugar de ir buscando coincidencia por coincidencia y darle a «Sustituir» una por una, le ordenas al programa que busque todas las palabras iguales en el documento y las cambie al instante.",
		fuente: "MDN Web Docs - String.prototype.replaceAll() | Especificación ECMAScript 2021 (ES12)",
		notasPersonales: ["**Para reemplazar todas las apariciones de un texto plano**, prefiere `.replaceAll(\"buscar\", \"reemplazo\")` sobre `.replace(/buscar/g, \"reemplazo\")` para mejorar la legibilidad y evitar escapar caracteres especiales de RegExp.", "**Regla clave:** si pasas un `string`, no hay problema. Si pasas una `RegExp`, **obligatorio** `/g`."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'manzana manzana'.replaceAll('manzana', 'fresa')?",
				[
					"'fresa manzana'",
					"'fresa fresa'",
					"'manzana fresa'",
					"Un error"
				],
				1
			],
			[
				"¿Qué pasa al usar replaceAll() con una RegExp SIN la flag g?",
				[
					"Funciona normal",
					"Lanza TypeError",
					"Solo reemplaza la primera",
					"Devuelve ''"
				],
				1
			],
			[
				"¿replaceAll() modifica la cadena original?",
				[
					"Sí",
					"No, devuelve una nueva",
					"Solo con let",
					"Depende del patrón"
				],
				1
			],
			[
				"¿Qué devuelve 'a-b-c'.replaceAll('-', ' ')?",
				[
					"'a-b-c'",
					"'a b c'",
					"' a b c '",
					"Un error"
				],
				1
			],
			[
				"¿En qué versión de ECMAScript se introdujo replaceAll()?",
				[
					"ES5",
					"ES2015",
					"ES2021",
					"ES2023"
				],
				2
			],
			[
				"¿Cuál es la principal ventaja frente a replace() con string literal?",
				[
					"Es más rápido",
					"Reemplaza TODAS las coincidencias sin necesidad de regex",
					"Modifica la cadena",
					"Acepta funciones"
				],
				1
			],
			[
				"¿Qué devuelve 'gato gato'.replaceAll(/gato/g, 'perro')?",
				[
					"'perro gato'",
					"'perro perro'",
					"'gato perro'",
					"Un error"
				],
				1
			],
			[
				"¿Qué método reemplaza solo la primera coincidencia con string literal?",
				[
					"replace()",
					"replaceAll()",
					"replaceOne()",
					"replaceFirst()"
				],
				0
			]
		])
	},
	includes: {
		id: "includes",
		titulo: "String.prototype.includes()",
		simulador: "string",
		definicion: ["`includes()` es un **método** de `String.prototype` que permite comprobar si una cadena de texto contiene una determinada secuencia de caracteres.", "Devuelve un valor booleano (`true` o `false`) dependiendo de si encuentra o no la coincidencia."],
		queEs: [
			"Es un **método** heredado de `String.prototype`.",
			"**Forma parte del lenguaje JavaScript (ECMAScript)**, **no de una Web API**.",
			"Es un método de **búsqueda de texto**.",
			"La búsqueda distingue entre **mayúsculas y minúsculas** (*case-sensitive*)."
		],
		paraQueSirve: [
			"Verificar si un texto contiene una palabra o fragmento.",
			"Validar entradas del usuario.",
			"Realizar búsquedas simples.",
			"Filtrar información.",
			"Comprobar la existencia de caracteres dentro de una cadena."
		],
		comoFunciona: [
			"Se llama `includes()` sobre una cadena.",
			"JavaScript busca la secuencia indicada en **cualquier posición** del texto.",
			"Si encuentra coincidencia, devuelve `true`.",
			"Si no encuentra coincidencia, devuelve `false`.",
			"La cadena original no cambia."
		],
		sintaxis: [{ code: `cadena.includes(busqueda, posicionInicial);` }],
		nota: "**`busqueda`:** texto que se desea encontrar dentro de la cadena. **`posicionInicial` (opcional):** índice desde donde comienza la búsqueda (por defecto `0`). **Retorno:** `true` si encuentra la cadena, `false` si no existe.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Comprobar si existe una palabra",
				code: `const texto = "Aprendiendo JavaScript";
console.log(texto.includes("JavaScript")); // true`
			},
			{
				titulo: "Ejemplo 2: Cuando no existe",
				code: `const texto = "Hola mundo";
console.log(texto.includes("Python")); // false`
			},
			{
				titulo: "Ejemplo 3: Diferencia entre mayúsculas y minúsculas",
				code: `const texto = "JavaScript";
console.log(texto.includes("javascript")); // false
// Porque: "JavaScript" ≠ "javascript"`
			},
			{
				titulo: "Ejemplo 4: Usar posición inicial",
				code: `const texto = "JavaScript";
console.log(texto.includes("Script", 4)); // true
// La búsqueda empieza desde el índice 4`
			},
			{
				titulo: "Ejemplo 5: Buscar caracteres",
				code: `const palabra = "Hola";
console.log(palabra.includes("o")); // true`
			},
			{
				titulo: "Ejemplo 6: Validar un usuario",
				code: `const usuario = "admin123";
if (usuario.includes("admin")) {
  console.log("Usuario administrador");
}
// "Usuario administrador"`
			}
		],
		errores: [
			{
				texto: "**Confundir `includes()` con `indexOf()`:**",
				code: `texto.includes("hola"); // → true
texto.indexOf("hola");  // → 0  (o -1 si no existe)`
			},
			{
				texto: "**Pensar que modifica la cadena:** `includes()` solo consulta, no modifica.",
				code: `let texto = "Hola Mundo";
texto.includes("Hola");
console.log(texto); // "Hola Mundo"`
			},
			{
				texto: "**Olvidar que distingue mayúsculas:**",
				code: `"PERRO".includes("perro"); // false`
			},
			{
				texto: "**Usarlo sobre valores que no son strings:**",
				code: `// ❌ TypeError
const numero = 12345;
numero.includes("2");

// ✅ Convertir antes
numero.toString().includes("2");`
			}
		],
		casos: [
			"Buscar palabras en textos.",
			{
				texto: "Validar extensiones de archivos:",
				code: `archivo.includes(".pdf");`
			},
			"Detectar palabras prohibidas.",
			"Filtrar resultados.",
			"Validar formularios.",
			"Crear sistemas de búsqueda simples."
		],
		relacion: [
			"**`Array.prototype.includes()`:** también existe para arreglos y busca elementos dentro de arrays.",
			"**`indexOf()`:** devuelve la posición donde aparece el texto.",
			"**`startsWith()`:** comprueba si una cadena comienza con un texto.",
			"**`endsWith()`:** comprueba si una cadena termina con un texto.",
			"**`search()`:** permite búsquedas mediante expresiones regulares.",
			"**Booleanos:** `includes()` siempre devuelve `true` o `false`."
		],
		analogia: "Imagina que tienes un libro 📖 y preguntas: *«¿Este libro contiene la palabra JavaScript?»*. `includes()` funciona como un buscador: si encuentra la palabra → ✅ `true`; si no la encuentra → ❌ `false`. No cambia el libro, solamente revisa si existe esa información.",
		fuente: "MDN Web Docs - String.prototype.includes() | Especificación ECMAScript (ECMA-262)",
		notasPersonales: ["`includes()` es más rápido que `indexOf()` para búsquedas simples porque no necesita devolver la posición.", "**Para búsquedas case-insensitive:** aplica `toLowerCase()` a ambos lados antes de comparar."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'JavaScript'.includes('Script')?",
				[
					"true",
					"false",
					"4",
					"undefined"
				],
				0
			],
			[
				"¿Qué devuelve 'JavaScript'.includes('script')?",
				[
					"true",
					"false",
					"Un error",
					"undefined"
				],
				1
			],
			[
				"¿Para qué sirve el segundo parámetro de includes()?",
				[
					"Longitud máxima",
					"Posición desde donde empezar a buscar",
					"Cantidad de resultados",
					"Un callback"
				],
				1
			],
			[
				"¿includes() modifica la cadena original?",
				[
					"Sí",
					"No, es de solo lectura",
					"Solo con let",
					"Depende del navegador"
				],
				1
			],
			[
				"¿Cuál es la diferencia entre includes() e indexOf()?",
				[
					"includes devuelve booleano; indexOf devuelve posición",
					"Son idénticos",
					"includes devuelve posición",
					"indexOf devuelve booleano"
				],
				0
			],
			[
				"¿Qué devuelve 'PERRO'.includes('perro')?",
				[
					"true",
					"false",
					"Un error",
					"undefined"
				],
				1
			],
			[
				"¿Qué pasa si llamas includes() sobre un número?",
				[
					"Funciona normal",
					"Lanza TypeError",
					"Devuelve NaN",
					"Devuelve false"
				],
				1
			],
			[
				"¿Cuál es la forma de hacer una búsqueda case-insensitive?",
				[
					"includes(texto, {i: true})",
					"toLowerCase().includes(toLowerCase())",
					"includes(/texto/i)",
					"No se puede"
				],
				1
			]
		])
	},
	indexof: {
		id: "indexof",
		titulo: "String.prototype.indexOf()",
		simulador: "string",
		definicion: ["Método de `String` que busca la **primera aparición** de una cadena dentro de otra y devuelve el **índice** donde comienza."],
		queEs: [
			"Es un **método** heredado de `String.prototype`.",
			"**Forma parte del lenguaje JavaScript (ECMAScript)**, **no de una Web API**.",
			"Es la versión clásica (pre-ES6) de la búsqueda de texto: lo que hace `includes()` pero devolviendo la **posición** en lugar de un booleano.",
			"La búsqueda distingue entre **mayúsculas y minúsculas** (*case-sensitive*)."
		],
		paraQueSirve: [
			"Buscar una cadena dentro de otra.",
			"Saber la **posición** de una coincidencia.",
			"Comprobar si un texto contiene determinado contenido (aunque `includes()` es más expresivo para eso).",
			"Buscar desde una posición específica.",
			"Trabajar con texto sin necesidad de expresiones regulares."
		],
		comoFunciona: [
			"Recibe el texto que quieres buscar y, opcionalmente, una posición desde donde comenzar.",
			"Recorre la cadena **de izquierda a derecha** desde `posicionInicial` (por defecto `0`).",
			"Devuelve el **índice de la primera coincidencia** encontrada.",
			"Si existen varias coincidencias, devuelve **solamente la primera**.",
			"Si **no encuentra** el texto, devuelve **`-1`**."
		],
		sintaxis: [{ code: `cadena.indexOf(valorBuscado);
cadena.indexOf(valorBuscado, posicionInicial);` }],
		nota: "**`valorBuscado`:** texto a encontrar. **`posicionInicial` (opcional):** índice desde donde buscar (por defecto `0`). **Retorno:** un `number` — el índice de la primera coincidencia, o `-1` si no existe.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Buscar una palabra",
				code: `const texto = "Me gusta JavaScript";
console.log(texto.indexOf("JavaScript")); // 9`
			},
			{
				titulo: "Ejemplo 2: Cuando no existe",
				code: `"Hola mundo".indexOf("Python"); // -1`
			},
			{
				titulo: "Ejemplo 3: Buscar un carácter",
				code: `"JavaScript".indexOf("S"); // 4`
			},
			{
				titulo: "Ejemplo 4: Buscar la primera aparición",
				code: `"banana".indexOf("a"); // 1

// Aunque 'a' también aparece en 3 y 5, devuelve 1`
			},
			{
				titulo: "Ejemplo 5: Empezar la búsqueda desde una posición",
				code: `const texto = "banana";
console.log(texto.indexOf("a", 2)); // 3
// Busca 'a' comenzando desde el índice 2`
			},
			{
				titulo: "Ejemplo 6: Comprobar si existe",
				descripcion: "Forma clásica y correcta (importante comparar con `!== -1`).",
				code: `const texto = "Hola JavaScript";
if (texto.indexOf("JavaScript") !== -1) {
  console.log("Encontrado");
}`
			}
		],
		errores: [
			{
				texto: "**Pensar que devuelve `true` o `false`:** devuelve un número.",
				code: `"Hola".indexOf("H"); // 0  (no true)
"Hola".indexOf("x"); // -1 (no false)`
			},
			{
				texto: "**Confundir `0` con `false`:** el error más clásico de JavaScript. `0` es *falsy*, así que un `if (resultado)` fallará si la coincidencia está en la posición 0.",
				code: `// ❌ Bug clásico
const resultado = "Hola".indexOf("H");
if (resultado) {
  console.log("Encontrado"); // ❌ NO se ejecuta (0 es falsy)
}

// ✅ Forma correcta
if (resultado !== -1) {
  console.log("Encontrado"); // ✅
}`
			},
			{
				texto: "**Pensar que devuelve la última aparición:** para eso existe `lastIndexOf()`.",
				code: `"banana".indexOf("a");     // 1
"banana".lastIndexOf("a"); // 5`
			},
			{
				texto: "**Confundir `indexOf()` de String con el de Array:** ambos existen, pero trabajan sobre estructuras diferentes.",
				code: `"Hola".indexOf("H");             // String → busca texto
["Hola","Mundo"].indexOf("Mundo"); // Array  → busca elemento`
			}
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
console.log(posicion); // 9`
			}
		],
		relacion: [
			"**`String.prototype.lastIndexOf()`:** busca la **última** aparición.",
			"**`String.prototype.includes()`:** devuelve `true`/`false` en lugar de la posición.",
			"**`String.prototype.startsWith()`:** comprueba si comienza con un patrón.",
			"**`String.prototype.endsWith()`:** comprueba si termina con un patrón.",
			"**`String.prototype.search()`:** variante que acepta expresiones regulares.",
			"**`Array.prototype.indexOf()`:** versión para arreglos."
		],
		analogia: "Imagina una fila de casilleros numerados: `0 H`, `1 o`, `2 l`, `3 a`, `4 (espacio)`, `5 M`... Le preguntas a `indexOf()`: *«¿Dónde está la primera `M`?»* Y responde: `5`. Si no encuentra el elemento: `-1`. Por eso puedes recordar: **`indexOf()` = «dame el índice»**.",
		fuente: "MDN Web Docs - String.prototype.indexOf() | Especificación ECMAScript (ECMA-262)",
		notasPersonales: [
			"**Regla de oro:** si solo necesitas saber **si existe**, usa `includes()`. Si necesitas la **posición**, usa `indexOf()`.",
			"**Nunca** hagas `if (texto.indexOf(\"x\"))`. **Siempre** `if (texto.indexOf(\"x\") !== -1)`.",
			"Para búsquedas case-insensitive: `texto.toLowerCase().indexOf(busqueda.toLowerCase())`."
		],
		quiz: Q$2([
			[
				"¿Qué devuelve 'JavaScript'.indexOf('S')?",
				[
					"'S'",
					"4",
					"true",
					"undefined"
				],
				1
			],
			[
				"¿Qué devuelve 'Hola mundo'.indexOf('Python')?",
				[
					"undefined",
					"null",
					"-1",
					"0"
				],
				2
			],
			[
				"¿Por qué if (texto.indexOf('x')) puede fallar?",
				[
					"Porque devuelve strings",
					"Porque 0 es falsy y -1 es truthy",
					"Porque devuelve true/false",
					"Porque necesita un callback"
				],
				1
			],
			[
				"¿Qué devuelve 'banana'.indexOf('a', 2)?",
				[
					"1",
					"2",
					"3",
					"5"
				],
				2
			],
			[
				"¿Cuál es la forma correcta de comprobar existencia con indexOf?",
				[
					"if (resultado)",
					"if (resultado !== -1)",
					"if (resultado === 0)",
					"if (resultado === true)"
				],
				1
			],
			[
				"¿Qué método busca la última aparición?",
				[
					"indexOf()",
					"lastIndexOf()",
					"search()",
					"includes()"
				],
				1
			],
			[
				"¿Qué método usar si solo quieres saber si existe (booleano)?",
				[
					"indexOf()",
					"includes()",
					"lastIndexOf()",
					"search()"
				],
				1
			],
			[
				"¿Qué devuelve 'banana'.indexOf('a')?",
				[
					"1",
					"3",
					"5",
					"0"
				],
				0
			]
		])
	},
	search: {
		id: "search",
		titulo: "String.prototype.search()",
		simulador: "string",
		definicion: ["Método de los strings en JavaScript que **busca la primera coincidencia** de una expresión regular dentro de una cadena de texto y devuelve la **posición (índice)** donde se encuentra."],
		queEs: [
			"Es un método nativo de JavaScript que permite encontrar la ubicación de un patrón definido por una **expresión regular** dentro de un string.",
			"A diferencia de `match()`, **no devuelve el texto encontrado**, sino su **posición numérica**.",
			"Es la versión «avanzada» de `indexOf()` que acepta expresiones regulares.",
			"La flag `g` (global) **no tiene efecto**: `search()` siempre devuelve la **primera** coincidencia."
		],
		paraQueSirve: [
			"**Encontrar la posición** de un patrón en un texto.",
			"**Verificar si existe** un patrón (aunque para eso es más eficiente `test()`).",
			"**Obtener el índice** para luego usar `substring()` o `slice()`.",
			"**Buscar patrones complejos** cuando solo necesitas la ubicación, no el texto.",
			"**Validar posiciones** de caracteres especiales."
		],
		comoFunciona: [
			"Toma una expresión regular como argumento (o un string, que se convierte automáticamente a `RegExp`).",
			"Aplica el patrón al string y devuelve el **índice del primer carácter** de la primera coincidencia.",
			"Si encuentra coincidencia: devuelve un **número** (el índice).",
			"Si **no encuentra**: devuelve **`-1`**.",
			"Ignora la propiedad `lastIndex` de la RegExp: **siempre comienza desde el inicio**."
		],
		sintaxis: [{ code: `str.search(regexp);` }],
		nota: "**`regexp`:** expresión regular a buscar (si se pasa un string se convierte a `RegExp`). **Retorno:** un `number` — índice de la primera coincidencia, o `-1` si no existe.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Búsqueda básica con expresión regular",
				code: `const texto = "Hola mundo, hoy es 17 de agosto";
const posicion = texto.search(/mundo/);

console.log(posicion); // 5  (posición donde comienza "mundo")`
			},
			{
				titulo: "Ejemplo 2: Búsqueda con patrón complejo (dígitos)",
				code: `const posicionNumero = texto.search(/\\d+/);
console.log(posicionNumero); // 19  (posición del "17")`
			},
			{
				titulo: "Ejemplo 3: Con string literal (se convierte a RegExp)",
				code: `const posicionLiteral = "JavaScript es genial".search("es");
console.log(posicionLiteral); // 11`
			},
			{
				titulo: "Ejemplo 4: Sin coincidencias",
				code: `const sinCoincidencia = "Hola mundo".search(/xyz/);
console.log(sinCoincidencia); // -1`
			},
			{
				titulo: "Ejemplo 5: Búsqueda sin distinguir mayúsculas/minúsculas",
				code: `const posicionInsensible = "JavaScript".search(/javascript/i);
console.log(posicionInsensible); // 0  (la flag i hace case-insensitive)`
			},
			{
				titulo: "Ejemplo 6: Con caracteres especiales (protocolo de URL)",
				code: `const url = "https://ejemplo.com/pagina";
const posicionProtocolo = url.search(/^https?:\\/\\//);

console.log(posicionProtocolo); // 0  (el protocolo está al inicio)`
			}
		],
		errores: [
			{
				texto: "**Confundir con `indexOf()`:** `search()` acepta `RegExp`, mientras que `indexOf()` solo texto literal. Pero cuidado: los caracteres especiales de regex tienen significado.",
				code: `// ❌ Si necesitas buscar el punto literal
"a.b.c".search(".");    // → 0  (porque "." en RegExp significa "cualquier carácter")

// ✅ Escapar el punto
"a.b.c".search(/\\./);   // → 1  (busca punto literal)`
			},
			{
				texto: "**Esperar que devuelva todas las posiciones:** `search()` **solo devuelve la primera**.",
				code: `"aaa".search(/a/g); // → 0  (solo la primera, la flag g se ignora)`
			},
			{
				texto: "**Usarlo para saber si existe un patrón cuando solo necesitas true/false:**",
				code: `// ❌ Menos eficiente
if (texto.search(/patron/) !== -1) { ... }

// ✅ Más idiomático
if (/patron/.test(texto)) { ... }`
			},
			{
				texto: "**No escapar caracteres especiales** en búsquedas dinámicas:",
				code: `const buscar = "a.b";
// ❌ Interpretará "a" + cualquier carácter + "b"
"a1b".search(buscar); // → 0

// ✅ Escapar caracteres especiales
"a1b".search(buscar.replace(/[.*+?^\${}()|[\]\\]/g, "\\\\$&")); // → -1`
			}
		],
		casos: [
			{
				texto: "**Encontrar posición para luego extraer subcadena:**",
				code: `const texto = "Usuario: juan.perez, Edad: 30";
const inicio = texto.search(/Usuario:/);
const fin = texto.search(/,/);
const usuario = texto.substring(inicio + 8, fin).trim(); // "juan.perez"`
			},
			{
				texto: "**Validar formato al inicio del string:**",
				code: `const email = "usuario@dominio.com";
const posArroba = email.search(/@/);
if (posArroba > 0 && posArroba < email.length - 1) {
  console.log("Email válido");
}`
			},
			{
				texto: "**Detectar tipo de contenido en un archivo:**",
				code: `const archivo = "foto.jpg";
const extension = archivo.search(/\\.(jpg|png|gif)$/);
if (extension !== -1) console.log("Es una imagen");`
			},
			"**Buscar posición de palabras clave.**",
			"**Encontrar URLs en texto.**"
		],
		relacion: [
			"**`match()`:** devuelve el **texto** encontrado (o array con coincidencias), no la posición.",
			"**`indexOf()`:** similar pero solo acepta texto literal, no `RegExp`. Es más rápido para búsquedas simples.",
			"**`includes()`:** devuelve `true`/`false`, no posición.",
			"**`RegExp.prototype.test()`:** devuelve `true`/`false` de forma más directa.",
			"**`RegExp.prototype.exec()`:** devuelve información detallada de la coincidencia.",
			"**`matchAll()`:** devuelve todas las coincidencias con toda su información.",
			"**`startsWith()` / `endsWith()`:** verifican posición concreta."
		],
		analogia: "Imagina que `search()` es un **detective que solo te dice el número de página** donde aparece algo, sin decirte qué hay escrito. Es como cuando buscas una palabra en un libro y el buscador te dice: *«Aparece por primera vez en la página 42»*, pero no te muestra el texto. `search()` es el «GPS» de los strings: no te dice qué hay en el destino, solo **dónde está** la primera aparición.",
		fuente: "MDN Web Docs - String.prototype.search() | Especificación ECMAScript (ECMA-262)",
		notasPersonales: [
			"`search()` es menos usado que `indexOf()` porque la mayoría de las veces que necesitas RegExp también necesitas el texto encontrado (ahí gana `match()`).",
			"Para búsquedas de **texto literal simple**, `indexOf()` es **más rápido** que `search()`.",
			"La flag `g` en la RegExp **no tiene efecto** en `search()`: siempre devuelve la primera coincidencia.",
			"Para verificar existencia sin importar la posición, es mejor usar `RegExp.test()`.",
			"`search()` **ignora** la propiedad `lastIndex` de la RegExp: siempre comienza desde el inicio.",
			"Combinar `search()` con `substring()` es un patrón común para extraer partes de un texto."
		],
		quiz: Q$2([
			[
				"¿Qué devuelve 'Hola mundo'.search(/mundo/)?",
				[
					"'mundo'",
					"5",
					"true",
					"undefined"
				],
				1
			],
			[
				"¿Qué devuelve 'Hola mundo'.search(/xyz/)?",
				[
					"null",
					"-1",
					"0",
					"undefined"
				],
				1
			],
			[
				"¿Qué tipo de argumento acepta search()?",
				[
					"Solo strings",
					"Solo RegExp",
					"RegExp o string (que se convierte a RegExp)",
					"Solo números"
				],
				2
			],
			[
				"¿Cuál es la diferencia clave entre search() e indexOf()?",
				[
					"search acepta RegExp; indexOf solo string literal",
					"Son idénticos",
					"indexOf acepta RegExp",
					"search modifica la cadena"
				],
				0
			],
			[
				"¿Qué devuelve 'JavaScript'.search(/javascript/i)?",
				[
					"-1",
					"0",
					"Un error",
					"undefined"
				],
				1
			],
			[
				"¿La flag g en search() afecta el resultado?",
				[
					"Sí, devuelve todas",
					"No, siempre devuelve la primera",
					"Devuelve un array",
					"Lanza error"
				],
				1
			],
			[
				"¿Qué devuelve 'a.b.c'.search(/\\./)?",
				[
					"0",
					"1",
					"2",
					"-1"
				],
				1
			],
			[
				"¿Qué método es más eficiente para saber si un patrón existe (true/false)?",
				[
					"search()",
					"RegExp.test()",
					"indexOf()",
					"match()"
				],
				1
			]
		])
	},
	match: {
		id: "match",
		titulo: "String.prototype.match()",
		simulador: "string",
		definicion: ["Método de los strings en JavaScript que **busca coincidencias** de una expresión regular dentro de una cadena de texto y devuelve los resultados como un array."],
		queEs: [
			"Es un método nativo de JavaScript que **permite encontrar todas las ocurrencias (o la primera) de un patrón** definido por una expresión regular dentro de un string.",
			"Es la forma más potente y flexible de buscar texto en cadenas porque aprovecha toda la capacidad de las **expresiones regulares (RegExp)**.",
			"Su comportamiento **cambia radicalmente** según la flag `g`:",
			"- **Sin `/g`** → array con la **primera** coincidencia + `index`, `input` y **grupos de captura**.",
			"- **Con `/g`** → array con **solo los textos** de **todas** las coincidencias."
		],
		paraQueSirve: [
			"**Extraer información** de un texto (emails, URLs, fechas).",
			"**Validar formatos** de datos.",
			"**Realizar búsquedas avanzadas** con patrones complejos.",
			"**Obtener grupos de captura** de una coincidencia.",
			"**Contar ocurrencias** de un patrón en un texto."
		],
		comoFunciona: [
			"Toma una expresión regular como argumento (o un string, que se convierte con `new RegExp`).",
			"**Sin flag `g`:** devuelve un array con la **primera** coincidencia completa, más propiedades `index`, `input` y los **grupos de captura** si existen.",
			"**Con flag `g`:** devuelve un array con **todas** las coincidencias como strings simples (sin info extra).",
			"Si **no encuentra coincidencias**, devuelve **`null`** (¡no un array vacío!)."
		],
		sintaxis: [{ code: `str.match(regexp);` }],
		nota: "**`regexp`:** expresión regular a buscar (obligatorio). **Retorno:** `Array` o `null` según el caso. **Sin `g`:** array con la primera coincidencia + `index`, `input`, `groups`. **Con `g`:** array con todas las coincidencias (solo strings). **Sin coincidencias:** `null`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Sin flag 'g' - primera coincidencia",
				code: `const texto = "Hola 123, tengo 456 y también 789";

const resultado = texto.match(/\\d+/);
console.log(resultado);
// ['123', index: 5, input: 'Hola 123, tengo 456 y también 789', groups: undefined]`
			},
			{
				titulo: "Ejemplo 2: Con flag 'g' - todas las coincidencias",
				code: `const texto = "Hola 123, tengo 456 y también 789";

const resultado = texto.match(/\\d+/g);
console.log(resultado);
// ['123', '456', '789']`
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
// ]`
			},
			{
				titulo: "Ejemplo 4: Sin coincidencias (devuelve null, no [])",
				code: `const resultado = "Hola mundo".match(/xyz/);
console.log(resultado); // null`
			}
		],
		errores: [
			{
				texto: "**Confundir `null` con `[]`:** si no hay coincidencias, devuelve `null`. Acceder a `.length` o iterar sobre `null` lanza `TypeError`.",
				code: `const resultado = "abc".match(/x/);

// ❌ Error: Cannot read property 'length' of null
if (resultado.length) { ... }

// ✅ Comprobar null primero
if (resultado !== null) { ... }`
			},
			{
				texto: "**Olvidar la flag `g`** cuando quieres todas las ocurrencias:",
				code: `"aaa".match(/a/);  // ['a'] (solo una)
"aaa".match(/a/g); // ['a', 'a', 'a'] (todas)`
			},
			{
				texto: "**Usar `match()` con strings literales** cuando necesitas patrones complejos:",
				code: `// ❌ Funciona pero es limitado
"Hola mundo".match("mundo");

// ✅ Para búsquedas simples, usa includes() o indexOf()
"Hola mundo".includes("mundo");`
			},
			{
				texto: "**No escapar caracteres especiales** en RegExp dinámicas:",
				code: `const palabra = "a.b";
// ❌ Interpreta '.' como "cualquier carácter"
"a.b".match(palabra);

// ✅ Escapar
"a.b".match(palabra.replace(/[.*+?^\${}()|[\\\]\\\\]/g, "\\\\$&"));`
			}
		],
		casos: [
			{
				texto: "**🔍 Extraer emails de un texto:**",
				code: `const texto = "Contacta a pedro@gmail.com o a maria@hotmail.com";
const emails = texto.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}/g);
// → ['pedro@gmail.com', 'maria@hotmail.com']`
			},
			{
				texto: "**📊 Extraer precios de un texto:**",
				code: `const factura = "Total: $45.99, IVA: $8.50, Subtotal: $37.49";
const precios = factura.match(/\\$\\d+\\.\\d{2}/g);
// → ['$45.99', '$8.50', '$37.49']`
			},
			{
				texto: "**🗂️ Validar formato de fecha:**",
				code: `const fecha = "2026-08-17";
const valida = fecha.match(/^\\d{4}-\\d{2}-\\d{2}$/);
// → ['2026-08-17', index: 0, input: '2026-08-17', ...]`
			},
			{
				texto: "**🎯 Extraer nombres de variables en código:**",
				code: `const codigo = "const nombre = 'Juan'; let edad = 30;";
const variables = codigo.match(/\\b(?:const|let|var)\\s+(\\w+)/g);
// → ['const nombre', 'let edad']`
			}
		],
		relacion: [
			"**`search()`:** devuelve solo la **posición** de la coincidencia, no el texto.",
			"**`matchAll()`:** similar a `match()` con `g`, pero devuelve un **iterador** con más info (grupos, índice).",
			"**`RegExp.prototype.exec()`:** método de `RegExp`, similar a `match()` pero se puede ejecutar repetidamente.",
			"**`RegExp.prototype.test()`:** solo devuelve `true`/`false`.",
			"**`replace()` / `replaceAll()`:** busca y **reemplaza** coincidencias.",
			"**`split()`:** divide el string usando una expresión regular.",
			"**`includes()`:** búsqueda simple de texto literal.",
			"**`indexOf()`:** devuelve la posición de un texto literal."
		],
		analogia: "Imagina que tienes un **libro enorme** (el string) y **`match()`** es un **detective con una lupa y una lista de patrones**. **Sin la flag `g`:** el detective busca **solo la primera** ocurrencia, te la muestra y te dice en qué página está. **Con la flag `g`:** el detective encuentra **todas** las ocurrencias, las subraya y te da una lista de todas. Los **grupos de captura** serían como **marcadores de colores**: en lugar de solo subrayar la frase completa, también marca partes específicas (ej. el nombre de usuario, el dominio, etc.).",
		fuente: "MDN Web Docs - String.prototype.match() | ECMAScript Specification",
		notasPersonales: [
			"`match()` es **más lento** que `includes()` o `indexOf()` para búsquedas simples por el *overhead* de RegExp.",
			"Al usarlo con `g`, **pierdes acceso** a `index` y grupos de captura. Para eso usa `matchAll()`.",
			"**Siempre verifica** que el resultado **no sea `null`** antes de acceder a propiedades.",
			"Combinado con `RegExp` y grupos con nombres (`(?<nombre>...)`) se vuelve muy poderoso."
		],
		quiz: Q$2([
			[
				"¿Qué devuelve 'Hola 123 tengo 456'.match(/\\d+/)?",
				[
					"['123']",
					"['123', '456']",
					"'123'",
					"123"
				],
				0
			],
			[
				"¿Qué devuelve 'Hola 123 tengo 456'.match(/\\d+/g)?",
				[
					"['123']",
					"['123', '456']",
					"'123456'",
					"123"
				],
				1
			],
			[
				"¿Qué devuelve 'Hola mundo'.match(/xyz/)?",
				[
					"[]",
					"null",
					"undefined",
					"-1"
				],
				1
			],
			[
				"¿Cuál es la diferencia principal entre match() sin g y con g?",
				[
					"Sin g: primera coincidencia con index/input/grupos; con g: todas solo como strings",
					"Son idénticos",
					"Con g: primera; sin g: todas",
					"Sin g: null"
				],
				0
			],
			[
				"¿Qué propiedad del array permite saber la posición de la coincidencia sin g?",
				[
					"input",
					"index",
					"position",
					"offset"
				],
				1
			],
			[
				"¿Por qué es peligroso acceder a .length del resultado sin comprobar null?",
				[
					"No es peligroso",
					"Porque si no hay coincidencias es null y lanza TypeError",
					"Porque devuelve undefined",
					"Porque devuelve []"
				],
				1
			],
			[
				"¿Qué método devuelve todas las coincidencias como iterador con más info?",
				[
					"match()",
					"matchAll()",
					"search()",
					"exec()"
				],
				1
			],
			[
				"¿Qué método usar para saber si un patrón existe sin necesitar el texto?",
				[
					"match()",
					"test()",
					"search()",
					"matchAll()"
				],
				1
			]
		])
	},
	matchall: {
		id: "matchall",
		titulo: "String.prototype.matchAll()",
		simulador: "string",
		definicion: ["Método de `String` que busca **todas las coincidencias** de una expresión regular dentro de una cadena y devuelve un **iterador** con los resultados de cada coincidencia."],
		queEs: [
			"`matchAll()` permite encontrar **todas las coincidencias** de un patrón y obtener **información detallada** de cada una.",
			"La diferencia importante con `match()` es que **`matchAll()` no devuelve directamente un array**: devuelve un **iterador** (`Iterator`) que puedes recorrer.",
			"Conserva **toda** la información de cada coincidencia: `index`, `input`, `groups` y **grupos de captura**.",
			"**Requiere** que la expresión regular use la flag `g` (global). Sin ella, lanza `TypeError`."
		],
		paraQueSirve: [
			"Encontrar **todas** las coincidencias de una expresión regular.",
			"Obtener **información detallada** de cada coincidencia.",
			"Obtener los **grupos capturados** de una expresión regular.",
			"Obtener la **posición** (`index`) de cada coincidencia.",
			"Procesar resultados mediante `for...of`, `[...iterador]`, `Array.from()`, etc."
		],
		comoFunciona: [
			"Se llama sobre un string con una **RegExp con flag `g`**.",
			"Devuelve un **iterador** que produce objetos `RegExpMatchArray`, uno por cada coincidencia.",
			"Cada objeto tiene: `[0]` (coincidencia completa), `[1..n]` (grupos), `index` (posición), `input` (string original), `groups` (grupos nombrados).",
			"**No se puede reutilizar el iterador** después de agotado: hay que crear uno nuevo con otra llamada a `matchAll()`.",
			"Convertirlo a array con `[...iter]` o `Array.from(iter)`."
		],
		sintaxis: [{ code: `cadena.matchAll(expresionRegular);` }],
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
// 20`
			},
			{
				titulo: "Ejemplo 2: Convertir los resultados en un Array",
				code: `const texto = "Tengo 15 manzanas y 20 naranjas";

const resultados = Array.from(texto.matchAll(/\\d+/g));
console.log(resultados);
// o con spread:
const resultados2 = [...texto.matchAll(/\\d+/g)];`
			},
			{
				titulo: "Ejemplo 3: Obtener la posición de cada coincidencia",
				code: `const texto = "Hola mundo, hola JavaScript";

for (const resultado of texto.matchAll(/hola/gi)) {
  console.log(resultado[0]);
  console.log(resultado.index);
}
// "Hola"  → 0
// "hola"  → 12`
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
// "Pedro", "25"`
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
// "Pedro", "25"`
			}
		],
		errores: [
			{
				texto: "**Olvidar la bandera `g`:** `matchAll()` **lanza `TypeError`** si la RegExp no es global.",
				code: `// ❌ TypeError
"hola hola".matchAll(/hola/);

// ✅ Correcto
"hola hola".matchAll(/hola/g);`
			},
			{
				texto: "**Pensar que devuelve un Array:** devuelve un **iterador**.",
				code: `const resultados = "a b c".matchAll(/\\w/g);
console.log(resultados); // No es un array directo

// ✅ Convertirlo
const arr = [..."a b c".matchAll(/\\w/g)];`
			},
			{
				texto: "**Confundir con `match()`:** aunque parecidos, su comportamiento difiere.",
				code: `match()    // → resultado de coincidencias (array o null)
matchAll() // → iterador de coincidencias detalladas`
			},
			{
				texto: "**Reutilizar el iterador agotado:** hay que volver a llamar a `matchAll()`.",
				code: `const iter = "a a a".matchAll(/a/g);
console.log([...iter]); // ['a', 'a', 'a']
console.log([...iter]); // []  ← ¡ya se consumió!`
			}
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
// "Josue", "Carlos", "Ana"`
			}
		],
		relacion: [
			"**`match()`:** devuelve el resultado de coincidencias (array o null).",
			"**`matchAll()`:** devuelve un iterador de coincidencias detalladas.",
			"**`search()`:** devuelve el índice de la primera coincidencia.",
			"**`replace()` / `replaceAll()`:** reemplazan coincidencias.",
			"**`RegExp`:** las expresiones regulares son la base de `matchAll()`.",
			"**`for...of` / `Array.from()` / spread:** formas de consumir el iterador."
		],
		analogia: "Imagina que tienes un documento de 500 páginas y buscas la palabra **«JavaScript»**. `match()` sería como decir: *«Dime las coincidencias»*. Mientras `matchAll()` sería como: *«Dame **cada coincidencia una por una**, junto con dónde apareció y los datos capturados alrededor de ella»*. Coincidencia 1 → posición + grupos. Coincidencia 2 → posición + grupos. Coincidencia 3 → posición + grupos...",
		fuente: "MDN Web Docs — String.prototype.matchAll() | Especificación ECMAScript (ES2020)",
		notasPersonales: [
			"**Palabras clave:** `String` · `RegExp` · `Iterator` · `g` · `match` · `capturing groups` · `index`.",
			"**Para memorizar:** `matchAll()` = obtener todas las coincidencias de una RegExp como un **iterador**, conservando información detallada de cada coincidencia.",
			"**La pareja conceptual:** `match()` → coincidencias; `matchAll()` → todas las coincidencias + información detallada.",
			"Introducido en **ES2020 (ES11)**, disponible en todos los entornos modernos."
		],
		quiz: Q$2([
			[
				"¿Qué devuelve matchAll()?",
				[
					"Un array de strings",
					"Un iterador de coincidencias detalladas",
					"Un string",
					"null"
				],
				1
			],
			[
				"¿Qué pasa si usas matchAll() con una RegExp SIN flag g?",
				[
					"Funciona normal",
					"Lanza TypeError",
					"Solo devuelve la primera",
					"Devuelve []"
				],
				1
			],
			[
				"¿Cómo conviertes el iterador de matchAll() en un array?",
				[
					"iter.toArray()",
					"[...iter] o Array.from(iter)",
					"iter[0]",
					"iter.length"
				],
				1
			],
			[
				"¿Qué información conserva matchAll() que match() con g pierde?",
				[
					"Nada, son iguales",
					"index, input y grupos de captura",
					"Solo el texto",
					"Solo la posición"
				],
				1
			],
			[
				"¿Qué pasa si intentas recorrer el mismo iterador dos veces?",
				[
					"Devuelve lo mismo",
					"La segunda vez devuelve [] porque ya se agotó",
					"Lanza error",
					"Se reinicia automáticamente"
				],
				1
			],
			[
				"¿Qué devuelve resultado.groups en matchAll()?",
				[
					"El texto completo",
					"Los grupos nombrados (si existen)",
					"El índice",
					"El array de coincidencias"
				],
				1
			],
			[
				"¿Qué método usar si solo quieres las coincidencias como strings sin más info?",
				[
					"match() con g",
					"matchAll()",
					"search()",
					"test()"
				],
				0
			],
			[
				"¿En qué versión de ECMAScript se introdujo matchAll()?",
				[
					"ES5",
					"ES2015",
					"ES2020",
					"ES2023"
				],
				2
			]
		])
	},
	localecompare: {
		id: "localecompare",
		titulo: "String.prototype.localeCompare()",
		simulador: "string",
		definicion: ["Es un método built-in de JavaScript que compara la cadena de texto actual con otra y devuelve un número que indica si la cadena original va **antes (-1), después (1) o en la misma posición (0)** dentro del orden alfabético según un idioma (*locale*) específico."],
		queEs: [
			"Es la forma estándar e internacionalizada de **ordenar textos correctamente** en JavaScript.",
			"A diferencia de los operadores habituales (`<`, `>`), respeta los caracteres especiales, acentos, diacríticos y reglas ortográficas propias de cada país/idioma (como la `ñ` en español o las vocales con tilde en francés/alemán).",
			"Pertenece a la familia de internacionalización de JavaScript (`Intl`)."
		],
		paraQueSirve: [
			"**Ordenar listas alfabéticamente** mediante `.sort()` de forma regionalizada.",
			"Tratar caracteres especiales correctamente (ej. colocar la `ñ` después de la `n` en español).",
			"Ordenar strings ignorando acentos, mayúsculas o puntuación si se configuran sus opciones.",
			"Ordenar números escritos dentro de textos de forma lógica (ej. `\"2\"` antes que `\"10\"` en lugar de la ordenación lexicográfica clásica)."
		],
		comoFunciona: [
			"Internamente consulta las reglas internacionales de clasificación Unicode (API `Intl.Collator`) según el idioma del navegador o el que le indiques explícitamente.",
			"Retorna un **número negativo** si el string va *antes* del string comparado.",
			"Retorna un **número positivo** si el string va *después*.",
			"Retorna `0` si ambos strings se consideran equivalentes en ese idioma.",
			"**Importante:** la especificación permite devolver cualquier entero negativo o positivo, no solo `-1` o `1`. Compara siempre con `< 0` o `> 0`."
		],
		sintaxis: [{ code: `referenceStr.localeCompare(compareString);
referenceStr.localeCompare(compareString, locales);
referenceStr.localeCompare(compareString, locales, options);` }],
		nota: "**`compareString`:** la cadena contra la que vas a comparar. **`locales` (opcional):** código del idioma (ej. `'es'`, `'en'`, `'fr'`). Si se omite, usa el idioma configurado en el entorno. **`options` (opcional):** objeto con opciones como `sensitivity`, `numeric`, `ignorePunctuation`. **Retorno:** un `number` negativo, `0` o positivo.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Ordenación de un Array (el caso de uso ideal)",
				code: `const palabras = ["zona", "año", "manzana", "ñandú"];

// .sort() tradicional fallaría poniendo 'ñandú' al final
palabras.sort((a, b) => a.localeCompare(b, "es"));

console.log(palabras);
// Resultado correcto: ["año", "manzana", "ñandú", "zona"]`
			},
			{
				titulo: "Ejemplo 2: Comparación numérica natural (numeric: true)",
				code: `const archivos = ["foto10.jpg", "foto2.jpg", "foto1.jpg"];

archivos.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

console.log(archivos);
// ["foto1.jpg", "foto2.jpg", "foto10.jpg"]`
			},
			{
				titulo: "Ejemplo 3: Ignorar mayúsculas y acentos (sensitivity: 'base')",
				code: `console.log("canción".localeCompare("CANCION", "es", { sensitivity: "base" }));
// Devuelve 0 (se consideran equivalentes)`
			},
			{
				titulo: "Ejemplo 4: El valor de retorno en la práctica",
				code: `console.log("a".localeCompare("b")); // -1 (a va antes que b)
console.log("b".localeCompare("a")); // 1  (b va después de a)
console.log("a".localeCompare("a")); // 0  (son iguales)`
			}
		],
		errores: [
			{
				texto: "**Retorno estricto de -1 o 1:** aunque la mayoría de navegadores devuelven `-1`, `1` o `0`, la especificación permite que devuelva cualquier entero negativo o positivo (ej. `-2` o `2`).",
				code: `// ❌ Puede fallar en algunos navegadores
if (a.localeCompare(b) === -1) { ... }

// ✅ Forma correcta
if (a.localeCompare(b) < 0) { ... }`
			},
			{
				texto: "**Uso directo sin `.sort()` en listas grandes:** crear las opciones de `localeCompare` repetidamente en loops masivos puede restar rendimiento.",
				code: `// ❌ Crea un Intl.Collator nuevo en cada comparación
array.sort((a, b) => a.localeCompare(b, "es"));

// ✅ Reutilizar el collator
const collator = new Intl.Collator("es");
array.sort(collator.compare);`
			},
			{
				texto: "**Depender del idioma por defecto:** si no pasas el parámetro `locales`, el resultado variará según el idioma de la computadora donde corra el código.",
				code: `// ❌ En una máquina en inglés, la "ñ" se ordena distinto
"ñ".localeCompare("n");

// ✅ Fijar el idioma
"ñ".localeCompare("n", "es");`
			},
			{
				texto: "**Pensar que el resultado exacto es `-1`/`0`/`1`:** siempre compara con `< 0`, `=== 0`, `> 0`.",
				code: `// ✅ Forma robusta
const result = a.localeCompare(b);
if (result < 0)      { /* a va antes que b */ }
else if (result > 0) { /* a va después de b */ }
else                 { /* son equivalentes */ }`
			}
		],
		casos: [
			{
				texto: "**Tablas de datos (DataTables):** ordenar columnas alfabéticamente por nombres, países o apellidos.",
				code: `usuarios.sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));`
			},
			{
				texto: "**Buscadores/Autocompletados:** ordenar sugerencias respetando acentos y diacríticos locales.",
				code: `sugerencias.sort((a, b) => a.localeCompare(b, "es"));`
			},
			{
				texto: "**Gestores de archivos:** ordenar carpetas y archivos con sufijos numéricos (`v1`, `v2`, `v10`).",
				code: `archivos.sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));`
			}
		],
		relacion: [
			"**`Array.prototype.sort()`:** el método de arreglos con el que se suele combinar `localeCompare` para realizar ordenamientos.",
			"**`Intl.Collator`:** la API de internacionalización subyacente que utiliza `localeCompare()` por detrás para las reglas lingüísticas.",
			"**`String.prototype.toLocaleUpperCase()` / `toLocaleLowerCase()`:** también usan reglas de locale, pero para transformar texto, no para comparar.",
			"**Operadores `<`, `>`:** comparan por código Unicode, **no** por reglas de idioma."
		],
		analogia: "Es como llamar a un **traductor nativo** para que organice una biblioteca. En lugar de ordenar los libros usando solo el número binario/ASCII del carácter (como haría la computadora), el traductor aplica las reglas reales del diccionario del país correspondiente: la `ñ` después de la `n`, las tildes como si no existieran (si así se configura), etc.",
		fuente: "MDN Web Docs - String.prototype.localeCompare() | Especificación ECMAScript (ECMA-402 API de Internacionalización)",
		notasPersonales: [
			"**Siempre usar en la función de comparación de `.sort((a, b) => a.localeCompare(b))`** cuando se trabaje con interfaces en español para evitar el clásico fallo del orden de la `Ñ` y las vocales con tilde.",
			"**Nunca compares con `=== -1` o `=== 1`:** usa `< 0`, `> 0`, `=== 0`.",
			"**Para listas grandes,** reutiliza `new Intl.Collator(locale).compare` en lugar de llamar a `localeCompare` en cada iteración.",
			"**Opciones útiles:** `sensitivity` (`'base'`, `'accent'`, `'case'`, `'variant'`), `numeric: true` (ordena `\"2\"` antes que `\"10\"`), `ignorePunctuation: true`."
		],
		quiz: Q$2([
			[
				"¿Qué devuelve 'a'.localeCompare('b')?",
				[
					"-1 (o número negativo)",
					"1 (o número positivo)",
					"0",
					"true"
				],
				0
			],
			[
				"¿Qué devuelve 'b'.localeCompare('a')?",
				[
					"-1",
					"1 (o número positivo)",
					"0",
					"false"
				],
				1
			],
			[
				"¿Qué devuelve 'a'.localeCompare('a')?",
				[
					"-1",
					"1",
					"0",
					"undefined"
				],
				2
			],
			[
				"¿Para qué se usa principalmente localeCompare()?",
				[
					"Para buscar substrings",
					"Para ordenar cadenas respetando el idioma",
					"Para concatenar strings",
					"Para dividir strings"
				],
				1
			],
			[
				"¿Qué compara 'ñ'.localeCompare('n', 'es') vs 'ñ'.localeCompare('n', 'en')?",
				[
					"Es lo mismo",
					"En español la ñ va después de la n; en inglés puede ser distinto",
					"Siempre lanza error",
					"Siempre devuelve 0"
				],
				1
			],
			[
				"¿Qué opción permite ordenar 'foto2' antes que 'foto10'?",
				[
					"{ sensitivity: 'base' }",
					"{ numeric: true }",
					"{ ignorePunctuation: true }",
					"{ caseFirst: 'upper' }"
				],
				1
			],
			[
				"¿Por qué es mejor comparar con < 0 o > 0 en lugar de === -1?",
				[
					"Porque localeCompare solo devuelve -1/1",
					"Porque la especificación permite cualquier entero negativo o positivo",
					"Porque los números no son iguales",
					"Porque así lo exige el estándar"
				],
				1
			],
			[
				"¿Qué API usa internamente localeCompare()?",
				[
					"RegExp",
					"Intl.Collator",
					"JSON",
					"Math"
				],
				1
			]
		])
	},
	codepointat: {
		id: "codepointat",
		titulo: "String.prototype.codePointAt()",
		simulador: "string",
		definicion: ["Método de `String` que devuelve el **valor Unicode (code point)** del carácter que **comienza** en una posición específica de la cadena."],
		queEs: [
			"Permite obtener el **código Unicode** de un carácter dado su índice.",
			"A diferencia de `charCodeAt()`, representa correctamente caracteres que ocupan **dos unidades UTF-16**, como muchos emojis.",
			"Su pareja natural es `String.fromCodePoint()` (hace el camino inverso)."
		],
		paraQueSirve: [
			"Obtener el valor Unicode de un carácter.",
			"Trabajar con caracteres fuera del **Basic Multilingual Plane (BMP)**.",
			"Analizar emojis y otros caracteres con **pares sustitutos** (*surrogate pairs*).",
			"Convertir luego el número a carácter con `String.fromCodePoint()`."
		],
		comoFunciona: [
			"Recibe un **índice** (empieza en `0`).",
			"Busca la unidad de código UTF-16 que comienza en esa posición.",
			"Si es la primera mitad de un **par sustituto** y a continuación viene la segunda mitad, combina las dos unidades.",
			"Devuelve el valor como número. Si el índice está fuera de rango, devuelve `undefined`.",
			"**Importante:** JavaScript usa **UTF-16**: un emoji como `😀` tiene `length` 2, y `codePointAt(1)` devuelve solo la mitad baja."
		],
		sintaxis: [{ code: `cadena.codePointAt(indice);` }],
		nota: "**Parámetro:** `indice` (número, base 0). **Retorno:** un `number` (el code point) o `undefined` si el índice no existe.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Una letra",
				code: `"A".codePointAt(0); // 65   (U+0041)
"a".codePointAt(0); // 97`
			},
			{
				titulo: "Ejemplo 2: Un emoji",
				code: `"😀".codePointAt(0); // 128512  (U+1F600)`
			},
			{
				titulo: "Ejemplo 3: Varios caracteres",
				code: `const texto = "ABC";
console.log(texto.codePointAt(0)); // 65
console.log(texto.codePointAt(1)); // 66
console.log(texto.codePointAt(2)); // 67`
			},
			{
				titulo: "Ejemplo 4: length e índices con un emoji",
				code: `const emoji = "😀";
console.log(emoji.length);          // 2
console.log(emoji.codePointAt(0));  // 128512
console.log(emoji.codePointAt(1));  // 56832 (solo la mitad baja)`
			},
			{
				titulo: "Ejemplo 5: Ida y vuelta con fromCodePoint()",
				code: `const codigo = "😀".codePointAt(0);
console.log(codigo);                       // 128512
console.log(String.fromCodePoint(codigo)); // "😀"`
			}
		],
		errores: [
			{
				texto: "**Confundirlo con `charCodeAt()`:**",
				code: `"😀".charCodeAt(0);  // 55357  (solo una unidad UTF-16)
"😀".codePointAt(0); // 128512 (code point completo)`
			},
			{ texto: "**Confundir `length` con la cantidad de caracteres:** `\"😀\".length` es `2`, aunque visualmente sea uno." },
			{
				texto: "**Usar un índice inexistente:**",
				code: `"Hola".codePointAt(20); // undefined`
			},
			{
				texto: "**Recorrer un emoji por índices:** para recorrer caracteres completos usa `for...of`.",
				code: `for (const caracter of "A😀B") {
  console.log(caracter, caracter.codePointAt(0));
}`
			}
		],
		casos: [
			"Procesamiento de Unicode y texto internacional.",
			"Análisis de emojis.",
			"Conversión entre caracteres y valores Unicode.",
			"Algoritmos que necesitan trabajar con code points."
		],
		relacion: [
			"**`fromCodePoint()`:** code point → carácter (la pareja).",
			"**`charCodeAt()`:** carácter → unidad UTF-16.",
			"**`fromCharCode()`:** unidades UTF-16 → cadena.",
			{
				texto: "**Resumen de parejas:**",
				code: `codePointAt()  ↔ fromCodePoint()   // code points Unicode
charCodeAt()   ↔ fromCharCode()    // unidades UTF-16`
			}
		],
		analogia: "Imagina que cada carácter tiene un **DNI universal** 🌎. `codePointAt()` es decir: **«dime el DNI Unicode del carácter que está en esta posición»**. El DNI de `😀` es `128512`.",
		fuente: "MDN Web Docs | String.prototype.codePointAt()",
		notasPersonales: ["**Idea para recordar:** `codePointAt()` = *obtener el número Unicode de un carácter*. Su pareja: `fromCodePoint()` = *convertir un número Unicode en carácter*."],
		quiz: Q$2([
			[
				"¿Qué devuelve 'A'.codePointAt(0)?",
				[
					"'A'",
					"65",
					"97",
					"undefined"
				],
				1
			],
			[
				"¿Qué devuelve '😀'.codePointAt(0)?",
				[
					"55357",
					"128512",
					"2",
					"56832"
				],
				1
			],
			[
				"¿Qué devuelve 'Hola'.codePointAt(20)?",
				[
					"NaN",
					"0",
					"undefined",
					"Un error"
				],
				2
			],
			[
				"¿Cuál es el length de '😀'?",
				[
					"1",
					"2",
					"4",
					"0"
				],
				1
			],
			[
				"¿Qué diferencia hay con charCodeAt() en un emoji?",
				[
					"Ninguna",
					"codePointAt devuelve el code point completo; charCodeAt solo una unidad UTF-16",
					"charCodeAt es más moderno",
					"codePointAt devuelve un string"
				],
				1
			],
			[
				"¿Qué método hace el camino inverso (número → carácter)?",
				[
					"charAt()",
					"fromCodePoint()",
					"at()",
					"toString()"
				],
				1
			],
			[
				"¿Qué devuelve '😀'.codePointAt(1)?",
				[
					"128512",
					"undefined",
					"56832",
					"55357"
				],
				2
			],
			[
				"¿Cómo recorres caracteres completos (sin partir emojis)?",
				[
					"for (i...length)",
					"for...of",
					"while con length",
					"forEach"
				],
				1
			]
		])
	},
	normalize: {
		id: "normalize",
		titulo: "String.prototype.normalize()",
		simulador: "string",
		definicion: ["`String.prototype.normalize()` es un método de JavaScript que devuelve la **forma normalizada Unicode** de una cadena de texto, asegurando que caracteres con representaciones múltiples (como letras acentuadas) se conviertan a una forma canónica consistente."],
		queEs: [
			"En Unicode, muchos caracteres pueden representarse de **múltiples maneras**.",
			"Por ejemplo: `\"é\"` puede representarse como un solo carácter (`U+00E9`, LATIN SMALL LETTER E WITH ACUTE), o como dos caracteres: `\"e\"` (`U+0065`) + `\"◌́\"` (`U+0301`, COMBINING ACUTE ACCENT).",
			"`normalize()` resuelve este problema transformando todas las representaciones a una **forma estándar**, facilitando comparaciones, búsquedas y procesamiento de texto."
		],
		paraQueSirve: [
			"Comparar cadenas que contienen caracteres acentuados o diacríticos.",
			"Normalizar entradas de usuario para **búsquedas y filtros**.",
			"Preparar texto para **ordenamiento** y **colaciones**.",
			"**Indexar** y **buscar** en bases de datos con consistencia.",
			"Procesar texto en **aplicaciones internacionales** y multilingües.",
			"**Tokenizar** y **analizar** cadenas correctamente.",
			"Generar **URLs amigables** (slugs) desde texto acentuado.",
			"Implementar **comparaciones insensibles a acentos**."
		],
		comoFunciona: ["El método recorre la cadena y convierte cada carácter a una **forma de normalización Unicode**.", "Existen cuatro formas de normalización:"],
		comoFuncionaSinNumerar: true,
		sintaxis: [{ code: `str.normalize();
str.normalize(form);` }],
		nota: "**`form` (opcional):** `\"NFC\"` (por defecto), `\"NFD\"`, `\"NFKC\"`, `\"NFKD\"`. **Retorno:** un nuevo string normalizado según la forma especificada. Lanza `RangeError` si la forma no es válida.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Normalización básica",
				code: `const str1 = '\\u00E9';      // "é" (U+00E9)
const str2 = 'e\\u0301';     // "e" + combinación de acento

console.log(str1 === str2);                       // false (son diferentes bytes)
console.log(str1.normalize() === str2.normalize()); // true (NFC)`
			},
			{
				titulo: "Ejemplo 2: Comparación de strings acentuados",
				code: `function compareAccents(text1, text2) {
  return text1.normalize('NFC') === text2.normalize('NFC');
}

console.log(compareAccents('café', 'cafe\\u0301')); // true
console.log(compareAccents('ñ', 'n\\u0303'));       // true`
			},
			{
				titulo: "Ejemplo 3: Eliminar diacríticos (quitar tildes)",
				code: `function removeDiacritics(text) {
  return text.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
}

console.log(removeDiacritics('café'));    // "cafe"
console.log(removeDiacritics('españa'));  // "espana"`
			},
			{
				titulo: "Ejemplo 4: Diferentes formas de normalización",
				code: `const text = 'ﬁ café e\\u0301';

console.log('Original:', text);
console.log('NFC:',  text.normalize('NFC'));  // "ﬁ café é"
console.log('NFD:',  text.normalize('NFD'));  // "ﬁ cafe ́ e ́"
console.log('NFKC:', text.normalize('NFKC')); // "fi café é"
console.log('NFKD:', text.normalize('NFKD')); // "fi cafe ́ e ́"`
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
console.log(results); // ["José", "Jose"]`
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
console.log(generateSlug('¡España y café!'));    // "espana-y-cafe"`
			}
		],
		errores: [
			{
				texto: "**Asumir que strings visualmente iguales son iguales en memoria:**",
				code: `// ❌ MAL
'café' === 'cafe\\u0301' // false

// ✅ BIEN
'café'.normalize() === 'cafe\\u0301'.normalize() // true`
			},
			"**No usar normalización en comparaciones de bases de datos:** puede causar duplicados o resultados faltantes.",
			{
				texto: "**Usar la forma incorrecta para el caso de uso:**",
				code: `NFC   // la más común (compuesta)
NFKC  // para compatibilidad y búsquedas más flexibles
NFD   // para descomponer y eliminar diacríticos`
			},
			"**No considerar el rendimiento:** normalizar strings largos puede ser costoso. Cachea el resultado si lo usas repetidamente."
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
}`
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
}`
			},
			{
				texto: "**Comparación de nombres en bases de datos:**",
				code: `function compareNames(name1, name2) {
  const normalized1 = name1.normalize('NFC').toLowerCase();
  const normalized2 = name2.normalize('NFC').toLowerCase();
  return normalized1 === normalized2;
}

compareNames('José', 'Jose\\u0301'); // true`
			},
			{
				texto: "**Procesamiento de texto multilingüe:**",
				code: `function processMultilingualText(text) {
  return text
    .normalize('NFKC')
    .replace(/[^\\p{L}\\p{N}\\s]/gu, '')
    .toLowerCase();
}`
			},
			{
				texto: "**Formularios con validación:**",
				code: `function validateName(name) {
  const normalized = name.normalize('NFC');
  return /^[\\p{L}\\s]+$/u.test(normalized);
}`
			}
		],
		relacion: [
			"**Unicode:** estándar que define la representación de caracteres en todo el mundo.",
			"**Diacríticos:** acentos, tildes y otros signos sobre caracteres.",
			"**`toLocaleLowerCase()` / `toLocaleUpperCase()`:** localización de mayúsculas/minúsculas.",
			"**`localeCompare()`:** comparación de strings con localización.",
			"**`String.fromCharCode()` / `charCodeAt()`:** trabajo con códigos de caracteres.",
			"**`Intl.Collator`:** comparación de strings más avanzada y localizada."
		],
		analogia: "Imagina que escribir `\"é\"` es como tener dos formas de escribir la misma palabra en un pizarrón: opción 1, escribes la letra `\"é\"` con un solo trazo (carácter compuesto); opción 2, escribes la letra `\"e\"` y luego agregas el acento encima (carácter base + combinación). `normalize()` es como un **corrector** que siempre usa una forma consistente, ya sea la opción 1 o la 2, dependiendo de lo que necesites. Así, cuando busques la palabra, siempre encontrarás coincidencias sin importar cómo fue escrita originalmente.",
		fuente: "MDN Web Docs – normalize() | Unicode Normalization Forms | ECMAScript Specification – String.prototype.normalize | JavaScript.info – String normalization",
		notasPersonales: [
			"**Regla clave:** si comparas strings con acentos, **siempre** normaliza ambos lados antes de comparar.",
			"**Para quitar tildes:** `text.normalize('NFD').replace(/[\\u0300-\\u036f]/g, '')`. Esta es la receta estándar.",
			"**NFC** para almacenar y comparar (es la forma más común). **NFD** para procesar (descomponer y eliminar diacríticos). **NFKC/NFKD** para compatibilidad (ligaduras, formas especiales)."
		],
		quiz: Q$2([
			[
				"¿Qué hace normalize()?",
				[
					"Convierte a mayúsculas",
					"Devuelve la forma normalizada Unicode de un string",
					"Elimina espacios",
					"Ordena caracteres"
				],
				1
			],
			[
				"¿Qué forma es la predeterminada si no se pasa argumento?",
				[
					"NFC",
					"NFD",
					"NFKC",
					"NFKD"
				],
				0
			],
			[
				"¿Qué devuelve 'café' === 'cafe\\u0301'?",
				[
					"true",
					"false (son diferentes bytes)",
					"undefined",
					"Un error"
				],
				1
			],
			[
				"¿Qué devuelve 'café'.normalize() === 'cafe\\u0301'.normalize()?",
				[
					"true (NFC los iguala)",
					"false",
					"Un error",
					"undefined"
				],
				0
			],
			[
				"¿Qué forma se usa para eliminar diacríticos (tildes)?",
				[
					"NFC",
					"NFD",
					"NFKC",
					"NFKD"
				],
				1
			],
			[
				"¿Qué diferencia hay entre NFC y NFD?",
				[
					"NFC compone (é = 1 carácter), NFD descompone (é = e + ́)",
					"Son idénticas",
					"NFC es para números",
					"NFD compone"
				],
				0
			],
			[
				"¿Qué forma convierte 'ﬁ' en 'fi' (ligaduras)?",
				[
					"NFC",
					"NFD",
					"NFKC o NFKD (compatibilidad)",
					"Ninguna"
				],
				2
			],
			[
				"¿Qué pasa si pasas una forma inválida a normalize()?",
				[
					"Devuelve el original",
					"Lanza RangeError",
					"Lanza TypeError",
					"Devuelve null"
				],
				1
			]
		])
	}
};
// src/data/metodosNumeros.js
var Q$1 = (rows) => rows.map(([pregunta, opciones, correcta], i) => ({
	id: i + 1,
	pregunta,
	opciones,
	correcta
}));
var METODOS_NUMEROS_DOCS = {
	isinteger: {
		id: "isinteger",
		titulo: "Number.isInteger()",
		simulador: "numero",
		definicion: ["Es un **método estático** del objeto global `Number` que determina si un valor es un **número entero válido**.", "Devuelve `true` si el valor es de tipo `number` y no tiene parte decimal; devuelve `false` en cualquier otro caso."],
		queEs: [
			"Forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
			"Es un método **estático**: se llama como `Number.isInteger(valor)` y no como `valor.isInteger()`.",
			"**No realiza conversiones de tipo** (*no coerciona*): un string como `\"10\"` devuelve `false` aunque parezca un número.",
			"No existe una función global `isInteger()`; el método correcto es siempre `Number.isInteger()`."
		],
		paraQueSirve: [
			"Validar si un valor es un número entero.",
			"Comprobar entradas numéricas de formularios.",
			"Validar índices de arrays antes de acceder a una posición.",
			"Verificar cantidades que no aceptan decimales (vidas, puntos, stock...).",
			"Evitar errores en cálculos que esperan números enteros."
		],
		comoFunciona: [
			"Recibe un valor como argumento.",
			"Comprueba si su tipo de dato es `number`, **sin convertir** strings, booleanos ni `null`.",
			"Verifica que el número no contenga parte decimal (equivale a `valor % 1 === 0`).",
			"Devuelve `true` si es un entero y `false` si no lo es."
		],
		sintaxis: [{ code: `const esEntero = Number.isInteger(valor);` }, {
			caption: "Funciona igual con cero y con números negativos:",
			code: `Number.isInteger(0);    // true
Number.isInteger(-20);  // true`
		}],
		nota: "**Parámetro:** `valor`, cualquier valor. **Retorno:** `true` si es un entero de tipo `number`, `false` en caso contrario.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Números enteros",
				code: `console.log(Number.isInteger(10));   // true
console.log(Number.isInteger(0));    // true
console.log(Number.isInteger(-20));  // true
console.log(Number.isInteger(10.0)); // true (10.0 === 10)`
			},
			{
				titulo: "Ejemplo 2: Números con decimales",
				code: `console.log(Number.isInteger(10.5));  // false
console.log(Number.isInteger(3.14));  // false
console.log(Number.isInteger(-2.75)); // false`
			},
			{
				titulo: "Ejemplo 3: Valores que no son números",
				code: `console.log(Number.isInteger("10"));      // false (es un string)
console.log(Number.isInteger(true));      // false
console.log(Number.isInteger(null));      // false
console.log(Number.isInteger(undefined)); // false
console.log(Number.isInteger(NaN));       // false
console.log(Number.isInteger(Infinity));  // false`
			},
			{
				titulo: "Ejemplo 4: Validar una edad y un índice",
				descripcion: "Como no convierte, primero debes transformar el texto con `Number()` si viene de un formulario.",
				code: `const edad = 18;
if (Number.isInteger(edad)) {
  console.log("Edad válida");
}

function obtenerElemento(arr, index) {
  if (!Number.isInteger(index)) return "Índice inválido";
  return arr[index];
}

console.log(obtenerElemento(["a", "b", "c"], 1)); // "b"`
			}
		],
		errores: [
			{
				texto: "**Confundirlo con `Number.isSafeInteger()`:** `isInteger()` solo mira si es entero, **no** si está dentro del rango seguro.",
				code: `Number.isInteger(9007199254740992);     // true  (¡pero no es seguro!)
Number.isSafeInteger(9007199254740992); // false`
			},
			{
				texto: "**Usar un `isInteger()` global que no existe:** el método vive dentro de `Number`.",
				code: `// ❌ ReferenceError: isInteger is not defined
isInteger(5);

// ✅ Correcto
Number.isInteger(5); // true`
			},
			{
				texto: "**Pensar que convierte strings:** devuelve `false` sin intentar convertir. Si necesitas convertir, hazlo tú.",
				code: `Number.isInteger("50");         // false
Number.isInteger(Number("50")); // true`
			},
			{
				texto: "**Confundir `10.0` con un decimal:** los ceros a la derecha no cambian el valor; `10.0` es exactamente `10`.",
				code: `Number.isInteger(10.0); // true
Number.isInteger(10.5); // false`
			}
		],
		casos: [
			"**Validación de formularios:** comprobar que la edad o la cantidad ingresada es un entero.",
			"**Control de cantidades:** stock, vidas, puntos y niveles que no admiten decimales.",
			{
				texto: "**Verificar índices antes de usarlos:**",
				code: `if (Number.isInteger(index)) {
  array[index];
}`
			},
			"**Sistemas financieros** donde ciertos montos no aceptan decimales.",
			"**Algoritmos matemáticos** que solo trabajan con enteros."
		],
		relacion: [
			"**`Number.isSafeInteger()`:** además de entero, verifica que esté dentro del rango seguro.",
			"**`Number.isNaN()`:** comprueba si el valor es `NaN`.",
			"**`Number.isFinite()`:** comprueba si es un número finito.",
			"**`Number.parseInt()`:** convierte texto a entero, pero **no valida** ni evita perder precisión.",
			"**Tipos primitivos:** `Number.isInteger()` solo devuelve `true` para valores de tipo `number`."
		],
		analogia: "Imagina una máquina que revisa monedas: una moneda de 10 soles pasa ✅ (entero), una de 2.50 soles no pasa ❌ (tiene decimales) y un billete escrito como `\"10\"` tampoco pasa ❌ (es texto, no una moneda real). `Number.isInteger()` no transforma la moneda: solo revisa si cumple la condición de ser un número entero.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: ["**Regla para memorizar:** primero debe ser de tipo `number`, luego no debe tener decimales. `Number.isInteger(\"10\")` es `false`; `Number.isInteger(Number(\"10\"))` es `true`."],
		quiz: Q$1([
			[
				"¿Qué devuelve Number.isInteger(10)?",
				[
					"true",
					"false",
					"10",
					"undefined"
				],
				0
			],
			[
				"¿Qué devuelve Number.isInteger(10.5)?",
				[
					"true",
					"false",
					"10",
					"NaN"
				],
				1
			],
			[
				"¿Qué devuelve Number.isInteger(\"10\")?",
				[
					"true",
					"false",
					"10",
					"Un error"
				],
				1
			],
			[
				"¿Qué devuelve Number.isInteger(10.0)?",
				[
					"true, porque 10.0 === 10",
					"false, porque tiene un punto",
					"NaN",
					"Un error"
				],
				0
			],
			[
				"¿Number.isInteger() convierte strings a números?",
				[
					"Sí, siempre",
					"No, no coerciona",
					"Solo si son enteros",
					"Solo en modo estricto"
				],
				1
			],
			[
				"¿Qué devuelve Number.isInteger(NaN)?",
				[
					"true",
					"false",
					"NaN",
					"Un error"
				],
				1
			],
			[
				"¿Qué método verifica además que el entero sea seguro?",
				[
					"Number.isInteger()",
					"Number.isSafeInteger()",
					"Number.isFinite()",
					"parseInt()"
				],
				1
			],
			[
				"¿Cómo se llama correctamente?",
				[
					"isInteger(5)",
					"(5).isInteger()",
					"Number.isInteger(5)",
					"Number.isInteger = 5"
				],
				2
			]
		])
	},
	issafeinteger: {
		id: "issafeinteger",
		titulo: "Number.isSafeInteger()",
		simulador: "numero",
		definicion: ["Es un **método estático** de `Number` que determina si un valor es un **número entero seguro** (*safe integer*).", "Un entero seguro es aquel que puede representarse **exactamente** como un número de doble precisión (IEEE 754) y que está dentro del rango `-(2^53 - 1)` a `2^53 - 1`."],
		queEs: [
			"JavaScript usa el formato **IEEE 754 de doble precisión**, por lo que no todos los enteros pueden representarse con exactitud.",
			"Los enteros que sí se representan sin pérdida de precisión se llaman **safe integers** (enteros seguros).",
			"Rango seguro: de `-(2^53 - 1)` a `2^53 - 1`, es decir, de `-9007199254740991` a `9007199254740991`.",
			"Constantes relacionadas: `Number.MAX_SAFE_INTEGER` y `Number.MIN_SAFE_INTEGER`.",
			"Es un método **estático**, **no coerciona** y fue introducido en **ES6 (ECMAScript 2015)**."
		],
		paraQueSirve: [
			"Validar números grandes que deben representarse sin pérdida de precisión.",
			"Evitar errores de precisión causados por el punto flotante.",
			"Validar claves y números en criptografía y seguridad.",
			"Asegurar que montos y cálculos financieros son exactos.",
			"Validar IDs y claves numéricas que deben ser exactas.",
			"Comprobar que un número cabe en el rango seguro antes de guardarlo en una base de datos."
		],
		comoFunciona: [
			"Recibe un valor como argumento.",
			"Comprueba que su tipo sea `number` (sin conversiones).",
			"Comprueba que sea un **entero** (`Number.isInteger(valor)`).",
			"Comprueba que esté dentro del rango seguro (`Math.abs(valor) <= Number.MAX_SAFE_INTEGER`).",
			"Devuelve `true` solo si cumple las tres condiciones; en caso contrario devuelve `false`."
		],
		sintaxis: [{ code: `const esSeguro = Number.isSafeInteger(valor);` }, {
			caption: "El rango seguro se puede consultar con las constantes:",
			code: `Number.MAX_SAFE_INTEGER; // 9007199254740991  (2^53 - 1)
Number.MIN_SAFE_INTEGER; // -9007199254740991`
		}],
		nota: "**Parámetro:** `valor`, cualquier valor. **Retorno:** `true` si es un entero dentro del rango seguro; `false` si no es número, no es entero o está fuera del rango.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Enteros seguros",
				code: `Number.isSafeInteger(42);                // true
Number.isSafeInteger(-7);                // true
Number.isSafeInteger(0);                 // true
Number.isSafeInteger(9007199254740991);  // true  (2^53 - 1)
Number.isSafeInteger(-9007199254740991); // true  (-(2^53 - 1))`
			},
			{
				titulo: "Ejemplo 2: Enteros fuera del rango seguro",
				code: `Number.isSafeInteger(9007199254740992);  // false (2^53)
Number.isSafeInteger(9007199254740993);  // false (2^53 + 1)
Number.isSafeInteger(-9007199254740992); // false (-(2^53))
Number.isSafeInteger(Infinity);          // false
Number.isSafeInteger(NaN);               // false`
			},
			{
				titulo: "Ejemplo 3: Valores que no son enteros",
				code: `Number.isSafeInteger(3.14);  // false (no es entero)
Number.isSafeInteger(42.0);  // true  (42.0 === 42)
Number.isSafeInteger(42.5);  // false
Number.isSafeInteger("42");  // false (es un string)
Number.isSafeInteger(true);  // false
Number.isSafeInteger(null);  // false`
			},
			{
				titulo: "Ejemplo 4: Diferencia con Number.isInteger()",
				code: `// isInteger solo verifica que sea entero, no el rango
Number.isInteger(9007199254740992);     // true  (¡pero no es seguro!)
Number.isSafeInteger(9007199254740992); // false (fuera del rango)

Number.isSafeInteger(42);   // true
Number.isSafeInteger(42.5); // false`
			},
			{
				titulo: "Ejemplo 5: El problema de la precisión",
				code: `console.log(9007199254740992 + 1); // 9007199254740992 (¡no cambia!)
console.log(9007199254740993);     // 9007199254740992 (¡pierde precisión!)

const a = 9007199254740992;
const b = a + 1;
console.log(a === b);                     // true (¡son iguales por la imprecisión!)
console.log(Number.isSafeInteger(a));     // false (no es seguro)`
			},
			{
				titulo: "Ejemplo 6: Validar un ID",
				code: `function validarID(id) {
  if (!Number.isSafeInteger(id)) {
    return "ID inválido: debe ser un entero seguro";
  }
  if (id <= 0) {
    return "ID inválido: debe ser positivo";
  }
  return "ID válido";
}

validarID(12345);              // 'ID válido'
validarID(9007199254740992);   // 'ID inválido: debe ser un entero seguro'
validarID(3.14);               // 'ID inválido: debe ser un entero seguro'
validarID("12345");            // 'ID inválido: debe ser un entero seguro'`
			}
		],
		errores: [
			{
				texto: "**Confundirlo con `Number.isInteger()`:** `isInteger()` devuelve `true` para enteros que están fuera del rango seguro.",
				code: `Number.isInteger(9007199254740992);     // true
Number.isSafeInteger(9007199254740992); // false`
			},
			{
				texto: "**Asumir que todos los enteros son seguros:** usar números grandes sin verificar provoca pérdida de precisión y bugs difíciles de detectar.",
				code: `console.log(9007199254740993); // 9007199254740992 (¡pierde precisión!)`
			},
			{
				texto: "**No verificar el resultado de una operación:** aunque ambos operandos sean seguros, el resultado puede salir del rango.",
				code: `const resultado = 9007199254740991 + 1;
Number.isSafeInteger(resultado); // false`
			},
			{
				texto: "**Usarlo con strings esperando conversión:** devuelve `false`; convierte antes con `Number()` o `parseInt()`.",
				code: `Number.isSafeInteger("42");         // false
Number.isSafeInteger(Number("42")); // true`
			}
		],
		casos: [
			"**Validación de IDs:** verificar que un identificador numérico es un entero seguro.",
			"**Finanzas:** validar montos, precios y transacciones exactas.",
			"**Criptografía:** validar claves y números en algoritmos criptográficos.",
			"**Bases de datos:** comprobar que los números caben en el rango seguro antes de almacenarlos.",
			"**APIs:** validar que los datos recibidos son enteros seguros.",
			"**Cálculos matemáticos y gráficos:** asegurar que los resultados son exactos antes de continuar."
		],
		relacion: [
			"**`Number.isInteger()`:** verifica que sea entero, pero **no** el rango seguro.",
			"**`Number.isFinite()`:** verifica que sea un número finito (no `Infinity` ni `NaN`).",
			"**`Number.isNaN()`:** verifica si el valor es `NaN`.",
			"**`Number.MAX_SAFE_INTEGER` / `Number.MIN_SAFE_INTEGER`:** límites del rango seguro.",
			"**`parseInt()`:** convierte un string a entero, pero puede perder precisión.",
			"**`BigInt`:** tipo de dato para enteros de precisión arbitraria, más allá del rango seguro."
		],
		analogia: "`Number.isSafeInteger()` es como un control de calidad en una fábrica de relojes: no basta con que el reloj sea un reloj (entero), también debe ser preciso (dentro del rango seguro). Un reloj que se atrasa o adelanta (fuera del rango) no es aceptable, aunque sea un reloj. `Number.isInteger()` solo verifica que sea un reloj; `Number.isSafeInteger()` verifica ambas cosas.",
		fuente: "MDN Web Docs | ECMAScript 2015 Specification | IEEE 754",
		notasPersonales: [
			"**Regla para memorizar:** entero **+** dentro de `±(2^53 - 1)` **=** entero seguro.",
			"**Cuidado con las operaciones:** aunque ambos operandos sean seguros, el resultado puede no serlo. Verifícalo siempre.",
			"Para números más grandes que el rango seguro, usa `BigInt`."
		],
		quiz: Q$1([
			[
				"¿Qué rango cubre un entero seguro en JavaScript?",
				[
					"De -(2^31) a 2^31 - 1",
					"De -(2^53 - 1) a 2^53 - 1",
					"De 0 a 2^53",
					"Cualquier entero, sin límite"
				],
				1
			],
			[
				"¿Qué devuelve Number.isSafeInteger(9007199254740992)?",
				[
					"true",
					"false",
					"NaN",
					"Un error"
				],
				1
			],
			[
				"¿Qué devuelve Number.isInteger(9007199254740992)?",
				[
					"true, aunque no sea seguro",
					"false",
					"NaN",
					"Un error"
				],
				0
			],
			[
				"¿Qué devuelve Number.isSafeInteger(42.0)?",
				[
					"true, porque 42.0 === 42",
					"false, porque tiene un punto",
					"NaN",
					"Un error"
				],
				0
			],
			[
				"¿Qué devuelve Number.isSafeInteger(\"42\")?",
				[
					"true",
					"false, no coerciona",
					"42",
					"Un error"
				],
				1
			],
			[
				"¿Cuánto vale Number.MAX_SAFE_INTEGER?",
				[
					"2^32 - 1",
					"2^53 - 1",
					"2^53",
					"Infinity"
				],
				1
			],
			[
				"¿Qué tipo usarías para enteros más grandes que el rango seguro?",
				[
					"String",
					"BigInt",
					"Float",
					"Symbol"
				],
				1
			],
			[
				"¿Qué devuelve Number.isSafeInteger(Infinity)?",
				[
					"true",
					"false",
					"Infinity",
					"Un error"
				],
				1
			]
		])
	},
	isfinite: {
		id: "isfinite",
		titulo: "Number.isFinite()",
		simulador: "numero",
		definicion: ["Es un **método estático** de `Number` que determina si un valor es un **número finito**, es decir, un número que no es `Infinity`, `-Infinity` ni `NaN`.", "Devuelve `true` si el valor es un número finito y `false` en caso contrario."],
		queEs: [
			"Fue introducido en **ECMAScript 2015 (ES6)** y ofrece una forma más estricta y segura de verificar números finitos.",
			"A diferencia de la función global `isFinite()`, **no realiza conversión de tipo**: si el valor no es un número (por ejemplo, un string), devuelve `false` directamente.",
			"Es un método **estático**: se llama como `Number.isFinite(valor)`, no como `valor.isFinite()`.",
			"Características clave: no coerciona, devuelve un booleano y es más predecible que la versión global."
		],
		paraQueSirve: [
			"Validar números antes de operar con ellos.",
			"Evitar errores en cálculos matemáticos con `Infinity`, `-Infinity` o `NaN`.",
			"Validar datos de entrada provenientes de formularios o APIs.",
			"Asegurar que los resultados de operaciones matemáticas son finitos.",
			"Filtrar valores no finitos de un array o conjunto de datos."
		],
		comoFunciona: [
			"Recibe un valor de cualquier tipo.",
			"Comprueba que su tipo sea `number`, **sin convertir** strings, booleanos ni `null`.",
			"Comprueba que no sea `Infinity`, `-Infinity` ni `NaN`.",
			"Devuelve `true` si es un número finito y `false` en cualquier otro caso."
		],
		sintaxis: [{ code: `const esFinito = Number.isFinite(valor);` }, {
			caption: "Compáralo con la función global, que sí convierte:",
			code: `isFinite("42");        // true  (convierte "42" a 42)
Number.isFinite("42"); // false (no convierte)`
		}],
		nota: "**Parámetro:** `valor`, cualquier valor. **Retorno:** `true` si es un número finito; `false` si no es un número, o si es `Infinity`, `-Infinity` o `NaN`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Valores finitos",
				code: `Number.isFinite(42);    // true
Number.isFinite(3.14);  // true
Number.isFinite(-7);    // true
Number.isFinite(0);     // true
Number.isFinite(-0);    // true`
			},
			{
				titulo: "Ejemplo 2: Valores no finitos",
				code: `Number.isFinite(Infinity);  // false
Number.isFinite(-Infinity); // false
Number.isFinite(NaN);       // false`
			},
			{
				titulo: "Ejemplo 3: Valores que no son números",
				code: `Number.isFinite("42");      // false (¡no convierte el string!)
Number.isFinite("Hola");    // false
Number.isFinite(true);      // false
Number.isFinite(null);      // false
Number.isFinite(undefined); // false
Number.isFinite([]);        // false
Number.isFinite({});        // false`
			},
			{
				titulo: "Ejemplo 4: Diferencia con isFinite() global",
				code: `// isFinite() global convierte el valor a número
isFinite("42");  // true  (convierte "42" a 42)
isFinite("");    // true  (convierte "" a 0)
isFinite(null);  // true  (convierte null a 0)
isFinite(true);  // true  (convierte true a 1)

// Number.isFinite() NO convierte el valor
Number.isFinite("42"); // false
Number.isFinite("");   // false
Number.isFinite(null); // false
Number.isFinite(true); // false`
			},
			{
				titulo: "Ejemplo 5: Validación de datos",
				code: `function calcularPromedio(numeros) {
  const validos = numeros.filter((n) => Number.isFinite(n));
  if (validos.length === 0) {
    return "No hay números válidos";
  }
  const suma = validos.reduce((acc, n) => acc + n, 0);
  return suma / validos.length;
}

calcularPromedio([10, 20, "30", NaN, 40, Infinity]);
// 23.33 (solo toma 10, 20 y 40)`
			},
			{
				titulo: "Ejemplo 6: Cálculos seguros",
				code: `function dividir(a, b) {
  const resultado = a / b;
  if (!Number.isFinite(resultado)) {
    return "Error: resultado no finito";
  }
  return resultado;
}

dividir(10, 2); // 5
dividir(10, 0); // 'Error: resultado no finito' (Infinity)
dividir(0, 0);  // 'Error: resultado no finito' (NaN)`
			}
		],
		errores: [
			{
				texto: "**Confundir con `isFinite()` global:** la versión global convierte strings, `null` y booleanos, y por eso puede dar resultados inesperados.",
				code: `isFinite("42");        // true
Number.isFinite("42"); // false`
			},
			{
				texto: "**Intentar instanciarlo con `new`:** no es un constructor.",
				code: `// ❌ TypeError: Number.isFinite is not a constructor
new Number.isFinite(42);

// ✅ Correcto
Number.isFinite(42); // true`
			},
			{
				texto: "**Usarlo como método de instancia:** no existe en los números; es estático.",
				code: `// ❌ TypeError: (42).isFinite is not a function
(42).isFinite();

// ✅ Correcto
Number.isFinite(42); // true`
			},
			{
				texto: "**Asumir que `Number.isFinite(undefined)` es `true`:** `undefined` no es un número, así que devuelve `false`.",
				code: `Number.isFinite(undefined); // false`
			}
		],
		casos: [
			"**Validación de formularios:** verificar que el usuario ingresó un número válido y finito.",
			"**APIs y datos externos:** validar que los datos recibidos son números finitos.",
			"**Cálculos matemáticos:** asegurar que el resultado es finito antes de continuar.",
			"**Filtrado de arrays:** eliminar valores no finitos de un conjunto de datos.",
			"**Gráficos y visualizaciones:** asegurar que los datos a graficar son finitos.",
			"**Finanzas:** validar montos, precios y tasas."
		],
		relacion: [
			"**`isFinite()` global:** convierte el valor a número antes de evaluar.",
			"**`Number.isNaN()`:** verifica si el valor es `NaN` (sin conversión).",
			"**`Number.isInteger()`:** verifica si es un número entero (sin conversión).",
			"**`Number.isSafeInteger()`:** verifica si es un entero seguro (sin conversión).",
			"**`Number.parseFloat()`:** convierte un string a número decimal.",
			"**`typeof`:** indica el tipo de dato (`\"number\"`, `\"string\"`, etc.)."
		],
		analogia: "`Number.isFinite()` es como un portero de discoteca que solo deja entrar a personas con invitación válida. No importa si alguien dice *«soy un número»* (el string `\"42\"`) o *«tengo una invitación»* (el booleano `true`): el portero solo deja pasar a los que **realmente** son números finitos. La función global `isFinite()` es un portero más permisivo que intenta convertir a todos en invitados válidos, y puede colar impostores.",
		fuente: "MDN Web Docs | ECMAScript 2015 Specification",
		notasPersonales: [
			"Usa siempre `Number.isFinite()` en lugar de `isFinite()` cuando quieras verificar sin conversión de tipo.",
			"**Recuerda:** `Number.isFinite(NaN)` es `false`, porque `NaN` no es un número finito.",
			"Combínalo con `typeof` si primero necesitas confirmar que el valor es de tipo `'number'`."
		],
		quiz: Q$1([
			[
				"¿Qué devuelve Number.isFinite(42)?",
				[
					"true",
					"false",
					"42",
					"NaN"
				],
				0
			],
			[
				"¿Qué devuelve Number.isFinite(Infinity)?",
				[
					"true",
					"false",
					"Infinity",
					"Un error"
				],
				1
			],
			[
				"¿Qué devuelve Number.isFinite(NaN)?",
				[
					"true",
					"false",
					"NaN",
					"Un error"
				],
				1
			],
			[
				"¿Qué devuelve Number.isFinite(\"42\")?",
				[
					"true, porque parece número",
					"false, porque no convierte",
					"42",
					"Un error"
				],
				1
			],
			[
				"¿Cuál es la diferencia con isFinite() global?",
				[
					"La global convierte el valor a número antes de evaluar",
					"Son idénticas",
					"Number.isFinite convierte y la global no",
					"La global solo acepta strings"
				],
				0
			],
			[
				"¿Qué devuelve Number.isFinite(null)?",
				[
					"true",
					"false",
					"0",
					"null"
				],
				1
			],
			[
				"¿Qué devuelve isFinite(null) (función global)?",
				[
					"true, porque null se convierte en 0",
					"false",
					"null",
					"Un error"
				],
				0
			],
			[
				"¿Cómo se llama correctamente?",
				[
					"(42).isFinite()",
					"Number.isFinite(42)",
					"isFinite.Number(42)",
					"Number(42).isFinite()"
				],
				1
			]
		])
	},
	isnan: {
		id: "isnan",
		titulo: "Number.isNaN()",
		simulador: "numero",
		definicion: ["Es un **método estático** de `Number` que verifica si un valor es **exactamente `NaN`** (*Not-a-Number*), sin realizar conversiones de tipo.", "A diferencia de la función global `isNaN()`, no convierte el valor antes de comprobarlo."],
		queEs: [
			"Devuelve un valor booleano: `true` si el valor es `NaN` y `false` en cualquier otro caso.",
			"Es una forma más segura y precisa que la función global `isNaN()`.",
			"**`NaN` es el único valor de JavaScript que no es igual a sí mismo**: `NaN === NaN` devuelve `false`.",
			"Es un método estático: se llama como `Number.isNaN(valor)`."
		],
		paraQueSirve: [
			"Validar resultados de operaciones matemáticas.",
			"Comprobar conversiones hechas con `Number.parseInt()` o `Number.parseFloat()`.",
			"Evitar errores cuando se espera un número.",
			"Validar datos introducidos por el usuario."
		],
		comoFunciona: [
			"Recibe cualquier valor.",
			"Comprueba si ese valor es **exactamente** `NaN`, sin conversiones automáticas.",
			"Devuelve `true` si es `NaN` y `false` en cualquier otro caso."
		],
		sintaxis: [{ code: `const esNaN = Number.isNaN(valor);` }, {
			caption: "Compáralo con la función global, que sí convierte:",
			code: `isNaN("Hola");        // true  (intenta convertir "Hola")
Number.isNaN("Hola"); // false (no es NaN, es un string)`
		}],
		nota: "**Parámetro:** `valor`, cualquier valor. **Retorno:** `true` solo si el valor es exactamente `NaN`; `false` en cualquier otro caso.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Valor NaN",
				code: `console.log(Number.isNaN(NaN)); // true`
			},
			{
				titulo: "Ejemplo 2: Resultado de parseInt()",
				code: `const numero = Number.parseInt("Hola");
console.log(numero);              // NaN
console.log(Number.isNaN(numero)); // true`
			},
			{
				titulo: "Ejemplo 3: Número válido",
				code: `console.log(Number.isNaN(100)); // false`
			},
			{
				titulo: "Ejemplo 4: Cadena de texto",
				code: `console.log(Number.isNaN("100")); // false
// Aunque "100" parece un número, sigue siendo un string`
			},
			{
				titulo: "Ejemplo 5: Operación inválida",
				code: `const resultado = Math.sqrt(-1);
console.log(resultado);            // NaN
console.log(Number.isNaN(resultado)); // true`
			},
			{
				titulo: "Ejemplo 6: Validar una conversión",
				code: `const texto = "19.99 USD";
const precio = Number.parseFloat(texto);

if (Number.isNaN(precio)) {
  console.log("El precio no es válido");
} else {
  console.log("Precio:", precio); // Precio: 19.99
}`
			}
		],
		errores: [
			{
				texto: "**Confundir `Number.isNaN()` con `isNaN()` global:** la global primero intenta convertir el valor a número.",
				code: `isNaN("Hola");        // true  (convierte "Hola" → NaN)
Number.isNaN("Hola"); // false ("Hola" no es NaN, es un string)`
			},
			{
				texto: "**Comparar con `NaN` usando `===`:** siempre devuelve `false`, incluso `NaN === NaN`.",
				code: `console.log(NaN === NaN);   // false
console.log(Number.isNaN(NaN)); // true`
			},
			{
				texto: "**Pensar que cualquier texto devuelve `true`:** un string nunca es `NaN`; es un string.",
				code: `Number.isNaN("JavaScript"); // false`
			},
			{
				texto: "**Usarlo para validar strings numéricos:** `Number.isNaN(\"100\")` es `false` porque no es `NaN`, pero tampoco es un número. Convierte primero.",
				code: `Number.isNaN(Number("100")); // false (100 es número válido)
Number.isNaN(Number("Hola")); // true`
			}
		],
		casos: [
			"**Validar conversiones con `Number.parseInt()` y `Number.parseFloat()`:** ambos devuelven `NaN` si fallan.",
			"**Verificar operaciones matemáticas:** por ejemplo `Math.sqrt(-1)` o `0 / 0`.",
			"**Comprobar datos antes de calcular:** evitar propagar `NaN` por todo el programa.",
			"**Formularios y aplicaciones:** mostrar un error cuando el dato no se pudo convertir."
		],
		relacion: [
			"**`NaN`:** valor especial que representa un resultado numérico inválido.",
			"**`isNaN()` global:** convierte el valor antes de comprobarlo.",
			"**`Number.parseInt()` / `Number.parseFloat()`:** pueden devolver `NaN` si la conversión falla.",
			"**`Number()`:** puede producir `NaN` al convertir cadenas no numéricas.",
			"**`Number.isFinite()`:** `NaN` no es finito, así que devuelve `false`."
		],
		analogia: "Imagina que un profesor revisa exámenes. Ana obtuvo 18, Luis obtuvo 0 y Pedro entregó una hoja completamente ilegible. `Number.isNaN()` pregunta: *¿este resultado es realmente una nota inválida?* Para 18 y 0 responde `false`; para la hoja ilegible (`NaN`) responde `true`. No pregunta si «parece un número», sino si el resultado es exactamente `NaN`.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: [
			"`Number.isNaN()` solo devuelve `true` cuando el valor es exactamente `NaN`.",
			"**Nunca uses `valor === NaN`:** usa `Number.isNaN(valor)`.",
			"Es más seguro y preciso que la función global `isNaN()`."
		],
		quiz: Q$1([
			[
				"¿Qué devuelve Number.isNaN(NaN)?",
				[
					"true",
					"false",
					"NaN",
					"Un error"
				],
				0
			],
			[
				"¿Qué devuelve Number.isNaN(100)?",
				[
					"true",
					"false",
					"100",
					"NaN"
				],
				1
			],
			[
				"¿Qué devuelve Number.isNaN(\"100\")?",
				[
					"true",
					"false, porque es un string",
					"100",
					"Un error"
				],
				1
			],
			[
				"¿Qué devuelve isNaN(\"Hola\") (función global)?",
				[
					"true, porque intenta convertir",
					"false",
					"NaN",
					"Un error"
				],
				0
			],
			[
				"¿Qué devuelve Number.isNaN(\"Hola\")?",
				[
					"true",
					"false, porque no es NaN",
					"NaN",
					"Un error"
				],
				1
			],
			[
				"¿Qué devuelve NaN === NaN?",
				[
					"true",
					"false",
					"NaN",
					"Un error"
				],
				1
			],
			[
				"¿Qué devuelve Number.isNaN(Math.sqrt(-1))?",
				[
					"true",
					"false",
					"-1",
					"Un error"
				],
				0
			],
			[
				"¿Cuál es la forma correcta de comprobar si un valor es NaN?",
				[
					"valor === NaN",
					"valor !== valor está mal usado",
					"Number.isNaN(valor)",
					"typeof valor === 'NaN'"
				],
				2
			]
		])
	},
	parseint: {
		id: "parseint",
		titulo: "Number.parseInt()",
		simulador: "numero",
		definicion: ["Es un **método estático** del objeto global `Number` que convierte una cadena de texto en un **número entero**, leyendo los caracteres numéricos desde el inicio de la cadena hasta encontrar uno que no sea válido para la base especificada.", "`Number.parseInt()` y `parseInt()` realizan la misma función; `Number.parseInt()` simplemente está agrupado dentro del objeto `Number`."],
		queEs: [
			"Se utiliza para convertir texto en números enteros.",
			"**Ignora la parte decimal** de una cadena (no redondea).",
			"Puede trabajar con diferentes sistemas numéricos (decimal, hexadecimal, binario, etc.) mediante el parámetro `radix`.",
			"Devuelve un valor de tipo `number` o `NaN` si no puede realizar la conversión."
		],
		paraQueSirve: [
			"Convertir datos ingresados por el usuario.",
			"Obtener números enteros desde formularios.",
			"Procesar valores provenientes de archivos o APIs.",
			"Extraer números de cadenas de texto como `\"100px\"` o `\"50%\"`.",
			"Convertir números escritos en diferentes bases (binario, hexadecimal, octal...)."
		],
		comoFunciona: [
			"Recibe una cadena de texto y, opcionalmente, la base numérica (`radix`).",
			"Comienza a leer desde el primer carácter (ignora espacios iniciales y acepta un signo `+` o `-`).",
			"Convierte los caracteres válidos según la base indicada.",
			"Se detiene en cuanto encuentra un carácter que no es válido para esa base.",
			"Devuelve el número entero formado hasta ese punto, o `NaN` si no leyó ningún dígito."
		],
		sintaxis: [{ code: `Number.parseInt(cadena);` }, {
			caption: "Versión completa (recomendada, indicando siempre la base):",
			code: `Number.parseInt(cadena, radix);`
		}],
		nota: "**Parámetros:** `cadena` (texto a convertir) y `radix` (base numérica de 2 a 36; es recomendable especificarla siempre). **Retorno:** un `number` entero o `NaN`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Convertir un número",
				code: `console.log(Number.parseInt("150")); // 150`
			},
			{
				titulo: "Ejemplo 2: Ignorar texto al final",
				code: `console.log(Number.parseInt("25años")); // 25`
			},
			{
				titulo: "Ejemplo 3: Número decimal",
				code: `console.log(Number.parseInt("18.95")); // 18
// La parte decimal se descarta: NO redondea`
			},
			{
				titulo: "Ejemplo 4: Usando otra base",
				code: `console.log(Number.parseInt("1010", 2)); // 10
// 1010 en binario equivale a 10 en decimal`
			},
			{
				titulo: "Ejemplo 5: Hexadecimal",
				code: `console.log(Number.parseInt("FF", 16)); // 255`
			},
			{
				titulo: "Ejemplo 6: Comparación con Number()",
				code: `Number.parseInt("25px"); // 25
Number("25px");           // NaN (exige que toda la cadena sea válida)`
			}
		],
		errores: [
			{
				texto: "**No especificar el `radix`:** aunque hoy normalmente se interpreta como decimal, es buena práctica indicar la base.",
				code: `Number.parseInt("10");     // 10 (funciona, pero es ambiguo)
Number.parseInt("10", 10); // 10 (explícito y recomendado)`
			},
			{
				texto: "**Pensar que redondea:** `parseInt()` deja de leer al encontrar el punto decimal, así que **trunca**.",
				code: `Number.parseInt("9.99"); // 9
Math.round(9.99);        // 10`
			},
			{
				texto: "**La cadena no comienza con un número:** en ese caso devuelve `NaN`.",
				code: `Number.parseInt("Hola123"); // NaN
Number.parseInt("123Hola"); // 123`
			},
			{
				texto: "**Confundir `parseInt()` con `Number()`:** `Number()` exige que **toda** la cadena represente un número válido.",
				code: `Number.parseInt("25px"); // 25
Number("25px");           // NaN`
			}
		],
		casos: [
			"Convertir edades ingresadas como texto.",
			"Procesar datos de formularios HTML.",
			"Leer valores numéricos desde archivos.",
			"Extraer números de cadenas como `\"100px\"` o `\"50%\"`.",
			"Convertir números en distintas bases (binario, hexadecimal, octal...)."
		],
		relacion: [
			"**`parseInt()` global:** función equivalente a `Number.parseInt()`.",
			"**`Number.parseFloat()`:** convierte cadenas en números decimales.",
			"**`Number()`:** convierte toda la cadena en un número y falla si contiene caracteres no válidos.",
			"**`NaN`:** valor devuelto cuando la conversión no es posible.",
			"**`Number.isNaN()`:** permite verificar si el resultado es `NaN`."
		],
		analogia: "Imagina que lees una placa con el texto `\"250kg\"`. Un trabajador solo necesita saber el peso: lee ✅ `2`, ✅ `5`, ✅ `0` y, al encontrar la `k`, ❌ deja de leer. El resultado es `250`. Eso hace `Number.parseInt()`: lee números desde el inicio y se detiene cuando aparece un carácter que ya no forma parte del número.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: [
			"**Regla para memorizar:** lee desde el inicio, se detiene en el primer carácter inválido y **nunca redondea**.",
			"Indica siempre el `radix` (por ejemplo, `10` para decimal) para evitar ambigüedades.",
			"Es equivalente a `parseInt()`, pero pertenece al objeto `Number`."
		],
		quiz: Q$1([
			[
				"¿Qué devuelve Number.parseInt(\"150\")?",
				[
					"150",
					"\"150\"",
					"NaN",
					"1"
				],
				0
			],
			[
				"¿Qué devuelve Number.parseInt(\"25años\")?",
				[
					"NaN",
					"25",
					"250",
					"\"25\""
				],
				1
			],
			[
				"¿Qué devuelve Number.parseInt(\"18.95\")?",
				[
					"19",
					"18.95",
					"18",
					"NaN"
				],
				2
			],
			[
				"¿Qué devuelve Number.parseInt(\"1010\", 2)?",
				[
					"1010",
					"10",
					"20",
					"NaN"
				],
				1
			],
			[
				"¿Qué devuelve Number.parseInt(\"FF\", 16)?",
				[
					"255",
					"FF",
					"15",
					"NaN"
				],
				0
			],
			[
				"¿Qué devuelve Number.parseInt(\"Hola123\")?",
				[
					"123",
					"0",
					"NaN",
					"Un error"
				],
				2
			],
			[
				"¿parseInt() redondea los decimales?",
				[
					"Sí, al más cercano",
					"No, los descarta (trunca)",
					"Solo si son .5",
					"Lanza un error"
				],
				1
			],
			[
				"¿Qué diferencia hay entre Number.parseInt(\"25px\") y Number(\"25px\")?",
				[
					"parseInt devuelve 25 y Number devuelve NaN",
					"Ambos devuelven 25",
					"Ambos devuelven NaN",
					"parseInt devuelve NaN y Number devuelve 25"
				],
				0
			]
		])
	},
	parsefloat: {
		id: "parsefloat",
		titulo: "Number.parseFloat()",
		simulador: "numero",
		definicion: ["Es un **método estático** del objeto global `Number` que convierte una cadena de texto en un **número decimal** (de punto flotante), leyendo los caracteres numéricos desde el inicio de la cadena hasta encontrar uno que no sea válido.", "`Number.parseFloat()` y `parseFloat()` realizan la misma función; `Number.parseFloat()` simplemente está organizado dentro del objeto `Number`."],
		queEs: [
			"Se utiliza para convertir texto en números decimales.",
			"Puede interpretar números con parte entera y parte decimal.",
			"Admite **notación científica** (`1.5e2`) y espacios iniciales.",
			"Devuelve un valor de tipo `number` o `NaN` si la conversión no es posible.",
			"Usa el **punto** (`.`) como separador decimal, no la coma."
		],
		paraQueSirve: [
			"Convertir datos ingresados por el usuario.",
			"Leer precios, pesos, temperaturas o cualquier valor decimal.",
			"Procesar datos provenientes de formularios, archivos o APIs.",
			"Extraer números decimales de cadenas de texto."
		],
		comoFunciona: [
			"Recibe una cadena de texto.",
			"Comienza a leer desde el primer carácter (ignora los espacios iniciales).",
			"Convierte los caracteres válidos en un número decimal (signo, dígitos, punto y exponente).",
			"Se detiene cuando encuentra un carácter que no forma parte del número.",
			"Devuelve el número decimal o `NaN` si no leyó ningún dígito."
		],
		sintaxis: [{ code: `Number.parseFloat(cadena);` }, {
			caption: "Ejemplo de lectura parcial:",
			code: `Number.parseFloat("19.99USD"); // 19.99`
		}],
		nota: "**Parámetro:** `cadena`, el texto que se convertirá en número decimal. **Retorno:** un `number` si la conversión es válida; `NaN` si la cadena no comienza con un número.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Convertir un número decimal",
				code: `console.log(Number.parseFloat("15.75")); // 15.75`
			},
			{
				titulo: "Ejemplo 2: Ignorar texto al final",
				code: `console.log(Number.parseFloat("99.99 dólares")); // 99.99`
			},
			{
				titulo: "Ejemplo 3: Convertir un número entero",
				code: `console.log(Number.parseFloat("100")); // 100
// Aunque no tenga decimales, devuelve un valor de tipo number`
			},
			{
				titulo: "Ejemplo 4: Notación científica",
				code: `console.log(Number.parseFloat("2.5e3")); // 2500
// 2.5e3 significa 2.5 × 10³`
			},
			{
				titulo: "Ejemplo 5: Espacios al inicio",
				code: `console.log(Number.parseFloat("   45.8")); // 45.8
// Los espacios iniciales son ignorados`
			},
			{
				titulo: "Ejemplo 6: Comparación con Number()",
				code: `Number.parseFloat("15.5kg"); // 15.5
Number("15.5kg");            // NaN (exige una cadena completa válida)`
			}
		],
		errores: [
			{
				texto: "**Pensar que convierte cualquier texto:** la cadena debe **comenzar** con un número.",
				code: `Number.parseFloat("Hola25"); // NaN
Number.parseFloat("25Hola"); // 25`
			},
			{
				texto: "**Usar coma en lugar de punto:** JavaScript usa el punto como separador decimal, así que la coma corta la lectura.",
				code: `Number.parseFloat("10,5"); // 10
Number.parseFloat("10.5"); // 10.5`
			},
			{
				texto: "**Confundir `parseFloat()` con `Number()`:** `Number()` requiere que toda la cadena represente un número válido.",
				code: `Number.parseFloat("15.5kg"); // 15.5
Number("15.5kg");            // NaN`
			},
			{
				texto: "**Esperar un entero:** `parseFloat()` conserva los decimales. Para enteros usa `Number.parseInt()`.",
				code: `Number.parseFloat("8.9");  // 8.9
Number.parseInt("8.9");    // 8`
			}
		],
		casos: [
			"Leer precios como `\"29.99\"`.",
			"Procesar porcentajes como `\"15.5%\"`.",
			"Leer temperaturas como `\"36.7°C\"`.",
			"Convertir datos de formularios.",
			"Procesar respuestas de APIs que contienen números decimales."
		],
		relacion: [
			"**`parseFloat()` global:** función equivalente a `Number.parseFloat()`.",
			"**`Number.parseInt()`:** convierte cadenas en números enteros.",
			"**`Number()`:** convierte toda la cadena en un número y falla si contiene caracteres no válidos.",
			"**`NaN`:** valor devuelto cuando la conversión no es posible.",
			"**`Number.isNaN()`:** permite comprobar si el resultado es `NaN`.",
			"**Notación científica:** `Number.parseFloat()` puede interpretar valores como `1.2e5`."
		],
		analogia: "Imagina que lees una etiqueta con el texto `\"24.75 kg\"`. Una báscula solo necesita conocer el peso, así que lee ✅ `2`, ✅ `4`, ✅ `.`, ✅ `7`, ✅ `5` y, al encontrar un espacio o la letra `k`, ❌ deja de leer. El resultado es `24.75`. Eso hace `Number.parseFloat()`: lee un número decimal desde el inicio y se detiene cuando encuentra un carácter que ya no forma parte del número.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: [
			"`Number.parseFloat()` convierte texto en números decimales y devuelve `number` o `NaN`.",
			"Lee desde el inicio y se detiene al encontrar un carácter no válido.",
			"Usa el punto (`.`) como separador decimal, **no** la coma.",
			"Es equivalente a `parseFloat()`, pero pertenece al objeto `Number`."
		],
		quiz: Q$1([
			[
				"¿Qué devuelve Number.parseFloat(\"15.75\")?",
				[
					"15.75",
					"\"15.75\"",
					"15",
					"NaN"
				],
				0
			],
			[
				"¿Qué devuelve Number.parseFloat(\"99.99 dólares\")?",
				[
					"NaN",
					"99.99",
					"99",
					"Un error"
				],
				1
			],
			[
				"¿Qué devuelve Number.parseFloat(\"2.5e3\")?",
				[
					"2.5",
					"2500",
					"2.53",
					"NaN"
				],
				1
			],
			[
				"¿Qué devuelve Number.parseFloat(\"Hola25\")?",
				[
					"25",
					"0",
					"NaN",
					"Un error"
				],
				2
			],
			[
				"¿Qué devuelve Number.parseFloat(\"10,5\")?",
				[
					"10.5",
					"10",
					"NaN",
					"Un error"
				],
				1
			],
			[
				"¿Qué devuelve Number.parseFloat(\"   45.8\")?",
				[
					"NaN",
					"45.8",
					"\"45.8\"",
					"Un error"
				],
				1
			],
			[
				"¿Qué diferencia hay entre parseFloat(\"15.5kg\") y Number(\"15.5kg\")?",
				[
					"parseFloat devuelve 15.5 y Number devuelve NaN",
					"Ambos devuelven 15.5",
					"Ambos devuelven NaN",
					"parseFloat devuelve NaN y Number devuelve 15.5"
				],
				0
			],
			[
				"¿Qué método usarías para obtener un entero de \"8.9\"?",
				[
					"Number.parseFloat()",
					"Number.parseInt()",
					"Number()",
					"String()"
				],
				1
			]
		])
	},
	tofixed: {
		id: "tofixed",
		titulo: "Number.prototype.toFixed()",
		simulador: "numero",
		definicion: ["Es un **método de `Number.prototype`** que convierte un número en una **cadena de texto** (`string`) con una cantidad fija de decimales.", "Utiliza **redondeo** para ajustar el número a la cantidad de decimales indicada."],
		queEs: [
			"Es un método heredado de `Number.prototype`: se llama sobre una instancia numérica.",
			"Forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
			"Se utiliza principalmente para **formatear números**.",
			"Aunque el resultado *parezca* un número, es un **string**: `(19.9).toFixed(2)` devuelve `\"19.90\"`."
		],
		paraQueSirve: [
			"Mostrar precios con dos decimales.",
			"Formatear resultados matemáticos.",
			"Crear reportes numéricos.",
			"Mostrar porcentajes o medidas con precisión fija.",
			"Mejorar la presentación de datos."
		],
		comoFunciona: [
			"Se llama `toFixed()` sobre un número.",
			"Se indica cuántos decimales se desean mostrar (de `0` a `100`).",
			"JavaScript redondea el número a esa cantidad de decimales.",
			"Devuelve una **cadena** con esa cantidad exacta de decimales (rellena con ceros si hace falta)."
		],
		sintaxis: [{ code: `numero.toFixed(digitos);` }, {
			caption: "Recuerda que el resultado es texto, no un número:",
			code: `const texto = (5.678).toFixed(2);
console.log(texto);        // "5.68"
console.log(typeof texto); // "string"`
		}],
		nota: "**Parámetro:** `digitos`, cantidad de decimales entre `0` y `100`. **Retorno:** un `string` con esa cantidad exacta de decimales.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Mostrar dos decimales",
				code: `const precio = 25;
console.log(precio.toFixed(2)); // "25.00"`
			},
			{
				titulo: "Ejemplo 2: Redondear decimales",
				code: `const numero = 3.14159;
console.log(numero.toFixed(3)); // "3.142"`
			},
			{
				titulo: "Ejemplo 3: Sin decimales",
				code: `const numero = 9.99;
console.log(numero.toFixed(0)); // "10"`
			},
			{
				titulo: "Ejemplo 4: El resultado es un string",
				code: `const resultado = (12.5).toFixed(2);
console.log(resultado);        // "12.50"
console.log(typeof resultado); // "string"`
			},
			{
				titulo: "Ejemplo 5: Volver a convertirlo en número",
				code: `const numero = Number((12.5).toFixed(2));
console.log(numero);        // 12.5
console.log(typeof numero); // "number"`
			},
			{
				titulo: "Ejemplo 6: Caso práctico con precios",
				code: "const precio = 19.995;\nconsole.log(`Total: S/${precio.toFixed(2)}`);\n// Total: S/20.00"
			},
			{
				titulo: "Ejemplo 7: Porcentajes",
				code: `const porcentaje = 0.87654;
console.log((porcentaje * 100).toFixed(2) + "%"); // "87.65%"`
			}
		],
		errores: [
			{
				texto: "**Pensar que devuelve un número:** devuelve un string. Si lo sumas, JavaScript concatena.",
				code: `const resultado = (10.5).toFixed(2); // "10.50"
console.log(resultado + 5);          // "10.505"

// ✅ Convierte antes de operar:
console.log(Number(resultado) + 5);  // 15.5`
			},
			{
				texto: "**Usarlo sobre un string:** los strings no tienen `toFixed()`.",
				code: `const precio = "20.5";

// ❌ TypeError: precio.toFixed is not a function
precio.toFixed(2);

// ✅ Convierte primero
Number(precio).toFixed(2); // "20.50"`
			},
			{
				texto: "**Pensar que cambia el número original:** `toFixed()` devuelve una cadena nueva y no modifica el valor.",
				code: `let numero = 12.345;
numero.toFixed(2);
console.log(numero); // 12.345`
			},
			{
				texto: "**Usar demasiados decimales:** el parámetro debe estar entre `0` y `100`; fuera de ese rango lanza `RangeError`.",
				code: `(10).toFixed(200); // ❌ RangeError
(10).toFixed(100); // ✅ (valor límite)`
			}
		],
		casos: [
			"💰 **Sistemas financieros y precios:** mostrar siempre dos decimales.",
			"📊 **Reportes estadísticos:** presentar promedios y resultados con precisión fija.",
			"📈 **Mostrar porcentajes:** `(valor * 100).toFixed(2) + \"%\"`.",
			"🧮 **Resultados de cálculos matemáticos:** evitar cadenas largas de decimales.",
			"🌡️ **Mediciones con precisión fija:** temperaturas, distancias, etc."
		],
		relacion: [
			"**`Number.prototype.toString()`:** convierte números a texto, pero no controla los decimales.",
			"**`Intl.NumberFormat`:** formateo avanzado de números según idioma y moneda.",
			"**`Number.parseFloat()`:** convierte strings a números (operación inversa).",
			"**`Number()`:** conversión explícita de tipos.",
			"**Punto flotante IEEE 754:** JavaScript puede presentar pequeñas imprecisiones en operaciones decimales."
		],
		analogia: "Imagina que tienes `S/ 25.5` y un cajero necesita mostrar siempre dos decimales: `S/ 25.50`. `toFixed(2)` es como decir: *«muestra siempre dos espacios después del punto decimal»*. Así, `5` → `5.00`, `5.6` → `5.60` y `5.678` → `5.68`.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: [
			"**Regla para memorizar:** `toFixed(n)` = *texto con exactamente `n` decimales*. No cambia el número y no devuelve un número.",
			"Si necesitas operar después, envuelve el resultado con `Number()`.",
			"Para dinero en producción, valora `Intl.NumberFormat` (maneja moneda, separadores e idioma)."
		],
		quiz: Q$1([
			[
				"¿Qué devuelve (25).toFixed(2)?",
				[
					"\"25.00\"",
					"25",
					"25.00 (número)",
					"\"25\""
				],
				0
			],
			[
				"¿Qué tipo devuelve toFixed()?",
				[
					"number",
					"string",
					"boolean",
					"object"
				],
				1
			],
			[
				"¿Qué devuelve (3.14159).toFixed(3)?",
				[
					"\"3.141\"",
					"\"3.142\"",
					"3.142",
					"\"3.14\""
				],
				1
			],
			[
				"¿Qué devuelve (9.99).toFixed(0)?",
				[
					"\"9\"",
					"\"10\"",
					"10",
					"\"9.99\""
				],
				1
			],
			[
				"¿toFixed() modifica el número original?",
				[
					"Sí",
					"No, devuelve un string nuevo",
					"Solo si es decimal",
					"Solo en modo estricto"
				],
				1
			],
			[
				"¿Qué ocurre con \"20.5\".toFixed(2)?",
				[
					"Devuelve \"20.50\"",
					"TypeError",
					"Devuelve 20.5",
					"RangeError"
				],
				1
			],
			[
				"¿Qué rango válido tiene el parámetro digitos?",
				[
					"0 a 20",
					"0 a 100",
					"1 a 50",
					"Cualquier entero"
				],
				1
			],
			[
				"¿Cómo vuelves a convertir el resultado de toFixed() en número?",
				[
					"String(resultado)",
					"Number(resultado)",
					"resultado * 1.0 sin conversión",
					"JSON.parse(resultado)"
				],
				1
			]
		])
	}
};
var METODOS_DOCS = {
	findindex: {
		id: "findindex",
		titulo: "Array.prototype.findIndex()",
		simulador: true,
		definicion: ["Es un método iterativo integrado en JavaScript que se utiliza para buscar la posición de un elemento dentro de un array.", "Devuelve el **índice numérico** del primer elemento que cumpla con una condición determinada por una función."],
		queEs: ["Es un método de orden superior (Higher-Order Function) hermano de `find()`.", "En lugar de extraer o devolver el objeto o valor encontrado, devuelve su posición en la lista (basada en índice cero: `0, 1, 2...`)."],
		paraQueSirve: ["Sirve para saber exactamente **dónde** está ubicado un elemento dentro de un array.", "Es fundamental cuando necesitas la posición para realizar operaciones posteriores, como eliminar ese elemento específico con `splice()` o actualizar su contenido en un estado (muy común en React)."],
		comoFunciona: [
			"Recorre el array desde el índice `0` hasta el final.",
			"Evalúa cada elemento con la función de prueba (callback).",
			"**Cortocircuito:** En cuanto encuentra el primer elemento que devuelve `true`, se detiene inmediatamente y devuelve el número de su índice.",
			"Si recorre todo el array y ningún elemento cumple la condición, devuelve `-1`."
		],
		sintaxis: [{ code: `const indiceEncontrado = array.findIndex((elemento, indice, array) => {
  // Condición que debe devolver true o false
  return condicion;
});` }, {
			caption: "Forma corta (la más común):",
			code: `const index = array.findIndex(elemento => elemento.id === idBuscado);`
		}],
		ejemplos: [{
			titulo: "Ejemplo 1: Buscar el índice de un objeto (Caso típico para modificar/eliminar)",
			code: `const carrito = [
  { id: 101, producto: "Laptop", cantidad: 1 },
  { id: 102, producto: "Mouse", cantidad: 2 },
  { id: 103, producto: "Teclado", cantidad: 1 }
];

const indiceMouse = carrito.findIndex(item => item.id === 102);
console.log(indiceMouse); // Resultado: 1 (porque está en la segunda posición)`
		}, {
			titulo: "Ejemplo 2: Cuando no encuentra el elemento",
			code: `const edades = [15, 17, 14, 16];
const indiceAdulto = edades.findIndex(edad => edad >= 18);

console.log(indiceAdulto); // Resultado: -1 (nadie es mayor de edad)`
		}],
		errores: [
			"**Olvidar que devuelve `-1` si falla:** Si no encuentra nada, devuelve `-1`. Si usas ese `-1` directamente en un método como `splice(index, 1)` sin validar, podrías terminar eliminando el *último* elemento del array por error.",
			"**Confundirlo con `indexOf()`:** `indexOf()` sirve para buscar elementos simples (como un array de strings o números: `[\"a\", \"b\"].indexOf(\"b\")`). No acepta una función callback, por lo que **no sirve** para buscar dentro de un array de objetos complejos.",
			"**Esperar un valor booleano (`true`/`false`):** Recuerda que siempre devuelve un número (`0`, `1`, `2`... o `-1`). El número `0` es evaluado como *falsy* en JavaScript, lo que puede causar bugs si lo pones directo en un `if`."
		],
		casos: ["**Eliminar elementos (Delete):** Encontrar la posición de un comentario o una foto por su ID para poder borrarlo del array usando `array.splice(indice, 1)`.", "**Actualizar elementos (Update):** Encontrar la posición de un elemento para modificar una de sus propiedades directamente (ej. incrementar la cantidad de un producto en un carrito de compras)."],
		relacion: [
			"**`find()`:** Funciona igual, pero te devuelve el *elemento completo* (el objeto), no su posición.",
			"**`indexOf()`:** Busca un valor plano directamente, pero no recibe funciones/condiciones lógicas.",
			"**`splice()`:** Es el método mutador que casi siempre se usa junto a `findIndex` para eliminar o reemplazar un ítem en una posición específica."
		],
		analogia: "Imagina que estás en la fila del cine y buscas a tu amigo que lleva una gorra roja. Vas contando desde el primer lugar de la fila: \"1, 2, 3... ¡Ahí está!\". No te importa qué ropa lleva o su nombre en ese momento, lo que le dices al grupo es: **\"Está en el cuarto lugar de la fila\"**. Ese número de posición es el `findIndex()`.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve findIndex() si ningún elemento cumple la condición?",
				opciones: [
					"undefined",
					"null",
					"-1",
					"0"
				],
				correcta: 2
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve findIndex() cuando encuentra una coincidencia?",
				opciones: [
					"El elemento completo",
					"El índice numérico del primer elemento que cumple",
					"Un array con todos los índices",
					"true"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Cuál es la diferencia principal entre find() y findIndex()?",
				opciones: [
					"findIndex() devuelve la posición y find() devuelve el elemento",
					"No hay diferencia",
					"find() devuelve la posición",
					"findIndex() solo funciona con números"
				],
				correcta: 0
			},
			{
				id: 4,
				pregunta: "Si tengo [5, 12, 8, 130, 44] y uso findIndex(n => n > 10), ¿qué devuelve?",
				opciones: [
					"1",
					"12",
					"3",
					"2"
				],
				correcta: 0
			},
			{
				id: 5,
				pregunta: "¿Qué riesgo hay al usar el -1 directamente en splice(index, 1)?",
				opciones: [
					"No pasa nada",
					"Se elimina el último elemento del array",
					"Se lanza un error",
					"Se elimina el primer elemento"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Por qué un if (array.findIndex(...)) puede causar bugs?",
				opciones: [
					"Porque devuelve strings",
					"Porque el índice 0 es falsy",
					"Porque devuelve un booleano",
					"Porque no acepta callbacks"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Puede findIndex() modificar el array original?",
				opciones: [
					"Sí, siempre",
					"Solo con objetos",
					"No, solo lo lee",
					"Depende del callback"
				],
				correcta: 2
			},
			{
				id: 8,
				pregunta: "¿Qué método se usa normalmente junto a findIndex() para eliminar un elemento?",
				opciones: [
					"splice()",
					"concat()",
					"join()",
					"fill()"
				],
				correcta: 0
			}
		]
	},
	findlast: {
		id: "findlast",
		titulo: "Array.prototype.findLast()",
		simulador: true,
		definicion: ["Es un método iterativo integrado en JavaScript que se utiliza para buscar un elemento dentro de un array.", "Devuelve el **último elemento** que cumpla con una condición determinada por una función, recorriendo el array en orden inverso."],
		queEs: ["Es una incorporación moderna de JavaScript (ES2023).", "Funciona exactamente igual que `find()`, con la gran diferencia de que inicia la búsqueda desde el final del array hacia el principio (de derecha a izquierda)."],
		paraQueSirve: ["Sirve para localizar de forma eficiente la **última coincidencia** o el registro más reciente en una lista cronológica o en un historial, evitando tener que voltear el array original (lo cual consume rendimiento y memoria)."],
		comoFunciona: [
			"Recorre el array en orden inverso, empezando desde el último índice (`array.length - 1`) hacia el `0`.",
			"Evalúa cada elemento con la función de prueba (callback).",
			"**Cortocircuito:** En el momento exacto en que la función devuelve `true`, `findLast()` se detiene, ignora el resto del array y devuelve ese elemento.",
			"Si recorre todo el array de atrás hacia adelante y nadie cumple la condición, devuelve `undefined`."
		],
		sintaxis: [{ code: `const ultimoEncontrado = array.findLast((elemento, indice, array) => {
  // Condición que debe devolver true o false
  return condicion;
});` }, {
			caption: "Forma corta:",
			code: `const ultimo = array.findLast(elemento => elemento.propiedad === valorBuscado);`
		}],
		ejemplos: [{
			titulo: "Ejemplo 1: Buscar la última transacción (el elemento más reciente)",
			code: `const transacciones = [
  { id: 1, tipo: "deposito", monto: 100 },
  { id: 2, tipo: "retiro", monto: 50 },
  { id: 3, tipo: "deposito", monto: 200 },
  { id: 4, tipo: "retiro", monto: 20 }
];

// Queremos saber el último depósito realizado
const ultimoDeposito = transacciones.findLast(t => t.tipo === "deposito");
console.log(ultimoDeposito); // Resultado: { id: 3, tipo: "deposito", monto: 200 }`
		}, {
			titulo: "Ejemplo 2: Cuando no encuentra nada",
			code: `const precios = [10, 20, 30];
const caro = precios.findLast(p => p > 50);

console.log(caro); // Resultado: undefined`
		}],
		errores: [
			"**Compatibilidad en entornos antiguos:** Al ser un método relativamente reciente, si trabajas en proyectos con versiones muy viejas de Node.js o navegadores antiguos sin transpilador (como Babel), podría dar error. Asegúrate de tener el entorno actualizado.",
			"**Manejo de `undefined`:** Al igual que `find()`, si no hay coincidencias devuelve `undefined`. Siempre debes validar el resultado antes de intentar leer sus propiedades.",
			"**Pensar que altera el array:** No modifica el orden ni los elementos del array original; solo cambia la dirección en la que se realiza la lectura."
		],
		casos: ["**Sistemas de Logs o Historiales:** Buscar la última acción que realizó un usuario en una sesión actual (por ejemplo, el último comentario editado o la última foto modificada).", "**Colas de prioridad:** Encontrar el último elemento de una lista que cumpla con cierto criterio de estado."],
		relacion: [
			"**`find()`:** Hace lo mismo, pero empieza a buscar desde el principio (índice 0).",
			"**`findLastIndex()`:** Funciona idéntico a `findLast()`, pero en lugar de devolver el elemento, devuelve su **índice numérico** (buscando de atrás hacia adelante).",
			"**`reverse().find()`:** Era la alternativa antigua para lograr esto, pero tenía el grave problema de que `reverse()` mutaba (modificaba) el array original, o requería crear una copia innecesaria (`[...array].reverse().find()`)."
		],
		analogia: "Imagina que estás revisando una pila de facturas impresas donde las más nuevas se colocan siempre arriba (al final de la pila). Si quieres buscar el último pago que le hiciste a un proveedor específico, no empiezas desde la factura del fondo de la caja; vas directamente a la parte superior de la pila y revisas hacia abajo hasta encontrar la primera que coincida. Eso es `findLast()`.",
		fuente: "MDN Web Docs | ECMAScript 2023 Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Desde dónde empieza a recorrer el array findLast()?",
				opciones: [
					"Desde el índice 0",
					"Desde el último elemento hacia el principio",
					"Desde el elemento del medio",
					"De forma aleatoria"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve findLast() si ningún elemento cumple la condición?",
				opciones: [
					"-1",
					"null",
					"undefined",
					"Un array vacío"
				],
				correcta: 2
			},
			{
				id: 3,
				pregunta: "¿En qué versión de ECMAScript se incorporó findLast()?",
				opciones: [
					"ES5",
					"ES2015",
					"ES2023",
					"ES2010"
				],
				correcta: 2
			},
			{
				id: 4,
				pregunta: "Si tengo [1, 2, 3, 4, 5, 6] y uso findLast(n => n % 2 === 0), ¿qué devuelve?",
				opciones: [
					"2",
					"6",
					"4",
					"undefined"
				],
				correcta: 1
			},
			{
				id: 5,
				pregunta: "¿Qué ventaja tiene frente a reverse().find()?",
				opciones: [
					"Es más corto de escribir",
					"No muta el array original ni crea copias",
					"Devuelve índices",
					"Funciona en navegadores antiguos"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Cuál es la diferencia entre findLast() y findLastIndex()?",
				opciones: [
					"findLast() devuelve el elemento y findLastIndex() su índice",
					"Son idénticos",
					"findLast() devuelve un booleano",
					"findLastIndex() busca desde el principio"
				],
				correcta: 0
			},
			{
				id: 7,
				pregunta: "¿Qué pasa cuando findLast() encuentra una coincidencia?",
				opciones: [
					"Sigue buscando hacia el inicio",
					"Se detiene (cortocircuito) y devuelve ese elemento",
					"Lanza un error",
					"Devuelve todos los elementos encontrados"
				],
				correcta: 1
			},
			{
				id: 8,
				pregunta: "¿Cuál es un caso de uso ideal para findLast()?",
				opciones: [
					"Ordenar un array",
					"Encontrar el registro más reciente en un historial",
					"Unir strings",
					"Contar elementos"
				],
				correcta: 1
			}
		]
	},
	findlastindex: {
		id: "findlastindex",
		titulo: "Array.prototype.findLastIndex()",
		simulador: true,
		definicion: ["Es un método iterativo integrado en JavaScript que se utiliza para buscar la posición de un elemento dentro de un array.", "Devuelve el **índice numérico** del último elemento que cumpla con una condición determinada por una función, recorriendo el array de atrás hacia adelante."],
		queEs: ["Es un método moderno (incorporado en ES2023) y es el hermano directo de `findIndex()`.", "La única diferencia es que inicia la inspección de los elementos desde el final del array hacia el principio (de derecha a izquierda)."],
		paraQueSirve: ["Sirve para localizar la **posición exacta de la última coincidencia** en una lista.", "Es extremadamente útil cuando necesitas ese índice para modificar, reemplazar o eliminar el registro más reciente en un historial o en una lista cronológica."],
		comoFunciona: [
			"Recorre el array en orden inverso, empezando desde el último índice (`array.length - 1`) y bajando hacia el `0`.",
			"Evalúa cada elemento con la función callback.",
			"**Cortocircuito:** En cuanto encuentra el primer elemento (empezando por detrás) que devuelve `true`, se detiene de inmediato y devuelve su número de índice original.",
			"Si recorre todo el array y nadie cumple la condición, devuelve `-1`."
		],
		sintaxis: [{ code: `const ultimoIndiceEncontrado = array.findLastIndex((elemento, indice, array) => {
  // Condición que debe devolver true o false
  return condicion;
});` }, {
			caption: "Forma corta:",
			code: `const lastIndex = array.findLastIndex(elemento => elemento.estado === "pendiente");`
		}],
		ejemplos: [{
			titulo: "Ejemplo 1: Buscar la posición del último comentario de un usuario",
			code: `const comentarios = [
  { id: 1, usuario: "Josue", texto: "Hola" },
  { id: 2, usuario: "Ana", texto: "Buen post" },
  { id: 3, usuario: "Josue", texto: "Me sirvió mucho" },
  { id: 4, usuario: "Carlos", texto: "Gracias" }
];

// Buscamos el índice del ÚLTIMO comentario que dejó "Josue"
const ultimoIndexJosue = comentarios.findLastIndex(c => c.usuario === "Josue");
console.log(ultimoIndexJosue); // Resultado: 2 (el comentario con ID 3)`
		}, {
			titulo: "Ejemplo 2: Cuando no hay coincidencia",
			code: `const notas = [11, 14, 12];
const desaprobadoIndex = notas.findLastIndex(n => n < 10);

console.log(desaprobadoIndex); // Resultado: -1`
		}],
		errores: [
			"**Confundir el índice devuelto:** Aunque el método busca de atrás hacia adelante, el índice que devuelve es el **índice real y absoluto del array** (contando desde 0 de izquierda a derecha). No devuelve una posición \"invertida\".",
			"**No validar el `-1`:** Al igual que `findIndex()`, si no encuentra nada devuelve `-1`. Si pasas ese `-1` directamente a métodos como `splice()`, puedes causar comportamientos inesperados en tus estados o datos.",
			"**Soporte del entorno:** Al ser de ES2023, requiere entornos de Node.js actualizados o configuraciones de empaquetadores modernos si se despliega en navegadores antiguos."
		],
		casos: ["**Deshacer acciones (Undo):** Encontrar el índice de la última modificación en un array de historial para poder revertirla o eliminarla.", "**Actualización cronológica:** Localizar el último elemento del carrito que coincide con un producto duplicado para modificar su cantidad o aplicar un descuento específico al más reciente."],
		relacion: [
			"**`findIndex()`:** Hace lo mismo, pero empieza a buscar desde el principio (índice 0).",
			"**`findLast()`:** Devuelve el *objeto o valor completo* en lugar de su número de posición.",
			"**`lastIndexOf()`:** Busca un valor plano (como un string o número) desde el final, pero no acepta funciones de condición complejas."
		],
		analogia: "Imagina que estás revisando el registro de asistencia de una empresa, donde cada día se anota la hora de entrada de los empleados en hojas consecutivas. Si quieres saber **en qué hoja** se registró por última vez un empleado esta semana, vas a la última página del archivador y vas hojeando hacia atrás hasta ver su nombre. El número de la página que encontraste es el `findLastIndex()`.",
		fuente: "MDN Web Docs | ECMAScript 2023 Specification",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué devuelve findLastIndex() si ningún elemento cumple la condición?",
				opciones: [
					"undefined",
					"0",
					"-1",
					"null"
				],
				correcta: 2
			},
			{
				id: 2,
				pregunta: "El índice que devuelve findLastIndex() es...",
				opciones: [
					"Invertido, contado desde el final",
					"El índice absoluto original, contado desde 0 de izquierda a derecha",
					"Siempre array.length",
					"El elemento encontrado"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "Si tengo [10, 20, 30, 20, 40] y uso findLastIndex(n => n === 20), ¿qué devuelve?",
				opciones: [
					"1",
					"3",
					"4",
					"2"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿De qué método es hermano directo findLastIndex()?",
				opciones: [
					"findIndex()",
					"push()",
					"map()",
					"slice()"
				],
				correcta: 0
			},
			{
				id: 5,
				pregunta: "¿En qué dirección recorre el array findLastIndex()?",
				opciones: [
					"De izquierda a derecha",
					"De derecha a izquierda",
					"Desde el centro",
					"De forma aleatoria"
				],
				correcta: 1
			},
			{
				id: 6,
				pregunta: "¿Qué método devuelve el elemento completo en lugar del índice, buscando desde el final?",
				opciones: [
					"findLast()",
					"indexOf()",
					"findLastIndex()",
					"lastIndexOf()"
				],
				correcta: 0
			},
			{
				id: 7,
				pregunta: "¿Qué riesgo hay al pasar un -1 directamente a splice()?",
				opciones: [
					"Puede eliminar el último elemento",
					"Elimina el primer elemento",
					"Duplica el array",
					"No pasa nada"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "¿Cuál es un caso de uso típico de findLastIndex()?",
				opciones: [
					"Deshacer (Undo) la última modificación en un historial",
					"Ordenar un array",
					"Concatenar arrays",
					"Clonar un objeto"
				],
				correcta: 0
			}
		]
	},
	indexof: {
		id: "indexof",
		titulo: "Array.prototype.indexOf()",
		simulador: true,
		definicion: ["Es un método integrado en JavaScript que busca un **valor específico** dentro de un array (o un string) y devuelve el **primer índice numérico** donde se encuentra dicho valor."],
		queEs: ["A diferencia de métodos como `findIndex()`, `indexOf()` es un método de búsqueda **estricta y directa**.", "No recibe una función callback; en su lugar, se le pasa directamente el valor exacto que se desea localizar y realiza una comparación estricta (`===`)."],
		paraQueSirve: ["Sirve para localizar de forma rápida y sencilla la posición de elementos primitivos (como números, strings o booleanos) dentro de una lista plana.", "También se utiliza comúnmente para verificar de forma rápida si un elemento existe en un array."],
		comoFunciona: [
			"Recorre la estructura de izquierda a derecha (desde el índice `0`).",
			"Compara cada elemento usando el operador de igualdad estricta (`===`) con el valor proporcionado.",
			"**Cortocircuito:** En cuanto encuentra la primera coincidencia exacta, detiene la búsqueda y devuelve el índice.",
			"Si recorre todo el array sin encontrar una coincidencia estricta, devuelve `-1`."
		],
		sintaxis: [{ code: `// Sintaxis básica
const indice = array.indexOf(elementoBuscado);

// Sintaxis con índice de inicio (opcional)
const indiceDesdePosicion = array.indexOf(elementoBuscado, desdeElIndice);` }],
		ejemplos: [
			{
				titulo: "Ejemplo 1: Buscar en un array de strings (valores planos)",
				code: `const herramientas = ["React", "Notion", "Vite", "Notion"];

const primerNotion = herramientas.indexOf("Notion");
console.log(primerNotion); // Resultado: 1 (ignora el segundo "Notion" en la posición 3)`
			},
			{
				titulo: "Ejemplo 2: Usando el segundo parámetro (desde dónde buscar)",
				code: `const frutas = ["manzana", "plátano", "fresa", "manzana"];

// Busca "manzana", pero empezando desde la posición 2
const segundaManzana = frutas.indexOf("manzana", 2);
console.log(segundaManzana); // Resultado: 3`
			},
			{
				titulo: "Ejemplo 3: Cuando no encuentra el elemento",
				code: `const nombres = ["Josue", "Ana", "Carlos"];
const indiceMaria = nombres.indexOf("María");

console.log(indiceMaria); // Resultado: -1`
			}
		],
		errores: [{
			texto: "**Intentar buscar dentro de objetos:** `indexOf()` **no sirve** para buscar un objeto dentro de un array de objetos, a menos que tengas la referencia exacta en memoria.",
			code: `const usuarios = [{ id: 1, nombre: "Josue" }];
console.log(usuarios.indexOf({ id: 1, nombre: "Josue" })); // Resultado: -1 (son objetos distintos en memoria)`,
			nota: "Para arrays de objetos, usa `findIndex()`."
		}, "**Falso positivo con la posición `0`:** Si el elemento está en la primera posición, devuelve `0`. En JavaScript, `0` es un valor *falsy*, por lo que evaluar un `if (array.indexOf(\"X\"))` puede fallar si no comparas explícitamente con `-1` (ej: `if (array.indexOf(\"X\") !== -1)`)."],
		casos: [
			"**Validación rápida de existencia:** Comprobar si un elemento está en una lista antes de insertarlo para evitar duplicados.",
			"**Eliminar elementos simples:** Encontrar el índice de un string o número específico para removerlo con `splice()`.",
			"**Manejo de strings:** Encontrar la posición exacta de una palabra o carácter dentro de un bloque de texto largo."
		],
		relacion: [
			"**`lastIndexOf()`:** Hace lo mismo, pero empieza a buscar desde el final del array hacia el principio.",
			"**`findIndex()`:** Sirve para búsquedas complejas porque recibe una función condicional en lugar de un valor estático.",
			"**`includes()`:** Devuelve un valor booleano (`true` o `false`). Si solo quieres saber si el elemento existe y no te importa su posición, es mejor usar `includes()`."
		],
		analogia: "Imagina que estás revisando una lista de asistencia impresa buscando el nombre \"Carlos\". Vas leyendo línea por línea desde arriba. En cuanto ves \"Carlos\", anotas el número de línea donde apareció y dejas de leer el resto de la hoja. Si terminas de leer toda la hoja y no estaba, anotas un tachón (`-1`). Eso es `indexOf()`.",
		fuente: "MDN Web Docs | Array.prototype.indexOf() y String.prototype.indexOf()",
		quiz: [
			{
				id: 1,
				pregunta: "¿Qué recibe indexOf() para realizar la búsqueda?",
				opciones: [
					"Una función callback",
					"El valor específico que se quiere buscar",
					"Un objeto de configuración",
					"Nada"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué tipo de comparación utiliza indexOf()?",
				opciones: [
					"Igualdad débil (==)",
					"Igualdad estricta (===)",
					"Comparación por callback",
					"Comparación alfabética"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Qué devuelve indexOf() si no encuentra el valor?",
				opciones: [
					"undefined",
					"-1",
					"null",
					"false"
				],
				correcta: 1
			},
			{
				id: 4,
				pregunta: "¿Qué devuelve [\"a\", \"b\", \"c\", \"b\"].indexOf(\"b\")?",
				opciones: [
					"1",
					"3",
					"2",
					"-1"
				],
				correcta: 0
			},
			{
				id: 5,
				pregunta: "¿Por qué indexOf({ id: 1 }) no encuentra un objeto igual dentro de un array?",
				opciones: [
					"Porque compara referencias en memoria",
					"Porque solo acepta números",
					"Porque no recorre objetos",
					"Porque es muy lento"
				],
				correcta: 0
			},
			{
				id: 6,
				pregunta: "¿Para qué sirve el segundo parámetro de indexOf()?",
				opciones: [
					"Es el valor de reemplazo",
					"Es el índice desde donde empezar a buscar",
					"Es la cantidad de resultados",
					"Es el separador"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "Si solo quieres saber si un elemento existe (true/false), ¿qué método es mejor?",
				opciones: [
					"includes()",
					"push()",
					"splice()",
					"fill()"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "¿Por qué un if (array.indexOf(\"X\")) sin comparar puede fallar?",
				opciones: [
					"Porque devuelve strings",
					"Porque 0 es falsy y -1 es truthy",
					"Porque devuelve true/false",
					"Porque necesita un callback"
				],
				correcta: 1
			}
		]
	},
	lastindexof: {
		id: "lastindexof",
		titulo: "Array.prototype.lastIndexOf()",
		simulador: true,
		definicion: ["Es un método integrado en JavaScript que busca un **valor específico** dentro de un array (o un string) y devuelve el **último índice numérico** donde se encuentra dicho valor, realizando la búsqueda en orden inverso."],
		queEs: ["Es la contraparte directa de `indexOf()`.", "Al igual que este, realiza una búsqueda **estricta y directa** (`===`) basada en un valor plano (primitivo) en lugar de una función callback, pero inicia su recorrido desde el final de la estructura hacia el principio."],
		paraQueSirve: ["Sirve para localizar de manera directa la posición de la **última aparición** de un elemento (como un string, número o booleano) en una lista o texto que contiene elementos duplicados, o para evaluar la coincidencia más reciente en un ordenamiento secuencial."],
		comoFunciona: [
			"Recorre la estructura de derecha a izquierda (empezando desde el índice `array.length - 1`).",
			"Compara cada elemento usando el operador de igualdad estricta (`===`) con el valor proporcionado.",
			"**Cortocircuito:** En cuanto encuentra la primera coincidencia exacta (viniendo desde el final), detiene la búsqueda y devuelve su índice real.",
			"Si recorre todo el array de atrás hacia adelante sin encontrar una coincidencia, devuelve `-1`."
		],
		sintaxis: [{ code: `// Sintaxis básica
const ultimoIndice = array.lastIndexOf(elementoBuscado);

// Sintaxis con índice de inicio (opcional)
const ultimoIndiceDesdePosicion = array.lastIndexOf(elementoBuscado, desdeElIndice);` }],
		nota: "**Nota sobre el segundo parámetro:** Si pasas un `desdeElIndice` (por ejemplo, `5`), la búsqueda empezará en esa posición y se moverá exclusivamente hacia atrás (hacia el índice `0`).",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Buscar la última aparición en un array plano",
				code: `const puntuaciones = [10, 20, 30, 20, 40];

const ultimaPosicion20 = puntuaciones.lastIndexOf(20);
console.log(ultimaPosicion20); // Resultado: 3 (ignora el 20 que está en la posición 1)`
			},
			{
				titulo: "Ejemplo 2: Usando el parámetro de inicio para buscar hacia atrás",
				code: `const letras = ["A", "B", "C", "A", "E", "F"];

// Empieza a buscar "A" desde la posición 2 hacia la izquierda
const indiceA = letras.lastIndexOf("A", 2);
console.log(indiceA); // Resultado: 0 (la "A" de la posición 3 es ignorada porque empezó en la 2)`
			},
			{
				titulo: "Ejemplo 3: Cuando no encuentra el elemento",
				code: `const stack = ["React", "Vite", "Notion"];
const indiceNode = stack.lastIndexOf("Node");

console.log(indiceNode); // Resultado: -1`
			}
		],
		errores: ["**Confusión con el índice devuelto:** Aunque el recorrido se hace de derecha a izquierda, el número de índice devuelto es el **índice absoluto original** del array (contado desde 0 de izquierda a derecha). No devuelve una posición invertida.", {
			texto: "**Buscar objetos o arrays anidados:** Al igual que `indexOf()`, utiliza comparación por referencia en objetos. Si intentas buscar una estructura de objeto literal duplicada, devolverá `-1` porque sus referencias en memoria son distintas.",
			code: `const datos = [{ id: 1 }, { id: 1 }];
console.log(datos.lastIndexOf({ id: 1 })); // Resultado: -1`,
			nota: "Para arrays de objetos buscando desde el final, usa `findLastIndex()`."
		}],
		casos: ["**Rastreo de extensiones de archivos:** En strings, se usa frecuentemente para encontrar el último punto (`.`) de una ruta de archivo y así extraer su extensión (ej: `archivo.foto.copia.png`).", "**Filtrado de datos recientes:** Localizar la posición del último registro con un valor de estado idéntico (como un string `\"error\"`) para analizar el flujo de fallas en una lista de logs planos."],
		relacion: [
			"**`indexOf()`:** Hace lo mismo, pero evalúa de izquierda a derecha devolviendo la primera aparición.",
			"**`findLastIndex()`:** Se prefiere cuando la búsqueda en reversa requiere de una evaluación lógica compleja o un array de objetos.",
			"**`String.prototype.lastIndexOf()`:** Funciona exactamente igual, diseñado para encontrar la última subcadena o carácter dentro de un texto."
		],
		analogia: "Imagina que estás revisando el historial de asistencia en una pizarra. El nombre \"Ana\" aparece varias veces porque ha asistido varios días. Si quieres saber **cuándo fue la última vez** que vino, empiezas a leer la lista desde el último renglón hacia arriba. El número de renglón donde encuentres su nombre por primera vez (leyendo en reversa) es el `lastIndexOf()`.",
		fuente: "MDN Web Docs | Array.prototype.lastIndexOf() y String.prototype.lastIndexOf()",
		quiz: [
			{
				id: 1,
				pregunta: "¿En qué dirección recorre lastIndexOf() el array?",
				opciones: [
					"De izquierda a derecha",
					"De derecha a izquierda",
					"Desde el medio",
					"No tiene dirección"
				],
				correcta: 1
			},
			{
				id: 2,
				pregunta: "¿Qué devuelve [\"A\", \"B\", \"C\", \"A\", \"E\"].lastIndexOf(\"A\")?",
				opciones: [
					"0",
					"3",
					"4",
					"-1"
				],
				correcta: 1
			},
			{
				id: 3,
				pregunta: "¿Qué hace el segundo parámetro de lastIndexOf()?",
				opciones: [
					"Empieza a buscar en esa posición y se mueve hacia atrás",
					"Empieza en esa posición y busca hacia adelante",
					"Limita la cantidad de resultados",
					"Define un separador"
				],
				correcta: 0
			},
			{
				id: 4,
				pregunta: "El índice que devuelve lastIndexOf() es...",
				opciones: [
					"El índice absoluto original, contado desde 0",
					"Un índice invertido",
					"Siempre length - 1",
					"Relativo al inicio de la búsqueda"
				],
				correcta: 0
			},
			{
				id: 5,
				pregunta: "¿Qué devuelve lastIndexOf() si el valor no existe?",
				opciones: [
					"null",
					"undefined",
					"-1",
					"0"
				],
				correcta: 2
			},
			{
				id: 6,
				pregunta: "Para buscar objetos desde el final con una condición, ¿qué método usarías?",
				opciones: [
					"indexOf()",
					"findLastIndex()",
					"includes()",
					"join()"
				],
				correcta: 1
			},
			{
				id: 7,
				pregunta: "¿Cuál es un uso típico de lastIndexOf() en strings?",
				opciones: [
					"Encontrar el último punto de un archivo para extraer su extensión",
					"Ordenar el texto",
					"Convertir a mayúsculas",
					"Eliminar espacios"
				],
				correcta: 0
			},
			{
				id: 8,
				pregunta: "¿De qué método es la contraparte lastIndexOf()?",
				opciones: [
					"indexOf()",
					"map()",
					"reduce()",
					"flat()"
				],
				correcta: 0
			}
		]
	},
	...METODOS_MUTADORES,
	...METODOS_UTILIDADES,
	...METODOS_TRANSFORMACION,
	...METODOS_ITERATIVOS,
	...METODOS_STRINGS_DOCS,
	...METODOS_NUMEROS_DOCS
};
// src/data/metodosFechas.js
var Q = (rows) => rows.map(([pregunta, opciones, correcta], i) => ({
	id: i + 1,
	pregunta,
	opciones,
	correcta
}));
var METODOS_FECHAS_DOCS = {
	newdate: {
		id: "newdate",
		titulo: "new Date()",
		simulador: "fecha",
		definicion: ["Es el **constructor** de JavaScript que crea una nueva instancia del objeto `Date`, la cual representa un **momento específico en el tiempo**.", "Puede llamarse de distintas formas para crear fechas a partir del momento actual, de un *timestamp*, de un string o de componentes individuales (año, mes, día, hora...)."],
		queEs: [
			"Es el mecanismo principal para trabajar con fechas y horas en JavaScript.",
			"Crea un objeto `Date` que encapsula internamente un *timestamp*: milisegundos desde el **1 de enero de 1970 UTC** (Unix Epoch).",
			"Almacena el instante en milisegundos y ofrece métodos para obtener o establecer sus componentes.",
			"Soporta **zonas horarias**: métodos locales (`getHours`) y métodos UTC (`getUTCHours`).",
			"Es **mutable**: los métodos `set...` modifican el mismo objeto en lugar de crear uno nuevo."
		],
		paraQueSirve: [
			"Crear fechas y horas en JavaScript.",
			"Representar momentos específicos en el tiempo.",
			"Realizar cálculos con fechas (sumar o restar días, horas, etc.).",
			"Comparar fechas y ordenarlas cronológicamente.",
			"Formatear fechas para mostrarlas al usuario.",
			"Extraer componentes (año, mes, día, hora...).",
			"Implementar calendarios, agendas y cronómetros.",
			"Generar *timestamps* para logs, IDs y métricas."
		],
		comoFunciona: [
			"`new Date()`: crea la fecha y hora actuales.",
			"`new Date(timestamp)`: crea la fecha a partir de milisegundos desde el Epoch.",
			"`new Date(dateString)`: crea la fecha a partir de un texto de fecha.",
			"`new Date(year, month, day, hours, minutes, seconds, ms)`: crea la fecha desde componentes individuales en hora local.",
			"Los **meses van de 0 a 11** (0 = enero, 11 = diciembre).",
			"Si los parámetros están fuera de rango, se **ajustan automáticamente** (*overflow*)."
		],
		sintaxis: [
			{ code: `// 1. Fecha actual
new Date()

// 2. Desde un timestamp en milisegundos
new Date(timestamp)

// 3. Desde un string de fecha
new Date(dateString)` },
			{
				caption: "Desde componentes individuales (hora local):",
				code: `new Date(year, month)
new Date(year, month, day)
new Date(year, month, day, hours)
new Date(year, month, day, hours, minutes)
new Date(year, month, day, hours, minutes, seconds)
new Date(year, month, day, hours, minutes, seconds, milliseconds)`
			},
			{
				caption: "Sin `new` el resultado es un string, no un objeto:",
				code: `Date() // "Mon Dec 25 2024 15:30:45 GMT+0100 (CET)"`
			}
		],
		nota: "**Parámetros:** todos opcionales. **Retorno:** un objeto `Date` (o un `string` si se llama a `Date()` sin `new`). Un `Date` inválido devuelve `\"Invalid Date\"` y `getTime()` devuelve `NaN`.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Fecha y hora actual",
				code: `const now = new Date();
console.log(now); // 2024-12-25T15:30:45.123Z`
			},
			{
				titulo: "Ejemplo 2: Desde un timestamp",
				code: `const timestamp = 1735084800000; // 2024-12-25 00:00:00 UTC
const dateFromTimestamp = new Date(timestamp);
console.log(dateFromTimestamp.toISOString()); // "2024-12-25T00:00:00.000Z"`
			},
			{
				titulo: "Ejemplo 3: Desde un string",
				code: `const dateFromString = new Date("2024-12-25");
console.log(dateFromString.getFullYear()); // 2024
console.log(dateFromString.getMonth());   // 11 (diciembre)`
			},
			{
				titulo: "Ejemplo 4: Desde componentes individuales",
				code: `const dateComponents = new Date(2024, 11, 25, 15, 30, 45, 500);
console.log(dateComponents.getFullYear());      // 2024
console.log(dateComponents.getMonth());         // 11
console.log(dateComponents.getDate());          // 25
console.log(dateComponents.getHours());         // 15
console.log(dateComponents.getMinutes());       // 30
console.log(dateComponents.getSeconds());       // 45
console.log(dateComponents.getMilliseconds());  // 500`
			},
			{
				titulo: "Ejemplo 5: Ajuste automático (overflow)",
				code: `// 32 de enero → 1 de febrero
const autoAdjust = new Date(2024, 0, 32);
console.log(autoAdjust.getDate());  // 1
console.log(autoAdjust.getMonth()); // 1 (febrero)

// Mes 13 → enero del año siguiente
const nextYear = new Date(2024, 13, 1);
console.log(nextYear.getFullYear()); // 2025
console.log(nextYear.getMonth());    // 0 (enero)`
			},
			{
				titulo: "Ejemplo 6: Fecha inválida",
				code: `const invalid = new Date("fecha inválida");
console.log(invalid.toString());        // "Invalid Date"
console.log(Number.isNaN(invalid.getTime())); // true`
			}
		],
		errores: [
			{
				texto: "**Usar `Date()` sin `new` esperando un objeto:** devuelve un string y no tiene métodos de `Date`.",
				code: `const date = Date();
console.log(typeof date); // "string"

// ❌ TypeError: date.getTime is not a function
date.getTime();

// ✅ Correcto
const date2 = new Date();
console.log(typeof date2.getTime()); // "number"`
			},
			{
				texto: "**Olvidar que los meses empiezan en 0:** diciembre es `11`, no `12`.",
				code: `const mal = new Date(2024, 12, 25);
console.log(mal.getMonth()); // 0 (enero del año siguiente)

const bien = new Date(2024, 11, 25);
console.log(bien.getMonth()); // 11 (diciembre)`
			},
			{
				texto: "**Usar años de 2 dígitos:** `99` se interpreta como el año 99 d.C., no como 1999.",
				code: `console.log(new Date(99, 11, 25).getFullYear());   // 99
console.log(new Date(1999, 11, 25).getFullYear()); // 1999`
			},
			{
				texto: "**Usar formatos de string ambiguos:** `\"01/02/2024\"` puede ser 2 de enero o 1 de febrero según el navegador. Prefiere el formato ISO `AAAA-MM-DD`.",
				code: `new Date("01/02/2024"); // ⚠️ ambiguo
new Date("2024-01-02"); // ✅ 2 de enero`
			},
			{
				texto: "**No considerar la zona horaria:** un string ISO sin hora se interpreta como UTC; los componentes individuales se interpretan como hora local.",
				code: `new Date("2024-12-25");        // 2024-12-25 00:00:00 UTC
new Date(2024, 11, 25);        // 2024-12-25 00:00:00 local`
			}
		],
		casos: [
			"**Registro de usuarios:** guardar `createdAt` y `updatedAt` con `new Date()`.",
			"**Informes por período:** calcular el inicio y el fin de un día, semana, mes o año.",
			"**Sistemas de citas y calendarios:** crear y comparar horarios de reuniones.",
			"**Vencimiento de licencias y suscripciones:** calcular la fecha de expiración.",
			"**Métricas temporales:** agrupar eventos por día u hora.",
			"**Clonar fechas:** `new Date(fecha.getTime())` crea una copia independiente."
		],
		relacion: [
			"**`Date.now()`:** obtiene el *timestamp* actual sin crear una instancia.",
			"**`Date.parse()`:** convierte un string de fecha en un *timestamp*.",
			"**`Date.UTC()`:** crea un *timestamp* para una fecha UTC específica.",
			"**`getTime()`:** devuelve el *timestamp* interno del objeto `Date`.",
			"**`toISOString()`:** convierte la fecha al formato estándar ISO 8601 en UTC.",
			"**`toLocaleString()`:** formatea la fecha según la configuración regional."
		],
		analogia: "Imagina que `new Date()` es un **relojero** que puede crear un reloj para cualquier momento. `new Date()` te entrega un reloj que marca la hora actual; `new Date(timestamp)` te da uno configurado a un instante exacto en milisegundos; `new Date(\"2024-12-25\")` te da un reloj ajustado a Navidad; y `new Date(2024, 11, 25)` te lo entrega armado con piezas separadas (año, mes, día).",
		fuente: "MDN Web Docs | ECMAScript Specification | MDN – Date constructor",
		notasPersonales: [
			"**Regla para memorizar:** siempre usa `new`; los meses empiezan en `0` y los años se escriben con 4 dígitos.",
			"Para strings, prefiere el formato ISO `AAAA-MM-DDTHH:mm:ss` para evitar ambigüedades entre navegadores.",
			"Un `Date` inválido no lanza error al crearse: falla después (`NaN` o `\"Invalid Date\"`)."
		],
		quiz: Q([
			[
				"¿Qué devuelve Date() sin la palabra new?",
				[
					"Un objeto Date",
					"Un string con la fecha",
					"Un timestamp",
					"undefined"
				],
				1
			],
			[
				"¿Qué número corresponde a diciembre en new Date(2024, 11, 25)?",
				[
					"12",
					"11",
					"10",
					"0"
				],
				1
			],
			[
				"¿Qué representa internamente un objeto Date?",
				[
					"Una cadena de texto",
					"Milisegundos desde el 1 de enero de 1970 UTC",
					"Segundos desde el año 2000",
					"Un objeto con año, mes y día"
				],
				1
			],
			[
				"¿Qué ocurre con new Date(2024, 0, 32)?",
				[
					"Lanza un error",
					"Se ajusta automáticamente al 1 de febrero",
					"Devuelve Invalid Date",
					"Devuelve el 32 de enero"
				],
				1
			],
			[
				"¿Qué devuelve new Date(\"fecha inválida\").getTime()?",
				[
					"0",
					"NaN",
					"null",
					"Un error"
				],
				1
			],
			[
				"¿Cómo se crea una fecha a partir de componentes en hora local?",
				[
					"new Date(timestamp)",
					"new Date(year, month, day, ...)",
					"Date.parse(year, month)",
					"new Date(ISOString)"
				],
				1
			],
			[
				"¿Cuál es la forma recomendada de escribir una fecha en string?",
				[
					"DD/MM/AAAA",
					"MM/DD/AAAA",
					"AAAA-MM-DD (ISO 8601)",
					"Cualquiera da igual"
				],
				2
			],
			[
				"¿Qué método crea una copia independiente de una fecha?",
				[
					"const copia = original",
					"new Date(original.getTime())",
					"original.clone()",
					"Date(original)"
				],
				1
			]
		])
	},
	datenow: {
		id: "datenow",
		titulo: "Date.now()",
		simulador: "fecha",
		definicion: ["Es un **método estático** de `Date` que devuelve el número de **milisegundos** transcurridos desde el **1 de enero de 1970, 00:00:00 UTC** (Unix Epoch) hasta el momento actual.", "Es la forma más directa y eficiente de obtener el *timestamp* actual, porque no crea una instancia de `Date`."],
		queEs: [
			"Devuelve un **número entero** con precisión de milisegundos.",
			"Es **independiente de la zona horaria**: el valor siempre está referido a UTC.",
			"Es un método **estático**: se llama como `Date.now()`, no sobre una instancia.",
			"Es equivalente a `new Date().getTime()`, pero más rápido y con menos sobrecarga.",
			"En navegadores modernos la precisión está limitada a milisegundos."
		],
		paraQueSirve: [
			"Obtener el *timestamp* actual de forma eficiente.",
			"Medir tiempos de ejecución de código.",
			"Generar identificadores únicos y nombres de archivo.",
			"Implementar cachés con expiración (*TTL*).",
			"Crear logs y marcas de tiempo.",
			"Calcular diferencias de tiempo.",
			"Implementar *rate limiting* y *throttling*."
		],
		comoFunciona: [
			"Consulta el reloj del sistema.",
			"Devuelve los milisegundos transcurridos desde el Epoch.",
			"No lanza errores: siempre devuelve un número válido.",
			"No modifica ni crea objetos `Date`.",
			"Para mediciones de alta precisión se recomienda `performance.now()`."
		],
		sintaxis: [{ code: `const timestamp = Date.now();` }, {
			caption: "Para obtener segundos (timestamp Unix clásico):",
			code: `const unixSegundos = Math.floor(Date.now() / 1000);`
		}],
		nota: "**Parámetros:** ninguno. **Retorno:** un `number` con los milisegundos desde el 1 de enero de 1970 UTC hasta ahora.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico",
				code: `const timestamp = Date.now();
console.log(timestamp); // 1703539200000 (ejemplo)`
			},
			{
				titulo: "Ejemplo 2: Comparación con new Date().getTime()",
				code: `console.log(Date.now() === new Date().getTime()); // true (casi siempre)`
			},
			{
				titulo: "Ejemplo 3: Medir tiempo de ejecución",
				code: `const start = Date.now();

for (let i = 0; i < 1000000; i++) {
  Math.sqrt(i);
}

const end = Date.now();
console.log(\`Tiempo de ejecución: \${end - start} ms\`);`
			},
			{
				titulo: "Ejemplo 4: Generar un identificador único",
				code: `function generateId() {
  return \`\${Date.now()}-\${Math.random().toString(36).slice(2, 8)}\`;
}

console.log(generateId()); // "1703539200000-abc123"`
			},
			{
				titulo: "Ejemplo 5: Caché con expiración (TTL)",
				code: `const cache = new Map();
const TTL = 5000; // 5 segundos

function set(key, value) {
  cache.set(key, { value, expires: Date.now() + TTL });
}

function get(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

set("dato", "valor");
console.log(get("dato")); // "valor"`
			},
			{
				titulo: "Ejemplo 6: Milisegundos hasta una fecha",
				code: `function msUntil(fecha) {
  const target = new Date(fecha).getTime();
  return Math.max(0, target - Date.now());
}

console.log(msUntil("2024-12-31T23:59:59Z"));`
			}
		],
		errores: [
			{
				texto: "**Crear una instancia innecesaria:** `new Date().getTime()` funciona, pero `Date.now()` es más eficiente.",
				code: `// ❌ Menos eficiente
const ahora = new Date().getTime();

// ✅ Más eficiente
const ahora2 = Date.now();`
			},
			{
				texto: "**Pensar que devuelve segundos:** devuelve **milisegundos**.",
				code: `const ms = Date.now();                      // 1703539200000
const s  = Math.floor(Date.now() / 1000);   // 1703539200`
			},
			{
				texto: "**Usarlo para mediciones de altísima precisión:** puede devolver `0` en operaciones muy rápidas. Usa `performance.now()`.",
				code: `const start = Date.now();
// operación muy rápida
const duracion = Date.now() - start; // puede ser 0

const startPerf = performance.now();
// operación muy rápida
const duracionPerf = performance.now() - startPerf; // microsegundos`
			},
			{
				texto: "**Asumir que los *timestamps* son únicos:** dos llamadas seguidas pueden coincidir. Combínalo con un valor aleatorio o un contador.",
				code: `const id1 = Date.now();
const id2 = Date.now(); // puede ser igual a id1

const id = \`\${Date.now()}-\${Math.random().toString(36).slice(2, 6)}\`;`
			}
		],
		casos: [
			"**Medición de rendimiento:** cronometrar funciones y peticiones.",
			"**Cachés con expiración:** calcular cuándo caduca un valor.",
			"**Tokens y sesiones:** guardar la hora de creación y de expiración.",
			"**Logs y auditoría:** marcar cada evento con su instante exacto.",
			"**Rate limiting:** contar solicitudes dentro de una ventana de tiempo.",
			"**Nombres de archivo únicos:** `archivo_1703539200000.png`."
		],
		relacion: [
			"**`new Date().getTime()`:** equivalente, pero requiere crear una instancia.",
			"**`performance.now()`:** *timestamp* de alta resolución para mediciones.",
			"**`Date.parse()`:** convierte un string de fecha a *timestamp*.",
			"**`Date.UTC()`:** crea un *timestamp* para una fecha UTC específica.",
			"**`new Date(timestamp)`:** hace el camino inverso, de número a fecha."
		],
		analogia: "Imagina un **cronómetro universal** que lleva corriendo desde la medianoche del 1 de enero de 1970. Cada vez que llamas a `Date.now()` miras su pantalla y obtienes exactamente cuántos milisegundos han pasado. No necesitas fabricar un cronómetro nuevo (un objeto `Date`): solo miras el que ya existe.",
		fuente: "MDN Web Docs | ECMAScript Specification | MDN – Date.now()",
		notasPersonales: [
			"**Regla para memorizar:** `Date.now()` = milisegundos desde 1970, siempre en UTC.",
			"Divide entre `1000` para segundos y entre `86400000` para días.",
			"Es la forma recomendada de obtener el *timestamp* actual."
		],
		quiz: Q([
			[
				"¿Qué devuelve Date.now()?",
				[
					"Un objeto Date",
					"Milisegundos desde el 1 de enero de 1970 UTC",
					"Segundos desde 1970",
					"Un string con la fecha"
				],
				1
			],
			[
				"¿Date.now() depende de la zona horaria local?",
				[
					"Sí, siempre",
					"No, siempre está en UTC",
					"Solo en Node.js",
					"Solo en el navegador"
				],
				1
			],
			[
				"¿Cómo se obtienen segundos a partir de Date.now()?",
				[
					"Date.now() / 1000 sin más",
					"Math.floor(Date.now() / 1000)",
					"Date.now() * 1000",
					"Date.now().seconds"
				],
				1
			],
			[
				"¿Cuál es más eficiente?",
				[
					"new Date().getTime()",
					"Date.now()",
					"Ambos igual",
					"Date.parse()"
				],
				1
			],
			[
				"¿Qué método se recomienda para medir tiempos de alta precisión?",
				[
					"Date.now()",
					"performance.now()",
					"new Date()",
					"Date.parse()"
				],
				1
			],
			[
				"¿Date.now() puede lanzar un error?",
				[
					"Sí, si la fecha es inválida",
					"No, siempre devuelve un número",
					"Solo con new",
					"Solo en modo estricto"
				],
				1
			],
			[
				"¿Qué devuelve Date.now() === new Date().getTime()?",
				[
					"Siempre false",
					"Casi siempre true",
					"NaN",
					"Un error"
				],
				1
			],
			[
				"¿Cuál es un riesgo de usar Date.now() como ID único?",
				[
					"Devuelve un string",
					"Dos llamadas seguidas pueden devolver el mismo valor",
					"No funciona en navegadores",
					"Solo funciona una vez"
				],
				1
			]
		])
	},
	gettime: {
		id: "gettime",
		titulo: "Date.prototype.getTime()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que devuelve el número de **milisegundos** transcurridos desde el **1 de enero de 1970, 00:00:00 UTC** (Unix Epoch) hasta la fecha representada por el objeto.", "Es la representación **numérica universal** de una fecha: no depende de la zona horaria y permite comparar y calcular con facilidad."],
		queEs: [
			"El *timestamp* devuelto es **siempre en UTC**.",
			"Es un valor **primitivo** (`number`), no un objeto.",
			"Los valores **negativos** representan fechas anteriores al 1 de enero de 1970.",
			"Es el formato estándar para comparar fechas y hacer cálculos temporales.",
			"Equivale a `date.valueOf()` y a `+date`."
		],
		paraQueSirve: [
			"Comparar fechas de forma precisa y sencilla.",
			"Calcular diferencias de tiempo entre dos fechas.",
			"Medir tiempos de ejecución y rendimiento.",
			"Generar identificadores únicos basados en tiempo.",
			"Almacenar fechas en bases de datos como números.",
			"Crear *timestamps* para logs y auditoría.",
			"Implementar cachés con expiración basada en tiempo."
		],
		comoFunciona: [
			"Toma el *timestamp* interno que guarda el objeto `Date`.",
			"Lo devuelve como un número de milisegundos desde el Epoch.",
			"No modifica el objeto original.",
			"Si la fecha es inválida, devuelve `NaN`.",
			"Un día equivale a `86 400 000` milisegundos."
		],
		sintaxis: [{ code: `const ms = fecha.getTime();` }, {
			caption: "Equivalencias habituales:",
			code: `fecha.getTime() === fecha.valueOf(); // true
fecha.getTime() === +fecha;           // true`
		}],
		nota: "**Parámetros:** ninguno. **Retorno:** un `number` con los milisegundos desde el Epoch, o `NaN` si la fecha es inválida.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico",
				code: `const date = new Date(2024, 11, 25);
console.log(date.getTime()); // 1735084800000`
			},
			{
				titulo: "Ejemplo 2: Comparar dos fechas",
				code: `const date1 = new Date(2024, 0, 1);
const date2 = new Date(2024, 11, 31);

if (date1.getTime() < date2.getTime()) {
  console.log("date1 es anterior a date2");
}`
			},
			{
				titulo: "Ejemplo 3: Diferencia en días",
				code: `function daysBetween(a, b) {
  const diff = Math.abs(b.getTime() - a.getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

console.log(daysBetween(new Date(2024, 0, 1), new Date(2024, 11, 31))); // 365`
			},
			{
				titulo: "Ejemplo 4: Fechas antes del Epoch",
				code: `const oldDate = new Date(1969, 6, 20);
console.log(oldDate.getTime()); // número negativo`
			},
			{
				titulo: "Ejemplo 5: Ordenar fechas",
				code: `const dates = [
  new Date(2024, 5, 15),
  new Date(2023, 11, 25),
  new Date(2024, 0, 1),
];

dates.sort((a, b) => a.getTime() - b.getTime());
console.log(dates.map((d) => d.toISOString()));`
			},
			{
				titulo: "Ejemplo 6: Timestamp Unix en segundos",
				code: `function getUnixTimestamp(date = new Date()) {
  return Math.floor(date.getTime() / 1000);
}

console.log(getUnixTimestamp());`
			}
		],
		errores: [
			{
				texto: "**Comparar fechas con `===`:** dos objetos distintos nunca son iguales, aunque representen el mismo instante.",
				code: `const d1 = new Date(2024, 0, 1);
const d2 = new Date(2024, 0, 1);
console.log(d1 === d2);            // false
console.log(d1.getTime() === d2.getTime()); // true`
			},
			{
				texto: "**Pensar que devuelve segundos:** devuelve **milisegundos**.",
				code: `const ms = new Date().getTime();            // 1703539200000
const s  = Math.floor(ms / 1000);          // 1703539200`
			},
			{
				texto: "**Crear objetos `Date` innecesariamente** para obtener el instante actual.",
				code: `// ❌
const ahora = new Date().getTime();

// ✅
const ahora2 = Date.now();`
			},
			{
				texto: "**No comprobar fechas inválidas:** `getTime()` devuelve `NaN` y cualquier comparación con `NaN` es `false`.",
				code: `const mala = new Date("abc");
console.log(mala.getTime());        // NaN
console.log(Number.isNaN(mala.getTime())); // true`
			}
		],
		casos: [
			"**Comparar y ordenar fechas** de forma fiable.",
			"**Calcular diferencias** en días, horas o minutos.",
			"**Cachés y tokens** con expiración por tiempo.",
			"**Logs y auditoría** con marcas de tiempo numéricas.",
			"**Medir rendimiento** de funciones y peticiones.",
			"**Guardar fechas en bases de datos** como números (más eficiente)."
		],
		relacion: [
			"**`Date.now()`:** devuelve el *timestamp* actual sin instancia.",
			"**`valueOf()` / `+date`:** equivalentes a `getTime()`.",
			"**`Date.parse()`:** convierte un string a *timestamp*.",
			"**`Date.UTC()`:** obtiene el *timestamp* de una fecha UTC específica.",
			"**`performance.now()`:** *timestamp* de alta resolución para mediciones."
		],
		analogia: "`getTime()` es como un **cuentakilómetros del tiempo**: mide cuántos milisegundos han pasado desde un punto de referencia fijo (el 1 de enero de 1970). Es un cronómetro universal que todos los sistemas pueden usar para ponerse de acuerdo sobre qué hora es.",
		fuente: "MDN Web Docs | ECMAScript Specification | Unix Time",
		notasPersonales: [
			"**Regla para memorizar:** `getTime()` siempre devuelve milisegundos en UTC.",
			"Para comparar fechas usa `getTime()`, nunca `===` sobre los objetos.",
			"Si obtienes `NaN`, la fecha es inválida."
		],
		quiz: Q([
			[
				"¿Qué devuelve getTime()?",
				[
					"Un objeto Date",
					"Milisegundos desde el Epoch",
					"Segundos desde 1970",
					"Un string ISO"
				],
				1
			],
			[
				"¿En qué zona horaria está el valor devuelto?",
				[
					"En la local",
					"En UTC",
					"En la del navegador",
					"Depende del string"
				],
				1
			],
			[
				"¿Qué devuelve una fecha inválida con getTime()?",
				[
					"0",
					"NaN",
					"null",
					"Un error"
				],
				1
			],
			[
				"¿Cuántos milisegundos tiene un día?",
				[
					"3600000",
					"86400000",
					"604800000",
					"1000"
				],
				1
			],
			[
				"¿Qué expresión es equivalente a fecha.getTime()?",
				[
					"fecha.toString()",
					"+fecha",
					"fecha.getDate()",
					"Date.now()"
				],
				1
			],
			[
				"¿Por qué d1 === d2 es false para dos fechas iguales?",
				[
					"Porque Date no admite comparación",
					"Porque son dos objetos distintos",
					"Porque una es local y otra UTC",
					"Porque falta new"
				],
				1
			],
			[
				"¿Qué devuelve una fecha de 1969 con getTime()?",
				[
					"0",
					"Un número negativo",
					"NaN",
					"Un error"
				],
				1
			],
			[
				"¿Cómo se obtienen segundos Unix desde getTime()?",
				[
					"getTime() / 1000 sin redondear",
					"Math.floor(getTime() / 1000)",
					"getTime() * 1000",
					"getTime().seconds"
				],
				1
			]
		])
	},
	getfullyear: {
		id: "getfullyear",
		titulo: "Date.prototype.getFullYear()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que devuelve el **año completo de 4 dígitos** de una fecha según la **hora local**.", "A diferencia de `getYear()` (obsoleto, que devuelve el año menos 1900), `getFullYear()` devuelve el año tal cual: `2024` en lugar de `124`."],
		queEs: [
			"Es el método estándar para obtener el año de una fecha.",
			"Es un **getter**: no modifica el objeto original.",
			"Trabaja con la **hora local** del sistema; para UTC se usa `getUTCFullYear()`.",
			"Devuelve un número entero, no un string.",
			"Los años negativos representan años antes de Cristo."
		],
		paraQueSirve: [
			"Obtener el año actual para mostrarlo en interfaces.",
			"Calcular la edad de una persona.",
			"Generar años fiscales y períodos contables.",
			"Filtrar datos por año específico.",
			"Crear calendarios y agendas.",
			"Validar rangos de fechas.",
			"Generar números de serie que incluyen el año."
		],
		comoFunciona: [
			"Lee el año del objeto `Date` según la hora local.",
			"Devuelve el año completo, con 4 dígitos cuando corresponde.",
			"Para años anteriores al 2000 devuelve el año completo (por ejemplo, `1999`).",
			"No modifica el objeto.",
			"Si la fecha es inválida, devuelve `NaN`."
		],
		sintaxis: [{ code: `const year = fecha.getFullYear();` }, {
			caption: "Comparación con el obsoleto `getYear()`:",
			code: `const date = new Date(2024, 0, 1);
console.log(date.getFullYear()); // 2024
console.log(date.getYear());     // 124 (obsoleto)`
		}],
		nota: "**Parámetros:** ninguno. **Retorno:** un `number` con el año completo, o `NaN` si la fecha es inválida.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Uso básico",
				code: `const date = new Date(2024, 11, 25);
console.log(date.getFullYear()); // 2024`
			},
			{
				titulo: "Ejemplo 2: Año actual",
				code: `const now = new Date();
console.log(now.getFullYear()); // año actual (ej: 2026)`
			},
			{
				titulo: "Ejemplo 3: Años antes del 2000 y en el futuro",
				code: `console.log(new Date(1985, 6, 15).getFullYear()); // 1985
console.log(new Date(2050, 0, 1).getFullYear());  // 2050`
			},
			{
				titulo: "Ejemplo 4: Calcular la edad",
				code: `function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
}

console.log(calculateAge(new Date(1990, 5, 15)));`
			},
			{
				titulo: "Ejemplo 5: Verificar año bisiesto",
				code: `function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

console.log(isLeapYear(2024)); // true
console.log(isLeapYear(2023)); // false
console.log(isLeapYear(1900)); // false`
			},
			{
				titulo: "Ejemplo 6: Filtrar eventos por año",
				code: `const events = [
  { nombre: "Evento 1", date: "2024-06-15" },
  { nombre: "Evento 2", date: "2023-12-31" },
];

const del2024 = events.filter(
  (e) => new Date(e.date).getFullYear() === 2024
);

console.log(del2024.length); // 1`
			}
		],
		errores: [
			{
				texto: "**Usar `getYear()` en lugar de `getFullYear()`:** está obsoleto y devuelve el año menos 1900.",
				code: `// ❌ Obsoleto
date.getYear(); // 124 para 2024

// ✅ Correcto
date.getFullYear(); // 2024`
			},
			{
				texto: "**Olvidar la zona horaria:** `getFullYear()` es local, no UTC.",
				code: `const d = new Date("2024-12-31T23:30:00Z");
console.log(d.getFullYear());    // puede ser 2025 según la zona
console.log(d.getUTCFullYear()); // 2024`
			},
			{
				texto: "**Pensar que devuelve un string:** devuelve un `number`. Si necesitas texto, usa `String()` o `padStart()`.",
				code: `const year = new Date().getFullYear();
console.log(typeof year);            // "number"
console.log(String(year).padStart(4, "0"));`
			},
			{
				texto: "**Asumir que los años negativos son un error:** JavaScript los admite para representar años a.C.",
				code: `console.log(new Date(-500, 0, 1).getFullYear()); // -500`
			}
		],
		casos: [
			"**Calcular la edad** de un usuario a partir de su fecha de nacimiento.",
			"**Facturación y números de serie** con el año: `FAC-2024-000001`.",
			"**Filtros y reportes anuales** de ventas o eventos.",
			"**Años fiscales** y períodos contables.",
			"**Calendarios y agendas** que muestran el año actual.",
			"**Suscripciones y licencias** con renovación anual."
		],
		relacion: [
			"**`getUTCFullYear()`:** año en UTC.",
			"**`setFullYear()`:** establece el año.",
			"**`getYear()`:** obsoleto (año menos 1900).",
			"**`getMonth()`:** mes (0-11).",
			"**`getDate()`:** día del mes (1-31).",
			"**`getDay()`:** día de la semana (0-6)."
		],
		analogia: "`getFullYear()` es como **leer el año en un calendario de pared**: miras la fecha y ves claramente «2024». Es simple, directo y siempre te da el número completo de 4 dígitos, sin abreviaturas ni confusiones.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: [
			"**Regla para memorizar:** `getFullYear()` devuelve el año completo; `getYear()` está obsoleto.",
			"Usa `getUTCFullYear()` si necesitas el año en UTC.",
			"Es un `number`, no un `string`."
		],
		quiz: Q([
			[
				"¿Qué devuelve new Date(2024, 11, 25).getFullYear()?",
				[
					"2024",
					"124",
					"\"2024\"",
					"11"
				],
				0
			],
			[
				"¿Qué devuelve getYear() para el año 2024?",
				[
					"2024",
					"124",
					"24",
					"NaN"
				],
				1
			],
			[
				"¿Qué método obtiene el año en UTC?",
				[
					"getFullYear()",
					"getUTCFullYear()",
					"getYear()",
					"toISOString()"
				],
				1
			],
			[
				"¿getFullYear() modifica la fecha original?",
				[
					"Sí, siempre",
					"No, es un getter",
					"Solo en modo estricto",
					"Solo si es bisiesto"
				],
				1
			],
			[
				"¿Qué devuelve getFullYear() en una fecha inválida?",
				[
					"0",
					"NaN",
					"null",
					"Un error"
				],
				1
			],
			[
				"¿Qué tipo de dato devuelve getFullYear()?",
				[
					"string",
					"number",
					"boolean",
					"object"
				],
				1
			]
		])
	},
	getmonth: {
		id: "getmonth",
		titulo: "Date.prototype.getMonth()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que devuelve el **mes** de una fecha según la hora local, como un número entre **0 y 11**.", "**Importante:** los meses en JavaScript empiezan en `0`. Enero es `0` y diciembre es `11`."],
		queEs: [
			"Es un **getter**: devuelve información sin modificar el objeto.",
			"Devuelve un valor de tipo `number`.",
			"Usa la **hora local** del sistema.",
			"Para mostrar el mes como lo entienden las personas hay que sumar `1`.",
			"Si la fecha es inválida, devuelve `NaN`."
		],
		paraQueSirve: [
			"Mostrar el mes actual.",
			"Formatear fechas.",
			"Crear calendarios.",
			"Agrupar información por meses.",
			"Realizar comparaciones entre fechas.",
			"Generar reportes mensuales."
		],
		comoFunciona: [
			"Se crea un objeto `Date`.",
			"Se llama al método `getMonth()`.",
			"JavaScript obtiene el mes correspondiente a esa fecha.",
			"Devuelve un número entre `0` y `11`.",
			"Si la fecha es inválida, devuelve `NaN`."
		],
		sintaxis: [{ code: `const mes = fecha.getMonth();` }, {
			caption: "Tabla de valores:",
			code: `0  → Enero
1  → Febrero
2  → Marzo
3  → Abril
4  → Mayo
5  → Junio
6  → Julio
7  → Agosto
8  → Septiembre
9  → Octubre
10 → Noviembre
11 → Diciembre`
		}],
		nota: "**Parámetros:** ninguno. **Retorno:** un `number` entre `0` y `11`, o `NaN` si la fecha es inválida.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Mes de una fecha",
				code: `const fecha = new Date("2026-07-22");
console.log(fecha.getMonth()); // 6 (julio)`
			},
			{
				titulo: "Ejemplo 2: Diciembre",
				code: `const fecha = new Date("2026-12-25");
console.log(fecha.getMonth()); // 11`
			},
			{
				titulo: "Ejemplo 3: Mostrar el nombre del mes",
				code: `const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const fecha = new Date();
console.log(meses[fecha.getMonth()]);`
			},
			{
				titulo: "Ejemplo 4: Comparar si es diciembre",
				code: `const fecha = new Date();
if (fecha.getMonth() === 11) {
  console.log("Es diciembre.");
}`
			},
			{
				titulo: "Ejemplo 5: Mostrar el mes en formato humano (1-12)",
				code: `const fecha = new Date("2026-07-22");
console.log(fecha.getMonth() + 1); // 7`
			},
			{
				titulo: "Ejemplo 6: Fecha inválida",
				code: `const fecha = new Date("Fecha inválida");
console.log(fecha.getMonth()); // NaN`
			}
		],
		errores: [
			{
				texto: "**Pensar que enero es 1:** enero es `0`.",
				code: `const fecha = new Date("2026-01-15");
console.log(fecha.getMonth()); // 0`
			},
			{
				texto: "**Mostrar el número del mes directamente:** para el usuario hay que sumar `1`.",
				code: `const fecha = new Date("2026-07-22");
console.log(fecha.getMonth());     // 6
console.log(fecha.getMonth() + 1); // 7`
			},
			{
				texto: "**Llamarlo sobre una fecha inválida:** devuelve `NaN` sin lanzar error.",
				code: `const fecha = new Date("abc");
console.log(fecha.getMonth()); // NaN`
			}
		],
		casos: [
			"**Mostrar el mes actual** en una interfaz.",
			"**Agrupar ventas o eventos por mes.**",
			"**Crear calendarios** y selectores de mes.",
			"**Validar fechas** dentro de un rango de meses.",
			"**Generar reportes mensuales.**"
		],
		relacion: [
			"**`getUTCMonth()`:** mes en UTC.",
			"**`setMonth()`:** establece el mes.",
			"**`getDate()`:** día del mes (1-31).",
			"**`getDay()`:** día de la semana (0-6).",
			"**`getFullYear()`:** año completo."
		],
		analogia: "Imagina un **archivador con 12 carpetas**, una por mes. JavaScript las numera de `0` (enero) a `11` (diciembre). Cuando llamas a `getMonth()`, te dice en qué carpeta está guardada la fecha. Las personas cuentan desde 1, por eso a veces hay que sumar uno.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: [
			"**Regla para memorizar:** `getMonth()` va de `0` a `11`; suma `1` para mostrarlo.",
			"Enero = `0`, diciembre = `11`.",
			"Devuelve un `number`, no un string."
		],
		quiz: Q([
			[
				"¿Qué devuelve getMonth() para julio?",
				[
					"7",
					"6",
					"06",
					"Julio"
				],
				1
			],
			[
				"¿Qué número corresponde a enero?",
				[
					"1",
					"0",
					"12",
					"11"
				],
				1
			],
			[
				"¿Qué número corresponde a diciembre?",
				[
					"12",
					"11",
					"0",
					"10"
				],
				1
			],
			[
				"¿Cómo se muestra el mes en formato humano (1-12)?",
				[
					"getMonth()",
					"getMonth() + 1",
					"getMonth() - 1",
					"getDate()"
				],
				1
			],
			[
				"¿Qué devuelve getMonth() en una fecha inválida?",
				[
					"0",
					"NaN",
					"null",
					"Un error"
				],
				1
			],
			[
				"¿Qué tipo de dato devuelve getMonth()?",
				[
					"string",
					"number",
					"boolean",
					"object"
				],
				1
			]
		])
	},
	getdate: {
		id: "getdate",
		titulo: "Date.prototype.getDate()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que devuelve el **día del mes** (del `1` al `31`) según la hora local.", "**Importante:** `getDate()` devuelve el día del mes, **no** el día de la semana."],
		queEs: [
			"Es un **getter**: no modifica el objeto.",
			"Devuelve un valor de tipo `number`.",
			"El valor depende de la fecha almacenada en el objeto `Date`.",
			"Usa la hora local del sistema.",
			"Si la fecha es inválida, devuelve `NaN`."
		],
		paraQueSirve: [
			"Mostrar el día actual.",
			"Formatear fechas.",
			"Crear calendarios.",
			"Validar fechas.",
			"Realizar operaciones relacionadas con días del mes.",
			"Generar reportes con fechas."
		],
		comoFunciona: [
			"Se crea un objeto `Date`.",
			"Se llama al método `getDate()`.",
			"JavaScript obtiene el día del mes según la hora local.",
			"Devuelve un número entre `1` y `31`.",
			"Si la fecha es inválida, devuelve `NaN`."
		],
		sintaxis: [{ code: `const dia = fecha.getDate();` }, {
			caption: "El primer día del mes es 1, no 0:",
			code: `new Date("2026-08-01").getDate(); // 1`
		}],
		nota: "**Parámetros:** ninguno. **Retorno:** un `number` entre `1` y `31`, o `NaN` si la fecha es inválida.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Día de una fecha",
				code: `const fecha = new Date("2026-07-22");
console.log(fecha.getDate()); // 22`
			},
			{
				titulo: "Ejemplo 2: Primer día del mes",
				code: `const fecha = new Date("2026-08-01");
console.log(fecha.getDate()); // 1`
			},
			{
				titulo: "Ejemplo 3: Último día de enero",
				code: `const fecha = new Date("2026-01-31");
console.log(fecha.getDate()); // 31`
			},
			{
				titulo: "Ejemplo 4: Diferencia con getDay()",
				code: `const fecha = new Date("2026-07-22");
console.log(fecha.getDate()); // 22 (día del mes)
console.log(fecha.getDay());  // 3  (miércoles)`
			},
			{
				titulo: "Ejemplo 5: Fecha inválida",
				code: `const fecha = new Date("Fecha inválida");
console.log(fecha.getDate()); // NaN`
			}
		],
		errores: [
			{
				texto: "**Confundir `getDate()` con `getDay()`:** el primero es el día del mes; el segundo, el día de la semana.",
				code: `const fecha = new Date("2026-07-22");
console.log(fecha.getDate()); // 22
console.log(fecha.getDay());  // 3`
			},
			{
				texto: "**Pensar que los días empiezan en 0:** el primer día del mes es `1`.",
				code: `console.log(new Date("2026-07-01").getDate()); // 1`
			},
			{
				texto: "**Llamarlo sobre una fecha inválida:** devuelve `NaN`.",
				code: `console.log(new Date("abc").getDate()); // NaN`
			}
		],
		casos: [
			"**Mostrar la fecha actual** en una interfaz.",
			"**Crear calendarios** y resaltar el día de hoy.",
			"**Validar días del mes** (por ejemplo, el 31 solo existe en algunos meses).",
			"**Generar reportes diarios.**",
			"**Formatear fechas** para el usuario."
		],
		relacion: [
			"**`getUTCDate()`:** día del mes en UTC.",
			"**`setDate()`:** establece el día del mes.",
			"**`getDay()`:** día de la semana (0-6).",
			"**`getMonth()`:** mes (0-11).",
			"**`getFullYear()`:** año completo."
		],
		analogia: "Imagina un **calendario de pared**. Cuando miras un cuadro concreto, por ejemplo «22 de julio», el número **22** es el día del mes: eso es exactamente lo que devuelve `getDate()`. No responde «¿es miércoles?», solo «¿qué número de día es dentro del mes?».",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: [
			"**Regla para memorizar:** `getDate()` = día del mes (1-31); `getDay()` = día de la semana (0-6).",
			"El primer día del mes es `1`, no `0`.",
			"Devuelve un `number`."
		],
		quiz: Q([
			[
				"¿Qué devuelve getDate() para el 22 de julio?",
				[
					"22",
					"3",
					"7",
					"Julio"
				],
				0
			],
			[
				"¿Cuál es el rango de valores de getDate()?",
				[
					"0-30",
					"1-31",
					"0-6",
					"1-12"
				],
				1
			],
			[
				"¿Qué devuelve getDay() para el 22 de julio de 2026?",
				[
					"22",
					"3",
					"7",
					"1"
				],
				1
			],
			[
				"¿Cuál es el primer día del mes según getDate()?",
				[
					"0",
					"1",
					"31",
					"Depende del mes"
				],
				1
			],
			[
				"¿Qué devuelve getDate() en una fecha inválida?",
				[
					"0",
					"NaN",
					"1",
					"Un error"
				],
				1
			],
			[
				"¿getDate() modifica la fecha?",
				[
					"Sí",
					"No, es un getter",
					"Solo en UTC",
					"Solo en modo estricto"
				],
				1
			]
		])
	},
	getday: {
		id: "getday",
		titulo: "Date.prototype.getDay()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que devuelve el **día de la semana** según la hora local, como un número entre **0 y 6**.", "**Importante:** `getDay()` devuelve el día de la semana, **no** el día del mes."],
		queEs: [
			"Es un **getter**: no modifica el objeto.",
			"Devuelve un valor de tipo `number`.",
			"Usa la hora local del sistema.",
			"La semana empieza en **domingo (`0`)**.",
			"Si la fecha es inválida, devuelve `NaN`."
		],
		paraQueSirve: [
			"Mostrar el nombre del día de la semana.",
			"Crear calendarios.",
			"Verificar si una fecha es fin de semana.",
			"Programar tareas según el día.",
			"Realizar validaciones relacionadas con días laborales."
		],
		comoFunciona: [
			"Se crea un objeto `Date`.",
			"Se llama a `getDay()`.",
			"JavaScript calcula el día de la semana correspondiente.",
			"Devuelve un número entre `0` y `6`.",
			"Si la fecha es inválida, devuelve `NaN`."
		],
		sintaxis: [{ code: `const diaSemana = fecha.getDay();` }, {
			caption: "Tabla de valores:",
			code: `0 → Domingo
1 → Lunes
2 → Martes
3 → Miércoles
4 → Jueves
5 → Viernes
6 → Sábado`
		}],
		nota: "**Parámetros:** ninguno. **Retorno:** un `number` entre `0` y `6`, o `NaN` si la fecha es inválida.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Día de la semana de una fecha",
				code: `const fecha = new Date("2026-07-22");
console.log(fecha.getDay()); // 3 (miércoles)`
			},
			{
				titulo: "Ejemplo 2: Mostrar el nombre del día",
				code: `const dias = [
  "Domingo", "Lunes", "Martes", "Miércoles",
  "Jueves", "Viernes", "Sábado",
];

const fecha = new Date();
console.log(dias[fecha.getDay()]);`
			},
			{
				titulo: "Ejemplo 3: Verificar si es fin de semana",
				code: `const dia = new Date().getDay();
const esFinDeSemana = dia === 0 || dia === 6;
console.log(esFinDeSemana);`
			},
			{
				titulo: "Ejemplo 4: Diferencia con getDate()",
				code: `const fecha = new Date("2026-07-22");
console.log(fecha.getDay());  // 3
console.log(fecha.getDate()); // 22`
			},
			{
				titulo: "Ejemplo 5: Fecha inválida",
				code: `const fecha = new Date("Fecha inválida");
console.log(fecha.getDay()); // NaN`
			}
		],
		errores: [
			{
				texto: "**Confundir `getDay()` con `getDate()`:** `getDay()` es el día de la semana; `getDate()`, el día del mes.",
				code: `const fecha = new Date("2026-07-22");
console.log(fecha.getDay());  // 3
console.log(fecha.getDate()); // 22`
			},
			{
				texto: "**Pensar que el lunes es 0:** la semana empieza en **domingo**.",
				code: `// 0 → Domingo, 1 → Lunes, ..., 6 → Sábado
console.log(new Date(2026, 6, 20).getDay()); // 1 (lunes)`
			},
			{
				texto: "**Llamarlo sobre una fecha inválida:** devuelve `NaN`.",
				code: `console.log(new Date("abc").getDay()); // NaN`
			}
		],
		casos: [
			"**Mostrar el nombre del día actual.**",
			"**Determinar si una fecha es laboral.**",
			"**Verificar fines de semana.**",
			"**Programar recordatorios** según el día.",
			"**Construir calendarios** con las columnas de la semana."
		],
		relacion: [
			"**`getUTCDay()`:** día de la semana en UTC.",
			"**`getDate()`:** día del mes (1-31).",
			"**`getMonth()`:** mes (0-11).",
			"**`getFullYear()`:** año completo.",
			"**`getHours()`:** hora local."
		],
		analogia: "Mirando el mismo calendario: `getDate()` responde «¿qué número tiene este día dentro del mes?» → `22`; mientras que `getDay()` responde «¿qué día de la semana es?» → *miércoles*. Son dos preguntas distintas sobre el mismo cuadro.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: [
			"**Regla para memorizar:** `getDay()` va de `0` (domingo) a `6` (sábado).",
			"No existe `setDay()`: el día de la semana se deriva de la fecha.",
			"Devuelve un `number`."
		],
		quiz: Q([
			[
				"¿Qué devuelve getDay() para un miércoles?",
				[
					"3",
					"22",
					"2",
					"4"
				],
				0
			],
			[
				"¿Qué día corresponde al valor 0?",
				[
					"Lunes",
					"Domingo",
					"Sábado",
					"Viernes"
				],
				1
			],
			[
				"¿Qué día corresponde al valor 6?",
				[
					"Domingo",
					"Sábado",
					"Viernes",
					"Lunes"
				],
				1
			],
			[
				"¿Cuál es el rango de getDay()?",
				[
					"1-7",
					"0-6",
					"1-31",
					"0-11"
				],
				1
			],
			[
				"¿Qué devuelve getDay() en una fecha inválida?",
				[
					"0",
					"NaN",
					"null",
					"Un error"
				],
				1
			],
			[
				"¿Existe setDay() para cambiar el día de la semana?",
				[
					"Sí",
					"No, no existe",
					"Solo en UTC",
					"Solo en Node.js"
				],
				1
			]
		])
	},
	gethours: {
		id: "gethours",
		titulo: "Date.prototype.getHours()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que devuelve la **hora** de una fecha según la hora local, como un número entre **0 y 23**.", "**Importante:** usa el formato de **24 horas**, no el de 12 horas."],
		queEs: [
			"Es un **getter**: no modifica el objeto.",
			"Devuelve un valor de tipo `number`.",
			"Usa la zona horaria local del sistema.",
			"Para la hora en UTC se usa `getUTCHours()`.",
			"Si la fecha es inválida, devuelve `NaN`."
		],
		paraQueSirve: [
			"Mostrar la hora actual.",
			"Crear relojes digitales.",
			"Validar horarios.",
			"Programar tareas según la hora.",
			"Formatear fechas y horas.",
			"Registrar eventos con fecha y hora."
		],
		comoFunciona: [
			"Se crea un objeto `Date`.",
			"Se llama al método `getHours()`.",
			"JavaScript obtiene la hora local almacenada en el objeto.",
			"Devuelve un número entre `0` y `23`.",
			"Si la fecha es inválida, devuelve `NaN`."
		],
		sintaxis: [{ code: `const hora = fecha.getHours();` }, {
			caption: "La medianoche es 0 y la última hora del día es 23:",
			code: `new Date("2026-07-22T00:00:00").getHours(); // 0
new Date("2026-07-22T23:59:59").getHours(); // 23`
		}],
		nota: "**Parámetros:** ninguno. **Retorno:** un `number` entre `0` y `23`, o `NaN` si la fecha es inválida.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Hora de una fecha",
				code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.getHours()); // 18`
			},
			{
				titulo: "Ejemplo 2: Medianoche",
				code: `const fecha = new Date("2026-07-22T00:00:00");
console.log(fecha.getHours()); // 0`
			},
			{
				titulo: "Ejemplo 3: Última hora del día",
				code: `const fecha = new Date("2026-07-22T23:59:59");
console.log(fecha.getHours()); // 23`
			},
			{
				titulo: "Ejemplo 4: Diferencia con getUTCHours()",
				code: `const fecha = new Date("2026-07-22T18:45:30Z");
console.log(fecha.getHours());    // hora local
console.log(fecha.getUTCHours()); // 18`
			},
			{
				titulo: "Ejemplo 5: Fecha inválida",
				code: `const fecha = new Date("Fecha inválida");
console.log(fecha.getHours()); // NaN`
			}
		],
		errores: [
			{
				texto: "**Pensar que devuelve el formato de 12 horas:** devuelve `15`, no `3 PM`.",
				code: `const fecha = new Date("2026-07-22T15:00:00");
console.log(fecha.getHours()); // 15`
			},
			{
				texto: "**Confundir `getHours()` con `getUTCHours()`:** el primero usa la hora local.",
				code: `const fecha = new Date();
console.log(fecha.getHours());    // local
console.log(fecha.getUTCHours()); // UTC`
			},
			{
				texto: "**Llamarlo sobre una fecha inválida:** devuelve `NaN`.",
				code: `console.log(new Date("abc").getHours()); // NaN`
			}
		],
		casos: [
			"**Mostrar la hora actual.**",
			"**Crear relojes digitales.**",
			"**Programar recordatorios.**",
			"**Validar horarios de atención.**",
			"**Registrar eventos con fecha y hora.**"
		],
		relacion: [
			"**`getUTCHours()`:** hora en UTC.",
			"**`setHours()`:** establece la hora.",
			"**`getMinutes()`:** minutos (0-59).",
			"**`getSeconds()`:** segundos (0-59).",
			"**`getMilliseconds()`:** milisegundos (0-999)."
		],
		analogia: "Imagina un **reloj digital** que muestra `18:45:30`. Cada método obtiene una parte distinta: `getHours()` → `18`, `getMinutes()` → `45` y `getSeconds()` → `30`. `getHours()` solo se fija en la hora e ignora los minutos y los segundos.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: [
			"**Regla para memorizar:** `getHours()` va de `0` a `23` (formato 24 h).",
			"Usa `getUTCHours()` si necesitas la hora en UTC.",
			"Devuelve un `number`."
		],
		quiz: Q([
			[
				"¿Qué devuelve getHours() para las 18:45:30?",
				[
					"18",
					"45",
					"30",
					"6"
				],
				0
			],
			[
				"¿Cuál es el rango de getHours()?",
				[
					"0-12",
					"0-23",
					"1-24",
					"0-59"
				],
				1
			],
			[
				"¿Qué devuelve getHours() a medianoche?",
				[
					"0",
					"12",
					"24",
					"NaN"
				],
				0
			],
			[
				"¿Qué método devuelve la hora en UTC?",
				[
					"getHours()",
					"getUTCHours()",
					"getTime()",
					"getDay()"
				],
				1
			],
			[
				"¿getHours() usa formato de 12 o 24 horas?",
				[
					"12 horas",
					"24 horas",
					"Depende del locale",
					"Depende del navegador"
				],
				1
			],
			[
				"¿Qué devuelve getHours() en una fecha inválida?",
				[
					"0",
					"NaN",
					"null",
					"Un error"
				],
				1
			]
		])
	},
	getminutes: {
		id: "getminutes",
		titulo: "Date.prototype.getMinutes()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que devuelve los **minutos** de una fecha según la hora local, como un número entre **0 y 59**.", "**Importante:** devuelve únicamente los minutos, no la hora completa."],
		queEs: [
			"Es un **getter**: no modifica el objeto.",
			"Devuelve un valor de tipo `number`.",
			"Usa la zona horaria local del sistema.",
			"Para los minutos en UTC se usa `getUTCMinutes()`.",
			"Si la fecha es inválida, devuelve `NaN`."
		],
		paraQueSirve: [
			"Mostrar los minutos actuales.",
			"Crear relojes digitales.",
			"Formatear horas.",
			"Validar horarios.",
			"Programar tareas según la hora.",
			"Registrar eventos con precisión."
		],
		comoFunciona: [
			"Se crea un objeto `Date`.",
			"Se llama al método `getMinutes()`.",
			"JavaScript obtiene los minutos de la hora local.",
			"Devuelve un número entre `0` y `59`.",
			"Si la fecha es inválida, devuelve `NaN`."
		],
		sintaxis: [{ code: `const minutos = fecha.getMinutes();` }, {
			caption: "Rellena con cero para mostrar dos dígitos:",
			code: `String(fecha.getMinutes()).padStart(2, "0");`
		}],
		nota: "**Parámetros:** ninguno. **Retorno:** un `number` entre `0` y `59`, o `NaN` si la fecha es inválida.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Minutos de una fecha",
				code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.getMinutes()); // 45`
			},
			{
				titulo: "Ejemplo 2: Hora exacta",
				code: `const fecha = new Date("2026-07-22T14:00:00");
console.log(fecha.getMinutes()); // 0`
			},
			{
				titulo: "Ejemplo 3: Último minuto de la hora",
				code: `const fecha = new Date("2026-07-22T18:59:59");
console.log(fecha.getMinutes()); // 59`
			},
			{
				titulo: "Ejemplo 4: Diferencia con getMonth()",
				code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.getMinutes()); // 45
console.log(fecha.getMonth());   // 6`
			},
			{
				titulo: "Ejemplo 5: Fecha inválida",
				code: `const fecha = new Date("Fecha inválida");
console.log(fecha.getMinutes()); // NaN`
			}
		],
		errores: [
			{
				texto: "**Confundir `getMinutes()` con `getMonth()`:** uno devuelve los minutos y el otro el mes.",
				code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.getMinutes()); // 45
console.log(fecha.getMonth());   // 6`
			},
			{
				texto: "**Pensar que devuelve la hora completa:** solo devuelve los minutos.",
				code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.getMinutes()); // 45 (no "18:45")`
			},
			{
				texto: "**Llamarlo sobre una fecha inválida:** devuelve `NaN`.",
				code: `console.log(new Date("abc").getMinutes()); // NaN`
			}
		],
		casos: [
			"**Mostrar los minutos actuales.**",
			"**Crear relojes digitales.**",
			"**Validar horarios.**",
			"**Registrar eventos con precisión.**",
			"**Formatear fechas y horas.**"
		],
		relacion: [
			"**`getUTCMinutes()`:** minutos en UTC.",
			"**`setMinutes()`:** establece los minutos.",
			"**`getHours()`:** hora (0-23).",
			"**`getSeconds()`:** segundos (0-59).",
			"**`getMilliseconds()`:** milisegundos (0-999)."
		],
		analogia: "En el mismo reloj digital `18:45:30`, `getMinutes()` solo observa la **parte central**: los minutos (`45`). No le importan la hora ni los segundos.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: [
			"**Regla para memorizar:** `getMinutes()` va de `0` a `59`.",
			"No lo confundas con `getMonth()` (mes).",
			"Devuelve un `number`."
		],
		quiz: Q([
			[
				"¿Qué devuelve getMinutes() para las 18:45:30?",
				[
					"18",
					"45",
					"30",
					"6"
				],
				1
			],
			[
				"¿Cuál es el rango de getMinutes()?",
				[
					"0-23",
					"0-59",
					"1-60",
					"0-11"
				],
				1
			],
			[
				"¿Qué devuelve getMinutes() a la hora exacta 14:00?",
				[
					"0",
					"14",
					"60",
					"NaN"
				],
				0
			],
			[
				"¿Qué método devuelve los minutos en UTC?",
				[
					"getMinutes()",
					"getUTCMinutes()",
					"getTime()",
					"getMonth()"
				],
				1
			],
			[
				"¿Qué devuelve getMinutes() en una fecha inválida?",
				[
					"0",
					"NaN",
					"null",
					"Un error"
				],
				1
			],
			[
				"¿Qué diferencia hay entre getMinutes() y getMonth()?",
				[
					"Son iguales",
					"getMinutes devuelve minutos y getMonth devuelve el mes",
					"getMonth devuelve minutos y getMinutes el mes",
					"Ninguno existe"
				],
				1
			]
		])
	},
	getseconds: {
		id: "getseconds",
		titulo: "Date.prototype.getSeconds()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que devuelve los **segundos** de una fecha según la hora local, como un número entre **0 y 59**.", "**Importante:** devuelve únicamente los segundos, no la hora completa."],
		queEs: [
			"Es un **getter**: no modifica el objeto.",
			"Devuelve un valor de tipo `number`.",
			"Usa la zona horaria local del sistema.",
			"Para los segundos en UTC se usa `getUTCSeconds()`.",
			"Si la fecha es inválida, devuelve `NaN`."
		],
		paraQueSirve: [
			"Mostrar los segundos actuales.",
			"Crear cronómetros y relojes.",
			"Medir el paso del tiempo.",
			"Formatear fechas y horas.",
			"Registrar eventos con precisión.",
			"Actualizar interfaces en tiempo real."
		],
		comoFunciona: [
			"Se crea un objeto `Date`.",
			"Se llama al método `getSeconds()`.",
			"JavaScript obtiene los segundos de la hora local.",
			"Devuelve un número entre `0` y `59`.",
			"Si la fecha es inválida, devuelve `NaN`."
		],
		sintaxis: [{ code: `const segundos = fecha.getSeconds();` }, {
			caption: "No confundir con los milisegundos:",
			code: `new Date("2026-07-22T18:45:30.500").getSeconds();      // 30
new Date("2026-07-22T18:45:30.500").getMilliseconds(); // 500`
		}],
		nota: "**Parámetros:** ninguno. **Retorno:** un `number` entre `0` y `59`, o `NaN` si la fecha es inválida.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Segundos de una fecha",
				code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.getSeconds()); // 30`
			},
			{
				titulo: "Ejemplo 2: Inicio del minuto",
				code: `const fecha = new Date("2026-07-22T14:15:00");
console.log(fecha.getSeconds()); // 0`
			},
			{
				titulo: "Ejemplo 3: Último segundo del minuto",
				code: `const fecha = new Date("2026-07-22T18:59:59");
console.log(fecha.getSeconds()); // 59`
			},
			{
				titulo: "Ejemplo 4: Diferencia con getMilliseconds()",
				code: `const fecha = new Date("2026-07-22T18:45:30.500");
console.log(fecha.getSeconds());      // 30
console.log(fecha.getMilliseconds()); // 500`
			},
			{
				titulo: "Ejemplo 5: Fecha inválida",
				code: `const fecha = new Date("Fecha inválida");
console.log(fecha.getSeconds()); // NaN`
			}
		],
		errores: [
			{
				texto: "**Confundir `getSeconds()` con `getMilliseconds()`:** uno devuelve segundos y el otro milisegundos.",
				code: `const fecha = new Date("2026-07-22T18:45:30.500");
console.log(fecha.getSeconds());      // 30
console.log(fecha.getMilliseconds()); // 500`
			},
			{
				texto: "**Pensar que devuelve la hora completa:** solo devuelve los segundos.",
				code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.getSeconds()); // 30 (no "18:45:30")`
			},
			{
				texto: "**Llamarlo sobre una fecha inválida:** devuelve `NaN`.",
				code: `console.log(new Date("abc").getSeconds()); // NaN`
			}
		],
		casos: [
			"**Mostrar los segundos actuales.**",
			"**Crear cronómetros y relojes.**",
			"**Registrar eventos con precisión.**",
			"**Actualizar interfaces en tiempo real.**",
			"**Medir intervalos de tiempo.**"
		],
		relacion: [
			"**`getUTCSeconds()`:** segundos en UTC.",
			"**`setSeconds()`:** establece los segundos.",
			"**`getHours()`:** hora (0-23).",
			"**`getMinutes()`:** minutos (0-59).",
			"**`getMilliseconds()`:** milisegundos (0-999)."
		],
		analogia: "En un **cronómetro** que muestra `18:45:30`, `getSeconds()` solo observa la **parte final**: los segundos (`30`). Los milisegundos serían la parte aún más fina del mismo cronómetro.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: [
			"**Regla para memorizar:** `getSeconds()` va de `0` a `59`.",
			"No lo confundas con `getMilliseconds()` (0-999).",
			"Devuelve un `number`."
		],
		quiz: Q([
			[
				"¿Qué devuelve getSeconds() para las 18:45:30?",
				[
					"18",
					"45",
					"30",
					"500"
				],
				2
			],
			[
				"¿Cuál es el rango de getSeconds()?",
				[
					"0-23",
					"0-59",
					"0-999",
					"0-11"
				],
				1
			],
			[
				"¿Qué devuelve getMilliseconds() para 18:45:30.500?",
				[
					"30",
					"500",
					"0",
					"59"
				],
				1
			],
			[
				"¿Qué método devuelve los segundos en UTC?",
				[
					"getSeconds()",
					"getUTCSeconds()",
					"getTime()",
					"getMinutes()"
				],
				1
			],
			[
				"¿Qué devuelve getSeconds() en una fecha inválida?",
				[
					"0",
					"NaN",
					"null",
					"Un error"
				],
				1
			],
			[
				"¿Qué devuelve getSeconds() en el inicio de un minuto?",
				[
					"0",
					"1",
					"60",
					"NaN"
				],
				0
			]
		])
	},
	setfullyear: {
		id: "setfullyear",
		titulo: "Date.prototype.setFullYear()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que **establece el año completo** de un objeto `Date` según la hora local, pudiendo también establecer opcionalmente el **mes** y el **día**.", "A diferencia de `setYear()` (obsoleto, de 2 dígitos), `setFullYear()` trabaja con el año completo de 4 dígitos."],
		queEs: [
			"Es un **setter mutable**: modifica el objeto `Date` original, no crea uno nuevo.",
			"Mantiene la hora, los minutos, los segundos y los milisegundos existentes.",
			"Si no se pasan `month` ni `day`, conserva los actuales.",
			"Admite años negativos (años antes de Cristo).",
			"Actualiza el *timestamp* interno del objeto.",
			"Devuelve el nuevo *timestamp* en milisegundos."
		],
		paraQueSirve: [
			"Actualizar el año de una fecha existente.",
			"Crear fechas modificando solo el año.",
			"Implementar cálculos de fechas (por ejemplo, sumar años).",
			"Establecer fechas límite de expiración o renovación.",
			"Corregir años incorrectos en fechas.",
			"Generar fechas recurrentes anuales (aniversarios, cumpleaños).",
			"Implementar navegación de calendarios por año."
		],
		comoFunciona: [
			"Modifica el año del objeto `Date` según la hora local.",
			"Si se proporcionan `month` y `day`, también se actualizan.",
			"Los **meses van de 0 a 11**.",
			"Los valores fuera de rango se ajustan automáticamente (*overflow*).",
			"Si algún parámetro es inválido, el objeto queda como fecha inválida.",
			"Retorna el *timestamp* en milisegundos del objeto modificado."
		],
		sintaxis: [{ code: `fecha.setFullYear(year)
fecha.setFullYear(year, month)
fecha.setFullYear(year, month, day)` }, {
			caption: "El mes es base 0 (0 = enero, 11 = diciembre):",
			code: `const date = new Date(2024, 5, 15);
date.setFullYear(2025, 0, 1);
console.log(date.toISOString()); // 2025-01-01...`
		}],
		nota: "**Parámetros:** `year` (obligatorio, año completo), `month` (opcional, 0-11) y `day` (opcional, 1-31). **Retorno:** el *timestamp* en milisegundos del objeto modificado.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Cambiar solo el año",
				code: `const date = new Date(2024, 11, 25, 10, 30);
date.setFullYear(2025);

console.log(date.getFullYear()); // 2025
console.log(date.getMonth());    // 11 (se mantiene)
console.log(date.getDate());     // 25 (se mantiene)
console.log(date.getHours());    // 10 (se mantiene)`
			},
			{
				titulo: "Ejemplo 2: Año, mes y día",
				code: `const date = new Date(2024, 5, 15);
date.setFullYear(2025, 0, 1);
console.log(date.toISOString()); // 2025-01-01T...`
			},
			{
				titulo: "Ejemplo 3: Sumar años",
				code: `function addYears(date, years) {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
}

const start = new Date(2024, 0, 1);
console.log(addYears(start, 5).getFullYear()); // 2029`
			},
			{
				titulo: "Ejemplo 4: Ajuste automático (31 de febrero)",
				code: `const date = new Date(2024, 0, 31); // 31 de enero
date.setFullYear(2024, 1, 31);      // 31 de febrero

console.log(date.getMonth()); // 2 (marzo)
console.log(date.getDate());  // 2 (2 de marzo)`
			},
			{
				titulo: "Ejemplo 5: Renovar una suscripción",
				code: `function renewSubscription(subscription) {
  const nueva = new Date(subscription.expiryDate);
  nueva.setFullYear(nueva.getFullYear() + 1);
  subscription.expiryDate = nueva;
  return subscription;
}

const sub = { userId: 1, expiryDate: new Date(2024, 11, 31) };
renewSubscription(sub);
console.log(sub.expiryDate.getFullYear()); // 2025`
			},
			{
				titulo: "Ejemplo 6: Valor inválido",
				code: `const date = new Date();
date.setFullYear(NaN);
console.log(Number.isNaN(date.getTime())); // true`
			}
		],
		errores: [
			{
				texto: "**Usar `setYear()` en lugar de `setFullYear()`:** `setYear()` está obsoleto.",
				code: `// ❌ Obsoleto
date.setYear(2024);

// ✅ Correcto
date.setFullYear(2024);`
			},
			{
				texto: "**Pasar años de 2 dígitos:** `99` establece el año 99 d.C., no 1999.",
				code: `date.setFullYear(99);   // año 99
date.setFullYear(1999); // año 1999`
			},
			{
				texto: "**Olvidar que los meses empiezan en 0:** el mes `12` produce *overflow* a enero del año siguiente.",
				code: `date.setFullYear(2024, 12, 1); // enero de 2025
date.setFullYear(2024, 11, 1); // diciembre de 2024`
			},
			{
				texto: "**Olvidar que modifica el objeto original:** si necesitas conservar la fecha, clónala antes.",
				code: `const original = new Date(2024, 0, 1);
const copy = original; // ⚠️ misma referencia
copy.setFullYear(2025);
console.log(original.getFullYear()); // 2025

// ✅ Copia independiente
const copia = new Date(original);`
			}
		],
		casos: [
			"**Renovación de suscripciones y licencias** anuales.",
			"**Cumpleaños y aniversarios:** mover la fecha al año actual.",
			"**Navegación de calendarios:** cambiar de año.",
			"**Fechas límite** de expiración o vencimiento.",
			"**Corrección de datos** con años mal ingresados."
		],
		relacion: [
			"**`getFullYear()`:** obtiene el año.",
			"**`setUTCFullYear()`:** establece el año en UTC.",
			"**`setYear()`:** obsoleto.",
			"**`setMonth()`:** establece el mes.",
			"**`setDate()`:** establece el día del mes."
		],
		analogia: "`setFullYear()` es como **cambiar la hoja del año en un calendario de pared**: mueves solo el año y dejas intactos el mes, el día y la hora. Si fuerzas una combinación imposible (como el 31 de febrero), el calendario se ajusta solo al mes siguiente.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: [
			"**Regla para memorizar:** `setFullYear(year, month, day)`; el mes es base 0.",
			"Es **mutable**: modifica el objeto original.",
			"Devuelve el *timestamp* en milisegundos."
		],
		quiz: Q([
			[
				"¿Qué hace setFullYear(2025) sobre una fecha de 2024?",
				[
					"Cambia solo el año y mantiene mes, día y hora",
					"Cambia el año y pone enero y día 1",
					"Devuelve una fecha nueva sin modificar la original",
					"Lanza un error"
				],
				0
			],
			[
				"¿Qué rango tiene el parámetro month?",
				[
					"1-12",
					"0-11",
					"0-6",
					"1-31"
				],
				1
			],
			[
				"¿setFullYear() modifica el objeto original?",
				[
					"Sí, es mutable",
					"No, devuelve uno nuevo",
					"Solo en UTC",
					"Solo si el año es bisiesto"
				],
				0
			],
			[
				"¿Qué devuelve setFullYear()?",
				[
					"El objeto Date",
					"El año",
					"El timestamp en milisegundos",
					"undefined"
				],
				2
			],
			[
				"¿Qué ocurre con setFullYear(2024, 1, 31)?",
				[
					"Lanza un error",
					"Se ajusta al 2 de marzo",
					"Devuelve el 31 de febrero",
					"Devuelve Invalid Date"
				],
				1
			],
			[
				"¿Qué método está obsoleto y no debería usarse?",
				[
					"setFullYear()",
					"setYear()",
					"getFullYear()",
					"setDate()"
				],
				1
			]
		])
	},
	setdate: {
		id: "setdate",
		titulo: "Date.prototype.setDate()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que **establece el día del mes** (1-31) de un objeto `Date` según la hora local, ajustando automáticamente el mes y el año si es necesario.", "Permite cambiar el día manteniendo el mes y el año existentes, con manejo automático de *overflows*."],
		queEs: [
			"Es un **setter mutable**: modifica el objeto `Date` original.",
			"La hora, los minutos, los segundos y los milisegundos se mantienen.",
			"Admite valores fuera de rango y los ajusta automáticamente.",
			"`setDate(0)` devuelve el último día del mes anterior.",
			"**No existe `setDay()`**: el día de la semana se deriva de la fecha.",
			"Devuelve el nuevo *timestamp* en milisegundos."
		],
		paraQueSirve: [
			"Cambiar el día de una fecha existente.",
			"Sumar o restar días a una fecha.",
			"Implementar navegación de calendarios (día siguiente o anterior).",
			"Establecer fechas específicas dentro de un mes.",
			"Manejar ajustes automáticos de fin de mes.",
			"Generar fechas recurrentes (mismo día cada mes).",
			"Crear rangos de fechas día a día."
		],
		comoFunciona: [
			"Establece el día del mes (1-31) según la hora local.",
			"Si el día existe en el mes actual, se asigna directamente.",
			"Si el día es mayor que los días del mes, se ajusta al mes siguiente.",
			"Si el día es `0` o negativo, se ajusta al mes anterior.",
			"La hora y los minutos se mantienen sin cambios.",
			"Si el parámetro es inválido, el objeto queda como fecha inválida."
		],
		sintaxis: [{ code: `fecha.setDate(day)` }, {
			caption: "Ajustes automáticos:",
			code: `// 32 de enero → 1 de febrero
new Date(2024, 0, 31).setDate(32);

// Día 0 → último día del mes anterior
new Date(2024, 0, 15).setDate(0); // 31 de diciembre de 2023`
		}],
		nota: "**Parámetro:** `day` (obligatorio), día del mes; se aceptan valores fuera de rango con ajuste automático. **Retorno:** el *timestamp* en milisegundos del objeto modificado.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Cambiar el día",
				code: `const date = new Date(2024, 11, 25);
date.setDate(15);

console.log(date.getDate());      // 15
console.log(date.getMonth());     // 11 (diciembre)
console.log(date.getFullYear());  // 2024`
			},
			{
				titulo: "Ejemplo 2: Día mayor que los días del mes",
				code: `const date = new Date(2024, 0, 31); // 31 de enero
date.setDate(32);

console.log(date.getDate());  // 1
console.log(date.getMonth()); // 1 (febrero)`
			},
			{
				titulo: "Ejemplo 3: Día 0 (último día del mes anterior)",
				code: `const date = new Date(2024, 0, 15);
date.setDate(0);

console.log(date.getDate());     // 31
console.log(date.getMonth());    // 11 (diciembre)
console.log(date.getFullYear()); // 2023`
			},
			{
				titulo: "Ejemplo 4: Sumar días",
				code: `function addDays(date, days) {
  const nueva = new Date(date);
  nueva.setDate(nueva.getDate() + days);
  return nueva;
}

const start = new Date(2024, 0, 1);
console.log(addDays(start, 5).toISOString());  // 2024-01-06
console.log(addDays(start, 31).toISOString()); // 2024-02-01`
			},
			{
				titulo: "Ejemplo 5: Último día del mes",
				code: `function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

console.log(getLastDayOfMonth(2024, 0)); // 31
console.log(getLastDayOfMonth(2024, 1)); // 29 (bisiesto)
console.log(getLastDayOfMonth(2023, 1)); // 28`
			},
			{
				titulo: "Ejemplo 6: Generar un rango de fechas",
				code: `function dateRange(startDate, endDate) {
  const fechas = [];
  const actual = new Date(startDate);

  while (actual <= endDate) {
    fechas.push(new Date(actual));
    actual.setDate(actual.getDate() + 1);
  }
  return fechas;
}

console.log(dateRange(new Date(2024, 6, 1), new Date(2024, 6, 10)).length); // 10`
			}
		],
		errores: [
			{
				texto: "**No considerar el ajuste automático:** `setDate(32)` no da error, salta al mes siguiente.",
				code: `const date = new Date(2024, 0, 31);
date.setDate(32);
console.log(date.getDate()); // 1 (febrero)`
			},
			{
				texto: "**Asumir que `setDate(0)` da error:** es válido y devuelve el último día del mes anterior.",
				code: `const date = new Date(2024, 0, 15);
date.setDate(0);
console.log(date.getDate()); // 31`
			},
			{
				texto: "**Buscar `setDay()`:** no existe; solo se puede establecer el día del mes.",
				code: `// ❌ TypeError: date.setDay is not a function
date.setDay(1);

// ✅ Para el día del mes
date.setDate(1);`
			},
			{
				texto: "**Olvidar que modifica el objeto original:** clona la fecha si necesitas conservarla.",
				code: `const original = new Date(2024, 6, 15);
const copy = original; // ⚠️ misma referencia
copy.setDate(20);
console.log(original.getDate()); // 20

const copia = new Date(original); // ✅ independiente`
			}
		],
		casos: [
			"**Navegación de calendario:** día siguiente y día anterior.",
			"**Rangos de fechas:** listar todos los días entre dos fechas.",
			"**Fin de mes:** calcular el último día del mes.",
			"**Fechas recurrentes:** el mismo día de cada mes.",
			"**Vencimientos:** sumar o restar días a una fecha."
		],
		relacion: [
			"**`getDate()`:** obtiene el día del mes.",
			"**`setUTCDate()`:** establece el día del mes en UTC.",
			"**`setMonth()`:** establece el mes.",
			"**`setFullYear()`:** establece el año.",
			"**`setHours()` / `setMinutes()`:** ajustan la parte horaria."
		],
		analogia: "`setDate()` es como **mover el dedo por un calendario**: si estás en el 31 de enero y avanzas un día más allá del último, el calendario pasa solo al 1 de febrero. Si retrocedes por debajo del día 1, retrocede al último día del mes anterior.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: [
			"**Regla para memorizar:** `setDate(n)` fija el día del mes y ajusta mes y año si hace falta.",
			"`setDate(0)` = último día del mes anterior.",
			"No existe `setDay()`."
		],
		quiz: Q([
			[
				"¿Qué establece setDate(15)?",
				[
					"El mes",
					"El día del mes",
					"El día de la semana",
					"El año"
				],
				1
			],
			[
				"¿Qué ocurre con setDate(32) en enero?",
				[
					"Lanza un error",
					"Se ajusta al 1 de febrero",
					"Devuelve 32",
					"Devuelve Invalid Date"
				],
				1
			],
			[
				"¿Qué devuelve setDate(0) en enero?",
				[
					"0",
					"El último día de diciembre del año anterior",
					"El primer día de enero",
					"Un error"
				],
				1
			],
			[
				"¿Existe setDay()?",
				[
					"Sí",
					"No, no existe",
					"Solo en UTC",
					"Solo en Node.js"
				],
				1
			],
			[
				"¿Qué devuelve setDate()?",
				[
					"El día",
					"El objeto Date",
					"El timestamp en milisegundos",
					"undefined"
				],
				2
			],
			[
				"¿Cómo se calcula el último día de un mes?",
				[
					"new Date(year, month + 1, 0).getDate()",
					"new Date(year, month, 32).getDate()",
					"new Date(year, month).getDate()",
					"new Date(year, month, 1).getDate()"
				],
				0
			]
		])
	},
	sethours: {
		id: "sethours",
		titulo: "Date.prototype.setHours()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que **establece las horas** (0-23) de un objeto `Date` según la hora local, pudiendo también establecer opcionalmente los **minutos**, **segundos** y **milisegundos**.", "Permite cambiar la hora manteniendo el resto de componentes, con manejo automático de *overflows*."],
		queEs: [
			"Es un **setter mutable**: modifica el objeto `Date` original.",
			"Si solo se pasan horas, se mantienen los minutos, segundos y milisegundos.",
			"Los valores fuera de rango se ajustan automáticamente.",
			"Trabaja con la **hora local**, no con UTC.",
			"Devuelve el nuevo *timestamp* en milisegundos."
		],
		paraQueSirve: [
			"Cambiar la hora de una fecha existente.",
			"Sumar o restar horas a una fecha.",
			"Implementar temporizadores y cronómetros.",
			"Ajustar horas para conversiones de zona horaria.",
			"Establecer horas exactas (medianoche, mediodía, fin del día).",
			"Manejar ajustes automáticos de días.",
			"Crear marcas de tiempo con precisión horaria."
		],
		comoFunciona: [
			"Establece las horas (0-23) y opcionalmente minutos, segundos y milisegundos.",
			"Si solo se pasan horas, conserva el resto de componentes.",
			"Horas mayores que 23 se ajustan al día siguiente.",
			"Horas negativas se ajustan al día anterior.",
			"Los minutos, segundos y milisegundos también se ajustan si están fuera de rango.",
			"Retorna el *timestamp* en milisegundos del objeto modificado."
		],
		sintaxis: [{ code: `fecha.setHours(hours)
fecha.setHours(hours, minutes)
fecha.setHours(hours, minutes, seconds)
fecha.setHours(hours, minutes, seconds, milliseconds)` }, {
			caption: "Valores fuera de rango:",
			code: `// 25 h → 1:00 del día siguiente
new Date(2024, 11, 25, 10, 30).setHours(25);

// -1 h → 23:00 del día anterior
new Date(2024, 11, 25, 10, 30).setHours(-1);`
		}],
		nota: "**Parámetros:** `hours` (obligatorio, 0-23), `minutes` (0-59), `seconds` (0-59) y `milliseconds` (0-999), todos opcionales. **Retorno:** el *timestamp* en milisegundos del objeto modificado.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Cambiar solo las horas",
				code: `const date = new Date(2024, 11, 25, 10, 30);
date.setHours(15);

console.log(date.getHours());   // 15
console.log(date.getMinutes()); // 30 (se mantiene)`
			},
			{
				titulo: "Ejemplo 2: Horas, minutos, segundos y milisegundos",
				code: `const date = new Date(2024, 11, 25, 10, 30, 45, 500);
date.setHours(15, 20, 30, 200);

console.log(date.getHours());        // 15
console.log(date.getMinutes());      // 20
console.log(date.getSeconds());      // 30
console.log(date.getMilliseconds()); // 200`
			},
			{
				titulo: "Ejemplo 3: Ajuste automático",
				code: `const date = new Date(2024, 11, 25, 10, 30);
date.setHours(25);

console.log(date.getHours()); // 1
console.log(date.getDate());  // 26 (día siguiente)`
			},
			{
				titulo: "Ejemplo 4: Sumar horas",
				code: `function addHours(date, hours) {
  const nueva = new Date(date);
  nueva.setHours(nueva.getHours() + hours);
  return nueva;
}

const start = new Date(2024, 11, 25, 10, 30);
console.log(addHours(start, 5).getHours());  // 15
console.log(addHours(start, 25).getDate());  // 26
console.log(addHours(start, -3).getHours()); // 7`
			},
			{
				titulo: "Ejemplo 5: Medianoche y fin del día",
				code: `function setMidnight(date) {
  const nueva = new Date(date);
  nueva.setHours(0, 0, 0, 0);
  return nueva;
}

function setEndOfDay(date) {
  const nueva = new Date(date);
  nueva.setHours(23, 59, 59, 999);
  return nueva;
}

const d = new Date(2024, 11, 25, 10, 30);
console.log(setMidnight(d).getHours()); // 0
console.log(setEndOfDay(d).getHours()); // 23`
			},
			{
				titulo: "Ejemplo 6: Redondear a la hora más cercana",
				code: `function roundToNearestHour(date) {
  const nueva = new Date(date);
  if (nueva.getMinutes() >= 30) {
    nueva.setHours(nueva.getHours() + 1, 0, 0, 0);
  } else {
    nueva.setHours(nueva.getHours(), 0, 0, 0);
  }
  return nueva;
}

console.log(roundToNearestHour(new Date(2024, 11, 25, 10, 29)).getHours()); // 10
console.log(roundToNearestHour(new Date(2024, 11, 25, 10, 30)).getHours()); // 11`
			}
		],
		errores: [
			{
				texto: "**Pasar horas fuera de rango sin entender el ajuste:** `setHours(25)` cambia también el día.",
				code: `const date = new Date(2024, 11, 25, 10, 30);
date.setHours(25);
console.log(date.getHours()); // 1
console.log(date.getDate());  // 26`
			},
			{
				texto: "**Confundir el orden de parámetros:** es `setHours(hours, minutes, seconds, milliseconds)`.",
				code: `// ❌ setHours(minutes, hours)
// ✅ setHours(hours, minutes)`
			},
			{
				texto: "**No considerar la zona horaria:** `setHours()` trabaja en hora local.",
				code: `const date = new Date("2024-12-25T10:30:00Z");
date.setHours(15); // modifica la hora local, no la UTC`
			},
			{
				texto: "**Olvidar que modifica el objeto original:** clona la fecha si necesitas conservarla.",
				code: `const original = new Date(2024, 11, 25, 10, 30);
const copy = original; // ⚠️ misma referencia
copy.setHours(15);
console.log(original.getHours()); // 15

const copia = new Date(original); // ✅ independiente`
			}
		],
		casos: [
			"**Establecer medianoche** para comparar solo fechas.",
			"**Temporizadores y cronómetros.**",
			"**Horarios de atención** y validaciones.",
			"**Sumar o restar horas** a una fecha.",
			"**Redondear horas** en agendas y citas."
		],
		relacion: [
			"**`getHours()`:** obtiene la hora.",
			"**`setUTCHours()`:** establece la hora en UTC.",
			"**`setMinutes()`:** establece los minutos.",
			"**`setDate()`:** cambia el día del mes.",
			"**`setFullYear()`:** cambia el año."
		],
		analogia: "`setHours()` es como **girar la manecilla de las horas** de un reloj: puedes moverla solo a otra hora y los minutos siguen donde estaban. Si giras más allá de las 23, el reloj avanza también al día siguiente.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: [
			"**Regla para memorizar:** `setHours(hours, minutes, seconds, ms)` y los valores fuera de rango se ajustan solos.",
			"Es **mutable**: modifica el objeto original.",
			"Usa `setUTCHours()` si trabajas en UTC."
		],
		quiz: Q([
			[
				"¿Qué establece setHours(15)?",
				[
					"Solo la hora y mantiene los minutos",
					"La hora y pone los minutos a 0",
					"El día",
					"El timestamp"
				],
				0
			],
			[
				"¿Qué ocurre con setHours(25)?",
				[
					"Lanza un error",
					"Pasa a la 1:00 del día siguiente",
					"Devuelve 25",
					"Devuelve Invalid Date"
				],
				1
			],
			[
				"¿Qué devuelve setHours()?",
				[
					"La hora",
					"El objeto Date",
					"El timestamp en milisegundos",
					"undefined"
				],
				2
			],
			[
				"¿Cuál es el orden correcto de los parámetros?",
				[
					"setHours(minutes, hours, seconds, ms)",
					"setHours(hours, minutes, seconds, ms)",
					"setHours(seconds, minutes, hours)",
					"setHours(ms, seconds, minutes, hours)"
				],
				1
			],
			[
				"¿setHours() trabaja en hora local o UTC?",
				[
					"Local",
					"UTC",
					"Depende del string",
					"Depende del navegador"
				],
				0
			],
			[
				"¿Cómo se establece la medianoche?",
				[
					"setHours(12, 0, 0, 0)",
					"setHours(0, 0, 0, 0)",
					"setHours(24, 0, 0, 0)",
					"setDate(0)"
				],
				1
			]
		])
	},
	setminutes: {
		id: "setminutes",
		titulo: "Date.prototype.setMinutes()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que **establece los minutos** (0-59) de un objeto `Date` según la hora local, pudiendo también establecer opcionalmente los **segundos** y **milisegundos**.", "Permite cambiar los minutos manteniendo el resto de componentes, con manejo automático de *overflows*."],
		queEs: [
			"Es un **setter mutable**: modifica el objeto `Date` original.",
			"Si solo se pasan minutos, se mantienen los segundos y milisegundos.",
			"Los valores fuera de rango se ajustan automáticamente.",
			"Trabaja con la **hora local**, no con UTC.",
			"Devuelve el nuevo *timestamp* en milisegundos."
		],
		paraQueSirve: [
			"Cambiar los minutos de una fecha existente.",
			"Sumar o restar minutos a una fecha.",
			"Implementar temporizadores y cronómetros.",
			"Redondear horarios (a la hora, a los 15 minutos...).",
			"Establecer minutos exactos en una fecha.",
			"Registrar eventos con precisión."
		],
		comoFunciona: [
			"Establece los minutos (0-59) y opcionalmente segundos y milisegundos.",
			"Si solo se pasan minutos, conserva los segundos y milisegundos.",
			"Minutos mayores que 59 se ajustan a la hora siguiente.",
			"Minutos negativos se ajustan a la hora anterior.",
			"Los segundos y milisegundos también se ajustan si están fuera de rango.",
			"Retorna el *timestamp* en milisegundos del objeto modificado."
		],
		sintaxis: [{ code: `fecha.setMinutes(minutes)
fecha.setMinutes(minutes, seconds)
fecha.setMinutes(minutes, seconds, milliseconds)` }, {
			caption: "Valores fuera de rango:",
			code: `// 90 min → 30 minutos de la hora siguiente
new Date(2024, 11, 25, 10, 30).setMinutes(90);

// -10 min → 50 minutos de la hora anterior
new Date(2024, 11, 25, 10, 30).setMinutes(-10);`
		}],
		nota: "**Parámetros:** `minutes` (obligatorio, 0-59), `seconds` (0-59) y `milliseconds` (0-999), opcionales. **Retorno:** el *timestamp* en milisegundos del objeto modificado.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Cambiar solo los minutos",
				code: `const date = new Date(2024, 11, 25, 10, 30);
date.setMinutes(15);

console.log(date.getMinutes()); // 15
console.log(date.getHours());   // 10 (se mantiene)`
			},
			{
				titulo: "Ejemplo 2: Minutos, segundos y milisegundos",
				code: `const date = new Date(2024, 11, 25, 10, 30, 45, 500);
date.setMinutes(15, 20, 300);

console.log(date.getMinutes());      // 15
console.log(date.getSeconds());      // 20
console.log(date.getMilliseconds()); // 300`
			},
			{
				titulo: "Ejemplo 3: Ajuste automático",
				code: `const date = new Date(2024, 11, 25, 10, 30);
date.setMinutes(90);

console.log(date.getMinutes()); // 30
console.log(date.getHours());   // 11 (hora + 1)`
			},
			{
				titulo: "Ejemplo 4: Sumar minutos",
				code: `function addMinutes(date, minutes) {
  const nueva = new Date(date);
  nueva.setMinutes(nueva.getMinutes() + minutes);
  return nueva;
}

const start = new Date(2024, 11, 25, 10, 30);
console.log(addMinutes(start, 45).getHours());   // 11
console.log(addMinutes(start, 90).getHours());   // 12
console.log(addMinutes(start, -30).getMinutes()); // 0`
			},
			{
				titulo: "Ejemplo 5: Redondear a los 15 minutos",
				code: `function roundToNearest15(date) {
  const nueva = new Date(date);
  const rounded = Math.round(nueva.getMinutes() / 15) * 15;
  nueva.setMinutes(rounded, 0, 0);
  return nueva;
}

console.log(roundToNearest15(new Date(2024, 11, 25, 10, 12)).getMinutes()); // 15
console.log(roundToNearest15(new Date(2024, 11, 25, 10, 23)).getMinutes()); // 30`
			},
			{
				titulo: "Ejemplo 6: Cadena de métodos (retorna timestamp)",
				code: `const date = new Date();
const timestamp = date.setMinutes(30);

console.log(typeof timestamp);   // "number"
console.log(date.getMinutes()); // 30`
			}
		],
		errores: [
			{
				texto: "**Pasar minutos fuera de rango sin entender el ajuste:** `setMinutes(90)` también cambia la hora.",
				code: `const date = new Date(2024, 11, 25, 10, 30);
date.setMinutes(90);
console.log(date.getMinutes()); // 30
console.log(date.getHours());   // 11`
			},
			{
				texto: "**Confundir el orden de parámetros:** es `setMinutes(minutes, seconds, milliseconds)`.",
				code: `// ❌ setMinutes(seconds, minutes)
// ✅ setMinutes(minutes, seconds)`
			},
			{
				texto: "**No considerar la zona horaria:** `setMinutes()` trabaja en hora local.",
				code: `const date = new Date("2024-12-25T10:30:00Z");
date.setMinutes(15); // modifica la hora local`
			},
			{
				texto: "**Olvidar que modifica el objeto original:** clona la fecha si necesitas conservarla.",
				code: `const original = new Date(2024, 11, 25, 10, 30);
const copy = original; // ⚠️ misma referencia
copy.setMinutes(15);
console.log(original.getMinutes()); // 15`
			}
		],
		casos: [
			"**Redondear horarios** en agendas y citas.",
			"**Temporizadores y cronómetros.**",
			"**Sumar o restar minutos** a una fecha.",
			"**Establecer una hora exacta** (por ejemplo, en punto).",
			"**Registrar eventos** con precisión de minutos."
		],
		relacion: [
			"**`getMinutes()`:** obtiene los minutos.",
			"**`setUTCMinutes()`:** establece los minutos en UTC.",
			"**`setHours()`:** establece la hora.",
			"**`setSeconds()`:** establece los segundos.",
			"**`setDate()`:** cambia el día del mes."
		],
		analogia: "`setMinutes()` es como **girar la manecilla de los minutos**: puedes llevarla a otro minuto y la hora se mantiene. Si la giras más de una vuelta completa (más de 59), la manecilla de las horas avanza también.",
		fuente: "MDN Web Docs | ECMAScript Specification",
		notasPersonales: [
			"**Regla para memorizar:** `setMinutes(minutes, seconds, ms)`; los valores fuera de rango se ajustan solos.",
			"Es **mutable**: modifica el objeto original.",
			"Usa `setUTCMinutes()` si trabajas en UTC."
		],
		quiz: Q([
			[
				"¿Qué establece setMinutes(15)?",
				[
					"Solo los minutos y mantiene segundos y milisegundos",
					"Los minutos y pone los segundos a 0",
					"La hora",
					"El mes"
				],
				0
			],
			[
				"¿Qué ocurre con setMinutes(90) a las 10:30?",
				[
					"Lanza un error",
					"Pasa a las 11:30",
					"Devuelve 90",
					"Pasa a las 10:90"
				],
				1
			],
			[
				"¿Qué devuelve setMinutes()?",
				[
					"Los minutos",
					"El objeto Date",
					"El timestamp en milisegundos",
					"undefined"
				],
				2
			],
			[
				"¿Cuál es el orden correcto de los parámetros?",
				[
					"setMinutes(seconds, minutes, ms)",
					"setMinutes(minutes, seconds, ms)",
					"setMinutes(hours, minutes)",
					"setMinutes(ms, seconds, minutes)"
				],
				1
			],
			[
				"¿setMinutes() trabaja en hora local o UTC?",
				[
					"Local",
					"UTC",
					"Depende del navegador",
					"Depende del string"
				],
				0
			],
			[
				"¿Qué método redondea a la hora exacta?",
				[
					"setMinutes(0, 0, 0)",
					"setHours(0)",
					"setDate(1)",
					"setSeconds(0)"
				],
				0
			]
		])
	},
	toisostring: {
		id: "toisostring",
		titulo: "Date.prototype.toISOString()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que convierte una fecha y hora en una **cadena de texto** con formato **ISO 8601**, utilizando siempre la zona horaria **UTC**.", "El formato devuelto es `AAAA-MM-DDTHH:mm:ss.sssZ`."],
		queEs: [
			"Devuelve un `string`, nunca un objeto.",
			"Siempre expresa la fecha y hora en **UTC**, aunque el objeto se haya creado en hora local.",
			"No recibe parámetros.",
			"Es el formato estándar para intercambiar fechas entre sistemas.",
			"Lanza un `RangeError` si la fecha es inválida."
		],
		paraQueSirve: [
			"Enviar fechas a APIs.",
			"Guardar fechas en bases de datos.",
			"Compartir fechas entre sistemas.",
			"Generar formatos estándar internacionales.",
			"Serializar objetos `Date` a texto.",
			"Registrar eventos en logs."
		],
		comoFunciona: [
			"Se crea un objeto `Date`.",
			"Se llama a `toISOString()`.",
			"JavaScript convierte la fecha a UTC.",
			"Devuelve una cadena con formato ISO 8601 terminada en `Z`.",
			"Si la fecha es inválida, lanza `RangeError: Invalid time value`."
		],
		sintaxis: [{ code: `const texto = fecha.toISOString();` }, {
			caption: "Partes del formato `2026-07-22T22:35:48.125Z`:",
			code: `AAAA → año
MM   → mes
DD   → día
T    → separador entre fecha y hora
HH   → hora
mm   → minutos
ss   → segundos
sss  → milisegundos
Z    → indica que la hora está en UTC`
		}],
		nota: "**Parámetros:** ninguno. **Retorno:** un `string` en formato ISO 8601 en UTC. **Error:** `RangeError` si la fecha es inválida.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Fecha actual",
				code: `const ahora = new Date();
console.log(ahora.toISOString()); // "2026-07-22T22:35:48.125Z"`
			},
			{
				titulo: "Ejemplo 2: Fecha específica",
				code: `const fecha = new Date("2026-12-25T10:30:00");
console.log(fecha.toISOString()); // "2026-12-25T15:30:00.000Z" (según la zona)`
			},
			{
				titulo: "Ejemplo 3: Guardar una fecha",
				code: `const fecha = new Date();
const texto = fecha.toISOString();
console.log(typeof texto); // "string"`
			},
			{
				titulo: "Ejemplo 4: Enviar una fecha en JSON",
				code: `const usuario = {
  nombre: "Ana",
  fechaRegistro: new Date().toISOString(),
};

console.log(JSON.stringify(usuario));
// {"nombre":"Ana","fechaRegistro":"2026-07-22T22:35:48.125Z"}`
			},
			{
				titulo: "Ejemplo 5: Fecha inválida",
				code: `const fecha = new Date("Fecha inválida");

try {
  console.log(fecha.toISOString());
} catch (error) {
  console.log(error.name);    // "RangeError"
  console.log(error.message); // "Invalid time value"
}`
			}
		],
		errores: [
			{
				texto: "**Pensar que usa la hora local:** el resultado siempre está en UTC.",
				code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.toISOString());   // ...T23:45:30.000Z (ejemplo)
console.log(fecha.toLocaleString()); // hora local`
			},
			{
				texto: "**Confundir el formato ISO con el formato local:** ISO usa `AAAA-MM-DD` y `T`; el local usa separadores como `/`.",
				code: `// ISO:    2026-07-22T22:35:48.125Z
// Local:  22/07/2026 17:35:48`
			},
			{
				texto: "**Usarlo sobre una fecha inválida:** lanza `RangeError` en lugar de devolver `NaN`.",
				code: `const fecha = new Date("abc");

// ❌ RangeError: Invalid time value
fecha.toISOString();`
			}
		],
		casos: [
			"**APIs REST:** enviar fechas en el cuerpo o en los parámetros.",
			"**Bases de datos:** almacenar fechas en un formato estándar.",
			"**Logs:** registrar eventos con marcas de tiempo universales.",
			"**JSON:** serializar objetos que contienen fechas.",
			"**Sincronización entre países:** evitar ambigüedades de zona horaria."
		],
		relacion: [
			"**`toLocaleString()`:** devuelve la fecha con formato local.",
			"**`toString()`:** devuelve una representación legible en hora local.",
			"**`JSON.stringify()`:** convierte automáticamente los `Date` usando `toISOString()`.",
			"**`Date.parse()`:** hace el camino inverso, de ISO a *timestamp*.",
			"**UTC / ISO 8601:** zona horaria y estándar que utiliza el método."
		],
		analogia: "Imagina que personas de distintos países deben ponerse de acuerdo sobre una fecha. En lugar de usar formatos diferentes (`22/07/2026`, `07/22/2026`, `2026/07/23`), todos adoptan un idioma común: `2026-07-22T22:30:00.000Z`. Ese idioma universal es ISO 8601, y `toISOString()` es el traductor.",
		fuente: "MDN Web Docs | ECMAScript Specification | ISO 8601",
		notasPersonales: [
			"**Regla para memorizar:** `toISOString()` = formato estándar + siempre UTC.",
			"Devuelve un `string`; para volver a fecha usa `new Date(texto)`.",
			"Lanza `RangeError` si la fecha es inválida."
		],
		quiz: Q([
			[
				"¿Qué formato devuelve toISOString()?",
				[
					"DD/MM/AAAA",
					"AAAA-MM-DDTHH:mm:ss.sssZ",
					"MM/DD/AAAA",
					"Solo la hora"
				],
				1
			],
			[
				"¿En qué zona horaria devuelve la fecha?",
				[
					"Local",
					"UTC",
					"La del navegador",
					"Depende del locale"
				],
				1
			],
			[
				"¿Qué significa la letra Z al final?",
				[
					"Zona local",
					"Que la hora está en UTC",
					"Que es inválida",
					"Que es medianoche"
				],
				1
			],
			[
				"¿Qué lanza toISOString() con una fecha inválida?",
				[
					"NaN",
					"RangeError",
					"null",
					"undefined"
				],
				1
			],
			[
				"¿Qué tipo de dato devuelve toISOString()?",
				[
					"Date",
					"string",
					"number",
					"object"
				],
				1
			],
			[
				"¿Qué método usa JSON.stringify() para serializar un Date?",
				[
					"toString()",
					"toISOString()",
					"toLocaleString()",
					"getTime()"
				],
				1
			],
			[
				"¿Cómo se vuelve de ISO a un objeto Date?",
				[
					"Date.toISO(texto)",
					"new Date(texto)",
					"Date.parse() solo",
					"texto.toDate()"
				],
				1
			],
			[
				"¿toISOString() recibe parámetros?",
				[
					"Sí, locales",
					"Sí, opciones",
					"No",
					"Solo la zona horaria"
				],
				2
			]
		])
	},
	tolocalestring: {
		id: "tolocalestring",
		titulo: "Date.prototype.toLocaleString()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que convierte una fecha y hora en un **string** usando el **formato regional** (*locale*) del usuario o el que se especifique.", "El resultado puede variar según el idioma, el país y las opciones de formato."],
		queEs: [
			"Devuelve un `string` pensado para ser leído por personas.",
			"Adapta automáticamente el formato según la configuración regional.",
			"Usa la **hora local** del sistema.",
			"Permite personalizar el resultado con `locales` y `options`.",
			"No debe confundirse con `toISOString()`, que siempre usa UTC."
		],
		paraQueSirve: [
			"Mostrar fechas al usuario.",
			"Formatear fechas según el idioma.",
			"Crear interfaces internacionales (i18n).",
			"Mostrar la hora local.",
			"Personalizar el formato de fecha y hora.",
			"Formatear reportes y documentos."
		],
		comoFunciona: [
			"Se crea un objeto `Date`.",
			"Se llama a `toLocaleString()`.",
			"JavaScript consulta la configuración regional.",
			"Formatea la fecha y la hora según ese formato.",
			"Devuelve un `string`."
		],
		sintaxis: [{ code: `fecha.toLocaleString();
fecha.toLocaleString(locales, opciones);` }, {
			caption: "Ejemplos de `locales`:",
			code: `"es-PE" → 22/7/2026, 18:45:30
"en-US" → 7/22/2026, 6:45:30 PM
"es-ES" → 22/7/2026, 18:45:30`
		}],
		nota: "**Parámetros:** `locales` (opcional, string o array) y `opciones` (opcional, objeto de formato). **Retorno:** un `string` con fecha y hora formateadas según la configuración regional.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Formato local del sistema",
				code: `const fecha = new Date();
console.log(fecha.toLocaleString()); // 22/7/2026, 18:45:30 (ejemplo)`
			},
			{
				titulo: "Ejemplo 2: Español (Perú)",
				code: `const fecha = new Date();
console.log(fecha.toLocaleString("es-PE")); // 22/7/2026, 18:45:30`
			},
			{
				titulo: "Ejemplo 3: Inglés (Estados Unidos)",
				code: `const fecha = new Date();
console.log(fecha.toLocaleString("en-US")); // 7/22/2026, 6:45:30 PM`
			},
			{
				titulo: "Ejemplo 4: Solo la fecha con estilo completo",
				code: `const fecha = new Date();
console.log(fecha.toLocaleString("es-PE", { dateStyle: "full" }));
// miércoles, 22 de julio de 2026`
			},
			{
				titulo: "Ejemplo 5: Fecha y hora personalizadas",
				code: `const fecha = new Date();
console.log(
  fecha.toLocaleString("es-PE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
);
// miércoles, 22 de julio de 2026, 18:45`
			}
		],
		errores: [
			{
				texto: "**Pensar que todos ven el mismo formato:** depende del idioma y la configuración del dispositivo.",
				code: `// En Perú: 22/7/2026, 18:45:30
// En EE.UU.: 7/22/2026, 6:45:30 PM
console.log(new Date().toLocaleString());`
			},
			{
				texto: "**Confundirlo con `toISOString()`:** `toISOString()` usa UTC y un formato fijo; `toLocaleString()` usa la hora local y un formato para personas.",
				code: `fecha.toISOString();    // 2026-07-22T23:45:30.000Z
fecha.toLocaleString(); // 22/7/2026, 18:45:30`
			},
			{
				texto: "**Esperar un formato fijo:** no siempre es idéntico en todos los navegadores o sistemas operativos.",
				code: `// Para un formato estable usa toISOString()
fecha.toISOString();`
			}
		],
		casos: [
			"**Mostrar fechas en páginas web.**",
			"**Interfaces internacionales (i18n).**",
			"**Aplicaciones con varios idiomas.**",
			"**Reportes y documentos** con fechas legibles.",
			"**Notificaciones y correos** con fecha y hora local."
		],
		relacion: [
			"**`toISOString()`:** formato ISO 8601 en UTC.",
			"**`toLocaleDateString()`:** solo la fecha.",
			"**`toLocaleTimeString()`:** solo la hora.",
			"**`Intl.DateTimeFormat`:** API más avanzada para formatear fechas.",
			"**`toString()`:** representación fija del navegador."
		],
		analogia: "`toLocaleString()` es como un **traductor**: la misma fecha se muestra a personas de distintos países en el formato que les resulta natural. En Perú se lee `22/07/2026`; en Estados Unidos, `07/22/2026`; en Japón, `2026/07/22`. El instante es el mismo, solo cambia la forma de escribirlo.",
		fuente: "MDN Web Docs | ECMAScript Specification | Intl",
		notasPersonales: [
			"**Regla para memorizar:** `toLocaleString()` = fecha y hora para personas, en hora local.",
			"Especifica siempre el `locale` para que el formato sea predecible.",
			"Si necesitas un formato estable para máquinas, usa `toISOString()`."
		],
		quiz: Q([
			[
				"¿Qué devuelve toLocaleString()?",
				[
					"Un objeto Date",
					"Un string con fecha y hora formateadas",
					"Un timestamp",
					"Solo la fecha"
				],
				1
			],
			[
				"¿Qué zona horaria usa?",
				[
					"UTC",
					"La local del sistema",
					"Siempre GMT",
					"La del servidor"
				],
				1
			],
			[
				"¿Qué parámetro permite elegir el idioma?",
				[
					"timeZone",
					"locales",
					"options.dateStyle",
					"format"
				],
				1
			],
			[
				"¿Cuál es la diferencia con toISOString()?",
				[
					"Son iguales",
					"toISOString usa UTC y formato fijo; toLocaleString usa hora local y formato regional",
					"toLocaleString usa UTC",
					"toISOString usa la hora local"
				],
				1
			],
			[
				"¿Qué opción muestra la fecha en estilo completo?",
				[
					"{ dateStyle: 'full' }",
					"{ full: true }",
					"{ style: 'full' }",
					"{ format: 'full' }"
				],
				0
			],
			[
				"¿El formato de toLocaleString() es idéntico en todos los dispositivos?",
				[
					"Sí, siempre",
					"No, puede variar",
					"Solo en Node.js",
					"Solo con es-ES"
				],
				1
			]
		])
	},
	tolocaledatestring: {
		id: "tolocaledatestring",
		titulo: "Date.prototype.toLocaleDateString()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que devuelve un **string** con la **parte de fecha** de un objeto `Date`, formateada según la configuración regional (idioma y país) especificada.", "A diferencia de `toLocaleString()`, **no incluye la hora**."],
		queEs: [
			"Devuelve solo la **fecha**, sin la hora.",
			"Usa el sistema de internacionalización (i18n) de JavaScript.",
			"Muestra los nombres de meses y días en el idioma correcto.",
			"Ordena día, mes y año según la región (DD/MM/AAAA o MM/DD/AAAA).",
			"Permite personalizar el formato con `options`."
		],
		paraQueSirve: [
			"Mostrar fechas en interfaces de usuario con formato local.",
			"Crear aplicaciones internacionalizadas (i18n).",
			"Generar fechas legibles para informes y documentos.",
			"Formatear fechas según las preferencias del usuario.",
			"Mostrar fechas en calendarios y agendas.",
			"Cumplir requisitos legales de formato por región."
		],
		comoFunciona: [
			"Determina el *locale* a usar (por parámetro o del sistema).",
			"Aplica las opciones de formato si se proporcionan.",
			"Genera la representación en string según las reglas culturales.",
			"Devuelve el string formateado, solo con la fecha."
		],
		sintaxis: [{ code: `fecha.toLocaleDateString([locales[, options]])` }, {
			caption: "Opciones principales:",
			code: `dateStyle: "full" | "long" | "medium" | "short"
timeZone: "UTC" | "America/New_York" | ...
year: "numeric" | "2-digit"
month: "numeric" | "2-digit" | "long" | "short" | "narrow"
day: "numeric" | "2-digit"
weekday: "long" | "short" | "narrow"`
		}],
		nota: "**Parámetros:** `locales` (opcional) y `options` (opcional). **Retorno:** un `string` con la fecha formateada, sin la hora.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Formato local",
				code: `const date = new Date(2024, 11, 25);
console.log(date.toLocaleDateString()); // según el sistema
// España: "25/12/2024" · EE.UU.: "12/25/2024"`
			},
			{
				titulo: "Ejemplo 2: Distintos locales",
				code: `const date = new Date(2024, 11, 25);

console.log(date.toLocaleDateString("es-ES")); // "25/12/2024"
console.log(date.toLocaleDateString("en-US")); // "12/25/2024"
console.log(date.toLocaleDateString("de-DE")); // "25.12.2024"
console.log(date.toLocaleDateString("ja-JP")); // "2024/12/25"`
			},
			{
				titulo: "Ejemplo 3: Estilos predefinidos",
				code: `const date = new Date(2024, 11, 25);

console.log(date.toLocaleDateString("es-ES", { dateStyle: "full" }));
// "miércoles, 25 de diciembre de 2024"

console.log(date.toLocaleDateString("en-US", { dateStyle: "long" }));
// "December 25, 2024"

console.log(date.toLocaleDateString("es-ES", { dateStyle: "short" }));
// "25/12/24"`
			},
			{
				titulo: "Ejemplo 4: Formato personalizado",
				code: `const date = new Date(2024, 11, 25);

console.log(
  date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
);
// "miércoles, 25 de diciembre de 2024"`
			},
			{
				titulo: "Ejemplo 5: Año de 2 dígitos",
				code: `const date = new Date(2024, 11, 25);

console.log(
  date.toLocaleDateString("es-ES", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })
);
// "25/12/24"`
			},
			{
				titulo: "Ejemplo 6: Rango de fechas legible",
				code: `function formatDateRange(start, end, locale = "es-ES") {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return \`\${start.toLocaleDateString(locale, options)} - \${end.toLocaleDateString(locale, options)}\`;
}

console.log(formatDateRange(new Date(2024, 0, 1), new Date(2024, 11, 31)));
// "1 de enero de 2024 - 31 de diciembre de 2024"`
			}
		],
		errores: [
			{
				texto: "**No especificar el locale:** el formato puede variar según la configuración del sistema.",
				code: `date.toLocaleDateString();        // depende del sistema
date.toLocaleDateString("es-ES"); // predecible`
			},
			{
				texto: "**Confundirlo con `toLocaleString()`:** el primero solo muestra la fecha; el segundo, fecha y hora.",
				code: `date.toLocaleDateString(); // "25/12/2024"
date.toLocaleString();     // "25/12/2024, 15:30:45"`
			},
			{
				texto: "**Asumir un formato fijo:** el formato depende del locale y puede cambiar.",
				code: `date.toLocaleDateString("en-US"); // "12/25/2024"
date.toLocaleDateString("es-ES"); // "25/12/2024"`
			},
			{
				texto: "**Olvidar que los meses empiezan en 0:** `new Date(2024, 11, 25)` es diciembre, no noviembre.",
				code: `new Date(2024, 11, 25).toLocaleDateString("es-ES"); // 25/12/2024
new Date(2024, 10, 25).toLocaleDateString("es-ES"); // 25/11/2024`
			}
		],
		casos: [
			"**Calendarios de eventos** con fechas legibles.",
			"**Formateadores de fechas** para usuarios de distintos países.",
			"**Informes y facturas** con formato legal local.",
			"**Dashboards** con rangos de fechas.",
			"**Correos y notificaciones** con fecha formateada."
		],
		relacion: [
			"**`toLocaleString()`:** fecha y hora.",
			"**`toLocaleTimeString()`:** solo la hora.",
			"**`toISOString()`:** formato ISO 8601 en UTC.",
			"**`Intl.DateTimeFormat`:** API avanzada de internacionalización.",
			"**`new Date()`:** crea la fecha que se va a formatear."
		],
		analogia: "`toLocaleDateString()` es como un **traductor de calendarios**: la misma fecha se escribe `25/12/2024` en España, `12/25/2024` en Estados Unidos y `2024/12/25` en Japón. No cambia el día, solo la forma de presentarlo según la cultura.",
		fuente: "MDN Web Docs | ECMAScript Specification | Intl.DateTimeFormat",
		notasPersonales: [
			"**Regla para memorizar:** `toLocaleDateString()` = solo fecha, en hora local y formato regional.",
			"Usa `dateStyle` para un formato rápido y consistente.",
			"Especifica el `locale` para que el resultado sea predecible."
		],
		quiz: Q([
			[
				"¿Qué devuelve toLocaleDateString()?",
				[
					"Fecha y hora",
					"Solo la fecha",
					"Solo la hora",
					"Un timestamp"
				],
				1
			],
			[
				"¿Qué devuelve new Date(2024, 11, 25).toLocaleDateString(\"es-ES\")?",
				[
					"25/12/2024",
					"12/25/2024",
					"25/11/2024",
					"2024-12-25"
				],
				0
			],
			[
				"¿Qué devuelve la misma fecha con locale \"en-US\"?",
				[
					"25/12/2024",
					"12/25/2024",
					"2024/12/25",
					"25.12.2024"
				],
				1
			],
			[
				"¿Qué opción muestra la fecha en estilo completo?",
				[
					"{ dateStyle: 'full' }",
					"{ style: 'full' }",
					"{ full: true }",
					"{ format: 'full' }"
				],
				0
			],
			[
				"¿Cuál es la diferencia con toLocaleString()?",
				[
					"Ninguna",
					"toLocaleDateString solo muestra la fecha",
					"toLocaleString solo muestra la fecha",
					"toLocaleDateString usa UTC"
				],
				1
			],
			[
				"¿Qué tipo de dato devuelve?",
				[
					"Date",
					"string",
					"number",
					"object"
				],
				1
			]
		])
	},
	tolocaletimestring: {
		id: "tolocaletimestring",
		titulo: "Date.prototype.toLocaleTimeString()",
		simulador: "fecha",
		definicion: ["Es un método de `Date` que devuelve un **string** con la **parte de tiempo (hora)** de un objeto `Date`, formateada según la configuración regional (idioma y país) especificada.", "A diferencia de `toLocaleString()`, **no incluye la fecha**."],
		queEs: [
			"Devuelve solo la **hora**, sin la fecha.",
			"Usa el sistema de internacionalización (i18n) de JavaScript.",
			"Muestra el formato de **12 o 24 horas** según la región.",
			"Puede incluir el nombre de la zona horaria.",
			"Permite personalizar el formato con `options`."
		],
		paraQueSirve: [
			"Mostrar horas en interfaces con formato local.",
			"Crear aplicaciones internacionalizadas (i18n).",
			"Generar horas legibles para informes y logs.",
			"Mostrar horarios de eventos y citas.",
			"Implementar relojes y temporizadores en distintos idiomas.",
			"Presentar marcas de tiempo en aplicaciones de mensajería."
		],
		comoFunciona: [
			"Determina el *locale* a usar (por parámetro o del sistema).",
			"Aplica las opciones de formato si se proporcionan.",
			"Genera la representación en string según las reglas culturales.",
			"Devuelve el string formateado, solo con la hora."
		],
		sintaxis: [{ code: `fecha.toLocaleTimeString([locales[, options]])` }, {
			caption: "Opciones principales:",
			code: `timeStyle: "full" | "long" | "medium" | "short"
timeZone: "UTC" | "America/New_York" | ...
hour: "numeric" | "2-digit"
minute: "numeric" | "2-digit"
second: "numeric" | "2-digit"
hour12: true | false
timeZoneName: "long" | "short"`
		}],
		nota: "**Parámetros:** `locales` (opcional) y `options` (opcional). **Retorno:** un `string` con la hora formateada, sin la fecha.",
		ejemplos: [
			{
				titulo: "Ejemplo 1: Formato local",
				code: `const date = new Date(2024, 11, 25, 15, 30, 45);
console.log(date.toLocaleTimeString());
// España: "15:30:45" · EE.UU.: "3:30:45 PM"`
			},
			{
				titulo: "Ejemplo 2: Distintos locales",
				code: `const date = new Date(2024, 11, 25, 15, 30, 45);

console.log(date.toLocaleTimeString("es-ES")); // "15:30:45"
console.log(date.toLocaleTimeString("en-US")); // "3:30:45 PM"
console.log(date.toLocaleTimeString("ja-JP")); // "15:30:45"`
			},
			{
				titulo: "Ejemplo 3: Estilos predefinidos",
				code: `const date = new Date(2024, 11, 25, 15, 30, 45);

console.log(date.toLocaleTimeString("es-ES", { timeStyle: "short" }));
// "15:30"

console.log(date.toLocaleTimeString("en-US", { timeStyle: "medium" }));
// "3:30:45 PM"`
			},
			{
				titulo: "Ejemplo 4: Formato 12 vs 24 horas",
				code: `const date = new Date(2024, 11, 25, 15, 30);

console.log(
  date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })
); // "3:30 PM"

console.log(
  date.toLocaleTimeString("es-ES", { hour: "numeric", minute: "numeric", hour12: false })
); // "15:30"`
			},
			{
				titulo: "Ejemplo 5: Con zona horaria",
				code: `const date = new Date(2024, 11, 25, 15, 30);

console.log(
  date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  })
);
// "15:30 GMT+1"`
			},
			{
				titulo: "Ejemplo 6: Reloj en tiempo real",
				code: `function startClock(locale = "es-ES") {
  setInterval(() => {
    console.log(
      new Date().toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    );
  }, 1000);
}

// startClock("es-ES");`
			}
		],
		errores: [
			{
				texto: "**No especificar el locale:** el formato puede variar según la configuración del sistema.",
				code: `date.toLocaleTimeString();        // depende del sistema
date.toLocaleTimeString("es-ES"); // predecible`
			},
			{
				texto: "**Confundirlo con `toLocaleString()`:** el primero solo muestra la hora; el segundo, fecha y hora.",
				code: `date.toLocaleTimeString(); // "15:30:45"
date.toLocaleString();     // "25/12/2024, 15:30:45"`
			},
			{
				texto: "**Asumir siempre el formato de 12 horas:** depende del locale y de las opciones.",
				code: `date.toLocaleTimeString("en-US"); // "3:30:45 PM"
date.toLocaleTimeString("es-ES"); // "15:30:45"`
			},
			{
				texto: "**No manejar zonas horarias:** por defecto las horas se convierten a la zona local.",
				code: `date.toLocaleTimeString("es-ES", { timeZone: "UTC" });
date.toLocaleTimeString("es-ES", { timeZone: "Asia/Tokyo" });`
			}
		],
		casos: [
			"**Horarios de eventos y citas.**",
			"**Relojes y temporizadores** en distintos idiomas.",
			"**Logs y registros** con hora local legible.",
			"**Aplicaciones de mensajería** con marcas de tiempo.",
			"**Dashboards** con métricas temporales."
		],
		relacion: [
			"**`toLocaleString()`:** fecha y hora.",
			"**`toLocaleDateString()`:** solo la fecha.",
			"**`toISOString()`:** formato ISO 8601 en UTC.",
			"**`toTimeString()`:** hora en formato fijo del navegador.",
			"**`Intl.DateTimeFormat`:** API avanzada de internacionalización."
		],
		analogia: "`toLocaleTimeString()` es como un **traductor de relojes**: la misma hora se muestra como `15:30` en España y como `3:30 PM` en Estados Unidos. El instante no cambia, solo la manera de leerlo según la costumbre local.",
		fuente: "MDN Web Docs | ECMAScript Specification | Intl.DateTimeFormat",
		notasPersonales: [
			"**Regla para memorizar:** `toLocaleTimeString()` = solo hora, en hora local y formato regional.",
			"Usa `hour12: false` si quieres forzar el formato de 24 horas.",
			"Especifica el `locale` para que el resultado sea predecible."
		],
		quiz: Q([
			[
				"¿Qué devuelve toLocaleTimeString()?",
				[
					"Fecha y hora",
					"Solo la hora",
					"Solo la fecha",
					"Un timestamp"
				],
				1
			],
			[
				"¿Qué devuelve a las 15:30:45 con locale \"en-US\"?",
				[
					"15:30:45",
					"3:30:45 PM",
					"03:30:45",
					"15:30 PM"
				],
				1
			],
			[
				"¿Qué devuelve a las 15:30:45 con locale \"es-ES\"?",
				[
					"15:30:45",
					"3:30:45 PM",
					"03:30:45 PM",
					"15:30 PM"
				],
				0
			],
			[
				"¿Qué opción fuerza el formato de 24 horas?",
				[
					"hour12: true",
					"hour12: false",
					"hour: '24'",
					"timeStyle: '24'"
				],
				1
			],
			[
				"¿Cuál es la diferencia con toLocaleString()?",
				[
					"Ninguna",
					"toLocaleTimeString solo muestra la hora",
					"toLocaleString solo muestra la hora",
					"toLocaleTimeString usa UTC"
				],
				1
			],
			[
				"¿Qué opción añade el nombre de la zona horaria?",
				[
					"timeZoneName",
					"timeZone",
					"zone",
					"tz"
				],
				0
			]
		])
	}
};
// src/components/AdvancedGame/liveExampleConfigs.js
var EJEMPLOS = {
	find: {
		etiqueta: "Array.prototype.find()",
		titulo: "Encuentra el primer emoji",
		descripcion: "find() devuelve el primer emoji que cumple la condición. Aquí busca una coincidencia con el primer emoji de tu array.",
		prueba: "Duplica el primer emoji para comprobar que find() se queda con la primera aparición.",
		codigo: `const objetivo = emojis[0];
console.log("Buscando:", objetivo);
return emojis.find((emoji) => emoji === objetivo);`
	},
	findindex: {
		etiqueta: "Array.prototype.findIndex()",
		titulo: "Encuentra la posición",
		descripcion: "findIndex() devuelve el índice de la primera coincidencia, o -1 si no existe.",
		prueba: "Cambia el orden de los emojis con 🔀 Mezclar y observa cómo cambia el índice.",
		codigo: `const objetivo = emojis[2] ?? emojis[0];
console.log("Buscando índice de:", objetivo);
return emojis.findIndex((emoji) => emoji === objetivo);`
	},
	findlast: {
		etiqueta: "Array.prototype.findLast()",
		titulo: "La última coincidencia",
		descripcion: "findLast() recorre el array desde el final y devuelve el último emoji que cumple la condición.",
		prueba: "Duplica el primer emoji: find() devolvería el primero y findLast() el último.",
		codigo: `const objetivo = emojis[0];
console.log("Buscando la última aparición de:", objetivo);
return emojis.findLast((emoji) => emoji === objetivo);`
	},
	findlastindex: {
		etiqueta: "Array.prototype.findLastIndex()",
		titulo: "La última posición",
		descripcion: "findLastIndex() busca desde el final y devuelve el índice de la última coincidencia.",
		prueba: "Añade un emoji repetido al final para ver cómo cambia el índice devuelto.",
		codigo: `const objetivo = emojis[0];
console.log("Buscando el último índice de:", objetivo);
return emojis.findLastIndex((emoji) => emoji === objetivo);`
	},
	indexof: {
		etiqueta: "String.prototype.indexOf()",
		titulo: "Busca dentro del texto",
		descripcion: "indexOf() busca una subcadena y devuelve la posición de su primera aparición. Tu array se convierte en una cadena separada por guiones.",
		prueba: "Cada emoji ocupa 2 unidades UTF-16; añade emojis al inicio y mira cómo se mueve el offset.",
		codigo: `const cadena = emojis.join("-");
const objetivo = emojis[0];
console.log("Cadena:", cadena);
return cadena.indexOf(objetivo);`
	},
	lastindexof: {
		etiqueta: "Array.prototype.lastIndexOf()",
		titulo: "La última aparición",
		descripcion: "lastIndexOf() devuelve el índice de la última aparición de un valor dentro del array.",
		prueba: "Duplica el primer emoji y compara lastIndexOf() con indexOf().",
		codigo: `const objetivo = emojis[0];
console.log("Buscando la última aparición de:", objetivo);
return emojis.lastIndexOf(objetivo);`
	},
	every: {
		etiqueta: "Array.prototype.every()",
		titulo: "¿Todos cumplen?",
		descripcion: "every() devuelve true solo si todos los emojis cumplen la condición. Aquí comprueba que ninguno sea un dragón.",
		prueba: "Añade un 🐉 con la paleta para que el resultado cambie a false.",
		codigo: `return emojis.every((emoji) => emoji !== "🐉");`
	},
	some: {
		etiqueta: "Array.prototype.some()",
		titulo: "¿Existe alguno?",
		descripcion: "some() devuelve true si al menos un emoji cumple la condición. Aquí busca un dragón.",
		prueba: "Vacía el array o quita todos los 🐉 para obtener false.",
		codigo: `return emojis.some((emoji) => emoji === "🐉");`
	},
	map: {
		etiqueta: "Array.prototype.map()",
		titulo: "Transforma cada emoji",
		descripcion: "map() crea un array nuevo con el mismo número de elementos, transformando cada uno.",
		prueba: "Cambia el número por un emoji, por ejemplo: emoji + \"✨\".",
		codigo: `return emojis.map((emoji, indice) => emoji + (indice + 1));`
	},
	filter: {
		etiqueta: "Array.prototype.filter()",
		titulo: "Filtra el array",
		descripcion: "filter() devuelve un array nuevo solo con los emojis que cumplen la condición.",
		prueba: "Conserva las posiciones pares. Añade o quita emojis para ver cómo se recalcula.",
		codigo: `return emojis.filter((emoji, indice) => indice % 2 === 0);`
	},
	flatmap: {
		etiqueta: "Array.prototype.flatMap()",
		titulo: "Transforma y aplana",
		descripcion: "flatMap() transforma cada emoji y aplana el resultado un nivel, devolviendo un solo array.",
		prueba: "Devuelve [emoji, emoji] para duplicar cada emoji en un único array.",
		codigo: `return emojis.flatMap((emoji) => [emoji, emoji]);`
	},
	slice: {
		etiqueta: "String.prototype.slice()",
		titulo: "Corta la cadena",
		descripcion: "slice() extrae una porción de la cadena sin modificar la original. Tu array se une en un solo texto.",
		prueba: "Cada emoji ocupa 2 unidades UTF-16. Prueba otros índices y observa si el corte parte un emoji.",
		codigo: `const cadena = emojis.join("");
console.log("Texto:", cadena);
return cadena.slice(2, 6);`
	},
	fill: {
		etiqueta: "Array.prototype.fill()",
		titulo: "Rellena una copia",
		descripcion: "fill() modifica el array y devuelve la misma referencia. Aquí trabajamos sobre una copia para no tocar tu array original.",
		prueba: "Cambia los índices 1 y 3 para rellenar otra zona del array.",
		codigo: `const copia = [...emojis];
return copia.fill("⭐", 1, 3);`
	},
	with: {
		etiqueta: "Array.prototype.with()",
		titulo: "Sustituye sin mutar",
		descripcion: "with() devuelve una copia nueva con un emoji sustituido en el índice indicado.",
		prueba: "Prueba un índice negativo, por ejemplo emojis.with(-1, \"🐉\").",
		codigo: `if (emojis.length === 0) return "Añade al menos un emoji";
return emojis.with(0, "🐉");`
	},
	push: {
		etiqueta: "Array.prototype.push()",
		titulo: "Añade al final",
		descripcion: "push() añade elementos al final, modifica el array y devuelve la nueva longitud.",
		prueba: "Mira la consola: el array de la copia cambia, pero el array original del builder no.",
		codigo: `const copia = [...emojis];
const longitud = copia.push("🚀", "🎉");
console.log("Array después de push:", copia);
return longitud;`
	}
};
var IDS_ARRAY = [
	"find",
	"findindex",
	"findlast",
	"findlastindex",
	"lastindexof",
	"push",
	"pop",
	"shift",
	"unshift",
	"splice",
	"tospliced",
	"sort",
	"tosorted",
	"of",
	"some",
	"isarray",
	"at",
	"length",
	"concat",
	"join",
	"map",
	"filter",
	"flatmap",
	"fill",
	"with",
	"from",
	"toreversed",
	"reverse",
	"flat",
	"copywithin",
	"entries",
	"keys",
	"values",
	"foreach",
	"reduce",
	"reduceright",
	"every"
];
var IDS_TEXTO = [
	"indexof",
	"slice",
	"raw",
	"codepointat",
	"charcodeat",
	"fromcharcode",
	"fromcodepoint",
	"repeat",
	"iswellformed",
	"towellformed",
	"startswith",
	"endswith",
	"substr",
	"touppercase",
	"tolowercase",
	"tolocaleuppercase",
	"tolocalelowercase",
	"trim",
	"trimstart",
	"trimend",
	"trimleft",
	"trimright",
	"padstart",
	"padend",
	"substring",
	"charat",
	"split",
	"replace",
	"replaceall",
	"includes",
	"search",
	"match",
	"matchall",
	"localecompare",
	"normalize"
];
var IDS_NUMERO = [
	"isinteger",
	"issafeinteger",
	"isfinite",
	"isnan",
	"parseint",
	"parsefloat",
	"tofixed"
];
var IDS_FECHA = [
	"newdate",
	"datenow",
	"gettime",
	"getfullyear",
	"getmonth",
	"getdate",
	"getday",
	"gethours",
	"getminutes",
	"getseconds",
	"setfullyear",
	"setdate",
	"sethours",
	"setminutes",
	"toisostring",
	"tolocalestring",
	"tolocaledatestring",
	"tolocaletimestring"
];
var CATEGORIAS = Object.fromEntries([
	...IDS_ARRAY.map((id) => [id, "array"]),
	...IDS_TEXTO.map((id) => [id, "texto"]),
	...IDS_NUMERO.map((id) => [id, "numero"]),
	...IDS_FECHA.map((id) => [id, "fecha"])
]);
var PLANTILLAS = {
	pop: {
		titulo: "Extrae el último emoji",
		descripcion: "pop() elimina el último elemento, modifica el array y devuelve ese elemento.",
		prueba: "Vacía el array y observa qué devuelve pop() cuando no queda nada.",
		codigo: `const copia = [...emojis];
const eliminado = copia.pop();
console.log("Eliminado:", eliminado);
return copia;`
	},
	shift: {
		titulo: "Extrae el primer emoji",
		descripcion: "shift() elimina el primer elemento, desplaza el resto y devuelve el elemento extraído.",
		prueba: "Compara el array antes y después: todos los índices bajan una posición.",
		codigo: `const copia = [...emojis];
const eliminado = copia.shift();
console.log("Eliminado:", eliminado);
return copia;`
	},
	unshift: {
		titulo: "Añade al inicio",
		descripcion: "unshift() añade elementos al principio y devuelve la nueva longitud del array.",
		prueba: "Cambia los emojis que se añaden y ejecuta de nuevo.",
		codigo: `const copia = [...emojis];
const longitud = copia.unshift("🚀", "🎉");
console.log("Nueva longitud:", longitud);
return copia;`
	},
	splice: {
		titulo: "Corta y sustituye",
		descripcion: "splice() elimina elementos desde una posición y puede insertar otros en su lugar. Modifica el array original.",
		prueba: "Cambia el índice inicial y la cantidad de elementos eliminados.",
		codigo: `const copia = [...emojis];
const eliminados = copia.splice(1, 2, "🦄", "🔥");
console.log("Eliminados:", eliminados);
return copia;`
	},
	tospliced: {
		titulo: "Corta sin mutar",
		descripcion: "toSpliced() devuelve una copia con elementos eliminados y sustituidos, sin tocar el array original.",
		prueba: "Ejecuta y comprueba que tu array del builder sigue igual.",
		codigo: `return emojis.toSpliced(1, 2, "🦄", "🔥");`
	},
	sort: {
		titulo: "Ordena una copia",
		descripcion: "sort() ordena los elementos del array. Aquí ordenamos una copia con localeCompare.",
		prueba: "Prueba a quitar el comparador para ver el orden por unidades UTF-16.",
		codigo: `const copia = [...emojis];
copia.sort((a, b) => a.localeCompare(b));
return copia;`
	},
	tosorted: {
		titulo: "Ordena sin mutar",
		descripcion: "toSorted() devuelve un array ordenado nuevo, dejando intacto el original.",
		prueba: "Cambia el comparador para ordenar de otra forma.",
		codigo: `return emojis.toSorted((a, b) => a.localeCompare(b));`
	},
	of: {
		titulo: "Crea un array nuevo",
		descripcion: "Array.of() crea un array con los argumentos que recibe, sin importar su tipo o cantidad.",
		prueba: "Añade o quita emojis y observa cómo se construye el nuevo array.",
		codigo: `const nuevo = Array.of(...emojis, "✨");
console.log("Creado con Array.of:", nuevo);
return nuevo;`
	},
	isarray: {
		titulo: "¿Es un array?",
		descripcion: "Array.isArray() comprueba si un valor es un array real, algo más fiable que typeof.",
		prueba: "Cambia el valor comprobado por un texto o un número.",
		codigo: `return {
  valor: emojis,
  esArray: Array.isArray(emojis),
  tipo: typeof emojis,
};`
	},
	at: {
		titulo: "Accede por posición",
		descripcion: "at() permite acceder a un elemento por índice y acepta índices negativos para contar desde el final.",
		prueba: "Prueba at(-2) o at(100) y observa qué devuelve.",
		codigo: `return {
  primero: emojis.at(0),
  ultimo: emojis.at(-1),
  indice2: emojis.at(2),
};`
	},
	length: {
		titulo: "Longitud del array",
		descripcion: "length indica cuántos elementos tiene el array. Es una propiedad, no una función.",
		prueba: "Añade o quita emojis y mira cómo cambia la longitud.",
		codigo: `return {
  longitud: emojis.length,
  primero: emojis[0] ?? null,
  ultimo: emojis.at(-1) ?? null,
};`
	},
	concat: {
		titulo: "Une arrays",
		descripcion: "concat() crea un array nuevo combinando el original con otros arrays o valores.",
		prueba: "Añade más arrays al concat y observa el resultado.",
		codigo: `return emojis.concat(["🦄", "🔥"], emojis.slice(0, 2));`
	},
	join: {
		titulo: "Convierte en texto",
		descripcion: "join() une todos los elementos en una cadena usando el separador indicado.",
		prueba: "Cambia el separador por \"-\" o por \"\" y ejecuta de nuevo.",
		codigo: `return emojis.join(" · ");`
	},
	from: {
		titulo: "Crea desde un iterable",
		descripcion: "Array.from() construye un array a partir de un iterable o array-like y permite transformar cada elemento.",
		prueba: "Cambia la transformación para devolver dos emojis por elemento.",
		codigo: `return Array.from(emojis, (emoji, indice) => emoji + (indice + 1));`
	},
	toreversed: {
		titulo: "Invierte sin mutar",
		descripcion: "toReversed() devuelve una copia invertida sin modificar el array original.",
		prueba: "Compara el resultado con tu array del builder: no cambia.",
		codigo: `return emojis.toReversed();`
	},
	reverse: {
		titulo: "Invierte una copia",
		descripcion: "reverse() invierte el array en el mismo sitio y devuelve esa misma referencia.",
		prueba: "Trabajamos sobre una copia para que el builder no se modifique.",
		codigo: `const copia = [...emojis];
copia.reverse();
return copia;`
	},
	flat: {
		titulo: "Aplana un nivel",
		descripcion: "flat() convierte arrays anidados en un único array, hasta la profundidad indicada.",
		prueba: "Añade más niveles de anidación y prueba flat(2).",
		codigo: `const anidado = emojis.map((emoji) => [emoji, "✨"]);
console.log("Antes:", anidado);
return anidado.flat();`
	},
	copywithin: {
		titulo: "Copia dentro del array",
		descripcion: "copyWithin() copia una parte del array a otra posición del mismo array, sin cambiar su longitud.",
		prueba: "Cambia los índices de origen y destino para ver qué zona se sobrescribe.",
		codigo: `const copia = [...emojis];
copia.copyWithin(0, 2);
return copia;`
	},
	entries: {
		titulo: "Pares índice-valor",
		descripcion: "entries() devuelve un iterador con pares [índice, valor] de cada elemento.",
		prueba: "Recorre el resultado con un bucle for...of en la consola.",
		codigo: `return [...emojis.entries()];`
	},
	keys: {
		titulo: "Solo los índices",
		descripcion: "keys() devuelve un iterador con los índices del array, de 0 a length - 1.",
		prueba: "Vacía el array y comprueba que el iterador queda sin elementos.",
		codigo: `return [...emojis.keys()];`
	},
	values: {
		titulo: "Solo los valores",
		descripcion: "values() devuelve un iterador con los valores del array, en orden.",
		prueba: "Es el iterador que usa for...of por defecto al recorrer un array.",
		codigo: `return [...emojis.values()];`
	},
	foreach: {
		titulo: "Recorre sin devolver array",
		descripcion: "forEach() ejecuta una función por cada elemento. No devuelve un array nuevo; aquí guardamos el resultado a mano.",
		prueba: "Cambia el console.log para mostrar también el índice.",
		codigo: `const resultado = [];
emojis.forEach((emoji, indice) => {
  console.log(indice, emoji);
  resultado.push(emoji + indice);
});
return resultado;`
	},
	reduce: {
		titulo: "Reduce a un valor",
		descripcion: "reduce() recorre el array acumulando un único resultado. Aquí une todos los emojis con guiones.",
		prueba: "Cambia el valor inicial o el acumulador para sumar longitudes.",
		codigo: `return emojis.reduce(
  (acc, emoji, indice) => acc + (indice ? "-" : "") + emoji,
  "",
);`
	},
	reduceright: {
		titulo: "Reduce desde la derecha",
		descripcion: "reduceRight() acumula los elementos empezando por el final del array.",
		prueba: "Compara el resultado con reduce() y observa el orden.",
		codigo: `return emojis.reduceRight((acc, emoji) => acc + emoji, "");`
	},
	raw: {
		titulo: "Texto sin procesar escapes",
		descripcion: "String.raw es una etiqueta de template literal que conserva las barras invertidas sin interpretar escapes.",
		prueba: "Cambia la ruta y observa que \\n no se convierte en salto de línea.",
		codigo: `const ruta = String.raw\`C:\\Users\\MASTER\\notas.txt\`;
console.log("Ruta cruda:", ruta);
return ruta;`
	},
	codepointat: {
		titulo: "Código Unicode completo",
		descripcion: "codePointAt() devuelve el punto de código Unicode del carácter en la posición indicada, incluyendo emojis.",
		prueba: "Prueba distintas posiciones y compara con charCodeAt().",
		codigo: `const codigo = texto.codePointAt(0);
return {
  caracter: texto.charAt(0),
  codigo,
  hexadecimal: codigo === undefined ? null : "0x" + codigo.toString(16),
};`
	},
	charcodeat: {
		titulo: "Unidad UTF-16",
		descripcion: "charCodeAt() devuelve la unidad de código UTF-16 en una posición. Los emojis ocupan dos unidades.",
		prueba: "Prueba la posición 0 y la 1 para ver los dos surrogates de un emoji.",
		codigo: `return {
  posicion0: texto.charCodeAt(0),
  posicion1: texto.charCodeAt(1),
  longitud: texto.length,
};`
	},
	fromcharcode: {
		titulo: "Crea texto desde códigos",
		descripcion: "String.fromCharCode() crea una cadena a partir de unidades de código UTF-16.",
		prueba: "Añade más códigos, por ejemplo 128512 para 😀.",
		codigo: `return String.fromCharCode(65, 66, 67, 32, 128512);`
	},
	fromcodepoint: {
		titulo: "Crea texto desde Unicode",
		descripcion: "String.fromCodePoint() crea una cadena desde puntos de código Unicode completos, incluidos emojis.",
		prueba: "Cambia los códigos por 0x1f680 (🚀) o 0x2b50 (⭐).",
		codigo: `return String.fromCodePoint(0x1f34e, 0x1f409, 0x2b50);`
	},
	repeat: {
		titulo: "Repite el texto",
		descripcion: "repeat() devuelve una cadena con el texto repetido el número de veces indicado.",
		prueba: "Cambia el número de repeticiones y observa la longitud.",
		codigo: `return texto.repeat(2);`
	},
	iswellformed: {
		titulo: "¿Está bien formado?",
		descripcion: "isWellFormed() comprueba si la cadena no contiene surrogates sueltos, es decir, si es Unicode válido.",
		prueba: "Añade un surrogate suelto con String.fromCharCode(0xd800) para obtener false.",
		codigo: `const roto = texto + String.fromCharCode(0xd800);
return {
  originalBienFormado: texto.isWellFormed(),
  rotoBienFormado: roto.isWellFormed(),
};`
	},
	towellformed: {
		titulo: "Repara surrogates sueltos",
		descripcion: "toWellFormed() sustituye los surrogates sueltos por el carácter de reemplazo, devolviendo una cadena válida.",
		prueba: "Compara la longitud antes y después de reparar la cadena.",
		codigo: `const roto = String.fromCharCode(0xd800) + " " + texto;
console.log("Antes:", roto.length);
const arreglado = roto.toWellFormed();
return {
  arreglado,
  longitudAntes: roto.length,
  longitudDespues: arreglado.length,
};`
	},
	startswith: {
		titulo: "¿Empieza por...?",
		descripcion: "startsWith() comprueba si la cadena comienza con la subcadena indicada.",
		prueba: "Cambia el emoji de búsqueda o prueba una posición inicial distinta.",
		codigo: `return {
  texto,
  empiezaPorPrimero: texto.startsWith(emojis[0] ?? ""),
};`
	},
	endswith: {
		titulo: "¿Termina en...?",
		descripcion: "endsWith() comprueba si la cadena termina con la subcadena indicada.",
		prueba: "Quita el último emoji y observa cómo cambia el resultado.",
		codigo: `return {
  texto,
  terminaEnUltimo: texto.endsWith(emojis.at(-1) ?? ""),
};`
	},
	substr: {
		titulo: "Extrae con longitud",
		descripcion: "substr() extrae una parte de la cadena desde una posición y con una longitud concreta. Está obsoleto, pero sigue disponible.",
		prueba: "Cambia la posición inicial y la longitud para ver otros cortes.",
		codigo: `return texto.substr(0, 4);`
	},
	touppercase: {
		titulo: "Convierte a mayúsculas",
		descripcion: "toUpperCase() devuelve una copia de la cadena en mayúsculas.",
		prueba: "Los emojis no cambian, pero las letras sí.",
		codigo: `return texto.toUpperCase();`
	},
	tolowercase: {
		titulo: "Convierte a minúsculas",
		descripcion: "toLowerCase() devuelve una copia de la cadena en minúsculas.",
		prueba: "Añade letras al texto y compara el resultado.",
		codigo: `return texto.toLowerCase();`
	},
	tolocaleuppercase: {
		titulo: "Mayúsculas según idioma",
		descripcion: "toLocaleUpperCase() convierte a mayúsculas usando las reglas del idioma indicado.",
		prueba: "Prueba con \"tr\" para ver diferencias en la letra i.",
		codigo: `return texto.toLocaleUpperCase("es");`
	},
	tolocalelowercase: {
		titulo: "Minúsculas según idioma",
		descripcion: "toLocaleLowerCase() convierte a minúsculas usando las reglas del idioma indicado.",
		prueba: "Prueba con \"tr\" para ver diferencias en la letra I.",
		codigo: `return texto.toLocaleLowerCase("es");`
	},
	trim: {
		titulo: "Quita espacios de los extremos",
		descripcion: "trim() elimina los espacios en blanco al principio y al final de la cadena.",
		prueba: "Añade más espacios a los lados y comprueba que desaparecen.",
		codigo: `const conEspacios = "   " + texto + "   ";
return {
  antes: conEspacios,
  despues: conEspacios.trim(),
};`
	},
	trimstart: {
		titulo: "Quita espacios del inicio",
		descripcion: "trimStart() elimina solo los espacios del principio de la cadena.",
		prueba: "Cambia los espacios iniciales por saltos de línea.",
		codigo: `const conEspacios = "   " + texto;
return conEspacios.trimStart();`
	},
	trimend: {
		titulo: "Quita espacios del final",
		descripcion: "trimEnd() elimina solo los espacios del final de la cadena.",
		prueba: "Cambia los espacios finales por tabulaciones.",
		codigo: `const conEspacios = texto + "   ";
return conEspacios.trimEnd();`
	},
	trimleft: {
		titulo: "Alias de trimStart",
		descripcion: "trimLeft() es un alias histórico de trimStart(): quita espacios del inicio.",
		prueba: "Compara trimLeft() con trimStart(): devuelven lo mismo.",
		codigo: `const conEspacios = "   " + texto;
return conEspacios.trimLeft();`
	},
	trimright: {
		titulo: "Alias de trimEnd",
		descripcion: "trimRight() es un alias histórico de trimEnd(): quita espacios del final.",
		prueba: "Compara trimRight() con trimEnd(): devuelven lo mismo.",
		codigo: `const conEspacios = texto + "   ";
return conEspacios.trimRight();`
	},
	padstart: {
		titulo: "Rellena por delante",
		descripcion: "padStart() añade caracteres al principio hasta alcanzar la longitud indicada.",
		prueba: "Cambia el relleno por \"0\" y la longitud para simular códigos.",
		codigo: `return texto.padStart(texto.length + 4, "⭐");`
	},
	padend: {
		titulo: "Rellena por detrás",
		descripcion: "padEnd() añade caracteres al final hasta alcanzar la longitud indicada.",
		prueba: "Reduce la longitud objetivo por debajo del texto y observa que no recorta.",
		codigo: `return texto.padEnd(texto.length + 4, "⭐");`
	},
	substring: {
		titulo: "Extrae entre índices",
		descripcion: "substring() devuelve la parte de la cadena entre dos índices, sin incluir el final.",
		prueba: "Invierte los índices: substring los intercambia automáticamente.",
		codigo: `return texto.substring(0, 6);`
	},
	charat: {
		titulo: "Carácter por posición",
		descripcion: "charAt() devuelve el carácter en una posición concreta, o una cadena vacía si no existe.",
		prueba: "Prueba una posición mayor que la longitud del texto.",
		codigo: `return {
  primero: texto.charAt(0),
  ultimo: texto.charAt(texto.length - 1),
};`
	},
	split: {
		titulo: "Divide en un array",
		descripcion: "split() divide la cadena en un array usando el separador indicado.",
		prueba: "Cambia el separador por \"\" para separar carácter a carácter.",
		codigo: `return texto.split(" ");`
	},
	replace: {
		titulo: "Sustituye la primera",
		descripcion: "replace() sustituye la primera aparición de un texto o patrón.",
		prueba: "Cambia el reemplazo por un emoji distinto.",
		codigo: `return texto.replace(emojis[0] ?? "", "🐉");`
	},
	replaceall: {
		titulo: "Sustituye todas",
		descripcion: "replaceAll() sustituye todas las apariciones del texto o patrón.",
		prueba: "Duplica un emoji y compara replace() con replaceAll().",
		codigo: `return texto.replaceAll(emojis[0] ?? "", "🐉");`
	},
	includes: {
		titulo: "¿Contiene el texto?",
		descripcion: "includes() comprueba si la cadena contiene la subcadena indicada.",
		prueba: "Busca el último emoji o una palabra que no exista.",
		codigo: `return {
  texto,
  incluyePrimero: texto.includes(emojis[0] ?? ""),
};`
	},
	search: {
		titulo: "Busca con expresión regular",
		descripcion: "search() devuelve la posición de la primera coincidencia de una expresión regular, o -1 si no hay.",
		prueba: "Cambia la expresión regular para buscar el primer emoji.",
		codigo: `return {
  texto,
  posicionVocal: texto.search(/[aeiou]/i),
};`
	},
	match: {
		titulo: "Encuentra coincidencias",
		descripcion: "match() busca una expresión regular y devuelve las coincidencias encontradas.",
		prueba: "Añade la bandera g o cambia el patrón.",
		codigo: `return texto.match(/[^\s]+/g);`
	},
	matchall: {
		titulo: "Todas las coincidencias",
		descripcion: "matchAll() devuelve un iterador con todas las coincidencias y sus grupos.",
		prueba: "Recorre el resultado con for...of para ver cada coincidencia.",
		codigo: `return [...texto.matchAll(/[^\s]+/g)].map(
  (coincidencia) => coincidencia[0],
);`
	},
	localecompare: {
		titulo: "Compara textos",
		descripcion: "localeCompare() compara dos cadenas según las reglas del idioma y devuelve -1, 0 o 1.",
		prueba: "Cambia el texto de comparación para obtener otros valores.",
		codigo: `return {
  comparacion: texto.localeCompare("🍎 🐉 🍌"),
  texto,
};`
	},
	normalize: {
		titulo: "Normaliza Unicode",
		descripcion: "normalize() convierte la cadena a una forma Unicode concreta, útil para comparar acentos.",
		prueba: "Compara el texto descompuesto con el normalizado.",
		codigo: `const descompuesto = "e\\u0301";
return {
  descompuesto,
  normalizado: descompuesto.normalize("NFC"),
};`
	},
	isinteger: {
		titulo: "¿Es un entero?",
		descripcion: "Number.isInteger() indica si un valor es un número entero, sin decimales.",
		prueba: "Añade 7.5 y -2.0 al constructor y compara los resultados.",
		codigo: `return numeros.map((numero) => ({
  numero,
  esEntero: Number.isInteger(numero),
}));`
	},
	issafeinteger: {
		titulo: "¿Es un entero seguro?",
		descripcion: "Number.isSafeInteger() comprueba si el entero puede representarse con precisión.",
		prueba: "Añade 9007199254740993 y observa que deja de ser seguro.",
		codigo: `return numeros.map((numero) => ({
  numero,
  esSeguro: Number.isSafeInteger(numero),
}));`
	},
	isfinite: {
		titulo: "¿Es un número finito?",
		descripcion: "Number.isFinite() devuelve true solo para números finitos, sin convertir textos.",
		prueba: "Compara con isFinite(\"10\"): la versión global convierte el texto.",
		codigo: `return numeros.map((numero) => ({
  numero,
  esFinito: Number.isFinite(numero),
}));`
	},
	isnan: {
		titulo: "¿Es NaN?",
		descripcion: "Number.isNaN() comprueba si el valor es exactamente NaN, sin convertir otros tipos.",
		prueba: "Añadimos Number(\"no es un número\") para provocar un NaN real.",
		codigo: `const valores = [...numeros, Number("no es un número")];
return valores.map((numero) => ({
  numero: Number.isNaN(numero) ? "NaN" : numero,
  esNaN: Number.isNaN(numero),
}));`
	},
	parseint: {
		titulo: "Convierte a entero",
		descripcion: "Number.parseInt() lee un texto y devuelve su parte entera en la base indicada.",
		prueba: "Añade números con decimales para ver cómo se descarta la parte decimal.",
		codigo: `return numeros.map((numero) => ({
  texto: String(numero),
  entero: Number.parseInt(String(numero), 10),
}));`
	},
	parsefloat: {
		titulo: "Convierte a decimal",
		descripcion: "Number.parseFloat() lee un texto y devuelve el número decimal que encuentra.",
		prueba: "Añade 3.1416 y compara con parseInt().",
		codigo: `return numeros.map((numero) => ({
  texto: String(numero),
  decimal: Number.parseFloat(String(numero)),
}));`
	},
	tofixed: {
		titulo: "Fija los decimales",
		descripcion: "toFixed() devuelve una cadena con el número redondeado al número de decimales indicado.",
		prueba: "Cambia el 2 por 0 o por 4 y observa el redondeo.",
		codigo: `return numeros.map((numero) => ({
  numero,
  dosDecimales: Number(numero).toFixed(2),
}));`
	},
	newdate: {
		titulo: "Crea una fecha",
		descripcion: "new Date() construye un objeto Date con la fecha y hora indicadas o con el momento actual.",
		prueba: "Cambia los campos del constructor y compara tu fecha con la actual.",
		codigo: `return {
  tuFecha: fecha.toLocaleString("es-ES"),
  ahora: new Date().toLocaleString("es-ES"),
};`
	},
	datenow: {
		titulo: "Timestamp actual",
		descripcion: "Date.now() devuelve los milisegundos transcurridos desde el 1 de enero de 1970.",
		prueba: "Ejecuta dos veces y observa cómo cambia el valor.",
		codigo: `return {
  ahoraMs: Date.now(),
  tuFechaMs: fecha.getTime(),
  diferenciaSegundos: Math.round((Date.now() - fecha.getTime()) / 1000),
};`
	},
	gettime: {
		titulo: "Milisegundos de la fecha",
		descripcion: "getTime() devuelve el timestamp de una fecha concreta en milisegundos.",
		prueba: "Resta dos getTime() para calcular una diferencia de tiempo.",
		codigo: `return fecha.getTime();`
	},
	getfullyear: {
		titulo: "Obtén el año",
		descripcion: "getFullYear() devuelve el año completo de la fecha, con cuatro cifras.",
		prueba: "Cambia el año en el constructor y ejecuta de nuevo.",
		codigo: `return fecha.getFullYear();`
	},
	getmonth: {
		titulo: "Obtén el mes",
		descripcion: "getMonth() devuelve el mes entre 0 (enero) y 11 (diciembre).",
		prueba: "Elige diciembre y comprueba que devuelve 11.",
		codigo: `return {
  indice: fecha.getMonth(),
  mes: fecha.getMonth() + 1,
};`
	},
	getdate: {
		titulo: "Día del mes",
		descripcion: "getDate() devuelve el día del mes, de 1 a 31.",
		prueba: "Cambia el día a 31 en un mes corto y observa el desbordamiento.",
		codigo: `return fecha.getDate();`
	},
	getday: {
		titulo: "Día de la semana",
		descripcion: "getDay() devuelve el día de la semana: 0 es domingo y 6 es sábado.",
		prueba: "Elige un domingo y comprueba que devuelve 0.",
		codigo: `const dias = [
  "domingo",
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
];
return {
  indice: fecha.getDay(),
  dia: dias[fecha.getDay()],
};`
	},
	gethours: {
		titulo: "Obtén la hora",
		descripcion: "getHours() devuelve la hora local de la fecha, de 0 a 23.",
		prueba: "Cambia la hora por 23 y ejecuta de nuevo.",
		codigo: `return fecha.getHours();`
	},
	getminutes: {
		titulo: "Obtén los minutos",
		descripcion: "getMinutes() devuelve los minutos de la fecha, de 0 a 59.",
		prueba: "Prueba con 59 minutos y observa el resultado.",
		codigo: `return fecha.getMinutes();`
	},
	getseconds: {
		titulo: "Obtén los segundos",
		descripcion: "getSeconds() devuelve los segundos de la fecha, de 0 a 59.",
		prueba: "Prueba con 59 segundos y ejecuta de nuevo.",
		codigo: `return fecha.getSeconds();`
	},
	setfullyear: {
		titulo: "Cambia el año",
		descripcion: "setFullYear() modifica el año de la fecha y devuelve el nuevo timestamp.",
		prueba: "Cambia 2030 por otro año y compara la fecha resultante.",
		codigo: `const copia = new Date(fecha);
copia.setFullYear(2030);
console.log("Año original:", fecha.getFullYear());
return copia;`
	},
	setdate: {
		titulo: "Cambia el día del mes",
		descripcion: "setDate() modifica el día del mes y ajusta automáticamente el resto de la fecha.",
		prueba: "Prueba setDate(0) para ir al último día del mes anterior.",
		codigo: `const copia = new Date(fecha);
copia.setDate(1);
return copia;`
	},
	sethours: {
		titulo: "Cambia la hora",
		descripcion: "setHours() modifica la hora, los minutos, los segundos y los milisegundos.",
		prueba: "Cambia la hora a 0, 12 y 23 para comparar.",
		codigo: `const copia = new Date(fecha);
copia.setHours(23, 59, 0);
return copia;`
	},
	setminutes: {
		titulo: "Cambia los minutos",
		descripcion: "setMinutes() modifica los minutos y, opcionalmente, los segundos y milisegundos.",
		prueba: "Cambia los minutos a 0 y después a 59.",
		codigo: `const copia = new Date(fecha);
copia.setMinutes(0);
return copia;`
	},
	toisostring: {
		titulo: "Formato ISO",
		descripcion: "toISOString() devuelve la fecha en formato ISO 8601, siempre en UTC.",
		prueba: "Cambia la hora y observa el desplazamiento respecto a tu zona horaria.",
		codigo: `return fecha.toISOString();`
	},
	tolocalestring: {
		titulo: "Fecha y hora local",
		descripcion: "toLocaleString() devuelve la fecha y la hora formateadas según el idioma indicado.",
		prueba: "Prueba con \"en-US\" y \"es-ES\" para comparar formatos.",
		codigo: `return fecha.toLocaleString("es-ES");`
	},
	tolocaledatestring: {
		titulo: "Solo la fecha local",
		descripcion: "toLocaleDateString() devuelve únicamente la fecha formateada según el idioma.",
		prueba: "Prueba con \"en-GB\" y \"es-ES\" para ver el orden de día y mes.",
		codigo: `return fecha.toLocaleDateString("es-ES");`
	},
	tolocaletimestring: {
		titulo: "Solo la hora local",
		descripcion: "toLocaleTimeString() devuelve únicamente la hora formateada según el idioma.",
		prueba: "Cambia la hora y prueba con \"en-US\" para ver el formato de 12 horas.",
		codigo: `return fecha.toLocaleTimeString("es-ES");`
	}
};
var LIVE_EXAMPLE_IDS = /* @__PURE__ */ new Set([...Object.keys(EJEMPLOS), ...Object.keys(PLANTILLAS)]);
function getLiveExample(metodo) {
	const id = typeof metodo === "string" ? metodo : metodo?.id;
	if (!id) return null;
	const categoria = CATEGORIAS[id] ?? "array";
	if (EJEMPLOS[id]) return {
		categoria,
		...EJEMPLOS[id]
	};
	const plantilla = PLANTILLAS[id];
	if (!plantilla) return null;
	const etiqueta = typeof metodo === "string" ? id : metodo.titulo ?? metodo.nombre ?? id;
	return {
		categoria,
		etiqueta,
		titulo: plantilla.titulo,
		descripcion: plantilla.descripcion ?? `Ejecuta ${etiqueta} con tus propios datos y observa el resultado en la consola.`,
		prueba: plantilla.prueba ?? "Cambia los datos del constructor, edita el código y vuelve a ejecutar.",
		codigo: plantilla.codigo
	};
}
// scripts/_coverage.js
var docs = [
	...Object.values(METODOS_DOCS),
	...Object.values(METODOS_FECHAS_DOCS),
	{
		id: "find",
		titulo: "Array.prototype.find()",
		simulador: "true"
	}
];
var faltan = docs.filter((doc) => !getLiveExample(doc));
var sobran = [...LIVE_EXAMPLE_IDS].filter((id) => !docs.some((doc) => doc.id === id));
console.log(`Docs: ${docs.length}`);
console.log(`Ejemplos vivos: ${LIVE_EXAMPLE_IDS.size}`);
console.log(`Sin ejemplo: ${faltan.map((doc) => doc.id).join(", ") || "ninguno"}`);
console.log(`Sin doc: ${sobran.join(", ") || "ninguno"}`);
var etiquetas = docs.filter((doc) => {
	const config = getLiveExample(doc);
	return config && config.etiqueta !== doc.titulo;
});
console.log(`Etiquetas distintas: ${etiquetas.length}`);
for (const doc of etiquetas) console.log(`  ${doc.id}: ${getLiveExample(doc).etiqueta} ≠ ${doc.titulo}`);
process.exitCode = faltan.length || sobran.length ? 1 : 0;
export {};
