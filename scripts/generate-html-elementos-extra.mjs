/**
 * Genera apuntes extra de HTML desde `Apuntes/ElmentosHtml.txt`
 * (export de Notion con varios elementos en un solo TXT).
 *
 * Uso: node scripts/generate-html-elementos-extra.mjs
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildQuiz } from "./generate-apuntes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TXT = path.join(ROOT, "Apuntes", "ElmentosHtml.txt");
const OUT = path.join(ROOT, "src", "data", "htmlElementosExtra.js");

/* ------------------------------------------------------------------ */
/* 1. Metadatos por elemento                                           */
/* ------------------------------------------------------------------ */

const EXISTENTES = new Set(["figcaption"]);

const META = {
  ins: { firma: "<ins>Texto insertado</ins>", icon: "✍️", cat: "texto" },
  s: { firma: "<s>Texto obsoleto</s>", icon: "🚫", cat: "texto" },
  del: { firma: "<del>Texto eliminado</del>", icon: "🗑️", cat: "texto" },
  cite: { firma: "<cite>Título de la obra</cite>", icon: "📚", cat: "texto" },
  dfn: { firma: "<dfn>Término</dfn>", icon: "📘", cat: "texto" },
  small: { firma: "<small>Letra pequeña</small>", icon: "🔡", cat: "texto" },
  mark: { firma: "<mark>Texto resaltado</mark>", icon: "🖍️", cat: "texto" },
  time: {
    firma: '<time datetime="2026-10-08">8 de octubre de 2026</time>',
    icon: "⏰",
    cat: "texto",
  },
  blockquote: {
    firma: "<blockquote>...</blockquote>",
    icon: "💬",
    cat: "texto",
  },
  wbr: { firma: "<wbr>", icon: "↩️", cat: "texto" },
  span: { firma: "<span>Texto inline</span>", icon: "✨", cat: "texto" },

  dl: {
    firma: "<dl><dt>Término</dt><dd>Definición</dd></dl>",
    icon: "📖",
    cat: "listas",
  },
  dt: { firma: "<dt>Término</dt>", icon: "🔤", cat: "listas" },
  dd: { firma: "<dd>Definición</dd>", icon: "📄", cat: "listas" },
  menu: {
    firma: "<menu><li>Acción</li></menu>",
    icon: "📋",
    cat: "listas",
  },

  label: {
    firma: '<label for="id">Etiqueta</label>',
    icon: "🏷️",
    cat: "formularios",
  },
  input: {
    firma: '<input type="text" id="id" name="campo">',
    icon: "⌨️",
    cat: "formularios",
  },
  optgroup: {
    firma: '<optgroup label="Grupo">...</optgroup>',
    icon: "🗂️",
    cat: "formularios",
  },
  datalist: {
    firma: '<datalist id="sugerencias">...</datalist>',
    icon: "📃",
    cat: "formularios",
  },
  button: {
    firma: '<button type="button">Acción</button>',
    icon: "🔘",
    cat: "formularios",
  },
  fieldset: {
    firma: "<fieldset>...</fieldset>",
    icon: "🧩",
    cat: "formularios",
  },
  legend: {
    firma: "<legend>Título del grupo</legend>",
    icon: "🏷️",
    cat: "formularios",
  },
  output: {
    firma: '<output for="a b" name="resultado">...</output>',
    icon: "📤",
    cat: "formularios",
  },

  svg: {
    firma: '<svg viewBox="0 0 100 100">...</svg>',
    icon: "🎨",
    cat: "multimedia",
  },
  map: { firma: '<map name="mapa">...</map>', icon: "🗺️", cat: "multimedia" },
  area: {
    firma: '<area shape="rect" coords="0,0,100,100" href="">',
    icon: "🎯",
    cat: "multimedia",
  },
  picture: {
    firma: "<picture><source ...><img ...></picture>",
    icon: "🖼️",
    cat: "multimedia",
  },
  embed: {
    firma: '<embed src="archivo.pdf" type="application/pdf">',
    icon: "🧩",
    cat: "multimedia",
  },
  track: {
    firma: '<track kind="subtitles" src="subs.vtt" srclang="es">',
    icon: "🎬",
    cat: "multimedia",
  },
  object: {
    firma: '<object data="archivo.pdf" type="application/pdf">...</object>',
    icon: "📦",
    cat: "multimedia",
  },

  title: {
    firma: "<title>Título de la página</title>",
    icon: "🏷️",
    cat: "estructura",
  },
  frameset: {
    firma: '<frameset cols="25%,75%">...</frameset>',
    icon: "🪟",
    cat: "estructura",
  },

  address: {
    firma: "<address>...</address>",
    icon: "📍",
    cat: "semantica",
  },

  table: { firma: "<table>...</table>", icon: "📊", cat: "tablas" },
};

