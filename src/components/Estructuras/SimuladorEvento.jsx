import { useCallback, useEffect, useRef, useState } from "react";
import MarcoSimulador from "../SimuladoresJS/MarcoSimulador";
import "../SimuladoresJS/SimuladoresJS.css";
import "./Estructuras.css";

const CODIGO = {
  blur: `const campo = document.querySelector("#nombre");\n\ncampo.addEventListener("blur", (event) => {\n  console.log("blur", event.target.value);\n});`,
  click: `const boton = document.querySelector("#objetivo");\n\nboton.addEventListener("click", (event) => {\n  console.log("click", event.clientX, event.clientY);\n});`,
  keydown: `const campo = document.querySelector("#teclado");\n\ncampo.addEventListener("keydown", (event) => {\n  console.log(event.key, event.code, event.repeat);\n});`,
  keypress: `const campo = document.querySelector("#teclado");\n\ncampo.addEventListener("keypress", (event) => {\n  console.log(event.key, event.charCode);\n});`,
  keyup: `const campo = document.querySelector("#teclado");\n\ncampo.addEventListener("keyup", (event) => {\n  console.log(event.key, event.code);\n});`,
  load: `window.addEventListener("load", () => {\n  console.log("La página terminó de cargar");\n});`,
  mouseout: `const zona = document.querySelector("#zona");\n\nzona.addEventListener("mouseout", (event) => {\n  console.log("mouseout", event.relatedTarget);\n});`,
  mouseover: `const zona = document.querySelector("#zona");\n\nzona.addEventListener("mouseover", (event) => {\n  console.log("mouseover", event.target);\n});`,
  resize: `window.addEventListener("resize", () => {\n  console.log(window.innerWidth, window.innerHeight);\n});`,
  submit: `const form = document.querySelector("#formulario");\n\nform.addEventListener("submit", (event) => {\n  event.preventDefault();\n  console.log("submit", form.nombre.value);\n});`,
  unload: `window.addEventListener("beforeunload", (event) => {\n  event.preventDefault();\n  event.returnValue = "";\n});`,
};

const DESCRIPCION = {
  blur: "El evento blur se dispara cuando un elemento pierde el foco. Prueba a escribir y luego pulsa fuera o tabula a otro campo.",
  click: "El evento click se dispara al pulsar un elemento con el ratón (o al activarlo con teclado). Observa las coordenadas.",
  keydown: "keydown se dispara en el momento en que una tecla baja. Se repite mientras mantienes pulsada la tecla.",
  keypress: "keypress se dispara al producirse un carácter imprimible. Está obsoleto: hoy se recomienda keydown.",
  keyup: "keyup se dispara cuando sueltas la tecla, después de keydown. Es útil para leer el valor final del campo.",
  load: "load se dispara cuando la página y sus recursos terminan de cargar. Aquí simulamos una recarga del escenario.",
  mouseout: "mouseout se dispara al salir de un elemento, incluso si entras a un hijo. Compara con mouseleave.",
  mouseover: "mouseover se dispara al entrar en un elemento o en cualquiera de sus hijos. Es el opuesto de mouseout.",
  resize: "resize se dispara cuando cambia el tamaño de la ventana. También puedes arrastrar la esquina de la caja.",
  submit: "submit se dispara al enviar un formulario. Usa preventDefault() para validar antes de enviar.",
  unload: "unload se dispara al abandonar la página. Está obsoleto y los navegadores lo restringen: usa pagehide.",
};

const NOTA = {
  keypress: "⚠️ onkeypress está obsoleto (deprecated). No se dispara con teclas como Shift, Ctrl o las flechas. Usa onkeydown.",
  unload: "⚠️ onunload está obsoleto. En navegadores modernos no se garantiza; para guardar estado usa pagehide o visibilitychange.",
  mouseout: "💡 mouseout también se dispara al pasar de un elemento padre a un hijo. Si solo quieres saber cuándo sales del contenedor, usa mouseleave.",
  resize: "💡 resize en window puede dispararse muchas veces por segundo. En código real, aplica debounce para no saturar.",
};

const ahora = () =>
  new Date().toLocaleTimeString("es-ES", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });

