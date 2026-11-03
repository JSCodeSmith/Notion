import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getGameConfig } from "./gameConfigs";
import { firma, formatear } from "./serializar";
import "./AdvancedGame.css";

const ICONOS = {
  sistema: "🛰️",
  log: "›",
  info: "ℹ️",
  warn: "⚠️",
  error: "⛔",
  debug: "🐞",
  success: "✅",
  resultado: "📦",
};

const NIVEL_XP = 250;
const XP_POR_RONDA = 25;
const EMOJIS_FIESTA = ["🎉", "⭐", "🏆", "✨", "🎮", "🚀", "💎", "🕹️"];

const ESTADOS = {
  idle: { texto: "En espera", clase: "idle" },
  running: { texto: "Ejecutando…", clase: "running" },
  success: { texto: "Completada", clase: "success" },
  error: { texto: "Revisar", clase: "error" },
};

export default function AdvancedGame({ metodoId }) {
  const config = getGameConfig(metodoId);

  const [ronda, setRonda] = useState(null);
  const [codigo, setCodigo] = useState("");
  const [logs, setLogs] = useState([]);
  const [estado, setEstado] = useState("idle");
  const [resultado, setResultado] = useState(null);
  const [mensaje, setMensaje] = useState(null);
  const [pista, setPista] = useState(false);
  const [xp, setXp] = useState(0);
  const [completadas, setCompletadas] = useState(0);
  const [numeroRonda, setNumeroRonda] = useState(1);

  const workerRef = useRef(null);
  const timeoutRef = useRef(null);
  const runIdRef = useRef(0);
  const resueltaRef = useRef(false);
  const editorRef = useRef(null);
  const gutterRef = useRef(null);

  const detenerWorker = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (workerRef.current) {
      workerRef.current.terminate();
      workerRef.current = null;
    }
  }, []);

  const prepararRonda = useCallback(
    (esNueva = false) => {
      if (!config) return;
      detenerWorker();
      const nueva = config.crearRonda();
      resueltaRef.current = false;
      setRonda(nueva);
      setCodigo(config.starter(nueva));
      setLogs([
        {
          nivel: "sistema",
          texto: `🎮 Misión inicializada · ${config.metodo} · ${esNueva ? "nueva ronda" : "ronda #1"}`,
        },
        {
          nivel: "info",
          texto:
            "Escribe tu solución y pulsa Ejecutar. Usa return para devolver el resultado.",
        },
      ]);
      setEstado("idle");
      setResultado(null);
      setMensaje(null);
      setPista(false);
      setNumeroRonda((anterior) => (esNueva ? anterior + 1 : 1));
    },
    [config, detenerWorker],
  );

  useEffect(() => {
    prepararRonda(false);
    return () => detenerWorker();
  }, [prepararRonda, detenerWorker]);

  const ejecutarCodigo = () => {
    if (!config || !ronda || estado === "running") return;

    detenerWorker();

    if (typeof window === "undefined" || typeof Worker === "undefined") {
      setMensaje({
        tipo: "error",
        texto: "Este minijuego necesita un navegador con soporte de Web Workers.",
      });
      return;
    }

    const id = runIdRef.current + 1;
    runIdRef.current = id;
    const base = [
      { nivel: "sistema", texto: "▶ Compilando y ejecutando en un worker aislado…" },
    ];

    setEstado("running");
    setResultado(null);
    setMensaje(null);
    setLogs(base);

    let worker;
    try {
      worker = new Worker(new URL("./advancedGameWorker.js", import.meta.url), {
        type: "module",
      });
    } catch {
      setEstado("error");
      setMensaje({
        tipo: "error",
        texto: "No se pudo iniciar el entorno de ejecución.",
      });
      return;
    }

    workerRef.current = worker;

    timeoutRef.current = window.setTimeout(() => {
      if (runIdRef.current !== id) return;
      detenerWorker();
      setEstado("error");
      setResultado(null);
      setMensaje({
        tipo: "error",
        texto: "⏱️ Tiempo agotado (4 s). Revisa si tienes un bucle infinito.",
      });
      setLogs([
        ...base,
        {
          nivel: "error",
          texto: "⏱️ Ejecución detenida: el código tardó más de 4 segundos.",
        },
      ]);
    }, 4000);

    worker.onmessage = (evento) => {
      const data = evento.data ?? {};
      if (runIdRef.current !== id) return;

      detenerWorker();

      const logsWorker = Array.isArray(data.logs)
        ? data.logs.map((log) => ({
            nivel: log?.nivel ?? "log",
            texto: String(log?.texto ?? ""),
          }))
        : [];

      if (!data.ok) {
        const textoError = data.error || "Error desconocido";
        setEstado("error");
        setResultado(null);
        setMensaje({ tipo: "error", texto: `💥 ${textoError}` });
        setLogs([
          ...base,
          ...logsWorker,
          { nivel: "error", texto: `💥 ${textoError}` },
        ]);
        return;
      }

      const correcto = data.firma === firma(ronda.esperado);
      setResultado({
        texto: data.texto ?? "undefined",
        correcto,
        esperado: formatear(ronda.esperado),
      });

      if (correcto) {
        const primeraVez = !resueltaRef.current;
        resueltaRef.current = true;
        if (primeraVez) {
          setXp((valor) => valor + config.xp + XP_POR_RONDA);
          setCompletadas((valor) => valor + 1);
        }
        setEstado("success");
        setMensaje({
          tipo: "success",
          texto: primeraVez
            ? `🏆 ¡Misión cumplida! +${config.xp + XP_POR_RONDA} XP`
            : "🏆 ¡Correcto otra vez! Esta ronda ya estaba registrada.",
        });
        setLogs([
          ...base,
          ...logsWorker,
          { nivel: "success", texto: "✅ El resultado coincide con el objetivo." },
          { nivel: "resultado", texto: `return → ${data.texto ?? "undefined"}` },
        ]);
      } else {
        setEstado("error");
        setMensaje({
          tipo: "error",
          texto: "❌ El resultado no coincide. Compara tu salida con el objetivo.",
        });
        setLogs([
          ...base,
          ...logsWorker,
          { nivel: "resultado", texto: `return → ${data.texto ?? "undefined"}` },
          {
            nivel: "error",
            texto: `Esperado: ${formatear(ronda.esperado)}`,
          },
        ]);
      }
    };

    worker.onerror = (evento) => {
      if (runIdRef.current !== id) return;
      detenerWorker();
      setEstado("error");
      setMensaje({
        tipo: "error",
        texto: `💥 ${evento?.message || "El worker no pudo ejecutar el código."}`,
      });
      setLogs([
        ...base,
        {
          nivel: "error",
          texto: `💥 ${evento?.message || "Fallo del entorno de ejecución."}`,
        },
      ]);
    };

    worker.postMessage({ id, codigo });
  };

  const reiniciarRonda = () => {
    if (!config || !ronda) return;
    detenerWorker();
    setCodigo(config.starter(ronda));
    setEstado("idle");
    setResultado(null);
    setMensaje(null);
    setPista(false);
    setLogs([
      {
        nivel: "sistema",
        texto: "🔄 Código restaurado. La misión sigue en curso.",
      },
    ]);
  };

  const mostrarSolucion = () => {
    if (!config || !ronda) return;
    setCodigo(config.solucion(ronda));
    setPista(false);
    setMensaje({
      tipo: "info",
      texto: "🧩 Solución cargada en el editor. Pulsa Ejecutar para comprobarla.",
    });
  };

  const manejarTecla = (evento) => {
    if (evento.key === "Tab") {
      evento.preventDefault();
      const { selectionStart, selectionEnd, value } = evento.currentTarget;
      const nuevo = `${value.slice(0, selectionStart)}  ${value.slice(selectionEnd)}`;
      setCodigo(nuevo);
      window.requestAnimationFrame(() => {
        const editor = editorRef.current;
        if (!editor) return;
        editor.selectionStart = selectionStart + 2;
        editor.selectionEnd = selectionStart + 2;
      });
      return;
    }
    if ((evento.ctrlKey || evento.metaKey) && evento.key === "Enter") {
      evento.preventDefault();
      ejecutarCodigo();
    }
  };

  const sincronizarScroll = (evento) => {
    if (gutterRef.current) {
      gutterRef.current.scrollTop = evento.currentTarget.scrollTop;
    }
  };

  const tablero = useMemo(
    () => (ronda ? config?.tablero(ronda) : { tarjetas: [] }),
    [config, ronda],
  );

  if (!config) return null;

  if (!ronda) {
    return (
      <section className="ag">
        <div className="ag-loading">
          <span className="ag-spinner" />
          <span>Preparando misión interactiva…</span>
        </div>
      </section>
    );
  }

  const lineas = codigo.split("\n");
  const nivelActual = Math.floor(xp / NIVEL_XP) + 1;
  const progresoNivel = xp % NIVEL_XP;
  const porcentajeNivel = Math.round((progresoNivel / NIVEL_XP) * 100);
  const chip = ESTADOS[estado] ?? ESTADOS.idle;

  return (
    <section className="ag">
      <div className="ag__glow" aria-hidden="true" />

      <header className="ag-hero">
        <div className="ag-hero__top">
          <span className="ag-brand">
            <span className="ag-brand__dot" />
            <span className="ag-brand__text">
              ADVANCED INTERACTIVE PROGRAMMING GAME
            </span>
          </span>
          <span className={`ag-chip ag-chip--${chip.clase}`}>
            <span className="ag-chip__dot" /> {chip.texto}
          </span>
        </div>

        <div className="ag-hero__main">
          <div className="ag-hero__icon" aria-hidden="true">
            {config.icono}
          </div>
          <div className="ag-hero__text">
            <p className="ag-hero__eyebrow">Misión #{numeroRonda}</p>
            <h2 className="ag-hero__title">{config.titulo}</h2>
            <p className="ag-hero__desc">{config.descripcion}</p>
          </div>
          <div className="ag-hero__tags">
            <span className="ag-tag ag-tag--metodo">{config.metodo}</span>
            <span className="ag-tag ag-tag--xp">⚡ {config.xp} XP</span>
          </div>
        </div>

        <div className="ag-stats">
          <div className="ag-stat">
            <span className="ag-stat__label">Nivel</span>
            <strong className="ag-stat__value">{nivelActual}</strong>
          </div>
          <div className="ag-stat ag-stat--wide">
            <div className="ag-stat__line">
              <span className="ag-stat__label">Experiencia</span>
              <span className="ag-stat__xp">
                {progresoNivel} / {NIVEL_XP} XP
              </span>
            </div>
            <div className="ag-progress" role="progressbar" aria-valuemin={0} aria-valuemax={NIVEL_XP} aria-valuenow={progresoNivel}>
              <span style={{ width: `${porcentajeNivel}%` }} />
            </div>
          </div>
          <div className="ag-stat">
            <span className="ag-stat__label">Misiones</span>
            <strong className="ag-stat__value">{completadas}</strong>
          </div>
          <div className="ag-stat">
            <span className="ag-stat__label">Ronda</span>
            <strong className="ag-stat__value">{numeroRonda}</strong>
          </div>
        </div>
      </header>

      <div className="ag-objective">
        <span className="ag-objective__icon" aria-hidden="true">
          🎯
        </span>
        <div>
          <p className="ag-objective__label">Objetivo de la ronda</p>
          <p className="ag-objective__text">{config.objetivo(ronda)}</p>
        </div>
        <button
          type="button"
          className={`ag-hint-btn ${pista ? "is-active" : ""}`}
          onClick={() => setPista((valor) => !valor)}
          aria-expanded={pista}
        >
          💡 {pista ? "Ocultar pista" : "Ver pista"}
        </button>
      </div>

      {pista && <div className="ag-hint">💡 {config.pista}</div>}

      <div className="ag-board-wrap">
        <div className="ag-board-head">
          <span>🕹️ Tablero de emojis</span>
          <span className="ag-board-head__meta">
            {tablero.tarjetas.length} elementos
          </span>
        </div>
        <div className={`ag-board ${estado === "running" ? "is-running" : ""}`}>
          {tablero.tarjetas.map((tarjeta, indice) => (
            <div
              className="ag-card"
              key={tarjeta.id}
              style={{ animationDelay: `${indice * 45}ms` }}
            >
              <span className="ag-card__emoji">{tarjeta.emoji}</span>
              <span className="ag-card__index">{tarjeta.etiqueta}</span>
              {tarjeta.sub && <span className="ag-card__sub">{tarjeta.sub}</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="ag-workbench">
        <div className="ag-editor-panel">
          <div className="ag-panel-head">
            <span className="ag-panel-head__title">
              <span className="ag-dot ag-dot--red" />
              <span className="ag-dot ag-dot--yellow" />
              <span className="ag-dot ag-dot--green" />
              <span className="ag-panel-head__file">mision.js</span>
            </span>
            <span className="ag-panel-head__hint">Ctrl + Enter para ejecutar</span>
          </div>

          <div className="ag-editor">
            <div className="ag-gutter" ref={gutterRef} aria-hidden="true">
              {lineas.map((_, indice) => (
                <span key={indice}>{indice + 1}</span>
              ))}
            </div>
            <textarea
              ref={editorRef}
              className="ag-textarea"
              value={codigo}
              onChange={(evento) => setCodigo(evento.target.value)}
              onKeyDown={manejarTecla}
              onScroll={sincronizarScroll}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              aria-label={`Editor de código para ${config.metodo}`}
            />
          </div>

          <div className="ag-actions">
            <button
              type="button"
              className="ag-btn ag-btn--primary"
              onClick={ejecutarCodigo}
              disabled={estado === "running" || !ronda}
            >
              {estado === "running" ? (
                <>
                  <span className="ag-spinner" /> Ejecutando…
                </>
              ) : (
                <>▶ Ejecutar código</>
              )}
            </button>
            <button
              type="button"
              className="ag-btn"
              onClick={mostrarSolucion}
              disabled={!ronda}
            >
              🧩 Solución
            </button>
            <button
              type="button"
              className="ag-btn"
              onClick={reiniciarRonda}
              disabled={!ronda}
            >
              🔄 Reiniciar
            </button>
            {estado === "success" && (
              <button
                type="button"
                className="ag-btn ag-btn--next"
                onClick={() => prepararRonda(true)}
              >
                🚀 Nueva misión
              </button>
            )}
          </div>
        </div>

        <div className={`ag-console ag-console--${estado}`}>
          <div className="ag-panel-head ag-panel-head--console">
            <span className="ag-panel-head__title">
              <span className="ag-console__live" /> Consola
            </span>
            <span className="ag-panel-head__hint">{logs.length} líneas</span>
          </div>
          <div className="ag-console__body" aria-live="polite">
            {logs.map((log, indice) => (
              <div
                className={`ag-log ag-log--${log.nivel}`}
                key={`${indice}-${log.nivel}`}
              >
                <span className="ag-log__icon" aria-hidden="true">
                  {ICONOS[log.nivel] ?? "›"}
                </span>
                <span className="ag-log__text">{log.texto}</span>
              </div>
            ))}
            {estado === "running" && (
              <div className="ag-log ag-log--sistema">
                <span className="ag-log__icon">
                  <span className="ag-spinner ag-spinner--sm" />
                </span>
                <span className="ag-log__text">Esperando el resultado del worker…</span>
              </div>
            )}
          </div>

          {resultado && (
            <div
              className={`ag-result ${resultado.correcto ? "is-ok" : "is-bad"}`}
            >
              <span className="ag-result__badge">
                {resultado.correcto ? "✅ Salida correcta" : "❌ Salida distinta"}
              </span>
              <code className="ag-result__code">{resultado.texto}</code>
              {!resultado.correcto && (
                <span className="ag-result__expected">
                  Esperado: <code>{resultado.esperado}</code>
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      {mensaje && (
        <div className={`ag-message ag-message--${mensaje.tipo}`} role="status">
          {mensaje.texto}
        </div>
      )}

      {estado === "success" && (
        <div className="ag-celebration" aria-hidden="true">
          {EMOJIS_FIESTA.concat(EMOJIS_FIESTA).map((emoji, indice) => (
            <span
              key={`${emoji}-${indice}`}
              style={{
                left: `${(indice * 7 + 4) % 100}%`,
                animationDelay: `${(indice % 8) * 0.12}s`,
              }}
            >
              {emoji}
            </span>
          ))}
        </div>
      )}
    </section>
  );
}
