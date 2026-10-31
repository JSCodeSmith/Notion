import { useMemo, useState } from "react";
import CodeBlock from "../CodeBlock/CodeBlock";
import "../SimuladorFind/SimuladorFind.css";
import "./SimuladoresJS.css";

const PRESETS_STRINGIFY = {
  persona: {
    label: "Persona",
    code: `const usuario = {
  nombre: "Ana",
  edad: 25
};`,
    crear: () => ({ nombre: "Ana", edad: 25 }),
  },
  array: {
    label: "Array",
    code: `const numeros = [10, 20, 30];`,
    crear: () => [10, 20, 30],
  },
  funciones: {
    label: "Con función",
    code: `const usuario = {
  nombre: "Ana",
  saludar() { console.log("Hola"); }
};`,
    crear: () => ({
      nombre: "Ana",
      saludar() {
        console.log("Hola");
      },
    }),
  },
  undefined: {
    label: "Con undefined",
    code: `const usuario = {
  nombre: "Ana",
  edad: undefined,
  ciudad: "Madrid"
};`,
    crear: () => ({ nombre: "Ana", edad: undefined, ciudad: "Madrid" }),
  },
  circular: {
    label: "Referencia circular",
    code: `const persona = { nombre: "Ana" };
persona.amigo = persona;`,
    crear: () => {
      const persona = { nombre: "Ana" };
      persona.amigo = persona;
      return persona;
    },
  },
};

const REPLACER_SEGURO = ["nombre", "edad"];

const PRESETS_PARSE = {
  objeto: {
    label: "Objeto válido",
    texto: '{"nombre":"Ana","edad":25}',
  },
  array: {
    label: "Array válido",
    texto: "[10,20,30]",
  },
  comillas: {
    label: "Comillas simples (inválido)",
    texto: "{'nombre':'Juan'}",
  },
  coma: {
    label: "Coma final (inválido)",
    texto: '{"nombre":"Juan",}',
  },
  objetoJs: {
    label: "Objeto JS (inválido)",
    texto: '{ nombre: "Juan" }',
  },
};

