/**
 * Parcha `src/data/negocioBiblioteca.js`:
 *  - sustituye los cuadros ASCII por diagramas/markers,
 *  - convierte tablas en listas legibles,
 *  - reemplaza los quizzes por preguntas con explicación,
 *  - añade el apunte de BPMN.
 *
 * Uso: node scripts/patch-biblioteca.mjs [--write]
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  NEGOCIO_BIBLIOTECA,
  NEGOCIO_BIBLIOTECA_DOCS as DOCS,
} from "../src/data/negocioBiblioteca.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SALIDA = path.join(ROOT, "src", "data", "negocioBiblioteca.js");
const WRITE = process.argv.includes("--write");

/* ------------------------------------------------------------------ */
/* Tablas ASCII → listas                                              */
/* ------------------------------------------------------------------ */

const limpiar = (linea) =>
  linea
    .replace(/[│┌┐└┘├┤┬┴┼─►◄]/g, " ")
    .replace(/^-+$/, "")
    .trim();

const filas = (bloque) =>
  bloque
    .split("\n")
    .slice(1, -1)
    .map(limpiar)
    .filter((l) => l && !/^\s*$/.test(l));

const celdas = (linea) => linea.split(/\s{2,}/).map((c) => c.trim()).filter(Boolean);

function tabla(bloque, arma) {
  const rows = filas(bloque);
  const out = [];
  rows.forEach((row) => {
    const c = celdas(row);
    if (!c.length) return;
    if (/^(Error|Desafío|Riesgo|Situación|Concepto|Empresa|Marco|Modelo|Característica|Factor|Pilar|Etapa)$/i.test(c[0])) return;
    const texto = arma(c);
    if (texto) out.push(texto);
  });
  return out;
}

const es = (v) => typeof v === "string" && v.trim().startsWith("```");

/* Reemplaza el bloque ASCII de una lista por sus filas convertidas en viñetas. */
function convertirBloque(lista, arma) {
  const i = lista.findIndex(es);
  if (i === -1) return;
  const bullets = tabla(lista[i], arma);
  lista.splice(i, 1, ...bullets);
}

/* ------------------------------------------------------------------ */
/* Quizzes                                                            */
/* ------------------------------------------------------------------ */

const q = (pregunta, opciones, correcta, explicacion, pista) => ({
  pregunta,
  opciones,
  correcta,
  explicacion,
  ...(pista ? { pista } : {}),
});

const QUIZ_AGILIDAD = [
  q(
    "¿Qué define mejor la Agilidad Empresarial (Business Agility)?",
    [
      "Aplicar Scrum solo en los equipos de desarrollo de software.",
      "La capacidad de toda la organización para adaptarse rápido al cambio sin perder eficiencia ni rumbo.",
      "Automatizar todos los procesos con tecnología y reducir personal.",
      "Tener reuniones diarias y tableros Kanban en cada área.",
    ],
    1,
    "La Agilidad Empresarial va más allá de TI: es la capacidad de **sentir, responder y prosperar** ante cambios del mercado, la tecnología y la regulación, aplicando principios ágiles a estrategia, cultura, estructura, procesos, personas y tecnología.",
    "Piensa si el concepto habla de equipos aislados o de la organización completa."
  ),
  q(
    "¿Cuál es la diferencia central entre «agilidad de equipos» y «Agilidad Empresarial»?",
    [
      "La agilidad de equipos es más cara que la Agilidad Empresarial.",
      "La Agilidad Empresarial solo aplica a empresas tecnológicas.",
      "La Agilidad Empresarial escala los principios ágiles a toda la organización, no solo a los equipos.",
      "No hay diferencia: son sinónimos exactos.",
    ],
    2,
    "La agilidad de equipos vive en un squad o un área. La **Agilidad Empresarial** conecta equipos, liderazgo, estrategia, presupuestos y gobierno para que toda la organización responda como un sistema.",
    "La palabra clave es «toda la organización»."
  ),
  q(
    "En un entorno VUCA, ¿qué significan sus siglas?",
    [
      "Veloz, Único, Competitivo y Ambicioso.",
      "Volátil, Incierto, Complejo y Ambiguo.",
      "Variable, Útil, Consistente y Adaptable.",
      "Visible, Urgente, Controlado y Ágil.",
    ],
    1,
    "VUCA describe entornos **Volátiles, Inciertos, Complejos y Ambiguos**. La agilidad empresarial es precisamente la capacidad de navegar ese tipo de contexto sin paralizarse.",
    "La primera palabra es «volátil»."
  ),
  q(
    "¿Cuál es el primer movimiento del ciclo ágil «sentir → decidir → responder → aprender»?",
    [
      "Responder con equipos autónomos.",
      "Aprender de los resultados.",
      "Sentir las señales del mercado, los clientes y la tecnología.",
      "Decidir con el comité directivo.",
    ],
    2,
    "Antes de decidir hay que **sentir**: detectar señales del mercado, clientes, competencia y tecnología. Sin esa lectura, la respuesta rápida puede ir en la dirección equivocada.",
    "El ciclo empieza por percibir el entorno."
  ),
  q(
    "¿Qué pilar de la agilidad se asocia a la seguridad psicológica y a la tolerancia al fracaso?",
    [
      "Cultura ágil.",
      "Tecnología ágil.",
      "Estructura ágil.",
      "Datos ágiles.",
    ],
    0,
    "La **cultura ágil** crea seguridad psicológica: las personas pueden experimentar, equivocarse y aprender sin castigo. Sin esa base, los demás pilares se quedan en ceremonias vacías.",
    "Piensa en el pilar que habla de mentalidad y confianza."
  ),
  q(
    "¿Qué herramienta de planificación usan habitualmente las organizaciones ágiles para alinear objetivos en ciclos cortos?",
    [
      "Presupuestos anuales rígidos.",
      "OKR (Objetivos y Resultados Clave).",
      "Diagramas de Gantt de tres años.",
      "Manuales de procedimientos cerrados.",
    ],
    1,
    "Los **OKR** permiten fijar objetivos ambiciosos y medir resultados clave en ciclos trimestrales, ajustando el rumbo con más frecuencia que un plan anual tradicional.",
    "Son tres letras y miden resultados clave."
  ),
  q(
    "Squads, tribus, chapters y guilds son un ejemplo de…",
    [
      "Un modelo de estructura ágil (Spotify Model).",
      "Una compuerta BPMN.",
      "Un tipo de compuerta lógica.",
      "Un marco de contabilidad de costos.",
    ],
    0,
    "Ese vocabulario viene del **Spotify Model**: equipos autónomos (squads) agrupados por misión (tribus), con comunidades de práctica (chapters y guilds). Es un ejemplo de estructura alineada al valor.",
    "Piensa en la empresa de música que popularizó esos nombres."
  ),
  q(
    "¿Cuál de estas situaciones describe una «agilidad de fachada»?",
    [
      "Cambiar la cultura antes de adoptar ceremonias.",
      "Hacer daily meetings y sprints sin cambiar la forma de decidir ni la cultura.",
      "Medir el valor entregado al cliente.",
      "Dar autonomía real a los equipos.",
    ],
    1,
    "La **agilidad de fachada** copia las ceremonias (daily, sprint, retro) pero mantiene decisiones centralizadas, miedo al error y silos. Se ve ágil por fuera, pero no responde más rápido.",
    "Fachada = apariencia sin cambio real."
  ),
  q(
    "¿Cuál es una forma más sana de medir la agilidad de una organización?",
    [
      "Contar cuántas reuniones ágiles se hacen por semana.",
      "Medir el valor entregado, la satisfacción del cliente y el time to market.",
      "Revisar cuántos post-its se usan.",
      "Contar cuántos cargos tienen la palabra «agile».",
    ],
    1,
    "Las métricas de actividad (reuniones, post-its) no dicen nada. La agilidad se mide por **resultados**: valor entregado, satisfacción del cliente, tiempo de respuesta y capacidad de aprendizaje.",
    "Busca la opción que habla de resultados para el cliente."
  ),
  q(
    "¿Qué marco se usa típicamente para escalar la agilidad en grandes corporaciones?",
    [
      "SAFe (Scaled Agile Framework).",
      "ISO 9001.",
      "BPMN 2.0.",
      "Cuadro de mando integral.",
    ],
    0,
    "**SAFe** es uno de los marcos más difundidos para coordinar muchos equipos ágiles en una gran empresa. También existen LeSS, Nexus, Scrum@Scale y el Spotify Model.",
    "Su nombre empieza por S y significa «Scaled Agile Framework»."
  ),
  q(
    "¿Qué papel juega el liderazgo en una transformación ágil?",
    [
      "Concentrar todas las decisiones para evitar errores.",
      "Modelar la agilidad, empoderar equipos y eliminar barreras.",
      "Supervisar que se cumplan las ceremonias al pie de la letra.",
      "Delegar la transformación únicamente en recursos humanos.",
    ],
    1,
    "El **liderazgo servicial** modela los comportamientos, da autonomía y quita obstáculos. Si la alta dirección no cambia, la transformación se queda en la superficie.",
    "Servir al equipo, no controlarlo."
  ),
  q(
    "Una empresa tradicional entra en crisis porque su plan anual ya no responde al mercado. ¿Qué aplicación de agilidad empresarial tiene más sentido?",
    [
      "Esperar a que termine el año para revisar el plan.",
      "Añadir más niveles de aprobación a cada decisión.",
      "Adoptar ciclos cortos de decisión y experimentación para adaptarse al mercado.",
      "Eliminar todos los procesos existentes de inmediato.",
    ],
    2,
    "La agilidad propone **ciclos cortos** de planificación y experimentación, con autonomía para ajustar la estrategia. No se trata de eliminar todo, sino de aprender y corregir más rápido.",
    "La respuesta correcta reduce el tiempo entre decisión y aprendizaje."
  ),
];

