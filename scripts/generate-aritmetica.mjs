/**
 * Genera la categoría "Aritmética Comercial y Financiera" a partir de los
 * TXT de `Apuntes/`. Separa los temas que vienen juntos en un solo TXT.
 *
 * Uso:  node scripts/generate-aritmetica.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildQuiz } from "./generate-apuntes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TXT_DIR = path.join(ROOT, "Apuntes");
const DATA_DIR = path.join(ROOT, "src", "data");

/* ------------------------------------------------------------------ */
/* 1. Estructura                                                       */
/* ------------------------------------------------------------------ */

const CATEGORIA = {
  id: "aritmetica",
  label: "Aritmética Comercial y Financiera",
  export: "NEGOCIO_ARITMETICA",
  archivo: "negocioAritmetica",
  icon: "🧮",
  nivel: "Principiante",
  titulo: "Aritmética Comercial y Financiera",
  descripcion:
    "PV, ganancias, descuentos sucesivos, regla de tres e interés compuesto aplicados a los negocios.",
  simulador: "aritmetica",
  grupos: [
    {
      seccion: "Precios y ganancias",
      notas: [
        {
          id: "aritmetica-pv-ganancia",
          titulo:
            "Aritmética Comercial y Financiera: PV, Ganancia Bruta y Ganancia Neta",
          icon: "💰",
          firma: "PV, ganancia bruta, ganancia neta y márgenes",
        },
      ],
    },
    {
      seccion: "Descuentos, regla de tres e interés",
      notas: [
        {
          id: "aritmetica-general",
          titulo: "Aritmética Comercial y Financiera",
          icon: "🔁",
          firma: "Precios, descuentos sucesivos, regla de tres e interés",
        },
      ],
    },
  ],
};
/* Simulador específico por nota (opcional). */
const SIMULADOR_POR_NOTA = {
  "aritmetica-pv-ganancia": "aritmetica-pv",
  "aritmetica-descuentos-sucesivos": "aritmetica-descuentos",
  "aritmetica-interes-compuesto": "aritmetica-interes",
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

const limpiarTitulo = (value = "") =>
  value.replace(/^[^\p{L}\p{N}¿¡]+/u, "").trim();

/* ------------------------------------------------------------------ */
/* 3. Parser de TXT                                                    */
/* ------------------------------------------------------------------ */

const HEADER =
  /^(📝|🧠|🎯|⚙️|⚠️|💼|🧩|📚|📊|💡|🔄|🛠️|📋|📌|🔍|🧾|🔑|📎|🧮|💰|🌱|✂️|🔧)\s+(.+)$/u;

const CAMPOS = [
  [/definici[oó]n/i, "definicion"],
  [/qu[eé] es/i, "queEs"],
  [/para qu[eé] sirve/i, "paraQueSirve"],
  [/c[oó]mo funciona/i, "comoFunciona"],
  [/errores|advertencias|desaf[ií]os/i, "errores"],
  [/casos de uso/i, "casos"],
  [/relaci[oó]n con otros/i, "relacion"],
  [/analog[ií]a/i, "analogia"],
  [/fuente/i, "fuente"],
  [/notas personales/i, "notasPersonales"],
];

function parsearDoc(titulo, cuerpo) {
  const lineas = cuerpo.split(/\r?\n/);
  const secciones = [];
  let actual = { key: "intro", label: "", textos: [] };
  secciones.push(actual);

  for (const linea of lineas) {
    const limpia = linea.trim();
    const header = limpia.match(HEADER);
    if (header && limpia.length <= 120) {
      const label = header[2].trim();
      const campo = CAMPOS.find(([regex]) => regex.test(label));
      actual = {
        key: campo ? campo[1] : "extra",
        label: campo ? label : `${header[1]} ${label}`,
        textos: [],
      };
      secciones.push(actual);
      continue;
    }
    actual.textos.push(linea);
  }

  const doc = {
    definicion: [],
    queEs: [],
    paraQueSirve: [],
    comoFunciona: [],
    errores: [],
    casos: [],
    relacion: [],
    analogia: "",
    notasPersonales: [],
    fuente: "",
    extras: [],
    intro: [],
    titulo,
  };

  for (const s of secciones) {
    const texto = s.textos.join("\n").trim();
    if (!texto) continue;

    if (s.key === "extra") {
      doc.extras.push({
        seccion: s.label,
        textos: texto
          .split(/\n\s*\n/)
          .map((t) => t.trim())
          .filter(Boolean),
      });
    } else if (s.key === "analogia" || s.key === "fuente") {
      doc[s.key] = texto.replace(/\s+/g, " ").trim();
    } else if (s.key === "intro") {
      doc.intro = texto
        .split(/\n\s*\n/)
        .map((t) => t.replace(/\s+/g, " ").trim())
        .filter(Boolean);
    } else {
      doc[s.key] = texto
        .split(/\n\s*\n/)
        .map((t) => t.replace(/\s+/g, " ").trim())
        .filter(Boolean);
    }
  }

  return doc;
}

function leerTxt(archivo) {
  const ruta = path.join(TXT_DIR, archivo);
  if (!fs.existsSync(ruta)) {
    throw new Error(`No se encontró "${archivo}" en Apuntes/`);
  }
  return fs.readFileSync(ruta, "utf8").replace(/\uFEFF/g, "");
}

function extraerDocs(archivo) {
  const contenido = leerTxt(archivo);
  const trozos = contenido.split(/^📄\s*/m).filter((t) => t.trim());
  return trozos.map((trozo) => {
    const [primera, ...resto] = trozo.split(/\r?\n/);
    return {
      titulo: limpiarTitulo(primera.trim()),
      cuerpo: resto.join("\n"),
    };
  });
}

/* ------------------------------------------------------------------ */
/* 4. Construcción del documento                                       */
/* ------------------------------------------------------------------ */

function buildDoc(config, parsed) {
  const definicion = parsed.definicion.length
    ? parsed.definicion
    : parsed.intro.length
      ? parsed.intro
      : [`**${config.titulo}** es un tema clave de aritmética comercial.`];

  return {
    id: config.id,
    titulo: config.titulo,
    icon: config.icon,
    curso: CATEGORIA.id,
    cursoLabel: CATEGORIA.label,
    categoria: "Administración y Negocios",
    resumen: clip(quitarBold(definicion[0] ?? ""), 180),
    firma: config.firma,
    simulador: SIMULADOR_POR_NOTA[config.id] ?? CATEGORIA.simulador,

    definicion,
    queEs: parsed.queEs.length ? parsed.queEs : definicion,
    paraQueSirve: parsed.paraQueSirve.length
      ? parsed.paraQueSirve
      : [`🎯 Aplicar ${config.firma} en un negocio real.`],
    comoFunciona: parsed.comoFunciona.length
      ? parsed.comoFunciona
      : ["Se aplican fórmulas simples y se verifica el resultado."],
    errores: parsed.errores.length
      ? parsed.errores
      : ["⚠️ Revisa las unidades y el orden de los descuentos."],
    casos: parsed.casos.length
      ? parsed.casos
      : [`💼 Aplicar ${config.titulo} en un caso real.`],
    relacion: parsed.relacion.length
      ? parsed.relacion
      : ["🧩 Se combina con el resto de conceptos de aritmética."],
    analogia:
      parsed.analogia ||
      `Piensa en ${config.titulo} como una calculadora: cada operación tiene su fórmula y su verificación.`,
    notasPersonales: parsed.notasPersonales.length
      ? parsed.notasPersonales
      : undefined,
    extras: parsed.extras || [],
    fuente: parsed.fuente || "Apuntes personales · Notion",
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
/* 7. Lectura + generación                                             */
/* ------------------------------------------------------------------ */

// Recopilar todos los documentos una sola vez
const TODOS = [];
const vistos = new Set();
for (const archivo of [
  "Aritmética Comercial y Financiera.txt",
  "Aritmetica Fianaciera.txt",
]) {
  try {
    for (const doc of extraerDocs(archivo)) {
      const clave = norm(doc.titulo);
      if (vistos.has(clave)) continue;
      vistos.add(clave);
      TODOS.push(doc);
    }
  } catch (e) {
    console.warn(`⚠️  No se pudo leer "${archivo}": ${e.message}`);
  }
}

// 🔍 Debug: mostrar qué se encontró realmente
console.log("\n📂 Documentos detectados en los TXT:");
for (const d of TODOS) {
  console.log(`   · "${d.titulo}" (${d.cuerpo.length} chars)`);
}
if (!TODOS.length) {
  throw new Error(
    "No se encontró ningún documento en los TXT. " +
      "Verifica que 'Aritmética Comercial y Financiera.txt' y 'Aritmetica Fianaciera.txt' " +
      "existan en Apuntes/ y contengan secciones que empiecen con 📄",
  );
}

/* ------------------------------------------------------------------ */
/* 8. Filtrar configs por lo que existe (tolerante)                    */
/* ------------------------------------------------------------------ */

const buscarDoc = (config) => {
  const exacto = TODOS.find((d) => norm(d.titulo) === norm(config.titulo));
  if (exacto) return exacto;
  const parcial = TODOS.find((d) =>
    norm(d.titulo).startsWith(norm(config.titulo)),
  );
  return parcial || null;
};

const docs = [];
const omitidos = [];
for (const grupo of CATEGORIA.grupos) {
  for (const config of grupo.notas) {
    const nota = buscarDoc(config);
    if (!nota) {
      omitidos.push(config.titulo);
      continue;
    }
    const parsed = parsearDoc(nota.titulo, nota.cuerpo);
    docs.push(buildDoc(config, parsed));
  }
}

if (!docs.length) {
  throw new Error(
    "Ningún documento del config coincide con lo que hay en los TXT. " +
      "Revisa la lista de arriba y ajusta los títulos en CATEGORIA.grupos.",
  );
}

if (omitidos.length) {
  console.warn("\n⚠️  Omitidos (no encontrados en los TXT):");
  for (const o of omitidos) console.warn(`   · "${o}"`);
  console.warn(
    "\n💡 Si quieres que aparezcan, añade esas secciones 📄 a " +
      "'Aritmetica Fianaciera.txt' (o el archivo correspondiente) y vuelve a ejecutar.\n",
  );
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
