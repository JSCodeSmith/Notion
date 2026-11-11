/* Configuración de los simuladores de HTML.
   Cada etiqueta tiene su propio estado inicial, sus controles y la función
   que construye el código que se muestra en la vista previa. */

import { HTML_CONFIGS_EXTRA } from "./htmlConfigsExtra";

const escAttr = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const escText = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const attrs = (obj = {}) =>
  Object.entries(obj)
    .filter(([, value]) => value !== "" && value != null && value !== false)
    .map(([key, value]) =>
      value === true ? ` ${key}` : ` ${key}="${escAttr(value)}"`,
    )
    .join("");

const indent = (text = "", spaces = 2) =>
  String(text)
    .split("\n")
    .map((line) => (line.trim() ? `${" ".repeat(spaces)}${line}` : line))
    .join("\n");

const svgDemo = (titulo, desde, hasta, emoji) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="640" height="360" viewBox="0 0 640 360">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${desde}"/>
        <stop offset="1" stop-color="${hasta}"/>
      </linearGradient>
    </defs>
    <rect width="640" height="360" fill="url(#g)"/>
    <circle cx="520" cy="72" r="44" fill="rgba(255,255,255,.22)"/>
    <text x="34" y="188" font-family="system-ui, sans-serif" font-size="42" font-weight="700" fill="#ffffff">${titulo}</text>
    <text x="34" y="238" font-family="system-ui, sans-serif" font-size="23" fill="rgba(255,255,255,.86)">${emoji} Imagen de ejemplo</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

const DEMOS = {
  paisaje: {
    label: "🏞️ Paisaje",
    src: svgDemo("Paisaje", "#0ea5e9", "#22c55e", "🏞️"),
  },
  avatar: {
    label: "🙂 Avatar",
    src: svgDemo("Avatar", "#8b5cf6", "#ec4899", "🙂"),
  },
  logo: {
    label: "✨ Logotipo",
    src: svgDemo("Mi marca", "#f97316", "#facc15", "✨"),
  },
  ciudad: {
    label: "🌆 Ciudad",
    src: svgDemo("Ciudad", "#1e3a8a", "#06b6d4", "🌆"),
  },
};

/* URLs cortas y legibles para el código del simulador. La vista previa las
   sustituye por las imágenes SVG locales para que funcione sin conexión. */
const DEMO_URLS = {
  paisaje: "https://picsum.photos/seed/paisaje/640/360",
  avatar: "https://picsum.photos/seed/avatar/640/360",
  logo: "https://picsum.photos/seed/logo/640/360",
  ciudad: "https://picsum.photos/seed/ciudad/640/360",
};

const demoOptions = Object.entries(DEMOS).map(([value, demo]) => ({
  value,
  label: demo.label,
}));

const listaDeLineas = (texto = "") =>
  String(texto)
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

const slug = (texto = "") =>
  String(texto)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

/* ------------------------------------------------------------------ */
/* Estructura del documento                                            */
/* ------------------------------------------------------------------ */

