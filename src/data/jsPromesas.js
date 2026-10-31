export const JS_PROMESAS = {
  id: "promesas",
  label: "Promesas",
  icon: "🤝",
  titulo: "Promesas en JavaScript",
  descripcion:
    "Coordina operaciones asíncronas en paralelo, conoce el estado de cada una y crea promesas ya resueltas.",
  grupos: [
    {
      seccion: "Combinadores de promesas",
      metodos: [
        {
          id: "promise-all",
          nombre: "Promise.all()",
          firma: "Promise.all(iterable)",
          icon: "📦",
        },
        {
          id: "promise-allsettled",
          nombre: "Promise.allSettled()",
          firma: "Promise.allSettled(iterable)",
          icon: "📋",
        },
        {
          id: "promise-any",
          nombre: "Promise.any()",
          firma: "Promise.any(iterable)",
          icon: "🏆",
        },
      ],
    },
    {
      seccion: "Creación de promesas",
      metodos: [
        {
          id: "promise-resolve",
          nombre: "Promise.resolve()",
          firma: "Promise.resolve(valor)",
          icon: "✅",
        },
      ],
    },
  ],
};

export const JS_PROMESAS_DOCS = {
  "promise-all": {
    id: "promise-all",
    titulo: "Promise.all()",
    icon: "📦",
    categoria: "Promesas",
    firma: "Promise.all(iterable)",
    simulador: "promesa",

    definicion: [
      "Es un método estático de `Promise` que recibe un iterable de promesas y devuelve una nueva promesa. 📦",
      "Se resuelve cuando **todas** las promesas se resuelven, y se rechaza en cuanto **una sola** falla.",
    ],

    queEs: [
      "Es una herramienta para ejecutar operaciones asíncronas **en paralelo** y obtener todos sus resultados juntos. 🤝",
      "Devuelve un array de resultados en el **mismo orden** del iterable original, sin importar cuál terminó primero.",
    ],

    paraQueSirve: [
      "🌐 Hacer varias solicitudes HTTP al mismo tiempo.",
      "📷 Cargar o subir múltiples archivos.",
      "🛒 Cargar usuarios, productos y pedidos al iniciar una app.",
      "⚡ Reducir tiempos de espera ejecutando tareas independientes en paralelo.",
    ],

    comoFunciona: [
      "Recibe un iterable de promesas (normalmente un array).",
      "Inicia todas las operaciones en paralelo.",
      "Espera a que todas se resuelvan.",
      "Devuelve un array con los resultados en el orden original.",
      "Si alguna se rechaza, la promesa resultante se rechaza inmediatamente con ese error; las demás siguen ejecutándose, pero su resultado se ignora.",
    ],

    sintaxis: [
      {
        code: `Promise.all([promesa1, promesa2, promesa3])
  .then((resultados) => {
    console.log(resultados);
  })
  .catch((error) => {
    console.error(error);
  });`,
      },
      {
        caption: "Con async/await:",
        code: `async function cargarDatos() {
  const resultados = await Promise.all([
    obtenerUsuarios(),
    obtenerProductos(),
  ]);
  console.log(resultados);
}`,
      },
    ],

    nota: "💡 Si las tareas dependen entre sí (la segunda necesita el resultado de la primera), no uses `Promise.all()`: ejecútalas en secuencia.",

    ejemplos: [
      {
        titulo: "1. 📦 Promesas simples",
        code: `const tarea1 = Promise.resolve("Tarea 1 completada");
const tarea2 = Promise.resolve("Tarea 2 completada");
const tarea3 = Promise.resolve("Tarea 3 completada");

Promise.all([tarea1, tarea2, tarea3])
  .then((resultado) => console.log(resultado));
// ["Tarea 1 completada", "Tarea 2 completada", "Tarea 3 completada"]`,
      },
      {
        titulo: "2. 🌐 Solicitudes a APIs",
        code: `const usuarios = fetch("/usuarios");
const productos = fetch("/productos");

Promise.all([usuarios, productos])
  .then((respuestas) => {
    console.log("Datos cargados");
  });`,
      },
      {
        titulo: "3. ❌ Cuando una promesa falla",
        code: `const correcto = Promise.resolve("OK");
const error = Promise.reject("Algo salió mal");

Promise.all([correcto, error])
  .then((resultado) => console.log(resultado))
  .catch((error) => console.log(error));
// "Algo salió mal"`,
      },
      {
        titulo: "4. ⏱️ Mantiene el orden original",
        code: `const p1 = new Promise((resolve) =>
  setTimeout(() => resolve("Primero"), 3000)
);
const p2 = new Promise((resolve) =>
  setTimeout(() => resolve("Segundo"), 1000)
);

Promise.all([p1, p2]).then(console.log);
// ["Primero", "Segundo"]`,
      },
    ],

    errores: [
      "**Pensar que paraleliza con await secuencial:** `await tarea1(); await tarea2();` ejecuta una tras otra. Usa `await Promise.all([tarea1(), tarea2()])`.",
      "**Pasar valores que no son promesas:** `Promise.all([console.log(\"Hola\")])` no espera nada útil porque `console.log()` devuelve `undefined`.",
      "**Olvidar manejar errores:** sin `.catch()` o `try...catch`, un rechazo queda sin controlar.",
      "**Usarlo con tareas dependientes:** si la segunda necesita la primera, deben ir en secuencia.",
    ],

    casos: [
      "🌐 Cargar información de varias APIs a la vez.",
      "📷 Subir múltiples archivos en paralelo.",
      "🛒 Cargar productos, usuarios y pedidos al iniciar una aplicación.",
      "📊 Generar reportes combinando varias fuentes.",
    ],

    relacion: [
      "**`Promise.allSettled()`:** espera todas y nunca falla por un rechazo; devuelve el estado de cada una.",
      "**`Promise.race()`:** devuelve la primera promesa que termina, sea éxito o error.",
      "**`Promise.any()`:** devuelve la primera promesa que se resuelve.",
      "**`async/await`:** simplifica la sintaxis para consumir el resultado.",
      "**`fetch()`:** se combina con `Promise.all()` para lanzar varias peticiones HTTP.",
    ],

    analogia:
      "Organizas una fiesta 🎉 y necesitas comida, música y decoración. Puedes hacerlo todo tú en orden, o pedir ayuda a tres personas y decirles: «Todos hagan su tarea y avísenme cuando TODOS hayan terminado». Eso es `Promise.all()`. Pero si alguien dice «no pude hacerlo», la operación completa se considera fallida.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Ejecuta promesas en paralelo, no en secuencia.",
      "✅ Devuelve un array con los resultados en orden.",
      "❌ Si una promesa falla, todo el resultado falla.",
      "💡 Ideal para tareas independientes entre sí.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Cuándo se resuelve Promise.all()?",
        opciones: [
          "Cuando la primera promesa termina",
          "Cuando todas las promesas se resuelven",
          "Cuando una promesa falla",
          "Inmediatamente",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué pasa si una promesa del array se rechaza?",
        opciones: [
          "Se ignoran los errores",
          "Promise.all() se rechaza",
          "Devuelve null",
          "Se reintenta sola",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿En qué orden devuelve los resultados?",
        opciones: [
          "Según terminan",
          "En el orden original del iterable",
          "Alfabético",
          "Aleatorio",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué diferencia hay entre await secuencial y Promise.all()?",
        opciones: [
          "Ninguna",
          "Promise.all() ejecuta en paralelo",
          "await es más rápido siempre",
          "Promise.all() no acepta arrays",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Cuándo NO conviene usar Promise.all()?",
        opciones: [
          "Con tareas independientes",
          "Con tareas que dependen entre sí",
          "Con fetch",
          "Con arrays de promesas",
        ],
        correcta: 1,
      },
    ],
  },

  "promise-allsettled": {
    id: "promise-allsettled",
    titulo: "Promise.allSettled()",
    icon: "📋",
    categoria: "Promesas",
    firma: "Promise.allSettled(iterable)",
    simulador: "promesa",

    definicion: [
      "Es un método estático de `Promise` que espera a que **todas** las promesas terminen, sin importar si fueron exitosas o fallaron. 📋",
      "A diferencia de `Promise.all()`, **nunca se rechaza** por una promesa fallida.",
    ],

    queEs: [
      "Es una herramienta para manejar operaciones asíncronas cuando necesitas conocer el resultado individual de cada una. 🔍",
      "Siempre devuelve una promesa resuelta con un array de objetos de estado.",
    ],

    paraQueSirve: [
      "📤 Ejecutar varias tareas sin detener todo si una falla.",
      "✅ Saber cuáles operaciones tuvieron éxito y cuáles fallaron.",
      "🧩 Procesar resultados parciales.",
      "📊 Realizar cargas masivas y registrar errores sin interrumpir el flujo.",
    ],

    comoFunciona: [
      "Recibe un iterable de promesas.",
      "Ejecuta todas en paralelo.",
      "Espera a que todas finalicen, tanto si se resuelven como si se rechazan.",
      "Devuelve un array con un objeto por promesa, en el orden original.",
      "Cada objeto tiene `{ status: \"fulfilled\", value }` o `{ status: \"rejected\", reason }`.",
    ],

    sintaxis: [
      {
        code: `Promise.allSettled([promesa1, promesa2, promesa3])
  .then((resultados) => {
    console.log(resultados);
  });`,
      },
      {
        caption: "Resultado típico:",
        code: `[
  { status: "fulfilled", value: "OK" },
  { status: "rejected", reason: "Error de conexión" }
]`,
      },
      {
        caption: "Filtrar solo los exitosos:",
        code: `const exitosos = resultados.filter(
  (r) => r.status === "fulfilled"
);`,
      },
    ],

    nota: "💡 No devuelve directamente los valores: devuelve objetos con `status` y `value` o `reason`. Revisa el estado antes de acceder al resultado.",

    ejemplos: [
      {
        titulo: "1. ✅ Todas las promesas tienen éxito",
        code: `const p1 = Promise.resolve("Usuario cargado");
const p2 = Promise.resolve("Productos cargados");

Promise.allSettled([p1, p2]).then(console.log);
// [
//   { status: "fulfilled", value: "Usuario cargado" },
//   { status: "fulfilled", value: "Productos cargados" }
// ]`,
      },
      {
        titulo: "2. ❌ Una promesa falla",
        code: `const correcto = Promise.resolve("OK");
const error = Promise.reject("Error de conexión");

Promise.allSettled([correcto, error]).then(console.log);
// [
//   { status: "fulfilled", value: "OK" },
//   { status: "rejected", reason: "Error de conexión" }
// ]`,
      },
      {
        titulo: "3. 🔍 Procesar éxitos y errores",
        code: `const resultados = await Promise.allSettled([
  Promise.resolve("Archivo 1"),
  Promise.reject("Archivo 2 falló"),
]);

resultados.forEach((resultado) => {
  if (resultado.status === "fulfilled") {
    console.log("Éxito:", resultado.value);
  } else {
    console.log("Error:", resultado.reason);
  }
});`,
      },
    ],

    errores: [
      "**Pensar que funciona igual que `Promise.all()`:** aquí un rechazo no rompe el resultado global.",
      "**Buscar directamente el valor:** `resultado[0]` no es el valor, es el objeto de estado. Usa `resultado[0].value`.",
      "**Usarlo cuando necesitas detener todo al primer error:** para pagos o transacciones críticas puede ser mejor `Promise.all()`.",
      "**Olvidar que el orden se conserva:** los objetos están en el orden de las promesas originales, no en el orden en que terminaron.",
    ],

    casos: [
      "📤 Subir múltiples archivos y saber cuáles fallaron.",
      "📊 Generar reportes desde varias fuentes.",
      "🌐 Consultar varias APIs tolerando fallos parciales.",
      "🧪 Ejecutar pruebas automáticas y recopilar todos los resultados.",
    ],

    relacion: [
      "**`Promise.all()`:** espera todas, pero falla si una se rechaza.",
      "**`Promise.race()`:** devuelve la primera que termina.",
      "**`Promise.any()`:** devuelve la primera que se resuelve.",
      "**`async/await`:** permite esperar el array de estados de forma legible.",
    ],

    analogia:
      "Un profesor revisa los trabajos de cinco estudiantes. Con `Promise.all()` diría: «si un estudiante no entrega, no reviso ninguno». Con `Promise.allSettled()` dice: «reviso todos y luego te digo quién aprobó y quién no». 👨‍🎓 Juan aprobó, 👩‍🎓 Ana falló, 👨‍🎓 Luis aprobó. El profesor obtiene el informe completo.",

    fuente: "MDN Web Docs · ECMAScript Specification",

    notasPersonales: [
      "✅ Nunca se rechaza por una promesa rechazada.",
      "✅ Devuelve el estado de cada promesa.",
      "⚠️ No devuelve los valores directamente.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Cuándo se resuelve Promise.allSettled()?",
        opciones: [
          "Cuando la primera termina",
          "Cuando todas terminan, con éxito o error",
          "Solo si todas tienen éxito",
          "Inmediatamente",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué propiedad indica si una promesa se resolvió?",
        opciones: ["value", "status", "ok", "state"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué contiene un resultado rechazado?",
        opciones: [
          "{ status: \"rejected\", reason }",
          "{ status: \"rejected\", value }",
          "{ error: true }",
          "null",
        ],
        correcta: 0,
      },
      {
        id: 4,
        pregunta: "¿En qué se diferencia de Promise.all()?",
        opciones: [
          "No acepta arrays",
          "No se rechaza por una promesa fallida",
          "Es más rápido",
          "Solo acepta dos promesas",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Cómo obtienes solo los resultados exitosos?",
        opciones: [
          "resultados[0]",
          "resultados.filter(r => r.status === \"fulfilled\")",
          "resultados.value",
          "resultados.ok",
        ],
        correcta: 1,
      },
    ],
  },

  "promise-any": {
    id: "promise-any",
    titulo: "Promise.any()",
    icon: "🏆",
    categoria: "Promesas",
    firma: "Promise.any(iterable)",
    simulador: "promesa",

    definicion: [
      "Es un método estático de `Promise` que devuelve una promesa que se resuelve con el valor de la **primera promesa que se cumpla**, ignorando las rechazadas. 🏆",
      "Si **todas** las promesas se rechazan, se rechaza con un `AggregateError` que contiene todos los errores.",
    ],

    queEs: [
      "Es una incorporación de ES2021 que permite **competir** entre varias promesas con una estrategia optimista: quiero la primera que tenga éxito. 🎯",
      "Es el hermano optimista de `Promise.race()`: `race()` devuelve la primera que termine (éxito o error); `any()` devuelve la primera que **resuelva**.",
    ],

    paraQueSirve: [
      "🌐 Consultar varias fuentes y quedarse con la primera que responda.",
      "🚀 Descargar un archivo desde varias CDN y usar la más rápida.",
      "🧩 Probar varias estrategias y usar la primera que funcione.",
      "🛡️ Tolerar fallos: si un servicio no responde, probar con otro.",
    ],

    comoFunciona: [
      "Recibe un iterable de promesas y las ejecuta en paralelo.",
      "Espera a que al menos una se resuelva.",
      "Si una se resuelve, devuelve su valor e ignora los rechazos.",
      "Si una se rechaza, la ignora y sigue esperando a las demás.",
      "Si todas se rechazan, devuelve un `AggregateError` con la propiedad `errors`.",
      "Un iterable vacío también produce un `AggregateError`.",
    ],

    sintaxis: [
      {
        code: `Promise.any([promesa1, promesa2, promesa3])
  .then((resultado) => console.log(resultado))
  .catch((error) => {
    console.error(error);        // AggregateError
    console.error(error.errors); // array de errores
  });`,
      },
    ],

    nota: "💡 `Promise.any()` no cancela las demás promesas: siguen ejecutándose en segundo plano aunque ya tengas el primer resultado.",

    ejemplos: [
      {
        titulo: "1. 🏆 La primera que resuelve",
        code: `const p1 = new Promise((_, reject) =>
  setTimeout(() => reject("Error en p1"), 100)
);
const p2 = new Promise((resolve) =>
  setTimeout(() => resolve("Éxito en p2"), 200)
);
const p3 = new Promise((resolve) =>
  setTimeout(() => resolve("Éxito en p3"), 300)
);

Promise.any([p1, p2, p3]).then(console.log);
// "Éxito en p2" (p1 falló, pero fue ignorada)`,
      },
      {
        titulo: "2. ❌ Todas fallan",
        code: `const p1 = Promise.reject("Error 1");
const p2 = Promise.reject("Error 2");

Promise.any([p1, p2]).catch((error) => {
  console.log(error);        // AggregateError
  console.log(error.errors); // ["Error 1", "Error 2"]
});`,
      },
      {
        titulo: "3. 🌐 Múltiples servidores",
        code: `const servidores = [
  fetch("https://api1.ejemplo.com/datos"),
  fetch("https://api2.ejemplo.com/datos"),
  fetch("https://api3.ejemplo.com/datos"),
];

Promise.any(servidores)
  .then((respuesta) => respuesta.json())
  .catch((error) => console.error(error.errors));`,
      },
    ],

    errores: [
      "**Confundirlo con `Promise.race()`:** `race()` se rechaza si la primera en terminar falla; `any()` ignora los rechazos.",
      "**Creer que cancela las demás promesas:** no las cancela; siguen ejecutándose.",
      "**No manejar el caso en que todas fallan:** sin `.catch()` se produce un rechazo no controlado.",
      "**Usarlo cuando necesitas todas las respuestas:** `any()` solo entrega la primera exitosa; usa `Promise.all()`.",
      "**Pasar un array vacío:** se rechaza inmediatamente con `AggregateError`.",
    ],

    casos: [
      "🌍 Obtener datos de la CDN más rápida.",
      "🔐 Probar varios métodos de autenticación.",
      "🗄️ Sistema de caché con múltiples niveles.",
      "📡 Balanceo entre varios endpoints.",
    ],

    relacion: [
      "**`Promise.race()`:** primera en terminar, sea éxito o error.",
      "**`Promise.all()`:** todas deben resolverse.",
      "**`Promise.allSettled()`:** todas terminan y se conoce su estado.",
      "**`AggregateError`:** agrupa los errores cuando todas fallan.",
    ],

    analogia:
      "Es como un concurso de talentos: tres concursantes actúan en paralelo. El jurado espera a que al menos uno sea aprobado. Si un concursante es reprobado, lo ignora y sigue mirando a los demás. El primero que sea aprobado gana. Si todos son reprobados, el concurso se cancela con un `AggregateError`.",

    fuente: "MDN Web Docs · ECMAScript Specification · ES2021",

    notasPersonales: [
      "✅ Se resuelve con la primera promesa exitosa.",
      "✅ Ignora los rechazos mientras quede alguna promesa.",
      "✅ Usa `error.errors` para ver todos los fallos.",
      "⚠️ No cancela las promesas restantes.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Con qué valor se resuelve Promise.any()?",
        opciones: [
          "Con el primer rechazo",
          "Con el valor de la primera promesa que se resuelve",
          "Con un array de todos los valores",
          "Con undefined",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué ocurre si todas las promesas se rechazan?",
        opciones: [
          "Devuelve null",
          "Se rechaza con AggregateError",
          "Se resuelve con el primer error",
          "Se queda pendiente",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué diferencia hay entre any() y race()?",
        opciones: [
          "Ninguna",
          "any() ignora los rechazos; race() no",
          "race() solo acepta dos promesas",
          "any() es más antiguo",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Dónde están todos los errores de un AggregateError?",
        opciones: ["error.message", "error.errors", "error.reason", "error.value"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Promise.any([]) qué produce?",
        opciones: [
          "Un array vacío",
          "Un AggregateError",
          "undefined",
          "Un bucle infinito",
        ],
        correcta: 1,
      },
    ],
  },

  "promise-resolve": {
    id: "promise-resolve",
    titulo: "Promise.resolve()",
    icon: "✅",
    categoria: "Promesas",
    firma: "Promise.resolve(valor)",
    simulador: "promesa",

    definicion: [
      "Es un método estático que devuelve una promesa **ya resuelta** con el valor recibido. ✅",
      "Es una forma rápida de crear una promesa cumplida sin usar el constructor `new Promise()`.",
    ],

    queEs: [
      "Es un **factory method**: crea y retorna una promesa en estado `fulfilled`. 🏭",
      "Se usa para convertir un valor en promesa, iniciar cadenas `.then()` o normalizar APIs que aceptan valores y promesas.",
    ],

    paraQueSirve: [
      "🔄 Convertir un valor síncrono en una promesa resuelta.",
      "⛓️ Iniciar una cadena de `.then()` y `.catch()`.",
      "🧩 Normalizar valores que pueden o no ser promesas.",
      "🧪 Crear mocks de APIs en pruebas.",
      "📦 Proporcionar un valor por defecto en operaciones asíncronas.",
    ],

    comoFunciona: [
      "Si el valor no es una promesa, devuelve una promesa resuelta con ese valor.",
      "Si el valor ya es una promesa, la devuelve tal cual (sin envolverla de nuevo).",
      "Si el valor es un *thenable* (objeto con método `.then()`), lo convierte en promesa.",
      "`Promise.resolve(x)` equivale a `new Promise((resolve) => resolve(x))`.",
      "El `.then()` se ejecuta en la cola de microtareas, no de forma síncrona.",
    ],

    sintaxis: [
      {
        code: `Promise.resolve(valor).then((valor) => {
  console.log(valor);
});`,
      },
      {
        caption: "Equivalencia:",
        code: `// Estas dos formas son equivalentes
Promise.resolve(42);
new Promise((resolve) => resolve(42));`,
      },
    ],

    nota: "💡 `Promise.resolve(error)` crea una promesa **resuelta** con un error como valor, no una promesa rechazada. Para rechazar usa `Promise.reject(error)`.",

    ejemplos: [
      {
        titulo: "1. ✅ Resolver con un valor primitivo",
        code: `Promise.resolve(42).then((valor) => console.log(valor));
// 42

Promise.resolve("Hola Mundo").then(console.log);
// "Hola Mundo"`,
      },
      {
        titulo: "2. 📦 Resolver con un objeto",
        code: `const user = { id: 1, name: "Ana" };

Promise.resolve(user).then((data) => {
  console.log(data.name); // "Ana"
});`,
      },
      {
        titulo: "3. 🔁 Si ya es una promesa, la devuelve igual",
        code: `const original = new Promise((resolve) =>
  setTimeout(() => resolve("OK"), 1000)
);
const misma = Promise.resolve(original);

console.log(misma === original); // true`,
      },
      {
        titulo: "4. 🧪 Normalizar un valor que puede ser promesa",
        code: `function getData(source) {
  return Promise.resolve(source)
    .then((data) => processData(data))
    .catch((error) => console.error(error));
}`,
      },
      {
        titulo: "5. ⛓️ Iniciar una cadena de promesas",
        code: `Promise.resolve()
  .then(step1)
  .then(step2)
  .then(step3)
  .catch(handleError);`,
      },
    ],

    errores: [
      "**Usarlo innecesariamente en una función async:** el valor retornado ya se envuelve en una promesa.",
      "**Confundirlo con `Promise.reject()`:** `resolve` es para éxito; `reject` para errores.",
      "**Pasar un error como valor:** `Promise.resolve(error)` se resuelve, no se rechaza.",
      "**Olvidar los paréntesis:** `Promise.resolve().then(...)` es válido; `Promise.resolve.then(...)` no.",
      "**Asumir que es síncrono:** el `.then()` se ejecuta en la cola de microtareas.",
    ],

    casos: [
      "🧪 Crear mocks de APIs en tests.",
      "🧩 Normalizar funciones que aceptan valores o promesas.",
      "📦 Devolver valores por defecto en APIs asíncronas.",
      "⛓️ Iniciar una cadena de transformaciones.",
      "🗄️ Cachear promesas ya resueltas.",
    ],

    relacion: [
      "**`new Promise()`:** constructor base; `resolve()` es un atajo.",
      "**`Promise.reject()`:** versión gemela para promesas rechazadas.",
      "**`Promise.all()`:** normaliza los valores del iterable con `Promise.resolve()`.",
      "**`async/await`:** `await Promise.resolve(x)` equivale a `x`.",
      "**Microtareas:** los `.then()` de una promesa resuelta se ejecutan antes que los `setTimeout()`.",
    ],

    analogia:
      "Imagina que `Promise.resolve()` es enviar un paquete por correo certificado. Ya sea un objeto pequeño (valor) o un paquete grande (promesa), lo envuelves en el sistema de correos (promesa) y aseguras que llegará con seguimiento (`.then()`). Si ya está en el sistema, no lo reenvuelves: lo devuelves tal cual.",

    fuente: "MDN Web Docs · ECMAScript Specification · JavaScript.info",

    notasPersonales: [
      "✅ Crea una promesa resuelta al instante.",
      "✅ Si recibe una promesa, la devuelve sin cambios.",
      "✅ `.then()` se ejecuta en microtarea, antes que `setTimeout()`.",
      "⚠️ No rechaza: para eso existe `Promise.reject()`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué estado tiene la promesa que devuelve Promise.resolve()?",
        opciones: ["pending", "fulfilled", "rejected", "settled"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "Si pasas una promesa a Promise.resolve(), ¿qué devuelve?",
        opciones: [
          "Una nueva promesa que la envuelve",
          "La misma promesa",
          "null",
          "Un array",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué crea Promise.resolve(error)?",
        opciones: [
          "Una promesa rechazada",
          "Una promesa resuelta con el error como valor",
          "Un throw inmediato",
          "Un AggregateError",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Dónde se ejecuta el callback de .then()?",
        opciones: [
          "De forma síncrona",
          "En la cola de microtareas",
          "En la cola de macrotareas",
          "En el hilo principal bloqueado",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué método es la versión gemela para errores?",
        opciones: ["Promise.all()", "Promise.reject()", "Promise.any()", "Promise.race()"],
        correcta: 1,
      },
    ],
  },
};