const QUIZ_SEPTE = [
  q(
    "¿Qué examina el Análisis SEPTE?",
    [
      "Los procesos internos y la cultura de la empresa.",
      "El macroentorno: factores sociales, económicos, políticos, tecnológicos y ecológicos.",
      "Únicamente a los competidores directos.",
      "Las finanzas y los estados de resultados.",
    ],
    1,
    "SEPTE es un análisis del **macroentorno**. Mira hacia afuera de la empresa para identificar oportunidades y amenazas que no controla.",
    "La primera letra es «Social» y la última «Ecológico»."
  ),
  q(
    "¿Cuál es la diferencia entre SEPTE y PESTEL?",
    [
      "SEPTE añade el factor legal y PESTEL lo elimina.",
      "SEPTE omite el factor legal, que PESTEL sí incluye.",
      "SEPTE analiza el microentorno y PESTEL el macroentorno.",
      "Son exactamente iguales.",
    ],
    1,
    "PESTEL incluye **Legal**; SEPTE trabaja con cinco dimensiones y suele integrar lo legal dentro de lo político. Si la industria está muy regulada, PESTEL puede ser más explícito.",
    "Cuenta las letras de cada acrónimo."
  ),
  q(
    "La inflación y la tasa de interés pertenecen al factor…",
    [
      "Social.",
      "Económico.",
      "Político.",
      "Ecológico.",
    ],
    1,
    "Inflación, PIB, desempleo, tipo de cambio e intereses son factores **económicos**: afectan el poder adquisitivo y el acceso al crédito.",
    "Tiene que ver con el dinero y los precios."
  ),
  q(
    "La edad de la población y los hábitos de consumo pertenecen al factor…",
    [
      "Social.",
      "Tecnológico.",
      "Político.",
      "Económico.",
    ],
    0,
    "Demografía, cultura, valores, educación y estilos de vida son factores **sociales**. Explican quién es el cliente y cómo cambia.",
    "Habla de personas y cultura."
  ),
  q(
    "Los aranceles y las regulaciones de protección de datos pertenecen al factor…",
    [
      "Ecológico.",
      "Social.",
      "Político.",
      "Tecnológico.",
    ],
    2,
    "Aranceles, subsidios, estabilidad del gobierno y marco legal son factores **políticos**. SEPTE suele incluir aquí lo legal.",
    "Son decisiones de gobierno."
  ),
  q(
    "La inteligencia artificial, el 5G y la ciberseguridad pertenecen al factor…",
    [
      "Tecnológico.",
      "Económico.",
      "Social.",
      "Ecológico.",
    ],
    0,
    "La innovación, su adopción, la infraestructura digital y los riesgos asociados son factores **tecnológicos**.",
    "Son herramientas y capacidades nuevas."
  ),
  q(
    "El cambio climático y la escasez de recursos pertenecen al factor…",
    [
      "Político.",
      "Ecológico.",
      "Social.",
      "Económico.",
    ],
    1,
    "Clima, recursos naturales, residuos y sostenibilidad forman el factor **ecológico** (también llamado ambiental).",
    "Se relaciona con el medio ambiente."
  ),
  q(
    "¿Cómo se conecta el análisis SEPTE con el FODA?",
    [
      "SEPTE reemplaza al FODA por completo.",
      "Los hallazgos de SEPTE se convierten en oportunidades y amenazas del FODA.",
      "El FODA analiza el entorno y SEPTE lo interno.",
      "No tienen ninguna relación.",
    ],
    1,
    "SEPTE alimenta las **Oportunidades y Amenazas** del FODA. El FODA añade el análisis interno (fortalezas y debilidades) para cerrar el diagnóstico.",
    "Uno mira afuera y el otro integra afuera con adentro."
  ),
  q(
    "¿Cuál es un error frecuente al hacer un análisis SEPTE?",
    [
      "Actualizarlo cada trimestre.",
      "Usar datos y fuentes confiables.",
      "Hacerlo una vez y nunca volver a revisarlo.",
      "Involucrar a varias áreas de la empresa.",
    ],
    2,
    "Un análisis **estático** se vuelve obsoleto. El entorno cambia: el SEPTE debe ser un documento vivo que se revisa periódicamente.",
    "Piensa en lo contrario de «documento vivo»."
  ),
  q(
    "En el caso de una fintech en Perú, ¿cuál es la principal oportunidad social?",
    [
      "La baja educación financiera.",
      "La población joven y digital con alta penetración de smartphones.",
      "La volatilidad del tipo de cambio.",
      "La dependencia de proveedores de nube.",
    ],
    1,
    "La **población joven y digital** facilita la adopción de servicios financieros móviles. La baja educación financiera, en cambio, es una barrera que exige inversión en formación.",
    "Busca la opción que habla de adopción digital."
  ),
  q(
    "En la misma fintech, ¿cuál es una amenaza tecnológica típica?",
    [
      "El crecimiento del PIB.",
      "Los incentivos fiscales del gobierno.",
      "La ciberseguridad y la dependencia de proveedores de nube.",
      "La demanda de banca verde.",
    ],
    2,
    "Aprovechar la nube e IA trae **riesgo de ciberseguridad** y dependencia del proveedor. Son amenazas tecnológicas que deben gestionarse con arquitectura, cifrado y planes de continuidad.",
    "Tiene que ver con proteger los datos y no depender de un solo proveedor."
  ),
  q(
    "El análisis SEPTE cubre el macroentorno. ¿Qué herramienta complementa el microentorno (la industria)?",
    [
      "Las 5 Fuerzas de Porter.",
      "El flujo de caja.",
      "La matriz RACI.",
      "El diagrama de Gantt.",
    ],
    0,
    "SEPTE mira el **macroentorno**; las **5 Fuerzas de Porter** analizan la industria: rivalidad, nuevos entrantes, sustitutos, poder de proveedores y de clientes. Se complementan.",
    "Su autor es Michael Porter."
  ),
];

