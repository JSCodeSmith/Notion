/* Apuntes interactivos: eventos nativos del navegador (onblur … onunload). */

const arbol = (label, detalle, hijos = []) => ({
  raiz: {
    label,
    detalle,
    hijos: hijos.map(([emoji, l, d]) => ({ emoji, label: l, detalle: d })),
  },
});

const analogia = (centro, nodos = [], nota = "") => ({
  centro,
  nota,
  nodos: nodos.map(([emoji, label, detalle]) => ({ emoji, label, detalle })),
});

const CODIGO_SINTAXIS = {
  blur: 'const campo = document.querySelector("#nombre");\n\ncampo.onblur = (evento) => {\n  console.log("Salió del campo", evento.target.value);\n};\n\n// Alternativa recomendada:\ncampo.addEventListener("blur", (evento) => {\n  console.log("blur", evento.target.value);\n});',
  click: 'const boton = document.querySelector("#enviar");\n\nboton.onclick = (evento) => {\n  console.log("click", evento.clientX, evento.clientY);\n};\n\nboton.addEventListener("click", (evento) => {\n  evento.preventDefault();\n});',
  keydown: 'document.addEventListener("keydown", (evento) => {\n  if (evento.key === "Escape") {\n    console.log("Cerrar el modal");\n  }\n});',
  keypress: '// ⚠️ Obsoleto: usa keydown\ncampo.onkeypress = (evento) => {\n  console.log(evento.key, evento.charCode);\n};',
  keyup: 'const campo = document.querySelector("#buscar");\n\ncampo.addEventListener("keyup", (evento) => {\n  console.log("Valor final:", evento.target.value);\n});',
  load: 'window.addEventListener("load", () => {\n  console.log("Página y recursos cargados");\n});\n\nimagen.addEventListener("load", () => {\n  console.log("Imagen lista");\n});',
  mouseout: 'const zona = document.querySelector("#zona");\n\nzona.addEventListener("mouseout", (evento) => {\n  console.log("Salida hacia", evento.relatedTarget);\n});',
  mouseover: 'const zona = document.querySelector("#zona");\n\nzona.addEventListener("mouseover", (evento) => {\n  console.log("Entrada en", evento.target);\n});',
  resize: 'window.addEventListener("resize", () => {\n  console.log(window.innerWidth, window.innerHeight);\n});',
  submit: 'const formulario = document.querySelector("#formulario");\n\nformulario.addEventListener("submit", (evento) => {\n  evento.preventDefault();\n  console.log("Datos listos para validar");\n});',
  unload: '// ⚠️ Obsoleto y poco fiable\nwindow.addEventListener("beforeunload", (evento) => {\n  evento.preventDefault();\n  evento.returnValue = "";\n});\n\nwindow.addEventListener("pagehide", () => {\n  console.log("La página pasa a segundo plano");\n});',
};

