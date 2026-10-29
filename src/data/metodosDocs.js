import { METODOS_TRANSFORMACION } from "./metodostransformacion";
import { METODOS_MUTADORES } from "./metodosMutadores";
import { METODOS_UTILIDADES } from "./metodosUtilidades";
import { METODOS_ITERATIVOS } from "./metodosIterativos";

import { METODOS_STRINGS_DOCS } from "./metodosStrings";
import { METODOS_NUMEROS_DOCS } from "./metodosNumeros";
const METODOS_BUSQUEDA = {
  findindex: {
    id: "findindex",
    titulo: "Array.prototype.findIndex()",
    simulador: true,
    definicion: [
      "Es un método iterativo integrado en JavaScript que se utiliza para buscar la posición de un elemento dentro de un array.",
      "Devuelve el **índice numérico** del primer elemento que cumpla con una condición determinada por una función.",
    ],
    queEs: [
      "Es un método de orden superior (Higher-Order Function) hermano de `find()`.",
      "En lugar de extraer o devolver el objeto o valor encontrado, devuelve su posición en la lista (basada en índice cero: `0, 1, 2...`).",
    ],
    paraQueSirve: [
      "Sirve para saber exactamente **dónde** está ubicado un elemento dentro de un array.",
      "Es fundamental cuando necesitas la posición para realizar operaciones posteriores, como eliminar ese elemento específico con `splice()` o actualizar su contenido en un estado (muy común en React).",
    ],
    comoFunciona: [
      "Recorre el array desde el índice `0` hasta el final.",
      "Evalúa cada elemento con la función de prueba (callback).",
      "**Cortocircuito:** En cuanto encuentra el primer elemento que devuelve `true`, se detiene inmediatamente y devuelve el número de su índice.",
      "Si recorre todo el array y ningún elemento cumple la condición, devuelve `-1`.",
    ],
    sintaxis: [
      {
        code: `const indiceEncontrado = array.findIndex((elemento, indice, array) => {
  // Condición que debe devolver true o false
  return condicion;
});`,
      },
      {
        caption: "Forma corta (la más común):",
        code: `const index = array.findIndex(elemento => elemento.id === idBuscado);`,
      },
    ],
    ejemplos: [
      {
        titulo:
          "Ejemplo 1: Buscar el índice de un objeto (Caso típico para modificar/eliminar)",
        code: `const carrito = [
  { id: 101, producto: "Laptop", cantidad: 1 },
  { id: 102, producto: "Mouse", cantidad: 2 },
  { id: 103, producto: "Teclado", cantidad: 1 }
];

const indiceMouse = carrito.findIndex(item => item.id === 102);
console.log(indiceMouse); // Resultado: 1 (porque está en la segunda posición)`,
      },
      {
        titulo: "Ejemplo 2: Cuando no encuentra el elemento",
        code: `const edades = [15, 17, 14, 16];
const indiceAdulto = edades.findIndex(edad => edad >= 18);

console.log(indiceAdulto); // Resultado: -1 (nadie es mayor de edad)`,
      },
    ],
    errores: [
      "**Olvidar que devuelve `-1` si falla:** Si no encuentra nada, devuelve `-1`. Si usas ese `-1` directamente en un método como `splice(index, 1)` sin validar, podrías terminar eliminando el *último* elemento del array por error.",
      '**Confundirlo con `indexOf()`:** `indexOf()` sirve para buscar elementos simples (como un array de strings o números: `["a", "b"].indexOf("b")`). No acepta una función callback, por lo que **no sirve** para buscar dentro de un array de objetos complejos.',
      "**Esperar un valor booleano (`true`/`false`):** Recuerda que siempre devuelve un número (`0`, `1`, `2`... o `-1`). El número `0` es evaluado como *falsy* en JavaScript, lo que puede causar bugs si lo pones directo en un `if`.",
    ],
    casos: [
      "**Eliminar elementos (Delete):** Encontrar la posición de un comentario o una foto por su ID para poder borrarlo del array usando `array.splice(indice, 1)`.",
      "**Actualizar elementos (Update):** Encontrar la posición de un elemento para modificar una de sus propiedades directamente (ej. incrementar la cantidad de un producto en un carrito de compras).",
    ],
    relacion: [
      "**`find()`:** Funciona igual, pero te devuelve el *elemento completo* (el objeto), no su posición.",
      "**`indexOf()`:** Busca un valor plano directamente, pero no recibe funciones/condiciones lógicas.",
      "**`splice()`:** Es el método mutador que casi siempre se usa junto a `findIndex` para eliminar o reemplazar un ítem en una posición específica.",
    ],
    analogia:
      'Imagina que estás en la fila del cine y buscas a tu amigo que lleva una gorra roja. Vas contando desde el primer lugar de la fila: "1, 2, 3... ¡Ahí está!". No te importa qué ropa lleva o su nombre en ese momento, lo que le dices al grupo es: **"Está en el cuarto lugar de la fila"**. Ese número de posición es el `findIndex()`.',
    fuente: "MDN Web Docs | ECMAScript Specification",
    quiz: [
      {
        id: 1,
        pregunta:
          "¿Qué devuelve findIndex() si ningún elemento cumple la condición?",
        opciones: ["undefined", "null", "-1", "0"],
        correcta: 2,
      },
      {
        id: 2,
        pregunta:
          "¿Qué devuelve findIndex() cuando encuentra una coincidencia?",
        opciones: [
          "El elemento completo",
          "El índice numérico del primer elemento que cumple",
          "Un array con todos los índices",
          "true",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta:
          "¿Cuál es la diferencia principal entre find() y findIndex()?",
        opciones: [
          "findIndex() devuelve la posición y find() devuelve el elemento",
          "No hay diferencia",
          "find() devuelve la posición",
          "findIndex() solo funciona con números",
        ],
        correcta: 0,
      },
      {
        id: 4,
        pregunta:
          "Si tengo [5, 12, 8, 130, 44] y uso findIndex(n => n > 10), ¿qué devuelve?",
        opciones: ["1", "12", "3", "2"],
        correcta: 0,
      },
      {
        id: 5,
        pregunta:
          "¿Qué riesgo hay al usar el -1 directamente en splice(index, 1)?",
        opciones: [
          "No pasa nada",
          "Se elimina el último elemento del array",
          "Se lanza un error",
          "Se elimina el primer elemento",
        ],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿Por qué un if (array.findIndex(...)) puede causar bugs?",
        opciones: [
          "Porque devuelve strings",
          "Porque el índice 0 es falsy",
          "Porque devuelve un booleano",
          "Porque no acepta callbacks",
        ],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿Puede findIndex() modificar el array original?",
        opciones: [
          "Sí, siempre",
          "Solo con objetos",
          "No, solo lo lee",
          "Depende del callback",
        ],
        correcta: 2,
      },
      {
        id: 8,
        pregunta:
          "¿Qué método se usa normalmente junto a findIndex() para eliminar un elemento?",
        opciones: ["splice()", "concat()", "join()", "fill()"],
        correcta: 0,
      },
    ],
  },

  findlast: {
    id: "findlast",
    titulo: "Array.prototype.findLast()",
    simulador: true,
    definicion: [
      "Es un método iterativo integrado en JavaScript que se utiliza para buscar un elemento dentro de un array.",
      "Devuelve el **último elemento** que cumpla con una condición determinada por una función, recorriendo el array en orden inverso.",
    ],
    queEs: [
      "Es una incorporación moderna de JavaScript (ES2023).",
      "Funciona exactamente igual que `find()`, con la gran diferencia de que inicia la búsqueda desde el final del array hacia el principio (de derecha a izquierda).",
    ],
    paraQueSirve: [
      "Sirve para localizar de forma eficiente la **última coincidencia** o el registro más reciente en una lista cronológica o en un historial, evitando tener que voltear el array original (lo cual consume rendimiento y memoria).",
    ],
    comoFunciona: [
      "Recorre el array en orden inverso, empezando desde el último índice (`array.length - 1`) hacia el `0`.",
      "Evalúa cada elemento con la función de prueba (callback).",
      "**Cortocircuito:** En el momento exacto en que la función devuelve `true`, `findLast()` se detiene, ignora el resto del array y devuelve ese elemento.",
      "Si recorre todo el array de atrás hacia adelante y nadie cumple la condición, devuelve `undefined`.",
    ],
    sintaxis: [
      {
        code: `const ultimoEncontrado = array.findLast((elemento, indice, array) => {
  // Condición que debe devolver true o false
  return condicion;
});`,
      },
      {
        caption: "Forma corta:",
        code: `const ultimo = array.findLast(elemento => elemento.propiedad === valorBuscado);`,
      },
    ],
    ejemplos: [
      {
        titulo:
          "Ejemplo 1: Buscar la última transacción (el elemento más reciente)",
        code: `const transacciones = [
  { id: 1, tipo: "deposito", monto: 100 },
  { id: 2, tipo: "retiro", monto: 50 },
  { id: 3, tipo: "deposito", monto: 200 },
  { id: 4, tipo: "retiro", monto: 20 }
];

// Queremos saber el último depósito realizado
const ultimoDeposito = transacciones.findLast(t => t.tipo === "deposito");
console.log(ultimoDeposito); // Resultado: { id: 3, tipo: "deposito", monto: 200 }`,
      },
      {
        titulo: "Ejemplo 2: Cuando no encuentra nada",
        code: `const precios = [10, 20, 30];
const caro = precios.findLast(p => p > 50);

console.log(caro); // Resultado: undefined`,
      },
    ],
    errores: [
      "**Compatibilidad en entornos antiguos:** Al ser un método relativamente reciente, si trabajas en proyectos con versiones muy viejas de Node.js o navegadores antiguos sin transpilador (como Babel), podría dar error. Asegúrate de tener el entorno actualizado.",
      "**Manejo de `undefined`:** Al igual que `find()`, si no hay coincidencias devuelve `undefined`. Siempre debes validar el resultado antes de intentar leer sus propiedades.",
      "**Pensar que altera el array:** No modifica el orden ni los elementos del array original; solo cambia la dirección en la que se realiza la lectura.",
    ],
    casos: [
      "**Sistemas de Logs o Historiales:** Buscar la última acción que realizó un usuario en una sesión actual (por ejemplo, el último comentario editado o la última foto modificada).",
      "**Colas de prioridad:** Encontrar el último elemento de una lista que cumpla con cierto criterio de estado.",
    ],
    relacion: [
      "**`find()`:** Hace lo mismo, pero empieza a buscar desde el principio (índice 0).",
      "**`findLastIndex()`:** Funciona idéntico a `findLast()`, pero en lugar de devolver el elemento, devuelve su **índice numérico** (buscando de atrás hacia adelante).",
      "**`reverse().find()`:** Era la alternativa antigua para lograr esto, pero tenía el grave problema de que `reverse()` mutaba (modificaba) el array original, o requería crear una copia innecesaria (`[...array].reverse().find()`).",
    ],
    analogia:
      "Imagina que estás revisando una pila de facturas impresas donde las más nuevas se colocan siempre arriba (al final de la pila). Si quieres buscar el último pago que le hiciste a un proveedor específico, no empiezas desde la factura del fondo de la caja; vas directamente a la parte superior de la pila y revisas hacia abajo hasta encontrar la primera que coincida. Eso es `findLast()`.",
    fuente: "MDN Web Docs | ECMAScript 2023 Specification",
    quiz: [
      {
        id: 1,
        pregunta: "¿Desde dónde empieza a recorrer el array findLast()?",
        opciones: [
          "Desde el índice 0",
          "Desde el último elemento hacia el principio",
          "Desde el elemento del medio",
          "De forma aleatoria",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta:
          "¿Qué devuelve findLast() si ningún elemento cumple la condición?",
        opciones: ["-1", "null", "undefined", "Un array vacío"],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿En qué versión de ECMAScript se incorporó findLast()?",
        opciones: ["ES5", "ES2015", "ES2023", "ES2010"],
        correcta: 2,
      },
      {
        id: 4,
        pregunta:
          "Si tengo [1, 2, 3, 4, 5, 6] y uso findLast(n => n % 2 === 0), ¿qué devuelve?",
        opciones: ["2", "6", "4", "undefined"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué ventaja tiene frente a reverse().find()?",
        opciones: [
          "Es más corto de escribir",
          "No muta el array original ni crea copias",
          "Devuelve índices",
          "Funciona en navegadores antiguos",
        ],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿Cuál es la diferencia entre findLast() y findLastIndex()?",
        opciones: [
          "findLast() devuelve el elemento y findLastIndex() su índice",
          "Son idénticos",
          "findLast() devuelve un booleano",
          "findLastIndex() busca desde el principio",
        ],
        correcta: 0,
      },
      {
        id: 7,
        pregunta: "¿Qué pasa cuando findLast() encuentra una coincidencia?",
        opciones: [
          "Sigue buscando hacia el inicio",
          "Se detiene (cortocircuito) y devuelve ese elemento",
          "Lanza un error",
          "Devuelve todos los elementos encontrados",
        ],
        correcta: 1,
      },
      {
        id: 8,
        pregunta: "¿Cuál es un caso de uso ideal para findLast()?",
        opciones: [
          "Ordenar un array",
          "Encontrar el registro más reciente en un historial",
          "Unir strings",
          "Contar elementos",
        ],
        correcta: 1,
      },
    ],
  },

  findlastindex: {
    id: "findlastindex",
    titulo: "Array.prototype.findLastIndex()",
    simulador: true,
    definicion: [
      "Es un método iterativo integrado en JavaScript que se utiliza para buscar la posición de un elemento dentro de un array.",
      "Devuelve el **índice numérico** del último elemento que cumpla con una condición determinada por una función, recorriendo el array de atrás hacia adelante.",
    ],
    queEs: [
      "Es un método moderno (incorporado en ES2023) y es el hermano directo de `findIndex()`.",
      "La única diferencia es que inicia la inspección de los elementos desde el final del array hacia el principio (de derecha a izquierda).",
    ],
    paraQueSirve: [
      "Sirve para localizar la **posición exacta de la última coincidencia** en una lista.",
      "Es extremadamente útil cuando necesitas ese índice para modificar, reemplazar o eliminar el registro más reciente en un historial o en una lista cronológica.",
    ],
    comoFunciona: [
      "Recorre el array en orden inverso, empezando desde el último índice (`array.length - 1`) y bajando hacia el `0`.",
      "Evalúa cada elemento con la función callback.",
      "**Cortocircuito:** En cuanto encuentra el primer elemento (empezando por detrás) que devuelve `true`, se detiene de inmediato y devuelve su número de índice original.",
      "Si recorre todo el array y nadie cumple la condición, devuelve `-1`.",
    ],
    sintaxis: [
      {
        code: `const ultimoIndiceEncontrado = array.findLastIndex((elemento, indice, array) => {
  // Condición que debe devolver true o false
  return condicion;
});`,
      },
      {
        caption: "Forma corta:",
        code: `const lastIndex = array.findLastIndex(elemento => elemento.estado === "pendiente");`,
      },
    ],
    ejemplos: [
      {
        titulo:
          "Ejemplo 1: Buscar la posición del último comentario de un usuario",
        code: `const comentarios = [
  { id: 1, usuario: "Josue", texto: "Hola" },
  { id: 2, usuario: "Ana", texto: "Buen post" },
  { id: 3, usuario: "Josue", texto: "Me sirvió mucho" },
  { id: 4, usuario: "Carlos", texto: "Gracias" }
];

// Buscamos el índice del ÚLTIMO comentario que dejó "Josue"
const ultimoIndexJosue = comentarios.findLastIndex(c => c.usuario === "Josue");
console.log(ultimoIndexJosue); // Resultado: 2 (el comentario con ID 3)`,
      },
      {
        titulo: "Ejemplo 2: Cuando no hay coincidencia",
        code: `const notas = [11, 14, 12];
const desaprobadoIndex = notas.findLastIndex(n => n < 10);

console.log(desaprobadoIndex); // Resultado: -1`,
      },
    ],
    errores: [
      '**Confundir el índice devuelto:** Aunque el método busca de atrás hacia adelante, el índice que devuelve es el **índice real y absoluto del array** (contando desde 0 de izquierda a derecha). No devuelve una posición "invertida".',
      "**No validar el `-1`:** Al igual que `findIndex()`, si no encuentra nada devuelve `-1`. Si pasas ese `-1` directamente a métodos como `splice()`, puedes causar comportamientos inesperados en tus estados o datos.",
      "**Soporte del entorno:** Al ser de ES2023, requiere entornos de Node.js actualizados o configuraciones de empaquetadores modernos si se despliega en navegadores antiguos.",
    ],
    casos: [
      "**Deshacer acciones (Undo):** Encontrar el índice de la última modificación en un array de historial para poder revertirla o eliminarla.",
      "**Actualización cronológica:** Localizar el último elemento del carrito que coincide con un producto duplicado para modificar su cantidad o aplicar un descuento específico al más reciente.",
    ],
    relacion: [
      "**`findIndex()`:** Hace lo mismo, pero empieza a buscar desde el principio (índice 0).",
      "**`findLast()`:** Devuelve el *objeto o valor completo* en lugar de su número de posición.",
      "**`lastIndexOf()`:** Busca un valor plano (como un string o número) desde el final, pero no acepta funciones de condición complejas.",
    ],
    analogia:
      "Imagina que estás revisando el registro de asistencia de una empresa, donde cada día se anota la hora de entrada de los empleados en hojas consecutivas. Si quieres saber **en qué hoja** se registró por última vez un empleado esta semana, vas a la última página del archivador y vas hojeando hacia atrás hasta ver su nombre. El número de la página que encontraste es el `findLastIndex()`.",
    fuente: "MDN Web Docs | ECMAScript 2023 Specification",
    quiz: [
      {
        id: 1,
        pregunta:
          "¿Qué devuelve findLastIndex() si ningún elemento cumple la condición?",
        opciones: ["undefined", "0", "-1", "null"],
        correcta: 2,
      },
      {
        id: 2,
        pregunta: "El índice que devuelve findLastIndex() es...",
        opciones: [
          "Invertido, contado desde el final",
          "El índice absoluto original, contado desde 0 de izquierda a derecha",
          "Siempre array.length",
          "El elemento encontrado",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta:
          "Si tengo [10, 20, 30, 20, 40] y uso findLastIndex(n => n === 20), ¿qué devuelve?",
        opciones: ["1", "3", "4", "2"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿De qué método es hermano directo findLastIndex()?",
        opciones: ["findIndex()", "push()", "map()", "slice()"],
        correcta: 0,
      },
      {
        id: 5,
        pregunta: "¿En qué dirección recorre el array findLastIndex()?",
        opciones: [
          "De izquierda a derecha",
          "De derecha a izquierda",
          "Desde el centro",
          "De forma aleatoria",
        ],
        correcta: 1,
      },
      {
        id: 6,
        pregunta:
          "¿Qué método devuelve el elemento completo en lugar del índice, buscando desde el final?",
        opciones: [
          "findLast()",
          "indexOf()",
          "findLastIndex()",
          "lastIndexOf()",
        ],
        correcta: 0,
      },
      {
        id: 7,
        pregunta: "¿Qué riesgo hay al pasar un -1 directamente a splice()?",
        opciones: [
          "Puede eliminar el último elemento",
          "Elimina el primer elemento",
          "Duplica el array",
          "No pasa nada",
        ],
        correcta: 0,
      },
      {
        id: 8,
        pregunta: "¿Cuál es un caso de uso típico de findLastIndex()?",
        opciones: [
          "Deshacer (Undo) la última modificación en un historial",
          "Ordenar un array",
          "Concatenar arrays",
          "Clonar un objeto",
        ],
        correcta: 0,
      },
    ],
  },

  indexof: {
    id: "indexof",
    titulo: "Array.prototype.indexOf()",
    simulador: true,
    definicion: [
      "Es un método integrado en JavaScript que busca un **valor específico** dentro de un array (o un string) y devuelve el **primer índice numérico** donde se encuentra dicho valor.",
    ],
    queEs: [
      "A diferencia de métodos como `findIndex()`, `indexOf()` es un método de búsqueda **estricta y directa**.",
      "No recibe una función callback; en su lugar, se le pasa directamente el valor exacto que se desea localizar y realiza una comparación estricta (`===`).",
    ],
    paraQueSirve: [
      "Sirve para localizar de forma rápida y sencilla la posición de elementos primitivos (como números, strings o booleanos) dentro de una lista plana.",
      "También se utiliza comúnmente para verificar de forma rápida si un elemento existe en un array.",
    ],
    comoFunciona: [
      "Recorre la estructura de izquierda a derecha (desde el índice `0`).",
      "Compara cada elemento usando el operador de igualdad estricta (`===`) con el valor proporcionado.",
      "**Cortocircuito:** En cuanto encuentra la primera coincidencia exacta, detiene la búsqueda y devuelve el índice.",
      "Si recorre todo el array sin encontrar una coincidencia estricta, devuelve `-1`.",
    ],
    sintaxis: [
      {
        code: `// Sintaxis básica
const indice = array.indexOf(elementoBuscado);

// Sintaxis con índice de inicio (opcional)
const indiceDesdePosicion = array.indexOf(elementoBuscado, desdeElIndice);`,
      },
    ],
    ejemplos: [
      {
        titulo: "Ejemplo 1: Buscar en un array de strings (valores planos)",
        code: `const herramientas = ["React", "Notion", "Vite", "Notion"];

const primerNotion = herramientas.indexOf("Notion");
console.log(primerNotion); // Resultado: 1 (ignora el segundo "Notion" en la posición 3)`,
      },
      {
        titulo: "Ejemplo 2: Usando el segundo parámetro (desde dónde buscar)",
        code: `const frutas = ["manzana", "plátano", "fresa", "manzana"];

// Busca "manzana", pero empezando desde la posición 2
const segundaManzana = frutas.indexOf("manzana", 2);
console.log(segundaManzana); // Resultado: 3`,
      },
      {
        titulo: "Ejemplo 3: Cuando no encuentra el elemento",
        code: `const nombres = ["Josue", "Ana", "Carlos"];
const indiceMaria = nombres.indexOf("María");

console.log(indiceMaria); // Resultado: -1`,
      },
    ],
    errores: [
      {
        texto:
          "**Intentar buscar dentro de objetos:** `indexOf()` **no sirve** para buscar un objeto dentro de un array de objetos, a menos que tengas la referencia exacta en memoria.",
        code: `const usuarios = [{ id: 1, nombre: "Josue" }];
console.log(usuarios.indexOf({ id: 1, nombre: "Josue" })); // Resultado: -1 (son objetos distintos en memoria)`,
        nota: "Para arrays de objetos, usa `findIndex()`.",
      },
      '**Falso positivo con la posición `0`:** Si el elemento está en la primera posición, devuelve `0`. En JavaScript, `0` es un valor *falsy*, por lo que evaluar un `if (array.indexOf("X"))` puede fallar si no comparas explícitamente con `-1` (ej: `if (array.indexOf("X") !== -1)`).',
    ],
    casos: [
      "**Validación rápida de existencia:** Comprobar si un elemento está en una lista antes de insertarlo para evitar duplicados.",
      "**Eliminar elementos simples:** Encontrar el índice de un string o número específico para removerlo con `splice()`.",
      "**Manejo de strings:** Encontrar la posición exacta de una palabra o carácter dentro de un bloque de texto largo.",
    ],
    relacion: [
      "**`lastIndexOf()`:** Hace lo mismo, pero empieza a buscar desde el final del array hacia el principio.",
      "**`findIndex()`:** Sirve para búsquedas complejas porque recibe una función condicional en lugar de un valor estático.",
      "**`includes()`:** Devuelve un valor booleano (`true` o `false`). Si solo quieres saber si el elemento existe y no te importa su posición, es mejor usar `includes()`.",
    ],
    analogia:
      'Imagina que estás revisando una lista de asistencia impresa buscando el nombre "Carlos". Vas leyendo línea por línea desde arriba. En cuanto ves "Carlos", anotas el número de línea donde apareció y dejas de leer el resto de la hoja. Si terminas de leer toda la hoja y no estaba, anotas un tachón (`-1`). Eso es `indexOf()`.',
    fuente:
      "MDN Web Docs | Array.prototype.indexOf() y String.prototype.indexOf()",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué recibe indexOf() para realizar la búsqueda?",
        opciones: [
          "Una función callback",
          "El valor específico que se quiere buscar",
          "Un objeto de configuración",
          "Nada",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué tipo de comparación utiliza indexOf()?",
        opciones: [
          "Igualdad débil (==)",
          "Igualdad estricta (===)",
          "Comparación por callback",
          "Comparación alfabética",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve indexOf() si no encuentra el valor?",
        opciones: ["undefined", "-1", "null", "false"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: '¿Qué devuelve ["a", "b", "c", "b"].indexOf("b")?',
        opciones: ["1", "3", "2", "-1"],
        correcta: 0,
      },
      {
        id: 5,
        pregunta:
          "¿Por qué indexOf({ id: 1 }) no encuentra un objeto igual dentro de un array?",
        opciones: [
          "Porque compara referencias en memoria",
          "Porque solo acepta números",
          "Porque no recorre objetos",
          "Porque es muy lento",
        ],
        correcta: 0,
      },
      {
        id: 6,
        pregunta: "¿Para qué sirve el segundo parámetro de indexOf()?",
        opciones: [
          "Es el valor de reemplazo",
          "Es el índice desde donde empezar a buscar",
          "Es la cantidad de resultados",
          "Es el separador",
        ],
        correcta: 1,
      },
      {
        id: 7,
        pregunta:
          "Si solo quieres saber si un elemento existe (true/false), ¿qué método es mejor?",
        opciones: ["includes()", "push()", "splice()", "fill()"],
        correcta: 0,
      },
      {
        id: 8,
        pregunta:
          '¿Por qué un if (array.indexOf("X")) sin comparar puede fallar?',
        opciones: [
          "Porque devuelve strings",
          "Porque 0 es falsy y -1 es truthy",
          "Porque devuelve true/false",
          "Porque necesita un callback",
        ],
        correcta: 1,
      },
    ],
  },

  lastindexof: {
    id: "lastindexof",
    titulo: "Array.prototype.lastIndexOf()",
    simulador: true,
    definicion: [
      "Es un método integrado en JavaScript que busca un **valor específico** dentro de un array (o un string) y devuelve el **último índice numérico** donde se encuentra dicho valor, realizando la búsqueda en orden inverso.",
    ],
    queEs: [
      "Es la contraparte directa de `indexOf()`.",
      "Al igual que este, realiza una búsqueda **estricta y directa** (`===`) basada en un valor plano (primitivo) en lugar de una función callback, pero inicia su recorrido desde el final de la estructura hacia el principio.",
    ],
    paraQueSirve: [
      "Sirve para localizar de manera directa la posición de la **última aparición** de un elemento (como un string, número o booleano) en una lista o texto que contiene elementos duplicados, o para evaluar la coincidencia más reciente en un ordenamiento secuencial.",
    ],
    comoFunciona: [
      "Recorre la estructura de derecha a izquierda (empezando desde el índice `array.length - 1`).",
      "Compara cada elemento usando el operador de igualdad estricta (`===`) con el valor proporcionado.",
      "**Cortocircuito:** En cuanto encuentra la primera coincidencia exacta (viniendo desde el final), detiene la búsqueda y devuelve su índice real.",
      "Si recorre todo el array de atrás hacia adelante sin encontrar una coincidencia, devuelve `-1`.",
    ],
    sintaxis: [
      {
        code: `// Sintaxis básica
const ultimoIndice = array.lastIndexOf(elementoBuscado);

// Sintaxis con índice de inicio (opcional)
const ultimoIndiceDesdePosicion = array.lastIndexOf(elementoBuscado, desdeElIndice);`,
      },
    ],
    nota: "**Nota sobre el segundo parámetro:** Si pasas un `desdeElIndice` (por ejemplo, `5`), la búsqueda empezará en esa posición y se moverá exclusivamente hacia atrás (hacia el índice `0`).",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Buscar la última aparición en un array plano",
        code: `const puntuaciones = [10, 20, 30, 20, 40];

const ultimaPosicion20 = puntuaciones.lastIndexOf(20);
console.log(ultimaPosicion20); // Resultado: 3 (ignora el 20 que está en la posición 1)`,
      },
      {
        titulo:
          "Ejemplo 2: Usando el parámetro de inicio para buscar hacia atrás",
        code: `const letras = ["A", "B", "C", "A", "E", "F"];

// Empieza a buscar "A" desde la posición 2 hacia la izquierda
const indiceA = letras.lastIndexOf("A", 2);
console.log(indiceA); // Resultado: 0 (la "A" de la posición 3 es ignorada porque empezó en la 2)`,
      },
      {
        titulo: "Ejemplo 3: Cuando no encuentra el elemento",
        code: `const stack = ["React", "Vite", "Notion"];
const indiceNode = stack.lastIndexOf("Node");

console.log(indiceNode); // Resultado: -1`,
      },
    ],
    errores: [
      "**Confusión con el índice devuelto:** Aunque el recorrido se hace de derecha a izquierda, el número de índice devuelto es el **índice absoluto original** del array (contado desde 0 de izquierda a derecha). No devuelve una posición invertida.",
      {
        texto:
          "**Buscar objetos o arrays anidados:** Al igual que `indexOf()`, utiliza comparación por referencia en objetos. Si intentas buscar una estructura de objeto literal duplicada, devolverá `-1` porque sus referencias en memoria son distintas.",
        code: `const datos = [{ id: 1 }, { id: 1 }];
console.log(datos.lastIndexOf({ id: 1 })); // Resultado: -1`,
        nota: "Para arrays de objetos buscando desde el final, usa `findLastIndex()`.",
      },
    ],
    casos: [
      "**Rastreo de extensiones de archivos:** En strings, se usa frecuentemente para encontrar el último punto (`.`) de una ruta de archivo y así extraer su extensión (ej: `archivo.foto.copia.png`).",
      '**Filtrado de datos recientes:** Localizar la posición del último registro con un valor de estado idéntico (como un string `"error"`) para analizar el flujo de fallas en una lista de logs planos.',
    ],
    relacion: [
      "**`indexOf()`:** Hace lo mismo, pero evalúa de izquierda a derecha devolviendo la primera aparición.",
      "**`findLastIndex()`:** Se prefiere cuando la búsqueda en reversa requiere de una evaluación lógica compleja o un array de objetos.",
      "**`String.prototype.lastIndexOf()`:** Funciona exactamente igual, diseñado para encontrar la última subcadena o carácter dentro de un texto.",
    ],
    analogia:
      'Imagina que estás revisando el historial de asistencia en una pizarra. El nombre "Ana" aparece varias veces porque ha asistido varios días. Si quieres saber **cuándo fue la última vez** que vino, empiezas a leer la lista desde el último renglón hacia arriba. El número de renglón donde encuentres su nombre por primera vez (leyendo en reversa) es el `lastIndexOf()`.',
    fuente:
      "MDN Web Docs | Array.prototype.lastIndexOf() y String.prototype.lastIndexOf()",
    quiz: [
      {
        id: 1,
        pregunta: "¿En qué dirección recorre lastIndexOf() el array?",
        opciones: [
          "De izquierda a derecha",
          "De derecha a izquierda",
          "Desde el medio",
          "No tiene dirección",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: '¿Qué devuelve ["A", "B", "C", "A", "E"].lastIndexOf("A")?',
        opciones: ["0", "3", "4", "-1"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué hace el segundo parámetro de lastIndexOf()?",
        opciones: [
          "Empieza a buscar en esa posición y se mueve hacia atrás",
          "Empieza en esa posición y busca hacia adelante",
          "Limita la cantidad de resultados",
          "Define un separador",
        ],
        correcta: 0,
      },
      {
        id: 4,
        pregunta: "El índice que devuelve lastIndexOf() es...",
        opciones: [
          "El índice absoluto original, contado desde 0",
          "Un índice invertido",
          "Siempre length - 1",
          "Relativo al inicio de la búsqueda",
        ],
        correcta: 0,
      },
      {
        id: 5,
        pregunta: "¿Qué devuelve lastIndexOf() si el valor no existe?",
        opciones: ["null", "undefined", "-1", "0"],
        correcta: 2,
      },
      {
        id: 6,
        pregunta:
          "Para buscar objetos desde el final con una condición, ¿qué método usarías?",
        opciones: ["indexOf()", "findLastIndex()", "includes()", "join()"],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿Cuál es un uso típico de lastIndexOf() en strings?",
        opciones: [
          "Encontrar el último punto de un archivo para extraer su extensión",
          "Ordenar el texto",
          "Convertir a mayúsculas",
          "Eliminar espacios",
        ],
        correcta: 0,
      },
      {
        id: 8,
        pregunta: "¿De qué método es la contraparte lastIndexOf()?",
        opciones: ["indexOf()", "map()", "reduce()", "flat()"],
        correcta: 0,
      },
    ],
  },
};

export const METODOS_DOCS = {
  ...METODOS_BUSQUEDA,
  ...METODOS_MUTADORES,
  ...METODOS_UTILIDADES,
  ...METODOS_TRANSFORMACION,
  ...METODOS_ITERATIVOS,
  ...METODOS_STRINGS_DOCS,
  ...METODOS_NUMEROS_DOCS,
};
