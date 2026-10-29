export const CONSOLE_ERROR = {
  id: "console-error",
  titulo: "console.error()",
  icon: "❌",
  categoria: "Console API",
  firma: "console.error(objeto1 [, objeto2, ..., objetoN])",
  simulador: "mensaje",

  definicion: [
    "Es una función incorporada en JavaScript que se utiliza para emitir **mensajes de error** en la consola de depuración. 🚨",
    "Destaca el mensaje visualmente (normalmente en rojo) e incluye un **stack trace** para facilitar la localización del problema. 🧭",
  ],

  queEs: [
    "Es un método especializado del objeto global `console`. 🌐",
    "Su propósito es registrar fallos críticos, excepciones atrapadas o comportamientos inesperados que impiden el funcionamiento correcto de una parte del programa. 💥",
  ],

  paraQueSirve: [
    "🚨 **Visualizar fallos críticos:** hacer que los errores destaquen inmediatamente entre otros mensajes.",
    "🧭 **Depurar con el stack trace:** obtener la ruta exacta de archivos y funciones que se ejecutaron antes del error.",
    "🛡️ **Manejar excepciones:** registrar el error capturado dentro de bloques `try...catch` sin detener toda la aplicación.",
  ],

  comoFunciona: [
    "Cuando se llama a `console.error()`, el motor envía el mensaje a la salida de errores estándar (`stderr` en Node.js). ⚙️",
    "En los navegadores, el texto se tiñe de rojo y se le añade un icono de error. 🔴",
    "Se genera automáticamente un menú desplegable con el **stack trace** (pila de llamadas). 🧱",
    "Muestra la línea exacta donde se invocó el método, sin detener la ejecución del programa. ↩️",
  ],

  sintaxis: [
    {
      code: `console.error(objeto1 [, objeto2, ..., objetoN]);`,
    },
    {
      caption: "Acepta múltiples argumentos, variables, objetos y Template Literals:",
      code: `console.error("Error al procesar:", error);
console.error(\`No se pudo cargar el usuario \${id}\`);`,
    },
  ],

  nota: "💡 **Tip Pro:** dentro de un `catch`, pasa el objeto `error` completo como segundo argumento: `console.error(\"Mensaje\", error)`. Así conservas sus propiedades interactivas y su stack trace completo.",

  ejemplos: [
    {
      titulo: "1. 🛡️ Uso básico en un bloque try...catch",
      code: `try {
  const resultado = realizarOperacionRiesgosa();
} catch (error) {
  console.error("❌ Ocurrió un error al procesar la operación:", error);
}`,
    },
    {
      titulo: "2. 💳 Validación estricta de datos obligatorios",
      code: `function procesarPago(monto) {
  if (monto <= 0) {
    console.error(\`Error: El monto debe ser mayor a 0. Valor: \${monto}\`);
    return; // Detiene la función, pero no la app
  }
  // Continuar con el pago...
}`,
    },
  ],

  errores: [
    "😶 **No manejar el error:** usar `console.error()` solo para silenciar un error en `catch` sin solucionarlo ni reportarlo. El error se ve, pero la app puede quedar inestable.",
    "🚫 **Confundirlo con `throw new Error()`:** `console.error()` no detiene la ejecución ni lanza una excepción; solo escribe un mensaje. Si necesitas detener el programa, usa `throw`.",
    "🔐 **Exponer datos sensibles:** registrar objetos de error con contraseñas, tokens o datos privados en la consola del cliente.",
  ],

  casos: [
    "📡 **Captura global de errores:** registrar fallos inesperados en el frontend y enviarlos a servicios como Sentry o LogRocket.",
    "🌐 **Consumo de APIs:** registrar respuestas de error de red (HTTP 400, 500) cuando las peticiones fallan.",
  ],

  relacion: [
    "⚠️ **`console.warn()`:** para advertencias menores que no impiden el funcionamiento (amarillo).",
    "💥 **`throw` / `Error`:** `throw` lanza una excepción que detiene el flujo; `console.error()` suele usarse dentro del `catch` para registrarla sin romper la app.",
    "🔎 **Filtros de consola:** los mensajes de `console.error()` se agrupan bajo el filtro **Errors**.",
  ],

  analogia:
    "Imagínate que vas conduciendo tu auto. 🚗 `console.log()` es mirar el velocímetro; `console.warn()` es que se encienda la luz amarilla de la gasolina; `console.error()` es que empiece a salir humo negro del capó y se encienda la luz roja del motor. El auto puede seguir rodando unos metros por inercia, pero algo se ha roto gravemente y requiere atención inmediata. 🔥",

  fuente: "📚 MDN Web Docs — console.error()",

  notasPersonales: [
    "💡 **Tip Pro:** usa `console.error(\"Mensaje\", error)` en lugar de concatenar el error como texto.",
    "🧹 **En producción:** los errores deben enviarse a un sistema de monitoreo, no solo imprimirse.",
    "🔐 **Nunca registres** tokens, contraseñas o datos personales completos.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Qué diferencia visual principal tiene console.error()?",
      opciones: [
        "Se muestra en rojo y con stack trace",
        "Se muestra en azul",
        "No se muestra nunca",
        "Se muestra como tabla",
      ],
      correcta: 0,
    },
    {
      id: 2,
      pregunta: "¿console.error() detiene la ejecución del programa?",
      opciones: [
        "Sí, siempre",
        "No, solo registra el mensaje",
        "Solo en Node.js",
        "Solo dentro de un catch",
      ],
      correcta: 1,
    },
    {
      id: 3,
      pregunta: "¿Qué método se usa para lanzar una excepción y detener el flujo?",
      opciones: ["console.warn()", "throw", "console.info()", "console.clear()"],
      correcta: 1,
    },
    {
      id: 4,
      pregunta: "¿Cuál es la mejor forma de registrar un error en un catch?",
      opciones: [
        'console.error("Error" + error)',
        'console.error("Error", error)',
        "console.log(error.toString())",
        "console.table(error)",
      ],
      correcta: 1,
    },
  ],
};

