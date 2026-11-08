import { useEffect, useState } from 'react'
import {
  HTML_CATEGORIAS,
  HTML_APUNTES,
  HTML_APUNTE_CATEGORIA,
} from '../../data/htmlApuntes'

const S = {
  tabs: { display: 'flex', flexWrap: 'wrap', gap: 8, margin: '16px 0' },
  tab: (on) => ({
    padding: '8px 14px', borderRadius: 999, cursor: 'pointer', fontWeight: 600,
    border: '1px solid ' + (on ? '#7c6cff' : '#2a2a2a'),
    background: on ? '#241f45' : '#161616', color: on ? '#cfc8ff' : '#bbb',
  }),
  box: { background: '#141414', border: '1px solid #2a2a2a', borderRadius: 12, padding: 20, marginBottom: 16 },
  chip: (on) => ({
    padding: '6px 12px', borderRadius: 8, cursor: 'pointer', fontFamily: 'monospace',
    border: '1px solid ' + (on ? '#3ddcc0' : '#2a2a2a'),
    background: on ? '#10302b' : '#1a1a1a', color: on ? '#3ddcc0' : '#ccc',
  }),
  h3: { margin: '18px 0 8px', color: '#9ad7ff' },
  code: { background: '#0b0b0b', border: '1px solid #2a2a2a', borderRadius: 8, padding: 12, overflowX: 'auto', color: '#e6e6e6', fontSize: 14 },
  p: { color: '#c9c9c9', lineHeight: 1.6, margin: '4px 0' },
}

const Lista = ({ titulo, items }) =>
  items && items.length ? (
    <>
      <h3 style={S.h3}>{titulo}</h3>
      <ul style={{ margin: 0, paddingLeft: 20 }}>
        {items.map((t, i) => <li key={i} style={S.p}>{t}</li>)}
      </ul>
    </>
  ) : null

function Doc({ doc }) {
  return (
    <div style={S.box}>
      <h2 style={{ marginTop: 0 }}>{doc.icon} {doc.titulo}</h2>
      <Lista titulo="Definición" items={doc.definicion} />
      <Lista titulo="¿Qué es?" items={doc.queEs} />
      <Lista titulo="¿Para qué sirve?" items={doc.paraQueSirve} />
      <Lista titulo="¿Cómo funciona?" items={doc.comoFunciona} />
      {doc.sintaxis?.length > 0 && (
        <>
          <h3 style={S.h3}>Sintaxis</h3>
          {doc.sintaxis.map((s, i) => <pre key={i} style={S.code}><code>{s.code}</code></pre>)}
        </>
      )}
      {doc.ejemplos?.length > 0 && (
        <>
          <h3 style={S.h3}>Ejemplos</h3>
          {doc.ejemplos.map((e, i) => (
            <div key={i} style={{ marginBottom: 12 }}>
              <strong>{e.titulo}</strong>
              {e.descripcion && <p style={S.p}>{e.descripcion}</p>}
              <pre style={S.code}><code>{e.code}</code></pre>
            </div>
          ))}
        </>
      )}
      <Lista titulo="Errores comunes" items={doc.errores} />
      <Lista titulo="Casos de uso" items={doc.casos} />
      <Lista titulo="Relación con otros conceptos" items={doc.relacion} />
      {doc.analogia && (<><h3 style={S.h3}>Analogía</h3><p style={S.p}>{doc.analogia}</p></>)}
      <Lista titulo="Notas personales" items={doc.notasPersonales} />
      {doc.fuente && <p style={{ ...S.p, opacity: 0.6, marginTop: 16 }}>Fuente: {doc.fuente}</p>}
    </div>
  )
}

export default function HtmlCurso({ metodoActivo, onMetodoChange }) {
  const [catId, setCatId] = useState(HTML_CATEGORIAS[0]?.id)

  useEffect(() => {
    const c = metodoActivo && HTML_APUNTE_CATEGORIA[metodoActivo]
    if (c) setCatId(c)
  }, [metodoActivo])

  const cat = HTML_CATEGORIAS.find((c) => c.id === catId) || HTML_CATEGORIAS[0]
  const doc = metodoActivo ? HTML_APUNTES[metodoActivo] : null

  return (
    <div>
      <div style={S.box}>
        <h2 style={{ marginTop: 0 }}>🌐 HTML: elementos</h2>
        <p style={S.p}>
          {Object.keys(HTML_APUNTES).length} apuntes · {HTML_CATEGORIAS.length} categorías
        </p>
      </div>

      <div style={S.tabs}>
        {HTML_CATEGORIAS.map((c) => (
          <button key={c.id} style={S.tab(c.id === cat.id)}
            onClick={() => { setCatId(c.id); onMetodoChange(null) }}>
            {c.icon} {c.label}
          </button>
        ))}
      </div>

      <div style={S.box}>
        <h3 style={{ marginTop: 0 }}>{cat.titulo}</h3>
        <p style={S.p}>{cat.descripcion}</p>
        {cat.grupos.map((g) => (
          <div key={g.seccion}>
            <h3 style={S.h3}>{g.seccion}</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {g.metodos.map((m) => (
                <button key={m.id} style={S.chip(m.id === metodoActivo)}
                  onClick={() => onMetodoChange(m.id)}>
                  {m.icon} {m.firma}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {doc && <Doc doc={doc} />}
    </div>
  )
}