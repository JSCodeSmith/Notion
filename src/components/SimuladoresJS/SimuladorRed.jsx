import { useEffect, useMemo, useRef, useState } from "react";
import MarcoSimulador from "./MarcoSimulador";
import "./SimuladoresExtras.css";

export default function SimuladorRed({ metodoId }) {
  const [vista, setVista] = useState(() => {
    if (metodoId === "red-urlsearchparams") return "params";
    if (metodoId === "red-abort") return "abort";
    if (metodoId === "red-online") return "online";
    return "online";
  });

  /* ------------------ navigator.onLine ------------------ */
  const [realOnline, setRealOnline] = useState(
    () => (typeof navigator === "undefined" ? true : navigator.onLine),
  );
  const [online, setOnline] = useState(realOnline);
  const [logRed, setLogRed] = useState([]);

  const log = (tipo, msg) => setLogRed((prev) => [...prev.slice(-8), { tipo, msg }]);

  useEffect(() => {
    const alConectar = () => {
      setRealOnline(true);
      setOnline(true);
      log("success", "evento online · el navegador recuperó la conexión");
    };
    const alDesconectar = () => {
      setRealOnline(false);
      setOnline(false);
      log("error", "evento offline · el navegador perdió la conexión");
    };
    window.addEventListener("online", alConectar);
    window.addEventListener("offline", alDesconectar);
    return () => {
      window.removeEventListener("online", alConectar);
      window.removeEventListener("offline", alDesconectar);
    };
  }, []);

  /* ------------------ URLSearchParams ------------------ */
  const [query, setQuery] = useState("buscar=react&pagina=2&tags=js&tags=web");
  const [clave, setClave] = useState("buscar");
  const [valor, setValor] = useState("hooks");
  const [paramsLog, setParamsLog] = useState([]);
  const params = useMemo(() => new URLSearchParams(query), [query]);
  const entradas = [...params.entries()];

  const registrarParams = (tipo, msg) =>
    setParamsLog((prev) => [...prev.slice(-7), { tipo, msg }]);

  const operar = (operacion) => {
    const copia = new URLSearchParams(query);
    const nombre = clave.trim();
    const contenido = valor;
    if ((operacion === "set" || operacion === "append") && !nombre) {
      registrarParams("error", "❌ La clave no puede estar vacía.");
      return;
    }
    if (operacion === "get") {
      registrarParams("iteration", `get("${nombre}") → ${JSON.stringify(copia.get(nombre))}`);
    } else if (operacion === "getAll") {
      registrarParams(
        "iteration",
        `getAll("${nombre}") → ${JSON.stringify(copia.getAll(nombre))}`,
      );
    } else if (operacion === "has") {
      registrarParams("iteration", `has("${nombre}") → ${String(copia.has(nombre))}`);
    } else if (operacion === "set") {
      copia.set(nombre, contenido);
      setQuery(copia.toString());
      registrarParams("success", `set("${nombre}", "${contenido}") → ${copia.toString()}`);
    } else if (operacion === "append") {
      copia.append(nombre, contenido);
      setQuery(copia.toString());
      registrarParams("success", `append("${nombre}", "${contenido}") → ${copia.toString()}`);
    } else if (operacion === "delete") {
      copia.delete(nombre);
      setQuery(copia.toString());
      registrarParams("success", `delete("${nombre}") → ${copia.toString()}`);
    } else if (operacion === "sort") {
      copia.sort();
      setQuery(copia.toString());
      registrarParams("success", `sort() → ${copia.toString()}`);
    }
  };

  const urlFinal = `https://ejemplo.com/buscar?${params.toString()}`;

  /* ------------------ AbortController ------------------ */
  const [abortLog, setAbortLog] = useState([]);
  const [estado, setEstado] = useState("idle");
  const [motivo, setMotivo] = useState("El usuario canceló la búsqueda");
  const [timeoutMs, setTimeoutMs] = useState("2000");
  const [signalInfo, setSignalInfo] = useState({ aborted: false, reason: null });
  const controllerRef = useRef(null);
  const timerRef = useRef(null);

  const refrescarSignal = (controller) =>
    setSignalInfo({
      aborted: Boolean(controller?.signal.aborted),
      reason: controller?.signal.reason ?? null,
    });

  const logAbort = (tipo, msg) =>
    setAbortLog((prev) => [...prev.slice(-9), { tipo, msg }]);

  const limpiarTimer = () => {
    clearTimeout(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => () => limpiarTimer(), []);

  const iniciarPeticion = () => {
    limpiarTimer();
    const controller = new AbortController();
    controllerRef.current = controller;
    refrescarSignal(controller);
    setEstado("pending");
    logAbort("system", 'fetch("/api/buscar?q=js", { signal }) → pendiente…');

    controller.signal.addEventListener("abort", () => {
      refrescarSignal(controller);
      logAbort(
        "error",
        `signal "abort" · reason = ${JSON.stringify(controller.signal.reason)}`,
      );
    });

    timerRef.current = setTimeout(() => {
      if (controller.signal.aborted) return;
      setEstado("success");
      logAbort("success", "✅ 200 OK · respuesta recibida antes de cancelar");
    }, 3000);
  };

  const abortar = (conTimeout = false) => {
    const controller = controllerRef.current;
    if (!controller) {
      logAbort("error", "❌ No hay ninguna petición en curso.");
      return;
    }
    if (controller.signal.aborted) {
      logAbort("warn", "⚠️ abort() es idempotente: la señal ya estaba abortada.");
      return;
    }
    limpiarTimer();
    if (conTimeout) {
      const ms = Math.max(Number(timeoutMs) || 0, 0);
      timerRef.current = setTimeout(() => {
        controller.abort(new DOMException(`Timeout de ${ms} ms`, "TimeoutError"));
        refrescarSignal(controller);
        setEstado("aborted");
        logAbort("error", `⏱️ AbortSignal.timeout(${ms}) · TimeoutError`);
      }, ms);
      logAbort("system", `Temporizador de ${ms} ms programado…`);
      return;
    }
    controller.abort(new DOMException(motivo || "Cancelado", "AbortError"));
    refrescarSignal(controller);
    setEstado("aborted");
    logAbort("error", "🛑 catch (error) → AbortError · la petición se canceló");
  };

  const reiniciar = () => {
    limpiarTimer();
    controllerRef.current = null;
    setSignalInfo({ aborted: false, reason: null });
    setEstado("idle");
    setAbortLog([]);
  };

  const signal = signalInfo;

  const codigo =
    vista === "online"
      ? `if (navigator.onLine) {
  console.log("Hay conexión (según el sistema)");
}

window.addEventListener("online", () => console.log("🟢 online"));
window.addEventListener("offline", () => console.log("🔴 offline"));`
      : vista === "params"
        ? `const params = new URLSearchParams("${query}");

params.get("${clave}");       // valor o null
params.has("${clave}");       // boolean
params.set("${clave}", "${valor}");
params.append("tag", "nuevo");
params.delete("pagina");

params.toString();`
        : `const controller = new AbortController();

fetch("/api/datos", { signal: controller.signal })
  .then((res) => res.json())
  .catch((error) => {
    if (error.name === "AbortError") {
      console.log("Petición cancelada");
    }
  });

controller.abort("El usuario canceló la búsqueda");`;

  return (
    <MarcoSimulador
      icon="📡"
      titulo="Red, URLs y cancelación"
      descripcion="Comprueba el estado de la conexión, manipula una query string y cancela peticiones con AbortController."
      codigo={codigo}
      nota={
        <>
          💡 <code>navigator.onLine</code> solo indica si el sistema tiene una interfaz de red
          activa: puede ser <code>true</code> sin internet real. Para saberlo de verdad, haz una
          petición y mide la respuesta.
        </>
      }
      consola={
        vista === "online" ? (
          <>
            <div className="log-system">📶 navigator.onLine</div>
            <div className={online ? "log-success" : "log-error"}>
              estado simulado → {String(online)} {online ? "🟢" : "🔴"}
            </div>
            <div className="log-iteration">
              valor real del navegador → {String(realOnline)}
            </div>
            {logRed.map((linea, i) => (
              <div key={i} className={`log-${linea.tipo}`}>
                {linea.msg}
              </div>
            ))}
          </>
        ) : vista === "params" ? (
          <>
            <div className="log-system">🔗 URLSearchParams</div>
            <div className="log-result">toString() → {params.toString() || '""'}</div>
            <div className="log-iteration">entradas → {entradas.length}</div>
            {paramsLog.map((linea, i) => (
              <div key={i} className={`log-${linea.tipo}`}>
                {linea.msg}
              </div>
            ))}
          </>
        ) : (
          <>
            <div className="log-system">🛑 AbortController</div>
            <div className={estado === "aborted" ? "log-error" : "log-iteration"}>
              estado → {estado} · signal.aborted → {String(signal.aborted)}
            </div>
            {abortLog.map((linea, i) => (
              <div key={i} className={`log-${linea.tipo}`}>
                {linea.msg}
              </div>
            ))}
          </>
        )
      }
    >
      <div className="sjs-actions">
        {[
          ["online", "📶 navigator.onLine"],
          ["params", "🔗 URLSearchParams"],
          ["abort", "🛑 AbortController"],
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

      {vista === "online" && (
        <div className="sjs-grid-2">
          <div className="sjs-card">
            <div className="sjs-card__label">
              <span>📶 Estado de la conexión</span>
              <span className={`sjs-pill ${online ? "sjs-pill--ok" : "sjs-pill--bad"}`}>
                {online ? "online" : "offline"}
              </span>
            </div>

            <div className={`ex-banner ${online ? "is-online" : "is-offline"}`}>
              {online ? "🟢 Conexión disponible" : "🔴 Sin conexión · modo offline"}
            </div>

            <div className="sjs-actions" style={{ marginTop: 12 }}>
              <button
                type="button"
                className="sjs-btn sjs-btn--danger"
                onClick={() => {
                  setOnline(false);
                  log("warn", "offline simulado · se dispararía el evento offline");
                }}
                disabled={!online}
              >
                🔴 Simular offline
              </button>
              <button
                type="button"
                className="sjs-btn sjs-btn--primary"
                onClick={() => {
                  setOnline(true);
                  log("success", "online simulado · se dispararía el evento online");
                }}
                disabled={online}
              >
                🟢 Simular online
              </button>
              <button
                type="button"
                className="sjs-btn"
                onClick={() => {
                  setOnline(realOnline);
                  log("system", `estado restaurado al real → ${realOnline}`);
                }}
              >
                🔄 Usar el real
              </button>
            </div>
          </div>

          <div className="sjs-card">
            <div className="sjs-card__label">
              <span>⚡ Eventos</span>
            </div>
            <div className="sjs-output">
              {`window.addEventListener("online", () => { ... });
window.addEventListener("offline", () => { ... });`}
            </div>
            <div className="sjs-tags">
              <span className={`sjs-tag ${realOnline ? "sjs-tag--ok" : "sjs-tag--bad"}`}>
                real: {String(realOnline)}
              </span>
              <span className="sjs-tag">evento online</span>
              <span className="sjs-tag">evento offline</span>
            </div>
            <div className="sjs-note" style={{ marginTop: 10 }}>
              Un <code>true</code> no garantiza internet: el equipo puede estar conectado a una
              red sin salida. Combínalo con un <code>fetch()</code> de prueba o{" "}
              <code>navigator.connection</code>.
            </div>
          </div>
        </div>
      )}

      {vista === "params" && (
        <div className="sjs-grid-2">
          <div className="sjs-card">
            <div className="sjs-card__label">
              <span>🔗 new URLSearchParams()</span>
              <span className="sjs-tag">{entradas.length} pares</span>
            </div>
            <label className="sjs-field" style={{ marginBottom: 8 }}>
              <span>query string (sin ?)</span>
              <input
                className="sjs-input"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                spellCheck={false}
              />
            </label>
            <div className="sjs-grid-2" style={{ gap: 8 }}>
              <label className="sjs-field">
                <span>clave</span>
                <input
                  className="sjs-input"
                  value={clave}
                  onChange={(e) => setClave(e.target.value)}
                  spellCheck={false}
                />
              </label>
              <label className="sjs-field">
                <span>valor</span>
                <input
                  className="sjs-input"
                  value={valor}
                  onChange={(e) => setValor(e.target.value)}
                  spellCheck={false}
                />
              </label>
            </div>
            <div className="sjs-actions" style={{ marginTop: 12 }}>
              {["get", "getAll", "has", "set", "append", "delete", "sort"].map((op) => (
                <button
                  key={op}
                  type="button"
                  className={`sjs-btn ${op === "set" ? "sjs-btn--primary" : ""}`}
                  onClick={() => operar(op)}
                >
                  {op}()
                </button>
              ))}
            </div>
          </div>

          <div className="sjs-card">
            <div className="sjs-card__label">
              <span>📋 Pares clave-valor</span>
              <span className="sjs-tag sjs-tag--info">iterable</span>
            </div>
            {entradas.length === 0 ? (
              <div className="sjs-output sjs-output--muted">La query está vacía.</div>
            ) : (
              <table className="sjs-table">
                <thead>
                  <tr>
                    <th>clave</th>
                    <th>valor</th>
                  </tr>
                </thead>
                <tbody>
                  {entradas.map(([nombre, contenido], indice) => (
                    <tr key={`${nombre}-${indice}`}>
                      <td>{nombre}</td>
                      <td>{contenido}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            <div className="sjs-output" style={{ marginTop: 10 }}>
              {urlFinal}
            </div>
            <div className="sjs-tags">
              <span className="sjs-tag">get → string | null</span>
              <span className="sjs-tag">getAll → array</span>
              <span className="sjs-tag">toString()</span>
            </div>
          </div>
        </div>
      )}

      {vista === "abort" && (
        <div className="sjs-grid-2">
          <div className="sjs-card">
            <div className="sjs-card__label">
              <span>🛑 Petición simulada</span>
              <span
                className={`sjs-pill ${
                  estado === "pending"
                    ? "sjs-pill--pending"
                    : estado === "success"
                      ? "sjs-pill--ok"
                      : estado === "aborted"
                        ? "sjs-pill--bad"
                        : ""
                }`}
              >
                {estado}
              </span>
            </div>

            <div className="ex-request">
              <div className={`ex-request__bar ${estado === "pending" ? "is-loading" : ""}`} />
              <div className="ex-request__text">
                {estado === "idle" && "Sin peticiones. Inicia una para probar abort()."}
                {estado === "pending" && "GET /api/buscar?q=js · esperando respuesta…"}
                {estado === "success" && "✅ 200 OK · respuesta recibida"}
                {estado === "aborted" && "🛑 Petición cancelada con abort()"}
              </div>
            </div>

            <div className="sjs-actions" style={{ marginTop: 12 }}>
              <button
                type="button"
                className="sjs-btn sjs-btn--primary"
                onClick={iniciarPeticion}
                disabled={estado === "pending"}
              >
                ▶ fetch(signal)
              </button>
              <button
                type="button"
                className="sjs-btn sjs-btn--danger"
                onClick={() => abortar(false)}
                disabled={estado !== "pending"}
              >
                🛑 abort(reason)
              </button>
              <button
                type="button"
                className="sjs-btn"
                onClick={reiniciar}
              >
                🔄 Reiniciar
              </button>
            </div>

            <label className="sjs-field" style={{ marginTop: 12 }}>
              <span>motivo del abort()</span>
              <input
                className="sjs-input"
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              />
            </label>
          </div>

          <div className="sjs-card">
            <div className="sjs-card__label">
              <span>⏱️ AbortSignal.timeout()</span>
            </div>
            <label className="sjs-field" style={{ marginBottom: 10 }}>
              <span>ms antes de cancelar</span>
              <input
                className="sjs-input"
                value={timeoutMs}
                onChange={(e) => setTimeoutMs(e.target.value)}
                inputMode="numeric"
              />
            </label>
            <button
              type="button"
              className="sjs-btn"
              onClick={() => abortar(true)}
              disabled={estado !== "pending"}
            >
              ⏱️ abortar tras el timeout
            </button>

            <dl className="sjs-kv" style={{ marginTop: 14 }}>
              <dt>signal.aborted</dt>
              <dd>{String(signal.aborted)}</dd>
              <dt>signal.reason</dt>
              <dd>{signal.reason ? String(signal.reason) : "—"}</dd>
              <dt>signal.reason.name</dt>
              <dd>{signal.reason?.name ?? "—"}</dd>
            </dl>

            <div className="sjs-note" style={{ marginTop: 10 }}>
              <code>abort()</code> es idempotente: llamarlo dos veces no lanza error. Si no pasas
              motivo, el <code>reason</code> es un <code>DOMException</code> con nombre{" "}
              <code>AbortError</code>.
            </div>
          </div>
        </div>
      )}
    </MarcoSimulador>
  );
}
