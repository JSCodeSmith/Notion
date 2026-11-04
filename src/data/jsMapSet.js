export const JS_MAP_SET = {
  id: "map-set",
  label: "Map y Set",
  icon: "🗺️",
  titulo: "Map y Set en JavaScript",
  descripcion:
    "Colecciones modernas para guardar pares clave-valor con cualquier tipo de clave (Map) y valores únicos sin duplicados (Set).",
  grupos: [
    {
      seccion: "Map: pares clave-valor",
      metodos: [
        {
          id: "map-set",
          nombre: "Map.prototype.set()",
          firma: "map.set(clave, valor)",
          icon: "➕",
        },
        {
          id: "map-get",
          nombre: "Map.prototype.get()",
          firma: "map.get(clave)",
          icon: "🔎",
        },
        {
          id: "map-has",
          nombre: "Map.prototype.has()",
          firma: "map.has(clave)",
          icon: "❓",
        },
        {
          id: "map-delete",
          nombre: "Map.prototype.delete()",
          firma: "map.delete(clave)",
          icon: "🗑️",
        },
        {
          id: "map-foreach",
          nombre: "Map.prototype.forEach()",
          firma: "map.forEach((valor, clave, mapa) => {})",
          icon: "🔁",
        },
        {
          id: "map-entries",
          nombre: "Map.prototype.entries()",
          firma: "map.entries()",
          icon: "📜",
        },
      ],
    },
    {
      seccion: "Set: valores únicos",
      metodos: [
        {
          id: "set-add",
          nombre: "Set.prototype.add()",
          firma: "set.add(valor)",
          icon: "➕",
        },
        {
          id: "set-has",
          nombre: "Set.prototype.has()",
          firma: "set.has(valor)",
          icon: "❓",
        },
        {
          id: "set-delete",
          nombre: "Set.prototype.delete()",
          firma: "set.delete(valor)",
          icon: "🗑️",
        },
        {
          id: "set-foreach",
          nombre: "Set.prototype.forEach()",
          firma: "set.forEach((valor, valor, set) => {})",
          icon: "🔁",
        },
      ],
    },
  ],
};