export const CONSOLE_WARN = {
  id: "console-warn",
  titulo: "console.warn()",
  icon: "⚠️",
  categoria: "Console API",
  firma: "console.warn(objeto1 [, objeto2, ..., objetoN])",
  simulador: "mensaje",

  definicion: [
    "Es una función incorporada en JavaScript que se utiliza para emitir **mensajes de advertencia** en la consola de depuración. ⚠️",
    "A diferencia de un log común, suele incluir un icono de alerta amarillo y un fondo destacado para captar la atención. 🟡",
  ],

  queEs: [
    "Es un método especializado del objeto global `console`. 🌐",
    "Advierte sobre situaciones que **no rompen el código** ni detienen la ejecución, pero que podrían causar problemas si no se atienden. 🛠️",
  ],

  paraQueSirve: [
    "📦 **Alertar sobre depreciaciones:** avisar que una función o librería dejará de existir en próximas versiones.",
    "🚧 **Prevenir malas prácticas:** notificar parámetros con formatos subóptimos o no recomendados.",
    "🔧 **Indicar fallos menores:** registrar problemas no críticos, como una configuración opcional que usará valores por defecto.",
  ],

  comoFunciona: [
    "Funciona de manera idéntica a `console.log()`, pero el entorno le da un tratamiento visual prioritario. ⚙️",
    "En los navegadores se muestra en amarillo con un icono de advertencia. 🟡",
    "Añade automáticamente un **stack trace** desplegable para saber en qué línea se originó. 🧱",
    "No lanza una excepción ni interrumpe el flujo del programa. ↩️",
  ],

  sintaxis: [
    {
      code: `console.warn(objeto1 [, objeto2, ..., objetoN]);`,
    },
    {
      caption: "Acepta múltiples argumentos, objetos y Template Literals:",
      code: `console.warn("⚠️ Esta función está obsoleta");
console.warn(\`Timeout no definido. Usando \${5000}ms por defecto\`);`,
    },
  ],

  nota: "💡 **Tip Pro:** en Node.js o CI/CD puedes usar caracteres de escape ANSI para que tus `console.warn()` resalten en amarillo y no pasen desapercibidos durante los tests.",

  ejemplos: [
    {
      titulo: "1. 📦 Advertencia por uso de funciones antiguas",
      code: `function calcularPrecioViejo() {
  console.warn("⚠️ 'calcularPrecioViejo()' está obsoleta. Usa 'calcularPrecioNeto()'.");
  // Resto del código...
}`,
    },
    {
      titulo: "2. ⏱️ Parámetros no recomendados o valores por defecto",
      code: `function conectarServidor(opciones) {
  if (!opciones.timeout) {
    console.warn("No se definió timeout. Usando el valor por defecto: 5000ms.");
  }
}`,
    },
  ],

  errores: [
    "🙈 **Ignorarlas en la consola:** acumular decenas de advertencias amarillas que con el tiempo se convierten en errores reales.",
    "🚨 **Usarlo para errores graves:** no debe sustituir a `console.error()` ni al manejo formal con `try...catch`. Si el código se rompe, usa un error.",
    "🌊 **Saturar la consola:** poner un `console.warn()` dentro de un bucle de miles de iteraciones puede congelar la consola.",
  ],

  casos: [
    "⚛️ **Creadores de librerías y frameworks:** React o Vue lo usan para avisar cuando pasas una prop incorrecta.",
    "🔄 **Migraciones de código:** marcar rutas, APIs o componentes antiguos que el equipo debe dejar de usar.",
  ],

  relacion: [
    "🖨️ **`console.log()`:** información general de depuración en texto plano.",
    "❌ **`console.error()`:** fallos críticos en rojo que deben solucionarse de inmediato.",
    "🔎 **Filtros de consola:** `console.warn()` aparece bajo la categoría **Warnings**.",
  ],

  analogia:
    "Imagina que estás conduciendo tu auto. 🚗 `console.log()` es mirar el velocímetro; `console.error()` es que el motor se apague en seco; `console.warn()` es la luz amarilla de la gasolina parpadeando: el auto sigue andando, pero te avisa que si no haces algo pronto tendrás un problema. ⛽",

  fuente: "📚 MDN Web Docs — console.warn()",

  notasPersonales: [
    "💡 **Tip Pro:** no ignores las advertencias: suelen anticipar errores futuros.",
    "🧹 **En producción:** filtra o elimina advertencias ruidosas para no saturar la consola.",
    "🎨 **Consola del navegador:** revisa el filtro **Warnings** para verlas todas.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Qué color suele usar console.warn() en los navegadores?",
      opciones: ["Rojo", "Amarillo", "Azul", "Verde"],
      correcta: 1,
    },
    {
      id: 2,
      pregunta: "¿Cuándo deberías usar console.warn()?",
      opciones: [
        "Para fallos críticos que rompen la app",
        "Para situaciones no críticas que podrían causar problemas",
        "Para medir tiempos",
        "Para limpiar la consola",
      ],
      correcta: 1,
    },
    {
      id: 3,
      pregunta: "¿console.warn() detiene la ejecución?",
      opciones: [
        "Sí, lanza una excepción",
        "No, solo muestra una advertencia",
        "Solo en Node.js",
        "Depende del navegador",
      ],
      correcta: 1,
    },
  ],
};

