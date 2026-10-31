import { useRef, useState } from "react";
import MarcoSimulador from "./MarcoSimulador";

const formatearBytes = (bytes) => {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
};

const crearArchivo = (contenido, nombre, tipo) =>
  new File([contenido], nombre, { type: tipo });

const SVG_DEMO = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200">
  <rect width="320" height="200" fill="#1b2735"/>
  <circle cx="90" cy="90" r="45" fill="#61afef"/>
  <text x="190" y="105" font-family="monospace" font-size="20" fill="#fff" text-anchor="middle">FileReader</text>
</svg>`;

export default function SimuladorFileReader({ metodoId }) {
  const [modo, setModo] = useState(
    metodoId === "filereader-readasdataurl" ? "dataurl" : "text",
  );
  const [archivo, setArchivo] = useState(null);
  const [resultado, setResultado] = useState(null);
  const [error, setError] = useState(null);
  const [leyendo, setLeyendo] = useState(false);
  const [progreso, setProgreso] = useState(0);
  const inputRef = useRef(null);

  const leer = (file, tipo = modo) => {
    if (!file) return;

    setArchivo(file);
    setResultado(null);
    setError(null);
    setProgreso(0);
    setLeyendo(true);

    const lector = new FileReader();

    lector.onprogress = (evento) => {
      if (evento.lengthComputable) {
        setProgreso(Math.round((evento.loaded / evento.total) * 100));
      }
    };

    lector.onload = () => {
      setResultado(lector.result);
      setLeyendo(false);
      setProgreso(100);
    };

    lector.onerror = () => {
      setError("No se pudo leer el archivo: " + (lector.error?.message ?? "error desconocido"));
      setLeyendo(false);
    };

    if (tipo === "dataurl") lector.readAsDataURL(file);
    else lector.readAsText(file, "UTF-8");
  };

  const cargarDemo = () => {
    if (modo === "dataurl") {
      leer(crearArchivo([SVG_DEMO], "demo.svg", "image/svg+xml"));
      return;
    }

    leer(
      crearArchivo(
        ['{\n  "nombre": "Josué",\n  "curso": "JavaScript",\n  "tema": "FileReader"\n}'],
        "datos.json",
        "application/json",
      ),
    );
  };

  const reiniciar = () => {
    setArchivo(null);
    setResultado(null);
    setError(null);
    setProgreso(0);
    setLeyendo(false);
    if (inputRef.current) inputRef.current.value = "";
  };

  const esImagen = archivo?.type?.startsWith("image/");

  const codigo =
    modo === "text"
      ? `const lector = new FileReader();

lector.onload = () => {
  console.log(lector.result); // texto del archivo
};

lector.readAsText(archivo, "UTF-8");`
      : `const lector = new FileReader();

lector.onload = () => {
  imagen.src = lector.result; // data:image/...;base64,...
};

lector.readAsDataURL(archivo);`;

  return (
    <MarcoSimulador
      icon="📁"
      titulo={modo === "text" ? "FileReader.readAsText()" : "FileReader.readAsDataURL()"}
      descripcion="Elige un archivo real o carga un ejemplo. La lectura es asíncrona: observa cómo el resultado aparece en reader.result al terminar el evento load."
      codigo={codigo}
      consola={
        error ? (
          <div className="log-error">❌ {error}</div>
        ) : leyendo ? (
          <div className="log-iteration">
            ⏳ Leyendo {archivo?.name}… {progreso}%
          </div>
        ) : !resultado ? (
          <span className="log-system">
            Selecciona un archivo o pulsa «Cargar ejemplo».
          </span>
        ) : (
          <>
            <div className="log-success">
              ✅ reader.onload · {archivo?.name}
            </div>
            <div className="log-iteration">
              {formatearBytes(archivo?.size ?? 0)} · {archivo?.type || "tipo desconocido"}
              {modo === "dataurl" ? " · Data URL Base64" : " · texto UTF-8"}
            </div>
            <div className="log-result">
              {modo === "dataurl"
                ? String(resultado).slice(0, 120) + "…"
                : String(resultado).slice(0, 300)}
            </div>
          </>
        )
      }
    >
      <div className="sjs-actions">
        <button
          type="button"
          className={`sjs-btn ${modo === "text" ? "sjs-btn--primary" : ""}`}
          onClick={() => {
            setModo("text");
            reiniciar();
          }}
        >
          📄 readAsText()
        </button>
        <button
          type="button"
          className={`sjs-btn ${modo === "dataurl" ? "sjs-btn--primary" : ""}`}
          onClick={() => {
            setModo("dataurl");
            reiniciar();
          }}
        >
          🖼️ readAsDataURL()
        </button>
        <button
          type="button"
          className="sjs-btn"
          onClick={() => inputRef.current?.click()}
        >
          📂 Elegir archivo
        </button>
        <input
          ref={inputRef}
          type="file"
          hidden
          accept={modo === "dataurl" ? "image/*" : ".txt,.json,.csv,.html,.xml,text/*"}
          onChange={(e) => leer(e.target.files?.[0])}
        />
        <button type="button" className="sjs-btn" onClick={cargarDemo}>
          ✨ Cargar ejemplo
        </button>
        <button type="button" className="sjs-btn" onClick={reiniciar}>
          🔄 Reset
        </button>
      </div>

      <div className="sjs-grid-2">
        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>{modo === "text" ? "📄 Texto leído" : "🖼️ Vista previa"}</span>
            {resultado && <span className="sjs-tag sjs-tag--ok">reader.result</span>}
          </div>

          {leyendo ? (
            <div className="sjs-output sjs-output--warn">
              Leyendo… {progreso}%
            </div>
          ) : !resultado ? (
            <div className="sjs-output sjs-output--muted">
              Todavía no hay resultado
            </div>
          ) : modo === "text" ? (
            <div className="sjs-output sjs-output--ok">{resultado}</div>
          ) : esImagen ? (
            <div className="sjs-preview">
              <img src={resultado} alt={archivo?.name} />
            </div>
          ) : (
            <div className="sjs-output sjs-output--ok">
              {String(resultado).slice(0, 300)}
            </div>
          )}
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">📋 Metadatos y estado</div>
          <dl className="sjs-kv">
            <dt>Archivo</dt>
            <dd>{archivo?.name || "—"}</dd>
            <dt>Tipo</dt>
            <dd>{archivo?.type || "—"}</dd>
            <dt>Tamaño</dt>
            <dd>{archivo ? formatearBytes(archivo.size) : "—"}</dd>
            <dt>Método</dt>
            <dd>{modo === "text" ? "readAsText()" : "readAsDataURL()"}</dd>
            <dt>Estado</dt>
            <dd>{leyendo ? "leyendo" : resultado ? "completado" : "sin leer"}</dd>
            <dt>Resultado</dt>
            <dd>
              {resultado
                ? String(resultado).length.toLocaleString("es-ES") +
                  " caracteres"
                : "null"}
            </dd>
          </dl>

          {modo === "dataurl" && resultado && (
            <div className="sjs-tags">
              <span className="sjs-tag sjs-tag--info">
                {String(resultado).slice(0, 40)}…
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="sjs-note">
        💡 <code>readAsText()</code> y <code>readAsDataURL()</code> devuelven{" "}
        <code>undefined</code>; el resultado llega después a{" "}
        <code>reader.result</code>. Las Data URL pesan un ~33 % más por el
        Base64: para archivos grandes usa{" "}
        <code>URL.createObjectURL()</code>.
      </div>
    </MarcoSimulador>
  );
}
