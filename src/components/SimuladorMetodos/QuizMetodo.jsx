import { useMemo, useState } from 'react';
import CodeBlock from '../CodeBlock/CodeBlock';
import { escapeHtml } from '../SimuladorFind/findTrace';
import { ejecutarDemo } from './ejecutarMetodo';
import { obtenerFamilia } from './metodosMeta';
import '../SimuladorFind/QuizFind.css';

const PISTAS = {
  busqueda:
    'Recorre el array mentalmente y detente en cuanto la condición sea verdadera. Revisa también qué devuelve cuando no encuentra nada.',
  transformacion:
    'Piensa en la forma del valor devuelto y en si el array original se conserva o se reemplaza.',
  mutador:
    'Fíjate en el efecto secundario: el array original cambia. El valor devuelto no siempre es el array.',
  reduccion:
    'Sigue el acumulador paso a paso. El resultado final es el último valor que toma.',
  iterador:
    'El método no devuelve un array transformado: produce una secuencia o ejecuta un efecto por elemento.',
  utilidad:
    'Lee la entrada y aplica el cálculo. No hay callback ni cortocircuito.',
};

const construirPreguntas = (metodo) => {
  const familia = obtenerFamilia(metodo.id);
  const demo = ejecutarDemo(metodo.id);
  const titulo = metodo.titulo ?? metodo.id;

  return (metodo.quiz ?? []).map((pregunta) => {
    const correcta = pregunta.opciones?.[pregunta.correcta] ?? '';
    return {
      ...pregunta,
      pista:
        pregunta.pista ??
        PISTAS[familia] ??
        'Repasa el paso a paso del diagrama antes de responder.',
      explicacionOk:
        pregunta.explicacionOk ??
        `<strong>¡Correcto!</strong> Aplicaste bien el comportamiento de <code>${escapeHtml(titulo)}</code>.`,
      explicacionFail:
        pregunta.explicacionFail ??
        `<strong>Incorrecto.</strong> La respuesta correcta es <code>${escapeHtml(
          correcta
        )}</code>. Repasa el diagrama y el entorno de prueba.`,
      codigo: pregunta.codigo ?? demo.demo.code,
    };
  });
};

export default function QuizMetodo({ metodo }) {
  const preguntas = useMemo(() => construirPreguntas(metodo), [metodo]);

  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respondida, setRespondida] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [mostrarPista, setMostrarPista] = useState(false);
  const [puntuacion, setPuntuacion] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  if (!preguntas || preguntas.length === 0) return null;

  const pregunta = preguntas[preguntaActual];

  const handleRespuesta = (index) => {
    if (respondida) return;
    setRespondida(true);
    setOpcionSeleccionada(index);
    setMostrarPista(false);
    if (index === pregunta.correcta) setPuntuacion((prev) => prev + 1);
  };

  const siguientePregunta = () => {
    if (preguntaActual < preguntas.length - 1) {
      setPreguntaActual((prev) => prev + 1);
      setRespondida(false);
      setOpcionSeleccionada(null);
      setMostrarPista(false);
    } else {
      setFinalizado(true);
    }
  };

  const reiniciar = () => {
    setPreguntaActual(0);
    setRespondida(false);
    setOpcionSeleccionada(null);
    setMostrarPista(false);
    setPuntuacion(0);
    setFinalizado(false);
  };

  if (finalizado) {
    const perfecto = puntuacion === preguntas.length;
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="quiz-title">🚀 Repaso Completado</div>
        </div>
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#fff' }}>
            Aciertos: {puntuacion} / {preguntas.length}
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
            {perfecto
              ? `¡Perfecto! Dominas ${metodo.titulo}.`
              : 'Buen intento. Repasa los conceptos y vuelve a probar.'}
          </p>
          <button
            type="button"
            onClick={reiniciar}
            className="hint-btn"
            style={{ borderStyle: 'solid', padding: '10px 20px', fontSize: '1rem' }}
          >
            🔄 Reintentar Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-title">🚀 Quiz: Repaso Activo</div>
        <div className="progress">
          Pregunta {preguntaActual + 1} de {preguntas.length}
        </div>
      </div>

      <div
        className="question-text"
        dangerouslySetInnerHTML={{ __html: pregunta.pregunta }}
      />

      {!respondida && (
        <button
          type="button"
          className="hint-btn"
          onClick={() => setMostrarPista(!mostrarPista)}
        >
          💡 {mostrarPista ? 'Ocultar Pista' : 'Ver Pista'}
        </button>
      )}

      {mostrarPista && !respondida && (
        <div className="hint-box" style={{ display: 'block' }}>
          <strong>Pista de repaso:</strong> {pregunta.pista}
        </div>
      )}

      <div className="options-list">
        {pregunta.opciones.map((opcion, idx) => {
          const letra = String.fromCharCode(65 + idx);
          let claseOpcion = 'option';

          if (respondida) {
            claseOpcion += ' disabled';
            if (idx === pregunta.correcta) claseOpcion += ' correct';
            else if (idx === opcionSeleccionada) claseOpcion += ' incorrect';
          }

          return (
            <button
              key={idx}
              type="button"
              className={claseOpcion}
              onClick={() => handleRespuesta(idx)}
              disabled={respondida}
            >
              <div className="option-content">
                <span className="option-letter">{letra}</span>
                <span className="option-text">{opcion}</span>
              </div>
              <span className="icon-feedback">
                {respondida && idx === pregunta.correcta ? '✅' : '❌'}
              </span>
            </button>
          );
        })}
      </div>

      {respondida && (
        <div className="flashback-area" style={{ display: 'block' }}>
          <div className="flashback-header">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9 22 9 12 15 12 15 22" />
            </svg>
            Flashback Teórico
          </div>
          <div className="flashback-content">
            <div
              dangerouslySetInnerHTML={{
                __html:
                  opcionSeleccionada === pregunta.correcta
                    ? pregunta.explicacionOk
                    : pregunta.explicacionFail,
              }}
            />

            {pregunta.codigo && (
              <div
                style={{
                  marginTop: '16px',
                  borderLeft: '3px solid var(--quiz-blue)',
                  borderRadius: '6px',
                  overflow: 'hidden',
                }}
              >
                <CodeBlock code={pregunta.codigo} />
              </div>
            )}

            <div
              style={{
                marginTop: '20px',
                display: 'flex',
                justifyContent: 'flex-end',
              }}
            >
              <button
                type="button"
                className="hint-btn"
                style={{
                  borderStyle: 'solid',
                  background: 'var(--quiz-blue)',
                  color: '#fff',
                  borderColor: 'var(--quiz-blue)',
                }}
                onClick={siguientePregunta}
              >
                {preguntaActual < preguntas.length - 1
                  ? 'Siguiente Pregunta →'
                  : 'Ver Resultados'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
