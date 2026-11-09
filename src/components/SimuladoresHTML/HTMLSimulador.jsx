import { useMemo, useState } from "react";
import CodeBlock from "../CodeBlock/CodeBlock";
import { DEMOS, DEMO_URLS, HTML_CONFIGS, HTML_FALLBACK } from "./htmlConfigs";
import "./SimuladorHTML.css";

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
  h1, h2, h3, h4, h5, h6 { margin: 0 0 10px; line-height: 1.25; }
  h1 { font-size: 30px; }
  h2 { font-size: 24px; }
  h3 { font-size: 20px; }
  h4 { font-size: 17px; }
  h5 { font-size: 15px; }
  h6 { font-size: 13px; text-transform: uppercase; letter-spacing: .05em; }
  p { margin: 0 0 12px; }
  a { color: #2563eb; }
  img { max-width: 100%; height: auto; }
  figure { margin: 0; }
  figcaption { margin-top: 8px; color: #64748b; font-size: 14px; }
  code {
    padding: 2px 6px;
    border-radius: 5px;
    background: #f1f5f9;
    color: #be123c;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: .9em;
  }
  pre {
    margin: 0;
    padding: 14px;
    overflow-x: auto;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #0f172a;
    color: #e2e8f0;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 13px;
  }
  hr { margin: 18px 0; }
  input, select, textarea, button {
    font: inherit;
  }
  input[type="text"], input[type="email"], select, textarea {
    padding: 7px 10px;
    border: 1px solid #cbd5e1;
    border-radius: 6px;
    background: #fff;
    color: #0f172a;
  }
  textarea { resize: vertical; }
  button {
    padding: 7px 14px;
    border: 1px solid #2563eb;
    border-radius: 6px;
    background: #2563eb;
    color: #fff;
    cursor: pointer;
  }
  label { display: inline-block; margin-bottom: 4px; font-size: 14px; color: #334155; }
  form { display: flex; flex-direction: column; gap: 8px; max-width: 360px; }
  audio, video, iframe { max-width: 100%; border-radius: 8px; }
  blockquote {
    margin: 0;
    padding: 8px 16px;
    border-left: 4px solid #93c5fd;
    background: #eff6ff;
  }
  body.demo-regiones header,
  body.demo-regiones footer,
  body.demo-regiones main,
  body.demo-regiones section,
  body.demo-regiones article,
  body.demo-regiones nav,
  body.demo-regiones aside,
  body.demo-regiones div {
    position: relative;
    margin: 10px 0;
    padding: 14px;
    border: 1px dashed #93c5fd;
    border-radius: 8px;
    background: rgba(239, 246, 255, .5);
  }
  body.demo-regiones header::before,
  body.demo-regiones footer::before,
  body.demo-regiones main::before,
  body.demo-regiones section::before,
  body.demo-regiones article::before,
  body.demo-regiones nav::before,
  body.demo-regiones aside::before,
  body.demo-regiones div::before {
    position: absolute;
    top: -9px;
    right: 8px;
    padding: 1px 7px;
    border-radius: 999px;
    background: #dbeafe;
    color: #1d4ed8;
    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
    font-size: 10px;
    letter-spacing: .04em;
  }
  body.demo-regiones header::before { content: "header"; }
  body.demo-regiones footer::before { content: "footer"; }
  body.demo-regiones main::before { content: "main"; }
  body.demo-regiones section::before { content: "section"; }
  body.demo-regiones article::before { content: "article"; }
  body.demo-regiones nav::before { content: "nav"; }
  body.demo-regiones aside::before { content: "aside"; }
  body.demo-regiones div::before { content: "div"; }
  body.demo-regiones header { border-color: #fca5a5; background: rgba(254, 242, 242, .6); }
  body.demo-regiones footer { border-color: #c4b5fd; background: rgba(245, 243, 255, .6); }
  body.demo-regiones main { border-color: #86efac; background: rgba(240, 253, 244, .6); }
  body.demo-regiones nav { border-color: #fcd34d; background: rgba(254, 252, 232, .6); }
  body.demo-regiones aside { border-color: #f9a8d4; background: rgba(253, 242, 248, .6); }
`;

const ALTO_PREVIEW = {
  "html-img": 300,
  "html-video": 330,
  "html-audio": 180,
  "html-iframe": 300,
  "html-figure": 330,
  "html-figcaption": 330,
  "html-pre": 260,
  "html-textarea": 200,
  "html-select": 220,
};

const reemplazarDemos = (html) =>
  Object.entries(DEMO_URLS).reduce(
    (resultado, [clave, url]) =>
      resultado.split(url).join(DEMOS[clave]?.src ?? url),
    html,
  );

const crearDocumento = (codigo, config) => {
  const esDocumento = /<!doctype|<html[\s>]/i.test(codigo);
  if (esDocumento) {
    if (/<head[^>]*>/i.test(codigo)) {
      return reemplazarDemos(
        codigo.replace(
          /<head[^>]*>/i,
          (apertura) => `${apertura}<style>${BASE_CSS}</style>`,
        ),
      );
    }
    return reemplazarDemos(
      `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>${BASE_CSS}</style></head><body>${codigo}</body></html>`,
    );
  }

  const clase = config.resaltar ? ' class="demo-regiones"' : "";
  return reemplazarDemos(
    `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8"><style>${BASE_CSS}</style></head><body${clase}>${codigo}</body></html>`,
  );
};

function Campo({ campo, valor, onChange }) {
  if (campo.tipo === "checkbox") {
    return (
      <label className="html-sim__check">
        <input
          type="checkbox"
          checked={Boolean(valor)}
          onChange={(event) => onChange(event.target.checked)}
        />
        <span>{campo.label}</span>
      </label>
    );
  }

  if (campo.tipo === "range") {
    return (
      <label className="html-sim__field">
        <span className="html-sim__label">
          {campo.label}
          <strong>
            {valor}
            {campo.unidad ?? ""}
          </strong>
        </span>
        <input
          className="html-sim__range"
          type="range"
          min={campo.min ?? 0}
          max={campo.max ?? 100}
          step={campo.step ?? 1}
          value={valor}
          onChange={(event) => onChange(Number(event.target.value))}
        />
      </label>
    );
  }

  if (campo.tipo === "color") {
    return (
      <label className="html-sim__field">
        <span className="html-sim__label">{campo.label}</span>
        <span className="html-sim__color-row">
          <input
            className="html-sim__color"
            type="color"
            value={valor}
            onChange={(event) => onChange(event.target.value)}
          />
          <code>{valor}</code>
        </span>
      </label>
    );
  }

  if (campo.tipo === "select") {
    return (
      <label className="html-sim__field">
        <span className="html-sim__label">{campo.label}</span>
        <select
          className="html-sim__input"
          value={valor}
          onChange={(event) => onChange(event.target.value)}
        >
          {(campo.opciones ?? []).map((opcion) => {
            const value =
              typeof opcion === "string" ? opcion : opcion.value;
            const label =
              typeof opcion === "string" ? opcion : opcion.label;
            return (
              <option key={value} value={value}>
                {label}
              </option>
            );
          })}
        </select>
      </label>
    );
  }

  if (campo.tipo === "textarea") {
    return (
      <label className="html-sim__field html-sim__field--full">
        <span className="html-sim__label">{campo.label}</span>
        <textarea
          className="html-sim__textarea"
          value={valor}
          rows={4}
          onChange={(event) => onChange(event.target.value)}
        />
      </label>
    );
  }

  return (
    <label className="html-sim__field">
      <span className="html-sim__label">{campo.label}</span>
      <input
        className="html-sim__input"
        type="text"
        value={valor}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}

function VistaDoctype({ incluir }) {
  return (
    <div className="html-sim__doctype">
      <div
        className={`html-sim__mode ${incluir ? "is-ok" : "is-quirks"}`}
      >
        <span className="html-sim__mode-icon">{incluir ? "✅" : "⚠️"}</span>
        <div>
          <strong>{incluir ? "Standards mode" : "Quirks mode"}</strong>
          <p>
            {incluir
              ? "El navegador aplica las reglas modernas del estándar HTML5."
              : "Sin DOCTYPE el navegador imita modos antiguos y puede calcular mal tamaños y márgenes."}
          </p>
        </div>
      </div>

      <div className="html-sim__demo-page">
        <div className="html-sim__demo-box">
          <span>Caja de ejemplo</span>
          <small>
            {incluir
              ? "width incluye padding y borde de forma predecible"
              : "el box model puede comportarse de forma inesperada"}
          </small>
        </div>
      </div>
    </div>
  );
}

function VistaHead({ valores }) {
  return (
    <div className="html-sim__browser">
      <div className="html-sim__browser-bar">
        <span className="html-sim__browser-dot is-red" />
        <span className="html-sim__browser-dot is-yellow" />
        <span className="html-sim__browser-dot is-green" />
        <span className="html-sim__browser-tab">
          {valores.title || "Sin título"}
        </span>
      </div>
      <div className="html-sim__browser-url">https://mi-sitio.com</div>
      <div className="html-sim__meta-list">
        <span className="html-sim__meta-item">
          🔤 charset: <code>{valores.charset}</code>
        </span>
        {valores.viewport && (
          <span className="html-sim__meta-item">
            📱 viewport: <code>width=device-width</code>
          </span>
        )}
        {valores.descripcion && (
          <div className="html-sim__meta-desc">
            <span>🔎 meta description</span>
            <p>{valores.descripcion}</p>
          </div>
        )}
      </div>
      <div className="html-sim__head-page">
        <strong>La página se vería aquí</strong>
        <span>
          Los metadatos del <code>&lt;head&gt;</code> no se muestran en el
          contenido visible.
        </span>
      </div>
    </div>
  );
}

export default function HTMLSimulador({ metodoId }) {
  const config = HTML_CONFIGS[metodoId] ?? HTML_FALLBACK;

  const iniciales = useMemo(
    () =>
      Object.fromEntries(
        (config.campos ?? []).map((campo) => [campo.key, campo.valor]),
      ),
    [config],
  );

  const [valores, setValores] = useState(iniciales);
  const [codigoEditado, setCodigoEditado] = useState(null);
  const [editando, setEditando] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const codigo = codigoEditado ?? config.construir(valores);

  const cambiar = (key, valor) => {
    setValores((previos) => ({ ...previos, [key]: valor }));
    setCodigoEditado(null);
  };

  const restablecer = () => {
    setValores(iniciales);
    setCodigoEditado(null);
    setEditando(false);
  };

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(codigo);
      setCopiado(true);
      window.setTimeout(() => setCopiado(false), 1600);
    } catch {
      setCopiado(false);
    }
  };

  const alto = ALTO_PREVIEW[metodoId] ?? 250;

  return (
    <div className="html-sim">
      <div className="html-sim__header">
        <div className="html-sim__title-row">
          <span className="html-sim__icon">{config.icon}</span>
          <div>
            <h3 className="html-sim__title">
              Simulador: <code>{config.etiqueta}</code>
            </h3>
            <p className="html-sim__desc">{config.descripcion}</p>
          </div>
          <span className="html-sim__badge">🧪 Interactivo</span>
        </div>
      </div>

      <div className="html-sim__grid">
        <div className="html-sim__controls">
          <div className="html-sim__panel-title">⚙️ Controles</div>
          <div className="html-sim__fields">
            {(config.campos ?? []).map((campo) => (
              <Campo
                key={campo.key}
                campo={campo}
                valor={valores[campo.key]}
                onChange={(valor) => cambiar(campo.key, valor)}
              />
            ))}
          </div>
          <div className="html-sim__actions">
            <button
              type="button"
              className="html-sim__btn"
              onClick={restablecer}
            >
              🔄 Restablecer
            </button>
          </div>
        </div>

        <div className="html-sim__preview">
          <div className="html-sim__preview-bar">
            <span>🔎 Vista previa</span>
            <span className="html-sim__preview-tag">
              {config.etiqueta}
            </span>
          </div>

          {config.vista === "doctype" ? (
            <VistaDoctype incluir={Boolean(valores.incluir)} />
          ) : config.vista === "head" ? (
            <VistaHead valores={valores} />
          ) : (
            <iframe
              className="html-sim__frame"
              title={`Vista previa de ${config.etiqueta}`}
              srcDoc={crearDocumento(codigo, config)}
              sandbox=""
              style={{ height: alto }}
            />
          )}
        </div>
      </div>

      <div className="html-sim__codebox">
        <div className="html-sim__code-head">
          <span>🧾 Código HTML</span>
          <div className="html-sim__code-actions">
            <button
              type="button"
              className="html-sim__btn html-sim__btn--ghost"
              onClick={() => setEditando((previo) => !previo)}
            >
              {editando ? "✅ Listo" : "✏️ Editar"}
            </button>
            <button
              type="button"
              className="html-sim__btn html-sim__btn--ghost"
              onClick={copiar}
            >
              {copiado ? "✅ Copiado" : "📋 Copiar"}
            </button>
          </div>
        </div>

        {editando ? (
          <textarea
            className="html-sim__code-editor"
            value={codigo}
            spellCheck={false}
            onChange={(event) => setCodigoEditado(event.target.value)}
          />
        ) : (
          <CodeBlock code={codigo} />
        )}
      </div>

      {config.nota && (
        <div className="html-sim__note">
          <span>💡</span>
          <p>{config.nota}</p>
        </div>
      )}
    </div>
  );
}
