/**
 * Genera los apuntes de JavaScript Core (Object, Function, TypedArray)
 * y APIs del navegador (window.print) a partir de los HTML/TXT de Apuntes/.
 *
 * Uso:  node scripts/generate-js-core.mjs
 *
 * El script NO toca los originales: solo lee, extrae las secciones y
 * escribe los módulos de datos que consume la app.
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
/* 1. Estructura: categorías, grupos y notas                           */
/* ------------------------------------------------------------------ */

const CATEGORIAS = [
  {
    id: "js-object",
    label: "Object",
    icon: "📦",
    titulo: "Object: creación, clonación y control",
    descripcion:
      "Métodos estáticos y del prototipo para crear, copiar, enumerar, congelar y proteger objetos.",
    export: "JS_CORE_OBJECT",
    archivo: "jsCoreObject",
    simulador: "object",
    grupos: [
      {
        seccion: "Comparación y existencia",
        notas: [
          ["Object is()", "js-object-is", "Object.is(valor1, valor2)", "⚖️"],
          [
            "Object.hasOwn()",
            "js-object-hasown",
            "Object.hasOwn(obj, prop)",
            "✅",
          ],
          [
            "hasOwnProperty()",
            "js-hasownproperty",
            "obj.hasOwnProperty(prop)",
            "✅",
          ],
        ],
      },
      {
        seccion: "Creación y clonación",
        notas: [
          [
            "Object assign",
            "js-object-assign",
            "Object.assign(destino, ...fuentes)",
            "📋",
          ],
          [
            "Object create()",
            "js-object-create",
            "Object.create(proto, descriptores)",
            "🆕",
          ],
          ["new Object()", "js-new-object", "new Object(valor)", "🆕"],
        ],
      },
      {
        seccion: "Enumeración",
        notas: [
          ["Object keys()", "js-object-keys", "Object.keys(obj)", "🔑"],
          ["Object values()", "js-object-values", "Object.values(obj)", "📦"],
          [
            "Object entries()",
            "js-object-entries",
            "Object.entries(obj)",
            "📑",
          ],
          [
            "Object fromEntries()",
            "js-object-fromentries",
            "Object.fromEntries(iterable)",
            "🔄",
          ],
          [
            "Object groupBy()",
            "js-object-groupby",
            "Object.groupBy(iterable, fn)",
            "🗂️",
          ],
        ],
      },
      {
        seccion: "Bloqueo de objetos",
        notas: [
          ["Object freeze()", "js-object-freeze", "Object.freeze(obj)", "🧊"],
          ["Object seal()", "js-object-seal", "Object.seal(obj)", "🔒"],
          [
            "Object preventExtensions",
            "js-object-preventextensions",
            "Object.preventExtensions(obj)",
            "🛡️",
          ],
          [
            "Object isFrozen()",
            "js-object-isfrozen",
            "Object.isFrozen(obj)",
            "❄️",
          ],
          [
            "Object isSealed",
            "js-object-issealed",
            "Object.isSealed(obj)",
            "🛡️",
          ],
          [
            "Object isExtensible",
            "js-object-isextensible",
            "Object.isExtensible(obj)",
            "🪟",
          ],
        ],
      },
      {
        seccion: "Descriptores y prototipos",
        notas: [
          [
            "Object defineProperty()",
            "js-object-defineproperty",
            "Object.defineProperty(obj, prop, desc)",
            "⚙️",
          ],
          [
            "Object defineProperties",
            "js-object-defineproperties",
            "Object.defineProperties(obj, descs)",
            "⚙️",
          ],
          [
            "Object getOwnPropertyDescriptor",
            "js-object-getownpropertydescriptor",
            "Object.getOwnPropertyDescriptor(obj, prop)",
            "🔍",
          ],
          [
            "Object getPrototypeOf",
            "js-object-getprototypeof",
            "Object.getPrototypeOf(obj)",
            "🧬",
          ],
          [
            "Object setPrototypeOf",
            "js-object-setprototypeof",
            "Object.setPrototypeOf(obj, proto)",
            "🔗",
          ],
          [
            "Object prototype toString()",
            "js-object-tostring",
            "obj.toString()",
            "🪞",
          ],
          [
            "Object prototype valueOf()",
            "js-object-valueof",
            "obj.valueOf()",
            "🔓",
          ],
        ],
      },
    ],
  },
  {
    id: "js-function",
    label: "Function",
    icon: "📞",
    titulo: "Function: this y argumentos",
    descripcion:
      "Controla el valor de this y la forma de pasar argumentos al invocar funciones.",
    export: "JS_CORE_FUNCTION",
    archivo: "jsCoreFunction",
    simulador: "function",
    grupos: [
      {
        seccion: "Invocación con contexto",
        notas: [
          [
            "Function prototype call()",
            "js-function-call",
            "fn.call(thisArg, ...args)",
            "📞",
          ],
          [
            "Function prototype apply()",
            "js-function-apply",
            "fn.apply(thisArg, [args])",
            "📦",
          ],
          [
            "Function prototype bind()",
            "js-function-bind",
            "fn.bind(thisArg, ...args)",
            "😊",
          ],
        ],
      },
    ],
  },
  {
    id: "js-typedarray",
    label: "TypedArray",
    icon: "🔢",
    titulo: "TypedArray: buffers binarios",
    descripcion:
      "Trabaja con arrays tipados y bytes: Uint8Array, set() y from() para datos binarios.",
    export: "JS_CORE_TYPEDARRAY",
    archivo: "jsCoreTypedArray",
    simulador: "typedarray",
    grupos: [
      {
        seccion: "Manipulación de bytes",
        notas: [
          [
            "TypedArray prototype set()",
            "js-typedarray-set",
            "typedArray.set(source, offset)",
            "📥",
          ],
          [
            "Uint8Array from",
            "js-uint8array-from",
            "Uint8Array.from(arrayLike, mapFn)",
            "🔢",
          ],
        ],
      },
    ],
  },
  {
    id: "js-browser-apis",
    label: "Browser APIs",
    icon: "🪟",
    titulo: "APIs del navegador",
    descripcion:
      "Métodos nativos del navegador como window.print() para imprimir o guardar como PDF.",
    export: "JS_CORE_BROWSER",
    archivo: "jsCoreBrowser",
    simulador: "browser",
    grupos: [
      {
        seccion: "Impresión",
        notas: [
          ["window.print()", "js-window-print", "window.print()", "🖨️", "txt"],
        ],
      },
    ],
  },
];

