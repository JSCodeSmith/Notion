import { useState } from 'react'
import { Lista, Quiz, Inline } from '../CareerDetail/MetodoDoc'
import CodeBlock from '../CodeBlock/CodeBlock'
import NegociosLab from './NegociosLab'
import SimuladorAritmetica from './SimuladorAritmetica'
import LaboratorioAritmetica from './LaboratorioAritmetica'
import { misionesDeNota } from './labMisiones'
import './Negocios.css'

const LARGO = 24

const esTituloNumerado = (t) => /^\**\s*\d\uFE0F?\u20E3/.test(t)
const limpiarTitulo = (t) =>
  t.replace(/^\**\s*\d\uFE0F?\u20E3\s*/, '').replace(/\*\*/g, '')

/* Renderiza una lista de textos intercalando los diagramas o bloques
   de código que las notas guardan entre ``` ```. */
function Elementos({ items }) {
  const trozos = []
  let pendientes = []

  const cerrar = () => {
    if (pendientes.length) trozos.push({ tipo: 'texto', items: pendientes })
    pendientes = []
  }

  for (const item of items ?? []) {
    if (typeof item === 'string' && item.startsWith('```')) {
      cerrar()
      const code = item
        .replace(/^```[a-zA-Z]*\n?/, '')
        .replace(/\n?```$/, '')
        .replace(/\n+$/, '')
      trozos.push({ tipo: 'codigo', code })
    } else {
      pendientes.push(item)
    }
  }
  cerrar()

  return trozos.map((trozo, i) =>
    trozo.tipo === 'codigo' ? (
      <div key={i} className="negocio-codigo">
        <CodeBlock code={trozo.code} />
      </div>
    ) : (
      <Lista key={i} items={trozo.items} />
    )
  )
}

/* Lista que agrupa los puntos numerados (1️⃣, 2️⃣…) en sub-bloques con
   título, tal y como los organiza Notion dentro de los apuntes. */
export function ListaAgrupada({ items }) {
  if (!items?.length) return null

  const bloques = []
  for (const item of items) {
    if (esTituloNumerado(item)) {
      bloques.push({ titulo: limpiarTitulo(item), items: [] })
    } else if (bloques.length) {
      bloques[bloques.length - 1].items.push(item)
    } else {
      bloques.push({ titulo: '', items: [item] })
    }
  }

  if (bloques.length === 1 && !bloques[0].titulo) {
    return <Elementos items={bloques[0].items} />
  }

  return (
    <div className="negocio-como">
      {bloques.map((bloque, i) =>
        bloque.titulo ? (
          <div key={i} className="negocio-bloque">
            <h4>{bloque.titulo}</h4>
            <Elementos items={bloque.items} />
          </div>
        ) : (
          <Elementos key={i} items={bloque.items} />
        )
      )}
    </div>
  )
}

/* Sección plegable: las listas muy largas no aplastan la página. */
function Seccion({ titulo, items, full = false, ordenada = false }) {
  const [abierto, setAbierto] = useState(true)
  if (!items?.length) return null
  const largo = items.length > LARGO

  return (
    <div className={`doc-card ${full ? 'doc-card--full' : ''}`}>
      <h3>{titulo}</h3>
      {largo && (
        <button
          type="button"
          className="negocio-toggle"
          onClick={() => setAbierto((v) => !v)}
        >
          {abierto ? '▾' : '▸'} {items.length} puntos
        </button>
      )}
      {abierto &&
        (ordenada ? (
          <Lista items={items} ordenada />
        ) : (
          <ListaAgrupada items={items} />
        ))}
    </div>
  )
}

