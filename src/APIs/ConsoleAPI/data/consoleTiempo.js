export const CONSOLE_TIME = {
  id: "console-time",
  titulo: "console.time()",
  icon: "⏱️",
  categoria: "Console API",
  firma: "console.time([label])",
  simulador: "tiempo",

  definicion: [
    "Es una función incorporada en JavaScript que inicia un **temporizador** en la consola de depuración. ⏱️",
    "Sirve para medir con precisión cuánto tarda en ejecutarse un bloque de código específico. 🎯",
  ],

  queEs: [
    "Es un método de rendimiento del objeto global `console`. 🌐",
    "Trabaja en equipo con `console.timeEnd()` para calcular la diferencia de tiempo en milisegundos. 🤝",
    "Ayuda a identificar cuellos de botella en el rendimiento del código. 🧠",
  ],

  paraQueSirve: [
    "📊 **Medición de rendimiento (profiling):** saber cuántos milisegundos tarda un algoritmo, una petición o un renderizado.",
    "⚡ **Optimizar código:** comparar dos enfoques, como un bucle `for` clásico frente a `.map()`.",
    "🌐 **Monitorear tareas asíncronas:** medir el tiempo de respuesta de una API o una consulta a la base de datos.",
  ],

  comoFunciona: [
    "Cuando el motor lee `console.time('nombre')`, registra el milisegundo exacto bajo esa etiqueta. ⚙️",
    "El temporizador corre en segundo plano sin detener ni retrasar el programa. 🏃",
    "Para detenerlo se llama a `console.timeEnd('nombre')` con la **misma etiqueta**. 🛑",
    "La consola imprime el nombre de la etiqueta seguido del tiempo transcurrido en milisegundos. 🖥️",
  ],

  sintaxis: [
    {
      code: `console.time([label]);`,
    },
    {
      caption: "La etiqueta es opcional; si se omite se usa \"default\":",
      code: `console.time("Bucle de prueba");
// ... código a medir
console.timeEnd("Bucle de prueba");`,
    },
  ],

  nota: "💡 **Tip Pro:** puedes tener varios temporizadores corriendo a la vez si usas etiquetas diferentes. Por ejemplo, `console.time(\"Carga total\")` y dentro sub-temporizadores como `console.time(\"Paso 1\")`. Obtendrás un mapa de rendimiento completo.",

  ejemplos: [
    {
      titulo: "1. 🔁 Medir el rendimiento de un bucle pesado",
      code: `console.time("Bucle de prueba");

const arr = [];
for (let i = 0; i < 1_000_000; i++) {
  arr.push(i);
}

console.timeEnd("Bucle de prueba");
// Salida aproximada: Bucle de prueba: 8.42ms`,
    },
    {
      titulo: "2. 🌐 Medir una operación asíncrona",
      code: `async function cargarDatos() {
  console.time("⏱️ Carga de API");

  const respuesta = await fetch("https://api.example.com/data");
  const datos = await respuesta.json();

  console.timeEnd("⏱️ Carga de API");
  // Salida aproximada: ⏱️ Carga de API: 342.15ms
}`,
    },
  ],

  errores: [
    "🏷️ **Etiquetas no coincidentes:** si abres con `\"ProcesoA\"` y cierras con `\"procesoA\"`, el temporizador no se encuentra y aparece una advertencia.",
    "🔓 **No cerrarlo con `timeEnd()`:** el temporizador queda activo y nunca verás el tiempo reflejado.",
    "🔬 **Usarlo para micro-benchmarks ultra precisos:** para mediciones de microsegundos es mejor `performance.now()`.",
  ],

  casos: [
    "🗄️ **Detección de consultas lentas:** medir una consulta pesada en Node.js para evaluar si necesita índices.",
    "⚛️ **Optimización de carga en frontend:** medir funciones de procesamiento o renderizado de componentes pesados.",
  ],

  relacion: [
    "🛑 **`console.timeEnd()`:** detiene y muestra el resultado del temporizador.",
    "📍 **`console.timeLog()`:** imprime el tiempo transcurrido en un punto intermedio sin detener el temporizador.",
    "⚡ **`performance.now()`:** alternativa de alta precisión que permite operar matemáticamente con los tiempos.",
  ],

  analogia:
    "Imagínate que eres entrenador de atletismo y quieres saber cuánto tarda tu corredor en dar una vuelta. 🏃 `console.time()` es presionar el botón de inicio del cronómetro justo cuando el atleta cruza la salida. El corredor da la vuelta y `console.timeEnd()` es presionar el botón de parada para registrar el tiempo final en tu libreta. ⏱️",

  fuente: "📚 MDN Web Docs — console.time()",

  notasPersonales: [
    "💡 **Tip Pro:** usa etiquetas diferentes para varios temporizadores simultáneos.",
    "🛑 **Cierra siempre** con `console.timeEnd()`.",
    "🔬 **Para precisión extrema:** usa `performance.now()`.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Qué método detiene un temporizador iniciado con console.time()?",
      opciones: [
        "console.timeLog()",
        "console.timeEnd()",
        "console.stop()",
        "console.clear()",
      ],
      correcta: 1,
    },
    {
      id: 2,
      pregunta: "¿Qué pasa si las etiquetas de time() y timeEnd() no coinciden?",
      opciones: [
        "Se usa la primera etiqueta",
        "El temporizador no se encuentra y avisa",
        "Se reinicia solo",
        "Se muestra en rojo",
      ],
      correcta: 1,
    },
    {
      id: 3,
      pregunta: "¿Qué alternativa ofrece mayor precisión?",
      opciones: [
        "performance.now()",
        "console.log()",
        "Date.toString()",
        "console.table()",
      ],
      correcta: 0,
    },
  ],
};