/* Simulador específico por nota (opcional). */
const SIMULADOR_POR_NOTA = {
  "js-object-freeze": "object-freeze",
  "js-object-seal": "object-seal",
  "js-object-keys": "object-keys",
  "js-object-assign": "object-assign",
  "js-object-entries": "object-entries",
  "js-function-call": "function-call",
  "js-function-apply": "function-apply",
  "js-function-bind": "function-bind",
  "js-window-print": "print",
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

const limpiarEmoji = (value = "") =>
  value.replace(/^[^\p{L}\p{N}¿¡]+/u, "").trim();

const quitarBold = (value = "") => String(value).replace(/\*\*/g, "");

/* ------------------------------------------------------------------ */
/* 3. Búsqueda de HTML                                                 */
/* ------------------------------------------------------------------ */

function listarHtml(dir) {
  const salida = [];
  if (!fs.existsSync(dir)) return salida;
  for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
    const ruta = path.join(dir, entrada.name);
    if (entrada.isDirectory()) {
      if (entrada.name === "CSS") continue; // subcarpeta con su propio script
      salida.push(...listarHtml(ruta));
    } else if (entrada.name.endsWith(".html")) {
      salida.push(ruta);
    }
  }
  return salida;
}

const HTMLS = listarHtml(HTML_DIR);

function buscarHtml(prefix) {
  const normalizar = (s) => s.replace(/\./g, " ").replace(/\s+/g, " ").trim();
  const prefijoNorm = normalizar(prefix);

  const candidatos = HTMLS.filter((ruta) => {
    const base = normalizar(path.basename(ruta));
    return base.startsWith(`${prefijoNorm} `) || base.startsWith(`${prefix} `);
  });
  if (!candidatos.length) {
    throw new Error(
      `No se encontró HTML para "${prefix}". ` +
        `Asegúrate de que "${prefix} <id>.html" exista en Apuntes/.`,
    );
  }
  if (candidatos.length > 1) {
    console.warn(
      `⚠️  Múltiples HTML para "${prefix}", se usa: ${path.basename(candidatos[0])}`,
    );
  }
  return candidatos[0];
}

function buscarTxt(prefix) {
  const exacto = path.join(HTML_DIR, `${prefix}.txt`);
  if (fs.existsSync(exacto)) return exacto;
  const buscar = (dir) => {
    if (!fs.existsSync(dir)) return null;
    for (const entrada of fs.readdirSync(dir, { withFileTypes: true })) {
      const ruta = path.join(dir, entrada.name);
      if (entrada.isDirectory()) {
        const f = buscar(ruta);
        if (f) return f;
      } else if (entrada.name === `${prefix}.txt`) {
        return ruta;
      }
    }
    return null;
  };
  const f = buscar(HTML_DIR);
  if (!f) throw new Error(`No se encontró "${prefix}.txt" en Apuntes/`);
  return f;
}

