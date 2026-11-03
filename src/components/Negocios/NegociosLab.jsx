import { useEffect, useMemo, useState } from 'react'
import { NEGOCIOS_APUNTES } from '../../data/negociosApuntes'
import { misionesDeNota } from './labMisiones'
import {
  avanceDe,
  calcularMedallas,
  calcularXp,
  cargarProgreso,
  guardarProgreso,
  mezclar,
  misionesDe,
  PROGRESO_INICIAL,
} from './labMotor'
import './Negocios.css'

const TIPOS = {
  emparejar: { icono: '🧩', etiqueta: 'Emparejar' },
  completar: { icono: '✏️', etiqueta: 'Completar' },
  clasificar: { icono: '🗂️', etiqueta: 'Clasificar' },
  ordenar: { icono: '🔢', etiqueta: 'Ordenar' },
}

const NIVEL = { Fácil: 'facil', Medio: 'medio', Difícil: 'dificil' }

/* Total de misiones de los 63 apuntes: curadas + automáticas. */
const TOTAL_MISIONES = Object.values(NEGOCIOS_APUNTES).reduce(
  (total, nota) => total + misionesDe(nota, misionesDeNota(nota.id)).length,
  0,
)

const Dificultad = ({ nivel }) => (
  <span className={`nlab-dif nlab-dif--${NIVEL[nivel] ?? 'medio'}`}>
    {nivel}
  </span>
)

/* ---------- Motor: emparejar concepto ↔ descripción ---------- */

function MotorEmparejar({ mision, onResuelto, onFallo }) {
  const [hechos, setHechos] = useState(() => new Set())
  const [sel, setSel] = useState(null)
  const [fallo, setFallo] = useState(-1)
  const orden = useMemo(
    () => mezclar(mision.pares.map((_, i) => i), mision.id),
    [mision]
  )

  const elegirConcepto = (i) => {
    if (hechos.has(i)) return
    setSel(i)
    setFallo(-1)
  }

  const elegirDescripcion = (j) => {
    if (hechos.has(j)) return
    if (sel === null) {
      setFallo(j)
      return
    }
    if (sel === j) {
      const nuevos = new Set(hechos)
      nuevos.add(j)
      setHechos(nuevos)
      setSel(null)
      setFallo(-1)
      if (nuevos.size === mision.pares.length) onResuelto()
      return
    }
    onFallo()
    setFallo(j)
    setSel(null)
  }

  const listo = hechos.size === mision.pares.length

  return (
    <div className="nlab-grid">
      <div className="nlab-col">
        <p className="nlab-col__title">Conceptos</p>
        {mision.pares.map((par, i) => (
          <button
            key={i}
            type="button"
            className={`nlab-chip nlab-chip--izq ${
              hechos.has(i) ? 'is-done' : ''
            } ${sel === i ? 'is-sel' : ''}`}
            onClick={() => elegirConcepto(i)}
            disabled={hechos.has(i)}
          >
            {par.concepto}
          </button>
        ))}
      </div>

      <div className="nlab-col">
        <p className="nlab-col__title">Descripciones</p>
        {orden.map((j) => (
          <button
            key={j}
            type="button"
            className={`nlab-chip nlab-chip--der ${
              hechos.has(j) ? 'is-done' : ''
            } ${fallo === j ? 'is-fail' : ''}`}
            onClick={() => elegirDescripcion(j)}
            disabled={hechos.has(j)}
          >
            {mision.pares[j].descripcion}
          </button>
        ))}
      </div>

      {listo && (
        <p className="nlab-listo">
          ✅ Los {mision.pares.length} conceptos están unidos con su
          descripción.
        </p>
      )}
    </div>
  )
}

/* ---------- Motor: completar la definición ---------- */

