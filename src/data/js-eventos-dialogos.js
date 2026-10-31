/* Generado desde src/ApuntesFormatoHtml — no editar a mano.
   Regenerar con: node scripts/generate-apuntes.mjs */

export const JS_EVENTOS_DIALOGOS = {
  "id": "eventos-dialogos",
  "label": "Eventos y diálogos",
  "icon": "⚡",
  "titulo": "Eventos y diálogos del navegador",
  "descripcion": "Escucha, dispara, frena y elimina eventos; además, domina alert(), confirm() y prompt().",
  "grupos": [
    {
      "seccion": "Eventos",
      "metodos": [
        {
          "id": "ev-addlistener",
          "nombre": "addEventListener",
          "firma": "elemento.addEventListener(tipo, listener, opciones)",
          "icon": "🎧",
        },
        {
          "id": "ev-removelistener",
          "nombre": "removeEventListener",
          "firma": "elemento.removeEventListener(tipo, listener, opciones)",
          "icon": "🔇",
        },
        {
          "id": "ev-dispatchevent",
          "nombre": "dispatchEvent",
          "firma": "elemento.dispatchEvent(evento)",
          "icon": "📣",
        },
        {
          "id": "ev-preventdefault",
          "nombre": "preventDefault",
          "firma": "evento.preventDefault()",
          "icon": "🛑",
        },
        {
          "id": "ev-stoppropagation",
          "nombre": "stopPropagation",
          "firma": "evento.stopPropagation()",
          "icon": "🚧",
        },
        {
          "id": "ev-stopimmediatepropagation",
          "nombre": "stopImmediatePropagation",
          "firma": "evento.stopImmediatePropagation()",
          "icon": "⛔",
        },
      ],
    },
    {
      "seccion": "Diálogos del navegador",
      "metodos": [
        {
          "id": "dlg-alert",
          "nombre": "window.alert()",
          "firma": "window.alert(mensaje)",
          "icon": "🚨",
        },
        {
          "id": "dlg-confirm",
          "nombre": "window.confirm()",
          "firma": "window.confirm(mensaje)",
          "icon": "✅",
        },
        {
          "id": "dlg-prompt",
          "nombre": "window.prompt()",
          "firma": "window.prompt(mensaje, valorPorDefecto)",
          "icon": "❓",
        },
      ],
    },
  ],
};

