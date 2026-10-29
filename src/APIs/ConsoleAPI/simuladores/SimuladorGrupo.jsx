import { useState } from "react";
import CodeBlock from "../../../components/CodeBlock/CodeBlock";
import "../../../components/SimuladorFind/SimuladorFind.css";
import "./SimuladorConsola.css";

const ESCENARIOS = {
  auth: {
    label: "🔑 Autenticación de usuario",
    codigo: (omitir) => `console.group("🔑 Proceso de Autenticación");
console.log("Enviando credenciales al servidor...");
console.warn("Tiempo de respuesta de red elevado.");
console.log("Usuario autenticado con ID: #9832");
${omitir ? "// ⚠️ Falta console.groupEnd();" : "console.groupEnd();"}

console.log("Flujo fuera del grupo.");`,
    lineas: (omitir) => [
      { tipo: "group", texto: "🔑 Proceso de Autenticación", nivel: 0 },
      { tipo: "log", texto: "Enviando credenciales al servidor...", nivel: 1 },
      { tipo: "warn", texto: "Tiempo de respuesta de red elevado.", nivel: 1 },
      { tipo: "log", texto: "Usuario autenticado con ID: #9832", nivel: 1 },
      ...(omitir ? [] : [{ tipo: "groupEnd", texto: "console.groupEnd()", nivel: 0 }]),
      { tipo: "log", texto: "Flujo fuera del grupo.", nivel: omitir ? 1 : 0 },
    ],
  },
  anidado: {
    label: "🛒 Carrito con subgrupos",
    codigo: (omitir) => `console.group("🛒 Carrito de Compras");
console.log("Items agregados: 2");

console.group("📦 Detalle Producto #1");
console.log("Nombre: Laptop Pro 16");
console.log("Precio: $1500");
${omitir ? "// ⚠️ Falta el groupEnd interno" : "console.groupEnd(); // Cierra Producto #1"}

${omitir ? "// ⚠️ Falta el groupEnd externo" : "console.groupEnd(); // Cierra Carrito"}
console.log("Checkout listo.");`,
    lineas: (omitir) => [
      { tipo: "group", texto: "🛒 Carrito de Compras", nivel: 0 },
      { tipo: "log", texto: "Items agregados: 2", nivel: 1 },
      { tipo: "group", texto: "📦 Detalle Producto #1", nivel: 1 },
      { tipo: "log", texto: "Nombre: Laptop Pro 16", nivel: 2 },
      { tipo: "log", texto: "Precio: $1500", nivel: 2 },
      ...(omitir ? [] : [{ tipo: "groupEnd", texto: "console.groupEnd()", nivel: 1 }]),
      ...(omitir ? [] : [{ tipo: "groupEnd", texto: "console.groupEnd()", nivel: 0 }]),
      { tipo: "log", texto: "Checkout listo.", nivel: omitir ? 2 : 0 },
    ],
  },
  seguridad: {
    label: "🔒 Chequeo de seguridad",
    codigo: (omitir) => `console.group("🔒 Chequeo de Seguridad");
console.log("Validando token JWT...");
console.log("Permisos de administrador: OK");
${omitir ? "// ⚠️ Falta console.groupEnd();" : "console.groupEnd();"}

console.log("Este mensaje se imprime fuera del grupo.");`,
    lineas: (omitir) => [
      { tipo: "group", texto: "🔒 Chequeo de Seguridad", nivel: 0 },
      { tipo: "log", texto: "Validando token JWT...", nivel: 1 },
      { tipo: "log", texto: "Permisos de administrador: OK", nivel: 1 },
      ...(omitir ? [] : [{ tipo: "groupEnd", texto: "console.groupEnd()", nivel: 0 }]),
      { tipo: "log", texto: "Este mensaje se imprime fuera del grupo.", nivel: omitir ? 1 : 0 },
    ],
  },
};

const ICONOS = { log: "🖨️", warn: "⚠️", info: "ℹ️", error: "❌" };

const colorTipo = (tipo) =>
  tipo === "warn" ? "warn" : tipo === "error" ? "error" : "log";

