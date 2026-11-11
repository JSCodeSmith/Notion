/**
 * Genera los apuntes propios de los cuatro tipos de innovación a partir del
 * contenido curado de `scripts/innovacionTiposConceptos.mjs`.
 *
 * Escribe `src/data/negocioInnovacionTipos.js`, que luego se fusiona con el
 * curso de Innovación en `src/data/negociosApuntes.js`.
 *
 * Uso:  node scripts/generate-innovacion-tipos.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildQuiz } from "./generate-apuntes.mjs";
import { CONCEPTOS, GRUPO } from "./innovacionTiposConceptos.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "src", "data");

const CURSO = {
  id: "innovacion",
  label: "Innovación",
  export: "NEGOCIO_INNOVACION_TIPOS",
  archivo: "negocioInnovacionTipos",
  simulador: "innovacion",
};

const XP = { facil: 60, medio: 90 };

const norm = (value = "") =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const quitarBold = (value = "") => String(value).replace(/\*\*/g, "");

const clip = (value = "", max = 160) => {
  const texto = String(value).replace(/\s+/g, " ").trim();
  if (texto.length <= max) return texto;
  const corte = texto.lastIndexOf(" ", max);
  return `${texto.slice(0, corte > max * 0.6 ? corte : max).trim()}…`;
};

/* ------------------------------------------------------------------ */
/* Documentos                                                          */
/* ------------------------------------------------------------------ */

function buildDoc(config) {
  return {
    id: config.id,
    titulo: config.titulo,
    icon: config.icon,
    curso: CURSO.id,
    cursoLabel: CURSO.label,
    categoria: "Administración y Negocios",
    resumen: clip(quitarBold(config.definicion[0] ?? ""), 180),
    firma: config.firma,
    simulador: CURSO.simulador,
    simuladorTipo: config.simuladorTipo,

    definicion: config.definicion,
    queEs: config.queEs,
    paraQueSirve: config.paraQueSirve,
    comoFunciona: config.comoFunciona,
    errores: config.errores,
    casos: config.casos,
    relacion: config.relacion,
    analogia: config.analogia,
    notasPersonales: config.notasPersonales,
    extras: config.extras ?? [],
    fuente: config.fuente || "Apuntes de Innovación · Notion",
  };
}

/* ------------------------------------------------------------------ */
/* Laboratorio: emparejar + completar + paso a paso                    */
/* ------------------------------------------------------------------ */

function extraerPares(doc) {
  const pares = [];
  const vistos = new Set();
  const fuentes = [
    ...(doc.paraQueSirve ?? []),
    ...(doc.relacion ?? []),
    ...(doc.errores ?? []),
    ...(doc.casos ?? []),
  ];

  for (const item of fuentes) {
    if (typeof item !== "string" || item.startsWith("```")) continue;
    const limpio = quitarBold(item).trim();
    const m = limpio.match(/^([^:]{3,60}):\s+(.{15,180})$/u);
    if (!m) continue;
    const concepto = m[1].trim();
    const descripcion = clip(m[2].trim(), 160);
    if (vistos.has(norm(concepto))) continue;
    vistos.add(norm(concepto));
    pares.push({ concepto, descripcion });
    if (pares.length >= 6) break;
  }
  return pares;
}

const primerNegrita = (texto = "") => {
  const m = texto.match(/\*\*([^*]{2,40})\*\*/);
  return m ? m[1].trim() : "";
};

