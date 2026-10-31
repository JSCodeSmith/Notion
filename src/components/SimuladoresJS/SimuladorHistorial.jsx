import { useMemo, useState } from "react";
import MarcoSimulador from "./MarcoSimulador";

const ENTRADAS_INICIALES = [
  { url: "/inicio", state: null },
  { url: "/productos", state: { categoria: "todos" } },
  { url: "/producto/7", state: { id: 7, scrollY: 240 } },
];

export default function SimuladorHistorial({ metodoId }) {
  const [entradas, setEntradas] = useState(ENTRADAS_INICIALES);
  const [cursor, setCursor] = useState(ENTRADAS_INICIALES.length - 1);
  const [url, setUrl] = useState("/carrito");
  const [estado, setEstado] = useState('{ "paso": "carrito" }');
  const [go, setGo] = useState("-1");
  const [logs, setLogs] = useState([
    { tipo: "system", texto: "Historial inicial de 3 entradas. Estás en /producto/7." },
  ]);

  const actual = entradas[cursor];

  const log = (tipo, texto) => {
    setLogs((prev) => [...prev.slice(-9), { tipo, texto }]);
  };

  const irA = (destino, etiqueta) => {
    setCursor(destino);
    log("success", etiqueta + " → " + entradas[destino].url);
    log("info", "popstate disparado · history.state = " + JSON.stringify(entradas[destino].state));
  };

  const atras = () => {
    if (cursor === 0) {
      log("warn", "history.back(): no hay entrada anterior. No hace nada.");
      return;
    }
    irA(cursor - 1, "history.back()");
  };

  const adelante = () => {
    if (cursor === entradas.length - 1) {
      log("warn", "history.forward(): no hay entrada siguiente. No hace nada.");
      return;
    }
    irA(cursor + 1, "history.forward()");
  };

  const ejecutarGo = () => {
    const n = Number(go);

    if (!Number.isFinite(n) || Number.isNaN(n)) {
      log("error", "history.go(NaN): no hace nada.");
      return;
    }
    if (n === 0) {
      log("success", "history.go(0): recarga la página actual (no navega).");
      return;
    }

    const destino = cursor + Math.trunc(n);
    if (destino < 0 || destino >= entradas.length) {
      log("warn", "history.go(" + n + "): la entrada no existe. No hace nada.");
      return;
    }
    irA(destino, "history.go(" + Math.trunc(n) + ")");
  };

  const parsearEstado = () => {
    try {
      return estado.trim() === "" ? null : JSON.parse(estado);
    } catch {
      log("error", "El estado no es JSON válido. No se modificó el historial.");
      return undefined;
    }
  };

  const pushState = () => {
    const nuevo = parsearEstado();
    if (nuevo === undefined) return;

    const recortado = entradas.slice(0, cursor + 1);
    const siguiente = [...recortado, { url, state: nuevo }];
    setEntradas(siguiente);
    setCursor(siguiente.length - 1);
    log("success", "history.pushState() añadió " + url + " (history.length = " + siguiente.length + ").");
    log("info", "pushState NO dispara popstate.");
  };

  const replaceState = () => {
    const nuevo = parsearEstado();
    if (nuevo === undefined) return;

    const copia = entradas.slice();
    copia[cursor] = { url, state: nuevo };
    setEntradas(copia);
    log("success", "history.replaceState() reemplazó la entrada actual por " + url + ".");
    log("info", "history.length sigue siendo " + copia.length + " y no se disparó popstate.");
  };

  const reset = () => {
    setEntradas(ENTRADAS_INICIALES);
    setCursor(ENTRADAS_INICIALES.length - 1);
    setUrl("/carrito");
    setEstado('{ "paso": "carrito" }');
    setGo("-1");
    setLogs([{ tipo: "system", texto: "Historial restaurado a su estado inicial." }]);
  };

  const codigo = useMemo(() => {
    if (metodoId === "history-pushstate") {
      return `history.pushState({ paso: "carrito" }, "", "/carrito");
// Añade una entrada y cambia la URL, sin recargar
// No dispara popstate`;
    }
    if (metodoId === "history-replacestate") {
      return `history.replaceState({ paso: "carrito" }, "", "/carrito");
// Reemplaza la entrada actual
// history.length no aumenta`;
    }
    if (metodoId === "history-go") {
      return `history.go(-1); // atrás
history.go(1);  // adelante
history.go(0);  // recarga`;
    }
    return `history.back();
// Equivale a history.go(-1)
// popstate avisa cuando termina`;
  }, [metodoId]);

  return (
    <MarcoSimulador
      icon="🕘"
      titulo={metodoId === "history-go" ? "history.go()" : "History API"}
      descripcion="Manipula un historial simulado: retrocede, avanza, salta entradas y añade o reemplaza estados. Observa cómo cambian la URL, history.length y popstate."
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
      <div className="sjs-card" style={{ marginBottom: 14 }}>
        <div className="sjs-card__label">
          <span>🌐 Barra de direcciones simulada</span>
          <span className="sjs-tag sjs-tag--info">
            history.length: {entradas.length}
          </span>
        </div>
        <div className="sjs-output">{actual.url}</div>
        <div className="sjs-tags">
          <span className="sjs-tag">posición: {cursor + 1} / {entradas.length}</span>
          <span className="sjs-tag">
            history.state: {JSON.stringify(actual.state)}
          </span>
        </div>
      </div>

      <div className="sjs-card" style={{ marginBottom: 14 }}>
        <div className="sjs-card__label">🗂️ Entradas del historial</div>
        <div className="sjs-tags" style={{ marginTop: 0 }}>
          {entradas.map((e, i) => (
            <span
              key={i}
              className={`sjs-tag ${i === cursor ? "sjs-tag--ok" : ""}`}
              title={JSON.stringify(e.state)}
            >
              {i === cursor ? "▶ " : ""}
              {e.url}
            </span>
          ))}
        </div>
      </div>

      <div className="sjs-actions">
        <button
          type="button"
          className="sjs-btn sjs-btn--primary"
          onClick={atras}
          disabled={cursor === 0}
        >
          ⬅️ history.back()
        </button>
        <button
          type="button"
          className="sjs-btn sjs-btn--primary"
          onClick={adelante}
          disabled={cursor === entradas.length - 1}
        >
          ➡️ history.forward()
        </button>
        <button type="button" className="sjs-btn" onClick={reset}>
          🔄 Reset
        </button>
      </div>

      <div className="sjs-toolbar">
        <label className="sjs-field">
          <span>history.go(n)</span>
          <input
            className="sjs-input sjs-input--short"
            type="number"
            value={go}
            onChange={(e) => setGo(e.target.value)}
          />
        </label>
        <button type="button" className="sjs-btn" onClick={ejecutarGo}>
          ↔️ Ejecutar go()
        </button>
      </div>

      <div className="sjs-toolbar">
        <label className="sjs-field sjs-field--grow">
          <span>URL nueva (mismo origen)</span>
          <input
            className="sjs-input"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </label>
        <label className="sjs-field sjs-field--grow">
          <span>Estado (JSON)</span>
          <input
            className="sjs-input"
            type="text"
            value={estado}
            onChange={(e) => setEstado(e.target.value)}
          />
        </label>
      </div>

      <div className="sjs-actions">
        <button type="button" className="sjs-btn sjs-btn--primary" onClick={pushState}>
          ➕ pushState()
        </button>
        <button type="button" className="sjs-btn" onClick={replaceState}>
          🔄 replaceState()
        </button>
      </div>

      <div className="sjs-note">
        💡 <code>pushState()</code> y <code>replaceState()</code> cambian la URL
        sin recargar y <strong>no</strong> disparan <code>popstate</code>. Solo
        la navegación del usuario (o <code>back()</code>, <code>forward()</code>{" "}
        y <code>go()</code>) lo hace.
      </div>
    </MarcoSimulador>
  );
}
