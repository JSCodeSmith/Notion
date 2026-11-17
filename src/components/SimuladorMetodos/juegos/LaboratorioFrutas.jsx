import { useMemo, useState } from 'react'
import './LaboratorioFrutas.css'

/* Laboratorio 3D de búsqueda de frutas para findIndex, findLast,
   findLastIndex, indexOf y lastIndexOf. */

const MANZANAS = [
  { emoji: '🍎', label: 'Manzana', sub: 'fresca', podrida: false },
  { emoji: '🍎', label: 'Manzana', sub: 'fresca', podrida: false },
  { emoji: '🍎', label: 'Manzana', sub: 'fresca', podrida: false },
  { emoji: '🍎', label: 'Manzana', sub: 'con golpe', podrida: false },
  { emoji: '🍎', label: 'Manzana', sub: 'podrida', podrida: true },
  { emoji: '🍎', label: 'Manzana', sub: 'fresca', podrida: false },
  { emoji: '🍎', label: 'Manzana', sub: 'podrida', podrida: true },
  { emoji: '🍎', label: 'Manzana', sub: 'fresca', podrida: false },
  { emoji: '🍎', label: 'Manzana', sub: 'fresca', podrida: false },
  { emoji: '🍎', label: 'Manzana', sub: 'podrida', podrida: true },
]

const FRESAS = [
  { emoji: '🍓', label: 'Fresa', sub: 'madura', madura: true },
  { emoji: '🍓', label: 'Fresa', sub: 'verde', madura: false },
  { emoji: '🍓', label: 'Fresa', sub: 'madura', madura: true },
  { emoji: '🍓', label: 'Fresa', sub: 'madura', madura: true },
  { emoji: '🍓', label: 'Fresa', sub: 'verde', madura: false },
  { emoji: '🍓', label: 'Fresa', sub: 'madura', madura: true },
  { emoji: '🍓', label: 'Fresa', sub: 'verde', madura: false },
  { emoji: '🍓', label: 'Fresa', sub: 'verde', madura: false },
  { emoji: '🍓', label: 'Fresa', sub: 'madura', madura: true },
  { emoji: '🍓', label: 'Fresa', sub: 'verde', madura: false },
]

const BANANAS = [
  { emoji: '🍌', label: 'Banana', sub: 'verde', madura: false },
  { emoji: '🍌', label: 'Banana', sub: 'madura', madura: true },
  { emoji: '🍌', label: 'Banana', sub: 'verde', madura: false },
  { emoji: '🍌', label: 'Banana', sub: 'verde', madura: false },
  { emoji: '🍌', label: 'Banana', sub: 'madura', madura: true },
  { emoji: '🍌', label: 'Banana', sub: 'con manchas', madura: false },
  { emoji: '🍌', label: 'Banana', sub: 'verde', madura: false },
  { emoji: '🍌', label: 'Banana', sub: 'madura', madura: true },
  { emoji: '🍌', label: 'Banana', sub: 'verde', madura: false },
  { emoji: '🍌', label: 'Banana', sub: 'verde', madura: false },
]

const CESTA = ['🍌', '🍇', '🍎', '🍓', '🍌', '🍉', '🍇', '🍓', '🍊', '🍎'].map(
  (emoji, i) => ({
    emoji,
    label: emoji === '🍎' ? 'Manzana' : 'Fruta',
    sub: `índice ${i}`,
    esManzana: emoji === '🍎',
  })
)

