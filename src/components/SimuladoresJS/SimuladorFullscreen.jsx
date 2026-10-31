import { useState } from "react";
import MarcoSimulador from "./MarcoSimulador";

const ELEMENTOS = {
  video: { label: "Vídeo 🎬", icon: "🎬", fondo: "#101a2b" },
  canvas: { label: "Juego en canvas 🎮", icon: "🎮", fondo: "#1a102b" },
  galeria: { label: "Galería 🖼️", icon: "🖼️", fondo: "#2b1a10" },
};

export default function SimuladorFullscreen({ metodoId }) {
  const [activo, setActivo] = useState(null);
  const [seleccion, setSeleccion] = useState("video");
  const [habilitado, setHabilitado] = useState(true);
  const [logs, setLogs] = useState([
    { tipo: "system", texto: "Sin pantalla completa. document.fullscreenElement → null." },
  ]);

  const log = (tipo, texto) =>
    setLogs((prev) => [...prev.slice(-9), { tipo, texto }]);

  const entrar = () => {
    if (!habilitado) {
      log("error", "requestFullscreen(): document.fullscreenEnabled es false. Rechaza la promesa.");
      return;
    }
    if (activo) {
      log("warn", "Ya hay un elemento en fullscreen. Solo uno puede estar a la vez.");
      return;
    }
    setActivo(seleccion);
    log("success", "requestFullscreen() resolvió: " + ELEMENTOS[seleccion].label + " ocupa la pantalla.");
    log("info", "Se disparó fullscreenchange · document.fullscreenElement ya no es null.");
  };

  const salir = () => {
    if (!activo) {
      log("error", "document.exitFullscreen(): no hay elemento en fullscreen → TypeError.");
      return;
    }
    setActivo(null);
    log("success", "document.exitFullscreen() resolvió: se restauró la vista normal.");
    log("info", "fullscreenchange disparado · document.fullscreenElement → null.");
  };

  const informacion = activo ? ELEMENTOS[activo] : null;

  const codigo =
    metodoId === "fullscreen-exit"
      ? `if (document.fullscreenElement) {
  await document.exitFullscreen();
} else {
  // Sin fullscreen activo → TypeError
}

document.addEventListener("fullscreenchange", () => {
  console.log(document.fullscreenElement);
});`
      : `const caja = document.querySelector("#caja");

await caja.requestFullscreen({ navigationUI: "hide" });

document.addEventListener("fullscreenchange", () => {
  console.log(document.fullscreenElement);
});`;

  return (
    <MarcoSimulador
      icon="🖥️"
      titulo="Fullscreen API"
      descripcion="Simula entrar y salir de pantalla completa, comprueba el estado de document.fullscreenElement y observa cómo se dispara fullscreenchange."
      codigo={codigo}
      consola={
        <>
          {logs.map((l, i) => (
            <div
              key={i}
              className={
                l.tipo === "success"
                  ? "log-success"
                  : l.tipo === "error"
                    ? "log-error"
                    : l.tipo === "warn"
                      ? "log-iteration"
                      : l.tipo === "info"
                        ? "log-iteration"
                        : "log-system"
              }
            >
              {l.texto}
            </div>
          ))}
        </>
      }
    >
      <div className="sjs-toolbar">
        <label className="sjs-field">
          <span>Elemento a expandir</span>
          <select
            className="sjs-select"
            value={seleccion}
            onChange={(e) => setSeleccion(e.target.value)}
            disabled={Boolean(activo)}
          >
            {Object.entries(ELEMENTOS).map(([id, e]) => (
              <option key={id} value={id}>
                {e.label}
              </option>
            ))}
          </select>
        </label>

        <label className="sjs-check">
          <input
            type="checkbox"
            checked={habilitado}
            onChange={(e) => setHabilitado(e.target.checked)}
          />
          document.fullscreenEnabled
        </label>
      </div>

      <div className="sjs-actions">
        <button
          type="button"
          className="sjs-btn sjs-btn--primary"
          onClick={entrar}
        >
          ⛶ requestFullscreen()
        </button>
        <button
          type="button"
          className="sjs-btn sjs-btn--danger"
          onClick={salir}
        >
          🚪 document.exitFullscreen()
        </button>
        <button
          type="button"
          className="sjs-btn"
          onClick={salir}
          disabled={!activo}
        >
          ⎋ Simular Esc
        </button>
      </div>

      <div className="sjs-grid-2">
        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🖥️ Vista del navegador</span>
            <span
              className={`sjs-tag ${activo ? "sjs-tag--ok" : ""}`}
            >
              {activo ? "fullscreen" : "normal"}
            </span>
          </div>

          <div
            style={{
              border: "1px solid #2e2e2e",
              borderRadius: 8,
              overflow: "hidden",
              background: "#0a0a0b",
            }}
          >
            {!activo && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 10px",
                  borderBottom: "1px solid #2e2e2e",
                  color: "#8f8f98",
                  fontSize: 12,
                }}
              >
                <span>● ● ●</span>
                <span
                  style={{
                    flex: 1,
                    background: "#202020",
                    borderRadius: 4,
                    padding: "3px 8px",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  https://ejemplo.com
                </span>
              </div>
            )}

            <div
              style={{
                minHeight: activo ? 260 : 150,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 10,
                background: activo ? informacion.fondo : "#101012",
                transition: "min-height 0.2s",
              }}
            >
              <span style={{ fontSize: activo ? 64 : 36 }}>
                {activo ? informacion.icon : "🌐"}
              </span>
              <span style={{ color: "#cfcfd6", fontSize: 13 }}>
                {activo
                  ? informacion.label + " en pantalla completa"
                  : "Contenido normal de la página"}
              </span>
              {activo && (
                <button type="button" className="sjs-btn" onClick={salir}>
                  Salir (Esc)
                </button>
              )}
            </div>
          </div>

          <div className="sjs-tags">
            <span className="sjs-tag">
              fullscreenElement: {activo ? "#" + activo : "null"}
            </span>
            <span
              className={`sjs-tag ${habilitado ? "sjs-tag--ok" : "sjs-tag--bad"}`}
            >
              fullscreenEnabled: {String(habilitado)}
            </span>
          </div>
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">📋 Estado</div>
          <dl className="sjs-kv">
            <dt>Modo</dt>
            <dd>{activo ? "pantalla completa" : "normal"}</dd>
            <dt>Elemento</dt>
            <dd>{activo ? ELEMENTOS[activo].label : "—"}</dd>
            <dt>fullscreenElement</dt>
            <dd>{activo ? "#" + activo : "null"}</dd>
            <dt>fullscreenEnabled</dt>
            <dd>{String(habilitado)}</dd>
            <dt>Último evento</dt>
            <dd>fullscreenchange</dd>
          </dl>

          <div className="sjs-output sjs-output--warn" style={{ marginTop: 10 }}>
            {activo
              ? "Solo un elemento puede estar en fullscreen. Pulsa Esc o exitFullscreen() para salir."
              : "No hay fullscreen activo. exitFullscreen() rechazaría con TypeError."}
          </div>
        </div>
      </div>

      <div className="sjs-note">
        💡 <code>requestFullscreen()</code> se llama sobre el elemento y requiere
        un gesto del usuario. <code>exitFullscreen()</code> se llama sobre{" "}
        <code>document</code> y no lo requiere. Ambos devuelven una promesa y
        disparan <code>fullscreenchange</code>.
      </div>
    </MarcoSimulador>
  );
}
