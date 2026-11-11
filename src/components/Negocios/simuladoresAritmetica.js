/* Utilidades y configuración de los simuladores de Aritmética.
   Se mantienen fuera del componente para separar datos de interfaz. */

export const numero = (v) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export const decimales = (n, max = 2) =>
  n.toLocaleString("es-PE", {
    minimumFractionDigits: 0,
    maximumFractionDigits: max,
  });

export const dinero = (n) =>
  Number.isFinite(n) ? `$${decimales(Math.abs(n) < 0.005 ? 0 : n)}` : "—";

export const porcentaje = (n) =>
  Number.isFinite(n) ? `${decimales(n)}%` : "—";

export const factor = (d) => 1 - numero(d) / 100;

/* ======================================================================
   Configuración de cada simulador
   ====================================================================== */

export const SIMULADORES = {
  "precio-lista": {
    titulo: "Simulador · Precio de lista",
    descripcion:
      "Suma el costo y la ganancia para obtener el precio que se publica antes de descuentos.",
    formula: "PL = PC + Ganancia",
    campos: [
      { k: "pc", label: "Precio de costo", prefijo: "$", def: 80 },
      { k: "g", label: "Ganancia deseada", prefijo: "$", def: 20 },
    ],
    calcular: ({ pc, g }) => {
      const pl = pc + g;
      const mg = pc > 0 ? (g / pc) * 100 : NaN;
      return {
        resultados: [
          { label: "Precio de lista", valor: dinero(pl), tono: "ok" },
          { label: "Ganancia", valor: dinero(g) },
          { label: "Margen sobre el costo", valor: porcentaje(mg) },
        ],
        pasos: [
          `Identifica el costo: PC = ${dinero(pc)}.`,
          `Suma la ganancia: PL = ${dinero(pc)} + ${dinero(g)} = ${dinero(pl)}.`,
          `Comprueba el margen: MG = (${decimales(g)} / ${decimales(pc)}) × 100 = ${porcentaje(mg)}.`,
        ],
        barra: [
          { label: "Costo", valor: pc, tono: "costo" },
          { label: "Ganancia", valor: g, tono: "ganancia" },
        ],
      };
    },
  },

  "precio-costo": {
    titulo: "Simulador · Precio de costo",
    descripcion:
      "Resta la ganancia al precio de lista para descubrir cuánto le costó al vendedor.",
    formula: "PC = PL - Ganancia",
    campos: [
      { k: "pl", label: "Precio de lista", prefijo: "$", def: 100 },
      { k: "g", label: "Ganancia incluida", prefijo: "$", def: 20 },
    ],
    calcular: ({ pl, g }) => {
      const pc = pl - g;
      const mg = pc > 0 ? (g / pc) * 100 : NaN;
      return {
        resultados: [
          { label: "Precio de costo", valor: dinero(pc), tono: pc < 0 ? "bad" : "ok" },
          { label: "Ganancia", valor: dinero(g) },
          { label: "Margen sobre el costo", valor: porcentaje(mg) },
        ],
        aviso:
          pc < 0
            ? "La ganancia es mayor que el precio de lista: el costo resultante es negativo."
            : null,
        pasos: [
          `Toma el precio de lista: PL = ${dinero(pl)}.`,
          `Resta la ganancia: PC = ${dinero(pl)} - ${dinero(g)} = ${dinero(pc)}.`,
          `Verifica el margen: MG = (${decimales(g)} / ${decimales(pc)}) × 100 = ${porcentaje(mg)}.`,
        ],
        barra: [
          { label: "Costo", valor: pc, tono: "costo" },
          { label: "Ganancia", valor: g, tono: "ganancia" },
        ],
      };
    },
  },

  "ganancia-perdida": {
    titulo: "Simulador · Ganancia y pérdida",
    descripcion:
      "Compara el costo con el precio de venta y descubre si la operación deja o quita dinero.",
    formula: "G = PV - PC · P = PC - PV",
    campos: [
      { k: "pc", label: "Precio de costo", prefijo: "$", def: 30 },
      { k: "pv", label: "Precio de venta", prefijo: "$", def: 50 },
    ],
    calcular: ({ pc, pv }) => {
      const diferencia = pv - pc;
      const ganancia = diferencia >= 0;
      const monto = Math.abs(diferencia);
      const mg = pc > 0 ? (diferencia / pc) * 100 : NaN;
      return {
        resultados: [
          {
            label: "Resultado",
            valor: ganancia ? `Ganancia de ${dinero(monto)}` : `Pérdida de ${dinero(monto)}`,
            tono: ganancia ? "ok" : "bad",
          },
          {
            label: "Monto",
            valor: dinero(monto),
            tono: ganancia ? "ok" : "bad",
          },
          { label: "Margen sobre el costo", valor: porcentaje(mg) },
        ],
        pasos: [
          `Compara: PV ${dinero(pv)} ${ganancia ? ">" : "<"} PC ${dinero(pc)}.`,
          ganancia
            ? `Ganancia = PV - PC = ${dinero(pv)} - ${dinero(pc)} = ${dinero(monto)}.`
            : `Pérdida = PC - PV = ${dinero(pc)} - ${dinero(pv)} = ${dinero(monto)}.`,
          `Margen sobre el costo = (${decimales(diferencia)} / ${decimales(pc)}) × 100 = ${porcentaje(mg)}.`,
        ],
        barra: [
          { label: "Costo", valor: pc, tono: "costo" },
          {
            label: ganancia ? "Ganancia" : "Pérdida",
            valor: monto,
            tono: ganancia ? "ganancia" : "perdida",
          },
        ],
      };
    },
  },

  "margen-ganancia": {
    titulo: "Simulador · Margen de ganancia",
    descripcion:
      "Convierte la ganancia en porcentaje del costo y compara el margen con el precio de venta.",
    formula: "MG = (G / PC) × 100",
    campos: [
      { k: "pc", label: "Precio de costo", prefijo: "$", def: 80 },
      { k: "g", label: "Ganancia", prefijo: "$", def: 20 },
    ],
    calcular: ({ pc, g }) => {
      const pv = pc + g;
      const mg = pc > 0 ? (g / pc) * 100 : NaN;
      const mv = pv > 0 ? (g / pv) * 100 : NaN;
      return {
        resultados: [
          { label: "Margen sobre el costo", valor: porcentaje(mg), tono: "ok" },
          { label: "Precio de venta", valor: dinero(pv) },
          { label: "Margen sobre la venta", valor: porcentaje(mv) },
        ],
        pasos: [
          `Ganancia: G = ${dinero(g)}.`,
          `Costo base: PC = ${dinero(pc)}.`,
          `Margen sobre costo: MG = (${decimales(g)} / ${decimales(pc)}) × 100 = ${porcentaje(mg)}.`,
          `Margen sobre venta: MV = (${decimales(g)} / ${decimales(pv)}) × 100 = ${porcentaje(mv)}.`,
        ],
        barra: [
          { label: "Costo", valor: pc, tono: "costo" },
          { label: "Ganancia", valor: g, tono: "ganancia" },
        ],
      };
    },
  },

  descuento: {
    titulo: "Simulador · Descuento simple",
    descripcion:
      "Calcula cuánto se rebaja del precio de lista y cuánto paga finalmente el cliente.",
    formula: "D = PL × (%D / 100) · PF = PL - D",
    campos: [
      { k: "pl", label: "Precio de lista", prefijo: "$", def: 50 },
      { k: "d", label: "Descuento", sufijo: "%", def: 20 },
    ],
    calcular: ({ pl, d }) => {
      const monto = pl * (d / 100);
      const pf = pl - monto;
      const paga = 100 - d;
      return {
        resultados: [
          { label: "Descuento", valor: dinero(monto), tono: "bad" },
          { label: "Precio final", valor: dinero(pf), tono: "ok" },
          { label: "Porcentaje que paga", valor: porcentaje(paga) },
        ],
        pasos: [
          `Precio de lista: PL = ${dinero(pl)}.`,
          `Descuento: D = ${decimales(pl)} × (${decimales(d)} / 100) = ${dinero(monto)}.`,
          `Precio final: PF = ${dinero(pl)} - ${dinero(monto)} = ${dinero(pf)}.`,
          `Factor directo: PF = ${decimales(pl)} × ${decimales(1 - d / 100, 4)} = ${dinero(pf)}.`,
        ],
        barra: [
          { label: "Precio final", valor: pf, tono: "ok" },
          { label: "Descuento", valor: monto, tono: "descuento" },
        ],
      };
    },
  },

  "descuentos-sucesivos": {
    titulo: "Simulador · Descuentos sucesivos",
    descripcion:
      "Encadena hasta tres descuentos y obtén el descuento único equivalente. No se suman: se multiplican.",
    formula: "DU = 100 - [(100-d1)(100-d2)…] / 100^(n-1)",
    campos: [
      { k: "pl", label: "Precio de lista", prefijo: "$", def: 100 },
      { k: "d1", label: "Descuento 1", sufijo: "%", def: 20 },
      { k: "d2", label: "Descuento 2", sufijo: "%", def: 10 },
      { k: "d3", label: "Descuento 3 (opcional)", sufijo: "%", def: 0 },
    ],
    calcular: ({ pl, d1, d2, d3 }) => {
      const activos = [d1, d2, d3].filter((d) => d > 0 && d < 100);
      const factores = activos.map(factor);
      const factorFinal = factores.reduce((acc, f) => acc * f, 1);
      const pf = pl * factorFinal;
      const ahorro = pl - pf;
      const du = activos.length ? (1 - factorFinal) * 100 : 0;
      return {
        resultados: [
          { label: "Descuento único", valor: porcentaje(du), tono: "ok" },
          { label: "Precio final", valor: dinero(pf), tono: "ok" },
          { label: "Ahorro total", valor: dinero(ahorro), tono: "bad" },
        ],
        aviso:
          activos.length === 0
            ? "Añade al menos un descuento mayor que 0 y menor que 100."
            : null,
        pasos: activos.length
          ? [
              `Descuentos activos: ${activos.map((d) => porcentaje(d)).join(" → ")}.`,
              `Factores: ${activos.map((d) => decimales(1 - d / 100, 4)).join(" × ")} = ${decimales(factorFinal, 6)}.`,
              `Precio final: PF = ${dinero(pl)} × ${decimales(factorFinal, 6)} = ${dinero(pf)}.`,
              `Descuento único: DU = (1 - ${decimales(factorFinal, 6)}) × 100 = ${porcentaje(du)}.`,
              `Comprobación: ${dinero(pl)} - ${dinero(pf)} = ${dinero(ahorro)} de ahorro.`,
            ]
          : ["Sin descuentos activos no hay cálculo que mostrar."],
        barra: [
          { label: "Precio final", valor: pf, tono: "ok" },
          { label: "Ahorro", valor: ahorro, tono: "descuento" },
        ],
      };
    },
  },

  "regla-tres": {
    titulo: "Simulador · Regla de tres simple",
    descripcion:
      "Con tres datos conocidos calcula el cuarto. Úsala para descuentos, cantidades y porcentajes.",
    formula: "x = (b × c) / a",
    campos: [
      { k: "a", label: "a · valor conocido", def: 5 },
      { k: "b", label: "b · resultado conocido", prefijo: "$", def: 100 },
      { k: "c", label: "c · nuevo valor", def: 8 },
    ],
    calcular: ({ a, b, c }) => {
      const x = a !== 0 ? (b * c) / a : NaN;
      return {
        resultados: [
          { label: "Resultado x", valor: dinero(x), tono: "ok" },
          {
            label: "Proporción b / a",
            valor: a !== 0 ? decimales(b / a, 4) : "—",
          },
          { label: "Equivalencia", valor: `${decimales(a)} → ${decimales(b)}` },
        ],
        aviso:
          a === 0
            ? "El valor a no puede ser 0: la división no está definida."
            : null,
        pasos: [
          `Planteo: ${decimales(a)} → ${decimales(b)}.`,
          `Nuevo valor: ${decimales(c)} → x.`,
          `Producto en cruz: x = (${decimales(b)} × ${decimales(c)}) / ${decimales(a)}.`,
          `Resultado: x = ${decimales(b * c)} / ${decimales(a)} = ${dinero(x)}.`,
        ],
      };
    },
  },

  "pv-ganancias": {
    titulo: "Simulador · Ganancia bruta y neta",
    descripcion:
      "Separa el costo directo de los gastos, impuestos e intereses para ver la ganancia real.",
    formula: "GB = PV - CD · GN = PV - (CD + GO + Imp + Int)",
    campos: [
      { k: "pv", label: "Precio de venta", prefijo: "$", def: 100 },
      { k: "cd", label: "Costo directo", prefijo: "$", def: 60 },
      { k: "go", label: "Gastos operativos", prefijo: "$", def: 20 },
      { k: "imp", label: "Impuestos", prefijo: "$", def: 5 },
      { k: "int", label: "Intereses", prefijo: "$", def: 2 },
    ],
    calcular: ({ pv, cd, go, imp, int }) => {
      const gb = pv - cd;
      const mb = pv > 0 ? (gb / pv) * 100 : NaN;
      const totalCostos = cd + go + imp + int;
      const gn = pv - totalCostos;
      const mn = pv > 0 ? (gn / pv) * 100 : NaN;
      return {
        resultados: [
          { label: "Ganancia bruta", valor: dinero(gb), tono: gb < 0 ? "bad" : "ok" },
          { label: "Margen bruto", valor: porcentaje(mb) },
          { label: "Ganancia neta", valor: dinero(gn), tono: gn < 0 ? "bad" : "ok" },
          { label: "Margen neto", valor: porcentaje(mn) },
        ],
        aviso:
          gn < 0
            ? "La ganancia neta es negativa: los costos y gastos superan el precio de venta."
            : null,
        pasos: [
          `Ganancia bruta: GB = ${dinero(pv)} - ${dinero(cd)} = ${dinero(gb)}.`,
          `Margen bruto: MB = (${decimales(gb)} / ${decimales(pv)}) × 100 = ${porcentaje(mb)}.`,
          `Costo total: ${dinero(cd)} + ${dinero(go)} + ${dinero(imp)} + ${dinero(int)} = ${dinero(totalCostos)}.`,
          `Ganancia neta: GN = ${dinero(pv)} - ${dinero(totalCostos)} = ${dinero(gn)}.`,
          `Margen neto: MN = (${decimales(gn)} / ${decimales(pv)}) × 100 = ${porcentaje(mn)}.`,
        ],
        barra: [
          { label: "Costo directo", valor: cd, tono: "costo" },
          { label: "Gastos", valor: go, tono: "gasto" },
          { label: "Impuestos", valor: imp, tono: "impuesto" },
          { label: "Intereses", valor: int, tono: "interes" },
          {
            label: gn >= 0 ? "Ganancia neta" : "Pérdida",
            valor: Math.abs(gn),
            tono: gn >= 0 ? "ganancia" : "perdida",
          },
        ],
      };
    },
  },

  "interes-compuesto": {
    titulo: "Simulador · Interés compuesto",
    descripcion:
      "Calcula el monto final cuando los intereses se reinvierten y generan nuevos intereses. Ajusta la capitalización para ver el efecto bola de nieve.",
    formula: "M = C × (1 + i/m)^(n×m) · I = M - C",
    campos: [
      { k: "c", label: "Capital inicial", prefijo: "$", def: 1000 },
      { k: "i", label: "Tasa anual", sufijo: "%", def: 10 },
      { k: "n", label: "Años", sufijo: "años", def: 5 },
      { k: "m", label: "Capitalizaciones por año", def: 1 },
    ],
    calcular: ({ c, i, n, m }) => {
      const capitalizaciones = Math.max(1, Math.round(m));
      const tasaPeriodo = i / 100 / capitalizaciones;
      const periodos = n * capitalizaciones;
      const factor = Math.pow(1 + tasaPeriodo, periodos);
      const monto = c * factor;
      const intereses = monto - c;
      const tasaEfectiva =
        (Math.pow(1 + tasaPeriodo, capitalizaciones) - 1) * 100;
      const regla72 = i > 0 ? 72 / i : NaN;

      return {
        resultados: [
          { label: "Monto final", valor: dinero(monto), tono: "ok" },
          { label: "Intereses generados", valor: dinero(intereses), tono: "ok" },
          { label: "Tasa efectiva anual", valor: porcentaje(tasaEfectiva) },
          {
            label: "Años para duplicar (regla del 72)",
            valor: Number.isFinite(regla72) ? decimales(regla72, 1) : "—",
          },
        ],
        aviso:
          c <= 0
            ? "El capital inicial debe ser mayor que cero."
            : i < 0
              ? "La tasa no puede ser negativa en este simulador."
              : n <= 0
                ? "El número de años debe ser mayor que cero."
                : null,
        pasos: [
          `Capital inicial: C = ${dinero(c)}.`,
          `Tasa por período: i/m = ${decimales(i)}% / ${capitalizaciones} = ${porcentaje(tasaPeriodo * 100)}.`,
          `Períodos totales: n × m = ${decimales(n)} × ${capitalizaciones} = ${decimales(periodos)}.`,
          `Factor de crecimiento: (1 + ${decimales(tasaPeriodo, 6)})^${decimales(periodos)} = ${decimales(factor, 6)}.`,
          `Monto final: M = ${dinero(c)} × ${decimales(factor, 6)} = ${dinero(monto)}.`,
          `Intereses: I = ${dinero(monto)} - ${dinero(c)} = ${dinero(intereses)}.`,
          `Tasa efectiva anual: (1 + ${decimales(tasaPeriodo, 6)})^${capitalizaciones} - 1 = ${porcentaje(tasaEfectiva)}.`,
        ],
        barra: [
          { label: "Capital", valor: c, tono: "costo" },
          { label: "Intereses", valor: intereses, tono: "ganancia" },
        ],
      };
    },
  },

  "caso-integrador": {
    titulo: "Simulador · Caso integrador",
    descripcion:
      "Del costo al precio de lista, del descuento al precio final y de ahí a la ganancia real.",
    formula: "PC → +Ganancia → PL → -Descuento → PF → Ganancia real",
    campos: [
      { k: "pc", label: "Precio de costo", prefijo: "$", def: 80 },
      { k: "mg", label: "Ganancia deseada", sufijo: "%", def: 25 },
      { k: "d", label: "Descuento ofrecido", sufijo: "%", def: 10 },
    ],
    calcular: ({ pc, mg, d }) => {
      const g = pc * (mg / 100);
      const pl = pc + g;
      const descuento = pl * (d / 100);
      const pf = pl - descuento;
      const greal = pf - pc;
      const mgreal = pc > 0 ? (greal / pc) * 100 : NaN;
      return {
        resultados: [
          { label: "Precio de lista", valor: dinero(pl), tono: "ok" },
          { label: "Precio final", valor: dinero(pf), tono: "ok" },
          {
            label: "Ganancia real",
            valor: dinero(greal),
            tono: greal < 0 ? "bad" : "ok",
          },
          {
            label: "Margen real",
            valor: porcentaje(mgreal),
            tono: greal < 0 ? "bad" : "ok",
          },
        ],
        aviso:
          greal < 0
            ? "El descuento es tan grande que la venta genera pérdida."
            : greal === 0
              ? "El descuento consume toda la ganancia: la venta queda en cero."
              : null,
        pasos: [
          `Ganancia deseada: G = ${dinero(pc)} × (${decimales(mg)} / 100) = ${dinero(g)}.`,
          `Precio de lista: PL = ${dinero(pc)} + ${dinero(g)} = ${dinero(pl)}.`,
          `Descuento: D = ${dinero(pl)} × (${decimales(d)} / 100) = ${dinero(descuento)}.`,
          `Precio final: PF = ${dinero(pl)} - ${dinero(descuento)} = ${dinero(pf)}.`,
          `Ganancia real: ${dinero(pf)} - ${dinero(pc)} = ${dinero(greal)}.`,
          `Margen real: (${decimales(greal)} / ${decimales(pc)}) × 100 = ${porcentaje(mgreal)}.`,
        ],
        barra: [
          { label: "Costo", valor: pc, tono: "costo" },
          {
            label: greal >= 0 ? "Ganancia real" : "Pérdida",
            valor: Math.abs(greal),
            tono: greal >= 0 ? "ganancia" : "perdida",
          },
          { label: "Descuento", valor: descuento, tono: "descuento" },
        ],
      };
    },
  },

  "ganancia": {
    titulo: "Simulador · Ganancia",
    descripcion:
      "Compara el precio de venta con el costo y mide cuánto dinero deja la operación, en monto y en porcentaje.",
    formula: "Ganancia = PV - PC · Margen sobre costo = (G / PC) × 100",
    campos: [
      { k: "pc", label: "Precio de costo", prefijo: "$", def: 80 },
      { k: "pv", label: "Precio de venta", prefijo: "$", def: 100 },
    ],
    calcular: ({ pc, pv }) => {
      const ganancia = pv - pc;
      const margenCosto = pc > 0 ? (ganancia / pc) * 100 : NaN;
      const margenVenta = pv > 0 ? (ganancia / pv) * 100 : NaN;
      return {
        resultados: [
          {
            label: "Ganancia",
            valor: dinero(ganancia),
            tono: ganancia < 0 ? "bad" : "ok",
          },
          { label: "Margen sobre el costo", valor: porcentaje(margenCosto) },
          { label: "Margen sobre la venta", valor: porcentaje(margenVenta) },
        ],
        aviso:
          ganancia < 0
            ? "El precio de venta es menor que el costo: esta operación genera pérdida, no ganancia."
            : null,
        pasos: [
          `Precio de venta: PV = ${dinero(pv)}.`,
          `Precio de costo: PC = ${dinero(pc)}.`,
          `Ganancia = ${dinero(pv)} - ${dinero(pc)} = ${dinero(ganancia)}.`,
          `Margen sobre el costo = (${decimales(ganancia)} / ${decimales(pc)}) × 100 = ${porcentaje(margenCosto)}.`,
          `Margen sobre la venta = (${decimales(ganancia)} / ${decimales(pv)}) × 100 = ${porcentaje(margenVenta)}.`,
        ],
        barra: [
          { label: "Costo", valor: pc, tono: "costo" },
          {
            label: ganancia >= 0 ? "Ganancia" : "Pérdida",
            valor: Math.abs(ganancia),
            tono: ganancia >= 0 ? "ganancia" : "perdida",
          },
        ],
      };
    },
  },

  "perdida": {
    titulo: "Simulador · Pérdida",
    descripcion:
      "Detecta cuándo el precio de venta no cubre el costo y mide el tamaño de la pérdida en dinero y en porcentaje.",
    formula: "Pérdida = PC - PV · % Pérdida = (Pérdida / PC) × 100",
    campos: [
      { k: "pc", label: "Precio de costo", prefijo: "$", def: 100 },
      { k: "pv", label: "Precio de venta", prefijo: "$", def: 80 },
    ],
    calcular: ({ pc, pv }) => {
      const perdida = pc - pv;
      const porcentajePerdida = pc > 0 ? (perdida / pc) * 100 : NaN;
      return {
        resultados: [
          {
            label: "Pérdida",
            valor: dinero(perdida),
            tono: perdida > 0 ? "bad" : "ok",
          },
          { label: "Porcentaje sobre el costo", valor: porcentaje(porcentajePerdida) },
          { label: "Precio mínimo para no perder", valor: dinero(pc) },
        ],
        aviso:
          perdida <= 0
            ? "El precio de venta cubre el costo: no hay pérdida en esta operación."
            : null,
        pasos: [
          `Precio de costo: PC = ${dinero(pc)}.`,
          `Precio de venta: PV = ${dinero(pv)}.`,
          `Pérdida = ${dinero(pc)} - ${dinero(pv)} = ${dinero(perdida)}.`,
          `Porcentaje de pérdida = (${decimales(perdida)} / ${decimales(pc)}) × 100 = ${porcentaje(porcentajePerdida)}.`,
          `Para no perder, el PV debía ser al menos ${dinero(pc)}.`,
        ],
        barra: [
          { label: "Costo", valor: pc, tono: "costo" },
          {
            label: perdida > 0 ? "Pérdida" : "Ganancia",
            valor: Math.abs(perdida),
            tono: perdida > 0 ? "perdida" : "ganancia",
          },
        ],
      };
    },
  },

  "precio-venta": {
    titulo: "Simulador · Precio de venta",
    descripcion:
      "Fija el precio de venta a partir del costo y un margen objetivo, y comprueba cuánto representa la ganancia sobre la venta.",
    formula: "PV = PC × (1 + m/100)",
    campos: [
      { k: "pc", label: "Precio de costo", prefijo: "$", def: 80 },
      { k: "m", label: "Margen deseado sobre el costo", sufijo: "%", def: 25 },
    ],
    calcular: ({ pc, m }) => {
      const g = pc * (m / 100);
      const pv = pc + g;
      const margenVenta = pv > 0 ? (g / pv) * 100 : NaN;
      return {
        resultados: [
          { label: "Precio de venta", valor: dinero(pv), tono: "ok" },
          { label: "Ganancia incluida", valor: dinero(g) },
          { label: "Margen sobre la venta", valor: porcentaje(margenVenta) },
        ],
        aviso: m < 0 ? "Un margen negativo haría que el precio de venta no cubra el costo." : null,
        pasos: [
          `Precio de costo: PC = ${dinero(pc)}.`,
          `Ganancia objetivo: G = ${dinero(pc)} × (${decimales(m)} / 100) = ${dinero(g)}.`,
          `Precio de venta: PV = ${dinero(pc)} + ${dinero(g)} = ${dinero(pv)}.`,
          `Margen sobre la venta = (${decimales(g)} / ${decimales(pv)}) × 100 = ${porcentaje(margenVenta)}.`,
        ],
        barra: [
          { label: "Costo", valor: pc, tono: "costo" },
          { label: "Ganancia", valor: g, tono: "ganancia" },
        ],
      };
    },
  },

  "ganancia-bruta": {
    titulo: "Simulador · Ganancia bruta",
    descripcion:
      "Resta el costo directo de los bienes vendidos al precio de venta y muestra la ganancia antes de gastos operativos.",
    formula: "GB = PV - COGS",
    campos: [
      { k: "pv", label: "Precio de venta", prefijo: "$", def: 100 },
      { k: "cogs", label: "Costo de ventas (COGS)", prefijo: "$", def: 60 },
    ],
    calcular: ({ pv, cogs }) => {
      const gb = pv - cogs;
      const margen = pv > 0 ? (gb / pv) * 100 : NaN;
      return {
        resultados: [
          { label: "Ganancia bruta", valor: dinero(gb), tono: gb < 0 ? "bad" : "ok" },
          { label: "Margen bruto", valor: porcentaje(margen) },
          { label: "Costo de ventas", valor: porcentaje(pv > 0 ? (cogs / pv) * 100 : NaN) },
        ],
        aviso:
          gb < 0
            ? "El costo directo supera el precio de venta: el producto pierde antes de los gastos."
            : null,
        pasos: [
          `Precio de venta: PV = ${dinero(pv)}.`,
          `Costo de ventas: COGS = ${dinero(cogs)}.`,
          `Ganancia bruta: GB = ${dinero(pv)} - ${dinero(cogs)} = ${dinero(gb)}.`,
          `Margen bruto = (${decimales(gb)} / ${decimales(pv)}) × 100 = ${porcentaje(margen)}.`,
        ],
        barra: [
          { label: "COGS", valor: cogs, tono: "costo" },
          {
            label: gb >= 0 ? "Ganancia bruta" : "Pérdida",
            valor: Math.abs(gb),
            tono: gb >= 0 ? "ganancia" : "perdida",
          },
        ],
      };
    },
  },

  "ganancia-neta": {
    titulo: "Simulador · Ganancia neta",
    descripcion:
      "Resta a la ganancia bruta los gastos operativos, impuestos e intereses para llegar al resultado final del negocio.",
    formula: "GN = PV - COGS - Gastos - Impuestos - Intereses",
    campos: [
      { k: "pv", label: "Precio de venta", prefijo: "$", def: 100 },
      { k: "cogs", label: "Costo de ventas (COGS)", prefijo: "$", def: 60 },
      { k: "gastos", label: "Gastos operativos", prefijo: "$", def: 15 },
      { k: "imp", label: "Impuestos", prefijo: "$", def: 5 },
      { k: "int", label: "Intereses", prefijo: "$", def: 2 },
    ],
    calcular: ({ pv, cogs, gastos, imp, int }) => {
      const gb = pv - cogs;
      const totalCostos = cogs + gastos + imp + int;
      const gn = pv - totalCostos;
      const margenNeto = pv > 0 ? (gn / pv) * 100 : NaN;
      const margenBruto = pv > 0 ? (gb / pv) * 100 : NaN;
      return {
        resultados: [
          { label: "Ganancia bruta", valor: dinero(gb), tono: gb < 0 ? "bad" : "ok" },
          { label: "Ganancia neta", valor: dinero(gn), tono: gn < 0 ? "bad" : "ok" },
          { label: "Margen bruto", valor: porcentaje(margenBruto) },
          { label: "Margen neto", valor: porcentaje(margenNeto) },
        ],
        aviso:
          gn < 0
            ? "La ganancia neta es negativa: los costos, gastos e intereses superan el precio de venta."
            : null,
        pasos: [
          `Ganancia bruta: GB = ${dinero(pv)} - ${dinero(cogs)} = ${dinero(gb)}.`,
          `Costo total = ${dinero(cogs)} + ${dinero(gastos)} + ${dinero(imp)} + ${dinero(int)} = ${dinero(totalCostos)}.`,
          `Ganancia neta: GN = ${dinero(pv)} - ${dinero(totalCostos)} = ${dinero(gn)}.`,
          `Margen neto = (${decimales(gn)} / ${decimales(pv)}) × 100 = ${porcentaje(margenNeto)}.`,
        ],
        barra: [
          { label: "COGS", valor: cogs, tono: "costo" },
          { label: "Gastos", valor: gastos, tono: "gasto" },
          { label: "Impuestos", valor: imp, tono: "impuesto" },
          { label: "Intereses", valor: int, tono: "interes" },
          {
            label: gn >= 0 ? "Ganancia neta" : "Pérdida",
            valor: Math.abs(gn),
            tono: gn >= 0 ? "ganancia" : "perdida",
          },
        ],
      };
    },
  },

  "margen-bruto": {
    titulo: "Simulador · Margen de ganancia bruto",
    descripcion:
      "Convierte la ganancia bruta en porcentaje de las ventas para comparar la rentabilidad antes de los gastos operativos.",
    formula: "Margen Bruto = ((PV - COGS) / PV) × 100",
    campos: [
      { k: "pv", label: "Ventas / precio de venta", prefijo: "$", def: 100 },
      { k: "cogs", label: "Costo de ventas (COGS)", prefijo: "$", def: 60 },
    ],
    calcular: ({ pv, cogs }) => {
      const gb = pv - cogs;
      const margen = pv > 0 ? (gb / pv) * 100 : NaN;
      const markup = cogs > 0 ? (gb / cogs) * 100 : NaN;
      return {
        resultados: [
          { label: "Margen bruto", valor: porcentaje(margen), tono: "ok" },
          { label: "Ganancia bruta", valor: dinero(gb) },
          { label: "Markup equivalente", valor: porcentaje(markup) },
        ],
        aviso:
          pv <= 0
            ? "Las ventas deben ser mayores que cero para calcular el margen."
            : null,
        pasos: [
          `Ventas: ${dinero(pv)}.`,
          `Ganancia bruta: GB = ${dinero(pv)} - ${dinero(cogs)} = ${dinero(gb)}.`,
          `Margen bruto = (${decimales(gb)} / ${decimales(pv)}) × 100 = ${porcentaje(margen)}.`,
          `Markup sobre el costo = (${decimales(gb)} / ${decimales(cogs)}) × 100 = ${porcentaje(markup)}.`,
        ],
        barra: [
          { label: "COGS", valor: cogs, tono: "costo" },
          { label: "Ganancia bruta", valor: gb, tono: "ganancia" },
        ],
      };
    },
  },

  "margen-operativo": {
    titulo: "Simulador · Margen operativo (EBIT)",
    descripcion:
      "Mide la rentabilidad del negocio antes de intereses e impuestos, después de cubrir los gastos operativos.",
    formula: "EBIT = PV - COGS - Gastos operativos · Margen = (EBIT / PV) × 100",
    campos: [
      { k: "pv", label: "Ventas / precio de venta", prefijo: "$", def: 100 },
      { k: "cogs", label: "Costo de ventas (COGS)", prefijo: "$", def: 60 },
      { k: "gastos", label: "Gastos operativos", prefijo: "$", def: 20 },
    ],
    calcular: ({ pv, cogs, gastos }) => {
      const gb = pv - cogs;
      const ebit = gb - gastos;
      const margen = pv > 0 ? (ebit / pv) * 100 : NaN;
      return {
        resultados: [
          { label: "EBIT", valor: dinero(ebit), tono: ebit < 0 ? "bad" : "ok" },
          { label: "Margen operativo", valor: porcentaje(margen), tono: ebit < 0 ? "bad" : "ok" },
          { label: "Ganancia bruta", valor: dinero(gb) },
        ],
        aviso:
          ebit < 0
            ? "Los gastos operativos superan la ganancia bruta: la operación no cubre su estructura."
            : null,
        pasos: [
          `Ganancia bruta: GB = ${dinero(pv)} - ${dinero(cogs)} = ${dinero(gb)}.`,
          `EBIT = ${dinero(gb)} - ${dinero(gastos)} = ${dinero(ebit)}.`,
          `Margen operativo = (${decimales(ebit)} / ${decimales(pv)}) × 100 = ${porcentaje(margen)}.`,
        ],
        barra: [
          { label: "COGS", valor: cogs, tono: "costo" },
          { label: "Gastos", valor: gastos, tono: "gasto" },
          {
            label: ebit >= 0 ? "EBIT" : "Pérdida operativa",
            valor: Math.abs(ebit),
            tono: ebit >= 0 ? "ganancia" : "perdida",
          },
        ],
      };
    },
  },

  "margen-neto": {
    titulo: "Simulador · Margen de ganancia neto",
    descripcion:
      "Calcula cuánto de cada venta queda como utilidad final después de costos, gastos, impuestos e intereses.",
    formula: "Margen Neto = (Utilidad Neta / Ventas) × 100",
    campos: [
      { k: "pv", label: "Ventas / precio de venta", prefijo: "$", def: 100 },
      { k: "cogs", label: "Costo de ventas (COGS)", prefijo: "$", def: 60 },
      { k: "gastos", label: "Gastos operativos", prefijo: "$", def: 15 },
      { k: "imp", label: "Impuestos", prefijo: "$", def: 5 },
      { k: "int", label: "Intereses", prefijo: "$", def: 2 },
    ],
    calcular: ({ pv, cogs, gastos, imp, int }) => {
      const gn = pv - cogs - gastos - imp - int;
      const margen = pv > 0 ? (gn / pv) * 100 : NaN;
      const margenOperativo = pv > 0 ? ((pv - cogs - gastos) / pv) * 100 : NaN;
      return {
        resultados: [
          { label: "Margen neto", valor: porcentaje(margen), tono: gn < 0 ? "bad" : "ok" },
          { label: "Utilidad neta", valor: dinero(gn), tono: gn < 0 ? "bad" : "ok" },
          { label: "Margen operativo", valor: porcentaje(margenOperativo) },
        ],
        aviso:
          gn < 0
            ? "La utilidad neta es negativa: el margen neto no alcanza a cubrir todos los costos."
            : null,
        pasos: [
          `Utilidad neta = ${dinero(pv)} - ${dinero(cogs)} - ${dinero(gastos)} - ${dinero(imp)} - ${dinero(int)} = ${dinero(gn)}.`,
          `Margen neto = (${decimales(gn)} / ${decimales(pv)}) × 100 = ${porcentaje(margen)}.`,
          `Margen operativo = (${decimales(pv - cogs - gastos)} / ${decimales(pv)}) × 100 = ${porcentaje(margenOperativo)}.`,
        ],
        barra: [
          { label: "COGS", valor: cogs, tono: "costo" },
          { label: "Gastos", valor: gastos, tono: "gasto" },
          { label: "Impuestos", valor: imp, tono: "impuesto" },
          { label: "Intereses", valor: int, tono: "interes" },
          {
            label: gn >= 0 ? "Utilidad neta" : "Pérdida",
            valor: Math.abs(gn),
            tono: gn >= 0 ? "ganancia" : "perdida",
          },
        ],
      };
    },
  },

  "markup": {
    titulo: "Simulador · Markup",
    descripcion:
      "Calcula el recargo porcentual sobre el costo y lo compara con el margen sobre la venta para evitar confusiones.",
    formula: "Markup = ((PV - PC) / PC) × 100",
    campos: [
      { k: "pc", label: "Precio de costo", prefijo: "$", def: 60 },
      { k: "pv", label: "Precio de venta", prefijo: "$", def: 100 },
    ],
    calcular: ({ pc, pv }) => {
      const g = pv - pc;
      const markup = pc > 0 ? (g / pc) * 100 : NaN;
      const margen = pv > 0 ? (g / pv) * 100 : NaN;
      const multiplicador = pc > 0 ? pv / pc : NaN;
      return {
        resultados: [
          { label: "Markup sobre el costo", valor: porcentaje(markup), tono: "ok" },
          { label: "Margen sobre la venta", valor: porcentaje(margen) },
          { label: "Multiplicador del costo", valor: Number.isFinite(multiplicador) ? `${decimales(multiplicador, 2)}×` : "—" },
        ],
        aviso:
          markup < 0
            ? "El precio de venta es menor que el costo: el markup es negativo."
            : null,
        pasos: [
          `Ganancia: G = ${dinero(pv)} - ${dinero(pc)} = ${dinero(g)}.`,
          `Markup = (${decimales(g)} / ${decimales(pc)}) × 100 = ${porcentaje(markup)}.`,
          `Margen sobre venta = (${decimales(g)} / ${decimales(pv)}) × 100 = ${porcentaje(margen)}.`,
          `Multiplicador = ${dinero(pv)} / ${dinero(pc)} = ${decimales(multiplicador, 2)}×.`,
        ],
        barra: [
          { label: "Costo", valor: pc, tono: "costo" },
          { label: "Ganancia", valor: g, tono: "ganancia" },
        ],
      };
    },
  },

  "cogs": {
    titulo: "Simulador · Costo de ventas (COGS)",
    descripcion:
      "Calcula el costo de los productos vendidos a partir del inventario inicial, las compras y el inventario final.",
    formula: "COGS = Inventario Inicial + Compras - Inventario Final",
    campos: [
      { k: "inicial", label: "Inventario inicial", prefijo: "$", def: 500 },
      { k: "compras", label: "Compras del período", prefijo: "$", def: 800 },
      { k: "final", label: "Inventario final", prefijo: "$", def: 300 },
      { k: "ventas", label: "Ventas del período", prefijo: "$", def: 1500 },
    ],
    calcular: ({ inicial, compras, final, ventas }) => {
      const disponible = inicial + compras;
      const cogs = disponible - final;
      const gb = ventas - cogs;
      const margen = ventas > 0 ? (gb / ventas) * 100 : NaN;
      return {
        resultados: [
          { label: "Costo de ventas", valor: dinero(cogs), tono: "ok" },
          { label: "Ganancia bruta", valor: dinero(gb), tono: gb < 0 ? "bad" : "ok" },
          { label: "Margen bruto", valor: porcentaje(margen) },
        ],
        aviso:
          final > disponible
            ? "El inventario final no puede ser mayor que el inventario disponible."
            : null,
        pasos: [
          `Inventario disponible = ${dinero(inicial)} + ${dinero(compras)} = ${dinero(disponible)}.`,
          `COGS = ${dinero(disponible)} - ${dinero(final)} = ${dinero(cogs)}.`,
          `Ganancia bruta = ${dinero(ventas)} - ${dinero(cogs)} = ${dinero(gb)}.`,
          `Margen bruto = (${decimales(gb)} / ${decimales(ventas)}) × 100 = ${porcentaje(margen)}.`,
        ],
        barra: [
          { label: "COGS", valor: cogs, tono: "costo" },
          { label: "Ganancia bruta", valor: gb, tono: "ganancia" },
        ],
      };
    },
  },

  "ebitda": {
    titulo: "Simulador · EBITDA",
    descripcion:
      "Reconstruye el EBITDA sumando a la utilidad neta impuestos, intereses, depreciación y amortización.",
    formula: "EBITDA = Utilidad Neta + Impuestos + Intereses + D&A",
    campos: [
      { k: "un", label: "Utilidad neta", prefijo: "$", def: 50 },
      { k: "imp", label: "Impuestos", prefijo: "$", def: 20 },
      { k: "int", label: "Intereses", prefijo: "$", def: 10 },
      { k: "dep", label: "Depreciación", prefijo: "$", def: 15 },
      { k: "amort", label: "Amortización", prefijo: "$", def: 5 },
      { k: "ventas", label: "Ventas", prefijo: "$", def: 500 },
    ],
    calcular: ({ un, imp, int, dep, amort, ventas }) => {
      const ajustes = imp + int + dep + amort;
      const ebitda = un + ajustes;
      const margen = ventas > 0 ? (ebitda / ventas) * 100 : NaN;
      return {
        resultados: [
          { label: "EBITDA", valor: dinero(ebitda), tono: ebitda < 0 ? "bad" : "ok" },
          { label: "Margen EBITDA", valor: porcentaje(margen) },
          { label: "Ajustes totales", valor: dinero(ajustes) },
        ],
        aviso:
          ventas <= 0
            ? "Las ventas deben ser mayores que cero para calcular el margen EBITDA."
            : null,
        pasos: [
          `Utilidad neta: ${dinero(un)}.`,
          `Ajustes = ${dinero(imp)} + ${dinero(int)} + ${dinero(dep)} + ${dinero(amort)} = ${dinero(ajustes)}.`,
          `EBITDA = ${dinero(un)} + ${dinero(ajustes)} = ${dinero(ebitda)}.`,
          `Margen EBITDA = (${decimales(ebitda)} / ${decimales(ventas)}) × 100 = ${porcentaje(margen)}.`,
        ],
        barra: [
          { label: "Utilidad neta", valor: un, tono: "ganancia" },
          { label: "Impuestos", valor: imp, tono: "impuesto" },
          { label: "Intereses", valor: int, tono: "interes" },
          { label: "D&A", valor: dep + amort, tono: "gasto" },
        ],
      };
    },
  },

  "roi": {
    titulo: "Simulador · ROI",
    descripcion:
      "Calcula el retorno porcentual de una inversión y lo compara con el beneficio neto obtenido.",
    formula: "ROI = (Beneficio / Inversión) × 100",
    campos: [
      { k: "inversion", label: "Inversión inicial", prefijo: "$", def: 1000 },
      { k: "beneficio", label: "Beneficio neto", prefijo: "$", def: 200 },
      { k: "anios", label: "Años del proyecto", sufijo: "años", def: 1 },
    ],
    calcular: ({ inversion, beneficio, anios }) => {
      const roi = inversion > 0 ? (beneficio / inversion) * 100 : NaN;
      const anualizado =
        inversion > 0 && anios > 0 ? roi / anios : NaN;
      return {
        resultados: [
          { label: "ROI total", valor: porcentaje(roi), tono: roi < 0 ? "bad" : "ok" },
          { label: "ROI anualizado", valor: porcentaje(anualizado) },
          { label: "Retorno total", valor: dinero(inversion + beneficio) },
        ],
        aviso:
          inversion <= 0
            ? "La inversión debe ser mayor que cero."
            : anios <= 0
              ? "Los años deben ser mayores que cero."
              : null,
        pasos: [
          `Inversión: ${dinero(inversion)}.`,
          `Beneficio neto: ${dinero(beneficio)}.`,
          `ROI = (${decimales(beneficio)} / ${decimales(inversion)}) × 100 = ${porcentaje(roi)}.`,
          `ROI anualizado = ${porcentaje(roi)} / ${decimales(anios)} = ${porcentaje(anualizado)}.`,
        ],
        barra: [
          { label: "Inversión", valor: inversion, tono: "costo" },
          { label: "Beneficio", valor: beneficio, tono: "ganancia" },
        ],
      };
    },
  },

  "punto-equilibrio": {
    titulo: "Simulador · Punto de equilibrio",
    descripcion:
      "Encuentra cuántas unidades hay que vender para cubrir los costos fijos y calcula las ventas necesarias.",
    formula: "Q* = CF / (PV - CV) · Ventas* = Q* × PV",
    campos: [
      { k: "cf", label: "Costos fijos", prefijo: "$", def: 1000 },
      { k: "pv", label: "Precio de venta unitario", prefijo: "$", def: 25 },
      { k: "cv", label: "Costo variable unitario", prefijo: "$", def: 15 },
    ],
    calcular: ({ cf, pv, cv }) => {
      const contribucion = pv - cv;
      const unidades = contribucion > 0 ? cf / contribucion : NaN;
      const ventas = contribucion > 0 ? unidades * pv : NaN;
      const margenContribucion = pv > 0 ? (contribucion / pv) * 100 : NaN;
      return {
        resultados: [
          {
            label: "Unidades de equilibrio",
            valor: Number.isFinite(unidades) ? decimales(Math.ceil(unidades), 0) : "—",
            tono: "ok",
          },
          { label: "Ventas de equilibrio", valor: dinero(ventas) },
          { label: "Margen de contribución", valor: dinero(contribucion) },
          { label: "Margen de contribución %", valor: porcentaje(margenContribucion) },
        ],
        aviso:
          contribucion <= 0
            ? "El precio de venta debe ser mayor que el costo variable para cubrir los costos fijos."
            : cf <= 0
              ? "Los costos fijos deben ser mayores que cero."
              : null,
        pasos: [
          `Margen de contribución: PV - CV = ${dinero(pv)} - ${dinero(cv)} = ${dinero(contribucion)}.`,
          `Unidades de equilibrio: Q* = ${dinero(cf)} / ${dinero(contribucion)} = ${Number.isFinite(unidades) ? decimales(unidades, 2) : "—"}.`,
          `Ventas de equilibrio = ${Number.isFinite(unidades) ? decimales(Math.ceil(unidades), 0) : "—"} × ${dinero(pv)} = ${dinero(ventas)}.`,
          `Margen de contribución % = (${decimales(contribucion)} / ${decimales(pv)}) × 100 = ${porcentaje(margenContribucion)}.`,
        ],
        barra: [
          { label: "Costo variable", valor: cv, tono: "costo" },
          { label: "Contribución", valor: contribucion, tono: "ganancia" },
        ],
      };
    },
  },
};
