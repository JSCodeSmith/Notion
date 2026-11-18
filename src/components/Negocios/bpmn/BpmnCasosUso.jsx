import FlujoProceso from './BpmnFlujo'

/* Un diagrama BPMN por cada caso de uso del apunte.
   Se usan versiones compactas para que se puedan leer dentro de la nota. */

const casos = [
  {
    id: 'onboarding',
    icono: '🧑‍💼',
    titulo: 'Onboarding de empleados',
    subtitulo:
      'Desde la oferta aceptada hasta la incorporación: documentos, accesos e inducción.',
    roles: [
      { nombre: 'RRHH', color: '#60a5fa' },
      { nombre: 'TI', color: '#a78bfa' },
    ],
    nodos: [
      { id: 'c1-inicio', tipo: 'inicio', label: 'Oferta aceptada' },
      { id: 'c1-docs', tipo: 'tarea', label: 'Recibir documentos', rol: 'RRHH' },
      { id: 'c1-completos', tipo: 'decision', label: '¿Documentos completos?', rol: 'RRHH', salida: 'Sí' },
      { id: 'c1-accesos', tipo: 'tarea', label: 'Crear accesos', rol: 'TI' },
      { id: 'c1-induccion', tipo: 'tarea', label: 'Inducción', rol: 'RRHH' },
      { id: 'c1-fin', tipo: 'fin', label: 'Empleado activo' },
    ],
    ramas: [
      {
        desde: 'c1-completos',
        etiqueta: 'No',
        nivel: 1,
        nodos: [{ id: 'c1-faltantes', tipo: 'tarea', label: 'Solicitar faltantes', rol: 'RRHH' }],
        vuelveA: 'c1-docs',
        etiquetaRetorno: '↺ revisar',
      },
    ],
  },
  {
    id: 'atencion',
    icono: '🎧',
    titulo: 'Atención al cliente',
    subtitulo:
      'Clasificación de tickets, resolución en primer nivel y escalado cuando hace falta.',
    roles: [
      { nombre: 'Soporte', color: '#22d3ee' },
      { nombre: 'Especialista', color: '#a78bfa' },
    ],
    nodos: [
      { id: 'c2-inicio', tipo: 'inicio', label: 'Ticket recibido' },
      { id: 'c2-clasificar', tipo: 'tarea', label: 'Clasificar solicitud', rol: 'Soporte' },
      { id: 'c2-n1', tipo: 'decision', label: '¿Resoluble en N1?', rol: 'Soporte', salida: 'Sí' },
      { id: 'c2-resolver', tipo: 'tarea', label: 'Resolver y registrar', rol: 'Soporte' },
      { id: 'c2-encuesta', tipo: 'tarea', label: 'Encuesta de satisfacción', rol: 'Soporte' },
      { id: 'c2-fin', tipo: 'fin', label: 'Caso cerrado' },
    ],
    ramas: [
      {
        desde: 'c2-n1',
        etiqueta: 'No',
        nivel: 1,
        nodos: [{ id: 'c2-escalar', tipo: 'tarea', label: 'Escalar a especialista', rol: 'Especialista' }],
        vuelveA: 'c2-resolver',
        etiquetaRetorno: '↺ resolver',
      },
    ],
  },
  {
    id: 'financiero',
    icono: '💳',
    titulo: 'Procesos financieros',
    subtitulo:
      'Aprobación de un crédito: documentación, capacidad de pago y desembolso.',
    roles: [
      { nombre: 'Riesgo', color: '#60a5fa' },
      { nombre: 'Comité', color: '#a78bfa' },
    ],
    nodos: [
      { id: 'c3-inicio', tipo: 'inicio', label: 'Solicitud de crédito' },
      { id: 'c3-docs', tipo: 'tarea', label: 'Verificar documentación', rol: 'Riesgo' },
      { id: 'c3-requisitos', tipo: 'decision', label: '¿Cumple requisitos?', rol: 'Riesgo', salida: 'Sí' },
      { id: 'c3-capacidad', tipo: 'tarea', label: 'Evaluar capacidad de pago', rol: 'Riesgo' },
      { id: 'c3-aprobar', tipo: 'tarea', label: 'Aprobar y desembolsar', rol: 'Comité' },
      { id: 'c3-fin', tipo: 'fin', label: 'Crédito otorgado' },
    ],
    ramas: [
      {
        desde: 'c3-requisitos',
        etiqueta: 'No',
        nivel: 1,
        nodos: [
          { id: 'c3-rechazar', tipo: 'tarea', label: 'Rechazar y notificar', rol: 'Riesgo' },
          { id: 'c3-rechazo-fin', tipo: 'fin', label: 'Solicitud rechazada' },
        ],
      },
    ],
  },
  {
    id: 'logistica',
    icono: '📦',
    titulo: 'Logística',
    subtitulo:
      'Pedidos, inventario y envíos: reserva de stock, preparación y despacho.',
    roles: [
      { nombre: 'Almacén', color: '#fbbf24' },
      { nombre: 'Compras', color: '#a78bfa' },
      { nombre: 'Transporte', color: '#34d399' },
    ],
    nodos: [
      { id: 'c4-inicio', tipo: 'inicio', label: 'Pedido confirmado' },
      { id: 'c4-reservar', tipo: 'tarea', label: 'Reservar inventario', rol: 'Almacén' },
      { id: 'c4-stock', tipo: 'decision', label: '¿Stock disponible?', rol: 'Almacén', salida: 'Sí' },
      { id: 'c4-preparar', tipo: 'tarea', label: 'Preparar y empacar', rol: 'Almacén' },
      { id: 'c4-despachar', tipo: 'tarea', label: 'Despachar y rastrear', rol: 'Transporte' },
      { id: 'c4-fin', tipo: 'fin', label: 'Pedido entregado' },
    ],
    ramas: [
      {
        desde: 'c4-stock',
        etiqueta: 'No',
        nivel: 1,
        nodos: [{ id: 'c4-comprar', tipo: 'tarea', label: 'Comprar a proveedor', rol: 'Compras' }],
        vuelveA: 'c4-reservar',
        etiquetaRetorno: '↺ reponer',
      },
    ],
  },
  {
    id: 'salud',
    icono: '🏥',
    titulo: 'Salud',
    subtitulo:
      'Admisión de pacientes y triaje: urgencias o consulta programada.',
    roles: [
      { nombre: 'Enfermería', color: '#22d3ee' },
      { nombre: 'Urgencias', color: '#f87171' },
      { nombre: 'Consulta', color: '#34d399' },
    ],
    nodos: [
      { id: 'c5-inicio', tipo: 'inicio', label: 'Paciente llega' },
      { id: 'c5-triaje', tipo: 'tarea', label: 'Admisión y triaje', rol: 'Enfermería' },
      { id: 'c5-urgencia', tipo: 'decision', label: '¿Urgencia?', rol: 'Enfermería', salida: 'Sí' },
      { id: 'c5-derivar', tipo: 'tarea', label: 'Derivar a urgencias', rol: 'Urgencias' },
      { id: 'c5-fin', tipo: 'fin', label: 'Atención urgente' },
    ],
    ramas: [
      {
        desde: 'c5-urgencia',
        etiqueta: 'No',
        nivel: 1,
        nodos: [
          { id: 'c5-agendar', tipo: 'tarea', label: 'Agendar consulta', rol: 'Consulta' },
          { id: 'c5-autorizar', tipo: 'tarea', label: 'Autorizar tratamiento', rol: 'Consulta' },
          { id: 'c5-consulta-fin', tipo: 'fin', label: 'Consulta atendida' },
        ],
      },
    ],
  },
  {
    id: 'bpms',
    icono: '⚙️',
    titulo: 'Automatización con BPMS',
    subtitulo:
      'Del modelo BPMN a la ejecución: formularios, reglas, despliegue y métricas.',
    roles: [
      { nombre: 'Negocio', color: '#60a5fa' },
      { nombre: 'TI', color: '#a78bfa' },
    ],
    nodos: [
      { id: 'c6-inicio', tipo: 'inicio', label: 'Modelo BPMN listo' },
      { id: 'c6-formularios', tipo: 'tarea', label: 'Configurar formularios', rol: 'TI' },
      { id: 'c6-reglas', tipo: 'decision', label: '¿Reglas completas?', rol: 'TI', salida: 'Sí' },
      { id: 'c6-desplegar', tipo: 'tarea', label: 'Desplegar en BPMS', rol: 'TI' },
      { id: 'c6-metricas', tipo: 'tarea', label: 'Monitorear métricas', rol: 'Negocio' },
      { id: 'c6-fin', tipo: 'fin', label: 'Proceso automatizado' },
    ],
    ramas: [
      {
        desde: 'c6-reglas',
        etiqueta: 'No',
        nivel: 1,
        nodos: [{ id: 'c6-dmn', tipo: 'tarea', label: 'Completar DMN', rol: 'Negocio' }],
        vuelveA: 'c6-formularios',
        etiquetaRetorno: '↺ ajustar',
      },
    ],
  },
  {
    id: 'iso',
    icono: '📋',
    titulo: 'Certificaciones ISO',
    subtitulo:
      'Documentar un proceso crítico, corregir hallazgos y preparar la auditoría.',
    roles: [
      { nombre: 'Calidad', color: '#60a5fa' },
      { nombre: 'Auditor', color: '#a78bfa' },
    ],
    nodos: [
      { id: 'c7-inicio', tipo: 'inicio', label: 'Proceso crítico' },
      { id: 'c7-documentar', tipo: 'tarea', label: 'Documentar procedimiento', rol: 'Calidad' },
      { id: 'c7-norma', tipo: 'decision', label: '¿Cumple norma?', rol: 'Calidad', salida: 'Sí' },
      { id: 'c7-auditoria', tipo: 'tarea', label: 'Auditoría interna', rol: 'Auditor' },
      { id: 'c7-evidencia', tipo: 'tarea', label: 'Registrar evidencia', rol: 'Calidad' },
      { id: 'c7-fin', tipo: 'fin', label: 'Certificación lista' },
    ],
    ramas: [
      {
        desde: 'c7-norma',
        etiqueta: 'No',
        nivel: 1,
        nodos: [{ id: 'c7-corregir', tipo: 'tarea', label: 'Corregir hallazgos', rol: 'Calidad' }],
        vuelveA: 'c7-documentar',
        etiquetaRetorno: '↺ documentar',
      },
    ],
  },
  {
    id: 'digital',
    icono: '🚀',
    titulo: 'Transformación digital',
    subtitulo:
      'Mapear el proceso actual (AS-IS), diseñar el futuro (TO-BE) y medir un piloto.',
    roles: [
      { nombre: 'Negocio', color: '#60a5fa' },
      { nombre: 'Tecnología', color: '#a78bfa' },
    ],
    nodos: [
      { id: 'c8-inicio', tipo: 'inicio', label: 'Proceso actual (AS-IS)' },
      { id: 'c8-mapear', tipo: 'tarea', label: 'Mapear flujo y dolor', rol: 'Negocio' },
      { id: 'c8-automatizar', tipo: 'decision', label: '¿Automatizar?', rol: 'Negocio', salida: 'Sí' },
      { id: 'c8-tobe', tipo: 'tarea', label: 'Diseñar TO-BE', rol: 'Tecnología' },
      { id: 'c8-piloto', tipo: 'tarea', label: 'Piloto y medición', rol: 'Tecnología' },
      { id: 'c8-fin', tipo: 'fin', label: 'Proceso digital' },
    ],
    ramas: [
      {
        desde: 'c8-automatizar',
        etiqueta: 'No',
        nivel: 1,
        nodos: [{ id: 'c8-manual', tipo: 'tarea', label: 'Rediseñar manual', rol: 'Negocio' }],
        vuelveA: 'c8-mapear',
        etiquetaRetorno: '↺ reevaluar',
      },
    ],
  },
]

export default function BpmnCasosUso() {
  return (
    <section className="doc-card doc-card--full bpmn-casos" id="bpmn-casos">
      <div className="bpmn-seccion__head">
        <span className="bpmn-seccion__icono">💼</span>
        <div>
          <h3>Casos de uso · un diagrama por caso</h3>
          <p>
            Ocho aplicaciones reales de BPMN. Cada diagrama muestra el flujo
            principal, los roles y la decisión que cambia el resultado.
          </p>
        </div>
      </div>

      <div className="bpmn-casos__lista">
        {casos.map((caso) => (
          <FlujoProceso
            key={caso.id}
            compacto
            titulo={caso.titulo}
            subtitulo={caso.subtitulo}
            roles={caso.roles}
            nodos={caso.nodos}
            ramas={caso.ramas}
            icono={caso.icono}
          />
        ))}
      </div>
    </section>
  )
}
