export const CONSOLE_ASSERT = {
  id: "console-assert",
  titulo: "console.assert()",
  icon: "✅",
  categoria: "Console API",
  firma: "console.assert(condicion, mensaje1 [, mensaje2, ..., mensajeN])",
  simulador: "assert",

  definicion: [
    "Es una función incorporada en JavaScript que escribe un **mensaje de error** en la consola únicamente si una condición evaluada es **falsa**. ✅",
    "Si la condición se cumple (`true`), el comando no hace absolutamente nada. 🤫",
  ],

  queEs: [
    "Es un método de prueba condicional del objeto global `console`. 🌐",
    "Funciona como una **aserción lógica** o mini-test integrado en el código, permitiendo validar suposiciones técnicas en tiempo de ejecución. 🧪",
  ],

  paraQueSirve: [
    "🧪 **Validar estados:** comprobar que variables o respuestas tengan el valor esperado en puntos críticos.",
    "🤫 **Depurar en silencio:** evitar llenar la consola de mensajes repetitivos; solo aparece algo cuando falla de verdad.",
    "📜 **Garantizar contratos de código:** asegurar que los datos que entran a una función cumplan ciertos requisitos.",
  ],

  comoFunciona: [
    "Recibe como primer argumento una expresión booleana o un valor evaluable como verdadero/falso. ⚙️",
    "Si el resultado es `true`, el motor lo ignora y el código sigue de forma invisible. ✅",
    "Si el resultado es `false`, toma el resto de argumentos y los imprime con el diseño visual de `console.error()`. ❌",
    "No lanza una excepción ni interrumpe el programa. ↩️",
  ],

  sintaxis: [
    {
      code: `console.assert(condicion, mensaje1 [, mensaje2, ..., mensajeN]);`,
    },
    {
      caption: "La condición debe describir lo que esperas que sea verdadero:",
      code: `console.assert(carrito.length > 0, "El carrito no tiene productos");
console.assert(nota >= 0 && nota <= 20, { notaRecibida: nota });`,
    },
  ],

  nota: "💡 **Tip Pro:** `console.assert()` antepone automáticamente «Assertion failed:». Evita redundancias como `console.assert(condicion, \"Error: Falló...\")` y describe exactamente qué no se cumplió.",

  ejemplos: [
    {
      titulo: "1. 🛒 Validar que un arreglo no esté vacío",
      code: `const carrito = [];

// Si el carrito está vacío, la condición es FALSA y se dispara el error
console.assert(
  carrito.length > 0,
  "❌ Error: El carrito de compras no tiene productos."
);
// Salida: Assertion failed: ❌ Error: El carrito de compras no tiene productos.`,
    },
    {
      titulo: "2. 🎓 Verificar los límites de una función numérica",
      code: `function asignarCalificacion(nota) {
  console.assert(
    nota >= 0 && nota <= 20,
    { notaRecibida: nota, msg: "La nota está fuera de rango" }
  );
  // Lógica para procesar la nota...
}

asignarCalificacion(25);
// Salida: Assertion failed: { notaRecibida: 25, ... }`,
    },
  ],

  errores: [
    "🛑 **Pensar que detiene la ejecución:** a diferencia de Jest o `throw`, `console.assert()` no lanza una excepción. El código sigue corriendo aunque la aserción falle.",
    "🔄 **Escribir la condición al revés:** el mensaje se activa cuando la condición es **falsa**. Si quieres alertar que una variable es nula, escribe `variable !== null`.",
    "🧹 **Usarlo como sistema de tests:** es una ayuda de desarrollo, no sustituye una suite de pruebas automatizadas.",
  ],

  casos: [
    "📡 **Auditoría de APIs:** validar si el objeto que devuelve el servidor trae las propiedades obligatorias.",
    "👥 **Control de calidad interno:** dejar «trampas» para que si otro desarrollador usa mal una función, la consola se lo notifique.",
  ],

  relacion: [
    "❌ **`console.error()`:** es el método que usa internamente `console.assert()` para pintar el mensaje cuando falla.",
    "🧪 **Pruebas unitarias:** comparte la filosofía de `expect()` o `assert()` de las librerías de testing, pero enfocado a la consola de desarrollo.",
    "💥 **`throw`:** detiene la ejecución; `console.assert()` solo informa.",
  ],

  analogia:
    "Imagínate que eres un guardia de seguridad en la entrada de un edificio y debes verificar que todos traigan credencial. 🛡️ Si alguien pasa con su credencial visible (condición verdadera), no le dices nada y lo dejas pasar en silencio. Pero si pasa alguien sin credencial (condición falsa), haces sonar tu silbato fuertemente para reportar la anomalía. 📢",

  fuente: "📚 MDN Web Docs — console.assert()",

  notasPersonales: [
    "💡 **Tip Pro:** el mensaje solo aparece si la condición es falsa.",
    "🧪 **No sustituye tests:** úsalo para validaciones rápidas durante el desarrollo.",
    "📝 **Mensajes claros:** describe qué se esperaba y qué se recibió.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Cuándo imprime un mensaje console.assert()?",
      opciones: [
        "Siempre",
        "Solo si la condición es true",
        "Solo si la condición es false",
        "Solo en Node.js",
      ],
      correcta: 2,
    },
    {
      id: 2,
      pregunta: "¿Qué hace console.assert() si la condición es true?",
      opciones: [
        "Lanza un error",
        "No hace nada",
        "Limpia la consola",
        "Imprime true",
      ],
      correcta: 1,
    },
    {
      id: 3,
      pregunta: "¿console.assert() detiene la ejecución cuando falla?",
      opciones: [
        "Sí, siempre",
        "No, solo muestra un mensaje de error",
        "Solo dentro de try/catch",
        "Solo en el navegador",
      ],
      correcta: 1,
    },
  ],
};

