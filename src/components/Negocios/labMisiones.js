/* Misiones curadas del Laboratorio de Administración y Negocios.
   Cada apunte puede sumar misiones "a mano" a las que genera
   scripts/generate-negocios.mjs (emparejar / completar).
   Se buscan por id de apunte: MISIONES_CURADAS[nota.id] ?? []. */

const XP = { Fácil: 60, Medio: 90, Difícil: 120 };

/* Clasificar: reparte los elementos entre las categorías del apunte. */
const clasificar = (notaId, base) => ({
  tipo: "clasificar",
  xp: XP[base.dificultad],
  ...base,
  id: `${notaId}-clasificar`,
});

/* Ordenar: recupera la secuencia correcta de pasos. */
const ordenar = (notaId, base) => ({
  tipo: "ordenar",
  xp: XP[base.dificultad],
  ...base,
  id: `${notaId}-ordenar`,
});

const e = (id, texto, categoria) => ({ id, texto, categoria });

export const MISIONES_CURADAS = {
  /* 🟦 FODA — los 4 cuadrantes según origen y signo. */
  foda: [
    clasificar("foda", {
      titulo: "Ordena la matriz FODA",
      dificultad: "Fácil",
      pista:
        "Pregunta dos veces: ¿de dónde viene (interno o externo) y qué signo tiene (positivo o negativo)?",
      solucion:
        "Fortalezas = interno/positivo · Debilidades = interno/negativo · Oportunidades = externo/positivo · Amenazas = externo/negativo.",
      categorias: [
        "💪 Interno · Positivo",
        "⚠️ Interno · Negativo",
        "🚀 Externo · Positivo",
        "🔥 Externo · Negativo",
      ],
      elementos: [
        e("f1", "Marca reconocida y valorada por los clientes", "💪 Interno · Positivo"),
        e("f2", "Equipo talentoso y comprometido", "💪 Interno · Positivo"),
        e("f3", "Tecnología obsoleta", "⚠️ Interno · Negativo"),
        e("f4", "Alta rotación de personal", "⚠️ Interno · Negativo"),
        e("f5", "Crecimiento del delivery en la región", "🚀 Externo · Positivo"),
        e("f6", "Nuevas categorías: supermercado y farmacia", "🚀 Externo · Positivo"),
        e("f7", "Competencia de Rappi, Uber Eats y PedidosYa", "🔥 Externo · Negativo"),
        e("f8", "Regulación laboral para repartidores", "🔥 Externo · Negativo"),
      ],
    }),
  ],

  /* 🌍 PESTEL — las 6 fuerzas del entorno macro. */
  pestel: [
    clasificar("pestel", {
      titulo: "Clasifica los factores del entorno",
      dificultad: "Fácil",
      pista: "Cada factor pertenece a una sola de las 6 letras del acrónimo.",
      solucion:
        "P = Político · E = Económico · S = Social · T = Tecnológico · E = Ecológico · L = Legal.",
      categorias: [
        "🏛️ Político",
        "💶 Económico",
        "👥 Social",
        "🤖 Tecnológico",
        "🌿 Ecológico",
        "⚖️ Legal",
      ],
      elementos: [
        e("p1", "Aranceles impuestos a los productos importados", "🏛️ Político"),
        e("p2", "Incentivos fiscales a las startups tecnológicas", "🏛️ Político"),
        e("p3", "Alta inflación y volatilidad del tipo de cambio", "💶 Económico"),
        e("p4", "Tasa de interés baja que facilita el financiamiento", "💶 Económico"),
        e("p5", "Población joven con alta penetración de smartphones", "👥 Social"),
        e("p6", "Preferencia creciente por las compras en línea", "👥 Social"),
        e("p7", "Avances en IA y cloud computing para escalar", "🤖 Tecnológico"),
        e("p8", "Automatización y logística inteligente", "🤖 Tecnológico"),
        e("p9", "Demanda de banca verde y productos sostenibles", "🌿 Ecológico"),
        e("p10", "Empaques reciclables y menor conciencia ambiental", "🌿 Ecológico"),
        e("p11", "Regulaciones de protección de datos (LGPD, GDPR)", "⚖️ Legal"),
        e("p12", "Leyes de protección al consumidor más estrictas", "⚖️ Legal"),
      ],
    }),
  ],

  /* 📊 Matriz BCG — participación vs. crecimiento. */
  "matriz-bcg": [
    clasificar("matriz-bcg", {
      titulo: "Ubica los productos en la Matriz BCG",
      dificultad: "Fácil",
      pista: "Mira dos cosas: cuánto crece el mercado y cuánto lo domina la empresa.",
      solucion:
        "Estrella = alta participación/alto crecimiento · Vaca Lechera = alta/bajo · Interrogante = baja/alto · Perro = baja/bajo.",
      categorias: [
        "⭐ Estrella",
        "🐄 Vaca Lechera",
        "❓ Interrogante",
        "🐕 Perro",
      ],
      elementos: [
        e("b1", "iPhone (Apple): líder en un mercado en rápido crecimiento", "⭐ Estrella"),
        e("b2", "Tesla: vehículo eléctrico con alta participación y crecimiento", "⭐ Estrella"),
        e("b3", "Windows (Microsoft): mercado maduro que genera efectivo", "🐄 Vaca Lechera"),
        e("b4", "Coca-Cola: bebidas carbonatadas de bajo crecimiento", "🐄 Vaca Lechera"),
        e("b5", "Google Stadia: apuesta que fracasó en un mercado en auge", "❓ Interrogante"),
        e("b6", "Amazon Alexa: poca participación pero mucho crecimiento", "❓ Interrogante"),
        e("b7", "BlackBerry: pocos ingresos en un mercado maduro", "🐕 Perro"),
        e("b8", "Kodak (película fotográfica): bajo crecimiento y participación", "🐕 Perro"),
      ],
    }),
  ],

  /* 🖼️ Business Model Canvas — los 9 bloques y sus 4 áreas. */
  "business-model-canvas": [
    clasificar("business-model-canvas", {
      titulo: "Agrupa los 9 bloques del lienzo",
      dificultad: "Medio",
      pista:
        "Pregúntate por qué pregunta responde cada bloque: ¿para quién?, ¿qué valor?, ¿cómo lo hacemos? o ¿cuánto entra y sale?",
      solucion:
        "Clientes → Segmentos, Relaciones, Canales · Oferta → Propuesta de Valor · Infraestructura → Recursos, Actividades, Alianzas · Financiera → Ingresos, Costos.",
      categorias: [
        "🎯 Clientes",
        "🎁 Oferta",
        "🏗️ Infraestructura",
        "💰 Viabilidad financiera",
      ],
      elementos: [
        e("c1", "Segmentos de Clientes: ¿para quién creamos valor?", "🎯 Clientes"),
        e("c2", "Canales: cómo llegamos al cliente", "🎯 Clientes"),
        e("c3", "Relaciones con Clientes: cómo nos vinculamos", "🎯 Clientes"),
        e("c4", "Propuesta de Valor: qué problema resolvemos", "🎁 Oferta"),
        e("c5", "Recursos Clave: plataforma, marca, talento", "🏗️ Infraestructura"),
        e("c6", "Actividades Clave: qué tenemos que hacer bien", "🏗️ Infraestructura"),
        e("c7", "Alianzas Clave: con quién colaboramos", "🏗️ Infraestructura"),
        e("c8", "Fuentes de Ingreso: de dónde entra el dinero", "💰 Viabilidad financiera"),
        e("c9", "Estructura de Costos: en qué se va el dinero", "💰 Viabilidad financiera"),
      ],
    }),
  ],

  /* 🗑️ MUDA — los 7 desperdicios del sistema Toyota. */
  muda: [
    clasificar("muda", {
      titulo: "Identifica los 7 desperdicios (TIM WOOD)",
      dificultad: "Difícil",
      pista:
        "TIM WOOD: Transporte, Inventario, Movimiento, Waiting (espera), Over-processing, Over-production, Defects.",
      solucion:
        "Transporte = mover cosas sin necesidad · Inventario = stock parado · Movimiento = personas caminando · Espera = tiempo muerto · Sobre-procesar = más de lo pedido · Sobre-producir = antes o más de lo pedido · Defectos = retrabajo.",
      categorias: [
        "🚛 Transporte",
        "📦 Inventario",
        "🚶 Movimiento",
        "⏳ Espera",
        "🔬 Sobre-procesamiento",
        "📈 Sobre-producción",
        "🐞 Defectos",
      ],
      elementos: [
        e("m1", "Mover productos entre almacenes sin necesidad", "🚛 Transporte"),
        e("m2", "Enviar un documento a cinco departamentos para revisarlo", "🚛 Transporte"),
        e("m3", "Acumular materias primas que no se utilizan", "📦 Inventario"),
        e("m4", "Productos terminados que nadie compra", "📦 Inventario"),
        e("m5", "Caminar largas distancias para buscar herramientas", "🚶 Movimiento"),
        e("m6", "Reorganizar el puesto de trabajo cada vez que se usa", "🚶 Movimiento"),
        e("m7", "Esperar la aprobación de un jefe para seguir", "⏳ Espera"),
        e("m8", "Una estación de trabajo parada esperando materiales", "⏳ Espera"),
        e("m9", "Informes con detalles que nadie pidió", "🔬 Sobre-procesamiento"),
        e("m10", "Pintar zonas que el cliente nunca verá", "🔬 Sobre-procesamiento"),
        e("m11", "Fabricar antes de tener la orden de compra", "📈 Sobre-producción"),
        e("m12", "Producir por si acaso más de lo que se vende", "📈 Sobre-producción"),
        e("m13", "Bugs en software que obligan a rehacer el trabajo", "🐞 Defectos"),
        e("m14", "Piezas defectuosas que hay que reprocesar", "🐞 Defectos"),
      ],
    }),
  ],

  /* 🔗 Cadena de Valor — el flujo de las 5 actividades primarias. */
  "cadena-de-valor": [
    ordenar("cadena-de-valor", {
      titulo: "Ordena las actividades primarias",
      dificultad: "Medio",
      pista: "Sigue el producto: entra, se transforma, sale, se vende y después se atiende.",
      solucion:
        "Logística Interna → Operaciones → Logística Externa → Marketing y Ventas → Servicio al Cliente.",
      pasos: [
        "Logística Interna: recepción y almacenamiento de insumos",
        "Operaciones: transformación de insumos en producto terminado",
        "Logística Externa: almacenamiento y entrega al cliente",
        "Marketing y Ventas: persuadir al cliente para comprar",
        "Servicio al Cliente: soporte y garantía post-venta",
      ],
    }),
  ],

  /* 🔄 Proceso Administrativo — las 4 etapas de Fayol. */
  "proceso-administrativo": [
    ordenar("proceso-administrativo", {
      titulo: "Ordena el ciclo administrativo",
      dificultad: "Fácil",
      pista: "Primero se decide qué hacer, luego quién lo hace, luego se ejecuta y al final se mide.",
      solucion: "Planeación → Organización → Dirección → Control. El ciclo es cíclico: el control retroalimenta la planeación.",
      pasos: [
        "Planeación: definir objetivos y estrategias",
        "Organización: diseñar la estructura y asignar recursos",
        "Dirección: liderar, motivar y ejecutar",
        "Control: medir resultados y corregir desviaciones",
      ],
    }),
  ],

  /* 💻 SDLC — las 7 etapas del ciclo de vida del software. */
  sdlc: [
    ordenar("sdlc", {
      titulo: "Ordena las 7 etapas del SDLC",
      dificultad: "Difícil",
      pista:
        "No empieza por el código: primero se decide si vale la pena y qué se necesita.",
      solucion:
        "Planificación → Análisis de Requisitos → Diseño → Implementación → Pruebas → Despliegue → Mantenimiento.",
      pasos: [
        "Planificación: alcance, viabilidad y presupuesto",
        "Análisis de Requisitos: qué debe hacer el software",
        "Diseño: arquitectura, interfaz y base de datos",
        "Implementación: fase de codificación",
        "Pruebas: verificar que funciona y no tiene errores",
        "Despliegue: entrega al usuario final",
        "Mantenimiento: soporte, parches y nuevas versiones",
      ],
    }),
  ],

  /* 🎯 SMART — los 5 criterios de un objetivo bien escrito. */
  smart: [
    clasificar("smart", {
      titulo: "¿Qué criterio SMART cumple cada frase?",
      dificultad: "Medio",
      pista: "Traduce cada frase: ¿habla de qué lograr, de cuánto, de si se puede, de por qué o de cuándo?",
      solucion:
        "S = Específico · M = Medible · A = Alcanzable · R = Relevante · T = Temporal.",
      categorias: [
        "🎯 Específico",
        "📏 Medible",
        "✅ Alcanzable",
        "🧭 Relevante",
        "⏰ Temporal",
      ],
      elementos: [
        e("s1", "Define exactamente lo que se quiere lograr", "🎯 Específico"),
        e("s2", "Identifica quién está involucrado y en qué contexto", "🎯 Específico"),
        e("s3", "Usa porcentajes, números o tiempos para cuantificar", "📏 Medible"),
        e("s4", "Establece indicadores clave de rendimiento (KPIs)", "📏 Medible"),
        e("s5", "Es realista con los recursos disponibles", "✅ Alcanzable"),
        e("s6", "Es posible de lograr sin romper el presupuesto", "✅ Alcanzable"),
        e("s7", "Está alineado con los objetivos de la organización", "🧭 Relevante"),
        e("s8", "Contribuye al crecimiento del negocio", "🧭 Relevante"),
        e("s9", "Tiene una fecha límite definida", "⏰ Temporal"),
        e("s10", "Del 1 de julio al 30 de septiembre", "⏰ Temporal"),
      ],
    }),
  ],

  /* 🚀 Tipos de MVP — humo, mago de oz y conserje. */
  "tipos-mvp": [
    clasificar("tipos-mvp", {
      titulo: "Identifica cada tipo de MVP",
      dificultad: "Medio",
      pista:
        "Pregunta siempre lo mismo: ¿el usuario sabe que hay un humano detrás?",
      solucion:
        "Humo = landing page que solo mide demanda · Mago de Oz = humano oculto tras una interfaz automática · Conserje = humano a la vista que hace el servicio a mano.",
      categorias: [
        "💨 MVP de Humo",
        "🎩 Mago de Oz",
        "🛎️ Conserje",
      ],
      elementos: [
        e("v1", "Dropbox: un vídeo demostrativo antes de existir el producto", "💨 MVP de Humo"),
        e("v2", "Landing page donde se mide la tasa de registro", "💨 MVP de Humo"),
        e("v3", "Zappos: compran los zapatos a mano tras una web", "🎩 Mago de Oz"),
        e("v4", "El usuario cree que un software procesa su pedido", "🎩 Mago de Oz"),
        e("v5", "Airbnb: el fundador aloja a los huéspedes en persona", "🛎️ Conserje"),
        e("v6", "El equipo ofrece el servicio a mano y el cliente lo sabe", "🛎️ Conserje"),
      ],
    }),
  ],

  /* 🤝 Estilos de liderazgo. */
  "estilos-liderazgo": [
    clasificar("estilos-liderazgo", {
      titulo: "Relaciona el estilo con su rasgo",
      dificultad: "Medio",
      pista: "Mira qué mueve al equipo: el intercambio, la visión o el servicio a los demás.",
      solucion:
        "Transaccional = recompensa por rendimiento · Transformacional = inspira y cambia · Servicial = pone al equipo primero.",
      categorias: [
        "🤝 Transaccional",
        "🔥 Transformacional",
        "🤲 Servicial",
      ],
      elementos: [
        e("l1", "Ofrece recompensas a cambio del rendimiento", "🤝 Transaccional"),
        e("l2", "Motivación extrínseca: comisiones, bonos y castigos", "🤝 Transaccional"),
        e("l3", "Gerente de ventas que paga por objetivos", "🤝 Transaccional"),
        e("l4", "Inspira a trascender los propios intereses", "🔥 Transformacional"),
        e("l5", "Crea una visión convincente del futuro", "🔥 Transformacional"),
        e("l6", "CEO de una startup disruptiva", "🔥 Transformacional"),
        e("l7", "Pone las necesidades de los demás en primer lugar", "🤲 Servicial"),
        e("l8", "Practica la escucha activa y la empatía", "🤲 Servicial"),
        e("l9", "Líder de una ONG o de una comunidad", "🤲 Servicial"),
      ],
    }),
  ],

  /* 🧊 Marco ERRC — eliminar, reducir, elevar y crear. */
  "marco-errc": [
    clasificar("marco-errc", {
      titulo: "Aplica el marco ERRC",
      dificultad: "Medio",
      pista:
        "Dos acciones recortan costos (eliminar y reducir) y dos aumentan el valor percibido (elevar y crear).",
      solucion:
        "Eliminar = quitar por completo · Reducir = bajar por debajo del estándar · Elevar = subir por encima del estándar · Crear = aportar algo que la industria no ofrece.",
      categorias: [
        "🗑️ Eliminar",
        "✂️ Reducir",
        "📈 Elevar",
        "✨ Crear",
      ],
      elementos: [
        e("r1", "Animales, estrellas y carpas tradicionales del circo", "🗑️ Eliminar"),
        e("r2", "Gráficos de alta definición y controles complejos en la Wii", "🗑️ Eliminar"),
        e("r3", "La complejidad de las acrobacias y el humor vulgar", "✂️ Reducir"),
        e("r4", "La potencia de procesamiento de la consola", "✂️ Reducir"),
        e("r5", "La transparencia y el seguimiento GPS del viaje", "📈 Elevar"),
        e("r6", "La jugabilidad, la interacción física y la accesibilidad", "📈 Elevar"),
        e("r7", "El control por movimiento y los juegos para toda la familia", "✨ Crear"),
        e("r8", "La app móvil con calificación bidireccional y precios dinámicos", "✨ Crear"),
      ],
    }),
  ],

  /* ⚔️ Estrategias genéricas de Porter. */
  "estrategias-genericas-porter": [
    clasificar("estrategias-genericas-porter", {
      titulo: "Clasifica las estrategias de Porter",
      dificultad: "Medio",
      pista:
        "Una apuesta por el precio más bajo, otra por ser única y otra por quedarse en un nicho.",
      solucion:
        "Costos = ser el productor más barato · Diferenciación = producto percibido como único con recargo · Enfoque = concentrarse en un segmento concreto.",
      categorias: [
        "💵 Liderazgo en Costos",
        "💎 Diferenciación",
        "🔍 Enfoque",
      ],
      elementos: [
        e("g1", "Walmart: precios bajos por eficiencia logística", "💵 Liderazgo en Costos"),
        e("g2", "Ryanair: sin lujos y en aeropuertos secundarios", "💵 Liderazgo en Costos"),
        e("g3", "Procesos estandarizados y bajo gasto en I+D", "💵 Liderazgo en Costos"),
        e("g4", "Apple: diseño, ecosistema y marca premium", "💎 Diferenciación"),
        e("g5", "Mercedes-Benz: calidad, ingeniería y estatus", "💎 Diferenciación"),
        e("g6", "Inversión alta en I+D, diseño y marketing", "💎 Diferenciación"),
        e("g7", "Tesla: nicho de vehículos eléctricos de lujo", "🔍 Enfoque"),
        e("g8", "Airbnb: experiencias únicas en alojamientos no tradicionales", "🔍 Enfoque"),
        e("g9", "Especialización profunda en un segmento concreto", "🔍 Enfoque"),
      ],
    }),
  ],
};

/** Misiones curadas de un apunte (vacío si no tiene). */
export function misionesDeNota(notaId) {
  return MISIONES_CURADAS[notaId] ?? [];
}

/** Total de misiones curadas (para los contadores del curso). */
export const TOTAL_CURADAS = Object.values(MISIONES_CURADAS).reduce(
  (total, lista) => total + lista.length,
  0,
);
