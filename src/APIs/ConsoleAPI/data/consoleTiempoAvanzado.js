export const CONSOLE_TIME_END = {
  id: "console-time-end",
  titulo: "console.timeEnd()",
  icon: "🏁",
  categoria: "Console API",
  firma: "console.timeEnd([label])",
  simulador: "tiempo-end",

  definicion: [
    "Es una función incorporada en JavaScript que detiene un temporizador iniciado con `console.time()`, calcula el **tiempo total transcurrido** en milisegundos e imprime el resultado final. 🏁",
    "Además de mostrar la marca final, libera la memoria que el temporizador usaba para mantener el rastreo. 🧠",
  ],

  queEs: [
    "Es el método de cierre del ecosistema de temporizadores del objeto global `console`. 🌐",
    "Su función es marcar el punto final de una medición de rendimiento. 🎯",
    "Al ejecutarse, destruye el temporizador asociado a esa etiqueta. 💥",
  ],

  paraQueSirve: [
    "🏁 **Finalizar mediciones de rendimiento:** concluir el rastreo de una función, algoritmo o petición asíncrona.",
    "📊 **Obtener el veredicto final:** imprimir de forma automática y formateada el tiempo total de ejecución.",
    "🧹 **Liberar recursos:** indicar al motor que ya no necesita seguir rastreando esa etiqueta.",
  ],

  comoFunciona: [
    "Al invocar `console.timeEnd('mi-etiqueta')`, el motor busca un temporizador activo con ese nombre exacto. ⚙️",
    "Toma el sello de tiempo actual y le resta el sello de tiempo en que se llamó a `console.time()`. 🧮",
    "Imprime el nombre de la etiqueta seguido del resultado, por ejemplo `mi-etiqueta: 14.52ms`. 🖥️",
    "Elimina el temporizador, por lo que la etiqueta queda libre para volver a usarse desde cero. 🔓",
  ],

  sintaxis: [
    {
      code: `console.timeEnd([label]);`,
    },
    {
      caption:
        "El label es opcional. Si se omite, intenta detener el temporizador \"default\":",
      code: `console.time("Tiempo de Empaquetado");
// ... código a medir
console.timeEnd("Tiempo de Empaquetado");
// Salida: Tiempo de Empaquetado: 12.34ms`,
    },
  ],

  nota: "💡 **Tip Pro:** en funciones asíncronas con `try...catch...finally`, coloca tu `console.timeEnd()` dentro del bloque `finally`. Así el temporizador se detiene tanto si la operación termina con éxito como si falla, y nunca queda colgado consumiendo memoria. 🛡️",

  ejemplos: [
    {
      titulo: "1. ⏱️ Medición básica de una función síncrona",
      code: `function empaquetarDatos() {
  console.time("⏱️ Tiempo de Empaquetado");

  const datos = Array.from({ length: 100000 }, (_, i) => \`Item \${i}\`);

  console.timeEnd("⏱️ Tiempo de Empaquetado");
  // Salida: ⏱️ Tiempo de Empaquetado: 12.34ms
}

empaquetarDatos();`,
    },
    {
      titulo: "2. 🌐 Uso correcto en promesas",
      code: `function descargarContenido() {
  console.time("Descarga-Video");

  fetch("https://api.example.com/video")
    .then(res => res.json())
    .then(() => {
      console.timeEnd("Descarga-Video");
      // Salida: Descarga-Video: 421.08ms
    })
    .catch(err => {
      // Buena práctica: cerrarlo también en caso de error
      console.timeEnd("Descarga-Video");
    });
}`,
    },
  ],

  errores: [
    "❓ **Etiqueta inexistente:** `console.timeEnd(\"ProcesoInexistente\")` muestra un mensaje de advertencia indicando que el temporizador no existe.",
    "🔠 **Confundir mayúsculas y minúsculas:** si inicias con `\"calculo\"` y cierras con `\"Calculo\"`, fallará.",
    "🔁 **Reutilizarlo sin reiniciar:** una segunda llamada a `console.timeEnd(\"T1\")` advierte porque el temporizador ya fue destruido.",
  ],

  casos: [
    "⚖️ **Benchmarking y pruebas de estrés:** comparar la velocidad de dos algoritmos de ordenamiento para elegir el más óptimo.",
    "🌐 **Auditorías de APIs en Node.js:** medir una petición de extremo a extremo para comprobar que cumple el SLA.",
  ],

  relacion: [
    "⏱️ **`console.time()`:** el disparador obligatorio que inicia el cronómetro en memoria.",
    "📍 **`console.timeLog()`:** permite mirar el reloj a mitad de camino sin destruirlo; `timeEnd()` toma la última lectura y lo elimina.",
    "⚡ **`performance.now()`:** alternativa de alta precisión cuando necesitas operar matemáticamente con los tiempos.",
  ],

  analogia:
    "El corredor arrancó cuando pulsaste el botón de inicio (`console.time()`). 🏃 Al cruzar la línea de meta, `console.timeEnd()` es presionar con fuerza el botón STOP del cronómetro, leer la marca final en voz alta y reiniciar las manecillas a cero. La carrera ha terminado oficialmente. 🏁",

  fuente: "📚 MDN Web Docs — console.timeEnd()",

  notasPersonales: [
    "💡 **Tip Pro:** ciérralo en `finally` para no dejar temporizadores colgados.",
    "🏷️ **Etiqueta exacta:** debe coincidir con la de `console.time()`.",
    "🧹 **Un solo cierre:** cada `timeEnd()` destruye el temporizador.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Qué hace console.timeEnd() con el temporizador?",
      opciones: [
        "Lo pausa y lo reanuda",
        "Lo detiene, muestra el total y lo destruye",
        "Lo reinicia automáticamente",
        "Lo mantiene activo",
      ],
      correcta: 1,
    },
    {
      id: 2,
      pregunta: "¿Qué ocurre si la etiqueta no coincide con la de console.time()?",
      opciones: [
        "Se usa la etiqueta más parecida",
        "Se muestra una advertencia porque no se encuentra",
        "Se mide desde el inicio de la página",
        "Se crea un temporizador nuevo",
      ],
      correcta: 1,
    },
    {
      id: 3,
      pregunta: "¿Dónde conviene colocar timeEnd() en un try...catch?",
      opciones: [
        "Solo en el try",
        "Solo en el catch",
        "En el bloque finally",
        "Fuera de la función",
      ],
      correcta: 2,
    },
  ],
};

