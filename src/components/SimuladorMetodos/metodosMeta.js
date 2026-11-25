import { METODOS_ARRAYS } from '../../data/carreras';

/* Ids de todos los métodos de Array que tienen página propia. */
export const NOMBRES_METODOS = Object.fromEntries(
  METODOS_ARRAYS.flatMap((grupo) =>
    grupo.metodos.map((metodo) => [metodo.id, metodo.nombre])
  )
);

export const ARRAY_METHOD_IDS = new Set(Object.keys(NOMBRES_METODOS));

/* Familia de comportamiento: decide el diagrama y la traza. */
export const FAMILIA = {
  find: 'busqueda',
  findindex: 'busqueda',
  findlast: 'busqueda',
  findlastindex: 'busqueda',
  indexof: 'busqueda',
  lastindexof: 'busqueda',
  some: 'busqueda',
  every: 'busqueda',

  map: 'transformacion',
  filter: 'transformacion',
  flatmap: 'transformacion',
  slice: 'transformacion',
  with: 'transformacion',
  flat: 'transformacion',
  concat: 'transformacion',
  toreversed: 'transformacion',
  tosorted: 'transformacion',
  tospliced: 'transformacion',
  from: 'transformacion',
  fill: 'transformacion',
  reverse: 'transformacion',
  copywithin: 'transformacion',

  push: 'mutador',
  pop: 'mutador',
  shift: 'mutador',
  unshift: 'mutador',
  splice: 'mutador',
  sort: 'mutador',

  reduce: 'reduccion',
  reduceright: 'reduccion',

  entries: 'iterador',
  keys: 'iterador',
  values: 'iterador',
  foreach: 'iterador',

  join: 'utilidad',
  of: 'utilidad',
  isarray: 'utilidad',
  at: 'utilidad',
  length: 'utilidad',
};

export const MUTA = new Set([
  'fill', 'reverse', 'copywithin', 'push', 'pop', 'shift', 'unshift',
  'splice', 'sort', 'length',
]);

export const CORTA = new Set([
  'find', 'findindex', 'findlast', 'findlastindex', 'some', 'every',
]);

/* Nombre real en JavaScript: algunos ids no coinciden con el método. */
export const NOMBRE_JS = {
  indexof: 'indexOf',
  findindex: 'findIndex',
  findlast: 'findLast',
  findlastindex: 'findLastIndex',
  lastindexof: 'lastIndexOf',
  foreach: 'forEach',
  flatmap: 'flatMap',
  toreversed: 'toReversed',
  tosorted: 'toSorted',
  tospliced: 'toSpliced',
  copywithin: 'copyWithin',
  reduceright: 'reduceRight',
};

/*
 * Configuración visual por método: emoji, verbo, decisión del diagrama,
 * retorno y pista de la misión. Así cada apunte habla de SU método y no
 * de una familia genérica.
 */