const QUIZ_BLITZ = [
  q(
    "¿Qué es el Blitzscaling?",
    [
      "Una estrategia de crecimiento moderado y sostenible.",
      "Una estrategia de crecimiento extremo y acelerado en mercados de alta incertidumbre.",
      "Un método para reducir costos operativos.",
      "Un marco de contabilidad para startups.",
    ],
    1,
    "El **Blitzscaling** prioriza la velocidad de crecimiento sobre la eficiencia. Se usa cuando el mercado premia al primero que alcanza escala masiva.",
    "«Blitz» significa relámpago: velocidad extrema."
  ),
  q(
    "¿En qué tipo de mercado funciona mejor el Blitzscaling?",
    [
      "Mercados fragmentados sin efectos de red.",
      "Mercados «winner-takes-most» con efectos de red.",
      "Mercados regulados con crecimiento lento.",
      "Mercados locales de nicho.",
    ],
    1,
    "Si el mercado tiende a concentrarse en un ganador (**winner-takes-most**) y hay efectos de red, crecer rápido puede volverse una ventaja decisiva y difícil de revertir.",
    "Piensa en el mercado donde «el ganador se lleva casi todo»."
  ),
  q(
    "¿Cuál es el principio central del Blitzscaling?",
    [
      "La eficiencia está por encima de la velocidad.",
      "La velocidad importa más que la eficiencia.",
      "La rentabilidad inmediata es obligatoria.",
      "Hay que crecer solo con recursos propios.",
    ],
    1,
    "La lógica es **velocidad > eficiencia**: se aceptan ineficiencias temporales para capturar el mercado antes que los competidores.",
    "La palabra clave es «rápido», no «barato»."
  ),
  q(
    "¿Cuál es la primera etapa del modelo de Hoffman y Yeh?",
    [
      "Tribu.",
      "Familia.",
      "Aldea.",
      "Nación.",
    ],
    1,
    "La etapa **Familia** (1–9 personas) busca crear un producto que el mercado quiera: MVP y Product-Market Fit.",
    "Es el grupo humano más pequeño."
  ),
  q(
    "¿Qué etapa abarca de 10 a 99 empleados?",
    [
      "Familia.",
      "Tribu.",
      "Ciudad.",
      "Nación.",
    ],
    1,
    "La **Tribu** (10–99) busca un modelo de negocio escalable y empieza a crecer con contrataciones clave.",
    "Es un grupo mayor que la familia, pero aún cercano."
  ),
  q(
    "¿Qué etapa abarca de 100 a 999 empleados?",
    [
      "Aldea.",
      "Tribu.",
      "Ciudad.",
      "Nación.",
    ],
    0,
    "La **Aldea** (100–999) escala el modelo: aparecen procesos, estructura y liderazgo formal.",
    "Sigue siendo un asentamiento pequeño."
  ),
  q(
    "¿Qué etapa abarca de 1,000 a 9,999 empleados?",
    [
      "Familia.",
      "Aldea.",
      "Ciudad.",
      "Nación.",
    ],
    2,
    "La **Ciudad** (1,000–9,999) escala la organización: cultura, descentralización y eficiencia se vuelven críticas.",
    "Es más grande que una aldea."
  ),
  q(
    "¿Qué etapa corresponde a 10,000 empleados o más?",
    [
      "Nación.",
      "Ciudad.",
      "Aldea.",
      "Tribu.",
    ],
    0,
    "La **Nación** (10,000+) escala el impacto y busca sostener el liderazgo global con innovación continua y ecosistema.",
    "Es la etapa de mayor tamaño."
  ),
  q(
    "¿Cuál es el riesgo financiero más característico del Blitzscaling?",
    [
      "Tener demasiada caja sin invertirla.",
      "La quema de capital: gastar más de lo que se ingresa.",
      "Cobrar precios demasiado altos.",
      "No necesitar inversores.",
    ],
    1,
    "El crecimiento acelerado suele quemar caja. Si no se levantan nuevas rondas, la empresa puede quedarse sin liquidez: es el riesgo de **insolvencia**.",
    "Piensa en «quemar» dinero."
  ),
  q(
    "¿Qué diferencia clave tiene el Blitzscaling frente al crecimiento tradicional?",
    [
      "El tradicional prioriza eficiencia y rentabilidad; el Blitzscaling prioriza velocidad.",
      "El tradicional busca efectos de red; el Blitzscaling los evita.",
      "El Blitzscaling no necesita clientes.",
      "El tradicional solo funciona en tecnología.",
    ],
    0,
    "El crecimiento tradicional optimiza eficiencia y rentabilidad. El Blitzscaling **sacrifica ambas temporalmente** para ganar escala y posición de mercado.",
    "Uno es sostenible; el otro es una carrera."
  ),
  q(
    "¿Cuál de estas empresas es un caso emblemático de Blitzscaling?",
    [
      "Una panadería de barrio.",
      "Uber, con expansión agresiva por ciudades y subsidios.",
      "Un estudio contable familiar.",
      "Una ferretería local.",
    ],
    1,
    "**Uber** expandió su operación ciudad por ciudad con subsidios y grandes rondas de capital. Es el patrón típico de Blitzscaling en plataformas.",
    "Es una app de movilidad."
  ),
  q(
    "¿Cuándo NO conviene aplicar Blitzscaling?",
    [
      "Cuando el mercado es «winner-takes-most» y hay efectos de red.",
      "Cuando se dispone de capital abundante.",
      "Cuando el mercado está fragmentado y sin efectos de red.",
      "Cuando hay competidores globales.",
    ],
    2,
    "Sin **efectos de red** ni dinámica de ganador único, crecer rápido solo quema capital. En mercados fragmentados conviene un crecimiento más eficiente.",
    "Falta la condición que hace valiosa la escala."
  ),
];

