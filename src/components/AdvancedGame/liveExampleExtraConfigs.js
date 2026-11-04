/* Ejemplos vivos adicionales para apuntes y APIs.
   Incluye entornos simulados para APIs que no existen dentro de un Worker.
   Las plantillas usan las mismas variables inyectadas que liveExampleConfigs:
   `emojis`, `texto`, `numeros` y `fecha`. */

/* ============================================================
   Mini DOM mutable (creación, contenido, navegación y eventos)
   ============================================================ */

const PRELUDIO_DOM_COMPLETO = `class EventoDOM {
  constructor(tipo, opciones) {
    const op = opciones || {};
    this.type = tipo;
    this.bubbles = Boolean(op.bubbles);
    this.detail = op.detail;
    this.defaultPrevented = false;
    this._propagacion = false;
    this._inmediato = false;
    this.target = null;
    this.currentTarget = null;
  }
  preventDefault() {
    this.defaultPrevented = true;
  }
  stopPropagation() {
    this._propagacion = true;
  }
  stopImmediatePropagation() {
    this._propagacion = true;
    this._inmediato = true;
  }
}
class CustomEventoDOM extends EventoDOM {
  constructor(tipo, opciones) {
    super(tipo, opciones);
  }
}
const crearListaClases = (nodo) => ({
  add: function () {
    const clases = Array.prototype.slice.call(arguments);
    for (const clase of clases) {
      if (!nodo._clases.includes(clase)) nodo._clases.push(clase);
    }
    nodo._atributos.class = nodo._clases.join(" ");
  },
  remove: function () {
    const clases = Array.prototype.slice.call(arguments);
    nodo._clases = nodo._clases.filter((clase) => !clases.includes(clase));
    nodo._atributos.class = nodo._clases.join(" ");
  },
  toggle: function (clase) {
    if (nodo._clases.includes(clase)) {
      nodo.classList.remove(clase);
      return false;
    }
    nodo.classList.add(clase);
    return true;
  },
  contains: function (clase) {
    return nodo._clases.includes(clase);
  },
  item: function (indice) {
    return nodo._clases[indice] || null;
  },
});
class NodoDOM {
  constructor(tipo, etiqueta, contenido) {
    this.nodeType = tipo;
    this.nodeName = tipo === 1 ? String(etiqueta).toUpperCase() : "#text";
    this.tagName = this.nodeName;
    this.id = "";
    this._texto = tipo === 3 ? String(contenido || "") : "";
    this._html = null;
    this._clases = [];
    this._atributos = {};
    this._hijos = [];
    this._oyentes = {};
    this.parentNode = null;
    this.scrollTop = 0;
    this.style = {
      _valores: {},
      setProperty: function (nombre, valor) {
        this._valores[nombre] = String(valor);
      },
      getPropertyValue: function (nombre) {
        return this._valores[nombre] || "";
      },
      removeProperty: function (nombre) {
        delete this._valores[nombre];
      },
    };
  }
  get children() {
    return this._hijos.filter((hijo) => hijo.nodeType === 1);
  }
  get childNodes() {
    return this._hijos.slice();
  }
  get firstChild() {
    return this._hijos[0] || null;
  }
  get lastChild() {
    return this._hijos[this._hijos.length - 1] || null;
  }
  get firstElementChild() {
    return this.children[0] || null;
  }
  get lastElementChild() {
    const elementos = this.children;
    return elementos[elementos.length - 1] || null;
  }
  get parentElement() {
    return this.parentNode && this.parentNode.nodeType === 1
      ? this.parentNode
      : null;
  }
  get nextElementSibling() {
    if (!this.parentNode) return null;
    const hermanos = this.parentNode.children;
    const indice = hermanos.indexOf(this);
    return indice === -1 ? null : hermanos[indice + 1] || null;
  }
  get previousElementSibling() {
    if (!this.parentNode) return null;
    const hermanos = this.parentNode.children;
    const indice = hermanos.indexOf(this);
    return indice <= 0 ? null : hermanos[indice - 1] || null;
  }
  get className() {
    return this._clases.join(" ");
  }
  set className(valor) {
    this._clases = String(valor || "")
      .split(" ")
      .filter(Boolean);
    this._atributos.class = this._clases.join(" ");
  }
  get classList() {
    return crearListaClases(this);
  }
  get textContent() {
    return this._texto + this._hijos.map((hijo) => hijo.textContent).join("");
  }
  set textContent(valor) {
    this._hijos = [];
    this._html = null;
    this._texto = String(valor ?? "");
  }
  get innerText() {
    return this.textContent;
  }
  set innerText(valor) {
    this.textContent = valor;
  }
  get innerHTML() {
    if (this._html !== null) return this._html;
    return (
      this._hijos
        .map((hijo) => (hijo.nodeType === 1 ? hijo.outerHTML : hijo.textContent))
        .join("") + this._texto
    );
  }
  set innerHTML(valor) {
    this._html = String(valor ?? "");
    this._hijos = [];
    this._texto = String(valor ?? "").replace(/<[^>]*>/g, "");
  }
  get outerHTML() {
    if (this.nodeType === 3) return this._texto;
    const atributos = [];
    if (this.id) atributos.push(' id="' + this.id + '"');
    if (this.className) atributos.push(' class="' + this.className + '"');
    return (
      "<" +
      this.tagName.toLowerCase() +
      atributos.join("") +
      ">" +
      this.innerHTML +
      "</" +
      this.tagName.toLowerCase() +
      ">"
    );
  }
  getAttribute(nombre) {
    const clave = String(nombre);
    if (clave === "class") return this.className || null;
    if (clave === "id") return this.id || null;
    return Object.prototype.hasOwnProperty.call(this._atributos, clave)
      ? this._atributos[clave]
      : null;
  }
  setAttribute(nombre, valor) {
    const clave = String(nombre);
    if (clave === "class") {
      this.className = valor;
      return;
    }
    if (clave === "id") {
      this.id = String(valor);
      this._atributos.id = this.id;
      return;
    }
    this._atributos[clave] = String(valor);
  }
  hasAttribute(nombre) {
    return this.getAttribute(nombre) !== null;
  }
  removeAttribute(nombre) {
    const clave = String(nombre);
    if (clave === "class") {
      this._clases = [];
      delete this._atributos.class;
      return;
    }
    if (clave === "id") {
      this.id = "";
      delete this._atributos.id;
      return;
    }
    delete this._atributos[clave];
  }
  appendChild(nodo) {
    if (nodo.parentNode) nodo.parentNode.removeChild(nodo);
    nodo.parentNode = this;
    this._hijos.push(nodo);
    return nodo;
  }
  append() {
    const nodos = Array.prototype.slice.call(arguments);
    for (const nodo of nodos) {
      this.appendChild(
        typeof nodo === "string" ? new NodoDOM(3, "#text", nodo) : nodo,
      );
    }
  }
  insertBefore(nodo, referencia) {
    const indice = this._hijos.indexOf(referencia);
    if (nodo.parentNode) nodo.parentNode.removeChild(nodo);
    nodo.parentNode = this;
    if (indice === -1) this._hijos.push(nodo);
    else this._hijos.splice(indice, 0, nodo);
    return nodo;
  }
  replaceChildren() {
    const nodos = Array.prototype.slice.call(arguments);
    for (const hijo of this._hijos) hijo.parentNode = null;
    this._hijos = [];
    this.append.apply(this, nodos);
  }
  replaceWith() {
    const nodos = Array.prototype.slice.call(arguments);
    const padre = this.parentNode;
    if (!padre) return;
    const indice = padre._hijos.indexOf(this);
    if (indice === -1) return;
    padre._hijos.splice(indice, 1);
    this.parentNode = null;
    for (let i = 0; i < nodos.length; i += 1) {
      const nodo =
        typeof nodos[i] === "string"
          ? new NodoDOM(3, "#text", nodos[i])
          : nodos[i];
      if (nodo.parentNode) nodo.parentNode.removeChild(nodo);
      nodo.parentNode = padre;
      padre._hijos.splice(indice + i, 0, nodo);
    }
  }
  removeChild(nodo) {
    const indice = this._hijos.indexOf(nodo);
    if (indice !== -1) {
      this._hijos.splice(indice, 1);
      nodo.parentNode = null;
    }
    return nodo;
  }
  remove() {
    if (this.parentNode) this.parentNode.removeChild(this);
  }
  contains(nodo) {
    let actual = nodo;
    while (actual) {
      if (actual === this) return true;
      actual = actual.parentNode;
    }
    return false;
  }
  addEventListener(tipo, oyente) {
    const clave = String(tipo);
    if (!this._oyentes[clave]) this._oyentes[clave] = [];
    if (!this._oyentes[clave].includes(oyente)) {
      this._oyentes[clave].push(oyente);
    }
  }
  removeEventListener(tipo, oyente) {
    const clave = String(tipo);
    if (!this._oyentes[clave]) return;
    this._oyentes[clave] = this._oyentes[clave].filter(
      (actual) => actual !== oyente,
    );
  }
  dispatchEvent(evento) {
    evento.target = evento.target || this;
    let actual = this;
    while (actual) {
      evento.currentTarget = actual;
      const oyentes = (actual._oyentes[evento.type] || []).slice();
      for (const oyente of oyentes) {
        if (evento._inmediato) break;
        oyente.call(actual, evento);
      }
      if (evento._inmediato) break;
      if (!evento.bubbles || evento._propagacion) break;
      actual = actual.parentNode;
    }
    return !evento.defaultPrevented;
  }
  click() {
    return this.dispatchEvent(new EventoDOM("click", { bubbles: true }));
  }
}
const crearElemento = (etiqueta, opciones) => {
  const op = opciones || {};
  const nodo = new NodoDOM(1, etiqueta);
  if (op.id) nodo.setAttribute("id", op.id);
  if (op.className) nodo.className = op.className;
  if (op.textContent) nodo.textContent = op.textContent;
  return nodo;
};
const htmlDOM = crearElemento("html", { className: "root" });
const cuerpoDOM = crearElemento("body", { className: "pagina" });
const tituloDOM = crearElemento("h1", {
  id: "titulo",
  className: "titulo grande",
  textContent: "Mi página de emojis",
});
const cajaDOM = crearElemento("div", {
  id: "miCaja",
  className: "caja",
  textContent: "Hola mundo",
});
const parrafoDOM = crearElemento("p", {
  id: "parrafo",
  className: "parrafo",
  textContent: "Un párrafo de ejemplo",
});
const listaDOM = crearElemento("ul", { id: "lista", className: "lista" });
const itemsDOM = (typeof emojis !== "undefined" ? emojis : ["🍎", "🐉", "🍌"]).map(
  (emoji, indice) =>
    crearElemento("li", {
      className: "item",
      textContent: indice + 1 + ". " + emoji,
    }),
);
listaDOM.append.apply(listaDOM, itemsDOM);
cuerpoDOM.append(tituloDOM, cajaDOM, parrafoDOM, listaDOM);
htmlDOM.append(cuerpoDOM);
const nodosDOM = [htmlDOM, cuerpoDOM, tituloDOM, cajaDOM, parrafoDOM, listaDOM].concat(
  itemsDOM,
);
const buscarDOM = (selector) => {
  const sel = String(selector).trim();
  if (sel === "*") return nodosDOM.slice();
  if (sel.charAt(0) === "#") {
    return nodosDOM.filter((nodo) => nodo.id === sel.slice(1));
  }
  if (sel.charAt(0) === ".") {
    return nodosDOM.filter((nodo) => nodo.classList.contains(sel.slice(1)));
  }
  const partes = sel.split(".");
  const etiqueta = partes[0].toLowerCase();
  const clase = partes[1];
  return nodosDOM.filter(
    (nodo) =>
      nodo.tagName.toLowerCase() === etiqueta &&
      (!clase || nodo.classList.contains(clase)),
  );
};
const ESTILOS_BASE = {
  color: "rgb(34, 197, 94)",
  "font-size": "16px",
  display: "block",
  "background-color": "rgb(15, 23, 42)",
};
const leerEstilo = (nodo, propiedad) => {
  const valores = nodo && nodo.style ? nodo.style._valores : {};
  return valores[propiedad] || ESTILOS_BASE[propiedad] || "";
};
const getComputedStyle = (nodo) => ({
  getPropertyValue: (propiedad) => leerEstilo(nodo, propiedad),
  color: leerEstilo(nodo, "color"),
  fontSize: leerEstilo(nodo, "font-size"),
  display: leerEstilo(nodo, "display"),
});
const document = {
  title: "Mi página de emojis",
  body: cuerpoDOM,
  documentElement: htmlDOM,
  fullscreenElement: null,
  createElement: (etiqueta) => new NodoDOM(1, etiqueta),
  createTextNode: (contenido) => new NodoDOM(3, "#text", contenido),
  getElementById: (id) =>
    nodosDOM.find((nodo) => nodo.id === String(id)) || null,
  getElementsByClassName: (clase) =>
    nodosDOM.filter((nodo) => nodo.classList.contains(String(clase))),
  getElementsByTagName: (etiqueta) =>
    nodosDOM.filter(
      (nodo) => nodo.tagName.toLowerCase() === String(etiqueta).toLowerCase(),
    ),
  querySelector: (selector) => buscarDOM(selector)[0] || null,
  querySelectorAll: (selector) => buscarDOM(selector),
  addEventListener: (tipo, oyente) => cuerpoDOM.addEventListener(tipo, oyente),
  removeEventListener: (tipo, oyente) =>
    cuerpoDOM.removeEventListener(tipo, oyente),
  dispatchEvent: (evento) => cuerpoDOM.dispatchEvent(evento),
};
const window = {
  document: document,
  scrollX: 0,
  scrollY: 0,
  innerWidth: 1280,
  innerHeight: 720,
  alert: (mensaje) => {
    console.log("🔔 alert: " + mensaje);
  },
  confirm: (mensaje) => {
    console.log("❔ confirm: " + mensaje + " → true");
    return true;
  },
  prompt: (mensaje, valorInicial) => {
    const respuesta =
      valorInicial || (typeof texto !== "undefined" ? texto : "respuesta simulada");
    console.log("✍️ prompt: " + mensaje + " → " + respuesta);
    return respuesta;
  },
  scrollTo: (x, y) => {
    window.scrollX = Number(x) || 0;
    window.scrollY = Number(y) || 0;
    console.log("🖱️ [scroll simulado] x=" + window.scrollX + " y=" + window.scrollY);
  },
  getComputedStyle: getComputedStyle,
};
const alert = window.alert;
const confirm = window.confirm;
const prompt = window.prompt;`;

