import { useState, useEffect, useRef } from 'react'
import './SimuladorFind.css'

const USUARIOS_INICIALES = [
  { id: 1, nombre: "Josue" },
  { id: 2, nombre: "Ana" },
  { id: 3, nombre: "Carlos" },
  { id: 4, nombre: "María" },
  { id: 5, nombre: "Pedro" }
]

export default function SimuladorFind() {
  const [idBuscado, setIdBuscado] = useState(3)
  const [estado, setEstado] = useState('idle') // idle | playing | paused | found | not-found
  const [indiceActual, setIndiceActual] = useState(-1)
  const [logs, setLogs] = useState([])

  const playIntervalRef = useRef(null)
  const nextIndexRef = useRef(0)

  // Limpiar intervalo si se desmonta el componente
  useEffect(() => {
    return () => {
      if (playIntervalRef.current) clearInterval(playIntervalRef.current)
    }
  }, [])

  const detenerIntervalo = () => {
    if (playIntervalRef.current) {
      clearInterval(playIntervalRef.current)
      playIntervalRef.current = null
    }
  }

  const agregarLog = (mensaje, tipo = 'info') => {
    setLogs(prev => [...prev, { id: `${Date.now()}-${Math.random()}`, mensaje, tipo }])
  }

  const resetSimulacion = () => {
    detenerIntervalo()
    nextIndexRef.current = 0
    setEstado('idle')
    setIndiceActual(-1)
    setLogs([])
  }

  // Toda la lógica vive fuera del actualizador de estado: así React puede
  // invocar los actualizadores dos veces en StrictMode sin duplicar logs.
  const ejecutarPaso = () => {
    const index = nextIndexRef.current

    if (index >= USUARIOS_INICIALES.length) {
      detenerIntervalo()
      setEstado('not-found')
      setIndiceActual(USUARIOS_INICIALES.length)
      agregarLog('❌ Recorrido completo. Ningún usuario cumple la condición.', 'error')
      agregarLog('⏹ Retorna: undefined', 'result')
      return
    }

    const usuarioActual = USUARIOS_INICIALES[index]
    setIndiceActual(index)
    agregarLog(
      `> Evaluando [${index}]: { id: ${usuarioActual.id}, nombre: "${usuarioActual.nombre}" }`,
      'iteration'
    )

    if (usuarioActual.id === Number(idBuscado)) {
      detenerIntervalo()
      nextIndexRef.current = index + 1
      setEstado('found')
      agregarLog(`✅ Condición cumplida (${usuarioActual.id} === ${idBuscado}). Cortocircuito.`, 'success')
      agregarLog(`⏹ Retorna: { id: ${usuarioActual.id}, nombre: "${usuarioActual.nombre}" }`, 'result')
    } else {
      nextIndexRef.current = index + 1
      agregarLog(`❌ Condición fallida (${usuarioActual.id} !== ${idBuscado}). Continuando...`, 'error')
    }
  }

  const iniciarSimulacion = () => {
    resetSimulacion()
    nextIndexRef.current = 0
    setEstado('playing')
    setIndiceActual(0)
    agregarLog(`▶ Ejecutando array.find(...) buscando id = ${idBuscado}`, 'system')
    playIntervalRef.current = setInterval(ejecutarPaso, 1000)
  }

  const togglePlayPause = () => {
    if (estado === 'playing') {
      detenerIntervalo()
      setEstado('paused')
    } else if (estado === 'paused') {
      setEstado('playing')
      playIntervalRef.current = setInterval(ejecutarPaso, 1000)
    } else if (estado === 'idle') {
      iniciarSimulacion()
    }
  }

  const pasoManual = () => {
    if (estado === 'found' || estado === 'not-found') return

    if (estado === 'idle') {
      nextIndexRef.current = 0
      setEstado('paused')
      setIndiceActual(0)
      agregarLog(`▶ Ejecutando array.find(...) buscando id = ${idBuscado}`, 'system')
    }

    ejecutarPaso()
  }

  return (
    <div className="sim-container">
      <div className="sim-header">
        <h3>🔍 Simulador Interactivo: <code>array.find()</code></h3>
      </div>

      {/* EDITOR DE CÓDIGO FALSO */}
      <div className="sim-editor">
        <div className="sim-editor-header">Array.prototype.find()</div>
        <div className="sim-code">
          <span className="code-purple">const</span> resultado <span className="code-blue">=</span> usuarios.<span className="code-yellow">find</span>(u <span className="code-blue">=&gt;</span> u.id <span className="code-blue">===</span> <span className="code-orange">{idBuscado}</span>);
        </div>
        <div className="sim-controls">
          <input
            type="number"
            value={idBuscado}
            onChange={(e) => {
              setIdBuscado(e.target.value)
              resetSimulacion()
            }}
            className="sim-input"
            disabled={estado === 'playing'}
            aria-label="ID que quieres buscar"
          />
          <button
            onClick={togglePlayPause}
            className="sim-btn primary"
            disabled={estado === 'found' || estado === 'not-found'}
            type="button"
          >
            {estado === 'playing' ? '⏸ Pausar' : estado === 'paused' ? '▶ Continuar' : '▶ Ejecutar'}
          </button>
          <button
            onClick={pasoManual}
            className="sim-btn"
            disabled={estado === 'playing' || estado === 'found' || estado === 'not-found'}
            type="button"
          >
            ⏭ Paso
          </button>
          <button onClick={resetSimulacion} className="sim-btn" type="button">
            🔄 Reset
          </button>
        </div>
      </div>

      {/* VISUALIZACIÓN DEL ARRAY */}
      <div className="sim-array-container">
        {USUARIOS_INICIALES.map((user, index) => {
          let boxClass = "sim-box"
          if (estado !== 'idle' && index < indiceActual) boxClass += " is-past"
          if ((estado === 'playing' || estado === 'paused') && index === indiceActual) boxClass += " is-current"
          if (estado === 'found' && index === indiceActual) boxClass += " is-found"
          if (estado === 'not-found' && index <= indiceActual) boxClass += " is-failed"

          return (
            <div key={user.id} className={boxClass}>
              <div className="box-inner">
                <span className="box-index">[{index}]</span>
                <span className="box-data">{`{ id: ${user.id}, nombre: "${user.nombre}" }`}</span>
              </div>
              {index === indiceActual && estado === 'playing' && <div className="box-pointer">▼</div>}
            </div>
          )
        })}
      </div>

      {/* CONSOLA */}
      <div className="sim-console">
        <div className="sim-console-header">Terminal</div>
        <div className="sim-console-body">
          {logs.length === 0 && <span className="log-system">Esperando ejecución...</span>}
          {logs.map((log) => (
            <div key={log.id} className={`log-${log.tipo}`}>
              {log.mensaje}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
