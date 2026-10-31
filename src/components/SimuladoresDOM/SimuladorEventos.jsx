import { useCallback, useEffect, useRef, useState } from "react";
import MarcoSimulador from "../SimuladoresJS/MarcoSimulador";
import "../SimuladoresJS/SimuladoresJS.css";
import "./SimuladoresDOM.css";

const TIPOS = [
  { value: "click", label: "click" },
  { value: "mouseover", label: "mouseover" },
  { value: "dblclick", label: "dblclick" },
  { value: "demo", label: "demo (personalizado)" },
];

const describir = (node) =>
  node?.id ? `#${node.id}` : node?.tagName ? node.tagName.toLowerCase() : "objetivo";

export default function SimuladorEventos({ metodoId }) {
  const modo =
    metodoId === "ev-stoppropagation" || metodoId === "ev-stopimmediatepropagation"
      ? "propagacion"
      : metodoId === "ev-preventdefault"
        ? "prevent"
        : "listeners";

  const [log, setLog] = useState([]);
  const pushLog = useCallback(
    (tipo, texto) =>
      setLog((prev) => [...prev.slice(-24), { tipo, texto, id: Date.now() + Math.random() }]),
    [],
  );

  const consola = log.length ? (
    log.map((linea) => (
      <div key={linea.id} className={`sjs-log__line sjs-log__line--${linea.tipo}`}>
        {linea.texto}
      </div>
    ))
  ) : (
    <span className="log-system">Interactúa con el panel para ver el orden de los eventos...</span>
  );

  if (modo === "propagacion") {
    return (
      <SimuladorPropagacion
        metodoId={metodoId}
        setLog={setLog}
        pushLog={pushLog}
        consola={consola}
      />
    );
  }

  if (modo === "prevent") {
    return (
      <SimuladorPreventDefault
        setLog={setLog}
        pushLog={pushLog}
        consola={consola}
      />
    );
  }

  return (
    <SimuladorListeners
      metodoId={metodoId}
      setLog={setLog}
      pushLog={pushLog}
      consola={consola}
    />
  );
}

/* ------------------------------------------------------------------ */
/* addEventListener / removeEventListener / dispatchEvent              */
/* ------------------------------------------------------------------ */

