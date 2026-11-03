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
import { tokenize, buildQuiz } from "./generate-apuntes.mjs";

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
      .replace(
      /^\s*(?:\p{Extended_Pictographic}(?:\uFE0F|\u200D|\u20E3)*)+\s*/u,
      "",
    )
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
/* 3. Extracción de secciones                                          */
/* ------------------------------------------------------------------ */

/* Alias de encabezados (ya sin acentos ni puntuación) → clave interna. */
const ALIAS = [
  ["definicion", ["definicion"]],
  ["queEs", ["que es"]],
  ["paraQueSirve", ["para que sirve"]],
  ["comoFunciona", ["como funciona"]],
  ["ejemplos", ["ejemplos", "ejemplo"]],
  ["errores", ["errores", "riesgos"]],
  ["casos", ["casos de uso", "cuando usar", "casos praticos"]],
  ["relacion", ["relacion con otros conceptos", "relacion"]],
  ["analogia", ["analogia"]],
  ["fuente", ["fuente"]],
  ["notasPersonales", ["notas personales", "notas"]],
  ["sintaxis", ["sintaxis"]],
];

/* Claves que el documento guarda en sus propias tarjetas. */
const CAMPOS = new Set([
  "definicion",
  "queEs",
  "paraQueSirve",
  "comoFunciona",
  "errores",
  "casos",
  "relacion",
  "analogia",
  "fuente",
  "notasPersonales",
]);

const tituloNumerado = /^\**\s*\d\uFE0F?\u20E3/;

const esTituloDeBloque = (b) =>
  (b.type === "heading" && b.level <= 3) || (b.type === "p" && b.boldOnly);

const esTituloParte = (b) =>
  b.type === "heading" && b.level === 2 && tituloNumerado.test(b.text);

/** 🔸/🔹/❌ marcan subapartados dentro de una sección, no secciones nuevas. */
const esSubseccion = (text = "") => /^\s*\**\s*(?:🔸|🔹|❌)/u.test(text);

const claveDe = (text = "") => {
  const clean = norm(text);
  for (const [key, aliases] of ALIAS) {
    if (aliases.some((a) => clean === a || clean.startsWith(`${a} `))) {
      return key;
    }
  }
  return null;
};

/** Texto legible de un bloque (párrafo, cita, lista o tabla). */
function textosDeBloques(blocks) {
  const out = [];
  for (const b of blocks) {
    if (b.type === "list") {
      for (const item of b.items) {
        if (item.texto) out.push(item.texto);
        if (item.code) out.push(item.code);
      }
    } else if (b.type === "table") {
      for (const row of b.rows) {
        const fila =
          row.length >= 2
            ? `${row[0]} → ${row.slice(1).join(" · ")}`
            : row.join(" · ");
        if (fila.trim()) out.push(fila);
      }
    } else if (b.type === "code") {
      out.push("```\n" + b.code + "\n```");
    } else if (b.type === "p" || b.type === "quote" || b.type === "heading") {
      if (b.text) out.push(b.text);
    }
  }
  return out;
}

/**
 * Agrupa los bloques en secciones. Los encabezados conocidos abren una
 * sección del documento; los h2 desconocidos abren una sección extra
 * (por ejemplo "💡 Ejemplos" o "📊 Comparativa").
 */
function seccionar(blocks) {
  const out = [];
  let actual = { key: "intro", label: "", textos: [] };
  out.push(actual);

  for (const b of blocks) {
    if (b.type === "heading" && b.level === 1) continue; // título de la página

    if (!esTituloDeBloque(b)) {
      actual.textos.push(...textosDeBloques([b]));
      continue;
    }

    const key = claveDe(b.text);
    if (key) {
      actual = { key, label: b.text, textos: [] };
      out.push(actual);
      continue;
    }
    if (esSubseccion(b.text)) {
      actual.textos.push(...textosDeBloques([b]));
      continue;
    }
    if (b.type === "heading" && b.level === 2) {
      actual = { key: "extra", label: b.text, textos: [] };
      out.push(actual);
      continue;
    }
    actual.textos.push(...textosDeBloques([b]));
  }
  return out;
}

/** Une listas de secciones concatenando las que comparten clave. */
function combinar(...listas) {
  const mapa = new Map();
  const idDe = (s) => (s.key === "extra" ? `extra:${s.label}` : s.key);
  for (const lista of listas) {
    for (const s of lista) {
      const id = idDe(s);
      if (mapa.has(id)) mapa.get(id).textos.push(...s.textos);
      else mapa.set(id, { ...s, textos: [...s.textos] });
    }
  }
  return [...mapa.values()];
}