const DOCS = [
  /* ------------------------------------------------------------
     onblur
     ------------------------------------------------------------ */
  {
    id: "evn-onblur",
    titulo: "onblur",
    icon: "🔴",
    categoria: "Eventos nativos",
    firma: 'elemento.onblur = (evento) => { ... }',
    evento: "blur",
    definicion: [
      "`onblur` es el manejador del evento **blur**, que se dispara cuando un elemento **pierde el foco**: el usuario hace clic fuera, tabula a otro campo o cambia de ventana.",
    ],
    queEs: [
      "Es el evento complementario de `focus`: uno avisa cuando el elemento se activa y el otro cuando se desactiva.",
      "Se puede registrar como propiedad (`elemento.onblur`) o con `addEventListener(\"blur\", ...)`.",
      "El evento **no burbujea**; para delegar en un contenedor se usa `focusout`, que sí burbujea.",
      "Solo hay un `onblur` por elemento si se asigna como propiedad; con `addEventListener` puede haber varios.",
    ],
    paraQueSirve: [
      "Validar un campo cuando el usuario termina de escribirlo.",
      "Guardar borradores o sincronizar datos al abandonar un campo.",
      "Mostrar u ocultar mensajes de error sin esperar al envío.",
      "Cerrar menús o sugerencias al perder el foco.",
    ],
    comoFunciona: [
      "El elemento debe tener el foco (`focus`) previamente.",
      "Al pulsar fuera, tabular o cambiar de ventana, el navegador dispara `blur`.",
      "Se ejecuta el manejador asociado con un objeto `FocusEvent`.",
      "`evento.target` es el elemento que perdió el foco.",
      "El flujo continúa con el elemento que recibe el nuevo foco.",
    ],
    sintaxis: [
      { caption: "Como propiedad", code: 'campo.onblur = (evento) => {\n  console.log("Salió del campo", evento.target.value);\n};' },
      { caption: "Con addEventListener", code: 'campo.addEventListener("blur", (evento) => {\n  validar(evento.target);\n});' },
      { caption: "Equivalente en HTML", code: '<input id="nombre" onblur="validar(this)" />' },
    ],
    nota: 'Prefiere `addEventListener` y `focusout` si necesitas delegar. En HTML inline, `onblur` mezcla estructura y lógica y dificulta el mantenimiento.',
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Validar al salir del campo",
        descripcion: "El aviso aparece justo cuando el usuario abandona el input.",
        code: 'const correo = document.querySelector("#correo");\n\ncorreo.addEventListener("blur", (evento) => {\n  const valor = evento.target.value;\n  if (!valor.includes("@")) {\n    console.log("El correo no parece válido");\n  }\n});',
      },
      {
        titulo: "Ejemplo 2 · Guardar un borrador",
        descripcion: "Se guarda el valor final sin esperar al envío.",
        code: 'const nota = document.querySelector("#nota");\n\nnota.addEventListener("blur", (evento) => {\n  localStorage.setItem("borrador", evento.target.value);\n  console.log("Borrador guardado");\n});',
      },
      {
        titulo: "Ejemplo 3 · Diferencia con focusout",
        descripcion: "`blur` no burbujea; `focusout` sí.",
        code: 'const formulario = document.querySelector("#formulario");\n\n// No se entera de los blur de los hijos\nformulario.addEventListener("blur", () => {\n  console.log("blur en el formulario");\n});\n\n// Sí recibe los focusout de los hijos\nformulario.addEventListener("focusout", (evento) => {\n  console.log("Salió", evento.target.id);\n});',
      },
    ],
    errores: [
      {
        texto: "**Confiar en que `blur` burbujea**: no lo hace, así que un listener en el contenedor no se dispara al salir de un hijo.",
        code: '// ❌ No se dispara al salir de los inputs\ncontenedor.addEventListener("blur", manejar);\n\n// ✅ focusout sí burbujea\ncontenedor.addEventListener("focusout", manejar);',
      },
      {
        texto: "**Validar solo en blur y no al enviar**: el usuario puede enviar con Enter sin abandonar el campo.",
        code: '// ❌ El envío no valida el último campo\ncampo.addEventListener("blur", validar);\nformulario.addEventListener("submit", enviar);\n\n// ✅ Valida en ambos puntos\nformulario.addEventListener("submit", (evento) => {\n  evento.preventDefault();\n  validar(campo);\n});',
      },
    ],
    casos: [
      "Validación en tiempo real de correos y contraseñas.",
      "Guardado automático de borradores.",
      "Cerrar autocompletados al salir del buscador.",
      "Formatear un teléfono o una fecha al terminar de escribirlo.",
    ],
    relacion: [
      "**onfocus**: evento inverso, al recibir el foco.",
      "**onchange**: se dispara al cambiar el valor y perder el foco en inputs de texto.",
      "**focusout**: versión de blur que burbujea.",
      "**onsubmit**: validación final antes de enviar.",
      "**addEventListener**: forma recomendada de registrar el evento.",
    ],
    analogia:
      "Es el portero que revisa tu formulario justo cuando te levantas de la ventanilla. Mientras estás sentado no dice nada; en cuanto te vas, comprueba que no falte nada y te avisa. Si te vas sin levantarte (pulsas Enter), el portero no se entera: por eso también hay que validar al enviar.",
    analogiaDiagrama: analogia(
      "onblur",
      [
        ["🪑", "Foco", "El elemento estaba activo."],
        ["🚶", "Salida", "Clic fuera, Tab o cambio de ventana."],
        ["🔔", "Aviso", "Se ejecuta el manejador blur."],
        ["🚫", "No burbujea", "Para delegar usa focusout."],
      ],
      "blur avisa de la salida, pero no avisa a los padres.",
    ),
    relacionArbol: arbol("onblur", "Pérdida de foco", [
      ["🔴", "blur", "Se dispara al salir"],
      ["🟢", "focus", "Evento inverso"],
      ["🔁", "focusout", "Versión que burbujea"],
      ["✏️", "change", "Cambio de valor confirmado"],
      ["📨", "submit", "Validación final"],
    ]),
    quiz: [
      {
        id: 1,
        pregunta: "¿Cuándo se dispara `onblur`?",
        opciones: ["Cuando el elemento recibe el foco.", "Cuando el elemento pierde el foco.", "En cada pulsación de tecla.", "Al enviar un formulario."],
        correcta: 1,
        explicacion: "blur es la pérdida de foco; focus es la entrada.",
      },
      {
        id: 2,
        pregunta: "¿Qué evento burbujea y sirve para delegar la pérdida de foco?",
        opciones: ["blur", "focus", "focusout", "change"],
        correcta: 2,
        explicacion: "focusout es la versión burbujeante de blur.",
      },
      {
        id: 3,
        pregunta: "¿Cuántos manejadores `onblur` como propiedad admite un elemento?",
        opciones: ["Uno.", "Dos.", "Ilimitados.", "Ninguno."],
        correcta: 0,
        explicacion: "La propiedad solo guarda una función; addEventListener permite varios.",
      },
      {
        id: 4,
        pregunta: "¿Qué propiedad del evento indica el elemento que perdió el foco?",
        opciones: ["evento.target", "evento.detail", "evento.key", "evento.relatedTarget"],
        correcta: 0,
        explicacion: "target es el elemento que originó el evento.",
      },
    ],
    fuente: "MDN Web Docs – Element: blur event · HTMLElement: onblur · W3C UI Events – Focus Events",
  },

  /* ------------------------------------------------------------
     onclick
     ------------------------------------------------------------ */
  {
    id: "evn-onclick",
    titulo: "onclick",
    icon: "🖱️",
    categoria: "Eventos nativos",
    firma: 'elemento.onclick = (evento) => { ... }',
    evento: "click",
    definicion: [
      "`onclick` es el manejador del evento **click**, que se dispara cuando el usuario pulsa un elemento con el ratón o lo activa con el teclado (Enter o Espacio en un botón).",
    ],
    queEs: [
      "Es el evento de interacción más usado: botones, enlaces, tarjetas y menús.",
      "Admite dos formas: la propiedad `elemento.onclick` y `addEventListener(\"click\", ...)`.",
      "Un clic genera una secuencia: `mousedown`, `mouseup` y finalmente `click`.",
      "El objeto `MouseEvent` incluye coordenadas, botón pulsado y modificadores.",
    ],
    paraQueSirve: [
      "Ejecutar una acción al pulsar un botón.",
      "Abrir y cerrar menús, modales o acordeones.",
      "Navegar o cambiar de vista sin recargar.",
      "Delegar clics de listas dinámicas en un contenedor.",
    ],
    comoFunciona: [
      "El usuario pulsa el botón principal del ratón (o activa con teclado).",
      "El navegador dispara `mousedown` y `mouseup` sobre el elemento.",
      "Si ambos ocurren sobre el mismo elemento, dispara `click`.",
      "El evento burbujea desde el objetivo hasta el documento.",
      "Se ejecutan los manejadores en orden de registro.",
    ],
    sintaxis: [
      { caption: "Como propiedad", code: 'boton.onclick = (evento) => {\n  console.log("Pulsado", evento.clientX, evento.clientY);\n};' },
      { caption: "Con addEventListener", code: 'boton.addEventListener("click", (evento) => {\n  evento.preventDefault();\n});' },
      { caption: "Delegación", code: 'lista.addEventListener("click", (evento) => {\n  const boton = evento.target.closest("button");\n  if (boton) console.log("Pulsado", boton.dataset.id);\n});' },
    ],
    nota: "En enlaces, llama a `evento.preventDefault()` si quieres evitar la navegación. Para lógica grande, prefiere `addEventListener` y no mezcles JavaScript en el atributo HTML.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Contar clics",
        descripcion: "Cada pulsación suma uno.",
        code: 'let clics = 0;\nconst boton = document.querySelector("#boton");\n\nboton.addEventListener("click", () => {\n  clics++;\n  console.log("Clics:", clics);\n});',
      },
      {
        titulo: "Ejemplo 2 · Leer las coordenadas",
        descripcion: "Las coordenadas son relativas al viewport.",
        code: 'boton.addEventListener("click", (evento) => {\n  console.log(evento.clientX, evento.clientY);\n  console.log("Botón:", evento.button);\n  console.log("Shift:", evento.shiftKey);\n});',
      },
      {
        titulo: "Ejemplo 3 · Delegación de eventos",
        descripcion: "Un solo listener sirve para botones creados después.",
        code: 'const lista = document.querySelector("#lista");\n\nlista.addEventListener("click", (evento) => {\n  const boton = evento.target.closest("button[data-id]");\n  if (!boton) return;\n  console.log("Eliminar", boton.dataset.id);\n});',
      },
    ],
    errores: [
      {
        texto: "**Asignar varias veces `onclick`**: la última asignación sobrescribe las anteriores.",
        code: '// ❌ Solo se ejecuta el segundo\nboton.onclick = primera;\nboton.onclick = segunda;\n\n// ✅ Se ejecutan ambos\nboton.addEventListener("click", primera);\nboton.addEventListener("click", segunda);',
      },
      {
        texto: "**Usar onclick inline para lógica compleja**: mezcla HTML y JavaScript y complica el mantenimiento.",
        code: '<!-- ❌ -->\n<button onclick="guardarYEnviarTodo()">Enviar</button>\n\n<!-- ✅ -->\n<button id="enviar">Enviar</button>\n<script>\ndocument.querySelector("#enviar").addEventListener("click", guardarYEnviarTodo);\n</script>',
      },
    ],
    casos: [
      "Botones de acción: guardar, eliminar, enviar.",
      "Menús desplegables y modales.",
      "Tarjetas que abren un detalle.",
      "Listas dinámicas con delegación de eventos.",
    ],
    relacion: [
      "**addEventListener**: permite varios manejadores y opciones.",
      "**onmousedown / onmouseup**: fases previas al clic.",
      "**preventDefault**: evita la acción por defecto de enlaces y botones de envío.",
      "**stopPropagation**: evita que el clic llegue a los padres.",
      "**event.target / currentTarget**: quién originó el evento y quién escucha.",
    ],
    analogia:
      "Es el timbre de una casa: el visitante lo pulsa (clic) y suena la misma canción para quien esté dentro. Puedes tener varios timbres conectados al mismo botón (addEventListener) o cambiar la canción (onclick): si cambias la canción, la anterior deja de sonar.",
    analogiaDiagrama: analogia(
      "onclick",
      [
        ["👆", "Pulsación", "Ratón o activación por teclado."],
        ["🔔", "click", "Se dispara al completar la pulsación."],
        ["🫧", "Burbujeo", "Asciende hasta el documento."],
        ["📦", "MouseEvent", "Coordenadas, botón y modificadores."],
      ],
      "Un clic es una pulsación completa, no solo el momento de bajar el dedo.",
    ),
    relacionArbol: arbol("onclick", "Pulsación completa", [
      ["⬇️", "mousedown", "Baja el botón"],
      ["⬆️", "mouseup", "Sube el botón"],
      ["🖱️", "click", "Se completa la pulsación"],
      ["🎧", "addEventListener", "Varios manejadores"],
      ["🫧", "Delegación", "Escuchar en un contenedor"],
    ]),
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué eventos forman un clic completo?",
        opciones: ["keydown y keyup", "mousedown, mouseup y click", "focus y blur", "load y unload"],
        correcta: 1,
        explicacion: "click se dispara después de mousedown y mouseup sobre el mismo elemento.",
      },
      {
        id: 2,
        pregunta: "¿Qué ocurre al asignar `onclick` dos veces?",
        opciones: ["Se ejecutan los dos.", "Solo queda el último.", "Lanza un error.", "Se ejecutan en orden inverso."],
        correcta: 1,
        explicacion: "La propiedad guarda una sola función; la segunda reemplaza a la primera.",
      },
      {
        id: 3,
        pregunta: "¿Qué método evita que un enlace navegue?",
        opciones: ["event.stopPropagation()", "event.preventDefault()", "event.stop()", "event.cancel()"],
        correcta: 1,
        explicacion: "preventDefault cancela la acción por defecto del navegador.",
      },
      {
        id: 4,
        pregunta: "¿Para qué sirve la delegación de eventos?",
        opciones: [
          "Para escuchar clics de muchos hijos con un solo listener.",
          "Para impedir el burbujeo.",
          "Para duplicar eventos.",
          "Para cargar imágenes.",
        ],
        correcta: 0,
        explicacion: "El contenedor recibe los clics de sus hijos y decide cuál los originó.",
      },
    ],
    fuente: "MDN Web Docs – Element: click event · HTMLElement: onclick · W3C UI Events – Mouse Events",
  },

  /* ------------------------------------------------------------
     onkeydown
     ------------------------------------------------------------ */
  {
    id: "evn-onkeydown",
    titulo: "onkeydown",
    icon: "⌨️",
    categoria: "Eventos nativos",
    firma: 'document.addEventListener("keydown", (evento) => { ... })',
    evento: "keydown",
    definicion: [
      "`onkeydown` se dispara en el momento en que el usuario **pulsa una tecla**, antes de que el carácter se inserte en el campo.",
    ],
    queEs: [
      "Es el evento de teclado más útil para atajos y control fino.",
      "Se repite automáticamente mientras la tecla permanece pulsada (`evento.repeat`).",
      "`evento.key` devuelve el nombre lógico de la tecla; `evento.code` la posición física.",
      "Se puede cancelar con `preventDefault()` para bloquear caracteres o atajos del navegador.",
    ],
    paraQueSirve: [
      "Detectar atajos como Escape, Enter o Ctrl + K.",
      "Bloquear caracteres no permitidos en un campo.",
      "Mover un personaje en un juego.",
      "Navegar con el teclado en menús y modales.",
    ],
    comoFunciona: [
      "El usuario pulsa una tecla y el navegador dispara `keydown` sobre el elemento enfocado.",
      "El evento burbujea hasta el documento.",
      "Si no se cancela, el navegador procesa la tecla y puede generar `keypress` (obsoleto) y después `keyup`.",
      "Mientras la tecla siga pulsada, se repiten `keydown` con `repeat: true`.",
      "Al soltarla se dispara `keyup`.",
    ],
    sintaxis: [
      { caption: "Atajo global", code: 'document.addEventListener("keydown", (evento) => {\n  if (evento.key === "Escape") {\n    cerrarModal();\n  }\n});' },
      { caption: "Bloquear un carácter", code: 'campo.addEventListener("keydown", (evento) => {\n  if (evento.key === "e") evento.preventDefault();\n});' },
      { caption: "Como propiedad", code: 'campo.onkeydown = (evento) => {\n  console.log(evento.key, evento.code);\n};' },
    ],
    nota: "No uses `evento.keyCode`: está obsoleto y varía entre navegadores. Usa `evento.key` para el carácter y `evento.code` para la tecla física.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Cerrar con Escape",
        descripcion: "El atajo funciona esté donde esté el foco.",
        code: 'document.addEventListener("keydown", (evento) => {\n  if (evento.key === "Escape") {\n    console.log("Cerrar modal");\n  }\n});',
      },
      {
        titulo: "Ejemplo 2 · Detectar repetición",
        descripcion: "`repeat` evita disparar acciones múltiples al mantener pulsada.",
        code: 'document.addEventListener("keydown", (evento) => {\n  if (evento.repeat) return;\n  console.log("Primera pulsación de", evento.key);\n});',
      },
      {
        titulo: "Ejemplo 3 · Enter para enviar",
        descripcion: "Se puede interceptar Enter en un campo de búsqueda.",
        code: 'buscador.addEventListener("keydown", (evento) => {\n  if (evento.key === "Enter") {\n    evento.preventDefault();\n    buscar(buscador.value);\n  }\n});',
      },
    ],
    errores: [
      {
        texto: "**Usar `keyCode`**: está obsoleto y no es fiable entre plataformas.",
        code: '// ❌\nif (evento.keyCode === 27) cerrar();\n\n// ✅\nif (evento.key === "Escape") cerrar();',
      },
      {
        texto: "**Ignorar `repeat`**: mantener la tecla pulsada puede lanzar la acción decenas de veces.",
        code: '// ❌ Se repite mientras mantienes la tecla\ndocument.addEventListener("keydown", () => disparar());\n\n// ✅\nif (!evento.repeat) disparar();',
      },
    ],
    casos: [
      "Atajos de teclado y comandos rápidos.",
      "Controles de videojuegos.",
      "Validación o bloqueo de caracteres.",
      "Navegación accesible en menús y modales.",
    ],
    relacion: [
      "**onkeyup**: se dispara al soltar la tecla.",
      "**onkeypress**: obsoleto, solo caracteres imprimibles.",
      "**preventDefault**: impide la acción por defecto.",
      "**event.key / code**: identifican la tecla.",
      "**addEventListener**: permite varios manejadores.",
    ],
    analogia:
      "Es el momento en que el pianista baja la tecla: la nota aún no ha sonado, pero ya sabes qué tecla es. Si mantienes el dedo, la nota se repite. Puedes detener la mano del pianista (preventDefault) antes de que llegue al teclado.",
    analogiaDiagrama: analogia(
      "onkeydown",
      [
        ["⬇️", "Tecla abajo", "Se dispara antes del carácter."],
        ["🔁", "repeat", "Se repite si mantienes pulsado."],
        ["🛑", "preventDefault", "Bloquea la acción por defecto."],
        ["🔤", "key / code", "Identifican la tecla."],
      ],
      "keydown es el momento ideal para atajos y bloqueos.",
    ),
    relacionArbol: arbol("onkeydown", "Tecla pulsada", [
      ["⌨️", "keydown", "Baja la tecla"],
      ["🔤", "key / code", "Qué tecla se pulsó"],
      ["🔁", "repeat", "Repetición automática"],
      ["⬆️", "keyup", "Al soltar"],
      ["🛑", "preventDefault", "Cancela el comportamiento"],
    ]),
    quiz: [
      {
        id: 1,
        pregunta: "¿Cuándo se dispara `keydown`?",
        opciones: ["Al soltar la tecla.", "Al pulsar la tecla, antes del carácter.", "Solo con letras.", "Al enviar un formulario."],
        correcta: 1,
        explicacion: "keydown ocurre al bajar la tecla, antes de insertar el carácter.",
      },
      {
        id: 2,
        pregunta: "¿Qué propiedad avisa de que la tecla se mantiene pulsada?",
        opciones: ["evento.repeat", "evento.held", "evento.again", "evento.pressed"],
        correcta: 0,
        explicacion: "repeat es true en las repeticiones automáticas.",
      },
      {
        id: 3,
        pregunta: "¿Qué propiedad es la recomendada para saber qué tecla se pulsó?",
        opciones: ["evento.keyCode", "evento.which", "evento.key", "evento.char"],
        correcta: 2,
        explicacion: "evento.key es el estándar actual; keyCode y which están obsoletos.",
      },
      {
        id: 4,
        pregunta: "¿Cómo evitas que una tecla escriba en el campo?",
        opciones: ["evento.stopPropagation()", "evento.preventDefault()", "return false en CSS", "evento.cancel()"],
        correcta: 1,
        explicacion: "preventDefault cancela la acción por defecto del navegador.",
      },
    ],
    fuente: "MDN Web Docs – Element: keydown event · KeyboardEvent.key · W3C UI Events – Keyboard Events",
  },

  /* ------------------------------------------------------------
     onkeypress
     ------------------------------------------------------------ */
  {
    id: "evn-onkeypress",
    titulo: "onkeypress",
    icon: "⌨️",
    categoria: "Eventos nativos",
    firma: 'elemento.onkeypress = (evento) => { ... }',
    evento: "keypress",
    obsoleto: true,
    definicion: [
      "`onkeypress` es el manejador del evento **keypress**, que se disparaba al producirse un carácter imprimible. Está **obsoleto (deprecated)** y no debe usarse en código nuevo.",
    ],
    queEs: [
      "Solo se disparaba con caracteres que generan texto: letras, números y algunos signos.",
      "No se disparaba con Shift, Ctrl, Alt, flechas, Escape ni teclas de función.",
      "No distinguía bien entre teclados y métodos de entrada (IME).",
      "Hoy se sustituye por `keydown` y, si hace falta, por el evento `input`.",
    ],
    paraQueSirve: [
      "Mantener código antiguo que aún depende de él.",
      "Detectar caracteres imprimibles en navegadores muy antiguos.",
      "Contexto histórico: entender por qué existe `charCode`.",
      "Nada nuevo: en código moderno se usa `keydown` o `beforeinput`.",
    ],
    comoFunciona: [
      "El navegador recibía la pulsación y determinaba si producía un carácter.",
      "Si era imprimible, disparaba `keypress` después de `keydown`.",
      "El evento incluía `charCode` con el código del carácter.",
      "No se disparaba en teclas de control ni en combinaciones sin texto.",
      "Al soltar la tecla se disparaba `keyup`.",
    ],
    sintaxis: [
      { caption: "Forma histórica", code: 'campo.onkeypress = (evento) => {\n  console.log(evento.key, evento.charCode);\n};' },
      { caption: "Alternativa moderna", code: 'campo.addEventListener("keydown", (evento) => {\n  console.log(evento.key);\n});' },
      { caption: "Para el texto resultante", code: 'campo.addEventListener("input", (evento) => {\n  console.log(evento.target.value);\n});' },
    ],
    nota: "⚠️ `onkeypress` está obsoleto. No se dispara con teclas de control y su comportamiento con IME es inconsistente. Usa `keydown` para teclas y `input` para el texto.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Comportamiento limitado",
        descripcion: "Shift y las flechas no generan keypress.",
        code: 'campo.addEventListener("keypress", (evento) => {\n  console.log("keypress", evento.key);\n});\n\n// Shift, Ctrl, Alt, flechas y Escape no aparecen.',
      },
      {
        titulo: "Ejemplo 2 · Migrar a keydown",
        descripcion: "La misma idea con el evento recomendado.",
        code: '// ❌ Antiguo\ncampo.onkeypress = (evento) => registrar(evento.key);\n\n// ✅ Moderno\ncampo.addEventListener("keydown", (evento) => {\n  registrar(evento.key);\n});',
      },
      {
        titulo: "Ejemplo 3 · Escuchar el texto final",
        descripcion: "`input` refleja el valor real, incluido pegado y dictado.",
        code: 'campo.addEventListener("input", (evento) => {\n  console.log("Valor actual:", evento.target.value);\n});',
      },
    ],
    errores: [
      {
        texto: "**Usar keypress para atajos**: no detecta Shift, Ctrl, Alt ni flechas.",
        code: '// ❌ No funciona con Escape\ncampo.addEventListener("keypress", (evento) => {\n  if (evento.key === "Escape") cerrar();\n});\n\n// ✅\ndocument.addEventListener("keydown", (evento) => {\n  if (evento.key === "Escape") cerrar();\n});',
      },
      {
        texto: "**Confiar en charCode**: está obsoleto y no cubre todos los caracteres Unicode.",
        code: "// ❌\nconst letra = String.fromCharCode(evento.charCode);\n\n// ✅\nconst letra = evento.key;",
      },
    ],
    casos: [
      "Mantenimiento de aplicaciones antiguas.",
      "Detección de caracteres imprimibles en código legado.",
      "Estudio de diferencias entre eventos de teclado.",
      "Migración progresiva hacia `keydown` e `input`.",
    ],
    relacion: [
      "**onkeydown**: evento moderno para cualquier tecla.",
      "**onkeyup**: se dispara al soltar.",
      "**input**: cambio real del valor del campo.",
      "**beforeinput**: permite interceptar la edición antes de aplicarla.",
      "**charCode**: propiedad obsoleta asociada a keypress.",
    ],
    analogia:
      "Es un detector antiguo que solo reconoce letras escritas en una máquina de escribir. Si pulsas Shift o una flecha, no lo detecta. Hoy usamos un detector que reconoce todas las teclas (keydown) y otro que lee el texto final del papel (input).",
    analogiaDiagrama: analogia(
      "onkeypress",
      [
        ["🔤", "Solo imprimibles", "Letras, números y signos."],
        ["🚫", "Teclas de control", "Shift, Ctrl, flechas: no se detectan."],
        ["⚠️", "Obsoleto", "No usar en código nuevo."],
        ["✅", "Alternativas", "keydown e input."],
      ],
      "keypress es historia: útil para leer código viejo, no para escribirlo.",
    ),
    relacionArbol: arbol("onkeypress", "Evento obsoleto", [
      ["🔤", "Carácter imprimible", "Solo texto"],
      ["🔢", "charCode", "Código del carácter"],
      ["⬇️", "keydown", "Sustituto moderno"],
      ["📝", "input", "Texto resultante"],
      ["⚠️", "Obsoleto", "Evitarlo en código nuevo"],
    ]),
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué estado tiene `onkeypress` hoy?",
        opciones: ["Recomendado.", "Obsoleto (deprecated).", "Experimental.", "Solo para móviles."],
        correcta: 1,
        explicacion: "keypress está obsoleto y no se recomienda su uso.",
      },
      {
        id: 2,
        pregunta: "¿Con qué teclas NO se dispara keypress?",
        opciones: ["Letras.", "Números.", "Shift y flechas.", "Signos de puntuación."],
        correcta: 2,
        explicacion: "Solo se dispara con caracteres imprimibles, no con teclas de control.",
      },
      {
        id: 3,
        pregunta: "¿Qué evento moderno sustituye a keypress para atajos?",
        opciones: ["keyup", "keydown", "click", "change"],
        correcta: 1,
        explicacion: "keydown detecta cualquier tecla, incluidas las de control.",
      },
      {
        id: 4,
        pregunta: "¿Qué evento refleja el texto final del campo, incluido pegado?",
        opciones: ["keypress", "keydown", "input", "focus"],
        correcta: 2,
        explicacion: "input se dispara cuando el valor cambia, sin importar cómo.",
      },
    ],
    fuente: "MDN Web Docs – Element: keypress event (deprecated) · UI Events – Legacy key events · MDN – Input event",
  },

  /* ------------------------------------------------------------
     onkeyup
     ------------------------------------------------------------ */
  {
    id: "evn-onkeyup",
    titulo: "onkeyup",
    icon: "⌨️",
    categoria: "Eventos nativos",
    firma: 'elemento.onkeyup = (evento) => { ... }',
    evento: "keyup",
    definicion: [
      "`onkeyup` se dispara cuando el usuario **suelta una tecla**, después de que el carácter ya se haya insertado en el campo.",
    ],
    queEs: [
      "Es el último evento de la secuencia de teclado: `keydown` → `keypress` (obsoleto) → `keyup`.",
      "En el momento de `keyup`, `evento.target.value` ya incluye el carácter escrito.",
      "Se repite solo si la tecla se mantiene pulsada y se suelta, no durante la pulsación.",
      "No se puede cancelar el carácter con `preventDefault()` porque ya se insertó.",
    ],
    paraQueSirve: [
      "Leer el valor final de un campo tras escribir.",
      "Validar justo después de soltar una tecla.",
      "Detectar cuándo el usuario termina una combinación.",
      "Implementar búsquedas mientras se escribe (junto con debounce).",
    ],
    comoFunciona: [
      "El usuario suelta la tecla.",
      "El navegador dispara `keyup` sobre el elemento enfocado.",
      "El valor del campo ya contiene el carácter (si era imprimible).",
      "El evento burbujea hasta el documento.",
      "`evento.key` indica qué tecla se soltó.",
    ],
    sintaxis: [
      { caption: "Como propiedad", code: 'campo.onkeyup = (evento) => {\n  console.log("Soltaste", evento.key);\n};' },
      { caption: "Con addEventListener", code: 'campo.addEventListener("keyup", (evento) => {\n  console.log("Valor final:", evento.target.value);\n});' },
      { caption: "Búsqueda con debounce", code: 'let temporizador;\ncampo.addEventListener("keyup", () => {\n  clearTimeout(temporizador);\n  temporizador = setTimeout(() => buscar(campo.value), 300);\n});' },
    ],
    nota: "Para saber qué se escribió, `input` suele ser mejor que `keyup`: también cubre pegado, dictado y autocompletado.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Valor final del campo",
        descripcion: "El carácter ya está en el input.",
        code: 'campo.addEventListener("keyup", (evento) => {\n  console.log("Valor:", evento.target.value);\n});',
      },
      {
        titulo: "Ejemplo 2 · Comparar con keydown",
        descripcion: "En keydown el valor aún no incluye el carácter nuevo.",
        code: 'campo.addEventListener("keydown", () => {\n  console.log("keydown:", campo.value);\n});\n\ncampo.addEventListener("keyup", () => {\n  console.log("keyup:", campo.value);\n});',
      },
      {
        titulo: "Ejemplo 3 · Búsqueda con retardo",
        descripcion: "No se busca en cada tecla, sino cuando el usuario deja de escribir.",
        code: 'let espera;\n\ncampo.addEventListener("keyup", () => {\n  clearTimeout(espera);\n  espera = setTimeout(() => {\n    console.log("Buscar:", campo.value);\n  }, 300);\n});',
      },
    ],
    errores: [
      {
        texto: "**Intentar bloquear el carácter en keyup**: ya se insertó.",
        code: '// ❌ No evita que la letra aparezca\ncampo.addEventListener("keyup", (evento) => {\n  if (evento.key === "e") evento.preventDefault();\n});\n\n// ✅ Bloquéalo en keydown\ncampo.addEventListener("keydown", (evento) => {\n  if (evento.key === "e") evento.preventDefault();\n});',
      },
      {
        texto: "**Buscar en cada keyup sin debounce**: se lanzan demasiadas peticiones.",
        code: '// ❌ Una petición por tecla\ncampo.addEventListener("keyup", () => buscar(campo.value));\n\n// ✅ Con debounce\nlet t;\ncampo.addEventListener("keyup", () => {\n  clearTimeout(t);\n  t = setTimeout(() => buscar(campo.value), 300);\n});',
      },
    ],
    casos: [
      "Validación posterior a la escritura.",
      "Búsquedas con retardo (debounce).",
      "Detectar el final de una combinación de teclas.",
      "Contar caracteres restantes.",
    ],
    relacion: [
      "**onkeydown**: se dispara al bajar la tecla.",
      "**onkeypress**: obsoleto, entre ambos.",
      "**input**: cambio del valor, más completo que keyup.",
      "**debounce**: evita ejecutar en cada tecla.",
      "**event.key**: identifica la tecla soltada.",
    ],
    analogia:
      "Es el momento en que el pianista levanta el dedo: la nota ya sonó y ya está en la partitura. Puedes leer lo escrito, pero ya no puedes impedir que se escriba; para eso tendrías que haber actuado al bajar la tecla.",
    analogiaDiagrama: analogia(
      "onkeyup",
      [
        ["⬆️", "Tecla arriba", "El carácter ya se insertó."],
        ["📖", "Valor final", "Se puede leer el campo completo."],
        ["⏱️", "Debounce", "Evita buscar en cada tecla."],
        ["🚫", "Ya no cancela", "preventDefault llega tarde."],
      ],
      "keyup sirve para reaccionar, no para impedir.",
    ),
    relacionArbol: arbol("onkeyup", "Tecla liberada", [
      ["⌨️", "keyup", "Se dispara al soltar"],
      ["📖", "target.value", "Incluye el carácter nuevo"],
      ["⏱️", "Debounce", "Retrasa la reacción"],
      ["⬇️", "keydown", "Para bloquear caracteres"],
      ["📝", "input", "Alternativa más completa"],
    ]),
    quiz: [
      {
        id: 1,
        pregunta: "¿Cuándo se dispara `keyup`?",
        opciones: ["Al pulsar la tecla.", "Al soltar la tecla.", "Al enviar el formulario.", "Al perder el foco."],
        correcta: 1,
        explicacion: "keyup ocurre al liberar la tecla.",
      },
      {
        id: 2,
        pregunta: "En `keyup`, ¿el valor del campo incluye el carácter recién escrito?",
        opciones: ["Sí.", "No, llega en el siguiente evento.", "Solo con números.", "Depende del navegador."],
        correcta: 0,
        explicacion: "El carácter ya se insertó antes de keyup.",
      },
      {
        id: 3,
        pregunta: "¿Por qué no se puede bloquear un carácter en keyup?",
        opciones: ["Porque el evento no existe.", "Porque el carácter ya se insertó.", "Porque keyup no burbujea.", "Porque es obsoleto."],
        correcta: 1,
        explicacion: "Para bloquear hay que actuar en keydown o beforeinput.",
      },
      {
        id: 4,
        pregunta: "¿Qué técnica evita lanzar una búsqueda por cada tecla?",
        opciones: ["Debounce.", "preventDefault.", "stopPropagation.", "focusout."],
        correcta: 0,
        explicacion: "Debounce espera un tiempo antes de ejecutar la acción.",
      },
    ],
    fuente: "MDN Web Docs – Element: keyup event · KeyboardEvent · JavaScript.info – Keyboard events",
  },

  /* ------------------------------------------------------------
     onload
     ------------------------------------------------------------ */
  {
    id: "evn-onload",
    titulo: "onload",
    icon: "🚀",
    categoria: "Eventos nativos",
    firma: 'window.addEventListener("load", (evento) => { ... })',
    evento: "load",
    definicion: [
      "`onload` se dispara cuando la página y **todos sus recursos** (imágenes, estilos, scripts) han terminado de cargarse.",
    ],
    queEs: [
      "Se puede escuchar en `window` para la página completa, o en elementos como `img`, `iframe` o `link`.",
      "Es distinto de `DOMContentLoaded`, que ocurre antes, cuando el HTML está parseado pero sin esperar recursos.",
      "Se dispara una sola vez por carga de documento.",
      "En scripts modernos se prefiere `defer` o ejecutar al final del body en lugar de esperar `load`.",
    ],
    paraQueSirve: [
      "Medir el tiempo real de carga de una página.",
      "Ejecutar código que necesita imágenes ya cargadas.",
      "Ocultar un indicador de carga inicial.",
      "Inicializar librerías que dependen de recursos externos.",
    ],
    comoFunciona: [
      "El navegador descarga y parsea el HTML.",
      "Se dispara `DOMContentLoaded` cuando el DOM está listo.",
      "Se siguen cargando imágenes, estilos y otros recursos.",
      "Cuando todo termina, `window` dispara `load`.",
      "Si un recurso falla, `load` puede no esperar indefinidamente.",
    ],
    sintaxis: [
      { caption: "Página completa", code: 'window.addEventListener("load", () => {\n  console.log("Todo cargado");\n});' },
      { caption: "Una imagen", code: 'const imagen = document.querySelector("img");\n\nimagen.addEventListener("load", () => {\n  console.log("Imagen lista", imagen.naturalWidth);\n});' },
      { caption: "Como propiedad", code: 'window.onload = () => {\n  console.log("Carga completada");\n};' },
    ],
    nota: "`load` espera a todos los recursos: puede tardar mucho en páginas con imágenes pesadas. Si solo necesitas el DOM, usa `DOMContentLoaded`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Indicador de carga",
        descripcion: "Se oculta cuando todo está listo.",
        code: 'window.addEventListener("load", () => {\n  document.querySelector("#cargando").hidden = true;\n  console.log("Página lista");\n});',
      },
      {
        titulo: "Ejemplo 2 · DOMContentLoaded frente a load",
        descripcion: "El DOM está listo antes que los recursos.",
        code: 'document.addEventListener("DOMContentLoaded", () => {\n  console.log("DOM listo");\n});\n\nwindow.addEventListener("load", () => {\n  console.log("Recursos listos");\n});',
      },
      {
        titulo: "Ejemplo 3 · Imagen cargada",
        descripcion: "Permite leer dimensiones reales.",
        code: 'const imagen = document.querySelector("#foto");\n\nimagen.addEventListener("load", () => {\n  console.log(imagen.naturalWidth, imagen.naturalHeight);\n});',
      },
    ],
    errores: [
      {
        texto: "**Usar load para todo**: retrasa la interactividad hasta que carguen imágenes y anuncios.",
        code: '// ❌ Demasiado tarde para inicializar la UI\nwindow.addEventListener("load", iniciarUI);\n\n// ✅ En cuanto el DOM está listo\ndocument.addEventListener("DOMContentLoaded", iniciarUI);',
      },
      {
        texto: "**Asignar `window.onload` dos veces**: el segundo reemplaza al primero.",
        code: '// ❌ Solo uno sobrevive\nwindow.onload = primera;\nwindow.onload = segunda;\n\n// ✅\nwindow.addEventListener("load", primera);\nwindow.addEventListener("load", segunda);',
      },
    ],
    casos: [
      "Pantallas de carga iniciales.",
      "Métricas de rendimiento de la página.",
      "Inicializar visores de imágenes o mapas.",
      "Ejecutar código que necesita recursos ya disponibles.",
    ],
    relacion: [
      "**DOMContentLoaded**: DOM listo, sin esperar recursos.",
      "**onunload**: evento opuesto al final de la vida de la página.",
      "**defer / async**: alternativas para scripts.",
      "**img.onload**: carga de una imagen concreta.",
      "**Performance API**: medición precisa de la carga.",
    ],
    analogia:
      "Es el aviso de “mesa preparada” en un restaurante: no basta con que la mesa esté puesta (DOMContentLoaded), hay que esperar a que también lleguen los platos y las bebidas (imágenes y estilos). Hasta entonces, el camarero no te deja sentarte.",
    analogiaDiagrama: analogia(
      "onload",
      [
        ["📄", "HTML parseado", "Primero ocurre DOMContentLoaded."],
        ["🖼️", "Recursos", "Imágenes, CSS y scripts."],
        ["🚀", "load", "Todo terminó de cargar."],
        ["⏳", "Espera", "Puede tardar si hay recursos pesados."],
      ],
      "load es el final de la carga, no el inicio de la interacción.",
    ),
    relacionArbol: arbol("onload", "Carga completa", [
      ["📄", "DOMContentLoaded", "Antes, solo el DOM"],
      ["🖼️", "Recursos", "Imágenes y estilos"],
      ["🚀", "load", "Todo listo"],
      ["🖼️", "img.onload", "Carga de una imagen"],
      ["🚪", "onunload", "Salida de la página"],
    ]),
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué espera el evento `load` de window?",
        opciones: ["Solo el HTML.", "El DOM y todos los recursos.", "Solo las imágenes.", "La interacción del usuario."],
        correcta: 1,
        explicacion: "load espera a que terminen de cargar todos los recursos.",
      },
      {
        id: 2,
        pregunta: "¿Qué evento ocurre antes?",
        opciones: ["load", "DOMContentLoaded", "unload", "resize"],
        correcta: 1,
        explicacion: "DOMContentLoaded se dispara cuando el HTML está parseado.",
      },
      {
        id: 3,
        pregunta: "¿Qué ocurre si asignas `window.onload` dos veces?",
        opciones: ["Se ejecutan ambas.", "Solo queda la segunda.", "Lanza un error.", "Se ejecutan en orden inverso."],
        correcta: 1,
        explicacion: "La propiedad solo guarda una función; addEventListener permite varias.",
      },
      {
        id: 4,
        pregunta: "¿Qué evento de una imagen avisa de que ya cargó?",
        opciones: ["img.load", "img.ready", "img.onload", "img.done"],
        correcta: 2,
        explicacion: "img.onload o addEventListener(\"load\") en la imagen.",
      },
    ],
    fuente: "MDN Web Docs – Window: load event · DOMContentLoaded · HTML Living Standard – Loading",
  },

  /* ------------------------------------------------------------
     onmouseout
     ------------------------------------------------------------ */
  {
    id: "evn-onmouseout",
    titulo: "onmouseout",
    icon: "🚪",
    categoria: "Eventos nativos",
    firma: 'elemento.onmouseout = (evento) => { ... }',
    evento: "mouseout",
    definicion: [
      "`onmouseout` se dispara cuando el puntero **sale de un elemento**, incluso si entra en uno de sus hijos.",
    ],
    queEs: [
      "Es el opuesto de `mouseover`.",
      "Burbujea, así que se puede delegar en un contenedor.",
      "Se dispara también al pasar de un padre a un hijo, lo que suele sorprender.",
      "Para detectar solo la salida del contenedor se usa `mouseleave`, que no se dispara con los hijos.",
    ],
    paraQueSirve: [
      "Ocultar un menú o tooltip al sacar el cursor.",
      "Quitar un efecto hover personalizado.",
      "Guardar el estado al abandonar una zona.",
      "Delegar salidas de muchos elementos desde un contenedor.",
    ],
    comoFunciona: [
      "El puntero abandona el elemento objetivo o uno de sus descendientes.",
      "El navegador dispara `mouseout` sobre el elemento que se abandona.",
      "`evento.relatedTarget` indica el elemento hacia el que se mueve el cursor.",
      "El evento burbujea hasta los ancestros.",
      "Se ejecutan los manejadores registrados.",
    ],
    sintaxis: [
      { caption: "Como propiedad", code: 'zona.onmouseout = (evento) => {\n  console.log("Salida hacia", evento.relatedTarget);\n};' },
      { caption: "Con addEventListener", code: 'zona.addEventListener("mouseout", (evento) => {\n  zona.classList.remove("activa");\n});' },
      { caption: "Salida real del contenedor", code: 'zona.addEventListener("mouseleave", () => {\n  zona.classList.remove("activa");\n});' },
    ],
    nota: "`mouseout` se dispara al entrar en un hijo; `mouseleave` no. Usa `mouseleave` si quieres saber cuándo el cursor abandona el contenedor de verdad.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Quitar el resaltado",
        descripcion: "Se limpia el estilo al salir.",
        code: 'zona.addEventListener("mouseout", () => {\n  zona.classList.remove("resaltada");\n});',
      },
      {
        titulo: "Ejemplo 2 · relatedTarget",
        descripcion: "Permite saber si el cursor se queda dentro de la zona.",
        code: 'zona.addEventListener("mouseout", (evento) => {\n  if (zona.contains(evento.relatedTarget)) {\n    return; // sigue dentro de un hijo\n  }\n  console.log("Salió de la zona");\n});',
      },
      {
        titulo: "Ejemplo 3 · Alternativa mouseleave",
        descripcion: "El comportamiento suele ser el esperado.",
        code: 'zona.addEventListener("mouseleave", () => {\n  console.log("Salida real del contenedor");\n});',
      },
    ],
    errores: [
      {
        texto: "**Esperar una sola salida con mouseout**: se dispara cada vez que entras en un hijo.",
        code: '// ❌ Se dispara varias veces al moverse por dentro\nzona.addEventListener("mouseout", cerrarMenu);\n\n// ✅ Una sola vez al salir del contenedor\nzona.addEventListener("mouseleave", cerrarMenu);',
      },
      {
        texto: "**Ignorar relatedTarget**: sin él no puedes distinguir una salida real de un movimiento interno.",
        code: '// ✅ Filtra las salidas hacia hijos\nzona.addEventListener("mouseout", (evento) => {\n  if (evento.relatedTarget && zona.contains(evento.relatedTarget)) return;\n  cerrarMenu();\n});',
      },
    ],
    casos: [
      "Cerrar menús y tooltips al sacar el cursor.",
      "Quitar efectos hover personalizados.",
      "Delegar la salida de elementos de una lista.",
      "Guardar el estado de un panel al abandonarlo.",
    ],
    relacion: [
      "**onmouseover**: evento inverso, al entrar.",
      "**mouseleave**: salida del contenedor sin contar hijos.",
      "**relatedTarget**: elemento hacia el que se mueve el cursor.",
      "**mouseenter**: entrada al contenedor sin contar hijos.",
      "**Delegación**: mouseout burbujea y permite escuchar en el padre.",
    ],
    analogia:
      "Es el sensor de una habitación: avisa cada vez que alguien cruza una puerta interna, no solo cuando sale de la casa. Si quieres saber cuándo alguien abandona la casa entera, necesitas otro sensor (mouseleave).",
    analogiaDiagrama: analogia(
      "onmouseout",
      [
        ["🚪", "Salida", "El puntero abandona el elemento."],
        ["🧩", "Incluye hijos", "También se dispara al pasar a un hijo."],
        ["🫧", "Burbujea", "Se puede delegar."],
        ["🎯", "relatedTarget", "Hacia dónde va el cursor."],
      ],
      "Salir de un hijo cuenta como mouseout; salir del contenedor es mouseleave.",
    ),
    relacionArbol: arbol("onmouseout", "Salida del puntero", [
      ["🚪", "mouseout", "Incluye movimientos a hijos"],
      ["🐭", "mouseover", "Evento inverso"],
      ["🛡️", "mouseleave", "Solo salida del contenedor"],
      ["🎯", "relatedTarget", "Destino del cursor"],
      ["🫧", "Burbujeo", "Permite delegación"],
    ]),
    quiz: [
      {
        id: 1,
        pregunta: "¿Cuándo se dispara `mouseout`?",
        opciones: ["Al entrar en un elemento.", "Al salir de un elemento o de un hijo.", "Al hacer clic.", "Al redimensionar."],
        correcta: 1,
        explicacion: "mouseout incluye la salida hacia un elemento hijo.",
      },
      {
        id: 2,
        pregunta: "¿Qué evento evita el problema de los hijos?",
        opciones: ["mouseover", "mouseenter", "mouseleave", "mousemove"],
        correcta: 2,
        explicacion: "mouseleave solo se dispara al abandonar el contenedor.",
      },
      {
        id: 3,
        pregunta: "¿Qué propiedad indica hacia dónde va el cursor?",
        opciones: ["evento.target", "evento.relatedTarget", "evento.clientX", "evento.key"],
        correcta: 1,
        explicacion: "relatedTarget es el elemento que recibe el puntero.",
      },
      {
        id: 4,
        pregunta: "¿mouseout burbujea?",
        opciones: ["Sí.", "No.", "Solo en inputs.", "Solo en Firefox."],
        correcta: 0,
        explicacion: "mouseout burbujea, por eso se puede delegar.",
      },
    ],
    fuente: "MDN Web Docs – Element: mouseout event · mouseleave · UI Events – Mouse Events",
  },

  /* ------------------------------------------------------------
     onmouseover
     ------------------------------------------------------------ */
  {
    id: "evn-onmouseover",
    titulo: "onmouseover",
    icon: "🐭",
    categoria: "Eventos nativos",
    firma: 'elemento.onmouseover = (evento) => { ... }',
    evento: "mouseover",
    definicion: [
      "`onmouseover` se dispara cuando el puntero **entra en un elemento o en cualquiera de sus hijos**.",
    ],
    queEs: [
      "Es el opuesto de `mouseout`.",
      "Se dispara al entrar en el elemento y de nuevo cada vez que el cursor pasa a un hijo.",
      "Burbujea, así que se puede escuchar desde un contenedor.",
      "Para detectar solo la entrada al contenedor se usa `mouseenter`, que no cuenta los hijos.",
    ],
    paraQueSirve: [
      "Mostrar tooltips o menús al pasar el cursor.",
      "Aplicar efectos hover personalizados.",
      "Resaltar filas o tarjetas de una lista.",
      "Delegar entradas de muchos elementos desde un contenedor.",
    ],
    comoFunciona: [
      "El puntero entra en el elemento o en un descendiente.",
      "El navegador dispara `mouseover` sobre el elemento que recibe el cursor.",
      "`evento.relatedTarget` indica de dónde venía el cursor.",
      "El evento burbujea hasta los ancestros.",
      "Se ejecutan los manejadores registrados.",
    ],
    sintaxis: [
      { caption: "Como propiedad", code: 'zona.onmouseover = (evento) => {\n  console.log("Entrada en", evento.target);\n};' },
      { caption: "Con addEventListener", code: 'zona.addEventListener("mouseover", () => {\n  zona.classList.add("activa");\n});' },
      { caption: "Entrada real al contenedor", code: 'zona.addEventListener("mouseenter", () => {\n  zona.classList.add("activa");\n});' },
    ],
    nota: "`mouseover` se repite al pasar por los hijos. Si solo quieres reaccionar a la entrada en el contenedor, usa `mouseenter`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Resaltar al entrar",
        descripcion: "Se añade una clase al pasar el cursor.",
        code: 'zona.addEventListener("mouseover", () => {\n  zona.classList.add("resaltada");\n});',
      },
      {
        titulo: "Ejemplo 2 · Filtrar hijos con relatedTarget",
        descripcion: "Solo actúa si la entrada viene de fuera del contenedor.",
        code: 'zona.addEventListener("mouseover", (evento) => {\n  if (zona.contains(evento.relatedTarget)) return;\n  console.log("Entrada real en la zona");\n});',
      },
      {
        titulo: "Ejemplo 3 · Alternativa mouseenter",
        descripcion: "Más simple cuando no importan los hijos.",
        code: 'zona.addEventListener("mouseenter", () => {\n  console.log("Entrada en el contenedor");\n});',
      },
    ],
    errores: [
      {
        texto: "**Esperar una sola entrada con mouseover**: se dispara también al pasar a los hijos.",
        code: '// ❌ Se repite al moverse por dentro\nzona.addEventListener("mouseover", abrirMenu);\n\n// ✅\nzona.addEventListener("mouseenter", abrirMenu);',
      },
      {
        texto: "**Mezclar mouseover con mouseout sin filtrar**: efectos que parpadean al cruzar los hijos.",
        code: '// ❌ El estilo parpadea\nzona.addEventListener("mouseover", () => zona.classList.add("on"));\nzona.addEventListener("mouseout", () => zona.classList.remove("on"));\n\n// ✅ Usa mouseenter y mouseleave\nzona.addEventListener("mouseenter", () => zona.classList.add("on"));\nzona.addEventListener("mouseleave", () => zona.classList.remove("on"));',
      },
    ],
    casos: [
      "Tooltips y menús al pasar el cursor.",
      "Resaltado de filas y tarjetas.",
      "Vistas previas de imágenes.",
      "Delegación de hover en listas dinámicas.",
    ],
    relacion: [
      "**onmouseout**: evento inverso, al salir.",
      "**mouseenter**: entrada al contenedor sin contar hijos.",
      "**relatedTarget**: elemento del que viene el cursor.",
      "**mouseleave**: salida del contenedor sin contar hijos.",
      "**Delegación**: mouseover burbujea y permite escuchar en el padre.",
    ],
    analogia:
      "Es el recibidor de una casa: avisa cada vez que alguien entra por cualquier puerta, incluidas las habitaciones internas. Si solo quieres saber cuándo alguien entra desde la calle, necesitas otro sensor (mouseenter).",
    analogiaDiagrama: analogia(
      "onmouseover",
      [
        ["🐭", "Entrada", "El puntero llega al elemento."],
        ["🧩", "Incluye hijos", "Se repite al pasar por ellos."],
        ["🫧", "Burbujea", "Se puede delegar."],
        ["🎯", "relatedTarget", "De dónde viene el cursor."],
      ],
      "Entrar en un hijo también cuenta como mouseover.",
    ),
    relacionArbol: arbol("onmouseover", "Entrada del puntero", [
      ["🐭", "mouseover", "Incluye entradas a hijos"],
      ["🚪", "mouseout", "Evento inverso"],
      ["🛡️", "mouseenter", "Solo entrada al contenedor"],
      ["🎯", "relatedTarget", "Origen del cursor"],
      ["🫧", "Burbujeo", "Permite delegación"],
    ]),
    quiz: [
      {
        id: 1,
        pregunta: "¿Cuándo se dispara `mouseover`?",
        opciones: ["Al salir de un elemento.", "Al entrar en un elemento o en un hijo.", "Al hacer clic.", "Al cargar la página."],
        correcta: 1,
        explicacion: "mouseover incluye la entrada en elementos hijos.",
      },
      {
        id: 2,
        pregunta: "¿Qué evento solo se dispara al entrar en el contenedor?",
        opciones: ["mouseover", "mouseout", "mouseenter", "mousemove"],
        correcta: 2,
        explicacion: "mouseenter no se dispara por los hijos.",
      },
      {
        id: 3,
        pregunta: "¿Qué propiedad indica de dónde viene el cursor?",
        opciones: ["evento.target", "evento.relatedTarget", "evento.clientY", "evento.detail"],
        correcta: 1,
        explicacion: "relatedTarget es el elemento anterior del puntero.",
      },
      {
        id: 4,
        pregunta: "¿Por qué parpadea un hover hecho con mouseover y mouseout?",
        opciones: [
          "Porque no burbujean.",
          "Porque se disparan al cruzar los hijos.",
          "Porque son obsoletos.",
          "Porque no existen.",
        ],
        correcta: 1,
        explicacion: "Cada hijo genera un nuevo par over/out; mouseenter y mouseleave lo evitan.",
      },
    ],
    fuente: "MDN Web Docs – Element: mouseover event · mouseenter · UI Events – Mouse Events",
  },

  /* ------------------------------------------------------------
     onresize
     ------------------------------------------------------------ */
  {
    id: "evn-onresize",
    titulo: "onresize",
    icon: "📐",
    categoria: "Eventos nativos",
    firma: 'window.addEventListener("resize", (evento) => { ... })',
    evento: "resize",
    definicion: [
      "`onresize` se dispara cuando cambia el tamaño de la ventana, de un `iframe` o, en algunos navegadores, de un elemento observable.",
    ],
    queEs: [
      "Se escucha principalmente en `window`.",
      "Se dispara muchas veces durante el arrastre del borde de la ventana.",
      "Para elementos individuales se recomienda `ResizeObserver`.",
      "No se puede cancelar: el cambio de tamaño ya ocurrió.",
    ],
    paraQueSirve: [
      "Adaptar la interfaz a distintos tamaños de pantalla.",
      "Redibujar gráficos o canvas.",
      "Recalcular posiciones de menús y tooltips.",
      "Cambiar el número de columnas de una galería.",
    ],
    comoFunciona: [
      "El usuario cambia el tamaño de la ventana o del iframe.",
      "El navegador recalcula el layout y dispara `resize`.",
      "El manejador recibe un `UIEvent` con `target` igual a `window`.",
      "Durante el arrastre, el evento puede dispararse decenas de veces por segundo.",
      "Para no saturar, se aplica debounce o `requestAnimationFrame`.",
    ],
    sintaxis: [
      { caption: "Escuchar la ventana", code: 'window.addEventListener("resize", () => {\n  console.log(window.innerWidth, window.innerHeight);\n});' },
      { caption: "Con debounce", code: 'let espera;\nwindow.addEventListener("resize", () => {\n  clearTimeout(espera);\n  espera = setTimeout(() => adaptar(), 200);\n});' },
      { caption: "Elemento observable", code: 'const observador = new ResizeObserver((entradas) => {\n  console.log(entradas[0].contentRect.width);\n});\nobservador.observe(caja);' },
    ],
    nota: "`resize` puede dispararse muchas veces por segundo. Si haces cálculos pesados, aplica debounce o `requestAnimationFrame` para no bloquear la interfaz.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Leer el tamaño",
        descripcion: "Se muestran las dimensiones actuales del viewport.",
        code: 'window.addEventListener("resize", () => {\n  console.log("Ventana:", window.innerWidth, "x", window.innerHeight);\n});',
      },
      {
        titulo: "Ejemplo 2 · Cambiar el layout",
        descripcion: "Se ajusta una clase según el ancho.",
        code: 'window.addEventListener("resize", () => {\n  document.body.classList.toggle("movil", window.innerWidth < 600);\n});',
      },
      {
        titulo: "Ejemplo 3 · Observar un elemento",
        descripcion: "`ResizeObserver` es la opción para cajas concretas.",
        code: 'const caja = document.querySelector("#caja");\n\nconst observador = new ResizeObserver((entradas) => {\n  const { width, height } = entradas[0].contentRect;\n  console.log("Caja:", Math.round(width), "x", Math.round(height));\n});\n\nobservador.observe(caja);',
      },
    ],
    errores: [
      {
        texto: "**Hacer trabajo pesado en cada resize**: se ejecuta decenas de veces por segundo.",
        code: '// ❌ Recalcula en cada píxel\nwindow.addEventListener("resize", recalcularTodo);\n\n// ✅ Con debounce\nlet t;\nwindow.addEventListener("resize", () => {\n  clearTimeout(t);\n  t = setTimeout(recalcularTodo, 200);\n});',
      },
      {
        texto: "**Usar resize para elementos**: el evento no se dispara en elementos arbitrarios.",
        code: '// ❌ No funciona en un div\ncaja.addEventListener("resize", adaptar);\n\n// ✅\nnew ResizeObserver(adaptar).observe(caja);',
      },
    ],
    casos: [
      "Diseño responsive y cambio de columnas.",
      "Redibujar canvas o gráficos.",
      "Reposicionar tooltips y menús.",
      "Ajustar el tamaño de un editor o visor.",
    ],
    relacion: [
      "**ResizeObserver**: cambios de tamaño de elementos.",
      "**onload**: tamaño inicial tras la carga.",
      "**debounce**: controla la frecuencia.",
      "**requestAnimationFrame**: sincroniza con el repintado.",
      "**Media queries**: alternativa CSS para estilos responsive.",
    ],
    analogia:
      "Es el aviso de una tienda cuando cambia el escaparate: cada vez que mueves el marco, el escaparate se recoloca. Si lo mueves despacio, el aviso suena muchas veces; por eso conviene esperar a que termines de moverlo (debounce) antes de reorganizar todo.",
    analogiaDiagrama: analogia(
      "onresize",
      [
        ["🪟", "Ventana", "Cambia el tamaño del viewport."],
        ["🔁", "Muchos disparos", "Durante el arrastre."],
        ["⏱️", "Debounce", "Espera a que termine el cambio."],
        ["📦", "ResizeObserver", "Para elementos concretos."],
      ],
      "resize avisa mucho; debounce decide cuándo actuar.",
    ),
    relacionArbol: arbol("onresize", "Cambio de tamaño", [
      ["🪟", "window resize", "Viewport"],
      ["📦", "ResizeObserver", "Elementos"],
      ["⏱️", "Debounce", "Control de frecuencia"],
      ["🎨", "requestAnimationFrame", "Sincronía con el pintado"],
      ["📱", "Media queries", "Alternativa CSS"],
    ]),
    quiz: [
      {
        id: 1,
        pregunta: "¿Dónde se escucha normalmente el evento `resize`?",
        opciones: ["En cualquier div.", "En window.", "Solo en inputs.", "Solo en imágenes."],
        correcta: 1,
        explicacion: "window es el objetivo habitual para el tamaño del viewport.",
      },
      {
        id: 2,
        pregunta: "¿Qué API observa el tamaño de un elemento concreto?",
        opciones: ["ResizeObserver", "MutationObserver", "IntersectionObserver", "PerformanceObserver"],
        correcta: 0,
        explicacion: "ResizeObserver notifica cambios de tamaño de elementos.",
      },
      {
        id: 3,
        pregunta: "¿Por qué conviene usar debounce con resize?",
        opciones: ["Porque el evento no existe sin él.", "Porque se dispara muchas veces por segundo.", "Porque bloquea el teclado.", "Porque es obsoleto."],
        correcta: 1,
        explicacion: "Debounce reduce la cantidad de ejecuciones costosas.",
      },
      {
        id: 4,
        pregunta: "¿Se puede cancelar un cambio de tamaño con preventDefault?",
        opciones: ["Sí.", "No, el cambio ya ocurrió.", "Solo en window.", "Solo en iframes."],
        correcta: 1,
        explicacion: "resize no es cancelable.",
      },
    ],
    fuente: "MDN Web Docs – Window: resize event · ResizeObserver · CSSOM View – Resize events",
  },

  /* ------------------------------------------------------------
     onsubmit
     ------------------------------------------------------------ */
  {
    id: "evn-onsubmit",
    titulo: "onsubmit",
    icon: "📨",
    categoria: "Eventos nativos",
    firma: 'formulario.addEventListener("submit", (evento) => { ... })',
    evento: "submit",
    definicion: [
      "`onsubmit` se dispara cuando un formulario está a punto de enviarse, ya sea al pulsar un botón de envío o al presionar Enter en un campo.",
    ],
    queEs: [
      "Se registra en el elemento `<form>`, no en el botón.",
      "Permite validar y decidir si el envío continúa.",
      "`evento.preventDefault()` cancela el envío y deja el control a JavaScript.",
      "No se dispara si llamas directamente a `form.submit()`; sí con `form.requestSubmit()`.",
    ],
    paraQueSirve: [
      "Validar datos antes de enviarlos al servidor.",
      "Enviar el formulario con `fetch` sin recargar la página.",
      "Mostrar errores y evitar envíos incompletos.",
      "Registrar analítica o confirmar la acción.",
    ],
    comoFunciona: [
      "El usuario pulsa un botón `type=\"submit\"` o presiona Enter.",
      "El navegador ejecuta la validación HTML nativa (required, pattern…).",
      "Si la validación pasa, dispara `submit` sobre el formulario.",
      "El manejador puede cancelar con `preventDefault()`.",
      "Si no se cancela, el navegador envía los datos según `action` y `method`.",
    ],
    sintaxis: [
      { caption: "Como propiedad", code: 'formulario.onsubmit = (evento) => {\n  evento.preventDefault();\n  console.log("Enviando");\n};' },
      { caption: "Con addEventListener", code: 'formulario.addEventListener("submit", async (evento) => {\n  evento.preventDefault();\n  await enviar(new FormData(evento.currentTarget));\n});' },
      { caption: "Botón de envío", code: '<form id="formulario">\n  <input name="correo" required />\n  <button type="submit">Enviar</button>\n</form>' },
    ],
    nota: "Registra el listener en el formulario y no en el botón: así también capturas el envío con Enter. Usa `requestSubmit()` si necesitas disparar la validación por código.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Validar antes de enviar",
        descripcion: "Se cancela el envío si falta el correo.",
        code: 'formulario.addEventListener("submit", (evento) => {\n  evento.preventDefault();\n  const correo = formulario.elements.correo.value;\n\n  if (!correo.includes("@")) {\n    console.log("Correo inválido");\n    return;\n  }\n  console.log("Formulario válido");\n});',
      },
      {
        titulo: "Ejemplo 2 · Enviar con fetch",
        descripcion: "Se envían los datos sin recargar la página.",
        code: 'formulario.addEventListener("submit", async (evento) => {\n  evento.preventDefault();\n  const datos = new FormData(evento.currentTarget);\n\n  const respuesta = await fetch("/api/contacto", {\n    method: "POST",\n    body: datos,\n  });\n\n  console.log("Estado:", respuesta.status);\n});',
      },
      {
        titulo: "Ejemplo 3 · requestSubmit",
        descripcion: "Dispara el evento y la validación nativa.",
        code: '// No dispara submit ni valida\nformulario.submit();\n\n// Sí dispara submit y valida\nformulario.requestSubmit();',
      },
    ],
    errores: [
      {
        texto: "**Escuchar el clic del botón en lugar de submit**: te pierdes el envío con Enter y la validación nativa.",
        code: '// ❌ Solo cubre el clic\nboton.addEventListener("click", enviar);\n\n// ✅ Cubre clic, Enter y validación\nformulario.addEventListener("submit", enviar);',
      },
      {
        texto: "**Olvidar `preventDefault()`**: la página se recarga y pierdes el estado.",
        code: '// ❌ Recarga la página\nformulario.addEventListener("submit", (evento) => {\n  validar();\n});\n\n// ✅\nformulario.addEventListener("submit", (evento) => {\n  evento.preventDefault();\n  validar();\n});',
      },
    ],
    casos: [
      "Formularios de contacto y registro.",
      "Búsquedas con validación previa.",
      "Envíos asíncronos con fetch.",
      "Formularios de varios pasos con validación.",
    ],
    relacion: [
      "**preventDefault**: cancela el envío por defecto.",
      "**FormData**: recoge los campos del formulario.",
      "**Validación HTML**: required, pattern, minlength.",
      "**requestSubmit**: dispara el envío con validación.",
      "**fetch**: alternativa asíncrona al envío clásico.",
    ],
    analogia:
      "Es el control de equipaje antes de embarcar: el formulario llega con sus datos, el revisor comprueba que todo esté en regla y decide si deja pasar el envío o lo devuelve. `preventDefault()` es cerrar la puerta de embarque para revisar a mano.",
    analogiaDiagrama: analogia(
      "onsubmit",
      [
        ["📨", "Envío", "Botón submit o Enter."],
        ["✅", "Validación", "HTML nativa y JavaScript."],
        ["🛑", "preventDefault", "Cancela el envío."],
        ["📦", "FormData", "Datos listos para enviar."],
      ],
      "El evento vive en el formulario, no en el botón.",
    ),
    relacionArbol: arbol("onsubmit", "Envío del formulario", [
      ["📨", "submit", "Se dispara en el form"],
      ["🛑", "preventDefault", "Cancela la recarga"],
      ["📦", "FormData", "Recoge los campos"],
      ["✅", "Validación", "required y pattern"],
      ["🔁", "requestSubmit", "Envío programático validado"],
    ]),
    quiz: [
      {
        id: 1,
        pregunta: "¿En qué elemento se registra `onsubmit`?",
        opciones: ["En el botón.", "En el formulario.", "En el input.", "En window."],
        correcta: 1,
        explicacion: "submit se dispara en el elemento form.",
      },
      {
        id: 2,
        pregunta: "¿Qué método cancela el envío por defecto?",
        opciones: ["evento.preventDefault()", "evento.stopPropagation()", "form.submit()", "evento.cancel()"],
        correcta: 0,
        explicacion: "preventDefault evita que el navegador envíe y recargue.",
      },
      {
        id: 3,
        pregunta: "¿Qué método dispara el envío pasando por la validación?",
        opciones: ["form.submit()", "form.requestSubmit()", "form.send()", "form.dispatch()"],
        correcta: 1,
        explicacion: "requestSubmit dispara submit y la validación nativa.",
      },
      {
        id: 4,
        pregunta: "¿Se dispara submit al pulsar Enter en un campo?",
        opciones: ["Sí, si el formulario tiene un botón de envío.", "Nunca.", "Solo en textarea.", "Solo con JavaScript."],
        correcta: 0,
        explicacion: "Enter envía el formulario cuando hay un control de envío.",
      },
    ],
    fuente: "MDN Web Docs – HTMLFormElement: submit event · requestSubmit · HTML Living Standard – Form submission",
  },

  /* ------------------------------------------------------------
     onunload
     ------------------------------------------------------------ */
  {
    id: "evn-onunload",
    titulo: "onunload",
    icon: "🚪",
    categoria: "Eventos nativos",
    firma: 'window.addEventListener("unload", (evento) => { ... })',
    evento: "unload",
    obsoleto: true,
    definicion: [
      "`onunload` se dispara cuando la página se descarga o el navegador navega a otro documento. Está **obsoleto y no es fiable** en navegadores modernos.",
    ],
    queEs: [
      "Forma parte del ciclo de vida del documento, junto con `beforeunload` y `pagehide`.",
      "Los navegadores lo restringen cada vez más para evitar bloqueos y abusos.",
      "No se garantiza su ejecución en móviles ni cuando la pestaña se descarta.",
      "No debe usarse para guardar datos críticos: usa `visibilitychange` o `pagehide`.",
    ],
    paraQueSirve: [
      "Mantener código heredado que aún lo usa.",
      "Entender la secuencia de salida de una página.",
      "Depurar el ciclo de vida del documento.",
      "Nada crítico: para guardar estado hay alternativas mejores.",
    ],
    comoFunciona: [
      "El usuario navega fuera, cierra la pestaña o recarga.",
      "El navegador dispara `beforeunload`, donde puede pedir confirmación.",
      "Después dispara `pagehide` cuando la página pasa a segundo plano o se descarga.",
      "Finalmente dispara `unload` si el navegador lo permite.",
      "Las operaciones asíncronas iniciadas en unload pueden no completarse.",
    ],
    sintaxis: [
      { caption: "Forma histórica", code: 'window.addEventListener("unload", () => {\n  console.log("Página descargada");\n});' },
      { caption: "Alternativa recomendada", code: 'window.addEventListener("pagehide", () => {\n  guardarEstado();\n});' },
      { caption: "Cambio de visibilidad", code: 'document.addEventListener("visibilitychange", () => {\n  if (document.visibilityState === "hidden") guardarEstado();\n});' },
    ],
    nota: "⚠️ `onunload` está obsoleto y no es fiable. Para guardar estado usa `pagehide` o `visibilitychange`; para pedir confirmación, `beforeunload`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Secuencia de salida",
        descripcion: "Los eventos se suceden al abandonar la página.",
        code: 'window.addEventListener("beforeunload", () => {\n  console.log("1. beforeunload");\n});\n\nwindow.addEventListener("pagehide", () => {\n  console.log("2. pagehide");\n});\n\nwindow.addEventListener("unload", () => {\n  console.log("3. unload");\n});',
      },
      {
        titulo: "Ejemplo 2 · Guardar con pagehide",
        descripcion: "Más fiable que unload en móviles.",
        code: 'window.addEventListener("pagehide", () => {\n  localStorage.setItem("estado", JSON.stringify(estado));\n});',
      },
      {
        titulo: "Ejemplo 3 · Confirmar la salida",
        descripcion: "El navegador decide cómo mostrar el aviso.",
        code: 'window.addEventListener("beforeunload", (evento) => {\n  evento.preventDefault();\n  evento.returnValue = "";\n});',
      },
    ],
    errores: [
      {
        texto: "**Guardar datos críticos en unload**: la petición puede cancelarse antes de completarse.",
        code: '// ❌ Puede no llegar nunca\nwindow.addEventListener("unload", () => {\n  fetch("/api/guardar", { method: "POST" });\n});\n\n// ✅ Guarda antes, al ocultarse la página\nwindow.addEventListener("pagehide", () => {\n  navigator.sendBeacon("/api/guardar", datos);\n});',
      },
      {
        texto: "**Confiar en unload para limpiar recursos**: en móviles puede no dispararse.",
        code: '// ❌ Poco fiable\nwindow.addEventListener("unload", limpiar);\n\n// ✅ Guarda al cambiar de visibilidad\ndocument.addEventListener("visibilitychange", () => {\n  if (document.visibilityState === "hidden") limpiar();\n});',
      },
    ],
    casos: [
      "Mantenimiento de código heredado.",
      "Depuración del ciclo de vida de la página.",
      "Migración hacia `pagehide` y `visibilitychange`.",
      "Analítica de salida con `sendBeacon`.",
    ],
    relacion: [
      "**beforeunload**: permite pedir confirmación.",
      "**pagehide**: alternativa fiable para guardar estado.",
      "**visibilitychange**: detecta pestaña oculta.",
      "**sendBeacon**: envía datos sin bloquear la salida.",
      "**onload**: evento opuesto al inicio de la página.",
    ],
    analogia:
      "Es el aviso de “el tren está saliendo” que suena cuando ya se han cerrado las puertas. Puedes oírlo, pero ya no puedes bajar ni hacer nada importante. Para despedirte y guardar tus cosas, usa el aviso anterior (pagehide), cuando aún hay tiempo.",
    analogiaDiagrama: analogia(
      "onunload",
      [
        ["⚠️", "Obsoleto", "No es fiable en navegadores modernos."],
        ["🚪", "Salida", "La página se descarga."],
        ["⏳", "Sin garantías", "Las tareas asíncronas pueden cortarse."],
        ["✅", "Alternativas", "pagehide y visibilitychange."],
      ],
      "unload avisa tarde: úsalo solo para leer código antiguo.",
    ),
    relacionArbol: arbol("onunload", "Salida de la página", [
      ["⚠️", "unload", "Obsoleto y poco fiable"],
      ["❓", "beforeunload", "Confirmación de salida"],
      ["📦", "pagehide", "Guardado fiable"],
      ["👁️", "visibilitychange", "Pestaña oculta"],
      ["📡", "sendBeacon", "Envío sin bloquear"],
    ]),
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué estado tiene `onunload` hoy?",
        opciones: ["Recomendado.", "Obsoleto y poco fiable.", "Obligatorio en formularios.", "Solo para imágenes."],
        correcta: 1,
        explicacion: "Los navegadores restringen unload y no garantizan su ejecución.",
      },
      {
        id: 2,
        pregunta: "¿Qué evento es mejor para guardar estado al salir?",
        opciones: ["unload", "pagehide", "click", "focus"],
        correcta: 1,
        explicacion: "pagehide se dispara de forma más fiable, también en móviles.",
      },
      {
        id: 3,
        pregunta: "¿Qué evento permite pedir confirmación antes de salir?",
        opciones: ["beforeunload", "unload", "pagehide", "load"],
        correcta: 0,
        explicacion: "beforeunload puede mostrar el aviso del navegador.",
      },
      {
        id: 4,
        pregunta: "¿Qué API envía datos sin bloquear la salida de la página?",
        opciones: ["fetch", "XMLHttpRequest", "sendBeacon", "WebSocket"],
        correcta: 2,
        explicacion: "navigator.sendBeacon está pensada para envíos al abandonar la página.",
      },
    ],
    fuente: "MDN Web Docs – Window: unload event (deprecated) · pagehide · beforeunload · Page Lifecycle API",
  },
];