export const UI_METODO = {
  push: {
    emoji: '📥',
    corto: 'push',
    descripcion: 'Añade uno o más elementos al FINAL del array y devuelve la nueva longitud.',
    decision: '¿Quedan argumentos?',
    yes: 'Sí: añadir',
    no: 'No: terminar',
    accion: 'Empujar al final',
    retorno: '🔢 Nueva longitud',
    fallo: '—',
    intro: 'push() empuja cada argumento al final, en orden.',
    pista: 'Coloca los elementos al final y observa la longitud que devuelve.',
  },
  unshift: {
    emoji: '⏫',
    corto: 'unshift',
    descripcion: 'Añade elementos al INICIO y desplaza los índices existentes.',
    decision: '¿Quedan argumentos?',
    yes: 'Sí: insertar',
    no: 'No: terminar',
    accion: 'Insertar al inicio',
    retorno: '🔢 Nueva longitud',
    fallo: '—',
    intro: 'unshift() abre hueco al principio y coloca los argumentos en orden.',
    pista: 'Inserta al principio: todos los índices antiguos se desplazan.',
  },
  pop: {
    emoji: '📤',
    corto: 'pop',
    descripcion: 'Extrae el ÚLTIMO elemento y lo devuelve. El array pierde longitud.',
    decision: '¿Hay elementos?',
    yes: 'Sí: extraer',
    no: 'No: undefined',
    accion: 'Extraer el último',
    retorno: '✅ Elemento extraído',
    fallo: 'undefined',
    intro: 'pop() se lleva el último elemento y acorta el array.',
    pista: 'Quita siempre el último elemento; el resto conserva su orden.',
  },
  shift: {
    emoji: '⏬',
    corto: 'shift',
    descripcion: 'Extrae el PRIMER elemento y desplaza el resto a la izquierda.',
    decision: '¿Hay elementos?',
    yes: 'Sí: extraer',
    no: 'No: undefined',
    accion: 'Extraer el primero',
    retorno: '✅ Elemento extraído',
    fallo: 'undefined',
    intro: 'shift() saca el primer elemento y reindexa todo el array.',
    pista: 'Quita el primero y mira cómo cambian los índices de los demás.',
  },
  reverse: {
    emoji: '🔄',
    corto: 'reverse',
    descripcion: 'Invierte el orden del array original: el primero pasa a ser el último.',
    decision: '¿Quedan parejas?',
    yes: 'Sí: intercambiar',
    no: 'No: terminar',
    accion: 'Intercambiar extremos',
    retorno: '📦 Array invertido',
    fallo: '—',
    intro: 'reverse() intercambia los extremos hasta llegar al centro.',
    pista: 'Intercambia el primero con el último y avanza hacia el centro.',
  },
  sort: {
    emoji: '🔀',
    corto: 'sort',
    descripcion: 'Ordena el array original en el sitio usando el comparador (a, b) => a - b.',
    decision: '¿Pares en orden?',
    yes: 'Sí: avanzar',
    no: 'No: intercambiar',
    accion: 'Comparar y ordenar',
    retorno: '📦 Array ordenado',
    fallo: '—',
    intro: 'sort() compara parejas y recoloca los elementos dentro del mismo array.',
    pista: 'Ordena de menor a mayor sin salirte del array original.',
  },
  tosorted: {
    emoji: '🧬',
    corto: 'toSorted',
    descripcion: 'Devuelve una COPIA ordenada: el array original no cambia.',
    decision: '¿Pares en orden?',
    yes: 'Sí: avanzar',
    no: 'No: intercambiar en la copia',
    accion: 'Copiar y ordenar',
    retorno: '📦 Array nuevo ordenado',
    fallo: '—',
    intro: 'toSorted() copia el array, ordena la copia y deja intacto el original.',
    pista: 'El original debe quedar igual: ordena solo la copia.',
  },
  at: {
    emoji: '🎯',
    corto: 'at',
    descripcion: 'Lee el elemento de una posición; los índices negativos cuentan desde el final.',
    decision: '¿Índice negativo?',
    yes: 'length + índice',
    no: 'índice directo',
    accion: 'Resolver índice y leer',
    retorno: '✅ Elemento',
    fallo: 'undefined',
    intro: 'at() traduce el índice y lee esa posición exacta.',
    pista: 'Con -1 apunta al último; con 0 al primero.',
  },
  some: {
    emoji: '🔎',
    corto: 'some',
    descripcion: 'Devuelve true si AL MENOS UN elemento cumple la condición.',
    decision: '¿Alguno cumple?',
    yes: 'Sí: true',
    no: 'No: siguiente',
    accion: 'Encontrar un testigo',
    retorno: '✅ Booleano',
    fallo: 'false',
    intro: 'some() busca un único testigo; en cuanto lo encuentra, se detiene.',
    pista: 'Necesitas que al menos uno cumpla; no hace falta que cumplan todos.',
  },
  every: {
    emoji: '🛡️',
    corto: 'every',
    descripcion: 'Devuelve true solo si TODOS los elementos cumplen la condición.',
    decision: '¿Todos cumplen?',
    yes: 'Sí: siguiente',
    no: 'No: false',
    accion: 'Verificar a todos',
    retorno: '✅ Booleano',
    fallo: 'false',
    intro: 'every() exige unanimidad: un solo fallo detiene el recorrido.',
    pista: 'Basta con que uno falle para que el resultado sea false.',
  },
  findindex: {
    emoji: '🔢',
    corto: 'findIndex',
    descripcion: 'Devuelve el ÍNDICE del primer elemento que cumple la condición.',
    decision: '¿Cumple?',
    yes: 'Sí: devolver índice',
    no: 'No: siguiente',
    accion: 'Guardar posición',
    retorno: '🔢 Índice',
    fallo: '-1',
    intro: 'findIndex() recorre de izquierda a derecha y devuelve la posición.',
    pista: 'Busca la POSICIÓN del primero que cumpla, no el elemento.',
  },
  findlast: {
    emoji: '🔚',
    corto: 'findLast',
    descripcion: 'Devuelve el último ELEMENTO que cumple la condición.',
    decision: '¿Cumple?',
    yes: 'Sí: devolver elemento',
    no: 'No: anterior',
    accion: 'Guardar elemento',
    retorno: '✅ Elemento',
    fallo: 'undefined',
    intro: 'findLast() empieza por el final y devuelve el elemento encontrado.',
    pista: 'Busca el ELEMENTO más cercano al final que cumpla la condición.',
  },
  findlastindex: {
    emoji: '🧭',
    corto: 'findLastIndex',
    descripcion: 'Devuelve el ÍNDICE del último elemento que cumple la condición.',
    decision: '¿Cumple?',
    yes: 'Sí: devolver índice',
    no: 'No: anterior',
    accion: 'Guardar última posición',
    retorno: '🔢 Último índice',
    fallo: '-1',
    intro: 'findLastIndex() recorre al revés y devuelve la última posición válida.',
    pista: 'Busca la POSICIÓN más alta que cumpla la condición.',
  },
  indexof: {
    emoji: '🔍',
    corto: 'indexOf',
    descripcion: 'Devuelve el ÍNDICE de la primera aparición exacta de un valor.',
    decision: '¿valor === buscado?',
    yes: 'Sí: devolver índice',
    no: 'No: siguiente',
    accion: 'Comparar valor exacto',
    retorno: '🔢 Índice',
    fallo: '-1',
    intro: 'indexOf() compara por igualdad estricta y avanza desde el inicio.',
    pista: 'Busca una coincidencia exacta y devuelve su primera posición.',
  },
  lastindexof: {
    emoji: '🔎',
    corto: 'lastIndexOf',
    descripcion: 'Devuelve el ÍNDICE de la última aparición exacta de un valor.',
    decision: '¿valor === buscado?',
    yes: 'Sí: devolver índice',
    no: 'No: anterior',
    accion: 'Comparar desde el final',
    retorno: '🔢 Último índice',
    fallo: '-1',
    intro: 'lastIndexOf() compara desde el final y devuelve la última coincidencia.',
    pista: 'Recorre al revés y detente en la primera coincidencia que veas.',
  },
  find: {
    emoji: '🎯',
    corto: 'find',
    descripcion: 'Devuelve el PRIMER elemento que cumple la condición.',
    decision: '¿Cumple?',
    yes: 'Sí: devolver elemento',
    no: 'No: siguiente',
    accion: 'Guardar elemento',
    retorno: '✅ Elemento',
    fallo: 'undefined',
    intro: 'find() devuelve el primer elemento que pasa la prueba.',
    pista: 'Busca el primer ELEMENTO que cumpla la condición.',
  },
  filter: {
    emoji: '🧺',
    corto: 'filter',
    descripcion: 'Construye un array nuevo solo con los elementos que cumplen.',
    decision: '¿Cumple?',
    yes: 'Sí: conservar',
    no: 'No: descartar',
    accion: 'Guardar en el nuevo array',
    retorno: '📦 Array filtrado',
    fallo: '[]',
    intro: 'filter() recorre TODO el array y conserva los que pasan la prueba.',
    pista: 'Conserva todos los que cumplan, no solo el primero.',
  },
  map: {
    emoji: '🧪',
    corto: 'map',
    descripcion: 'Transforma cada elemento y devuelve un array nuevo de la misma longitud.',
    decision: '¿Quedan elementos?',
    yes: 'Sí: transformar',
    no: 'No: terminar',
    accion: 'Transformar elemento',
    retorno: '📦 Array nuevo',
    fallo: '[]',
    intro: 'map() aplica la función a cada posición y construye una salida nueva.',
    pista: 'Transforma cada elemento sin modificar el array original.',
  },
  toreversed: {
    emoji: '🪞',
    corto: 'toReversed',
    descripcion: 'Devuelve una copia invertida sin tocar el array original.',
    decision: '¿Quedan elementos?',
    yes: 'Sí: copiar al revés',
    no: 'No: terminar',
    accion: 'Copiar en orden inverso',
    retorno: '📦 Array nuevo invertido',
    fallo: '[]',
    intro: 'toReversed() recorre el original al revés y crea una copia.',
    pista: 'Invierte el orden, pero conserva intacto el array original.',
  },
  slice: {
    emoji: '✂️',
    corto: 'slice',
    descripcion: 'Copia un tramo entre dos índices sin incluir el final.',
    decision: '¿Dentro del tramo?',
    yes: 'Sí: copiar',
    no: 'No: saltar',
    accion: 'Copiar el tramo',
    retorno: '📦 Array recortado',
    fallo: '[]',
    intro: 'slice() selecciona un tramo y devuelve una copia.',
    pista: 'Copia desde el índice inicial hasta antes del final.',
  },
  length: {
    emoji: '📏',
    corto: 'length',
    descripcion: 'Número de elementos del array: la última posición es length - 1.',
    decision: '—',
    yes: '—',
    no: '—',
    accion: 'Contar elementos',
    retorno: '🔢 Número',
    fallo: '0',
    intro: 'length cuenta cuántos elementos hay ahora mismo.',
    pista: 'Cuenta los elementos; el último índice es length - 1.',
  },
};