/* ============================================================
   Historial, navegador, notificaciones, media y red
   ============================================================ */

const PRELUDIO_HISTORY = `const crearHistorial = () => {
  const entradas = [{ state: null, url: "https://ejemplo.com/inicio" }];
  let indice = 0;
  return {
    get length() {
      return entradas.length;
    },
    get state() {
      return entradas[indice].state;
    },
    back: () => {
      if (indice > 0) indice -= 1;
    },
    forward: () => {
      if (indice < entradas.length - 1) indice += 1;
    },
    go: (delta) => {
      const salto = Number(delta) || 0;
      indice = Math.max(0, Math.min(entradas.length - 1, indice + salto));
    },
    pushState: (state, titulo, url) => {
      entradas.splice(indice + 1);
      entradas.push({ state: state, url: String(url) });
      indice = entradas.length - 1;
    },
    replaceState: (state, titulo, url) => {
      entradas[indice] = { state: state, url: String(url) };
    },
    _actual: () => entradas[indice].url,
  };
};
const history = crearHistorial();
const location = {};
Object.defineProperty(location, "href", {
  get: () => history._actual(),
});
Object.defineProperty(location, "pathname", {
  get: () => {
    const url = history._actual();
    const protocolo = url.indexOf("://");
    const inicio = url.indexOf("/", protocolo + 3);
    return inicio === -1 ? "/" : url.slice(inicio);
  },
});
const window = { history: history, location: location };`;

const PRELUDIO_NAVEGADOR = `const portapapeles = {
  _texto: "",
  writeText: async function (valor) {
    this._texto = String(valor);
    console.log("📋 [portapapeles simulado] " + this._texto);
    return true;
  },
  readText: async function () {
    return this._texto;
  },
};
const navigator = {
  language: "es-ES",
  cookieEnabled: true,
  onLine: true,
  userAgent: "WorkerSimulado/1.0",
  canShare: (datos) => Boolean(datos && (datos.text || datos.url)),
  share: async (datos) => {
    const info = datos || {};
    console.log(
      "📤 [share simulado] " +
        (info.title || "Sin título") +
        " · " +
        (info.text || info.url || ""),
    );
    return true;
  },
  clipboard: portapapeles,
};`;

const PRELUDIO_NOTIFICACIONES = `class Notification {
  constructor(titulo, opciones) {
    const op = opciones || {};
    this.title = titulo;
    this.body = op.body || "";
    this.icon = op.icon || "";
    console.log("🔔 [notificación simulada] " + titulo + " · " + this.body);
  }
}
Notification.permission = "granted";
Notification.requestPermission = async function () {
  Notification.permission = "granted";
  console.log("🔐 [notificación simulada] Permiso concedido");
  return "granted";
};
const navigator = {
  serviceWorker: {
    ready: Promise.resolve({
      pushManager: {
        subscribe: async (opciones) => {
          console.log("📡 [push simulado] Suscripción creada");
          return {
            endpoint: "https://push.ejemplo.com/suscripcion/demo",
            expirationTime: null,
            options: opciones || {},
          };
        },
      },
    }),
  },
};`;

const PRELUDIO_MEDIA_GEO = `const crearPista = (kind) => ({
  kind: kind,
  readyState: "live",
  enabled: true,
  label: kind === "audio" ? "Micrófono simulado" : "Cámara simulada",
  stop: function () {
    this.readyState = "ended";
    console.log("⏹️ [pista simulada] " + this.kind + " detenida");
  },
});
const crearStream = () => {
  const pistas = [crearPista("audio"), crearPista("video")];
  return {
    id: "stream-demo",
    getTracks: () => pistas.slice(),
    getAudioTracks: () => pistas.filter((pista) => pista.kind === "audio"),
    getVideoTracks: () => pistas.filter((pista) => pista.kind === "video"),
  };
};
class MediaRecorder {
  constructor(stream, opciones) {
    const op = opciones || {};
    this.stream = stream;
    this.mimeType = op.mimeType || "video/webm";
    this.state = "inactive";
    this.ondataavailable = null;
    this.onstop = null;
  }
  start() {
    this.state = "recording";
    console.log("⏺️ [MediaRecorder simulado] Grabando en " + this.mimeType);
  }
  stop() {
    this.state = "inactive";
    if (typeof this.ondataavailable === "function") {
      this.ondataavailable({ data: { size: 1024 }, dataSize: 1024 });
    }
    if (typeof this.onstop === "function") this.onstop();
    console.log("⏹️ [MediaRecorder simulado] Grabación detenida");
  }
}
MediaRecorder.isTypeSupported = (tipo) =>
  ["video/webm", "audio/webm", "video/mp4"].includes(tipo);
const navigator = {
  mediaDevices: {
    getUserMedia: async (restricciones) => {
      const r = restricciones || {};
      console.log(
        "🎥 [cámara simulada] audio=" + Boolean(r.audio) + " video=" + Boolean(r.video),
      );
      return crearStream();
    },
  },
  geolocation: {
    getCurrentPosition: (exito) => {
      setTimeout(() => {
        exito({
          coords: { latitude: 40.4168, longitude: -3.7038, accuracy: 10 },
          timestamp: Date.now(),
        });
      }, 50);
    },
    watchPosition: (exito) => {
      let lecturas = 0;
      const id = setInterval(() => {
        lecturas += 1;
        exito({
          coords: {
            latitude: 40.4168 + lecturas * 0.001,
            longitude: -3.7038 - lecturas * 0.001,
            accuracy: 8,
          },
          timestamp: Date.now(),
        });
        if (lecturas >= 3) clearInterval(id);
      }, 40);
      return id;
    },
    clearWatch: (id) => {
      clearInterval(id);
      console.log("📍 [geo simulada] Observación cancelada");
    },
  },
};`;

const PRELUDIO_RED = `class AbortController {
  constructor() {
    this.signal = {
      aborted: false,
      reason: null,
      _oyentes: [],
      addEventListener: function (tipo, oyente) {
        if (tipo === "abort") this._oyentes.push(oyente);
      },
    };
  }
  abort(motivo) {
    if (this.signal.aborted) return;
    this.signal.aborted = true;
    this.signal.reason = motivo || "abort";
    for (const oyente of this.signal._oyentes) oyente();
  }
}
const fetch = async (url, opciones) => {
  const op = opciones || {};
  console.log("🌐 [fetch simulado] GET " + url);
  await new Promise((resolver) => setTimeout(resolver, 60));
  if (op.signal && op.signal.aborted) {
    const error = new Error("La operación fue abortada");
    error.name = "AbortError";
    throw error;
  }
  return {
    ok: true,
    status: 200,
    statusText: "OK",
    url: String(url),
    json: async () => ({ total: emojis.length, emojis: emojis }),
    text: async () => texto,
  };
};
const navigator = {
  onLine: true,
  connection: { effectiveType: "4g", downlink: 10, rtt: 40 },
};`;

const PRELUDIO_FETCH = `const fetch = async (url, opciones) => {
  console.log("🌐 [fetch simulado] GET " + url);
  await new Promise((resolver) => setTimeout(resolver, 50));
  const datos = {
    total: emojis.length,
    emojis: emojis,
    fuente: String(url),
  };
  return {
    ok: true,
    status: 200,
    statusText: "OK",
    url: String(url),
    headers: { get: () => "application/json" },
    json: async () => datos,
    text: async () => JSON.stringify(datos),
  };
};`;

const PRELUDIO_URL = `const URL = {
  _creadas: [],
  createObjectURL: function (blob) {
    const url = "blob:https://ejemplo.com/" + (this._creadas.length + 1);
    this._creadas.push({ url: url, blob: blob });
    console.log("🔗 [URL simulada] Creada " + url);
    return url;
  },
  revokeObjectURL: function (url) {
    this._creadas = this._creadas.filter((item) => item.url !== url);
    console.log("🗑️ [URL simulada] Revocada " + url);
  },
};`;

/* ============================================================
   Entornos (etiquetas visibles en el componente)
   ============================================================ */

const ENTORNO_DOM_COMPLETO =
  "🧪 Entorno simulado: mini DOM mutable con #titulo, #miCaja, #parrafo, #lista y un <li class=\"item\"> por emoji.";
const ENTORNO_HISTORY =
  "🧪 Entorno simulado: `history` y `location` guardan las navegaciones en memoria.";
const ENTORNO_NAVEGADOR =
  "🧪 Entorno simulado: `navigator.share` y el portapapeles registran la acción en consola.";
const ENTORNO_NOTIFICACIONES =
  "🧪 Entorno simulado: `Notification` y `pushManager` no muestran avisos reales.";
const ENTORNO_MEDIA_GEO =
  "🧪 Entorno simulado: cámara, micrófono, MediaRecorder y geolocalización devuelven datos ficticios.";
const ENTORNO_RED =
  "🧪 Entorno simulado: `fetch` responde con tus emojis y `AbortController` cancela la petición.";
const ENTORNO_FETCH =
  "🧪 Entorno simulado: `fetch` responde con tus emojis sin salir del worker.";
const ENTORNO_URL =
  "🧪 Entorno simulado: `URL.createObjectURL()` genera enlaces blob ficticios.";

/* ============================================================
   Configuraciones
   ============================================================ */