export const JS_EVENTOS_NATIVOS_DOCS = Object.fromEntries(
  DOCS.map((doc) => [doc.id, { laboratorio: true, ...doc }]),
);

export const JS_EVENTOS_NATIVOS = {
  id: "eventos-nativos",
  label: "Eventos nativos",
  icon: "⚡",
  titulo: "Eventos nativos del navegador",
  descripcion:
    "Domina blur, click, teclado, carga, ratón, resize, submit y unload con simuladores en vivo y retos.",
  grupos: [
    {
      seccion: "Foco, ratón y teclado",
      subtitulo: "blur, click, keydown, keypress, keyup, mouseout y mouseover",
      metodos: [
        { id: "evn-onblur", nombre: "onblur", firma: "elemento.onblur = manejador", icon: "🔴" },
        { id: "evn-onclick", nombre: "onclick", firma: "elemento.onclick = manejador", icon: "🖱️" },
        { id: "evn-onkeydown", nombre: "onkeydown", firma: 'addEventListener("keydown", ...)', icon: "⌨️" },
        { id: "evn-onkeypress", nombre: "onkeypress", firma: "elemento.onkeypress = manejador", icon: "⌨️" },
        { id: "evn-onkeyup", nombre: "onkeyup", firma: "elemento.onkeyup = manejador", icon: "⌨️" },
        { id: "evn-onmouseout", nombre: "onmouseout", firma: "elemento.onmouseout = manejador", icon: "🚪" },
        { id: "evn-onmouseover", nombre: "onmouseover", firma: "elemento.onmouseover = manejador", icon: "🐭" },
      ],
    },
    {
      seccion: "Página y formularios",
      subtitulo: "load, resize, submit y unload",
      metodos: [
        { id: "evn-onload", nombre: "onload", firma: 'addEventListener("load", ...)', icon: "🚀" },
        { id: "evn-onresize", nombre: "onresize", firma: 'addEventListener("resize", ...)', icon: "📐" },
        { id: "evn-onsubmit", nombre: "onsubmit", firma: 'addEventListener("submit", ...)', icon: "📨" },
        { id: "evn-onunload", nombre: "onunload", firma: 'addEventListener("unload", ...)', icon: "🚪" },
      ],
    },
  ],
};
