/* Simuladores de los elementos HTML añadidos desde Apuntes/ElmentosHtml.txt.
   Cada configuración construye el código y la vista previa del simulador. */

const esc = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const attrs = (mapa) =>
  Object.entries(mapa)
    .filter(([, valor]) => valor !== "" && valor !== undefined && valor !== null && valor !== false)
    .map(([clave, valor]) =>
      valor === true ? ` ${clave}` : ` ${clave}="${esc(valor)}"`,
    )
    .join("");

const lineas = (texto) =>
  String(texto)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

const svgDataUri = (svg) =>
  `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

const demoImagen = (color = "#2563eb", etiqueta = "Imagen de ejemplo") =>
  svgDataUri(
    `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="270" viewBox="0 0 480 270">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="${color}"/>
          <stop offset="1" stop-color="#0f172a"/>
        </linearGradient>
      </defs>
      <rect width="480" height="270" fill="url(#g)"/>
      <circle cx="120" cy="90" r="46" fill="rgba(255,255,255,.22)"/>
      <path d="M0 220 L150 120 L260 210 L350 150 L480 240 L480 270 L0 270 Z" fill="rgba(255,255,255,.28)"/>
      <text x="24" y="42" fill="#fff" font-family="sans-serif" font-size="18">${etiqueta}</text>
    </svg>`,
  );

const demoMapa = svgDataUri(
  `<svg xmlns="http://www.w3.org/2000/svg" width="480" height="270" viewBox="0 0 480 270">
    <rect width="480" height="270" fill="#e2e8f0"/>
    <rect x="20" y="20" width="180" height="110" rx="8" fill="#93c5fd"/>
    <rect x="220" y="20" width="240" height="110" rx="8" fill="#86efac"/>
    <rect x="20" y="150" width="440" height="100" rx="8" fill="#fcd34d"/>
    <text x="50" y="80" font-family="sans-serif" font-size="18" fill="#1e3a8a">Sala</text>
    <text x="280" y="80" font-family="sans-serif" font-size="18" fill="#065f46">Cocina</text>
    <text x="180" y="205" font-family="sans-serif" font-size="18" fill="#78350f">Patio</text>
  </svg>`,
);

const HTML_CONFIGS_EXTRA = {
  "html-span": {
    icon: "✨",
    etiqueta: "<span>",
    descripcion:
      "Un span no aporta semántica por sí mismo: sirve para envolver una parte del texto y darle estilo o comportamiento.",
    nota: "A diferencia de <div>, <span> es inline: no rompe la línea ni crea bloques.",
    campos: [
      {
        key: "texto",
        label: "Texto completo",
        tipo: "text",
        valor: "Aprende HTML y CSS paso a paso.",
      },
      {
        key: "resaltado",
        label: "Palabra a envolver",
        tipo: "text",
        valor: "HTML",
      },
      { key: "color", label: "Color", tipo: "color", valor: "#e11d48" },
      { key: "fondo", label: "Fondo", tipo: "color", valor: "#ffe4e6" },
    ],
    construir: (v) => {
      const texto = String(v.texto);
      const palabra = String(v.resaltado).trim();
      const envuelto = palabra
        ? texto.replace(
            palabra,
            `<span style="color: ${v.color}; background: ${v.fondo}; padding: 0 4px; border-radius: 4px;">${esc(palabra)}</span>`,
          )
        : `<span style="color: ${v.color};">${esc(texto)}</span>`;
      return `<p>${envuelto}</p>`;
    },
  },

  "html-small": {
    icon: "🔡",
    etiqueta: "<small>",
    descripcion:
      "Marca letra pequeña con significado: avisos legales, notas al pie, condiciones o comentarios secundarios.",
    nota: "No lo uses solo para hacer texto más pequeño: si es decorativo, usa CSS font-size.",
    campos: [
      {
        key: "texto",
        label: "Texto principal",
        tipo: "textarea",
        valor: "Oferta válida hasta el 31 de diciembre.",
      },
      {
        key: "letra",
        label: "Letra pequeña",
        tipo: "text",
        valor: "IVA no incluido. Consulta las bases legales.",
      },
    ],
    construir: (v) =>
      `<p>${esc(v.texto)}<br><small>${esc(v.letra)}</small></p>`,
  },

  "html-mark": {
    icon: "🖍️",
    etiqueta: "<mark>",
    descripcion:
      "Resalta texto relevante en un contexto, como un rotulador. Cambia el color y observa el contraste.",
    nota: "<mark> aporta significado (relevancia), no solo un fondo amarillo.",
    campos: [
      {
        key: "texto",
        label: "Texto",
        tipo: "textarea",
        valor: "La etiqueta <mark> resalta la parte importante de una búsqueda.",
      },
      { key: "resaltar", label: "Parte a resaltar", tipo: "text", valor: "resalta" },
      { key: "fondo", label: "Color del resaltado", tipo: "color", valor: "#fde047" },
    ],
    construir: (v) => {
      const texto = esc(v.texto);
      const parte = esc(v.resaltar);
      const html = parte && texto.includes(parte)
        ? texto.replace(parte, `<mark style="background: ${v.fondo};">${parte}</mark>`)
        : `<mark style="background: ${v.fondo};">${texto}</mark>`;
      return `<p>${html}</p>`;
    },
  },

  "html-time": {
    icon: "⏰",
    etiqueta: "<time>",
    descripcion:
      "Representa una fecha u hora legible para personas y máquinas. El atributo datetime guarda el valor ISO 8601.",
    nota: "El texto visible puede ser «8 de octubre»; datetime es el dato que leen los navegadores y buscadores.",
    campos: [
      { key: "fecha", label: "datetime (ISO 8601)", tipo: "text", valor: "2026-10-08" },
      { key: "visible", label: "Texto visible", tipo: "text", valor: "8 de octubre de 2026" },
    ],
    construir: (v) =>
      `<p>Publicado el <time datetime="${esc(v.fecha)}">${esc(v.visible)}</time>.</p>`,
  },

  "html-cite": {
    icon: "📚",
    etiqueta: "<cite>",
    descripcion:
      "Identifica el título de una obra creativa: un libro, una película, un artículo o una canción.",
    nota: "<cite> es para el título de la obra, no para el autor ni para la cita completa.",
    campos: [
      { key: "obra", label: "Título de la obra", tipo: "text", valor: "Cien años de soledad" },
      { key: "autor", label: "Autor (texto normal)", tipo: "text", valor: "Gabriel García Márquez" },
    ],
    construir: (v) =>
      `<p><cite>${esc(v.obra)}</cite>, de ${esc(v.autor)}.</p>`,
  },

  "html-dfn": {
    icon: "📘",
    etiqueta: "<dfn>",
    descripcion:
      "Marca el término que se está definiendo en el texto. La primera aparición es la que debe llevarlo.",
    nota: "Puedes enlazar el término con el atributo title o con un enlace a la definición.",
    campos: [
      { key: "termino", label: "Término", tipo: "text", valor: "HTML" },
      {
        key: "definicion",
        label: "Definición",
        tipo: "textarea",
        valor: "es el lenguaje de marcado que estructura el contenido de una página web.",
      },
    ],
    construir: (v) =>
      `<p><dfn>${esc(v.termino)}</dfn> ${esc(v.definicion)}</p>`,
  },

  "html-blockquote": {
    icon: "💬",
    etiqueta: "<blockquote>",
    descripcion:
      "Una cita larga, en bloque. Añade la fuente con cite y muéstrala en un footer para que sea accesible.",
    nota: "Para citas cortas dentro de una frase usa <q>; para el título de la obra, <cite>.",
    campos: [
      {
        key: "cita",
        label: "Cita",
        tipo: "textarea",
        valor: "La simplicidad es la máxima sofisticación.",
      },
      { key: "autor", label: "Autor", tipo: "text", valor: "Leonardo da Vinci" },
      {
        key: "fuente",
        label: "URL de la fuente",
        tipo: "text",
        valor: "https://example.com/fuente",
      },
    ],
    construir: (v) =>
      `<blockquote cite="${esc(v.fuente)}">\n  <p>${esc(v.cita)}</p>\n  <footer>— <cite>${esc(v.autor)}</cite></footer>\n</blockquote>`,
  },

  "html-ins": {
    icon: "✍️",
    etiqueta: "<ins>",
    descripcion:
      "Marca texto insertado en una edición posterior. Puedes documentar la fecha y la fuente del cambio.",
    nota: "Su pareja es <del>: juntos muestran un cambio editorial completo.",
    campos: [
      { key: "texto", label: "Texto insertado", tipo: "text", valor: "30 días" },
      { key: "fecha", label: "datetime", tipo: "text", valor: "2026-10-08" },
      { key: "cite", label: "cite (URL)", tipo: "text", valor: "" },
      { key: "color", label: "Color", tipo: "color", valor: "#15803d" },
    ],
    construir: (v) =>
      `<p>El plazo es de <ins${attrs({
        datetime: v.fecha,
        cite: v.cite,
      })} style="color: ${v.color};">${esc(v.texto)}</ins>.</p>`,
  },

  "html-del": {
    icon: "🗑️",
    etiqueta: "<del>",
    descripcion:
      "Marca texto eliminado en una edición posterior. Se muestra tachado por defecto.",
    nota: "No confundas <del> (eliminación editorial) con <s> (información obsoleta).",
    campos: [
      { key: "texto", label: "Texto eliminado", tipo: "text", valor: "15 días" },
      { key: "fecha", label: "datetime", tipo: "text", valor: "2026-10-01" },
      { key: "cite", label: "cite (URL)", tipo: "text", valor: "" },
      { key: "color", label: "Color", tipo: "color", valor: "#b91c1c" },
    ],
    construir: (v) =>
      `<p>El plazo era de <del${attrs({
        datetime: v.fecha,
        cite: v.cite,
      })} style="color: ${v.color};">${esc(v.texto)}</del>.</p>`,
  },

  "html-s": {
    icon: "🚫",
    etiqueta: "<s>",
    descripcion:
      "Indica que un texto ya no es exacto o relevante: un precio antiguo, una versión obsoleta o una tarea completada.",
    nota: "<s> no significa «eliminado»: para cambios editoriales usa <del>.",
    campos: [
      { key: "texto", label: "Texto obsoleto", tipo: "text", valor: "99,95 €" },
      { key: "nuevo", label: "Texto vigente", tipo: "text", valor: "79,95 €" },
    ],
    construir: (v) =>
      `<p>Antes: <s>${esc(v.texto)}</s> · Ahora: <strong>${esc(v.nuevo)}</strong></p>`,
  },

  "html-wbr": {
    icon: "↩️",
    etiqueta: "<wbr>",
    descripcion:
      "Sugiere un punto opcional de salto de línea dentro de una palabra larga. Cambia el ancho para verlo actuar.",
    nota: "<wbr> no fuerza el salto: solo lo permite si el texto no cabe. Para un salto obligatorio usa <br>.",
    campos: [
      {
        key: "palabra",
        label: "Palabra larga",
        tipo: "text",
        valor: "supercalifragilisticoespialidoso",
      },
      { key: "ancho", label: "Ancho del contenedor", tipo: "range", min: 80, max: 420, valor: 160, unidad: "px" },
    ],
    construir: (v) => {
      const palabra = String(v.palabra);
      const mitad = Math.floor(palabra.length / 2);
      const cortada = `${esc(palabra.slice(0, mitad))}<wbr>${esc(palabra.slice(mitad))}`;
      return `<p style="max-width: ${v.ancho}px; border: 1px dashed #94a3b8; padding: 8px; overflow-wrap: normal;">${cortada}</p>`;
    },
  },

  "html-dl": {
    icon: "📖",
    etiqueta: "<dl>",
    descripcion:
      "Una lista de descripciones empareja términos (<dt>) con sus definiciones (<dd>). Ideal para glosarios y FAQ.",
    nota: "Cada <dt> puede tener varios <dd>, y varios <dt> pueden compartir un <dd>.",
    campos: [
      {
        key: "pares",
        label: "Pares término | definición (uno por línea)",
        tipo: "textarea",
        valor: "HTML | Lenguaje de marcado.\nCSS | Lenguaje de hojas de estilo.\nJavaScript | Lenguaje de programación.",
      },
    ],
    construir: (v) => {
      const filas = lineas(v.pares)
        .map((linea) => {
          const [termino, ...resto] = linea.split("|");
          return `  <dt>${esc((termino ?? "").trim())}</dt>\n  <dd>${esc(resto.join("|").trim())}</dd>`;
        })
        .join("\n");
      return `<dl>\n${filas}\n</dl>`;
    },
  },

  "html-dt": {
    icon: "🔤",
    etiqueta: "<dt>",
    descripcion:
      "<dt> es el término de una lista de descripciones. Debe ir dentro de <dl> y antes de su <dd>.",
    nota: "Varios <dt> seguidos pueden compartir una misma definición.",
    campos: [
      { key: "termino", label: "Término", tipo: "text", valor: "HTML" },
      { key: "definicion", label: "Definición", tipo: "text", valor: "Lenguaje de marcado de hipertexto." },
    ],
    construir: (v) =>
      `<dl>\n  <dt>${esc(v.termino)}</dt>\n  <dd>${esc(v.definicion)}</dd>\n</dl>`,
  },

  "html-dd": {
    icon: "📄",
    etiqueta: "<dd>",
    descripcion:
      "<dd> contiene la definición o descripción de un término <dt> dentro de una lista <dl>.",
    nota: "El navegador aplica un margen izquierdo por defecto; puedes ajustarlo con CSS.",
    campos: [
      { key: "termino", label: "Término", tipo: "text", valor: "CSS" },
      { key: "definicion", label: "Definición", tipo: "text", valor: "Lenguaje de hojas de estilo en cascada." },
      { key: "sangria", label: "margin-left", tipo: "range", min: 0, max: 80, valor: 40, unidad: "px" },
    ],
    construir: (v) =>
      `<dl>\n  <dt>${esc(v.termino)}</dt>\n  <dd style="margin-left: ${v.sangria}px;">${esc(v.definicion)}</dd>\n</dl>`,
  },

  "html-menu": {
    icon: "📋",
    etiqueta: "<menu>",
    descripcion:
      "Una lista de comandos o acciones. Visualmente se comporta como una lista, pero su semántica es de menú.",
    nota: "Para navegación usa <nav>; para una lista normal, <ul>.",
    campos: [
      {
        key: "acciones",
        label: "Acciones (una por línea)",
        tipo: "textarea",
        valor: "Guardar\nCompartir\nImprimir",
      },
    ],
    construir: (v) => {
      const items = lineas(v.acciones)
        .map((a) => `  <li><button type="button">${esc(a)}</button></li>`)
        .join("\n");
      return `<menu>\n${items}\n</menu>`;
    },
  },

  "html-label": {
    icon: "🏷️",
    etiqueta: "<label>",
    descripcion:
      "Asocia un texto descriptivo con un control. Al pulsar la etiqueta, el control recibe el foco.",
    nota: "Usa for con el id del control o envuelve el control dentro del label.",
    campos: [
      { key: "texto", label: "Texto de la etiqueta", tipo: "text", valor: "Correo electrónico" },
      { key: "id", label: "id del control", tipo: "text", valor: "correo" },
      { key: "tipo", label: "Tipo de control", tipo: "select", opciones: ["text", "email", "password", "checkbox"], valor: "email" },
    ],
    construir: (v) => {
      const input = `<input type="${v.tipo}" id="${esc(v.id)}" name="${esc(v.id)}">`;
      return `<form>\n  <label for="${esc(v.id)}">${esc(v.texto)}</label>\n  ${input}\n</form>`;
    },
  },

  "html-input": {
    icon: "⌨️",
    etiqueta: "<input>",
    descripcion:
      "El control de entrada más versátil. Cambia el tipo y observa cómo se adapta el navegador.",
    nota: "<input> es un elemento vacío: no tiene cierre. El atributo name es obligatorio para enviar el valor.",
    campos: [
      {
        key: "tipo",
        label: "type",
        tipo: "select",
        opciones: ["text", "email", "password", "number", "date", "color", "range", "checkbox", "radio", "file"],
        valor: "text",
      },
      { key: "id", label: "id / name", tipo: "text", valor: "nombre" },
      { key: "etiqueta", label: "Etiqueta", tipo: "text", valor: "Nombre" },
      { key: "placeholder", label: "placeholder", tipo: "text", valor: "Escribe tu nombre" },
      { key: "valor", label: "value", tipo: "text", valor: "" },
      { key: "obligatorio", label: "required", tipo: "checkbox", valor: false },
    ],
    construir: (v) => {
      const extra = attrs({
        type: v.tipo,
        id: v.id,
        name: v.id,
        placeholder: v.placeholder,
        value: v.valor,
        required: v.obligatorio ? true : undefined,
      });
      return `<form>\n  <label for="${esc(v.id)}">${esc(v.etiqueta)}</label>\n  <input${extra}>\n</form>`;
    },
  },

  "html-button": {
    icon: "🔘",
    etiqueta: "<button>",
    descripcion:
      "Un botón real, accesible con teclado. Cambia su tipo y comprueba que el texto siempre está visible.",
    nota: "Si el botón solo ejecuta JavaScript, usa type=\"button\" para evitar envíos accidentales.",
    campos: [
      { key: "texto", label: "Texto del botón", tipo: "text", valor: "Guardar cambios" },
      { key: "tipo", label: "type", tipo: "select", opciones: ["button", "submit", "reset"], valor: "button" },
      { key: "deshabilitado", label: "disabled", tipo: "checkbox", valor: false },
      { key: "color", label: "Color", tipo: "color", valor: "#2563eb" },
    ],
    construir: (v) =>
      `<button${attrs({
        type: v.tipo,
        disabled: v.deshabilitado ? true : undefined,
      })} style="background: ${v.color}; color: #fff; border: none; padding: 9px 16px; border-radius: 6px;">${esc(v.texto)}</button>`,
  },

  "html-output": {
    icon: "📤",
    etiqueta: "<output>",
    descripcion:
      "Muestra el resultado de un cálculo o una acción del usuario. El atributo for indica qué controles lo alimentan.",
    nota: "<output> no calcula nada por sí solo: el valor lo actualiza JavaScript.",
    campos: [
      { key: "nombre", label: "name", tipo: "text", valor: "total" },
      { key: "para", label: "for (ids separados por espacio)", tipo: "text", valor: "precio cantidad" },
      { key: "resultado", label: "Resultado mostrado", tipo: "text", valor: "24,00 €" },
    ],
    construir: (v) =>
      `<form>\n  <label for="precio">Precio</label>\n  <input type="number" id="precio" value="12">\n  <label for="cantidad">Cantidad</label>\n  <input type="number" id="cantidad" value="2">\n  <p>Total: <output${attrs({
        name: v.nombre,
        for: v.para,
      })}>${esc(v.resultado)}</output></p>\n</form>`,
  },

  "html-optgroup": {
    icon: "🗂️",
    etiqueta: "<optgroup>",
    descripcion:
      "Agrupa opciones dentro de un <select> bajo un título. Mejora la lectura de listas largas.",
    nota: "No es seleccionable: solo agrupa. No se pueden anidar optgroups.",
    campos: [
      { key: "grupo", label: "label del grupo", tipo: "text", valor: "Frutas" },
      { key: "opciones", label: "Opciones (una por línea)", tipo: "textarea", valor: "Manzana\nPera\nPlátano" },
      { key: "deshabilitado", label: "disabled", tipo: "checkbox", valor: false },
    ],
    construir: (v) => {
      const opciones = lineas(v.opciones)
        .map((o) => `    <option>${esc(o)}</option>`)
        .join("\n");
      return `<form>\n  <label for="comida">Elige</label>\n  <select id="comida">\n    <optgroup${attrs({
        label: v.grupo,
        disabled: v.deshabilitado ? true : undefined,
      })}>\n${opciones}\n    </optgroup>\n  </select>\n</form>`;
    },
  },

  "html-datalist": {
    icon: "📃",
    etiqueta: "<datalist>",
    descripcion:
      "Ofrece sugerencias mientras el usuario escribe, pero le permite escribir un valor libre.",
    nota: "El input se asocia con list=\"id-del-datalist\". Es distinto de <select>, que obliga a elegir.",
    campos: [
      { key: "id", label: "id del datalist", tipo: "text", valor: "lenguajes" },
      { key: "sugerencias", label: "Sugerencias (una por línea)", tipo: "textarea", valor: "HTML\nCSS\nJavaScript\nPython" },
      { key: "etiqueta", label: "Etiqueta", tipo: "text", valor: "Lenguaje favorito" },
    ],
    construir: (v) => {
      const opciones = lineas(v.sugerencias)
        .map((o) => `    <option value="${esc(o)}">`)
        .join("\n");
      return `<form>\n  <label for="lenguaje">${esc(v.etiqueta)}</label>\n  <input list="${esc(v.id)}" id="lenguaje" name="lenguaje">\n  <datalist id="${esc(v.id)}">\n${opciones}\n  </datalist>\n</form>`;
    },
  },

  "html-fieldset": {
    icon: "🧩",
    etiqueta: "<fieldset>",
    descripcion:
      "Agrupa controles relacionados dentro de un formulario. Añade un <legend> para titular el grupo.",
    nota: "Puedes deshabilitar todo el grupo con el atributo disabled.",
    campos: [
      { key: "titulo", label: "legend", tipo: "text", valor: "Datos de contacto" },
      { key: "deshabilitado", label: "disabled", tipo: "checkbox", valor: false },
    ],
    construir: (v) =>
      `<form>\n  <fieldset${attrs({
        disabled: v.deshabilitado ? true : undefined,
      })}>\n    <legend>${esc(v.titulo)}</legend>\n    <label for="nombre">Nombre</label>\n    <input id="nombre" name="nombre">\n    <label for="email">Email</label>\n    <input type="email" id="email" name="email">\n  </fieldset>\n</form>`,
  },

  "html-legend": {
    icon: "🏷️",
    etiqueta: "<legend>",
    descripcion:
      "Es el título de un <fieldset>. Debe ser su primer hijo y solo puede haber un legend por grupo.",
    nota: "Los lectores de pantalla anuncian el legend al entrar en cada control del grupo.",
    campos: [
      { key: "titulo", label: "Texto del legend", tipo: "text", valor: "Método de pago" },
      { key: "opcion", label: "Primera opción", tipo: "text", valor: "Tarjeta" },
      { key: "opcion2", label: "Segunda opción", tipo: "text", valor: "Transferencia" },
    ],
    construir: (v) =>
      `<form>\n  <fieldset>\n    <legend>${esc(v.titulo)}</legend>\n    <label><input type="radio" name="pago"> ${esc(v.opcion)}</label>\n    <label><input type="radio" name="pago"> ${esc(v.opcion2)}</label>\n  </fieldset>\n</form>`,
  },

  "html-picture": {
    icon: "🖼️",
    etiqueta: "<picture>",
    descripcion:
      "Permite al navegador elegir la imagen más adecuada según el ancho o el formato soportado. El <img> final es obligatorio.",
    nota: "Ordena los <source> del formato más moderno al más antiguo y deja el <img> como fallback.",
    campos: [
      {
        key: "color",
        label: "Color de la imagen",
        tipo: "color",
        valor: "#0ea5e9",
      },
      { key: "alt", label: "Texto alternativo", tipo: "text", valor: "Paisaje de ejemplo" },
      { key: "ancho", label: "Ancho máximo", tipo: "range", min: 120, max: 460, valor: 320, unidad: "px" },
    ],
    construir: (v) => {
      const grande = demoImagen(v.color, "Imagen grande");
      const pequena = demoImagen("#f97316", "Imagen pequeña");
      return `<picture>\n  <source media="(max-width: 600px)" srcset="${pequena}">\n  <img src="${grande}" alt="${esc(v.alt)}" style="max-width: ${v.ancho}px; height: auto; border-radius: 8px;">\n</picture>`;
    },
  },

  "html-svg": {
    icon: "🎨",
    etiqueta: "<svg>",
    descripcion:
      "Dibuja gráficos vectoriales con código. Cambia la forma, el color y el tamaño para ver cómo escala sin perder calidad.",
    nota: "Incluye viewBox para que el SVG sea escalable y role=\"img\" con <title> para accesibilidad.",
    campos: [
      { key: "forma", label: "Forma", tipo: "select", opciones: ["circle", "rect", "path"], valor: "circle" },
      { key: "color", label: "Color", tipo: "color", valor: "#6366f1" },
      { key: "tamano", label: "Tamaño", tipo: "range", min: 40, max: 220, valor: 120, unidad: "px" },
    ],
    construir: (v) => {
      const figura =
        v.forma === "rect"
          ? '<rect x="20" y="20" width="80" height="80" rx="12"'
          : v.forma === "path"
            ? '<path d="M20 80 L60 20 L100 80 Z"'
            : '<circle cx="60" cy="60" r="40"';
      return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="${v.tamano}" height="${v.tamano}" role="img" aria-label="Figura de ejemplo">\n  <title>Figura de ejemplo</title>\n  ${figura} fill="${v.color}"/>\n</svg>`;
    },
  },

  "html-map": {
    icon: "🗺️",
    etiqueta: "<map>",
    descripcion:
      "Define zonas clicables sobre una imagen. Cada zona es un <area> con su forma, coordenadas y enlace.",
    nota: "El <img> necesita usemap=\"#nombre\" y el <map> el mismo name. Las coordenadas son relativas a la imagen original.",
    campos: [
      { key: "nombre", label: "name del mapa", tipo: "text", valor: "plano" },
      { key: "alt", label: "Texto alternativo de la imagen", tipo: "text", valor: "Plano de la casa" },
    ],
    construir: (v) =>
      `<img src="${demoMapa}" alt="${esc(v.alt)}" usemap="#${esc(v.nombre)}" width="320">\n\n<map name="${esc(v.nombre)}">\n  <area shape="rect" coords="10,10,140,80" href="#sala" alt="Sala">\n  <area shape="rect" coords="150,10,310,80" href="#cocina" alt="Cocina">\n  <area shape="rect" coords="10,95,310,165" href="#patio" alt="Patio">\n</map>`,
  },

  "html-area": {
    icon: "🎯",
    etiqueta: "<area>",
    descripcion:
      "Cada <area> define una zona de un mapa de imagen. Cambia la forma y las coordenadas para moverla.",
    nota: "shape puede ser rect, circle o poly. Sin alt, la zona no es accesible.",
    campos: [
      { key: "forma", label: "shape", tipo: "select", opciones: ["rect", "circle", "poly"], valor: "rect" },
      { key: "coords", label: "coords", tipo: "text", valor: "10,10,140,80" },
      { key: "href", label: "href", tipo: "text", valor: "#sala" },
      { key: "alt", label: "alt", tipo: "text", valor: "Sala" },
    ],
    construir: (v) =>
      `<img src="${demoMapa}" alt="Plano de la casa" usemap="#plano" width="320">\n\n<map name="plano">\n  <area shape="${esc(v.forma)}" coords="${esc(v.coords)}" href="${esc(v.href)}" alt="${esc(v.alt)}">\n</map>`,
  },

  "html-embed": {
    icon: "🧩",
    etiqueta: "<embed>",
    descripcion:
      "Incrusta contenido externo (PDF, SVG, media) sin fallback interno. Cambia el tipo y el tamaño.",
    nota: "<embed> es un elemento vacío y no admite contenido alternativo: para eso usa <object>.",
    campos: [
      { key: "tipo", label: "type", tipo: "select", opciones: ["image/svg+xml", "application/pdf", "text/html"], valor: "image/svg+xml" },
      { key: "ancho", label: "width", tipo: "range", min: 160, max: 420, valor: 320, unidad: "px" },
      { key: "alto", label: "height", tipo: "range", min: 100, max: 300, valor: 180, unidad: "px" },
    ],
    construir: (v) =>
      `<embed src="${demoImagen("#7c3aed", "Contenido incrustado")}" type="${esc(v.tipo)}" width="${v.ancho}" height="${v.alto}">`,
  },

  "html-object": {
    icon: "📦",
    etiqueta: "<object>",
    descripcion:
      "Incrusta recursos externos y ofrece contenido alternativo dentro de la etiqueta. Cambia el tamaño y prueba el fallback.",
    nota: "A diferencia de <embed>, <object> permite fallback y varios <param>.",
    campos: [
      { key: "texto", label: "Texto del fallback", tipo: "text", valor: "Tu navegador no puede mostrar el recurso." },
      { key: "ancho", label: "width", tipo: "range", min: 160, max: 420, valor: 320, unidad: "px" },
      { key: "alto", label: "height", tipo: "range", min: 100, max: 300, valor: 180, unidad: "px" },
    ],
    construir: (v) =>
      `<object data="${demoImagen("#0891b2", "Recurso incrustado")}" type="image/svg+xml" width="${v.ancho}" height="${v.alto}">\n  <p>${esc(v.texto)}</p>\n</object>`,
  },

  "html-track": {
    icon: "🎬",
    etiqueta: "<track>",
    descripcion:
      "Añade subtítulos, capítulos o descripciones a un <audio> o <video>. Cambia el idioma y el tipo de pista.",
    nota: "El archivo debe estar en formato WebVTT (.vtt) y servirse con el tipo text/vtt.",
    vista: "track",
    campos: [
      { key: "kind", label: "kind", tipo: "select", opciones: ["subtitles", "captions", "descriptions", "chapters", "metadata"], valor: "subtitles" },
      { key: "idioma", label: "srclang", tipo: "select", opciones: ["es", "en", "fr", "pt"], valor: "es" },
      { key: "label", label: "label", tipo: "text", valor: "Español" },
      { key: "src", label: "src (.vtt)", tipo: "text", valor: "sub-es.vtt" },
    ],
    construir: (v) =>
      `<video controls width="320">\n  <source src="video.mp4" type="video/mp4">\n  <track kind="${esc(v.kind)}" src="${esc(v.src)}" srclang="${esc(v.idioma)}" label="${esc(v.label)}" default>\n  Tu navegador no soporta video.\n</video>`,
  },

  "html-title": {
    icon: "🏷️",
    etiqueta: "<title>",
    descripcion:
      "Define el título que aparece en la pestaña del navegador y en los resultados de búsqueda.",
    nota: "El <title> va dentro de <head> y no se muestra en el cuerpo de la página.",
    vista: "head",
    campos: [
      { key: "title", label: "Título", tipo: "text", valor: "Mi sitio · Inicio" },
      { key: "charset", label: "charset", tipo: "select", opciones: ["UTF-8", "ISO-8859-1"], valor: "UTF-8" },
      { key: "viewport", label: "viewport responsive", tipo: "checkbox", valor: true },
      { key: "descripcion", label: "meta description", tipo: "textarea", valor: "Aprende HTML, CSS y JavaScript con apuntes y simuladores." },
    ],
    construir: (v) =>
      `<head>\n  <meta charset="${esc(v.charset)}">\n${v.viewport ? '  <meta name="viewport" content="width=device-width, initial-scale=1">\n' : ""}  <title>${esc(v.title)}</title>\n  <meta name="description" content="${esc(v.descripcion)}">\n</head>`,
  },

  "html-frameset": {
    icon: "🪟",
    etiqueta: "<frameset>",
    descripcion:
      "Elemento obsoleto que dividía la ventana en marcos. Se muestra solo como apunte histórico.",
    nota: "NO USAR en proyectos nuevos: HTML5 lo eliminó. Usa CSS Grid, Flexbox o <iframe>.",
    vista: "frameset",
    campos: [
      { key: "columnas", label: "cols", tipo: "text", valor: "25%,75%" },
      { key: "menu", label: "Documento del menú", tipo: "text", valor: "menu.html" },
      { key: "contenido", label: "Documento de contenido", tipo: "text", valor: "contenido.html" },
    ],
    construir: (v) =>
      `<!-- OBSOLETO: NO USAR -->\n<frameset cols="${esc(v.columnas)}">\n  <frame src="${esc(v.menu)}" name="menu">\n  <frame src="${esc(v.contenido)}" name="contenido">\n  <noframes>\n    <body><p>Tu navegador no soporta frames.</p></body>\n  </noframes>\n</frameset>`,
  },

  "html-address": {
    icon: "📍",
    etiqueta: "<address>",
    descripcion:
      "Datos de contacto del autor o responsable del documento: nombre, dirección, email o teléfono.",
    nota: "No es un contenedor genérico para cualquier dirección: solo la información de contacto del documento.",
    campos: [
      { key: "nombre", label: "Nombre", tipo: "text", valor: "Ana Pérez" },
      { key: "calle", label: "Calle", tipo: "text", valor: "Calle Mayor 123" },
      { key: "ciudad", label: "Ciudad", tipo: "text", valor: "28013 Madrid" },
      { key: "email", label: "Email", tipo: "text", valor: "ana@example.com" },
      { key: "telefono", label: "Teléfono", tipo: "text", valor: "+34 600 000 000" },
    ],
    construir: (v) =>
      `<address>\n  <strong>${esc(v.nombre)}</strong><br>\n  ${esc(v.calle)}<br>\n  ${esc(v.ciudad)}<br>\n  <a href="mailto:${esc(v.email)}">${esc(v.email)}</a><br>\n  <a href="tel:${esc(v.telefono.replace(/\s+/g, ""))}">${esc(v.telefono)}</a>\n</address>`,
  },

  "html-table": {
    icon: "📊",
    etiqueta: "<table>",
    descripcion:
      "Presenta datos en filas y columnas. Añade caption y encabezados con scope para que sea accesible.",
    nota: "No uses tablas para maquetar: para layout usa CSS Grid o Flexbox.",
    campos: [
      { key: "caption", label: "caption", tipo: "text", valor: "Equipo" },
      { key: "col1", label: "Encabezado 1", tipo: "text", valor: "Nombre" },
      { key: "col2", label: "Encabezado 2", tipo: "text", valor: "Edad" },
      { key: "filas", label: "Filas: celda1 | celda2", tipo: "textarea", valor: "Ana | 28\nLuis | 34\nMarta | 41" },
      { key: "borde", label: "Borde de celdas", tipo: "checkbox", valor: true },
    ],
    construir: (v) => {
      const filas = lineas(v.filas)
        .map((linea) => {
          const [a, ...resto] = linea.split("|");
          return `    <tr>\n      <td>${esc((a ?? "").trim())}</td>\n      <td>${esc(resto.join("|").trim())}</td>\n    </tr>`;
        })
        .join("\n");
      const estilo = v.borde
        ? ' style="border-collapse: collapse;" border="1" cellpadding="6"'
        : "";
      return `<table${estilo}>\n  <caption>${esc(v.caption)}</caption>\n  <thead>\n    <tr>\n      <th scope="col">${esc(v.col1)}</th>\n      <th scope="col">${esc(v.col2)}</th>\n    </tr>\n  </thead>\n  <tbody>\n${filas}\n  </tbody>\n</table>`;
    },
  },
};

export { HTML_CONFIGS_EXTRA, demoImagen, demoMapa };