function MotorCompletar({ mision, onResuelto, onFallo }) {
  const opciones = useMemo(
    () => mezclar(mision.opciones, mision.id),
    [mision]
  )
  const [elegida, setElegida] = useState(null)
  const [ok, setOk] = useState(false)
  const [fallo, setFallo] = useState(-1)

  const [antes, despues] = mision.frase.split('__________')

  const elegir = (opcion) => {
    if (ok) return
    if (opcion === mision.correcto) {
      setElegida(opcion)
      setOk(true)
      setFallo(-1)
      onResuelto()
      return
    }
    onFallo()
    setElegida(opcion)
    setFallo(opcion)
  }

  return (
    <div className="nlab-completar">
      <p className="nlab-frase">
        {antes}
        <span
          className={`nlab-hueco ${ok ? 'is-ok' : ''} ${
            elegida && !ok ? 'is-fail' : ''
          }`}
        >
          {elegida ?? '__________'}
        </span>
        {despues}
      </p>

      <div className="nlab-opciones">
        {opciones.map((opcion) => (
          <button
            key={opcion}
            type="button"
            className={`nlab-op ${
              ok && opcion === mision.correcto ? 'is-ok' : ''
            } ${fallo === opcion ? 'is-fail' : ''}`}
            onClick={() => elegir(opcion)}
            disabled={ok}
          >
            {opcion}
          </button>
        ))}
      </div>

      {ok && <p className="nlab-listo">✅ Completaste la definición.</p>}
    </div>
  )
}

/* ---------- Motor: clasificar en categorías ---------- */

