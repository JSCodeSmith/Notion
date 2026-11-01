/**
 * Genera los apuntes de Administración y Negocios a partir de los HTML
 * exportados de Notion que viven en la carpeta `Apuntes/`.
 *
 * Uso:  node scripts/generate-negocios.mjs
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
const HTML_DIR = path.join(ROOT, "Apuntes");
const DATA_DIR = path.join(ROOT, "src", "data");

/* ------------------------------------------------------------------ */
/* 1. Estructura: cursos, subgrupos y notas                            */
/* ------------------------------------------------------------------ */

const CURSOS = [
  {
    id: "admin-gestion",
    label: "Administración y Gestión",
    export: "NEGOCIO_ADMIN_GESTION",
    archivo: "negocioAdminGestion",
    icon: "🧠",
    nivel: "Principiante",
    titulo: "Administración y Gestión",
    descripcion:
      "Fundamentos de la administración, procesos, estándares, ética y medición del desempeño.",
    grupos: [
      {
        seccion: "Fundamentos de la administración",
        notas: [
          ["proceso-administrativo", "Proceso Administrativo", "🧭"],
          ["teoria-sociotecnica", "Teoría Sociotécnica", "🔗"],
        ],
      },
      {
        seccion: "Medición y objetivos",
        notas: [
          ["kpis", "¿Qué son los KPIs?", "📊"],
          ["okr", "OKR (Objectives and Key Results)", "🎯"],
          ["smart", "Metodología SMART", "✅"],
        ],
      },
      {
        seccion: "Datos, estándares y ética",
        notas: [
          [
            "transformacion-datos-decisiones",
            "Proceso de Transformación de Datos en Toma de Decisiones",
            "🔄",
          ],
          ["estandar-ansi", "Estándar ANSI", "📐"],
          [
            "etica-responsabilidad",
            "Ética y Responsabilidad de los Negocios",
            "⚖️",
          ],
        ],
      },
      {
        seccion: "Marco ETPS",
        notas: [
          [
            "etps",
            "📄 ETPS (Estrategia, Tecnología, Personas, Sistemas)",
            "🧩",
          ],
        ],
      },
    ],
  },
  {
    id: "estrategia",
    label: "Estrategia Empresarial",
    export: "NEGOCIO_ESTRATEGIA",
    archivo: "negocioEstrategia",
    icon: "🎯",
    nivel: "Intermedio",
    titulo: "Estrategia Empresarial",
    descripcion:
      "Análisis del entorno y de los recursos, estrategia competitiva y diseño del modelo de negocio.",
    grupos: [
      {
        seccion: "Análisis del entorno",
        notas: [
          [
            "foda",
            "FODA (Fortalezas, Oportunidades, Debilidades y Amenazas)",
            "🟦",
          ],
          ["pestel", "PESTEL Analysis", "🌍"],
          ["cinco-fuerzas-porter", "Las 5 Fuerzas de Porter", "✋"],
          ["vuca", "VUCA (Volátil, Incierto, Complejo, Ambiguo)", "🌪️"],
        ],
      },
      {
        seccion: "Recursos y ventaja competitiva",
        notas: [
          ["ventaja-competitiva", "Ventaja Competitiva", "🏆"],
          ["vrio", "VRIO", "✅"],
          [
            "rbv",
            "RBV (Resource-Based View) - Visión Basada en Recursos",
            "🗃️",
          ],
          [
            "recursos-estrategicos",
            "Recursos Estratégicos / Recursos Clave",
            "🧰",
          ],
          [
            "diferenciacion-mercado",
            "Diferenciación del Mercado",
            "🏷️",
          ],
        ],
      },
      {
        seccion: "Estrategia competitiva",
        notas: [
          [
            "estrategias-genericas-porter",
            "Estrategias Genéricas de Michael Porter",
            "🧱",
          ],
          ["oceanos-azules", "Estrategia del Océano Azul", "🌊"],
          [
            "marco-errc",
            "Marco ERRC (Eliminar, Reducir, Incrementar, Crear)",
            "♻️",
          ],
          ["matriz-bcg", "Matriz BCG (Boston Consulting Group)", "📈"],
        ],
      },
      {
        seccion: "Modelo de negocio",
        notas: [
          ["modelo-de-negocio", "¿Qué es un Modelo de Negocio?", "🏗️"],
          [
            "business-model-canvas",
            "Business Model Canvas (Lienzo de Modelo de Negocio)",
            "🗺️",
          ],
          ["propuesta-de-valor", "Propuesta de Valor", "💎"],
          [
            "canvas-propuesta-valor",
            "Canvas de la Propuesta de Valor",
            "🎨",
          ],
        ],
      },
      {
        seccion: "Mercados y clientes",
        notas: [
          ["b2b", "B2B", "🤝"],
          ["b2c", "B2C", "🛍️"],
          [
            "saas-b2b",
            "SaaS B2B",
            "☁️",
          ],
          [
            "plataformas-multilaterales",
            "Plataformas Multilaterales",
            "🔀",
          ],
        ],
      },
    ],
  },
  {
    id: "emprendimiento",
    label: "Emprendimiento y Startups",
    export: "NEGOCIO_EMPRENDIMIENTO",
    archivo: "negocioEmprendimiento",
    icon: "🚀",
    nivel: "Intermedio",
    titulo: "Emprendimiento y Startups",
    descripcion:
      "Ciclo de vida de una startup, validación de ideas, financiación y comunicación del proyecto.",
    grupos: [
      {
        seccion: "Etapas y financiación",
        notas: [
          ["startup", "Startup (Empresa Emergente)", "🚀"],
          [
            "unicornio",
            "Unicornio Empresarial (Unicorn Startup)",
            "🦄",
          ],
          [
            "business-angel",
            "Business Angel (Ángel Inversionista)",
            "👼",
          ],
          [
            "venture-capital",
            "Venture Capital (VC) — Capital de Riesgo",
            "💰",
          ],
          ["fintech", "Fintech", "💳"],
          [
            "ebt",
            "Empresa de Base Tecnológica (EBT)",
            "🔬",
          ],
        ],
      },
      {
        seccion: "Validación e iteración",
        notas: [
          ["mvp", "Producto Mínimo Viable (MVP)", "🧪"],
          [
            "tipos-mvp",
            "Tipos de MVP: De Humo, Mago de Oz y Conserje",
            "🧩",
          ],
          ["lean-startup", "Metodología Lean Startup", "🔁"],
        ],
      },
      {
        seccion: "Comunicación",
        notas: [["pitch", "Pitch", "🎤"]],
      },
    ],
  },
  {
    id: "innovacion",
    label: "Innovación",
    export: "NEGOCIO_INNOVACION",
    archivo: "negocioInnovacion",
    icon: "💡",
    nivel: "Intermedio",
    titulo: "Innovación",
    descripcion:
      "Tipos de innovación, transformación digital, organizaciones exponenciales y tecnología aplicada.",
    grupos: [
      {
        seccion: "Tipos de innovación",
        notas: [
          [
            "tipos-innovacion",
            "¿Qué es Innovación? Incremental, Disruptiva, Radical y Tecnológica",
            "💡",
          ],
          [
            "innovacion-disruptiva",
            "Teoría de la Innovación Disruptiva — Clayton Christensen",
            "⚡",
          ],
        ],
      },
      {
        seccion: "Transformación digital",
        notas: [
          ["transformacion-digital", "Transformación Digital", "📲"],
          [
            "transformacion-digital-transfronteriza",
            "Transformación Digital Transfronteriza (Cross-Border Digital Transformation)",
            "🌐",
          ],
          [
            "escalabilidad-digital",
            "Escalabilidad Operativa Digital",
            "📶",
          ],
        ],
      },
      {
        seccion: "Organizaciones y tecnología",
        notas: [
          [
            "filosofia-exo",
            "Filosofía ExO (Organización Exponencial)",
            "🧬",
          ],
          [
            "empresas-tecnologicas",
            "Empresas Tecnológicas (Tech Companies)",
            "💻",
          ],
          [
            "software-empresarial",
            "Software Empresarial / Enterprise Software",
            "🖥️",
          ],
          [
            "business-ai",
            "Business AI / Enterprise AI",
            "🧠",
          ],
          [
            "automatizacion-empresarial",
            "Automatización Empresarial (Business Automation)",
            "🤖",
          ],
        ],
      },
    ],
  },
  {
    id: "operaciones",
    label: "Operaciones y Procesos",
    export: "NEGOCIO_OPERACIONES",
    archivo: "negocioOperaciones",
    icon: "⚙️",
    nivel: "Intermedio",
    titulo: "Operaciones y Procesos",
    descripcion:
      "Cadena de valor, clasificación de actividades, desperdicios y procesos de servicio y desarrollo.",
    grupos: [
      {
        seccion: "Cadena de valor",
        notas: [
          ["cadena-de-valor", "Cadena de Valor (Value Chain)", "⛓️"],
          ["va", "VA (Value Added / Valor Agregado)", "➕"],
          [
            "nva",
            "NVA — Non-Value Added / Actividades Sin Valor Agregado",
            "🚫",
          ],
          [
            "nnva",
            "NNVA (Necessary Non-Value Added / Necesario Sin Valor Agregado)",
            "🔧",
          ],
        ],
      },
      {
        seccion: "Mejora de procesos",
        notas: [
          [
            "muda",
            "Los 7 Tipos de Desperdicios — MUDA",
            "🗑️",
          ],
        ],
      },
      {
        seccion: "Servicio y desarrollo",
        notas: [
          [
            "atencion-cliente-itsm",
            "Proceso de Atención al Cliente — Soporte ITSM",
            "🎧",
          ],
          [
            "sdlc",
            "SDLC — Software Development Life Cycle",
            "🛠️",
          ],
        ],
      },
    ],
  },
  {
    id: "liderazgo",
    label: "Organización y Liderazgo",
    export: "NEGOCIO_LIDERAZGO",
    archivo: "negocioLiderazgo",
    icon: "🗣️",
    nivel: "Avanzado",
    titulo: "Organización y Liderazgo",
    descripcion:
      "Estilos de liderazgo y las principales estructuras organizativas: funcional, divisional, matricial, plana y holocracia.",
    grupos: [
      {
        seccion: "Estilos de liderazgo",
        notas: [
          [
            "estilos-liderazgo",
            "Estilos de Liderazgo: Transaccional, Transformacional y Servicial",
            "🗣️",
          ],
        ],
      },
      {
        seccion: "Estructuras organizativas",
        notas: [
          ["estructura-funcional", "Estructura Funcional", "🏛️"],
          ["estructura-divisional", "Estructura Divisional", "🏬"],
          ["estructura-matricial", "Estructura Matricial", "🕸️"],
          [
            "estructura-horizontal",
            "Estructura Horizontal (Plana)",
            "🧑‍🤝‍🧑",
          ],
          ["holocracia", "Holocracia", "🕊️"],
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 2. Utilidades de texto                                              */
/* ------------------------------------------------------------------ */

const norm = (value = "") =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

const collapse = (value = "") =>
  value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();

const decodeEntities = (value = "") =>
  value
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&amp;/g, "&");

const limpiarTitulo = (value = "") =>
  collapse(
    decodeEntities(value.replace(/<[^>]+>/g, " "))
      .replace(/^\s*[\p{Extended_Pictographic}\uFE0F\u200D\u20E3]+\s*/u, "")
      .replace(/\*\*/g, "")
      .trim(),
  );

const sinMarkdown = (value = "") =>
  collapse(value.replace(/\*\*/g, "").replace(/[*`]/g, ""));

const clip = (value = "", max = 120) => {
  const text = sinMarkdown(value);
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return `${cut.slice(0, space > 40 ? space : max).trim()}…`;
};

/** Algunas notas repiten el nombre al inicio de la definición. */
const esLineaDeTitulo = (text = "") => {
  const clean = sinMarkdown(text);
  if (!clean || clean.length >= 48) return false;
  return !/^(es|sirve|permite|devuelve|representa|se|consiste|obtiene|crea|elimina|añade|agrega|son|hace)\b/i.test(
    clean,
  );
};

const sinLineasDeTitulo = (items = []) => {
  const out = [...items];
  while (out.length > 1 && esLineaDeTitulo(out[0])) out.shift();
  return out;
};

/* ------------------------------------------------------------------ */
/* 3. Lectura de los HTML                                              */
/* ------------------------------------------------------------------ */

const archivos = fs
  .readdirSync(HTML_DIR)
  .filter((file) => file.endsWith(".html"));

const notas = archivos.map((archivo) => {
  const html = fs.readFileSync(path.join(HTML_DIR, archivo), "utf8");
  const docTitle = (html.match(/<title>([\s\S]*?)<\/title>/i) || [])[1] ?? "";
  const body = html.slice(html.indexOf('<div class="page-body">'));
  const h1Html = (body.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] ?? "";
  return {
    archivo,
    html,
    docTitle: collapse(docTitle),
    h1: limpiarTitulo(h1Html),
  };
});

const indicePorTitulo = new Map();
for (const nota of notas) {
  const clave = norm(nota.docTitle);
  if (!indicePorTitulo.has(clave)) indicePorTitulo.set(clave, []);
  indicePorTitulo.get(clave).push(nota);
}

function buscarNota(tituloEsperado) {
  const clave = norm(tituloEsperado);
  const exactas = indicePorTitulo.get(clave) ?? [];
  if (exactas.length === 1) return exactas[0];
  if (exactas.length > 1) {
    throw new Error(`Título repetido en Apuntes/: "${tituloEsperado}"`);
  }

  const candidatas = notas.filter((nota) => {
    const titulo = norm(nota.docTitle);
    return titulo.startsWith(clave) || titulo.includes(clave);
  });
  if (candidatas.length === 1) return candidatas[0];
  throw new Error(
    `No se pudo identificar el HTML de "${tituloEsperado}" (${candidatas.length} coincidencias)`,
  );
}

/* ------------------------------------------------------------------ */
/* 4. Construcción de documentos                                       */
/* ------------------------------------------------------------------ */

const comoFunciona = (items) =>
  items.map((item) => sinMarkdown(item)).filter(Boolean);

function buildDoc(nota, curso, id, icon) {
  const parsed = parseNote(nota.html);
  const titulo = nota.h1 || nota.docTitle || id;

  const definicion = sinLineasDeTitulo(
    parsed.definicion.length
      ? parsed.definicion
      : parsed.introText.length
        ? parsed.introText
        : [`**${titulo}** es un concepto clave de Administración y Negocios.`],
  );

  return {
    id,
    titulo,
    icon,
    curso: curso.id,
    cursoLabel: curso.label,
    categoria: "Administración y Negocios",
    resumen: clip(definicion[0] ?? "", 110),
    definicion,
    queEs: sinLineasDeTitulo(
      parsed.queEs.length ? parsed.queEs : definicion,
    ),
    paraQueSirve: parsed.paraQueSirve,
    comoFunciona: comoFunciona(parsed.comoFunciona),
    comoFuncionaSinNumerar: true,
    errores: parsed.errores,
    casos: parsed.casos,
    relacion: parsed.relacion.slice(0, 12),
    analogia:
      parsed.analogia ||
      `Piensa en ${titulo} como una pieza más del rompecabezas de la empresa: por sí sola no explica el resultado, pero sin ella el conjunto no funciona.`,
    notasPersonales: parsed.notasPersonales,
    fuente: parsed.fuente,
  };
}

/* ------------------------------------------------------------------ */
/* 5. Serialización                                                    */
/* ------------------------------------------------------------------ */

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
        ([key, v]) => `${pad}  ${JSON.stringify(key)}: ${serialize(v, indent + 1)},`,
      )
      .join("\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

/* ------------------------------------------------------------------ */
/* 6. Generación                                                       */
/* ------------------------------------------------------------------ */

const usadas = new Set();
const resumen = [];

const modulos = CURSOS.map((curso) => {
  const docs = [];

  for (const grupo of curso.grupos) {
    for (const [id, tituloEsperado, icon] of grupo.notas) {
      const nota = buscarNota(tituloEsperado);
      if (usadas.has(nota.archivo)) {
        throw new Error(`El HTML "${nota.archivo}" está asignado dos veces`);
      }
      usadas.add(nota.archivo);
      docs.push(buildDoc(nota, curso, id, icon));
    }
  }

  // Quiz: cada apunte se apoya en los demás de su curso.
  for (const doc of docs) {
    doc.quiz = buildQuiz(doc, docs);
  }

  const docsById = Object.fromEntries(docs.map((doc) => [doc.id, doc]));

  const meta = {
    id: curso.id,
    label: curso.label,
    icon: curso.icon,
    nivel: curso.nivel,
    titulo: curso.titulo,
    descripcion: curso.descripcion,
    grupos: curso.grupos.map((grupo, index) => ({
      seccion: grupo.seccion,
      metodos: grupo.notas.map(([id, , icon]) => {
        const doc = docsById[id];
        return {
          id,
          nombre: doc.titulo,
          firma: doc.resumen,
          icon,
          badge: index === 0 ? undefined : undefined,
        };
      }),
    })),
  };

  const content = `/* Generado desde Apuntes/ — no editar a mano.
   Regenerar con: node scripts/generate-negocios.mjs */

export const ${curso.export} = ${serialize(meta)};

export const ${curso.export}_DOCS = ${serialize(docsById)};
`;

  fs.writeFileSync(
    path.join(DATA_DIR, `${curso.archivo}.js`),
    content,
    "utf8",
  );

  resumen.push({ curso: curso.label, docs: docs.length, export: curso.export });
  return { curso, meta };
});

/* Agregador ------------------------------------------------------- */

const imports = modulos
  .map(
    ({ curso }) =>
      `import { ${curso.export}, ${curso.export}_DOCS } from "./${curso.archivo}";`,
  )
  .join("\n");

const categorias = modulos
  .map(({ curso }) => `  ${curso.export},`)
  .join("\n");

const spreadDocs = modulos
  .map(({ curso }) => `  ...${curso.export}_DOCS,`)
  .join("\n");

const aggregator = `${imports}

/* Cursos de Administración y Negocios (una pestaña por curso). */
export const NEGOCIOS_CURSOS = [
${categorias}
];

/* Todos los apuntes de negocios, indexados por id. */
export const NEGOCIOS_APUNTES = {
${spreadDocs}
};

/* id del apunte → id de su curso. */
export const NEGOCIO_APUNTE_CURSO = Object.fromEntries(
  NEGOCIOS_CURSOS.flatMap((curso) =>
    curso.grupos.flatMap((grupo) =>
      grupo.metodos.map((metodo) => [metodo.id, curso.id]),
    ),
  ),
);

export const NEGOCIOS_IDS = new Set(Object.keys(NEGOCIOS_APUNTES));
`;

fs.writeFileSync(
  path.join(DATA_DIR, "negociosApuntes.js"),
  aggregator,
  "utf8",
);

/* Avisos ---------------------------------------------------------- */

const sinAsignar = notas.filter((nota) => !usadas.has(nota.archivo));
console.log("✅ Apuntes de negocios generados:\n");
for (const item of resumen) {
  console.log(`- ${item.curso}: ${item.docs} notas → ${item.export}`);
}
console.log(`\nTotal: ${usadas.size} de ${notas.length} HTML.`);
if (sinAsignar.length) {
  console.warn("\n⚠️  HTML sin asignar:");
  for (const nota of sinAsignar) console.warn(`   · ${nota.archivo}`);
}