export const uiMetodo = (metodoId) => {
  const propio = UI_METODO[metodoId];
  if (propio) return propio;
  const familia = FAMILIA[metodoId] ?? 'utilidad';
  const nombre = NOMBRES_METODOS[metodoId] ?? metodoId;
  const base = {
    busqueda: {
      emoji: '🔎',
      decision: '¿Cumple?',
      yes: 'Sí: devolver',
      no: 'No: siguiente',
      accion: 'Evaluar condición',
      retorno: '✅ Resultado',
      fallo: 'sin coincidencia',
      intro: 'Recorre el array y se detiene en cuanto la condición decide.',
      pista: 'Sigue el recorrido y fíjate cuándo se detiene.',
    },
    transformacion: {
      emoji: '🧪',
      decision: '¿Quedan elementos?',
      yes: 'Sí: procesar',
      no: 'No: terminar',
      accion: 'Transformar',
      retorno: '📦 Array nuevo',
      fallo: '[]',
      intro: 'Recorre el array completo y construye una salida nueva.',
      pista: 'Mira la forma de la salida: ¿array, elemento o valor?',
    },
    mutador: {
      emoji: '🛠️',
      decision: '¿Quedan pasos?',
      yes: 'Sí: mutar',
      no: 'No: terminar',
      accion: 'Modificar el array',
      retorno: '📦 Array mutado',
      fallo: '—',
      intro: 'Modifica el MISMO array y devuelve su nuevo estado o un valor.',
      pista: 'Fíjate en cómo cambia el array original y qué devuelve.',
    },
    reduccion: {
      emoji: '🧮',
      decision: '¿Quedan elementos?',
      yes: 'Sí: acumular',
      no: 'No: devolver',
      accion: 'Acumular',
      retorno: '🧮 Valor acumulado',
      fallo: '—',
      intro: 'Recorre todo el array y acumula un único resultado.',
      pista: 'Sigue el acumulador paso a paso.',
    },
    iterador: {
      emoji: '🔁',
      decision: '¿Fin?',
      yes: 'Sí: terminar',
      no: 'No: siguiente',
      accion: 'Entregar elemento',
      retorno: '📤 Secuencia',
      fallo: '—',
      intro: 'Produce un valor o efecto por cada elemento.',
      pista: 'Observa la secuencia que produce el recorrido.',
    },
    utilidad: {
      emoji: '🧰',
      decision: '¿Listo?',
      yes: 'Sí: devolver',
      no: 'No: calcular',
      accion: 'Calcular',
      retorno: '🔙 Resultado',
      fallo: '—',
      intro: 'Calcula el resultado con lo que recibe.',
      pista: 'Comprueba el valor devuelto y sus argumentos.',
    },
  }[familia];
  return {
    ...base,
    corto: nombre.replace('Array.prototype.', ''),
    descripcion: base.intro,
  };
};

