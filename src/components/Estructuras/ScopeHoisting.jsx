import { useEffect, useMemo, useState } from "react";
import "./Estructuras.css";

const TIPOS = [
  { tipo: "var", texto: "var · se eleva como undefined" },
  { tipo: "let", texto: "let · TDZ antes de declarar" },
  { tipo: "const", texto: "const · TDZ + sin reasignación" },
  { tipo: "function", texto: "function · se eleva completa" },
];

const nombreDeLinea = (linea) => {
  if (linea.nombre) return linea.nombre;
  const declaracion = String(linea.texto).match(
    /(?:var|let|const|function)\s+([A-Za-z_$][\w$]*)/,
  );
  if (declaracion) return declaracion[1];
  const asignacion = String(linea.texto).match(/^\s*([A-Za-z_$][\w$]*)\s*=/);
  if (asignacion) return asignacion[1];
  return String(linea.texto).trim().slice(0, 22) || "—";
};

const crearScopePorDefecto = (metodo) => {
  const codigo = metodo.sintaxis?.[0]?.code ?? "";
  const lineas = codigo
    .split("\n")
    .filter((linea) => linea.trim())
    .map((texto) => ({
      texto,
      tipo: /function/.test(texto)
        ? "function"
        : /const/.test(texto)
          ? "const"
          : /let/.test(texto)
            ? "let"
            : /var/.test(texto)
              ? "var"
              : "expresion",
      ambito: "global",
      antes: "—",
      despues: "—",
      detalle: "Línea del ejemplo. Ejecútala mentalmente para ver su efecto.",
    }));
  return {
    titulo: "Mapa de ámbito del ejemplo",
    codigo,
    lineas,
    resumen: [
      "Este esquema se genera a partir de la sintaxis del apunte. Los apuntes con laboratorio incluyen un mapa detallado por ámbito.",
    ],
  };
};

export default function ScopeHoisting({ metodo }) {
  const scope = useMemo(
    () => metodo.scope ?? crearScopePorDefecto(metodo),
    [metodo],
  );
  const [activa, setActiva] = useState(0);
  const [fase, setFase] = useState("antes");
  const lineas = scope.lineas ?? [];

  useEffect(() => {
    setActiva(0);
    setFase("antes");
  }, [metodo.id]);

  const ambitos = useMemo(() => {
    const mapa = new Map();
    lineas.forEach((linea, i) => {
      const clave = linea.ambito ?? "global";
      if (!mapa.has(clave)) mapa.set(clave, []);
      mapa.get(clave).push({ ...linea, indice: i });
    });
    return [...mapa.entries()];
  }, [lineas]);

  const lineaActiva = lineas[activa];

  const valorDe = (linea) => {
    if (linea.tipo === "function" && fase === "antes") return "ƒ función";
    const valor = fase === "antes" ? linea.antes : linea.despues;
    return valor ?? "—";
  };

  return (
    <div className="est-tool">
      <div className="est-tool__head">
        <div>
          <h4 className="est-tool__title">🪜 Visualizador de scope y hoisting</h4>
          <p className="est-tool__sub">
            Pulsa una línea para ver qué hace el motor de JavaScript <strong>antes</strong> de
            ejecutarla y <strong>después</strong> de ejecutarla. Los colores indican el tipo de
            declaración y su ámbito.
          </p>
        </div>
        <div className="scope__fase" role="group" aria-label="Fase de ejecución">
          <button
            type="button"
            className={fase === "antes" ? "is-active" : ""}
            onClick={() => setFase("antes")}
          >
            ⏳ Antes
          </button>
          <button
            type="button"
            className={fase === "despues" ? "is-active" : ""}
            onClick={() => setFase("despues")}
          >
            ⚡ Después
          </button>
        </div>
      </div>

      <div className="scope__leyenda">
        {TIPOS.map((t) => (
          <span key={t.tipo} className={`est-chip est-chip--${t.tipo}`}>
            {t.texto}
          </span>
        ))}
      </div>

      <div className="est-grid-2">
        <div className="est-panel">
          <div className="est-panel__label">
            <span>🧾 Código y ámbitos</span>
            <span className="est-chip">{lineas.length} línea(s)</span>
          </div>
          <div className="est-code est-code--click">
            {lineas.map((linea, i) => (
              <div
                key={`${linea.texto}-${i}`}
                className={`est-code__line${i === activa ? " is-active" : ""} scope__linea--${linea.tipo}`}
                onClick={() => setActiva(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActiva(i);
                  }
                }}
                role="button"
                tabIndex={0}
              >
                <span className="est-code__num">{i + 1}</span>
                <span className="est-code__text">{linea.texto}</span>
                <span className={`est-chip est-chip--${linea.tipo}`}>{linea.ambito ?? "global"}</span>
              </div>
            ))}
          </div>
          {lineaActiva && (
            <div className="scope__detalle">
              <strong>
                Línea {activa + 1} · {lineaActiva.tipo}
              </strong>
              <br />
              {lineaActiva.detalle}
              <br />
              <span style={{ color: "#9cdcfe" }}>
                {fase === "antes" ? "Antes de ejecutar" : "Después de ejecutar"}:
              </span>{" "}
              <code>{valorDe(lineaActiva)}</code>
            </div>
          )}
        </div>

        <div className="est-panel">
          <div className="est-panel__label">
            <span>🗺️ Scope map</span>
            <span className="est-chip">{ambitos.length} ámbito(s)</span>
          </div>
          <div className="scope__mapa">
            {ambitos.map(([ambito, vinculos]) => (
              <div key={ambito} className="scope__ambito">
                <strong>🌐 {ambito}</strong>
                {vinculos.map((v) => (
                  <div key={`${ambito}-${v.indice}`} className="scope__binding">
                    <code>{nombreDeLinea(v)}</code>
                    <span
                      className={`scope__valor${String(valorDe(v)).includes("TDZ") ? " scope__valor--tdz" : ""}`}
                    >
                      {valorDe(v)}
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          {scope.resumen?.length > 0 && (
            <div style={{ marginTop: 12 }}>
              {scope.resumen.map((texto, i) => (
                <p key={i} className="est-tool__sub" style={{ color: "#c6d5ea" }}>
                  💡 {texto}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