const estructura = {
  "html-doctype-html": {
    icon: "📜",
    etiqueta: "<!DOCTYPE html>",
    descripcion:
      "Activa o desactiva la declaración y observa la diferencia entre standards mode y quirks mode.",
    vista: "doctype",
    nota: "Sin DOCTYPE el navegador entra en quirks mode y puede calcular mal tamaños, márgenes y el box model.",
    campos: [
      {
        key: "incluir",
        label: "Incluir <!DOCTYPE html>",
        tipo: "checkbox",
        valor: true,
      },
    ],
    construir: (v) =>
      v.incluir
        ? "<!DOCTYPE html>\n<html lang=\"es\">\n  <head>...</head>\n  <body>...</body>\n</html>"
        : "<!-- Sin DOCTYPE: el navegador usa quirks mode -->\n<html lang=\"es\">\n  <head>...</head>\n  <body>...</body>\n</html>",
  },

  "html-html": {
    icon: "🌐",
    etiqueta: "<html>",
    descripcion:
      "Cambia el idioma del documento y el contenido del body. El elemento raíz envuelve todo el documento.",
    campos: [
      {
        key: "lang",
        label: "Atributo lang",
        tipo: "select",
        opciones: ["es", "en", "fr", "pt", "de"],
        valor: "es",
      },
      {
        key: "contenido",
        label: "Contenido del body",
        tipo: "textarea",
        valor:
          '<h1>Hola, mundo</h1>\n<p>Mi primera página HTML.</p>\n<p lang="en">This paragraph is in English.</p>',
      },
    ],
    construir: (v) => `<!DOCTYPE html>
<html lang="${v.lang}">
<head>
  <meta charset="UTF-8">
  <title>Mi página</title>
</head>
<body>
${indent(v.contenido)}
</body>
</html>`,
  },

  "html-head": {
    icon: "🧠",
    etiqueta: "<head>",
    descripcion:
      "Los metadatos no se ven en la página, pero definen el título de la pestaña, la codificación y cómo se indexa el documento.",
    vista: "head",
    nota: "Todo lo que va en <head> describe el documento: título, charset, viewport, descripción, estilos y enlaces a recursos.",
    campos: [
      {
        key: "title",
        label: "Título de la pestaña",
        tipo: "text",
        valor: "Mi página HTML",
      },
      {
        key: "descripcion",
        label: "meta description",
        tipo: "textarea",
        valor: "Apuntes y ejemplos interactivos de HTML.",
      },
      {
        key: "charset",
        label: "charset",
        tipo: "select",
        opciones: ["UTF-8", "ISO-8859-1"],
        valor: "UTF-8",
      },
      {
        key: "viewport",
        label: 'Incluir meta viewport',
        tipo: "checkbox",
        valor: true,
      },
    ],
    construir: (v) => `<head>
  <meta charset="${v.charset}">
${v.viewport ? '  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n' : ""}${
      v.descripcion
        ? `  <meta name="description" content="${escAttr(v.descripcion)}">\n`
        : ""
    }  <title>${v.title}</title>
</head>`,
  },

  "html-body": {
    icon: "🧍",
    etiqueta: "<body>",
    descripcion:
      "El body contiene todo lo visible. Prueba un color de fondo y cambia el contenido.",
    campos: [
      {
        key: "fondo",
        label: "Color de fondo",
        tipo: "color",
        valor: "#ffffff",
      },
      {
        key: "contenido",
        label: "Contenido visible",
        tipo: "textarea",
        valor:
          "<h1>Bienvenido</h1>\n<p>Este contenido vive dentro de &lt;body&gt;.</p>\n<button>Un botón</button>",
      },
    ],
    construir: (v) => `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Body</title>
  <style>
    body { background: ${v.fondo}; }
  </style>
</head>
<body>
${indent(v.contenido)}
</body>
</html>`,
  },

  "html-style": {
    icon: "🎨",
    etiqueta: "<style>",
    descripcion:
      "Escribe CSS dentro del documento y observa cómo cambia el contenido al instante.",
    nota: "La etiqueta <style> va normalmente dentro de <head>, aunque el navegador también la acepta en el body.",
    campos: [
      {
        key: "css",
        label: "Reglas CSS",
        tipo: "textarea",
        valor:
          ".destacado {\n  color: #e11d48;\n  font-weight: 700;\n}\n\n.tarjeta {\n  padding: 14px;\n  border: 1px solid #cbd5e1;\n  border-radius: 10px;\n  background: #f8fafc;\n}",
      },
      {
        key: "contenido",
        label: "HTML al que se aplica",
        tipo: "textarea",
        valor:
          '<h1 class="destacado">Estilos con &lt;style&gt;</h1>\n<div class="tarjeta">\n  <p>Este bloque usa la clase <code>tarjeta</code>.</p>\n</div>',
      },
    ],
    construir: (v) => `<style>
${indent(v.css)}
</style>

${v.contenido}`,
  },
};

/* ------------------------------------------------------------------ */
/* Semántica estructural                                               */
/* ------------------------------------------------------------------ */

const semantica = (tag, icon, contenido, nota) => ({
  icon,
  etiqueta: `<${tag}>`,
  descripcion: `Edita el contenido de <${tag}> y observa qué región del documento representa.`,
  resaltar: true,
  nota,
  campos: [
    {
      key: "contenido",
      label: "Contenido",
      tipo: "textarea",
      valor: contenido,
    },
    { key: "clase", label: "class (opcional)", tipo: "text", valor: "" },
  ],
  construir: (v) => `<${tag}${attrs({ class: v.clase })}>
${indent(v.contenido)}
</${tag}>`,
});

