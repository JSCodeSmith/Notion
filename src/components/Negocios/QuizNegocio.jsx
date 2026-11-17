import { useMemo, useState } from 'react'
import { Inline } from '../CareerDetail/MetodoDoc'
import './QuizNegocio.css'

/**
 * Quiz de Negocios con la misma lógica de repaso activo que el quiz de find():
 * una pregunta por pantalla, retroalimentación inmediata y explicación
 * conceptual (sin código) después de cada respuesta.
 */
export default function QuizNegocio({
  preguntas = [],
  titulo = '🧠 Quiz de repaso',
  subtitulo = 'Elige una opción y descubre el porqué.',
}) {
  const [actual, setActual] = useState(0)
  const [elegida, setElegida] = useState(null)
  const [respondida, setRespondida] = useState(false)
  const [pista, setPista] = useState(false)
  const [historial, setHistorial] = useState([])
  const [terminado, setTerminado] = useState(false)

  const total = preguntas.length
  const pregunta = preguntas[actual]
  const aciertos = useMemo(
    () => historial.reduce((n, r) => (r.ok ? n + 1 : n), 0),
    [historial]
  )
  const porcentaje = total ? Math.round(((actual + (respondida ? 1 : 0)) / total) * 100) : 0

  if (!total) return null

  const responder = (indice) => {
    if (respondida) return
    const ok = indice === pregunta.correcta
    setElegida(indice)
    setRespondida(true)
    setHistorial((prev) => [...prev, { id: pregunta.id ?? actual, ok, indice }])
  }

  const siguiente = () => {
    if (actual < total - 1) {
      setActual((n) => n + 1)
      setElegida(null)
      setRespondida(false)
      setPista(false)
      return
    }
    setTerminado(true)
  }

  const reiniciar = () => {
    setActual(0)
    setElegida(null)
    setRespondida(false)
    setPista(false)
    setHistorial([])
    setTerminado(false)
  }

  if (terminado) {
    const nota = Math.round((aciertos / total) * 10)
    const mensaje =
      aciertos === total
        ? '¡Dominio total! Puedes explicar estos conceptos con tus propias palabras.'
        : aciertos >= total * 0.75
          ? 'Muy buen nivel. Repasa las preguntas falladas y vuelve a intentarlo.'
          : 'Buen punto de partida. Lee las explicaciones y repite el quiz: cada intento suma.'
    return (
      <section className="nq">
        <header className="nq-head">
          <div>
            <span className="nq-eyebrow">Resultado final</span>
            <h3 className="nq-title">{titulo}</h3>
          </div>
          <span className="nq-badge">✅ {aciertos} / {total}</span>
        </header>

        <div className="nq-result">
          <div className="nq-ring" style={{ '--nq-pct': `${(aciertos / total) * 100}%` }}>
            <div>
              <strong>{nota}</strong>
              <span>/ 10</span>
            </div>
          </div>
          <p className="nq-result__msg">{mensaje}</p>
        </div>

        <ol className="nq-review">
          {preguntas.map((q, i) => {
            const r = historial[i]
            return (
              <li key={q.id ?? i} className={r?.ok ? 'is-ok' : 'is-fail'}>
                <div className="nq-review__top">
                  <span>{r?.ok ? '✅' : '❌'}</span>
                  <strong>Pregunta {i + 1}</strong>
                  <span className="nq-review__choice">
                    {r?.ok ? 'Acertaste' : 'Respuesta correcta: '}
                    {!r?.ok && q.opciones[q.correcta]}
                  </span>
                </div>
                <p className="nq-review__why">
                  <Inline text={q.explicacion} />
                </p>
              </li>
            )
          })}
        </ol>

        <div className="nq-actions">
          <button type="button" className="nq-btn nq-btn--primary" onClick={reiniciar}>
            🔄 Repetir quiz
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="nq">
      <header className="nq-head">
        <div>
          <span className="nq-eyebrow">{subtitulo}</span>
          <h3 className="nq-title">{titulo}</h3>
        </div>
        <span className="nq-badge">Pregunta {actual + 1} de {total}</span>
      </header>

      <div className="nq-progress" aria-hidden="true">
        <span style={{ width: `${porcentaje}%` }} />
      </div>

      <p className="nq-question">
        <Inline text={pregunta.pregunta} />
      </p>

      <div className="nq-options">
        {pregunta.opciones.map((opcion, i) => {
          const letra = String.fromCharCode(65 + i)
          const clase = [
            'nq-option',
            respondida && i === pregunta.correcta ? 'is-correct' : '',
            respondida && i === elegida && i !== pregunta.correcta ? 'is-wrong' : '',
          ]
            .filter(Boolean)
            .join(' ')

          return (
            <button
              key={i}
              type="button"
              className={clase}
              onClick={() => responder(i)}
              disabled={respondida}
            >
              <span className="nq-letter">{letra}</span>
              <span className="nq-option__text">
                <Inline text={opcion} />
              </span>
              {respondida && i === pregunta.correcta && (
                <span className="nq-icon">✅</span>
              )}
              {respondida && i === elegida && i !== pregunta.correcta && (
                <span className="nq-icon">❌</span>
              )}
            </button>
          )
        })}
      </div>

      {!respondida && pregunta.pista && (
        <div className="nq-hintbox">
          <button type="button" className="nq-hint" onClick={() => setPista((v) => !v)}>
            💡 {pista ? 'Ocultar pista' : 'Ver pista'}
          </button>
          {pista && <p><Inline text={pregunta.pista} /></p>}
        </div>
      )}

      {respondida && (
        <div className={`nq-feedback ${elegida === pregunta.correcta ? 'is-ok' : 'is-fail'}`}>
          <span className="nq-feedback__mark">
            {elegida === pregunta.correcta ? '✔' : '✖'}
          </span>
          <div>
            <strong>
              {elegida === pregunta.correcta ? '¡Correcto!' : 'Revisemos la idea'}
            </strong>
            <p>
              <Inline text={pregunta.explicacion} />
            </p>
          </div>
        </div>
      )}

      <div className="nq-actions">
        <span className="nq-score">Aciertos: {aciertos}</span>
        <button
          type="button"
          className="nq-btn nq-btn--primary"
          onClick={siguiente}
          disabled={!respondida}
        >
          {actual < total - 1 ? 'Siguiente pregunta →' : 'Ver resultados'}
        </button>
      </div>
    </section>
  )
}
