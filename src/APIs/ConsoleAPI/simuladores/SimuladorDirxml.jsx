import { useState } from "react";
import CodeBlock from "../../../components/CodeBlock/CodeBlock";
import "../../../components/SimuladorFind/SimuladorFind.css";
import "./SimuladorConsola.css";

const ELEMENTOS = {
  boton: {
    label: "🔘 Botón con span",
    codigo:
      'const miBoton = document.querySelector(".btn-guardar");\nconsole.dirxml(miBoton);',
    arbol: [
      { nivel: 0, tipo: "tag", texto: '<button class="btn-guardar" id="save-id" disabled>' },
      { nivel: 1, tipo: "tag", texto: "<span>Guardar Cambios</span>" },
      { nivel: 0, tipo: "tag", texto: "</button>" },
    ],
    descripcion: "El navegador muestra el nodo HTML como un árbol expandible.",
  },
  lista: {
    label: "📋 Lista de tareas",
    codigo:
      'const lista = document.querySelector("#tareas");\nconsole.dirxml(lista);',
    arbol: [
      { nivel: 0, tipo: "tag", texto: '<ul id="tareas" class="lista">' },
      { nivel: 1, tipo: "tag", texto: '<li class="item hecho">Comprar pan</li>' },
      { nivel: 1, tipo: "tag", texto: '<li class="item">Estudiar JavaScript</li>' },
      { nivel: 1, tipo: "tag", texto: '<li class="item">Publicar el proyecto</li>' },
      { nivel: 0, tipo: "tag", texto: "</ul>" },
    ],
    descripcion: "Ideal para auditar bloques HTML inyectados con innerHTML.",
  },
  xml: {
    label: "📄 Respuesta XML",
    codigo:
      'const xml = new DOMParser().parseFromString(\n  "<usuario><id>21</id><nombre>Satoshi</nombre></usuario>",\n  "application/xml"\n);\nconsole.dirxml(xml);',
    arbol: [
      { nivel: 0, tipo: "tag", texto: "<usuario>" },
      { nivel: 1, tipo: "tag", texto: "<id>21</id>" },
      { nivel: 1, tipo: "tag", texto: "<nombre>Satoshi</nombre>" },
      { nivel: 0, tipo: "tag", texto: "</usuario>" },
    ],
    descripcion: "Sirve para inspeccionar respuestas SOAP o XML de APIs antiguas.",
  },
  objeto: {
    label: "🧱 Objeto JavaScript común",
    codigo:
      'const usuario = { nombre: "Satoshi", id: 21 };\nconsole.dirxml(usuario);',
    arbol: [
      { nivel: 0, tipo: "plain", texto: "{ nombre: 'Satoshi', id: 21 }" },
    ],
    descripcion:
      "Si el valor no es HTML/XML, dirxml se comporta como console.log() o console.dir().",
  },
};

const COLORES = {
  tag: "csim-tree-tag",
  plain: "csim-tree-text",
};

export default function SimuladorDirxml() {
  const [elemento, setElemento] = useState("boton");
  const config = ELEMENTOS[elemento];

  return (
    <div className="sim-container csim-sim">
      <div className="sim-header">
        <h3>
          🌳 Simulador Interactivo: <code>console.dirxml()</code>
        </h3>
        <p className="csim-intro">
          Elige un elemento HTML, un XML o un objeto común y observa qué
          representación elige el navegador. 🧭
        </p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">
          console.dirxml(object) · fuerza la vista de árbol de marcado
        </div>

        <div className="csim-controls">
          <label className="csim-field">
            <span>🌳 Valor a inspeccionar</span>
            <select
              className="sim-input csim-input"
              value={elemento}
              onChange={(e) => setElemento(e.target.value)}
            >
              {Object.entries(ELEMENTOS).map(([id, item]) => (
                <option key={id} value={id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="csim-code">
          <CodeBlock code={config.codigo} />
        </div>

        <div className="csim-actions">
          <button
            type="button"
            className="sim-btn"
            onClick={() => setElemento("boton")}
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="csim-terminal">
        <div className="csim-term-head">
          <span>🖥️ Consola · DevTools</span>
          <span className="csim-term-tag">
            {elemento === "objeto" ? "objeto plano" : "árbol de nodos"}
          </span>
        </div>
        <div className="csim-term-body">
          <div className="csim-tree">
            {config.arbol.map((linea, i) => (
              <div
                key={i}
                className="csim-tree-line"
                style={{ paddingLeft: linea.nivel * 20 }}
              >
                {linea.tipo === "tag" && (
                  <>
                    <span className="csim-group-row__arrow" style={{ marginRight: 6 }}>
                      ▼
                    </span>
                    <span className={COLORES[linea.tipo]}>{linea.texto}</span>
                  </>
                )}
                {linea.tipo !== "tag" && (
                  <span className={COLORES[linea.tipo]}>{linea.texto}</span>
                )}
              </div>
            ))}
          </div>

          <div className="csim-note" style={{ marginTop: 12 }}>
            💡 {config.descripcion}
          </div>
        </div>
      </div>

      <div className="csim-note">
        🧱 Comparación rápida: <code>console.dirxml(el)</code> muestra el árbol
        de etiquetas HTML y <code>console.dir(el)</code> muestra el objeto
        JavaScript con todas sus propiedades internas.
      </div>
    </div>
  );
}
