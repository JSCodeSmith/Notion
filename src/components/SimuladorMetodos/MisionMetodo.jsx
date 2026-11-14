import { useCallback, useEffect, useRef, useState } from 'react';
import { formatValue } from '../SimuladorFind/findTrace';
import '../SimuladorFind/MisionEmoji.css';
import { ejecutarDemo, formatearResultado } from './ejecutarMetodo';
import { instrumentarMetodo, describirTraza } from './traceMetodo';
import {
  CORTA,
  NOMBRE_JS,
  obtenerDemo,
  obtenerFamilia,
  obtenerNombre,
} from './metodosMeta';

const clonar = (valor) => {
  try {
    return JSON.parse(JSON.stringify(valor));
  } catch {
    return valor;
  }
};

const sinPrefijo = (nombre) => nombre.replace('Array.prototype.', '');

const PISTA = {
  busqueda:
    'Recorre el array con calma y detente en cuanto la condición sea verdadera. Si nada cumple, el método devuelve su valor de fallo.',
  transformacion:
    'No cambies el array original: mira qué forma tiene la salida. ¿Es un array nuevo, un elemento o un valor calculado?',
  mutador:
    'El array se modifica en el sitio. Fíjate en lo que devuelve el método y en cómo queda el tablero después.',
  reduccion:
    'Sigue el acumulador elemento a elemento. El resultado final es el último valor que toma.',
  iterador:
    'El método no transforma el array: produce una secuencia o ejecuta un efecto por cada elemento.',
  utilidad:
    'No hay callback ni recorrido: se aplica un cálculo directo sobre la entrada.',
};

const leerValor = (texto) => {
  try {
    return new Function(`return (${texto});`)();
  } catch {
    return texto;
  }
};

