/**
 * Genera apuntes de HTML desde HTML y/o TXT exportados de Notion en `Apuntes/`.
 *
 * Uso: node scripts/generate-html-elementos.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseNote, buildQuiz } from "./generate-apuntes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const HTML_DIR = path.join(ROOT, "Apuntes");
const DATA_DIR = path.join(ROOT, "src", "data");

/* ------------------------------------------------------------------ */
/* 1. Categorías — 44 elementos                                        */
/* ------------------------------------------------------------------ */

const CATEGORIAS = [
  {
    id: "html-estructura",
    label: "Estructura del documento",
    export: "HTML_ESTRUCTURA",
    archivo: "htmlEstructura",
    icon: "🏗️",
    titulo: "Estructura del documento HTML",
    descripcion:
      "Declaración, raíz, metadatos y contenido global que definen la estructura de toda página HTML.",
    simulador: "html",
    grupos: [
      {
        seccion: "Declaración y raíz",
        notas: [
          ["!DOCTYPE html", "<!DOCTYPE html>", "📜"],
          ["html", '<html lang="es">...</html>', "🌐"],
        ],
      },
      {
        seccion: "Metadatos y cuerpo",
        notas: [
          ["head", "<head>...</head>", "🧠"],
          ["body", "<body>...</body>", "🧍"],
        ],
      },
      { seccion: "Estilos", notas: [["style", "<style>...</style>", "🎨"]] },
    ],
  },
  {
    id: "html-semantica",
    label: "Semántica estructural",
    export: "HTML_SEMANTICA",
    archivo: "htmlSemantica",
    icon: "🧱",
    titulo: "Secciones semánticas de HTML5",
    descripcion:
      "Elementos que describen la función de cada zona del documento: cabecera, pie, contenido principal, navegación, artículos y contenedores.",
    simulador: "html",
    grupos: [
      {
        seccion: "Cabeceras y pies",
        notas: [
          ["header", "<header>...</header>", "🔝"],
          ["footer", "<footer>...</footer>", "🔚"],
        ],
      },
      {
        seccion: "Contenido principal",
        notas: [
          ["main", "<main>...</main>", "📄"],
          ["section", "<section>...</section>", "📑"],
          ["article", "<article>...</article>", "📰"],
        ],
      },
      {
        seccion: "Navegación y complementos",
        notas: [
          ["nav", "<nav>...</nav>", "🧭"],
          ["aside", "<aside>...</aside>", "📎"],
        ],
      },
      {
        seccion: "Contenedor genérico",
        notas: [["div", "<div>...</div>", "📦"]],
      },
    ],
  },
  {
    id: "html-encabezados",
    label: "Encabezados",
    export: "HTML_ENCABEZADOS",
    archivo: "htmlEncabezados",
    icon: "🔠",
    titulo: "Encabezados de HTML",
    descripcion:
      "Los seis niveles de encabezados (h1–h6) para jerarquizar el contenido del documento.",
    simulador: "html",
    grupos: [
      {
        seccion: "Jerarquía de encabezados",
        notas: [
          ["h1", "<h1>Título principal</h1>", "1️⃣"],
          ["h2", "<h2>Sección</h2>", "2️⃣"],
          ["h3", "<h3>Subsección</h3>", "3️⃣"],
          ["h4", "<h4>Apartado</h4>", "4️⃣"],
          ["h5", "<h5>Subapartado</h5>", "5️⃣"],
          ["h6", "<h6>Detalle</h6>", "6️⃣"],
        ],
      },
    ],
  },
  {
    id: "html-texto",
    label: "Texto y agrupación",
    export: "HTML_TEXTO",
    archivo: "htmlTexto",
    icon: "📝",
    titulo: "Texto y agrupación",
    descripcion:
      "Elementos de bloque para organizar párrafos, saltos de línea, separadores temáticos y texto preformateado.",
    simulador: "html",
    grupos: [
      {
        seccion: "Bloques de texto",
        notas: [
          ["p", "<p>Párrafo de texto</p>", "📄"],
          ["br", "<br>", "↩️"],
          ["hr", "<hr>", "➖"],
          ["pre", "<pre>...</pre>", "📋"],
        ],
      },
    ],
  },
  {
    id: "html-enfasis",
    label: "Énfasis y código",
    export: "HTML_ENFASIS",
    archivo: "htmlEnfasis",
    icon: "✍️",
    titulo: "Énfasis y código",
    descripcion:
      "Elementos inline para marcar importancia, énfasis, estilo visual o fragmentos de código.",
    simulador: "html",
    grupos: [
      {
        seccion: "Énfasis semántico",
        notas: [
          ["strong", "<strong>Texto importante</strong>", "💪"],
          ["em", "<em>Texto enfatizado</em>", "🔊"],
        ],
      },
      {
        seccion: "Estilo visual",
        notas: [
          ["b", "<b>Texto en negrita</b>", "🅱️"],
          ["i", "<i>Texto en cursiva</i>", "🔤"],
          ["u", "<u>Texto subrayado</u>", "🖊️"],
        ],
      },
      { seccion: "Código", notas: [["code", "<code>fragmento</code>", "💻"]] },
    ],
  },
  {
    id: "html-listas",
    label: "Listas",
    export: "HTML_LISTAS",
    archivo: "htmlListas",
    icon: "📋",
    titulo: "Listas en HTML",
    descripcion: "Listas ordenadas, desordenadas y sus elementos: ul, ol y li.",
    simulador: "html",
    grupos: [
      {
        seccion: "Listas",
        notas: [
          ["ul", "<ul>...</ul>", "•"],
          ["ol", "<ol>...</ol>", "1️⃣"],
          ["li", "<li>Elemento</li>", "▪️"],
        ],
      },
    ],
  },
  {
    id: "html-enlaces",
    label: "Enlaces",
    export: "HTML_ENLACES",
    archivo: "htmlEnlaces",
    icon: "🔗",
    titulo: "Enlaces e hipervínculos",
    descripcion:
      "El elemento <a> y sus atributos para crear hipervínculos: navegación, anclas, descargas, mailto y tel.",
    simulador: "html",
    grupos: [
      {
        seccion: "Hipervínculos",
        notas: [["a", '<a href="">Texto del enlace</a>', "🔗"]],
      },
    ],
  },
  {
    id: "html-formularios",
    label: "Formularios",
    export: "HTML_FORMULARIOS",
    archivo: "htmlFormularios",
    icon: "📝",
    titulo: "Formularios",
    descripcion:
      "Controles interactivos para recoger datos del usuario: form, select, option y textarea.",
    simulador: "html",
    grupos: [
      {
        seccion: "Contenedores",
        notas: [["form", '<form action="" method="">...</form>', "📋"]],
      },
      {
        seccion: "Controles",
        notas: [
          ["select", "<select>...</select>", "📋"],
          ["option", '<option value="">...</option>', "🔘"],
          ["textarea", "<textarea>...</textarea>", "📝"],
        ],
      },
    ],
  },
  {
    id: "html-multimedia",
    label: "Multimedia y figuras",
    export: "HTML_MULTIMEDIA",
    archivo: "htmlMultimedia",
    icon: "🖼️",
    titulo: "Multimedia y figuras",
    descripcion: "Imágenes, audio, video, iframes y figuras con pie de foto.",
    simulador: "html",
    grupos: [
      {
        seccion: "Imágenes y media",
        notas: [
          ["img", '<img src="" alt="">', "🖼️"],
          ["audio", "<audio controls>...</audio>", "🔊"],
          ["video", "<video controls>...</video>", "🎥"],
          ["source", '<source src="" type="">', "🎞️"],
        ],
      },
      {
        seccion: "Iframes y figuras",
        notas: [
          ["iframe", '<iframe src="" title=""></iframe>', "🪟"],
          ["figure", "<figure>...</figure>", "🖼️"],
          ["figcaption", "<figcaption>...</figcaption>", "📝"],
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 2. Utilidades                                                       */
/* ------------------------------------------------------------------ */

const norm = (s = "") =>
  String(s)
    .replace(/^\uFEFF/g, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const slug = (s = "") =>
  norm(s)
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const limpiaTitulo = (s = "") =>
  s
    .replace(/[`*]/g, "")
    .replace(/^📄\s*/, "")
    .replace(/\s+/g, " ")
    .trim();

/* ------------------------------------------------------------------ */
/* 3. Descubrir apuntes (.html y .txt)                                 */
/* ------------------------------------------------------------------ */

// UUID de Notion CON o SIN guiones
const UUID_RE =
  /^(.+?)\s+[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$/i;

function listarApuntes(dir) {
  const out = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) {
      if (e.name === "CSS") continue;
      out.push(...listarApuntes(p));
      continue;
    }
    const low = e.name.toLowerCase();
    if (low.endsWith(".html")) {
      const base = path.basename(e.name, ".html").trim();
      const m = base.match(UUID_RE);
      out.push({ ruta: p, tipo: "html", prefijo: (m ? m[1] : base).trim() });
    } else if (low.endsWith(".txt")) {
      const head = fs.readFileSync(p, "utf8").slice(0, 800);
      const m = head.match(/`<\s*([^>\s]+)\s*>`/);
      if (m) {
        out.push({ ruta: p, tipo: "txt", prefijo: m[1].trim() });
      } else {
        const base = path.basename(e.name, ".txt").trim();
        const m2 = base.match(/`<\s*([^>\s]+)\s*>`/);
        if (m2) out.push({ ruta: p, tipo: "txt", prefijo: m2[1].trim() });
      }
    }
  }
  return out;
}

if (!fs.existsSync(HTML_DIR)) {
  console.error(`❌ No existe la carpeta: ${HTML_DIR}`);
  process.exit(1);
}

const APUNTES = listarApuntes(HTML_DIR);
const INDICE = new Map();
for (const a of APUNTES) {
  const key = norm(a.prefijo);
  const prev = INDICE.get(key);
  // Prioriza HTML sobre TXT si ambos existen
  if (!prev || (prev.tipo === "txt" && a.tipo === "html")) {
    INDICE.set(key, a);
  }
}

function buscarApunte(prefijo) {
  return INDICE.get(norm(prefijo)) || null;
}

/* ------------------------------------------------------------------ */
/* 4. Parser de TXT exportado de Notion                                */
/* ------------------------------------------------------------------ */

function bloques(cuerpo) {
  const partes = [];
  const re = /```(?:\w+)?\n?([\s\S]*?)```/g;
  let idx = 0;
  let m;
  while ((m = re.exec(cuerpo))) {
    if (m.index > idx)
      partes.push({ tipo: "texto", txt: cuerpo.slice(idx, m.index) });
    partes.push({ tipo: "code", code: m[1].replace(/^\n+|\n+$/g, "") });
    idx = m.index + m[0].length;
  }
  if (idx < cuerpo.length)
    partes.push({ tipo: "texto", txt: cuerpo.slice(idx) });
  return partes;
}

function parseCuerpo(cuerpo) {
  const texto = [];
  const codes = [];
  for (const b of bloques(cuerpo)) {
    if (b.tipo === "code") {
      codes.push(b.code);
      continue;
    }
    const parrs = b.txt
      .split(/\n\s*\n/)
      .map((x) => x.trim())
      .filter(Boolean);
    for (const parr of parrs) {
      const lineas = parr.split("\n").filter((l) => l.trim());
      const esLista =
        lineas.length > 0 && lineas.every((l) => /^[-*]\s/.test(l.trim()));
      if (esLista) {
        for (const l of lineas) texto.push(l.replace(/^[-*]\s+/, "").trim());
      } else {
        texto.push(parr.replace(/\n/g, " ").replace(/\s+/g, " ").trim());
      }
    }
  }
  return { texto, codes };
}

function parseTxtApunte(contenido, prefijo) {
  const clean = contenido.replace(/\uFEFF/g, "").replace(/\r\n/g, "\n");

  const primera = clean.split("\n").find((l) => l.startsWith("# ")) || "";
  const tm = primera.match(/`<\s*([^>\s]+)\s*>`/);
  const rawTitle = tm ? tm[1].trim() : prefijo;

  const reHeader = /^##\s+\*\*([^*]+?)\*\*\s*$/gm;
  const headers = [];
  let m;
  while ((m = reHeader.exec(clean))) {
    headers.push({
      title: m[1].trim(),
      start: m.index,
      end: m.index + m[0].length,
    });
  }

  const MAPA = {
    "📝 Definición": "definicion",
    "🧠 ¿Qué es?": "queEs",
    "🎯 ¿Para qué sirve?": "paraQueSirve",
    "⚙️ ¿Cómo funciona?": "comoFunciona",
    "📝 Sintaxis / Estructura": "sintaxis",
    "💡 Ejemplos": "ejemplos",
    "⚠️ Errores comunes": "errores",
    "💼 Casos de uso": "casos",
    "🧩 Relación con otros conceptos": "relacion",
    "🧠 Analogía": "analogia",
    "📚 Fuente": "fuente",
    "📝 Notas personales": "notasPersonales",
  };

  const secciones = {};
  for (let i = 0; i < headers.length; i++) {
    const h = headers[i];
    const fin = i + 1 < headers.length ? headers[i + 1].start : clean.length;
    const key = MAPA[h.title];
    if (key) secciones[key] = clean.slice(h.end, fin).trim();
  }

  const pick = (k) => (secciones[k] ? parseCuerpo(secciones[k]).texto : []);

  const definicion = pick("definicion");
  const queEs = pick("queEs");
  const paraQueSirve = pick("paraQueSirve");
  const comoFunciona = pick("comoFunciona");
  const casos = pick("casos");
  const relacion = pick("relacion");
  const errores = pick("errores");
  const notasPersonales = pick("notasPersonales");
  const analogia = pick("analogia").join(" ");
  const fuente = pick("fuente").join(" ") || "Apuntes personales · Notion";

  const sintaxis = [];
  if (secciones.sintaxis) {
    const p = parseCuerpo(secciones.sintaxis);
    if (p.codes[0]) sintaxis.push({ code: p.codes[0] });
    else if (p.texto[0]) sintaxis.push({ code: p.texto[0] });
  }

  const ejemplos = [];
  if (secciones.ejemplos) {
    let actual = null;
    const cerrar = () => {
      if (actual && actual.code) ejemplos.push(actual);
      actual = null;
    };
    for (const b of bloques(secciones.ejemplos)) {
      if (b.tipo === "code") {
        if (!actual)
          actual = {
            titulo: `Ejemplo ${ejemplos.length + 1}`,
            descripcion: "",
            code: "",
          };
        actual.code = b.code;
        cerrar();
        continue;
      }
      const parrs = b.txt
        .split(/\n\s*\n/)
        .map((x) => x.trim())
        .filter(Boolean);
      for (const parr of parrs) {
        const mb = parr.match(/^\*\*([^*]+?):?\*\*\s*(.*)$/s);
        if (mb) {
          cerrar();
          actual = {
            titulo: mb[1].replace(/:$/, "").trim(),
            descripcion: mb[2].trim(),
            code: "",
          };
        } else if (actual) {
          actual.descripcion = (
            actual.descripcion +
            " " +
            parr.replace(/\n/g, " ")
          ).trim();
        }
      }
    }
    cerrar();
  }

  return {
    rawTitle,
    icon: "📄",
    introText: [],
    definicion,
    queEs,
    paraQueSirve,
    comoFunciona,
    sintaxis,
    ejemplos,
    errores,
    casos,
    relacion,
    analogia,
    fuente,
    notasPersonales,
    nota: "",
  };
}

/* ------------------------------------------------------------------ */
/* 5. Construcción                                                     */
/* ------------------------------------------------------------------ */

function buildDoc(categoria, nota) {
  const [prefijo, firma, icono] = nota;
  const apunte = buscarApunte(prefijo);
  if (!apunte) return null;

  const contenido = fs.readFileSync(apunte.ruta, "utf8");
  const parsed =
    apunte.tipo === "html"
      ? parseNote(contenido)
      : parseTxtApunte(contenido, prefijo);

  const id = `html-${slug(prefijo)}`;
  const tituloBase = limpiaTitulo(parsed.rawTitle) || prefijo;
  // Los TXT de Notion guardan el título como "a" en vez de "<a>".
  const titulo = /^<[^>]+>$/.test(tituloBase)
    ? tituloBase
    : `<${tituloBase}>`;

  return {
    id,
    titulo,
    icon: parsed.icon && parsed.icon !== "📄" ? parsed.icon : icono,
    categoria: categoria.label,
    categoriaId: categoria.id,
    firma,
    simulador: categoria.simulador,
    definicion: parsed.definicion.length ? parsed.definicion : parsed.introText,
    queEs: parsed.queEs,
    paraQueSirve: parsed.paraQueSirve,
    comoFunciona: parsed.comoFunciona,
    sintaxis: parsed.sintaxis.length ? parsed.sintaxis : [{ code: firma }],
    nota: parsed.nota || undefined,
    ejemplos: parsed.ejemplos.map((ej) => ({
      ...ej,
      titulo: limpiaTitulo(ej.titulo) || "Ejemplo",
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
      (it) => typeof it === "string" && !it.includes("\n") && it.length < 90,
    );
    if (simple) {
      return `[\n${value.map((it) => `${pad}  ${JSON.stringify(it)},`).join("\n")}\n${pad}]`;
    }
    return `[\n${value.map((it) => `${pad}  ${serialize(it, indent + 1)},`).join("\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    if (!entries.length) return "{}";
    return `{\n${entries
      .map(
        ([k, v]) =>
          `${pad}  ${JSON.stringify(k)}: ${serialize(v, indent + 1)},`,
      )
      .join("\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

function buildCategoria(categoria) {
  const docs = [];
  const faltantes = [];

  for (const grupo of categoria.grupos) {
    for (const nota of grupo.notas) {
      const doc = buildDoc(categoria, nota);
      if (!doc) {
        faltantes.push(nota[0]);
        continue;
      }
      docs.push(doc);
    }
  }

  if (!docs.length) return { meta: null, docs: 0, faltantes, lista: [] };

  const docsById = Object.fromEntries(docs.map((d) => [d.id, d]));
  const meta = {
    id: categoria.id,
    label: categoria.label,
    icon: categoria.icon,
    titulo: categoria.titulo,
    descripcion: categoria.descripcion,
    simulador: categoria.simulador,
    grupos: categoria.grupos
      .map((grupo) => ({
        seccion: grupo.seccion,
        metodos: grupo.notas
          .filter(([prefijo]) => docsById[`html-${slug(prefijo)}`])
          .map(([prefijo, firma, icono]) => {
            const id = `html-${slug(prefijo)}`;
            const doc = docsById[id];
            return { id, nombre: doc.titulo, firma, icon: doc.icon || icono };
          }),
      }))
      .filter((g) => g.metodos.length),
  };

  return {
    meta,
    docs: docs.length,
    faltantes,
    lista: docs,
    docsById,
    categoria,
  };
}

/* Los quizzes usan como distractores apuntes de todas las categorías. Así
   incluso una etiqueta que está sola en su categoría (por ejemplo <a>)
   recibe un quiz completo en lugar de quedarse sin preguntas. */
function escribirCategoria(resultado, todosLosDocs) {
  if (!resultado.meta) return;

  for (const doc of resultado.lista) {
    doc.quiz = buildQuiz(doc, todosLosDocs);
  }

  const content = `/* Generado desde Apuntes/ — HTML.
   Regenerar con: node scripts/generate-html-elementos.mjs */

export const ${resultado.categoria.export} = ${serialize(resultado.meta)};

export const ${resultado.categoria.export}_DOCS = ${serialize(resultado.docsById)};
`;

  fs.writeFileSync(
    path.join(DATA_DIR, `${resultado.categoria.archivo}.js`),
    content,
    "utf8",
  );
}

/* ------------------------------------------------------------------ */
/* 6. Ejecución                                                        */
/* ------------------------------------------------------------------ */

console.log(`📂 Detectados ${APUNTES.length} apuntes en ${HTML_DIR}`);
console.log(`   · ${APUNTES.filter((a) => a.tipo === "html").length} HTML`);
console.log(`   · ${APUNTES.filter((a) => a.tipo === "txt").length} TXT\n`);

const resumen = CATEGORIAS.map(buildCategoria);
const todosLosDocs = resumen.flatMap((r) => r.lista);
for (const resultado of resumen) {
  escribirCategoria(resultado, todosLosDocs);
}
const total = resumen.reduce((a, r) => a + r.docs, 0);

console.log(`✅ HTML generado: ${total} apuntes\n`);
for (const r of resumen) {
  if (r.meta) console.log(`   ${r.meta.icon} ${r.meta.label}: ${r.docs}`);
}

const faltantes = resumen.flatMap((r) =>
  (r.faltantes || []).map((p) => `"${p}" (${r.meta?.label ?? "—"})`),
);

if (faltantes.length) {
  console.log(`\n⚠️  ${faltantes.length} faltante(s):`);
  for (const f of faltantes) console.log(`   · ${f}`);
} else {
  console.log(`\n🎉 Los 44 elementos encontrados.`);
}
