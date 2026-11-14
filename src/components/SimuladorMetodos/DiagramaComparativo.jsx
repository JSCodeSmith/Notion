import { useEffect, useRef, useState } from 'react';
import CodeBlock from '../CodeBlock/CodeBlock';
import '../SimuladorFind/DiagramaFlujoMetodos.css';
import { ejecutarDemo, formatearResultado } from './ejecutarMetodo';
import {
  obtenerDemo,
  obtenerFamilia,
  obtenerNombre,
  obtenerRelacionados,
} from './metodosMeta';

const STEPS = [
  'node-start',
  'path-to-iter',
  'node-iter',
  'path-to-cond',
  'node-cond',
  'path-yes',
  'node-action',
  'path-to-return',
  'node-return',
];
const STEP_COUNT = STEPS.length;

const PALETA = ['#58a6ff', '#3fb950', '#d2a8ff'];
const SLOTS = ['find', 'filter', 'findindex'];

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

const nombreVisible = (id) => {
  const nombre = obtenerNombre(id);
  return nombre.includes('(') || nombre === 'length' ? nombre : `${nombre}()`;
};

const sinPrefijo = (nombre) => nombre.replace('Array.prototype.', '');

const DECISION = {
  busqueda: '¿Cumple?',
  transformacion: '¿Último?',
  mutador: '¿Último?',
  reduccion: '¿Último?',
  iterador: '¿Fin?',
  utilidad: '¿Listo?',
  generico: '¿Cumple?',
};

const ACCION = {
  busqueda: 'Cortocircuito',
  transformacion: 'Transformar',
  mutador: 'Mutar',
  reduccion: 'Acumular',
  iterador: 'Entregar',
  utilidad: 'Calcular',
  generico: 'Acción',
};

const RETORNO = {
  find: '✅ Elemento',
  findlast: '✅ Elemento',
  findindex: '🔢 Índice',
  findlastindex: '🔢 Índice',
  indexof: '🔢 Índice',
  lastindexof: '🔢 Índice',
  some: '✅ Booleano',
  every: '✅ Booleano',
  isarray: '✅ Booleano',
  entries: '📤 Iterador',
  keys: '📤 Iterador',
  values: '📤 Iterador',
  push: '🔢 Longitud',
  unshift: '🔢 Longitud',
  length: '🔢 Número',
  pop: '✅ Elemento',
  shift: '✅ Elemento',
  splice: '✅ Extraídos',
  join: '✅ String',
  at: '✅ Elemento',
  fill: '📦 Array mutado',
  reverse: '📦 Array mutado',
  copywithin: '📦 Array mutado',
  of: '📦 Array nuevo',
  from: '📦 Array nuevo',
};

const retornoDe = (metodoId, familia) => {
  if (RETORNO[metodoId]) return RETORNO[metodoId];
  if (familia === 'transformacion') return '📦 Nuevo Array';
  if (familia === 'reduccion') return '🧮 Acumulado';
  if (familia === 'mutador') return '📦 Array mutado';
  return '🔙 Return';
};

const DESCRIPCION = {
  busqueda: 'Recorre hasta la primera coincidencia.',
  transformacion: 'Recorre todo y construye una salida nueva.',
  mutador: 'Trabaja sobre el mismo array y lo modifica.',
  reduccion: 'Recorre todo acumulando un único valor.',
  iterador: 'Produce una secuencia o efecto por elemento.',
  utilidad: 'Calcula el resultado directamente.',
  generico: 'Selecciona un método para ver su código.',
};