const EXTRA_CONFIGS = {
  /* ---------------- Promesas ---------------- */

  "promise-all": {
    titulo: "Espera a todas las promesas",
    descripcion:
      "Promise.all() recibe un array de promesas y resuelve cuando todas terminan, devolviendo sus resultados en orden.",
    prueba:
      "Añade números para crear más tareas y observa cuántos resultados llegan.",
    codigo: `const tareas = numeros.slice(0, 4).map((numero, indice) => {
  const seguro = Number.isFinite(numero) ? Math.abs(numero) : 20;
  const espera = Math.max(20, Math.min(200, seguro * 10));
  return new Promise((resolver) =>
    setTimeout(() => resolver("tarea " + (indice + 1) + " en " + espera + " ms"), espera),
  );
});
console.log("Tareas lanzadas:", tareas.length);
const resultados = await Promise.all(tareas);
console.log("Resultados:", resultados);
return resultados;`,
  },

  "promise-allsettled": {
    titulo: "Conoce el estado de cada promesa",
    descripcion:
      "Promise.allSettled() espera a todas las promesas aunque alguna falle. Devuelve un estado fulfilled o rejected por cada una.",
    prueba:
      "Vacía la lista: el array de tareas quedará vacío y el resultado será [].",
    codigo: `const tareas = numeros.slice(0, 4).map((numero, indice) =>
  indice % 2 === 0
    ? Promise.resolve("ok " + numero)
    : Promise.reject(new Error("fallo " + numero)),
);
const resultados = await Promise.allSettled(tareas);
console.log(resultados.map((r) => r.status));
return resultados.map((r) => ({
  estado: r.status,
  valor: "value" in r ? r.value : String(r.reason.message),
}));`,
  },

  "promise-any": {
    titulo: "La primera que responde",
    descripcion:
      "Promise.any() resuelve con la primera promesa que se cumple e ignora los rechazos.",
    prueba:
      "Cambia los retardos con los números de la lista: el primero en cumplirse gana.",
    codigo: `const retardos = numeros.slice(0, 3).map((n, i) => {
  const seguro = Number.isFinite(n) ? Math.abs(n) : 20;
  return Math.max(20, Math.min(200, seguro * 5));
});
const tareas = retardos.map(
  (espera, indice) =>
    new Promise((resolver) =>
      setTimeout(() => resolver("ganadora " + (indice + 1) + " (" + espera + " ms)"), espera),
    ),
);
console.log("Retardos:", retardos);
if (!tareas.length) return "Sin tareas que esperar";
return await Promise.any(tareas);`,
  },

  "promise-resolve": {
    titulo: "Crea una promesa resuelta",
    descripcion:
      "Promise.resolve() devuelve una promesa ya cumplida, útil para normalizar valores síncronos.",
    prueba:
      "Cambia el valor de retorno y comprueba que await lo obtiene igualmente.",
    codigo: `const valor = numeros.length ? numeros[0] * 2 : "sin números";
const promesa = Promise.resolve(valor);
console.log("¿Es una promesa?", promesa instanceof Promise);
const resultado = await promesa;
console.log("Resultado:", resultado);
return resultado;`,
  },

  /* ---------------- Web APIs ---------------- */

  fetch: {
    titulo: "Pide datos con fetch",
    descripcion:
      "fetch() realiza una petición HTTP y devuelve una promesa con la respuesta. Aquí el servidor está simulado.",
    prueba:
      "Cambia la URL y observa que la respuesta simula los emojis del constructor.",
    entorno: ENTORNO_FETCH,
    preludio: PRELUDIO_FETCH,
    codigo: `const respuesta = await fetch(
  "https://api.ejemplo.com/emojis?total=" + emojis.length,
);
console.log("Estado:", respuesta.status);
const datos = await respuesta.json();
console.log("Datos recibidos:", datos);
return datos;`,
  },

  structuredclone: {
    titulo: "Clona en profundidad",
    descripcion:
      "structuredClone() crea una copia profunda de objetos y arrays, incluyendo Map, Set o Date.",
    prueba:
      "Modifica el clon y comprueba que el objeto original conserva sus valores.",
    codigo: `const original = {
  emojis: emojis,
  total: emojis.length,
  creado: new Date(2024, 0, 1),
};
const copia = structuredClone(original);
copia.emojis.push("🧬");
copia.total = -1;
console.log("Original intacto:", original.total);
console.log("Copia modificada:", copia.total);
return {
  original: { total: original.total, emojis: original.emojis },
  copia: { total: copia.total, emojis: copia.emojis },
  mismaReferencia: original.emojis === copia.emojis,
};`,
  },

  "regexp-test": {
    titulo: "Comprueba un patrón",
    descripcion:
      "RegExp.test() devuelve true si la cadena contiene una coincidencia con el patrón.",
    prueba:
      "Cambia el primer emoji del constructor: el patrón se construye con él.",
    codigo: `const buscado = emojis[0] || "🍎";
const patron = new RegExp(buscado);
console.log("Patrón:", patron);
console.log("¿Aparece en el texto?", patron.test(texto));
return {
  buscado: buscado,
  coincide: patron.test(texto),
  texto: texto,
};`,
  },

  "url-createobjecturl": {
    titulo: "Crea una URL temporal",
    descripcion:
      "URL.createObjectURL() genera una URL que apunta a un Blob en memoria, útil para descargas y previsualizaciones.",
    prueba:
      "Cambia el texto: el tamaño del Blob cambiará con los emojis.",
    entorno: ENTORNO_URL,
    preludio: PRELUDIO_URL,
    codigo: `const blob = new Blob([texto], { type: "text/plain" });
const url = URL.createObjectURL(blob);
console.log("Tamaño del Blob:", blob.size, "bytes");
return { url: url, tipo: blob.type, tamano: blob.size };`,
  },

  "url-revokeobjecturl": {
    titulo: "Libera la URL temporal",
    descripcion:
      "URL.revokeObjectURL() invalida una URL creada con createObjectURL() para liberar memoria.",
    prueba:
      "Observa que la URL se crea y se revoca en la misma ejecución.",
    entorno: ENTORNO_URL,
    preludio: PRELUDIO_URL,
    codigo: `const blob = new Blob([texto], { type: "text/plain" });
const url = URL.createObjectURL(blob);
console.log("Antes de revocar:", URL._creadas.length);
URL.revokeObjectURL(url);
return {
  url: url,
  restantes: URL._creadas.length,
  revocada: !URL._creadas.some((item) => item.url === url),
};`,
  },

  btoa: {
    titulo: "Codifica en base64",
    descripcion:
      "btoa() codifica una cadena ASCII en base64. Aquí codificamos un resumen del array, porque los emojis no son ASCII.",
    prueba:
      "Cambia la cantidad de emojis y observa cómo cambia la cadena codificada.",
    codigo: `const original = "emojis:" + emojis.length + ";longitud:" + emojis.join("-").length;
const codificado = btoa(original);
console.log("Base64:", codificado);
return codificado;`,
  },

  atob: {
    titulo: "Decodifica base64",
    descripcion:
      "atob() recupera la cadena original a partir de un texto codificado en base64.",
    prueba:
      "Decodifica el resultado de btoa() y comprueba que coincide con el original.",
    codigo: `const original = "emojis:" + emojis.length;
const codificado = btoa(original);
const decodificado = atob(codificado);
console.log("Base64:", codificado);
console.log("Decodificado:", decodificado);
return { original: original, decodificado: decodificado, iguales: original === decodificado };`,
  },

  encodeuricomponent: {
    titulo: "Codifica para una URL",
    descripcion:
      "encodeURIComponent() escapa caracteres especiales para poder enviarlos dentro de una URL.",
    prueba:
      "Los emojis se convierten en secuencias %F0%9F... y los espacios en %20.",
    codigo: `const codificado = encodeURIComponent(texto);
console.log("Original:", texto);
console.log("Codificado:", codificado);
return {
  codificado: codificado,
  longitudOriginal: texto.length,
  longitudCodificada: codificado.length,
};`,
  },

  decodeuricomponent: {
    titulo: "Recupera el texto de una URL",
    descripcion:
      "decodeURIComponent() deshace la codificación de encodeURIComponent().",
    prueba:
      "Compara el texto original con el recuperado: deben ser idénticos.",
    codigo: `const codificado = encodeURIComponent(texto);
const recuperado = decodeURIComponent(codificado);
console.log("Codificado:", codificado);
console.log("Recuperado:", recuperado);
return { recuperado: recuperado, iguales: recuperado === texto };`,
  },

  /* ---------------- Historial ---------------- */

  "history-back": {
    titulo: "Vuelve a la página anterior",
    descripcion:
      "history.back() navega una entrada hacia atrás en el historial del navegador.",
    prueba:
      "Mira el pathname antes y después: el historial simulado guarda ambas páginas.",
    entorno: ENTORNO_HISTORY,
    preludio: PRELUDIO_HISTORY,
    codigo: `history.pushState({ paso: 1 }, "", "/emojis");
history.pushState({ paso: 2 }, "", "/emojis/detalle");
console.log("Antes:", location.pathname);
history.back();
console.log("Después:", location.pathname);
return { pathname: location.pathname, entradas: history.length };`,
  },

  "history-forward": {
    titulo: "Avanza a la página siguiente",
    descripcion:
      "history.forward() navega una entrada hacia delante, si existe en el historial.",
    prueba:
      "Retrocede y avanza: el pathname vuelve a la segunda página.",
    entorno: ENTORNO_HISTORY,
    preludio: PRELUDIO_HISTORY,
    codigo: `history.pushState({ paso: 1 }, "", "/inicio");
history.pushState({ paso: 2 }, "", "/galeria");
history.back();
console.log("Tras back:", location.pathname);
history.forward();
console.log("Tras forward:", location.pathname);
return { pathname: location.pathname, entradas: history.length };`,
  },

  "history-go": {
    titulo: "Salta varias entradas",
    descripcion:
      "history.go(delta) se mueve el número de entradas indicado: negativo hacia atrás y positivo hacia delante.",
    prueba:
      "Cambia el salto por 2 o -1 y observa el pathname resultante.",
    entorno: ENTORNO_HISTORY,
    preludio: PRELUDIO_HISTORY,
    codigo: `history.pushState({ paso: 1 }, "", "/uno");
history.pushState({ paso: 2 }, "", "/dos");
history.pushState({ paso: 3 }, "", "/tres");
console.log("Actual:", location.pathname);
history.go(-2);
console.log("Tras go(-2):", location.pathname);
return { pathname: location.pathname, entradas: history.length };`,
  },

  "history-pushstate": {
    titulo: "Añade una entrada al historial",
    descripcion:
      "history.pushState() cambia la URL y guarda un estado sin recargar la página.",
    prueba:
      "El estado guardado se lee después con history.state.",
    entorno: ENTORNO_HISTORY,
    preludio: PRELUDIO_HISTORY,
    codigo: `const estado = { emojis: emojis.length, texto: texto };
history.pushState(estado, "", "/emojis/" + emojis.length);
console.log("Pathname:", location.pathname);
console.log("Estado:", history.state);
return { pathname: location.pathname, estado: history.state };`,
  },

  "history-replacestate": {
    titulo: "Reemplaza la entrada actual",
    descripcion:
      "history.replaceState() modifica la entrada actual sin crear una nueva.",
    prueba:
      "Compara history.length antes y después: no aumenta con replaceState().",
    entorno: ENTORNO_HISTORY,
    preludio: PRELUDIO_HISTORY,
    codigo: `history.pushState({ version: 1 }, "", "/borrador");
const antes = history.length;
history.replaceState({ version: 2, emojis: emojis.length }, "", "/publicado");
console.log("Entradas antes:", antes);
console.log("Entradas después:", history.length);
return {
  pathname: location.pathname,
  estado: history.state,
  nuevasEntradas: history.length - antes,
};`,
  },

  /* ---------------- Rendimiento ---------------- */

  "performance-now": {
    titulo: "Mide el tiempo transcurrido",
    descripcion:
      "performance.now() devuelve milisegundos de alta precisión desde que arrancó el entorno.",
    prueba:
      "Añade números: el bucle de cálculo tarda un poco más y la duración cambia.",
    codigo: `const inicio = performance.now();
let total = 0;
for (let i = 0; i < 50000; i += 1) {
  total += Math.sqrt(i + numeros.length);
}
const fin = performance.now();
console.log("Cálculo terminado:", total > 0);
return {
  duracionMs: Math.round((fin - inicio) * 100) / 100,
  precision: typeof performance.now(),
};`,
  },

  "performance-mark": {
    titulo: "Crea marcas de tiempo",
    descripcion:
      "performance.mark() guarda un instante con nombre para medir después operaciones concretas.",
    prueba:
      "Consulta las marcas con getEntriesByName() y observa sus tiempos.",
    codigo: `performance.clearMarks();
performance.mark("inicio");
for (let i = 0; i < Math.max(1, numeros.length) * 2000; i += 1) {
  Math.sqrt(i);
}
performance.mark("fin");
const marcas = performance.getEntriesByName("inicio").concat(
  performance.getEntriesByName("fin"),
);
console.log("Marcas:", marcas.map((marca) => marca.name));
return marcas.map((marca) => ({
  nombre: marca.name,
  tipo: marca.entryType,
  tiempo: Math.round(marca.startTime * 100) / 100,
}));`,
  },

  "performance-measure": {
    titulo: "Mide entre dos marcas",
    descripcion:
      "performance.measure() calcula la duración entre dos marcas y crea una entrada de medición.",
    prueba:
      "El número de operaciones depende de los emojis del constructor.",
    codigo: `performance.clearMarks();
performance.clearMeasures();
performance.mark("inicio");
let suma = 0;
for (let i = 0; i < Math.max(1, numeros.length) * 4000; i += 1) suma += Math.sqrt(i);
performance.mark("fin");
performance.measure("calculo", "inicio", "fin");
const medida = performance.getEntriesByName("calculo")[0];
console.log("Suma:", suma > 0);
return {
  nombre: medida.name,
  duracionMs: Math.round(medida.duration * 100) / 100,
};`,
  },

  /* ---------------- Notificaciones ---------------- */

  "notification-permission": {
    titulo: "Consulta el permiso actual",
    descripcion:
      "Notification.permission indica si las notificaciones están concedidas, denegadas o pendientes de pedir.",
    prueba:
      "El permiso simulado empieza en granted; prueba a cambiarlo en el editor.",
    entorno: ENTORNO_NOTIFICACIONES,
    preludio: PRELUDIO_NOTIFICACIONES,
    codigo: `const permiso = Notification.permission;
console.log("Permiso actual:", permiso);
return {
  permiso: permiso,
  puedeNotificar: permiso === "granted",
  disponible: typeof Notification !== "undefined",
};`,
  },

  "notification-requestpermission": {
    titulo: "Solicita permiso al usuario",
    descripcion:
      "Notification.requestPermission() pide autorización para mostrar notificaciones y devuelve una promesa con la respuesta.",
    prueba:
      "Observa el valor antes y después de la petición simulada.",
    entorno: ENTORNO_NOTIFICACIONES,
    preludio: PRELUDIO_NOTIFICACIONES,
    codigo: `console.log("Antes:", Notification.permission);
Notification.permission = "default";
const respuesta = await Notification.requestPermission();
console.log("Después:", respuesta);
return { respuesta: respuesta, permiso: Notification.permission };`,
  },

  "notification-constructor": {
    titulo: "Muestra una notificación",
    descripcion:
      "new Notification() crea un aviso del sistema con título y opciones como el cuerpo o el icono.",
    prueba:
      "El cuerpo de la notificación usa el texto del constructor de emojis.",
    entorno: ENTORNO_NOTIFICACIONES,
    preludio: PRELUDIO_NOTIFICACIONES,
    codigo: `if (Notification.permission !== "granted") {
  await Notification.requestPermission();
}
const aviso = new Notification("Nuevos emojis", {
  body: texto,
  icon: "/emoji.png",
});
console.log("Título:", aviso.title);
return {
  titulo: aviso.title,
  cuerpo: aviso.body,
  permiso: Notification.permission,
};`,
  },

  "push-subscribe": {
    titulo: "Suscríbete a notificaciones push",
    descripcion:
      "pushManager.subscribe() registra el navegador para recibir notificaciones push del servidor.",
    prueba:
      "La suscripción simulada devuelve un endpoint ficticio.",
    entorno: ENTORNO_NOTIFICACIONES,
    preludio: PRELUDIO_NOTIFICACIONES,
    codigo: `const registro = await navigator.serviceWorker.ready;
const suscripcion = await registro.pushManager.subscribe({
  userVisibleOnly: true,
});
console.log("Endpoint:", suscripcion.endpoint);
return {
  endpoint: suscripcion.endpoint,
  caduca: suscripcion.expirationTime,
  emojis: emojis.length,
};`,
  },

  /* ---------------- Navegador ---------------- */

  "navigator-share": {
    titulo: "Comparte contenido",
    descripcion:
      "navigator.share() abre el diálogo nativo de compartir del sistema con título, texto o URL.",
    prueba:
      "Cambia el texto del constructor para compartir otro contenido.",
    entorno: ENTORNO_NAVEGADOR,
    preludio: PRELUDIO_NAVEGADOR,
    codigo: `const datos = {
  title: "Mis emojis",
  text: texto,
  url: "https://ejemplo.com/emojis",
};
if (navigator.canShare(datos)) {
  await navigator.share(datos);
  console.log("Compartido");
}
return { compartido: true, texto: datos.text };`,
  },

  "navigator-canshare": {
    titulo: "Comprueba si se puede compartir",
    descripcion:
      "navigator.canShare() indica si el navegador puede compartir un conjunto de datos concreto.",
    prueba:
      "Prueba a quitar el texto: el resultado dependerá de los datos disponibles.",
    entorno: ENTORNO_NAVEGADOR,
    preludio: PRELUDIO_NAVEGADOR,
    codigo: `const conTexto = navigator.canShare({ text: texto });
const conUrl = navigator.canShare({ url: "https://ejemplo.com" });
const sinDatos = navigator.canShare({});
console.log({ conTexto: conTexto, conUrl: conUrl, sinDatos: sinDatos });
return { conTexto: conTexto, conUrl: conUrl, sinDatos: sinDatos };`,
  },

  "clipboard-writetext": {
    titulo: "Copia al portapapeles",
    descripcion:
      "navigator.clipboard.writeText() copia una cadena al portapapeles del usuario.",
    prueba:
      "El portapapeles simulado guarda el texto y permite leerlo después.",
    entorno: ENTORNO_NAVEGADOR,
    preludio: PRELUDIO_NAVEGADOR,
    codigo: `await navigator.clipboard.writeText(texto);
const recuperado = await navigator.clipboard.readText();
console.log("Copiado:", recuperado);
return { copiado: recuperado, longitud: recuperado.length };`,
  },

  "navigator-cookieenabled": {
    titulo: "Consulta el navegador",
    descripcion:
      "navigator.cookieEnabled y otras propiedades describen el entorno del usuario, como el idioma o si hay conexión.",
    prueba:
      "Estos valores son simulados, pero la estructura es la misma que ofrece el navegador.",
    entorno: ENTORNO_NAVEGADOR,
    preludio: PRELUDIO_NAVEGADOR,
    codigo: `return {
  cookies: navigator.cookieEnabled,
  idioma: navigator.language,
  conectado: navigator.onLine,
  agente: navigator.userAgent,
};`,
  },

  /* ---------------- DOM · Creación ---------------- */

  "dom-createelement": {
    titulo: "Crea un elemento",
    descripcion:
      "document.createElement() fabrica un elemento nuevo que después puedes configurar y añadir al documento.",
    prueba:
      "Cambia la etiqueta por \"button\" o \"p\" y observa el tagName.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const nuevo = document.createElement("li");
nuevo.textContent = emojis[0] || "⭐";
nuevo.className = "item nuevo";
console.log("Etiqueta:", nuevo.tagName);
return {
  tagName: nuevo.tagName,
  className: nuevo.className,
  texto: nuevo.textContent,
};`,
  },

  "dom-createtextnode": {
    titulo: "Crea un nodo de texto",
    descripcion:
      "document.createTextNode() crea un nodo de tipo texto que se puede insertar dentro de un elemento.",
    prueba:
      "Ejecuta con el array vacío: el nodo de texto seguirá existiendo.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const nodoTexto = document.createTextNode(texto);
const parrafo = document.createElement("p");
parrafo.appendChild(nodoTexto);
console.log("Tipo:", nodoTexto.nodeType);
return {
  nodeType: nodoTexto.nodeType,
  nodeName: nodoTexto.nodeName,
  contenido: parrafo.textContent,
};`,
  },

  "dom-append": {
    titulo: "Añade varios nodos",
    descripcion:
      "append() añade uno o varios nodos y cadenas de texto al final de un elemento.",
    prueba:
      "Añade más emojis para comprobar que append() acepta varios argumentos.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const nuevo = document.createElement("li");
nuevo.textContent = emojis[0] || "⭐";
lista.append(nuevo, " ✅");
console.log("Hijos totales:", lista.children.length);
return {
  hijos: lista.children.length,
  ultimo: lista.lastChild.textContent,
};`,
  },

  "dom-appendchild": {
    titulo: "Añade un hijo",
    descripcion:
      "appendChild() inserta un nodo como último hijo y devuelve ese mismo nodo.",
    prueba:
      "El nodo devuelto es el mismo que acabas de crear.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const nuevo = document.createElement("li");
nuevo.textContent = "Nuevo: " + (emojis[0] || "⭐");
const devuelto = lista.appendChild(nuevo);
console.log("Mismo nodo:", devuelto === nuevo);
return {
  mismoNodo: devuelto === nuevo,
  total: lista.children.length,
  texto: devuelto.textContent,
};`,
  },

  "dom-insertbefore": {
    titulo: "Inserta antes de otro nodo",
    descripcion:
      "insertBefore() coloca un nodo justo antes de la referencia indicada.",
    prueba:
      "Mira el orden de los textos: el nuevo elemento debe quedar primero.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const primero = lista.firstElementChild;
const nuevo = document.createElement("li");
nuevo.textContent = "⭐ Primero";
lista.insertBefore(nuevo, primero);
console.log("Primero ahora:", lista.firstElementChild.textContent);
return Array.from(lista.children).map((item) => item.textContent);`,
  },

  "dom-replacechildren": {
    titulo: "Reemplaza todos los hijos",
    descripcion:
      "replaceChildren() vacía el elemento y coloca los nuevos nodos en una sola operación.",
    prueba:
      "Cambia slice(0, 3) para conservar más o menos emojis.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const nuevos = emojis.slice(0, 3).map((emoji, indice) => {
  const item = document.createElement("li");
  item.className = "item";
  item.textContent = indice + 1 + ". " + emoji;
  return item;
});
console.log("Antes:", lista.children.length);
lista.replaceChildren(...nuevos);
console.log("Después:", lista.children.length);
return Array.from(lista.children).map((item) => item.textContent);`,
  },

  "dom-replacewith": {
    titulo: "Sustituye un nodo",
    descripcion:
      "replaceWith() cambia el nodo actual por uno o varios nodos nuevos.",
    prueba:
      "El primer <li> se sustituye por uno que contiene el primer emoji.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const primero = lista.firstElementChild;
if (!primero) return { textos: [] };
const reemplazo = document.createElement("li");
reemplazo.className = "item destacado";
reemplazo.textContent = "✨ " + (emojis[0] || "⭐");
primero.replaceWith(reemplazo);
console.log("Sigue en la lista:", lista.contains(primero));
return Array.from(lista.children).map((item) => item.textContent);`,
  },

  "dom-remove": {
    titulo: "Elimina un nodo",
    descripcion:
      "remove() elimina el elemento de su padre sin necesidad de referenciar al padre.",
    prueba:
      "Vacía el array y observa qué ocurre cuando no queda ningún <li>.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const ultimo = lista.lastElementChild;
if (ultimo) {
  const textoEliminado = ultimo.textContent;
  ultimo.remove();
  console.log("Eliminado:", textoEliminado);
  return { eliminado: textoEliminado, restantes: lista.children.length };
}
return { eliminado: null, restantes: 0 };`,
  },

  "dom-removechild": {
    titulo: "Quita un hijo concreto",
    descripcion:
      "removeChild() elimina un nodo hijo y lo devuelve para poder reutilizarlo.",
    prueba:
      "El nodo devuelto conserva su contenido aunque ya no esté en el árbol.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const ultimo = lista.lastElementChild;
if (!ultimo) return { eliminado: null, restantes: 0 };
const eliminado = lista.removeChild(ultimo);
console.log("Fuera del árbol:", eliminado.parentNode === null);
return {
  eliminado: eliminado.textContent,
  restantes: lista.children.length,
  padre: eliminado.parentNode,
};`,
  },

  /* ---------------- DOM · Contenido y atributos ---------------- */

  "dom-getattribute": {
    titulo: "Lee un atributo",
    descripcion:
      "getAttribute() devuelve el valor de un atributo o null si no existe.",
    prueba:
      "Consulta también un atributo que no exista para ver el null.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
console.log("id:", caja.getAttribute("id"));
console.log("class:", caja.getAttribute("class"));
console.log("data-x:", caja.getAttribute("data-x"));
return {
  id: caja.getAttribute("id"),
  clase: caja.getAttribute("class"),
  inexistente: caja.getAttribute("data-x"),
};`,
  },

  "dom-setattribute": {
    titulo: "Escribe un atributo",
    descripcion:
      "setAttribute() crea o modifica un atributo del elemento.",
    prueba:
      "El atributo data-emoji guarda el primer emoji del constructor.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
caja.setAttribute("data-emoji", emojis[0] || "⭐");
caja.setAttribute("aria-label", "Caja con " + emojis.length + " emojis");
return {
  emoji: caja.getAttribute("data-emoji"),
  etiqueta: caja.getAttribute("aria-label"),
};`,
  },

  "dom-hasattribute": {
    titulo: "Comprueba un atributo",
    descripcion:
      "hasAttribute() devuelve true si el atributo existe, aunque su valor esté vacío.",
    prueba:
      "Añade el atributo data-demo y vuelve a comprobar.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
const antes = caja.hasAttribute("data-demo");
caja.setAttribute("data-demo", "sí");
const despues = caja.hasAttribute("data-demo");
console.log({ antes: antes, despues: despues });
return { antes: antes, despues: despues, id: caja.hasAttribute("id") };`,
  },

  "dom-removeattribute": {
    titulo: "Borra un atributo",
    descripcion:
      "removeAttribute() elimina un atributo del elemento y getAttribute() pasa a devolver null.",
    prueba:
      "Observa el valor antes y después de eliminar el atributo.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
caja.setAttribute("data-demo", emojis.length);
const antes = caja.getAttribute("data-demo");
caja.removeAttribute("data-demo");
return {
  antes: antes,
  despues: caja.getAttribute("data-demo"),
  existe: caja.hasAttribute("data-demo"),
};`,
  },

  "dom-classname": {
    titulo: "Cambia la clase completa",
    descripcion:
      "className lee o reemplaza todas las clases del elemento con una cadena.",
    prueba:
      "Al asignar una cadena nueva, las clases anteriores desaparecen.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
console.log("Antes:", caja.className);
caja.className = "caja resaltada con-" + emojis.length;
console.log("Después:", caja.className);
return { antes: "caja", despues: caja.className };`,
  },

  "dom-classlist": {
    titulo: "Consulta la lista de clases",
    descripcion:
      "classList ofrece métodos para leer y modificar las clases sin reconstruir la cadena completa.",
    prueba:
      "Comprueba si la caja tiene las clases caja y activa.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
caja.classList.add("activa");
return {
  clases: caja.className,
  tieneCaja: caja.classList.contains("caja"),
  tieneActiva: caja.classList.contains("activa"),
  tieneOculta: caja.classList.contains("oculta"),
};`,
  },

  "dom-classlist-add": {
    titulo: "Añade clases",
    descripcion:
      "classList.add() añade una o varias clases sin duplicarlas.",
    prueba:
      "Añade dos clases y observa cómo se combinan con la existente.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
caja.classList.add("activa", "destacada");
caja.classList.add("activa");
console.log("Clases:", caja.className);
return { clases: caja.className, total: caja.className.split(" ").length };`,
  },

  "dom-classlist-remove": {
    titulo: "Quita clases",
    descripcion:
      "classList.remove() elimina las clases indicadas y no falla si no existen.",
    prueba:
      "Quita una clase que no exista para comprobar que no lanza error.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
caja.classList.add("activa", "destacada");
caja.classList.remove("destacada", "inexistente");
console.log("Clases:", caja.className);
return {
  clases: caja.className,
  tieneDestacada: caja.classList.contains("destacada"),
  tieneActiva: caja.classList.contains("activa"),
};`,
  },

  "dom-classlist-toggle": {
    titulo: "Alterna una clase",
    descripcion:
      "classList.toggle() añade la clase si no estaba y la quita si ya existía.",
    prueba:
      "El valor devuelto indica si la clase quedó activa tras la llamada.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
const primero = caja.classList.toggle("activa");
const segundo = caja.classList.toggle("activa");
console.log({ primero: primero, segundo: segundo });
return {
  primero: primero,
  segundo: segundo,
  clases: caja.className,
};`,
  },

  "dom-classlist-contains": {
    titulo: "Pregunta por una clase",
    descripcion:
      "classList.contains() devuelve true si el elemento tiene exactamente esa clase.",
    prueba:
      "La comparación distingue mayúsculas y coincide con la clase completa.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
caja.classList.add("activa");
return {
  caja: caja.classList.contains("caja"),
  activa: caja.classList.contains("activa"),
  activ: caja.classList.contains("activ"),
};`,
  },

  "dom-innerhtml": {
    titulo: "Escribe HTML interno",
    descripcion:
      "innerHTML lee o reemplaza el contenido HTML de un elemento.",
    prueba:
      "El texto de los emojis se envuelve en una etiqueta strong.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
caja.innerHTML = "<strong>" + texto + "</strong>";
console.log("HTML:", caja.innerHTML);
return {
  html: caja.innerHTML,
  textoPlano: caja.textContent,
};`,
  },

  "dom-innertext": {
    titulo: "Texto visible",
    descripcion:
      "innerText representa el texto visible del elemento, respetando cómo se muestra en pantalla.",
    prueba:
      "innerText y textContent coinciden en este ejemplo sin estilos ocultos.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
caja.innerText = "Texto visible: " + texto;
console.log(caja.innerText);
return {
  innerText: caja.innerText,
  textContent: caja.textContent,
  iguales: caja.innerText === caja.textContent,
};`,
  },

  "dom-textcontent": {
    titulo: "Texto completo",
    descripcion:
      "textContent lee o reemplaza todo el texto de un nodo y de sus descendientes.",
    prueba:
      "Al asignar textContent se eliminan los hijos y se crea un único nodo de texto.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
caja.textContent = emojis.join(" · ");
console.log("Texto:", caja.textContent);
return {
  texto: caja.textContent,
  hijos: caja.children.length,
  longitud: caja.textContent.length,
};`,
  },

  /* ---------------- DOM · Navegación de nodos ---------------- */

  "dom-parentelement": {
    titulo: "Sube al elemento padre",
    descripcion:
      "parentElement devuelve el elemento que contiene al nodo actual.",
    prueba:
      "Cada <li> tiene como padre la lista con id lista.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const item = lista.firstElementChild;
if (!item) return { padre: null };
return {
  texto: item.textContent,
  padre: item.parentElement.id,
  padreEtiqueta: item.parentElement.tagName,
};`,
  },

  "dom-childnodes": {
    titulo: "Lista todos los nodos hijos",
    descripcion:
      "childNodes incluye todos los nodos hijos, tanto elementos como nodos de texto.",
    prueba:
      "Cada emoji del constructor añade un <li> a la lista.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const nombres = Array.from(lista.childNodes).map((nodo) => nodo.nodeName);
console.log("Nodos:", nombres);
return { cantidad: nombres.length, nombres: nombres };`,
  },

  "dom-firstchild": {
    titulo: "Primer nodo hijo",
    descripcion:
      "firstChild devuelve el primer nodo hijo, sea elemento o texto.",
    prueba:
      "Observa que en este DOM simulado no hay nodos de texto entre etiquetas.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const primero = lista.firstChild;
if (!primero) return { primero: null };
return {
  primero: primero.nodeName,
  tipo: primero.nodeType,
  texto: primero.textContent || null,
};`,
  },

  "dom-firstelementchild": {
    titulo: "Primer elemento hijo",
    descripcion:
      "firstElementChild ignora los nodos de texto y devuelve el primer elemento.",
    prueba:
      "Es la opción recomendada cuando solo interesan etiquetas HTML.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const primero = lista.firstElementChild;
if (!primero) return { primero: null };
return {
  primero: primero.tagName,
  texto: primero.textContent,
  clase: primero.className,
};`,
  },

  "dom-lastchild": {
    titulo: "Último nodo hijo",
    descripcion:
      "lastChild devuelve el último nodo hijo del elemento.",
    prueba:
      "Añade emojis al constructor: el último nodo cambia.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const ultimo = lista.lastChild;
if (!ultimo) return { ultimo: null };
return {
  ultimo: ultimo.nodeName,
  tipo: ultimo.nodeType,
  texto: ultimo.textContent || null,
};`,
  },

  "dom-lastelementchild": {
    titulo: "Último elemento hijo",
    descripcion:
      "lastElementChild devuelve el último hijo que sea un elemento HTML.",
    prueba:
      "Coincide con el último emoji de la lista.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const ultimo = lista.lastElementChild;
if (!ultimo) return { ultimo: null };
return {
  ultimo: ultimo.tagName,
  texto: ultimo.textContent,
  indice: lista.children.length - 1,
};`,
  },

  "dom-nextelementsibling": {
    titulo: "Hermano siguiente",
    descripcion:
      "nextElementSibling devuelve el siguiente elemento hermano, ignorando nodos de texto.",
    prueba:
      "El primer <li> tiene como siguiente al segundo emoji.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const primero = lista.firstElementChild;
const siguiente = primero ? primero.nextElementSibling : null;
return {
  actual: primero ? primero.textContent : null,
  siguiente: siguiente ? siguiente.textContent : null,
};`,
  },

  "dom-previouselementsibling": {
    titulo: "Hermano anterior",
    descripcion:
      "previousElementSibling devuelve el elemento hermano que está justo antes.",
    prueba:
      "El segundo <li> tiene como anterior al primer emoji.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const segundo = lista.children[1] || null;
const anterior = segundo ? segundo.previousElementSibling : null;
return {
  actual: segundo ? segundo.textContent : null,
  anterior: anterior ? anterior.textContent : null,
};`,
  },

  "dom-nodename": {
    titulo: "Nombre del nodo",
    descripcion:
      "nodeName devuelve el nombre del nodo: la etiqueta en mayúsculas para elementos y #text para textos.",
    prueba:
      "Compara el nombre de un elemento con el de un nodo de texto.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const elemento = document.getElementById("miCaja");
const nodoTexto = document.createTextNode(texto);
return {
  elemento: elemento.nodeName,
  texto: nodoTexto.nodeName,
  documento: document.documentElement.nodeName,
};`,
  },

  "dom-nodetype": {
    titulo: "Tipo de nodo",
    descripcion:
      "nodeType identifica la clase de nodo: 1 para elementos y 3 para nodos de texto.",
    prueba:
      "Estos dos valores son los más habituales al recorrer el DOM.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const elemento = document.getElementById("lista");
const nodoTexto = document.createTextNode(texto);
return {
  elemento: { nombre: elemento.nodeName, tipo: elemento.nodeType },
  texto: { nombre: nodoTexto.nodeName, tipo: nodoTexto.nodeType },
  esElemento: elemento.nodeType === 1,
  esTexto: nodoTexto.nodeType === 3,
};`,
  },

  "dom-nodecontains": {
    titulo: "Comprueba si contiene un nodo",
    descripcion:
      "contains() indica si un nodo está dentro de otro, incluyendo descendientes profundos.",
    prueba:
      "La lista contiene sus <li>, pero el título no.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const item = lista.firstElementChild;
const titulo = document.getElementById("titulo");
return {
  listaContieneItem: item ? lista.contains(item) : false,
  tituloContieneItem: item ? titulo.contains(item) : false,
  listaSeContiene: lista.contains(lista),
};`,
  },

  /* ---------------- Eventos y diálogos ---------------- */

  "ev-addlistener": {
    titulo: "Escucha un evento",
    descripcion:
      "addEventListener() registra una función que se ejecuta cada vez que ocurre el evento indicado.",
    prueba:
      "El ejemplo simula dos clics y cuenta cuántas veces se ejecuta el listener.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
let clics = 0;
caja.addEventListener("click", () => {
  clics += 1;
  console.log("Clic número", clics);
});
caja.click();
caja.click();
return { clics: clics, escuchando: clics === 2 };`,
  },

  "ev-removelistener": {
    titulo: "Deja de escuchar",
    descripcion:
      "removeEventListener() elimina un listener registrado previamente con la misma función.",
    prueba:
      "Tras eliminarlo, el segundo clic ya no incrementa el contador.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
let clics = 0;
const manejar = () => {
  clics += 1;
};
caja.addEventListener("click", manejar);
caja.click();
caja.removeEventListener("click", manejar);
caja.click();
console.log("Clics contados:", clics);
return { clics: clics, eliminado: clics === 1 };`,
  },

  "ev-dispatchevent": {
    titulo: "Lanza un evento personalizado",
    descripcion:
      "dispatchEvent() dispara un evento manualmente para que los listeners registrados lo reciban.",
    prueba:
      "El detail del CustomEvent transporta datos entre quien lo lanza y quien lo escucha.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
let recibido = null;
caja.addEventListener("saludo", (evento) => {
  recibido = evento.detail;
  console.log("Saludo recibido:", recibido);
});
const evento = new CustomEventoDOM("saludo", {
  bubbles: true,
  detail: { total: emojis.length, texto: texto },
});
const noCancelado = caja.dispatchEvent(evento);
return {
  recibido: recibido,
  noCancelado: noCancelado,
  burbujea: evento.bubbles,
};`,
  },

  "ev-preventdefault": {
    titulo: "Evita la acción por defecto",
    descripcion:
      "preventDefault() cancela el comportamiento nativo del evento, como seguir un enlace o enviar un formulario.",
    prueba:
      "dispatchEvent() devuelve false cuando el evento fue cancelado.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
caja.addEventListener("click", (evento) => {
  evento.preventDefault();
  console.log("Acción por defecto cancelada");
});
const evento = new EventoDOM("click", { bubbles: true });
const resultado = caja.dispatchEvent(evento);
return {
  defaultPrevented: evento.defaultPrevented,
  resultadoDispatch: resultado,
};`,
  },

  "ev-stoppropagation": {
    titulo: "Detén la propagación",
    descripcion:
      "stopPropagation() evita que el evento suba a los ancestros, pero deja terminar los listeners del nodo actual.",
    prueba:
      "El listener del <li> se ejecuta, pero el de la lista no.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const lista = document.getElementById("lista");
const item = lista.firstElementChild;
if (!item) return { hijo: 0, padre: 0 };
let enHijo = 0;
let enPadre = 0;
item.addEventListener("click", (evento) => {
  enHijo += 1;
  evento.stopPropagation();
});
lista.addEventListener("click", () => {
  enPadre += 1;
});
item.click();
return { hijo: enHijo, padre: enPadre };`,
  },

  "ev-stopimmediatepropagation": {
    titulo: "Detén también los demás listeners",
    descripcion:
      "stopImmediatePropagation() bloquea la propagación y los listeners restantes del mismo nodo.",
    prueba:
      "El segundo listener del mismo elemento no llega a ejecutarse.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
let primero = 0;
let segundo = 0;
caja.addEventListener("click", (evento) => {
  primero += 1;
  evento.stopImmediatePropagation();
});
caja.addEventListener("click", () => {
  segundo += 1;
});
caja.click();
return { primero: primero, segundo: segundo, bloqueado: segundo === 0 };`,
  },

  "dlg-alert": {
    titulo: "Muestra una alerta",
    descripcion:
      "alert() muestra un mensaje modal y detiene la interacción hasta que el usuario lo cierra.",
    prueba:
      "En el sandbox la alerta se registra en la consola en lugar de abrir una ventana.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `alert("Emojis disponibles: " + emojis.length + " · " + texto);
console.log("Alerta mostrada");
return "Alerta simulada correctamente";`,
  },

  "dlg-confirm": {
    titulo: "Pide una confirmación",
    descripcion:
      "confirm() muestra una pregunta con Aceptar y Cancelar, y devuelve true o false.",
    prueba:
      "La respuesta simulada es true; cambia el mensaje y vuelve a ejecutar.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const respuesta = confirm("¿Quieres conservar " + emojis.length + " emojis?");
console.log("Respuesta:", respuesta);
return { respuesta: respuesta, conserva: respuesta ? emojis : [] };`,
  },

  "dlg-prompt": {
    titulo: "Pide un texto",
    descripcion:
      "prompt() muestra un campo de texto modal y devuelve lo escrito o null si se cancela.",
    prueba:
      "La respuesta simulada reutiliza el primer emoji del constructor.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const respuesta = prompt("¿Qué emoji prefieres?", emojis[0] || "⭐");
console.log("Respuesta:", respuesta);
return {
  respuesta: respuesta,
  coincide: respuesta === (emojis[0] || "⭐"),
};`,
  },

  /* ---------------- Media y geolocalización ---------------- */

  "media-gettracks": {
    titulo: "Consulta todas las pistas",
    descripcion:
      "MediaStream.getTracks() devuelve las pistas de audio y vídeo que forman un stream.",
    prueba:
      "Cambia las restricciones de getUserMedia para pedir solo audio o solo vídeo.",
    entorno: ENTORNO_MEDIA_GEO,
    preludio: PRELUDIO_MEDIA_GEO,
    codigo: `const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
});
const pistas = stream.getTracks();
console.log("Pistas:", pistas.length);
return pistas.map((pista) => ({
  tipo: pista.kind,
  etiqueta: pista.label,
  estado: pista.readyState,
}));`,
  },

  "media-getaudiotracks": {
    titulo: "Solo las pistas de audio",
    descripcion:
      "getAudioTracks() filtra el stream y devuelve únicamente las pistas de micrófono.",
    prueba:
      "Pide solo vídeo y observa que el array de audio queda vacío.",
    entorno: ENTORNO_MEDIA_GEO,
    preludio: PRELUDIO_MEDIA_GEO,
    codigo: `const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: false,
});
const audio = stream.getAudioTracks();
console.log("Pistas de audio:", audio.length);
return audio.map((pista) => ({ tipo: pista.kind, etiqueta: pista.label }));`,
  },

  "media-getvideotracks": {
    titulo: "Solo las pistas de vídeo",
    descripcion:
      "getVideoTracks() devuelve las pistas procedentes de la cámara.",
    prueba:
      "Pide solo audio y comprueba que no hay pistas de vídeo.",
    entorno: ENTORNO_MEDIA_GEO,
    preludio: PRELUDIO_MEDIA_GEO,
    codigo: `const stream = await navigator.mediaDevices.getUserMedia({
  audio: false,
  video: true,
});
const video = stream.getVideoTracks();
console.log("Pistas de vídeo:", video.length);
return video.map((pista) => ({ tipo: pista.kind, etiqueta: pista.label }));`,
  },

  "media-trackstop": {
    titulo: "Detén una pista",
    descripcion:
      "track.stop() apaga la captura de una pista y libera la cámara o el micrófono.",
    prueba:
      "El estado pasa de live a ended después de llamar a stop().",
    entorno: ENTORNO_MEDIA_GEO,
    preludio: PRELUDIO_MEDIA_GEO,
    codigo: `const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
});
const pista = stream.getTracks()[0];
const antes = pista.readyState;
pista.stop();
console.log("Antes:", antes, "· Después:", pista.readyState);
return { antes: antes, despues: pista.readyState, detenida: pista.readyState === "ended" };`,
  },

  "geo-navigator": {
    titulo: "Comprueba la geolocalización",
    descripcion:
      "navigator.geolocation existe cuando el navegador puede solicitar la ubicación del usuario.",
    prueba:
      "Comprueba la disponibilidad antes de llamar a getCurrentPosition().",
    entorno: ENTORNO_MEDIA_GEO,
    preludio: PRELUDIO_MEDIA_GEO,
    codigo: `const disponible = Boolean(navigator.geolocation);
