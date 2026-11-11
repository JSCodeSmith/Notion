/* Simuladores de los tipos de innovación.
   Reutilizan el motor visual del simulador de aritmética. */

import { decimales, dinero, porcentaje } from "./simuladoresAritmetica";

export const SIMULADORES_INNOVACION = {
  "innovacion-incremental": {
    titulo: "Simulador · Mejora incremental",
    descripcion:
      "Aplica una mejora pequeña de forma repetida y observa cómo se acumula el resultado con el paso de las iteraciones.",
    formula: "Rendimiento final = Base × (1 + mejora)^iteraciones",
    campos: [
      { k: "base", label: "Rendimiento actual", def: 100 },
      { k: "mejora", label: "Mejora por iteración", sufijo: "%", def: 5 },
      { k: "iteraciones", label: "Iteraciones al año", def: 12 },
      { k: "inversion", label: "Inversión por iteración", prefijo: "$", def: 800 },
    ],
    calcular: ({ base, mejora, iteraciones, inversion }) => {
      const factor = Math.pow(1 + mejora / 100, Math.max(0, iteraciones));
      const final = base * factor;
      const ganancia = final - base;
      const inversionTotal = inversion * Math.max(0, iteraciones);
      const retorno = inversionTotal > 0 ? ganancia / inversionTotal : NaN;
      return {
        resultados: [
          { label: "Rendimiento final", valor: decimales(final, 1), tono: "ok" },
          { label: "Mejora acumulada", valor: `${decimales(ganancia, 1)} pts` },
          { label: "Inversión total", valor: dinero(inversionTotal) },
          { label: "Retorno por dólar invertido", valor: Number.isFinite(retorno) ? `${decimales(retorno, 2)}×` : "—" },
        ],
        aviso:
          mejora <= 0
            ? "Sin una mejora positiva no hay innovación incremental: el rendimiento se queda igual."
            : iteraciones <= 0
              ? "Necesitas al menos una iteración para acumular la mejora."
              : null,
        pasos: [
          `Rendimiento inicial: ${decimales(base, 1)}.`,
          `Factor acumulado: (1 + ${decimales(mejora)}%)^${decimales(iteraciones)} = ${decimales(factor, 4)}.`,
          `Rendimiento final = ${decimales(base, 1)} × ${decimales(factor, 4)} = ${decimales(final, 1)}.`,
          `Ganancia acumulada = ${decimales(ganancia, 1)} puntos.`,
          `Inversión total = ${dinero(inversion)} × ${decimales(iteraciones)} = ${dinero(inversionTotal)}.`,
        ],
        barra: [
          { label: "Base", valor: base, tono: "costo" },
          { label: "Mejora", valor: Math.max(0, ganancia), tono: "ganancia" },
        ],
      };
    },
  },

  "innovacion-disruptiva": {
    titulo: "Simulador · Curva disruptiva",
    descripcion:
      "Proyecta cómo un entrante más barato y sencillo mejora con los años hasta alcanzar el desempeño que el mercado masivo necesita.",
    formula: "Desempeño entrante = Inicial × (1 + mejora)^años",
    campos: [
      { k: "incumbente", label: "Desempeño del líder", def: 100 },
      { k: "entrante", label: "Desempeño inicial del entrante", def: 55 },
      { k: "mejora", label: "Mejora anual del entrante", sufijo: "%", def: 18 },
      { k: "anios", label: "Años proyectados", sufijo: "años", def: 5 },
      { k: "precioLider", label: "Precio del líder", prefijo: "$", def: 100 },
      { k: "precioEntrante", label: "Precio del entrante", prefijo: "$", def: 40 },
    ],
    calcular: ({ incumbente, entrante, mejora, anios, precioLider, precioEntrante }) => {
      const factor = Math.pow(1 + mejora / 100, Math.max(0, anios));
      const entranteFinal = entrante * factor;
      const brecha = incumbente - entranteFinal;
      const cobertura = incumbente > 0 ? (entranteFinal / incumbente) * 100 : NaN;
      const ahorro = precioLider > 0 ? ((precioLider - precioEntrante) / precioLider) * 100 : NaN;
      const riesgo =
        cobertura >= 100
          ? "Alto: el entrante ya cubre al mercado masivo."
          : cobertura >= 75
            ? "Medio: falta poco para que alcance lo suficiente."
            : "Bajo: todavía está lejos del desempeño esperado.";
      return {
        resultados: [
          { label: "Desempeño del entrante", valor: decimales(entranteFinal, 1), tono: "ok" },
          { label: "Cobertura del líder", valor: porcentaje(cobertura) },
          { label: "Ahorro para el cliente", valor: porcentaje(ahorro) },
          { label: "Riesgo de disrupción", valor: riesgo, tono: cobertura >= 75 ? "bad" : "ok" },
        ],
        aviso:
          precioEntrante >= precioLider
            ? "Si el entrante no es más barato, su entrada disruptiva pierde fuerza."
            : mejora <= 0
              ? "Sin mejora sostenida, el entrante se queda atrapado en la base del mercado."
              : null,
        pasos: [
          `Desempeño del líder: ${decimales(incumbente, 1)}.`,
          `Factor de mejora del entrante: (1 + ${decimales(mejora)}%)^${decimales(anios)} = ${decimales(factor, 4)}.`,
          `Desempeño del entrante en ${decimales(anios)} años = ${decimales(entrante, 1)} × ${decimales(factor, 4)} = ${decimales(entranteFinal, 1)}.`,
          `Brecha contra el líder = ${decimales(brecha, 1)} puntos.`,
          `Ahorro para el cliente = (${dinero(precioLider)} - ${dinero(precioEntrante)}) / ${dinero(precioLider)} = ${porcentaje(ahorro)}.`,
        ],
        barra: [
          { label: "Precio líder", valor: precioLider, tono: "costo" },
          { label: "Ahorro entrante", valor: Math.max(0, precioLider - precioEntrante), tono: "ganancia" },
        ],
      };
    },
  },

  "innovacion-radical": {
    titulo: "Simulador · Apuesta radical",
    descripcion:
      "Calcula el valor esperado de una apuesta de alto riesgo y alto impacto, comparando el escenario de éxito con el de fracaso.",
    formula: "Valor esperado = p × ingreso - (1 - p) × costo de fracaso",
    campos: [
      { k: "inversion", label: "Inversión en la apuesta", prefijo: "$", def: 1000000 },
      { k: "probabilidad", label: "Probabilidad de éxito", sufijo: "%", def: 15 },
      { k: "ingreso", label: "Ingreso potencial si funciona", prefijo: "$", def: 12000000 },
      { k: "costoFracaso", label: "Costo de fracasar", prefijo: "$", def: 300000 },
    ],
    calcular: ({ inversion, probabilidad, ingreso, costoFracaso }) => {
      const p = probabilidad / 100;
      const exito = ingreso - inversion;
      const fracaso = -costoFracaso;
      const valorEsperado = p * exito + (1 - p) * fracaso;
      const roiEsperado = inversion > 0 ? (valorEsperado / inversion) * 100 : NaN;
      return {
        resultados: [
          {
            label: "Valor esperado",
            valor: dinero(valorEsperado),
            tono: valorEsperado < 0 ? "bad" : "ok",
          },
          { label: "ROI esperado", valor: porcentaje(roiEsperado), tono: roiEsperado < 0 ? "bad" : "ok" },
          { label: "Ganancia si funciona", valor: dinero(exito) },
          { label: "Pérdida si falla", valor: dinero(costoFracaso) },
        ],
        aviso:
          probabilidad < 0 || probabilidad > 100
            ? "La probabilidad debe estar entre 0% y 100%."
            : valorEsperado < 0
              ? "El valor esperado es negativo: la apuesta no compensa el riesgo con estos supuestos."
              : null,
        pasos: [
          `Escenario de éxito: ${dinero(ingreso)} - ${dinero(inversion)} = ${dinero(exito)}.`,
          `Escenario de fracaso: -${dinero(costoFracaso)}.`,
          `Valor esperado = ${decimales(probabilidad)}% × ${dinero(exito)} + ${decimales(100 - probabilidad)}% × (${dinero(fracaso)}) = ${dinero(valorEsperado)}.`,
          `ROI esperado = (${dinero(valorEsperado)} / ${dinero(inversion)}) × 100 = ${porcentaje(roiEsperado)}.`,
        ],
        barra: [
          { label: "Inversión", valor: inversion, tono: "costo" },
          { label: "Ingreso potencial", valor: ingreso, tono: "ganancia" },
        ],
      };
    },
  },

  "innovacion-tecnologica": {
    titulo: "Simulador · Adopción tecnológica",
    descripcion:
      "Proyecta el crecimiento de usuarios de una tecnología y comprueba si el ingreso por usuario cubre su costo operativo.",
    formula: "Usuarios finales = Inicial × (1 + adopción)^meses",
    campos: [
      { k: "usuarios", label: "Usuarios iniciales", def: 1000 },
      { k: "adopcion", label: "Adopción mensual", sufijo: "%", def: 10 },
      { k: "meses", label: "Meses proyectados", sufijo: "meses", def: 12 },
      { k: "ingreso", label: "Ingreso por usuario", prefijo: "$", def: 5 },
      { k: "costo", label: "Costo por usuario", prefijo: "$", def: 2 },
    ],
    calcular: ({ usuarios, adopcion, meses, ingreso, costo }) => {
      const factor = Math.pow(1 + adopcion / 100, Math.max(0, meses));
      const usuariosFinales = usuarios * factor;
      const ingresoTotal = usuariosFinales * ingreso;
      const costoTotal = usuariosFinales * costo;
      const margen = ingresoTotal - costoTotal;
      const margenPorUsuario = ingreso - costo;
      return {
        resultados: [
          { label: "Usuarios proyectados", valor: decimales(usuariosFinales, 0), tono: "ok" },
          { label: "Ingreso mensual", valor: dinero(ingresoTotal) },
          { label: "Costo mensual", valor: dinero(costoTotal) },
          {
            label: "Margen mensual",
            valor: dinero(margen),
            tono: margen < 0 ? "bad" : "ok",
          },
          { label: "Margen por usuario", valor: dinero(margenPorUsuario) },
        ],
        aviso:
          margenPorUsuario < 0
            ? "El costo por usuario supera el ingreso: escalar la tecnología solo aumentaría la pérdida."
            : adopcion <= 0
              ? "Sin adopción positiva, la tecnología no gana usuarios."
              : null,
        pasos: [
          `Usuarios iniciales: ${decimales(usuarios, 0)}.`,
          `Factor de adopción: (1 + ${decimales(adopcion)}%)^${decimales(meses)} = ${decimales(factor, 4)}.`,
          `Usuarios proyectados = ${decimales(usuarios, 0)} × ${decimales(factor, 4)} = ${decimales(usuariosFinales, 0)}.`,
          `Ingreso mensual = ${decimales(usuariosFinales, 0)} × ${dinero(ingreso)} = ${dinero(ingresoTotal)}.`,
          `Costo mensual = ${decimales(usuariosFinales, 0)} × ${dinero(costo)} = ${dinero(costoTotal)}.`,
          `Margen mensual = ${dinero(ingresoTotal)} - ${dinero(costoTotal)} = ${dinero(margen)}.`,
        ],
        barra: [
          { label: "Costo", valor: costoTotal, tono: "costo" },
          { label: "Margen", valor: Math.max(0, margen), tono: "ganancia" },
        ],
      };
    },
  },
};