function MotorClasificar({ mision, onResuelto, onFallo }) {
  const elementos = useMemo(
    () => mezclar(mision.elementos, mision.id),
    [mision]
  )
  const [colocados, setColocados] = useState({})
  const [sel, setSel] = useState(null)
  const [fallo, setFallo] = useState('')

  const total = mision.elementos.length
  const colocado = (cat) =>
    mision.elementos.filter((el) => colocados[el.id] === cat)

  const elegirElemento = (id) => {
    if (colocados[id]) return
    setSel(id)
    setFallo('')
  }

  const soltar = (cat) => {
    if (!sel) return
    const elemento = mision.elementos.find((el) => el.id === sel)
    if (!elemento) return
    if (elemento.categoria === cat) {
      const nuevos = { ...colocados, [elemento.id]: cat }
      setColocados(nuevos)
      setSel(null)
      setFallo('')
      if (Object.keys(nuevos).length === total) onResuelto()
      return
    }
    onFallo()
    setFallo(`«${elemento.texto}» no va en ${cat}.`)
    setSel(null)
  }

  const pendientes = elementos.filter((el) => !colocados[el.id])

  return (
    <div className="nlab-clasif">
      <div className="nlab-bolsa">
        <p className="nlab-col__title">
          Sin clasificar · {pendientes.length}
        </p>
        <div className="nlab-bolsa__chips">
          {pendientes.map((el) => (
            <button
              key={el.id}
              type="button"
              className={`nlab-chip ${sel === el.id ? 'is-sel' : ''}`}
              onClick={() => elegirElemento(el.id)}
            >
              {el.texto}
            </button>
          ))}
          {!pendientes.length && (
            <p className="nlab-listo">✅ Todo clasificado.</p>
          )}
        </div>
      </div>

      <div className="nlab-cajas">
        {mision.categorias.map((cat) => (
          <div key={cat} className="nlab-caja">
            <button
              type="button"
              className="nlab-caja__head"
              onClick={() => soltar(cat)}
              disabled={!sel}
            >
              {cat}
              <span>{colocado(cat).length}</span>
            </button>
            <div className="nlab-caja__cuerpo">
              {colocado(cat).map((el) => (
                <span key={el.id} className="nlab-chip is-done">
                  {el.texto}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {fallo && <p className="nlab-error">❌ {fallo}</p>}
      {!fallo && sel && (
        <p className="nlab-pista-line">👆 Elige una categoría para colocarlo.</p>
      )}
    </div>
  )
}

/* ---------- Motor: ordenar los pasos ---------- */

function MotorOrdenar({ mision, onResuelto, onFallo }) {
  const n = mision.pasos.length
  const [respuesta, setRespuesta] = useState([])
  const [fallo, setFallo] = useState('')
  const [ok, setOk] = useState(false)
  const [semilla, setSemilla] = useState(0)
  const restantes = useMemo(
    () => mezclar(mision.pasos.map((_, i) => i), `${mision.id}${semilla}`),
    [mision, semilla]
  )

  const disponibles = restantes.filter((i) => !respuesta.includes(i))

  const agregar = (i) => {
    if (ok) return
    setRespuesta((prev) => [...prev, i])
    setFallo('')
  }

  const quitar = (i) => {
    if (ok) return
    setRespuesta((prev) => prev.filter((x) => x !== i))
    setFallo('')
  }

  const comprobar = () => {
    if (respuesta.length !== n) {
      onFallo()
      setFallo(`Te faltan ${n - respuesta.length} paso(s) por colocar.`)
      return
    }
    const falloEn = respuesta.findIndex((valor, i) => valor !== i)
    if (falloEn === -1) {
      setOk(true)
      setFallo('')
      onResuelto()
      return
    }
    onFallo()
    setFallo(`El paso ${falloEn + 1} no es el correcto: revisa el orden.`)
  }

  const reiniciar = () => {
    setRespuesta([])
    setFallo('')
    setOk(false)
    setSemilla((s) => s + 1)
  }

  return (
    <div className="nlab-orden">
      <p className="nlab-col__title">Tu secuencia · {respuesta.length}/{n}</p>
      <div className="nlab-orden__lista">
        {!respuesta.length && (
          <p className="nlab-vacio">
            Toca los pasos de abajo en el orden en que ocurren.
          </p>
        )}
        {respuesta.map((i, posicion) => (
          <button
            key={`${i}-${posicion}`}
            type="button"
            className={`nlab-paso ${ok ? 'is-done' : ''}`}
            onClick={() => quitar(i)}
            disabled={ok}
          >
            <span>{posicion + 1}</span>
            {mision.pasos[i]}
          </button>
        ))}
      </div>

      <p className="nlab-col__title">Pasos disponibles</p>
      <div className="nlab-orden__pool">
        {disponibles.map((i) => (
          <button
            key={i}
            type="button"
            className="nlab-paso nlab-paso--libre"
            onClick={() => agregar(i)}
            disabled={ok}
          >
            {mision.pasos[i]}
          </button>
        ))}
      </div>

      <div className="nlab-acciones">
        <button
          type="button"
          className="nlab-btn nlab-btn--primary"
          onClick={comprobar}
          disabled={ok}
        >
          Comprobar orden
        </button>
        <button
          type="button"
          className="nlab-btn"
          onClick={reiniciar}
          disabled={ok}
        >
          Mezclar
        </button>
      </div>

      {fallo && <p className="nlab-error">❌ {fallo}</p>}
      {ok && <p className="nlab-listo">✅ Orden correcto.</p>}
    </div>
  )
}

const MOTORES = {
  emparejar: MotorEmparejar,
  completar: MotorCompletar,
  clasificar: MotorClasificar,
  ordenar: MotorOrdenar,
}

/* ---------- Laboratorio ---------- */

export default function NegociosLab({ nota, onCerrar, misionInicial = null }) {
  const misiones = useMemo(
    () => misionesDe(nota, misionesDeNota(nota.id)),
    [nota]
  )

  const [progreso, setProgreso] = useState(cargarProgreso)
  const [misionId, setMisionId] = useState(
    () =>
      misionInicial ??
      misiones.find((m) => !cargarProgreso().resueltas[m.id])?.id ??
      misiones[0]?.id ??
      null
  )
  const [pistas, setPistas] = useState(0)
  const [solucionVista, setSolucionVista] = useState(false)
  const [ultimo, setUltimo] = useState(null)
  const [repetir, setRepetir] = useState(0)

  useEffect(() => {
    guardarProgreso(progreso)
  }, [progreso])

  const mision = misiones.find((m) => m.id === misionId) ?? null
  const resueltas = Object.keys(progreso.resueltas).length
  const { actual, siguiente, avance } = avanceDe(progreso.xp)
  const medallas = useMemo(
    () => calcularMedallas(progreso, misiones),
    [progreso, misiones]
  )

  const seleccionar = (id) => {
    setMisionId(id)
    setPistas(0)
    setSolucionVista(false)
    setUltimo(null)
    setRepetir(0)
  }

  const registrarFallo = () => {
    setProgreso((prev) =>
      prev.racha === 0 ? prev : { ...prev, racha: 0 }
    )
  }

  const resolver = () => {
    if (!mision) return
    const ya = Boolean(progreso.resueltas[mision.id])
    const xpGanado = ya ? 0 : calcularXp(mision, pistas, solucionVista)

    setProgreso((prev) => {
      const previa = prev.resueltas[mision.id]
      if (previa) {
        return {
          ...prev,
          resueltas: {
            ...prev.resueltas,
            [mision.id]: {
              ...previa,
              intentos: (previa.intentos ?? 0) + 1,
              fecha: new Date().toISOString(),
            },
          },
        }
      }
      const racha = prev.racha + 1
      return {
        ...prev,
        xp: prev.xp + xpGanado,
        racha,
        mejorRacha: Math.max(prev.mejorRacha, racha),
        resueltas: {
          ...prev.resueltas,
          [mision.id]: {
            xp: xpGanado,
            intentos: 1,
            pistas,
            limpia: pistas === 0 && !solucionVista,
            fecha: new Date().toISOString(),
          },
        },
      }
    })

    setUltimo({
      ya,
      xp: xpGanado,
      mensaje: ya
        ? 'Repasar también cuenta: esta misión ya estaba resuelta, así que no suma XP nuevo.'
        : solucionVista
          ? 'Correcto, pero viste la solución: el XP se redujo al 25%.'
          : pistas > 0
            ? `Correcto con ${pistas} pista(s): cada pista restó 15 XP.`
            : '¡Impecable! Sin pistas ni solución: XP completo.',
    })
  }

  const verSolucion = () => {
    if (!mision || solucionVista) return
    setSolucionVista(true)
    setProgreso((prev) =>
      prev.solucionesVistas.includes(mision.id)
        ? prev
        : { ...prev, solucionesVistas: [...prev.solucionesVistas, mision.id] }
    )
  }

  const siguienteMision = () => {
    if (!mision) return
    const i = misiones.findIndex((m) => m.id === mision.id)
    const pendiente =
      misiones.slice(i + 1).find((m) => !progreso.resueltas[m.id]) ??
      misiones.find((m) => !progreso.resueltas[m.id])
    if (pendiente) seleccionar(pendiente.id)
    else setUltimo({ ...ultimo, fin: true })
  }

  const repetirMision = () => {
    setUltimo(null)
    setPistas(0)
    setSolucionVista(false)
    setRepetir((r) => r + 1)
  }

  const reiniciar = () => {
    setProgreso({ ...PROGRESO_INICIAL })
    setUltimo(null)
    setPistas(0)
    setSolucionVista(false)
    setMisionId(misiones[0]?.id ?? null)
  }

  const Motor = mision ? MOTORES[mision.tipo] : null

  return (
    <section className="nlab">
      <header className="nlab-top">
        <div className="nlab-brand">
          <span className="nlab-brand__mark">🧪</span>
          <div>
            <h2>
              NEGOCIOS <span>LAB</span>
            </h2>
            <p>
              {nota.titulo} · {misiones.length} misiones
            </p>
          </div>
        </div>

        <div className="nlab-account">
          <div className="nlab-account__rank" title={actual.nombre}>
            <span>{actual.icono}</span>
            <div>
              <strong>{actual.nombre}</strong>
              <small>
                {resueltas}/{TOTAL_MISIONES} misiones
              </small>
            </div>
          </div>
          <div className="nlab-account__xp">
            <span>{progreso.xp} XP</span>
            <div className="nlab-account__bar">
              <span style={{ width: `${avance}%` }} />
            </div>
            {siguiente && (
              <small className="nlab-account__next">
                {siguiente.xp - progreso.xp} XP para {siguiente.icono}{' '}
                {siguiente.nombre}
              </small>
            )}
          </div>
          <button
            type="button"
            className="nlab-btn nlab-btn--ghost"
            onClick={onCerrar}
          >
            ← Volver al apunte
          </button>
        </div>
      </header>

      <div className="nlab-body">
        <aside className="nlab-panel nlab-panel--lista">
          <p className="nlab-panel__title">🎯 Misiones de este apunte</p>
          <ul className="nlab-lista">
            {misiones.map((m) => {
              const tipo = TIPOS[m.tipo] ?? TIPOS.completar
              const hecho = Boolean(progreso.resueltas[m.id])
              return (
                <li key={m.id}>
                  <button
                    type="button"
                    className={`nlab-item ${
                      mision?.id === m.id ? 'is-active' : ''
                    } ${hecho ? 'is-done' : ''}`}
                    onClick={() => seleccionar(m.id)}
                  >
                    <span className="nlab-item__icono">{tipo.icono}</span>
                    <span className="nlab-item__texto">
                      <strong>{m.titulo}</strong>
                      <small>
                        {tipo.etiqueta} · {m.dificultad} · {m.xp} XP
                      </small>
                    </span>
                    <span className="nlab-item__estado">
                      {hecho ? '✅' : '○'}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div className="nlab-medallas">
            <p className="nlab-panel__title">🏆 Medallas</p>
            <div className="nlab-medallas__grid">
              {medallas.map((m) => (
                <span
                  key={m.id}
                  className={`nlab-medalla ${m.obtenida ? 'is-on' : ''}`}
                  title={`${m.nombre}: ${m.descripcion}`}
                >
                  {m.icono}
                </span>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="nlab-btn nlab-btn--danger"
            onClick={reiniciar}
          >
            Reiniciar todo el progreso
          </button>
        </aside>

        <div className="nlab-panel nlab-panel--mision">
          {!mision && <p className="nlab-vacio">No hay misiones aquí.</p>}

          {mision && (
            <>
              <header className="nlab-mision__head">
                <div>
                  <p className="nlab-mision__tipo">
                    {(TIPOS[mision.tipo] ?? TIPOS.completar).icono}{' '}
                    {(TIPOS[mision.tipo] ?? TIPOS.completar).etiqueta}
                  </p>
                  <h3>{mision.titulo}</h3>
                </div>
                <div className="nlab-mision__meta">
                  <Dificultad nivel={mision.dificultad} />
                  <span className="nlab-xp">{mision.xp} XP</span>
                  {progreso.resueltas[mision.id] && (
                    <span className="nlab-hecha">✅ Resuelta</span>
                  )}
                </div>
              </header>

              <div className="nlab-mision__ayudas">
                <button
                  type="button"
                  className="nlab-btn"
                  onClick={() => setPistas((p) => p + 1)}
                  disabled={Boolean(ultimo)}
                >
                  💡 Pista ({pistas})
                </button>
                <button
                  type="button"
                  className="nlab-btn"
                  onClick={verSolucion}
                  disabled={solucionVista || Boolean(ultimo)}
                >
                  👁️ Ver solución
                </button>
              </div>

              {pistas > 0 && mision.pista && (
                <p className="nlab-pista">💡 {mision.pista}</p>
              )}
              {solucionVista && mision.solucion && (
                <p className="nlab-solucion">
                  👁️ {mision.solucion}
                </p>
              )}

              <div className="nlab-mision__motor" key={`${mision.id}-${repetir}`}>
                {Motor && (
                  <Motor
                    mision={mision}
                    onResuelto={resolver}
                    onFallo={registrarFallo}
                  />
                )}
              </div>

              {ultimo && (
                <div className={`nlab-ok ${ultimo.ya ? 'is-repaso' : ''}`}>
                  <span className="nlab-ok__icono">
                    {ultimo.ya ? '♻️' : '🎉'}
                  </span>
                  <div>
                    <strong>
                      {ultimo.ya ? 'Misión repasada' : '¡Misión completada!'}
                    </strong>
                    <p>{ultimo.mensaje}</p>
                  </div>
                  <span className="nlab-ok__xp">+{ultimo.xp} XP</span>
                </div>
              )}

              {ultimo && (
                <div className="nlab-acciones">
                  <button
                    type="button"
                    className="nlab-btn nlab-btn--primary"
                    onClick={siguienteMision}
                  >
                    Siguiente misión →
                  </button>
                  <button
                    type="button"
                    className="nlab-btn"
                    onClick={repetirMision}
                  >
                    Repetir misión
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <footer className="nlab-foot">
        <span>
          🧪 Practica los {misiones.length} conceptos de «{nota.titulo}» y
          acumula XP en el laboratorio.
        </span>
        <span className="nlab-foot__mono">
          progreso guardado en este navegador
        </span>
      </footer>
    </section>
  )
}
