/**
 * Genera la "Biblioteca de Negocios" a partir de los TXT de `Apuntes/`.
 *
 * Uso: node scripts/generate-negocios-txt.mjs
 *
 * El script lee los TXT exportados de Notion, extrae las secciones y escribe
 * `src/data/negocioBiblioteca.js`. No modifica los TXT originales.
 *
 * Los TXT de Aritmética y `window.print()` se excluyen: ya viven en sus
 * propios cursos.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const TXT_DIR = path.join(ROOT, "Apuntes");
const SALIDA = path.join(ROOT, "src", "data", "negocioBiblioteca.js");

/* ------------------------------------------------------------------ */
/* 1. Mapa de archivos → apuntes                                       */
/* ------------------------------------------------------------------ */

const MAPA = {
  "Agilidad Empresarial (Business Agility).txt": {
    id: "agilidad-empresarial",
    icon: "⚡",
    seccion: "Estrategia y crecimiento",
    firma: "Adaptarse rápido al cambio sin perder el rumbo",
  },
  "Análisis SEPTE (Social, Económico, Político, Tecnológico, Ecológico).txt": {
    id: "septe",
    icon: "🌍",
    seccion: "Estrategia y crecimiento",
    firma: "Entorno macro: social, económico, político, tecnológico y ecológico",
  },
  "Blitzscaling (Escalado Relámpago).txt": {
    id: "blitzscaling",
    icon: "🚀",
    seccion: "Estrategia y crecimiento",
    firma: "Crecer a toda velocidad antes que la competencia",
  },
  "Efectos de Red (Network Effects).txt": {
    id: "efectos-red",
    icon: "🕸️",
    seccion: "Estrategia y crecimiento",
    firma: "Cada usuario nuevo aumenta el valor para todos",
  },
  "Modelo de Negocio Basado en la Nube (Cloud-Enabled  Cloud-First Business Model).txt":
    {
      id: "modelo-cloud",
      icon: "☁️",
      seccion: "Estrategia y crecimiento",
      firma: "Infraestructura y servicios en la nube como base del negocio",
    },
  "Justo a Tiempo (JIT - Just In Time).txt": {
    id: "jit",
    icon: "⏱️",
    seccion: "Operaciones y flujo",
    firma: "Producir lo necesario, cuando se necesita",
  },
  "Kanban.txt": {
    id: "kanban",
    icon: "🗂️",
    seccion: "Operaciones y flujo",
    firma: "Visualizar el flujo y limitar el trabajo en curso",
  },
  "Teoría de Restricciones (TOC - Theory of Constraints).txt": {
    id: "toc",
    icon: "⛓️",
    seccion: "Operaciones y flujo",
    firma: "Identificar y explotar la restricción del sistema",
  },
  "Value Stream Mapping (VSM) - Mapeo de la Cadena de Valor.txt": {
    id: "vsm",
    icon: "🗺️",
    seccion: "Operaciones y flujo",
    firma: "Mapear el flujo de valor y sus desperdicios",
  },
  "📄 Cuello de Botella (Bottleneck).txt": {
    id: "cuello-botella",
    icon: "🍾",
    seccion: "Operaciones y flujo",
    firma: "La restricción que limita todo el sistema",
  },
  "Sistema POS (Point of Sale  Punto de Venta).txt": {
    id: "sistema-pos",
    icon: "🧾",
    seccion: "Operaciones y flujo",
    firma: "Punto de venta: cobro, inventario y datos",
  },
  "Data-Driven Organization (Organización Basada en Datos).txt": {
    id: "data-driven",
    icon: "📊",
    seccion: "Datos, clientes y sistemas",
    firma: "Decisiones basadas en datos, no en intuiciones",
  },
  "Gestión de las Relaciones con los Clientes (CRM).txt": {
    id: "crm",
    icon: "🤝",
    seccion: "Datos, clientes y sistemas",
    firma: "Gestionar la relación con el cliente en todo su ciclo",
  },
  "Planificación de Recursos Empresariales (ERP).txt": {
    id: "erp",
    icon: "🏭",
    seccion: "Datos, clientes y sistemas",
    firma: "Integrar los procesos del negocio en un solo sistema",
  },
  "Documentos Comerciales.txt": {
    id: "documentos-comerciales",
    icon: "📄",
    seccion: "Datos, clientes y sistemas",
    firma: "Prueba, registro y control de las transacciones",
    soloTitulo: "Documentos Comerciales",
  },
  "Responsabilidad Digital Corporativa (CDR).txt": {
    id: "cdr",
    icon: "🛡️",
    seccion: "Ética y responsabilidad digital",
    firma: "Ética y responsabilidad en el entorno digital",
  },
};

