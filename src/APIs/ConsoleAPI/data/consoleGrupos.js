export const CONSOLE_GROUP = {
  id: "console-group",
  titulo: "console.group()",
  icon: "📂",
  categoria: "Console API",
  firma: "console.group([label])",
  simulador: "grupo",

  definicion: [
    "Es una función incorporada en JavaScript que permite agrupar visualmente múltiples mensajes en la consola bajo un **bloque jerárquico desplegable**. 📂",
    "Sangra todos los logs posteriores para estructurar datos complejos de forma ordenada. 🪜",
  ],

  queEs: [
    "Es un método de organización e indentación del objeto global `console`. 🌐",
    "Funciona como una carpeta o contenedor visual en la consola del desarrollador. 🗂️",
    "Cada grupo debe cerrarse con `console.groupEnd()` para volver al nivel anterior. 🔚",
  ],

  paraQueSirve: [
    "🌪️ **Reducir el caos visual:** organizar la consola cuando una acción dispara múltiples logs.",
    "🧱 **Crear jerarquías claras:** estructurar la información simulando carpetas o subniveles.",
    "🔬 **Depuración estructurada:** aislar los logs de un componente o función de los logs globales.",
  ],

  comoFunciona: [
    "Crea una nueva sección en la consola con el título asignado y una flecha desplegable (▼). ⚙️",
    "Aplica sangría a todos los comandos de consola que se ejecuten después. ➡️",
    "Para cerrar el grupo se debe invocar `console.groupEnd()`. 🔚",
    "Los grupos pueden anidarse, creando subniveles dentro de otros grupos. 🪆",
  ],

  sintaxis: [
    {
      code: `console.group([label]);`,
    },
    {
      caption: "El label es opcional y sirve como título del grupo:",
      code: `console.group("🔑 Proceso de Autenticación");
console.log("Enviando credenciales...");
console.warn("Tiempo de respuesta elevado.");
console.groupEnd();`,
    },
  ],

  nota: "💡 **Tip Pro:** combina `console.group()` con `console.table()`. Al meter una tabla dentro de un bloque desplegable, tu consola pasa de ser un muro de texto a un panel de control organizado.",

  ejemplos: [
    {
      titulo: "1. 🔑 Estructurar el reporte de una petición de API",
      code: `function autenticarUsuario() {
  console.group("🔑 Proceso de Autenticación");
  console.log("Enviando credenciales al servidor...");
  console.warn("Tiempo de respuesta de red elevado.");
  console.log("Usuario autenticado con ID: #9832");
  console.groupEnd();

  console.log("Flujo fuera del grupo.");
}

autenticarUsuario();`,
    },
    {
      titulo: "2. 🛒 Grupos anidados (subgrupos)",
      code: `console.group("🛒 Carrito de Compras");
console.log("Items agregados: 2");

console.group("📦 Detalle Producto #1");
console.log("Nombre: Laptop Pro 16");
console.log("Precio: $1500");
console.groupEnd(); // Cierra Producto #1

console.groupEnd(); // Cierra Carrito`,
    },
  ],

  errores: [
    "🔓 **Olvidar `console.groupEnd()`:** todo el resto de logs se imprimirá dentro de ese grupo con sangría perpetua.",
    "🪆 **Abusar de la anidación:** demasiados niveles distorsionan el diseño horizontal y vuelven ilegible la consola.",
    "📂 **Abrir grupos en bucles sin cerrarlos:** la consola acumula cientos de bloques y puede ralentizarse.",
  ],

  casos: [
    "⚛️ **Ciclos de vida en frameworks:** agrupar logs de montaje, actualización y desmontaje de un componente.",
    "🗃️ **State management:** librerías como Redux Logger agrupan la acción, el estado anterior y el nuevo estado.",
  ],

  relacion: [
    "🔚 **`console.groupEnd()`:** método de cierre que restaura la sangría anterior.",
    "📁 **`console.groupCollapsed()`:** igual que `group()`, pero el bloque aparece cerrado por defecto.",
    "📊 **`console.table()`:** se puede combinar para mostrar datos dentro del grupo.",
  ],

  analogia:
    "Imagínate que estás escribiendo un esquema en un cuaderno. 📓 Si escribes todas las notas en filas continuas sin márgenes, se vuelve difícil de leer. `console.group()` es escribir un título principal y empezar a usar viñetas con sangría para los subtítulos y detalles. Todo lo que pongas ahí pertenece a ese tema. ✍️",

  fuente: "📚 MDN Web Docs — console.group()",

  notasPersonales: [
    "💡 **Tip Pro:** usa grupos para separar los logs de cada petición o componente.",
    "🔚 **Cierra siempre** cada grupo con `console.groupEnd()`.",
    "📁 **Para logs largos:** prueba `console.groupCollapsed()`.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Qué hace console.group() con los logs posteriores?",
      opciones: [
        "Los elimina",
        "Les aplica sangría dentro del grupo",
        "Los convierte en errores",
        "Los muestra como tabla",
      ],
      correcta: 1,
    },
    {
      id: 2,
      pregunta: "¿Qué método cierra un grupo abierto?",
      opciones: [
        "console.clear()",
        "console.groupEnd()",
        "console.close()",
        "console.end()",
      ],
      correcta: 1,
    },
    {
      id: 3,
      pregunta: "¿Qué diferencia tiene console.groupCollapsed()?",
      opciones: [
        "El grupo aparece cerrado por defecto",
        "No permite logs dentro",
        "Solo funciona en Node.js",
        "Borra los logs anteriores",
      ],
      correcta: 0,
    },
  ],
};

