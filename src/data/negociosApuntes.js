import { NEGOCIO_ADMIN_GESTION, NEGOCIO_ADMIN_GESTION_DOCS } from "./negocioAdminGestion";
import { NEGOCIO_ESTRATEGIA, NEGOCIO_ESTRATEGIA_DOCS } from "./negocioEstrategia";
import { NEGOCIO_EMPRENDIMIENTO, NEGOCIO_EMPRENDIMIENTO_DOCS } from "./negocioEmprendimiento";
import { NEGOCIO_INNOVACION, NEGOCIO_INNOVACION_DOCS } from "./negocioInnovacion";
import { NEGOCIO_OPERACIONES, NEGOCIO_OPERACIONES_DOCS } from "./negocioOperaciones";
import { NEGOCIO_LIDERAZGO, NEGOCIO_LIDERAZGO_DOCS } from "./negocioLiderazgo";

/* Cursos de Administración y Negocios (una pestaña por curso). */
export const NEGOCIOS_CURSOS = [
  NEGOCIO_ADMIN_GESTION,
  NEGOCIO_ESTRATEGIA,
  NEGOCIO_EMPRENDIMIENTO,
  NEGOCIO_INNOVACION,
  NEGOCIO_OPERACIONES,
  NEGOCIO_LIDERAZGO,
];

/* Todos los apuntes de negocios, indexados por id. */
export const NEGOCIOS_APUNTES = {
  ...NEGOCIO_ADMIN_GESTION_DOCS,
  ...NEGOCIO_ESTRATEGIA_DOCS,
  ...NEGOCIO_EMPRENDIMIENTO_DOCS,
  ...NEGOCIO_INNOVACION_DOCS,
  ...NEGOCIO_OPERACIONES_DOCS,
  ...NEGOCIO_LIDERAZGO_DOCS,
};

/* id del apunte → id de su curso. */
export const NEGOCIO_APUNTE_CURSO = Object.fromEntries(
  NEGOCIOS_CURSOS.flatMap((curso) =>
    curso.grupos.flatMap((grupo) =>
      grupo.metodos.map((metodo) => [metodo.id, curso.id]),
    ),
  ),
);

export const NEGOCIOS_IDS = new Set(Object.keys(NEGOCIOS_APUNTES));