const GRUPOS = [
  "Estrategia y crecimiento",
  "Operaciones y flujo",
  "Datos, clientes y sistemas",
  "Ética y responsabilidad digital",
];

/* ------------------------------------------------------------------ */
/* 2. Utilidades                                                       */
/* ------------------------------------------------------------------ */

const HEADER = /^(📝|🧠|🎯|⚙️|⚠️|💼|🧩|📚|📊|📈|📉|💡|🔄|🛠️|📋|📌|🔍|🧾|📎|🗂️|🚀|🌱|🏁|📐|🧮|🎓|📦|✅|❌|🔑|🏆)\s+(.+)$/u;

const CAMPOS = [
  [/definici[oó]n/i, "definicion"],
  [/qu[eé] es/i, "queEs"],
  [/para qu[eé] sirve/i, "paraQueSirve"],
  [/c[oó]mo funciona|c[oó]mo se clasifican/i, "comoFunciona"],
  [/errores|desaf[ií]os|riesgos|advertencias|cr[ií]ticas/i, "errores"],
  [/casos de uso/i, "casos"],
  [/relaci[oó]n con otros/i, "relacion"],
  [/analog[ií]a/i, "analogia"],
  [/fuente/i, "fuente"],
  [/notas personales/i, "notasPersonales"],
];

const norm = (value = "") =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const limpiarEmoji = (value = "") =>
  value.replace(/^[^\p{L}\p{N}¿¡]+/u, "").trim();

const clip = (value = "", max = 160) => {
  const texto = String(value).replace(/\s+/g, " ").trim();
  if (texto.length <= max) return texto;
  const corte = texto.lastIndexOf(" ", max);
  return `${texto.slice(0, corte > max * 0.6 ? corte : max).trim()}…`;
};

const quitarBold = (value = "") => String(value).replace(/\*\*/g, "");

const escaparRegex = (value) =>
  value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const capitalizar = (value = "") =>
  value.charAt(0).toUpperCase() + value.slice(1);

const esFilaTabla = (lineas) =>
  lineas.filter((linea) => linea.includes("\t")).length >= 2;

const esArte = (lineas) =>
  lineas.some((linea) => /[┌┐└┘├┤┬┴┼│─]/.test(linea));

const LENGUAJES = /^(text|javascript|jsx|bash|json|html|css|sql|python)$/i;

const esBloqueCodigo = (lineas) =>
  lineas.some((linea) => LENGUAJES.test(linea.trim())) && lineas.length > 1;

/** Separa el arte ASCII del texto que lo rodea dentro de un mismo bloque. */
function extraerBloque(bloque) {
  const idxArte = bloque.findIndex((linea) => /[┌┐└┘├┤┬┴┼│─]/.test(linea));

  if (idxArte >= 0) {
    let fin = idxArte;
    while (fin < bloque.length) {
      const linea = bloque[fin];
      if (linea.trim() === "" || /[┌┐└┘├┤┬┴┼│─]/.test(linea)) {
        fin += 1;
        continue;
      }
      break;
    }
    return {
      antes: bloque.slice(0, idxArte).filter((l) => !LENGUAJES.test(l.trim())),
      code: bloque.slice(idxArte, fin).join("\n"),
      despues: bloque.slice(fin),
    };
  }

  const idxLenguaje = bloque.findIndex((linea) => LENGUAJES.test(linea.trim()));
  if (idxLenguaje >= 0) {
    return {
      antes: bloque.slice(0, idxLenguaje),
      code: bloque.slice(idxLenguaje + 1).join("\n"),
      despues: [],
    };
  }

  return { antes: [], code: bloque.join("\n"), despues: [] };
}

