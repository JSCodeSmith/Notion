import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../SimuladorFind/SimuladorFindInteractivo.css';
import { formatValue } from '../SimuladorFind/findTrace';
import { ejecutarDemo, formatearResultado } from './ejecutarMetodo';
import { obtenerDemo, obtenerFamilia, obtenerNombre } from './metodosMeta';

const claseLog = (tipo) => {
  if (tipo === 'success') return 'log-success';
  if (tipo === 'error') return 'log-error';
  if (tipo === 'return') return 'log-return';
  if (tipo === 'eval') return 'log-eval';
  return 'log-info';
};

const clonar = (valor) => {
  try {
    return JSON.parse(JSON.stringify(valor));
  } catch {
    return valor;
  }
};

const leerValor = (texto) => {
  try {
    return new Function(`return (${texto});`)();
  } catch {
    return texto;
  }
};

const TEXTO = {
  busqueda: 'Recorrido de búsqueda: se detiene en la primera coincidencia.',
  transformacion: 'Recorrido completo: construye una salida nueva.',
  mutador: 'Mutación en el sitio: el array cambia mientras avanza.',
  reduccion: 'Recorrido de reducción: el acumulador se actualiza en cada paso.',
  iterador: 'Recorrido de iteración: cada paso produce un valor.',
  utilidad: 'Cálculo directo: no hay recorrido con callback.',
};

