import { useMemo, useState } from "react";
import MarcoSimulador from "./MarcoSimulador";

const APPS = ["💬 WhatsApp", "📧 Gmail", "✈️ Telegram", "🔗 Copiar enlace"];

export default function SimuladorNavegador({ metodoId }) {
  const [vista, setVista] = useState(
    metodoId === "clipboard-writetext"
      ? "clipboard"
      : metodoId === "navigator-cookieenabled"
        ? "cookie"
        : "share",
  );

  /* ---------- Compartir ---------- */
  const [tipoDato, setTipoDato] = useState("url");
  const [capacidad, setCapacidad] = useState("full");
  const [dialogo, setDialogo] = useState(false);
  const [compartido, setCompartido] = useState(null);
  const [comprobacion, setComprobacion] = useState(null);

  const datos = useMemo(() => {
    if (tipoDato === "texto") {
      return {
        title: "Cita inspiradora",
        text: "El éxito es la suma de pequeños esfuerzos repetidos.",
      };
    }
    if (tipoDato === "archivos") {
      return {
        title: "Mi dibujo",
        files: [{ name: "mi-dibujo.png", type: "image/png", size: 24576 }],
      };
    }
    return {
      title: "Mi sitio web",
      text: "¡Mira este sitio!",
      url: "https://ejemplo.com",
    };
  }, [tipoDato]);

  const apiDisponible = capacidad !== "unsupported";
  const puedeCompartir =
    apiDisponible && !(capacidad === "nofiles" && tipoDato === "archivos");

  /* ---------- Portapapeles ---------- */
  const [textoCopiar, setTextoCopiar] = useState("https://ejemplo.com");
  const [portapapeles, setPortapapeles] = useState("");
  const [copiado, setCopiado] = useState(false);
  const [errorCopia, setErrorCopia] = useState(null);

  const copiar = async () => {
    setErrorCopia(null);
    setCopiado(false);

    try {
      if (!navigator.clipboard) throw new Error("Clipboard API no disponible");
      await navigator.clipboard.writeText(textoCopiar);
      setPortapapeles(textoCopiar);
      setCopiado(true);
    } catch (error) {
      setPortapapeles(textoCopiar);
      setErrorCopia(
        "No se pudo usar el portapapeles real (" +
          error.message +
          "). Se simuló la escritura.",
      );
      setCopiado(true);
    }
  };

  /* ---------- Cookies ---------- */
  const [cookiesActivas, setCookiesActivas] = useState(true);
  const [cookies, setCookies] = useState([]);
  const [errorCookie, setErrorCookie] = useState(null);

  const escribirCookie = () => {
    if (!cookiesActivas) {
      setErrorCookie("document.cookie no guardó nada: las cookies están deshabilitadas.");
      return;
    }
    setCookies((prev) => [
      ...prev,
      { nombre: "usuario", valor: "ana", hora: new Date().toLocaleTimeString("es-ES") },
    ]);
    setErrorCookie(null);
  };

  const llamarComoFuncion = () => {
    setErrorCookie("TypeError: navigator.cookieEnabled is not a function");
  };

  const codigo =
    vista === "share"
      ? `const data = { title: "Mi sitio", url: "https://ejemplo.com" };

if (navigator.canShare(data)) {
  await navigator.share(data);
}`
      : vista === "clipboard"
        ? `await navigator.clipboard.writeText("${textoCopiar}");
// Requiere HTTPS y, normalmente, un gesto del usuario`
        : `console.log(navigator.cookieEnabled); // true o false

if (navigator.cookieEnabled) {
  document.cookie = "usuario=ana; path=/";
}`;

  return (
    <MarcoSimulador
      icon="🧭"
      titulo="APIs del navegador"
      descripcion="Prueba el selector nativo de compartir, valida con canShare(), copia al portapapeles y consulta el estado de las cookies."
      codigo={codigo}
      consola={
        vista === "share" ? (
          <>
            <div className="log-iteration">
              navigator.share disponible: {String(apiDisponible)}
            </div>
            {comprobacion !== null && (
              <div
                className={
                  comprobacion ? "log-success" : "log-error"
                }
              >
                {comprobacion ? "✅" : "❌"} navigator.canShare(data) →{" "}
                {String(comprobacion)}
              </div>
            )}
            {compartido === "ok" ? (
              <div className="log-success">✅ El usuario completó el diálogo de compartir.</div>
            ) : compartido === "abort" ? (
              <div className="log-error">🛑 AbortError: el usuario canceló el diálogo.</div>
            ) : compartido === "unsupported" ? (
              <div className="log-error">❌ canShare() devolvió false. No se abrió el diálogo.</div>
            ) : (
              <span className="log-system">
                Prueba canShare() o share() para ver el resultado.
              </span>
            )}
          </>
        ) : vista === "clipboard" ? (
          errorCopia ? (
            <>
              <div className="log-error">❌ {errorCopia}</div>
              <div className="log-result">{portapapeles}</div>
            </>
          ) : copiado ? (
            <>
              <div className="log-success">✅ Texto copiado al portapapeles.</div>
              <div className="log-result">{portapapeles}</div>
            </>
          ) : (
            <span className="log-system">
              Pulsa «writeText()» para copiar el texto.
            </span>
          )
        ) : (
          <>
            <div className="log-iteration">
              navigator.cookieEnabled → <strong>{String(cookiesActivas)}</strong>
            </div>
            {errorCookie ? (
              <div className="log-error">❌ {errorCookie}</div>
            ) : cookies.length === 0 ? (
              <span className="log-system">Todavía no hay cookies escritas.</span>
            ) : (
              <div className="log-success">
                document.cookie → {cookies.map((c) => c.nombre + "=" + c.valor).join("; ")}
              </div>
            )}
          </>
        )
      }
    >
      <div className="sjs-actions">
        <button
          type="button"
          className={`sjs-btn ${vista === "share" ? "sjs-btn--primary" : ""}`}
          onClick={() => setVista("share")}
        >
          📤 share()
        </button>
        <button
          type="button"
          className={`sjs-btn ${vista === "clipboard" ? "sjs-btn--primary" : ""}`}
          onClick={() => setVista("clipboard")}
        >
          📋 clipboard
        </button>
        <button
          type="button"
          className={`sjs-btn ${vista === "cookie" ? "sjs-btn--primary" : ""}`}
          onClick={() => setVista("cookie")}
        >
          🍪 cookies
        </button>
      </div>

      {vista === "share" && (
        <>
          <div className="sjs-toolbar">
            <label className="sjs-field">
              <span>Contenido</span>
              <select
                className="sjs-select"
                value={tipoDato}
                onChange={(e) => {
                  setTipoDato(e.target.value);
                  setCompartido(null);
                  setComprobacion(null);
                }}
              >
                <option value="url">Texto + URL</option>
                <option value="texto">Solo texto</option>
                <option value="archivos">Archivos</option>
              </select>
            </label>
            <label className="sjs-field">
              <span>Capacidad del dispositivo</span>
              <select
                className="sjs-select"
                value={capacidad}
                onChange={(e) => {
                  setCapacidad(e.target.value);
                  setCompartido(null);
                  setComprobacion(null);
                }}
              >
                <option value="full">Todo soportado</option>
                <option value="nofiles">Sin soporte de archivos</option>
                <option value="unsupported">API no disponible</option>
              </select>
            </label>
          </div>

          <div className="sjs-actions">
            <button
              type="button"
              className="sjs-btn"
              onClick={() => {
                setCompartido(null);
                setComprobacion(puedeCompartir);
              }}
            >
              🔎 canShare(data)
            </button>
            <button
              type="button"
              className="sjs-btn sjs-btn--primary"
              onClick={() => {
                if (!puedeCompartir) {
                  setCompartido("unsupported");
                  return;
                }
                setDialogo(true);
              }}
            >
              📤 share(data)
            </button>
            <button
              type="button"
              className="sjs-btn"
              onClick={() => {
                setCompartido(null);
                setComprobacion(null);
                setDialogo(false);
              }}
            >
              🔄 Reset
            </button>
          </div>

          <div className="sjs-card" style={{ marginBottom: 14 }}>
            <div className="sjs-card__label">
              <span>📦 data</span>
              <span
                className={`sjs-tag ${puedeCompartir ? "sjs-tag--ok" : "sjs-tag--bad"}`}
              >
                canShare: {String(puedeCompartir)}
              </span>
            </div>
            <div className="sjs-output">
              {JSON.stringify(datos, null, 2)}
            </div>
          </div>

          {dialogo && (
            <div className="sjs-card">
              <div className="sjs-card__label">
                <span>📲 Selector nativo de compartir</span>
                <span className="sjs-tag sjs-tag--info">simulado</span>
              </div>
              <div className="sjs-actions">
                {APPS.map((app) => (
                  <button
                    key={app}
                    type="button"
                    className="sjs-btn"
                    onClick={() => {
                      setDialogo(false);
                      setCompartido("ok");
                    }}
                  >
                    {app}
                  </button>
                ))}
                <button
                  type="button"
                  className="sjs-btn sjs-btn--danger"
                  onClick={() => {
                    setDialogo(false);
                    setCompartido("abort");
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {vista === "clipboard" && (
        <>
          <label className="sjs-field" style={{ marginBottom: 12 }}>
            <span>Texto a copiar</span>
            <textarea
              className="sjs-textarea"
              value={textoCopiar}
              onChange={(e) => {
                setTextoCopiar(e.target.value);
                setCopiado(false);
                setErrorCopia(null);
              }}
            />
          </label>

          <div className="sjs-actions">
            <button
              type="button"
              className="sjs-btn sjs-btn--primary"
              onClick={copiar}
            >
              📋 writeText()
            </button>
            <button
              type="button"
              className="sjs-btn"
              onClick={() => {
                setTextoCopiar("https://ejemplo.com");
                setPortapapeles("");
                setCopiado(false);
                setErrorCopia(null);
              }}
            >
              🔄 Reset
            </button>
          </div>

          <div className="sjs-grid-2">
            <div className="sjs-card">
              <div className="sjs-card__label">
                <span>📋 Portapapeles simulado</span>
                {copiado && <span className="sjs-tag sjs-tag--ok">copiado</span>}
              </div>
              <div
                className={`sjs-output ${copiado ? "sjs-output--ok" : "sjs-output--muted"}`}
              >
                {portapapeles || "Vacío. Pulsa «writeText()»."}
              </div>
              <div className="sjs-tags">
                <span className="sjs-tag">Promise&lt;void&gt;</span>
                <span className="sjs-tag sjs-tag--info">requiere gesto</span>
              </div>
            </div>

            <div className="sjs-card">
              <div className="sjs-card__label">🔐 Requisitos</div>
              <dl className="sjs-kv">
                <dt>Contexto seguro</dt>
                <dd>{window.isSecureContext ? "✅ sí" : "❌ no"}</dd>
                <dt>API disponible</dt>
                <dd>{navigator.clipboard ? "✅ sí" : "❌ no"}</dd>
                <dt>Gesto del usuario</dt>
                <dd>✅ clic en el botón</dd>
                <dt>Estado</dt>
                <dd>{copiado ? "texto escrito" : "esperando"}</dd>
              </dl>
            </div>
          </div>
        </>
      )}

      {vista === "cookie" && (
        <>
          <div className="sjs-actions">
            <label className="sjs-check">
              <input
                type="checkbox"
                checked={cookiesActivas}
                onChange={(e) => {
                  setCookiesActivas(e.target.checked);
                  setErrorCookie(null);
                }}
              />
              Cookies habilitadas
            </label>
            <button
              type="button"
              className="sjs-btn"
              onClick={llamarComoFuncion}
            >
              ❌ cookieEnabled()
            </button>
            <button
              type="button"
              className="sjs-btn sjs-btn--primary"
              onClick={escribirCookie}
            >
              🍪 document.cookie = ...
            </button>
            <button
              type="button"
              className="sjs-btn"
              onClick={() => {
                setCookies([]);
                setErrorCookie(null);
              }}
            >
              🧹 Vaciar
            </button>
          </div>

          <div className="sjs-grid-2">
            <div className="sjs-card">
              <div className="sjs-card__label">
                <span>🍪 navigator.cookieEnabled</span>
                <span
                  className={`sjs-tag ${cookiesActivas ? "sjs-tag--ok" : "sjs-tag--bad"}`}
                >
                  {String(cookiesActivas)}
                </span>
              </div>
              <div className={`sjs-output ${cookiesActivas ? "sjs-output--ok" : "sjs-output--warn"}`}>
                {cookiesActivas
                  ? "true · el navegador acepta cookies en general"
                  : "false · el navegador no acepta cookies"}
              </div>
              <div className="sjs-tags">
                <span className="sjs-tag">propiedad</span>
                <span className="sjs-tag">solo lectura</span>
                <span className="sjs-tag sjs-tag--info">boolean</span>
              </div>
            </div>

            <div className="sjs-card">
              <div className="sjs-card__label">
                <span>📦 Cookies escritas</span>
                <span className="sjs-tag">{cookies.length}</span>
              </div>
              {cookies.length === 0 ? (
                <div className="sjs-output sjs-output--muted">
                  Sin cookies en document.cookie
                </div>
              ) : (
                <div className="sjs-output">
                  {cookies
                    .map((c) => c.nombre + "=" + c.valor + " (path=/)")
                    .join("\n")}
                </div>
              )}
            </div>
          </div>

          <div className="sjs-note">
            ⚠️ <code>navigator.cookieEnabled</code> es una propiedad:{" "}
            <code>navigator.cookieEnabled()</code> lanza{" "}
            <code>TypeError</code>. Además, <code>true</code> no garantiza que
            una cookie concreta funcione: puede estar bloqueada por privacidad,
            extensiones o políticas del sitio.
          </div>
        </>
      )}
    </MarcoSimulador>
  );
}
