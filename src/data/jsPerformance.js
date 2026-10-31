export const JS_PERFORMANCE = {
  id: "rendimiento",
  label: "Rendimiento",
  icon: "⚡",
  titulo: "Performance API",
  descripcion:
    "Mide con precisión sub-milisegundo cuánto tarda tu código. Reloj monotónico, marcas y medidas visibles en las DevTools.",
  grupos: [
    {
      seccion: "Medición de tiempo",
      metodos: [
        {
          id: "performance-now",
          nombre: "performance.now()",
          firma: "performance.now() → number",
          icon: "⏱️",
        },
      ],
    },
    {
      seccion: "Marcas temporales",
      metodos: [
        {
          id: "performance-mark",
          nombre: "performance.mark()",
          firma: "performance.mark(nombre, opciones)",
          icon: "📍",
        },
        {
          id: "performance-measure",
          nombre: "performance.measure()",
          firma: "performance.measure(nombre, inicio, fin)",
          icon: "📏",
        },
      ],
    },
  ],
};

export const JS_PERFORMANCE_DOCS = {
  "performance-now": {
    id: "performance-now",
    titulo: "performance.now()",
    icon: "⏱️",
    categoria: "Performance API · Tiempo",
    firma: "performance.now() → number",
    simulador: "performance",

    definicion: [
      "Es un método de la **Performance API** que devuelve un timestamp de alta resolución en milisegundos, con decimales, medido desde el **`timeOrigin`** del contexto de navegación. ⏱️",
      "No sirve para saber la hora: es un reloj pensado exclusivamente para medir duraciones.",
    ],

    queEs: [
      "Es un **reloj monotónico**: nunca retrocede, aunque el usuario cambie la hora del sistema. 🕰️",
      "Devuelve decimales, así que permite medir fracciones de milisegundo.",
      "Su origen (`0`) es el momento en que se cargó el documento, no el 1 de enero de 1970.",
      "Es la alternativa precisa a `Date.now()` para benchmarking.",
    ],

    paraQueSirve: [
      "⏱️ Medir el tiempo de ejecución de una función.",
      "📊 Hacer benchmarking de algoritmos y comparar implementaciones.",
      "🎮 Calcular delta time y FPS en animaciones y juegos.",
      "🔍 Detectar cuellos de botella en secciones concretas.",
      "🌐 Medir la latencia de operaciones asíncronas.",
      "🧪 Instrumentar código de producción sin depender de la hora real.",
      "🎬 Sincronizar animaciones con `requestAnimationFrame`.",
      "📈 Alimentar métricas propias de rendimiento.",
    ],

    comoFunciona: [
      "Al cargar la página, el navegador fija un `timeOrigin` (visible en `performance.timeOrigin`).",
      "`performance.now()` devuelve los milisegundos transcurridos desde ese origen.",
      "El valor incluye decimales con precisión sub-milisegundo.",
      "Es monotónico: dos llamadas seguidas nunca devuelven un valor menor.",
      "Por seguridad (mitigación de Spectre), los navegadores pueden reducir la precisión a 100 µs o 1 ms.",
      "No se ve afectado por cambios de hora, zona horaria ni ajustes del sistema.",
    ],

    sintaxis: [
      {
        code: `const t = performance.now();`,
      },
      {
        caption: "Medir un bloque de código:",
        code: `const inicio = performance.now();

for (let i = 0; i < 1_000_000; i++) {
  // trabajo a medir
}

const fin = performance.now();
console.log("Tardó", (fin - inicio).toFixed(3), "ms");`,
      },
      {
        caption: "Wrapper reutilizable:",
        code: `function medir(nombre, fn) {
  const inicio = performance.now();
  const resultado = fn();
  const fin = performance.now();
  console.log(nombre + ": " + (fin - inicio).toFixed(3) + " ms");
  return resultado;
}

medir("ordenar", () => [3, 1, 2].sort());`,
      },
    ],

    nota: "💡 `performance.now()` mide desde que se cargó la página, no desde 1970. Para fechas usa `Date.now()`; para duraciones, `performance.now()`.",

    ejemplos: [
      {
        titulo: "1. ⏱️ Medir una función síncrona",
        code: `const inicio = performance.now();

const datos = Array.from({ length: 100_000 }, (_, i) => i);
datos.sort((a, b) => b - a);

const fin = performance.now();
console.log("Ordenación:", (fin - inicio).toFixed(3), "ms");`,
      },
      {
        titulo: "2. 🌐 Medir código asíncrono",
        code: `async function medirAsync(nombre, fn) {
  const inicio = performance.now();
  const resultado = await fn();
  const fin = performance.now();
  console.log(nombre + ": " + (fin - inicio).toFixed(3) + " ms");
  return resultado;
}

await medirAsync("fetch", () => fetch("/api/datos"));`,
      },
      {
        titulo: "3. 🎮 Delta time en una animación",
        code: `let anterior = performance.now();

function animar(ahora) {
  const dt = (ahora - anterior) / 1000; // segundos
  anterior = ahora;

  posicion += velocidad * dt; // independiente del framerate
  requestAnimationFrame(animar);
}

requestAnimationFrame(animar);`,
      },
      {
        titulo: "4. 📊 Calcular FPS",
        code: `let ultimo = performance.now();
let frames = 0;

function loop(ahora) {
  frames++;

  if (ahora - ultimo >= 1000) {
    console.log(frames + " FPS");
    frames = 0;
    ultimo = ahora;
  }

  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);`,
      },
      {
        titulo: "5. 🔍 Comparar dos implementaciones",
        code: `function benchmark(nombre, fn, veces = 1000) {
  const inicio = performance.now();
  for (let i = 0; i < veces; i++) fn();
  const total = performance.now() - inicio;
  console.log(nombre + ": " + (total / veces).toFixed(4) + " ms/op");
}

benchmark("push", () => { const a = []; a.push(1); });
benchmark("spread", () => { const a = []; const b = [...a, 1]; });`,
      },
    ],

    errores: [
      "**Usarlo para mostrar la fecha:** devuelve milisegundos desde la carga de la página, no desde 1970.",
      "**Compararlo entre pestañas:** cada contexto tiene su propio `timeOrigin`.",
      "**Asumir precisión infinita:** el navegador puede limitarla por seguridad.",
      "**Redondear a enteros sin querer:** usa `toFixed(3)` para conservar los decimales.",
      "**Medir código demasiado corto una sola vez:** el ruido domina; repite en bucle.",
      "**Confundir `timeOrigin` con `now()`:** `timeOrigin` es el instante base; `now()` el tiempo transcurrido.",
    ],

    casos: [
      "⏱️ Benchmarking de algoritmos de ordenación.",
      "🎮 Bucles de animación y cálculo de FPS.",
      "🌐 Medición de latencia de `fetch()`.",
      "🧪 Tests de rendimiento automatizados.",
      "🔍 Perfilar funciones concretas en producción.",
      "📈 Métricas de tiempo hasta interactuar.",
    ],

    relacion: [
      "**`Date.now()`:** reloj de pared en milisegundos enteros; puede retroceder.",
      "**`performance.timeOrigin`:** instante base desde el que cuenta `now()`.",
      "**`performance.mark()`:** guarda un instante con nombre en el timeline.",
      "**`performance.measure()`:** calcula la diferencia entre dos marcas.",
      "**`requestAnimationFrame()`:** entrega un timestamp compatible para animaciones.",
      "**`console.time()`:** alternativa rápida para depurar, menos precisa y no exportable.",
    ],

    analogia:
      "Imagina un cronómetro de laboratorio 🧪 que se pone a cero justo cuando abres el libro. `performance.now()` te dice cuántos milisegundos han pasado desde entonces, con decimales y sin saltar nunca hacia atrás aunque alguien mueva el reloj de la pared. `Date.now()` sería mirar la hora del reloj de la calle: sirve para saber qué hora es, pero no para cronometrar con precisión.",

    fuente: "MDN Web Docs · Performance API · High Resolution Time",

    notasPersonales: [
      "✅ Devuelve milisegundos con decimales desde `timeOrigin`.",
      "✅ Es monotónico: nunca retrocede.",
      "⚠️ No sirve para obtener la fecha ni la hora actual.",
      "✅ Ideal para benchmark y animaciones; usa `Date.now()` para fechas.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Desde qué momento mide performance.now()?",
        opciones: [
          "Desde el 1 de enero de 1970",
          "Desde que se cargó el contexto de navegación (timeOrigin)",
          "Desde el último reinicio del sistema",
          "Desde que se abrió la consola",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué significa que performance.now() sea monotónico?",
        opciones: [
          "Que devuelve siempre enteros",
          "Que nunca retrocede",
          "Que solo funciona en Chrome",
          "Que mide en segundos",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve performance.now()?",
        opciones: [
          "Una fecha completa",
          "Milisegundos con decimales",
          "Segundos enteros",
          "Una promesa",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Para qué NO sirve performance.now()?",
        opciones: [
          "Medir una función",
          "Calcular FPS",
          "Obtener la fecha actual",
          "Medir latencia",
        ],
        correcta: 2,
      },
      {
        id: 5,
        pregunta: "¿Qué diferencia principal tiene con Date.now()?",
        opciones: [
          "Date.now() es más preciso",
          "performance.now() es monotónico y con decimales",
          "Son exactamente iguales",
          "performance.now() devuelve una cadena",
        ],
        correcta: 1,
      },
    ],
  },

  "performance-mark": {
    id: "performance-mark",
    titulo: "performance.mark()",
    icon: "📍",
    categoria: "Performance API · Marcas",
    firma: "performance.mark(nombre, opciones)",
    simulador: "performance",

    definicion: [
      "Es un método de la **Performance API** que crea una marca temporal con nombre en el **performance timeline** del navegador. 📍",
      "Es como poner un post-it con hora en un punto exacto de la ejecución, para medir después el intervalo entre dos post-its.",
    ],

    queEs: [
      "Registra la marca en el timeline del navegador, no solo en una variable. 🗂️",
      "Permite verla en las DevTools (pestaña Performance) y observarla con `PerformanceObserver`.",
      "Cada marca es un objeto `PerformanceMark` con `name`, `entryType: \"mark\"`, `startTime`, `duration: 0` y `detail` opcional.",
      "Es la forma estándar y profesional de instrumentar código.",
    ],

    paraQueSirve: [
      "📍 Marcar puntos clave de la ejecución.",
      "📏 Servir de base para `performance.measure()`.",
      "🖥️ Ver las marcas en la pestaña Performance de DevTools.",
      "🧪 Instrumentar código de producción de forma estructurada.",
      "👀 Analizar marcas en tiempo real con `PerformanceObserver`.",
      "🧩 Medir fases separadas: inicio, carga, render y fin.",
    ],

    comoFunciona: [
      "Recibe un `nombre` (string) que identifica la marca.",
      "Opcionalmente recibe `{ detail: ... }` con datos serializables adjuntos.",
      "Crea un `PerformanceMark` con `startTime` igual a `performance.now()` en ese instante.",
      "Guarda la marca en el performance timeline del navegador.",
      "Se consulta con `getEntriesByName()`, `getEntriesByType(\"mark\")` o `PerformanceObserver`.",
      "No devuelve nada (`undefined`).",
    ],

    sintaxis: [
      {
        code: `performance.mark("inicio");`,
      },
      {
        caption: "Con datos adjuntos:",
        code: `performance.mark("inicio", {
  detail: { usuario: "ana", modulo: "checkout" },
});`,
      },
      {
        caption: "Marcar y medir entre marcas:",
        code: `performance.mark("inicio");
// ... trabajo ...
performance.mark("fin");

performance.measure("mi-operacion", "inicio", "fin");

const [medida] = performance.getEntriesByName("mi-operacion");
console.log(medida.duration.toFixed(3) + " ms");`,
      },
    ],

    nota: "💡 Repetir el mismo nombre de marca **acumula** varias entradas con ese nombre. Límpialas con `performance.clearMarks()` cuando ya no las necesites.",

    ejemplos: [
      {
        titulo: "1. 📍 Marca simple",
        code: `performance.mark("inicio");
// ... código a medir ...
performance.mark("fin");`,
      },
      {
        titulo: "2. 📏 Medir entre marcas",
        code: `performance.mark("inicio");

for (let i = 0; i < 1_000_000; i++) {
  // trabajo
}

performance.mark("fin");
performance.measure("mi-loop", "inicio", "fin");

const [medida] = performance.getEntriesByName("mi-loop");
console.log(medida.duration.toFixed(3) + " ms");`,
      },
      {
        titulo: "3. 🧩 Múltiples fases",
        code: `performance.mark("app:inicio");
// cargar configuración
performance.mark("app:config-lista");
// cargar usuario
performance.mark("app:usuario-listo");
// render
performance.mark("app:render-listo");

performance.measure("config", "app:inicio", "app:config-lista");
performance.measure("usuario", "app:config-lista", "app:usuario-listo");
performance.measure("render", "app:usuario-listo", "app:render-listo");`,
      },
      {
        titulo: "4. 👀 Observar marcas en tiempo real",
        code: `const observer = new PerformanceObserver((lista) => {
  for (const entrada of lista.getEntries()) {
    console.log("Marca:", entrada.name, "en", entrada.startTime.toFixed(1));
  }
});

observer.observe({ entryTypes: ["mark"] });
performance.mark("demo");`,
      },
      {
        titulo: "5. 🧹 Limpiar marcas",
        code: `performance.clearMarks("inicio"); // una marca concreta
performance.clearMarks();           // todas las marcas`,
      },
    ],

    errores: [
      "**Esperar que devuelva algo:** devuelve `undefined`.",
      "**Creer que mide:** solo marca un instante; la duración se obtiene con `measure()`.",
      "**Reutilizar nombres sin limpiar:** las marcas se acumulan.",
      "**Guardar datos no serializables en `detail`:** puede fallar.",
      "**Confundir `mark` con `measure`:** el primero es un punto, el segundo un intervalo.",
      "**Olvidar que `duration` es 0:** una marca no tiene duración propia.",
    ],

    casos: [
      "📊 Instrumentar fases de arranque de una app.",
      "🖥️ Analizar el rendimiento en DevTools.",
      "🧪 Benchmarking estructurado por etapas.",
      "🎯 Medir el tiempo hasta el primer render.",
      "🔍 Detectar qué fase concreta es lenta.",
      "📈 Enviar marcas a un sistema de analytics.",
    ],

    relacion: [
      "**`performance.now()`:** obtiene el timestamp que usa la marca internamente.",
      "**`performance.measure()`:** calcula la duración entre dos marcas.",
      "**`PerformanceObserver`:** recibe las marcas en cuanto se crean.",
      "**`performance.getEntriesByType(\"mark\")`:** lista todas las marcas.",
      "**`performance.clearMarks()`:** elimina marcas del timeline.",
      "**`performance.mark()` vs `console.time()`:** la marca es observable y exportable; `console.time()` no.",
    ],

    analogia:
      "Es como colocar post-its con hora 🗒️ en un proceso de fabricación: uno al empezar, otro al terminar la pieza y otro al pintarla. Los post-its no dicen cuánto tardó nada por sí solos, pero cuando llega el inspector (`measure()`) puede calcular la diferencia entre dos de ellos. Y si dejas post-its viejos pegados, se acumulan: conviene retirarlos con `clearMarks()`.",

    fuente: "MDN Web Docs · Performance API · User Timing",

    notasPersonales: [
      "✅ Crea una entrada `PerformanceMark` en el timeline.",
      "✅ `duration` siempre es `0`; el nombre se puede repetir.",
      "⚠️ No devuelve nada: usa `measure()` para obtener duraciones.",
      "✅ Ideal para instrumentar fases y verlas en DevTools.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué crea performance.mark()?",
        opciones: [
          "Una medida con duración",
          "Una marca temporal con nombre en el timeline",
          "Una promesa",
          "Un temporizador",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Cuánto vale la propiedad duration de una marca?",
        opciones: ["0", "100", "Depende de la marca", "null"],
        correcta: 0,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve performance.mark()?",
        opciones: ["El timestamp", "Un objeto PerformanceMark", "undefined", "true"],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Qué ocurre si repites el mismo nombre de marca?",
        opciones: [
          "Se sobrescribe",
          "Se acumulan varias marcas con ese nombre",
          "Lanza un error",
          "Se ignora la segunda",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Con qué método se calcula la duración entre dos marcas?",
        opciones: [
          "performance.now()",
          "performance.measure()",
          "performance.mark()",
          "performance.clearMarks()",
        ],
        correcta: 1,
      },
    ],
  },

  "performance-measure": {
    id: "performance-measure",
    titulo: "performance.measure()",
    icon: "📏",
    categoria: "Performance API · Medidas",
    firma: "performance.measure(nombre, inicio, fin)",
    simulador: "performance",

    definicion: [
      "Es un método de la **Performance API** que calcula la duración entre dos marcas creadas con `performance.mark()` y registra esa medición en el timeline con un nombre propio. 📏",
      "Es el complemento directo de `mark()`: mientras una marca es un punto, una medida es un intervalo.",
    ],

    queEs: [
      "Crea una entrada `PerformanceMeasure` con `entryType: \"measure\"`, `startTime` y `duration`. 📐",
      "Registra la medición, así que se puede ver en DevTools, observar con `PerformanceObserver` y consultar con `getEntriesByName()`.",
      "Permite medir entre marcas propias o entre marcas del navegador como `navigationStart`.",
      "No devuelve nada y no modifica las marcas originales.",
    ],

    paraQueSirve: [
      "📏 Medir la duración entre dos marcas.",
      "🧩 Instrumentar fases de la aplicación: carga, render, fetch.",
      "🖥️ Ver las mediciones en la pestaña Performance de DevTools.",
      "👀 Analizarlas en tiempo real con `PerformanceObserver`.",
      "📈 Medir Core Web Vitals personalizados.",
      "🔍 Detectar cuellos de botella entre etapas.",
      "🌐 Medir la latencia de operaciones asíncronas.",
    ],

    comoFunciona: [
      "Recibe un `nombre` y, opcionalmente, la marca de inicio y la de fin.",
      "Calcula `startTime` a partir de la marca inicial y `duration` como la diferencia con la final.",
      "Si se omite la marca final, mide desde la inicial hasta ahora.",
      "Si se omiten ambas, mide desde `navigationStart` hasta ahora.",
      "Crea una entrada `PerformanceMeasure` y la guarda en el timeline.",
      "No devuelve nada (`undefined`).",
    ],

    sintaxis: [
      {
        code: `performance.measure(nombre, marcaInicio, marcaFin);`,
      },
      {
        caption: "Entre dos marcas:",
        code: `performance.mark("inicio");
// ... trabajo ...
performance.mark("fin");

performance.measure("mi-operacion", "inicio", "fin");`,
      },
      {
        caption: "Desde una marca hasta ahora:",
        code: `performance.mark("inicio");

setTimeout(() => {
  performance.measure("espera", "inicio");
  const [m] = performance.getEntriesByName("espera");
  console.log(m.duration.toFixed(2) + " ms");
}, 500);`,
      },
      {
        caption: "Con objeto de opciones:",
        code: `performance.measure("total", {
  start: "inicio",
  end: "fin",
  detail: { pagina: "checkout" },
});`,
      },
    ],

    nota: "💡 `measure(nombre)` sin marcas mide desde `navigationStart` hasta ahora. Es útil para saber cuánto tardó la página en llegar a un punto concreto.",

    ejemplos: [
      {
        titulo: "1. 📏 Medir entre dos marcas",
        code: `performance.mark("inicio");

for (let i = 0; i < 1_000_000; i++) {
  // trabajo
}

performance.mark("fin");
performance.measure("mi-loop", "inicio", "fin");

const [m] = performance.getEntriesByName("mi-loop");
console.log(m.duration.toFixed(3) + " ms");`,
      },
      {
        titulo: "2. ⏳ Medir una espera asíncrona",
        code: `performance.mark("inicio");

setTimeout(() => {
  performance.measure("espera", "inicio");
  const [m] = performance.getEntriesByName("espera");
  console.log("Esperó " + m.duration.toFixed(2) + " ms");
}, 500);`,
      },
      {
        titulo: "3. 🚀 Medir desde el inicio de la navegación",
        code: `performance.measure("hasta-ahora");
const [m] = performance.getEntriesByName("hasta-ahora");
console.log(m.duration.toFixed(2) + " ms desde navigationStart");`,
      },
      {
        titulo: "4. 🧩 Medir varias fases",
        code: `performance.mark("app:inicio");
performance.mark("app:config-lista");
performance.mark("app:render-listo");

performance.measure("config", "app:inicio", "app:config-lista");
performance.measure("render", "app:config-lista", "app:render-listo");

performance.getEntriesByType("measure").forEach((m) => {
  console.log(m.name + ": " + m.duration.toFixed(2) + " ms");
});`,
      },
      {
        titulo: "5. 👀 Observar medidas",
        code: `const observer = new PerformanceObserver((lista) => {
  for (const m of lista.getEntries()) {
    console.log(m.name, m.duration.toFixed(2) + " ms");
  }
});

observer.observe({ entryTypes: ["measure"] });`,
      },
    ],

    errores: [
      "**Esperar que devuelva la duración:** devuelve `undefined`; hay que leerla de la entrada.",
      "**Usar una marca inexistente:** no hay medición válida.",
      "**Olvidar crear las marcas:** `measure()` no crea puntos por sí solo.",
      "**Confundir `measure` con `mark`:** `measure` no marca un instante, mide un intervalo.",
      "**No limpiar las medidas:** se acumulan en el timeline.",
      "**Asumir que `duration` está en segundos:** está en milisegundos.",
    ],

    casos: [
      "📊 Medir el tiempo de carga de una vista.",
      "🧩 Comparar fases de un proceso de checkout.",
      "🎯 Medir el tiempo hasta el primer render.",
      "🌐 Cronometrar una petición y su renderizado.",
      "🔍 Detectar qué etapa de la app es más lenta.",
      "📈 Reportar métricas personalizadas a analytics.",
    ],

    relacion: [
      "**`performance.mark()`:** crea los puntos que mide `measure()`.",
      "**`performance.now()`:** base de los timestamps.",
      "**`performance.getEntriesByName()`:** obtiene la medida por nombre.",
      "**`performance.clearMeasures()`:** elimina medidas del timeline.",
      "**`PerformanceObserver`:** recibe las medidas al crearse.",
      "**`navigationStart`:** marca del navegador disponible para medir desde el inicio.",
    ],

    analogia:
      "Si `mark()` son post-its con hora 🗒️, `measure()` es la cinta métrica 📏 que el inspector tiende entre dos post-its y anota el resultado en su libreta. La cinta no cambia los post-its: solo registra cuánto hay entre ellos. Y si no le das el segundo post-it, mide desde el primero hasta el momento actual.",

    fuente: "MDN Web Docs · Performance API · User Timing",

    notasPersonales: [
      "✅ Calcula `startTime` y `duration` entre dos marcas.",
      "✅ Sin marcas, mide desde `navigationStart` hasta ahora.",
      "⚠️ Devuelve `undefined`; lee la duración con `getEntriesByName()`.",
      "✅ Visible en DevTools y con `PerformanceObserver`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué calcula performance.measure()?",
        opciones: [
          "Una marca temporal",
          "La duración entre dos marcas",
          "El uso de memoria",
          "Los FPS",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve performance.measure()?",
        opciones: ["La duración", "Un objeto con startTime", "undefined", "Una promesa"],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿Qué mide measure(nombre) sin marcas?",
        opciones: [
          "Nada",
          "Desde navigationStart hasta ahora",
          "Entre la primera y la última marca",
          "Desde 1970",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Dónde se consulta una medida por su nombre?",
        opciones: [
          "performance.getEntriesByName()",
          "performance.now()",
          "performance.mark()",
          "console.time()",
        ],
        correcta: 0,
      },
      {
        id: 5,
        pregunta: "¿En qué unidad está duration?",
        opciones: ["Segundos", "Milisegundos", "Bytes", "Frames"],
        correcta: 1,
      },
    ],
  },
};