console.log("¿Geolocalización disponible?", disponible);
return {
  disponible: disponible,
  metodos: disponible
    ? ["getCurrentPosition", "watchPosition", "clearWatch"]
    : [],
};`,
  },

  "geo-getcurrentposition": {
    titulo: "Obtén la ubicación actual",
    descripcion:
      "getCurrentPosition() pide una única lectura de la ubicación y la entrega en un callback.",
    prueba:
      "Las coordenadas son simuladas, pero la forma del objeto es la real.",
    entorno: ENTORNO_MEDIA_GEO,
    preludio: PRELUDIO_MEDIA_GEO,
    codigo: `const posicion = await new Promise((resolver) => {
  navigator.geolocation.getCurrentPosition(resolver);
});
console.log("Latitud:", posicion.coords.latitude);
return {
  latitud: posicion.coords.latitude,
  longitud: posicion.coords.longitude,
  precision: posicion.coords.accuracy,
};`,
  },

  "geo-watchposition": {
    titulo: "Observa la posición",
    descripcion:
      "watchPosition() entrega lecturas repetidas cada vez que cambia la ubicación.",
    prueba:
      "El ejemplo espera varias lecturas simuladas y después cancela la observación.",
    entorno: ENTORNO_MEDIA_GEO,
    preludio: PRELUDIO_MEDIA_GEO,
    codigo: `const lecturas = [];
