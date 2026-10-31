/* Generado desde src/ApuntesFormatoHtml — no editar a mano.
   Regenerar con: node scripts/generate-apuntes.mjs */

export const JS_DOM_ATRIBUTOS = {
  "id": "dom-atributos",
  "label": "DOM · Contenido",
  "icon": "🏷️",
  "titulo": "Atributos, clases y contenido",
  "descripcion": "Lee y modifica atributos, clases, HTML y texto de los elementos: el corazón de la manipulación del DOM.",
  "grupos": [
    {
      "seccion": "Atributos y clases",
      "metodos": [
        {
          "id": "dom-getattribute",
          "nombre": "getAttribute",
          "firma": "elemento.getAttribute(nombre)",
          "icon": "🔎",
        },
        {
          "id": "dom-setattribute",
          "nombre": "setAttribute",
          "firma": "elemento.setAttribute(nombre, valor)",
          "icon": "🖊️",
        },
        {
          "id": "dom-hasattribute",
          "nombre": "hasAttribute",
          "firma": "elemento.hasAttribute(nombre)",
          "icon": "✅",
        },
        {
          "id": "dom-removeattribute",
          "nombre": "removeAttribute",
          "firma": "elemento.removeAttribute(nombre)",
          "icon": "🧽",
        },
        {
          "id": "dom-classname",
          "nombre": "className",
          "firma": "elemento.className",
          "icon": "🏷️",
        },
        {
          "id": "dom-classlist",
          "nombre": "classList",
          "firma": "elemento.classList",
          "icon": "🎛️",
        },
        {
          "id": "dom-classlist-add",
          "nombre": "elemento.classList.add()",
          "firma": "elemento.classList.add(...clases)",
          "icon": "➕",
        },
        {
          "id": "dom-classlist-remove",
          "nombre": "elemento.classList.remove()",
          "firma": "elemento.classList.remove(...clases)",
          "icon": "➖",
        },
        {
          "id": "dom-classlist-toggle",
          "nombre": "elemento.classList.toggle()",
          "firma": "elemento.classList.toggle(clase, force)",
          "icon": "🔀",
        },
        {
          "id": "dom-classlist-contains",
          "nombre": "elemento.classList.contains()",
          "firma": "elemento.classList.contains(clase)",
          "icon": "❓",
        },
      ],
    },
    {
      "seccion": "Contenido y texto",
      "metodos": [
        {
          "id": "dom-innerhtml",
          "nombre": "innerHTML",
          "firma": "elemento.innerHTML",
          "icon": "🧩",
        },
        {
          "id": "dom-innertext",
          "nombre": "innerText",
          "firma": "elemento.innerText",
          "icon": "📝",
        },
        {
          "id": "dom-textcontent",
          "nombre": "textContent",
          "firma": "elemento.textContent",
          "icon": "📄",
        },
      ],
    },
  ],
};

