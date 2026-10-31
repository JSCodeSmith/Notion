/* Generado desde src/ApuntesFormatoHtml — no editar a mano.
   Regenerar con: node scripts/generate-apuntes.mjs */

export const JS_DOM_SELECCION = {
  "id": "dom-seleccion",
  "label": "DOM · Selección",
  "icon": "🔎",
  "titulo": "Selección de elementos del DOM",
  "descripcion": "Encuentra nodos y elementos en el documento con getElementById, querySelector y las colecciones HTML.",
  "grupos": [
    {
      "seccion": "Selección de elementos",
      "metodos": [
        {
          "id": "dom-getelementbyid",
          "nombre": "getElementById",
          "firma": "document.getElementById(id)",
          "icon": "🎯",
        },
        {
          "id": "dom-getelementsbyclassname",
          "nombre": "getElementsByClassName",
          "firma": "document.getElementsByClassName(clases)",
          "icon": "🧺",
        },
        {
          "id": "dom-getelementsbytagname",
          "nombre": "getElementsByTagName",
          "firma": "document.getElementsByTagName(etiqueta)",
          "icon": "🏷️",
        },
        {
          "id": "dom-queryselector",
          "nombre": "querySelector",
          "firma": "document.querySelector(selector)",
          "icon": "🔍",
        },
        {
          "id": "dom-queryselectorall",
          "nombre": "querySelectorAll",
          "firma": "document.querySelectorAll(selector)",
          "icon": "🗂️",
        },
      ],
    },
  ],
};

