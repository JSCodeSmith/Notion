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
  "aritmetica-ganancia": {
    idea:
      "La ganancia es la parte del precio de venta que sobrevive al costo. Se mide en dinero, pero se compara en porcentaje para saber si la operación es buena.",
    modelo:
      "Es el sobrante de la caja después de pagar la mercadería: no es todo lo que entra, sino lo que realmente queda.",
    checklist: [
      "Ganancia = PV - PC cuando el precio de venta supera el costo.",
      "Margen sobre costo = (Ganancia / PC) × 100.",
      "Margen sobre venta = (Ganancia / PV) × 100.",
      "Una ganancia bruta todavía no descuenta gastos operativos.",
    ],
    reto:
      "Un producto cuesta $120 y se vende a $150. Calcula la ganancia, el margen sobre el costo y el margen sobre la venta.",
    pista:
      "Ganancia = $30. Sobre el costo = 25%; sobre la venta = 20%.",
  },
  "aritmetica-perdida": {
    idea:
      "La pérdida es la ganancia con el signo invertido: el precio de venta no alcanza a cubrir el costo. Medirla evita repetir una venta que destruye valor.",
    modelo:
      "Es el hueco que deja una venta cuando entra menos dinero del que salió: hay que taparlo con otras operaciones.",
    checklist: [
      "Hay pérdida cuando el PV es menor que el PC.",
      "Pérdida = PC - PV.",
      "Porcentaje de pérdida sobre el costo = (Pérdida / PC) × 100.",
      "El precio piso para no perder es exactamente el costo.",
    ],
    reto:
      "Compras a $90 y vendes a $75. Calcula la pérdida y el porcentaje sobre el costo. ¿Qué precio habrías necesitado para no perder?",
    pista:
      "Pérdida = $15 (16,67% del costo). El precio mínimo era $90.",
  },
  "aritmetica-precio-venta": {
    idea:
      "El precio de venta es una decisión, no una casualidad: debe cubrir costo, gastos y una ganancia mínima. Se construye desde el costo hacia arriba, nunca al revés.",
    modelo:
      "Es la puerta por donde entra el dinero: si es más angosta que el costo, el negocio se queda sin aire.",
    checklist: [
      "PV = PC × (1 + margen/100) si el margen va sobre el costo.",
      "PV = PC + Ganancia si la ganancia está en dinero.",
      "El precio de lista puede bajar con descuentos hasta llegar al PV final.",
      "Comprueba que el PV cubra costo, gastos e impuestos.",
    ],
    reto:
      "Costo $150 y margen objetivo del 30% sobre el costo. Calcula el PV y el margen resultante sobre la venta.",
    pista:
      "PV = 150 × 1,30 = $195. Margen sobre venta = 45 / 195 ≈ 23,08%.",
  },
  "aritmetica-ganancia-bruta": {
    idea:
      "La ganancia bruta es el primer filtro de rentabilidad: mide si el precio cubre el costo directo del producto antes de pagar la estructura del negocio.",
    modelo:
      "Es lo que queda en la mesa después de pagar los ingredientes de la pizza, antes del local y del personal.",
    checklist: [
      "GB = PV - COGS.",
      "Solo descuenta costos directos, no gastos operativos.",
      "Una GB negativa es una alarma inmediata.",
      "El margen bruto convierte la GB en porcentaje de las ventas.",
    ],
    reto:
      "Ventas de $2,000 y COGS de $1,300. Calcula la ganancia bruta y el margen bruto.",
    pista:
      "GB = $700; margen bruto = 35%.",
  },
  "aritmetica-ganancia-neta": {
    idea:
      "La ganancia neta es la última línea: lo que queda después de pagar absolutamente todo. Es la que decide si el negocio se sostiene o no.",
    modelo:
      "Es lo que realmente te queda en el bolsillo después de la mercadería, el local, la luz, los impuestos y el banco.",
    checklist: [
      "GN = GB - gastos operativos - impuestos - intereses.",
      "Una GB positiva puede esconder una GN negativa.",
      "Convierte la GN en margen neto dividiendo entre las ventas.",
      "No confundas ganancia neta con efectivo disponible.",
    ],
    reto:
      "GB = $700, gastos operativos $400, impuestos $60 e intereses $40. Calcula la GN y el margen neto sobre ventas de $2,000.",
    pista:
      "GN = 700 - 400 - 60 - 40 = $200; margen neto = 10%.",
  },
  "aritmetica-margen-bruto": {
    idea:
      "El margen bruto responde una sola pregunta: de cada $100 vendidos, ¿cuánto queda después del costo directo? Es la base para cubrir la estructura.",
    modelo:
      "Es la porción del pastel que queda después de pagar los ingredientes; todavía no alcanza para el alquiler, pero ya sabes con cuánto cuentas.",
    checklist: [
      "Margen bruto = ((PV - COGS) / PV) × 100.",
      "Se calcula sobre la venta, no sobre el costo.",
      "No incluye gastos operativos ni impuestos.",
      "Compáralo siempre con el margen operativo y el neto.",
    ],
    reto:
      "PV $250 y COGS $150. Calcula el margen bruto y el markup equivalente.",
    pista:
      "GB = $100; margen bruto = 40%; markup = 66,67%.",
  },
  "aritmetica-margen-operativo": {
    idea:
      "El margen operativo mide la eficiencia del motor del negocio antes de la deuda y los impuestos. Si no alcanza, el problema está en la operación, no en el financiamiento.",
    modelo:
      "Es la potencia del motor antes de contar el desgaste de las piezas y el combustible.",
    checklist: [
      "EBIT = ventas - COGS - gastos operativos.",
      "Margen operativo = (EBIT / ventas) × 100.",
      "Excluye intereses e impuestos por definición.",
      "Compáralo con el margen bruto para ver el peso de la estructura.",
    ],
    reto:
      "Ventas $5,000, COGS $3,000 y gastos operativos $1,200. Calcula EBIT, margen operativo y margen bruto.",
    pista:
      "GB = $2,000 (40%); EBIT = $800; margen operativo = 16%.",
  },
  "aritmetica-margen-neto": {
    idea:
      "El margen neto es la nota final del negocio: cuánto de cada venta sobrevive después de costos, gastos, impuestos e intereses.",
    modelo:
      "Es la nota final del examen: después de todas las materias, es lo que realmente quedó de tu esfuerzo.",
    checklist: [
      "Margen neto = (Utilidad neta / Ventas) × 100.",
      "Se calcula sobre la venta, igual que el margen bruto y el operativo.",
      "Incluye impuestos e intereses.",
      "Un margen neto positivo y creciente indica buena salud.",
    ],
    reto:
      "Ventas $10,000, COGS $6,000, gastos $2,000, impuestos $600 e intereses $200. Calcula la utilidad neta y el margen neto.",
    pista:
      "Utilidad neta = $1,200; margen neto = 12%.",
  },
  "aritmetica-markup": {
    idea:
      "El markup es el recargo porcentual sobre el costo. Suena parecido al margen, pero usa otra base: confundirlos es el error de precios más común.",
    modelo:
      "Es la rampa que agregas sobre el costo para llegar al precio: si la rampa es del 50%, el precio sube la mitad de lo que costó.",
    checklist: [
      "Markup = ((PV - PC) / PC) × 100.",
      "El margen sobre venta usa el PV como base, no el costo.",
      "Markup del 100% equivale a margen de venta del 50%.",
      "Convierte siempre la base antes de comparar dos porcentajes.",
    ],
    reto:
      "Costo $80 y precio de venta $120. Calcula el markup y el margen sobre la venta.",
    pista:
      "Ganancia $40. Markup = 50%; margen sobre venta = 33,33%.",
  },
  "aritmetica-cogs": {
    idea:
      "El COGS es el costo de lo que realmente se vendió, no de todo lo que se compró. Separarlo bien es la base de una ganancia bruta confiable.",
    modelo:
      "Es el costo de los ingredientes usados en los platos vendidos, no de todo lo que hay en la despensa.",
    checklist: [
      "COGS = Inventario inicial + Compras - Inventario final.",
      "Solo incluye costos directos de los bienes vendidos.",
      "Un inventario final inflado reduce artificialmente el COGS.",
      "Resta el COGS a las ventas para obtener la ganancia bruta.",
    ],
    reto:
      "Inventario inicial $900, compras $2,100, inventario final $600 y ventas $3,000. Calcula COGS y margen bruto.",
    pista:
      "COGS = 900 + 2,100 - 600 = $2,400; GB = $600; margen bruto = 20%.",
  },
  "aritmetica-ebitda": {
    idea:
      "El EBITDA mide la capacidad operativa antes de intereses, impuestos y amortizaciones. Es útil para comparar, pero no reemplaza al flujo de caja.",
    modelo:
      "Es medir la fuerza del motor sin contar el desgaste de las piezas ni el combustible.",
    checklist: [
      "EBITDA = Utilidad neta + impuestos + intereses + D&A.",
      "No descuenta inversiones ni capital de trabajo.",
      "EBITDA positivo no garantiza liquidez.",
      "Margen EBITDA = EBITDA / ventas × 100.",
    ],
    reto:
      "Utilidad neta $300, impuestos $120, intereses $80, depreciación $100 y amortización $50. Calcula el EBITDA.",
    pista:
      "EBITDA = 300 + 120 + 80 + 100 + 50 = $650.",
  },
  "aritmetica-roi": {
    idea:
      "El ROI compara el beneficio con la inversión que lo hizo posible. Sin el monto invertido, el beneficio solo no dice si la apuesta valió la pena.",
    modelo:
      "Es la nota de una apuesta: cuánto recuperaste por cada ficha que pusiste.",
    checklist: [
      "ROI = (Beneficio / Inversión) × 100.",
      "Usa beneficio neto, no ingresos.",
      "Considera el tiempo: un ROI anual no es lo mismo que uno trienal.",
      "Compáralo con el costo de oportunidad del dinero.",
    ],
    reto:
      "Inviertes $5,000 y obtienes un beneficio neto de $1,250 en dos años. Calcula el ROI total y el anualizado.",
    pista:
      "ROI total = 25%; ROI anualizado = 12,5%.",
  },
  "aritmetica-punto-equilibrio": {
    idea:
      "El punto de equilibrio es la raya que separa perder de ganar. No es la meta: es el mínimo que hay que vender para que la estructura no consuma el negocio.",
    modelo:
      "Es la raya del campo: por debajo pierdes, por encima empiezas a ganar.",
    checklist: [
      "Margen de contribución = PV unitario - CV unitario.",
      "Q* = Costos fijos / margen de contribución.",
      "Ventas de equilibrio = Q* × PV unitario.",
      "Si el margen de contribución es negativo, nunca se llega al equilibrio.",
    ],
    reto:
      "Costos fijos $4,000, PV $50 y costo variable $30. Calcula el punto de equilibrio en unidades y en ventas.",
    pista:
      "Contribución = $20; Q* = 200 unidades; ventas = $10,000.",
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
