/**
 * Contenido curado de los conceptos de Aritmética Comercial y Financiera.
 *
 * Cada concepto se publica como un apunte independiente con su propio
 * simulador y su laboratorio (misiones + paso a paso). El contenido parte de
 * "Aritmética Comercial y Financiera.txt", "Aritmetica Fianaciera.txt" y
 * "Documentos Comerciales.txt" (sección de Interés Compuesto).
 */

export const GRUPOS = [
  {
    seccion: "Precios y márgenes",
    conceptos: [
      "aritmetica-precio-lista",
      "aritmetica-precio-costo",
      "aritmetica-ganancia-perdida",
      "aritmetica-margen-ganancia",
    ],
  },
  {
    seccion: "Descuentos y proporciones",
    conceptos: [
      "aritmetica-descuento",
      "aritmetica-descuentos-sucesivos",
      "aritmetica-regla-tres",
    ],
  },
  {
    seccion: "Rentabilidad del negocio",
    conceptos: ["aritmetica-pv-ganancia", "aritmetica-caso-integrador"],
  },
  {
    seccion: "Interés y crecimiento",
    conceptos: ["aritmetica-interes-compuesto"],
  },
];

export const CONCEPTOS = [
  {
    id: "aritmetica-precio-lista",
    titulo: "Precio de Lista (PL)",
    icon: "🏷️",
    firma: "PL = Precio de Costo + Ganancia",
    simuladorTipo: "precio-lista",
    definicion: [
      "El **Precio de Lista (PL)** es el precio oficial o de catálogo de un producto o servicio, antes de aplicar cualquier descuento, rebaja o impuesto.",
      "Es el precio que aparece en la lista del vendedor y sirve como base para calcular descuentos y negociaciones.",
    ],
    queEs: [
      "Es el precio de referencia del producto.",
      "Se forma sumando al precio de costo la ganancia esperada.",
      "No siempre es el precio final que paga el cliente.",
    ],
    paraQueSirve: [
      "Fijar precios de catálogo: mostrar una referencia estable antes de negociar.",
      "Calcular descuentos: aplicar el porcentaje sobre una base conocida.",
      "Comparar productos: usar el mismo criterio en toda la tienda.",
      "Negociar con clientes: saber cuánto margen se puede ceder.",
      "Elaborar presupuestos: proyectar ingresos con precios de lista.",
      "Comunicar ofertas: enseñar el precio anterior y el precio final.",
    ],
    comoFunciona: [
      "Se parte del costo del producto y se suma la ganancia deseada: PL = PC + Ganancia.",
      "Si luego hay un descuento, el precio final se obtiene restando ese porcentaje sobre el PL, nunca sobre el costo.",
    ],
    errores: [
      "Confundir el precio de lista con el precio final: el cliente paga después del descuento.",
      "Calcular el descuento sobre el costo: la base correcta siempre es el precio de lista.",
      "Olvidar impuestos y cargos: el precio de lista puede no incluir IVA, envío o comisiones.",
    ],
    casos: [
      "Una tienda de ropa: una camisa tiene precio de lista de $50 antes de cualquier rebaja.",
      "Un catálogo mayorista: el precio de lista se negocia por volumen con cada distribuidor.",
      "Una promoción: se muestra el PL tachado y el precio final con descuento.",
    ],
    relacion: [
      "Se conecta con el Precio de Costo, la Ganancia y los Descuentos Sucesivos.",
      "Es la base de todo cálculo comercial: sin PL no hay descuento medible.",
    ],
    analogia:
      "El precio de lista es como la etiqueta de una vitrina: marca el valor oficial antes de que empiece la conversación con el cliente.",
    notasPersonales: [
      "Nunca calcules un descuento sobre el costo si el porcentaje se anuncia sobre el precio de lista.",
      "Un PL alto con descuentos agresivos puede esconder un margen real muy bajo.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Identifica el precio de costo (PC) del producto.",
          "2️⃣ Define la ganancia que quieres obtener por unidad.",
          "3️⃣ Suma costo más ganancia para obtener el precio de lista: PL = PC + Ganancia.",
          "4️⃣ Si hay descuento, calcula el porcentaje sobre el PL y réstalo.",
          "5️⃣ Verifica que el precio final siga cubriendo el costo.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "Costo: $30 · Ganancia: $20 → Precio de Lista = $30 + $20 = $50.",
          "Descuento del 20% sobre $50 → $10 de descuento → Precio final = $40.",
          "Ganancia real = $40 - $30 = $10 (20% sobre el costo).",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-precio-costo",
    titulo: "Precio de Costo (PC)",
    icon: "📦",
    firma: "PC = Precio de Lista - Ganancia",
    simuladorTipo: "precio-costo",
    definicion: [
      "El **Precio de Costo (PC)** es lo que le cuesta al vendedor adquirir o producir un producto o servicio.",
      "Incluye compra, producción, transporte y almacenamiento, pero no el margen de ganancia.",
    ],
    queEs: [
      "Es el punto de partida para calcular cualquier ganancia.",
      "Puede ser fijo o variable según el volumen y el proveedor.",
      "No incluye el margen comercial ni el precio de venta.",
    ],
    paraQueSirve: [
      "Calcular la ganancia: restar el costo al precio de venta.",
      "Definir el precio de lista: sumar al costo la ganancia objetivo.",
      "Evaluar proveedores: comparar costos de adquisición.",
      "Controlar inventario: valorar las existencias al costo.",
      "Medir rentabilidad: saber cuánto cuesta realmente vender.",
      "Tomar decisiones: aceptar o rechazar una oferta de compra.",
    ],
    comoFunciona: [
      "El costo se obtiene de la factura del proveedor más los gastos directos de traer el producto.",
      "Si conoces el precio de lista y la ganancia, despejas el costo: PC = PL - Ganancia.",
    ],
    errores: [
      "Olvidar costos indirectos: transporte, almacenaje y mermas también cuestan.",
      "Mezclar costo con precio de venta: son conceptos distintos y no se restan al azar.",
      "Usar un costo viejo: el proveedor puede haber cambiado sus precios.",
    ],
    casos: [
      "Una importación: sumar flete, seguro y aduana al costo de la mercancía.",
      "Una panadería: calcular harina, levadura, energía y mano de obra por unidad.",
      "Una tienda online: incluir embalaje y envío en el costo real del pedido.",
    ],
    relacion: [
      "Se conecta con el Precio de Lista, la Ganancia y el Margen de Ganancia.",
      "El margen siempre se calcula sobre el costo, no sobre el precio de venta.",
    ],
    analogia:
      "El precio de costo son los ingredientes de una receta: sin saber cuánto cuestan, no puedes decidir a qué precio vender el plato.",
    notasPersonales: [
      "Registra el costo actualizado: un margen calculado con costos viejos es un margen falso.",
      "Separa costo directo de gasto operativo para no confundir ganancia bruta con neta.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Reúne la factura de compra del producto.",
          "2️⃣ Suma flete, seguro, embalaje y otros gastos directos.",
          "3️⃣ Divide entre las unidades compradas para obtener el costo unitario.",
          "4️⃣ Resta el costo al precio de lista para conocer la ganancia.",
          "5️⃣ Revisa el costo cada vez que cambie el proveedor.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "Precio de lista: $50 · Ganancia: $20 → Costo = $50 - $20 = $30.",
          "Si el flete sube $3, el nuevo costo es $33 y la ganancia baja a $17 si el PL no cambia.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-ganancia-perdida",
    titulo: "Ganancia y Pérdida",
    icon: "📈",
    firma: "Ganancia = PV - PC · Pérdida = PC - PV",
    simuladorTipo: "ganancia-perdida",
    definicion: [
      "La **Ganancia** es la diferencia positiva entre el precio de venta y el precio de costo; la pérdida aparece cuando el precio de venta es menor que el costo.",
      "Ambas se expresan en dinero y permiten saber si una operación comercial deja o consume valor.",
    ],
    queEs: [
      "Ganancia: ingreso que queda después de cubrir el costo.",
      "Pérdida: dinero que se pierde cuando se vende por debajo del costo.",
      "Resultado: indicador directo de si la operación conviene.",
    ],
    paraQueSirve: [
      "Medir resultados: saber si una venta deja dinero o lo consume.",
      "Fijar precios mínimos: evitar vender por debajo del costo.",
      "Comparar productos: detectar cuáles son más rentables.",
      "Tomar decisiones: continuar, ajustar o retirar un producto.",
      "Negociar descuentos: conocer cuánto se puede ceder sin perder.",
      "Evaluar promociones: comprobar si la oferta sigue siendo rentable.",
    ],
    comoFunciona: [
      "Se comparan dos valores: precio de venta y precio de costo.",
      "Si PV > PC hay ganancia; si PV < PC hay pérdida; si PV = PC el resultado es cero.",
    ],
    errores: [
      "Ignorar gastos: una ganancia bruta puede convertirse en pérdida neta.",
      "Confundir ganancia con margen: la ganancia es dinero y el margen es porcentaje.",
      "Vender bajo costo sin estrategia: una pérdida no se compensa sola.",
    ],
    casos: [
      "Compra a $30 y venta a $50: ganancia de $20.",
      "Compra a $50 y venta a $30: pérdida de $20.",
      "Liquidación de temporada: vender bajo costo para liberar inventario puede ser deliberado.",
    ],
    relacion: [
      "Se conecta con el Precio de Costo, el Precio de Venta y el Margen.",
      "Una ganancia positiva no garantiza rentabilidad si los gastos superan el margen.",
    ],
    analogia:
      "La ganancia y la pérdida son el marcador de un partido: te dicen si vas ganando o perdiendo, pero no explican por sí solas la estrategia del equipo.",
    notasPersonales: [
      "Ganancia no es lo mismo que flujo de caja: puedes ganar y quedarte sin liquidez.",
      "Antes de celebrar una ganancia, descuenta impuestos y gastos operativos.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Anota el precio de venta real de la operación.",
          "2️⃣ Anota el precio de costo unitario.",
          "3️⃣ Resta venta menos costo para obtener la ganancia.",
          "4️⃣ Si el resultado es negativo, calcula la pérdida como costo menos venta.",
          "5️⃣ Revisa si los gastos adicionales cambian el resultado.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "PV = $50 · PC = $30 → Ganancia = $50 - $30 = $20.",
          "PV = $30 · PC = $50 → Pérdida = $50 - $30 = $20.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-margen-ganancia",
    titulo: "Margen de Ganancia",
    icon: "💹",
    firma: "Margen (%) = (Ganancia / Precio de Costo) × 100",
    simuladorTipo: "margen-ganancia",
    definicion: [
      "El **Margen de Ganancia** expresa la ganancia como porcentaje del precio de costo, lo que permite comparar productos de distinto valor.",
      "No es lo mismo que el markup sobre el precio de venta: aquí la base siempre es el costo.",
    ],
    queEs: [
      "Es una medida relativa de rentabilidad.",
      "Se calcula dividiendo la ganancia entre el costo.",
      "Permite comparar productos aunque sus precios sean muy distintos.",
    ],
    paraQueSirve: [
      "Comparar rentabilidad: evaluar productos con precios diferentes.",
      "Fijar precios: aplicar un margen objetivo sobre el costo.",
      "Negociar con proveedores: saber cuánto margen se pierde al subir el costo.",
      "Analizar promociones: medir el impacto de un descuento.",
      "Planificar ventas: estimar la ganancia esperada por línea.",
      "Detectar productos débiles: identificar márgenes por debajo del objetivo.",
    ],
    comoFunciona: [
      "Ganancia = Precio de Venta - Precio de Costo.",
      "Margen (%) = (Ganancia / Precio de Costo) × 100.",
      "Si el costo es $30 y la ganancia es $20, el margen es 66.67%.",
    ],
    errores: [
      "Calcular el margen sobre el precio de venta: la fórmula correcta usa el costo.",
      "Confundir margen con markup: son bases distintas y dan porcentajes distintos.",
      "Ignorar gastos: el margen bruto no descuenta gastos operativos.",
    ],
    casos: [
      "Dos productos con precios distintos: el margen permite compararlos de forma justa.",
      "Un proveedor sube el costo: recalcular el margen antes de mantener el precio.",
      "Una promoción: medir si el descuento deja el margen por encima del mínimo.",
    ],
    relacion: [
      "Se conecta con la Ganancia, el Precio de Costo y el Precio de Lista.",
      "El margen neto es la versión que sí descuenta gastos e impuestos.",
    ],
    analogia:
      "El margen es como la nota porcentual de una prueba: no importa cuántos puntos valía el examen, sino qué proporción lograste.",
    notasPersonales: [
      "Un margen del 50% sobre el costo no equivale a un margen del 50% sobre la venta.",
      "Fija un margen mínimo y no lo cruces ni en promociones.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Calcula la ganancia: PV - PC.",
          "2️⃣ Divide la ganancia entre el precio de costo.",
          "3️⃣ Multiplica por 100 para obtener el porcentaje.",
          "4️⃣ Compara el resultado con tu margen objetivo.",
          "5️⃣ Repite el cálculo con el costo actualizado.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "Ganancia = $20 · Costo = $30 → Margen = (20 / 30) × 100 = 66.67%.",
          "Si el costo sube a $35 manteniendo el PV en $50 → Margen = (15 / 35) × 100 = 42.86%.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-descuento",
    titulo: "Descuento Simple",
    icon: "✂️",
    firma: "PF = PL - (PL × d / 100)",
    simuladorTipo: "descuento",
    definicion: [
      "El **descuento simple** es una reducción porcentual que se aplica una sola vez sobre el precio de lista.",
      "El precio final se obtiene restando al precio de lista el importe del descuento.",
    ],
    queEs: [
      "Es una rebaja única expresada como porcentaje del precio de lista.",
      "El porcentaje se calcula siempre sobre el precio original.",
      "El precio final es lo que realmente paga el cliente.",
    ],
    paraQueSirve: [
      "Calcular rebajas: obtener el precio final de una promoción.",
      "Aplicar cupones: descontar un porcentaje fijo sobre el precio de lista.",
      "Negociar precios: cuantificar una rebaja puntual.",
      "Comparar ofertas: medir el ahorro real de cada descuento.",
      "Fijar precios promocionales: elegir el porcentaje sin cruzar el costo.",
      "Comunicar ahorros: mostrar cuánto se reduce el precio.",
    ],
    comoFunciona: [
      "Descuento = Precio de Lista × (porcentaje / 100).",
      "Precio final = Precio de Lista - Descuento.",
      "Un descuento del 20% sobre $50 deja el precio final en $40.",
    ],
    errores: [
      "Calcular el descuento sobre el costo: la base correcta es el precio de lista.",
      "Sumar descuentos de distintas etapas: el descuento simple se aplica una sola vez.",
      "Olvidar que el descuento reduce la ganancia: revisa el margen después de la rebaja.",
    ],
    casos: [
      "Una camisa de $50 con 20% de descuento: precio final $40.",
      "Un cupón de bienvenida: 15% sobre el primer pedido.",
      "Una liquidación puntual: 30% sobre una línea seleccionada.",
    ],
    relacion: [
      "Se conecta con el Precio de Lista, el Precio Final y el Margen de Ganancia.",
      "Si hay varios descuentos en cadena, usa el concepto de Descuentos Sucesivos.",
    ],
    analogia:
      "Un descuento simple es como recortar una sola vez una tira de papel: lo que quitas ya no vuelve a descontarse.",
    notasPersonales: [
      "Distingue descuento simple de sucesivo antes de calcular.",
      "Comprueba que el precio final siga cubriendo el costo.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Identifica el precio de lista del producto.",
          "2️⃣ Convierte el porcentaje de descuento a tanto por uno.",
          "3️⃣ Multiplica el precio de lista por ese porcentaje.",
          "4️⃣ Resta el descuento al precio de lista para obtener el precio final.",
          "5️⃣ Verifica que el precio final cubra el costo.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "PL = $50 · Descuento = 20% → D = 50 × 0.20 = $10.",
          "Precio final = $50 - $10 = $40.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-descuentos-sucesivos",
    titulo: "Descuentos Sucesivos",
    icon: "🎁",
    firma: "DU = 100 - [(100-d1)(100-d2)...] / 100^(n-1)",
    simuladorTipo: "descuentos-sucesivos",
    definicion: [
      "Un **descuento sucesivo** aplica varios porcentajes uno después de otro sobre el precio ya rebajado, no sobre el precio original.",
      "Por eso dos descuentos del 20% y 10% no suman 30%: el descuento único equivalente es 28%.",
    ],
    queEs: [
      "Cadena de descuentos: cada porcentaje se aplica sobre el precio ya rebajado.",
      "Descuento sucesivo: varios porcentajes aplicados en cadena.",
      "Descuento único equivalente: el porcentaje total que produce el mismo precio final.",
    ],
    paraQueSirve: [
      "Aplicar promociones: combinar rebajas sin sumar porcentajes incorrectamente.",
      "Calcular el precio final: conocer cuánto paga realmente el cliente.",
      "Comparar ofertas: convertir cadenas de descuentos a un solo porcentaje.",
      "Negociar con distribuidores: manejar descuentos por volumen y pronto pago.",
      "Controlar márgenes: saber cuánto queda después de varias rebajas.",
      "Diseñar campañas: elegir la combinación que comunica mejor el ahorro.",
    ],
    comoFunciona: [
      "Cada descuento se aplica sobre el precio que quedó del paso anterior.",
      "Para dos descuentos: Precio final = PL × (1 - d1) × (1 - d2).",
      "El descuento único equivalente se obtiene con DU = 100 - [(100-d1)(100-d2)] / 100.",
    ],
    errores: [
      "Sumar porcentajes: 20% + 10% no es 30%, sino 28%.",
      "Aplicar cada descuento sobre el precio original: el segundo debe ir sobre el precio ya rebajado.",
      "Olvidar el orden: aunque el resultado final no cambie, el cálculo intermedio sí.",
    ],
    casos: [
      "Una liquidación: 20% de temporada y 10% adicional con tarjeta.",
      "Un mayorista: 10% por volumen, 20% por campaña y 30% por pronto pago.",
      "Una tienda online: cupón del 15% sobre un producto ya rebajado un 25%.",
    ],
    relacion: [
      "Se conecta con el Precio de Lista, el Precio Final y el Margen.",
      "La regla de tres simple permite verificar cada paso del descuento.",
    ],
    analogia:
      "Los descuentos sucesivos son como pelar una fruta: cada capa se quita sobre lo que queda, no sobre la fruta entera.",
    notasPersonales: [
      "Para comparar ofertas, convierte siempre a descuento único equivalente.",
      "Un descuento sucesivo grande puede dejar el precio por debajo del costo.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Toma el precio de lista como base inicial.",
          "2️⃣ Aplica el primer descuento y obtén el primer precio rebajado.",
          "3️⃣ Aplica el segundo descuento sobre ese nuevo precio, no sobre el original.",
          "4️⃣ Repite con cada descuento adicional.",
          "5️⃣ Convierte la cadena a descuento único para comparar ofertas.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "PL = $100 · 20% → $80 · 10% sobre $80 → $72.",
          "Descuento total = $28 → 28%, no 30%.",
          "Tres descuentos 10%, 20% y 30% → 100 - (90 × 80 × 70) / 10000 = 49.6%.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-regla-tres",
    titulo: "Regla de Tres Simple",
    icon: "🔁",
    firma: "x = (b × c) / a",
    simuladorTipo: "regla-tres",
    definicion: [
      "La **regla de tres simple** resuelve problemas de proporcionalidad entre dos magnitudes cuando se conocen tres valores y falta el cuarto.",
      "Es la herramienta universal de la aritmética comercial: sirve para descuentos, ganancias, márgenes y precios.",
    ],
    queEs: [
      "Es una proporción entre dos columnas de datos.",
      "Puede ser directa (ambas magnitudes crecen juntas) o inversa.",
      "Permite despejar cualquier valor desconocido de la proporción.",
    ],
    paraQueSirve: [
      "Calcular descuentos: encontrar cuánto corresponde a otro precio.",
      "Calcular el precio final: obtener el valor después de un porcentaje.",
      "Calcular la ganancia: proyectar la ganancia a otra cantidad.",
      "Calcular el margen: despejar el porcentaje que falta.",
      "Calcular el precio de lista: reconstruir el 100% desde el precio final.",
      "Resolver recetas y mezclas: escalar cantidades de forma proporcional.",
    ],
    comoFunciona: [
      "Se ordenan los datos en dos columnas: a → b y c → x.",
      "Se multiplica en cruz y se divide: x = (b × c) / a.",
      "Antes de calcular, verifica si la proporcionalidad es directa o inversa.",
    ],
    errores: [
      "Invertir la proporción: ordena primero las magnitudes correctamente.",
      "Usar regla de tres inversa cuando es directa: revisa cómo cambian las magnitudes.",
      "Olvidar las unidades: mezclar pesos, porcentajes y unidades da resultados falsos.",
    ],
    casos: [
      "Si 5 productos cuestan $100, ¿cuánto cuestan 8? → (100 × 8) / 5 = $160.",
      "Si $100 generan $20 de descuento, ¿cuánto descuento hay sobre $50? → $10.",
      "Si el costo es $30 y la ganancia $20, ¿qué margen hay? → 66.67%.",
    ],
    relacion: [
      "Se conecta con todos los conceptos de aritmética comercial.",
      "Es la forma más rápida de comprobar un descuento o un margen.",
    ],
    analogia:
      "La regla de tres es una balanza: si conoces tres pesas, puedes calcular la cuarta sin adivinar.",
    notasPersonales: [
      "Ordenar bien los datos es más importante que hacer la multiplicación.",
      "Si el resultado no tiene sentido, revisa la proporcionalidad antes de repetir la cuenta.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Identifica los tres datos conocidos y el dato que falta.",
          "2️⃣ Ordénalos en dos columnas: a → b y c → x.",
          "3️⃣ Comprueba si la proporción es directa o inversa.",
          "4️⃣ Multiplica en cruz y divide: x = (b × c) / a.",
          "5️⃣ Verifica que el resultado sea coherente con el problema.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "5 productos → $100 · 8 productos → x.",
          "x = (100 × 8) / 5 = $160.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-pv-ganancia",
    titulo: "PV, Ganancia Bruta y Ganancia Neta",
    icon: "💰",
    firma: "PV, ganancia bruta, ganancia neta y márgenes",
    simuladorTipo: "pv-ganancias",
    definicion: [
      "La **Ganancia Bruta** es la diferencia entre el Precio de Venta (PV) y el Costo Directo del producto, sin descontar gastos operativos ni impuestos.",
      "La Ganancia Neta resta además los gastos operativos, impuestos e intereses, y muestra la rentabilidad real del negocio.",
    ],
    queEs: [
      "PV: precio final que paga el cliente.",
      "Ganancia Bruta: PV menos costo directo.",
      "Ganancia Neta: PV menos todos los costos y gastos.",
      "Margen Bruto: Ganancia Bruta dividida entre el PV.",
      "Margen Neto: Ganancia Neta dividida entre el PV.",
    ],
    paraQueSirve: [
      "Fijar precios: determinar el PV que permite la ganancia neta deseada.",
      "Evaluar productos: comparar ganancia bruta y neta entre líneas.",
      "Decidir inversiones: saber si un producto o negocio es rentable.",
      "Negociar con proveedores: reducir el costo directo para mejorar el margen.",
      "Controlar gastos: recortar gastos operativos para aumentar la ganancia neta.",
      "Elaborar presupuestos: proyectar ingresos, costos y resultado final.",
    ],
    comoFunciona: [
      "Ganancia Bruta = PV - Costo Directo.",
      "Ganancia Neta = Ganancia Bruta - Gastos Operativos - Impuestos - Intereses.",
      "Margen Bruto (%) = (Ganancia Bruta / PV) × 100.",
      "Margen Neto (%) = (Ganancia Neta / PV) × 100.",
    ],
    errores: [
      "Confundir ganancia bruta con ganancia neta: la bruta no descuenta gastos operativos.",
      "No incluir todos los costos en la ganancia neta: la rentabilidad queda inflada.",
      "Calcular el margen sobre el costo en lugar del PV: el porcentaje resulta incorrecto.",
    ],
    casos: [
      "Una pizzería: la ganancia bruta mide ingredientes contra precio; la neta incluye alquiler y sueldos.",
      "Una tienda: comparar margen bruto y neto entre productos para decidir cuáles priorizar.",
      "Un servicio: incluir impuestos e intereses para conocer la ganancia real.",
    ],
    relacion: [
      "Se conecta con el Precio de Costo, el Margen de Ganancia y el Caso Integrador.",
      "El margen bruto es el primer filtro; el margen neto es la realidad del negocio.",
    ],
    analogia:
      "La ganancia bruta es lo que queda después de pagar los ingredientes de la pizza; la neta es lo que queda después de pagar también el local, la luz y los impuestos.",
    notasPersonales: [
      "Si la ganancia bruta es negativa, el producto no es rentable ni antes de los gastos.",
      "La ganancia neta es la que importa para decidir si el negocio sigue en pie.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Identifica el Precio de Venta (PV).",
          "2️⃣ Resta el Costo Directo para obtener la Ganancia Bruta.",
          "3️⃣ Resta gastos operativos, impuestos e intereses para obtener la Ganancia Neta.",
          "4️⃣ Divide cada ganancia entre el PV y multiplica por 100 para los márgenes.",
          "5️⃣ Compara ambos márgenes para entender cuánto consumen los gastos.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "PV = $100 · Costo Directo = $60 → Ganancia Bruta = $40 (40%).",
          "Gastos $20 + impuestos $5 + intereses $2 → Ganancia Neta = $13 (13%).",
          "Los gastos, impuestos e intereses consumen 27% de las ventas.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-interes-compuesto",
    titulo: "Interés Compuesto",
    icon: "🌱",
    firma: "M = C × (1 + i/m)^(n×m)",
    simuladorTipo: "interes-compuesto",
    definicion: [
      "El **interés compuesto** se calcula sobre el capital inicial más los intereses acumulados de períodos anteriores.",
      "A diferencia del interés simple, genera intereses sobre intereses y produce un crecimiento exponencial del capital.",
    ],
    queEs: [
      "Es el efecto bola de nieve de las finanzas.",
      "Cada período suma los intereses al capital y el siguiente período calcula sobre ese nuevo monto.",
      "Cuanto más frecuente es la capitalización, mayor es el monto final.",
    ],
    paraQueSirve: [
      "Proyectar inversiones: estimar cuánto crecerá un capital en el tiempo.",
      "Comparar productos financieros: evaluar tasas y capitalizaciones distintas.",
      "Planificar ahorro: saber cuánto aportar para llegar a una meta.",
      "Calcular deudas: entender cómo crece un saldo impago.",
      "Evaluar créditos: comparar el costo real de distintas tasas.",
      "Enseñar educación financiera: mostrar el valor del tiempo en el dinero.",
    ],
    comoFunciona: [
      "Monto final: M = C × (1 + i/m)^(n×m), donde C es el capital, i la tasa anual, n los años y m las capitalizaciones por año.",
      "Intereses generados: I = M - C.",
      "Tasa efectiva anual: (1 + i/m)^m - 1.",
    ],
    errores: [
      "Usar la fórmula de interés simple: el compuesto capitaliza los intereses de cada período.",
      "Olvidar la capitalización: una tasa anual con capitalización mensual no es lo mismo que anual.",
      "Confundir tasa nominal con efectiva: la efectiva incluye el efecto de capitalizar.",
    ],
    casos: [
      "Un depósito a plazo: $1,000 al 10% anual durante 5 años.",
      "Una tarjeta de crédito: el saldo impago crece con intereses sobre intereses.",
      "Un fondo de inversión: comparar dos tasas con capitalización mensual y anual.",
    ],
    relacion: [
      "Se conecta con la Regla de Tres y con el Caso Integrador.",
      "El interés simple es un caso especial cuando no se reinvierten los intereses.",
    ],
    analogia:
      "El interés compuesto es una bola de nieve que rueda cuesta abajo: cada vuelta recoge más nieve y la siguiente vuelta recoge todavía más.",
    notasPersonales: [
      "La regla del 72 estima los años para duplicar un capital: 72 / tasa anual.",
      "La frecuencia de capitalización importa: mensual crece más que anual con la misma tasa nominal.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Identifica el capital inicial C.",
          "2️⃣ Convierte la tasa anual i a tanto por uno y divídela entre las capitalizaciones m.",
          "3️⃣ Calcula el número total de períodos: n × m.",
          "4️⃣ Aplica M = C × (1 + i/m)^(n×m).",
          "5️⃣ Resta el capital para obtener los intereses: I = M - C.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "C = $1,000 · i = 10% · n = 3 años · m = 1 → M = 1000 × 1.1³ = $1,331.",
          "Intereses = $1,331 - $1,000 = $331.",
          "Con capitalización mensual: M = 1000 × (1 + 0.10/12)^(36) ≈ $1,348.18.",
        ],
      },
    ],
    fuente: "Documentos Comerciales · Interés Compuesto · Notion",
  },
  {
    id: "aritmetica-caso-integrador",
    titulo: "Caso Integrador de Aritmética Comercial",
    icon: "🧩",
    firma: "Costo → ganancia → precio de lista → descuento → precio final",
    simuladorTipo: "caso-integrador",
    definicion: [
      "El **caso integrador** combina costo, ganancia, precio de lista, descuento y precio final en una sola operación comercial.",
      "Sirve para comprobar que un descuento anunciado no destruye el margen real del negocio.",
    ],
    queEs: [
      "Es un problema completo de aritmética comercial.",
      "Encadena varios conceptos en el orden en que ocurren en una venta.",
      "Permite verificar el resultado final y la ganancia real.",
    ],
    paraQueSirve: [
      "Resolver ventas reales: calcular el precio final de una operación completa.",
      "Verificar márgenes: comprobar cuánto queda después del descuento.",
      "Diseñar promociones: saber si la oferta sigue siendo rentable.",
      "Capacitar equipos: practicar el flujo completo de una venta.",
      "Auditar precios: detectar cálculos inconsistentes en catálogos.",
      "Tomar decisiones: aceptar o rechazar una negociación con datos.",
    ],
    comoFunciona: [
      "Se parte del costo y se suma la ganancia para obtener el precio de lista.",
      "Se aplica el descuento sobre el precio de lista para obtener el precio final.",
      "Se compara el precio final con el costo para conocer la ganancia real.",
    ],
    errores: [
      "Aplicar el descuento sobre el costo: el descuento siempre va sobre el precio de lista.",
      "Suponer que el margen inicial se mantiene: el descuento reduce la ganancia real.",
      "Olvidar los gastos: la ganancia real puede ser menor que la calculada.",
    ],
    casos: [
      "Una empresa compra a $80, quiere 25% de ganancia y ofrece 10% de descuento.",
      "Una tienda combina ganancia objetivo y cupón de bienvenida.",
      "Un distribuidor negocia precio de lista, descuento por volumen y pronto pago.",
    ],
    relacion: [
      "Integra Precio de Costo, Ganancia, Precio de Lista y Descuentos.",
      "Es la prueba final de que dominas los conceptos anteriores.",
    ],
    analogia:
      "El caso integrador es como armar un rompecabezas: cada pieza tiene su fórmula y el resultado solo aparece cuando todas encajan.",
    notasPersonales: [
      "Resuelve siempre en orden: costo → ganancia → lista → descuento → final.",
      "Comprueba la ganancia real al final: es la que decide si la venta conviene.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Anota el precio de costo.",
          "2️⃣ Calcula la ganancia deseada y súmala para obtener el precio de lista.",
          "3️⃣ Aplica el descuento sobre el precio de lista.",
          "4️⃣ Obtén el precio final.",
          "5️⃣ Resta el costo al precio final para conocer la ganancia real.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "Costo = $80 · Ganancia 25% = $20 → Precio de Lista = $100.",
          "Descuento 10% sobre $100 = $10 → Precio Final = $90.",
          "Ganancia real = $90 - $80 = $10 (12.5% sobre el costo).",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
];

export const CONCEPTOS_POR_ID = Object.fromEntries(
  CONCEPTOS.map((concepto) => [concepto.id, concepto]),
);
