import { Fragment, useEffect, useState } from 'react'
import { METODOS_ARRAYS } from '../../data/carreras'
import { METODOS_DOCS } from '../../data/metodosDocs'
import { METODOS_STRINGS } from '../../data/metodosStrings'
import MetodoFindDoc from './MetodoFindDoc'
import MetodoDoc from './MetodoDoc'
import './CareerDetail.css'
import './LenguajeTabs.css'

const STRING_IDS = new Set(METODOS_STRINGS.flatMap((g) => g.metodos.map((m) => m.id)))

const SUBTABS = [
  { id: 'arrays', label: 'Arrays', icon: '📚', grupos: METODOS_ARRAYS },
  { id: 'strings', label: 'Strings', icon: '🔤', grupos: METODOS_STRINGS },
]

function Breadcrumb({ items }) {
  return (
    <nav className="notion-breadcrumb" aria-label="Ruta">
      {items.map((c, i) => (
        <Fragment key={i}>
          {i > 0 && <span className="notion-breadcrumb__sep">/</span>}
          <button
            type="button"
            className="notion-breadcrumb__item"
            onClick={c.onClick}
            disabled={!c.onClick}
          >
            {c.icon && <span className="notion-breadcrumb__icon">{c.icon}</span>}
            <span>{c.label}</span>
          </button>
        </Fragment>
      ))}
    </nav>
  )
}

export default function CareerDetail({
  carrera,
  onBack,
  onSelectCourse,
  metodoActivo = null,
  onMetodoChange = () => {},
  breadcrumb,
}) {
  const isLenguajes = carrera.id === 'lenguajes'
  const [subtab, setSubtab] = useState('arrays')

  useEffect(() => {
    if (!metodoActivo) return
    setSubtab(STRING_IDS.has(metodoActivo) ? 'strings' : 'arrays')
  }, [metodoActivo])

  const tieneDoc = (id) => id === 'find' || Boolean(METODOS_DOCS[id])

  const volverALista = () => onMetodoChange(null)

  if (metodoActivo === 'find') {
    return <MetodoFindDoc onBack={volverALista} />
  }

  if (metodoActivo && METODOS_DOCS[metodoActivo]) {
    return <MetodoDoc metodo={METODOS_DOCS[metodoActivo]} onBack={volverALista} />
  }

  const crumbs = breadcrumb ?? [{ label: '← Volver', onClick: onBack }]
  const subActual = SUBTABS.find((t) => t.id === subtab) ?? SUBTABS[0]

  return (
    <article className="notion-page detail-page">
      <Breadcrumb items={crumbs} />

      <div className="detail-header">
        <div className="detail-icon">{carrera.icon || carrera.emoji}</div>
        <h1 className="detail-title">{carrera.nombre}</h1>
      </div>

      <div className="detail-sub-header">
        <span>+ Agregar propiedad</span>
      </div>

      <div className="notion-comments">
        <span className="notion-comments__label">Comentarios</span>
        <div className="notion-comments__input">
          <span className="notion-avatar">👤</span>
          <span className="notion-placeholder">Agregar un comentario...</span>
        </div>
      </div>

      <hr className="notion-divider" />

      {isLenguajes ? (
        <div className="notion-database">
          <div className="notion-viewbar">
            <span className="notion-viewtab is-active">🟨 JavaScript</span>
          </div>

          <div className="lang-subtabs" role="tablist" aria-label="Temas de JavaScript">
            {SUBTABS.map((t) => (
              <button
                key={t.id}
                type="button"
                role="tab"
                aria-selected={subActual.id === t.id}
                className={`lang-subtab ${subActual.id === t.id ? 'is-active' : ''}`}
                onClick={() => setSubtab(t.id)}
              >
                <span className="lang-subtab__icon">{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {subActual.grupos.map((grupo) => (
            <section key={grupo.seccion} className="notion-section">
              <h2 className="notion-section-title">{grupo.seccion}</h2>

              <div className="notion-table-container">
                <table className="notion-table">
                  <thead>
                    <tr>
                      <th className="notion-col-title">Aa Nombre</th>
                      <th>Firma</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grupo.metodos.map((metodo) => {
                      const abre = tieneDoc(metodo.id)
                      return (
                        <tr
                          key={metodo.id}
                          className={abre ? 'is-clickable' : 'no-doc'}
                          onClick={() => {
                            if (abre) onMetodoChange(metodo.id)
                          }}
                          style={{ cursor: abre ? 'pointer' : 'default' }}
                        >
                          <td className="notion-cell-title">
                            <span className="notion-cell-icon">{metodo.icon}</span>
                            <span className="notion-cell-name">
                              {metodo.nombre}
                              {metodo.badge && (
                                <span className={`notion-badge notion-badge--${metodo.badge.tipo}`}>
                                  {metodo.badge.texto}
                                </span>
                              )}
                            </span>
                            {abre && (
                              <button type="button" className="notion-open-btn">
                                ABRIR
                              </button>
                            )}
                          </td>
                          <td className="notion-cell-sig">{metodo.firma}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="notion-database">
          <div className="notion-viewbar">
            <span className="notion-viewtab">▦ Tabla</span>
          </div>

          <div className="notion-table-container">
            <table className="notion-table">
              <thead>
                <tr>
                  <th className="notion-col-title">Aa Nombre</th>
                  <th className="notion-col-add">+ Agregar propiedad</th>
                </tr>
              </thead>
              <tbody>
                {carrera.cursos?.map((curso) => (
                  <tr
                    key={curso.id}
                    className="is-clickable"
                    onClick={() => onSelectCourse && onSelectCourse(curso.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="notion-cell-title">
                      <span className="notion-cell-icon">{curso.icon || '📄'}</span>
                      <span className="notion-cell-name">{curso.nombre}</span>
                      <button type="button" className="notion-open-btn">ABRIR</button>
                    </td>
                    <td className="notion-cell-empty" />
                  </tr>
                ))}
                <tr className="notion-row-add">
                  <td colSpan={2}>
                    <span className="notion-add-text">+ Nueva página</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </article>
  )
}