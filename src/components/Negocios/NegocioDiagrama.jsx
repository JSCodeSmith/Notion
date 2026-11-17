import './NegocioDiagrama.css'

/* Diagramas de flujo / mapas visuales que sustituyen los antiguos bloques
   ASCII (cuadros negros con líneas) de la Biblioteca de Negocios. */

const DIAGRAMAS = {
  /* ----------------------------- SEPTE ----------------------------- */
  'septe-estructura': {
    kicker: 'Lectura del entorno',
    titulo: 'Las cinco fuerzas que rodean a la empresa',
    variante: 'hub',
    centro: {
      icon: '🏢',
      titulo: 'Tu empresa',
      texto: 'Estrategia · Operación · Decisiones',
    },
    nodos: [
      {
        icon: '👥',
        titulo: 'Social',
        texto: 'Personas, cultura y hábitos',
        items: ['Demografía', 'Valores', 'Educación', 'Salud'],
      },
      {
        icon: '💰',
        titulo: 'Económico',
        texto: 'Poder adquisitivo y ciclos',
        items: ['PIB', 'Inflación', 'Intereses', 'Empleo'],
      },
      {
        icon: '🏛️',
        titulo: 'Político',
        texto: 'Gobierno y regulación',
        items: ['Estabilidad', 'Políticas', 'Aranceles', 'Leyes'],
      },
      {
        icon: '🤖',
        titulo: 'Tecnológico',
        texto: 'Innovación y adopción',
        items: ['IA', 'Automatización', '5G', 'Ciberseguridad'],
      },
      {
        icon: '🌱',
        titulo: 'Ecológico',
        texto: 'Recursos y sostenibilidad',
        items: ['Clima', 'Energía', 'Residuos', 'Recursos'],
      },
    ],
    pie: 'Cada factor se traduce en oportunidades y amenazas para el FODA.',
  },
  'septe-flujo': {
    kicker: 'Cómo se usa en la práctica',
    titulo: 'Del escaneo del entorno a la decisión',
    variante: 'flow',
    pasos: [
      { icon: '🔍', titulo: 'Escanear', texto: 'Investiga datos del macroentorno.' },
      { icon: '🧭', titulo: 'Clasificar', texto: 'Ubica cada hallazgo en S·E·P·T·E.' },
      { icon: '⚖️', titulo: 'Valorar', texto: '¿Oportunidad o amenaza? ¿Impacto?' },
      { icon: '🎯', titulo: 'Priorizar', texto: 'Elige los factores críticos.' },
      { icon: '🚀', titulo: 'Actuar', texto: 'Ajusta la estrategia y mide.' },
    ],
    pie: 'El análisis es un documento vivo: se revisa cada trimestre o ante un cambio relevante.',
  },
  'septe-fintech': {
    kicker: 'Caso aplicado',
    titulo: 'SEPTE para una fintech en Perú',
    variante: 'duo-grid',
    columnas: ['Oportunidad', 'Amenaza'],
    tarjetas: [
      {
        icon: '👥',
        titulo: 'Social',
        a: 'Población joven y digital; alta penetración de smartphones.',
        b: 'Baja educación financiera en algunos segmentos.',
      },
      {
        icon: '💰',
        titulo: 'Económico',
        a: 'Crecimiento del PIB y mayor acceso a crédito.',
        b: 'Inflación y volatilidad del tipo de cambio.',
      },
      {
        icon: '🏛️',
        titulo: 'Político',
        a: 'Políticas de inclusión financiera y regulación favorable.',
        b: 'Cambios regulatorios e inestabilidad política.',
      },
      {
        icon: '🤖',
        titulo: 'Tecnológico',
        a: 'IA, cloud y 5G amplían el alcance del servicio.',
        b: 'Riesgos de ciberseguridad y dependencia de la nube.',
      },
      {
        icon: '🌱',
        titulo: 'Ecológico',
        a: 'Demanda de banca verde y finanzas sostenibles.',
        b: 'Regulaciones ambientales que elevan costos.',
      },
    ],
    pie: 'Estrategia sugerida: captar al público joven-digital, invertir en educación financiera y blindar la ciberseguridad.',
  },

  /* -------------------------- AGILIDAD ----------------------------- */
  'agilidad-ciclo': {
    kicker: 'Ciclo de la organización ágil',
    titulo: 'Sentir → Decidir → Responder → Aprender',
    variante: 'loop',
    pasos: [
      { icon: '👂', titulo: 'Sentir', texto: 'Detecta señales del mercado, clientes y tecnología.' },
      { icon: '🧠', titulo: 'Decidir', texto: 'Decide rápido con datos y contexto compartido.' },
      { icon: '⚡', titulo: 'Responder', texto: 'Ejecuta con equipos autónomos y ciclos cortos.' },
      { icon: '🔁', titulo: 'Aprender', texto: 'Mide, ajusta y reinicia el ciclo.' },
    ],
    pie: 'La ventaja ágil no es correr más: es aprender más rápido que el entorno.',
  },
  'agilidad-pilares': {
    kicker: 'Mapa de implantación',
    titulo: 'Los 10 pilares de la Agilidad Empresarial',
    variante: 'grid',
    tarjetas: [
      { icon: '🧭', titulo: 'Liderazgo', texto: 'Modela, empodera y elimina barreras.' },
      { icon: '🌱', titulo: 'Cultura', texto: 'Seguridad psicológica y experimentación.' },
      { icon: '🎯', titulo: 'Estrategia', texto: 'OKRs y ciclos cortos de planificación.' },
      { icon: '🕸️', titulo: 'Estructura', texto: 'Equipos autónomos orientados a valor.' },
      { icon: '⚙️', titulo: 'Procesos', texto: 'Scrum, Kanban, SAFe, DevOps y CI/CD.' },
      { icon: '🧑‍💻', titulo: 'Personas', texto: 'Talento técnico y habilidades blandas.' },
      { icon: '☁️', titulo: 'Tecnología', texto: 'Cloud, APIs, microservicios e IA.' },
      { icon: '📊', titulo: 'Datos', texto: 'Decisiones en tiempo real y A/B testing.' },
      { icon: '💚', titulo: 'Cliente', texto: 'Feedback continuo y cocreación.' },
      { icon: '🤝', titulo: 'Ecosistema', texto: 'Alianzas, plataformas y socios.' },
    ],
    pie: 'Los pilares se refuerzan entre sí: fallar en cultura o liderazgo frena a los demás.',
  },

  /* ------------------------- BLITZSCALING -------------------------- */
  'blitzscaling-etapas': {
    kicker: 'Escalera de crecimiento',
    titulo: 'Las 5 etapas de Hoffman y Yeh',
    variante: 'steps',
    pasos: [
      { icon: '🏠', titulo: 'Familia', meta: '1–9 personas', texto: 'Crear un producto que el mercado quiera. MVP y Product-Market Fit.' },
      { icon: '👥', titulo: 'Tribu', meta: '10–99', texto: 'Encontrar un modelo de negocio escalable.' },
      { icon: '🏘️', titulo: 'Aldea', meta: '100–999', texto: 'Escalar el modelo: procesos, estructura y liderazgo.' },
      { icon: '🏙️', titulo: 'Ciudad', meta: '1,000–9,999', texto: 'Escalar la organización: cultura y descentralización.' },
      { icon: '🌍', titulo: 'Nación', meta: '10,000+', texto: 'Escalar el impacto y sostener el liderazgo global.' },
    ],
    pie: 'Cada etapa exige una estrategia distinta: lo que funciona en la Aldea puede romper la Ciudad.',
  },
  'blitzscaling-volante': {
    kicker: 'Principios que se refuerzan',
    titulo: 'El volante del Blitzscaling',
    variante: 'grid',
    tarjetas: [
      { icon: '⚡', titulo: 'Velocidad > eficiencia', texto: 'Crecer rápido importa más que optimizar.' },
      { icon: '🌪️', titulo: 'Acepta el caos', texto: 'La ineficiencia es parte del crecimiento.' },
      { icon: '🧪', titulo: 'Tolerancia al error', texto: 'Equivocarse rápido y aprender.' },
      { icon: '🎯', titulo: 'Enfoque en el mercado', texto: 'Sin efectos de red, no hay Blitzscaling.' },
      { icon: '🧑‍🚀', titulo: 'Contratación agresiva', texto: 'Talento antes de que exista el rol.' },
      { icon: '🔥', titulo: 'Alto rendimiento', texto: 'Cultura exigente y veloz.' },
      { icon: '💸', titulo: 'Capital masivo', texto: 'Grandes rondas para financiar el crecimiento.' },
      { icon: '💡', titulo: 'Innovación continua', texto: 'No te duermas en los laureles.' },
      { icon: '🧭', titulo: 'Liderazgo adaptativo', texto: 'Cambia el estilo en cada etapa.' },
    ],
    pie: 'El volante gira solo si el mercado es “winner-takes-most” y hay capital para sostenerlo.',
  },
  'blitzscaling-comparativa': {
    kicker: 'Dos formas de crecer',
    titulo: 'Crecimiento tradicional vs. Blitzscaling',
    variante: 'compare',
    izquierda: {
      titulo: 'Crecimiento tradicional',
      icon: '🐢',
      items: [
        'Velocidad moderada y sostenible',
        'Eficiencia y rentabilidad primero',
        'Riesgo bajo y controlado',
        'Financiamiento prudente',
        'Contratación escalonada',
        'Cultura de procesos y estabilidad',
        'Ejemplo: restaurante local',
      ],
    },
    derecha: {
      titulo: 'Blitzscaling',
      icon: '🚀',
      items: [
        'Velocidad extrema y acelerada',
        'Eficiencia sacrificada por crecer',
        'Riesgo alto y calculado',
        'Rondas de VC agresivas',
        'Contratación masiva',
        'Cultura de caos y experimentación',
        'Ejemplo: Uber, Airbnb, Facebook',
      ],
    },
  },
  'blitzscaling-empresas': {
    kicker: 'Casos reales',
    titulo: 'Empresas que aplicaron escalado relámpago',
    variante: 'grid',
    tarjetas: [
      { icon: '🚕', titulo: 'Uber', texto: 'Expansión por ciudades y subsidios. Líder global de movilidad.' },
      { icon: '🏠', titulo: 'Airbnb', texto: 'Expansión global y adquisiciones. Líder de alojamiento.' },
      { icon: '📘', titulo: 'Facebook', texto: 'Crecimiento viral y compras estratégicas.' },
      { icon: '📦', titulo: 'Amazon', texto: 'Logística, AWS y precios bajos a escala global.' },
      { icon: '💼', titulo: 'LinkedIn', texto: 'Crecimiento de red y expansión internacional.' },
      { icon: '🎬', titulo: 'Netflix', texto: 'Contenido original y streaming global.' },
      { icon: '🎵', titulo: 'Spotify', texto: 'Usuarios, discográficas y expansión mundial.' },
      { icon: '🛒', titulo: 'Mercado Libre', texto: 'E-commerce, logística y fintech en LatAm.' },
      { icon: '💳', titulo: 'Nubank', texto: 'Banca digital y crecimiento regional.' },
      { icon: '🛵', titulo: 'Rappi', texto: 'SuperApp multicategoría en Latinoamérica.' },
    ],
  },

  /* ----------------------------- CLOUD ----------------------------- */
  'cloud-capas': {
    kicker: 'Servicios en la nube',
    titulo: 'De la infraestructura al software listo para usar',
    variante: 'layers',
    capas: [
      { icon: '🏗️', titulo: 'IaaS', texto: 'Servidores, redes y almacenamiento alquilados.', meta: 'AWS EC2 · Azure VM · Compute Engine' },
      { icon: '🧰', titulo: 'PaaS', texto: 'Entorno gestionado para construir y desplegar.', meta: 'Elastic Beanstalk · App Engine · App Service' },
      { icon: '⚙️', titulo: 'FaaS / Serverless', texto: 'Código que corre sin administrar servidores.', meta: 'Lambda · Azure Functions · Cloud Functions' },
      { icon: '🗄️', titulo: 'DBaaS', texto: 'Bases de datos gestionadas y escalables.', meta: 'RDS · MongoDB Atlas · Cloud SQL' },
      { icon: '🧠', titulo: 'AIaaS', texto: 'IA y machine learning listos para integrar.', meta: 'SageMaker · Vertex AI · Azure ML' },
      { icon: '💼', titulo: 'SaaS', texto: 'Software completo por suscripción.', meta: 'Salesforce · Slack · Zoom · Workspace' },
    ],
    pie: 'La empresa consume la capa que necesita y paga solo por uso.',
  },
  'cloud-migracion': {
    kicker: 'Ruta de adopción',
    titulo: 'De servidores propios a Cloud-First',
    variante: 'flow',
    pasos: [
      { icon: '🏢', titulo: 'On-premise', texto: 'Servidores propios, CapEx alto, escalado lento.' },
      { icon: '🔀', titulo: 'Híbrido', texto: 'Parte del negocio migra; se convive con lo local.' },
      { icon: '☁️', titulo: 'Cloud-First', texto: 'La nube es el núcleo de productos y servicios.' },
      { icon: '⚡', titulo: 'Serverless', texto: 'Equipos enfocados en código, no en servidores.' },
      { icon: '📈', titulo: 'Escala global', texto: 'Regiones múltiples, CDN y resiliencia.' },
    ],
    pie: 'Cada paso reduce CapEx y aumenta velocidad, pero exige FinOps, seguridad y gobierno de datos.',
  },
  'cloud-comparativa': {
    kicker: 'Antes y después',
    titulo: 'On-premise vs. Cloud-First',
    variante: 'compare',
    izquierda: {
      titulo: 'On-premise',
      icon: '🏢',
      items: [
        'Infraestructura propia',
        'Inversión inicial alta (CapEx)',
        'Escalabilidad limitada y lenta',
        'Costos fijos y mantenimiento propio',
        'Innovación lenta',
        'Alcance local',
        'Seguridad bajo tu responsabilidad',
        'Time to market en meses',
      ],
    },
    derecha: {
      titulo: 'Cloud-First',
      icon: '☁️',
      items: [
        'Infraestructura alquilada',
        'Baja inversión inicial (OpEx)',
        'Escalabilidad elástica',
        'Costos variables por uso',
        'Innovación rápida con servicios gestionados',
        'Alcance global por regiones',
        'Seguridad compartida con el proveedor',
        'Time to market en días',
      ],
    },
  },
  'cloud-empresas': {
    kicker: 'Modelos cloud-first',
    titulo: 'Empresas que operan desde la nube',
    variante: 'grid',
    tarjetas: [
      { icon: '🎬', titulo: 'Netflix', texto: 'Streaming global sobre AWS, sin servidores propios.' },
      { icon: '🎵', titulo: 'Spotify', texto: 'Streaming y personalización con GCP.' },
      { icon: '🏠', titulo: 'Airbnb', texto: 'Marketplace global sin propiedades ni datacenter.' },
      { icon: '🚕', titulo: 'Uber', texto: 'Movilidad y datos en tiempo real en AWS/GCP.' },
      { icon: '💼', titulo: 'Salesforce', texto: 'CRM SaaS en la nube.' },
      { icon: '🎥', titulo: 'Zoom', texto: 'Videoconferencias globales sobre AWS/Oracle.' },
      { icon: '🛒', titulo: 'Mercado Libre', texto: 'E-commerce, fintech y logística cloud-first.' },
      { icon: '💳', titulo: 'Nubank', texto: 'Banca digital nativa de la nube.' },
      { icon: '🧑‍💻', titulo: 'GitLab', texto: 'DevSecOps como servicio cloud.' },
    ],
  },
}

