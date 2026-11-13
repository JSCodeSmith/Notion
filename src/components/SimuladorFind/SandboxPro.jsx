import { useState, useEffect, useRef } from 'react';
import { instrumentFindCall, escapeHtml, formatValue } from './findTrace';
import './SandboxPro.css';

const EMOJI_POOL = [
  "🍎", "🍌", "🍇", "🍊", "🍓", "🍒", "🥝", "🍍", "🍉", "🍈",
  "🍐", "🍋", "🥥", "🥭", "🍑", "🍆", "🥑", "🌽", "🥕", "🍄",
  "🍕", "🍔", "🍟", "🍿", "🥨", "🥐", "🍩", "🍪", "🎂", "🍫"
];

const DEFAULT_CODE = `const objetivo = emojis[0];
console.log("Buscando:", objetivo);
return emojis.find((emoji) => emoji === objetivo);`;

const INITIAL_ARRAY = ["🍎", "🍌", "🍇", "🍊", "🍓", "🍒", "🥝"];

export default function SandboxPro() {
  const [array, setArray] = useState(INITIAL_ARRAY);
  const [code, setCode] = useState(DEFAULT_CODE);
  const [logs, setLogs] = useState([{ type: 'system', html: 'Sandbox listo. El array ya tiene elementos.' }]);
  
  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState(JSON.stringify(INITIAL_ARRAY));
  const [editorWidth, setEditorWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);
  
  // Modal states
  const [stepModalOpen, setStepModalOpen] = useState(false);
  const [stepTarget, setStepTarget] = useState("");
  
  // Visual Simulation State (La alerta hermosa)
  const [simulationState, setSimulationState] = useState(null); 

  const textareaRef = useRef(null);
  const cmInstance = useRef(null);
  const consoleBodyRef = useRef(null);
  const workspaceRef = useRef(null);

  // Initialize CodeMirror
  useEffect(() => {
    if (!window.CodeMirror) return;
    if (textareaRef.current && !cmInstance.current) {
      cmInstance.current = window.CodeMirror.fromTextArea(textareaRef.current, {
        mode: "javascript", theme: "dracula", lineNumbers: true, indentUnit: 4, lineWrapping: true
      });
      cmInstance.current.setValue(DEFAULT_CODE);
      cmInstance.current.on('change', (cm) => setCode(cm.getValue()));
    }
  }, []);

  // Auto-scroll suave
  useEffect(() => {
    if (consoleBodyRef.current) {
      consoleBodyRef.current.scrollTo({
        top: consoleBodyRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [logs]);

  // Resizer logic
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !workspaceRef.current) return;
      const rect = workspaceRef.current.getBoundingClientRect();
      let percentage = ((e.clientX - rect.left) / rect.width) * 100;
      setEditorWidth(Math.max(20, Math.min(80, percentage)));
    };
    const handleMouseUp = () => setIsResizing(false);

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
    } else {
      document.body.style.cursor = 'default';
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  // --- ARRAY MANAGEMENT ---
  const addEmoji = (emoji) => { if (array.length < 20) setArray([...array, emoji]); };
  const removeEmoji = (index) => setArray(array.filter((_, i) => i !== index));
  const randomizeArray = () => setArray(Array.from({ length: Math.floor(Math.random() * 8) + 3 }, () => EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)]));
  const shuffleArray = () => {
    const copy = [...array];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    setArray(copy);
  };
  const clearArray = () => setArray([]);

  const applyJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (Array.isArray(parsed)) { setArray(parsed.slice(0, 20)); addLog('Array actualizado.', 'system'); }
      else throw new Error("No es un array válido");
    } catch (e) {
      addLog(`<span class="sp-code-error">Error JSON:</span> ${escapeHtml(e.message)}`, 'error');
      setJsonInput(JSON.stringify(array));
    }
  };

  // Drag & Drop
  const handleDragStart = (e, index) => { e.dataTransfer.setData('text/plain', index); e.currentTarget.classList.add('dragging'); };
  const handleDragOver = (e) => { e.preventDefault(); e.currentTarget.classList.add('drag-over'); };
  const handleDragLeave = (e) => { e.currentTarget.classList.remove('drag-over'); };
  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (sourceIndex !== targetIndex) {
      const newArray = [...array];
      const [moved] = newArray.splice(sourceIndex, 1);
      newArray.splice(targetIndex, 0, moved);
      setArray(newArray);
    }
  };
  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
    document.querySelectorAll('.sp-chip.drag-over').forEach(chip => chip.classList.remove('drag-over'));
  };

  // --- LOGGING ---
  const addLog = (html, type = 'info') => setLogs(prev => [...prev, { type, html }]);
  const clearConsole = () => setLogs([]);

  // --- EJECUCIÓN Y DEPURACIÓN INTELIGENTE ---
  const runCode = () => {
    if (array.length === 0) return addLog("El array está vacío.", "error");
    clearConsole();

    const source = cmInstance.current
      ? cmInstance.current.getValue()
      : (textareaRef.current?.value ?? code);

    const outputLogs = [];
    const traceSteps = [];
    const fakeConsole = {
      log: (...args) => outputLogs.push({
        html: args.map(a => `<span class="sp-code-str">${escapeHtml(formatValue(a))}</span>`).join(' '),
        type: 'info'
      }),
      error: (...args) => outputLogs.push({
        html: args.map(a => escapeHtml(formatValue(a))).join(' '),
        type: 'error'
      })
    };

    try {
      // Instrumentamos el callback real: se ejecuta una sola vez, dentro del
      // mismo ámbito que el código del usuario, así puede usar variables como
      // `objetivo` sin que el simulador invente comparaciones.
      const { code: instrumentedCode, instrumented, callbackSources } = instrumentFindCall(source);
      // Si el usuario declara su propio `emojis`, no lo redeclaramos.
      const declaresEmojis = /\b(?:const|let|var)\s+emojis\s*=/.test(source);
      const executableCode = declaresEmojis
        ? instrumentedCode
        : `const emojis = ${JSON.stringify(array)};\n${instrumentedCode}`;
      const result = new Function('console', '__findTrace', executableCode)(
        fakeConsole,
        (value, index, passed) => traceSteps.push({ value, index, passed: Boolean(passed) })
      );

      outputLogs.forEach(log => addLog(log.html, log.type));

      if (instrumented) {
        addLog(
          `<br/><span class="sp-code-comment">// ⚙️ Traza real de ${callbackSources.length === 1 ? 'tu callback' : `tus ${callbackSources.length} callbacks`}...</span>`,
          'system'
        );

        if (traceSteps.length === 0) {
          addLog('<span class="sp-code-comment">// El callback no llegó a ejecutarse.</span>', 'system');
          addLog(
            result === undefined
              ? '<span class="sp-code-error">❌ .find() devuelve: undefined</span>'
              : `<span class="sp-code-success">✅ Resultado del código: ${escapeHtml(formatValue(result))}</span>`,
            result === undefined ? 'error' : 'success'
          );
        } else {
          traceSteps.forEach(({ value, index, passed }) => {
            addLog(
              `<span class="sp-code-index">[${index}]</span> ${escapeHtml(formatValue(value))} → <span class="${passed ? 'sp-code-success' : 'sp-code-error'}">${passed ? 'TRUE' : 'FALSE'}</span>`,
              passed ? 'info' : 'system'
            );
          });

          const match = traceSteps.find(step => step.passed && Object.is(step.value, result));

          if (match) {
            addLog(`<span class="sp-code-success">✅ .find() devuelve: ${escapeHtml(formatValue(result))}</span>`, 'success');
            addLog(`<span class="sp-code-comment">💡 Cortocircuito en el índice [${match.index}].</span>`, 'system');
          } else if (result === undefined) {
            addLog('<span class="sp-code-error">❌ Ningún elemento cumplió la condición.</span>', 'error');
            addLog('<span class="sp-code-error">❌ .find() devuelve: undefined</span>', 'error');
            addLog('<span class="sp-code-comment">💡 Si no encuentra nada, .find() devuelve undefined.</span>', 'system');
          } else {
            addLog(`<span class="sp-code-success">✅ Resultado del código: ${escapeHtml(formatValue(result))}</span>`, 'success');
          }
        }
      } else if (source.includes('.find(')) {
        addLog('<span class="sp-code-comment">// No pude aislar el callback de .find() para la traza.</span>', 'system');
        addLog('<span class="sp-code-comment">// Usa una llamada del tipo emojis.find((emoji) => ...).</span>', 'system');
        addLog(
          result === undefined
            ? '<span class="sp-code-error">❌ Resultado real: undefined</span>'
            : `<span class="sp-code-success">✅ Resultado real: ${escapeHtml(formatValue(result))}</span>`,
          result === undefined ? 'error' : 'success'
        );
      } else if (result !== undefined) {
        addLog(`<span class="sp-code-success">✅ Retorna:</span> <span class="sp-code-str">${escapeHtml(formatValue(result))}</span>`, 'success');
      } else {
        addLog('<span class="sp-code-error">❌ Retorna: undefined</span>', 'error');
      }
    } catch (error) {
      addLog(`<span class="sp-code-error">Error:</span> ${escapeHtml(error.message)}`, 'error');
    }
  };

  // --- PASO A PASO (ALERTA VISUAL) ---
  const startStepByStep = () => {
    if (array.length === 0) return addLog("Agrega elementos al array primero.", "error");
    setStepTarget(array[0]);
    setStepModalOpen(true);
  };

  const executeStepByStep = async () => {
    if (!stepTarget.trim()) return;
    setStepModalOpen(false);

    const target = stepTarget.trim();
    const safeTarget = escapeHtml(target);
    clearConsole();
    addLog(`<span class="sp-code-comment">// 👣 Iniciando simulación visual de .find()</span>`, 'system');

    let found = false;

    for (let i = 0; i < array.length; i++) {
      setSimulationState({ index: i, emoji: array[i], target, status: 'evaluating' });
      await new Promise(r => setTimeout(r, 1000));

      if (array[i] === target) {
        setSimulationState({ index: i, emoji: array[i], target, status: 'success' });
        addLog(`<span class="sp-code-index">[${i}]</span> <span class="sp-code-str">"${escapeHtml(array[i])}"</span> === <span class="sp-code-str">"${safeTarget}"</span> ➔ <span class="sp-code-success">TRUE</span>. Cortocircuito.`, 'success');
        found = true;
        await new Promise(r => setTimeout(r, 2000));
        break;
      } else {
        setSimulationState({ index: i, emoji: array[i], target, status: 'fail' });
        addLog(`<span class="sp-code-index">[${i}]</span> <span class="sp-code-str">"${escapeHtml(array[i])}"</span> === <span class="sp-code-str">"${safeTarget}"</span> ➔ <span class="sp-code-error">FALSE</span>. Continúa.`, 'system');
        await new Promise(r => setTimeout(r, 500));
      }
    }

    if (!found) {
      addLog('<span class="sp-code-error">❌ Fin del array. .find() devuelve undefined.</span>', 'error');
    }

    setSimulationState(null);
  };

  // --- REPL ---
  const handleRepl = (e) => {
    if (e.key === 'Enter') {
      const cmd = e.target.value;
      if (!cmd.trim()) return;
      addLog(`<span class="sp-code-comment">> ${escapeHtml(cmd)}</span>`, 'system');
      try {
        const result = new Function('emojis', `return (${cmd});`)(array);
        addLog(`<span class="sp-code-success">&lt;- ${escapeHtml(formatValue(result))}</span>`, 'success');
      } catch (error) {
        addLog(`<span class="sp-code-error">Error: ${escapeHtml(error.message)}</span>`, 'error');
      }
      e.target.value = '';
    }
  };

  return (
    <div className="sandbox-pro-wrapper">
      <div className="sp-container">
        {/* HEADER */}
        <div className="sp-panel sp-header-panel">
          <div className="sp-header-title">
            <div className="sp-icon-box">🔨</div>
            <div className="sp-header-text">
              <h1>Ejemplos vivos PRO</h1>
              <p>Sandbox interactivo con depuración avanzada.</p>
            </div>
          </div>
        </div>

        {/* BUILDER */}
        <div className="sp-panel sp-builder-section">
          <div className="sp-section-header">
            <span className="sp-section-title">1 · Construye tu array con emojis</span>
            <div className="sp-tools-group">
              <button className="sp-btn-tool" onClick={randomizeArray}>🎲 Aleatorio</button>
              <button className="sp-btn-tool" onClick={shuffleArray}>🔀 Mezclar</button>
              <button className="sp-btn-tool sp-danger" onClick={clearArray}>🗑 Vaciar</button>
            </div>
          </div>

          <div className="sp-emoji-palette">
            {EMOJI_POOL.map(emoji => (
              <span key={emoji} className="sp-palette-item" onClick={() => addEmoji(emoji)}>{emoji}</span>
            ))}
          </div>

          <div className="sp-array-visualizer">
            <div className="sp-array-info">
              <span>TU ARRAY <span className="sp-count">{array.length}</span> / 20</span>
              <button className="sp-btn-tool" onClick={() => setIsJsonOpen(!isJsonOpen)}>✏️ Editar JSON</button>
            </div>
            
            {isJsonOpen && (
              <div className="sp-json-editor">
                <textarea className="sp-json-textarea" value={jsonInput} onChange={(e) => setJsonInput(e.target.value)} onBlur={applyJson} />
              </div>
            )}

            <div className="sp-chips-container">
              {array.length === 0 ? <div className="sp-empty-array">El array está vacío.</div> : 
                array.map((emoji, index) => {
                  const isHighlight = simulationState && simulationState.index === index;
                  let chipClass = 'sp-chip';
                  if (isHighlight) {
                    if (simulationState.status === 'success') chipClass += ' sp-chip-success';
                    else if (simulationState.status === 'fail') chipClass += ' sp-chip-error';
                    else chipClass += ' sp-chip-scanning';
                  }

                  return (
                    <div key={`${emoji}-${index}`} className={chipClass} draggable onDragStart={(e) => handleDragStart(e, index)} onDragEnd={handleDragEnd} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={(e) => handleDrop(e, index)}>
                      <span className="sp-chip-index">[{index}]</span>
                      <span className="sp-chip-emoji">{emoji}</span>
                      <button className="sp-chip-close" onClick={() => removeEmoji(index)}>✕</button>
                    </div>
                  );
                })
              }
            </div>
          </div>
        </div>

        {/* WORKSPACE */}
        <div className="sp-workspace" ref={workspaceRef}>
          <div className="sp-editor-wrapper" style={{ width: `${editorWidth}%` }}>
            <div className="sp-window-header">
              <div className="sp-dots"><div className="sp-dot r"></div><div className="sp-dot y"></div><div className="sp-dot g"></div></div>
              <span>ejemplo.js</span>
            </div>
            <div className="sp-editor-container"><textarea ref={textareaRef} defaultValue={DEFAULT_CODE}></textarea></div>
            <div className="sp-editor-footer">
              <button className="sp-btn-run" onClick={runCode} disabled={!!simulationState}>▶ Ejecutar</button>
              <button className="sp-btn-action" onClick={startStepByStep} disabled={!!simulationState}>👣 Paso a Paso</button>
            </div>
          </div>

          <div className={`sp-resizer ${isResizing ? 'resizing' : ''}`} onMouseDown={(e) => { e.preventDefault(); setIsResizing(true); }} />

          <div className="sp-console-wrapper" style={{ width: `${100 - editorWidth}%` }}>
            <div className="sp-window-header">
              <div className="sp-dots"><div className="sp-dot r"></div><div className="sp-dot y"></div><div className="sp-dot g"></div></div>
              <span>Consola</span>
            </div>
            <div className="sp-console-output" ref={consoleBodyRef}>
              {logs.map((log, i) => (
                <div key={i} className={`sp-log-line sp-log-${log.type}`}>
                  <span className="sp-log-text" dangerouslySetInnerHTML={{ __html: log.html }} />
                </div>
              ))}
            </div>
            <div className="sp-console-repl">
              <div className="sp-repl-prompt">&gt;</div>
              <input type="text" className="sp-repl-input" placeholder="Escribe código aquí..." onKeyDown={handleRepl} disabled={!!simulationState} />
            </div>
          </div>
        </div>
      </div>

      {/* ALERTA 1: INPUT PARA EL PASO A PASO */}
      {stepModalOpen && (
        <div className="sp-modal-overlay">
          <div className="sp-modal">
            <h3>👣 Simulador Paso a Paso</h3>
            <p>¿Qué emoji quieres buscar visualmente en el tablero?</p>
            <input 
              type="text" 
              value={stepTarget}
              onChange={(e) => setStepTarget(e.target.value)}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && executeStepByStep()}
            />
            <div className="sp-modal-actions">
              <button className="sp-btn-action" onClick={() => setStepModalOpen(false)}>Cancelar</button>
              <button className="sp-btn-run" onClick={executeStepByStep}>Iniciar Simulación</button>
            </div>
          </div>
        </div>
      )}

      {/* ALERTA 2: LA ALERTA HERMOSA DE SIMULACIÓN */}
      {simulationState && (
        <div className="sp-simulation-alert">
          <div className={`sp-sim-box sp-sim-${simulationState.status}`}>
            <div className="sp-sim-icon">
              {simulationState.status === 'evaluating' ? '🔍' : simulationState.status === 'success' ? '🎉' : '❌'}
            </div>
            <div className="sp-sim-content">
              <div className="sp-sim-title">
                {simulationState.status === 'evaluating' ? 'Evaluando elemento...' : 
                 simulationState.status === 'success' ? '¡Encontrado!' : 'Descartado'}
              </div>
              <div className="sp-sim-code">
                <span className="sp-sim-idx">[{simulationState.index}]</span> 
                {simulationState.emoji} === {simulationState.target} ?
              </div>
              {simulationState.status === 'success' && (
                <div className="sp-sim-sub">Se detiene la ejecución (Cortocircuito)</div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}