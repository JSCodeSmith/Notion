export const JS_TEMPORIZADORES = {
  id: "temporizadores",
  label: "Temporizadores",
  icon: "⏱️",
  titulo: "Temporizadores en JavaScript",
  descripcion:
    "Programa, repite y cancela tareas asíncronas con setTimeout, setInterval y sus funciones de limpieza.",
  grupos: [
    {
      seccion: "Ejecución única",
      metodos: [
        {
          id: "settimeout",
          nombre: "setTimeout()",
          firma: "setTimeout(callback, retraso, ...args)",
          icon: "⏳",
        },
        {
          id: "cleartimeout",
          nombre: "clearTimeout()",
          firma: "clearTimeout(timeoutID)",
          icon: "❌",
        },
      ],
    },
    {
      seccion: "Ejecución repetitiva",
      metodos: [
        {
          id: "setinterval",
          nombre: "setInterval()",
          firma: "setInterval(callback, retraso, ...args)",
          icon: "🔁",
        },
        {
          id: "clearinterval",
          nombre: "clearInterval()",
          firma: "clearInterval(intervalID)",
          icon: "🛑",
        },
      ],
    },
  ],
};

export const JS_TEMPORIZADORES_DOCS = {
  settimeout: {
    id: "settimeout",
    titulo: "setTimeout()",
    icon: "⏳",
    categoria: "Temporizadores",
    firma: "setTimeout(callback, retraso, ...args)",
    simulador: "temporizador",

    definicion: [
      "Es una función global que ejecuta una función o un bloque de código **después** de que transcurra un retraso en milisegundos. ⏳",
      "Devuelve un identificador único (`timeoutID`) que permite cancelar la ejecución con `clearTimeout()`.",
    ],

    queEs: [
      "Es una API de temporización **asíncrona y no bloqueante** del entorno de ejecución (navegador o Node.js). 🌐",
      "No forma parte del núcleo de ECMAScript, sino de las Web APIs o APIs del entorno.",
    ],

    paraQueSirve: [
      "⏱️ **Diferir acciones:** ocultar una alerta después de unos segundos.",
      "🎬 **Controlar animaciones:** esperar a que el navegador procese estilos antes de cambiar un elemento.",
      "🔎 **Debounce:** esperar a que el usuario deje de escribir antes de lanzar una búsqueda.",
      "🧹 **Programar tareas:** ejecutar código después del ciclo síncrono actual usando `setTimeout(fn, 0)`.",
    ],

    comoFunciona: [
      "El motor registra el temporizador en las Web APIs y continúa ejecutando el resto del código sin detenerse.",
      "El entorno cuenta el tiempo en paralelo al hilo principal.",
      "Cuando se cumple el retraso, el callback se envía a la **cola de tareas** (Callback Queue).",
      "El **Event Loop** espera a que el hilo principal esté libre y entonces ejecuta el callback.",
      "Por eso el retraso es un **tiempo mínimo garantizado**, no un tiempo exacto.",
    ],

    sintaxis: [
      {
        code: `const id = setTimeout(callback, retraso, arg1, arg2);`,
      },
      {
        caption: "Función flecha y cancelación:",
        code: `const id = setTimeout(() => {
  console.log("Pasaron 2 segundos");
}, 2000);

clearTimeout(id); // cancela antes de que se ejecute`,
      },
      {
        caption: "Pasar argumentos al callback:",
        code: `function saludar(nombre, rol) {
  console.log("Hola " + nombre + ", tu rol es " + rol);
}

const id = setTimeout(saludar, 3000, "Satoshi", "Desarrollador");`,
      },
    ],

    nota: "💡 `setTimeout(fn, 0)` no ejecuta la función inmediatamente: la envía al final de la cola de tareas, después del código síncrono actual.",

    ejemplos: [
      {
        titulo: "1. ⏳ Uso básico con función flecha",
        code: `console.log("Inicio");

setTimeout(() => {
  console.log("⏰ ¡Tiempo cumplido!");
}, 2000);

console.log("Fin del código síncrono");

// Inicio
// Fin del código síncrono
// ⏰ ¡Tiempo cumplido! (2 segundos después)`,
      },
      {
        titulo: "2. 🧹 Cancelar un temporizador",
        code: `const id = setTimeout(() => {
  console.log("Este mensaje no se verá");
}, 3000);

clearTimeout(id);
console.log("Temporizador cancelado");`,
      },
      {
        titulo: "3. 🔎 Debounce para un buscador",
        code: `let temporizador;

function alEscribir(texto) {
  clearTimeout(temporizador);
  temporizador = setTimeout(() => {
    buscar(texto);
  }, 500);
}`,
      },
    ],

    errores: [
      "**Pasar la función ejecutada:** `setTimeout(miFuncion(), 1000)` ejecuta la función de inmediato y programa su resultado. Usa `setTimeout(miFuncion, 1000)`.",
      "**Confiar en una precisión exacta:** si el hilo está ocupado, el callback puede tardar más de lo indicado.",
      "**Olvidar limpiar temporizadores:** en React o Vue, un timer vivo tras desmontar el componente puede provocar fugas de memoria y errores.",
      "**Creer que detiene el código:** `setTimeout` es asíncrono; el código que está después se ejecuta antes del callback.",
    ],

    casos: [
      "🔔 Cerrar automáticamente una notificación después de 3 segundos.",
      "🔎 Implementar debounce en inputs de búsqueda.",
      "🎨 Retrasar animaciones o transiciones hasta el siguiente frame.",
      "🛡️ Programar una limpieza o un reintento de red.",
    ],

    relacion: [
      "**`clearTimeout()`:** cancela el temporizador antes de que se cumpla.",
      "**`setInterval()`:** repite la ejecución cada cierto intervalo.",
      "**`requestAnimationFrame()`:** alternativa optimizada para animaciones sincronizadas con la pantalla.",
      "**Event Loop:** explica por qué el retraso es mínimo y no exacto.",
    ],

    analogia:
      "Imagina que vas a una panadería a encargar un pastel. El panadero te dice que estará listo en 30 minutos (`setTimeout`). Tú no te quedas bloqueando la fila: te vas a caminar y haces otras cosas. A los 30 minutos regresas; si la tienda está vacía te entregan el pastel de inmediato, pero si hay una fila enorme tendrás que esperar un poco más. Ese tiempo extra es el Event Loop.",

    fuente: "MDN Web Docs · setTimeout()",

    notasPersonales: [
      "✅ Ejecuta el callback una sola vez.",
      "✅ Devuelve un ID para poder cancelarlo.",
      "✅ El retraso se mide en milisegundos (1000 ms = 1 segundo).",
      "⚠️ El tiempo indicado es el mínimo, no el exacto.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿En qué unidad se mide el retraso de setTimeout()?",
        opciones: ["Segundos", "Milisegundos", "Minutos", "Frames"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve setTimeout()?",
        opciones: [
          "Una promesa",
          "El resultado del callback",
          "Un identificador para cancelarlo",
          "undefined siempre",
        ],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿Cuál es la forma correcta de programar una función?",
        opciones: [
          "setTimeout(miFuncion(), 1000)",
          "setTimeout(miFuncion, 1000)",
          "setTimeout(miFuncion, 1)",
          "setTimeout(() => miFuncion(), 1000, true)",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué función cancela un setTimeout() pendiente?",
        opciones: ["clearInterval()", "clearTimeout()", "abort()", "stopTimeout()"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Por qué setTimeout(fn, 0) no se ejecuta inmediatamente?",
        opciones: [
          "Porque falla",
          "Porque el callback pasa a la cola de tareas tras el código síncrono",
          "Porque el retraso mínimo es 1 segundo",
          "Porque necesita await",
        ],
        correcta: 1,
      },
    ],
  },

  cleartimeout: {
    id: "cleartimeout",
    titulo: "clearTimeout()",
    icon: "❌",
    categoria: "Temporizadores",
    firma: "clearTimeout(timeoutID)",
    simulador: "temporizador",

    definicion: [
      "Es una función global que cancela de inmediato la ejecución de un callback programado con `setTimeout()`. ❌",
      "Recibe el identificador que devolvió el temporizador y lo elimina del registro del entorno.",
    ],

    queEs: [
      "Es el **freno de mano** de los temporizadores de ejecución única. 🛑",
      "Impide que el callback llegue a la cola de tareas si se invoca antes de que se cumpla el tiempo.",
    ],

    paraQueSirve: [
      "🚫 **Abortar acciones programadas:** cancelar un aviso si el usuario ya hizo lo necesario.",
      "🧹 **Prevenir fugas de memoria:** limpiar timers al desmontar componentes.",
      "🔎 **Debounce:** cancelar la búsqueda anterior en cada pulsación de tecla.",
      "🎯 **Controlar menús y tooltips:** evitar que se cierren si el usuario vuelve a entrar.",
    ],

    comoFunciona: [
      "`setTimeout()` devuelve un `timeoutID` único.",
      "Al llamar a `clearTimeout(id)`, el motor busca ese temporizador en las Web APIs.",
      "Si la cuenta sigue activa, la detiene y la elimina del sistema.",
      "El callback nunca llega a la cola de tareas ni se ejecuta.",
      "Si el temporizador ya se ejecutó, la llamada no hace nada y no lanza errores.",
    ],

    sintaxis: [
      {
        code: `const id = setTimeout(callback, 3000);
clearTimeout(id);`,
      },
      {
        caption: "Limpiar al desmontar un componente de React:",
        code: `useEffect(() => {
  const timer = setTimeout(() => {
    // acción
  }, 3000);

  return () => clearTimeout(timer);
}, []);`,
      },
    ],

    nota: "💡 Guarda siempre el ID en una variable accesible. Sin el ID no puedes cancelar el temporizador.",

    ejemplos: [
      {
        titulo: "1. ❌ Cancelar un aviso publicitario",
        code: `const anuncioId = setTimeout(() => {
  console.log("💥 ¡Ganaste un viaje gratis!");
}, 5000);

// El usuario compra Premium a los 2 segundos
setTimeout(() => {
  console.log("👑 Usuario Premium: cancelando anuncio");
  clearTimeout(anuncioId);
}, 2000);`,
      },
      {
        titulo: "2. 🔎 Debounce en un buscador",
        code: `let timer;

function alEscribir(texto) {
  clearTimeout(timer);
  timer = setTimeout(() => {
    buscar(texto);
  }, 500);
}`,
      },
      {
        titulo: "3. 🖱️ Cerrar un menú con retraso",
        code: `let cerrarMenu;

function alSalir() {
  cerrarMenu = setTimeout(() => {
    menu.classList.remove("abierto");
  }, 300);
}

function alEntrar() {
  clearTimeout(cerrarMenu);
}`,
      },
    ],

    errores: [
      "**No guardar el ID:** `setTimeout(miFuncion, 3000)` sin asignarlo a una variable hace imposible cancelarlo.",
      "**Pasar la función en lugar del ID:** `clearTimeout(miFuncion)` no cancela nada; se necesita el identificador numérico.",
      "**Confundirlo con `clearInterval()`:** úsalo solo con temporizadores creados por `setTimeout()`.",
      "**Limpiar un timer ya ejecutado:** no causa error, pero tampoco revierte la ejecución.",
    ],

    casos: [
      "🔔 Cancelar notificaciones que ya no aplican.",
      "🔎 Debounce de inputs y búsquedas.",
      "🧹 Limpieza de timers en `useEffect` de React.",
      "🖱️ Evitar cierres accidentales de menús flotantes.",
    ],

    relacion: [
      "**`setTimeout()`:** crea el temporizador y entrega el ID que necesita `clearTimeout()`.",
      "**`clearInterval()`:** equivalente para detener un `setInterval()`.",
      "**`useEffect`:** su función de limpieza es el lugar habitual para llamar a `clearTimeout()`.",
    ],

    analogia:
      "Pides un espresso para llevar y el barista te dice que estará en 5 minutos (`setTimeout`). A los 2 minutos recibes una llamada de emergencia y debes irte. Vas al barista y le dices: «cancele mi orden» (`clearTimeout`). El barista detiene la preparación, tira el ticket y el café nunca se sirve.",

    fuente: "MDN Web Docs · clearTimeout()",

    notasPersonales: [
      "✅ Solo cancela temporizadores de ejecución única.",
      "✅ No lanza error si el ID no existe o ya se ejecutó.",
      "✅ Es clave para evitar memory leaks.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué recibe clearTimeout()?",
        opciones: [
          "La función callback",
          "El ID devuelto por setTimeout()",
          "El retraso en milisegundos",
          "Una promesa",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué pasa si clearTimeout() se llama después de que el callback ya se ejecutó?",
        opciones: [
          "Lanza un error",
          "No hace nada",
          "Repite el callback",
          "Devuelve false",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Con qué temporizador se usa clearTimeout()?",
        opciones: ["setInterval()", "setTimeout()", "requestAnimationFrame()", "fetch()"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué se necesita para poder cancelar un setTimeout()?",
        opciones: [
          "Guardar el ID que devuelve",
          "Usar await",
          "Llamar a clearInterval()",
          "Convertirlo en promesa",
        ],
        correcta: 0,
      },
      {
        id: 5,
        pregunta: "¿Dónde conviene limpiar un timer en React?",
        opciones: [
          "En el render",
          "En la función de limpieza de useEffect",
          "En el HTML",
          "Nunca se limpia",
        ],
        correcta: 1,
      },
    ],
  },

  setinterval: {
    id: "setinterval",
    titulo: "setInterval()",
    icon: "🔁",
    categoria: "Temporizadores",
    firma: "setInterval(callback, retraso, ...args)",
    simulador: "temporizador",

    definicion: [
      "Es una función global que ejecuta un callback **de forma repetitiva** cada vez que transcurre un intervalo de milisegundos. 🔁",
      "Devuelve un identificador (`intervalID`) que permite detener el ciclo con `clearInterval()`.",
    ],

    queEs: [
      "Es una API de temporización **cíclica y asíncrona** del entorno de ejecución. 🌐",
      "Al igual que `setTimeout()`, forma parte de las Web APIs y del Event Loop, y no bloquea el hilo principal.",
    ],

    paraQueSirve: [
      "⏰ **Cronómetros y relojes:** actualizar la hora cada segundo.",
      "📡 **Polling:** consultar una API cada cierto tiempo para ver si hay novedades.",
      "💾 **Autoguardado:** guardar un borrador cada 30 segundos.",
      "🎮 **Bucles de juego:** actualizar el estado de un juego a intervalos regulares.",
    ],

    comoFunciona: [
      "El motor registra el intervalo en el entorno.",
      "Cuando pasa el tiempo indicado, el callback se envía a la cola de tareas.",
      "El Event Loop lo ejecuta en cuanto el hilo está libre.",
      "Al terminar, el entorno **reinicia la cuenta** automáticamente y repite el ciclo.",
      "El ciclo solo se detiene al llamar a `clearInterval()` o al cerrar la página.",
    ],

    sintaxis: [
      {
        code: `const id = setInterval(callback, retraso, arg1, arg2);`,
      },
      {
        caption: "Reloj que se detiene a los 5 segundos:",
        code: `const id = setInterval(() => {
  console.log(new Date().toLocaleTimeString());
}, 1000);

setTimeout(() => {
  clearInterval(id);
  console.log("Reloj detenido");
}, 5000);`,
      },
    ],

    nota: "💡 Si el callback tarda más que el intervalo, las ejecuciones pueden solaparse. Para tareas asíncronas pesadas, usa `setTimeout()` recursivo en lugar de `setInterval()`.",

    ejemplos: [
      {
        titulo: "1. ⏰ Reloj digital en consola",
        code: `const mostrarHora = () => {
  console.log("⏰ " + new Date().toLocaleTimeString());
};

const relojId = setInterval(mostrarHora, 1000);

setTimeout(() => {
  clearInterval(relojId);
  console.log("Reloj detenido");
}, 5000);`,
      },
      {
        titulo: "2. 🔢 Contador de segundos",
        code: `let segundos = 0;

const id = setInterval(() => {
  segundos++;
  console.log("Segundos: " + segundos);
}, 1000);`,
      },
      {
        titulo: "3. 📡 Polling de una API",
        code: `const id = setInterval(async () => {
  const res = await fetch("/api/notificaciones");
  const datos = await res.json();
  console.log(datos);
}, 10000);`,
      },
    ],

    errores: [
      "**Acumulación de ejecuciones:** si el callback tarda más que el intervalo, las llamadas se encolan y pueden ralentizar la app.",
      "**Fugas de memoria:** olvidar `clearInterval()` al desmontar un componente deja el ciclo ejecutándose para siempre.",
      "**Omitir los paréntesis de referencia:** `setInterval(miFuncion(), 1000)` ejecuta la función una vez y programa su resultado.",
      "**No guardar el ID:** sin el identificador no podrás detener el intervalo.",
    ],

    casos: [
      "⏰ Relojes, cronómetros y cuentas regresivas.",
      "📡 Consultas periódicas a un servidor (polling).",
      "💾 Autoguardado de borradores.",
      "🎞️ Animaciones simples por pasos.",
    ],

    relacion: [
      "**`clearInterval()`:** detiene el ciclo y libera el temporizador.",
      "**`setTimeout()` recursivo:** alternativa que evita solapamientos porque espera a que termine cada tarea.",
      "**`requestAnimationFrame()`:** mejor opción para animaciones fluidas.",
    ],

    analogia:
      "Imagina un aspersor de riego programado para dar una vuelta cada 10 minutos. No importa si ya llovió o si el césped está encharcado: el aspersor se activa mecánicamente una y otra vez. La única forma de pararlo es ir al panel de control y pulsar el interruptor de apagado (`clearInterval`).",

    fuente: "MDN Web Docs · setInterval()",

    notasPersonales: [
      "✅ Ejecuta el callback indefinidamente hasta cancelarlo.",
      "✅ El intervalo se reinicia después de cada ejecución.",
      "⚠️ Puede solaparse si el callback tarda más que el retraso.",
      "💡 Para async/await pesado, prefiere `setTimeout` recursivo.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Cuántas veces ejecuta el callback setInterval() por defecto?",
        opciones: ["Una vez", "Dos veces", "Indefinidamente hasta cancelarlo", "Ninguna"],
        correcta: 2,
      },
      {
        id: 2,
        pregunta: "¿Qué función detiene un setInterval()?",
        opciones: ["clearTimeout()", "clearInterval()", "stop()", "cancel()"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué ocurre si el callback tarda más que el intervalo?",
        opciones: [
          "Se cancela solo",
          "Las ejecuciones pueden acumularse",
          "El intervalo se hace más rápido",
          "Lanza un error",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Cuál es una alternativa recomendada para tareas asíncronas pesadas?",
        opciones: [
          "setInterval con 0 ms",
          "setTimeout recursivo",
          "clearTimeout",
          "Promise.resolve",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué devuelve setInterval()?",
        opciones: [
          "Una promesa con los ticks",
          "Un ID para cancelarlo",
          "El número de ejecuciones",
          "undefined",
        ],
        correcta: 1,
      },
    ],
  },

  clearinterval: {
    id: "clearinterval",
    titulo: "clearInterval()",
    icon: "🛑",
    categoria: "Temporizadores",
    firma: "clearInterval(intervalID)",
    simulador: "temporizador",

    definicion: [
      "Es una función global que detiene de forma inmediata y definitiva un ciclo iniciado con `setInterval()`. 🛑",
      "Recibe el identificador del intervalo y lo elimina de la cola de ejecución.",
    ],

    queEs: [
      "Es el **interruptor de apagado** de los temporizadores cíclicos. 🔌",
      "Libera los recursos asociados y evita que el callback siga enviándose a la cola de tareas.",
    ],

    paraQueSirve: [
      "⏹️ **Detener bucles de tiempo:** frenar relojes, cronómetros o animaciones.",
      "🧹 **Evitar fugas de memoria:** destruir intervalos cuando ya no son necesarios.",
      "📡 **Cortar polling:** dejar de consultar un servidor cuando ya se obtuvo la respuesta.",
      "🎮 **Pausar bucles de juego:** detener la actualización cuando el jugador pierde.",
    ],

    comoFunciona: [
      "`setInterval()` asigna un `intervalID` único al ciclo.",
      "Al llamar a `clearInterval(id)`, el motor busca ese temporizador en su registro.",
      "Si lo encuentra, lo elimina por completo.",
      "El callback deja de enviarse a la cola de tareas y el ciclo se detiene.",
      "Si el ID es inválido o ya fue cancelado, no hace nada y no lanza errores.",
    ],

    sintaxis: [
      {
        code: `const id = setInterval(callback, 1000);
clearInterval(id);`,
      },
      {
        caption: "Cuenta regresiva con parada automática:",
        code: `let restantes = 3;

const id = setInterval(() => {
  if (restantes > 0) {
    console.log("Tiempo restante: " + restantes + "s");
    restantes--;
  } else {
    console.log("🚀 ¡Despegue!");
    clearInterval(id);
  }
}, 1000);`,
      },
    ],

    nota: "💡 Inicializa tus IDs en `null` y valida antes de crear uno nuevo: `if (id) clearInterval(id)`. Así evitas intervalos duplicados por dobles clics.",

    ejemplos: [
      {
        titulo: "1. ⏳ Cuenta regresiva",
        code: `let restantes = 3;

const temporizadorId = setInterval(() => {
  console.log("⏳ " + restantes + "s");
  restantes--;

  if (restantes < 0) {
    console.log("🚀 ¡Despegue!");
    clearInterval(temporizadorId);
  }
}, 1000);`,
      },
      {
        titulo: "2. 🔁 Detener un reloj",
        code: `const reloj = setInterval(() => {
  console.log(new Date().toLocaleTimeString());
}, 1000);

setTimeout(() => {
  clearInterval(reloj);
  console.log("Reloj detenido");
}, 5000);`,
      },
      {
        titulo: "3. 🧹 Limpieza en React",
        code: `useEffect(() => {
  const id = setInterval(() => {
    // actualizar estado
  }, 1000);

  return () => clearInterval(id);
}, []);`,
      },
    ],

    errores: [
      "**No guardar el ID:** sin el valor que devuelve `setInterval()` no puedes cancelarlo.",
      "**Pasar la función en lugar del ID:** `clearInterval(miFuncion)` no detiene el ciclo.",
      "**Declarar el ID en un scope inaccesible:** si vive dentro de una función local, el botón de detener no podrá usarlo.",
      "**Confundirlo con `clearTimeout()`:** úsalo solo con intervalos creados por `setInterval()`.",
    ],

    casos: [
      "⏹️ Detener cronómetros y cuentas regresivas.",
      "📡 Cancelar polling cuando ya no se necesita.",
      "🎮 Pausar o terminar bucles de juego.",
      "🧹 Limpiar intervalos en el desmontaje de componentes.",
    ],

    relacion: [
      "**`setInterval()`:** crea el ciclo y entrega el ID que necesita `clearInterval()`.",
      "**`clearTimeout()`:** contraparte para temporizadores de ejecución única.",
      "**`useEffect`:** su limpieza es el lugar habitual para cancelar intervalos.",
    ],

    analogia:
      "El aspersor automático riega cada 10 minutos sin parar (`setInterval`). Empieza a llover fuerte y ya no necesitas agua. `clearInterval()` es caminar al panel de control y pulsar el botón rojo de apagado: el aspersor se detiene y la programación cíclica se cancela hasta que decidas encenderlo otra vez.",

    fuente: "MDN Web Docs · clearInterval()",

    notasPersonales: [
      "✅ Detiene un ciclo creado con `setInterval()`.",
      "✅ No lanza error si el ID no existe.",
      "✅ Es imprescindible para evitar memory leaks.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué recibe clearInterval()?",
        opciones: [
          "El callback del intervalo",
          "El ID devuelto por setInterval()",
          "El tiempo en milisegundos",
          "Una URL",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué ocurre si se pasa un ID inválido?",
        opciones: [
          "Lanza un TypeError",
          "No hace nada",
          "Detiene todos los intervalos",
          "Reinicia el ciclo",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Cuál es el riesgo de no llamar a clearInterval()?",
        opciones: [
          "Memory leaks y ejecuciones infinitas",
          "Que el código se vuelva síncrono",
          "Que el navegador se cierre",
          "Ninguno",
        ],
        correcta: 0,
      },
      {
        id: 4,
        pregunta: "¿Qué método crea el ciclo que detiene clearInterval()?",
        opciones: ["setTimeout()", "setInterval()", "requestAnimationFrame()", "Promise.all()"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Dónde se recomienda limpiar un intervalo en React?",
        opciones: [
          "En el HTML",
          "En la función de limpieza de useEffect",
          "En el estado",
          "Nunca",
        ],
        correcta: 1,
      },
    ],
  },
};
