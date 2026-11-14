import { useEffect, useMemo, useRef, useState } from 'react';
import EditorCodigo from './EditorCodigo';
import { ejecutarDemo, formatearResultado } from './ejecutarMetodo';
import { obtenerFamilia } from './metodosMeta';
import { instrumentarMetodo, describirTraza } from './traceMetodo';
import { formatValue } from '../SimuladorFind/findTrace';

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

const nombreJS = (id) => NOMBRE_JS[id] ?? id;

const clonar = (valor) => {
  if (typeof structuredClone === 'function') {
    try {
      return structuredClone(valor);
    } catch {
      /* sigue con JSON */
    }
  }
  try {
    return JSON.parse(JSON.stringify(valor));
  } catch {
    return valor;
  }
};

const parsearArray = (texto) => {
  try {
    const valor = new Function(`return (${texto});`)();
    return Array.isArray(valor) ? valor : null;
  } catch {
    return null;
  }
};

const ETIQUETA_FAMILIA = {
  busqueda: 'Búsqueda y evaluación',
  transformacion: 'Transformación',
  mutador: 'Mutación en el sitio',
  reduccion: 'Reducción',
  iterador: 'Iteración',
  utilidad: 'Utilidad',
};

const TEXTO_FAMILIA = {
  busqueda:
    'Ejecuta la condición real sobre tu array y observa cada evaluación hasta el cortocircuito.',
  transformacion:
    'Ejecuta la transformación real y compara el array de entrada con la salida.',
  mutador:
    'Ejecuta la operación real y comprueba cómo cambia el array original.',
  reduccion:
    'Ejecuta la reducción real y sigue el acumulador paso a paso.',
  iterador:
    'Ejecuta el recorrido real y observa cada valor, índice o par producido.',
  utilidad:
    'Ejecuta el cálculo real y comprueba el valor devuelto.',
};

