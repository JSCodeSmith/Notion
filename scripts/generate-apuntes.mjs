/**
 * Genera los apuntes de DOM / APIs del navegador a partir de los HTML
 * exportados de Notion que viven en src/ApuntesFormatoHtml.
 *
 * Uso:  node scripts/generate-apuntes.mjs
 *
 * El script NO toca los HTML: solo lee, extrae las secciones y escribe
 * los módulos de datos que consume la app.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const HTML_DIR = path.join(ROOT, "src", "ApuntesFormatoHtml");
const DATA_DIR = path.join(ROOT, "src", "data");

/* ------------------------------------------------------------------ */
/* 1. Estructura: categorías, notas, firmas y simulador                */
/* ------------------------------------------------------------------ */

const CATEGORIAS = [
  {
    id: "dom-seleccion",
    label: "DOM · Selección",
    icon: "🔎",
    titulo: "Selección de elementos del DOM",
    descripcion:
      "Encuentra nodos y elementos en el documento con getElementById, querySelector y las colecciones HTML.",
    export: "JS_DOM_SELECCION",
    simulador: "dom",
    grupos: [
      {
        seccion: "Selección de elementos",
        notas: [
          ["getElementById", "dom-getelementbyid", "document.getElementById(id)", "🎯"],
          ["getElementsByClassName", "dom-getelementsbyclassname", "document.getElementsByClassName(clases)", "🧺"],
          ["getElementsByTagName", "dom-getelementsbytagname", "document.getElementsByTagName(etiqueta)", "🏷️"],
          ["querySelector", "dom-queryselector", "document.querySelector(selector)", "🔍"],
          ["querySelectorAll", "dom-queryselectorall", "document.querySelectorAll(selector)", "🗂️"],
        ],
      },
    ],
  },
  {
    id: "dom-creacion",
    label: "DOM · Creación",
    icon: "🧱",
    titulo: "Crear, insertar y eliminar elementos",
    descripcion:
      "Construye nodos desde cero y colócalos (o quítalos) en el árbol del documento sin romper el resto.",
    export: "JS_DOM_CREACION",
    simulador: "dom",
    grupos: [
      {
        seccion: "Crear nodos",
        notas: [
          ["createElement", "dom-createelement", "document.createElement(tagName)", "🏗️"],
          ["createTextNode()", "dom-createtextnode", "document.createTextNode(texto)", "✍️"],
        ],
      },
      {
        seccion: "Insertar y reemplazar",
        notas: [
          ["append()", "dom-append", "elemento.append(...nodosOTexto)", "➕"],
          ["appendChild", "dom-appendchild", "elemento.appendChild(nodo)", "📎"],
          ["insertBefore", "dom-insertbefore", "elemento.insertBefore(nodo, referencia)", "↪️"],
          ["replaceChildren", "dom-replacechildren", "elemento.replaceChildren(...nodos)", "🔄"],
          ["replaceWith()", "dom-replacewith", "elemento.replaceWith(...nodos)", "🔁"],
        ],
      },
      {
        seccion: "Eliminar",
        notas: [
          ["remove()", "dom-remove", "elemento.remove()", "🗑️"],
          ["removeChild", "dom-removechild", "elemento.removeChild(hijo)", "✂️"],
        ],
      },
    ],
  },
  {
    id: "dom-atributos",
    label: "DOM · Contenido",
    icon: "🏷️",
    titulo: "Atributos, clases y contenido",
    descripcion:
      "Lee y modifica atributos, clases, HTML y texto de los elementos: el corazón de la manipulación del DOM.",
    export: "JS_DOM_ATRIBUTOS",
    simulador: "dom",
    grupos: [
      {
        seccion: "Atributos y clases",
        notas: [
          ["getAttribute", "dom-getattribute", "elemento.getAttribute(nombre)", "🔎"],
          ["setAttribute", "dom-setattribute", "elemento.setAttribute(nombre, valor)", "🖊️"],
          ["hasAttribute", "dom-hasattribute", "elemento.hasAttribute(nombre)", "✅"],
          ["removeAttribute", "dom-removeattribute", "elemento.removeAttribute(nombre)", "🧽"],
          ["className", "dom-classname", "elemento.className", "🏷️"],
          ["classList", "dom-classlist", "elemento.classList", "🎛️"],
          ["elemento classList add()", "dom-classlist-add", "elemento.classList.add(...clases)", "➕"],
          ["elemento classList remove()", "dom-classlist-remove", "elemento.classList.remove(...clases)", "➖"],
          ["elemento classList toggle()", "dom-classlist-toggle", "elemento.classList.toggle(clase, force)", "🔀"],
          ["elemento classList contains()", "dom-classlist-contains", "elemento.classList.contains(clase)", "❓"],
        ],
      },
      {
        seccion: "Contenido y texto",
        notas: [
          ["innerHTML", "dom-innerhtml", "elemento.innerHTML", "🧩"],
          ["innerText", "dom-innertext", "elemento.innerText", "📝"],
          ["textContent", "dom-textcontent", "elemento.textContent", "📄"],
        ],
      },
    ],
  },
  {
    id: "dom-nodos",
    label: "DOM · Navegación",
    icon: "🌳",
    titulo: "Navegación del árbol DOM",
    descripcion:
      "Recorre padres, hijos y hermanos, y distingue entre nodos, elementos y tipos de nodo.",
    export: "JS_DOM_NODOS",
    simulador: "dom",
    grupos: [
      {
        seccion: "Relaciones entre nodos",
        notas: [
          ["parentElement", "dom-parentelement", "nodo.parentElement", "⬆️"],
          ["childNodes", "dom-childnodes", "nodo.childNodes", "👶"],
          ["firstChild", "dom-firstchild", "nodo.firstChild", "⏮️"],
          ["firstElementChild", "dom-firstelementchild", "nodo.firstElementChild", "🥇"],
          ["lastChild", "dom-lastchild", "nodo.lastChild", "⏭️"],
          ["lastElementChild", "dom-lastelementchild", "nodo.lastElementChild", "🏁"],
          ["nextElementSibling", "dom-nextelementsibling", "nodo.nextElementSibling", "➡️"],
          ["previousElementSibling", "dom-previouselementsibling", "nodo.previousElementSibling", "⬅️"],
          ["nodeName", "dom-nodename", "nodo.nodeName", "🔖"],
          ["nodeType", "dom-nodetype", "nodo.nodeType", "🔢"],
          ["Node contains()", "dom-nodecontains", "nodo.contains(otroNodo)", "🧭"],
        ],
      },
    ],
  },
  {
    id: "eventos-dialogos",
    label: "Eventos y diálogos",
    icon: "⚡",
    titulo: "Eventos y diálogos del navegador",
    descripcion:
      "Escucha, dispara, frena y elimina eventos; además, domina alert(), confirm() y prompt().",
    export: "JS_EVENTOS_DIALOGOS",
    simulador: "eventos",
    grupos: [
      {
        seccion: "Eventos",
        notas: [
          ["addEventListener", "ev-addlistener", "elemento.addEventListener(tipo, listener, opciones)", "🎧"],
          ["removeEventListener", "ev-removelistener", "elemento.removeEventListener(tipo, listener, opciones)", "🔇"],
          ["dispatchEvent", "ev-dispatchevent", "elemento.dispatchEvent(evento)", "📣"],
          ["preventDefault", "ev-preventdefault", "evento.preventDefault()", "🛑"],
          ["stopPropagation", "ev-stoppropagation", "evento.stopPropagation()", "🚧"],
          ["stopImmediatePropagation", "ev-stopimmediatepropagation", "evento.stopImmediatePropagation()", "⛔"],
        ],
      },
      {
        seccion: "Diálogos del navegador",
        notas: [
          ["window alert()", "dlg-alert", "window.alert(mensaje)", "🚨"],
          ["window confirm()", "dlg-confirm", "window.confirm(mensaje)", "❓"],
          ["window prompt()", "dlg-prompt", "window.prompt(mensaje, valorPorDefecto)", "✏️"],
        ],
      },
    ],
  },
  {
    id: "media-geo",
    label: "Media y geolocalización",
    icon: "🎥",
    titulo: "MediaStream y geolocalización",
    descripcion:
      "Trabaja con pistas de cámara y micrófono, y obtén la posición del usuario con la Geolocation API.",
    export: "JS_MEDIA_GEO",
    simulador: "media",
    grupos: [
      {
        seccion: "MediaStream",
        notas: [
          ["MediaStream getTracks()", "media-gettracks", "stream.getTracks()", "📹"],
          ["MediaStream getAudioTracks()", "media-getaudiotracks", "stream.getAudioTracks()", "🎤"],
          ["MediaStream getVideoTracks", "media-getvideotracks", "stream.getVideoTracks()", "🎥"],
          ["MediaStreamTrack stop()", "media-trackstop", "track.stop()", "⏹️"],
        ],
      },
      {
        seccion: "Geolocalización",
        notas: [
          ["navigator geolocation", "geo-navigator", "navigator.geolocation", "📍"],
          ["navigator geolocation getCurrentPosition()", "geo-getcurrentposition", "navigator.geolocation.getCurrentPosition(exito, error, opciones)", "📌"],
          ["navigator geolocation watchPosition()", "geo-watchposition", "navigator.geolocation.watchPosition(exito, error, opciones)", "🛰️"],
          ["navigator geolocation clearWatch()", "geo-clearwatch", "navigator.geolocation.clearWatch(id)", "🧹"],
        ],
      },
    ],
  },
  {
    id: "math",
    label: "Math",
    icon: "🧮",
    titulo: "Cálculos matemáticos con Math",
    descripcion:
      "Constantes y funciones matemáticas de JavaScript: redondeos, potencias, raíces, trigonometría y números aleatorios.",
    export: "JS_MATH",
    simulador: "math",
    grupos: [
      {
        seccion: "Redondeo y valor absoluto",
        notas: [
          ["Math abs()", "math-abs", "Math.abs(x)", "🧲"],
          ["Math ceil()", "math-ceil", "Math.ceil(x)", "⬆️"],
          ["Math floor()", "math-floor", "Math.floor(x)", "⬇️"],
          ["Math round()", "math-round", "Math.round(x)", "🎯"],
          ["Math trunc()", "math-trunc", "Math.trunc(x)", "✂️"],
        ],
      },
      {
        seccion: "Potencias, raíces y logaritmos",
        notas: [
          ["Math pow()", "math-pow", "Math.pow(base, exponente)", "🔺"],
          ["Math sqrt()", "math-sqrt", "Math.sqrt(x)", "🟰"],
          ["Math log", "math-log", "Math.log(x)", "📈"],
        ],
      },
      {
        seccion: "Mínimo, máximo y aleatoriedad",
        notas: [
          ["Math min()", "math-min", "Math.min(...numeros)", "🔽"],
          ["Math max()", "math-max", "Math.max(...numeros)", "🔼"],
          ["Math random()", "math-random", "Math.random()", "🎲"],
        ],
      },
      {
        seccion: "Trigonometría y constantes",
        notas: [
          ["Math sin", "math-sin", "Math.sin(x)", "🌊"],
          ["Math cos", "math-cos", "Math.cos(x)", "🌊"],
          ["Math atan2", "math-atan2", "Math.atan2(y, x)", "📐"],
          ["Math PI", "math-pi", "Math.PI", "🥧"],
        ],
      },
    ],
  },
  {
    id: "storage",
    label: "Web Storage",
    icon: "💾",
    titulo: "localStorage y sessionStorage",
    descripcion:
      "Guarda pares clave-valor en el navegador, de forma persistente o por pestaña, con la API Storage.",
    export: "JS_STORAGE",
    simulador: "storage",
    grupos: [
      {
        seccion: "Almacenes",
        notas: [
          ["localStorage", "storage-localstorage", "localStorage", "🗄️"],
          ["sessionStorage", "storage-sessionstorage", "sessionStorage", "🗂️"],
        ],
      },
      {
        seccion: "Métodos de Storage",
        notas: [
          ["Storage prototype setItem()", "storage-setitem", "storage.setItem(clave, valor)", "📥"],
          ["Storage prototype getItem()", "storage-getitem", "storage.getItem(clave)", "📤"],
          ["Storage prototype removeItem()", "storage-removeitem", "storage.removeItem(clave)", "🗑️"],
          ["Storage prototype key()", "storage-key", "storage.key(indice)", "🔑"],
          ["Storage prototype clear()", "storage-clear", "storage.clear()", "🧹"],
        ],
      },
    ],
  },
  {
    id: "estilos",
    label: "Estilos · CSSOM",
    icon: "🎨",
    titulo: "Leer y modificar estilos con CSSOM",
    descripcion:
      "Consulta los estilos computados, lee y escribe propiedades CSS y controla el scroll de la ventana.",
    export: "JS_ESTILOS",
    simulador: "estilos",
    grupos: [
      {
        seccion: "Estilos computados",
        notas: [
          ["getComputedStyle()", "estilos-getcomputedstyle", "getComputedStyle(elemento, pseudoElemento)", "🖌️"],
          ["getPropertyValue", "estilos-getpropertyvalue", "estilos.getPropertyValue(propiedad)", "🔎"],
        ],
      },
      {
        seccion: "Modificar estilos",
        notas: [
          ["setProperty", "estilos-setproperty", "estilos.setProperty(propiedad, valor, prioridad)", "🖊️"],
        ],
      },
      {
        seccion: "Scroll de la ventana",
        notas: [
          ["window scrollTo()", "estilos-scrollto", "window.scrollTo(x, y) · window.scrollTo(opciones)", "🪟"],
        ],
      },
    ],
  },
  {
    id: "voz",
    label: "Voz",
    icon: "🗣️",
    titulo: "Síntesis y reconocimiento de voz",
    descripcion:
      "Convierte texto en voz con SpeechSynthesis y escucha al usuario con SpeechRecognition.",
    export: "JS_VOZ",
    simulador: "voz",
    grupos: [
      {
        seccion: "Síntesis de voz",
        notas: [
          ["SpeechSynthesis speak(utterance)", "voz-speak", "speechSynthesis.speak(utterance)", "🔊"],
          ["new SpeechSynthesisUtterance()", "voz-utterance", "new SpeechSynthesisUtterance(texto)", "💬"],
          ["onspeechend", "voz-onspeechend", "recognition.onspeechend = handler", "🏁"],
        ],
      },
      {
        seccion: "Reconocimiento de voz",
        notas: [
          ["webkitSpeechRecognition", "voz-recognition", "new webkitSpeechRecognition()", "🎙️"],
          ["recognition stop()", "voz-stop", "recognition.stop()", "⏹️"],
        ],
      },
    ],
  },
  {
    id: "medios",
    label: "Cámara y grabación",
    icon: "🎥",
    titulo: "MediaDevices y MediaRecorder",
    descripcion:
      "Accede a cámara y micrófono y graba audio o vídeo directamente desde el navegador.",
    export: "JS_MEDIOS",
    simulador: "medios",
    grupos: [
      {
        seccion: "Acceso a dispositivos",
        notas: [
          ["mediaDevices getUserMedia", "medios-getusermedia", "navigator.mediaDevices.getUserMedia(constraints)", "📷"],
        ],
      },
      {
        seccion: "Grabación con MediaRecorder",
        notas: [
          ["MediaRecorder start", "medios-start", "recorder.start(timeslice)", "⏺️"],
          ["MediaRecorder isTypeSupported()", "medios-istypesupported", "MediaRecorder.isTypeSupported(mimeType)", "🧾"],
          ["ondataavailable", "medios-ondataavailable", "recorder.ondataavailable = handler", "📦"],
          ["MediaRecorder stop()", "medios-stop", "recorder.stop()", "⏹️"],
        ],
      },
    ],
  },
  {
    id: "red",
    label: "Red y conexión",
    icon: "📡",
    titulo: "Estado de red, URLs y cancelación",
    descripcion:
      "Detecta si hay conexión, construye query strings y cancela peticiones con AbortController.",
    export: "JS_RED",
    simulador: "red",
    grupos: [
      {
        seccion: "Conexión",
        notas: [
          ["navigator onLine", "red-online", "navigator.onLine", "📶"],
        ],
      },
      {
        seccion: "URLs y peticiones",
        notas: [
          ["Interfaz URLSearchParams (query string)", "red-urlsearchparams", "new URLSearchParams(query)", "🔗"],
          ["AbortController abort()", "red-abort", "controller.abort(motivo)", "🛑"],
        ],
      },
    ],
  },
];

