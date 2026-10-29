import { CONSOLE_LOG } from "./consoleLog";
import {
  CONSOLE_DEBUG,
  CONSOLE_ERROR,
  CONSOLE_INFO,
  CONSOLE_WARN,
} from "./consoleMensajes";
import { CONSOLE_ASSERT, CONSOLE_CLEAR, CONSOLE_TRACE } from "./consoleUtilidades";
import { CONSOLE_COUNT, CONSOLE_COUNT_RESET } from "./consoleContadores";
import { CONSOLE_GROUP, CONSOLE_GROUP_END } from "./consoleGrupos";
import { CONSOLE_DIRXML, CONSOLE_TABLE } from "./consoleDatos";
import { CONSOLE_TIME, CONSOLE_TIME_LOG } from "./consoleTiempo";
import {
  CONSOLE_TIME_END,
  CONSOLE_TIME_STAMP,
} from "./consoleTiempoAvanzado";

const CONCEPTOS_ORDENADOS = [
  CONSOLE_LOG,
  CONSOLE_ERROR,
  CONSOLE_WARN,
  CONSOLE_INFO,
  CONSOLE_DEBUG,
  CONSOLE_ASSERT,
  CONSOLE_CLEAR,
  CONSOLE_COUNT,
  CONSOLE_COUNT_RESET,
  CONSOLE_GROUP,
  CONSOLE_GROUP_END,
  CONSOLE_TABLE,
  CONSOLE_DIRXML,
  CONSOLE_TIME,
  CONSOLE_TIME_END,
  CONSOLE_TIME_LOG,
  CONSOLE_TIME_STAMP,
  CONSOLE_TRACE,
];

const limpiarResumen = (texto = "") =>
  texto
    .replace(/\*\*/g, "")
    .replace(/`/g, "")
    .replace(/\s+/g, " ")
    .trim();

export const CONSOLE_API_DOCS = Object.fromEntries(
  CONCEPTOS_ORDENADOS.map((concepto) => [concepto.id, concepto]),
);

export const CONSOLE_API_CONCEPTOS = CONCEPTOS_ORDENADOS.map((concepto) => ({
  id: concepto.id,
  nombre: concepto.titulo,
  icon: concepto.icon,
  firma: concepto.firma,
  resumen: limpiarResumen(concepto.definicion?.[0]),
}));

export const CONSOLE_API_META = {
  id: "console-api",
  nombre: "Console API",
  icon: "🖥️",
  descripcion:
    "Herramientas nativas del objeto console para imprimir, agrupar, medir, inspeccionar y depurar código desde la terminal o el navegador.",
  conceptos: CONSOLE_API_CONCEPTOS,
};
