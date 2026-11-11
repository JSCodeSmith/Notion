/**
 * Contenido curado de los cuatro tipos de innovación del curso de Innovación.
 *
 * Cada concepto se publica como un apunte independiente con su propio
 * simulador, quiz y laboratorio. Se genera con:
 *   node scripts/generate-innovacion-tipos.mjs
 */

export const GRUPO = {
  seccion: "Tipos de innovación · apuntes propios",
  conceptos: [
    "innovacion-incremental",
    "innovacion-disruptiva-tipo",
    "innovacion-radical",
    "innovacion-tecnologica",
  ],
};

export const CONCEPTOS = [
  {
    id: "innovacion-incremental",
    titulo: "Innovación Incremental",
    icon: "🪜",
    firma: "Mejora continua sobre lo que ya existe",
    simuladorTipo: "innovacion-incremental",
    definicion: [
      "La **Innovación Incremental** es la mejora continua y progresiva de productos, servicios o procesos que ya existen, optimizando lo que la organización ya sabe hacer.",
      "No cambia el modelo de negocio ni crea mercados nuevos: aumenta el valor entregado paso a paso, con menor riesgo y menor inversión.",
    ],
    queEs: [
      "Es una evolución, no una revolución: cambia el cómo, no el qué.",
      "Aprovecha capacidades, clientes y procesos existentes.",
      "Suele medirse en mejoras de calidad, costo, velocidad o experiencia.",
      "Es acumulativa: muchas mejoras pequeñas producen una gran ventaja.",
    ],
    paraQueSirve: [
      "Mejorar productos: añadir funciones o calidad sin cambiar la propuesta.",
      "Reducir costos: optimizar procesos y eliminar desperdicios.",
      "Retener clientes: resolver fricciones cotidianas de la experiencia.",
      "Competir en el día a día: mantener la relevancia del negocio actual.",
      "Aprender con bajo riesgo: experimentar sin comprometer el modelo.",
      "Construir cultura de mejora: involucrar al equipo en cambios pequeños.",
    ],
    comoFunciona: [
      "Se identifica un punto de dolor o una ineficiencia en lo que ya se hace.",
      "Se propone una mejora acotada y se prueba en pequeño.",
      "Se mide el resultado y, si funciona, se estandariza y se repite.",
      "El ciclo se repite de forma continua: es un motor de mejora, no un evento único.",
    ],
    errores: [
      "Quedarse solo en lo incremental: la competencia disruptiva puede dejar el producto obsoleto.",
      "Confundir cambio con mejora: no todo ajuste agrega valor.",
      "No medir el impacto: sin métricas no se sabe si la mejora funcionó.",
      "Mejorar sin escuchar al cliente: se optimiza lo que nadie valora.",
    ],
    casos: [
      "Una app que lanza actualizaciones mensuales con mejoras de usabilidad.",
      "Una fábrica que reduce tiempos de cambio de línea con metodología lean.",
      "Un banco que simplifica el formulario de apertura de cuenta.",
    ],
    relacion: [
      "Se conecta con la Innovación Radical y la Innovación Disruptiva.",
      "Es la base del negocio actual: financia las apuestas más arriesgadas.",
    ],
    analogia:
      "La innovación incremental es entrenar todos los días: no cambias de deporte, pero cada sesión te hace un poco mejor.",
    notasPersonales: [
      "No desprecies las mejoras pequeñas: sostenidas en el tiempo superan a un solo golpe de suerte.",
      "Reserva siempre una parte del presupuesto para apuestas no incrementales.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Detecta una fricción concreta en el producto o proceso actual.",
          "2️⃣ Define una mejora pequeña y medible.",
          "3️⃣ Prueba la mejora en un piloto acotado.",
          "4️⃣ Mide el impacto y recoge retroalimentación.",
          "5️⃣ Estandariza lo que funcionó y reinicia el ciclo.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "Un e-commerce reduce de 5 a 3 pasos el checkout.",
          "La conversión sube de 2,0% a 2,4% y el abandono baja 8%.",
          "La inversión fue baja y el riesgo, mínimo: eso es incremental.",
        ],
      },
    ],
    fuente: "Apuntes de Innovación · Notion",
  },
  {
    id: "innovacion-disruptiva-tipo",
    titulo: "Innovación Disruptiva",
    icon: "⚡",
    firma: "Empieza simple y barato, y termina desplazando al líder",
    simuladorTipo: "innovacion-disruptiva",
    definicion: [
      "La **Innovación Disruptiva** es la teoría de Clayton Christensen: una solución más simple y accesible entra por la base del mercado, mejora con el tiempo y termina desplazando a los incumbentes.",
      "No compite de frente al inicio: atiende a clientes que el líder ignora o a quienes no pueden pagar la solución tradicional.",
    ],
    queEs: [
      "Empieza en un segmento desatendido o de bajo precio.",
      "Suele ser más simple, accesible y económica que la oferta dominante.",
      "Mejora progresivamente hasta cubrir las necesidades del mercado principal.",
      "El incumbente suele ignorarla porque al principio no parece rentable.",
    ],
    paraQueSirve: [
      "Entrar a mercados dominados: atacar por la base sin pelear de frente.",
      "Democratizar acceso: llevar una solución a quienes no podían pagarla.",
      "Crear nuevos mercados: atender necesidades que nadie estaba resolviendo.",
      "Anticipar amenazas: detectar entrantes que empiezan pequeños.",
      "Diseñar modelos de negocio: combinar bajo costo con propuesta simple.",
      "Decidir portafolio: separar la apuesta disruptiva del negocio central.",
    ],
    comoFunciona: [
      "Una solución accesible aparece en un segmento que el líder no atiende.",
      "El entrante mejora su desempeño mientras el líder sube de precio y complejidad.",
      "Cuando la solución es suficiente para el mercado masivo, el desplazamiento ocurre.",
      "El líder suele reaccionar tarde porque defender su margen actual le resulta más rentable.",
    ],
    errores: [
      "Confundir disrupción con innovación radical: no todo salto tecnológico es disruptivo.",
      "Ignorar a los entrantes pequeños: la amenaza crece mientras parece irrelevante.",
      "Lanzar la disrupción dentro del negocio central: la cultura y las métricas la frenan.",
      "Creer que la disrupción es inmediata: suele tomar años en madurar.",
    ],
    casos: [
      "Netflix frente al alquiler de películas: empezó con catálogo limitado y envío por correo.",
      "Los smartphones frente a las cámaras compactas: resolvieron lo suficiente para la mayoría.",
      "Las fintech frente a la banca tradicional: empezaron con servicios simples y masivos.",
    ],
    relacion: [
      "Se conecta con la Innovación Incremental y la Innovación Radical.",
      "La disrupción suele combinar un modelo de negocio nuevo con tecnología accesible.",
    ],
    analogia:
      "La innovación disruptiva es una marea: al principio moja los pies y nadie le presta atención; cuando sube, ya no puedes quedarte en la playa.",
    notasPersonales: [
      "La disrupción no siempre es tecnológica: también puede ser un modelo de negocio más simple.",
      "Si tu cliente principal no valora la solución entrante, pregúntate si está mirando el segmento correcto.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Identifica un segmento desatendido o que no puede pagar la solución actual.",
          "2️⃣ Diseña una propuesta más simple y accesible para ese segmento.",
          "3️⃣ Valida que el modelo sea sostenible con precios bajos.",
          "4️⃣ Mejora el desempeño mientras el líder sube de precio.",
          "5️⃣ Evalúa el momento en que la solución cubre al mercado masivo.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "Un servicio de streaming empieza con catálogo pequeño y precio bajo.",
          "El líder del videoclub sube precios y se concentra en clientes rentables.",
          "Años después, el streaming ya cubre la demanda masiva y desplaza al líder.",
        ],
      },
    ],
    fuente: "Apuntes de Innovación · Notion",
  },
  {
    id: "innovacion-radical",
    titulo: "Innovación Radical",
    icon: "💥",
    firma: "Cambia el paradigma con una propuesta completamente nueva",
    simuladorTipo: "innovacion-radical",
    definicion: [
      "La **Innovación Radical** introduce algo completamente nuevo que rompe con el paradigma existente y suele crear una categoría, un mercado o una forma de hacer las cosas.",
      "Es de alto riesgo y alto impacto: no mejora lo que existe, sino que lo reemplaza o lo vuelve obsoleto.",
    ],
    queEs: [
      "Cambia las reglas del juego, no solo el producto.",
      "Requiere explorar tecnología, conocimiento o modelos nuevos.",
      "Tiene alta incertidumbre y horizontes largos de maduración.",
      "Puede destruir competencias existentes dentro de la propia empresa.",
    ],
    paraQueSirve: [
      "Crear mercados nuevos: resolver problemas que antes no tenían solución.",
      "Liderar una categoría: posicionarse antes que la competencia.",
      "Romper una limitación estructural: superar un techo tecnológico o de costos.",
      "Transformar industrias: cambiar la forma en que se compite.",
      "Renovar el portafolio: asegurar el crecimiento de largo plazo.",
      "Atraer talento e inversión: los proyectos ambiciosos movilizan recursos.",
    ],
    comoFunciona: [
      "Se explora una pregunta o tecnología sin una respuesta clara.",
      "Se combinan conocimientos de distintos campos y se prototipa.",
      "Se valida con usuarios visionarios y se itera sobre el paradigma.",
      "Si madura, puede escalar y redefinir el mercado.",
    ],
    errores: [
      "Gestionarla con métricas del negocio actual: la mata antes de nacer.",
      "Exigir resultados de corto plazo: la innovación radical tarda en madurar.",
      "Confundir radical con incremental: no es una mejora más grande.",
      "No proteger el equipo: la presión del negocio central lo absorbe.",
    ],
    casos: [
      "El avión frente al ferrocarril: cambió la forma de viajar y de conectar mercados.",
      "La secuenciación del ADN frente a métodos anteriores: abrió una nueva era.",
      "La computación en la nube: transformó el acceso a infraestructura tecnológica.",
    ],
    relacion: [
      "Se conecta con la Innovación Disruptiva y la Innovación Tecnológica.",
      "La radical crea el paradigma; la disruptiva suele popularizarlo y escalarlo.",
    ],
    analogia:
      "La innovación radical es dejar de perfeccionar la vela para inventar la bombilla: no es una vela más grande, es otra forma de iluminar.",
    notasPersonales: [
      "Radical no significa imposible: significa que todavía no sabes si funcionará.",
      "Reserva un espacio protegido para explorar sin la presión del negocio central.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Formula una pregunta que el paradigma actual no puede responder.",
          "2️⃣ Explora tecnologías y conocimientos de distintos campos.",
          "3️⃣ Construye prototipos para aprender rápido.",
          "4️⃣ Valida con usuarios visionarios dispuestos a probar lo nuevo.",
          "5️⃣ Protege el proyecto del corto plazo y decide si escalar.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "Un equipo explora baterías de estado sólido para un mercado que exige más autonomía.",
          "Los prototipos fallan varias veces antes de estabilizarse.",
          "Cuando la tecnología madura, redefine el estándar de la industria.",
        ],
      },
    ],
    fuente: "Apuntes de Innovación · Notion",
  },
  {
    id: "innovacion-tecnologica",
    titulo: "Innovación Tecnológica",
    icon: "🤖",
    firma: "Aplicar tecnología nueva para crear o mejorar valor",
    simuladorTipo: "innovacion-tecnologica",
    definicion: [
      "La **Innovación Tecnológica** es la aplicación de una tecnología nueva o mejorada para crear productos, servicios o procesos que generan valor.",
      "Puede ser incremental o radical según el grado de cambio, pero su rasgo distintivo es que la tecnología es el motor de la innovación.",
    ],
    queEs: [
      "Introduce o adopta una tecnología para resolver un problema.",
      "Puede mejorar procesos internos o crear ofertas nuevas.",
      "Requiere capacidades técnicas y gestión del cambio.",
      "Su impacto depende de cómo se adopta, no solo de la tecnología.",
    ],
    paraQueSirve: [
      "Automatizar procesos: reducir tareas manuales y errores.",
      "Crear productos nuevos: habilitar funciones que antes no eran posibles.",
      "Mejorar la experiencia: personalizar y acelerar el servicio.",
      "Escalar operaciones: atender más volumen sin crecer en costos.",
      "Tomar mejores decisiones: usar datos para decidir con evidencia.",
      "Sostener la ventaja competitiva: actualizar la base tecnológica del negocio.",
    ],
    comoFunciona: [
      "Se identifica una tecnología con potencial para el negocio.",
      "Se evalúa su madurez, costo y encaje con la estrategia.",
      "Se implementa en un piloto y se mide el impacto.",
      "Se escala o se ajusta según los resultados y la adopción del equipo.",
    ],
    errores: [
      "Adoptar tecnología sin un problema que resolver: la herramienta se vuelve un gasto.",
      "Ignorar la gestión del cambio: la gente vuelve a las viejas prácticas.",
      "Comprar la tecnología más avanzada sin evaluar el retorno.",
      "No actualizar procesos: digitalizar el desorden solo lo hace más rápido.",
    ],
    casos: [
      "Un banco aplica IA para detectar fraude en tiempo real.",
      "Una fábrica instala sensores IoT para mantenimiento predictivo.",
      "Una tienda usa análisis de datos para personalizar recomendaciones.",
    ],
    relacion: [
      "Se conecta con la Innovación Incremental, Disruptiva y Radical.",
      "La tecnología es un medio: el valor depende del problema y del modelo de negocio.",
    ],
    analogia:
      "La innovación tecnológica es una caja de herramientas nueva: no construye la casa por sí sola, pero permite hacer cosas que antes eran imposibles.",
    notasPersonales: [
      "La tecnología no es la estrategia: su valor aparece cuando resuelve un problema real.",
      "Mide la adopción, no solo la implementación: una herramienta sin uso no innova.",
    ],
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Define el problema de negocio antes de elegir la tecnología.",
          "2️⃣ Evalúa madurez, costo y encaje con la estrategia.",
          "3️⃣ Prueba la tecnología en un piloto acotado.",
          "4️⃣ Mide impacto y adopción por parte del equipo.",
          "5️⃣ Escala, ajusta o descarta según los resultados.",
        ],
      },
      {
        seccion: "📊 Ejemplo resuelto",
        textos: [
          "Una empresa de logística instala sensores para predecir fallas de camiones.",
          "El mantenimiento predictivo reduce paradas no planificadas en un 30%.",
          "La tecnología se escala solo después de demostrar el ahorro.",
        ],
      },
    ],
    fuente: "Apuntes de Innovación · Notion",
  },
];