export default function MisionMetodo({ metodo }) {
  const familia = obtenerFamilia(metodo.id);
  const nombre = obtenerNombre(metodo.id);
  const corto = sinPrefijo(nombre);
  const demo = obtenerDemo(metodo.id);
  const inicial = clonar(demo.array ?? []);

  const [items, setItems] = useState(inicial);
  const [objetivo, setObjetivo] = useState(formatValue(inicial[0]));
  const [isExecuting, setIsExecuting] = useState(false);
  const [logs, setLogs] = useState([
    { text: '⚙️ Misión inicializada.', type: 'system' },
  ]);
  const [activeTab, setActiveTab] = useState('logs');
  const [speed, setSpeed] = useState(500);

  const [cardStates, setCardStates] = useState({});
  const [executionResult, setExecutionResult] = useState('undefined');

  const [newValorInput, setNewValorInput] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [alertMsg, setAlertMsg] = useState(null);
  const [codeDirty, setCodeDirty] = useState(false);

  const editorRef = useRef(null);
  const cmInstance = useRef(null);
  const consoleLogsRef = useRef(null);
  const isProgrammaticChangeRef = useRef(false);
  const runCodeRef = useRef(null);

  /* Código real del método, con el array actual del tablero. */
  const buildEditorCode = useCallback(() => {
    const valores = items.map((item) => JSON.stringify(item)).join(', ');
    const cuerpo = demo.code ?? 'const resultado = array;';
    return `const array = [${valores}];\n\n// ${corto}\n${cuerpo}\nreturn resultado;\n`;
  }, [items, demo.code, corto]);

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

  useEffect(() => {
    if (!window.CodeMirror) return;
    if (editorRef.current && !cmInstance.current) {
      cmInstance.current = window.CodeMirror.fromTextArea(editorRef.current, {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
        indentUnit: 4,
        lineWrapping: true,
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

  useEffect(() => {
    if (consoleLogsRef.current) {
      consoleLogsRef.current.scrollTop = consoleLogsRef.current.scrollHeight;
    }
  }, [logs]);

  useEffect(() => {
    if (alertMsg) {
      const timer = setTimeout(() => setAlertMsg(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [alertMsg]);

  useEffect(() => {
    if (!codeDirty) writeEditorCode();
  }, [codeDirty, writeEditorCode]);

  const logSystem = (text) =>
    setLogs((prev) => [...prev, { text, type: 'system' }]);
  const logError = (text) =>
    setLogs((prev) => [...prev, { text, type: 'error' }]);
  const logSuccess = (text) =>
    setLogs((prev) => [...prev, { text, type: 'success' }]);

  /* --- GESTIÓN DE ELEMENTOS --- */
  const addItem = () => {
    if (isExecuting) return;
    const valor =
      newValorInput.trim() === ''
        ? (demo.array ?? [1])[Math.floor(Math.random() * (demo.array ?? [1]).length)]
        : leerValor(newValorInput.trim());

    setItems([...items, valor]);
    logSystem(`Elemento añadido: ${formatValue(valor)}`);
    setNewValorInput('');
    setAlertMsg(`✅ Añadido: ${formatValue(valor)}`);
  };

  const deleteItem = (index, e) => {
    e.stopPropagation();
    if (isExecuting) return;
    const eliminado = items[index];
    setItems(items.filter((_, i) => i !== index));
    logSystem(`Elemento eliminado: ${formatValue(eliminado)}`);
  };

  const handleSaveEdit = () => {
    if (editingItem && editingItem.texto.trim() !== '') {
      const valor = leerValor(editingItem.texto.trim());
      setItems((prev) =>
        prev.map((item, i) => (i === editingItem.index ? valor : item))
      );
      logSystem(`Elemento actualizado a: ${formatValue(valor)}`);
      setAlertMsg(`✅ Editado a: ${formatValue(valor)}`);
      setCodeDirty(false);
    }
    setEditingItem(null);
  };

  const moverA = (index, destino) => {
    if (isExecuting) return;
    const nuevo = parseInt(destino, 10);
    if (Number.isNaN(nuevo) || nuevo === index) return;
    const copia = [...items];
    const [movido] = copia.splice(index, 1);
    copia.splice(Math.max(0, Math.min(nuevo, copia.length)), 0, movido);
    setItems(copia);
    setCodeDirty(false);
    logSystem(`Elemento movido a la posición [${nuevo}].`);
  };

  const mezclarTablero = () => {
    if (isExecuting) return;
    const barajado = [...items];
    for (let i = barajado.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [barajado[i], barajado[j]] = [barajado[j], barajado[i]];
    }
    setItems(barajado);
    setCodeDirty(false);
    logSystem('Tablero mezclado. Los índices han cambiado.');
  };

  /* --- DRAG & DROP --- */
  const handleDragStart = (e, index) => {
    if (isExecuting) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('text/plain', index);
    e.dataTransfer.effectAllowed = 'move';
    setTimeout(() => e.target.classList.add('dragging'), 0);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    e.currentTarget.classList.add('drag-valid');
  };

  const handleDragLeave = (e) => e.currentTarget.classList.remove('drag-valid');

  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-valid');
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (sourceIndex !== targetIndex) {
      const nuevo = [...items];
      const [movido] = nuevo.splice(sourceIndex, 1);
      nuevo.splice(targetIndex, 0, movido);
      setItems(nuevo);
      setCodeDirty(false);
      logSystem(`Elemento movido al índice [${targetIndex}].`);
      setAlertMsg(`🔀 Movido al índice [${targetIndex}]`);
    }
  };

  const handleDragEnd = (e) => {
    e.target.classList.remove('dragging');
    document
      .querySelectorAll('.emoji-card')
      .forEach((card) => card.classList.remove('drag-valid', 'drag-invalid'));
  };

  /* --- EJECUCIÓN REAL --- */
  const runCode = async () => {
    if (isExecuting) return;
    setIsExecuting(true);

    const source = cmInstance.current
      ? cmInstance.current.getValue()
      : editorRef.current?.value ?? '';

    setLogs([]);
    setActiveTab('logs');
    setCardStates({});

    const valores = clonar(items);
    const traceSteps = [];
    let result = null;

    try {
      const declaracion = /const\s+array\s*=\s*\[[\s\S]*?\];/;
      let codeToExecute = source;

      if (declaracion.test(source)) {
        codeToExecute = source.replace(
          declaracion,
          `const array = ${JSON.stringify(valores)};`
        );
      } else if (!/\b(?:const|let|var)\s+array\s*=/.test(source)) {
        codeToExecute = `const array = ${JSON.stringify(valores)};\n${source}`;
      }

      const { code: instrumentedCode, instrumented } = instrumentarMetodo(
        codeToExecute,
        'array',
        NOMBRE_JS[metodo.id] ?? metodo.id
      );

      const salida = [];
      const consolaFalsa = {
        log: (...args) => salida.push(args.map(formatValue).join(' ')),
        info: (...args) => salida.push(args.map(formatValue).join(' ')),
        warn: (...args) => salida.push(`⚠ ${args.map(formatValue).join(' ')}`),
        error: (...args) => salida.push(`✖ ${args.map(formatValue).join(' ')}`),
      };

      const func = new Function('__traceMetodo', 'console', instrumentedCode);
      result = func((args, valor) => {
        traceSteps.push({ args, valor, ok: Boolean(valor) });
      }, consolaFalsa);

      salida.forEach((texto) => logSystem(`> ${texto}`));

      if (!instrumented) {
        logSystem(
          `Este método no expone un callback instrumentable; ejecuto su código real y muestro el resultado.`
        );
      }
    } catch (error) {
      logError(`Error de Sintaxis: ${error.message}`);
      setIsExecuting(false);
      return;
    }

    logSystem(`Iniciando ejecución real de ${corto}...`);

    if (traceSteps.length > 0) {
      for (const paso of traceSteps) {
        const indice = typeof paso.args[1] === 'number' ? paso.args[1] : -1;
        if (indice >= 0) {
          setCardStates((prev) => ({ ...prev, [indice]: 'scanning' }));
          await sleep(speed);
        }

        logSystem(`[${indice}] ${describirTraza(metodo.id, paso.args, paso.valor)}`);

        if (indice >= 0) {
          if (CORTA.has(metodo.id) && paso.ok) {
            setCardStates((prev) => ({ ...prev, [indice]: 'success' }));
            logSuccess(
              `¡Coincidencia! ${formatValue(paso.args[0])} en el índice [${indice}].`
            );
            break;
          }
          setCardStates((prev) => ({
            ...prev,
            [indice]: paso.ok ? 'success' : 'discarded',
          }));
        }
      }
    } else {
      const plan = ejecutarDemo(metodo.id, { arreglo: valores });
      for (const paso of plan.pasos) {
        if (paso.index >= 0) {
          setCardStates((prev) => ({
            ...prev,
            [paso.index]:
              paso.tipo === 'success'
                ? 'success'
                : paso.tipo === 'error'
                  ? 'discarded'
                  : 'scanning',
          }));
          await sleep(speed);
        }
        setLogs((prev) => [...prev, { text: paso.msg, type: paso.tipo }]);
      }
    }

    setExecutionResult(formatearResultado(metodo.id, result));
    logSuccess(`${corto} devuelve: ${formatearResultado(metodo.id, result)}`);

    setIsExecuting(false);
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    runCodeRef.current = runCode;
  });

  const reset = () => {
    setItems(clonar(inicial));
    setObjetivo(formatValue(inicial[0]));
    setLogs([]);
    setCodeDirty(false);
    setExecutionResult('undefined');
    setCardStates({});
    setActiveTab('logs');
  };

  const indiceObjetivo = items.findIndex(
    (item) => formatValue(item) === objetivo
  );

  return (
    <div className="game-container" onDragOver={(e) => e.preventDefault()}>
      {alertMsg && <div className="game-alert">{alertMsg}</div>}

      <div className="header">
        <div className="mission-header">
          <div className="mission-title-area">
            <div className="icon-box">🎯</div>
            <div className="mission-text">
              <h2>Misión #1: Domina {corto}</h2>
              <p>
                Gestiona el tablero (añade, edita, arrastra) y observa el
                comportamiento real de {corto}.
              </p>
            </div>
          </div>
          <div className="badges">
            <span className="badge gold">+ 120 XP</span>
          </div>
        </div>
      </div>

      <div className="objective-panel">
        <div className="objective-text">
          🎯 Objetivo:{' '}
          <span style={{ color: 'var(--purple-main)' }}>
            {familia === 'busqueda'
              ? `encontrar ${objetivo} con ${corto}`
              : `completar el recorrido de ${corto}`}
          </span>
        </div>
        <button
          className="btn-hint"
          onClick={() =>
            logSystem(
              `Pista: ${PISTA[familia] ?? PISTA.utilidad} Usa ${corto} sobre el array actual.`
            )
          }
        >
          💡 Ver pista
        </button>
      </div>

      <div className="board-section">
        <div className="board-tools">
          <span className="board-title">TABLERO DE ELEMENTOS</span>
          <div className="tool-actions">
            <div className="add-input-group">
              <input
                type="text"
                placeholder="Ej: 42"
                value={newValorInput}
                onChange={(e) => setNewValorInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addItem()}
                maxLength={12}
                className="custom-emoji-input"
              />
              <button className="btn-tool add" onClick={addItem}>
                ➕ Añadir
              </button>
            </div>
            <button className="btn-tool" onClick={mezclarTablero}>
              🔀 Mezclar
            </button>
          </div>
        </div>

        <div className="emoji-grid">
          {items.map((item, index) => {
            const stateClass = cardStates[index] || '';
            const isSelected = index === indiceObjetivo;
            const texto = formatValue(item);

            return (
              <div
                key={`${metodo.id}-${index}`}
                className={`emoji-card ${isSelected ? 'selected' : ''} ${stateClass}`}
                draggable={!isExecuting}
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnd={handleDragEnd}
                onClick={(e) => {
                  if (
                    e.target.tagName === 'BUTTON' ||
                    e.target.tagName === 'INPUT' ||
                    isExecuting
                  ) {
                    return;
                  }
                  setObjetivo(texto);
                  logSystem(`Objetivo seleccionado: ${texto}.`);
                }}
              >
                <button
                  className="btn-delete"
                  onClick={(e) => deleteItem(index, e)}
                  title="Eliminar"
                >
                  ✕
                </button>
                <div
                  className="emoji-icon"
                  style={{ fontSize: texto.length > 3 ? '18px' : '36px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isExecuting) setEditingItem({ index, texto });
                  }}
                  title="Clic para editar"
                >
                  {texto}
                </div>
                <div className="emoji-controls">
                  <span className="emoji-index">[{index}]</span>
                  <input
                    type="number"
                    className="emoji-id-input"
                    value={index}
                    onChange={(e) => moverA(index, e.target.value)}
                    title="Cambiar posición"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="workspace">
        <div className="panel editor-panel">
          <div className="panel-header">
            <div className="dots">
              <div className="dot r" />
              <div className="dot y" />
              <div className="dot g" />
            </div>
            <span>mision.js</span>
            <span
              style={{
                fontSize: '10px',
                color: codeDirty ? '#eab308' : '#666',
              }}
            >
              {codeDirty
                ? 'código modificado · pulsa 💡 Solución para regenerar'
                : 'Ctrl + Enter'}
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
          />
        </div>
        <div className="panel console-panel">
          <div className="panel-header">
            <div className="dots">
              <div className="dot r" />
              <div className="dot y" />
              <div className="dot g" />
            </div>
            <div className="console-tabs">
              <span
                className={`console-tab ${activeTab === 'logs' ? 'active' : ''}`}
                onClick={() => setActiveTab('logs')}
              >
                Consola
              </span>
              <span
                className={`console-tab ${activeTab === 'debug' ? 'active' : ''}`}
                onClick={() => setActiveTab('debug')}
              >
                Variables
              </span>
            </div>
          </div>

          <div
            className="console-body"
            ref={consoleLogsRef}
            style={{ display: activeTab === 'logs' ? 'block' : 'none' }}
          >
            {logs.map((log, i) => (
              <div key={`${metodo.id}-log-${i}`} className={`log-line log-${log.type}`}>
                <span className="log-text">{log.text}</span>
              </div>
            ))}
          </div>

          <div
            className="console-body debug-panel"
            style={{ display: activeTab === 'debug' ? 'block' : 'none' }}
          >
            <div className="debug-row">
              <span className="debug-key">array:</span>{' '}
              <span>{JSON.stringify(items)}</span>
            </div>
            <div className="debug-row">
              <span className="debug-key">método:</span> <span>{corto}</span>
            </div>
            <div className="debug-row">
              <span className="debug-key">resultado:</span>{' '}
              <span>{executionResult}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-actions">
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button className="btn btn-primary" onClick={runCode} disabled={isExecuting}>
            {isExecuting ? 'Ejecutando...' : '▶ Ejecutar código'}
          </button>
          <button className="btn btn-secondary" onClick={updateEditorCode} disabled={isExecuting}>
            💡 Solución
          </button>
          <button className="btn btn-secondary" onClick={reset} disabled={isExecuting}>
            🔄
          </button>
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

      {editingItem && (
        <div className="modal-overlay" onClick={() => setEditingItem(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Editar elemento</h3>
            <p>Cambia el valor actual del índice [{editingItem.index}]:</p>
            <input
              type="text"
              value={editingItem.texto}
              onChange={(e) =>
                setEditingItem({ ...editingItem, texto: e.target.value })
              }
              maxLength={12}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
            />
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setEditingItem(null)}>
                Cancelar
              </button>
              <button className="btn btn-primary" onClick={handleSaveEdit}>
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
