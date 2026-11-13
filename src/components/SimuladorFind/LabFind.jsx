import { useState, useEffect, useRef } from 'react';
import './LabFind.css';

const PRESETS = {
  numbers: {
    data: [10, 20, 30, 40, 50],
    condition: (item) => item > 25,
    conditionStr: "n > 25",
    codeStr: `const resultado = array.find(n => n > 25);`,
    placeholder: "Añadir número..."
  },
  users: {
    data: [
      { id: 1, nombre: "Josue" }, { id: 2, nombre: "Ana" }, { id: 3, nombre: "Carlos" }, { id: 4, nombre: "María" }
    ],
    condition: (item) => item.id === 3,
    conditionStr: "u.id === 3",
    codeStr: `const resultado = array.find(u => u.id === 3);`,
    placeholder: "Nombre del usuario..."
  },
  strings: {
    data: ["manzana", "plátano", "cereza", "sandía"],
    condition: (item) => item.length >= 7,
    conditionStr: "str.length >= 7",
    codeStr: `const resultado = array.find(str => str.length >= 7);`,
    placeholder: "Añadir palabra..."
  }
};

const LOG_INICIAL = [{ text: '> Esperando ejecución...', type: 'info' }];

export default function LabFind() {
  const [preset, setPreset] = useState('numbers');
  const [arrayData, setArrayData] = useState(PRESETS.numbers.data);
  const [isAnimating, setIsAnimating] = useState(false);
  const [logs, setLogs] = useState(LOG_INICIAL);
  const [newItem, setNewItem] = useState('');

  const [activeIndex, setActiveIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [notFound, setNotFound] = useState(false);

  const consoleRef = useRef(null);
  const runIdRef = useRef(0);
  const isMountedRef = useRef(true);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [logs]);

  // Cancela cualquier animación pendiente si el componente se desmonta.
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      runIdRef.current += 1;
    };
  }, []);

  const sleep = (ms) => new Promise(res => setTimeout(res, ms));

  const resetVisualState = () => {
    setActiveIndex(-1);
    setFoundIndex(-1);
    setNotFound(false);
  };

  const loadPreset = (name) => {
    if (isAnimating) return;
    runIdRef.current += 1;
    setPreset(name);
    setArrayData(JSON.parse(JSON.stringify(PRESETS[name].data)));
    setLogs(LOG_INICIAL);
    resetVisualState();
  };

  const addItem = () => {
    if (!newItem.trim() || isAnimating) return;

    if (preset === 'numbers') {
      const val = Number(newItem);
      if (Number.isFinite(val)) setArrayData([...arrayData, val]);
    } else if (preset === 'users') {
      const newId = arrayData.length > 0 ? Math.max(...arrayData.map(u => u.id)) + 1 : 1;
      setArrayData([...arrayData, { id: newId, nombre: newItem.trim() }]);
    } else {
      setArrayData([...arrayData, newItem.trim()]);
    }

    setNewItem('');
    resetVisualState();
  };

  const deleteItem = (index) => {
    if (isAnimating) return;
    setArrayData(arrayData.filter((_, i) => i !== index));
    resetVisualState();
  };

  const runFind = async () => {
    if (isAnimating) return;

    if (arrayData.length === 0) {
      setLogs([{ text: '> El array está vacío. Añade algún elemento.', type: 'error' }]);
      return;
    }

    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    const isStale = () => runId !== runIdRef.current || !isMountedRef.current;

    setIsAnimating(true);
    resetVisualState();
    setLogs([{ text: '> Compilando y ejecutando...', type: 'info' }]);
    await sleep(600);
    if (isStale()) return;

    const { condition, conditionStr } = PRESETS[preset];
    let found = false;

    for (let i = 0; i < arrayData.length; i++) {
      setActiveIndex(i);
      setLogs(prev => [...prev, { text: `> Evaluando [${i}]: ${JSON.stringify(arrayData[i])}`, type: 'eval' }]);
      await sleep(800);
      if (isStale()) return;

      if (condition(arrayData[i])) {
        setFoundIndex(i);
        setLogs(prev => [
          ...prev,
          { text: `✅ Condición cumplida (${conditionStr}). Cortocircuito.`, type: 'success' },
          { text: `■ Retorna: ${JSON.stringify(arrayData[i])}`, type: 'return' }
        ]);
        found = true;
        break;
      }

      setLogs(prev => [...prev, { text: '❌ Condición fallida. Continuando...', type: 'error' }]);
      await sleep(400);
      if (isStale()) return;
    }

    if (isStale()) return;

    if (!found) {
      setNotFound(true);
      setLogs(prev => [...prev, { text: '❌ Fin del array. Retorna: undefined', type: 'error' }]);
    }

    setIsAnimating(false);
  };

  const currentPreset = PRESETS[preset];

  return (
    <div className="lab-find-container">
      <div className="lab-container-inner">
        <div className="lab-panel">
          <div className="lab-panel-header">Entorno de Pruebas</div>
          <div className="lab-tabs" role="tablist" aria-label="Tipo de array">
            {Object.keys(PRESETS).map(p => (
              <button
                key={p}
                type="button"
                role="tab"
                aria-selected={preset === p}
                className={`lab-tab ${preset === p ? 'active' : ''}`}
                onClick={() => loadPreset(p)}
              >
                {p === 'numbers' ? 'Números' : p === 'users' ? 'Usuarios' : 'Palabras'}
              </button>
            ))}
          </div>
          <div className="lab-builder-content">
            <div className="lab-array-visualizer">
              {arrayData.map((item, index) => {
                let stateClass = '';
                if (index === foundIndex) stateClass = 'success';
                else if (index === activeIndex && isAnimating) stateClass = 'evaluating';
                else if (index < activeIndex || notFound) stateClass = 'discarded';

                return (
                  <div key={index} className={`lab-array-item ${stateClass}`}>
                    <span className="idx">[{index}]</span>
                    {preset === 'numbers' ? item : preset === 'users' ? `${item.id}: ${item.nombre}` : `"${item}"`}
                    <div className="lab-item-actions">
                      <button type="button" onClick={() => deleteItem(index)} disabled={isAnimating} aria-label={`Eliminar ${index}`}>❌</button>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="lab-add-controls">
              <input
                className="lab-input-field"
                value={newItem}
                onChange={e => setNewItem(e.target.value)}
                placeholder={currentPreset.placeholder}
                onKeyDown={e => e.key === 'Enter' && addItem()}
                disabled={isAnimating}
              />
              <button type="button" className="lab-btn-add" onClick={addItem} disabled={isAnimating}>Añadir</button>
            </div>
          </div>
        </div>

        <div className="lab-panel">
          <div className="lab-panel-header">
            <div className="lab-editor-header"><div className="lab-dot red"></div><div className="lab-dot yellow"></div><div className="lab-dot green"></div></div>
            <span>live_find.js</span><span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Sandbox</span>
          </div>
          <div className="lab-code-block">
            <div className="lab-code-line"><span className="lab-line-num">1</span><span style={{ color: '#8b949e' }}>// Buscando en el array...</span></div>
            <div className="lab-code-line"><span className="lab-line-num">2</span><span dangerouslySetInnerHTML={{ __html: currentPreset.codeStr.replace('const', '<span style="color:#ff7b72">const</span>').replace('array', '<span style="color:#79c0ff">array</span>').replace('find', '<span style="color:#d2a8ff">find</span>') }} /></div>
          </div>

          {(foundIndex !== -1 || notFound) && (
            <div className={`lab-result ${foundIndex !== -1 ? 'success' : 'fail'}`} role="status">
              {foundIndex !== -1
                ? `✅ Retorna: ${JSON.stringify(arrayData[foundIndex])}`
                : '❌ Retorna: undefined'}
            </div>
          )}

          <div className="lab-action-bar">
            <button type="button" className="lab-btn-run" onClick={runFind} disabled={isAnimating}>▶ Ejecutar find()</button>
          </div>
          <div className="lab-console" ref={consoleRef} aria-live="polite">
            {logs.map((l, i) => <div key={i} className={`lab-log-line lab-log-${l.type}`}>{l.text}</div>)}
          </div>
        </div>
      </div>
    </div>
  );
}