const QUIZ_CLOUD = [
  q(
    "¿Qué caracteriza a un modelo de negocio Cloud-First?",
    [
      "Usar la nube solo para respaldos de seguridad.",
      "Construir y operar el núcleo del negocio en la nube, no en servidores propios.",
      "Tener un centro de datos propio y uno externo.",
      "Vender únicamente software instalado en computadoras.",
    ],
    1,
    "**Cloud-First** significa que la nube es el núcleo: productos, datos y servicios se construyen y operan allí. No es un complemento, es la base del modelo.",
    "«First» indica prioridad, no accesorio."
  ),
  q(
    "¿Qué cambio financiero implica migrar a la nube?",
    [
      "Pasar de CapEx (inversión inicial) a OpEx (pago por uso).",
      "Pasar de OpEx a CapEx.",
      "Eliminar todos los costos de tecnología.",
      "Duplicar la inversión inicial en servidores.",
    ],
    0,
    "La nube convierte grandes inversiones iniciales en **gastos variables por uso**. Eso reduce la barrera de entrada, pero exige control de costos (FinOps).",
    "Piensa en alquilar en lugar de comprar."
  ),
  q(
    "AWS EC2, Azure Virtual Machines y Google Compute Engine son ejemplos de…",
    [
      "SaaS.",
      "PaaS.",
      "IaaS.",
      "FaaS.",
    ],
    2,
    "**IaaS** (Infrastructure as a Service) alquila servidores, redes y almacenamiento. Tú gestionas el sistema operativo y lo que corre encima.",
    "Es la capa más básica: infraestructura."
  ),
  q(
    "Un entorno gestionado para desarrollar y desplegar aplicaciones sin administrar servidores se llama…",
    [
      "IaaS.",
      "PaaS.",
      "SaaS.",
      "CDN.",
    ],
    1,
    "**PaaS** ofrece la plataforma: sistema operativo, runtime y servicios gestionados. El equipo se concentra en el código y no en la infraestructura.",
    "La «P» es de plataforma."
  ),
  q(
    "Salesforce, Slack y Google Workspace son ejemplos de…",
    [
      "SaaS.",
      "IaaS.",
      "PaaS.",
      "DBaaS.",
    ],
    0,
    "**SaaS** entrega software completo por suscripción, accesible desde el navegador. El usuario no gestiona infraestructura ni plataforma.",
    "Software listo para usar."
  ),
  q(
    "Ejecutar código sin administrar servidores se conoce como…",
    [
      "Serverless o FaaS.",
      "On-premise.",
      "Hosting compartido.",
      "Mainframe.",
    ],
    0,
    "**FaaS / Serverless** ejecuta funciones bajo demanda. El proveedor escala y administra la infraestructura; tú pagas por ejecución.",
    "El nombre sugiere «sin servidor»."
  ),
  q(
    "SageMaker, Vertex AI y Azure ML son ejemplos de…",
    [
      "IA como Servicio (AIaaS).",
      "SaaS de contabilidad.",
      "Redes CDN.",
      "Bases de datos relacionales.",
    ],
    0,
    "**AIaaS** ofrece modelos y herramientas de inteligencia artificial listos para integrar, sin construir toda la infraestructura de machine learning.",
    "Son servicios de inteligencia artificial."
  ),
  q(
    "¿Qué es el «vendor lock-in»?",
    [
      "La facilidad para cambiar de proveedor de nube.",
      "La dependencia que dificulta migrar de un proveedor a otro.",
      "Un descuento por volumen.",
      "Un tipo de cifrado en la nube.",
    ],
    1,
    "El **vendor lock-in** ocurre cuando los servicios propietarios hacen costosa la migración. Se mitiga con estándares abiertos, contenedores y estrategia multi-cloud.",
    "«Lock» significa quedarse atrapado."
  ),
  q(
    "¿Cómo se controlan los costos impredecibles de la nube?",
    [
      "Ignorarlos porque la nube siempre es más barata.",
      "Monitorear el consumo, usar reservas y optimizar recursos (FinOps).",
      "Contratar todos los servicios disponibles.",
      "Apagar la facturación.",
    ],
    1,
    "El pago por uso puede dispararse sin control. **FinOps** combina monitoreo, reservas, apagado de recursos ociosos y diseño eficiente.",
    "Necesitas disciplina de costos."
  ),
  q(
    "Una app global tiene usuarios en varios continentes y notas latencia alta. ¿Qué solución es la más adecuada?",
    [
      "Mover todo a un único servidor central.",
      "Usar CDN y desplegar en regiones cercanas a los usuarios.",
      "Aumentar el tamaño de la base de datos local.",
      "Eliminar el cifrado para acelerar.",
    ],
    1,
    "La latencia se reduce acercando el contenido y el cómputo al usuario: **CDN** para contenido estático y **regiones** para servicios. Un solo servidor central empeora el problema.",
    "Piensa en «más cerca del usuario»."
  ),
  q(
    "Netflix es un ejemplo de modelo Cloud-First porque…",
    [
      "Vende servidores a otras empresas.",
      "Opera su streaming global sobre AWS, sin centros de datos propios para la plataforma.",
      "Solo funciona en un país.",
      "Usa únicamente software instalado en televisores.",
    ],
    1,
    "**Netflix** corre su plataforma sobre AWS y escala a millones de usuarios sin operar su propio datacenter para el streaming. Es el ejemplo clásico de cloud-first.",
    "Es una plataforma de streaming."
  ),
  q(
    "Un e-commerce espera un pico enorme de demanda en Black Friday. ¿Qué ventaja cloud resulta clave?",
    [
      "La escalabilidad elástica para crecer y decrecer según la demanda.",
      "Tener servidores fijos sobredimensionados todo el año.",
      "Eliminar la seguridad durante el pico.",
      "Cobrar más a los clientes ese día.",
    ],
    0,
    "La **elasticidad** permite escalar automáticamente durante el pico y reducir capacidad después. Con infraestructura propia habría que sobredimensionar todo el año.",
    "Piensa en crecer justo cuando hace falta."
  ),
];

