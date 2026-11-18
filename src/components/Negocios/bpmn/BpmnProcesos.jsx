import FlujoProceso from './BpmnFlujo'

/* Los seis procesos empresariales que aparecen en el apunte BPMN.
   Cada uno tiene su flujo principal, roles y decisiones que cambian el camino. */

const ROLES = {
  empleado: '#60a5fa',
  rrhh: '#a78bfa',
  jefe: '#34d399',
  mesero: '#22d3ee',
  cocina: '#fb923c',
  caja: '#34d399',
  recepcion: '#60a5fa',
  taller: '#fb923c',
  supervisor: '#a78bfa',
  atencion: '#60a5fa',
  logistica: '#22d3ee',
  operaciones: '#a78bfa',
  repartidor: '#34d399',
  comercial: '#60a5fa',
  credito: '#a78bfa',
  almacen: '#fbbf24',
  n1: '#60a5fa',
  n2: '#a78bfa',
  desarrollo: '#fbbf24',
  devops: '#34d399',
}

const procesos = [
  {
    id: 'vacaciones',
    titulo: 'Solicitud de vacaciones de un empleado',
    subtitulo:
      'El empleado registra la solicitud, RRHH valida el saldo y el jefe aprueba. Si no hay saldo, la solicitud vuelve para ajustar fechas.',
    roles: [
      { nombre: 'Empleado', color: ROLES.empleado },
      { nombre: 'RRHH', color: ROLES.rrhh },
      { nombre: 'Jefe', color: ROLES.jefe },
    ],
    nodos: [
      { id: 'p1-inicio', tipo: 'inicio', label: 'Solicitud de vacaciones' },
      { id: 'p1-registrar', tipo: 'tarea', label: 'Registrar solicitud', rol: 'Empleado' },
      { id: 'p1-saldo', tipo: 'decision', label: '¿Saldo suficiente?', rol: 'RRHH', salida: 'Sí' },
      { id: 'p1-aprobar', tipo: 'tarea', label: 'Aprobar solicitud', rol: 'Jefe' },
      { id: 'p1-notificar', tipo: 'tarea', label: 'Notificar resultado', rol: 'RRHH' },
      { id: 'p1-fin', tipo: 'fin', label: 'Proceso cerrado' },
    ],
    ramas: [
      {
        desde: 'p1-saldo',
        etiqueta: 'No',
        nivel: 1,
        nodos: [
          { id: 'p1-ajustar', tipo: 'tarea', label: 'Rechazar y ajustar fechas', rol: 'Empleado' },
        ],
        vuelveA: 'p1-registrar',
        etiquetaRetorno: '↺ nueva solicitud',
      },
    ],
    nota:
      'La compuerta XOR obliga a elegir un solo camino. Si el saldo no alcanza, el flujo regresa a registrar la solicitud con otras fechas en lugar de terminar el proceso.',
  },
  {
    id: 'restaurante',
    titulo: 'Atención y preparación de platos en un restaurante',
    subtitulo:
      'El mesero toma el pedido y cocina lo prepara. Si faltan ingredientes se abre una ruta de reposición que puede terminar cancelando el pedido.',
    roles: [
      { nombre: 'Mesero', color: ROLES.mesero },
      { nombre: 'Cocina', color: ROLES.cocina },
      { nombre: 'Caja', color: ROLES.caja },
    ],
    nodos: [
      { id: 'p2-inicio', tipo: 'inicio', label: 'Cliente llega' },
      { id: 'p2-pedido', tipo: 'tarea', label: 'Tomar pedido', rol: 'Mesero' },
      { id: 'p2-ingredientes', tipo: 'decision', label: '¿Ingredientes disponibles?', rol: 'Cocina', salida: 'Sí' },
      { id: 'p2-preparar', tipo: 'tarea', label: 'Preparar y emplatar', rol: 'Cocina' },
      { id: 'p2-servir', tipo: 'tarea', label: 'Servir el plato', rol: 'Mesero' },
      { id: 'p2-cobrar', tipo: 'tarea', label: 'Cobrar y cerrar', rol: 'Caja' },
      { id: 'p2-fin', tipo: 'fin', label: 'Pedido cerrado' },
    ],
    ramas: [
      {
        desde: 'p2-ingredientes',
        etiqueta: 'No',
        nivel: 1,
        nodos: [
          { id: 'p2-reponer', tipo: 'tarea', label: 'Solicitar reposición', rol: 'Cocina' },
          { id: 'p2-proveedor', tipo: 'decision', label: '¿Proveedor responde?', rol: 'Cocina', salida: 'Sí' },
        ],
        vuelveA: 'p2-preparar',
        etiquetaRetorno: '↺ ya hay stock',
      },
      {
        desde: 'p2-proveedor',
        etiqueta: 'No',
        nivel: 2,
        nodos: [{ id: 'p2-cancelado', tipo: 'fin', label: 'Cancelar pedido' }],
      },
    ],
    nota:
      'La primera decisión separa el camino feliz de la reposición. La segunda decisión demuestra que una rama puede tener su propia compuerta y terminar en un fin distinto.',
  },
  {
    id: 'autos',
    titulo: 'Control y mantenimiento de autos',
    subtitulo:
      'Recepción inspecciona el vehículo, el taller ejecuta el mantenimiento y el supervisor valida la calidad. Las reparaciones extra se autorizan con el cliente.',
    roles: [
      { nombre: 'Recepción', color: ROLES.recepcion },
      { nombre: 'Taller', color: ROLES.taller },
      { nombre: 'Supervisor', color: ROLES.supervisor },
    ],
    nodos: [
      { id: 'p3-inicio', tipo: 'inicio', label: 'Vehículo llega' },
      { id: 'p3-recepcion', tipo: 'tarea', label: 'Recibir e inspeccionar', rol: 'Recepción' },
      { id: 'p3-mantenimiento', tipo: 'decision', label: '¿Requiere mantenimiento?', rol: 'Recepción', salida: 'Sí' },
      { id: 'p3-mantener', tipo: 'tarea', label: 'Realizar mantenimiento', rol: 'Taller' },
      { id: 'p3-extra', tipo: 'decision', label: '¿Reparación adicional?', rol: 'Taller', salida: 'No' },
      { id: 'p3-calidad', tipo: 'tarea', label: 'Prueba de calidad', rol: 'Taller' },
      { id: 'p3-aprobado', tipo: 'decision', label: '¿Aprobado?', rol: 'Supervisor', salida: 'Sí' },
      { id: 'p3-entregar', tipo: 'tarea', label: 'Entregar vehículo', rol: 'Recepción' },
      { id: 'p3-fin', tipo: 'fin', label: 'Servicio cerrado' },
    ],
    ramas: [
      {
        desde: 'p3-mantenimiento',
        etiqueta: 'No',
        nivel: 1,
        nodos: [
          { id: 'p3-sin-servicio', tipo: 'tarea', label: 'Entregar sin servicio', rol: 'Recepción' },
          { id: 'p3-devuelto', tipo: 'fin', label: 'Vehículo devuelto' },
        ],
      },
      {
        desde: 'p3-extra',
        etiqueta: 'Sí',
        nivel: 2,
        nodos: [
          { id: 'p3-autorizar', tipo: 'tarea', label: 'Autorizar con cliente', rol: 'Recepción' },
        ],
        vuelveA: 'p3-mantener',
        etiquetaRetorno: '↺ reparar',
      },
      {
        desde: 'p3-aprobado',
        etiqueta: 'No',
        nivel: 3,
        nodos: [
          { id: 'p3-corregir', tipo: 'tarea', label: 'Corregir fallas', rol: 'Taller' },
        ],
        vuelveA: 'p3-calidad',
        etiquetaRetorno: '↺ nueva prueba',
      },
    ],
    nota:
      'Tres decisiones encadenadas: sin mantenimiento se entrega igual; una reparación extra exige autorización; y si la prueba de calidad falla, el vehículo vuelve al taller antes de entregarse.',
  },
  {
    id: 'encomiendas',
    titulo: 'Envío y entrega de encomiendas',
    subtitulo:
      'Se validan los datos, se clasifica la ruta y se hace seguimiento. La entrega puede reintentarse; al tercer intento fallido, la encomienda se devuelve.',
    roles: [
      { nombre: 'Atención', color: ROLES.atencion },
      { nombre: 'Logística', color: ROLES.logistica },
      { nombre: 'Operaciones', color: ROLES.operaciones },
      { nombre: 'Repartidor', color: ROLES.repartidor },
    ],
    nodos: [
      { id: 'p4-inicio', tipo: 'inicio', label: 'Registrar envío' },
      { id: 'p4-validar', tipo: 'tarea', label: 'Validar datos', rol: 'Atención' },
      { id: 'p4-datos', tipo: 'decision', label: '¿Datos válidos?', rol: 'Atención', salida: 'Sí' },
      { id: 'p4-clasificar', tipo: 'tarea', label: 'Clasificar envío', rol: 'Logística' },
      { id: 'p4-nacional', tipo: 'decision', label: '¿Destino nacional?', rol: 'Logística', salida: 'Sí' },
      { id: 'p4-transporte', tipo: 'tarea', label: 'Transporte y seguimiento', rol: 'Operaciones' },
      { id: 'p4-entregado', tipo: 'decision', label: '¿Entregado?', rol: 'Repartidor', salida: 'Sí' },
      { id: 'p4-confirmar', tipo: 'tarea', label: 'Confirmar entrega', rol: 'Repartidor' },
      { id: 'p4-fin', tipo: 'fin', label: 'Encomienda entregada' },
    ],
    ramas: [
      {
        desde: 'p4-datos',
        etiqueta: 'No',
        nivel: 1,
        nodos: [
          { id: 'p4-corregir', tipo: 'tarea', label: 'Notificar corrección', rol: 'Atención' },
        ],
        vuelveA: 'p4-validar',
        etiquetaRetorno: '↺ corregir datos',
      },
      {
        desde: 'p4-nacional',
        etiqueta: 'No',
        nivel: 1,
        nodos: [
          { id: 'p4-aereo', tipo: 'tarea', label: 'Gestionar ruta aérea', rol: 'Operaciones' },
        ],
        vuelveA: 'p4-transporte',
        etiquetaRetorno: '↺ en tránsito',
      },
      {
        desde: 'p4-entregado',
        etiqueta: 'No',
        nivel: 2,
        nodos: [
          { id: 'p4-reintentar', tipo: 'tarea', label: 'Reintentar entrega', rol: 'Repartidor' },
          { id: 'p4-tercer', tipo: 'decision', label: '¿Tercer intento?', rol: 'Repartidor', salida: 'Sí' },
        ],
        vuelveA: 'p4-entregado',
        etiquetaRetorno: '↺ otro intento',
      },
      {
        desde: 'p4-tercer',
        etiqueta: 'Sí',
        nivel: 3,
        nodos: [
          { id: 'p4-devolver', tipo: 'fin', label: 'Devolver al remitente' },
        ],
      },
    ],
    nota:
      'Se muestran tres decisiones reales: validación de datos, destino nacional o internacional y entrega fallida. El flujo de devolución solo se activa cuando se agota el tercer intento.',
  },
  {
    id: 'b2b',
    titulo: 'Gestión de pedidos B2B (mayorista)',
    subtitulo:
      'El pedido pasa por validación de cliente, crédito y stock. Cada compuerta puede abrir una ruta alternativa antes de despachar.',
    roles: [
      { nombre: 'Comercial', color: ROLES.comercial },
      { nombre: 'Crédito', color: ROLES.credito },
      { nombre: 'Almacén', color: ROLES.almacen },
      { nombre: 'Logística', color: ROLES.logistica },
    ],
    nodos: [
      { id: 'p5-inicio', tipo: 'inicio', label: 'Pedido mayorista' },
      { id: 'p5-cliente', tipo: 'decision', label: '¿Cliente activo?', rol: 'Comercial', salida: 'Sí' },
      { id: 'p5-credito', tipo: 'tarea', label: 'Evaluar crédito', rol: 'Crédito' },
      { id: 'p5-aprobado', tipo: 'decision', label: '¿Crédito aprobado?', rol: 'Crédito', salida: 'Sí' },
      { id: 'p5-stock', tipo: 'tarea', label: 'Reservar y preparar', rol: 'Almacén' },
      { id: 'p5-disponible', tipo: 'decision', label: '¿Stock disponible?', rol: 'Almacén', salida: 'Sí' },
      { id: 'p5-despachar', tipo: 'tarea', label: 'Despachar pedido', rol: 'Logística' },
      { id: 'p5-fin', tipo: 'fin', label: 'Pedido entregado' },
    ],
    ramas: [
      {
        desde: 'p5-cliente',
        etiqueta: 'No',
        nivel: 1,
        nodos: [
          { id: 'p5-rechazar', tipo: 'tarea', label: 'Rechazar pedido', rol: 'Comercial' },
          { id: 'p5-rechazado-fin', tipo: 'fin', label: 'Pedido rechazado' },
        ],
      },
      {
        desde: 'p5-aprobado',
        etiqueta: 'No',
        nivel: 1,
        nodos: [
          { id: 'p5-anticipo', tipo: 'tarea', label: 'Solicitar anticipo', rol: 'Crédito' },
          { id: 'p5-pago', tipo: 'decision', label: '¿Pago recibido?', rol: 'Crédito', salida: 'Sí' },
        ],
        vuelveA: 'p5-stock',
        etiquetaRetorno: '↺ continuar',
      },
      {
        desde: 'p5-pago',
        etiqueta: 'No',
        nivel: 2,
        nodos: [{ id: 'p5-cancelar', tipo: 'fin', label: 'Cancelar pedido' }],
      },
      {
        desde: 'p5-disponible',
        etiqueta: 'No',
        nivel: 2,
        nodos: [
          { id: 'p5-comprar', tipo: 'tarea', label: 'Comprar a proveedor', rol: 'Almacén' },
        ],
        vuelveA: 'p5-stock',
        etiquetaRetorno: '↺ reponer stock',
      },
    ],
    nota:
      'El proceso B2B combina tres compuertas: cliente activo, crédito aprobado y stock disponible. Las rutas de anticipo y compra a proveedor vuelven al flujo principal cuando se resuelven.',
  },
  {
    id: 'tickets',
    titulo: 'Atención de tickets de soporte',
    subtitulo:
      'El ticket se clasifica y se resuelve en primer nivel. Si es crítico o no se resuelve, se escala a N2, donde puede requerir desarrollo y despliegue.',
    roles: [
      { nombre: 'N1', color: ROLES.n1 },
      { nombre: 'N2', color: ROLES.n2 },
      { nombre: 'Desarrollo', color: ROLES.desarrollo },
      { nombre: 'DevOps', color: ROLES.devops },
    ],
    nodos: [
      { id: 'p6-inicio', tipo: 'inicio', label: 'Ticket recibido' },
      { id: 'p6-clasificar', tipo: 'tarea', label: 'Clasificar ticket', rol: 'N1' },
      { id: 'p6-critico', tipo: 'decision', label: '¿Crítico?', rol: 'N1', salida: 'No' },
      { id: 'p6-resolver', tipo: 'tarea', label: 'Resolver en N1', rol: 'N1' },
      { id: 'p6-resuelto', tipo: 'decision', label: '¿Resuelto?', rol: 'N1', salida: 'Sí' },
      { id: 'p6-notificar', tipo: 'tarea', label: 'Notificar solución', rol: 'N1' },
      { id: 'p6-fin', tipo: 'fin', label: 'Ticket cerrado' },
    ],
    ramas: [
      {
        desde: 'p6-critico',
        etiqueta: 'Sí',
        nivel: 1,
        nodos: [
          { id: 'p6-escalar', tipo: 'tarea', label: 'Escalar a N2', rol: 'N2' },
          { id: 'p6-diagnosticar', tipo: 'tarea', label: 'Diagnosticar causa', rol: 'N2' },
          { id: 'p6-cambio', tipo: 'decision', label: '¿Requiere cambio?', rol: 'N2', salida: 'No' },
        ],
        vuelveA: 'p6-notificar',
        etiquetaRetorno: 'No, workaround',
      },
      {
        desde: 'p6-cambio',
        etiqueta: 'Sí',
        nivel: 2,
        nodos: [
          { id: 'p6-desarrollar', tipo: 'tarea', label: 'Desarrollar parche', rol: 'Desarrollo' },
          { id: 'p6-desplegar', tipo: 'tarea', label: 'Desplegar', rol: 'DevOps' },
        ],
        vuelveA: 'p6-notificar',
        etiquetaRetorno: '↺ notificar',
      },
      {
        desde: 'p6-resuelto',
        etiqueta: 'No',
        nivel: 3,
        nodos: [
          { id: 'p6-reabrir', tipo: 'tarea', label: 'Reabrir y priorizar', rol: 'N1' },
        ],
        vuelveA: 'p6-clasificar',
        etiquetaRetorno: '↺ reclasificar',
      },
    ],
    nota:
      'Los tickets críticos se escalan; los que no se resuelven vuelven a clasificarse. La compuerta de N2 decide si basta un workaround o si hace falta un parche y un despliegue.',
  },
]

export default function BpmnProcesos() {
  return (
    <section className="doc-card doc-card--full bpmn-procesos" id="bpmn-procesos">
      <div className="bpmn-seccion__head">
        <span className="bpmn-seccion__icono">🏭</span>
        <div>
          <h3>Ejemplos de Procesos Empresariales</h3>
          <p>
            Seis procesos completos con figuras geométricas BPMN, roles y
            decisiones que cambian el camino. Usa la leyenda para identificar
            quién hace cada tarea y sigue las flechas para leer el flujo.
          </p>
        </div>
      </div>

      <div className="bpmn-procesos__lista">
        {procesos.map((proceso, i) => (
          <FlujoProceso
            key={proceso.id}
            numero={i + 1}
            titulo={proceso.titulo}
            subtitulo={proceso.subtitulo}
            roles={proceso.roles}
            nodos={proceso.nodos}
            ramas={proceso.ramas}
            nota={proceso.nota}
            icono="🏭"
          />
        ))}
      </div>
    </section>
  )
}
