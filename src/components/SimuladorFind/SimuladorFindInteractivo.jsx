import { useState, useEffect, useRef } from 'react';
import './SimuladorFindInteractivo.css';

const USUARIOS_INICIALES = [
  { id: 1, nombre: "Josue", emoji: "👨‍💻" },
  { id: 2, nombre: "Ana", emoji: "👩‍🔬" },
  { id: 3, nombre: "Carlos", emoji: "👨‍🚀" },
  { id: 4, nombre: "María", emoji: "👩‍🎨" },
  { id: 5, nombre: "Pedro", emoji: "👨‍🍳" }
];

export default function SimuladorFindInteractivo() {
  const [usuarios, setUsuarios] = useState(USUARIOS_INICIALES);
  const [targetId, setTargetId] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [foundIndex, setFoundIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1000);
  const [logs, setLogs] = useState([{ msg: 'Esperando ejecución ...', type: 'info' }]);
  
  const historyRef = useRef([]);
  const timerRef = useRef(null);
  const terminalRef = useRef(null);
  const draggedIdxRef = useRef(null);

  // Auto-scroll en la terminal
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  // Lógica de reproducción automática
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        stepForward();
      }, speed);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed, currentIndex, foundIndex, usuarios, targetId]);

  const log = (msg, type = 'info') => {
    setLogs(prev => [...prev, { msg, type }]);
  };

  const resetAlgorithm = () => {
    setIsPlaying(false);
    clearInterval(timerRef.current);
    setCurrentIndex(-1);
    setFoundIndex(-1);
    historyRef.current = [];
    setLogs([{ msg: 'Esperando ejecución ...', type: 'info' }]);
  };

  const stepForward = () => {
    if (foundIndex !== -1) {
      setIsPlaying(false);
      return;
    }

    // Guardar estado para el botón "Atrás"
    historyRef.current.push({
      index: currentIndex,
      found: foundIndex,
      array: JSON.parse(JSON.stringify(usuarios))
    });

    let nextIndex = currentIndex;
    let nextFound = foundIndex;

    if (nextIndex === -1) {
      nextIndex = 0;
      log(`Iniciando búsqueda. Objetivo ID: ${targetId}`, 'info');
    } else {
      if (usuarios[nextIndex].id === targetId) {
        nextFound = nextIndex;
        log(`✅ Encontrado en índice [${nextIndex}]: ${usuarios[nextIndex].nombre}`, 'success');
        setCurrentIndex(nextIndex);
        setFoundIndex(nextFound);
        setIsPlaying(false);
        return;
      } else {
        log(`❌ Índice [${nextIndex}]: ID ${usuarios[nextIndex].id} no coincide.`, 'error');
        nextIndex++;
      }
    }

    if (nextIndex >= usuarios.length) {
      log(`⚠️ Fin del array. No se encontró el ID ${targetId}`, 'error');
      setCurrentIndex(-1);
      setIsPlaying(false);
      return;
    }

    setCurrentIndex(nextIndex);
  };

  const stepBack = () => {
    if (historyRef.current.length === 0) return;
    setIsPlaying(false);
    const prev = historyRef.current.pop();
    setCurrentIndex(prev.index);
    setFoundIndex(prev.found);
    setUsuarios(prev.array);
    log(`⏪ Retrocediendo...`, 'info');
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (foundIndex !== -1) resetAlgorithm();
      setIsPlaying(true);
    }
  };

  const handleEditId = (index, newId) => {
    const nuevos = [...usuarios];
    nuevos[index].id = parseInt(newId);
    setUsuarios(nuevos);
    resetAlgorithm();
  };

  const handleDelete = (index) => {
    const nuevos = usuarios.filter((_, i) => i !== index);
    setUsuarios(nuevos);
    log(`Elemento eliminado`, 'error');
    resetAlgorithm();
  };

  // Drag and Drop
  const handleDragStart = (e, index) => {
    draggedIdxRef.current = index;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, dropIdx) => {
    e.preventDefault();
    const draggedIdx = draggedIdxRef.current;
    if (draggedIdx !== null && draggedIdx !== dropIdx) {
      const nuevos = [...usuarios];
      const item = nuevos.splice(draggedIdx, 1)[0];
      nuevos.splice(dropIdx, 0, item);
      setUsuarios(nuevos);
      log(`Movido del índice ${draggedIdx} al ${dropIdx}`, 'info');
      resetAlgorithm();
    }
  };

  return (
    <div className="sif-wrapper">
      <div className="sif-mac-window">
        {/* Barra de Título */}
        <div className="sif-title-bar">
          <div className="sif-mac-dots">
            <div className="sif-dot red"></div>
            <div className="sif-dot yellow"></div>
            <div className="sif-dot green"></div>
          </div>
          <div className="sif-title-text">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            interactivo.find.js
          </div>
        </div>

        {/* Código */}
        <div className="sif-code-editor">
          <div className="sif-line">
            <div className="sif-line-number">1</div>
            <div className="sif-code-content sif-syn-comment">// Busca el primer usuario con el ID indicado</div>
          </div>
          <div className="sif-line">
            <div className="sif-line-number">2</div>
            <div className="sif-code-content">
              <span className="sif-syn-keyword">const</span> <span className="sif-syn-variable">resultado</span> = <span className="sif-syn-variable">usuarios</span>.<span className="sif-syn-property">find</span>(<span className="sif-syn-variable">u</span> =&gt; <span className="sif-syn-variable">u</span>.<span className="sif-syn-property">id</span> === <span className="sif-syn-number">{targetId}</span>);
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="sif-controls">
          <div className="sif-input-group">
            <label>Buscar ID:</label>
            <input 
              type="number" 
              value={targetId} 
              onChange={(e) => { setTargetId(parseInt(e.target.value) || 1); resetAlgorithm(); }} 
              min="1" 
            />
          </div>
          <button className="sif-btn sif-primary" onClick={togglePlay}>
            {isPlaying ? '⏸️ Pausar' : (
              <>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                Ejecutar
              </>
            )}
          </button>
          <button className="sif-btn" onClick={() => { setIsPlaying(false); stepForward(); }} disabled={isPlaying}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="5 4 15 12 5 20 5 4"></polygon><line x1="19" y1="5" x2="19" y2="19" stroke="white" strokeWidth="2"></line></svg>
            Paso a Paso
          </button>
          <button className="sif-btn" onClick={stepBack} disabled={historyRef.current.length === 0 || isPlaying}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="white"><polygon points="19 20 9 12 19 4 19 20"></polygon><line x1="5" y1="19" x2="5" y2="5" stroke="white" strokeWidth="2"></line></svg>
            Atrás
          </button>
          <button className="sif-btn" onClick={resetAlgorithm}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>
            Reset
          </button>

          <div className="sif-speed-control">
            <label>Velocidad</label>
            <input 
              type="range" 
              min="200" 
              max="2000" 
              value={speed} 
              onChange={(e) => setSpeed(parseInt(e.target.value))} 
              step="100" 
            />
          </div>
        </div>

        {/* Array Visual */}
        <div className="sif-array-container">
          {usuarios.map((user, index) => {
            let itemClass = "sif-array-item";
            if (index === currentIndex) itemClass += " sif-evaluating";
            if (index === foundIndex) itemClass += " sif-found";

            return (
              <div 
                key={index} 
                className={itemClass} 
                draggable 
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, index)}
              >
                <span className="sif-idx-badge">[ {index} ]</span>
                <div className="sif-array-content">
                  {"{id:"}<span className="sif-syn-number">{user.id}</span>{", nombre:"}<span className="sif-syn-string">"{user.nombre}"</span>{"}"}
                </div>
                <span className="sif-array-emoji">{user.emoji}</span>
                
                <div className="sif-edit-slider-container">
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={user.id} 
                    onChange={(e) => handleEditId(index, e.target.value)} 
                  />
                </div>

                <div className="sif-item-actions">
                  <button className="sif-delete" title="Eliminar" onClick={() => handleDelete(index)}>🗑️</button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Terminal */}
        <div className="sif-terminal-panel">
          <div className="sif-terminal-header">
            <span>TERMINAL DE SALIDA</span>
            <span>•••</span>
          </div>
          <div className="sif-terminal-output" ref={terminalRef}>
            {logs.map((log, i) => (
              <div key={i} className={`sif-log-line sif-log-${log.type}`}>
                &gt; {log.msg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}