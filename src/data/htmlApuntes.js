import { HTML_ESTRUCTURA, HTML_ESTRUCTURA_DOCS } from "./htmlEstructura";
import { HTML_SEMANTICA, HTML_SEMANTICA_DOCS } from "./htmlSemantica";
import { HTML_ENCABEZADOS, HTML_ENCABEZADOS_DOCS } from "./htmlEncabezados";
import { HTML_TEXTO, HTML_TEXTO_DOCS } from "./htmlTexto";
import { HTML_ENFASIS, HTML_ENFASIS_DOCS } from "./htmlEnfasis";
import { HTML_LISTAS, HTML_LISTAS_DOCS } from "./htmlListas";
import { HTML_ENLACES, HTML_ENLACES_DOCS } from "./htmlEnlaces";
import { HTML_FORMULARIOS, HTML_FORMULARIOS_DOCS } from "./htmlFormularios";
import { HTML_MULTIMEDIA, HTML_MULTIMEDIA_DOCS } from "./htmlMultimedia";

/* Categorías que aparecen como subpestañas dentro de HTML. */
export const HTML_CATEGORIAS = [
  HTML_ESTRUCTURA,
  HTML_SEMANTICA,
  HTML_ENCABEZADOS,
  HTML_TEXTO,
  HTML_ENFASIS,
  HTML_LISTAS,
  HTML_ENLACES,
  HTML_FORMULARIOS,
  HTML_MULTIMEDIA,
];

/* Todos los apuntes de HTML, indexados por id. */
export const HTML_APUNTES = {
  ...HTML_ESTRUCTURA_DOCS,
  ...HTML_SEMANTICA_DOCS,
  ...HTML_ENCABEZADOS_DOCS,
  ...HTML_TEXTO_DOCS,
  ...HTML_ENFASIS_DOCS,
  ...HTML_LISTAS_DOCS,
  ...HTML_ENLACES_DOCS,
  ...HTML_FORMULARIOS_DOCS,
  ...HTML_MULTIMEDIA_DOCS,
};

/* id del apunte → id de su categoría (para abrir la subpestaña correcta). */
export const HTML_APUNTE_CATEGORIA = Object.fromEntries(
  HTML_CATEGORIAS.flatMap((categoria) =>
    categoria.grupos.flatMap((grupo) =>
      grupo.metodos.map((metodo) => [metodo.id, categoria.id]),
    ),
  ),
);

export const HTML_IDS = new Set(Object.keys(HTML_APUNTES));

/* Aplana los grupos de todas las categorías HTML al formato que consume
   `buildSearchIndex` ({ seccion, careerId, courseId, metodos, ... }). */
export function buildHtmlSearchGroups(
  careerId = "programacion",
  courseId = "web",
) {
  return HTML_CATEGORIAS.flatMap((categoria) =>
    categoria.grupos.map((grupo) => ({
      seccion: grupo.seccion,
      subtitulo: categoria.label,
      careerId,
      courseId,
      keywords: `${categoria.label} html etiqueta etiquetas tag tags markup`,
      metodos: grupo.metodos,
    })),
  );
}
