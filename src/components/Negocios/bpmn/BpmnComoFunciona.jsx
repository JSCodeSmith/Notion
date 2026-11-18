import FlujoProceso from './BpmnFlujo'
import './BpmnVisual.css'

/* Explicación visual de cómo funciona BPMN: las cuatro familias de elementos,
   las conexiones y un proceso de ejemplo que las usa todas. */

function Forma({ tipo, color = '#93c5fd' }) {
  const estilo = {
    fill: 'none',
    stroke: color,
    strokeWidth: 2.2,
  }

  if (tipo === 'evento') {
    return (
      <svg viewBox="0 0 46 34" aria-hidden="true">
        <circle cx="23" cy="17" r="10" {...estilo} />
      </svg>
    )
  }
  if (tipo === 'actividad') {
    return (
      <svg viewBox="0 0 46 34" aria-hidden="true">
        <rect x="7" y="8" width="32" height="18" rx="5" {...estilo} />
      </svg>
    )
  }
  if (tipo === 'compuerta') {
    return (
      <svg viewBox="0 0 46 34" aria-hidden="true">
        <polygon points="23,4 39,17 23,30 7,17" {...estilo} />
        <path d="M18 12 L28 22 M28 12 L18 22" stroke={color} strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  if (tipo === 'secuencia' || tipo === 'mensaje' || tipo === 'asociacion') {
    return (
      <svg viewBox="0 0 54 34" aria-hidden="true">
        <path
          d="M5 17 L43 17"
          stroke={color}
          strokeWidth="2.2"
          strokeDasharray={tipo === 'mensaje' ? '6 4' : tipo === 'asociacion' ? '2 4' : undefined}
          fill="none"
        />
        {tipo !== 'asociacion' && <path d="M39 11 L49 17 L39 23 Z" fill={color} />}
      </svg>
    )
  }
  if (tipo === 'pool') {
    return (
      <svg viewBox="0 0 46 34" aria-hidden="true">
        <rect x="4" y="6" width="38" height="22" rx="3" {...estilo} />
        <path d="M13 6 L13 28" stroke={color} strokeWidth="1.6" />
        <rect x="4" y="6" width="9" height="22" fill={`${color}22`} stroke={color} strokeWidth="1.4" />
      </svg>
    )
  }
  if (tipo === 'lane') {
    return (
      <svg viewBox="0 0 46 34" aria-hidden="true">
        <rect x="4" y="6" width="38" height="22" rx="3" {...estilo} />
        <path d="M4 13 L42 13 M4 21 L42 21" stroke={color} strokeWidth="1.4" opacity="0.75" />
      </svg>
    )
  }
  if (tipo === 'dato') {
    return (
      <svg viewBox="0 0 46 34" aria-hidden="true">
        <path d="M10 6 L30 6 L38 14 L38 28 L10 28 Z" {...estilo} />
        <path d="M30 6 L30 14 L38 14" {...estilo} strokeWidth="1.5" />
      </svg>
    )
  }
  if (tipo === 'grupo') {
    return (
      <svg viewBox="0 0 46 34" aria-hidden="true">
        <rect x="6" y="6" width="34" height="22" rx="4" {...estilo} strokeDasharray="5 3" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 46 34" aria-hidden="true">
      <path d="M8 5 L8 29 L14 29" {...estilo} />
      <path d="M19 12 L38 12 M19 18 L34 18 M19 24 L37 24" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.75" />
    </svg>
  )
}

const FAMILIAS = [
  {
    id: 'flujo',
    titulo: 'Objetos de flujo',
    icono: '🔵',
    color: '#60a5fa',
    descripcion: 'Lo que ocurre dentro del proceso.',
    elementos: [
      { tipo: 'evento', nombre: 'Eventos', texto: 'círculos de inicio, intermedio y fin' },
      { tipo: 'actividad', nombre: 'Actividades', texto: 'rectángulos redondeados' },
      { tipo: 'compuerta', nombre: 'Compuertas', texto: 'rombos de decisión' },
    ],
  },
  {
    id: 'conexion',
    titulo: 'Objetos de conexión',
    icono: '🔗',
    color: '#93c5fd',
    descripcion: 'Cómo se conectan los elementos.',
    elementos: [
      { tipo: 'secuencia', nombre: 'Secuencia', texto: 'flecha sólida dentro del pool' },
      { tipo: 'mensaje', nombre: 'Mensaje', texto: 'línea punteada entre participantes' },
      { tipo: 'asociacion', nombre: 'Asociación', texto: 'línea de puntos para artefactos' },
    ],
  },
  {
    id: 'swimlane',
    titulo: 'Swimlanes',
    icono: '🏊',
    color: '#a78bfa',
    descripcion: 'Quién hace el trabajo.',
    elementos: [
      { tipo: 'pool', nombre: 'Pool', texto: 'organización o participante' },
      { tipo: 'lane', nombre: 'Lane', texto: 'rol o departamento dentro del pool' },
    ],
  },
  {
    id: 'artefacto',
    titulo: 'Artefactos',
    icono: '📎',
    color: '#22d3ee',
    descripcion: 'Información adicional que aclara el modelo.',
    elementos: [
      { tipo: 'dato', nombre: 'Objeto de datos', texto: 'información que usa el proceso' },
      { tipo: 'grupo', nombre: 'Grupo', texto: 'agrupa elementos visualmente' },
      { tipo: 'anotacion', nombre: 'Anotación', texto: 'nota de texto para el lector' },
    ],
  },
]

export default function BpmnComoFunciona() {
  return (
    <section className="doc-card doc-card--full bpmn-como" id="bpmn-como-funciona">
      <div className="bpmn-seccion__head">
        <span className="bpmn-seccion__icono">⚙️</span>
        <div>
          <h3>¿Cómo funciona? · figuras y conexiones</h3>
          <p>
            BPMN organiza el modelado en cuatro familias. Los objetos de flujo
            dicen qué ocurre; las conexiones muestran el orden; los swimlanes
            asignan responsabilidad; los artefactos añaden contexto.
          </p>
        </div>
      </div>

      <div className="bpmn-familias">
        {FAMILIAS.map((familia) => (
          <article
            className="bpmn-familia"
            key={familia.id}
            style={{ '--familia': familia.color }}
          >
            <header>
              <span className="bpmn-familia__icono">{familia.icono}</span>
              <div>
                <h4>{familia.titulo}</h4>
                <p>{familia.descripcion}</p>
              </div>
            </header>
            <ul>
              {familia.elementos.map((elemento) => (
                <li key={elemento.nombre}>
                  <span className="bpmn-familia__forma">
                    <Forma tipo={elemento.tipo} color={familia.color} />
                  </span>
                  <span>
                    <strong>{elemento.nombre}</strong>
                    <small>{elemento.texto}</small>
                  </span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <div className="bpmn-conexiones">
        <div className="bpmn-conexiones__item">
          <Forma tipo="secuencia" color="#93c5fd" />
          <div>
            <strong>Flujo de secuencia</strong>
            <span>Une actividades dentro del mismo pool y marca el orden.</span>
          </div>
        </div>
        <div className="bpmn-conexiones__item">
          <Forma tipo="mensaje" color="#22d3ee" />
          <div>
            <strong>Flujo de mensaje</strong>
            <span>Comunica dos pools distintos; nunca sustituye a la secuencia.</span>
          </div>
        </div>
        <div className="bpmn-conexiones__item">
          <Forma tipo="asociacion" color="#a78bfa" />
          <div>
            <strong>Asociación</strong>
            <span>Vincula un objeto de datos o una anotación con el flujo.</span>
          </div>
        </div>
      </div>

      <FlujoProceso
        compacto
        titulo="Un proceso que usa las cuatro familias"
        subtitulo="Evento de inicio, tarea, compuerta, roles y un flujo alternativo: todo conectado."
        roles={[
          { nombre: 'Ventas', color: '#60a5fa' },
          { nombre: 'Operaciones', color: '#fb923c' },
        ]}
        nodos={[
          { id: 'cf-inicio', tipo: 'inicio', label: 'Pedido del cliente' },
          { id: 'cf-recibir', tipo: 'tarea', label: 'Recibir pedido', rol: 'Ventas' },
          { id: 'cf-stock', tipo: 'decision', label: '¿Stock disponible?', rol: 'Ventas', salida: 'Sí' },
          { id: 'cf-preparar', tipo: 'tarea', label: 'Reservar y preparar', rol: 'Operaciones' },
          { id: 'cf-fin', tipo: 'fin', label: 'Pedido entregado' },
        ]}
        ramas={[
          {
            desde: 'cf-stock',
            etiqueta: 'No',
            nivel: 1,
            nodos: [
              { id: 'cf-comprar', tipo: 'tarea', label: 'Comprar a proveedor', rol: 'Operaciones' },
            ],
            vuelveA: 'cf-preparar',
            etiquetaRetorno: '↺ ya hay stock',
          },
        ]}
        nota="Los artefactos (objetos de datos, grupos y anotaciones) se cuelgan del flujo con asociaciones; no cambian el camino que sigue el token."
      />
    </section>
  )
}