export default function SimuladorEvento({ metodo }) {
  const evento = metodo.evento ?? String(metodo.id ?? "").replace(/^evn-/, "");
  const [log, setLog] = useState([]);
  const [contador, setContador] = useState(0);
  const [ultimaTecla, setUltimaTecla] = useState(null);
  const [valor, setValor] = useState("");
  const [enfocado, setEnfocado] = useState(false);
  const [dentro, setDentro] = useState(false);
  const [recarga, setRecarga] = useState(0);
  const [estadoCarga, setEstadoCarga] = useState(evento === "load" ? "cargando" : "listo");
  const [salida, setSalida] = useState(false);
  const cajaRef = useRef(null);
  const resizeTimer = useRef(null);
  const ultimoTamano = useRef("");

  const push = useCallback((tipo, texto) => {
    setLog((prev) => [
      ...prev.slice(-32),
      { id: `${Date.now()}-${Math.random()}`, tipo, texto, hora: ahora() },
    ]);
  }, []);

  useEffect(() => {
    setLog([]);
    setContador(0);
    setUltimaTecla(null);
    setValor("");
    setEnfocado(false);
    setDentro(false);
    setRecarga(0);
    setSalida(false);
    setEstadoCarga(evento === "load" ? "cargando" : "listo");
  }, [metodo.id, evento]);

  /* onload simulado */
  useEffect(() => {
    if (evento !== "load") return;
    setEstadoCarga("cargando");
    const t = setTimeout(() => {
      setEstadoCarga("listo");
      push("ok", `🚀 load · la página y sus recursos están listos (recarga #${recarga + 1})`);
    }, 750);
    return () => clearTimeout(t);
  }, [evento, recarga, push]);

  /* onresize real de la ventana */
  useEffect(() => {
    if (evento !== "resize") return;
    const alRedimensionar = () => {
      push("info", `🪟 window resize → ${window.innerWidth} × ${window.innerHeight} px`);
    };
    window.addEventListener("resize", alRedimensionar);
    return () => window.removeEventListener("resize", alRedimensionar);
  }, [evento, push]);

  /* onresize de la caja (debounce para no inundar la consola) */
  useEffect(() => {
    if (evento !== "resize" || !cajaRef.current) return;
    const observador = new ResizeObserver((entradas) => {
      const caja = entradas[0]?.contentRect;
      if (!caja) return;
      const tamano = `${Math.round(caja.width)} × ${Math.round(caja.height)}`;
      if (tamano === ultimoTamano.current) return;
      ultimoTamano.current = tamano;
      clearTimeout(resizeTimer.current);
      resizeTimer.current = setTimeout(() => {
        push("info", `📐 caja resize → ${tamano} px`);
      }, 180);
    });
    observador.observe(cajaRef.current);
    return () => {
      clearTimeout(resizeTimer.current);
      observador.disconnect();
    };
  }, [evento, push]);

  const registrarTecla = (tipo, e) => {
    if (tipo !== evento) return;
    const info = {
      key: e.key,
      code: e.code,
      repeat: e.repeat,
      charCode: e.charCode,
      tipo,
      hora: ahora(),
    };
    setUltimaTecla(info);
    setContador((c) => c + 1);
    if (tipo === "keypress") {
      push("info", `⌨️ keypress · "${e.key}" · charCode ${e.charCode}`);
    } else if (tipo === "keydown") {
      push(
        e.repeat ? "warn" : "info",
        `⌨️ keydown · ${e.key} (${e.code})${e.repeat ? " · repetición automática" : ""}`,
      );
    } else {
      push("info", `⌨️ keyup · ${e.key} (${e.code})`);
    }
  };

  const consola = log.length ? (
    log.map((linea) => (
      <div key={linea.id} className={`est-console__line est-console__line--${linea.tipo}`}>
        <span>{linea.tipo === "error" ? "❌" : linea.tipo === "warn" ? "⚠️" : linea.tipo === "ok" ? "✅" : "📘"}</span>
        <span>{linea.texto}</span>
        <span style={{ marginLeft: "auto", color: "#5b7497", fontSize: "0.68rem" }}>{linea.hora}</span>
      </div>
    ))
  ) : (
    <span className="log-system">Interactúa con el escenario para disparar el evento…</span>
  );

  const escenario = () => {
    switch (evento) {
      case "blur":
        return (
          <>
            <h4 className="evn-titulo">🎯 Pierde el foco para disparar blur</h4>
            <p className="evn-ayuda">
              Escribe tu nombre y pulsa fuera del campo o tabula al siguiente.
            </p>
            <label className="evn-campo">
              <span>Nombre (campo 1)</span>
              <input
                id="nombre"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                onFocus={() => {
                  setEnfocado(true);
                  push("info", "🔵 focus · el campo recibió el foco");
                }}
                onBlur={(e) => {
                  setEnfocado(false);
                  setContador((c) => c + 1);
                  push(
                    e.target.value.trim() ? "ok" : "warn",
                    `🔴 blur · valor "${e.target.value}"${e.target.value.trim() ? "" : " · el campo quedó vacío"}`,
                  );
                }}
                placeholder="Ana"
              />
            </label>
            <label className="evn-campo">
              <span>Campo 2 (para tabular)</span>
              <input placeholder="Pulsa Tab" />
            </label>
            <p className="evn-ayuda">
              {enfocado ? "🟢 Campo 1 enfocado" : "⚪ Campo 1 sin foco"} · {contador} blur(s)
            </p>
          </>
        );

      case "click":
        return (
          <>
            <h4 className="evn-titulo">🖱️ Pulsa el botón para disparar click</h4>
            <p className="evn-ayuda">Cada pulsación suma un clic y muestra sus coordenadas.</p>
            <div style={{ display: "grid", placeItems: "center" }}>
              <button
                id="objetivo"
                type="button"
                className="evn-boton"
                onClick={(e) => {
                  setContador((c) => c + 1);
                  push("ok", `🖱️ click · (${Math.round(e.clientX)}, ${Math.round(e.clientY)}) · detalle ${e.detail}`);
                }}
              >
                👆 ¡Púlsame!
              </button>
            </div>
            <div className="evn-contador">
              <div><strong>{contador}</strong><span>clics</span></div>
            </div>
          </>
        );

      case "keydown":
      case "keypress":
      case "keyup":
        return (
          <>
            <h4 className="evn-titulo">⌨️ Escribe para disparar {evento}</h4>
            <p className="evn-ayuda">
              {evento === "keydown" && "keydown ocurre al bajar la tecla, antes de que el carácter aparezca."}
              {evento === "keypress" && "keypress solo ocurre con caracteres imprimibles. Prueba Shift o una flecha."}
              {evento === "keyup" && "keyup ocurre al soltar la tecla, después de keydown."}
            </p>
            <label className="evn-campo">
              <span>Campo de prueba</span>
              <input
                id="teclado"
                placeholder="Escribe aquí…"
                onKeyDown={(e) => registrarTecla("keydown", e)}
                onKeyPress={(e) => registrarTecla("keypress", e)}
                onKeyUp={(e) => registrarTecla("keyup", e)}
              />
            </label>
            <div className="evn-teclas">
              {ultimaTecla ? (
                <>
                  <div className="evn-tecla">
                    <strong>{ultimaTecla.key === " " ? "Espacio" : ultimaTecla.key}</strong>
                    <small>{ultimaTecla.code}</small>
                  </div>
                  <div className="evn-tecla">
                    <strong>{ultimaTecla.charCode}</strong>
                    <small>charCode</small>
                  </div>
                  <div className="evn-tecla">
                    <strong>{ultimaTecla.tipo}</strong>
                    <small>último evento</small>
                  </div>
                </>
              ) : (
                <p className="est-empty">Aún no has pulsado ninguna tecla.</p>
              )}
            </div>
            <div className="evn-contador">
              <div><strong>{contador}</strong><span>{evento}</span></div>
            </div>
          </>
        );

      case "load":
        return (
          <>
            <h4 className="evn-titulo">🚀 Ciclo de carga de la página</h4>
            <p className="evn-ayuda">
              El evento load se dispara una sola vez, cuando el documento y sus recursos están listos.
            </p>
            <div className="evn-contador">
              <div>
                <strong>{estadoCarga === "cargando" ? "⏳" : "✅"}</strong>
                <span>{estadoCarga === "cargando" ? "cargando…" : "load disparado"}</span>
              </div>
              <div><strong>{recarga}</strong><span>recargas</span></div>
            </div>
            <div style={{ display: "grid", placeItems: "center" }}>
              <button
                type="button"
                className="evn-boton"
                onClick={() => {
                  setRecarga((r) => r + 1);
                  push("info", "🔄 Simulando recarga de la página…");
                }}
              >
                🔄 Simular recarga
              </button>
            </div>
          </>
        );

      case "mouseout":
      case "mouseover":
        return (
          <>
            <h4 className="evn-titulo">
              {evento === "mouseout" ? "🚪 Sal de la zona para disparar mouseout" : "🚪 Entra en la zona para disparar mouseover"}
            </h4>
            <p className="evn-ayuda">
              {evento === "mouseout"
                ? "Pasa el cursor por dentro y luego sal. También se dispara al entrar en un hijo."
                : "Pasa el cursor por la zona. Se dispara al entrar y cada vez que cambias de hijo."}
            </p>
            <div
              id="zona"
              className={`evn-zona${dentro ? " is-dentro" : ""}`}
              onMouseEnter={() => setDentro(true)}
              onMouseLeave={() => setDentro(false)}
              onMouseOver={(e) => {
                if (evento !== "mouseover") return;
                setContador((c) => c + 1);
                setDentro(true);
                push("ok", `🖱️ mouseover · entraste en ${e.target.tagName?.toLowerCase() ?? "la zona"}`);
              }}
              onMouseOut={(e) => {
                if (evento !== "mouseout") return;
                setContador((c) => c + 1);
                setDentro(false);
                const destino = e.relatedTarget?.tagName?.toLowerCase() ?? "fuera";
                push("warn", `🚪 mouseout · salida hacia ${destino}`);
              }}
            >
              <span>
                {dentro ? "🟢 Dentro de la zona" : "⚪ Pasa el cursor por aquí"}
                <br />
                <small style={{ color: "#8fb4df", fontWeight: 600 }}>
                  Mueve el ratón despacio y observa la consola
                </small>
              </span>
            </div>
            <div className="evn-contador">
              <div><strong>{contador}</strong><span>{evento}</span></div>
            </div>
          </>
        );

      case "resize":
        return (
          <>
            <h4 className="evn-titulo">📐 Redimensiona la caja o la ventana</h4>
            <p className="evn-ayuda">
              Arrastra la esquina inferior derecha de la caja punteada. También puedes cambiar el tamaño
              de la ventana del navegador.
            </p>
            <div ref={cajaRef} className="evn-caja-resize">
              <strong>↔️ Caja redimensionable</strong>
              <br />
              Arrastra la esquina inferior derecha.
              <br />
              <small>El evento resize se dispara cada vez que cambia el tamaño.</small>
            </div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
              <button
                type="button"
                className="evn-boton"
                onClick={() => {
                  const caja = cajaRef.current;
                  if (!caja) return;
                  const ancho = 240 + Math.floor(Math.random() * 320);
                  caja.style.width = `${ancho}px`;
                  caja.style.height = `${120 + Math.floor(Math.random() * 120)}px`;
                  push("info", `🎲 Tamaño aplicado: ${ancho}px de ancho`);
                }}
              >
                🎲 Tamaño aleatorio
              </button>
              <button
                type="button"
                className="evn-boton"
                style={{ borderColor: "rgba(255,123,114,.5)", background: "rgba(255,123,114,.12)" }}
                onClick={() => {
                  const caja = cajaRef.current;
                  if (caja) {
                    caja.style.width = "100%";
                    caja.style.height = "120px";
                  }
                  push("info", "↺ Caja restaurada a 100% × 120px");
                }}
              >
                ↺ Restaurar
              </button>
            </div>
            <div className="evn-contador">
              <div><strong>{contador}</strong><span>resize</span></div>
            </div>
          </>
        );

      case "submit":
        return (
          <>
            <h4 className="evn-titulo">📨 Envía el formulario</h4>
            <p className="evn-ayuda">
              submit se dispara al pulsar el botón de envío o al pulsar Enter. Aquí lo frenamos con
              preventDefault() y validamos.
            </p>
            <form
              id="formulario"
              onSubmit={(e) => {
                e.preventDefault();
                const datos = new FormData(e.currentTarget);
                const correo = String(datos.get("correo") ?? "");
                setContador((c) => c + 1);
                if (!correo.includes("@")) {
                  push("error", `📨 submit bloqueado · "${correo}" no es un correo válido`);
                  return;
                }
                push("ok", `📨 submit válido · correo "${correo}" · preventDefault() aplicado`);
                e.currentTarget.reset();
              }}
            >
              <label className="evn-campo">
                <span>Correo electrónico</span>
                <input name="correo" type="text" placeholder="ana@ejemplo.com" />
              </label>
              <div style={{ display: "grid", placeItems: "center", marginTop: 12 }}>
                <button type="submit" className="evn-boton">📨 Enviar formulario</button>
              </div>
            </form>
            <div className="evn-contador">
              <div><strong>{contador}</strong><span>submit</span></div>
            </div>
          </>
        );

      case "unload":
        return (
          <>
            <h4 className="evn-titulo">🚪 Simula que abandonas la página</h4>
            <p className="evn-ayuda">
              Los navegadores modernos no permiten ejecutar código arbitrario en unload. Este botón
              simula la secuencia beforeunload → pagehide → unload.
            </p>
            {!salida ? (
              <div style={{ display: "grid", placeItems: "center" }}>
                <button
                  type="button"
                  className="evn-boton"
                  onClick={() => {
                    setSalida(true);
                    push("warn", "🚪 beforeunload · el navegador pide confirmación");
                    setTimeout(() => push("warn", "📦 pagehide · la página pasa a segundo plano"), 450);
                    setTimeout(() => push("error", "💤 unload · la página se descarga (simulado)"), 900);
                  }}
                >
                  🚪 Salir de la página
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", placeItems: "center", gap: 10 }}>
                <p className="evn-ayuda">👋 Secuencia de salida ejecutada.</p>
                <button
                  type="button"
                  className="evn-boton"
                  onClick={() => {
                    setSalida(false);
                    push("ok", "↩️ Has vuelto a la página. Los listeners se vuelven a registrar.");
                  }}
                >
                  ↩️ Volver a la página
                </button>
              </div>
            )}
            <div className="evn-contador">
              <div><strong>{salida ? "1" : "0"}</strong><span>salidas</span></div>
            </div>
          </>
        );

      default:
        return <p className="est-empty">Simulador no disponible para este evento.</p>;
    }
  };

  return (
    <MarcoSimulador
      icon="🎛️"
      titulo={`Evento ${evento}`}
      descripcion={DESCRIPCION[evento] ?? "Interactúa con el escenario para disparar el evento."}
      codigo={CODIGO[evento]}
      consola={consola}
      nota={NOTA[evento]}
    >
      <div className="evn-lab">
        <div className="evn-escenario">{escenario()}</div>
        <div className="evn-log">
          <div className="est-panel">
            <div className="est-panel__label">
              <span>📡 Estado del evento</span>
              <span className="est-chip">en vivo</span>
            </div>
            <div className="evn-timeline">
              <div className={`evn-evento${contador > 0 ? " evn-evento--ok" : ""}`}>
                <span className="evn-evento__punto" />
                <span>{contador > 0 ? `Se disparó ${contador} vez/veces` : "Esperando el primer disparo…"}</span>
              </div>
              <div className="evn-evento">
                <span className="evn-evento__punto" />
                <span>Listener activo sobre <code>{`on${evento}`}</code></span>
              </div>
              <div className="evn-evento evn-evento--aviso">
                <span className="evn-evento__punto" />
                <span>Recomendación: usa <code>addEventListener</code></span>
              </div>
            </div>
            <div className="evn-nota">
              💡 Cada línea de la consola inferior muestra la hora exacta del disparo. Compara la
              secuencia real con la teoría del apunte.
            </div>
          </div>
        </div>
      </div>
    </MarcoSimulador>
  );
}
