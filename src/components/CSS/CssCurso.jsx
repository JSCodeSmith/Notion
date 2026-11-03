import { useMemo } from "react";
import "./CssCurso.css";

const plural = (n, singular, plural_) =>
  `${n} ${n === 1 ? singular : plural_}`;

export default function CssCurso({
  categorias,
  categoriaActiva,
  onCategoriaChange,
  onAbrir,
}) {
  const activa =
    categorias.find((categoria) => categoria.id === categoriaActiva) ??
    categorias[0];

  const total = useMemo(
    () =>
      categorias.reduce(
        (acc, categoria) =>
          acc +
          categoria.grupos.reduce(
            (suma, grupo) => suma + grupo.metodos.length,
            0,
          ),
        0,
      ),
    [categorias],
  );

  return (
    <div className="css-curso">
      <div className="css-hero">
        <span className="css-hero__icon">🎨</span>
        <div className="css-hero__text">
          <h2 className="css-hero__title">CSS: hojas de estilo</h2>
          <p className="css-hero__desc">
            Apuntes de CSS con simuladores interactivos para practicar el Box
            Model, Flexbox, colores, tipografía, tablas, pseudoclases y
            composición visual.
          </p>
          <div className="css-hero__meta">
            <span className="css-chip">🌐 Desarrollo Web</span>
            <span className="css-chip css-chip--accent">
              {plural(categorias.length, "categoría", "categorías")}
            </span>
            <span className="css-chip">
              {plural(total, "apunte", "apuntes")}
            </span>
            <span className="css-chip css-chip--sim">
              🧪 {categorias.length} simuladores
            </span>
          </div>
        </div>
      </div>

      <div className="css-tabs" role="tablist" aria-label="Categorías de CSS">
        {categorias.map((categoria) => (
          <button
            key={categoria.id}
            type="button"
            role="tab"
            aria-selected={activa.id === categoria.id}
            className={`css-tab ${activa.id === categoria.id ? "is-active" : ""}`}
            onClick={() => onCategoriaChange(categoria.id)}
          >
            <span className="css-tab__icon">{categoria.icon}</span>
            <span>{categoria.label}</span>
          </button>
        ))}
      </div>

      <div className="css-category">
        <div className="css-category__head">
          <span className="css-category__icon">{activa.icon}</span>
          <div>
            <h3 className="css-category__title">{activa.titulo}</h3>
            <p className="css-category__desc">{activa.descripcion}</p>
          </div>
          <span className="css-category__sim">{`🧪 Simulador: ${activa.label}`}</span>
        </div>

        {activa.grupos.map((grupo) => (
          <section key={grupo.seccion} className="notion-section">
            <h2 className="notion-section-title">{grupo.seccion}</h2>

            <div className="notion-table-container">
              <table className="notion-table">
                <thead>
                  <tr>
                    <th className="notion-col-title">Aa Propiedad</th>
                    <th>Firma / selector</th>
                  </tr>
                </thead>
                <tbody>
                  {grupo.metodos.map((metodo) => (
                    <tr
                      key={metodo.id}
                      className="is-clickable"
                      style={{ cursor: "pointer" }}
                      onClick={() => onAbrir(metodo.id)}
                    >
                      <td className="notion-cell-title">
                        <span className="notion-cell-icon">{metodo.icon}</span>
                        <span className="notion-cell-name">{metodo.nombre}</span>
                        <span className="css-sim-chip">🧪 Simulador</span>
                        <button
                          type="button"
                          className="notion-open-btn"
                          onClick={(event) => {
                            event.stopPropagation();
                            onAbrir(metodo.id);
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
          </section>
        ))}
      </div>
    </div>
  );
}