export const JS_EVENTOS_DIALOGOS_DOCS = {
  "ev-addlistener": {
    "id": "ev-addlistener",
    "titulo": "addEventListener",
    "icon": "🎧",
    "categoria": "Eventos y diálogos",
    "firma": "elemento.addEventListener(tipo, listener, opciones)",
    "simulador": "eventos",
    "definicion": [
      "`addEventListener()` es un método del **DOM API** que permite registrar una función (callback) para que sea ejecutada cuando ocurra un **evento específico** en un elemento del DOM.",
    ],
    "queEs": [
      "Es el mecanismo estándar para manejar eventos en JavaScript moderno.",
      "Permite asignar **múltiples manejadores** al mismo evento y elemento, proporcionando un control fino sobre la **fase de propagación** (burbujeo y captura) y ofreciendo una forma **desacoplada** y **limpia** de responder a las interacciones del usuario o cambios en el DOM.",
    ],
    "paraQueSirve": [
      "Responder a **interacciones del usuario**: clicks, teclado, mouse, touch, etc.",
      "Detectar **cambios de estado**: carga de página, cambios en formularios, resize, scroll.",
      "Implementar **patrones de UI** como modales, dropdowns, sliders, etc.",
      "Crear **aplicaciones interactivas** y dinámicas.",
      "Manejar eventos de **red** (fetch, WebSocket, etc.).",
      "Gestionar eventos en **componentes web** y frameworks modernos.",
    ],
    "comoFunciona": [
      "El método registra una función callback que se ejecutará cuando el evento especificado ocurra en el elemento.",
      "Los eventos fluyen en tres fases:",
      "**Fase de captura** (capturing phase): El evento desciende desde el `document` hasta el elemento objetivo.",
      "**Fase de objetivo** (target phase): El evento alcanza el elemento que lo disparó.",
      "**Fase de burbujeo** (bubbling phase): El evento asciende desde el elemento objetivo hasta el `document`.",
      "Por defecto, los listeners se ejecutan en la fase de **burbujeo** (a menos que se especifique `capture: true`).",
    ],
    "sintaxis": [
      {
        "code": "target.addEventListener(type, listener [, options])\ntarget.addEventListener(type, listener [, useCapture])",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "code": "// 1. Click básico\nconst button = document.querySelector('#miBoton');\nbutton.addEventListener('click', function(event) {\n  console.log('Botón clickeado!', event.target);\n});\n\n// 2. Con función separada\nfunction handleClick(event) {\n  console.log('Click en:', event.currentTarget.id);\n}\nbutton.addEventListener('click', handleClick);\n\n// 3. Eventos de teclado\ndocument.addEventListener('keydown', (event) => {\n  if (event.key === 'Enter') {\n    console.log('Presionaste Enter!');\n  }\n  if (event.key === 'Escape') {\n    console.log('Cerrando modal...');\n  }\n});\n\n// 4. Eventos de formulario\nconst input = document.querySelector('#email');\ninput.addEventListener('input', (event) => {\n  console.log('Valor actual:', event.target.value);\n});\n\ninput.addEventListener('blur', (event) => {\n  if (!event.target.value.includes('@')) {\n    console.log('Email inválido!');\n  }\n});\n\n// 5. Captura y burbujeo\nconst padre = document.querySelector('#padre');\nconst hijo = document.querySelector('#hijo');\n\n// Fase de burbujeo (default)\npadre.addEventListener('click', () => console.log('Padre (burbuja)'));\nhijo.addEventListener('click', () => console.log('Hijo'));\n\n// Fase de captura\npadre.addEventListener('click', () => console.log('Padre (captura)'), true);\n\n// 6. once - ejecutar una sola vez\nbutton.addEventListener('click', () => {\n  console.log('Esto se ejecuta una sola vez!');\n}, { once: true });\n\n// 7. passive - para scroll (mejor rendimiento)\ndocument.addEventListener('touchmove', (event) => {\n  // No se puede llamar a preventDefault()\n  console.log('Scrolling...');\n}, { passive: true });\n\n// 8. AbortSignal - para remover automáticamente\nconst controller = new AbortController();\nbutton.addEventListener('click', () => {\n  console.log('Click detectado');\n}, { signal: controller.signal });\n\n// Para remover el listener:\n// controller.abort();\n\n// 9. Eventos personalizados\nconst customEvent = new CustomEvent('miEvento', {\n  detail: { mensaje: 'Datos personalizados' }\n});\nelement.addEventListener('miEvento', (e) => {\n  console.log('Evento recibido:', e.detail.mensaje);\n});\nelement.dispatchEvent(customEvent);",
      },
    ],
    "errores": [
      "**No remover listeners**: Pueden causar **memory leaks**, especialmente en SPAs o frameworks.",
      {
        "texto": "**Usar funciones anónimas sin referencia**: No se pueden remover después.",
        "code": "// ❌ MAL - No se puede remover\nelement.addEventListener('click', () => {});\n\n// ✅ BIEN - Se puede remover\nfunction handler() {}\nelement.addEventListener('click', handler);\nelement.removeEventListener('click', handler);",
      },
      "**Confundir **`this`: En funciones tradicionales, `this` apunta al elemento. En arrow functions, al contexto léxico.",
      "**Olvidar **`event.preventDefault()`: Especialmente en formularios y enlaces, para evitar comportamiento por defecto.",
      "**Ignorar **`event.stopPropagation()`: Puede causar comportamientos inesperados si no se controla la propagación.",
      "**Usar **`capture: true`** sin necesidad**: La mayoría de los casos no requieren captura.",
      "**Asumir que **`event.target`** vs **`event.currentTarget`** son iguales**: No siempre es así en eventos delegados.",
    ],
    "casos": [
      "**Delegación de eventos** – Manejar elementos dinámicos:",
      "Código: document.querySelector('#lista').addEventListener('click', (event) => {",
      "**Prevenir comportamiento por defecto**:",
      "Código: document.querySelector('form').addEventListener('submit', (event) => {",
      "**Modales y overlays**:",
      "Código: modalOverlay.addEventListener('click', (event) => {",
      "**Scroll infinito**:",
    ],
    "relacion": [
      "`removeEventListener()`: Para eliminar listeners registrados.",
      "`Event`** object**: Contiene información del evento (target, currentTarget, preventDefault, etc.).",
      "`CustomEvent`: Para crear eventos personalizados.",
      "`dispatchEvent()`: Para disparar eventos programáticamente.",
      "`event propagation`: Captura → Target → Burbujeo.",
      "`event delegation`: Técnica de manejar eventos en ancestros.",
      "`abort`** / **`AbortController`: Para cancelar listeners automáticamente.",
    ],
    "analogia": "Imagina que eres el gerente de un restaurante (`element`). Tienes varios meseros (`listeners`). Cuando un cliente (`event`) llega al restaurante, primero pasa por la entrada (`capture`), llega a su mesa (`target`), y luego la información va subiendo hasta la gerencia (`bubbling`). `addEventListener()` te permite asignar diferentes meseros para diferentes tipos de clientes, y puedes decirles que atiendan al cliente cuando llega a la mesa o cuando pasa por la entrada.",
    "fuente": "MDN Web Docs – addEventListener() WHATWG DOM Specification MDN – Event reference JavaScript.info – Event handling",
    "notasPersonales": [
      "**Delegación de eventos**: Es una de las técnicas más poderosas.",
      "En lugar de asignar listeners a cada elemento, asigna uno al contenedor y usa `event.target` para detectar el elemento clickeado.",
      "Es eficiente y maneja elementos dinámicos automáticamente.",
      "**Pasivo vs Activo**: Usa `{ passive: true }` en eventos de scroll y touch para mejorar el rendimiento.",
      "El navegador no esperará a que tu código termine para hacer scroll.",
      "**Memory leaks**: En SPAs como React/Vue/Angular, asegúrate de remover listeners en el `unmount`/`destroy` (o usar `AbortController`).",
      "**Funciones flecha vs tradicionales**:",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de addEventListener?",
        "opciones": [
          "elemento.addEventListener(tipo, listener, opciones)",
          "elemento.dispatchEvent(evento)",
          "evento.preventDefault()",
          "elemento.removeEventListener(tipo, listener, opciones)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor addEventListener?",
        "opciones": [
          "Es un método del DOM que despacha (lanza) un evento desde un objeto (window, un elemento, etc.), ejecutando todos los listeners registrados…",
          "addEventListener() es un método del DOM API que permite registrar una función (callback) para que sea ejecutada cuando ocurra un evento…",
          "preventDefault() es un método del objeto Event en JavaScript que cancela el comportamiento predeterminado del navegador para un evento…",
          "removeEventListener() es un método del DOM API que permite eliminar un manejador de eventos previamente registrado con addEventListener()…",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve addEventListener?",
        "opciones": [
          "Responder a interacciones del usuario: clicks, teclado, mouse, touch, etc.",
          "📡 Emitir eventos personalizados desde cualquier objeto.",
          "Prevenir el envío automático de formularios.",
          "Prevenir memory leaks al eliminar referencias a elementos DOM.",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a addEventListener?",
        "opciones": [
          "Llamar preventDefault() demasiado tarde: Si se llama después de que la acción ya comenzó, puede no tener efecto.",
          "No remover listeners: Pueden causar memory leaks, especialmente en SPAs o frameworks.",
          "Pasar un string en vez de Event → TypeError | Olvidar bubbles: true → No sube por el árbol | Creer que simula eventos reales →…",
          "Usar funciones anónimas: No se pueden remover porque no hay referencia.",
        ],
        "correcta": 1,
      },
    ],
  },
  "ev-removelistener": {
    "id": "ev-removelistener",
    "titulo": "removeEventListener",
    "icon": "🔇",
    "categoria": "Eventos y diálogos",
    "firma": "elemento.removeEventListener(tipo, listener, opciones)",
    "simulador": "eventos",
    "definicion": [
      "`removeEventListener()` es un método del **DOM API** que permite eliminar un manejador de eventos previamente registrado con `addEventListener()` en un elemento del DOM.",
    ],
    "queEs": [
      "Es el mecanismo complementario a `addEventListener()` que permite **desregistrar** funciones callback de eventos específicos.",
      "Es esencial para prevenir **memory leaks**, evitar ejecuciones no deseadas y mantener un código limpio en aplicaciones dinámicas.",
    ],
    "paraQueSirve": [
      "Prevenir **memory leaks** al eliminar referencias a elementos DOM.",
      "Detener la ejecución de listeners cuando ya no son necesarios.",
      "Limpiar recursos en componentes que se **desmontan** (SPAs, frameworks).",
      "Evitar que se ejecuten **múltiples veces** funciones que deberían correr una sola vez.",
      "Controlar el **ciclo de vida** de los eventos en aplicaciones complejas.",
      "Mejorar el **rendimiento** eliminando listeners innecesarios.",
    ],
    "comoFunciona": [
      "Para eliminar un listener, `removeEventListener()` necesita los **mismos parámetros** con los que fue registrado:",
      "el **tipo de evento**, la **función exacta** (misma referencia) y las **mismas opciones** (capture, passive, etc.).",
      "**Importante**: La función debe ser la **misma referencia** que se usó en `addEventListener()`.",
      "No se puede eliminar una función anónima porque no se puede referenciar después.",
      "El método busca el listener en la lista interna del elemento y lo elimina si encuentra una coincidencia exacta.",
    ],
    "sintaxis": [
      {
        "code": "target.removeEventListener(type, listener [, options])\ntarget.removeEventListener(type, listener [, useCapture])",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "code": "// 1. Eliminar listener básico\nconst button = document.querySelector('#miBoton');\n\nfunction handleClick(event) {\n  console.log('Click!');\n}\n\nbutton.addEventListener('click', handleClick);\n// ... en algún momento después\nbutton.removeEventListener('click', handleClick);\n\n// 2. Con opciones (debe coincidir)\nfunction handleClickCapture(event) {\n  console.log('Click en captura');\n}\n\nbutton.addEventListener('click', handleClickCapture, { capture: true });\n// Para remover, debe tener las mismas opciones\nbutton.removeEventListener('click', handleClickCapture, { capture: true });\n\n// 3. Con once (automático - no necesita remove)\nbutton.addEventListener('click', function handler() {\n  console.log('Una sola vez');\n}, { once: true });\n// Se elimina automáticamente después de ejecutarse\n\n// 4. Usando AbortController (alternativa moderna)\nconst controller = new AbortController();\nbutton.addEventListener('click', () => {\n  console.log('Click!');\n}, { signal: controller.signal });\n\n// Remover todos los listeners con este signal\ncontroller.abort(); // Elimina el listener automáticamente\n\n// 5. Remover en un componente (ejemplo con clase)\nclass Modal {\n  constructor() {\n    this.handleKeydown = this.handleKeydown.bind(this);\n    document.addEventListener('keydown', this.handleKeydown);\n  }\n\n  handleKeydown(event) {\n    if (event.key === 'Escape') {\n      this.close();\n    }\n  }\n\n  close() {\n    document.removeEventListener('keydown', this.handleKeydown);\n    // ... otras limpiezas\n  }\n\n  destroy() {\n    this.close();\n    // Limpieza completa\n  }\n}\n\n// 6. Remover múltiples listeners\nfunction cleanup(element, listeners) {\n  listeners.forEach(({ type, handler, options }) => {\n    element.removeEventListener(type, handler, options);\n  });\n}\n\n// Uso\nconst listeners = [\n  { type: 'click', handler: handleClick },\n  { type: 'mouseenter', handler: handleMouseEnter },\n  { type: 'mouseleave', handler: handleMouseLeave }\n];\nlisteners.forEach(({ type, handler }) => {\n  element.addEventListener(type, handler);\n});\n\n// Limpiar después\ncleanup(element, listeners);\n\n// 7. ❌ NO se puede remover funciones anónimas\nbutton.addEventListener('click', () => {\n  console.log('Click!');\n});\n// Esto NO funciona - la función es diferente\nbutton.removeEventListener('click', () => {\n  console.log('Click!');\n}); // ❌ No elimina nada",
      },
    ],
    "errores": [
      {
        "texto": "**Usar funciones anónimas**: No se pueden remover porque no hay referencia.",
        "code": "// ❌ MAL\nelement.addEventListener('click', () => {});\nelement.removeEventListener('click', () => {}); // No funciona\n\n// ✅ BIEN\nfunction handler() {}\nelement.addEventListener('click', handler);\nelement.removeEventListener('click', handler);",
      },
      "**No coincidir las opciones**: Si registraste con `{ capture: true }`, debes remover con `{ capture: true }`.",
      {
        "texto": "**Olvidar el **`bind`: En clases, si usas `this.handleClick.bind(this)`, crea una **nueva función** cada vez.",
        "code": "// ❌ MAL\nelement.addEventListener('click', this.handleClick.bind(this));\nelement.removeEventListener('click', this.handleClick.bind(this)); // No funciona\n\n// ✅ BIEN\nthis.boundHandler = this.handleClick.bind(this);\nelement.addEventListener('click', this.boundHandler);\nelement.removeEventListener('click', this.boundHandler);",
      },
      "**No remover en componentes desmontados**: Causa memory leaks y comportamientos extraños.",
      "**Confundir **`removeEventListener`** con **`removeEventListeners` (no existe).",
      "**Intentar remover un listener que no existe**: No da error, simplemente no hace nada.",
    ],
    "casos": [
      "**Limpiar en unmount de componentes React**:",
      "Código: useEffect(() => {",
      "**Prevenir múltiples ejecuciones**:",
      "Código: let handler;",
      "**Limpiar después de una animación**:",
      "Código: function animateAndClean() {",
      "**Control de scroll con throttle**:",
    ],
    "relacion": [
      "`addEventListener()`: Complemento directo. Todo lo que se añade debe removerse.",
      "`AbortController`: Alternativa moderna para remover múltiples listeners automáticamente.",
      "`{ once: true }`: Elimina el listener automáticamente después de la primera ejecución.",
      "**Memory leaks**: La falta de `removeEventListener()` es una causa común de memory leaks en SPAs.",
      "**Garbage Collection**: Remover listeners permite que el garbage collector libere memoria.",
      "**Event delegation**: Al usar delegación, solo necesitas un listener en el contenedor, reduciendo la necesidad de remover muchos listeners individuales.",
    ],
    "analogia": "Imagina que `addEventListener()` es como contratar a un empleado (`listener`) para que atienda a los clientes (`eventos`) en tu tienda (`element`). `removeEventListener()` es como **despedir** a ese empleado cuando ya no lo necesitas. Si no lo despides, sigue ocupando espacio, cobrando sueldo (memoria) y atendiendo clientes aunque ya no quieras que lo haga.",
    "fuente": "MDN Web Docs – removeEventListener() WHATWG DOM Specification MDN – Memory leaks and event listeners JavaScript.info – removeEventListener",
    "notasPersonales": [
      "**Práctica obligatoria**: Siempre que uses `addEventListener()`, pregúntate: \"¿Cuándo voy a remover esto?\" Especialmente en componentes de frameworks.",
      "**Alternativas modernas**: `{ once: true }`: Para eventos que solo necesitan ejecutarse una vez. `AbortController`: Para remover múltiples listeners con una sola llamada.",
      "Código: const controller = new AbortController();",
      "**Patrón de limpieza en componentes**:",
      "Código: class Component {",
      "**Event delegation como alternativa**: A veces no necesitas remover listeners si usas delegación en un contenedor que siempre existe en el DOM.",
      "**Testing**: En pruebas unitarias, es buena práctica remover todos los listeners después de cada test para evitar interferencias.",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de removeEventListener?",
        "opciones": [
          "elemento.removeEventListener(tipo, listener, opciones)",
          "elemento.dispatchEvent(evento)",
          "evento.preventDefault()",
          "elemento.addEventListener(tipo, listener, opciones)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor removeEventListener?",
        "opciones": [
          "Es un método del DOM que despacha (lanza) un evento desde un objeto (window, un elemento, etc.), ejecutando todos los listeners registrados…",
          "removeEventListener() es un método del DOM API que permite eliminar un manejador de eventos previamente registrado con addEventListener()…",
          "preventDefault() es un método del objeto Event en JavaScript que cancela el comportamiento predeterminado del navegador para un evento…",
          "addEventListener() es un método del DOM API que permite registrar una función (callback) para que sea ejecutada cuando ocurra un evento…",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve removeEventListener?",
        "opciones": [
          "Prevenir el envío automático de formularios.",
          "Prevenir memory leaks al eliminar referencias a elementos DOM.",
          "📡 Emitir eventos personalizados desde cualquier objeto.",
          "Responder a interacciones del usuario: clicks, teclado, mouse, touch, etc.",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a removeEventListener?",
        "opciones": [
          "Usar funciones anónimas: No se pueden remover porque no hay referencia.",
          "Llamar preventDefault() demasiado tarde: Si se llama después de que la acción ya comenzó, puede no tener efecto.",
          "Pasar un string en vez de Event → TypeError | Olvidar bubbles: true → No sube por el árbol | Creer que simula eventos reales →…",
          "No remover listeners: Pueden causar memory leaks, especialmente en SPAs o frameworks.",
        ],
        "correcta": 0,
      },
    ],
  },
  "ev-dispatchevent": {
    "id": "ev-dispatchevent",
    "titulo": "dispatchEvent",
    "icon": "📣",
    "categoria": "Eventos y diálogos",
    "firma": "elemento.dispatchEvent(evento)",
    "simulador": "eventos",
    "definicion": [
      "Es un **método del DOM** que **despacha (lanza) un evento** desde un objeto (`window`, un elemento, etc.), ejecutando **todos los listeners registrados** para ese tipo de evento.",
    ],
    "queEs": [
      "Es la forma de **disparar eventos manualmente** desde JavaScript, como si el navegador o el usuario los hubieran provocado.",
      "El evento despachado **recorre las fases de captura, target y burbuja**, ejecutando todos los listeners que coincidan.",
      "Es la pieza clave para:",
      "**Comunicación entre módulos** sin acoplarlos.",
      "**Simular** eventos del usuario en tests.",
      "**Emitir eventos personalizados** en un patrón *publish/subscribe*.",
      "⚠️ **Importante:**",
      "El argumento debe ser un `Event` (o subclase como `CustomEvent`).",
      "**No** es lo mismo que `element.click()`, que simula una acción del usuario real.",
      "Los eventos creados con `new Event()` **no burbujean** por defecto → hay que indicarlo.",
      "`isTrusted` siempre será `false` en eventos despachados manualmente.",
    ],
    "paraQueSirve": [
      "📡 **Emitir eventos personalizados** desde cualquier objeto.",
      "🔗 **Comunicación entre módulos** (patrón pub/sub).",
      "🧪 **Simular eventos** en tests unitarios.",
      "🎛️ **Disparar** callbacks registrados con `addEventListener`.",
      "🌐 **Sincronizar** estado entre componentes.",
      "🔄 **Notificar** cambios globales.",
      "🎮 **Activar** acciones desde código.",
      "🧩 **Desacoplar** lógica de UI.",
    ],
    "comoFunciona": [
      "Recibe **un objeto **`Event` (o subclase).",
      "Busca **todos los listeners** registrados para ese `type` en el target.",
      "Ejecuta los listeners en **orden de registro** (fase target).",
      "Si el evento **burbujea** (`bubbles: true`), sube por el árbol.",
      "Devuelve: `true` → si **ningún** listener llamó a `preventDefault()`. `false` → si **alguno** llamó a `preventDefault()`.",
      "Si el evento se despacha sobre `window`, llega a los listeners globales.",
      "Si es `cancelable: true` → se puede prevenir su comportamiento por defecto.",
      "⚠️ **Importante:**",
      "`dispatchEvent()` **no dispara** eventos nativos (ej: no provoca un `click` real).",
      "Los eventos deben ser **creados** con `new Event()` o `new CustomEvent()`.",
      "`isTrusted` siempre será `false` en eventos despachados con JS.",
    ],
    "sintaxis": [
      {
        "code": "target.dispatchEvent(evento)",
      },
      {
        "caption": "🔸 Crear un evento",
        "code": "new Event(tipo, opciones)\nnew CustomEvent(tipo, opciones)",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "code": "// ❌ Pasar string\nwindow.dispatchEvent(\"miEvento\"); // TypeError\n\n// ✅ Crear Event\nwindow.dispatchEvent(new Event(\"miEvento\"));\n\n// ❌ Datos con Event normal\nconst e = new Event(\"datos\", { detail: { x: 1 } }); // ⚠️ detail se ignora\n\n// ✅ Con CustomEvent\nconst e = new CustomEvent(\"datos\", { detail: { x: 1 } });\n\n// ❌ Sin bubbles\nhijo.dispatchEvent(new Event(\"test\"));\nbody.addEventListener(\"test\", ...); // ❌ no se ejecuta\n\n// ✅ Con bubbles\nhijo.dispatchEvent(new Event(\"test\", { bubbles: true }));\n\n// ❌ Sin cancelable\nconst e = new Event(\"test\"); // cancelable por defecto: false\ne.preventDefault(); // ❌ no tendrá efecto\n\n// ✅ Con cancelable\nconst e = new Event(\"test\", { cancelable: true });",
      },
      {
        "titulo": "🔸 isTrusted siempre false",
        "code": "window.addEventListener(\"click\", (e) => {\n  console.log(e.isTrusted); // false si viene de dispatchEvent\n                            // true si viene del usuario real\n});\n\nwindow.dispatchEvent(new MouseEvent(\"click\"));",
      },
      {
        "titulo": "🔸 dispatchEvent no simula comportamiento real",
        "code": "// ❌ No envía un formulario\nform.dispatchEvent(new Event(\"submit\"));\n\n// ✅ Para eso:\nform.requestSubmit();\n\n// ❌ No hace click real\nboton.dispatchEvent(new MouseEvent(\"click\"));\n\n// ✅ Para eso:\nboton.click();",
      },
      {
        "titulo": "🔸 Datos en CustomEvent",
        "code": "// ✅ detail acepta cualquier valor serializable\nnew CustomEvent(\"datos\", { detail: { id: 1, nombre: \"Ana\" } });\nnew CustomEvent(\"datos\", { detail: [1, 2, 3] });\nnew CustomEvent(\"datos\", { detail: \"texto\" });\n\n// ⚠️ detail no es serializable por defecto en todos los contextos\n// (ej: postMessage sí, pero dispatchEvent no lo requiere)",
      },
      {
        "titulo": "🔸 Orden de ejecución",
        "code": "window.addEventListener(\"test\", () => console.log(\"A\"));\nwindow.addEventListener(\"test\", () => console.log(\"B\"));\n\nwindow.dispatchEvent(new Event(\"test\"));\n// A\n// B\n// (orden de registro, no de prioridad)",
      },
    ],
    "errores": [
      "Pasar un string en vez de `Event` → ❌ `TypeError` | Olvidar `bubbles: true` → ⚠️ No sube por el árbol | Creer que simula eventos reales → ⚠️ `isTrusted` siempre `false` | Esperar que dispare eventos nativos → ❌ No provoca `click`, `submit`, etc. | No usar `CustomEvent` para datos → ⚠️ `Event` no acepta `detail` | Olvidar `cancelable: true` → ⚠️ `preventDefault()` no funcionará | Usar `dispatchEvent` en `null` → `TypeError` | Esperar error si no hay listeners → ❌ Devuelve `true` silenciosamente | Asumir orden de ejecución → ⚠️ Es el orden de **registro** | No limpiar listeners → ⚠️ Puede causar fugas de memoria",
    ],
    "casos": [
      "📡 **Patrón pub/sub** en aplicaciones.",
      "🔗 **Comunicación entre módulos** desacoplados.",
      "🧪 **Simular eventos** en tests.",
      "🎛️ **Disparar** callbacks registrados.",
      "🌗 **Notificar** cambios de tema.",
      "🛒 **Notificar** cambios en el carrito.",
      "🔔 **Emitir** eventos de aplicación.",
    ],
    "relacion": [
      "`addEventListener()` → Registra listeners",
      "`removeEventListener()` → Elimina listeners",
      "`CustomEvent` → Evento con `detail`",
      "`Event` → Evento base",
      "`EventTarget` → Objetos que pueden emitir/escuchar",
      "`preventDefault()` → Cancela si `cancelable: true`",
      "`stopPropagation()` → Detiene la propagación",
    ],
    "analogia": "Imagina que `window` es la **plaza del pueblo** 🏛️ y `dispatchEvent` es el **megáfono** 📢. Cuando **alguien grita** por el megáfono (`dispatchEvent`), **todos los vecinos** que estén escuchando ese tipo de grito reaccionan. El mensaje puede incluir **detalles** (`detail`) → no solo el tipo de grito, sino también \"qué pasó\". Puedes **decidir** si el grito se **repite por todo el pueblo** (`bubbles`) o solo lo oyen los del lugar. Puedes **cancelar** el grito si alguien dice \"no\" (`preventDefault`). 🎯 Es como **enviar un mensaje por radio** a quien quiera escuchar, sin saber quién está al otro lado → **desacoplamiento** total. ⚠️ Pero el megáfono **no es mágico**: no hace sonar el timbre de una casa (`click`), solo grita el mensaje.",
    "fuente": "📘 MDN – EventTarget.dispatchEvent() 📗 MDN – CustomEvent 📕 DOM Standard – dispatchEvent 📙 MDN – Creating and triggering events",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de dispatchEvent?",
        "opciones": [
          "elemento.dispatchEvent(evento)",
          "elemento.removeEventListener(tipo, listener, opciones)",
          "evento.preventDefault()",
          "elemento.addEventListener(tipo, listener, opciones)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor dispatchEvent?",
        "opciones": [
          "removeEventListener() es un método del DOM API que permite eliminar un manejador de eventos previamente registrado con addEventListener()…",
          "Es un método del DOM que despacha (lanza) un evento desde un objeto (window, un elemento, etc.), ejecutando todos los listeners registrados…",
          "preventDefault() es un método del objeto Event en JavaScript que cancela el comportamiento predeterminado del navegador para un evento…",
          "addEventListener() es un método del DOM API que permite registrar una función (callback) para que sea ejecutada cuando ocurra un evento…",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve dispatchEvent?",
        "opciones": [
          "Prevenir memory leaks al eliminar referencias a elementos DOM.",
          "📡 Emitir eventos personalizados desde cualquier objeto.",
          "Prevenir el envío automático de formularios.",
          "Responder a interacciones del usuario: clicks, teclado, mouse, touch, etc.",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a dispatchEvent?",
        "opciones": [
          "Pasar un string en vez de Event → TypeError | Olvidar bubbles: true → No sube por el árbol | Creer que simula eventos reales →…",
          "Usar funciones anónimas: No se pueden remover porque no hay referencia.",
          "Llamar preventDefault() demasiado tarde: Si se llama después de que la acción ya comenzó, puede no tener efecto.",
          "No remover listeners: Pueden causar memory leaks, especialmente en SPAs o frameworks.",
        ],
        "correcta": 0,
      },
    ],
  },
  "ev-preventdefault": {
    "id": "ev-preventdefault",
    "titulo": "preventDefault",
    "icon": "🛑",
    "categoria": "Eventos y diálogos",
    "firma": "evento.preventDefault()",
    "simulador": "eventos",
    "definicion": [
      "`preventDefault()` es un método del objeto **Event** en JavaScript que cancela el **comportamiento predeterminado** del navegador para un evento específico, sin detener su propagación.",
    ],
    "queEs": [
      "Es un método que indica al navegador que **no ejecute** la acción que normalmente realizaría cuando ocurre un evento.",
      "Por ejemplo, evita que un formulario se envíe al hacer clic en `submit`, o que un enlace navegue a otra página.",
      "Es una herramienta fundamental para crear experiencias de usuario personalizadas y controladas.",
    ],
    "paraQueSirve": [
      "Prevenir el **envío automático de formularios**.",
      "Evitar la **navegación** al hacer clic en enlaces.",
      "Impedir la **selección de texto** en elementos.",
      "Bloquear el **scroll** con eventos de rueda o teclado.",
      "Controlar eventos de **arrastrar y soltar** (drag & drop).",
      "Cancelar el **context menu** (clic derecho) para crear menús personalizados.",
      "Prevenir **comportamientos táctiles** predeterminados en dispositivos móviles.",
      "Crear **aplicaciones SPA** con navegación controlada.",
    ],
    "comoFunciona": [
      "Cuando un evento ocurre, el navegador tiene una **acción por defecto** asociada:",
      "`click` en un enlace → navega a la URL",
      "`submit` en un formulario → envía los datos al servidor",
      "`keydown` en una tecla → inserta el carácter en un input",
      "`contextmenu` → muestra el menú contextual",
      "`mousedown` → permite seleccionar texto",
      "`preventDefault()` **cancela** esa acción.",
      "El evento sigue propagándose (burbujeo y captura), pero el comportamiento predeterminado del navegador no ocurre.",
      "**Importante**: El método debe ser llamado **antes** de que la acción por defecto se ejecute. Generalmente se llama al inicio del manejador de eventos.",
    ],
    "sintaxis": [
      {
        "code": "event.preventDefault()",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "code": "// 1. Prevenir envío de formulario\nconst form = document.querySelector('#miFormulario');\nform.addEventListener('submit', (event) => {\n  event.preventDefault(); // Evita que se envíe al servidor\n  console.log('Formulario validado, enviando con fetch...');\n  // Enviar datos con fetch en su lugar\n});\n\n// 2. Prevenir navegación en enlaces\nconst link = document.querySelector('a[href=\"#\"]');\nlink.addEventListener('click', (event) => {\n  event.preventDefault(); // No navega a # (no hace scroll)\n  console.log('Link clickeado pero sin navegación');\n});\n\n// 3. Prevenir menú contextual (clic derecho)\ndocument.addEventListener('contextmenu', (event) => {\n  event.preventDefault(); // No muestra el menú contextual\n  console.log('Mostrando menú personalizado');\n  // Mostrar un menú custom\n});\n\n// 4. Prevenir selección de texto\ndocument.addEventListener('selectstart', (event) => {\n  event.preventDefault(); // Evita que el usuario seleccione texto\n  console.log('Selección de texto bloqueada');\n});\n\n// 5. Prevenir comportamiento de teclas específicas\nconst input = document.querySelector('#inputNumerico');\ninput.addEventListener('keydown', (event) => {\n  // Permitir solo números\n  if (!/^[0-9]$/.test(event.key) &&\n      event.key !== 'Backspace' &&\n      event.key !== 'Delete' &&\n      event.key !== 'Tab') {\n    event.preventDefault(); // No inserta el carácter\n    console.log('Tecla no permitida:', event.key);\n  }\n});\n\n// 6. Prevenir scroll con teclas\ndocument.addEventListener('keydown', (event) => {\n  if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {\n    event.preventDefault(); // No hace scroll con flechas\n    console.log('Scroll con teclas bloqueado');\n  }\n});\n\n// 7. Prevenir comportamiento táctil (touch)\nelement.addEventListener('touchmove', (event) => {\n  event.preventDefault(); // No hace scroll táctil\n  console.log('Scrolling táctil bloqueado');\n}, { passive: false }); // Nota: debe ser no-pasivo\n\n// 8. Verificar si el evento se puede prevenir\nconst link = document.querySelector('a');\nlink.addEventListener('click', (event) => {\n  if (event.cancelable) {\n    event.preventDefault(); // Solo si es cancelable\n  }\n});\n\n// 9. Verificar si ya fue prevenido\nbutton.addEventListener('click', (event) => {\n  if (!event.defaultPrevented) {\n    event.preventDefault();\n    // Solo ejecutar si no fue prevenido antes\n  }\n});\n\n// 10. Drag & Drop - prevenir drop en área no permitida\nconst dropZone = document.querySelector('#dropZone');\ndropZone.addEventListener('dragover', (event) => {\n  event.preventDefault(); // Necesario para permitir drop\n});\ndropZone.addEventListener('drop', (event) => {\n  event.preventDefault(); // Evita que el navegador abra el archivo\n  console.log('Archivo soltado en zona permitida');\n});",
      },
    ],
    "errores": [
      "**Llamar **`preventDefault()`** demasiado tarde**: Si se llama después de que la acción ya comenzó, puede no tener efecto.",
      {
        "texto": "**Usar en eventos no cancelables**: Algunos eventos no se pueden prevenir (ej: `load`, `scroll` con `passive: true`).",
        "code": "// ❌ No funcionará si el evento no es cancelable\ndocument.addEventListener('scroll', (event) => {\n  event.preventDefault(); // No hace nada\n});",
      },
      {
        "texto": "**Confundir con **`stopPropagation()`: `preventDefault()` no detiene la propagación, solo cancela el comportamiento por defecto.",
        "code": "// preventDefault() - cancela comportamiento por defecto\n// stopPropagation() - detiene la propagación del evento\n// Ambos pueden usarse juntos\nevent.preventDefault();\nevent.stopPropagation();",
      },
      "**Olvidar **`return false`: En algunos frameworks antiguos, `return false` hace ambas cosas (preventDefault + stopPropagation).",
      "**No verificar **`event.cancelable`: Puedes intentar prevenir un evento que no es cancelable.",
      {
        "texto": "**Usar en eventos **`passive`: No puedes usar `preventDefault()` en eventos con `{ passive: true }`.",
        "code": "// ❌ Error: no se puede llamar a preventDefault en evento pasivo\nelement.addEventListener('touchstart', (event) => {\n  event.preventDefault(); // Lanza error\n}, { passive: true });\n\n// ✅ Para usar preventDefault, establece passive: false\nelement.addEventListener('touchstart', (event) => {\n  event.preventDefault();\n}, { passive: false });",
      },
    ],
    "casos": [
      "**Formularios con validación AJAX**:",
      "Código: form.addEventListener('submit', async (event) => {",
      "**SPA con navegación sin recarga**:",
      "Código: document.querySelectorAll('a[data-spa]').forEach(link => {",
      "**Componentes de arrastre**:",
      "Código: const draggable = document.querySelector('.draggable');",
      "**Menú contextual personalizado**:",
    ],
    "relacion": [
      "`stopPropagation()`: Detiene la propagación del evento (burbujeo/captura), pero **no** previene el comportamiento por defecto.",
      "`stopImmediatePropagation()`: Como `stopPropagation()` pero también detiene otros listeners en el mismo elemento.",
      "`event.defaultPrevented`: Propiedad para verificar si `preventDefault()` fue llamado.",
      "`event.cancelable`: Propiedad que indica si el evento puede ser cancelado.",
      "`return false`: En manejadores tradicionales (`onclick`), equivale a `preventDefault() + stopPropagation()`.",
      "**Eventos pasivos**: Con `{ passive: true }`, `preventDefault()` es ignorado y puede lanzar warning/error.",
    ],
    "analogia": "Imagina que estás en un restaurante y le pides al mesero (`evento`) que te traiga la cuenta. El comportamiento por defecto del mesero sería traerte la cuenta y esperar tu pago. Pero si dices **\"espera, no me traigas la cuenta todavía\"** (`preventDefault()`), el mesero no trae la cuenta (comportamiento por defecto cancelado), pero la conversación sigue (el evento sigue propagándose a otros oyentes).",
    "fuente": "MDN Web Docs – Event.preventDefault() WHATWG DOM Specification MDN – Event.cancelable MDN – Event.defaultPrevented",
    "notasPersonales": [
      "**Siempre al inicio**: Llama `preventDefault()` al principio del manejador, especialmente si hay código asíncrono, para asegurar que el comportamiento por defecto se cancele antes de que ocurra.",
      "**Eventos pasivos**: Si usas `{ passive: true }` (común en scroll/touch para mejorar rendimiento), **no puedes** usar `preventDefault()`. Si necesitas cancelar, usa `{ passive: false }`.",
      "`defaultPrevented`** útil en delegación**:",
      "Código: container.addEventListener('click', (event) => {",
      "`cancelable`** como guardia**:",
      "Código: if (event.cancelable) {",
      "**Diferencias con **`return false`: En listeners modernos, `return false` **no** hace nada, debes usar `event.preventDefault()`.",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de preventDefault?",
        "opciones": [
          "elemento.addEventListener(tipo, listener, opciones)",
          "evento.preventDefault()",
          "elemento.dispatchEvent(evento)",
          "elemento.removeEventListener(tipo, listener, opciones)",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor preventDefault?",
        "opciones": [
          "preventDefault() es un método del objeto Event en JavaScript que cancela el comportamiento predeterminado del navegador para un evento…",
          "addEventListener() es un método del DOM API que permite registrar una función (callback) para que sea ejecutada cuando ocurra un evento…",
          "Es un método del DOM que despacha (lanza) un evento desde un objeto (window, un elemento, etc.), ejecutando todos los listeners registrados…",
          "removeEventListener() es un método del DOM API que permite eliminar un manejador de eventos previamente registrado con addEventListener()…",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve preventDefault?",
        "opciones": [
          "Responder a interacciones del usuario: clicks, teclado, mouse, touch, etc.",
          "Prevenir el envío automático de formularios.",
          "📡 Emitir eventos personalizados desde cualquier objeto.",
          "Prevenir memory leaks al eliminar referencias a elementos DOM.",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a preventDefault?",
        "opciones": [
          "Pasar un string en vez de Event → TypeError | Olvidar bubbles: true → No sube por el árbol | Creer que simula eventos reales →…",
          "No remover listeners: Pueden causar memory leaks, especialmente en SPAs o frameworks.",
          "Llamar preventDefault() demasiado tarde: Si se llama después de que la acción ya comenzó, puede no tener efecto.",
          "Usar funciones anónimas: No se pueden remover porque no hay referencia.",
        ],
        "correcta": 2,
      },
    ],
  },
  "ev-stoppropagation": {
    "id": "ev-stoppropagation",
    "titulo": "stopPropagation",
    "icon": "🚧",
    "categoria": "Eventos y diálogos",
    "firma": "evento.stopPropagation()",
    "simulador": "eventos",
    "definicion": [
      "Método del **DOM/Event** que evita que un evento continúe propagándose hacia otros elementos de la estructura DOM.",
    ],
    "queEs": [
      "`stopPropagation()` es un método del objeto `Event` que detiene la **propagación de un evento**.",
      "Por ejemplo, si haces clic en un botón que está dentro de un `<div>`, el clic puede llegar primero al botón y después propagarse al `<div>`.",
      "Con `stopPropagation()` puedes decir:",
      "🛑 \"Este evento no siga propagándose hacia otros elementos.\"",
    ],
    "paraQueSirve": [
      "Principalmente para evitar que un evento de un elemento hijo active también los manejadores de eventos de sus elementos padre.",
    ],
    "comoFunciona": [
      "Supongamos:",
      "Y ambos tienen un evento `click`:",
      "Al hacer clic en el botón:",
      "Se ejecutarán:",
      "Pero si hacemos:",
      "Ahora:",
      "Resultado:",
      "El evento no continúa hacia el padre.",
    ],
    "sintaxis": [
      {
        "code": "event.stopPropagation();",
      },
      {
        "caption": "Normalmente se utiliza dentro de un event listener:",
        "code": "element.addEventListener(\"click\", (event) => {\n\tevent.stopPropagation();\n});",
      },
      {
        "caption": "Parámetros",
        "code": "event.stopPropagation();",
      },
      {
        "caption": "Retorno",
        "code": "undefined",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "descripcion": "**Ejemplo básico:**",
        "code": "const boton=document.querySelector(\"button\");\nboton.addEventListener(\"click\", (event) => {\n\tevent.stopPropagation();\n});\n\nconst modal=document.querySelector(\".modal\");\nconst cerrar=document.querySelector(\".cerrar\");\nmodal.addEventListener(\"click\", () => {\n\t\tconsole.log(\"Cerrar modal\");\n});\ncerrar.addEventListener(\"click\", (event) => {\n\t\tevent.stopPropagation();\n\t\tconsole.log(\"Botón de cerrar\");\n});",
      },
    ],
    "errores": [
      {
        "texto": "**1. Confundirlo con **`preventDefault()` Son cosas diferentes: ➡️ Detiene la **propagación del evento**. ➡️ Evita la **acción predeterminada del navegador**. Ejemplo:",
        "code": "event.stopPropagation();\n\nevent.preventDefault();\n\nstopPropagation()\n→ 🛑 evento no sigue viajando\n\npreventDefault()\n→ 🛑 navegador no ejecuta su acción predeterminada",
      },
      {
        "texto": "**2. Pensar que elimina el evento** No elimina el listener. Solo detiene la propagación del **evento actual**.",
        "code": "event.stopPropagation();",
      },
      "**3. Confundirlo con **`stopImmediatePropagation()` `stopPropagation()` evita que el evento continúe propagándose hacia otros elementos. `stopImmediatePropagation()` además evita que se ejecuten otros listeners que estén asociados al **mismo elemento** para ese evento.",
    ],
    "casos": [
      "Modales.",
      "Menús desplegables.",
      "Botones dentro de elementos clicables.",
      "Tarjetas (`cards`) con eventos.",
      "Interfaces con elementos anidados.",
      "Evitar que eventos de elementos hijos activen eventos de sus padres.",
      "Controlar la propagación durante la **delegación de eventos**.",
    ],
    "relacion": [
      "`stopPropagation()` pertenece al sistema de **eventos del DOM**:",
      "La relación más importante es con **event bubbling**:",
      "Cuando el evento sube desde el elemento objetivo hacia sus padres, `stopPropagation()` puede detener ese recorrido.",
    ],
    "analogia": "Imagina que un mensaje 📢 está pasando de persona en persona: `stopPropagation()` es como decir: 🛑 **\"El mensaje termina aquí.\"** Por eso: = **detén la propagación del evento.**",
    "fuente": "MDN — Event.stopPropagation()",
    "notasPersonales": [
      "`stopPropagation()`** → detiene la propagación de un evento hacia otros elementos.**",
      "🧠 Para memorizar:",
      "**Clave:** no cancela la acción predeterminada del navegador; para eso está `preventDefault()`.",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de stopPropagation?",
        "opciones": [
          "evento.stopPropagation()",
          "elemento.addEventListener(tipo, listener, opciones)",
          "elemento.dispatchEvent(evento)",
          "elemento.removeEventListener(tipo, listener, opciones)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor stopPropagation?",
        "opciones": [
          "addEventListener() es un método del DOM API que permite registrar una función (callback) para que sea ejecutada cuando ocurra un evento…",
          "Método del DOM/Event que evita que un evento continúe propagándose hacia otros elementos de la estructura DOM.",
          "Es un método del DOM que despacha (lanza) un evento desde un objeto (window, un elemento, etc.), ejecutando todos los listeners registrados…",
          "removeEventListener() es un método del DOM API que permite eliminar un manejador de eventos previamente registrado con addEventListener()…",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve stopPropagation?",
        "opciones": [
          "Principalmente para evitar que un evento de un elemento hijo active también los manejadores de eventos de sus elementos padre.",
          "Responder a interacciones del usuario: clicks, teclado, mouse, touch, etc.",
          "📡 Emitir eventos personalizados desde cualquier objeto.",
          "Prevenir memory leaks al eliminar referencias a elementos DOM.",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a stopPropagation?",
        "opciones": [
          "No remover listeners: Pueden causar memory leaks, especialmente en SPAs o frameworks.",
          "1. Confundirlo con preventDefault() Son cosas diferentes: ➡️ Detiene la propagación del evento. ➡️ Evita la acción predeterminada…",
          "Pasar un string en vez de Event → TypeError | Olvidar bubbles: true → No sube por el árbol | Creer que simula eventos reales →…",
          "Usar funciones anónimas: No se pueden remover porque no hay referencia.",
        ],
        "correcta": 1,
      },
    ],
  },
  "ev-stopimmediatepropagation": {
    "id": "ev-stopimmediatepropagation",
    "titulo": "stopImmediatePropagation",
    "icon": "⛔",
    "categoria": "Eventos y diálogos",
    "firma": "evento.stopImmediatePropagation()",
    "simulador": "eventos",
    "definicion": [
      "`stopImmediatePropagation()` es un **método de **`Event` que detiene **inmediatamente la propagación de un evento y evita que se ejecuten otros listeners del mismo evento**.",
    ],
    "queEs": [
      "Cuando ocurre un evento, pueden existir varios listeners:",
      "Si dentro de `funcion1` haces:",
      "se detiene el evento **en ese momento**:",
    ],
    "paraQueSirve": [
      "Sirve cuando quieres impedir:",
      "🛑 Que otros listeners del **mismo elemento** se ejecuten.",
      "🛑 Que el evento continúe propagándose hacia otros elementos.",
      "Es una versión más fuerte de `stopPropagation()`.",
    ],
    "comoFunciona": [
      "Supongamos:",
      "Al hacer clic:",
      "Y `Listener 2`** no se ejecuta**.",
      "Además, el evento tampoco continúa hacia los elementos superiores.",
    ],
    "sintaxis": [
      {
        "code": "event.stopImmediatePropagation();",
      },
      {
        "caption": "Parámetros",
        "code": "stopImmediatePropagation()",
      },
      {
        "caption": "Retorno",
        "code": "undefined",
      },
      {
        "caption": "💡 Ejemplo: diferencia fundamental",
        "code": "elemento.addEventListener(\"click\",funcion1);\nelemento.addEventListener(\"click\",funcion2);",
      },
      {
        "caption": "stopPropagation()",
        "code": "event.stopPropagation();",
      },
    ],
    "nota": "`stopPropagation()`** → detiene el viaje.** `stopImmediatePropagation()`** → detiene el viaje + los demás listeners.**",
    "ejemplos": [
      {
        "titulo": "Ejemplo básico",
        "code": "evento.stopImmediatePropagation()",
      },
    ],
    "errores": [
      "⚠️ Revisa la firma y el tipo de valor que devuelve.",
    ],
    "casos": [
      "Puede ser útil cuando tienes varios listeners y uno de ellos debe **bloquear completamente el procesamiento posterior de ese evento**.",
      "Por ejemplo:",
    ],
    "relacion": [
      "Y se relaciona directamente con:",
    ],
    "analogia": "Imagina un mensaje que está pasando por una cadena de personas 📢: `stopPropagation()`: \"¡Ya no pases el mensaje a la siguiente persona!\" Pero las personas que están **en el mismo lugar y escuchando el mismo mensaje** podrían seguir reaccionando. `stopImmediatePropagation()`: \"¡Se acabó! Nadie más procesa este mensaje y tampoco continúa hacia adelante.\" 🛑",
    "fuente": "Apuntes personales · Notion",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de stopImmediatePropagation?",
        "opciones": [
          "elemento.dispatchEvent(evento)",
          "elemento.removeEventListener(tipo, listener, opciones)",
          "elemento.addEventListener(tipo, listener, opciones)",
          "evento.stopImmediatePropagation()",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor stopImmediatePropagation?",
        "opciones": [
          "removeEventListener() es un método del DOM API que permite eliminar un manejador de eventos previamente registrado con addEventListener()…",
          "Es un método del DOM que despacha (lanza) un evento desde un objeto (window, un elemento, etc.), ejecutando todos los listeners registrados…",
          "addEventListener() es un método del DOM API que permite registrar una función (callback) para que sea ejecutada cuando ocurra un evento…",
          "stopImmediatePropagation() es un método de Event que detiene inmediatamente la propagación de un evento y evita que se ejecuten otros…",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve stopImmediatePropagation?",
        "opciones": [
          "Prevenir memory leaks al eliminar referencias a elementos DOM.",
          "📡 Emitir eventos personalizados desde cualquier objeto.",
          "Responder a interacciones del usuario: clicks, teclado, mouse, touch, etc.",
          "Sirve cuando quieres impedir: 🛑 Que otros listeners del mismo elemento se ejecuten.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿En qué caso de uso encaja stopImmediatePropagation?",
        "opciones": [
          "Confirmar eliminación de archivos.",
          "Mensajes temporales durante el desarrollo.",
          "📡 Patrón pub/sub en aplicaciones.",
          "Puede ser útil cuando tienes varios listeners y uno de ellos debe bloquear completamente el procesamiento posterior de ese evento.",
        ],
        "correcta": 3,
      },
    ],
  },
  "dlg-alert": {
    "id": "dlg-alert",
    "titulo": "window.alert()",
    "icon": "🚨",
    "categoria": "Eventos y diálogos",
    "firma": "window.alert(mensaje)",
    "simulador": "dialogos",
    "definicion": [
      "`window.alert()` es un **método de la API Web** que muestra un cuadro de diálogo (ventana emergente) con un mensaje y un botón **Aceptar**.",
      "Su ejecución **detiene temporalmente** el resto del código hasta que el usuario cierre la ventana.",
    ],
    "queEs": [
      "Es un **método del objeto **`window`, proporcionado por el navegador.",
      "Forma parte de la **Web API (Browser API)**, **no del lenguaje JavaScript**.",
      "Se utiliza para mostrar mensajes simples al usuario.",
      "Como `window` es el objeto global del navegador, también puede escribirse simplemente como:",
      "En realidad, el navegador interpreta:",
    ],
    "paraQueSirve": [
      "Se utiliza para:",
      "Mostrar mensajes informativos.",
      "Avisar al usuario sobre algún evento.",
      "Depurar código de forma rápida.",
      "Confirmar visualmente que una parte del programa se ejecutó.",
    ],
    "comoFunciona": [
      "JavaScript llama al método `alert()`.",
      "El navegador crea una ventana emergente.",
      "Se muestra el mensaje indicado.",
      "El usuario hace clic en **Aceptar**.",
      "Recién entonces el programa continúa ejecutándose.",
      "Es un método **bloqueante (blocking)** porque pausa la ejecución del código mientras el cuadro de diálogo permanece abierto.",
    ],
    "sintaxis": [
      {
        "code": "window.alert(mensaje);",
      },
      {
        "caption": "o simplemente:",
        "code": "alert(mensaje);",
      },
      {
        "caption": "Valor de retorno",
        "code": "undefined",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Mostrar un mensaje",
        "code": "alert(\"Hola Mundo\");",
      },
      {
        "titulo": "Usando window",
        "code": "window.alert(\"Bienvenido\");",
      },
      {
        "titulo": "Mostrar una variable",
        "code": "let nombre=\"Josué\";\nalert(nombre);",
      },
      {
        "titulo": "Mostrar una operación",
        "code": "alert(10+5);\n\n15",
      },
      {
        "titulo": "Mostrar el contenido de un objeto",
        "code": "const usuario= {\n    nombre:\"Ana\"\n};\nalert(JSON.stringify(usuario));\n\n{\"nombre\":\"Ana\"}",
      },
    ],
    "errores": [
      {
        "texto": "❌ Creer que pertenece a JavaScript — Muchos piensan que es parte del lenguaje JavaScript. ✅ En realidad pertenece a la **Web API del navegador** (`window`).",
        "code": "alert(\"Hola\");",
      },
      {
        "texto": "❌ Usar muchos `alert()` — Esto obliga al usuario a cerrar una ventana tras otra y genera una mala experiencia.",
        "code": "alert(\"1\");\nalert(\"2\");\nalert(\"3\");\nalert(\"4\");",
      },
      {
        "texto": "❌ Pensar que devuelve un valor — Resultado:",
        "code": "let resultado=alert(\"Hola\");\nconsole.log(resultado);\n\nundefined",
      },
      "❌ Usarlo para interfaces modernas — Actualmente es preferible usar: Modales personalizados. Notificaciones. Componentes visuales (Bootstrap, SweetAlert, etc.).",
    ],
    "casos": [
      "Mensajes temporales durante el desarrollo.",
      "Enseñanza y ejemplos básicos.",
      "Pruebas rápidas.",
      "Confirmar que una función se ejecutó.",
      "No es recomendable para aplicaciones profesionales debido a su carácter bloqueante y su apariencia limitada.",
    ],
    "relacion": [
      "**Objeto **`window` → `alert()` es uno de sus métodos.",
      "**Web APIs** → Forma parte de las APIs proporcionadas por el navegador.",
      "`confirm()` → Muestra un cuadro con **Aceptar** y **Cancelar**.",
      "`prompt()` → Solicita información al usuario mediante un campo de texto.",
      "**DOM** → En aplicaciones reales suele ser mejor actualizar la página mediante el DOM que usar `alert()`.",
    ],
    "analogia": "Imagina que un profesor detiene toda la clase para hacer un anuncio importante. Mientras el profesor habla: Nadie continúa trabajando. Todos deben prestar atención. La clase solo continúa cuando termina el anuncio. Así funciona `alert()`: **detiene temporalmente la ejecución del programa hasta que el usuario pulse \"Aceptar\"**.",
    "fuente": "Documentación oficial de MDN: https://developer.mozilla.org/docs/Web/API/Window/alert Especificación HTML (WHATWG): https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-alert-dev",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de window.alert()?",
        "opciones": [
          "window.alert(mensaje)",
          "elemento.addEventListener(tipo, listener, opciones)",
          "elemento.removeEventListener(tipo, listener, opciones)",
          "elemento.dispatchEvent(evento)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor window.alert()?",
        "opciones": [
          "addEventListener() es un método del DOM API que permite registrar una función (callback) para que sea ejecutada cuando ocurra un evento…",
          "removeEventListener() es un método del DOM API que permite eliminar un manejador de eventos previamente registrado con addEventListener()…",
          "window.alert() es un método de la API Web que muestra un cuadro de diálogo (ventana emergente) con un mensaje y un botón Aceptar.",
          "Es un método del DOM que despacha (lanza) un evento desde un objeto (window, un elemento, etc.), ejecutando todos los listeners registrados…",
        ],
        "correcta": 2,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve window.alert()?",
        "opciones": [
          "Responder a interacciones del usuario: clicks, teclado, mouse, touch, etc.",
          "Prevenir memory leaks al eliminar referencias a elementos DOM.",
          "Se utiliza para: Mostrar mensajes informativos.",
          "📡 Emitir eventos personalizados desde cualquier objeto.",
        ],
        "correcta": 2,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a window.alert()?",
        "opciones": [
          "Usar funciones anónimas: No se pueden remover porque no hay referencia.",
          "No remover listeners: Pueden causar memory leaks, especialmente en SPAs o frameworks.",
          "Creer que pertenece a JavaScript — Muchos piensan que es parte del lenguaje JavaScript. En realidad pertenece a la Web API del…",
          "Pasar un string en vez de Event → TypeError | Olvidar bubbles: true → No sube por el árbol | Creer que simula eventos reales →…",
        ],
        "correcta": 2,
      },
    ],
  },
  "dlg-confirm": {
    "id": "dlg-confirm",
    "titulo": "window.confirm()",
    "icon": "✅",
    "categoria": "Eventos y diálogos",
    "firma": "window.confirm(mensaje)",
    "simulador": "dialogos",
    "definicion": [
      "`window.confirm()` es un **método de la API Web** que muestra un cuadro de diálogo con un mensaje y dos botones: **Aceptar** y **Cancelar**.",
      "Devuelve un valor booleano (`true` o `false`) según la opción elegida por el usuario.",
    ],
    "queEs": [
      "Es un **método del objeto **`window` proporcionado por el navegador.",
      "Forma parte de la **Web API (Browser API)**, **no del lenguaje JavaScript**.",
      "Permite solicitar una confirmación antes de realizar una acción importante.",
      "Al igual que `alert()`, el objeto `window` puede omitirse:",
      "Es equivalente a:",
    ],
    "paraQueSirve": [
      "Se utiliza para:",
      "Confirmar la eliminación de datos.",
      "Preguntar si el usuario desea continuar una acción.",
      "Evitar acciones accidentales.",
      "Obtener una respuesta rápida de tipo **Sí o No** (Aceptar o Cancelar).",
    ],
    "comoFunciona": [
      "JavaScript llama al método `confirm()`.",
      "El navegador muestra una ventana con un mensaje.",
      "El usuario elige **Aceptar** o **Cancelar**.",
      "El método devuelve: `true` si presiona **Aceptar**. `false` si presiona **Cancelar**.",
      "El programa continúa ejecutándose.",
      "Al igual que `alert()`, es un método **bloqueante (blocking)**, ya que pausa la ejecución del código hasta que el usuario responda.",
    ],
    "sintaxis": [
      {
        "code": "window.confirm(mensaje);",
      },
      {
        "caption": "o simplemente:",
        "code": "confirm(mensaje);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Confirmación básica",
        "code": "const respuesta=confirm(\"¿Deseas continuar?\");\nconsole.log(respuesta);",
      },
      {
        "titulo": "Usando una condición",
        "code": "if (confirm(\"¿Eliminar este archivo?\")) {\n\t\tconsole.log(\"Archivo eliminado\");\n}\nelse {console.log(\"Operación cancelada\");\n}",
      },
      {
        "titulo": "Guardando el resultado",
        "code": "let aceptar=confirm(\"¿Aceptas los términos?\");\nconsole.log(aceptar);\n\ntrue\n\nfalse",
      },
      {
        "titulo": "Con window",
        "code": "window.confirm(\"¿Cerrar sesión?\");",
      },
    ],
    "errores": [
      {
        "texto": "❌ Creer que pertenece a JavaScript — Aunque se escribe así, en realidad pertenece a la **Web API del navegador** (`window`).",
        "code": "confirm(\"¿Continuar?\");",
      },
      {
        "texto": "❌ Ignorar el valor devuelto — Si no se guarda o utiliza el resultado, la respuesta del usuario no tiene ningún efecto. Lo correcto sería:",
        "code": "confirm(\"¿Eliminar?\");\n\nif (confirm(\"¿Eliminar?\")) {\n\teliminarArchivo();\n}",
      },
      "❌ Usarlo excesivamente — Mostrar muchas ventanas de confirmación puede resultar molesto y empeorar la experiencia del usuario.",
      {
        "texto": "❌ Pensar que devuelve texto — ❌ Incorrecto pensar que devuelve `\"Aceptar\"` o `\"Cancelar\"`. ✅ Devuelve únicamente: o",
        "code": "let respuesta=confirm(\"¿Continuar?\");\n\ntrue\n\nfalse",
      },
    ],
    "casos": [
      "Confirmar eliminación de archivos.",
      "Confirmar cierre de sesión.",
      "Preguntar antes de enviar un formulario.",
      "Confirmar compras o pagos.",
      "Evitar acciones irreversibles.",
    ],
    "relacion": [
      "**Objeto **`window` → `confirm()` es uno de sus métodos.",
      "**Web APIs** → Forma parte de las APIs del navegador.",
      "`alert()` → Muestra un mensaje sin esperar una decisión.",
      "`prompt()` → Solicita un dato al usuario.",
      "**Booleanos (**`true`** y **`false`**)** → `confirm()` devuelve un valor booleano.",
      "**Estructuras de control (**`if`**, **`else`**)** → Se usan junto con `confirm()` para decidir el flujo del programa.",
    ],
    "analogia": "Imagina que un cajero te pregunta: **\"¿Seguro que deseas cancelar esta compra?\"** Tienes dos opciones: ✅ **Aceptar** → La compra se cancela. ❌ **Cancelar** → No ocurre ningún cambio. Eso hace `confirm()`: presenta una decisión y devuelve un **sí (**`true`**) o un no (**`false`**)** para que el programa actúe en consecuencia.",
    "fuente": "Documentación oficial de MDN: https://developer.mozilla.org/docs/Web/API/Window/confirm Especificación HTML (WHATWG): https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-confirm-dev",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de window.confirm()?",
        "opciones": [
          "elemento.dispatchEvent(evento)",
          "elemento.removeEventListener(tipo, listener, opciones)",
          "elemento.addEventListener(tipo, listener, opciones)",
          "window.confirm(mensaje)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor window.confirm()?",
        "opciones": [
          "removeEventListener() es un método del DOM API que permite eliminar un manejador de eventos previamente registrado con addEventListener()…",
          "Es un método del DOM que despacha (lanza) un evento desde un objeto (window, un elemento, etc.), ejecutando todos los listeners registrados…",
          "addEventListener() es un método del DOM API que permite registrar una función (callback) para que sea ejecutada cuando ocurra un evento…",
          "window.confirm() es un método de la API Web que muestra un cuadro de diálogo con un mensaje y dos botones: Aceptar y Cancelar.",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve window.confirm()?",
        "opciones": [
          "📡 Emitir eventos personalizados desde cualquier objeto.",
          "Prevenir memory leaks al eliminar referencias a elementos DOM.",
          "Responder a interacciones del usuario: clicks, teclado, mouse, touch, etc.",
          "Se utiliza para: Confirmar la eliminación de datos.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a window.confirm()?",
        "opciones": [
          "Pasar un string en vez de Event → TypeError | Olvidar bubbles: true → No sube por el árbol | Creer que simula eventos reales →…",
          "No remover listeners: Pueden causar memory leaks, especialmente en SPAs o frameworks.",
          "Usar funciones anónimas: No se pueden remover porque no hay referencia.",
          "Creer que pertenece a JavaScript — Aunque se escribe así, en realidad pertenece a la Web API del navegador (window).",
        ],
        "correcta": 3,
      },
    ],
  },
  "dlg-prompt": {
    "id": "dlg-prompt",
    "titulo": "window.prompt()",
    "icon": "❓",
    "categoria": "Eventos y diálogos",
    "firma": "window.prompt(mensaje, valorPorDefecto)",
    "simulador": "dialogos",
    "definicion": [
      "`window.prompt()` es un **método de la API Web** que muestra un cuadro de diálogo con un mensaje y un campo de texto para que el usuario ingrese información.",
      "Devuelve el texto introducido o `null` si el usuario presiona **Cancelar**.",
    ],
    "queEs": [
      "Es un **método del objeto **`window` proporcionado por el navegador.",
      "Forma parte de la **Web API (Browser API)**, **no del lenguaje JavaScript**.",
      "Permite solicitar datos al usuario de forma sencilla mediante una ventana emergente.",
      "Como `window` es el objeto global del navegador, puede escribirse simplemente como:",
      "Es equivalente a:",
    ],
    "paraQueSirve": [
      "Se utiliza para:",
      "Solicitar el nombre de un usuario.",
      "Pedir una edad, correo o cualquier dato de texto.",
      "Obtener información rápida durante pruebas o ejercicios.",
      "Enseñar conceptos básicos de entrada de datos.",
    ],
    "comoFunciona": [
      "JavaScript llama al método `prompt()`.",
      "El navegador muestra una ventana con: Un mensaje. Un campo de texto. Los botones **Aceptar** y **Cancelar**.",
      "El usuario escribe un valor.",
      "Si presiona **Aceptar**, el método devuelve el texto ingresado.",
      "Si presiona **Cancelar**, devuelve `null`.",
      "El programa continúa ejecutándose.",
      "Al igual que `alert()` y `confirm()`, `prompt()` es un método **bloqueante (blocking)**, ya que pausa la ejecución del código hasta que el usuario responda.",
    ],
    "sintaxis": [
      {
        "code": "window.prompt(mensaje);",
      },
      {
        "caption": "o",
        "code": "window.prompt(mensaje,valorPorDefecto);",
      },
      {
        "caption": "También puede escribirse sin window:",
        "code": "prompt(mensaje);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Solicitar un nombre",
        "code": "const nombre=prompt(\"¿Cómo te llamas?\");\nconsole.log(nombre);",
      },
      {
        "titulo": "Usar un valor por defecto",
        "code": "const ciudad=prompt(\"¿En qué ciudad vives?\",\"Lima\");\nconsole.log(ciudad);",
      },
      {
        "titulo": "Verificar si el usuario canceló",
        "code": "const nombre=prompt(\"Ingresa tu nombre\");\n\tif (nombre===null) {\n\t\tconsole.log(\"El usuario canceló.\");\n}\n\telse {\n\t\tconsole.log(\"Hola, \"+nombre);\n}",
      },
      {
        "titulo": "Convertir a número",
        "code": "const edad= Number(prompt(\"¿Cuántos años tienes?\"));\nconsole.log(edad+1);",
      },
      {
        "titulo": "Pedir dos números y sumarlos",
        "code": "const a=Number(prompt(\"Primer número:\"));\ncons tb=Number(prompt(\"Segundo número:\"));\nalert(a+b);",
      },
    ],
    "errores": [
      {
        "texto": "❌ Creer que pertenece a JavaScript — Aunque se utiliza directamente, pertenece a la **Web API del navegador** (`window`).",
        "code": "prompt(\"Nombre\");",
      },
      {
        "texto": "❌ Olvidar que devuelve un `string` — Si el usuario escribe: El resultado será: Porque `\"20\"` es una cadena de texto. ✅ Lo correcto es convertirlo: Resultado:",
        "code": "const edad=prompt(\"Edad\");\nconsole.log(edad+1);\n\n20\n\n201\n\nconst edad=Number(prompt(\"Edad\"));\nconsole.log(edad+1);\n\n21",
      },
      {
        "texto": "❌ No comprobar si devuelve `null` — Si el usuario pulsa **Cancelar**, aparecerá un error porque `nombre` será `null`. Lo correcto:",
        "code": "const nombre=prompt(\"Nombre\");\nconsole.log(nombre.toUpperCase());\n\nif (nombre!==null) {\n\tconsole.log(nombre.toUpperCase());\n}",
      },
      "❌ Usarlo para formularios modernos — `prompt()` es útil para aprendizaje y pruebas, pero no para interfaces profesionales. Es preferible utilizar formularios HTML o componentes personalizados.",
    ],
    "casos": [
      "Ejercicios de programación.",
      "Solicitar datos rápidos.",
      "Prototipos sencillos.",
      "Pruebas durante el desarrollo.",
      "Demostraciones educativas.",
    ],
    "relacion": [
      "**Objeto **`window` → `prompt()` es uno de sus métodos.",
      "**Web APIs** → Forma parte de las APIs del navegador.",
      "`alert()` → Muestra un mensaje sin solicitar información.",
      "`confirm()` → Solicita una respuesta de tipo **Aceptar** o **Cancelar**.",
      "**Tipo **`string` → `prompt()` devuelve texto.",
      "**Conversión de tipos** → Se suele usar `Number()`, `parseInt()` o `parseFloat()` para convertir la entrada.",
      "**DOM** → En aplicaciones reales, los formularios HTML suelen reemplazar el uso de `prompt()`.",
    ],
    "analogia": "Imagina que un recepcionista te entrega un formulario y te dice: **\"Por favor, escribe tu nombre.\"** Tú puedes: ✍️ Escribir tu nombre y entregar el formulario (**devuelve un **`string`). ❌ Decidir no llenarlo y cancelar (**devuelve **`null`). Así funciona `prompt()`: solicita información al usuario y devuelve el dato introducido o `null` si se cancela la operación.",
    "fuente": "Documentación oficial de MDN: https://developer.mozilla.org/docs/Web/API/Window/prompt Especificación HTML (WHATWG): https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#dom-prompt-dev",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de window.prompt()?",
        "opciones": [
          "elemento.dispatchEvent(evento)",
          "elemento.removeEventListener(tipo, listener, opciones)",
          "elemento.addEventListener(tipo, listener, opciones)",
          "window.prompt(mensaje, valorPorDefecto)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor window.prompt()?",
        "opciones": [
          "Es un método del DOM que despacha (lanza) un evento desde un objeto (window, un elemento, etc.), ejecutando todos los listeners registrados…",
          "removeEventListener() es un método del DOM API que permite eliminar un manejador de eventos previamente registrado con addEventListener()…",
          "addEventListener() es un método del DOM API que permite registrar una función (callback) para que sea ejecutada cuando ocurra un evento…",
          "window.prompt() es un método de la API Web que muestra un cuadro de diálogo con un mensaje y un campo de texto para que el usuario ingrese…",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve window.prompt()?",
        "opciones": [
          "Prevenir memory leaks al eliminar referencias a elementos DOM.",
          "📡 Emitir eventos personalizados desde cualquier objeto.",
          "Responder a interacciones del usuario: clicks, teclado, mouse, touch, etc.",
          "Se utiliza para: Solicitar el nombre de un usuario.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a window.prompt()?",
        "opciones": [
          "Pasar un string en vez de Event → TypeError | Olvidar bubbles: true → No sube por el árbol | Creer que simula eventos reales →…",
          "No remover listeners: Pueden causar memory leaks, especialmente en SPAs o frameworks.",
          "Usar funciones anónimas: No se pueden remover porque no hay referencia.",
          "Creer que pertenece a JavaScript — Aunque se utiliza directamente, pertenece a la Web API del navegador (window).",
        ],
        "correcta": 3,
      },
    ],
  },
};