const CATS = {
  texto: { id: "html-texto", label: "Texto y agrupación" },
  listas: { id: "html-listas", label: "Listas" },
  formularios: { id: "html-formularios", label: "Formularios" },
  multimedia: { id: "html-multimedia", label: "Multimedia y figuras" },
  estructura: { id: "html-estructura", label: "Estructura del documento" },
  semantica: { id: "html-semantica", label: "Semántica estructural" },
  tablas: { id: "html-tablas", label: "Tablas" },
};

const GRUPOS = {
  texto: [
    {
      seccion: "Texto semántico",
      tags: ["span", "small", "mark", "time"],
    },
    {
      seccion: "Citas y definiciones",
      tags: ["cite", "dfn", "blockquote"],
    },
    {
      seccion: "Cambios editoriales",
      tags: ["ins", "del", "s"],
    },
    {
      seccion: "Saltos de palabra",
      tags: ["wbr"],
    },
  ],
  listas: [
    {
      seccion: "Listas de descripción",
      tags: ["dl", "dt", "dd"],
    },
    {
      seccion: "Menú de comandos",
      tags: ["menu"],
    },
  ],
  formularios: [
    {
      seccion: "Etiquetas y controles",
      tags: ["label", "input", "button", "output"],
    },
    {
      seccion: "Grupos y sugerencias",
      tags: ["optgroup", "datalist", "fieldset", "legend"],
    },
  ],
  multimedia: [
    {
      seccion: "Imágenes responsive",
      tags: ["picture"],
    },
    {
      seccion: "Gráficos y mapas",
      tags: ["svg", "map", "area"],
    },
    {
      seccion: "Contenido incrustado",
      tags: ["embed", "object", "track"],
    },
  ],
  estructura: [
    {
      seccion: "Metadatos y legado",
      tags: ["title", "frameset"],
    },
  ],
  semantica: [
    {
      seccion: "Información de contacto",
      tags: ["address"],
    },
  ],
  tablas: [
    {
      seccion: "Tablas de datos",
      tags: ["table"],
    },
  ],
};

/* ------------------------------------------------------------------ */
/* 2. Parser del TXT                                                   */
/* ------------------------------------------------------------------ */

const LANG = new Set([
  "html",
  "css",
  "js",
  "javascript",
  "svg",
  "xml",
  "bash",
  "json",
  "text",
  "txt",
]);

