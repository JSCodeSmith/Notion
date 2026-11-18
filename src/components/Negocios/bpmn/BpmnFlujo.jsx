import { useId } from 'react'
import './BpmnVisual.css'

/* Motor SVG para dibujar procesos BPMN con figuras geométricas reales:
   círculos (eventos), rectángulos redondeados (tareas), rombos (compuertas)
   y flechas de secuencia. Las ramas se apilan debajo del flujo principal. */

const NORMAL = {
  NODE_W: 122,
  NODE_H: 56,
  GAP: 30,
  MARGIN: 30,
  MAIN_Y: 94,
  BRANCH_STEP: 136,
  CIRCLE_R: 24,
  DIAMOND_HW: 52,
  DIAMOND_HH: 36,
}

const COMPACTO = {
  NODE_W: 108,
  NODE_H: 50,
  GAP: 24,
  MARGIN: 24,
  MAIN_Y: 80,
  BRANCH_STEP: 118,
  CIRCLE_R: 20,
  DIAMOND_HW: 45,
  DIAMOND_HH: 31,
}

function partirTexto(texto, maximo = 18) {
  const palabras = String(texto ?? '').split(/\s+/).filter(Boolean)
  const lineas = []
  let actual = ''
  for (const palabra of palabras) {
    const siguiente = actual ? `${actual} ${palabra}` : palabra
    if (siguiente.length > maximo && actual) {
      lineas.push(actual)
      actual = palabra
    } else {
      actual = siguiente
    }
  }
  if (actual) lineas.push(actual)
  return lineas.slice(0, 3)
}

function TextoLineas({ lineas, x, y, clase, ancho = 10.5, interlineado = 11.5 }) {
  const inicio = y - ((lineas.length - 1) * interlineado) / 2
  return (
    <text
      x={x}
      y={inicio}
      className={clase}
      textAnchor="middle"
      fontSize={ancho}
    >
      {lineas.map((linea, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : interlineado}>
          {linea}
        </tspan>
      ))}
    </text>
  )
}

function extremoDerecho(nodo, M) {
  if (nodo.tipo === 'inicio' || nodo.tipo === 'fin' || nodo.tipo === 'evento') {
    return M.CIRCLE_R
  }
  if (nodo.tipo === 'decision') return M.DIAMOND_HW
  return M.NODE_W / 2
}

function extremoIzquierdo(nodo, M) {
  return extremoDerecho(nodo, M)
}

function extremoAbajo(nodo, M) {
  if (nodo.tipo === 'inicio' || nodo.tipo === 'fin' || nodo.tipo === 'evento') {
    return M.CIRCLE_R
  }
  if (nodo.tipo === 'decision') return M.DIAMOND_HH
  return M.NODE_H / 2
}

