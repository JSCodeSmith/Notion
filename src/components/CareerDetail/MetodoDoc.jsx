import { useState } from 'react'
import CodeBlock from '../CodeBlock/CodeBlock'
import SimuladorBusqueda from '../SimuladorBusqueda/SimuladorBusqueda'
import './MetodoFindDoc.css' // reutiliza los mismos estilos (.doc-card, .quiz-btn, etc.)

import SimuladorMutador from '../SimuladorMutador/SimuladorMutador'
import SimuladorUtilidad from '../SimuladorUtilidad/SimuladorUtilidad'
import SimuladorString from '../SimuladorString/SimuladorString'
import SimuladorNumero from '../SimuladorNumero/SimuladorNumero'
import SimuladorFecha from '../SimuladorFecha/SimuladorFecha'
import SimuladorJSON from '../SimuladoresJS/SimuladorJSON'
import SimuladorTemporizador from '../SimuladoresJS/SimuladorTemporizador'
import SimuladorPromesa from '../SimuladoresJS/SimuladorPromesa'
import SimuladorWebAPI from '../SimuladoresJS/SimuladorWebAPI'
import SimuladorHistorial from '../SimuladoresJS/SimuladorHistorial'
import SimuladorPerformance from '../SimuladoresJS/SimuladorPerformance'
import SimuladorNotificaciones from '../SimuladoresJS/SimuladorNotificaciones'
import SimuladorFileReader from '../SimuladoresJS/SimuladorFileReader'
import SimuladorFullscreen from '../SimuladoresJS/SimuladorFullscreen'
import SimuladorNavegador from '../SimuladoresJS/SimuladorNavegador'
import SimuladorDOM from '../SimuladoresDOM/SimuladorDOM'
import SimuladorEventos from '../SimuladoresDOM/SimuladorEventos'
import SimuladorDialogos from '../SimuladoresDOM/SimuladorDialogos'
import SimuladorMedia from '../SimuladoresDOM/SimuladorMedia'
import SimuladorGeo from '../SimuladoresDOM/SimuladorGeo'
import SimuladorMath from '../SimuladoresJS/SimuladorMath'
import SimuladorStorage from '../SimuladoresJS/SimuladorStorage'
import SimuladorEstilos from '../SimuladoresJS/SimuladorEstilos'
import SimuladorIntl from '../SimuladoresJS/SimuladorIntl'
import SimuladorVoz from '../SimuladoresJS/SimuladorVoz'
import SimuladorMedios from '../SimuladoresJS/SimuladorMedios'
import SimuladorRed from '../SimuladoresJS/SimuladorRed'
import ReduceLab from '../ReduceLab/ReduceLab'
import ReduceExtras from '../ReduceExtras/ReduceExtras'
import AdvancedGame from '../AdvancedGame/AdvancedGame'
import LiveExamples from '../AdvancedGame/LiveExamples'
import { ADVANCED_GAME_IDS } from '../AdvancedGame/gameConfigs'

import SimuladorFindDiagrama from '../SimuladorFind/SimuladorFindDiagrama' // <-- NUEVA IMPORTACIÓN

import DiagramaMetodo from '../SimuladorMetodos/DiagramaMetodo'
import EntornoPruebaMetodo from '../SimuladorMetodos/EntornoPruebaMetodo'
import MisionMetodo from '../SimuladorMetodos/MisionMetodo'
import DiagramaComparativo from '../SimuladorMetodos/DiagramaComparativo'
import QuizMetodo from '../SimuladorMetodos/QuizMetodo'
import { ARRAY_METHOD_IDS } from '../SimuladorMetodos/metodosMeta'
import '../SimuladorMetodos/SimuladorMetodos.css'



import { METODOS_ARRAYS } from '../../data/carreras'


/* Elige el simulador según el campo `simulador` del método.
   `simuladores` permite inyectar simuladores propios desde otras secciones. */
