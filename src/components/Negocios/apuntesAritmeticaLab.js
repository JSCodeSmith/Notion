/* Apuntes propios del laboratorio de Aritmética Comercial y Financiera.
   Son notas breves de estudio escritas para acompañar cada simulador:
   no sustituyen al apunte, ayudan a decidir qué calcular y qué comprobar. */

export const APUNTES_ARITMETICA_LAB = {
  "aritmetica-precio-lista": {
    idea:
      "El precio de lista no se descubre: se decide. Primero pagas un costo y después eliges cuánta ganancia quieres cargarle antes de anunciar el producto.",
    modelo:
      "Es la etiqueta de la vitrina. El costo vive detrás del mostrador; el precio de lista es lo que el cliente ve antes de cualquier rebaja.",
    checklist: [
      "PL = PC + Ganancia: si falta uno de los dos sumandos, no inventes el otro.",
      "El descuento se calcula sobre el PL, nunca sobre el costo.",
      "Comprueba el margen después de la rebaja: un PL alto puede esconder poca ganancia real.",
    ],
    reto:
      "Un producto cuesta $80 y quieres una ganancia del 25% sobre el costo. Calcula el PL, aplícale un descuento del 10% y comprueba cuánta ganancia queda.",
    pista:
      "25% de $80 son $20 → PL = $100. El 10% de $100 son $10 → precio final $90 y ganancia real $10.",
  },
  "aritmetica-precio-costo": {
    idea:
      "El costo es todo lo que sale de tu bolsillo para poner el producto frente al cliente: compra, flete, embalaje y mermas. No es lo mismo que el precio al que lo vendes.",
    modelo:
      "Son los ingredientes de una receta. Si olvidas la sal, el plato sale mal; si olvidas el flete, el margen sale falso.",
    checklist: [
      "PC = PL - Ganancia cuando conoces el precio de lista.",
      "Suma los gastos directos antes de dividir entre las unidades.",
      "Actualiza el costo cuando cambie el proveedor: un costo viejo produce un margen viejo.",
    ],
    reto:
      "Un producto tiene PL de $120 y una ganancia de $30. Calcula el costo. Luego supón que el flete sube $10 y explica qué pasa si el PL no cambia.",
    pista:
      "PC = $120 - $30 = $90. Con $10 más de flete, el costo real sube a $100 y la ganancia baja a $20.",
  },
  "aritmetica-ganancia-perdida": {
    idea:
      "La ganancia y la pérdida son el mismo cálculo con distinto signo: comparas el precio de venta con el costo. El signo te dice si la operación deja o consume dinero.",
    modelo:
      "Es el marcador de un partido. No explica la estrategia, pero te dice si vas ganando o perdiendo.",
    checklist: [
      "Ganancia = PV - PC si PV > PC.",
      "Pérdida = PC - PV si PV < PC.",
      "Ganancia en dinero y margen en porcentaje no son lo mismo.",
      "Una ganancia bruta puede desaparecer al restar gastos operativos.",
    ],
    reto:
      "Vendes a $45 un producto que te costó $50. Calcula la pérdida. ¿A qué precio deberías vender para ganar un 20% sobre el costo?",
    pista:
      "Pérdida = $5. Para ganar 20% sobre $50 necesitas $10 de ganancia: PV = $60.",
  },
  "aritmetica-margen-ganancia": {
    idea:
      "El margen mide la ganancia como proporción del costo. Sirve para comparar productos de precios muy distintos, pero solo si todos usan la misma base.",
    modelo:
      "Es la nota porcentual de un examen: importa la proporción lograda, no el tamaño del examen.",
    checklist: [
      "Margen (%) = (Ganancia / Costo) × 100.",
      "Si la base fuera el precio de venta, el resultado sería otro indicador.",
      "Fija un margen mínimo antes de diseñar promociones.",
      "Recalcula el margen cuando cambie el costo o el precio de venta.",
    ],
    reto:
      "Un producto cuesta $40 y se vende a $60. Calcula la ganancia, el margen sobre el costo y la ganancia como porcentaje del precio de venta.",
    pista:
      "Ganancia = $20. Margen sobre costo = 50%; sobre venta = 20 / 60 ≈ 33,33%.",
  },
  "aritmetica-descuento": {
    idea:
      "Un descuento simple es una sola resta porcentual sobre el precio de lista. El porcentaje no se calcula sobre el costo ni sobre el precio final: siempre sobre la base anunciada.",
    modelo:
      "Es recortar una tira de papel una sola vez. Lo que quitas no vuelve a descontarse.",
    checklist: [
      "Descuento = PL × (d / 100).",
      "Precio final = PL - Descuento.",
      "Después del descuento, vuelve a comparar el precio final con el costo.",
      "No sumes descuentos de etapas distintas: eso es un descuento sucesivo.",
    ],
    reto:
      "Un producto de $200 recibe un 15% de descuento. Calcula el precio final y la ganancia si el costo era $150.",
    pista:
      "Descuento = $30 → precio final $170. Ganancia real = $170 - $150 = $20.",
  },
  "aritmetica-descuentos-sucesivos": {
    idea:
      "Los descuentos sucesivos se multiplican, no se suman. Cada porcentaje se aplica sobre el precio que quedó del paso anterior.",
    modelo:
      "Es pelar una fruta capa por capa: cada capa se quita sobre lo que queda, no sobre la fruta entera.",
    checklist: [
      "Precio final = PL × (1 - d1) × (1 - d2) × …",
      "El descuento equivalente se obtiene restando a 100 el producto de los factores.",
      "El orden no cambia el precio final, pero sí los cálculos intermedios.",
      "Convierte siempre la cadena a descuento único para comparar ofertas.",
    ],
    reto:
      "Aplica un 25% y luego un 20% a un precio de $100. ¿Cuál es el precio final y el descuento único equivalente?",
    pista:
      "100 × 0,75 × 0,80 = $60. El descuento equivalente es 40%, no 45%.",
  },
  "aritmetica-regla-tres": {
    idea:
      "La regla de tres convierte una proporción en una ecuación. Lo difícil no es multiplicar en cruz, sino ordenar bien las magnitudes y decidir si la proporción es directa o inversa.",
    modelo:
      "Es una balanza: con tres pesas conocidas puedes calcular la cuarta sin adivinar.",
    checklist: [
      "Ordena los datos en dos columnas: a → b y c → x.",
      "Comprueba si al crecer una magnitud la otra también crece (directa) o disminuye (inversa).",
      "Directa: x = (b × c) / a.",
      "Verifica que el resultado tenga sentido con las unidades del problema.",
    ],
    reto:
      "Si 4 kg de producto cuestan $24, ¿cuánto cuestan 7 kg? Resuélvelo y comprueba el precio por kilo.",
    pista:
      "x = (24 × 7) / 4 = $42. El precio por kilo es $6.",
  },
  "aritmetica-pv-ganancia": {
    idea:
      "La ganancia bruta solo descuenta el costo directo; la neta descuenta además gastos, impuestos e intereses. El margen cambia según la ganancia que uses y la base que elijas.",
    modelo:
      "La ganancia bruta es lo que queda después de pagar los ingredientes de la pizza; la neta es lo que queda después de pagar también el local, la luz y los impuestos.",
    checklist: [
      "Ganancia bruta = PV - costo directo.",
      "Ganancia neta = ganancia bruta - gastos - impuestos - intereses.",
      "Margen bruto (%) = (ganancia bruta / PV) × 100.",
      "Margen neto (%) = (ganancia neta / PV) × 100.",
    ],
    reto:
      "PV = $200, costo directo = $120, gastos = $40 e impuestos = $10. Calcula la ganancia bruta, la neta y ambos márgenes sobre la venta.",
    pista:
      "Bruta = $80 (40% del PV). Neta = $80 - $40 - $10 = $30 (15% del PV).",
  },
  "aritmetica-interes-compuesto": {
    idea:
      "El interés compuesto capitaliza: cada período calcula intereses sobre el capital más los intereses anteriores. Por eso la tasa efectiva no coincide con la tasa nominal cuando hay varias capitalizaciones al año.",
    modelo:
      "Es una bola de nieve que rueda cuesta abajo: cada vuelta recoge más nieve y la siguiente vuelta recoge todavía más.",
    checklist: [
      "M = C × (1 + i/m)^(n × m).",
      "i es la tasa anual en tanto por uno; m son las capitalizaciones por año.",
      "Intereses = M - C.",
      "La regla del 72 estima los años para duplicar: 72 / tasa anual en porcentaje.",
    ],
    reto:
      "Invierte $1.000 al 10% anual durante 3 años con capitalización anual y luego mensual. Compara ambos montos finales.",
    pista:
      "Anual: 1000 × 1,1³ = $1.331. Mensual: 1000 × (1 + 0,10/12)^36 ≈ $1.348,18.",
  },
  "aritmetica-caso-integrador": {
    idea:
      "El caso integrador es el examen final de la aritmética comercial: encadena costo, ganancia, precio de lista, descuento y precio final en el orden en que ocurren en una venta real.",
    modelo:
      "Es un rompecabezas: cada pieza tiene su fórmula y el resultado solo aparece cuando todas encajan en el orden correcto.",
    checklist: [
      "Sigue siempre la secuencia: costo → ganancia → lista → descuento → final.",
      "El descuento va sobre el precio de lista, no sobre el costo.",
      "Calcula la ganancia real al final: es la que decide si la venta conviene.",
      "Comprueba que el precio final siga cubriendo el costo.",
    ],
    reto:
      "Costo $80, ganancia objetivo 25% sobre el costo, descuento 10%. Calcula PL, precio final y ganancia real.",
    pista:
      "PL = $100; precio final = $90; ganancia real = $10, equivalente a 12,5% sobre el costo.",
  },
};

export function apuntesAritmeticaDe(nota) {
  if (!nota) return null;
  const propios = APUNTES_ARITMETICA_LAB[nota.id];
  if (propios) return propios;

  return {
    idea: nota.resumen ?? "Practica el concepto con el simulador y observa cada paso.",
    modelo: nota.analogia ?? "",
    checklist: (nota.notasPersonales ?? []).slice(0, 3),
    reto:
      "Cambia un dato del simulador, predice el resultado y comprueba si la variación tiene sentido.",
    pista:
      nota.errores?.[0] ??
      "Revisa la fórmula y la base sobre la que estás calculando el porcentaje.",
  };
}
