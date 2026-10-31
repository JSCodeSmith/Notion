import { useState } from "react";
import MarcoSimulador from "../SimuladoresJS/MarcoSimulador";
import "../SimuladoresJS/SimuladoresJS.css";
import "./SimuladoresDOM.css";

const TIPOS = [
  {
    id: "alert",
    titulo: "window.alert()",
    icon: "🚨",
    boton: "Mostrar alert()",
    mensaje: "¡Hola desde alert()!",
    descripcion: "Muestra un mensaje y un único botón Aceptar. Devuelve undefined.",
  },
  {
    id: "confirm",
    titulo: "window.confirm()",
    icon: "❓",
    boton: "Mostrar confirm()",
    mensaje: "¿Seguro que quieres eliminar este elemento?",
    descripcion: "Muestra Aceptar y Cancelar. Devuelve true o false.",
  },
  {
    id: "prompt",
    titulo: "window.prompt()",
    icon: "✏️",
    boton: "Mostrar prompt()",
    mensaje: "¿Cómo te llamas?",
    descripcion: "Pide un texto. Devuelve un string o null si se cancela.",
  },
];

export default function SimuladorDialogos({ metodoId }) {
  const inicial =
    metodoId === "dlg-confirm" ? "confirm" : metodoId === "dlg-prompt" ? "prompt" : "alert";
  const [tipo, setTipo] = useState(inicial);
  const [mensaje, setMensaje] = useState(TIPOS.find((t) => t.id === inicial).mensaje);
  const [valor, setValor] = useState("Josué");
  const [abierto, setAbierto] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [historial, setHistorial] = useState([]);
  const [log, setLog] = useState([]);

  const config = TIPOS.find((t) => t.id === tipo);

  const pushLog = (estilo, texto) =>
    setLog((prev) => [...prev.slice(-24), { estilo, texto, id: Date.now() + Math.random() }]);

  const abrir = (nuevoTipo = tipo) => {
    const cfg = TIPOS.find((t) => t.id === nuevoTipo) ?? config;
    setTipo(nuevoTipo);
    setMensaje(cfg.mensaje);
    setValor("Josué");
    setAbierto(true);
    setResultado(null);
    pushLog("info", `${cfg.titulo}("${cfg.mensaje}") → esperando respuesta...`);
  };

  const responder = (respuesta) => {
    let devuelve;
    if (tipo === "alert") devuelve = undefined;
    else if (tipo === "confirm") devuelve = respuesta === "aceptar";
    else devuelve = respuesta === "aceptar" ? valor : null;

    setAbierto(false);
    setResultado(devuelve);
    setHistorial((prev) => [
      { id: Date.now(), tipo, devuelve, mensaje },
      ...prev.slice(0, 7),
    ]);
    pushLog(
      tipo === "alert" ? "ok" : devuelve ? "ok" : "warn",
      `${config.titulo} → ${devuelve === undefined ? "undefined" : JSON.stringify(devuelve)}`,
    );
  };

  const consola = log.length ? (
    log.map((linea) => (
      <div key={linea.id} className={`sjs-log__line sjs-log__line--${linea.estilo}`}>
        {linea.texto}
      </div>
    ))
  ) : (
    <span className="log-system">Abre un diálogo y elige una respuesta...</span>
  );

  const codigo =
    tipo === "alert"
      ? `alert("${mensaje}");\n// Devuelve undefined`
      : tipo === "confirm"
        ? `const respuesta = confirm("${mensaje}");\n\nif (respuesta) {\n  console.log("El usuario aceptó");\n} else {\n  console.log("El usuario canceló");\n}`
        : `const nombre = prompt("${mensaje}", "${valor}");\n\nif (nombre === null) {\n  console.log("El usuario canceló");\n} else {\n  console.log("Hola, " + nombre);\n}`;

  return (
    <>
      <MarcoSimulador
        icon={config.icon}
        titulo="Diálogos del navegador"
        descripcion="Prueba alert(), confirm() y prompt() con una versión no bloqueante. Observa exactamente qué valor devuelve cada uno."
        codigo={codigo}
        consola={consola}
        nota="⚠️ Los diálogos nativos bloquean la página y no se pueden personalizar. En proyectos reales se prefieren modales, formularios y componentes propios."
      >
        <div className="dom-lab">
          <div>
            <div className="sjs-card__label">
              <span>🪟 Vista previa del diálogo</span>
              <span className="sjs-tag">{config.titulo}</span>
            </div>

            <div className="sjs-preview" style={{ minHeight: 250 }}>
              <div style={{ textAlign: "center", padding: 18 }}>
                <div style={{ fontSize: 38 }}>{config.icon}</div>
                <p style={{ margin: "10px 0 4px", color: "#e0e0e0" }}>
                  {config.descripcion}
                </p>
                <p style={{ margin: 0, color: "#8f8f98", fontSize: 12 }}>
                  La ventana real la dibuja el navegador; aquí la simulamos para
                  poder verla dentro de la app.
                </p>
              </div>
            </div>

            {historial.length > 0 && (
              <div className="dlg-historial">
                <span className="sjs-card__label" style={{ marginBottom: 4 }}>🧾 Últimas respuestas</span>
                {historial.map((item) => (
                  <span key={item.id}>
                    {item.tipo} →{" "}
                    <strong style={{ color: item.devuelve ? "#6ee7a0" : "#ff9b9b" }}>
                      {item.devuelve === undefined ? "undefined" : JSON.stringify(item.devuelve)}
                    </strong>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="sjs-card">
            <div className="sjs-card__label">
              <span>🎛️ Configuración y prueba</span>
              <span className="sjs-tag">{resultado === null ? "sin respuesta" : `→ ${JSON.stringify(resultado)}`}</span>
            </div>

            <label className="sjs-field">
              <span>Mensaje</span>
              <textarea
                className="sjs-textarea"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
                spellCheck={false}
                style={{ minHeight: 72 }}
              />
            </label>

            {tipo === "prompt" && (
              <label className="sjs-field" style={{ marginTop: 12 }}>
                <span>Valor por defecto</span>
                <input
                  className="sjs-input"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  spellCheck={false}
                />
              </label>
            )}

            <div className="sjs-actions" style={{ marginTop: 14 }}>
              {TIPOS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  className={`sjs-btn${metodoId === `dlg-${item.id}` ? " sjs-btn--primary" : ""}`}
                  onClick={() => abrir(item.id)}
                >
                  {item.icon} {item.id}()
                </button>
              ))}
            </div>

            <div className="sjs-note" style={{ marginTop: 14 }}>
              💡 alert() devuelve <code>undefined</code>, confirm() devuelve{" "}
              <code>true</code>/<code>false</code> y prompt() devuelve un{" "}
              <code>string</code> o <code>null</code>.
            </div>
          </div>
        </div>
      </MarcoSimulador>

      {abierto && (
        <div className="dlg-fondo" role="presentation" onClick={() => responder("cancelar")}>
          <div
            className="dlg-caja"
            role="dialog"
            aria-modal="true"
            aria-label={config.titulo}
            onClick={(e) => e.stopPropagation()}
          >
            <h4>
              {config.icon} {config.titulo}
            </h4>
            <p className="dlg-mensaje">{mensaje}</p>

            {tipo === "prompt" && (
              <input
                className="sjs-input"
                style={{ width: "100%" }}
                value={valor}
                autoFocus
                onChange={(e) => setValor(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") responder("aceptar");
                  if (e.key === "Escape") responder("cancelar");
                }}
              />
            )}

            <div className="dlg-acciones">
              {tipo !== "alert" && (
                <button type="button" className="sjs-btn" onClick={() => responder("cancelar")}>
                  Cancelar
                </button>
              )}
              <button
                type="button"
                className="sjs-btn sjs-btn--primary"
                onClick={() => responder("aceptar")}
                autoFocus={tipo !== "prompt"}
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
