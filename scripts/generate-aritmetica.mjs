/**
 * Genera la categoría "Aritmética Comercial y Financiera" a partir del
 * contenido curado de `scripts/aritmeticaConceptos.mjs`.
 *
 * Cada tema de los TXT originales se publica como un apunte independiente,
 * con su simulador y su laboratorio.
 *
 * Uso:  node scripts/generate-aritmetica.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildQuiz } from "./generate-apuntes.mjs";
import { CONCEPTOS, CONCEPTOS_POR_ID, GRUPOS } from "./aritmeticaConceptos.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "src", "data");

/* ------------------------------------------------------------------ */
/* 1. Estructura                                                       */
/* ------------------------------------------------------------------ */

const CATEGORIA = {
  id: "aritmetica-comercial",
  label: "Aritmética Comercial y Financiera",
  export: "NEGOCIO_ARITMETICA",
  archivo: "negocioAritmetica",
  icon: "🧮",
  nivel: "Principiante",
  titulo: "Aritmética Comercial y Financiera",
  descripcion:
    "Precios, costos, ganancias, márgenes, descuentos, regla de tres e interés compuesto aplicados a los negocios.",
  simulador: "aritmetica",
  grupos: GRUPOS.map((grupo) => ({
    seccion: grupo.seccion,
    notas: grupo.conceptos.map((id) => {
      const concepto = CONCEPTOS_POR_ID[id];
      return {
        id: concepto.id,
        titulo: concepto.titulo,
        icon: concepto.icon,
        firma: concepto.firma,
      };
    }),
  })),
};

/* ------------------------------------------------------------------ */
/* 2. Utilidades                                                       */
/* ------------------------------------------------------------------ */

const norm = (value = "") =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const clip = (value = "", max = 160) => {
  const texto = String(value).replace(/\s+/g, " ").trim();
  if (texto.length <= max) return texto;
  const corte = texto.lastIndexOf(" ", max);
  return `${texto.slice(0, corte > max * 0.6 ? corte : max).trim()}…`;
};

const quitarBold = (value = "") => String(value).replace(/\*\*/g, "");

/* ------------------------------------------------------------------ */
/* 3. Construcción del documento                                       */
/* ------------------------------------------------------------------ */

function buildDoc(config) {
  return {
    id: config.id,
    titulo: config.titulo,
    icon: config.icon,
    curso: CATEGORIA.id,
    cursoLabel: CATEGORIA.label,
    categoria: "Administración y Negocios",
    resumen: clip(quitarBold(config.definicion[0] ?? ""), 180),
    firma: config.firma,
    simulador: CATEGORIA.simulador,
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
    fuente: config.fuente || "Apuntes personales · Notion",
  };
}

/* ------------------------------------------------------------------ */
/* 5. Laboratorio (completar + emparejar + paso a paso)                */
/* ------------------------------------------------------------------ */

const XP = { facil: 60, medio: 90, dificil: 120 };

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
  return pares.slice(0, 6);
}

const primerNegrita = (texto = "") => {
  const m = texto.match(/\*\*([^*]{2,60})\*\*/);
  return m ? m[1].trim() : "";
};

function misionCompletar(doc, hermanos) {
  const conNegrita = (doc.definicion ?? []).find((t) =>
    /\*\*([^*]{2,60})\*\*/.test(t),
  );
  if (!conNegrita) return null;
  const termino = primerNegrita(conNegrita);
  if (!termino) return null;
  const frase = quitarBold(conNegrita).replace(termino, "__________");
  if (frase === quitarBold(conNegrita)) return null;

  const distractores = [];
  for (const h of hermanos) {
    if (h.id === doc.id || distractores.length === 3) continue;
    const t = primerNegrita((h.definicion ?? [])[0] || "");
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
  // 1. Intentar desde ejemplos (HTML)
  if (doc.ejemplos?.length) {
    return doc.ejemplos.map((ej, i) => ({
      paso: i + 1,
      titulo: ej.titulo || `Paso ${i + 1}`,
      explicacion: ej.descripcion || "",
      codigo: ej.code,
      salida: "",
    }));
  }
  // 2. Extraer pasos de los "1️⃣, 2️⃣…" en extras
  const pasos = [];
  for (const extra of doc.extras ?? []) {
    let actual = null;
    for (const parrafo of extra.textos) {
      for (const linea of parrafo.split("\n")) {
        const m = linea.trim().match(/^(\d)\uFE0F?\u20E3\s+(.+)$/);
        if (m) {
          actual = {
            titulo: m[2].trim(),
            explicacion: "",
            codigo: "",
            salida: "",
          };
          pasos.push(actual);
        } else if (actual) {
          actual.explicacion += (actual.explicacion ? "\n" : "") + linea;
        }
      }
    }
  }
  return pasos.map((p, i) => ({ paso: i + 1, ...p }));
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
      solucion: pares
        .map((p) => `${p.concepto} → ${p.descripcion}`)
        .join(" · "),
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
        ([k, v]) =>
          `${pad}  ${JSON.stringify(k)}: ${serialize(v, indent + 1)},`,
      )
      .join("\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}
/* ------------------------------------------------------------------ */
/* 7. Generación de apuntes                                            */
/* ------------------------------------------------------------------ */

const docs = CONCEPTOS.map((concepto) => buildDoc(concepto));

if (!docs.length) {
  throw new Error("No se pudo construir ningún concepto de aritmética.");
}

for (const doc of docs) {
  doc.quiz = buildQuiz(doc, docs);
  doc.lab = construirLab(doc, docs);
}

const docsById = Object.fromEntries(docs.map((doc) => [doc.id, doc]));

const meta = {
  id: CATEGORIA.id,
  label: CATEGORIA.label,
  icon: CATEGORIA.icon,
  nivel: CATEGORIA.nivel,
  titulo: CATEGORIA.titulo,
  descripcion: CATEGORIA.descripcion,
  simulador: CATEGORIA.simulador,
  grupos: CATEGORIA.grupos.map((grupo) => ({
    seccion: grupo.seccion,
    metodos: grupo.notas
      .filter((config) => docsById[config.id])
      .map((config) => {
        const doc = docsById[config.id];
        return {
          id: config.id,
          nombre: doc.titulo,
          firma: config.firma,
          icon: config.icon,
          lab: doc.lab.misiones.length,
        };
      }),
  })),
};

const content = `/* Aritmética Comercial y Financiera.
   Generado por scripts/generate-aritmetica.mjs — no editar a mano. */

export const ${CATEGORIA.export} = ${serialize(meta)};

export const ${CATEGORIA.export}_DOCS = ${serialize(docsById)};
`;

fs.writeFileSync(
  path.join(DATA_DIR, `${CATEGORIA.archivo}.js`),
  content,
  "utf8",
);

/* ------------------------------------------------------------------ */
/* 9. Reporte                                                          */
/* ------------------------------------------------------------------ */

console.log("\n✅ Aritmética generada:\n");
console.log(`- ${CATEGORIA.label}: ${docs.length} notas → ${CATEGORIA.export}`);
for (const doc of docs) {
  console.log(
    `   · ${doc.titulo} (${doc.lab.pasoAPaso.length} pasos, ${doc.quiz.length} preguntas)`,
  );
}
