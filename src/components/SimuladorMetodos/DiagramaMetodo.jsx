import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../SimuladorFind/SimuladorFindDiagrama.css';
import { formatValue } from '../SimuladorFind/findTrace';
import { ejecutarDemo, formatearResultado } from './ejecutarMetodo';
import { obtenerDemo, obtenerFamilia, obtenerNombre } from './metodosMeta';

/* ------------------------------------------------------------------
   Etiquetas que cambian según el método
   ------------------------------------------------------------------ */

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

const EXITO = {
  find: 'elemento',
  findlast: 'elemento',
  findindex: 'índice',
  findlastindex: 'índice',
  indexof: 'índice',
  lastindexof: 'índice',
  some: 'true',
  every: 'false',
};

/* ------------------------------------------------------------------
   Flujos por familia: mismos nodos y estética que find()
   ------------------------------------------------------------------ */

const FLUJOS = {
  busqueda: {
    nodos: [
      { id: 'start', x: 300, y: 45, tipo: 'pill', label: 'Inicio: array.{metodo}()' },
      { id: 'iter', x: 300, y: 135, label: 'Iterar', sub: 'idx = {idx}' },
      { id: 'check', x: 300, y: 250, tipo: 'decision', label: '¿idx < length?' },
      { id: 'eval', x: 300, y: 345, label: 'Evaluar condición', sub: '{cond}' },
      { id: 'dec', x: 300, y: 445, tipo: 'decision', label: '¿Es true?' },
      { id: 'fail', x: 110, y: 250, tipo: 'pill ret-fail', label: 'Return {fallo}' },
      { id: 'success', x: 480, y: 445, tipo: 'pill ret-success', label: 'Return {exito}' },
    ],
    paths: [
      { id: 'p1', d: 'M 300 80 L 300 105' },
      { id: 'p2', d: 'M 300 170 L 300 215' },
      { id: 'p3', d: 'M 250 250 L 165 250' },
      { id: 'p4', d: 'M 300 292 L 300 318' },
      { id: 'p5', d: 'M 300 380 L 300 412' },
      { id: 'p6', d: 'M 350 445 L 410 445' },
      { id: 'p7', d: 'M 250 445 L 55 445 L 55 135 L 245 135' },
    ],
  },

  transformacion: {
    nodos: [
      { id: 'start', x: 300, y: 45, tipo: 'pill', label: 'Inicio: array.{metodo}()' },
      { id: 'iter', x: 300, y: 135, label: 'Iterar', sub: 'idx = {idx}' },
      { id: 'check', x: 300, y: 250, tipo: 'decision', label: '¿idx < length?' },
      { id: 'eval', x: 300, y: 345, label: 'Aplicar callback / copiar', sub: '{cond}' },
      { id: 'dec', x: 300, y: 445, tipo: 'decision', label: '¿Es el último?' },
      { id: 'success', x: 480, y: 445, tipo: 'pill ret-success', label: 'Return salida' },
    ],
    paths: [
      { id: 'p1', d: 'M 300 80 L 300 105' },
      { id: 'p2', d: 'M 300 170 L 300 215' },
      { id: 'p4', d: 'M 300 292 L 300 318' },
      { id: 'p5', d: 'M 300 380 L 300 412' },
      { id: 'p6', d: 'M 350 445 L 410 445' },
      { id: 'p7', d: 'M 250 445 L 55 445 L 55 135 L 245 135' },
      { id: 'p3', d: 'M 250 250 L 55 250 L 55 135 L 245 135' },
    ],
  },

  mutador: {
    nodos: [
      { id: 'start', x: 300, y: 70, tipo: 'pill', label: 'Inicio: array.{metodo}()' },
      { id: 'op', x: 300, y: 200, label: 'Operar en el sitio', sub: '{cond}' },
      { id: 'upd', x: 300, y: 320, label: 'Actualizar el array', sub: 'length' },
      { id: 'success', x: 300, y: 440, tipo: 'pill ret-success', label: 'Return {exito}' },
    ],
    paths: [
      { id: 'p1', d: 'M 300 105 L 300 165' },
      { id: 'p4', d: 'M 300 235 L 300 285' },
      { id: 'p5', d: 'M 300 355 L 300 405' },
    ],
  },

  reduccion: {
    nodos: [
      { id: 'start', x: 300, y: 45, tipo: 'pill', label: 'Inicio: array.{metodo}()' },
      { id: 'init', x: 300, y: 130, label: 'Acumulador inicial', sub: '{valorInicial}' },
      { id: 'iter', x: 300, y: 220, label: 'Iterar', sub: 'idx = {idx}' },
      { id: 'eval', x: 300, y: 320, label: 'acumulador = callback', sub: '{cond}' },
      { id: 'dec', x: 300, y: 425, tipo: 'decision', label: '¿Es el último?' },
      { id: 'success', x: 480, y: 425, tipo: 'pill ret-success', label: 'Return acumulador' },
    ],
    paths: [
      { id: 'p1', d: 'M 300 80 L 300 100' },
      { id: 'p2', d: 'M 300 160 L 300 190' },
      { id: 'p4', d: 'M 300 255 L 300 288' },
      { id: 'p5', d: 'M 300 355 L 300 392' },
      { id: 'p6', d: 'M 350 425 L 410 425' },
      { id: 'p7', d: 'M 250 425 L 55 425 L 55 220 L 245 220' },
    ],
  },

  iterador: {
    nodos: [
      { id: 'start', x: 300, y: 45, tipo: 'pill', label: 'Inicio: array.{metodo}()' },
      { id: 'init', x: 300, y: 140, label: 'Crear iterador' },
      { id: 'check', x: 300, y: 250, tipo: 'decision', label: '¿done?' },
      { id: 'eval', x: 300, y: 350, label: 'Entregar value', sub: '{cond}' },
      { id: 'success', x: 480, y: 250, tipo: 'pill ret-success', label: 'Fin del iterador' },
    ],
    paths: [
      { id: 'p1', d: 'M 300 80 L 300 110' },
      { id: 'p2', d: 'M 300 165 L 300 215' },
      { id: 'p4', d: 'M 300 292 L 300 320' },
      { id: 'p3', d: 'M 350 250 L 415 250' },
      { id: 'p5', d: 'M 300 380 L 300 405 L 55 405 L 55 250 L 245 250' },
    ],
  },

  utilidad: {
    nodos: [
      { id: 'start', x: 300, y: 70, tipo: 'pill', label: 'Inicio: array.{metodo}()' },
      { id: 'op', x: 300, y: 210, label: 'Calcular', sub: '{cond}' },
      { id: 'success', x: 300, y: 340, tipo: 'pill ret-success', label: 'Return {exito}' },
    ],
    paths: [
      { id: 'p1', d: 'M 300 105 L 300 175' },
      { id: 'p4', d: 'M 300 245 L 300 305' },
    ],
  },
};