const construirFlujo = (familia, activoId) => {
  const nombre = activoId ? sinPrefijo(obtenerNombre(activoId)) : 'método';
  const fallo = activoId ? FALLO[activoId] ?? 'undefined' : 'valor de fallo';
  const familiaFlujo = familia === 'utilidad' ? 'utilidad' : familia;

  if (familiaFlujo === 'utilidad') {
    return {
      nodos: [
        { id: 'node-start', x: 280, y: 60, text: '🏁 Inicio', step: 'node-start' },
        {
          id: 'node-action',
          x: 280,
          y: 220,
          text: `⚡ ${nombre}: ${ACCION[familia]}`,
          step: 'node-action',
        },
        {
          id: 'node-return',
          x: 280,
          y: 380,
          text: retornoDe(activoId, familia),
          step: 'node-action node-return',
        },
      ],
      paths: [
        {
          id: 'p1',
          cls: 'common',
          step: 'node-start path-to-iter',
          d: 'M 280 95 L 280 175',
        },
        {
          id: 'p2',
          cls: 'slot',
          step: 'node-action path-to-return',
          d: 'M 280 255 L 280 345',
        },
      ],
    };
  }

  const esBusqueda = familiaFlujo === 'busqueda' || familiaFlujo === 'generico';

  const nodos = [
    { id: 'node-start', x: 280, y: 45, text: '🏁 Inicio', step: 'node-start' },
    {
      id: 'node-iter',
      x: 280,
      y: 135,
      text: familiaFlujo === 'iterador' ? '🔄 Recorrer' : '🔄 Iterar',
      step: 'node-iter',
    },
    {
      id: 'node-cond',
      x: 280,
      y: 260,
      text: DECISION[familiaFlujo] ?? DECISION.generico,
      decision: true,
      step: 'node-cond',
    },
    {
      id: 'node-fin',
      x: 110,
      y: 350,
      text: esBusqueda ? '¿Fin?' : '🔄 Siguiente',
      step: 'node-cond',
    },
    {
      id: 'node-fallo',
      x: 110,
      y: 440,
      text: esBusqueda ? `🚦 ${fallo}` : '🔄 Vuelve a iterar',
      red: esBusqueda,
      step: 'node-cond',
    },
    {
      id: 'node-action',
      x: 450,
      y: 340,
      text: `⚡ ${ACCION[familiaFlujo] ?? ACCION.generico}`,
      step: 'node-action',
    },
    {
      id: 'node-return',
      x: 680,
      y: 340,
      text: retornoDe(activoId, familia),
      step: 'node-action node-return',
    },
  ];

  const paths = [
    { id: 'p1', cls: 'common', step: 'node-start path-to-iter', d: 'M 280 80 L 280 110' },
    { id: 'p2', cls: 'common', step: 'node-iter path-to-cond', d: 'M 280 160 L 280 200' },
    { id: 'p3', cls: 'no', step: 'node-cond', d: 'M 200 260 L 110 260 L 110 320' },
    { id: 'p4', cls: 'no', step: 'node-cond', d: 'M 110 320 L 110 390' },
    { id: 'p5', cls: 'yes', step: 'node-cond path-yes', d: 'M 360 260 L 450 260 L 450 320' },
    { id: 'p6', cls: 'slot', step: 'node-action path-to-return', d: 'M 530 340 L 610 340' },
  ];

  if (!esBusqueda) {
    paths.push({
      id: 'p7',
      cls: 'slot',
      step: 'node-fallo node-cond',
      d: 'M 110 480 L 40 480 L 40 135 L 195 135',
    });
  }

  return { nodos, paths };
};