const semanticaConfigs = {
  "html-header": semantica(
    "header",
    "🔝",
    "<h1>Mi sitio</h1>\n<p>Bienvenido a mi página.</p>",
    "Un <header> puede aparecer al inicio de la página o dentro de un <article> o <section>.",
  ),
  "html-footer": semantica(
    "footer",
    "🔚",
    "<p>© 2026 Mi sitio. Todos los derechos reservados.</p>\n<nav><a href=\"/privacidad\">Privacidad</a></nav>",
    "El <footer> cierra una página o una sección con información de contacto, autoría o enlaces legales.",
  ),
  "html-main": semantica(
    "main",
    "📄",
    "<h2>Contenido principal</h2>\n<p>Aquí va el contenido central de la página.</p>",
    "Debe haber un solo <main> visible por documento y no debe incluir cabeceras, pies ni menús repetidos.",
  ),
  "html-section": semantica(
    "section",
    "📑",
    "<h2>Noticias</h2>\n<p>Últimas novedades del proyecto.</p>",
    "Una <section> agrupa contenido relacionado y normalmente empieza con un encabezado.",
  ),
  "html-article": semantica(
    "article",
    "📰",
    "<h2>Cómo aprender HTML</h2>\n<p>Artículo independiente con contenido propio.</p>",
    "Un <article> tiene sentido por sí solo: una entrada de blog, una noticia o una ficha de producto.",
  ),
  "html-nav": semantica(
    "nav",
    "🧭",
    '<ul>\n  <li><a href="/">Inicio</a></li>\n  <li><a href="/blog">Blog</a></li>\n  <li><a href="/contacto">Contacto</a></li>\n</ul>',
    "Reserva <nav> para bloques importantes de navegación, no para cualquier grupo de enlaces.",
  ),
  "html-aside": semantica(
    "aside",
    "📎",
    "<h3>Dato curioso</h3>\n<p>HTML significa HyperText Markup Language.</p>",
    "Un <aside> contiene información complementaria: notas, anuncios, biografías o enlaces relacionados.",
  ),
  "html-div": semantica(
    "div",
    "📦",
    "<p>Un contenedor genérico sin significado semántico.</p>",
    "Usa <div> solo cuando ningún elemento semántico describe mejor el contenido.",
  ),
};

/* ------------------------------------------------------------------ */
/* Encabezados                                                         */
/* ------------------------------------------------------------------ */

const encabezado = (nivel, icon, texto) => ({
  icon,
  etiqueta: `<h${nivel}>`,
  descripcion: `Cambia el texto y la alineación del encabezado de nivel ${nivel}.`,
  nota:
    nivel === 1
      ? "Cada página debería tener un solo <h1> que describa su tema principal."
      : `Los encabezados <h1>–<h6> crean la jerarquía del documento. No saltes niveles solo por el tamaño visual.`,
  campos: [
    { key: "texto", label: "Texto", tipo: "text", valor: texto },
    {
      key: "alineacion",
      label: "Alineación",
      tipo: "select",
      opciones: ["left", "center", "right"],
      valor: "left",
    },
  ],
  construir: (v) =>
    `<h${nivel} style="text-align: ${v.alineacion}">${v.texto}</h${nivel}>`,
});

const encabezados = {
  "html-h1": encabezado(1, "1️⃣", "Título principal"),
  "html-h2": encabezado(2, "2️⃣", "Sección"),
  "html-h3": encabezado(3, "3️⃣", "Subsección"),
  "html-h4": encabezado(4, "4️⃣", "Apartado"),
  "html-h5": encabezado(5, "5️⃣", "Subapartado"),
  "html-h6": encabezado(6, "6️⃣", "Detalle"),
};

/* ------------------------------------------------------------------ */
/* Texto y agrupación                                                  */
/* ------------------------------------------------------------------ */

