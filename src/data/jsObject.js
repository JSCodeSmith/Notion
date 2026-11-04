export const JS_OBJECT = {
  id: "object",
  label: "Object",
  icon: "🧱",
  titulo: "Objetos y propiedades en JavaScript",
  descripcion:
    "Aprende a leer, crear, combinar y proteger objetos con los métodos estáticos de Object, la base de casi todas las estructuras de datos en JavaScript.",
  grupos: [
    {
      seccion: "Leer propiedades",
      metodos: [
        {
          id: "object-keys",
          nombre: "Object.keys()",
          firma: "Object.keys(objeto)",
          icon: "🔑",
        },
        {
          id: "object-values",
          nombre: "Object.values()",
          firma: "Object.values(objeto)",
          icon: "📋",
        },
        {
          id: "object-entries",
          nombre: "Object.entries()",
          firma: "Object.entries(objeto)",
          icon: "🧾",
        },
      ],
    },
    {
      seccion: "Crear y combinar",
      metodos: [
        {
          id: "object-fromentries",
          nombre: "Object.fromEntries()",
          firma: "Object.fromEntries(iterable)",
          icon: "🏗️",
        },
        {
          id: "object-assign",
          nombre: "Object.assign()",
          firma: "Object.assign(destino, ...fuentes)",
          icon: "🧩",
        },
        {
          id: "object-create",
          nombre: "Object.create()",
          firma: "Object.create(prototipo, descriptores)",
          icon: "🌱",
        },
      ],
    },
    {
      seccion: "Inmutabilidad y prototipos",
      metodos: [
        {
          id: "object-freeze",
          nombre: "Object.freeze()",
          firma: "Object.freeze(objeto)",
          icon: "🧊",
        },
        {
          id: "object-hasown",
          nombre: "Object.hasOwn()",
          firma: "Object.hasOwn(objeto, propiedad)",
          icon: "🛡️",
        },
      ],
    },
  ],
};

