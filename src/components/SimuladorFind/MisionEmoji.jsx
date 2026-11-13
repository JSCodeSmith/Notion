import { useState, useEffect, useRef, useCallback } from 'react';
import { instrumentFindCall, formatValue } from './findTrace';
import './MisionEmoji.css';

const EMOJI_POOL = ["🍊", "🐉", "🍎", "🥝", "🍍", "🍇", "🍉", "🍓", "🍒", "🍑", "🥥", "🥭"];

const INITIAL_EMOJIS = [
  { id: 0, char: "🍊" },
  { id: 1, char: "🐉" },
  { id: 2, char: "🍎" },
  { id: 3, char: "🥝" },
  { id: 4, char: "🍍" }
];

export default function MisionEmoji() {
  const [emojis, setEmojis] = useState(INITIAL_EMOJIS);
  const [targetEmoji, setTargetEmoji] = useState("🐉");
  const [isExecuting, setIsExecuting] = useState(false);
  const [logs, setLogs] = useState([{ text: '⚙️ Misión inicializada.', type: 'system' }]);
  const [activeTab, setActiveTab] = useState('logs');
  const [speed, setSpeed] = useState(500);
  
  // Estados visuales y de control
  const [cardStates, setCardStates] = useState({});
  const [executionResult, setExecutionResult] = useState('undefined');
  
  // Estados para el nuevo input y edición
  const [newEmojiInput, setNewEmojiInput] = useState("");
  const [editingEmoji, setEditingEmoji] = useState(null); // { index, currentChar }
  const [alertMsg, setAlertMsg] = useState(null);
  const [codeDirty, setCodeDirty] = useState(false);

  const editorRef = useRef(null);
  const cmInstance = useRef(null);
  const consoleLogsRef = useRef(null);
  const isProgrammaticChangeRef = useRef(false);
  const runCodeRef = useRef(null);

  const buildEditorCode = useCallback(
    () => `const emojis = ${JSON.stringify(emojis.map(e => e.char))};\n\n// Encuentra el emoji objetivo: "${targetEmoji}"\nreturn emojis.find(e => e === "${targetEmoji}");\n`,
    [emojis, targetEmoji]
  );

  const writeEditorCode = useCallback(() => {
    const code = buildEditorCode();
    if (cmInstance.current) {
      isProgrammaticChangeRef.current = true;
      cmInstance.current.setValue(code);
      isProgrammaticChangeRef.current = false;
    } else if (editorRef.current) {
      editorRef.current.value = code;
    }
  }, [buildEditorCode]);

  const updateEditorCode = useCallback(() => {
    writeEditorCode();
    setCodeDirty(false);
  }, [writeEditorCode]);

  // Inicializar CodeMirror
  useEffect(() => {
    if (!window.CodeMirror) return;
    if (editorRef.current && !cmInstance.current) {
      cmInstance.current = window.CodeMirror.fromTextArea(editorRef.current, {
        mode: "javascript",
        theme: "dracula",
        lineNumbers: true,
        indentUnit: 4,
        lineWrapping: true
      });
      cmInstance.current.on('change', () => {
        if (!isProgrammaticChangeRef.current) setCodeDirty(true);
      });
      cmInstance.current.setOption('extraKeys', {
        'Ctrl-Enter': () => runCodeRef.current?.(),
        'Cmd-Enter': () => runCodeRef.current?.(),
      });
      updateEditorCode();
    }
  }, [updateEditorCode]);

  // Auto-scroll consola
  useEffect(() => {
    if (consoleLogsRef.current) {
      consoleLogsRef.current.scrollTop = consoleLogsRef.current.scrollHeight;
    }
  }, [logs]);

  // Mostrar alerta temporal
  useEffect(() => {
    if (alertMsg) {
      const timer = setTimeout(() => setAlertMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMsg]);

  useEffect(() => {
    // Si el usuario no ha tocado el editor, lo mantenemos sincronizado con el
    // tablero. Si lo tocó, respetamos su código.
    if (!codeDirty) writeEditorCode();
  }, [codeDirty, writeEditorCode]);

  const logSystem = (text) => setLogs(prev => [...prev, { text, type: 'system' }]);
  const logError = (text) => setLogs(prev => [...prev, { text, type: 'error' }]);
  const logSuccess = (text) => setLogs(prev => [...prev, { text, type: 'success' }]);

  // --- GESTIÓN DE ELEMENTOS ---
  const addCustomEmoji = () => {
    if (isExecuting) return;
    
    // Si el usuario no escribió nada, usamos uno aleatorio
    const emojiToAdd = newEmojiInput.trim() || EMOJI_POOL[Math.floor(Math.random() * EMOJI_POOL.length)];
    
    let newId = 1;
    while (emojis.some(e => e.id === newId)) newId++;
    
    setEmojis([...emojis, { id: newId, char: emojiToAdd }]);
    logSystem(`Elemento añadido: ${emojiToAdd} (ID: ${newId})`);
    setNewEmojiInput(""); // Limpiar input
    setAlertMsg(`✅ Añadido: ${emojiToAdd}`);
  };

  const deleteItem = (index, e) => {
    e.stopPropagation();
    if (isExecuting) return;
    const deleted = emojis[index];
    setEmojis(emojis.filter((_, i) => i !== index));
    logSystem(`Elemento eliminado: ${deleted.char}`);
  };

  const handleSaveEdit = () => {
    if (editingEmoji && editingEmoji.newChar.trim() !== "") {
      const newChar = editingEmoji.newChar.trim();
      setEmojis(prev => prev.map((item, i) =>
        i === editingEmoji.index ? { ...item, char: newChar } : item
      ));
      logSystem(`Emoji actualizado a: ${newChar}`);
      setAlertMsg(`✅ Editado a: ${newChar}`);
    }
    setEditingEmoji(null);
  };

  const updateId = (index, newVal) => {
    if (isExecuting) return;
    const val = parseInt(newVal, 10);
    if (!isNaN(val)) {
      setEmojis(prev => prev.map((item, i) =>
        i === index ? { ...item, id: val } : item
      ));
    }
  };

  const shuffleBoard = () => {
    if (isExecuting) return;
    const shuffled = [...emojis];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setEmojis(shuffled.map((item, index) => ({ ...item, id: index })));
    logSystem("Tablero mezclado. Los índices han cambiado.");
  };

  // --- DRAG & DROP ---
  const handleDragStart = (e, index) => {
    if (isExecuting) { e.preventDefault(); return; }
    e.dataTransfer.setData('text/plain', index);
    e.dataTransfer.effectAllowed = 'move';
    
    // Retraso pequeño para que el estilo se aplique correctamente
    setTimeout(() => e.target.classList.add('dragging'), 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Crucial para permitir el drop
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drag-valid');
  };

  const handleDragLeave = (e) => {
    e.currentTarget.classList.remove('drag-valid');
  };

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-valid');
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'));
    
    if (sourceIndex !== targetIndex) {
      const newEmojis = [...emojis];
      const [movedItem] = newEmojis.splice(sourceIndex, 1);
      newEmojis.splice(targetIndex, 0, movedItem);
      setEmojis(newEmojis);
      logSystem(`Elemento movido al índice [${targetIndex}].`);
      setAlertMsg(`🔀 Movido al índice [${targetIndex}]`);
    }
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    // Limpiar cualquier clase de validación que haya quedado suelta
    document.querySelectorAll('.emoji-card').forEach(card => {
      card.classList.remove('drag-valid', 'drag-invalid');
    });
  };

  // --- LÓGICA DE EJECUCIÓN ---
  const runCode = async () => {
    if (isExecuting) return;
    setIsExecuting(true);

    const source = cmInstance.current
      ? cmInstance.current.getValue()
      : (editorRef.current?.value ?? '');

    setLogs([]);
    setActiveTab('logs');
    setCardStates({});

    const currentEmojisArray = emojis.map(e => e.char);
    const traceSteps = [];
    let result = null;

    try {
      const arrayDeclaration = /const\s+emojis\s*=\s*\[[\s\S]*?\];/;
      let codeToExecute = source;

      if (arrayDeclaration.test(source)) {
        codeToExecute = source.replace(
          arrayDeclaration,
          `const emojis = ${JSON.stringify(currentEmojisArray)};`
        );
      } else if (!/\b(?:const|let|var)\s+emojis\s*=/.test(source)) {
        codeToExecute = `const emojis = ${JSON.stringify(currentEmojisArray)};\n${source}`;
      }

      const { code: instrumentedCode, instrumented } = instrumentFindCall(codeToExecute);
      const func = new Function('__findTrace', instrumentedCode);
      result = func((value, index, passed) => {
        traceSteps.push({ value, index, passed: Boolean(passed) });
      });

      if (!instrumented) {
        logSystem('No pude instrumentar .find() para la animación. Revisa que uses emojis.find(...).');
      }
    } catch (error) {
      logError(`Error de Sintaxis: ${error.message}`);
      setIsExecuting(false);
      return;
    }

    logSystem("Iniciando búsqueda con .find()...");
    let found = false;

    for (const step of traceSteps) {
      setCardStates(prev => ({ ...prev, [step.index]: 'scanning' }));
      await sleep(speed);

      if (step.passed) {
        setCardStates(prev => ({ ...prev, [step.index]: 'success' }));
        logSuccess(`¡Encontrado! ${formatValue(step.value)} está en el índice [${step.index}].`);
        found = true;
        break;
      }

      setCardStates(prev => ({ ...prev, [step.index]: 'discarded' }));
      logSystem(`Evaluando índice [${step.index}]: ${formatValue(step.value)} → false. Descartado.`);
    }

    if (!found) logError("No se encontró el emoji objetivo. .find() devuelve undefined.");

    setExecutionResult(result !== undefined ? formatValue(result) : 'undefined');

    setIsExecuting(false);
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  useEffect(() => {
    runCodeRef.current = runCode;
  });

  return (
    <div className="game-container" onDragOver={(e) => e.preventDefault()}>
      
      {/* ALERTA FLOTANTE */}
      {alertMsg && (
        <div className="game-alert">
          {alertMsg}
        </div>
      )}

      {/* HEADER */}
      <div className="header">
        <div className="mission-header">
          <div className="mission-title-area">
            <div className="icon-box">🔍</div>
            <div className="mission-text">
              <h2>Misión #1: La búsqueda del Emoji</h2>
              <p>Gestiona el tablero (añade, edita, arrastra) y encuentra el objetivo con .find().</p>
            </div>
          </div>
          <div className="badges">
            <span className="badge gold">+ 120 XP</span>
          </div>
        </div>
      </div>

      {/* OBJETIVO */}
      <div className="objective-panel">
        <div className="objective-text">
          🎯 Objetivo: Encontrar el <span style={{ fontSize: '20px', marginLeft: '5px' }}>{targetEmoji}</span>
        </div>
        <button className="btn-hint" onClick={() => logSystem(`Pista: Usa .find(e => e === "${targetEmoji}")`)}>💡 Ver pista</button>
      </div>

      {/* TABLERO */}
      <div className="board-section">
        <div className="board-tools">
          <span className="board-title">TABLERO DE EMOJIS</span>
          <div className="tool-actions">
            <div className="add-input-group">
              <input 
                type="text" 
                placeholder="Ej: 🚀" 
                value={newEmojiInput}
                onChange={(e) => setNewEmojiInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addCustomEmoji()}
                maxLength={4}
                className="custom-emoji-input"
              />
              <button className="btn-tool add" onClick={addCustomEmoji}>➕ Añadir</button>
            </div>
            <button className="btn-tool" onClick={shuffleBoard}>🔀 Mezclar</button>
          </div>
        </div>
        <div className="emoji-grid">
          {emojis.map((item, index) => {
            const stateClass = cardStates[index] || '';
            const isSelected = index === emojis.findIndex(e => e.char === targetEmoji);

            return (
              <div 
                key={index}
                className={`emoji-card ${isSelected ? 'selected' : ''} ${stateClass}`}
                draggable={!isExecuting}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                onClick={(e) => {
                  if (e.target.tagName === 'BUTTON' || e.target.tagName === 'INPUT' || isExecuting) return;
                  setTargetEmoji(item.char);
                  logSystem(`Objetivo seleccionado: ${item.char}.`);
                }}
              >
                <button className="btn-delete" onClick={(e) => deleteItem(index, e)} title="Eliminar">✕</button>
                <div 
                  className="emoji-icon" 
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isExecuting) setEditingEmoji({ index, newChar: item.char });
                  }} 
                  title="Clic para editar"
                >
                  {item.char}
                </div>
                <div className="emoji-controls">
                  <span className="emoji-index">[{index}]</span>
                  <input 
                    type="number" 
                    className="emoji-id-input" 
                    value={item.id} 
                    onChange={(e) => updateId(index, e.target.value)} 
                    title="Editar ID"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* EDITOR Y CONSOLA */}
      <div className="workspace">
        <div className="panel editor-panel">
          <div className="panel-header">
            <div className="dots"><div className="dot r"></div><div className="dot y"></div><div className="dot g"></div></div>
            <span>mision.js</span>
            <span style={{ fontSize: '10px', color: codeDirty ? '#eab308' : '#666' }}>
              {codeDirty ? 'código modificado · pulsa 💡 Solución para regenerar' : 'Ctrl + Enter'}
            </span>
          </div>
          <textarea
            ref={editorRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                runCode();
              }
            }}
          ></textarea>
        </div>
        <div className="panel console-panel">
          <div className="panel-header">
            <div className="dots"><div className="dot r"></div><div className="dot y"></div><div className="dot g"></div></div>
            <div className="console-tabs">
              <span className={`console-tab ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>Consola</span>
              <span className={`console-tab ${activeTab === 'debug' ? 'active' : ''}`} onClick={() => setActiveTab('debug')}>Variables</span>
            </div>
          </div>
          
          <div className="console-body" ref={consoleLogsRef} style={{ display: activeTab === 'logs' ? 'block' : 'none' }}>
            {logs.map((log, i) => (
              <div key={i} className={`log-line log-${log.type}`}>
                <span className="log-text">{log.text}</span>
              </div>
            ))}
          </div>
          
          <div className="console-body debug-panel" style={{ display: activeTab === 'debug' ? 'block' : 'none' }}>
            <div className="debug-row"><span className="debug-key">emojis:</span> <span>{JSON.stringify(emojis.map(e => e.char))}</span></div>
            <div className="debug-row"><span className="debug-key">target:</span> <span>"{targetEmoji}"</span></div>
            <div className="debug-row"><span className="debug-key">resultado:</span> <span>{executionResult}</span></div>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="footer-actions">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={runCode} disabled={isExecuting}>
            {isExecuting ? 'Ejecutando...' : '▶ Ejecutar código'}
          </button>
          <button className="btn btn-secondary" onClick={updateEditorCode} disabled={isExecuting}>💡 Solución</button>
          <button className="btn btn-secondary" onClick={() => { setEmojis(INITIAL_EMOJIS); setTargetEmoji("🐉"); setLogs([]); setCodeDirty(false); setExecutionResult('undefined'); setCardStates({}); }} disabled={isExecuting}>🔄</button>
        </div>
        <div className="speed-control">
          <label>Velocidad:</label>
          <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
            <option value={800}>0.5x (Lento)</option>
            <option value={500}>1x (Normal)</option>
            <option value={200}>2x (Rápido)</option>
          </select>
        </div>
      </div>

      {/* MODAL DE EDICIÓN */}
      {editingEmoji && (
        <div className="modal-overlay" onClick={() => setEditingEmoji(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Editar Emoji</h3>
            <p>Cambia el emoji actual:</p>
            <input 
              type="text" 
              value={editingEmoji.newChar}
              onChange={(e) => setEditingEmoji({ ...editingEmoji, newChar: e.target.value })}
              maxLength={4}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
            />
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setEditingEmoji(null)}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleSaveEdit}>Guardar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}