const textoConfigs = {
  "html-p": {
    icon: "📄",
    etiqueta: "<p>",
    descripcion:
      "Escribe un párrafo, cambia la alineación y observa cómo el navegador lo separa del resto.",
    nota: "Cada <p> representa un párrafo completo. No lo uses para saltos de línea sueltos.",
    campos: [
      {
        key: "texto",
        label: "Texto del párrafo",
        tipo: "textarea",
        valor:
          "HTML es el lenguaje de marcado estándar para crear páginas web. Los párrafos se separan automáticamente con un margen vertical.",
      },
      {
        key: "alineacion",
        label: "Alineación",
        tipo: "select",
        opciones: ["left", "center", "right", "justify"],
        valor: "left",
      },
      { key: "clase", label: "class (opcional)", tipo: "text", valor: "" },
    ],
    construir: (v) =>
      `<p${attrs({ class: v.clase })} style="text-align: ${v.alineacion}">${v.texto}</p>`,
  },

  "html-br": {
    icon: "↩️",
    etiqueta: "<br>",
    descripcion:
      "Cada línea se convierte en un salto <br>. Ideal para direcciones, poemas o letras de canciones.",
    nota: "<br> es un elemento vacío: no tiene cierre y no debe usarse para separar párrafos completos.",
    campos: [
      {
        key: "lineas",
        label: "Líneas de texto",
        tipo: "textarea",
        valor: "Calle Mayor 123\n28013 Madrid\nEspaña",
      },
      {
        key: "etiqueta",
        label: "Etiqueta contenedora",
        tipo: "select",
        opciones: ["p", "div"],
        valor: "p",
      },
    ],
    construir: (v) => {
      const contenido = listaDeLineas(v.lineas).join("<br>\n");
      return `<${v.etiqueta}>\n${indent(contenido)}\n</${v.etiqueta}>`;
    },
  },

  "html-hr": {
    icon: "➖",
    etiqueta: "<hr>",
    descripcion:
      "Ajusta grosor, color, ancho y estilo del separador temático.",
    nota: "<hr> representa un cambio de tema entre secciones, no solo una línea decorativa.",
    campos: [
      {
        key: "grosor",
        label: "Grosor",
        tipo: "range",
        min: 1,
        max: 12,
        valor: 2,
        unidad: "px",
      },
      {
        key: "color",
        label: "Color",
        tipo: "color",
        valor: "#94a3b8",
      },
      {
        key: "ancho",
        label: "Ancho",
        tipo: "range",
        min: 20,
        max: 100,
        valor: 100,
        unidad: "%",
      },
      {
        key: "estilo",
        label: "Estilo",
        tipo: "select",
        opciones: ["solid", "dashed", "dotted", "double"],
        valor: "solid",
      },
    ],
    construir: (v) =>
      `<hr style="border: none; border-top: ${v.grosor}px ${v.estilo} ${v.color}; width: ${v.ancho}%;">`,
  },

  "html-pre": {
    icon: "📋",
    etiqueta: "<pre>",
    descripcion:
      "El texto preformateado conserva espacios y saltos de línea tal como los escribes.",
    nota: "Usa <pre> junto con <code> para mostrar código o texto ASCII que necesita alineación exacta.",
    campos: [
      {
        key: "texto",
        label: "Texto preformateado",
        tipo: "textarea",
        valor:
          "Nombre       Edad    Ciudad\nAna Pérez    28      Madrid\nLuis Gómez   34      Buenos Aires\nMarta Ruiz   41      Ciudad de México",
      },
      {
        key: "envolver",
        label: "Permitir ajuste de línea",
        tipo: "checkbox",
        valor: false,
      },
    ],
    construir: (v) =>
      `<pre${v.envolver ? ' style="white-space: pre-wrap;"' : ""}>${escText(v.texto)}</pre>`,
  },
};

/* ------------------------------------------------------------------ */
/* Énfasis y código                                                    */
/* ------------------------------------------------------------------ */

const enfasis = (tag, icon, antes, despues, nota) => ({
  icon,
  etiqueta: `<${tag}>`,
  descripcion: `Cambia el texto marcado con <${tag}> y compáralo con el texto normal.`,
  nota,
  campos: [
    { key: "texto", label: "Texto marcado", tipo: "text", valor: "texto importante" },
  ],
  construir: (v) =>
    `<p>${antes}<${tag}>${v.texto}</${tag}>${despues}</p>`,
});

const enfasisConfigs = {
  "html-strong": enfasis(
    "strong",
    "💪",
    "Recuerda: ",
    " para guardar el documento.",
    "<strong> aporta importancia semántica. Los lectores de pantalla pueden cambiar la entonación.",
  ),
  "html-em": enfasis(
    "em",
    "🔊",
    "No quiero ",
    " ese botón.",
    "<em> marca énfasis semántico; normalmente se muestra en cursiva, pero el significado es lo importante.",
  ),
  "html-b": enfasis(
    "b",
    "🅱️",
    "Este texto es ",
    " solo por estilo visual.",
    "<b> llama la atención sin añadir importancia semántica. Si el texto es importante, usa <strong>.",
  ),
  "html-i": enfasis(
    "i",
    "🔤",
    "El término ",
    " proviene del latín.",
    "<i> se usa para términos técnicos, nombres científicos, pensamientos o texto en otro idioma.",
  ),
  "html-u": enfasis(
    "u",
    "🖊️",
    "Revisa la palabra ",
    " del ejercicio.",
    "<u> marca texto subrayado con significado no textual. Para enlaces usa <a>, no <u>.",
  ),
  "html-code": enfasis(
    "code",
    "💻",
    "Ejecuta ",
    " en la consola para ver el resultado.",
    "<code> representa un fragmento de código. Para bloques completos combínalo con <pre>.",
  ),
};

/* ------------------------------------------------------------------ */
/* Listas                                                              */
/* ------------------------------------------------------------------ */