/** Separa los bloques en campos del documento y secciones extra. */
function camposDe(secciones) {
  const campos = { intro: [], extras: [] };
  for (const s of secciones) {
    if (s.key === "intro") {
      campos.intro.push(...s.textos);
    } else if (CAMPOS.has(s.key)) {
      campos[s.key] = [...(campos[s.key] ?? []), ...s.textos];
    } else {
      campos.extras.push({
        seccion: s.label || "💡 Ejemplos",
        textos: s.textos,
      });
    }
  }
  return campos;
}

/** Agrupa los bloques numerados (1️⃣, 2️⃣…) en "partes" con sus subtemas. */
function agruparPartes(blocks) {
  const partes = [];
  let parte = null;
  let sub = null;

  for (const b of blocks) {
    if (esTituloParte(b)) {
      parte = { titulo: b.text, bloques: [] };
      partes.push(parte);
      sub = null;
      continue;
    }
    if (!parte) continue;
    if (esTituloDeBloque(b)) {
      sub = { seccion: b.text, textos: [] };
      parte.bloques.push(sub);
      continue;
    }
    if (!sub) {
      sub = { seccion: "", textos: [] };
      parte.bloques.push(sub);
    }
    sub.textos.push(...textosDeBloques([b]));
  }
  return partes;
}

/**
 * Algunas notas (p. ej. "Estilos de Liderazgo") se organizan en partes
 * numeradas de h2 con sus propios ¿Qué es? / ¿Cómo funciona?. Esas notas
 * se separan en: intro + partes + cola (comparativa, errores, fuentes…).
 */
function extraer(html) {
  const bodyStart = html.lastIndexOf('<div class="page-body">');
  const body = (bodyStart >= 0 ? html.slice(bodyStart) : html)
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<\/article>[\s\S]*$/i, "");

  const blocks = tokenize(body);
  const inicio = blocks.findIndex(esTituloParte);

  if (inicio === -1) {
    return { campos: camposDe(seccionar(blocks)), partes: [] };
  }

  const pre = seccionar(blocks.slice(0, inicio));
  const resto = blocks.slice(inicio);
  const fin = resto.findIndex(
    (b, i) => i > 0 && b.type === "heading" && b.level === 2 && !esTituloParte(b),
  );
  const middle = fin === -1 ? resto : resto.slice(0, fin);
  const tail = fin === -1 ? [] : seccionar(resto.slice(fin));

  return {
    campos: camposDe(combinar(pre, tail)),
    partes: agruparPartes(middle),
  };
}

/* ------------------------------------------------------------------ */
/* 4. Lectura de los HTML                                              */
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
/* 5. Construcción de documentos                                       */
/* ------------------------------------------------------------------ */

function buildDoc(nota, curso, id, icon) {
  const { campos, partes } = extraer(nota.html);
  const titulo = nota.h1 || nota.docTitle || id;

  const definicion = sinLineasDeTitulo(
    campos.definicion?.length
      ? campos.definicion
      : campos.intro?.length
        ? campos.intro
        : [`**${titulo}** es un concepto clave de Administración y Negocios.`],
  );

  const conTitulo = (items) => sinLineasDeTitulo(items ?? []);

  return {
    id,
    titulo,
    icon,
    curso: curso.id,
    cursoLabel: curso.label,
    categoria: "Administración y Negocios",
    resumen: clip(definicion[0] ?? "", 110),

    definicion,
    queEs: conTitulo(campos.queEs?.length ? campos.queEs : definicion),
    paraQueSirve: campos.paraQueSirve ?? [],
    comoFunciona: campos.comoFunciona ?? [],
    comoFuncionaSinNumerar: true,
    errores: campos.errores ?? [],
    casos: campos.casos ?? [],
    relacion: (campos.relacion ?? []).slice(0, 12),
    analogia:
      campos.analogia?.join(" ") ||
      `Piensa en ${titulo} como una pieza más del rompecabezas de la empresa: por sí sola no explica el resultado, pero sin ella el conjunto no funciona.`,
    notasPersonales: campos.notasPersonales ?? [],
    extras: (campos.extras ?? []).filter((s) => s.textos.length),
    partes: partes.map((parte) => ({
      titulo: parte.titulo,
      bloques: parte.bloques
        .map((bloque) => ({
          seccion: bloque.seccion,
          textos: bloque.textos.filter(Boolean),
        }))
        .filter((bloque) => bloque.textos.length),
    })),
    fuente: campos.fuente?.join(" ") || "Apuntes personales · Notion",
  };
}

/* ------------------------------------------------------------------ */
/* 6. Serialización                                                    */
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
/* 7. Generación                                                       */
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
    grupos: curso.grupos.map((grupo) => ({
      seccion: grupo.seccion,
      metodos: grupo.notas.map(([id, , icon]) => {
        const doc = docsById[id];
        return {
          id,
          nombre: doc.titulo,
          firma: doc.resumen,
          icon,
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
