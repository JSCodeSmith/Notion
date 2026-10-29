import { useState } from "react";
import ApiBreadcrumb from "../ApiBreadcrumb";
import MetodoDoc from "../../components/CareerDetail/MetodoDoc";
import SimuladorConsoleLog from "./simuladores/SimuladorConsoleLog";
import SimuladorMensajeConsola from "./simuladores/SimuladorMensajeConsola";
import SimuladorAssert from "./simuladores/SimuladorAssert";
import SimuladorClear from "./simuladores/SimuladorClear";
import SimuladorContador from "./simuladores/SimuladorContador";
import SimuladorGrupo from "./simuladores/SimuladorGrupo";
import SimuladorTable from "./simuladores/SimuladorTable";
import SimuladorDirxml from "./simuladores/SimuladorDirxml";
import SimuladorTiempo from "./simuladores/SimuladorTiempo";
import SimuladorTimeStamp from "./simuladores/SimuladorTimeStamp";
import SimuladorTrace from "./simuladores/SimuladorTrace";
import { CONSOLE_API_DOCS } from "./data";
import "../../components/CareerGrid/CareerGrid.css";
import "../../components/CareerDetail/CareerDetail.css";
import "../../components/CareerDetail/LenguajeTabs.css";
import "./ConsoleAPI.css";

const SIMULADORES = {
  "console-log": SimuladorConsoleLog,
  mensaje: SimuladorMensajeConsola,
  assert: SimuladorAssert,
  clear: SimuladorClear,
  contador: SimuladorContador,
  grupo: SimuladorGrupo,
  table: SimuladorTable,
  dirxml: SimuladorDirxml,
  tiempo: SimuladorTiempo,
  "tiempo-end": SimuladorTiempo,
  "tiempo-log": SimuladorTiempo,
  timestamp: SimuladorTimeStamp,
  trace: SimuladorTrace,
};

export default function ConsoleAPI({
  grupo,
  onBack,
  breadcrumb = [],
  conceptoActivo = null,
  onConceptoChange = () => {},
}) {
  const [activoLocal, setActivoLocal] = useState(null);
  const activo = conceptoActivo ?? activoLocal;
  const doc = activo ? CONSOLE_API_DOCS[activo] : null;

  const abrirConcepto = (id) => {
    setActivoLocal(id);
    onConceptoChange(id);
  };

  const cerrarConcepto = () => {
    setActivoLocal(null);
    onConceptoChange(null);
  };

  if (doc) {
    return (
      <MetodoDoc
        metodo={doc}
        onBack={cerrarConcepto}
        simuladores={SIMULADORES}
      />
    );
  }

  const conceptos = grupo?.conceptos ?? [];

  return (
    <article className="notion-page detail-page">
      {breadcrumb.length > 0 ? (
        <ApiBreadcrumb items={breadcrumb} />
      ) : (
        <button type="button" className="notion-back-btn" onClick={onBack}>
          ← Volver a las APIs
        </button>
      )}

      <div className="detail-header">
        <div className="detail-icon">{grupo?.icon ?? "🖥️"}</div>
        <h1 className="detail-title">{grupo?.nombre ?? "Console API"}</h1>
      </div>

      <p className="console-api-intro">
        {grupo?.descripcion ??
          "Herramientas nativas para imprimir, inspeccionar y depurar código."}
      </p>

      <div className="notion-database">
        <div className="notion-viewbar">
          <span className="notion-viewtab is-active">
            {grupo?.icon ?? "🖥️"} Conceptos
          </span>
          <span className="notion-viewtab">📖 Apuntes + simuladores</span>
        </div>

        {conceptos.length === 0 ? (
          <p className="console-api-empty">
            Todavía no hay conceptos en esta API. ✨
          </p>
        ) : (
          <div className="notion-table-container">
            <table className="notion-table">
              <thead>
                <tr>
                  <th className="notion-col-title">Aa Concepto</th>
                  <th>Firma</th>
                </tr>
              </thead>
              <tbody>
                {conceptos.map((concepto) => (
                  <tr
                    key={concepto.id}
                    className="is-clickable"
                    onClick={() => abrirConcepto(concepto.id)}
                    style={{ cursor: "pointer" }}
                  >
                    <td className="notion-cell-title">
                      <span className="notion-cell-icon">{concepto.icon}</span>
                      <span className="notion-cell-name">{concepto.nombre}</span>
                      <span className="notion-badge notion-badge--info">
                        Simulador
                      </span>
                      <button type="button" className="notion-open-btn">
                        ABRIR
                      </button>
                    </td>
                    <td className="notion-cell-sig">{concepto.firma}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </article>
  );
}
