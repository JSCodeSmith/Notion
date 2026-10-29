export const CONSOLE_COUNT = {
  id: "console-count",
  titulo: "console.count()",
  icon: "🔢",
  categoria: "Console API",
  firma: "console.count([label])",
  simulador: "contador",

  definicion: [
    "Es una función incorporada en JavaScript que lleva un **conteo automático** de las veces que una línea específica de código se ejecuta con una etiqueta determinada. 🔢",
    "Cada llamada incrementa un contador interno asociado a esa etiqueta y muestra el total actual en la consola. 📈",
  ],

  queEs: [
    "Es un método de contabilidad del objeto global `console`. 🌐",
    "Mantiene un contador interno en memoria asignado a una clave o etiqueta de texto. 🗂️",
    "Incrementa el contador en 1 cada vez que el hilo de ejecución vuelve a pasar por esa llamada. 🔁",
  ],

  paraQueSirve: [
    "🔁 **Contar ejecuciones de funciones:** saber con precisión cuántas veces se invoca un método, por ejemplo para detectar llamadas duplicadas.",
    "🧮 **Monitorear ciclos y bucles:** verificar si un `for`, `while` o iterador se ejecuta el número exacto de veces planeado.",
    "⚛️ **Depurar re-renders en frontend:** en frameworks como React o Vue, contar cuántas veces se renderiza o actualiza un componente.",
  ],

  comoFunciona: [
    "Cuando el motor ejecuta `console.count('mi-etiqueta')`, revisa si ya existe un contador con ese nombre. ⚙️",
    "Si no existe, lo inicializa en 1; si ya existe, le suma 1. ➕",
    "Imprime en la consola el nombre de la etiqueta seguido del número actual, por ejemplo `mi-etiqueta: 3`. 🖥️",
    "Para volver a cero un contador se usa su método hermano `console.countReset('mi-etiqueta')`. 🔄",
  ],

  sintaxis: [
    {
      code: `console.count([label]);`,
    },
    {
      caption:
        "El label es opcional. Si se omite, se utiliza la etiqueta \"default\":",
      code: `console.count(); // default: 1
console.count("Usuario procesado"); // Usuario procesado: 1
console.count("Usuario procesado"); // Usuario procesado: 2`,
    },
  ],

  nota: "💡 **Tip Pro:** si necesitas auditar un componente visual y quieres limpiar los números viejos cuando el usuario pulse «Reiniciar pantalla», invoca `console.countReset(\"MiEtiqueta\")` en el manejador del botón. Tus métricas siempre empezarán limpias. 🧹",

  ejemplos: [
    {
      titulo: "1. 🔁 Contar iteraciones con una etiqueta genérica",
      code: `function procesarUsuarios() {
  const usuarios = ["Ana", "Carlos", "Diana"];

  usuarios.forEach(usuario => {
    console.count("Usuario procesado");
    // Lógica del proceso...
  });
}

procesarUsuarios();

/* Salida en consola:
Usuario procesado: 1
Usuario procesado: 2
Usuario procesado: 3
*/`,
    },
    {
      titulo: "2. 🏷️ Contadores dinámicos e independientes",
      code: `function registrarAsistencia(curso) {
  // La etiqueta se genera dinámicamente con el nombre del curso
  console.count(\`Asistentes en \${curso}\`);
}

registrarAsistencia("Matemáticas"); // Matemáticas: 1
registrarAsistencia("Historia");    // Historia: 1
registrarAsistencia("Matemáticas"); // Matemáticas: 2`,
    },
  ],

  errores: [
    "🏷️ **No usar etiquetas en contadores múltiples:** si usas `console.count()` en tres funciones sin nombre, todas comparten `\"default\"` y sus números se suman entre sí.",
    "🔠 **Confundir mayúsculas y minúsculas:** las etiquetas son *case-sensitive*. `\"Login\"` y `\"login\"` crean dos contadores independientes.",
    "🧹 **Olvidar limpiarlo:** en una SPA el contador sigue subiendo indefinidamente hasta que uses `console.countReset()`.",
  ],

  casos: [
    "🎢 **Optimización de eventos:** comprobar si `scroll` o `resize` disparan demasiadas llamadas por segundo y evaluar `debounce` o `throttle`.",
    "🌐 **Auditoría de peticiones:** contar cuántas peticiones HTTP hace un componente durante su ciclo de vida.",
  ],

  relacion: [
    "🔄 **`console.countReset()`:** el método indispensable para regresar un contador específico a cero.",
    "🔢 **Variables globales de control (`let i = 0`):** sustituye la necesidad de crear variables temporales solo para contar ejecuciones.",
    "🧹 **`console.clear()`:** borra toda la salida visual; `countReset()` solo reinicia un contador concreto.",
  ],

  analogia:
    "Imagínate que eres el portero de una discoteca exclusiva. 🔢 `console.count()` es tener un contador de clics manual en la mano: cada vez que entra un invitado VIP presionas el botón sin escribir nada. El dispositivo suma automáticamente y te muestra el total al instante. 🕺",

  fuente: "📚 MDN Web Docs — console.count()",

  notasPersonales: [
    "💡 **Tip Pro:** usa etiquetas descriptivas y distintas para cada contador.",
    "🧹 **Reinicia con `countReset()`** al comenzar una nueva ronda de pruebas.",
    "🔠 **Recuerda:** las etiquetas distinguen mayúsculas y minúsculas.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Qué hace console.count() cada vez que se ejecuta?",
      opciones: [
        "Borra la consola",
        "Incrementa un contador asociado a una etiqueta",
        "Mide el tiempo transcurrido",
        "Muestra una tabla",
      ],
      correcta: 1,
    },
    {
      id: 2,
      pregunta: "¿Qué etiqueta usa console.count() si no recibe argumentos?",
      opciones: ["count", "default", "global", "sin-etiqueta"],
      correcta: 1,
    },
    {
      id: 3,
      pregunta: "¿Qué método reinicia un contador específico?",
      opciones: [
        "console.clear()",
        "console.countReset()",
        "console.timeEnd()",
        "console.reset()",
      ],
      correcta: 1,
    },
  ],
};

