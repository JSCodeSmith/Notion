import './BpmnVisual.css'

/* Figuras geométricas de los símbolos esenciales de BPMN. */
const SIMBOLOS = [
  {
    id: 'inicio',
    categoria: 'Evento',
    nombre: 'Inicio',
    funcion: 'Dispara el proceso: una solicitud, un pedido, un horario o un mensaje.',
    figura: 'inicio',
    color: '#4ade80',
  },
  {
    id: 'intermedio',
    categoria: 'Evento',
    nombre: 'Intermedio',
    funcion: 'Ocurre durante el proceso: espera un temporizador, un mensaje o un error.',
    figura: 'intermedio',
    color: '#60a5fa',
  },
  {
    id: 'fin',
    categoria: 'Evento',
    nombre: 'Fin',
    funcion: 'Termina el proceso o una rama completa del flujo.',
    figura: 'fin',
    color: '#f87171',
  },
  {
    id: 'tarea',
    categoria: 'Actividad',
    nombre: 'Tarea',
    funcion: 'Trabajo atómico que realiza una persona o un sistema.',
    figura: 'tarea',
    color: '#60a5fa',
  },
  {
    id: 'subproceso',
    categoria: 'Actividad',
    nombre: 'Subproceso',
    funcion: 'Proceso anidado que encapsula varios pasos para reducir complejidad.',
    figura: 'subproceso',
    color: '#60a5fa',
  },
  {
    id: 'xor',
    categoria: 'Compuerta',
    nombre: 'Exclusiva (XOR)',
    funcion: 'Elige una sola ruta posible según una condición.',
    figura: 'xor',
    color: '#fbbf24',
  },
  {
    id: 'and',
    categoria: 'Compuerta',
    nombre: 'Paralela (AND)',
    funcion: 'Activa todas las rutas a la vez y luego las sincroniza.',
    figura: 'and',
    color: '#fbbf24',
  },
  {
    id: 'or',
    categoria: 'Compuerta',
    nombre: 'Inclusiva (OR)',
    funcion: 'Activa una o varias rutas según las condiciones que se cumplan.',
    figura: 'or',
    color: '#fbbf24',
  },
  {
    id: 'evento-gateway',
    categoria: 'Compuerta',
    nombre: 'Basada en eventos',
    funcion: 'La ruta depende del evento que ocurra primero (mensaje, temporizador).',
    figura: 'evento-gateway',
    color: '#fbbf24',
  },
  {
    id: 'secuencia',
    categoria: 'Conexión',
    nombre: 'Flujo de secuencia',
    funcion: 'Flecha continua que marca el orden de ejecución dentro de un pool.',
    figura: 'secuencia',
    color: '#93c5fd',
  },
  {
    id: 'mensaje',
    categoria: 'Conexión',
    nombre: 'Flujo de mensaje',
    funcion: 'Línea punteada que comunica dos participantes o pools distintos.',
    figura: 'mensaje',
    color: '#93c5fd',
  },
  {
    id: 'pool',
    categoria: 'Swimlane',
    nombre: 'Pool',
    funcion: 'Rectángulo grande que representa una organización o participante.',
    figura: 'pool',
    color: '#a78bfa',
  },
  {
    id: 'lane',
    categoria: 'Swimlane',
    nombre: 'Lane',
    funcion: 'Subdivisión del pool para separar roles, áreas o departamentos.',
    figura: 'lane',
    color: '#a78bfa',
  },
  {
    id: 'dato',
    categoria: 'Artefacto',
    nombre: 'Objeto de datos',
    funcion: 'Rectángulo con esquina doblada: información que usa el proceso.',
    figura: 'dato',
    color: '#22d3ee',
  },
  {
    id: 'anotacion',
    categoria: 'Artefacto',
    nombre: 'Anotación',
    funcion: 'Corchete con texto: aclara una decisión sin alterar el flujo.',
    figura: 'anotacion',
    color: '#22d3ee',
  },
]