const RETOS = {
  findindex: {
    nombre: 'FRUIT FINDER',
    metodo: 'findIndex()',
    icon: '🍎',
    personaje: '👩‍🌾',
    mision: 'Encuentra la posición de la primera manzana podrida.',
    criterio: (item) => item.podrida,
    criterioTexto: 'manzana.podrida === true',
    items: MANZANAS,
    esperado: 4,
    direccion: 'inicio',
    retorno: '4',
    explicacion:
      'findIndex() recorre desde el inicio y se detiene en la primera coincidencia. La manzana podrida aparece en la posición 4, así que devuelve 4.',
    codigo: 'manzanas.findIndex(m => m.podrida) // 4',
    pista: 'El puntero avanza desde la posición 0. La primera manzana con manchas está antes de la mitad de la estantería.',
  },
  findlast: {
    nombre: 'LAST FRUIT HUNTER',
    metodo: 'findLast()',
    icon: '🍓',
    personaje: '🕵️',
    mision: 'Encuentra la última fresa madura.',
    criterio: (item) => item.madura,
    criterioTexto: 'fresa.madura === true',
    items: FRESAS,
    esperado: 8,
    direccion: 'final',
    retorno: 'la fresa madura de la posición 8',
    explicacion:
      'findLast() recorre desde el final hacia el inicio y devuelve el elemento (no el índice) de la última coincidencia. La última fresa madura está en la posición 8.',
    codigo: 'fresas.findLast(f => f.madura) // fresa madura (índice 8)',
    pista: 'Empieza por el final: la fresa de la última posición está verde. Sigue retrocediendo hasta la primera madura que encuentres.',
  },
  findlastindex: {
    nombre: 'FRUIT POSITION TRACKER',
    metodo: 'findLastIndex()',
    icon: '🍌',
    personaje: '🧑‍🔬',
    mision: 'Encuentra la posición de la última banana madura.',
    criterio: (item) => item.madura,
    criterioTexto: 'banana.madura === true',
    items: BANANAS,
    esperado: 7,
    direccion: 'final',
    retorno: '7',
    explicacion:
      'findLastIndex() recorre desde el final y devuelve el índice de la última coincidencia. La última banana madura está en la posición 7.',
    codigo: 'bananas.findLastIndex(b => b.madura) // 7',
    pista: 'Desde el final, descarta las bananas verdes hasta encontrar la primera madura en sentido inverso.',
  },
  indexof: {
    nombre: 'FRUIT CODE SCANNER',
    metodo: 'indexOf()',
    icon: '🔎',
    personaje: '🧑‍💻',
    mision: 'Busca dónde aparece por primera vez una manzana en la colección.',
    criterio: (item) => item.esManzana,
    criterioTexto: "cesta.indexOf('🍎')",
    items: CESTA,
    esperado: 2,
    direccion: 'inicio',
    retorno: '2',
    explicacion:
      "indexOf() busca un valor y devuelve el índice de su primera aparición. La primera manzana está en la posición 2.",
    codigo: "cesta.indexOf('🍎') // 2",
    pista: 'El escáner va del inicio al final comparando el valor de cada posición con 🍎.',
  },
  lastindexof: {
    nombre: 'LAST FRUIT LOCATION',
    metodo: 'lastIndexOf()',
    icon: '📍',
    personaje: '🧑‍🚀',
    mision: 'Encuentra la última aparición de una manzana.',
    criterio: (item) => item.esManzana,
    criterioTexto: "cesta.lastIndexOf('🍎')",
    items: CESTA,
    esperado: 9,
    direccion: 'final',
    retorno: '9',
    explicacion:
      'lastIndexOf() busca el valor desde el final y devuelve el índice de su última aparición. La última manzana está en la posición 9.',
    codigo: "cesta.lastIndexOf('🍎') // 9",
    pista: 'El escáner arranca en la última posición y retrocede hasta toparse con una manzana.',
  },
}

const ORDEN = ['findindex', 'findlast', 'findlastindex', 'indexof', 'lastindexof']

const inicioCursor = (reto) => (reto.direccion === 'inicio' ? 0 : reto.items.length - 1)

