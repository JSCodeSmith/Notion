import { useMemo, useState } from "react";
import {
  HTML_CATEGORIAS,
  HTML_APUNTES,
  HTML_APUNTE_CATEGORIA,
} from "../../data/htmlApuntes";
import HtmlDoc from "./HtmlDoc";
import "./HtmlCurso.css";

const plural = (n, singular, plural_) =>
  `${n} ${n === 1 ? singular : plural_}`;

export default function HtmlCurso({ metodoActivo, onMetodoChange }) {
  const [categoriaId, setCategoriaId] = useState(
    () =>
      (metodoActivo && HTML_APUNTE_CATEGORIA[metodoActivo]) ||
      HTML_CATEGORIAS[0]?.id,
  );

  const categoriaActivaId =
    (metodoActivo && HTML_APUNTE_CATEGORIA[metodoActivo]) || categoriaId;

  const activa =
    HTML_CATEGORIAS.find((categoria) => categoria.id === categoriaActivaId) ??
    HTML_CATEGORIAS[0];

  const total = useMemo(
    () =>
      HTML_CATEGORIAS.reduce(
        (acc, categoria) =>
          acc +
          categoria.grupos.reduce(
            (suma, grupo) => suma + grupo.metodos.length,
            0,
          ),
        0,
      ),
    [],
  );

  const doc = metodoActivo ? HTML_APUNTES[metodoActivo] : null;

  if (doc) {
    return (
      <HtmlDoc
        doc={doc}
        onBack={() => {
          const categoria = HTML_APUNTE_CATEGORIA[doc.id];
          if (categoria) setCategoriaId(categoria);
          onMetodoChange(null);
        }}
      />
    );
  }

  return (
    <div className="html-curso">
      <div className="html-hero">
        <span className="html-hero__icon">🌐</span>
        <div className="html-hero__text">
          <h2 className="html-hero__title">HTML: elementos</h2>
          <p className="html-hero__desc">
            Apuntes de etiquetas HTML con un simulador interactivo y un quiz
            para cada concepto. Edita el código, observa el resultado en vivo y
            comprueba lo aprendido.
          </p>
          <div className="html-hero__meta">
            <span className="html-chip">🌐 Desarrollo Web</span>
            <span className="html-chip html-chip--accent">
              {plural(HTML_CATEGORIAS.length, "categoría", "categorías")}
            </span>
            <span className="html-chip">
              {plural(total, "apunte", "apuntes")}
            </span>
            <span className="html-chip html-chip--sim">
              🧪 {total} simuladores + quiz
            </span>
          </div>
        </div>
      </div>

      <div className="html-tabs" role="tablist" aria-label="Categorías de HTML">
        {HTML_CATEGORIAS.map((categoria) => (
          <button
            key={categoria.id}
            type="button"
            role="tab"
            aria-selected={activa.id === categoria.id}
            className={`html-tab ${activa.id === categoria.id ? "is-active" : ""}`}
            onClick={() => {
              setCategoriaId(categoria.id);
              onMetodoChange(null);
            }}
          >
            <span className="html-tab__icon">{categoria.icon}</span>
            <span>{categoria.label}</span>
          </button>
        ))}
      </div>

      <div className="html-category">
        <div className="html-category__head">
          <span className="html-category__icon">{activa.icon}</span>
          <div className="html-category__text">
            <h3 className="html-category__title">{activa.titulo}</h3>
            <p className="html-category__desc">{activa.descripcion}</p>
          </div>
          <span className="html-category__sim">
            🧪 Simulador + quiz por etiqueta
          </span>
        </div>

        {activa.grupos.map((grupo) => (
          <section key={grupo.seccion} className="notion-section">
            <h2 className="notion-section-title">{grupo.seccion}</h2>

            <div className="notion-table-container">
              <table className="notion-table">
                <thead>
                  <tr>
                    <th className="notion-col-title">Aa Etiqueta</th>
                    <th>Firma</th>
                  </tr>
                </thead>
                <tbody>
                  {grupo.metodos.map((metodo) => (
                    <tr
                      key={metodo.id}
                      className="is-clickable"
                      style={{ cursor: "pointer" }}
                      onClick={() => onMetodoChange(metodo.id)}
                    >
                      <td className="notion-cell-title">
                        <span className="notion-cell-icon">{metodo.icon}</span>
                        <span className="notion-cell-name html-cell-name">
                          {metodo.nombre}
                        </span>
                        <span className="html-sim-chip">🧪 Simulador</span>
                        <span className="html-quiz-chip">🧠 Quiz</span>
                        <button
                          type="button"
                          className="notion-open-btn"
                          onClick={(event) => {
                            event.stopPropagation();
                            onMetodoChange(metodo.id);
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