export const CONSOLE_INFO = {
  id: "console-info",
  titulo: "console.info()",
  icon: "ℹ️",
  categoria: "Console API",
  firma: "console.info(objeto1 [, objeto2, ..., objetoN])",
  simulador: "mensaje",

  definicion: [
    "Es una función incorporada en JavaScript que se utiliza para emitir **mensajes informativos** en la consola de depuración. ℹ️",
    "Su propósito es separar visual o conceptualmente los mensajes informativos de los logs estándar de depuración. 🗂️",
  ],

  queEs: [
    "Es un método del objeto global `console`. 🌐",
    "En muchos entornos modernos su comportamiento es casi idéntico a `console.log()`, pero semánticamente denota **información relevante** sobre el estado o los hitos del sistema. 📌",
  ],

  paraQueSirve: [
    "🗂️ **Segmentar la información:** clasificar mensajes para que otros desarrolladores entiendan que es un evento informativo.",
    "🔎 **Filtrar logs:** usar los filtros nativos de las DevTools para mostrar u ocultar mensajes según su nivel.",
    "🏁 **Registrar hitos:** dejar constancia de que un proceso importante se completó con éxito.",
  ],

  comoFunciona: [
    "Envía los argumentos pasados a la salida de depuración, igual que `console.log()`. ⚙️",
    "En algunos navegadores históricos añade un pequeño icono de información (ⓘ). ℹ️",
    "En Chrome o Firefox el mensaje se puede filtrar bajo la categoría **Info** o **User Messages**. 🔎",
    "No modifica el flujo del programa ni devuelve un valor útil. ↩️",
  ],

  sintaxis: [
    {
      code: `console.info(objeto1 [, objeto2, ..., objetoN]);`,
    },
    {
      caption: "Soporta múltiples argumentos, formato y Template Literals:",
      code: `console.info("ℹ️ Aplicación inicializada en el puerto 3000.");
console.info(\`Iniciando descarga para el usuario: \${usuario.id}\`);`,
    },
  ],

  nota: "💡 **Tip Pro:** en arquitecturas de microservicios, herramientas como Winston o Pino mapean `console.info()` al nivel **INFO** de los archivos del servidor, facilitando analíticas de uso.",

  ejemplos: [
    {
      titulo: "1. 🚀 Registrar el inicio exitoso de un servicio",
      code: `function inicializarApp() {
  // Código de inicialización...
  console.info("ℹ️ Aplicación inicializada correctamente en el puerto 3000.");
}`,
    },
    {
      titulo: "2. 📥 Informar sobre el estado de una descarga",
      code: `function descargarHistorial(usuario) {
  console.info(\`Iniciando la descarga del historial para: \${usuario.id}\`);
  // Lógica de descarga...
}`,
    },
  ],

  errores: [
    "🎨 **Confundirlo con un sustituto estético de log:** en la mayoría de navegadores la diferencia es semántica y de filtrado, no visual.",
    "🚀 **Dejarlo en producción sin control:** los mensajes informativos tampoco deben saturar la consola del cliente final.",
    "🚨 **Usarlo para errores o alertas:** si algo requiere atención inmediata, usa `console.warn()` o `console.error()`.",
  ],

  casos: [
    "📦 **Mensajes de carga de scripts:** informar que una librería de terceros se cargó correctamente.",
    "🏗️ **Auditoría de flujos altos:** separar pruebas rápidas de variables (`console.log`) de notificaciones estructurales del sistema (`console.info`).",
  ],

  relacion: [
    "🖨️ **`console.log()`:** nivel general para cualquier cosa durante el desarrollo.",
    "🔎 **Filtros de consola:** las DevTools dividen los mensajes en **Verbose**, **Info**, **Warnings** y **Errors**; `console.info()` responde al filtro Info.",
  ],

  analogia:
    "Imagínate que vas en un avión. ✈️ `console.log()` sería mirar la pantalla para ver cuántos minutos faltan; `console.error()` sería que se enciendan las máscaras de oxígeno; `console.info()` es la voz del capitán diciendo: «Acabamos de alcanzar nuestra altitud de crucero y el clima en destino es despejado». No es una alerta, es una actualización del estado del viaje. 🎙️",

  fuente: "📚 MDN Web Docs — console.info()",

  notasPersonales: [
    "💡 **Tip Pro:** usa `console.info()` para hitos del sistema y `console.log()` para datos temporales.",
    "🏷️ **Etiquetas:** añade un prefijo como `[INFO]` para facilitar búsquedas.",
    "🧹 **Producción:** controla su salida con el nivel de log de tu herramienta.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Para qué sirve principalmente console.info()?",
      opciones: [
        "Para errores críticos",
        "Para mensajes informativos e hitos del sistema",
        "Para medir tiempos",
        "Para limpiar la consola",
      ],
      correcta: 1,
    },
    {
      id: 2,
      pregunta: "¿En qué categoría de filtro suele aparecer console.info()?",
      opciones: ["Errors", "Warnings", "Info", "Table"],
      correcta: 2,
    },
    {
      id: 3,
      pregunta: "¿console.info() detiene la ejecución si hay un problema?",
      opciones: [
        "Sí, lanza una excepción",
        "No, solo registra información",
        "Solo en Node.js",
        "Solo si se usa con strings",
      ],
      correcta: 1,
    },
  ],
};