const QUIZ_BPMN = [
  q(
    "¿Qué es BPMN?",
    [
      "Un lenguaje de programación para automatizar procesos.",
      "Una notación gráfica estándar para modelar procesos de negocio.",
      "Un software de contabilidad.",
      "Un marco de gestión de proyectos ágiles.",
    ],
    1,
    "**BPMN** (Business Process Model and Notation) es un estándar de notación gráfica. Permite que áreas de negocio y equipos técnicos lean el mismo proceso con símbolos comunes.",
    "La «N» final significa «Notation»."
  ),
  q(
    "¿Qué representa un evento de inicio en BPMN?",
    [
      "El punto donde comienza el proceso.",
      "Una tarea que realiza un empleado.",
      "Una decisión del proceso.",
      "El final obligatorio del proceso.",
    ],
    0,
    "El **evento de inicio** marca el disparador del proceso: una solicitud, un pedido, un horario o un mensaje. Todo proceso debe tener un inicio claro.",
    "Su nombre lo dice: inicio."
  ),
  q(
    "¿Qué es una tarea en un diagrama BPMN?",
    [
      "Una decisión que divide el flujo.",
      "Trabajo atómico realizado por una persona o un sistema.",
      "Un conector entre dos procesos.",
      "Una regla de negocio escrita.",
    ],
    1,
    "La **tarea** es la unidad de trabajo: recibir una solicitud, validar datos, aprobar una compra. Se dibuja como rectángulo redondeado.",
    "Es la actividad concreta que se ejecuta."
  ),
  q(
    "Una compuerta exclusiva (XOR) sirve para…",
    [
      "Activar todos los caminos al mismo tiempo.",
      "Elegir un solo camino según una condición.",
      "Unir caminos sin condición.",
      "Terminar el proceso.",
    ],
    1,
    "La **compuerta exclusiva (XOR)** elige una sola salida: por ejemplo, «Sí» o «No». Las rutas son mutuamente excluyentes.",
    "Solo uno de los caminos puede seguir."
  ),
  q(
    "Una compuerta paralela (AND) sirve para…",
    [
      "Elegir un camino entre varios.",
      "Activar todos los caminos a la vez y luego sincronizarlos.",
      "Esperar una señal externa.",
      "Enviar un mensaje a otro proceso.",
    ],
    1,
    "La **compuerta paralela (AND)** divide el flujo en ramas simultáneas. Al final, otra compuerta AND espera a que todas terminen antes de continuar.",
    "Todo ocurre al mismo tiempo."
  ),
  q(
    "¿Qué diferencia a una compuerta inclusiva (OR) de una exclusiva (XOR)?",
    [
      "La OR puede activar una o varias salidas según las condiciones.",
      "La OR solo permite una salida.",
      "La OR no tiene condiciones.",
      "No hay diferencia práctica.",
    ],
    0,
    "La **compuerta inclusiva (OR)** deja activas todas las rutas cuya condición se cumpla: puede ser una o varias. La XOR siempre elige exactamente una.",
    "«Inclusiva» incluye varias posibilidades."
  ),
  q(
    "¿Para qué sirven los carriles (lanes) y pools?",
    [
      "Para decorar el diagrama con colores.",
      "Para organizar las tareas por rol, área o participante.",
      "Para medir el tiempo de cada tarea.",
      "Para reemplazar las compuertas.",
    ],
    1,
    "Los **carriles** y **pools** agrupan actividades por responsable. Hacen visible quién hace qué y dónde ocurren los handoffs entre áreas.",
    "Separan responsabilidades."
  ),
  q(
    "El proceso debe esperar 48 horas una respuesta y, si no llega, continuar. ¿Qué elemento BPMN lo modela?",
    [
      "Un evento intermedio con temporizador (timer).",
      "Una tarea manual.",
      "Un evento de fin.",
      "Una anotación de texto.",
    ],
    0,
    "El **evento intermedio de temporizador** espera un tiempo definido y dispara una ruta alternativa si se cumple. Evita que el proceso quede bloqueado para siempre.",
    "Habla de tiempo y espera."
  ),
  q(
    "Si una validación falla y la solicitud debe volver a la tarea anterior, ¿cómo se modela?",
    [
      "Con un nuevo evento de inicio.",
      "Con un flujo de secuencia de retorno que crea un ciclo de reproceso.",
      "Eliminando la validación.",
      "Con un evento de fin.",
    ],
    1,
    "Un **flujo de retorno** conecta la compuerta de validación con la tarea anterior. El proceso corrige y vuelve a validar sin reiniciarse por completo.",
    "El token vuelve atrás."
  ),
  q(
    "¿Qué aporta la simulación de tokens (Token Simulation)?",
    [
      "Genera automáticamente el código del proceso.",
      "Muestra paso a paso cómo el trabajo recorre el proceso y dónde se decide.",
      "Reemplaza al diagrama BPMN.",
      "Mide el sueldo de los empleados.",
    ],
    1,
    "La **simulación de tokens** coloca un token en el inicio y lo mueve por las actividades y compuertas. Ayuda a detectar cuellos de botella, ciclos y caminos sin salida.",
    "Un token es como una ficha que avanza."
  ),
  q(
    "¿Cuál es una buena práctica al dibujar compuertas y flujos?",
    [
      "Etiquetar cada salida con su condición (Sí/No, monto, estado).",
      "Usar muchos colores para distinguir tareas.",
      "Ocultar el evento de inicio.",
      "Conectar todas las tareas entre sí.",
    ],
    0,
    "Las **etiquetas** explican la lógica: «Sí», «No», «monto > 1000». Un diagrama se entiende por su semántica, no por su decoración.",
    "La claridad está en el texto de la condición."
  ),
  q(
    "¿Para qué se usa un subproceso en BPMN?",
    [
      "Para ocultar errores del diagrama.",
      "Para agrupar un conjunto de actividades y reducir la complejidad visual.",
      "Para reemplazar los eventos de inicio.",
      "Para eliminar los carriles.",
    ],
    1,
    "El **subproceso** encapsula un proceso dentro de otro. Permite ver el flujo principal sin perder detalle, que se expande cuando hace falta.",
    "Es un proceso dentro del proceso."
  ),
];

