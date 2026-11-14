import { useMemo, useState } from 'react';
import CodeBlock from '../CodeBlock/CodeBlock';
import { escapeHtml, formatValue } from '../SimuladorFind/findTrace';
import { ejecutarDemo, formatearResultado } from './ejecutarMetodo';
import {
  CORTA,
  MUTA,
  obtenerFamilia,
  obtenerNombre,
  obtenerRelacionados,
} from './metodosMeta';
import '../SimuladorFind/QuizFind.css';

const MINIMO_PREGUNTAS = 11;

const FALLO = {
  find: 'undefined',
  findlast: 'undefined',
  findindex: '-1',
  findlastindex: '-1',
  indexof: '-1',
  lastindexof: '-1',
  some: 'false',
  every: 'true',
};

const FAMILIA_TEXTO = {
  busqueda: 'Recorre y se detiene en la primera coincidencia.',
  transformacion: 'Recorre todo y devuelve una salida nueva sin mutar la entrada.',
  mutador: 'Modifica el array original y devuelve un resultado de la operación.',
  reduccion: 'Recorre todo acumulando un único valor final.',
  iterador: 'Produce una secuencia o ejecuta un efecto por elemento.',
  utilidad: 'Calcula el resultado directamente, sin callback.',
};

const barajar = (lista, semilla) => {
  const copia = [...lista];
  let estado = semilla || 1;
  for (let i = copia.length - 1; i > 0; i -= 1) {
    estado = (estado * 1103515245 + 12345) % 2147483648;
    const j = estado % (i + 1);
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};

const semillaDe = (texto) => {
  let h = 0;
  for (let i = 0; i < texto.length; i += 1) {
    h = (h * 31 + texto.charCodeAt(i)) % 1000003;
  }
  return h || 1;
};

/* Construye 4 opciones únicas y devuelve el índice de la correcta. */
const conOpciones = (correcta, distractores, semilla) => {
  const vistos = new Set();
  const opciones = [];
  [correcta, ...distractores].forEach((valor) => {
    const texto = String(valor);
    if (!vistos.has(texto)) {
      vistos.add(texto);
      opciones.push(texto);
    }
  });
  ['undefined', 'null', '[]', '0', '-1', 'false', 'true'].forEach((relleno) => {
    if (opciones.length < 4 && !vistos.has(relleno)) {
      vistos.add(relleno);
      opciones.push(relleno);
    }
  });
  const mezcladas = barajar(opciones.slice(0, 4), semilla);
  return {
    opciones: mezcladas,
    correcta: mezcladas.indexOf(String(correcta)),
  };
};

const tipoDe = (valor) => {
  if (Array.isArray(valor)) return 'Un array';
  if (valor === undefined) return 'undefined';
  if (valor === null) return 'null';
  if (typeof valor === 'boolean') return 'Un booleano';
  if (typeof valor === 'number') return 'Un número';
  if (typeof valor === 'string') return 'Un string';
  return 'Un objeto';
};

const nombreVisible = (id) => {
  const nombre = obtenerNombre(id);
  return nombre.includes('(') || nombre === 'length' ? nombre : `${nombre}()`;
};

const preguntasExtra = (metodo, familia, demo) => {
  const corto = obtenerNombre(metodo.id).replace('Array.prototype.', '');
  const resultado = formatearResultado(metodo.id, demo.result);
  const lista = `[${demo.original.map(formatValue).join(', ')}]`;
  const relacionados = obtenerRelacionados(metodo.id);
  const otro = relacionados.find((id) => id !== metodo.id);
  const otroNombre = otro ? nombreVisible(otro) : 'filter()';
  const muta = MUTA.has(metodo.id);
  const corta = CORTA.has(metodo.id);
  const tieneCallback = Boolean(demo.demo.fn);
  const fallo = FALLO[metodo.id] ?? 'undefined';

  let vacio = 'undefined';
  try {
    vacio = formatearResultado(
      metodo.id,
      ejecutarDemo(metodo.id, { arreglo: [] }).result
    );
  } catch {
    vacio = 'undefined';
  }

  const q1 = {
    pregunta: `¿Qué devuelve <code>${escapeHtml(corto)}</code> en este escenario: <code>${escapeHtml(lista)}</code>?`,
    ...conOpciones(resultado, ['undefined', 'null', '[]', '-1', lista], semillaDe(`${metodo.id}-extra-1`)),
  };

  const q2 = {
    pregunta: `¿<code>${escapeHtml(corto)}</code> modifica el array original?`,
    ...conOpciones(
      muta ? 'Sí, muta el array' : 'No, no lo modifica',
      [
        'Sí, muta el array',
        'No, no lo modifica',
        'Solo si el array está vacío',
        'Solo si contiene strings',
      ],
      semillaDe(`${metodo.id}-extra-2`)
    ),
  };

  const q3 = {
    pregunta: `¿Cuál de estas afirmaciones describe mejor a <code>${escapeHtml(corto)}</code>?`,
    ...conOpciones(
      FAMILIA_TEXTO[familia] ?? FAMILIA_TEXTO.utilidad,
      Object.values(FAMILIA_TEXTO).filter(
        (texto) => texto !== FAMILIA_TEXTO[familia]
      ),
      semillaDe(`${metodo.id}-extra-3`)
    ),
  };

  const q4 = tieneCallback
    ? {
        pregunta: `¿Qué parámetros recibe el callback de <code>${escapeHtml(corto)}</code>?`,
        ...conOpciones(
          '(elemento, indice, array)',
          ['(indice, elemento)', 'Solo el indice', 'El array completo'],
          semillaDe(`${metodo.id}-extra-4`)
        ),
      }
    : {
        pregunta: `¿<code>${escapeHtml(corto)}</code> recibe una función callback?`,
        ...conOpciones(
          'No, recibe valores o índices directamente',
          ['Sí, siempre recibe un callback', 'Solo si el array es numérico', 'Solo con objetos'],
          semillaDe(`${metodo.id}-extra-4`)
        ),
      };

  const q5 = {
    pregunta: `¿<code>${escapeHtml(corto)}</code> se detiene antes de recorrer todo el array?`,
    ...conOpciones(
      corta ? 'Sí, corta el recorrido al cumplirse la condición' : 'No, recorre todo el array',
      [
        'Sí, corta el recorrido al cumplirse la condición',
        'No, recorre todo el array',
        'Solo si el array está ordenado',
        'Solo si el callback devuelve false',
      ],
      semillaDe(`${metodo.id}-extra-5`)
    ),
  };

  const q6 = familia === 'busqueda'
    ? {
        pregunta: `Si ningún elemento cumple la condición, ¿qué devuelve <code>${escapeHtml(corto)}</code>?`,
        ...conOpciones(fallo, ['undefined', 'null', '[]', '-1', 'false', 'true'], semillaDe(`${metodo.id}-extra-6`)),
      }
    : {
        pregunta: `¿Qué tipo de valor devuelve <code>${escapeHtml(corto)}</code>?`,
        ...conOpciones(
          tipoDe(demo.result),
          ['Un array', 'Un booleano', 'Un número', 'Un string', 'undefined'],
          semillaDe(`${metodo.id}-extra-6`)
        ),
      };

  const q7 = {
    pregunta: `¿Qué método se relaciona directamente con <code>${escapeHtml(corto)}</code>?`,
    ...conOpciones(
      otroNombre,
      ['concat()', 'join()', 'split()', 'JSON.parse()'],
      semillaDe(`${metodo.id}-extra-7`)
    ),
  };

  const q8 = {
    pregunta: '¿Cuál es el array de entrada que se usa en el ejemplo?',
    ...conOpciones(lista, ['[]', '[1, 2, 3]', 'undefined'], semillaDe(`${metodo.id}-extra-8`)),
  };

  const q9 = {
    pregunta: `Si el array estuviera vacío, ¿qué devolvería <code>${escapeHtml(corto)}</code>?`,
    ...conOpciones(vacio, ['[]', 'undefined', 'null', '-1'], semillaDe(`${metodo.id}-extra-9`)),
  };

  const q10 = {
    pregunta: 'Si quieres transformar cada elemento en otro valor, ¿qué método usarías?',
    ...conOpciones('map()', ['filter()', 'find()', 'reduce()'], semillaDe(`${metodo.id}-extra-10`)),
  };

  const q11 = {
    pregunta: `¿Cuántos elementos tiene el array del ejemplo?`,
    ...conOpciones(
      String(demo.original.length),
      [String(demo.original.length + 1), String(Math.max(demo.original.length - 1, 0)), '0'],
      semillaDe(`${metodo.id}-extra-11`)
    ),
  };

  const q12 = {
    pregunta: `¿Cuál es el resultado real de ejecutar el código del ejemplo?`,
    ...conOpciones(resultado, ['undefined', 'null', '[]', 'false', '0'], semillaDe(`${metodo.id}-extra-12`)),
  };

  return [q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, q11, q12].map(
    (plantilla, i) => ({
      id: `extra-${metodo.id}-${i + 1}`,
      codigo: demo.demo.code,
      pista: PISTAS[familia] ?? PISTAS.utilidad,
      explicacionOk: `<strong>¡Correcto!</strong> Aplicaste bien el comportamiento de <code>${escapeHtml(
        corto
      )}</code>.`,
      explicacionFail: `<strong>Incorrecto.</strong> La respuesta correcta es <code>${escapeHtml(
        plantilla.opciones[plantilla.correcta]
      )}</code>. Repasa el diagrama y el entorno de prueba.`,
      ...plantilla,
    })
  );
};

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

  const originales = (metodo.quiz ?? []).map((pregunta) => {
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

  if (originales.length >= MINIMO_PREGUNTAS) return originales;

  const faltan = MINIMO_PREGUNTAS - originales.length;
  const extras = preguntasExtra(metodo, familia, demo);
  return [...originales, ...extras.slice(0, faltan)];
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
