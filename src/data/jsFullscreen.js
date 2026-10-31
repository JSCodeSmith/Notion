export const JS_FULLSCREEN = {
  id: "pantalla-completa",
  label: "Pantalla completa",
  icon: "🖥️",
  titulo: "Fullscreen API",
  descripcion:
    "Pon un elemento a pantalla completa y sal de ella de forma programática. Ideal para vídeos, juegos, galerías y presentaciones.",
  grupos: [
    {
      seccion: "Entrar y salir",
      metodos: [
        {
          id: "fullscreen-request",
          nombre: "requestFullscreen()",
          firma: "elemento.requestFullscreen(opciones) → Promise<void>",
          icon: "⛶",
        },
        {
          id: "fullscreen-exit",
          nombre: "document.exitFullscreen()",
          firma: "document.exitFullscreen() → Promise<void>",
          icon: "🚪",
        },
      ],
    },
  ],
};

export const JS_FULLSCREEN_DOCS = {
  "fullscreen-request": {
    id: "fullscreen-request",
    titulo: "requestFullscreen()",
    icon: "⛶",
    categoria: "Fullscreen API · Entrar",
    firma: "elemento.requestFullscreen(opciones) → Promise<void>",
    simulador: "fullscreen",

    definicion: [
      "Es un método del DOM que solicita poner **un elemento concreto** en modo pantalla completa, ocupando toda la pantalla sin los controles del navegador. ⛶",
      "A diferencia de F11, que expande toda la ventana, `requestFullscreen()` permite elegir el elemento: un vídeo, un canvas, un div…",
    ],

    queEs: [
      "Es la forma estándar de activar fullscreen desde JavaScript. 🖥️",
      "Requiere una **interacción del usuario**: un clic o una tecla.",
      "Devuelve una `Promise<void>` que se resuelve cuando el modo se activa.",
      "Solo un elemento puede estar en pantalla completa a la vez.",
      "Necesita contexto seguro (`https://` o `localhost`).",
    ],

    paraQueSirve: [
      "🎬 Reproductores de vídeo a pantalla completa.",
      "🎮 Juegos en canvas o WebGL.",
      "🖼️ Galerías de imágenes inmersivas.",
      "📊 Presentaciones y dashboards.",
      "📖 Lectores de documentos sin distracciones.",
      "🎨 Editores gráficos.",
      "📺 Streaming en vivo.",
      "🎓 Modo conferencia o clases.",
    ],

    comoFunciona: [
      "Se llama sobre un elemento (o `document.documentElement`).",
      "El navegador comprueba que haya interacción del usuario y contexto seguro.",
      "También verifica que el elemento esté en el DOM.",
      "Si todo está correcto, expande el elemento a toda la pantalla.",
      "Devuelve una promesa que resuelve al entrar o rechaza si falla.",
      "Se dispara el evento `fullscreenchange`.",
    ],

    sintaxis: [
      {
        code: `elemento.requestFullscreen();`,
      },
      {
        caption: "Con opciones de navegación:",
        code: `elemento.requestFullscreen({ navigationUI: "hide" });`,
      },
      {
        caption: "Con async/await:",
        code: `async function entrar(elemento) {
  try {
    await elemento.requestFullscreen();
    console.log("Pantalla completa activada");
  } catch (error) {
    console.error("No se pudo activar:", error.message);
  }
}`,
      },
    ],

    nota: "💡 No funciona automáticamente al cargar la página: el navegador exige un gesto del usuario. Llámalo dentro de un `click` o un `keydown`.",

    ejemplos: [
      {
        titulo: "1. ⛶ Fullscreen básico",
        code: `const video = document.querySelector("video");

video.requestFullscreen()
  .then(() => console.log("Pantalla completa activada"))
  .catch((error) => console.error("Error:", error.message));`,
      },
      {
        titulo: "2. 🖱️ Botón de pantalla completa",
        code: `const caja = document.querySelector("#caja");
const boton = document.querySelector("#btn-fs");

boton.addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    caja.requestFullscreen();
  }
});`,
      },
      {
        titulo: "3. 🔁 Alternar con async/await",
        code: `async function alternarFullscreen(elemento = document.documentElement) {
  try {
    if (!document.fullscreenElement) {
      await elemento.requestFullscreen();
    } else {
      await document.exitFullscreen();
    }
  } catch (error) {
    console.error(error.message);
  }
}`,
      },
      {
        titulo: "4. 👀 Escuchar cambios de estado",
        code: `document.addEventListener("fullscreenchange", () => {
  const activo = Boolean(document.fullscreenElement);

  document.body.classList.toggle("en-fullscreen", activo);
  console.log(activo ? "Entró en fullscreen" : "Salió de fullscreen");
});`,
      },
      {
        titulo: "5. 🚫 Comprobar soporte",
        code: `if (document.fullscreenEnabled) {
  document.documentElement.requestFullscreen();
} else {
  console.log("Fullscreen no está permitido");
}`,
      },
    ],

    errores: [
      "**Llamarlo sin gesto del usuario:** el navegador lo rechaza.",
      "**Usarlo en HTTP:** requiere contexto seguro.",
      "**Llamarlo sobre un elemento fuera del DOM:** falla.",
      "**Esperar que devuelva el elemento:** devuelve una `Promise<void>`.",
      "**Olvidar el `catch`:** el rechazo queda sin manejar.",
      "**Asumir que funciona en iOS:** el soporte es limitado.",
      "**Llamarlo dos veces seguidas:** solo un elemento puede estar en fullscreen.",
    ],

    casos: [
      "🎬 Reproductores de vídeo.",
      "🎮 Juegos en canvas.",
      "🖼️ Visores de imágenes.",
      "📊 Dashboards en modo presentación.",
      "📖 Lectores de documentos.",
      "🎓 Clases y videoconferencias.",
    ],

    relacion: [
      "**`document.exitFullscreen()`:** sale del modo.",
      "**`document.fullscreenElement`:** elemento que está en fullscreen o `null`.",
      "**`document.fullscreenEnabled`:** indica si está permitido.",
      "**Evento `fullscreenchange`:** avisa al entrar o salir.",
      "**Evento `fullscreenerror`:** avisa si falla el intento.",
      "**`navigationUI`:** controla si se ocultan las barras de navegación.",
    ],

    analogia:
      "Es como subir una lámina a un proyector de diapositivas 📽️: eliges qué elemento quieres proyectar y el navegador lo agranda hasta ocupar toda la pantalla, ocultando los controles. Pero el proyector solo se enciende si alguien pulsa el botón: no se enciende solo al entrar en la sala.",

    fuente: "MDN Web Docs · Fullscreen API · Element.requestFullscreen()",

    notasPersonales: [
      "✅ Se llama sobre el elemento que quieres expandir.",
      "✅ Devuelve una `Promise<void>` y requiere gesto del usuario.",
      "⚠️ Necesita HTTPS o localhost y el elemento debe estar en el DOM.",
      "✅ Escucha `fullscreenchange` para sincronizar la interfaz.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Sobre qué se llama requestFullscreen()?",
        opciones: [
          "Sobre document",
          "Sobre el elemento que se quiere expandir",
          "Sobre window",
          "Sobre el Service Worker",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve requestFullscreen()?",
        opciones: ["El elemento", "Una Promise<void>", "true", "undefined"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué requisito de seguridad exige?",
        opciones: [
          "Un gesto del usuario y contexto seguro",
          "Una cookie de sesión",
          "localStorage lleno",
          "Un iframe",
        ],
        correcta: 0,
      },
      {
        id: 4,
        pregunta: "¿Qué evento se dispara al entrar o salir?",
        opciones: ["resize", "fullscreenchange", "load", "visibilitychange"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Cómo se sale del modo?",
        opciones: [
          "element.exitFullscreen()",
          "document.exitFullscreen()",
          "window.close()",
          "document.fullscreenElement = null",
        ],
        correcta: 1,
      },
    ],
  },

  "fullscreen-exit": {
    id: "fullscreen-exit",
    titulo: "document.exitFullscreen()",
    icon: "🚪",
    categoria: "Fullscreen API · Salir",
    firma: "document.exitFullscreen() → Promise<void>",
    simulador: "fullscreen",

    definicion: [
      "Es un método del objeto **`document`** que sale del modo pantalla completa activado previamente con `requestFullscreen()`. 🚪",
      "Es la forma programática de hacer lo mismo que pulsar `Esc`.",
    ],

    queEs: [
      "Actúa sobre el elemento que está actualmente en pantalla completa, sin necesidad de indicarlo. 🎯",
      "Es un método de `document`, no del elemento.",
      "Devuelve una `Promise<void>` que se resuelve al salir.",
      "Si no hay ningún elemento en fullscreen, la promesa se rechaza con `TypeError`.",
      "No requiere interacción del usuario, a diferencia de entrar.",
    ],

    paraQueSirve: [
      "🚪 Salir del modo pantalla completa desde JavaScript.",
      "🎬 Cerrar el reproductor al terminar el vídeo.",
      "🧭 Salir al cambiar de ruta en una SPA.",
      "🎮 Salir del juego al pausar o terminar.",
      "🖼️ Cerrar la galería o el visor.",
      "🔁 Implementar un toggle con `requestFullscreen()`.",
      "🧹 Limpiar el estado al desmontar un componente.",
      "📱 Salir al cambiar de orientación.",
    ],

    comoFunciona: [
      "No recibe argumentos.",
      "Comprueba si hay un elemento en fullscreen.",
      "Si lo hay, sale del modo y resuelve la promesa.",
      "Si no lo hay, rechaza con `TypeError`.",
      "El navegador restaura la vista normal con barras y pestañas.",
      "Se dispara `fullscreenchange` y `document.fullscreenElement` pasa a `null`.",
    ],

    sintaxis: [
      {
        code: `document.exitFullscreen();`,
      },
      {
        caption: "Con async/await:",
        code: `try {
  await document.exitFullscreen();
  console.log("Fuera de pantalla completa");
} catch (error) {
  console.error("No había fullscreen activo", error);
}`,
      },
      {
        caption: "Salir solo si está activo:",
        code: `function salirSiFullscreen() {
  if (document.fullscreenElement) {
    return document.exitFullscreen();
  }
  return Promise.resolve();
}

await salirSiFullscreen();`,
      },
    ],

    nota: "💡 Comprueba `document.fullscreenElement` antes de llamar: si no hay fullscreen activo, `exitFullscreen()` rechaza con `TypeError`.",

    ejemplos: [
      {
        titulo: "1. 🚪 Salir de fullscreen",
        code: `await document.exitFullscreen();
console.log("Fuera de pantalla completa");`,
      },
      {
        titulo: "2. 🔁 Toggle con requestFullscreen",
        code: `async function alternarFullscreen(elemento = document.documentElement) {
  try {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await elemento.requestFullscreen();
    }
  } catch (error) {
    console.error(error.message);
  }
}`,
      },
      {
        titulo: "3. 🛡️ Salir solo si hace falta",
        code: `function salirSiFullscreen() {
  if (document.fullscreenElement) {
    return document.exitFullscreen();
  }
  return Promise.resolve();
}

await salirSiFullscreen();`,
      },
      {
        titulo: "4. 👀 Reaccionar al cambio",
        code: `document.addEventListener("fullscreenchange", () => {
  const activo = Boolean(document.fullscreenElement);
  document.body.classList.toggle("fullscreen", activo);
  console.log(activo ? "Entró" : "Salió");
});

await document.exitFullscreen();`,
      },
      {
        titulo: "5. 🎬 Salir al terminar el vídeo",
        code: `video.addEventListener("ended", async () => {
  if (document.fullscreenElement) {
    await document.exitFullscreen();
  }
});`,
      },
    ],

    errores: [
      "**Llamarlo sobre un elemento:** es un método de `document`.",
      "**Llamarlo sin fullscreen activo:** rechaza con `TypeError`.",
      "**Olvidar el `catch`:** el rechazo queda sin manejar.",
      "**Esperar elegir qué elemento sale:** siempre sale el activo.",
      "**Asumir que es síncrono:** devuelve una promesa.",
      "**Olvidar `fullscreenchange`:** la interfaz puede quedar desincronizada.",
    ],

    casos: [
      "🎬 Cerrar el reproductor al acabar el vídeo.",
      "🧭 Salir al navegar a otra ruta.",
      "🎮 Salir del juego al pausar.",
      "🖼️ Cerrar una galería.",
      "🧹 Limpiar el estado al desmontar un componente.",
      "📱 Salir al cambiar de orientación.",
    ],

    relacion: [
      "**`element.requestFullscreen()`:** entra en fullscreen.",
      "**`document.fullscreenElement`:** indica si hay fullscreen activo.",
      "**`document.fullscreenEnabled`:** indica si está permitido.",
      "**Evento `fullscreenchange`:** avisa al entrar o salir.",
      "**`Esc`:** atajo del usuario equivalente a este método.",
      "**`Promise`:** el método es asíncrono y puede rechazar.",
    ],

    analogia:
      "Si `requestFullscreen()` es subir la lámina al proyector 📽️, `exitFullscreen()` es apagar el proyector y recuperar la sala normal. No hace falta decir qué lámina apagar: se apaga la que esté proyectándose. Y si no hay ninguna, el botón de apagado se queja con un `TypeError`.",

    fuente: "MDN Web Docs · Fullscreen API · Document.exitFullscreen()",

    notasPersonales: [
      "✅ Es un método de `document`, no del elemento.",
      "✅ Devuelve una `Promise<void>` y no exige gesto del usuario.",
      "⚠️ Sin fullscreen activo rechaza con `TypeError`.",
      "✅ Comprueba `document.fullscreenElement` antes de llamar.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Sobre qué objeto se llama exitFullscreen()?",
        opciones: ["Sobre el elemento", "Sobre document", "Sobre window", "Sobre navigator"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve exitFullscreen()?",
        opciones: ["El elemento", "Una Promise<void>", "true", "null"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué ocurre si no hay fullscreen activo?",
        opciones: [
          "No pasa nada",
          "Rechaza con TypeError",
          "Recarga la página",
          "Abre fullscreen",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué evento se dispara al salir?",
        opciones: ["exit", "fullscreenchange", "close", "unload"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué propiedad pasa a null al salir?",
        opciones: [
          "document.fullscreenEnabled",
          "document.fullscreenElement",
          "window.fullscreen",
          "document.visibilityState",
        ],
        correcta: 1,
      },
    ],
  },
};
