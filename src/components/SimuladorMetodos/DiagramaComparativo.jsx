import { useMemo } from 'react';
import { ejecutarDemo, formatearResultado } from './ejecutarMetodo';
import {
  CORTA,
  MUTA,
  obtenerFamilia,
  obtenerNombre,
  obtenerRelacionados,
} from './metodosMeta';
import { formatValue } from '../SimuladorFind/findTrace';

const NOMBRE_EXTRA = { split: 'split()' };

const nombreVisible = (id) => {
  const nombre = NOMBRE_EXTRA[id] ?? obtenerNombre(id);
  return nombre.includes('(') || nombre === 'length' ? nombre : `${nombre}()`;
};

const RECORRIDO = {
  busqueda: {
    texto: 'Recorre hasta la primera coincidencia y corta el recorrido.',
    icono: '🎯',
  },
  transformacion: {
    texto: 'Recorre todos los elementos y construye una salida nueva.',
    icono: '🔁',
  },
  mutador: {
    texto: 'Trabaja sobre el mismo array: cambia valores o longitud.',
    icono: '✏️',
  },
  reduccion: {
    texto: 'Recorre todos los elementos acumulando un único valor.',
    icono: '🧮',
  },
  iterador: {
    texto: 'Produce una secuencia o ejecuta un efecto por elemento.',
    icono: '📤',
  },
  utilidad: {
    texto: 'Resuelve el cálculo directamente, sin callback.',
    icono: '⚡',
  },
};

const SALIDA = {
  busqueda: 'elemento, índice o valor de fallo',
  transformacion: 'array nuevo o valor calculado',
  mutador: 'array mutado o dato de la operación',
  reduccion: 'valor acumulado',
  iterador: 'iterador o valor del recorrido',
  utilidad: 'valor calculado',
};

const tipoSalida = (metodoId, resultado) => {
  if (['findindex', 'findlastindex', 'indexof', 'lastindexof'].includes(metodoId)) {
    return 'índice';
  }
  if (['some', 'every', 'isarray'].includes(metodoId)) return 'booleano';
  if (['length', 'push', 'unshift'].includes(metodoId)) return 'número';
  if (['entries', 'keys', 'values'].includes(metodoId)) return 'iterador';
  if (Array.isArray(resultado)) return 'array';
  if (resultado === undefined) return 'undefined';
  if (resultado === null) return 'null';
  return typeof resultado;
};

const etiquetaRecorrido = (familia, corta) => {
  if (corta) return 'cortocircuito';
  if (familia === 'utilidad') return 'sin recorrido';
  if (familia === 'iterador') return 'produce secuencia';
  if (familia === 'mutador') return 'mutación directa';
  return 'recorre todo';
};

const entradaDe = (metodoId, demo) => {
  if (metodoId === 'from') return formatValue(demo.demo.arrayLike ?? 'abc');
  if (metodoId === 'of') return formatValue(demo.demo.items ?? []);
  if (metodoId === 'split') return 'string + separador';
  if (metodoId === 'isarray') return 'un valor cualquiera';
  if (metodoId === 'join') return 'array + separador';
  if (metodoId === 'fill') return 'array + valor + índices';
  if (metodoId === 'copywithin') return 'array + target + start';
  if (metodoId === 'push' || metodoId === 'unshift') return 'array + elementos';
  if (metodoId === 'pop' || metodoId === 'shift') return 'array';
  if (metodoId === 'sort' || metodoId === 'tosorted') return 'array + comparador';
  return 'array original';
};

function Columna({ relacionado, actual }) {
  const demo = useMemo(() => ejecutarDemo(relacionado), [relacionado]);
  const familia = obtenerFamilia(relacionado);
  const recorrido = RECORRIDO[familia] ?? RECORRIDO.utilidad;
  const muta = MUTA.has(relacionado);
  const corta = CORTA.has(relacionado);
  const etiqueta = nombreVisible(relacionado);

  return (
    <article
      className={`sm-compare-col ${relacionado === actual ? 'is-current' : ''}`}
      aria-label={`Flujo de ${etiqueta}`}
    >
      <header className="sm-compare-col__head">
        <h4>{etiqueta}</h4>
        {relacionado === actual && <span className="sm-tag sm-tag--current">estás aquí</span>}
      </header>

      <div className="sm-compare-flow">
        <div className="sm-compare-node sm-compare-node--in">
          <span className="sm-compare-node__label">Entrada</span>
          <p>{entradaDe(relacionado, demo)}</p>
          <code>
            {relacionado === 'split'
              ? formatValue(demo.demo.texto ?? 'a-b-c')
              : `[${demo.original.map(formatValue).join(', ')}]`}
          </code>
        </div>

        <span className="sm-compare-arrow" aria-hidden="true">↓</span>

        <div className={`sm-compare-node sm-compare-node--proceso is-${familia}`}>
          <span className="sm-compare-node__label">
            {recorrido.icono} Recorrido
          </span>
          <p>{recorrido.texto}</p>
        </div>

        <span className="sm-compare-arrow" aria-hidden="true">↓</span>

        <div className="sm-compare-node sm-compare-node--out">
          <span className="sm-compare-node__label">Salida</span>
          <strong>{formatearResultado(relacionado, demo.result)}</strong>
          <small>
            {SALIDA[familia] ?? SALIDA.utilidad} · {tipoSalida(relacionado, demo.result)}
          </small>
        </div>
      </div>

      <div className="sm-compare-tags">
        <span className={`sm-tag ${muta ? 'sm-tag--danger' : 'sm-tag--ok'}`}>
          {muta ? '✏️ muta el array' : '🔒 no muta'}
        </span>
        <span className={`sm-tag ${corta ? 'sm-tag--warn' : 'sm-tag--neutral'}`}>
          {corta
            ? '⚡ cortocircuito'
            : `${familia === 'utilidad' ? '⚡' : familia === 'iterador' ? '📤' : '🔁'} ${etiquetaRecorrido(familia, false)}`}
        </span>
        <span className="sm-tag sm-tag--neutral">
          ↳ devuelve {tipoSalida(relacionado, demo.result)}
        </span>
      </div>

      <details className="sm-compare-code">
        <summary>Ver código</summary>
        <pre>{demo.demo.code}</pre>
      </details>
    </article>
  );
}

export default function DiagramaComparativo({ metodoId }) {
  const relacionados = useMemo(() => obtenerRelacionados(metodoId), [metodoId]);

  return (
    <section className="sm-comparativo">
      <header className="sm-section-head">
        <div>
          <h3>🔀 Diagrama de Flujo Comparativo</h3>
          <p>
            Tres métodos, la misma entrada: mira qué recorre cada uno, si muta
            el array y qué devuelve.
          </p>
        </div>
        <span className="sm-badge sm-badge--comparativo">comparativa</span>
      </header>

      <div className="sm-compare-grid">
        {relacionados.map((relacionado) => (
          <Columna
            key={`${metodoId}-${relacionado}`}
            relacionado={relacionado}
            actual={metodoId}
          />
        ))}
      </div>

      <div className="sm-compare-legend">
        <span><i className="sm-dot sm-dot--ok" /> no muta</span>
        <span><i className="sm-dot sm-dot--danger" /> muta</span>
        <span><i className="sm-dot sm-dot--warn" /> corta el recorrido</span>
        <span><i className="sm-dot sm-dot--neutral" /> recorre completo</span>
      </div>
    </section>
  );
}