const id = navigator.geolocation.watchPosition((posicion) => {
  lecturas.push(posicion.coords.latitude);
  console.log("Lectura", lecturas.length, posicion.coords.latitude.toFixed(4));
});
await new Promise((resolver) => setTimeout(resolver, 160));
navigator.geolocation.clearWatch(id);
return { lecturas: lecturas.length, latitudes: lecturas };`,
  },

  "geo-clearwatch": {
    titulo: "Cancela la observación",
    descripcion:
      "clearWatch() detiene las actualizaciones iniciadas con watchPosition().",
    prueba:
      "Tras cancelar, dejan de llegar lecturas nuevas.",
    entorno: ENTORNO_MEDIA_GEO,
    preludio: PRELUDIO_MEDIA_GEO,
    codigo: `let lecturas = 0;
const id = navigator.geolocation.watchPosition(() => {
  lecturas += 1;
});
await new Promise((resolver) => setTimeout(resolver, 45));
navigator.geolocation.clearWatch(id);
await new Promise((resolver) => setTimeout(resolver, 120));
return {
  lecturas: lecturas,
  cancelada: lecturas <= 1,
};`,
  },

  /* ---------------- Math ---------------- */

  "math-abs": {
    titulo: "Valor absoluto",
    descripcion:
      "Math.abs() devuelve la distancia de un número hasta cero, sin signo.",
    prueba:
      "Añade números negativos y observa cómo se convierten en positivos.",
    codigo: `return {
  absolutos: numeros.map((numero) => Math.abs(numero)),
  primero: numeros.length ? Math.abs(numeros[0]) : null,
};`,
  },

  "math-ceil": {
    titulo: "Redondea hacia arriba",
    descripcion:
      "Math.ceil() devuelve el entero más pequeño que es mayor o igual que el número.",
    prueba:
      "Prueba con 7.5 y -2: el redondeo siempre sube.",
    codigo: `return numeros.map((numero) => Math.ceil(numero));`,
  },

  "math-floor": {
    titulo: "Redondea hacia abajo",
    descripcion:
      "Math.floor() devuelve el entero más grande que es menor o igual que el número.",
    prueba:
      "Compara floor y ceil con los mismos valores negativos.",
    codigo: `return numeros.map((numero) => Math.floor(numero));`,
  },

  "math-round": {
    titulo: "Redondea al más cercano",
    descripcion:
      "Math.round() redondea al entero más próximo; los valores .5 suben.",
    prueba:
      "Añade 2.5 y -2.5 para ver el comportamiento en el punto medio.",
    codigo: `return numeros.map((numero) => Math.round(numero));`,
  },

  "math-trunc": {
    titulo: "Corta los decimales",
    descripcion:
      "Math.trunc() elimina la parte decimal sin redondear, acercándose a cero.",
    prueba:
      "Compara trunc con floor y round usando números negativos.",
    codigo: `return numeros.map((numero) => Math.trunc(numero));`,
  },

  "math-pow": {
    titulo: "Potencia",
    descripcion:
      "Math.pow(base, exponente) eleva la base al exponente indicado.",
    prueba:
      "El primer número de la lista es la base y el exponente es 3.",
    codigo: `const base = Number.isFinite(numeros[0]) ? numeros[0] : 2;
