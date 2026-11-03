import { renderToString } from "react-dom/server";
import LiveExamples from "../src/components/AdvancedGame/LiveExamples.jsx";
import AdvancedGame from "../src/components/AdvancedGame/AdvancedGame.jsx";
import { METODOS_DOCS } from "../src/data/metodosDocs.js";
import { METODOS_FECHAS_DOCS } from "../src/data/metodosFechas.js";
import { ADVANCED_GAME_IDS } from "../src/components/AdvancedGame/gameConfigs.js";
import { getLiveExample } from "../src/components/AdvancedGame/liveExampleConfigs.js";

const docs = [
  ...Object.values(METODOS_DOCS),
  ...Object.values(METODOS_FECHAS_DOCS),
  { id: "find", titulo: "Array.prototype.find()", simulador: "true" },
];

const esperado = {
  array: "Tu array",
  texto: "Tu array",
  numero: "Tu lista",
  fecha: "Tu fecha",
};

const categorias = {
  isinteger: "numero",
  tofixed: "numero",
  newdate: "fecha",
  toisostring: "fecha",
  raw: "texto",
  normalize: "texto",
  findindex: "array",
  pop: "array",
};

let fallos = 0;

for (const doc of docs) {
  try {
    const html = renderToString(<LiveExamples metodo={doc} />);
    const categoria = getLiveExample(doc)?.categoria ?? "array";
    const bien =
      html.includes("Ejemplos vivos") &&
      html.includes("Worker aislado") &&
      html.includes("ejemplo.js") &&
      html.includes(esperado[categoria]) &&
      html.includes("Ejecutar ejemplo");
    if (!bien) {
      console.log(`INCOMPLETO · ${doc.id}`);
      fallos += 1;
    }
  } catch (error) {
    console.log(`FALLA · ${doc.id} · ${error.message}`);
    fallos += 1;
  }
}

for (const id of ADVANCED_GAME_IDS) {
  try {
    renderToString(<AdvancedGame metodoId={id} />);
  } catch (error) {
    console.log(`JUEGO FALLA · ${id} · ${error.message}`);
    fallos += 1;
  }
}

console.log(`\n${docs.length} ejemplos vivos SSR · ${fallos} fallos`);
process.exitCode = fallos ? 1 : 0;