/* Simulador concreto por nota (el resto hereda el de la categoría). */
const SIMULADOR_POR_NOTA = {
  "dlg-alert": "dialogos",
  "dlg-confirm": "dialogos",
  "dlg-prompt": "dialogos",
  "geo-navigator": "geo",
  "geo-getcurrentposition": "geo",
  "geo-watchposition": "geo",
  "geo-clearwatch": "geo",
};

/* ------------------------------------------------------------------ */
/* 2. Utilidades de limpieza de HTML                                   */
/* ------------------------------------------------------------------ */

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

const collapse = (value = "") =>
  value.replace(/\u00a0/g, " ").replace(/\s+/g, " ").trim();

/** Convierte HTML inline a texto con **negrita**, *cursiva* y `código`. */
function inlineText(html = "") {
  // El código se procesa aparte para no anidar markdown dentro de backticks.
  const codes = [];
  let out = html.replace(/<code[^>]*>([\s\S]*?)<\/code>/gi, (_, inner) => {
    const text = collapse(decodeEntities(inner.replace(/<[^>]+>/g, " ")));
    if (!text) return " ";
    codes.push(text);
    return `\uE000CODE${codes.length - 1}\uE000`;
  });

  out = out
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<img[^>]*>/gi, "")
    .replace(/<strong[^>]*>/gi, "**")
    .replace(/<\/strong>/gi, "**")
    .replace(/<b[^>]*>/gi, "**")
    .replace(/<\/b>/gi, "**")
    .replace(/<em[^>]*>/gi, "*")
    .replace(/<\/em>/gi, "*")
    .replace(/<i[^>]*>/gi, "*")
    .replace(/<\/i>/gi, "*")
    .replace(/<[^>]+>/g, " ");

  out = decodeEntities(out);
  out = out.replace(/\uE000CODE(\d+)\uE000/g, (_, index) => `\`${codes[Number(index)]}\``);
  out = out.replace(/\*\*\s*\*\*/g, "").replace(/`\s*`/g, "");
  return collapse(out);
}

