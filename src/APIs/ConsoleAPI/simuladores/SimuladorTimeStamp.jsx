import { useState } from "react";
import CodeBlock from "../../../components/CodeBlock/CodeBlock";
import "../../../components/SimuladorFind/SimuladorFind.css";
import "./SimuladorConsola.css";

const ESCENARIOS = {
  render: {
    label: "📊 Render de un gráfico",
    marca: "📊 Inicio Render Gráfico",
    codigo: `function renderizarGraficoComplejo() {
  console.timeStamp("📊 Inicio Render Gráfico");

  // Lógica pesada que interactúa con el DOM...
  for (let i = 0; i < 50000; i++) {}
}

renderizarGraficoComplejo();`,
    barras: [
      { tipo: "script", etiqueta: "Scripting", ancho: 38 },
      { tipo: "render", etiqueta: "Rendering", ancho: 34 },
      { tipo: "paint", etiqueta: "Painting", ancho: 28 },
    ],
    marcas: [
      { label: "📊 Inicio Render Gráfico", pos: 12 },
      { label: "🏁 Fin Render", pos: 74 },
    ],
  },
  fetch: {
    label: "🌐 Respuesta de API",
    marca: "✅ Respuesta recibida",
    codigo: `async function cargarDatos() {
  console.timeStamp("🌐 Inicio petición");

  const respuesta = await fetch("/api/datos");
  await respuesta.json();

  console.timeStamp("✅ Respuesta recibida");
}

cargarDatos();`,
    barras: [
      { tipo: "script", etiqueta: "Scripting", ancho: 20 },
      { tipo: "wait", etiqueta: "Network / espera", ancho: 55 },
      { tipo: "render", etiqueta: "Rendering", ancho: 25 },
    ],
    marcas: [
      { label: "🌐 Inicio petición", pos: 10 },
      { label: "✅ Respuesta recibida", pos: 76 },
    ],
  },
  frame: {
    label: "🎮 Frame de animación",
    marca: "🎮 Frame 120",
    codigo: `function actualizarFrame(numeroFrame) {
  console.timeStamp(\`🎮 Frame \${numeroFrame}\`);

  // Cálculo de colisiones y físicas...
  detectarColisiones();
  actualizarPosiciones();
}

actualizarFrame(120);`,
    barras: [
      { tipo: "script", etiqueta: "Scripting", ancho: 45 },
      { tipo: "render", etiqueta: "Rendering", ancho: 35 },
      { tipo: "paint", etiqueta: "Painting", ancho: 20 },
    ],
    marcas: [{ label: "🎮 Frame 120", pos: 48 }],
  },
};

const CLASES_BARRA = {
  script: "csim-perf-bar--script",
  render: "csim-perf-bar--render",
  paint: "csim-perf-bar--paint",
  wait: "csim-perf-bar--wait",
};

export default function SimuladorTimeStamp() {
  const [escenario, setEscenario] = useState("render");
  const [grabando, setGrabando] = useState(true);
  const [ejecutado, setEjecutado] = useState(false);

  const config = ESCENARIOS[escenario];

  return (
    <div className="sim-container csim-sim">
      <div className="sim-header">
        <h3>
          📌 Simulador Interactivo: <code>console.timeStamp()</code>
        </h3>
        <p className="csim-intro">
          Activa o desactiva la grabación de Performance y comprueba dónde
          aparece la marca de tiempo (o por qué no aparece). 🎬
        </p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">
          console.timeStamp() · su salida vive en la pestaña Performance
        </div>

        <div className="csim-controls">
          <label className="csim-field">
            <span>🎬 Escenario</span>
            <select
              className="sim-input csim-input"
              value={escenario}
              onChange={(e) => {
                setEscenario(e.target.value);
                setEjecutado(false);
              }}
            >
              {Object.entries(ESCENARIOS).map(([id, item]) => (
                <option key={id} value={id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="csim-check">
            <input
              type="checkbox"
              checked={grabando}
              onChange={(e) => {
                setGrabando(e.target.checked);
                setEjecutado(false);
              }}
            />
            <span>🔴 Grabación de Performance activa</span>
          </label>
        </div>

        <div className="csim-code">
          <CodeBlock code={config.codigo} />
        </div>

        <div className="csim-actions">
          <button
            type="button"
            className="sim-btn primary"
            onClick={() => setEjecutado(true)}
          >
            ▶ Ejecutar
          </button>
          <button
            type="button"
            className="sim-btn"
            onClick={() => {
              setEscenario("render");
              setGrabando(true);
              setEjecutado(false);
            }}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="csim-terminal">
        <div className="csim-term-head">
          <span>📊 Performance · Profiler</span>
          <span className={grabando ? "csim-rec is-on" : "csim-rec"}>
            {grabando ? "🔴 Grabando" : "⏹ Detenido"}
          </span>
        </div>
        <div className="csim-term-body">
          {!grabando ? (
            <div className="csim-empty">
              ⏹ No hay grabación activa. <code>console.timeStamp()</code> no
              produce ninguna salida visual: ni en Performance ni en la consola.
            </div>
          ) : !ejecutado ? (
            <span className="csim-empty">
              Grabación lista. Pulsa <strong>▶ Ejecutar</strong> para inyectar la
              marca en la línea de tiempo. 👀
            </span>
          ) : (
            <>
              <div className="csim-perf">
                <div className="csim-perf-track">
                  <div className="csim-perf-bars">
                    {config.barras.map((barra) => (
                      <div
                        key={barra.etiqueta}
                        className={`csim-perf-bar ${CLASES_BARRA[barra.tipo]}`}
                        style={{ width: `${barra.ancho}%` }}
                      >
                        <span>{barra.etiqueta}</span>
                      </div>
                    ))}
                  </div>

                  {config.marcas.map((marca) => (
                    <div
                      key={marca.label}
                      className="csim-perf-mark"
                      style={{ left: `${marca.pos}%` }}
                    >
                      <span className="csim-perf-flag">{marca.label}</span>
                      <span className="csim-perf-line" />
                    </div>
                  ))}
                </div>

                <div className="csim-perf-ruler" aria-hidden="true">
                  <span>0 ms</span>
                  <span>250 ms</span>
                  <span>500 ms</span>
                  <span>750 ms</span>
                </div>
              </div>

              <div className="csim-note" style={{ marginTop: 12 }}>
                💡 Pasa el cursor sobre la bandera para leer el nombre de la
                marca. En DevTools reales también puedes expandir la sección{" "}
                <strong>Timings</strong> del reporte.
              </div>
            </>
          )}
        </div>
      </div>

      <div className="csim-note">
        📌 <code>console.timeStamp()</code> no es un estándar formal: la mayoría
        de navegadores la soportan, pero en Node.js no hace nada. Para guardar
        marcas y operar con ellas usa <code>performance.mark()</code>.
      </div>
    </div>
  );
}