export default function LaboratorioFrutas({ metodoId = 'findindex' }) {
  const inicial = RETOS[metodoId] ? metodoId : 'findindex'
  const [activo, setActivo] = useState(inicial)
  const [cursor, setCursor] = useState(() => inicioCursor(RETOS[inicial]))
  const [revelados, setRevelados] = useState([])
  const [examinados, setExaminados] = useState([])
  const [resuelto, setResuelto] = useState(false)
  const [mensaje, setMensaje] = useState(null)
  const [aciertos, setAciertos] = useState(() => new Set())

  const reto = RETOS[activo]
  const { items, esperado, direccion } = reto

  const reiniciar = (id = activo) => {
    setActivo(id)
    setCursor(inicioCursor(RETOS[id]))
    setRevelados([])
    setExaminados([])
    setResuelto(false)
    setMensaje(null)
  }

  const revelar = (i) => setRevelados((prev) => (prev.includes(i) ? prev : [...prev, i]))

  const marcarAcierto = (id) =>
    setAciertos((prev) => {
      if (prev.has(id)) return prev
      const next = new Set(prev)
      next.add(id)
      return next
    })

  const resolver = () => {
    setResuelto(true)
    setRevelados(items.map((_, i) => i))
    marcarAcierto(activo)
  }

  const avanzar = () => {
    if (resuelto) return
    const i = cursor
    if (i < 0 || i >= items.length) return
    const item = items[i]
    const cumple = reto.criterio(item)
    revelar(i)
    setExaminados((prev) => (prev.includes(i) ? prev : [...prev, i]))

    if (cumple) {
      resolver()
      setMensaje({
        tipo: 'ok',
        texto: `¡Encontrado! En la posición ${i} hay ${item.emoji} ${item.label} (${item.sub}). ${reto.metodo} devuelve ${reto.retorno}.`,
      })
      return
    }

    setMensaje({
      tipo: 'paso',
      texto: `Posición ${i}: ${item.emoji} ${item.label} (${item.sub}). No cumple «${reto.criterioTexto}». El puntero sigue ${direccion === 'inicio' ? 'hacia la derecha' : 'hacia la izquierda'}.`,
    })
    const siguiente = direccion === 'inicio' ? i + 1 : i - 1
    if (siguiente < 0 || siguiente >= items.length) {
      setResuelto(true)
      setMensaje({
        tipo: 'fail',
        texto: `El puntero llegó al borde sin encontrar coincidencias. El método devolvería ${direccion === 'inicio' ? '-1' : '-1'} (o undefined en findLast/findLastIndex).`,
      })
      return
    }
    setCursor(siguiente)
  }

  const elegir = (i) => {
    if (resuelto) return
    revelar(i)
    const item = items[i]
    const cumple = reto.criterio(item)

    if (i === esperado) {
      resolver()
      setMensaje({
        tipo: 'ok',
        texto: `¡Correcto! La posición ${i} es la que devuelve ${reto.metodo}: ${reto.retorno}.`,
      })
      return
    }

    if (cumple) {
      setMensaje({
        tipo: 'cerca',
        texto: `Aquí sí hay una coincidencia (${item.sub}), pero ${reto.metodo} se detiene en la ${direccion === 'inicio' ? 'primera' : 'última'}. Busca más ${direccion === 'inicio' ? 'a la izquierda' : 'a la derecha'}.`,
      })
    } else {
      setMensaje({
        tipo: 'fail',
        texto: `Posición ${i}: ${item.emoji} ${item.label} (${item.sub}). No cumple «${reto.criterioTexto}». Prueba otra posición o usa el paso a paso.`,
      })
    }
  }

  const progreso = useMemo(() => {
    if (resuelto) return 100
    return Math.round((examinados.length / items.length) * 100)
  }, [resuelto, examinados.length, items.length])

  const cursorVisible = resuelto ? -1 : cursor

  return (
    <section className="lfr">
      <header className="lfr__head">
        <div className="lfr__brand">
          <img className="lfr__avatar" src="/apuntes/frutas/frutas5.jpg" alt="Personaje explorador de frutas" />
          <div>
            <span className="lfr__kicker">Laboratorio de búsqueda de frutas · 3D</span>
            <h3 className="lfr__title">Laboratorio de frutas</h3>
            <p className="lfr__desc">
              Acompaña al personaje por la estantería y descubre qué posición devuelve cada método.
            </p>
          </div>
        </div>
        <div className="lfr__score">
          <span>🏅 Misiones</span>
          <strong>{aciertos.size} / {ORDEN.length}</strong>
        </div>
      </header>

      <nav className="lfr__tabs" aria-label="Métodos de búsqueda de frutas">
        {ORDEN.map((id) => {
          const r = RETOS[id]
          return (
            <button
              key={id}
              type="button"
              className={`lfr__tab ${activo === id ? 'is-active' : ''}`}
              onClick={() => reiniciar(id)}
            >
              <span className="lfr__tab-icon">{r.icon}</span>
              <strong>{r.nombre}</strong>
              <small>{r.metodo}</small>
              {aciertos.has(id) && <span className="lfr__tab-check">✓</span>}
            </button>
          )
        })}
      </nav>

      <div className="lfr__mission">
        <div>
          <span className="lfr__mission-label">Misión</span>
          <p>{reto.mision}</p>
          <code className="lfr__criterio">{reto.criterioTexto}</code>
        </div>
        <div className="lfr__direction">
          {direccion === 'inicio' ? '➡️ Desde el inicio' : '⬅️ Desde el final'}
        </div>
      </div>

      <div className="lfr__stage">
        <div className="lfr__grid">
          {items.map((item, i) => {
            const visible = revelados.includes(i)
            const esCursor = cursorVisible === i
            const esCorrecto = resuelto && i === esperado
            const clase = [
              'lfr-tile',
              visible ? 'is-visible' : 'is-hidden',
              esCursor ? 'is-cursor' : '',
              esCorrecto ? 'is-correct' : '',
            ]
              .filter(Boolean)
              .join(' ')

            return (
              <button
                key={i}
                type="button"
                className={clase}
                onClick={() => elegir(i)}
                title={visible ? `${item.label} · ${item.sub}` : 'Frutero cerrado: inspecciona esta posición'}
              >
                <span className="lfr-tile__index">{i}</span>
                {esCursor && <span className="lfr-tile__char">{reto.personaje}</span>}
                <span className="lfr-tile__lid" aria-hidden="true">📦</span>
                <span className="lfr-tile__fruit">
                  <span className="lfr-tile__emoji">{item.emoji}</span>
                  <span className="lfr-tile__sub">{item.sub}</span>
                </span>
              </button>
            )
          })}
        </div>

        <div className="lfr__hud">
          <div className="lfr__bar" aria-hidden="true">
            <span style={{ width: `${progreso}%` }} />
          </div>
          <div className="lfr__hud-row">
            <span>Exploradas: <strong>{examinados.length}</strong> / {items.length}</span>
            <span>Puntero: <strong>{resuelto ? '—' : cursor}</strong></span>
          </div>
        </div>
      </div>

      {mensaje && (
        <div className={`lfr__msg is-${mensaje.tipo}`}>
          <span>{mensaje.tipo === 'ok' ? '✅' : mensaje.tipo === 'cerca' ? '🧭' : mensaje.tipo === 'fail' ? '🚫' : '👀'}</span>
          <p>{mensaje.texto}</p>
        </div>
      )}

      {resuelto && (
        <div className="lfr__result">
          <div className="lfr__result-head">
            <h4>🎉 {reto.nombre} completado</h4>
            <span className="lfr__result-value">{reto.metodo} → {reto.retorno}</span>
          </div>
          <p>{reto.explicacion}</p>
          <code className="lfr__code">{reto.codigo}</code>
        </div>
      )}

      <div className="lfr__actions">
        <button type="button" className="lfr-btn" onClick={() => reiniciar()} disabled={resuelto}>
          ↺ Reiniciar misión
        </button>
        <button type="button" className="lfr-btn lfr-btn--primary" onClick={avanzar} disabled={resuelto}>
          {direccion === 'inicio' ? 'Avanzar puntero →' : '← Retroceder puntero'}
        </button>
        <button type="button" className="lfr-btn lfr-btn--ghost" onClick={() => setMensaje({ tipo: 'pista', texto: reto.pista })}>
          💡 Pista
        </button>
      </div>

      <footer className="lfr__foot">
        <div className="lfr__guide">
          <img src="/apuntes/frutas/frutas4.jpg" alt="Mapa de frutas del laboratorio" />
          <p>
            <strong>Guía del explorador:</strong> los fruteros cerrados ocultan la fruta. Pulsa una posición para
            inspeccionarla o avanza el puntero paso a paso. El personaje se mueve contigo.
          </p>
        </div>
      </footer>
    </section>
  )
}
