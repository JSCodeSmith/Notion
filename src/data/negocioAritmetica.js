/* Aritmética Comercial y Financiera.
   Curso de Negocios con 9 conceptos: precios, ganancias, márgenes,
   descuentos, regla de tres y rentabilidad bruta/neta.
   Cada apunte incluye simulador numérico y misiones de laboratorio. */

export const NEGOCIO_ARITMETICA = {
  id: "aritmetica-comercial",
  label: "Aritmética Comercial y Financiera",
  icon: "🧮",
  nivel: "Principiante",
  titulo: "Aritmética Comercial y Financiera",
  descripcion:
    "Las cuentas que sostienen cualquier negocio: precios, costos, ganancias, márgenes, descuentos y rentabilidad real.",
  grupos: [
    {
      seccion: "Precios y ganancias",
      metodos: [
        {
          id: "precio-lista",
          nombre: "Precio de Lista (PL)",
          firma: "PL = PC + Ganancia",
          icon: "🏷️",
          lab: 2,
        },
        {
          id: "precio-costo",
          nombre: "Precio de Costo (PC)",
          firma: "PC = PL - Ganancia",
          icon: "💵",
          lab: 2,
        },
        {
          id: "ganancia-perdida",
          nombre: "Ganancia y Pérdida",
          firma: "G = PV - PC · P = PC - PV",
          icon: "📈",
          lab: 2,
        },
        {
          id: "margen-ganancia",
          nombre: "Margen de Ganancia",
          firma: "MG = (G / PC) × 100",
          icon: "📊",
          lab: 2,
        },
      ],
    },
    {
      seccion: "Descuentos",
      metodos: [
        {
          id: "descuento",
          nombre: "Descuento simple",
          firma: "D = PL × (%D / 100)",
          icon: "✂️",
          lab: 2,
        },
        {
          id: "descuentos-sucesivos",
          nombre: "Descuentos sucesivos",
          firma: "DU = 100 - [(100-d1)(100-d2)…] / 100^(n-1)",
          icon: "🪜",
          lab: 2,
        },
      ],
    },
    {
      seccion: "La herramienta universal",
      metodos: [
        {
          id: "regla-tres",
          nombre: "Regla de Tres Simple",
          firma: "x = (b × c) / a",
          icon: "🔧",
          lab: 2,
        },
      ],
    },
    {
      seccion: "Rentabilidad y cierre",
      metodos: [
        {
          id: "pv-ganancias",
          nombre: "PV, Ganancia Bruta y Neta",
          firma: "GB = PV - CD · GN = PV - (CD + GO + Imp + Int)",
          icon: "🧾",
          lab: 2,
        },
        {
          id: "caso-integrador",
          nombre: "Caso integrador",
          firma: "PC → PL → descuento → precio final → ganancia real",
          icon: "🧩",
          lab: 2,
        },
      ],
    },
  ],
};

