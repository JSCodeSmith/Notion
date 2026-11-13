import { useState, useEffect, useRef } from 'react';
import CodeBlock from '../CodeBlock/CodeBlock'; // IMPORTAMOS TU COMPONENTE DE CÓDIGO
import './DiagramaFlujoMetodos.css';

const METODOS = {
  all: { 
    label: 'Ver Todo', 
    color: '#8b949e', 
    code: '// Selecciona un método para ver su código\narray.metodo(condicion);' 
  },
  find: { 
    label: 'find()', 
    color: '#58a6ff', 
    code: '// Devuelve el primer elemento que cumple\nconst resultado = array.find(item => item > 10);\n// Retorna: El elemento (o undefined)' 
  },
  filter: { 
    label: 'filter()', 
    color: '#3fb950', 
    code: '// Devuelve un nuevo array con TODOS los que cumplen\nconst resultado = array.filter(item => item > 10);\n// Retorna: Un nuevo array' 
  },
  findindex: { 
    label: 'findIndex()', 
    color: '#d2a8ff', 
    code: '// Devuelve el índice del primer elemento\nconst indice = array.findIndex(item => item > 10);\n// Retorna: Un número (o -1)' 
  }
};

const STEPS = [
  'node-start', 'path-to-iter', 'node-iter', 'path-to-cond', 'node-cond',
  'path-yes', 'node-action', 'path-to-return', 'node-return'
];
const STEP_COUNT = STEPS.length;

