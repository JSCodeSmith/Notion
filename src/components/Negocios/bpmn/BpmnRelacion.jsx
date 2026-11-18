import { useState } from 'react'
import './BpmnVisual.css'

/* Diagrama interactivo: BPMN como centro y sus conexiones con el ecosistema
   de gestión de procesos. Al pasar el ratón o hacer clic se ilumina la relación. */

const CONCEPTOS = [
  {
    id: 'bpm',
    nombre: 'BPM',
    icono: '🧭',
    color: '#60a5fa',
    relacion:
      'BPM (Business Process Management) es la disciplina que coordina estrategia, personas, procesos y tecnología. BPMN es su lenguaje visual para modelar.',
    ejemplo: 'Un equipo de mejora continua usa BPM para priorizar procesos y BPMN para dibujar el flujo que va a rediseñar.',
  },
  {
    id: 'bpms',
    nombre: 'BPMS',
    icono: '⚙️',
    color: '#22d3ee',
    relacion:
      'Un BPMS es el software que ejecuta modelos BPMN 2.0. Convierte el diagrama en formularios, reglas, tareas y automatizaciones reales.',
    ejemplo: 'Camunda, Activiti o Flowable reciben un archivo BPMN y lo ejecutan como un proceso de negocio.',
  },
  {
    id: 'dmn',
    nombre: 'DMN',
    icono: '🧮',
    color: '#a78bfa',
    relacion:
      'DMN (Decision Model and Notation) modela decisiones complejas con tablas y reglas. Se complementa con BPMN: BPMN dice cuándo decidir y DMN dice cómo decidir.',
    ejemplo: 'Una compuerta «¿Crédito aprobado?» puede delegar el cálculo en una tabla DMN con ingresos, deuda y historial.',
  },
  {
    id: 'cmmn',
    nombre: 'CMMN',
    icono: '🗂️',
    color: '#f472b6',
    relacion:
      'CMMN (Case Management Model and Notation) sirve para casos no estructurados, donde el orden de las tareas no está completamente definido de antemano.',
    ejemplo: 'La gestión de un expediente legal o de una reclamación compleja encaja mejor en CMMN que en un flujo BPMN rígido.',
  },
  {
    id: 'uml',
    nombre: 'UML',
    icono: '🧱',
    color: '#fb923c',
    relacion:
      'UML modela software (clases, objetos, casos de uso). BPMN toma ideas de UML, pero está pensado para el negocio y para personas no técnicas.',
    ejemplo: 'UML describe cómo se implementa el sistema; BPMN describe qué hace el negocio antes de escribir código.',
  },
  {
    id: 'flujo',
    nombre: 'Diagramas de flujo',
    icono: '🔀',
    color: '#fbbf24',
    relacion:
      'Un diagrama de flujo tradicional muestra pasos y decisiones, pero sin semántica formal. BPMN añade tipos de eventos, compuertas y reglas de conexión.',
    ejemplo: 'Un flowchart informal puede dibujar un rombo; BPMN exige distinguir XOR, AND, OR y eventos.',
  },
  {
    id: 'workflow',
    nombre: 'Workflow engines',
    icono: '🚀',
    color: '#34d399',
    relacion:
      'Los motores de workflow consumen BPMN 2.0 para ejecutar procesos: asignan tareas, esperan eventos, evalúan compuertas y registran el historial.',
    ejemplo: 'Un motor recibe la tarea «Aprobar compra» y la envía a la bandeja del jefe correspondiente.',
  },
  {
    id: 'arquitectura',
    nombre: 'Arquitectura de procesos',
    icono: '🏛️',
    color: '#c084fc',
    relacion:
      'BPMN forma parte de un ecosistema OMG junto con BMM (modelado de negocio), DMN (decisiones) y CMMN (casos). Juntos conectan estrategia, proceso y ejecución.',
    ejemplo: 'La arquitectura de procesos ubica cada proceso en un mapa empresarial y usa BPMN para detallar los flujos críticos.',
  },
]

const IZQUIERDA = [
  { x: 46, y: 54 },
  { x: 46, y: 182 },
  { x: 46, y: 310 },
  { x: 46, y: 438 },
]
const DERECHA = [
  { x: 744, y: 54 },
  { x: 744, y: 182 },
  { x: 744, y: 310 },
  { x: 744, y: 438 },
]
const ANCHO_NODO = 210
const ALTO_NODO = 76
const CENTRO_X = 500
const CENTRO_Y = 282