export default function NegocioDiagrama({ tipo }) {
  const d = DIAGRAMAS[tipo]
  if (!d) return null

  return (
    <figure className={`ndg ndg--${d.variante}`}>
      <header className="ndg__head">
        <span className="ndg__kicker">{d.kicker}</span>
        <h4 className="ndg__title">{d.titulo}</h4>
      </header>

      {d.variante === 'hub' && (
        <div className="ndg-hub">
          <div className="ndg-hub__center">
            <span>{d.centro.icon}</span>
            <strong>{d.centro.titulo}</strong>
            <small>{d.centro.texto}</small>
          </div>
          <div className="ndg-hub__ring">
            {d.nodos.map((n) => (
              <article key={n.titulo} className="ndg-node">
                <span className="ndg-node__icon">{n.icon}</span>
                <strong>{n.titulo}</strong>
                <small>{n.texto}</small>
                <ul>
                  {n.items.map((it) => <li key={it}>{it}</li>)}
                </ul>
              </article>
            ))}
          </div>
        </div>
      )}

      {d.variante === 'flow' && (
        <ol className="ndg-flow">
          {d.pasos.map((p, i) => (
            <li key={p.titulo} className="ndg-flow__step">
              <div className="ndg-flow__box">
                <span className="ndg-flow__num">{i + 1}</span>
                <span className="ndg-flow__icon">{p.icon}</span>
                <strong>{p.titulo}</strong>
                <p>{p.texto}</p>
              </div>
              {i < d.pasos.length - 1 && <span className="ndg-flow__arrow" aria-hidden="true">→</span>}
            </li>
          ))}
        </ol>
      )}

      {d.variante === 'steps' && (
        <ol className="ndg-steps">
          {d.pasos.map((p, i) => (
            <li key={p.titulo} className="ndg-step" style={{ '--n': i }}>
              <span className="ndg-step__icon">{p.icon}</span>
              <div>
                <strong>{p.titulo}</strong>
                <span className="ndg-step__meta">{p.meta}</span>
                <p>{p.texto}</p>
              </div>
            </li>
          ))}
        </ol>
      )}

      {d.variante === 'layers' && (
        <div className="ndg-layers">
          {d.capas.map((c) => (
            <article key={c.titulo} className="ndg-layer">
              <span className="ndg-layer__icon">{c.icon}</span>
              <div className="ndg-layer__body">
                <strong>{c.titulo}</strong>
                <p>{c.texto}</p>
              </div>
              <span className="ndg-layer__meta">{c.meta}</span>
            </article>
          ))}
        </div>
      )}

      {d.variante === 'compare' && (
        <div className="ndg-compare">
          {[d.izquierda, d.derecha].map((col, i) => (
            <article key={col.titulo} className={`ndg-compare__col ${i === 1 ? 'is-alt' : ''}`}>
              <h5><span>{col.icon}</span> {col.titulo}</h5>
              <ul>
                {col.items.map((it) => <li key={it}>{it}</li>)}
              </ul>
            </article>
          ))}
        </div>
      )}

      {d.variante === 'grid' && (
        <div className="ndg-grid">
          {d.tarjetas.map((t) => (
            <article key={t.titulo} className="ndg-card">
              <span className="ndg-card__icon">{t.icon}</span>
              <strong>{t.titulo}</strong>
              <p>{t.texto}</p>
            </article>
          ))}
        </div>
      )}

      {d.variante === 'duo-grid' && (
        <div className="ndg-duo">
          <div className="ndg-duo__labels">
            <span />
            {d.columnas.map((c, i) => (
              <span key={c} className={i === 0 ? 'is-good' : 'is-risk'}>{c}</span>
            ))}
          </div>
          {d.tarjetas.map((t) => (
            <div key={t.titulo} className="ndg-duo__row">
              <span className="ndg-duo__factor">
                <span>{t.icon}</span> {t.titulo}
              </span>
              <span className="ndg-duo__cell is-good">{t.a}</span>
              <span className="ndg-duo__cell is-risk">{t.b}</span>
            </div>
          ))}
        </div>
      )}

      {d.variante === 'loop' && (
        <div className="ndg-loop">
          {d.pasos.map((p, i) => (
            <article key={p.titulo} className="ndg-loop__item">
              <span className="ndg-loop__icon">{p.icon}</span>
              <strong>{p.titulo}</strong>
              <p>{p.texto}</p>
              <span className="ndg-loop__back">{i < d.pasos.length - 1 ? '↓' : '↺'}</span>
            </article>
          ))}
        </div>
      )}

      {d.pie && <figcaption className="ndg__pie">💡 {d.pie}</figcaption>}
    </figure>
  )
}