function Simulador({ metodo, simuladores = {} }) {
  
  const IDS_BUSQUEDA = new Set(
    METODOS_ARRAYS.flatMap((g) => g.metodos.map((m) => m.id))
  )
  const Propio = simuladores[metodo.simulador]

  if (Propio) return <Propio key={metodo.id} metodoId={metodo.id} />

  switch (metodo.simulador) {
    case 'mutador':
      return <SimuladorMutador key={metodo.id} metodoId={metodo.id} />
    case 'utilidad':
      return <SimuladorUtilidad key={metodo.id} metodoId={metodo.id} />
    case 'string':
      return <SimuladorString key={metodo.id} metodoId={metodo.id} />
    case 'numero':
      return <SimuladorNumero key={metodo.id} metodoId={metodo.id} />
    case 'fecha':
      return <SimuladorFecha key={metodo.id} metodoId={metodo.id} />
    case 'json':
      return <SimuladorJSON key={metodo.id} metodoId={metodo.id} />
    case 'temporizador':
      return <SimuladorTemporizador key={metodo.id} metodoId={metodo.id} />
    case 'promesa':
      return <SimuladorPromesa key={metodo.id} metodoId={metodo.id} />
    case 'webapi':
      return <SimuladorWebAPI key={metodo.id} metodoId={metodo.id} />
    case 'history':
      return <SimuladorHistorial key={metodo.id} metodoId={metodo.id} />
    case 'performance':
      return <SimuladorPerformance key={metodo.id} metodoId={metodo.id} />
    case 'notification':
    case 'push':
      return <SimuladorNotificaciones key={metodo.id} metodoId={metodo.id} />
    case 'filereader':
      return <SimuladorFileReader key={metodo.id} metodoId={metodo.id} />
    case 'fullscreen':
      return <SimuladorFullscreen key={metodo.id} metodoId={metodo.id} />
    case 'share':
    case 'clipboard':
    case 'cookie':
      return <SimuladorNavegador key={metodo.id} metodoId={metodo.id} />
    case 'dom':
      return <SimuladorDOM key={metodo.id} metodoId={metodo.id} />
    case 'eventos':
      return <SimuladorEventos key={metodo.id} metodoId={metodo.id} />
    case 'dialogos':
      return <SimuladorDialogos key={metodo.id} metodoId={metodo.id} />
    case 'media':
      return <SimuladorMedia key={metodo.id} metodoId={metodo.id} />
    case 'geo':
      return <SimuladorGeo key={metodo.id} metodoId={metodo.id} />
    case 'math':
      return <SimuladorMath key={metodo.id} metodoId={metodo.id} />
    case 'intl':
      return <SimuladorIntl key={metodo.id} metodoId={metodo.id} />
    case 'storage':
      return <SimuladorStorage key={metodo.id} metodoId={metodo.id} />
    case 'estilos':
      return <SimuladorEstilos key={metodo.id} metodoId={metodo.id} />
    case 'voz':
      return <SimuladorVoz key={metodo.id} metodoId={metodo.id} />
    case 'medios':
      return <SimuladorMedios key={metodo.id} metodoId={metodo.id} />
    case 'red':
      return <SimuladorRed key={metodo.id} metodoId={metodo.id} />
   case 'reduce-lab':
      return <ReduceLab key={metodo.id} />
    default:
      return IDS_BUSQUEDA.has(metodo.id)
        ? <SimuladorBusqueda key={metodo.id} metodoId={metodo.id} />
        : null
  }
}