export const CONSOLE_CLEAR = {
  id: "console-clear",
  titulo: "console.clear()",
  icon: "🧹",
  categoria: "Console API",
  firma: "console.clear()",
  simulador: "clear",

  definicion: [
    "Es una función incorporada en JavaScript que limpia por completo el **historial de mensajes** acumulados en la consola del depurador. 🧹",
    "Vacía la pantalla de la consola, dejándola en blanco o con un único mensaje indicando que fue limpiada. ✨",
  ],

  queEs: [
    "Es un método del objeto global `console`. 🌐",
    "Actúa como un comando de mantenimiento o limpieza visual. 🧽",
    "No borra variables, memoria ni estados del programa: solo el texto visible. 👀",
  ],

  paraQueSirve: [
    "🧹 **Eliminar ruido visual:** despejar la pantalla cuando se acumulan demasiados logs, advertencias o errores.",
    "🗂️ **Organizar flujos repetitivos:** limpiar justo antes de un proceso largo para que solo se vea la ejecución actual.",
    "🖥️ **Flujos interactivos en terminales:** simular interfaces dinámicas o «refrescar» la pantalla en Node.js.",
  ],

  comoFunciona: [
    "Cuando el motor ejecuta `console.clear()`, indica al entorno que borre el búfer de salida visual. ⚙️",
    "En navegadores, la pantalla se vacía y suele aparecer el mensaje «Console was cleared». 🌐",
    "En Node.js, desplaza o borra los caracteres de la pantalla según el sistema operativo. 🖥️",
    "Si el entorno tiene activado **Preserve log**, el comando puede ser ignorado. 🛡️",
  ],

  sintaxis: [
    {
      code: `console.clear();`,
      caption: "No recibe argumentos. Si le pasas parámetros, se ignoran.",
    },
  ],

  nota: "💡 **Tip Pro:** si tu consola colapsa por un bucle infinito, usa el icono 🚫 de la consola del navegador para limpiarla manualmente en lugar de meter `console.clear()` en el código.",

  ejemplos: [
    {
      titulo: "1. 🚀 Limpieza automática antes de una nueva ejecución",
      code: `function iniciarNuevaSimulacion() {
  // Borramos todo el rastro anterior
  console.clear();

  // Iniciamos los nuevos logs
  console.log("🚀 Iniciando nueva simulación...");
  // ... resto del código
}`,
    },
    {
      titulo: "2. ⏱️ Contador visual dinámico en Node.js",
      code: `let segundos = 0;

setInterval(() => {
  console.clear(); // Limpia la terminal en cada ciclo
  segundos++;
  console.log(\`⏱️ Tiempo transcurrido: \${segundos} segundos\`);
}, 1000);`,
    },
  ],

  errores: [
    "😤 **Frustrar a otros desarrolladores:** si lo incluyes en una librería compartida, borrarás los logs que otros estaban usando.",
    "🧠 **Pensar que borra variables:** solo limpia el texto visual; no borra memoria, no reinicia variables ni deshace acciones.",
    "🔍 **No entender por qué no funciona:** en el navegador puede estar activada la opción **Preserve log**, que ignora el comando.",
  ],

  casos: [
    "⚡ **Hot Reload:** Vite o Webpack ejecutan `console.clear()` al recargar para empezar con la consola limpia.",
    "🖥️ **Scripts de automatización:** limpiar el menú de la terminal antes de pintar una nueva lista de opciones.",
  ],

  relacion: [
    "⌨️ **Atajos de teclado:** `Ctrl + L` o `Cmd + K` realizan la misma acción en la mayoría de navegadores y terminales.",
    "🛡️ **Preserve Log:** opción de las DevTools que impide que los scripts limpien el historial.",
    "🖨️ **`console.log()`:** genera los mensajes que `console.clear()` elimina.",
  ],

  analogia:
    "Imagínate que estás resolviendo ecuaciones en una pizarra con tiza. 🧮 Has llenado la pizarra de operaciones y tachones, y ya no queda espacio. `console.clear()` es pasar el borrador por toda la pizarra de un solo golpe. La pizarra queda limpia y lista para el siguiente problema, pero las operaciones ya resueltas no desaparecen de tu mente. 🧽",

  fuente: "📚 MDN Web Docs — console.clear()",

  notasPersonales: [
    "💡 **Tip Pro:** úsalo solo en tu aplicación final, no en librerías compartidas.",
    "🛡️ **Si no funciona:** revisa la opción **Preserve log**.",
    "🧠 **Recuerda:** no borra variables ni estado, solo la salida visual.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Qué borra exactamente console.clear()?",
      opciones: [
        "Las variables del programa",
        "El historial visual de la consola",
        "La memoria del navegador",
        "Los archivos del proyecto",
      ],
      correcta: 1,
    },
    {
      id: 2,
      pregunta: "¿Qué opción del navegador puede impedir que funcione?",
      opciones: ["Dark mode", "Preserve log", "Network throttling", "Device mode"],
      correcta: 1,
    },
    {
      id: 3,
      pregunta: "¿Qué atajo equivalente existe en la mayoría de consolas?",
      opciones: ["Ctrl + L", "Ctrl + S", "Ctrl + P", "Ctrl + Z"],
      correcta: 0,
    },
  ],
};

