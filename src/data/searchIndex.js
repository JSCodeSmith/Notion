import { CARRERAS, METODOS_ARRAYS, buildSearchIndex } from "./carreras";
import * as CARR from "./carreras";
import * as JS from "./jsApuntes";
import * as CSS from "./cssApuntes";
import * as NEGOCIOS from "./negociosApuntes";
import * as HTML from "./htmlApuntes";
import * as STR from "./metodosStrings";
import * as NUM from "./metodosNumeros";
import * as FEC from "./metodosFechas";
import { buildHtmlSearchGroups } from "./htmlApuntes";
import { METODOS_STRINGS } from "./metodosStrings";
import { METODOS_NUMEROS } from "./metodosNumeros";
import { METODOS_FECHAS } from "./metodosFechas";
import { CONSOLE_API_CONCEPTOS } from "../APIs/ConsoleAPI/data";

const JS_CATEGORIAS = JS.JS_CATEGORIAS ?? [];
const CSS_CATEGORIAS = CSS.CSS_CATEGORIAS ?? [];
const NEGOCIOS_CURSOS = NEGOCIOS.NEGOCIOS_CURSOS ?? [];

const idsDe = (mod) => {
  const ids = [];
  for (const [nombre, valor] of Object.entries(mod)) {
    if (!valor) continue;
    if (/_IDS$/.test(nombre) && typeof valor[Symbol.iterator] === "function") {
      ids.push(...valor);
    } else if (/DOCS$/.test(nombre) && typeof valor === "object") {
      ids.push(...Object.keys(valor));
    }
  }
  return ids;
};

const base = { careerId: "programacion", courseId: "lenguajes" };

const METODOS_JS_ARRAYS = METODOS_ARRAYS.map((g) => ({ ...g, ...base }));
const METODOS_JS_STRINGS = METODOS_STRINGS.map((g) => ({
  ...g,
  seccion: `Strings · ${g.seccion}`,
  ...base,
}));
const METODOS_JS_NUMEROS = METODOS_NUMEROS.map((g) => ({
  ...g,
  seccion: `Números · ${g.seccion}`,
  ...base,
}));
const METODOS_JS_FECHAS = METODOS_FECHAS.map((g) => ({
  ...g,
  seccion: `Fechas · ${g.seccion}`,
  ...base,
}));

const METODOS_JS_CATEGORIAS = JS_CATEGORIAS.flatMap((cat) =>
  cat.grupos.map((g) => ({
    ...g,
    seccion: `${cat.label} · ${g.seccion}`,
    subtitulo: cat.titulo,
    ...base,
  })),
);

const METODOS_CONSOLE = [
  {
    seccion: "Console API",
    subtitulo: "APIs",
    ...base,
    metodos: CONSOLE_API_CONCEPTOS,
  },
];

const METODOS_CSS = CSS_CATEGORIAS.flatMap((cat) =>
  cat.grupos.map((g) => ({
    ...g,
    seccion: `${cat.label} · ${g.seccion}`,
    subtitulo: `${cat.titulo} · Desarrollo Web`,
    careerId: "programacion",
    courseId: "web",
    keywords: `css desarrollo web estilos ${cat.label} ${cat.id} ${g.seccion}`,
  })),
);

const METODOS_NEGOCIOS = NEGOCIOS_CURSOS.flatMap((curso) =>
  curso.grupos.map((grupo) => ({
    ...grupo,
    seccion: `${curso.label} · ${grupo.seccion}`,
    subtitulo: "Administración y Negocios",
    careerId: "administracion",
    courseId: curso.id,
    keywords: `negocios administracion empresa estrategia ${grupo.seccion}`,
  })),
);

const METODOS_HTML = buildHtmlSearchGroups("programacion", "web");

const TODOS_LOS_METODOS = [
  ...METODOS_JS_ARRAYS,
  ...METODOS_JS_STRINGS,
  ...METODOS_JS_NUMEROS,
  ...METODOS_JS_FECHAS,
  ...METODOS_JS_CATEGORIAS,
  ...METODOS_CONSOLE,
  ...METODOS_CSS,
  ...METODOS_NEGOCIOS,
  ...METODOS_HTML,
];

const DOC_IDS = new Set([
  ...idsDe(CARR),
  ...idsDe(JS),
  ...idsDe(CSS),
  ...idsDe(NEGOCIOS),
  ...idsDe(HTML),
  ...idsDe(STR),
  ...idsDe(NUM),
  ...idsDe(FEC),
]);

export const SEARCH_INDEX = buildSearchIndex(CARRERAS, {
  metodos: TODOS_LOS_METODOS,
  docIds: DOC_IDS,
});
