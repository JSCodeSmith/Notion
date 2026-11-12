import { useState, useEffect, useRef } from 'react';
import './SimuladorFindDiagrama.css';

export default function SimuladorFindDiagrama() {
  const [inputArray, setInputArray] = useState('5, 12, 8, 130, 44');
  const [inputCond, setInputCond] = useState('100');
  
  const [arrayData, setArrayData] = useState([]);
  const [conditionVal, setConditionVal] = useState(0);
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [phase, setPhase] = useState('start');
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState({ status: 'idle', value: 'Esperando...' });

  const consoleRef = useRef(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const addLog = (text, className = 'log-info') => {
    setLogs((prev) => [...prev, { text, className }]);
  };

  const resetSim = () => {
    setIsAutoPlaying(false);
    setCurrentIdx(0);
    setPhase('start');
    
    const parsedArray = inputArray.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    const parsedCond = parseFloat(inputCond) || 0;
    
    setArrayData(parsedArray);
    setConditionVal(parsedCond);
    setLogs([{ text: '> Flujo reiniciado. Listo para ejecutar.', className: 'log-info' }]);
    setResult({ status: 'idle', value: 'Esperando...' });
  };

  useEffect(() => {
    resetSim();
  }, []);

  const nextStep = () => {
    if (phase === 'finished') return;
    if (arrayData.length === 0) {
      addLog('❌ Error: El array está vacío.', 'log-error');
      setPhase('finished');
      return;
    }

    switch (phase) {
      case 'start':
        addLog('> Iniciando búsqueda...', 'log-info');
        setPhase('iter_start');
        break;
      case 'iter_start':
      case 'iter_loop':
        if (currentIdx >= arrayData.length) {
          addLog(`> Fin del array. Índice ${currentIdx} >= ${arrayData.length}`, 'log-info');
          setPhase('fail_path');
          break;
        }
        addLog(`> Iterando. Índice [${currentIdx}]: ${arrayData[currentIdx]}`, 'log-info');
        setPhase('check');
        break;
      case 'check':
        addLog(`  ¿idx (${currentIdx}) < length (${arrayData.length})? → Sí`, 'log-info');
        setPhase('eval');
        break;
      case 'eval':
        addLog(`  Evaluando condición: ${arrayData[currentIdx]} > ${conditionVal}`, 'log-eval');
        setPhase('decision');
        break;
      case 'decision':
        const isTrueDec = arrayData[currentIdx] > conditionVal;
        if (isTrueDec) {
          addLog(`✅ Condición TRUE. Cortocircuito.`, 'log-success');
          setPhase('success_path');
        } else {
          addLog(`❌ Condición FALSE. Pasando al siguiente...`, 'log-error');
          setPhase('loop_path');
        }
        break;
      case 'loop_path':
        setCurrentIdx(prev => prev + 1);
        setPhase('iter_loop');
        break;
      case 'success_path':
        setResult({ status: 'success', value: `Elemento: ${arrayData[currentIdx]}` });
        addLog(`■ Retorna: ${arrayData[currentIdx]}`, 'log-return');
        setPhase('finished');
        setIsAutoPlaying(false);
        break;
      case 'fail_path':
        setResult({ status: 'fail', value: `undefined` });
        addLog(`■ Retorna: undefined`, 'log-return');
        setPhase('finished');
        setIsAutoPlaying(false);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    let timer;
    if (isAutoPlaying && phase !== 'finished') {
      timer = setTimeout(() => {
        nextStep();
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [isAutoPlaying, phase, currentIdx, arrayData]);

  const handleManualStep = () => {
    setIsAutoPlaying(false);
    nextStep();
  };

  const toggleAutoPlay = () => {
    if (isAutoPlaying) {
      setIsAutoPlaying(false);
    } else {
      if (phase === 'start' || phase === 'finished') {
        resetSim();
        setTimeout(() => setIsAutoPlaying(true), 10);
      } else {
        setIsAutoPlaying(true);
      }
    }
  };

  const isNodeActive = (node) => {
    if (phase === 'start' && node === 'start') return true;
    if ((phase === 'iter_start' || phase === 'iter_loop') && node === 'iter') return true;
    if ((phase === 'check' || phase === 'fail_path') && node === 'check') return true;
    if (phase === 'eval' && node === 'eval') return true;
    if ((phase === 'decision' || phase === 'loop_path' || phase === 'success_path') && node === 'dec') return true;
    if (phase === 'success_path' && node === 'success') return true;
    if (phase === 'fail_path' && node === 'fail') return true;
    return false;
  };

  const getPathClass = (path) => {
    if (phase === 'start' && path === 'start') return 'active flowing';
    if ((phase === 'iter_start' || phase === 'iter_loop') && path === 'iter') return 'active flowing';
    if (phase === 'check' && path === 'checkYes') return 'active flowing';
    if (phase === 'eval' && path === 'eval') return 'active flowing';
    if (phase === 'fail_path' && path === 'checkNo') return 'active-red flowing';
    if (phase === 'decision' && arrayData[currentIdx] > conditionVal && path === 'decYes') return 'active-green flowing';
    if (phase === 'decision' && arrayData[currentIdx] <= conditionVal && path === 'decNo') return 'active-red flowing';
    if (phase === 'loop_path' && path === 'decNo') return 'active-red flowing';
    if (phase === 'success_path' && path === 'decYes') return 'active-green flowing';
    return '';
  };

  const getStepClass = (stepIndex) => {
    if (phase === 'start' && stepIndex === 0) return 'active';
    if ((phase === 'iter_start' || phase === 'iter_loop' || phase === 'check') && stepIndex === 0) return 'active';
    if ((phase === 'eval' || phase === 'decision' || phase === 'loop_path') && stepIndex === 1) return 'active';
    if (phase === 'success_path' && stepIndex === 2) return 'active';
    if (phase === 'fail_path' && stepIndex === 3) return 'active';
    return '';
  };

  return (
    <div className="sim-diagrama-find">
      <div className="left-panel">
        <div className="title">⚙️ ¿Cómo funciona?</div>
        <div className="theory-list">
          <div className={`theory-step ${getStepClass(0)}`}>
            <div className="num">1</div>
            <p>Recorre el array desde el índice 0 en adelante.</p>
          </div>
          <div className={`theory-step ${getStepClass(1)}`}>
            <div className="num">2</div>
            <p>Evalúa cada elemento con la función condición que le pasas.</p>
          </div>
          <div className={`theory-step ${getStepClass(2)}`}>
            <div className="num">3</div>
            <p><strong>Cortocircuito:</strong> Al devolver <code>true</code>, se detiene y devuelve ese elemento.</p>
          </div>
          <div className={`theory-step ${getStepClass(3)}`}>
            <div className="num">4</div>
            <p>Si recorre todo y nadie cumple, devuelve <code>undefined</code>.</p>
          </div>
        </div>
        <div className="input-group">
          <label>Array de Números</label>
          <input type="text" className="input-field" value={inputArray} onChange={(e) => setInputArray(e.target.value)} disabled={isAutoPlaying || (phase !== 'start' && phase !== 'finished')} />
        </div>
        <div className="input-group">
          <label>Condición (n &gt; ?)</label>
          <input type="number" className="input-field" value={inputCond} onChange={(e) => setInputCond(e.target.value)} disabled={isAutoPlaying || (phase !== 'start' && phase !== 'finished')} />
        </div>
        <div className="btn-group">
          <div className="btn-row">
            <button className="btn btn-run" onClick={toggleAutoPlay}>{isAutoPlaying ? '⏸ Pausar' : '▶ Auto'}</button>
            <button className="btn btn-step" onClick={handleManualStep} disabled={isAutoPlaying || phase === 'finished'}>⏭ Paso</button>
          </div>
          <button className="btn btn-reset" onClick={resetSim}>🔄 Reiniciar</button>
        </div>
        <div className={`result-box ${result.status}`}>
          <div className="label">Resultado Final</div>
          <div className="value">{result.value}</div>
        </div>
      </div>

      <div className="right-panel">
        <div className="diagram-wrapper">
          <div className="canvas">
            <svg viewBox="0 0 600 500" preserveAspectRatio="none">
              <defs>
                <marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#3f3f46" />
                </marker>
              </defs>
              <path className={getPathClass('start')} d="M 300 50 L 300 100" markerEnd="url(#arrow)" />
              <path className={getPathClass('iter')} d="M 300 160 L 300 185" markerEnd="url(#arrow)" />
              <path className={getPathClass('checkYes')} d="M 300 265 L 300 295" markerEnd="url(#arrow)" />
              <path className={getPathClass('checkNo')} d="M 230 225 L 160 225" markerEnd="url(#arrow)" />
              <path className={getPathClass('eval')} d="M 300 355 L 300 385" markerEnd="url(#arrow)" />
              <path className={getPathClass('decYes')} d="M 370 430 L 440 430" markerEnd="url(#arrow)" />
              <path className={getPathClass('decNo')} d="M 230 430 L 100 430 L 100 130 L 230 130" markerEnd="url(#arrow)" />
            </svg>

            <div className={`node pill ${isNodeActive('start') ? 'active' : ''}`} style={{ top: '10%', left: '50%' }}>
              Inicio: array.find()
            </div>
            <div className={`node ${isNodeActive('iter') ? 'active' : ''}`} style={{ top: '26%', left: '50%' }}>
              Iterar
              <div className="sub">idx = {currentIdx}</div>
            </div>
            <div className={`node decision ${isNodeActive('check') ? 'active' : ''}`} style={{ top: '45%', left: '50%' }}>
              <span>¿idx &lt; length?</span>
            </div>
            <div className={`node ${isNodeActive('eval') ? 'active' : ''}`} style={{ top: '65%', left: '50%' }}>
              Evaluar Condición
              <div className="sub" style={{ color: 'var(--text-main)' }}>n &gt; {conditionVal}</div>
            </div>
            <div className={`node decision ${isNodeActive('dec') ? 'active' : ''}`} style={{ top: '86%', left: '50%' }}>
              <span>¿Es true?</span>
            </div>
            <div className={`node pill ret-fail ${isNodeActive('fail') ? 'active' : ''}`} style={{ top: '45%', left: '18%' }}>
              Return undefined
            </div>
            <div className={`node pill ret-success ${isNodeActive('success') ? 'active' : ''}`} style={{ top: '86%', left: '82%' }}>
              Return Elemento
            </div>

            <div className={`edge-label yes ${phase === 'check' ? 'active yes' : ''}`} style={{ top: '55%', left: '54%' }}>Sí</div>
            <div className={`edge-label no ${phase === 'fail_path' ? 'active no' : ''}`} style={{ top: '40%', left: '33%' }}>No</div>
            <div className={`edge-label yes ${phase === 'success_path' ? 'active yes' : ''}`} style={{ top: '82%', left: '68%' }}>Sí</div>
            <div className={`edge-label no ${(phase === 'loop_path' || (phase === 'decision' && arrayData[currentIdx] <= conditionVal)) ? 'active no' : ''}`} style={{ top: '92%', left: '28%' }}>No</div>
          </div>
        </div>

        <div className="console-wrapper">
          <div className="console-header">
            <span>Terminal de Depuración</span>
            <span style={{ color: 'var(--text-muted)' }}>● {isAutoPlaying ? 'Auto' : 'Listo'}</span>
          </div>
          <div className="console-body" ref={consoleRef}>
            {logs.map((log, i) => (
              <div key={i} className={`log-line ${log.className}`}>{log.text}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}