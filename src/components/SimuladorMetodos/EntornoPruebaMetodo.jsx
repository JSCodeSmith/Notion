import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../SimuladorFind/LabFind.css';
import { formatValue } from '../SimuladorFind/findTrace';
import { ejecutarDemo, formatearResultado } from './ejecutarMetodo';
import { obtenerDemo, obtenerFamilia, obtenerNombre } from './metodosMeta';
import { instrumentarMetodo, describirTraza } from './traceMetodo';

const NOMBRE_JS = {
  indexof: 'indexOf',
  findindex: 'findIndex',
  findlast: 'findLast',
  findlastindex: 'findLastIndex',
  lastindexof: 'lastIndexOf',
  foreach: 'forEach',
  flatmap: 'flatMap',
  toreversed: 'toReversed',
  tosorted: 'toSorted',
  tospliced: 'toSpliced',
  copywithin: 'copyWithin',
  reduceright: 'reduceRight',
};

const clonar = (valor) => {
  try {
    return JSON.parse(JSON.stringify(valor));
  } catch {
    return valor;
  }
};

const leerValor = (texto) => {
  try {
    return new Function(`return (${texto});`)();
  } catch {
    return texto;
  }
};

const TEXTO = {
  busqueda: 'Ejecuta la condición real y observa cada evaluación hasta el cortocircuito.',
  transformacion: 'Ejecuta la transformación real y compara la entrada con la salida.',
  mutador: 'Ejecuta la operación real y comprueba cómo cambia el array original.',
  reduccion: 'Ejecuta la reducción real y sigue el acumulador paso a paso.',
  iterador: 'Ejecuta el recorrido real y observa cada valor, índice o par producido.',
  utilidad: 'Ejecuta el cálculo real y comprueba el valor devuelto.',
};

