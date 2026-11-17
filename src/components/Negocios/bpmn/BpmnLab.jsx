import { useEffect, useMemo, useRef, useState } from 'react'
import './BpmnLab.css'

/* ================================================================== */
/* 1. LIENZO BPMN                                                      */
/* ================================================================== */

const PLANTILLAS = {
  compra: {
    nombre: 'Compra',
    nodos: [
      { id: 'inicio', tipo: 'inicio', label: 'Inicio', x: 70, y: 180 },
      { id: 'solicitud', tipo: 'tarea', label: 'Recibir solicitud', x: 210, y: 150 },
      { id: 'validar', tipo: 'tarea', label: 'Validar datos', x: 370, y: 150 },
      { id: 'decidir', tipo: 'compuerta', label: '¿Aprobada?', x: 540, y: 150 },
      { id: 'comprar', tipo: 'tarea', label: 'Emitir compra', x: 690, y: 55 },
      { id: 'devolver', tipo: 'tarea', label: 'Devolver al área', x: 690, y: 250 },
      { id: 'fin', tipo: 'fin', label: 'Fin', x: 860, y: 180 },
    ],
    flujos: [
      { from: 'inicio', to: 'solicitud' },
      { from: 'solicitud', to: 'validar' },
      { from: 'validar', to: 'decidir' },
      { from: 'decidir', to: 'comprar', label: 'Sí' },
      { from: 'decidir', to: 'devolver', label: 'No' },
      { from: 'comprar', to: 'fin' },
      { from: 'devolver', to: 'fin' },
    ],
  },
  onboarding: {
    nombre: 'Onboarding',
    nodos: [
      { id: 'inicio', tipo: 'inicio', label: 'Inicio', x: 70, y: 180 },
      { id: 'bienvenida', tipo: 'tarea', label: 'Dar bienvenida', x: 220, y: 150 },
      { id: 'documentos', tipo: 'tarea', label: 'Recibir documentos', x: 380, y: 150 },
      { id: 'decidir', tipo: 'compuerta', label: '¿Completos?', x: 550, y: 150 },
      { id: 'acceso', tipo: 'tarea', label: 'Crear accesos', x: 700, y: 55 },
      { id: 'recordar', tipo: 'tarea', label: 'Enviar recordatorio', x: 700, y: 250 },
      { id: 'fin', tipo: 'fin', label: 'Fin', x: 860, y: 180 },
    ],
    flujos: [
      { from: 'inicio', to: 'bienvenida' },
      { from: 'bienvenida', to: 'documentos' },
      { from: 'documentos', to: 'decidir' },
      { from: 'decidir', to: 'acceso', label: 'Sí' },
      { from: 'decidir', to: 'recordar', label: 'No' },
      { from: 'acceso', to: 'fin' },
      { from: 'recordar', to: 'fin' },
    ],
  },
  soporte: {
    nombre: 'Soporte',
    nodos: [
      { id: 'inicio', tipo: 'inicio', label: 'Inicio', x: 70, y: 180 },
      { id: 'ticket', tipo: 'tarea', label: 'Recibir ticket', x: 220, y: 150 },
      { id: 'clasificar', tipo: 'tarea', label: 'Clasificar', x: 380, y: 150 },
      { id: 'decidir', tipo: 'compuerta', label: '¿Urgente?', x: 550, y: 150 },
      { id: 'escalar', tipo: 'tarea', label: 'Escalar a nivel 2', x: 700, y: 55 },
      { id: 'resolver', tipo: 'tarea', label: 'Resolver en nivel 1', x: 700, y: 250 },
      { id: 'fin', tipo: 'fin', label: 'Fin', x: 860, y: 180 },
    ],
    flujos: [
      { from: 'inicio', to: 'ticket' },
      { from: 'ticket', to: 'clasificar' },
      { from: 'clasificar', to: 'decidir' },
      { from: 'decidir', to: 'escalar', label: 'Sí' },
      { from: 'decidir', to: 'resolver', label: 'No' },
      { from: 'escalar', to: 'fin' },
      { from: 'resolver', to: 'fin' },
    ],
  },
}

const DIM = {
  inicio: { w: 56, h: 56 },
  fin: { w: 56, h: 56 },
  tarea: { w: 148, h: 64 },
  compuerta: { w: 64, h: 64 },
}

const ICONO = { inicio: '▶', fin: '■', tarea: '▭', compuerta: '◇' }

const NUEVO = { tarea: 'Tarea nueva', compuerta: '¿Condición?', inicio: 'Inicio', fin: 'Fin' }

