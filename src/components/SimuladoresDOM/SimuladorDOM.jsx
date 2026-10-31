import { useEffect, useRef, useState } from "react";
import MarcoSimulador from "../SimuladoresJS/MarcoSimulador";
import "../SimuladoresJS/SimuladoresJS.css";
import "./SimuladoresDOM.css";

const SANDBOX_HTML = `
<div id="demo-raiz" class="demo-raiz">
  <h3 id="demo-titulo" class="demo-titulo" data-rol="titulo">Lista de tareas</h3>
  <ul id="demo-lista" class="demo-lista">
    <li class="demo-item activo">Aprender selectores</li>
    <li class="demo-item">Manipular el DOM</li>
    <li class="demo-item">Crear proyectos</li>
  </ul>
  <p id="demo-texto" class="demo-texto" data-rol="texto" title="Texto de ejemplo">Texto de ejemplo</p>
  <button id="demo-boton" class="demo-boton activo" data-estado="inicial">Botón de prueba</button>
</div>`;

const TARGETS = [
  { value: "#demo-titulo", label: "h3#demo-titulo" },
  { value: "#demo-lista", label: "ul#demo-lista" },
  { value: "#demo-lista .demo-item:nth-child(1)", label: "li · primero" },
  { value: "#demo-lista .demo-item:nth-child(2)", label: "li · segundo" },
  { value: "#demo-lista .demo-item:nth-child(3)", label: "li · tercero" },
  { value: "#demo-texto", label: "p#demo-texto" },
  { value: "#demo-boton", label: "button#demo-boton" },
];

const SELECCION = new Set([
  "dom-getelementbyid",
  "dom-getelementsbyclassname",
  "dom-getelementsbytagname",
  "dom-queryselector",
  "dom-queryselectorall",
]);

const CONTENIDO = new Set(["dom-innerhtml", "dom-innertext", "dom-textcontent"]);

const ATRIBUTOS = new Set([
  "dom-getattribute",
  "dom-setattribute",
  "dom-hasattribute",
  "dom-removeattribute",
]);

const CLASES = new Set([
  "dom-classname",
  "dom-classlist",
  "dom-classlist-add",
  "dom-classlist-remove",
  "dom-classlist-toggle",
  "dom-classlist-contains",
]);

const NODOS = new Set([
  "dom-parentelement",
  "dom-childnodes",
  "dom-firstchild",
  "dom-firstelementchild",
  "dom-lastchild",
  "dom-lastelementchild",
  "dom-nextelementsibling",
  "dom-previouselementsibling",
  "dom-nodename",
  "dom-nodetype",
  "dom-nodecontains",
]);

const CREACION = new Set([
  "dom-createelement",
  "dom-createtextnode",
  "dom-append",
  "dom-appendchild",
  "dom-insertbefore",
  "dom-replacechildren",
  "dom-replacewith",
  "dom-remove",
  "dom-removechild",
]);

const NODE_TYPES = {
  1: "ELEMENT_NODE",
  2: "ATTRIBUTE_NODE",
  3: "TEXT_NODE",
  8: "COMMENT_NODE",
  9: "DOCUMENT_NODE",
  10: "DOCUMENT_TYPE_NODE",
  11: "DOCUMENT_FRAGMENT_NODE",
};

const SELECTOR_POR_METODO = {
  "dom-getelementbyid": { label: "id (sin #)", value: "demo-titulo" },
  "dom-getelementsbyclassname": { label: "clase(s)", value: "demo-item" },
  "dom-getelementsbytagname": { label: "etiqueta", value: "li" },
  "dom-queryselector": { label: "selector CSS", value: "#demo-lista .demo-item" },
  "dom-queryselectorall": { label: "selector CSS", value: ".demo-item" },
};

const describir = (node) => {
  if (!node) return "null";
  if (node.nodeType === 3) return `#text "${node.textContent.trim()}"`;
  if (node.nodeType === 8) return "#comment";
  if (node.nodeType === 9) return "#document";
  if (node.nodeType === 11) return "#document-fragment";
  const tag = node.tagName ? node.tagName.toLowerCase() : "nodo";
  const id = node.id ? `#${node.id}` : "";
  const clases =
    typeof node.className === "string" && node.className.trim()
      ? `.${node.className.trim().split(/\s+/).join(".")}`
      : "";
  return `<${tag}${id}${clases}>`;
};

const valorLegible = (valor) => {
  if (valor === null) return "null";
  if (valor === undefined) return "undefined";
  if (typeof valor === "string") return valor;
  if (typeof valor === "number" || typeof valor === "boolean") return String(valor);
  if (valor?.nodeType) return describir(valor);
  return String(valor);
};