/* ------------------------------------------------------------------ */
/* BPMN                                                               */
/* ------------------------------------------------------------------ */

const BPMN = {
  definicion: [
    "BPMN (Business Process Model and Notation, o Modelo y Notación de Procesos de Negocio) es un estándar gráfico para representar procesos de negocio de forma clara, comprensible y compartida entre las áreas de negocio y los equipos técnicos. Define un conjunto de símbolos —eventos, actividades, compuertas y flujos— con reglas precisas para que cualquier persona capacitada pueda leer un diagrama y entender qué ocurre, quién lo hace, cuándo y bajo qué condiciones.",
  ],
  queEs: [
    "BPMN es una **notación**, no un software ni un lenguaje de programación. Se usa para dibujar el proceso tal como es (AS-IS) o como debería ser (TO-BE), y sirve de puente entre la operación y la tecnología.",
    "Su versión actual, **BPMN 2.0**, es mantenida por el Object Management Group (OMG) y se convirtió en el estándar de facto para modelar procesos. Muchas herramientas pueden ejecutar o simular directamente los diagramas.",
    "Un diagrama BPMN responde cinco preguntas: **¿qué** actividades se realizan, **quién** las hace, **cuándo** ocurren, **con qué decisiones** y **cómo** termina el proceso.",
    "No es lo mismo que un diagrama de flujo informal: BPMN distingue tipos de eventos, compuertas y flujos, y exige reglas de conexión que evitan ambigüedades.",
  ],
  paraQueSirve: [
    "**Documentar procesos**: tener una versión única y comprensible de cómo funciona la operación.",
    "**Detectar mejoras**: visualizar pasos redundantes, esperas, reprocesos y cuellos de botella.",
    "**Alinear áreas**: hacer visibles los handoffs entre ventas, compras, finanzas y atención al cliente.",
    "**Automatizar**: servir de base para implementar un BPMS o un flujo de trabajo digital.",
    "**Capacitar**: explicar un proceso nuevo con un lenguaje común y verificable.",
    "**Cumplir y auditar**: demostrar que un proceso crítico sigue las reglas y controles definidos.",
  ],
  comoFunciona: [
    "**Eventos**: sucesos que inician, pausan o terminan el proceso (inicio, intermedio con temporizador o mensaje, fin).",
    "**Actividades (tareas)**: trabajo atómico que realiza una persona o un sistema (recibir, validar, aprobar).",
    "**Compuertas**: decisiones que dividen o unen el flujo (exclusiva XOR, paralela AND, inclusiva OR).",
    "**Flujos de secuencia**: conectan elementos en orden y muestran el camino que sigue el token.",
    "**Carriles y pools**: organizan las actividades por rol, área o participante.",
    "**Artefactos**: anotaciones, grupos y objetos de datos que añaden información sin alterar el flujo.",
    "**Subprocesos**: agrupan actividades dentro de otra actividad para reducir la complejidad visual.",
    "**Reglas básicas**: todo proceso tiene un inicio y al menos un fin; las compuertas deben etiquetarse; los flujos no se cruzan sin necesidad.",
  ],
  errores: [
    "**Diagrama sin inicio o sin fin**: el lector no sabe dónde empieza ni cuándo termina el proceso.",
    "**Compuertas sin etiquetas**: no se entiende qué condición toma cada camino.",
    "**Mezclar niveles de detalle**: un diagrama con tareas muy generales y otras demasiado específicas.",
    "**Usar BPMN como organigrama**: los carriles ordenan responsabilidades, pero el foco es el flujo de trabajo.",
    "**No validar con quien opera el proceso**: el diagrama queda bonito, pero no refleja la realidad.",
  ],
  casos: [
    "**Compras**: modelar solicitud, validación, aprobación y emisión de orden.",
    "**Onboarding**: documentar bienvenida, recepción de documentos, accesos y cierre.",
    "**Soporte**: clasificar tickets, escalar casos urgentes y resolver en primer nivel.",
    "**Ventas**: modelar cotización, aprobación de descuentos y cierre del pedido.",
    "**Operaciones**: estandarizar procesos repetibles y detectar cuellos de botella antes de automatizar.",
  ],
  relacion: [
    "**Value Stream Mapping (VSM)**: VSM mide el flujo de valor y sus desperdicios; BPMN describe la lógica del proceso.",
    "**Kanban**: Kanban visualiza el trabajo en curso; BPMN modela el proceso completo y sus decisiones.",
    "**Teoría de Restricciones (TOC)**: BPMN ayuda a ubicar la restricción dentro del flujo.",
    "**BPMS**: los motores de procesos ejecutan diagramas BPMN 2.0.",
    "**Agilidad Empresarial**: los equipos ágiles usan BPMN para entender el proceso que van a mejorar.",
    "**Transformación digital**: BPMN es el mapa que guía la automatización de procesos.",
  ],
  analogia:
    "Un diagrama BPMN es como el plano de una ciudad: no es la ciudad, pero permite ver las calles, los cruces y los semáforos antes de circular. Sin plano, cada conductor improvisa; con plano, todos entienden por dónde ir, dónde hay una decisión y qué camino lleva al destino.",
  notasPersonales: [
    "**Empieza simple**: dibuja el flujo principal (camino feliz) y luego añade excepciones y reprocesos.",
    "**Nombra con verbos**: «Validar datos», «Aprobar compra», «Notificar al cliente». Evita sustantivos vagos.",
    "**Una compuerta, una pregunta**: si una compuerta necesita explicar tres condiciones, probablemente son varias compuertas.",
    "**Valida en taller**: el diagrama se corrige con quienes hacen el trabajo, no solo en el escritorio.",
  ],
  fuente:
    "Object Management Group (OMG). BPMN 2.0 Specification. Silver, B. (2011). BPMN Method and Style. Cody-Cassidy. Freund, J., & Rücker, B. (2014). Real-Life BPMN. Camunda. White, S. A. (2004). Introduction to BPMN. IBM Corporation.",
  extras: [
    {
      seccion: "🧭 Elementos esenciales de BPMN",
      textos: [
        "**Evento de inicio**: dispara el proceso (solicitud, pedido, horario, mensaje).",
        "**Tarea**: actividad concreta realizada por una persona o sistema.",
        "**Compuerta exclusiva (XOR)**: elige un solo camino según una condición.",
        "**Compuerta paralela (AND)**: activa varios caminos a la vez y los sincroniza.",
        "**Compuerta inclusiva (OR)**: activa una o varias rutas según las condiciones.",
        "**Evento intermedio**: espera un tiempo o un mensaje antes de continuar.",
        "**Carril / pool**: agrupa actividades por rol o participante.",
        "**Subproceso**: proceso encapsulado dentro de otro para reducir complejidad.",
      ],
    },
    {
      seccion: "💡 Ejemplo: proceso de compra",
      textos: [
        "1. **Inicio**: llega una solicitud de compra.",
        "2. **Recibir solicitud**: el área usuaria registra el pedido.",
        "3. **Validar datos**: compras revisa presupuesto y documentación.",
        "4. **Compuerta «¿Datos completos?»**: si no, se solicita corrección y se vuelve a validar; si sí, se aprueba la compra.",
        "5. **Aprobar compra**: se emite la orden de compra.",
        "6. **Fin**: el proceso termina y se notifica al solicitante.",
        "Practícalo en el laboratorio interactivo: edita el lienzo, simula el token y resuelve el sandbox de decisiones.",
      ],
    },
  ],
  titulo: "BPMN (Business Process Model and Notation)",
  id: "bpmn",
  icon: "◈",
  curso: "biblioteca-negocios",
  cursoLabel: "Biblioteca de Negocios",
  categoria: "Administración y Negocios",
  resumen:
    "BPMN es la notación estándar para modelar procesos de negocio: eventos, tareas, compuertas y flujos que permiten documentar, simular y mejorar la operación.",
  quiz: QUIZ_BPMN,
  lab: {
    misiones: [
      {
        id: "bpmn-completar",
        tipo: "completar",
        titulo: "Completa la definición",
        dificultad: "Fácil",
        xp: 60,
        pista: "Es una notación gráfica, no un lenguaje de programación.",
        solucion: "BPMN",
        frase:
          "El estándar gráfico para modelar procesos de negocio con eventos, tareas, compuertas y flujos se llama __________.",
        opciones: ["BPMN", "Kanban", "VSM", "OKR"],
        correcto: "BPMN",
      },
      {
        id: "bpmn-emparejar",
        tipo: "emparejar",
        titulo: "Une cada elemento con su función",
        dificultad: "Medio",
        xp: 90,
        pista: "Relaciona cada símbolo con la pregunta que responde.",
        solucion: "Evento de inicio · Tarea · Compuerta · Carril · Flujo de secuencia",
        pares: [
          { concepto: "Evento de inicio", descripcion: "Dispara el proceso." },
          { concepto: "Tarea", descripcion: "Trabajo atómico de una persona o sistema." },
          { concepto: "Compuerta", descripcion: "Decide o divide el camino del flujo." },
          { concepto: "Carril", descripcion: "Agrupa actividades por rol o área." },
          { concepto: "Flujo de secuencia", descripcion: "Conecta los elementos en orden." },
        ],
      },
    ],
  },
};