const fn = {
  mayor25: (n) => n > 25,
  mayor10: (n) => n > 10,
  mayor50: (n) => n > 50,
  mayor3: (n) => n > 3,
  adulto: (n) => n >= 18,
  doble: (n) => n * 2,
  par: (n) => n % 2 === 0,
  parDoble: (n) => [n, n * 2],
  suma: (acc, n) => acc + n,
};

/*
 * Cada demo es el escenario que usan el diagrama, el entorno, la misión y el
 * sandbox. No se simulan comparaciones "a mano": la traza se genera con el
 * mismo array y la misma condición que se muestra en el código.
 */
export const DEMOS = {
  find: {
    array: [10, 20, 30, 40, 50],
    fn: fn.mayor25,
    cond: 'n > 25',
    limite: 25,
    op: '>',
    code: 'const resultado = array.find(n => n > 25);',
  },
  findindex: {
    array: [10, 20, 30, 40, 50],
    fn: fn.mayor25,
    cond: 'n > 25',
    limite: 25,
    op: '>',
    code: 'const resultado = array.findIndex(n => n > 25);',
  },
  findlast: {
    array: [5, 12, 8, 130, 44],
    fn: fn.mayor10,
    cond: 'n > 10',
    limite: 10,
    op: '>',
    code: 'const resultado = array.findLast(n => n > 10);',
  },
  findlastindex: {
    array: [5, 12, 8, 130, 44],
    fn: fn.mayor10,
    cond: 'n > 10',
    limite: 10,
    op: '>',
    code: 'const resultado = array.findLastIndex(n => n > 10);',
  },
  indexof: {
    array: ['React', 'Notion', 'Vite', 'Node'],
    buscar: 'Notion',
    cond: 'elemento === "Notion"',
    code: 'const resultado = array.indexOf("Notion");',
  },
  lastindexof: {
    array: ['React', 'Notion', 'Vite', 'Notion'],
    buscar: 'Notion',
    cond: 'elemento === "Notion"',
    code: 'const resultado = array.lastIndexOf("Notion");',
  },
  some: {
    array: [12, 15, 20, 14],
    fn: fn.adulto,
    cond: 'n >= 18',
    limite: 18,
    op: '>=',
    code: 'const resultado = array.some(n => n >= 18);',
  },
  every: {
    array: [18, 22, 15, 30],
    fn: fn.adulto,
    cond: 'n >= 18',
    limite: 18,
    op: '>=',
    code: 'const resultado = array.every(n => n >= 18);',
  },

  map: {
    array: [1, 2, 3, 4],
    fn: fn.doble,
    cond: 'n * 2',
    code: 'const resultado = array.map(n => n * 2);',
  },
  filter: {
    array: [1, 2, 3, 4, 5, 6],
    fn: fn.mayor3,
    cond: 'n > 3',
    code: 'const resultado = array.filter(n => n > 3);',
  },
  flatmap: {
    array: [1, 2, 3],
    fn: fn.parDoble,
    cond: '[n, n * 2]',
    code: 'const resultado = array.flatMap(n => [n, n * 2]);',
  },
  slice: {
    array: ['a', 'b', 'c', 'd', 'e'],
    start: 1,
    end: 4,
    code: 'const resultado = array.slice(1, 4);',
  },
  fill: {
    array: [1, 2, 3, 4],
    value: 0,
    start: 1,
    end: 3,
    code: 'array.fill(0, 1, 3);\nconst resultado = array;',
  },
  with: {
    array: ['a', 'b', 'c'],
    index: 1,
    value: 'X',
    code: 'const resultado = array.with(1, "X");',
  },
  from: {
    array: ['a', 'b', 'c'],
    arrayLike: 'abc',
    code: 'const resultado = Array.from("abc");',
  },
  toreversed: {
    array: [1, 2, 3],
    code: 'const resultado = array.toReversed();',
  },
  reverse: {
    array: [1, 2, 3],
    code: 'array.reverse();\nconst resultado = array;',
  },
  flat: {
    array: [1, [2, 3], [4, [5]]],
    depth: 1,
    code: 'const resultado = array.flat(1);',
  },
  copywithin: {
    array: [1, 2, 3, 4, 5],
    target: 0,
    start: 3,
    code: 'array.copyWithin(0, 3);\nconst resultado = array;',
  },

  entries: {
    array: ['a', 'b', 'c'],
    code: 'const resultado = [...array.entries()];',
  },
  keys: {
    array: ['a', 'b', 'c'],
    code: 'const resultado = [...array.keys()];',
  },
  values: {
    array: ['a', 'b', 'c'],
    code: 'const resultado = [...array.values()];',
  },

  push: {
    array: [1, 2, 3],
    items: [4, 5],
    code: 'const resultado = array.push(4, 5);',
  },
  pop: {
    array: [1, 2, 3],
    code: 'const resultado = array.pop();',
  },
  shift: {
    array: [1, 2, 3],
    code: 'const resultado = array.shift();',
  },
  unshift: {
    array: [3, 4],
    items: [1, 2],
    code: 'const resultado = array.unshift(1, 2);',
  },
  splice: {
    array: [1, 2, 3, 4, 5],
    start: 1,
    deleteCount: 2,
    items: [9],
    code: 'const resultado = array.splice(1, 2, 9);',
  },
  tospliced: {
    array: [1, 2, 3, 4, 5],
    start: 1,
    deleteCount: 2,
    items: [9],
    code: 'const resultado = array.toSpliced(1, 2, 9);',
  },
  reduce: {
    array: [1, 2, 3, 4],
    fn: fn.suma,
    initial: 0,
    cond: 'acc + n',
    code: 'const resultado = array.reduce((acc, n) => acc + n, 0);',
  },
  reduceright: {
    array: [1, 2, 3, 4],
    fn: fn.suma,
    initial: 0,
    cond: 'acc + n',
    code: 'const resultado = array.reduceRight((acc, n) => acc + n, 0);',
  },
  foreach: {
    array: [1, 2, 3],
    fn: fn.doble,
    cond: 'n * 2',
    code: 'array.forEach(n => console.log(n * 2));\nconst resultado = undefined;',
  },
  concat: {
    array: [1, 2],
    items: [[3, 4], 5],
    code: 'const resultado = array.concat([3, 4], 5);',
  },
  join: {
    array: ['a', 'b', 'c'],
    sep: '-',
    code: 'const resultado = array.join("-");',
  },
  split: {
    array: [],
    texto: 'a-b-c',
    sep: '-',
    code: 'const resultado = "a-b-c".split("-");',
  },

  sort: {
    array: [3, 1, 2],
    code: 'array.sort((a, b) => a - b);\nconst resultado = array;',
  },
  tosorted: {
    array: [3, 1, 2],
    code: 'const resultado = array.toSorted((a, b) => a - b);',
  },
  of: {
    array: [1, 2, 3],
    items: [7, 8, 9],
    code: 'const resultado = Array.of(7, 8, 9);',
  },
  isarray: {
    array: [1, 2, 3],
    code: 'const resultado = Array.isArray(array);',
  },
  at: {
    array: ['a', 'b', 'c', 'd'],
    index: -1,
    code: 'const resultado = array.at(-1);',
  },
  length: {
    array: [1, 2, 3, 4, 5],
    code: 'const resultado = array.length;',
  },
};

