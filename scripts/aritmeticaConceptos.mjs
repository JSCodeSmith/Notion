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
      "aritmetica-ganancia",
      "aritmetica-perdida",
      "aritmetica-ganancia-perdida",
      "aritmetica-margen-ganancia",
      "aritmetica-markup",
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
    conceptos: [
      "aritmetica-precio-venta",
      "aritmetica-ganancia-bruta",
      "aritmetica-ganancia-neta",
      "aritmetica-pv-ganancia",
      "aritmetica-cogs",
      "aritmetica-caso-integrador",
    ],
  },
  {
    seccion: "Márgenes e indicadores",
    conceptos: [
      "aritmetica-margen-bruto",
      "aritmetica-margen-operativo",
      "aritmetica-margen-neto",
      "aritmetica-ebitda",
      "aritmetica-roi",
      "aritmetica-punto-equilibrio",
    ],
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
  {
    id: "aritmetica-ganancia",
    titulo: "Ganancia",
    icon: "🟢",
    firma: "Ganancia = PV - PC · Margen = (Ganancia / PC) × 100",
    simuladorTipo: "ganancia",
    definicion: [
      "La **Ganancia** es la diferencia positiva entre el Precio de Venta (PV) y el Precio de Costo (PC): el dinero que queda cuando la venta cubre el costo.",
      "Se expresa en unidades monetarias y puede convertirse en porcentaje (margen) para comparar operaciones de distinto tamaño.",
    ],
    queEs: [
      "Es el resultado positivo de una venta: PV mayor que PC.",
      "Mide cuánto dinero deja cada operación después de cubrir el costo.",
      "Puede ser unitaria (por producto) o total (por período).",
      "No descuenta todavía gastos operativos, impuestos ni intereses.",
    ],
    paraQueSirve: [
      "Medir resultados: saber cuánto dinero deja una venta después del costo.",
      "Fijar precios mínimos: establecer el PV que cubre el costo y deja utilidad.",
      "Comparar productos: detectar qué líneas aportan más dinero por unidad.",
      "Negociar descuentos: conocer cuánto se puede ceder antes de perder.",
      "Evaluar promociones: comprobar si una rebaja mantiene la ganancia.",
      "Planificar metas: estimar cuántas ventas se necesitan para un objetivo.",
    ],
    comoFunciona: [
      "Se identifican dos datos: el Precio de Venta y el Precio de Costo.",
      "Si PV > PC, la ganancia es PV - PC.",
      "El margen sobre el costo se obtiene dividiendo la ganancia entre el PC y multiplicando por 100.",
    ],
    errores: [
      "Confundir ganancia con margen: la ganancia es dinero y el margen es porcentaje.",
      "Ignorar gastos: la ganancia bruta puede convertirse en pérdida neta.",
      "Calcular la ganancia restando el PV al costo: el orden de la resta importa.",
    ],
    casos: [
      "Una tienda compra a $30 y vende a $50: la ganancia es $20.",
      "Un servicio cobra $120 y le cuesta $90: la ganancia es $30.",
      "Una app vende una suscripción de $15 con costo de servidor de $5: gana $10.",
    ],
    relacion: [
      "Se conecta con el Precio de Venta, el Precio de Costo y el Margen de Ganancia.",
      "Cuando el PV es menor que el PC, la ganancia se convierte en pérdida.",
    ],
    analogia:
      "La ganancia es el sobrante que queda en la caja después de pagar la mercadería: no es todo lo que entra, sino lo que realmente queda.",
    notasPersonales: [
      "Ganancia no es flujo de caja: puedes tener ganancia y no haber cobrado todavía.",
      "Antes de celebrar una ganancia, revisa los gastos que aún no has descontado.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Anota el Precio de Venta real de la operación.",
          "2️⃣ Anota el Precio de Costo unitario.",
          "3️⃣ Resta PV - PC para obtener la ganancia en dinero.",
          "4️⃣ Divide la ganancia entre el costo y multiplica por 100 para el margen.",
          "5️⃣ Comprueba que la ganancia cubra también los gastos pendientes.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "PV = $50 · PC = $30 → Ganancia = $50 - $30 = $20.",
          "Margen sobre el costo = (20 / 30) × 100 = 66.67%.",
          "Margen sobre la venta = (20 / 50) × 100 = 40%.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-perdida",
    titulo: "Pérdida",
    icon: "🔴",
    firma: "Pérdida = PC - PV · % Pérdida = (Pérdida / PC) × 100",
    simuladorTipo: "perdida",
    definicion: [
      "La **Pérdida** aparece cuando el Precio de Venta (PV) es menor que el Precio de Costo (PC): la operación devuelve menos dinero del que costó producir o comprar.",
      "Se mide como la diferencia PC - PV y puede expresarse como porcentaje del costo para dimensionar su impacto.",
    ],
    queEs: [
      "Es el resultado negativo de una venta: el PV no cubre el PC.",
      "Representa dinero que la operación consume en lugar de generar.",
      "Puede ser puntual (una liquidación) o estructural (un precio mal fijado).",
      "Se calcula en dinero y se compara con el costo para obtener el porcentaje.",
    ],
    paraQueSirve: [
      "Detectar malas ventas: identificar operaciones que destruyen valor.",
      "Fijar un precio piso: conocer el PV mínimo que evita la pérdida.",
      "Analizar liquidaciones: medir cuánto cuesta liberar inventario.",
      "Corregir costos: actuar cuando el proveedor sube el precio.",
      "Evaluar promociones: comprobar si el descuento cruza el costo.",
      "Aprender de errores: registrar las causas de cada pérdida.",
    ],
    comoFunciona: [
      "Se comparan PV y PC: si PV < PC, hay pérdida.",
      "El monto es PC - PV.",
      "El porcentaje de pérdida sobre el costo es (Pérdida / PC) × 100.",
    ],
    errores: [
      "Vender bajo costo sin estrategia: una pérdida no se compensa sola.",
      "Confundir pérdida con menor ganancia: son resultados distintos.",
      "Olvidar los gastos: una venta puede parecer rentable y ser pérdida neta.",
    ],
    casos: [
      "Compra a $50 y vende a $30: pérdida de $20.",
      "Liquidación de temporada: vender bajo costo para liberar almacén.",
      "Producto dañado: se remata por debajo del costo para recuperar algo.",
    ],
    relacion: [
      "Se conecta con la Ganancia, el Precio de Costo y el Precio de Venta.",
      "Es la señal de alerta que obliga a revisar precio, costo o promoción.",
    ],
    analogia:
      "La pérdida es el hueco que queda cuando el dinero que entra no alcanza a cubrir el que ya salió: hay que taparlo con resultados de otras ventas.",
    notasPersonales: [
      "Una pérdida deliberada y medida puede ser estrategia; una pérdida ignorada es un problema.",
      "Define un precio piso y no lo cruces ni siquiera en campañas.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Anota el Precio de Venta real.",
          "2️⃣ Anota el Precio de Costo unitario.",
          "3️⃣ Compara: si el PV es menor, hay pérdida.",
          "4️⃣ Calcula el monto: Pérdida = PC - PV.",
          "5️⃣ Divide entre el costo y multiplica por 100 para el porcentaje.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "PV = $30 · PC = $50 → Pérdida = $50 - $30 = $20.",
          "Porcentaje de pérdida sobre el costo = (20 / 50) × 100 = 40%.",
          "Para no perder, el PV mínimo debía ser $50.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-precio-venta",
    titulo: "Precio de Venta (PV)",
    icon: "💵",
    firma: "PV = PC + Ganancia · PV = PC × (1 + m/100)",
    simuladorTipo: "precio-venta",
    definicion: [
      "El **Precio de Venta (PV)** es el monto final que paga el cliente por un producto o servicio después de descuentos e impuestos aplicables.",
      "Debe cubrir el costo, los gastos y la ganancia esperada; si no cubre el costo, la operación genera pérdida.",
    ],
    queEs: [
      "Es el ingreso unitario que recibe el negocio por cada venta.",
      "Se fija a partir del costo más la ganancia objetivo.",
      "Puede incluir o excluir impuestos según la política comercial.",
      "Es distinto del precio de lista cuando existen descuentos.",
    ],
    paraQueSirve: [
      "Fijar ingresos: definir cuánto cobrar por cada producto o servicio.",
      "Calcular ganancias: restar el costo al PV para conocer el resultado.",
      "Construir presupuestos: proyectar ventas multiplicando PV por unidades.",
      "Evaluar descuentos: saber cuánto margen se puede ceder.",
      "Comparar competencia: posicionar el precio frente al mercado.",
      "Medir rentabilidad: calcular márgenes sobre la base de las ventas.",
    ],
    comoFunciona: [
      "Se parte del Precio de Costo y se suma la ganancia deseada: PV = PC + Ganancia.",
      "Si la ganancia se define como porcentaje del costo: PV = PC × (1 + m/100).",
      "Si hay descuento, se aplica sobre el precio de lista para llegar al PV final.",
    ],
    errores: [
      "Fijar el PV por debajo del costo: la venta nace con pérdida.",
      "Olvidar gastos e impuestos: el precio cubre el costo pero no el negocio.",
      "Confundir PV con precio de lista: el PV es lo que realmente paga el cliente.",
    ],
    casos: [
      "Una tienda fija un PV de $50 para un producto que le cuesta $30.",
      "Un servicio calcula un PV de $120 con un costo de $90 y 33% de margen.",
      "Una promoción reduce el PV de $100 a $90 aplicando un descuento del 10%.",
    ],
    relacion: [
      "Se conecta con el Precio de Costo, la Ganancia y el Margen de Ganancia.",
      "El PV es la base del margen bruto, del margen neto y del punto de equilibrio.",
    ],
    analogia:
      "El precio de venta es la puerta por donde entra el dinero: si la puerta es más angosta que el costo, el negocio se queda sin aire.",
    notasPersonales: [
      "Todo PV debe cubrir costo, gastos y una ganancia mínima; si no, no es un precio, es una donación.",
      "Revisa el PV cada vez que cambie el costo o la carga impositiva.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Determina el Precio de Costo unitario.",
          "2️⃣ Define el margen o la ganancia objetivo.",
          "3️⃣ Aplica PV = PC × (1 + m/100) o PV = PC + Ganancia.",
          "4️⃣ Suma impuestos y cargos si corresponde.",
          "5️⃣ Comprueba que el PV supere el costo total.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "PC = $80 · margen deseado 25% → PV = 80 × 1.25 = $100.",
          "Si el descuento es 10%, el cliente paga $90 y la ganancia real baja a $10.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-ganancia-bruta",
    titulo: "Ganancia Bruta (GB)",
    icon: "📈",
    firma: "GB = PV - COGS",
    simuladorTipo: "ganancia-bruta",
    definicion: [
      "La **Ganancia Bruta (GB)** es el dinero que queda después de restar al Precio de Venta el costo directo de los bienes vendidos (COGS), sin descontar gastos operativos, impuestos ni intereses.",
      "Mide la rentabilidad del producto antes de la estructura de la empresa.",
    ],
    queEs: [
      "Es el primer nivel de ganancia de la cuenta de resultados.",
      "Solo descuenta el costo directo de producir o comprar lo vendido.",
      "No incluye sueldos administrativos, alquiler, marketing ni impuestos.",
      "Es la base del margen bruto.",
    ],
    paraQueSirve: [
      "Evaluar productos: saber si el precio cubre al menos el costo directo.",
      "Comparar líneas: detectar cuáles dejan más dinero antes de gastos.",
      "Fijar precios: asegurar un colchón para cubrir la operación.",
      "Controlar compras: medir el impacto de los costos de proveedores.",
      "Calcular el margen bruto: dividir la GB entre las ventas.",
      "Analizar promociones: ver si el descuento aún deja ganancia bruta.",
    ],
    comoFunciona: [
      "Se toma el Precio de Venta o los ingresos totales.",
      "Se restan los costos directos de los bienes vendidos (COGS).",
      "GB = PV - COGS; si el resultado es negativo, el producto pierde incluso antes de los gastos.",
    ],
    errores: [
      "Incluir gastos operativos en el costo directo: la GB quedaría subestimada.",
      "Olvidar flete o embalaje: son parte del costo directo y reducen la GB.",
      "Confundir GB con ganancia neta: la neta descuenta toda la estructura.",
    ],
    casos: [
      "Una tienda vende a $100 un producto que le costó $60: GB = $40.",
      "Una panadería calcula ingredientes y envase para obtener su GB por unidad.",
      "Un e-commerce suma el costo del producto y el envío antes de calcular la GB.",
    ],
    relacion: [
      "Se conecta con el COGS, el Precio de Venta y el Margen Bruto.",
      "La Ganancia Neta parte de la GB y resta los gastos operativos.",
    ],
    analogia:
      "La ganancia bruta es lo que queda en la mesa después de pagar los ingredientes de la pizza, antes de pagar el local, la luz y al personal.",
    notasPersonales: [
      "Una GB negativa es una alarma inmediata: el producto no cubre ni su costo directo.",
      "No compares GB entre productos sin mirar también su margen porcentual.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Identifica los ingresos por ventas.",
          "2️⃣ Reúne el costo directo de los bienes vendidos.",
          "3️⃣ Resta COGS a las ventas: GB = PV - COGS.",
          "4️⃣ Divide la GB entre las ventas para el margen bruto.",
          "5️⃣ Compara la GB con los gastos operativos del período.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "PV = $100 · COGS = $60 → GB = $40.",
          "Margen bruto = (40 / 100) × 100 = 40%.",
          "Si los gastos operativos son $25, la ganancia operativa sería $15.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-ganancia-neta",
    titulo: "Ganancia Neta (GN)",
    icon: "🏁",
    firma: "GN = GB - Gastos - Impuestos - Intereses",
    simuladorTipo: "ganancia-neta",
    definicion: [
      "La **Ganancia Neta (GN)** es el resultado final del negocio: lo que queda después de restar a la Ganancia Bruta los gastos operativos, los impuestos y los intereses.",
      "Es el indicador que muestra si la empresa realmente gana dinero en el período.",
    ],
    queEs: [
      "Es la última línea de la cuenta de resultados.",
      "Descuenta todos los costos: directos, operativos, financieros e impositivos.",
      "Puede ser positiva o negativa aunque la ganancia bruta sea positiva.",
      "Es la base del margen neto.",
    ],
    paraQueSirve: [
      "Medir rentabilidad real: saber si el negocio deja utilidad después de todo.",
      "Evaluar la estructura: detectar si los gastos consumen la ganancia bruta.",
      "Decidir inversiones: comparar el retorno neto de distintas opciones.",
      "Controlar impuestos e intereses: medir su peso sobre el resultado.",
      "Planificar crecimiento: proyectar la utilidad que queda para reinvertir.",
      "Analizar créditos: entender cuánto cuesta financiarse.",
    ],
    comoFunciona: [
      "Se parte de la Ganancia Bruta.",
      "Se restan los gastos operativos, los impuestos y los intereses.",
      "GN = PV - COGS - Gastos operativos - Impuestos - Intereses.",
    ],
    errores: [
      "Confundirla con la ganancia bruta: la neta descuenta toda la estructura.",
      "Olvidar impuestos o intereses: la utilidad queda inflada.",
      "Mezclar retiros de socios con gastos: distorsiona el resultado.",
    ],
    casos: [
      "Una pizzería con GB de $40, gastos de $20 e impuestos de $5: GN = $15.",
      "Una startup con GB positiva pero gastos altos: GN negativa.",
      "Una tienda con crédito: los intereses reducen su ganancia neta.",
    ],
    relacion: [
      "Se conecta con la Ganancia Bruta, el Margen Neto y el EBITDA.",
      "La ganancia neta es la que se distribuye o se reinvierte.",
    ],
    analogia:
      "La ganancia neta es lo que realmente te queda en el bolsillo después de pagar la mercadería, el local, la luz, los impuestos y el banco.",
    notasPersonales: [
      "Una ganancia bruta positiva puede esconder una ganancia neta negativa.",
      "La ganancia neta no es lo mismo que el efectivo disponible: revisa también el flujo de caja.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Calcula la Ganancia Bruta: PV - COGS.",
          "2️⃣ Resta los gastos operativos del período.",
          "3️⃣ Resta los impuestos.",
          "4️⃣ Resta los intereses del financiamiento.",
          "5️⃣ Divide el resultado entre las ventas para el margen neto.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "PV = $100 · COGS = $60 → GB = $40.",
          "Gastos $20 + impuestos $5 + intereses $2 → GN = $40 - $27 = $13.",
          "Margen neto = (13 / 100) × 100 = 13%.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-margen-bruto",
    titulo: "Margen de Ganancia Bruto",
    icon: "💹",
    firma: "Margen Bruto (%) = ((PV - COGS) / PV) × 100",
    simuladorTipo: "margen-bruto",
    definicion: [
      "El **Margen de Ganancia Bruto** (Gross Profit Margin) expresa la Ganancia Bruta como porcentaje de las ventas, mostrando cuánto queda de cada dólar vendido después del costo directo.",
      "Permite comparar la rentabilidad de productos y empresas de distinto tamaño.",
    ],
    queEs: [
      "Es la Ganancia Bruta dividida entre los ingresos por ventas.",
      "Se expresa en porcentaje.",
      "Mide la eficiencia del precio frente al costo directo.",
      "No considera gastos operativos ni impuestos.",
    ],
    paraQueSirve: [
      "Comparar productos: evaluar cuál deja más proporción por venta.",
      "Fijar precios: asegurar un margen mínimo antes de gastos.",
      "Analizar proveedores: medir el impacto de un aumento de costos.",
      "Detectar promociones riesgosas: ver si el descuento reduce demasiado el margen.",
      "Comparar con la industria: saber si el negocio es competitivo.",
      "Proyectar utilidades: estimar la ganancia bruta sobre ventas futuras.",
    ],
    comoFunciona: [
      "Se calcula la Ganancia Bruta: PV - COGS.",
      "Se divide entre las ventas y se multiplica por 100.",
      "Un margen bruto del 40% significa que $40 de cada $100 vendidos cubren gastos y utilidad.",
    ],
    errores: [
      "Calcularlo sobre el costo en lugar de la venta: da un porcentaje distinto (markup).",
      "Incluir gastos operativos en el COGS: el margen queda distorsionado.",
      "Comparar márgenes brutos de industrias distintas sin contexto.",
    ],
    casos: [
      "Una tienda con PV $100 y COGS $60 tiene 40% de margen bruto.",
      "Un restaurante con 65% de margen bruto destina el resto a personal y alquiler.",
      "Un software con 80% de margen bruto puede invertir más en desarrollo.",
    ],
    relacion: [
      "Se conecta con la Ganancia Bruta, el COGS y el Margen Operativo.",
      "El margen neto es menor porque descuenta también la estructura.",
    ],
    analogia:
      "El margen bruto es la porción del pastel que queda después de pagar los ingredientes: todavía no alcanza para el alquiler del salón, pero ya sabes con cuánto cuentas.",
    notasPersonales: [
      "Margen bruto y markup no son intercambiables: el primero se calcula sobre la venta y el segundo sobre el costo.",
      "Un margen bruto bajo obliga a vender mucho volumen para cubrir la estructura.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Toma las ventas del período o el Precio de Venta unitario.",
          "2️⃣ Resta el COGS para obtener la Ganancia Bruta.",
          "3️⃣ Divide la GB entre las ventas.",
          "4️⃣ Multiplica por 100 para expresarlo en porcentaje.",
          "5️⃣ Compáralo con el margen objetivo del negocio.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "PV = $100 · COGS = $60 → GB = $40.",
          "Margen bruto = (40 / 100) × 100 = 40%.",
          "Si el COGS sube a $70, el margen bruto baja a 30%.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-margen-operativo",
    titulo: "Margen Operativo (EBIT)",
    icon: "⚙️",
    firma: "Margen Operativo (%) = (EBIT / Ventas) × 100",
    simuladorTipo: "margen-operativo",
    definicion: [
      "El **Margen Operativo** (Operating Margin o EBIT Margin) mide la rentabilidad de la operación antes de intereses e impuestos, como porcentaje de las ventas.",
      "Muestra qué tan bien el negocio convierte ventas en utilidad operativa después de cubrir costos directos y gastos operativos.",
    ],
    queEs: [
      "Es el EBIT (utilidad antes de intereses e impuestos) dividido entre las ventas.",
      "Incluye el efecto de los gastos operativos, pero no del financiamiento ni de los impuestos.",
      "Refleja la eficiencia del core del negocio.",
      "Se expresa en porcentaje.",
    ],
    paraQueSirve: [
      "Medir eficiencia operativa: saber cuánto deja la operación antes de financiamiento.",
      "Comparar empresas: evaluar negocios con distinta estructura de deuda.",
      "Controlar gastos: medir el impacto de la estructura en la rentabilidad.",
      "Evaluar proyectos: estimar la rentabilidad operativa de una nueva línea.",
      "Analizar decisiones: separar el resultado operativo del financiero.",
      "Negociar con inversores: mostrar la capacidad del negocio para generar utilidad.",
    ],
    comoFunciona: [
      "Se calcula el EBIT: Ganancia Bruta - Gastos Operativos.",
      "Se divide el EBIT entre las ventas y se multiplica por 100.",
      "Un margen operativo del 20% significa $20 de utilidad operativa por cada $100 vendidos.",
    ],
    errores: [
      "Incluir intereses o impuestos: el margen operativo debe medirlos antes.",
      "Olvidar gastos operativos: terminarías calculando el margen bruto.",
      "Comparar márgenes operativos sin considerar el tamaño y la industria.",
    ],
    casos: [
      "Una empresa con ventas de $100, COGS $60 y gastos $20 tiene EBIT $20 y margen 20%.",
      "Un retailer con margen operativo del 5% compite por volumen.",
      "Un software con margen operativo del 30% tiene alta eficiencia.",
    ],
    relacion: [
      "Se conecta con el Margen Bruto, el EBITDA y el Margen Neto.",
      "El margen neto es menor porque además descuenta intereses e impuestos.",
    ],
    analogia:
      "El margen operativo mide cómo funciona el motor del negocio antes de mirar la deuda y los impuestos: es la eficiencia del engranaje principal.",
    notasPersonales: [
      "El EBIT es la utilidad operativa; no lo confundas con el EBITDA, que además excluye depreciación y amortización.",
      "Un margen operativo negativo indica que la estructura de gastos es insostenible.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Calcula la Ganancia Bruta: ventas - COGS.",
          "2️⃣ Resta los gastos operativos para obtener el EBIT.",
          "3️⃣ Divide el EBIT entre las ventas.",
          "4️⃣ Multiplica por 100 para el porcentaje.",
          "5️⃣ Compáralo con el margen bruto y el neto.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "Ventas $100 · COGS $60 → GB $40.",
          "Gastos operativos $20 → EBIT = $20.",
          "Margen operativo = (20 / 100) × 100 = 20%.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-margen-neto",
    titulo: "Margen de Ganancia Neto",
    icon: "🎯",
    firma: "Margen Neto (%) = (Utilidad Neta / Ventas) × 100",
    simuladorTipo: "margen-neto",
    definicion: [
      "El **Margen de Ganancia Neto** (Net Profit Margin) expresa la Ganancia Neta como porcentaje de las ventas: la proporción de cada dólar vendido que se convierte en utilidad final.",
      "Es el indicador más completo de rentabilidad porque descuenta costos, gastos, impuestos e intereses.",
    ],
    queEs: [
      "Es la utilidad neta dividida entre los ingresos por ventas.",
      "Se expresa en porcentaje.",
      "Incluye el efecto de toda la estructura de costos y del financiamiento.",
      "Es la rentabilidad que realmente queda para los socios.",
    ],
    paraQueSirve: [
      "Medir rentabilidad final: saber cuánto queda de cada venta después de todo.",
      "Comparar períodos: evaluar si la empresa mejora o empeora.",
      "Atraer inversión: mostrar la capacidad de generar utilidad.",
      "Controlar costos: detectar qué rubro consume el margen.",
      "Planificar dividendos: estimar cuánto se puede distribuir.",
      "Evaluar sostenibilidad: comprobar si el negocio aguanta una crisis.",
    ],
    comoFunciona: [
      "Se parte de la utilidad neta del período.",
      "Se divide entre las ventas y se multiplica por 100.",
      "Un margen neto del 10% significa que $10 de cada $100 vendidos son utilidad final.",
    ],
    errores: [
      "Calcularlo con la ganancia bruta: el resultado sería el margen bruto.",
      "Olvidar impuestos e intereses: el margen queda inflado.",
      "Comparar márgenes netos de industrias con estructuras muy distintas.",
    ],
    casos: [
      "Una empresa con ventas de $100 y utilidad neta de $13 tiene 13% de margen.",
      "Un supermercado con 2% de margen neto depende del volumen.",
      "Una startup puede tener margen neto negativo mientras invierte en crecimiento.",
    ],
    relacion: [
      "Se conecta con la Ganancia Neta, el Margen Operativo y el ROE.",
      "Es el resultado final de la cascada: margen bruto → operativo → neto.",
    ],
    analogia:
      "El margen neto es la nota final del examen: después de todas las materias, es lo que realmente quedó de tu esfuerzo.",
    notasPersonales: [
      "Un margen neto positivo y creciente es la mejor señal de salud del negocio.",
      "No confundas margen neto con rentabilidad sobre la inversión: el ROI usa otra base.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Calcula la Ganancia Bruta.",
          "2️⃣ Resta gastos operativos, impuestos e intereses.",
          "3️⃣ Divide la utilidad neta entre las ventas.",
          "4️⃣ Multiplica por 100 para el porcentaje.",
          "5️⃣ Compara el resultado con el margen operativo y el bruto.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "Ventas $100 · COGS $60 · gastos $20 · impuestos $5 · intereses $2.",
          "Utilidad neta = $13 → margen neto = 13%.",
          "El margen operativo era 20%: impuestos e intereses consumieron 7 puntos.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-markup",
    titulo: "Markup (Margen de Recargo)",
    icon: "🏷️",
    firma: "Markup (%) = ((PV - PC) / PC) × 100",
    simuladorTipo: "markup",
    definicion: [
      "El **Markup** (margen de recargo) expresa la ganancia como porcentaje del costo: cuánto se recarga al Precio de Costo para llegar al Precio de Venta.",
      "No es lo mismo que el margen sobre la venta: un markup del 50% equivale a un margen de venta de 33.33%.",
    ],
    queEs: [
      "Es el recargo aplicado sobre el costo.",
      "Se calcula como (PV - PC) / PC × 100.",
      "Se usa para fijar precios a partir del costo.",
      "Es distinto del margen bruto, que se calcula sobre la venta.",
    ],
    paraQueSirve: [
      "Fijar precios: aplicar un recargo estándar sobre el costo.",
      "Comparar con el margen: entender la diferencia entre ambas bases.",
      "Negociar con proveedores: ver cuánto recargo soporta el producto.",
      "Capacitar equipos: evitar confundir markup con margen.",
      "Analizar promociones: medir cuánto recargo se sacrifica.",
      "Construir catálogos: estandarizar reglas de precio por categoría.",
    ],
    comoFunciona: [
      "Se calcula la ganancia: PV - PC.",
      "Se divide entre el costo y se multiplica por 100.",
      "Si el costo es $60 y el PV $100, el markup es 66.67%.",
    ],
    errores: [
      "Confundir markup con margen de venta: usan bases distintas.",
      "Aplicar el markup sobre la venta: el precio resultante no es el esperado.",
      "Ignorar gastos: un markup alto puede no cubrir la estructura.",
    ],
    casos: [
      "Una tienda aplica un markup del 50% sobre el costo de sus productos.",
      "Un distribuidor usa markup por categoría: 30% en alimentos y 60% en accesorios.",
      "Un servicio calcula su precio con markup del 40% sobre el costo del tiempo.",
    ],
    relacion: [
      "Se conecta con el Precio de Venta, el Precio de Costo y el Margen Bruto.",
      "Markup del 100% equivale a un margen de venta del 50%.",
    ],
    analogia:
      "El markup es la rampa que agregas sobre el costo para llegar al precio: si la rampa es del 50%, el precio sube la mitad de lo que costó.",
    notasPersonales: [
      "Nunca compares un markup con un margen sin convertir la base.",
      "Markup sobre costo = margen sobre venta / (1 - margen sobre venta).",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Identifica el Precio de Costo.",
          "2️⃣ Identifica el Precio de Venta.",
          "3️⃣ Calcula la ganancia: PV - PC.",
          "4️⃣ Divide entre el costo y multiplica por 100.",
          "5️⃣ Convierte a margen sobre venta si necesitas compararlo.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "PC = $60 · PV = $100 → Ganancia = $40.",
          "Markup = (40 / 60) × 100 = 66.67%.",
          "Margen sobre venta = (40 / 100) × 100 = 40%.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-cogs",
    titulo: "Costo de Ventas (COGS)",
    icon: "📦",
    firma: "COGS = Inventario Inicial + Compras - Inventario Final",
    simuladorTipo: "cogs",
    definicion: [
      "El **Costo de Ventas (COGS - Cost of Goods Sold)** es el costo directo de los productos que la empresa vendió durante un período.",
      "Incluye el costo de adquisición o producción de lo vendido, no el de los productos que siguen en inventario.",
    ],
    queEs: [
      "Es el costo directo asociado a los ingresos del período.",
      "Se calcula con inventario inicial, compras e inventario final.",
      "No incluye gastos administrativos, ventas ni marketing.",
      "Es la base para calcular la Ganancia Bruta.",
    ],
    paraQueSirve: [
      "Calcular la Ganancia Bruta: restar COGS a las ventas.",
      "Valorar inventario: saber cuánto costó lo que realmente se vendió.",
      "Controlar compras: evitar exceso de stock y pérdidas.",
      "Fijar precios: conocer el costo real antes de definir el PV.",
      "Analizar rentabilidad: medir la eficiencia del abastecimiento.",
      "Preparar estados financieros: presentar el costo de ventas correctamente.",
    ],
    comoFunciona: [
      "Se toma el inventario inicial del período.",
      "Se suman las compras o costos de producción.",
      "Se resta el inventario final para obtener lo que se vendió.",
      "COGS = Inventario Inicial + Compras - Inventario Final.",
    ],
    errores: [
      "Incluir gastos operativos en el COGS: distorsiona la ganancia bruta.",
      "Olvidar el inventario final: el costo de ventas queda sobreestimado.",
      "No registrar mermas ni devoluciones: el costo real queda oculto.",
    ],
    casos: [
      "Una tienda empieza con $500 de inventario, compra $800 y termina con $300: COGS $1,000.",
      "Una fábrica calcula el costo de las unidades producidas y vendidas.",
      "Un restaurante estima el costo de los ingredientes consumidos en el mes.",
    ],
    relacion: [
      "Se conecta con la Ganancia Bruta, el Margen Bruto y el Precio de Venta.",
      "El COGS es el primer escalón de la cascada de resultados.",
    ],
    analogia:
      "El COGS es el costo de los ingredientes que realmente se usaron en los platos vendidos, no de todo lo que hay en la despensa.",
    notasPersonales: [
      "Si el COGS sube más rápido que las ventas, la ganancia bruta se contrae.",
      "Un inventario final inflado reduce artificialmente el COGS y mejora la ganancia.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Registra el inventario inicial del período.",
          "2️⃣ Suma las compras o el costo de producción.",
          "3️⃣ Cuenta el inventario final.",
          "4️⃣ Aplica COGS = Inicial + Compras - Final.",
          "5️⃣ Resta el COGS a las ventas para obtener la Ganancia Bruta.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "Inventario inicial $500 + compras $800 = $1,300 disponibles.",
          "Inventario final $300 → COGS = $1,300 - $300 = $1,000.",
          "Si las ventas fueron $1,500, la Ganancia Bruta es $500 (33.33%).",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-ebitda",
    titulo: "EBITDA",
    icon: "📊",
    firma: "EBITDA = Utilidad Neta + Impuestos + Intereses + D&A",
    simuladorTipo: "ebitda",
    definicion: [
      "El **EBITDA** (Earnings Before Interest, Taxes, Depreciation and Amortization) mide la utilidad operativa antes de intereses, impuestos, depreciación y amortización.",
      "Se usa para comparar la capacidad operativa de empresas con distintas estructuras de deuda, impuestos e inversiones en activos.",
    ],
    queEs: [
      "Es un indicador de generación operativa de efectivo antes de ciertos ajustes.",
      "No es una medida contable oficial: es una métrica de análisis.",
      "Excluye intereses, impuestos, depreciación y amortización.",
      "No equivale al flujo de caja libre.",
    ],
    paraQueSirve: [
      "Comparar empresas: evaluar operaciones sin el efecto de la deuda.",
      "Analizar eficiencia: medir la rentabilidad operativa antes de inversiones.",
      "Valorar negocios: usar múltiplos de EBITDA en transacciones.",
      "Controlar costos: ver la evolución de la operación pura.",
      "Evaluar proyectos: estimar la capacidad de generar recursos.",
      "Negociar financiamiento: mostrar la capacidad de pago operativa.",
    ],
    comoFunciona: [
      "Se parte de la utilidad neta.",
      "Se suman impuestos e intereses.",
      "Se suman la depreciación y la amortización.",
      "EBITDA = Utilidad Neta + Impuestos + Intereses + Depreciación + Amortización.",
    ],
    errores: [
      "Confundir EBITDA con flujo de caja: no descuenta inversiones ni capital de trabajo.",
      "Usarlo como única medida de rentabilidad: ignora deuda e impuestos.",
      "Olvidar la depreciación y amortización: el cálculo queda incompleto.",
    ],
    casos: [
      "Una empresa con utilidad neta $50, impuestos $20, intereses $10 y D&A $20 tiene EBITDA $100.",
      "Un fondo compara el EBITDA de dos empresas para valorarlas.",
      "Una startup con pérdida neta puede tener EBITDA positivo.",
    ],
    relacion: [
      "Se conecta con el Margen Operativo, la Ganancia Neta y el ROI.",
      "El EBITDA se ubica antes de intereses, impuestos y D&A en la cascada.",
    ],
    analogia:
      "El EBITDA es como medir la fuerza de un motor sin contar el desgaste de las piezas ni el combustible: muestra la potencia operativa antes de otros factores.",
    notasPersonales: [
      "EBITDA positivo no garantiza rentabilidad ni liquidez.",
      "El margen EBITDA se calcula dividiendo el EBITDA entre las ventas.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Toma la utilidad neta del período.",
          "2️⃣ Súmale los impuestos.",
          "3️⃣ Súmale los intereses.",
          "4️⃣ Súmale la depreciación y la amortización.",
          "5️⃣ Divide el EBITDA entre las ventas para el margen EBITDA.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "Utilidad neta $50 + impuestos $20 + intereses $10 + D&A $20.",
          "EBITDA = $100.",
          "Con ventas de $500, el margen EBITDA es 20%.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-roi",
    titulo: "ROI (Retorno sobre la Inversión)",
    icon: "📐",
    firma: "ROI (%) = (Beneficio / Inversión) × 100",
    simuladorTipo: "roi",
    definicion: [
      "El **ROI (Return on Investment)** mide la rentabilidad de una inversión: cuánto beneficio se obtiene por cada unidad monetaria invertida.",
      "Se expresa en porcentaje y permite comparar proyectos de distinto tamaño y duración.",
    ],
    queEs: [
      "Es el beneficio obtenido dividido entre la inversión realizada.",
      "Se expresa en porcentaje.",
      "Puede ser simple (sin anualizar) o anualizado.",
      "Es una medida relativa: no indica el monto absoluto ganado.",
    ],
    paraQueSirve: [
      "Evaluar proyectos: decidir si una inversión conviene.",
      "Comparar alternativas: elegir la opción con mejor retorno.",
      "Medir campañas: calcular el retorno de marketing o publicidad.",
      "Justificar presupuestos: demostrar el valor de una inversión.",
      "Analizar mejoras: medir el retorno de una automatización.",
      "Fijar metas: establecer un ROI mínimo aceptable.",
    ],
    comoFunciona: [
      "Se identifica el beneficio neto de la inversión.",
      "Se divide entre el monto invertido.",
      "Se multiplica por 100 para obtener el porcentaje.",
      "ROI = (Beneficio / Inversión) × 100.",
    ],
    errores: [
      "Usar ingresos en lugar de beneficio: el ROI queda inflado.",
      "Ignorar el tiempo: un ROI del 20% en 1 año no es igual que en 5.",
      "Olvidar costos ocultos: mantenimiento, capacitación o impuestos.",
    ],
    casos: [
      "Inviertes $1,000 y obtienes $1,200: beneficio $200 y ROI 20%.",
      "Una campaña de marketing cuesta $500 y genera $750: ROI 50%.",
      "Una máquina reduce costos en $2,000 al año con inversión de $10,000: ROI anual 20%.",
    ],
    relacion: [
      "Se conecta con la Ganancia Neta, el EBITDA y el Punto de Equilibrio.",
      "El ROI es primo de la TIR: ambos miden retorno, pero la TIR considera el tiempo.",
    ],
    analogia:
      "El ROI es la nota de una apuesta: te dice cuánto recuperaste por cada ficha que pusiste, sin importar el tamaño de la mesa.",
    notasPersonales: [
      "Un ROI alto puede esconder un riesgo alto: míralo junto con el plazo.",
      "Compara siempre el ROI con el costo de oportunidad del dinero.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Define el monto total invertido.",
          "2️⃣ Calcula el beneficio neto obtenido.",
          "3️⃣ Divide el beneficio entre la inversión.",
          "4️⃣ Multiplica por 100 para el porcentaje.",
          "5️⃣ Ajusta por el tiempo si comparas proyectos de distinta duración.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "Inversión $1,000 · retorno total $1,200 → beneficio $200.",
          "ROI = (200 / 1,000) × 100 = 20%.",
          "Si el retorno tardó 2 años, el ROI anualizado aproximado es 10%.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
  {
    id: "aritmetica-punto-equilibrio",
    titulo: "Punto de Equilibrio",
    icon: "⚖️",
    firma: "Q* = Costos Fijos / (PV Unitario - Costo Variable Unitario)",
    simuladorTipo: "punto-equilibrio",
    definicion: [
      "El **Punto de Equilibrio** es el nivel de ventas en el que los ingresos igualan a los costos totales: la empresa no gana ni pierde.",
      "Se expresa en unidades vendidas o en monto de ventas y sirve para saber cuánto hay que vender para cubrir la estructura.",
    ],
    queEs: [
      "Es el punto donde la utilidad es cero.",
      "Depende de los costos fijos, el precio de venta y el costo variable.",
      "Puede calcularse en unidades o en dinero.",
      "Es una herramienta de planificación y control.",
    ],
    paraQueSirve: [
      "Planificar ventas: saber cuántas unidades cubren los costos.",
      "Fijar precios: evaluar cómo cambia el equilibrio al mover el PV.",
      "Controlar costos fijos: medir cuánto volumen exige la estructura.",
      "Evaluar proyectos: estimar el riesgo mínimo de ventas.",
      "Negociar con proveedores: reducir el costo variable mejora el equilibrio.",
      "Tomar decisiones: saber si un producto puede sostenerse.",
    ],
    comoFunciona: [
      "Se calcula el margen de contribución: PV unitario - Costo variable unitario.",
      "Se dividen los costos fijos entre ese margen.",
      "El resultado son las unidades necesarias para no perder ni ganar.",
      "En dinero: unidades de equilibrio × PV unitario.",
    ],
    errores: [
      "Mezclar costos fijos con variables: cambia el resultado.",
      "Olvidar el costo variable: el margen de contribución queda inflado.",
      "Suponer que el punto de equilibrio es la meta: es el mínimo, no el objetivo.",
    ],
    casos: [
      "Costos fijos $1,000, PV $25 y costo variable $15: equilibrio en 100 unidades.",
      "Un restaurante calcula cuántos platos debe vender para cubrir el alquiler.",
      "Una app estima cuántas suscripciones cubren sus servidores y personal.",
    ],
    relacion: [
      "Se conecta con el Margen de Contribución, los Costos Fijos y la Ganancia.",
      "El punto de equilibrio es la base para calcular el margen de seguridad.",
    ],
    analogia:
      "El punto de equilibrio es la raya que separa perder de ganar: por debajo de ella el negocio pierde, por encima empieza a ganar.",
    notasPersonales: [
      "Bajar costos fijos reduce el punto de equilibrio y disminuye el riesgo.",
      "El margen de seguridad es la diferencia entre las ventas reales y el punto de equilibrio.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Clasifica los costos en fijos y variables.",
          "2️⃣ Calcula el margen de contribución unitario: PV - CV.",
          "3️⃣ Divide los costos fijos entre el margen de contribución.",
          "4️⃣ Multiplica las unidades por el PV para obtener el equilibrio en dinero.",
          "5️⃣ Compara el resultado con las ventas esperadas.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "Costos fijos $1,000 · PV $25 · CV $15 → margen de contribución $10.",
          "Q* = 1,000 / 10 = 100 unidades.",
          "Ventas de equilibrio = 100 × $25 = $2,500.",
        ],
      },
    ],
    fuente: "Apuntes de Aritmética Comercial y Financiera · Notion",
  },
];

export const CONCEPTOS_POR_ID = Object.fromEntries(
  CONCEPTOS.map((concepto) => [concepto.id, concepto]),
);