export const CONSOLE_COUNT_RESET = {
  id: "console-count-reset",
  titulo: "console.countReset()",
  icon: "🔄",
  categoria: "Console API",
  firma: "console.countReset([label])",
  simulador: "contador",

  definicion: [
    "Es una función incorporada en JavaScript que reinicia a **cero** el valor de un contador específico inicializado previamente con `console.count()`. 🔄",
    "Permite limpiar el historial numérico de una etiqueta sin borrar toda la pantalla de la consola. 🧼",
  ],

  queEs: [
    "Es un método de control del objeto global `console`. 🌐",
    "Actúa como el interruptor de reinicio de los contadores internos que gestiona el motor de JavaScript. 🔘",
    "Trabaja de forma quirúrgica sobre una etiqueta, a diferencia de `console.clear()`, que borra toda la salida visual. 🎯",
  ],

  paraQueSirve: [
    "🔄 **Reiniciar métricas en flujos cíclicos:** poner a cero los contadores antes de una nueva ronda de pruebas o interacciones.",
    "📊 **Agrupar conteos por eventos:** medir cuántas veces ocurre una acción dentro de un rango o sesión concreta.",
    "🛡️ **Evitar datos inflados:** impedir que las interacciones anteriores afecten las mediciones de una nueva sesión de pruebas.",
  ],

  comoFunciona: [
    "Al invocar `console.countReset('mi-etiqueta')`, el motor busca en su registro interno el contador asociado a ese nombre exacto. ⚙️",
    "Si lo encuentra, restablece su valor interno a 0. 🔄",
    "La próxima llamada a `console.count('mi-etiqueta')` comenzará de nuevo en 1. 1️⃣",
    "En algunos navegadores, si el contador no existía, se imprime una advertencia indicando que la etiqueta no existe. ⚠️",
  ],

  sintaxis: [
    {
      code: `console.countReset([label]);`,
    },
    {
      caption:
        "El label es opcional. Si se omite, intenta reiniciar el contador \"default\":",
      code: `console.countReset("Procesamiento de datos");
console.countReset(); // reinicia "default"`,
    },
  ],

  nota: "💡 **Tip Pro:** si automatizas flujos asíncronos en Node.js o el navegador, envuelve tus funciones principales con un bloque que resetee los contadores automáticamente. Evitarás acumular números enormes e ilegibles tras minutos de desarrollo. 🧹",

  ejemplos: [
    {
      titulo: "1. 🔄 Reiniciar un contador entre ejecuciones consecutivas",
      code: `function simularCiclo(idSesion) {
  // 1. Reiniciamos el contador de la sesión anterior
  console.countReset("Procesamiento de datos");
  console.log(\`--- Iniciando Sesión \${idSesion} ---\`);

  // 2. Simulamos operaciones que incrementan el contador
  for (let i = 0; i < 2; i++) {
    console.count("Procesamiento de datos");
  }
}

simularCiclo("A");
// Procesamiento de datos: 1
// Procesamiento de datos: 2

simularCiclo("B");
// Procesamiento de datos: 1 (¡reiniciado con éxito!)
// Procesamiento de datos: 2`,
    },
    {
      titulo: "2. 🧪 Reset aislado por etiqueta",
      code: `console.count("clicks");      // clicks: 1
console.count("renders");     // renders: 1
console.count("clicks");      // clicks: 2

console.countReset("clicks");

console.count("clicks");      // clicks: 1
console.count("renders");     // renders: 2 (no se reinició)`,
    },
  ],

  errores: [
    "🏷️ **Etiqueta inexistente u omitida:** si creaste `\"MiContador\"` y llamas `console.countReset()` sin argumentos, reinicias `\"default\"` y dejas intacto el tuyo.",
    "🔠 **Confundir mayúsculas y minúsculas:** `console.countReset(\"Clicks\")` no afecta a un contador llamado `\"clicks\"`.",
    "🧠 **Esperar una salida visible:** a diferencia de `console.count()`, el reset no imprime el contador en la consola; solo cambia su valor interno.",
  ],

  casos: [
    "🧪 **Pruebas unitarias y de integración:** reiniciar contadores en los bloques `beforeEach` para que cada prueba se evalúe de forma aislada.",
    "🖥️ **Componentes interactivos:** reiniciar contadores de renderizado en una SPA al cambiar de ruta, pestaña o pulsar «Limpiar formulario».",
  ],

  relacion: [
    "🔢 **`console.count()`:** inicializa e incrementa los contadores que `countReset()` pone a cero.",
    "🧹 **`console.clear()`:** borra todo el texto de la consola; `countReset()` solo limpia el valor numérico de una etiqueta.",
    "🏷️ **Etiquetas *case-sensitive*:** el nombre debe coincidir exactamente con el usado en `console.count()`.",
  ],

  analogia:
    "El portero de la discoteca lleva un contador de clics manual. 🔄 Al empezar la segunda hora, el gerente le pide contar los VIP de ese nuevo bloque desde cero. `console.countReset()` es presionar la pequeña perilla lateral del dispositivo para girar los números de regreso a 0000. El contador queda listo para la nueva medición. 🕺",

  fuente: "📚 MDN Web Docs — console.countReset()",

  notasPersonales: [
    "💡 **Tip Pro:** reinicia antes de cada sesión de medición, no al final.",
    "🏷️ **Etiqueta exacta:** debe coincidir con la de `console.count()`.",
    "🧠 **No borra la consola:** solo devuelve el contador a cero.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Qué hace console.countReset()?",
      opciones: [
        "Borra toda la consola",
        "Reinicia a cero un contador específico",
        "Detiene un temporizador",
        "Muestra una tabla",
      ],
      correcta: 1,
    },
    {
      id: 2,
      pregunta: "¿Qué pasa si la etiqueta no coincide exactamente?",
      opciones: [
        "Se reinicia el contador más parecido",
        "No tiene efecto sobre ese contador",
        "Lanza una excepción fatal",
        "Se reinician todos los contadores",
      ],
      correcta: 1,
    },
    {
      id: 3,
      pregunta: "¿En qué se diferencia de console.clear()?",
      opciones: [
        "No hay diferencia",
        "clear() borra la salida visual; countReset() solo reinicia un contador",
        "countReset() borra variables",
        "clear() solo funciona en Node.js",
      ],
      correcta: 1,
    },
  ],
};