export const CONSOLE_TRACE = {
  id: "console-trace",
  titulo: "console.trace()",
  icon: "🧭",
  categoria: "Console API",
  firma: "console.trace([objeto1 [, objeto2, ..., objetoN]])",
  simulador: "trace",

  definicion: [
    "Es una función incorporada en JavaScript que muestra de forma interactiva la **pila de llamadas** (stack trace) que se ejecutó para llegar al punto donde se invocó. 🧭",
    "Revela el «camino» o la genealogía de funciones que ejecutó el motor de JavaScript. 🧱",
  ],

  queEs: [
    "Es un método de diagnóstico y rastreo del objeto global `console`. 🌐",
    "Muestra qué función llamó a cuál, de forma jerárquica y en orden cronológico inverso. 🔗",
    "No es un error: es una radiografía del call stack. 🩻",
  ],

  paraQueSirve: [
    "🧭 **Rastrear flujos complejos:** entender cómo se disparó una función en una aplicación grande.",
    "🎯 **Identificar el origen de una ejecución:** saber cuál de todos los componentes invocó una función compartida.",
    "🐞 **Depurar comportamientos inesperados:** investigar por qué se ejecuta una acción duplicada o fuera de tiempo.",
  ],

  comoFunciona: [
    "Al ejecutarse, el motor genera un mapa de las funciones apiladas en el hilo actual (**Call Stack**). ⚙️",
    "Imprime ese mapa en la consola sin pausar la aplicación. 🖥️",
    "En navegadores la salida es interactiva: muestra funciones, archivos y números de línea. 🧱",
    "Puedes hacer clic en un frame para ir directo al código fuente. 🖱️",
  ],

  sintaxis: [
    {
      code: `console.trace([objeto1 [, objeto2, ..., objetoN]]);`,
    },
    {
      caption: "Los argumentos opcionales actúan como título descriptivo del rastreo:",
      code: `console.trace("🔍 Rastro de actualización:");
console.trace({ idUsuario: 45, accion: "actualizarInventario" });`,
    },
  ],

  nota: "💡 **Tip Pro:** si pasas un objeto descriptivo como `console.trace({ idUsuario: 45 })`, la primera línea del bloque mostrará ese contexto y podrás identificar en milisegundos qué datos provocaron ese camino de ejecución.",

  ejemplos: [
    {
      titulo: "1. 🔍 Rastrear la cadena de llamadas de una función compartida",
      code: `function actualizarInventario() {
  // Queremos saber QUIÉN nos está llamando aquí
  console.trace("🔍 Rastro de actualización:");
  // Lógica para actualizar...
}

function comprarProducto() {
  actualizarInventario();
}

function cancelarPedido() {
  actualizarInventario();
}

comprarProducto();`,
    },
    {
      titulo: "2. 🧾 Salida típica en consola",
      code: `🔍 Rastro de actualización:
    at actualizarInventario (archivo.js:3)
    at comprarProducto (archivo.js:8)
    at global (archivo.js:15)`,
    },
  ],

  errores: [
    "🚨 **Confundirlo con un error:** la salida se parece a un reporte de error, pero no lo es ni detiene el programa.",
    "⏱️ **Flujos asíncronos puros:** dentro de `setTimeout` o promesas antiguas el stack puede romperse y mostrar solo el Event Loop.",
    "🐌 **Dejarlo activo en producción:** generar stack traces consume CPU y memoria; usarlo de forma masiva puede ralentizar la app.",
  ],

  casos: [
    "⚡ **Arquitecturas basadas en eventos:** en Redux, RxJS o emisores de Node.js, saber qué evento gatilló un cambio de estado.",
    "🏚️ **Mantenimiento de código legacy:** descubrir qué partes del sistema dependen de una función antigua.",
  ],

  relacion: [
    "🧱 **Call Stack:** estructura LIFO que usa el motor para saber qué función se ejecuta y cuáles están pendientes.",
    "📦 **`new Error().stack`:** permite guardar la cadena del rastreo en una variable en lugar de imprimirla.",
    "🐞 **`debugger`:** pausa la ejecución para inspeccionar el entorno paso a paso.",
  ],

  analogia:
    "Imagínate que eres un detective que entra a una habitación y encuentra un jarrón roto. 🕵️ `console.log()` sería tomarle una foto al jarrón; `console.trace()` es reproducir una cinta de seguridad hacia atrás: muestra que el gato tiró el jarrón, que antes el perro asustó al gato y que antes tú tocaste el timbre. Te da la película completa de acontecimientos encadenados. 🎞️",

  fuente: "📚 MDN Web Docs — console.trace()",

  notasPersonales: [
    "💡 **Tip Pro:** pasa un objeto contextual para identificar el origen exacto.",
    "🧹 **Producción:** elimina los `console.trace()` masivos por su coste de rendimiento.",
    "🖱️ **DevTools:** haz clic en los frames para navegar al código fuente.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Qué muestra console.trace()?",
      opciones: [
        "Una tabla de datos",
        "La pila de llamadas que llegó al punto actual",
        "El tiempo transcurrido",
        "Un mensaje de error crítico",
      ],
      correcta: 1,
    },
    {
      id: 2,
      pregunta: "¿console.trace() detiene la ejecución?",
      opciones: [
        "Sí, como un breakpoint",
        "No, solo imprime el rastro",
        "Solo en Node.js",
        "Solo si hay un error",
      ],
      correcta: 1,
    },
    {
      id: 3,
      pregunta: "¿Qué estructura de datos representa el call stack?",
      opciones: ["Cola FIFO", "Pila LIFO", "Árbol binario", "Grafo"],
      correcta: 1,
    },
  ],
};
