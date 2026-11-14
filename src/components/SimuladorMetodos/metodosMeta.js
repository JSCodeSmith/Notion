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
    code: 'const resultado = array.indexOf("Notion");',
  },
  lastindexof: {
    array: ['React', 'Notion', 'Vite', 'Notion'],
    buscar: 'Notion',
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
