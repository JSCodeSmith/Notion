import { useEffect, useMemo, useState } from 'react'
import CodeBlock from '../CodeBlock/CodeBlock'
import '../SimuladorFind/SimuladorFind.css' // reutiliza tus estilos del simulador

const USUARIOS = [
  { id: 1, nombre: 'Josue' },
  { id: 2, nombre: 'Ana' },
  { id: 3, nombre: 'Carlos' },
  { id: 4, nombre: 'María' },
  { id: 5, nombre: 'Pedro' },
]

const TRANSACCIONES = [
  { id: 1, tipo: 'deposito' },
  { id: 2, tipo: 'retiro' },
  { id: 3, tipo: 'deposito' },
  { id: 4, tipo: 'retiro' },
  { id: 5, tipo: 'retiro' },
]

const HERRAMIENTAS = ['React', 'Notion', 'Vite', 'Notion', 'Node']

const mostrarUsuario = (u) => `{ id: ${u.id}, nombre: "${u.nombre}" }`
const mostrarTransaccion = (t) => `{ id: ${t.id}, tipo: "${t.tipo}" }`
const mostrarTexto = (s) => `"${s}"`
const EDADES = [12, 15, 20, 14]

const CONFIGS = {

some: {
    nombre: 'array.some()',
    items: EDADES,
    reversa: false,
    retorna: 'booleano',
    inputType: 'number',
    valorInicial: '18',
    mostrar: (n) => String(n),
    match: (n, v) => n >= Number(v),
    cond: (n, v) => `${n} >= ${v}`,
    condFalla: (n, v) => `${n} >= ${v} es false`,
    etiqueta: (v) => `con edad >= ${v}`,
    codigo: (v) => `const hayAdulto = edades.some(edad => edad >= ${v});`,
},

  findindex: {
    nombre: 'array.findIndex()',
    items: USUARIOS,
    reversa: false,
    retorna: 'indice',
    inputType: 'number',
    valorInicial: '3',
    mostrar: mostrarUsuario,
    match: (u, v) => u.id === Number(v),
    cond: (u, v) => `${u.id} === ${v}`,
    codigo: (v) => `const resultado = usuarios.findIndex(u => u.id === ${v});`,
  },
  findlast: {
    nombre: 'array.findLast()',
    items: TRANSACCIONES,
    reversa: true,
    retorna: 'elemento',
    inputType: 'text',
    valorInicial: 'deposito',
    mostrar: mostrarTransaccion,
    match: (t, v) => t.tipo === v,
    cond: (t, v) => `"${t.tipo}" === "${v}"`,
    codigo: (v) => `const resultado = transacciones.findLast(t => t.tipo === "${v}");`,
  },
  findlastindex: {
    nombre: 'array.findLastIndex()',
    items: TRANSACCIONES,
    reversa: true,
    retorna: 'indice',
    inputType: 'text',
    valorInicial: 'deposito',
    mostrar: mostrarTransaccion,
    match: (t, v) => t.tipo === v,
    cond: (t, v) => `"${t.tipo}" === "${v}"`,
    codigo: (v) => `const resultado = transacciones.findLastIndex(t => t.tipo === "${v}");`,
  },
  indexof: {
    nombre: 'array.indexOf()',
    items: HERRAMIENTAS,
    reversa: false,
    retorna: 'indice',
    inputType: 'text',
    valorInicial: 'Notion',
    mostrar: mostrarTexto,
    match: (s, v) => s === v,
    cond: (s, v) => `"${s}" === "${v}"`,
    codigo: (v) => `const resultado = herramientas.indexOf("${v}");`,
  },
  lastindexof: {
    nombre: 'array.lastIndexOf()',
    items: HERRAMIENTAS,
    reversa: true,
    retorna: 'indice',
    inputType: 'text',
    valorInicial: 'Notion',
    mostrar: mostrarTexto,
    match: (s, v) => s === v,
    cond: (s, v) => `"${s}" === "${v}"`,
    codigo: (v) => `const resultado = herramientas.lastIndexOf("${v}");`,
  },
}