/** Texto de un bloque pre>code conservando saltos de línea. */
function codeText(html = "") {
  const match = html.match(/<code[^>]*>([\s\S]*?)<\/code>/i);
  const raw = match ? match[1] : html;
  return decodeEntities(raw)
    .replace(/<[^>]+>/g, "")
    .replace(/\r\n/g, "\n")
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+$/gm, "")
    .trim();
}

/* ------------------------------------------------------------------ */
/* 3. Tokenizador de bloques                                           */
/* ------------------------------------------------------------------ */

const BLOCK_TAGS = new Set([
  "h1", "h2", "h3", "h4", "p", "ul", "ol", "pre", "blockquote", "table", "hr",
  "div", "aside", "details", "figure", "section",
]);

function findMatchingClose(html, tag, from) {
  const re = new RegExp(`<(/?)${tag}\\b[^>]*>`, "gi");
  re.lastIndex = from;
  let depth = 1;
  let match;
  while ((match = re.exec(html))) {
    if (match[1] === "/") {
      depth -= 1;
      if (depth === 0) return match.index;
    } else if (!/\/>$/.test(match[0])) {
      depth += 1;
    }
  }
  return -1;
}

function tokenize(html) {
  const blocks = [];
  const re = /<([a-z0-9]+)\b[^>]*>/gi;
  let pos = 0;
  while (pos < html.length) {
    re.lastIndex = pos;
    const match = re.exec(html);
    if (!match) break;
    const tag = match[1].toLowerCase();
    if (!BLOCK_TAGS.has(tag)) {
      pos = match.index + match[0].length;
      continue;
    }

    // Un div suelto sin cierre no debe consumir el resto del documento.
    if (/\/>$/.test(match[0]) || tag === "hr") {
      blocks.push({ type: "hr" });
      pos = match.index + match[0].length;
      continue;
    }

    const close = findMatchingClose(html, tag, match.index + match[0].length);
    if (close === -1) {
      pos = match.index + match[0].length;
      continue;
    }

    const inner = html.slice(match.index + match[0].length, close);
    const end = close + `</${tag}>`.length;

    if (tag === "div" || tag === "aside" || tag === "details" || tag === "figure" || tag === "section") {
      blocks.push(...tokenize(inner));
    } else if (tag === "ul" || tag === "ol") {
      blocks.push({ type: "list", ordered: tag === "ol", items: parseListItems(inner) });
    } else if (tag === "pre") {
      const code = codeText(inner);
      if (code) blocks.push({ type: "code", code });
    } else if (tag === "table") {
      const table = parseTable(inner);
      if (table) blocks.push(table);
    } else if (tag === "blockquote") {
      const text = inlineText(inner);
      if (text) blocks.push({ type: "quote", text });
    } else if (tag === "p") {
      const text = inlineText(inner);
      if (text) {
        // Notion exporta algunos títulos como <p>📄 <strong>Título</strong></p>
        // en lugar de <h2>. El flag permite reconocerlos como sección.
        const boldOnly =
          /^\s*[^\w\s]*\s*<strong\b[^>]*>[\s\S]*?<\/strong>\s*$/i.test(inner) &&
          text.length <= 70;
        blocks.push({ type: "p", text, boldOnly });
      }
    } else if (tag === "hr") {
      blocks.push({ type: "hr" });
    } else {
      blocks.push({ type: "heading", level: Number(tag[1]), text: inlineText(inner) });
    }

    pos = end;
  }
  return blocks;
}

