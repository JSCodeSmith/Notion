import { useState } from "react";
import CodeBlock from "../../../components/CodeBlock/CodeBlock";
import "../../../components/SimuladorFind/SimuladorFind.css";
import "./SimuladorConsola.css";

const comillas = (texto) => JSON.stringify(texto);

const escapar = (texto) => String(texto).replace(/\n/g, " ");

export default function SimuladorTiempo({ metodoId }) {
  const esTimeLog = metodoId === "console-time-log";
  const esTimeEnd = metodoId === "console-time-end";
  const defecto = esTimeLog
    ? "Proceso de datos"
    : esTimeEnd
      ? "Tiempo de Empaquetado"
      : "Bucle de prueba";
  const icono = esTimeLog ? "📍" : esTimeEnd ? "🏁" : "⏱️";
  const nombre = esTimeLog
    ? "console.timeLog()"
    : esTimeEnd
      ? "console.timeEnd()"
      : "console.time()";
  const intro = esTimeLog
    ? "Observa las lecturas intermedias del cronómetro sin detenerlo y qué pasa si la etiqueta no coincide. 🔄"
    : esTimeEnd
      ? "Detén el cronómetro, obtén el tiempo total y comprueba qué ocurre cuando la etiqueta no coincide. 🏁"
      : "Inicia un cronómetro, ejecuta el bloque y comprueba el tiempo final en milisegundos. 🏃";
  const editorHeader = esTimeLog
    ? "console.timeLog() · imprime el tiempo actual sin detener el temporizador"
    : esTimeEnd
      ? "console.timeEnd() · detiene el cronómetro, imprime el total y lo destruye"
      : "console.time() · inicia el cronómetro bajo una etiqueta";
  const etiquetaTerminal = esTimeLog
    ? "lecturas intermedias"
    : esTimeEnd
      ? "tiempo total"
      : "cronómetro";

  const [etiqueta, setEtiqueta] = useState(defecto);
  const [etiquetaFinal, setEtiquetaFinal] = useState(defecto);
  const [desajuste, setDesajuste] = useState(false);
  const [ejecutado, setEjecutado] = useState(false);

  const base = esTimeLog ? 4.88 : esTimeEnd ? 12.34 : 8.42;
  const fases = esTimeLog
    ? [
        { tipo: "start", badge: "⏱️ time", texto: `Inicia "${escapar(etiqueta)}"`, tiempo: 0 },
        { tipo: "log", badge: "📍 timeLog", texto: "Fase 1: Usuarios cargados", tiempo: 0.15 },
        { tipo: "log", badge: "📍 timeLog", texto: "Fase 2: Filtro completado", tiempo: 4.32 },
        { tipo: "end", badge: "🛑 timeEnd", texto: "Temporizador detenido", tiempo: base },
      ]
    : esTimeEnd
      ? [
          { tipo: "start", badge: "⏱️ time", texto: `Inicia "${escapar(etiqueta)}"`, tiempo: 0 },
          { tipo: "log", badge: "⚙️ código", texto: "Empaquetando 100.000 registros…", tiempo: null },
          { tipo: "end", badge: "🏁 timeEnd", texto: `Finaliza "${escapar(etiquetaFinal)}"`, tiempo: base },
          { tipo: "system", badge: "🗑️ liberado", texto: "Temporizador eliminado de memoria", tiempo: null },
        ]
      : [
          { tipo: "start", badge: "⏱️ time", texto: `Inicia "${escapar(etiqueta)}"`, tiempo: 0 },
          { tipo: "log", badge: "⚙️ código", texto: "Ejecutando el bloque a medir…", tiempo: null },
          { tipo: "end", badge: "🛑 timeEnd", texto: `Finaliza "${escapar(etiquetaFinal)}"`, tiempo: base },
        ];

  const etiquetaUsada = desajuste
    ? esTimeLog
      ? "Proceso_de_datos"
      : esTimeEnd
        ? "tiempo_de_empaquetado"
        : "bucle_de_prueba"
    : etiqueta;

  const codigo = esTimeLog
    ? `console.time(${comillas(etiqueta)});

const usuarios = ["Ana", "Pedro", "Luis"];
console.timeLog(${comillas(etiqueta)}, "Fase 1: Usuarios cargados");

for (let i = 0; i < 500_000; i++) {}
console.timeLog(${comillas(etiqueta)}, "Fase 2: Filtro completado");

console.timeEnd(${comillas(desajuste ? etiquetaUsada : etiquetaFinal)});`
    : esTimeEnd
      ? `console.time(${comillas(etiqueta)});

const datos = Array.from(
  { length: 100_000 },
  (_, i) => \`Item \${i}\`
);

console.timeEnd(${comillas(desajuste ? etiquetaUsada : etiquetaFinal)});`
      : `console.time(${comillas(etiqueta)});

const arr = [];
for (let i = 0; i < 1_000_000; i++) {
  arr.push(i);
}

console.timeEnd(${comillas(desajuste ? etiquetaUsada : etiquetaFinal)});`;

  const lineas = desajuste
    ? [
        {
          tipo: "error",
          badge: "⚠️ Warning",
          texto: `No label '${escapar(etiquetaUsada)}' found for ${
            esTimeLog ? "console.timeLog()" : "console.timeEnd()"
          }`,
          tiempo: null,
        },
      ]
    : fases;

  const cambiarEtiqueta = (valor) => {
    setEtiqueta(valor);
    if (!desajuste) setEtiquetaFinal(valor);
    setEjecutado(false);
  };

  const alternarDesajuste = (valor) => {
    setDesajuste(valor);
    setEtiquetaFinal(
      valor
        ? esTimeLog
          ? "Proceso_de_datos"
          : esTimeEnd
            ? "tiempo_de_empaquetado"
            : "bucle_de_prueba"
        : etiqueta,
    );
    setEjecutado(false);
  };

  return (
    <div className="sim-container csim-sim">
      <div className="sim-header">
        <h3>
          {icono} Simulador Interactivo: <code>{nombre}</code>
        </h3>
        <p className="csim-intro">{intro}</p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">{editorHeader}</div>

        <div className="csim-controls">
          <label className="csim-field">
            <span>🏷️ Etiqueta de inicio</span>
            <input
              className="sim-input csim-input"
              type="text"
              value={etiqueta}
              onChange={(e) => cambiarEtiqueta(e.target.value)}
            />
          </label>

          {!esTimeLog && (
            <label className="csim-field">
              <span>🏷️ Etiqueta de cierre (timeEnd)</span>
              <input
                className="sim-input csim-input"
                type="text"
                value={etiquetaFinal}
                onChange={(e) => {
                  setEtiquetaFinal(e.target.value);
                  setDesajuste(e.target.value !== etiqueta);
                  setEjecutado(false);
                }}
              />
            </label>
          )}

          <label className="csim-check">
            <input
              type="checkbox"
              checked={desajuste}
              onChange={(e) => alternarDesajuste(e.target.checked)}
            />
            <span>⚠️ Usar una etiqueta distinta</span>
          </label>
        </div>

        <div className="csim-code">
          <CodeBlock code={codigo} />
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
              setEtiqueta(defecto);
              setEtiquetaFinal(defecto);
              setDesajuste(false);
              setEjecutado(false);
            }}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="csim-terminal">
        <div className="csim-term-head">
          <span>🖥️ Consola · DevTools</span>
          <span className="csim-term-tag">{etiquetaTerminal}</span>
        </div>
        <div className="csim-term-body">
          {!ejecutado ? (
            <span className="csim-empty">
              Esperando ejecución... pulsa <strong>▶ Ejecutar</strong>. 👀
            </span>
          ) : (
            <>
              <div className="csim-timeline">
                {lineas.map((linea, i) => (
                  <div key={i} className={`csim-time-row csim-time-row--${linea.tipo}`}>
                    <span className="csim-time-badge">{linea.badge}</span>
                    <span className="csim-time-label">{linea.texto}</span>
                    {linea.tiempo !== null && linea.tiempo !== undefined && (
                      <span className="csim-time-label" style={{ marginLeft: "auto" }}>
                        {linea.tiempo.toFixed(2)} ms
                      </span>
                    )}
                  </div>
                ))}
              </div>

              {!desajuste && (
                <div className="csim-line csim-line--log" style={{ marginTop: 10 }}>
                  <span className="csim-line__icon">🖥️</span>
                  <span>
                    {esTimeLog ? `${etiqueta}: ${base.toFixed(2)}ms` : `${etiquetaFinal}: ${base.toFixed(2)}ms`}
                  </span>
                </div>
              )}

              {desajuste && (
                <div className="csim-note csim-note--error" style={{ marginTop: 10 }}>
                  ❌ Las etiquetas distinguen mayúsculas y minúsculas. El
                  temporizador se registró como <code>{etiqueta}</code> y se
                  intentó cerrar como <code>{etiquetaUsada}</code>, por lo que no
                  se encontró.
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="csim-note">
        💡 {esTimeLog
          ? "timeLog() no detiene el cronómetro: puedes tomar tantas lecturas como necesites y cerrarlo al final con timeEnd()."
          : esTimeEnd
            ? "timeEnd() destruye el temporizador: una segunda llamada con la misma etiqueta mostrará una advertencia. En operaciones asíncronas, ciérralo en finally."
            : "Puedes tener varios temporizadores simultáneos usando etiquetas diferentes. Para microsegundos usa performance.now()."}
      </div>
    </div>
  );
}