export default function SimuladorBusqueda({ metodoId }) {
  const config = CONFIGS[metodoId]

  const [valor, setValor] = useState(config.valorInicial)
  const [paso, setPaso] = useState(0) // cuántos pasos de la traza se han revelado
  const [playing, setPlaying] = useState(false)

  // Traza completa de la ejecución: se calcula de una vez, sin efectos secundarios.
  const traza = useMemo(() => {
    const orden = config.items.map((_, i) => i)
    if (config.reversa) orden.reverse()

    const pasos = []
    for (const idx of orden) {
      const ok = config.match(config.items[idx], valor)
      pasos.push({ kind: 'eval', idx, ok })
      if (ok) return pasos // cortocircuito
    }
    pasos.push({ kind: 'fin' })
    return pasos
  }, [config, valor])

  // Avance automático (un paso por segundo)
  useEffect(() => {
    if (!playing) return
    if (paso >= traza.length) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setPaso((p) => p + 1), 1000)
    return () => clearTimeout(t)
  }, [playing, paso, traza.length])

  const reset = () => {
    setPlaying(false)
    setPaso(0)
  }

  const avanzar = () => setPaso((p) => Math.min(p + 1, traza.length))

  const toggleEjecutar = () => {
    if (playing) {
      setPlaying(false)
    } else {
      if (paso === 0) avanzar()
      setPlaying(true)
    }
  }

  // ---- Estado derivado ----
  const visibles = traza.slice(0, paso)
  const terminado = paso > 0 && paso === traza.length
  const ultimo = visibles[visibles.length - 1]
  const encontrado = terminado && ultimo?.kind === 'eval' && ultimo.ok
  const noEncontrado = terminado && ultimo?.kind === 'fin'

  const evals = visibles.filter((s) => s.kind === 'eval')
  const idxActual = evals.length ? evals[evals.length - 1].idx : -1
  const visitados = new Set(evals.map((s) => s.idx))

  const textoRetorno = (idx) => {
    if (config.retorna === 'booleano') return idx === null ? 'false' : 'true'

    if (idx === null) return config.retorna === 'indice' ? '-1' : 'undefined'
    return config.retorna === 'indice' ? String(idx) : config.mostrar(config.items[idx])
  }

  // Logs de la consola, construidos a partir de la traza
  const logs = []
  if (paso > 0) logs.push({ tipo: 'system', msg: `▶ Ejecutando ${config.nombre} ${config.etiqueta ? config.etiqueta(valor) : `buscando ${config.inputType === 'number' ? valor : `"${valor}"`}`}` })
  visibles.forEach((s) => {
    if (s.kind === 'eval') {
      const item = config.items[s.idx]
      logs.push({ tipo: 'iteration', msg: `> Evaluando [${s.idx}]: ${config.mostrar(item)}` })
      const cond = config.cond(item, valor)
      if (s.ok) {
        logs.push({ tipo: 'success', msg: `✅ Condición cumplida (${cond}). Cortocircuito.` })
        logs.push({ tipo: 'result', msg: `⏹ Retorna: ${textoRetorno(s.idx)}` })
      } else {
        logs.push({ tipo: 'error', msg: `❌ Condición fallida (${config.condFalla ? config.condFalla(item, valor) : cond.replace('===', '!==')}). Continuando...` })
      }
    } else {
      logs.push({ tipo: 'error', msg: '❌ Recorrido completo. Ningún elemento cumple la condición.' })
      logs.push({ tipo: 'result', msg: `⏹ Retorna: ${textoRetorno(null)}` })
    }
  })

  return (
    <div className="sim-container">
      <div className="sim-header">
        <h3>🔍 Simulador Interactivo: <code>{config.nombre}</code></h3>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">
          {config.nombre} · recorrido {config.reversa ? 'de derecha a izquierda ←' : 'de izquierda a derecha →'}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <CodeBlock code={config.codigo(valor)} />
        </div>

        <div className="sim-controls">
          <input
            type={config.inputType}
            value={valor}
            onChange={(e) => {
              setValor(e.target.value)
              reset()
            }}
            className="sim-input"
            style={{ width: config.inputType === 'number' ? '60px' : '130px' }}
            disabled={playing}
          />
          <button onClick={toggleEjecutar} className="sim-btn primary" disabled={terminado}>
            {playing ? '⏸ Pausar' : '▶ Ejecutar'}
          </button>
          <button onClick={avanzar} className="sim-btn" disabled={playing || terminado}>
            ⏭ Paso
          </button>
          <button onClick={reset} className="sim-btn">🔄 Reset</button>
        </div>
      </div>

      <div className="sim-array-container">
        {config.items.map((item, index) => {
          let boxClass = 'sim-box'
          if (visitados.has(index)) {
            if (noEncontrado) boxClass += ' is-failed'
            else if (index === idxActual) boxClass += encontrado ? ' is-found' : ' is-current'
            else boxClass += ' is-past'
          }

          return (
            <div key={index} className={boxClass}>
              <div className="box-inner">
                <span className="box-index">[{index}]</span>
                <span className="box-data">{config.mostrar(item)}</span>
              </div>
              {index === idxActual && !terminado && <div className="box-pointer">▼</div>}
            </div>
          )
        })}
      </div>

      <div className="sim-console">
        <div className="sim-console-header">Terminal</div>
        <div className="sim-console-body">
          {logs.length === 0 && <span className="log-system">Esperando ejecución...</span>}
          {logs.map((log, i) => (
            <div key={i} className={`log-${log.tipo}`}>{log.msg}</div>
          ))}
        </div>
      </div>
    </div>
  )
}