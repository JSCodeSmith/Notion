import { useState } from 'react'
import { METODOS_ARRAYS } from '../../data/carreras'
import { METODOS_DOCS } from '../../data/metodosDocs'
import MetodoFindDoc from './MetodoFindDoc'
import MetodoDoc from './MetodoDoc'
import './CareerDetail.css'

export default function CareerDetail({  carrera,
  onBack,
  onSelectCourse,
  metodoActivo = null,
  onMetodoChange = () => {} 
}) {
  const [hoveredRow, setHoveredRow] = useState(null)
  const [metodoSeleccionado, setMetodoSeleccionado] = useState(null)

  const isLenguajes = carrera.id === 'lenguajes'

  // Un método tiene apunte si es "find" (componente propio) o si está en METODOS_DOCS
  const tieneDoc = (id) => id === 'find' || Boolean(METODOS_DOCS[id])

 const volverALista = () => onMetodoChange(null)

  if (metodoActivo === 'find') {
    return <MetodoFindDoc onBack={volverALista} />
  }

  if (metodoActivo && METODOS_DOCS[metodoActivo]) {
    return <MetodoDoc metodo={METODOS_DOCS[metodoActivo]} onBack={volverALista} />
  }

  return (
    <article className="notion-page detail-page">
      <button type="button" className="notion-back-btn" onClick={onBack}>
        ← Volver
      </button>

      <div className="detail-header">
        <div className="detail-icon">{carrera.icon || carrera.emoji}</div>
        <h1 className="detail-title">{carrera.nombre}</h1>
      </div>

      <div className="notion-comments" style={{ marginTop: '20px', marginBottom: '40px' }}>
        <span className="notion-comments__label">Comentarios</span>
        <div className="notion-comments__input">
          <span className="notion-avatar">👤</span>
          <span className="notion-placeholder">Agregar un comentario...</span>
        </div>
      </div>

      <hr className="notion-divider" />

      {isLenguajes ? (
        <div className="notion-database">
          {METODOS_ARRAYS.map((grupo) => (
            <div key={grupo.seccion} style={{ marginBottom: '40px' }}>
              <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#fff', marginBottom: '16px', marginTop: '32px' }}>
                {grupo.seccion}
              </h1>

              <div className="notion-table-container">
                <table className="notion-table" style={{ tableLayout: 'fixed', width: '100%' }}>
                  <tbody>
                    {grupo.metodos.map((metodo) => (
                      <tr
                        key={metodo.id}
                        onMouseEnter={() => setHoveredRow(metodo.id)}
                        onMouseLeave={() => setHoveredRow(null)}
                        onClick={() => {
                           if (tieneDoc(metodo.id)) onMetodoChange(metodo.id)
                        }}
                        style={{ cursor: tieneDoc(metodo.id) ? 'pointer' : 'default' }}
                      >
                        <td className="notion-cell-title" style={{ width: '35%' }}>
                          <span className="notion-cell-icon">{metodo.icon}</span>
                          <span className="notion-cell-name">{metodo.nombre}</span>
                          {hoveredRow === metodo.id && tieneDoc(metodo.id) && (
                            <button className="notion-open-btn" style={{ marginLeft: 'auto' }}>
                              ⎘ ABRIR
                            </button>
                          )}
                        </td>
                        <td style={{ width: '65%', color: '#9b9b9b', fontSize: '12px', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                          {metodo.firma}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="detail-sub-header">
            <span>Aa Nombre</span>
            <span>+ Agregar propiedad</span>
          </div>
          <div className="notion-table-container">
            <table className="notion-table">
              <tbody>
                {carrera.cursos?.map((curso) => (
                  <tr
                    key={curso.id}
                    onMouseEnter={() => setHoveredRow(curso.id)}
                    onMouseLeave={() => setHoveredRow(null)}
                    onClick={() => onSelectCourse && onSelectCourse(curso.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    <td className="notion-cell-title">
                      <span className="notion-cell-icon">{curso.icon || '📄'}</span>
                      <span className="notion-cell-name">{curso.nombre}</span>
                      {hoveredRow === curso.id && (
                        <button className="notion-open-btn" style={{ marginLeft: 'auto' }}>
                          ⎘ ABRIR
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
                <tr className="notion-row-add">
                  <td><span className="notion-add-text">+ Nueva página</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      )}
    </article>
  )
}