export const JS_DOM_ATRIBUTOS_DOCS = {
  "dom-getattribute": {
    "id": "dom-getattribute",
    "titulo": "getAttribute",
    "icon": "🔎",
    "categoria": "DOM · Contenido",
    "firma": "elemento.getAttribute(nombre)",
    "simulador": "dom",
    "definicion": [
      "Método del **DOM** que permite **obtener el valor de un atributo** de un elemento HTML.",
    ],
    "queEs": [
      "`getAttribute()` es un método de `Element` que busca un atributo por su nombre y devuelve el valor que tiene.",
      "Si el HTML es:",
      "Entonces:",
      "devuelve:",
    ],
    "paraQueSirve": [
      "Sirve para **leer atributos HTML desde JavaScript**, por ejemplo:",
      "`id`",
      "`class`",
      "`href`",
      "`src`",
      "`alt`",
      "`title`",
      "`data-*`",
      "`aria-*`",
    ],
    "comoFunciona": [
      "Ejemplo:",
    ],
    "sintaxis": [
      {
        "code": "element.getAttribute(name);",
      },
      {
        "caption": "Parámetros",
        "code": "element.getAttribute(\"id\");",
      },
      {
        "caption": "Retorno",
        "code": "const elemento=document.querySelector(\"div\");\nconsole.log(elemento.getAttribute(\"id\"));",
      },
      {
        "caption": "Si tiene:",
        "code": "contenedor",
      },
      {
        "caption": "Si no tiene id:",
        "code": "null",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "descripcion": "**Obtener un **`id`**:**",
        "code": "const elemento=document.querySelector(\"div\");\nconst id=elemento.getAttribute(\"id\");\nconsole.log(id);\n\nconst enlace=document.querySelector(\"a\");\nconsole.log(enlace.getAttribute(\"href\"));\n\nconst div=document.querySelector(\"div\");\nconst id=div.getAttribute(\"data-user-id\");\nconsole.log(id);\n\n25",
      },
    ],
    "errores": [
      {
        "texto": "**1. Confundirlo con **`setAttribute()` ➡️ **Obtiene** el atributo. ➡️ **Establece o modifica** el atributo. Una forma fácil de recordarlo:",
        "code": "element.getAttribute(\"id\");\n\nelement.setAttribute(\"id\",\"titulo\");\n\nget  → obtener 🫴\nset  → establecer ✍️",
      },
      {
        "texto": "**2. Pensar que devuelve **`undefined`** si no existe** No devuelve `undefined`. devuelve:",
        "code": "element.getAttribute(\"no-existe\");\n\nnull",
      },
      {
        "texto": "**3. Confundir atributo con propiedad** lee el **atributo HTML** `value`. Mientras: accede a la **propiedad** `value` del objeto DOM.",
        "code": "input.getAttribute(\"value\");\n\ninput.value;",
      },
    ],
    "casos": [
      "Leer enlaces dinámicamente.",
      "Obtener el `src` de imágenes.",
      "Leer `data-*`.",
      "Comprobar configuraciones almacenadas en atributos.",
      "Leer atributos `aria-*`.",
      "Inspeccionar atributos de elementos.",
      "Obtener información HTML para utilizarla posteriormente en JavaScript.",
    ],
    "relacion": [
      "También se relaciona con:",
      "`hasAttribute()` → comprueba si existe.",
      "`setAttribute()` → crea/modifica.",
      "`removeAttribute()` → elimina.",
      "`dataset` → acceso específico a `data-*`.",
      "`attributes` → colección de atributos del elemento.",
    ],
    "analogia": "Imagina que un elemento HTML tiene una **ficha de identificación** 🪪: `getAttribute(\"id\")` sería como preguntar: 🔎 \"¿Cuál es tu `id`?\" Y el elemento responde:",
    "fuente": "MDN — Element.getAttribute()",
    "notasPersonales": [
      "`getAttribute(nombre)`** → obtiene el valor de un atributo HTML.**",
      "🧠 Pareja fundamental:",
      "**Idea clave:** `getAttribute()` **lee atributos**, no propiedades del objeto DOM.",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de getAttribute?",
        "opciones": [
          "elemento.hasAttribute(nombre)",
          "elemento.getAttribute(nombre)",
          "elemento.removeAttribute(nombre)",
          "elemento.setAttribute(nombre, valor)",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor getAttribute?",
        "opciones": [
          "hasAttribute() es un método de Element que comprueba si un elemento HTML tiene un atributo específico.",
          "Método del DOM que permite obtener el valor de un atributo de un elemento HTML.",
          "removeAttribute() es un método de Element que elimina un atributo de un elemento HTML.",
          "Método del DOM que permite crear o modificar un atributo de un elemento HTML.",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve getAttribute?",
        "opciones": [
          "Sirve para leer atributos HTML desde JavaScript, por ejemplo:",
          "Principalmente para quitar o desactivar atributos HTML dinámicamente.",
          "Sirve para comprobar la existencia de un atributo antes de realizar alguna acción.",
          "Sirve para modificar dinámicamente los atributos HTML de un elemento mediante JavaScript.",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a getAttribute?",
        "opciones": [
          "Confundirlo con remove() — Son diferentes: ➡️ elimina el atributo. Mientras: ➡️ elimina el elemento completo del DOM.",
          "3. Confundir atributo con propiedad lee el atributo HTML value. Mientras: accede a la propiedad value del objeto DOM.",
          "Confundir hasAttribute() con getAttribute() — pregunta: ¿Existe id? Resultado: Mientras: pregunta: ¿Cuál es el valor de id?…",
          "1. Confundirlo con getAttribute() ➡️ Establece/modifica un atributo. ➡️ Obtiene el valor de un atributo.",
        ],
        "correcta": 1,
      },
    ],
  },
  "dom-setattribute": {
    "id": "dom-setattribute",
    "titulo": "setAttribute",
    "icon": "🖊️",
    "categoria": "DOM · Contenido",
    "firma": "elemento.setAttribute(nombre, valor)",
    "simulador": "dom",
    "definicion": [
      "Método del **DOM** que permite **crear o modificar un atributo** de un elemento HTML.",
    ],
    "queEs": [
      "`setAttribute()` es un método de los elementos del DOM que establece un atributo indicando su **nombre** y su **valor**.",
      "Por ejemplo, puedes agregar o modificar `id`, `class`, `src`, `href`, `title`, `data-*`, etc.",
    ],
    "paraQueSirve": [
      "Sirve para modificar dinámicamente los atributos HTML de un elemento mediante JavaScript.",
      "Equivale a:",
    ],
    "comoFunciona": [
      "Su funcionamiento es básicamente:",
      "Ejemplo:",
      "Si el atributo `href` no existía, lo crea. Si ya existía, cambia su valor.",
    ],
    "sintaxis": [
      {
        "code": "element.setAttribute(name,value);",
      },
      {
        "caption": "Retorno",
        "code": "const resultado=elemento.setAttribute(\"id\",\"titulo\");\nconsole.log(resultado);// undefined",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "descripcion": "**Agregar un **`id`**:**",
        "code": "const h1=document.querySelector(\"h1\");\nh1.setAttribute(\"id\",\"titulo\");\n\nHola\n\nconst imagen=document.querySelector(\"img\");\nimagen.setAttribute(\"alt\",\"Perro jugando\");\n\nconst div=document.querySelector(\"div\");\ndiv.setAttribute(\"class\",\"contenedor\");\n\nconst usuario=document.querySelector(\"div\");\nusuario.setAttribute(\"data-id\",\"25\");",
      },
    ],
    "errores": [
      {
        "texto": "**1. Confundirlo con **`getAttribute()` ➡️ **Establece/modifica** un atributo. ➡️ **Obtiene** el valor de un atributo.",
        "code": "element.setAttribute(\"id\",\"titulo\");\n\nelement.getAttribute(\"id\");",
      },
      {
        "texto": "**2. Pensar que devuelve el atributo** Devuelve: Para obtenerlo:",
        "code": "const resultado=element.setAttribute(\"class\",\"rojo\");\nconsole.log(resultado);\n\nundefined\n\nelement.getAttribute(\"class\");",
      },
      {
        "texto": "**3. Confundir atributos con propiedades** trabaja con el **atributo HTML** `value`, mientras que: trabaja con la **propiedad** `value` del objeto DOM.",
        "code": "element.setAttribute(\"value\",\"Hola\");\n\nelement.value=\"Hola\";",
      },
    ],
    "casos": [
      "Modificar enlaces dinámicamente.",
      "Cambiar imágenes (`src`, `alt`).",
      "Agregar/modificar clases e IDs.",
      "Trabajar con atributos `data-*`.",
      "Modificar atributos de formularios.",
      "Manipular elementos HTML dinámicamente.",
      "Crear atributos que no existían.",
    ],
    "relacion": [
      "También se relaciona directamente con:",
      "`getAttribute()` → obtener",
      "`removeAttribute()` → eliminar",
      "`hasAttribute()` → comprobar existencia",
      "`createElement()` → crear elementos",
      "`classList` → manipular clases",
      "`dataset` → trabajar con `data-*`",
    ],
    "analogia": "Imagina que un elemento HTML es una **mochila 🎒**. Los atributos son las etiquetas que tiene la mochila: `setAttribute()` sería como **poner o cambiar una etiqueta**: Ahora: 👉 `setAttribute()`** = establecer/modificar un atributo.**",
    "fuente": "MDN — Element.setAttribute()",
    "notasPersonales": [
      "`setAttribute(nombre, valor)`** → crea o modifica un atributo de un elemento.**",
      "La pareja fundamental para memorizarlo es:",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de setAttribute?",
        "opciones": [
          "elemento.getAttribute(nombre)",
          "elemento.setAttribute(nombre, valor)",
          "elemento.removeAttribute(nombre)",
          "elemento.hasAttribute(nombre)",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor setAttribute?",
        "opciones": [
          "Método del DOM que permite crear o modificar un atributo de un elemento HTML.",
          "Método del DOM que permite obtener el valor de un atributo de un elemento HTML.",
          "removeAttribute() es un método de Element que elimina un atributo de un elemento HTML.",
          "hasAttribute() es un método de Element que comprueba si un elemento HTML tiene un atributo específico.",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve setAttribute?",
        "opciones": [
          "Leer clases: Obtener todas las clases de un elemento como string.",
          "Sirve para comprobar la existencia de un atributo antes de realizar alguna acción.",
          "Sirve para modificar dinámicamente los atributos HTML de un elemento mediante JavaScript.",
          "Principalmente para quitar o desactivar atributos HTML dinámicamente.",
        ],
        "correcta": 2,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a setAttribute?",
        "opciones": [
          "Confundir hasAttribute() con getAttribute() — pregunta: ¿Existe id? Resultado: Mientras: pregunta: ¿Cuál es el valor de id?…",
          "Usar classList.add(\"a b\") → Lanza InvalidCharacterError (espacio no permitido) | Confundir con className += ... → Ese sí duplica…",
          "1. Confundirlo con getAttribute() ➡️ Establece/modifica un atributo. ➡️ Obtiene el valor de un atributo.",
          "Confundirlo con remove() — Son diferentes: ➡️ elimina el atributo. Mientras: ➡️ elimina el elemento completo del DOM.",
        ],
        "correcta": 2,
      },
    ],
  },
  "dom-hasattribute": {
    "id": "dom-hasattribute",
    "titulo": "hasAttribute",
    "icon": "✅",
    "categoria": "DOM · Contenido",
    "firma": "elemento.hasAttribute(nombre)",
    "simulador": "dom",
    "definicion": [
      "`hasAttribute()` es un **método de **`Element` que comprueba si un elemento HTML **tiene un atributo específico**.",
      "Devuelve:",
      "si el atributo existe, o:",
      "si no existe.",
    ],
    "queEs": [
      "Es básicamente una pregunta que le haces al elemento:",
      "**\"¿Tienes este atributo?\"** 🤔",
      "Ejemplo:",
      "Resultado:",
      "Porque el botón tiene el atributo `disabled`.",
    ],
    "paraQueSirve": [
      "Sirve para **comprobar la existencia de un atributo antes de realizar alguna acción**.",
      "Por ejemplo:",
      "Es especialmente útil cuando necesitas distinguir entre:",
    ],
    "comoFunciona": [
      "Le proporcionas el **nombre del atributo**:",
      "Por ejemplo:",
      "No necesitas conocer el valor del atributo.",
      "Por ejemplo:",
      "Aunque `disabled` no tenga un valor explícito, el atributo **existe**:",
    ],
    "sintaxis": [
      {
        "code": "element.hasAttribute(attributeName);",
      },
      {
        "caption": "Parámetros",
        "code": "element.hasAttribute(\"title\");",
      },
      {
        "caption": "Retorno",
        "code": "true  → el atributo existe\nfalse → el atributo no existe",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Comprobar disabled",
        "code": "const boton=document.querySelector(\"#boton\");\nif (boton.hasAttribute(\"disabled\")) {\n\tconsole.log(\"Está deshabilitado\");\n}",
      },
      {
        "titulo": "2. Comprobar un atributo inexistente",
        "code": "console.log(boton.hasAttribute(\"href\"));\n\nfalse",
      },
      {
        "titulo": "3. Comprobar data-",
        "code": "const usuario=document.querySelector(\"#usuario\");\nconsole.log(usuario.hasAttribute(\"data-id\"));\n\ntrue",
      },
    ],
    "errores": [
      {
        "texto": "❌ Confundir `hasAttribute()` con `getAttribute()` — pregunta: ¿Existe `id`? Resultado: Mientras: pregunta: ¿Cuál es el valor de `id`? Resultado:",
        "code": "element.hasAttribute(\"id\");\n\ntrue / false\n\nelement.getAttribute(\"id\");\n\n\"usuario\"",
      },
      {
        "texto": "❌ Pensar que comprueba una propiedad JavaScript — Esto: comprueba el **atributo HTML**. No es exactamente lo mismo que: La primera pregunta es: ¿Existe el atributo `disabled`? La segunda: ¿Está activada la propiedad `disabled`?",
        "code": "element.hasAttribute(\"disabled\");\n\nelement.disabled",
      },
    ],
    "casos": [
      "Por ejemplo, comprobar si un enlace tiene `target`:",
      "O comprobar antes de eliminar:",
    ],
    "relacion": [
      "Aquí tienes el **rompecabezas de los atributos DOM** 🧩:",
      "Ejemplo completo:",
    ],
    "analogia": "Imagina que un elemento es una **mochila** 🎒 y los atributos son objetos dentro: `hasAttribute(\"Llaves\")` pregunta: **\"¿Tienes llaves?\"** No te dice cuáles son las llaves ni las saca de la mochila. Solo responde:",
    "fuente": "Apuntes personales · Notion",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de hasAttribute?",
        "opciones": [
          "elemento.getAttribute(nombre)",
          "elemento.setAttribute(nombre, valor)",
          "elemento.removeAttribute(nombre)",
          "elemento.hasAttribute(nombre)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor hasAttribute?",
        "opciones": [
          "Método del DOM que permite crear o modificar un atributo de un elemento HTML.",
          "Método del DOM que permite obtener el valor de un atributo de un elemento HTML.",
          "removeAttribute() es un método de Element que elimina un atributo de un elemento HTML.",
          "hasAttribute() es un método de Element que comprueba si un elemento HTML tiene un atributo específico.",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve hasAttribute?",
        "opciones": [
          "Principalmente para quitar o desactivar atributos HTML dinámicamente.",
          "Leer clases: Obtener todas las clases de un elemento como string.",
          "Sirve para modificar dinámicamente los atributos HTML de un elemento mediante JavaScript.",
          "Sirve para comprobar la existencia de un atributo antes de realizar alguna acción.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a hasAttribute?",
        "opciones": [
          "Confundirlo con remove() — Son diferentes: ➡️ elimina el atributo. Mientras: ➡️ elimina el elemento completo del DOM.",
          "Usar classList.add(\"a b\") → Lanza InvalidCharacterError (espacio no permitido) | Confundir con className += ... → Ese sí duplica…",
          "1. Confundirlo con getAttribute() ➡️ Establece/modifica un atributo. ➡️ Obtiene el valor de un atributo.",
          "Confundir hasAttribute() con getAttribute() — pregunta: ¿Existe id? Resultado: Mientras: pregunta: ¿Cuál es el valor de id?…",
        ],
        "correcta": 3,
      },
    ],
  },
  "dom-removeattribute": {
    "id": "dom-removeattribute",
    "titulo": "removeAttribute",
    "icon": "🧽",
    "categoria": "DOM · Contenido",
    "firma": "elemento.removeAttribute(nombre)",
    "simulador": "dom",
    "definicion": [
      "`removeAttribute()` es un **método de **`Element` que elimina un **atributo** de un elemento HTML.",
    ],
    "queEs": [
      "Sirve para quitar atributos como:",
      "Con JavaScript:",
      "El atributo desaparece del HTML:",
      "👉 La idea clave:",
      "`removeAttribute()`** = eliminar un atributo del elemento.**",
    ],
    "paraQueSirve": [
      "Principalmente para **quitar o desactivar atributos HTML dinámicamente**.",
      "Por ejemplo:",
      "permite que un botón deje de tener el atributo `disabled`.",
      "También puedes eliminar:",
      "y otros atributos.",
    ],
    "comoFunciona": [
      "Primero tienes un elemento:",
      "Después indicas el **nombre del atributo** que quieres eliminar:",
      "Antes:",
      "Después:",
      "⚠️ Solo elimina el **atributo indicado**, no elimina el elemento.",
    ],
    "sintaxis": [
      {
        "code": "element.removeAttribute(attributeName);",
      },
      {
        "caption": "Parámetros",
        "code": "element.removeAttribute(\"title\");",
      },
      {
        "caption": "Retorno",
        "code": "undefined",
      },
    ],
    "ejemplos": [
      {
        "titulo": "1. Eliminar disabled",
        "code": "const boton=document.querySelector(\"#boton\");\nboton.removeAttribute(\"disabled\");",
      },
      {
        "titulo": "2. Eliminar title",
        "code": "elemento.removeAttribute(\"title\");\n\nHola\n\nHola",
      },
      {
        "titulo": "3. Eliminar class",
        "code": "elemento.removeAttribute(\"class\");\n\nelemento.classList.remove(\"activo\");",
      },
    ],
    "errores": [
      {
        "texto": "❌ Confundirlo con `remove()` — Son diferentes: ➡️ elimina **el atributo**. Mientras: ➡️ elimina **el elemento completo del DOM**.",
        "code": "elemento.removeAttribute(\"disabled\");\n\nelemento.remove();\n\n↑\n    atributo\n\ncaja.removeAttribute(\"class\")\n       ↓\n\n\ncaja.remove()\n       ↓\n[elemento eliminado]",
      },
      {
        "texto": "❌ Pensar que devuelve algo — Resultado:",
        "code": "const resultado=elemento.removeAttribute(\"class\")\n;console.log(resultado);\n\nundefined",
      },
    ],
    "casos": [
      "Un caso muy común es activar/desactivar controles:",
      "También puedes combinarlo con `setAttribute()`:",
      "⬇️",
      "Es decir:",
    ],
    "relacion": [
      "Estos cuatro métodos forman prácticamente un pequeño **sistema de gestión de atributos**:",
      "Ejemplo:",
    ],
    "analogia": "Imagina que un elemento HTML es una persona con **etiquetas** 🏷️: `removeAttribute(\"VIP\")` significa: **\"Quítale la etiqueta VIP.\"** No elimina a la persona; solamente elimina **esa característica/etiqueta**.",
    "fuente": "Apuntes personales · Notion",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de removeAttribute?",
        "opciones": [
          "elemento.setAttribute(nombre, valor)",
          "elemento.hasAttribute(nombre)",
          "elemento.removeAttribute(nombre)",
          "elemento.getAttribute(nombre)",
        ],
        "correcta": 2,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor removeAttribute?",
        "opciones": [
          "hasAttribute() es un método de Element que comprueba si un elemento HTML tiene un atributo específico.",
          "Método del DOM que permite crear o modificar un atributo de un elemento HTML.",
          "removeAttribute() es un método de Element que elimina un atributo de un elemento HTML.",
          "Método del DOM que permite obtener el valor de un atributo de un elemento HTML.",
        ],
        "correcta": 2,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve removeAttribute?",
        "opciones": [
          "Sirve para comprobar la existencia de un atributo antes de realizar alguna acción.",
          "Leer clases: Obtener todas las clases de un elemento como string.",
          "Principalmente para quitar o desactivar atributos HTML dinámicamente.",
          "Sirve para modificar dinámicamente los atributos HTML de un elemento mediante JavaScript.",
        ],
        "correcta": 2,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a removeAttribute?",
        "opciones": [
          "Confundirlo con remove() — Son diferentes: ➡️ elimina el atributo. Mientras: ➡️ elimina el elemento completo del DOM.",
          "Confundir hasAttribute() con getAttribute() — pregunta: ¿Existe id? Resultado: Mientras: pregunta: ¿Cuál es el valor de id?…",
          "Usar classList.add(\"a b\") → Lanza InvalidCharacterError (espacio no permitido) | Confundir con className += ... → Ese sí duplica…",
          "1. Confundirlo con getAttribute() ➡️ Establece/modifica un atributo. ➡️ Obtiene el valor de un atributo.",
        ],
        "correcta": 0,
      },
    ],
  },
  "dom-classname": {
    "id": "dom-classname",
    "titulo": "className",
    "icon": "🏷️",
    "categoria": "DOM · Contenido",
    "firma": "elemento.className",
    "simulador": "dom",
    "definicion": [
      "Es una propiedad del DOM que permite obtener o establecer el **atributo **`class` de un elemento HTML como una cadena de texto.",
      "Representa todas las clases CSS que tiene asignadas un elemento, separadas por espacios.",
    ],
    "queEs": [
      "`className` es una propiedad de los elementos del DOM que refleja directamente el contenido del atributo `class` en HTML.",
      "Permite leer y modificar las clases de un elemento de forma sencilla y directa.",
      "Es la forma más antigua de manipular clases en JavaScript, disponible desde los inicios del DOM.",
    ],
    "paraQueSirve": [
      "**Leer clases**: Obtener todas las clases de un elemento como string.",
      "**Asignar clases**: Reemplazar completamente las clases de un elemento.",
      "**Añadir/eliminar clases**: Modificar el string de clases (aunque es propenso a errores).",
      "**Verificar existencia**: Comprobar si un elemento tiene una clase específica.",
      "**Manipulación CSS**: Cambiar el estilo visual de elementos mediante clases.",
    ],
    "comoFunciona": [
      "Cuando se **lee** `className`, devuelve el valor del atributo `class` como string.",
      "Cuando se **asigna** `className`, reemplaza completamente el atributo `class` con el nuevo valor.",
      "El string contiene nombres de clase separados por **espacios**.",
      "**Características importantes**:",
      "Devuelve/establece el atributo `class` completo.",
      "Es una propiedad **antigua** pero aún funcional.",
      "Requiere manejo manual de múltiples clases.",
      "Es **case-sensitive** (distingue mayúsculas/minúsculas).",
      "No tiene métodos para añadir/eliminar clases individuales (para eso existe `classList`).",
    ],
    "sintaxis": [
      {
        "code": "// Obtener clases\nlet clases = elemento.className;\n\n// Establecer clases (reemplaza todas)\nelemento.className = \"clase1 clase2 clase3\";\n\n// Añadir una clase (manteniendo las existentes)\nelemento.className += \" nuevaClase\";\n\n// Eliminar una clase\nelemento.className = elemento.className.replace(\"claseAEliminar\", \"\").trim();",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Básico - Leer clases",
        "code": "Contenido\n\nconst elemento = document.getElementById('miElemento');\nconsole.log(elemento.className); // \"principal activo destacado\"\nconsole.log(typeof elemento.className); // \"string\"",
      },
      {
        "titulo": "Establecer clases",
        "code": "const elemento = document.getElementById('miElemento');\n\n// Reemplazar todas las clases\nelemento.className = \"nueva-clase\";\n// Resultado:\n\n// Reemplazar por múltiples clases\nelemento.className = \"clase1 clase2 clase3\";\n// Resultado:",
      },
      {
        "titulo": "Añadir una clase",
        "code": "const elemento = document.getElementById('miElemento');\nelemento.className = \"rojo\"; // Ahora tiene \"rojo\"\n\n// Añadir otra clase\nelemento.className += \" grande\";\n// Ahora tiene \"rojo grande\" (NOTA: incluye espacio al inicio)\n\n// Mejor forma con trim()\nelemento.className = (elemento.className + \" activo\").trim();",
      },
      {
        "titulo": "Eliminar una clase específica",
        "code": "function eliminarClase(elemento, clase) {\n    // Método simple (elimina la primera ocurrencia)\n    elemento.className = elemento.className.replace(clase, '').trim();\n\n    // Método más robusto (elimina todas las ocurrencias)\n    const clases = elemento.className.split(' ');\n    const index = clases.indexOf(clase);\n    if (index !== -1) {\n        clases.splice(index, 1);\n        elemento.className = clases.join(' ');\n    }\n}",
      },
      {
        "titulo": "Verificar si tiene una clase",
        "code": "function tieneClase(elemento, clase) {\n    // Método simple (puede dar falsos positivos)\n    return elemento.className.indexOf(clase) !== -1;\n\n    // Método más robusto (evita falsos positivos)\n    return elemento.className.split(' ').includes(clase);\n}\n\n// Ejemplo de falsos positivos con el método simple\nconst elemento = document.getElementById('test');\nelemento.className = \"mi-clase\";\nconsole.log(elemento.className.indexOf('clase')); // 3 (true) pero no tiene \"clase\"\nconsole.log(elemento.className.split(' ').includes('clase')); // false ✅",
      },
      {
        "titulo": "Alternar una clase",
        "code": "function toggleClase(elemento, clase) {\n    const clases = elemento.className.split(' ');\n    const index = clases.indexOf(clase);\n\n    if (index === -1) {\n        // Añadir clase\n        clases.push(clase);\n    } else {\n        // Eliminar clase\n        clases.splice(index, 1);\n    }\n\n    elemento.className = clases.join(' ');\n}",
      },
      {
        "titulo": "Ejemplo completo: Sistema de temas",
        "code": "function cambiarTema(tema) {\n    const body = document.body;\n\n    // Eliminar temas anteriores\n    const temas = ['claro', 'oscuro', 'azul', 'verde'];\n    const clasesActuales = body.className.split(' ');\n    const nuevasClases = clasesActuales.filter(clase => !temas.includes(clase));\n\n    // Añadir nuevo tema\n    nuevasClases.push(tema);\n    body.className = nuevasClases.join(' ');\n}",
      },
    ],
    "errores": [
      {
        "texto": "**Olvidar el espacio al añadir clases**:",
        "code": "const elemento = document.getElementById('test');\nelemento.className = \"clase1\";\n\n// ❌ ERROR: sin espacio, se convierte en una sola clase\nelemento.className += \"clase2\";\n// Resultado: \"clase1clase2\" (una sola clase)\n\n// ✅ CORRECTO: incluir espacio\nelemento.className += \" clase2\";\n// Resultado: \"clase1 clase2\"\n\n// ✅ Mejor: usar trim()\nelemento.className = (elemento.className + \" clase2\").trim();",
      },
      {
        "texto": "**Falsos positivos al verificar clases**:",
        "code": "const elemento = document.getElementById('test');\nelemento.className = \"mi-clase\";\n\n// ❌ Incorrecto (puede dar falsos positivos)\nif (elemento.className.indexOf('clase') !== -1) {\n    console.log('Tiene \"clase\"'); // ¡Se ejecuta pero no tiene \"clase\"!\n}\n\n// ✅ Correcto\nif (elemento.className.split(' ').includes('clase')) {\n    console.log('Tiene \"clase\"');\n}\n// No se ejecuta porque \"clase\" no está en la lista",
      },
      {
        "texto": "**Confundir className con classList**:",
        "code": "// className es un string\nelemento.className = \"clase1 clase2\"; // ✅\n\n// ❌ className no tiene métodos\nelemento.className.add('clase3'); // TypeError\n\n// ✅ Usar classList para métodos\nelemento.classList.add('clase3');",
      },
      {
        "texto": "**Creer que className actualiza automáticamente los estilos**:",
        "code": "// Cambiar className NO cambia los estilos inline\nelemento.className = \"nueva-clase\";\n// Los estilos se aplican según las reglas CSS, no inline",
      },
      {
        "texto": "**Problemas con clases que contienen espacios**:",
        "code": "Contenido",
      },
    ],
    "casos": [
      "**Cambiar temas** → `body.className = 'tema-oscuro';`",
      "**Validación de formularios** → `input.className = 'error';`",
      "**Mostrar/ocultar elementos** → `elemento.className = 'visible';`",
      "**Menús activos** → `elemento.className = 'activo';`",
      "**Estado de componentes** → `tarjeta.className = 'seleccionada';`",
      "**Animaciones CSS** → `elemento.className = 'animar';`",
      "**Filtros de búsqueda** → `items.forEach(item => item.className = 'filtrado');`",
    ],
    "relacion": [
      "`className` → String, manejo manual de clases, más antiguo.",
      "`classList` → Objeto con métodos (`add`, `remove`, `toggle`, `contains`), más moderno y recomendado.",
      "`setAttribute('class', ...)` → Similar a `className` pero como atributo.",
      "`getAttribute('class')` → Similar a `className` pero más lento.",
      "`style` → Aplica estilos inline (más específico que clases).",
      "`id` → Identificador único, no para estilos (clases).",
      "**Comparativa className vs classList**",
    ],
    "analogia": "`className` es como la **etiqueta de un archivador**. El archivador (elemento) tiene etiquetas (clases) que dicen cómo debe verse y comportarse. Puedes: **Leer**: Ver todas las etiquetas escritas en la etiqueta. **Reemplazar**: Quitar todas las etiquetas y poner otras nuevas. **Añadir**: Escribir más etiquetas (cuidado con no olvidar los espacios). **Eliminar**: Borrar etiquetas específicas (pero con cuidado). Es una forma directa pero manual de manejar las etiquetas, como usar un marcador y una goma de borrar en lugar de una herramienta más moderna.",
    "fuente": "MDN Web Docs - className W3Schools - className MDN - classList Especificación DOM Living Standard - WHATWG",
    "notasPersonales": [
      "**Recomendación moderna**: Para **operaciones simples** (reemplazar todas las clases) → `className`. Para **operaciones complejas** (añadir/eliminar clases individuales) → `classList`. `classList` es más legible y menos propenso a errores.",
      "**Seguridad y buenas prácticas**:",
      "Código: // ❌ Evitar: Strings complejos",
      "**Métodos útiles con className**:",
      "Código: // ✅ Función para añadir clases de forma segura",
      "**Compatibilidad**: `className` está disponible en TODOS los navegadores. Es la forma más compatible de manipular clases. `classList` está disponible en IE 10+ y todos los navegadores modernos.",
      "**Consideraciones especiales**:",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de className?",
        "opciones": [
          "elemento.setAttribute(nombre, valor)",
          "elemento.getAttribute(nombre)",
          "elemento.hasAttribute(nombre)",
          "elemento.className",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor className?",
        "opciones": [
          "hasAttribute() es un método de Element que comprueba si un elemento HTML tiene un atributo específico.",
          "Método del DOM que permite crear o modificar un atributo de un elemento HTML.",
          "Método del DOM que permite obtener el valor de un atributo de un elemento HTML.",
          "Es una propiedad del DOM que permite obtener o establecer el atributo class de un elemento HTML como una cadena de texto.",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve className?",
        "opciones": [
          "Sirve para comprobar la existencia de un atributo antes de realizar alguna acción.",
          "Principalmente para quitar o desactivar atributos HTML dinámicamente.",
          "Sirve para modificar dinámicamente los atributos HTML de un elemento mediante JavaScript.",
          "Leer clases: Obtener todas las clases de un elemento como string.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿En qué caso de uso encaja className?",
        "opciones": [
          "🎨 Cambiar tema (dark/light mode).",
          "Menús desplegables → menu.classList.toggle('abierto')",
          "Modificar enlaces dinámicamente.",
          "Cambiar temas → body.className = 'tema-oscuro';",
        ],
        "correcta": 3,
      },
    ],
  },
  "dom-classlist": {
    "id": "dom-classlist",
    "titulo": "classList",
    "icon": "🎛️",
    "categoria": "DOM · Contenido",
    "firma": "elemento.classList",
    "simulador": "dom",
    "definicion": [
      "Es una propiedad del DOM que proporciona una **colección viva** de las clases CSS de un elemento, con métodos integrados para manipularlas de forma sencilla y eficiente (añadir, eliminar, alternar y verificar clases).",
    ],
    "queEs": [
      "`classList` es una propiedad de los elementos del DOM que devuelve un objeto de tipo `DOMTokenList` con todas las clases del elemento.",
      "Proporciona una API moderna y conveniente para manipular clases, eliminando la necesidad de manejar manualmente strings.",
      "**Características importantes**:",
      "Es una **colección viva** (se actualiza automáticamente).",
      "Proporciona métodos como `add()`, `remove()`, `toggle()`, `contains()` y `replace()`.",
      "Es **case-sensitive** (distingue mayúsculas/minúsculas).",
      "Es la forma **moderna y recomendada** de manejar clases.",
      "Más legible y menos propenso a errores que `className`.",
    ],
    "paraQueSirve": [
      "**Añadir clases**: Agregar una o más clases sin sobrescribir las existentes.",
      "**Eliminar clases**: Remover clases específicas.",
      "**Alternar clases**: Activar/desactivar clases (útil para menús, modales).",
      "**Verificar clases**: Comprobar si un elemento tiene una clase específica.",
      "**Reemplazar clases**: Sustituir una clase por otra.",
      "**Manejo de múltiples clases**: Trabajar con varias clases de forma fácil y segura.",
    ],
    "comoFunciona": [
      "Se accede a la propiedad `classList` del elemento.",
      "Devuelve un objeto `DOMTokenList` con todas las clases.",
      "Los métodos permiten manipular las clases de forma atómica.",
      "El objeto es **vivo**: refleja cambios en tiempo real.",
      "Proporciona una interfaz similar a un array (iterable).",
      "**Estructura de DOMTokenList**:",
      "Propiedades: `length` (número de clases).",
      "Métodos: `add()`, `remove()`, `toggle()`, `contains()`, `replace()`, `item()`, `forEach()`.",
      "Iterable: se puede usar `for...of`, `forEach()`, etc.",
    ],
    "sintaxis": [
      {
        "code": "const listaClases = elemento.classList;\n\n// Métodos principales\nelemento.classList.add('clase1', 'clase2', ...);\nelemento.classList.remove('clase1', 'clase2', ...);\nelemento.classList.toggle('clase'[, force]);\nelemento.classList.contains('clase'); // boolean\nelemento.classList.replace('claseVieja', 'claseNueva');\nelemento.classList.item(index); // string o null",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Básico - Añadir y eliminar clases",
        "code": "Contenido\n\nconst elemento = document.getElementById('miElemento');\n\n// Añadir clase\nelemento.classList.add('grande');\n// Resultado: class=\"rojo grande\"\n\n// Eliminar clase\nelemento.classList.remove('rojo');\n// Resultado: class=\"grande\"\n\n// Añadir múltiples clases\nelemento.classList.add('activo', 'destacado', 'animado');\n// Resultado: class=\"grande activo destacado animado\"",
      },
      {
        "titulo": "Verificar si tiene una clase",
        "code": "const elemento = document.getElementById('miElemento');\n\nif (elemento.classList.contains('activo')) {\n    console.log('El elemento está activo');\n} else {\n    console.log('El elemento no está activo');\n}",
      },
      {
        "titulo": "Alternar clases (toggle)",
        "code": "const elemento = document.getElementById('miElemento');\n\n// Alternar clase 'activo'\nelemento.classList.toggle('activo');\n// Si la tiene, la elimina; si no, la añade\n\n// Alternar con fuerza (forzar estado)\nelemento.classList.toggle('activo', true);  // Forzar añadir\nelemento.classList.toggle('activo', false); // Forzar eliminar\n\n// Útil para menús y modales\ndocument.getElementById('menu-toggle').addEventListener('click', () => {\n    document.getElementById('menu').classList.toggle('abierto');\n});",
      },
      {
        "titulo": "Reemplazar una clase por otra",
        "code": "const elemento = document.getElementById('miElemento');\n\n// Reemplazar 'rojo' por 'azul'\nelemento.classList.replace('rojo', 'azul');\n\n// Si 'rojo' existe, se reemplaza; si no, no hace nada",
      },
      {
        "titulo": "Obtener clases como array",
        "code": "const elemento = document.getElementById('miElemento');\nconsole.log(elemento.classList.length); // Número de clases\n\n// Obtener clase por índice\nconst primeraClase = elemento.classList.item(0);\n\n// Convertir a array (para usar métodos de array)\nconst clasesArray = Array.from(elemento.classList);\nconst clasesArray2 = [...elemento.classList];\n\n// Iterar\nelemento.classList.forEach(clase => {\n    console.log(clase);\n});",
      },
      {
        "titulo": "Ejemplo: Menú responsive",
        "code": "function toggleMenu() {\n    const menu = document.getElementById('menu');\n    const body = document.body;\n\n    // Alternar clases\n    menu.classList.toggle('visible');\n    body.classList.toggle('menu-abierto');\n\n    // Cambiar icono\n    const icono = document.getElementById('menu-icono');\n    icono.classList.toggle('fa-bars');\n    icono.classList.toggle('fa-times');\n}\n\n// Cerrar menú al hacer clic fuera\ndocument.addEventListener('click', (e) => {\n    const menu = document.getElementById('menu');\n    const toggle = document.getElementById('menu-toggle');\n\n    if (!menu.contains(e.target) && !toggle.contains(e.target)) {\n        menu.classList.remove('visible');\n        document.body.classList.remove('menu-abierto');\n    }\n});",
      },
      {
        "titulo": "Ejemplo: Sistema de temas",
        "code": "function cambiarTema(tema) {\n    const body = document.body;\n\n    // Eliminar todos los temas\n    const temas = ['claro', 'oscuro', 'azul', 'verde', 'morado'];\n    temas.forEach(t => body.classList.remove(t));\n\n    // Aplicar nuevo tema\n    body.classList.add(tema);\n\n    // Guardar preferencia\n    localStorage.setItem('tema', tema);\n}\n\n// Cargar tema guardado\nfunction cargarTema() {\n    const temaGuardado = localStorage.getItem('tema') || 'claro';\n    document.body.classList.add(temaGuardado);\n}\n\n// Uso\ncargarTema();\ncambiarTema('oscuro');",
      },
    ],
    "errores": [
      {
        "texto": "**Confundir classList con className**:",
        "code": "// ❌ classList no es un string\nconst clases = elemento.classList;\nconsole.log(clases); // DOMTokenList, no string\nconsole.log(clases.toString()); // string\n\n// ✅ Usar el método apropiado\nelemento.classList.add('clase'); // Correcto\nelemento.className = 'clase'; // También correcto pero menos flexible",
      },
      {
        "texto": "**Intentar añadir clases inválidas**:",
        "code": "// ❌ Las clases no pueden tener espacios\nelemento.classList.add('mi clase'); // Añade dos clases: 'mi' y 'clase'\nelemento.classList.add(''); // Ignora string vacío\n\n// ✅ Separar clases\nelemento.classList.add('mi-clase', 'otra-clase');",
      },
      {
        "texto": "**No verificar existencia antes de remover**:",
        "code": "// remove no lanza error si la clase no existe\nelemento.classList.remove('no-existe'); // ✅ No pasa nada\n\n// Pero contains devuelve false si no existe\nif (elemento.classList.contains('activo')) {\n    // Hacer algo\n}",
      },
      {
        "texto": "**Reemplazar con replace**:",
        "code": "// ❌ replace solo reemplaza UNA clase\nelemento.classList.replace('vieja', 'nueva');\n\n// Si 'vieja' no existe, no hace nada\n// Si hay varias 'vieja', solo reemplaza la primera",
      },
      {
        "texto": "**Usar classList en SVG (compatibilidad)**:",
        "code": "// ✅ En SVG modernos funciona\nconst svg = document.querySelector('svg');\nsvg.classList.add('mi-clase');\n\n// ⚠️ En SVG antiguos, usar className o setAttribute\nsvg.setAttribute('class', 'mi-clase');",
      },
    ],
    "casos": [
      "**Menús desplegables** → `menu.classList.toggle('abierto')`",
      "**Modales/Popups** → `modal.classList.add('visible')`",
      "**Temas oscuro/claro** → `body.classList.toggle('tema-oscuro')`",
      "**Validación de formularios** → `input.classList.add('error')`",
      "**Filtros de contenido** → `item.classList.toggle('oculto')`",
      "**Animaciones CSS** → `elemento.classList.add('animar')`",
      "**Pestañas/Tabs** → `tab.classList.add('activo')`",
    ],
    "relacion": [
      "`classList` → Objeto con métodos, moderno, recomendado.",
      "`className` → String, manejo manual, más antiguo.",
      "`setAttribute('class', ...)` → Similar a className pero como atributo.",
      "`toggleAttribute()` → Alterna atributos booleanos.",
      "`style` → Manipula estilos inline, no clases.",
      "`dataset` → Manipula atributos data-*, no clases.",
      "**Comparativa classList vs className**",
    ],
    "analogia": "`classList` es como un **asistente personal** para gestionar las etiquetas de un archivador. En lugar de escribir y borrar manualmente en la etiqueta (`className`), tienes un asistente que puede: **Añadir** etiquetas sin quitar las existentes (`add()`). **Quitar** etiquetas específicas (`remove()`). **Verificar** si una etiqueta está (`contains()`). **Alternar** etiquetas (poner/quitar) con un solo comando (`toggle()`). **Reemplazar** una etiqueta por otra (`replace()`). Es mucho más profesional, preciso y menos propenso a errores que hacerlo manualmente.",
    "fuente": "MDN Web Docs - classList W3Schools - classList MDN - DOMTokenList Especificación DOM Living Standard - WHATWG",
    "notasPersonales": [
      "**Rendimiento**: `classList` es eficiente y está optimizado en los navegadores modernos. Para operaciones masivas (miles de elementos), considerar usar `className` por rendimiento. La diferencia es mínima en la mayoría de los casos.",
      "**Buenas prácticas**:",
      "Código: // ✅ Usar métodos de classList para operaciones individuales",
      "**Métodos útiles de DOMTokenList**:",
      "Código: const list = elemento.classList;",
      "**Compatibilidad**: `classList` está disponible en todos los navegadores modernos. IE 10+ tiene soporte completo. IE 9 tiene soporte parcial (sin `replace()` y `forEach()`). Para IE 8, usar `className` o polyfills.",
      "**Consideraciones especiales**:",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de classList?",
        "opciones": [
          "elemento.classList",
          "elemento.hasAttribute(nombre)",
          "elemento.getAttribute(nombre)",
          "elemento.setAttribute(nombre, valor)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor classList?",
        "opciones": [
          "Método del DOM que permite obtener el valor de un atributo de un elemento HTML.",
          "Es una propiedad del DOM que proporciona una colección viva de las clases CSS de un elemento, con métodos integrados para manipularlas de…",
          "hasAttribute() es un método de Element que comprueba si un elemento HTML tiene un atributo específico.",
          "Método del DOM que permite crear o modificar un atributo de un elemento HTML.",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve classList?",
        "opciones": [
          "Sirve para modificar dinámicamente los atributos HTML de un elemento mediante JavaScript.",
          "Añadir clases: Agregar una o más clases sin sobrescribir las existentes.",
          "Principalmente para quitar o desactivar atributos HTML dinámicamente.",
          "Sirve para comprobar la existencia de un atributo antes de realizar alguna acción.",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿En qué caso de uso encaja classList?",
        "opciones": [
          "Menús desplegables → menu.classList.toggle('abierto')",
          "Modificar enlaces dinámicamente.",
          "🎨 Cambiar tema (dark/light mode).",
          "Cambiar temas → body.className = 'tema-oscuro';",
        ],
        "correcta": 0,
      },
    ],
  },
  "dom-classlist-add": {
    "id": "dom-classlist-add",
    "titulo": "elemento.classList.add()",
    "icon": "➕",
    "categoria": "DOM · Contenido",
    "firma": "elemento.classList.add(...clases)",
    "simulador": "dom",
    "definicion": [
      "`elemento.classList.add()` es un **método del DOM** que **añade una o más clases CSS** al atributo `class` de un elemento HTML, sin duplicarlas si ya existen.",
      "javascript",
    ],
    "queEs": [
      "`classList` es una propiedad de los elementos HTML que devuelve un objeto `DOMTokenList`, una colección viva de las clases del elemento.",
      "`add()` es uno de sus métodos principales y permite **manipular clases de forma limpia**, sin concatenar strings ni usar `className`.",
      "Es la forma **moderna y recomendada** de trabajar con clases CSS desde JavaScript.",
    ],
    "paraQueSirve": [
      "🎨 **Aplicar estilos** dinámicamente (colores, tamaños, animaciones).",
      "🔄 **Alternar estados visuales**: activo, oculto, cargando, error.",
      "✨ Disparar **transiciones y animaciones CSS**.",
      "🧩 Añadir **múltiples clases** en una sola llamada.",
      "🎛️ Manipular clases sin romper las existentes.",
      "🎯 Integrar con frameworks CSS como **Tailwind**, **Bootstrap**.",
    ],
    "comoFunciona": [
      "Accede al `DOMTokenList` del elemento vía `element.classList`.",
      "`add()` recibe **uno o varios strings** con nombres de clases.",
      "Si la clase **no existe** → la añade al atributo `class`.",
      "Si la clase **ya existe** → **no la duplica** (idempotente).",
      "Si el string contiene **espacios** → lanza `InvalidCharacterError`.",
      "Devuelve `undefined` (no el elemento).",
    ],
    "sintaxis": [
      {
        "code": "elemento.classList.add(\"clase\");\nelemento.classList.add(\"clase1\", \"clase2\", \"clase3\");",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "code": "// ❌ InvalidCharacterError\nel.classList.add(\"btn primary\");\n\n// ✅ Correcto\nel.classList.add(\"btn\", \"primary\");\n\n// ❌ TypeError si el elemento es null\ndocument.querySelector(\".no-existe\").classList.add(\"x\");\n\n// ✅ Verificar primero\nconst el = document.querySelector(\".no-existe\");\nif (el) el.classList.add(\"x\");",
      },
      {
        "titulo": "🔸 Añadir desde un array",
        "code": "const clases = [\"activo\", \"grande\", \"rojo\"];\n\n// ❌ No funciona\nel.classList.add(clases);\n\n// ✅ Con spread\nel.classList.add(...clases);",
      },
    ],
    "errores": [
      "Usar `classList.add(\"a b\")` → ❌ Lanza `InvalidCharacterError` (espacio no permitido) | Confundir con `className += ...` → Ese sí duplica y sobrescribe | Usar en `null` → Si el `querySelector` no encuentra → `TypeError` | Esperar que devuelva el elemento → ❌ Devuelve `undefined` (no se puede encadenar) | Pensar que acepta arrays → Debes usar `...spread` o pasar strings separados | Llamarlo sobre `SVGElement` antiguo → ✅ Funciona en SVG modernos, pero cuidado con IE | No verificar mayúsculas → Las clases son **case-sensitive**: `\"Activa\"` ≠ `\"activa\"` | Olvidar que es **live** → `classList` refleja cambios en tiempo real",
    ],
    "casos": [
      "🎨 Cambiar **tema** (dark/light mode).",
      "✅ Marcar un **formulario válido/ inválido**.",
      "🔔 Mostrar **notificaciones** con animación.",
      "🍔 Abrir/cerrar **menús** y modales.",
      "📌 Marcar el **tab activo** en navegación.",
      "⏳ Indicar **estado de carga** en botones.",
      "🎯 Resaltar **resultados** de búsqueda.",
    ],
    "relacion": [
      "`className` → Propiedad antigua (string); `classList` es superior",
      "`getAttribute(\"class\")` → Devuelve el string completo",
      "`setAttribute(\"class\", ...)` → **Sobrescribe** todas las clases",
      "`DOMTokenList` → Tipo del objeto `classList`",
      "`remove()` → Método opuesto",
      "`toggle()` → Alterna; acepta segundo argumento `force`",
      "`replace()` → Cambia una clase por otra",
    ],
    "analogia": "Imagina que un elemento HTML es una **mochila** 🎒 y cada clase es una **pegatina** que le pones. `classList.add(\"activo\")` = pegas la pegatina \"activo\". Si ya la tiene → **no la pegas dos veces** (no hay duplicados). Puedes pegar **varias a la vez**: `add(\"rojo\", \"grande\")`. `remove()` = despegas una. `toggle()` = si la tiene, la quitas; si no, la pones. `contains()` = preguntas: *\"¿tiene esta pegatina?\"* Y todo esto **sin romper** las demás pegatinas que ya estaban.",
    "fuente": "📘 MDN – Element.classList 📗 MDN – DOMTokenList.add() 📕 WHATWG DOM Standard – classList 📙 MDN – Manipulando clases con classList",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de elemento.classList.add()?",
        "opciones": [
          "elemento.setAttribute(nombre, valor)",
          "elemento.getAttribute(nombre)",
          "elemento.classList.add(...clases)",
          "elemento.hasAttribute(nombre)",
        ],
        "correcta": 2,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor elemento.classList.add()?",
        "opciones": [
          "Método del DOM que permite crear o modificar un atributo de un elemento HTML.",
          "Método del DOM que permite obtener el valor de un atributo de un elemento HTML.",
          "elemento.classList.add() es un método del DOM que añade una o más clases CSS al atributo class de un elemento HTML, sin duplicarlas si ya…",
          "hasAttribute() es un método de Element que comprueba si un elemento HTML tiene un atributo específico.",
        ],
        "correcta": 2,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve elemento.classList.add()?",
        "opciones": [
          "Sirve para modificar dinámicamente los atributos HTML de un elemento mediante JavaScript.",
          "Sirve para comprobar la existencia de un atributo antes de realizar alguna acción.",
          "🎨 Aplicar estilos dinámicamente (colores, tamaños, animaciones).",
          "Principalmente para quitar o desactivar atributos HTML dinámicamente.",
        ],
        "correcta": 2,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a elemento.classList.add()?",
        "opciones": [
          "Usar classList.add(\"a b\") → Lanza InvalidCharacterError (espacio no permitido) | Confundir con className += ... → Ese sí duplica…",
          "Confundir hasAttribute() con getAttribute() — pregunta: ¿Existe id? Resultado: Mientras: pregunta: ¿Cuál es el valor de id?…",
          "1. Confundirlo con getAttribute() ➡️ Establece/modifica un atributo. ➡️ Obtiene el valor de un atributo.",
          "Confundirlo con remove() — Son diferentes: ➡️ elimina el atributo. Mientras: ➡️ elimina el elemento completo del DOM.",
        ],
        "correcta": 0,
      },
    ],
  },
  "dom-classlist-remove": {
    "id": "dom-classlist-remove",
    "titulo": "elemento.classList.remove()",
    "icon": "➖",
    "categoria": "DOM · Contenido",
    "firma": "elemento.classList.remove(...clases)",
    "simulador": "dom",
    "definicion": [
      "`elemento.classList.remove()` es un **método del DOM** que **elimina una o más clases CSS** del atributo `class` de un elemento HTML.",
    ],
    "queEs": [
      "Es el **método opuesto** a `classList.add()`.",
      "Forma parte del objeto `DOMTokenList` que devuelve `element.classList`, y permite **quitar clases de forma limpia y segura**, sin manipular strings ni arriesgarse a romper otras clases existentes.",
      "Si la clase **no existe**, no lanza error: simplemente **no hace nada**.",
    ],
    "paraQueSirve": [
      "🧹 **Quitar estados visuales**: activo, oculto, cargando, error.",
      "🔄 **Resetear estilos** antes de aplicar nuevos.",
      "⏹️ Detener **animaciones** o transiciones.",
      "🎛️ Limpiar clases al **cambiar de vista** o de estado.",
      "🧼 **Evitar conflictos** entre clases mutuamente excluyentes.",
      "🍔 Cerrar menús, modales, tooltips.",
    ],
    "comoFunciona": [
      "Accede al `DOMTokenList` del elemento vía `element.classList`.",
      "`remove()` recibe **uno o varios strings** con nombres de clases.",
      "Busca cada clase en el atributo `class` del elemento.",
      "Si existe → la **elimina**.",
      "Si **no existe** → no hace nada (silencioso, sin error).",
      "Si el string contiene **espacios** → lanza `InvalidCharacterError`.",
      "Devuelve `undefined` (no el elemento).",
    ],
    "sintaxis": [
      {
        "code": "elemento.classList.remove(\"clase\");\nelemento.classList.remove(\"clase1\", \"clase2\", \"clase3\");",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "code": "// ❌ InvalidCharacterError\nel.classList.remove(\"btn primary\");\n\n// ✅ Correcto\nel.classList.remove(\"btn\", \"primary\");\n\n// ❌ TypeError si el elemento es null\ndocument.querySelector(\".no-existe\").classList.remove(\"x\");\n\n// ✅ Verificar primero\nconst el = document.querySelector(\".no-existe\");\nif (el) el.classList.remove(\"x\");",
      },
      {
        "titulo": "🔸 Eliminar desde un array",
        "code": "const clases = [\"activo\", \"grande\", \"rojo\"];\n\n// ❌ No funciona\nel.classList.remove(clases);\n\n// ✅ Con spread\nel.classList.remove(...clases);",
      },
      {
        "titulo": "🔸 Eliminar todas las clases",
        "code": "// Opción 1: className vacío (borra TODO)\nel.className = \"\";\n\n// Opción 2: con classList\n[...el.classList].forEach(c => el.classList.remove(c));",
      },
    ],
    "errores": [
      "Usar `classList.remove(\"a b\")` → ❌ Lanza `InvalidCharacterError` (espacio no permitido) | Confundir con `className = \"\"` → Eso borra **todas** las clases; `remove()` solo las indicadas | Usar en `null` → Si el `querySelector` no encuentra → `TypeError` | Esperar error si la clase no existe → ❌ Es silencioso; no lanza nada | Pensar que devuelve el elemento → ❌ Devuelve `undefined` | Pasar un array directamente → Debes usar `...spread` | Asumir que detiene animaciones → Solo quita la clase; la animación depende del CSS | Olvidar eliminar clases \"hermanas\" → Debes quitar `error` antes de poner `exito`",
    ],
    "casos": [
      "🎨 **Resetear estados** antes de aplicar nuevos.",
      "🔔 Cerrar **notificaciones** o toasts.",
      "🍔 Cerrar **menús, modales, dropdowns**.",
      "⏹️ Detener **animaciones** tras `animationend`.",
      "🔄 Cambiar entre **temas** o modos.",
      "✅ Limpiar **formularios** tras enviar.",
      "🎯 Quitar **resaltado** de búsqueda.",
    ],
    "relacion": [
      "`classList.add()` → Método **opuesto**",
      "`classList.toggle()` → Alterna; usa `add`/`remove` internamente",
      "`classList.replace()` → Cambia una clase por otra",
      "`classList.contains()` → Verifica si existe antes de quitar",
      "`className = \"\"` → Borra **todas** las clases de golpe",
      "`removeAttribute(\"class\")` → Elimina el atributo completo",
      "`DOMTokenList` → Tipo del objeto `classList`",
    ],
    "analogia": "Imagina que un elemento HTML es una **mochila** 🎒 y cada clase es una **pegatina** pegada. `classList.remove(\"activo\")` = despegas la pegatina \"activo\". Si **no existe** → no pasa nada (no hay error). Puedes despegar **varias a la vez**: `remove(\"rojo\", \"grande\")`. `classList.add()` = pegas pegatinas. `classList.toggle()` = si está, la quitas; si no, la pones. `className = \"\"` = **arrancas todas** las pegatinas de golpe. Y todo esto **sin dañar** las demás pegatinas que quieres conservar.",
    "fuente": "📘 MDN – Element.classList 📗 MDN – DOMTokenList.remove() 📕 WHATWG DOM Standard – classList 📙 MDN – Manipulando clases con classList",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de elemento.classList.remove()?",
        "opciones": [
          "elemento.setAttribute(nombre, valor)",
          "elemento.classList.remove(...clases)",
          "elemento.getAttribute(nombre)",
          "elemento.hasAttribute(nombre)",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor elemento.classList.remove()?",
        "opciones": [
          "elemento.classList.remove() es un método del DOM que elimina una o más clases CSS del atributo class de un elemento HTML.",
          "Método del DOM que permite obtener el valor de un atributo de un elemento HTML.",
          "Método del DOM que permite crear o modificar un atributo de un elemento HTML.",
          "hasAttribute() es un método de Element que comprueba si un elemento HTML tiene un atributo específico.",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve elemento.classList.remove()?",
        "opciones": [
          "Sirve para modificar dinámicamente los atributos HTML de un elemento mediante JavaScript.",
          "🧹 Quitar estados visuales: activo, oculto, cargando, error.",
          "Sirve para comprobar la existencia de un atributo antes de realizar alguna acción.",
          "Principalmente para quitar o desactivar atributos HTML dinámicamente.",
        ],
        "correcta": 1,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a elemento.classList.remove()?",
        "opciones": [
          "1. Confundirlo con getAttribute() ➡️ Establece/modifica un atributo. ➡️ Obtiene el valor de un atributo.",
          "Usar classList.remove(\"a b\") → Lanza InvalidCharacterError (espacio no permitido) | Confundir con className = \"\" → Eso borra…",
          "Confundir hasAttribute() con getAttribute() — pregunta: ¿Existe id? Resultado: Mientras: pregunta: ¿Cuál es el valor de id?…",
          "Confundirlo con remove() — Son diferentes: ➡️ elimina el atributo. Mientras: ➡️ elimina el elemento completo del DOM.",
        ],
        "correcta": 1,
      },
    ],
  },
  "dom-classlist-toggle": {
    "id": "dom-classlist-toggle",
    "titulo": "elemento.classList.toggle()",
    "icon": "🔀",
    "categoria": "DOM · Contenido",
    "firma": "elemento.classList.toggle(clase, force)",
    "simulador": "dom",
    "definicion": [
      "`elemento.classList.toggle()` es un **método del DOM** que **alterna una clase CSS** en un elemento:",
      "si **no la tiene, la añade**; si **ya la tiene, la elimina**.",
      "Además, acepta un **segundo argumento opcional** (`force`) para forzar el resultado.",
    ],
    "queEs": [
      "Es el **interruptor** de las clases CSS.",
      "Combina internamente `add()` y `remove()` en una sola operación, y **devuelve un booleano** indicando si la clase quedó presente (`true`) o ausente (`false`) tras la operación.",
      "Es ideal para **estados binarios**: abierto/cerrado, activo/inactivo, visible/oculto.",
    ],
    "paraQueSirve": [
      "🔘 **Alternar estados binarios**: on/off, abierto/cerrado.",
      "🍔 Abrir y cerrar **menús, modales, dropdowns**.",
      "🌗 Cambiar **tema** (dark/light mode).",
      "✅ Marcar/desmarcar **selecciones**.",
      "🔊 Activar/desactivar **sonido**, **modo edición**, etc.",
      "🎛️ Simplificar la lógica: **una línea** en vez de `if + add/remove`.",
      "🔍 Saber el **resultado** de la operación (devuelve booleano).",
    ],
    "comoFunciona": [
      "Accede al `DOMTokenList` del elemento vía `element.classList`.",
      "Recibe el **nombre de la clase** y opcionalmente un `force` (booleano).",
      "**Sin **`force`**:** Si la clase **existe** → la **elimina** → devuelve `false`. Si la clase **no existe** → la **añade** → devuelve `true`.",
      "**Con **`force: true` → siempre **añade** → devuelve `true`.",
      "**Con **`force: false` → siempre **elimina** → devuelve `false`.",
      "Si el string contiene **espacios** → lanza `InvalidCharacterError`.",
      "⚠️ Solo acepta **una clase** a la vez (a diferencia de `add` y `remove`).",
    ],
    "sintaxis": [
      {
        "code": "elemento.classList.toggle(\"clase\")           // alterna\nelemento.classList.toggle(\"clase\", true)     // fuerza añadir\nelemento.classList.toggle(\"clase\", false)    // fuerza quitar",
      },
    ],
    "nota": "si **no la tiene, la añade**; si **ya la tiene, la elimina**.",
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "code": "// ❌ InvalidCharacterError\nel.classList.toggle(\"btn primary\");\n\n// ❌ toggle solo acepta una clase\nel.classList.toggle(\"a\", \"b\"); // \"b\" se interpreta como force (truthy)\n\n// ✅ Correcto\nel.classList.toggle(\"btn\");\nel.classList.toggle(\"primary\");\n\n// ✅ Forzar\nel.classList.toggle(\"activo\", true);",
      },
      {
        "titulo": "🔸 Añadir/quitar varias clases condicionalmente",
        "code": "// toggle no sirve para varias; usa add/remove con force manual\n[\"activo\", \"grande\", \"rojo\"].forEach(c => el.classList.toggle(c, condicion));",
      },
    ],
    "errores": [
      "Pasar varias clases → ❌ `toggle()` solo acepta **una** a la vez | Usar `\"a b\"` con espacio → ❌ Lanza `InvalidCharacterError` | Confundir el retorno → Devuelve si **quedó presente** (`true`) o no (`false`) | Esperar que devuelva el elemento → ❌ Devuelve un **booleano** | No usar `force` cuando hace falta → Puedes forzar con `true`/`false` para evitar condicionales | Usar en `null` → `TypeError` si el `querySelector` no encuentra | Asumir orden de alternancia → El estado depende del **estado actual** del elemento | Olvidar que es **case-sensitive** → `\"Activo\"` ≠ `\"activo\"`",
    ],
    "casos": [
      "🍔 **Menús hamburguesa** (abrir/cerrar).",
      "🌗 **Dark mode / tema** claro-oscuro.",
      "✅ **Selección de items** (lista, carrito).",
      "🔔 Mostrar/ocultar **notificaciones**.",
      "🎛️ Alternar **modo edición** o **vista previa**.",
      "🔊 **Mute/unmute** en reproductores.",
      "🔽 Desplegar **acordeones** y **dropdowns**.",
    ],
    "relacion": [
      "`classList.add()` → Añade siempre",
      "`classList.remove()` → Quita siempre",
      "`classList.toggle()` → **Alterna o fuerza**",
      "`classList.contains()` → Verifica sin modificar",
      "`classList.replace()` → Cambia una clase por otra",
      "`aria-expanded` → Se sincroniza con el estado del toggle",
      "`change` event → Ideal para toggles desde checkboxes",
    ],
    "analogia": "Imagina un **interruptor de luz** 💡 en una habitación: `classList.toggle(\"encendida\")` = aprietas el interruptor. Si estaba **apagada** → se **enciende** (`true`). Si estaba **encendida** → se **apaga** (`false`). `classList.toggle(\"encendida\", true)` = *\"enciéndela sí o sí\"*. `classList.toggle(\"encendida\", false)` = *\"apágala sí o sí\"*. Y cada vez que lo aprietas, el interruptor te dice **cómo quedó** (encendida o apagada). `add()` sería *\"enciéndela siempre\"*; `remove()` sería *\"apágala siempre\"*.",
    "fuente": "📘 MDN – DOMTokenList.toggle() 📗 MDN – Element.classList 📕 WHATWG DOM Standard – classList 📙 MDN – Manipulando clases con classList",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de elemento.classList.toggle()?",
        "opciones": [
          "elemento.getAttribute(nombre)",
          "elemento.setAttribute(nombre, valor)",
          "elemento.classList.toggle(clase, force)",
          "elemento.hasAttribute(nombre)",
        ],
        "correcta": 2,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor elemento.classList.toggle()?",
        "opciones": [
          "Método del DOM que permite crear o modificar un atributo de un elemento HTML.",
          "Método del DOM que permite obtener el valor de un atributo de un elemento HTML.",
          "si no la tiene, la añade; si ya la tiene, la elimina.",
          "hasAttribute() es un método de Element que comprueba si un elemento HTML tiene un atributo específico.",
        ],
        "correcta": 2,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve elemento.classList.toggle()?",
        "opciones": [
          "🔘 Alternar estados binarios: on/off, abierto/cerrado.",
          "Sirve para comprobar la existencia de un atributo antes de realizar alguna acción.",
          "Sirve para modificar dinámicamente los atributos HTML de un elemento mediante JavaScript.",
          "Principalmente para quitar o desactivar atributos HTML dinámicamente.",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a elemento.classList.toggle()?",
        "opciones": [
          "Confundir hasAttribute() con getAttribute() — pregunta: ¿Existe id? Resultado: Mientras: pregunta: ¿Cuál es el valor de id?…",
          "Pasar varias clases → toggle() solo acepta una a la vez | Usar \"a b\" con espacio → Lanza InvalidCharacterError | Confundir el…",
          "1. Confundirlo con getAttribute() ➡️ Establece/modifica un atributo. ➡️ Obtiene el valor de un atributo.",
          "Confundirlo con remove() — Son diferentes: ➡️ elimina el atributo. Mientras: ➡️ elimina el elemento completo del DOM.",
        ],
        "correcta": 1,
      },
    ],
  },
  "dom-classlist-contains": {
    "id": "dom-classlist-contains",
    "titulo": "elemento.classList.contains()",
    "icon": "❓",
    "categoria": "DOM · Contenido",
    "firma": "elemento.classList.contains(clase)",
    "simulador": "dom",
    "definicion": [
      "`elemento.classList.contains()` es un **método del DOM** que **verifica si un elemento tiene una clase CSS específica**, devolviendo `true` o `false`.",
    ],
    "queEs": [
      "Es el **\"detector\"** de clases.",
      "Forma parte del objeto `DOMTokenList` que devuelve `element.classList`, y permite **consultar el estado** de una clase **sin modificarlo**.",
      "Es la forma **moderna y segura** de preguntar *\"¿este elemento tiene tal clase?\"* sin manipular strings.",
    ],
    "paraQueSirve": [
      "🔍 **Verificar** si un elemento tiene una clase antes de actuar.",
      "🎛️ **Condicionar** lógica según el estado visual.",
      "✅ **Evitar** añadir/quitar clases innecesariamente.",
      "🔄 **Sincronizar** el estado del DOM con la lógica de la app.",
      "♿ **Consultar** estados de accesibilidad (ej: `sr-only`).",
      "🧪 **Testing** de estados en pruebas automatizadas.",
    ],
    "comoFunciona": [
      "Accede al `DOMTokenList` del elemento vía `element.classList`.",
      "`contains()` recibe **un string** con el nombre de la clase.",
      "Recorre las clases del elemento buscando coincidencia **exacta**.",
      "Devuelve: `true` → si la clase **está presente**. `false` → si **no está**.",
      "Si el string contiene **espacios** → lanza `InvalidCharacterError`.",
      "⚠️ Es **case-sensitive**: `\"Activo\"` ≠ `\"activo\"`.",
    ],
    "sintaxis": [
      {
        "code": "elemento.classList.contains(\"clase\")  // true | false",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "code": "// ❌ InvalidCharacterError\nel.classList.contains(\"btn primary\");\n\n// ❌ Solo una clase a la vez\nel.classList.contains(\"a\", \"b\"); // \"b\" es ignorado\n\n// ✅ Correcto\nel.classList.contains(\"btn\");\nel.classList.contains(\"primary\");\n\n// ❌ case-sensitive\nel.classList.contains(\"Activo\"); // false aunque exista \"activo\"\n\n// ❌ className.includes() es engañoso\nel.className.includes(\"act\"); // true aunque solo exista \"activo\"\nel.classList.contains(\"act\"); // false ✅ más preciso",
      },
      {
        "titulo": "🔸 Verificar varias clases",
        "code": "const clases = [\"activo\", \"grande\", \"rojo\"];\n\n// ✅ Todas presentes\nconst todas = clases.every(c => el.classList.contains(c));\n\n// ✅ Al menos una presente\nconst alguna = clases.some(c => el.classList.contains(c));\n\n// ✅ Ninguna presente\nconst ninguna = clases.every(c => !el.classList.contains(c));",
      },
    ],
    "errores": [
      "Pasar varias clases → ❌ Solo acepta **una** clase a la vez | Usar `\"a b\"` con espacio → ❌ Lanza `InvalidCharacterError` | Confundir con `classList.value` → Ese devuelve el string completo | Esperar que devuelva el elemento → ❌ Devuelve un **booleano** | Usar en `null` → `TypeError` si el `querySelector` no encuentra | Asumir **case-insensitive** → ❌ Es **case-sensitive** | Comparar con `className.includes()` → Menos preciso: `\"act\"` matchea `\"activo\"` | Olvidar que `classList` es **live** → El resultado refleja el estado actual",
    ],
    "casos": [
      "🎛️ **Condicionar lógica** según el estado visual.",
      "🍔 Verificar si un **menú** está abierto antes de cerrarlo.",
      "✅ **Prevenir duplicados** antes de añadir una clase.",
      "🌗 Detectar el **tema actual** (dark/light).",
      "🎯 **Delegación de eventos** en listas.",
      "🔔 Saber si una **notificación** ya se mostró.",
      "♿ Verificar clases de **accesibilidad** (`sr-only`, `hidden`).",
    ],
    "relacion": [
      "`classList.add()` → Añade; puede combinarse con `contains`",
      "`classList.remove()` → Quita; puede combinarse con `contains`",
      "`classList.toggle()` → Alterna; `contains` verifica el estado",
      "`classList.replace()` → Cambia; `contains` verifica antes/después",
      "`className` → String completo; menos preciso que `contains`",
      "`matches()` → Verifica selectores CSS completos (`.activo`, `#id`)",
      "`DOMTokenList` → Tipo del objeto `classList`",
    ],
    "analogia": "Imagina que un elemento HTML es una **mochila** 🎒 con **pegatinas** (clases). `classList.contains(\"activo\")` = **mirar** si tiene la pegatina \"activo\". Si la ves → `true` ✅ Si no → `false` ❌ **No** la pegas ni la despegas, solo **preguntas**. Es como preguntar: *\"¿llevas la pegatina 'activo'?\"* Y te responde **sí o no**, sin cambiar nada. `add()` sería pegarla; `remove()` despegarla; `toggle()` alternarla; `contains()` es solo **observar**.",
    "fuente": "📘 MDN – DOMTokenList.contains() 📗 MDN – Element.classList 📕 WHATWG DOM Standard – classList 📙 MDN – Manipulando clases con classList",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de elemento.classList.contains()?",
        "opciones": [
          "elemento.classList.contains(clase)",
          "elemento.setAttribute(nombre, valor)",
          "elemento.hasAttribute(nombre)",
          "elemento.getAttribute(nombre)",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor elemento.classList.contains()?",
        "opciones": [
          "Método del DOM que permite crear o modificar un atributo de un elemento HTML.",
          "elemento.classList.contains() es un método del DOM que verifica si un elemento tiene una clase CSS específica, devolviendo true o false.",
          "hasAttribute() es un método de Element que comprueba si un elemento HTML tiene un atributo específico.",
          "Método del DOM que permite obtener el valor de un atributo de un elemento HTML.",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve elemento.classList.contains()?",
        "opciones": [
          "🔍 Verificar si un elemento tiene una clase antes de actuar.",
          "Sirve para comprobar la existencia de un atributo antes de realizar alguna acción.",
          "Principalmente para quitar o desactivar atributos HTML dinámicamente.",
          "Sirve para modificar dinámicamente los atributos HTML de un elemento mediante JavaScript.",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a elemento.classList.contains()?",
        "opciones": [
          "Confundir hasAttribute() con getAttribute() — pregunta: ¿Existe id? Resultado: Mientras: pregunta: ¿Cuál es el valor de id?…",
          "Pasar varias clases → Solo acepta una clase a la vez | Usar \"a b\" con espacio → Lanza InvalidCharacterError | Confundir con…",
          "Confundirlo con remove() — Son diferentes: ➡️ elimina el atributo. Mientras: ➡️ elimina el elemento completo del DOM.",
          "1. Confundirlo con getAttribute() ➡️ Establece/modifica un atributo. ➡️ Obtiene el valor de un atributo.",
        ],
        "correcta": 1,
      },
    ],
  },
  "dom-innerhtml": {
    "id": "dom-innerhtml",
    "titulo": "innerHTML",
    "icon": "🧩",
    "categoria": "DOM · Contenido",
    "firma": "elemento.innerHTML",
    "simulador": "dom",
    "definicion": [
      "Es una propiedad del DOM que permite obtener o establecer el **contenido HTML** de un elemento, incluyendo todas las etiquetas, atributos y texto que contiene.",
      "Permite leer y modificar la estructura interna de un elemento mediante código HTML.",
    ],
    "queEs": [
      "`innerHTML` es una propiedad de los elementos del DOM que representa el marcado HTML dentro de un elemento.",
      "Cuando se **lee**, devuelve el HTML interno como string.",
      "Cuando se **asigna**, reemplaza todo el contenido del elemento con el nuevo HTML proporcionado.",
      "Es una de las formas más potentes y versátiles de manipular el DOM dinámicamente.",
    ],
    "paraQueSirve": [
      "**Leer contenido**: Obtener el HTML completo de un elemento y sus descendientes.",
      "**Modificar contenido**: Reemplazar o actualizar el HTML de un elemento.",
      "**Crear elementos dinámicamente**: Generar estructuras HTML complejas desde JavaScript.",
      "**Actualizar interfaces**: Refrescar partes de la página sin recargar.",
      "**Templates**: Insertar HTML generado desde plantillas o datos.",
    ],
    "comoFunciona": [
      "Cuando se **lee** `innerHTML`, el navegador serializa el contenido interno del elemento a una string HTML.",
      "Cuando se **asigna** `innerHTML`, el navegador: Elimina **todos** los hijos actuales del elemento. Parsea el nuevo HTML. Construye nuevos nodos DOM a partir del HTML. Los inserta como hijos del elemento.",
      "**Características importantes**:",
      "Interpreta y renderiza etiquetas HTML.",
      "Puede crear elementos complejos desde strings.",
      "Es **destructivo**: reemplaza todo el contenido existente.",
      "Puede tener problemas de rendimiento con contenido grande.",
      "**Riesgo de XSS** si se inserta HTML no sanitizado.",
    ],
    "sintaxis": [
      {
        "code": "// Obtener HTML interno\nlet html = elemento.innerHTML;\n\n// Establecer HTML interno\nelemento.innerHTML = \"Nuevo contenido\";\n\n// Añadir contenido (sin sobrescribir)\nelemento.innerHTML += \"Más contenido\";",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Básico - Leer HTML",
        "code": "Título principal\n    Párrafo de ejemplo\n\nconst div = document.getElementById('ejemplo');\nconsole.log(div.innerHTML);\n// Salida: 'Título principal\\n    Párrafo de ejemplo'",
      },
      {
        "titulo": "Establecer HTML",
        "code": "Texto viejo\n\nconst contenedor = document.getElementById('contenedor');\ncontenedor.innerHTML = 'Nuevo títuloNuevo contenido';\n// Resultado: Nuevo títuloNuevo contenido",
      },
      {
        "titulo": "Crear elementos dinámicamente",
        "code": "const lista = document.getElementById('lista');\nconst items = ['Manzana', 'Banana', 'Naranja'];\n\n// Crear lista desde array\nlista.innerHTML = items.map(item => `${item}`).join('');\n// Resultado: ManzanaBananaNaranja",
      },
      {
        "titulo": "Generar tablas dinámicas",
        "code": "function crearTabla(datos) {\n    const contenedor = document.getElementById('tabla-contenedor');\n\n    let html = '';\n    // Cabeceras\n    if (datos.length > 0) {\n        Object.keys(datos[0]).forEach(key => {\n            html += `${key}`;\n        });\n    }\n    html += '';\n\n    // Filas\n    datos.forEach(row => {\n        html += '';\n        Object.values(row).forEach(valor => {\n            html += `${valor}`;\n        });\n        html += '';\n    });\n\n    html += '';\n    contenedor.innerHTML = html;\n}\n\n// Uso\nconst usuarios = [\n    { nombre: 'Juan', edad: 25, ciudad: 'Madrid' },\n    { nombre: 'Ana', edad: 30, ciudad: 'Barcelona' }\n];\ncrearTabla(usuarios);",
      },
      {
        "titulo": "Añadir contenido sin sobrescribir",
        "code": "const contenedor = document.getElementById('mensajes');\n\n// Añadir mensajes uno tras otro\nfunction agregarMensaje(texto, tipo = 'info') {\n    contenedor.innerHTML += `\n\n            ${new Date().toLocaleTimeString()}\n            ${texto}\n\n    `;\n}",
      },
      {
        "titulo": "Limpiar contenido",
        "code": "// Eliminar todo el contenido interno\nconst contenedor = document.getElementById('contenedor');\ncontenedor.innerHTML = '';",
      },
      {
        "titulo": "HTML con atributos dinámicos",
        "code": "function crearTarjeta(usuario) {\n    const contenedor = document.getElementById('tarjetas');\n\n    contenedor.innerHTML += `\n\n\n            ${usuario.nombre}\n            ${usuario.email}\n            Eliminar\n\n    `;\n}",
      },
    ],
    "errores": [
      {
        "texto": "**1. Riesgo de XSS (Cross-Site Scripting)**",
        "code": "// ❌ PELIGROSO - Datos de usuario no sanitizados\nconst nombre = \"\";\ncontenedor.innerHTML = `Hola${nombre}`;\n\n// ✅ SEGURO - Usar textContent para texto\ncontenedor.textContent = `Hola${nombre}`;\n\n// ✅ SEGURO - Sanitizar HTML\nfunction sanitizar(html) {\n    const temp = document.createElement('div');\n    temp.textContent = html;\n    return temp.innerHTML;\n}\ncontenedor.innerHTML = `Hola${sanitizar(nombre)}`;\n\n// ✅ SEGURO - Usar createElement\nconst h1 = document.createElement('h1');\nh1.textContent = `Hola${nombre}`;\ncontenedor.appendChild(h1);",
      },
      {
        "texto": "**2. Pérdida de event listeners**",
        "code": "const boton = document.getElementById('miBoton');\nboton.addEventListener('click', () => alert('Clic'));\n\n// ❌ Esto elimina el event listener\ndocument.getElementById('contenedor').innerHTML = 'Nuevo botón';\n// El nuevo botón NO tiene el event listener\n\n// ✅ Re-asignar eventos después de modificar\nconst contenedor = document.getElementById('contenedor');\ncontenedor.innerHTML = 'Nuevo botón';\ndocument.getElementById('nuevoBoton').addEventListener('click', () => alert('Clic'));",
      },
      {
        "texto": "**3. Sobrescritura de contenido**",
        "code": "const contenedor = document.getElementById('contenedor');\ncontenedor.innerHTML = 'Primer párrafo';\n// 👆 esto reemplaza TODO\n\n// ✅ Para añadir sin sobrescribir\ncontenedor.innerHTML += 'Segundo párrafo';\n// O mejor, usar appendChild\nconst p = document.createElement('p');\np.textContent = 'Segundo párrafo';\ncontenedor.appendChild(p);",
      },
      {
        "texto": "**4. Problemas con caracteres especiales**",
        "code": "// ❌ Problemas con comillas\ncontenedor.innerHTML = ``;\n\n// ✅ Escapar comillas\ncontenedor.innerHTML = ``;\n\n// ✅ Usar template literals con cuidado\nconst valor = 'texto con \"comillas\"';\ncontenedor.innerHTML = ``;",
      },
      {
        "texto": "**5. Scripts en innerHTML**",
        "code": "// ⚠️ Los scripts NO se ejecutan al insertarlos con innerHTML\ncontenedor.innerHTML = 'alert(\"No se ejecuta\")';\n\n// ✅ Para ejecutar scripts, usar createElement\nconst script = document.createElement('script');\nscript.textContent = 'alert(\"Se ejecuta\")';\ndocument.body.appendChild(script);",
      },
    ],
    "casos": [
      "**Listas dinámicas** → `lista.innerHTML = items.map(item =>`<li>${item}</li>`).join('')`",
      "**Tablas de datos** → Generar tablas desde arrays/objetos",
      "**Tarjetas de productos** → Crear cards desde datos de API",
      "**Mensajes en chat** → Añadir mensajes con formato",
      "**Templates de email** → Generar HTML para correos",
      "**Renderizado condicional** → Mostrar/ocultar partes de la UI",
      "**Sliders/Carrousels** → Generar slides dinámicamente",
    ],
    "relacion": [
      "`textContent` → Solo texto, no interpreta HTML, más rápido, seguro.",
      "`innerText` → Solo texto visible, respeta CSS, más lento.",
      "`outerHTML` → Incluye el elemento mismo, no solo su contenido.",
      "`insertAdjacentHTML()` → Inserta HTML sin sobrescribir, más eficiente.",
      "`createElement()`** + **`appendChild()` → Más control, mejor rendimiento, seguro.",
      "`append()`** / **`prepend()` → Métodos modernos para añadir contenido.",
      "**Comparativa de rendimiento y seguridad**",
    ],
    "analogia": "`innerHTML` es como **reemplazar completamente el interior de una caja**. Si tienes una caja con varios objetos, `innerHTML` te permite: **Leer**: Ver una lista de todo lo que hay dentro. **Escribir**: Vaciar la caja y poner exactamente lo que tú quieras. Es como una máquina de teletransporte para el DOM: puedes describir lo que quieres en un lenguaje de marcado (HTML) y el navegador lo materializa dentro del elemento.",
    "fuente": "MDN Web Docs - innerHTML W3Schools - innerHTML OWASP - XSS Prevention Especificación DOM Living Standard - WHATWG",
    "notasPersonales": [
      "**Rendimiento**: `innerHTML` es rápido para crear contenido desde strings. Para grandes volúmenes de datos, es más eficiente que múltiples `appendChild()`. Sin embargo, forzar el reflow del DOM puede ser costoso.",
      "**Seguridad (IMPORTANTE)**:",
      "Código: // ❌ NUNCA hagas esto con datos de usuario",
      "**Buenas prácticas**:",
      "Código: // ✅ Usar innerHTML para contenido generado desde el servidor",
      "**Alternativas modernas**:",
      "Código: // En lugar de innerHTML +=",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de innerHTML?",
        "opciones": [
          "elemento.getAttribute(nombre)",
          "elemento.innerHTML",
          "elemento.hasAttribute(nombre)",
          "elemento.setAttribute(nombre, valor)",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor innerHTML?",
        "opciones": [
          "Es una propiedad del DOM que permite obtener o establecer el contenido HTML de un elemento, incluyendo todas las etiquetas, atributos y…",
          "Método del DOM que permite obtener el valor de un atributo de un elemento HTML.",
          "hasAttribute() es un método de Element que comprueba si un elemento HTML tiene un atributo específico.",
          "Método del DOM que permite crear o modificar un atributo de un elemento HTML.",
        ],
        "correcta": 0,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve innerHTML?",
        "opciones": [
          "Sirve para modificar dinámicamente los atributos HTML de un elemento mediante JavaScript.",
          "Principalmente para quitar o desactivar atributos HTML dinámicamente.",
          "Leer contenido: Obtener el HTML completo de un elemento y sus descendientes.",
          "Sirve para comprobar la existencia de un atributo antes de realizar alguna acción.",
        ],
        "correcta": 2,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a innerHTML?",
        "opciones": [
          "Confundirlo con remove() — Son diferentes: ➡️ elimina el atributo. Mientras: ➡️ elimina el elemento completo del DOM.",
          "1. Confundirlo con getAttribute() ➡️ Establece/modifica un atributo. ➡️ Obtiene el valor de un atributo.",
          "1. Riesgo de XSS (Cross-Site Scripting)",
          "Confundir hasAttribute() con getAttribute() — pregunta: ¿Existe id? Resultado: Mientras: pregunta: ¿Cuál es el valor de id?…",
        ],
        "correcta": 2,
      },
    ],
  },
  "dom-innertext": {
    "id": "dom-innertext",
    "titulo": "innerText",
    "icon": "📝",
    "categoria": "DOM · Contenido",
    "firma": "elemento.innerText",
    "simulador": "dom",
    "definicion": [
      "Es una **propiedad del DOM** que **lee o escribe el texto \"visible\"** de un elemento, respetando el **renderizado real** del navegador (CSS incluido).",
    ],
    "queEs": [
      "Es la propiedad que devuelve el texto **tal como lo ve el usuario en pantalla**, teniendo en cuenta:",
      "El **CSS aplicado** (elementos `display: none`, `visibility: hidden`...).",
      "Los **saltos de línea** visuales (`<br>`, bloques).",
      "El **espacio en blanco** colapsado según el estilo.",
      "El **texto transformado** por CSS (`text-transform: uppercase`).",
      "A diferencia de `textContent`, que es **puro texto del DOM**, `innerText` depende del **layout** y por eso es **más lento** (fuerza un *reflow*).",
    ],
    "paraQueSirve": [
      "📖 **Leer el texto visible** de un elemento (como lo ve el usuario).",
      "✏️ **Escribir texto** dentro de un elemento (elimina hijos previos).",
      "🎨 Respetar el **formato visual** (saltos de línea, mayúsculas CSS).",
      "🧹 **Limpiar** el contenido de un elemento y poner texto plano.",
      "📋 **Copiar** el texto renderizado de una sección.",
      "🔍 **Buscar** texto dentro de un contenedor.",
      "🧪 **Testing** de contenido visible.",
    ],
    "comoFunciona": [
      "Al **leer**: El navegador calcula el **layout** del elemento. Extrae el texto **visible**, ignorando lo oculto por CSS. Respeta saltos de línea de bloques y `<br>`. Aplica `text-transform` si existe. ⚠️ **Fuerza un reflow** → costoso en rendimiento.",
      "Al **escribir**: **Elimina todos los hijos** del elemento. Crea un **nodo de texto** con el nuevo contenido. ⚠️ **No interpreta HTML** (se muestra literal). Aplica **reflow** al actualizar.",
    ],
    "sintaxis": [
      {
        "code": "// Leer\nconst texto = element.innerText;\n\n// Escribir\nelement.innerText = \"Nuevo texto\";",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Ejemplo 1",
        "code": "// ❌ Esperar HTML\ndiv.innerText = \"Hola\"; // se ve literal\n\n// ✅ Usar innerHTML si quieres HTML\ndiv.innerHTML = \"Hola\";\n\n// ❌ Leer todo cuando hay elementos ocultos\nconsole.log(div.innerText); // no incluye display:none\n\n// ✅ Usar textContent\nconsole.log(div.textContent);\n\n// ❌ Usar en bucles grandes\nfor (let i = 0; i < 1000; i++) {\n  el.innerText; // ⚠️ 1000 reflows\n}\n\n// ✅ Cachear o usar textContent\nconst cache = el.textContent;",
      },
      {
        "titulo": "🔸 Elemento null",
        "code": "// ❌ TypeError si no existe\ndocument.querySelector(\".no-existe\").innerText = \"x\";\n\n// ✅ Verificar\nconst el = document.querySelector(\".no-existe\");\nif (el) el.innerText = \"x\";",
      },
      {
        "titulo": "🔸 Seguridad: XSS",
        "code": "// ❌ PELIGROSO: ejecuta HTML y scripts\ndiv.innerHTML = inputUsuario; // ¡XSS!\n\n// ✅ SEGURO: texto plano\ndiv.innerText = inputUsuario; // no interpreta HTML\n\n// ✅ TAMBIÉN SEGURO: textContent\ndiv.textContent = inputUsuario;",
      },
      {
        "titulo": "🔸 Rendimiento",
        "code": "// ❌ Lento: fuerza reflow por cada lectura\nfor (let i = 0; i < 1000; i++) {\n  const t = el.innerText;\n}\n\n// ✅ Rápido: una sola lectura\nconst t = el.innerText;\n\n// ✅ Aún más rápido si no necesitas el renderizado\nconst t = el.textContent;",
      },
    ],
    "errores": [
      "Esperar que interprete HTML → ❌ `innerText` no parsea HTML | Confundir con `innerHTML` → Aquel interpreta HTML; este no | Usar `innerText` para leer todo → ⚠️ Ignora lo oculto por CSS | Usar `innerText` en bucles grandes → ⚠️ Fuerza reflows → lento | Usar en elementos `null` → `TypeError` | Asumir que devuelve el texto \"original\" → ⚠️ Devuelve el **visible** | Usarlo para **leer** sin necesidad → ⚠️ `textContent` es más rápido | Confiar en formato exacto entre navegadores → ⚠️ Puede variar ligeramente | Usar `innerText` para inyectar datos confiables → ✅ Bien para **evitar XSS** | Esperar `undefined` si no hay texto → Devuelve `\"\"` (string vacío)",
    ],
    "casos": [
      "📝 **Mostrar texto** del usuario de forma segura.",
      "🧹 **Limpiar** un contenedor y poner texto plano.",
      "📋 **Copiar** texto renderizado (como lo ve el usuario).",
      "🔍 **Buscar** texto visible dentro de un contenedor.",
      "🧪 **Testing**: verificar contenido visible.",
      "📊 **Contar** caracteres visibles.",
      "🎨 Leer texto **transformado por CSS** (`text-transform`).",
    ],
    "relacion": [
      "`textContent` → Alternativa más rápida (no reflow)",
      "`innerHTML` → Interpreta HTML (⚠️ XSS)",
      "`outerHTML` → HTML del elemento + sí mismo",
      "`nodeValue` → Para nodos de texto",
      "`createTextNode()` → Crear nodos de texto",
      "`append()` / `appendChild()` → Añadir contenido sin sobrescribir",
      "`insertAdjacentText()` → Insertar texto en posiciones",
    ],
    "analogia": "Imagina que un elemento HTML es una **caja de cristal** 🔲 con cosas dentro. `innerText` = **fotografías lo que se ve** desde fuera, ignorando lo que está **tapado** (elementos con `display: none`) y aplicando lo que el **cristal coloreado** (CSS) hace ver. `textContent` = **abres la caja** y sacas **todo el texto**, incluso lo que no se ve. `innerHTML` = **fotografías también las etiquetas** y estructuras, no solo el texto. ⚠️ `innerText` **tiene que mirar cómo se ve** → más lento. `textContent` **no mira** → más rápido. Y si **escribes** con `innerText` → pones texto literal (no interpreta HTML). Con `innerHTML` → el navegador **parsea** el HTML (puede ser peligroso).",
    "fuente": "📘 MDN – HTMLElement.innerText 📗 MDN – Node.textContent 📕 HTML Standard – innerText 📙 MDN – Manipulating documents",
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de innerText?",
        "opciones": [
          "elemento.getAttribute(nombre)",
          "elemento.hasAttribute(nombre)",
          "elemento.setAttribute(nombre, valor)",
          "elemento.innerText",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor innerText?",
        "opciones": [
          "Método del DOM que permite crear o modificar un atributo de un elemento HTML.",
          "Método del DOM que permite obtener el valor de un atributo de un elemento HTML.",
          "hasAttribute() es un método de Element que comprueba si un elemento HTML tiene un atributo específico.",
          "Es una propiedad del DOM que lee o escribe el texto \"visible\" de un elemento, respetando el renderizado real del navegador (CSS incluido).",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve innerText?",
        "opciones": [
          "Sirve para comprobar la existencia de un atributo antes de realizar alguna acción.",
          "Sirve para modificar dinámicamente los atributos HTML de un elemento mediante JavaScript.",
          "Principalmente para quitar o desactivar atributos HTML dinámicamente.",
          "📖 Leer el texto visible de un elemento (como lo ve el usuario).",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a innerText?",
        "opciones": [
          "1. Confundirlo con getAttribute() ➡️ Establece/modifica un atributo. ➡️ Obtiene el valor de un atributo.",
          "Confundir hasAttribute() con getAttribute() — pregunta: ¿Existe id? Resultado: Mientras: pregunta: ¿Cuál es el valor de id?…",
          "Confundirlo con remove() — Son diferentes: ➡️ elimina el atributo. Mientras: ➡️ elimina el elemento completo del DOM.",
          "Esperar que interprete HTML → innerText no parsea HTML | Confundir con innerHTML → Aquel interpreta HTML; este no | Usar…",
        ],
        "correcta": 3,
      },
    ],
  },
  "dom-textcontent": {
    "id": "dom-textcontent",
    "titulo": "textContent",
    "icon": "📄",
    "categoria": "DOM · Contenido",
    "firma": "elemento.textContent",
    "simulador": "dom",
    "definicion": [
      "Es una propiedad del DOM que permite obtener o establecer el **contenido de texto** de un elemento y todos sus descendientes, ignorando completamente las etiquetas HTML.",
    ],
    "queEs": [
      "`textContent` es una propiedad de los nodos del DOM que representa el texto contenido en un elemento y en todos sus elementos hijos.",
      "A diferencia de `innerHTML`, no interpreta las etiquetas HTML como código, sino que las trata como texto plano.",
      "Es la forma más segura y rápida de leer o modificar texto en el DOM.",
    ],
    "paraQueSirve": [
      "**Obtener texto**: Extraer todo el texto visible y oculto de un elemento y sus hijos.",
      "**Establecer texto**: Asignar nuevo texto a un elemento (elimina todo el contenido previo).",
      "**Seguridad**: Prevenir ataques XSS al insertar texto (no interpreta HTML).",
      "**Rendimiento**: Es más rápido que `innerHTML` porque no procesa HTML.",
      "**Acceso a texto oculto**: Lee texto de elementos con `display: none` o `visibility: hidden`.",
    ],
    "comoFunciona": [
      "Cuando se **lee** `textContent`, el navegador recorre todos los nodos de texto dentro del elemento y sus descendientes.",
      "Concatena todo el texto en un solo string, manteniendo el orden de aparición.",
      "Cuando se **asigna** `textContent`, el navegador elimina todos los hijos del elemento y crea un nuevo nodo de texto con el valor asignado.",
      "**Características importantes**:",
      "Devuelve **todo el texto**, incluyendo texto en elementos ocultos.",
      "No interpreta etiquetas HTML (las muestra como texto literal).",
      "Incluye espacios y saltos de línea del HTML original.",
      "Es más rápido que `innerHTML` porque no parsea HTML.",
    ],
    "sintaxis": [
      {
        "code": "// Obtener texto\nlet texto = elemento.textContent;\n\n// Establecer texto\nelemento.textContent = \"Nuevo texto\";\n\n// Concatenar\nelemento.textContent += \" texto adicional\";",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Básico - Obtener texto",
        "code": "Título principal\n    Párrafo de ejemplo\n\nconst div = document.getElementById('ejemplo');\nconsole.log(div.textContent);\n// Salida: \"Título principal Párrafo de ejemplo\"\n// (incluye el texto de todos los hijos, sin etiquetas)",
      },
      {
        "titulo": "Establecer texto",
        "code": "Texto antiguo\n\nconst mensaje = document.getElementById('mensaje');\nmensaje.textContent = 'Nuevo texto';\n// Resultado: Nuevo texto",
      },
      {
        "titulo": "Diferencia con innerHTML",
        "code": "const elemento = document.getElementById('contenedor');\n\n// textContent: trata HTML como texto literal\nelemento.textContent = 'Hola';\n// Resultado: &lt;strong&gt;Hola&lt;/strong&gt;\n// Muestra: \"Hola\" como texto\n\n// innerHTML: interpreta HTML\nelemento.innerHTML = 'Hola';\n// Resultado: Hola\n// Muestra: \"Hola\" en negrita",
      },
      {
        "titulo": "Leer texto de elementos ocultos",
        "code": "Texto invisible\n\nconst oculto = document.getElementById('oculto');\nconsole.log(oculto.textContent); // \"Texto invisible\"\n// innerText no lo mostraría, pero textContent sí",
      },
      {
        "titulo": "Texto de inputs y otros elementos",
        "code": "Haz clic\n\n// textContent en input no funciona como esperas\nconst input = document.getElementById('input');\nconsole.log(input.textContent); // \"\" (vacío)\nconsole.log(input.value); // \"Valor del input\" ✅ Usa value para inputs\n\n// Para botones funciona bien\nconst boton = document.getElementById('boton');\nconsole.log(boton.textContent); // \"Haz clic\"\nboton.textContent = 'Nuevo texto';",
      },
      {
        "titulo": "Limpiar el contenido de un elemento",
        "code": "// Eliminar todo el contenido de un elemento\nconst contenedor = document.getElementById('contenedor');\ncontenedor.textContent = ''; // Borra todos los hijos",
      },
      {
        "titulo": "Concatenar texto",
        "code": "const contador = document.getElementById('contador');\nlet clicks = 0;\n\nfunction incrementar() {\n    clicks++;\n    contador.textContent = `Clics:${clicks}`;\n}",
      },
    ],
    "errores": [
      {
        "texto": "**Usar textContent en inputs**:",
        "code": "// ❌ INCORRECTO\nconst input = document.getElementById('miInput');\nconsole.log(input.textContent); // \"\"\ninput.textContent = 'Nuevo valor'; // No funciona\n\n// ✅ CORRECTO\nconsole.log(input.value); // Obtener valor\ninput.value = 'Nuevo valor'; // Establecer valor",
      },
      {
        "texto": "**Confundir con innerText**:",
        "code": "// textContent incluye texto oculto y todos los espacios\nconst div = document.getElementById('ejemplo');\ndiv.textContent; // Incluye texto de elementos ocultos\n\n// innerText respeta CSS (no incluye ocultos) y es más lento\ndiv.innerText; // Solo texto visible",
      },
      {
        "texto": "**Pérdida de elementos hijos**:",
        "code": "// ⚠️ ¡Cuidado! Esto elimina todos los elementos hijos\nconst contenedor = document.getElementById('contenedor');\ncontenedor.textContent = 'Nuevo texto';\n// Todos los hijos (imágenes, enlaces, etc.) se pierden",
      },
      {
        "texto": "**Creer que textContent interpreta HTML**:",
        "code": "// ❌ Esto NO crea un enlace\nelemento.textContent = 'Enlace';\n// Muestra: \"Enlace\" como texto literal\n\n// ✅ Usar innerHTML para HTML\nelemento.innerHTML = 'Enlace';",
      },
      {
        "texto": "**Espacios y saltos de línea en HTML**:",
        "code": "Texto con\n    saltos de\n    línea\n\nconst div = document.getElementById('espacios');\nconsole.log(div.textContent);\n// Salida: \"\\n       Texto con\\n       saltos de\\n       línea\\n   \"\n// Incluye espacios y saltos de línea",
      },
    ],
    "casos": [
      "**Mostrar datos dinámicos** → `elemento.textContent = usuario.nombre;`",
      "**Contadores** → `contador.textContent = visitas;`",
      "**Mensajes de error** → `error.textContent = 'Campo obligatorio';`",
      "**Templates seguros** → Prevenir XSS al mostrar texto de usuarios",
      "**Comparar contenido** → `if (elemento.textContent === 'Esperado')`",
      "**Buscar en texto** → `if (elemento.textContent.includes('palabra'))`",
      "**Extraer texto de artículos** → Obtener todo el texto de un artículo",
    ],
    "relacion": [
      "`textContent` → Todo el texto (visible + oculto), más rápido, no parsea HTML.",
      "`innerText` → Solo texto visible (respeta CSS), más lento, considera estilos.",
      "`innerHTML` → Incluye HTML, interpreta etiquetas, riesgo de XSS, más lento.",
      "`outerHTML` → Incluye el elemento mismo y su HTML, no solo el contenido.",
      "`nodeValue` → Solo para nodos de texto, no para elementos.",
      "`value` → Para inputs, selects, textareas (no usa textContent).",
      "**Comparativa visual**",
    ],
    "analogia": "`textContent` es como **copiar y pegar el texto de un documento de Word sin formato**. Obtienes todo el texto que hay, incluyendo notas al pie o texto oculto, pero pierdes todas las negritas, itálicas, colores y formato. Es rápido y te da exactamente lo que hay escrito, sin interpretaciones.",
    "fuente": "MDN Web Docs - textContent W3Schools - textContent MDN - innerText vs textContent Especificación DOM Living Standard - WHATWG",
    "notasPersonales": [
      "**Rendimiento**: `textContent` es más rápido que `innerHTML` porque no parsea HTML. Es más rápido que `innerText` porque no calcula estilos CSS. Para lecturas/escrituras frecuentes de texto, siempre usar `textContent`.",
      "**Seguridad**: `textContent` es **seguro contra XSS**: no interpreta HTML. Siempre usar `textContent` al insertar texto de usuarios en lugar de `innerHTML`.",
      "**Buenas prácticas**:",
      "Código: // ✅ Para texto plano",
      "**Consideraciones especiales**: `textContent` en `script` tags: devuelve el código dentro del script. `textContent` en `style` tags: devuelve el CSS como texto. `textContent` en nodos de texto: usa `nodeValue` en su lugar.",
      "**Trucos útiles**:",
      "Código: // ✅ Verificar si un elemento tiene texto",
    ],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de textContent?",
        "opciones": [
          "elemento.getAttribute(nombre)",
          "elemento.hasAttribute(nombre)",
          "elemento.setAttribute(nombre, valor)",
          "elemento.textContent",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor textContent?",
        "opciones": [
          "Método del DOM que permite crear o modificar un atributo de un elemento HTML.",
          "Método del DOM que permite obtener el valor de un atributo de un elemento HTML.",
          "hasAttribute() es un método de Element que comprueba si un elemento HTML tiene un atributo específico.",
          "Es una propiedad del DOM que permite obtener o establecer el contenido de texto de un elemento y todos sus descendientes, ignorando…",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve textContent?",
        "opciones": [
          "Sirve para modificar dinámicamente los atributos HTML de un elemento mediante JavaScript.",
          "Sirve para comprobar la existencia de un atributo antes de realizar alguna acción.",
          "Principalmente para quitar o desactivar atributos HTML dinámicamente.",
          "Obtener texto: Extraer todo el texto visible y oculto de un elemento y sus hijos.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿En qué caso de uso encaja textContent?",
        "opciones": [
          "Modificar enlaces dinámicamente.",
          "Cambiar temas → body.className = 'tema-oscuro';",
          "Menús desplegables → menu.classList.toggle('abierto')",
          "Mostrar datos dinámicos → elemento.textContent = usuario.nombre;",
        ],
        "correcta": 3,
      },
    ],
  },
};
