import { useEffect, useMemo, useRef, useState } from "react";
import CodeBlock from "../CodeBlock/CodeBlock";
import "../SimuladorFind/SimuladorFind.css";
import "./SimuladoresJS.css";

/* ---------- Marco y consola compartidos ---------- */
function Marco({ icon, titulo, descripcion, children, consola }) {
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
    </div>
  );
}

/* ---------- 1. fetch() ---------- */
const CUERPOS_FETCH = {
  200: '{\n  "id": 1,\n  "nombre": "Ana",\n  "email": "ana@ejemplo.com"\n}',
  201: '{\n  "id": 2,\n  "creado": true\n}',
  404: '{\n  "error": "Recurso no encontrado"\n}',
  500: '{\n  "error": "Error interno del servidor"\n}',
};

function SimuladorFetch() {
  const [url, setUrl] = useState("https://api.ejemplo.com/usuarios/1");
  const [metodo, setMetodo] = useState("GET");
  const [estado, setEstado] = useState("200");
  const [retraso, setRetraso] = useState(700);
  const [cuerpo, setCuerpo] = useState(CUERPOS_FETCH["200"]);
  const [cargando, setCargando] = useState(false);
  const [resultado, setResultado] = useState(null);
  const abortRef = useRef(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const cambiarEstado = (valor) => {
    setEstado(valor);
    setCuerpo(CUERPOS_FETCH[valor] ?? "");
    setResultado(null);
  };

  const ejecutar = async () => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setCargando(true);
    setResultado(null);

    try {
      await new Promise((resolver, rechazar) => {
        const timer = setTimeout(resolver, retraso);
        controller.signal.addEventListener("abort", () => {
          clearTimeout(timer);
          rechazar(new DOMException("Petición cancelada", "AbortError"));
        });
      });

      const codigo = Number(estado);
      if (codigo >= 400) {
        setResultado({
          ok: false,
          status: codigo,
          error: `HTTP ${codigo}: la promesa no se rechaza sola, hay que comprobar response.ok`,
        });
      } else {
        let datos;
        try {
          datos = JSON.parse(cuerpo);
        } catch {
          datos = cuerpo;
        }
        setResultado({ ok: true, status: codigo, datos });
      }
    } catch (err) {
      setResultado({
        abortado: true,
        error: `${err.name}: ${err.message}`,
      });
    } finally {
      setCargando(false);
    }
  };

  const codigo = `const controller = new AbortController();

const respuesta = await fetch("${url}", {
  method: "${metodo}",
  signal: controller.signal
});

if (!respuesta.ok) {
  throw new Error(\`HTTP \${respuesta.status}\`);
}

const datos = await respuesta.json();`;

  return (
    <Marco
      icon="🌐"
      titulo="fetch()"
      descripcion="Simula una petición HTTP: elige método, código de estado y retraso. Comprueba que fetch no rechaza por un 404 o un 500, y cancela con AbortController."
      consola={
        !resultado && !cargando ? (
          <span className="log-system">Esperando petición...</span>
        ) : cargando ? (
          <span className="log-iteration">⏳ Esperando respuesta de {url}...</span>
        ) : resultado.abortado ? (
          <>
            <div className="log-error">🛑 {resultado.error}</div>
            <div className="log-iteration">
              AbortController canceló la petición y la promesa se rechazó con
              AbortError.
            </div>
          </>
        ) : resultado.ok ? (
          <>
            <div className="log-success">
              ✅ {resultado.status} OK · respuesta recibida
            </div>
            <div className="log-result">
              {typeof resultado.datos === "string"
                ? resultado.datos
                : JSON.stringify(resultado.datos, null, 2)}
            </div>
          </>
        ) : (
          <>
            <div className="log-error">❌ {resultado.error}</div>
            <div className="log-iteration">
              await fetch() se resolvió igualmente: el error HTTP se detecta con
              response.ok.
            </div>
          </>
        )
      }
    >
      <div className="sjs-toolbar">
        <label className="sjs-field sjs-field--grow">
          <span>URL</span>
          <input
            className="sjs-input"
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setResultado(null);
            }}
          />
        </label>

        <label className="sjs-field">
          <span>Método</span>
          <select
            className="sjs-select"
            value={metodo}
            onChange={(e) => {
              setMetodo(e.target.value);
              setResultado(null);
            }}
          >
            <option>GET</option>
            <option>POST</option>
            <option>PUT</option>
            <option>DELETE</option>
          </select>
        </label>

        <label className="sjs-field">
          <span>Estado</span>
          <select
            className="sjs-select"
            value={estado}
            onChange={(e) => cambiarEstado(e.target.value)}
          >
            <option value="200">200 OK</option>
            <option value="201">201 Created</option>
            <option value="404">404 Not Found</option>
            <option value="500">500 Server Error</option>
          </select>
        </label>

        <label className="sjs-field">
          <span>Retraso (ms)</span>
          <input
            className="sjs-input sjs-input--short"
            type="number"
            min="100"
            step="100"
            value={retraso}
            onChange={(e) =>
              setRetraso(Math.max(100, Number(e.target.value) || 100))
            }
          />
        </label>
      </div>

      <div className="sjs-actions">
        <button
          type="button"
          className="sjs-btn sjs-btn--primary"
          onClick={ejecutar}
          disabled={cargando}
        >
          {cargando ? "⏳ Cargando..." : "▶ Enviar petición"}
        </button>
        <button
          type="button"
          className="sjs-btn sjs-btn--danger"
          onClick={() => abortRef.current?.abort()}
          disabled={!cargando}
        >
          🛑 Abortar
        </button>
        <button
          type="button"
          className="sjs-btn"
          onClick={() => {
            abortRef.current?.abort();
            setUrl("https://api.ejemplo.com/usuarios/1");
            setMetodo("GET");
            cambiarEstado("200");
            setRetraso(700);
            setResultado(null);
          }}
        >
          🔄 Reset
        </button>
      </div>

      <div className="sjs-grid-2">
        <div className="sjs-card">
          <div className="sjs-card__label">🧾 Código</div>
          <CodeBlock code={codigo} />
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>📤 Resultado</span>
            {resultado && !resultado.abortado && (
              <span
                className={`sjs-tag ${
                  resultado.ok ? "sjs-tag--ok" : "sjs-tag--bad"
                }`}
              >
                {resultado.status}
              </span>
            )}
          </div>

          {!resultado ? (
            <div className="sjs-output sjs-output--muted">
              Pulsa «Enviar petición» para simular la respuesta.
            </div>
          ) : (
            <>
              <div
                className={`sjs-output ${
                  resultado.ok
                    ? "sjs-output--ok"
                    : resultado.abortado
                      ? "sjs-output--warn"
                      : "sjs-output--error"
                }`}
              >
                {resultado.abortado
                  ? "AbortError: la petición fue cancelada"
                  : resultado.ok
                    ? JSON.stringify(resultado.datos, null, 2)
                    : resultado.error}
              </div>
              <div className="sjs-tags">
                {resultado.status && (
                  <span className="sjs-tag">
                    status: {resultado.status}
                  </span>
                )}
                {resultado.status && (
                  <span className="sjs-tag">
                    ok: {String(resultado.ok)}
                  </span>
                )}
                <span className="sjs-tag sjs-tag--info">
                  {resultado.abortado
                    ? "signal abortada"
                    : "respuesta resuelta"}
                </span>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="sjs-card" style={{ marginTop: 14 }}>
        <div className="sjs-card__label">📦 Cuerpo de la respuesta (JSON)</div>
        <textarea
          className="sjs-textarea"
          value={cuerpo}
          onChange={(e) => {
            setCuerpo(e.target.value);
            setResultado(null);
          }}
        />
      </div>

      <div className="sjs-note">
        💡 <code>fetch()</code> solo se rechaza ante fallos de red o
        cancelaciones. Un <code>404</code> o un <code>500</code> llegan como
        respuesta válida: hay que revisar <code>respuesta.ok</code>.
      </div>
    </Marco>
  );
}

