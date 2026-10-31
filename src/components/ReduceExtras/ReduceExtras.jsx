import './ReduceExtras.css'
import Alertas from './Alertas'
import EditorSandbox from './EditorSandbox'
import EjemplosInteractivos from './EjemplosInteractivos'
import JuegoPistolas from './JuegoPistolas'
import { useAlertas } from './useAlertas'
import { usePersistencia } from './usePersistencia'
import { reproducir, useSonidos } from './sonidos'

const CLAVE_ELEMENTOS = 'reduce:elementos:v1'

const ELEMENTOS_INICIALES = [
  { id: 'el-pistola-neon', nombre: 'Pistola Neón', tipo: 'pistola', poder: 70 },
  { id: 'el-sonido-laser', nombre: 'Sonido Láser', tipo: 'sonido', poder: 35 },
  { id: 'el-alerta-critica', nombre: 'Alerta Crítica', tipo: 'alerta', poder: 50 },
]

const irA = (id) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function ReduceExtras() {
  const [elementosGuardados, setElementos, reiniciarElementos] = usePersistencia(
    CLAVE_ELEMENTOS,
    ELEMENTOS_INICIALES,
  )
  const elementos = Array.isArray(elementosGuardados) ? elementosGuardados : ELEMENTOS_INICIALES
  const { alertas, notificar, cerrar } = useAlertas()
  const { mudo, alternar } = useSonidos()

  const poderTotal = elementos.reduce((acc, item) => acc + Number(item.poder || 0), 0)

  return (
    <div
      className="rx-root"
      onClickCapture={(evento) => {
        const boton = evento.target.closest?.('button')
        if (boton && !boton.disabled) reproducir('click')
      }}
    >
      <section className="rx-hero">
        <div className="rx-hero__fondo" aria-hidden="true">
          <span className="rx-hero__orb rx-hero__orb--cyan" />
          <span className="rx-hero__orb rx-hero__orb--magenta" />
          <span className="rx-hero__grid" />
        </div>

        <div className="rx-hero__contenido">
          <span className="rx-kicker">⚡ Array.prototype.reduce · laboratorio vivo</span>
          <h3 className="rx-hero__titulo">
            REDUCE <span>ARENA</span>
          </h3>
          <p className="rx-hero__texto">
            Manipulación directa, feedback inmediato y un sandbox seguro. Construye tu array,
            escribe código real y sal a destruir objetivos en primera persona.
          </p>

          <div className="rx-chips">
            <span>🧩 Manipulación directa</span>
            <span>⚡ Feedback inmediato</span>
            <span>🛡️ Sandbox seguro</span>
            <span>🔊 Sonidos</span>
            <span>💾 Se guarda solo</span>
          </div>

          <div className="rx-hero__nav">
            <button type="button" className="rx-btn rx-btn--primary" onClick={() => irA('rx-juego')}>
              🎮 Ir al juego
            </button>
            <button type="button" className="rx-btn rx-btn--ghost" onClick={() => irA('rx-editor')}>
              ⌨️ Abrir editor
            </button>
            <button type="button" className="rx-btn rx-btn--ghost" onClick={() => irA('rx-array')}>
              🧩 Editar array
            </button>
          </div>
        </div>

        <aside className="rx-hero__panel">
          <span className="rx-hero__panel-label">ACC actual</span>
          <strong key={poderTotal} className="rx-hero__panel-num">{poderTotal}</strong>
          <span className="rx-hero__panel-sub">poder acumulado</span>
          <div className="rx-hero__panel-fila">
            <span>{elementos.length} elementos</span>
            <span className="rx-dot is-on" />
            <span>localStorage</span>
          </div>
          <div className="rx-hero__panel-fila">
            <span>Editor</span>
            <span className="rx-badge rx-badge--cyan">aislado</span>
          </div>
          <div className="rx-hero__panel-fila">
            <span>Sonido</span>
            <button
              type="button"
              className="rx-btn rx-btn--ghost rx-btn--mini"
              onClick={alternar}
              aria-pressed={Boolean(mudo)}
            >
              {mudo ? '🔇 Off' : '🔊 On'}
            </button>
          </div>
        </aside>
      </section>

      <EjemplosInteractivos
        elementos={elementos}
        setElementos={setElementos}
        reiniciarElementos={reiniciarElementos}
        notificar={notificar}
      />

      <div id="rx-editor">
        <EditorSandbox datos={elementos} notificar={notificar} />
      </div>

      <div id="rx-juego">
        <JuegoPistolas notificar={notificar} mudo={mudo} alternarMudo={alternar} />
      </div>

      <Alertas alertas={alertas} onCerrar={cerrar} />
    </div>
  )
}