function Lienzo() {
  const [plantilla, setPlantilla] = useState('compra')
  const [nodos, setNodos] = useState(PLANTILLAS.compra.nodos)
  const [flujos, setFlujos] = useState(PLANTILLAS.compra.flujos)
  const [sel, setSel] = useState('decidir')
  const [arrastre, setArrastre] = useState(null)
  const [aviso, setAviso] = useState('')
  const svgRef = useRef(null)
  const seqRef = useRef(0)

  const cambiarPlantilla = (id) => {
    const p = PLANTILLAS[id]
    setPlantilla(id)
    setNodos(p.nodos)
    setFlujos(p.flujos)
    setSel(null)
    setAviso('')
  }

  const nodo = nodos.find((n) => n.id === sel) ?? null

  const cambiar = (id, campo, valor) =>
    setNodos((prev) => prev.map((n) => (n.id === id ? { ...n, [campo]: valor } : n)))

  const borrar = () => {
    if (!sel) return
    setNodos((prev) => prev.filter((n) => n.id !== sel))
    setFlujos((prev) => prev.filter((f) => f.from !== sel && f.to !== sel))
    setSel(null)
  }

  const insertar = (tipo) => {
    seqRef.current += 1
    const id = `${tipo}-${seqRef.current}`
    const base = nodos.find((n) => n.id === sel) ?? nodos[nodos.length - 1]
    const dim = DIM[tipo]
    const nuevo = {
      id,
      tipo,
      label: NUEVO[tipo],
      x: Math.min(880, (base?.x ?? 250) + 170),
      y: Math.min(330, Math.max(20, (base?.y ?? 160) + 90)),
    }
    setNodos((prev) => [...prev, nuevo])

    if (base) {
      const salientes = flujos.filter((f) => f.from === base.id)
      if (salientes.length === 1) {
        const objetivo = salientes[0].to
        setFlujos((prev) => [
          ...prev.filter((f) => !(f.from === base.id && f.to === objetivo)),
          { from: base.id, to: id },
          { from: id, to: objetivo },
        ])
      } else {
        setFlujos((prev) => [...prev, { from: base.id, to: id }])
      }
    }
    setSel(id)
    setAviso(`${tipo === 'tarea' ? 'Tarea' : tipo === 'compuerta' ? 'Compuerta' : 'Evento'} añadido y conectado.`)
    return dim
  }

  const exportar = () => {
    const svg = svgRef.current
    if (!svg) return
    const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `proceso-${plantilla}.svg`
    a.click()
    URL.revokeObjectURL(url)
    setAviso('Diagrama exportado como SVG.')
  }

  const mover = (e) => {
    if (!arrastre) return
    const svg = svgRef.current
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 1000
    const y = ((e.clientY - rect.top) / rect.height) * 400
    setNodos((prev) =>
      prev.map((n) =>
        n.id === arrastre.id
          ? {
              ...n,
              x: Math.max(20, Math.min(930, x - arrastre.dx)),
              y: Math.max(20, Math.min(350, y - arrastre.dy)),
            }
          : n
      )
    )
  }

  const dimDe = (n) => DIM[n.tipo] ?? DIM.tarea

  const centro = (n) => {
    const d = dimDe(n)
    return { x: n.x, y: n.y, w: d.w, h: d.h }
  }

  const ancla = (a, b) => {
    const A = centro(a)
    const B = centro(b)
    const dx = B.x - A.x
    const dy = B.y - A.y
    if (Math.abs(dx) >= Math.abs(dy)) {
      return { x: A.x + Math.sign(dx || 1) * (A.w / 2), y: A.y }
    }
    return { x: A.x, y: A.y + Math.sign(dy || 1) * (A.h / 2) }
  }

  const ruta = (f) => {
    const a = nodos.find((n) => n.id === f.from)
    const b = nodos.find((n) => n.id === f.to)
    if (!a || !b) return null
    const p1 = ancla(a, b)
    const p2 = ancla(b, a)
    const horizontal = Math.abs(b.x - a.x) >= Math.abs(b.y - a.y)
    const mid = horizontal ? (p1.x + p2.x) / 2 : (p1.y + p2.y) / 2
    const d = horizontal
      ? `M ${p1.x} ${p1.y} H ${mid} V ${p2.y} H ${p2.x}`
      : `M ${p1.x} ${p1.y} V ${mid} H ${p2.x} V ${p2.y}`
    const lx = horizontal ? mid : (p1.x + p2.x) / 2
    const ly = horizontal ? (p1.y + p2.y) / 2 : mid
    return { d, lx, ly }
  }

  return (
    <div className="bpmn-canvas">
      <div className="bpmn-toolbar">
        <div className="bpmn-toolbar__group">
          <span className="bpmn-toolbar__label">Plantilla</span>
          {Object.entries(PLANTILLAS).map(([id, p]) => (
            <button
              key={id}
              type="button"
              className={`bpmn-chip ${plantilla === id ? 'is-active' : ''}`}
              onClick={() => cambiarPlantilla(id)}
            >
              {p.nombre}
            </button>
          ))}
        </div>
        <div className="bpmn-toolbar__group">
          <span className="bpmn-toolbar__label">Insertar</span>
          {['tarea', 'compuerta', 'inicio', 'fin'].map((t) => (
            <button key={t} type="button" className="bpmn-chip" onClick={() => insertar(t)}>
              {ICONO[t]} {t}
            </button>
          ))}
          <button type="button" className="bpmn-chip bpmn-chip--danger" onClick={borrar} disabled={!sel}>
            🗑 Borrar
          </button>
          <button type="button" className="bpmn-chip bpmn-chip--primary" onClick={exportar}>
            ⬇ Exportar SVG
          </button>
        </div>
      </div>

      <div className="bpmn-canvas__body">
        <div className="bpmn-stage">
          <svg
            ref={svgRef}
            viewBox="0 0 1000 400"
            className="bpmn-svg"
            onPointerMove={mover}
            onPointerUp={() => setArrastre(null)}
            onPointerLeave={() => setArrastre(null)}
            onPointerDown={() => setSel(null)}
            role="img"
            aria-label="Lienzo de diagrama BPMN editable"
          >
            <defs>
              <pattern id="bpmn-grid" width="25" height="25" patternUnits="userSpaceOnUse">
                <path d="M 25 0 L 0 0 0 25" fill="none" stroke="#1e2a3e" strokeWidth="1" />
              </pattern>
              <marker id="bpmn-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#6ea8fe" />
              </marker>
            </defs>
            <rect width="1000" height="400" fill="#0d1420" />
            <rect width="1000" height="400" fill="url(#bpmn-grid)" />

            {flujos.map((f, i) => {
              const r = ruta(f)
              if (!r) return null
              return (
                <g key={i} className="bpmn-edge">
                  <path d={r.d} fill="none" stroke="#6ea8fe" strokeWidth="2" markerEnd="url(#bpmn-arrow)" />
                  {f.label && (
                    <text x={r.lx} y={r.ly} textAnchor="middle" className="bpmn-edge__label">
                      {f.label}
                    </text>
                  )}
                </g>
              )
            })}

            {nodos.map((n) => {
              const d = dimDe(n)
              const activo = sel === n.id
              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x}, ${n.y})`}
                  className={`bpmn-node bpmn-node--${n.tipo} ${activo ? 'is-sel' : ''}`}
                  onPointerDown={(e) => {
                    e.stopPropagation()
                    setSel(n.id)
                    const svg = svgRef.current
                    if (!svg) return
                    const rect = svg.getBoundingClientRect()
                    setArrastre({
                      id: n.id,
                      dx: ((e.clientX - rect.left) / rect.width) * 1000 - n.x,
                      dy: ((e.clientY - rect.top) / rect.height) * 400 - n.y,
                    })
                  }}
                >
                  {n.tipo === 'inicio' || n.tipo === 'fin' ? (
                    <circle r={d.w / 2} className="bpmn-node__shape" />
                  ) : n.tipo === 'compuerta' ? (
                    <rect
                      x={-d.w / 2}
                      y={-d.h / 2}
                      width={d.w}
                      height={d.h}
                      transform="rotate(45)"
                      className="bpmn-node__shape"
                    />
                  ) : (
                    <rect
                      x={-d.w / 2}
                      y={-d.h / 2}
                      width={d.w}
                      height={d.h}
                      rx="10"
                      className="bpmn-node__shape"
                    />
                  )}

                  <text
                    y={n.tipo === 'compuerta' ? 4 : n.tipo === 'inicio' || n.tipo === 'fin' ? 5 : -3}
                    textAnchor="middle"
                    className="bpmn-node__text"
                  >
                    {n.tipo === 'inicio' ? '▶' : n.tipo === 'fin' ? '■' : n.label}
                  </text>
                  {n.tipo === 'tarea' && (
                    <text y="17" textAnchor="middle" className="bpmn-node__sub">
                      tarea
                    </text>
                  )}
                  {(n.tipo === 'inicio' || n.tipo === 'fin' || n.tipo === 'compuerta') && (
                    <text y={d.h / 2 + 18} textAnchor="middle" className="bpmn-node__caption">
                      {n.label}
                    </text>
                  )}
                </g>
              )
            })}
          </svg>
          {aviso && <p className="bpmn-aviso">{aviso}</p>}
        </div>

        <aside className="bpmn-inspector">
          <h4>Inspector</h4>
          {!nodo && <p className="bpmn-inspector__vacio">Selecciona un elemento del lienzo para editarlo o arrástralo para moverlo.</p>}
          {nodo && (
            <>
              <label className="bpmn-field">
                <span>Nombre</span>
                <input value={nodo.label} onChange={(e) => cambiar(nodo.id, 'label', e.target.value)} />
              </label>
              <div className="bpmn-field-row">
                <label className="bpmn-field">
                  <span>Tipo</span>
                  <select value={nodo.tipo} onChange={(e) => cambiar(nodo.id, 'tipo', e.target.value)}>
                    <option value="inicio">Evento de inicio</option>
                    <option value="tarea">Tarea</option>
                    <option value="compuerta">Compuerta</option>
                    <option value="fin">Evento de fin</option>
                  </select>
                </label>
                <label className="bpmn-field">
                  <span>X</span>
                  <input type="number" value={Math.round(nodo.x)} onChange={(e) => cambiar(nodo.id, 'x', Number(e.target.value))} />
                </label>
                <label className="bpmn-field">
                  <span>Y</span>
                  <input type="number" value={Math.round(nodo.y)} onChange={(e) => cambiar(nodo.id, 'y', Number(e.target.value))} />
                </label>
              </div>
              <p className="bpmn-inspector__hint">
                {nodo.tipo === 'compuerta'
                  ? 'Una compuerta decide el camino. Añade etiquetas Sí/No en los flujos.'
                  : nodo.tipo === 'tarea'
                    ? 'Una tarea representa trabajo realizado por una persona o sistema.'
                    : 'Los eventos marcan el inicio o el final del proceso.'}
              </p>
            </>
          )}

          <div className="bpmn-legend">
            <h5>Leyenda</h5>
            <p><span className="dot dot--start" /> Evento de inicio</p>
            <p><span className="dot dot--task" /> Tarea</p>
            <p><span className="dot dot--gate" /> Compuerta</p>
            <p><span className="dot dot--end" /> Evento de fin</p>
          </div>
        </aside>
      </div>
    </div>
  )
}

/* ================================================================== */
/* 2. SIMULADOR DE TOKENS                                              */
/* ================================================================== */

const PROCESO = {
  nodos: [
    { id: 'inicio', tipo: 'inicio', label: 'Inicio', x: 70, y: 190, texto: 'Llega una solicitud de compra.' },
    { id: 'recibir', tipo: 'tarea', label: 'Recibir solicitud', x: 230, y: 160, texto: 'El área usuaria registra la solicitud.' },
    { id: 'validar', tipo: 'tarea', label: 'Validar datos', x: 410, y: 160, texto: 'Compras revisa presupuesto y datos.' },
    { id: 'decidir', tipo: 'compuerta', label: '¿Datos completos?', x: 590, y: 160, texto: 'Compuerta exclusiva: elige Sí o No.' },
    { id: 'corregir', tipo: 'tarea', label: 'Solicitar corrección', x: 770, y: 300, texto: 'Se devuelve al área usuaria.' },
    { id: 'aprobar', tipo: 'tarea', label: 'Aprobar compra', x: 770, y: 55, texto: 'Se emite la orden de compra.' },
    { id: 'fin', tipo: 'fin', label: 'Fin', x: 930, y: 190, texto: 'El proceso termina.' },
  ],
  flujos: [
    { from: 'inicio', to: 'recibir' },
    { from: 'recibir', to: 'validar' },
    { from: 'validar', to: 'decidir' },
    { from: 'decidir', to: 'aprobar', label: 'Sí' },
    { from: 'decidir', to: 'corregir', label: 'No' },
    { from: 'corregir', to: 'validar', label: 'retorna' },
    { from: 'aprobar', to: 'fin' },
  ],
}

function TokenSimulator() {
  const [actual, setActual] = useState('inicio')
  const [visitados, setVisitados] = useState(['inicio'])
  const [pasos, setPasos] = useState(0)
  const [vueltas, setVueltas] = useState(0)
  const [logs, setLogs] = useState([{ tipo: 'info', texto: 'Token colocado en el evento de inicio.' }])
  const [auto, setAuto] = useState(false)
  const [velocidad, setVelocidad] = useState(900)

  const nodo = PROCESO.nodos.find((n) => n.id === actual)
  const salientes = PROCESO.flujos.filter((f) => f.from === actual)
  const terminado = actual === 'fin'

  const registrar = (texto, tipo = 'info') =>
    setLogs((prev) => [...prev.slice(-5), { tipo, texto }])

  const avanzar = (destino) => {
    const flujo = salientes.find((f) => f.to === destino)
    if (!flujo) return
    setActual(destino)
    setVisitados((prev) => [...prev, destino])
    setPasos((n) => n + 1)
    if (destino === 'validar' && visitados.includes('validar')) {
      setVueltas((n) => n + 1)
      registrar('El token vuelve a Validar datos: se completa una vuelta del ciclo.', 'warn')
    } else {
      const destinoNodo = PROCESO.nodos.find((n) => n.id === destino)
      registrar(`El token avanza a "${destinoNodo?.label ?? destino}".`)
    }
    if (destino === 'fin') registrar('El token llegó al evento de fin. Proceso completado.', 'ok')
  }

  const elegir = (f) => {
    if (f.to === 'corregir') {
      registrar('Compuerta: se elige el camino "No". El proceso pide corrección.', 'warn')
    } else {
      registrar('Compuerta: se elige el camino "Sí". Continúa la aprobación.', 'ok')
    }
    avanzar(f.to)
  }

  const avanzarRef = useRef(null)
  useEffect(() => {
    avanzarRef.current = avanzar
  })

  useEffect(() => {
    if (!auto) return
    const t = setTimeout(() => {
      if (actual === 'fin') {
        setAuto(false)
        return
      }
      if (actual === 'decidir') {
        setAuto(false)
        setLogs((prev) => [
          ...prev.slice(-5),
          { tipo: 'warn', texto: 'Pausa: la compuerta necesita una decisión manual.' },
        ])
        return
      }
      const saliente = PROCESO.flujos.find((f) => f.from === actual)
      if (saliente) avanzarRef.current?.(saliente.to)
      else setAuto(false)
    }, velocidad)
    return () => clearTimeout(t)
  }, [auto, actual, velocidad])

  const reiniciar = () => {
    setActual('inicio')
    setVisitados(['inicio'])
    setPasos(0)
    setVueltas(0)
    setAuto(false)
    setLogs([{ tipo: 'info', texto: 'Token recolocado en el evento de inicio.' }])
  }

  const estaActivo = (f) => visitados.includes(f.from) && visitados.includes(f.to)
  const rutaActiva = (f) => {
    if (!estaActivo(f)) return false
    const i = visitados.lastIndexOf(f.from)
    return visitados[i + 1] === f.to
  }

  return (
    <div className="bpmn-token">
      <div className="bpmn-token__head">
        <div>
          <h4>Token Simulation · Solicitud de compra</h4>
          <p>El token es el trabajo que recorre el proceso. Cada paso muestra qué actividad se ejecuta y qué decisión se toma.</p>
        </div>
        <div className="bpmn-token__stats">
          <span>Pasos <strong>{pasos}</strong></span>
          <span>Vueltas <strong>{vueltas}</strong></span>
          <span>Nodos <strong>{visitados.length}</strong></span>
        </div>
      </div>

      <div className="bpmn-token__layout">
        <div className="bpmn-token__stage">
          <svg viewBox="0 0 1020 380" className="bpmn-svg" role="img" aria-label="Simulación de tokens del proceso">
            <defs>
              <marker id="tok-arrow" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#50617f" />
              </marker>
            </defs>
            <rect width="1020" height="380" fill="#0d1420" rx="12" />
            {PROCESO.flujos.map((f, i) => {
              const a = PROCESO.nodos.find((n) => n.id === f.from)
              const b = PROCESO.nodos.find((n) => n.id === f.to)
              const p1 = anclaProceso(a, b)
              const p2 = anclaProceso(b, a)
              const horizontal = Math.abs(b.x - a.x) >= Math.abs(b.y - a.y)
              const mid = horizontal ? (p1.x + p2.x) / 2 : (p1.y + p2.y) / 2
              const d = horizontal
                ? `M ${p1.x} ${p1.y} H ${mid} V ${p2.y} H ${p2.x}`
                : `M ${p1.x} ${p1.y} V ${mid} H ${p2.x} V ${p2.y}`
              return (
                <g key={i}>
                  <path
                    d={d}
                    fill="none"
                    stroke={rutaActiva(f) ? '#4fd19b' : estaActivo(f) ? '#334766' : '#2a3348'}
                    strokeWidth={rutaActiva(f) ? 3 : 2}
                    markerEnd="url(#tok-arrow)"
                  />
                  {f.label && (
                    <text
                      x={horizontal ? mid : (p1.x + p2.x) / 2}
                      y={horizontal ? (p1.y + p2.y) / 2 : mid}
                      textAnchor="middle"
                      className="bpmn-edge__label"
                    >
                      {f.label}
                    </text>
                  )}
                </g>
              )
            })}

            {PROCESO.nodos.map((n) => {
              const active = visitados.includes(n.id)
              const current = actual === n.id
              const d = DIM[n.tipo]
              return (
                <g key={n.id} transform={`translate(${n.x}, ${n.y})`} className={`bpmn-token-node ${active ? 'is-visited' : ''} ${current ? 'is-current' : ''}`}>
                  {n.tipo === 'inicio' || n.tipo === 'fin' ? (
                    <circle r={d.w / 2} className="bpmn-node__shape" />
                  ) : n.tipo === 'compuerta' ? (
                    <rect x={-d.w / 2} y={-d.h / 2} width={d.w} height={d.h} transform="rotate(45)" className="bpmn-node__shape" />
                  ) : (
                    <rect x={-d.w / 2} y={-d.h / 2} width={d.w} height={d.h} rx="10" className="bpmn-node__shape" />
                  )}
                  <text textAnchor="middle" y={n.tipo === 'compuerta' ? 4 : n.tipo === 'inicio' ? 5 : n.tipo === 'fin' ? 5 : -3} className="bpmn-node__text">
                    {n.tipo === 'inicio' ? '▶' : n.tipo === 'fin' ? '■' : n.label}
                  </text>
                  {n.tipo === 'tarea' && <text y="17" textAnchor="middle" className="bpmn-node__sub">tarea</text>}
                  {(n.tipo === 'inicio' || n.tipo === 'fin' || n.tipo === 'compuerta') && (
                    <text y={d.h / 2 + 18} textAnchor="middle" className="bpmn-node__caption">{n.label}</text>
                  )}
                  {current && n.tipo !== 'inicio' && n.tipo !== 'fin' && (
                    <circle cx="0" cy={-d.h / 2 - 11} r="8" fill="#f0c56a" stroke="#0d1420" strokeWidth="2" />
                  )}
                </g>
              )
            })}
          </svg>

          <div className="bpmn-token__controls">
            <button type="button" className="bpmn-btn bpmn-btn--primary" onClick={reiniciar}>↺ Reiniciar</button>
            <button
              type="button"
              className="bpmn-btn"
              onClick={() => setAuto((v) => !v)}
              disabled={terminado || actual === 'decidir'}
            >
              {auto ? '⏸ Pausar' : '▶ Reproducir'}
            </button>
            <button
              type="button"
              className="bpmn-btn"
              onClick={() => {
                if (actual === 'decidir') return
                if (salientes[0]) avanzar(salientes[0].to)
              }}
              disabled={terminado || actual === 'decidir'}
            >
              Paso a paso →
            </button>
            <label className="bpmn-speed">
              Velocidad
              <select value={velocidad} onChange={(e) => setVelocidad(Number(e.target.value))}>
                <option value={1400}>Lenta</option>
                <option value={900}>Normal</option>
                <option value={450}>Rápida</option>
              </select>
            </label>
          </div>

          {actual === 'decidir' && (
            <div className="bpmn-decision">
              <strong>La compuerta necesita una decisión:</strong>
              <p>¿Los datos de la solicitud están completos?</p>
              <div>
                <button type="button" className="bpmn-btn bpmn-btn--ok" onClick={() => elegir({ to: 'aprobar' })}>
                  Sí, están completos
                </button>
                <button type="button" className="bpmn-btn bpmn-btn--warn" onClick={() => elegir({ to: 'corregir' })}>
                  No, faltan datos
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="bpmn-token__panel">
          <h5>Actividad actual</h5>
          {nodo && (
            <div className="bpmn-token__current">
              <span>{nodo.tipo === 'compuerta' ? '◇' : nodo.tipo === 'inicio' ? '▶' : nodo.tipo === 'fin' ? '■' : '▭'}</span>
              <div>
                <strong>{nodo.label}</strong>
                <p>{nodo.texto}</p>
              </div>
            </div>
          )}
          {terminado && (
            <div className="bpmn-token__done">
              ✅ Proceso completado en {pasos} pasos{vueltas ? ` y ${vueltas} vuelta(s) de corrección` : ' sin reprocesos'}.
            </div>
          )}
          <h5>Registro del token</h5>
          <ul className="bpmn-log">
            {logs.map((l, i) => (
              <li key={i} className={`is-${l.tipo}`}>{l.texto}</li>
            ))}
          </ul>
        </aside>
      </div>
    </div>
  )
}

function anclaProceso(a, b) {
  const da = DIM[a.tipo] ?? DIM.tarea
  const dx = b.x - a.x
  const dy = b.y - a.y
  if (Math.abs(dx) >= Math.abs(dy)) {
    return { x: a.x + Math.sign(dx || 1) * (da.w / 2), y: a.y }
  }
  return { x: a.x, y: a.y + Math.sign(dy || 1) * (da.h / 2) }
}

/* ================================================================== */
/* 3. MAPA CONCEPTUAL / GRAFO DE CONOCIMIENTO                          */
/* ================================================================== */

const MAPA_NODOS = [
  { id: 'inicio', x: 120, y: 90, icon: '▶', titulo: 'Eventos', desc: 'Sucesos que inician, pausan o terminan un proceso.', ejemplo: 'Inicio, temporizador, error, fin.' },
  { id: 'tareas', x: 390, y: 60, icon: '▭', titulo: 'Tareas', desc: 'Trabajo atómico que ejecuta una persona o un sistema.', ejemplo: 'Recibir solicitud, validar datos, aprobar.' },
  { id: 'compuertas', x: 665, y: 90, icon: '◇', titulo: 'Compuertas', desc: 'Decisiones que dividen o unen el flujo.', ejemplo: 'Exclusiva (XOR), paralela (AND), inclusiva (OR).' },
  { id: 'flujos', x: 790, y: 230, icon: '→', titulo: 'Flujos', desc: 'Conectan elementos y muestran la secuencia.', ejemplo: 'Flujo de secuencia, mensaje, asociación.' },
  { id: 'carriles', x: 665, y: 355, icon: '🏊', titulo: 'Carriles', desc: 'Organizan responsabilidades por rol o área.', ejemplo: 'Cliente, ventas, compras, finanzas.' },
  { id: 'subprocesos', x: 390, y: 390, icon: '⧉', titulo: 'Subprocesos', desc: 'Procesos dentro de otro proceso para reducir complejidad.', ejemplo: 'Validación documental incluida en compras.' },
  { id: 'artefactos', x: 120, y: 355, icon: '📄', titulo: 'Artefactos', desc: 'Información de apoyo al diagrama.', ejemplo: 'Anotaciones, grupos, objetos de datos.' },
  { id: 'reglas', x: 55, y: 225, icon: '📏', titulo: 'Reglas', desc: 'Buenas prácticas para diagramas claros y consistentes.', ejemplo: 'Un inicio, un fin, flujos etiquetados.' },
]

const MAPA_ENLACES = [
  ['inicio', 'tareas'], ['tareas', 'compuertas'], ['compuertas', 'flujos'],
  ['flujos', 'carriles'], ['carriles', 'subprocesos'], ['subprocesos', 'artefactos'],
  ['artefactos', 'reglas'], ['reglas', 'inicio'], ['tareas', 'carriles'],
  ['inicio', 'reglas'], ['compuertas', 'subprocesos'],
]

function ConceptMap() {
  const [sel, setSel] = useState('tareas')
  const [visitados, setVisitados] = useState([])
  const nodo = MAPA_NODOS.find((n) => n.id === sel)

  const abrir = (id) => {
    setSel(id)
    setVisitados((prev) => (prev.includes(id) ? prev : [...prev, id]))
  }

  return (
    <div className="bpmn-map">
      <div className="bpmn-map__head">
        <div>
          <h4>Mapa conceptual BPMN</h4>
          <p>Toca cada nodo para explorar cómo se conectan los elementos del estándar. Los nodos visitados quedan marcados.</p>
        </div>
        <span className="bpmn-map__count">{new Set(visitados).size} / {MAPA_NODOS.length} explorados</span>
      </div>

      <div className="bpmn-map__layout">
        <div className="bpmn-map__stage">
          <svg viewBox="0 0 900 470" className="bpmn-svg" role="img" aria-label="Mapa conceptual de BPMN">
            <rect width="900" height="470" fill="#0d1420" rx="14" />
            {MAPA_ENLACES.map(([a, b], i) => {
              const na = MAPA_NODOS.find((n) => n.id === a)
              const nb = MAPA_NODOS.find((n) => n.id === b)
              return <line key={i} x1={na.x} y1={na.y} x2={nb.x} y2={nb.y} stroke="#2b3a54" strokeWidth="1.5" />
            })}
            <circle cx="410" cy="225" r="54" fill="rgba(110,168,254,0.12)" stroke="#6ea8fe" strokeWidth="2" />
            <text x="410" y="220" textAnchor="middle" fill="#fff" fontSize="16" fontWeight="800">BPMN</text>
            <text x="410" y="240" textAnchor="middle" fill="#8d9ab7" fontSize="10">procesos de negocio</text>

            {MAPA_NODOS.map((n) => {
              const activo = sel === n.id
              const visto = visitados.includes(n.id)
              return (
                <g
                  key={n.id}
                  transform={`translate(${n.x}, ${n.y})`}
                  className="bpmn-map__node"
                  onClick={() => abrir(n.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && abrir(n.id)}
                >
                  <circle r={38} className={`bpmn-map__circle ${activo ? 'is-sel' : ''} ${visto ? 'is-seen' : ''}`} />
                  <text y="4" textAnchor="middle" fontSize="17">{n.icon}</text>
                  <text y="24" textAnchor="middle" className="bpmn-map__label">{n.titulo}</text>
                </g>
              )
            })}
          </svg>
        </div>

        <aside className="bpmn-map__panel">
          <span className="bpmn-map__icon">{nodo.icon}</span>
          <h4>{nodo.titulo}</h4>
          <p>{nodo.desc}</p>
          <div className="bpmn-map__example">
            <span>Ejemplo</span>
            <p>{nodo.ejemplo}</p>
          </div>
          <h5>Relacionado con</h5>
          <div className="bpmn-map__chips">
            {MAPA_ENLACES.filter(([a, b]) => a === nodo.id || b === nodo.id).map(([a, b]) => {
              const other = MAPA_NODOS.find((n) => n.id === (a === nodo.id ? b : a))
              return (
                <button key={other.id} type="button" onClick={() => abrir(other.id)}>
                  {other.icon} {other.titulo}
                </button>
              )
            })}
          </div>
        </aside>
      </div>
    </div>
  )
}

/* ================================================================== */
/* 4. SANDBOX DE DECISIONES BPMN                                       */
/* ================================================================== */

const RETOS = [
  {
    id: 1,
    icon: '🏦',
    titulo: 'Compuerta mal elegida',
    escenario: 'Un banco necesita que, si el cliente no firma el contrato, el proceso se detenga y espere la firma. ¿Qué compuerta modela mejor esa decisión?',
    opciones: [
      'Una compuerta paralela (AND) que abre ambos caminos a la vez.',
      'Una compuerta exclusiva (XOR) con dos salidas: firmado / no firmado.',
      'Una compuerta inclusiva (OR) que deja todas las salidas activas.',
      'Un evento de fin sin compuerta.',
    ],
    correcta: 1,
    explicacion: 'La compuerta exclusiva (XOR) elige un solo camino según la condición. Es la opción correcta cuando el proceso sigue por una ruta u otra, nunca por ambas.',
  },
  {
    id: 2,
    icon: '🚚',
    titulo: 'Trabajo en paralelo',
    escenario: 'Una tienda debe preparar el pedido y, al mismo tiempo, generar la factura y avisar al cliente. ¿Qué elemento BPMN representa mejor ese paralelismo?',
    opciones: [
      'Una tarea con tres responsables.',
      'Una compuerta paralela (AND) que divide y luego une los caminos.',
      'Tres eventos de inicio distintos.',
      'Un subproceso sin flujos.',
    ],
    correcta: 1,
    explicacion: 'La compuerta paralela (AND) activa todas las salidas a la vez. Luego se usa otra compuerta AND para sincronizar y continuar cuando terminan todas las ramas.',
  },
  {
    id: 3,
    icon: '⏰',
    titulo: 'El proceso se queda esperando',
    escenario: 'Un cliente debe responder una encuesta en 48 horas. Si no responde, el proceso debe continuar automáticamente. ¿Qué solución BPMN es la más adecuada?',
    opciones: [
      'Una tarea manual sin temporizador.',
      'Un evento intermedio con temporizador (timer) conectado a una ruta alternativa.',
      'Un evento de fin que cierre todo el proceso.',
      'Una anotación de texto que diga “esperar”.',
    ],
    correcta: 1,
    explicacion: 'El evento intermedio de temporizador espera un tiempo definido. Si se cumple, dispara una ruta alternativa; así el proceso no queda bloqueado indefinidamente.',
  },
  {
    id: 4,
    icon: '🧾',
    titulo: 'Responsabilidades difusas',
    escenario: 'En el diagrama no queda claro quién hace cada tarea: ventas, compras o finanzas. ¿Qué elemento de BPMN ayuda a ordenar esa responsabilidad?',
    opciones: [
      'Más compuertas exclusivas.',
      'Carriles (lanes) o pools que agrupan las tareas por rol o área.',
      'Cambiar todas las tareas por eventos.',
      'Un color distinto para cada tarea.',
    ],
    correcta: 1,
    explicacion: 'Los carriles (lanes) y pools organizan las actividades por participante. Hacen visible la responsabilidad y los handoffs entre áreas.',
  },
  {
    id: 5,
    icon: '🔁',
    titulo: 'Reproceso controlado',
    escenario: 'Si la validación de datos falla, la solicitud debe volver a “Recibir solicitud” sin reiniciar todo el proceso. ¿Cómo se modela?',
    opciones: [
      'Un flujo de secuencia que regresa desde la compuerta de validación a la tarea de recepción.',
      'Un nuevo evento de inicio para cada error.',
      'Eliminar la validación para evitar el problema.',
      'Un evento de fin que obligue a empezar de cero.',
    ],
    correcta: 0,
    explicacion: 'Un flujo de secuencia de retorno crea un ciclo de reproceso. Es correcto si el proceso debe corregir y volver a validar sin reiniciarse por completo.',
  },
  {
    id: 6,
    icon: '📏',
    titulo: 'Regla de oro del diagrama',
    escenario: '¿Cuál de estas prácticas hace un diagrama BPMN más claro y correcto?',
    opciones: [
      'Usar muchos colores y formas distintas para cada tarea.',
      'Etiquetar las compuertas y los flujos con la condición que representan.',
      'Ocultar el evento de inicio para simplificar.',
      'Conectar todas las tareas entre sí para no perder ninguna.',
    ],
    correcta: 1,
    explicacion: 'Las compuertas y los flujos deben explicar la condición (Sí/No, monto, estado). Un diagrama se entiende por sus etiquetas, no por los colores.',
  },
]

function Sandbox() {
  const [indice, setIndice] = useState(0)
  const [elegida, setElegida] = useState(null)
  const [aciertos, setAciertos] = useState(0)
  const [historial, setHistorial] = useState([])
  const [terminado, setTerminado] = useState(false)
  const reto = RETOS[indice]

  const responder = (i) => {
    if (elegida !== null) return
    setElegida(i)
    const ok = i === reto.correcta
    if (ok) setAciertos((n) => n + 1)
    setHistorial((prev) => [...prev, { id: reto.id, ok }])
  }

  const siguiente = () => {
    if (indice < RETOS.length - 1) {
      setIndice((n) => n + 1)
      setElegida(null)
      return
    }
    setTerminado(true)
  }

  const reiniciar = () => {
    setIndice(0)
    setElegida(null)
    setAciertos(0)
    setHistorial([])
    setTerminado(false)
  }

  if (terminado) {
    return (
      <div className="bpmn-sandbox">
        <div className="bpmn-sandbox__final">
          <h4>🏁 Sandbox completado</h4>
          <p>Resolviste {aciertos} de {RETOS.length} situaciones de proceso.</p>
          <div className="bpmn-sandbox__score">{aciertos} / {RETOS.length}</div>
          <ul>
            {RETOS.map((r, i) => (
              <li key={r.id} className={historial[i]?.ok ? 'is-ok' : 'is-fail'}>
                {historial[i]?.ok ? '✅' : '❌'} {r.titulo}
              </li>
            ))}
          </ul>
          <button type="button" className="bpmn-btn bpmn-btn--primary" onClick={reiniciar}>
            🔄 Repetir sandbox
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="bpmn-sandbox">
      <div className="bpmn-sandbox__head">
        <div>
          <h4>Sandbox de decisiones · {reto.icon} {reto.titulo}</h4>
          <p>Situación {indice + 1} de {RETOS.length}. Elige la solución BPMN que mejor resuelve el caso.</p>
        </div>
        <span className="bpmn-sandbox__progress">{aciertos} aciertos</span>
      </div>

      <p className="bpmn-sandbox__scenario">{reto.escenario}</p>

      <div className="bpmn-sandbox__options">
        {reto.opciones.map((op, i) => {
          const letra = String.fromCharCode(65 + i)
          const clase = [
            'bpmn-sandbox__opt',
            elegida !== null && i === reto.correcta ? 'is-ok' : '',
            elegida !== null && i === elegida && i !== reto.correcta ? 'is-fail' : '',
          ].filter(Boolean).join(' ')
          return (
            <button
              key={i}
              type="button"
              className={clase}
              onClick={() => responder(i)}
              disabled={elegida !== null}
            >
              <span>{letra}</span>
              <p>{op}</p>
            </button>
          )
        })}
      </div>

      {elegida !== null && (
        <div className={`bpmn-sandbox__feedback ${elegida === reto.correcta ? 'is-ok' : 'is-fail'}`}>
          <strong>{elegida === reto.correcta ? '✅ Decisión correcta' : '🔎 Otra lectura del caso'}</strong>
          <p>{reto.explicacion}</p>
        </div>
      )}

      <div className="bpmn-sandbox__actions">
        <span>Sandbox · {RETOS.length} retos</span>
        <button
          type="button"
          className="bpmn-btn bpmn-btn--primary"
          onClick={siguiente}
          disabled={elegida === null}
        >
          {indice < RETOS.length - 1 ? 'Siguiente situación →' : 'Ver resultado'}
        </button>
      </div>
    </div>
  )
}

/* ================================================================== */
/* LABORATORIO                                                        */
/* ================================================================== */

const TABS = [
  { id: 'lienzo', icon: '🎨', label: 'Lienzo BPMN', desc: 'Diagrama editable' },
  { id: 'simulador', icon: '🪙', label: 'Token Simulation', desc: 'Paso a paso' },
  { id: 'mapa', icon: '🕸️', label: 'Mapa conceptual', desc: 'Grafo de conocimiento' },
  { id: 'sandbox', icon: '🧪', label: 'Sandbox', desc: 'Decisiones de proceso' },
]

export default function BpmnLab() {
  const [tab, setTab] = useState('lienzo')
  const contenido = useMemo(() => {
    if (tab === 'simulador') return <TokenSimulator />
    if (tab === 'mapa') return <ConceptMap />
    if (tab === 'sandbox') return <Sandbox />
    return <Lienzo />
  }, [tab])

  return (
    <section className="bpmn-lab">
      <header className="bpmn-lab__head">
        <div className="bpmn-lab__brand">
          <span className="bpmn-lab__mark">◈</span>
          <div>
            <span className="bpmn-lab__kicker">Biblioteca de Negocios · Procesos</span>
            <h3>BPMN · Laboratorio interactivo</h3>
            <p>Modela, simula y comprende procesos de negocio sin instalar nada.</p>
          </div>
        </div>
        <div className="bpmn-lab__badges">
          <span>🎨 Lienzo embebido</span>
          <span>🪙 Token step-by-step</span>
          <span>🕸️ Grafo conceptual</span>
        </div>
      </header>

      <nav className="bpmn-lab__tabs" aria-label="Herramientas BPMN">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            className={`bpmn-lab__tab ${tab === t.id ? 'is-active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <span>{t.icon}</span>
            <strong>{t.label}</strong>
            <small>{t.desc}</small>
          </button>
        ))}
      </nav>

      <div className="bpmn-lab__body">{contenido}</div>

      <footer className="bpmn-lab__foot">
        <span>💡 Un proceso claro se lee de izquierda a derecha y responde: ¿quién hace qué, cuándo y con qué decisión?</span>
        <span>BPMN 2.0 · práctica guiada</span>
      </footer>
    </section>
  )
}