/* ------------------------------------------------------------------ */
/* Aplicar cambios                                                    */
/* ------------------------------------------------------------------ */

const agilidad = DOCS["agilidad-empresarial"];
const septe = DOCS["septe"];
const blitz = DOCS["blitzscaling"];
const cloud = DOCS["modelo-cloud"];

/* Agilidad */
if (es(agilidad.comoFunciona[1])) agilidad.comoFunciona[1] = "«diagrama:agilidad-pilares»";
convertirBloque(agilidad.errores, (c) => `**${c[0]}**: ${c[1]} → ${c[2]}`);
convertirBloque(agilidad.casos, (c) => `**${c[0]}**: ${c[1]}`);
convertirBloque(agilidad.relacion, (c) => `**${c[0]}**: ${c[1]}`);
agilidad.extras[0].seccion = "📊 El ciclo de la organización ágil";
agilidad.extras[0].textos = ["«diagrama:agilidad-ciclo»"];
if (es(agilidad.extras[1].textos[1])) {
  const intro = agilidad.extras[1].textos.filter((t) => !es(t));
  agilidad.extras[1].textos = [
    ...intro,
    ...tabla(agilidad.extras[1].textos[1], (c) => `**${c[0]}**: ${c[1]} Ideal para: ${c[2]}`),
  ];
}
if (es(agilidad.extras[2].textos[0])) {
  agilidad.extras[2].textos = tabla(agilidad.extras[2].textos[0], (c) => `**${c[0]}**: ${c[1]}`);
}
agilidad.quiz = QUIZ_AGILIDAD;