export const JS_DOM_SELECCION_DOCS = {
  "dom-getelementbyid": {
    "id": "dom-getelementbyid",
    "titulo": "getElementById",
    "icon": "🎯",
    "categoria": "DOM · Selección",
    "firma": "document.getElementById(id)",
    "simulador": "dom",
    "definicion": [
      "Es un método del DOM (Document Object Model) que permite acceder a un elemento HTML mediante su atributo `id`.",
      "Es una de las formas más rápidas y directas de seleccionar elementos en una página web.",
    ],
    "queEs": [
      "Es un método nativo de JavaScript que forma parte del objeto `document`.",
      "Busca en todo el documento HTML y devuelve el elemento que tenga el `id` especificado.",
      "Dado que los `id` deben ser únicos en una página, este método siempre devuelve un único elemento (o `null` si no lo encuentra).",
    ],
    "paraQueSirve": [
      "**Manipular el DOM**: Cambiar contenido, atributos, estilos o clases de un elemento.",
      "**Acceder a valores**: Obtener valores de inputs, checkboxes, selects, etc.",
      "**Eventos**: Asignar manejadores de eventos a elementos específicos.",
      "**Animaciones y efectos**: Modificar dinámicamente elementos para crear interacciones.",
    ],
    "comoFunciona": [
      "El motor de JavaScript del navegador recibe el llamado a `document.getElementById()`.",
      "Recorre el árbol DOM buscando un elemento cuyo atributo `id` coincida con el string proporcionado.",
      "Si encuentra el elemento, lo devuelve como un objeto de tipo `Element` (o `HTMLElement`).",
      "Si no lo encuentra, devuelve `null`.",
      "**Nota**: La búsqueda es case-sensitive (distingue mayúsculas y minúsculas).",
    ],
    "sintaxis": [
      {
        "code": "document.getElementById(id)",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Básico",
        "code": "Hola mundo\n\nconst caja = document.getElementById('miCaja');\nconsole.log(caja.textContent); // \"Hola mundo\"",
      },
      {
        "titulo": "Cambiar estilo",
        "code": "const titulo = document.getElementById('titulo');\ntitulo.style.color = 'red';\ntitulo.style.fontSize = '24px';",
      },
      {
        "titulo": "Obtener valor de input",
        "code": "const input = document.getElementById('nombre');\nconsole.log(input.value); // \"Juan\"",
      },
      {
        "titulo": "Asignar evento",
        "code": "const boton = document.getElementById('btnEnviar');\nboton.addEventListener('click', function() {\n    alert('¡Botón clickeado!');\n});",
      },
      {
        "titulo": "Verificar existencia",
        "code": "const elemento = document.getElementById('noExiste');\nif (elemento !== null) {\n    // Hacer algo\n} else {\n    console.log('Elemento no encontrado');\n}",
      },
    ],
    "errores": [
      {
        "texto": "**Incluir el **`#`:",
        "code": "// ❌ INCORRECTO\ndocument.getElementById('#miId');\n\n// ✅ CORRECTO\ndocument.getElementById('miId');",
      },
      {
        "texto": "**Ejecutar antes de que el DOM esté cargado**: **Solución**: Colocar el script al final del `<body>` o usar `DOMContentLoaded`.",
        "code": "// ❌ Puede devolver null si el elemento aún no existe\n    const el = document.getElementById('miElemento');",
      },
      "**IDs duplicados**: Aunque HTML permite IDs duplicados (no es válido), `getElementById` solo devolverá el **primer** elemento encontrado.",
      {
        "texto": "**Case-sensitivity**:",
        "code": "// Si el id es 'MiId' (con mayúscula)\ndocument.getElementById('miid'); // ❌ null\ndocument.getElementById('MiId'); // ✅ correcto",
      },
    ],
    "casos": [
      "**Formularios** → Obtener valores de campos para validación o envío.",
      "**Menús/NAVs** → Cambiar clase activa en navegación.",
      "**Modales/Popups** → Abrir/cerrar ventanas emergentes.",
      "**Sliders/Carrousels** → Controlar elementos de presentación.",
      "**SPA (Single Page Apps)** → Actualizar contenido dinámicamente.",
      "**Validación en tiempo real** → Verificar inputs mientras el usuario escribe.",
    ],
    "relacion": [
      "`querySelector()` → Más flexible (usa selectores CSS), pero más lento.",
      "`querySelectorAll()` → Devuelve todos los elementos que coinciden (NodeList).",
      "`getElementsByClassName()` → Devuelve colección de elementos por clase (más lento).",
      "`getElementsByTagName()` → Devuelve colección por nombre de etiqueta.",
      "`children`** / **`parentNode` → Navegación por el árbol DOM.",
      "`createElement()` → Crear nuevos elementos, complementario para manipulación.",
    ],
    "analogia": "Imagina que el documento HTML es un **edificio de oficinas**. Cada oficina tiene un **número único** (el `id`). `document.getElementById()` es como un **recepcionista** que, cuando le das un número de oficina, te lleva directamente a esa oficina sin tener que buscar piso por piso. Es rápido, directo y eficiente.",
    "fuente": "MDN Web Docs - document.getElementById W3Schools - getElementById Especificación DOM Living Standard - WHATWG",
    "notasPersonales": [
      "**Rendimiento**: Es el método más rápido para seleccionar un elemento porque los navegadores mantienen un mapa interno de IDs.",
      "**Compatibilidad**: Funciona en todos los navegadores desde versiones muy antiguas (IE 5.5+).",
      "**Buenas prácticas**: Guarda referencias a elementos si los usas varias veces para evitar consultas repetidas al DOM. Usa IDs semánticos y descriptivos (ej: `btnEnviar`, `inputEmail`). Para proyectos grandes, considera usar `querySelector()` o frameworks como React/Vue para mejor organización.",
      "**Alternativa moderna**: En frameworks modernos, el acceso directo al DOM se reduce, pero sigue siendo útil para scripts simples, prototipos o casos específicos.",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de getElementById?",
        "opciones": [
          "document.getElementById(id)",
          "document.querySelector(selector)",
          "document.getElementsByClassName(clases)",
          "document.getElementsByTagName(etiqueta)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor getElementById?",
        "opciones": [
          "Es un método del DOM que permite seleccionar todos los elementos que tengan una clase CSS específica, devolviendo una HTMLCollection viva…",
          "Es un método del DOM (Document Object Model) que permite acceder a un elemento HTML mediante su atributo id.",
          "Es un método del DOM que permite seleccionar el primer elemento que coincida con un selector CSS válido.",
          "Es un método del DOM que permite seleccionar todos los elementos que tengan una etiqueta HTML específica, devolviendo una HTMLCollection…",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve getElementById?",
        "opciones": [
          "Selección por clase: Obtener todos los elementos con una clase específica.",
          "Manipular el DOM: Cambiar contenido, atributos, estilos o clases de un elemento.",
          "Selección flexible: Usa cualquier selector CSS (clases, IDs, atributos, pseudo-clases, etc.)",
          "Selección por etiqueta: Obtener todos los elementos de un tipo específico (ej: todos los div, todos los p).",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿En qué caso de uso encaja getElementById?",
        "opciones": [
          "Formularios → Obtener valores de campos para validación o envío.",
          "Tarjetas/Productos → document.getElementsByClassName('producto')",
          "Formularios → document.querySelector('#formulario input[type=\"submit\"]')",
          "Todas las imágenes → document.getElementsByTagName('img') para lazy loading",
        ],
        "correcta": 0,
      },
    ],
  },
  "dom-getelementsbyclassname": {
    "id": "dom-getelementsbyclassname",
    "titulo": "getElementsByClassName",
    "icon": "🧺",
    "categoria": "DOM · Selección",
    "firma": "document.getElementsByClassName(clases)",
    "simulador": "dom",
    "definicion": [
      "Es un método del DOM que permite seleccionar **todos los elementos** que tengan una clase CSS específica, devolviendo una **HTMLCollection** viva (live) con los resultados.",
    ],
    "queEs": [
      "Es un método nativo de JavaScript disponible en el objeto `document`.",
      "Busca en todo el documento y devuelve una colección de todos los elementos que contengan la clase especificada.",
      "Es uno de los métodos de selección más antiguos y rápidos para buscar por clases.",
    ],
    "paraQueSirve": [
      "**Selección por clase**: Obtener todos los elementos con una clase específica.",
      "**Manipulación masiva**: Cambiar estilos, contenido o atributos de varios elementos a la vez.",
      "**Acceso rápido**: Es más rápido que `querySelectorAll()` en navegadores antiguos.",
      "**DOM dinámico**: La colección se actualiza automáticamente cuando el DOM cambia.",
      "**Compatibilidad**: Funciona en navegadores muy antiguos (desde IE 9).",
    ],
    "comoFunciona": [
      "El navegador recibe el nombre de la clase como string.",
      "Recorre el árbol DOM en busca de elementos que contengan esa clase.",
      "Devuelve una **HTMLCollection** (similar a un array) con los elementos encontrados.",
      "La colección es **viva (live)** → se actualiza automáticamente si el DOM cambia.",
      "**Características importantes**:",
      "La HTMLCollection es **viva**: refleja cambios en el DOM en tiempo real.",
      "No es un array, pero es **iterable** y tiene índice numérico.",
      "La búsqueda es **case-sensitive** (distingue mayúsculas/minúsculas).",
      "Puede buscar **múltiples clases** separadas por espacio.",
    ],
    "sintaxis": [
      {
        "code": "document.getElementsByClassName(names)\n// También disponible en elementos específicos:\nelement.getElementsByClassName(names)",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Básico - Una clase",
        "code": "Texto 1\nTexto 2\nTexto 3\n\nconst elementos = document.getElementsByClassName('destacado');\nconsole.log(elementos.length); // 2\nconsole.log(elementos[0].textContent); // \"Texto 1\"",
      },
      {
        "titulo": "Múltiples clases (AND)",
        "code": "Texto 1\nTexto 2\nTexto 3\n\n// Busca elementos que tengan TODAS las clases\nconst elementos = document.getElementsByClassName('rojo grande');\nconsole.log(elementos.length); // 1 (solo el que tiene rojo Y grande)",
      },
      {
        "titulo": "Modificar todos los elementos",
        "code": "const items = document.getElementsByClassName('item');\n\n// Cambiar estilo de todos\nfor (let i = 0; i < items.length; i++) {\n    items[i].style.backgroundColor = 'yellow';\n    items[i].classList.add('resaltado');\n}",
      },
      {
        "titulo": "Desde un elemento específico",
        "code": "Hola\n    Mundo\n\nFuera del contenedor\n\nconst contenedor = document.getElementById('contenedor');\nconst textos = contenedor.getElementsByClassName('texto');\nconsole.log(textos.length); // 2 (solo los del contenedor)",
      },
      {
        "titulo": "Iterar con for...of",
        "code": "const parrafos = document.getElementsByClassName('parrafo');\n\n// For...of (moderno)\nfor (const p of parrafos) {\n    p.style.color = 'blue';\n}\n\n// Convertir a array\nconst arrayParrafos = Array.from(parrafos);\narrayParrafos.forEach(p => p.textContent = 'Modificado');",
      },
      {
        "titulo": "Verificar existencia",
        "code": "const elementos = document.getElementsByClassName('inexistente');\nif (elementos.length > 0) {\n    console.log('Hay elementos');\n} else {\n    console.log('No hay elementos');\n}",
      },
    ],
    "errores": [
      {
        "texto": "**Olvidar que es una colección, no un elemento**:",
        "code": "// ❌ Error: getElementsByClassName devuelve HTMLCollection\nconst elemento = document.getElementsByClassName('clase');\nelemento.style.color = 'red'; // TypeError\n\n// ✅ Acceder al primer elemento\nconst primerElemento = document.getElementsByClassName('clase')[0];\nprimerElemento.style.color = 'red';",
      },
      {
        "texto": "**Confundir con querySelectorAll (Colección viva vs estática)**:",
        "code": "const items = document.getElementsByClassName('item');\nconsole.log(items.length); // 2\n\n// Agregar nuevo elemento\nconst div = document.createElement('div');\ndiv.className = 'item';\ndocument.body.appendChild(div);\n\nconsole.log(items.length); // 3 (¡se actualiza automáticamente!)",
      },
      {
        "texto": "**Espacios en nombres de clase (múltiples clases)**:",
        "code": "// ❌ Busca elementos con la clase \"rojo grande\" (con espacio)\ndocument.getElementsByClassName('rojo grande');\n\n// ✅ Para una clase con espacio en el nombre (raro)\ndocument.getElementsByClassName('rojo\\\\ grande');",
      },
      {
        "texto": "**No usar el punto (.) en el selector**:",
        "code": "// ❌ INCORRECTO (es para CSS)\ndocument.getElementsByClassName('.miClase');\n\n// ✅ CORRECTO\ndocument.getElementsByClassName('miClase');",
      },
      {
        "texto": "**Modificar el DOM mientras se itera**:",
        "code": "const items = document.getElementsByClassName('item');\n// ⚠️ Cuidado: la colección es viva\nfor (let i = 0; i  0) {\n    items[0].remove();\n}",
      },
    ],
    "casos": [
      "**Tarjetas/Productos** → `document.getElementsByClassName('producto')`",
      "**Filas de tabla** → `document.getElementsByClassName('fila')`",
      "**Elementos con estado** → `document.getElementsByClassName('activo')`",
      "**Validación de formularios** → `document.getElementsByClassName('error')`",
      "**Sliders/Carrousels** → `document.getElementsByClassName('slide')`",
      "**Paginación** → `document.getElementsByClassName('pagina')`",
      "**Menús desplegables** → `document.getElementsByClassName('dropdown')`",
    ],
    "relacion": [
      "`querySelectorAll()` → Devuelve NodeList **estática** (no se actualiza), más flexible.",
      "`getElementsByTagName()` → Devuelve HTMLCollection **viva** pero por etiqueta, no clase.",
      "`getElementById()` → Devuelve un solo elemento (más rápido).",
      "`querySelector()` → Devuelve solo el primer elemento, con selectores CSS.",
      "`classList` → Para manipular clases de un elemento específico.",
      "`children` → HTMLCollection de hijos directos (solo elementos).",
      "**Comparativa de rendimiento**",
    ],
    "analogia": "`getElementsByClassName()` es como un **archivo de empleados** donde puedes buscar por el cargo. Si buscas \"ingenieros\", obtienes una lista de todos los ingenieros. Esta lista se actualiza automáticamente: si contratas un nuevo ingeniero, aparece en la lista; si uno es despedido, desaparece. La lista es como una **ventana en vivo** al conjunto de empleados con ese cargo.",
    "fuente": "MDN Web Docs - getElementsByClassName W3Schools - getElementsByClassName MDN - HTMLCollection Especificación DOM Living Standard - WHATWG",
    "notasPersonales": [
      "**Rendimiento**: Es el método más rápido para buscar por clase en navegadores antiguos. En navegadores modernos, la diferencia con `querySelectorAll()` es mínima.",
      "**Colección Viva (Live) vs Estática**: **Ventaja**: Refleja cambios automáticamente, útil para DOM dinámico. **Desventaja**: Puede causar bugs si iteras y modificas la colección al mismo tiempo. **Consejo**: Si no necesitas la actualización automática, convierte a array con `Array.from()`.",
      "**Buenas prácticas**:",
      "Código: // ✅ Guardar en variable",
      "**Compatibilidad**: Disponible en todos los navegadores modernos. IE 9+ tiene soporte completo. `for...of` no está disponible en navegadores muy antiguos.",
      "**Limitaciones**: Solo busca por clase (no por otros selectores). No soporta selectores complejos como `querySelectorAll()`. La búsqueda de múltiples clases requiere que el elemento tenga **todas** (operación AND).",
      "**Alternativas modernas**:",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de getElementsByClassName?",
        "opciones": [
          "document.getElementsByClassName(clases)",
          "document.getElementById(id)",
          "document.querySelector(selector)",
          "document.getElementsByTagName(etiqueta)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor getElementsByClassName?",
        "opciones": [
          "Es un método del DOM que permite seleccionar todos los elementos que tengan una clase CSS específica, devolviendo una HTMLCollection viva…",
          "Es un método del DOM (Document Object Model) que permite acceder a un elemento HTML mediante su atributo id.",
          "Es un método del DOM que permite seleccionar el primer elemento que coincida con un selector CSS válido.",
          "Es un método del DOM que permite seleccionar todos los elementos que tengan una etiqueta HTML específica, devolviendo una HTMLCollection…",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve getElementsByClassName?",
        "opciones": [
          "Manipular el DOM: Cambiar contenido, atributos, estilos o clases de un elemento.",
          "Selección flexible: Usa cualquier selector CSS (clases, IDs, atributos, pseudo-clases, etc.)",
          "Selección por clase: Obtener todos los elementos con una clase específica.",
          "Selección por etiqueta: Obtener todos los elementos de un tipo específico (ej: todos los div, todos los p).",
        ],
        "correcta": 2,
      },
      {
        "id": 4,
        "pregunta": "¿En qué caso de uso encaja getElementsByClassName?",
        "opciones": [
          "Formularios → document.querySelector('#formulario input[type=\"submit\"]')",
          "Formularios → Obtener valores de campos para validación o envío.",
          "Tarjetas/Productos → document.getElementsByClassName('producto')",
          "Todas las imágenes → document.getElementsByTagName('img') para lazy loading",
        ],
        "correcta": 2,
      },
    ],
  },
  "dom-getelementsbytagname": {
    "id": "dom-getelementsbytagname",
    "titulo": "getElementsByTagName",
    "icon": "🏷️",
    "categoria": "DOM · Selección",
    "firma": "document.getElementsByTagName(etiqueta)",
    "simulador": "dom",
    "definicion": [
      "Es un método del DOM que permite seleccionar **todos los elementos** que tengan una etiqueta HTML específica, devolviendo una **HTMLCollection viva (live)** con los resultados.",
    ],
    "queEs": [
      "Es un método nativo de JavaScript disponible en el objeto `document`.",
      "Busca en todo el documento y devuelve una colección de todos los elementos con la etiqueta (tag name) especificada.",
      "Es uno de los métodos de selección más antiguos y rápidos para buscar por tipo de elemento.",
    ],
    "paraQueSirve": [
      "**Selección por etiqueta**: Obtener todos los elementos de un tipo específico (ej: todos los `div`, todos los `p`).",
      "**Manipulación masiva**: Cambiar estilos, contenido o atributos de varios elementos del mismo tipo.",
      "**Acceso rápido**: Es uno de los métodos más rápidos para seleccionar elementos.",
      "**DOM dinámico**: La colección se actualiza automáticamente cuando el DOM cambia.",
      "**Compatibilidad**: Funciona en todos los navegadores, incluyendo versiones muy antiguas (desde IE 6).",
    ],
    "comoFunciona": [
      "El navegador recibe el nombre de la etiqueta como string.",
      "Recorre el árbol DOM en busca de elementos con esa etiqueta.",
      "Devuelve una **HTMLCollection** (similar a un array) con los elementos encontrados.",
      "La colección es **viva (live)** → se actualiza automáticamente si el DOM cambia.",
      "**Características importantes**:",
      "La HTMLCollection es **viva**: refleja cambios en el DOM en tiempo real.",
      "No es un array, pero es **iterable** y tiene índice numérico.",
      "La búsqueda es **case-insensitive** en HTML (no distingue mayúsculas/minúsculas).",
      "El comodín selecciona **todos** los elementos del documento.",
    ],
    "sintaxis": [
      {
        "code": "document.getElementsByTagName(tagName)\n// También disponible en elementos específicos:\nelement.getElementsByTagName(tagName)",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Básico - Una etiqueta",
        "code": "Párrafo 1\nPárrafo 2\nDiv 1\n\nconst parrafos = document.getElementsByTagName('p');\nconsole.log(parrafos.length); // 2\nconsole.log(parrafos[0].textContent); // \"Párrafo 1\"",
      },
      {
        "titulo": "Seleccionar todos los elementos de un tipo",
        "code": "// Todos los divs\nconst divs = document.getElementsByTagName('div');\n\n// Todos los inputs\nconst inputs = document.getElementsByTagName('input');\n\n// Todos los enlaces\nconst enlaces = document.getElementsByTagName('a');",
      },
      {
        "titulo": "Comodín (todos los elementos)",
        "code": "const todosLosElementos = document.getElementsByTagName('*');\nconsole.log(todosLosElementos.length); // Todos los elementos del documento",
      },
      {
        "titulo": "Desde un elemento específico",
        "code": "Texto 1\n    Texto 2\n    Span\n\nFuera del contenedor\n\nconst contenedor = document.getElementById('contenedor');\nconst parrafos = contenedor.getElementsByTagName('p');\nconsole.log(parrafos.length); // 2 (solo los del contenedor)",
      },
      {
        "titulo": "Modificar todos los elementos",
        "code": "const parrafos = document.getElementsByTagName('p');\n\n// Cambiar estilo de todos\nfor (let i = 0; i < parrafos.length; i++) {\n    parrafos[i].style.color = 'blue';\n    parrafos[i].style.fontSize = '18px';\n}",
      },
      {
        "titulo": "Iterar con for...of",
        "code": "const imagenes = document.getElementsByTagName('img');\n\n// For...of (moderno)\nfor (const img of imagenes) {\n    img.style.border = '2px solid black';\n}\n\n// Convertir a array\nconst arrayImagenes = Array.from(imagenes);\narrayImagenes.forEach(img => img.alt = 'Imagen');",
      },
      {
        "titulo": "Verificar existencia",
        "code": "const elementos = document.getElementsByTagName('article');\nif (elementos.length > 0) {\n    console.log(`Hay${elementos.length} artículos`);\n} else {\n    console.log('No hay artículos');\n}",
      },
    ],
    "errores": [
      {
        "texto": "**Olvidar que es una colección, no un elemento**:",
        "code": "// ❌ Error: getElementsByTagName devuelve HTMLCollection\nconst elemento = document.getElementsByTagName('div');\nelemento.style.color = 'red'; // TypeError\n\n// ✅ Acceder al primer elemento\nconst primerDiv = document.getElementsByTagName('div')[0];\nprimerDiv.style.color = 'red';",
      },
      {
        "texto": "**Colección viva y modificación durante iteración**:",
        "code": "const divs = document.getElementsByTagName('div');\n\n// ⚠️ Cuidado: la colección es viva\nfor (let i = 0; i = 0; i--) {\n    if (divs[i].className === 'eliminar') {\n        divs[i].remove();\n    }\n}",
      },
      {
        "texto": "**No usar comillas o usar comillas incorrectas**:",
        "code": "// ❌ INCORRECTO\ndocument.getElementsByTagName(div);\n\n// ✅ CORRECTO\ndocument.getElementsByTagName('div');",
      },
      {
        "texto": "**Case-sensitivity en XML/XHTML**:",
        "code": "// En HTML no importa, pero en XML/XHTML sí\ndocument.getElementsByTagName('Div'); // Puede no funcionar en XML\ndocument.getElementsByTagName('div'); // Recomendado",
      },
      {
        "texto": "**Confundir con querySelectorAll (no usa # ni .)**:",
        "code": "// ❌ Esto NO funciona (no es selector CSS)\ndocument.getElementsByTagName('.clase');\ndocument.getElementsByTagName('#id');\n\n// ✅ Solo nombres de etiqueta\ndocument.getElementsByTagName('div');",
      },
    ],
    "casos": [
      "**Todas las imágenes** → `document.getElementsByTagName('img')` para lazy loading",
      "**Todos los enlaces** → `document.getElementsByTagName('a')` para analytics",
      "**Todos los inputs** → `document.getElementsByTagName('input')` para validación",
      "**Todos los párrafos** → `document.getElementsByTagName('p')` para formateo",
      "**Tablas completas** → `document.getElementsByTagName('tr')` para filas",
      "**Listas** → `document.getElementsByTagName('li')` para items",
      "**Scripts** → `document.getElementsByTagName('script')` para carga dinámica",
    ],
    "relacion": [
      "`querySelectorAll()` → Devuelve NodeList **estática** (no se actualiza), más flexible.",
      "`getElementsByClassName()` → Devuelve HTMLCollection **viva** pero por clase, no etiqueta.",
      "`getElementById()` → Devuelve un solo elemento (más rápido).",
      "`querySelector()` → Devuelve solo el primer elemento, con selectores CSS.",
      "`children` → HTMLCollection de hijos directos (solo elementos).",
      "`childNodes` → NodeList de todos los nodos hijos (incluye texto).",
      "**Comparativa de rendimiento**",
    ],
    "analogia": "`getElementsByTagName()` es como un **catálogo de una biblioteca** donde puedes buscar por tipo de material. Si buscas \"libros\", obtienes una lista de todos los libros. Esta lista se actualiza automáticamente: si añades un nuevo libro, aparece; si retiras uno, desaparece. La lista es como una **ventana en vivo** al conjunto de materiales de ese tipo.",
    "fuente": "MDN Web Docs - getElementsByTagName W3Schools - getElementsByTagName MDN - HTMLCollection Especificación DOM Living Standard - WHATWG",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de getElementsByTagName?",
        "opciones": [
          "document.getElementsByTagName(etiqueta)",
          "document.getElementsByClassName(clases)",
          "document.getElementById(id)",
          "document.querySelector(selector)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor getElementsByTagName?",
        "opciones": [
          "Es un método del DOM que permite seleccionar todos los elementos que tengan una clase CSS específica, devolviendo una HTMLCollection viva…",
          "Es un método del DOM que permite seleccionar todos los elementos que tengan una etiqueta HTML específica, devolviendo una HTMLCollection…",
          "Es un método del DOM (Document Object Model) que permite acceder a un elemento HTML mediante su atributo id.",
          "Es un método del DOM que permite seleccionar el primer elemento que coincida con un selector CSS válido.",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve getElementsByTagName?",
        "opciones": [
          "Selección por etiqueta: Obtener todos los elementos de un tipo específico (ej: todos los div, todos los p).",
          "Manipular el DOM: Cambiar contenido, atributos, estilos o clases de un elemento.",
          "Selección por clase: Obtener todos los elementos con una clase específica.",
          "Selección flexible: Usa cualquier selector CSS (clases, IDs, atributos, pseudo-clases, etc.)",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿En qué caso de uso encaja getElementsByTagName?",
        "opciones": [
          "Todas las imágenes → document.getElementsByTagName('img') para lazy loading",
          "Formularios → Obtener valores de campos para validación o envío.",
          "Tarjetas/Productos → document.getElementsByClassName('producto')",
          "Formularios → document.querySelector('#formulario input[type=\"submit\"]')",
        ],
        "correcta": 0,
      },
    ],
  },
  "dom-queryselector": {
    "id": "dom-queryselector",
    "titulo": "querySelector",
    "icon": "🔍",
    "categoria": "DOM · Selección",
    "firma": "document.querySelector(selector)",
    "simulador": "dom",
    "definicion": [
      "Es un método del DOM que permite seleccionar el **primer elemento** que coincida con un selector CSS válido.",
      "Es parte de la API de selección moderna y reemplaza en muchos casos a métodos más antiguos.",
    ],
    "queEs": [
      "Es un método nativo de JavaScript disponible en el objeto `document` que utiliza **selectores CSS** para encontrar elementos.",
      "Devuelve el primer elemento que coincida con el selector proporcionado, o `null` si no encuentra ninguno.",
    ],
    "paraQueSirve": [
      "**Selección flexible**: Usa cualquier selector CSS (clases, IDs, atributos, pseudo-clases, etc.)",
      "**Manipulación del DOM**: Cambiar contenido, estilos, atributos de elementos específicos.",
      "**Acceso a elementos**: Obtener el primer elemento que cumple ciertas condiciones.",
      "**Alternativa moderna**: Reemplaza a `getElementById`, `getElementsByClassName`, etc.",
    ],
    "comoFunciona": [
      "El navegador recibe el selector CSS como string.",
      "Recorre el árbol DOM en **orden de profundidad** (primero en el documento).",
      "Devuelve el **primer elemento** que coincida con el selector.",
      "Si no hay coincidencias, retorna `null`.",
      "**Nota**: La búsqueda es en tiempo real y respeta la jerarquía del DOM.",
    ],
    "sintaxis": [
      {
        "code": "document.querySelector(selector)",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Básico - Por ID",
        "code": "Contenido\n\nconst caja = document.querySelector('#miCaja');\nconsole.log(caja.textContent); // \"Contenido\"",
      },
      {
        "titulo": "Por clase",
        "code": "Texto 1\nTexto 2\n\nconst primero = document.querySelector('.destacado');\nconsole.log(primero.textContent); // \"Texto 1\" (solo el primero)",
      },
      {
        "titulo": "Por etiqueta",
        "code": "const primerParrafo = document.querySelector('p');",
      },
      {
        "titulo": "Selectores complejos",
        "code": "Admin\n    Usuario\n\n// Elemento con atributo específico\nconst admin = document.querySelector('[data-role=\"admin\"]');\n\n// Selector anidado\nconst item = document.querySelector('#contenedor .lista li:first-child');\n\n// Pseudo-clase\nconst primerElemento = document.querySelector('div:first-child');",
      },
      {
        "titulo": "Modificar estilos y contenido",
        "code": "const titulo = document.querySelector('.titulo-principal');\ntitulo.textContent = 'Nuevo título';\ntitulo.style.backgroundColor = 'blue';\ntitulo.classList.add('activo');",
      },
      {
        "titulo": "Validar existencia",
        "code": "const elemento = document.querySelector('.clase-inexistente');\nif (elemento) {\n    // Existe\n} else {\n    console.log('No encontrado');\n}",
      },
    ],
    "errores": [
      {
        "texto": "**Selector inválido**:",
        "code": "// ❌ Error: selector mal formado\ndocument.querySelector('div[attr=valor sin comillas]');\n\n// ✅ Correcto\ndocument.querySelector('div[attr=\"valor sin comillas\"]');",
      },
      {
        "texto": "**Olvidar el punto o #**:",
        "code": "// ❌ Busca etiqueta 'miClase'\ndocument.querySelector('miClase');\n\n// ✅ Busca clase\ndocument.querySelector('.miClase');",
      },
      {
        "texto": "**Solo devuelve el primero**:",
        "code": "// Solo obtiene el primer elemento .item\nconst item = document.querySelector('.item');\n// Para todos usar querySelectorAll",
      },
      {
        "texto": "**Ejecutar antes de que el DOM esté listo**:",
        "code": "// ❌ Puede devolver null\n    const el = document.querySelector('#elemento');",
      },
    ],
    "casos": [
      "**Formularios** → `document.querySelector('#formulario input[type=\"submit\"]')`",
      "**Navegación** → `document.querySelector('nav ul li:first-child a')`",
      "**Validación** → `document.querySelector('.input-error:first-of-type')`",
      "**Modales** → `document.querySelector('.modal:not(.hidden)')`",
      "**Selectores dinámicos** → `document.querySelector(\\`[data-id=\"${id}\"]`)`",
      "**Primer elemento de una lista** → `document.querySelector('ul li:first-child')`",
    ],
    "relacion": [
      "`querySelectorAll()` → Devuelve **todos** los elementos (NodeList), no solo el primero.",
      "`getElementById()` → Más rápido, pero solo por ID y sin el `#`.",
      "`getElementsByClassName()` → Devuelve HTMLCollection (live), solo por clase.",
      "`getElementsByTagName()` → Devuelve HTMLCollection (live), solo por etiqueta.",
      "`closest()` → Busca hacia arriba en el árbol (ancestros).",
      "`matches()` → Verifica si un elemento coincide con un selector.",
    ],
    "analogia": "`querySelector()` es como un **buscador avanzado de Google** para el DOM. Mientras que `getElementById()` es como buscar por número de documento (rápido pero específico), `querySelector()` te permite hacer búsquedas complejas como \"encuentra el primer artículo que tenga la clase 'destacado' y esté dentro de un contenedor con id 'principal'\". Es más flexible pero un poco más lento.",
    "fuente": "MDN Web Docs - document.querySelector W3Schools - querySelector Especificación DOM Living Standard - WHATWG",
    "notasPersonales": [
      "**Rendimiento**: Es más lento que `getElementById()` pero más rápido que `getElementsByClassName()` en la mayoría de navegadores modernos.",
      "**Versatilidad**: Es el método más versátil para selección simple.",
      "**Uso con templates**: Ideal para usar con template literals y selectores dinámicos.",
      "**Buenas prácticas**: Úsalo cuando necesites selectores complejos o el primer elemento de un grupo. Para selecciones múltiples, usa `querySelectorAll()`. Para IDs específicos, `getElementById()` sigue siendo más eficiente. Guarda el resultado en variable si lo usas varias veces.",
      "**Compatibilidad**: Disponible en todos los navegadores modernos (IE 8+ con soporte limitado, IE 9+ completo).",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de querySelector?",
        "opciones": [
          "document.getElementsByTagName(etiqueta)",
          "document.getElementsByClassName(clases)",
          "document.getElementById(id)",
          "document.querySelector(selector)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor querySelector?",
        "opciones": [
          "Es un método del DOM que permite seleccionar todos los elementos que tengan una clase CSS específica, devolviendo una HTMLCollection viva…",
          "Es un método del DOM que permite seleccionar todos los elementos que tengan una etiqueta HTML específica, devolviendo una HTMLCollection…",
          "Es un método del DOM (Document Object Model) que permite acceder a un elemento HTML mediante su atributo id.",
          "Es un método del DOM que permite seleccionar el primer elemento que coincida con un selector CSS válido.",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve querySelector?",
        "opciones": [
          "Manipular el DOM: Cambiar contenido, atributos, estilos o clases de un elemento.",
          "Selección por etiqueta: Obtener todos los elementos de un tipo específico (ej: todos los div, todos los p).",
          "Selección por clase: Obtener todos los elementos con una clase específica.",
          "Selección flexible: Usa cualquier selector CSS (clases, IDs, atributos, pseudo-clases, etc.)",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿En qué caso de uso encaja querySelector?",
        "opciones": [
          "Todas las imágenes → document.getElementsByTagName('img') para lazy loading",
          "Formularios → Obtener valores de campos para validación o envío.",
          "Tarjetas/Productos → document.getElementsByClassName('producto')",
          "Formularios → document.querySelector('#formulario input[type=\"submit\"]')",
        ],
        "correcta": 3,
      },
    ],
  },
  "dom-queryselectorall": {
    "id": "dom-queryselectorall",
    "titulo": "querySelectorAll",
    "icon": "🗂️",
    "categoria": "DOM · Selección",
    "firma": "document.querySelectorAll(selector)",
    "simulador": "dom",
    "definicion": [
      "Es un método del DOM que permite seleccionar **todos los elementos** que coincidan con un selector CSS válido, devolviendo una **NodeList** estática con los resultados.",
    ],
    "queEs": [
      "Es un método nativo de JavaScript que forma parte del objeto `document`.",
      "Utiliza selectores CSS para encontrar **todos** los elementos que cumplan con la condición especificada.",
      "A diferencia de `querySelector()`, este método devuelve **todos los elementos coincidentes**, no solo el primero.",
    ],
    "paraQueSirve": [
      "**Selección múltiple**: Obtener todos los elementos que cumplen una condición.",
      "**Iteración**: Recorrer y manipular colecciones de elementos.",
      "**Actualizaciones masivas**: Aplicar cambios a múltiples elementos a la vez.",
      "**Filtrado avanzado**: Usar selectores complejos para agrupar elementos específicos.",
      "**Alternativa moderna**: Reemplaza a `getElementsByClassName()` y `getElementsByTagName()`.",
    ],
    "comoFunciona": [
      "El navegador recibe el selector CSS como string.",
      "Recorre todo el árbol DOM en busca de coincidencias.",
      "Crea una **NodeList** estática con todos los elementos encontrados.",
      "Si no hay coincidencias, devuelve una NodeList **vacía** (no `null`).",
      "**Características importantes**:",
      "La NodeList es **estática**: no se actualiza si el DOM cambia después.",
      "Es **iterable**: se puede usar `for...of`, `forEach()`, `Array.from()`, etc.",
      "Es **similar a un array** pero no es un array (aunque tiene métodos como `forEach`).",
    ],
    "sintaxis": [
      {
        "code": "document.querySelectorAll(selector)",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Básico - Por clase",
        "code": "Texto 1\nTexto 2\nTexto 3\n\nconst elementos = document.querySelectorAll('.destacado');\nconsole.log(elementos.length); // 3\nconsole.log(elementos[0].textContent); // \"Texto 1\"",
      },
      {
        "titulo": "Por etiqueta",
        "code": "const todosLosDivs = document.querySelectorAll('div');\nconst todosLosParrafos = document.querySelectorAll('p');",
      },
      {
        "titulo": "Selectores complejos",
        "code": "Item 1\n  Item 2\n  Item 3\n\n// Todos los li con clase \"item\"\nconst items = document.querySelectorAll('li.item');\n\n// Todos los elementos con clase \"activo\"\nconst activos = document.querySelectorAll('.activo');\n\n// Selector anidado\nconst itemsActivos = document.querySelectorAll('ul .item.activo');",
      },
      {
        "titulo": "Iterar y manipular",
        "code": "const parrafos = document.querySelectorAll('p');\n\n// Con forEach (método de NodeList)\nparrafos.forEach((p, index) => {\n    p.style.color = 'blue';\n    p.textContent = `Párrafo${index + 1}`;\n});\n\n// Con for...of\nfor (const p of parrafos) {\n    p.classList.add('resaltado');\n}\n\n// Convertir a array para usar métodos de array\nconst arrayParrafos = Array.from(parrafos);\narrayParrafos.map(p => p.style.fontSize = '18px');",
      },
      {
        "titulo": "Filtrado avanzado",
        "code": "// Elementos con atributo específico\nconst elementosConData = document.querySelectorAll('[data-role]');\n\n// Inputs de tipo texto\nconst inputsTexto = document.querySelectorAll('input[type=\"text\"]');\n\n// Elementos pares (usando pseudo-clases)\nconst elementosPares = document.querySelectorAll('div:nth-child(even)');\n\n// Elementos que NO tienen una clase\nconst sinClase = document.querySelectorAll(':not(.activo)');",
      },
      {
        "titulo": "Ejemplo práctico: Formulario",
        "code": "// Todos los inputs requeridos\nconst requiredInputs = document.querySelectorAll('input[required]');\n\n// Validar todos\nrequiredInputs.forEach(input => {\n    if (!input.value) {\n        input.style.borderColor = 'red';\n    }\n});\n\n// Todos los checkboxes seleccionados\nconst checkboxesSeleccionados = document.querySelectorAll('input[type=\"checkbox\"]:checked');",
      },
    ],
    "errores": [
      {
        "texto": "**Usar querySelectorAll y esperar un solo elemento**:",
        "code": "// ❌ Devuelve NodeList, no un elemento\nconst elemento = document.querySelectorAll('.clase');\nelemento.style.color = 'red'; // Error\n\n// ✅ Acceder al primero\nconst primerElemento = document.querySelectorAll('.clase')[0];",
      },
      {
        "texto": "**Confundir NodeList con Array**:",
        "code": "const elementos = document.querySelectorAll('div');\n\n// ❌ No tiene todos los métodos de Array\nelementos.map(el => el.textContent); // Error en navegadores antiguos\n\n// ✅ Convertir a Array\nArray.from(elementos).map(el => el.textContent);",
      },
      {
        "texto": "**Olvidar que es estática**:",
        "code": "const items = document.querySelectorAll('li');\n// Si después agregas un nuevo li, NO se actualiza\nconst nuevoLi = document.createElement('li');\ndocument.querySelector('ul').appendChild(nuevoLi);\nconsole.log(items.length); // Sigue siendo el número original",
      },
      {
        "texto": "**Selector demasiado amplio**:",
        "code": "// Puede devolver muchos elementos y afectar rendimiento\ndocument.querySelectorAll('div'); // Todos los divs",
      },
    ],
    "casos": [
      "**Tablas** → `document.querySelectorAll('table tbody tr')`",
      "**Tarjetas/Items** → `document.querySelectorAll('.card .titulo')`",
      "**Validación de formularios** → `document.querySelectorAll('input:invalid')`",
      "**Filtrado de elementos** → `document.querySelectorAll('.producto:not(.agotado)')`",
      "**Actualización masiva** → `document.querySelectorAll('.precio').forEach(el => el.textContent = '$' + precio)`",
      "**Eventos delegados** → Combinar con `addEventListener` en contenedor padre",
      "**Paginación** → `document.querySelectorAll('.pagina:not(.oculta)')`",
    ],
    "relacion": [
      "`querySelector()` → Devuelve **solo el primer** elemento (Element o null).",
      "`getElementsByClassName()` → Devuelve HTMLCollection **viva** (se actualiza automáticamente).",
      "`getElementsByTagName()` → Devuelve HTMLCollection **viva** (se actualiza automáticamente).",
      "`children` → Devuelve HTMLCollection de hijos directos (solo elementos).",
      "`childNodes` → Devuelve NodeList de todos los nodos hijos (incluye texto).",
      "`matches()` → Verifica si un elemento específico coincide con un selector.",
      "`closest()` → Busca el ancestro más cercano que coincide.",
    ],
    "analogia": "`querySelectorAll()` es como un **filtro avanzado de búsqueda** en una tienda en línea. Mientras que `querySelector()` solo te muestra el primer producto que coincide, `querySelectorAll()` te muestra **todos los productos** que cumplen con los criterios: \"muéstrame todos los zapatos rojos de talla 42 que estén en oferta\". La lista que obtienes es una foto fija de los resultados en ese momento (estática), y puedes recorrerla para aplicar acciones a cada producto.",
    "fuente": "MDN Web Docs - document.querySelectorAll W3Schools - querySelectorAll MDN - NodeList Especificación DOM Living Standard - WHATWG",
    "notasPersonales": [
      "**Rendimiento**: Es más lento que `getElementsByClassName()` porque la NodeList es estática y requiere más procesamiento inicial. Para documentos grandes, considera usar métodos más específicos si es posible.",
      "**NodeList vs HTMLCollection**: NodeList es **estática** (no cambia) → Ideal si no esperas cambios dinámicos. HTMLCollection es **viva** (se actualiza automáticamente) → Útil para DOM dinámico.",
      "**Buenas prácticas**: Guarda la NodeList en variable si la usas varias veces. Usa `forEach()` directamente en NodeList (navegadores modernos). Para compatibilidad total, convierte a Array con `Array.from()` o `[...nodeList]`. Evita selectores muy genéricos que devuelvan miles de elementos.",
      "**Compatibilidad**: Disponible en IE 8+ (con soporte limitado para pseudo-clases). IE 9+ tiene soporte completo. `forEach()` en NodeList disponible desde Chrome 51+, Firefox 50+, Edge 14+.",
      "**Trucos útiles**:",
      "Código: // Convertir a array fácilmente",
      "**Alternativas modernas**: En frameworks como React, Vue o Angular, el uso de `querySelectorAll` disminuye porque el manejo del DOM se hace mediante el framework, pero sigue siendo útil para: Scripts de análisis (analytics). Acceso a elementos fuera del alcance del framework. Prototipos rápidos. Proyectos sin framework.",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de querySelectorAll?",
        "opciones": [
          "document.getElementsByTagName(etiqueta)",
          "document.querySelectorAll(selector)",
          "document.getElementsByClassName(clases)",
          "document.getElementById(id)",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor querySelectorAll?",
        "opciones": [
          "Es un método del DOM que permite seleccionar todos los elementos que coincidan con un selector CSS válido, devolviendo una NodeList…",
          "Es un método del DOM que permite seleccionar todos los elementos que tengan una etiqueta HTML específica, devolviendo una HTMLCollection…",
          "Es un método del DOM que permite seleccionar todos los elementos que tengan una clase CSS específica, devolviendo una HTMLCollection viva…",
          "Es un método del DOM (Document Object Model) que permite acceder a un elemento HTML mediante su atributo id.",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve querySelectorAll?",
        "opciones": [
          "Selección por etiqueta: Obtener todos los elementos de un tipo específico (ej: todos los div, todos los p).",
          "Selección múltiple: Obtener todos los elementos que cumplen una condición.",
          "Selección por clase: Obtener todos los elementos con una clase específica.",
          "Manipular el DOM: Cambiar contenido, atributos, estilos o clases de un elemento.",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿En qué caso de uso encaja querySelectorAll?",
        "opciones": [
          "Todas las imágenes → document.getElementsByTagName('img') para lazy loading",
          "Tablas → document.querySelectorAll('table tbody tr')",
          "Tarjetas/Productos → document.getElementsByClassName('producto')",
          "Formularios → Obtener valores de campos para validación o envío.",
        ],
        "correcta": 1,
      },
    ],
  },
};