/* ---------- 2. structuredClone() ---------- */
const PRESETS_CLONE = {
  anidado: {
    label: "Objeto anidado",
    nota: "La copia es profunda: modificar la copia no toca el original.",
    crear: () => ({
      usuario: { nombre: "Ana", direccion: { ciudad: "Madrid" } },
      hobbies: ["leer", "correr"],
    }),
  },
  mapset: {
    label: "Map, Set y Date",
    nota: "structuredClone conserva Map, Set, Date, RegExp y ArrayBuffer.",
    crear: () => ({
      mapa: new Map([["a", 1]]),
      conjunto: new Set([1, 2, 3]),
      fecha: new Date("2026-01-15T10:00:00Z"),
    }),
  },
  circular: {
    label: "Referencia circular",
    nota: "structuredClone soporta referencias circulares; JSON.stringify no.",
    crear: () => {
      const persona = { nombre: "Ana" };
      persona.amigo = persona;
      return persona;
    },
  },
  funcion: {
    label: "Con función (error)",
    nota: "Las funciones no se pueden clonar: se lanza DataCloneError.",
    crear: () => ({
      nombre: "Ana",
      saludar() {
        return "Hola";
      },
    }),
  },
};

function describir(valor, vistos = new WeakSet()) {
  if (valor instanceof Map) {
    const entradas = [...valor.entries()]
      .map(([k, v]) => `${JSON.stringify(k)} => ${describir(v, vistos)}`)
      .join(", ");
    return `Map(${valor.size}) { ${entradas} }`;
  }
  if (valor instanceof Set) {
    return `Set(${valor.size}) { ${[...valor]
      .map((v) => describir(v, vistos))
      .join(", ")} }`;
  }
  if (valor instanceof Date) return `Date(${valor.toISOString()})`;
  if (valor && typeof valor === "object") {
    if (vistos.has(valor)) return "[referencia circular]";
    vistos.add(valor);
    if (Array.isArray(valor)) {
      return `[${valor.map((v) => describir(v, vistos)).join(", ")}]`;
    }
    const entradas = Object.entries(valor)
      .map(([k, v]) => `${k}: ${describir(v, vistos)}`)
      .join(", ");
    return `{ ${entradas} }`;
  }
  if (typeof valor === "function") return `[función ${valor.name || "anónima"}]`;
  return JSON.stringify(valor);
}