export default function BpmnRelacion() {
  const [activo, setActivo] = useState('bpms')
  const [encima, setEncima] = useState(null)
  const visible = encima ?? activo
  const detalle = CONCEPTOS.find((c) => c.id === visible)

  return (
    <section className="doc-card doc-card--full bpmn-relacion" id="bpmn-relacion">
      <div className="bpmn-seccion__head">
        <span className="bpmn-seccion__icono">🧩</span>
        <div>
          <h3>Relación con otros conceptos</h3>
          <p>
            BPMN no vive solo: se conecta con la disciplina BPM, los motores
            BPMS, las decisiones DMN y los casos CMMN. Pasa el ratón o haz clic
            en un concepto para ver la conexión.
          </p>
        </div>
      </div>

      <div className="bpmn-relacion__scroll">
        <svg
          className="bpmn-relacion__svg"
          viewBox="0 0 1000 570"
          role="img"
          aria-label="Mapa interactivo de relaciones de BPMN"
        >
          <defs>
            <radialGradient id="bpmn-hub-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(96,165,250,.35)" />
              <stop offset="100%" stopColor="rgba(96,165,250,0)" />
            </radialGradient>
            <pattern id="bpmn-relacion-grid" width="30" height="30" patternUnits="userSpaceOnUse">
              <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(148,163,184,.06)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect x="0" y="0" width="1000" height="570" fill="url(#bpmn-relacion-grid)" />
          <circle cx={CENTRO_X} cy={CENTRO_Y} r="190" fill="url(#bpmn-hub-glow)" />

          {CONCEPTOS.map((concepto, i) => {
            const pos = i < 4 ? IZQUIERDA[i] : DERECHA[i - 4]
            const esIzquierda = i < 4
            const nodoX = esIzquierda ? pos.x : pos.x
            const nodoY = pos.y
            const centroNodoY = nodoY + ALTO_NODO / 2
            const bordeHub = esIzquierda ? CENTRO_X - 118 : CENTRO_X + 118
            const bordeNodo = esIzquierda ? nodoX + ANCHO_NODO : nodoX
            const medio = esIzquierda ? bordeHub - 42 : bordeHub + 42
            const d = `M ${bordeHub} ${CENTRO_Y} C ${medio} ${CENTRO_Y} ${medio} ${centroNodoY} ${bordeNodo} ${centroNodoY}`
            const iluminado = visible === concepto.id

            return (
              <g key={concepto.id}>
                <path
                  d={d}
                  fill="none"
                  stroke={iluminado ? concepto.color : 'rgba(148,163,184,.28)'}
                  strokeWidth={iluminado ? 2.6 : 1.4}
                  className={iluminado ? 'bpmn-relacion__linea is-activa' : 'bpmn-relacion__linea'}
                />
                <circle
                  cx={bordeNodo}
                  cy={centroNodoY}
                  r={iluminado ? 4.2 : 2.4}
                  fill={iluminado ? concepto.color : 'rgba(148,163,184,.5)'}
                />
                <g
                  role="button"
                  tabIndex={0}
                  aria-label={`Ver relación con ${concepto.nombre}`}
                  className={`bpmn-relacion__nodo ${iluminado ? 'is-activo' : ''}`}
                  onClick={() => setActivo(concepto.id)}
                  onMouseEnter={() => setEncima(concepto.id)}
                  onMouseLeave={() => setEncima(null)}
                  onFocus={() => setEncima(concepto.id)}
                  onBlur={() => setEncima(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setActivo(concepto.id)
                    }
                  }}
                >
                  <rect
                    x={nodoX}
                    y={nodoY}
                    width={ANCHO_NODO}
                    height={ALTO_NODO}
                    rx="13"
                    fill={iluminado ? 'rgba(18,30,50,.98)' : 'rgba(14,20,32,.9)'}
                    stroke={iluminado ? concepto.color : 'rgba(148,163,184,.28)'}
                    strokeWidth={iluminado ? 2.2 : 1.3}
                  />
                  <text x={nodoX + 22} y={nodoY + 45} fontSize="22" textAnchor="middle">
                    {concepto.icono}
                  </text>
                  <text
                    x={nodoX + 46}
                    y={nodoY + 32}
                    className="bpmn-relacion__nombre"
                    fill={iluminado ? '#f8fafc' : '#cbd5e1'}
                  >
                    {concepto.nombre}
                  </text>
                  <text
                    x={nodoX + 46}
                    y={nodoY + 50}
                    className="bpmn-relacion__mini"
                    fill={iluminado ? concepto.color : '#7f8ea6'}
                  >
                    {concepto.id === 'bpms'
                      ? 'ejecuta modelos'
                      : concepto.id === 'dmn'
                        ? 'decisiones'
                        : concepto.id === 'cmmn'
                          ? 'casos'
                          : concepto.id === 'uml'
                            ? 'software'
                            : concepto.id === 'flujo'
                              ? 'pasos simples'
                              : concepto.id === 'workflow'
                                ? 'motor de tareas'
                                : concepto.id === 'arquitectura'
                                  ? 'ecosistema OMG'
                                  : 'disciplina'}
                  </text>
                </g>
              </g>
            )
          })}

          <g className="bpmn-relacion__hub">
            <rect
              x={CENTRO_X - 118}
              y={CENTRO_Y - 58}
              width="236"
              height="116"
              rx="20"
              fill="rgba(16,30,52,.98)"
              stroke="#60a5fa"
              strokeWidth="2.6"
            />
            <rect
              x={CENTRO_X - 106}
              y={CENTRO_Y - 46}
              width="212"
              height="92"
              rx="15"
              fill="none"
              stroke="rgba(96,165,250,.28)"
              strokeWidth="1.2"
            />
            <text x={CENTRO_X} y={CENTRO_Y - 16} textAnchor="middle" fontSize="30">
              🧩
            </text>
            <text x={CENTRO_X} y={CENTRO_Y + 14} textAnchor="middle" className="bpmn-relacion__hub-title">
              BPMN
            </text>
            <text x={CENTRO_X} y={CENTRO_Y + 34} textAnchor="middle" className="bpmn-relacion__hub-sub">
              notación de procesos
            </text>
          </g>
        </svg>
      </div>

      <div className="bpmn-relacion__detalle" aria-live="polite">
        {detalle ? (
          <>
            <div className="bpmn-relacion__detalle-head">
              <span style={{ background: `${detalle.color}22`, borderColor: `${detalle.color}66` }}>
                {detalle.icono}
              </span>
              <div>
                <h4>{detalle.nombre}</h4>
                <p>{detalle.relacion}</p>
              </div>
            </div>
            <p className="bpmn-relacion__ejemplo">
              <strong>Ejemplo:</strong> {detalle.ejemplo}
            </p>
          </>
        ) : (
          <p>Selecciona un concepto para ver cómo se conecta con BPMN.</p>
        )}
      </div>
    </section>
  )
}