/** Convierte una tabla TSV en texto alineado dentro de un bloque de código. */
function tablaATexto(lineas) {
  const filas = lineas.map((linea) =>
    linea.split("\t").map((celda) => celda.trim()),
  );
  const columnas = Math.max(...filas.map((fila) => fila.length));
  const anchos = Array.from({ length: columnas }, (_, i) =>
    Math.max(...filas.map((fila) => (fila[i] ?? "").length)),
  );
  const cuerpo = filas
    .map((fila) =>
      fila.map((celda, i) => celda.padEnd(anchos[i])).join("  "),
    )
    .join("\n");
  return `\`\`\`\n${cuerpo}\n\`\`\``;
}

/** Añade negritas a los pares "Concepto: descripción". */
function embellecer(texto) {
  const limpio = texto.replace(/\s+/g, " ").trim();
  if (!limpio) return "";
  const par = limpio.match(/^([^:]{2,70}):\s+(.+)$/u);
  if (par && !/https?:/i.test(par[1]) && !par[1].includes("**")) {
    return `**${par[1].trim()}**: ${par[2].trim()}`;
  }
  return limpio;
}

/** Convierte el cuerpo de una sección en los items que consume NegocioDoc. */
function itemsDeSeccion(cuerpo) {
  const bloques = cuerpo
    .split(/\n\s*\n/)
    .map((bloque) => bloque.split("\n").filter((linea) => linea.trim()))
    .filter((bloque) => bloque.length);

  const items = [];

  for (const bloque of bloques) {
    if (esFilaTabla(bloque)) {
      items.push(tablaATexto(bloque));
      continue;
    }
    if (esArte(bloque) || esBloqueCodigo(bloque)) {
      const { antes, code, despues } = extraerBloque(bloque);
      for (const linea of antes) {
        const texto = embellecer(linea.trim());
        if (texto) items.push(texto);
      }
      if (code.trim()) items.push(`\`\`\`\n${code}\n\`\`\``);
      for (const linea of despues) {
        const texto = embellecer(linea.trim());
        if (texto) items.push(texto);
      }
      continue;
    }

    // Un párrafo partido en varias líneas se une; las listas se conservan.
    const pareceLista = bloque.every(
      (linea) =>
        /^([-•*]|\d+[.)]|\d\uFE0F?\u20E3|\p{Extended_Pictographic})/u.test(
          linea.trim(),
        ),
    );

    if (bloque.length > 1 && !pareceLista) {
      items.push(embellecer(bloque.join(" ")));
    } else {
      for (const linea of bloque) {
        const texto = embellecer(linea.trim());
        if (texto) items.push(texto);
      }
    }
  }

  return items;
}

/* ------------------------------------------------------------------ */
/* 3. Lector de secciones                                              */
/* ------------------------------------------------------------------ */

function parsearDocumento(titulo, cuerpo) {
  const lineas = cuerpo.split(/\r?\n/);
  const secciones = [];
  let actual = { key: "intro", label: "Introducción", textos: [] };

  for (const linea of lineas) {
    const limpia = linea.trim();
    const header = limpia.match(HEADER);

    if (header && !linea.includes("\t") && limpia.length <= 150) {
      const label = header[2].trim();
      const campo = CAMPOS.find(([regex]) => regex.test(label));
      secciones.push(actual);
      actual = {
        key: campo ? campo[1] : "extra",
        label: campo ? label : `${header[1]} ${label}`,
        textos: [],
      };
      continue;
    }

    actual.textos.push(linea);
  }
  secciones.push(actual);

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

  for (const seccion of secciones) {
    const texto = seccion.textos.join("\n").trim();
    if (!texto) continue;

    if (seccion.key === "extra") {
      const textos = itemsDeSeccion(texto);
      if (textos.length) {
        doc.extras.push({ seccion: seccion.label, textos });
      }
      continue;
    }

    if (seccion.key === "analogia" || seccion.key === "fuente") {
      const textos = itemsDeSeccion(texto);
      doc[seccion.key] = textos.join(" ").replace(/\*\*/g, "");
      continue;
    }

    doc[seccion.key] = itemsDeSeccion(texto);
  }

  doc.titulo = limpiarEmoji(titulo);
  return doc;
}