export default function EntornoPruebaMetodo({ metodo }) {
  const demo = useMemo(() => ejecutarDemo(metodo.id), [metodo.id]);
  const familia = obtenerFamilia(metodo.id);

  const [arrayTexto, setArrayTexto] = useState(() => JSON.stringify(demo.original));
  const [codigo, setCodigo] = useState(demo.demo.code);
  const [nuevoValor, setNuevoValor] = useState('');
  const [logs, setLogs] = useState([]);
  const [resultado, setResultado] = useState(null);
  const [ejecutado, setEjecutado] = useState(false);
  const [corriendo, setCorriendo] = useState(false);
  const [arrayFinal, setArrayFinal] = useState(null);

  const consolaRef = useRef(null);
  const runIdRef = useRef(0);
  const montadoRef = useRef(true);

  const arrayParseado = parsearArray(arrayTexto);

  useEffect(() => {
    montadoRef.current = true;
    return () => {
      montadoRef.current = false;
      runIdRef.current += 1;
    };
  }, []);

  useEffect(() => {
    if (consolaRef.current) {
      consolaRef.current.scrollTop = consolaRef.current.scrollHeight;
    }
  }, [logs]);

  const dormir = (ms) => new Promise((res) => setTimeout(res, ms));

  const agregarLog = (texto, tipo = 'info') => {
    setLogs((prev) => [...prev, { texto, tipo }]);
  };

  const restaurar = () => {
    if (corriendo) return;
    setArrayTexto(JSON.stringify(demo.original));
    setCodigo(demo.demo.code);
    setLogs([]);
    setResultado(null);
    setEjecutado(false);
    setArrayFinal(null);
  };

  const agregarElemento = () => {
    if (corriendo) return;
    if (!nuevoValor.trim()) return;
    const actual = arrayParseado ?? [];
    let valor;
    try {
      valor = new Function(`return (${nuevoValor});`)();
    } catch {
      valor = nuevoValor;
    }
    setArrayTexto(JSON.stringify([...actual, valor]));
    setNuevoValor('');
  };

  const quitarElemento = (indice) => {
    if (corriendo) return;
    const actual = arrayParseado ?? [];
    setArrayTexto(JSON.stringify(actual.filter((_, i) => i !== indice)));
  };

  const ejecutar = async () => {
    if (corriendo) return;

    if (!arrayParseado) {
      setLogs([
        {
          texto: '> El array no es válido. Escribe algo como [1, 2, 3] o ["a", "b"].',
          tipo: 'error',
        },
      ]);
      return;
    }

    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    const vigente = () => runId === runIdRef.current && montadoRef.current;

    setCorriendo(true);
    setEjecutado(false);
    setResultado(null);
    setArrayFinal(null);
    setLogs([{ texto: `> Ejecutando ${metodo.titulo} con tu array...`, tipo: 'info' }]);

    const traza = [];
    const salida = [];
    const arreglo = clonar(arrayParseado);
    const fuente = instrumentarMetodo(
      `${codigo}\n;return typeof resultado !== 'undefined' ? resultado : undefined;`,
      'array',
      nombreJS(metodo.id)
    );

    const consolaFalsa = {
      log: (...args) => salida.push(args.map(formatValue).join(' ')),
      info: (...args) => salida.push(args.map(formatValue).join(' ')),
      warn: (...args) => salida.push(`⚠ ${args.map(formatValue).join(' ')}`),
      error: (...args) => salida.push(`✖ ${args.map(formatValue).join(' ')}`),
    };

    let retorno;
    try {
      const ejecutable = new Function(
        'array',
        'console',
        '__traceMetodo',
        fuente.code
      );
      retorno = ejecutable(arreglo, consolaFalsa, (args, valor) => {
        traza.push({
          texto: describirTraza(metodo.id, args, valor),
          valor,
        });
      });
    } catch (error) {
      setLogs((prev) => [
        ...prev,
        { texto: `❌ Error: ${error.message}`, tipo: 'error' },
      ]);
      setCorriendo(false);
      return;
    }

    if (!fuente.instrumented) {
      agregarLog(
        '> Este método se ejecuta directamente: no necesita un callback sobre `array`.',
        'info'
      );
    }

    if (salida.length > 0) {
      salida.forEach((texto) => agregarLog(`> ${texto}`, 'info'));
    }

    await dormir(380);
    if (!vigente()) return;

    if (traza.length === 0 && fuente.instrumented) {
      agregarLog(
        '> El callback no llegó a ejecutarse. Revisa que el array tenga elementos.',
        'error'
      );
    }

    const pausa = familia === 'busqueda' ? 620 : 430;

    for (const paso of traza) {
      if (!vigente()) return;
      agregarLog(`> ${paso.texto}`, 'eval');
      await dormir(pausa);
      if (!vigente()) return;
    }

    setArrayFinal(clonar(arreglo));
    setResultado(retorno);
    setEjecutado(true);
    agregarLog(`■ Retorna: ${formatearResultado(metodo.id, retorno)}`, 'return');
    if (demo.muta) {
      agregarLog(
        `> Array después: [${arreglo.map(formatValue).join(', ')}]`,
        'info'
      );
      agregarLog('ℹ El array original cambió porque el método muta en el sitio.', 'info');
    }
    setCorriendo(false);
  };

  const esVacio = arrayParseado && arrayParseado.length === 0;

  return (
    <section className="sm-entorno">
      <header className="sm-section-head">
        <div>
          <h3>🧪 Mi Entorno de Prueba</h3>
          <p>{TEXTO_FAMILIA[familia] ?? TEXTO_FAMILIA.utilidad}</p>
        </div>
        <span className={`sm-badge sm-badge--${familia}`}>
          {ETIQUETA_FAMILIA[familia] ?? familia}
        </span>
      </header>

      <div className="sm-entorno__grid">
        <div className="sm-panel">
          <div className="sm-panel__head">
            <span>Array de trabajo</span>
            <span className="sm-panel__meta">
              {arrayParseado ? `${arrayParseado.length} elemento(s)` : 'inválido'}
            </span>
          </div>

          <div className="sm-chips">
            {(arrayParseado ?? []).map((valor, indice) => (
              <button
                key={`${metodo.id}-chip-${indice}`}
                type="button"
                className="sm-chip"
                onClick={() => quitarElemento(indice)}
                title="Quitar este elemento"
              >
                <span className="sm-chip__idx">[{indice}]</span>
                <span>{typeof valor === 'string' ? valor : formatValue(valor)}</span>
                <span className="sm-chip__x">×</span>
              </button>
            ))}
            {esVacio && <span className="sm-empty">Array vacío</span>}
          </div>

          <label className="sm-field">
            <span>Define el array (sintaxis JavaScript)</span>
            <input
              className="sm-input"
              value={arrayTexto}
              onChange={(event) => setArrayTexto(event.target.value)}
              disabled={corriendo}
              spellCheck={false}
              aria-label="Array en sintaxis JavaScript"
            />
          </label>

          <div className="sm-inline">
            <input
              className="sm-input"
              value={nuevoValor}
              onChange={(event) => setNuevoValor(event.target.value)}
              onKeyDown={(event) => event.key === 'Enter' && agregarElemento()}
              placeholder='Añadir valor: 42 o "texto"'
              disabled={corriendo}
            />
            <button
              type="button"
              className="sm-btn"
              onClick={agregarElemento}
              disabled={corriendo}
            >
              ➕ Añadir
            </button>
          </div>

          <p className="sm-help">
            Haz clic en una ficha para quitarla. El código se ejecuta con la
            variable <code>array</code> apuntando a este arreglo.
          </p>
        </div>

        <div className="sm-panel">
          <div className="sm-panel__head">
            <span>Editor · entorno.js</span>
            <button
              type="button"
              className="sm-link-btn"
              onClick={restaurar}
              disabled={corriendo}
            >
              ↺ Restaurar
            </button>
          </div>

          <EditorCodigo
            value={codigo}
            onChange={setCodigo}
            onRun={ejecutar}
            readOnly={corriendo}
            ariaLabel={`Editor de ${metodo.titulo}`}
          />

          <div className="sm-acciones">
            <button
              type="button"
              className="sm-btn sm-btn--primary"
              onClick={ejecutar}
              disabled={corriendo}
            >
              {corriendo ? '⏳ Ejecutando...' : `▶ Ejecutar ${metodo.titulo}`}
            </button>
            <span className="sm-hint">Ctrl / Cmd + Enter</span>
          </div>

          {ejecutado && (
            <div className="sm-resultado-entorno" role="status">
              <div>
                <span>Resultado</span>
                <strong>{formatearResultado(metodo.id, resultado)}</strong>
              </div>
              {Array.isArray(arrayFinal) && (
                <div>
                  <span>{demo.muta ? 'Array después (mutado)' : 'Array después'}</span>
                  <strong>[{arrayFinal.map(formatValue).join(', ')}]</strong>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="sm-console sm-console--ancho" ref={consolaRef} aria-live="polite">
        <div className="sm-console__head">
          <span>Consola de ejecución</span>
          <span>{corriendo ? 'Ejecutando' : ejecutado ? 'Completado' : 'En espera'}</span>
        </div>
        {logs.length === 0 && (
          <div className="sm-log sm-log--system">
            Pulsa “Ejecutar” para lanzar tu código real y ver cada paso.
          </div>
        )}
        {logs.map((linea, indice) => (
          <div
            key={`${metodo.id}-log-entorno-${indice}`}
            className={`sm-log sm-log--${linea.tipo}`}
          >
            {linea.texto}
          </div>
        ))}
      </div>

      {arrayParseado && arrayParseado.length > 0 && (
        <div className="sm-original">
          <span>Array de entrada (se clona en cada ejecución):</span>
          <code>[{arrayParseado.map(formatValue).join(', ')}]</code>
        </div>
      )}
    </section>
  );
}
