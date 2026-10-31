import { useState } from "react";
import { RANGOS } from "./motor.js";

export default function PanelProgreso({
  progreso,
  modos,
  medallas,
  rango,
  totalMisiones,
  onExperto,
  onReiniciar,
}) {
  const [confirmar, setConfirmar] = useState(false);
  const resueltas = Object.values(progreso.resueltas);
  const totalResueltas = resueltas.length;
  const perfectas = resueltas.filter((item) => item.limpia).length;
  const porcentaje = totalMisiones === 0 ? 0 : Math.round((totalResueltas / totalMisiones) * 100);
  const medallasObtenidas = medallas.filter((medalla) => medalla.obtenida).length;
  const siguiente = rango.siguiente;
  const tramo = siguiente ? siguiente.xp - rango.actual.xp : 0;
  const avance = siguiente
    ? Math.min(100, Math.round(((progreso.xp - rango.actual.xp) / tramo) * 100))
    : 100;

  return (
    <div className="rl-progreso">
      <div className="rl-rank">
        <div className="rl-rank__icon">{rango.actual.icono}</div>
        <div className="rl-rank__body">
          <span className="rl-kicker">Rango actual</span>
          <h3>{rango.actual.nombre}</h3>
          <div className="rl-rank__bar">
            <span style={{ width: `${avance}%` }} />
          </div>
          <div className="rl-rank__foot">
            <span>
              <strong>{progreso.xp}</strong> XP
            </span>
            <span>
              {siguiente
                ? `Faltan ${Math.max(0, siguiente.xp - progreso.xp)} XP para ${siguiente.nombre}`
                : "Rango máximo alcanzado"}
            </span>
          </div>
        </div>
        <button
          type="button"
          className={`rl-toggle ${progreso.experto ? "is-on" : ""}`}
          onClick={onExperto}
          aria-pressed={progreso.experto}
        >
          <span className="rl-toggle__dot" />
          Modo experto {progreso.experto ? "ON" : "OFF"}
        </button>
      </div>

      <div className="rl-stats">
        <div className="rl-stat">
          <span>Misiones</span>
          <strong>
            {totalResueltas}<small>/{totalMisiones}</small>
          </strong>
        </div>
        <div className="rl-stat">
          <span>Completado</span>
          <strong>{porcentaje}%</strong>
        </div>
        <div className="rl-stat">
          <span>Racha actual</span>
          <strong>🔥 {progreso.racha}</strong>
        </div>
        <div className="rl-stat">
          <span>Récord de racha</span>
          <strong>{progreso.mejorRacha}</strong>
        </div>
        <div className="rl-stat">
          <span>Sin pistas</span>
          <strong>{perfectas}</strong>
        </div>
        <div className="rl-stat">
          <span>Medallas</span>
          <strong>
            {medallasObtenidas}<small>/{medallas.length}</small>
          </strong>
        </div>
      </div>

      <div className="rl-columns">
        <div className="rl-panel">
          <div className="rl-panel__label">
            <span>📈 Rangos</span>
            <span className="rl-mono">{progreso.xp} XP</span>
          </div>
          <div className="rl-ladder">
            {RANGOS.map((item) => {
              const alcanzado = progreso.xp >= item.xp;
              const actual = item.nombre === rango.actual.nombre;
              return (
                <div key={item.nombre} className={`rl-ladder__row ${alcanzado ? "is-done" : ""} ${actual ? "is-current" : ""}`}>
                  <span className="rl-ladder__icon">{alcanzado ? item.icono : "⚪"}</span>
                  <span className="rl-ladder__name">{item.nombre}</span>
                  <span className="rl-mono">{item.xp} XP</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rl-panel">
          <div className="rl-panel__label">
            <span>🏅 Medallas</span>
            <span className="rl-mono">
              {medallasObtenidas}/{medallas.length}
            </span>
          </div>
          <div className="rl-medals">
            {medallas.map((medalla) => (
              <div
                key={medalla.id}
                className={`rl-medal ${medalla.obtenida ? "is-done" : ""}`}
                title={medalla.descripcion}
              >
                <span className="rl-medal__icon">{medalla.obtenida ? medalla.icono : "🔒"}</span>
                <strong>{medalla.nombre}</strong>
                <small>{medalla.descripcion}</small>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="rl-panel">
        <div className="rl-panel__label">
          <span>📊 Progreso por modo</span>
          <span className="rl-mono">{porcentaje}% del laboratorio</span>
        </div>
        <div className="rl-modes-progress">
          {modos.map((modo) => {
            const hechas = modo.misiones.filter((mision) => progreso.resueltas[mision.id]).length;
            return (
              <div key={modo.id} className="rl-mode-progress" style={{ "--mode-color": modo.color }}>
                <div className="rl-mode-progress__top">
                  <span>
                    {modo.icono} {modo.nombre}
                  </span>
                  <span className="rl-mono">
                    {hechas}/{modo.misiones.length}
                  </span>
                </div>
                <div className="rl-mode-progress__bar">
                  <span style={{ width: `${(hechas / modo.misiones.length) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rl-records">
        <div>
          <span className="rl-kicker">Récords personales</span>
          <p>
            Mejor racha: <strong>{progreso.mejorRacha}</strong> · Misiones sin pistas:{" "}
            <strong>{perfectas}</strong> · XP total: <strong>{progreso.xp}</strong>
          </p>
        </div>
        {!confirmar ? (
          <button type="button" className="rl-btn rl-btn--danger" onClick={() => setConfirmar(true)}>
            🗑️ Reiniciar progreso
          </button>
        ) : (
          <div className="rl-confirm">
            <span>¿Borrar XP, misiones y medallas?</span>
            <button
              type="button"
              className="rl-btn rl-btn--danger"
              onClick={() => {
                onReiniciar();
                setConfirmar(false);
              }}
            >
              Sí, borrar
            </button>
            <button type="button" className="rl-btn" onClick={() => setConfirmar(false)}>
              Cancelar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