const listasConfigs = {
  "html-ul": {
    icon: "•",
    etiqueta: "<ul>",
    descripcion:
      "Escribe un elemento por línea y prueba los distintos estilos de viñeta.",
    nota: "Solo <li> debe ser hijo directo de <ul>. Para anidar una lista, colócala dentro de un <li>.",
    campos: [
      {
        key: "items",
        label: "Elementos (uno por línea)",
        tipo: "textarea",
        valor: "Manzana\nPlátano\nNaranja",
      },
      {
        key: "tipo",
        label: "list-style-type",
        tipo: "select",
        opciones: ["disc", "circle", "square", "none"],
        valor: "disc",
      },
      {
        key: "anidada",
        label: "Añadir sublista al primer elemento",
        tipo: "checkbox",
        valor: false,
      },
    ],
    construir: (v) => {
      const items = listaDeLineas(v.items);
      const lis = items
        .map((item, index) => {
          if (index === 0 && v.anidada) {
            return `  <li>${item}\n    <ul>\n      <li>Subelemento A</li>\n      <li>Subelemento B</li>\n    </ul>\n  </li>`;
          }
          return `  <li>${item}</li>`;
        })
        .join("\n");
      return `<ul style="list-style-type: ${v.tipo}">\n${lis}\n</ul>`;
    },
  },

  "html-ol": {
    icon: "1️⃣",
    etiqueta: "<ol>",
    descripcion:
      "Cambia la numeración, el punto de inicio y el sentido de la lista ordenada.",
    nota: "Usa <ol> cuando el orden cambia el significado: pasos, rankings, instrucciones.",
    campos: [
      {
        key: "items",
        label: "Elementos (uno por línea)",
        tipo: "textarea",
        valor: "Precalentar el horno\nMezclar los ingredientes\nHornear durante 30 minutos",
      },
      {
        key: "tipo",
        label: "type",
        tipo: "select",
        opciones: ["1", "A", "a", "I", "i"],
        valor: "1",
      },
      {
        key: "inicio",
        label: "start",
        tipo: "range",
        min: 1,
        max: 10,
        valor: 1,
        unidad: "",
      },
      {
        key: "reversed",
        label: "Orden inverso (reversed)",
        tipo: "checkbox",
        valor: false,
      },
    ],
    construir: (v) => {
      const lis = listaDeLineas(v.items)
        .map((item) => `  <li>${item}</li>`)
        .join("\n");
      return `<ol type="${v.tipo}" start="${v.inicio}"${v.reversed ? " reversed" : ""}>\n${lis}\n</ol>`;
    },
  },

  "html-li": {
    icon: "▪️",
    etiqueta: "<li>",
    descripcion:
      "Cada <li> representa un elemento de lista. Prueba a cambiar su valor y el tipo de lista padre.",
    nota: "El atributo value solo tiene efecto dentro de una lista ordenada <ol>.",
    campos: [
      { key: "texto", label: "Texto del elemento", tipo: "text", valor: "Elemento destacado" },
      {
        key: "padre",
        label: "Lista padre",
        tipo: "select",
        opciones: ["ul", "ol"],
        valor: "ul",
      },
      { key: "valor", label: "value (solo en <ol>)", tipo: "text", valor: "" },
    ],
    construir: (v) => {
      const valor = v.padre === "ol" && v.valor ? ` value="${escAttr(v.valor)}"` : "";
      return `<${v.padre}>\n  <li>Primer elemento</li>\n  <li${valor}>${v.texto}</li>\n  <li>Tercer elemento</li>\n</${v.padre}>`;
    },
  },
};

/* ------------------------------------------------------------------ */
/* Enlaces                                                             */
/* ------------------------------------------------------------------ */

const enlacesConfigs = {
  "html-a": {
    icon: "🔗",
    etiqueta: "<a>",
    descripcion:
      "Cambia el destino, el texto y el comportamiento del enlace. Prueba abrirlo en otra pestaña.",
    nota: "Cuando uses target=\"_blank\", añade rel=\"noopener noreferrer\" por seguridad.",
    campos: [
      { key: "texto", label: "Texto visible", tipo: "text", valor: "Visita MDN" },
      {
        key: "href",
        label: "href (destino)",
        tipo: "text",
        valor: "https://developer.mozilla.org/es/docs/Web/HTML",
      },
      {
        key: "target",
        label: "target",
        tipo: "select",
        opciones: ["_self", "_blank", "_parent", "_top"],
        valor: "_blank",
      },
      {
        key: "download",
        label: "Descargar el recurso (download)",
        tipo: "checkbox",
        valor: false,
      },
    ],
    construir: (v) => {
      const rel = v.target === "_blank" ? ' rel="noopener noreferrer"' : "";
      return `<a href="${escAttr(v.href)}" target="${v.target}"${rel}${v.download ? " download" : ""}>${v.texto}</a>`;
    },
  },
};

/* ------------------------------------------------------------------ */
/* Formularios                                                         */
/* ------------------------------------------------------------------ */