const PARAMETRO = {
  busqueda: { etiqueta: (demo) => `Condición (n ${demo.op ?? '>'} ?)`, tipo: 'number' },
  transformacion: null,
  mutador: null,
  reduccion: null,
  iterador: null,
  utilidad: null,
};

const parsearArray = (texto) => {
  try {
    const valor = new Function(`return (${texto});`)();
    return Array.isArray(valor) ? valor : null;
  } catch {
    return null;
  }
};

/* ------------------------------------------------------------------
   Guion de la animación a partir de la traza real
   ------------------------------------------------------------------ */

const construirGuion = (metodoId, demo, familia, resultado) => {
  const guion = [];

  for (const paso of demo.pasos) {
    const base = {
      log: paso.msg,
      fase: paso.fase,
      tipo: paso.tipo,
      index: paso.index,
      salida: paso.salida,
    };

    if (paso.fase === 'inicio') {
      guion.push({ ...base, nodo: 'start', path: 'p1' });
      continue;
    }

    if (familia === 'busqueda') {
      if (paso.fase === 'evaluar') {
        guion.push({ ...base, nodo: 'iter', path: 'p2', log: '' });
        guion.push({ ...base, nodo: 'check', path: paso.tipo === 'success' ? 'p4' : 'p3', log: '' });
        guion.push({ ...base, nodo: 'eval', path: 'p5' });
        guion.push({ ...base, nodo: 'dec', path: paso.tipo === 'success' ? 'p6' : 'p7', log: '' });
      } else if (paso.fase === 'retorno') {
        guion.push({
          ...base,
          nodo: paso.tipo === 'return' && resultado !== undefined ? 'success' : 'success',
          path: 'p6',
        });
      }
      continue;
    }

    if (familia === 'transformacion') {
      if (paso.fase === 'iterar' || paso.fase === 'accion' || paso.fase === 'mutar') {
        guion.push({ ...base, nodo: 'iter', path: 'p2', log: '' });
        guion.push({ ...base, nodo: 'eval', path: 'p4' });
        guion.push({ ...base, nodo: 'dec', path: 'p7', log: '' });
      } else if (paso.fase === 'retorno') {
        guion.push({ ...base, nodo: 'success', path: 'p6' });
      }
      continue;
    }

    if (familia === 'mutador') {
      if (paso.fase === 'mutar') {
        guion.push({ ...base, nodo: 'op', path: 'p1' });
        guion.push({ ...base, nodo: 'upd', path: 'p4', log: '' });
      } else if (paso.fase === 'retorno') {
        guion.push({ ...base, nodo: 'success', path: 'p5' });
      } else if (paso.fase === 'iterar' || paso.fase === 'accion') {
        guion.push({ ...base, nodo: 'op', path: 'p1' });
      }
      continue;
    }

    if (familia === 'reduccion') {
      if (paso.fase === 'iterar' && paso.index === -1) {
        guion.push({ ...base, nodo: 'init', path: 'p1' });
      } else if (paso.fase === 'iterar' || paso.fase === 'accion') {
        guion.push({ ...base, nodo: 'iter', path: 'p2', log: '' });
        guion.push({ ...base, nodo: 'eval', path: 'p4' });
        guion.push({ ...base, nodo: 'dec', path: 'p7', log: '' });
      } else if (paso.fase === 'retorno') {
        guion.push({ ...base, nodo: 'success', path: 'p6' });
      }
      continue;
    }

    if (familia === 'iterador') {
      if (paso.fase === 'iterar') {
        guion.push({ ...base, nodo: 'init', path: 'p1' });
      } else if (paso.fase === 'accion') {
        guion.push({ ...base, nodo: 'check', path: 'p4', log: '' });
        guion.push({ ...base, nodo: 'eval', path: 'p5' });
      } else if (paso.fase === 'retorno') {
        guion.push({ ...base, nodo: 'success', path: 'p3' });
      }
      continue;
    }

    // utilidad
    if (paso.fase === 'accion') {
      guion.push({ ...base, nodo: 'op', path: 'p1' });
    } else if (paso.fase === 'retorno') {
      guion.push({ ...base, nodo: 'success', path: 'p4' });
    }
  }

  return guion;
};

