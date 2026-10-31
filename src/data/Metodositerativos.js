// Formato inline permitido en los textos: **negrita**, *cursiva* y `código`
// Los items de las listas pueden ser string o { texto, code, nota }
// foreach, reduceright y every usan "utilidad" -> SimuladorUtilidad.
// reduce usa "reduce-lab" -> ReduceLab (juego REDUCE LAB).

export const METODOS_ITERATIVOS = {
  /* ============================ forEach() ============================ */
  foreach: {
    id: "foreach",
    titulo: "Array.prototype.forEach()",
    simulador: "utilidad",
    definicion: [
      "Es un método iterativo del prototipo de `Array` que **ejecuta una función una vez por cada elemento** del arreglo, en orden ascendente.",
      "**No devuelve nada** (retorna `undefined`).",
    ],
    queEs: [
      "Es un método de **orden superior** (recibe otra función como argumento) diseñado para recorrer colecciones.",
      "A diferencia de un bucle `for`, `forEach` abstrae el manejo del índice y del control del bucle, con una sintaxis más declarativa y limpia.",
    ],
    paraQueSirve: [
      "Sirve para **ejecutar efectos secundarios** a partir de los elementos de un arreglo.",
      "Modificar el DOM para mostrar cada elemento.",
      "Guardar datos en `localStorage` o enviar una petición por elemento.",
      "Actualizar variables externas al flujo del arreglo.",
    ],
    comoFunciona: [
      "Toma una función callback y la ejecuta para cada elemento que tenga un valor asignado (**ignora los huecos** de arreglos dispersos).",
      "**No devuelve nada:** siempre retorna `undefined`.",
      "No altera el tamaño del arreglo por sí mismo (aunque tu callback sí podría hacerlo, y no es recomendable).",
      "**No se puede detener:** `break` y `continue` no funcionan dentro del callback.",
    ],
    sintaxis: [
      {
        code: `arreglo.forEach(function callback(elementoActual, indice, arregloCompleto) {
  // Tu código aquí
}, thisArg);`,
      },
    ],
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
// Me gusta: cereza`,
      },
      {
        titulo: "Ejemplo 2: Usando el índice",
        code: `const tareas = ["Comprar pan", "Lavar ropa", "Estudiar JS"];

tareas.forEach((tarea, index) => {
  console.log((index + 1) + ". " + tarea);
});
// 1. Comprar pan
// 2. Lavar ropa
// 3. Estudiar JS`,
      },
      {
        titulo: "Ejemplo 3: Acumular en una variable externa",
        code: `const precios = [10, 20, 30];
let total = 0;

precios.forEach(p => { total += p; });
console.log(total); // 60`,
      },
    ],
    errores: [
      {
        texto:
          "**Intentar usar `break` o `continue`:** `forEach` no tiene un mecanismo para detener la iteración.",
        code: `// ❌ SyntaxError: Illegal break statement
[1, 2, 3].forEach(num => {
  if (num === 2) break;
});`,
        nota: "Si necesitas cortar el recorrido, usa `for...of`, `some()`, `every()` o `find()`.",
      },
      {
        texto:
          "**Esperar que devuelva un nuevo arreglo:** se confunde con `map()`.",
        code: `// ❌ dobles es undefined
const dobles = [1, 2, 3].forEach(num => num * 2);

// ✅ Para transformar usa map()
const dobles2 = [1, 2, 3].map(num => num * 2);`,
      },
      {
        texto:
          "**Operaciones asíncronas:** `forEach` no espera a que las promesas se resuelvan antes de pasar al siguiente elemento.",
        code: `// ❌ No espera: todas las llamadas arrancan casi a la vez
numeros.forEach(async (num) => {
  await guardarEnBaseDeDatos(num);
});

// ✅ Respeta el orden
for (const num of numeros) {
  await guardarEnBaseDeDatos(num);
}`,
      },
    ],
    casos: [
      {
        texto: "**Renderizado de listas en el DOM (JavaScript vainilla):**",
        code: `usuarios.forEach(usuario => {
  const li = document.createElement("li");
  li.textContent = usuario;
  listaUL.appendChild(li);
});`,
      },
      {
        texto: "**Contar frecuencias:**",
        code: `const votos = ["si", "no", "si", "si", "no"];
const conteo = {};

votos.forEach(voto => {
  conteo[voto] = (conteo[voto] || 0) + 1;
}); // { si: 3, no: 2 }`,
      },
    ],
    relacion: [
      "**`map()`:** devuelve un nuevo arreglo transformado; `forEach` no devuelve nada.",
      "**`filter()`:** devuelve un arreglo filtrado.",
      "**`reduce()`:** condensa el arreglo en un solo valor.",
      "**`for...of`:** permite `break`, `continue` y `await` dentro del bucle.",
    ],
    analogia:
      "Imagina un **repartidor de correo** (`forEach`) con un saco de cartas (el arreglo). Tu única tarea es ir buzón por buzón y dejar la carta correspondiente (el callback). No te importa qué hace la gente con las cartas, no cambias las casas físicas, y no puedes simplemente detenerte a la mitad: tienes que pasar por todas las casas que tengan correspondencia.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla de oro:** si dentro de `forEach` usas `.push()` para llenar un nuevo arreglo que declaraste afuera (`let resultado = [];`), detente: lo que necesitas es un `.map()`. Mantén el código declarativo y libre de mutaciones innecesarias.",
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve forEach()?",
        opciones: [
          "Un nuevo array",
          "El mismo array",
          "undefined",
          "Un booleano",
        ],
        correcta: 2,
      },
      {
        id: 2,
        pregunta: "¿Para qué sirve principalmente forEach()?",
        opciones: [
          "Para transformar datos en un nuevo array",
          "Para ejecutar efectos secundarios por cada elemento",
          "Para filtrar elementos",
          "Para ordenar un array",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué pasa si usas break dentro del callback de forEach?",
        opciones: [
          "Detiene el recorrido",
          "Lanza un SyntaxError",
          "Salta al siguiente elemento",
          "No pasa nada",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta:
          "¿Qué valor tiene dobles en const dobles = [1, 2, 3].forEach(n => n * 2)?",
        opciones: ["[2, 4, 6]", "[1, 2, 3]", "undefined", "6"],
        correcta: 2,
      },
      {
        id: 5,
        pregunta: "¿Qué alternativa usarías para poder cortar el recorrido?",
        opciones: ["map()", "for...of o some()", "flat()", "concat()"],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿forEach espera a las promesas de un callback async?",
        opciones: [
          "Sí, siempre",
          "No, no espera a que se resuelvan antes de seguir",
          "Solo con await",
          "Solo con try/catch",
        ],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿Qué hace forEach con los huecos de un array disperso?",
        opciones: [
          "Los ignora",
          "Los recorre como undefined",
          "Lanza un error",
          "Los rellena con null",
        ],
        correcta: 0,
      },
      {
        id: 8,
        pregunta:
          "Si dentro de forEach haces push() a un array externo, ¿qué método te conviene?",
        opciones: ["map()", "pop()", "fill()", "join()"],
        correcta: 0,
      },
    ],
  },

  /* ============================ reduce() ============================ */
  reduce: {
    id: "reduce",
    titulo: "Array.prototype.reduce()",
    simulador: "reduce-lab",
    definicion: [
      "Es un método iterativo de `Array` que ejecuta una función **reductora** sobre cada elemento y devuelve **un único valor** acumulado.",
    ],
    queEs: [
      "Es uno de los métodos de orden superior más potentes y versátiles de JavaScript.",
      "A diferencia de `forEach` o `map`, que procesan elementos de forma aislada, `reduce` mantiene un **acumulador** (una *memoria*) que viaja de una iteración a la siguiente, permitiendo combinar todos los elementos en un solo resultado.",
    ],
    paraQueSirve: [
      "Sumar, multiplicar o promediar números.",
      "Aplanar matrices.",
      "Transformar un arreglo de objetos en un solo objeto (indexar o agrupar).",
      "Replicar el comportamiento de `map()` o `filter()`.",
    ],
    comoFunciona: [
      "Recibe una función **callback (reductora)** y un **valorInicial** (opcional, pero muy recomendable).",
      "El callback se ejecuta por cada elemento y el valor que **retorna** se convierte en el `acumulador` de la siguiente iteración.",
      "Al terminar, devuelve el último valor del acumulador.",
      "**Sin `valorInicial`:** el primer elemento (índice 0) es el acumulador inicial y la iteración empieza en el índice 1.",
      "Con un array vacío y sin `valorInicial` lanza `TypeError`.",
    ],
    sintaxis: [
      {
        code: `arreglo.reduce(function callback(acumulador, elementoActual, indice, arregloCompleto) {
  // Tu lógica aquí
  return nuevoAcumulador;
}, valorInicial);`,
      },
    ],
    nota: "**`acumulador`:** lo devuelto en la iteración anterior (o `valorInicial` en la primera). **`elementoActual`:** el elemento procesado. **`valorInicial`** *(opcional)*: primer valor del acumulador.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Suma de números",
        code: `const numeros = [10, 20, 30, 40];

const sumaTotal = numeros.reduce((acumulador, numero) => {
  return acumulador + numero;
}, 0); // 0 es el valorInicial

console.log(sumaTotal); // 100`,
      },
      {
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
// { Ropa: ["Camisa", "Pantalón"], Tecnología: ["Laptop"] }`,
      },
    ],
    errores: [
      {
        texto:
          "**Olvidar el `return` dentro del callback:** la siguiente iteración recibe `undefined` como acumulador.",
        code: `// ❌ Devuelve NaN
const total = [1, 2, 3].reduce((acc, num) => {
  acc + num; // falta el return
}, 0);`,
      },
      {
        texto:
          "**No poner `valorInicial` cuando el tipo de dato cambia:** JavaScript usa el primer elemento (un objeto, por ejemplo) como acumulador y la lógica se rompe.",
        code: `const carrito = [{ precio: 10 }, { precio: 20 }];

// ❌ Resultado absurdo: "[object Object]20"
carrito.reduce((acc, item) => acc + item.precio);

// ✅ Pasa 0 como valor inicial
carrito.reduce((acc, item) => acc + item.precio, 0); // 30`,
      },
      {
        texto: "**Array vacío sin `valorInicial`:** lanza error.",
        code: `[].reduce((a, n) => a + n);    // ❌ TypeError
[].reduce((a, n) => a + n, 0); // ✅ 0`,
      },
    ],
    casos: [
      {
        texto: "**Aplanar una matriz:**",
        code: `const matriz = [[1, 2], [3, 4], [5, 6]];
const plano = matriz.reduce((acc, sub) => acc.concat(sub), []);
// [1, 2, 3, 4, 5, 6]`,
      },
      {
        texto: "**Contar ocurrencias (histograma):**",
        code: `const frutas = ["manzana", "pera", "manzana", "platano", "pera"];
const conteo = frutas.reduce((acc, fruta) => {
  acc[fruta] = (acc[fruta] || 0) + 1;
  return acc;
}, {});
// { manzana: 2, pera: 2, platano: 1 }`,
      },
    ],
    relacion: [
      "**`map()` + `filter()`:** muchas veces un `reduce()` reemplaza el encadenamiento y recorre el arreglo una sola vez.",
      "**`reduceRight()`:** igual que `reduce`, pero de derecha a izquierda.",
      "**`forEach()`:** procesa elementos de forma aislada, sin acumulador.",
    ],
    analogia:
      "Imagina una **bola de nieve** (el acumulador) rodando colina abajo por una pista llena de juguetes sueltos (los elementos). Cada juguete que toca se integra a la bola. Al final de la colina ya no hay juguetes sueltos: tienes **una única y gran bola de nieve** que contiene todo lo recolectado.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Consejo pro:** aunque `reduce` puede hacer *absolutamente todo* (filtrar, mapear, buscar), no significa que *debas* usarlo. Si resuelves con `map()` o `filter()`, hazlo: tu código será más legible. Usa `reduce` cuando la complejidad de la transformación realmente lo justifique.",
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve reduce()?",
        opciones: [
          "Un nuevo array",
          "Un único valor acumulado",
          "undefined",
          "Un booleano",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué es el acumulador?",
        opciones: [
          "El elemento actual",
          "El valor que viaja de una iteración a la siguiente",
          "El índice",
          "El array original",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "Sin valorInicial, ¿qué es el acumulador inicial?",
        opciones: [
          "0",
          "undefined",
          "El primer elemento del array",
          "El último elemento",
        ],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Qué pasa con [].reduce((a, n) => a + n)?",
        opciones: [
          "Devuelve 0",
          "Devuelve undefined",
          "Lanza TypeError",
          "Devuelve []",
        ],
        correcta: 2,
      },
      {
        id: 5,
        pregunta: "¿Qué devuelve [10, 20, 30, 40].reduce((a, n) => a + n, 0)?",
        opciones: ["100", "90", "[100]", "0"],
        correcta: 0,
      },
      {
        id: 6,
        pregunta: "¿Qué pasa si el callback de reduce no devuelve nada?",
        opciones: [
          "Mantiene el acumulador",
          "La siguiente iteración recibe undefined y suele dar NaN",
          "Lanza un error",
          "Devuelve el array",
        ],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿Qué valorInicial usas para agrupar objetos en un objeto?",
        opciones: ["0", "[]", "{}", "null"],
        correcta: 2,
      },
      {
        id: 8,
        pregunta:
          "¿Cuántos parámetros del callback son obligatorios en la práctica?",
        opciones: [
          "Ninguno",
          "acumulador y elementoActual",
          "Solo el índice",
          "Los cuatro",
        ],
        correcta: 1,
      },
    ],
  },

  /* ============================ reduceRight() ============================ */
  reduceright: {
    id: "reduceright",
    titulo: "Array.prototype.reduceRight()",
    simulador: "utilidad",
    definicion: [
      "Es un método iterativo de `Array` que ejecuta una función reductora sobre cada elemento procesándolo **de derecha a izquierda** (del último al primero) y devuelve **un único valor** acumulado.",
    ],
    queEs: [
      "Es el hermano gemelo de `.reduce()`.",
      "Comparte la misma filosofía del **acumulador**, con una diferencia crucial: invierte el sentido del recorrido (empieza en el índice `n - 1` y termina en el `0`).",
    ],
    paraQueSirve: [
      "Problemas de reducción donde el **orden de las operaciones importa** (operaciones no conmutativas) y se debe empezar por el final.",
      "Evaluar expresiones de derecha a izquierda (potencias en cadena, algunas operaciones algebraicas).",
      "Componer funciones en el orden matemático estándar: `f(g(x))`.",
      "Procesar estructuras anidadas desde las hojas hacia la raíz.",
    ],
    comoFunciona: [
      "Toma una función callback reductora y un valorInicial opcional.",
      "Comienza en el **último índice** y se mueve hacia atrás.",
      "**Sin `valorInicial`:** el último elemento es el acumulador inicial y la iteración empieza en el penúltimo.",
      "Con un array vacío y sin `valorInicial` lanza `TypeError`.",
      "El índice que recibe el callback va **decrementando**: `n-1, n-2, ..., 0`.",
    ],
    sintaxis: [
      {
        code: `arreglo.reduceRight(function callback(acumulador, elementoActual, indice, arregloCompleto) {
  // Tu lógica aquí
  return nuevoAcumulador;
}, valorInicial);`,
      },
    ],
    nota: "**Parámetros:** idénticos a `reduce()`. **Retorno:** un único valor acumulado.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Operaciones no conmutativas (resta)",
        code: `const numeros = [1, 2, 3, 4];

// reduce (izquierda → derecha): ((1 - 2) - 3) - 4
numeros.reduce((acc, cur) => acc - cur);      // -8

// reduceRight (derecha → izquierda): ((4 - 3) - 2) - 1
numeros.reduceRight((acc, cur) => acc - cur); // -2`,
      },
      {
        titulo: "Ejemplo 2: Composición de funciones (compose)",
        descripcion:
          "En la composición matemática `f(g(x))` primero se ejecuta `g` y luego `f`, es decir, de derecha a izquierda.",
        code: `const duplicar = x => x * 2;
const alCuadrado = x => x * x;

const funciones = [duplicar, alCuadrado];

// duplicar(alCuadrado(5)) → duplicar(25) → 50
const resultado = funciones.reduceRight((valor, fn) => fn(valor), 5);

console.log(resultado); // 50`,
      },
    ],
    errores: [
      {
        texto:
          "**No ser consciente de la dirección:** al concatenar, el acumulador empieza con el último elemento y puedes invertir tus datos sin darte cuenta.",
        code: `const palabras = ["Mundo", "Hola"];
// acc empieza en "Hola", cur es "Mundo"
palabras.reduceRight((acc, cur) => acc + " " + cur); // "Hola Mundo"`,
      },
      "**Usarlo cuando el orden no importa:** con operaciones conmutativas (suma, producto, máximo) `reduce()` da el mismo resultado y es más habitual.",
    ],
    casos: [
      "**Composición de funciones y middleware:** ejecutar una cadena de funciones de derecha a izquierda.",
      "**Procesamiento de árboles o nodos (como el DOM):** evaluar los elementos finales antes de subir hacia los contenedores padres.",
    ],
    relacion: [
      "**`reduce()`:** lo mismo, pero de izquierda a derecha.",
      {
        texto:
          "**`reverse().reduce()`:** parece equivalente, pero `reverse()` **muta** el arreglo original (o exige clonarlo, con más memoria). `reduceRight` lee al revés sin tocar nada.",
        code: `// ❌ muta arr
arr.reverse().reduce(fn);

// ✅ no muta
arr.reduceRight(fn);`,
      },
    ],
    analogia:
      "Imagina una **pila de libros**. Con `.reduce()` tendrías que sacar primero el libro de hasta abajo y tirarías la pila. `.reduceRight()` es **desmontar la pila de forma natural**: tomas el libro de arriba del todo (el último que se agregó) y vas trabajando hacia abajo hasta la base.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Cuándo usarlo:** en el día a día usarás `.reduce()` el 95% de las veces. Guarda `.reduceRight()` para cuando construyas un motor de *middleware* o librerías de programación funcional donde la composición matemática estricta sea requerida.",
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿En qué dirección recorre reduceRight()?",
        opciones: [
          "De izquierda a derecha",
          "De derecha a izquierda",
          "Desde el medio",
          "Aleatoria",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta:
          "¿Qué devuelve [1, 2, 3, 4].reduceRight((acc, cur) => acc - cur)?",
        opciones: ["-8", "-2", "2", "0"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta:
          "Sin valorInicial, ¿cuál es el acumulador inicial de reduceRight()?",
        opciones: [
          "El primer elemento",
          "El último elemento",
          "0",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué índices recibe el callback de reduceRight()?",
        opciones: [
          "0, 1, 2...",
          "n-1, n-2, ..., 0",
          "Solo el último",
          "Aleatorios",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué ventaja tiene reduceRight() sobre reverse().reduce()?",
        opciones: [
          "Es más corto",
          "No muta el array original",
          "Devuelve un array",
          "Funciona con strings",
        ],
        correcta: 1,
      },
      {
        id: 6,
        pregunta:
          "¿Qué devuelve ['Mundo', 'Hola'].reduceRight((acc, cur) => acc + ' ' + cur)?",
        opciones: ["'Mundo Hola'", "'Hola Mundo'", "'HolaMundo'", "Un error"],
        correcta: 1,
      },
      {
        id: 7,
        pregunta:
          "¿Cuándo importa la diferencia entre reduce() y reduceRight()?",
        opciones: [
          "Con operaciones no conmutativas",
          "Siempre",
          "Nunca",
          "Solo con strings",
        ],
        correcta: 0,
      },
      {
        id: 8,
        pregunta: "¿Qué pasa con [].reduceRight(fn) sin valorInicial?",
        opciones: [
          "Devuelve undefined",
          "Devuelve []",
          "Lanza TypeError",
          "Devuelve 0",
        ],
        correcta: 2,
      },
    ],
  },

  /* ============================ every() ============================ */
  every: {
    id: "every",
    titulo: "Array.prototype.every()",
    simulador: "utilidad",
    definicion: [
      "Es un método de `Array.prototype` que comprueba si **todos los elementos** del array cumplen una condición definida por una función de prueba.",
      "Devuelve un **booleano**: `true` si **todos** cumplen, `false` si **al menos uno** no cumple.",
    ],
    queEs: [
      "Es un método iterativo de arrays que forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
      "Ejecuta el callback sobre cada elemento y es **inmutable**: no modifica el array original.",
      "Es el opuesto lógico de `some()`.",
    ],
    paraQueSirve: [
      "Validar que todos los elementos cumplan una regla.",
      "Comprobar permisos y validar formularios.",
      "Revisar estados de datos antes de ejecutar una acción.",
    ],
    comoFunciona: [
      "Recorre el array elemento por elemento.",
      "Ejecuta el callback para cada elemento.",
      "**Cortocircuito:** si un elemento devuelve `false`, se detiene de inmediato y devuelve `false`.",
      "Si todos devuelven `true`, el resultado es `true`.",
      "En un **array vacío** devuelve `true` (ningún elemento contradice la condición).",
    ],
    sintaxis: [
      {
        code: `const todosCumplen = array.every((elemento, indice, array) => {
  return condicion;
}, thisArg);`,
      },
    ],
    nota: "**Parámetros:** `callback(elemento, indice, array)` y `thisArg` (opcional). **Retorno:** `true` si todos cumplen; `false` si alguno falla.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Todos cumplen",
        code: `const numeros = [5, 10, 20];
console.log(numeros.every(n => n > 0)); // true`,
      },
      {
        titulo: "Ejemplo 2: Uno falla (cortocircuito)",
        code: `const numeros = [5, -2, 10];
console.log(numeros.every(n => n > 0)); // false

// 5 → true
// -2 → false ❌ se detiene aquí, el 10 ni se revisa`,
      },
      {
        titulo: "Ejemplo 3: Validar usuarios activos",
        code: `const usuarios = [
  { nombre: "Ana", activo: true },
  { nombre: "Luis", activo: true }
];

console.log(usuarios.every(u => u.activo)); // true`,
      },
      {
        titulo: "Ejemplo 4: Usando el índice y el array vacío",
        code: `console.log([10, 20, 30].every((n, i) => i < n)); // true
console.log([].every(v => v > 0));                // true (array vacío)`,
      },
    ],
    errores: [
      {
        texto:
          "**Confundir `every()` con `some()`:** `every` pregunta *¿todos cumplen?*; `some` pregunta *¿al menos uno cumple?*.",
        code: `[2, 4, 6].every(x => x % 2 === 0); // true
[1, 3, 4].some(x => x % 2 === 0);  // true`,
      },
      {
        texto: "**Pensar que devuelve los elementos:** devuelve un booleano.",
        code: `[1, 2, 3].every(x => x > 0); // true  (no [1, 2, 3])`,
      },
      {
        texto:
          "**No devolver una condición en el callback:** con llaves y sin `return`, el callback devuelve `undefined` (falsy) y el resultado es `false`.",
        code: `// ❌ false
numeros.every(n => { n > 0; });

// ✅ Correcto
numeros.every(n => { return n > 0; });`,
      },
      "**Olvidar el caso del array vacío:** `[].every(...)` siempre es `true`; si no quieres eso, comprueba `length` antes.",
    ],
    casos: [
      {
        texto: "**Validación de formularios:**",
        code: `const completos = campos.every(campo => campo.length > 0);`,
      },
      {
        texto: "**Permisos:**",
        code: `const tieneTodo = requeridos.every(p => usuario.permisos.includes(p));`,
      },
      {
        texto: "**Sistemas de compra:**",
        code: `const disponibles = productos.every(p => p.stock > 0);`,
      },
    ],
    relacion: [
      "**`some()`:** ¿alguno cumple?",
      "**`filter()`:** obtiene los elementos que cumplen.",
      "**`find()`:** encuentra el primer elemento que cumple.",
      "**`includes()`:** busca la existencia de un valor exacto.",
      "**`forEach()`:** ejecuta una función por elemento, sin devolver nada.",
    ],
    analogia:
      'Imagina una profesora revisando exámenes y preguntándose **"¿todos los alumnos aprobaron?"**. Revisa uno por uno: Ana aprobó ✅, Luis aprobó ✅, Pedro desaprobó ❌. En cuanto aparece Pedro ya sabe que la respuesta es `false`: **no todos aprobaron**, y no necesita revisar al resto.',
    fuente: "MDN Web Docs | ECMAScript Specification",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve every()?",
        opciones: [
          "El primer elemento que cumple",
          "Un booleano",
          "Un nuevo array",
          "El índice",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve [].every(x => x > 0)?",
        opciones: ["false", "undefined", "true", "Un error"],
        correcta: 2,
      },
      {
        id: 3,
        pregunta:
          "¿Qué pasa cuando every() encuentra un elemento que no cumple?",
        opciones: [
          "Sigue recorriendo",
          "Se detiene y devuelve false",
          "Lo elimina",
          "Lanza un error",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué devuelve [5, -2, 10].every(n => n > 0)?",
        opciones: ["true", "false", "[5, 10]", "-2"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Cuál es la diferencia entre every() y some()?",
        opciones: [
          "every: ¿todos cumplen? some: ¿al menos uno cumple?",
          "Son iguales",
          "some es más lento",
          "every modifica el array",
        ],
        correcta: 0,
      },
      {
        id: 6,
        pregunta: "¿every() modifica el array original?",
        opciones: ["Sí", "No", "Solo con números", "Depende del callback"],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿Qué devuelve [10, 20, 30].every((n, i) => i < n)?",
        opciones: ["false", "true", "undefined", "Un error"],
        correcta: 1,
      },
      {
        id: 8,
        pregunta: "¿Por qué numeros.every(n => { n > 0; }) da false?",
        opciones: [
          "Porque falta el return y el callback devuelve undefined",
          "Porque every no acepta llaves",
          "Porque n es negativo",
          "Porque el array está vacío",
        ],
        correcta: 0,
      },
    ],
  },
};
