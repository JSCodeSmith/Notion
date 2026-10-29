import { useState } from "react";
import CodeBlock from "../../../components/CodeBlock/CodeBlock";
import "../../../components/SimuladorFind/SimuladorFind.css";
import "./SimuladorConsola.css";

const DATASETS = {
  frutas: {
    label: "🍎 Array de frutas",
    tipo: "array",
    codigo: "const frutas = [\"Manzana\", \"Pera\", \"Uva\"];\nconsole.table(frutas);",
    columnas: ["(índice)", "Valor"],
    filas: [
      ["0", "Manzana"],
      ["1", "Pera"],
      ["2", "Uva"],
    ],
    nota: "Un array simple se muestra con una columna de índice y otra con el valor.",
  },
  usuario: {
    label: "👤 Objeto usuario",
    tipo: "objeto",
    codigo:
      "const usuario = {\n  nombre: \"Josué\",\n  edad: 17,\n  lenguaje: \"JavaScript\"\n};\nconsole.table(usuario);",
    columnas: ["(índice)", "Valor"],
    filas: [
      ["nombre", "Josué"],
      ["edad", "17"],
      ["lenguaje", "JavaScript"],
    ],
    nota: "Con un objeto, cada propiedad ocupa una fila y el valor se muestra a la derecha.",
  },
  usuarios: {
    label: "👥 Array de usuarios",
    tipo: "registros",
    codigo:
      "const usuarios = [\n  { id: 1, nombre: \"Ana\", edad: 20 },\n  { id: 2, nombre: \"Luis\", edad: 25 }\n];\nconsole.table(usuarios);",
    columnas: ["(índice)", "id", "nombre", "edad"],
    filas: [
      ["0", "1", "Ana", "20"],
      ["1", "2", "Luis", "25"],
    ],
    filtro: {
      label: "Mostrar solo nombre y edad",
      columnas: ["(índice)", "nombre", "edad"],
      codigo:
        "console.table(usuarios, [\"nombre\", \"edad\"]);",
    },
    nota: "El caso más habitual: un array de objetos se convierte en una tabla con una columna por propiedad.",
  },
  productos: {
    label: "📦 Array de productos",
    tipo: "registros",
    codigo:
      "const productos = [\n  { nombre: \"Laptop\", precio: 2500, stock: 5 },\n  { nombre: \"Mouse\", precio: 50, stock: 20 }\n];\nconsole.table(productos);",
    columnas: ["(índice)", "nombre", "precio", "stock"],
    filas: [
      ["0", "Laptop", "2500", "5"],
      ["1", "Mouse", "50", "20"],
    ],
    filtro: {
      label: "Mostrar solo nombre y precio",
      columnas: ["(índice)", "nombre", "precio"],
      codigo: "console.table(productos, [\"nombre\", \"precio\"]);",
    },
    nota: "El segundo argumento permite limitar las columnas visibles a las que realmente te interesan.",
  },
};

export default function SimuladorTable() {
  const [dataset, setDataset] = useState("usuarios");
  const [filtrar, setFiltrar] = useState(false);

  const config = DATASETS[dataset];
  const tieneFiltro = Boolean(config.filtro);
  const filtroActivo = tieneFiltro && filtrar;
  const columnas = filtroActivo ? config.filtro.columnas : config.columnas;
  const codigo = filtroActivo ? config.filtro.codigo : config.codigo;
  const filas = config.filas.map((fila) =>
    filtroActivo
      ? fila.filter((_, i) => columnas.includes(config.columnas[i]))
      : fila,
  );

  return (
    <div className="sim-container csim-sim">
      <div className="sim-header">
        <h3>
          📊 Simulador Interactivo: <code>console.table()</code>
        </h3>
        <p className="csim-intro">
          Cambia el tipo de dato y activa el filtro de columnas para ver cómo la
          consola transforma la información en una tabla. 🗂️
        </p>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">
          console.table() · arrays, objetos y arrays de objetos
        </div>

        <div className="csim-controls">
          <label className="csim-field">
            <span>🗂️ Datos</span>
            <select
              className="sim-input csim-input"
              value={dataset}
              onChange={(e) => {
                setDataset(e.target.value);
                setFiltrar(false);
              }}
            >
              {Object.entries(DATASETS).map(([id, item]) => (
                <option key={id} value={id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          {tieneFiltro && (
            <label className="csim-check">
              <input
                type="checkbox"
                checked={filtrar}
                onChange={(e) => setFiltrar(e.target.checked)}
              />
              <span>🎯 {config.filtro.label}</span>
            </label>
          )}
        </div>

        <div className="csim-code">
          <CodeBlock code={codigo} />
        </div>

        <div className="csim-actions">
          <button
            type="button"
            className="sim-btn"
            onClick={() => {
              setDataset("usuarios");
              setFiltrar(false);
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
            {filas.length} {filas.length === 1 ? "fila" : "filas"} ·{" "}
            {columnas.length} columnas
          </span>
        </div>
        <div className="csim-term-body">
          <div className="csim-table-wrap">
            <table className="csim-table">
              <thead>
                <tr>
                  {columnas.map((col, i) => (
                    <th key={col} className={i === 0 ? "csim-index" : undefined}>
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filas.map((fila, i) => (
                  <tr key={i}>
                    {fila.map((valor, j) => (
                      <td key={j} className={j === 0 ? "csim-index" : undefined}>
                        {valor}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="csim-note" style={{ marginTop: 12 }}>
            💡 {config.nota} Recuerda que <code>console.table()</code> devuelve{" "}
            <code>undefined</code> y no modifica los datos originales.
          </div>
        </div>
      </div>
    </div>
  );
}