const norm = (s = "") =>
  String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s*\/\s*/g, " ")
    .replace(/[^\w\s.-]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const slug = (s = "") =>
  String(s)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const SECCION = {
  definicion: ["definicion"],
  quees: ["que es"],
  paraquesirve: ["para que sirve", "para que servia"],
  comofunciona: ["como funciona", "como funcionaba"],
  sintaxis: ["sintaxis estructura", "sintaxis"],
  ejemplos: ["ejemplos", "ejemplos historicos"],
  errores: [
    "errores comunes",
    "errores comunes por eso esta obsoleto",
  ],
  casos: ["casos de uso", "casos de uso historicos"],
  relacion: ["relacion con otros conceptos"],
  analogia: ["analogia"],
  fuente: ["fuente"],
  notas: ["notas personales"],
};

function esSeccion(linea) {
  const t = linea.trim();
  if (!t) return null;
  // Encabezado con emoji: 📝 Definición
  const m = t.match(/^(\p{Extended_Pictographic}\uFE0F?)\s*(.+)$/u);
  if (!m) return null;
  const texto = norm(m[2]);
  for (const [clave, variantes] of Object.entries(SECCION)) {
    if (variantes.some((v) => texto === norm(v))) return clave;
  }
  return null;
}

function esTituloDeEjemplo(linea) {
  const t = linea.trim();
  if (!t || t.length > 160) return false;
  // Un título de ejemplo empieza en la columna 0 y termina en dos puntos.
  if (linea !== linea.trimStart()) return false;
  if (!/:\s*$/.test(t)) return false;
  return /^[A-ZÁÉÍÓÚÑÜ¿¡0-9]/.test(t);
}

function esMeta(linea) {
  const t = linea.trim();
  return (
    /^(Parámetros|Parametros|Valor de retorno|Atributos?|Retorno|Obsoletos?:)/i.test(
      t,
    ) ||
    /^Atributo\t/i.test(t) ||
    /^[a-zA-Z-]+\t/.test(t)
  );
}

function esFinDeCodigo(linea, lineas, i) {
  const t = linea.trim();
  if (!t) {
    // Un bloque en blanco dentro de código (p. ej. entre <dt>) se conserva,
    // salvo que lo siguiente sea un título o metadatos.
    let j = i + 1;
    while (j < lineas.length && !lineas[j].trim()) j += 1;
    if (j >= lineas.length) return true;
    const next = lineas[j].trim();
    if (LANG.has(next.toLowerCase())) return true;
    if (esSeccion(lineas[j])) return true;
    if (esMeta(next)) return true;
    if (esTituloDeEjemplo(next)) return true;
    return false;
  }
  if (esSeccion(linea)) return true;
  if (esMeta(t)) return true;
  if (LANG.has(t.toLowerCase())) return true;
  if (esTituloDeEjemplo(t)) return true;
  return false;
}

function extraerCodigo(seccion) {
  const lineas = seccion.split("\n");
  const out = [];
  for (let i = 0; i < lineas.length; i++) {
    if (!LANG.has(lineas[i].trim().toLowerCase())) continue;
    const code = [];
    let j = i + 1;
    for (; j < lineas.length; j++) {
      if (esFinDeCodigo(lineas[j], lineas, j)) break;
      code.push(lineas[j]);
    }
    const texto = code.join("\n").replace(/^\n+|\n+$/g, "").trimEnd();
    if (texto) out.push(texto);
    i = j - 1;
  }
  return out;
}

function parrafos(seccion) {
  return seccion
    .split("\n")
    .filter((l) => !LANG.has(l.trim().toLowerCase()))
    .join("\n")
    .split(/\n\s*\n/)
    .map((p) =>
      p
        .split("\n")
        .map((l) => l.trim())
        .filter(Boolean)
        .join(" ")
        .replace(/\s+/g, " ")
        .trim(),
    )
    .filter(Boolean)
    .filter((p) => !esMeta(p) && !LANG.has(p.toLowerCase()))
    .map((p) => p.replace(/^[-*]\s+/, "").replace(/^❌\s*/, "").trim())
    .filter(Boolean);
}

function parseElemento(bloque) {
  const lineas = bloque.split("\n");
  // Quita la primera línea (📄 <tag>) y posibles restos finales.

  const headers = [];
  for (let i = 0; i < lineas.length; i++) {
    const clave = esSeccion(lineas[i]);
    if (clave) headers.push({ clave, i });
  }

  const secciones = {};
  for (let k = 0; k < headers.length; k++) {
    const h = headers[k];
    const fin = k + 1 < headers.length ? headers[k + 1].i : lineas.length;
    secciones[h.clave] = lineas.slice(h.i + 1, fin).join("\n").trim();
  }

  const pick = (k) => (secciones[k] ? parrafos(secciones[k]) : []);
  const pickUno = (k) => pick(k).join(" ");

  const sintaxisCode = secciones.sintaxis
    ? extraerCodigo(secciones.sintaxis)[0] ??
      parrafos(secciones.sintaxis)[0] ??
      ""
    : "";

  const ejemplos = [];
  if (secciones.ejemplos) {
    const ls = secciones.ejemplos.split("\n");
    let pendiente = [];
    for (let i = 0; i < ls.length; i++) {
      if (!LANG.has(ls[i].trim().toLowerCase())) {
        const t = ls[i].trim();
        if (t) pendiente.push(t);
        continue;
      }
      const code = [];
      let j = i + 1;
      for (; j < ls.length; j++) {
        if (esFinDeCodigo(ls[j], ls, j)) break;
        code.push(ls[j]);
      }
      const codigo = code.join("\n").replace(/^\n+|\n+$/g, "").trimEnd();
      if (codigo) {
        if (!pendiente.length && ejemplos.length) {
          // Bloques consecutivos (HTML + CSS) pertenecen al mismo ejemplo.
          ejemplos[ejemplos.length - 1].code += `\n\n${codigo}`;
        } else {
          const titulo =
            pendiente
              .join(" ")
              .replace(/:\s*$/, "")
              .replace(/\s+/g, " ")
              .trim() || `Ejemplo ${ejemplos.length + 1}`;
          ejemplos.push({
            titulo,
            descripcion: "",
            code: codigo,
          });
        }
      }
      pendiente = [];
      i = j - 1;
    }
  }

  // Atributos mencionados en la sección de sintaxis.
  const atributos = [];
  if (secciones.sintaxis) {
    for (const linea of secciones.sintaxis.split("\n")) {
      const t = linea.trim();
      const m = t.match(/^([a-z][a-z0-9-]*)\t/);
      if (m && !["atributo", "valor", "retorno"].includes(m[1]))
        atributos.push(m[1]);
    }
  }

  return {
    definicion: pick("definicion"),
    queEs: pick("quees"),
    paraQueSirve: pick("paraquesirve"),
    comoFunciona: pick("comofunciona"),
    sintaxisCode,
    ejemplos,
    errores: pick("errores"),
    casos: pick("casos"),
    relacion: pick("relacion"),
    analogia: pickUno("analogia"),
    fuente: pickUno("fuente"),
    notasPersonales: pick("notas"),
    atributos: [...new Set(atributos)].filter(
      (a) => !["id", "class", "style", "lang", "dir", "title", "hidden"].includes(a),
    ),
  };
}

function dividirElementos(texto) {
  const lineas = texto.replace(/\uFEFF/g, "").replace(/\r\n/g, "\n").split("\n");
  const inicios = [];
  lineas.forEach((l, i) => {
    const m = l.trim().match(/^\p{Extended_Pictographic}\uFE0F?\s*<([a-z0-9]+)>$/iu);
    if (m) inicios.push({ i, tag: m[1].toLowerCase() });
  });
  return inicios.map((ini, k) => {
    const fin = k + 1 < inicios.length ? inicios[k + 1].i : lineas.length;
    return { tag: ini.tag, bloque: lineas.slice(ini.i, fin).join("\n") };
  });
}

/* ------------------------------------------------------------------ */
/* 3. Construcción de documentos                                       */
/* ------------------------------------------------------------------ */

function construirDoc(tag) {
  const meta = META[tag];
  const cat = CATS[meta.cat];
  const parsed = parseElemento(bloquesPorTag.get(tag));

  const id = `html-${slug(tag)}`;
  const titulo = `<${tag}>`;

  const primerError = parsed.errores[0] ?? "";
  const primerCaso = parsed.casos[0] ?? "";
  const primerNota = parsed.notasPersonales[0] ?? "";
  const atributos = parsed.atributos.slice(0, 3);
  const inicio = parsed.sintaxisCode || meta.firma;

  const doc = {
    id,
    titulo,
    icon: meta.icon,
    categoria: cat.label,
    categoriaId: cat.id,
    firma: meta.firma,
    simulador: "html",
    obsoleto: tag === "frameset" ? true : undefined,
    definicion: parsed.definicion,
    queEs: parsed.queEs,
    paraQueSirve: parsed.paraQueSirve,
    comoFunciona: parsed.comoFunciona,
    sintaxis: [{ code: inicio }],
    ejemplos: parsed.ejemplos,
    errores: parsed.errores,
    casos: parsed.casos,
    relacion: parsed.relacion,
    analogia: parsed.analogia,
    fuente: parsed.fuente,
    notasPersonales: parsed.notasPersonales.length
      ? parsed.notasPersonales
      : undefined,
    laboratorio: {
      objetivo: `Practica ${titulo} en un editor real: escribe el HTML, cambia sus atributos y comprueba el resultado en la vista previa.`,
      pasos: [
        `Escribe ${titulo} con un contenido propio y comprueba cómo lo interpreta el navegador.`,
        atributos.length
          ? `Prueba los atributos ${atributos.map((a) => `\`${a}\``).join(", ")} y observa qué cambia en la vista previa.`
          : "Añade una clase o un estilo y observa cómo cambia la presentación.",
        primerError
          ? `Provoca este error controlado: ${primerError} Después corrige el código.`
          : "Cambia el contenido por un caso real y comprueba que sigue siendo válido.",
      ],
      inicial: inicio,
      solucion: parsed.ejemplos[0]?.code ?? inicio,
      reto: primerCaso
        ? `Aplica ${titulo} a un caso real: ${primerCaso}`
        : `Crea un ejemplo propio de ${titulo} que puedas reutilizar en una página.`,
      pista:
        primerNota ||
        primerError ||
        "Revisa la sintaxis, ejecuta y compara el resultado con la vista previa.",
    },
  };

  return doc;
}

if (!fs.existsSync(TXT)) {
  console.error(`❌ No existe: ${TXT}`);
  process.exit(1);
}

const bloques = dividirElementos(fs.readFileSync(TXT, "utf8"));
const bloquesPorTag = new Map(bloques.map((b) => [b.tag, b.bloque]));

const tags = Object.keys(META).filter((t) => !EXISTENTES.has(t));
const faltan = tags.filter((t) => !bloquesPorTag.has(t));
if (faltan.length) {
  console.error("❌ No se encontraron en el TXT:", faltan.join(", "));
  process.exit(1);
}

const docs = tags.map(construirDoc);
const docsById = Object.fromEntries(docs.map((d) => [d.id, d]));

for (const doc of docs) doc.quiz = buildQuiz(doc, docs);

/* ------------------------------------------------------------------ */
/* 4. Agrupación por categoría                                         */
/* ------------------------------------------------------------------ */

const extrasGrupos = {};
const extrasCategorias = [];
const extrasDocs = {};

for (const [clave, grupos] of Object.entries(GRUPOS)) {
  const cat = CATS[clave];
  const metadatos = metasCategoria(clave, grupos);
  if (!metadatos.length) continue;

  extrasDocs[cat.id] = metadatos.map((m) => docsById[m.id]);

  const estructura = grupos
    .map((g) => ({
      seccion: g.seccion,
      metodos: g.tags
        .filter((t) => docsById[`html-${slug(t)}`])
        .map((t) => {
          const doc = docsById[`html-${slug(t)}`];
          return {
            id: doc.id,
            nombre: doc.titulo,
            firma: doc.firma,
            icon: doc.icon,
          };
        }),
    }))
    .filter((g) => g.metodos.length);

  extrasGrupos[cat.id] = estructura;

  // Las categorías nuevas no existen en los archivos base.
  if (clave === "tablas") {
    extrasCategorias.push({
      id: cat.id,
      label: cat.label,
      icon: "📊",
      titulo: "Tablas de datos",
      descripcion:
        "El elemento <table> y su estructura para presentar datos tabulares de forma accesible.",
      simulador: "html",
      grupos: estructura,
    });
  }
}

function metasCategoria(clave, grupos) {
  const out = [];
  for (const g of grupos)
    for (const t of g.tags) {
      const doc = docsById[`html-${slug(t)}`];
      if (doc) out.push({ id: doc.id, tag: t });
    }
  return out;
}

/* ------------------------------------------------------------------ */
/* 5. Serialización                                                    */
/* ------------------------------------------------------------------ */

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    const simple = value.every(
      (it) => typeof it === "string" && !it.includes("\n") && it.length < 90,
    );
    if (simple)
      return `[\n${value
        .map((it) => `${pad}  ${JSON.stringify(it)},`)
        .join("\n")}\n${pad}]`;
    return `[\n${value
      .map((it) => `${pad}  ${serialize(it, indent + 1)},`)
      .join("\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    if (!entries.length) return "{}";
    return `{\n${entries
      .map(
        ([k, v]) => `${pad}  ${JSON.stringify(k)}: ${serialize(v, indent + 1)},`,
      )
      .join("\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

const contenido = `/* Generado desde Apuntes/ElmentosHtml.txt.
   Regenerar con: node scripts/generate-html-elementos-extra.mjs */

export const HTML_EXTRA_GRUPOS = ${serialize(extrasGrupos)};

export const HTML_EXTRA_CATEGORIAS = ${serialize(extrasCategorias)};

export const HTML_EXTRA_DOCS = ${serialize(docsById)};
`;

fs.writeFileSync(OUT, contenido, "utf8");

console.log(`✅ ${docs.length} apuntes extra de HTML generados.`);
for (const [cat, lista] of Object.entries(extrasDocs)) {
  console.log(`   ${CATS[cat]?.label ?? cat}: ${lista.length}`);
}
