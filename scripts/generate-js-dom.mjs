/**
 * Genera los apuntes propios de los métodos JS del DOM:
 *   · document.getElementsByName()
 *   · document.write() / document.writeln()
 *   · parentNode / nextSibling / previousSibling
 *   · Propiedad style / Propiedad value / clientWidth
 *
 * Sigue la plantilla de 12 secciones:
 *   📝 Definición · 🧠 ¿Qué es? · 🎯 ¿Para qué sirve? · ⚙️ ¿Cómo funciona?
 *   📝 Sintaxis / Estructura · 💡 Ejemplos · ⚠️ Errores comunes
 *   💼 Casos de uso · 🧩 Relación con otros conceptos · 🧠 Analogía
 *   🚀 Quiz · 📚 Fuente
 *
 * Escribe `src/data/jsDomMetodos.js`.
 * Luego fusiónalo en tu agregador JS de la app.
 *
 * Uso:  node scripts/generate-js-dom.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildQuiz } from "./generate-apuntes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "src", "data");

const CURSO = {
  id: "js-dom",
  label: "DOM y APIs del documento",
  export: "JS_DOM_METODOS",
  archivo: "jsDomMetodos",
  simulador: "dom",
  icon: "🌐",
};

const GRUPO = {
  seccion: "Selección, escritura y navegación del DOM",
  conceptos: [
    "js-getelementsbyname",
    "js-document-write",
    "js-document-writeln",
    "js-parentnode",
    "js-nextsibling",
    "js-previoussibling",
    "js-propiedad-style",
    "js-propiedad-value",
    "js-clientwidth",
  ],
};

/* ------------------------------------------------------------------ */
/* 1. Contenido curado de cada método                                  */
/* ------------------------------------------------------------------ */