export default function SimuladorDOM({ metodoId }) {
  const rootRef = useRef(null);
  const pendingRef = useRef(null);
  const [log, setLog] = useState([]);
  const [salida, setSalida] = useState(null);
  const [selector, setSelector] = useState(
    SELECTOR_POR_METODO[metodoId]?.value ?? "demo-titulo",
  );
  const [target, setTarget] = useState("#demo-texto");
  const [attrName, setAttrName] = useState("title");
  const [attrValue, setAttrValue] = useState("valor desde el simulador");
  const [clase, setClase] = useState("destacado");
  const [force, setForce] = useState("auto");
  const [contenido, setContenido] = useState(
    metodoId === "dom-innerhtml"
      ? "<strong>HTML inyectado</strong>"
      : "Nuevo contenido desde el simulador",
  );
  const [tagName, setTagName] = useState("li");
  const [textoNodo, setTextoNodo] = useState("Nuevo elemento");
  const [parentSel, setParentSel] = useState("#demo-lista");
  const [refSel, setRefSel] = useState("#demo-lista .demo-item:nth-child(1)");
  const [pending, setPending] = useState(null);
  const [clases, setClases] = useState([]);
  const [tick, setTick] = useState(0);

  const modo = SELECCION.has(metodoId)
    ? "seleccion"
    : CONTENIDO.has(metodoId)
      ? "contenido"
      : ATRIBUTOS.has(metodoId)
        ? "atributos"
        : CLASES.has(metodoId)
          ? "clases"
          : NODOS.has(metodoId)
            ? "nodos"
            : CREACION.has(metodoId)
              ? "creacion"
              : "seleccion";

  const pushLog = (tipo, texto) =>
    setLog((prev) => [...prev.slice(-24), { tipo, texto, id: Date.now() + Math.random() }]);

  const root = () => rootRef.current;

  const clearHighlights = () => {
    root()?.querySelectorAll(".dom-resaltado").forEach((el) => {
      el.classList.remove("dom-resaltado");
    });
  };

  const highlight = (node) => {
    if (!node) return;
    if (node.nodeType === 3) {
      node.parentElement?.classList.add("dom-resaltado");
      return;
    }
    if (node.nodeType === 1) node.classList.add("dom-resaltado");
  };

  const reset = () => {
    if (root()) root().innerHTML = SANDBOX_HTML;
    pendingRef.current = null;
    setPending(null);
    setSalida(null);
    setLog([]);
    setTick((t) => t + 1);
  };

  useEffect(() => {
    if (root()) root().innerHTML = SANDBOX_HTML;
  }, []);

  const el = (selectorCss) => root()?.querySelector(selectorCss) ?? null;

  useEffect(() => {
    const actual = el(target);
    setClases(actual ? [...actual.classList] : []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, tick]);

  /* ---------------- Selección ---------------- */
  const ejecutarSeleccion = () => {
    const r = root();
    if (!r) return;
    let resultado;
    let api = "";
    try {
      if (metodoId === "dom-getelementbyid") {
        api = `document.getElementById("${selector}")`;
        resultado = document.getElementById(selector);
      } else if (metodoId === "dom-getelementsbyclassname") {
        api = `document.getElementsByClassName("${selector}")`;
        resultado = r.getElementsByClassName(selector);
      } else if (metodoId === "dom-getelementsbytagname") {
        api = `document.getElementsByTagName("${selector}")`;
        resultado = r.getElementsByTagName(selector);
      } else if (metodoId === "dom-queryselectorall") {
        api = `document.querySelectorAll("${selector}")`;
        resultado = r.querySelectorAll(selector);
      } else {
        api = `document.querySelector("${selector}")`;
        resultado = r.querySelector(selector);
      }
    } catch (error) {
      setSalida({ texto: `${error.name}: ${error.message}`, tipo: "error" });
      pushLog("bad", `❌ ${error.name}: ${error.message}`);
      return;
    }

    const lista =
      resultado == null
        ? []
        : resultado.nodeType
          ? [resultado]
          : Array.from(resultado);

    clearHighlights();
    lista.forEach(highlight);

    const tipoColeccion = resultado?.nodeType
      ? resultado.nodeType === 1
        ? "Element"
        : "Node"
      : resultado
        ? resultado.constructor?.name ?? "colección"
        : "null";

    const detalle = lista.length
      ? lista.map((node, i) => `[${i}] ${describir(node)}`).join("\n")
      : "No se encontró ningún elemento.";

    setSalida({
      texto: `${api}\n\n${detalle}\n\nResultado: ${valorLegible(resultado)}\nCantidad: ${lista.length} · tipo: ${tipoColeccion}`,
      tipo: lista.length ? "ok" : "warn",
    });
    pushLog(lista.length ? "ok" : "warn", `${api} → ${lista.length} resultado(s)`);
  };

  /* ---------------- Contenido ---------------- */
  const propContenido =
    metodoId === "dom-innerhtml"
      ? "innerHTML"
      : metodoId === "dom-innertext"
        ? "innerText"
        : "textContent";

  const leerContenido = () => {
    const actual = el(target);
    if (!actual) {
      setSalida({ texto: "El elemento destino no existe.", tipo: "error" });
      return;
    }
    clearHighlights();
    highlight(actual);
    const valor = actual[propContenido];
    setSalida({
      texto: `${describir(actual)}.${propContenido}\n\n${valor}`,
      tipo: "ok",
    });
    pushLog("info", `Leído ${propContenido} (${String(valor).length} caracteres)`);
  };

  const escribirContenido = () => {
    const actual = el(target);
    if (!actual) {
      setSalida({ texto: "El elemento destino no existe.", tipo: "error" });
      return;
    }
    try {
      actual[propContenido] = contenido;
      clearHighlights();
      highlight(actual);
      setTick((t) => t + 1);
      setSalida({
        texto: `${describir(actual)}.${propContenido} = ${JSON.stringify(contenido)}\n\nResultado actual:\n${actual[propContenido]}`,
        tipo: "ok",
      });
      pushLog("ok", `Escrito ${propContenido} en ${describir(actual)}`);
    } catch (error) {
      setSalida({ texto: `${error.name}: ${error.message}`, tipo: "error" });
      pushLog("bad", `❌ ${error.message}`);
    }
  };

  /* ---------------- Atributos ---------------- */
  const ejecutarAtributo = () => {
    const actual = el(target);
    if (!actual) {
      setSalida({ texto: "El elemento destino no existe.", tipo: "error" });
      return;
    }
    clearHighlights();
    highlight(actual);
    const attrs = [...actual.attributes]
      .map((a) => `${a.name}="${a.value}"`)
      .join("\n");

    let encabezado = "";
    let valor;
    if (metodoId === "dom-getattribute") {
      encabezado = `getAttribute("${attrName}")`;
      valor = actual.getAttribute(attrName);
    } else if (metodoId === "dom-setattribute") {
      actual.setAttribute(attrName, attrValue);
      encabezado = `setAttribute("${attrName}", "${attrValue}")`;
      valor = actual.getAttribute(attrName);
    } else if (metodoId === "dom-hasattribute") {
      encabezado = `hasAttribute("${attrName}")`;
      valor = actual.hasAttribute(attrName);
    } else {
      actual.removeAttribute(attrName);
      encabezado = `removeAttribute("${attrName}")`;
      valor = actual.getAttribute(attrName);
    }

    setTick((t) => t + 1);
    setSalida({
      texto: `${describir(actual)}.${encabezado}\n\nResultado: ${valorLegible(valor)}\n\nAtributos actuales:\n${attrs || "(ninguno)"}`,
      tipo: "ok",
    });
    pushLog("ok", `${encabezado} → ${valorLegible(valor)}`);
  };

  /* ---------------- Clases ---------------- */
  const ejecutarClase = () => {
    const actual = el(target);
    if (!actual) {
      setSalida({ texto: "El elemento destino no existe.", tipo: "error" });
      return;
    }
    clearHighlights();
    highlight(actual);
    const clasesInput = clase.trim().split(/\s+/).filter(Boolean);
    let encabezado = "";
    let valor;

    if (metodoId === "dom-classname") {
      encabezado = "className";
      valor = actual.className;
    } else if (metodoId === "dom-classlist-add") {
      actual.classList.add(...clasesInput);
      encabezado = `classList.add(${clasesInput.map((c) => `"${c}"`).join(", ")})`;
      valor = [...actual.classList];
    } else if (metodoId === "dom-classlist-remove") {
      actual.classList.remove(...clasesInput);
      encabezado = `classList.remove(${clasesInput.map((c) => `"${c}"`).join(", ")})`;
      valor = [...actual.classList];
    } else if (metodoId === "dom-classlist-toggle") {
      const forceArg = force === "auto" ? undefined : force === "true";
      const resultado = actual.classList.toggle(clasesInput[0], forceArg);
      encabezado = `classList.toggle("${clasesInput[0]}"${force === "auto" ? "" : `, ${forceArg}`})`;
      valor = resultado;
    } else if (metodoId === "dom-classlist-contains") {
      encabezado = `classList.contains("${clasesInput[0]}")`;
      valor = actual.classList.contains(clasesInput[0]);
    } else {
      encabezado = "classList";
      valor = [...actual.classList];
    }

    setClases([...actual.classList]);
    setTick((t) => t + 1);
    setSalida({
      texto: `${describir(actual)}.${encabezado}\n\nResultado: ${valorLegible(valor)}\n\nClases actuales: ${[...actual.classList].join(" ") || "(ninguna)"}`,
      tipo: "ok",
    });
    pushLog("ok", `${encabezado} → ${valorLegible(valor)}`);
  };

  const escribirClassName = () => {
    const actual = el(target);
    if (!actual) return;
    actual.className = clase;
    clearHighlights();
    highlight(actual);
    setClases([...actual.classList]);
    setTick((t) => t + 1);
    setSalida({
      texto: `${describir(actual)}.className = "${clase}"\n\nNuevo className: ${actual.className}`,
      tipo: "ok",
    });
    pushLog("ok", `className actualizado a "${actual.className}"`);
  };

  /* ---------------- Navegación ---------------- */
  const propiedadesNodo = [
    ["dom-parentelement", "parentElement", (n) => n.parentElement],
    ["dom-childnodes", "childNodes", (n) => n.childNodes],
    ["dom-firstchild", "firstChild", (n) => n.firstChild],
    ["dom-firstelementchild", "firstElementChild", (n) => n.firstElementChild],
    ["dom-lastchild", "lastChild", (n) => n.lastChild],
    ["dom-lastelementchild", "lastElementChild", (n) => n.lastElementChild],
    ["dom-nextelementsibling", "nextElementSibling", (n) => n.nextElementSibling],
    ["dom-previouselementsibling", "previousElementSibling", (n) => n.previousElementSibling],
    ["dom-nodename", "nodeName", (n) => n.nodeName],
    ["dom-nodetype", "nodeType", (n) => n.nodeType],
  ];

  const ejecutarNodo = (propiedad, lector) => {
    const actual = el(target);
    if (!actual) {
      setSalida({ texto: "El nodo seleccionado no existe.", tipo: "error" });
      return;
    }
    clearHighlights();
    highlight(actual);
    const valor = lector(actual);
    if (valor?.nodeType) highlight(valor);

    let detalle;
    if (propiedad === "childNodes") {
      const hijos = Array.from(valor);
      detalle = hijos.length
        ? hijos
            .map((n, i) => `[${i}] ${describir(n)} · nodeType ${n.nodeType} (${NODE_TYPES[n.nodeType] ?? "?"})`)
            .join("\n")
        : "(sin nodos hijos)";
    } else if (propiedad === "nodeType") {
      detalle = `${valor} (${NODE_TYPES[valor] ?? "desconocido"})`;
    } else {
      detalle = valorLegible(valor);
    }

    setSalida({
      texto: `${describir(actual)}.${propiedad}\n\n${detalle}`,
      tipo: valor == null ? "warn" : "ok",
    });
    pushLog(valor == null ? "warn" : "ok", `${describir(actual)}.${propiedad} → ${valorLegible(valor)}`);
  };

  const ejecutarContains = () => {
    const actual = el(target);
    const otro = el(refSel);
    if (!actual || !otro) {
      setSalida({ texto: "Selecciona un nodo y un segundo nodo existentes.", tipo: "warn" });
      return;
    }
    clearHighlights();
    highlight(actual);
    highlight(otro);
    const resultado = actual.contains(otro);
    setSalida({
      texto: `${describir(actual)}.contains(${describir(otro)})\n\nResultado: ${resultado}\n\n${resultado ? "El segundo nodo SÍ está dentro del primero." : "El segundo nodo NO está dentro del primero."}`,
      tipo: "ok",
    });
    pushLog("ok", `contains() → ${resultado}`);
  };

  /* ---------------- Creación ---------------- */
  const setPendingNode = (node, etiqueta) => {
    pendingRef.current = node;
    setPending({ etiqueta, descripcion: describir(node) });
  };

  const crearElemento = () => {
    try {
      const nodo = document.createElement(tagName.trim() || "div");
      if (textoNodo) nodo.textContent = textoNodo;
      nodo.classList.add("demo-nuevo");
      setPendingNode(nodo, `document.createElement("${tagName}")`);
      setSalida({
        texto: `Nuevo elemento en memoria:\n${describir(nodo)}\n\nAún NO está en el documento. Usa append(), appendChild() o insertBefore().`,
        tipo: "info",
      });
      pushLog("info", `createElement("${tagName}") listo para insertar`);
    } catch (error) {
      setSalida({ texto: `${error.name}: ${error.message}`, tipo: "error" });
      pushLog("bad", `❌ ${error.message}`);
    }
  };

  const crearTexto = () => {
    const nodo = document.createTextNode(textoNodo);
    setPendingNode(nodo, `document.createTextNode("${textoNodo}")`);
    setSalida({
      texto: `Nuevo nodo de texto:\n${describir(nodo)}\n\nAún NO está en el documento.`,
      tipo: "info",
    });
    pushLog("info", "createTextNode() listo para insertar");
  };

  const insertar = (accion) => {
    const nodo = pendingRef.current;
    const padre = el(parentSel);
    const referencia = el(refSel);

    if (accion !== "remove" && accion !== "removeChild" && !nodo) {
      setSalida({ texto: "Primero crea un elemento o un nodo de texto.", tipo: "warn" });
      pushLog("warn", "No hay nodo pendiente");
      return;
    }

    try {
      if (accion === "appendChild") {
        if (!padre) throw new Error("El padre seleccionado no existe");
        padre.appendChild(nodo);
        pushLog("ok", `appendChild() → ${describir(nodo)} dentro de ${describir(padre)}`);
      } else if (accion === "append") {
        if (!padre) throw new Error("El padre seleccionado no existe");
        padre.append(nodo);
        pushLog("ok", `append() → ${describir(nodo)} dentro de ${describir(padre)}`);
      } else if (accion === "insertBefore") {
        if (!padre || !referencia) throw new Error("Padre o referencia inexistente");
        padre.insertBefore(nodo, referencia);
        pushLog("ok", `insertBefore() → antes de ${describir(referencia)}`);
      } else if (accion === "replaceChildren") {
        if (!padre) throw new Error("El padre seleccionado no existe");
        padre.replaceChildren(nodo);
        pushLog("ok", `replaceChildren() reemplazó los hijos de ${describir(padre)}`);
      } else if (accion === "replaceWith") {
        if (!referencia) throw new Error("La referencia a reemplazar no existe");
        referencia.replaceWith(nodo);
        pushLog("ok", `replaceWith() reemplazó ${describir(referencia)}`);
      } else if (accion === "remove") {
        if (!referencia) throw new Error("El elemento a eliminar no existe");
        referencia.remove();
        pushLog("ok", `remove() eliminó ${describir(referencia)}`);
      } else if (accion === "removeChild") {
        if (!padre || !referencia) throw new Error("Padre o hijo inexistente");
        padre.removeChild(referencia);
        pushLog("ok", `removeChild() eliminó ${describir(referencia)} de ${describir(padre)}`);
      }

      highlight(nodo?.nodeType === 1 ? nodo : nodo?.parentElement);
      setTick((t) => t + 1);
      setSalida({
        texto: `Acción: ${accion}\n\nHTML actual del laboratorio:\n${root()?.innerHTML ?? ""}`,
        tipo: "ok",
      });
    } catch (error) {
      setSalida({ texto: `${error.name}: ${error.message}`, tipo: "error" });
      pushLog("bad", `❌ ${error.name}: ${error.message}`);
    }
  };

  /* ---------------- Código equivalente ---------------- */
  const codigo = (() => {
    if (modo === "seleccion") {
      if (metodoId === "dom-getelementbyid") return `document.getElementById("${selector}");`;
      if (metodoId === "dom-getelementsbyclassname") return `document.getElementsByClassName("${selector}");`;
      if (metodoId === "dom-getelementsbytagname") return `document.getElementsByTagName("${selector}");`;
      if (metodoId === "dom-queryselectorall") return `document.querySelectorAll("${selector}");`;
      return `document.querySelector("${selector}");`;
    }
    if (modo === "contenido") {
      return `const elemento = document.querySelector("${target}");\n\nelemento.${propContenido};              // leer\nelemento.${propContenido} = ${JSON.stringify(contenido)}; // escribir`;
    }
    if (modo === "atributos") {
      const accion =
        metodoId === "dom-getattribute"
          ? `elemento.getAttribute("${attrName}");`
          : metodoId === "dom-setattribute"
            ? `elemento.setAttribute("${attrName}", "${attrValue}");`
            : metodoId === "dom-hasattribute"
              ? `elemento.hasAttribute("${attrName}");`
              : `elemento.removeAttribute("${attrName}");`;
      return `const elemento = document.querySelector("${target}");\n\n${accion}`;
    }
    if (modo === "clases") {
      if (metodoId === "dom-classname") {
        return `const elemento = document.querySelector("${target}");\n\nelemento.className;        // leer\nelemento.className = "${clase}"; // escribir`;
      }
      const accion =
        metodoId === "dom-classlist-add"
          ? `elemento.classList.add("${clase}");`
          : metodoId === "dom-classlist-remove"
            ? `elemento.classList.remove("${clase}");`
            : metodoId === "dom-classlist-toggle"
              ? `elemento.classList.toggle("${clase}"${force === "auto" ? "" : `, ${force === "true"}`});`
              : metodoId === "dom-classlist-contains"
                ? `elemento.classList.contains("${clase}");`
                : `elemento.classList; // DOMTokenList`;
      return `const elemento = document.querySelector("${target}");\n\n${accion}`;
    }
    if (modo === "nodos") {
      if (metodoId === "dom-nodecontains") {
        return `const padre = document.querySelector("${target}");\nconst otro = document.querySelector("${refSel}");\n\npadre.contains(otro);`;
      }
      const propiedad =
        propiedadesNodo.find(([id]) => id === metodoId)?.[1] ?? "parentElement";
      return `const nodo = document.querySelector("${target}");\n\nnodo.${propiedad};`;
    }
    if (metodoId === "dom-createelement") {
      return `const nuevo = document.createElement("${tagName}");\nnuevo.textContent = "${textoNodo}";`;
    }
    if (metodoId === "dom-createtextnode") {
      return `const texto = document.createTextNode("${textoNodo}");`;
    }
    if (metodoId === "dom-append") {
      return `const padre = document.querySelector("${parentSel}");\npadre.append(nuevo);`;
    }
    if (metodoId === "dom-appendchild") {
      return `const padre = document.querySelector("${parentSel}");\npadre.appendChild(nuevo);`;
    }
    if (metodoId === "dom-insertbefore") {
      return `const padre = document.querySelector("${parentSel}");\nconst referencia = document.querySelector("${refSel}");\npadre.insertBefore(nuevo, referencia);`;
    }
    if (metodoId === "dom-replacechildren") {
      return `const padre = document.querySelector("${parentSel}");\npadre.replaceChildren(nuevo);`;
    }
    if (metodoId === "dom-replacewith") {
      return `const referencia = document.querySelector("${refSel}");\nreferencia.replaceWith(nuevo);`;
    }
    if (metodoId === "dom-remove") {
      return `const elemento = document.querySelector("${refSel}");\nelemento.remove();`;
    }
    return `const padre = document.querySelector("${parentSel}");\nconst hijo = document.querySelector("${refSel}");\npadre.removeChild(hijo);`;
  })();

  const boton = (id) =>
    `sjs-btn${metodoId === id ? " sjs-btn--primary" : ""}`;

  return (
    <MarcoSimulador
      icon="🧪"
      titulo="Laboratorio del DOM"
      descripcion="Manipula un DOM real dentro de este laboratorio. Los cambios se aplican de verdad: puedes inspeccionar el resultado y ver el código equivalente."
      codigo={codigo}
      consola={
        log.length ? (
          log.map((linea) => (
            <div
              key={linea.id}
              className={`sjs-log__line sjs-log__line--${linea.tipo}`}
            >
              {linea.texto}
            </div>
          ))
        ) : (
          <span className="log-system">Interactúa con los controles para ver la actividad...</span>
        )
      }
      nota="💡 El panel izquierdo es HTML real. Abre las herramientas del navegador si quieres comprobar cómo cambia el árbol del DOM en vivo."
    >
      <div className="dom-lab">
        <div>
          <div className="sjs-card__label">
            <span>🌳 DOM en vivo</span>
            <button type="button" className="sjs-btn" onClick={reset}>
              🔄 Restaurar
            </button>
          </div>
          <div ref={rootRef} className="dom-lienzo" aria-label="Laboratorio DOM" />
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🎛️ Controles</span>
            <span className="sjs-tag">
              {modo === "seleccion"
                ? "selección"
                : modo === "nodos"
                  ? "navegación"
                  : modo}
            </span>
          </div>

          {modo === "seleccion" && (
            <>
              <label className="sjs-field">
                <span>{SELECTOR_POR_METODO[metodoId]?.label ?? "selector"}</span>
                <input
                  className="sjs-input"
                  value={selector}
                  onChange={(e) => setSelector(e.target.value)}
                  spellCheck={false}
                />
              </label>
              <div className="sjs-actions" style={{ marginTop: 12 }}>
                <button type="button" className="sjs-btn sjs-btn--primary" onClick={ejecutarSeleccion}>
                  ▶ Ejecutar selección
                </button>
              </div>
            </>
          )}

          {(modo === "contenido" || modo === "atributos" || modo === "clases") && (
            <label className="sjs-field">
              <span>Elemento destino</span>
              <select
                className="sjs-select"
                value={target}
                onChange={(e) => {
                  setTarget(e.target.value);
                  setSalida(null);
                }}
              >
                {TARGETS.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
          )}

          {modo === "contenido" && (
            <>
              <label className="sjs-field" style={{ marginTop: 12 }}>
                <span>{propContenido} a escribir</span>
                <textarea
                  className="sjs-textarea"
                  value={contenido}
                  onChange={(e) => setContenido(e.target.value)}
                  spellCheck={false}
                />
              </label>
              <div className="sjs-actions" style={{ marginTop: 12 }}>
                <button type="button" className="sjs-btn" onClick={leerContenido}>
                  👁️ Leer {propContenido}
                </button>
                <button type="button" className="sjs-btn sjs-btn--primary" onClick={escribirContenido}>
                  ✍️ Escribir {propContenido}
                </button>
              </div>
            </>
          )}

          {modo === "atributos" && (
            <>
              <label className="sjs-field" style={{ marginTop: 12 }}>
                <span>Nombre del atributo</span>
                <input
                  className="sjs-input"
                  value={attrName}
                  onChange={(e) => setAttrName(e.target.value)}
                  spellCheck={false}
                />
              </label>
              {metodoId === "dom-setattribute" && (
                <label className="sjs-field" style={{ marginTop: 12 }}>
                  <span>Valor</span>
                  <input
                    className="sjs-input"
                    value={attrValue}
                    onChange={(e) => setAttrValue(e.target.value)}
                    spellCheck={false}
                  />
                </label>
              )}
              <div className="sjs-actions" style={{ marginTop: 12 }}>
                <button type="button" className="sjs-btn sjs-btn--primary" onClick={ejecutarAtributo}>
                  ▶ Ejecutar{" "}
                  {metodoId === "dom-getattribute"
                    ? "getAttribute"
                    : metodoId === "dom-setattribute"
                      ? "setAttribute"
                      : metodoId === "dom-hasattribute"
                        ? "hasAttribute"
                        : "removeAttribute"}
                </button>
              </div>
            </>
          )}

          {modo === "clases" && (
            <>
              <label className="sjs-field" style={{ marginTop: 12 }}>
                <span>{metodoId === "dom-classname" ? "className completo" : "Clase(s)"}</span>
                <input
                  className="sjs-input"
                  value={clase}
                  onChange={(e) => setClase(e.target.value)}
                  spellCheck={false}
                />
              </label>

              {metodoId === "dom-classlist-toggle" && (
                <label className="sjs-field" style={{ marginTop: 12 }}>
                  <span>force</span>
                  <select
                    className="sjs-select"
                    value={force}
                    onChange={(e) => setForce(e.target.value)}
                  >
                    <option value="auto">Sin force (alterna)</option>
                    <option value="true">true (forzar añadir)</option>
                    <option value="false">false (forzar quitar)</option>
                  </select>
                </label>
              )}

              <div className="sjs-actions" style={{ marginTop: 12 }}>
                {metodoId === "dom-classname" ? (
                  <>
                    <button type="button" className="sjs-btn" onClick={ejecutarClase}>
                      👁️ Leer className
                    </button>
                    <button type="button" className="sjs-btn sjs-btn--primary" onClick={escribirClassName}>
                      ✍️ Escribir className
                    </button>
                  </>
                ) : (
                  <button type="button" className="sjs-btn sjs-btn--primary" onClick={ejecutarClase}>
                    ▶ Ejecutar{" "}
                    {metodoId === "dom-classlist-add"
                      ? "add()"
                      : metodoId === "dom-classlist-remove"
                        ? "remove()"
                        : metodoId === "dom-classlist-toggle"
                          ? "toggle()"
                          : metodoId === "dom-classlist-contains"
                            ? "contains()"
                            : "classList"}
                  </button>
                )}
              </div>

              <div className="dom-clases">
                {clases.length ? (
                  clases.map((c) => (
                    <span key={c} className="sjs-tag sjs-tag--info">
                      {c}
                    </span>
                  ))
                ) : (
                  <span className="sjs-empty">Sin clases</span>
                )}
              </div>
            </>
          )}

          {modo === "nodos" && (
            <>
              <label className="sjs-field">
                <span>Nodo de partida</span>
                <select
                  className="sjs-select"
                  value={target}
                  onChange={(e) => {
                    setTarget(e.target.value);
                    setSalida(null);
                  }}
                >
                  {TARGETS.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </label>

              {metodoId === "dom-nodecontains" ? (
                <>
                  <label className="sjs-field" style={{ marginTop: 12 }}>
                    <span>Segundo nodo (otroNodo)</span>
                    <select
                      className="sjs-select"
                      value={refSel}
                      onChange={(e) => setRefSel(e.target.value)}
                    >
                      {TARGETS.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>
                  <div className="sjs-actions" style={{ marginTop: 12 }}>
                    <button type="button" className="sjs-btn sjs-btn--primary" onClick={ejecutarContains}>
                      ▶ Ejecutar contains()
                    </button>
                  </div>
                </>
              ) : (
                <div className="dom-prop-grid">
                  {propiedadesNodo.map(([id, propiedad, lector]) => (
                    <button
                      key={id}
                      type="button"
                      className={boton(id)}
                      onClick={() => ejecutarNodo(propiedad, lector)}
                    >
                      {propiedad}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {modo === "creacion" && (
            <>
              <div className="sjs-grid-2">
                <label className="sjs-field">
                  <span>Etiqueta</span>
                  <input
                    className="sjs-input"
                    value={tagName}
                    onChange={(e) => setTagName(e.target.value)}
                    spellCheck={false}
                  />
                </label>
                <label className="sjs-field">
                  <span>Texto</span>
                  <input
                    className="sjs-input"
                    value={textoNodo}
                    onChange={(e) => setTextoNodo(e.target.value)}
                    spellCheck={false}
                  />
                </label>
              </div>

              <div className="sjs-actions" style={{ marginTop: 12 }}>
                <button type="button" className={boton("dom-createelement")} onClick={crearElemento}>
                  🏗️ createElement()
                </button>
                <button type="button" className={boton("dom-createtextnode")} onClick={crearTexto}>
                  ✍️ createTextNode()
                </button>
              </div>

              <div className="dom-pendiente">
                <span className="sjs-card__label" style={{ margin: 0 }}>📦 Nodo pendiente</span>
                {pending ? (
                  <span className="sjs-tag sjs-tag--warn">{pending.descripcion}</span>
                ) : (
                  <span className="sjs-empty">Crea un nodo primero</span>
                )}
              </div>

              <div className="sjs-grid-2" style={{ marginTop: 12 }}>
                <label className="sjs-field">
                  <span>Padre</span>
                  <select
                    className="sjs-select"
                    value={parentSel}
                    onChange={(e) => setParentSel(e.target.value)}
                  >
                    {TARGETS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="sjs-field">
                  <span>Referencia / hijo</span>
                  <select
                    className="sjs-select"
                    value={refSel}
                    onChange={(e) => setRefSel(e.target.value)}
                  >
                    {TARGETS.map((item) => (
                      <option key={item.value} value={item.value}>
                        {item.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="sjs-actions" style={{ marginTop: 12 }}>
                <button type="button" className={boton("dom-append")} onClick={() => insertar("append")}>
                  ➕ append()
                </button>
                <button type="button" className={boton("dom-appendchild")} onClick={() => insertar("appendChild")}>
                  📎 appendChild()
                </button>
                <button type="button" className={boton("dom-insertbefore")} onClick={() => insertar("insertBefore")}>
                  ↪️ insertBefore()
                </button>
                <button type="button" className={boton("dom-replacechildren")} onClick={() => insertar("replaceChildren")}>
                  🔄 replaceChildren()
                </button>
                <button type="button" className={boton("dom-replacewith")} onClick={() => insertar("replaceWith")}>
                  🔁 replaceWith()
                </button>
                <button type="button" className={boton("dom-remove")} onClick={() => insertar("remove")}>
                  🗑️ remove()
                </button>
                <button type="button" className={boton("dom-removechild")} onClick={() => insertar("removeChild")}>
                  ✂️ removeChild()
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {salida && (
        <div className={`sjs-output sjs-output--${salida.tipo}`} style={{ marginTop: 14 }}>
          {salida.texto}
        </div>
      )}
    </MarcoSimulador>
  );
}
