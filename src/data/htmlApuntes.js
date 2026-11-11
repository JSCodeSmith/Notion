import { HTML_ESTRUCTURA, HTML_ESTRUCTURA_DOCS } from "./htmlEstructura";
import { HTML_SEMANTICA, HTML_SEMANTICA_DOCS } from "./htmlSemantica";
import { HTML_ENCABEZADOS, HTML_ENCABEZADOS_DOCS } from "./htmlEncabezados";
import { HTML_TEXTO, HTML_TEXTO_DOCS } from "./htmlTexto";
import { HTML_ENFASIS, HTML_ENFASIS_DOCS } from "./htmlEnfasis";
import { HTML_LISTAS, HTML_LISTAS_DOCS } from "./htmlListas";
import { HTML_ENLACES, HTML_ENLACES_DOCS } from "./htmlEnlaces";
import { HTML_FORMULARIOS, HTML_FORMULARIOS_DOCS } from "./htmlFormularios";
import { HTML_MULTIMEDIA, HTML_MULTIMEDIA_DOCS } from "./htmlMultimedia";
import {
  HTML_EXTRA_CATEGORIAS,
  HTML_EXTRA_GRUPOS,
  HTML_EXTRA_DOCS,
} from "./htmlElementosExtra";

/* Categorías base que aparecen como subpestañas dentro de HTML. */
const HTML_BASE_CATEGORIAS = [
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

/* Las categorías base se amplían con los grupos nuevos (texto semántico,
   listas de descripción, controles de formulario, etc.). */
export const HTML_CATEGORIAS = [
  ...HTML_BASE_CATEGORIAS.map((categoria) => {
    const extra = HTML_EXTRA_GRUPOS[categoria.id];
    return extra
      ? { ...categoria, grupos: [...categoria.grupos, ...extra] }
      : categoria;
  }),
  ...HTML_EXTRA_CATEGORIAS,
];

/* Todos los apuntes de HTML, indexados por id. */
const HTML_APUNTES_BASE = {
  ...HTML_ESTRUCTURA_DOCS,
  ...HTML_SEMANTICA_DOCS,
  ...HTML_ENCABEZADOS_DOCS,
  ...HTML_TEXTO_DOCS,
  ...HTML_ENFASIS_DOCS,
  ...HTML_LISTAS_DOCS,
  ...HTML_ENLACES_DOCS,
  ...HTML_FORMULARIOS_DOCS,
  ...HTML_MULTIMEDIA_DOCS,
  ...HTML_EXTRA_DOCS,
};

const textoDe = (item) =>
  typeof item === "string" ? item : (item?.texto ?? "");

/* Los apuntes antiguos no traían laboratorio propio. Se les añade uno
   generado a partir de su sintaxis, su primer ejemplo y sus notas, para que
   todas las etiquetas HTML tengan simulador, laboratorio y quiz. */
function laboratorioDe(doc) {
  if (doc.laboratorio) return doc.laboratorio;

  const sintaxis = doc.sintaxis?.[0]?.code?.trim() ?? "";
  const ejemplo = doc.ejemplos?.[0]?.code?.trim() ?? "";
  const inicial =
    doc.id === "html-doctype-html"
      ? ejemplo || sintaxis || doc.firma
      : sintaxis || ejemplo || doc.firma || doc.titulo;
  const primerCaso = textoDe(doc.casos?.[0]);
  const primerError = textoDe(doc.errores?.[0]);
  const primeraNota = doc.notasPersonales?.[0] ?? "";
  const atributo = doc.sintaxis
    ?.map((s) => s.code)
    .join(" ")
    .match(/\s([a-z-]+)=/i)?.[1];

  return {
    objetivo: `Practica ${doc.titulo} en un editor real: modifica el HTML y comprueba el resultado en la vista previa.`,
    pasos: [
      `Escribe ${doc.titulo} con un contenido propio y observa cómo lo interpreta el navegador.`,
      atributo
        ? `Prueba el atributo \`${atributo}\` y comprueba qué cambia en la vista previa.`
        : "Añade un atributo o un estilo y observa cómo cambia la presentación.",
      primerError
        ? `Provoca este error controlado: ${primerError} Después corrige el código.`
        : "Cambia el contenido por un caso real y comprueba que sigue siendo válido.",
    ],
    inicial,
    solucion: ejemplo || inicial,
    reto: primerCaso
      ? `Aplica ${doc.titulo} a un caso real: ${primerCaso}`
      : `Crea un ejemplo propio de ${doc.titulo} que puedas reutilizar en una página.`,
    pista:
      primeraNota ||
      primerError ||
      "Revisa la sintaxis, ejecuta y compara el resultado con la vista previa.",
  };
}

export const HTML_APUNTES = Object.fromEntries(
  Object.entries(HTML_APUNTES_BASE).map(([id, doc]) => [
    id,
    { ...doc, laboratorio: laboratorioDe(doc) },
  ]),
);

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
