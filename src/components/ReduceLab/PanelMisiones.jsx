import { useState } from "react";
import { formatear } from "./motor.js";

const resueltasDe = (modo, resueltas) =>
  modo.misiones.filter((mision) => Boolean(resueltas[mision.id])).length;

const desbloqueada = (modo, indice, resueltas) =>
  indice === 0 || Boolean(resueltas[modo.misiones[indice - 1].id]);

function TarjetaModo({ modo, activo, xp, resueltas, onClick }) {
  const bloqueado = xp < modo.xpDesbloqueo;
  const hechas = resueltasDe(modo, resueltas);
  return (
    <button
      type="button"
      className={`rl-mode ${activo ? "is-active" : ""} ${bloqueado ? "is-locked" : ""}`}
      style={{ "--mode-color": modo.color }}
      onClick={() => !bloqueado && onClick(modo.id)}
      disabled={bloqueado}
      aria-pressed={activo}
    >
      <span className="rl-mode__icon">{bloqueado ? "🔒" : modo.icono}</span>
      <span className="rl-mode__info">
        <strong>{modo.nombre}</strong>
        <small>{bloqueado ? `Se abre con ${modo.xpDesbloqueo} XP` : `${hechas}/3 misiones`}</small>
      </span>
      <span className="rl-mode__bar">
        <span style={{ width: `${(hechas / modo.misiones.length) * 100}%` }} />
      </span>
    </button>
  );
}

function TarjetaMision({ mision, indice, estado, activa, onClick }) {
  return (
    <button
      type="button"
      className={`rl-mission ${activa ? "is-active" : ""} ${estado === "locked" ? "is-locked" : ""}`}
      onClick={() => estado !== "locked" && onClick(mision.id)}
      disabled={estado === "locked"}
    >
      <span className="rl-mission__num">
        {estado === "done" ? "✅" : estado === "locked" ? "🔒" : indice + 1}
      </span>
      <span className="rl-mission__body">
        <strong>{mision.titulo}</strong>
        <small>
          {mision.dificultad} · {mision.xp} XP
        </small>
      </span>
    </button>
  );
}

function Traza({ traza }) {
  if (!traza) return null;
  return (
    <div className="rl-trace">
      <div className="rl-trace__title">🔍 Cómo evolucionó tu acumulador</div>
      <div className="rl-trace__rows">
        {traza.pasos.map((paso) => (
          <div key={paso.n} className={`rl-trace__row ${paso.n === 0 ? "is-start" : ""}`}>
            <span>{paso.n === 0 ? "inicio" : `paso ${paso.n}`}</span>
            <code>{`acc = ${formatear(paso.actual)}`}</code>
            <small>{paso.nota || `elemento [${paso.indice}]`}</small>
          </div>
        ))}
      </div>
      <div className="rl-trace__final">Resultado final: {formatear(traza.resultado)}</div>
    </div>
  );
}

