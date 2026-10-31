import { useState } from "react";
import MarcoSimulador from "./MarcoSimulador";

const ESTADOS = {
  default: "default",
  granted: "granted",
  denied: "denied",
};

export default function SimuladorNotificaciones({ metodoId }) {
  const [vista, setVista] = useState(
    metodoId === "push-subscribe"
      ? "push"
      : metodoId === "notification-constructor"
        ? "crear"
        : "permiso",
  );
  const [permiso, setPermiso] = useState(ESTADOS.default);
  const [dialogo, setDialogo] = useState(false);
  const [notificaciones, setNotificaciones] = useState([]);
  const [titulo, setTitulo] = useState("Nuevo mensaje");
  const [cuerpo, setCuerpo] = useState("Ana te ha enviado un mensaje");
  const [tag, setTag] = useState("chat");
  const [swActivo, setSwActivo] = useState(false);
  const [suscripcion, setSuscripcion] = useState(null);
  const [logs, setLogs] = useState([
    { tipo: "system", texto: "Permiso inicial: \"default\". Aún no se ha decidido." },
  ]);

  const log = (tipo, texto) =>
    setLogs((prev) => [...prev.slice(-9), { tipo, texto }]);

  const pedirPermiso = () => {
    if (permiso === "granted") {
      log("success", "Notification.requestPermission(): ya estaba concedido, resuelve \"granted\".");
      return;
    }
    if (permiso === "denied") {
      log("error", "Notification.requestPermission(): el usuario ya lo bloqueó. No se vuelve a preguntar.");
      return;
    }
    setDialogo(true);
    log("info", "El navegador muestra el diálogo de permisos...");
  };

  const responder = (valor) => {
    setDialogo(false);
    setPermiso(valor);
    log(
      valor === "granted" ? "success" : valor === "denied" ? "error" : "warn",
      "requestPermission() resolvió con \"" + valor + "\".",
    );
  };

  const crear = () => {
    if (permiso !== "granted") {
      log("error", "new Notification(): sin permiso \"granted\" no se puede mostrar.");
      return;
    }
    if (!titulo.trim()) {
      log("error", "new Notification(): el título es obligatorio.");
      return;
    }

    const nueva = { id: Date.now(), titulo, cuerpo, tag };
    setNotificaciones((prev) => [nueva, ...prev].slice(0, 4));
    log("success", "new Notification(\"" + titulo + "\") mostrada en el sistema.");
    if (tag) log("info", "tag \"" + tag + "\": reemplaza avisos anteriores con el mismo tag.");
  };

  const cerrar = (id) => {
    setNotificaciones((prev) => prev.filter((n) => n.id !== id));
    log("info", "notification.close(): notificación cerrada.");
  };

  const suscribir = () => {
    if (!swActivo) {
      log("error", "PushManager.subscribe(): no hay Service Worker activo.");
      return;
    }
    if (permiso !== "granted") {
      log("error", "PushManager.subscribe(): falta el permiso \"granted\".");
      return;
    }

    const id = Math.random().toString(36).slice(2, 10);
    setSuscripcion({
      endpoint: "https://fcm.googleapis.com/fcm/send/" + id,
      expirationTime: null,
      keys: {
        p256dh: "B" + id.toUpperCase() + "…p256dh",
        auth: "auth-" + id,
      },
    });
    log("success", "PushSubscription creada. endpoint y claves listos para el servidor.");
  };

  const desuscribir = () => {
    setSuscripcion(null);
    log("info", "subscription.unsubscribe(): suscripción cancelada.");
  };

  const codigo =
    vista === "permiso"
      ? `if (Notification.permission === "default") {
  const permiso = await Notification.requestPermission();
  console.log(permiso); // "granted" | "denied" | "default"
}`
      : vista === "crear"
        ? `if (Notification.permission === "granted") {
  new Notification("${titulo}", {
    body: "${cuerpo}",
    tag: "${tag}"
  });
}`
        : `const registration = await navigator.serviceWorker.register("/sw.js");
await navigator.serviceWorker.ready;

const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true,
  applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
});`;

  const badgePermiso =
    permiso === "granted"
      ? "sjs-tag--ok"
      : permiso === "denied"
        ? "sjs-tag--bad"
        : "sjs-tag--warn";

  return (
    <MarcoSimulador
      icon="🔔"
      titulo="Web Notifications API"
      descripcion="Simula el permiso, el diálogo del navegador, la creación de avisos nativos y la suscripción push con Service Worker y clave VAPID."
      codigo={codigo}
      consola={
        <>
          <div className="log-iteration">
            Notification.permission → <strong>{permiso}</strong>
          </div>
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
      <div className="sjs-actions">
        <button
          type="button"
          className={`sjs-btn ${vista === "permiso" ? "sjs-btn--primary" : ""}`}
          onClick={() => setVista("permiso")}
        >
          🛡️ Permisos
        </button>
        <button
          type="button"
          className={`sjs-btn ${vista === "crear" ? "sjs-btn--primary" : ""}`}
          onClick={() => setVista("crear")}
        >
          🔔 new Notification()
        </button>
        <button
          type="button"
          className={`sjs-btn ${vista === "push" ? "sjs-btn--primary" : ""}`}
          onClick={() => setVista("push")}
        >
          📡 Push
        </button>
      </div>

      {vista === "permiso" && (
        <>
          <div className="sjs-grid-2">
            <div className="sjs-card">
              <div className="sjs-card__label">
                <span>🛡️ Notification.permission</span>
                <span className={`sjs-tag ${badgePermiso}`}>{permiso}</span>
              </div>
              <div className="sjs-output">
                {permiso === "granted"
                  ? "El usuario permitió las notificaciones."
                  : permiso === "denied"
                    ? "El usuario bloqueó las notificaciones."
                    : "El usuario aún no ha tomado una decisión."}
              </div>
              <div className="sjs-tags">
                <span className="sjs-tag">solo lectura</span>
                <span className="sjs-tag">string, no booleano</span>
              </div>
            </div>

            <div className="sjs-card">
              <div className="sjs-card__label">🙋 requestPermission()</div>
              <div className="sjs-output">
                {dialogo
                  ? "El navegador está preguntando al usuario…"
                  : "Pulsa el botón para simular la solicitud."}
              </div>
              <div className="sjs-actions" style={{ marginTop: 10 }}>
                <button
                  type="button"
                  className="sjs-btn sjs-btn--primary"
                  onClick={pedirPermiso}
                  disabled={dialogo}
                >
                  🙋 requestPermission()
                </button>
                <button
                  type="button"
                  className="sjs-btn"
                  onClick={() => {
                    setPermiso("default");
                    setDialogo(false);
                    log("warn", "Estado restaurado a \"default\".");
                  }}
                >
                  🔄 Reset
                </button>
              </div>
            </div>
          </div>

          {dialogo && (
            <div className="sjs-card" style={{ marginTop: 14 }}>
              <div className="sjs-card__label">
                <span>🪟 Diálogo del navegador</span>
                <span className="sjs-tag sjs-tag--info">simulado</span>
              </div>
              <p style={{ marginTop: 0 }}>
                «example.com quiere mostrar notificaciones»
              </p>
              <div className="sjs-actions" style={{ marginBottom: 0 }}>
                <button
                  type="button"
                  className="sjs-btn sjs-btn--primary"
                  onClick={() => responder("granted")}
                >
                  Permitir
                </button>
                <button
                  type="button"
                  className="sjs-btn sjs-btn--danger"
                  onClick={() => responder("denied")}
                >
                  Bloquear
                </button>
                <button
                  type="button"
                  className="sjs-btn"
                  onClick={() => responder("default")}
                >
                  Cerrar sin decidir
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {vista === "crear" && (
        <>
          <div className="sjs-toolbar">
            <label className="sjs-field sjs-field--grow">
              <span>Título</span>
              <input
                className="sjs-input"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
              />
            </label>
            <label className="sjs-field sjs-field--grow">
              <span>Body</span>
              <input
                className="sjs-input"
                type="text"
                value={cuerpo}
                onChange={(e) => setCuerpo(e.target.value)}
              />
            </label>
            <label className="sjs-field">
              <span>Tag</span>
              <input
                className="sjs-input sjs-input--short"
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            </label>
          </div>

          <div className="sjs-actions">
            <button
              type="button"
              className="sjs-btn sjs-btn--primary"
              onClick={crear}
            >
              🔔 new Notification()
            </button>
            <button
              type="button"
              className="sjs-btn"
              onClick={() => {
                setNotificaciones([]);
                log("info", "Notificaciones cerradas.");
              }}
            >
              🧹 Cerrar todas
            </button>
          </div>

          <div className="sjs-card">
            <div className="sjs-card__label">
              <span>🖥️ Notificaciones del sistema</span>
              <span className="sjs-tag">{notificaciones.length}</span>
            </div>
            {notificaciones.length === 0 ? (
              <div className="sjs-output sjs-output--muted">
                Sin notificaciones. Necesitas permiso «granted».
              </div>
            ) : (
              <div style={{ display: "grid", gap: 10 }}>
                {notificaciones.map((n) => (
                  <div
                    key={n.id}
                    className="sjs-output sjs-output--ok"
                    style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                  >
                    <span style={{ fontSize: 22 }}>🔔</span>
                    <div style={{ flex: 1 }}>
                      <strong>{n.titulo}</strong>
                      <div style={{ color: "#9b9ba4" }}>{n.cuerpo}</div>
                      {n.tag && (
                        <span className="sjs-tag" style={{ marginTop: 6 }}>
                          tag: {n.tag}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="sjs-btn"
                      onClick={() => cerrar(n.id)}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {vista === "push" && (
        <>
          <div className="sjs-card" style={{ marginBottom: 14 }}>
            <div className="sjs-card__label">
              <span>✅ Requisitos de PushManager.subscribe()</span>
            </div>
            <div className="sjs-tags" style={{ marginTop: 0 }}>
              <span
                className={`sjs-tag ${swActivo ? "sjs-tag--ok" : "sjs-tag--bad"}`}
              >
                {swActivo ? "✅" : "❌"} Service Worker activo
              </span>
              <span
                className={`sjs-tag ${permiso === "granted" ? "sjs-tag--ok" : "sjs-tag--bad"}`}
              >
                {permiso === "granted" ? "✅" : "❌"} permiso granted
              </span>
              <span className="sjs-tag sjs-tag--ok">✅ HTTPS</span>
              <span className="sjs-tag sjs-tag--ok">✅ clave VAPID pública</span>
            </div>
          </div>

          <div className="sjs-actions">
            <label className="sjs-check">
              <input
                type="checkbox"
                checked={swActivo}
                onChange={(e) => {
                  setSwActivo(e.target.checked);
                  log(
                    e.target.checked ? "success" : "warn",
                    e.target.checked
                      ? "Service Worker registrado y activo."
                      : "Service Worker detenido.",
                  );
                }}
              />
              Service Worker activo
            </label>
            <button
              type="button"
              className="sjs-btn sjs-btn--primary"
              onClick={suscribir}
            >
              📡 subscribe()
            </button>
            <button
              type="button"
              className="sjs-btn sjs-btn--danger"
              onClick={desuscribir}
              disabled={!suscripcion}
            >
              🚫 unsubscribe()
            </button>
          </div>

          <div className="sjs-card">
            <div className="sjs-card__label">
              <span>🔑 PushSubscription</span>
              {suscripcion && (
                <span className="sjs-tag sjs-tag--ok">activa</span>
              )}
            </div>
            <div
              className={`sjs-output ${suscripcion ? "sjs-output--ok" : "sjs-output--muted"}`}
            >
              {suscripcion
                ? JSON.stringify(suscripcion, null, 2)
                : "Sin suscripción. Activa el Service Worker y concede el permiso."}
            </div>
            {suscripcion && (
              <div className="sjs-tags">
                <span className="sjs-tag sjs-tag--info">endpoint único</span>
                <span className="sjs-tag">p256dh</span>
                <span className="sjs-tag">auth</span>
              </div>
            )}
          </div>
        </>
      )}

      <div className="sjs-note">
        💡 Los permisos son por origen. Si el usuario pulsa «Bloquear», el
        navegador no volverá a mostrar el diálogo: tendrá que cambiarlo desde la
        configuración del sitio. Para push hacen falta Service Worker, permiso y
        clave VAPID.
      </div>
    </MarcoSimulador>
  );
}
