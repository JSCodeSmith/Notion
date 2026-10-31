const ICONOS = {
  exito: '✅',
  error: '⛔',
  info: '💡',
  juego: '🎯',
}

export default function Alertas({ alertas, onCerrar }) {
  if (alertas.length === 0) return null

  return (
    <div className="rx-alertas" aria-live="polite" aria-atomic="false">
      {alertas.map((alerta) => (
        <div key={alerta.id} className={`rx-alerta rx-alerta--${alerta.tipo}`} role="status">
          <span className="rx-alerta__icono" aria-hidden="true">
            {ICONOS[alerta.tipo] ?? ICONOS.info}
          </span>
          <div className="rx-alerta__texto">
            <strong>{alerta.titulo}</strong>
            {alerta.texto && <span>{alerta.texto}</span>}
          </div>
          <button
            type="button"
            className="rx-alerta__cerrar"
            onClick={() => onCerrar?.(alerta.id)}
            aria-label="Cerrar alerta"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
