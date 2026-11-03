/**
 * Genera los apuntes de CSS a partir de los HTML exportados de Notion
 * que viven en `Apuntes/CSS`.
 *
 * Uso:  node scripts/generate-css.mjs
 *
 * El script NO toca los HTML: solo lee, extrae las secciones y escribe
 * los módulos de datos que consume la app.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseNote, buildQuiz } from "./generate-apuntes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const HTML_DIR = path.join(ROOT, "Apuntes", "CSS");
const DATA_DIR = path.join(ROOT, "src", "data");

/* ------------------------------------------------------------------ */
/* 1. Estructura: categorías, grupos y notas                           */
/* ------------------------------------------------------------------ */

const CATEGORIAS = [
  {
    id: "box-model",
    label: "Box Model",
    export: "CSS_BOX_MODEL",
    archivo: "cssBoxModel",
    icon: "📦",
    titulo: "Box Model: espaciado, bordes y tamaño",
    descripcion:
      "Entiende cómo se calcula la caja de cada elemento: contenido, padding, borde, margen y box-sizing.",
    simulador: "box-model",
    grupos: [
      {
        seccion: "Espaciado",
        notas: [
          ["Espaciado/margin", "margin: top right bottom left", "↔️"],
          ["Espaciado/padding", "padding: top right bottom left", "🧱"],
        ],
      },
      {
        seccion: "Tamaño y modelo de caja",
        notas: [
          ["Tamaño/width", "width: valor", "📏"],
          ["Tamaño/height", "height: valor", "📐"],
          [
            "Modelo de caja/box-sizing",
            "box-sizing: content-box | border-box",
            "📦",
          ],
        ],
      },
      {
        seccion: "Bordes",
        notas: [
          ["Borde/border", "border: ancho estilo color", "🖼️"],
          ["Borde/border-top", "border-top: ancho estilo color", "⬆️"],
          ["Borde/border-right", "border-right: ancho estilo color", "➡️"],
          ["Borde/border-bottom", "border-bottom: ancho estilo color", "⬇️"],
          ["Borde/border-left", "border-left: ancho estilo color", "⬅️"],
          ["Borde/border-width", "border-width: valor", "📏"],
          ["Borde/border-style", "border-style: solid | dashed | ...", "✏️"],
          ["Borde/border-color", "border-color: color", "🎨"],
          ["Borde/border-radius", "border-radius: valor", "⭕"],
          [
            "Borde/border-image",
            "border-image: source slice / width / outset repeat",
            "🖼️",
          ],
        ],
      },
    ],
  },
  {
    id: "colores-fondos",
    label: "Colores y fondos",
    export: "CSS_COLORES_FONDOS",
    archivo: "cssColoresFondos",
    icon: "🎨",
    titulo: "Colores y fondos",
    descripcion:
      "Domina el color del texto y todas las capas del fondo: color, imagen, posición, tamaño, recorte y mezcla.",
    simulador: "colores",
    grupos: [
      {
        seccion: "Color y fondo base",
        notas: [
          ["Colores y Fondos/color", "color: valor", "🖍️"],
          ["Colores y Fondos/background", "background: color imagen posición / tamaño repeat", "🎨"],
          ["Colores y Fondos/background-color", "background-color: color", "🪣"],
        ],
      },
      {
        seccion: "Imágenes de fondo",
        notas: [
          ["Colores y Fondos/background-image", "background-image: url(...) | gradient(...)", "🖼️"],
          ["Colores y Fondos/background-repeat", "background-repeat: repeat | no-repeat | ...", "🔁"],
          ["Colores y Fondos/background-position", "background-position: x y", "📍"],
          ["Colores y Fondos/background-size", "background-size: ancho alto | cover | contain", "📐"],
          ["Colores y Fondos/background-attachment", "background-attachment: scroll | fixed | local", "📌"],
        ],
      },
      {
        seccion: "Recorte, origen y mezcla",
        notas: [
          ["Colores y Fondos/background-clip", "background-clip: border-box | padding-box | content-box | text", "✂️"],
          ["Colores y Fondos/background-origin", "background-origin: border-box | padding-box | content-box", "🎯"],
          ["Colores y Fondos/background-blend-mode", "background-blend-mode: multiply | screen | ...", "🔀"],
        ],
      },
    ],
  },
  {
    id: "texto-tipografia",
    label: "Texto y tipografía",
    export: "CSS_TEXTO_TIPOGRAFIA",
    archivo: "cssTextoTipografia",
    icon: "🔤",
    titulo: "Texto y tipografía",
    descripcion:
      "Controla las fuentes, el tamaño, la altura de línea y la alineación para que el texto se lea bien.",
    simulador: "tipografia",
    grupos: [
      {
        seccion: "Tipografía",
        notas: [
          ["Texto y tipografía/font-family", 'font-family: "Fuente", fallback', "🔤"],
          ["Texto y tipografía/font-size", "font-size: valor", "🔠"],
          ["Texto y tipografía/line-height", "line-height: valor", "📏"],
        ],
      },
      {
        seccion: "Alineación",
        notas: [
          ["Texto y tipografía/text-align", "text-align: left | center | right | justify", "↔️"],
        ],
      },
    ],
  },
  {
    id: "flexbox",
    label: "Flexbox",
    export: "CSS_FLEXBOX",
    archivo: "cssFlexbox",
    icon: "🧱",
    titulo: "Flexbox",
    descripcion:
      "Distribuye, alinea y ajusta elementos en una dimensión con el modelo flex: dirección, ejes, wrap y gap.",
    simulador: "flexbox",
    grupos: [
      {
        seccion: "Dirección y flujo",
        notas: [
          ["Flexbox/flex-direction", "flex-direction: row | row-reverse | column | column-reverse", "➡️"],
          ["Flexbox/flex-wrap", "flex-wrap: nowrap | wrap | wrap-reverse", "🔁"],
        ],
      },
      {
        seccion: "Alineación",
        notas: [
          ["Flexbox/justify-content", "justify-content: flex-start | center | space-between | ...", "↔️"],
          ["Flexbox/align-items", "align-items: stretch | flex-start | center | flex-end | baseline", "↕️"],
          ["Flexbox/align-self", "align-self: auto | flex-start | center | flex-end", "🎯"],
          ["Flexbox/align-content", "align-content: flex-start | center | space-between | ...", "🧱"],
        ],
      },
      {
        seccion: "Espaciado",
        notas: [
          ["Flexbox/gap", "gap: fila columna", "📐"],
        ],
      },
    ],
  },
  {
    id: "composicion-visual",
    label: "Composición visual",
    export: "CSS_COMPOSICION_VISUAL",
    archivo: "cssComposicionVisual",
    icon: "🎭",
    titulo: "Composición visual",
    descripcion:
      "Coloca, superpone y decora cajas: display, position, sombras y ajuste de imágenes.",
    simulador: "composicion",
    grupos: [
      {
        seccion: "Flujo y posición",
        notas: [
          ["Composición Visual/display", "display: block | inline | flex | grid | none", "🧩"],
          ["Composición Visual/position", "position: static | relative | absolute | fixed | sticky", "📍"],
        ],
      },
      {
        seccion: "Efectos e imágenes",
        notas: [
          ["Composición Visual/box-shadow", "box-shadow: x y blur spread color", "🌑"],
          ["Composición Visual/object-fit", "object-fit: fill | contain | cover | none | scale-down", "🖼️"],
        ],
      },
    ],
  },
  {
    id: "tablas",
    label: "Propiedades de tablas",
    export: "CSS_TABLAS",
    archivo: "cssTablas",
    icon: "▦",
    titulo: "Propiedades de tablas",
    descripcion:
      "Une o separa los bordes de una tabla y controla la distancia entre celdas.",
    simulador: "tablas",
    grupos: [
      {
        seccion: "Bordes y separación",
        notas: [
          ["Propiedades de tablas/border-collapse", "border-collapse: collapse | separate", "▦"],
          ["Propiedades de tablas/border-spacing", "border-spacing: horizontal vertical", "↔️"],
        ],
      },
    ],
  },
  {
    id: "pseudoclases",
    label: "Pseudoclases",
    export: "CSS_PSEUDOCLASES",
    archivo: "cssPseudoclases",
    icon: "⚡",
    titulo: "Pseudoclases de interacción y estructurales",
    descripcion:
      "Aplica estilos según el estado del usuario o la posición del elemento dentro de su contenedor.",
    simulador: "pseudoclases",
    grupos: [
      {
        seccion: "Interacción",
        notas: [
          ["Pseudoclases de interacción y estructurales/Pseudoclases de interacción y estructurales/hover", "selector:hover { ... }", "🖱️"],
          ["Pseudoclases de interacción y estructurales/Pseudoclases de interacción y estructurales/focus", "selector:focus { ... }", "⌨️"],
        ],
      },
      {
        seccion: "Estructurales",
        notas: [
          ["Pseudoclases de interacción y estructurales/Pseudoclases de interacción y estructurales/first-child", "selector:first-child { ... }", "🥇"],
          ["Pseudoclases de interacción y estructurales/Pseudoclases de interacción y estructurales/last-child", "selector:last-child { ... }", "🏁"],
          ["Pseudoclases de interacción y estructurales/Pseudoclases de interacción y estructurales/nth-child(n)", "selector:nth-child(an+b) { ... }", "🔢"],
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 2. Localizar los HTML y construir los apuntes                       */
/* ------------------------------------------------------------------ */

function listarHtml(dir) {
  const salida = [];
  for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
    const ruta = path.join(dir, entrada.name);
    if (entrada.isDirectory()) salida.push(...listarHtml(ruta));
    else if (entrada.name.endsWith(".html")) salida.push(ruta);
  }
  return salida;
}

const HTMLS = listarHtml(HTML_DIR);

function buscarHtml(prefijo) {
  const base = path.basename(prefijo);
  const candidatos = HTMLS.filter((ruta) => {
    const rel = path.relative(HTML_DIR, ruta).split(path.sep).join("/");
    return (
      path.basename(rel).startsWith(`${base} `) &&
      (rel.startsWith(`${prefijo} `) || rel.includes(`/${prefijo} `))
    );
  });
  if (!candidatos.length) {
    throw new Error(`No se encontró el HTML que empieza con "${prefijo}"`);
  }
  return candidatos[0];
}

const collapse = (value = "") =>
  value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();

const slug = (value = "") =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const limpiaTitulo = (value = "") =>
  collapse(value.replace(/[`*]/g, "").replace(/^📄\s*/, ""));

function buildDoc(categoria, nota) {
  const [prefijo, firma, icono] = nota;
  const html = fs.readFileSync(buscarHtml(prefijo), "utf8");
  const parsed = parseNote(html);
  const base = path.basename(prefijo);
  const id = `css-${slug(base)}`;
  const titulo = limpiaTitulo(parsed.rawTitle) || base;

  return {
    id,
    titulo,
    icon: parsed.icon && parsed.icon !== "📄" ? parsed.icon : icono,
    categoria: categoria.label,
    categoriaId: categoria.id,
    firma,
    simulador: categoria.simulador,

    definicion: parsed.definicion.length
      ? parsed.definicion
      : parsed.introText,
    queEs: parsed.queEs,
    paraQueSirve: parsed.paraQueSirve,
    comoFunciona: parsed.comoFunciona,
    sintaxis: parsed.sintaxis.length ? parsed.sintaxis : [{ code: firma }],
    nota: parsed.nota || undefined,
    ejemplos: parsed.ejemplos.map((ejemplo) => ({
      ...ejemplo,
      titulo: limpiaTitulo(ejemplo.titulo) || "Ejemplo",
    })),
    errores: parsed.errores,
    casos: parsed.casos,
    relacion: parsed.relacion,
    analogia: parsed.analogia,
    fuente: parsed.fuente,
    notasPersonales: parsed.notasPersonales.length
      ? parsed.notasPersonales
      : undefined,
  };
}

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    const simple = value.every(
      (item) =>
        typeof item === "string" && !item.includes("\n") && item.length < 90,
    );
    if (simple) {
      return `[\n${value
        .map((item) => `${pad}  ${JSON.stringify(item)},`)
        .join("\n")}\n${pad}]`;
    }
    return `[\n${value
      .map((item) => `${pad}  ${serialize(item, indent + 1)},`)
      .join("\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    if (!entries.length) return "{}";
    return `{\n${entries
      .map(
        ([key, v]) =>
          `${pad}  ${JSON.stringify(key)}: ${serialize(v, indent + 1)},`,
      )
      .join("\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

function buildCategoria(categoria) {
  const docs = [];
  for (const grupo of categoria.grupos) {
    for (const nota of grupo.notas) docs.push(buildDoc(categoria, nota));
  }

  for (const doc of docs) doc.quiz = buildQuiz(doc, docs);

  const docsById = Object.fromEntries(docs.map((doc) => [doc.id, doc]));
  const meta = {
    id: categoria.id,
    label: categoria.label,
    icon: categoria.icon,
    titulo: categoria.titulo,
    descripcion: categoria.descripcion,
    simulador: categoria.simulador,
    grupos: categoria.grupos.map((grupo) => ({
      seccion: grupo.seccion,
      metodos: grupo.notas.map(([prefijo, firma, icono]) => {
        const base = path.basename(prefijo);
        const id = `css-${slug(base)}`;
        const doc = docsById[id];
        return {
          id,
          nombre: doc.titulo,
          firma,
          icon: doc.icon || icono,
        };
      }),
    })),
  };

  const content = `/* Generado desde Apuntes/CSS — no editar a mano.
   Regenerar con: node scripts/generate-css.mjs */

export const ${categoria.export} = ${serialize(meta)};

export const ${categoria.export}_DOCS = ${serialize(docsById)};
`;

  fs.writeFileSync(
    path.join(DATA_DIR, `${categoria.archivo}.js`),
    content,
    "utf8",
  );
  return { meta, docs: docs.length };
}

const resumen = CATEGORIAS.map(buildCategoria);
console.log(
  `✅ CSS: ${resumen.reduce((acc, r) => acc + r.docs, 0)} apuntes en ` +
    `${resumen.length} categorías`,
);
for (const r of resumen) {
  console.log(`   ${r.meta.icon} ${r.meta.label}: ${r.docs} apuntes`);
}