function SimuladorStructuredClone() {
  const [preset, setPreset] = useState("anidado");
  const [par, setPar] = useState(null);
  const [error, setError] = useState(null);
  const [mutado, setMutado] = useState(false);

  const config = PRESETS_CLONE[preset];

  const ejecutar = () => {
    setError(null);
    setMutado(false);
    try {
      const original = config.crear();
      const copia = structuredClone(original);
      setPar({ original, copia });
    } catch (err) {
      setPar(null);
      setError(`${err.name}: ${err.message}`);
    }
  };

  const modificarCopia = () => {
    if (!par) return;
    const copia = structuredClone(par.copia);
    if (copia.usuario?.direccion) {
      copia.usuario.direccion.ciudad = "Barcelona";
      copia.hobbies.push("viajar");
    } else if ("nombre" in copia) {
      copia.nombre = "Copia modificada";
    } else if (copia.mapa instanceof Map) {
      copia.mapa.set("b", 2);
    }
    setPar({ original: par.original, copia });
    setMutado(true);
  };

  const codigo = `${
    {
      anidado: `const original = {
  usuario: { nombre: "Ana", direccion: { ciudad: "Madrid" } },
  hobbies: ["leer", "correr"]
};`,
      mapset: `const original = {
  mapa: new Map([["a", 1]]),
  conjunto: new Set([1, 2, 3]),
  fecha: new Date("2026-01-15T10:00:00Z")
};`,
      circular: `const original = { nombre: "Ana" };
original.amigo = original;`,
      funcion: `const original = {
  nombre: "Ana",
  saludar() { return "Hola"; }
};`,
    }[preset]
  }

const copia = structuredClone(original);

// Son objetos distintos, sin referencias compartidas
console.log(original === copia); // false`;

  return (
    <Marco
      icon="🧊"
      titulo="structuredClone()"
      descripcion="Elige un valor y crea una copia profunda real. Después modifica la copia para comprobar que el original permanece intacto."
      consola={
        error ? (
          <div className="log-error">❌ {error}</div>
        ) : !par ? (
          <span className="log-system">
            Elige un preset y pulsa «Clonar».
          </span>
        ) : (
          <>
            <div className="log-success">
              ✅ Copia creada con structuredClone()
            </div>
            <div className="log-iteration">
              original === copia → {String(par.original === par.copia)}
              {mutado ? " · copia modificada después del clonado" : ""}
            </div>
            <div className="log-result">
              {describir(par.copia)}
            </div>
          </>
        )
      }
    >
      <div className="sjs-toolbar">
        <label className="sjs-field sjs-field--grow">
          <span>Valor de origen</span>
          <select
            className="sjs-select"
            value={preset}
            onChange={(e) => {
              setPreset(e.target.value);
              setPar(null);
              setError(null);
              setMutado(false);
            }}
          >
            {Object.entries(PRESETS_CLONE).map(([id, p]) => (
              <option key={id} value={id}>
                {p.label}
              </option>
            ))}
          </select>
        </label>

        <button type="button" className="sjs-btn sjs-btn--primary" onClick={ejecutar}>
          ▶ Clonar
        </button>
        <button
          type="button"
          className="sjs-btn"
          onClick={modificarCopia}
          disabled={!par}
        >
          ✏️ Modificar la copia
        </button>
        <button
          type="button"
          className="sjs-btn"
          onClick={() => {
            setPar(null);
            setError(null);
            setMutado(false);
          }}
        >
          🔄 Reset
        </button>
      </div>

      <div className="sjs-grid-2">
        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🗂️ Original</span>
          </div>
          <div className="sjs-output">
            {par ? describir(par.original) : "Sin clonar todavía"}
          </div>
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🧊 Copia clonada</span>
            {par && (
              <span className="sjs-tag sjs-tag--ok">
                {mutado ? "modificada" : "independiente"}
              </span>
            )}
          </div>
          <div
            className={`sjs-output ${
              par ? "sjs-output--ok" : error ? "sjs-output--error" : ""
            }`}
          >
            {error
              ? error
              : par
                ? describir(par.copia)
                : "Sin clonar todavía"}
          </div>
        </div>
      </div>

      <div className="sjs-grid-2" style={{ marginTop: 14 }}>
        <div className="sjs-card">
          <div className="sjs-card__label">🧾 Código</div>
          <CodeBlock code={codigo} />
        </div>
        <div className="sjs-card">
          <div className="sjs-card__label">📌 Comportamiento</div>
          <div className="sjs-output sjs-output--warn">{config.nota}</div>
        </div>
      </div>

      <div className="sjs-note">
        💡 <code>structuredClone()</code> es la forma nativa de copia profunda.
        No clona funciones ni nodos del DOM, pero sí <code>Map</code>,{" "}
        <code>Set</code>, <code>Date</code>, <code>RegExp</code>,{" "}
        <code>ArrayBuffer</code> y referencias circulares.
      </div>
    </Marco>
  );
}

/* ---------- 3. RegExp.prototype.test() ---------- */
const PATRONES_REGEX = {
  gato: { label: "Palabra simple", patron: "gato", flags: "gi" },
  numero: { label: "Contiene un número", patron: "\\d+", flags: "g" },
  email: { label: "Validar correo", patron: "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$", flags: "" },
  vocales: { label: "Grupos y vocales", patron: "[aeiou]", flags: "gi" },
};