function parseListItems(html) {
  const items = [];
  const re = /<li\b[^>]*>/gi;
  let pos = 0;
  while (pos < html.length) {
    re.lastIndex = pos;
    const match = re.exec(html);
    if (!match) break;
    const close = findMatchingClose(html, "li", match.index + match[0].length);
    if (close === -1) break;
    const inner = html.slice(match.index + match[0].length, close);
    const codigos = [...inner.matchAll(/<pre\b[^>]*>([\s\S]*?)<\/pre>/gi)].map((m) =>
      codeText(m[1]),
    );
    // El bloque de código se muestra aparte: no lo dupliques en el texto.
    const sinPre = inner.replace(/<pre\b[^>]*>[\s\S]*?<\/pre>/gi, "");
    const texto = inlineText(sinPre);
    if (texto || codigos.length) {
      items.push({ texto, code: codigos.join("\n\n") || null });
    }
    pos = close + 5;
  }
  return items;
}

function parseTable(html) {
  const rows = [];
  const rowRe = /<tr\b[^>]*>([\s\S]*?)<\/tr>/gi;
  let rowMatch;
  while ((rowMatch = rowRe.exec(html))) {
    const cells = [];
    const cellRe = /<(th|td)\b[^>]*>([\s\S]*?)<\/\1>/gi;
    let cellMatch;
    while ((cellMatch = cellRe.exec(rowMatch[1]))) {
      cells.push(inlineText(cellMatch[2]));
    }
    if (cells.some(Boolean)) rows.push(cells);
  }
  if (!rows.length) return null;
  return { type: "table", head: rows[0], rows: rows.slice(1) };
}