function SimuladorListeners({ metodoId, setLog, pushLog, consola }) {
  const objetivoRef = useRef(null);
  const registroRef = useRef(new Map());
  const [tipo, setTipo] = useState(metodoId === "ev-dispatchevent" ? "demo" : "click");
  const [destino, setDestino] = useState("boton");
  const [detalle, setDetalle] = useState("datos del evento");
  const [registrados, setRegistrados] = useState([]);

  const clave = `${destino}:${tipo}`;

  const obtenerNodo = () =>
    destino === "boton" ? objetivoRef.current : objetivoRef.current?.parentElement;

  const actualizarLista = () =>
    setRegistrados(
      [...registroRef.current.entries()].map(([id, item]) => ({
        id,
        etiqueta: item.etiqueta,
      })),
    );

  useEffect(() => {
    const mapa = registroRef.current;
    return () => {
      for (const item of mapa.values()) {
        item.nodo.removeEventListener(item.tipo, item.handler);
      }
      mapa.clear();
    };
  }, []);

  const agregar = () => {
    const nodo = obtenerNodo();
    if (!nodo) return;
    if (registroRef.current.has(clave)) {
      pushLog("warn", `Ya existe un listener para "${tipo}" en ${describir(nodo)}`);
      return;
    }
    const handler = (evento) => {
      const dato =
        evento instanceof CustomEvent && evento.detail !== undefined
          ? ` · detail: ${JSON.stringify(evento.detail)}`
          : "";
      pushLog("ok", `🎧 ${describir(nodo)} escuchó "${evento.type}"${dato}`);
    };
    nodo.addEventListener(tipo, handler);
    registroRef.current.set(clave, {
      nodo,
      tipo,
      handler,
      etiqueta: `${describir(nodo)} ← "${tipo}"`,
    });
    actualizarLista();
    pushLog("info", `addEventListener("${tipo}", listener) registrado en ${describir(nodo)}`);
  };

  const quitar = () => {
    const item = registroRef.current.get(clave);
    if (!item) {
      pushLog("warn", `No hay listener registrado para "${tipo}" en ese destino`);
      return;
    }
    item.nodo.removeEventListener(item.tipo, item.handler);
    registroRef.current.delete(clave);
    actualizarLista();
    pushLog("ok", `removeEventListener("${tipo}", listener) eliminado`);
  };

  const disparar = () => {
    const nodo = obtenerNodo();
    if (!nodo) return;
    const evento =
      tipo === "demo"
        ? new CustomEvent("demo", { detail: detalle, bubbles: true })
        : new Event(tipo, { bubbles: true });
    nodo.dispatchEvent(evento);
    pushLog("info", `dispatchEvent(new ${tipo === "demo" ? "CustomEvent" : "Event"}("${tipo}")) en ${describir(nodo)}`);
  };

  const codigo =
    metodoId === "ev-removelistener"
      ? `const boton = document.querySelector("#ev-boton");\n\nfunction manejar() {}\nboton.addEventListener("click", manejar);\nboton.removeEventListener("click", manejar);`
      : metodoId === "ev-dispatchevent"
        ? `const boton = document.querySelector("#ev-boton");\n\nboton.dispatchEvent(new CustomEvent("demo", {\n  detail: "${detalle}",\n  bubbles: true\n}));`
        : `const boton = document.querySelector("#ev-boton");\n\nboton.addEventListener("${tipo}", (evento) => {\n  console.log("Evento:", evento.type);\n});`;

  return (
    <MarcoSimulador
      icon="🎧"
      titulo="Eventos en vivo"
      descripcion="Registra, elimina y dispara listeners reales sobre los elementos del laboratorio. La consola muestra el orden en que se ejecutan."
      codigo={codigo}
      consola={consola}
      nota="💡 Para eliminar un listener con removeEventListener necesitas la MISMA referencia de la función que usaste en addEventListener. Una función anónima nueva no sirve."
    >
      <div className="dom-lab">
        <div>
          <div className="sjs-card__label">
            <span>🖱️ Zona de pruebas</span>
            <button type="button" className="sjs-btn" onClick={() => setLog([])}>
              🧹 Limpiar consola
            </button>
          </div>

          <div className="ev-lienzo">
            <div className="ev-zona">
              <span className="sjs-tag">contenedor padre</span>
              <button
                id="ev-boton"
                ref={objetivoRef}
                type="button"
                className="ev-boton"
                onClick={() => {
                  if (tipo !== "click") return;
                  pushLog("info", "🖱️ clic nativo del usuario en #ev-boton");
                }}
              >
                Botón hijo
              </button>
              <span className="sjs-tag">span de apoyo</span>
            </div>
          </div>

          <ul className="ev-lista">
            {registrados.length ? (
              registrados.map((item) => (
                <li key={item.id} className="is-on">
                  🎧 {item.etiqueta}
                </li>
              ))
            ) : (
              <li>Sin listeners registrados todavía</li>
            )}
          </ul>
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🎛️ Controles</span>
            <span className="sjs-tag">{registrados.length} listener(s)</span>
          </div>

          <label className="sjs-field">
            <span>Destino</span>
            <select className="sjs-select" value={destino} onChange={(e) => setDestino(e.target.value)}>
              <option value="boton">button#ev-boton (hijo)</option>
              <option value="padre">contenedor padre</option>
            </select>
          </label>

          <label className="sjs-field" style={{ marginTop: 12 }}>
            <span>Tipo de evento</span>
            <select
              className="sjs-select"
              value={tipo}
              onChange={(e) => {
                setTipo(e.target.value);
                setLog([]);
              }}
            >
              {TIPOS.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          {tipo === "demo" && (
            <label className="sjs-field" style={{ marginTop: 12 }}>
              <span>detail del CustomEvent</span>
              <input
                className="sjs-input"
                value={detalle}
                onChange={(e) => setDetalle(e.target.value)}
                spellCheck={false}
              />
            </label>
          )}

          <div className="sjs-actions" style={{ marginTop: 14 }}>
            <button
              type="button"
              className={`sjs-btn${metodoId === "ev-addlistener" ? " sjs-btn--primary" : ""}`}
              onClick={agregar}
            >
              🎧 addEventListener()
            </button>
            <button
              type="button"
              className={`sjs-btn${metodoId === "ev-removelistener" ? " sjs-btn--primary" : ""}`}
              onClick={quitar}
            >
              🔇 removeEventListener()
            </button>
            <button
              type="button"
              className={`sjs-btn${metodoId === "ev-dispatchevent" ? " sjs-btn--primary" : ""}`}
              onClick={disparar}
            >
              📣 dispatchEvent()
            </button>
          </div>

          <div className="sjs-note" style={{ marginTop: 14 }}>
            💡 Si usas el evento <code>mouseover</code>, pasa el ratón por el botón
            después de registrar el listener. Con <code>demo</code> necesitas
            pulsar <strong>dispatchEvent()</strong>.
          </div>
        </div>
      </div>
    </MarcoSimulador>
  );
}

/* ------------------------------------------------------------------ */
/* stopPropagation / stopImmediatePropagation                          */
/* ------------------------------------------------------------------ */

function SimuladorPropagacion({ metodoId, setLog, pushLog, consola }) {
  const hijoRef = useRef(null);
  const padreRef = useRef(null);
  const estrategiaInicial =
    metodoId === "ev-stopimmediatepropagation"
      ? "stopImmediatePropagation"
      : "stopPropagation";
  const estrategiaRef = useRef(estrategiaInicial);
  const [estrategia, setEstrategia] = useState(estrategiaInicial);

  useEffect(() => {
    estrategiaRef.current = estrategia;
  }, [estrategia]);

  useEffect(() => {
    const hijo = hijoRef.current;
    const padre = padreRef.current;
    if (!hijo || !padre) return;

    const hijo1 = (evento) => {
      pushLog("info", `1️⃣ listener hijo #1 · ${evento.type} · target=${describir(evento.target)}`);
      if (estrategiaRef.current === "stopPropagation") {
        evento.stopPropagation();
        pushLog("warn", "🚧 stopPropagation() → el evento no sube al padre");
      }
      if (estrategiaRef.current === "stopImmediatePropagation") {
        evento.stopImmediatePropagation();
        pushLog("bad", "⛔ stopImmediatePropagation() → se bloquean los demás listeners (hijo #2 y padre)");
      }
    };

    const hijo2 = () => {
      pushLog("ok", "2️⃣ listener hijo #2 ejecutado");
    };

    const padreListener = () => {
      pushLog("ok", "3️⃣ listener padre ejecutado (fase de burbujeo)");
    };

    hijo.addEventListener("click", hijo1);
    hijo.addEventListener("click", hijo2);
    padre.addEventListener("click", padreListener);

    return () => {
      hijo.removeEventListener("click", hijo1);
      hijo.removeEventListener("click", hijo2);
      padre.removeEventListener("click", padreListener);
    };
  }, [pushLog]);

  const codigo =
    estrategia === "stopPropagation"
      ? `hijo.addEventListener("click", (evento) => {\n  evento.stopPropagation();\n  console.log("El padre NO recibe el evento");\n});`
      : estrategia === "stopImmediatePropagation"
        ? `hijo.addEventListener("click", (evento) => {\n  evento.stopImmediatePropagation();\n  console.log("Ningún otro listener se ejecuta");\n});`
        : `hijo.addEventListener("click", (evento) => {\n  console.log("El evento sigue burbujeando");\n});`;

  return (
    <MarcoSimulador
      icon="🚧"
      titulo="Propagación de eventos"
      descripcion="Haz clic en el botón hijo y observa cuántos listeners se ejecutan. Compara el comportamiento normal con stopPropagation y stopImmediatePropagation."
      codigo={codigo}
      consola={consola}
      nota="💡 stopPropagation() detiene el viaje hacia el padre, pero deja terminar los demás listeners del mismo elemento. stopImmediatePropagation() corta TODO al instante."
    >
      <div className="dom-lab">
        <div>
          <div className="sjs-card__label">
            <span>🌳 Árbol de prueba</span>
            <button type="button" className="sjs-btn" onClick={() => setLog([])}>
              🧹 Limpiar consola
            </button>
          </div>

          <div className="ev-lienzo">
            <div
              id="ev-padre"
              ref={padreRef}
              className="ev-subzona"
              style={{ flexDirection: "column", alignItems: "stretch" }}
            >
              <span className="sjs-tag">div#ev-padre · listener en burbujeo</span>
              <button id="ev-hijo" ref={hijoRef} type="button" className="ev-boton">
                Botón hijo · 2 listeners
              </button>
              <span className="sjs-tag">Haz clic en el botón</span>
            </div>
          </div>

          <div className="sjs-note" style={{ marginTop: 14 }}>
            🧭 Orden esperado: <code>hijo #1</code> → <code>hijo #2</code> →{" "}
            <code>padre</code>. Según la estrategia, algunos se saltan.
          </div>
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🎛️ Estrategia</span>
            <span className="sjs-tag">{estrategia}</span>
          </div>

          <div className="sjs-actions" style={{ flexDirection: "column", alignItems: "stretch" }}>
            <button
              type="button"
              className={`sjs-btn${estrategia === "ninguna" ? " sjs-btn--primary" : ""}`}
              onClick={() => {
                setEstrategia("ninguna");
                setLog([]);
              }}
            >
              ✅ Sin detener (burbujeo normal)
            </button>
            <button
              type="button"
              className={`sjs-btn${estrategia === "stopPropagation" ? " sjs-btn--primary" : ""}`}
              onClick={() => {
                setEstrategia("stopPropagation");
                setLog([]);
              }}
            >
              🚧 stopPropagation()
            </button>
            <button
              type="button"
              className={`sjs-btn${estrategia === "stopImmediatePropagation" ? " sjs-btn--primary" : ""}`}
              onClick={() => {
                setEstrategia("stopImmediatePropagation");
                setLog([]);
              }}
            >
              ⛔ stopImmediatePropagation()
            </button>
          </div>

          <button
            type="button"
            className="sjs-btn sjs-btn--primary"
            style={{ marginTop: 14, width: "100%" }}
            onClick={() => hijoRef.current?.click()}
          >
            ▶ Simular clic en el hijo
          </button>

          <div className="sjs-note" style={{ marginTop: 14 }}>
            🔬 Cambia la estrategia y repite el clic para comparar los tres
            escenarios.
          </div>
        </div>
      </div>
    </MarcoSimulador>
  );
}

/* ------------------------------------------------------------------ */
/* preventDefault                                                      */
/* ------------------------------------------------------------------ */

function SimuladorPreventDefault({ setLog, pushLog, consola }) {
  const enlaceRef = useRef(null);
  const checkRef = useRef(null);
  const prevenirRef = useRef(true);
  const [prevenir, setPrevenir] = useState(true);

  useEffect(() => {
    prevenirRef.current = prevenir;
  }, [prevenir]);

  useEffect(() => {
    const enlace = enlaceRef.current;
    const check = checkRef.current;
    if (!enlace || !check) return;

    const enlaceListener = (evento) => {
      if (prevenirRef.current) {
        evento.preventDefault();
        pushLog("warn", "🛑 preventDefault() → el enlace NO navega");
      } else {
        pushLog("ok", "✅ Navegación permitida → el hash de la URL cambiará");
      }
    };

    const checkListener = (evento) => {
      if (prevenirRef.current) {
        evento.preventDefault();
        pushLog("warn", "🛑 preventDefault() → la casilla no cambia");
      } else {
        pushLog("ok", "✅ La casilla cambia de estado normalmente");
      }
    };

    enlace.addEventListener("click", enlaceListener);
    check.addEventListener("click", checkListener);

    return () => {
      enlace.removeEventListener("click", enlaceListener);
      check.removeEventListener("click", checkListener);
    };
  }, [pushLog]);

  const codigo = `enlace.addEventListener("click", (evento) => {\n  evento.preventDefault(); // bloquea la navegación\n  console.log("Navegación cancelada");\n});`;

  return (
    <MarcoSimulador
      icon="🛑"
      titulo="preventDefault()"
      descripcion="Activa o desactiva preventDefault() y comprueba qué comportamiento por defecto del navegador se cancela."
      codigo={codigo}
      consola={consola}
      nota="💡 preventDefault() NO detiene la propagación: solo cancela la acción nativa. Para frenar el burbujeo usa stopPropagation()."
    >
      <div className="dom-lab">
        <div>
          <div className="sjs-card__label">
            <span>🖱️ Comportamientos nativos</span>
            <button type="button" className="sjs-btn" onClick={() => setLog([])}>
              🧹 Limpiar consola
            </button>
          </div>

          <div className="ev-lienzo" id="ev-demo">
            <div className="ev-zona">
              <a
                ref={enlaceRef}
                href="#ev-demo"
                className="ev-enlace"
                onClick={() => pushLog("info", "clic en el enlace (se ejecuta el listener nativo)")}
              >
                Enlace de prueba (href="#ev-demo")
              </a>

              <label className="ev-check">
                <input ref={checkRef} type="checkbox" /> Acepto los términos
              </label>

              <span className="sjs-tag">El checkbox y el enlace tienen listeners reales</span>
            </div>
          </div>
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🎛️ Control</span>
            <span className={`sjs-tag ${prevenir ? "sjs-tag--bad" : "sjs-tag--ok"}`}>
              {prevenir ? "preventDefault activo" : "comportamiento nativo"}
            </span>
          </div>

          <label className="sjs-check" style={{ width: "100%" }}>
            <input
              type="checkbox"
              checked={prevenir}
              onChange={(e) => {
                setPrevenir(e.target.checked);
                setLog([]);
              }}
            />
            <span>Activar event.preventDefault()</span>
          </label>

          <div className="sjs-actions" style={{ marginTop: 14 }}>
            <button
              type="button"
              className="sjs-btn sjs-btn--primary"
              onClick={() => enlaceRef.current?.click()}
            >
              ▶ Simular clic en el enlace
            </button>
            <button
              type="button"
              className="sjs-btn"
              onClick={() => checkRef.current?.click()}
            >
              ☑️ Simular clic en el checkbox
            </button>
          </div>

          <div className="sjs-note" style={{ marginTop: 14 }}>
            💡 También puedes hacer clic directamente sobre el enlace o la
            casilla. Observa la URL y el estado de la casilla.
          </div>
        </div>
      </div>
    </MarcoSimulador>
  );
}
