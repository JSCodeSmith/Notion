import { useState } from "react";
import MarcoSimulador from "../SimuladoresJS/MarcoSimulador";
import { CSS_APUNTE_CATEGORIA } from "../../data/cssApuntes";
import "./SimuladorCSS.css";

const MARCO = "#8b7bff";
const ACENTO = "#22d3ee";
const TEXTO = "#e9e9ec";

/* ------------------------------------------------------------------ */
/* Piezas comunes                                                      */
/* ------------------------------------------------------------------ */

function Campo({ label, children }) {
  return (
    <label className="sjs-field">
      {label}
      {children}
    </label>
  );
}

function Rango({ label, value, onChange, min = 0, max = 100, step = 1, unidad = "px" }) {
  return (
    <label className="sjs-field">
      <span className="css-range__label">
        {label}
        <strong>
          {value}
          {unidad}
        </strong>
      </span>
      <input
        className="css-range"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </label>
  );
}

function Select({ value, onChange, options }) {
  return (
    <select
      className="sjs-select"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Box Model                                                        */
/* ------------------------------------------------------------------ */

function SimuladorBoxModel() {
  const [ancho, setAncho] = useState(220);
  const [alto, setAlto] = useState(130);
  const [padding, setPadding] = useState(18);
  const [margen, setMargen] = useState(14);
  const [borde, setBorde] = useState(4);
  const [radio, setRadio] = useState(10);
  const [modelo, setModelo] = useState("border-box");

  const anchoTotal =
    modelo === "border-box" ? ancho : ancho + padding * 2 + borde * 2;
  const altoTotal =
    modelo === "border-box" ? alto : alto + padding * 2 + borde * 2;

  const codigo = `.caja {
  width: ${ancho}px;
  height: ${alto}px;
  padding: ${padding}px;
  margin: ${margen}px;
  border: ${borde}px solid ${MARCO};
  border-radius: ${radio}px;
  box-sizing: ${modelo};
}`;

  return (
    <MarcoSimulador
      icon="📦"
      titulo="Box Model"
      descripcion="Cambia tamaño, padding, margen y borde. Observa cómo cambia la caja y cuánto ocupa realmente en el layout."
      codigo={codigo}
      nota={
        <>
          💡 Con <code>box-sizing: border-box</code> el <code>width</code> incluye
          padding y borde. Con <code>content-box</code> se suman aparte.
        </>
      }
      consola={
        <>
          <div className="log-system">📦 Medidas de la caja</div>
          <div className="log-iteration">
            Tamaño declarado: <strong>{ancho} × {alto} px</strong>
          </div>
          <div className="log-iteration">
            Ocupa en el layout: <strong>{anchoTotal} × {altoTotal} px</strong>
          </div>
          <div className="log-iteration">
            Contenido útil:{" "}
            <strong>
              {Math.max(0, ancho - padding * 2 - borde * 2)} ×{" "}
              {Math.max(0, alto - padding * 2 - borde * 2)} px
            </strong>
          </div>
          <div className="log-iteration">
            Margen exterior: <strong>{margen}px</strong> por cada lado
          </div>
        </>
      }
    >
      <div className="css-sim-grid">
        <div className="css-controls">
          <Rango label="width" value={ancho} onChange={setAncho} min={80} max={340} />
          <Rango label="height" value={alto} onChange={setAlto} min={60} max={240} />
          <Rango label="padding" value={padding} onChange={setPadding} min={0} max={48} />
          <Rango label="margin" value={margen} onChange={setMargen} min={0} max={48} />
          <Rango label="border" value={borde} onChange={setBorde} min={0} max={16} />
          <Rango label="border-radius" value={radio} onChange={setRadio} min={0} max={60} />
          <Campo label="box-sizing">
            <Select
              value={modelo}
              onChange={setModelo}
              options={["border-box", "content-box"]}
            />
          </Campo>
        </div>

        <div className="css-stage css-stage--box">
          <span className="css-stage__tag">margin</span>
          <div
            className="css-box-margin"
            style={{ padding: margen }}
            aria-label="Zona de margen"
          >
            <div
              className="css-box-element"
              style={{
                width: ancho,
                height: alto,
                padding,
                border: `${borde}px solid ${MARCO}`,
                borderRadius: radio,
                boxSizing: modelo,
              }}
            >
              <div className="css-box-content">
                <strong>contenido</strong>
                <span>padding + borde</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MarcoSimulador>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Colores y fondos                                                 */
/* ------------------------------------------------------------------ */

function SimuladorColores() {
  const [colorTexto, setColorTexto] = useState(TEXTO);
  const [colorFondo, setColorFondo] = useState(MARCO);
  const [colorSecundario, setColorSecundario] = useState(ACENTO);
  const [degradado, setDegradado] = useState(true);
  const [radio, setRadio] = useState(14);
  const [padding, setPadding] = useState(22);
  const [opacidad, setOpacidad] = useState(1);

  const fondo = degradado
    ? `linear-gradient(135deg, ${colorFondo}, ${colorSecundario})`
    : colorFondo;

  const codigo = `.tarjeta {
  color: ${colorTexto};
  background: ${fondo};
  border-radius: ${radio}px;
  padding: ${padding}px;
  opacity: ${opacidad};
}`;

  return (
    <MarcoSimulador
      icon="🎨"
      titulo="Colores y fondos"
      descripcion="Prueba colores de texto y fondo, degradados, opacidad y radio. El CSS se actualiza mientras experimentas."
      codigo={codigo}
      nota={
        <>
          💡 <code>background</code> es un shorthand: puede incluir color,
          imagen, posición, tamaño y repetición en una sola declaración.
        </>
      }
      consola={
        <>
          <div className="log-system">🎨 Valores actuales</div>
          <div className="log-iteration">
            color → <strong>{colorTexto}</strong>
          </div>
          <div className="log-iteration">
            background → <strong>{degradado ? "linear-gradient" : colorFondo}</strong>
          </div>
          <div className="log-iteration">
            opacidad → <strong>{Math.round(opacidad * 100)}%</strong>
          </div>
        </>
      }
    >
      <div className="css-sim-grid">
        <div className="css-controls">
          <Campo label="color del texto">
            <input
              className="css-color"
              type="color"
              value={colorTexto}
              onChange={(event) => setColorTexto(event.target.value)}
            />
          </Campo>
          <Campo label="color de fondo">
            <input
              className="css-color"
              type="color"
              value={colorFondo}
              onChange={(event) => setColorFondo(event.target.value)}
            />
          </Campo>
          <Campo label="segundo color">
            <input
              className="css-color"
              type="color"
              value={colorSecundario}
              onChange={(event) => setColorSecundario(event.target.value)}
            />
          </Campo>
          <label className="sjs-check">
            <input
              type="checkbox"
              checked={degradado}
              onChange={(event) => setDegradado(event.target.checked)}
            />
            Usar degradado
          </label>
          <Rango label="border-radius" value={radio} onChange={setRadio} min={0} max={60} />
          <Rango label="padding" value={padding} onChange={setPadding} min={0} max={48} />
          <Rango
            label="opacity"
            value={opacidad}
            onChange={setOpacidad}
            min={0.1}
            max={1}
            step={0.05}
            unidad=""
          />
        </div>

        <div className="css-stage">
          <div
            className="css-color-card"
            style={{
              color: colorTexto,
              background: fondo,
              borderRadius: radio,
              padding,
              opacity: opacidad,
            }}
          >
            <span className="css-color-card__eyebrow">CSS · background</span>
            <strong>Colores y fondos</strong>
            <p>
              El fondo puede ser un color sólido o una composición de capas con
              imágenes y degradados.
            </p>
            <div className="css-color-card__swatches">
              <span style={{ background: colorFondo }} />
              <span style={{ background: colorSecundario }} />
              <span style={{ background: colorTexto }} />
            </div>
          </div>
        </div>
      </div>
    </MarcoSimulador>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Flexbox                                                          */
/* ------------------------------------------------------------------ */

const DIRECCIONES = ["row", "row-reverse", "column", "column-reverse"];
const JUSTIFY = [
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "space-evenly",
];
const ALIGN = ["stretch", "flex-start", "center", "flex-end", "baseline"];
const ALIGN_CONTENT = [
  "flex-start",
  "center",
  "flex-end",
  "space-between",
  "space-around",
  "stretch",
];
const WRAP = ["nowrap", "wrap", "wrap-reverse"];

function SimuladorFlexbox() {
  const [direccion, setDireccion] = useState("row");
  const [justify, setJustify] = useState("flex-start");
  const [align, setAlign] = useState("stretch");
  const [alignContent, setAlignContent] = useState("stretch");
  const [wrap, setWrap] = useState("wrap");
  const [gap, setGap] = useState(14);

  const codigo = `.contenedor {
  display: flex;
  flex-direction: ${direccion};
  justify-content: ${justify};
  align-items: ${align};
  align-content: ${alignContent};
  flex-wrap: ${wrap};
  gap: ${gap}px;
}`;

  return (
    <MarcoSimulador
      icon="🧱"
      titulo="Flexbox"
      descripcion="Juega con el eje principal, el eje transversal, el wrap y el gap. Cada cambio se refleja al instante."
      codigo={codigo}
      nota={
        <>
          💡 <code>justify-content</code> alinea en el eje principal;{" "}
          <code>align-items</code> en el transversal. <code>align-content</code>{" "}
          solo tiene efecto cuando hay varias líneas.
        </>
      }
      consola={
        <>
          <div className="log-system">🧱 Contenedor flex</div>
          <div className="log-iteration">
            Eje principal → <strong>{direccion}</strong>
          </div>
          <div className="log-iteration">
            Distribución → <strong>{justify}</strong>
          </div>
          <div className="log-iteration">
            Alineación → <strong>{align}</strong>
          </div>
          <div className="log-iteration">
            Líneas → <strong>{wrap}</strong>
          </div>
        </>
      }
    >
      <div className="css-sim-grid">
        <div className="css-controls">
          <Campo label="flex-direction">
            <Select value={direccion} onChange={setDireccion} options={DIRECCIONES} />
          </Campo>
          <Campo label="justify-content">
            <Select value={justify} onChange={setJustify} options={JUSTIFY} />
          </Campo>
          <Campo label="align-items">
            <Select value={align} onChange={setAlign} options={ALIGN} />
          </Campo>
          <Campo label="align-content">
            <Select
              value={alignContent}
              onChange={setAlignContent}
              options={ALIGN_CONTENT}
            />
          </Campo>
          <Campo label="flex-wrap">
            <Select value={wrap} onChange={setWrap} options={WRAP} />
          </Campo>
          <Rango label="gap" value={gap} onChange={setGap} min={0} max={36} />
        </div>

        <div className="css-stage">
          <div
            className="css-flex-preview"
            style={{
              flexDirection: direccion,
              justifyContent: justify,
              alignItems: align,
              alignContent,
              flexWrap: wrap,
              gap,
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="css-flex-item"
                style={{ height: 30 + ((n * 13) % 28) }}
              >
                {n}
              </div>
            ))}
          </div>
        </div>
      </div>
    </MarcoSimulador>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Tablas                                                           */
/* ------------------------------------------------------------------ */

function SimuladorTablas() {
  const [collapse, setCollapse] = useState("collapse");
  const [espacioX, setEspacioX] = useState(6);
  const [espacioY, setEspacioY] = useState(6);
  const [borde, setBorde] = useState(1);
  const [radio, setRadio] = useState(0);

  const codigo = `table {
  border-collapse: ${collapse};
  border-spacing: ${espacioX}px ${espacioY}px;
}

th, td {
  border: ${borde}px solid ${MARCO};
  padding: 8px 12px;
  border-radius: ${radio}px;
}`;

  return (
    <MarcoSimulador
      icon="▦"
      titulo="Propiedades de tablas"
      descripcion="Compara border-collapse con border-spacing y observa cómo cambian los bordes y la separación entre celdas."
      codigo={codigo}
      nota={
        <>
          💡 <code>border-spacing</code> solo funciona cuando{" "}
          <code>border-collapse: separate</code>. Si los bordes están
          colapsados, el espaciado se ignora.
        </>
      }
      consola={
        <>
          <div className="log-system">▦ Tabla</div>
          <div className="log-iteration">
            border-collapse → <strong>{collapse}</strong>
          </div>
          <div className="log-iteration">
            border-spacing → <strong>{espacioX}px {espacioY}px</strong>
          </div>
          <div className="log-iteration">
            {collapse === "collapse"
              ? "⚠️ El espaciado no se aplica con bordes colapsados."
              : "✅ El espaciado sí se aplica."}
          </div>
        </>
      }
    >
      <div className="css-sim-grid">
        <div className="css-controls">
          <Campo label="border-collapse">
            <Select
              value={collapse}
              onChange={setCollapse}
              options={["collapse", "separate"]}
            />
          </Campo>
          <Rango label="border-spacing X" value={espacioX} onChange={setEspacioX} min={0} max={24} />
          <Rango label="border-spacing Y" value={espacioY} onChange={setEspacioY} min={0} max={24} />
          <Rango label="border-width" value={borde} onChange={setBorde} min={0} max={8} />
          <Rango label="border-radius" value={radio} onChange={setRadio} min={0} max={18} />
        </div>

        <div className="css-stage css-stage--table">
          <table
            className="css-table-preview"
            style={{
              borderCollapse: collapse,
              borderSpacing: `${espacioX}px ${espacioY}px`,
            }}
          >
            <thead>
              <tr>
                {["Producto", "Precio", "Stock"].map((celda) => (
                  <th
                    key={celda}
                    style={{
                      border: `${borde}px solid ${MARCO}`,
                      borderRadius: radio,
                    }}
                  >
                    {celda}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ["Teclado", "45 €", "12"],
                ["Ratón", "25 €", "30"],
                ["Monitor", "180 €", "7"],
              ].map((fila) => (
                <tr key={fila[0]}>
                  {fila.map((celda) => (
                    <td
                      key={celda}
                      style={{
                        border: `${borde}px solid ${MARCO}`,
                        borderRadius: radio,
                      }}
                    >
                      {celda}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </MarcoSimulador>
  );
}

/* ------------------------------------------------------------------ */
/* 5. Pseudoclases                                                     */
/* ------------------------------------------------------------------ */

const PSEUDOS = ["hover", "focus", "first-child", "last-child", "nth-child(n)"];
const FORMULAS = ["2n", "2n+1", "3", "odd", "even"];

function cumpleFormula(posicion, formula) {
  if (formula === "odd") return posicion % 2 === 1;
  if (formula === "even") return posicion % 2 === 0;
  const match = formula.match(/^(\d*)n(?:\+(\d+))?$/);
  if (!match) return posicion === Number(formula);
  const a = match[1] === "" ? 1 : Number(match[1]);
  const b = Number(match[2] ?? 0);
  return posicion >= b && (posicion - b) % a === 0;
}

function SimuladorPseudoclases({ metodoId = "" }) {
  const inicial = metodoId.includes("nth-child")
    ? "nth-child(n)"
    : PSEUDOS.find((pseudo) => metodoId.includes(pseudo)) ?? "hover";
  const [pseudo, setPseudo] = useState(inicial);
  const [formula, setFormula] = useState("2n+1");
  const [hover, setHover] = useState(-1);
  const [focus, setFocus] = useState(-1);

  const coincide = (indice) => {
    const posicion = indice + 1;
    if (pseudo === "hover") return hover === indice;
    if (pseudo === "focus") return focus === indice;
    if (pseudo === "first-child") return posicion === 1;
    if (pseudo === "last-child") return posicion === 5;
    return cumpleFormula(posicion, formula);
  };

  const selector =
    pseudo === "nth-child(n)" ? `li:nth-child(${formula})` : `li:${pseudo}`;

  const codigo = `${selector} {
  background: ${MARCO};
  color: #fff;
  border-color: ${ACENTO};
  transform: translateX(6px);
}`;

  return (
    <MarcoSimulador
      icon="⚡"
      titulo="Pseudoclases"
      descripcion="Cambia de pseudoclase y explora los estados. En hover y focus, pasa el ratón o usa Tab sobre la lista."
      codigo={codigo}
      nota={
        <>
          💡 Las pseudoclases de interacción responden al usuario; las
          estructurales dependen de la posición del elemento en el DOM.
        </>
      }
      consola={
        <>
          <div className="log-system">⚡ Selector actual</div>
          <div className="log-iteration">
            <strong>{selector}</strong>
          </div>
          <div className="log-iteration">
            {pseudo === "hover" || pseudo === "focus"
              ? "Interactúa con la lista para ver el efecto."
              : "Los elementos que cumplen la condición se resaltan."}
          </div>
        </>
      }
    >
      <div className="css-sim-grid">
        <div className="css-controls">
          <Campo label="pseudoclase">
            <Select value={pseudo} onChange={setPseudo} options={PSEUDOS} />
          </Campo>
          {pseudo === "nth-child(n)" && (
            <Campo label="fórmula de nth-child">
              <Select value={formula} onChange={setFormula} options={FORMULAS} />
            </Campo>
          )}
          <div className="css-pseudo-hint">
            <span>Prueba a cambiar la fórmula</span>
            <code>{selector}</code>
          </div>
        </div>

        <div className="css-stage">
          <ul className="css-pseudo-list">
            {["Inicio", "Productos", "Servicios", "Blog", "Contacto"].map(
              (texto, indice) => (
                <li key={texto}>
                  <button
                    type="button"
                    className={`css-pseudo-item ${coincide(indice) ? "is-match" : ""}`}
                    onMouseEnter={() => setHover(indice)}
                    onMouseLeave={() => setHover(-1)}
                    onFocus={() => setFocus(indice)}
                    onBlur={() => setFocus(-1)}
                  >
                    <span>{indice + 1}</span>
                    {texto}
                  </button>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>
    </MarcoSimulador>
  );
}

/* ------------------------------------------------------------------ */
/* 6. Texto y tipografía                                               */
/* ------------------------------------------------------------------ */

function SimuladorTipografia() {
  const [familia, setFamilia] = useState("var(--font-sans)");
  const [tamano, setTamano] = useState(20);
  const [peso, setPeso] = useState("400");
  const [interlineado, setInterlineado] = useState(1.6);
  const [alineacion, setAlineacion] = useState("left");
  const [espaciado, setEspaciado] = useState(0);

  const codigo = `.texto {
  font-family: ${familia};
  font-size: ${tamano}px;
  font-weight: ${peso};
  line-height: ${interlineado};
  text-align: ${alineacion};
  letter-spacing: ${espaciado}px;
}`;

  return (
    <MarcoSimulador
      icon="🔤"
      titulo="Texto y tipografía"
      descripcion="Ajusta familia, tamaño, peso, interlineado, alineación y espaciado. La legibilidad cambia con cada valor."
      codigo={codigo}
      nota={
        <>
          💡 <code>line-height</code> sin unidades es proporcional al tamaño de
          fuente. Un valor entre <code>1.4</code> y <code>1.7</code> suele
          funcionar bien para párrafos.
        </>
      }
      consola={
        <>
          <div className="log-system">🔤 Tipografía aplicada</div>
          <div className="log-iteration">
            font-size → <strong>{tamano}px</strong>
          </div>
          <div className="log-iteration">
            line-height → <strong>{interlineado}</strong>
          </div>
          <div className="log-iteration">
            text-align → <strong>{alineacion}</strong>
          </div>
        </>
      }
    >
      <div className="css-sim-grid">
        <div className="css-controls">
          <Campo label="font-family">
            <Select
              value={familia}
              onChange={setFamilia}
              options={[
                "var(--font-sans)",
                "Georgia, serif",
                "var(--font-mono)",
                "'Trebuchet MS', sans-serif",
              ]}
            />
          </Campo>
          <Rango label="font-size" value={tamano} onChange={setTamano} min={12} max={40} />
          <Campo label="font-weight">
            <Select
              value={peso}
              onChange={setPeso}
              options={["300", "400", "500", "600", "700", "800"]}
            />
          </Campo>
          <Rango
            label="line-height"
            value={interlineado}
            onChange={setInterlineado}
            min={1}
            max={2.4}
            step={0.1}
            unidad=""
          />
          <Campo label="text-align">
            <Select
              value={alineacion}
              onChange={setAlineacion}
              options={["left", "center", "right", "justify"]}
            />
          </Campo>
          <Rango label="letter-spacing" value={espaciado} onChange={setEspaciado} min={-1} max={4} />
        </div>

        <div className="css-stage">
          <div
            className="css-type-preview"
            style={{
              fontFamily: familia,
              fontSize: tamano,
              fontWeight: peso,
              lineHeight: interlineado,
              textAlign: alineacion,
              letterSpacing: espaciado,
            }}
          >
            <strong>La tipografía también es diseño.</strong>
            <p>
              Un buen texto combina tamaño, contraste y espacio. Prueba a subir
              el interlineado para respirar mejor y a cambiar la alineación para
              adaptar el ritmo de lectura.
            </p>
            <p className="css-type-preview__small">
              Párrafo secundario: mismo estilo, menor jerarquía visual.
            </p>
          </div>
        </div>
      </div>
    </MarcoSimulador>
  );
}

/* ------------------------------------------------------------------ */
/* 7. Composición visual                                               */
/* ------------------------------------------------------------------ */

const IMAGEN = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="420" height="240" viewBox="0 0 420 240">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#8b7bff"/>
      <stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  <rect width="420" height="240" fill="#121216"/>
  <circle cx="110" cy="90" r="58" fill="url(#g)" opacity=".9"/>
  <rect x="210" y="50" width="150" height="150" rx="22" fill="url(#g)" opacity=".75"/>
  <path d="M40 200 L170 110 L300 200 Z" fill="#f0f0f5" opacity=".16"/>
</svg>`)}`;

function SimuladorComposicion() {
  const [display, setDisplay] = useState("flex");
  const [position, setPosition] = useState("relative");
  const [sombraX, setSombraX] = useState(0);
  const [sombraY, setSombraY] = useState(18);
  const [difuminado, setDifuminado] = useState(36);
  const [expansion, setExpansion] = useState(0);
  const [radio, setRadio] = useState(16);
  const [ajuste, setAjuste] = useState("cover");

  const codigo = `.tarjeta {
  display: ${display};
  position: ${position};
  border-radius: ${radio}px;
  box-shadow: ${sombraX}px ${sombraY}px ${difuminado}px ${expansion}px rgba(0, 0, 0, 0.55);
}

.imagen {
  object-fit: ${ajuste};
}`;

  return (
    <MarcoSimulador
      icon="🎭"
      titulo="Composición visual"
      descripcion="Experimenta con display, position, sombras, radios y object-fit para componer una tarjeta y una imagen."
      codigo={codigo}
      nota={
        <>
          💡 <code>position: absolute</code> se coloca respecto al ancestro
          posicionado más cercano; <code>object-fit</code> solo aplica a
          imágenes y vídeos.
        </>
      }
      consola={
        <>
          <div className="log-system">🎭 Composición</div>
          <div className="log-iteration">
            display → <strong>{display}</strong>
          </div>
          <div className="log-iteration">
            position → <strong>{position}</strong>
          </div>
          <div className="log-iteration">
            box-shadow → <strong>{sombraX}px {sombraY}px {difuminado}px {expansion}px</strong>
          </div>
          <div className="log-iteration">
            object-fit → <strong>{ajuste}</strong>
          </div>
        </>
      }
    >
      <div className="css-sim-grid">
        <div className="css-controls">
          <Campo label="display">
            <Select
              value={display}
              onChange={setDisplay}
              options={["block", "inline-block", "flex", "grid"]}
            />
          </Campo>
          <Campo label="position">
            <Select
              value={position}
              onChange={setPosition}
              options={["static", "relative", "absolute", "sticky"]}
            />
          </Campo>
          <Rango label="box-shadow X" value={sombraX} onChange={setSombraX} min={-30} max={30} />
          <Rango label="box-shadow Y" value={sombraY} onChange={setSombraY} min={-30} max={30} />
          <Rango label="blur" value={difuminado} onChange={setDifuminado} min={0} max={80} />
          <Rango label="spread" value={expansion} onChange={setExpansion} min={-10} max={20} />
          <Rango label="border-radius" value={radio} onChange={setRadio} min={0} max={40} />
          <Campo label="object-fit">
            <Select
              value={ajuste}
              onChange={setAjuste}
              options={["fill", "contain", "cover", "none", "scale-down"]}
            />
          </Campo>
        </div>

        <div className="css-stage css-stage--compose">
          <span className="css-compose-ref">referencia</span>
          <div
            className="css-compose-card"
            style={{
              display,
              position,
              top: position === "static" ? "auto" : 14,
              left: position === "static" ? "auto" : 14,
              borderRadius: radio,
              boxShadow: `${sombraX}px ${sombraY}px ${difuminado}px ${expansion}px rgba(0, 0, 0, 0.55)`,
            }}
          >
            <span>Tarjeta</span>
            <small>display + position</small>
          </div>
          <div className="css-compose-image">
            <img src={IMAGEN} alt="Composición abstracta de ejemplo" style={{ objectFit: ajuste }} />
          </div>
        </div>
      </div>
    </MarcoSimulador>
  );
}

/* ------------------------------------------------------------------ */
/* Registro                                                            */
/* ------------------------------------------------------------------ */

const SIMULADORES = {
  "box-model": SimuladorBoxModel,
  colores: SimuladorColores,
  flexbox: SimuladorFlexbox,
  tablas: SimuladorTablas,
  pseudoclases: SimuladorPseudoclases,
  tipografia: SimuladorTipografia,
  composicion: SimuladorComposicion,
};

export default function CSSSimulador({ metodoId }) {
  const categoriaId = CSS_APUNTE_CATEGORIA[metodoId] ?? "box-model";
  const Componente = SIMULADORES[categoriaId] ?? SimuladorBoxModel;
  return <Componente metodoId={metodoId} />;
}
