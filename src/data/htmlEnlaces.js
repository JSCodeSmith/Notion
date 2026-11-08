/* Generado desde Apuntes/ — HTML.
   Regenerar con: node scripts/generate-html-elementos.mjs */

export const HTML_ENLACES = {
  "id": "html-enlaces",
  "label": "Enlaces",
  "icon": "🔗",
  "titulo": "Enlaces e hipervínculos",
  "descripcion": "El elemento <a> y sus atributos para crear hipervínculos: navegación, anclas, descargas, mailto y tel.",
  "simulador": "html",
  "grupos": [
    {
      "seccion": "Hipervínculos",
      "metodos": [
        {
          "id": "html-a",
          "nombre": "a",
          "firma": "<a href=\"\">Texto del enlace</a>",
          "icon": "🔗",
        },
      ],
    },
  ],
};

export const HTML_ENLACES_DOCS = {
  "html-a": {
    "id": "html-a",
    "titulo": "a",
    "icon": "🔗",
    "categoria": "Enlaces",
    "categoriaId": "html-enlaces",
    "firma": "<a href=\"\">Texto del enlace</a>",
    "simulador": "html",
    "definicion": [
      "`<a>` (del inglés *anchor*, \"ancla\") es el elemento que crea **hipervínculos** en HTML.",
      "Permite enlazar a otras páginas, secciones del mismo documento, archivos, direcciones de correo, números de teléfono o cualquier URL.",
    ],
    "queEs": [
      "Es un elemento **inline** (en línea) que puede contener texto, imágenes u otros elementos inline.",
      "Es uno de los elementos más importantes de la web: sin él, no existiría la navegación entre páginas.",
    ],
    "paraQueSirve": [
      "**Navegar** entre páginas web.",
      "**Enlazar** a secciones internas (anclas).",
      "**Descargar** archivos (PDF, ZIP, etc.).",
      "**Abrir** clientes de correo (`mailto:`) o marcar teléfonos (`tel:`).",
      "**Abrir** enlaces en nueva pestaña o ventana.",
      "**Aportar SEO**: los buscadores siguen los enlaces para indexar.",
      "**Mejorar accesibilidad**: navegación por teclado y lectores de pantalla.",
    ],
    "comoFunciona": [
      "1. El navegador lo renderiza como **texto subrayado y azul** por defecto. 2. Al hacer clic, navega a la URL indicada en `href`. 3. Si tiene `target=\"_blank\"`, abre en nueva pestaña. 4. Si `href` empieza por `#`, salta a un ancla interna. 5. Si no tiene `href`, actúa como marcador de posición (no navega).",
    ],
    "sintaxis": [
      {
        "code": "<a href=\"https://example.com\">Texto del enlace</a>",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Enlace básico",
        "descripcion": "",
        "code": "<a href=\"https://example.com\">Visitar Example</a>",
      },
      {
        "titulo": "Enlace interno (ancla)",
        "descripcion": "",
        "code": "<a href=\"#contacto\">Ir a contacto</a>\n...\n<h2 id=\"contacto\">Contacto</h2>",
      },
      {
        "titulo": "Enlace externo en nueva pestaña (seguro)",
        "descripcion": "",
        "code": "<a href=\"https://example.com\" target=\"_blank\" rel=\"noopener noreferrer\">\n  Abrir en nueva pestaña\n</a>",
      },
      {
        "titulo": "Enlace de descarga",
        "descripcion": "",
        "code": "<a href=\"/docs/manual.pdf\" download=\"manual-html.pdf\">\n  Descargar manual PDF\n</a>",
      },
      {
        "titulo": "Enlace de correo",
        "descripcion": "",
        "code": "<a href=\"mailto:hola@ejemplo.com?subject=Consulta&body=Hola\">\n  Enviar correo\n</a>",
      },
      {
        "titulo": "Enlace telefónico",
        "descripcion": "",
        "code": "<a href=\"tel:+51999888777\">Llamar al +51 999 888 777</a>",
      },
      {
        "titulo": "Enlace con imagen",
        "descripcion": "",
        "code": "<a href=\"https://example.com\">\n  <img src=\"logo.png\" alt=\"Ir a Example\">\n</a>",
      },
      {
        "titulo": "Enlace con bloque (HTML5)",
        "descripcion": "",
        "code": "<a href=\"/producto/123\">\n  <h3>Producto destacado</h3>\n  <p>Descripción del producto...</p>\n</a>",
      },
    ],
    "errores": [
      "❌ Usar `<a>` sin `href` como botón (mejor `<button>`).",
      "❌ Abrir en nueva pestaña sin `rel=\"noopener noreferrer\"` (riesgo de seguridad).",
      "❌ Texto del enlace genérico: \"clic aquí\", \"leer más\" (mala accesibilidad y SEO).",
      "❌ Anidar un `<a>` dentro de otro `<a>` (inválido).",
      "❌ Usar `<a>` para acciones que no navegan (usar `<button>`).",
      "❌ Olvidar `alt` en imágenes dentro del enlace.",
      "❌ Confundir `target=\"_blank\"` con `target=\"blank\"`.",
      "❌ Enlaces vacíos: `<a href=\"#\">` como botón.",
      "❌ Usar `javascript:void(0)` para evitar navegación (mala práctica).",
      "❌ No diferenciar visualmente los enlaces visitados (accesibilidad).",
    ],
    "casos": [
      "**Navegación principal** de un sitio (menús, breadcrumbs).",
      "**Enlaces en artículos** y blogs.",
      "**Botones de llamada a la acción** (CTA).",
      "**Descarga de recursos** (PDFs, imágenes, software).",
      "**Contacto** por correo o teléfono.",
      "**Anclas internas** para tablas de contenido.",
      "**Enlaces a redes sociales**.",
      "**Enlaces de afiliados** (con `rel=\"sponsored\"`).",
      "**Saltar al contenido** (skip links, accesibilidad).",
      "**Enlaces en tarjetas** de productos o posts.",
    ],
    "relacion": [
      "**`href`**: atributo clave; sin él, no hay enlace.",
      "**`target` + `rel`**: controlan cómo y con qué seguridad se abre.",
      "**`<button>`**: para acciones sin navegación.",
      "**`<link>`**: enlaces en el `<head>` (CSS, favicon); no es un hipervínculo visible.",
      "**`<nav>`**: contenedor semántico de enlaces de navegación.",
      "**Anclas (`id`)**: destinos internos.",
      "**SEO**: los enlaces entrantes (backlinks) son clave para posicionamiento.",
      "**Accesibilidad**: los enlaces deben ser descriptivos y navegables por teclado.",
      "**`:hover` / `:visited` / `:focus`**: pseudoclases CSS para estilos.",
      "**`mailto:` / `tel:`**: esquemas especiales de URL.",
    ],
    "analogia": "Un `<a>` es como una **puerta** en una casa: puede llevar a otra habitación (ancla interna), a otra casa (enlace externo), a un buzón de correo (`mailto:`) o a un teléfono (`tel:`). El `href` es la dirección a la que apunta esa puerta.",
    "fuente": "MDN – `*<a>*`: https://developer.mozilla.org/es/docs/Web/HTML/Element/a WHATWG HTML Living Standard – *The a element*: https://html.spec.whatwg.org/multipage/text-level-semantics.html#the-a-element W3C – *HTML5: The a element* web.dev – *Links*: https://web.dev/learn/html/links",
    "notasPersonales": [
      "**Sin `href`**, `<a>` no es un enlace real: no recibe foco ni se puede navegar con teclado.",
      "`target=\"_blank\"` **siempre** con `rel=\"noopener noreferrer\"` por seguridad (evita `window.opener` malicioso).",
      "Texto del enlace **descriptivo**: \"Descargar manual PDF\" en vez de \"clic aquí\".",
      "Para **botones**, usa `<button>`; para **navegación**, `<a>`.",
      "El atributo `download` **solo funciona** con recursos del mismo origen (o CORS habilitado).",
      "En HTML5, `<a>` puede contener **elementos de bloque** (antes no).",
      "Los enlaces deben ser **distinguibles visualmente** (color, subrayado) sin depender solo del color.",
      "`rel=\"nofollow\"` para enlaces patrocinados o no confiables; `rel=\"sponsored\"` para afiliados.",
      "Para **skip links** (accesibilidad): `<a href=\"#main\" class=\"skip-link\">Saltar al contenido</a>`.",
      "En frameworks (React): `<Link>` de React Router; en Vue: `<router-link>`.",
      "Los enlaces visitados (`:visited`) solo permiten cambiar color por privacidad.",
      "**Nunca** anides un `<a>` dentro de otro `<a>`.",
    ],
    "quiz": [],
  },
};