return {
  base: base,
  exponente: 3,
  potencia: Math.pow(base, 3),
};`,
  },

  "math-sqrt": {
    titulo: "Raíz cuadrada",
    descripcion:
      "Math.sqrt() devuelve la raíz cuadrada de un número no negativo.",
    prueba:
      "El ejemplo usa el valor absoluto para evitar NaN con negativos.",
    codigo: `const valor = Math.abs(Number.isFinite(numeros[0]) ? numeros[0] : 16);
return {
  valor: valor,
  raiz: Math.sqrt(valor),
  comprobacion: Math.sqrt(valor) ** 2,
};`,
  },

  "math-log": {
    titulo: "Logaritmo natural",
    descripcion:
      "Math.log() devuelve el logaritmo natural (base e) del número.",
    prueba:
      "Con 0 devuelve -Infinity; el ejemplo evita ese caso usando e como reserva.",
    codigo: `const valor = Math.abs(Number.isFinite(numeros[0]) ? numeros[0] : Math.E) || Math.E;
return {
  valor: valor,
  logaritmo: Math.log(valor),
  baseE: Math.E,
};`,
  },

  "math-min": {
    titulo: "El número más pequeño",
    descripcion:
      "Math.min() devuelve el menor de los valores recibidos.",
    prueba:
      "Vacía la lista para ver el valor de reserva Infinity.",
    codigo: `if (numeros.length === 0) return { minimo: null, nota: "La lista está vacía" };
