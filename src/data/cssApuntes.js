import { CSS_BOX_MODEL, CSS_BOX_MODEL_DOCS } from "./cssBoxModel";
import {
  CSS_COLORES_FONDOS,
  CSS_COLORES_FONDOS_DOCS,
} from "./cssColoresFondos";
import {
  CSS_TEXTO_TIPOGRAFIA,
  CSS_TEXTO_TIPOGRAFIA_DOCS,
} from "./cssTextoTipografia";
import { CSS_FLEXBOX, CSS_FLEXBOX_DOCS } from "./cssFlexbox";
import {
  CSS_COMPOSICION_VISUAL,
  CSS_COMPOSICION_VISUAL_DOCS,
} from "./cssComposicionVisual";
import { CSS_TABLAS, CSS_TABLAS_DOCS } from "./cssTablas";
import {
  CSS_PSEUDOCLASES,
  CSS_PSEUDOCLASES_DOCS,
} from "./cssPseudoclases";

/* Categorías que aparecen como subpestañas dentro de Desarrollo Web. */
export const CSS_CATEGORIAS = [
  CSS_BOX_MODEL,
  CSS_COLORES_FONDOS,
  CSS_TEXTO_TIPOGRAFIA,
  CSS_FLEXBOX,
  CSS_COMPOSICION_VISUAL,
  CSS_TABLAS,
  CSS_PSEUDOCLASES,
];

/* Todos los apuntes de CSS, indexados por id. */
export const CSS_APUNTES = {
  ...CSS_BOX_MODEL_DOCS,
  ...CSS_COLORES_FONDOS_DOCS,
  ...CSS_TEXTO_TIPOGRAFIA_DOCS,
  ...CSS_FLEXBOX_DOCS,
  ...CSS_COMPOSICION_VISUAL_DOCS,
  ...CSS_TABLAS_DOCS,
  ...CSS_PSEUDOCLASES_DOCS,
};

/* id del apunte → id de su categoría (para abrir la subpestaña correcta). */
export const CSS_APUNTE_CATEGORIA = Object.fromEntries(
  CSS_CATEGORIAS.flatMap((categoria) =>
    categoria.grupos.flatMap((grupo) =>
      grupo.metodos.map((metodo) => [metodo.id, categoria.id]),
    ),
  ),
);

export const CSS_IDS = new Set(Object.keys(CSS_APUNTES));
