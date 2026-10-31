export const JS_NOTIFICATIONS = {
  id: "notificaciones",
  label: "Notificaciones",
  icon: "🔔",
  titulo: "Web Notifications API",
  descripcion:
    "Pide permiso, muestra avisos nativos del sistema y suscribe al usuario a notificaciones push desde un Service Worker.",
  grupos: [
    {
      seccion: "Permisos",
      metodos: [
        {
          id: "notification-permission",
          nombre: "Notification.permission",
          firma: "Notification.permission",
          icon: "🛡️",
        },
        {
          id: "notification-requestpermission",
          nombre: "Notification.requestPermission()",
          firma: "Notification.requestPermission() → Promise<string>",
          icon: "🙋",
        },
      ],
    },
    {
      seccion: "Mostrar y suscribir",
      metodos: [
        {
          id: "notification-constructor",
          nombre: "new Notification()",
          firma: "new Notification(titulo, opciones)",
          icon: "🔔",
        },
        {
          id: "push-subscribe",
          nombre: "PushManager.subscribe()",
          firma: "pushManager.subscribe(opciones) → Promise<PushSubscription>",
          icon: "📡",
        },
      ],
    },
  ],
};

export const JS_NOTIFICATIONS_DOCS = {
  "notification-permission": {
    id: "notification-permission",
    titulo: "Notification.permission",
    icon: "🛡️",
    categoria: "Notificaciones · Permisos",
    firma: "Notification.permission",
    simulador: "notification",

    definicion: [
      "Es una propiedad **estática y de solo lectura** de la Web Notifications API que indica el estado actual del permiso del usuario para recibir notificaciones del navegador. 🛡️",
      "Devuelve una cadena, no un booleano: `\"granted\"`, `\"denied\"` o `\"default\"`.",
    ],

    queEs: [
      "Se accede directamente desde `Notification`, sin crear una instancia. 🔎",
      "Solo **consulta** el estado: no puede modificarlo ni pedir permiso.",
      "Permite decidir si hace falta llamar a `Notification.requestPermission()`.",
      "Forma parte de la Web API del navegador, no del lenguaje JavaScript.",
    ],

    paraQueSirve: [
      "🛡️ Saber si la página puede mostrar notificaciones.",
      "🙋 Evitar pedir permiso cuando ya está concedido o denegado.",
      "🧭 Adaptar la interfaz según el estado del permiso.",
      "🔔 Mostrar un botón de «activar notificaciones» solo cuando tenga sentido.",
      "🚫 No molestar al usuario con avisos que no se pueden mostrar.",
      "🧪 Diagnosticar por qué no aparece una notificación.",
    ],

    comoFunciona: [
      "JavaScript lee `Notification.permission`.",
      "El navegador devuelve el estado actual del permiso.",
      "`\"granted\"`: el usuario permitió las notificaciones.",
      "`\"denied\"`: el usuario las bloqueó explícitamente.",
      "`\"default\"`: el usuario aún no ha decidido.",
      "La propiedad es de solo lectura: asignarle un valor no cambia nada.",
    ],

    sintaxis: [
      {
        code: `const estado = Notification.permission;
// "granted" | "denied" | "default"`,
      },
      {
        caption: "Solicitar solo si es necesario:",
        code: `if (Notification.permission === "default") {
  await Notification.requestPermission();
}`,
      },
      {
        caption: "Manejar los tres estados:",
        code: `switch (Notification.permission) {
  case "granted":
    console.log("Permiso concedido");
    break;
  case "denied":
    console.log("Permiso denegado");
    break;
  default:
    console.log("Aún no se ha decidido");
}`,
      },
    ],

    nota: "💡 `\"default\"` y `\"denied\"` no son lo mismo: `\"default\"` significa que aún no hay decisión; `\"denied\"` que el usuario dijo que no. En `\"denied\"` el navegador no volverá a mostrar el diálogo.",

    ejemplos: [
      {
        titulo: "1. 🛡️ Consultar el permiso",
        code: `console.log(Notification.permission);
// "granted"`,
      },
      {
        titulo: "2. 🙋 Pedir permiso solo si hace falta",
        code: `if (Notification.permission === "default") {
  Notification.requestPermission();
}`,
      },
      {
        titulo: "3. 🔔 Mostrar solo con permiso",
        code: `if (Notification.permission === "granted") {
  new Notification("¡Hola!");
}`,
      },
      {
        titulo: "4. 🎛️ Adaptar la interfaz",
        code: `const boton = document.querySelector("#activar-notificaciones");

if (Notification.permission === "granted") {
  boton.textContent = "✅ Notificaciones activas";
  boton.disabled = true;
} else if (Notification.permission === "denied") {
  boton.textContent = "🚫 Bloqueadas en el navegador";
  boton.disabled = true;
} else {
  boton.textContent = "🔔 Activar notificaciones";
}`,
      },
      {
        titulo: "5. ⚠️ Comprobar soporte",
        code: `if (!("Notification" in window)) {
  console.log("Este navegador no soporta notificaciones");
} else {
  console.log("Estado:", Notification.permission);
}`,
      },
    ],

    errores: [
      "**Tratarla como booleano:** devuelve una cadena (`\"granted\"`, `\"denied\"`, `\"default\"`).",
      "**Intentar modificarla:** es de solo lectura; asignarle un valor no hace nada.",
      "**Confundir `\"default\"` con `\"denied\"`:** son estados distintos.",
      "**Crear notificaciones sin comprobarla:** el navegador puede no mostrarlas.",
      "**Olvidar comprobar el soporte:** `Notification` no existe en todos los contextos.",
      "**Pedir permiso en cada visita:** solo tiene sentido en `\"default\"`.",
    ],

    casos: [
      "💬 Apps de mensajería que avisan de mensajes nuevos.",
      "📧 Clientes de correo con avisos de entrada.",
      "📅 Calendarios y recordatorios.",
      "✅ Confirmaciones de procesos largos.",
      "📰 Alertas de noticias o eventos.",
      "🔐 Avisos de seguridad.",
    ],

    relacion: [
      "**`Notification.requestPermission()`:** solicita el permiso al usuario.",
      "**`new Notification()`:** crea el aviso cuando el permiso es `\"granted\"`.",
      "**`PushManager.subscribe()`:** permite recibir pushes con el permiso concedido.",
      "**`navigator.permissions.query()`:** consulta permisos de forma genérica.",
      "**Propiedades estáticas:** `permission` pertenece a la interfaz, no a una instancia.",
      "**`document.cookie`:** ejemplo de otra API que depende de permisos del navegador.",
    ],

    analogia:
      "Imagina que una aplicación quiere enviarte cartas ✉️. Antes de enviarlas consulta tu preferencia: «granted» significa que aceptas recibirlas, «denied» que has pedido que no te las envíen y «default» que nunca te lo han preguntado. `Notification.permission` es solo la consulta de esa preferencia: no puede cambiarla por sí sola.",

    fuente: "MDN Web Docs · Notifications API · Notification.permission",

    notasPersonales: [
      "✅ Propiedad estática y de solo lectura.",
      "✅ Devuelve `\"granted\"`, `\"denied\"` o `\"default\"`.",
      "⚠️ No pide permiso: para eso está `requestPermission()`.",
      "✅ Comprueba `\"Notification\" in window` antes de usarla.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué valores puede devolver Notification.permission?",
        opciones: [
          "true y false",
          "\"granted\", \"denied\" y \"default\"",
          "0, 1 y 2",
          "\"yes\", \"no\" y \"maybe\"",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué significa \"default\"?",
        opciones: [
          "Que el permiso fue concedido",
          "Que el usuario aún no ha decidido",
          "Que el permiso fue denegado",
          "Que el navegador no lo soporta",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Se puede modificar Notification.permission?",
        opciones: [
          "Sí, asignando \"granted\"",
          "No, es de solo lectura",
          "Solo en Chrome",
          "Solo tras pedir permiso",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Para qué sirve principalmente?",
        opciones: [
          "Para mostrar notificaciones",
          "Para consultar el estado del permiso",
          "Para solicitar el permiso",
          "Para cerrar notificaciones",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué método solicita el permiso?",
        opciones: [
          "Notification.permission()",
          "Notification.requestPermission()",
          "new Notification()",
          "Notification.close()",
        ],
        correcta: 1,
      },
    ],
  },

  "notification-requestpermission": {
    id: "notification-requestpermission",
    titulo: "Notification.requestPermission()",
    icon: "🙋",
    categoria: "Notificaciones · Permisos",
    firma: "Notification.requestPermission() → Promise<string>",
    simulador: "notification",

    definicion: [
      "Es un método **estático** de la Web Notifications API que solicita al usuario permiso para mostrar notificaciones del navegador. 🙋",
      "Devuelve una `Promise<string>` que se resuelve con `\"granted\"`, `\"denied\"` o `\"default\"`.",
    ],

    queEs: [
      "Muestra el diálogo nativo de permisos del navegador. 🪟",
      "Se llama desde `Notification`, no desde una instancia creada con `new Notification()`.",
      "Es asíncrono: hay que esperar la promesa para conocer la respuesta.",
      "El navegador puede exigir un gesto del usuario para mostrar el diálogo.",
    ],

    paraQueSirve: [
      "🙋 Solicitar autorización antes de enviar notificaciones.",
      "🔔 Activar las notificaciones en una aplicación web.",
      "💬 Avisar de mensajes, correos o eventos.",
      "🧭 Decidir si se muestra el botón de notificaciones.",
      "🛡️ Conocer la decisión del usuario para adaptar la interfaz.",
      "📡 Preparar el terreno para las notificaciones push.",
    ],

    comoFunciona: [
      "JavaScript llama a `Notification.requestPermission()`.",
      "El navegador muestra un cuadro de diálogo al usuario.",
      "El usuario acepta, rechaza o cierra el diálogo.",
      "La promesa se resuelve con el estado resultante.",
      "`\"granted\"`: aceptó; `\"denied\"`: rechazó; `\"default\"`: cerró sin decidir.",
      "Si el permiso ya estaba concedido o denegado, el navegador puede resolver sin mostrar el diálogo.",
    ],

    sintaxis: [
      {
        code: `const permiso = await Notification.requestPermission();`,
      },
      {
        caption: "Con `.then()`:",
        code: `Notification.requestPermission().then((permiso) => {
  console.log(permiso);
});`,
      },
      {
        caption: "Pedir solo si aún no hay decisión:",
        code: `if (Notification.permission === "default") {
  const permiso = await Notification.requestPermission();

  if (permiso === "granted") {
    new Notification("¡Gracias por activar los avisos!");
  }
}`,
      },
    ],

    nota: "💡 No pidas permiso al cargar la página: los navegadores y los usuarios lo odian. Solicítalo cuando el usuario pulse un botón relacionado con las notificaciones.",

    ejemplos: [
      {
        titulo: "1. 🙋 Solicitar permiso",
        code: `Notification.requestPermission().then((permiso) => {
  console.log("Resultado:", permiso);
});`,
      },
      {
        titulo: "2. ⏳ Con async/await",
        code: `async function solicitarPermiso() {
  const permiso = await Notification.requestPermission();
  console.log(permiso);
}

solicitarPermiso();`,
      },
      {
        titulo: "3. 🔔 Pedir y mostrar",
        code: `async function activarNotificaciones() {
  const permiso = await Notification.requestPermission();

  if (permiso === "granted") {
    new Notification("¡Notificaciones activadas! 🎉");
  } else {
    console.log("El usuario no concedió el permiso");
  }
}`,
      },
      {
        titulo: "4. 🖱️ Asociado a un botón",
        code: `document.querySelector("#activar").addEventListener("click", async () => {
  const permiso = await Notification.requestPermission();

  if (permiso === "granted") {
    new Notification("Listo, te avisaremos 🔔");
  }
});`,
      },
      {
        titulo: "5. 🛡️ Comprobar antes de pedir",
        code: `async function asegurarPermiso() {
  if (Notification.permission === "granted") return true;
  if (Notification.permission === "denied") return false;

  const permiso = await Notification.requestPermission();
  return permiso === "granted";
}`,
      },
    ],

    errores: [
      "**Olvidar esperar la promesa:** sin `await` o `.then()` obtienes `Promise { <pending> }`.",
      "**Pedir permiso en cada carga:** genera una mala experiencia y el navegador puede bloquearlo.",
      "**Crear notificaciones sin comprobar el resultado:** si no hay permiso, no se muestran.",
      "**Llamarlo desde una instancia:** es un método estático de `Notification`.",
      "**Ignorar `\"default\"`:** el usuario cerró el diálogo; no es lo mismo que aceptar o rechazar.",
      "**Pedirlo sin gesto del usuario:** algunos navegadores lo ignoran o lo bloquean.",
    ],

    casos: [
      "💬 Botón «activar notificaciones» en un chat.",
      "📧 Avisos de correo nuevo.",
      "📅 Recordatorios de calendario.",
      "✅ Confirmación de procesos largos.",
      "📡 Paso previo a `PushManager.subscribe()`.",
      "🔐 Alertas de seguridad de la cuenta.",
    ],

    relacion: [
      "**`Notification.permission`:** consulta el estado sin pedir nada.",
      "**`new Notification()`:** muestra el aviso cuando el permiso es `\"granted\"`.",
      "**`PushManager.subscribe()`:** requiere permiso concedido y Service Worker.",
      "**`navigator.permissions.query()`:** alternativa genérica para consultar permisos.",
      "**`Promise`:** el método es asíncrono y devuelve una promesa.",
      "**Contexto seguro:** solo funciona en HTTPS o `localhost`.",
    ],

    analogia:
      "Es como llamar a la puerta del usuario 🚪 y preguntar: «¿puedo enviarte avisos?». El usuario puede decir que sí («granted»), que no («denied») o no contestar y cerrar la puerta («default»). La respuesta no llega al instante: tienes que esperar a que termine la conversación, y por eso el método devuelve una promesa.",

    fuente: "MDN Web Docs · Notifications API · requestPermission()",

    notasPersonales: [
      "✅ Método estático; devuelve una `Promise<string>`.",
      "✅ Valores: `\"granted\"`, `\"denied\"`, `\"default\"`.",
      "⚠️ Pídelo tras una acción del usuario, no al cargar.",
      "✅ Comprueba `Notification.permission` antes para no molestar.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve Notification.requestPermission()?",
        opciones: [
          "Un booleano",
          "Una promesa con el estado del permiso",
          "Una notificación",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué valor indica que el usuario cerró el diálogo sin decidir?",
        opciones: ["\"granted\"", "\"denied\"", "\"default\"", "null"],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿Cuándo conviene solicitar el permiso?",
        opciones: [
          "Al cargar la página",
          "Tras una acción del usuario relacionada",
          "Cada cinco minutos",
          "Antes de mostrar cualquier contenido",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué pasa si no esperas la promesa?",
        opciones: [
          "Obtienes el valor directamente",
          "Obtienes Promise { <pending> }",
          "Se cancela el diálogo",
          "Lanza un TypeError",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué método consulta el permiso sin pedirlo?",
        opciones: [
          "Notification.requestPermission()",
          "Notification.permission",
          "new Notification()",
          "Notification.close()",
        ],
        correcta: 1,
      },
    ],
  },

  "notification-constructor": {
    id: "notification-constructor",
    titulo: "new Notification()",
    icon: "🔔",
    categoria: "Notificaciones · Mostrar",
    firma: "new Notification(titulo, opciones)",
    simulador: "notification",

    definicion: [
      "Es el constructor de la Web Notifications API que crea y muestra una **notificación nativa del sistema operativo** al usuario, fuera del contexto de la pestaña. 🔔",
      "Aparece en la esquina del escritorio o en el centro de notificaciones, incluso si el usuario está en otra aplicación.",
    ],

    queEs: [
      "Muestra avisos como los de WhatsApp, Gmail o Telegram. 💬",
      "Requiere permiso explícito (`\"granted\"`) y un contexto seguro (`https://` o `localhost`).",
      "En móviles casi nunca funciona directamente: para eso están los Service Workers y Push API.",
      "Puede escuchar eventos `show`, `click`, `close` y `error`, y cerrarse con `.close()`.",
    ],

    paraQueSirve: [
      "🔔 Alertar de eventos importantes.",
      "💬 Notificar mensajes nuevos de chat o correo.",
      "📅 Recordar eventos o tareas.",
      "📦 Avisar del estado de un pedido.",
      "✅ Comunicar procesos completados: descargas, backups.",
      "📰 Enviar noticias de última hora.",
      "🎮 Avisar de turnos en juegos.",
      "🔐 Alertas de seguridad.",
    ],

    comoFunciona: [
      "Se solicita permiso con `Notification.requestPermission()`.",
      "Si el usuario acepta, se puede usar `new Notification()`.",
      "La notificación aparece en el sistema operativo.",
      "Se pueden escuchar los eventos `show`, `click`, `close` y `error`.",
      "Se puede cerrar manualmente con `notification.close()`.",
      "El objeto devuelto expone `title`, `body`, `tag`, `data` y otros campos.",
    ],

    sintaxis: [
      {
        code: `const notificacion = new Notification(titulo, opciones);`,
      },
      {
        caption: "Con cuerpo e icono:",
        code: `new Notification("Nuevo mensaje", {
  body: "Ana te ha enviado un mensaje",
  icon: "/iconos/chat.png",
});`,
      },
      {
        caption: "Con tag para reemplazar avisos repetidos:",
        code: `new Notification("Descarga completada", {
  body: "archivo.zip",
  tag: "descarga",
});`,
      },
    ],

    nota: "💡 Usa `tag` para agrupar notificaciones del mismo tipo: un aviso nuevo con el mismo `tag` reemplaza al anterior en lugar de acumularse.",

    ejemplos: [
      {
        titulo: "1. 🔔 Pedir permiso y mostrar",
        code: `async function notificar() {
  const permiso = await Notification.requestPermission();

  if (permiso === "granted") {
    new Notification("¡Hola! 👋", {
      body: "Esta es tu primera notificación",
      icon: "/icono.png",
    });
  }
}

notificar();`,
      },
      {
        titulo: "2. 🛡️ Verificar permiso antes",
        code: `if (Notification.permission === "granted") {
  new Notification("✅ Permiso concedido");
} else if (Notification.permission !== "denied") {
  Notification.requestPermission().then((p) => {
    if (p === "granted") new Notification("¡Gracias! 🎉");
  });
}`,
      },
      {
        titulo: "3. 🖱️ Reaccionar al clic",
        code: `const aviso = new Notification("Tienes un mensaje", {
  body: "Pulsa para abrir el chat",
});

aviso.onclick = () => {
  window.focus();
  location.href = "/chat";
  aviso.close();
};`,
      },
      {
        titulo: "4. 🏷️ Reemplazar avisos con tag",
        code: `function avisarProgreso(porcentaje) {
  new Notification("Subiendo archivo", {
    body: porcentaje + "% completado",
    tag: "subida",
  });
}

avisarProgreso(25);
avisarProgreso(50); // reemplaza al anterior`,
      },
      {
        titulo: "5. 🔕 Notificación silenciosa",
        code: `new Notification("Sincronización completada", {
  body: "Todo está al día",
  silent: true,
  requireInteraction: false,
});`,
      },
    ],

    errores: [
      "**Crear la notificación sin permiso:** no se muestra o lanza un error según el navegador.",
      "**Usarlo en HTTP:** requiere contexto seguro (`https://` o `localhost`).",
      "**Esperar que funcione en móvil:** usa Service Worker + Push API.",
      "**Confundir el título con el cuerpo:** el primer argumento es el título; `body` es el texto.",
      "**Acumular avisos idénticos:** usa `tag` para reemplazarlos.",
      "**No cerrar notificaciones obsoletas:** guarda la referencia y llama a `.close()`.",
      "**Pensar que `new Notification()` devuelve una promesa:** devuelve el objeto de la notificación.",
    ],

    casos: [
      "💬 Chats y mensajería instantánea.",
      "📧 Avisos de correo nuevo.",
      "📦 Actualizaciones de pedidos.",
      "✅ Descargas o backups completados.",
      "📰 Noticias de última hora.",
      "🎮 Turnos en juegos por turnos.",
    ],

    relacion: [
      "**`Notification.permission`:** indica si se puede mostrar.",
      "**`Notification.requestPermission()`:** solicita el permiso necesario.",
      "**`notification.close()`:** cierra el aviso.",
      "**`ServiceWorkerRegistration.showNotification()`:** alternativa recomendada en móvil y para push.",
      "**`PushManager.subscribe()`:** recibe avisos enviados por un servidor.",
      "**`tag`:** agrupa y reemplaza notificaciones relacionadas.",
    ],

    analogia:
      "Es como el cartero que llama a tu puerta con un aviso en la mano 📨. Antes de enviarlo, la app comprobó que aceptabas recibir cartas (`permission === \"granted\"`). El sobre tiene un título y un cuerpo, puede llevar icono y un identificador (`tag`) para que, si llega otro del mismo asunto, sustituya al anterior en lugar de amontonarse.",

    fuente: "MDN Web Docs · Notifications API · Notification()",

    notasPersonales: [
      "✅ Requiere permiso `\"granted\"` y contexto seguro.",
      "✅ El primer argumento es obligatorio: el título.",
      "✅ Opciones útiles: `body`, `icon`, `tag`, `data`, `silent`.",
      "⚠️ En móvil usa Service Worker + Push API.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué hace new Notification()?",
        opciones: [
          "Pide permiso al usuario",
          "Crea y muestra una notificación del sistema",
          "Cierra una notificación",
          "Suscribe a notificaciones push",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué permiso se necesita para mostrarla?",
        opciones: ["\"default\"", "\"granted\"", "\"denied\"", "Cualquiera"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué opción agrupa y reemplaza notificaciones?",
        opciones: ["body", "icon", "tag", "silent"],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Qué contexto es necesario?",
        opciones: [
          "HTTP sin cifrar",
          "HTTPS o localhost",
          "Solo file://",
          "Cualquier origen",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué método cierra la notificación?",
        opciones: [".remove()", ".close()", ".cancel()", ".hide()"],
        correcta: 1,
      },
    ],
  },

  "push-subscribe": {
    id: "push-subscribe",
    titulo: "PushManager.subscribe()",
    icon: "📡",
    categoria: "Notificaciones · Push",
    firma: "pushManager.subscribe(opciones) → Promise<PushSubscription>",
    simulador: "push",

    definicion: [
      "Es un método de la **Push API** que suscribe al usuario a notificaciones push y devuelve una promesa con un `PushSubscription` que contiene el endpoint y las claves de cifrado. 📡",
      "Ese endpoint es lo que el servidor necesita para enviar notificaciones al dispositivo.",
    ],

    queEs: [
      "La pieza clave para recibir push en el navegador. 🔑",
      "El navegador contacta con su servicio push (FCM en Chrome, Mozilla Push en Firefox…).",
      "Genera un endpoint único por usuario y dispositivo.",
      "Crea las claves `p256dh` y `auth` para cifrar los envíos.",
      "Requiere un Service Worker activo, permiso concedido y contexto seguro.",
    ],

    paraQueSirve: [
      "📡 Recibir notificaciones push enviadas por un servidor.",
      "💬 Chats y mensajería en tiempo real.",
      "📰 Noticias de última hora.",
      "📦 Actualizaciones de pedidos.",
      "📅 Recordatorios programados.",
      "🎮 Invitaciones a juegos.",
      "🛍️ Campañas y promociones.",
      "🔐 Alertas de seguridad.",
      "🔄 Sincronización en segundo plano.",
    ],

    comoFunciona: [
      "Registras un Service Worker con `navigator.serviceWorker.register()`.",
      "Esperas a que esté activo con `navigator.serviceWorker.ready`.",
      "Pides permiso con `Notification.requestPermission()`.",
      "Obtienes el `PushManager` desde la registration.",
      "Llamas a `pushManager.subscribe({ userVisibleOnly, applicationServerKey })`.",
      "El navegador contacta con el servicio push y devuelve un `PushSubscription`.",
      "Guardas `endpoint` y `keys` en tu servidor para enviar los avisos.",
    ],

    sintaxis: [
      {
        code: `const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: vapidPublicKey,
});`,
      },
      {
        caption: "Suscripción completa:",
        code: `const registration = await navigator.serviceWorker.register("/sw.js");
await navigator.serviceWorker.ready;

const permiso = await Notification.requestPermission();
if (permiso !== "granted") throw new Error("Permiso denegado");

const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
});

await fetch("/api/suscripcion", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(subscription),
});`,
      },
      {
        caption: "Comprobar si ya estaba suscrito:",
        code: `const existente = await registration.pushManager.getSubscription();

if (existente) {
  console.log("Ya suscrito:", existente.endpoint);
} else {
  console.log("Todavía no hay suscripción");
}`,
      },
    ],

    nota: "💡 `applicationServerKey` es la clave **pública VAPID** de tu servidor, no la privada. La privada se queda en el backend para firmar los envíos.",

    ejemplos: [
      {
        titulo: "1. 📡 Suscripción básica",
        code: `const registration = await navigator.serviceWorker.register("/sw.js");
await navigator.serviceWorker.ready;

const permiso = await Notification.requestPermission();
if (permiso !== "granted") throw new Error("Permiso denegado");

const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
});

console.log("Suscrito:", subscription.endpoint);`,
      },
      {
        titulo: "2. 🔁 Evitar suscripciones duplicadas",
        code: `let subscription = await registration.pushManager.getSubscription();

if (!subscription) {
  subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
  });
}

console.log(subscription.endpoint);`,
      },
      {
        titulo: "3. 🔐 Convertir la clave VAPID",
        code: `function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = atob(base64);
  const output = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; i++) {
    output[i] = rawData.charCodeAt(i);
  }

  return output;
}`,
      },
      {
        titulo: "4. 📤 Enviar la suscripción al servidor",
        code: `const datos = subscription.toJSON();

await fetch("/api/push/suscribir", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    endpoint: datos.endpoint,
    keys: datos.keys,
  }),
});`,
      },
      {
        titulo: "5. 🚫 Cancelar la suscripción",
        code: `const subscription = await registration.pushManager.getSubscription();

if (subscription) {
  await subscription.unsubscribe();
  console.log("Suscripción cancelada");
}`,
      },
    ],

    errores: [
      "**Llamarlo sin Service Worker activo:** no funciona; espera a `navigator.serviceWorker.ready`.",
      "**Olvidar el permiso:** sin `\"granted\"` la suscripción falla.",
      "**Usar la clave VAPID privada en el cliente:** expone el secreto; usa la pública.",
      "**No guardar el endpoint en el servidor:** sin él no se pueden enviar pushes.",
      "**Crear suscripciones duplicadas:** comprueba antes con `getSubscription()`.",
      "**Asumir soporte universal:** iOS Safari tiene limitaciones y requiere instalación.",
      "**Usarlo en HTTP:** exige contexto seguro.",
    ],

    casos: [
      "💬 Mensajería y chats web.",
      "📰 Alertas de noticias.",
      "📦 Seguimiento de pedidos.",
      "📅 Recordatorios y calendarios.",
      "🛍️ Promociones y recuperación de carritos.",
      "🔐 Alertas de seguridad de la cuenta.",
    ],

    relacion: [
      "**`navigator.serviceWorker.register()`:** registra el SW necesario.",
      "**`navigator.serviceWorker.ready`:** espera a que el SW esté activo.",
      "**`Notification.requestPermission()`:** concede el permiso previo.",
      "**`PushSubscription`:** objeto con `endpoint`, `keys` y `unsubscribe()`.",
      "**VAPID:** identifica tu servidor ante el servicio push.",
      "**`userVisibleOnly: true`:** obligatorio en Chrome: toda push debe mostrar una notificación.",
    ],

    analogia:
      "Es como abrir un buzón personal en la oficina de correos 📮. El Service Worker es el empleado que está siempre disponible; el permiso es tu firma autorizando el buzón; `subscribe()` te asigna una dirección única (endpoint) y un par de llaves para que solo tú puedas abrir los envíos cifrados. Después entregas esa dirección a tu servidor para que sepa dónde mandar las cartas.",

    fuente: "MDN Web Docs · Push API · PushManager.subscribe()",

    notasPersonales: [
      "✅ Requiere Service Worker activo, permiso y HTTPS.",
      "✅ Devuelve un `PushSubscription` con `endpoint` y claves.",
      "⚠️ `userVisibleOnly: true` es obligatorio en Chrome.",
      "✅ Guarda el endpoint en el servidor para enviar pushes.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve PushManager.subscribe()?",
        opciones: [
          "Una notificación",
          "Una promesa con un PushSubscription",
          "Un booleano",
          "El permiso del usuario",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué se necesita además del permiso?",
        opciones: [
          "Un Service Worker activo",
          "Una cookie",
          "localStorage",
          "Un iframe",
        ],
        correcta: 0,
      },
      {
        id: 3,
        pregunta: "¿Qué contiene un PushSubscription?",
        opciones: [
          "Solo el título",
          "Endpoint y claves de cifrado",
          "El HTML de la página",
          "La lista de contactos",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué clave se pasa en applicationServerKey?",
        opciones: [
          "La privada VAPID",
          "La pública VAPID",
          "La contraseña del servidor",
          "Una cookie de sesión",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué opción es obligatoria en Chrome?",
        opciones: [
          "silent: true",
          "userVisibleOnly: true",
          "tag: \"push\"",
          "requireInteraction: true",
        ],
        correcta: 1,
      },
    ],
  },
};