const minimo = Math.min(...numeros);
console.log("Mínimo:", minimo);
return { minimo: minimo, total: numeros.length };`,
  },

  "math-max": {
    titulo: "El número más grande",
    descripcion:
      "Math.max() devuelve el mayor de los valores recibidos.",
    prueba:
      "Añade un número muy grande y comprueba cómo cambia el máximo.",
    codigo: `if (numeros.length === 0) return { maximo: null, nota: "La lista está vacía" };
const maximo = Math.max(...numeros);
console.log("Máximo:", maximo);
return { maximo: maximo, total: numeros.length };`,
  },

  "math-random": {
    titulo: "Número aleatorio",
    descripcion:
      "Math.random() devuelve un decimal entre 0 (incluido) y 1 (excluido).",
    prueba:
      "Ejecuta varias veces: cada ejecución obtiene valores distintos.",
    codigo: `const decimal = Math.random();
const entero = 1 + Math.floor(decimal * 100);
console.log("Decimal:", decimal);
return { decimal: decimal, entero1a100: entero, numeros: numeros.length };`,
  },

  "math-sin": {
    titulo: "Seno",
    descripcion:
      "Math.sin() devuelve el seno de un ángulo expresado en radianes.",
    prueba:
      "El ejemplo convierte el primer número de grados a radianes.",
    codigo: `const grados = Number.isFinite(numeros[0]) ? numeros[0] : 45;
const radianes = (grados * Math.PI) / 180;
return {
  grados: grados,
  radianes: radianes,
  seno: Math.sin(radianes),
};`,
  },

  "math-cos": {
    titulo: "Coseno",
    descripcion:
      "Math.cos() devuelve el coseno de un ángulo expresado en radianes.",
    prueba:
      "Prueba con 0 y con 180 para obtener 1 y -1.",
    codigo: `const grados = Number.isFinite(numeros[0]) ? numeros[0] : 0;
const radianes = (grados * Math.PI) / 180;
return {
  grados: grados,
  radianes: radianes,
  coseno: Math.cos(radianes),
};`,
  },

  "math-atan2": {
    titulo: "Ángulo entre dos puntos",
    descripcion:
      "Math.atan2(y, x) devuelve el ángulo en radianes entre el eje X y el punto (x, y).",
    prueba:
      "El primer número es y y el segundo es x; el resultado va de -π a π.",
    codigo: `const y = Number.isFinite(numeros[0]) ? numeros[0] : 1;
const x = Number.isFinite(numeros[1]) ? numeros[1] : 1;
const radianes = Math.atan2(y, x);
return {
  y: y,
  x: x,
  radianes: radianes,
  grados: (radianes * 180) / Math.PI,
};`,
  },

  "math-pi": {
    titulo: "La constante PI",
    descripcion:
      "Math.PI contiene la relación entre la circunferencia y el diámetro de un círculo.",
    prueba:
      "El primer número se usa como radio para calcular la circunferencia.",
    codigo: `const radio = Math.abs(Number.isFinite(numeros[0]) ? numeros[0] : 2);