export default function FlujoProceso({
  titulo,
  subtitulo,
  roles = [],
  nodos = [],
  ramas = [],
  compacto = false,
  nota,
  numero,
  icono = '⚙️',
}) {
  const M = compacto ? COMPACTO : NORMAL
  const uid = useId().replace(/[:]/g, '')
  const colorRol = Object.fromEntries(roles.map((r) => [r.nombre, r.color]))
  const n = nodos.length
  const maxNivel = Math.max(0, ...ramas.map((r) => r.nivel ?? 1))

  const posiciones = new Map()
  nodos.forEach((nodo, i) => {
    const izquierda = M.MARGIN + i * (M.NODE_W + M.GAP)
    posiciones.set(nodo.id, {
      ...nodo,
      x: izquierda + M.NODE_W / 2,
      y: M.MAIN_Y,
    })
  })

  /* Las ramas pueden colgar de otra rama (por ejemplo, una compuerta dentro
     de una rama). Se procesan por nivel para conocer primero las posiciones
     de sus nodos padre. */
  const posicionesTodas = new Map(posiciones)
  const ramasLayout = []
  const ramasOrdenadas = ramas
    .map((rama, indice) => ({ rama, indice }))
    .sort((a, b) => (a.rama.nivel ?? 1) - (b.rama.nivel ?? 1) || a.indice - b.indice)

  for (const { rama, indice } of ramasOrdenadas) {
    const origen = posicionesTodas.get(rama.desde)
    const nivel = rama.nivel ?? 1
    const y = M.MAIN_Y + M.BRANCH_STEP * nivel
    const anchoCadena =
      rama.nodos.length * M.NODE_W + (rama.nodos.length - 1) * M.GAP
    let inicioX = (origen?.x ?? M.MARGIN) + (rama.desplazamiento ?? 0)
    inicioX = Math.max(M.MARGIN + M.NODE_W / 2, inicioX)
    const centroCadena = inicioX + anchoCadena / 2
    const nodosRama = rama.nodos.map((nodo, j) => ({
      ...nodo,
      x: inicioX + j * (M.NODE_W + M.GAP),
      y,
    }))
    for (const nodo of nodosRama) posicionesTodas.set(nodo.id, nodo)
    ramasLayout.push({
      ...rama,
      indice,
      origen,
      nivel,
      y,
      nodosRama,
      finCadena: nodosRama[nodosRama.length - 1],
      anchoCadena,
      inicioX,
      centroCadena,
    })
  }
  ramasLayout.sort((a, b) => a.indice - b.indice)
  const retornos = ramasLayout.filter((r) => r.vuelveA)

  const anchoBase = M.MARGIN * 2 + n * M.NODE_W + Math.max(0, n - 1) * M.GAP
  const anchoRamas = Math.max(
    0,
    ...ramasLayout.map((r) => r.inicioX - M.NODE_W / 2 + r.anchoCadena + M.MARGIN),
  )
  const ancho = Math.max(compacto ? 760 : 980, anchoBase, anchoRamas)
  const alto =
    M.MAIN_Y +
    M.BRANCH_STEP * maxNivel +
    (retornos.length ? 50 + retornos.length * 20 : 0) +
    (compacto ? 64 : 82)

  const marcador = `${uid}-flecha`

  function etiquetaRol(nodo, x, y) {
    if (!nodo.rol) return null
    return (
      <text
        x={x}
        y={y}
        textAnchor="middle"
        className="bpmn-rol"
        fill={colorRol[nodo.rol] ?? '#94a3b8'}
      >
        {nodo.rol}
      </text>
    )
  }

  function Nodo({ nodo }) {
    const { x, y, tipo } = nodo

    if (tipo === 'inicio' || tipo === 'fin' || tipo === 'evento') {
      const esFin = tipo === 'fin'
      const esEvento = tipo === 'evento'
      return (
        <g>
          {esEvento && (
            <circle
              cx={x}
              cy={y}
              r={M.CIRCLE_R + 5}
              fill="none"
              stroke="#8b9bb4"
              strokeWidth="1.4"
              opacity="0.65"
            />
          )}
          <circle
            cx={x}
            cy={y}
            r={M.CIRCLE_R}
            fill={esFin ? '#2a0f14' : esEvento ? '#0e1c2e' : '#0d2a1b'}
            stroke={esFin ? '#f87171' : esEvento ? '#93c5fd' : '#4ade80'}
            strokeWidth={esFin ? 4 : esEvento ? 2 : 2.5}
          />
          {esEvento && (
            <circle
              cx={x}
              cy={y}
              r={M.CIRCLE_R - 6}
              fill="none"
              stroke="#93c5fd"
              strokeWidth="1.4"
            />
          )}
          <TextoLineas
            lineas={partirTexto(nodo.label, compacto ? 14 : 18)}
            x={x}
            y={y + M.CIRCLE_R + (compacto ? 18 : 22)}
            clase="bpmn-evento-label"
            ancho={compacto ? 9.5 : 10.5}
            interlineado={10.5}
          />
        </g>
      )
    }

    if (tipo === 'decision') {
      const hw = M.DIAMOND_HW
      const hh = M.DIAMOND_HH
      const lineas = partirTexto(nodo.label, compacto ? 10 : 12)
      return (
        <g>
          {etiquetaRol(nodo, x, y - hh - 8)}
          <polygon
            points={`${x},${y - hh} ${x + hw},${y} ${x},${y + hh} ${x - hw},${y}`}
            fill="#2c2109"
            stroke="#fbbf24"
            strokeWidth="2"
          />
          <polygon
            points={`${x},${y - hh + 5} ${x + hw - 6},${y} ${x},${y + hh - 5} ${x - hw + 6},${y}`}
            fill="rgba(251,191,36,.07)"
            stroke="rgba(251,191,36,.28)"
            strokeWidth="1"
          />
          <TextoLineas
            lineas={lineas}
            x={x}
            y={y}
            clase="bpmn-decision-label"
            ancho={compacto ? 7.6 : 8.4}
            interlineado={9}
          />
        </g>
      )
    }

    // Tarea / subproceso
    const anchoNodo = M.NODE_W
    const altoNodo = M.NODE_H
    const lineas = partirTexto(nodo.label, compacto ? 16 : 18)
    return (
      <g>
        <rect
          x={x - anchoNodo / 2}
          y={y - altoNodo / 2}
          width={anchoNodo}
          height={altoNodo}
          rx="10"
          fill="#10233f"
          stroke="#3b82f6"
          strokeWidth="1.6"
        />
        <rect
          x={x - anchoNodo / 2}
          y={y - altoNodo / 2}
          width={anchoNodo}
          height="4"
          rx="2"
          fill={colorRol[nodo.rol] ?? '#3b82f6'}
          opacity="0.95"
        />
        <TextoLineas
          lineas={lineas}
          x={x}
          y={y - (nodo.rol ? 5 : 0)}
          clase="bpmn-tarea-label"
          ancho={compacto ? 9.5 : 10.5}
          interlineado={10.5}
        />
        {etiquetaRol(nodo, x, y + altoNodo / 2 - 9)}
      </g>
    )
  }

  function Flecha({ x1, y1, x2, y2, etiqueta, color = '#7c8aa5', discontinuo = false }) {
    const medioX = (x1 + x2) / 2
    return (
      <g>
        <line
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke={color}
          strokeWidth="1.7"
          strokeDasharray={discontinuo ? '6 5' : undefined}
          markerEnd={`url(#${marcador})`}
        />
        {etiqueta && (
          <text
            x={medioX}
            y={y1 - 7}
            textAnchor="middle"
            className="bpmn-condicion"
          >
            {etiqueta}
          </text>
        )}
      </g>
    )
  }

  return (
    <div className={`bpmn-proceso ${compacto ? 'bpmn-proceso--compacto' : ''}`}>
      {(titulo || subtitulo) && (
        <div className="bpmn-proceso__head">
          <span className="bpmn-proceso__icono" aria-hidden="true">
            {icono}
          </span>
          <div>
            <h4>
              {numero != null && <span className="bpmn-proceso__num">{numero}</span>}
              {titulo}
            </h4>
            {subtitulo && <p>{subtitulo}</p>}
          </div>
        </div>
      )}

      {roles.length > 0 && (
        <div className="bpmn-leyenda" aria-label="Roles del proceso">
          {roles.map((r) => (
            <span key={r.nombre} className="bpmn-leyenda__rol">
              <i style={{ background: r.color }} />
              {r.nombre}
            </span>
          ))}
          <span className="bpmn-leyenda__formas">
            <i className="bpmn-forma bpmn-forma--evento" /> evento
            <i className="bpmn-forma bpmn-forma--tarea" /> tarea
            <i className="bpmn-forma bpmn-forma--decision" /> decisión
          </span>
        </div>
      )}

      <div className="bpmn-scroll">
        <svg
          className="bpmn-svg"
          viewBox={`0 0 ${ancho} ${alto}`}
          role="img"
          aria-label={titulo || 'Diagrama BPMN'}
        >
          <defs>
            <marker
              id={marcador}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="#7c8aa5" />
            </marker>
            <pattern
              id={`${uid}-grid`}
              width="26"
              height="26"
              patternUnits="userSpaceOnUse"
            >
              <path d="M 26 0 L 0 0 0 26" fill="none" stroke="rgba(148,163,184,.07)" strokeWidth="1" />
            </pattern>
          </defs>

          <rect x="0" y="0" width={ancho} height={alto} fill={`url(#${uid}-grid)`} />

          {/* Flujo principal */}
          {nodos.map((nodo, i) => {
            const actual = posiciones.get(nodo.id)
            if (i === 0) return null
            const anterior = posiciones.get(nodos[i - 1].id)
            const x1 = anterior.x + extremoDerecho(anterior, M)
            const x2 = actual.x - extremoIzquierdo(actual, M)
            return (
              <Flecha
                key={`principal-${nodo.id}`}
                x1={x1}
                y1={M.MAIN_Y}
                x2={x2}
                y2={M.MAIN_Y}
                etiqueta={
                  anterior.tipo === 'decision'
                    ? anterior.salida ?? 'Sí'
                    : undefined
                }
              />
            )
          })}

          {/* Conectores y ramas */}
          {ramasLayout.map((rama) => {
            const origen = rama.origen
            if (!origen) return null
            const primero = rama.nodosRama[0]
            const origenAbajo = origen.y + extremoAbajo(origen, M)
            const yEntrada = primero.y - M.NODE_H / 2
            const codoY = yEntrada - 14
            const path =
              Math.abs(primero.x - origen.x) < 1
                ? `M ${origen.x} ${origenAbajo} L ${primero.x} ${yEntrada}`
                : `M ${origen.x} ${origenAbajo} L ${origen.x} ${codoY} L ${primero.x} ${codoY} L ${primero.x} ${yEntrada}`

            const nodosRama = rama.nodosRama
            const ultimo = rama.finCadena
            const objetivo = rama.vuelveA
              ? posicionesTodas.get(rama.vuelveA)
              : null
            const indiceRetorno = rama.vuelveA
              ? retornos.findIndex((r) => r.indice === rama.indice)
              : -1
            const yRetorno =
              M.MAIN_Y +
              M.BRANCH_STEP * maxNivel +
              42 +
              Math.max(0, indiceRetorno) * 20

            return (
              <g key={`rama-${rama.desde}-${rama.indice}`}>
                <path
                  d={path}
                  fill="none"
                  stroke="#7c8aa5"
                  strokeWidth="1.7"
                  markerEnd={`url(#${marcador})`}
                />
                <rect
                  x={origen.x - 16}
                  y={origenAbajo + 3}
                  width="32"
                  height="15"
                  rx="7"
                  fill="#1b2434"
                  stroke="#3a4964"
                />
                <text
                  x={origen.x}
                  y={origenAbajo + 14}
                  textAnchor="middle"
                  className="bpmn-condicion bpmn-condicion--caja"
                >
                  {rama.etiqueta ?? 'No'}
                </text>

                {nodosRama.map((nodoRama, j) => {
                  if (j === 0) return <Nodo key={nodoRama.id} nodo={nodoRama} />
                  const previo = nodosRama[j - 1]
                  return (
                    <g key={nodoRama.id}>
                      <Flecha
                        x1={previo.x + extremoDerecho(previo, M)}
                        y1={previo.y}
                        x2={nodoRama.x - extremoIzquierdo(nodoRama, M)}
                        y2={nodoRama.y}
                        etiqueta={
                          previo.tipo === 'decision'
                            ? previo.salida ?? 'Sí'
                            : undefined
                        }
                      />
                      <Nodo nodo={nodoRama} />
                    </g>
                  )
                })}

                {objetivo && (
                  <g>
                    <path
                      d={`M ${
                        ultimo.x + extremoDerecho(ultimo, M)
                      } ${ultimo.y} L ${
                        ultimo.x + extremoDerecho(ultimo, M) + 18
                      } ${ultimo.y} L ${
                        ultimo.x + extremoDerecho(ultimo, M) + 18
                      } ${yRetorno} L ${objetivo.x} ${yRetorno} L ${
                        objetivo.x
                      } ${objetivo.y + extremoAbajo(objetivo, M)}`}
                      fill="none"
                      stroke="#94a3b8"
                      strokeWidth="1.4"
                      strokeDasharray="5 4"
                      markerEnd={`url(#${marcador})`}
                    />
                    <text
                      x={(ultimo.x + objetivo.x) / 2}
                      y={yRetorno - 5}
                      textAnchor="middle"
                      className="bpmn-retorno"
                    >
                      {rama.etiquetaRetorno ?? '↺ reintentar'}
                    </text>
                  </g>
                )}
              </g>
            )
          })}

          {/* Nodos principales al final para que queden por encima de las líneas */}
          {nodos.map((nodo) => (
            <Nodo key={nodo.id} nodo={posiciones.get(nodo.id)} />
          ))}
        </svg>
      </div>

      {nota && <p className="bpmn-nota">{nota}</p>}
    </div>
  )
}
