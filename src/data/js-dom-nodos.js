/* Generado desde src/ApuntesFormatoHtml — no editar a mano.
   Regenerar con: node scripts/generate-apuntes.mjs */

export const JS_DOM_NODOS = {
  "id": "dom-nodos",
  "label": "DOM · Navegación",
  "icon": "🌳",
  "titulo": "Navegación del árbol DOM",
  "descripcion": "Recorre padres, hijos y hermanos, y distingue entre nodos, elementos y tipos de nodo.",
  "grupos": [
    {
      "seccion": "Relaciones entre nodos",
      "metodos": [
        {
          "id": "dom-parentelement",
          "nombre": "parentElement",
          "firma": "nodo.parentElement",
          "icon": "⬆️",
        },
        {
          "id": "dom-childnodes",
          "nombre": "childNodes",
          "firma": "nodo.childNodes",
          "icon": "👶",
        },
        {
          "id": "dom-firstchild",
          "nombre": "firstChild",
          "firma": "nodo.firstChild",
          "icon": "⏮️",
        },
        {
          "id": "dom-firstelementchild",
          "nombre": "firstElementChild",
          "firma": "nodo.firstElementChild",
          "icon": "🥇",
        },
        {
          "id": "dom-lastchild",
          "nombre": "lastChild",
          "firma": "nodo.lastChild",
          "icon": "⏭️",
        },
        {
          "id": "dom-lastelementchild",
          "nombre": "lastElementChild",
          "firma": "nodo.lastElementChild",
          "icon": "🏁",
        },
        {
          "id": "dom-nextelementsibling",
          "nombre": "nextElementSibling",
          "firma": "nodo.nextElementSibling",
          "icon": "➡️",
        },
        {
          "id": "dom-previouselementsibling",
          "nombre": "previousElementSibling",
          "firma": "nodo.previousElementSibling",
          "icon": "⬅️",
        },
        {
          "id": "dom-nodename",
          "nombre": "nodeName",
          "firma": "nodo.nodeName",
          "icon": "🔖",
        },
        {
          "id": "dom-nodetype",
          "nombre": "nodeType",
          "firma": "nodo.nodeType",
          "icon": "🔢",
        },
        {
          "id": "dom-nodecontains",
          "nombre": "Node.contains()",
          "firma": "nodo.contains(otroNodo)",
          "icon": "🧭",
        },
      ],
    },
  ],
};