export default function DiagramaComparativo({ metodoId }) {
  const relacionados = obtenerRelacionados(metodoId);
  const [activeTab, setActiveTab] = useState(metodoId);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const timerRef = useRef(null);

  const isRunning = isPlaying && currentStep < STEP_COUNT;

  const handleSelect = (tab) => {
    setActiveTab(tab);
    setIsPlaying(false);
    setCurrentStep(0);
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  const playSimulation = () => {
    if (isRunning) {
      setIsPlaying(false);
      setCurrentStep(0);
      return;
    }
    setIsPlaying(true);
    setCurrentStep(0);
  };

  useEffect(() => {
    if (!isPlaying) return undefined;
    timerRef.current = setInterval(() => {
      setCurrentStep((prev) => Math.min(prev + 1, STEP_COUNT));
    }, 800);
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  const isActive = (elementIds) => {
    if (!isRunning) return true;
    const stepIds = elementIds.split(' ');
    return stepIds.some((id) => {
      const index = STEPS.indexOf(id);
      return index !== -1 && index <= currentStep;
    });
  };

  const activoId = activeTab === 'all' ? null : activeTab;
  const familia = activoId ? obtenerFamilia(activoId) : 'generico';
  const flujo = construirFlujo(familia, activoId);
  const slotActivo = activeTab === 'all' ? '' : SLOTS[relacionados.indexOf(activeTab)];

  const demo = activoId ? ejecutarDemo(activoId) : null;
  const codigo =
    activoId && demo
      ? `// ${DESCRIPCION[familia]}\n${obtenerDemo(activoId).code}\n// Retorna: ${formatearResultado(
          activoId,
          demo.result
        )}`
      : '// Selecciona un método para ver su código\narray.metodo(condicion);';

  const colorDe = (indice) => PALETA[indice] ?? PALETA[0];

  return (
    <div
      className="df-container"
      style={{
        '--find': PALETA[0],
        '--filter': PALETA[1],
        '--findindex': PALETA[2],
      }}
    >
      <div className="df-header">
        <h2>Diagrama de Flujo Comparativo</h2>
        <p>
          Observa cómo {relacionados.map(nombreVisible).join(', ')} recorren el
          array y cuándo se detienen.
        </p>
      </div>

      <div className="df-controls">
        <div className="df-tabs">
          <button
            className={`df-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => handleSelect('all')}
            style={{ '--btn-color': '#8b949e' }}
          >
            Ver Todo
          </button>
          {relacionados.map((id, i) => (
            <button
              key={`${metodoId}-tab-${id}`}
              className={`df-btn ${activeTab === id ? 'active' : ''}`}
              onClick={() => handleSelect(id)}
              style={{ '--btn-color': colorDe(i) }}
            >
              {nombreVisible(id)}
            </button>
          ))}
        </div>

        <button
          className={`df-play-btn ${isRunning ? 'playing' : ''}`}
          onClick={playSimulation}
        >
          {isRunning ? '⏹ Detener' : '▶ Simular Flujo'}
        </button>
      </div>

      {isRunning && (
        <div className="df-progress-bar">
          <div
            className="df-progress-fill"
            style={{ width: `${(currentStep / (STEP_COUNT - 1)) * 100}%` }}
          />
          <span className="df-progress-text">
            Paso {currentStep} de {STEP_COUNT - 1}
          </span>
        </div>
      )}

      <div className="df-workspace">
        <div className="df-diagram">
          <div className="df-scroll-area">
            <div className="df-canvas">
              <svg>
                <defs>
                  <marker
                    id={`flecha-comparativo-${metodoId}`}
                    viewBox="0 0 10 10"
                    refX="9"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                  </marker>
                </defs>

                {flujo.paths.map((p) => (
                  <path
                    key={`${metodoId}-path-${p.id}`}
                    className={`df-path ${
                      p.cls === 'slot' ? slotActivo : p.cls
                    } ${isActive(p.step) ? 'visible' : ''}`}
                    d={p.d}
                    markerEnd={`url(#flecha-comparativo-${metodoId})`}
                  />
                ))}
              </svg>

              {flujo.nodos.map((nodo) => {
                const clases = [
                  'df-node',
                  nodo.decision ? 'decision' : '',
                  slotActivo,
                  isActive(nodo.step) ? 'active' : '',
                ]
                  .filter(Boolean)
                  .join(' ');
                return (
                  <div
                    key={`${metodoId}-node-${nodo.id}`}
                    className={clases}
                    style={{
                      left: `${nodo.x}px`,
                      top: `${nodo.y}px`,
                      borderColor: nodo.red ? 'var(--red)' : undefined,
                      fontSize: nodo.text.length > 22 ? '0.72rem' : undefined,
                    }}
                  >
                    {nodo.text}
                  </div>
                );
              })}

              {flujo.nodos.some((n) => n.decision) && (
                <>
                  <div
                    className={`df-label no ${isActive('node-cond') ? 'active' : ''}`}
                    style={{ left: '150px', top: '245px' }}
                  >
                    No
                  </div>
                  <div
                    className={`df-label yes ${
                      isActive('node-cond path-yes') ? 'active' : ''
                    }`}
                    style={{ left: '410px', top: '245px' }}
                  >
                    Sí
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="df-code-panel">
          <div className="df-code-header">
            <span>💻 Código del Método</span>
            <span className="df-code-lang">JavaScript</span>
          </div>
          <div className="df-code-content">
            <CodeBlock code={codigo} />
          </div>
        </div>
      </div>
    </div>
  );
}