const formulariosConfigs = {
  "html-form": {
    icon: "📋",
    etiqueta: "<form>",
    descripcion:
      "Configura el destino y el método del formulario, y edita los controles que contiene.",
    nota: "method=\"get\" envía los datos en la URL; method=\"post\" los envía en el cuerpo de la petición.",
    campos: [
      { key: "accion", label: "action", tipo: "text", valor: "/enviar" },
      {
        key: "metodo",
        label: "method",
        tipo: "select",
        opciones: ["get", "post"],
        valor: "post",
      },
      {
        key: "contenido",
        label: "Controles del formulario",
        tipo: "textarea",
        valor:
          '<label for="nombre">Nombre</label>\n<input id="nombre" name="nombre" type="text" placeholder="Tu nombre">\n\n<label for="email">Correo</label>\n<input id="email" name="email" type="email" placeholder="tu@correo.com">\n\n<button type="submit">Enviar</button>',
      },
    ],
    construir: (v) => `<form action="${escAttr(v.accion)}" method="${v.metodo}">
${indent(v.contenido)}
</form>`,
  },

  "html-select": {
    icon: "📋",
    etiqueta: "<select>",
    descripcion:
      "Crea una lista desplegable. Prueba el atributo multiple y el tamaño visible.",
    nota: "Cada opción vive dentro de un <option>. Usa <label> para asociar una etiqueta al control.",
    campos: [
      { key: "nombre", label: "name", tipo: "text", valor: "lenguaje" },
      {
        key: "opciones",
        label: "Opciones (una por línea)",
        tipo: "textarea",
        valor: "HTML\nCSS\nJavaScript\nPython",
      },
      {
        key: "multiple",
        label: "Permitir selección múltiple",
        tipo: "checkbox",
        valor: false,
      },
      {
        key: "tamano",
        label: "size (opciones visibles)",
        tipo: "range",
        min: 1,
        max: 6,
        valor: 1,
        unidad: "",
      },
    ],
    construir: (v) => {
      const opciones = listaDeLineas(v.opciones)
        .map((opcion) => `  <option value="${slug(opcion)}">${opcion}</option>`)
        .join("\n");
      return `<label for="${escAttr(v.nombre)}">Elige una opción:</label>\n<select id="${escAttr(v.nombre)}" name="${escAttr(v.nombre)}"${v.multiple ? " multiple" : ""} size="${v.tamano}">\n${opciones}\n</select>`;
    },
  },

  "html-option": {
    icon: "🔘",
    etiqueta: "<option>",
    descripcion:
      "Cada <option> es una opción dentro de un <select>. Prueba a marcarla como seleccionada o deshabilitada.",
    nota: "El atributo value es el dato que se envía; el texto entre las etiquetas es lo que ve el usuario.",
    campos: [
      { key: "texto", label: "Texto visible", tipo: "text", valor: "JavaScript" },
      { key: "valor", label: "value", tipo: "text", valor: "javascript" },
      {
        key: "seleccionado",
        label: "selected",
        tipo: "checkbox",
        valor: true,
      },
      {
        key: "deshabilitado",
        label: "disabled",
        tipo: "checkbox",
        valor: false,
      },
    ],
    construir: (v) => `<select name="lenguaje">
  <option value="html">HTML</option>
  <option value="${escAttr(v.valor)}"${v.seleccionado ? " selected" : ""}${v.deshabilitado ? " disabled" : ""}>${v.texto}</option>
  <option value="css">CSS</option>
</select>`,
  },

  "html-textarea": {
    icon: "📝",
    etiqueta: "<textarea>",
    descripcion:
      "Ajusta filas, columnas y texto inicial del área de texto multínea.",
    nota: "El texto inicial va entre las etiquetas de apertura y cierre; el atributo placeholder solo muestra una pista.",
    campos: [
      { key: "filas", label: "rows", tipo: "range", min: 2, max: 12, valor: 4, unidad: "" },
      { key: "columnas", label: "cols", tipo: "range", min: 20, max: 80, valor: 40, unidad: "" },
      {
        key: "placeholder",
        label: "placeholder",
        tipo: "text",
        valor: "Escribe tu comentario...",
      },
      {
        key: "texto",
        label: "Texto inicial",
        tipo: "textarea",
        valor: "",
      },
    ],
    construir: (v) =>
      `<textarea rows="${v.filas}" cols="${v.columnas}" placeholder="${escAttr(v.placeholder)}">${v.texto}</textarea>`,
  },
};

/* ------------------------------------------------------------------ */
/* Multimedia y figuras                                                */
/* ------------------------------------------------------------------ */