export const CONSOLE_DEBUG = {
  id: "console-debug",
  titulo: "console.debug()",
  icon: "🐞",
  categoria: "Console API",
  firma: "console.debug(objeto1 [, objeto2, ..., objetoN])",
  simulador: "mensaje",

  definicion: [
    "Es una función incorporada en JavaScript que se utiliza para emitir **mensajes de depuración de bajo nivel** en la consola. 🐞",
    "Está diseñado para mensajes puramente técnicos que solo son útiles durante la fase de desarrollo activo. 🔬",
  ],

  queEs: [
    "Es un método del objeto global `console`. 🌐",
    "Es idéntico en funcionalidad a `console.log()`, pero tiene una **prioridad semántica menor**. 📉",
    "En la mayoría de navegadores modernos sus mensajes están ocultos por defecto y solo aparecen al activar el nivel **Verbose**. 👁️",
  ],

  paraQueSirve: [
    "🔇 **Reducir el ruido:** dejar mensajes de depuración minuciosos sin saturar la consola, ya que vienen ocultos por defecto.",
    "🔬 **Inspección de bajo nivel:** registrar cambios de estado muy frecuentes, bucles intensos o respuestas detalladas.",
    "🧩 **Separar entornos:** mantener logs técnicos que solo se revisan de vez en cuando sin borrarlos.",
  ],

  comoFunciona: [
    "Envía los argumentos a la consola bajo el nivel de severidad **Verbose** o **Debug**. ⚙️",
    "Si las DevTools tienen desactivado ese filtro, el mensaje se ignora visualmente, aunque el código se sigue ejecutando. 🙈",
    "En Node.js se comporta exactamente igual que `console.log()`. 🖥️",
    "No devuelve un valor útil ni altera el flujo del programa. ↩️",
  ],

  sintaxis: [
    {
      code: `console.debug(objeto1 [, objeto2, ..., objetoN]);`,
    },
    {
      caption: "Acepta múltiples argumentos, variables, objetos y Template Literals:",
      code: `console.debug(\`[Coordenadas] X: \${x}, Y: \${y}\`);
console.debug("Paso 1 completado. Elementos restantes:", limpios.length);`,
    },
  ],

  nota: "💡 **Tip Pro:** en Chrome abre el menú **Default levels**, junto al buscador de la consola, y marca **Verbose**. Entonces verás tus `console.debug()` en gris claro, diferenciados del resto. 🎨",

  ejemplos: [
    {
      titulo: "1. 🖱️ Monitoreo de un evento de alta frecuencia",
      code: `function actualizarPosicionMouse(x, y) {
  // Se ejecuta cientos de veces por segundo
  console.debug(\`[Coordenadas] X: \${x}, Y: \${y}\`);
  // Lógica para mover el elemento...
}`,
    },
    {
      titulo: "2. 🔬 Inspección del flujo interno de una función",
      code: `function procesarMatriz(datos) {
  console.debug("Iniciando paso 1: Filtrado de nulos");
  const limpios = datos.filter(d => d !== null);
  console.debug(\`Paso 1 completado. Elementos restantes: \${limpios.length}\`);
  // ... resto del proceso
}`,
    },
  ],

  errores: [
    "🙈 **Pensar que no funciona:** escribir `console.debug()`, recargar y no ver nada porque el filtro **Verbose** está desactivado.",
    "🖨️ **Confundirlo con `console.log()`:** si el mensaje es importante para entender el flujo general, usa `console.log()` o `console.info()`.",
    "🌊 **Saturar con logs de alta frecuencia:** incluso ocultos, se ejecutan y pueden afectar el rendimiento si son masivos.",
  ],

  casos: [
    "🧩 **Desarrollo de librerías complejas:** registrar cómo muta el estado interno de un componente o de un state manager.",
    "🌐 **Logs de red de bajo nivel:** registrar cada pequeño paquete enviado o recibido por un WebSocket.",
  ],

  relacion: [
    "🖨️ **`console.log()`:** nivel general e intermedio de información, siempre visible.",
    "🔎 **Filtros de consola:** activa **Verbose** o **Debug** en el menú **Log level** para ver los mensajes.",
  ],

  analogia:
    "Imagínate que estás construyendo una casa. 🏠 `console.info()` es el cartel de la entrada que dice «Obra en construcción»; `console.log()` son los planos principales que revisa el arquitecto; `console.debug()` son las marcas con lápiz que hace el carpintero sobre la madera para saber por dónde cortar. Al cliente no le interesan esas marcas, pero para el carpintero son fundamentales. ✏️",

  fuente: "📚 MDN Web Docs — console.debug()",

  notasPersonales: [
    "💡 **Tip Pro:** activa el nivel **Verbose** en las DevTools para ver estos mensajes.",
    "🎨 **Chrome:** aparecen en gris claro, diferenciados de los logs normales.",
    "🧹 **Producción:** elimina o filtra los logs de depuración de alta frecuencia.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Por qué no se ven los console.debug() por defecto en el navegador?",
      opciones: [
        "Porque son errores",
        "Porque el nivel Verbose está desactivado",
        "Porque solo funcionan en Node.js",
        "Porque borran la consola",
      ],
      correcta: 1,
    },
    {
      id: 2,
      pregunta: "¿A qué método se parece funcionalmente console.debug()?",
      opciones: ["console.table()", "console.log()", "console.clear()", "console.assert()"],
      correcta: 1,
    },
    {
      id: 3,
      pregunta: "¿Qué nivel de filtro hay que activar para verlos?",
      opciones: ["Errors", "Warnings", "Info", "Verbose / Debug"],
      correcta: 3,
    },
  ],
};