/* ------------------------------------------------------------------ */
/* 4. Parser de TXT (para window.print)                                */
/* ------------------------------------------------------------------ */

const HEADER_TXT =
  /^(📝|🧠|🎯|⚙️|⚠️|💼|🧩|📚|📊|💡|🔄|🛠️|📋|📌|🔍|🧾|🔑|📎|🖨️)\s+(.+)$/u;

const CAMPOS_TXT = [
  [/definici[oó]n/i, "definicion"],
  [/qu[eé] es/i, "queEs"],
  [/para qu[eé] sirve/i, "paraQueSirve"],
  [/c[oó]mo funciona/i, "comoFunciona"],
  [/errores|advertencias/i, "errores"],
  [/casos de uso/i, "casos"],
  [/relaci[oó]n con otros/i, "relacion"],
  [/analog[ií]a/i, "analogia"],
  [/fuente/i, "fuente"],
  [/notas personales/i, "notasPersonales"],
];

function parsearTxt(titulo, cuerpo) {
  const lineas = cuerpo.split(/\r?\n/);
  const secciones = [];
  let actual = { key: "intro", label: "", textos: [] };
  secciones.push(actual);

  for (const linea of lineas) {
    const limpia = linea.trim();
    const header = limpia.match(HEADER_TXT);
    if (header && limpia.length <= 120) {
      const label = header[2].trim();
      const campo = CAMPOS_TXT.find(([regex]) => regex.test(label));
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
    } else {
      doc[s.key] = texto
        .split(/\n\s*\n/)
        .map((t) => t.replace(/\s+/g, " ").trim())
        .filter(Boolean);
    }
  }

  doc.rawTitle = titulo;
  return doc;
}

/* ------------------------------------------------------------------ */
/* 5. Construcción del documento                                       */
/* ------------------------------------------------------------------ */

function buildDoc(nota, categoria) {
  const [prefix, id, firma, icon, formato = "html"] = nota;
  let parsed;

  if (formato === "txt") {
    const ruta = buscarTxt(prefix);
    const contenido = fs.readFileSync(ruta, "utf8").replace(/\uFEFF/g, "");
    const trozos = contenido.split(/^📄\s*/m).filter((t) => t.trim());
    const trozo = trozos[0] || contenido;
    const [primera, ...resto] = trozo.split(/\r?\n/);
    parsed = parsearTxt(primera.trim(), resto.join("\n"));
    parsed.icon = icon;
    parsed.sintaxis = [];
    parsed.nota = "";
    parsed.ejemplos = [];
  } else {
    const ruta = buscarHtml(prefix);
    const html = fs.readFileSync(ruta, "utf8");
    parsed = parseNote(html);
  }

  const title = limpiarEmoji(parsed.rawTitle || prefix);
  const definicion = parsed.definicion.length
    ? parsed.definicion
    : parsed.introText?.length
      ? parsed.introText
      : [`**${title}** es un método del lenguaje JavaScript.`];

  return {
    id,
    titulo: title,
    icon: parsed.icon && parsed.icon !== "📄" ? parsed.icon : icon,
    categoria: categoria.label,
    firma,
    simulador: SIMULADOR_POR_NOTA[id] ?? categoria.simulador,

    definicion,
    queEs: parsed.queEs.length ? parsed.queEs : definicion,
    paraQueSirve: parsed.paraQueSirve.length
      ? parsed.paraQueSirve
      : [`🎯 Aplicar \`${firma}\` en el código.`],
    comoFunciona: parsed.comoFunciona.length
      ? parsed.comoFunciona
      : ["Se invoca desde JavaScript.", "Devuelve un valor que puedes usar."],
    sintaxis: parsed.sintaxis?.length ? parsed.sintaxis : [{ code: firma }],
    nota: parsed.nota || undefined,
    ejemplos: parsed.ejemplos?.length
      ? parsed.ejemplos
      : [{ titulo: "Ejemplo básico", code: firma }],
    errores: parsed.errores?.length
      ? parsed.errores
      : ["⚠️ Verifica el tipo de los argumentos."],
    casos: parsed.casos?.length
      ? parsed.casos
      : [`💼 Usar \`${title}\` en un proyecto real.`],
    relacion: parsed.relacion?.length
      ? parsed.relacion
      : ["🧩 Se combina con el resto del lenguaje."],
    analogia:
      parsed.analogia ||
      `Piensa en ${title} como una herramienta precisa: hace exactamente una cosa y la hace bien.`,
    fuente: parsed.fuente || "MDN Web Docs · JavaScript",
    notasPersonales: parsed.notasPersonales?.length
      ? parsed.notasPersonales
      : undefined,
    extras: parsed.extras || [],
  };
}

/* ------------------------------------------------------------------ */
/* 6. Laboratorio (completar + emparejar + paso a paso)                */
/* ------------------------------------------------------------------ */

