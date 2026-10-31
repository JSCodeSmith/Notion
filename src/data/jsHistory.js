export const JS_HISTORY = {
  id: "historial",
  label: "Historial",
  icon: "🕘",
  titulo: "History API",
  descripcion:
    "Navega, añade y reemplaza entradas del historial del navegador sin recargar la página. La base de los routers SPA.",
  grupos: [
    {
      seccion: "Navegación entre entradas",
      metodos: [
        {
          id: "history-back",
          nombre: "history.back()",
          firma: "history.back()",
          icon: "⬅️",
        },
        {
          id: "history-forward",
          nombre: "history.forward()",
          firma: "history.forward()",
          icon: "➡️",
        },
        {
          id: "history-go",
          nombre: "history.go()",
          firma: "history.go(n)",
          icon: "↔️",
        },
      ],
    },
    {
      seccion: "Modificación del historial",
      metodos: [
        {
          id: "history-pushstate",
          nombre: "history.pushState()",
          firma: "history.pushState(estado, titulo, url)",
          icon: "➕",
        },
        {
          id: "history-replacestate",
          nombre: "history.replaceState()",
          firma: "history.replaceState(estado, titulo, url)",
          icon: "🔄",
        },
      ],
    },
  ],
};

export const JS_HISTORY_DOCS = {
  "history-back": {
    id: "history-back",
    titulo: "history.back()",
    icon: "⬅️",
    categoria: "History API · Navegación",
    firma: "history.back()",
    simulador: "history",

    definicion: [
      "Es un método de la **History API** que navega a la entrada anterior del historial, exactamente como si el usuario pulsara el botón «Atrás» del navegador. ⬅️",
      "No recibe argumentos, devuelve `undefined` y su efecto depende por completo del historial disponible.",
    ],

    queEs: [
      "Es el equivalente programático al botón Atrás. 🧭",
      "Es **asíncrono**: el código que escribas después no espera a que la navegación termine.",
      "Si no existe una entrada previa, no hace nada de forma silenciosa.",
    ],

    paraQueSirve: [
      "⬅️ Simular el botón Atrás desde JavaScript.",
      "🚪 Cerrar modales volviendo al estado anterior.",
      "📱 Crear botones personalizados de «volver».",
      "🧩 Implementar «volver al listado» desde una vista de detalle.",
      "🧭 Gestionar navegación programática en SPAs.",
      "🛒 Cancelar un checkout y volver al carrito.",
    ],

    comoFunciona: [
      "No recibe parámetros.",
      "Mueve el puntero del historial una posición hacia atrás.",
      "Si hay entrada previa, cambia la URL y dispara `popstate` cuando esa entrada fue creada con `pushState`.",
      "Si la entrada pertenece a otro documento, el navegador recarga la página.",
      "Si no hay entrada previa, no hace nada.",
      "Devuelve `undefined` inmediatamente; para saber cuándo terminó hay que escuchar `popstate`.",
    ],

    sintaxis: [
      {
        code: `history.back();`,
      },
      {
        caption: "Con comprobación y fallback:",
        code: `function volver(destinoFallback = "/") {
  if (history.length > 1) {
    history.back();
  } else {
    location.href = destinoFallback;
  }
}`,
      },
      {
        caption: "Esperar a que termine la navegación:",
        code: `window.addEventListener("popstate", () => {
  console.log("Nueva URL:", location.pathname);
});

history.back();`,
      },
    ],

    nota: "💡 `back()` equivale a `history.go(-1)`. No esperes a que la navegación termine: usa el evento `popstate` para reaccionar.",

    ejemplos: [
      {
        titulo: "1. 🖱️ Botón «volver» personalizado",
        code: `document.querySelector("#btn-volver").addEventListener("click", () => {
  history.back();
});`,
      },
      {
        titulo: "2. 🚪 Cerrar un modal con el botón Atrás",
        code: `function abrirModal() {
  modal.classList.add("visible");
  history.pushState({ modal: true }, "", "#modal");
}

window.addEventListener("popstate", () => {
  if (modal.classList.contains("visible")) {
    modal.classList.remove("visible");
  }
});`,
      },
      {
        titulo: "3. 📄 Volver al listado con fallback",
        code: `function volverAlListado() {
  if (history.length > 1) {
    history.back();
  } else {
    location.href = "/listado";
  }
}`,
      },
      {
        titulo: "4. ✅ Saber cuándo terminó la navegación",
        code: `function volverYHacer(callback) {
  const handler = () => {
    window.removeEventListener("popstate", handler);
    callback();
  };
  window.addEventListener("popstate", handler);
  history.back();
}

volverYHacer(() => console.log("Ya volvimos"));`,
      },
      {
        titulo: "5. ⚠️ Código que se ejecuta antes de navegar",
        code: `history.back();
console.log(location.pathname); // Todavía muestra la URL anterior

// ✅ Correcto
window.addEventListener("popstate", () => {
  console.log("Nueva URL:", location.pathname);
});
history.back();`,
      },
    ],

    errores: [
      "**Esperar que devuelva algo:** devuelve `undefined`.",
      "**Asumir que es síncrono:** la navegación ocurre después y el código siguiente se ejecuta antes.",
      "**Usarlo sin comprobar `history.length`:** si no hay historial, no pasa nada.",
      "**Confundirlo con `location.href`:** `location.href` recarga siempre; `back()` usa el historial.",
      "**Olvidar `popstate`:** no sabrás cuándo terminó la navegación.",
      "**Usarlo en un iframe sin historial:** no hará nada.",
    ],

    casos: [
      "🚪 Botones «volver» en vistas de detalle.",
      "🖼️ Cerrar modales con el gesto o botón Atrás.",
      "🛒 Cancelar un checkout y volver al carrito.",
      "✏️ Formularios: cancelar la edición actual.",
      "🎮 Juegos: salir de una pantalla al menú anterior.",
      "🧭 SPAs: restaurar la vista previa sin recargar.",
    ],

    relacion: [
      "**`history.forward()`:** hace lo contrario, avanza una entrada.",
      "**`history.go(n)`:** permite saltar varias entradas; `back()` es `go(-1)`.",
      "**`popstate`:** evento que se dispara al navegar entre entradas creadas con `pushState`.",
      "**`history.pushState()`:** crea las entradas que luego recorre `back()`.",
      "**`history.length`:** indica cuántas entradas hay en la sesión.",
      "**`location.href`:** alternativa que recarga la página en lugar de usar el historial.",
    ],

    analogia:
      "Imagina un libro con marcadores 🔖. `pushState()` coloca un marcador nuevo; `history.back()` retrocede al marcador anterior. Si había uno, vas allí sin reimprimir el libro. Si no había, te quedas donde estás. `popstate` es el aviso que suena cada vez que cambias de marcador. Y `back()` no te dice cuándo llegaste: solo empieza a hojear hacia atrás.",

    fuente: "MDN Web Docs · History API · HTML Standard",

    notasPersonales: [
      "✅ No recibe argumentos y devuelve `undefined`.",
      "✅ Es asíncrono: escucha `popstate` para saber cuándo terminó.",
      "✅ Equivale a `history.go(-1)`.",
      "⚠️ Verifica `history.length > 1` antes de usarlo si necesitas un fallback.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué hace history.back()?",
        opciones: [
          "Recarga la página actual",
          "Navega a la entrada anterior del historial",
          "Borra todo el historial",
          "Avanza una entrada",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve history.back()?",
        opciones: ["La URL anterior", "true", "undefined", "Una promesa"],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿A qué método equivale history.back()?",
        opciones: ["history.go(1)", "history.go(0)", "history.go(-1)", "history.forward()"],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Qué evento permite saber cuándo terminó la navegación?",
        opciones: ["load", "popstate", "hashchange", "beforeunload"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué ocurre si no hay entrada anterior?",
        opciones: [
          "Lanza un error",
          "Recarga la página",
          "No hace nada",
          "Va a la página de inicio",
        ],
        correcta: 2,
      },
    ],
  },

  "history-forward": {
    id: "history-forward",
    titulo: "history.forward()",
    icon: "➡️",
    categoria: "History API · Navegación",
    firma: "history.forward()",
    simulador: "history",

    definicion: [
      "Es un método de la **History API** que navega a la siguiente entrada del historial, como si el usuario pulsara el botón «Adelante» del navegador. ➡️",
      "Es el opuesto exacto de `history.back()` y equivale a `history.go(1)`.",
    ],

    queEs: [
      "Solo funciona si el usuario navegó hacia atrás previamente; si no hay una entrada siguiente, no hace nada. 🔁",
      "Es asíncrono: el código posterior se ejecuta antes de que la navegación termine.",
      "Para saber cuándo ocurrió hay que escuchar el evento `popstate`.",
    ],

    paraQueSirve: [
      "➡️ Simular el botón Adelante desde JavaScript.",
      "🔄 Rehacer una navegación que se canceló con Atrás.",
      "🧭 Crear controles personalizados tipo barra de navegador.",
      "📝 Wizards: avanzar al siguiente paso tras volver atrás.",
      "🎮 Juegos: rehacer pantallas o movimientos.",
      "✏️ Editores: implementar redo después de undo.",
    ],

    comoFunciona: [
      "No recibe parámetros.",
      "Mueve el puntero del historial una posición hacia adelante.",
      "Si hay entrada siguiente, cambia la URL y dispara `popstate` cuando fue creada con `pushState`.",
      "Si la entrada pertenece a otro documento, recarga la página.",
      "Si no hay entrada siguiente, no hace nada.",
      "Devuelve `undefined` inmediatamente.",
    ],

    sintaxis: [
      {
        code: `history.forward();`,
      },
      {
        caption: "Botones Atrás y Adelante:",
        code: `document.querySelector("#atras").onclick = () => history.back();
document.querySelector("#adelante").onclick = () => history.forward();

window.addEventListener("popstate", (e) => {
  console.log("Navegación:", e.state);
});`,
      },
      {
        caption: "Equivalencias:",
        code: `history.forward(); // = history.go(1)
history.back();    // = history.go(-1)`,
      },
    ],

    nota: "💡 El «adelante» solo existe después de haber retrocedido. Si haces un `pushState()` nuevo tras volver atrás, la rama futura se descarta, igual que el redo de un editor.",

    ejemplos: [
      {
        titulo: "1. 🖱️ Botón «adelante» personalizado",
        code: `document.querySelector("#btn-adelante").addEventListener("click", () => {
  history.forward();
});`,
      },
      {
        titulo: "2. 🔁 Deshacer y rehacer",
        code: `const btnAtras = document.querySelector("#atras");
const btnAdelante = document.querySelector("#adelante");

btnAtras.onclick = () => history.back();
btnAdelante.onclick = () => history.forward();

window.addEventListener("popstate", (e) => {
  console.log("Estado actual:", e.state);
});`,
      },
      {
        titulo: "3. 🧭 Barra tipo navegador",
        code: `<button id="atras">⬅</button>
<button id="adelante">➡</button>
<button id="recargar">🔄</button>

<script>
  document.querySelector("#atras").onclick = () => history.back();
  document.querySelector("#adelante").onclick = () => history.forward();
  document.querySelector("#recargar").onclick = () => location.reload();
</script>`,
      },
      {
        titulo: "4. ✅ Detectar cuándo terminó",
        code: `window.addEventListener("popstate", (e) => {
  console.log("Adelante ejecutado. Estado:", e.state);
});

history.forward();
console.log("Esto corre primero");`,
      },
      {
        titulo: "5. ⚠️ Cómo se pierde el adelante",
        code: `history.pushState({ v: 1 }, "", "/a");
history.pushState({ v: 2 }, "", "/b");
history.back(); // estamos en /a

history.pushState({ v: 3 }, "", "/c");
history.forward(); // Ya no hay adelante hacia /b`,
      },
    ],

    errores: [
      "**Esperar que devuelva algo:** devuelve `undefined`.",
      "**Asumir que es síncrono:** la navegación es asíncrona.",
      "**Creer que siempre funciona:** solo si el usuario navegó atrás antes.",
      "**Olvidar `popstate`:** no sabrás cuándo terminó.",
      "**Confundirlo con `location.href`:** ese recarga la página.",
      "**Usarlo tras un `pushState` nuevo:** la rama de adelante se descarta.",
    ],

    casos: [
      "🌐 Barras de navegación personalizadas.",
      "🧭 Controles propios de atrás/adelante en SPAs.",
      "📝 Wizards: rehacer pasos.",
      "🎮 Juegos: rehacer pantallas o movimientos.",
      "✏️ Editores: redo tras undo.",
      "📊 Dashboards: alternar entre vistas visitadas.",
    ],

    relacion: [
      "**`history.back()`:** va una entrada atrás.",
      "**`history.go(n)`:** `forward()` es `go(1)`.",
      "**`popstate`:** avisa cuando se navega.",
      "**`history.pushState()`:** añade las entradas que recorre `forward()`.",
      "**`history.replaceState()`:** no afecta al adelante.",
      "**`history.length`:** número total de entradas.",
    ],

    analogia:
      "El historial es un libro con marcadores 🔖. `back()` retrocede al marcador anterior y `forward()` avanza al siguiente. Si nunca retrocediste, no hay «siguiente» al que ir. Y si después de retroceder escribes un marcador nuevo con `pushState()`, los marcadores futuros se borran: es como escribir en un editor después de deshacer, se pierde el redo.",

    fuente: "MDN Web Docs · History API · HTML Standard",

    notasPersonales: [
      "✅ Es el opuesto de `history.back()`.",
      "✅ Equivale a `history.go(1)`.",
      "⚠️ Solo funciona después de haber ido atrás.",
      "✅ Es asíncrono: usa `popstate` para reaccionar.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué hace history.forward()?",
        opciones: [
          "Va a la entrada anterior",
          "Avanza a la siguiente entrada del historial",
          "Recarga la página",
          "Limpia el historial",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿A qué método equivale history.forward()?",
        opciones: ["history.go(-1)", "history.go(0)", "history.go(1)", "history.back()"],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿Cuándo tiene sentido usar forward()?",
        opciones: [
          "Siempre que quieras recargar",
          "Después de haber navegado hacia atrás",
          "Solo al cargar la página",
          "Solo si hay cookies",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué evento indica que la navegación terminó?",
        opciones: ["submit", "popstate", "resize", "DOMContentLoaded"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué pasa con la rama «adelante» al hacer pushState tras un back()?",
        opciones: [
          "Se conserva",
          "Se duplica",
          "Se descarta",
          "Se convierte en hash",
        ],
        correcta: 2,
      },
    ],
  },

  "history-go": {
    id: "history-go",
    titulo: "history.go()",
    icon: "↔️",
    categoria: "History API · Navegación",
    firma: "history.go(n)",
    simulador: "history",

    definicion: [
      "Es un método de la **History API** que navega a una entrada específica del historial indicando cuántos pasos avanzar o retroceder mediante un número entero. ↔️",
      "Es el método general del que `back()` y `forward()` son casos particulares.",
    ],

    queEs: [
      "Permite saltar varias entradas de una sola vez en cualquier dirección. 🧭",
      "`go(-1)` equivale a `back()`, `go(1)` a `forward()` y `go(0)` recarga la página.",
      "Es asíncrono: el código posterior se ejecuta antes de que la navegación termine.",
    ],

    paraQueSirve: [
      "⏪ Retroceder varios pasos de una vez.",
      "⏩ Avanzar varios pasos en el historial.",
      "🔄 Recargar la página actual con `go(0)`.",
      "🧩 Saltar a un punto concreto del historial.",
      "🎛️ Implementar botones «inicio» o «final».",
      "🧭 Controles personalizados de navegación.",
    ],

    comoFunciona: [
      "Recibe un número entero `n` (positivo, negativo o `0`).",
      "Mueve el puntero del historial `n` posiciones: positivo avanza, negativo retrocede y `0` recarga.",
      "Si la entrada destino existe, cambia la URL y dispara `popstate` cuando fue creada con `pushState`.",
      "Si la entrada pertenece a otro documento, recarga la página.",
      "Si la entrada no existe, no hace nada.",
      "Devuelve `undefined` inmediatamente. Los decimales se truncan: `go(1.9)` es `go(1)`.",
    ],

    sintaxis: [
      {
        code: `history.go(n);`,
      },
      {
        caption: "Equivalencias:",
        code: `history.go(-1); // = history.back()
history.go(1);  // = history.forward()
history.go(0);  // = location.reload()
history.go();   // = history.go(0) → recarga`,
      },
      {
        caption: "Esperar a que termine:",
        code: `function ir(n) {
  return new Promise((resolve) => {
    window.addEventListener("popstate", resolve, { once: true });
    history.go(n);
  });
}

await ir(-2);`,
      },
    ],

    nota: "💡 `history.go()` sin argumentos **no** va al inicio: equivale a `go(0)` y recarga la página. Para volver al inicio usa `history.go(-(history.length - 1))` con un fallback.",

    ejemplos: [
      {
        titulo: "1. ⏪ Retroceder tres pasos",
        code: `history.go(-3);`,
      },
      {
        titulo: "2. 🔄 Recargar la página",
        code: `history.go(0);
// Equivale a location.reload()`,
      },
      {
        titulo: "3. 🎛️ Controles tipo navegador",
        code: `document.querySelector("#atras").onclick = () => history.go(-1);
document.querySelector("#adelante").onclick = () => history.go(1);
document.querySelector("#recargar").onclick = () => history.go(0);`,
      },
      {
        titulo: "4. 🏠 Volver al inicio",
        code: `function volverAlInicio() {
  if (history.length > 1) {
    history.go(-(history.length - 1));
  } else {
    location.href = "/";
  }
}`,
      },
      {
        titulo: "5. ✅ Detectar cuándo terminó",
        code: `window.addEventListener("popstate", (e) => {
  console.log("Navegación terminada. Estado:", e.state);
});

history.go(-2);
console.log("Esto corre ANTES de popstate");`,
      },
    ],

    errores: [
      "**Pasar un string:** se convierte a número (`\"2\"` → `2`).",
      "**Pasar decimales:** se truncan (`1.9` → `1`).",
      "**Esperar que devuelva algo:** devuelve `undefined`.",
      "**Asumir que es síncrono:** la navegación es asíncrona.",
      "**Usarlo sin verificar `history.length`:** si no hay entradas, no pasa nada.",
      "**Confundir `go(0)` con «ir al inicio»:** `go(0)` recarga la página actual.",
      "**Pasar `NaN` o `Infinity`:** no hace nada.",
    ],

    casos: [
      "🔄 Recargar tras cambios de idioma o configuración.",
      "⏪ Salir de un wizard retrocediendo varios pasos.",
      "⏩ Reenviar un flujo avanzando varias entradas.",
      "🎛️ Botones personalizados de navegación.",
      "🏠 Volver a la primera entrada de la sesión.",
      "🛒 Volver al carrito desde varios pasos de checkout.",
    ],

    relacion: [
      "**`history.back()`:** es `go(-1)`.",
      "**`history.forward()`:** es `go(1)`.",
      "**`history.go(0)`:** recarga la página.",
      "**`popstate`:** evento al navegar.",
      "**`history.pushState()`:** añade las entradas que recorre `go()`.",
      "**`location.reload()`:** alternativa explícita a `go(0)`.",
    ],

    analogia:
      "El historial es un libro con páginas 📖 y un marcapáginas 🔖. `go(-1)` retrocede una página, `go(-3)` retrocede tres de golpe, `go(2)` avanza dos y `go(0)` reimprime la página actual. Si intentas ir más allá del inicio o del final, no pasa nada. `popstate` es el timbre que suena cada vez que cambias de página.",

    fuente: "MDN Web Docs · History API · HTML Standard",

    notasPersonales: [
      "✅ Es el método general: `back()` y `forward()` son casos particulares.",
      "✅ `go(0)` y `go()` recargan la página.",
      "⚠️ Los decimales se truncan y `NaN` no hace nada.",
      "✅ Es asíncrono: escucha `popstate`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué hace history.go(-2)?",
        opciones: [
          "Avanza dos entradas",
          "Retrocede dos entradas",
          "Recarga dos veces",
          "Limpia dos entradas",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué hace history.go(0)?",
        opciones: [
          "Va al inicio del historial",
          "Recarga la página actual",
          "No hace nada",
          "Cierra la pestaña",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué ocurre con history.go(1.9)?",
        opciones: [
          "Va a la entrada 1.9",
          "Se trunca a go(1)",
          "Lanza TypeError",
          "Recarga la página",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿A qué equivale history.go(1)?",
        opciones: ["history.back()", "history.forward()", "history.go(0)", "location.reload()"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué devuelve history.go(n)?",
        opciones: ["La nueva URL", "El número de pasos", "undefined", "Una promesa"],
        correcta: 2,
      },
    ],
  },

  "history-pushstate": {
    id: "history-pushstate",
    titulo: "history.pushState()",
    icon: "➕",
    categoria: "History API · Estado",
    firma: "history.pushState(estado, titulo, url)",
    simulador: "history",

    definicion: [
      "Es un método de la **History API** que añade una nueva entrada al historial y cambia la URL de la barra de direcciones **sin recargar la página**. ➕",
      "Guarda además un objeto de estado asociado a esa entrada, recuperable cuando el usuario navega con Atrás o Adelante.",
    ],

    queEs: [
      "Es la pieza clave para construir **SPAs** y routers del lado del cliente. 🧭",
      "Cambia la URL sin perder el estado de la aplicación y sin recargar.",
      "No dispara el evento `popstate`; solo lo hace la navegación posterior del usuario.",
      "La URL debe ser del mismo origen o lanza `SecurityError`.",
    ],

    paraQueSirve: [
      "🧭 Cambiar la URL sin recargar en una SPA.",
      "📌 Compartir enlaces que reflejen el estado de la app.",
      "🔄 Guardar estado entre navegaciones: filtros, scroll, pestañas.",
      "⬅️➡️ Hacer que Atrás y Adelante funcionen correctamente.",
      "📊 Actualizar la URL en filtros, búsquedas y paginación.",
      "🧩 Implementar rutas con React Router, Vue Router, etc.",
    ],

    comoFunciona: [
      "Recibe `estado` (objeto serializable o `null`), `titulo` (ignorado por casi todos los navegadores) y `url` (opcional, mismo origen).",
      "Añade una entrada nueva al historial; no reemplaza la actual.",
      "Cambia la URL visible sin recargar.",
      "No dispara `popstate`.",
      "El estado se recupera con `history.state` o en el evento `popstate`.",
      "Si el estado contiene funciones, nodos del DOM o símbolos, puede fallar con `DataCloneError`.",
    ],

    sintaxis: [
      {
        code: `history.pushState(estado, titulo, url);`,
      },
      {
        caption: "Guardar estado y URL:",
        code: `history.pushState(
  { usuario: "ana", filtro: "recientes" },
  "",
  "/usuarios?filtro=recientes"
);

console.log(history.state);
// { usuario: "ana", filtro: "recientes" }`,
      },
      {
        caption: "Mini-router con popstate:",
        code: `function navegar(ruta) {
  history.pushState({ ruta }, "", ruta);
  renderizar(ruta);
}

window.addEventListener("popstate", (e) => {
  renderizar(e.state?.ruta ?? location.pathname);
});`,
      },
    ],

    nota: "💡 `pushState()` no renderiza nada: debes actualizar la interfaz tú mismo. Y no dispara `popstate`; solo la navegación del usuario lo hace.",

    ejemplos: [
      {
        titulo: "1. 🔗 Cambio básico de URL",
        code: `history.pushState({ pagina: "about" }, "", "/about");
// La URL cambia a /about sin recargar`,
      },
      {
        titulo: "2. 🔍 Filtros compartibles",
        code: `function aplicarFiltro(categoria) {
  const url = "/productos?cat=" + categoria;
  history.pushState({ categoria }, "", url);
  cargarProductos(categoria);
}`,
      },
      {
        titulo: "3. 📄 Paginación sin recargar",
        code: `function irAPagina(n) {
  history.pushState({ pagina: n }, "", "?pagina=" + n);
  cargarPagina(n);
}

window.addEventListener("popstate", (e) => {
  cargarPagina(e.state?.pagina ?? 1);
});`,
      },
      {
        titulo: "4. 🧩 Mini-router completo",
        code: `const rutas = {
  "/": () => "<h1>🏠 Inicio</h1>",
  "/about": () => "<h1>ℹ️ Acerca de</h1>",
  "/contacto": () => "<h1>📞 Contacto</h1>",
};

function render(ruta = location.pathname) {
  document.querySelector("#app").innerHTML =
    (rutas[ruta] ?? (() => "<h1>404</h1>"))();
}

function navegar(ruta) {
  if (ruta === location.pathname) return;
  history.pushState({ ruta }, "", ruta);
  render(ruta);
}

window.addEventListener("popstate", (e) => {
  render(e.state?.ruta ?? location.pathname);
});`,
      },
      {
        titulo: "5. 📌 Guardar scroll en el estado",
        code: `function abrirDetalle(id) {
  history.pushState(
    { id, scrollY: window.scrollY },
    "",
    "/detalle/" + id
  );
  cargarDetalle(id);
}

window.addEventListener("popstate", (e) => {
  if (e.state?.id) {
    cargarDetalle(e.state.id);
    window.scrollTo(0, e.state.scrollY ?? 0);
  }
});`,
      },
    ],

    errores: [
      "**Cruzar de origen:** una URL de otro dominio lanza `SecurityError`.",
      "**Esperar que dispare `popstate`:** `pushState()` no lo dispara.",
      "**Confiar en el título:** los navegadores modernos lo ignoran; actualiza `document.title` a mano.",
      "**Pasar estado no serializable:** funciones, DOM o símbolos pueden lanzar `DataCloneError`.",
      "**Olvidar escuchar `popstate`:** Atrás y Adelante romperán la app.",
      "**No usar `replaceState()` al inicio:** se acumulan entradas innecesarias.",
      "**No actualizar la UI:** `pushState()` no renderiza nada.",
    ],

    casos: [
      "🧭 SPAs con React, Vue, Svelte o Angular.",
      "🔍 Filtros y búsquedas reflejados en la URL.",
      "📄 Paginación sin recarga.",
      "🗂️ Pestañas o vistas internas.",
      "🛒 E-commerce: navegar entre categorías.",
      "🎵 Reproductores: cambiar de canción sin recargar.",
    ],

    relacion: [
      "**`history.replaceState()`:** reemplaza la entrada actual en lugar de añadir.",
      "**`popstate`:** evento al ir atrás o adelante.",
      "**`history.state`:** estado de la entrada actual.",
      "**`location.pathname`:** ruta actual de solo lectura.",
      "**`hashchange`:** evento al cambiar el hash.",
      "**`URLSearchParams`:** manipula la query antes de `pushState()`.",
    ],

    analogia:
      "El navegador es un libro de historias 📖. Cada navegación normal imprime una página nueva. `pushState()` inserta una página nueva al final sin reimprimir todo el libro, cambia la URL y deja una nota adhesiva con el estado. `replaceState()` reescribe la página actual. `popstate` suena cuando el lector pasa páginas hacia atrás o adelante y te dice qué nota había guardada. `pushState()` no avisa: solo añade la página.",

    fuente: "MDN Web Docs · History API · HTML Standard",

    notasPersonales: [
      "✅ Añade una entrada al historial sin recargar.",
      "✅ Guarda un objeto de estado recuperable con `history.state`.",
      "❌ No dispara `popstate`.",
      "⚠️ La URL debe ser del mismo origen.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué hace history.pushState()?",
        opciones: [
          "Recarga la página",
          "Añade una entrada al historial y cambia la URL sin recargar",
          "Borra el historial",
          "Vuelve a la entrada anterior",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿pushState() dispara el evento popstate?",
        opciones: [
          "Sí, siempre",
          "No, solo lo dispara la navegación del usuario",
          "Solo con URL absoluta",
          "Solo en Chrome",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué ocurre si la URL es de otro origen?",
        opciones: ["Se ignora", "Lanza SecurityError", "Lanza TypeError", "Se abre en otra pestaña"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Dónde se recupera el estado guardado?",
        opciones: [
          "En localStorage",
          "En history.state o en popstate",
          "En document.cookie",
          "En location.hash",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué diferencia hay con replaceState()?",
        opciones: [
          "pushState añade una entrada; replaceState reemplaza la actual",
          "Son idénticos",
          "replaceState recarga la página",
          "pushState borra el historial",
        ],
        correcta: 0,
      },
    ],
  },

  "history-replacestate": {
    id: "history-replacestate",
    titulo: "history.replaceState()",
    icon: "🔄",
    categoria: "History API · Estado",
    firma: "history.replaceState(estado, titulo, url)",
    simulador: "history",

    definicion: [
      "Es un método de la **History API** que reemplaza la entrada actual del historial por una nueva, cambiando la URL sin recargar y **sin añadir** una entrada. 🔄",
      "Es el hermano silencioso de `pushState()`: sobrescribe en lugar de añadir.",
    ],

    queEs: [
      "Actualiza la URL sin ensuciar el historial del usuario. 🧹",
      "El botón Atrás no volverá a la URL anterior porque esa entrada ya no existe.",
      "Ideal para normalizar rutas, limpiar parámetros y sincronizar estado efímero.",
      "No dispara `popstate` y no aumenta `history.length`.",
    ],

    paraQueSirve: [
      "🔄 Actualizar la URL sin añadir entradas.",
      "🧹 Limpiar parámetros como `?redirect=...` o `?token=...`.",
      "📌 Sincronizar el estado sin romper el botón Atrás.",
      "🔀 Redirigir dentro de una SPA sin recargar.",
      "✏️ Corregir la URL tras una acción del usuario.",
      "🎯 Normalizar rutas: `/home/` → `/home`.",
    ],

    comoFunciona: [
      "Recibe los mismos argumentos que `pushState()`: estado, título y URL.",
      "Reemplaza la entrada actual del historial; no añade una nueva.",
      "Cambia la URL visible sin recargar.",
      "No dispara `popstate`.",
      "`history.length` no aumenta.",
      "El estado anterior se pierde, salvo que lo hayas guardado aparte.",
    ],

    sintaxis: [
      {
        code: `history.replaceState(estado, titulo, url);`,
      },
      {
        caption: "Limpiar la URL después del login:",
        code: `history.replaceState({ logueado: true }, "", "/dashboard");`,
      },
      {
        caption: "Preservar el estado anterior y añadir un campo:",
        code: `history.replaceState(
  { ...history.state, scrollY: window.scrollY },
  "",
  location.href
);`,
      },
    ],

    nota: "💡 Usa `replaceState()` para el estado inicial y para cambios que no deberían crear un nuevo paso en el historial. Usa `pushState()` solo cuando el usuario deba poder volver a la vista anterior.",

    ejemplos: [
      {
        titulo: "1. 🔄 Reemplazo básico",
        code: `history.replaceState({ pagina: "inicio" }, "", "/inicio");
// La URL cambia, pero el historial no crece`,
      },
      {
        titulo: "2. 🧹 Limpiar parámetros sensibles",
        code: `// URL: /login?redirect=/dashboard&token=abc123
const params = new URLSearchParams(location.search);
const destino = params.get("redirect") ?? "/dashboard";

history.replaceState({}, "", destino);
// El botón atrás no vuelve a /login?redirect=...`,
      },
      {
        titulo: "3. 🔍 Filtros sin acumular historial",
        code: `function actualizarFiltro(categoria) {
  history.replaceState({ categoria }, "", "?cat=" + categoria);
  cargarProductos(categoria);
}`,
      },
      {
        titulo: "4. 🎯 Normalizar una URL",
        code: `if (location.pathname.endsWith("/")) {
  history.replaceState(
    history.state,
    "",
    location.pathname.slice(0, -1)
  );
}`,
      },
      {
        titulo: "5. 🔐 Login que limpiar la URL",
        code: `async function login(usuario, password) {
  const res = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify({ usuario, password }),
  });

  if (res.ok) {
    history.replaceState({ logueado: true }, "", "/dashboard");
    renderDashboard();
  }
}`,
      },
    ],

    errores: [
      "**Confundirlo con `pushState()`:** `replaceState()` no añade entradas.",
      "**Esperar que Atrás vuelva:** la entrada anterior se pierde.",
      "**Cruzar de origen:** lanza `SecurityError`.",
      "**Esperar que dispare `popstate`:** no lo dispara.",
      "**Confiar en el título:** los navegadores modernos lo ignoran.",
      "**Pasar estado no serializable:** puede lanzar `DataCloneError`.",
      "**No actualizar la UI:** `replaceState()` no renderiza nada.",
    ],

    casos: [
      "🧹 Limpiar query strings tras procesar parámetros.",
      "🔐 Login: reemplazar `/login` por `/dashboard`.",
      "🎯 Normalizar rutas con o sin barra final.",
      "🔄 Actualizar filtros sin acumular historial.",
      "📌 Guardar scroll o estado efímero.",
      "🚪 Redirecciones internas en SPAs.",
    ],

    relacion: [
      "**`history.pushState()`:** añade una entrada; `replaceState()` la reemplaza.",
      "**`popstate`:** no se dispara con `replaceState()`.",
      "**`history.state`:** estado actual, modificable con `replaceState()`.",
      "**`location.replace()`:** redirige con recarga; `replaceState()` no recarga.",
      "**`URLSearchParams`:** manipula la query antes de reemplazar.",
      "**`history.length`:** no aumenta con `replaceState()`.",
    ],

    analogia:
      "El historial es un cuaderno con páginas numeradas 📓. `pushState()` añade una página nueva al final. `replaceState()` borra la página actual y escribe otra en su lugar: el número total de páginas no cambia y quien hojea hacia atrás no verá la página borrada. Útil para corregir una URL sin que el lector se entere.",

    fuente: "MDN Web Docs · History API · HTML Standard",

    notasPersonales: [
      "✅ Reemplaza la entrada actual, no añade.",
      "✅ No dispara `popstate` ni aumenta `history.length`.",
      "✅ Ideal para limpiar parámetros y normalizar URLs.",
      "⚠️ El botón Atrás no volverá a la URL reemplazada.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué hace history.replaceState()?",
        opciones: [
          "Añade una entrada nueva",
          "Reemplaza la entrada actual sin recargar",
          "Recarga la página",
          "Limpia todo el historial",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Aumenta history.length al usar replaceState()?",
        opciones: ["Sí, siempre", "No", "Solo con URL absoluta", "Solo en Chrome"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿El botón Atrás vuelve a la URL reemplazada?",
        opciones: [
          "Sí, siempre",
          "No, esa entrada se pierde",
          "Solo si usas hash",
          "Solo en Firefox",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Para qué es especialmente útil replaceState()?",
        opciones: [
          "Para añadir pasos al historial",
          "Para limpiar parámetros y normalizar URLs",
          "Para recargar la página",
          "Para abrir otra pestaña",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué evento NO dispara replaceState()?",
        opciones: ["load", "popstate", "hashchange", "fullscreenchange"],
        correcta: 1,
      },
    ],
  },
};