/* ------------------------------------------------------------------ */
/* 4. Preguntas y misiones                                            */
/* ------------------------------------------------------------------ */

function mezclar(array, semilla) {
  let estado = 0;
  for (const ch of semilla) estado = (estado * 31 + ch.charCodeAt(0)) % 2147483647;
  const random = () => {
    estado = (estado * 48271) % 2147483647;
    return estado / 2147483647;
  };
  const copia = [...array];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

function pregunta(id, n, prompt, correcta, distractores) {
  const opciones = [correcta, ...distractores]
    .map((opcion) => clip(quitarBold(opcion), 150))
    .filter(Boolean);
  const unicas = [...new Set(opciones)];
  for (const relleno of ["Ninguna de las anteriores", "Todas las anteriores"]) {
    if (unicas.length >= 4) break;
    if (!unicas.includes(relleno)) unicas.push(relleno);
  }
  const cuatro = unicas.slice(0, 4);
  const barajadas = mezclar(cuatro, `${id}-${n}`);
  return {
    id: n,
    pregunta: prompt,
    opciones: barajadas,
    correcta: barajadas.indexOf(clip(quitarBold(correcta), 150)),
  };
}

function primera(doc, campo) {
  const valor = doc[campo];
  return Array.isArray(valor) ? valor.find(Boolean) ?? "" : valor;
}

/** Convierte una tabla en bloque de código a una respuesta legible. */
function textoPlano(item) {
  if (typeof item !== "string") return "";
  if (!item.startsWith("```")) return item;

  const lineas = item
    .replace(/```/g, "")
    .split("\n")
    .map((linea) => linea.trim())
    .filter(Boolean);

  const fila =
    lineas.find((linea, i) => i > 0 && !/^[-=]+$/.test(linea)) ??
    lineas[0] ??
    "";
  const celdas = fila
    .split(/\s{2,}/)
    .map((celda) => celda.trim())
    .filter(Boolean);

  if (celdas.length >= 2) return `${celdas[0]}: ${celdas.slice(1).join(" · ")}`;
  return celdas[0] ?? "";
}

function primeraLegible(doc, campo) {
  const valor = doc[campo];
  const lista = Array.isArray(valor) ? valor : [valor];
  for (const item of lista) {
    const texto = textoPlano(item);
    if (texto && texto.length >= 12) return texto;
  }
  return "";
}

function construirQuiz(doc, hermanos) {
  const otros = hermanos.filter((otro) => otro.id !== doc.id);
  const distractores = (campo) =>
    otros
      .map((otro) => primeraLegible(otro, campo))
      .filter(Boolean)
      .slice(0, 3);

  const preguntas = [];

  const queEs = primeraLegible(doc, "queEs") || primeraLegible(doc, "definicion");
  if (queEs) {
    preguntas.push(
      pregunta(
        doc.id,
        1,
        `Según tus apuntes, ¿qué describe mejor ${doc.titulo}?`,
        queEs,
        distractores("queEs"),
      ),
    );
  }

  const paraQue = primeraLegible(doc, "paraQueSirve");
  if (paraQue) {
    preguntas.push(
      pregunta(
        doc.id,
        2,
        `¿Para qué sirve ${doc.titulo}?`,
        paraQue,
        distractores("paraQueSirve"),
      ),
    );
  }

  const error = primeraLegible(doc, "errores") || primeraLegible(doc, "casos");
  if (error) {
    preguntas.push(
      pregunta(
        doc.id,
        3,
        `¿Cuál de estas afirmaciones corresponde a ${doc.titulo}?`,
        error,
        distractores("errores").length >= 3
          ? distractores("errores")
          : distractores("casos"),
      ),
    );
  }

  return preguntas.slice(0, 3);
}

function terminoPrincipal(doc) {
  const texto = (doc.definicion ?? []).join(" ");
  const match = texto.match(/\*\*(.+?)\*\*/);
  return match ? match[1].trim() : doc.titulo;
}

function construirCompletar(doc, hermanos) {
  const termino = terminoPrincipal(doc);
  const definicion = quitarBold(primera(doc, "definicion") ?? "");
  const fraseBase = definicion || `${termino} es un concepto clave de negocios.`;

  let frase = fraseBase.replace(
    new RegExp(escaparRegex(termino), "i"),
    "__________",
  );
  if (!frase.includes("__________")) {
    frase = `El concepto conocido como __________ se define así: ${fraseBase}`;
  }

  const distractores = hermanos
    .filter((otro) => otro.id !== doc.id)
    .map((otro) => terminoPrincipal(otro))
    .filter((valor) => valor && valor !== termino);
  const opciones = [
    ...new Set([termino, ...distractores, "Ninguno de los anteriores"]),
  ].slice(0, 4);
  if (!opciones.includes(termino)) opciones[0] = termino;

  return {
    id: `${doc.id}-completar`,
    tipo: "completar",
    titulo: "Completa la definición",
    dificultad: "Fácil",
    xp: 60,
    pista: `El término empieza por «${termino.charAt(0)}» y es el protagonista del apunte.`,
    solucion: `${termino}: ${clip(definicion, 220)}`,
    frase,
    opciones,
    correcto: termino,
  };
}

function extraerPares(doc) {
  const pares = [];
  const vistos = new Set();

  const candidatos = [
    ...(doc.paraQueSirve ?? []),
    ...(doc.relacion ?? []),
    ...(doc.errores ?? []),
    ...(doc.casos ?? []),
    ...(doc.comoFunciona ?? []),
  ];

  for (const item of candidatos) {
    if (typeof item !== "string" || item.startsWith("```")) continue;
    const limpio = quitarBold(item).trim();
    const match = limpio.match(/^([^:]{3,60}):\s+(.{15,180})$/u);
    if (!match) continue;
    const concepto = match[1].trim();
    const descripcion = match[2].trim();
    if (vistos.has(norm(concepto))) continue;
    vistos.add(norm(concepto));
    pares.push({ concepto, descripcion });
    if (pares.length >= 6) break;
  }

  if (pares.length < 3) {
    const respaldo = [
      ["¿Qué es?", primeraLegible(doc, "queEs") || primeraLegible(doc, "definicion")],
      ["¿Para qué sirve?", primeraLegible(doc, "paraQueSirve")],
      ["¿Cómo funciona?", primeraLegible(doc, "comoFunciona")],
      ["Error común", primeraLegible(doc, "errores")],
      ["Caso de uso", primeraLegible(doc, "casos")],
    ];
    for (const [concepto, descripcion] of respaldo) {
      if (!descripcion || descripcion.startsWith("```")) continue;
      if (vistos.has(norm(concepto))) continue;
      vistos.add(norm(concepto));
      pares.push({ concepto, descripcion: clip(quitarBold(descripcion), 170) });
      if (pares.length >= 4) break;
    }
  }

  return pares.slice(0, 5);
}

function construirEmparejar(doc) {
  const pares = extraerPares(doc);
  return {
    id: `${doc.id}-emparejar`,
    tipo: "emparejar",
    titulo: "Une cada concepto con su descripción",
    dificultad: "Medio",
    xp: 90,
    pista: "Lee primero las descripciones y busca la palabra clave que las conecta con cada concepto.",
    solucion: pares
      .map((par) => `${par.concepto}: ${par.descripcion}`)
      .join(" · "),
    pares,
  };
}

/* ------------------------------------------------------------------ */
/* 5. Construcción y escritura                                        */
/* ------------------------------------------------------------------ */

const documentos = [];
const faltantes = [];

for (const [archivo, config] of Object.entries(MAPA)) {
  const ruta = path.join(TXT_DIR, archivo);
  if (!fs.existsSync(ruta)) {
    faltantes.push(archivo);
    continue;
  }

  const texto = fs.readFileSync(ruta, "utf8").replace(/\uFEFF/g, "");
  const trozos = texto.split(/^📄\s*/m).filter((trozo) => trozo.trim());

  for (const trozo of trozos) {
    const [primeraLinea, ...resto] = trozo.split(/\r?\n/);
    const titulo = primeraLinea.trim();
    if (config.soloTitulo && titulo !== config.soloTitulo) continue;

    const doc = parsearDocumento(titulo, resto.join("\n"));
    doc.id = config.id;
    doc.icon = config.icon;
    doc.curso = "biblioteca-negocios";
    doc.cursoLabel = "Biblioteca de Negocios";
    doc.categoria = "Administración y Negocios";
    doc.resumen =
      clip(quitarBold(primera(doc, "definicion") || primera(doc, "queEs")), 190) ||
      config.firma;
    doc.firma = config.firma;
    doc.seccion = config.seccion;
    documentos.push(doc);
    break;
  }
}

if (faltantes.length) {
  console.warn("⚠️ No se encontraron estos TXT:", faltantes);
}

const porTitulo = new Map(documentos.map((doc) => [doc.id, doc]));

for (const doc of documentos) {
  doc.quiz = construirQuiz(doc, documentos);
  doc.lab = {
    misiones: [construirCompletar(doc, documentos), construirEmparejar(doc)],
  };
}

const ordenados = GRUPOS.flatMap((seccion) =>
  documentos.filter((doc) => doc.seccion === seccion),
);

const curso = {
  id: "biblioteca-negocios",
  label: "Biblioteca de Negocios",
  icon: "📚",
  nivel: "Intermedio",
  titulo: "Biblioteca de Negocios",
  descripcion:
    "Temas complementarios de estrategia, operaciones, datos y responsabilidad digital para ampliar tu criterio empresarial.",
  grupos: GRUPOS.map((seccion) => ({
    seccion,
    metodos: ordenados
      .filter((doc) => doc.seccion === seccion)
      .map((doc) => ({
        id: doc.id,
        nombre: doc.titulo,
        firma: doc.firma,
        icon: doc.icon,
        lab: doc.lab.misiones.length,
      })),
  })),
};

const docs = Object.fromEntries(
  ordenados.map((doc) => {
    const {
      seccion,
      firma,
      ...resto
    } = doc;
    return [doc.id, resto];
  }),
);

const cabecera = `/* Biblioteca de Negocios.
   Generado por scripts/generate-negocios-txt.mjs a partir de los TXT
   de \`Apuntes/\`. No editar a mano: vuelve a ejecutar el script. */\n\n`;

fs.writeFileSync(
  SALIDA,
  `${cabecera}export const NEGOCIO_BIBLIOTECA = ${JSON.stringify(curso, null, 2)};\n\nexport const NEGOCIO_BIBLIOTECA_DOCS = ${JSON.stringify(docs, null, 2)};\n`,
  "utf8",
);

/* ------------------------------------------------------------------ */
/* 6. Informe                                                          */
/* ------------------------------------------------------------------ */

const resumen = documentos.map((doc) => ({
  id: doc.id,
  titulo: doc.titulo,
  seccion: doc.seccion,
  definicion: doc.definicion.length,
  queEs: doc.queEs.length,
  paraQueSirve: doc.paraQueSirve.length,
  comoFunciona: doc.comoFunciona.length,
  errores: doc.errores.length,
  casos: doc.casos.length,
  relacion: doc.relacion.length,
  extras: doc.extras.length,
  quiz: doc.quiz.length,
  misiones: doc.lab.misiones.length,
  pares: doc.lab.misiones[1].pares.length,
}));

console.log(
  JSON.stringify(
    {
      documentos: documentos.length,
      grupos: curso.grupos.map((grupo) => ({
        seccion: grupo.seccion,
        apuntes: grupo.metodos.length,
      })),
      resumen,
    },
    null,
    2,
  ),
);