export default function PanelMisiones({
  modo,
  modos,
  mision,
  progreso,
  onModo,
  onMision,
  onResolver,
  onVerSolucion,
  onSiguiente,
}) {
  const [codigo, setCodigo] = useState("");
  const [pistas, setPistas] = useState(0);
  const [solucionVisible, setSolucionVisible] = useState(() =>
    Boolean(mision && progreso.solucionesVistas.includes(mision.id)),
  );
  const [solucionUsada, setSolucionUsada] = useState(() =>
    Boolean(mision && progreso.solucionesVistas.includes(mision.id)),
  );
  const [feedback, setFeedback] = useState(null);
  const [intentos, setIntentos] = useState(0);

  if (!modo) return null;

  const resueltas = progreso.resueltas;
  const datosTexto = mision
    ? mision.datos.every((item) => item === null || typeof item !== "object")
      ? JSON.stringify(mision.datos)
      : JSON.stringify(mision.datos, null, 2)
    : "";

  const validar = () => {
    if (!mision) return;
    if (!codigo.trim()) {
      setFeedback({ tipo: "error", error: "Escribe un callback antes de validar." });
      return;
    }
    const resultado = onResolver(mision, codigo, {
      pistas,
      solucionVista: solucionUsada,
      intentos,
    });
    if (resultado.ok) {
      setFeedback({ tipo: "ok", ...resultado });
    } else {
      setIntentos((n) => n + 1);
      setFeedback({ tipo: "error", error: resultado.error, detalle: resultado.detalle });
    }
  };

  const revelarSolucion = () => {
    if (!mision) return;
    const siguiente = !solucionVisible;
    setSolucionVisible(siguiente);
    if (siguiente) {
      setSolucionUsada(true);
      onVerSolucion(mision.id);
    }
  };

  return (
    <div className="rl-misiones">
      <div className="rl-modes">
        {modos.map((item) => (
          <TarjetaModo
            key={item.id}
            modo={item}
            activo={item.id === modo.id}
            xp={progreso.xp}
            resueltas={resueltas}
            onClick={onModo}
          />
        ))}
      </div>

      <div className="rl-mode-head" style={{ "--mode-color": modo.color }}>
        <div className="rl-mode-head__icon">{modo.icono}</div>
        <div>
          <h3>{modo.nombre}</h3>
          <p>{modo.historia}</p>
          <span className="rl-lema">«{modo.lema}»</span>
        </div>
      </div>

      <div className="rl-mission-list">
        {modo.misiones.map((item, indice) => {
          const abierta = desbloqueada(modo, indice, resueltas);
          const estado = resueltas[item.id] ? "done" : abierta ? "open" : "locked";
          return (
            <TarjetaMision
              key={item.id}
              mision={item}
              indice={indice}
              estado={estado}
              activa={item.id === mision?.id}
              onClick={onMision}
            />
          );
        })}
      </div>

      {!mision ? (
        <div className="rl-empty">
          <span>🎯</span>
          <p>Elige una misión para abrir el editor de reducción.</p>
        </div>
      ) : (
        <div className="rl-workspace">
          <div className="rl-brief">
            <div className="rl-brief__top">
              <span className={`rl-diff rl-diff--${mision.dificultad.toLowerCase()}`}>
                {mision.dificultad}
              </span>
              <span className="rl-badge">🎁 {mision.recompensa}</span>
              <span className="rl-badge rl-badge--xp">+{mision.xp} XP</span>
            </div>
            <h4>📖 Historia</h4>
            <p className="rl-story">{mision.historia}</p>

            <h4>🎯 Objetivo</h4>
            <p>{mision.objetivo}</p>

            <h4>⚠️ El problema</h4>
            <p>{mision.problema}</p>

            <h4>📦 Datos de entrada</h4>
            <pre className="rl-code rl-data">{datosTexto}</pre>
            <div className="rl-kv">
              <span>valorInicial</span>
              <code>{formatear(mision.inicial)}</code>
              <span>Resultado esperado</span>
              <code className="rl-kv__ok">{formatear(mision.esperado)}</code>
            </div>
          </div>

          <div className="rl-editor">
            <div className="rl-editor__head">
              <span>⌨️ Editor del reducer</span>
              <span className="rl-mono">callback</span>
            </div>
            <p className="rl-editor__hint">
              Escribe la función reductora. El laboratorio la ejecutará como{" "}
              <code>datos.reduce(tuCallback, valorInicial)</code>.
            </p>
            <textarea
              className="rl-textarea"
              value={codigo}
              onChange={(evento) => setCodigo(evento.target.value)}
              placeholder={`(acc, item) => {\n  // tu lógica aquí\n  return nuevoAcumulador;\n}`}
              spellCheck={false}
              rows={7}
              aria-label="Editor del callback de reduce"
            />
            <div className="rl-actions">
              <button type="button" className="rl-btn rl-btn--primary" onClick={validar}>
                ▶ Validar reducción
              </button>
              <button type="button" className="rl-btn" onClick={() => setFeedback(null)}>
                🧹 Limpiar aviso
              </button>
              <button
                type="button"
                className={`rl-btn ${solucionVisible ? "is-active" : ""}`}
                onClick={revelarSolucion}
              >
                {solucionVisible ? "🙈 Ocultar solución" : "👁️ Ver solución"}
              </button>
            </div>

            {feedback?.tipo === "ok" && (
              <div className="rl-feedback rl-feedback--ok">
                <strong>
                  {feedback.yaResuelta
                    ? "✅ Reductor correcto (misión ya resuelta)"
                    : `✅ ¡Misión completada! +${feedback.xpGanado} XP`}
                </strong>
                <p>{feedback.mensaje}</p>
                <Traza traza={feedback.traza} />
                <p className="rl-explain">{mision.explicacion}</p>
                <button type="button" className="rl-btn rl-btn--primary" onClick={() => onSiguiente(mision)}>
                  ➡️ Siguiente misión
                </button>
              </div>
            )}

            {feedback?.tipo === "error" && (
              <div className="rl-feedback rl-feedback--error">
                <strong>❌ Todavía no</strong>
                <p>{feedback.error}</p>
                {feedback.detalle && <code className="rl-feedback__detail">{feedback.detalle}</code>}
                <small>Intento {intentos + 1} · la racha vuelve a 0.</small>
              </div>
            )}

            {solucionVisible && (
              <div className="rl-solution">
                <div className="rl-solution__head">Solución de referencia</div>
                <pre className="rl-code">{mision.solucion}</pre>
                <p>
                  Si la validas después de verla, la misión otorga solo el <strong>25%</strong> del
                  XP. {mision.explicacion}
                </p>
              </div>
            )}

            <div className="rl-hints">
              <div className="rl-hints__head">
                <span>💡 Pistas progresivas</span>
                <span className="rl-mono">−20 XP cada una</span>
              </div>
              {progreso.experto ? (
                <p className="rl-hints__off">Modo experto activo: las pistas están desactivadas.</p>
              ) : (
                <>
                  <div className="rl-hints__list">
                    {mision.pistas.slice(0, pistas).map((pista, indice) => (
                      <div key={indice} className="rl-hint">
                        <span>💡</span> {pista}
                      </div>
                    ))}
                  </div>
                  {pistas < mision.pistas.length && (
                    <button type="button" className="rl-btn" onClick={() => setPistas((n) => n + 1)}>
                      💡 Revelar pista {pistas + 1}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