return {
  pi: Math.PI,
  radio: radio,
  circunferencia: 2 * Math.PI * radio,
  area: Math.PI * radio ** 2,
};`,
  },

  /* ---------------- Estilos · CSSOM ---------------- */

  "estilos-getcomputedstyle": {
    titulo: "Lee los estilos calculados",
    descripcion:
      "getComputedStyle() devuelve los estilos finales de un elemento, después de aplicar CSS y valores por defecto.",
    prueba:
      "Consulta color, font-size y display del elemento #miCaja.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
const estilo = getComputedStyle(caja);
return {
  color: estilo.getPropertyValue("color"),
  tamanoFuente: estilo.getPropertyValue("font-size"),
  display: estilo.getPropertyValue("display"),
  colorDirecto: estilo.color,
};`,
  },

  "estilos-getpropertyvalue": {
    titulo: "Consulta una propiedad concreta",
    descripcion:
      "getPropertyValue() lee una propiedad CSS del objeto de estilos calculados.",
    prueba:
      "Cambia la propiedad consultada por background-color o font-size.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
caja.style.setProperty("color", "rgb(244, 114, 182)");
const estilo = getComputedStyle(caja);
console.log("Color:", estilo.getPropertyValue("color"));
return {
  color: estilo.getPropertyValue("color"),
  fondo: estilo.getPropertyValue("background-color"),
};`,
  },

  "estilos-setproperty": {
    titulo: "Escribe una propiedad CSS",
    descripcion:
      "style.setProperty() modifica una propiedad CSS concreta del elemento.",
    prueba:
      "El tamaño y el color de fondo cambian y se leen con getPropertyValue().",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const caja = document.getElementById("miCaja");
caja.style.setProperty("background-color", "rgb(30, 64, 175)");
caja.style.setProperty("font-size", (14 + emojis.length) + "px");
return {
  fondo: caja.style.getPropertyValue("background-color"),
  tamano: caja.style.getPropertyValue("font-size"),
  totalEmojis: emojis.length,
};`,
  },

  "estilos-scrollto": {
    titulo: "Desplaza la página",
    descripcion:
      "window.scrollTo() mueve el scroll de la ventana a unas coordenadas concretas.",
    prueba:
      "El primer número de la lista se usa como posición vertical.",
    entorno: ENTORNO_DOM_COMPLETO,
    preludio: PRELUDIO_DOM_COMPLETO,
    codigo: `const destino = Number.isFinite(numeros[0]) ? Math.abs(numeros[0]) : 120;
window.scrollTo(0, destino);
return {
  x: window.scrollX,
  y: window.scrollY,
  destino: destino,
};`,
  },

  /* ---------------- Cámaras y grabación ---------------- */

  "medios-getusermedia": {
    titulo: "Pide cámara y micrófono",
    descripcion:
      "navigator.mediaDevices.getUserMedia() solicita acceso a la cámara o al micrófono y devuelve un MediaStream.",
    prueba:
      "Las pistas simuladas muestran qué dispositivos se han solicitado.",
    entorno: ENTORNO_MEDIA_GEO,
    preludio: PRELUDIO_MEDIA_GEO,
    codigo: `const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
});
const pistas = stream.getTracks();
console.log("Stream:", stream.id);
return {
  id: stream.id,
  pistas: pistas.length,
  tipos: pistas.map((pista) => pista.kind),
};`,
  },

  "medios-start": {
    titulo: "Empieza a grabar",
    descripcion:
      "MediaRecorder.start() comienza a capturar el contenido del stream.",
    prueba:
      "Observa el estado antes y después de start().",
    entorno: ENTORNO_MEDIA_GEO,
    preludio: PRELUDIO_MEDIA_GEO,
    codigo: `const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
});
const grabador = new MediaRecorder(stream);
console.log("Antes:", grabador.state);
grabador.start();
console.log("Después:", grabador.state);
return { antes: "inactive", despues: grabador.state, tipo: grabador.mimeType };`,
  },

  "medios-istypesupported": {
    titulo: "Comprueba el formato",
    descripcion:
      "MediaRecorder.isTypeSupported() indica si el navegador puede grabar en un formato concreto.",
    prueba:
      "Compara video/webm con un formato inventado.",
    entorno: ENTORNO_MEDIA_GEO,
    preludio: PRELUDIO_MEDIA_GEO,
    codigo: `const formatos = ["video/webm", "audio/webm", "video/mp4", "video/desconocido"];
return formatos.map((formato) => ({
  formato: formato,
  soportado: MediaRecorder.isTypeSupported(formato),
}));`,
  },

  "medios-ondataavailable": {
    titulo: "Recibe los datos grabados",
    descripcion:
      "El evento dataavailable entrega los fragmentos de vídeo o audio cuando están listos.",
    prueba:
      "El ejemplo espera al evento y muestra el tamaño del primer fragmento.",
    entorno: ENTORNO_MEDIA_GEO,
    preludio: PRELUDIO_MEDIA_GEO,
    codigo: `const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
});
const grabador = new MediaRecorder(stream);
const datos = await new Promise((resolver) => {
  grabador.ondataavailable = (evento) => resolver(evento.data);
  grabador.start();
  setTimeout(() => grabador.stop(), 80);
});
console.log("Fragmento:", datos.size, "bytes");
return { tamano: datos.size, tipo: grabador.mimeType, estado: grabador.state };`,
  },

  "medios-stop": {
    titulo: "Detén la grabación",
    descripcion:
      "MediaRecorder.stop() finaliza la grabación y libera los recursos del stream.",
    prueba:
      "El estado vuelve a inactive cuando termina la grabación.",
    entorno: ENTORNO_MEDIA_GEO,
    preludio: PRELUDIO_MEDIA_GEO,
    codigo: `const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: false,
});
const grabador = new MediaRecorder(stream);
grabador.start();
const durante = grabador.state;
grabador.stop();
return {
  durante: durante,
  despues: grabador.state,
  detenido: grabador.state === "inactive",
};`,
  },

  /* ---------------- Red y conexión ---------------- */

  "red-online": {
    titulo: "Consulta la conexión",
    descripcion:
      "navigator.onLine y navigator.connection describen si hay conexión y su calidad estimada.",
    prueba:
      "Estos valores son simulados, pero permiten practicar la misma lógica.",
    entorno: ENTORNO_RED,
    preludio: PRELUDIO_RED,
    codigo: `const conexion = navigator.connection || {};
return {
  conectado: navigator.onLine,
  tipo: conexion.effectiveType || "desconocido",
  bajadaMbps: conexion.downlink || null,
  latenciaMs: conexion.rtt || null,
};`,
  },

  "red-urlsearchparams": {
    titulo: "Construye parámetros de URL",
    descripcion:
      "URLSearchParams permite crear, leer y modificar los parámetros de una URL.",
    prueba:
      "El texto de los emojis viaja codificado en el parámetro texto.",
    entorno: ENTORNO_RED,
    preludio: PRELUDIO_RED,
    codigo: `const params = new URLSearchParams();
params.set("texto", texto);
params.set("total", String(emojis.length));
params.append("emoji", emojis[0] || "⭐");
console.log("Query:", params.toString());
return {
  query: params.toString(),
  texto: params.get("texto"),
  emojis: params.getAll("emoji"),
};`,
  },

  "red-abort": {
    titulo: "Cancela una petición",
    descripcion:
      "AbortController permite cancelar una petición fetch a través de su signal.",
    prueba:
      "La petición simulada termina con un error de tipo AbortError.",
    entorno: ENTORNO_RED,
    preludio: PRELUDIO_RED,
    codigo: `const controlador = new AbortController();
const peticion = fetch("https://api.ejemplo.com/lento", {
  signal: controlador.signal,
});
controlador.abort();
try {
  await peticion;
  return "La petición terminó inesperadamente";
} catch (error) {
  console.log("Cancelada:", error.name);
  return { error: error.name, abortada: controlador.signal.aborted };
}`,
  },

  /* ---------------- Console API ---------------- */

  "console-log": {
    titulo: "Registra un mensaje",
    descripcion:
      "console.log() muestra valores en la consola y es la herramienta básica de depuración.",
    prueba:
      "Puedes pasar varios argumentos: se muestran separados por espacios.",
    codigo: `console.log("Emojis:", emojis, "Total:", emojis.length);
return emojis.length;`,
  },

  "console-error": {
    titulo: "Registra un error",
    descripcion:
      "console.error() muestra un mensaje con nivel de error, útil para fallos que deben destacar.",
    prueba:
      "El mensaje aparece con el icono de error en la consola del sandbox.",
    codigo: `if (emojis.length === 0) {
  console.error("No hay emojis en el array");
  return 0;
}
console.error("Ejemplo de error con", emojis.length, "emojis");
return emojis.length;`,
  },

  "console-warn": {
    titulo: "Registra una advertencia",
    descripcion:
      "console.warn() muestra un aviso que no detiene la ejecución.",
    prueba:
      "El nivel warn se distingue del error y del log normal.",
    codigo: `console.warn("Cuidado: el array tiene", emojis.length, "elementos");
console.warn("Contenido:", emojis.join(" "));
return emojis.length;`,
  },

  "console-info": {
    titulo: "Registra información",
    descripcion:
      "console.info() presenta información general, con un nivel distinto al log habitual.",
    prueba:
      "Úsalo para datos de contexto que no son errores ni advertencias.",
    codigo: `console.info("Ejecutando con", emojis.length, "emojis");
console.info("Primer emoji:", emojis[0] || "ninguno");
return { total: emojis.length, muestra: emojis.slice(0, 2) };`,
  },

  "console-debug": {
    titulo: "Registra depuración",
    descripcion:
      "console.debug() está pensado para mensajes detallados de depuración.",
    prueba:
      "Puedes mostrar el array completo para inspeccionar su contenido.",
    codigo: `console.debug("Array completo:", emojis);
console.debug("Índices:", emojis.map((emoji, indice) => indice + ":" + emoji));
return emojis.length;`,
  },

  "console-assert": {
    titulo: "Comprueba una condición",
    descripcion:
      "console.assert() solo muestra el mensaje cuando la condición es falsa.",
    prueba:
      "Vacía el array para provocar el mensaje de fallo.",
    codigo: `const hayEmojis = emojis.length > 0;
console.assert(hayEmojis, "El array no debería estar vacío", emojis);
console.assert(emojis.length < 10, "Demasiados emojis", emojis.length);
return { hayEmojis: hayEmojis, total: emojis.length };`,
  },

  "console-clear": {
    titulo: "Limpia la consola",
    descripcion:
      "console.clear() solicita borrar el contenido de la consola.",
    prueba:
      "En el sandbox se registra la limpieza y el mensaje posterior sigue visible.",
    codigo: `console.log("Mensaje antes de limpiar");
console.clear();
console.log("Mensaje después de limpiar");
return emojis.length;`,
  },

  "console-count": {
    titulo: "Cuenta cuántas veces",
    descripcion:
      "console.count() incrementa un contador con etiqueta cada vez que se llama.",
    prueba:
      "Cada etiqueta mantiene su propio contador independiente.",
    codigo: `console.count("emojis");
console.count("emojis");
console.count("otro");
console.count("emojis");
return emojis.length;`,
  },

  "console-count-reset": {
    titulo: "Reinicia un contador",
    descripcion:
      "console.countReset() pone a cero el contador de una etiqueta.",
    prueba:
      "Observa cómo la cuenta vuelve a 1 después del reset.",
    codigo: `console.count("peticiones");
console.count("peticiones");
console.countReset("peticiones");
console.count("peticiones");
return emojis.length;`,
  },

  "console-group": {
    titulo: "Agrupa mensajes",
    descripcion:
      "console.group() agrupa y sangra los mensajes siguientes para organizar la salida.",
    prueba:
      "Los grupos anidados aumentan la sangría; groupEnd la reduce.",
    codigo: `console.group("Array de emojis");
console.log("Total:", emojis.length);
console.group("Detalle");
console.log("Primero:", emojis[0] || "ninguno");
console.log("Último:", emojis[emojis.length - 1] || "ninguno");
console.groupEnd();
console.groupEnd();
console.log("Mensaje fuera del grupo");
return emojis.length;`,
  },

  "console-group-end": {
    titulo: "Cierra un grupo",
    descripcion:
      "console.groupEnd() cierra el grupo abierto más recientemente.",
    prueba:
      "El mensaje posterior a groupEnd() vuelve al nivel principal.",
    codigo: `console.group("Grupo");
console.log("Dentro del grupo");
console.groupEnd();
console.log("Fuera del grupo");
return emojis.length;`,
  },

  "console-table": {
    titulo: "Muestra una tabla",
    descripcion:
      "console.table() presenta arrays y objetos como tablas para comparar datos fácilmente.",
    prueba:
      "Cada fila muestra el índice y el emoji correspondiente.",
    codigo: `const filas = emojis.map((emoji, indice) => ({
  indice: indice,
  emoji: emoji,
  longitud: emoji.length,
}));
console.table(filas);
return filas;`,
  },

  "console-dirxml": {
    titulo: "Muestra la estructura",
    descripcion:
      "console.dirxml() presenta la estructura de un objeto o nodo de forma jerárquica.",
    prueba:
      "Aquí se aplica a un objeto con el array de emojis.",
    codigo: `console.dirxml({ total: emojis.length, emojis: emojis });
return emojis.length;`,
  },

  "console-time": {
    titulo: "Mide una operación",
    descripcion:
      "console.time() inicia un cronómetro y console.timeEnd() muestra el tiempo transcurrido.",
    prueba:
      "El tiempo depende de la velocidad del worker; ejecuta varias veces.",
    codigo: `console.time("recorrido");
let suma = 0;
for (let i = 0; i < 100000; i += 1) suma += Math.sqrt(i);
console.timeEnd("recorrido");
return suma > 0;`,
  },

  "console-time-log": {
    titulo: "Registra tiempos intermedios",
    descripcion:
      "console.timeLog() muestra el tiempo transcurrido sin detener el cronómetro.",
    prueba:
      "Se registra un tiempo intermedio y luego el tiempo final.",
    codigo: `console.time("proceso");
let total = 0;
for (let i = 0; i < 50000; i += 1) total += i;
console.timeLog("proceso", "mitad");
for (let i = 0; i < 50000; i += 1) total += i;
console.timeEnd("proceso");
return total;`,
  },

  "console-time-end": {
    titulo: "Detén el cronómetro",
    descripcion:
      "console.timeEnd() detiene el cronómetro asociado a una etiqueta y muestra el total.",
    prueba:
      "Después de timeEnd() la etiqueta deja de existir hasta un nuevo time().",
    codigo: `console.time("suma");
const total = emojis.length * 1000;
console.timeEnd("suma");
return { total: total, etiqueta: "suma" };`,
  },

  "console-time-stamp": {
    titulo: "Marca un instante",
    descripcion:
      "console.timeStamp() añade una marca temporal a la línea de tiempo de las herramientas de desarrollo.",
    prueba:
      "El sandbox registra cada marca con su fecha y hora.",
    codigo: `console.timeStamp("inicio");
await new Promise((resolver) => setTimeout(resolver, 80));
console.timeStamp("fin");
return { emojis: emojis.length, esperaMs: 80 };`,
  },

  "console-trace": {
    titulo: "Muestra la pila de llamadas",
    descripcion:
      "console.trace() imprime el camino de funciones que llevó hasta ese punto.",
    prueba:
      "La traza ayuda a localizar desde dónde se llamó a una función.",
    codigo: `const revisar = (indice) => {
  console.trace("Revisando emoji", indice);
  return emojis[indice] || null;
};
const resultado = revisar(0);
return { resultado: resultado, total: emojis.length };`,
  },

  // __EXTRA_SECCIONES__
};

/* ============================================================
   Reparto de categorías (constructor de datos)
   ============================================================ */

const IDS_ARRAY_EXTRA = [
  "structuredclone",
  "console-log",
  "console-error",
  "console-warn",
  "console-info",
  "console-debug",
  "console-assert",
  "console-clear",
  "console-count",
  "console-count-reset",
  "console-group",
  "console-group-end",
  "console-table",
  "console-dirxml",
  "console-time",
  "console-time-log",
  "console-time-end",
  "console-time-stamp",
  "console-trace",
];

const IDS_NUMERO_EXTRA = [
  "promise-all",
  "promise-allsettled",
  "promise-any",
  "promise-resolve",
  "performance-now",
  "performance-mark",
  "performance-measure",
  "math-abs",
  "math-ceil",
  "math-floor",
  "math-round",
  "math-trunc",
  "math-pow",
  "math-sqrt",
  "math-log",
  "math-min",
  "math-max",
  "math-random",
  "math-sin",
  "math-cos",
  "math-atan2",
  "math-pi",
  "estilos-scrollto",
];

const IDS_TEXTO_EXTRA = Object.keys(EXTRA_CONFIGS).filter(
  (id) => !IDS_ARRAY_EXTRA.includes(id) && !IDS_NUMERO_EXTRA.includes(id),
);

export const EXTRA_CATEGORIAS = Object.fromEntries([
  ...IDS_ARRAY_EXTRA.map((id) => [id, "array"]),
  ...IDS_NUMERO_EXTRA.map((id) => [id, "numero"]),
  ...IDS_TEXTO_EXTRA.map((id) => [id, "texto"]),
]);

export { EXTRA_CONFIGS, PRELUDIO_DOM_COMPLETO };
