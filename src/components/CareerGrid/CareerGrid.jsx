import { useMemo, useState } from 'react'
import '../../styles/table.css'
import './CareerGrid.css'

export default function CareerGrid({ carreras, onSelectCareer }) {
  const [categoria, setCategoria] = useState('Todas')
  const [hoveredRow, setHoveredRow] = useState(null)

  const categorias = useMemo(
    () => ['Todas', ...new Set(carreras.map((c) => c.categoria))],
    [carreras]
  )

  const filtradas = useMemo(
    () => categoria === 'Todas' ? carreras : carreras.filter((c) => c.categoria === categoria),
    [carreras, categoria]
  )

  return (
    <section className="notion-page">
      <div className="notion-page__header">
        <div className="notion-page__icon">📚</div>
        <h1 className="notion-page__title">Biblioteca del Conocimiento ⭐</h1>
        
        <div className="notion-page__sub-header">
          <span className="notion-btn-text">+ Add a property</span>
        </div>
        
        <div className="notion-comments">
          <span className="notion-comments__label">Comentarios</span>
          <div className="notion-comments__input">
            <span className="notion-avatar">👤</span>
            <span className="notion-placeholder">Agregar un comentario...</span>
          </div>
        </div>
      </div>

      <hr className="notion-divider" />

      <div className="notion-database">
        <div className="notion-database__topbar">
          <h2 className="notion-database__title">Disciplinas</h2>
          
          <div className="notion-database__filters">
            {categorias.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`notion-chip ${categoria === cat ? 'is-active' : ''}`}
                onClick={() => setCategoria(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="notion-database__actions">
            <span className="notion-icon-btn" title="Filtro">≡</span>
            <span className="notion-icon-btn" title="Ordenar">⇅</span>
            <span className="notion-icon-btn" title="Buscar">🔍</span>
            <button className="notion-btn-new">Nuevo <span>⌄</span></button>
          </div>
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
              {filtradas.map((carrera) => (
                <tr 
                  key={carrera.id}
                  onMouseEnter={() => setHoveredRow(carrera.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                  onClick={() => onSelectCareer(carrera.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <td className="notion-cell-title">
                    <span className="notion-cell-icon">{carrera.emoji}</span>
                    <span className="notion-cell-name">{carrera.nombre}</span>
                    {hoveredRow === carrera.id && (
                       <button 
                         className="notion-open-btn" 
                         onClick={(e) => { e.stopPropagation(); onSelectCareer(carrera.id) }}
                       >
                         <span className="notion-open-icon">⎘</span> ABRIR
                       </button>
                    )}
                  </td>
                  <td className="notion-cell-empty"></td>
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
    </section>
  )
}