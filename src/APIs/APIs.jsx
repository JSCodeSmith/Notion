import ApiBreadcrumb from "./ApiBreadcrumb";
import ConsoleAPI from "./ConsoleAPI/ConsoleAPI";
import { API_GRUPOS, getApiGrupo } from "./registry";
import "../components/CareerGrid/CareerGrid.css";
import "../components/CareerDetail/CareerDetail.css";
import "../components/CareerDetail/LenguajeTabs.css";
import "./APIs.css";

export default function APIs({
  breadcrumb = [],
  onBack,
  embedded = false,
  grupoId = null,
  onGrupoChange = () => {},
  metodoActivo = null,
  onMetodoChange = () => {},
}) {
  const grupoDelMetodo = metodoActivo
    ? API_GRUPOS.find((item) =>
        item.conceptos.some((concepto) => concepto.id === metodoActivo),
      ) ?? null
    : null;

  const grupo = grupoDelMetodo ?? getApiGrupo(grupoId);

  const volverAGrupos = () => {
    onMetodoChange(null);
    onGrupoChange(null);
  };

  const volverAListaConceptos = () => {
    if (grupoDelMetodo) onMetodoChange(null);
    else onGrupoChange(null);
  };

  if (grupo) {
    const base = breadcrumb.length > 0 ? breadcrumb.slice(0, -1) : [];
    const apiCrumb =
      breadcrumb.length > 0
        ? { ...breadcrumb[breadcrumb.length - 1], onClick: volverAGrupos }
        : { icon: "🔌", label: "APIs", onClick: volverAGrupos };

    return (
      <ConsoleAPI
        grupo={grupo}
        onBack={volverAListaConceptos}
        conceptoActivo={metodoActivo}
        onConceptoChange={(id) => {
          onMetodoChange(id);
          if (id) onGrupoChange(grupo.id);
        }}
        breadcrumb={[
          ...base,
          apiCrumb,
          { icon: grupo.icon, label: grupo.nombre },
        ]}
      />
    );
  }

  const gruposList = (
    <>
      <p className="apis-intro">
        Explora las APIs nativas de JavaScript y sus conceptos con apuntes y
        simuladores interactivos. 🧩
      </p>

      <div className="api-grid">
        {API_GRUPOS.map((item) => (
          <button
            key={item.id}
            type="button"
            className="api-card"
            onClick={() => onGrupoChange(item.id)}
          >
            <span className="api-card__icon">{item.icon}</span>
            <span className="api-card__body">
              <strong className="api-card__name">{item.nombre}</strong>
              <span className="api-card__desc">{item.descripcion}</span>
            </span>
            <span className="api-card__meta">
              <span className="api-card__count">
                {item.conceptos.length} concepto
                {item.conceptos.length === 1 ? "" : "s"}
              </span>
              <span className="api-card__open">ABRIR →</span>
            </span>
          </button>
        ))}
      </div>
    </>
  );

  // Dentro de una pestaña (por ejemplo JavaScript → APIs) solo se muestra
  // la lista de grupos; el marco de la página lo pone CareerDetail.
  if (embedded) return gruposList;

  return (
    <article className="notion-page detail-page">
      {breadcrumb.length > 0 ? (
        <ApiBreadcrumb items={breadcrumb} />
      ) : (
        onBack && (
          <button type="button" className="notion-back-btn" onClick={onBack}>
            ← Volver
          </button>
        )
      )}

      <div className="detail-header">
        <div className="detail-icon">🔌</div>
        <h1 className="detail-title">APIs</h1>
      </div>

      <div className="notion-database">
        <div className="notion-viewbar">
          <span className="notion-viewtab is-active">🧩 Grupos de APIs</span>
        </div>

        {gruposList}
      </div>
    </article>
  );
}