const multimediaConfigs = {
  "html-img": {
    icon: "🖼️",
    etiqueta: "<img>",
    descripcion:
      "Cambia la imagen, el texto alternativo y el tamaño. La vista previa usa imágenes SVG de ejemplo.",
    nota: "<img> es un elemento vacío. El atributo alt es obligatorio para accesibilidad y se muestra si la imagen falla.",
    campos: [
      {
        key: "demo",
        label: "Imagen de ejemplo",
        tipo: "select",
        opciones: demoOptions,
        valor: "paisaje",
      },
      {
        key: "srcPersonalizada",
        label: "URL personalizada (opcional)",
        tipo: "text",
        valor: "",
      },
      { key: "alt", label: "Texto alternativo (alt)", tipo: "text", valor: "Paisaje con montañas y cielo azul" },
      { key: "ancho", label: "Ancho", tipo: "range", min: 80, max: 480, valor: 320, unidad: "px" },
      { key: "redondeo", label: "border-radius", tipo: "range", min: 0, max: 40, valor: 10, unidad: "px" },
      {
        key: "loading",
        label: "loading",
        tipo: "select",
        opciones: ["eager", "lazy"],
        valor: "lazy",
      },
    ],
    construir: (v) => {
      const src =
        v.srcPersonalizada || DEMO_URLS[v.demo] || DEMO_URLS.paisaje;
      return `<img src="${escAttr(src)}" alt="${escAttr(v.alt)}" width="${v.ancho}" loading="${v.loading}" style="border-radius: ${v.redondeo}px; max-width: 100%; height: auto;">`;
    },
  },

  "html-audio": {
    icon: "🔊",
    etiqueta: "<audio>",
    descripcion:
      "Activa o desactiva los controles y prueba los atributos loop, muted y autoplay.",
    nota: "Los navegadores bloquean el autoplay con sonido. Usa muted si necesitas reproducir automáticamente.",
    campos: [
      {
        key: "src",
        label: "Fuente de audio",
        tipo: "text",
        valor:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3",
      },
      { key: "controls", label: "Mostrar controles", tipo: "checkbox", valor: true },
      { key: "loop", label: "Repetir (loop)", tipo: "checkbox", valor: false },
      { key: "muted", label: "Silenciar (muted)", tipo: "checkbox", valor: false },
      {
        key: "texto",
        label: "Texto alternativo",
        tipo: "text",
        valor: "Tu navegador no admite audio.",
      },
    ],
    construir: (v) => `<audio${v.controls ? " controls" : ""}${v.loop ? " loop" : ""}${v.muted ? " muted" : ""}>
  <source src="${escAttr(v.src)}" type="audio/mpeg">
  ${v.texto}
</audio>`,
  },

  "html-video": {
    icon: "🎥",
    etiqueta: "<video>",
    descripcion:
      "Ajusta el ancho, los controles y el póster del video de ejemplo.",
    nota: "El atributo poster muestra una imagen mientras el video carga o antes de reproducirse.",
    campos: [
      {
        key: "src",
        label: "Fuente de video",
        tipo: "text",
        valor:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      { key: "controls", label: "Mostrar controles", tipo: "checkbox", valor: true },
      { key: "loop", label: "Repetir (loop)", tipo: "checkbox", valor: false },
      { key: "muted", label: "Silenciar (muted)", tipo: "checkbox", valor: true },
      { key: "ancho", label: "Ancho", tipo: "range", min: 180, max: 560, valor: 360, unidad: "px" },
      {
        key: "poster",
        label: "Póster",
        tipo: "select",
        opciones: demoOptions,
        valor: "paisaje",
      },
    ],
    construir: (v) => `<video${v.controls ? " controls" : ""}${v.loop ? " loop" : ""}${v.muted ? " muted" : ""} width="${v.ancho}" poster="${escAttr(DEMO_URLS[v.poster] || DEMO_URLS.paisaje)}">
  <source src="${escAttr(v.src)}" type="video/mp4">
  Tu navegador no admite video.
</video>`,
  },

  "html-source": {
    icon: "🎞️",
    etiqueta: "<source>",
    descripcion:
      "Añade una fuente alternativa a un audio o video. Prueba a cambiar el tipo MIME.",
    nota: "<source> es un elemento vacío y debe ir dentro de <audio> o <video>, antes del texto alternativo.",
    campos: [
      {
        key: "padre",
        label: "Elemento padre",
        tipo: "select",
        opciones: ["video", "audio"],
        valor: "video",
      },
      {
        key: "src",
        label: "src",
        tipo: "text",
        valor:
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
      },
      { key: "tipo", label: "type", tipo: "text", valor: "video/mp4" },
      {
        key: "texto",
        label: "Texto alternativo",
        tipo: "text",
        valor: "Tu navegador no admite este formato.",
      },
    ],
    construir: (v) => `<${v.padre} controls>
  <source src="${escAttr(v.src)}" type="${escAttr(v.tipo)}">
  ${v.texto}
</${v.padre}>`,
  },

  "html-iframe": {
    icon: "🪟",
    etiqueta: "<iframe>",
    descripcion:
      "Incrusta otro documento dentro de la página. Puedes escribir el contenido interno o usar una URL.",
    nota: "Los iframes tienen aislamiento y reglas de seguridad propias. Usa siempre el atributo title.",
    campos: [
      {
        key: "titulo",
        label: "title",
        tipo: "text",
        valor: "Documento embebido de ejemplo",
      },
      {
        key: "src",
        label: "src (opcional)",
        tipo: "text",
        valor: "",
      },
      {
        key: "contenido",
        label: "Contenido interno (si no usas src)",
        tipo: "textarea",
        valor:
          '<h2>Contenido embebido</h2>\n<p>Este documento vive dentro de un iframe.</p>',
      },
      { key: "ancho", label: "Ancho", tipo: "range", min: 200, max: 600, valor: 420, unidad: "px" },
      { key: "alto", label: "Alto", tipo: "range", min: 100, max: 360, valor: 180, unidad: "px" },
    ],
    construir: (v) => {
      if (v.src) {
        return `<iframe src="${escAttr(v.src)}" title="${escAttr(v.titulo)}" width="${v.ancho}" height="${v.alto}" loading="lazy"></iframe>`;
      }
      const srcdoc = escAttr(v.contenido).replace(/\n/g, "&#10;");
      return `<iframe title="${escAttr(v.titulo)}" width="${v.ancho}" height="${v.alto}" srcdoc="${srcdoc}"></iframe>`;
    },
  },

  "html-figure": {
    icon: "🖼️",
    etiqueta: "<figure>",
    descripcion:
      "Agrupa una imagen con su pie de foto. Cambia la imagen, el texto y el ancho.",
    nota: "<figure> puede contener imágenes, código, tablas o cualquier contenido que se explique con un <figcaption>.",
    campos: [
      {
        key: "demo",
        label: "Imagen",
        tipo: "select",
        opciones: demoOptions,
        valor: "ciudad",
      },
      { key: "alt", label: "Texto alternativo", tipo: "text", valor: "Vista de la ciudad al atardecer" },
      {
        key: "caption",
        label: "Pie de foto",
        tipo: "text",
        valor: "Figura 1. La ciudad al atardecer.",
      },
      { key: "ancho", label: "Ancho de la imagen", tipo: "range", min: 120, max: 480, valor: 320, unidad: "px" },
    ],
    construir: (v) => `<figure style="margin: 0;">
  <img src="${escAttr(DEMO_URLS[v.demo] || DEMO_URLS.ciudad)}" alt="${escAttr(v.alt)}" width="${v.ancho}" style="max-width: 100%; height: auto; border-radius: 10px;">
  <figcaption>${v.caption}</figcaption>
</figure>`,
  },

  "html-figcaption": {
    icon: "📝",
    etiqueta: "<figcaption>",
    descripcion:
      "El pie de foto describe la figura. Escribe el texto y observa su posición.",
    nota: "<figcaption> debe ser el primero o el último hijo de <figure>.",
    campos: [
      {
        key: "caption",
        label: "Texto del pie de foto",
        tipo: "text",
        valor: "Figura 1. La ciudad al atardecer.",
      },
      {
        key: "demo",
        label: "Imagen de la figura",
        tipo: "select",
        opciones: demoOptions,
        valor: "ciudad",
      },
      { key: "alt", label: "Texto alternativo", tipo: "text", valor: "Vista de la ciudad al atardecer" },
    ],
    construir: (v) => `<figure style="margin: 0;">
  <img src="${escAttr(DEMO_URLS[v.demo] || DEMO_URLS.ciudad)}" alt="${escAttr(v.alt)}" width="320" style="max-width: 100%; height: auto; border-radius: 10px;">
  <figcaption>${v.caption}</figcaption>
</figure>`,
  },
};

/* ------------------------------------------------------------------ */
/* Registro                                                            */
/* ------------------------------------------------------------------ */

export const HTML_CONFIGS = {
  ...estructura,
  ...semanticaConfigs,
  ...encabezados,
  ...textoConfigs,
  ...enfasisConfigs,
  ...listasConfigs,
  ...enlacesConfigs,
  ...formulariosConfigs,
  ...multimediaConfigs,
  ...HTML_CONFIGS_EXTRA,
};

export const HTML_FALLBACK = {
  icon: "🧪",
  etiqueta: "HTML",
  descripcion: "Edita el código y observa el resultado en la vista previa.",
  campos: [
    {
      key: "codigo",
      label: "Código HTML",
      tipo: "textarea",
      valor: "<p>Hola, mundo</p>",
    },
  ],
  construir: (v) => v.codigo,
};

export { DEMOS, DEMO_URLS };
