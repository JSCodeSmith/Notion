/* Generado desde src/ApuntesFormatoHtml — no editar a mano.
   Regenerar con: node scripts/generate-apuntes.mjs */

export const JS_DOM_CREACION = {
  "id": "dom-creacion",
  "label": "DOM · Creación",
  "icon": "🧱",
  "titulo": "Crear, insertar y eliminar elementos",
  "descripcion": "Construye nodos desde cero y colócalos (o quítalos) en el árbol del documento sin romper el resto.",
  "grupos": [
    {
      "seccion": "Crear nodos",
      "metodos": [
        {
          "id": "dom-createelement",
          "nombre": "createElement",
          "firma": "document.createElement(tagName)",
          "icon": "🏗️",
        },
        {
          "id": "dom-createtextnode",
          "nombre": "createTextNode()",
          "firma": "document.createTextNode(texto)",
          "icon": "✍️",
        },
      ],
    },
    {
      "seccion": "Insertar y reemplazar",
      "metodos": [
        {
          "id": "dom-append",
          "nombre": "append()",
          "firma": "elemento.append(...nodosOTexto)",
          "icon": "➕",
        },
        {
          "id": "dom-appendchild",
          "nombre": "appendChild",
          "firma": "elemento.appendChild(nodo)",
          "icon": "📎",
        },
        {
          "id": "dom-insertbefore",
          "nombre": "insertBefore",
          "firma": "elemento.insertBefore(nodo, referencia)",
          "icon": "↪️",
        },
        {
          "id": "dom-replacechildren",
          "nombre": "replaceChildren",
          "firma": "elemento.replaceChildren(...nodos)",
          "icon": "🔄",
        },
        {
          "id": "dom-replacewith",
          "nombre": "replaceWith()",
          "firma": "elemento.replaceWith(...nodos)",
          "icon": "🔁",
        },
      ],
    },
    {
      "seccion": "Eliminar",
      "metodos": [
        {
          "id": "dom-remove",
          "nombre": "remove()",
          "firma": "elemento.remove()",
          "icon": "🗑️",
        },
        {
          "id": "dom-removechild",
          "nombre": "removeChild",
          "firma": "elemento.removeChild(hijo)",
          "icon": "✂️",
        },
      ],
    },
  ],
};