export default function DiagramaFlujoMetodos() {
  const [activeTab, setActiveTab] = useState('all');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const timerRef = useRef(null);

  // isPlaying puede quedarse en true al llegar al final; la UI usa isRunning
  // para reflejar el estado real sin tener que hacer setState en un efecto.
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
    if (!isPlaying) return;

    timerRef.current = setInterval(() => {
      setCurrentStep(prev => Math.min(prev + 1, STEP_COUNT));
    }, 800);

    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  const isActive = (elementIds) => {
    if (!isRunning) return true;
    const stepIds = elementIds.split(' ');
    return stepIds.some(id => {
      const index = STEPS.indexOf(id);
      return index !== -1 && index <= currentStep;
    });
  };

  return (
    <div className="df-container">
      <div className="df-header">
        <h2>Diagrama de Flujo Comparativo</h2>
        <p>Observa cómo <b>find()</b>, <b>filter()</b> y <b>findIndex()</b> recorren el array y cuándo se detienen.</p>
      </div>

      <div className="df-controls">
        <div className="df-tabs">
          {Object.entries(METODOS).map(([key, val]) => (
            <button 
              key={key}
              className={`df-btn ${activeTab === key ? `active` : ''}`} 
              onClick={() => handleSelect(key)}
              style={{ '--btn-color': val.color }}
            >
              {val.label}
            </button>
          ))}
        </div>
        
        <button className={`df-play-btn ${isRunning ? 'playing' : ''}`} onClick={playSimulation}>
          {isRunning ? '⏹ Detener' : '▶ Simular Flujo'}
        </button>
      </div>

      {isRunning && (
        <div className="df-progress-bar">
          <div className="df-progress-fill" style={{ width: `${(currentStep / (STEP_COUNT - 1)) * 100}%` }}></div>
          <span className="df-progress-text">Paso {currentStep} de {STEP_COUNT - 1}</span>
        </div>
      )}

      <div className="df-workspace">
        
        {/* COLUMNA IZQUIERDA: DIAGRAMA */}
        <div className="df-diagram">
          {/* Añadimos un contenedor scrollable para pantallas pequeñas */}
          <div className="df-scroll-area">
            <div className="df-canvas">
              <svg>
                <defs>
                  <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
                  </marker>
                </defs>

                {/* FLUJO COMÚN (Centro en X=280) */}
                <path className={`df-path common ${isActive('node-start path-to-iter') ? 'visible' : ''}`} d="M 280 80 L 280 110" markerEnd="url(#arrow)" />
                <path className={`df-path common ${isActive('node-iter path-to-cond') ? 'visible' : ''}`} d="M 280 160 L 280 200" markerEnd="url(#arrow)" />

                {/* FLUJO NO (Izquierda en X=110) */}
                <path className={`df-path no ${isActive('node-cond') ? 'visible' : ''}`} d="M 200 260 L 110 260 L 110 320" markerEnd="url(#arrow)" />
                <path className={`df-path no ${isActive('node-cond') ? 'visible' : ''}`} d="M 110 320 L 110 390" markerEnd="url(#arrow)" />

                {/* FLUJO SÍ (Derecha en X=450) */}
                <path className={`df-path yes ${isActive('node-cond path-yes') ? 'visible' : ''}`} d="M 360 260 L 450 260 L 450 320" markerEnd="url(#arrow)" />

                {/* BUCLE FILTER (Vuelve arriba) */}
                {activeTab === 'filter' && (
                  <path className={`df-path filter ${isActive('node-action path-to-return') ? 'visible' : ''}`} d="M 530 340 L 530 420 L 650 420 L 650 130 L 360 130" markerEnd="url(#arrow)" />
                )}

                {/* ACCIONES FIND Y FINDINDEX (Hacia la derecha) */}
                {(activeTab === 'find' || activeTab === 'findindex') && (
                   <path className={`df-path ${activeTab} ${isActive('node-action path-to-return') ? 'visible' : ''}`} d="M 530 340 L 610 340" markerEnd="url(#arrow)" />
                )}
              </svg>

              {/* NODOS REAJUSTADOS PARA QUE QUEPAN */}
              <div className={`df-node ${isActive('node-start') ? 'active' : ''}`} style={{ left: '280px', top: '45px' }}>
                🏁 Inicio
              </div>
              
              <div className={`df-node ${isActive('node-iter') ? 'active' : ''}`} style={{ left: '280px', top: '135px' }}>
                🔄 Iterar
              </div>

              <div className={`df-node decision ${isActive('node-cond') ? 'active' : ''}`} style={{ left: '280px', top: '260px' }}>
                ¿Cumple?
              </div>

              <div className={`df-label no ${isActive('node-cond') ? 'active' : ''}`} style={{ left: '150px', top: '245px' }}>No</div>
              <div className={`df-label yes ${isActive('node-cond path-yes') ? 'active' : ''}`} style={{ left: '410px', top: '245px' }}>Sí</div>

              <div className={`df-node ${isActive('node-cond') ? 'active' : ''}`} style={{ left: '110px', top: '350px', width: '130px' }}>
                ¿Fin?
              </div>
              <div className={`df-node ${isActive('node-cond') ? 'active' : ''}`} style={{ left: '110px', top: '440px', borderColor: 'var(--red)', width: '130px' }}>
                🚦 Fallo
              </div>

              <div className={`df-node ${activeTab !== 'all' ? activeTab : ''} ${isActive('node-action') ? 'active' : ''}`} style={{ left: '450px', top: '340px' }}>
                {activeTab === 'filter' && <><span style={{ color: 'var(--filter)' }}>filter():</span> Guardar</>}
                {activeTab === 'find' && <><span style={{ color: 'var(--find)' }}>find():</span> Cortocircuito</>}
                {activeTab === 'findindex' && <><span style={{ color: 'var(--findindex)' }}>findIndex():</span> Cortocircuito</>}
                {activeTab === 'all' && <>⚡ Acción</>}
              </div>

              <div className={`df-node ${activeTab !== 'all' ? activeTab : ''} ${isActive('node-action node-return') ? 'active' : ''}`} style={{ left: '680px', top: activeTab === 'filter' ? '135px' : '340px', width: '130px' }}>
                {activeTab === 'filter' ? '📦 Nuevo Array' : activeTab === 'find' ? '✅ Elemento' : activeTab === 'findindex' ? '🔢 Índice' : '🔙 Return'}
              </div>
            </div>
          </div>
        </div>

        {/* COLUMNA DERECHA: CÓDIGO (AHORA CON COLORES) */}
        <div className="df-code-panel">
          <div className="df-code-header">
            <span>💻 Código del Método</span>
            <span className="df-code-lang">JavaScript</span>
          </div>
          <div className="df-code-content">
            <CodeBlock code={METODOS[activeTab].code} />
          </div>
        </div>

      </div>
    </div>
  );
}