function Figura({ tipo, color }) {
  const comun = {
    fill: 'none',
    stroke: color,
    strokeWidth: 2.4,
  }

  if (tipo === 'inicio' || tipo === 'fin') {
    return (
      <svg viewBox="0 0 120 70" aria-hidden="true">
        <circle
          cx="60"
          cy="35"
          r="22"
          {...comun}
          strokeWidth={tipo === 'fin' ? 6 : 2.6}
          fill={tipo === 'fin' ? 'rgba(248,113,113,.08)' : 'rgba(74,222,128,.08)'}
        />
        {tipo === 'inicio' && (
          <path d="M54 25 L72 35 L54 45 Z" fill={color} opacity="0.9" />
        )}
      </svg>
    )
  }

  if (tipo === 'intermedio') {
    return (
      <svg viewBox="0 0 120 70" aria-hidden="true">
        <circle cx="60" cy="35" r="23" {...comun} strokeWidth="2.2" />
        <circle cx="60" cy="35" r="17" {...comun} strokeWidth="1.6" />
        <path d="M60 35 L60 24 M60 35 L69 40" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      </svg>
    )
  }

  if (tipo === 'tarea' || tipo === 'subproceso') {
    return (
      <svg viewBox="0 0 120 70" aria-hidden="true">
        <rect x="16" y="17" width="88" height="36" rx="9" {...comun} fill="rgba(96,165,250,.08)" />
        {tipo === 'subproceso' && (
          <>
            <path d="M60 45 L60 51 M57 48 L63 48" stroke={color} strokeWidth="2.2" strokeLinecap="round" />
            <rect x="54" y="42" width="12" height="9" rx="2" fill="#0e1a2c" stroke={color} strokeWidth="1.4" />
          </>
        )}
      </svg>
    )
  }

  if (tipo === 'xor' || tipo === 'and' || tipo === 'or' || tipo === 'evento-gateway') {
    return (
      <svg viewBox="0 0 120 70" aria-hidden="true">
        <polygon
          points="60,8 92,35 60,62 28,35"
          {...comun}
          fill="rgba(251,191,36,.08)"
        />
        {tipo === 'xor' && (
          <path d="M50 25 L70 45 M70 25 L50 45" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
        )}
        {tipo === 'and' && (
          <path d="M60 22 L60 48 M47 35 L73 35" stroke={color} strokeWidth="2.8" strokeLinecap="round" />
        )}
        {tipo === 'or' && (
          <circle cx="60" cy="35" r="8.5" {...comun} strokeWidth="2.6" />
        )}
        {tipo === 'evento-gateway' && (
          <polygon
            points="60,25 70,32 66,44 54,44 50,32"
            fill="none"
            stroke={color}
            strokeWidth="2.2"
          />
        )}
      </svg>
    )
  }

  if (tipo === 'secuencia' || tipo === 'mensaje') {
    return (
      <svg viewBox="0 0 120 70" aria-hidden="true">
        <path
          d="M14 35 L92 35"
          stroke={color}
          strokeWidth="2.6"
          strokeDasharray={tipo === 'mensaje' ? '7 5' : undefined}
          fill="none"
        />
        <path d="M84 27 L98 35 L84 43 Z" fill={color} />
      </svg>
    )
  }

  if (tipo === 'pool') {
    return (
      <svg viewBox="0 0 120 70" aria-hidden="true">
        <rect x="10" y="15" width="100" height="44" rx="5" {...comun} fill="rgba(167,139,250,.06)" />
        <path d="M30 15 L30 59" stroke={color} strokeWidth="1.8" opacity="0.8" />
        <rect x="10" y="15" width="20" height="44" fill="rgba(167,139,250,.16)" stroke={color} strokeWidth="1.8" />
      </svg>
    )
  }

  if (tipo === 'lane') {
    return (
      <svg viewBox="0 0 120 70" aria-hidden="true">
        <rect x="12" y="12" width="96" height="48" rx="5" {...comun} fill="rgba(167,139,250,.05)" />
        <path d="M12 28 L108 28 M12 44 L108 44" stroke={color} strokeWidth="1.6" opacity="0.75" />
        <path d="M30 12 L30 60" stroke={color} strokeWidth="1.6" opacity="0.55" />
      </svg>
    )
  }

  if (tipo === 'dato') {
    return (
      <svg viewBox="0 0 120 70" aria-hidden="true">
        <path
          d="M22 15 L82 15 L98 31 L98 57 L22 57 Z"
          {...comun}
          fill="rgba(34,211,238,.07)"
        />
        <path d="M82 15 L82 31 L98 31" {...comun} strokeWidth="1.8" />
        <path d="M34 34 L72 34 M34 42 L66 42" stroke={color} strokeWidth="1.6" opacity="0.65" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 120 70" aria-hidden="true">
      <path d="M18 14 L18 56 L26 56" {...comun} strokeWidth="2.2" fill="none" />
      <path d="M34 24 L102 24 M34 34 L88 34 M34 44 L96 44" stroke={color} strokeWidth="1.8" opacity="0.7" strokeLinecap="round" />
    </svg>
  )
}

export default function BpmnSimbolos() {
  return (
    <section className="doc-card doc-card--full bpmn-simbolos" id="bpmn-simbolos">
      <div className="bpmn-seccion__head">
        <span className="bpmn-seccion__icono">🧭</span>
        <div>
          <h3>Elementos esenciales · figuras geométricas</h3>
          <p>
            Cada símbolo tiene una forma y un significado preciso. Esta galería
            reúne los quince elementos que aparecen en el apunte, dibujados con
            su geometría real.
          </p>
        </div>
      </div>

      <div className="bpmn-simbolos__grid">
        {SIMBOLOS.map((simbolo) => (
          <article className="bpmn-simbolo" key={simbolo.id}>
            <div className="bpmn-simbolo__figura">
              <Figura tipo={simbolo.figura} color={simbolo.color} />
            </div>
            <div className="bpmn-simbolo__texto">
              <span className="bpmn-simbolo__cat" style={{ color: simbolo.color }}>
                {simbolo.categoria}
              </span>
              <h4>{simbolo.nombre}</h4>
              <p>{simbolo.funcion}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
