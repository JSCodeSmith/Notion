import { useState, useEffect, useMemo, useRef } from 'react';
import {
  escapeHtml,
  formatValue,
} from '../SimuladorFind/findTrace';
import '../SimuladorFind/SandboxPro.css';
import { ejecutarDemo, formatearResultado } from './ejecutarMetodo';
import { instrumentarMetodo, describirTraza } from './traceMetodo';
import {
  MUTA,
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

const TEXTO_PASO = {
  busqueda: 'Iniciando simulación visual del recorrido...',
  transformacion: 'Iniciando simulación visual de la transformación...',
  mutador: 'Iniciando simulación visual de la mutación...',
  reduccion: 'Iniciando simulación visual del acumulador...',
  iterador: 'Iniciando simulación visual del iterador...',
  utilidad: 'Iniciando simulación visual del cálculo...',
};

export default function SandboxMetodo({ metodo }) {
  const nombre = obtenerNombre(metodo.id);
  const familia = obtenerFamilia(metodo.id);
  const demo = obtenerDemo(metodo.id);
  const codigoInicial = demo.code ?? 'const resultado = array;';
  const inicial = clonar(demo.array ?? []);

  const [array, setArray] = useState(inicial);
  const [code, setCode] = useState(codigoInicial);
  const [logs, setLogs] = useState([
    { type: 'system', html: 'Sandbox listo. El array ya tiene elementos.' },
  ]);

  const [isJsonOpen, setIsJsonOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState(JSON.stringify(inicial));
  const [editorWidth, setEditorWidth] = useState(50);
  const [isResizing, setIsResizing] = useState(false);

  const [stepModalOpen, setStepModalOpen] = useState(false);
  const [stepTarget, setStepTarget] = useState('');
  const [simulationState, setSimulationState] = useState(null);

  const textareaRef = useRef(null);
  const cmInstance = useRef(null);
  const consoleBodyRef = useRef(null);
  const workspaceRef = useRef(null);

  /* Valores de ejemplo del propio método: el array de partida. */
  const banco = useMemo(() => {
    const vistos = new Set();
    const unicos = (demo.array ?? []).filter((valor) => {
      const clave = formatValue(valor);
      if (vistos.has(clave)) return false;
      vistos.add(clave);
      return true;
    });
    return unicos.length > 0 ? unicos : [1, 2, 3, 4, 5];
  }, [demo.array]);

  /* Inicializar CodeMirror */
  useEffect(() => {
    if (!window.CodeMirror) return;
    if (textareaRef.current && !cmInstance.current) {
      cmInstance.current = window.CodeMirror.fromTextArea(textareaRef.current, {
        mode: 'javascript',
        theme: 'dracula',
        lineNumbers: true,
        indentUnit: 4,
        lineWrapping: true,
      });
      cmInstance.current.setValue(codigoInicial);
      cmInstance.current.on('change', (cm) => setCode(cm.getValue()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (consoleBodyRef.current) {
      consoleBodyRef.current.scrollTo({
        top: consoleBodyRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [logs]);

  /* Divisor editor / consola */
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing || !workspaceRef.current) return;
      const rect = workspaceRef.current.getBoundingClientRect();
      const percentage = ((e.clientX - rect.left) / rect.width) * 100;
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

  /* --- GESTIÓN DEL ARRAY --- */
  const agregarValor = (valor) => {
    if (array.length < 20) {
      setArray([...array, valor]);
      setJsonInput(JSON.stringify([...array, valor]));
    }
  };

  const quitarValor = (index) => {
    const siguiente = array.filter((_, i) => i !== index);
    setArray(siguiente);
    setJsonInput(JSON.stringify(siguiente));
  };

  const aleatorio = () => {
    const origen = banco.length > 0 ? banco : [1, 2, 3];
    const siguiente = Array.from(
      { length: Math.floor(Math.random() * 8) + 3 },
      () => origen[Math.floor(Math.random() * origen.length)]
    );
    setArray(siguiente);
    setJsonInput(JSON.stringify(siguiente));
  };

  const mezclar = () => {
    const copia = [...array];
    for (let i = copia.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copia[i], copia[j]] = [copia[j], copia[i]];
    }
    setArray(copia);
    setJsonInput(JSON.stringify(copia));
  };

  const vaciar = () => {
    setArray([]);
    setJsonInput('[]');
  };

  const aplicarJson = () => {
    try {
      const parsed = JSON.parse(jsonInput);
      if (Array.isArray(parsed)) {
        setArray(parsed.slice(0, 20));
        setJsonInput(JSON.stringify(parsed.slice(0, 20)));
        addLog('Array actualizado.', 'system');
      } else {
        throw new Error('No es un array válido');
      }
    } catch (e) {
      addLog(
        `<span class="sp-code-error">Error JSON:</span> ${escapeHtml(e.message)}`,
        'error'
      );
      setJsonInput(JSON.stringify(array));
    }
  };

  /* Drag & Drop */
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('text/plain', index);
    e.currentTarget.classList.add('dragging');
  };
  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('drag-over');
  };
  const handleDragLeave = (e) => e.currentTarget.classList.remove('drag-over');
  const handleDrop = (e, targetIndex) => {
    e.preventDefault();
    e.currentTarget.classList.remove('drag-over');
    const sourceIndex = parseInt(e.dataTransfer.getData('text/plain'), 10);
    if (sourceIndex !== targetIndex) {
      const nuevo = [...array];
      const [movido] = nuevo.splice(sourceIndex, 1);
      nuevo.splice(targetIndex, 0, movido);
      setArray(nuevo);
      setJsonInput(JSON.stringify(nuevo));
    }
  };
  const handleDragEnd = (e) => {
    e.currentTarget.classList.remove('dragging');
    document
      .querySelectorAll('.sp-chip.drag-over')
      .forEach((chip) => chip.classList.remove('drag-over'));
  };

  /* --- CONSOLA --- */
  const addLog = (html, type = 'info') =>
    setLogs((prev) => [...prev, { type, html }]);
  const clearConsole = () => setLogs([]);

  /* --- EJECUCIÓN CON TRAZA REAL --- */
  const runCode = () => {
    if (array.length === 0) {
      addLog('El array está vacío.', 'error');
      return;
    }
    clearConsole();

    const source = cmInstance.current
      ? cmInstance.current.getValue()
      : textareaRef.current?.value ?? code;

    const outputLogs = [];
    const traceSteps = [];
    const fakeConsole = {
      log: (...args) =>
        outputLogs.push({
          html: args
            .map(
              (a) => `<span class="sp-code-str">${escapeHtml(formatValue(a))}</span>`
            )
            .join(' '),
          type: 'info',
        }),
      info: (...args) =>
        outputLogs.push({
          html: args.map((a) => escapeHtml(formatValue(a))).join(' '),
          type: 'info',
        }),
      warn: (...args) =>
        outputLogs.push({
          html: args.map((a) => escapeHtml(formatValue(a))).join(' '),
          type: 'system',
        }),
      error: (...args) =>
        outputLogs.push({
          html: args.map((a) => escapeHtml(formatValue(a))).join(' '),
          type: 'error',
        }),
    };

    const declaraArray = /\b(?:const|let|var)\s+array\s*=/.test(source);
    const ejecutableBase = declaraArray
      ? source
      : `const array = __sandboxArray;\n${source}`;

    const metodoJs = NOMBRE_JS[metodo.id] ?? metodo.id;
    const { code: instrumentedCode, instrumented } = instrumentarMetodo(
      ejecutableBase,
      'array',
      metodoJs
    );

    const copia = clonar(array);
    let result;

    try {
      result = new Function(
        'console',
        '__traceMetodo',
        '__sandboxArray',
        instrumentedCode
      )(fakeConsole, (args, valor) => {
        traceSteps.push({ args, valor, ok: Boolean(valor) });
      }, copia);

      outputLogs.forEach((log) => addLog(log.html, log.type));

      const corto = sinPrefijo(nombre);

      if (instrumented) {
        addLog(
          '<br/><span class="sp-code-comment">// ⚙️ Traza real del callback, sin inventar comparaciones...</span>',
          'system'
        );

        if (traceSteps.length === 0) {
          addLog(
            '<span class="sp-code-comment">// El callback no llegó a ejecutarse.</span>',
            'system'
          );
        } else {
          traceSteps.forEach((paso, i) => {
            addLog(
              `<span class="sp-code-index">[${paso.args[1] ?? i}]</span> ${escapeHtml(
                describirTraza(metodo.id, paso.args, paso.valor)
              )} → <span class="${paso.ok ? 'sp-code-success' : 'sp-code-error'}">${
                paso.ok ? 'TRUE' : 'FALSE'
              }</span>`,
              paso.ok ? 'info' : 'system'
            );
          });
        }
      } else if (demo.fn && source.includes(`.${metodoJs}(`)) {
        addLog(
          '<span class="sp-code-comment">// No pude aislar el callback para la traza.</span>',
          'system'
        );
        addLog(
          `<span class="sp-code-comment">// Usa una llamada del tipo array.${metodoJs}((item) => ...).</span>`,
          'system'
        );
      }

      addLog(
        `<span class="sp-code-success">✅ ${corto} devuelve: ${escapeHtml(
          formatearResultado(metodo.id, result)
        )}</span>`,
        'success'
      );

      if (MUTA.has(metodo.id) && !declaraArray) {
        addLog(
          `<span class="sp-code-comment">> El array queda como [${copia
            .map(formatValue)
            .join(', ')}]</span>`,
          'system'
        );
        setArray(copia);
        setJsonInput(JSON.stringify(copia));
      }
    } catch (error) {
      addLog(
        `<span class="sp-code-error">Error:</span> ${escapeHtml(error.message)}`,
        'error'
      );
    }
  };

  /* --- PASO A PASO: usa la traza real del motor --- */
  const startStepByStep = () => {
    if (array.length === 0) {
      addLog('Agrega elementos al array primero.', 'error');
      return;
    }
    setStepTarget(formatValue(array[0]));
    setStepModalOpen(true);
  };

  const executeStepByStep = async () => {
    setStepModalOpen(false);
    clearConsole();
    addLog(
      `<span class="sp-code-comment">// 👣 ${TEXTO_PASO[familia] ?? TEXTO_PASO.utilidad}</span>`,
      'system'
    );

    const plan = ejecutarDemo(metodo.id, { arreglo: array });
    const objetivo = stepTarget.trim();

    for (const paso of plan.pasos) {
      if (paso.index >= 0) {
        const estado =
          paso.tipo === 'success'
            ? 'success'
            : paso.tipo === 'error'
              ? 'fail'
              : 'evaluating';
        setSimulationState({
          index: paso.index,
          valor: formatValue(plan.original[paso.index]),
          target: objetivo,
          status: estado,
        });
        await new Promise((r) => setTimeout(r, estado === 'evaluating' ? 450 : 900));
      }

      const clase =
        paso.tipo === 'success'
          ? 'sp-code-success'
          : paso.tipo === 'error'
            ? 'sp-code-error'
            : 'sp-code-comment';
      addLog(`<span class="${clase}">${escapeHtml(paso.msg)}</span>`, paso.tipo);
      await new Promise((r) => setTimeout(r, 250));
    }

    addLog(
      `<span class="sp-code-success">✅ Resultado: ${escapeHtml(
        formatearResultado(metodo.id, plan.result)
      )}</span>`,
      'success'
    );

    if (plan.muta) {
      setArray(plan.finalArray ?? array);
      setJsonInput(JSON.stringify(plan.finalArray ?? array));
    }

    setSimulationState(null);
  };

  /* --- REPL --- */
  const handleRepl = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = e.target.value;
    if (!cmd.trim()) return;
    addLog(`<span class="sp-code-comment">> ${escapeHtml(cmd)}</span>`, 'system');
    try {
      const result = new Function('array', `return (${cmd});`)(array);
      addLog(
        `<span class="sp-code-success">&lt;- ${escapeHtml(formatValue(result))}</span>`,
        'success'
      );
    } catch (error) {
      addLog(
        `<span class="sp-code-error">Error: ${escapeHtml(error.message)}</span>`,
        'error'
      );
    }
    e.target.value = '';
  };

  return (
    <div className="sandbox-pro-wrapper">
      <div className="sp-container">
        <div className="sp-panel sp-header-panel">
          <div className="sp-header-title">
            <div className="sp-icon-box">🔨</div>
            <div className="sp-header-text">
              <h1>Ejemplos vivos PRO</h1>
              <p>Sandbox interactivo con depuración avanzada.</p>
            </div>
          </div>
        </div>

        <div className="sp-panel sp-builder-section">
          <div className="sp-section-header">
            <span className="sp-section-title">1 · Construye tu array de prueba</span>
            <div className="sp-tools-group">
              <button className="sp-btn-tool" onClick={aleatorio}>🎲 Aleatorio</button>
              <button className="sp-btn-tool" onClick={mezclar}>🔀 Mezclar</button>
              <button className="sp-btn-tool sp-danger" onClick={vaciar}>🗑 Vaciar</button>
            </div>
          </div>

          <div className="sp-emoji-palette">
            {banco.map((valor) => (
              <span
                key={formatValue(valor)}
                className="sp-palette-item"
                style={{
                  fontFamily: 'monospace',
                  fontSize: '13px',
                  background: 'var(--bg-panel-hover)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '6px',
                  padding: '4px 9px',
                }}
                onClick={() => agregarValor(valor)}
                title="Añadir al array"
              >
                {formatValue(valor)}
              </span>
            ))}
          </div>

          <div className="sp-array-visualizer">
            <div className="sp-array-info">
              <span>
                TU ARRAY <span className="sp-count">{array.length}</span> / 20
              </span>
              <button
                className="sp-btn-tool"
                onClick={() => setIsJsonOpen(!isJsonOpen)}
              >
                ✏️ Editar JSON
              </button>
            </div>

            {isJsonOpen && (
              <div className="sp-json-editor">
                <textarea
                  className="sp-json-textarea"
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  onBlur={aplicarJson}
                />
              </div>
            )}

            <div className="sp-chips-container">
              {array.length === 0 ? (
                <div className="sp-empty-array">El array está vacío.</div>
              ) : (
                array.map((valor, index) => {
                  const resaltado =
                    simulationState && simulationState.index === index;
                  let chipClass = 'sp-chip';
                  if (resaltado) {
                    if (simulationState.status === 'success') chipClass += ' sp-chip-success';
                    else if (simulationState.status === 'fail') chipClass += ' sp-chip-error';
                    else chipClass += ' sp-chip-scanning';
                  }

                  return (
                    <div
                      key={`${index}-${formatValue(valor)}`}
                      className={chipClass}
                      draggable
                      onDragStart={(e) => handleDragStart(e, index)}
                      onDragEnd={handleDragEnd}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <span className="sp-chip-index">[{index}]</span>
                      <span className="sp-chip-emoji">{formatValue(valor)}</span>
                      <button className="sp-chip-close" onClick={() => quitarValor(index)}>
                        ✕
                      </button>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="sp-workspace" ref={workspaceRef}>
          <div className="sp-editor-wrapper" style={{ width: `${editorWidth}%` }}>
            <div className="sp-window-header">
              <div className="sp-dots">
                <div className="sp-dot r" />
                <div className="sp-dot y" />
                <div className="sp-dot g" />
              </div>
              <span>ejemplo.js</span>
            </div>
            <div className="sp-editor-container">
              <textarea ref={textareaRef} defaultValue={codigoInicial} />
            </div>
            <div className="sp-editor-footer">
              <button className="sp-btn-run" onClick={runCode} disabled={!!simulationState}>
                ▶ Ejecutar
              </button>
              <button
                className="sp-btn-action"
                onClick={startStepByStep}
                disabled={!!simulationState}
              >
                👣 Paso a Paso
              </button>
            </div>
          </div>

          <div
            className={`sp-resizer ${isResizing ? 'resizing' : ''}`}
            onMouseDown={(e) => {
              e.preventDefault();
              setIsResizing(true);
            }}
          />

          <div className="sp-console-wrapper" style={{ width: `${100 - editorWidth}%` }}>
            <div className="sp-window-header">
              <div className="sp-dots">
                <div className="sp-dot r" />
                <div className="sp-dot y" />
                <div className="sp-dot g" />
              </div>
              <span>Consola</span>
            </div>
            <div className="sp-console-output" ref={consoleBodyRef}>
              {logs.map((log, i) => (
                <div key={`${metodo.id}-sp-log-${i}`} className={`sp-log-line sp-log-${log.type}`}>
                  <span className="sp-log-text" dangerouslySetInnerHTML={{ __html: log.html }} />
                </div>
              ))}
            </div>
            <div className="sp-console-repl">
              <div className="sp-repl-prompt">&gt;</div>
              <input
                type="text"
                className="sp-repl-input"
                placeholder="Escribe código aquí..."
                onKeyDown={handleRepl}
                disabled={!!simulationState}
              />
            </div>
          </div>
        </div>
      </div>

      {stepModalOpen && (
        <div className="sp-modal-overlay">
          <div className="sp-modal">
            <h3>👣 Simulador Paso a Paso</h3>
            <p>¿Qué valor del array quieres seguir durante el recorrido?</p>
            <input
              type="text"
              value={stepTarget}
              onChange={(e) => setStepTarget(e.target.value)}
              autoFocus
              onKeyDown={(e) => e.key === 'Enter' && executeStepByStep()}
            />
            <div className="sp-modal-actions">
              <button className="sp-btn-action" onClick={() => setStepModalOpen(false)}>
                Cancelar
              </button>
              <button className="sp-btn-run" onClick={executeStepByStep}>
                Iniciar Simulación
              </button>
            </div>
          </div>
        </div>
      )}

      {simulationState && (
        <div className="sp-simulation-alert">
          <div className={`sp-sim-box sp-sim-${simulationState.status}`}>
            <div className="sp-sim-icon">
              {simulationState.status === 'evaluating'
                ? '🔍'
                : simulationState.status === 'success'
                  ? '🎉'
                  : '❌'}
            </div>
            <div className="sp-sim-content">
              <div className="sp-sim-title">
                {simulationState.status === 'evaluating'
                  ? 'Evaluando elemento...'
                  : simulationState.status === 'success'
                    ? 'Coincidencia'
                    : 'Descartado'}
              </div>
              <div className="sp-sim-code">
                <span className="sp-sim-idx">[{simulationState.index}]</span>{' '}
                {simulationState.valor}
              </div>
              {simulationState.status === 'success' && (
                <div className="sp-sim-sub">
                  {familia === 'busqueda'
                    ? 'Se detiene la ejecución (Cortocircuito)'
                    : 'El recorrido marca este elemento'}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