/* ------------------------------------------------------------------ */
/* 4. Secciones                                                        */
/* ------------------------------------------------------------------ */

const SECTION_ALIASES = [
  ["definicion", ["definicion"]],
  ["queEs", ["que es"]],
  ["paraQueSirve", ["para que sirve"]],
  ["comoFunciona", ["como funciona"]],
  ["sintaxis", ["sintaxis"]],
  ["ejemplos", ["ejemplos"]],
  ["errores", ["errores"]],
  ["casos", ["casos de uso"]],
  ["relacion", ["relacion con otros conceptos", "relacion"]],
  ["analogia", ["analogia"]],
  ["fuente", ["fuente"]],
  ["notasPersonales", ["notas personales", "notas"]],
];

const stripAccents = (value = "") =>
  value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

const cleanHeading = (text = "") =>
  stripAccents(text.toLowerCase())
    .replace(/[^\w\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

function sectionKey(text) {
  const clean = cleanHeading(text);
  for (const [key, aliases] of SECTION_ALIASES) {
    if (aliases.some((alias) => clean === alias || clean.startsWith(`${alias} `))) {
      return key;
    }
  }
  return null;
}

/** Secciones que terminan en cuanto aparece un subtítulo no reconocido. */
const SECCIONES_CORTAS = new Set(["analogia", "fuente", "notasPersonales"]);

/** 🔸/🔹/❌ marcan subapartados dentro de una sección, no secciones nuevas. */
const esSubseccion = (text = "") => /^\s*\**\s*(?:🔸|🔹|❌)/u.test(text);

/** Convierte los bloques planos en secciones con subgrupos por h3. */
function buildSections(blocks) {
  const sections = [];
  const vistas = new Set();
  let current = { key: "intro", heading: "", blocks: [] };
  sections.push(current);

  const abrir = (key, heading) => {
    current = { key, heading, blocks: [] };
    sections.push(current);
    vistas.add(key);
  };

  for (const block of blocks) {
    const esTitulo = block.type === "p" && block.boldOnly;
    const esHeading = block.type === "heading" && block.level <= 3;

    if (!esTitulo && !esHeading) {
      current.blocks.push(block);
      continue;
    }

    const key = sectionKey(block.text);
    const subseccion = esSubseccion(block.text);

    if (key && key !== "intro" && !subseccion && !vistas.has(key)) {
      abrir(key, block.text);
      continue;
    }

    if (/^titulo$/i.test(cleanHeading(block.text)) && !vistas.has("titulo")) {
      abrir("titulo", block.text);
      continue;
    }

    // Analogía, fuente y notas no suelen tener subsecciones: si aparece
    // un título nuevo, ya no pertenece a la sección anterior.
    if (esHeading && SECCIONES_CORTAS.has(current.key)) {
      abrir("otros", block.text);
      continue;
    }

    current.blocks.push(block);
  }
  return sections;
}

const blockText = (block) => {
  if (block.type === "p" || block.type === "quote") return block.text;
  if (block.type === "heading") return block.text;
  if (block.type === "table") {
    return tableRows(block).join(" | ");
  }
  return "";
};

/** Convierte una tabla de Notion en filas legibles. */
const tableRows = (block) => {
  return block.rows
    .map((row) => {
      if (row.length >= 2) return `${row[0]} → ${row.slice(1).join(" · ")}`;
      return row.join(" · ");
    })
    .filter(Boolean);
};

const tableTexts = (block) => tableRows(block);

function listTexts(blocks) {
  const out = [];
  for (const block of blocks) {
    if (block.type === "list") {
      for (const item of block.items) {
        if (item.texto) out.push(item.texto);
        if (item.code) out.push(`Código: ${item.code.split("\n")[0]}`);
      }
    } else if (block.type === "table") {
      out.push(...tableTexts(block));
    } else {
      const text = blockText(block);
      if (text) out.push(text);
    }
  }
  return out;
}

function parseSintaxis(blocks) {
  const sintaxis = [];
  let caption = null;
  for (const block of blocks) {
    if (block.type === "heading") {
      caption = block.text;
    } else if (block.type === "code") {
      sintaxis.push(caption ? { caption, code: block.code } : { code: block.code });
      caption = null;
    } else if (block.type === "p" && !caption) {
      caption = block.text;
    }
  }
  return sintaxis;
}

function parseEjemplos(blocks) {
  const ejemplos = [];
  let actual = null;

  const cerrar = () => {
    if (!actual) return;
    const code = actual.codes.join("\n\n").trim();
    if (code) {
      ejemplos.push({
        titulo: actual.titulo || `Ejemplo ${ejemplos.length + 1}`,
        ...(actual.descripcion ? { descripcion: actual.descripcion } : {}),
        code,
      });
    }
    actual = null;
  };

  for (const block of blocks) {
    if (block.type === "heading") {
      cerrar();
      actual = { titulo: block.text, descripcion: "", codes: [] };
    } else if (block.type === "code") {
      if (!actual) actual = { titulo: "", descripcion: "", codes: [] };
      actual.codes.push(block.code);
    } else if (block.type === "p" || block.type === "quote") {
      if (!actual) actual = { titulo: "", descripcion: "", codes: [] };
      if (!actual.codes.length) {
        actual.descripcion = actual.descripcion
          ? `${actual.descripcion} ${block.text}`
          : block.text;
      }
    } else if (block.type === "list") {
      if (!actual) actual = { titulo: "", descripcion: "", codes: [] };
      const text = listTexts([block]).join(" ");
      actual.descripcion = actual.descripcion
        ? `${actual.descripcion} ${text}`
        : text;
    }
  }
  cerrar();
  return ejemplos;
}

function parseErrores(blocks) {
  const errores = [];
  let actual = null;

  const cerrar = () => {
    if (!actual) return;
    const texto = [actual.titulo, actual.texto].filter(Boolean).join(" — ");
    if (texto) {
      errores.push(actual.code ? { texto, code: actual.code } : texto);
    }
    actual = null;
  };

  for (const block of blocks) {
    if (block.type === "heading") {
      cerrar();
      actual = { titulo: block.text, texto: "", code: "" };
    } else if (block.type === "hr") {
      cerrar();
    } else if (block.type === "list" && !actual) {
      // Una lista sin encabezado suele contener errores independientes.
      for (const item of block.items) {
        if (item.texto) {
          errores.push(item.code ? { texto: item.texto, code: item.code } : item.texto);
        }
      }
    } else if (block.type === "table") {
      // Cada fila de la tabla es un error distinto.
      cerrar();
      for (const row of tableTexts(block)) errores.push(row);
    } else if (block.type === "code") {
      if (!actual) actual = { titulo: "", texto: "", code: "" };
      actual.code = actual.code ? `${actual.code}\n\n${block.code}` : block.code;
    } else if (block.type === "list") {
      const text = listTexts([block]).join(" ");
      actual.texto = actual.texto ? `${actual.texto} ${text}` : text;
    } else {
      const text = blockText(block);
      if (text) {
        if (!actual) actual = { titulo: "", texto: "", code: "" };
        actual.texto = actual.texto ? `${actual.texto} ${text}` : text;
      }
    }
  }
  cerrar();
  return errores;
}

function firstQuote(blocks) {
  return blocks.find((b) => b.type === "quote")?.text ?? "";
}

function parseNote(html) {
  const bodyStart = html.lastIndexOf('<div class="page-body">');
  let body = bodyStart >= 0 ? html.slice(bodyStart) : html;
  body = body
    .replace(/<script\b[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[\s\S]*?<\/style>/gi, "")
    .replace(/<link\b[^>]*>/gi, "")
    .replace(/<\/article>[\s\S]*$/i, "");

  const titleMatch =
    html.match(/<h1[^>]*class="[^"]*page-title[^"]*"[^>]*>([\s\S]*?)<\/h1>/i);
  const rawTitle = titleMatch ? inlineText(titleMatch[1]) : "";
  const iconMatch =
    html.match(/<meta\s+name="data-notion-page-icon"\s+content="([^"]*)"/i) ||
    html.match(/<span class="icon" data-emoji="([^"]*)"/i);
  const icon = iconMatch ? decodeEntities(iconMatch[1]) : "📄";

  const blocks = tokenize(body);
  const sections = buildSections(blocks);
  const byKey = Object.fromEntries(sections.map((s) => [s.key, s]));

  const introText = listTexts(byKey.intro?.blocks ?? []);
  const tituloText = listTexts(byKey.titulo?.blocks ?? []);
  const definicion = listTexts(byKey.definicion?.blocks ?? []);
  const queEs = listTexts(byKey.queEs?.blocks ?? []);
  const paraQueSirve = listTexts(byKey.paraQueSirve?.blocks ?? []);
  const comoFunciona = listTexts(byKey.comoFunciona?.blocks ?? []);
  const casos = listTexts(byKey.casos?.blocks ?? []);
  const relacion = listTexts(byKey.relacion?.blocks ?? []);
  const notasPersonales = listTexts(byKey.notasPersonales?.blocks ?? []);
  const sintaxis = parseSintaxis(byKey.sintaxis?.blocks ?? []);
  const ejemplos = parseEjemplos(byKey.ejemplos?.blocks ?? []);
  const errores = parseErrores(byKey.errores?.blocks ?? []);
  const analogia = listTexts(byKey.analogia?.blocks ?? []).join(" ");
  const fuente =
    listTexts(byKey.fuente?.blocks ?? []).join(" ") ||
    "Apuntes personales · Notion";

  return {
    rawTitle,
    icon,
    introText,
    tituloText,
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
    nota: firstQuote(byKey.definicion?.blocks ?? []) || firstQuote(byKey.sintaxis?.blocks ?? []),
  };
}

/* ------------------------------------------------------------------ */
/* 5. Generación de quiz                                               */
/* ------------------------------------------------------------------ */

const cleanQuiz = (value = "") =>
  collapse(
    value
      .replace(/`/g, "")
      .replace(/\*\*/g, "")
      .replace(/\*/g, "")
      .replace(/📌|✅|⚠️|💡|❌|🚨|🔎|🎯/g, ""),
  );

function clip(value, max = 150) {
  const text = cleanQuiz(value);
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const space = cut.lastIndexOf(" ");
  return `${cut.slice(0, space > 40 ? space : max).trim()}…`;
}

/** Descarta frases de relleno o introducciones que no se sostienen solas. */
const textoUtil = (value, min = 28) => {
  const text = cleanQuiz(value);
  if (!text || text.length < min) return "";
  if (/[:：]$/.test(text)) return "";
  if (/^(ejemplo|supongamos|es decir|por ejemplo|imagina|la idea|ahora|además|pero|y)\b/i.test(text)) {
    return "";
  }
  return text;
};

function seededShuffle(items, seed) {
  const arr = [...items];
  let state = 0;
  for (const ch of seed) state = (state * 31 + ch.charCodeAt(0)) % 2147483647;
  const random = () => {
    state = (state * 48271) % 2147483647;
    return state / 2147483647;
  };
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function makeQuestion(id, n, prompt, correct, distractors) {
  const options = [correct, ...distractors]
    .map((option) => option && option.trim())
    .filter(Boolean);
  const unique = [...new Set(options)];
  for (const filler of [
    "Ninguna de las anteriores",
    "Todas las anteriores",
    "No existe en el DOM",
  ]) {
    if (unique.length >= 4) break;
    if (!unique.includes(filler)) unique.push(filler);
  }
  const cut = unique.slice(0, 4);
  const shuffled = seededShuffle(cut, `${id}-${n}`);
  return {
    id: n,
    pregunta: prompt,
    opciones: shuffled,
    correcta: shuffled.indexOf(correct),
  };
}

function buildQuiz(doc, siblings) {
  const otras = siblings.filter((d) => d.id !== doc.id);
  const pick = (field, transform = (v) => v, aceptar = () => true) => {
    const values = [];
    for (const other of otras) {
      const raw = other[field];
      const value = Array.isArray(raw) ? raw[0] : raw;
      if (!value) continue;
      const text = transform(value);
      if (text && aceptar(text) && !values.includes(text)) values.push(text);
      if (values.length >= 3) break;
    }
    return values;
  };

  const esDefinicion = (text) => Boolean(textoUtil(text, 40));
  const esUso = (text) => Boolean(textoUtil(text, 30));
  const esError = (text) =>
    Boolean(textoUtil(text, 25)) && !/^revisa la firma/i.test(text);
  const esCaso = (text) => Boolean(textoUtil(text, 30));

  const preguntas = [];

  const firmas = pick("firma", (v) => clip(v, 80));
  if (doc.firma && firmas.length) {
    preguntas.push(
      makeQuestion(
        doc.id,
        1,
        `¿Cuál es la firma correcta de ${doc.titulo}?`,
        clip(doc.firma, 80),
        firmas,
      ),
    );
  }

  const definiciones = pick("definicion", (v) => clip(v, 140), esDefinicion);
  const definicionCorrecta =
    (doc.definicion ?? []).map((v) => clip(v, 140)).find(esDefinicion) ??
    (doc.definicion?.[0] ? clip(doc.definicion[0], 140) : "");
  if (definicionCorrecta && definiciones.length) {
    preguntas.push(
      makeQuestion(
        doc.id,
        2,
        `Según tus apuntes, ¿qué describe mejor ${doc.titulo}?`,
        definicionCorrecta,
        definiciones,
      ),
    );
  }

  const usos = pick("paraQueSirve", (v) => clip(v, 130), esUso);
  const usosDoc = (doc.paraQueSirve ?? []).map((v) => clip(v, 130));
  const indiceUso = usosDoc.findIndex(esUso);
  const usoCorrecto =
    indiceUso === -1
      ? usosDoc[0] ?? ""
      : clip(
          `${usosDoc.slice(0, indiceUso).find((t) => /[:：]$/.test(t)) ?? ""} ${usosDoc[indiceUso]}`,
          130,
        );
  if (usoCorrecto && usos.length) {
    preguntas.push(
      makeQuestion(
        doc.id,
        3,
        `¿Para qué sirve ${doc.titulo}?`,
        usoCorrecto,
        usos,
      ),
    );
  }

  const erroresTexto = (value) =>
    clip(typeof value === "string" ? value : value?.texto ?? "", 130);
  const errores = pick("errores", erroresTexto, esError);
  const errorCorrecto = (doc.errores ?? [])
    .map(erroresTexto)
    .find(esError);
  if (errorCorrecto && errores.length) {
    preguntas.push(
      makeQuestion(
        doc.id,
        4,
        `¿Cuál de estos errores o advertencias corresponde a ${doc.titulo}?`,
        errorCorrecto,
        errores,
      ),
    );
  } else {
    const casos = pick("casos", (v) => clip(v, 130), esCaso);
    const casoCorrecto =
      (doc.casos ?? []).map((v) => clip(v, 130)).find(esCaso) ??
      (doc.casos?.[0] ? clip(doc.casos[0], 130) : "");
    if (casoCorrecto && casos.length) {
      preguntas.push(
        makeQuestion(
          doc.id,
          4,
          `¿En qué caso de uso encaja ${doc.titulo}?`,
          casoCorrecto,
          casos,
        ),
      );
    }
  }

  return preguntas.slice(0, 4);
}

/* ------------------------------------------------------------------ */
/* 6. Construcción de docs y módulos                                   */
/* ------------------------------------------------------------------ */

function findHtmlFile(prefix) {
  const files = fs.readdirSync(HTML_DIR).filter((file) => file.endsWith(".html"));
  const file = files.find((name) => name.startsWith(`${prefix} `));
  if (!file) {
    throw new Error(`No se encontró el HTML que empieza con "${prefix}"`);
  }
  return path.join(HTML_DIR, file);
}

const cleanTitle = (value = "") => collapse(value.replace(/[`*]/g, ""));

