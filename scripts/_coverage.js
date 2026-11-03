import { METODOS_DOCS } from "../src/data/metodosDocs.js";
import { METODOS_FECHAS_DOCS } from "../src/data/metodosFechas.js";
import {
  LIVE_EXAMPLE_IDS,
  getLiveExample,
} from "../src/components/AdvancedGame/liveExampleConfigs.js";

const docs = [
  ...Object.values(METODOS_DOCS),
  ...Object.values(METODOS_FECHAS_DOCS),
  { id: "find", titulo: "Array.prototype.find()", simulador: "true" },
];

const faltan = docs.filter((doc) => !getLiveExample(doc));
const sobran = [...LIVE_EXAMPLE_IDS].filter(
  (id) => !docs.some((doc) => doc.id === id),
);

console.log(`Docs: ${docs.length}`);
console.log(`Ejemplos vivos: ${LIVE_EXAMPLE_IDS.size}`);
console.log(`Sin ejemplo: ${faltan.map((doc) => doc.id).join(", ") || "ninguno"}`);
console.log(`Sin doc: ${sobran.join(", ") || "ninguno"}`);

const etiquetas = docs.filter((doc) => {
  const config = getLiveExample(doc);
  return config && config.etiqueta !== doc.titulo;
});

console.log(`Etiquetas distintas: ${etiquetas.length}`);
for (const doc of etiquetas) {
  console.log(`  ${doc.id}: ${getLiveExample(doc).etiqueta} ≠ ${doc.titulo}`);
}

process.exitCode = faltan.length || sobran.length ? 1 : 0;
