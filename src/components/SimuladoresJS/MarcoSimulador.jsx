import CodeBlock from "../CodeBlock/CodeBlock";
import "../SimuladorFind/SimuladorFind.css";
import "./SimuladoresJS.css";

/* Marco común de los simuladores: cabecera, panel de pruebas y consola. */
export default function MarcoSimulador({
  icon,
  titulo,
  descripcion,
  children,
  consola,
  codigo,
  nota,
}) {
  return (
    <div className="sim-container sjs-sim">
      <div className="sim-header">
        <h3>
          {icon} Simulador interactivo: <code>{titulo}</code>
        </h3>
        <p className="sjs-intro">{descripcion}</p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">Panel de pruebas</div>
        {children}
      </div>

      <div className="sim-console">
        <div className="sim-console-header">Consola</div>
        <div className="sim-console-body">
          {consola || (
            <span className="log-system">Interactúa con el panel superior...</span>
          )}
        </div>
      </div>

      {codigo && (
        <div className="sjs-card" style={{ marginTop: 14 }}>
          <div className="sjs-card__label">🧾 Código</div>
          <CodeBlock code={codigo} />
        </div>
      )}

      {nota && <div className="sjs-note">{nota}</div>}
    </div>
  );
}