function SimuladorStringify() {
  const [preset, setPreset] = useState("persona");
  const [replacer, setReplacer] = useState("none");
  const [space, setSpace] = useState("2");

  const config = PRESETS_STRINGIFY[preset];
  const replacerArg = replacer === "safe" ? REPLACER_SEGURO : null;
  const espacio = Number(space);

  const { salida, error, tipo } = useMemo(() => {
    try {
      const valor = config.crear();
      const resultado = JSON.stringify(valor, replacerArg, espacio);
      return { salida: resultado, error: null, tipo: typeof resultado };
    } catch (err) {
      return {
        salida: null,
        error: `${err.name}: ${err.message}`,
        tipo: null,
      };
    }
  }, [config, replacerArg, espacio]);

  const codigo = `const json = JSON.stringify(${
    preset === "array" ? "numeros" : "usuario"
  }, ${replacer === "safe" ? '["nombre", "edad"]' : "null"}, ${espacio});`;

  return (
    <div className="sim-container sjs-sim">
      <div className="sim-header">
        <h3>
          📤 Simulador interactivo: <code>JSON.stringify()</code>
        </h3>
        <p className="sjs-intro">
          Elige un valor, un filtro y el formato. Observa qué tipos se
          serializan, cuáles se omiten y cuándo se produce un error. ✨
        </p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">Entrada que se va a serializar</div>

        <div className="sjs-toolbar">
          <label className="sjs-field">
            <span>Valor</span>
            <select
              className="sjs-select"
              value={preset}
              onChange={(e) => setPreset(e.target.value)}
            >
              {Object.entries(PRESETS_STRINGIFY).map(([id, item]) => (
                <option key={id} value={id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="sjs-field">
            <span>replacer</span>
            <select
              className="sjs-select"
              value={replacer}
              onChange={(e) => setReplacer(e.target.value)}
            >
              <option value="none">null (todas las claves)</option>
              <option value="safe">["nombre", "edad"]</option>
            </select>
          </label>

          <label className="sjs-field">
            <span>espacio</span>
            <select
              className="sjs-select"
              value={space}
              onChange={(e) => setSpace(e.target.value)}
            >
              <option value="0">0 (compacto)</option>
              <option value="2">2 espacios</option>
              <option value="4">4 espacios</option>
            </select>
          </label>
        </div>

        <div className="sjs-grid-2">
          <div className="sjs-card">
            <div className="sjs-card__label">🧾 Código equivalente</div>
            <CodeBlock code={`${config.code}\n\n${codigo}`} />
          </div>

          <div className="sjs-card">
            <div className="sjs-card__label">
              <span>📤 Resultado</span>
              <span className="sjs-tag">{tipo ?? "error"}</span>
            </div>

            {error ? (
              <div className="sjs-output sjs-output--error">{error}</div>
            ) : salida === undefined ? (
              <div className="sjs-output sjs-output--warn">
                undefined{"\n\n"}
                El valor raíz no es serializable: no se genera una cadena JSON.
              </div>
            ) : (
              <div className="sjs-output sjs-output--ok">{salida}</div>
            )}

            <div className="sjs-tags">
              <span className={`sjs-tag ${tipo === "string" ? "sjs-tag--ok" : "sjs-tag--bad"}`}>
                typeof → {tipo ?? "—"}
              </span>
              <span className="sjs-tag">
                {salida ? `${salida.length} caracteres` : "sin cadena"}
              </span>
              {replacer === "safe" && (
                <span className="sjs-tag sjs-tag--info">replacer activo</span>
              )}
            </div>
          </div>
        </div>

        {preset === "funciones" && (
          <div className="sjs-note">
            ⚠️ La propiedad <strong>saludar</strong> es una función:{" "}
            <code>JSON.stringify()</code> la omite del resultado.
          </div>
        )}
        {preset === "undefined" && (
          <div className="sjs-note">
            ⚠️ La propiedad <strong>edad</strong> vale <code>undefined</code> y
            también se omite. Si el valor raíz fuera <code>undefined</code>, el
            método devolvería <code>undefined</code>.
          </div>
        )}
        {preset === "circular" && (
          <div className="sjs-note">
            🚫 La referencia circular <code>persona.amigo = persona</code> no se
            puede serializar. Para copias profundas con ciclos usa{" "}
            <code>structuredClone()</code>.
          </div>
        )}
        {preset === "persona" && replacer === "none" && (
          <div className="sjs-note">
            💡 El resultado es un <strong>string</strong>, no un objeto. Para
            volver a convertirlo en objeto usa <code>JSON.parse()</code>.
          </div>
        )}
        {preset === "persona" && replacer === "safe" && (
          <div className="sjs-note">
            🔍 Con <code>replacer</code> solo se incluyen las claves indicadas.
            Es útil para evitar enviar campos sensibles.
          </div>
        )}
      </div>

      <div className="sim-console">
        <div className="sim-console-header">Salida equivalente en consola</div>
        <div className="sim-console-body">
          <div className={`log-${error ? "error" : "result"}`}>
            {error ? error : salida === undefined ? "undefined" : salida}
          </div>
        </div>
      </div>
    </div>
  );
}

function SimuladorParse() {
  const [texto, setTexto] = useState(PRESETS_PARSE.objeto.texto);
  const [reviver, setReviver] = useState(false);
  const [resultado, setResultado] = useState(null);

  const ejecutar = () => {
    try {
      const fn = reviver
        ? (clave, valor) => (clave === "edad" ? valor + 1 : valor)
        : undefined;
      const valor = JSON.parse(texto, fn);
      setResultado({ ok: true, valor, tipo: Array.isArray(valor) ? "array" : typeof valor });
    } catch (err) {
      setResultado({ ok: false, error: `${err.name}: ${err.message}` });
    }
  };

  const codigo = reviver
    ? `const persona = JSON.parse(texto, (clave, valor) => {
  if (clave === "edad") return valor + 1;
  return valor;
});`
    : `const valor = JSON.parse(texto);`;

  return (
    <div className="sim-container sjs-sim">
      <div className="sim-header">
        <h3>
          📥 Simulador interactivo: <code>JSON.parse()</code>
        </h3>
        <p className="sjs-intro">
          Escribe un texto JSON y ejecuta el parseo. Prueba también los ejemplos
          inválidos para ver el <code>SyntaxError</code> y usa el{" "}
          <code>reviver</code> para transformar valores. 🔓
        </p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">Texto JSON de entrada</div>

        <div className="sjs-toolbar">
          {Object.entries(PRESETS_PARSE).map(([id, item]) => (
            <button
              key={id}
              type="button"
              className="sjs-btn"
              onClick={() => {
                setTexto(item.texto);
                setResultado(null);
              }}
            >
              {item.label}
            </button>
          ))}
        </div>

        <label className="sjs-field">
          <span>textoJSON</span>
          <textarea
            className="sjs-textarea"
            value={texto}
            onChange={(e) => {
              setTexto(e.target.value);
              setResultado(null);
            }}
            spellCheck={false}
          />
        </label>

        <div className="sjs-toolbar" style={{ marginTop: 12 }}>
          <label className="sjs-check">
            <input
              type="checkbox"
              checked={reviver}
              onChange={(e) => {
                setReviver(e.target.checked);
                setResultado(null);
              }}
            />
            <span>Activar reviver (edad + 1)</span>
          </label>

          <button type="button" className="sjs-btn sjs-btn--primary" onClick={ejecutar}>
            ▶ Ejecutar JSON.parse()
          </button>

          <button
            type="button"
            className="sjs-btn"
            onClick={() => {
              setTexto(PRESETS_PARSE.objeto.texto);
              setReviver(false);
              setResultado(null);
            }}
          >
            🔄 Reset
          </button>
        </div>

        <div className="sjs-grid-2">
          <div className="sjs-card">
            <div className="sjs-card__label">🧾 Código equivalente</div>
            <CodeBlock code={codigo} />
          </div>

          <div className="sjs-card">
            <div className="sjs-card__label">
              <span>📥 Resultado</span>
              {resultado?.ok && <span className="sjs-tag sjs-tag--ok">{resultado.tipo}</span>}
              {resultado && !resultado.ok && (
                <span className="sjs-tag sjs-tag--bad">SyntaxError</span>
              )}
            </div>

            {!resultado && (
              <div className="sjs-output sjs-output--muted">
                Pulsa «Ejecutar JSON.parse()» para convertir el texto en un valor
                de JavaScript.
              </div>
            )}

            {resultado?.ok && (
              <>
                <div className="sjs-output sjs-output--ok">
                  {JSON.stringify(resultado.valor, null, 2)}
                </div>
                <div className="sjs-tags">
                  <span className="sjs-tag sjs-tag--ok">JSON válido</span>
                  <span className="sjs-tag">tipo: {resultado.tipo}</span>
                  {reviver && <span className="sjs-tag sjs-tag--info">reviver aplicado</span>}
                </div>
              </>
            )}

            {resultado && !resultado.ok && (
              <>
                <div className="sjs-output sjs-output--error">{resultado.error}</div>
                <div className="sjs-tags">
                  <span className="sjs-tag sjs-tag--bad">JSON inválido</span>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="sjs-note">
          💡 JSON exige <strong>comillas dobles</strong> en claves y strings. Las
          comillas simples, las claves sin comillas y las comas finales son
          inválidas.
        </div>
      </div>

      <div className="sim-console">
        <div className="sim-console-header">Consola</div>
        <div className="sim-console-body">
          {!resultado && <span className="log-system">Esperando ejecución...</span>}
          {resultado?.ok && (
            <>
              <div className="log-success">✅ JSON.parse() completado</div>
              <div className="log-result">
                {JSON.stringify(resultado.valor, null, 2)}
              </div>
            </>
          )}
          {resultado && !resultado.ok && (
            <div className="log-error">❌ {resultado.error}</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function SimuladorJSON({ metodoId }) {
  return metodoId === "json-parse" ? <SimuladorParse /> : <SimuladorStringify />;
}