export default function NegocioDoc({ nota, onBack }) {
  const [labAbierto, setLabAbierto] = useState(false)
  const partes = nota.partes ?? []
  const extras = nota.extras ?? []
  /* El paso a paso se muestra dentro del laboratorio guiado; así no se
     repite dos veces en la misma página. */
  const extrasVisibles = nota.lab?.pasoAPaso?.length
    ? extras.filter((extra) => !/paso a paso/i.test(extra.seccion))
    : extras
  const misiones =
    misionesDeNota(nota.id).length + (nota.lab?.misiones.length ?? 0)

  if (labAbierto) {
    return <NegociosLab nota={nota} onCerrar={() => setLabAbierto(false)} />
  }

  return (
    <article className="notion-page detail-page negocio-doc">
      <button type="button" className="notion-back-btn" onClick={onBack}>
        ← Volver al curso
      </button>

      <header className="negocio-doc__header">
        <span className="negocio-doc__icon">{nota.icon}</span>
        <div>
          <p className="negocio-doc__eyebrow">
            📚 Administración y Negocios · {nota.cursoLabel}
          </p>
          <h1 className="doc-title negocio-doc__title">{nota.titulo}</h1>
        </div>
      </header>

      <p className="negocio-doc__lead">
        <Inline text={nota.resumen} />
      </p>

      {misiones > 0 && (
        <div className="negocio-lab">
          <div className="negocio-lab__text">
            <span className="negocio-lab__icono">🧪</span>
            <div>
              <strong>Laboratorio de este apunte</strong>
              <p>
                {misiones} misiones interactivas: emparejar conceptos,
                completar definiciones, clasificar y ordenar. Gana XP, sube de
                rango y guarda tu progreso.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="negocio-lab__btn"
            onClick={() => setLabAbierto(true)}
          >
            🧪 Abrir laboratorio
          </button>
        </div>
      )}

      {nota.simulador === 'aritmetica' && (
        <SimuladorAritmetica key={nota.id} tipo={nota.simuladorTipo} />
      )}

      {nota.simulador === 'aritmetica' && (
        <LaboratorioAritmetica key={`lab-${nota.id}`} nota={nota} />
      )}

      <div className="doc-grid">
        <Seccion titulo="📝 Definición" items={nota.definicion} full />
        <Seccion titulo="🧠 ¿Qué es?" items={nota.queEs} />
        <Seccion titulo="🎯 ¿Para qué sirve?" items={nota.paraQueSirve} />
        <Seccion titulo="⚙️ ¿Cómo funciona?" items={nota.comoFunciona} full />

        {partes.map((parte, i) => (
          <div key={i} className="doc-card doc-card--full negocio-parte">
            <h3>🧩 {parte.titulo.replace(/^\**\s*\d\uFE0F?\u20E3\s*/, '').replace(/\*\*/g, '')}</h3>
            <span className="negocio-parte__numero">
              {parte.titulo.match(/^\**\s*(\d\uFE0F?\u20E3)/)?.[1] ?? ''}
            </span>
            <div className="negocio-parte__bloques">
              {parte.bloques.map((bloque, j) => (
                <div key={j} className="negocio-subseccion">
                  <h4>{bloque.seccion.replace(/\*\*/g, '')}</h4>
                  <ListaAgrupada items={bloque.textos} />
                </div>
              ))}
            </div>
          </div>
        ))}

        <Seccion titulo="⚠️ Errores comunes" items={nota.errores} />
        <Seccion titulo="💼 Casos de uso" items={nota.casos} />
        <Seccion
          titulo="🧩 Relación con otros conceptos"
          items={nota.relacion}
        />

        {nota.analogia && (
          <div className="doc-card">
            <h3>🧠 Analogía</h3>
            <p>
              <Inline text={nota.analogia} />
            </p>
          </div>
        )}

        {extrasVisibles.map((extra, i) => (
          <Seccion
            key={i}
            titulo={extra.seccion.replace(/\*\*/g, '')}
            items={extra.textos}
            full
          />
        ))}

        <Seccion
          titulo="📝 Notas personales"
          items={nota.notasPersonales}
          full
        />

        {nota.quiz?.length > 0 && <Quiz preguntas={nota.quiz} />}

        <div className="doc-card doc-card--full negocio-fuente">
          <h3>📚 Fuente:</h3>
          <span>{nota.fuente}</span>
        </div>
      </div>
    </article>
  )
}
