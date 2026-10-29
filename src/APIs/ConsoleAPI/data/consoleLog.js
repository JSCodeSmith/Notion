export const CONSOLE_LOG = {
  id: "console-log",
  titulo: "console.log()",
  icon: "🖨️",
  categoria: "Console API",
  firma: "console.log(objeto1 [, objeto2, ..., objetoN])",
  simulador: "console-log",

  definicion: [
    "Es una función incorporada en JavaScript que se utiliza para imprimir mensajes, variables, objetos o cualquier tipo de dato en la **consola del depurador** (las Herramientas de Desarrollador del navegador o la terminal de Node.js). 🖨️",
  ],

  queEs: [
    "Es un método que pertenece al objeto global `console`. 🌐",
    "Es la herramienta de diagnóstico y depuración más básica, popular y accesible para cualquier persona que escribe JavaScript. 🧰",
  ],

  paraQueSirve: [
    "🐞 **Depurar código:** inspeccionar el flujo de ejecución y verificar si el código llega a ciertos puntos.",
    "🔍 **Verificar valores:** comprobar el contenido de variables, arreglos u objetos en tiempo de ejecución.",
    "🧭 **Entender errores:** rastrear comportamientos inesperados imprimiendo estados intermedios.",
  ],

  comoFunciona: [
    "El motor de JavaScript ejecuta la línea `console.log()`. ⚙️",
    "Toma los argumentos que le pasaste y los convierte en una representación legible. 🔄",
    "Envía esa representación a la salida estándar de depuración, que es la consola. 🖥️",
    "Devuelve `undefined`, porque su objetivo es mostrar información, no producir un valor. ↩️",
  ],

  sintaxis: [
    {
      code: `console.log(objeto1 [, objeto2, ..., objetoN]);`,
    },
    {
      caption: "Puede recibir un único elemento o múltiples elementos separados por comas:",
      code: `console.log("Hola");
console.log("Nombre del usuario:", nombre, "Edad:", edad);`,
    },
    {
      caption: "También admite Template Literals y especificadores de formato (%s, %d, %o):",
      code: `console.log(\`Hola, mi nombre es \${nombre}\`);
console.log("Me llamo %s y tengo %d años", nombre, edad);`,
    },
  ],

  nota: "💡 **Tip Pro:** añade una etiqueta descriptiva al principio, por ejemplo `console.log('👉 [USER_DATA]:', userData)`. Te ahorrará mucho tiempo buscando de dónde viene ese log misterioso en una consola llena de líneas.",

  ejemplos: [
    {
      titulo: "1. 🖨️ Imprimir un mensaje simple y variables",
      code: `const nombre = "Satoshi";
const edad = 35;

console.log("Nombre del usuario:", nombre, "Edad:", edad);
// Salida: Nombre del usuario: Satoshi Edad: 35`,
    },
    {
      titulo: "2. ✨ Imprimir usando Template Literals (Recomendado)",
      code: `console.log(\`Hola, mi nombre es \${nombre} y tengo \${edad} años.\`);
// Salida: Hola, mi nombre es Satoshi y tengo 35 años.`,
    },
    {
      titulo: "3. 🔑 Imprimir objetos de forma clara (Truco de las llaves)",
      descripcion:
        "Si envuelves la variable entre llaves `{}`, se imprimirá como un objeto con su nombre y valor.",
      code: `const config = { puerto: 8080, host: "localhost" };

console.log({ config });
// Salida: { config: { puerto: 8080, host: "localhost" } }`,
    },
  ],

  errores: [
    "🚨 **Olvidarlo en producción:** dejar `console.log` activos en una aplicación desplegada puede exponer datos sensibles de los usuarios o saturar la consola del cliente.",
    "⏱️ **Asumir que es sincrónico:** en algunos entornos, o con objetos extremadamente grandes, la consola puede mostrar el **estado actualizado** del objeto y no el estado exacto del momento en que se llamó al log. Para evitarlo con objetos, usa `console.log(JSON.parse(JSON.stringify(objeto)))`.",
    "🧰 **Abusar de él para depurar:** usar `console.log` para todo en lugar de aprender a usar el depurador (`debugger` o breakpoints del navegador) puede volverse lento en problemas complejos.",
  ],

  casos: [
    "🧪 **Pruebas rápidas:** validar que una API externa está devolviendo la estructura de datos correcta.",
    "🔀 **Flujo lógico:** verificar si un bloque `if` o `else` se está ejecutando como se espera.",
    "🖥️ **Monitoreo básico en Backend:** en aplicaciones Node.js sencillas, registrar eventos en la terminal.",
  ],

  relacion: [
    "🔴 **`console.error()` / `console.warn()`:** hermanos de `console.log()`. Sirven para mostrar mensajes de error (rojo) o advertencias (amarillo) visualmente diferenciados.",
    "📊 **`console.table()`:** ideal para imprimir arreglos de objetos en un formato de tabla interactiva y limpia.",
    "🐞 **`debugger`:** la palabra clave de JavaScript que detiene la ejecución del código en el navegador para que puedas inspeccionar todo el entorno sin necesidad de escribir mil `console.log`.",
  ],

  analogia:
    "Imagínate que estás cocinando siguiendo una receta a ciegas. 🍲 `console.log()` es como destapar la olla por un segundo para probar el sabor del caldo, ver si ya hirvió o revisar si el color es el adecuado antes de seguir cocinando. No cambia la receta, pero te da la seguridad de que vas por buen camino. 👨‍🍳",

  fuente: "📚 MDN Web Docs — console.log()",

  notasPersonales: [
    "💡 **Tip Pro:** usa etiquetas descriptivas como `console.log('👉 [USER_DATA]:', userData)` para encontrar cada log fácilmente.",
    "🧊 **Para congelar objetos:** `console.log(JSON.parse(JSON.stringify(objeto)))` guarda una copia del estado actual.",
    "🧹 **Antes de producción:** elimina o desactiva los `console.log` de depuración para no exponer datos sensibles.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿A qué objeto pertenece el método console.log()?",
      opciones: ["console", "window", "document", "log"],
      correcta: 0,
    },
    {
      id: 2,
      pregunta: "¿Qué devuelve console.log()?",
      opciones: [
        "El texto impreso",
        "undefined",
        "true",
        "El objeto que recibió",
      ],
      correcta: 1,
    },
    {
      id: 3,
      pregunta:
        "¿Cómo se imprime un objeto mostrando también el nombre de la variable?",
      opciones: [
        "console.log(config)",
        "console.log([config])",
        "console.log({ config })",
        "console.log(config.name)",
      ],
      correcta: 2,
    },
    {
      id: 4,
      pregunta:
        "¿Por qué la consola puede mostrar un objeto con un estado posterior al del log?",
      opciones: [
        "Porque console.log es asíncrono siempre",
        "Porque la consola guarda una referencia al objeto",
        "Porque JavaScript copia los objetos automáticamente",
        "Porque el navegador bloquea la ejecución",
      ],
      correcta: 1,
    },
    {
      id: 5,
      pregunta:
        "¿Qué método de console muestra arreglos de objetos en formato de tabla?",
      opciones: ["console.log()", "console.warn()", "console.table()", "console.error()"],
      correcta: 2,
    },
  ],
};