export const JS_DOM_CREACION_DOCS = {
  "dom-createelement": {
    "id": "dom-createelement",
    "titulo": "createElement",
    "icon": "🏗️",
    "categoria": "DOM · Creación",
    "firma": "document.createElement(tagName)",
    "simulador": "dom",
    "definicion": [
      "Es un método del DOM que permite **crear un nuevo elemento HTML** a partir de una etiqueta especificada.",
      "El elemento se crea en memoria pero no se muestra en la página hasta que se inserta en el DOM mediante métodos como `appendChild()` o `insertBefore()`.",
    ],
    "queEs": [
      "`createElement()` es un método nativo de JavaScript disponible en el objeto `document`.",
      "Crea un nuevo nodo de tipo `Element` que representa una etiqueta HTML.",
      "Este elemento existe en memoria y puede ser manipulado (añadir atributos, contenido, estilos, eventos) antes de ser insertado en el documento.",
    ],
    "paraQueSirve": [
      "**Crear elementos dinámicamente**: Generar contenido HTML desde JavaScript.",
      "**Construir interfaces**: Crear estructuras complejas de forma programática.",
      "**Añadir contenido interactivo**: Generar elementos en respuesta a eventos del usuario.",
      "**Renderizado dinámico**: Crear listas, tablas, tarjetas a partir de datos.",
      "**Mejor rendimiento**: Construir elementos en memoria antes de insertarlos en el DOM.",
    ],
    "comoFunciona": [
      "Se especifica el nombre de la etiqueta (tag name) como string.",
      "El navegador crea un nuevo elemento en memoria.",
      "El elemento no está visible hasta que se inserta en el DOM.",
      "Se puede configurar completamente antes de la inserción.",
      "El método devuelve una referencia al elemento creado.",
      "**Características importantes**:",
      "Crea elementos en **memoria** (no en el DOM visible).",
      "Permite modificar el elemento antes de mostrarlo.",
      "Es más seguro que `innerHTML` (no hay riesgo de XSS).",
      "Mejor rendimiento para múltiples inserciones.",
      "El elemento creado es un **nodo hijo** del documento (sin padre hasta que se inserte).",
    ],
    "sintaxis": [
      {
        "code": "const elemento = document.createElement(tagName, options);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Básico - Crear y añadir un elemento",
        "code": "// Crear un nuevo párrafo\nconst parrafo = document.createElement('p');\nparrafo.textContent = 'Este es un párrafo creado con JavaScript';\n\n// Añadirlo al cuerpo del documento\ndocument.body.appendChild(parrafo);",
      },
      {
        "titulo": "Crear y configurar completamente",
        "code": "// Crear un div con contenido completo\nconst tarjeta = document.createElement('div');\ntarjeta.className = 'tarjeta';\ntarjeta.id = 'tarjeta-1';\ntarjeta.style.backgroundColor = '#f0f0f0';\ntarjeta.style.padding = '20px';\n\n// Crear elementos hijos\nconst titulo = document.createElement('h3');\ntitulo.textContent = 'Título de la tarjeta';\n\nconst descripcion = document.createElement('p');\ndescripcion.textContent = 'Esta es una descripción de ejemplo';\n\n// Agregar hijos\ntarjeta.appendChild(titulo);\ntarjeta.appendChild(descripcion);\n\n// Insertar en el DOM\ndocument.body.appendChild(tarjeta);",
      },
      {
        "titulo": "Crear listas desde datos",
        "code": "function crearLista(items) {\n    const ul = document.createElement('ul');\n    ul.className = 'lista-dinamica';\n\n    items.forEach(item => {\n        const li = document.createElement('li');\n        li.textContent = item;\n\n        // Añadir atributos\n        li.setAttribute('data-item', item.toLowerCase());\n\n        ul.appendChild(li);\n    });\n\n    return ul;\n}\n\n// Uso\nconst frutas = ['Manzana', 'Banana', 'Naranja'];\nconst lista = crearLista(frutas);\ndocument.getElementById('contenedor').appendChild(lista);",
      },
      {
        "titulo": "Crear elementos con atributos",
        "code": "function crearEnlace(url, texto, target = '_blank') {\n    const a = document.createElement('a');\n    a.href = url;\n    a.textContent = texto;\n    a.target = target;\n    a.className = 'enlace-externo';\n    a.title = `Ir a${texto}`;\n\n    return a;\n}\n\n// Uso\nconst enlace = crearEnlace('https://ejemplo.com', 'Visitar sitio');\ndocument.body.appendChild(enlace);",
      },
      {
        "titulo": "Crear inputs con eventos",
        "code": "function crearInputConValidacion(tipo, placeholder) {\n    const contenedor = document.createElement('div');\n\n    const input = document.createElement('input');\n    input.type = tipo;\n    input.placeholder = placeholder;\n    input.className = 'campo-validacion';\n\n    const mensaje = document.createElement('span');\n    mensaje.className = 'mensaje-error';\n    mensaje.style.color = 'red';\n\n    // Añadir evento de validación\n    input.addEventListener('blur', function() {\n        if (this.value.trim() === '') {\n            mensaje.textContent = 'Este campo es obligatorio';\n            contenedor.appendChild(mensaje);\n        } else {\n            mensaje.textContent = '';\n        }\n    });\n\n    contenedor.appendChild(input);\n    contenedor.appendChild(mensaje);\n    return contenedor;\n}\n\n// Uso\nconst inputEmail = crearInputConValidacion('email', 'Ingresa tu email');\ndocument.body.appendChild(inputEmail);",
      },
      {
        "titulo": "Crear elementos anidados complejos",
        "code": "function crearTarjetaProducto(producto) {\n    const card = document.createElement('div');\n    card.className = 'producto-card';\n    card.dataset.id = producto.id;\n\n    // Imagen\n    const img = document.createElement('img');\n    img.src = producto.imagen;\n    img.alt = producto.nombre;\n\n    // Contenido\n    const info = document.createElement('div');\n    info.className = 'info';\n\n    const nombre = document.createElement('h3');\n    nombre.textContent = producto.nombre;\n\n    const precio = document.createElement('p');\n    precio.className = 'precio';\n    precio.textContent = `$${producto.precio}`;\n\n    const boton = document.createElement('button');\n    boton.className = 'btn-comprar';\n    boton.textContent = 'Añadir al carrito';\n    boton.addEventListener('click', () => {\n        alert(`Añadido:${producto.nombre}`);\n    });\n\n    // Ensamblar\n    info.appendChild(nombre);\n    info.appendChild(precio);\n    info.appendChild(boton);\n\n    card.appendChild(img);\n    card.appendChild(info);\n\n    return card;\n}\n\n// Uso\nconst producto = {\n    id: 1,\n    nombre: 'Laptop',\n    precio: 999.99,\n    imagen: 'laptop.jpg'\n};\n\nconst tarjeta = crearTarjetaProducto(producto);\ndocument.getElementById('productos').appendChild(tarjeta);",
      },
      {
        "titulo": "Clonar elementos",
        "code": "// Clonar un elemento existente\nfunction crearDuplicado(elemento, deep = true) {\n    const clon = elemento.cloneNode(deep);\n    // Modificar el clon\n    clon.id = `${elemento.id}-clon`;\n    return clon;\n}\n\n// Uso\nconst original = document.getElementById('elemento-original');\nconst copia = crearDuplicado(original);\ndocument.body.appendChild(copia);",
      },
    ],
    "errores": [
      {
        "texto": "**Crear el elemento pero no insertarlo**:",
        "code": "// ❌ El elemento existe pero no es visible\nconst div = document.createElement('div');\ndiv.textContent = 'Hola';\n// ¡Nunca se añade al DOM!\n\n// ✅ Insertar en el DOM\ndocument.body.appendChild(div);",
      },
      {
        "texto": "**Confundir createElement con innerHTML**:",
        "code": "// ❌ No mezclar\nconst contenedor = document.getElementById('contenedor');\ncontenedor.innerHTML = ''; // Limpiar\nconst p = document.createElement('p');\np.textContent = 'Texto';\ncontenedor.innerHTML += p; // ¡Error! innerHTML espera string\n\n// ✅ Usar appendChild\ncontenedor.appendChild(p);",
      },
      {
        "texto": "**Usar etiquetas inválidas**:",
        "code": "// ❌ Etiqueta inválida (crea elemento genérico)\nconst elemento = document.createElement('etiqueta-invalida');\nconsole.log(elemento.tagName); // 'ETIQUETA-INVALIDA'\n\n// ✅ Etiquetas válidas\ndocument.createElement('div');\ndocument.createElement('span');\ndocument.createElement('input');",
      },
      {
        "texto": "**Crear elementos con contenido HTML**:",
        "code": "// ⚠️ textContent no interpreta HTML\nconst div = document.createElement('div');\ndiv.textContent = 'Texto'; // Muestra 'Texto'\n\n// ✅ Para HTML, usar innerHTML\ndiv.innerHTML = 'Texto';\n// O crear elementos hijos\nconst strong = document.createElement('strong');\nstrong.textContent = 'Texto';\ndiv.appendChild(strong);",
      },
      {
        "texto": "**Eventos perdidos al reemplazar elementos**:",
        "code": "// ❌ Perder eventos\nconst boton = document.createElement('button');\nboton.textContent = 'Click';\nboton.addEventListener('click', handler);\ncontenedor.appendChild(boton);\n\n// Más tarde...\ncontenedor.innerHTML = ''; // Elimina el botón y su evento\nconst nuevoBoton = document.createElement('button');\ncontenedor.appendChild(nuevoBoton); // ¡El nuevo botón NO tiene el evento!\n\n// ✅ Mantener y reutilizar\nboton.addEventListener('click', handler);\n// O reasignar eventos después de recrear",
      },
    ],
    "casos": [
      "**Listas dinámicas** → Crear `<li>` desde datos",
      "**Tablas desde API** → Generar `<tr>` y `<td>` desde JSON",
      "**Tarjetas de productos** → Crear cards con datos",
      "**Formularios dinámicos** → Generar campos según configuración",
      "**Notificaciones** → Crear alertas/popups",
      "**Sliders** → Crear slides dinámicamente",
      "**Menús** → Generar items de navegación",
    ],
    "relacion": [
      "`innerHTML` → Crea elementos desde string HTML, más riesgo de XSS.",
      "`appendChild()` → Añade elementos creados al DOM.",
      "`insertAdjacentHTML()` → Inserta HTML en posiciones específicas.",
      "`cloneNode()` → Clona un elemento existente.",
      "`removeChild()` → Elimina un elemento del DOM.",
      "`replaceChild()` → Reemplaza un elemento con otro.",
      "**Flujo de trabajo típico**",
    ],
    "analogia": "`document.createElement()` es como un **taller de manufactura** para el DOM. Tienes una máquina (el método) que puede fabricar cualquier pieza (elemento HTML) que necesites. Las piezas se fabrican en la línea de montaje (memoria) y se pueden personalizar completamente (añadir atributos, estilos, eventos) antes de enviarlas al almacén (DOM). Es como tener una impresora 3D para elementos HTML: puedes crear cualquier cosa que necesites bajo demanda.",
    "fuente": "MDN Web Docs - document.createElement W3Schools - createElement MDN - appendChild Especificación DOM Living Standard - WHATWG",
    "notasPersonales": [
      "**Rendimiento**: `createElement()` es más rápido que `innerHTML` para múltiples elementos. Construir elementos en memoria y luego insertarlos es más eficiente que insertarlos uno por uno. Para grandes cantidades, usa `DocumentFragment` para optimizar.",
      "**Seguridad**: `createElement()` es **seguro** contra XSS porque no interpreta HTML desde strings. Es la forma recomendada de crear elementos con datos de usuarios.",
      "**Buenas prácticas**:",
      "Código: // ✅ Crear y configurar antes de insertar",
      "**Optimización con DocumentFragment**:",
      "Código: function crearListaOptimizada(items) {",
      "**Compatibilidad**: Disponible en TODOS los navegadores. Es una de las APIs más antiguas y compatibles del DOM.",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de createElement?",
        "opciones": [
          "document.createTextNode(texto)",
          "document.createElement(tagName)",
          "elemento.append(...nodosOTexto)",
          "elemento.appendChild(nodo)",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor createElement?",
        "opciones": [
          "Es un método del DOM que permite crear un nuevo elemento HTML a partir de una etiqueta especificada.",
          "Método del DOM que crea un nuevo nodo de texto (Text) a partir de una cadena de caracteres.",
          "Es un método del DOM que inserta uno o varios nodos o strings al final del elemento, como últimos hijos.",
          "Es un método del DOM que permite añadir un nodo como último hijo de un elemento padre.",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve createElement?",
        "opciones": [
          "Sirve para crear texto mediante JavaScript y posteriormente incorporarlo a un elemento del DOM usando métodos como appendChild().",
          "➕ Añadir elementos al final de un contenedor.",
          "Crear elementos dinámicamente: Generar contenido HTML desde JavaScript.",
          "Añadir elementos dinámicos: Insertar elementos creados con createElement().",
        ],
        "correcta": 2,
      },
      {
        "id": 4,
        "pregunta": "¿En qué caso de uso encaja createElement?",
        "opciones": [
          "Listas dinámicas → Añadir items a <ul> o <ol>",
          "📋 Construir listas dinámicamente (<ul>, <ol>).",
          "Listas dinámicas → Crear <li> desde datos",
          "Listas ordenadas → Insertar elementos en posición correcta",
        ],
        "correcta": 2,
      },
    ],
  },
  "dom-createtextnode": {
    "id": "dom-createtextnode",
    "titulo": "createTextNode()",
    "icon": "✍️",
    "categoria": "DOM · Creación",
    "firma": "document.createTextNode(texto)",
    "simulador": "dom",
    "definicion": [
      "Método del **DOM** que crea un nuevo nodo de texto (`Text`) a partir de una cadena de caracteres.",
    ],
    "queEs": [
      "`document.createTextNode()` es un método del objeto `document` que permite crear **texto como un nodo independiente del DOM**.",
      "A diferencia de `innerHTML`, el texto creado **no se interpreta como HTML**.",
    ],
    "paraQueSirve": [
      "Sirve para crear texto mediante JavaScript y posteriormente incorporarlo a un elemento del DOM usando métodos como `appendChild()`.",
    ],
    "comoFunciona": [
      "Recibe una cadena de texto.",
      "Crea un objeto `Text`.",
      "Ese objeto representa un nodo de texto.",
      "Puedes insertarlo dentro de un elemento existente.",
      "El resultado sería:",
    ],
    "sintaxis": [
      {
        "code": "document.createTextNode(data)",
      },
      {
        "caption": "Retorno",
        "code": "const texto=document.createTextNode(\"Hola\");\nconsole.log(texto);// Text { ... }",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "descripcion": "**Crear un nodo de texto:**",
        "code": "const texto=document.createTextNode(\"Hola mundo\");\n\nconst p=document.createElement(\"p\");\nconst texto=document.createTextNode(\"Hola mundo\");\np.appendChild(texto);\ndocument.body.appendChild(p);\n\nconst texto=document.createTextNode(\"Hola\");\ndocument.body.appendChild(texto);\n\nHola",
      },
    ],
    "errores": [
      {
        "texto": "**1. Confundirlo con **`createElement()` crea un **nodo de texto**. crea un **elemento HTML**.",
        "code": "document.createTextNode(\"Hola\");\n\ndocument.createElement(\"p\");",
      },
      {
        "texto": "**2. Pensar que automáticamente aparece en la página** Esto solamente crea el nodo. Para mostrarlo debes incorporarlo al DOM:",
        "code": "const texto=document.createTextNode(\"Hola\");\n\nelemento.appendChild(texto);",
      },
      {
        "texto": "**3. Esperar que interprete HTML** crea texto literal, no un elemento `<h1>`.",
        "code": "document.createTextNode(\"Hola\");",
      },
    ],
    "casos": [
      "Crear texto dinámicamente.",
      "Construir elementos HTML mediante JavaScript.",
      "Manipular el DOM sin utilizar `innerHTML`.",
      "Insertar contenido proporcionado por usuarios de forma segura como texto.",
      "Crear nodos manualmente para posteriormente agregarlos al DOM.",
    ],
    "relacion": [
      "También está muy relacionado con:",
      "`appendChild()`",
      "`append()`",
      "`createElement()`",
      "`Text`",
      "`Node`",
      "DOM",
    ],
    "analogia": "Imagina que estás construyendo una casa 🏠: `createElement()` → construye una habitación. `createTextNode()` → crea el texto que irá dentro de la habitación. `appendChild()` → coloca ese texto dentro de la habitación.",
    "fuente": "MDN — Document.createTextNode()",
    "notasPersonales": [
      "`createTextNode()` **crea un nodo de texto**, no un elemento HTML. Pertenece a la **API del DOM** y se utiliza normalmente junto con métodos de manipulación de nodos como `appendChild()`.",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de createTextNode()?",
        "opciones": [
          "elemento.appendChild(nodo)",
          "document.createElement(tagName)",
          "elemento.append(...nodosOTexto)",
          "document.createTextNode(texto)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor createTextNode()?",
        "opciones": [
          "Es un método del DOM que permite añadir un nodo como último hijo de un elemento padre.",
          "Es un método del DOM que permite crear un nuevo elemento HTML a partir de una etiqueta especificada.",
          "Es un método del DOM que inserta uno o varios nodos o strings al final del elemento, como últimos hijos.",
          "Método del DOM que crea un nuevo nodo de texto (Text) a partir de una cadena de caracteres.",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve createTextNode()?",
        "opciones": [
          "Crear elementos dinámicamente: Generar contenido HTML desde JavaScript.",
          "Añadir elementos dinámicos: Insertar elementos creados con createElement().",
          "➕ Añadir elementos al final de un contenedor.",
          "Sirve para crear texto mediante JavaScript y posteriormente incorporarlo a un elemento del DOM usando métodos como appendChild().",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a createTextNode()?",
        "opciones": [
          "Esperar que devuelva algo → Devuelve undefined | Creer que interpreta HTML → Los strings son texto plano | Usar en null →…",
          "Esperar que devuelva el nodo → Devuelve undefined | Creer que interpreta HTML → Los strings son texto plano | Pasar…",
          "Esperar que devuelva algo → Devuelve undefined | Pasar un array sin spread → Se convierte a string | Pasar null/undefined sin…",
          "1. Confundirlo con createElement() crea un nodo de texto. crea un elemento HTML.",
        ],
        "correcta": 3,
      },
    ],
  },
  "dom-append": {
    "id": "dom-append",
    "titulo": "append()",
    "icon": "➕",
    "categoria": "DOM · Creación",
    "firma": "elemento.append(...nodosOTexto)",
    "simulador": "dom",
    "definicion": [
      "Es un **método del DOM** que **inserta uno o varios nodos o strings** al **final** del elemento, como **últimos hijos**.",
    ],
    "queEs": [
      "Es la forma **moderna y flexible** de añadir contenido al final de un elemento.",
      "A diferencia de `appendChild()`, `append()`:",
      "Acepta **múltiples argumentos** a la vez.",
      "Acepta **strings** directamente (los convierte en nodos de texto).",
      "**No devuelve** el nodo insertado (`undefined`).",
      "Es parte de la familia **ParentNode** (junto con `prepend()`, `before()`, `after()`, `replaceChildren()`).",
    ],
    "paraQueSirve": [
      "➕ **Añadir elementos** al final de un contenedor.",
      "📝 **Insertar texto** sin crear nodos manualmente.",
      "🧩 **Combinar** nodos y texto en una sola llamada.",
      "📋 **Construir listas** dinámicamente.",
      "🎨 **Añadir** varios elementos de golpe.",
      "🔄 **Mover** nodos existentes de un lugar a otro.",
      "🧱 **Clonar** e insertar plantillas (`<template>`).",
    ],
    "comoFunciona": [
      "Recibe **uno o varios argumentos** separados por coma.",
      "Cada argumento puede ser: Un `Node` (elemento, texto, comentario...). Un **string** (se convierte en nodo de texto).",
      "Inserta cada uno **al final** del elemento, **en orden**.",
      "Si un nodo **ya estaba en el DOM** → lo **mueve** (no lo clona).",
      "Si el nodo es `null` o `undefined` → se convierte en `\"null\"` / `\"undefined\"`.",
      "**No devuelve nada** (`undefined`).",
      "⚠️ Para **clonar** en lugar de mover → usa `nodo.cloneNode(true)` antes.",
    ],
    "sintaxis": [
      {
        "code": "elemento.append(...nodosOStrings)",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "code": "// ❌ Esperar que devuelva el nodo\nconst li = lista.append(item); // undefined\nconsole.log(li); // undefined\n\n// ✅ Guardar la referencia ANTES\nconst li = document.createElement(\"li\");\nlista.append(li);\nconsole.log(li); // ✅ el nodo\n\n// ❌ Strings con HTML\ndiv.append(\"Hola\"); // se ve literal\n\n// ✅ Para HTML\ndiv.insertAdjacentHTML(\"beforeend\", \"Hola\");\n\n// ❌ Pasar array sin spread\ndiv.append([\"a\", \"b\"]); // inserta \"a,b\" (array convertido a string)\n\n// ✅ Con spread\ndiv.append(...[\"a\", \"b\"]);\n\n// ❌ Insertar el mismo nodo varias veces\nlista.append(item);\nlista.append(item); // ⚠️ solo queda la última posición\n\n// ✅ Clonar\nlista.append(item.cloneNode(true));\nlista.append(item); // ✅ uno clon + uno original",
      },
      {
        "titulo": "🔸 null y undefined",
        "code": "const div = document.querySelector(\"#caja\");\n\ndiv.append(null);      // null ⚠️\ndiv.append(undefined); // undefined ⚠️\n\n// ✅ Filtrar\nconst items = [1, 2, null, 4];\ndiv.append(...items.filter(x => x != null));",
      },
      {
        "titulo": "🔸 Mover vs clonar",
        "code": "// ⚠️ Mueve (el nodo desaparece de su lugar original)\ndestino.append(nodoExistente);\n\n// ✅ Clona (el original permanece)\ndestino.append(nodoExistente.cloneNode(true));",
      },
      {
        "titulo": "🔸 Rendimiento en bucles",
        "code": "// ❌ Lento: 100 reflows\nfor (let i = 0; i < 100; i++) {\n  lista.append(crearItem(i));\n}\n\n// ✅ Rápido: 1 reflow\nconst fragment = document.createDocumentFragment();\nfor (let i = 0; i < 100; i++) {\n  fragment.append(crearItem(i));\n}\nlista.append(fragment);",
      },
      {
        "titulo": "🔸 No interpreta HTML",
        "code": "// ⚠️ append NO parsea HTML\ndiv.append(\"Hola\"); // texto literal\n\n// ✅ Alternativas para HTML:\ndiv.insertAdjacentHTML(\"beforeend\", \"Hola\");\n// o\ndiv.innerHTML += \"Hola\"; // ⚠️ destruye y reparsea",
      },
    ],
    "errores": [
      "Esperar que devuelva el nodo → ❌ Devuelve `undefined` | Creer que interpreta HTML → ❌ Los strings son texto plano | Pasar `null`/`undefined` sin filtrar → ⚠️ Inserta `\"null\"` / `\"undefined\"` | Mover nodos sin querer → ⚠️ Si ya estaba en el DOM, se mueve | Olvidar clonar antes de insertar varias veces → ⚠️ El nodo se mueve, no se duplica | Usar en bucles grandes sin fragmento → ⚠️ Múltiples reflows | Confundir con `appendChild` → `append` acepta varios y strings | Usar en nodos que no son elementos → ⚠️ Solo en `Element`, `Document`, `DocumentFragment` | Esperar soporte en IE11 → ❌ `append` no está en IE | Pasar arrays directamente → ⚠️ Debes usar spread `...`",
    ],
    "casos": [
      "📋 **Construir listas** dinámicamente (`<ul>`, `<ol>`).",
      "💬 **Añadir mensajes** a un chat.",
      "🛒 **Agregar ítems** al carrito.",
      "📊 **Añadir filas** a una tabla.",
      "🔔 **Insertar notificaciones** al final de un contenedor.",
      "🎨 **Añadir elementos** de una plantilla (`<template>`).",
      "📦 **Mover nodos** entre contenedores.",
    ],
    "relacion": [
      "`prepend()` → Inserta **al inicio**",
      "`appendChild()` → Versión antigua (uno, devuelve nodo)",
      "`insertBefore()` → Inserta **antes** de un nodo",
      "`replaceChildren()` → Reemplaza **todos** los hijos",
      "`before()` / `after()` → Fuera del elemento",
      "`DocumentFragment` → Para insertar muchos nodos eficientemente",
      "`createElement()` → Crear nodos para insertar",
    ],
    "analogia": "Imagina que un elemento HTML es una **caja** 📦 con cosas dentro. `append()` = **metes cosas nuevas al fondo** de la caja, una tras otra. Puedes meter **objetos** (nodos) o **notas escritas** (strings). Si metes un objeto que **ya estaba en otra caja** → se **mueve** (desaparece del original). Para tener dos copias → **clonas** antes (`cloneNode`). ⚠️ Si metes `null` o `undefined` → metes la **palabra literal** \"null\"/\"undefined\". ⚠️ `append()` **no interpreta etiquetas**: si metes el texto `\"<b>Hola</b>\"`, se guarda como texto literal, no como negrita. `prepend()` = lo mismo pero **por delante**. `appendChild()` = versión antigua: **una cosa a la vez** y te devuelve el objeto.",
    "fuente": "📘 MDN – Element.append() 📗 MDN – ParentNode.append() 📕 WHATWG DOM Standard – append() 📙 MDN – Node.appendChild()",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de append()?",
        "opciones": [
          "elemento.append(...nodosOTexto)",
          "elemento.appendChild(nodo)",
          "document.createTextNode(texto)",
          "document.createElement(tagName)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor append()?",
        "opciones": [
          "Es un método del DOM que inserta uno o varios nodos o strings al final del elemento, como últimos hijos.",
          "Es un método del DOM que permite añadir un nodo como último hijo de un elemento padre.",
          "Método del DOM que crea un nuevo nodo de texto (Text) a partir de una cadena de caracteres.",
          "Es un método del DOM que permite crear un nuevo elemento HTML a partir de una etiqueta especificada.",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve append()?",
        "opciones": [
          "Añadir elementos dinámicos: Insertar elementos creados con createElement().",
          "Sirve para crear texto mediante JavaScript y posteriormente incorporarlo a un elemento del DOM usando métodos como appendChild().",
          "➕ Añadir elementos al final de un contenedor.",
          "Crear elementos dinámicamente: Generar contenido HTML desde JavaScript.",
        ],
        "correcta": 2,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a append()?",
        "opciones": [
          "Esperar que devuelva algo → Devuelve undefined | Pasar un array sin spread → Se convierte a string | Pasar null/undefined sin…",
          "Esperar que devuelva algo → Devuelve undefined | Creer que interpreta HTML → Los strings son texto plano | Usar en null →…",
          "Esperar que devuelva el nodo → Devuelve undefined | Creer que interpreta HTML → Los strings son texto plano | Pasar…",
          "1. Confundirlo con createElement() crea un nodo de texto. crea un elemento HTML.",
        ],
        "correcta": 2,
      },
    ],
  },
  "dom-appendchild": {
    "id": "dom-appendchild",
    "titulo": "appendChild",
    "icon": "📎",
    "categoria": "DOM · Creación",
    "firma": "elemento.appendChild(nodo)",
    "simulador": "dom",
    "definicion": [
      "Es un método del DOM que permite **añadir un nodo** como **último hijo** de un elemento padre.",
      "El nodo puede ser un elemento HTML recién creado, un nodo de texto o cualquier otro tipo de nodo DOM.",
    ],
    "queEs": [
      "`appendChild()` es un método nativo de JavaScript disponible en todos los nodos que pueden tener hijos (elementos, document, documentFragment).",
      "Toma un nodo existente o recién creado y lo mueve/inserta como el último hijo del elemento sobre el que se invoca.",
      "**Características importantes**:",
      "El nodo se añade al **final** de la lista de hijos.",
      "Si el nodo ya existe en el DOM, se **mueve** (no se duplica).",
      "Devuelve una referencia al nodo añadido.",
      "Puede añadir **cualquier tipo de nodo** (elementos, texto, comentarios, etc.).",
      "Requiere que el elemento padre exista en el DOM.",
    ],
    "paraQueSirve": [
      "**Añadir elementos dinámicos**: Insertar elementos creados con `createElement()`.",
      "**Mover elementos**: Reubicar un elemento existente en el DOM.",
      "**Construir estructuras**: Ensamblar elementos anidados (padre-hijo).",
      "**Añadir contenido**: Insertar nodos de texto o comentarios.",
      "**Construir con DocumentFragment**: Agregar múltiples nodos de forma eficiente.",
    ],
    "comoFunciona": [
      "Se selecciona el **elemento padre** donde se quiere añadir el nodo.",
      "Se llama a `appendChild()` pasando el **nodo a añadir** como argumento.",
      "El navegador: Si el nodo ya tiene un padre, lo **remueve** de su posición actual. Lo añade como **último hijo** del elemento padre. Actualiza el DOM en consecuencia.",
      "Devuelve el nodo añadido.",
    ],
    "sintaxis": [
      {
        "code": "const nodoAgregado = elementoPadre.appendChild(nodo);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Básico - Añadir un elemento",
        "code": "// Crear un nuevo párrafo\nconst parrafo = document.createElement('p');\nparrafo.textContent = 'Este es un párrafo nuevo';\n\n// Añadirlo al final del body\ndocument.body.appendChild(parrafo);",
      },
      {
        "titulo": "Añadir múltiples elementos",
        "code": "const lista = document.getElementById('miLista');\n\n// Crear varios elementos\nconst items = ['Item 1', 'Item 2', 'Item 3'];\nitems.forEach(texto => {\n    const li = document.createElement('li');\n    li.textContent = texto;\n    lista.appendChild(li);\n});",
      },
      {
        "titulo": "Crear estructura anidada",
        "code": "// Crear una tarjeta completa\nconst contenedor = document.getElementById('contenedor');\n\nconst card = document.createElement('div');\ncard.className = 'card';\n\n// Añadir título\nconst titulo = document.createElement('h3');\ntitulo.textContent = 'Mi Tarjeta';\ncard.appendChild(titulo);\n\n// Añadir descripción\nconst descripcion = document.createElement('p');\ndescripcion.textContent = 'Esta es una descripción';\ncard.appendChild(descripcion);\n\n// Añadir botón\nconst boton = document.createElement('button');\nboton.textContent = 'Clic aquí';\nboton.addEventListener('click', () => alert('¡Hola!'));\ncard.appendChild(boton);\n\n// Añadir la tarjeta al contenedor\ncontenedor.appendChild(card);",
      },
      {
        "titulo": "Mover un elemento existente",
        "code": "Texto que será movido\n\nconst parrafo = document.getElementById('parrafo');\nconst contenedor2 = document.getElementById('contenedor2');\n\n// Mover el párrafo al contenedor2\ncontenedor2.appendChild(parrafo);\n// El párrafo ya no está en contenedor1",
      },
      {
        "titulo": "Añadir nodo de texto",
        "code": "const div = document.getElementById('miDiv');\n\n// Crear nodo de texto\nconst texto = document.createTextNode('Este es un texto directo');\n\n// Añadirlo\ndiv.appendChild(texto);",
      },
      {
        "titulo": "Usar DocumentFragment (optimización)",
        "code": "function crearListaOptimizada(items) {\n    // Crear un fragmento (contenedor temporal)\n    const fragment = document.createDocumentFragment();\n\n    items.forEach(item => {\n        const li = document.createElement('li');\n        li.textContent = item;\n        fragment.appendChild(li);\n    });\n\n    // Insertar todo de una vez (una sola actualización del DOM)\n    document.getElementById('lista').appendChild(fragment);\n}\n\n// Uso\ncrearListaOptimizada(['Manzana', 'Banana', 'Naranja']);",
      },
      {
        "titulo": "Añadir con encadenamiento",
        "code": "const div = document.getElementById('contenedor');\n\n// Los métodos devuelven el elemento, permitiendo encadenamiento\nconst nuevoDiv = document.createElement('div')\n    .appendChild(document.createElement('p'))\n    .appendChild(document.createTextNode('Texto'));\n\n// Pero esto no es muy legible, mejor hacerlo paso a paso",
      },
    ],
    "errores": [
      {
        "texto": "**appendChild en nodos que no son padres**:",
        "code": "// ❌ Error: \"appendChild is not a function\"\nconst texto = document.createTextNode('Hola');\ntexto.appendChild(document.createElement('span'));\n\n// ✅ Los nodos de texto no pueden tener hijos\nconst div = document.createElement('div');\ndiv.appendChild(document.createTextNode('Hola'));",
      },
      {
        "texto": "**Mover en lugar de duplicar**:",
        "code": "const parrafo = document.getElementById('parrafo');\nconst contenedor1 = document.getElementById('contenedor1');\nconst contenedor2 = document.getElementById('contenedor2');\n\n// ❌ El párrafo se mueve (no se duplica)\ncontenedor1.appendChild(parrafo);\ncontenedor2.appendChild(parrafo);\n// El párrafo termina solo en contenedor2\n\n// ✅ Para duplicar, usar cloneNode\nconst clon = parrafo.cloneNode(true);\ncontenedor2.appendChild(clon);",
      },
      {
        "texto": "**Intentar añadir el mismo nodo varias veces**:",
        "code": "const div = document.createElement('div');\ndiv.textContent = 'Hola';\n\nconst contenedor = document.getElementById('contenedor');\ncontenedor.appendChild(div);  // Añadido\ncontenedor.appendChild(div);  // ¡Se mueve, no se duplica!\n// Solo hay un div en el contenedor",
      },
      {
        "texto": "**No verificar si el elemento existe**:",
        "code": "// ❌ Error si contenedor es null\nconst contenedor = document.getElementById('noExiste');\ncontenedor.appendChild(div);\n\n// ✅ Verificar\nif (contenedor) {\n    contenedor.appendChild(div);\n}",
      },
      {
        "texto": "**Añadir elementos antes de que exista el padre**:",
        "code": "const div = document.createElement('div');\nconst span = document.createElement('span');\nspan.appendChild(div); // ❌ Error: span no está en el DOM\n// Pero esto SÍ funciona porque appendChild no requiere que el padre esté en el DOM\n// Solo requiere que sea un nodo que pueda tener hijos",
      },
    ],
    "casos": [
      "**Listas dinámicas** → Añadir items a `<ul>` o `<ol>`",
      "**Tablas** → Añadir filas con `<tr>` y `<td>`",
      "**Chat en tiempo real** → Añadir mensajes nuevos",
      "**Notificaciones** → Insertar alertas/popups",
      "**Carrito de compras** → Añadir productos",
      "**Galerías** → Insertar imágenes",
      "**Formularios dinámicos** → Agregar campos",
    ],
    "relacion": [
      "`appendChild()` → Añade al final, mueve nodos existentes, acepta un solo nodo.",
      "`append()` → Moderno, acepta múltiples nodos y strings, no mueve nodos.",
      "`insertBefore()` → Inserta en posición específica (antes de un nodo).",
      "`prepend()` → Añade al inicio (moderno).",
      "`replaceChild()` → Reemplaza un nodo existente.",
      "`removeChild()` → Elimina un nodo hijo.",
      "`innerHTML +=` → Concatena HTML (menos eficiente, riesgo XSS).",
    ],
    "analogia": "`appendChild()` es como **apilar libros en una pila**. Tienes una pila de libros (el elemento padre) y quieres añadir un libro nuevo (el nodo) al final de la pila. Si el libro ya está en otra pila, lo tomas de allí y lo colocas al final de esta nueva pila. Cada libro (nodo) solo puede estar en una pila a la vez, por lo que moverlo lo quita de su ubicación original.",
    "fuente": "MDN Web Docs - appendChild W3Schools - appendChild MDN - Node.append Especificación DOM Living Standard - WHATWG",
    "notasPersonales": [
      "**Rendimiento**: `appendChild()` es eficiente para añadir elementos individuales. Para múltiples elementos, usar `DocumentFragment` para minimizar reflows. Mover elementos es rápido (no se recrean, solo se reubican).",
      "**DocumentFragment**:",
      "Código: // ✅ Optimización para múltiples inserciones",
      "**Buenas prácticas**:",
      "Código: // ✅ Crear y configurar antes de añadir",
      "**Alternativas modernas**:",
      "Código: // Antiguo (appendChild)",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de appendChild?",
        "opciones": [
          "elemento.appendChild(nodo)",
          "document.createElement(tagName)",
          "elemento.append(...nodosOTexto)",
          "document.createTextNode(texto)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor appendChild?",
        "opciones": [
          "Es un método del DOM que permite añadir un nodo como último hijo de un elemento padre.",
          "Es un método del DOM que permite crear un nuevo elemento HTML a partir de una etiqueta especificada.",
          "Es un método del DOM que inserta uno o varios nodos o strings al final del elemento, como últimos hijos.",
          "Método del DOM que crea un nuevo nodo de texto (Text) a partir de una cadena de caracteres.",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve appendChild?",
        "opciones": [
          "Crear elementos dinámicamente: Generar contenido HTML desde JavaScript.",
          "Añadir elementos dinámicos: Insertar elementos creados con createElement().",
          "➕ Añadir elementos al final de un contenedor.",
          "Sirve para crear texto mediante JavaScript y posteriormente incorporarlo a un elemento del DOM usando métodos como appendChild().",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿En qué caso de uso encaja appendChild?",
        "opciones": [
          "Listas ordenadas → Insertar elementos en posición correcta",
          "Listas dinámicas → Crear <li> desde datos",
          "Listas dinámicas → Añadir items a <ul> o <ol>",
          "📋 Construir listas dinámicamente (<ul>, <ol>).",
        ],
        "correcta": 2,
      },
    ],
  },
  "dom-insertbefore": {
    "id": "dom-insertbefore",
    "titulo": "insertBefore",
    "icon": "↪️",
    "categoria": "DOM · Creación",
    "firma": "elemento.insertBefore(nodo, referencia)",
    "simulador": "dom",
    "definicion": [
      "Es un método del DOM que permite **insertar un nodo antes de un nodo de referencia** específico dentro de un elemento padre.",
      "Proporciona control preciso sobre la posición de inserción en el árbol DOM.",
    ],
    "queEs": [
      "`insertBefore()` es un método nativo de JavaScript disponible en todos los nodos que pueden tener hijos (elementos, document, documentFragment).",
      "Inserta un nodo como hijo del elemento padre, colocándolo **inmediatamente antes** del nodo de referencia especificado.",
      "**Características importantes**:",
      "Inserta el nodo **antes** del nodo de referencia.",
      "Si el nodo ya existe, lo **mueve** (no lo duplica).",
      "Si el nodo de referencia es `null`, funciona como `appendChild()`.",
      "Devuelve una referencia al nodo insertado.",
      "Permite insertar en cualquier posición, no solo al final.",
    ],
    "paraQueSirve": [
      "**Inserción en posición específica**: Colocar elementos donde se necesiten.",
      "**Ordenar elementos**: Reorganizar el orden de los hijos.",
      "**Insertar al inicio**: Usar `firstChild` como referencia.",
      "**Insertar antes de un elemento específico**: Basado en un elemento existente.",
      "**Construcción dinámica**: Crear estructuras con orden controlado.",
    ],
    "comoFunciona": [
      "Se selecciona el **elemento padre** donde se va a insertar.",
      "Se especifica el **nodo a insertar** y el **nodo de referencia** (ante el cual se insertará).",
      "El navegador: Si el nodo ya tiene un padre, lo **remueve** de su posición actual. Lo inserta como hijo del padre, **inmediatamente antes** del nodo de referencia. Si el nodo de referencia es `null`, lo inserta al **final** (como `appendChild`). Actualiza el DOM en consecuencia.",
      "Devuelve el nodo insertado.",
    ],
    "sintaxis": [
      {
        "code": "const nodoInsertado = elementoPadre.insertBefore(nuevoNodo, nodoReferencia);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Básico - Insertar al inicio",
        "code": "Item 2\n    Item 3\n\nconst lista = document.getElementById('lista');\n\n// Crear nuevo elemento\nconst nuevoItem = document.createElement('li');\nnuevoItem.textContent = 'Item 1';\n\n// Insertar al inicio (antes del primer hijo)\nlista.insertBefore(nuevoItem, lista.firstChild);\n\n// Resultado: Item 1, Item 2, Item 3",
      },
      {
        "titulo": "Insertar antes de un elemento específico",
        "code": "Item 1\n    Item 3\n    Item 4\n\nconst lista = document.getElementById('lista');\nconst referencia = document.getElementById('referencia');\n\n// Crear nuevo elemento\nconst nuevoItem = document.createElement('li');\nnuevoItem.textContent = 'Item 2';\n\n// Insertar antes de 'referencia'\nlista.insertBefore(nuevoItem, referencia);\n\n// Resultado: Item 1, Item 2, Item 3, Item 4",
      },
      {
        "titulo": "Insertar al final (como appendChild)",
        "code": "const lista = document.getElementById('lista');\nconst nuevoItem = document.createElement('li');\nnuevoItem.textContent = 'Item final';\n\n// insertBefore con null funciona como appendChild\nlista.insertBefore(nuevoItem, null);\n// Equivalente a: lista.appendChild(nuevoItem);",
      },
      {
        "titulo": "Mover un elemento existente",
        "code": "A\n    B\n    C\n\n\n    X\n    Y\n\nconst lista1 = document.getElementById('lista1');\nconst lista2 = document.getElementById('lista2');\nconst mover = document.getElementById('mover');\n\n// Mover 'B' al inicio de lista2\nlista2.insertBefore(mover, lista2.firstChild);\n\n// Resultado lista2: B, X, Y\n// Resultado lista1: A, C (B ya no está)",
      },
      {
        "titulo": "Insertar en medio de una lista",
        "code": "function insertarEnPosicion(lista, texto, posicion) {\n    const nuevoItem = document.createElement('li');\n    nuevoItem.textContent = texto;\n\n    // Obtener el elemento en esa posición\n    const referencia = lista.children[posicion] || null;\n\n    // Insertar antes de la referencia (o al final si no existe)\n    lista.insertBefore(nuevoItem, referencia);\n}\n\n// Uso\nconst lista = document.getElementById('lista');\ninsertarEnPosicion(lista, 'Nuevo Item', 2); // Inserta en la posición 2 (0-index)",
      },
      {
        "titulo": "Insertar después de un elemento específico",
        "code": "function insertarDespues(padre, nuevoNodo, nodoReferencia) {\n    // Obtener el siguiente hermano del nodo de referencia\n    const siguiente = nodoReferencia.nextSibling;\n\n    // Insertar antes del siguiente hermano (es decir, después del nodo referencia)\n    padre.insertBefore(nuevoNodo, siguiente);\n}\n\n// Uso\nconst lista = document.getElementById('lista');\nconst referencia = document.getElementById('referencia');\nconst nuevo = document.createElement('li');\nnuevo.textContent = 'Insertado después';\n\ninsertarDespues(lista, nuevo, referencia);\n// El nuevo elemento aparece después de 'referencia'",
      },
      {
        "titulo": "Ejemplo: Ordenar lista",
        "code": "function ordenarLista(lista, ascendente = true) {\n    // Obtener todos los items como array\n    const items = Array.from(lista.children);\n\n    // Ordenar por texto\n    items.sort((a, b) => {\n        const textA = a.textContent.toLowerCase();\n        const textB = b.textContent.toLowerCase();\n        return ascendente ? textA.localeCompare(textB) : textB.localeCompare(textA);\n    });\n\n    // Reinsertar en el nuevo orden\n    items.forEach(item => {\n        lista.insertBefore(item, null); // Mover al final\n    });\n}\n\n// Uso\nconst lista = document.getElementById('lista');\nordenarLista(lista, true); // Orden ascendente",
      },
    ],
    "errores": [
      {
        "texto": "**Nodo de referencia no es hijo del padre**:",
        "code": "const padre = document.getElementById('padre');\nconst referencia = document.getElementById('otroPadre');\nconst nuevo = document.createElement('div');\n\n// ❌ Error: referencia no es hijo de padre\npadre.insertBefore(nuevo, referencia);\n\n// ✅ Verificar\nif (padre.contains(referencia)) {\n    padre.insertBefore(nuevo, referencia);\n}",
      },
      {
        "texto": "**Insertar el mismo nodo varias veces**:",
        "code": "const div = document.createElement('div');\ndiv.textContent = 'Hola';\n\nconst contenedor = document.getElementById('contenedor');\nconst referencia = document.getElementById('referencia');\n\n// ❌ El nodo se mueve, no se duplica\ncontenedor.insertBefore(div, referencia);\ncontenedor.insertBefore(div, contenedor.firstChild);\n// El div termina al inicio, no está duplicado\n\n// ✅ Para duplicar, usar cloneNode\nconst clon = div.cloneNode(true);\ncontenedor.insertBefore(clon, referencia);",
      },
      {
        "texto": "**Confundir el orden de los parámetros**:",
        "code": "// ❌ INCORRECTO: parámetros invertidos\npadre.insertBefore(referencia, nuevoNodo);\n\n// ✅ CORRECTO: (nuevoNodo, nodoReferencia)\npadre.insertBefore(nuevoNodo, referencia);",
      },
      {
        "texto": "**Usar insertBefore con null**:",
        "code": "// insertBefore con null es válido (equivale a appendChild)\npadre.insertBefore(nuevo, null); // ✅ Válido\n\n// Pero no pases undefined\npadre.insertBefore(nuevo, undefined); // ⚠️ Puede funcionar pero no es recomendable",
      },
      {
        "texto": "**No manejar el caso de referencia null**:",
        "code": "// ❌ Si referencia es null, inserta al final (como appendChild)\nconst referencia = document.getElementById('noExiste') || null;\npadre.insertBefore(nuevo, referencia); // Inserta al final\n\n// ✅ Verificar si existe\nif (referencia) {\n    padre.insertBefore(nuevo, referencia);\n} else {\n    padre.appendChild(nuevo);\n}",
      },
    ],
    "casos": [
      "**Listas ordenadas** → Insertar elementos en posición correcta",
      "**Colas prioritarias** → Tareas según prioridad",
      "**Tablas** → Insertar filas en posición específica",
      "**Menús dinámicos** → Agregar items en posiciones específicas",
      "**Historial** → Agregar eventos en orden cronológico",
      "**Galerías** → Insertar imágenes en posiciones específicas",
      "**Formularios** → Agregar campos en posiciones específicas",
    ],
    "relacion": [
      "`insertBefore()` → Inserta antes de un nodo específico, mueve nodos existentes.",
      "`appendChild()` → Inserta al final, similar a `insertBefore(node, null)`.",
      "`insertAdjacentElement()` → Inserta en posiciones relativas (beforebegin, afterbegin, beforeend, afterend).",
      "`prepend()` → Inserta al inicio (moderno).",
      "`append()` → Inserta al final (moderno).",
      "`replaceChild()` → Reemplaza un nodo existente.",
      "`removeChild()` → Elimina un nodo hijo.",
    ],
    "analogia": "`insertBefore()` es como **colocar un libro en una estantería**. Tienes una estantería (el padre) con libros ya colocados (los nodos existentes). Quieres añadir un nuevo libro (el nodo) en una posición específica. `insertBefore()` te permite decir: \"coloca este libro justo antes de este otro libro específico\". Si el libro ya estaba en otra estantería, lo mueves de allí a esta nueva posición.",
    "fuente": "MDN Web Docs - insertBefore W3Schools - insertBefore MDN - Node.prepend Especificación DOM Living Standard - WHATWG",
    "notasPersonales": [
      "**Rendimiento**: `insertBefore()` tiene rendimiento similar a `appendChild()`. Útil para inserciones en posiciones específicas sin recrear todo el contenido. Para mover elementos, es eficiente (no se recrean, solo se reubican).",
      "**Nodo de referencia null**:",
      "Código: // insertBefore con null equivale a appendChild",
      "**Buenas prácticas**:",
      "Código: // ✅ Verificar que referencia sea hijo del padre",
      "**Alternativas modernas**:",
      "Código: // Antiguo (insertBefore)",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de insertBefore?",
        "opciones": [
          "elemento.append(...nodosOTexto)",
          "document.createElement(tagName)",
          "document.createTextNode(texto)",
          "elemento.insertBefore(nodo, referencia)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor insertBefore?",
        "opciones": [
          "Es un método del DOM que permite crear un nuevo elemento HTML a partir de una etiqueta especificada.",
          "Es un método del DOM que inserta uno o varios nodos o strings al final del elemento, como últimos hijos.",
          "Método del DOM que crea un nuevo nodo de texto (Text) a partir de una cadena de caracteres.",
          "Es un método del DOM que permite insertar un nodo antes de un nodo de referencia específico dentro de un elemento padre.",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve insertBefore?",
        "opciones": [
          "Sirve para crear texto mediante JavaScript y posteriormente incorporarlo a un elemento del DOM usando métodos como appendChild().",
          "Crear elementos dinámicamente: Generar contenido HTML desde JavaScript.",
          "➕ Añadir elementos al final de un contenedor.",
          "Inserción en posición específica: Colocar elementos donde se necesiten.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿En qué caso de uso encaja insertBefore?",
        "opciones": [
          "📋 Construir listas dinámicamente (<ul>, <ol>).",
          "Listas dinámicas → Crear <li> desde datos",
          "Listas dinámicas → Añadir items a <ul> o <ol>",
          "Listas ordenadas → Insertar elementos en posición correcta",
        ],
        "correcta": 3,
      },
    ],
  },
  "dom-replacechildren": {
    "id": "dom-replacechildren",
    "titulo": "replaceChildren",
    "icon": "🔄",
    "categoria": "DOM · Creación",
    "firma": "elemento.replaceChildren(...nodos)",
    "simulador": "dom",
    "definicion": [
      "Es un **método del DOM** que **reemplaza TODOS los hijos** de un elemento por **uno o varios nodos o strings** nuevos, en una sola operación.",
    ],
    "queEs": [
      "Es la forma **moderna, limpia y eficiente** de **vaciar o reemplazar** el contenido de un elemento.",
      "Combina en una sola llamada lo que antes requería:",
      "`innerHTML = \"\"` para vaciar (⚠️ destructivo).",
      "`while (el.firstChild) el.removeChild(el.firstChild)` para vaciar.",
      "Un bucle de `remove()` + `append()` para reemplazar.",
      "Pertenece a la interfaz `ParentNode` (junto con `append()` y `prepend()`).",
    ],
    "paraQueSirve": [
      "🧹 **Vaciar** un contenedor por completo.",
      "🔄 **Reemplazar** todo el contenido de golpe.",
      "🎨 **Renderizar** una lista nueva desde cero.",
      "📋 **Actualizar** una tabla o grid completa.",
      "💬 **Refrescar** un chat o feed.",
      "🧩 **Reiniciar** un componente dinámico.",
      "🛒 **Recargar** el carrito tras cambios.",
      "⚡ **Optimizar** reemplazos masivos (un solo reflow).",
    ],
    "comoFunciona": [
      "Recibe **cero o más argumentos** separados por coma.",
      "Cada argumento puede ser: Un `Node` (elemento, texto, comentario...). Un **string** (se convierte en nodo de texto).",
      "**Elimina TODOS los hijos** actuales del elemento.",
      "**Inserta** los nuevos nodos **en orden**, al final.",
      "Si un nodo **ya estaba en el DOM** → lo **mueve**.",
      "**No devuelve nada** (`undefined`).",
      "⚠️ **Sin argumentos** → simplemente **vacía** el elemento (equivalente a `innerHTML = \"\"` pero **sin destruir listeners del propio elemento**).",
    ],
    "sintaxis": [
      {
        "code": "elemento.replaceChildren(...nodosOStrings)",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "code": "// ❌ Esperar que devuelva el nodo\nconst x = div.replaceChildren(nodo); // undefined\n\n// ❌ Pasar array sin spread\ndiv.replaceChildren([\"a\", \"b\"]); // inserta \"a,b\"\n\n// ✅ Con spread\ndiv.replaceChildren(...[\"a\", \"b\"]);\n\n// ❌ Strings con HTML\ndiv.replaceChildren(\"Hola\"); // texto literal\n\n// ✅ Para HTML\ndiv.innerHTML = \"Hola\"; // ⚠️ XSS si viene de usuario\n// o\ndiv.insertAdjacentHTML(\"afterbegin\", \"Hola\");\n\n// ❌ Usar en null\ndocument.querySelector(\".no-existe\").replaceChildren(); // TypeError\n\n// ✅ Optional chaining\ndocument.querySelector(\".no-existe\")?.replaceChildren();",
      },
      {
        "titulo": "🔸 Filtrar null / undefined",
        "code": "const items = [\"a\", null, \"b\", undefined, \"c\"];\n\n// ⚠️ Inserta \"null\" y \"undefined\"\ndiv.replaceChildren(...items);\n\n// ✅ Filtrar\ndiv.replaceChildren(...items.filter(x => x != null));",
      },
      {
        "titulo": "🔸 childNodes es NodeList viva",
        "code": "// ❌ Puede saltarse nodos\ndestino.replaceChildren(...origen.childNodes);\n// ⚠️ Al mover, la NodeList se modifica durante la iteración\n\n// ✅ Convertir a array primero\ndestino.replaceChildren(...Array.from(origen.childNodes));\n// o\ndestino.replaceChildren(...[...origen.childNodes]);",
      },
      {
        "titulo": "🔸 Preservar el elemento contenedor",
        "code": "// ⚠️ innerHTML = \"\" deja el contenedor vacío pero con su estructura\n// ✅ replaceChildren() también conserva el contenedor\n\n// ❌ remove() elimina el contenedor completo\ncontenedor.remove(); // el  desaparece\n\n// ✅ replaceChildren() solo vacía\ncontenedor.replaceChildren(); // el  sigue ahí, vacío",
      },
      {
        "titulo": "🔸 Diferencia con innerHTML = \"\"",
        "code": "// ❌ innerHTML = \"\" destruye todo y reparsea\ncontenedor.innerHTML = \"\";\n\n// ✅ replaceChildren() solo elimina nodos\ncontenedor.replaceChildren();\n\n// ⚠️ En rendimiento son similares, pero replaceChildren es más explícito",
      },
    ],
    "errores": [
      "Esperar que devuelva algo → ❌ Devuelve `undefined` | Pasar un array sin spread → ⚠️ Se convierte a string | Pasar `null`/`undefined` sin filtrar → ⚠️ Inserta `\"null\"` / `\"undefined\"` | Creer que interpreta HTML → ❌ Los strings son texto plano | Mover nodos sin querer → ⚠️ Si ya estaban en el DOM, se mueven | Usar en `null` → `TypeError` | Esperar que conserve hijos → ❌ **Elimina TODOS** los hijos actuales | Iterar `childNodes` sin convertir → ⚠️ NodeList viva cambia durante la operación | Usar en IE11 → ❌ No soportado | Confundir con `append` → `replaceChildren` **borra** lo anterior",
    ],
    "casos": [
      "🧹 **Vaciar** un contenedor por completo.",
      "🔄 **Reemplazar** todo el contenido de golpe.",
      "📋 **Renderizar** listas, tablas, grids completos.",
      "💬 **Refrescar** chats o feeds.",
      "🛒 **Actualizar** el carrito tras cambios.",
      "🎛️ **Cambiar** de vista en una SPA.",
      "🧩 **Reiniciar** componentes dinámicos.",
    ],
    "relacion": [
      "`append()` → Añade al final (no reemplaza)",
      "`prepend()` → Añade al inicio",
      "`innerHTML = \"\"` → Alternativa que destruye y reparsea",
      "`removeChild()` → Elimina un hijo individual",
      "`remove()` → Elimina el elemento completo",
      "`DocumentFragment` → Para insertar muchos nodos eficientemente",
      "`cloneNode()` → Clonar antes de insertar",
    ],
    "analogia": "Imagina que un elemento HTML es una **caja** 📦 con cosas dentro. `replaceChildren()` = **vacías la caja y metes cosas nuevas** en una sola operación. Sin argumentos → **solo vacías**. Con argumentos → **vacías y pones** lo nuevo. La **caja sigue siendo la misma** (el contenedor no se destruye). Puedes meter **objetos** (nodos) o **notas escritas** (strings). ⚠️ No interpreta etiquetas: si metes `\"<b>Hola</b>\"` → se ve literal. ⚠️ Si metes un objeto que ya estaba en otra caja → se **mueve**. Es como decir: *\"olvida todo lo que había y pon esto\"*. 🎯 Perfecto para **renderizar listas completas** sin preocuparte por restos.",
    "fuente": "📘 MDN – Element.replaceChildren() 📗 MDN – ParentNode.replaceChildren() 📕 WHATWG DOM Standard – replaceChildren() 📙 MDN – Node.replaceChild()",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de replaceChildren?",
        "opciones": [
          "elemento.replaceChildren(...nodos)",
          "document.createElement(tagName)",
          "elemento.append(...nodosOTexto)",
          "document.createTextNode(texto)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor replaceChildren?",
        "opciones": [
          "Es un método del DOM que permite crear un nuevo elemento HTML a partir de una etiqueta especificada.",
          "Es un método del DOM que inserta uno o varios nodos o strings al final del elemento, como últimos hijos.",
          "Es un método del DOM que reemplaza TODOS los hijos de un elemento por uno o varios nodos o strings nuevos, en una sola operación.",
          "Método del DOM que crea un nuevo nodo de texto (Text) a partir de una cadena de caracteres.",
        ],
        "correcta": 2,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve replaceChildren?",
        "opciones": [
          "➕ Añadir elementos al final de un contenedor.",
          "Crear elementos dinámicamente: Generar contenido HTML desde JavaScript.",
          "🧹 Vaciar un contenedor por completo.",
          "Sirve para crear texto mediante JavaScript y posteriormente incorporarlo a un elemento del DOM usando métodos como appendChild().",
        ],
        "correcta": 2,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a replaceChildren?",
        "opciones": [
          "Esperar que devuelva algo → Devuelve undefined | Creer que interpreta HTML → Los strings son texto plano | Usar en null →…",
          "1. Confundirlo con createElement() crea un nodo de texto. crea un elemento HTML.",
          "Esperar que devuelva algo → Devuelve undefined | Pasar un array sin spread → Se convierte a string | Pasar null/undefined sin…",
          "Esperar que devuelva el nodo → Devuelve undefined | Creer que interpreta HTML → Los strings son texto plano | Pasar…",
        ],
        "correcta": 2,
      },
    ],
  },
  "dom-replacewith": {
    "id": "dom-replacewith",
    "titulo": "replaceWith()",
    "icon": "🔁",
    "categoria": "DOM · Creación",
    "firma": "elemento.replaceWith(...nodos)",
    "simulador": "dom",
    "definicion": [
      "Es un **método del DOM** que **reemplaza el elemento** por **uno o varios nodos o strings** en su misma posición del árbol.",
    ],
    "queEs": [
      "Es la forma **moderna y directa** de sustituir un elemento por otro(s) **sin necesidad de acceder al padre**.",
      "Antes se usaba `padre.replaceChild(nuevo, viejo)`, que requería conocer el nodo padre y solo aceptaba **un** reemplazo.",
      "`replaceWith()` forma parte de la interfaz `ChildNode` (junto con `before()`, `after()`, `remove()`).",
      "⚠️ **Diferencia clave con **`replaceChildren()`:",
      "`replaceChildren()` → reemplaza los **hijos** de un elemento.",
      "`replaceWith()` → reemplaza **el elemento mismo**.",
    ],
    "paraQueSirve": [
      "🔄 **Sustituir un elemento** por otro en su misma posición.",
      "📝 **Reemplazar** por texto plano.",
      "🧩 **Intercambiar** componentes dinámicamente.",
      "🎨 **Actualizar** un nodo por su versión renderizada.",
      "🗑️ **Eliminar** un elemento (sin argumentos).",
      "📋 **Reemplazar** varias cosas por un solo nodo.",
      "🖼️ **Cambiar** imágenes, tarjetas o bloques.",
      "⚡ **Optimizar** actualizaciones sin tocar el padre.",
    ],
    "comoFunciona": [
      "Recibe **cero o más argumentos** separados por coma.",
      "Cada argumento puede ser: Un `Node` (elemento, texto, comentario...). Un **string** (se convierte en nodo de texto).",
      "**Elimina el elemento original** del DOM.",
      "**Inserta** los nuevos nodos en su lugar, **en orden**.",
      "Si un nodo **ya estaba en el DOM** → lo **mueve**.",
      "**Sin argumentos** → solo **elimina** el elemento (equivale a `remove()`).",
      "**No devuelve nada** (`undefined`).",
      "⚠️ El elemento original queda **desconectado** del DOM, pero sigue existiendo en memoria si mantienes una referencia.",
    ],
    "sintaxis": [
      {
        "code": "elemento.replaceWith(...nodosOStrings)",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "code": "// ❌ Esperar que devuelva el nodo\nconst x = el.replaceWith(nuevo); // undefined\n\n// ❌ Strings con HTML\nel.replaceWith(\"Hola\"); // texto literal\n\n// ✅ Convertir a nodo\nconst b = document.createElement(\"b\");\nb.textContent = \"Hola\";\nel.replaceWith(b);\n\n// ❌ Usar en null\ndocument.querySelector(\".no-existe\").replaceWith(nuevo); // TypeError\n\n// ✅ Optional chaining\ndocument.querySelector(\".no-existe\")?.replaceWith(nuevo);\n\n// ❌ Confundir con replaceChildren\npadre.replaceWith(...hijos); // ⚠️ reemplaza el padre, no los hijos\npadre.replaceChildren(...hijos); // ✅ reemplaza los hijos",
      },
      {
        "titulo": "🔸 Confusión con replaceChildren()",
        "code": "// ✅ replaceWith: reemplaza EL ELEMENTO\nelemento.replaceWith(nuevo);\n// → el elemento desaparece, entra \"nuevo\" en su lugar\n\n// ✅ replaceChildren: reemplaza LOS HIJOS\npadre.replaceChildren(hijo1, hijo2);\n// → el padre sigue, cambian sus hijos",
      },
      {
        "titulo": "🔸 Mover vs clonar",
        "code": "// ⚠️ MUEVE el nodo existente\ndestino.replaceWith(nodoExistente);\n// El nodo desaparece de su posición original\n\n// ✅ CLONA si quieres conservar el original\ndestino.replaceWith(nodoExistente.cloneNode(true));",
      },
      {
        "titulo": "🔸 Reemplazar por HTML desde string",
        "code": "// ❌ No interpreta HTML\nel.replaceWith(\"Hola\"); // texto literal\n\n// ✅ Opción 1: crear nodo\nconst b = document.createElement(\"b\");\nb.textContent = \"Hola\";\nel.replaceWith(b);\n\n// ✅ Opción 2: usar template\nconst t = document.createElement(\"template\");\nt.innerHTML = \"Hola\";\nel.replaceWith(...t.content.childNodes);\n\n// ✅ Opción 3: usar outerHTML\nel.outerHTML = \"Hola\"; // ⚠️ reparsea",
      },
    ],
    "errores": [
      "Esperar que devuelva algo → ❌ Devuelve `undefined` | Creer que interpreta HTML → ❌ Los strings son texto plano | Usar en `null` → `TypeError` | Confundir con `replaceChildren()` → Este reemplaza **hijos**, no el elemento | Mover nodos sin querer → ⚠️ Si ya estaba en el DOM, se mueve | Olvidar que el elemento queda desconectado → ⚠️ Sigue en memoria si hay referencias | Pasar `null`/`undefined` sin filtrar → ⚠️ Inserta `\"null\"` / `\"undefined\"` | Usar en `document` → ⚠️ No tiene sentido, no tiene padre | Esperar error si no tiene padre → ✅ Silencioso, no hace nada | Usar en IE11 → ❌ No soportado",
    ],
    "casos": [
      "🔄 **Sustituir un elemento** por otro.",
      "📝 **Reemplazar** por texto plano.",
      "🎨 **Actualizar** un componente renderizado.",
      "🖼️ **Cambiar** imágenes, tarjetas, bloques.",
      "✏️ **Edición inline** (span → input → span).",
      "🧩 **Intercambiar** vistas en una SPA.",
      "🗑️ **Eliminar** un elemento sin conocer el padre.",
    ],
    "relacion": [
      "`replaceChild()` → Versión antigua (necesita padre)",
      "`replaceChildren()` → Reemplaza **los hijos** del elemento",
      "`remove()` → Elimina sin reemplazar",
      "`before()` / `after()` → Insertan alrededor",
      "`outerHTML =` → Reemplaza desde string HTML",
      "`innerHTML =` → Reemplaza el contenido interno",
      "`cloneNode()` → Clonar antes de reemplazar",
    ],
    "analogia": "Imagina que el DOM es un **tren** 🚂 con **vagones** enganchados. `replaceWith(nuevoVagon)` = **desenganchas un vagón** y **enganchas otro en su mismo lugar**. El tren sigue circulando igual, pero ese vagón es distinto. `replaceWith(v1, v2, v3)` = **sustituyes un vagón por tres**. `replaceWith()` **sin argumentos** = **desenganchas el vagón** y no pones nada → desaparece. ⚠️ Si el vagón nuevo **ya estaba enganchado en otro sitio** → se **mueve** (desaparece de allí). ⚠️ Si le pasas **texto** → enganchas una **nota escrita**, no un vagón real. 🎯 Ideal para **cambiar cosas sobre la marcha** sin tener que desenganchar y reenganchar manualmente. Es como decir: *\"en el sitio de esto, pon esto otro\"*.",
    "fuente": "📘 MDN – Element.replaceWith() 📗 MDN – ChildNode.replaceWith() 📕 WHATWG DOM Standard – replaceWith() 📙 MDN – Node.replaceChild()",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de replaceWith()?",
        "opciones": [
          "document.createElement(tagName)",
          "elemento.replaceWith(...nodos)",
          "elemento.append(...nodosOTexto)",
          "document.createTextNode(texto)",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor replaceWith()?",
        "opciones": [
          "Es un método del DOM que reemplaza el elemento por uno o varios nodos o strings en su misma posición del árbol.",
          "Es un método del DOM que permite crear un nuevo elemento HTML a partir de una etiqueta especificada.",
          "Es un método del DOM que inserta uno o varios nodos o strings al final del elemento, como últimos hijos.",
          "Método del DOM que crea un nuevo nodo de texto (Text) a partir de una cadena de caracteres.",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve replaceWith()?",
        "opciones": [
          "Crear elementos dinámicamente: Generar contenido HTML desde JavaScript.",
          "🔄 Sustituir un elemento por otro en su misma posición.",
          "➕ Añadir elementos al final de un contenedor.",
          "Sirve para crear texto mediante JavaScript y posteriormente incorporarlo a un elemento del DOM usando métodos como appendChild().",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a replaceWith()?",
        "opciones": [
          "Esperar que devuelva algo → Devuelve undefined | Pasar un array sin spread → Se convierte a string | Pasar null/undefined sin…",
          "1. Confundirlo con createElement() crea un nodo de texto. crea un elemento HTML.",
          "Esperar que devuelva algo → Devuelve undefined | Creer que interpreta HTML → Los strings son texto plano | Usar en null →…",
          "Esperar que devuelva el nodo → Devuelve undefined | Creer que interpreta HTML → Los strings son texto plano | Pasar…",
        ],
        "correcta": 2,
      },
    ],
  },
  "dom-remove": {
    "id": "dom-remove",
    "titulo": "remove()",
    "icon": "🗑️",
    "categoria": "DOM · Creación",
    "firma": "elemento.remove()",
    "simulador": "dom",
    "definicion": [
      "Es un **método del DOM** que **elimina el elemento** del árbol DOM al que pertenece, **sin necesidad de acceder a su padre**.",
    ],
    "queEs": [
      "Es la forma **moderna y directa** de eliminar un elemento del DOM.",
      "Antes se usaba `padre.removeChild(hijo)`, que requería conocer el nodo padre.",
      "`remove()` simplifica esto: **el elemento se elimina a sí mismo**.",
      "Forma parte de la interfaz `ChildNode` (junto con `before()`, `after()`, `replaceWith()`).",
    ],
    "paraQueSirve": [
      "🗑️ **Eliminar un elemento** del DOM.",
      "📋 Quitar **ítems** de una lista.",
      "💬 Borrar **mensajes** de un chat.",
      "🛒 Eliminar **productos** del carrito.",
      "🔔 Cerrar **notificaciones** o modales.",
      "🧹 **Limpiar** elementos temporales.",
      "🎯 **Eliminar** filas de una tabla.",
      "🎮 Quitar **enemigos** o elementos de un juego.",
    ],
    "comoFunciona": [
      "**No recibe argumentos**.",
      "Busca el **nodo padre** del elemento.",
      "Lo **elimina** de la lista de hijos del padre.",
      "**No devuelve nada** (`undefined`).",
      "Si el elemento **no tiene padre** (ya está desconectado) → **no hace nada** (silencioso).",
      "⚠️ **No elimina** los event listeners directamente, pero al no estar en el DOM, el elemento y sus listeners quedan **elegibles para recolección de basura** (si no hay otras referencias).",
    ],
    "sintaxis": [
      {
        "code": "elemento.remove()",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "code": "// ❌ TypeError si el elemento no existe\ndocument.querySelector(\".no-existe\").remove();\n\n// ✅ Verificar con optional chaining\ndocument.querySelector(\".no-existe\")?.remove();\n\n// ❌ Iterar una HTMLCollection viva mientras se elimina\nconst items = document.querySelectorAll(\".item\"); // NodeList estática ✅\nconst hijos = lista.children; // HTMLCollection viva ⚠️\n\nfor (const hijo of hijos) {\n  hijo.remove(); // ⚠️ la colección cambia durante la iteración\n}\n\n// ✅ Convertir a array primero\n[...lista.children].forEach(hijo => hijo.remove());\n\n// ❌ No limpiar referencias\nlet elemento = document.querySelector(\".item\");\nelemento.remove();\n// ⚠️ \"elemento\" sigue apuntando al nodo (fuga si persiste)\nelemento = null; // ✅ liberar",
      },
      {
        "titulo": "🔸 remove() en NodeList estática vs HTMLCollection viva",
        "code": "// ✅ NodeList estática (querySelectorAll)\nconst items = document.querySelectorAll(\".item\");\nitems.forEach(i => i.remove()); // seguro\n\n// ⚠️ HTMLCollection viva (children)\nconst hijos = lista.children;\n[...hijos].forEach(h => h.remove()); // ✅ convertir primero",
      },
      {
        "titulo": "🔸 remove() vs removeChild()",
        "code": "// ✅ Moderno\nelemento.remove();\n\n// ⚠️ Antiguo (requiere el padre)\nelemento.parentNode.removeChild(elemento);\n\n// ⚠️ Fallaría si no tiene padre\nelemento.parentNode.removeChild(elemento); // TypeError si parentNode es null\n\n// ✅ remove() es más seguro\nelemento.remove(); // no hace nada si no tiene padre",
      },
      {
        "titulo": "🔸 Limpieza de recursos",
        "code": "class Componente {\n  constructor(el) {\n    this.el = el;\n    this.intervalo = setInterval(() => console.log(\"tick\"), 1000);\n\n    this.el.querySelector(\".cerrar\").addEventListener(\"click\", () => {\n      this.destruir();\n    });\n  }\n\n  destruir() {\n    clearInterval(this.intervalo); // 🧼 cancelar timers\n    this.el.remove();              // 🗑️ quitar del DOM\n    this.el = null;                // 🧼 liberar referencia\n  }\n}",
      },
      {
        "titulo": "🔸 XSS y innerHTML = \"\"",
        "code": "// ⚠️ innerHTML = \"\" destruye TODOS los listeners\nlista.innerHTML = \"\";\n\n// ✅ replaceChildren() es equivalente pero más explícito\nlista.replaceChildren();\n\n// ✅ remove() en cada hijo (conserva otras cosas)\n[...lista.children].forEach(h => h.remove());",
      },
    ],
    "errores": [
      "Esperar que devuelva algo → ❌ Devuelve `undefined` | Usar en `null` → ❌ `TypeError` si el selector no encuentra | Creer que elimina del array original → ⚠️ Solo del DOM | No limpiar referencias en JS → ⚠️ Puede causar fugas de memoria | Usar en un nodo ya eliminado → ✅ Silencioso, no hace nada | Confundir con `removeChild` → `remove()` no necesita el padre | Olvidar cancelar timers/intervalos → ⚠️ Siguen ejecutándose | Eliminar mientras se itera en vivo → ⚠️ Comportamiento inconsistente | Usar en IE11 → ❌ No soportado (usa `removeChild`) | Esperar que se destruyan eventos → ⚠️ Solo si no hay más referencias",
    ],
    "casos": [
      "📋 **Quitar ítems** de listas.",
      "💬 **Eliminar mensajes** en un chat.",
      "🛒 **Quitar productos** del carrito.",
      "🔔 **Cerrar notificaciones** o toasts.",
      "❌ **Cerrar modales** o tooltips.",
      "🗑️ **Eliminar filas** de una tabla.",
      "🧹 **Limpiar** elementos temporales.",
    ],
    "relacion": [
      "`removeChild()` → Versión antigua (requiere el padre)",
      "`replaceChildren()` → Reemplaza todos los hijos",
      "`replaceWith()` → Reemplaza el elemento por otros",
      "`before()` / `after()` → Insertan alrededor del elemento",
      "`innerHTML = \"\"` → Borra todos los hijos (destructivo)",
      "`parentNode` → Referencia al padre",
      "`childNodes` / `children` → Listas de hijos",
    ],
    "analogia": "Imagina que el DOM es un **árbol genealógico** 🌳 de elementos. `removeChild(hijo)` = vas al **padre** y le dices: *\"quita a tu hijo\"*. Necesitas conocer al padre. `remove()` = el hijo **se va por su cuenta**: *\"me voy del árbol\"*. No necesita permiso del padre. Si ya no está en el árbol → no pasa nada. ⚠️ Cuando alguien se va del árbol, **desaparece visualmente** y deja de recibir eventos. Pero si tú **guardabas una foto suya** (referencia en JS), sigue existiendo en memoria hasta que la sueltes. Y si quieres que **todos los hijos** se vayan de golpe → `replaceChildren()` vacía la casa, pero `remove()` se lleva también la casa (el propio elemento).",
    "fuente": "📘 MDN – Element.remove() 📗 MDN – ChildNode.remove() 📕 WHATWG DOM Standard – remove() 📙 MDN – Node.removeChild()",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de remove()?",
        "opciones": [
          "elemento.remove()",
          "elemento.append(...nodosOTexto)",
          "document.createTextNode(texto)",
          "document.createElement(tagName)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor remove()?",
        "opciones": [
          "Es un método del DOM que inserta uno o varios nodos o strings al final del elemento, como últimos hijos.",
          "Es un método del DOM que elimina el elemento del árbol DOM al que pertenece, sin necesidad de acceder a su padre.",
          "Método del DOM que crea un nuevo nodo de texto (Text) a partir de una cadena de caracteres.",
          "Es un método del DOM que permite crear un nuevo elemento HTML a partir de una etiqueta especificada.",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve remove()?",
        "opciones": [
          "➕ Añadir elementos al final de un contenedor.",
          "🗑️ Eliminar un elemento del DOM.",
          "Sirve para crear texto mediante JavaScript y posteriormente incorporarlo a un elemento del DOM usando métodos como appendChild().",
          "Crear elementos dinámicamente: Generar contenido HTML desde JavaScript.",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a remove()?",
        "opciones": [
          "Esperar que devuelva el nodo → Devuelve undefined | Creer que interpreta HTML → Los strings son texto plano | Pasar…",
          "Esperar que devuelva algo → Devuelve undefined | Pasar un array sin spread → Se convierte a string | Pasar null/undefined sin…",
          "Esperar que devuelva algo → Devuelve undefined | Usar en null → TypeError si el selector no encuentra | Creer que elimina del…",
          "1. Confundirlo con createElement() crea un nodo de texto. crea un elemento HTML.",
        ],
        "correcta": 2,
      },
    ],
  },
  "dom-removechild": {
    "id": "dom-removechild",
    "titulo": "removeChild",
    "icon": "✂️",
    "categoria": "DOM · Creación",
    "firma": "elemento.removeChild(hijo)",
    "simulador": "dom",
    "definicion": [
      "Es un método del DOM que permite **eliminar un nodo hijo** específico de un elemento padre.",
      "El nodo eliminado se retorna y puede ser reutilizado o almacenado para futuras inserciones.",
    ],
    "queEs": [
      "`removeChild()` es un método nativo de JavaScript disponible en todos los nodos que pueden tener hijos.",
      "Elimina un nodo hijo del árbol DOM y lo devuelve como referencia, permitiendo su posterior reutilización o almacenamiento en memoria.",
      "**Características importantes**:",
      "Elimina el nodo del DOM de forma inmediata.",
      "Devuelve el nodo eliminado (puede reutilizarse).",
      "Requiere que el nodo a eliminar sea hijo directo del elemento padre.",
      "No elimina automáticamente los event listeners asociados al nodo.",
      "Los elementos eliminados permanecen en memoria si se guarda la referencia.",
    ],
    "paraQueSirve": [
      "**Eliminar elementos del DOM**: Remover elementos que ya no son necesarios.",
      "**Limpiar contenedores**: Vaciar listas, tablas o contenedores completos.",
      "**Reutilizar elementos**: Mover elementos de un lugar a otro.",
      "**Eliminar condicionalmente**: Remover elementos basados en condiciones.",
      "**Optimización de memoria**: Gestionar el ciclo de vida de los elementos.",
    ],
    "comoFunciona": [
      "Se selecciona el **elemento padre** que contiene el nodo a eliminar.",
      "Se pasa el **nodo hijo** como argumento.",
      "El navegador: Verifica que el nodo sea realmente un hijo del padre. Lo elimina del árbol DOM (sale del flujo del documento). Devuelve el nodo eliminado como referencia.",
      "El nodo permanece en memoria si se almacena en una variable.",
      "**Importante**: Si no se guarda la referencia, el nodo puede ser eliminado por el recolector de basura.",
    ],
    "sintaxis": [
      {
        "code": "const nodoEliminado = elementoPadre.removeChild(nodoHijo);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Básico - Eliminar un elemento",
        "code": "Item 1\n    Item 2\n    Item 3\n\nconst lista = document.getElementById('lista');\nconst item2 = document.getElementById('item2');\n\n// Eliminar item2\nconst eliminado = lista.removeChild(item2);\nconsole.log(eliminado.textContent); // \"Item 2\"\n// Resultado: Item 1, Item 3",
      },
      {
        "titulo": "Eliminar el último hijo",
        "code": "const lista = document.getElementById('lista');\n\n// Eliminar el último elemento\nif (lista.lastChild) {\n    const ultimo = lista.removeChild(lista.lastChild);\n    console.log('Eliminado:', ultimo.textContent);\n}",
      },
      {
        "titulo": "Eliminar el primer hijo",
        "code": "const lista = document.getElementById('lista');\n\n// Eliminar el primer elemento\nif (lista.firstChild) {\n    const primero = lista.removeChild(lista.firstChild);\n    console.log('Eliminado:', primero.textContent);\n}",
      },
      {
        "titulo": "Vaciar completamente un contenedor",
        "code": "function vaciarContenedor(contenedor) {\n    while (contenedor.firstChild) {\n        contenedor.removeChild(contenedor.firstChild);\n    }\n}\n\n// Uso\nconst contenedor = document.getElementById('contenedor');\nvaciarContenedor(contenedor);",
      },
      {
        "titulo": "Eliminar elementos condicionalmente",
        "code": "Tarea completada 1\n    Tarea pendiente\n    Tarea completada 2\n\nfunction eliminarTareasCompletadas() {\n    const lista = document.getElementById('lista');\n    const items = lista.children;\n\n    // Iterar hacia atrás para evitar problemas de índice\n    for (let i = items.length - 1; i >= 0; i--) {\n        const item = items[i];\n        if (item.dataset.completado === 'true') {\n            lista.removeChild(item);\n        }\n    }\n}\n\n// Uso\neliminarTareasCompletadas();\n// Resultado: Solo queda la tarea pendiente",
      },
      {
        "titulo": "Reutilizar un elemento eliminado",
        "code": "// Mover un elemento de un contenedor a otro\nfunction moverElemento(elemento, nuevoPadre) {\n    const padreActual = elemento.parentNode;\n    if (padreActual) {\n        const movido = padreActual.removeChild(elemento);\n        nuevoPadre.appendChild(movido);\n        return movido;\n    }\n    return null;\n}\n\n// Uso\nconst elemento = document.getElementById('mover');\nconst nuevoContenedor = document.getElementById('nuevo');\nmoverElemento(elemento, nuevoContenedor);",
      },
      {
        "titulo": "Eliminar con confirmación",
        "code": "function eliminarConConfirmacion(elemento) {\n    const texto = elemento.textContent || elemento.innerText || 'elemento';\n\n    if (confirm(`¿Estás seguro de eliminar \"${texto}\"?`)) {\n        const padre = elemento.parentNode;\n        if (padre) {\n            padre.removeChild(elemento);\n            return true;\n        }\n    }\n    return false;\n}\n\n// Uso en un botón de eliminar\nconst botonEliminar = document.getElementById('btn-eliminar');\nbotonEliminar.addEventListener('click', function() {\n    const item = this.closest('.item');\n    eliminarConConfirmacion(item);\n});",
      },
    ],
    "errores": [
      {
        "texto": "**Intentar eliminar un nodo que no es hijo**:",
        "code": "const padre = document.getElementById('padre');\nconst hijoDeOtro = document.getElementById('otro');\n\n// ❌ Error: \"Node was not found\" o similar\npadre.removeChild(hijoDeOtro);\n\n// ✅ Verificar\nif (padre.contains(hijoDeOtro)) {\n    padre.removeChild(hijoDeOtro);\n}",
      },
      {
        "texto": "**No guardar la referencia del nodo eliminado**:",
        "code": "// ⚠️ El nodo se elimina sin posibilidad de recuperarlo\ndocument.getElementById('padre').removeChild(document.getElementById('hijo'));\n\n// ✅ Guardar referencia si se necesita reutilizar\nconst hijo = document.getElementById('hijo');\nconst padre = document.getElementById('padre');\nconst eliminado = padre.removeChild(hijo);\n// Ahora puedes reutilizar 'eliminado'",
      },
      {
        "texto": "**Event listeners perdidos**:",
        "code": "const boton = document.getElementById('miBoton');\nboton.addEventListener('click', handler);\n\n// ❌ El event listener se pierde al eliminar el elemento\nconst padre = boton.parentNode;\npadre.removeChild(boton);\n\n// Si luego se vuelve a insertar, el evento NO está\notroPadre.appendChild(boton); // El evento NO se mantiene\n\n// ✅ Guardar el listener o usar event delegation\n// Opción 1: Usar delegación de eventos\ndocument.getElementById('padre').addEventListener('click', (e) => {\n    if (e.target.id === 'miBoton') {\n        handler(e);\n    }\n});",
      },
      {
        "texto": "**Iterar hacia adelante al eliminar**:",
        "code": "const lista = document.getElementById('lista');\nconst items = lista.children;\n\n// ❌ Problema: los índices cambian\nfor (let i = 0; i = 0; i--) {\n    if (items[i].dataset.eliminar === 'true') {\n        lista.removeChild(items[i]);\n    }\n}",
      },
      {
        "texto": "**Intentar eliminar el elemento raíz**:",
        "code": "// ❌ Error: no se puede eliminar html o body\ndocument.removeChild(document.documentElement);\ndocument.body.removeChild(document.body);",
      },
    ],
    "casos": [
      "**Eliminar tareas** → Remover items de una lista de tareas",
      "**Eliminar filas** → Remover filas de una tabla",
      "**Cerrar modales** → Eliminar popups/ventanas emergentes",
      "**Limpiar contenedores** → Vaciar listas o contenedores",
      "**Carrito de compras** → Eliminar productos del carrito",
      "**Mensajes/Notificaciones** → Cerrar notificaciones",
      "**Elementos temporales** → Eliminar tooltips, mensajes de error",
    ],
    "relacion": [
      "`removeChild()` → Elimina un hijo específico, devuelve el nodo eliminado.",
      "`remove()` → Elimina el elemento directamente (moderno).",
      "`replaceChild()` → Reemplaza un hijo con otro.",
      "`appendChild()` → Añade un hijo al final.",
      "`insertBefore()` → Inserta antes de un nodo.",
      "`innerHTML = ''` → Elimina todo el contenido interno (más rápido pero menos controlado).",
      "`textContent = ''` → Elimina contenido y texto (más rápido).",
    ],
    "analogia": "`removeChild()` es como **retirar un libro de una estantería**. Tienes una estantería (el padre) con libros (los hijos). Quieres quitar un libro específico. El método: Identifica el libro que quieres quitar. Lo retira de la estantería. Te lo entrega en la mano para que puedas hacer con él lo que quieras (guardarlo, reubicarlo, desecharlo). Es una acción precisa y controlada, a diferencia de limpiar toda la estantería (`innerHTML = ''`).",
    "fuente": "MDN Web Docs - removeChild W3Schools - removeChild MDN - Element.remove Especificación DOM Living Standard - WHATWG",
    "notasPersonales": [
      "**Rendimiento**: `removeChild()` es eficiente para eliminar elementos individuales. Para eliminar múltiples elementos, iterar hacia atrás o usar `innerHTML = ''` es más rápido. Eliminar elementos uno por uno en un bucle es más lento que `innerHTML = ''`.",
      "**Comparativa de métodos de eliminación**:",
      "Código: // ✅ Más rápido para limpiar todo el contenido",
      "**Buenas prácticas**:",
      "Código: // ✅ Guardar referencia si se reutiliza",
      "**Alternativas modernas**:",
      "Código: // Antiguo: removeChild",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de removeChild?",
        "opciones": [
          "document.createTextNode(texto)",
          "elemento.append(...nodosOTexto)",
          "elemento.removeChild(hijo)",
          "document.createElement(tagName)",
        ],
        "correcta": 2,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor removeChild?",
        "opciones": [
          "Es un método del DOM que inserta uno o varios nodos o strings al final del elemento, como últimos hijos.",
          "Método del DOM que crea un nuevo nodo de texto (Text) a partir de una cadena de caracteres.",
          "Es un método del DOM que permite eliminar un nodo hijo específico de un elemento padre.",
          "Es un método del DOM que permite crear un nuevo elemento HTML a partir de una etiqueta especificada.",
        ],
        "correcta": 2,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve removeChild?",
        "opciones": [
          "➕ Añadir elementos al final de un contenedor.",
          "Sirve para crear texto mediante JavaScript y posteriormente incorporarlo a un elemento del DOM usando métodos como appendChild().",
          "Eliminar elementos del DOM: Remover elementos que ya no son necesarios.",
          "Crear elementos dinámicamente: Generar contenido HTML desde JavaScript.",
        ],
        "correcta": 2,
      },
      {
        "id": 4,
        "pregunta": "¿En qué caso de uso encaja removeChild?",
        "opciones": [
          "📋 Construir listas dinámicamente (<ul>, <ol>).",
          "Listas dinámicas → Añadir items a <ul> o <ol>",
          "Eliminar tareas → Remover items de una lista de tareas",
          "Listas dinámicas → Crear <li> desde datos",
        ],
        "correcta": 2,
      },
    ],
  },
};
