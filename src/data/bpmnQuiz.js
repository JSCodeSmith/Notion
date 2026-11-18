/* Quiz de BPMN con el mismo formato que QuizFind: 14 preguntas y pistas
   ampliadas para repasar antes de responder. */
export const BPMN_QUIZ = [
  {
    id: 1,
    pregunta: '¿Qué es <code>BPMN</code>?',
    opciones: [
      'Una notación gráfica estándar para modelar procesos de negocio',
      'Un lenguaje de programación para ejecutar procesos',
      'Un software de gestión de bases de datos',
      'Un tipo de organigrama empresarial',
    ],
    correcta: 0,
    pista:
      'BPMN no compila ni ejecuta código por sí solo: es un vocabulario visual con símbolos y reglas. Piensa en él como el plano que usan tanto el área de negocio como el equipo técnico para hablar del mismo proceso. Su versión más difundida es BPMN 2.0, mantenida por la OMG.',
    explicacionOk:
      '<strong>¡Exacto!</strong> BPMN (Business Process Model and Notation) es una notación gráfica estándar. Describe <em>qué</em> ocurre, <em>quién</em> lo hace y <em>cuándo</em>, con símbolos precisos como eventos, tareas y compuertas.',
    explicacionFail:
      '<strong>Cuidado.</strong> BPMN no es un lenguaje de programación ni un software: es una notación visual. Los motores BPMS pueden interpretar modelos BPMN 2.0, pero el estándar en sí sirve para modelar y comunicar procesos.',
    codigo:
      '// BPMN se guarda como XML (BPMN 2.0)\n<definitions>\n  <process id="pedido"> ... </process>\n</definitions>',
  },
  {
    id: 2,
    pregunta: '¿Qué representa un <strong>evento de inicio</strong> en BPMN?',
    opciones: [
      'El suceso que dispara el proceso',
      'Una tarea que realiza el cliente',
      'Una decisión con dos caminos',
      'El final obligatorio de una rama',
    ],
    correcta: 0,
    pista:
      'El evento de inicio se dibuja como un círculo simple y responde a la pregunta «¿qué pone en marcha este proceso?». Puede ser una solicitud, un pedido, un horario o la llegada de un mensaje. Sin él, el lector no sabe dónde comienza el flujo.',
    explicacionOk:
      '<strong>Correcto.</strong> El evento de inicio dispara el proceso. Todo diagrama BPMN debe tener un inicio claro (y al menos un fin) para que el recorrido del token sea comprensible.',
    explicacionFail:
      '<strong>No exactamente.</strong> El evento de inicio no es una tarea ni una decisión: es el suceso que activa el proceso. Las tareas son rectángulos redondeados y las decisiones son rombos.',
  },
  {
    id: 3,
    pregunta: '¿Qué es una <strong>tarea</strong> en un diagrama BPMN?',
    opciones: [
      'Trabajo atómico que realiza una persona o un sistema',
      'Un conjunto de decisiones paralelas',
      'El participante dueño del proceso',
      'Una anotación de texto libre',
    ],
    correcta: 0,
    pista:
      'La tarea es la unidad de trabajo más pequeña del proceso: «recibir solicitud», «validar datos», «aprobar compra». Se dibuja como un rectángulo redondeado y suele llevar un verbo en infinitivo. Si necesitas agrupar varias tareas, usas un subproceso.',
    explicacionOk:
      '<strong>¡Bien!</strong> Una tarea es una actividad atómica. El nombre debe describir una acción concreta y, si aplica, el rol que la ejecuta.',
    explicacionFail:
      '<strong>Revisa la definición.</strong> La tarea es trabajo atómico, no una decisión ni un participante. Las decisiones se modelan con compuertas y los participantes con pools o lanes.',
  },
  {
    id: 4,
    pregunta: 'Una compuerta <strong>exclusiva (XOR)</strong> sirve para…',
    opciones: [
      'Elegir una sola ruta posible según una condición',
      'Activar todas las rutas al mismo tiempo',
      'Repetir una tarea hasta que falle',
      'Unir dos pools distintos',
    ],
    correcta: 0,
    pista:
      'La XOR es la decisión clásica de «una cosa u otra». Si el saldo alcanza, se aprueba; si no, se rechaza. Solo una de las salidas recibe el token. Se dibuja como un rombo con una X y debe llevar una pregunta clara en cada salida.',
    explicacionOk:
      '<strong>Correcto.</strong> XOR elige exactamente un camino. Es la compuerta adecuada para condiciones mutuamente excluyentes, como «¿Datos completos? Sí / No».',
    explicacionFail:
      '<strong>Casi.</strong> Activar todas las rutas es propio de una compuerta paralela (AND). La XOR selecciona una sola salida según la condición evaluada.',
  },
  {
    id: 5,
    pregunta: 'Una compuerta <strong>paralela (AND)</strong> sirve para…',
    opciones: [
      'Activar varios caminos a la vez y luego sincronizarlos',
      'Elegir la ruta más corta',
      'Cancelar el proceso si hay un error',
      'Asignar una tarea a un rol',
    ],
    correcta: 0,
    pista:
      'AND se representa con un rombo y un signo «+». No pregunta nada: abre todas las ramas simultáneamente. Más adelante necesita otra compuerta AND que espere a que todas las ramas terminen antes de continuar. Es útil para tareas que ocurren en paralelo, como validar documentos y revisar antecedentes al mismo tiempo.',
    explicacionOk:
      '<strong>¡Eso es!</strong> AND abre varias rutas en paralelo y las sincroniza. No hay decisión: todas las ramas se ejecutan.',
    explicacionFail:
      '<strong>Incorrecto.</strong> La compuerta AND no elige caminos: los activa todos. La que elige una sola ruta es la XOR, y la que elige una o varias es la OR.',
  },
  {
    id: 6,
    pregunta: '¿Qué diferencia a una compuerta <strong>inclusiva (OR)</strong> de una exclusiva (XOR)?',
    opciones: [
      'La OR puede activar una o varias rutas; la XOR solo una',
      'La OR solo se usa en pools externos',
      'La XOR puede activar todas las rutas a la vez',
      'No hay ninguna diferencia práctica',
    ],
    correcta: 0,
    pista:
      'Piensa en una promoción: un cliente puede cumplir varias condiciones a la vez (ser socio y tener cupón), y entonces se activan varias rutas. Eso es OR. En XOR las condiciones son excluyentes: si se cumple una, las demás no se ejecutan. La OR se dibuja con una «O» dentro del rombo.',
    explicacionOk:
      '<strong>Exacto.</strong> OR activa una o varias rutas según las condiciones que se cumplan; XOR garantiza que solo una se ejecute.',
    explicacionFail:
      '<strong>Confusión habitual.</strong> La diferencia está en cuántas rutas pueden activarse: XOR solo una, OR una o varias. Ninguna de las dos activa siempre todas las rutas (eso sería AND).',
  },
  {
    id: 7,
    pregunta: '¿Para qué sirven los <strong>carriles (lanes)</strong> y los <strong>pools</strong>?',
    opciones: [
      'Para organizar actividades por rol, área o participante',
      'Para medir el tiempo de cada tarea',
      'Para ejecutar el modelo en un BPMS',
      'Para declarar variables del proceso',
    ],
    correcta: 0,
    pista:
      'Un pool representa a un participante u organización completa; un lane es una subdivisión interna para separar roles o departamentos. Su función es responder «¿quién hace qué?» y hacer visibles los handoffs entre áreas. No son un organigrama: el foco sigue siendo el flujo de trabajo.',
    explicacionOk:
      '<strong>Correcto.</strong> Pools y lanes ordenan responsabilidades. Ayudan a ver traspasos entre ventas, compras, finanzas o atención al cliente.',
    explicacionFail:
      '<strong>No.</strong> Los swimlanes no miden tiempos ni ejecutan el proceso: asignan responsabilidad visual a las actividades. Para tiempos y métricas se usan otras herramientas o la simulación.',
  },
  {
    id: 8,
    pregunta:
      'El proceso debe esperar 48 horas una respuesta y, si no llega, continuar. ¿Qué elemento BPMN lo modela?',
    opciones: [
      'Un evento intermedio con temporizador',
      'Una compuerta exclusiva con dos tareas',
      'Un pool adicional',
      'Una anotación de texto',
    ],
    correcta: 0,
    pista:
      'No es una tarea que alguien ejecuta: es una espera controlada por el tiempo. BPMN tiene eventos intermedios con símbolos específicos; el reloj representa un temporizador. Se coloca en el flujo y, cuando vence el plazo, el token continúa por la ruta prevista.',
    explicacionOk:
      '<strong>¡Muy bien!</strong> El evento intermedio con temporizador espera un plazo (48 horas) y luego continúa. Es la forma estándar de modelar esperas basadas en tiempo.',
    explicacionFail:
      '<strong>Casi.</strong> Una compuerta decide entre caminos, pero no espera por sí sola. Para una espera de 48 horas se usa un evento intermedio con temporizador.',
  },
  {
    id: 9,
    pregunta:
      'Si una validación falla y la solicitud debe volver a la tarea anterior, ¿cómo se modela?',
    opciones: [
      'Con un flujo de secuencia que regresa a la tarea anterior',
      'Con un flujo de mensaje hacia otro pool',
      'Con un evento de fin y nada más',
      'Con una anotación que diga «reprocesar»',
    ],
    correcta: 0,
    pista:
      'Un reproceso es un flujo que vuelve atrás dentro del mismo pool. Debe salir de la compuerta o de la tarea que detectó el fallo y regresar a la actividad que debe corregirse. Lo importante es que el lector vea claramente el bucle y la condición que lo activa.',
    explicacionOk:
      '<strong>Correcto.</strong> El reproceso se dibuja con un flujo de secuencia que regresa a la tarea anterior. Así queda explícito el bucle de corrección.',
    explicacionFail:
      '<strong>No es lo ideal.</strong> Una anotación no cambia el flujo. Para reprocesar se necesita un flujo de secuencia que vuelva a la tarea anterior, preferiblemente con la condición etiquetada.',
  },
  {
    id: 10,
    pregunta: '¿Qué aporta la <strong>simulación de tokens</strong> (Token Simulation)?',
    opciones: [
      'Permite verificar por dónde avanza el proceso y detectar errores',
      'Convierte el diagrama en una base de datos',
      'Asigna tareas automáticamente a los empleados',
      'Reemplaza la necesidad de documentar el proceso',
    ],
    correcta: 0,
    pista:
      'El token es la «ficha» que recorre el proceso. La simulación lo mueve paso a paso para comprobar que las compuertas, los bucles y los eventos de fin se comportan como esperas. Es una forma de probar el modelo antes de implementarlo o automatizarlo.',
    explicacionOk:
      '<strong>¡Exacto!</strong> La simulación de tokens valida el recorrido: muestra qué camino toma el proceso y ayuda a detectar compuertas mal conectadas o ramas sin salida.',
    explicacionFail:
      '<strong>No exactamente.</strong> La simulación no reemplaza la documentación ni asigna tareas reales: sirve para verificar el comportamiento del modelo moviendo un token por el flujo.',
  },
  {
    id: 11,
    pregunta: '¿Cuál es una buena práctica al dibujar compuertas y flujos?',
    opciones: [
      'Etiquetar cada salida y evitar cruces innecesarios de flujos',
      'Usar compuertas en todos los pasos, aunque no haya decisión',
      'Mezclar flujos de secuencia y de mensaje entre pools',
      'Ocultar el evento de inicio para simplificar',
    ],
    correcta: 0,
    pista:
      'Un diagrama debe poder leerse sin explicaciones adicionales. Cada salida de una compuerta necesita una condición clara («Sí», «No», «Monto > 1000»). Los flujos deben cruzarse lo mínimo posible y los pools no se conectan con flujos de secuencia, sino con flujos de mensaje.',
    explicacionOk:
      '<strong>Correcto.</strong> Etiquetar las salidas y cuidar el trazado hace que el diagrama sea comprensible y verificable. Menos cruces y nombres con verbos mejoran mucho la lectura.',
    explicacionFail:
      '<strong>Revisa las reglas.</strong> No se deben usar compuertas sin decisión real, ni mezclar secuencia y mensaje entre pools, ni ocultar el inicio. La buena práctica es etiquetar y mantener el flujo limpio.',
  },
  {
    id: 12,
    pregunta: '¿Para qué se usa un <strong>subproceso</strong> en BPMN?',
    opciones: [
      'Para encapsular varios pasos dentro de una actividad y reducir complejidad',
      'Para terminar el proceso antes de tiempo',
      'Para cambiar el color del diagrama',
      'Para crear un pool nuevo automáticamente',
    ],
    correcta: 0,
    pista:
      'Cuando un proceso tiene demasiados pasos, se agrupan en un subproceso: un rectángulo con un «+» en la parte inferior. El detalle puede mostrarse en otro diagrama. Así el flujo principal queda legible sin perder información.',
    explicacionOk:
      '<strong>¡Bien!</strong> El subproceso encapsula actividades y permite trabajar con distintos niveles de detalle. Es clave para no sobrecargar un diagrama.',
    explicacionFail:
      '<strong>No.</strong> Un subproceso no termina el proceso ni crea pools: agrupa pasos relacionados dentro de una actividad compuesta.',
  },
  {
    id: 13,
    pregunta: '¿Cuál es la diferencia entre un <strong>flujo de secuencia</strong> y un <strong>flujo de mensaje</strong>?',
    opciones: [
      'La secuencia ordena tareas dentro de un pool; el mensaje comunica pools distintos',
      'La secuencia es punteada y el mensaje es sólido',
      'Ambos se usan solo dentro del mismo carril',
      'El flujo de mensaje reemplaza a las compuertas',
    ],
    correcta: 0,
    pista:
      'Dentro de un mismo participante, las tareas se conectan con flechas sólidas: eso es el flujo de secuencia. Cuando dos organizaciones o pools distintos se comunican, se usa una línea punteada con flecha: el flujo de mensaje. Un flujo de secuencia nunca debe cruzar de un pool a otro.',
    explicacionOk:
      '<strong>Exacto.</strong> Secuencia = orden interno del pool (flecha sólida). Mensaje = comunicación entre participantes (línea punteada).',
    explicacionFail:
      '<strong>Ojo.</strong> Es al revés: la secuencia es sólida y el mensaje es punteado. Además, la secuencia no cruza pools; para eso está el flujo de mensaje.',
  },
  {
    id: 14,
    pregunta: '¿Cuándo conviene usar una <strong>compuerta basada en eventos</strong>?',
    opciones: [
      'Cuando el siguiente paso depende del primer evento que ocurra (mensaje o temporizador)',
      'Cuando hay que ejecutar todas las tareas en paralelo',
      'Cuando se quiere repetir una tarea exactamente tres veces',
      'Cuando se necesita asignar un rol a una tarea',
    ],
    correcta: 0,
    pista:
      'Imagina que el proceso espera dos cosas posibles: una respuesta del cliente o el vencimiento de un plazo. Lo que ocurra primero decide el camino. Eso no es una XOR normal, porque las opciones son eventos, no condiciones evaluadas por el proceso. La compuerta basada en eventos se dibuja como un rombo con un pentágono dentro.',
    explicacionOk:
      '<strong>¡Muy bien!</strong> La compuerta basada en eventos espera a que ocurra uno de varios eventos y continúa por la ruta del primero que llegue. Es habitual en esperas de mensajes o temporizadores.',
    explicacionFail:
      '<strong>No es esa.</strong> Para ejecutar todas las tareas a la vez se usa AND. La compuerta basada en eventos decide según el primer evento que ocurra, no según una condición fija.',
  },
]