const XP = { facil: 60, medio: 90, dificil: 120 };

/* Convierte cualquier cosa a string legible */
const aTexto = (v) => {
  if (v == null) return "";
  if (typeof v === "string") return v;
  if (typeof v === "object") {
    if (typeof v.texto === "string") return v.texto;
    if (typeof v.code === "string") return v.code;
    try {
      return JSON.stringify(v);
    } catch {
      return "";
    }
  }
  return String(v);
};

function extraerPares(doc) {
  const pares = [];
  const vistos = new Set();
  const fuentes = [
    ...(doc.paraQueSirve ?? []),
    ...(doc.relacion ?? []),
    ...(doc.casos ?? []),
    ...(doc.errores ?? []),
  ];

  for (const item of fuentes) {
    const limpio = quitarBold(aTexto(item)).trim();
    if (!limpio || limpio.startsWith("```")) continue;
    const m = limpio.match(/^([^:]{3,60}):\s+(.{15,180})$/u);
    if (!m) continue;
    const concepto = m[1].trim();
    const descripcion = clip(m[2].trim(), 160);
    if (vistos.has(norm(concepto))) continue;
    vistos.add(norm(concepto));
    pares.push({ concepto, descripcion });
    if (pares.length >= 6) break;
  }

  if (pares.length < 4) {
    const fallback = [
      ["¿Qué es?", (doc.queEs ?? [])[0] || (doc.definicion ?? [])[0] || ""],
      ["¿Para qué sirve?", (doc.paraQueSirve ?? [])[0] || ""],
      ["¿Cómo funciona?", (doc.comoFunciona ?? [])[0] || ""],
      ["Error común", (doc.errores ?? [])[0] || ""],
      ["Caso de uso", (doc.casos ?? [])[0] || ""],
    ];
    for (const [concepto, raw] of fallback) {
      const descripcion = aTexto(raw);
      if (!descripcion || descripcion.startsWith("```")) continue;
      const desc = clip(quitarBold(descripcion), 170);
      if (desc.length < 20) continue;
      if (vistos.has(norm(concepto))) continue;
      vistos.add(norm(concepto));
      pares.push({ concepto, descripcion: desc });
      if (pares.length >= 5) break;
    }
  }

  return pares.slice(0, 6);
}

const primerNegrita = (texto = "") => {
  const t = aTexto(texto);
  const m = t.match(/\*\*([^*]{2,40})\*\*/);
  return m ? m[1].trim() : "";
};

function misionCompletar(doc, hermanos) {
  const conNegrita = (doc.definicion ?? [])
    .map((t) => aTexto(t))
    .find((t) => /\*\*([^*]{2,40})\*\*/.test(t));
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
  if (doc.ejemplos?.length) {
    return doc.ejemplos.map((ej, i) => ({
      paso: i + 1,
      titulo: aTexto(ej.titulo) || `Paso ${i + 1}`,
      explicacion: aTexto(ej.descripcion),
      codigo: aTexto(ej.code),
      salida: "",
    }));
  }
  const pasos = [];
  for (const extra of doc.extras ?? []) {
    let actual = null;
    for (const parrafo of extra.textos ?? []) {
      for (const linea of aTexto(parrafo).split("\n")) {
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
/* 7. Serialización                                                    */
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
/* 8. Generación                                                       */
/* ------------------------------------------------------------------ */

const modulos = CATEGORIAS.map((categoria) => {
  const docs = [];
  for (const grupo of categoria.grupos) {
    for (const nota of grupo.notas) docs.push(buildDoc(nota, categoria));
  }

  for (const doc of docs) {
    doc.quiz = buildQuiz(doc, docs);
    doc.lab = construirLab(doc, docs);
  }

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
      metodos: grupo.notas.map(([, id, firma, icon]) => {
        const doc = docsById[id];
        return { id, nombre: doc.titulo, firma, icon: doc.icon || icon };
      }),
    })),
  };

  const content = `/* Generado desde Apuntes/ — JS Core.
   Regenerar con: node scripts/generate-js-core.mjs */

export const ${categoria.export} = ${serialize(meta)};

export const ${categoria.export}_DOCS = ${serialize(docsById)};
`;

  fs.writeFileSync(
    path.join(DATA_DIR, `${categoria.archivo}.js`),
    content,
    "utf8",
  );

  return { categoria, count: docs.length };
});

/* ------------------------------------------------------------------ */
/* 9. Reporte                                                          */
/* ------------------------------------------------------------------ */

console.log("✅ JS Core generado:\n");
for (const m of modulos) {
  console.log(
    `- ${m.categoria.label}: ${m.count} notas → ${m.categoria.export}`,
  );
}