const claseLog = (tipo) => {
  if (tipo === 'success') return 'log-success';
  if (tipo === 'error') return 'log-error';
  if (tipo === 'return') return 'log-return';
  if (tipo === 'eval') return 'log-eval';
  return 'log-info';
};

export default function DiagramaMetodo({ metodo }) {
  const familia = obtenerFamilia(metodo.id);
  const nombre = obtenerNombre(metodo.id);
  const demoBase = obtenerDemo(metodo.id);
  const flujo = FLUJOS[familia] ?? FLUJOS.utilidad;
  const paramConfig = PARAMETRO[familia];
  const fallo = FALLO[metodo.id] ?? 'undefined';
  const exito = EXITO[metodo.id] ?? 'valor';

  const [arrayTexto, setArrayTexto] = useState(() => JSON.stringify(demoBase.array ?? []));
  const [limite, setLimite] = useState(() => String(demoBase.limite ?? ''));
  const [config, setConfig] = useState(() => ({
    arreglo: demoBase.array ?? [],
    limite: demoBase.limite,
  }));

  const plan = useMemo(() => {
    const opciones = { arreglo: config.arreglo };
    if (config.limite !== undefined && config.limite !== null && config.limite !== '') {
      opciones.limite = config.limite;
    }
    let ejecucion;
    try {
      ejecucion = ejecutarDemo(metodo.id, opciones);
    } catch {
      ejecucion = ejecutarDemo(metodo.id);
    }
    return {
      ...ejecucion,
      guion: construirGuion(metodo.id, ejecucion, familia, ejecucion.result),
    };
  }, [config, familia, metodo.id]);

  const total = plan.guion.length;
  const [indice, setIndice] = useState(0);
  const [auto, setAuto] = useState(false);
  const [logs, setLogs] = useState([
    { texto: '> Flujo reiniciado. Listo para ejecutar.', clase: 'log-info' },
  ]);

  const consolaRef = useRef(null);
  const terminado = indice >= total;
  const enMarcha = auto && !terminado;
  const actual = plan.guion[Math.min(indice, total) - 1] ?? null;

  useEffect(() => {
    if (consolaRef.current) {
      consolaRef.current.scrollTop = consolaRef.current.scrollHeight;
    }
  }, [logs]);

  const reiniciar = useCallback(() => {
    const arreglo = parsearArray(arrayTexto);
    setAuto(false);
    setIndice(0);
    if (!arreglo) {
      setLogs([{ texto: '❌ El array no es válido. Usa algo como [1, 2, 3].', clase: 'log-error' }]);
      return;
    }
    setConfig({
      arreglo,
      limite: paramConfig && limite !== '' ? limite : undefined,
    });
    setLogs([{ texto: '> Flujo reiniciado. Listo para ejecutar.', clase: 'log-info' }]);
  }, [arrayTexto, limite, paramConfig]);

  const avanzar = useCallback(() => {
    setIndice((prev) => {
      if (prev >= total) return prev;
      const siguiente = plan.guion[prev];
      if (siguiente?.log) {
        setLogs((logsPrev) => [
          ...logsPrev,
          { texto: siguiente.log, clase: claseLog(siguiente.tipo) },
        ]);
      }
      return prev + 1;
    });
  }, [plan.guion, total]);

  useEffect(() => {
    if (!enMarcha) return;
    const timer = setTimeout(avanzar, 1000);
    return () => clearTimeout(timer);
  }, [enMarcha, avanzar, indice]);

  useEffect(() => {
    if (terminado && auto) setAuto(false);
  }, [terminado, auto]);

  const alternarAuto = () => {
    if (enMarcha) {
      setAuto(false);
      return;
    }
    if (terminado) {
      reiniciar();
      setAuto(true);
      return;
    }
    setAuto(true);
  };

  const pasoManual = () => {
    setAuto(false);
    avanzar();
  };

  const activo = (id) => (actual?.nodo === id ? 'active' : '');
  const camino = (id) => {
    if (actual?.path === id) return 'active flowing';
    const posActual = flujo.paths.findIndex((p) => p.id === actual?.path);
    const pos = flujo.paths.findIndex((p) => p.id === id);
    return pos !== -1 && posActual !== -1 && pos < posActual ? 'active flowing' : '';
  };

  const pasoTeoria = (() => {
    const pasos = Math.max(metodo.comoFunciona?.length ?? 0, 0);
    if (pasos === 0) return -1;
    if (total === 0) return -1;
    return Math.min(Math.floor((indice / total) * pasos), pasos - 1);
  })();

  const etiqueta = (texto) =>
    texto
      .replace('{metodo}', nombre.replace('Array.prototype.', '').replace('()', ''))
      .replace('{cond}', demoBase.cond ?? '—')
      .replace('{fallo}', fallo)
      .replace('{exito}', exito)
      .replace('{valorInicial}', formatValue(demoBase.initial ?? 0));

  const subTexto = (nodo) => {
    if (nodo.sub === 'idx = {idx}') {
      return `idx = ${actual?.index >= 0 ? actual.index : 0}`;
    }
    return etiqueta(nodo.sub);
  };

  return (
    <div className="sim-diagrama-find">
      <div className="left-panel">
        <div className="title">⚙️ ¿Cómo funciona?</div>

        <div className="theory-list">
          {(metodo.comoFunciona ?? []).slice(0, 6).map((texto, i) => (
            <div
              key={`${metodo.id}-teoria-${i}`}
              className={`theory-step ${i === pasoTeoria ? 'active' : ''}`}
            >
              <div className="num">{i + 1}</div>
              <p>{texto}</p>
            </div>
          ))}
        </div>

        <div className="input-group">
          <label>Array de prueba</label>
          <input
            type="text"
            className="input-field"
            value={arrayTexto}
            onChange={(e) => setArrayTexto(e.target.value)}
            disabled={enMarcha || (indice > 0 && !terminado)}
          />
        </div>

        {paramConfig && (
          <div className="input-group">
            <label>{paramConfig.etiqueta(demoBase)}</label>
            <input
              type="number"
              className="input-field"
              value={limite}
              onChange={(e) => setLimite(e.target.value)}
              disabled={enMarcha || (indice > 0 && !terminado)}
            />
          </div>
        )}

        <div className="btn-group">
          <div className="btn-row">
            <button type="button" className="btn btn-run" onClick={alternarAuto}>
              {enMarcha ? '⏸ Pausar' : '▶ Auto'}
            </button>
            <button
              type="button"
              className="btn btn-step"
              onClick={pasoManual}
              disabled={enMarcha || terminado}
            >
              ⏭ Paso
            </button>
          </div>
          <button type="button" className="btn btn-reset" onClick={reiniciar}>
            🔄 Reiniciar
          </button>
        </div>

        <div
          className={`result-box ${
            terminado ? (plan.finalArray && plan.muta ? 'success' : 'success') : ''
          }`}
        >
          <div className="label">Resultado Final</div>
          <div className="value">
            {terminado ? formatearResultado(metodo.id, plan.result) : 'Esperando...'}
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="diagram-wrapper">
          <div className="canvas">
            <svg viewBox="0 0 600 500" preserveAspectRatio="none">
              <defs>
                <marker
                  id={`flecha-${metodo.id}`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#3f3f46" />
                </marker>
              </defs>
              {flujo.paths.map((p) => (
                <path
                  key={`${metodo.id}-path-${p.id}`}
                  className={camino(p.id)}
                  d={p.d}
                  markerEnd={`url(#flecha-${metodo.id})`}
                />
              ))}
            </svg>

            {flujo.nodos.map((nodo) => {
              const x = (nodo.x / 600) * 100;
              const y = (nodo.y / 500) * 100;
              const clases = [
                'node',
                nodo.tipo === 'pill' ? 'pill' : '',
                nodo.tipo === 'decision' ? 'decision' : '',
                nodo.tipo === 'pill ret-fail' ? 'pill ret-fail' : '',
                nodo.tipo === 'pill ret-success' ? 'pill ret-success' : '',
                activo(nodo.id),
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <div
                  key={`${metodo.id}-nodo-${nodo.id}`}
                  className={clases}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {nodo.tipo === 'decision' ? (
                    <span>{etiqueta(nodo.label)}</span>
                  ) : (
                    <>
                      {etiqueta(nodo.label)}
                      {nodo.sub && <div className="sub">{subTexto(nodo)}</div>}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="console-wrapper">
          <div className="console-header">
            <span>Terminal de Depuración</span>
            <span style={{ color: 'var(--text-muted)' }}>
              ● {enMarcha ? 'Auto' : terminado ? 'Completado' : 'Listo'}
            </span>
          </div>
          <div className="console-body" ref={consolaRef}>
            {logs.map((linea, i) => (
              <div key={`${metodo.id}-log-${i}`} className={`log-line ${linea.clase}`}>
                {linea.texto}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