export default function EntornoPruebaMetodo({ metodo }) {
  const familia = obtenerFamilia(metodo.id);
  const nombre = obtenerNombre(metodo.id);
  const demo = useMemo(() => ejecutarDemo(metodo.id), [metodo.id]);
  const demoBase = obtenerDemo(metodo.id);

  const [pestana, setPestana] = useState('ejemplo');
  const [items, setItems] = useState(() => clonar(demoBase.array ?? []));
  const [codigo, setCodigo] = useState(demoBase.code ?? '');
  const [entrada, setEntrada] = useState('');
  const [logs, setLogs] = useState([{ texto: '> Esperando ejecución...', tipo: 'info' }]);
  const [resultado, setResultado] = useState(null);
  const [ejecutado, setEjecutado] = useState(false);
  const [corriendo, setCorriendo] = useState(false);
  const [activo, setActivo] = useState(-1);

  const consolaRef = useRef(null);
  const runRef = useRef(0);
  const montadoRef = useRef(true);

  useEffect(() => {
    montadoRef.current = true;
    return () => {
      montadoRef.current = false;
      runRef.current += 1;
    };
  }, []);

  useEffect(() => {
    if (consolaRef.current) {
      consolaRef.current.scrollTop = consolaRef.current.scrollHeight;
    }
  }, [logs]);

  const dormir = (ms) => new Promise((res) => setTimeout(res, ms));

  const agregarLog = (texto, tipo = 'info') =>
    setLogs((prev) => [...prev, { texto, tipo }]);

  const reiniciar = (nuevoArray) => {
    if (corriendo) return;
    setItems(clonar(nuevoArray ?? demoBase.array ?? []));
    setLogs([{ texto: '> Esperando ejecución...', tipo: 'info' }]);
    setResultado(null);
    setEjecutado(false);
    setActivo(-1);
  };

  const cargarPestana = (valor) => {
    if (corriendo) return;
    setPestana(valor);
    if (valor === 'ejemplo') reiniciar(demoBase.array ?? []);
    else if (valor === 'vacio') reiniciar([]);
    else reiniciar([...(demoBase.array ?? []), ...(demoBase.array ?? [])]);
  };

  const agregar = () => {
    if (!entrada.trim() || corriendo) return;
    setItems([...items, leerValor(entrada)]);
    setEntrada('');
    setResultado(null);
    setEjecutado(false);
  };

  const eliminar = (indice) => {
    if (corriendo) return;
    setItems(items.filter((_, i) => i !== indice));
    setResultado(null);
    setEjecutado(false);
  };

  const ejecutar = useCallback(async () => {
    if (corriendo) return;

    if (items.length === 0) {
      setLogs([{ texto: '> El array está vacío. Añade algún elemento.', tipo: 'error' }]);
      return;
    }

    const runId = runRef.current + 1;
    runRef.current = runId;
    const vigente = () => runId === runRef.current && montadoRef.current;

    setCorriendo(true);
    setEjecutado(false);
    setResultado(null);
    setActivo(-1);
    setLogs([{ texto: '> Ejecutando tu código...', tipo: 'info' }]);

    const traza = [];
    const salida = [];
    const arreglo = clonar(items);
    const fuente = instrumentarMetodo(
      `${codigo}\n;return typeof resultado !== 'undefined' ? resultado : undefined;`,
      'array',
      NOMBRE_JS[metodo.id] ?? metodo.id
    );

    const consolaFalsa = {
      log: (...args) => salida.push(args.map(formatValue).join(' ')),
      info: (...args) => salida.push(args.map(formatValue).join(' ')),
      warn: (...args) => salida.push(`⚠ ${args.map(formatValue).join(' ')}`),
      error: (...args) => salida.push(`✖ ${args.map(formatValue).join(' ')}`),
    };

    let retorno;
    try {
      const ejecutable = new Function('array', 'console', '__traceMetodo', fuente.code);
      retorno = ejecutable(arreglo, consolaFalsa, (args, valor) => {
        traza.push({
          texto: describirTraza(metodo.id, args, valor),
          index: typeof args[1] === 'number' ? args[1] : -1,
          valor,
        });
      });
    } catch (error) {
      setLogs((prev) => [...prev, { texto: `❌ Error: ${error.message}`, tipo: 'error' }]);
      setCorriendo(false);
      return;
    }

    if (!fuente.instrumented) {
      agregarLog(
        '> Este método se ejecuta directamente: no necesita un callback sobre `array`.',
        'info'
      );
    }

    salida.forEach((texto) => agregarLog(`> ${texto}`, 'info'));

    await dormir(400);
    if (!vigente()) return;

    if (traza.length === 0 && fuente.instrumented) {
      agregarLog('> El callback no llegó a ejecutarse. Revisa el array.', 'error');
    }

    const pausa = familia === 'busqueda' ? 700 : 500;

    for (const paso of traza) {
      if (!vigente()) return;
      setActivo(paso.index);
      agregarLog(`> ${paso.texto}`, 'eval');
      await dormir(pausa);
      if (!vigente()) return;
    }

    setActivo(-1);
    setItems(clonar(arreglo));
    setResultado(retorno);
    setEjecutado(true);
    agregarLog(`■ Retorna: ${formatearResultado(metodo.id, retorno)}`, 'return');
    if (demo.muta) {
      agregarLog(
        `> Array después: [${arreglo.map(formatValue).join(', ')}]`,
        'info'
      );
    }
    setCorriendo(false);
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [codigo, corriendo, familia, items, metodo.id]);

  const ejecutarRef = useRef(ejecutar);
  useEffect(() => {
    ejecutarRef.current = ejecutar;
  });

  return (
    <div className="lab-find-container">
      <div className="lab-container-inner">
        <div className="lab-panel">
          <div className="lab-panel-header">Entorno de Pruebas</div>

          <div className="lab-tabs" role="tablist" aria-label="Escenario de prueba">
            {[
              ['ejemplo', 'Ejemplo'],
              ['vacio', 'Vacío'],
              ['grande', 'Más datos'],
            ].map(([clave, etiqueta]) => (
              <button
                key={clave}
                type="button"
                role="tab"
                aria-selected={pestana === clave}
                className={`lab-tab ${pestana === clave ? 'active' : ''}`}
                onClick={() => cargarPestana(clave)}
              >
                {etiqueta}
              </button>
            ))}
          </div>

          <div className="lab-builder-content">
            <div className="lab-array-visualizer">
              {items.map((item, index) => {
                let estado = '';
                if (index === activo && corriendo) estado = 'evaluating';
                if (index < activo && corriendo) estado = 'discarded';
                return (
                  <div key={`${metodo.id}-lab-${index}`} className={`lab-array-item ${estado}`}>
                    <span className="idx">[{index}]</span>
                    {formatValue(item)}
                    <div className="lab-item-actions">
                      <button
                        type="button"
                        onClick={() => eliminar(index)}
                        disabled={corriendo}
                        aria-label={`Eliminar ${index}`}
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                );
              })}
              {items.length === 0 && <span className="idx">Array vacío</span>}
            </div>

            <div className="lab-add-controls">
              <input
                className="lab-input-field"
                value={entrada}
                onChange={(e) => setEntrada(e.target.value)}
                placeholder='Añadir valor: 42 o "texto"'
                onKeyDown={(e) => e.key === 'Enter' && agregar()}
                disabled={corriendo}
              />
              <button type="button" className="lab-btn-add" onClick={agregar} disabled={corriendo}>
                Añadir
              </button>
            </div>
          </div>
        </div>

        <div className="lab-panel">
          <div className="lab-panel-header">
            <div className="lab-editor-header">
              <div className="lab-dot red" />
              <div className="lab-dot yellow" />
              <div className="lab-dot green" />
            </div>
            <span>live_{metodo.id}.js</span>
            <button
              type="button"
              className="lab-code-reset"
              onClick={() => {
                if (corriendo) return;
                setCodigo(demoBase.code ?? '');
                setResultado(null);
                setEjecutado(false);
                setLogs([{ texto: '> Esperando ejecución...', tipo: 'info' }]);
              }}
              disabled={corriendo}
              title="Restaurar el código de ejemplo"
            >
              ↺ Restaurar
            </button>
          </div>

          <div className="lab-code-block">
            <textarea
              className="lab-code-editor"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  ejecutarRef.current?.();
                }
              }}
              disabled={corriendo}
              spellCheck={false}
              aria-label={`Editor de ${nombre}`}
            />
            <div className="lab-code-hint">
              Puedes editar el código. Ctrl/Cmd + Enter para ejecutar.
            </div>
          </div>

          {ejecutado && (
            <div className={`lab-result ${demo.muta ? 'fail' : 'success'}`} role="status">
              Resultado: {formatearResultado(metodo.id, resultado)}
              {demo.muta && ' · el array original cambió'}
            </div>
          )}

          <div className="lab-action-bar">
            <button type="button" className="lab-btn-run" onClick={ejecutar} disabled={corriendo}>
              {corriendo ? '⏳ Ejecutando...' : `▶ Ejecutar ${nombre}`}
            </button>
          </div>

          <div className="lab-console" ref={consolaRef} aria-live="polite">
            {logs.length === 0 && (
              <div className="lab-log-line lab-log-info">{TEXTO[familia]}</div>
            )}
            {logs.map((linea, i) => (
              <div key={`${metodo.id}-lab-log-${i}`} className={`lab-log-line lab-log-${linea.tipo}`}>
                {linea.texto}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
