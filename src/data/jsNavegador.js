export const JS_NAVEGADOR = {
  id: "navegador",
  label: "Navegador",
  icon: "🧭",
  titulo: "APIs del navegador",
  descripcion:
    "Comparte contenido con el sistema operativo, copia al portapapeles y consulta si el navegador acepta cookies.",
  grupos: [
    {
      seccion: "Compartir",
      metodos: [
        {
          id: "navigator-share",
          nombre: "navigator.share()",
          firma: "navigator.share(data) → Promise<void>",
          icon: "📤",
        },
        {
          id: "navigator-canshare",
          nombre: "navigator.canShare()",
          firma: "navigator.canShare(data) → boolean",
          icon: "🔎",
        },
      ],
    },
    {
      seccion: "Portapapeles y cookies",
      metodos: [
        {
          id: "clipboard-writetext",
          nombre: "navigator.clipboard.writeText()",
          firma: "navigator.clipboard.writeText(texto) → Promise<void>",
          icon: "📋",
        },
        {
          id: "navigator-cookieenabled",
          nombre: "navigator.cookieEnabled",
          firma: "navigator.cookieEnabled",
          icon: "🍪",
        },
      ],
    },
  ],
};

export const JS_NAVEGADOR_DOCS = {
  "navigator-share": {
    id: "navigator-share",
    titulo: "navigator.share()",
    icon: "📤",
    categoria: "Navegador · Compartir",
    firma: "navigator.share(data) → Promise<void>",
    simulador: "share",

    definicion: [
      "Es un método del **Web Share API** que invoca el selector de compartir nativo del dispositivo para enviar texto, URLs o archivos a otras aplicaciones. 📤",
      "En lugar de botones para cada red social, el usuario elige la app desde el diálogo del sistema.",
    ],

    queEs: [
      "Accede al mecanismo nativo de compartir del sistema operativo. 📱",
      "Está pensado sobre todo para móviles; en escritorio el soporte es limitado.",
      "Devuelve una `Promise<void>` que resuelve cuando el usuario completa la acción.",
      "Requiere un gesto del usuario y un contexto seguro.",
    ],

    paraQueSirve: [
      "🔗 Compartir enlaces con cualquier aplicación instalada.",
      "📝 Compartir texto: citas, notas, fragmentos.",
      "🖼️ Compartir archivos: imágenes, documentos, PDFs.",
      "✨ Ofrecer una experiencia nativa y familiar.",
      "🧭 Reducir la fricción al compartir contenido.",
      "🧹 Eliminar múltiples botones de redes sociales.",
      "📈 Mejorar la viralidad del contenido.",
    ],

    comoFunciona: [
      "El navegador solicita permiso o muestra directamente el selector, según el sistema.",
      "Aparece el diálogo nativo de aplicaciones.",
      "El usuario elige una aplicación.",
      "El contenido se pasa a esa aplicación.",
      "La promesa resuelve cuando el usuario completa el envío o rechaza con `AbortError` si cancela.",
      "Si el usuario cancela, el error suele ser `AbortError`.",
    ],

    sintaxis: [
      {
        code: `await navigator.share(data);`,
      },
      {
        caption: "Objeto `data`:",
        code: `await navigator.share({
  title: "Mi sitio web",
  text: "¡Mira este sitio!",
  url: "https://ejemplo.com",
});`,
      },
      {
        caption: "Con manejo de cancelación:",
        code: `try {
  await navigator.share({ title: "Hola", url: location.href });
} catch (error) {
  if (error.name !== "AbortError") {
    console.error("Error al compartir:", error);
  }
}`,
      },
    ],

    nota: "💡 Si el usuario cancela el diálogo, la promesa se rechaza con `AbortError`. No lo trates como un fallo real: simplemente decidió no compartir.",

    ejemplos: [
      {
        titulo: "1. 🔗 Compartir URL y texto",
        code: `document.querySelector("#compartir").addEventListener("click", async () => {
  try {
    await navigator.share({
      title: "Mi sitio web",
      text: "¡Mira este increíble sitio!",
      url: "https://ejemplo.com",
    });
    console.log("Contenido compartido");
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Error al compartir:", error);
    }
  }
});`,
      },
      {
        titulo: "2. 📝 Compartir solo texto",
        code: `await navigator.share({
  title: "Cita inspiradora",
  text: "El éxito es la suma de pequeños esfuerzos repetidos día tras día.",
});`,
      },
      {
        titulo: "3. 🖼️ Compartir un archivo",
        code: `const canvas = document.querySelector("canvas");
const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
const archivo = new File([blob], "mi-dibujo.png", { type: "image/png" });

await navigator.share({
  title: "Mi dibujo",
  files: [archivo],
});`,
      },
      {
        titulo: "4. 🗂️ Compartir varios archivos",
        code: `const archivos = [
  new File(["Contenido 1"], "archivo1.txt", { type: "text/plain" }),
  new File(["Contenido 2"], "archivo2.txt", { type: "text/plain" }),
];

if (navigator.canShare({ files: archivos })) {
  await navigator.share({ files: archivos });
}`,
      },
      {
        titulo: "5. 🛡️ Comprobar soporte y ofrecer fallback",
        code: `if (navigator.share) {
  await navigator.share({ title: document.title, url: location.href });
} else {
  await navigator.clipboard.writeText(location.href);
  console.log("Enlace copiado como alternativa");
}`,
      },
    ],

    errores: [
      "**Llamarlo sin gesto del usuario:** el navegador lo bloquea.",
      "**Usarlo en HTTP:** requiere contexto seguro.",
      "**Ignorar `AbortError`:** cancelar no es un fallo real.",
      "**Asumir soporte en escritorio:** el soporte es limitado.",
      "**Pasar datos vacíos:** el objeto debe tener algún campo compartible.",
      "**Compartir archivos sin comprobar `canShare()`:** puede rechazar.",
      "**Pensar que confirma el envío:** solo confirma que el diálogo se completó.",
    ],

    casos: [
      "📰 Compartir noticias y artículos.",
      "🛍️ Compartir productos de una tienda.",
      "🖼️ Compartir imágenes generadas o editadas.",
      "📄 Compartir documentos y PDFs.",
      "🎉 Invitaciones a eventos.",
      "🔗 Compartir enlaces de referidos.",
    ],

    relacion: [
      "**`navigator.canShare()`:** comprueba antes si el contenido es compartible.",
      "**`navigator.clipboard.writeText()`:** alternativa para copiar el enlace.",
      "**`AbortError`:** error típico al cancelar el diálogo.",
      "**`File` y `Blob`:** tipos usados para compartir archivos.",
      "**Web Share API:** especificación a la que pertenece.",
      "**Contexto seguro:** HTTPS o `localhost`.",
    ],

    analogia:
      "Es como abrir el menú «Compartir» del móvil 📲: no eliges tú la red social por el usuario, simplemente levantas el diálogo del sistema y dejas que él decida a qué app enviar la foto o el enlace. Si cierra el menú sin enviar, no es un error grave: solo canceló.",

    fuente: "MDN Web Docs · Web Share API · navigator.share()",

    notasPersonales: [
      "✅ Invoca el selector nativo del sistema.",
      "✅ Requiere gesto del usuario y HTTPS.",
      "⚠️ Cancelar produce `AbortError`; no lo trates como fallo.",
      "✅ Comprueba `navigator.share` antes de usarlo.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué abre navigator.share()?",
        opciones: [
          "Una nueva pestaña",
          "El selector nativo de compartir del sistema",
          "La consola",
          "El portapapeles",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve navigator.share()?",
        opciones: ["Un booleano", "Una Promise<void>", "El archivo", "undefined"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué error indica que el usuario canceló?",
        opciones: ["TypeError", "AbortError", "SecurityError", "NetworkError"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué requisito es imprescindible?",
        opciones: [
          "Un gesto del usuario y contexto seguro",
          "Una cookie",
          "localStorage",
          "Un iframe",
        ],
        correcta: 0,
      },
      {
        id: 5,
        pregunta: "¿Qué método permite comprobar antes si se puede compartir?",
        opciones: [
          "navigator.share()",
          "navigator.canShare()",
          "navigator.clipboard()",
          "navigator.cookieEnabled",
        ],
        correcta: 1,
      },
    ],
  },

  "navigator-canshare": {
    id: "navigator-canshare",
    titulo: "navigator.canShare()",
    icon: "🔎",
    categoria: "Navegador · Compartir",
    firma: "navigator.canShare(data) → boolean",
    simulador: "share",

    definicion: [
      "Es un método del **Web Share API** que comprueba si un objeto con datos concretos puede compartirse con `navigator.share()` en el dispositivo y navegador actuales. 🔎",
      "Actúa como un guardia de seguridad antes de abrir el diálogo nativo.",
    ],

    queEs: [
      "Es **predictivo**: no muestra ningún diálogo, solo devuelve un booleano. ✅",
      "Permite validar texto, URLs y sobre todo archivos antes de compartir.",
      "Ayuda a mostrar u ocultar botones según lo que se pueda compartir.",
      "Devuelve `false` también cuando la API no está disponible.",
    ],

    paraQueSirve: [
      "🔎 Verificar si se pueden compartir archivos concretos.",
      "🛡️ Validar datos antes de llamar a `navigator.share()`.",
      "🎛️ Mostrar u ocultar botones de compartir.",
      "🧪 Probar combinaciones: solo texto, texto + URL, archivos…",
      "💬 Dar feedback al usuario sobre qué se puede compartir.",
      "🚫 Evitar errores en tiempo de ejecución.",
      "🧭 Implementar fallbacks inteligentes.",
    ],

    comoFunciona: [
      "Recibe el mismo objeto `data` que `navigator.share()`.",
      "El navegador consulta al sistema operativo si puede manejar esos datos.",
      "Comprueba el tipo de archivo, el tamaño y la combinación de campos.",
      "Verifica si hay aplicaciones capaces de manejar ese contenido.",
      "Devuelve `true` si se puede compartir o `false` si no.",
      "No muestra ningún diálogo ni modifica el estado.",
    ],

    sintaxis: [
      {
        code: `navigator.canShare(data);`,
      },
      {
        caption: "Comprobar texto y URL:",
        code: `const data = {
  title: "Mi sitio",
  text: "Visita mi sitio",
  url: "https://ejemplo.com",
};

if (navigator.canShare(data)) {
  await navigator.share(data);
}`,
      },
      {
        caption: "Comprobar archivos:",
        code: `const archivo = new File(["hola"], "nota.txt", { type: "text/plain" });

if (navigator.canShare({ files: [archivo] })) {
  await navigator.share({ files: [archivo] });
} else {
  console.log("Este archivo no se puede compartir aquí");
}`,
      },
    ],

    nota: "💡 `canShare()` devuelve `false` si la API no existe. Puedes usarlo también como comprobación de soporte: `if (navigator.canShare) { ... }`.",

    ejemplos: [
      {
        titulo: "1. 🔎 Verificar disponibilidad básica",
        code: `if (navigator.canShare) {
  console.log("Web Share API disponible");
} else {
  console.log("Web Share API NO disponible");
}`,
      },
      {
        titulo: "2. 🔗 Validar texto y URL",
        code: `const data = {
  title: "Mi sitio",
  text: "Visita mi sitio",
  url: "https://ejemplo.com",
};

if (navigator.canShare(data)) {
  await navigator.share(data);
} else {
  console.log("No se puede compartir este contenido");
}`,
      },
      {
        titulo: "3. 🖼️ Validar una imagen",
        code: `const imagen = new File(["contenido"], "foto.jpg", { type: "image/jpeg" });

if (navigator.canShare({ files: [imagen] })) {
  await navigator.share({ title: "Mi foto", files: [imagen] });
} else {
  console.log("Este archivo no se puede compartir en este dispositivo");
}`,
      },
      {
        titulo: "4. 🗂️ Validar varios archivos",
        code: `const archivos = [
  new File(["texto1"], "doc1.txt", { type: "text/plain" }),
  new File(["texto2"], "doc2.txt", { type: "text/plain" }),
];

if (navigator.canShare({ files: archivos })) {
  await navigator.share({ files: archivos });
}`,
      },
      {
        titulo: "5. 🎛️ Mostrar el botón solo si se puede compartir",
        code: `const data = { title: document.title, url: location.href };
const boton = document.querySelector("#compartir");

boton.hidden = !navigator.canShare?.(data);

boton.addEventListener("click", () => navigator.share(data));`,
      },
    ],

    errores: [
      "**Esperar que abra el diálogo:** solo devuelve un booleano.",
      "**Llamarlo sin comprobar que exista:** en navegadores antiguos no está definido.",
      "**Asumir que `true` garantiza el éxito:** el usuario aún puede cancelar.",
      "**Olvidar validar archivos:** los tipos y tamaños admitidos varían por sistema.",
      "**Confundirlo con `share()`:** `canShare()` no comparte nada.",
      "**Ignorar el fallback:** si devuelve `false`, ofrece copiar o descargar.",
    ],

    casos: [
      "🎛️ Mostrar u ocultar el botón de compartir.",
      "🖼️ Validar imágenes antes de compartirlas.",
      "📄 Comprobar PDFs o documentos.",
      "🧪 Elegir entre compartir o copiar el enlace.",
      "📱 Adaptar la interfaz al soporte del dispositivo.",
      "🔗 Compartir enlaces de forma segura.",
    ],

    relacion: [
      "**`navigator.share()`:** realiza la acción de compartir.",
      "**`File` y `Blob`:** tipos que se validan con `files`.",
      "**`AbortError`:** error de cancelación de `share()`, no de `canShare()`.",
      "**Web Share API:** especificación común a ambos métodos.",
      "**`navigator.clipboard.writeText()`:** fallback habitual.",
      "**Contexto seguro:** necesario para el Web Share API.",
    ],

    analogia:
      "Es como preguntar en recepción «¿este paquete se puede enviar por mensajería?» antes de envolverlo 📦. La recepcionista consulta el tipo y tamaño permitidos y te dice sí o no, sin enviar nada. Si dice que no, buscas otra forma de entregarlo; si dice que sí, aún puede ser que el destinatario rechace el paquete al final.",

    fuente: "MDN Web Docs · Web Share API · navigator.canShare()",

    notasPersonales: [
      "✅ Devuelve un booleano y no muestra diálogos.",
      "✅ Valida texto, URL y archivos antes de compartir.",
      "⚠️ `true` no garantiza que el usuario complete el envío.",
      "✅ Úsalo para mostrar u ocultar el botón de compartir.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve navigator.canShare()?",
        opciones: ["Una promesa", "Un booleano", "El archivo", "undefined"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Muestra algún diálogo?",
        opciones: ["Sí, el selector nativo", "No, solo comprueba", "Solo en móvil", "Solo con archivos"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Para qué se usa principalmente?",
        opciones: [
          "Para compartir archivos",
          "Para comprobar si los datos se pueden compartir",
          "Para copiar al portapapeles",
          "Para leer cookies",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué pasa si la API no está disponible?",
        opciones: [
          "Lanza un error",
          "Devuelve false",
          "Devuelve true",
          "Abre el diálogo igualmente",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué método realiza realmente el compartir?",
        opciones: [
          "navigator.canShare()",
          "navigator.share()",
          "navigator.clipboard.writeText()",
          "navigator.cookieEnabled",
        ],
        correcta: 1,
      },
    ],
  },

  "clipboard-writetext": {
    id: "clipboard-writetext",
    titulo: "navigator.clipboard.writeText()",
    icon: "📋",
    categoria: "Navegador · Portapapeles",
    firma: "navigator.clipboard.writeText(texto) → Promise<void>",
    simulador: "clipboard",

    definicion: [
      "Es un método del **Clipboard API** que escribe texto en el portapapeles del sistema de forma asíncrona y segura. 📋",
      "Es la evolución moderna de `document.execCommand(\"copy\")`.",
    ],

    queEs: [
      "Permite copiar texto programáticamente sin elementos ocultos ni selecciones. ✂️",
      "Forma parte del Clipboard API, con mejor control de permisos.",
      "Devuelve una `Promise<void>` que resuelve cuando el texto se escribe.",
      "Requiere contexto seguro y, en la mayoría de navegadores, un gesto del usuario.",
    ],

    paraQueSirve: [
      "🔗 Copiar enlaces para compartir rápidamente.",
      "🎟️ Copiar códigos promocionales o de verificación.",
      "📧 Copiar direcciones de correo, teléfonos o ubicaciones.",
      "📄 Copiar texto formateado: HTML, JSON, código.",
      "📋 Implementar botones de «Copiar al portapapeles».",
      "🔁 Permitir duplicar contenido sin seleccionarlo a mano.",
      "✨ Crear experiencias más fluidas.",
    ],

    comoFunciona: [
      "El navegador verifica si el sitio tiene permisos para el portapapeles.",
      "En algunos navegadores solicita permiso al usuario.",
      "Escribe el texto en el portapapeles del sistema.",
      "Devuelve una promesa que resuelve al completar.",
      "Rechaza si hay problemas de permisos, contexto o foco.",
      "El texto copiado queda disponible para pegar en cualquier aplicación.",
    ],

    sintaxis: [
      {
        code: `await navigator.clipboard.writeText(texto);`,
      },
      {
        caption: "Con manejo de errores:",
        code: `try {
  await navigator.clipboard.writeText("Texto a copiar");
  console.log("Copiado");
} catch (error) {
  console.error("No se pudo copiar:", error);
}`,
      },
      {
        caption: "Copiar el enlace actual:",
        code: `document.querySelector("#copiar").addEventListener("click", async () => {
  await navigator.clipboard.writeText(window.location.href);
});`,
      },
    ],

    nota: "💡 El portapapeles puede contener datos sensibles: no leas ni escribas sin una acción clara del usuario y da siempre feedback visual («Copiado ✅»).",

    ejemplos: [
      {
        titulo: "1. 📋 Copiar texto básico",
        code: `document.querySelector("#copiar").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("Texto a copiar");
    console.log("Texto copiado");
  } catch (error) {
    console.error("Error al copiar:", error);
  }
});`,
      },
      {
        titulo: "2. 🔗 Copiar el enlace actual",
        code: `document.querySelector("#copiar-enlace").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("¡Enlace copiado!");
  } catch (error) {
    console.error("Error:", error);
  }
});`,
      },
      {
        titulo: "3. 📄 Copiar el contenido de un elemento",
        code: `document.querySelector("#copiar-parrafo").addEventListener("click", async () => {
  const parrafo = document.querySelector("#texto");

  try {
    await navigator.clipboard.writeText(parrafo.textContent);
    parrafo.classList.add("copiado");
    setTimeout(() => parrafo.classList.remove("copiado"), 2000);
  } catch (error) {
    console.error("Error:", error);
  }
});`,
      },
      {
        titulo: "4. 🧾 Copiar datos de un formulario",
        code: `document.querySelector("#copiar-datos").addEventListener("click", async () => {
  const nombre = document.querySelector("#nombre").value;
  const email = document.querySelector("#email").value;
  const texto = "Nombre: " + nombre + "\\nEmail: " + email;

  try {
    await navigator.clipboard.writeText(texto);
    console.log("Datos copiados");
  } catch (error) {
    console.error("Error al copiar", error);
  }
});`,
      },
      {
        titulo: "5. 🧩 Copiar JSON formateado",
        code: `const datos = { nombre: "Ana", edad: 30, ciudad: "Madrid" };

await navigator.clipboard.writeText(JSON.stringify(datos, null, 2));`,
      },
    ],

    errores: [
      "**Usarlo en HTTP:** requiere contexto seguro.",
      "**Llamarlo sin gesto del usuario:** muchos navegadores lo rechazan.",
      "**Olvidar el `catch`:** la promesa puede rechazar por permisos.",
      "**No dar feedback:** el usuario no sabe si se copió.",
      "**Confundirlo con `readText()`:** uno escribe; el otro lee el portapapeles.",
      "**Copiar datos sensibles sin consentimiento:** riesgo de privacidad.",
      "**Asumir que funciona en segundo plano:** la pestaña debe estar activa.",
    ],

    casos: [
      "🔗 Botones «copiar enlace».",
      "🎟️ Códigos de descuento y cupones.",
      "📧 Datos de contacto.",
      "🧾 Fragmentos de código o JSON.",
      "🎮 Códigos de invitación a partidas.",
      "📋 Compartir resultados o configuraciones.",
    ],

    relacion: [
      "**`navigator.clipboard.readText()`:** lee el portapapeles.",
      "**`document.execCommand(\"copy\")`:** técnica antigua y obsoleta.",
      "**`navigator.share()`:** alternativa nativa para compartir.",
      "**`Promise`:** el método es asíncrono.",
      "**Permisos del navegador:** puede requerir autorización.",
      "**Contexto seguro:** HTTPS o `localhost`.",
    ],

    analogia:
      "Es como tener una tijera y un portapapeles junto a la pantalla ✂️📋: seleccionas el texto y lo dejas listo para pegar en cualquier otra aplicación. La diferencia es que aquí lo hace el código por ti, pero solo si el usuario ha hecho un gesto que lo autorice y el sitio es seguro.",

    fuente: "MDN Web Docs · Clipboard API · writeText()",

    notasPersonales: [
      "✅ Escribe texto en el portapapeles del sistema.",
      "✅ Devuelve una `Promise<void>`.",
      "⚠️ Requiere HTTPS y normalmente un gesto del usuario.",
      "✅ Da feedback visual y maneja el `catch`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué hace navigator.clipboard.writeText()?",
        opciones: [
          "Lee el portapapeles",
          "Escribe texto en el portapapeles",
          "Comparte contenido",
          "Descarga un archivo",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve?",
        opciones: ["El texto copiado", "Una Promise<void>", "true", "undefined"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué contexto es necesario?",
        opciones: ["HTTP", "HTTPS o localhost", "file://", "Cualquiera"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué método lee el portapapeles?",
        opciones: [
          "writeText()",
          "readText()",
          "share()",
          "canShare()",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué práctica es recomendable tras copiar?",
        opciones: [
          "No hacer nada",
          "Dar feedback visual al usuario",
          "Recargar la página",
          "Borrar el portapapeles",
        ],
        correcta: 1,
      },
    ],
  },

  "navigator-cookieenabled": {
    id: "navigator-cookieenabled",
    titulo: "navigator.cookieEnabled",
    icon: "🍪",
    categoria: "Navegador · Cookies",
    firma: "navigator.cookieEnabled",
    simulador: "cookie",

    definicion: [
      "Es una propiedad **de solo lectura** de la Web API Navigator que indica si las cookies están habilitadas en el navegador. 🍪",
      "Devuelve un booleano: `true` o `false`.",
    ],

    queEs: [
      "Es una **propiedad**, no un método: se usa sin paréntesis. 🔎",
      "Solo informa del estado; no permite activar ni desactivar cookies.",
      "Permite adaptar el comportamiento del sitio según la disponibilidad.",
      "Forma parte de la Web API del navegador, no del lenguaje JavaScript.",
    ],

    paraQueSirve: [
      "🍪 Comprobar si las cookies están habilitadas.",
      "⚠️ Advertir al usuario cuando la aplicación las necesita.",
      "🧭 Adaptar el funcionamiento del sitio.",
      "🛡️ Comprobar antes de guardar información con `document.cookie`.",
      "🔍 Diagnosticar problemas de sesión.",
      "✅ Evitar errores al iniciar sesión.",
    ],

    comoFunciona: [
      "JavaScript accede a `navigator.cookieEnabled`.",
      "El navegador comprueba si acepta cookies.",
      "Devuelve `true` si están habilitadas.",
      "Devuelve `false` si están deshabilitadas.",
      "No modifica nada: solo informa.",
      "Un `true` no garantiza que todas las cookies funcionen: pueden bloquearse por privacidad, extensiones o políticas del sitio.",
    ],

    sintaxis: [
      {
        code: `const habilitadas = navigator.cookieEnabled;`,
      },
      {
        caption: "Mostrar un mensaje:",
        code: `if (navigator.cookieEnabled) {
  console.log("Las cookies están habilitadas");
} else {
  console.log("Las cookies están deshabilitadas");
}`,
      },
      {
        caption: "Comprobar antes de crear una cookie:",
        code: `if (navigator.cookieEnabled) {
  document.cookie = "usuario=ana; path=/";
} else {
  console.log("No se pueden utilizar cookies");
}`,
      },
    ],

    nota: "💡 `cookieEnabled` no dice si una cookie concreta funciona: solo si el navegador acepta cookies en general. Las cookies de terceros o las bloqueadas por privacidad pueden fallar aunque devuelva `true`.",

    ejemplos: [
      {
        titulo: "1. 🍪 Consultar el estado",
        code: `console.log(navigator.cookieEnabled);
// true`,
      },
      {
        titulo: "2. ⚠️ Avisar al usuario",
        code: `if (navigator.cookieEnabled) {
  console.log("Las cookies están habilitadas.");
} else {
  console.log("Las cookies están deshabilitadas.");
}`,
      },
      {
        titulo: "3. ✅ Antes de crear una cookie",
        code: `if (navigator.cookieEnabled) {
  document.cookie = "usuario=Josue; path=/";
} else {
  console.log("No se pueden utilizar cookies.");
}`,
      },
      {
        titulo: "4. 🧭 Adaptar la interfaz",
        code: `const aviso = document.querySelector("#aviso-cookies");

if (!navigator.cookieEnabled) {
  aviso.hidden = false;
  aviso.textContent =
    "Activa las cookies para poder mantener la sesión iniciada.";
}`,
      },
      {
        titulo: "5. 🔍 Diagnóstico de sesión",
        code: `function puedeUsarSesion() {
  if (!navigator.cookieEnabled) return false;

  document.cookie = "prueba=1; path=/";
  const ok = document.cookie.includes("prueba=1");
  document.cookie = "prueba=; max-age=0; path=/";

  return ok;
}`,
      },
    ],

    errores: [
      "**Llamarla como función:** `navigator.cookieEnabled()` lanza un error; es una propiedad.",
      "**Intentar asignarle un valor:** es de solo lectura.",
      "**Creer que `true` garantiza todas las cookies:** pueden bloquearse por otras razones.",
      "**Usarla como sustituto de `document.cookie`:** no lee ni escribe cookies.",
      "**Olvidar que puede ser `false`:** el sitio debe tener un plan B.",
      "**Ignorar restricciones de terceros:** `true` no implica que funcionen cookies de otros dominios.",
    ],

    casos: [
      "🔐 Verificar requisitos antes de iniciar sesión.",
      "⚙️ Comprobar si se pueden guardar preferencias.",
      "⚠️ Informar cuando las cookies son necesarias.",
      "🔍 Diagnosticar problemas de sesión.",
      "🧭 Adaptar la experiencia según privacidad.",
      "✅ Evitar errores al escribir `document.cookie`.",
    ],

    relacion: [
      "**`document.cookie`:** lee y escribe cookies.",
      "**`localStorage` y `sessionStorage`:** almacenamiento web que no depende de cookies.",
      "**`navigator`:** objeto que expone información del navegador.",
      "**Web APIs:** `cookieEnabled` pertenece a ellas.",
      "**Permisos y privacidad:** afectan a qué cookies se aceptan.",
      "**`navigator.permissions`:** consulta otros permisos del navegador.",
    ],

    analogia:
      "Es como preguntar en un hotel si el huésped permite guardar sus preferencias para la próxima visita 🏨. La respuesta es sí o no. Si dice que sí, el hotel puede guardarlas, pero eso no garantiza que la habitación concreta esté disponible: puede haber otras restricciones. Y desde luego, preguntar no cambia la preferencia del huésped.",

    fuente: "MDN Web Docs · Navigator · cookieEnabled",

    notasPersonales: [
      "✅ Es una propiedad booleana de solo lectura.",
      "✅ Se usa sin paréntesis.",
      "⚠️ `true` no garantiza que una cookie concreta funcione.",
      "✅ Útil como comprobación previa, no como solución completa.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué tipo de valor devuelve navigator.cookieEnabled?",
        opciones: ["Un string", "Un booleano", "Una promesa", "Un número"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Es un método o una propiedad?",
        opciones: ["Un método", "Una propiedad", "Una clase", "Un evento"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Se puede modificar su valor?",
        opciones: ["Sí, asignando true", "No, es de solo lectura", "Solo en Chrome", "Solo con permisos"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué significa que devuelva true?",
        opciones: [
          "Que todas las cookies funcionarán",
          "Que el navegador acepta cookies en general",
          "Que la sesión está iniciada",
          "Que hay cookies guardadas",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué API se usa para leer y escribir cookies?",
        opciones: ["navigator.cookieEnabled", "document.cookie", "localStorage", "navigator.share"],
        correcta: 1,
      },
    ],
  },
};