/* SEPTE */
convertirBloque(septe.errores, (c) => `**${c[0]}**: ${c[1]} → ${c[2]}`);
convertirBloque(septe.casos, (c) => `**${c[0]}**: ${c[1]}`);
convertirBloque(septe.relacion, (c) => `**${c[0]}**: ${c[1]}`);
septe.extras[0].seccion = "📊 Estructura visual del análisis SEPTE";
septe.extras[0].textos = [
  "«diagrama:septe-estructura»",
  "«diagrama:septe-flujo»",
];
septe.extras[1].seccion = "💡 Ejemplo práctico: SEPTE para una fintech en Perú";
septe.extras[1].textos = ["«diagrama:septe-fintech»"];
septe.quiz = QUIZ_SEPTE;

/* Blitzscaling */
if (es(blitz.comoFunciona[1])) blitz.comoFunciona[1] = "«diagrama:blitzscaling-etapas»";
convertirBloque(blitz.errores, (c) => `**${c[0]}**: ${c[1]} → ${c[2]}`);
convertirBloque(blitz.casos, (c) => `**${c[0]}**: ${c[1]}`);
convertirBloque(blitz.relacion, (c) => `**${c[0]}**: ${c[1]}`);
blitz.extras[0].textos = ["«diagrama:blitzscaling-volante»"];
blitz.extras[1].textos = ["«diagrama:blitzscaling-comparativa»"];
blitz.extras[2].textos = ["«diagrama:blitzscaling-empresas»"];
blitz.quiz = QUIZ_BLITZ;

/* Cloud */
if (es(cloud.comoFunciona[0])) {
  cloud.comoFunciona[0] = "«diagrama:cloud-capas»";
  cloud.comoFunciona.splice(1, 0, "«diagrama:cloud-migracion»");
}
convertirBloque(cloud.errores, (c) => `**${c[0]}**: ${c[1]} → ${c[2]}`);
convertirBloque(cloud.casos, (c) => `**${c[0]}**: ${c[1]}`);
convertirBloque(cloud.relacion, (c) => `**${c[0]}**: ${c[1]}`);
if (es(cloud.extras[0].textos[0])) {
  cloud.extras[0].textos = tabla(cloud.extras[0].textos[0], (c) => `**${c[0]}**: ${c[1]} Ejemplo: ${c[2]}`);
}
cloud.extras[1].textos = ["«diagrama:cloud-empresas»"];
cloud.extras[2].textos = ["«diagrama:cloud-comparativa»"];
cloud.quiz = QUIZ_CLOUD;

/* BPMN */
DOCS["bpmn"] = BPMN;

const bpmnGrupo = NEGOCIO_BIBLIOTECA.grupos[1].metodos;
if (!bpmnGrupo.some((m) => m.id === "bpmn")) {
  bpmnGrupo.push({
    id: "bpmn",
    nombre: "BPMN (Business Process Model and Notation)",
    firma: "Modela, simula y mejora procesos de negocio",
    icon: "◈",
    lab: 2,
  });
}

/* ------------------------------------------------------------------ */
/* Diagnóstico                                                        */
/* ------------------------------------------------------------------ */

for (const [id, doc] of Object.entries({
  "agilidad-empresarial": agilidad,
  septe,
  blitzscaling: blitz,
  "modelo-cloud": cloud,
  bpmn: BPMN,
})) {
  const blocks = [];
  const scan = (obj, p) => {
    if (es(obj)) blocks.push(p);
    else if (Array.isArray(obj)) obj.forEach((v, i) => scan(v, p + `[${i}]`));
    else if (obj && typeof obj === "object") for (const k in obj) scan(obj[k], p + `.${k}`);
  };
  scan(doc, id);
  console.log(`${id}: ${doc.quiz.length} preguntas, bloques ASCII restantes: ${blocks.length}`, blocks);
}

if (WRITE) {
  const codigo =
    "/* Biblioteca de Negocios.\n" +
    "   Datos de la Biblioteca de Negocios: documentos, diagramas y quizzes.\n" +
    "   Los diagramas se marcan con «diagrama:<id>» dentro de los textos.\n" +
    "   Los quizzes incluyen explicación conceptual (sin código). */\n\n" +
    `export const NEGOCIO_BIBLIOTECA = ${JSON.stringify(NEGOCIO_BIBLIOTECA, null, 2)};\n\n` +
    `export const NEGOCIO_BIBLIOTECA_DOCS = ${JSON.stringify(DOCS, null, 2)};\n`;
  fs.writeFileSync(SALIDA, codigo, "utf8");
  console.log("\n✔ Escrito", SALIDA);
} else {
  console.log("\n(dry run) añade --write para guardar");
}