export const NEGOCIO_ARITMETICA_DOCS = {
  "precio-lista": {
    id: "precio-lista",
    titulo: "Precio de Lista (PL)",
    icon: "🏷️",
    curso: "aritmetica-comercial",
    cursoLabel: "Aritmética Comercial y Financiera",
    categoria: "Administración y Negocios",
    simulador: "aritmetica",
    simuladorTipo: "precio-lista",
    resumen:
      "El precio de catálogo antes de descuentos e impuestos. Es la base sobre la que se calcula todo lo demás.",
    definicion: [
      "El **precio de lista (PL)** es el precio oficial o de catálogo de un producto o servicio, antes de aplicar cualquier descuento, rebaja o impuesto.",
      "Es el precio de referencia que aparece en la lista del vendedor y sobre él se calculan los descuentos. No siempre coincide con lo que paga el cliente.",
    ],
    queEs: [
      "Es el **punto de partida comercial**: el número que el vendedor publica y desde el que negocia.",
      "Se construye sumando al **precio de costo (PC)** la **ganancia** que se quiere obtener.",
      "Puede incluir o no impuestos según la política del negocio; lo importante es saber qué contiene antes de descontar.",
    ],
    paraQueSirve: [
      "**Fijar un precio de referencia** claro para el catálogo y la publicidad.",
      "**Calcular descuentos** de forma ordenada: siempre se aplican sobre el PL.",
      "**Comparar productos** y márgenes usando una misma base.",
      "**Negociar** con argumentos: saber cuánto se puede rebajar sin perder dinero.",
    ],
    comoFunciona: [
      "La fórmula base es `PL = PC + Ganancia`. Si la ganancia se expresa como porcentaje del costo, primero se calcula el monto de la ganancia.",
      "```\nPL = PC + G\nG  = PC × (%G / 100)\nPL = PC × (1 + %G / 100)\n```",
      "**Ejemplo:** si un producto cuesta $80 y se quiere ganar un 25% sobre el costo, la ganancia es $20 y el precio de lista es $100.",
      "El PL no es el precio final: si después se aplica un descuento del 10%, el cliente paga $90.",
    ],
    errores: [
      "**Confundir precio de lista con precio final:** el PL es antes de descuentos; el cliente paga el precio final.",
      "**Calcular la ganancia sobre el precio de lista** cuando el margen acordado era sobre el costo: el resultado cambia por completo.",
      "**Aplicar descuentos sobre el costo** en lugar de sobre el PL: el descuento deja de representar lo que ve el cliente.",
      "**Olvidar impuestos o comisiones** al construir el PL: el precio puede quedarse corto.",
    ],
    casos: [
      "**Catálogos y tiendas:** publicar un PL y luego ofrecer promociones porcentuales.",
      "**Servicios profesionales:** fijar una tarifa base antes de descuentos por volumen.",
      "**Distribución:** construir el PL a partir del costo de compra y el margen objetivo.",
      "**E-commerce:** mostrar el precio tachado (PL) y el precio de oferta (precio final).",
    ],
    relacion: [
      "**Precio de costo (PC):** base sobre la que se suma la ganancia.",
      "**Ganancia y pérdida:** diferencia entre el precio de venta y el costo.",
      "**Descuento:** reducción que se aplica sobre el PL.",
      "**Margen de ganancia:** porcentaje que relaciona la ganancia con el costo.",
    ],
    analogia:
      "El precio de lista es como la etiqueta de una tienda: el número grande que se ve antes de cualquier rebaja. El descuento es el rotulador que lo tacha, y el precio final es lo que realmente pagas en caja.",
    notasPersonales: [
      "Antes de descontar, pregunta siempre: ¿descuento sobre el precio de lista o sobre el precio final?",
      "Si el margen objetivo es sobre el costo, la fórmula rápida es `PL = PC × (1 + margen/100)`.",
      "Un PL alto con descuentos frecuentes puede dañar la percepción de precio de la marca.",
    ],
    extras: [
      {
        seccion: "📊 Resumen de fórmulas",
        textos: [
          "**Precio de lista:** `PL = PC + Ganancia`",
          "**Con margen sobre el costo:** `PL = PC × (1 + %G / 100)`",
          "**Precio final:** `PF = PL - Descuento`",
        ],
      },
    ],
    fuente:
      "Aritmética Comercial y Financiera — apuntes de Notion · Matemáticas Financieras · Khan Academy",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué representa el precio de lista?",
        opciones: [
          "Lo que paga el cliente después del descuento",
          "El precio de catálogo antes de descuentos e impuestos",
          "El costo de producir el producto",
          "La ganancia neta del negocio",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta:
          "Si el costo es $80 y se quiere una ganancia del 25% sobre el costo, ¿cuál es el precio de lista?",
        opciones: ["$100", "$105", "$80", "$120"],
        correcta: 0,
      },
      {
        id: 3,
        pregunta: "¿Sobre qué base se calculan normalmente los descuentos?",
        opciones: [
          "Sobre el precio de costo",
          "Sobre la ganancia neta",
          "Sobre el precio de lista",
          "Sobre los impuestos",
        ],
        correcta: 2,
      },
    ],
    lab: {
      misiones: [
        {
          id: "precio-lista-emparejar",
          tipo: "emparejar",
          titulo: "Une cada precio con su significado",
          dificultad: "Fácil",
          xp: 60,
          pista:
            "Distingue tres momentos: lo que cuesta, lo que se publica y lo que se paga al final.",
          solucion:
            "PC = lo que cuesta al vendedor · PL = precio de catálogo · Ganancia = diferencia positiva · PF = lo que paga el cliente tras el descuento.",
          pares: [
            {
              concepto: "Precio de costo (PC)",
              descripcion:
                "Lo que le cuesta al vendedor adquirir o producir el producto.",
            },
            {
              concepto: "Precio de lista (PL)",
              descripcion:
                "Precio de catálogo antes de descuentos e impuestos.",
            },
            {
              concepto: "Ganancia (G)",
              descripcion:
                "Diferencia positiva entre el precio de lista y el costo.",
            },
            {
              concepto: "Precio final (PF)",
              descripcion:
                "Lo que paga el cliente después de aplicar el descuento.",
            },
          ],
        },
        {
          id: "precio-lista-ordenar",
          tipo: "ordenar",
          titulo: "Construye el precio de lista",
          dificultad: "Medio",
          xp: 90,
          pista: "Primero el costo, luego la ganancia y al final la suma.",
          solucion:
            "PC → ganancia deseada → PL = PC + G → verificar el margen sobre el costo.",
          pasos: [
            "Identifica el precio de costo del producto.",
            "Determina la ganancia deseada (monto o porcentaje sobre el costo).",
            "Suma el costo y la ganancia: PL = PC + G.",
            "Comprueba el margen resultante antes de publicar el precio.",
          ],
        },
      ],
    },
  },

  "precio-costo": {
    id: "precio-costo",
    titulo: "Precio de Costo (PC)",
    icon: "💵",
    curso: "aritmetica-comercial",
    cursoLabel: "Aritmética Comercial y Financiera",
    categoria: "Administración y Negocios",
    simulador: "aritmetica",
    simuladorTipo: "precio-costo",
    resumen:
      "Lo que le cuesta al vendedor adquirir o producir el producto. Es la base para medir cualquier ganancia.",
    definicion: [
      "El **precio de costo (PC)** es el precio que le cuesta al vendedor adquirir o producir el producto o servicio.",
      "Incluye compra, producción, transporte y almacenamiento, pero **no** incluye el margen de ganancia.",
    ],
    queEs: [
      "Es el **punto de partida** de toda cuenta comercial: sin costo no hay ganancia que medir.",
      "Puede ser **fijo** (una compra puntual) o **variable** (materias primas que cambian con el volumen).",
      "Es distinto del **costo total**, que además suma gastos operativos, impuestos e intereses.",
    ],
    paraQueSirve: [
      "**Calcular la ganancia real** de cada venta.",
      "**Fijar precios** con un margen objetivo.",
      "**Comparar proveedores** y decidir dónde comprar.",
      "**Detectar pérdidas** cuando el precio de venta queda por debajo del costo.",
    ],
    comoFunciona: [
      "Si se conoce el precio de lista y la ganancia, el costo se obtiene restando:",
      "```\nPC = PL - Ganancia\n```",
      "Si la ganancia se expresa como porcentaje del costo, se puede despejar: `PC = PL / (1 + %G / 100)`.",
      "**Ejemplo:** si una camisa se vende a $50 y la ganancia es de $20, el precio de costo es $30.",
    ],
    errores: [
      "**Confundir costo con gasto:** el costo directo del producto no es lo mismo que el alquiler o el marketing.",
      "**Olvidar costos indirectos** (transporte, almacenaje, comisiones) al calcular el costo real.",
      "**Restar la ganancia equivocada:** si la ganancia se calculó sobre el precio de venta, no se resta igual que si fuera sobre el costo.",
      "**Usar un costo desactualizado** por inflación o cambios de proveedor.",
    ],
    casos: [
      "**Compra y reventa:** saber cuánto se puede pagar a un proveedor.",
      "**Producción:** calcular el costo unitario antes de fijar el precio.",
      "**Licitaciones:** construir una oferta que cubra el costo y deje margen.",
      "**Control de pérdidas:** comparar el precio de venta con el costo para detectar productos no rentables.",
    ],
    relacion: [
      "**Precio de lista:** se construye sumando ganancia al costo.",
      "**Margen de ganancia:** usa el costo como denominador.",
      "**Ganancia bruta:** se calcula con el costo directo.",
      "**Regla de tres:** permite escalar el costo a otras cantidades.",
    ],
    analogia:
      "El precio de costo es el ingrediente de una receta: si no sabes cuánto cuesta la harina, el queso y el pepperoni, no puedes saber si la pizza deja dinero o solo entretiene al cocinero.",
    notasPersonales: [
      "Separa siempre costo directo y gastos operativos: mezclarlos hace imposible saber qué producto es rentable.",
      "Actualiza el costo cada vez que cambie el proveedor o el volumen de compra.",
      "Fórmula útil: `PC = PL / (1 + margen/100)` cuando el margen es sobre el costo.",
    ],
    extras: [
      {
        seccion: "📊 Resumen de fórmulas",
        textos: [
          "**Costo a partir del PL:** `PC = PL - Ganancia`",
          "**Costo con margen sobre el costo:** `PC = PL / (1 + %G / 100)`",
          "**Costo total:** `CT = Costo directo + Gastos operativos + Impuestos + Intereses`",
        ],
      },
    ],
    fuente:
      "Aritmética Comercial y Financiera — apuntes de Notion · Matemáticas Financieras · Khan Academy",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué incluye el precio de costo?",
        opciones: [
          "Solo la ganancia esperada",
          "El costo de compra o producción, transporte y almacenamiento",
          "Los impuestos y el margen neto",
          "El precio final que paga el cliente",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "Si el precio de lista es $50 y la ganancia es $20, ¿cuál es el costo?",
        opciones: ["$30", "$70", "$20", "$50"],
        correcta: 0,
      },
      {
        id: 3,
        pregunta: "¿Cuál es la diferencia entre costo y gasto?",
        opciones: [
          "No hay diferencia",
          "El costo es del producto; el gasto sostiene la operación",
          "El gasto siempre es mayor",
          "El costo solo existe en servicios",
        ],
        correcta: 1,
      },
    ],
    lab: {
      misiones: [
        {
          id: "precio-costo-completar",
          tipo: "completar",
          titulo: "Completa la fórmula del costo",
          dificultad: "Fácil",
          xp: 60,
          pista: "Para volver al costo hay que quitar la ganancia al precio de lista.",
          solucion: "PC = PL - Ganancia.",
          frase:
            "El precio de costo se obtiene restando la __________ al precio de lista.",
          opciones: ["ganancia", "descuento", "margen", "comisión"],
          correcto: "ganancia",
        },
        {
          id: "precio-costo-emparejar",
          tipo: "emparejar",
          titulo: "Distingue costo, gasto y precio",
          dificultad: "Medio",
          xp: 90,
          pista: "Pregunta si el dinero se gasta en el producto o en sostener el negocio.",
          solucion:
            "Costo directo = producto · Gasto operativo = funcionamiento del negocio · PL = precio publicado.",
          pares: [
            {
              concepto: "Costo directo",
              descripcion:
                "Compra o producción del producto: materias primas y mano de obra directa.",
            },
            {
              concepto: "Gasto operativo",
              descripcion:
                "Alquiler, sueldos administrativos, servicios y marketing.",
            },
            {
              concepto: "Precio de lista",
              descripcion:
                "Precio publicado que incluye el costo y la ganancia esperada.",
            },
          ],
        },
      ],
    },
  },

  "ganancia-perdida": {
    id: "ganancia-perdida",
    titulo: "Ganancia y Pérdida",
    icon: "📈",
    curso: "aritmetica-comercial",
    cursoLabel: "Aritmética Comercial y Financiera",
    categoria: "Administración y Negocios",
    simulador: "aritmetica",
    simuladorTipo: "ganancia-perdida",
    resumen:
      "La diferencia entre el precio de venta y el costo: positiva es ganancia, negativa es pérdida.",
    definicion: [
      "La **ganancia** es la diferencia positiva entre el precio de venta y el precio de costo.",
      "La **pérdida** es la diferencia negativa: el costo supera al precio de venta.",
    ],
    queEs: [
      "Es el **resultado económico** de una transacción, antes de considerar gastos operativos e impuestos.",
      "No es lo mismo que el **margen**: la ganancia es un monto; el margen es ese monto expresado como porcentaje.",
      "Una ganancia puede ser positiva y, aun así, convertirse en pérdida neta si los gastos operativos son altos.",
    ],
    paraQueSirve: [
      "**Saber si una venta deja o quita dinero.**",
      "**Comparar productos** por su aporte económico.",
      "**Decidir precios mínimos** para no vender por debajo del costo.",
      "**Detectar urgencias:** si el producto pierde dinero, hay que renegociar el costo o subir el precio.",
    ],
    comoFunciona: [
      "```\nGanancia = Precio de Venta - Precio de Costo\nPérdida  = Precio de Costo - Precio de Venta\n```",
      "Si `PV > PC`, hay ganancia; si `PV < PC`, hay pérdida; si `PV = PC`, el resultado es cero.",
      "**Ejemplo:** compras a $30 y vendes a $50 → ganancia de $20. Compras a $50 y vendes a $30 → pérdida de $20.",
    ],
    errores: [
      "**Llamar ganancia a lo que aún no descuenta gastos:** eso es ganancia bruta, no neta.",
      "**Confundir monto con margen:** $20 de ganancia no dice nada sin saber el costo.",
      "**Vender por debajo del costo** para ganar clientes sin calcular cuánto se pierde.",
      "**Ignorar la inflación:** un costo viejo puede convertir una ganancia aparente en pérdida real.",
    ],
    casos: [
      "**Liquidaciones:** calcular si el precio rebajado sigue cubriendo el costo.",
      "**Compras de oportunidad:** estimar la ganancia esperada antes de comprar.",
      "**Reventa online:** comparar el precio de compra con el de publicación.",
      "**Control de inventario:** identificar productos que se venden con pérdida.",
    ],
    relacion: [
      "**Precio de costo:** referencia para calcular la ganancia.",
      "**Margen de ganancia:** convierte la ganancia en porcentaje.",
      "**Descuento:** reduce el precio de venta y puede convertir la ganancia en pérdida.",
      "**Ganancia bruta y neta:** amplían el concepto al negocio completo.",
    ],
    analogia:
      "La ganancia es el marcador de un partido: si el precio de venta supera al costo, tu equipo va ganando; si el costo es mayor, va perdiendo. El margen te dice por cuántos puntos vas, no solo quién va arriba.",
    notasPersonales: [
      "La ganancia se mide en dinero; el margen se mide en porcentaje. No los mezcles en una misma frase.",
      "Un producto con ganancia positiva puede destruir valor si no cubre los gastos operativos.",
      "Regla rápida: `PV > PC` antes de gastos, `PV > costo total` después de gastos.",
    ],
    fuente:
      "Aritmética Comercial y Financiera — apuntes de Notion · Matemáticas Financieras · Khan Academy",
    quiz: [
      {
        id: 1,
        pregunta: "Si compras a $30 y vendes a $50, ¿qué obtienes?",
        opciones: [
          "Una pérdida de $20",
          "Una ganancia de $20",
          "Un margen del 20%",
          "Una ganancia de $80",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Cuándo hay pérdida?",
        opciones: [
          "Cuando el precio de venta supera el costo",
          "Cuando el precio de costo supera el precio de venta",
          "Cuando el margen es positivo",
          "Cuando el descuento es cero",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué diferencia hay entre ganancia y margen?",
        opciones: [
          "Son sinónimos exactos",
          "La ganancia es un monto; el margen es un porcentaje",
          "El margen siempre es mayor",
          "La ganancia solo existe en servicios",
        ],
        correcta: 1,
      },
    ],
    lab: {
      misiones: [
        {
          id: "ganancia-perdida-clasificar",
          tipo: "clasificar",
          titulo: "Clasifica cada resultado",
          dificultad: "Fácil",
          xp: 60,
          pista: "Compara siempre el precio de venta con el costo.",
          solucion:
            "PV mayor que PC → ganancia · PV menor que PC → pérdida · G = PV - PC · P = PC - PV.",
          categorias: ["📈 Ganancia", "📉 Pérdida"],
          elementos: [
            {
              id: "gp1",
              texto: "Comprar a $30 y vender a $50",
              categoria: "📈 Ganancia",
            },
            {
              id: "gp2",
              texto: "Comprar a $50 y vender a $30",
              categoria: "📉 Pérdida",
            },
            {
              id: "gp3",
              texto: "PV > PC",
              categoria: "📈 Ganancia",
            },
            {
              id: "gp4",
              texto: "PV < PC",
              categoria: "📉 Pérdida",
            },
            {
              id: "gp5",
              texto: "G = PV - PC",
              categoria: "📈 Ganancia",
            },
            {
              id: "gp6",
              texto: "P = PC - PV",
              categoria: "📉 Pérdida",
            },
          ],
        },
        {
          id: "ganancia-perdida-completar",
          tipo: "completar",
          titulo: "Completa el resultado",
          dificultad: "Medio",
          xp: 90,
          pista: "Si el costo es mayor que el precio de venta, el resultado es negativo.",
          solucion: "Cuando el precio de venta es menor que el costo, hay pérdida.",
          frase:
            "Si el precio de venta es menor que el precio de costo, el resultado es una __________.",
          opciones: ["pérdida", "ganancia", "comisión", "utilidad neta"],
          correcto: "pérdida",
        },
      ],
    },
  },

  "margen-ganancia": {
    id: "margen-ganancia",
    titulo: "Margen de Ganancia",
    icon: "📊",
    curso: "aritmetica-comercial",
    cursoLabel: "Aritmética Comercial y Financiera",
    categoria: "Administración y Negocios",
    simulador: "aritmetica",
    simuladorTipo: "margen-ganancia",
    resumen:
      "La ganancia expresada como porcentaje del costo. Permite comparar productos de distinto precio.",
    definicion: [
      "El **margen de ganancia (MG)** expresa la ganancia como un porcentaje del precio de costo.",
      "Se calcula dividiendo la ganancia entre el costo y multiplicando por 100: `MG = (G / PC) × 100`.",
    ],
    queEs: [
      "Es una forma de **normalizar la ganancia**: $20 sobre $30 no es lo mismo que $20 sobre $2,000.",
      "En aritmética comercial el margen se calcula **sobre el costo**. Cuando se calcula sobre el precio de venta se suele llamar margen comercial o margen sobre ventas.",
      "Sirve para comparar productos, negociar con proveedores y fijar precios objetivo.",
    ],
    paraQueSirve: [
      "**Comparar rentabilidad** entre productos de precios muy distintos.",
      "**Fijar precios** a partir de un margen deseado.",
      "**Negociar con proveedores:** saber cuánto margen se pierde si sube el costo.",
      "**Detectar productos** con margen insuficiente para cubrir gastos.",
    ],
    comoFunciona: [
      "```\nG  = PV - PC\nMG = (G / PC) × 100\n```",
      "Si se conoce el margen deseado, el precio de lista se obtiene con `PL = PC × (1 + MG / 100)`.",
      "**Ejemplo:** ganancia de $20 y costo de $30 → `MG = (20 / 30) × 100 = 66.67%`.",
      "**Cuidado:** un margen del 66.67% sobre el costo equivale a un margen del 40% sobre el precio de venta (`20 / 50`).",
    ],
    errores: [
      "**Calcular el margen sobre el precio de venta** cuando la fórmula pedida es sobre el costo: el resultado cambia.",
      "**Confundir margen con markup:** el markup es la ganancia sobre el costo; el margen comercial suele expresarse sobre la venta.",
      "**Sumar porcentajes de margen:** dos productos con 30% de margen no equivalen a un 60% combinado.",
      "**Ignorar los gastos operativos:** un margen alto puede desaparecer después de pagar la operación.",
    ],
    casos: [
      "**Retail:** comparar el margen de distintas categorías.",
      "**Servicios:** fijar honorarios con un margen objetivo sobre el costo del tiempo.",
      "**Manufactura:** evaluar si el precio cubre el costo de producción y deja margen.",
      "**Promociones:** calcular cuánto margen se sacrifica con cada descuento.",
    ],
    relacion: [
      "**Ganancia y pérdida:** el margen es la ganancia en porcentaje.",
      "**Precio de costo:** denominador de la fórmula.",
      "**Precio de lista:** se construye a partir del margen deseado.",
      "**Ganancia neta:** el margen neto usa el precio de venta como base.",
    ],
    analogia:
      "El margen es como el rendimiento de una inversión: no importa solo cuánto ganas, sino cuánto ganas por cada dólar que pusiste. $20 sobre $30 es un gran rendimiento; $20 sobre $2,000 es casi nada.",
    notasPersonales: [
      "Escribe siempre la base del margen: «sobre costo» o «sobre venta». Sin eso, el número es ambiguo.",
      "Para convertir margen sobre costo a margen sobre venta: `MV = MG / (1 + MG)`.",
      "Un margen del 100% sobre el costo equivale a un 50% sobre la venta.",
    ],
    extras: [
      {
        seccion: "📊 Resumen de fórmulas",
        textos: [
          "**Margen sobre costo:** `MG = (G / PC) × 100`",
          "**Margen sobre venta:** `MV = (G / PV) × 100`",
          "**Precio con margen objetivo:** `PL = PC × (1 + MG / 100)`",
        ],
      },
    ],
    fuente:
      "Aritmética Comercial y Financiera — apuntes de Notion · Matemáticas Financieras · Khan Academy",
    quiz: [
      {
        id: 1,
        pregunta: "¿Cuál es la fórmula del margen de ganancia sobre el costo?",
        opciones: [
          "MG = (G / PV) × 100",
          "MG = (G / PC) × 100",
          "MG = PC / G × 100",
          "MG = PV - PC",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "Si la ganancia es $20 y el costo es $30, ¿cuál es el margen sobre el costo?",
        opciones: ["40%", "66.67%", "150%", "20%"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Por qué el margen es útil para comparar productos?",
        opciones: [
          "Porque siempre es el mismo",
          "Porque expresa la ganancia en porcentaje y no solo en monto",
          "Porque elimina los impuestos",
          "Porque reemplaza al precio de costo",
        ],
        correcta: 1,
      },
    ],
    lab: {
      misiones: [
        {
          id: "margen-ganancia-completar",
          tipo: "completar",
          titulo: "Completa la base del margen",
          dificultad: "Fácil",
          xp: 60,
          pista: "En aritmética comercial el margen se calcula sobre el costo.",
          solucion: "MG = (Ganancia / Precio de costo) × 100.",
          frase:
            "El margen de ganancia se calcula dividiendo la ganancia entre el __________ y multiplicando por 100.",
          opciones: [
            "precio de costo",
            "precio de lista",
            "precio final",
            "descuento",
          ],
          correcto: "precio de costo",
        },
        {
          id: "margen-ganancia-ordenar",
          tipo: "ordenar",
          titulo: "Calcula el margen paso a paso",
          dificultad: "Medio",
          xp: 90,
          pista: "Primero obtén la ganancia; después relaciónala con el costo.",
          solucion:
            "Ganancia → costo → división G/PC → multiplicación por 100.",
          pasos: [
            "Calcula la ganancia: G = PV - PC.",
            "Identifica el precio de costo que servirá de base.",
            "Divide la ganancia entre el costo: G / PC.",
            "Multiplica por 100 para obtener el porcentaje.",
          ],
        },
      ],
    },
  },

  descuento: {
    id: "descuento",
    titulo: "Descuento simple",
    icon: "✂️",
    curso: "aritmetica-comercial",
    cursoLabel: "Aritmética Comercial y Financiera",
    categoria: "Administración y Negocios",
    simulador: "aritmetica",
    simuladorTipo: "descuento",
    resumen:
      "La reducción del precio de lista expresada en porcentaje. Calcula cuánto se rebaja y cuánto paga el cliente.",
    definicion: [
      "El **descuento** es la reducción del precio de lista que el vendedor ofrece al comprador.",
      "Se expresa normalmente como un porcentaje del precio de lista y se resta para obtener el precio final.",
    ],
    queEs: [
      "Es una **herramienta comercial** para atraer clientes, liquidar inventario o premiar volumen.",
      "El descuento se aplica sobre el **precio de lista**, no sobre el costo.",
      "El **precio final** es lo que realmente paga el cliente después del descuento.",
    ],
    paraQueSirve: [
      "**Calcular promociones** sin improvisar el precio final.",
      "**Medir el impacto** de una rebaja en la ganancia.",
      "**Negociar** con clientes mayoristas.",
      "**Liquidar inventario** sabiendo cuánto se deja de ingresar.",
    ],
    comoFunciona: [
      "```\nD  = PL × (%D / 100)\nPF = PL - D\nPF = PL × (1 - %D / 100)\n```",
      "**Ejemplo:** PL = $50 y descuento del 20% → `D = 50 × 0.20 = $10` y `PF = 50 - 10 = $40`.",
      "Si el descuento supera el margen, la venta puede dejar de ser rentable aunque el precio final siga siendo mayor que el costo.",
    ],
    errores: [
      "**Aplicar el descuento sobre el costo** en lugar del precio de lista.",
      "**Sumar descuentos sucesivos** como si fueran uno solo (20% + 10% no es 30%).",
      "**Olvidar que el descuento reduce la ganancia**, no solo el precio.",
      "**Confundir el porcentaje de descuento con el precio final.**",
    ],
    casos: [
      "**Black Friday:** aplicar un porcentaje fijo sobre el catálogo.",
      "**Clientes mayoristas:** descuentos por volumen.",
      "**Cupones:** calcular el precio final antes de cobrar.",
      "**Liquidaciones:** saber cuánto se resigna de margen.",
    ],
    relacion: [
      "**Precio de lista:** base del descuento.",
      "**Descuentos sucesivos:** varios descuentos aplicados en cadena.",
      "**Ganancia:** el descuento reduce el precio de venta y la ganancia.",
      "**Regla de tres:** permite calcular descuentos proporcionales.",
    ],
    analogia:
      "El descuento es como un cupón que recorta la etiqueta: la etiqueta sigue diciendo $50, pero en caja pagas $40. El recorte no cambia lo que costó el producto; cambia lo que recibe el vendedor.",
    notasPersonales: [
      "Descuento del 20% = multiplicar por 0.80. Es la forma más rápida de calcular el precio final.",
      "Antes de promocionar, comprueba que el precio final siga cubriendo el costo.",
      "Un descuento del 50% exige vender el doble para mantener el mismo ingreso.",
    ],
    extras: [
      {
        seccion: "📊 Resumen de fórmulas",
        textos: [
          "**Descuento:** `D = PL × (%D / 100)`",
          "**Precio final:** `PF = PL - D`",
          "**Factor directo:** `PF = PL × (1 - %D / 100)`",
        ],
      },
    ],
    fuente:
      "Aritmética Comercial y Financiera — apuntes de Notion · Matemáticas Financieras · Khan Academy",
    quiz: [
      {
        id: 1,
        pregunta: "¿Sobre qué se calcula normalmente un descuento?",
        opciones: [
          "Sobre el costo",
          "Sobre el precio de lista",
          "Sobre la ganancia neta",
          "Sobre los impuestos",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "Si el precio de lista es $50 y el descuento es 20%, ¿cuánto paga el cliente?",
        opciones: ["$40", "$30", "$10", "$45"],
        correcta: 0,
      },
      {
        id: 3,
        pregunta: "¿Qué ocurre con la ganancia cuando aumenta el descuento?",
        opciones: [
          "Aumenta",
          "Se mantiene igual",
          "Disminuye",
          "Se convierte en margen",
        ],
        correcta: 2,
      },
    ],
    lab: {
      misiones: [
        {
          id: "descuento-emparejar",
          tipo: "emparejar",
          titulo: "Une cada término con su fórmula",
          dificultad: "Fácil",
          xp: 60,
          pista: "El descuento se resta al precio de lista para llegar al precio final.",
          solucion:
            "D = PL × (%D/100) · PF = PL - D · %D = (D/PL) × 100.",
          pares: [
            {
              concepto: "Descuento (D)",
              descripcion: "PL × (%D / 100).",
            },
            {
              concepto: "Precio final (PF)",
              descripcion: "PL - D.",
            },
            {
              concepto: "Porcentaje de descuento",
              descripcion: "(D / PL) × 100.",
            },
          ],
        },
        {
          id: "descuento-ordenar",
          tipo: "ordenar",
          titulo: "Calcula un descuento",
          dificultad: "Medio",
          xp: 90,
          pista: "Primero el monto del descuento; después la resta.",
          solucion:
            "PL → convertir el porcentaje → multiplicar → restar para obtener el PF.",
          pasos: [
            "Identifica el precio de lista.",
            "Convierte el porcentaje de descuento a decimal.",
            "Multiplica el precio de lista por ese decimal.",
            "Resta el descuento al precio de lista para obtener el precio final.",
          ],
        },
      ],
    },
  },

  "descuentos-sucesivos": {
    id: "descuentos-sucesivos",
    titulo: "Descuentos sucesivos",
    icon: "🪜",
    curso: "aritmetica-comercial",
    cursoLabel: "Aritmética Comercial y Financiera",
    categoria: "Administración y Negocios",
    simulador: "aritmetica",
    simuladorTipo: "descuentos-sucesivos",
    resumen:
      "Varios descuentos aplicados en cadena. No se suman: se multiplican sus factores y se obtiene un descuento único equivalente.",
    definicion: [
      "Los **descuentos sucesivos** son dos o más descuentos que se aplican uno después del otro sobre el precio ya rebajado.",
      "El descuento único equivalente se calcula multiplicando los factores `(100 - d)` y comparando con el precio original.",
    ],
    queEs: [
      "Es una **cadena de rebajas**: el segundo descuento se calcula sobre lo que quedó después del primero, no sobre el precio original.",
      "Por eso **no se suman**: un 20% y luego un 10% no equivalen a un 30%, sino a un 28%.",
      "La fórmula general usa potencias de 100 para normalizar la cadena.",
    ],
    paraQueSirve: [
      "**Calcular promociones en cascada** (rebaja + cupón + cliente frecuente).",
      "**Comparar ofertas** que usan descuentos distintos.",
      "**Evitar errores de suma** al comunicar el descuento real.",
      "**Medir el impacto acumulado** en el margen.",
    ],
    comoFunciona: [
      "```\nDU = 100 - [(100 - d1)(100 - d2)…(100 - dn)] / 100^(n-1)\nPF = PL × (1 - d1/100) × (1 - d2/100) × …\n```",
      "**Ejemplo 1:** 20% y 10% → `DU = 100 - (80 × 90) / 100 = 28%`.",
      "**Ejemplo 2:** 10%, 20% y 30% → `DU = 100 - (90 × 80 × 70) / 100^2 = 49.6%`.",
      "Verificación con PL = $100: tras 20% quedan $80; tras 10% quedan $72; el descuento total es $28.",
    ],
    errores: [
      "**Sumar los porcentajes:** 20% + 10% = 30% es incorrecto; el equivalente es 28%.",
      "**Aplicar todos los descuentos sobre el precio original:** el segundo debe aplicarse sobre el precio ya rebajado.",
      "**Olvidar la potencia de 100** cuando hay tres o más descuentos.",
      "**Comunicar el descuento único** sin verificar el precio final.",
    ],
    casos: [
      "**Campañas combinadas:** descuento de temporada + cupón.",
      "**Clientes frecuentes:** rebaja base más beneficio de fidelidad.",
      "**Liquidaciones por volumen:** varios tramos acumulados.",
      "**Comparación de ofertas:** normalizar todo a un descuento único.",
    ],
    relacion: [
      "**Descuento simple:** caso base de un solo porcentaje.",
      "**Precio de lista:** punto de partida de la cadena.",
      "**Ganancia:** cada descuento adicional reduce el margen.",
      "**Regla de tres:** útil para verificar el precio final.",
    ],
    analogia:
      "Los descuentos sucesivos son como bajar una escalera: cada peldaño te acerca al suelo, pero el segundo peldaño ya no mide lo mismo que el primero. No puedes sumar las alturas sin mirar desde dónde empezaste.",
    notasPersonales: [
      "Regla práctica: multiplica los factores. `0.80 × 0.90 = 0.72` → pagas 72%, descuento del 28%.",
      "Tres descuentos se resuelven igual: `0.90 × 0.80 × 0.70 = 0.504` → descuento del 49.6%.",
      "El descuento único equivalente siempre es **menor** que la suma de los porcentajes.",
    ],
    extras: [
      {
        seccion: "📊 Resumen de fórmulas",
        textos: [
          "**Descuento único equivalente:** `DU = 100 - [(100-d1)(100-d2)…] / 100^(n-1)`",
          "**Precio final:** `PF = PL × (1 - d1/100) × (1 - d2/100) × …`",
          "**Verificación:** `DU = (PL - PF) / PL × 100`",
        ],
      },
    ],
    fuente:
      "Aritmética Comercial y Financiera — apuntes de Notion · Matemáticas Financieras · Khan Academy",
    quiz: [
      {
        id: 1,
        pregunta: "¿Un 20% seguido de un 10% equivale a qué descuento único?",
        opciones: ["30%", "28%", "25%", "32%"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Por qué no se suman los descuentos sucesivos?",
        opciones: [
          "Porque el segundo se aplica sobre el precio ya rebajado",
          "Porque los porcentajes siempre son negativos",
          "Porque el precio de lista cambia",
          "Porque el impuesto lo impide",
        ],
        correcta: 0,
      },
      {
        id: 3,
        pregunta: "Con descuentos de 10%, 20% y 30%, ¿cuál es el descuento único aproximado?",
        opciones: ["60%", "49.6%", "50.4%", "40%"],
        correcta: 1,
      },
    ],
    lab: {
      misiones: [
        {
          id: "descuentos-sucesivos-completar",
          tipo: "completar",
          titulo: "Completa el descuento equivalente",
          dificultad: "Medio",
          xp: 90,
          pista: "Multiplica 0.80 por 0.90 y mira cuánto queda por pagar.",
          solucion:
            "0.80 × 0.90 = 0.72 → se paga el 72% → el descuento único es 28%.",
          frase:
            "Un descuento del 20% seguido de otro del 10% equivale a un descuento único del __________.",
          opciones: ["30%", "28%", "25%", "18%"],
          correcto: "28%",
        },
        {
          id: "descuentos-sucesivos-ordenar",
          tipo: "ordenar",
          titulo: "Resuelve una cadena de descuentos",
          dificultad: "Difícil",
          xp: 120,
          pista: "Cada descuento se aplica sobre el resultado anterior.",
          solucion:
            "Aplicar el primer descuento → aplicar el segundo sobre el precio rebajado → multiplicar los factores → convertir el factor final a porcentaje.",
          pasos: [
            "Calcula el primer descuento sobre el precio de lista.",
            "Aplica el segundo descuento sobre el precio ya rebajado.",
            "Multiplica todos los factores (1 - d/100).",
            "Convierte el factor final en descuento único: (1 - factor) × 100.",
          ],
        },
      ],
    },
  },

  "regla-tres": {
    id: "regla-tres",
    titulo: "Regla de Tres Simple",
    icon: "🔧",
    curso: "aritmetica-comercial",
    cursoLabel: "Aritmética Comercial y Financiera",
    categoria: "Administración y Negocios",
    simulador: "aritmetica",
    simuladorTipo: "regla-tres",
    resumen:
      "La herramienta universal de proporcionalidad: con tres datos conocidos se calcula el cuarto.",
    definicion: [
      "La **regla de tres simple** resuelve problemas de proporcionalidad entre dos magnitudes cuando se conocen tres valores y se busca el cuarto.",
      "Se plantea con dos columnas y se resuelve multiplicando en cruz: `x = (b × c) / a`.",
    ],
    queEs: [
      "Es la **navaja suiza** de la aritmética comercial: sirve para descuentos, ganancias, márgenes y precios.",
      "Puede ser **directa** (cuando una magnitud sube, la otra también) o **inversa** (cuando una sube, la otra baja).",
      "En la mayoría de los problemas comerciales la proporcionalidad es directa.",
    ],
    paraQueSirve: [
      "**Calcular descuentos** proporcionales a otros precios.",
      "**Escalar costos y ganancias** a distintas cantidades.",
      "**Obtener el precio de lista** a partir del precio final.",
      "**Comparar ofertas** sin fórmulas complejas.",
    ],
    comoFunciona: [
      "```\na → b\nc → x\n\nx = (b × c) / a\n```",
      "**Ejemplo:** si 5 productos cuestan $100, ¿cuánto cuestan 8? → `x = (100 × 8) / 5 = $160`.",
      "**Ejemplo comercial:** si $100 generan $20 de descuento, ¿cuánto será para $50? → `x = (20 × 50) / 100 = $10`.",
      "Verifica siempre que las unidades de cada columna sean las mismas.",
    ],
    errores: [
      "**Mezclar unidades** (dólares con unidades, porcentajes con montos) en la misma columna.",
      "**Elegir mal la proporcionalidad:** usar regla directa cuando la relación es inversa.",
      "**Multiplicar los valores equivocados:** el producto en cruz debe cruzar las magnitudes relacionadas.",
      "**No verificar el resultado:** si no tiene sentido comercial, el planteo está mal.",
    ],
    casos: [
      "**Descuentos:** calcular el monto para otro precio.",
      "**Producción:** escalar costos según cantidad.",
      "**Comisiones:** calcular el porcentaje que corresponde a una venta.",
      "**Precios:** recuperar el 100% a partir de un precio rebajado.",
    ],
    relacion: [
      "**Descuento simple:** se puede resolver con regla de tres.",
      "**Margen de ganancia:** se relaciona con la regla de tres para obtener porcentajes.",
      "**Precio de lista:** se recupera desde el precio final.",
      "**Ganancia y pérdida:** se escalan a otras cantidades.",
    ],
    analogia:
      "La regla de tres es como una balanza de dos platos: si conoces el peso de un lado y la proporción del otro, puedes descubrir lo que falta sin adivinar. Solo hay que colocar cada cosa en la columna correcta.",
    notasPersonales: [
      "Ordena primero: magnitud conocida → resultado conocido; luego la incógnita.",
      "Si al duplicar una magnitud la otra también se duplica, la proporcionalidad es directa.",
      "La regla de tres no reemplaza el razonamiento: comprueba que el resultado sea coherente.",
    ],
    extras: [
      {
        seccion: "📊 Resumen de fórmulas",
        textos: [
          "**Regla de tres directa:** `x = (b × c) / a`",
          "**Verificación:** `a × x = b × c`",
          "**Porcentaje:** `parte = total × (% / 100)`",
        ],
      },
    ],
    fuente:
      "Aritmética Comercial y Financiera — apuntes de Notion · Matemáticas Financieras · Khan Academy",
    quiz: [
      {
        id: 1,
        pregunta: "En una regla de tres simple directa, ¿cómo se calcula x?",
        opciones: ["x = (a × b) / c", "x = (b × c) / a", "x = (a × c) / b", "x = a + b + c"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "Si 5 productos cuestan $100, ¿cuánto cuestan 8?",
        opciones: ["$125", "$160", "$180", "$80"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué debes comprobar antes de aplicar la regla de tres?",
        opciones: [
          "Que las unidades de cada columna sean coherentes",
          "Que el resultado sea un número par",
          "Que el precio de lista sea mayor que el costo",
          "Que el descuento sea mayor al 10%",
        ],
        correcta: 0,
      },
    ],
    lab: {
      misiones: [
        {
          id: "regla-tres-ordenar",
          tipo: "ordenar",
          titulo: "Resuelve una regla de tres",
          dificultad: "Fácil",
          xp: 60,
          pista: "Primero ordena, luego verifica la proporción y al final multiplica en cruz.",
          solucion:
            "Datos en dos columnas → proporcionalidad directa → producto en cruz → división.",
          pasos: [
            "Ordena los datos en dos columnas con unidades coherentes.",
            "Comprueba que la proporcionalidad sea directa.",
            "Multiplica en cruz los valores conocidos.",
            "Divide entre el valor que acompaña a la incógnita.",
          ],
        },
        {
          id: "regla-tres-completar",
          tipo: "completar",
          titulo: "Completa la fórmula",
          dificultad: "Medio",
          xp: 90,
          pista: "La incógnita se despeja dividiendo el producto en cruz entre el valor de su columna.",
          solucion: "x = (b × c) / a.",
          frase: "En una regla de tres simple directa, x = (b × c) / __________.",
          opciones: ["a", "b", "c", "100"],
          correcto: "a",
        },
      ],
    },
  },

  "pv-ganancias": {
    id: "pv-ganancias",
    titulo: "PV, Ganancia Bruta y Ganancia Neta",
    icon: "🧾",
    curso: "aritmetica-comercial",
    cursoLabel: "Aritmética Comercial y Financiera",
    categoria: "Administración y Negocios",
    simulador: "aritmetica",
    simuladorTipo: "pv-ganancias",
    resumen:
      "Del precio de venta a la ganancia real: separa costo directo, gastos operativos, impuestos e intereses.",
    definicion: [
      "El **precio de venta (PV)** es lo que paga el cliente. La **ganancia bruta** resta solo el costo directo; la **ganancia neta** resta todos los costos y gastos.",
      "La ganancia bruta mide la rentabilidad del producto; la ganancia neta mide la rentabilidad real del negocio.",
    ],
    queEs: [
      "**PV:** ingreso final por la venta, con o sin impuestos incluidos según cómo se facture.",
      "**Costo directo (CD):** materias primas, compra o producción del producto.",
      "**Gastos operativos (GO):** alquiler, sueldos administrativos, marketing, servicios.",
      "**Impuestos (Imp) e intereses (Int):** obligaciones y costo del financiamiento.",
      "**Ganancia bruta:** `GB = PV - CD`. **Ganancia neta:** `GN = PV - (CD + GO + Imp + Int)`.",
    ],
    paraQueSirve: [
      "**Evaluar productos** antes y después de los gastos del negocio.",
      "**Fijar precios** que cubran todos los costos y dejen utilidad.",
      "**Comparar períodos** y detectar si los gastos se están comiendo el margen.",
      "**Negociar con proveedores** para mejorar la ganancia bruta.",
      "**Controlar gastos** para mejorar la ganancia neta.",
    ],
    comoFunciona: [
      "```\nGB = PV - CD\nMB = (GB / PV) × 100\nGN = PV - (CD + GO + Imp + Int)\nMN = (GN / PV) × 100\n```",
      "La ganancia bruta responde: ¿el producto es rentable en sí mismo? La neta responde: ¿el negocio gana dinero después de todo?",
      "**Ejemplo:** PV = $100, CD = $60, GO = $20, Imp = $5, Int = $2 → GB = $40 (40%), GN = $13 (13%).",
      "Los gastos, impuestos e intereses consumen la diferencia entre ambos márgenes: 27% en el ejemplo.",
    ],
    errores: [
      "**Confundir ganancia bruta con ganancia neta:** la bruta no es la ganancia real.",
      "**Olvidar gastos operativos, impuestos o intereses** en la ganancia neta.",
      "**Calcular el margen sobre el costo** cuando la fórmula lo pide sobre el PV.",
      "**Ignorar costos indirectos:** alquiler y administración también cuestan.",
      "**Comparar márgenes brutos de productos** sin considerar sus gastos asociados.",
    ],
    casos: [
      "**Fijar precios:** determinar el PV que deje la ganancia neta deseada.",
      "**Evaluar rentabilidad:** comparar GB y GN entre productos.",
      "**Decidir discontinuar** un producto con ganancia neta negativa.",
      "**Negociar proveedores:** reducir el CD para mejorar la GB.",
      "**Presupuestos:** proyectar ingresos, costos y gastos.",
    ],
    relacion: [
      "**Precio de costo:** forma parte del costo directo.",
      "**Margen de ganancia:** el margen bruto y el neto usan el PV como base.",
      "**Ganancia y pérdida:** la GB y la GN son versiones ampliadas del mismo concepto.",
      "**Caso integrador:** combina precio, descuento y rentabilidad.",
    ],
    analogia:
      "Una pizzería: el PV es lo que cobras por la pizza; el costo directo son los ingredientes; la ganancia bruta es lo que queda antes de pagar el local, la luz y el cajero; la ganancia neta es lo que realmente te llevas al bolsillo.",
    notasPersonales: [
      "La ganancia bruta es el primer filtro: si es negativa, el producto no es viable.",
      "La ganancia neta es la realidad: si es negativa, la empresa pierde dinero.",
      "El margen neto se calcula sobre el PV, no sobre el costo.",
    ],
    extras: [
      {
        seccion: "📊 Comparativa bruta vs. neta",
        textos: [
          "**Ganancia bruta:** `GB = PV - CD` · mide la rentabilidad del producto.",
          "**Ganancia neta:** `GN = PV - (CD + GO + Imp + Int)` · mide la rentabilidad real.",
          "**Margen bruto:** `MB = (GB / PV) × 100`.",
          "**Margen neto:** `MN = (GN / PV) × 100`.",
        ],
      },
    ],
    fuente:
      "Aritmética Comercial y Financiera — apuntes de Notion · Gitman & Zutter · Khan Academy",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué resta la ganancia bruta?",
        opciones: [
          "Todos los costos y gastos",
          "Solo el costo directo",
          "Solo los impuestos",
          "El precio de lista",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "Con PV $100, CD $60, GO $20, Imp $5 e Int $2, ¿cuál es la ganancia neta?",
        opciones: ["$40", "$13", "$20", "$8"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Sobre qué base se calcula el margen neto?",
        opciones: [
          "Sobre el costo directo",
          "Sobre el precio de venta",
          "Sobre los gastos operativos",
          "Sobre la ganancia bruta",
        ],
        correcta: 1,
      },
    ],
    lab: {
      misiones: [
        {
          id: "pv-ganancias-clasificar",
          tipo: "clasificar",
          titulo: "Clasifica cada cálculo",
          dificultad: "Medio",
          xp: 90,
          pista: "La ganancia bruta solo descuenta el costo directo; la neta descuenta todo.",
          solucion:
            "PV - CD → bruta · PV - (CD + GO + Imp + Int) → neta · «ganancia real» → neta.",
          categorias: ["🧾 Ganancia bruta", "💰 Ganancia neta"],
          elementos: [
            {
              id: "pv1",
              texto: "PV - costo directo",
              categoria: "🧾 Ganancia bruta",
            },
            {
              id: "pv2",
              texto: "PV - (CD + GO + Imp + Int)",
              categoria: "💰 Ganancia neta",
            },
            {
              id: "pv3",
              texto: "No descuenta gastos operativos",
              categoria: "🧾 Ganancia bruta",
            },
            {
              id: "pv4",
              texto: "Es la ganancia real del negocio",
              categoria: "💰 Ganancia neta",
            },
            {
              id: "pv5",
              texto: "Mide la rentabilidad del producto",
              categoria: "🧾 Ganancia bruta",
            },
            {
              id: "pv6",
              texto: "Incluye impuestos e intereses",
              categoria: "💰 Ganancia neta",
            },
          ],
        },
        {
          id: "pv-ganancias-emparejar",
          tipo: "emparejar",
          titulo: "Une cada concepto con su fórmula",
          dificultad: "Medio",
          xp: 90,
          pista: "Bruta = producto; neta = negocio completo.",
          solucion:
            "GB = PV - CD · GN = PV - (CD + GO + Imp + Int) · MB y MN se calculan sobre el PV.",
          pares: [
            {
              concepto: "Ganancia bruta (GB)",
              descripcion: "PV - costo directo.",
            },
            {
              concepto: "Ganancia neta (GN)",
              descripcion: "PV - (CD + GO + Imp + Int).",
            },
            {
              concepto: "Margen bruto",
              descripcion: "(GB / PV) × 100.",
            },
            {
              concepto: "Margen neto",
              descripcion: "(GN / PV) × 100.",
            },
          ],
        },
      ],
    },
  },

  "caso-integrador": {
    id: "caso-integrador",
    titulo: "Caso integrador",
    icon: "🧩",
    curso: "aritmetica-comercial",
    cursoLabel: "Aritmética Comercial y Financiera",
    categoria: "Administración y Negocios",
    simulador: "aritmetica",
    simuladorTipo: "caso-integrador",
    resumen:
      "Une costo, margen, precio de lista y descuento para descubrir la ganancia real de una venta.",
    definicion: [
      "El **caso integrador** combina los conceptos anteriores en una sola operación: del costo al precio de lista, del precio de lista al precio final y del precio final a la ganancia real.",
      "Es la prueba de que un margen inicial atractivo puede reducirse drásticamente después de un descuento.",
    ],
    queEs: [
      "Un **flujo de cálculo** con cuatro estaciones: costo → precio de lista → descuento → precio final.",
      "Permite responder preguntas como: ¿cuánto gano realmente si ofrezco esta promoción?",
      "Conecta la aritmética comercial con la rentabilidad bruta y neta.",
    ],
    paraQueSirve: [
      "**Diseñar promociones** sin destruir el margen.",
      "**Validar precios** antes de publicarlos.",
      "**Negociar descuentos** con proveedores y clientes.",
      "**Explicar a un equipo comercial** por qué un descuento grande puede eliminar la ganancia.",
    ],
    comoFunciona: [
      "```\nG  = PC × (%Ganancia / 100)\nPL = PC + G\nD  = PL × (%Descuento / 100)\nPF = PL - D\nGreal = PF - PC\nMGreal = (Greal / PC) × 100\n```",
      "**Ejemplo:** PC = $80, ganancia del 25%, descuento del 10%.",
      "Ganancia = $20 → PL = $100 → Descuento = $10 → PF = $90.",
      "Ganancia real = $90 - $80 = $10 → margen real = 12.5%, no el 25% inicial.",
      "Conclusión: el descuento redujo la ganancia a la mitad.",
    ],
    errores: [
      "**Calcular el descuento sobre el costo** en lugar del precio de lista.",
      "**Suponer que la ganancia inicial se mantiene** después del descuento.",
      "**Olvidar los gastos operativos** al hablar de ganancia real.",
      "**Aplicar varios descuentos sumándolos** en lugar de encadenarlos.",
      "**No comparar la ganancia real con el margen objetivo.**",
    ],
    casos: [
      "**Lanzamiento de producto:** calcular el precio con promoción de entrada.",
      "**Venta mayorista:** margen objetivo con descuento por volumen.",
      "**Liquidación:** comprobar si el precio rebajado sigue dejando ganancia.",
      "**Simulación de escenarios:** comparar varios descuentos y márgenes.",
    ],
    relacion: [
      "**Precio de costo:** punto de partida del flujo.",
      "**Margen de ganancia:** define la ganancia inicial.",
      "**Precio de lista y descuento:** construyen el precio final.",
      "**Ganancia bruta y neta:** completan el análisis de rentabilidad.",
    ],
    analogia:
      "Es como preparar un plato y luego quitarle la guarnición: el precio de costo son los ingredientes, la ganancia es lo que añades, el precio de lista es el plato servido y el descuento es lo que retiras antes de entregarlo. Al final, lo que queda en el plato es la ganancia real.",
    notasPersonales: [
      "Nunca presentes un descuento sin calcular la ganancia real resultante.",
      "Si el descuento es igual al margen, la ganancia se vuelve cero.",
      "Este caso es la mejor prueba de que el margen se calcula sobre el costo y el descuento sobre el precio de lista.",
    ],
    extras: [
      {
        seccion: "📊 Flujo completo",
        textos: [
          "**1.** Ganancia deseada: `G = PC × (%G / 100)`.",
          "**2.** Precio de lista: `PL = PC + G`.",
          "**3.** Descuento: `D = PL × (%D / 100)`.",
          "**4.** Precio final: `PF = PL - D`.",
          "**5.** Ganancia real: `Greal = PF - PC`.",
          "**6.** Margen real: `MGreal = (Greal / PC) × 100`.",
        ],
      },
    ],
    fuente:
      "Aritmética Comercial y Financiera — apuntes de Notion · Matemáticas Financieras · Khan Academy",
    quiz: [
      {
        id: 1,
        pregunta:
          "Con PC $80, ganancia del 25% y descuento del 10%, ¿cuál es el precio final?",
        opciones: ["$90", "$100", "$80", "$72"],
        correcta: 0,
      },
      {
        id: 2,
        pregunta: "En el mismo caso, ¿cuál es la ganancia real?",
        opciones: ["$20", "$10", "$8", "$0"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Por qué la ganancia real es menor que la ganancia inicial?",
        opciones: [
          "Porque el costo subió",
          "Porque el descuento reduce el precio de venta",
          "Porque el margen se calcula sobre el PV",
          "Porque los impuestos aumentaron",
        ],
        correcta: 1,
      },
    ],
    lab: {
      misiones: [
        {
          id: "caso-integrador-ordenar",
          tipo: "ordenar",
          titulo: "Resuelve el caso completo",
          dificultad: "Difícil",
          xp: 120,
          pista: "Sigue el flujo: costo, ganancia, precio de lista, descuento y precio final.",
          solucion:
            "Ganancia → precio de lista → descuento → precio final → ganancia real y margen.",
          pasos: [
            "Calcula la ganancia deseada sobre el costo.",
            "Suma la ganancia al costo para obtener el precio de lista.",
            "Calcula el descuento sobre el precio de lista.",
            "Resta el descuento para obtener el precio final.",
            "Calcula la ganancia real y su margen sobre el costo.",
          ],
        },
        {
          id: "caso-integrador-completar",
          tipo: "completar",
          titulo: "Completa el resultado",
          dificultad: "Difícil",
          xp: 120,
          pista: "Con PC $80 y 25% de ganancia, el PL es $100; el 10% de $100 es $10.",
          solucion: "PL $100 - descuento $10 = $90 de precio final.",
          frase:
            "Con un precio de costo de $80, una ganancia del 25% y un descuento del 10%, el precio final es __________.",
          opciones: ["$90", "$100", "$80", "$72"],
          correcto: "$90",
        },
      ],
    },
  },

  /* === FIN DOCS === */
};