export const JS_MAP_SET_DOCS = {
  "map-set": {
    id: "map-set",
    titulo: "Map.prototype.set()",
    icon: "➕",
    categoria: "Map y Set",
    firma: "map.set(clave, valor)",

    definicion: [
      "Es el método de `Map` que **añade un nuevo par clave-valor** o **actualiza el valor** de una clave que ya existe. ➕",
      "Siempre devuelve el propio `Map`, por lo que se pueden encadenar varias llamadas seguidas.",
    ],

    queEs: [
      "Es la operación de escritura básica de un `Map`: sin `set()` no se puede guardar ningún dato. ✍️",
      "A diferencia de un objeto normal, la clave puede ser **cualquier valor**: un string, un número, un objeto o incluso una función.",
    ],

    paraQueSirve: [
      "🗂️ Guardar datos asociados a una clave que no es un string, como un objeto o un número.",
      "🔄 Actualizar el valor de una entrada existente sin crear una nueva.",
      "🔗 Encadenar varias inserciones en una sola expresión.",
      "🧮 Construir contadores, cachés y diccionarios con claves dinámicas.",
    ],

    comoFunciona: [
      "Recibe dos argumentos: la `clave` y el `valor`.",
      "Comprueba si la clave ya existe usando comparación **SameValueZero**: parecida a `===`, pero `NaN` se considera igual a `NaN`.",
      "Si la clave no existe, crea una nueva entrada; si ya existe, **reemplaza** el valor anterior.",
      "Guarda la entrada respetando el **orden de inserción** del `Map`.",
      "Devuelve el mismo `Map`, lo que permite encadenar llamadas como `mapa.set(\"a\", 1).set(\"b\", 2)`.",
    ],

    sintaxis: [
      {
        code: `const mapa = new Map();
mapa.set("nombre", "Ana");`,
      },
      {
        caption: "Encadenar varias inserciones:",
        code: `const mapa = new Map()
  .set("a", 1)
  .set("b", 2)
  .set("c", 3);`,
      },
      {
        caption: "Usar un objeto como clave:",
        code: `const usuario = { id: 7 };
const sesiones = new Map();
sesiones.set(usuario, "activa");
console.log(sesiones.get(usuario)); // "activa"`,
      },
    ],

    nota: "💡 Actualizar una clave existente **no cambia su posición** en el orden de inserción: conserva el lugar que tenía.",

    ejemplos: [
      {
        titulo: "1. 🗺️ Crear un Map desde un array",
        code: `const pares = [
  ["nombre", "Ana"],
  ["edad", 25],
];
const mapa = new Map(pares);

mapa.set("ciudad", "Madrid");
console.log(mapa.size); // 3
console.log(Array.from(mapa.entries()));`,
      },
      {
        titulo: "2. 🔄 Actualizar un valor existente",
        code: `const stock = new Map([["manzanas", 10]]);

stock.set("manzanas", 6);
console.log(stock.get("manzanas")); // 6
console.log(stock.size); // 1`,
      },
      {
        titulo: "3. 🧱 Claves que no son strings",
        code: `const mapa = new Map();
const claveNumerica = 42;
const claveObjeto = { tipo: "config" };

mapa.set(claveNumerica, "número");
mapa.set(claveObjeto, "objeto");

console.log(mapa.get(42)); // "número"
console.log(mapa.get(claveObjeto)); // "objeto"`,
      },
      {
        titulo: "4. ⛓️ Encadenar llamadas",
        code: `const colores = new Map()
  .set("rojo", "#f00")
  .set("verde", "#0f0")
  .set("azul", "#00f");

console.log(colores.size); // 3`,
      },
    ],

    errores: [
      "**Confundir `set()` con `add()`:** `add()` pertenece a `Set`. En un `Map` lanza `TypeError: mapa.add is not a function`.",
      "**Esperar que devuelva el valor guardado:** devuelve el propio `Map`, no el valor. Para leerlo hay que usar `get()`.",
      "**Usar `length`:** los `Map` usan la propiedad `size`; `mapa.length` es `undefined`.",
      "**Creer que las claves se convierten en string:** `mapa.set(1, \"a\")` y `mapa.set(\"1\", \"b\")` crean **dos entradas distintas**.",
      "**Usar como clave un objeto y luego otro objeto con el mismo contenido:** se comparan por referencia, así que son claves diferentes.",
    ],

    casos: [
      "🗂️ Asociar metadatos a objetos del DOM o a instancias de una clase.",
      "💾 Implementar una caché donde la clave es una URL o un objeto de parámetros.",
      "🧮 Contar frecuencias agrupando por cualquier tipo de clave.",
      "⚙️ Guardar configuraciones que necesitan un orden de inserción estable.",
    ],

    relacion: [
      "**`map.get()`:** es la operación inversa; recupera el valor de una clave.",
      "**`map.has()`:** comprueba si la clave existe antes de escribir o leer.",
      "**`map.delete()`:** elimina el par que `set()` había creado.",
      "**`map.entries()`:** devuelve todos los pares en el orden en que se insertaron.",
      "**`set.add()`:** método equivalente en los `Set`, pero guarda valores sueltos en lugar de pares.",
    ],

    analogia:
      "Imagina una biblioteca con un archivador de fichas. 📚 Cada ficha tiene una etiqueta (la clave) y una descripción (el valor). Cuando llega un libro nuevo, `set()` crea su ficha; si la ficha ya existe, borra la descripción antigua y escribe la nueva, dejando la ficha en el mismo cajón. Al final te devuelve el archivador completo para que puedas seguir trabajando con él.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ `set()` crea o actualiza, nunca falla si la clave no existe.",
      "✅ Devuelve el mismo `Map`, ideal para encadenar.",
      "✅ La clave puede ser de cualquier tipo, incluidos objetos.",
      "✅ El tamaño se consulta con `size`, no con `length`.",
      "💡 Regla: `set` escribe, `get` lee, `has` pregunta y `delete` borra.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve map.set(clave, valor)?",
        opciones: [
          "El valor guardado",
          "El propio Map",
          "true o false",
          "La clave utilizada",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué ocurre si la clave ya existe en el Map?",
        opciones: [
          "Se lanza un error",
          "Se crea una entrada duplicada",
          "Se reemplaza el valor anterior",
          "Se ignora la llamada",
        ],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿Cómo se consulta el número de entradas de un Map?",
        opciones: ["map.length", "map.size", "map.count", "map.total"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Cuál de estas claves es válida en un Map?",
        opciones: [
          "Solo strings",
          "Solo strings y números",
          "Cualquier valor, incluidos objetos",
          "Solo símbolos",
        ],
        correcta: 2,
      },
      {
        id: 5,
        pregunta: "¿Qué método de Set es el equivalente a Map.set()?",
        opciones: ["Set.add()", "Set.push()", "Set.put()", "Set.insert()"],
        correcta: 0,
      },
    ],
  },

  "map-get": {
    id: "map-get",
    titulo: "Map.prototype.get()",
    icon: "🔎",
    categoria: "Map y Set",
    firma: "map.get(clave)",

    definicion: [
      "Es el método de `Map` que devuelve el **valor asociado a una clave**. 🔎",
      "Si la clave no existe en el `Map`, devuelve `undefined` sin lanzar ningún error.",
    ],

    queEs: [
      "Es la operación de **lectura** básica de un `Map`, la pareja natural de `set()`. 📖",
      "Busca la clave con comparación **SameValueZero**, no con conversión a string como haría un objeto.",
    ],

    paraQueSirve: [
      "🔑 Obtener el valor guardado para una clave concreta.",
      "⚙️ Leer configuraciones y parámetros almacenados en un `Map`.",
      "🧠 Consultar cachés y memorizar resultados ya calculados.",
      "📊 Recuperar contadores o acumuladores de un diccionario.",
    ],

    comoFunciona: [
      "Recibe un único argumento: la `clave` que se quiere buscar.",
      "Recorre internamente las entradas comparando la clave con **SameValueZero**.",
      "Si encuentra la clave, devuelve su valor asociado.",
      "Si no la encuentra, devuelve `undefined`.",
      "No crea ni modifica ninguna entrada: es una operación de solo lectura.",
    ],

    sintaxis: [
      {
        code: `const valor = mapa.get(clave);`,
      },
      {
        caption: "Con un valor por defecto si la clave no existe:",
        code: `const valor = mapa.get(clave) ?? "sin datos";`,
      },
      {
        caption: "Comprobar antes de leer:",
        code: `if (mapa.has(clave)) {
  console.log(mapa.get(clave));
}`,
      },
    ],

    nota: "💡 `get()` devuelve `undefined` tanto si la clave no existe como si guardaste `undefined` como valor. Usa `has()` cuando necesites distinguir ambos casos.",

    ejemplos: [
      {
        titulo: "1. 🔎 Leer un valor sencillo",
        code: `const capitales = new Map([
  ["España", "Madrid"],
  ["Francia", "París"],
]);

console.log(capitales.get("España")); // "Madrid"`,
      },
      {
        titulo: "2. 🛟 Valor por defecto con ??",
        code: `const stock = new Map([["manzanas", 10]]);
const peras = stock.get("peras") ?? 0;

console.log(peras); // 0`,
      },
      {
        titulo: "3. 🧱 Clave de tipo objeto",
        code: `const usuario = { id: 1 };
const roles = new Map();
roles.set(usuario, "admin");

console.log(roles.get(usuario)); // "admin"
console.log(roles.get({ id: 1 })); // undefined`,
      },
      {
        titulo: "4. 🧮 Leer un contador acumulado",
        code: `const visitas = new Map();
const pagina = "/inicio";

visitas.set(pagina, (visitas.get(pagina) ?? 0) + 1);
visitas.set(pagina, (visitas.get(pagina) ?? 0) + 1);

console.log(visitas.get(pagina)); // 2`,
      },
    ],

    errores: [
      "**Confundir el tipo de la clave:** `mapa.get(1)` no encuentra la entrada creada con `mapa.set(\"1\", ...)`; son claves distintas.",
      "**No distinguir `undefined` de ausencia:** si el valor guardado es `undefined`, `get()` no permite saber si la clave existe.",
      "**Usar un objeto nuevo como clave:** `mapa.get({ id: 1 })` no encuentra la entrada creada con otro objeto, aunque tengan el mismo contenido.",
      "**Esperar que `get()` cree la entrada:** no la crea; para escribir hace falta `set()`.",
      "**Olvidar el valor por defecto:** operar directamente sobre el resultado puede producir `NaN` o errores si la clave no existe.",
    ],

    casos: [
      "⚙️ Leer el valor de una opción concreta de configuración.",
      "🧠 Recuperar un resultado ya calculado en una función memoizada.",
      "🏷️ Traducir un código o identificador a su descripción legible.",
      "📈 Consultar el acumulador de un contador agrupado.",
    ],

    relacion: [
      "**`map.set()`:** escribe el valor que después leerá `get()`.",
      "**`map.has()`:** permite saber si la clave existe antes de leer.",
      "**`map.delete()`:** elimina la entrada para que `get()` devuelva `undefined`.",
      "**`map.entries()`:** recorre todas las claves y valores a la vez.",
      "**Acceso a propiedades de un objeto:** `objeto.clave` es la alternativa clásica, pero solo admite claves string o símbolo.",
    ],

    analogia:
      "Es como buscar una palabra en un diccionario. 📖 Abres el diccionario por la palabra exacta (la clave) y lees su definición (el valor). Si la palabra no está registrada, no pasa nada: simplemente te quedas sin definición, que es el `undefined` de JavaScript. El diccionario no se modifica por el hecho de consultarlo.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Devuelve el valor asociado o `undefined` si la clave no existe.",
      "✅ Nunca lanza un error por una clave ausente.",
      "✅ Las claves se comparan por tipo y referencia, no por texto.",
      "✅ Combinado con `??` se obtiene un valor por defecto limpio.",
      "💡 Para distinguir ausencia de `undefined`, usa `has()`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve map.get() si la clave no existe?",
        opciones: ["null", "0", "undefined", "Un TypeError"],
        correcta: 2,
      },
      {
        id: 2,
        pregunta: "¿Qué método permite saber si una clave existe?",
        opciones: ["map.get()", "map.has()", "map.find()", "map.includes()"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve mapa.get(1) si la entrada se creó con mapa.set(\"1\", \"a\")?",
        opciones: [
          '"a"',
          "1",
          "undefined",
          "Un TypeError",
        ],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Qué operador da un valor por defecto si get() devuelve undefined?",
        opciones: ["||=", "??", "&&", "typeof"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Modifica get() el contenido del Map?",
        opciones: [
          "Sí, crea la clave si no existe",
          "Sí, borra la entrada leída",
          "No, es solo lectura",
          "Depende del tipo de clave",
        ],
        correcta: 2,
      },
    ],
  },

  "map-has": {
    id: "map-has",
    titulo: "Map.prototype.has()",
    icon: "❓",
    categoria: "Map y Set",
    firma: "map.has(clave)",

    definicion: [
      "Es el método de `Map` que comprueba si una **clave existe** en el mapa y devuelve un booleano. ❓",
      "Devuelve `true` si la clave está presente y `false` en caso contrario.",
    ],

    queEs: [
      "Es la forma correcta de preguntar «¿tengo esta clave?» dentro de un `Map`. 🤔",
      "A diferencia de `get()`, distingue con claridad entre una clave ausente y una clave con valor `undefined`.",
    ],

    paraQueSirve: [
      "✅ Validar si una clave existe antes de leerla o escribirla.",
      "🛡️ Evitar sobrescribir datos sin querer.",
      "🔍 Distinguir entre valor `undefined` y clave inexistente.",
      "🔁 Decidir si hay que inicializar un contador o incrementarlo.",
    ],

    comoFunciona: [
      "Recibe la `clave` que se quiere comprobar.",
      "Busca esa clave entre las entradas del `Map` usando **SameValueZero**.",
      "Devuelve `true` si la encuentra, aunque el valor asociado sea `undefined`, `null` o `0`.",
      "Devuelve `false` si no existe ninguna entrada con esa clave.",
      "No modifica el `Map` ni su orden de inserción.",
    ],

    sintaxis: [
      {
        code: `const existe = mapa.has(clave);`,
      },
      {
        caption: "Inicializar solo si no existe:",
        code: `if (!mapa.has(clave)) {
  mapa.set(clave, 0);
}`,
      },
      {
        caption: "Comprobar una clave de tipo objeto:",
        code: `const usuario = { id: 1 };
mapa.set(usuario, "activo");
console.log(mapa.has(usuario)); // true`,
      },
    ],

    nota: "💡 `has()` devuelve `true` incluso cuando el valor guardado es `undefined`. Por eso es más fiable que comparar `get(clave) === undefined`.",

    ejemplos: [
      {
        titulo: "1. ❓ Comprobar una clave",
        code: `const mapa = new Map([["nombre", "Ana"]]);

console.log(mapa.has("nombre")); // true
console.log(mapa.has("edad")); // false`,
      },
      {
        titulo: "2. 🛡️ Inicializar un contador",
        code: `const conteo = new Map();
const fruta = "manzana";

if (!conteo.has(fruta)) {
  conteo.set(fruta, 0);
}
conteo.set(fruta, conteo.get(fruta) + 1);

console.log(conteo.get(fruta)); // 1`,
      },
      {
        titulo: "3. 🕳️ Valor undefined frente a clave ausente",
        code: `const mapa = new Map([["vacio", undefined]]);

console.log(mapa.has("vacio")); // true
console.log(mapa.get("vacio")); // undefined
console.log(mapa.has("otra")); // false`,
      },
      {
        titulo: "4. 🧱 Claves por referencia",
        code: `const clave = { id: 1 };
const mapa = new Map([[clave, "dato"]]);

console.log(mapa.has(clave)); // true
console.log(mapa.has({ id: 1 })); // false`,
      },
    ],

    errores: [
      "**Usar `includes()`:** los `Map` no tienen `includes()`; el método correcto es `has()`.",
      "**Comparar `get() === undefined`:** no distingue una clave ausente de una clave con valor `undefined`.",
      "**Pasar un objeto distinto con el mismo contenido:** `has()` compara por referencia, así que devuelve `false`.",
      "**Confundir tipo de clave:** la clave numérica `1` y la clave string `\"1\"` son entradas diferentes.",
      "**Esperar que `has()` cuente apariciones:** solo indica presencia, no cuántas veces se insertó.",
    ],

    casos: [
      "🧮 Comprobar si un contador ya fue inicializado.",
      "🚫 Evitar duplicar claves en un proceso de importación de datos.",
      "🔐 Verificar si un token o identificador está registrado.",
      "⚙️ Decidir entre usar un valor guardado o un valor por defecto.",
    ],

    relacion: [
      "**`map.get()`:** obtiene el valor una vez confirmada la existencia.",
      "**`map.set()`:** crea la entrada que luego detectará `has()`.",
      "**`map.delete()`:** devuelve si la clave existía y además la elimina.",
      "**`set.has()`:** versión equivalente para comprobar valores en un `Set`.",
      "**`Object.prototype.hasOwnProperty()`:** alternativa clásica en objetos, limitada a claves string y símbolo.",
    ],

    analogia:
      "Es como preguntar en recepción si una persona está alojada en el hotel. 🏨 No necesitas ver su habitación ni sus pertenencias: basta con que el registro confirme que su nombre aparece en la lista. Si aparece, la respuesta es `true`, aunque no haya dejado nada en la habitación (un valor `undefined`).",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Devuelve siempre un booleano.",
      "✅ Es la forma segura de distinguir ausencia de `undefined`.",
      "✅ Compara claves con SameValueZero, no con conversión a string.",
      "✅ No modifica el mapa.",
      "💡 Patrón habitual: `if (mapa.has(k)) { ... } else { ... }`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué tipo de valor devuelve map.has()?",
        opciones: ["El valor asociado", "Un booleano", "La clave", "Un número"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve has() si la clave existe con valor undefined?",
        opciones: ["false", "undefined", "true", "null"],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿Por qué falla mapa.has({ id: 1 }) tras guardar otro objeto con el mismo contenido?",
        opciones: [
          "Porque los objetos no pueden ser claves",
          "Porque se comparan por referencia",
          "Porque has() solo acepta strings",
          "Porque el Map está vacío",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué método de Set equivale a Map.has()?",
        opciones: ["Set.contains()", "Set.has()", "Set.get()", "Set.find()"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Modifica has() el orden de inserción del Map?",
        opciones: [
          "Sí, mueve la clave al final",
          "Sí, la elimina",
          "No, no modifica el Map",
          "Solo si la clave es numérica",
        ],
        correcta: 2,
      },
    ],
  },

  "map-delete": {
    id: "map-delete",
    titulo: "Map.prototype.delete()",
    icon: "🗑️",
    categoria: "Map y Set",
    firma: "map.delete(clave)",

    definicion: [
      "Es el método de `Map` que **elimina el par clave-valor** asociado a una clave. 🗑️",
      "Devuelve `true` si la entrada existía y se eliminó, o `false` si la clave no estaba en el mapa.",
    ],

    queEs: [
      "Es la operación de borrado individual de un `Map`. ✂️",
      "Elimina la clave y su valor a la vez; no deja un hueco ni reordena el resto de entradas.",
    ],

    paraQueSirve: [
      "🧹 Quitar datos obsoletos de una caché o de un diccionario.",
      "🔐 Revocar un token o una sesión concreta.",
      "📉 Reducir el tamaño de un `Map` sin reconstruirlo entero.",
      "✅ Saber si una clave existía en el momento de borrarla.",
    ],

    comoFunciona: [
      "Recibe la `clave` que se quiere eliminar.",
      "Busca la entrada usando comparación **SameValueZero**.",
      "Si la encuentra, elimina el par completo y devuelve `true`.",
      "Si no la encuentra, no hace nada y devuelve `false`.",
      "Las demás entradas conservan su orden de inserción original.",
    ],

    sintaxis: [
      {
        code: `const eliminado = mapa.delete(clave);`,
      },
      {
        caption: "Eliminar y comprobar el resultado:",
        code: `if (mapa.delete("token")) {
  console.log("Token revocado");
}`,
      },
      {
        caption: "Vaciar el mapa por completo:",
        code: `mapa.clear();
console.log(mapa.size); // 0`,
      },
    ],

    nota: "💡 `delete` es un método del `Map`; el operador `delete mapa[clave]` **no** funciona con las entradas de un `Map`. Para vaciarlo entero existe `map.clear()`.",

    ejemplos: [
      {
        titulo: "1. 🗑️ Eliminar una entrada",
        code: `const mapa = new Map([
  ["a", 1],
  ["b", 2],
]);

console.log(mapa.delete("a")); // true
console.log(mapa.size); // 1`,
      },
      {
        titulo: "2. 🚫 Clave inexistente",
        code: `const mapa = new Map([["a", 1]]);

console.log(mapa.delete("z")); // false
console.log(mapa.size); // 1`,
      },
      {
        titulo: "3. 🔐 Revocar una sesión",
        code: `const sesiones = new Map([
  ["ana", "token-1"],
  ["luis", "token-2"],
]);

sesiones.delete("ana");
console.log(Array.from(sesiones.keys())); // ["luis"]`,
      },
      {
        titulo: "4. 🧹 Vaciar todo el Map",
        code: `const cache = new Map([["a", 1], ["b", 2]]);

cache.clear();
console.log(cache.size); // 0`,
      },
    ],

    errores: [
      "**Usar el operador `delete`:** `delete mapa[\"a\"]` no elimina entradas de un `Map`; hay que llamar a `mapa.delete(\"a\")`.",
      "**Esperar que devuelva el valor eliminado:** devuelve un booleano, no el valor.",
      "**Confundir el tipo de clave:** una clave numérica no borra la entrada creada con la misma clave en string.",
      "**Creer que `delete` reindexa:** no hay índices; solo desaparece esa entrada.",
      "**Olvidar `clear()`:** para vaciar todo, recorrer y borrar una a una es innecesario.",
    ],

    casos: [
      "🔐 Invalidar sesiones o tokens caducados.",
      "🧹 Purgar entradas antiguas de una caché en memoria.",
      "🛒 Quitar un producto del carrito identificado por su clave.",
      "📋 Eliminar una tarea concreta de un tablero almacenado en un `Map`.",
    ],

    relacion: [
      "**`map.set()`:** crea la entrada que `delete()` puede eliminar.",
      "**`map.has()`:** comprueba la existencia sin borrar nada.",
      "**`map.clear()`:** elimina **todas** las entradas de una vez.",
      "**`map.size`:** refleja inmediatamente el número de entradas tras el borrado.",
      "**`set.delete()`:** versión equivalente para eliminar un valor de un `Set`.",
    ],

    analogia:
      "Es como quitar una ficha del archivador. 🗂️ Si la ficha estaba allí, la sacas y confirmas con la cabeza que la operación salió bien (`true`). Si alguien ya la había sacado antes, no encuentras nada y respondes que no había nada que quitar (`false`). El resto de fichas siguen exactamente en el mismo orden.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Devuelve `true` si la clave existía y `false` si no.",
      "✅ Elimina la clave y el valor a la vez.",
      "✅ No reordena las entradas restantes.",
      "✅ `clear()` es la forma rápida de vaciar el mapa completo.",
      "💡 El operador `delete` no sirve para las entradas de un `Map`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve map.delete(clave) si la clave no existe?",
        opciones: ["undefined", "null", "false", "Un TypeError"],
        correcta: 2,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve map.delete(clave) si la clave existe?",
        opciones: ["El valor eliminado", "true", "El Map", "El nuevo tamaño"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué método elimina todas las entradas de un Map?",
        opciones: ["map.reset()", "map.deleteAll()", "map.clear()", "map.empty()"],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Qué hace delete mapa[\"clave\"] sobre un Map?",
        opciones: [
          "Elimina la entrada correctamente",
          "No elimina la entrada del Map",
          "Lanza siempre un error",
          "Vacía el Map completo",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué ocurre con el orden de las entradas restantes tras delete()?",
        opciones: [
          "Se reordena alfabéticamente",
          "Se invierte",
          "Se conserva el orden original",
          "Se pierde el orden",
        ],
        correcta: 2,
      },
    ],
  },

  "map-foreach": {
    id: "map-foreach",
    titulo: "Map.prototype.forEach()",
    icon: "🔁",
    categoria: "Map y Set",
    firma: "map.forEach((valor, clave, mapa) => {})",

    definicion: [
      "Es el método de `Map` que ejecuta una **función de callback** una vez por cada par clave-valor. 🔁",
      "Recorre las entradas en el **orden de inserción** y no devuelve ningún valor (`undefined`).",
    ],

    queEs: [
      "Es la forma clásica de iterar un `Map` sin obtener un array intermedio. 🚶",
      "El callback recibe el valor primero y la clave después, al revés de lo que suele esperarse.",
    ],

    paraQueSirve: [
      "🧾 Imprimir o registrar todos los pares de un mapa.",
      "🧮 Acumular totales recorriendo claves y valores.",
      "🔄 Modificar otro objeto o array a partir del contenido del `Map`.",
      "🧹 Aplicar una transformación a cada entrada sin crear una copia.",
    ],

    comoFunciona: [
      "Recibe un callback con tres argumentos: `valor`, `clave` y el propio `mapa`.",
      "Ejecuta ese callback una vez por cada entrada, en orden de inserción.",
      "El valor de retorno del callback se ignora por completo.",
      "Devuelve `undefined`, así que no se puede encadenar como `map()` o `filter()`.",
      "No se puede interrumpir con `break`; para salir antes hay que usar `for...of`.",
    ],

    sintaxis: [
      {
        code: `mapa.forEach((valor, clave) => {
  console.log(clave, valor);
});`,
      },
      {
        caption: "Usar el tercer argumento para consultar el mapa:",
        code: `mapa.forEach((valor, clave, mapaActual) => {
  console.log(clave, valor, mapaActual.size);
});`,
      },
      {
        caption: "Alternativa con for...of si necesitas break:",
        code: `for (const [clave, valor] of mapa) {
  if (valor === 0) break;
  console.log(clave, valor);
}`,
      },
    ],

    nota: "💡 El orden de los argumentos es `(valor, clave, mapa)`, no `(clave, valor)`. Es una fuente habitual de errores al pasar de un objeto a un `Map`.",

    ejemplos: [
      {
        titulo: "1. 🔁 Recorrer un mapa",
        code: `const precios = new Map([
  ["café", 2],
  ["té", 1.5],
]);

precios.forEach((precio, producto) => {
  console.log(producto + ": " + precio + " €");
});`,
      },
      {
        titulo: "2. 🧮 Sumar todos los valores",
        code: `const ventas = new Map([
  ["lunes", 10],
  ["martes", 20],
]);

let total = 0;
ventas.forEach((cantidad) => {
  total += cantidad;
});

console.log(total); // 30`,
      },
      {
        titulo: "3. 📋 Construir un array desde el mapa",
        code: `const edades = new Map([
  ["Ana", 25],
  ["Luis", 30],
]);

const frases = [];
edades.forEach((edad, nombre) => {
  frases.push(nombre + " tiene " + edad + " años");
});

console.log(frases);`,
      },
      {
        titulo: "4. 🚫 Comprobar que no devuelve nada",
        code: `const mapa = new Map([["a", 1]]);
const resultado = mapa.forEach(() => {});

console.log(resultado); // undefined`,
      },
    ],

    errores: [
      "**Invertir los argumentos:** el primero es el `valor` y el segundo la `clave`; si se escriben al revés se obtienen resultados extraños.",
      "**Esperar un array de retorno:** `forEach()` devuelve `undefined`; para transformar usa `map.entries()` con `Array.from` o spread.",
      "**Intentar usar `break`:** no funciona dentro de un callback; hay que cambiar a `for...of`.",
      "**Esperar el índice:** un `Map` no tiene índices posicionales, solo claves.",
      "**Modificar el mapa mientras se recorre:** puede alterar qué entradas se visitan; conviene recorrer una copia si hay cambios.",
    ],

    casos: [
      "📊 Mostrar un resumen de todos los contadores de un proceso.",
      "🧾 Generar líneas de texto o filas de una tabla a partir de un diccionario.",
      "💾 Serializar manualmente las entradas a un formato propio.",
      "🔍 Aplicar una validación a cada valor sin detener el recorrido.",
    ],

    relacion: [
      "**`Array.prototype.forEach()`:** tiene la misma idea, pero recibe `(elemento, índice, array)`.",
      "**`map.entries()`:** devuelve un iterador con los mismos pares en el mismo orden.",
      "**`map.values()` y `map.keys()`:** recorren solo una parte de cada entrada.",
      "**`for...of`:** alternativa que sí permite `break`, `continue` y `await`.",
      "**`set.forEach()`:** recorre valores únicos con un callback de firma parecida.",
    ],

    analogia:
      "Es como pasar lista en un aula. 🏫 El profesor llama a cada alumno en el orden en que se matriculó y hace algo con él: anotar su nota, comprobar su asistencia o entregarle un papel. No importa lo que el alumno devuelva al profesor; lo importante es la acción que se ejecuta con cada uno. Y no se puede saltar a la mitad de la lista sin cambiar de método.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Orden del callback: `(valor, clave, mapa)`.",
      "✅ Respeta el orden de inserción.",
      "✅ Devuelve `undefined`.",
      "✅ No admite `break` ni `return` para cortar el recorrido.",
      "💡 Si necesitas transformar, usa `Array.from(mapa, ...)` o spread.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Cuál es el orden correcto de los argumentos del callback?",
        opciones: [
          "(clave, valor, mapa)",
          "(valor, clave, mapa)",
          "(índice, valor, mapa)",
          "(mapa, clave, valor)",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve map.forEach()?",
        opciones: ["Un array nuevo", "El propio Map", "undefined", "El número de entradas"],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿En qué orden recorre las entradas?",
        opciones: [
          "Alfabético por clave",
          "De menor a mayor valor",
          "Orden de inserción",
          "Orden aleatorio",
        ],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Qué estructura permite cortar el recorrido con break?",
        opciones: ["forEach()", "for...of", "map()", "every()"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué método equivalente existe en Set?",
        opciones: ["Set.each()", "Set.forEach()", "Set.loop()", "Set.map()"],
        correcta: 1,
      },
    ],
  },

  "map-entries": {
    id: "map-entries",
    titulo: "Map.prototype.entries()",
    icon: "📜",
    categoria: "Map y Set",
    firma: "map.entries()",

    definicion: [
      "Es el método de `Map` que devuelve un **iterador** con todos los pares `[clave, valor]` del mapa. 📜",
      "Los pares aparecen en el mismo orden de inserción en que se guardaron.",
    ],

    queEs: [
      "Es la puerta de entrada al `Map` como secuencia de pares. 🚪",
      "El iterador es de **un solo uso**: una vez consumido, hay que crear otro con una nueva llamada a `entries()`.",
    ],

    paraQueSirve: [
      "🔁 Recorrer claves y valores a la vez con `for...of`.",
      "📦 Convertir un `Map` en un array de pares con spread o `Array.from`.",
      "💾 Serializar el contenido del mapa para guardarlo o enviarlo.",
      "🔀 Aplicar `map()`, `filter()` o `sort()` después de convertirlo en array.",
    ],

    comoFunciona: [
      "Devuelve un objeto iterador, no un array.",
      "Cada vez que se avanza con `next()` entrega un objeto `{ value: [clave, valor], done: false }`.",
      "Cuando se agotan las entradas, devuelve `{ value: undefined, done: true }`.",
      "Se puede consumir con `for...of`, con spread `[...mapa.entries()]` o con `Array.from()`.",
      "El iterador recorre el mapa en vivo: refleja cambios posteriores en las entradas todavía no visitadas.",
    ],

    sintaxis: [
      {
        code: `const iterador = mapa.entries();`,
      },
      {
        caption: "Convertir a array de pares:",
        code: `const pares = [...mapa.entries()];
console.log(pares); // [["a", 1], ["b", 2]]`,
      },
      {
        caption: "Recorrer con for...of y desestructuración:",
        code: `for (const [clave, valor] of mapa.entries()) {
  console.log(clave, valor);
}`,
      },
    ],

    nota: "💡 `[...mapa]` equivale a `[...mapa.entries()]`: el iterador por defecto de un `Map` ya devuelve los pares `[clave, valor]`.",

    ejemplos: [
      {
        titulo: "1. 📜 Obtener los pares",
        code: `const mapa = new Map([
  ["a", 1],
  ["b", 2],
]);

const pares = Array.from(mapa.entries());
console.log(pares); // [["a", 1], ["b", 2]]`,
      },
      {
        titulo: "2. 🔁 Recorrer con for...of",
        code: `const stock = new Map([
  ["manzanas", 10],
  ["peras", 5],
]);

for (const [fruta, cantidad] of stock.entries()) {
  console.log(fruta + ": " + cantidad);
}`,
      },
      {
        titulo: "3. 🔀 Filtrar los pares",
        code: `const notas = new Map([
  ["Ana", 8],
  ["Luis", 4],
  ["Eva", 9],
]);

const aprobados = [...notas.entries()].filter(([, nota]) => nota >= 5);
console.log(aprobados); // [["Ana", 8], ["Eva", 9]]`,
      },
      {
        titulo: "4. 💾 Reconstruir un Map desde sus pares",
        code: `const original = new Map([["a", 1], ["b", 2]]);
const copia = new Map(original.entries());

copia.set("c", 3);
console.log(original.size); // 2
console.log(copia.size); // 3`,
      },
    ],

    errores: [
      "**Creer que devuelve un array:** devuelve un iterador; hay que envolverlo con `[...]` o `Array.from()` para tener un array.",
      "**Reutilizar el iterador:** una vez agotado no vuelve a empezar; llama de nuevo a `entries()`.",
      "**Intentar usar `map()` directamente:** el iterador no tiene métodos de array; primero conviértelo.",
      "**Olvidar la desestructuración:** cada elemento es un par `[clave, valor]`, no un objeto con propiedades.",
      "**Modificar el mapa durante el recorrido:** aunque está permitido, puede producir resultados difíciles de predecir.",
    ],

    casos: [
      "📤 Exportar un `Map` a JSON convirtiéndolo en array de pares.",
      "🔍 Filtrar entradas según el valor antes de mostrarlas.",
      "🧾 Generar filas de una tabla con clave y valor.",
      "🔁 Clonar un `Map` conservando sus entradas.",
    ],

    relacion: [
      "**`map.keys()`:** devuelve solo las claves.",
      "**`map.values()`:** devuelve solo los valores.",
      "**`for...of`:** consume el iterador de forma directa.",
      "**`Array.from()`:** convierte el iterador en un array real.",
      "**`new Map(iterable)`:** reconstruye un mapa a partir de pares como los que devuelve `entries()`.",
    ],

    analogia:
      "Es como abrir un sobre con una lista numerada de parejas. ✉️ Cada línea de la lista tiene dos columnas: a la izquierda la clave y a la derecha el valor. Puedes leer las líneas de una en una (iterador) o volcar toda la lista sobre la mesa para ordenarla y filtrarla (array). Una vez que has leído hasta el final, necesitas un sobre nuevo para volver a empezar.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Devuelve un iterador de pares `[clave, valor]`.",
      "✅ Respeta el orden de inserción.",
      "✅ Se convierte en array con spread o `Array.from()`.",
      "✅ Es el iterador por defecto del `Map`.",
      "💡 El iterador se agota: no se puede rebobinar.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve map.entries()?",
        opciones: [
          "Un array de pares",
          "Un iterador de pares",
          "Un objeto con claves y valores",
          "Una cadena de texto",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué forma tiene cada elemento que entrega el iterador?",
        opciones: ["{ clave, valor }", "[clave, valor]", "(clave, valor)", "clave: valor"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Cómo se convierte el iterador en un array?",
        opciones: [
          "mapa.entries().toArray()",
          "[...mapa.entries()]",
          "mapa.entries().array()",
          "mapa.entries().join()",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué devuelve un iterador ya agotado al llamar a next()?",
        opciones: [
          "El primer par otra vez",
          "{ value: undefined, done: true }",
          "null",
          "Un error",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué método devuelve solo las claves del Map?",
        opciones: ["map.entries()", "map.keys()", "map.values()", "map.pairs()"],
        correcta: 1,
      },
    ],
  },

  "set-add": {
    id: "set-add",
    titulo: "Set.prototype.add()",
    icon: "➕",
    categoria: "Map y Set",
    firma: "set.add(valor)",

    definicion: [
      "Es el método de `Set` que **añade un valor** a la colección si todavía no está presente. ➕",
      "Devuelve el propio `Set`, lo que permite encadenar llamadas.",
    ],

    queEs: [
      "Es la operación de escritura básica de un `Set`, una colección de valores **únicos**. 🎯",
      "Si el valor ya existe, `add()` no lo duplica: simplemente lo ignora y devuelve el mismo conjunto.",
    ],

    paraQueSirve: [
      "🚫 Eliminar duplicados de una lista de forma automática.",
      "🏷️ Construir etiquetas o categorías sin repeticiones.",
      "🔐 Llevar un registro de identificadores ya procesados.",
      "⛓️ Encadenar varios valores en una sola expresión.",
    ],

    comoFunciona: [
      "Recibe un único argumento: el `valor` que se quiere añadir.",
      "Comprueba si el valor ya existe usando comparación **SameValueZero** (`NaN` es igual a `NaN`, y `+0` equivale a `-0`).",
      "Si no existe, lo inserta al final, respetando el orden de inserción.",
      "Si ya existe, no hace nada y el tamaño no cambia.",
      "Devuelve el mismo `Set` para poder encadenar.",
    ],

    sintaxis: [
      {
        code: `const set = new Set();
set.add("a");`,
      },
      {
        caption: "Encadenar varios valores:",
        code: `const set = new Set()
  .add("a")
  .add("b")
  .add("c");`,
      },
      {
        caption: "Crear un Set sin duplicados desde un array:",
        code: `const numeros = [1, 2, 2, 3, 3, 3];
const unicos = new Set(numeros);
console.log(unicos.size); // 3`,
      },
    ],

    nota: "💡 `Set` compara por **valor** para los tipos primitivos y por **referencia** para los objetos: dos objetos con el mismo contenido son entradas distintas.",

    ejemplos: [
      {
        titulo: "1. 🎯 Añadir valores únicos",
        code: `const set = new Set();
set.add("🍎");
set.add("🍌");
set.add("🍎");

console.log(set.size); // 2
console.log([...set]); // ["🍎", "🍌"]`,
      },
      {
        titulo: "2. 🚫 Eliminar duplicados de un array",
        code: `const numeros = [1, 2, 2, 3, 1];
const unicos = new Set();

numeros.forEach((numero) => unicos.add(numero));
console.log([...unicos]); // [1, 2, 3]`,
      },
      {
        titulo: "3. ⛓️ Encadenar llamadas",
        code: `const letras = new Set().add("a").add("b").add("a");

console.log(letras.size); // 2`,
      },
      {
        titulo: "4. 🧱 Objetos como valores",
        code: `const set = new Set();
const objeto = { id: 1 };

set.add(objeto);
set.add(objeto);
set.add({ id: 1 });

console.log(set.size); // 2`,
      },
    ],

    errores: [
      "**Confundir `add()` con `push()`:** `Set` no tiene `push()`; lanza `TypeError: set.push is not a function`.",
      "**Esperar duplicados:** añadir dos veces el mismo valor deja el tamaño intacto.",
      "**Usar `length`:** los `Set` usan `size`, no `length`.",
      "**Creer que dos objetos iguales se fusionan:** se comparan por referencia, así que cuentan como valores distintos.",
      "**Esperar que devuelva un booleano:** devuelve el propio `Set`; para saber si se añadió, compara el tamaño antes y después.",
    ],

    casos: [
      "🏷️ Guardar las etiquetas únicas de una publicación.",
      "👥 Mantener una lista de usuarios sin repetidos.",
      "🔍 Registrar identificadores ya visitados en un recorrido.",
      "🧮 Calcular cuántos valores distintos hay en un conjunto de datos.",
    ],

    relacion: [
      "**`set.has()`:** comprueba si el valor ya estaba antes de añadirlo.",
      "**`set.delete()`:** elimina un valor concreto del conjunto.",
      "**`set.size`:** indica cuántos valores únicos hay.",
      "**`map.set()`:** operación equivalente en un `Map`, pero guarda pares clave-valor.",
      "**`Array.from(set)` o `[...set]`:** convierten el `Set` en un array.",
    ],

    analogia:
      "Es como una lista de invitados en la puerta de una fiesta. 🎉 Cuando llega alguien, el portero mira la lista: si no está, lo apunta; si ya está apuntado, no lo escribe dos veces. Al final, la lista contiene cada nombre una sola vez, en el orden en que fueron llegando. Y si dos personas distintas se llaman igual, para el portero son personas diferentes.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Solo guarda valores únicos.",
      "✅ Devuelve el mismo `Set`, ideal para encadenar.",
      "✅ El tamaño se consulta con `size`.",
      "✅ Compara objetos por referencia, no por contenido.",
      "💡 Es el atajo clásico para quitar duplicados: `[...new Set(array)]`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué ocurre al añadir un valor que ya existe en un Set?",
        opciones: [
          "Se duplica",
          "Se lanza un error",
          "Se ignora y el tamaño no cambia",
          "Se reemplaza por el nuevo",
        ],
        correcta: 2,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve set.add(valor)?",
        opciones: ["true", "El valor añadido", "El propio Set", "El nuevo tamaño"],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿Cómo se consulta el número de valores de un Set?",
        opciones: ["set.length", "set.size", "set.count", "set.total"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué expresión elimina duplicados de un array?",
        opciones: [
          "[...new Set(array)]",
          "new Set(array).toArray()",
          "array.unique()",
          "Set.from(array)",
        ],
        correcta: 0,
      },
      {
        id: 5,
        pregunta: "¿Dos objetos distintos con el mismo contenido cuentan como duplicados en un Set?",
        opciones: [
          "Sí, se comparan por contenido",
          "No, se comparan por referencia",
          "Solo si tienen las mismas claves",
          "Solo si son arrays",
        ],
        correcta: 1,
      },
    ],
  },

  "set-has": {
    id: "set-has",
    titulo: "Set.prototype.has()",
    icon: "❓",
    categoria: "Map y Set",
    firma: "set.has(valor)",

    definicion: [
      "Es el método de `Set` que comprueba si un **valor existe** en el conjunto y devuelve un booleano. ❓",
      "Devuelve `true` si el valor está presente y `false` si no lo está.",
    ],

    queEs: [
      "Es la consulta más rápida y directa que ofrece un `Set`. ⚡",
      "Aprovecha la estructura interna de tabla hash del `Set`, por lo que no recorre el conjunto elemento a elemento.",
    ],

    paraQueSirve: [
      "✅ Comprobar pertenencia antes de añadir o eliminar.",
      "🚫 Evitar duplicados en procesos de importación.",
      "🔐 Verificar si un identificador ya fue procesado.",
      "🎯 Filtrar elementos que pertenecen a un conjunto permitido.",
    ],

    comoFunciona: [
      "Recibe el `valor` que se quiere buscar.",
      "Lo compara con los valores guardados usando **SameValueZero**.",
      "Devuelve `true` si encuentra una coincidencia exacta.",
      "Devuelve `false` si no hay ninguna coincidencia.",
      "No modifica el conjunto ni su orden de inserción.",
    ],

    sintaxis: [
      {
        code: `const existe = set.has(valor);`,
      },
      {
        caption: "Añadir solo si no está:",
        code: `if (!set.has(valor)) {
  set.add(valor);
}`,
      },
      {
        caption: "Filtrar un array con los valores permitidos:",
        code: `const permitidos = new Set(["a", "b"]);
const filtrados = ["a", "c"].filter((letra) => permitidos.has(letra));`,
      },
    ],

    nota: "💡 `NaN` se considera igual a `NaN` en un `Set`, así que `set.add(NaN); set.has(NaN)` devuelve `true`. Con `indexOf()` en arrays, en cambio, no se encontraría.",

    ejemplos: [
      {
        titulo: "1. ❓ Comprobar pertenencia",
        code: `const frutas = new Set(["🍎", "🍌"]);

console.log(frutas.has("🍎")); // true
console.log(frutas.has("🍇")); // false`,
      },
      {
        titulo: "2. 🛡️ Evitar duplicados",
        code: `const ids = new Set([1, 2]);
const nuevo = 2;

if (!ids.has(nuevo)) {
  ids.add(nuevo);
}

console.log(ids.size); // 2`,
      },
      {
        titulo: "3. 🔍 Filtrar con un Set",
        code: `const permitidas = new Set(["rojo", "azul"]);
const colores = ["rojo", "verde", "azul"];

const validos = colores.filter((color) => permitidas.has(color));
console.log(validos); // ["rojo", "azul"]`,
      },
      {
        titulo: "4. 🧱 Objetos por referencia",
        code: `const objeto = { id: 1 };
const set = new Set([objeto]);

console.log(set.has(objeto)); // true
console.log(set.has({ id: 1 })); // false`,
      },
    ],

    errores: [
      "**Usar `includes()`:** los `Set` no tienen `includes()`; el método correcto es `has()`.",
      "**Buscar un objeto equivalente:** `has()` compara por referencia, no por contenido.",
      "**Confundir el tipo:** `set.has(1)` no encuentra el valor `\"1\"`.",
      "**Creer que cuenta repeticiones:** un `Set` nunca guarda duplicados, así que `has()` solo indica presencia.",
      "**Olvidar que `has()` no modifica nada:** para añadir hay que llamar a `add()`.",
    ],

    casos: [
      "🚫 Validar que un usuario no haya participado ya en un sorteo.",
      "🔐 Comprobar si un token está en la lista de revocados.",
      "🎯 Filtrar etiquetas permitidas en un formulario.",
      "🧮 Detectar valores repetidos mientras se recorre un array.",
    ],

    relacion: [
      "**`set.add()`:** inserta el valor que `has()` detectará después.",
      "**`set.delete()`:** elimina el valor para que `has()` devuelva `false`.",
      "**`set.size`:** número total de valores únicos.",
      "**`map.has()`:** versión equivalente para comprobar claves en un `Map`.",
      "**`Array.prototype.includes()`:** alternativa en arrays, con búsqueda lineal.",
    ],

    analogia:
      "Es como consultar el listado de pasajeros de un vuelo. ✈️ Dices un nombre y el sistema responde inmediatamente sí o no. No necesita mostrar el billete ni el asiento: solo confirma si esa persona está en el manifiesto. Si alguien se llama igual que otra persona del vuelo, el sistema los distingue como individuos diferentes.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Devuelve siempre un booleano.",
      "✅ La búsqueda es muy rápida gracias a la tabla hash interna.",
      "✅ No modifica el conjunto.",
      "✅ Compara objetos por referencia.",
      "💡 Ideal para filtros de pertenencia: `array.filter((x) => set.has(x))`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve set.has(valor) si el valor no existe?",
        opciones: ["undefined", "null", "false", "0"],
        correcta: 2,
      },
      {
        id: 2,
        pregunta: "¿Qué método de array es el equivalente más directo a Set.has()?",
        opciones: ["indexOf()", "includes()", "find()", "some()"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve set.has(NaN) después de set.add(NaN)?",
        opciones: ["false", "true", "undefined", "Un TypeError"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Cómo compara has() los objetos?",
        opciones: [
          "Por contenido",
          "Por referencia",
          "Por JSON",
          "Por longitud",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Modifica has() el contenido del Set?",
        opciones: [
          "Sí, añade el valor",
          "Sí, lo elimina",
          "No, es solo una consulta",
          "Depende del tipo",
        ],
        correcta: 2,
      },
    ],
  },

  "set-delete": {
    id: "set-delete",
    titulo: "Set.prototype.delete()",
    icon: "🗑️",
    categoria: "Map y Set",
    firma: "set.delete(valor)",

    definicion: [
      "Es el método de `Set` que **elimina un valor** del conjunto. 🗑️",
      "Devuelve `true` si el valor existía y se eliminó, o `false` si no estaba presente.",
    ],

    queEs: [
      "Es la operación de borrado individual de un `Set`. ✂️",
      "Como el conjunto no tiene claves, se indica directamente el valor que se quiere quitar.",
    ],

    paraQueSirve: [
      "🧹 Quitar etiquetas o elementos obsoletos de una colección.",
      "🔐 Revocar un identificador de la lista de permitidos.",
      "🛒 Eliminar un producto concreto de un conjunto de favoritos.",
      "✅ Saber si el valor existía en el momento del borrado.",
    ],

    comoFunciona: [
      "Recibe el `valor` que se quiere eliminar.",
      "Lo busca usando comparación **SameValueZero**.",
      "Si lo encuentra, lo elimina del conjunto y devuelve `true`.",
      "Si no lo encuentra, no cambia nada y devuelve `false`.",
      "Los valores restantes mantienen su orden de inserción.",
    ],

    sintaxis: [
      {
        code: `const eliminado = set.delete(valor);`,
      },
      {
        caption: "Eliminar y comprobar el resultado:",
        code: `if (set.delete("token")) {
  console.log("Token revocado");
}`,
      },
      {
        caption: "Vaciar el conjunto por completo:",
        code: `set.clear();
console.log(set.size); // 0`,
      },
    ],

    nota: "💡 Igual que en `Map`, el operador `delete set[valor]` no funciona con un `Set`. Para vaciarlo entero está `set.clear()`.",

    ejemplos: [
      {
        titulo: "1. 🗑️ Eliminar un valor",
        code: `const set = new Set(["a", "b", "c"]);

console.log(set.delete("b")); // true
console.log([...set]); // ["a", "c"]`,
      },
      {
        titulo: "2. 🚫 Valor inexistente",
        code: `const set = new Set(["a"]);

console.log(set.delete("z")); // false
console.log(set.size); // 1`,
      },
      {
        titulo: "3. 🔐 Revocar un permiso",
        code: `const permisos = new Set(["leer", "escribir", "borrar"]);

permisos.delete("borrar");
console.log(permisos.has("borrar")); // false`,
      },
      {
        titulo: "4. 🧹 Vaciar el conjunto",
        code: `const set = new Set([1, 2, 3]);

set.clear();
console.log(set.size); // 0`,
      },
    ],

    errores: [
      "**Usar el operador `delete`:** `delete set[0]` no elimina nada del `Set`; hay que llamar a `set.delete(valor)`.",
      "**Esperar que devuelva el valor eliminado:** devuelve un booleano.",
      "**Confundir el tipo:** `set.delete(1)` no borra el valor `\"1\"`.",
      "**Pensar que borra por posición:** un `Set` no tiene índices; se borra por valor.",
      "**Recorrer y borrar a la vez sin cuidado:** puede alterar qué elementos se visitan; considera recorrer una copia.",
    ],

    casos: [
      "🔐 Quitar un token de la lista de sesiones activas.",
      "🏷️ Eliminar una etiqueta que ya no se usa.",
      "🎯 Actualizar una lista de favoritos al desmarcar un elemento.",
      "🧹 Purgar valores procesados al terminar una tarea.",
    ],

    relacion: [
      "**`set.add()`:** crea el valor que `delete()` puede eliminar.",
      "**`set.has()`:** comprueba la existencia sin borrar.",
      "**`set.clear()`:** elimina todos los valores de una vez.",
      "**`set.size`:** se actualiza inmediatamente tras el borrado.",
      "**`map.delete()`:** versión equivalente para eliminar un par de un `Map`.",
    ],

    analogia:
      "Es como borrar un nombre de la lista de invitados. 📝 Si el nombre estaba apuntado, lo tachas y confirmas que la operación se hizo (`true`). Si alguien ya lo había borrado, miras la lista y no encuentras nada (`false`). Los demás invitados siguen apuntados en el mismo orden en que llegaron.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Devuelve `true` si el valor existía y `false` si no.",
      "✅ Se borra por valor, no por índice.",
      "✅ No reordena los valores restantes.",
      "✅ `clear()` vacía el conjunto completo.",
      "💡 El operador `delete` no sirve para los valores de un `Set`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve set.delete(valor) si el valor no existe?",
        opciones: ["undefined", "false", "null", "Un TypeError"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Cómo se elimina un valor de un Set?",
        opciones: [
          "Por su índice con set.delete(0)",
          "Por su valor con set.delete(valor)",
          "Con set.remove(valor)",
          "Con delete set[valor]",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué método vacía todo el Set?",
        opciones: ["set.reset()", "set.clear()", "set.deleteAll()", "set.empty()"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué devuelve set.delete(valor) cuando sí existía?",
        opciones: ["El valor eliminado", "true", "El Set", "El nuevo tamaño"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué ocurre con el orden de los valores restantes?",
        opciones: [
          "Se ordenan alfabéticamente",
          "Se invierten",
          "Se conserva el orden de inserción",
          "Se vuelve aleatorio",
        ],
        correcta: 2,
      },
    ],
  },

  "set-foreach": {
    id: "set-foreach",
    titulo: "Set.prototype.forEach()",
    icon: "🔁",
    categoria: "Map y Set",
    firma: "set.forEach((valor, valor, set) => {})",

    definicion: [
      "Es el método de `Set` que ejecuta una **función de callback** una vez por cada valor del conjunto. 🔁",
      "Recorre los valores en el **orden de inserción** y no devuelve ningún valor (`undefined`).",
    ],

    queEs: [
      "Es la forma clásica de iterar un `Set` sin convertirlo antes en array. 🚶",
      "El callback recibe el **mismo valor dos veces** en los dos primeros argumentos, por coherencia con `Map.forEach()`.",
    ],

    paraQueSirve: [
      "🧾 Mostrar o registrar todos los valores únicos de una colección.",
      "🧮 Acumular una suma o un total a partir de los valores.",
      "🔄 Construir otro array u objeto a partir del contenido del `Set`.",
      "🧹 Aplicar una acción a cada elemento sin crear una copia intermedia.",
    ],

    comoFunciona: [
      "Recibe un callback con tres argumentos: `valor`, `valor` y el propio `set`.",
      "Ejecuta ese callback una vez por cada valor, en orden de inserción.",
      "El valor de retorno del callback se ignora por completo.",
      "Devuelve `undefined`, así que no se puede encadenar como `map()`.",
      "No se puede interrumpir con `break`; para salir antes hay que usar `for...of`.",
    ],

    sintaxis: [
      {
        code: `set.forEach((valor) => {
  console.log(valor);
});`,
      },
      {
        caption: "Usar el tercer argumento para consultar el conjunto:",
        code: `set.forEach((valor, mismoValor, conjunto) => {
  console.log(valor, conjunto.size);
});`,
      },
      {
        caption: "Alternativa con for...of si necesitas break:",
        code: `for (const valor of set) {
  if (valor === "fin") break;
  console.log(valor);
}`,
      },
    ],

    nota: "💡 El callback recibe `(valor, valor, set)`: los dos primeros argumentos son iguales. Es una decisión de diseño para que la firma coincida con la de `Map.forEach()`.",

    ejemplos: [
      {
        titulo: "1. 🔁 Recorrer un conjunto",
        code: `const frutas = new Set(["🍎", "🍌", "🍇"]);

frutas.forEach((fruta) => {
  console.log("Fruta:", fruta);
});`,
      },
      {
        titulo: "2. 🧮 Sumar los valores",
        code: `const numeros = new Set([10, 20, 30]);

let total = 0;
numeros.forEach((numero) => {
  total += numero;
});

console.log(total); // 60`,
      },
      {
        titulo: "3. 📋 Construir un array",
        code: `const letras = new Set(["a", "b"]);
const resultado = [];

letras.forEach((letra) => {
  resultado.push(letra.toUpperCase());
});

console.log(resultado); // ["A", "B"]`,
      },
      {
        titulo: "4. 🚫 Comprobar que no devuelve nada",
        code: `const set = new Set([1, 2]);
const resultado = set.forEach(() => {});

console.log(resultado); // undefined`,
      },
    ],

    errores: [
      "**Esperar un índice:** el callback no recibe índice; un `Set` no tiene posiciones.",
      "**Confundir el segundo argumento:** es el mismo valor, no un índice ni una clave.",
      "**Esperar un array de retorno:** `forEach()` devuelve `undefined`; para transformar usa `[...set].map()`.",
      "**Intentar usar `break`:** no funciona dentro del callback; cambia a `for...of`.",
      "**Modificar el conjunto mientras se recorre:** puede alterar qué valores se visitan; recorre una copia si vas a borrar.",
    ],

    casos: [
      "📊 Mostrar un resumen de etiquetas únicas.",
      "🧾 Generar una lista de texto a partir de valores sin duplicados.",
      "🧮 Sumar o promediar los elementos de un conjunto numérico.",
      "🔍 Validar cada valor sin detener el recorrido.",
    ],

    relacion: [
      "**`Array.prototype.forEach()`:** misma idea, pero recibe `(elemento, índice, array)`.",
      "**`set.values()`:** devuelve un iterador con los mismos valores.",
      "**`for...of`:** alternativa que sí permite `break`, `continue` y `await`.",
      "**`map.forEach()`:** recorre pares con un callback `(valor, clave, mapa)`.",
      "**`set.keys()`:** en un `Set` devuelve exactamente lo mismo que `values()`.",
    ],

    analogia:
      "Es como repartir folletos a cada persona de una fila. 📄 Vas una por una en el orden en que llegaron a la fila y le entregas el folleto. No importa lo que cada persona haga con él: la acción se repite con todas. Como no hay asientos numerados, no existe un índice que acompañe a cada persona, solo la persona misma.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Orden del callback: `(valor, valor, set)`.",
      "✅ Respeta el orden de inserción.",
      "✅ Devuelve `undefined`.",
      "✅ No admite `break` ni `return` para cortar el recorrido.",
      "💡 Si necesitas transformar, usa `[...set].map(...)`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué recibe el callback de Set.forEach() como primer argumento?",
        opciones: ["El índice", "El valor", "El Set", "La clave"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué contiene el segundo argumento del callback?",
        opciones: [
          "El índice del valor",
          "El mismo valor",
          "El tamaño del Set",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve set.forEach()?",
        opciones: ["Un array nuevo", "El propio Set", "undefined", "El número de valores"],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Qué estructura permite cortar el recorrido con break?",
        opciones: ["forEach()", "for...of", "map()", "filter()"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿En qué orden recorre los valores?",
        opciones: [
          "Orden de inserción",
          "Orden alfabético",
          "Orden numérico",
          "Orden aleatorio",
        ],
        correcta: 0,
      },
    ],
  },
};
