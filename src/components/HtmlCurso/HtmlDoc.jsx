import CodeBlock from "../CodeBlock/CodeBlock";
import {
  Contenido,
  Inline,
  Lista,
  Quiz,
} from "../CareerDetail/MetodoDoc";
import HTMLSimulador from "../SimuladoresHTML/HTMLSimulador";
import "../CareerDetail/MetodoFindDoc.css";
import "./HtmlDoc.css";

const tieneContenido = (valor) =>
  Array.isArray(valor) ? valor.length > 0 : Boolean(valor);

export default function HtmlDoc({ doc, onBack }) {
  const quiz = doc.quiz ?? [];

  return (
    <article className="notion-page detail-page html-doc">
      <button type="button" className="notion-back-btn" onClick={onBack}>
        ← Volver a los apuntes de HTML
      </button>

      <header className="html-doc__header">
        <span className="html-doc__icon">{doc.icon}</span>
        <div className="html-doc__heading">
          <h1 className="html-doc__title">{doc.titulo}</h1>
          <p className="html-doc__firma">
            <code>{doc.firma}</code>
          </p>
          <div className="html-doc__props">
            <span className="html-doc__prop">📂 {doc.categoria}</span>
            <span className="html-doc__prop html-doc__prop--sim">
              🧪 Simulador interactivo
            </span>
            <span className="html-doc__prop html-doc__prop--quiz">
              🧠 {quiz.length} preguntas
            </span>
          </div>
        </div>
      </header>

      <hr className="notion-divider" />

      <div className="doc-grid">
        {tieneContenido(doc.definicion) && (
          <div className="doc-card">
            <h3>📝 Definición</h3>
            <Contenido data={doc.definicion} />
          </div>
        )}

        {tieneContenido(doc.queEs) && (
          <div className="doc-card">
            <h3>🧠 ¿Qué es?</h3>
            <Contenido data={doc.queEs} />
          </div>
        )}

        {tieneContenido(doc.paraQueSirve) && (
          <div className="doc-card">
            <h3>🎯 ¿Para qué sirve?</h3>
            <Contenido data={doc.paraQueSirve} />
          </div>
        )}

        {tieneContenido(doc.comoFunciona) && (
          <div className="doc-card">
            <h3>⚙️ ¿Cómo funciona?</h3>
            <Lista items={doc.comoFunciona} ordenada={!doc.comoFuncionaSinNumerar} />
          </div>
        )}

        {tieneContenido(doc.sintaxis) && (
          <div className="doc-card doc-card--full">
            <h3>🧾 Sintaxis / Estructura</h3>
            {doc.sintaxis.map((sintaxis, index) => (
              <div key={index}>
                {sintaxis.caption && (
                  <p className="code-caption">{sintaxis.caption}</p>
                )}
                <CodeBlock code={sintaxis.code} />
              </div>
            ))}
            {doc.nota && (
              <div className="html-doc__callout">
                <span>💡</span>
                <p>
                  <Inline text={doc.nota} />
                </p>
              </div>
            )}
          </div>
        )}

        <div className="doc-card doc-card--full html-doc__sim">
          <HTMLSimulador key={doc.id} metodoId={doc.id} />
        </div>

        {quiz.length > 0 && <Quiz key={`quiz-${doc.id}`} preguntas={quiz} />}

        {tieneContenido(doc.ejemplos) && (
          <div className="doc-card doc-card--full">
            <h3>💡 Ejemplos</h3>
            {doc.ejemplos.map((ejemplo, index) => (
              <div key={index}>
                <p
                  className="example-title"
                  style={{ marginTop: index > 0 ? "18px" : 0 }}
                >
                  <strong>{ejemplo.titulo}</strong>
                </p>
                {ejemplo.descripcion && (
                  <p style={{ margin: "0 0 8px" }}>
                    <Inline text={ejemplo.descripcion} />
                  </p>
                )}
                <CodeBlock code={ejemplo.code} />
              </div>
            ))}
          </div>
        )}

        {tieneContenido(doc.errores) && (
          <div className="doc-card">
            <h3>⚠️ Errores comunes</h3>
            <Lista items={doc.errores} />
          </div>
        )}

        {tieneContenido(doc.casos) && (
          <div className="doc-card">
            <h3>💼 Casos de uso</h3>
            <Lista items={doc.casos} />
          </div>
        )}

        {tieneContenido(doc.relacion) && (
          <div className="doc-card">
            <h3>🧩 Relación con otros conceptos</h3>
            <Lista items={doc.relacion} />
          </div>
        )}

        {doc.analogia && (
          <div className="doc-card">
            <h3>🧠 Analogía</h3>
            <p>
              <Inline text={doc.analogia} />
            </p>
          </div>
        )}

        {doc.fuente && (
          <div className="doc-card doc-card--full html-doc__source">
            <h3 style={{ margin: 0 }}>📚 Fuente:</h3>
            <span>{doc.fuente}</span>
          </div>
        )}

        {tieneContenido(doc.notasPersonales) && (
          <div className="doc-card doc-card--full html-doc__notes">
            <h3>📝 Notas personales</h3>
            <Contenido data={doc.notasPersonales} />
          </div>
        )}
      </div>
    </article>
  );
}