export const JS_OBJECT_DOCS = {
  "object-keys": {
    id: "object-keys",
    titulo: "Object.keys()",
    icon: "🔑",
    categoria: "Object",
    firma: "Object.keys(objeto)",

    definicion: [
      "Es un método estático de `Object` que devuelve un **array con los nombres de las propiedades propias y enumerables** de un objeto. 🔑",
      "Solo incluye claves de tipo texto: las propiedades con `Symbol` y las no enumerables quedan fuera del resultado.",
    ],

    queEs: [
      "Es la puerta de entrada al **listado de claves** de un objeto, sin necesidad de recorrerlo con `for...in`. 🗂️",
      "Devuelve un array nuevo, así que puedes usar `map`, `filter`, `forEach` y el resto de métodos de array.",
    ],

    paraQueSirve: [
      "🔁 Recorrer un objeto cuando necesitas sus claves y no sus valores.",
      "🔢 Contar cuántas propiedades propias tiene un objeto con `Object.keys(obj).length`.",
      "🧪 Validar formularios o configuraciones comprobando si faltan claves obligatorias.",
      "🧱 Construir arrays derivados, por ejemplo para generar opciones de un `select` o columnas de una tabla.",
    ],

    comoFunciona: [
      "Recibe un objeto y obtiene la lista interna de sus propiedades propias (`OwnPropertyKeys`).",
      "Filtra esa lista y conserva solo las claves de texto que son enumerables.",
      "Ordena el resultado: primero los índices numéricos ascendentes y después el resto en orden de creación.",
      "Devuelve un **array nuevo** con esas claves; modificar el array no altera el objeto original.",
      "Si recibe `null` o `undefined` lanza un `TypeError`; con otros primitivos los convierte temporalmente a objeto.",
    ],

    sintaxis: [
      {
        code: `const claves = Object.keys(objeto);`,
      },
      {
        caption: "Recorrer cada clave y acceder a su valor:",
        code: `Object.keys(usuario).forEach((clave) => {
  console.log(clave, usuario[clave]);
});`,
      },
      {
        caption: "Contar y filtrar claves:",
        code: `const total = Object.keys(configuracion).length;
const propias = Object.keys(configuracion).filter((clave) =>
  clave.startsWith("api"),
);`,
      },
    ],

    nota: "💡 `Object.keys()` no ve propiedades heredadas ni símbolos. Si necesitas también las no enumerables, usa `Object.getOwnPropertyNames()`; para los símbolos, `Object.getOwnPropertySymbols()`.",

    ejemplos: [
      {
        titulo: "1. 🔑 Claves de un objeto",
        code: `const usuario = { nombre: "Ana", edad: 25, activo: true };
const claves = Object.keys(usuario);
console.log(claves);
// ["nombre", "edad", "activo"]`,
      },
      {
        titulo: "2. 🔢 Contar propiedades",
        code: `const configuracion = {
  tema: "oscuro",
  idioma: "es",
  notificaciones: true,
};
console.log(Object.keys(configuracion).length);
// 3`,
      },
      {
        titulo: "3. 🔁 Recorrer clave y valor",
        code: `const precios = { cafe: 2, te: 1.5, jugo: 3 };
Object.keys(precios).forEach((producto) => {
  console.log(producto + ": " + precios[producto] + " €");
});
// cafe: 2 €
// te: 1.5 €
// jugo: 3 €`,
      },
      {
        titulo: "4. 🧮 El orden de las claves numéricas",
        code: `const mixto = { 2: "dos", 10: "diez", nombre: "Ana", 1: "uno" };
console.log(Object.keys(mixto));
// ["1", "2", "10", "nombre"]`,
      },
    ],

    errores: [
      "**Esperar los valores:** `Object.keys({ a: 1 })` devuelve `['a']`, no `[1]`. Para los valores existe `Object.values()`.",
      "**Contar propiedades heredadas:** `Object.keys()` solo mira las propias; un objeto creado con `Object.create(base)` no incluye las claves de `base`.",
      "**Olvidar los símbolos:** las claves `Symbol` no aparecen. Para verlas usa `Object.getOwnPropertySymbols()`.",
      "**Usarlo con `null` o `undefined`:** lanza `TypeError: Cannot convert undefined or null to object`.",
      "**Confiar en el orden de inserción:** los índices numéricos siempre van primero y en orden ascendente, aunque se hayan creado después.",
    ],

    casos: [
      "📋 Generar dinámicamente las columnas de una tabla a partir de las claves de un registro.",
      "✅ Comprobar qué campos obligatorios faltan en un formulario.",
      "🔁 Recorrer un objeto de configuración y aplicar cada opción.",
      "🧹 Filtrar claves sensibles antes de registrar o enviar un objeto.",
    ],

    relacion: [
      "**`Object.values()`:** devuelve los valores en el mismo orden que las claves.",
      "**`Object.entries()`:** devuelve pares `[clave, valor]`, ideal para recorrer ambos a la vez.",
      "**`for...in`:** también recorre propiedades heredadas, por eso suele combinarse con `Object.hasOwn()`.",
      "**`Object.getOwnPropertyNames()`:** incluye las claves propias no enumerables.",
      "**`Object.hasOwn()`:** comprueba si una clave concreta pertenece al objeto.",
    ],

    analogia:
      "Imagina una biblioteca con cajones etiquetados. 🗄️ Cada cajón guarda algo, pero la etiqueta es lo que te permite encontrarlo. `Object.keys()` es la lista de etiquetas de los cajones que tú mismo instalaste: no aparecen los cajones heredados del edificio ni las etiquetas escritas con tinta invisible (propiedades no enumerables). Con esa lista en la mano puedes abrir cada cajón en orden.",

    fuente: "MDN Web Docs · ECMAScript · Object.keys",

    notasPersonales: [
      "✅ Devuelve solo claves propias y enumerables de tipo string.",
      "✅ El array resultante es nuevo y se puede modificar sin tocar el objeto.",
      "✅ Los índices numéricos se ordenan antes que las claves de texto.",
      "❌ No incluye propiedades heredadas, símbolos ni no enumerables.",
      "💡 Regla: `keys` = etiquetas; `values` = contenidos; `entries` = etiqueta + contenido.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve Object.keys({ a: 1, b: 2 })?",
        opciones: ["[1, 2]", "['a', 'b']", "{ a: 1, b: 2 }", "2"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué propiedades incluye Object.keys()?",
        opciones: [
          "Todas, incluidas las heredadas",
          "Solo las propias y enumerables",
          "Solo las heredadas",
          "Solo las que contienen números",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué ocurre al llamar Object.keys(null)?",
        opciones: [
          "Devuelve []",
          "Devuelve null",
          "Lanza un TypeError",
          "Devuelve undefined",
        ],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Qué claves quedan fuera del resultado?",
        opciones: [
          "Las claves numéricas",
          "Las claves con Symbol y las no enumerables",
          "Las claves en mayúsculas",
          "Las claves con valor null",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Cómo se cuentan las propiedades propias enumerables?",
        opciones: [
          "Object.keys(obj).length",
          "obj.length",
          "Object.count(obj)",
          "Object.values(obj).size",
        ],
        correcta: 0,
      },
    ],
  },

  "object-values": {
    id: "object-values",
    titulo: "Object.values()",
    icon: "📋",
    categoria: "Object",
    firma: "Object.values(objeto)",

    definicion: [
      "Es un método estático de `Object` que devuelve un **array con los valores de las propiedades propias y enumerables** de un objeto. 📋",
      "El orden de los valores es exactamente el mismo que el de `Object.keys()`, por lo que ambas listas se corresponden por posición.",
    ],

    queEs: [
      "Es la versión de `Object.keys()` centrada en el **contenido** de los cajones en lugar de en sus etiquetas. 🎁",
      "Devuelve un array nuevo, listo para usar con `map`, `filter`, `reduce` o `forEach`.",
    ],

    paraQueSirve: [
      "➕ Sumar o promediar los valores numéricos de un objeto.",
      "🔍 Filtrar o validar los datos sin preocuparte por sus nombres de propiedad.",
      "📊 Alimentar gráficos y listas que solo necesitan la colección de valores.",
      "🧹 Detectar valores vacíos, repetidos o fuera de rango en una configuración.",
    ],

    comoFunciona: [
      "Recibe un objeto y obtiene sus claves propias y enumerables, igual que `Object.keys()`.",
      "Recorre esas claves en el mismo orden y lee el valor de cada una.",
      "Construye un array nuevo con esos valores.",
      "No incluye propiedades heredadas, símbolos ni propiedades no enumerables.",
      "Con `null` o `undefined` lanza `TypeError`; con primitivos aplica una conversión temporal.",
    ],

    sintaxis: [
      {
        code: `const valores = Object.values(objeto);`,
      },
      {
        caption: "Operar con todos los valores:",
        code: `const total = Object.values(precios).reduce(
  (suma, precio) => suma + precio,
  0,
);`,
      },
      {
        caption: "Comprobar si alguno está vacío:",
        code: `const hayVacios = Object.values(formulario).some(
  (valor) => valor === "",
);`,
      },
    ],

    nota: "💡 `Object.values()` solo devuelve valores de propiedades **propias y enumerables**. Si necesitas también las heredadas, recorre el objeto con `for...in` y filtra con `Object.hasOwn()`.",

    ejemplos: [
      {
        titulo: "1. 📋 Valores de un objeto",
        code: `const usuario = { nombre: "Ana", edad: 25, activo: true };
console.log(Object.values(usuario));
// ["Ana", 25, true]`,
      },
      {
        titulo: "2. ➕ Sumar los valores",
        code: `const precios = { cafe: 2, te: 1.5, jugo: 3 };
const total = Object.values(precios).reduce(
  (suma, precio) => suma + precio,
  0,
);
console.log(total);
// 6.5`,
      },
      {
        titulo: "3. 🔍 Filtrar valores",
        code: `const notas = { ana: 8, luis: 4, marta: 9, pedro: 5 };
const aprobados = Object.values(notas).filter((nota) => nota >= 5);
console.log(aprobados);
// [8, 9, 5]`,
      },
      {
        titulo: "4. 🧾 Correspondencia con las claves",
        code: `const stock = { manzanas: 10, peras: 4 };
const claves = Object.keys(stock);
const valores = Object.values(stock);
console.log(claves[0] + ": " + valores[0]);
// manzanas: 10`,
      },
    ],

    errores: [
      "**Esperar las claves:** `Object.values({ a: 1 })` devuelve `[1]`. Para las etiquetas usa `Object.keys()`.",
      "**Pensar que incluye propiedades heredadas:** solo recorre las propias; un prototipo con valores no aporta nada al array.",
      "**Asumir que el array es el objeto:** es una copia de los valores; cambiarla no modifica el objeto original.",
      "**Olvidar que el orden importa:** el array sigue el orden de las claves, no un orden alfabético ni numérico de valores.",
      "**Usarlo con `null` o `undefined`:** lanza `TypeError` en lugar de devolver un array vacío.",
    ],

    casos: [
      "🧮 Calcular totales y promedios de un objeto de precios o puntuaciones.",
      "✅ Validar que ningún campo de un formulario esté vacío.",
      "📊 Convertir un objeto en una serie de datos para un gráfico.",
      "🔎 Buscar el valor máximo o mínimo de una colección indexada por nombre.",
    ],

    relacion: [
      "**`Object.keys()`:** obtiene las etiquetas; `values` obtiene los contenidos.",
      "**`Object.entries()`:** obtiene ambos a la vez en pares `[clave, valor]`.",
      "**`Array.prototype.reduce()`:** se combina con `values` para agregar datos.",
      "**`Object.fromEntries()`:** permite reconstruir un objeto después de transformar sus valores.",
      "**`JSON.stringify()`:** también recorre valores, pero convierte todo a texto.",
    ],

    analogia:
      "Si `Object.keys()` es la lista de etiquetas de una colección de frascos, `Object.values()` es vaciar todos los frascos en una bandeja. 🫙 La bandeja contiene solo el contenido, en el mismo orden en que estaban los frascos. Puedes contar, mezclar o filtrar lo que hay en ella, pero cambiar la bandeja no cambia lo que queda dentro de cada frasco original.",

    fuente: "MDN Web Docs · ECMAScript · Object.values",

    notasPersonales: [
      "✅ Devuelve solo valores de propiedades propias y enumerables.",
      "✅ Mantiene el mismo orden que `Object.keys()`.",
      "✅ Es un array nuevo: se puede ordenar y modificar sin afectar al objeto.",
      "❌ No incluye símbolos, propiedades heredadas ni no enumerables.",
      "💡 Ideal para agregar datos: `Object.values(obj).reduce(...)`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve Object.values({ a: 1, b: 2 })?",
        opciones: ["['a', 'b']", "[1, 2]", "{ 1: 'a', 2: 'b' }", "3"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué orden siguen los valores devueltos?",
        opciones: [
          "Orden alfabético de valores",
          "El mismo orden que las claves del objeto",
          "Orden numérico ascendente siempre",
          "Un orden aleatorio",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Incluye Object.values() las propiedades heredadas?",
        opciones: [
          "Sí, todas",
          "Solo si son enumerables",
          "No, solo las propias",
          "Solo las de tipo string",
        ],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Qué método sirve para sumar todos los valores de un objeto?",
        opciones: [
          "Object.values(obj).reduce(...)",
          "Object.keys(obj).map(...)",
          "Object.sum(obj)",
          "obj.total()",
        ],
        correcta: 0,
      },
      {
        id: 5,
        pregunta: "¿Qué ocurre con Object.values(undefined)?",
        opciones: [
          "Devuelve []",
          "Devuelve undefined",
          "Lanza un TypeError",
          "Devuelve null",
        ],
        correcta: 2,
      },
    ],
  },

  "object-entries": {
    id: "object-entries",
    titulo: "Object.entries()",
    icon: "🧾",
    categoria: "Object",
    firma: "Object.entries(objeto)",

    definicion: [
      "Es un método estático de `Object` que devuelve un **array de pares `[clave, valor]`** con las propiedades propias y enumerables de un objeto. 🧾",
      "Cada par es un array de dos posiciones: la primera contiene la clave y la segunda el valor.",
    ],

    queEs: [
      "Es la combinación de `Object.keys()` y `Object.values()` en una sola estructura. 🎟️",
      "Convierte un objeto en una lista iterable, perfecta para `for...of`, `Map` y desestructuración.",
    ],

    paraQueSirve: [
      "🔁 Recorrer claves y valores al mismo tiempo sin consultar el objeto dos veces.",
      "🗺️ Crear un `Map` a partir de un objeto con `new Map(Object.entries(obj))`.",
      "🔄 Transformar un objeto con `map` y reconstruirlo después con `Object.fromEntries()`.",
      "🧾 Generar listas, tablas o informes que muestran etiqueta y contenido juntos.",
    ],

    comoFunciona: [
      "Obtiene las claves propias y enumerables del objeto, igual que `Object.keys()`.",
      "Para cada clave, lee su valor correspondiente.",
      "Crea un array interno `[clave, valor]` por cada propiedad.",
      "Devuelve un array nuevo que contiene todos esos pares en el mismo orden que las claves.",
      "Con `null` o `undefined` lanza `TypeError`; los símbolos y las propiedades no enumerables no aparecen.",
    ],

    sintaxis: [
      {
        code: `const entradas = Object.entries(objeto);`,
      },
      {
        caption: "Recorrer con desestructuración:",
        code: `for (const [clave, valor] of Object.entries(usuario)) {
  console.log(clave + ": " + valor);
}`,
      },
      {
        caption: "Transformar y reconstruir el objeto:",
        code: `const mayusculas = Object.entries(precios).map(
  ([producto, precio]) => [producto.toUpperCase(), precio * 2],
);
const resultado = Object.fromEntries(mayusculas);`,
      },
    ],

    nota: "💡 Las claves de los pares son siempre strings (o símbolos si el objeto los tuviera, aunque `entries` no los incluye). Los índices de un array aparecen como `'0'`, `'1'`, etc., no como números.",

    ejemplos: [
      {
        titulo: "1. 🧾 Pares clave-valor",
        code: `const usuario = { nombre: "Ana", edad: 25 };
console.log(Object.entries(usuario));
// [["nombre", "Ana"], ["edad", 25]]`,
      },
      {
        titulo: "2. 🔁 Recorrer con for...of",
        code: `const precios = { cafe: 2, te: 1.5 };
for (const [producto, precio] of Object.entries(precios)) {
  console.log(producto + " cuesta " + precio + " €");
}
// cafe cuesta 2 €
// te cuesta 1.5 €`,
      },
      {
        titulo: "3. 🗺️ Convertir un objeto en Map",
        code: `const stock = { manzanas: 10, peras: 4 };
const mapa = new Map(Object.entries(stock));
console.log(mapa.get("peras"));
// 4`,
      },
      {
        titulo: "4. 🔄 Transformar y reconstruir",
        code: `const precios = { cafe: 2, te: 1.5 };
const rebajados = Object.entries(precios).map(
  ([producto, precio]) => [producto, precio * 0.9],
);
console.log(Object.fromEntries(rebajados));
// { cafe: 1.8, te: 1.35 }`,
      },
    ],

    errores: [
      "**Esperar un objeto:** `Object.entries()` devuelve un array de arrays, no un objeto con las mismas propiedades.",
      "**Desestructurar al revés:** el orden es `[clave, valor]`. Escribir `[valor, clave]` intercambia los datos.",
      "**Olvidar que las claves son strings:** en un array, `Object.entries(['a', 'b'])` devuelve `[['0', 'a'], ['1', 'b']]`.",
      "**Contar con los símbolos:** las claves `Symbol` no se incluyen; para ellas usa `Object.getOwnPropertySymbols()`.",
      "**Usarlo con `null` o `undefined`:** lanza `TypeError` en vez de devolver una lista vacía.",
    ],

    casos: [
      "📊 Crear tablas dinámicas con una columna para la clave y otra para el valor.",
      "🔄 Normalizar objetos: cambiar mayúsculas, recortar textos o convertir unidades.",
      "🗺️ Inicializar un `Map` con datos que ya están en forma de objeto.",
      "🧮 Convertir un objeto de totales en una lista ordenada de pares.",
    ],

    relacion: [
      "**`Object.keys()`:** devuelve solo las claves; `entries` añade el valor.",
      "**`Object.values()`:** devuelve solo los valores; `entries` añade la clave.",
      "**`Object.fromEntries()`:** hace el camino inverso, de pares a objeto.",
      "**`Map`:** acepta directamente el array de pares que produce `entries`.",
      "**`for...of`:** recorre los pares con desestructuración `[clave, valor]`.",
    ],

    analogia:
      "Piensa en un recibo de compra. 🧾 Cada línea tiene el nombre del producto y su precio: no sirve solo el nombre ni solo el precio, sino la pareja completa. `Object.entries()` convierte tu objeto en una pila de recibos, uno por propiedad, y así puedes recorrerlos, transformarlos y volver a juntarlos con `Object.fromEntries()` como si pegaras los recibos en un nuevo cuaderno.",

    fuente: "MDN Web Docs · ECMAScript · Object.entries",

    notasPersonales: [
      "✅ Devuelve un array de pares `[clave, valor]`.",
      "✅ Mantiene el orden de `Object.keys()`.",
      "✅ Es la forma más cómoda de recorrer clave y valor a la vez.",
      "❌ No incluye propiedades heredadas, símbolos ni no enumerables.",
      "💡 Se combina con `Object.fromEntries()` para transformar objetos.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve Object.entries({ a: 1 })?",
        opciones: ["['a', 1]", "[['a', 1]]", "{ a: 1 }", "1"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué posición ocupa la clave dentro de cada par?",
        opciones: [
          "La segunda",
          "La primera",
          "Depende del tipo de valor",
          "No hay clave",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Con qué método se reconstruye un objeto desde pares?",
        opciones: [
          "Object.entries()",
          "Object.fromEntries()",
          "Object.assign()",
          "Object.create()",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Cómo se crea un Map desde un objeto?",
        opciones: [
          "new Map(Object.values(obj))",
          "new Map(Object.keys(obj))",
          "new Map(Object.entries(obj))",
          "Map.from(obj)",
        ],
        correcta: 2,
      },
      {
        id: 5,
        pregunta: "¿Qué claves no aparecen en Object.entries()?",
        opciones: [
          "Las claves numéricas",
          "Las claves con Symbol y las no enumerables",
          "Las claves en minúsculas",
          "Las claves con valor null",
        ],
        correcta: 1,
      },
    ],
  },

  "object-fromentries": {
    id: "object-fromentries",
    titulo: "Object.fromEntries()",
    icon: "🏗️",
    categoria: "Object",
    firma: "Object.fromEntries(iterable)",

    definicion: [
      "Es un método estático de `Object` que **construye un objeto a partir de un iterable de pares `[clave, valor]`**. 🏗️",
      "Es el inverso exacto de `Object.entries()`: lo que uno descompone en pares, el otro lo vuelve a unir.",
    ],

    queEs: [
      "Es la herramienta para convertir listas, mapas y arrays de pares en un objeto con propiedades. 🧱",
      "Acepta cualquier iterable: arrays, `Map`, `Set` de pares o generadores.",
    ],

    paraQueSirve: [
      "🔄 Reconstruir un objeto después de transformar sus entradas con `map` o `filter`.",
      "🗺️ Convertir un `Map` en un objeto plano para enviarlo como JSON.",
      "🧹 Crear objetos a partir de listas de pares generadas dinámicamente.",
      "📦 Normalizar datos que llegan como arrays de configuración `[clave, valor]`.",
    ],

    comoFunciona: [
      "Recibe un iterable cuyos elementos deben ser objetos con dos posiciones: clave y valor.",
      "Recorre el iterable en orden y extrae cada par.",
      "Convierte la clave en una propiedad válida (normalmente a string).",
      "Asigna el valor a esa propiedad dentro de un objeto nuevo.",
      "Devuelve el objeto creado; si una clave se repite, el último valor gana. Si el argumento no es iterable, lanza `TypeError`.",
    ],

    sintaxis: [
      {
        code: `const objeto = Object.fromEntries(pares);`,
      },
      {
        caption: "Desde un Map:",
        code: `const mapa = new Map([
  ["nombre", "Ana"],
  ["edad", 25],
]);
const usuario = Object.fromEntries(mapa);`,
      },
      {
        caption: "Transformar un objeto existente:",
        code: `const duplicado = Object.fromEntries(
  Object.entries(precios).map(([producto, precio]) => [
    producto,
    precio * 2,
  ]),
);`,
      },
    ],

    nota: "💡 No convierte los valores: si un valor es un número, sigue siendo un número. Solo transforma la **estructura** de pares a objeto. Para cambiar valores, usa `map` antes de llamar a `fromEntries`.",

    ejemplos: [
      {
        titulo: "1. 🏗️ Crear un objeto desde pares",
        code: `const pares = [
  ["nombre", "Ana"],
  ["edad", 25],
];
console.log(Object.fromEntries(pares));
// { nombre: "Ana", edad: 25 }`,
      },
      {
        titulo: "2. 🗺️ Convertir un Map en objeto",
        code: `const stock = new Map([
  ["manzanas", 10],
  ["peras", 4],
]);
console.log(Object.fromEntries(stock));
// { manzanas: 10, peras: 4 }`,
      },
      {
        titulo: "3. 🔄 Filtrar propiedades",
        code: `const usuario = { nombre: "Ana", edad: 25, password: "1234" };
const seguro = Object.fromEntries(
  Object.entries(usuario).filter(([clave]) => clave !== "password"),
);
console.log(seguro);
// { nombre: "Ana", edad: 25 }`,
      },
      {
        titulo: "4. 🔢 Duplicar precios",
        code: `const precios = { cafe: 2, te: 1.5 };
const dobles = Object.fromEntries(
  Object.entries(precios).map(([producto, precio]) => [
    producto,
    precio * 2,
  ]),
);
console.log(dobles);
// { cafe: 4, te: 3 }`,
      },
    ],

    errores: [
      "**Pasar un array de objetos:** `Object.fromEntries([{ a: 1 }])` lanza `TypeError`; cada elemento debe ser un par iterable.",
      "**Esperar que transforme valores:** solo cambia la estructura. Los valores se copian tal cual.",
      "**Olvidar las claves duplicadas:** si dos pares comparten clave, el último sobrescribe al anterior sin avisar.",
      "**Pasar un argumento no iterable:** un número o un objeto plano no son iterables y provocan `TypeError`.",
      "**Confundirlo con `Object.entries()`:** `entries` va de objeto a pares; `fromEntries` va de pares a objeto.",
    ],

    casos: [
      "🔐 Eliminar campos sensibles de un objeto antes de guardarlo.",
      "🗺️ Serializar un `Map` como objeto plano para enviarlo por una API.",
      "🧮 Recalcular todos los valores de una configuración y reconstruirla.",
      "📋 Convertir filas de una base de datos en un objeto indexado por id.",
    ],

    relacion: [
      "**`Object.entries()`:** el método inverso, de objeto a array de pares.",
      "**`Map`:** es iterable de pares, por lo que se convierte directamente.",
      "**`Array.prototype.map()`:** transforma los pares antes de reconstruir el objeto.",
      "**`Array.prototype.filter()`:** descarta propiedades antes de llamar a `fromEntries`.",
      "**`Object.assign()`:** también crea objetos, pero copiando propiedades de otros objetos, no de pares.",
    ],

    analogia:
      "Tienes una caja de piezas de mueble, cada una con una etiqueta y su contenido. 🧰 `Object.fromEntries()` es el montador: toma cada par etiqueta-contenido y lo coloca en el mueble final. Si llegan dos piezas con la misma etiqueta, la última sustituye a la primera. No cambia las piezas, solo las organiza en un objeto con forma de mueble.",

    fuente: "MDN Web Docs · ECMAScript 2019 · Object.fromEntries",

    notasPersonales: [
      "✅ Convierte un iterable de pares en un objeto.",
      "✅ Es el inverso de `Object.entries()`.",
      "✅ Acepta arrays, `Map`, generadores y otros iterables.",
      "⚠️ Si una clave se repite, gana el último valor.",
      "💡 Patrón: `fromEntries(entries(obj).map(...))` para transformar objetos.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué recibe Object.fromEntries()?",
        opciones: [
          "Un objeto plano",
          "Un iterable de pares [clave, valor]",
          "Una cadena JSON",
          "Un array de números",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué método realiza la operación inversa?",
        opciones: [
          "Object.values()",
          "Object.entries()",
          "Object.assign()",
          "Object.freeze()",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué ocurre si dos pares tienen la misma clave?",
        opciones: [
          "Se lanza un error",
          "Se conserva el primero",
          "Se conserva el último",
          "Se crean dos propiedades",
        ],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Se transforman los valores al usar fromEntries?",
        opciones: [
          "Sí, todos a string",
          "No, se copian tal cual",
          "Solo los números",
          "Solo si son objetos",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Cuál de estos se puede pasar directamente a Object.fromEntries()?",
        opciones: [
          "Un número",
          "Un objeto plano",
          "Un Map",
          "Una función",
        ],
        correcta: 2,
      },
    ],
  },

  "object-assign": {
    id: "object-assign",
    titulo: "Object.assign()",
    icon: "🧩",
    categoria: "Object",
    firma: "Object.assign(destino, ...fuentes)",

    definicion: [
      "Es un método estático de `Object` que **copia las propiedades propias y enumerables** de una o varias fuentes en un objeto destino. 🧩",
      "Devuelve el mismo objeto destino, no una copia nueva, así que modifica el objeto que recibe como primer argumento.",
    ],

    queEs: [
      "Es la forma clásica de **fusionar objetos** y de hacer copias superficiales. 📚",
      "Copia tanto claves de texto como claves `Symbol`, siempre que sean propias y enumerables.",
    ],

    paraQueSirve: [
      "🧬 Crear una copia superficial de un objeto con `Object.assign({}, original)`.",
      "⚙️ Fusionar una configuración por defecto con las opciones del usuario.",
      "📦 Añadir varias propiedades a un objeto existente en una sola llamada.",
      "🧩 Combinar objetos que provienen de distintas fuentes antes de enviarlos.",
    ],

    comoFunciona: [
      "Toma el primer argumento como destino; si no es un objeto, lo convierte a objeto.",
      "Recorre cada fuente de izquierda a derecha.",
      "Copia las propiedades propias y enumerables de cada fuente, incluidas las claves `Symbol`.",
      "Las propiedades posteriores sobrescriben a las anteriores con el mismo nombre.",
      "Devuelve el destino modificado; si el destino es `null` o `undefined`, lanza `TypeError`.",
    ],

    sintaxis: [
      {
        code: `const resultado = Object.assign(destino, fuente1, fuente2);`,
      },
      {
        caption: "Copia superficial de un objeto:",
        code: `const copia = Object.assign({}, original);
console.log(copia === original); // false`,
      },
      {
        caption: "Fusionar valores por defecto con opciones:",
        code: `const configuracion = Object.assign(
  { tema: "claro", idioma: "es" },
  opciones,
  { actualizado: true },
);`,
      },
    ],

    nota: "💡 `Object.assign()` hace una copia **superficial**: las propiedades que son objetos se copian por referencia. Para copias profundas usa `structuredClone()` o una función recursiva.",

    ejemplos: [
      {
        titulo: "1. 🧩 Fusionar dos objetos",
        code: `const base = { nombre: "Ana", edad: 25 };
const extra = { ciudad: "Madrid", activo: true };
const persona = Object.assign({}, base, extra);
console.log(persona);
// { nombre: "Ana", edad: 25, ciudad: "Madrid", activo: true }`,
      },
      {
        titulo: "2. ⚙️ Configuración con valores por defecto",
        code: `const porDefecto = { tema: "claro", idioma: "es", avisos: true };
const usuario = { tema: "oscuro" };
const config = Object.assign({}, porDefecto, usuario);
console.log(config.tema);
// oscuro`,
      },
      {
        titulo: "3. 🔁 El destino se modifica",
        code: `const destino = { a: 1 };
const devuelto = Object.assign(destino, { b: 2 });
console.log(destino);
// { a: 1, b: 2 }
console.log(devuelto === destino);
// true`,
      },
      {
        titulo: "4. 🪞 La copia es superficial",
        code: `const original = { nombre: "Ana", direccion: { ciudad: "Madrid" } };
const copia = Object.assign({}, original);
copia.direccion.ciudad = "Sevilla";
console.log(original.direccion.ciudad);
// Sevilla`,
      },
    ],

    errores: [
      "**Creer que es una copia profunda:** los objetos anidados se comparten por referencia; cambiar uno afecta a ambos.",
      "**Olvidar que muta el destino:** `Object.assign(original, extra)` modifica `original`. Usa `{}` como primer argumento para evitarlo.",
      "**Pasar `null` como destino:** lanza `TypeError: Cannot convert undefined or null to object`.",
      "**Esperar copiar el prototipo:** solo copia propiedades propias y enumerables, no la cadena de prototipos.",
      "**Confiar en que copia getters:** los getters se **ejecutan** y se copia su valor resultante, no el getter original.",
    ],

    casos: [
      "⚙️ Mezclar opciones por defecto con la configuración que llega del usuario.",
      "📋 Clonar un objeto plano antes de modificarlo sin tocar el original.",
      "🧩 Añadir metadatos a un objeto justo antes de guardarlo o enviarlo.",
      "🔀 Combinar varios fragmentos de estado en un solo objeto.",
    ],

    relacion: [
      "**Spread `...`:** `{ ...a, ...b }` hace una fusión superficial parecida, sin mutar el destino.",
      "**`structuredClone()`:** realiza copias profundas y conserva `Date`, `Map`, `Set` y ciclos.",
      "**`Object.entries()`:** permite transformar propiedades antes de volver a construir el objeto.",
      "**`Object.freeze()`:** a menudo se aplica al resultado para evitar cambios posteriores.",
      "**`JSON.parse(JSON.stringify(obj))`:** otra copia profunda clásica, pero pierde tipos como `Date`.",
    ],

    analogia:
      "Imagina que tienes una carpeta con documentos y quieres reunir en ella copias de otras carpetas. 🗂️ `Object.assign()` es la persona que va carpeta por carpeta copiando cada hoja a la carpeta destino. Si dos hojas tienen el mismo título, la última que copia reemplaza a la anterior. Las subcarpetas no se copian por dentro: solo se guarda una nota que apunta a ellas, por eso la copia es superficial.",

    fuente: "MDN Web Docs · ECMAScript · Object.assign",

    notasPersonales: [
      "✅ Copia propiedades propias y enumerables, incluidas las de tipo Symbol.",
      "✅ Devuelve el mismo objeto destino, no uno nuevo.",
      "⚠️ Es una copia superficial: los objetos anidados se comparten.",
      "⚠️ Muta el primer argumento; usa `{}` para trabajar sobre una copia.",
      "💡 Para copias profundas, prefiere `structuredClone()`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve Object.assign(destino, fuente)?",
        opciones: [
          "Una copia nueva del destino",
          "El mismo objeto destino modificado",
          "Un array de propiedades",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué tipo de copia realiza Object.assign()?",
        opciones: [
          "Copia profunda",
          "Copia superficial",
          "Copia solo de arrays",
          "No copia nada",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué ocurre si dos fuentes tienen la misma propiedad?",
        opciones: [
          "Gana la primera",
          "Gana la última",
          "Se lanza un error",
          "Se suman los valores",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Cómo se evita mutar el objeto original al fusionar?",
        opciones: [
          "Pasando null como destino",
          "Usando {} como destino",
          "Llamando dos veces a assign",
          "Usando Object.freeze() en la fuente",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué propiedades se copian?",
        opciones: [
          "Todas, incluidas las heredadas",
          "Solo las propias y enumerables",
          "Solo las no enumerables",
          "Solo las claves numéricas",
        ],
        correcta: 1,
      },
    ],
  },

  "object-freeze": {
    id: "object-freeze",
    titulo: "Object.freeze()",
    icon: "🧊",
    categoria: "Object",
    firma: "Object.freeze(objeto)",

    definicion: [
      "Es un método estático de `Object` que **impide añadir, eliminar o modificar** las propiedades de un objeto. 🧊",
      "Devuelve el mismo objeto que recibe, pero ya congelado; no crea una copia.",
    ],

    queEs: [
      "Es un mecanismo de **inmutabilidad superficial** para proteger datos que no deberían cambiar. 🔒",
      "Marca el objeto como no extensible y convierte sus propiedades de datos en no configurables y no escribibles.",
    ],

    paraQueSirve: [
      "🔒 Proteger constantes y configuraciones que no deben modificarse.",
      "🐞 Detectar mutaciones accidentales durante el desarrollo.",
      "📦 Compartir datos de solo lectura entre módulos o funciones.",
      "🧪 Garantizar que un objeto usado como clave o referencia no cambie.",
    ],

    comoFunciona: [
      "Recibe un objeto y lo marca como no extensible, así que no se pueden añadir propiedades nuevas.",
      "Convierte las propiedades de datos existentes en no configurables: no se pueden borrar ni redefinir.",
      "Las propiedades de datos pasan a ser no escribibles: su valor no se puede reasignar.",
      "Devuelve el mismo objeto congelado; en modo estricto, intentar modificarlo lanza `TypeError`.",
      "La congelación es **superficial**: los objetos y arrays anidados siguen siendo mutables.",
    ],

    sintaxis: [
      {
        code: `const congelado = Object.freeze(objeto);`,
      },
      {
        caption: "Comprobar el estado:",
        code: `Object.isFrozen(objeto); // true o false
Object.isSealed(objeto); // true si no se puede añadir ni borrar`,
      },
      {
        caption: "Congelar y capturar el intento de cambio:",
        code: `const config = Object.freeze({ tema: "oscuro" });
try {
  config.tema = "claro";
} catch (error) {
  console.log(error.name); // TypeError
}`,
      },
    ],

    nota: "💡 `Object.freeze()` es superficial. Para congelar también los objetos anidados necesitas recorrerlos y congelarlos uno por uno, o usar una función de congelación profunda.",

    ejemplos: [
      {
        titulo: "1. 🧊 Congelar un objeto",
        code: `const config = Object.freeze({ tema: "oscuro", idioma: "es" });
console.log(Object.isFrozen(config));
// true`,
      },
      {
        titulo: "2. 🚫 Intentar modificar en modo estricto",
        code: `"use strict";
const config = Object.freeze({ tema: "oscuro" });
try {
  config.tema = "claro";
} catch (error) {
  console.log(error.name);
}
// TypeError`,
      },
      {
        titulo: "3. 🪆 La congelación no es profunda",
        code: `const usuario = Object.freeze({
  nombre: "Ana",
  direccion: { ciudad: "Madrid" },
});
usuario.direccion.ciudad = "Sevilla";
console.log(usuario.direccion.ciudad);
// Sevilla`,
      },
      {
        titulo: "4. 🔍 Comparar con isFrozen",
        code: `const abierto = { a: 1 };
const cerrado = Object.freeze({ a: 1 });
console.log(Object.isFrozen(abierto));
// false
console.log(Object.isFrozen(cerrado));
// true`,
      },
    ],

    errores: [
      "**Creer que es una copia profunda:** los objetos anidados no se congelan y pueden modificarse.",
      "**Esperar un error siempre:** en modo no estricto, las mutaciones fallan en silencio; el `TypeError` solo aparece en modo estricto.",
      "**Pensar que devuelve un objeto nuevo:** devuelve exactamente el mismo objeto, ahora congelado.",
      "**Intentar congelar un array anidado:** el array exterior queda protegido, pero los objetos dentro siguen libres.",
      "**Usarlo para copiar datos:** no copia; para una copia inmutable usa spread o `structuredClone()` y luego congela.",
    ],

    casos: [
      "⚙️ Definir constantes de configuración que nunca deben cambiar en tiempo de ejecución.",
      "🧪 Congelar el estado inicial de una prueba para evitar efectos secundarios.",
      "📦 Exportar datos de solo lectura desde un módulo.",
      "🛡️ Proteger objetos compartidos entre varias partes de la aplicación.",
    ],

    relacion: [
      "**`Object.isFrozen()`:** comprueba si un objeto está congelado.",
      "**`Object.seal()`:** impide añadir y borrar, pero permite modificar valores.",
      "**`Object.preventExtensions()`:** solo impide añadir propiedades nuevas.",
      "**`const`:** protege la variable, no el contenido del objeto; `freeze` protege el contenido.",
      "**`structuredClone()`:** crea una copia independiente que después puedes congelar sin afectar al original.",
    ],

    analogia:
      "Imagina que metes una figura de plastilina en un bloque de hielo. 🧊 Ya no puedes añadir piezas, quitarlas ni cambiar su forma: eso es `Object.freeze()`. Pero si dentro de la figura hay una cajita con otra figura suelta, el hielo solo rodea la cajita exterior; la figura de dentro todavía puede moverse. Por eso la congelación es superficial y hay que congelar cada nivel por separado.",

    fuente: "MDN Web Docs · ECMAScript · Object.freeze",

    notasPersonales: [
      "✅ Impide añadir, borrar y reasignar propiedades propias.",
      "✅ Devuelve el mismo objeto, no una copia.",
      "⚠️ En modo estricto, una mutación lanza `TypeError`.",
      "⚠️ Es superficial: los objetos anidados siguen siendo mutables.",
      "💡 `const` congela la referencia; `Object.freeze()` congela el contenido.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve Object.freeze(objeto)?",
        opciones: [
          "Una copia congelada nueva",
          "El mismo objeto congelado",
          "true o false",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué ocurre al intentar modificar un objeto congelado en modo estricto?",
        opciones: [
          "Se modifica igualmente",
          "Se lanza un TypeError",
          "Devuelve null",
          "Se ignora sin errores",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿La congelación es profunda?",
        opciones: [
          "Sí, congela todos los niveles",
          "No, solo el primer nivel",
          "Solo en arrays",
          "Solo si el objeto tiene menos de 10 propiedades",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué diferencia hay entre const y Object.freeze()?",
        opciones: [
          "Ninguna",
          "const protege la variable; freeze protege el contenido",
          "freeze protege la variable; const el contenido",
          "const solo funciona con arrays",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué método comprueba si un objeto está congelado?",
        opciones: [
          "Object.isSealed()",
          "Object.isFrozen()",
          "Object.isExtensible()",
          "Object.hasOwn()",
        ],
        correcta: 1,
      },
    ],
  },

  "object-hasown": {
    id: "object-hasown",
    titulo: "Object.hasOwn()",
    icon: "🛡️",
    categoria: "Object",
    firma: "Object.hasOwn(objeto, propiedad)",

    definicion: [
      "Es un método estático de `Object` que devuelve `true` si la propiedad indicada **existe directamente en el objeto**, sin mirar su prototipo. 🛡️",
      "Llegó en ECMAScript 2022 como sustituto moderno de `Object.prototype.hasOwnProperty.call()`.",
    ],

    queEs: [
      "Es una comprobación de pertenencia **segura y legible** que no se rompe con objetos creados sin prototipo. 🔍",
      "A diferencia de `in`, no cuenta las propiedades heredadas de la cadena de prototipos.",
    ],

    paraQueSirve: [
      "✅ Comprobar si un objeto tiene una propiedad antes de usarla.",
      "🧹 Distinguir propiedades propias de propiedades heredadas del prototipo.",
      "🗂️ Validar diccionarios creados con `Object.create(null)`, que no tienen `hasOwnProperty`.",
      "🔁 Filtrar claves al recorrer un objeto con `for...in`.",
    ],

    comoFunciona: [
      "Recibe un objeto y una clave (string o `Symbol`).",
      "Comprueba si esa clave existe como propiedad **propia** del objeto.",
      "No importa si la propiedad es enumerable o no: cualquier propiedad propia cuenta.",
      "Devuelve un booleano: `true` si existe, `false` si no.",
      "Si el primer argumento es `null` o `undefined`, lanza `TypeError`.",
    ],

    sintaxis: [
      {
        code: `const existe = Object.hasOwn(objeto, "propiedad");`,
      },
      {
        caption: "Comparar con la cadena de prototipos:",
        code: `const usuario = { nombre: "Ana" };
Object.hasOwn(usuario, "nombre"); // true
Object.hasOwn(usuario, "toString"); // false
"toString" in usuario; // true (heredada)`,
      },
      {
        caption: "Filtrar un recorrido con for...in:",
        code: `for (const clave in objeto) {
  if (!Object.hasOwn(objeto, clave)) continue;
  console.log(clave);
}`,
      },
    ],

    nota: "💡 Usa `Object.hasOwn(obj, 'clave')` en lugar de `obj.hasOwnProperty('clave')`: el segundo falla si la propiedad se llama `hasOwnProperty` o si el objeto se creó con `Object.create(null)`.",

    ejemplos: [
      {
        titulo: "1. 🛡️ Propiedad propia",
        code: `const usuario = { nombre: "Ana", edad: 25 };
console.log(Object.hasOwn(usuario, "nombre"));
// true
console.log(Object.hasOwn(usuario, "apellido"));
// false`,
      },
      {
        titulo: "2. 🧬 Propiedad heredada",
        code: `const usuario = { nombre: "Ana" };
console.log(Object.hasOwn(usuario, "toString"));
// false
console.log("toString" in usuario);
// true`,
      },
      {
        titulo: "3. 🗂️ Objeto sin prototipo",
        code: `const diccionario = Object.create(null);
diccionario.emoji = "😀";
console.log(Object.hasOwn(diccionario, "emoji"));
// true`,
      },
      {
        titulo: "4. 🔁 Filtrar con for...in",
        code: `const base = { heredada: true };
const hijo = Object.create(base);
hijo.propia = true;
for (const clave in hijo) {
  if (Object.hasOwn(hijo, clave)) {
    console.log(clave);
  }
}
// propia`,
      },
    ],

    errores: [
      "**Confundirlo con `in`:** `in` también devuelve `true` para propiedades heredadas; `Object.hasOwn()` solo mira las propias.",
      "**Llamarlo como método del objeto:** no existe `obj.hasOwn()`; es una función estática: `Object.hasOwn(obj, clave)`.",
      "**Usarlo con `null` o `undefined`:** lanza `TypeError`; comprueba antes que el objeto exista.",
      "**Creer que solo detecta enumerables:** también devuelve `true` para propiedades propias no enumerables.",
      "**Pasar la clave como número sin querer:** se convierte a string; `Object.hasOwn(arr, 0)` comprueba la clave `'0'`.",
    ],

    casos: [
      "✅ Validar que una respuesta de API trae un campo antes de leerlo.",
      "🧹 Recorrer objetos heredados y quedarse solo con las propiedades propias.",
      "🗂️ Trabajar con diccionarios creados mediante `Object.create(null)`.",
      "⚙️ Comprobar si una opción fue definida explícitamente por el usuario.",
    ],

    relacion: [
      "**`in`:** comprueba la propiedad en el objeto y en toda su cadena de prototipos.",
      "**`Object.prototype.hasOwnProperty()`:** hace lo mismo, pero puede fallar si el objeto no lo hereda.",
      "**`Object.keys()`:** lista las claves propias enumerables; `hasOwn` comprueba una sola.",
      "**`Object.create(null)`:** crea objetos sin prototipo, donde `hasOwn` es especialmente útil.",
      "**`Object.getOwnPropertyNames()`:** obtiene todas las claves propias, enumerables o no.",
    ],

    analogia:
      "Imagina que preguntas si una herramienta está en tu caja personal. 🧰 `in` responde que sí aunque la herramienta esté en la caja del taller que heredaste; `Object.hasOwn()` es más estricto y solo dice que sí si está físicamente en tu caja. Es la diferencia entre «está disponible para mí» y «es mía». Por eso sirve para comprobar datos propios sin que el prototipo contamine la respuesta.",

    fuente: "MDN Web Docs · ECMAScript 2022 · Object.hasOwn",

    notasPersonales: [
      "✅ Comprueba solo propiedades propias, no heredadas.",
      "✅ Funciona con objetos sin prototipo y con claves `Symbol`.",
      "✅ Sustituye a `hasOwnProperty.call()` con una sintaxis más limpia.",
      "❌ Lanza `TypeError` si el objeto es `null` o `undefined`.",
      "💡 Regla: `hasOwn` = ¿es mía?; `in` = ¿está disponible, aunque sea heredada?",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué comprueba Object.hasOwn(obj, 'clave')?",
        opciones: [
          "Si la clave existe en el objeto o en su prototipo",
          "Si la clave es una propiedad propia del objeto",
          "Si el valor de la clave es verdadero",
          "Si la clave es enumerable",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué diferencia hay con el operador in?",
        opciones: [
          "Ninguna",
          "in incluye propiedades heredadas; hasOwn no",
          "hasOwn incluye propiedades heredadas; in no",
          "in solo funciona con arrays",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué ocurre con Object.hasOwn(null, 'a')?",
        opciones: [
          "Devuelve false",
          "Devuelve true",
          "Lanza un TypeError",
          "Devuelve undefined",
        ],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Funciona con objetos creados con Object.create(null)?",
        opciones: [
          "No, porque no tienen prototipo",
          "Sí, y es una de sus ventajas",
          "Solo si tienen la propiedad hasOwnProperty",
          "Solo con claves numéricas",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Detecta propiedades propias no enumerables?",
        opciones: [
          "No, solo enumerables",
          "Sí, cualquier propiedad propia",
          "Solo si son de tipo string",
          "Solo en arrays",
        ],
        correcta: 1,
      },
    ],
  },

  "object-create": {
    id: "object-create",
    titulo: "Object.create()",
    icon: "🌱",
    categoria: "Object",
    firma: "Object.create(prototipo, descriptores)",

    definicion: [
      "Es un método estático de `Object` que **crea un objeto nuevo usando otro objeto como prototipo**. 🌱",
      "El segundo argumento, opcional, permite definir propiedades con descriptores de propiedad, igual que `Object.defineProperties()`.",
    ],

    queEs: [
      "Es la forma directa de establecer la **cadena de prototipos** sin usar clases ni constructores. 🧬",
      "Con `Object.create(null)` se crea un objeto sin prototipo, útil como diccionario limpio.",
    ],

    paraQueSirve: [
      "🧬 Implementar herencia prototípica entre objetos.",
      "🗂️ Crear diccionarios sin propiedades heredadas como `toString` o `constructor`.",
      "⚙️ Definir propiedades con control fino de `writable`, `enumerable` y `configurable`.",
      "🧪 Crear objetos base para pruebas con un prototipo controlado.",
    ],

    comoFunciona: [
      "Recibe el objeto que será el prototipo del nuevo objeto, o `null` para no tener ninguno.",
      "Crea un objeto vacío cuyo prototipo interno apunta al objeto indicado.",
      "Si se pasa el segundo argumento, define propiedades con descriptores (por defecto no escribibles, no enumerables y no configurables).",
      "Devuelve el objeto nuevo; no copia las propiedades del prototipo, solo las enlaza.",
      "Si el prototipo no es un objeto ni `null`, lanza `TypeError`.",
    ],

    sintaxis: [
      {
        code: `const nuevo = Object.create(prototipo);`,
      },
      {
        caption: "Con descriptores de propiedad:",
        code: `const usuario = Object.create(prototipo, {
  nombre: { value: "Ana", writable: true, enumerable: true },
  edad: { value: 25, writable: true, enumerable: true },
});`,
      },
      {
        caption: "Diccionario sin prototipo:",
        code: `const diccionario = Object.create(null);
diccionario.clave = "valor";
console.log(diccionario.toString); // undefined`,
      },
    ],

    nota: "💡 En el segundo argumento, los descriptores son estrictos por defecto: si omites `writable: true`, la propiedad no se podrá modificar. Es una diferencia importante respecto a la asignación normal.",

    ejemplos: [
      {
        titulo: "1. 🌱 Crear un objeto con prototipo",
        code: `const animal = {
  saludar() {
    return "Hola, soy " + this.nombre;
  },
};
const perro = Object.create(animal);
perro.nombre = "Toby";
console.log(perro.saludar());
// Hola, soy Toby`,
      },
      {
        titulo: "2. 🗂️ Diccionario sin prototipo",
        code: `const diccionario = Object.create(null);
diccionario.emoji = "😀";
console.log(diccionario.emoji);
// 😀
console.log(diccionario.toString);
// undefined`,
      },
      {
        titulo: "3. ⚙️ Propiedades con descriptores",
        code: `const usuario = Object.create(null, {
  nombre: { value: "Ana", enumerable: true },
});
console.log(usuario.nombre);
// Ana
console.log(Object.keys(usuario));
// ["nombre"]`,
      },
      {
        titulo: "4. 🧬 Comprobar el prototipo",
        code: `const base = { tipo: "base" };
const hijo = Object.create(base);
console.log(Object.getPrototypeOf(hijo) === base);
// true
console.log(hijo.tipo);
// base`,
      },
    ],

    errores: [
      "**Pasar un número o un string como prototipo:** solo se acepta un objeto o `null`; cualquier otra cosa lanza `TypeError`.",
      "**Olvidar los valores por defecto de los descriptores:** una propiedad definida solo con `value` queda no escribible, no enumerable y no configurable.",
      "**Esperar que `Object.create(null)` tenga métodos:** no hereda `toString`, `hasOwnProperty` ni `constructor`.",
      "**Confundir prototipo con copia:** el nuevo objeto no recibe copias de las propiedades, las busca en el prototipo cuando hace falta.",
      "**Modificar el prototipo después:** los cambios se reflejan en todos los objetos que lo usan, lo que puede sorprender.",
    ],

    casos: [
      "🧬 Crear jerarquías de objetos sin clases para prototipos simples.",
      "🗂️ Construir mapas o diccionarios seguros sin claves heredadas.",
      "⚙️ Definir propiedades de solo lectura o no enumerables con precisión.",
      "🧪 Fabricar objetos base reutilizables en pruebas unitarias.",
    ],

    relacion: [
      "**`Object.getPrototypeOf()`:** lee el prototipo de un objeto creado con `Object.create()`.",
      "**`Object.setPrototypeOf()`:** cambia el prototipo de un objeto ya existente.",
      "**`Object.defineProperties()`:** define propiedades con descriptores, igual que el segundo argumento.",
      "**Clases y `new`:** también crean la cadena de prototipos, pero con una sintaxis más alta.",
      "**`Object.assign()`:** copia propiedades; `Object.create()` enlaza un prototipo, no copia.",
    ],

    analogia:
      "`Object.create()` es como plantar un esqueje a partir de una planta madre. 🌱 El esqueje es un objeto nuevo e independiente, pero comparte el código genético (el prototipo) de la planta original. Si la planta madre cambia, el esqueje hereda ese cambio; si el esqueje crece con sus propias hojas, la madre no se entera. Y `Object.create(null)` sería un esqueje sin especie: puede existir, pero no trae los comportamientos habituales de ninguna planta.",

    fuente: "MDN Web Docs · ECMAScript · Object.create",

    notasPersonales: [
      "✅ Crea un objeto nuevo con el prototipo indicado.",
      "✅ `Object.create(null)` genera un objeto sin cadena de prototipos.",
      "⚠️ El segundo argumento usa descriptores estrictos por defecto.",
      "❌ No copia propiedades: solo enlaza el prototipo.",
      "💡 Ideal para diccionarios y herencia prototípica sencilla.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué recibe Object.create() como primer argumento?",
        opciones: [
          "Un array de propiedades",
          "El prototipo del nuevo objeto",
          "Una cadena JSON",
          "El nombre del objeto",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué crea Object.create(null)?",
        opciones: [
          "Un objeto vacío con prototipo Object",
          "Un objeto sin prototipo",
          "Un array vacío",
          "Un error",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué valores toman los descriptores si solo se indica value?",
        opciones: [
          "Todo true por defecto",
          "No escribible, no enumerable y no configurable",
          "Solo enumerable true",
          "Depende del navegador",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Object.create() copia las propiedades del prototipo?",
        opciones: [
          "Sí, todas",
          "No, solo enlaza el prototipo",
          "Solo las enumerables",
          "Solo las de tipo string",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué ocurre si el primer argumento es un número?",
        opciones: [
          "Se convierte en objeto",
          "Se lanza un TypeError",
          "Devuelve null",
          "Crea un objeto con prototipo Number",
        ],
        correcta: 1,
      },
    ],
  },
};