const CONCEPTOS = [
  /* ---------------- document.getElementsByName() ---------------- */
  {
    id: "js-getelementsbyname",
    titulo: "document.getElementsByName()",
    icon: "📋",
    firma: "document.getElementsByName(name)",
    simuladorTipo: "getelementsbyname",
    definicion: [
      "**document.getElementsByName()** devuelve una colección **viva** (`NodeList`) con todos los elementos del documento cuyo atributo `name` coincide exactamente con el valor indicado.",
    ],
    queEs: [
      "Es un método del objeto `document` que busca por el atributo `name` (no por `id` ni por clase).",
      "Devuelve una `NodeList` **viva**: se actualiza automáticamente si el DOM cambia.",
    ],
    paraQueSirve: [
      "🎯 Recuperar grupos de controles de formulario que comparten nombre (radios, checkboxes).",
      "🎯 Trabajar con elementos que solo tienen `name` y no `id`.",
      "🎯 Leer el estado de un grupo de radio buttons con el mismo `name`.",
    ],
    comoFunciona: [
      "Recorre el árbol del documento y recoge todos los elementos cuyo atributo `name` coincida con el string.",
      "Devuelve una `NodeList` viva (no un array): si añades o quitas elementos con ese `name`, la lista se actualiza sola.",
      "No necesita esperar a `DOMContentLoaded` si se llama después de que el elemento exista.",
    ],
    errores: [
      "❌ Tratarla como un array: no tiene `map`, `forEach` ni `filter` directamente.",
      "❌ Confundirla con `getElementById()`: esta busca por `name`, no por `id`.",
      "❌ Usar nombres con espacios o mayúsculas mezcladas: la coincidencia es exacta y sensible a mayúsculas.",
      "❌ Asumir que devuelve un elemento único: siempre es una colección (aunque solo tenga uno).",
    ],
    casos: [
      '💼 Leer qué radio button de un grupo (`name="genero"`) está seleccionado.',
      '💼 Recoger todos los checkboxes `name="intereses"` marcados.',
      '💼 Iterar inputs de un formulario agrupados por `name` (por ejemplo, `name="telefono[]"`).',
    ],
    relacion: [
      "🧩 Se combina con `document.getElementById()` (por `id`), `querySelectorAll()` (por selector CSS) y `getElementsByClassName()` (por clase).",
      "🧩 Para convertir la `NodeList` en array: `Array.from(document.getElementsByName('x'))`.",
      "🧩 Como es viva, funciona bien con `form.elements.namedItem('x')` para grupos de formularios.",
    ],
    analogia:
      "Es como ir a una biblioteca y pedir todos los libros con el mismo **título en el lomo** (`name`), no los que tienen la misma portada ni el mismo número de catálogo.",
    fuente: "MDN Web Docs · Document.getElementsByName()",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          '1️⃣ Prepara el HTML con varios inputs que compartan `name`:\n\n```html\n<input type="radio" name="plan" value="basico"> Básico\n<input type="radio" name="plan" value="pro"> Pro\n```',
          "2️⃣ Desde JS, recupera el grupo con `document.getElementsByName('plan')`. Devuelve una `NodeList` viva con los dos inputs.",
          "3️⃣ Recorre la colección con `for...of` (o `Array.from`) y revisa cuál tiene `checked === true`:\n\n```js\nfor (const radio of document.getElementsByName('plan')) {\n  if (radio.checked) console.log(radio.value);\n}\n```",
          "4️⃣ Añade un tercer radio dinámicamente y comprueba que la lista **crece sola** (es viva):\n\n```js\ndocument.body.insertAdjacentHTML(\n  'beforeend',\n  '<input type=\"radio\" name=\"plan\" value=\"enterprise\"> Enterprise'\n);\nconsole.log(document.getElementsByName('plan').length); // 3\n```",
        ],
      },
    ],
  },

  /* ---------------- document.write() ---------------- */
  {
    id: "js-document-write",
    titulo: "document.write()",
    icon: "✍️",
    firma: "document.write(markup)",
    simuladorTipo: "document-write",
    definicion: [
      "**document.write()** escribe texto o HTML directamente en el flujo del documento mientras se está cargando; si se llama después del cierre, **reemplaza el documento completo**.",
    ],
    queEs: [
      "Es un método heredado del DOM nivel 0 que escribe en el `document` abierto.",
      "Su comportamiento depende del estado del parser: durante la carga añade contenido; después, lo sobrescribe.",
    ],
    paraQueSirve: [
      "🎯 Insertar contenido dinámico durante la carga inicial (scripts síncronos de terceros).",
      "🎯 Generar documentos simples o pruebas rápidas en consola.",
      "🎯 Escribir con `<script>` síncrono en `<head>` cuando necesitas añadir algo antes del parseo.",
    ],
    comoFunciona: [
      "Si el documento está **cargando** (`readyState = 'loading'`), el parser inserta el contenido justo después del script.",
      "Si el documento ya se **cerró** (`DOMContentLoaded` o después), `document.write()` primero llama a `document.open()` y **borra** todo el documento.",
      "Acepta varios argumentos que se concatenan en orden.",
    ],
    errores: [
      "❌ Llamarlo después de `DOMContentLoaded`: borra la página entera.",
      '❌ Usarlo en módulos (`type="module"`) o scripts `defer`/`async`: no escribe donde esperas.',
      "❌ Inyectar HTML sin escapar: riesgo de XSS si viene de input del usuario.",
      "❌ Usarlo para insertar contenido dinámico moderno: usa `innerHTML`, `append()` o `insertAdjacentHTML()`.",
    ],
    casos: [
      "💼 Scripts legados de terceros (analytics, publicidad) que aún inyectan `<script>` con `write()`.",
      "💼 Páginas de error o pruebas muy simples en consola.",
      "💼 Prototipos rápidos que no usan frameworks.",
    ],
    relacion: [
      "🧩 Se complementa con `document.writeln()` (añade `\\n`).",
      "🧩 Alternativas modernas: `element.innerHTML`, `element.append()`, `insertAdjacentHTML()`.",
      "🧩 Ligado a `document.open()` y `document.close()` (heredados del DOM nivel 0).",
    ],
    analogia:
      "Es como escribir con un lápiz sobre un papel mientras aún se está imprimiendo: si ya terminó de imprimirse, primero **arrancas la hoja** y empiezas de nuevo.",
    fuente: "MDN Web Docs · Document.write()",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Abre la consola del navegador en una página **ya cargada** y ejecuta:\n\n```js\ndocument.write('<h1>Hola</h1>');\n```",
          "2️⃣ Observa que la página entera desaparece: solo queda el `<h1>`. `write()` llamó a `document.open()` y borró el DOM.",
          "3️⃣ Recarga y ejecuta el `write()` dentro de un `<script>` síncrono en el HTML, **antes** de que cierre el `</body>`:\n\n```html\n<script>document.write('<p>en carga</p>');</script>\n```\n\nAhora el párrafo se inserta en el flujo normal, sin borrar nada.",
          "4️⃣ La alternativa moderna equivalente durante la carga es `element.insertAdjacentHTML('beforeend', '<p>en carga</p>')`.",
        ],
      },
    ],
  },

  /* ---------------- document.writeln() ---------------- */
  {
    id: "js-document-writeln",
    titulo: "document.writeln()",
    icon: "📝",
    firma: "document.writeln(markup)",
    simuladorTipo: "document-writeln",
    definicion: [
      "**document.writeln()** hace lo mismo que `document.write()` pero añade un salto de línea (`\\n`) al final del texto escrito.",
    ],
    queEs: [
      "Es una variante de `document.write()` que añade `\\n` al final.",
      "En HTML, ese salto de línea **no** se ve renderizado (el navegador colapsa los espacios), pero sí aparece en el código fuente y en contextos `<pre>`.",
    ],
    paraQueSirve: [
      "🎯 Escribir líneas separadas en el código fuente del documento.",
      "🎯 Generar contenido dentro de `<pre>` donde los saltos sí se ven.",
      "🎯 Depuración: imprime varias líneas en el HTML generado.",
    ],
    comoFunciona: [
      "Llama internamente a `document.write()` con el texto + `\\n`.",
      "Mismas reglas de estado del documento que `write()`.",
      "Acepta uno o varios argumentos, concatenados, y añade un solo `\\n` al final.",
    ],
    errores: [
      "❌ Esperar saltos de línea visibles fuera de `<pre>`: HTML colapsa los espacios.",
      "❌ Llamarlo después del cierre del documento: sobrescribe la página (igual que `write()`).",
      "❌ Confundirlo con `console.log()`: escribe en el flujo del documento, no en la consola.",
    ],
    casos: [
      "💼 Insertar varias líneas de texto dentro de un `<pre>` generado dinámicamente.",
      "💼 Probar scripts antiguos que usaban `writeln()` para formatear la salida.",
    ],
    relacion: [
      "🧩 Es a `write()` lo que `console.log()` es a `console.info()`: mismo motor, formato distinto.",
      "🧩 Comparte todas las advertencias de seguridad de `write()`.",
    ],
    analogia:
      "Es la misma pluma que `write()`, pero **siempre termina el renglón** antes de levantar el lápiz.",
    fuente: "MDN Web Docs · Document.writeln()",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Compara el código fuente generado por cada método:\n\n```html\n<script>\n  document.write('uno');\n  document.writeln('dos');\n  document.writeln('tres');\n</script>\n```",
          "2️⃣ Abre «Ver código fuente» del navegador: verás `unodos\\ntres\\n`. El `\\n` está ahí pero **no** se ve en pantalla.",
          "3️⃣ Para que el salto se vea, envuelve la salida en un `<pre>`:\n\n```js\ndocument.write('<pre>');\ndocument.writeln('línea 1');\ndocument.writeln('línea 2');\ndocument.write('</pre>');\n```",
        ],
      },
    ],
  },

  /* ---------------- parentNode ---------------- */
  {
    id: "js-parentnode",
    titulo: "parentNode",
    icon: "🔼",
    firma: "node.parentNode",
    simuladorTipo: "parentnode",
    definicion: [
      "**parentNode** es una propiedad de solo lectura que devuelve el nodo padre del nodo actual en el árbol del DOM, o `null` si no tiene.",
    ],
    queEs: [
      "Propiedad de `Node` que apunta al ancestro directo del nodo.",
      "En el nodo raíz (`document`) vale `null`.",
    ],
    paraQueSirve: [
      "🎯 Subir en el árbol del DOM desde un elemento hasta su contenedor.",
      "🎯 Eliminar un nodo con `node.parentNode.removeChild(node)`.",
      "🎯 Recorrer ancestros para aplicar estilos o delegación de eventos.",
    ],
    comoFunciona: [
      "Lee el puntero interno del nodo al padre en la estructura del árbol.",
      "Devuelve un `Node` (puede ser `Element`, `Document` o `DocumentFragment`).",
      "Solo lectura: no puedes reasignarla (para eso existe `appendChild` o `insertBefore`).",
    ],
    errores: [
      "❌ Llamar a `parentNode.removeChild()` sin comprobar que no es `null`.",
      "❌ Confundirla con `parentElement`: `parentNode` puede ser un nodo no-elemento (p. ej. `Document`).",
      "❌ Asumir que un nodo del `DocumentFragment` tiene `parentNode` visible en el DOM.",
    ],
    casos: [
      "💼 `elemento.parentNode.removeChild(elemento)` para eliminar un nodo.",
      "💼 Delegación de eventos: subir hasta un contenedor con un `data-*`.",
      "💼 Recorrer el árbol hacia arriba para encontrar un ancestro con cierta clase.",
    ],
    relacion: [
      "🧩 Vecina de `childNodes`, `firstChild`, `lastChild`.",
      "🧩 `parentElement` es similar pero solo devuelve elementos (nunca `Document`).",
      "🧩 `closest(selector)` combina la idea de subir ancestros con filtro CSS.",
    ],
    analogia:
      "Es como el **piso de arriba** de un departamento: siempre puedes ir a verlo, pero no puedes cambiar quién vive allí desde esta propiedad.",
    fuente: "MDN Web Docs · Node.parentNode",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          '1️⃣ Con este HTML:\n\n```html\n<ul id="lista">\n  <li id="uno">Uno</li>\n  <li id="dos">Dos</li>\n</ul>\n```',
          "2️⃣ Comprueba el padre de un `<li>`:\n\n```js\nconst uno = document.getElementById('uno');\nconsole.log(uno.parentNode.id); // \"lista\"\n```",
          '3️⃣ Elimina el nodo usando su padre:\n\n```js\nuno.parentNode.removeChild(uno);\n// Ahora la lista solo tiene "Dos"\n```',
          "4️⃣ Recorre ancestros hacia arriba con un bucle:\n\n```js\nlet actual = document.getElementById('dos');\nwhile (actual) {\n  console.log(actual.nodeName);\n  actual = actual.parentNode;\n}\n// LI → UL → BODY → HTML → #document → null\n```",
        ],
      },
    ],
  },

  /* ---------------- nextSibling ---------------- */
  {
    id: "js-nextsibling",
    titulo: "nextSibling",
    icon: "➡️",
    firma: "node.nextSibling",
    simuladorTipo: "nextsibling",
    definicion: [
      "**nextSibling** devuelve el siguiente nodo hermano (de cualquier tipo) del nodo actual, o `null` si es el último.",
    ],
    queEs: [
      "Propiedad de solo lectura de `Node`.",
      "Incluye **todos** los nodos: elementos, textos y comentarios.",
    ],
    paraQueSirve: [
      "🎯 Recorrer hermanos de un nodo paso a paso.",
      "🎯 Saltar a la siguiente etiqueta hermana.",
      "🎯 Depurar la estructura real del DOM.",
    ],
    comoFunciona: [
      "Devuelve el nodo inmediatamente posterior en la lista de hijos del padre.",
      "Puede devolver `#text` (saltos de línea, espacios), `#comment` o un `Element`.",
    ],
    errores: [
      "❌ Esperar un `Element` y recibir un nodo de texto (saltos de línea en el HTML).",
      "❌ Usarlo en un bucle sin comprobar `null`.",
      "❌ Confundirlo con `nextElementSibling` (este salta nodos no-elemento).",
    ],
    casos: [
      "💼 Iterar manualmente los hijos de un contenedor.",
      "💼 Encontrar la siguiente etiqueta hermana sin usar `querySelector`.",
      "💼 Inspeccionar el DOM real cuando hay espacios en blanco entre etiquetas.",
    ],
    relacion: [
      "🧩 `previousSibling` (anterior), `nextElementSibling` (solo elementos), `childNodes` (todos los hijos).",
      "🧩 `firstChild` / `lastChild` para los extremos.",
    ],
    analogia:
      "Es como el **siguiente asiento** en una fila de cine: puede estar ocupado por una persona (elemento), por un abrigo (texto) o vacío (comentario), pero siempre es el que viene después.",
    fuente: "MDN Web Docs · Node.nextSibling",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          '1️⃣ Con este HTML (atención a los saltos de línea):\n\n```html\n<div>\n  <span id="a">A</span>\n  <span id="b">B</span>\n</div>\n```',
          "2️⃣ Prueba `nextSibling` desde `#a`:\n\n```js\nconst a = document.getElementById('a');\nconsole.log(a.nextSibling);           // #text (el salto de línea)\nconsole.log(a.nextElementSibling.id); // \"b\"\n```",
          "3️⃣ Recorre solo los elementos hermanos:\n\n```js\nlet n = a;\nwhile (n) {\n  if (n.nodeType === 1) console.log(n.id);\n  n = n.nextSibling;\n}\n// a → b\n```",
          "4️⃣ Regla práctica: usa `nextSibling` solo si te interesan los textos; para elementos, prefiere `nextElementSibling`.",
        ],
      },
    ],
  },

  /* ---------------- previousSibling ---------------- */
  {
    id: "js-previoussibling",
    titulo: "previousSibling",
    icon: "⬅️",
    firma: "node.previousSibling",
    simuladorTipo: "previoussibling",
    definicion: [
      "**previousSibling** devuelve el nodo hermano anterior (de cualquier tipo) del nodo actual, o `null` si es el primero.",
    ],
    queEs: [
      "Propiedad de solo lectura de `Node`.",
      "Igual que `nextSibling` pero hacia atrás.",
    ],
    paraQueSirve: [
      "🎯 Recorrer hermanos hacia atrás.",
      "🎯 Encontrar el elemento previo a uno dado.",
      "🎯 Comprobar la estructura del DOM.",
    ],
    comoFunciona: [
      "Devuelve el nodo inmediatamente anterior en la lista de hijos del padre.",
      "Puede ser `#text`, `#comment` o un `Element`.",
    ],
    errores: [
      "❌ Igual que `nextSibling`: recibir un nodo de texto inesperado.",
      "❌ No comprobar `null` al inicio de la lista.",
      "❌ Confundirlo con `previousElementSibling`.",
    ],
    casos: [
      "💼 Insertar un nodo antes del actual (`parentNode.insertBefore(nuevo, actual)`).",
      "💼 Recorrer una lista de comentarios al revés.",
      "💼 Depurar el orden real de los nodos.",
    ],
    relacion: ["🧩 `nextSibling`, `previousElementSibling`, `parentNode`."],
    analogia:
      "Es el **asiento anterior** en la fila: mismo criterio que `nextSibling`, pero mirando hacia atrás.",
    fuente: "MDN Web Docs · Node.previousSibling",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Reutiliza el HTML anterior y parte desde `#b`:\n\n```js\nconst b = document.getElementById('b');\nconsole.log(b.previousSibling);           // #text\nconsole.log(b.previousElementSibling.id); // \"a\"\n```",
          "2️⃣ Insertar un nodo **antes** del actual usando el padre:\n\n```js\nconst nuevo = document.createElement('span');\nnuevo.textContent = 'X';\nb.parentNode.insertBefore(nuevo, b);\n```",
          "3️⃣ Recorrer hacia atrás solo elementos:\n\n```js\nlet n = b.previousElementSibling;\nwhile (n) {\n  console.log(n.id);\n  n = n.previousElementSibling;\n}\n// a\n```",
        ],
      },
    ],
  },

  /* ---------------- Propiedad style ---------------- */
  {
    id: "js-propiedad-style",
    titulo: "Propiedad style",
    icon: "🎨",
    firma: "element.style.propiedad",
    simuladorTipo: "style",
    definicion: [
      "**element.style** es un objeto `CSSStyleDeclaration` que expone los estilos **en línea** del elemento (los del atributo `style`) y permite leerlos y modificarlos desde JS.",
    ],
    queEs: [
      "Es una propiedad de `HTMLElement` (y `SVGElement`).",
      "Devuelve un objeto vivo que refleja los estilos **inline**, no los de las hojas de estilo.",
    ],
    paraQueSirve: [
      "🎯 Cambiar estilos dinámicamente desde JS.",
      "🎯 Leer los estilos inline aplicados.",
      "🎯 Alternar entre mostrar/ocultar con `display`.",
    ],
    comoFunciona: [
      "Al leer `element.style.color`, devuelve el valor inline (`''` si no se ha puesto).",
      "Al asignar `element.style.color = 'red'`, añade el estilo inline al atributo `style`.",
      "Los nombres de propiedad CSS con guion pasan a camelCase: `background-color` → `backgroundColor`.",
      "`getComputedStyle(el)` devuelve el estilo **calculado** (inline + hojas + herencia).",
    ],
    errores: [
      "❌ Confundir `style.color` (inline) con `getComputedStyle(el).color` (calculado).",
      "❌ Escribir `style.background-color` (guion): JS lo interpreta como resta.",
      "❌ Cambiar muchas propiedades una a una: usa `cssText` o una clase CSS.",
      "❌ Olvidar la unidad: `style.width = 100` no hace nada; necesita `'100px'`.",
    ],
    casos: [
      "💼 Resaltar un elemento al pasar el ratón.",
      "💼 Mostrar/ocultar con `style.display = 'none'`.",
      "💼 Animar valores numéricos combinados con `requestAnimationFrame`.",
    ],
    relacion: [
      "🧩 `getComputedStyle()` para leer el estilo final.",
      "🧩 `classList` para alternar clases (mejor que tocar `style` a mano).",
      "🧩 `setProperty` / `getPropertyValue` para propiedades con guion.",
    ],
    analogia:
      "Es como la **etiqueta con instrucciones** pegada encima del mueble: cambia solo lo que está escrito allí, no lo que dice el manual de la tienda (la hoja de estilos).",
    fuente: "MDN Web Docs · HTMLElement.style",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Cambia el color inline desde JS:\n\n```js\nconst caja = document.querySelector('.caja');\ncaja.style.backgroundColor = 'tomato';\ncaja.style.padding = '8px';\n```",
          "2️⃣ Observa que el atributo `style` del HTML se actualiza solo. Confírmalo con DevTools.",
          '3️⃣ Lee el estilo **calculado** (lo que realmente se aplica):\n\n```js\nconst cs = getComputedStyle(caja);\nconsole.log(cs.backgroundColor); // "rgb(255, 99, 71)"\nconsole.log(cs.padding);         // "8px"\n```',
          "4️⃣ Para propiedades con guion usa `setProperty`:\n\n```js\ncaja.style.setProperty('border-radius', '12px');\n```\n\nO `cssText` para varias a la vez:\n\n```js\ncaja.style.cssText = 'color: white; background: teal; margin: 4px';\n```",
        ],
      },
    ],
  },

  /* ---------------- Propiedad value ---------------- */
  {
    id: "js-propiedad-value",
    titulo: "Propiedad value",
    icon: "💎",
    firma: "input.value",
    simuladorTipo: "value",
    definicion: [
      "**value** es la propiedad que expone el valor **actual** de un control de formulario (`<input>`, `<textarea>`, `<select>`, `<button>`, `<option>`).",
    ],
    queEs: [
      "Propiedad de los elementos de formulario (interfaz `HTMLInputElement`, etc.).",
      "Refleja lo que el usuario ha escrito o seleccionado.",
      "No es lo mismo que el atributo `value` del HTML (valor inicial).",
    ],
    paraQueSirve: [
      "🎯 Leer lo que el usuario escribió.",
      "🎯 Asignar un valor inicial programáticamente.",
      "🎯 Validar o resetear campos.",
    ],
    comoFunciona: [
      "En `<input>` de texto, `input.value` devuelve el texto actual.",
      'En `<input type="checkbox">`, `input.checked` es lo relevante; `value` guarda el valor asociado al checkbox.',
      "El atributo HTML `value` fija el **valor inicial**; la propiedad JS `value` es el **estado actual**.",
      "Al cambiar por JS, **no** se dispara el evento `input` automáticamente.",
    ],
    errores: [
      "❌ Leer `value` antes de que el usuario interactúe y esperar cambios automáticos.",
      "❌ Confundir `value` (estado) con `defaultValue` (atributo inicial).",
      '❌ Asignar `value` en `<input type="file">` (no se puede por seguridad).',
      "❌ Esperar que asignar `value` dispare `onChange`: hay que dispararlo manualmente.",
    ],
    casos: [
      "💼 Leer el nombre en un formulario de registro.",
      "💼 Pre-rellenar un campo con datos del usuario.",
      "💼 Limpiar un formulario tras enviarlo.",
    ],
    relacion: [
      "🧩 `defaultValue`, `checked`, `selectedIndex`.",
      "🧩 `input.valueAsNumber`, `valueAsDate` para tipos numéricos/fecha.",
    ],
    analogia:
      "Es como la **bandeja de entrada** de un formulario: lo que hay dentro ahora mismo, no lo que decía la etiqueta impresa (el atributo `value`).",
    fuente: "MDN Web Docs · HTMLInputElement.value",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          '1️⃣ Con este formulario:\n\n```html\n<input id="nombre" value="Ana">\n```',
          '2️⃣ Lee el valor actual y el inicial:\n\n```js\nconst input = document.getElementById(\'nombre\');\nconsole.log(input.value);        // "Ana"\nconsole.log(input.defaultValue); // "Ana"\n```',
          '3️⃣ Escribe en el input y vuelve a leer: `value` cambia; `defaultValue` **no**:\n\n```js\ninput.value = "Bea";\nconsole.log(input.value);        // "Bea"\nconsole.log(input.defaultValue); // "Ana"  (el atributo HTML no cambia)\n```',
          '4️⃣ Si asignas `value` desde JS y quieres que se dispare el listener `input`/`change`, dispáralo a mano:\n\n```js\ninput.dispatchEvent(new Event("input", { bubbles: true }));\n```',
        ],
      },
    ],
  },

  /* ---------------- clientWidth ---------------- */
  {
    id: "js-clientwidth",
    titulo: "clientWidth",
    icon: "📏",
    firma: "element.clientWidth",
    simuladorTipo: "clientwidth",
    definicion: [
      "**clientWidth** devuelve el ancho interior (en píxeles enteros) de un elemento, incluyendo el padding pero **sin** bordes, scrollbar ni márgenes.",
    ],
    queEs: [
      "Propiedad de solo lectura de `Element`.",
      "Solo incluye padding (no borde, no margen, no scrollbar).",
      "Para el `<html>` o `<body>`, devuelve el ancho del viewport en la mayoría de navegadores.",
    ],
    paraQueSirve: [
      "🎯 Medir el espacio interior real de un contenedor.",
      "🎯 Calcular layouts manuales o canvas responsivos.",
      "🎯 Saber cuánto mide el área visible de un elemento con scroll.",
    ],
    comoFunciona: [
      "Calcula `padding-left + content-width + padding-right` redondeado a entero.",
      "Excluye el scrollbar vertical si lo hay.",
      "No incluye `border`, `margin` ni `transform`.",
      "Es de solo lectura: para cambiar el tamaño, modifica `width` en CSS.",
    ],
    errores: [
      "❌ Confundirlo con `offsetWidth` (incluye borde) o `scrollWidth` (incluye contenido no visible).",
      "❌ Esperar decimales: devuelve enteros redondeados.",
      "❌ Usarlo en elementos `display: inline` (devuelve 0 porque no tienen caja).",
      "❌ Olvidar que excluye el scrollbar.",
    ],
    casos: [
      "💼 Ajustar el tamaño de un `<canvas>` al contenedor.",
      "💼 Calcular el área útil de un contenedor antes de insertar contenido.",
      "💼 Medir el viewport con `document.documentElement.clientWidth`.",
    ],
    relacion: [
      "🧩 `clientHeight`, `clientTop`, `clientLeft` (misma familia).",
      "🧩 `offsetWidth` (con borde), `scrollWidth` (con contenido oculto).",
      "🧩 `getBoundingClientRect()` para medidas con decimales.",
    ],
    analogia:
      "Es como medir el **espacio útil** dentro de una caja de cartón: cuenta el acolchado (padding), pero no el grosor de la caja (borde) ni lo que sobresale (contenido oculto).",
    fuente: "MDN Web Docs · Element.clientWidth",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          '1️⃣ Con este HTML:\n\n```html\n<div id="caja" style="width: 200px; padding: 10px; border: 4px solid; margin: 8px">\n  contenido\n</div>\n```',
          "2️⃣ Compara las tres medidas:\n\n```js\nconst c = document.getElementById('caja');\nconsole.log(c.clientWidth); // 220  (200 + 10 + 10)\nconsole.log(c.offsetWidth); // 228  (clientWidth + 4 + 4 de borde)\nconsole.log(c.scrollWidth); // 220  (sin contenido oculto)\n```",
          "3️⃣ Añade contenido ancho y verás cómo cambia `scrollWidth` pero no `clientWidth`:\n\n```js\nc.firstChild.textContent = 'x'.repeat(500);\nconsole.log(c.clientWidth); // 220\nconsole.log(c.scrollWidth); // mayor (hay overflow)\n```",
          "4️⃣ Ajusta un `<canvas>` al contenedor (patrón típico):\n\n```js\nconst canvas = document.querySelector('canvas');\ncanvas.width = canvas.parentElement.clientWidth;\ncanvas.height = canvas.parentElement.clientHeight;\n```",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 2. Utilidades                                                       */
/* ------------------------------------------------------------------ */

const norm = (v = "") =>
  v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const quitarBold = (v = "") => String(v).replace(/\*\*/g, "");

const clip = (v = "", max = 160) => {
  const t = String(v).replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const corte = t.lastIndexOf(" ", max);
  return `${t.slice(0, corte > max * 0.6 ? corte : max).trim()}…`;
};

const XP = { facil: 60, medio: 90 };

/* ------------------------------------------------------------------ */
/* 3. Documento                                                        */
/* ------------------------------------------------------------------ */

function buildDoc(c) {
  return {
    id: c.id,
    titulo: c.titulo,
    icon: c.icon,
    curso: CURSO.id,
    cursoLabel: CURSO.label,
    categoria: "JavaScript · DOM",
    resumen: clip(quitarBold(c.definicion[0] ?? ""), 180),
    firma: c.firma,
    simulador: CURSO.simulador,
    simuladorTipo: c.simuladorTipo,

    definicion: c.definicion,
    queEs: c.queEs,
    paraQueSirve: c.paraQueSirve,
    comoFunciona: c.comoFunciona,
    errores: c.errores,
    casos: c.casos,
    relacion: c.relacion,
    analogia: c.analogia,
    notasPersonales: c.notasPersonales,
    extras: c.extras ?? [],
    fuente: c.fuente || "MDN Web Docs · JavaScript",
  };
}

/* ------------------------------------------------------------------ */
/* 4. Laboratorio (emparejar + completar + paso a paso)                */
/* ------------------------------------------------------------------ */

function extraerPares(doc) {
  const pares = [];
  const vistos = new Set();
  const fuentes = [
    ...(doc.paraQueSirve ?? []),
    ...(doc.relacion ?? []),
    ...(doc.errores ?? []),
    ...(doc.casos ?? []),
  ];
  for (const item of fuentes) {
    if (typeof item !== "string" || item.startsWith("```")) continue;
    const limpio = quitarBold(item).trim();
    const m = limpio.match(/^([^:]{3,60}):\s+(.{15,180})$/u);
    if (!m) continue;
    const concepto = m[1].trim();
    const descripcion = clip(m[2].trim(), 160);
    if (vistos.has(norm(concepto))) continue;
    vistos.add(norm(concepto));
    pares.push({ concepto, descripcion });
    if (pares.length >= 6) break;
  }
  return pares;
}

const primerNegrita = (texto = "") => {
  const m = texto.match(/\*\*([^*]{2,40})\*\*/);
  return m ? m[1].trim() : "";
};

function misionCompletar(doc, hermanos) {
  const conNegrita = (doc.definicion ?? []).find((t) =>
    /\*\*([^*]{2,40})\*\*/.test(t),
  );
  if (!conNegrita) return null;
  const termino = primerNegrita(conNegrita);
  if (!termino) return null;
  const frase = quitarBold(conNegrita).replace(termino, "__________");
  if (frase === quitarBold(conNegrita)) return null;

  const distractores = [];
  for (const h of hermanos) {
    if (h.id === doc.id || distractores.length === 3) continue;
    const t = primerNegrita((h.definicion ?? [])[0] || "");
    if (!t || t === termino || frase.includes(t)) continue;
    distractores.push(t);
  }
  if (distractores.length < 3) return null;

  return {
    id: `${doc.id}-completar`,
    tipo: "completar",
    titulo: "Completa la definición",
    dificultad: "Fácil",
    xp: XP.facil,
    frase,
    opciones: [termino, ...distractores].slice(0, 4),
    correcto: termino,
    pista: `El término empieza por «${termino.charAt(0)}…».`,
    solucion: `${termino}: ${clip(quitarBold(conNegrita), 220)}`,
  };
}

function construirPasoAPaso(doc) {
  const pasos = [];
  for (const extra of doc.extras ?? []) {
    let actual = null;
    for (const parrafo of extra.textos) {
      for (const linea of parrafo.split("\n")) {
        const m = linea.trim().match(/^(\d)\uFE0F?\u20E3\s+(.+)$/);
        if (m) {
          actual = {
            titulo: m[2].trim(),
            explicacion: "",
            codigo: "",
            salida: "",
          };
          pasos.push(actual);
        } else if (actual) {
          actual.explicacion += (actual.explicacion ? "\n" : "") + linea;
        }
      }
    }
  }
  return pasos.map((p, i) => ({ paso: i + 1, ...p }));
}

function construirLab(doc, hermanos) {
  const misiones = [];
  const pares = extraerPares(doc);
  if (pares.length >= 4) {
    misiones.push({
      id: `${doc.id}-emparejar`,
      tipo: "emparejar",
      titulo: "Une concepto y descripción",
      dificultad: "Medio",
      xp: XP.medio,
      pares,
      pista: "Selecciona un concepto y luego su descripción.",
      solucion: pares
        .map((p) => `${p.concepto} → ${p.descripcion}`)
        .join(" · "),
    });
  }
  const completar = misionCompletar(doc, hermanos);
  if (completar) misiones.push(completar);

  return {
    misiones,
    pasoAPaso: construirPasoAPaso(doc),
    consola: true,
    editor: true,
    depuracion: true,
  };
}

/* ------------------------------------------------------------------ */
/* 5. Serialización                                                    */
/* ------------------------------------------------------------------ */

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    const simple = value.every(
      (it) => typeof it === "string" && !it.includes("\n") && it.length < 90,
    );
    if (simple)
      return `[\n${value
        .map((it) => `${pad}  ${JSON.stringify(it)},`)
        .join("\n")}\n${pad}]`;
    return `[\n${value
      .map((it) => `${pad}  ${serialize(it, indent + 1)},`)
      .join("\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    if (!entries.length) return "{}";
    return `{\n${entries
      .map(
        ([k, v]) =>
          `${pad}  ${JSON.stringify(k)}: ${serialize(v, indent + 1)},`,
      )
      .join("\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

/* ------------------------------------------------------------------ */
/* 6. Generación                                                       */
/* ------------------------------------------------------------------ */

const docs = CONCEPTOS.map(buildDoc);
for (const doc of docs) {
  doc.quiz = buildQuiz(doc, docs);
  doc.lab = construirLab(doc, docs);
}

const docsById = Object.fromEntries(docs.map((d) => [d.id, d]));

// 👇 AQUÍ ESTÁ LA CORRECCIÓN: Creamos la estructura completa que espera jsApuntes.js
const meta = {
  id: CURSO.id,
  label: CURSO.label,
  icon: CURSO.icon,
  titulo: "Métodos del DOM",
  descripcion:
    "Selección, escritura y navegación de elementos en el documento.",
  simulador: CURSO.simulador,
  grupos: [
    {
      seccion: GRUPO.seccion,
      metodos: GRUPO.conceptos
        .filter((id) => docsById[id])
        .map((id) => {
          const doc = docsById[id];
          return {
            id,
            nombre: doc.titulo,
            firma: doc.firma,
            icon: doc.icon,
            lab: doc.lab.misiones.length,
          };
        }),
    },
  ],
};

const content = `/* Métodos JS del DOM · apuntes propios.
   Generado por scripts/generate-js-dom.mjs — no editar a mano. */

export const ${CURSO.export} = ${serialize(meta)};

export const ${CURSO.export}_DOCS = ${serialize(docsById)};
`;

fs.writeFileSync(path.join(DATA_DIR, `${CURSO.archivo}.js`), content, "utf8");

console.log("\n✅ Métodos JS del DOM generados:\n");
console.log(`- ${docs.length} notas → ${CURSO.export}`);
for (const doc of docs) {
  console.log(
    `   · ${doc.titulo} (${doc.lab.pasoAPaso.length} pasos, ${doc.quiz.length} preguntas, ${doc.lab.misiones.length} misiones)`,
  );
}
