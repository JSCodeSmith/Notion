import { useMemo, useState } from 'react'

const TIPOS = {
  pistola: { label: 'Pistola', icono: '🔫', clase: 'pistola' },
  sonido: { label: 'Sonido', icono: '🔊', clase: 'sonido' },
  alerta: { label: 'Alerta', icono: '🚨', clase: 'alerta' },
}

const nuevoId = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `el-${Date.now()}-${Math.random().toString(16).slice(2)}`

export default function EjemplosInteractivos({
  elementos,
  setElementos,
  reiniciarElementos,
  notificar,
}) {
  const [nombre, setNombre] = useState('')
  const [tipo, setTipo] = useState('pistola')
  const [poder, setPoder] = useState('45')
  const [error, setError] = useState('')

  const total = useMemo(
    () => elementos.reduce((acc, item) => acc + Number(item.poder || 0), 0),
    [elementos],
  )

  const porTipo = useMemo(
    () =>
      elementos.reduce((acc, item) => {
        acc[item.tipo] = (acc[item.tipo] ?? 0) + 1
        return acc
      }, {}),
    [elementos],
  )

  const mayor = useMemo(
    () =>
      elementos.reduce(
        (acc, item) => (Number(item.poder) > Number(acc.poder) ? item : acc),
        elementos[0] ?? { nombre: '—', poder: 0 },
      ),
    [elementos],
  )

  const pasos = useMemo(
    () =>
      elementos.reduce((lista, item) => {
        const anterior = lista.length > 0 ? lista[lista.length - 1].acumulado : 0
        lista.push({
          id: item.id,
          nombre: item.nombre,
          poder: item.poder,
          acumulado: anterior + Number(item.poder || 0),
        })
        return lista
      }, []),
    [elementos],
  )

  const agregar = (evento) => {
    evento.preventDefault()
    const limpio = nombre.trim()

    if (limpio.length < 2) {
      setError('Escribe un nombre de al menos 2 caracteres.')
      notificar?.('Nombre demasiado corto', { tipo: 'error', texto: 'Necesita 2 caracteres o más.' })
      return
    }
    if (elementos.some((item) => item.nombre.toLowerCase() === limpio.toLowerCase())) {
      setError('Ya existe un elemento con ese nombre.')
      notificar?.('Ese elemento ya existe', { tipo: 'error', texto: 'Prueba con otro nombre.' })
      return
    }

    const valor = Number(poder)
    if (!Number.isFinite(valor) || valor < 1 || valor > 999) {
      setError('El poder debe ser un número entre 1 y 999.')
      notificar?.('Poder inválido', { tipo: 'error', texto: 'Usa un número entre 1 y 999.' })
      return
    }

    const elemento = {
      id: nuevoId(),
      nombre: limpio,
      tipo,
      poder: Math.round(valor),
    }

    setElementos((prev) => [...prev, elemento])
    setNombre('')
    setError('')
    notificar?.('¡Elemento añadido!', {
      tipo: 'exito',
      texto: `${TIPOS[tipo].label} “${limpio}” · poder ${elemento.poder}`,
    })
  }

  const eliminar = (elemento) => {
    setElementos((prev) => prev.filter((item) => item.id !== elemento.id))
    notificar?.('Elemento eliminado', {
      tipo: 'info',
      texto: `“${elemento.nombre}” salió del array.`,
    })
  }

  const restaurar = () => {
    reiniciarElementos()
    setError('')
    notificar?.('Array restaurado', {
      tipo: 'info',
      texto: 'Volvieron los tres elementos de ejemplo.',
    })
  }

  const promedio = elementos.length > 0 ? Math.round(total / elementos.length) : 0

  return (
    <section id="rx-array" className="rx-card rx-builder" aria-labelledby="rx-builder-titulo">
      <header className="rx-head">
        <div>
          <span className="rx-kicker">🧩 Ejemplos vivos</span>
          <h3 id="rx-builder-titulo" className="rx-title">Construye tu propio array</h3>
          <p className="rx-sub">
            Agrega pistolas, sonidos y alertas. El array crece, se guarda solo y el resultado de
            <code> reduce() </code> cambia al instante.
          </p>
        </div>
        <div className="rx-head__actions">
          <button type="button" className="rx-btn rx-btn--ghost" onClick={restaurar}>
            ↺ Restaurar
          </button>
        </div>
      </header>

      <div className="rx-builder__grid">
        <form className="rx-form" onSubmit={agregar}>
          <label className="rx-field">
            <span>Nombre del elemento</span>
            <input
              value={nombre}
              onChange={(evento) => {
                setNombre(evento.target.value)
                setError('')
              }}
              placeholder="Ej: Rifle Synthwave"
              maxLength={28}
            />
          </label>

          <div className="rx-form__fila">
            <label className="rx-field">
              <span>Tipo</span>
              <select value={tipo} onChange={(evento) => setTipo(evento.target.value)}>
                {Object.entries(TIPOS).map(([id, meta]) => (
                  <option key={id} value={id}>
                    {meta.icono} {meta.label}
                  </option>
                ))}
              </select>
            </label>

            <label className="rx-field rx-field--short">
              <span>Poder</span>
              <input
                type="number"
                min="1"
                max="999"
                value={poder}
                onChange={(evento) => {
                  setPoder(evento.target.value)
                  setError('')
                }}
              />
            </label>
          </div>

          <button type="submit" className="rx-btn rx-btn--primary rx-btn--block">
            + Añadir elemento
          </button>

          {error && <p className="rx-form__error" role="alert">⚠️ {error}</p>}

          <p className="rx-form__hint">
            Se guarda en <code>localStorage</code> automáticamente.
          </p>
        </form>

        <div className="rx-lista">
          <div className="rx-lista__head">
            <span>array de elementos</span>
            <span className="rx-badge rx-badge--magenta">n = {elementos.length}</span>
          </div>

          {elementos.length === 0 ? (
            <p className="rx-lista__vacio">Tu array está vacío. Añade el primer elemento ✨</p>
          ) : (
            <ul className="rx-elementos">
              {elementos.map((item) => {
                const meta = TIPOS[item.tipo] ?? TIPOS.pistola
                return (
                  <li key={item.id} className={`rx-elemento rx-elemento--${meta.clase}`}>
                    <span className="rx-elemento__icono" aria-hidden="true">{meta.icono}</span>
                    <div className="rx-elemento__info">
                      <strong>{item.nombre}</strong>
                      <span>{meta.label}</span>
                    </div>
                    <span className="rx-elemento__poder">+{item.poder}</span>
                    <button
                      type="button"
                      className="rx-elemento__borrar"
                      onClick={() => eliminar(item)}
                      aria-label={`Eliminar ${item.nombre}`}
                    >
                      ×
                    </button>
                  </li>
                )
              })}
            </ul>
          )}

          <div className="rx-traza" aria-label="Acumulador paso a paso">
            <span className="rx-traza__label">acc</span>
            <span className="rx-traza__inicio">0</span>
            {pasos.map((paso) => (
              <span key={paso.id} className="rx-traza__paso" title={`${paso.nombre}: +${paso.poder}`}>
                <i>{paso.poder}</i>
                <b>{paso.acumulado}</b>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="rx-stats">
        <div className="rx-stat">
          <span>Poder total</span>
          <strong key={total} className="rx-stat__num">{total}</strong>
          <small>reduce((acc, item) =&gt; acc + item.poder, 0)</small>
        </div>
        <div className="rx-stat">
          <span>Promedio</span>
          <strong key={`p-${promedio}`} className="rx-stat__num">{promedio}</strong>
          <small>total / elementos.length</small>
        </div>
        <div className="rx-stat">
          <span>Más poderoso</span>
          <strong className="rx-stat__nombre">{mayor.nombre}</strong>
          <small>{mayor.poder} de poder</small>
        </div>
        <div className="rx-stat">
          <span>Por tipo</span>
          <div className="rx-stat__tipos">
            {Object.entries(TIPOS).map(([id, meta]) => (
              <span key={id} className={`rx-mini rx-mini--${meta.clase}`}>
                {meta.icono} {porTipo[id] ?? 0}
              </span>
            ))}
          </div>
          <small>agrupado con reduce()</small>
        </div>
      </div>

      <pre className="rx-snippet">{`const total = elementos.reduce((acc, item) => acc + item.poder, 0);
// ${total}`}</pre>
    </section>
  )
}