export const JS_DOM_NODOS_DOCS = {
  "dom-parentelement": {
    "id": "dom-parentelement",
    "titulo": "parentElement",
    "icon": "⬆️",
    "categoria": "DOM · Navegación",
    "firma": "nodo.parentElement",
    "simulador": "dom",
    "definicion": [
      "Propiedad del **DOM** que devuelve el **elemento HTML padre** de un elemento.",
    ],
    "queEs": [
      "`parentElement` permite subir **un nivel en el árbol del DOM** para acceder al elemento HTML que contiene directamente al elemento actual.",
      "Por ejemplo:",
      "Si estamos en `<p>`:",
      "Devuelve:",
      "👉 `parentElement`** = \"¿Cuál es mi elemento HTML padre?\"**",
    ],
    "paraQueSirve": [
      "Sirve para **subir desde un elemento hacia su elemento padre** y poder acceder o modificar ese contenedor.",
    ],
    "comoFunciona": [
      "El DOM tiene una estructura de árbol:",
      "Si ejecutamos:",
      "subimos un nivel:",
      "Otro ejemplo:",
      "Podemos subir progresivamente:",
    ],
    "sintaxis": [
      {
        "code": "element.parentElement",
      },
      {
        "caption": "Retorno",
        "code": "null",
      },
      {
        "caption": "Por ejemplo, para ciertos nodos que están directamente relacionados con el documento:",
        "code": "document.documentElement.parentElement;// null",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "descripcion": "**Obtener el padre:**",
        "code": "const boton=document.querySelector(\"button\");\nconst contenedor=boton.parentElement;\nconsole.log(contenedor);\n\nboton.parentElement.style.backgroundColor=\"yellow\";\n\nconst elemento=document.querySelector(\".hijo\");\nconst abuelo=elemento.parentElement.parentElement;\n\nabuelo\n  │\npadre\n  │\nhijo",
      },
    ],
    "errores": [
      {
        "texto": "**1. Confundirlo con **`parentNode` Ambos permiten subir hacia el padre, pero existe una diferencia: `parentNode` puede devolver cualquier tipo de `Node`, mientras que `parentElement` devuelve un `Element` o `null`.",
        "code": "parentNode\n    ↓\ndevuelve el nodo padre\n\nparentElement\n    ↓\ndevuelve el elemento HTML padre",
      },
      {
        "texto": "**2. Confundirlo con **`children` ➡️ **Sube** hacia el padre. ➡️ **Baja** hacia los elementos hijos.",
        "code": "element.parentElement\n\nelement.children\n\nparentElement\n             ↑\n             │\n\n             │\n             ↓\n          children",
      },
      {
        "texto": "**3. Confundirlo con **`parentElement.parentElement` ➡️ padre. ➡️ padre del padre.",
        "code": "element.parentElement\n\nelement.parentElement.parentElement\n\nabuelo\n  ↑\npadre\n  ↑\nelemento",
      },
    ],
    "casos": [
      "Acceder al contenedor de un elemento.",
      "Modificar el elemento padre.",
      "Subir por la estructura del DOM.",
      "Crear componentes o interfaces dinámicas.",
      "Encontrar contenedores relacionados.",
      "Manipular elementos sin volver a buscarlos desde `document`.",
    ],
    "relacion": [
      "`parentElement` pertenece a las propiedades de **navegación del árbol DOM**:",
      "También se relaciona directamente con:",
      "Y con:",
      "`parentNode` → padre como nodo.",
      "`children` → elementos hijos.",
      "`firstElementChild` → primer elemento hijo.",
      "`lastElementChild` → último elemento hijo.",
    ],
    "analogia": "Imagina una familia 👨‍👩‍👦: Si estás en el hijo y preguntas: **\"¿Quién es mi padre?\"** ➡️ 👨 Padre. Y si haces: estás preguntando: **\"¿Quién es el padre de mi padre?\"** ➡️ 👴 Abuelo.",
    "fuente": "MDN — Element.parentElement",
    "notasPersonales": [
      "`parentElement`** → obtiene el elemento HTML padre inmediato.**",
      "🧠 Regla rápida:",
      "Y recuerda la dirección:",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de parentElement?",
        "opciones": [
          "nodo.childNodes",
          "nodo.firstElementChild",
          "nodo.firstChild",
          "nodo.parentElement",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor parentElement?",
        "opciones": [
          "Propiedad del DOM que devuelve el primer nodo hijo de un elemento o nodo.",
          "Propiedad del DOM que devuelve una colección con todos los nodos hijos de un nodo.",
          "Propiedad del DOM que devuelve el primer elemento HTML hijo de un nodo.",
          "Propiedad del DOM que devuelve el elemento HTML padre de un elemento.",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve parentElement?",
        "opciones": [
          "Sirve para obtener y recorrer todos los nodos hijos directos de un nodo.",
          "Sirve para obtener rápidamente el primer nodo hijo de un elemento.",
          "Sirve para acceder directamente al primer elemento HTML hijo sin preocuparte por espacios, saltos de línea o comentarios del…",
          "Sirve para subir desde un elemento hacia su elemento padre y poder acceder o modificar ese contenedor.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a parentElement?",
        "opciones": [
          "1. Confundirlo con firstElementChild Esta diferencia es fundamental: ➡️ Primer nodo, incluyendo texto. ➡️ Primer elemento HTML,…",
          "1. Confundir childNodes con children Esta es la diferencia más importante: ➡️ Todos los nodos hijos. ➡️ Solo los elementos HTML…",
          "1. Confundir lastChild con lastElementChild Esta es la diferencia MÁS importante: ➡️ Devuelve el último nodo, incluyendo texto.…",
          "1. Confundirlo con parentNode Ambos permiten subir hacia el padre, pero existe una diferencia: parentNode puede devolver…",
        ],
        "correcta": 3,
      },
    ],
  },
  "dom-childnodes": {
    "id": "dom-childnodes",
    "titulo": "childNodes",
    "icon": "👶",
    "categoria": "DOM · Navegación",
    "firma": "nodo.childNodes",
    "simulador": "dom",
    "definicion": [
      "Propiedad del **DOM** que devuelve una colección con **todos los nodos hijos** de un nodo.",
    ],
    "queEs": [
      "`childNodes` es una propiedad de `Node` que permite acceder a **todos los nodos que están directamente dentro** de un elemento o nodo.",
      "⚠️ Incluye **elementos HTML, texto, comentarios**, etc.",
      "Por ejemplo:",
      "El navegador puede representarlo así:",
      "Por eso `childNodes` puede contener más nodos de los que aparentemente ves como elementos HTML.",
    ],
    "paraQueSirve": [
      "Sirve para **obtener y recorrer todos los nodos hijos directos** de un nodo.",
      "Por ejemplo:",
      "Devuelve una colección llamada `NodeList`.",
    ],
    "comoFunciona": [
      "Imagina el DOM como un árbol 🌳:",
      "`childNodes` mira directamente debajo de `div`:",
      "No busca los descendientes más profundos.",
      "Por ejemplo:",
      "Para:",
      "el `<p>` **no aparece**, porque es un nieto de `div`, no un hijo directo.",
    ],
    "sintaxis": [
      {
        "code": "element.childNodes",
      },
      {
        "caption": "Retorno",
        "code": "const hijos=elemento.childNodes;\nconsole.log(hijos);// NodeList(...)",
      },
      {
        "caption": "Si no tiene hijos:",
        "code": "elemento.childNodes.length;// 0",
      },
      {
        "caption": "Puedes acceder a un nodo por índice:",
        "code": "elemento.childNodes[0];\nelemento.childNodes[1];",
      },
      {
        "caption": "Y recorrerlos:",
        "code": "elemento.childNodes.forEach((nodo) => {\n\tconsole.log(nodo);\n});",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "descripcion": "**Obtener todos los nodos hijos:**",
        "code": "const div=document.querySelector(\"div\");\nconst hijos=div.childNodes;\nconsole.log(hijos);\n\nconst primero=div.childNodes[0];\n\ndiv.firstChild;\n\nchildNodes[0]\n      ↓\nprimer nodo hijo\n      ↓\nfirstChild\n\nconsole.log(div.childNodes.length);\n\ndiv.childNodes.forEach((nodo) => {\n\t\tconsole.log(nodo.nodeName);\n});\n\n\"#text\"\n\"P\"\n\"#text\"\n\"SPAN\"",
      },
    ],
    "errores": [
      {
        "texto": "**1. Confundir **`childNodes`** con **`children` Esta es la diferencia más importante: ➡️ Todos los **nodos hijos**. ➡️ Solo los **elementos HTML hijos**. `childNodes` → `NodeList` · ✅ Sí | `children` → `HTMLCollection` · ❌ No Por ejemplo: `childNodes` puede contener: Mientras `children` contiene:",
        "code": "element.childNodes\n\nelement.children\n\nHolaAdiós\n\nText\nP\nText\nSPAN\n\nP\nSPAN",
      },
      {
        "texto": "**2. Pensar que solo devuelve elementos HTML** ❌: No necesariamente. Puede devolver: etc.",
        "code": "childNodes → ,\n\nText\nElement\nComment",
      },
      {
        "texto": "**3. Pensar que devuelve descendientes** `childNodes` solo obtiene **hijos directos**. Para `div`: `p` no está incluido.",
        "code": "div\n└── section\n    └── p\n\nchildNodes\n   ↓\nsection",
      },
    ],
    "casos": [
      "Recorrer nodos del DOM.",
      "Inspeccionar la estructura de un elemento.",
      "Detectar nodos de texto.",
      "Trabajar con `nodeType` y `nodeName`.",
      "Manipular nodos hijos.",
      "Crear algoritmos para recorrer árboles DOM.",
      "Trabajar con espacios, comentarios y elementos como nodos independientes.",
    ],
    "relacion": [
      "Aquí se conecta muchísimo con los conceptos que acabas de estudiar:",
      "Y la comparación:",
    ],
    "analogia": "Imagina una **caja 📦** que contiene diferentes cosas: `childNodes` significa: **\"Dame TODO lo que está directamente dentro de la caja.\"** No importa si es un elemento, texto o comentario. En cambio `children` sería: **\"Dame solamente los objetos que sean elementos HTML.\"**",
    "fuente": "MDN — Node.childNodes",
    "notasPersonales": [
      "`childNodes`** → devuelve todos los nodos hijos directos de un nodo.**",
      "🧠 Regla para memorizar:",
      "Mientras:",
      "Y una conexión clave:",
      "`childNodes`** = \"dame todos mis hijos como nodos\".**",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de childNodes?",
        "opciones": [
          "nodo.firstElementChild",
          "nodo.firstChild",
          "nodo.parentElement",
          "nodo.childNodes",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor childNodes?",
        "opciones": [
          "Propiedad del DOM que devuelve el primer nodo hijo de un elemento o nodo.",
          "Propiedad del DOM que devuelve el primer elemento HTML hijo de un nodo.",
          "Propiedad del DOM que devuelve el elemento HTML padre de un elemento.",
          "Propiedad del DOM que devuelve una colección con todos los nodos hijos de un nodo.",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve childNodes?",
        "opciones": [
          "Sirve para obtener rápidamente el primer nodo hijo de un elemento.",
          "Sirve para acceder directamente al primer elemento HTML hijo sin preocuparte por espacios, saltos de línea o comentarios del…",
          "Sirve para subir desde un elemento hacia su elemento padre y poder acceder o modificar ese contenedor.",
          "Sirve para obtener y recorrer todos los nodos hijos directos de un nodo.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a childNodes?",
        "opciones": [
          "1. Confundir lastChild con lastElementChild Esta es la diferencia MÁS importante: ➡️ Devuelve el último nodo, incluyendo texto.…",
          "1. Confundirlo con parentNode Ambos permiten subir hacia el padre, pero existe una diferencia: parentNode puede devolver…",
          "1. Confundirlo con firstElementChild Esta diferencia es fundamental: ➡️ Primer nodo, incluyendo texto. ➡️ Primer elemento HTML,…",
          "1. Confundir childNodes con children Esta es la diferencia más importante: ➡️ Todos los nodos hijos. ➡️ Solo los elementos HTML…",
        ],
        "correcta": 3,
      },
    ],
  },
  "dom-firstchild": {
    "id": "dom-firstchild",
    "titulo": "firstChild",
    "icon": "⏮️",
    "categoria": "DOM · Navegación",
    "firma": "nodo.firstChild",
    "simulador": "dom",
    "definicion": [
      "Propiedad del **DOM** que devuelve el **primer nodo hijo** de un elemento o nodo.",
    ],
    "queEs": [
      "`firstChild` es una propiedad de `Node` que permite acceder al primer nodo que se encuentra dentro de otro nodo.",
      "⚠️ Al igual que `lastChild`, **incluye nodos de texto**, como espacios y saltos de línea.",
    ],
    "paraQueSirve": [
      "Sirve para obtener rápidamente el **primer nodo hijo** de un elemento.",
      "Por ejemplo:",
      "En este caso, el primer hijo es el elemento `<p>`.",
      "Pero si tienes:",
      "el primer hijo puede ser un **nodo de texto** que representa el salto de línea y los espacios antes de `<p>`.",
    ],
    "comoFunciona": [
      "El DOM representa el HTML como un **árbol de nodos**:",
      "Entonces:",
      "apunta al primer nodo:",
    ],
    "sintaxis": [
      {
        "code": "element.firstChild",
      },
      {
        "caption": "Parámetros",
        "code": "element.firstChild",
      },
      {
        "caption": "Retorno",
        "code": "null",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "descripcion": "**Obtener el primer nodo:**",
        "code": "const lista=document.querySelector(\"ul\");\nconst primero=lista.firstChild;\nconsole.log(primero);\n\nconst primero=elemento.firstChild;\nconst ultimo=elemento.lastChild;\n\nfirstChild → primer nodo\nlastChild  → último nodo",
      },
    ],
    "errores": [
      {
        "texto": "**1. Confundirlo con **`firstElementChild` Esta diferencia es fundamental: ➡️ Primer **nodo**, incluyendo texto. ➡️ Primer **elemento HTML**, ignorando nodos de texto. Por ejemplo: Puede ocurrir: mientras:",
        "code": "element.firstChild\n\nelement.firstElementChild\n\nHola\n\nfirstChild\n    ↓\nText (\"\\n    \")\n\nfirstElementChild\n    ↓",
      },
      {
        "texto": "**2. Confundir propiedad con método** ❌: ✅:",
        "code": "element.firstChild();\n\nelement.firstChild;",
      },
    ],
    "casos": [
      "Acceder al primer nodo de un elemento.",
      "Recorrer árboles DOM.",
      "Manipular nodos.",
      "Inspeccionar la estructura interna de un elemento.",
      "Trabajar junto con `lastChild`, `nextSibling` y `previousSibling`.",
    ],
    "relacion": [
      "También existe:",
      "Y su pareja:",
    ],
    "analogia": "Imagina una fila: `firstChild` señala al **primero de la fila**. Pero recuerda que en el DOM la fila puede contener diferentes tipos de nodos:",
    "fuente": "MDN — Node.firstChild",
    "notasPersonales": [
      "`firstChild`** → obtiene el primer nodo hijo.**",
      "🧠 Para memorizar:",
      "**Clave:** `firstChild` puede devolver un `Text`, mientras que `firstElementChild` busca específicamente el primer elemento HTML.",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de firstChild?",
        "opciones": [
          "nodo.firstElementChild",
          "nodo.childNodes",
          "nodo.parentElement",
          "nodo.firstChild",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor firstChild?",
        "opciones": [
          "Propiedad del DOM que devuelve el primer elemento HTML hijo de un nodo.",
          "Propiedad del DOM que devuelve el elemento HTML padre de un elemento.",
          "Propiedad del DOM que devuelve una colección con todos los nodos hijos de un nodo.",
          "Propiedad del DOM que devuelve el primer nodo hijo de un elemento o nodo.",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve firstChild?",
        "opciones": [
          "Sirve para subir desde un elemento hacia su elemento padre y poder acceder o modificar ese contenedor.",
          "Sirve para acceder directamente al primer elemento HTML hijo sin preocuparte por espacios, saltos de línea o comentarios del…",
          "Sirve para obtener y recorrer todos los nodos hijos directos de un nodo.",
          "Sirve para obtener rápidamente el primer nodo hijo de un elemento.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a firstChild?",
        "opciones": [
          "1. Confundir lastChild con lastElementChild Esta es la diferencia MÁS importante: ➡️ Devuelve el último nodo, incluyendo texto.…",
          "1. Confundirlo con parentNode Ambos permiten subir hacia el padre, pero existe una diferencia: parentNode puede devolver…",
          "1. Confundir childNodes con children Esta es la diferencia más importante: ➡️ Todos los nodos hijos. ➡️ Solo los elementos HTML…",
          "1. Confundirlo con firstElementChild Esta diferencia es fundamental: ➡️ Primer nodo, incluyendo texto. ➡️ Primer elemento HTML,…",
        ],
        "correcta": 3,
      },
    ],
  },
  "dom-firstelementchild": {
    "id": "dom-firstelementchild",
    "titulo": "firstElementChild",
    "icon": "🥇",
    "categoria": "DOM · Navegación",
    "firma": "nodo.firstElementChild",
    "simulador": "dom",
    "definicion": [
      "Propiedad del **DOM** que devuelve el **primer elemento HTML hijo** de un nodo.",
    ],
    "queEs": [
      "`firstElementChild` es una propiedad que permite obtener el primer **elemento (**`Element`**)** que se encuentra directamente dentro de otro elemento.",
      "A diferencia de `firstChild`, **ignora los nodos de texto y comentarios**.",
    ],
    "paraQueSirve": [
      "Sirve para acceder directamente al **primer elemento HTML hijo** sin preocuparte por espacios, saltos de línea o comentarios del código HTML.",
    ],
    "comoFunciona": [
      "Por ejemplo:",
      "El DOM puede contener:",
      "Entonces:",
      "puede devolver:",
      "Pero:",
      "devuelve:",
      "👉 **Busca específicamente el primer elemento HTML.**",
    ],
    "sintaxis": [
      {
        "code": "element.firstElementChild",
      },
      {
        "caption": "Retorno",
        "code": "null",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "descripcion": "**Obtener el primer **`<li>`**:**",
        "code": "const lista=document.querySelector(\"ul\");\nconst primero=lista.firstElementChild;\nconsole.log(primero);\n\nUnoDosTres\n\nUno\n\nlista.firstElementChild.textContent=\"Primer elemento\";",
      },
    ],
    "errores": [
      {
        "texto": "**1. Confundirlo con **`firstChild` Esta es la diferencia fundamental: Por ejemplo: Puede ocurrir: mientras:",
        "code": "firstChild\n    ↓\nprimer NODO\n    ↓\npuede ser Text, Comment, Element...\n\nfirstElementChild\n    ↓\nprimer ELEMENTO\n    ↓\nsolo elementos HTML\n\nHola\n\ndiv.firstChild// Text (\"\\n    \")\n\ndiv.firstElementChild// Hola",
      },
      {
        "texto": "**2. Confundir propiedad con método** ❌: ✅:",
        "code": "element.firstElementChild();\n\nelement.firstElementChild;",
      },
    ],
    "casos": [
      "Obtener el primer `<li>` de una lista.",
      "Acceder al primer `<div>`, `<p>`, `<button>`, etc.",
      "Modificar el primer elemento hijo.",
      "Recorrer estructuras del DOM.",
      "Manipular elementos sin que los espacios o saltos de línea interfieran.",
    ],
    "relacion": [
      "Las cuatro propiedades forman una familia muy fácil de recordar:",
      "`firstChild` → Primer nodo · ✅",
      "`lastChild` → Último nodo · ✅",
      "`firstElementChild` → Primer elemento · ❌",
      "`lastElementChild` → Último elemento · ❌",
      "🧠 La regla es:",
    ],
    "analogia": "Imagina que dentro de una caja 📦 hay: `firstChild` dice: \"Dame lo primero que haya.\" ➡️ 📝 texto `firstElementChild` dice: \"Dame el primer elemento HTML.\" ➡️ 🟦 elemento",
    "fuente": "MDN — Element.firstElementChild",
    "notasPersonales": [
      "`firstElementChild`** → obtiene el primer elemento HTML hijo, ignorando nodos de texto y comentarios.**",
      "🧠 Para memorizar toda la familia:",
      "`firstElementChild`** = \"dame el primer HTML hijo\".**",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de firstElementChild?",
        "opciones": [
          "nodo.childNodes",
          "nodo.firstElementChild",
          "nodo.firstChild",
          "nodo.parentElement",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor firstElementChild?",
        "opciones": [
          "Propiedad del DOM que devuelve el primer elemento HTML hijo de un nodo.",
          "Propiedad del DOM que devuelve una colección con todos los nodos hijos de un nodo.",
          "Propiedad del DOM que devuelve el primer nodo hijo de un elemento o nodo.",
          "Propiedad del DOM que devuelve el elemento HTML padre de un elemento.",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve firstElementChild?",
        "opciones": [
          "Sirve para obtener y recorrer todos los nodos hijos directos de un nodo.",
          "Sirve para acceder directamente al primer elemento HTML hijo sin preocuparte por espacios, saltos de línea o comentarios del…",
          "Sirve para obtener rápidamente el primer nodo hijo de un elemento.",
          "Sirve para subir desde un elemento hacia su elemento padre y poder acceder o modificar ese contenedor.",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿En qué caso de uso encaja firstElementChild?",
        "opciones": [
          "Obtener el primer <li> de una lista.",
          "Acceder al último nodo de un elemento.",
          "Acceder al primer nodo de un elemento.",
          "Acceder al contenedor de un elemento.",
        ],
        "correcta": 0,
      },
    ],
  },
  "dom-lastchild": {
    "id": "dom-lastchild",
    "titulo": "lastChild",
    "icon": "⏭️",
    "categoria": "DOM · Navegación",
    "firma": "nodo.lastChild",
    "simulador": "dom",
    "definicion": [
      "Propiedad del **DOM** que devuelve el **último nodo hijo** de un elemento.",
    ],
    "queEs": [
      "`lastChild` es una propiedad de `Node` que permite acceder al último nodo que existe dentro de un elemento.",
      "⚠️ Importante: **incluye cualquier tipo de nodo**, incluso nodos de texto como espacios y saltos de línea.",
    ],
    "paraQueSirve": [
      "Sirve para obtener rápidamente el **último hijo** de un nodo del DOM.",
      "Por ejemplo:",
      "Dependiendo del formato del HTML, puede devolverte un **nodo de texto** debido al salto de línea después de `</p>`.",
    ],
    "comoFunciona": [
      "El navegador representa el contenido como un árbol de nodos:",
      "Por eso `lastChild` no significa necesariamente **\"último elemento HTML\"**.",
    ],
    "sintaxis": [
      {
        "code": "element.lastChild",
      },
      {
        "caption": "Parámetros",
        "code": "element.lastChild",
      },
      {
        "caption": "Retorno",
        "code": "null",
      },
      {
        "caption": "Ejemplo:",
        "code": "const div=document.querySelector(\"div\");\nconsole.log(div.lastChild);",
      },
      {
        "caption": "Puede devolver:",
        "code": "Text",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "descripcion": "**Obtener el último nodo:**",
        "code": "const lista=document.querySelector(\"ul\");\nconst ultimo=lista.lastChild;\n\nconsole.log(element.firstChild);\nconsole.log(element.lastChild);\n\nfirstChild → primer nodo hijo\nlastChild  → último nodo hijo",
      },
    ],
    "errores": [
      {
        "texto": "**1. Confundir **`lastChild`** con **`lastElementChild` Esta es la diferencia MÁS importante: ➡️ Devuelve el último **nodo**, incluyendo texto. ➡️ Devuelve el último **elemento HTML**, ignorando nodos de texto. Por ejemplo: Puede ocurrir: mientras:",
        "code": "element.lastChild\n\nelement.lastElementChild\n\nHola\n\nlastChild\n   ↓\nText (\"\\n\")\n\nlastElementChild\n   ↓",
      },
      {
        "texto": "**2. Pensar que es un método** ❌ Incorrecto: ✅ Correcto:",
        "code": "element.lastChild();\n\nelement.lastChild;",
      },
    ],
    "casos": [
      "Acceder al último nodo de un elemento.",
      "Recorrer estructuras del DOM.",
      "Manipular nodos.",
      "Trabajar con árboles de nodos.",
      "Analizar la estructura interna de un elemento.",
      "Combinarlo con propiedades como `parentNode`, `nextSibling` y `previousSibling`.",
    ],
    "relacion": [
      "Y existe otra pareja especialmente importante:",
    ],
    "analogia": "Imagina una fila de personas 👥: `lastChild` simplemente señala a **quien está al final de la fila**. Pero en el DOM la fila puede contener diferentes tipos de \"personas\":",
    "fuente": "MDN — Node.lastChild",
    "notasPersonales": [
      "`lastChild`** → obtiene el último nodo hijo de un nodo.**",
      "🧠 La clave para no confundirte:",
      "Mientras que:",
      "`lastChild`** es una propiedad de **`Node`**, no un método.**",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de lastChild?",
        "opciones": [
          "nodo.childNodes",
          "nodo.lastChild",
          "nodo.parentElement",
          "nodo.firstChild",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor lastChild?",
        "opciones": [
          "Propiedad del DOM que devuelve el último nodo hijo de un elemento.",
          "Propiedad del DOM que devuelve una colección con todos los nodos hijos de un nodo.",
          "Propiedad del DOM que devuelve el elemento HTML padre de un elemento.",
          "Propiedad del DOM que devuelve el primer nodo hijo de un elemento o nodo.",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve lastChild?",
        "opciones": [
          "Sirve para subir desde un elemento hacia su elemento padre y poder acceder o modificar ese contenedor.",
          "Sirve para obtener rápidamente el último hijo de un nodo del DOM.",
          "Sirve para obtener y recorrer todos los nodos hijos directos de un nodo.",
          "Sirve para obtener rápidamente el primer nodo hijo de un elemento.",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a lastChild?",
        "opciones": [
          "1. Confundirlo con parentNode Ambos permiten subir hacia el padre, pero existe una diferencia: parentNode puede devolver…",
          "1. Confundir lastChild con lastElementChild Esta es la diferencia MÁS importante: ➡️ Devuelve el último nodo, incluyendo texto.…",
          "1. Confundir childNodes con children Esta es la diferencia más importante: ➡️ Todos los nodos hijos. ➡️ Solo los elementos HTML…",
          "1. Confundirlo con firstElementChild Esta diferencia es fundamental: ➡️ Primer nodo, incluyendo texto. ➡️ Primer elemento HTML,…",
        ],
        "correcta": 1,
      },
    ],
  },
  "dom-lastelementchild": {
    "id": "dom-lastelementchild",
    "titulo": "lastElementChild",
    "icon": "🏁",
    "categoria": "DOM · Navegación",
    "firma": "nodo.lastElementChild",
    "simulador": "dom",
    "definicion": [
      "Propiedad del **DOM** que devuelve el **último elemento HTML hijo** de un nodo.",
    ],
    "queEs": [
      "`lastElementChild` es una propiedad de `Element` que permite obtener el último **elemento** que se encuentra directamente dentro de otro elemento.",
      "A diferencia de `lastChild`, **ignora los nodos de texto y comentarios**.",
    ],
    "paraQueSirve": [
      "Sirve para acceder directamente al **último elemento HTML hijo**, sin preocuparte por espacios, saltos de línea o comentarios del HTML.",
    ],
    "comoFunciona": [
      "Por ejemplo:",
      "El DOM puede representarlo así:",
      "Con:",
      "podrías obtener el último `Text`.",
      "Pero con:",
      "obtienes:",
      "🎯 **Busca el último elemento, no el último nodo.**",
    ],
    "sintaxis": [
      {
        "code": "element.lastElementChild",
      },
      {
        "caption": "Retorno",
        "code": "null",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "descripcion": "**Obtener el último elemento de una lista:**",
        "code": "const lista=document.querySelector(\"ul\");\nconst ultimo=lista.lastElementChild;\nconsole.log(ultimo);\n\nUnoDosTres\n\nTres\n\nlista.lastElementChild.textContent=\"Último elemento\";",
      },
    ],
    "errores": [
      {
        "texto": "**1. Confundirlo con **`lastChild` Esta es la diferencia clave: Por ejemplo: Puede ocurrir: mientras:",
        "code": "lastChild\n    ↓\núltimo NODO\n    ↓\npuede ser Text, Comment, Element, etc.\n\nlastElementChild\n    ↓\núltimo ELEMENTO HTML\n    ↓\nsolo Element\n\nHola\n\ndiv.lastChild// Text (\"\\n\")\n\ndiv.lastElementChild// Hola",
      },
      {
        "texto": "**2. Confundir propiedad con método** ❌: ✅:",
        "code": "element.lastElementChild();\n\nelement.lastElementChild;",
      },
    ],
    "casos": [
      "Obtener el último `<li>` de una lista.",
      "Obtener el último `<div>`, `<p>`, `<button>`, etc.",
      "Modificar el último elemento hijo.",
      "Recorrer estructuras del DOM.",
      "Manipular elementos sin preocuparse por espacios o saltos de línea.",
    ],
    "relacion": [
      "La comparación fundamental:",
      "`firstChild` → Primer nodo · ✅ Sí",
      "`lastChild` → Último nodo · ✅ Sí",
      "`firstElementChild` → Primer elemento · ❌ No",
      "`lastElementChild` → Último elemento · ❌ No",
      "🧠 Puedes verlo como dos familias:",
    ],
    "analogia": "Imagina una fila de objetos: `lastChild` toma **lo último que exista**. Pero `lastElementChild` dice: 🔎 \"Ignora los objetos que no sean elementos HTML y dame el último elemento.\"",
    "fuente": "MDN — Element.lastElementChild",
    "notasPersonales": [
      "`lastElementChild`** → obtiene el último elemento HTML hijo, ignorando nodos de texto y comentarios.**",
      "🧠 Regla rápida:",
      "`lastElementChild`** = \"dame el último HTML hijo\".**",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de lastElementChild?",
        "opciones": [
          "nodo.childNodes",
          "nodo.lastElementChild",
          "nodo.firstChild",
          "nodo.parentElement",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor lastElementChild?",
        "opciones": [
          "Propiedad del DOM que devuelve el último elemento HTML hijo de un nodo.",
          "Propiedad del DOM que devuelve una colección con todos los nodos hijos de un nodo.",
          "Propiedad del DOM que devuelve el primer nodo hijo de un elemento o nodo.",
          "Propiedad del DOM que devuelve el elemento HTML padre de un elemento.",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve lastElementChild?",
        "opciones": [
          "Sirve para obtener rápidamente el primer nodo hijo de un elemento.",
          "Sirve para acceder directamente al último elemento HTML hijo, sin preocuparte por espacios, saltos de línea o comentarios del…",
          "Sirve para obtener y recorrer todos los nodos hijos directos de un nodo.",
          "Sirve para subir desde un elemento hacia su elemento padre y poder acceder o modificar ese contenedor.",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿En qué caso de uso encaja lastElementChild?",
        "opciones": [
          "Obtener el último <li> de una lista.",
          "Obtener el primer <li> de una lista.",
          "Acceder al primer nodo de un elemento.",
          "Acceder al contenedor de un elemento.",
        ],
        "correcta": 0,
      },
    ],
  },
  "dom-nextelementsibling": {
    "id": "dom-nextelementsibling",
    "titulo": "nextElementSibling",
    "icon": "➡️",
    "categoria": "DOM · Navegación",
    "firma": "nodo.nextElementSibling",
    "simulador": "dom",
    "definicion": [
      "Propiedad del **DOM** que devuelve el **elemento HTML hermano siguiente** de un elemento.",
    ],
    "queEs": [
      "`nextElementSibling` permite acceder al elemento que está **inmediatamente después** del elemento actual, siempre que ambos tengan el mismo padre.",
      "👉 Solo considera **elementos HTML**. Ignora nodos de texto y comentarios.",
    ],
    "paraQueSirve": [
      "Sirve para desplazarte desde un elemento hacia su **hermano siguiente** dentro de la estructura del DOM.",
      "Por ejemplo:",
      "Si estamos en `\"Uno\"`:",
      "Devuelve:",
    ],
    "comoFunciona": [
      "Imagina los elementos hermanos como una fila:",
      "Si estamos en `Uno`:",
      "El navegador busca el **elemento hermano inmediatamente siguiente**.",
    ],
    "sintaxis": [
      {
        "code": "element.nextElementSibling",
      },
      {
        "caption": "Retorno",
        "code": "null",
      },
      {
        "caption": "Por ejemplo, si estamos en el último elemento:",
        "code": "Tres",
      },
      {
        "code": "ultimo.nextElementSibling;// null",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "descripcion": "**Obtener el siguiente elemento:**",
        "code": "const primero=document.querySelector(\"li\");\nconst siguiente=primero.nextElementSibling;\nconsole.log(siguiente);\n\nDos\n\nprimero.nextElementSibling.textContent=\"Modificado\";\n\nlet elemento=document.querySelector(\"li\");\nelemento=elemento.nextElementSibling;",
      },
    ],
    "errores": [
      {
        "texto": "**1. Confundirlo con **`nextSibling` La diferencia es fundamental: Por ejemplo, los saltos de línea del HTML pueden ser nodos `Text`. `nextSibling` podría encontrarse con ese nodo, mientras que `nextElementSibling` lo ignora y busca directamente el siguiente elemento HTML.",
        "code": "nextSibling\n    ↓\nsiguiente NODO\n    ↓\npuede ser Text, Comment, Element...\n\nnextElementSibling\n    ↓\nsiguiente ELEMENTO\n    ↓\nsolo Element",
      },
      {
        "texto": "**2. Pensar que busca el siguiente elemento de cualquier parte del documento** No. Solo busca el **hermano siguiente**, es decir, un elemento que comparte el mismo padre. Para `B`:",
        "code": "Padre\n│\n├── A\n├── B  ← actual\n└── C\n\nnextElementSibling\n        ↓\n        C",
      },
    ],
    "casos": [
      "Recorrer listas.",
      "Navegar entre elementos hermanos.",
      "Crear interfaces dinámicas.",
      "Implementar controles de \"siguiente\".",
      "Acceder al elemento relacionado que aparece inmediatamente después.",
      "Manipular el DOM sin volver a utilizar `querySelector()`.",
    ],
    "relacion": [
      "Forma parte de la familia de **navegación entre hermanos**:",
      "La comparación clave:",
      "Mientras:",
    ],
    "analogia": "Imagina una fila de personas 👥: Si estás en **Ana** y preguntas: \"¿Quién es el elemento que está justo después de mí?\" `nextElementSibling` responde:",
    "fuente": "MDN — Element.nextElementSibling",
    "notasPersonales": [
      "`nextElementSibling`** → obtiene el elemento HTML hermano inmediatamente siguiente.**",
      "🧠 Para memorizar:",
      "Por tanto:",
      "`nextElementSibling`** = hermano elemento siguiente.**",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de nextElementSibling?",
        "opciones": [
          "nodo.parentElement",
          "nodo.nextElementSibling",
          "nodo.firstChild",
          "nodo.childNodes",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor nextElementSibling?",
        "opciones": [
          "Propiedad del DOM que devuelve el primer nodo hijo de un elemento o nodo.",
          "Propiedad del DOM que devuelve el elemento HTML padre de un elemento.",
          "Propiedad del DOM que devuelve el elemento HTML hermano siguiente de un elemento.",
          "Propiedad del DOM que devuelve una colección con todos los nodos hijos de un nodo.",
        ],
        "correcta": 2,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve nextElementSibling?",
        "opciones": [
          "Sirve para obtener rápidamente el primer nodo hijo de un elemento.",
          "Sirve para subir desde un elemento hacia su elemento padre y poder acceder o modificar ese contenedor.",
          "Sirve para desplazarte desde un elemento hacia su hermano siguiente dentro de la estructura del DOM.",
          "Sirve para obtener y recorrer todos los nodos hijos directos de un nodo.",
        ],
        "correcta": 2,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a nextElementSibling?",
        "opciones": [
          "1. Confundirlo con parentNode Ambos permiten subir hacia el padre, pero existe una diferencia: parentNode puede devolver…",
          "1. Confundirlo con firstElementChild Esta diferencia es fundamental: ➡️ Primer nodo, incluyendo texto. ➡️ Primer elemento HTML,…",
          "1. Confundirlo con nextSibling La diferencia es fundamental: Por ejemplo, los saltos de línea del HTML pueden ser nodos Text.…",
          "1. Confundir childNodes con children Esta es la diferencia más importante: ➡️ Todos los nodos hijos. ➡️ Solo los elementos HTML…",
        ],
        "correcta": 2,
      },
    ],
  },
  "dom-previouselementsibling": {
    "id": "dom-previouselementsibling",
    "titulo": "previousElementSibling",
    "icon": "⬅️",
    "categoria": "DOM · Navegación",
    "firma": "nodo.previousElementSibling",
    "simulador": "dom",
    "definicion": [
      "Propiedad del **DOM** que devuelve el **elemento HTML hermano anterior** de un elemento.",
    ],
    "queEs": [
      "`previousElementSibling` permite acceder al elemento que está **inmediatamente antes** del elemento actual, dentro del mismo padre.",
      "👉 Solo considera **elementos HTML**. Ignora nodos de texto y comentarios.",
    ],
    "paraQueSirve": [
      "Sirve para desplazarte desde un elemento hacia su **hermano anterior** en la estructura del DOM.",
      "Por ejemplo:",
      "Si seleccionamos `\"Tres\"`:",
      "Obtendremos:",
    ],
    "comoFunciona": [
      "Imagina los elementos hermanos como una fila:",
      "Si estamos en `Tres`:",
      "El navegador busca el **elemento hermano inmediatamente anterior**.",
    ],
    "sintaxis": [
      {
        "code": "element.previousElementSibling",
      },
      {
        "caption": "Retorno",
        "code": "null",
      },
      {
        "caption": "Por ejemplo, el primer elemento:",
        "code": "Uno",
      },
      {
        "caption": "no tiene un hermano anterior:",
        "code": "primero.previousElementSibling;// null",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "descripcion": "**Obtener el hermano anterior:**",
        "code": "const segundo=document.querySelectorAll(\"li\")[1];\nconsole.log(segundo.previousElementSibling);\n\nUno\n\nsegundo.previousElementSibling.textContent=\"Modificado\";\n\nlet elemento=document.querySelector(\"li:last-child\");\nelemento=elemento.previousElementSibling;",
      },
    ],
    "errores": [
      {
        "texto": "**1. Confundirlo con **`previousSibling` Esta diferencia es fundamental: Por ejemplo: Los saltos de línea pueden convertirse en nodos `Text`. Entonces: podría devolver un `Text`. Mientras: busca directamente:",
        "code": "previousSibling\n       ↓\nhermano anterior como NODO\n       ↓\npuede ser Text, Comment, Element...\n\npreviousElementSibling\n       ↓\nhermano anterior como ELEMENTO\n       ↓\nsolo Element\n\nUnoDos\n\nelement.previousSibling\n\nelement.previousElementSibling\n\nUno",
      },
      {
        "texto": "**2. Pensar que busca cualquier elemento anterior del documento** No. Busca únicamente el **hermano anterior**, es decir, otro elemento que tenga **el mismo padre**. Para `B`:",
        "code": "Padre\n│\n├── A\n├── B  ← elemento actual\n└── C\n\npreviousElementSibling\n        ↓\n       A",
      },
    ],
    "casos": [
      "Navegar entre elementos hermanos.",
      "Crear interfaces dinámicas.",
      "Recorrer listas.",
      "Acceder al elemento anterior de una tabla.",
      "Implementar botones de \"anterior\".",
      "Manipular elementos relacionados dentro de un mismo contenedor.",
      "Navegar por el árbol DOM sin seleccionar nuevamente el elemento mediante `querySelector()`.",
    ],
    "relacion": [
      "Esta propiedad pertenece a la familia de **navegación entre hermanos**:",
      "La comparación importante:",
      "Y:",
    ],
    "analogia": "Imagina una fila de personas 👥: Si tú eres **Carlos**: Es literalmente: **\"¿Quién es el elemento que está justo antes de mí?\"**",
    "fuente": "MDN — Element.previousElementSibling",
    "notasPersonales": [
      "`previousElementSibling`** → obtiene el elemento HTML hermano inmediatamente anterior.**",
      "🧠 Regla rápida:",
      "Por tanto:",
      "`previousElementSibling`** = hermano elemento anterior.**",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de previousElementSibling?",
        "opciones": [
          "nodo.previousElementSibling",
          "nodo.parentElement",
          "nodo.childNodes",
          "nodo.firstChild",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor previousElementSibling?",
        "opciones": [
          "Propiedad del DOM que devuelve el elemento HTML padre de un elemento.",
          "Propiedad del DOM que devuelve el elemento HTML hermano anterior de un elemento.",
          "Propiedad del DOM que devuelve una colección con todos los nodos hijos de un nodo.",
          "Propiedad del DOM que devuelve el primer nodo hijo de un elemento o nodo.",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve previousElementSibling?",
        "opciones": [
          "Sirve para desplazarte desde un elemento hacia su hermano anterior en la estructura del DOM.",
          "Sirve para subir desde un elemento hacia su elemento padre y poder acceder o modificar ese contenedor.",
          "Sirve para obtener y recorrer todos los nodos hijos directos de un nodo.",
          "Sirve para obtener rápidamente el primer nodo hijo de un elemento.",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a previousElementSibling?",
        "opciones": [
          "1. Confundirlo con parentNode Ambos permiten subir hacia el padre, pero existe una diferencia: parentNode puede devolver…",
          "1. Confundir childNodes con children Esta es la diferencia más importante: ➡️ Todos los nodos hijos. ➡️ Solo los elementos HTML…",
          "1. Confundirlo con previousSibling Esta diferencia es fundamental: Por ejemplo: Los saltos de línea pueden convertirse en nodos…",
          "1. Confundirlo con firstElementChild Esta diferencia es fundamental: ➡️ Primer nodo, incluyendo texto. ➡️ Primer elemento HTML,…",
        ],
        "correcta": 2,
      },
    ],
  },
  "dom-nodename": {
    "id": "dom-nodename",
    "titulo": "nodeName",
    "icon": "🔖",
    "categoria": "DOM · Navegación",
    "firma": "nodo.nodeName",
    "simulador": "dom",
    "definicion": [
      "Propiedad del **DOM** que devuelve el **nombre del nodo** como una cadena de texto (`String`).",
    ],
    "queEs": [
      "Por ejemplo, para un elemento HTML `<p>`, normalmente devuelve:",
    ],
    "paraQueSirve": [
      "Sirve para **identificar el nombre de un nodo** y saber con qué tipo de nodo estás trabajando.",
      "Es especialmente útil cuando recorres nodos mediante propiedades como:",
      "`childNodes`",
      "`firstChild`",
      "`lastChild`",
      "`nextSibling`",
      "`previousSibling`",
    ],
    "comoFunciona": [
      "Supongamos:",
      "Si seleccionamos el `<p>`:",
      "Resultado:",
      "Para un elemento HTML, `nodeName` devuelve normalmente el **nombre de la etiqueta en mayúsculas**.",
      "Pero `nodeName` también funciona con otros tipos de nodos:",
    ],
    "sintaxis": [
      {
        "code": "node.nodeName",
      },
      {
        "caption": "Retorno",
        "code": "const div=document.querySelector(\"div\");\nconsole.log(div.nodeName);// \"DIV\"",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "descripcion": "**Obtener el nombre de una etiqueta:**",
        "code": "const elemento=document.querySelector(\"button\");\nconsole.log(elemento.nodeName);// \"BUTTON\"\n\nconst div=document.querySelector(\"div\");\nconst nodo=div.firstChild;\nconsole.log(nodo.nodeName);\n\n\"#text\"\n\nfirstChild\n    ↓\npuede devolver cualquier Node\n    ↓\nnodeName\n    ↓\nte dice qué nodo es\n\nif (elemento.nodeName===\"P\") {\n\tconsole.log(\"Es un párrafo\");\n}",
      },
    ],
    "errores": [
      {
        "texto": "**1. Confundir **`nodeName`** con **`nodeType` ➡️ Devuelve el **nombre**. ➡️ Devuelve un **número que identifica el tipo**. Ejemplo: 🧠 Piensa:",
        "code": "node.nodeName\n\nnode.nodeType\n\nHola\n\nnodeName → \"P\"\nnodeType → 1\n\nnodeName → ¿Cómo te llamas?\nnodeType → ¿Qué tipo de nodo eres?",
      },
      {
        "texto": "**2. Pensar que siempre devuelve el nombre de la etiqueta** No necesariamente. Para un nodo de texto: devuelve: Y para un comentario:",
        "code": "texto.nodeName\n\n\"#text\"\n\n\"#comment\"",
      },
      {
        "texto": "**3. Comparar con minúsculas en HTML** En HTML: ✅ Mientras: ❌ normalmente no coincidirá, porque el nombre se devuelve en mayúsculas para elementos HTML.",
        "code": "elemento.nodeName===\"P\"\n\nelemento.nodeName===\"p\"",
      },
    ],
    "casos": [
      "Identificar etiquetas HTML.",
      "Diferenciar tipos de nodos por su nombre.",
      "Recorrer el árbol DOM.",
      "Trabajar con `childNodes`.",
      "Analizar nodos obtenidos mediante `firstChild` y `lastChild`.",
      "Combinarlo con `nodeType` para identificar con mayor precisión un nodo.",
    ],
    "relacion": [
      "`nodeName` y `nodeType` trabajan muy bien juntos:",
      "Por ejemplo:",
      "Puedes pensarlo así:",
      "Y se conecta directamente con lo que acabas de estudiar:",
    ],
    "analogia": "Imagina que cada nodo tiene una **ficha de identificación** 🪪: `nodeType` pregunta: 🔎 **\"¿Qué tipo eres?\"** `nodeName` pregunta: 🔎 **\"¿Cuál es tu nombre?\"**",
    "fuente": "MDN — Node.nodeName",
    "notasPersonales": [
      "`nodeName`** → devuelve el nombre del nodo como **`String`**.**",
      "🧠 Para memorizar junto con `nodeType`:",
      "**Clave:** `nodeType` te dice **qué tipo** de nodo es; `nodeName` te dice **su nombre**.",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de nodeName?",
        "opciones": [
          "nodo.childNodes",
          "nodo.firstChild",
          "nodo.nodeName",
          "nodo.parentElement",
        ],
        "correcta": 2,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor nodeName?",
        "opciones": [
          "Propiedad del DOM que devuelve una colección con todos los nodos hijos de un nodo.",
          "Propiedad del DOM que devuelve el primer nodo hijo de un elemento o nodo.",
          "Propiedad del DOM que devuelve el nombre del nodo como una cadena de texto (String).",
          "Propiedad del DOM que devuelve el elemento HTML padre de un elemento.",
        ],
        "correcta": 2,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve nodeName?",
        "opciones": [
          "Sirve para obtener rápidamente el primer nodo hijo de un elemento.",
          "Sirve para obtener y recorrer todos los nodos hijos directos de un nodo.",
          "Sirve para identificar el nombre de un nodo y saber con qué tipo de nodo estás trabajando.",
          "Sirve para subir desde un elemento hacia su elemento padre y poder acceder o modificar ese contenedor.",
        ],
        "correcta": 2,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a nodeName?",
        "opciones": [
          "1. Confundir childNodes con children Esta es la diferencia más importante: ➡️ Todos los nodos hijos. ➡️ Solo los elementos HTML…",
          "1. Confundirlo con firstElementChild Esta diferencia es fundamental: ➡️ Primer nodo, incluyendo texto. ➡️ Primer elemento HTML,…",
          "3. Comparar con minúsculas en HTML En HTML: Mientras: normalmente no coincidirá, porque el nombre se devuelve en mayúsculas para…",
          "1. Confundirlo con parentNode Ambos permiten subir hacia el padre, pero existe una diferencia: parentNode puede devolver…",
        ],
        "correcta": 2,
      },
    ],
  },
  "dom-nodetype": {
    "id": "dom-nodetype",
    "titulo": "nodeType",
    "icon": "🔢",
    "categoria": "DOM · Navegación",
    "firma": "nodo.nodeType",
    "simulador": "dom",
    "definicion": [
      "Propiedad del **DOM** que indica **qué tipo de nodo** es un nodo determinado.",
    ],
    "queEs": [
      "`nodeType` es una propiedad de `Node` que devuelve un **número** que identifica la clase de nodo.",
      "Por ejemplo, permite saber si un nodo es:",
      "un elemento HTML (`Element`)",
      "un texto (`Text`)",
      "un comentario (`Comment`)",
      "el documento (`Document`)",
    ],
    "paraQueSirve": [
      "Sirve para **identificar el tipo de nodo** antes de trabajar con él.",
      "Por ejemplo:",
      "Resultado:",
      "`1` significa que el nodo es un **elemento HTML**.",
    ],
    "comoFunciona": [
      "Cada tipo de nodo tiene un número asignado:",
      "`1` → `Node.ELEMENT_NODE` · Elemento HTML",
      "`2` → `Node.ATTRIBUTE_NODE` · Atributo",
      "`3` → `Node.TEXT_NODE` · Texto",
      "`4` → `Node.CDATA_SECTION_NODE` · CDATA",
      "`7` → `Node.PROCESSING_INSTRUCTION_NODE` · Instrucción de procesamiento",
      "`8` → `Node.COMMENT_NODE` · Comentario",
      "`9` → `Node.DOCUMENT_NODE` · Documento",
      "`10` → `Node.DOCUMENT_TYPE_NODE` · Tipo de documento",
      "`11` → `Node.DOCUMENT_FRAGMENT_NODE` · Fragmento de documento",
      "Los valores **5, 6 y 12** están reservados/obsoletos y no corresponden a tipos de nodos que normalmente encontrarás en el DOM moderno.",
      "Por ejemplo:",
      "Mientras un nodo de texto:",
    ],
    "sintaxis": [
      {
        "code": "node.nodeType",
      },
      {
        "caption": "Retorno",
        "code": "const nodo=document.querySelector(\"p\");\nconsole.log(nodo.nodeType);// 1",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "descripcion": "**Comprobar si un nodo es un elemento:**",
        "code": "if (nodo.nodeType===Node.ELEMENT_NODE) {\n\tconsole.log(\"Es un elemento\");\n}\n\nif (nodo.nodeType===1) {\n\tconsole.log(\"Es un elemento\");\n}\n\nNode.ELEMENT_NODE\n\nif (nodo.nodeType===Node.TEXT_NODE) {\n\tconsole.log(\"Es texto\");\n}\n\nif (nodo.nodeType===Node.COMMENT_NODE) {\n\tconsole.log(\"Es un comentario\");\n}",
      },
    ],
    "errores": [
      {
        "texto": "**1. Confundir **`nodeType`** con **`nodeName` ➡️ Devuelve un **número** que identifica el tipo. ➡️ Devuelve el **nombre del nodo**. Por ejemplo, para: puedes obtener:",
        "code": "node.nodeType\n\nnode.nodeName\n\nHola\n\nnodeType → 1\nnodeName → \"P\"",
      },
      {
        "texto": "**2. Pensar que todos los nodos tienen **`nodeType = 1` No. Por eso `nodeType` es especialmente útil cuando trabajas con propiedades como `childNodes`, `firstChild` o `lastChild`, que pueden devolverte diferentes tipos de nodos.",
        "code": "Element  → 1\nText     → 3\nComment  → 8\nDocument → 9",
      },
    ],
    "casos": [
      "Identificar el tipo de nodo.",
      "Recorrer `childNodes`.",
      "Diferenciar elementos de texto.",
      "Trabajar con árboles DOM.",
      "Procesar nodos de forma diferente según su tipo.",
      "Evitar tratar un nodo de texto como si fuera un elemento HTML.",
    ],
    "relacion": [
      "`nodeType` está muy relacionado con la navegación del DOM:",
      "Por ejemplo:",
      "Esto es especialmente importante con:",
      "`firstChild`",
      "`lastChild`",
      "`childNodes`",
      "`parentNode`",
    ],
    "analogia": "Imagina que el DOM es una caja llena de objetos 📦: `nodeType` funciona como una **etiqueta numérica**: Entonces puedes preguntar: 🔎 \"¿Qué tipo de nodo eres?\" Y `nodeType` responde con su número.",
    "fuente": "MDN — Node.nodeType",
    "notasPersonales": [
      "`nodeType`** → indica mediante un número qué tipo de nodo es.**",
      "🧠 Los más importantes para memorizar:",
      "Y una conexión muy importante para tu mapa de conceptos:",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de nodeType?",
        "opciones": [
          "nodo.parentElement",
          "nodo.nodeType",
          "nodo.firstChild",
          "nodo.childNodes",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor nodeType?",
        "opciones": [
          "Propiedad del DOM que indica qué tipo de nodo es un nodo determinado.",
          "Propiedad del DOM que devuelve el elemento HTML padre de un elemento.",
          "Propiedad del DOM que devuelve el primer nodo hijo de un elemento o nodo.",
          "Propiedad del DOM que devuelve una colección con todos los nodos hijos de un nodo.",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve nodeType?",
        "opciones": [
          "Sirve para subir desde un elemento hacia su elemento padre y poder acceder o modificar ese contenedor.",
          "Sirve para identificar el tipo de nodo antes de trabajar con él.",
          "Sirve para obtener rápidamente el primer nodo hijo de un elemento.",
          "Sirve para obtener y recorrer todos los nodos hijos directos de un nodo.",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a nodeType?",
        "opciones": [
          "1. Confundir nodeType con nodeName ➡️ Devuelve un número que identifica el tipo. ➡️ Devuelve el nombre del nodo. Por ejemplo,…",
          "1. Confundirlo con parentNode Ambos permiten subir hacia el padre, pero existe una diferencia: parentNode puede devolver…",
          "1. Confundirlo con firstElementChild Esta diferencia es fundamental: ➡️ Primer nodo, incluyendo texto. ➡️ Primer elemento HTML,…",
          "1. Confundir childNodes con children Esta es la diferencia más importante: ➡️ Todos los nodos hijos. ➡️ Solo los elementos HTML…",
        ],
        "correcta": 0,
      },
    ],
  },
  "dom-nodecontains": {
    "id": "dom-nodecontains",
    "titulo": "Node.contains()",
    "icon": "🧭",
    "categoria": "DOM · Navegación",
    "firma": "nodo.contains(otroNodo)",
    "simulador": "dom",
    "definicion": [
      "`contains()` determina si un nodo **contiene a otro nodo dentro de su árbol DOM**.",
    ],
    "queEs": [
      "Es un **método de **`Node` que responde con un valor booleano:",
      "`true` → el nodo contiene al otro.",
      "`false` → no lo contiene.",
      "👉 Importante: también devuelve `true` si comparas **el nodo consigo mismo**.",
    ],
    "paraQueSirve": [
      "Principalmente para comprobar si un elemento está **dentro de otro elemento**.",
      "Por ejemplo:",
      "Puedes pensar:",
      "**\"¿Este nodo está dentro de mí?\"**",
    ],
    "comoFunciona": [
      "`contains()` recorre la relación jerárquica del DOM para comprobar si el nodo indicado pertenece al árbol de nodos del objeto.",
      "Conceptualmente:",
      "Entonces:",
      "Porque la relación va **de padre → descendiente**, no al revés.",
      "🧩 Regla fácil de recordar",
      "`contains()`** = \"¿Está dentro?\"**",
    ],
    "sintaxis": [
      {
        "code": "node.contains(otherNode)",
      },
      {
        "caption": "Retorno",
        "code": "true",
      },
      {
        "caption": "o",
        "code": "false",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Comprobar un hijo",
        "code": "const padre=document.querySelector(\"#padre\");\nconst hijo=document.querySelector(\"#hijo\");\nconsole.log(padre.contains(hijo));\n\ntrue",
      },
      {
        "titulo": "2. Comprobar un nodo que no pertenece",
        "code": "const div1=document.querySelector(\"#div1\");\nconst div2=document.querySelector(\"#div2\");\nconsole.log(div1.contains(div2));\n\nfalse",
      },
      {
        "titulo": "3. El nodo se contiene a sí mismo",
        "code": "const elemento=document.querySelector(\"#padre\");\nconsole.log(elemento.contains(elemento));\n\ntrue\n\nelemento.contains(elemento);// true",
      },
    ],
    "errores": [
      {
        "texto": "**Confundir **`contains()`** con una búsqueda de texto:** `contains()` trabaja con **nodos**, no con cadenas de texto. Para texto usarías, por ejemplo: También es común confundirlo con `includes()`: vs. 👉 `includes()` busca un **valor** dentro de una colección. 👉 `contains()` comprueba una **relación entre nodos DOM**.",
        "code": "elemento.contains(\"Hola\");// ❌\n\nelemento.textContent.includes(\"Hola\");\n\narray.includes(valor);\n\nelemento.contains(nodo);",
      },
    ],
    "casos": [
      "Uno muy común es detectar si un clic ocurrió dentro de un elemento:",
      "Esto es muy útil para **menús desplegables, modales, dropdowns y componentes interactivos**.",
    ],
    "relacion": [
      "Una forma de conectarlos:",
      "Es decir:",
      "`parentNode`** mira hacia arriba.** ⬆️",
      "`contains()`** comprueba si algo está hacia abajo.** ⬇️",
    ],
    "analogia": "Imagina una **casa** 🏠: Entonces: La pregunta de `contains()` siempre es: **\"¿Este nodo está dentro de mi estructura?\"**",
    "fuente": "Apuntes personales · Notion",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Node.contains()?",
        "opciones": [
          "nodo.contains(otroNodo)",
          "nodo.childNodes",
          "nodo.parentElement",
          "nodo.firstChild",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Node.contains()?",
        "opciones": [
          "Propiedad del DOM que devuelve una colección con todos los nodos hijos de un nodo.",
          "contains() determina si un nodo contiene a otro nodo dentro de su árbol DOM.",
          "Propiedad del DOM que devuelve el elemento HTML padre de un elemento.",
          "Propiedad del DOM que devuelve el primer nodo hijo de un elemento o nodo.",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Node.contains()?",
        "opciones": [
          "Principalmente para comprobar si un elemento está dentro de otro elemento.",
          "Sirve para obtener y recorrer todos los nodos hijos directos de un nodo.",
          "Sirve para subir desde un elemento hacia su elemento padre y poder acceder o modificar ese contenedor.",
          "Sirve para obtener rápidamente el primer nodo hijo de un elemento.",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Node.contains()?",
        "opciones": [
          "1. Confundir childNodes con children Esta es la diferencia más importante: ➡️ Todos los nodos hijos. ➡️ Solo los elementos HTML…",
          "Confundir contains() con una búsqueda de texto: contains() trabaja con nodos, no con cadenas de texto. Para texto usarías, por…",
          "1. Confundirlo con parentNode Ambos permiten subir hacia el padre, pero existe una diferencia: parentNode puede devolver…",
          "1. Confundirlo con firstElementChild Esta diferencia es fundamental: ➡️ Primer nodo, incluyendo texto. ➡️ Primer elemento HTML,…",
        ],
        "correcta": 1,
      },
    ],
  },
};