function misionCompletar(doc, hermanos) {
  const conNegrita = (doc.definicion ?? []).find((t) =>
    /\*\*([^*]{2,40})\*\*/.test(t),
  );
  if (!conNegrita) return null;

  const termino = primerNegrita(conNegrita);
  if (!termino) return null;

  const frase = quitarBold(conNegrita).replace(termino, "__________");
  if (frase === quitarBold(conNegrita)) return null;

  const distractores = [];
  for (const hermano of hermanos) {
    if (hermano.id === doc.id || distractores.length === 3) continue;
    const t = primerNegrita((hermano.definicion ?? [])[0] || "");
    if (!t || t === termino || frase.includes(t)) continue;
    distractores.push(t);
  }
  if (distractores.length < 3) return null;

  return {
    id: `${doc.id}-completar`,
    tipo: "completar",
    titulo: "Completa la definición",
    dificultad: "Fácil",
    xp: XP.facil,
    frase,
    opciones: [termino, ...distractores].slice(0, 4),
    correcto: termino,
    pista: `El término empieza por «${termino.charAt(0)}…».`,
    solucion: `${termino}: ${clip(quitarBold(conNegrita), 220)}`,
  };
}

function construirPasoAPaso(doc) {
  const pasos = [];
  for (const extra of doc.extras ?? []) {
    let actual = null;
    for (const parrafo of extra.textos) {
      for (const linea of parrafo.split("\n")) {
        const m = linea.trim().match(/^(\d)\uFE0F?\u20E3\s+(.+)$/);
        if (m) {
          actual = { titulo: m[2].trim(), explicacion: "", codigo: "", salida: "" };
          pasos.push(actual);
        } else if (actual) {
          actual.explicacion += (actual.explicacion ? "\n" : "") + linea;
        }
      }
    }
  }
  return pasos.map((paso, i) => ({ paso: i + 1, ...paso }));
}

function construirLab(doc, hermanos) {
  const misiones = [];
  const pares = extraerPares(doc);
  if (pares.length >= 4) {
    misiones.push({
      id: `${doc.id}-emparejar`,
      tipo: "emparejar",
      titulo: "Une concepto y descripción",
      dificultad: "Medio",
      xp: XP.medio,
      pares,
      pista: "Selecciona un concepto y luego su descripción.",
      solucion: pares.map((p) => `${p.concepto} → ${p.descripcion}`).join(" · "),
    });
  }
  const completar = misionCompletar(doc, hermanos);
  if (completar) misiones.push(completar);

  return {
    misiones,
    pasoAPaso: construirPasoAPaso(doc),
    consola: true,
    editor: true,
    depuracion: true,
  };
}

/* ------------------------------------------------------------------ */
/* Serialización                                                       */
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
        ([k, v]) => `${pad}  ${JSON.stringify(k)}: ${serialize(v, indent + 1)},`,
      )
      .join("\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

/* ------------------------------------------------------------------ */
/* Generación                                                          */
/* ------------------------------------------------------------------ */

const docs = CONCEPTOS.map((concepto) => buildDoc(concepto));

for (const doc of docs) {
  doc.quiz = buildQuiz(doc, docs);
  doc.lab = construirLab(doc, docs);
}

const docsById = Object.fromEntries(docs.map((doc) => [doc.id, doc]));

const grupo = {
  seccion: GRUPO.seccion,
  metodos: GRUPO.conceptos
    .filter((id) => docsById[id])
    .map((id) => {
      const doc = docsById[id];
      return {
        id,
        nombre: doc.titulo,
        firma: doc.firma,
        icon: doc.icon,
        lab: doc.lab.misiones.length,
      };
    }),
};

const content = `/* Tipos de innovación · apuntes propios.
   Generado por scripts/generate-innovacion-tipos.mjs — no editar a mano. */

export const ${CURSO.export} = ${serialize(grupo)};

export const ${CURSO.export}_DOCS = ${serialize(docsById)};
`;

fs.writeFileSync(
  path.join(DATA_DIR, `${CURSO.archivo}.js`),
  content,
  "utf8",
);

console.log("\n✅ Tipos de innovación generados:\n");
console.log(`- ${docs.length} notas → ${CURSO.export}`);
for (const doc of docs) {
  console.log(
    `   · ${doc.titulo} (${doc.lab.pasoAPaso.length} pasos, ${doc.quiz.length} preguntas, ${doc.lab.misiones.length} misiones)`,
  );
}
