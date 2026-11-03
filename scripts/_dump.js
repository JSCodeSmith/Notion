import { METODOS_DOCS } from "../src/data/metodosDocs.js";
import { METODOS_FECHAS_DOCS } from "../src/data/metodosFechas.js";

const listar = (nombre, docs) => {
  console.log(`\n=== ${nombre} (${Object.keys(docs).length}) ===`);
  for (const [id, doc] of Object.entries(docs)) {
    console.log(`${id}\t${doc.simulador ?? "-"}\t${doc.titulo}`);
  }
};

listar("METODOS_DOCS", METODOS_DOCS);
listar("METODOS_FECHAS_DOCS", METODOS_FECHAS_DOCS);
