import { JS_JSON, JS_JSON_DOCS } from "./jsJson";
import {
  JS_TEMPORIZADORES,
  JS_TEMPORIZADORES_DOCS,
} from "./jsTemporizadores";
import { JS_PROMESAS, JS_PROMESAS_DOCS } from "./jsPromesas";
import { JS_WEBAPIS, JS_WEBAPIS_DOCS } from "./jsWebApis";
import { JS_HISTORY, JS_HISTORY_DOCS } from "./jsHistory";
import { JS_PERFORMANCE, JS_PERFORMANCE_DOCS } from "./jsPerformance";
import { JS_NOTIFICATIONS, JS_NOTIFICATIONS_DOCS } from "./jsNotifications";
import { JS_FILES, JS_FILES_DOCS } from "./jsFiles";
import { JS_FULLSCREEN, JS_FULLSCREEN_DOCS } from "./jsFullscreen";
import { JS_NAVEGADOR, JS_NAVEGADOR_DOCS } from "./jsNavegador";
import { JS_DOM_SELECCION, JS_DOM_SELECCION_DOCS } from "./js-dom-seleccion";
import { JS_DOM_CREACION, JS_DOM_CREACION_DOCS } from "./js-dom-creacion";
import { JS_DOM_ATRIBUTOS, JS_DOM_ATRIBUTOS_DOCS } from "./js-dom-atributos";
import { JS_DOM_NODOS, JS_DOM_NODOS_DOCS } from "./js-dom-nodos";
import {
  JS_EVENTOS_DIALOGOS,
  JS_EVENTOS_DIALOGOS_DOCS,
} from "./js-eventos-dialogos";
import { JS_MEDIA_GEO, JS_MEDIA_GEO_DOCS } from "./js-media-geo";
import { JS_MATH, JS_MATH_DOCS } from "./js-math";
import { JS_STORAGE, JS_STORAGE_DOCS } from "./js-storage";
import { JS_ESTILOS, JS_ESTILOS_DOCS } from "./js-estilos";
import { JS_VOZ, JS_VOZ_DOCS } from "./js-voz";
import { JS_MEDIOS, JS_MEDIOS_DOCS } from "./js-medios";
import { JS_RED, JS_RED_DOCS } from "./js-red";

/* Categorías que aparecen como subpestañas dentro de JavaScript. */
export const JS_CATEGORIAS = [
  JS_JSON,
  JS_TEMPORIZADORES,
  JS_PROMESAS,
  JS_WEBAPIS,
  JS_HISTORY,
  JS_PERFORMANCE,
  JS_NOTIFICATIONS,
  JS_FILES,
  JS_FULLSCREEN,
  JS_NAVEGADOR,
  JS_DOM_SELECCION,
  JS_DOM_CREACION,
  JS_DOM_ATRIBUTOS,
  JS_DOM_NODOS,
  JS_EVENTOS_DIALOGOS,
  JS_MEDIA_GEO,
  JS_MATH,
  JS_STORAGE,
  JS_ESTILOS,
  JS_VOZ,
  JS_MEDIOS,
  JS_RED,
];

/* Todos los apuntes, indexados por id. */
export const JS_APUNTES = {
  ...JS_JSON_DOCS,
  ...JS_TEMPORIZADORES_DOCS,
  ...JS_PROMESAS_DOCS,
  ...JS_WEBAPIS_DOCS,
  ...JS_HISTORY_DOCS,
  ...JS_PERFORMANCE_DOCS,
  ...JS_NOTIFICATIONS_DOCS,
  ...JS_FILES_DOCS,
  ...JS_FULLSCREEN_DOCS,
  ...JS_NAVEGADOR_DOCS,
  ...JS_DOM_SELECCION_DOCS,
  ...JS_DOM_CREACION_DOCS,
  ...JS_DOM_ATRIBUTOS_DOCS,
  ...JS_DOM_NODOS_DOCS,
  ...JS_EVENTOS_DIALOGOS_DOCS,
  ...JS_MEDIA_GEO_DOCS,
  ...JS_MATH_DOCS,
  ...JS_STORAGE_DOCS,
  ...JS_ESTILOS_DOCS,
  ...JS_VOZ_DOCS,
  ...JS_MEDIOS_DOCS,
  ...JS_RED_DOCS,
};

/* id del apunte → id de su categoría (para abrir la subpestaña correcta). */
export const JS_APUNTE_CATEGORIA = Object.fromEntries(
  JS_CATEGORIAS.flatMap((categoria) =>
    categoria.grupos.flatMap((grupo) =>
      grupo.metodos.map((metodo) => [metodo.id, categoria.id]),
    ),
  ),
);

export const JS_APUNTE_IDS = new Set(Object.keys(JS_APUNTES));
