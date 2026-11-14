import { useEffect, useMemo, useRef, useState } from 'react';
import { ejecutarDemo, formatearResultado } from './ejecutarMetodo';
import { obtenerFamilia } from './metodosMeta';

const limpiar = (texto = '') =>
  String(texto).replace(/\*\*/g, '').replace(/`/g, '').trim();

const NODOS_POR_FAMILIA = {
  busqueda: [
    'Recorre el array desde el índice inicial.',
    'Evalúa cada elemento con la condición.',
    'Si la condición es true, corta el recorrido.',
    'Devuelve el elemento, el índice o el valor de fallo.',
  ],
  transformacion: [
    'Recibe el array original.',
    'Recorre todos los elementos.',
    'Calcula la transformación, copia o aplanado.',
    'Devuelve un array nuevo (o el resultado calculado).',
  ],
  mutador: [
    'Recibe el array original.',
    'Aplica la operación en el sitio.',
    'Cambian los valores o la longitud.',
    'Devuelve el resultado de la operación.',
  ],
  reduccion: [
    'Recibe el array y el acumulador inicial.',
    'Recorre los elementos en orden.',
    'Actualiza el acumulador en cada paso.',
    'Devuelve el acumulador final.',
  ],
  iterador: [
    'Recibe el array original.',
    'Crea o recorre el iterador.',
    'Produce cada valor, índice o par.',
    'Devuelve el iterador o el resultado del recorrido.',
  ],
  utilidad: [
    'Recibe la entrada.',
    'Calcula el resultado directamente.',
    'No necesita recorrer con callback.',
    'Devuelve el valor calculado.',
  ],
};

const normalizarNodos = (metodo) => {
  const propios = Array.isArray(metodo.comoFunciona) ? metodo.comoFunciona : [];
  if (propios.length > 0) {
    return propios.map((item) =>
      typeof item === 'string'
        ? { texto: limpiar(item) }
        : {
            texto: limpiar(item.texto ?? item.titulo ?? ''),
            nota: item.nota ? limpiar(item.nota) : '',
          }
    );
  }
  return (NODOS_POR_FAMILIA[obtenerFamilia(metodo.id)] ?? NODOS_POR_FAMILIA.utilidad).map(
    (texto) => ({ texto })
  );
};

const faseANodo = (fase, total) => {
  if (fase === 'inicio') return 0;
  if (fase === 'retorno' || fase === 'fin') return Math.max(total - 1, 0);
  if (fase === 'decision') return Math.min(2, total - 1);
  return Math.min(1, total - 1);
};

const ETIQUETA_FAMILIA = {
  busqueda: 'búsqueda',
  transformacion: 'transformación',
  mutador: 'mutación',
  reduccion: 'reducción',
  iterador: 'iteración',
  utilidad: 'utilidad',
};

export default function DiagramaMetodo({ metodo }) {
  const demo = useMemo(() => ejecutarDemo(metodo.id), [metodo.id]);
  const nodos = useMemo(() => normalizarNodos(metodo), [metodo]);

  const [paso, setPaso] = useState(0);
  const [auto, setAuto] = useState(false);
  const [nodoSel, setNodoSel] = useState(null);
  const terminalRef = useRef(null);

  const total = demo.pasos.length;
  const terminado = paso >= total;
  const autoActivo = auto && !terminado;
  const visibles = demo.pasos.slice(0, paso);
  const actual = visibles[visibles.length - 1] ?? null;
  const estados = actual?.estados ?? {};
  const arrayVisible = actual?.array ?? demo.original;
  const salida = actual?.salida ?? null;
  const nodoActivo = nodoSel ?? (actual ? faseANodo(actual.fase, nodos.length) : 0);

  useEffect(() => {
    if (!autoActivo) return;
    const timer = setTimeout(() => setPaso((prev) => prev + 1), 900);
    return () => clearTimeout(timer);
  }, [autoActivo, paso, total]);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [paso]);

  const avanzar = () => {
    setAuto(false);
    setPaso((prev) => Math.min(prev + 1, total));
  };

  const reiniciar = () => {
    setAuto(false);
    setPaso(0);
    setNodoSel(null);
  };

  const alternarAuto = () => {
    if (autoActivo) {
      setAuto(false);
      return;
    }
    if (terminado) setPaso(0);
    setAuto(true);
  };

  const nodo = nodos[nodoActivo] ?? nodos[0] ?? { texto: '' };

  return (
    <section className="sm-diagrama">
      <header className="sm-diagrama__head">
        <div>
          <h3>⚙️ ¿Cómo funciona?</h3>
          <p>
            Diagrama, paso a paso y depuración inteligente de{' '}
            <code>{metodo.titulo}</code>.
          </p>
        </div>
        <span className={`sm-badge sm-badge--${demo.familia}`}>
          {ETIQUETA_FAMILIA[demo.familia] ?? demo.familia}
        </span>
      </header>

      <div className="sm-flow" role="list" aria-label="Pasos del método">
        {nodos.map((item, indice) => {
          const activo = indice === nodoActivo;
          const completado = actual
            ? indice < faseANodo(actual.fase, nodos.length)
            : false;
          return (
            <div className="sm-flow__item" key={`${metodo.id}-nodo-${indice}`} role="listitem">
              <button
                type="button"
                className={`sm-node ${activo ? 'is-active' : ''} ${completado ? 'is-done' : ''}`}
                onClick={() => setNodoSel(indice)}
                aria-pressed={activo}
              >
                <span className="sm-node__num">{indice + 1}</span>
                <span className="sm-node__text">{item.texto}</span>
              </button>
              {indice < nodos.length - 1 && <span className="sm-flow__arrow" aria-hidden="true">→</span>}
            </div>
          );
        })}
      </div>

      <div className="sm-explica">
        <span className="sm-explica__label">Selección resaltada</span>
        <p>{nodo.texto}</p>
        {nodo.nota && <p className="sm-explica__nota">💡 {nodo.nota}</p>}
      </div>

      <div className="sm-demo">
        <div className="sm-demo__main">
          <div className="sm-demo__toolbar">
            <span className="sm-demo__title">Array de prueba</span>
            <span className="sm-progress">
              Paso {paso} / {total}
            </span>
          </div>

          <div className="sm-array" aria-label="Estado del array">
            {arrayVisible.map((valor, indice) => {
              const estado = estados[indice] ?? '';
              return (
                <div
                  key={`${metodo.id}-${indice}`}
                  className={`sm-cell ${estado ? `is-${estado}` : ''}`}
                  title={`Índice ${indice}`}
                >
                  <span className="sm-cell__idx">[{indice}]</span>
                  <span className="sm-cell__val">{String(valor)}</span>
                  {actual?.index === indice && <span className="sm-cell__pointer">▼</span>}
                </div>
              );
            })}
          </div>

          {salida && (
            <div className="sm-salida">
              <span className="sm-salida__label">Salida parcial</span>
              <div className="sm-array sm-array--salida">
                {salida.map((valor, indice) => (
                  <div className="sm-cell is-new" key={`${metodo.id}-salida-${indice}`}>
                    <span className="sm-cell__idx">[{indice}]</span>
                    <span className="sm-cell__val">
                      {typeof valor === 'object' ? JSON.stringify(valor) : String(valor)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="sm-controls">
            <button type="button" className="sm-btn sm-btn--primary" onClick={alternarAuto}>
              {autoActivo ? '⏸ Pausar' : terminado ? '🔁 Repetir' : '▶ Auto'}
            </button>
            <button type="button" className="sm-btn" onClick={avanzar} disabled={autoActivo || terminado}>
              ⏭ Paso
            </button>
            <button type="button" className="sm-btn" onClick={reiniciar}>
              🔄 Reiniciar
            </button>
          </div>

          {terminado && (
            <div className={`sm-resultado ${demo.muta ? 'is-mutador' : ''}`}>
              <span>Resultado final</span>
              <strong>{formatearResultado(metodo.id, demo.result)}</strong>
              {demo.muta && <em>El array original cambió.</em>}
            </div>
          )}
        </div>

        <div className="sm-console" ref={terminalRef} aria-live="polite">
          <div className="sm-console__head">
            <span>Terminal de depuración</span>
            <span>{terminado ? 'Completado' : autoActivo ? 'Automático' : 'Manual'}</span>
          </div>
          {visibles.length === 0 && (
            <div className="sm-log sm-log--system">
              Pulsa “Paso” o “Auto” para ejecutar y ver cada evaluación real.
            </div>
          )}
          {visibles.map((item) => (
            <div key={`${metodo.id}-log-${item.key}`} className={`sm-log sm-log--${item.tipo}`}>
              {item.msg}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
