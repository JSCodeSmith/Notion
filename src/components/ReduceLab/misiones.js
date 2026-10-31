/* Misiones de REDUCE LAB. Cada misión valida el callback que escribe el jugador.
   El resultado esperado se calcula con la solución de referencia. */

import { ejecutar, XP_DIFICULTAD } from "./motor.js";

const mision = (base) => {
  let esperado;
  try {
    esperado = ejecutar(base.solucion, base.datos, base.inicial, base.usarInicial !== false);
  } catch {
    esperado = undefined;
  }
  return {
    ...base,
    esperado,
    xp: XP_DIFICULTAD[base.dificultad] ?? 100,
    usarInicial: base.usarInicial !== false,
  };
};

export const MODOS = [
  {
    id: "energia",
    nombre: "Energy Collector",
    icono: "⚡",
    color: "#34d399",
    xpDesbloqueo: 0,
    lema: "Recolecta energía y domina el acumulador.",
    historia:
      "La estación orbital se ha quedado a oscuras. Eres el técnico del núcleo y debes combinar las células de energía con reduce() antes de que fallen los sistemas.",
    misiones: [
      mision({
        id: "energia-1",
        titulo: "Reactor en línea",
        dificultad: "Fácil",
        historia:
          "Cinco células de energía esperan en la bahía. El panel principal necesita la carga total para reiniciar el reactor.",
        objetivo: "Suma toda la energía almacenada.",
        problema:
          "El acumulador debe empezar en 0 y crecer con cada célula hasta devolver la carga total.",
        datos: [12, 7, 25, 3, 18],
        inicial: 0,
        solucion: "(acc, energia) => acc + energia",
        pistas: [
          "El callback recibe el acumulador y la célula actual.",
          "Devuelve siempre el nuevo acumulador: `acc + energia`.",
        ],
        explicacion:
          "Cada iteración devuelve la suma parcial. El valor devuelto se convierte en el acumulador de la siguiente célula hasta obtener 65.",
        recompensa: "Núcleo estabilizado",
      }),
      mision({
        id: "energia-2",
        titulo: "Núcleo dominante",
        dificultad: "Fácil",
        historia:
          "Uno de los núcleos emite mucha más energía que el resto. Necesitas identificar el pico máximo para calibrar los escudos.",
        objetivo: "Encuentra la célula con mayor energía.",
        problema: "El acumulador debe conservar el valor más alto encontrado.",
        datos: [42, 17, 93, 58, 71],
        inicial: 0,
        solucion: "(acc, energia) => (energia > acc ? energia : acc)",
        pistas: [
          "Compara la célula actual con el acumulador.",
          "Si la célula es mayor, devuélvela; si no, mantén el acumulador.",
        ],
        explicacion:
          "El acumulador guarda el máximo provisional. Al comparar cada célula, solo se reemplaza cuando aparece una mayor.",
        recompensa: "Escudos calibrados",
      }),
      mision({
        id: "energia-3",
        titulo: "Fusión en cadena",
        dificultad: "Medio",
        historia:
          "Los amplificadores multiplican la energía en cadena. Un error de cálculo y la reacción se descontrola.",
        objetivo: "Multiplica todos los factores de amplificación.",
        problema:
          "El valor inicial debe ser 1: si empiezas en 0, cualquier multiplicación da 0.",
        datos: [2, 3, 4, 5],
        inicial: 1,
        solucion: "(acc, factor) => acc * factor",
        pistas: [
          "La operación es una multiplicación acumulada.",
          "Empieza en 1 para no anular el producto.",
        ],
        explicacion:
          "2 × 3 × 4 × 5 = 120. El acumulador viaja multiplicando cada factor.",
        recompensa: "Amplificador estable",
      }),
    ],
  },
  {
    id: "alquimia",
    nombre: "Alchemy Laboratory",
    icono: "⚗️",
    color: "#a78bfa",
    xpDesbloqueo: 150,
    lema: "Combina ingredientes y transforma estructuras.",
    historia:
      "Tu laboratorio clandestino produce pociones para toda la ciudad. Cada ingrediente modifica el caldero de forma distinta.",
    misiones: [
      mision({
        id: "alquimia-1",
        titulo: "Poción de poder",
        dificultad: "Fácil",
        historia:
          "La poción base exige la suma del poder de todos los ingredientes de la mesa.",
        objetivo: "Suma la propiedad `poder` de cada ingrediente.",
        problema: "Cada elemento es un objeto, no un número.",
        datos: [
          { nombre: "Rayo", poder: 30 },
          { nombre: "Bruma", poder: 45 },
          { nombre: "Raíz", poder: 25 },
        ],
        inicial: 0,
        solucion: "(acc, ingrediente) => acc + ingrediente.poder",
        pistas: [
          "Accede a la propiedad con `ingrediente.poder`.",
          "Suma ese valor al acumulador.",
        ],
        explicacion:
          "El acumulador sigue siendo numérico aunque los elementos sean objetos: se extrae `poder` en cada paso.",
        recompensa: "Poción base embotellada",
      }),
      mision({
        id: "alquimia-2",
        titulo: "Censo de ingredientes",
        dificultad: "Medio",
        historia:
          "Antes de abrir el laboratorio necesitas saber cuántas unidades tienes de cada ingrediente.",
        objetivo: "Cuenta cuántas veces aparece cada ingrediente.",
        problema:
          "El acumulador debe ser un objeto vacío y cada clave guarda su frecuencia.",
        datos: ["raíz", "bruma", "raíz", "cristal", "bruma", "raíz"],
        inicial: {},
        solucion:
          "(acc, ingrediente) => { acc[ingrediente] = (acc[ingrediente] || 0) + 1; return acc; }",
        pistas: [
          "Usa el nombre del ingrediente como clave del objeto.",
          "Incrementa con `(acc[clave] || 0) + 1` y no olvides el return.",
        ],
        explicacion:
          "El acumulador es un histograma. Cada aparición incrementa su contador y el objeto final resume el inventario.",
        recompensa: "Inventario alquímico",
      }),
      mision({
        id: "alquimia-3",
        titulo: "Mezcla por elemento",
        dificultad: "Medio",
        historia:
          "El maestro alquimista quiere separar los ingredientes según su elemento para preparar lotes.",
        objetivo: "Agrupa los nombres de ingredientes por elemento.",
        problema:
          "El resultado debe ser un objeto donde cada elemento contiene un array de nombres.",
        datos: [
          { nombre: "Rayo", elemento: "fuego" },
          { nombre: "Bruma", elemento: "agua" },
          { nombre: "Chispa", elemento: "fuego" },
          { nombre: "Marea", elemento: "agua" },
          { nombre: "Ceniza", elemento: "aire" },
        ],
        inicial: {},
        solucion:
          "(acc, ing) => { (acc[ing.elemento] ||= []).push(ing.nombre); return acc; }",
        pistas: [
          "La clave es `ing.elemento` y el valor será un array.",
          "Crea el array si no existe y haz push del nombre.",
        ],
        explicacion:
          "Cada elemento del array aporta una clave y un nombre. El acumulador crece como objeto de arrays: agrupación clásica con reduce().",
        recompensa: "Lotes clasificados",
      }),
    ],
  },
  {
    id: "reino",
    nombre: "Kingdom Economy",
    icono: "🏰",
    color: "#fbbf24",
    xpDesbloqueo: 400,
    lema: "Administra recursos, balances e impuestos.",
    historia:
      "Eres el tesorero real. La corte exige informes exactos antes del amanecer y los números no perdonan errores.",
    misiones: [
      mision({
        id: "reino-1",
        titulo: "Balance del tesoro",
        dificultad: "Medio",
        historia:
          "El reino registró ingresos y gastos. Calcula el balance final para saber si hay superávit.",
        objetivo: "Suma todos los movimientos, incluidos los negativos.",
        problema: "Cada movimiento es un objeto con `concepto` y `monto`.",
        datos: [
          { concepto: "Tributos", monto: 1200 },
          { concepto: "Murallas", monto: -450 },
          { concepto: "Mercado", monto: 780 },
          { concepto: "Sueldos", monto: -320 },
        ],
        inicial: 0,
        solucion: "(acc, movimiento) => acc + movimiento.monto",
        pistas: [
          "Suma `movimiento.monto` sin preocuparte por el signo.",
          "Los gastos ya vienen como números negativos.",
        ],
        explicacion:
          "1200 − 450 + 780 − 320 = 1210. El acumulador refleja el balance en tiempo real.",
        recompensa: "Balance aprobado",
      }),
      mision({
        id: "reino-2",
        titulo: "Recaudación por gremio",
        dificultad: "Medio",
        historia:
          "Cada gremio entregó su cuota. La corona necesita el total recaudado por gremio.",
        objetivo: "Agrupa y suma el oro por gremio.",
        problema: "El acumulador es un objeto de totales por gremio.",
        datos: [
          { gremio: "Herreros", oro: 650 },
          { gremio: "Mercaderes", oro: 920 },
          { gremio: "Herreros", oro: 180 },
          { gremio: "Campesinos", oro: 340 },
          { gremio: "Mercaderes", oro: 260 },
        ],
        inicial: {},
        solucion:
          "(acc, pago) => { acc[pago.gremio] = (acc[pago.gremio] || 0) + pago.oro; return acc; }",
        pistas: [
          "Agrupa usando `pago.gremio` como clave.",
          "Acumula el oro: `(acc[clave] || 0) + pago.oro`.",
        ],
        explicacion:
          "El objeto resultante contiene el total de cada gremio. Es un reduce de agregación numérica por clave.",
        recompensa: "Libro de cuentas",
      }),
      mision({
        id: "reino-3",
        titulo: "Censo de aldeas",
        dificultad: "Difícil",
        historia:
          "Los mensajeros entregaron listas desordenadas de aldeas. Necesitas saber cuántas veces se repite cada una.",
        objetivo: "Construye un censo con la frecuencia de cada aldea.",
        problema: "El array contiene strings y el resultado debe ser un objeto.",
        datos: [
          "Roble",
          "Cumbre",
          "Roble",
          "Valle",
          "Cumbre",
          "Roble",
          "Lago",
          "Valle",
        ],
        inicial: {},
        solucion:
          "(acc, aldea) => { acc[aldea] = (acc[aldea] || 0) + 1; return acc; }",
        pistas: [
          "Es el mismo patrón del histograma.",
          "No olvides devolver el acumulador en cada iteración.",
        ],
        explicacion:
          "Cada aldea incrementa su contador. El censo final es un objeto con las frecuencias.",
        recompensa: "Censo sellado",
      }),
    ],
  },
  {
    id: "flota",
    nombre: "Space Fleet",
    icono: "🚀",
    color: "#22d3ee",
    xpDesbloqueo: 700,
    lema: "Combina estadísticas de naves y forma escuadrones.",
    historia:
      "Comandas la flota del sector. El alto mando quiere conocer su poder real antes de la batalla.",
    misiones: [
      mision({
        id: "flota-1",
        titulo: "Poder de la flota",
        dificultad: "Fácil",
        historia:
          "Cada nave aporta su potencia de fuego. Suma el poder total de la escuadra.",
        objetivo: "Suma la propiedad `poder` de cada nave.",
        problema: "Los elementos son objetos con nombre y poder.",
        datos: [
          { nombre: "Fénix", poder: 320 },
          { nombre: "Titán", poder: 540 },
          { nombre: "Vega", poder: 210 },
        ],
        inicial: 0,
        solucion: "(acc, nave) => acc + nave.poder",
        pistas: [
          "Accede a `nave.poder`.",
          "El acumulador empieza en 0.",
        ],
        explicacion:
          "El poder total es la suma de cada nave. El acumulador numérico se mantiene aunque los elementos sean objetos.",
        recompensa: "Lectura de potencia",
      }),
      mision({
        id: "flota-2",
        titulo: "Nave insignia",
        dificultad: "Medio",
        historia:
          "El almirante necesita saber qué nave lidera la flota por potencia de fuego.",
        objetivo: "Devuelve la nave con mayor `poder`.",
        problema:
          "El acumulador no es un número: es la nave ganadora hasta el momento.",
        datos: [
          { nombre: "Fénix", poder: 320 },
          { nombre: "Titán", poder: 540 },
          { nombre: "Vega", poder: 210 },
          { nombre: "Hidra", poder: 610 },
        ],
        inicial: { nombre: "Sin asignar", poder: 0 },
        solucion: "(acc, nave) => (nave.poder > acc.poder ? nave : acc)",
        pistas: [
          "Inicia con una nave ficticia de poder 0.",
          "Devuelve la nave actual si supera al acumulador.",
        ],
        explicacion:
          "El acumulador guarda la nave líder. Tras recorrer la flota, devuelve el objeto completo de la nave con mayor poder.",
        recompensa: "Insignia asignada",
      }),
      mision({
        id: "flota-3",
        titulo: "Escuadrones por clase",
        dificultad: "Difícil",
        historia:
          "La batalla exige separar las naves por clase: cazas, cruceros y apoyo.",
        objetivo: "Agrupa los nombres de naves por clase.",
        problema: "Construye un objeto cuyos valores son arrays de nombres.",
        datos: [
          { nombre: "Fénix", clase: "caza" },
          { nombre: "Titán", clase: "crucero" },
          { nombre: "Vega", clase: "apoyo" },
          { nombre: "Hidra", clase: "crucero" },
          { nombre: "Lanza", clase: "caza" },
        ],
        inicial: {},
        solucion:
          "(acc, nave) => { (acc[nave.clase] ||= []).push(nave.nombre); return acc; }",
        pistas: [
          "La clave del objeto es `nave.clase`.",
          "Si la clave no existe, inicialízala como array vacío.",
        ],
        explicacion:
          "Cada nave se inserta en el array de su clase. El resultado es una formación organizada en un solo recorrido.",
        recompensa: "Flota organizada",
      }),
    ],
  },
  {
    id: "detective",
    nombre: "Detective Database",
    icono: "🕵️",
    color: "#f472b6",
    xpDesbloqueo: 1050,
    lema: "Procesa evidencias y resuelve el caso final.",
    historia:
      "Una serie de robos tiene en jaque a la ciudad. Tu base de datos de evidencias es la única pista para cerrar el caso.",
    misiones: [
      mision({
        id: "detective-1",
        titulo: "Contador de pistas",
        dificultad: "Medio",
        historia:
          "Las evidencias llegaron mezcladas. Necesitas saber cuántas veces aparece cada tipo de pista.",
        objetivo: "Cuenta la frecuencia de cada pista.",
        problema: "El array contiene strings repetidos y el resultado es un objeto.",
        datos: ["huella", "cabello", "huella", "fibra", "huella", "cabello"],
        inicial: {},
        solucion:
          "(acc, pista) => { acc[pista] = (acc[pista] || 0) + 1; return acc; }",
        pistas: [
          "Usa la pista como clave del objeto.",
          "Incrementa el contador existente o empieza en 1.",
        ],
        explicacion:
          "El histograma revela qué evidencia predomina. Es el mismo patrón de conteo que ya usaste en el laboratorio.",
        recompensa: "Evidencias clasificadas",
      }),
      mision({
        id: "detective-2",
        titulo: "Sospechosos por ciudad",
        dificultad: "Difícil",
        historia:
          "El comisario quiere interrogar por ciudad. Agrupa los nombres de los sospechosos según su última ubicación.",
        objetivo: "Agrupa nombres por ciudad.",
        problema: "Cada sospechoso es un objeto con `nombre` y `ciudad`.",
        datos: [
          { nombre: "Mara", ciudad: "Puerto Norte" },
          { nombre: "Ivo", ciudad: "Valle Seco" },
          { nombre: "Nadia", ciudad: "Puerto Norte" },
          { nombre: "Bruno", ciudad: "Valle Seco" },
          { nombre: "Lía", ciudad: "Costa Sur" },
        ],
        inicial: {},
        solucion:
          "(acc, p) => { (acc[p.ciudad] ||= []).push(p.nombre); return acc; }",
        pistas: [
          "Agrupa usando `p.ciudad` como clave.",
          "Cada clave debe contener un array con los nombres.",
        ],
        explicacion:
          "El objeto final permite interrogar por ciudad. Es una agrupación de objetos en un solo recorrido.",
        recompensa: "Ruta de interrogatorios",
      }),
      mision({
        id: "detective-3",
        titulo: "Informe del caso",
        dificultad: "Difícil",
        historia:
          "Es la última noche. Debes condensar todas las evidencias en un informe con el peso total, el conteo por tipo y el peso de la evidencia más liviana.",
        objetivo:
          "Construye un objeto `{ total, porTipo, pesoMinimo }` con el peso acumulado, el conteo por tipo y el menor peso registrado.",
        problema:
          "El acumulador es un objeto complejo: debes actualizar tres propiedades en cada iteración, incluido un mínimo que arranca en `null`.",
        datos: [
          { tipo: "huella", peso: 3 },
          { tipo: "fibra", peso: 2 },
          { tipo: "huella", peso: 4 },
          { tipo: "cabello", peso: 1 },
          { tipo: "fibra", peso: 5 },
        ],
        inicial: { total: 0, porTipo: {}, pesoMinimo: null },
        solucion:
          "(acc, ev) => { acc.total += ev.peso; acc.porTipo[ev.tipo] = (acc.porTipo[ev.tipo] || 0) + 1; acc.pesoMinimo = acc.pesoMinimo === null ? ev.peso : Math.min(acc.pesoMinimo, ev.peso); return acc; }",
        pistas: [
          "Actualiza `acc.total` con el peso de la evidencia.",
          "Actualiza `acc.porTipo[ev.tipo]` como un histograma.",
          "Para el mínimo: si `acc.pesoMinimo` es `null`, usa el peso actual; si no, aplica `Math.min`.",
        ],
        explicacion:
          "Un único reduce construye un informe completo: acumula el peso total, cuenta cada tipo de evidencia y conserva el peso mínimo con Math.min. El caso queda cerrado.",
        recompensa: "Caso cerrado",
      }),
    ],
  },
];

export const TOTAL_MISIONES = MODOS.reduce((acc, modo) => acc + modo.misiones.length, 0);

export const MISIONES = Object.fromEntries(
  MODOS.flatMap((modo) =>
    modo.misiones.map((misionItem) => [
      misionItem.id,
      { ...misionItem, modoId: modo.id, modoNombre: modo.nombre },
    ]),
  ),
);