/** Algunas notas repiten el nombre del método como primera línea. */
const esLineaDeTitulo = (text = "") => {
  const clean = cleanQuiz(text);
  if (!clean || clean.length >= 48) return false;
  return !/^(es|sirve|permite|devuelve|representa|se|consiste|obtiene|crea|elimina|añade|agrega)\b/i.test(clean);
};

const sinLineasDeTitulo = (items = []) => {
  const out = [...items];
  while (out.length > 1 && esLineaDeTitulo(out[0])) out.shift();
  return out;
};

function buildDoc(nota, categoria) {
  const [prefix, id, firma, icon] = nota;
  const html = fs.readFileSync(findHtmlFile(prefix), "utf8");
  const parsed = parseNote(html);
  const title = cleanTitle(
    parsed.rawTitle && cleanHeading(parsed.rawTitle) !== "titulo"
      ? parsed.rawTitle
      : prefix,
  );

  const definicion = sinLineasDeTitulo(
    parsed.definicion.length
      ? parsed.definicion
      : parsed.introText.length
        ? parsed.introText
        : [`**${title}** forma parte del DOM y de las APIs del navegador.`],
  );

  const analogia = parsed.analogia;

  return {
    id,
    titulo: title,
    icon: parsed.icon && parsed.icon !== "📄" ? parsed.icon : icon,
    categoria: categoria.label,
    firma,
    simulador: SIMULADOR_POR_NOTA[id] ?? categoria.simulador,

    definicion,
    queEs: sinLineasDeTitulo(parsed.queEs.length ? parsed.queEs : definicion),
    paraQueSirve: parsed.paraQueSirve.length
      ? parsed.paraQueSirve
      : [`🎯 Aplicar \`${firma}\` en la manipulación del DOM.`],
    comoFunciona: parsed.comoFunciona.length
      ? parsed.comoFunciona
      : ["Se invoca desde JavaScript sobre el documento o un elemento.", "Devuelve un valor que puedes usar o inspeccionar."],
    sintaxis: parsed.sintaxis.length
      ? parsed.sintaxis.slice(0, 5).map((s) => ({
          ...s,
          ...(s.caption ? { caption: cleanTitle(s.caption) } : {}),
        }))
      : [{ code: firma }],
    nota: parsed.nota || undefined,
    ejemplos: (parsed.ejemplos.length
      ? parsed.ejemplos.slice(0, 7)
      : [{ titulo: "Ejemplo básico", code: firma }]
    ).map((ej) => ({ ...ej, titulo: cleanTitle(ej.titulo) })),
    errores: parsed.errores.length
      ? parsed.errores.slice(0, 7)
      : ["⚠️ Revisa la firma y el tipo de valor que devuelve."],
    casos: parsed.casos.length
      ? parsed.casos.slice(0, 7)
      : [`💼 Usar \`${title}\` en un proyecto real.`],
    relacion: parsed.relacion.length
      ? parsed.relacion.slice(0, 7)
      : ["🧩 Se combina con el resto de métodos del DOM."],
    analogia:
      analogia ||
      `Piensa en ${title} como una herramienta del DOM: cada método tiene una tarea concreta y devuelve exactamente lo que necesitas.`,
    fuente: parsed.fuente,
    notasPersonales: parsed.notasPersonales.length
      ? parsed.notasPersonales.slice(0, 7)
      : undefined,
  };
}

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    const simple = value.every(
      (item) => typeof item === "string" && !item.includes("\n") && item.length < 90,
    );
    if (simple) {
      return `[\n${value.map((item) => `${pad}  ${JSON.stringify(item)},`).join("\n")}\n${pad}]`;
    }
    return `[\n${value
      .map((item) => `${pad}  ${serialize(item, indent + 1)},`)
      .join("\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    if (!entries.length) return "{}";
    return `{\n${entries
      .map(([key, v]) => `${pad}  ${JSON.stringify(key)}: ${serialize(v, indent + 1)},`)
      .join("\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

function buildCategory(categoria) {
  const docs = [];
  for (const grupo of categoria.grupos) {
    for (const nota of grupo.notas) {
      docs.push(buildDoc(nota, categoria));
    }
  }

  // Quiz: cada nota se apoya en las demás de su categoría.
  for (const doc of docs) {
    doc.quiz = buildQuiz(doc, docs);
  }

  const docsById = Object.fromEntries(docs.map((doc) => [doc.id, doc]));

  const meta = {
    id: categoria.id,
    label: categoria.label,
    icon: categoria.icon,
    titulo: categoria.titulo,
    descripcion: categoria.descripcion,
    grupos: categoria.grupos.map((grupo) => ({
      seccion: grupo.seccion,
      metodos: grupo.notas.map(([, id, firma, icon]) => {
        const doc = docsById[id];
        return { id, nombre: doc.titulo, firma, icon: doc.icon || icon };
      }),
    })),
  };

  const exportMeta = categoria.export;
  const exportDocs = `${categoria.export}_DOCS`;
  const content = `/* Generado desde src/ApuntesFormatoHtml — no editar a mano.
   Regenerar con: node scripts/generate-apuntes.mjs */

export const ${exportMeta} = ${serialize(meta)};

export const ${exportDocs} = ${serialize(docsById)};
`;

  fs.writeFileSync(path.join(DATA_DIR, `${categoria.export.toLowerCase().replace(/_/g, "-")}.js`), content, "utf8");
  return { meta, docs: docs.length };
}

/* ------------------------------------------------------------------ */
/* 7. Ejecución                                                        */
/* ------------------------------------------------------------------ */

export { parseNote, tokenize, buildSections, parseListItems };

const esEjecucionDirecta =
  process.argv[1] &&
  path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url));

if (esEjecucionDirecta) {
  const filtros = process.argv.slice(2).map((arg) => arg.toLowerCase());
  const seleccion = filtros.length
    ? CATEGORIAS.filter((categoria) => filtros.includes(categoria.id))
    : CATEGORIAS;

  if (!seleccion.length) {
    console.error(`❌ No hay categorías que coincidan con: ${filtros.join(", ")}`);
    process.exit(1);
  }

  const resumen = seleccion.map((categoria) => ({
    categoria: categoria.label,
    ...buildCategory(categoria),
  }));

  console.log("✅ Apuntes generados:\n");
  for (const item of resumen) {
    console.log(`- ${item.categoria}: ${item.docs} notas → ${item.meta.id}`);
  }
  console.log("\nSiguiente paso: importar los módulos en src/data/jsApuntes.js");
}