export const CONSOLE_TIME_LOG = {
  id: "console-time-log",
  titulo: "console.timeLog()",
  icon: "📍",
  categoria: "Console API",
  firma: "console.timeLog([label [, valor1, ..., valorN]])",
  simulador: "tiempo-log",

  definicion: [
    "Es una función incorporada en JavaScript que imprime el **valor actual de un temporizador** iniciado previamente con `console.time()`, sin necesidad de detenerlo. 📍",
    "Funciona como una parada técnica intermedia o punto de control de tiempo. ⏸️",
  ],

  queEs: [
    "Es un método de rendimiento del objeto global `console`. 🌐",
    "Permite leer cuántos milisegundos han transcurrido mientras el proceso sigue ejecutándose. 🏃",
    "Registra «vueltas» o laps de tiempo bajo un mismo temporizador. 🔄",
  ],

  paraQueSirve: [
    "🧩 **Medir procesos multifase:** monitorear el progreso temporal de un algoritmo largo con varios pasos.",
    "🔁 **Depurar bucles o eventos asíncronos:** registrar cuánto tarda cada iteración o respuesta intermedia.",
    "🏷️ **Evitar múltiples etiquetas:** centralizar el rastreo de una tarea compleja bajo un único temporizador.",
  ],

  comoFunciona: [
    "Primero debe existir un temporizador iniciado con `console.time('mi-temporizador')`. ⚙️",
    "`timeLog()` calcula la diferencia entre el instante actual y el inicio. 🧮",
    "Imprime el resultado intermedio y el temporizador sigue corriendo. ▶️",
    "Puedes añadir argumentos adicionales para dar contexto a la lectura del tiempo. 🏷️",
  ],

  sintaxis: [
    {
      code: `console.timeLog([label [, valor1, ..., valorN]]);`,
    },
    {
      caption: "El label es opcional; los valores extra se imprimen junto al tiempo:",
      code: `console.time("Proceso de datos");
console.timeLog("Proceso de datos", "Fase 1: Usuarios cargados");
console.timeLog("Proceso de datos", "Fase 2: Filtro completado");
console.timeEnd("Proceso de datos");`,
    },
  ],

  nota: "💡 **Tip Pro:** aprovecha los argumentos extra para pasar el índice o ID del elemento procesado: `console.timeLog(\"Proceso\", \"Item #\" + i)`. Así sabrás qué elemento causó un bajón de rendimiento.",

  ejemplos: [
    {
      titulo: "1. 📦 Medir los pasos intermedios de un proceso de carga",
      code: `console.time("Proceso de datos");

const usuarios = ["Ana", "Pedro", "Luis"];
console.timeLog("Proceso de datos", "Fase 1: Usuarios cargados");
// Salida: Proceso de datos: 0.15ms Fase 1: Usuarios cargados

for (let i = 0; i < 500_000; i++) {}
console.timeLog("Proceso de datos", "Fase 2: Filtro completado");
// Salida: Proceso de datos: 4.32ms Fase 2: Filtro completado

console.timeEnd("Proceso de datos");
// Salida: Proceso de datos: 4.88ms`,
    },
    {
      titulo: "2. 🔁 Registrar cada vuelta de un bucle",
      code: `console.time("Lotes");

for (let i = 0; i < 3; i++) {
  // Procesar lote...
  console.timeLog("Lotes", \`Lote \${i + 1} terminado\`);
}

console.timeEnd("Lotes");`,
    },
  ],

  errores: [
    "❓ **Llamarlo sin iniciar el temporizador:** si no existe `console.time(\"MiTimer\")`, aparece una advertencia.",
    "🛑 **Confundirlo con `timeEnd()`:** `timeLog()` no detiene el cronómetro; si olvidas `timeEnd()`, el temporizador sigue activo.",
    "🔠 **Error de mayúsculas:** las etiquetas distinguen entre mayúsculas y minúsculas (`case-sensitive`).",
  ],

  casos: [
    "🗄️ **Migraciones de bases de datos:** imprimir cuánto tarda cada lote de 1000 registros en Node.js.",
    "📦 **Carga secuencial de recursos:** registrar el tiempo a medida que se descargan e inicializan módulos pesados.",
  ],

  relacion: [
    "⏱️ **`console.time()`:** inicializa el cronómetro.",
    "🛑 **`console.timeEnd()`:** imprime el tiempo final y destruye el temporizador.",
    "⚡ **`performance.now()`:** alternativa para mediciones de alta precisión.",
  ],

  analogia:
    "Eres el entrenador con el cronómetro en la mano. ⏱️ Presionas inicio con `console.time()` cuando el corredor sale. `console.timeLog()` es mirar de reojo el cronómetro y gritar el tiempo cuando el corredor pasa por la mitad de la pista (los 200 metros). El atleta no se detiene y el cronómetro no se pausa: solo tomas una lectura rápida de cómo va la carrera. 🏃",

  fuente: "📚 MDN Web Docs — console.timeLog()",

  notasPersonales: [
    "💡 **Tip Pro:** pasa el índice o ID del elemento procesado como argumento extra.",
    "🛑 **Recuerda cerrar** con `console.timeEnd()`.",
    "🔠 **Etiquetas exactas:** distingue mayúsculas y minúsculas.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Qué hace console.timeLog() con el temporizador?",
      opciones: [
        "Lo detiene",
        "Lo reinicia",
        "Lo mantiene corriendo e imprime el tiempo actual",
        "Lo elimina",
      ],
      correcta: 2,
    },
    {
      id: 2,
      pregunta: "¿Qué se necesita antes de usar console.timeLog()?",
      opciones: [
        "Un console.time() con la misma etiqueta",
        "Un console.clear()",
        "Un console.table()",
        "Nada",
      ],
      correcta: 0,
    },
    {
      id: 3,
      pregunta: "¿Para qué sirven los argumentos extra de timeLog()?",
      opciones: [
        "Para detener el temporizador",
        "Para dar contexto junto al tiempo",
        "Para cambiar la etiqueta",
        "Para limpiar la consola",
      ],
      correcta: 1,
    },
  ],
};