export default function SimuladorMetodo({ metodo }) {
  const familia = obtenerFamilia(metodo.id);
  const nombre = obtenerNombre(metodo.id);
  const demoBase = obtenerDemo(metodo.id);
  const tieneCallback = Boolean(demoBase.fn);
  const tieneLimite = demoBase.limite !== undefined;

  const [items, setItems] = useState(() => clonar(demoBase.array ?? []));
  const [limite, setLimite] = useState(String(demoBase.limite ?? ''));
  const [buscar, setBuscar] = useState(
    demoBase.buscar !== undefined ? String(demoBase.buscar) : ''
  );
  const [velocidad, setVelocidad] = useState(1000);

  const [plan, setPlan] = useState(null);
  const [paso, setPaso] = useState(-1);
  const [estados, setEstados] = useState({});
  const [resultado, setResultado] = useState(null);
  const [terminado, setTerminado] = useState(false);
  const [corriendo, setCorriendo] = useState(false);
  const [editando, setEditando] = useState(null);
  const [entrada, setEntrada] = useState('');

  const [logs, setLogs] = useState([
    { texto: '> Esperando ejecución...', tipo: 'info' },
  ]);

  const historial = useRef([]);
  const terminalRef = useRef(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const agregarLog = (texto, tipo = 'info') =>
    setLogs((prev) => [...prev, { texto, tipo }]);

  const limpiar = () => {
    setPlan(null);
    setPaso(-1);
    setEstados({});
    setResultado(null);
    setTerminado(false);
    setCorriendo(false);
    historial.current = [];
    setLogs([{ texto: '> Esperando ejecución...', tipo: 'info' }]);
  };

  const opciones = useMemo(() => {
    const base = { arreglo: items };
    if (tieneLimite && limite !== '') base.limite = limite;
    if (demoBase.buscar !== undefined && buscar !== '') base.valor = leerValor(buscar);
    return base;
  }, [items, limite, buscar, tieneLimite, demoBase.buscar]);

  const calcular = useCallback(() => {
    try {
      return ejecutarDemo(metodo.id, opciones);
    } catch {
      return ejecutarDemo(metodo.id);
    }
  }, [metodo.id, opciones]);

  const aplicarPaso = (nuevoPlan, indice) => {
    const p = nuevoPlan.pasos[indice];
    if (!p) return;

    if (p.index >= 0) {
      setEstados((prev) => {
        const copia = { ...prev };
        if (p.tipo === 'success') copia[p.index] = 'found';
        else if (p.tipo === 'error') copia[p.index] = 'discarded';
        else copia[p.index] = 'evaluating';
        return copia;
      });
    }

    if (p.fase === 'mutar' && p.array) {
      setItems(clonar(p.array));
    }

    if (p.msg) agregarLog(p.msg, p.tipo);
  };

  const avanzar = useCallback(() => {
    if (!plan) return false;
    const siguiente = paso + 1;
    if (siguiente >= plan.pasos.length) {
      setTerminado(true);
      setCorriendo(false);
      setResultado(plan.result);
      const final = formatearResultado(metodo.id, plan.result);
      agregarLog(`■ Retorna: ${final}`, 'return');
      if (plan.muta) {
        agregarLog(
          `> El array queda como [${(plan.finalArray ?? []).map(formatValue).join(', ')}]`,
          'info'
        );
      }
      return false;
    }
    historial.current.push({
      paso,
      estados,
      items: clonar(items),
      resultado,
      logs,
    });
    setPaso(siguiente);
    aplicarPaso(plan, siguiente);
    return true;
  }, // eslint-disable-next-line react-hooks/exhaustive-deps
    [plan, paso, metodo.id, estados, items, resultado, logs]);

  useEffect(() => {
    if (!corriendo) return;
    const timer = setTimeout(() => {
      const quedan = avanzar();
      if (!quedan) setCorriendo(false);
    }, velocidad);
    return () => clearTimeout(timer);
  }, [corriendo, paso, velocidad, avanzar]);

  const ejecutar = () => {
    limpiar();
    const nuevo = calcular();
    setPlan(nuevo);
    setPaso(-1);
    setCorriendo(true);
    agregarLog(`▶ Ejecutando ${nombre}...`, 'info');
  };

  const pasoAPaso = () => {
    if (corriendo) return;
    let actual = plan;
    if (!actual || terminado) {
      limpiar();
      actual = calcular();
      setPlan(actual);
      setPaso(-1);
      agregarLog(`▶ Ejecutando ${nombre}...`, 'info');
      return;
    }
    avanzar();
  };

  const atras = () => {
    if (historial.current.length === 0) return;
    setCorriendo(false);
    const prev = historial.current.pop();
    setPaso(prev.paso);
    setEstados(prev.estados);
    setItems(prev.items);
    setResultado(prev.resultado);
    setLogs(prev.logs);
    setTerminado(false);
  };

  const reordenar = (desde, hasta) => {
    if (desde === hasta) return;
    const copia = [...items];
    const [movido] = copia.splice(desde, 1);
    copia.splice(hasta, 0, movido);
    setItems(copia);
    limpiar();
  };

  const eliminar = (indice) => {
    setItems(items.filter((_, i) => i !== indice));
    limpiar();
  };

  const agregar = () => {
    if (!entrada.trim()) return;
    setItems([...items, leerValor(entrada)]);
    setEntrada('');
    limpiar();
  };

  const editar = (indice, texto) => {
    setItems(items.map((valor, i) => (i === indice ? leerValor(texto) : valor)));
    limpiar();
    setEditando(null);
  };

  const arrastrado = useRef(null);

  const lineas = (demoBase.code ?? '').split('\n');

  const estadoClase = (indice) => {
    const estado = estados[indice];
    if (estado === 'found') return 'sfi-found';
    if (estado === 'evaluating') return 'sfi-evaluating';
    if (estado === 'discarded') return 'sfi-discarded';
    return '';
  };

  return (
    <div className="sfi-container">
      <div className="sfi-code-panel">
        {lineas.map((linea, i) => (
          <div className="sfi-code-line" key={`${metodo.id}-code-${i}`}>
            <span className="sfi-line-number">{i + 1}</span>
            <span>{linea}</span>
          </div>
        ))}
      </div>

      <div className="sfi-controls-bar">
        {tieneLimite && (
          <div className="sfi-input-group">
            <label>Condición:</label>
            <input
              type="number"
              value={limite}
              onChange={(e) => {
                setLimite(e.target.value);
                limpiar();
              }}
            />
          </div>
        )}

        {demoBase.buscar !== undefined && (
          <div className="sfi-input-group">
            <label>Buscar:</label>
            <input
              type="text"
              value={buscar}
              onChange={(e) => {
                setBuscar(e.target.value);
                limpiar();
              }}
            />
          </div>
        )}

        <div className="sfi-input-group">
          <label>Añadir:</label>
          <input
            type="text"
            value={entrada}
            placeholder="42 o &quot;texto&quot;"
            onChange={(e) => setEntrada(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && agregar()}
          />
        </div>

        <div style={{ flexGrow: 1 }} />

        <div className="sfi-input-group">
          <label>Velocidad:</label>
          <select value={velocidad} onChange={(e) => setVelocidad(Number(e.target.value))}>
            <option value={2000}>0.5x</option>
            <option value={1000}>1x</option>
            <option value={500}>2x</option>
          </select>
        </div>

        <button type="button" className="sfi-btn" onClick={limpiar}>
          🔄 Reset
        </button>
        <button
          type="button"
          className="sfi-btn"
          onClick={atras}
          disabled={historial.current.length === 0 || corriendo}
        >
          ⏪ Atrás
        </button>
        <button
          type="button"
          className="sfi-btn sfi-primary"
          onClick={pasoAPaso}
          disabled={corriendo}
        >
          ⏭️ Paso a Paso
        </button>
        <button type="button" className="sfi-btn sfi-primary" onClick={ejecutar}>
          {corriendo ? '⏸️ Pausar' : '▶️ Ejecutar'}
        </button>
      </div>

      <div className="sfi-array-panel">
        {items.map((valor, index) => (
          <div
            key={`${metodo.id}-item-${index}`}
            className={`sfi-array-item ${estadoClase(index)}`}
            draggable
            onDragStart={(e) => {
              arrastrado.current = index;
              e.dataTransfer.effectAllowed = 'move';
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (arrastrado.current !== null) reordenar(arrastrado.current, index);
              arrastrado.current = null;
            }}
          >
            <div className="sfi-index-badge">[{index}]</div>

            {editando === index ? (
              <input
                type="text"
                className="sfi-edit-input"
                defaultValue={formatValue(valor)}
                autoFocus
                onBlur={(e) => editar(index, e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') editar(index, e.currentTarget.value);
                  if (e.key === 'Escape') setEditando(null);
                }}
              />
            ) : (
              <div
                className="sfi-emoji-display"
                onClick={() => setEditando(index)}
                title="Clic para editar"
              >
                {formatValue(valor)}
              </div>
            )}

            <div className="sfi-item-actions">
              <button type="button" className="sfi-btn-edit" onClick={() => setEditando(index)}>
                ✏️ Edit
              </button>
              <button
                type="button"
                className="sfi-btn-delete"
                onClick={() => eliminar(index)}
                aria-label={`Eliminar ${index}`}
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && <div className="sfi-result fail">El array está vacío.</div>}
      </div>

      {terminado && (
        <div className={`sfi-result ${plan?.muta ? 'success' : 'success'}`} role="status">
          ✅ {nombre} devolvió {formatearResultado(metodo.id, resultado)}
          {plan?.muta && ' · el array original cambió'}
        </div>
      )}

      <div className="sfi-terminal-panel">
        <div className="sfi-terminal-header">
          TERMINAL DE SALIDA &amp; DEPURACIÓN · {TEXTO[familia]}
        </div>
        <div className="sfi-terminal-body" ref={terminalRef}>
          {logs.map((log, i) => (
            <div
              key={`${metodo.id}-log-sim-${i}`}
              className={`sfi-log-line ${claseLog(log.tipo)}`}
            >
              {log.texto}
            </div>
          ))}
          {tieneCallback && paso === -1 && !corriendo && (
            <div className="sfi-log-line log-info">
              &gt; El callback se ejecuta de verdad: cada paso viene de la traza real.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