/* ---------- Texto con **negrita**, *cursiva* y `código` ---------- */
export function Inline({ text }) {
  const partes = text.split(/(\*\*.+?\*\*|`[^`]+`|\*[^*]+\*)/g)
  return partes.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**')) return <strong key={i}><Inline text={p.slice(2, -2)} /></strong>
    if (p.startsWith('`') && p.endsWith('`')) return <code key={i}>{p.slice(1, -1)}</code>
    if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <em key={i}>{p.slice(1, -1)}</em>
    return p
  })
}

/* ---------- Lista (items: string o { texto, code, nota }) ---------- */
export function Lista({ items, ordenada = false }) {
  const Tag = ordenada ? 'ol' : 'ul'
  return (
    <Tag>
      {items.map((it, i) => {
        const o = typeof it === 'string' ? { texto: it } : it
        return (
          <li key={i}>
            <Inline text={o.texto} />
            {o.code && <div style={{ margin: '8px 0' }}><CodeBlock code={o.code} /></div>}
            {o.nota && <p className="code-caption"><Inline text={o.nota} /></p>}
          </li>
        )
      })}
    </Tag>
  )
}

export function Contenido({ data }) {
  return Array.isArray(data) ? <Lista items={data} /> : <p><Inline text={data} /></p>
}

export function Quiz({ preguntas }) {
  const [actual, setActual] = useState(0)
  const [respuestas, setRespuestas] = useState([])
  const [terminado, setTerminado] = useState(false)

  const responder = (idx) => {
    setRespuestas([...respuestas, idx])
    if (actual < preguntas.length - 1) setActual(actual + 1)
    else setTerminado(true)
  }
  const reiniciar = () => {
    setActual(0)
    setRespuestas([])
    setTerminado(false)
  }
  const puntos = respuestas.reduce((acc, r, i) => (r === preguntas[i].correcta ? acc + 1 : acc), 0)

  return (
    <div className="doc-card doc-card--full doc-card--quiz" style={{ marginTop: '24px' }}>
      <h3>🧪 Quiz ({preguntas.length} preguntas)</h3>
      {!terminado ? (
        <>
          <div className="quiz-progress">Pregunta {actual + 1} de {preguntas.length}</div>
          <p className="quiz-question">{preguntas[actual].pregunta}</p>
          <div className="quiz-options">
            {preguntas[actual].opciones.map((op, idx) => (
              <button key={idx} className="quiz-btn" onClick={() => responder(idx)}>{op}</button>
            ))}
          </div>
        </>
      ) : (
        <div className="quiz-result">
          <h2>Completado</h2>
          <p className="score-text">Aciertos: <strong>{puntos}</strong> / {preguntas.length}</p>
          <div className="quiz-review">
            {preguntas.map((q, i) => {
              const ok = respuestas[i] === q.correcta
              return (
                <div key={q.id} className={`review-item ${ok ? 'correct' : 'wrong'}`}>
                  <span>{ok ? '✅' : '❌'} Pregunta {i + 1}</span>
                </div>
              )
            })}
          </div>
          <button className="sim-btn primary" onClick={reiniciar} style={{ marginTop: '16px' }}>
            🔄 Reintentar
          </button>
        </div>
      )}
    </div>
  )
}

export default function MetodoDoc({ metodo, onBack, simuladores }) {
  const esMetodoArray = ARRAY_METHOD_IDS.has(metodo.id) && metodo.id !== 'find'

  return (
    <article className="notion-page detail-page">
      <button type="button" className="notion-back-btn" onClick={onBack}>
        ← Volver a los Métodos
      </button>

      {metodo.obsoleto && (
        <div className="doc-warning">
          ⚠️ Este método está <strong>obsoleto (deprecated)</strong> y no forma parte del estándar ECMAScript actual. Evita usarlo en código nuevo: usa <code>slice()</code> o <code>substring()</code> en su lugar.
        </div>
      )}

      <div className="doc-header">
        <h1 className="doc-title" style={{ color: '#ff5a5f' }}>{metodo.titulo}</h1>
      </div>

      <div className="doc-grid">
        <div className="doc-card"><h3>📝 Definición</h3><Contenido data={metodo.definicion} /></div>
        <div className="doc-card"><h3>🧠 ¿Qué es?</h3><Contenido data={metodo.queEs} /></div>
        <div className="doc-card"><h3>🎯 ¿Para qué sirve?</h3><Contenido data={metodo.paraQueSirve} /></div>

       
       {esMetodoArray ? (
         <div
           className="doc-card doc-card--full"
           style={{ padding: 0, background: 'transparent', border: 'none' }}
         >
           <DiagramaMetodo key={`diagrama-${metodo.id}`} metodo={metodo} />
         </div>
       ) : metodo.id === 'find' ? (
          <div
             className="doc-card doc-card--full" 
            style={{ padding: 0, background: 'transparent', border: 'none', gridColumn: '1 / -1', width: '100%' }}
          
          >
            <SimuladorFindDiagrama />
          </div>
        ) : (
          <div className="doc-card">
            <h3>⚙️ ¿Cómo funciona?</h3>
            <Lista items={metodo.comoFunciona} ordenada={!metodo.comoFuncionaSinNumerar} />
          </div>
        )}

        <div className="doc-card doc-card--full">
          <h3>📝 Sintaxis / Estructura</h3>
          {metodo.sintaxis.map((s, i) => (
            <div key={i}>
              {s.caption && <p className="code-caption">{s.caption}</p>}
              <CodeBlock code={s.code} />
            </div>
          ))}
          {metodo.nota && (
            <div style={{ marginTop: '12px', padding: '10px 14px', background: '#202020', borderLeft: '3px solid #eab308', borderRadius: '4px' }}>
              <p style={{ margin: 0 }}>💡 <Inline text={metodo.nota} /></p>
            </div>
          )}
        </div>

        {metodo.simulador && (
          <div className="doc-card doc-card--full" style={{ padding: 0, background: 'transparent', border: 'none' }}>
            {esMetodoArray && (
              <div style={{ padding: '0 4px' }}>
                <h3>🎮 Simulador Interactivo</h3>
                <p style={{ margin: '0 0 12px', color: '#9b9b9b' }}>
                  Mueve el array y los parámetros para ver el comportamiento real
                  de <code>{metodo.titulo}</code>.
                </p>
              </div>
            )}
            <Simulador metodo={metodo} simuladores={simuladores} />
          </div>
        )}

        {esMetodoArray && (
          <>
            <div className="doc-card doc-card--full" style={{ padding: 0, background: 'transparent', border: 'none' }}>
              <EntornoPruebaMetodo key={`entorno-${metodo.id}`} metodo={metodo} />
            </div>
            <div className="doc-card doc-card--full" style={{ padding: 0, background: 'transparent', border: 'none' }}>
              <MisionMetodo key={`mision-${metodo.id}`} metodo={metodo} />
            </div>
          </>
        )}

        {!esMetodoArray && ADVANCED_GAME_IDS.has(metodo.id) && (
          <div className="doc-card doc-card--full" style={{ padding: 0, background: 'transparent', border: 'none' }}>
            <AdvancedGame key={`game-${metodo.id}`} metodoId={metodo.id} />
          </div>
        )}

        <div className="doc-card doc-card--full" style={{ padding: 0, background: 'transparent', border: 'none' }}>
          {esMetodoArray && (
            <div style={{ padding: '0 4px' }}>
              <h3>🧪 Sandbox interactivo con depuración avanzada</h3>
              <p style={{ margin: '0 0 12px', color: '#9b9b9b' }}>
                Cambia datos, rompe el código a propósito y observa la traza real
                de <code>{metodo.titulo}</code>.
              </p>
            </div>
          )}
          <LiveExamples key={`live-${metodo.id}`} metodo={metodo} />
        </div>

        <div className="doc-card doc-card--full">
          <h3>💡 Ejemplos</h3>
          {metodo.ejemplos.map((ej, i) => (
            <div key={i}>
              <p className="example-title" style={{ marginTop: i > 0 ? '16px' : 0 }}>
                <strong>{ej.titulo}</strong>
              </p>
              {ej.descripcion && <p style={{ margin: '0 0 8px 0' }}><Inline text={ej.descripcion} /></p>}
              <CodeBlock code={ej.code} />
            </div>
          ))}
        </div>

        {metodo.id === 'reduce' && <ReduceExtras />}

        <div className="doc-card"><h3>⚠️ Errores comunes</h3><Lista items={metodo.errores} /></div>
        <div className="doc-card"><h3>💼 Casos de uso</h3><Lista items={metodo.casos} /></div>

        {esMetodoArray ? (
          <div className="doc-card doc-card--full" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h3>🧩 Relación con otros conceptos</h3>
              <Lista items={metodo.relacion} />
            </div>
            <DiagramaComparativo
              key={`comparativo-${metodo.id}`}
              metodoId={metodo.id}
            />
          </div>
        ) : (
          <div className="doc-card"><h3>🧩 Relación con otros conceptos</h3><Lista items={metodo.relacion} /></div>
        )}

        {esMetodoArray && ADVANCED_GAME_IDS.has(metodo.id) && (
          <div className="doc-card doc-card--full" style={{ padding: 0, background: 'transparent', border: 'none' }}>
            <AdvancedGame key={`game-${metodo.id}`} metodoId={metodo.id} />
          </div>
        )}

        <div className="doc-card"><h3>🧠 Analogía</h3><p><Inline text={metodo.analogia} /></p></div>

        {esMetodoArray ? (
          <div className="doc-card doc-card--full" style={{ padding: 0, background: 'transparent', border: 'none' }}>
            <QuizMetodo key={`quiz-${metodo.id}`} metodo={metodo} />
          </div>
        ) : (
          <Quiz key={metodo.id} preguntas={metodo.quiz} />
        )}

        <div className="doc-card doc-card--full" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>📚 Fuente:</h3>
          <span style={{ color: 'var(--text-faint)' }}>{metodo.fuente}</span>
        </div>

        {metodo.notasPersonales && (
          <div className="doc-card doc-card--full" style={{ borderLeft: '3px solid #eab308' }}>
            <h3>📝 Notas personales</h3>
            <Contenido data={metodo.notasPersonales} />
          </div>
        )}
      </div>
    </article>
  )
}