function SalidaGrupo({ lineas }) {
  return (
    <div className="csim-tree">
      {lineas.map((linea, i) => {
        if (linea.tipo === "group") {
          return (
            <div key={i} className="csim-group-row" style={{ paddingLeft: linea.nivel * 18 }}>
              <span className="csim-group-row__arrow">▼</span>
              <span>{linea.texto}</span>
            </div>
          );
        }
        if (linea.tipo === "groupEnd") {
          return (
            <div key={i} className="csim-group-end" style={{ paddingLeft: linea.nivel * 18 }}>
              🔚 {linea.texto}
            </div>
          );
        }
        return (
          <div
            key={i}
            className={`csim-line csim-line--${colorTipo(linea.tipo)}`}
            style={{ paddingLeft: linea.nivel * 18 + 14 }}
          >
            <span className="csim-line__icon">{ICONOS[linea.tipo] ?? "•"}</span>
            <span>{linea.texto}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function SimuladorGrupo({ metodoId }) {
  const [escenario, setEscenario] = useState("auth");
  const [omitir, setOmitir] = useState(false);
  const [ejecutado, setEjecutado] = useState(false);

  const config = ESCENARIOS[escenario];
  const esGroupEnd = metodoId === "console-group-end";
  const lineas = config.lineas(omitir);

  return (
    <div className="sim-container csim-sim">
      <div className="sim-header">
        <h3>
          {esGroupEnd ? "🔚" : "📂"} Simulador Interactivo:{" "}
          <code>{esGroupEnd ? "console.groupEnd()" : "console.group()"}</code>
        </h3>
        <p className="csim-intro">
          {esGroupEnd
            ? "Observa cómo groupEnd() cierra el último grupo abierto y devuelve la sangría al nivel anterior. 🪜"
            : "Abre grupos, anida subgrupos y comprueba qué ocurre cuando olvidas cerrarlos. 🪆"}
        </p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">
          {esGroupEnd
            ? "console.groupEnd() · cierra el grupo más interno (LIFO)"
            : "console.group() · todo lo posterior queda con sangría"}
        </div>

        <div className="csim-controls">
          <label className="csim-field">
            <span>🎬 Escenario</span>
            <select
              className="sim-input csim-input"
              value={escenario}
              onChange={(e) => {
                setEscenario(e.target.value);
                setEjecutado(false);
              }}
            >
              {Object.entries(ESCENARIOS).map(([id, item]) => (
                <option key={id} value={id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="csim-check">
            <input
              type="checkbox"
              checked={omitir}
              onChange={(e) => {
                setOmitir(e.target.checked);
                setEjecutado(false);
              }}
            />
            <span>🙈 Olvidar console.groupEnd()</span>
          </label>
        </div>

        <div className="csim-code">
          <CodeBlock code={config.codigo(omitir)} />
        </div>

        <div className="csim-actions">
          <button
            type="button"
            className="sim-btn primary"
            onClick={() => setEjecutado(true)}
          >
            ▶ Ejecutar
          </button>
          <button
            type="button"
            className="sim-btn"
            onClick={() => {
              setOmitir(false);
              setEjecutado(false);
            }}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="csim-terminal">
        <div className="csim-term-head">
          <span>🖥️ Consola · DevTools</span>
          <span className="csim-term-tag">
            {omitir ? "grupo sin cerrar" : "grupos cerrados"}
          </span>
        </div>
        <div className="csim-term-body">
          {!ejecutado ? (
            <span className="csim-empty">
              Esperando ejecución... pulsa <strong>▶ Ejecutar</strong>. 👀
            </span>
          ) : (
            <>
              <SalidaGrupo lineas={lineas} />
              {omitir && (
                <div className="csim-note csim-note--warn" style={{ marginTop: 10 }}>
                  ⚠️ Sin <code>console.groupEnd()</code> la consola queda
                  «atrapada»: los mensajes posteriores conservan la sangría del
                  grupo.
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <div className="csim-note">
        💡 Los grupos funcionan como una <strong>pila LIFO</strong>: el primer{" "}
        <code>groupEnd()</code> siempre cierra el subgrupo más interno. Si no hay
        grupos abiertos, el comando se ignora sin lanzar errores.
      </div>
    </div>
  );
}
