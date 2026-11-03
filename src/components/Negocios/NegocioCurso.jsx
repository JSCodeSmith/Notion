import { useMemo, useState } from 'react'

const CUANTOS = (n) => `${n} apunte${n === 1 ? '' : 's'}`

export default function NegocioCurso({ curso, onAbrir }) {
  const [abiertos, setAbiertos] = useState({})

  const total = useMemo(
    () => curso.grupos.reduce((acc, g) => acc + g.metodos.length, 0),
    [curso]
  )

  const laboratorio = useMemo(
    () =>
      curso.grupos.reduce(
        (acc, g) =>
          acc + g.metodos.reduce((suma, m) => suma + (m.lab ?? 0), 0),
        0
      ),
    [curso]
  )

  const toggle = (seccion) =>
    setAbiertos((prev) => ({ ...prev, [seccion]: !prev[seccion] }))

  return (
    <div className="notion-database negocio-database">
      <div className="negocio-hero">
        <span className="negocio-hero__icon">{curso.icon}</span>
        <div className="negocio-hero__text">
          <h2 className="negocio-hero__title">{curso.titulo}</h2>
          <p className="negocio-hero__desc">{curso.descripcion}</p>
          <div className="negocio-hero__meta">
            <span className="negocio-chip">🏢 Administración y Negocios</span>
            <span className="negocio-chip negocio-chip--nivel">
              {curso.nivel}
            </span>
            <span className="negocio-chip">{CUANTOS(total)}</span>
            {laboratorio > 0 && (
              <span className="negocio-chip negocio-chip--lab">
                {`🧪 ${laboratorio} misiones`}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="negocio-viewbar">
        <span className="notion-viewtab is-active">▦ Tabla de apuntes</span>
        <span className="negocio-hint">Haz clic en un apunte para abrirlo</span>
      </div>

      {curso.grupos.map((grupo) => {
        const expandido = abiertos[grupo.seccion] !== false
        return (
          <section key={grupo.seccion} className="notion-section">
            <button
              type="button"
              className="notion-section-title negocio-seccion-btn"
              onClick={() => toggle(grupo.seccion)}
            >
              <span className={`negocio-caret ${expandido ? 'is-open' : ''}`}>
                ⌄
              </span>
              <span>{grupo.seccion}</span>
              <span className="negocio-seccion-count">
                {grupo.metodos.length}
              </span>
            </button>

            {expandido && (
              <div className="notion-table-container">
                <table className="notion-table">
                  <thead>
                    <tr>
                      <th className="notion-col-title">Aa Apunte</th>
                      <th>Resumen</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grupo.metodos.map((metodo) => (
                      <tr
                        key={metodo.id}
                        className="is-clickable"
                        style={{ cursor: 'pointer' }}
                        onClick={() => onAbrir(metodo.id)}
                      >
                        <td className="notion-cell-title">
                          <span className="notion-cell-icon">{metodo.icon}</span>
                          <span className="notion-cell-name">{metodo.nombre}</span>
                          {metodo.lab > 0 && (
                            <span
                              className="negocio-lab-chip"
                              title={`${metodo.lab} misiones de laboratorio`}
                            >
                              {`🧪 ${metodo.lab}`}
                            </span>
                          )}
                          <button
                            type="button"
                            className="notion-open-btn"
                            onClick={(e) => {
                              e.stopPropagation()
                              onAbrir(metodo.id)
                            }}
                          >
                            ABRIR
                          </button>
                        </td>
                        <td className="notion-cell-sig">{metodo.firma}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )
      })}
    </div>
  )
}