export const CONSOLE_TIME_STAMP = {
  id: "console-time-stamp",
  titulo: "console.timeStamp()",
  icon: "📌",
  categoria: "Console API",
  firma: "console.timeStamp([label])",
  simulador: "timestamp",

  definicion: [
    "Es una función **no estándar** incorporada en JavaScript que agrega una marca de tiempo visual al registro de las herramientas de rendimiento y perfilado del navegador. 📌",
    "Su salida vive en la pestaña **Performance / Profiler**, no en la consola estándar. 🎬",
  ],

  queEs: [
    "Es un método de diagnóstico avanzado del objeto global `console`. 🌐",
    "A diferencia de otros métodos que imprimen texto en la pestaña Console, trabaja con la pestaña Performance. 📊",
    "Inyecta un marcador exacto en la línea de tiempo de ejecución de la página. 📍",
  ],

  paraQueSirve: [
    "🎯 **Sincronizar eventos de código con eventos del navegador:** identificar en qué punto de la carga se ejecutó una función.",
    "🎨 **Depuración visual de rendimiento:** crear marcas de referencia en las gráficas de rendimiento para aislar comportamientos pesados.",
    "🎮 **Analizar animaciones y juegos:** marcar frames concretos donde ocurren cálculos de colisiones o físicas.",
  ],

  comoFunciona: [
    "El navegador debe estar grabando actividad en la pestaña **Performance**. 🔴",
    "Al ejecutar `console.timeStamp('Evento X')`, el navegador genera una marca con el milisegundo exacto de la sesión. ⚙️",
    "Añade una línea vertical o un marcador con forma de bandera en la línea de tiempo del Profiler. 🚩",
    "Al pasar el cursor sobre la marca se muestra el nombre asignado. 🖱️",
  ],

  sintaxis: [
    {
      code: `console.timeStamp([label]);`,
    },
    {
      caption: "El label es opcional y da nombre a la marca de tiempo:",
      code: `console.timeStamp("📊 Inicio Render Gráfico");
console.timeStamp(); // el navegador asigna un nombre genérico`,
    },
  ],

  nota: "💡 **Tip Pro:** en Chrome abre DevTools → Performance → Record, interactúa con la función que contiene `console.timeStamp()`, detén la grabación y expande la sección **Timings**. Ahí verás tus marcas alineadas con las tareas de la CPU. ⛏️",

  ejemplos: [
    {
      titulo: "1. 📊 Marcar el inicio de un renderizado crítico",
      code: `function renderizarGraficoComplejo() {
  // La marca aparecerá en la gráfica de rendimiento del navegador
  console.timeStamp("📊 Inicio Render Gráfico");

  // Lógica pesada que interactúa con el DOM...
  for (let i = 0; i < 50000; i++) {
    // Manipulación o cálculo...
  }
}

renderizarGraficoComplejo();`,
    },
    {
      titulo: "2. 🌐 Marcar la respuesta de una petición",
      code: `async function cargarDatos() {
  console.timeStamp("🌐 Inicio petición");

  const respuesta = await fetch("/api/datos");
  await respuesta.json();

  console.timeStamp("✅ Respuesta recibida");
}

cargarDatos();`,
    },
  ],

  errores: [
    "👀 **Esperar ver algo en la consola estándar:** `console.timeStamp(\"Hola\")` no imprime nada en la pestaña Console; su salida es exclusivamente gráfica.",
    "⚠️ **Asumir que es un estándar formal:** la mayoría de navegadores la soportan, pero no forma parte estricta del estándar W3C/WHATWG y su comportamiento puede variar.",
    "🖥️ **Usarlo en Node.js:** en backend no hace nada o es un método vacío (*noop*).",
  ],

  casos: [
    "⚡ **Optimización de Core Web Vitals:** identificar si scripts pesados bloquean el hilo principal durante FCP o LCP.",
    "🎮 **Videojuegos web y animaciones:** marcar el frame exacto donde se ejecutan colisiones o cálculos físicos pesados.",
  ],

  relacion: [
    "📊 **Pestaña Performance (DevTools):** panel dedicado a grabar y analizar velocidad de carga, CPU y memoria.",
    "📍 **`performance.mark()`:** método moderno y estándar que además guarda la marca en memoria para hacer cálculos posteriores.",
    "🏁 **`console.time()` / `console.timeEnd()`:** miden tiempo y lo imprimen en la consola; `timeStamp()` solo marca la línea de tiempo.",
  ],

  analogia:
    "Estás grabando una película de acción con una cámara profesional (Performance). 🎬 `console.log()` sería escribir una nota en un papel; `console.timeStamp()` es usar la claqueta y dar el golpe frente a la cámara. No detiene la filmación, pero deja una señal grabada en la cinta para que el editor sincronice todo después. 🚩",

  fuente: "📚 MDN Web Docs — console.timeStamp()",

  notasPersonales: [
    "💡 **Tip Pro:** usa nombres descriptivos y en pares (inicio / fin).",
    "🔴 **Recuerda:** sin grabación activa de Performance no se ve nada.",
    "🖥️ **En Node.js** el método no produce salida.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Dónde se ve la salida de console.timeStamp()?",
      opciones: [
        "En la pestaña Console",
        "En la pestaña Performance / Profiler",
        "En el HTML de la página",
        "En la pestaña Network",
      ],
      correcta: 1,
    },
    {
      id: 2,
      pregunta: "¿Qué ocurre si no hay una grabación de rendimiento activa?",
      opciones: [
        "Se imprime en consola",
        "No muestra ninguna salida visual",
        "Lanza un error fatal",
        "Se guarda en localStorage",
      ],
      correcta: 1,
    },
    {
      id: 3,
      pregunta: "¿Qué alternativa moderna y estándar permite guardar marcas para cálculos?",
      opciones: [
        "performance.mark()",
        "console.table()",
        "console.count()",
        "console.clear()",
      ],
      correcta: 0,
    },
  ],
};
