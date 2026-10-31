import { useCallback, useEffect, useRef, useState } from "react";
import MarcoSimulador from "./MarcoSimulador";
import "./SimuladoresExtras.css";

const PROPIEDADES = [
  "color",
  "background-color",
  "font-size",
  "font-family",
  "padding",
  "border-radius",
  "display",
  "position",
];

export default function SimuladorEstilos({ metodoId }) {
  const [vista, setVista] = useState(() => {
    if (metodoId === "estilos-getcomputedstyle") return "computed";
    if (metodoId === "estilos-getpropertyvalue") return "property";
    if (metodoId === "estilos-setproperty") return "set";
    if (metodoId === "estilos-scrollto") return "scroll";
    return "computed";
  });

  const previewRef = useRef(null);
  const scrollRef = useRef(null);
  const [elemento, setElemento] = useState(null);
  const [, setVersion] = useState(0);
  const [propiedad, setPropiedad] = useState("background-color");
  const [valorProp, setValorProp] = useState("#2ea043");
  const [prioridad, setPrioridad] = useState("");
  const [aplicada, setAplicada] = useState("");
  const [medidas, setMedidas] = useState({ top: 0, height: 0, client: 0 });

  /* Guarda el nodo real en el estado para poder leerlo sin tocar el ref en render. */
  const asignarPreview = useCallback((nodo) => {
    previewRef.current = nodo;
    setElemento(nodo);
  }, []);

  useEffect(() => {
    const caja = scrollRef.current;
    if (!caja) return;
    const actualizar = () =>
      setMedidas({
        top: Math.round(caja.scrollTop),
        height: Math.round(caja.scrollHeight),
        client: Math.round(caja.clientHeight),
      });
    actualizar();
    caja.addEventListener("scroll", actualizar, { passive: true });
    return () => caja.removeEventListener("scroll", actualizar);
  }, []);

  // Se lee en cada render; setVersion() fuerza uno nuevo tras setProperty().
  const estilos = elemento ? getComputedStyle(elemento) : null;
  const leer = (prop) => {
    if (!estilos) return "";
    try {
      return estilos.getPropertyValue(prop);
    } catch {
      return "";
    }
  };
  const computed = {
    color: leer("color"),
    "background-color": leer("background-color"),
    "font-size": leer("font-size"),
    "font-family": leer("font-family"),
    padding: leer("padding"),
    "border-radius": leer("border-radius"),
    display: leer("display"),
    position: leer("position"),
    "--mi-color": leer("--mi-color"),
  };
  const inline = elemento?.style ?? null;
  const styleAttr = elemento?.getAttribute("style") || "";

  const aplicar = () => {
    if (!elemento) return;
    try {
      elemento.style.setProperty(propiedad.trim(), valorProp, prioridad || undefined);
      setAplicada(
        `${propiedad.trim()}: ${valorProp}${prioridad ? " !important" : ""}`,
      );
      setVersion((v) => v + 1);
    } catch (error) {
      setAplicada(`❌ ${error.name}: ${error.message}`);
    }
  };

  const reiniciar = () => {
    if (!elemento) return;
    elemento.removeAttribute("style");
    setAplicada("");
    setVersion((v) => v + 1);
  };

  const moverScroll = (destino) => {
    const caja = scrollRef.current;
    if (!caja) return;
    const top =
      destino === "top" ? 0 : destino === "bottom" ? caja.scrollHeight : Math.round((caja.scrollHeight - caja.clientHeight) / 2);
    caja.scrollTo({ top, behavior: "smooth" });
  };

  const codigo =
    vista === "computed"
      ? `const el = document.querySelector(".caja");
const estilos = getComputedStyle(el);

console.log(estilos.color);          // "rgb(224, 224, 224)"
console.log(estilos.fontSize);       // "16px"
console.log(estilos.backgroundColor);`
      : vista === "property"
        ? `const estilos = getComputedStyle(el);

estilos.getPropertyValue("background-color");
estilos.getPropertyValue("--mi-color");
el.style.getPropertyValue("color");   // estilos en línea`
        : vista === "set"
          ? `el.style.setProperty("${propiedad || "background-color"}", "${valorProp}"${
              prioridad ? ', "important"' : ""
            });

// equivale a: el.style.${propiedad.replace(/-([a-z])/g, (_, c) => c.toUpperCase())} = "${valorProp}"`
          : `// Equivalente al scroll de la ventana, dentro de esta caja:
contenedor.scrollTo({ top: 0, behavior: "smooth" });
contenedor.scrollTo({ top: contenedor.scrollHeight });

// En la página real:
window.scrollTo({ top: 0, behavior: "smooth" });`;

  return (
    <MarcoSimulador
      icon="🎨"
      titulo="CSSOM en acción"
      descripcion="Inspecciona los estilos computados, lee propiedades con getPropertyValue, escríbelas con setProperty y prueba el scroll programático."
      codigo={codigo}
      nota={
        <>
          💡 <code>getComputedStyle()</code> devuelve los valores <strong>finales</strong> (tras
          CSS, herencia y unidades resueltas). <code>element.style</code> solo contiene los
          estilos en línea. <code>setProperty()</code> acepta nombres en <code>kebab-case</code>{" "}
          como <code>background-color</code>.
        </>
      }
      consola={
        <>
          <div className="log-system">🎨 Caja de pruebas · estilos computados</div>
          <div className="log-iteration">
            color → <strong>{computed.color}</strong>
          </div>
          <div className="log-iteration">
            background-color → <strong>{computed["background-color"]}</strong>
          </div>
          <div className="log-iteration">
            font-size → <strong>{computed["font-size"]}</strong>
          </div>
          <div className="log-iteration">
            padding → <strong>{computed.padding}</strong>
          </div>
          {computed["--mi-color"] && (
            <div className="log-success">
              --mi-color → <strong>{computed["--mi-color"]}</strong>
            </div>
          )}
          {aplicada && (
            <div className={aplicada.startsWith("❌") ? "log-error" : "log-result"}>
              {aplicada}
            </div>
          )}
          <div className="log-system">
            scrollTop {medidas.top}px · scrollHeight {medidas.height}px · clientHeight{" "}
            {medidas.client}px
          </div>
        </>
      }
    >
      <div className="sjs-actions">
        {[
          ["computed", "🖌️ getComputedStyle()"],
          ["property", "🔎 getPropertyValue()"],
          ["set", "🖊️ setProperty()"],
          ["scroll", "🪟 scrollTo()"],
        ].map(([id, texto]) => (
          <button
            key={id}
            type="button"
            className={`sjs-btn ${vista === id ? "sjs-btn--primary" : ""}`}
            onClick={() => setVista(id)}
          >
            {texto}
          </button>
        ))}
      </div>

      <div className="sjs-grid-2">
        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>📦 Elemento de pruebas</span>
            <span className="sjs-tag">.caja</span>
          </div>
          <div className="ex-preview-stage">
            <div ref={asignarPreview} className="ex-preview">
              Hola CSSOM
            </div>
          </div>
          <div className="sjs-tags">
            <span className="sjs-tag">background-color</span>
            <span className="sjs-tag">border-radius</span>
            <span className="sjs-tag">--mi-color</span>
          </div>
        </div>

        <div className="sjs-card">
          {vista === "computed" && (
            <>
              <div className="sjs-card__label">
                <span>🔍 getComputedStyle(el)</span>
                <span className="sjs-tag sjs-tag--info">CSSStyleDeclaration</span>
              </div>
              <table className="sjs-table">
                <tbody>
                  {PROPIEDADES.map((prop) => (
                    <tr key={prop}>
                      <th style={{ width: "52%" }}>{prop}</th>
                      <td>{computed[prop] || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="sjs-note" style={{ marginTop: 10 }}>
                <code>el.style.color</code> →{" "}
                <strong>{inline?.color ? inline.color : '"" (vacío)'}</strong>
              </div>
            </>
          )}

          {vista === "property" && (
            <>
              <div className="sjs-card__label">
                <span>🔎 getPropertyValue()</span>
              </div>
              <label className="sjs-field" style={{ marginBottom: 10 }}>
                <span>propiedad CSS</span>
                <select
                  className="sjs-select"
                  value={propiedad}
                  onChange={(e) => setPropiedad(e.target.value)}
                >
                  {[...PROPIEDADES, "--mi-color"].map((prop) => (
                    <option key={prop} value={prop}>
                      {prop}
                    </option>
                  ))}
                </select>
              </label>
              <div className="sjs-output sjs-output--ok">
                {`getComputedStyle(el).getPropertyValue("${propiedad}")`}
                {"\n→ "}
                <strong>{computed[propiedad] || '""'}</strong>
              </div>
              <div className="sjs-note" style={{ marginTop: 10 }}>
                Usa el nombre en <code>kebab-case</code>. La variante camelCase (
                <code>{propiedad.replace(/-([a-z])/g, (_, c) => c.toUpperCase())}</code>) también
                existe, pero <code>getPropertyValue()</code> exige guiones.
              </div>
            </>
          )}

          {vista === "set" && (
            <>
              <div className="sjs-card__label">
                <span>🖊️ setProperty()</span>
              </div>
              <label className="sjs-field" style={{ marginBottom: 8 }}>
                <span>propiedad</span>
                <input
                  className="sjs-input"
                  value={propiedad}
                  onChange={(e) => setPropiedad(e.target.value)}
                  spellCheck={false}
                />
              </label>
              <label className="sjs-field" style={{ marginBottom: 8 }}>
                <span>valor</span>
                <input
                  className="sjs-input"
                  value={valorProp}
                  onChange={(e) => setValorProp(e.target.value)}
                  spellCheck={false}
                />
              </label>
              <label className="sjs-check" style={{ marginBottom: 12 }}>
                <input
                  type="checkbox"
                  checked={prioridad === "important"}
                  onChange={(e) => setPrioridad(e.target.checked ? "important" : "")}
                />
                !important
              </label>
              <div className="sjs-actions">
                <button
                  type="button"
                  className="sjs-btn sjs-btn--primary"
                  onClick={aplicar}
                >
                  🖊️ setProperty()
                </button>
                <button
                  type="button"
                  className="sjs-btn"
                  onClick={() => {
                    setPropiedad("--mi-color");
                    setValorProp("#ff5a5f");
                  }}
                >
                  🎨 variable CSS
                </button>
                <button type="button" className="sjs-btn sjs-btn--danger" onClick={reiniciar}>
                  🔄 Reiniciar estilos
                </button>
              </div>
              <div className="sjs-output" style={{ marginTop: 10 }}>
                {styleAttr || 'Sin estilos en línea (style="")'}
              </div>
            </>
          )}

          {vista === "scroll" && (
            <>
              <div className="sjs-card__label">
                <span>🪟 scrollTo() · simulado</span>
              </div>
              <div
                ref={scrollRef}
                className="ex-scroll"
                tabIndex={0}
                aria-label="Documento simulado con scroll"
              >
                <div className="ex-scroll__content">
                  <h4>📄 Inicio del documento</h4>
                  {Array.from({ length: 14 }, (_, i) => (
                    <p key={i}>
                      Línea {i + 1} del documento simulado. Desplázate con los botones o con la
                      rueda del ratón.
                    </p>
                  ))}
                  <h4>🏁 Final del documento</h4>
                </div>
              </div>
              <div className="sjs-actions" style={{ marginTop: 10 }}>
                <button
                  type="button"
                  className="sjs-btn sjs-btn--primary"
                  onClick={() => moverScroll("top")}
                >
                  ⬆️ scrollTo(top: 0)
                </button>
                <button type="button" className="sjs-btn" onClick={() => moverScroll("middle")}>
                  ↔️ centro
                </button>
                <button type="button" className="sjs-btn" onClick={() => moverScroll("bottom")}>
                  ⬇️ scrollTo(final)
                </button>
              </div>
              <div className="sjs-output sjs-output--muted" style={{ marginTop: 10 }}>
                scrollTop: {medidas.top}px · scrollHeight: {medidas.height}px · clientHeight:{" "}
                {medidas.client}px
              </div>
            </>
          )}
        </div>
      </div>
    </MarcoSimulador>
  );
}