function SimuladorRegexp() {
  const [patron, setPatron] = useState("gato");
  const [flags, setFlags] = useState("gi");
  const [texto, setTexto] = useState(
    "El gato duerme. Otro GATO corre. Hay 3 gatos en casa.",
  );

  const analisis = useMemo(() => {
    try {
      const regex = new RegExp(patron, flags);
      const prueba = new RegExp(patron, flags).test(texto);
      const global = new RegExp(
        patron,
        flags.includes("g") ? flags : `${flags}g`,
      );
      const coincidencias = [...texto.matchAll(global)].map((m) => ({
        valor: m[0],
        indice: m.index,
      }));
      return { regex, prueba, coincidencias, error: null };
    } catch (err) {
      return { error: `${err.name}: ${err.message}` };
    }
  }, [patron, flags, texto]);

  const resaltado = useMemo(() => {
    if (!analisis.coincidencias) return texto;
    const partes = [];
    let ultimo = 0;
    analisis.coincidencias.forEach((c, i) => {
      if (c.indice > ultimo) {
        partes.push(
          <span key={`t-${i}`}>{texto.slice(ultimo, c.indice)}</span>,
        );
      }
      partes.push(
        <mark className="sjs-mark" key={`m-${i}`}>
          {c.valor || "∅"}
        </mark>,
      );
      ultimo = c.indice + c.valor.length;
    });
    partes.push(<span key="fin">{texto.slice(ultimo)}</span>);
    return partes;
  }, [analisis, texto]);

  const aplicarPreset = (id) => {
    const p = PATRONES_REGEX[id];
    setPatron(p.patron);
    setFlags(p.flags);
  };

  const codigo = `const regex = new RegExp(${JSON.stringify(patron)}, ${JSON.stringify(flags)});

const resultado = regex.test(texto);
// ${analisis.error ? "Error de sintaxis" : analisis.prueba}`;

  return (
    <Marco
      icon="🔎"
      titulo="RegExp.prototype.test()"
      descripcion="Escribe un patrón y un texto. test() devuelve true o false, mientras que matchAll() permite ver todas las coincidencias."
      consola={
        analisis.error ? (
          <div className="log-error">❌ {analisis.error}</div>
        ) : (
          <>
            <div
              className={
                analisis.prueba ? "log-success" : "log-error"
              }
            >
              {analisis.prueba ? "✅ true" : "❌ false"} ·{" "}
              {analisis.coincidencias.length} coincidencia(s)
            </div>
            {analisis.coincidencias.map((c, i) => (
              <div className="log-iteration" key={i}>
                [{i}] "{c.valor}" en la posición {c.indice}
              </div>
            ))}
          </>
        )
      }
    >
      <div className="sjs-toolbar">
        <label className="sjs-field sjs-field--grow">
          <span>Patrón</span>
          <input
            className="sjs-input"
            type="text"
            value={patron}
            onChange={(e) => setPatron(e.target.value)}
          />
        </label>
        <label className="sjs-field">
          <span>Flags</span>
          <input
            className="sjs-input sjs-input--short"
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
          />
        </label>
      </div>

      <div className="sjs-actions">
        {Object.entries(PATRONES_REGEX).map(([id, p]) => (
          <button
            key={id}
            type="button"
            className="sjs-btn"
            onClick={() => aplicarPreset(id)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <label className="sjs-field" style={{ marginBottom: 14 }}>
        <span>Texto de prueba</span>
        <textarea
          className="sjs-textarea"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      </label>

      <div className="sjs-grid-2">
        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🎯 Resultado de test()</span>
            {!analisis.error && (
              <span
                className={`sjs-tag ${
                  analisis.prueba ? "sjs-tag--ok" : "sjs-tag--bad"
                }`}
              >
                {String(analisis.prueba)}
              </span>
            )}
          </div>
          <div
            className={`sjs-output ${
              analisis.error
                ? "sjs-output--error"
                : analisis.prueba
                  ? "sjs-output--ok"
                  : "sjs-output--warn"
            }`}
          >
            {analisis.error
              ? analisis.error
              : `${analisis.prueba}\n\nCoincidencias: ${analisis.coincidencias.length}`}
          </div>
          <div className="sjs-tags">
            <span className="sjs-tag">
              regex: /{patron}/{flags}
            </span>
            {analisis.regex && (
              <span className="sjs-tag sjs-tag--info">
                fuente: {analisis.regex.source}
              </span>
            )}
          </div>
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">🧾 Código</div>
          <CodeBlock code={codigo} />
        </div>
      </div>

      <div className="sjs-card" style={{ marginTop: 14 }}>
        <div className="sjs-card__label">🖍️ Texto con coincidencias resaltadas</div>
        <div className="sjs-output">{resaltado}</div>
      </div>

      <div className="sjs-note">
        🔁 Con el flag <code>g</code>, <code>test()</code> avanza{" "}
        <code>lastIndex</code> y puede dar resultados alternos si reutilizas la
        misma instancia. Crea una expresión nueva o reinicia{" "}
        <code>lastIndex = 0</code>.
      </div>
    </Marco>
  );
}

/* ---------- 4 y 5. URL.createObjectURL / revokeObjectURL ---------- */
const SVG_DEMO = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200">
  <rect width="320" height="200" fill="#1b2735"/>
  <circle cx="90" cy="90" r="45" fill="#61afef"/>
  <text x="160" y="150" font-family="monospace" font-size="20" fill="#ffffff" text-anchor="middle">Object URL</text>
</svg>`;

const formatearBytes = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

function useObjectUrl() {
  const [url, setUrl] = useState(null);
  const [ultima, setUltima] = useState(null);
  const [meta, setMeta] = useState(null);
  const ref = useRef(null);

  const crear = (blob, nombre) => {
    if (ref.current) URL.revokeObjectURL(ref.current);
    const nueva = URL.createObjectURL(blob);
    ref.current = nueva;
    setUrl(nueva);
    setUltima(nueva);
    setMeta({ nombre, tipo: blob.type || "desconocido", tamano: blob.size });
  };

  const revocar = () => {
    if (!ref.current) return;
    URL.revokeObjectURL(ref.current);
    ref.current = null;
    setUrl(null);
  };

  useEffect(
    () => () => {
      if (ref.current) URL.revokeObjectURL(ref.current);
    },
    [],
  );

  return { url, ultima, meta, crear, revocar };
}

function SimuladorCreateObjectURL() {
  const { url, ultima, meta, crear, revocar } = useObjectUrl();
  const inputRef = useRef(null);

  const crearDemo = () => {
    const blob = new Blob([SVG_DEMO], { type: "image/svg+xml" });
    crear(blob, "demo.svg");
  };

  const crearTexto = () => {
    const blob = new Blob(["Hola desde un Blob 🚀"], {
      type: "text/plain;charset=utf-8",
    });
    crear(blob, "saludo.txt");
  };

  const subirArchivo = (e) => {
    const archivo = e.target.files?.[0];
    if (!archivo) return;
    crear(archivo, archivo.name);
  };

  return (
    <Marco
      icon="🔗"
      titulo="URL.createObjectURL()"
      descripcion="Crea una URL temporal que apunta a un Blob o File. Sirve para previsualizar imágenes, reproducir vídeos o descargar archivos sin subirlos a un servidor."
      consola={
        !url ? (
          <span className="log-system">
            Crea una Object URL para ver la vista previa.
          </span>
        ) : (
          <>
            <div className="log-success">✅ Object URL creada</div>
            <div className="log-iteration">{meta?.nombre}</div>
            <div className="log-result">{url}</div>
          </>
        )
      }
    >
      <div className="sjs-actions">
        <button type="button" className="sjs-btn sjs-btn--primary" onClick={crearDemo}>
          🖼️ Crear demo SVG
        </button>
        <button type="button" className="sjs-btn" onClick={crearTexto}>
          📄 Crear Blob de texto
        </button>
        <button
          type="button"
          className="sjs-btn"
          onClick={() => inputRef.current?.click()}
        >
          📁 Elegir archivo
        </button>
        <input
          ref={inputRef}
          type="file"
          hidden
          onChange={subirArchivo}
        />
        <button
          type="button"
          className="sjs-btn sjs-btn--danger"
          onClick={revocar}
          disabled={!url}
        >
          🧹 Revocar URL
        </button>
      </div>

      <div className="sjs-grid-2">
        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🖼️ Vista previa</span>
            {url && <span className="sjs-tag sjs-tag--ok">activa</span>}
          </div>
          <div className="sjs-preview">
            {!url ? (
              <span className="sjs-preview__empty">
                Sin Object URL activa
              </span>
            ) : meta?.tipo.startsWith("image/") ? (
              <img src={url} alt={meta.nombre} />
            ) : (
              <a className="sjs-file" href={url} target="_blank" rel="noreferrer">
                Abrir {meta?.nombre}
              </a>
            )}
          </div>
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">📋 Datos</div>
          <dl className="sjs-kv">
            <dt>URL</dt>
            <dd>{url || ultima || "—"}</dd>
            <dt>Archivo</dt>
            <dd>{meta?.nombre || "—"}</dd>
            <dt>Tipo</dt>
            <dd>{meta?.tipo || "—"}</dd>
            <dt>Tamaño</dt>
            <dd>{meta ? formatearBytes(meta.tamano) : "—"}</dd>
            <dt>Estado</dt>
            <dd>{url ? "válida" : ultima ? "revocada" : "sin crear"}</dd>
          </dl>
        </div>
      </div>

      <div className="sjs-card" style={{ marginTop: 14 }}>
        <div className="sjs-card__label">🧾 Código</div>
        <CodeBlock
          code={`const blob = new Blob([contenido], { type: "image/svg+xml" });

const url = URL.createObjectURL(blob);
imagen.src = url;

// Liberar cuando ya no se necesite
URL.revokeObjectURL(url);`}
        />
      </div>

      <div className="sjs-note">
        💡 Cada llamada a <code>createObjectURL()</code> reserva memoria hasta
        que se revoca. Las URLs empiezan por <code>blob:</code> y solo son
        válidas en el documento que las creó.
      </div>
    </Marco>
  );
}

function SimuladorRevokeObjectURL() {
  const { url, ultima, meta, crear, revocar } = useObjectUrl();
  const [revocada, setRevocada] = useState(false);

  const crearDemo = () => {
    const blob = new Blob([SVG_DEMO], { type: "image/svg+xml" });
    crear(blob, "demo.svg");
    setRevocada(false);
  };

  const revocarDemo = () => {
    setRevocada(Boolean(url));
    revocar();
  };

  return (
    <Marco
      icon="🧹"
      titulo="URL.revokeObjectURL()"
      descripcion="Libera una Object URL creada antes. Después de revocarla, la URL deja de ser válida y el navegador puede recuperar la memoria."
      consola={
        revocada ? (
          <>
            <div className="log-success">🧹 URL.revokeObjectURL(url)</div>
            <div className="log-iteration">
              La URL {ultima} ya no apunta a ningún recurso.
            </div>
          </>
        ) : url ? (
          <>
            <div className="log-success">✅ Object URL activa</div>
            <div className="log-result">{url}</div>
          </>
        ) : (
          <span className="log-system">
            Crea una URL y después revócala para ver el efecto.
          </span>
        )
      }
    >
      <div className="sjs-actions">
        <button type="button" className="sjs-btn sjs-btn--primary" onClick={crearDemo}>
          🔗 Crear Object URL
        </button>
        <button
          type="button"
          className="sjs-btn sjs-btn--danger"
          onClick={revocarDemo}
          disabled={!url}
        >
          🧹 Revocar URL
        </button>
        <button
          type="button"
          className="sjs-btn"
          onClick={() => {
            revocar();
            setRevocada(false);
          }}
          disabled={!url}
        >
          🔄 Reset
        </button>
      </div>

      <div className="sjs-grid-2">
        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🖼️ Recurso</span>
            <span
              className={`sjs-tag ${
                url
                  ? "sjs-tag--ok"
                  : revocada
                    ? "sjs-tag--bad"
                    : ""
              }`}
            >
              {url ? "accesible" : revocada ? "revocada" : "sin crear"}
            </span>
          </div>
          <div className="sjs-preview">
            {url ? (
              <img src={url} alt={meta?.nombre} />
            ) : (
              <span className="sjs-preview__empty">
                {revocada
                  ? "🚫 La URL revocada ya no carga el recurso"
                  : "Sin Object URL activa"}
              </span>
            )}
          </div>
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">📋 Estado</div>
          <dl className="sjs-kv">
            <dt>Última URL</dt>
            <dd>{ultima || "—"}</dd>
            <dt>Archivo</dt>
            <dd>{meta?.nombre || "—"}</dd>
            <dt>Tamaño</dt>
            <dd>{meta ? formatearBytes(meta.tamano) : "—"}</dd>
            <dt>Activa</dt>
            <dd>{String(Boolean(url))}</dd>
          </dl>
          <div className="sjs-tags">
            <span className="sjs-tag sjs-tag--info">
              libera memoria
            </span>
            <span className="sjs-tag">
              idempotente
            </span>
          </div>
        </div>
      </div>

      <div className="sjs-card" style={{ marginTop: 14 }}>
        <div className="sjs-card__label">🧾 Código</div>
        <CodeBlock
          code={`const url = URL.createObjectURL(blob);

// ... usar la URL ...

URL.revokeObjectURL(url);
// La URL ya no es válida`}
        />
      </div>

      <div className="sjs-note">
        💡 Revocar dos veces la misma URL no lanza error. Hazlo cuando el
        recurso ya no se use: al cerrar un modal, al cambiar de imagen o al
        terminar una descarga.
      </div>
    </Marco>
  );
}

/* ---------- 6. btoa() ---------- */
function SimuladorBtoa() {
  const [texto, setTexto] = useState("Hola mundo");
  const [utf8, setUtf8] = useState(false);

  const resultado = useMemo(() => {
    try {
      let base = texto;
      if (utf8) {
        const bytes = new TextEncoder().encode(texto);
        base = String.fromCharCode(...bytes);
      }
      return { valor: btoa(base), error: null };
    } catch (err) {
      return { valor: null, error: `${err.name}: ${err.message}` };
    }
  }, [texto, utf8]);

  return (
    <Marco
      icon="🔐"
      titulo="btoa()"
      descripcion="Codifica texto en Base64. btoa solo acepta caracteres Latin-1: activa el modo UTF-8 para acentos, emojis y otros caracteres."
      consola={
        resultado.error ? (
          <div className="log-error">❌ {resultado.error}</div>
        ) : (
          <>
            <div className="log-success">✅ Texto codificado</div>
            <div className="log-result">{resultado.valor}</div>
          </>
        )
      }
    >
      <label className="sjs-field" style={{ marginBottom: 12 }}>
        <span>Texto original</span>
        <input
          className="sjs-input"
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      </label>

      <div className="sjs-actions">
        <label className="sjs-check">
          <input
            type="checkbox"
            checked={utf8}
            onChange={(e) => setUtf8(e.target.checked)}
          />
          Codificar como UTF-8
        </label>
        <button
          type="button"
          className="sjs-btn"
          onClick={() => {
            setTexto("Hola mundo");
            setUtf8(false);
          }}
        >
          🔄 Reset
        </button>
      </div>

      <div className="sjs-grid-2">
        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>📤 Base64</span>
            {!resultado.error && (
              <span className="sjs-tag sjs-tag--ok">
                {resultado.valor.length} caracteres
              </span>
            )}
          </div>
          <div
            className={`sjs-output ${
              resultado.error ? "sjs-output--error" : "sjs-output--ok"
            }`}
          >
            {resultado.error || resultado.valor}
          </div>
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">🧾 Código</div>
          <CodeBlock
            code={
              utf8
                ? `const bytes = new TextEncoder().encode("${texto}");
const base64 = btoa(String.fromCharCode(...bytes));`
                : `const base64 = btoa("${texto}");`
            }
          />
        </div>
      </div>

      <div className="sjs-note">
        ⚠️ <code>btoa()</code> no cifra ni protege nada: solo representa bytes en
        Base64. Para datos binarios usa <code>Uint8Array</code> y{" "}
        <code>String.fromCharCode</code>.
      </div>
    </Marco>
  );
}

/* ---------- 7. atob() ---------- */
const PRESETS_ATOB = {
  simple: { label: "Texto simple", valor: "SG9sYSBtdW5kbw==", utf8: false },
  acentos: { label: "Acentos (UTF-8)", valor: "Sm9zw6k=", utf8: true },
  jwt: {
    label: "Payload JWT",
    valor: "eyJzdWIiOiIxMjMiLCJub21icmUiOiJBbmEifQ==",
    utf8: true,
  },
  invalido: { label: "Base64 inválido", valor: "no-es-base64!!", utf8: false },
};

function SimuladorAtob() {
  const [codigo, setCodigo] = useState(PRESETS_ATOB.simple.valor);
  const [utf8, setUtf8] = useState(false);

  const resultado = useMemo(() => {
    try {
      const binario = atob(codigo.trim());
      const valor = utf8
        ? new TextDecoder().decode(
            Uint8Array.from(binario, (c) => c.charCodeAt(0)),
          )
        : binario;
      return { valor, bytes: binario.length, error: null };
    } catch (err) {
      return { valor: null, bytes: 0, error: `${err.name}: ${err.message}` };
    }
  }, [codigo, utf8]);

  const aplicarPreset = (id) => {
    const p = PRESETS_ATOB[id];
    setCodigo(p.valor);
    setUtf8(p.utf8);
  };

  return (
    <Marco
      icon="🔓"
      titulo="atob()"
      descripcion="Decodifica una cadena Base64. Si el contenido original era UTF-8, activa la opción para reconstruir los caracteres con TextDecoder."
      consola={
        resultado.error ? (
          <div className="log-error">❌ {resultado.error}</div>
        ) : (
          <>
            <div className="log-success">✅ Base64 decodificado</div>
            <div className="log-iteration">
              {resultado.bytes} bytes decodificados
            </div>
            <div className="log-result">{resultado.valor}</div>
          </>
        )
      }
    >
      <label className="sjs-field" style={{ marginBottom: 12 }}>
        <span>Cadena Base64</span>
        <input
          className="sjs-input"
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
        />
      </label>

      <div className="sjs-actions">
        {Object.entries(PRESETS_ATOB).map(([id, p]) => (
          <button
            key={id}
            type="button"
            className="sjs-btn"
            onClick={() => aplicarPreset(id)}
          >
            {p.label}
          </button>
        ))}
        <label className="sjs-check">
          <input
            type="checkbox"
            checked={utf8}
            onChange={(e) => setUtf8(e.target.checked)}
          />
          Interpretar como UTF-8
        </label>
      </div>

      <div className="sjs-grid-2">
        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>📥 Texto decodificado</span>
            {!resultado.error && (
              <span className="sjs-tag sjs-tag--ok">
                {resultado.valor.length} caracteres
              </span>
            )}
          </div>
          <div
            className={`sjs-output ${
              resultado.error ? "sjs-output--error" : "sjs-output--ok"
            }`}
          >
            {resultado.error || resultado.valor}
          </div>
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">🧾 Código</div>
          <CodeBlock
            code={
              utf8
                ? `const binario = atob("${codigo}");
const bytes = Uint8Array.from(binario, (c) => c.charCodeAt(0));
const texto = new TextDecoder().decode(bytes);`
                : `const texto = atob("${codigo}");`
            }
          />
        </div>
      </div>

      <div className="sjs-note">
        ⚠️ <code>atob()</code> lanza <code>InvalidCharacterError</code> si la
        cadena no es Base64 válido. No uses Base64 como sistema de seguridad:
        cualquiera puede decodificarlo.
      </div>
    </Marco>
  );
}

/* ---------- 8. encodeURIComponent() ---------- */
const COMPONENTES = [
  "Juan Pérez",
  "a&b=c",
  "https://ejemplo.com/buscar?q=gato",
  "Calle Mayor 10, Madrid",
  "😊 emoji",
];

function SimuladorEncodeURIComponent() {
  const [texto, setTexto] = useState("Juan Pérez & amigos");

  const codificado = encodeURIComponent(texto);
  const codificadoUri = encodeURI(texto);

  return (
    <Marco
      icon="🧱"
      titulo="encodeURIComponent()"
      descripcion="Codifica un componente para meterlo en una URL. Se escapan también / ? & = #, por eso no debe usarse para codificar una URL completa."
      consola={
        <>
          <div className="log-success">✅ Componente codificado</div>
          <div className="log-result">{codificado}</div>
          <div className="log-iteration">
            Longitud: {texto.length} → {codificado.length} caracteres
          </div>
        </>
      }
    >
      <label className="sjs-field" style={{ marginBottom: 12 }}>
        <span>Texto del componente</span>
        <input
          className="sjs-input"
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      </label>

      <div className="sjs-grid-2">
        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🔗 encodeURIComponent()</span>
            <span className="sjs-tag sjs-tag--info">recomendado para valores</span>
          </div>
          <div className="sjs-output sjs-output--ok">{codificado}</div>
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🌐 encodeURI()</span>
            <span className="sjs-tag">conserva / ? & =</span>
          </div>
          <div className="sjs-output sjs-output--warn">{codificadoUri}</div>
        </div>
      </div>

      <div className="sjs-card" style={{ marginTop: 14 }}>
        <div className="sjs-card__label">📊 Comparativa</div>
        <table className="sjs-table">
          <thead>
            <tr>
              <th>Valor</th>
              <th>encodeURIComponent</th>
              <th>encodeURI</th>
            </tr>
          </thead>
          <tbody>
            {COMPONENTES.map((valor) => (
              <tr key={valor}>
                <td>{valor}</td>
                <td>{encodeURIComponent(valor)}</td>
                <td>{encodeURI(valor)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sjs-card" style={{ marginTop: 14 }}>
        <div className="sjs-card__label">🧾 Código</div>
        <CodeBlock
          code={`const nombre = "${texto}";

const url = "https://api.ejemplo.com/buscar?q=" + encodeURIComponent(nombre);
// https://api.ejemplo.com/buscar?q=${codificado}`}
        />
      </div>

      <div className="sjs-note">
        💡 Usa <code>encodeURIComponent()</code> para cada valor que va dentro de
        una query string. Usa <code>encodeURI()</code> solo para una URL
        completa, porque conserva los separadores.
      </div>
    </Marco>
  );
}

/* ---------- 9. decodeURIComponent() ---------- */
const PRESETS_DECODE = {
  simple: {
    label: "Espacios y dos puntos",
    valor: "Mi%20nombre%3A%20Jos%C3%A9%2C%20edad%3A%2025",
  },
  url: {
    label: "URL como parámetro",
    valor: "https%3A%2F%2Fejemplo.com%2Fbuscar%3Fq%3Dgato",
  },
  emoji: { label: "Emoji", valor: "Hola%20%F0%9F%98%8A" },
  malformado: { label: "Secuencia inválida", valor: "%E0%A4%A" },
};

function SimuladorDecodeURIComponent() {
  const [texto, setTexto] = useState(PRESETS_DECODE.simple.valor);

  const resultado = useMemo(() => {
    try {
      return { valor: decodeURIComponent(texto), error: null };
    } catch (err) {
      return { valor: null, error: `${err.name}: ${err.message}` };
    }
  }, [texto]);

  return (
    <Marco
      icon="🔁"
      titulo="decodeURIComponent()"
      descripcion="Revierte el porcentaje de una URL. Si la secuencia está incompleta o es inválida, lanza URIError: conviene envolverla en try/catch."
      consola={
        resultado.error ? (
          <div className="log-error">❌ {resultado.error}</div>
        ) : (
          <>
            <div className="log-success">✅ Componente decodificado</div>
            <div className="log-result">{resultado.valor}</div>
          </>
        )
      }
    >
      <label className="sjs-field" style={{ marginBottom: 12 }}>
        <span>Texto codificado</span>
        <input
          className="sjs-input"
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      </label>

      <div className="sjs-actions">
        {Object.entries(PRESETS_DECODE).map(([id, p]) => (
          <button
            key={id}
            type="button"
            className="sjs-btn"
            onClick={() => setTexto(p.valor)}
          >
            {p.label}
          </button>
        ))}
        <button
          type="button"
          className="sjs-btn"
          onClick={() => setTexto(PRESETS_DECODE.simple.valor)}
        >
          🔄 Reset
        </button>
      </div>

      <div className="sjs-grid-2">
        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>📥 Resultado</span>
            <span
              className={`sjs-tag ${
                resultado.error ? "sjs-tag--bad" : "sjs-tag--ok"
              }`}
            >
              {resultado.error ? "URIError" : "válido"}
            </span>
          </div>
          <div
            className={`sjs-output ${
              resultado.error ? "sjs-output--error" : "sjs-output--ok"
            }`}
          >
            {resultado.error || resultado.valor}
          </div>
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">🧾 Código seguro</div>
          <CodeBlock
            code={`try {
  const valor = decodeURIComponent("${texto}");
  console.log(valor);
} catch (error) {
  console.error("URI mal formada", error);
}`}
          />
        </div>
      </div>

      <div className="sjs-card" style={{ marginTop: 14 }}>
        <div className="sjs-card__label">🔎 Lectura de una query string</div>
        <CodeBlock
          code={`const params = new URLSearchParams("nombre=Jos%C3%A9&edad=25");

console.log(params.get("nombre")); // José
// URLSearchParams decodifica automáticamente`}
        />
      </div>

      <div className="sjs-note">
        💡 <code>decodeURIComponent()</code> espera recibir exactamente lo que
        devolvió <code>encodeURIComponent()</code>. Para leer query strings,
        prefiere <code>URLSearchParams</code>: ya decodifica por ti y evita
        errores manuales.
      </div>
    </Marco>
  );
}

/* ---------- Selector ---------- */
export default function SimuladorWebAPI({ metodoId }) {
  switch (metodoId) {
    case "fetch":
      return <SimuladorFetch />;
    case "structuredclone":
      return <SimuladorStructuredClone />;
    case "regexp-test":
      return <SimuladorRegexp />;
    case "url-createobjecturl":
      return <SimuladorCreateObjectURL />;
    case "url-revokeobjecturl":
      return <SimuladorRevokeObjectURL />;
    case "btoa":
      return <SimuladorBtoa />;
    case "atob":
      return <SimuladorAtob />;
    case "encodeuricomponent":
      return <SimuladorEncodeURIComponent />;
    case "decodeuricomponent":
      return <SimuladorDecodeURIComponent />;
    default:
      return <SimuladorFetch />;
  }
}