export const obtenerDemo = (metodoId) =>
  DEMOS[metodoId] ?? {
    array: [1, 2, 3],
    code: 'const resultado = array;',
  };

export const obtenerFamilia = (metodoId) => FAMILIA[metodoId] ?? 'utilidad';

export const obtenerNombre = (metodoId) =>
  NOMBRES_METODOS[metodoId] ?? metodoId;

/* Comparativas que se muestran en "Relación con otros conceptos". */
export const RELACIONADOS = {
  find: ['find', 'findindex', 'filter'],
  findindex: ['findindex', 'find', 'indexof'],
  findlast: ['findlast', 'find', 'findlastindex'],
  findlastindex: ['findlastindex', 'findlast', 'lastindexof'],
  indexof: ['indexof', 'lastindexof', 'findindex'],
  lastindexof: ['lastindexof', 'indexof', 'findlastindex'],
  some: ['some', 'every', 'find'],
  every: ['every', 'some', 'filter'],

  map: ['map', 'filter', 'foreach'],
  filter: ['filter', 'map', 'find'],
  flatmap: ['flatmap', 'map', 'flat'],
  slice: ['slice', 'splice', 'tospliced'],
  fill: ['fill', 'with', 'copywithin'],
  with: ['with', 'fill', 'tospliced'],
  from: ['from', 'of', 'isarray'],
  toreversed: ['toreversed', 'reverse', 'tosorted'],
  reverse: ['reverse', 'toreversed', 'sort'],
  flat: ['flat', 'flatmap', 'concat'],
  copywithin: ['copywithin', 'fill', 'with'],

  entries: ['entries', 'keys', 'values'],
  keys: ['keys', 'entries', 'values'],
  values: ['values', 'entries', 'keys'],

  push: ['push', 'unshift', 'pop'],
  pop: ['pop', 'shift', 'push'],
  shift: ['shift', 'pop', 'unshift'],
  unshift: ['unshift', 'push', 'shift'],
  splice: ['splice', 'slice', 'tospliced'],
  tospliced: ['tospliced', 'splice', 'slice'],
  reduce: ['reduce', 'reduceright', 'foreach'],
  reduceright: ['reduceright', 'reduce', 'foreach'],
  foreach: ['foreach', 'map', 'reduce'],
  concat: ['concat', 'join', 'flat'],
  join: ['join', 'concat', 'split'],

  sort: ['sort', 'tosorted', 'toreversed'],
  tosorted: ['tosorted', 'sort', 'toreversed'],
  of: ['of', 'from', 'isarray'],
  isarray: ['isarray', 'of', 'from'],
  at: ['at', 'slice', 'length'],
  length: ['length', 'at', 'slice'],
};

export const obtenerRelacionados = (metodoId) => {
  const lista = RELACIONADOS[metodoId] ?? [metodoId];
  return lista.slice(0, 3);
};
