import CSSSimulador from "./CSSSimulador";

/* Cada categoría de CSS reutiliza el mismo componente: él decide qué
   simulador mostrar a partir del id del apunte. */
export const CSS_SIMULADORES = {
  "box-model": CSSSimulador,
  colores: CSSSimulador,
  flexbox: CSSSimulador,
  tablas: CSSSimulador,
  pseudoclases: CSSSimulador,
  tipografia: CSSSimulador,
  composicion: CSSSimulador,
};
