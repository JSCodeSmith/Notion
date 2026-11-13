import { useState, useEffect, useRef, useCallback } from 'react';
import './SimuladorFindInteractivo.css';

const USUARIOS_INICIALES = [
  { id: 1, nombre: "Josue", emoji: "👨‍💻" },
  { id: 2, nombre: "Ana", emoji: "👩‍🔬" },
  { id: 3, nombre: "Carlos", emoji: "👨‍🚀" },
  { id: 4, nombre: "María", emoji: "👩‍🎨" },
  { id: 5, nombre: "Pedro", emoji: "👨‍🍳" }
];

const evaluateCondition = (val, target, op) => {
  switch (op) {
    case '===': return val === target;
    case '!==': return val !== target;
    case '>': return val > target;
    case '<': return val < target;
    case '>=': return val >= target;
    case '<=': return val <= target;
    default: return false;
  }
};

export default function SimuladorFindInteractivo() {
  const [usuarios, setUsuarios] = useState(USUARIOS_INICIALES);
  const [targetId, setTargetId] = useState(10);
  const [operator, setOperator] = useState('<');
  const [speed, setSpeed] = useState(1000);
  
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [notFound, setNotFound] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [historySize, setHistorySize] = useState(0);

  const [logs, setLogs] = useState([{ text: '> Esperando ejecución...', type: 'log-info' }]);
  const [editingId, setEditingId] = useState(null);

  const historyRef = useRef([]);
  const draggedIndexRef = useRef(null);
  const terminalRef = useRef(null);

  // Auto-scroll de la terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = useCallback((text, type = 'log-info') => {
    setLogs(prev => [...prev, { text, type }]);
  }, []);

  const resetAlgorithm = () => {
    setIsPlaying(false);
    setCurrentIndex(-1);
    setFoundIndex(-1);
    setNotFound(false);
    setHistorySize(0);
    historyRef.current = [];
    setLogs([{ text: '> Esperando ejecución...', type: 'log-info' }]);
    setEditingId(null);
  };

  const saveState = useCallback((snapshot = {}) => {
    historyRef.current.push({
      index: snapshot.index ?? currentIndex,
      found: snapshot.found ?? foundIndex,
      usuarios: JSON.parse(JSON.stringify(usuarios))
    });
    setHistorySize(historyRef.current.length);
  }, [currentIndex, foundIndex, usuarios]);

  const stepForward = useCallback(() => {
    if (foundIndex !== -1 || notFound) {
      setIsPlaying(false);
      return;
    }

    let index = currentIndex;

    if (index === -1) {
      saveState({ index: -1, found: -1 });
      index = 0;
      setCurrentIndex(0);
      addLog(`<b>Iniciando .find():</b> Buscando valor ${operator} ${targetId}.`, 'log-info');
    }

    if (index >= usuarios.length) {
      addLog('⚠️ Fin del array. Ningún elemento cumple la condición. Retorna <b>undefined</b>.', 'log-error');
      setIsPlaying(false);
      setNotFound(true);
      return;
    }

    const user = usuarios[index];
    const isMatch = evaluateCondition(user.id, targetId, operator);

    if (isMatch) {
      saveState({ index });
      setFoundIndex(index);
      addLog(`✅ <b>¡Coincidencia encontrada!</b> En el índice [${index}], el valor ${user.id} ${operator} ${targetId} es TRUE.`, 'log-success');
      addLog('💡 <b>¿Por qué se detiene aquí?</b> El método .find() devuelve el <b>primer</b> elemento que cumple la condición. Al encontrar un TRUE, rompe el bucle inmediatamente.', 'log-highlight');
      addLog(`Resultado final: <code>{ id: ${user.id}, nombre: "${user.nombre}" }</code>`, 'log-info');
      setIsPlaying(false);
    } else {
      addLog(`❌ Índice [${index}]: El valor ${user.id} ${operator} ${targetId} es FALSE. Se descarta y continúa.`, 'log-error');
      saveState({ index });
      setCurrentIndex(index + 1);
    }
  }, [addLog, currentIndex, foundIndex, notFound, operator, saveState, targetId, usuarios]);

  // Manejo de la reproducción automática
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setTimeout(stepForward, speed);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, speed, stepForward]);

  const stepBack = () => {
    if (historyRef.current.length === 0) return;
    setIsPlaying(false);
    const prev = historyRef.current.pop();
    setCurrentIndex(prev.index);
    setFoundIndex(prev.found);
    setNotFound(false);
    setUsuarios(prev.usuarios);
    setHistorySize(historyRef.current.length);
    addLog('⏪ Retrocediendo...', 'log-info');
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (foundIndex !== -1 || notFound || currentIndex >= usuarios.length) resetAlgorithm();
      setIsPlaying(true);
    }
  };

  // --- Drag & Drop ---
  const handleDragStart = (e, index) => {
    draggedIndexRef.current = index;
    e.dataTransfer.effectAllowed = 'move';
    // Opcional: añadir clase visual
    e.target.style.opacity = '0.5';
  };

  const handleDragEnd = (e) => {
    e.target.style.opacity = '1';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIndex) => {
    e.preventDefault();
    const dragIndex = draggedIndexRef.current;
    if (dragIndex !== null && dragIndex !== dropIndex) {
      const newUsuarios = [...usuarios];
      const [movedItem] = newUsuarios.splice(dragIndex, 1);
      newUsuarios.splice(dropIndex, 0, movedItem);
      setUsuarios(newUsuarios);
      addLog(`Array reordenado (movido de índice ${dragIndex} a ${dropIndex}).`, 'log-highlight');
      resetAlgorithm();
    }
  };

  // --- Edición y Eliminación ---
  const handleDelete = (index) => {
    const newUsuarios = usuarios.filter((_, i) => i !== index);
    setUsuarios(newUsuarios);
    addLog(`Elemento eliminado del índice ${index}.`, 'log-error');
    resetAlgorithm();
  };

  const handleEditChange = (index, newId) => {
    setUsuarios(prev => prev.map((user, i) =>
      i === index ? { ...user, id: parseInt(newId, 10) || 0 } : user
    ));

    if (foundIndex !== -1 || notFound || currentIndex !== -1) {
      setCurrentIndex(-1);
      setFoundIndex(-1);
      setNotFound(false);
      historyRef.current = [];
      setHistorySize(0);
    }
  };

  return (
    <div className="sfi-container">
      {/* 1. Bloque de Código Dinámico */}
      <div className="sfi-code-panel">
        <div className="sfi-code-line">
          <span className="sfi-line-number">1</span>
          <span className="sfi-syntax-comment">// Busca el primer usuario con el ID indicado</span>
        </div>
        <div className="sfi-code-line">
          <span className="sfi-line-number">2</span>
          <span>
            <span className="sfi-syntax-keyword">const</span> resultado = usuarios.<span className="sfi-syntax-func">find</span>(u =&gt; u.id <span className="sfi-syntax-op">{operator}</span> <span className="sfi-syntax-val">{targetId}</span>);
          </span>
        </div>
      </div>

      {/* 2. Barra de Controles */}
      <div className="sfi-controls-bar">
        <div className="sfi-input-group">
          <label>Buscar:</label>
          <input 
            type="number" 
            value={targetId} 
            onChange={(e) => { setTargetId(Number(e.target.value)); resetAlgorithm(); }} 
          />
        </div>
        <div className="sfi-input-group">
          <select value={operator} onChange={(e) => { setOperator(e.target.value); resetAlgorithm(); }}>
            <option value="===">===</option>
            <option value="<">&lt;</option>
            <option value=">">&gt;</option>
            <option value="<=">&lt;=</option>
            <option value=">=">&gt;=</option>
            <option value="!==">!==</option>
          </select>
        </div>

        <div style={{ flexGrow: 1 }}></div>

        <div className="sfi-input-group">
          <label>Velocidad:</label>
          <select value={speed} onChange={(e) => setSpeed(Number(e.target.value))}>
            <option value={2000}>0.5x</option>
            <option value={1000}>1x</option>
            <option value={500}>2x</option>
          </select>
        </div>

        <button className="sfi-btn" onClick={resetAlgorithm} type="button">🔄 Reset</button>
        <button className="sfi-btn" onClick={stepBack} disabled={historySize === 0 || isPlaying} type="button">⏪ Atrás</button>
        <button className="sfi-btn sfi-primary" onClick={() => { setIsPlaying(false); stepForward(); }} disabled={isPlaying} type="button">⏭️ Paso a Paso</button>
        <button className="sfi-btn sfi-primary" onClick={togglePlay} type="button">
          {isPlaying ? '⏸️ Pausar' : '▶️ Ejecutar'}
        </button>
      </div>

      {/* 3. Grid de Tarjetas */}
      <div className="sfi-array-panel">
        {usuarios.map((user, index) => {
          let stateClass = '';
          if (index === foundIndex) stateClass = 'sfi-found';
          else if (index === currentIndex && !notFound) stateClass = 'sfi-evaluating';
          else if (currentIndex > index || notFound) stateClass = 'sfi-discarded';

          return (
            <div 
              key={`${user.id}-${index}`} 
              className={`sfi-array-item ${stateClass}`}
              draggable
              onDragStart={(e) => handleDragStart(e, index)}
              onDragEnd={handleDragEnd}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="sfi-index-badge">[{index}]</div>
              <div className="sfi-emoji-display">{user.emoji}</div>
              
              {editingId === index ? (
                <input 
                  type="number" 
                  className="sfi-edit-input"
                  value={user.id}
                  onChange={(e) => handleEditChange(index, e.target.value)}
                  onBlur={() => setEditingId(null)}
                  onKeyDown={(e) => e.key === 'Enter' && setEditingId(null)}
                  autoFocus
                />
              ) : (
                <div className="sfi-value-display">ID: {user.id}</div>
              )}

              <div className="sfi-item-actions">
                <button className="sfi-btn-edit" onClick={() => setEditingId(index)}>✏️ Edit</button>
                <button className="sfi-btn-delete" onClick={() => handleDelete(index)}>🗑️</button>
              </div>
            </div>
          );
        })}
      </div>

      {(foundIndex !== -1 || notFound) && (
        <div className={`sfi-result ${foundIndex !== -1 ? 'success' : 'fail'}`} role="status">
          {foundIndex !== -1
            ? `✅ find() devolvió el usuario del índice [${foundIndex}].`
            : '❌ find() recorrió todo el array y devolvió undefined.'}
        </div>
      )}

      {/* 4. Terminal */}
      <div className="sfi-terminal-panel">
        <div className="sfi-terminal-header">TERMINAL DE SALIDA & DEPURACIÓN</div>
        <div className="sfi-terminal-body" ref={terminalRef}>
          {logs.map((log, i) => (
            <div key={i} className={`sfi-log-line ${log.type}`} dangerouslySetInnerHTML={{ __html: log.text }} />
          ))}
        </div>
      </div>
    </div>
  );
}