export const CONSOLE_GROUP_END = {
  id: "console-group-end",
  titulo: "console.groupEnd()",
  icon: "🔚",
  categoria: "Console API",
  firma: "console.groupEnd()",
  simulador: "grupo",

  definicion: [
    "Es una función incorporada en JavaScript que cierra el **grupo jerárquico visual** abierto previamente con `console.group()` o `console.groupCollapsed()`. 🔚",
    "Reduce un nivel de sangría para que los logs posteriores vuelvan al flujo normal. ⬅️",
  ],

  queEs: [
    "Es el método de cierre del ecosistema de organización del objeto global `console`. 🌐",
    "Su única función es indicar que el bloque actual de mensajes ha terminado. 🗂️",
    "Trabaja con una estructura de pila (LIFO): cierra siempre el grupo más interno. 🥞",
  ],

  paraQueSirve: [
    "✅ **Finalizar bloques visuales:** delimitar con precisión el final de una agrupación de mensajes.",
    "📐 **Restaurar el formato:** evitar que los logs posteriores queden atrapados en una sangría que no les corresponde.",
    "🧹 **Mantener limpio el código:** estructurar de forma profesional reportes técnicos por etapas.",
  ],

  comoFunciona: [
    "Revisa la pila interna de grupos abiertos en el hilo de ejecución. ⚙️",
    "Si encuentra un grupo activo, resta un nivel de sangría moviendo el margen a la izquierda. ⬅️",
    "Si hay subgrupos anidados, cierra el subgrupo más interno. 🪆",
    "Si no hay ningún grupo abierto, ignora el comando sin lanzar errores. 🤫",
  ],

  sintaxis: [
    {
      code: `console.groupEnd();`,
      caption: "No recibe argumentos. Si le pasas texto o variables, se ignoran.",
    },
  ],

  nota: "💡 **Tip Pro:** en flujos asíncronos, coloca `console.groupEnd()` tanto al final del `.then()` como dentro del `.catch()`. Si la promesa falla y no cierras en el error, la consola queda atrapada con sangría.",

  ejemplos: [
    {
      titulo: "1. 🔒 Aislar logs de una función",
      code: `function verificarSeguridad() {
  console.group("🔒 Chequeo de Seguridad");
  console.log("Validando token JWT...");
  console.log("Permisos de administrador: OK");
  console.groupEnd();

  console.log("Este mensaje se imprime fuera del grupo.");
}

verificarSeguridad();`,
    },
    {
      titulo: "2. 🪆 Cierre secuencial en subgrupos anidados",
      code: `console.group("🌍 Conexión Base de Datos");
console.log("Conectando al cluster principal...");

console.group("🔐 Autenticación DB");
console.log("Handshake completado.");
console.groupEnd(); // Cierra el subgrupo interno

console.log("Conexión establecida con éxito.");
console.groupEnd(); // Cierra el grupo principal`,
    },
  ],

  errores: [
    "🙈 **Olvidarlo por completo:** todos los logs posteriores se imprimen dentro del grupo con sangría perpetua.",
    "🏷️ **Pasarle una etiqueta:** `console.groupEnd()` no busca nombres; cierra el último grupo abierto. El texto se ignora.",
    "🪆 **Cerrar en el orden incorrecto:** recuerda que funciona como una pila LIFO: primero el subgrupo más interno.",
  ],

  casos: [
    "🚀 **Scripts de inicialización:** agrupar los pasos de carga de variables de entorno y cerrar cuando el servidor está listo.",
    "🧩 **Plugins y herramientas:** empaquetar reportes extensos que se muestran al usuario en la consola.",
  ],

  relacion: [
    "📂 **`console.group()` / `console.groupCollapsed()`:** abren los contenedores visuales que `groupEnd()` cierra.",
    "🥞 **Pila de ejecución:** el motor gestiona los grupos usando una pila LIFO.",
    "📐 **Sangría:** cada `groupEnd()` reduce un nivel de indentación.",
  ],

  analogia:
    "Usaste `console.group()` para escribir un título y mover el lápiz a la derecha con viñetas. 🔚 `console.groupEnd()` es terminar esa sección, bajar al siguiente renglón y mover el lápiz de vuelta al margen izquierdo para continuar con las anotaciones generales. 📓",

  fuente: "📚 MDN Web Docs — console.groupEnd()",

  notasPersonales: [
    "💡 **Tip Pro:** cierra grupos también en los caminos de error (`.catch`).",
    "🏷️ **No acepta etiquetas:** cierra el último grupo abierto.",
    "🥞 **LIFO:** primero se cierra el subgrupo más interno.",
  ],

  quiz: [
    {
      id: 1,
      pregunta: "¿Qué argumentos acepta console.groupEnd()?",
      opciones: [
        "Una etiqueta obligatoria",
        "Un objeto de configuración",
        "Ninguno",
        "Un número de nivel",
      ],
      correcta: 2,
    },
    {
      id: 2,
      pregunta: "¿Qué grupo cierra console.groupEnd() si hay varios anidados?",
      opciones: [
        "El primero que se abrió",
        "El más interno (último abierto)",
        "El que coincida con la etiqueta",
        "Todos a la vez",
      ],
      correcta: 1,
    },
    {
      id: 3,
      pregunta: "¿Qué pasa si se llama sin grupos abiertos?",
      opciones: [
        "Lanza un error",
        "Se ignora sin errores",
        "Limpia la consola",
        "Abre un grupo nuevo",
      ],
      correcta: 1,
    },
  ],
};
