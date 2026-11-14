import { useState, useEffect, useRef } from 'react';
import { instrumentFindCall, formatValue } from './findTrace';
import './LabFind.css';

const PRESETS = {
  numbers: {
    data: [10, 20, 30, 40, 50],
    codeStr: `const resultado = array.find(n => n > 25);`,
    placeholder: "Añadir número..."
  },
  users: {
    data: [
      { id: 1, nombre: "Josue" }, { id: 2, nombre: "Ana" }, { id: 3, nombre: "Carlos" }, { id: 4, nombre: "María" }
    ],
    codeStr: `const resultado = array.find(u => u.id === 3);`,
    placeholder: "Nombre del usuario..."
  },
  strings: {
    data: ["manzana", "plátano", "cereza", "sandía"],
    codeStr: `const resultado = array.find(str => str.length >= 7);`,
    placeholder: "Añadir palabra..."
  }
};

const CODE_INICIAL = Object.fromEntries(
  Object.entries(PRESETS).map(([key, preset]) => [key, preset.codeStr])
);

const LOG_INICIAL = [{ text: '> Esperando ejecución...', type: 'info' }];

export default function LabFind() {
  const [preset, setPreset] = useState('numbers');
  const [arrayData, setArrayData] = useState(PRESETS.numbers.data);
  const [codes, setCodes] = useState(CODE_INICIAL);
  const [isAnimating, setIsAnimating] = useState(false);
  const [logs, setLogs] = useState(LOG_INICIAL);
  const [newItem, setNewItem] = useState('');

  const [activeIndex, setActiveIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [notFound, setNotFound] = useState(false);
  const [resultText, setResultText] = useState(null);

  const consoleRef = useRef(null);
  const runIdRef = useRef(0);
  const isMountedRef = useRef(true);

  const editorRef = useRef(null);
  const cmInstance = useRef(null);
  const isProgrammaticRef = useRef(false);
  const presetRef = useRef(preset);
  const runFindRef = useRef(null);

  const code = codes[preset];

  // Mantiene la referencia del preset actual para el listener de CodeMirror.
  useEffect(() => {
    presetRef.current = preset;
  }, [preset]);

  // Inicializa CodeMirror si está disponible; si no, queda el textarea normal.
  useEffect(() => {
    if (!window.CodeMirror || !editorRef.current || cmInstance.current) return;

    const cm = window.CodeMirror.fromTextArea(editorRef.current, {
      mode: 'javascript',
      theme: 'dracula',
      lineNumbers: true,
      indentUnit: 2,
      tabSize: 2,
      lineWrapping: true
    });

    cmInstance.current = cm;
    cm.setValue(PRESETS.numbers.codeStr);
    cm.setOption('extraKeys', {
      'Ctrl-Enter': () => runFindRef.current?.(),
      'Cmd-Enter': () => runFindRef.current?.()
    });
    cm.on('change', () => {
      if (isProgrammaticRef.current) return;
      setCodes(prev => ({ ...prev, [presetRef.current]: cm.getValue() }));
    });

    return () => {
      cm.toTextArea();
      cmInstance.current = null;
    };
  }, []);

  // Sincroniza el editor cuando cambias de preset o restauras el código.
  useEffect(() => {
    const cm = cmInstance.current;
    if (!cm || cm.getValue() === code) return;

    isProgrammaticRef.current = true;
    cm.setValue(code);
    isProgrammaticRef.current = false;
  }, [code]);

  // El textarea oculto no controla CodeMirror: hay que bloquearlo aparte.
  useEffect(() => {
    if (cmInstance.current) {
      cmInstance.current.setOption('readOnly', isAnimating);
    }
  }, [isAnimating]);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [logs]);

  // Cancela cualquier animación pendiente si el componente se desmonta.
  useEffect(() => {
    // StrictMode monta, desmonta y vuelve a montar: hay que restaurar el flag.
    isMountedRef.current = true;

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
    setResultText(null);
  };

  const updateCode = (value) => {
    setCodes(prev => ({ ...prev, [preset]: value }));
  };

  const restoreCode = () => {
    if (isAnimating) return;
    updateCode(PRESETS[preset].codeStr);
    resetVisualState();
    setLogs(LOG_INICIAL);
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
      if (!Number.isFinite(val)) return;
      setArrayData([...arrayData, val]);
    } else if (preset === 'users') {
      const newId = arrayData.length > 0 ? Math.max(...arrayData.map(u => u.id)) + 1 : 1;
      setArrayData([...arrayData, { id: newId, nombre: newItem.trim() }]);
    } else {
      setArrayData([...arrayData, newItem.trim()]);
    }

    setNewItem('');
    resetVisualState();
    setLogs(LOG_INICIAL);
  };

  const deleteItem = (index) => {
    if (isAnimating) return;
    setArrayData(arrayData.filter((_, i) => i !== index));
    resetVisualState();
    setLogs(LOG_INICIAL);
  };

  const runFind = async () => {
    if (isAnimating) return;

    if (arrayData.length === 0) {
      setLogs([{ text: '> El array está vacío. Añade algún elemento.', type: 'error' }]);
      return;
    }

    const source = codes[preset];
    const { code: instrumentedCode, instrumented } = instrumentFindCall(source, 'array');

    if (!instrumented) {
      setLogs([
        { text: '> No encontré una llamada array.find(...) en el editor.', type: 'error' },
        { text: '> Ejemplo: array.find(n => n > 25)', type: 'info' }
      ]);
      return;
    }

    const runId = runIdRef.current + 1;
    runIdRef.current = runId;
    const isStale = () => runId !== runIdRef.current || !isMountedRef.current;

    setIsAnimating(true);
    resetVisualState();
    setLogs([{ text: '> Ejecutando tu código...', type: 'info' }]);

    const traceSteps = [];
    const output = [];

    try {
      const fakeConsole = {
        log: (...args) => output.push(args.map(formatValue).join(' '))
      };

      // Ejecutamos el código real del editor. El callback se ejecuta de verdad
      // y __findTrace recibe lo que devolvió en cada índice.
      const runnable = new Function('array', 'console', '__findTrace', instrumentedCode);
      runnable(arrayData, fakeConsole, (value, index, passed) => {
        traceSteps.push({ value, index, passed: Boolean(passed) });
      });
    } catch (error) {
      setLogs(prev => [...prev, { text: `❌ Error: ${error.message}`, type: 'error' }]);
      setIsAnimating(false);
      return;
    }

    if (output.length > 0) {
      setLogs(prev => [...prev, ...output.map(text => ({ text: `> ${text}`, type: 'info' }))]);
    }

    await sleep(500);
    if (isStale()) return;

    if (traceSteps.length === 0) {
      setLogs(prev => [...prev, {
        text: '> El callback no llegó a ejecutarse. Revisa que el array tenga elementos.',
        type: 'error'
      }]);
    }

    let match = null;

    for (const step of traceSteps) {
      setActiveIndex(step.index);
      setLogs(prev => [...prev, {
        text: `> Evaluando [${step.index}]: ${formatValue(step.value)}`,
        type: 'eval'
      }]);
      await sleep(750);
      if (isStale()) return;

      if (step.passed) {
        match = step;
        setFoundIndex(step.index);
        setLogs(prev => [...prev, {
          text: `✅ El callback devolvió true en [${step.index}]. Cortocircuito.`,
          type: 'success'
        }]);
        break;
      }

      setLogs(prev => [...prev, {
        text: '❌ El callback devolvió false. Continuando...',
        type: 'error'
      }]);
      await sleep(300);
      if (isStale()) return;
    }

    if (match) {
      setResultText(`✅ Retorna: ${formatValue(match.value)}`);
      setLogs(prev => [...prev, {
        text: `■ Retorna: ${formatValue(match.value)}`,
        type: 'return'
      }]);
    } else {
      setNotFound(true);
      setResultText('❌ Retorna: undefined');
      setLogs(prev => [...prev, { text: '■ Retorna: undefined', type: 'return' }]);
    }

    setIsAnimating(false);
  };

  const currentPreset = PRESETS[preset];

  useEffect(() => {
    runFindRef.current = runFind;
  });

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
            <span>live_find.js</span>
            <button
              type="button"
              className="lab-code-reset"
              onClick={restoreCode}
              disabled={isAnimating}
              title="Restaurar el código de ejemplo"
            >
              ↺ Restaurar
            </button>
          </div>

          <div className="lab-code-block">
            <textarea
              ref={editorRef}
              className="lab-code-editor"
              value={code}
              onChange={e => updateCode(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                  e.preventDefault();
                  runFind();
                }
              }}
              disabled={isAnimating}
              spellCheck={false}
              aria-label="Editor de código de find"
            />
            <div className="lab-code-hint">Puedes editar el código. Ctrl/Cmd + Enter para ejecutar.</div>
          </div>

          {resultText && (
            <div className={`lab-result ${foundIndex !== -1 ? 'success' : 'fail'}`} role="status">
              {resultText}
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
