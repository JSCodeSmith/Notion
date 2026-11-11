import { useMemo, useState } from "react";
import CodeBlock from "../CodeBlock/CodeBlock";
import "./HtmlLaboratorio.css";

const BASE_CSS = `
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 18px;
    font-family: "Segoe UI", system-ui, -apple-system, sans-serif;
    font-size: 16px;
    line-height: 1.55;
    color: #1f2937;
    background: #ffffff;
  }
  h1, h2, h3 { margin: 0 0 10px; line-height: 1.25; }
  p { margin: 0 0 12px; }
  a { color: #2563eb; }
  img { max-width: 100%; height: auto; }
  code {
    padding: 2px 6px;
    border-radius: 5px;
    background: #f1f5f9;
    color: #be123c;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: .9em;
  }
  blockquote {
    margin: 0;
    padding: 8px 16px;
    border-left: 4px solid #93c5fd;
    background: #eff6ff;
  }
  table { border-collapse: collapse; }
  th, td { padding: 6px 10px; border: 1px solid #cbd5e1; }
  input, select, textarea, button { font: inherit; }
`;

function crearDocumento(codigo) {
  const tieneHtml = /<!doctype|<html[\s>]/i.test(codigo);

  if (tieneHtml) {
    if (/<head[^>]*>/i.test(codigo)) {
      return codigo.replace(
        /<head[^>]*>/i,
        (apertura) => `${apertura}<style>${BASE_CSS}</style>`,
      );
    }
    return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>${BASE_CSS}</style></head><body>${codigo}</body></html>`;
  }

  if (/<head[\s>]|<title[\s>]/i.test(codigo)) {
    const titulo =
      codigo.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim() ||
      "Laboratorio HTML";
    return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><title>${titulo}</title><style>${BASE_CSS}</style></head><body><h1>${titulo}</h1><p>El <code>&lt;title&gt;</code> se muestra en la pestaña del navegador. El contenido visible de la página se escribe dentro del <code>&lt;body&gt;</code>.</p></body></html>`;
  }

  return `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>${BASE_CSS}</style></head><body>${codigo}</body></html>`;
}

function VistaFrameset() {
  return (
    <div className="html-lab__frameset">
      <div className="html-lab__frameset-cell html-lab__frameset-cell--top">menú.html</div>
      <div className="html-lab__frame-row">
        <div className="html-lab__frameset-cell">contenido.html</div>
        <div className="html-lab__frameset-cell">lateral.html</div>
      </div>
      <p className="html-lab__frameset-note">
        Vista conceptual: cada recuadro era un documento independiente. Hoy se
        consigue lo mismo con CSS Grid o Flexbox.
      </p>
    </div>
  );
}

function VistaSubtitulos({ codigo }) {
  return (
    <div className="html-lab__player">
      <div className="html-lab__player-screen">
        <span className="html-lab__player-caption">
          Hola, esto es un subtítulo de ejemplo
        </span>
      </div>
      <div className="html-lab__player-bar">
        <span>▶</span>
        <span className="html-lab__player-track">
          <span className="html-lab__player-progress" />
        </span>
        <span>0:12 / 1:30</span>
      </div>
      <p className="html-lab__frameset-note">
        El archivo <code>.vtt</code> real se carga desde <code>src</code>; aquí
        ves cómo aparecería el subtítulo sobre el video.
      </p>
      {/<track[^>]*>/.test(codigo) && (
        <code className="html-lab__track-code">
          {codigo.match(/<track[^>]*>/i)?.[0]}
        </code>
      )}
    </div>
  );
}

export default function HtmlLaboratorio({ laboratorio, titulo }) {
  const [codigo, setCodigo] = useState(laboratorio.inicial);
  const [verEjemplo, setVerEjemplo] = useState(false);
  const [editando, setEditando] = useState(true);

  const actual = verEjemplo ? laboratorio.solucion ?? codigo : codigo;
  const documento = useMemo(() => crearDocumento(actual), [actual]);
  const esFrameset = /<frameset[\s>]/i.test(actual);
  const esTrack = /<track[\s>]/i.test(actual);

  const restablecer = () => {
    setCodigo(laboratorio.inicial);
    setVerEjemplo(false);
  };

  return (
    <section className="html-lab">
      <header className="html-lab__header">
        <div>
          <h3 className="html-lab__title">
            🧪 Laboratorio: <code>{titulo}</code>
          </h3>
          <p className="html-lab__objetivo">{laboratorio.objetivo}</p>
        </div>
        <span className="html-lab__badge">Edita y prueba</span>
      </header>

      <div className="html-lab__grid">
        <div className="html-lab__editor">
          <div className="html-lab__panel-title">
            <span>✏️ Tu HTML</span>
            <button
              type="button"
              className="html-lab__btn html-lab__btn--ghost"
              onClick={() => setEditando((v) => !v)}
            >
              {editando ? "👁️ Ver resaltado" : "✏️ Editar"}
            </button>
          </div>

          {editando && !verEjemplo ? (
            <textarea
              className="html-lab__textarea"
              value={codigo}
              spellCheck={false}
              onChange={(event) => setCodigo(event.target.value)}
            />
          ) : (
            <CodeBlock code={actual} />
          )}

          <div className="html-lab__actions">
            <button
              type="button"
              className="html-lab__btn"
              onClick={restablecer}
            >
              🔄 Restablecer
            </button>
            <button
              type="button"
              className="html-lab__btn html-lab__btn--ghost"
              onClick={() => setVerEjemplo((v) => !v)}
            >
              {verEjemplo ? "Volver a mi código" : "💡 Ver ejemplo resuelto"}
            </button>
          </div>
        </div>

        <div className="html-lab__preview">
          <div className="html-lab__panel-title">
            <span>🔎 Resultado</span>
            <span className="html-lab__tag">{titulo}</span>
          </div>
          {esFrameset ? (
            <VistaFrameset />
          ) : esTrack ? (
            <VistaSubtitulos codigo={actual} />
          ) : (
            <iframe
              className="html-lab__frame"
              title={`Laboratorio de ${titulo}`}
              srcDoc={documento}
              sandbox=""
            />
          )}
        </div>
      </div>

      <div className="html-lab__brief">
        <div className="html-lab__brief-block">
          <h4>🎯 Pasos</h4>
          <ol>
            {laboratorio.pasos.map((paso, index) => (
              <li key={index}>{paso}</li>
            ))}
          </ol>
        </div>
        <div className="html-lab__brief-block">
          <h4>🚀 Reto</h4>
          <p>{laboratorio.reto}</p>
        </div>
        <div className="html-lab__brief-block html-lab__brief-block--pista">
          <h4>💡 Pista</h4>
          <p>{laboratorio.pista}</p>
        </div>
      </div>
    </section>
  );
}
