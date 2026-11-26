/* Apuntes interactivos: Palabras reservadas y estructuras de JavaScript. */

const arbol = (label, detalle, hijos = []) => ({
  raiz: {
    label,
    detalle,
    hijos: hijos.map(([emoji, label, detalle]) => ({ emoji, label, detalle })),
  },
});

const analogia = (centro, nodos = [], nota = "") => ({
  centro,
  nota,
  nodos: nodos.map(([emoji, label, detalle]) => ({ emoji, label, detalle })),
});

const paso = (linea, vars, salida, nota, pila = ["global"]) => ({
  linea,
  pila,
  vars,
  salida,
  nota,
});

const sc = (titulo, codigo, lineas, resumen = []) => ({
  titulo,
  codigo,
  lineas,
  resumen,
});

const ln = (texto, tipo, ambito, antes, despues, detalle) => ({
  texto,
  tipo,
  ambito,
  antes,
  despues,
  detalle,
});

const DOCS = [
  /* ============================================================
     1 · var, let y const
     ============================================================ */
  {
    id: "js-var-let-const",
    titulo: "var, let y const",
    icon: "📦",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "var x = 1; let y = 2; const Z = 3;",
    definicion: [
      "`var`, `let` y `const` son **palabras reservadas** que declaran variables en JavaScript. Cambian el ámbito, la forma de inicializarse y si la referencia puede reasignarse.",
    ],
    queEs: [
      "`var` declara con **ámbito de función** y se eleva al inicio de su ámbito con valor `undefined`.",
      "`let` declara con **ámbito de bloque** y sufre la **TDZ** (zona temporal muerta): no se puede leer antes de la declaración.",
      "`const` también es de bloque, **obliga a inicializar** y no permite reasignar la referencia (aunque el contenido de un objeto sí puede cambiar).",
    ],
    paraQueSirve: [
      "`var` mantiene código antiguo y funciones que necesitan una variable visible en toda la función.",
      "`let` sirve para valores que cambian con el tiempo: contadores, acumuladores, estados.",
      "`const` expresa intención: un valor que no debe reasignarse. Es la opción por defecto en código moderno.",
    ],
    comoFunciona: [
      "El motor crea el **entorno léxico** de cada función y de cada bloque antes de ejecutarlo.",
      "En la fase de creación, `var` y las funciones se registran y se inicializan (con `undefined` o con la función completa).",
      "`let` y `const` también se registran, pero quedan en **TDZ** hasta que la ejecución llega a su línea.",
      "Al salir del bloque o de la función, sus bindings dejan de existir y se liberan.",
    ],
    sintaxis: [
      { caption: "Declaración y asignación", code: 'var contador = 1;\nlet nombre = "Ana";\nconst PI = 3.1416;\n\nlet pendiente;      // válido: queda undefined\n// const fijo;      // ❌ SyntaxError: falta inicializador' },
      { caption: "Ámbitos", code: 'function demo() {\n  var visibleEnTodaLaFuncion = "sí";\n  if (true) {\n    let soloEnElBloque = "sí";\n    const TAMBIEN = "solo aquí";\n  }\n  // console.log(soloEnElBloque); // ❌ ReferenceError\n}' },
    ],
    nota: "Regla práctica: usa `const` por defecto, `let` cuando el valor cambie y evita `var` salvo que mantengas código antiguo.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Cambiar un contador",
        descripcion: "`let` permite reasignar; `const` no.",
        code: 'let intentos = 0;\nintentos += 1;\nconsole.log(intentos); // 1\n\nconst MAX = 3;\n// MAX = 5; // ❌ TypeError: Assignment to constant variable',
      },
      {
        titulo: "Ejemplo 2 · Ámbito de bloque",
        descripcion: "Un `let` declarado dentro de un `if` no existe fuera.",
        code: 'if (true) {\n  let mensaje = "hola";\n  console.log(mensaje); // "hola"\n}\n\n// console.log(mensaje); // ❌ ReferenceError',
      },
      {
        titulo: "Ejemplo 3 · const con objetos",
        descripcion: "No puedes cambiar la referencia, pero sí mutar el contenido.",
        code: 'const usuario = { nombre: "Ana" };\nusuario.nombre = "Luis"; // ✅ permitido\nconsole.log(usuario.nombre); // "Luis"\n\n// usuario = {}; // ❌ TypeError',
      },
    ],
    errores: [
      {
        texto: "**Reasignar una constante**: `const` bloquea la reasignación de la referencia.",
        code: '// ❌ TypeError\nconst IVA = 0.21;\nIVA = 0.19;\n\n// ✅ Si el valor cambia, usa let\nlet iva = 0.21;\niva = 0.19;',
      },
      {
        texto: "**Leer un `let` antes de declararlo**: entra en TDZ y lanza `ReferenceError`.",
        code: '// ❌ ReferenceError: Cannot access "total" before initialization\nconsole.log(total);\nlet total = 10;\n\n// ✅ Declara antes de usar\nlet total2 = 10;\nconsole.log(total2);',
      },
      {
        texto: "**Confiar en `var` dentro de un bloque**: se filtra fuera del `if` o del `for`.",
        code: '// ❌ Se filtra\nif (true) {\n  var fuga = "visible fuera";\n}\nconsole.log(fuga); // "visible fuera"\n\n// ✅ let respeta el bloque\nif (true) {\n  let segura = "solo dentro";\n}',
      },
    ],
    casos: [
      "Guardar configuración que no debe reasignarse con `const`.",
      "Llevar contadores y acumuladores con `let`.",
      "Mantener funciones antiguas que dependen del ámbito de función de `var`.",
      "Evitar fugas de variables en bucles y condicionales usando `let`.",
    ],
    relacion: [
      "**Hoisting**: `var` y `function` se elevan; `let` y `const` quedan en TDZ.",
      "**Ámbito léxico**: `let` y `const` crean bindings por bloque; `var` por función.",
      "**Closures**: las funciones recuerdan el binding, no una copia del valor.",
      "**for**: `let` crea un binding nuevo por iteración; `var` comparte uno solo.",
      "**Reasignación**: solo `let` y `var` la permiten.",
    ],
    analogia:
      "Imagina tres tipos de taquillas. `var` es una taquilla de toda la planta: cualquiera en esa función puede abrirla, incluso antes de que la etiquetes (y al principio está vacía). `let` es una taquilla de una sala: solo existe mientras estás en esa sala y no puedes abrirla antes de etiquetarla. `const` es una taquilla sellada: la etiqueta no se cambia, aunque puedes mover cosas dentro de la caja.",
    analogiaDiagrama: analogia(
      "var, let y const",
      [
        ["🏢", "var · toda la planta", "Ámbito de función. Se eleva y empieza como undefined."],
        ["🚪", "let · una sala", "Ámbito de bloque. No se puede leer antes de su línea (TDZ)."],
        ["🔒", "const · taquilla sellada", "Bloque + sin reasignación. El contenido sí puede mutar."],
        ["⏳", "TDZ", "Zona temporal muerta: el binding existe, pero está bloqueado."],
      ],
      "Las tres declaraciones crean bindings; lo que cambia es dónde viven y cuándo se pueden usar.",
    ),
    relacionArbol: arbol("var, let y const", "Declaración de variables", [
      ["🏢", "var", "Ámbito de función · hoisting con undefined"],
      ["🚪", "let", "Ámbito de bloque · TDZ"],
      ["🔒", "const", "Ámbito de bloque · sin reasignación"],
      ["⏳", "Hoisting / TDZ", "Cuándo existe y cuándo se puede leer el binding"],
      ["🔁", "for y closures", "let crea un binding nuevo en cada vuelta"],
    ]),
    demo: {
      codigo: `var contador = 1;
let nombre = "Ana";
const PI = 3.14;

function saludar() {
  var local = "hola";
  let bloque = "mundo";
  console.log(contador, nombre, PI);
  console.log(local, bloque);
}

saludar();
console.log(typeof local);`,
      pasos: [
        paso(1, { contador: "1" }, "", "var se registra en el ámbito global y queda inicializado."),
        paso(2, { contador: "1", nombre: '"Ana"' }, "", "let vive en el bloque global; ya pasó su TDZ."),
        paso(3, { contador: "1", nombre: '"Ana"', PI: "3.14" }, "", "const exige un valor en la misma línea."),
        paso(5, { contador: "1", nombre: '"Ana"', PI: "3.14", saludar: "ƒ saludar()" }, "", "La declaración de función se eleva completa: ya se puede llamar."),
        paso(6, { contador: "1", nombre: '"Ana"', PI: "3.14", local: '"hola"' }, "", "local es una var propia de saludar.", ["global", "saludar()"]),
        paso(7, { contador: "1", nombre: '"Ana"', PI: "3.14", local: '"hola"', bloque: '"mundo"' }, "", "bloque es un let del bloque de la función.", ["global", "saludar()"]),
        paso(8, { contador: "1", nombre: '"Ana"', PI: "3.14", local: '"hola"', bloque: '"mundo"' }, '1 "Ana" 3.14', "La función lee variables externas por la cadena de ámbito.", ["global", "saludar()"]),
        paso(9, { contador: "1", nombre: '"Ana"', PI: "3.14", local: '"hola"', bloque: '"mundo"' }, '1 "Ana" 3.14\n"hola" "mundo"', "Las variables locales solo existen dentro de la función.", ["global", "saludar()"]),
        paso(12, { contador: "1", nombre: '"Ana"', PI: "3.14", saludar: "ƒ saludar()" }, '1 "Ana" 3.14\n"hola" "mundo"', "Al volver, el frame de saludar desaparece de la pila.", ["global"]),
        paso(13, { contador: "1", nombre: '"Ana"', PI: "3.14", saludar: "ƒ saludar()" }, '1 "Ana" 3.14\n"hola" "mundo"\n"undefined"', "typeof local no lanza error: una variable inexistente devuelve undefined.", ["global"]),
      ],
    },
    scope: sc(
      "Tres declaraciones, tres comportamientos",
      `console.log(a); // undefined
var a = 1;

console.log(b); // ReferenceError (TDZ)
let b = 2;

const c = 3;
c = 4; // TypeError

function demo() {
  var x = 10;
  if (true) {
    let y = 20;
  }
  console.log(x, typeof y);
}`,
      [
        ln("var a = 1;", "var", "global", "undefined", "1", "var se eleva al inicio del ámbito global y empieza como undefined."),
        ln("let b = 2;", "let", "global", "TDZ", "2", "let existe desde el inicio, pero está bloqueado hasta esta línea."),
        ln("const c = 3;", "const", "global", "TDZ", "3", "const se comporta como let, y además exige inicialización."),
        ln("c = 4;", "expresion", "global", "—", "TypeError", "Reasignar una constante lanza TypeError en modo estricto."),
        ln("function demo() {", "function", "global", "ƒ demo()", "ƒ demo()", "La función se eleva completa: se puede llamar antes de esta línea."),
        ln("var x = 10;", "var", "demo", "undefined", "10", "var x solo vive dentro de demo."),
        ln("let y = 20;", "let", "bloque if", "TDZ", "20", "y solo vive dentro del bloque del if."),
        ln("console.log(x, typeof y);", "expresion", "demo", "—", '10 "undefined"', "typeof y no lanza error: fuera del bloque, y no existe."),
      ],
      [
        "`var` se eleva con undefined; `let` y `const` se elevan pero quedan en TDZ.",
        "`const` no permite reasignar la referencia, aunque el objeto pueda mutarse.",
        "El ámbito de bloque hace que `let y` desaparezca al cerrar el if.",
      ],
    ),
    editor: {
      consigna: "Cambia los valores y comprueba qué declaración sobrevive fuera del bloque. Intenta reasignar la constante para ver el TypeError.",
      inicial: `var a = 1;
let b = 2;
const c = 3;

if (true) {
  var dentroVar = "var se filtra";
  let dentroLet = "let se queda";
  console.log(dentroVar, dentroLet);
}

console.log(a, b, c);
console.log(dentroVar);
console.log(typeof dentroLet);

// c = 99;
// console.log(c);`,
      pista: "Quita el comentario de c = 99 para ver el error de const.",
    },
    bugs: [
      {
        titulo: "Reasignar const",
        codigo: 'const IVA = 0.21;\nIVA = 0.19;\nconsole.log(IVA);',
        problemas: [
          "`IVA` se declaró con const: la referencia no puede reasignarse.",
          "El error real es TypeError: Assignment to constant variable.",
        ],
        corregido: "let IVA = 0.21;\nIVA = 0.19;\nconsole.log(IVA); // 0.19",
        explicacion: "Si el valor cambia durante el programa, la declaración correcta es let.",
      },
      {
        titulo: "Leer antes de declarar",
        codigo: "console.log(total);\nlet total = 10;",
        problemas: [
          "`total` está en TDZ hasta la línea de su declaración.",
          "Se lanza ReferenceError: Cannot access 'total' before initialization.",
        ],
        corregido: "let total = 10;\nconsole.log(total); // 10",
        explicacion: "Con let y const, primero se declara y después se usa.",
      },
      {
        titulo: "var se escapa del bloque",
        codigo: 'if (true) {\n  var mensaje = "hola";\n}\nconsole.log(mensaje);',
        problemas: [
          "`var` no respeta el bloque del if: se declara en toda la función.",
          "La variable queda visible fuera, lo que suele causar fugas y colisiones.",
        ],
        corregido: 'let mensaje = "fuera";\nif (true) {\n  mensaje = "hola";\n}\nconsole.log(mensaje); // "hola"',
        explicacion: "Declara una sola vez en el ámbito adecuado y asigna dentro del bloque.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué diferencia clave tiene `var` frente a `let`?",
        opciones: [
          "`var` tiene ámbito de función y `let` de bloque.",
          "`var` no se puede reasignar y `let` sí.",
          "`let` se eleva y `var` no.",
          "`var` solo acepta números.",
        ],
        correcta: 0,
        explicacion: "var vive en toda la función; let muere al cerrar el bloque donde se declaró.",
        pista: "Piensa en un if o en un for.",
      },
      {
        id: 2,
        pregunta: "¿Qué ocurre al leer una variable `let` antes de su declaración?",
        opciones: [
          "Devuelve undefined.",
          "Lanza ReferenceError por la TDZ.",
          "Devuelve null.",
          "Se crea automáticamente como global.",
        ],
        correcta: 1,
        explicacion: "El binding existe, pero está en la zona temporal muerta y no se puede leer.",
        pista: "TDZ significa zona temporal muerta.",
      },
      {
        id: 3,
        pregunta: "`const usuario = { nombre: \"Ana\" };` ¿Qué está permitido?",
        opciones: [
          "`usuario = { nombre: \"Luis\" };`",
          "`usuario.nombre = \"Luis\";`",
          "`delete usuario;`",
          "Nada: const congela el objeto.",
        ],
        correcta: 1,
        explicacion: "const bloquea la reasignación de la referencia, no la mutación del objeto.",
        pista: "La taquilla está sellada, pero puedes mover cosas dentro.",
      },
      {
        id: 4,
        pregunta: "¿Qué declaración conviene por defecto en código moderno?",
        opciones: ["`var`", "`let`", "`const`", "Ninguna, usa variables globales."],
        correcta: 2,
        explicacion: "const expresa que la referencia no cambiará y ayuda a evitar errores.",
        pista: "La opción más restrictiva que siga funcionando.",
      },
    ],
    fuente:
      "MDN Web Docs – var, let y const · ECMAScript Language Specification – Declarations and Scope · JavaScript.info – Variable scope, closure",
  },

  /* ============================================================
     2 · if
     ============================================================ */
  {
    id: "js-if",
    titulo: "Condicional simple (if)",
    icon: "🔀",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "if (condicion) { ... }",
    definicion: [
      "`if` es una **estructura de control** que ejecuta un bloque de código solo cuando una condición se evalúa como verdadera.",
    ],
    queEs: [
      "Es la bifurcación más básica de JavaScript: una pregunta con una sola respuesta posible.",
      "La condición se convierte a booleano mediante **coerción**: `0`, `\"\"`, `null`, `undefined`, `NaN` y `false` son falsy.",
      "El bloque puede contener una o varias sentencias; si es una sola, las llaves son opcionales (pero recomendables).",
    ],
    paraQueSirve: [
      "Validar datos antes de continuar (por ejemplo, que una edad sea mayor de 18).",
      "Evitar operaciones peligrosas cuando falta información.",
      "Activar funciones opcionales según una configuración.",
      "Filtrar el flujo principal de un programa.",
    ],
    comoFunciona: [
      "JavaScript evalúa la expresión entre paréntesis y obtiene un valor.",
      "Ese valor se convierte a booleano con `Boolean(valor)`.",
      "Si es `true`, entra al bloque; si es `false`, lo salta.",
      "Al terminar el bloque (o si no entra), la ejecución continúa en la siguiente instrucción.",
    ],
    sintaxis: [
      { caption: "Forma recomendada", code: 'if (condicion) {\n  // se ejecuta solo si condicion es verdadera\n}' },
      { caption: "Condición compuesta", code: 'if (edad >= 18 && tieneDocumento) {\n  console.log("Puede votar");\n}' },
      { caption: "Una sola sentencia", code: 'if (activo) console.log("Encendido");\n// Válido, pero las llaves evitan errores al ampliar el bloque.' },
    ],
    nota: "No confundas `=` (asignación) con `===` (comparación estricta). `if (x = 5)` asigna y casi siempre es un bug.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Mayoría de edad",
        descripcion: "Solo muestra el mensaje cuando la condición es verdadera.",
        code: 'const edad = 20;\n\nif (edad >= 18) {\n  console.log("Puedes votar");\n}\n\nconsole.log("Fin del programa");',
      },
      {
        titulo: "Ejemplo 2 · Valores falsy",
        descripcion: "Una cadena vacía y el número 0 no entran al bloque.",
        code: 'const nombre = "";\n\nif (nombre) {\n  console.log("Hola, " + nombre);\n} else {\n  console.log("Falta el nombre");\n}',
      },
      {
        titulo: "Ejemplo 3 · Guard clause",
        descripcion: "Salir pronto si falta un dato evita anidar el resto del código.",
        code: 'function dividir(a, b) {\n  if (b === 0) return "No se puede dividir entre 0";\n  return a / b;\n}\n\nconsole.log(dividir(10, 2)); // 5',
      },
    ],
    errores: [
      {
        texto: "**Usar asignación en la condición**: `if (x = 0)` asigna 0 y nunca entra.",
        code: '// ❌ Asigna, no compara\nif (estado = "activo") {\n  console.log("activo");\n}\n\n// ✅ Compara\nif (estado === "activo") {\n  console.log("activo");\n}',
      },
      {
        texto: "**Olvidar las llaves y añadir otra línea**: solo la primera sentencia queda dentro del if.",
        code: '// ❌ Solo se protege la primera línea\nif (activo)\n  console.log("Encendido");\n  console.log("Siempre se ejecuta");\n\n// ✅ Bloque claro\nif (activo) {\n  console.log("Encendido");\n  console.log("También protegido");\n}',
      },
      {
        texto: "**Poner un punto y coma después de la condición**: el if queda vacío.",
        code: '// ❌ El ; cierra el if\nif (edad >= 18);\n{\n  console.log("Siempre se ejecuta");\n}\n\n// ✅ Sin ;\nif (edad >= 18) {\n  console.log("Puedes votar");\n}',
      },
    ],
    casos: [
      "Validar formularios antes de enviarlos.",
      "Comprobar permisos o sesiones activas.",
      "Mostrar un mensaje de error solo si falta un campo.",
      "Evitar dividir entre cero o acceder a propiedades inexistentes.",
    ],
    relacion: [
      "**if...else**: añade el camino alternativo cuando la condición es falsa.",
      "**if anidado / else if**: encadena varias condiciones.",
      "**Operador ternario**: versión corta para elegir entre dos valores.",
      "**Operadores lógicos**: `&&`, `||` y `!` construyen condiciones compuestas.",
      "**switch**: alternativa cuando se comparan muchos valores exactos.",
    ],
    analogia:
      "Un `if` es el portero de un edificio: si muestras la credencial correcta, te deja pasar; si no, sigues tu camino sin entrar. El portero no hace nada más: solo decide si abres la puerta o no.",
    analogiaDiagrama: analogia(
      "if (condición)",
      [
        ["❓", "Pregunta", "La condición se evalúa una vez."],
        ["✅", "Camino true", "Si es verdadera, entra al bloque."],
        ["⏭️", "Camino false", "Si es falsa, salta el bloque."],
        ["➡️", "Continuación", "Después del if, el programa sigue igual."],
      ],
      "El if no repite ni espera: decide una vez y continúa.",
    ),
    relacionArbol: arbol("if", "Bifurcación simple", [
      ["❓", "Condición", "Expresión que se convierte a booleano"],
      ["✅", "Bloque true", "Código que se ejecuta si es verdadera"],
      ["➡️", "Siguiente instrucción", "El flujo continúa después del if"],
      ["🔗", "if...else", "Añade el camino falso"],
      ["🎯", "Ternario", "Forma corta para dos valores"],
    ]),
    demo: {
      codigo: `const edad = 20;

if (edad >= 18) {
  console.log("Puedes votar");
}

console.log("Fin del programa");`,
      pasos: [
        paso(1, { edad: "20" }, "", "Se declara la edad en el ámbito global."),
        paso(3, { edad: "20" }, "", "Se evalúa edad >= 18. El resultado es true."),
        paso(4, { edad: "20" }, "Puedes votar", "Como la condición es verdadera, entra al bloque."),
        paso(7, { edad: "20" }, "Puedes votar\nFin del programa", "El bloque termina y el flujo sigue con la siguiente instrucción."),
      ],
    },
    scope: sc(
      "if no crea un ámbito para var, pero sí para let",
      `let edad = 20;
if (edad >= 18) {
  var mensaje = "mayor";
  let detalle = "también mayor";
  console.log(mensaje, detalle);
}
console.log(mensaje);
console.log(typeof detalle);`,
      [
        ln("let edad = 20;", "let", "global", "TDZ", "20", "edad vive en el bloque global."),
        ln("if (edad >= 18) {", "expresion", "global", "—", "true", "La condición se evalúa y abre un bloque nuevo."),
        ln('var mensaje = "mayor";', "var", "global", "undefined", '"mayor"', "var no respeta el bloque: pertenece al ámbito global."),
        ln('let detalle = "también mayor";', "let", "bloque if", "TDZ", '"también mayor"', "let sí vive solo dentro del bloque del if."),
        ln("console.log(mensaje);", "expresion", "global", "—", '"mayor"', "mensaje sigue existiendo fuera del if."),
        ln("console.log(typeof detalle);", "expresion", "global", "—", '"undefined"', "detalle ya no existe; typeof evita el ReferenceError."),
      ],
      [
        "La condición puede declarar variables dentro del bloque, pero solo let/const quedan limitadas.",
        "Usa let dentro del if si no necesitas la variable fuera.",
      ],
    ),
    editor: {
      consigna: "Prueba edades distintas, valores falsy y condiciones compuestas. Predice antes de ejecutar si entra o no.",
      inicial: `const edad = 20;
const tieneDocumento = true;

if (edad >= 18 && tieneDocumento) {
  console.log("Puedes votar");
}

if ("") {
  console.log("Esto no se ve");
}

if (0) {
  console.log("Tampoco esto");
}

console.log("Fin");`,
      pista: "Cambia edad a 15 y observa el resultado.",
    },
    bugs: [
      {
        titulo: "Asignación en vez de comparación",
        codigo: 'let estado = "inactivo";\nif (estado = "activo") {\n  console.log("Activo");\n}\nconsole.log(estado);',
        problemas: [
          "La condición usa = y asigna \"activo\" a estado.",
          "La asignación devuelve \"activo\", que es truthy: siempre entra.",
          "El valor original se pierde.",
        ],
        corregido: 'let estado = "inactivo";\nif (estado === "activo") {\n  console.log("Activo");\n}',
        explicacion: "Usa === para comparar sin coerción. El linter moderno detecta esta asignación.",
      },
      {
        titulo: "Punto y coma después del if",
        codigo: 'const activo = false;\nif (activo);\n{\n  console.log("Siempre se ejecuta");\n}',
        problemas: [
          "El ; cierra el if y deja su cuerpo vacío.",
          "El bloque de llaves ya no pertenece al if: se ejecuta siempre.",
        ],
        corregido: 'const activo = false;\nif (activo) {\n  console.log("Solo si está activo");\n}',
        explicacion: "Nunca pongas ; entre la condición y el bloque.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Cuándo ejecuta su bloque un `if`?",
        opciones: [
          "Cuando la condición es truthy.",
          "Siempre, al menos una vez.",
          "Solo cuando la condición es exactamente true.",
          "Cuando la condición es null.",
        ],
        correcta: 0,
        explicacion: "Cualquier valor truthy activa el bloque; no hace falta que sea el booleano true.",
      },
      {
        id: 2,
        pregunta: "¿Cuál de estos valores es falsy?",
        opciones: ["`\"0\"`", "`[]`", "`0`", "`\"false\"`"],
        correcta: 2,
        explicacion: "El número 0 es falsy; las cadenas no vacías y los arrays son truthy.",
        pista: "El texto \"false\" no es el booleano false.",
      },
      {
        id: 3,
        pregunta: "¿Qué problema tiene `if (x = 5) {}`?",
        opciones: [
          "Ninguno, es una comparación.",
          "Asigna 5 a x y la condición queda truthy.",
          "Lanza SyntaxError.",
          "Solo funciona con números.",
        ],
        correcta: 1,
        explicacion: "= asigna; la expresión devuelve 5, que es truthy. Casi siempre es un bug.",
      },
      {
        id: 4,
        pregunta: "¿Qué hace `if (activo); { console.log(\"hola\"); }`?",
        opciones: [
          "Muestra hola solo si activo es true.",
          "No muestra nada nunca.",
          "Muestra hola siempre, porque el if está vacío.",
          "Lanza un error de sintaxis.",
        ],
        correcta: 2,
        explicacion: "El punto y coma cierra el if; el bloque posterior es independiente.",
      },
    ],
    fuente: "MDN Web Docs – if...else · ECMAScript – If Statement · JavaScript.info – Conditional branching",
  },

  /* ============================================================
     3 · if...else
     ============================================================ */
  {
    id: "js-if-else",
    titulo: "Condicional doble (if...else)",
    icon: "↔️",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "if (condicion) { ... } else { ... }",
    definicion: [
      "`if...else` es una estructura de control que ejecuta un bloque cuando la condición es verdadera y **otro bloque distinto** cuando es falsa.",
    ],
    queEs: [
      "Es una bifurcación con dos caminos **mutuamente excluyentes**: siempre se ejecuta uno y solo uno.",
      "El `else` no lleva condición: recoge todos los casos en los que el `if` no entró.",
      "Se pueden anidar o encadenar con `else if` para más de dos alternativas.",
    ],
    paraQueSirve: [
      "Dar una respuesta alternativa cuando falla una validación.",
      "Elegir entre dos valores o dos flujos de interfaz.",
      "Convertir un booleano en un mensaje legible.",
      "Implementar lógica de aprobado/suspendido, encendido/apagado, etc.",
    ],
    comoFunciona: [
      "Se evalúa la condición del `if`.",
      "Si es truthy, se ejecuta su bloque y se **omite** el `else`.",
      "Si es falsy, se ejecuta el bloque del `else`.",
      "Después, el programa continúa en la instrucción siguiente.",
    ],
    sintaxis: [
      { caption: "Forma básica", code: 'if (condicion) {\n  // camino verdadero\n} else {\n  // camino falso\n}' },
      { caption: "Con una sola sentencia", code: 'if (aprobado) console.log("Aprobado");\nelse console.log("Suspendido");' },
      { caption: "Equivalente con ternario", code: 'const mensaje = aprobado ? "Aprobado" : "Suspendido";' },
    ],
    nota: "El `else` debe ir inmediatamente después del bloque del `if`. Un punto y coma entre ambos rompe la estructura.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Aprobado o suspendido",
        descripcion: "Siempre se muestra uno de los dos mensajes.",
        code: 'const nota = 7;\n\nif (nota >= 5) {\n  console.log("Aprobado");\n} else {\n  console.log("Suspendido");\n}',
      },
      {
        titulo: "Ejemplo 2 · Validar un correo",
        descripcion: "El else permite explicar por qué no se puede continuar.",
        code: 'const correo = "ana@ejemplo.com";\n\nif (correo.includes("@")) {\n  console.log("Correo válido");\n} else {\n  console.log("Falta el @ en el correo");\n}',
      },
      {
        titulo: "Ejemplo 3 · Ternario para un valor",
        descripcion: "Si solo eliges un valor, el ternario es más breve.",
        code: 'const edad = 16;\nconst acceso = edad >= 18 ? "Permitido" : "Denegado";\nconsole.log(acceso); // "Denegado"',
      },
    ],
    errores: [
      {
        texto: "**Poner un punto y coma antes del else**: el else queda huérfano y lanza SyntaxError.",
        code: '// ❌ SyntaxError\nif (activo) {\n  console.log("Sí");\n};\nelse {\n  console.log("No");\n}',
      },
      {
        texto: "**Usar `else` sin `if`**: no existe un else independiente.",
        code: '// ❌ SyntaxError\nelse {\n  console.log("No");\n}\n\n// ✅ Primero el if\nif (activo) {\n  console.log("Sí");\n} else {\n  console.log("No");\n}',
      },
      {
        texto: "**Duplicar la condición en el else**: el else ya cubre el caso contrario.",
        code: '// ❌ Redundante\nif (edad >= 18) {\n  console.log("Mayor");\n} else if (edad < 18) {\n  console.log("Menor");\n}\n\n// ✅ El else ya lo cubre\nif (edad >= 18) {\n  console.log("Mayor");\n} else {\n  console.log("Menor");\n}',
      },
    ],
    casos: [
      "Mostrar “usuario válido” o “credenciales incorrectas” al iniciar sesión.",
      "Elegir entre tema claro y oscuro.",
      "Devolver un valor u otro desde una función.",
      "Validar un formulario y explicar el fallo.",
    ],
    relacion: [
      "**if**: solo tiene el camino verdadero.",
      "**else if**: añade más de dos alternativas.",
      "**Operador ternario**: versión compacta de if...else para valores.",
      "**switch**: mejor para muchos casos exactos.",
      "**Operadores lógicos**: permiten escribir condiciones compuestas.",
    ],
    analogia:
      "Es un cruce con dos salidas: si el semáforo está en verde, giras a la derecha; en cualquier otro caso, giras a la izquierda. No puedes tomar las dos salidas a la vez, y siempre tomas una.",
    analogiaDiagrama: analogia(
      "if...else",
      [
        ["🟢", "Rama true", "Se ejecuta solo si la condición es verdadera."],
        ["🔴", "Rama false", "Se ejecuta en todos los demás casos."],
        ["🚫", "Excluyentes", "Nunca se ejecutan las dos ramas."],
        ["➡️", "Continuación", "Después del else, el flujo sigue."],
      ],
      "Dos caminos, una sola decisión: el else recoge todo lo que no entró por el if.",
    ),
    relacionArbol: arbol("if...else", "Bifurcación doble", [
      ["✅", "if (condición)", "Evalúa la pregunta"],
      ["🟢", "Bloque true", "Camino cuando es verdadera"],
      ["🔴", "Bloque else", "Camino cuando es falsa"],
      ["🔗", "else if", "Extiende a más alternativas"],
      ["🎯", "Ternario", "Forma corta para dos valores"],
    ]),
    demo: {
      codigo: `const nota = 7;

if (nota >= 5) {
  console.log("Aprobado");
} else {
  console.log("Suspendido");
}

console.log("Boletín emitido");`,
      pasos: [
        paso(1, { nota: "7" }, "", "Se guarda la nota."),
        paso(3, { nota: "7" }, "", "7 >= 5 es true."),
        paso(4, { nota: "7" }, "Aprobado", "Se ejecuta la rama verdadera."),
        paso(8, { nota: "7" }, "Aprobado\nBoletín emitido", "El else se omite y el flujo continúa."),
      ],
    },
    scope: sc(
      "Cada rama tiene su propio bloque",
      `let nota = 7;
if (nota >= 5) {
  let resultado = "Aprobado";
  console.log(resultado);
} else {
  let resultado = "Suspendido";
  console.log(resultado);
}
console.log(typeof resultado);`,
      [
        ln("let nota = 7;", "let", "global", "TDZ", "7", "La nota vive en el ámbito global."),
        ln("if (nota >= 5) {", "expresion", "global", "—", "true", "La condición elige una rama."),
        ln('let resultado = "Aprobado";', "let", "bloque if", "TDZ", '"Aprobado"', "Esta variable solo existe en la rama verdadera."),
        ln('let resultado = "Suspendido";', "let", "bloque else", "TDZ", '"Suspendido"', "La rama falsa tiene su propio resultado, sin colisión."),
        ln("console.log(typeof resultado);", "expresion", "global", "—", '"undefined"', "Ninguna de las dos ramas deja la variable visible fuera."),
      ],
      [
        "Cada bloque del if y del else crea un ámbito para let y const.",
        "Puedes reutilizar el mismo nombre en ramas distintas sin conflicto.",
      ],
    ),
    editor: {
      consigna: "Prueba notas altas, bajas y valores no numéricos. Añade un else if para distinguir sobresaliente.",
      inicial: `const nota = 7;

if (nota >= 5) {
  console.log("Aprobado");
} else {
  console.log("Suspendido");
}

console.log("Fin");`,
      pista: "Cambia la nota a 3 y luego a 10.",
    },
    bugs: [
      {
        titulo: "Punto y coma antes del else",
        codigo: 'const activo = true;\nif (activo) {\n  console.log("Sí");\n};\nelse {\n  console.log("No");\n}',
        problemas: [
          "El ; después del bloque del if termina la sentencia.",
          "El else queda sin un if al que pertenecer y lanza SyntaxError.",
        ],
        corregido: 'const activo = true;\nif (activo) {\n  console.log("Sí");\n} else {\n  console.log("No");\n}',
        explicacion: "Elimina el punto y coma entre el cierre del if y el else.",
      },
      {
        titulo: "Condición duplicada",
        codigo: 'const edad = 20;\nif (edad >= 18) {\n  console.log("Mayor");\n} else if (edad < 18) {\n  console.log("Menor");\n}',
        problemas: [
          "El else if repite la negación exacta del if.",
          "Si edad no es un número, ningún caso se ejecuta.",
        ],
        corregido: 'const edad = 20;\nif (edad >= 18) {\n  console.log("Mayor");\n} else {\n  console.log("Menor");\n}',
        explicacion: "El else cubre todos los casos restantes sin repetir la condición.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Cuántas ramas de un `if...else` se ejecutan?",
        opciones: ["Siempre una.", "Siempre dos.", "Ninguna si la condición es false.", "Depende del número de else."],
        correcta: 0,
        explicacion: "Las ramas son excluyentes: exactamente una se ejecuta.",
      },
      {
        id: 2,
        pregunta: "¿Qué contiene el bloque `else`?",
        opciones: [
          "Los casos en los que la condición del if fue falsa.",
          "Una copia de la condición.",
          "Solo el valor false.",
          "Las excepciones del programa.",
        ],
        correcta: 0,
        explicacion: "else no lleva condición: recoge todo lo que no entró por el if.",
      },
      {
        id: 3,
        pregunta: "¿Qué provoca `if (x) {}; else {}`?",
        opciones: ["Nada, es válido.", "Un SyntaxError por el else huérfano.", "Un TypeError en tiempo de ejecución.", "Que se ejecuten las dos ramas."],
        correcta: 1,
        explicacion: "El punto y coma separa el else del if y el parser no sabe a qué if pertenece.",
      },
      {
        id: 4,
        pregunta: "¿Qué forma es más breve para elegir entre dos valores?",
        opciones: ["if...else", "switch", "Operador ternario", "while"],
        correcta: 2,
        explicacion: "`condicion ? valorSiTrue : valorSiFalse` elige un valor sin bloques.",
      },
    ],
    fuente: "MDN Web Docs – if...else · JavaScript.info – Conditional branching · ECMAScript – If Statement",
  },

  /* ============================================================
     4 · if anidado / else if
     ============================================================ */
  {
    id: "js-if-anidado",
    titulo: "Condicional anidado (if...else if...else)",
    icon: "🪆",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "if (a) { ... } else if (b) { ... } else { ... }",
    definicion: [
      "Un **condicional anidado** es un `if` dentro de otro `if`, o una cadena `if...else if...else` que evalúa varias condiciones en orden hasta encontrar la primera verdadera.",
    ],
    queEs: [
      "Es una escalera de decisiones: se comprueba la primera condición, luego la segunda, y así sucesivamente.",
      "En cuanto una condición es verdadera, se ejecuta su bloque y **se ignoran las demás**.",
      "El `else` final es opcional y actúa como red de seguridad para los casos no cubiertos.",
    ],
    paraQueSirve: [
      "Clasificar valores en varios rangos (notas, edades, niveles).",
      "Elegir entre más de dos alternativas de interfaz o de negocio.",
      "Aplicar reglas en cascada donde el orden importa.",
      "Sustituir cadenas de if...else cuando se comparan valores exactos (switch).",
    ],
    comoFunciona: [
      "Se evalúa la primera condición.",
      "Si es truthy, se ejecuta su bloque y se sale de toda la cadena.",
      "Si es falsy, se pasa a la siguiente condición (`else if`).",
      "Si ninguna se cumple, se ejecuta el `else` final (si existe).",
    ],
    sintaxis: [
      { caption: "Cadena else if", code: 'if (nota >= 9) {\n  console.log("Sobresaliente");\n} else if (nota >= 7) {\n  console.log("Notable");\n} else if (nota >= 5) {\n  console.log("Aprobado");\n} else {\n  console.log("Suspendido");\n}' },
      { caption: "if anidado dentro de otro if", code: 'if (usuario) {\n  if (usuario.activo) {\n    console.log("Bienvenido");\n  }\n}' },
    ],
    nota: "Ordena las condiciones de la más específica a la más general. Si pones primero `nota >= 5`, nunca llegarás a `nota >= 9`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Clasificar una nota",
        descripcion: "Las condiciones se evalúan de arriba abajo.",
        code: 'const nota = 8;\n\nif (nota >= 9) {\n  console.log("Sobresaliente");\n} else if (nota >= 7) {\n  console.log("Notable");\n} else if (nota >= 5) {\n  console.log("Aprobado");\n} else {\n  console.log("Suspendido");\n}',
      },
      {
        titulo: "Ejemplo 2 · if anidado",
        descripcion: "El segundo if solo se evalúa si el primero fue verdadero.",
        code: 'const usuario = { nombre: "Ana", activo: true };\n\nif (usuario) {\n  if (usuario.activo) {\n    console.log("Bienvenida, " + usuario.nombre);\n  }\n}',
      },
      {
        titulo: "Ejemplo 3 · Salida temprana",
        descripcion: "Los retornos tempranos evitan anidar demasiado.",
        code: 'function clasificar(nota) {\n  if (nota < 0 || nota > 10) return "Nota inválida";\n  if (nota >= 9) return "Sobresaliente";\n  if (nota >= 7) return "Notable";\n  if (nota >= 5) return "Aprobado";\n  return "Suspendido";\n}',
      },
    ],
    errores: [
      {
        texto: "**Orden incorrecto de las condiciones**: la primera condición general se come los casos específicos.",
        code: '// ❌ nota >= 5 atrapa también 9 y 10\nif (nota >= 5) {\n  console.log("Aprobado");\n} else if (nota >= 9) {\n  console.log("Sobresaliente");\n}\n\n// ✅ De más específica a más general\nif (nota >= 9) {\n  console.log("Sobresaliente");\n} else if (nota >= 5) {\n  console.log("Aprobado");\n}',
      },
      {
        texto: "**Escribir `elseif` o `else if` mal separado**: JavaScript espera `else if` con espacio.",
        code: '// ❌ SyntaxError\nif (a) {\n} elseif (b) {\n}\n\n// ✅\nif (a) {\n} else if (b) {\n}',
      },
      {
        texto: "**El `else` colgante**: sin llaves, el else se asocia al if más cercano.",
        code: '// ❌ El else pertenece al if interno\nif (a)\n  if (b)\n    console.log("AB");\n  else\n    console.log("¿A sin B?");\n\n// ✅ Llaves explícitas\nif (a) {\n  if (b) console.log("AB");\n} else {\n  console.log("No A");\n}',
      },
    ],
    casos: [
      "Clasificar niveles: bajo, medio, alto, crítico.",
      "Calcular descuentos por tramos de compra.",
      "Determinar el estado de un pedido según varias banderas.",
      "Validar datos en capas: primero obligatorio, luego formato, luego rango.",
    ],
    relacion: [
      "**if**: una sola condición.",
      "**if...else**: dos caminos.",
      "**switch**: alternativa cuando todos los casos comparan el mismo valor exacto.",
      "**Retorno temprano**: evita anidar y mejora la legibilidad.",
      "**Operadores lógicos**: pueden simplificar condiciones anidadas.",
    ],
    analogia:
      "Es una escalera de filtros: primero pasas el filtro de “¿es sobresaliente?”, luego el de “¿es notable?”, después el de “¿aprobado?”. En cuanto un filtro te acepta, dejas de bajar por la escalera. El último escalón (else) recoge a quienes no pasaron ninguno.",
    analogiaDiagrama: analogia(
      "if...else if...else",
      [
        ["🥇", "Primera condición", "Se evalúa siempre primero."],
        ["🥈", "Siguientes condiciones", "Solo se evalúan si las anteriores fallaron."],
        ["🚪", "Primera verdadera", "Se ejecuta y se sale de la cadena."],
        ["🛟", "else final", "Recoge los casos no cubiertos."],
      ],
      "El orden de la escalera cambia el resultado: coloca primero lo más específico.",
    ),
    relacionArbol: arbol("if...else if...else", "Cadena de decisiones", [
      ["1️⃣", "if (condición 1)", "Primera pregunta"],
      ["2️⃣", "else if (condición 2)", "Solo si la anterior fue falsa"],
      ["3️⃣", "else if (condición 3)", "Sigue bajando la escalera"],
      ["🛟", "else", "Caso por defecto"],
      ["🪆", "if anidado", "Un if dentro de otro bloque"],
    ]),
    demo: {
      codigo: `const nota = 8;

if (nota >= 9) {
  console.log("Sobresaliente");
} else if (nota >= 7) {
  console.log("Notable");
} else if (nota >= 5) {
  console.log("Aprobado");
} else {
  console.log("Suspendido");
}`,
      pasos: [
        paso(1, { nota: "8" }, "", "Se guarda la nota."),
        paso(3, { nota: "8" }, "", "8 >= 9 es false: se pasa al else if."),
        paso(5, { nota: "8" }, "", "8 >= 7 es true: se elige esta rama."),
        paso(6, { nota: "8" }, "Notable", "Se ejecuta el bloque y se ignoran las condiciones siguientes."),
        paso(12, { nota: "8" }, "Notable", "La cadena termina; el else final no se evalúa."),
      ],
    },
    scope: sc(
      "Cada rama tiene su propio ámbito de bloque",
      `const nota = 8;
let nivel;

if (nota >= 9) {
  let etiqueta = "Sobresaliente";
  nivel = etiqueta;
} else if (nota >= 7) {
  let etiqueta = "Notable";
  nivel = etiqueta;
} else {
  let etiqueta = "Suspendido";
  nivel = etiqueta;
}

console.log(nivel);
console.log(typeof etiqueta);`,
      [
        ln("const nota = 8;", "const", "global", "TDZ", "8", "nota queda fija en el ámbito global."),
        ln("let nivel;", "let", "global", "TDZ", "undefined", "nivel se declara fuera para poder asignarlo en cualquier rama."),
        ln('let etiqueta = "Sobresaliente";', "let", "bloque if", "TDZ", '"Sobresaliente"', "etiqueta solo existe en la primera rama."),
        ln('let etiqueta = "Notable";', "let", "bloque else if", "TDZ", '"Notable"', "Otra etiqueta independiente en la segunda rama."),
        ln('let etiqueta = "Suspendido";', "let", "bloque else", "TDZ", '"Suspendido"', "La tercera rama también tiene su propia etiqueta."),
        ln("console.log(nivel);", "expresion", "global", "—", '"Notable"', "nivel conserva el valor asignado por la rama elegida."),
        ln("console.log(typeof etiqueta);", "expresion", "global", "—", '"undefined"', "etiqueta era local de la rama y ya no existe."),
      ],
      [
        "Declara fuera la variable que necesites conservar después de la cadena.",
        "Las variables let/const de cada rama mueren al cerrar su bloque.",
      ],
    ),
    editor: {
      consigna: "Cambia la nota y comprueba el orden. Después reordena las condiciones para provocar el bug clásico.",
      inicial: `const nota = 8;

if (nota >= 9) {
  console.log("Sobresaliente");
} else if (nota >= 7) {
  console.log("Notable");
} else if (nota >= 5) {
  console.log("Aprobado");
} else {
  console.log("Suspendido");
}`,
      pista: "Prueba nota = 10, 6, 4 y -1.",
    },
    bugs: [
      {
        titulo: "Condiciones en orden incorrecto",
        codigo: 'const nota = 10;\nif (nota >= 5) {\n  console.log("Aprobado");\n} else if (nota >= 9) {\n  console.log("Sobresaliente");\n}',
        problemas: [
          "La primera condición atrapa cualquier nota mayor o igual que 5.",
          "La rama de sobresaliente es inalcanzable.",
        ],
        corregido: 'const nota = 10;\nif (nota >= 9) {\n  console.log("Sobresaliente");\n} else if (nota >= 5) {\n  console.log("Aprobado");\n}',
        explicacion: "Ordena de la condición más específica a la más general.",
      },
      {
        titulo: "Else colgante sin llaves",
        codigo: 'const a = true;\nconst b = false;\nif (a)\n  if (b)\n    console.log("AB");\n  else\n    console.log("A pero no B");',
        problemas: [
          "Sin llaves, el else se asocia con el if más cercano (el de b).",
          "El programador suele esperar que el else pertenezca al primer if.",
        ],
        corregido: 'const a = true;\nconst b = false;\nif (a) {\n  if (b) {\n    console.log("AB");\n  }\n} else {\n  console.log("No A");\n}',
        explicacion: "Usa llaves siempre que anides condicionales.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué condición se evalúa después de una condición falsa en una cadena `else if`?",
        opciones: ["La siguiente condición.", "El else final directamente.", "Se detiene el programa.", "Se repite la primera."],
        correcta: 0,
        explicacion: "La cadena avanza a la siguiente condición hasta encontrar una verdadera.",
      },
      {
        id: 2,
        pregunta: "¿Qué pasa cuando una condición de la cadena es verdadera?",
        opciones: [
          "Se ejecuta su bloque y se ignoran las demás ramas.",
          "Se ejecutan todas las ramas verdaderas.",
          "Se ejecuta también el else final.",
          "Vuelve a empezar la cadena.",
        ],
        correcta: 0,
        explicacion: "Las ramas son excluyentes: la primera verdadera gana.",
      },
      {
        id: 3,
        pregunta: "¿Cuál es el orden correcto para clasificar notas?",
        opciones: [
          "Primero `nota >= 5` y luego `nota >= 9`.",
          "Primero `nota >= 9` y luego `nota >= 5`.",
          "Da igual el orden.",
          "Primero el else y luego el if.",
        ],
        correcta: 1,
        explicacion: "Si compruebas primero el aprobado, nunca alcanzas el sobresaliente.",
      },
      {
        id: 4,
        pregunta: "¿A qué if pertenece un `else` sin llaves?",
        opciones: ["Al if más lejano.", "Al if más cercano.", "Al primer if del archivo.", "A ninguno: lanza error."],
        correcta: 1,
        explicacion: "Es el dangling else: el else se asocia al if más cercano.",
      },
    ],
    fuente: "MDN Web Docs – if...else · JavaScript.info – Conditional branching · ECMAScript – If Statement",
  },

  /* ============================================================
     5 · switch
     ============================================================ */
  {
    id: "js-switch",
    titulo: "Estructura switch",
    icon: "🎛️",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "switch (valor) { case x: ...; break; default: ... }",
    definicion: [
      "`switch` es una estructura de control que compara un valor con varios **casos** y ejecuta el bloque del primero que coincida.",
    ],
    queEs: [
      "Es una alternativa a cadenas largas de `if...else if` cuando todas las comparaciones usan el mismo valor.",
      "La comparación es **estricta** (`===`): no hay coerción de tipos.",
      "Cada `case` etiqueta un punto de entrada; sin `break`, la ejecución **cae** al siguiente caso (fall-through).",
      "`default` es opcional y se ejecuta cuando ningún caso coincide.",
    ],
    paraQueSirve: [
      "Responder a códigos o comandos concretos: `\"sumar\"`, `\"restar\"`, etc.",
      "Mapear días, meses o estados a textos.",
      "Implementar menús y máquinas de estado simples.",
      "Evitar cadenas interminables de `else if` con igualdad.",
    ],
    comoFunciona: [
      "Se evalúa la expresión del `switch` una sola vez.",
      "Se compara con cada `case` usando igualdad estricta.",
      "Al encontrar coincidencia, comienza a ejecutar desde ese case.",
      "`break` corta la ejecución y sale del switch; sin él, sigue al siguiente case.",
      "Si no hay coincidencia, se ejecuta `default` (si existe) o se sale.",
    ],
    sintaxis: [
      { caption: "Forma básica", code: 'switch (valor) {\n  case "a":\n    console.log("Opción A");\n    break;\n  case "b":\n    console.log("Opción B");\n    break;\n  default:\n    console.log("Opción desconocida");\n}' },
      { caption: "Casos agrupados", code: 'switch (dia) {\n  case "sábado":\n  case "domingo":\n    console.log("Fin de semana");\n    break;\n  default:\n    console.log("Día laborable");\n}' },
    ],
    nota: "`switch` compara con `===`. El número `3` no coincide con la cadena `\"3\"`; asegúrate del tipo.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Día de la semana",
        descripcion: "Cada case termina con break para no caer al siguiente.",
        code: 'const dia = 3;\n\nswitch (dia) {\n  case 1:\n    console.log("Lunes");\n    break;\n  case 2:\n    console.log("Martes");\n    break;\n  case 3:\n    console.log("Miércoles");\n    break;\n  default:\n    console.log("Otro día");\n}',
      },
      {
        titulo: "Ejemplo 2 · Agrupar casos",
        descripcion: "Varios case comparten el mismo bloque.",
        code: 'const dia = "domingo";\n\nswitch (dia) {\n  case "sábado":\n  case "domingo":\n    console.log("Fin de semana");\n    break;\n  default:\n    console.log("Día laborable");\n}',
      },
      {
        titulo: "Ejemplo 3 · Fall-through intencional",
        descripcion: "Se acumulan pasos hasta llegar al break.",
        code: 'let nivel = 1;\nlet permisos = "";\n\nswitch (nivel) {\n  case 3:\n    permisos += "administrar ";\n  case 2:\n    permisos += "editar ";\n  case 1:\n    permisos += "leer";\n    break;\n  default:\n    permisos = "sin acceso";\n}\n\nconsole.log(permisos); // "leer" con nivel 1',
      },
    ],
    errores: [
      {
        texto: "**Olvidar `break`**: la ejecución cae al case siguiente aunque no coincida.",
        code: '// ❌ Imprime Lunes y Martes\nswitch (1) {\n  case 1:\n    console.log("Lunes");\n  case 2:\n    console.log("Martes");\n}\n\n// ✅\nswitch (1) {\n  case 1:\n    console.log("Lunes");\n    break;\n  case 2:\n    console.log("Martes");\n    break;\n}',
      },
      {
        texto: "**Declarar `let` directamente en un case**: todos los cases comparten el mismo bloque y puede haber TDZ o duplicados.",
        code: '// ❌ SyntaxError: ya declarado en otro case\nswitch (x) {\n  case 1:\n    let resultado = "uno";\n    break;\n  case 2:\n    let resultado = "dos";\n    break;\n}\n\n// ✅ Usa llaves por case\nswitch (x) {\n  case 1: {\n    let resultado = "uno";\n    break;\n  }\n  case 2: {\n    let resultado = "dos";\n    break;\n  }\n}',
      },
      {
        texto: "**Usar switch para rangos**: `case nota >= 5` no funciona; los case son valores, no condiciones.",
        code: '// ❌ No compara condiciones\nswitch (true) {\n  case nota >= 9:\n    console.log("Sobresaliente");\n}\n\n// ✅ Para rangos, usa if...else if\nif (nota >= 9) {\n  console.log("Sobresaliente");\n}',
      },
    ],
    casos: [
      "Procesar comandos de una calculadora o de un menú.",
      "Traducir códigos de estado a mensajes.",
      "Agrupar días, categorías o tipos con el mismo comportamiento.",
      "Implementar reducers de acciones en aplicaciones.",
    ],
    relacion: [
      "**if...else if**: alternativa para condiciones y rangos.",
      "**Igualdad estricta**: switch usa `===`, no `==`.",
      "**break / return**: evitan el fall-through.",
      "**Objetos de mapeo**: `{ a: fnA, b: fnB }[valor]` puede sustituir switch simples.",
      "**default**: caso por defecto para valores no contemplados.",
    ],
    analogia:
      "Es un ascensor con botones numerados: pulsas el 3 y el ascensor va directo a la planta 3. Si el botón no existe, va a la planta por defecto. Pero si la puerta no se cierra con `break`, el ascensor sigue subiendo a la siguiente planta aunque no la hayas pedido.",
    analogiaDiagrama: analogia(
      "switch (valor)",
      [
        ["🔢", "Expresión", "Se evalúa una sola vez."],
        ["🎯", "case", "Cada valor posible, comparado con ===."],
        ["🛑", "break", "Corta y sale del switch."],
        ["🛟", "default", "Se ejecuta si ningún case coincide."],
      ],
      "Sin break, el flujo cae al case siguiente: a veces es intencional, casi siempre es un bug.",
    ),
    relacionArbol: arbol("switch", "Selección por valor exacto", [
      ["🔢", "Expresión", "Se evalúa una vez"],
      ["🎯", "case", "Comparación estricta con ==="],
      ["🛑", "break", "Sale del switch"],
      ["🛟", "default", "Caso no contemplado"],
      ["🔀", "if...else if", "Alternativa para rangos y condiciones"],
    ]),
    demo: {
      codigo: `const dia = 3;

switch (dia) {
  case 1:
    console.log("Lunes");
    break;
  case 2:
    console.log("Martes");
    break;
  case 3:
    console.log("Miércoles");
    break;
  default:
    console.log("Otro día");
}`,
      pasos: [
        paso(1, { dia: "3" }, "", "Se guarda el día."),
        paso(3, { dia: "3" }, "", "switch evalúa dia una sola vez."),
        paso(4, { dia: "3" }, "", "case 1: 3 === 1 es false."),
        paso(7, { dia: "3" }, "", "case 2: 3 === 2 es false."),
        paso(10, { dia: "3" }, "", "case 3: 3 === 3 es true. Entra aquí."),
        paso(11, { dia: "3" }, "Miércoles", "Se ejecuta el bloque del case 3."),
        paso(12, { dia: "3" }, "Miércoles", "break corta el switch y evita el default."),
      ],
    },
    scope: sc(
      "switch comparte un solo bloque entre todos los case",
      `const opcion = 2;

switch (opcion) {
  case 1: {
    let mensaje = "uno";
    console.log(mensaje);
    break;
  }
  case 2: {
    let mensaje = "dos";
    console.log(mensaje);
    break;
  }
  default:
    console.log("otro");
}

console.log(typeof mensaje);`,
      [
        ln("const opcion = 2;", "const", "global", "TDZ", "2", "El valor que se va a comparar."),
        ln('let mensaje = "uno";', "let", "case 1", "TDZ", '"uno"', "Con llaves, mensaje vive solo en el case 1."),
        ln('let mensaje = "dos";', "let", "case 2", "TDZ", '"dos"', "Con llaves, se puede repetir el nombre sin conflicto."),
        ln("console.log(mensaje);", "expresion", "case 2", "—", '"dos"', "Se usa el mensaje del case elegido."),
        ln("console.log(typeof mensaje);", "expresion", "global", "—", '"undefined"', "Fuera del switch, mensaje ya no existe."),
      ],
      [
        "Sin llaves, todos los case comparten el mismo ámbito y dos let con el mismo nombre dan SyntaxError.",
        "Usa bloques `{ }` por case cuando declares variables.",
      ],
    ),
    editor: {
      consigna: "Prueba distintos días, elimina un break y observa el fall-through. Después usa una cadena para comprobar la igualdad estricta.",
      inicial: `const dia = 3;

switch (dia) {
  case 1:
    console.log("Lunes");
    break;
  case 2:
    console.log("Martes");
    break;
  case 3:
    console.log("Miércoles");
    break;
  default:
    console.log("Otro día");
}`,
      pista: "Cambia dia a \"3\" y verás que no coincide con el número 3.",
    },
    bugs: [
      {
        titulo: "Falta break",
        codigo: 'const dia = 1;\nswitch (dia) {\n  case 1:\n    console.log("Lunes");\n  case 2:\n    console.log("Martes");\n    break;\n}',
        problemas: [
          "El case 1 no tiene break y cae al case 2.",
          "La consola muestra Lunes y Martes aunque dia sea 1.",
        ],
        corregido: 'const dia = 1;\nswitch (dia) {\n  case 1:\n    console.log("Lunes");\n    break;\n  case 2:\n    console.log("Martes");\n    break;\n}',
        explicacion: "Añade break (o return) al final de cada caso que no deba continuar.",
      },
      {
        titulo: "Tipo distinto en el case",
        codigo: 'const dia = "3";\nswitch (dia) {\n  case 3:\n    console.log("Miércoles");\n    break;\n  default:\n    console.log("No coincide");\n}',
        problemas: [
          "switch usa === y \"3\" no es igual a 3.",
          "Se ejecuta default aunque el texto parezca el mismo número.",
        ],
        corregido: 'const dia = "3";\nswitch (dia) {\n  case "3":\n    console.log("Miércoles");\n    break;\n  default:\n    console.log("No coincide");\n}',
        explicacion: "Asegura que el tipo del case coincide con el de la expresión.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué comparación usa `switch` internamente?",
        opciones: ["`==` con coerción", "`===` estricta", "`>` y `<`", "Siempre `true`"],
        correcta: 1,
        explicacion: "switch compara con igualdad estricta; el tipo importa.",
      },
      {
        id: 2,
        pregunta: "¿Qué pasa si un case no tiene `break`?",
        opciones: [
          "Se ejecuta solo ese case.",
          "La ejecución cae al case siguiente.",
          "Lanza SyntaxError.",
          "Se reinicia el switch.",
        ],
        correcta: 1,
        explicacion: "Es el fall-through: sin break, el flujo continúa hacia abajo.",
      },
      {
        id: 3,
        pregunta: "¿Cuándo se ejecuta `default`?",
        opciones: [
          "Siempre, al final.",
          "Cuando ningún case coincide.",
          "Solo si el switch está vacío.",
          "Cuando falta un break.",
        ],
        correcta: 1,
        explicacion: "default es la red de seguridad para valores no contemplados.",
      },
      {
        id: 4,
        pregunta: "¿Qué estructura conviene para rangos como `nota >= 9`?",
        opciones: ["switch", "if...else if", "for", "try...catch"],
        correcta: 1,
        explicacion: "switch compara valores exactos; para rangos se usa if...else if.",
      },
    ],
    fuente: "MDN Web Docs – switch · ECMAScript – Switch Statement · JavaScript.info – The switch statement",
  },

  /* ============================================================
     6 · while
     ============================================================ */
  {
    id: "js-while",
    titulo: "Estructura while",
    icon: "🔁",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "while (condicion) { ... }",
    definicion: [
      "`while` es un bucle que **evalúa la condición antes de cada vuelta** y repite su bloque mientras la condición sea verdadera.",
    ],
    queEs: [
      "Es un bucle controlado por condición: no sabes de antemano cuántas vueltas dará.",
      "Si la condición es falsa al inicio, el bloque **no se ejecuta ninguna vez**.",
      "La condición debe cambiar dentro del bucle; si no, se produce un **bucle infinito**.",
    ],
    paraQueSirve: [
      "Repetir una acción hasta que se cumpla una condición externa.",
      "Consumir datos hasta encontrar un valor centinela.",
      "Reintentar una operación mientras falle y queden intentos.",
      "Recorrer estructuras sin un número fijo de elementos.",
    ],
    comoFunciona: [
      "Se evalúa la condición.",
      "Si es falsy, el bucle termina y se salta el bloque.",
      "Si es truthy, se ejecuta el bloque completo.",
      "Al terminar la vuelta, se vuelve a evaluar la condición.",
      "El ciclo se repite hasta que la condición sea falsy o se use `break`.",
    ],
    sintaxis: [
      { caption: "Forma básica", code: 'let i = 0;\n\nwhile (i < 3) {\n  console.log(i);\n  i++;\n}' },
      { caption: "Con break", code: 'let intentos = 0;\n\nwhile (true) {\n  intentos++;\n  if (intentos === 3) break;\n}' },
    ],
    nota: "Antes de escribir un while, pregúntate: ¿qué hace que la condición se vuelva falsa? Si no tienes respuesta, tendrás un bucle infinito.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Cuenta atrás",
        descripcion: "La variable cuenta cambia en cada vuelta.",
        code: 'let cuenta = 3;\n\nwhile (cuenta > 0) {\n  console.log(cuenta);\n  cuenta--;\n}\n\nconsole.log("¡Despegue!");',
      },
      {
        titulo: "Ejemplo 2 · Reintentos",
        descripcion: "Se repite mientras queden intentos y no haya éxito.",
        code: 'let intentos = 0;\nlet exito = false;\n\nwhile (intentos < 3 && !exito) {\n  intentos++;\n  console.log("Intento", intentos);\n  exito = intentos === 2; // simulación\n}\n\nconsole.log("¿Éxito?", exito);',
      },
      {
        titulo: "Ejemplo 3 · Condición falsa desde el inicio",
        descripcion: "Si la condición es falsa, el bloque no se ejecuta.",
        code: 'let saldo = 0;\n\nwhile (saldo > 0) {\n  console.log("Esto no se muestra");\n  saldo--;\n}\n\nconsole.log("Fin");',
      },
    ],
    errores: [
      {
        texto: "**Olvidar modificar la variable de control**: la condición nunca se vuelve falsa.",
        code: '// ❌ Bucle infinito\nlet i = 0;\nwhile (i < 3) {\n  console.log(i);\n}\n\n// ✅\nlet j = 0;\nwhile (j < 3) {\n  console.log(j);\n  j++;\n}',
      },
      {
        texto: "**Poner un punto y coma después de la condición**: el while queda vacío y la condición se evalúa para siempre.",
        code: '// ❌ Bucle infinito sin cuerpo\nlet i = 0;\nwhile (i < 3);\n{\n  i++;\n}\n\n// ✅\nlet j = 0;\nwhile (j < 3) {\n  j++;\n}',
      },
      {
        texto: "**Modificar la condición solo en una rama**: si el cambio está dentro de un if que no siempre se ejecuta, el bucle puede no terminar.",
        code: '// ❌ Si la condición no se cumple, i nunca cambia\nlet i = 0;\nwhile (i < 5) {\n  if (i % 2 === 0) i++;\n}\n\n// ✅ Asegura el avance en todas las vueltas\nlet j = 0;\nwhile (j < 5) {\n  j++;\n}',
      },
    ],
    casos: [
      "Leer datos hasta recibir un valor de fin.",
      "Reintentar una petición mientras queden intentos.",
      "Simular turnos de un juego hasta que alguien gane.",
      "Procesar una cola de tareas pendientes.",
    ],
    relacion: [
      "**do...while**: ejecuta al menos una vez antes de evaluar.",
      "**for**: ideal cuando conoces el número de vueltas.",
      "**break**: sale del bucle inmediatamente.",
      "**continue**: salta a la siguiente evaluación de la condición.",
      "**for...of**: alternativa más segura para recorrer iterables.",
    ],
    analogia:
      "Es como insistir en una puerta: mientras esté cerrada, vuelves a intentarlo. Si al principio ya está abierta, no intentas nada. Pero si nunca cambias de estrategia ni dejas de empujar, te quedas atrapado para siempre.",
    analogiaDiagrama: analogia(
      "while (condición)",
      [
        ["❓", "Evaluar primero", "La condición se comprueba antes de cada vuelta."],
        ["🚪", "Puede no entrar", "Si es falsa al inicio, cero vueltas."],
        ["🔁", "Repetir", "Cada vuelta debe acercar al final."],
        ["🛑", "break", "Salida de emergencia."],
      ],
      "El while no promete ejecutarse: solo promete comprobar antes.",
    ),
    relacionArbol: arbol("while", "Bucle con condición previa", [
      ["❓", "Condición", "Se evalúa antes de cada vuelta"],
      ["🔁", "Cuerpo", "Se repite mientras sea verdadera"],
      ["🛑", "break", "Sale antes de que la condición sea falsa"],
      ["⏭️", "continue", "Salta al siguiente chequeo"],
      ["🔄", "do...while", "Variante que ejecuta al menos una vez"],
    ]),
    demo: {
      codigo: `let cuenta = 3;

while (cuenta > 0) {
  console.log(cuenta);
  cuenta--;
}

console.log("¡Despegue!");`,
      pasos: [
        paso(1, { cuenta: "3" }, "", "Se inicializa el contador."),
        paso(3, { cuenta: "3" }, "", "3 > 0 es true: comienza la primera vuelta."),
        paso(4, { cuenta: "3" }, "3", "Se imprime el valor actual."),
        paso(5, { cuenta: "2" }, "3", "cuenta-- deja el contador en 2."),
        paso(3, { cuenta: "2" }, "3", "2 > 0 es true: segunda vuelta."),
        paso(4, { cuenta: "2" }, "3\n2", "Se imprime 2."),
        paso(5, { cuenta: "1" }, "3\n2", "El contador baja a 1."),
        paso(3, { cuenta: "1" }, "3\n2", "1 > 0 es true: tercera vuelta."),
        paso(4, { cuenta: "1" }, "3\n2\n1", "Se imprime 1."),
        paso(5, { cuenta: "0" }, "3\n2\n1", "El contador llega a 0."),
        paso(3, { cuenta: "0" }, "3\n2\n1", "0 > 0 es false: el bucle termina."),
        paso(7, { cuenta: "0" }, "3\n2\n1\n¡Despegue!", "Se ejecuta la instrucción posterior al bucle."),
      ],
    },
    scope: sc(
      "La variable de control puede vivir fuera o dentro del bucle",
      `let i = 0;
while (i < 3) {
  let mensaje = "vuelta " + i;
  console.log(mensaje);
  i++;
}
console.log(i);
console.log(typeof mensaje);`,
      [
        ln("let i = 0;", "let", "global", "TDZ", "0", "i se declara fuera para que la condición pueda verla."),
        ln('let mensaje = "vuelta " + i;', "let", "bloque while", "TDZ", '"vuelta 0"', "mensaje se crea de nuevo en cada vuelta."),
        ln("i++;", "expresion", "bloque while", "—", "1, 2, 3…", "El incremento es lo que acerca el final del bucle."),
        ln("console.log(i);", "expresion", "global", "—", "3", "i sigue existiendo después del while."),
        ln("console.log(typeof mensaje);", "expresion", "global", "—", '"undefined"', "mensaje era local del bloque y ya no existe."),
      ],
      [
        "Declara fuera la variable que controle la condición.",
        "Las variables declaradas dentro del cuerpo se recrean en cada vuelta.",
      ],
    ),
    editor: {
      consigna: "Haz que la cuenta atrás funcione y que el bucle termine. Prueba a quitar el decremento para ver cómo el sandbox detiene el bucle infinito.",
      inicial: `let cuenta = 3;

while (cuenta > 0) {
  console.log(cuenta);
  cuenta--;
}

console.log("¡Despegue!");`,
      pista: "Si quitas cuenta--, el Worker cortará la ejecución a los 2.5 s.",
    },
    bugs: [
      {
        titulo: "Bucle infinito por no incrementar",
        codigo: "let i = 0;\nwhile (i < 3) {\n  console.log(i);\n}",
        problemas: [
          "i nunca cambia, así que i < 3 siempre es true.",
          "El bucle no termina y bloquea el hilo principal en un script normal.",
        ],
        corregido: "let i = 0;\nwhile (i < 3) {\n  console.log(i);\n  i++;\n}",
        explicacion: "Toda variable que aparezca en la condición debe avanzar hacia el final.",
      },
      {
        titulo: "Punto y coma después de while",
        codigo: "let i = 0;\nwhile (i < 3);\n{\n  i++;\n}",
        problemas: [
          "El ; hace que el cuerpo del while sea una sentencia vacía.",
          "La condición se evalúa indefinidamente porque i no cambia dentro del bucle.",
        ],
        corregido: "let i = 0;\nwhile (i < 3) {\n  i++;\n}",
        explicacion: "No pongas punto y coma entre la condición y el bloque.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Cuándo se evalúa la condición de un `while`?",
        opciones: [
          "Antes de cada vuelta, incluso antes de la primera.",
          "Solo después de la primera vuelta.",
          "Una sola vez al inicio.",
          "Nunca: siempre entra una vez.",
        ],
        correcta: 0,
        explicacion: "Por eso un while puede ejecutarse cero veces.",
      },
      {
        id: 2,
        pregunta: "¿Qué provoca olvidar el incremento en `while (i < 3) { console.log(i); }`?",
        opciones: ["Un error de sintaxis.", "Un bucle infinito.", "Que se ejecute una vez.", "Que i se vuelva null."],
        correcta: 1,
        explicacion: "La condición nunca se vuelve falsa porque i no cambia.",
      },
      {
        id: 3,
        pregunta: "¿Qué hace `break` dentro de un while?",
        opciones: [
          "Salta a la siguiente vuelta.",
          "Termina el bucle inmediatamente.",
          "Reinicia el contador.",
          "Solo funciona en for.",
        ],
        correcta: 1,
        explicacion: "break abandona el bucle sin esperar a que la condición sea falsa.",
      },
      {
        id: 4,
        pregunta: "Si la condición es falsa al inicio, ¿cuántas vueltas da el while?",
        opciones: ["Una.", "Dos.", "Ninguna.", "Infinitas."],
        correcta: 2,
        explicacion: "El while comprueba antes de entrar; si es falsa, no ejecuta el cuerpo.",
      },
    ],
    fuente: "MDN Web Docs – while · ECMAScript – While Statement · JavaScript.info – Loops: while and for",
  },

  /* ============================================================
     7 · do...while
     ============================================================ */
  {
    id: "js-do-while",
    titulo: "Estructura do...while",
    icon: "🔄",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "do { ... } while (condicion);",
    definicion: [
      "`do...while` es un bucle que **ejecuta primero el bloque y evalúa la condición después**, por lo que siempre se ejecuta al menos una vez.",
    ],
    queEs: [
      "Es la variante “haz esto y luego pregunta” del bucle while.",
      "La condición se comprueba al final de cada vuelta.",
      "Necesita un punto y coma después de `while (condicion);`.",
      "Si la condición es falsa desde el inicio, el bloque se ejecuta **una vez** igualmente.",
    ],
    paraQueSirve: [
      "Mostrar un menú al menos una vez antes de comprobar si el usuario quiere salir.",
      "Pedir un dato hasta que sea válido, aunque el primer intento siempre se haga.",
      "Ejecutar una acción inicial y repetirla solo si se cumple una condición.",
      "Simular turnos que deben comenzar sí o sí.",
    ],
    comoFunciona: [
      "Se ejecuta el bloque del `do`.",
      "Al terminar, se evalúa la condición del `while`.",
      "Si es truthy, se repite el bloque.",
      "Si es falsy, el bucle termina.",
      "El bloque siempre se ejecuta al menos una vez.",
    ],
    sintaxis: [
      { caption: "Forma básica", code: 'let i = 0;\n\ndo {\n  console.log(i);\n  i++;\n} while (i < 3);' },
      { caption: "Con condición falsa desde el inicio", code: 'let saldo = 0;\n\ndo {\n  console.log("Se ejecuta una vez");\n} while (saldo > 0);' },
    ],
    nota: "No olvides el `;` final después de `while (condicion)`. Es una de las pocas estructuras que lo exige.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Tres intentos",
        descripcion: "El bloque se ejecuta y luego se comprueba si hay que repetir.",
        code: 'let intentos = 0;\n\ndo {\n  intentos++;\n  console.log("Intento", intentos);\n} while (intentos < 3);\n\nconsole.log("Total:", intentos);',
      },
      {
        titulo: "Ejemplo 2 · Se ejecuta una vez aunque la condición sea falsa",
        descripcion: "Esta es la diferencia clave con while.",
        code: 'let saldo = 0;\n\ndo {\n  console.log("Mostrando saldo:", saldo);\n} while (saldo > 0);\n\nconsole.log("Fin");',
      },
      {
        titulo: "Ejemplo 3 · Menú",
        descripcion: "El menú se muestra al menos una vez y se repite hasta elegir salir.",
        code: 'let opcion;\n\ndo {\n  opcion = "salir"; // simulación de la elección\n  console.log("Menú: 1) Jugar  2) Salir");\n} while (opcion !== "salir");',
      },
    ],
    errores: [
      {
        texto: "**Olvidar el punto y coma final**: `do { ... } while (x)` sin `;` puede romper la siguiente instrucción.",
        code: '// ❌ Falta ;\ndo {\n  i++;\n} while (i < 3)\nconsole.log(i);\n\n// ✅\ndo {\n  i++;\n} while (i < 3);\nconsole.log(i);',
      },
      {
        texto: "**Usar do...while cuando no quieres ninguna vuelta**: si la condición puede ser falsa al inicio y no quieres ejecutar, usa while.",
        code: '// ❌ Se ejecuta una vez aunque no haya datos\nlet datos = [];\ndo {\n  console.log("Procesando…");\n} while (datos.length > 0);\n\n// ✅ while no entra si no hay datos\nlet datos2 = [];\nwhile (datos2.length > 0) {\n  console.log("Procesando…");\n}',
      },
      {
        texto: "**Bucle infinito por no modificar la condición**: igual que en while, la variable debe avanzar.",
        code: '// ❌\nlet i = 0;\ndo {\n  console.log(i);\n} while (i < 3);\n\n// ✅\nlet j = 0;\ndo {\n  console.log(j);\n  j++;\n} while (j < 3);',
      },
    ],
    casos: [
      "Menús interactivos que deben mostrarse al menos una vez.",
      "Solicitar una contraseña hasta que sea correcta.",
      "Repetir una animación mientras no se cancele.",
      "Procesar al menos un elemento de una cola.",
    ],
    relacion: [
      "**while**: comprueba antes; puede ejecutarse cero veces.",
      "**do...while**: comprueba después; se ejecuta al menos una vez.",
      "**for**: ideal para un número conocido de vueltas.",
      "**break / continue**: también funcionan dentro del do...while.",
      "**Punto y coma**: obligatorio al final de la condición.",
    ],
    analogia:
      "Es como probar una puerta antes de preguntar si quieres seguir: primero empujas (una vez seguro) y solo después decides si repites. El while, en cambio, pregunta antes de empujar y puede que nunca lo hagas.",
    analogiaDiagrama: analogia(
      "do...while",
      [
        ["1️⃣", "Primero ejecuta", "El bloque se ejecuta sin preguntar."],
        ["❓", "Luego pregunta", "La condición se evalúa al final."],
        ["🔁", "Repite si true", "Vuelve al inicio del do."],
        ["🛑", "Sale si false", "Termina después de la primera vuelta."],
      ],
      "La diferencia con while es el momento de la pregunta, no la condición.",
    ),
    relacionArbol: arbol("do...while", "Bucle que ejecuta al menos una vez", [
      ["1️⃣", "Bloque do", "Se ejecuta primero"],
      ["❓", "Condición while", "Se evalúa al final"],
      ["🔁", "Repetición", "Solo si la condición es verdadera"],
      ["🛑", "Salida", "Cuando la condición es falsa"],
      ["⚖️", "while", "Comprueba antes y puede no entrar"],
    ]),
    demo: {
      codigo: `let intentos = 0;

do {
  intentos++;
  console.log("Intento", intentos);
} while (intentos < 3);

console.log("Total:", intentos);`,
      pasos: [
        paso(1, { intentos: "0" }, "", "Se inicializa el contador."),
        paso(3, { intentos: "0" }, "", "El do entra directamente, sin comprobar nada."),
        paso(4, { intentos: "1" }, "", "Primer incremento."),
        paso(5, { intentos: "1" }, "Intento 1", "Se muestra el primer intento."),
        paso(6, { intentos: "1" }, "Intento 1", "1 < 3 es true: se repite."),
        paso(4, { intentos: "2" }, "Intento 1", "Segundo incremento."),
        paso(5, { intentos: "2" }, "Intento 1\nIntento 2", "Se muestra el segundo intento."),
        paso(6, { intentos: "2" }, "Intento 1\nIntento 2", "2 < 3 es true: se repite."),
        paso(4, { intentos: "3" }, "Intento 1\nIntento 2", "Tercer incremento."),
        paso(5, { intentos: "3" }, "Intento 1\nIntento 2\nIntento 3", "Se muestra el tercer intento."),
        paso(6, { intentos: "3" }, "Intento 1\nIntento 2\nIntento 3", "3 < 3 es false: el bucle termina."),
        paso(8, { intentos: "3" }, "Intento 1\nIntento 2\nIntento 3\nTotal: 3", "Se ejecuta la instrucción posterior."),
      ],
    },
    scope: sc(
      "El bloque do tiene su propio ámbito",
      `let opcion = "";
do {
  let mensaje = "Mostrando menú";
  console.log(mensaje);
  opcion = "salir";
} while (opcion !== "salir");
console.log(opcion);
console.log(typeof mensaje);`,
      [
        ln('let opcion = "";', "let", "global", "TDZ", '""', "opcion vive fuera para que la condición pueda leerla."),
        ln('let mensaje = "Mostrando menú";', "let", "bloque do", "TDZ", '"Mostrando menú"', "mensaje se crea en cada vuelta del do."),
        ln('opcion = "salir";', "expresion", "bloque do", "—", '"salir"', "La asignación hace que la condición final sea falsa."),
        ln("console.log(opcion);", "expresion", "global", "—", '"salir"', "opcion sigue existiendo fuera del bucle."),
        ln("console.log(typeof mensaje);", "expresion", "global", "—", '"undefined"', "mensaje era local del bloque do."),
      ],
      [
        "La condición se evalúa después del bloque, pero las variables locales mueren al salir.",
        "Declara fuera lo que necesites conservar.",
      ],
    ),
    editor: {
      consigna: "Haz que el menú se muestre una vez y luego termine. Cambia la condición para forzar más vueltas.",
      inicial: `let intentos = 0;

do {
  intentos++;
  console.log("Intento", intentos);
} while (intentos < 3);

console.log("Total:", intentos);`,
      pista: "Cambia la condición a intentos < 5 y observa cuántas vueltas da.",
    },
    bugs: [
      {
        titulo: "Falta el punto y coma final",
        codigo: 'let i = 0;\ndo {\n  i++;\n} while (i < 3)\nconsole.log(i);',
        problemas: [
          "Falta el ; después de while (i < 3).",
          "El parser puede interpretar la siguiente línea como parte de la expresión.",
        ],
        corregido: "let i = 0;\ndo {\n  i++;\n} while (i < 3);\nconsole.log(i);",
        explicacion: "do...while es la única estructura de bucle que exige punto y coma final.",
      },
      {
        titulo: "Se ejecuta cuando no debería",
        codigo: 'let datos = [];\ndo {\n  console.log("Procesando datos…");\n} while (datos.length > 0);',
        problemas: [
          "El array está vacío, pero el do ejecuta el bloque una vez.",
          "Si no querías procesar nada, este no es el bucle adecuado.",
        ],
        corregido: 'let datos = [];\nwhile (datos.length > 0) {\n  console.log("Procesando datos…");\n}',
        explicacion: "Usa while cuando el bloque pueda no ejecutarse nunca.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Cuántas veces se ejecuta como mínimo un `do...while`?",
        opciones: ["Cero.", "Una.", "Dos.", "Depende de la condición."],
        correcta: 1,
        explicacion: "El bloque se ejecuta antes de evaluar la condición.",
      },
      {
        id: 2,
        pregunta: "¿Dónde se evalúa la condición?",
        opciones: ["Antes del bloque.", "Al final del bloque.", "Dentro del bloque.", "Nunca."],
        correcta: 1,
        explicacion: "Por eso se garantiza al menos una ejecución.",
      },
      {
        id: 3,
        pregunta: "¿Qué signo es obligatorio al final de `while (condicion)` en un do...while?",
        opciones: [":", ";", ",", "Ninguno."],
        correcta: 1,
        explicacion: "La estructura termina con `while (condicion);`.",
      },
      {
        id: 4,
        pregunta: "¿Qué bucle elegir si el bloque puede no ejecutarse nunca?",
        opciones: ["do...while", "while", "for...in", "switch"],
        correcta: 1,
        explicacion: "while comprueba antes; do...while siempre entra una vez.",
      },
    ],
    fuente: "MDN Web Docs – do...while · ECMAScript – Do-While Statement · JavaScript.info – Loops: while and for",
  },

  /* ============================================================
     8 · for
     ============================================================ */
  {
    id: "js-for",
    titulo: "Estructura for",
    icon: "➰",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "for (inicio; condicion; paso) { ... }",
    definicion: [
      "`for` es un bucle que agrupa en una sola línea la **inicialización**, la **condición** y el **paso** de un recorrido, y repite su bloque mientras la condición sea verdadera.",
    ],
    queEs: [
      "Es el bucle ideal cuando sabes cuántas vueltas necesitas o recorres un rango.",
      "La inicialización se ejecuta una vez; la condición antes de cada vuelta; el paso después de cada vuelta.",
      "Con `let`, la variable del bucle tiene un binding nuevo por iteración.",
      "Puedes omitir partes con `;`, pero necesitas los dos puntos y coma.",
    ],
    paraQueSirve: [
      "Recorrer índices de un array o de una cadena.",
      "Repetir una tarea un número conocido de veces.",
      "Generar tablas, secuencias o acumuladores.",
      "Construir bucles con control preciso del avance.",
    ],
    comoFunciona: [
      "Se ejecuta la inicialización una sola vez.",
      "Se evalúa la condición; si es falsa, el bucle termina.",
      "Se ejecuta el cuerpo.",
      "Se ejecuta el paso (`i++`, `i += 2`, etc.).",
      "Se vuelve a evaluar la condición y se repite.",
    ],
    sintaxis: [
      { caption: "Forma básica", code: 'for (let i = 0; i < 5; i++) {\n  console.log(i);\n}' },
      { caption: "Paso personalizado", code: 'for (let i = 10; i >= 0; i -= 2) {\n  console.log(i);\n}' },
      { caption: "Recorrer un array por índice", code: 'const frutas = ["🍎", "🍌", "🍇"];\n\nfor (let i = 0; i < frutas.length; i++) {\n  console.log(i, frutas[i]);\n}' },
    ],
    nota: "Cuidado con el off-by-one: `i <= array.length` se pasa un índice y devuelve `undefined`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Sumar del 1 al 5",
        descripcion: "El acumulador se declara fuera del bucle.",
        code: 'let suma = 0;\n\nfor (let i = 1; i <= 5; i++) {\n  suma += i;\n}\n\nconsole.log(suma); // 15',
      },
      {
        titulo: "Ejemplo 2 · Recorrer un array",
        descripcion: "El índice va de 0 a length - 1.",
        code: 'const colores = ["rojo", "verde", "azul"];\n\nfor (let i = 0; i < colores.length; i++) {\n  console.log(i, colores[i]);\n}',
      },
      {
        titulo: "Ejemplo 3 · Cuenta atrás",
        descripcion: "El paso puede ser negativo.",
        code: 'for (let i = 3; i > 0; i--) {\n  console.log(i);\n}\nconsole.log("¡Ya!");',
      },
    ],
    errores: [
      {
        texto: "**Off-by-one en arrays**: usar `<= length` accede a un índice inexistente.",
        code: '// ❌ En la última vuelta, array[3] es undefined\nfor (let i = 0; i <= array.length; i++) {\n  console.log(array[i]);\n}\n\n// ✅\nfor (let i = 0; i < array.length; i++) {\n  console.log(array[i]);\n}',
      },
      {
        texto: "**Modificar el contador dentro del cuerpo**: el paso se suma otra vez y el recorrido se descontrola.",
        code: '// ❌ i se incrementa dos veces por vuelta\nfor (let i = 0; i < 5; i++) {\n  i++;\n  console.log(i);\n}\n\n// ✅ Deja que el paso controle el avance\nfor (let i = 0; i < 5; i++) {\n  console.log(i);\n}',
      },
      {
        texto: "**Bucle infinito por condición mal escrita**: `i > 0` con `i++` nunca termina.",
        code: '// ❌\nfor (let i = 0; i > 0; i++) {\n  console.log(i);\n}\n\n// ✅ La condición debe volverse falsa\nfor (let i = 0; i < 5; i++) {\n  console.log(i);\n}',
      },
    ],
    casos: [
      "Recorrer arrays por índice cuando necesitas la posición.",
      "Generar secuencias numéricas.",
      "Repetir una animación un número fijo de veces.",
      "Construir tablas de multiplicar o informes.",
    ],
    relacion: [
      "**while**: más simple cuando no conoces el número de vueltas.",
      "**for...of**: recorre valores sin índice.",
      "**for...in**: recorre claves de objetos (no recomendado para arrays).",
      "**break / continue**: controlan la salida o el salto de una vuelta.",
      "**let en for**: crea un binding nuevo por iteración, clave en closures.",
    ],
    analogia:
      "Es una cinta transportadora con contador: pones el contador a cero, compruebas si aún quedan cajas, procesas una y avanzas la cinta. Repites hasta que el contador llega al final. Todo el control del recorrido está escrito en la cabecera.",
    analogiaDiagrama: analogia(
      "for (inicio; condición; paso)",
      [
        ["🏁", "Inicio", "Se ejecuta una sola vez."],
        ["❓", "Condición", "Se comprueba antes de cada vuelta."],
        ["📦", "Cuerpo", "Trabajo de cada iteración."],
        ["➡️", "Paso", "Se ejecuta después del cuerpo."],
      ],
      "La cabecera del for concentra el control del recorrido en una sola línea.",
    ),
    relacionArbol: arbol("for", "Bucle con contador", [
      ["🏁", "Inicialización", "Se ejecuta una vez"],
      ["❓", "Condición", "Antes de cada vuelta"],
      ["📦", "Cuerpo", "Trabajo por iteración"],
      ["➡️", "Paso", "Después de cada vuelta"],
      ["🔁", "for...of", "Recorre valores sin índice"],
    ]),
    demo: {
      codigo: `let suma = 0;

for (let i = 1; i <= 5; i++) {
  suma += i;
  console.log("i =", i, "suma =", suma);
}

console.log("Total:", suma);`,
      pasos: [
        paso(1, { suma: "0" }, "", "El acumulador se declara fuera del bucle."),
        paso(3, { suma: "0", i: "1" }, "", "Se ejecuta la inicialización y la condición 1 <= 5 es true."),
        paso(4, { suma: "1", i: "1" }, "", "suma += 1 deja el acumulador en 1."),
        paso(5, { suma: "1", i: "1" }, "i = 1 suma = 1", "Se muestra la primera vuelta."),
        paso(3, { suma: "1", i: "2" }, "i = 1 suma = 1", "El paso i++ deja i en 2; la condición sigue siendo true."),
        paso(4, { suma: "3", i: "2" }, "i = 1 suma = 1", "suma acumula 2."),
        paso(5, { suma: "3", i: "2" }, "i = 1 suma = 1\ni = 2 suma = 3", "Se muestra la segunda vuelta."),
        paso(3, { suma: "3", i: "6" }, "i = 1 suma = 1\ni = 2 suma = 3", "Tras varias vueltas, i llega a 6 y la condición falla."),
        paso(8, { suma: "15", i: "6" }, "i = 1 suma = 1\ni = 2 suma = 3\n…\nTotal: 15", "El bucle termina y se muestra el total."),
      ],
    },
    scope: sc(
      "let crea un binding nuevo en cada iteración",
      `for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log("let", i), 0);
}
for (var j = 0; j < 3; j++) {
  setTimeout(() => console.log("var", j), 0);
}
console.log(typeof i);`,
      [
        ln("for (let i = 0; i < 3; i++)", "let", "bloque for", "TDZ", "0, 1, 2", "Cada vuelta tiene su propio i."),
        ln("setTimeout(() => console.log('let', i), 0);", "expresion", "bloque for", "—", "0, 1, 2", "Los callbacks capturan el i de su propia vuelta."),
        ln("for (var j = 0; j < 3; j++)", "var", "global", "undefined", "0, 1, 2, 3", "var comparte un único j para todas las vueltas."),
        ln("setTimeout(() => console.log('var', j), 0);", "expresion", "global", "—", "3, 3, 3", "Todos los callbacks ven el mismo j final."),
        ln("console.log(typeof i);", "expresion", "global", "—", '"undefined"', "i no existe fuera del for."),
      ],
      [
        "Usa let en la cabecera del for si vas a crear closures dentro del bucle.",
        "var comparte la misma variable en todas las iteraciones.",
      ],
    ),
    editor: {
      consigna: "Cambia el rango y el paso. Comprueba el off-by-one usando <= en lugar de < al recorrer un array.",
      inicial: `let suma = 0;

for (let i = 1; i <= 5; i++) {
  suma += i;
  console.log("i =", i, "suma =", suma);
}

console.log("Total:", suma);`,
      pista: "Prueba i += 2 para sumar solo los impares.",
    },
    bugs: [
      {
        titulo: "Off-by-one en un array",
        codigo: 'const frutas = ["🍎", "🍌", "🍇"];\nfor (let i = 0; i <= frutas.length; i++) {\n  console.log(frutas[i]);\n}',
        problemas: [
          "La condición <= permite llegar a i = 3.",
          "frutas[3] no existe y devuelve undefined.",
        ],
        corregido: 'const frutas = ["🍎", "🍌", "🍇"];\nfor (let i = 0; i < frutas.length; i++) {\n  console.log(frutas[i]);\n}',
        explicacion: "El último índice válido es length - 1; usa < length.",
      },
      {
        titulo: "Doble incremento",
        codigo: "for (let i = 0; i < 5; i++) {\n  i++;\n  console.log(i);\n}",
        problemas: [
          "El cuerpo incrementa i y la cabecera lo incrementa otra vez.",
          "Solo se muestran algunos valores y el recorrido se descontrola.",
        ],
        corregido: "for (let i = 0; i < 5; i++) {\n  console.log(i);\n}",
        explicacion: "Deja que el paso de la cabecera sea el único responsable del avance.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Cuántas veces se ejecuta la inicialización de un `for`?",
        opciones: ["Una.", "En cada vuelta.", "Ninguna.", "Depende de la condición."],
        correcta: 0,
        explicacion: "La inicialización ocurre una sola vez, antes de la primera condición.",
      },
      {
        id: 2,
        pregunta: "¿Qué orden sigue un `for`?",
        opciones: [
          "Inicio → condición → cuerpo → paso.",
          "Condición → inicio → paso → cuerpo.",
          "Cuerpo → inicio → condición → paso.",
          "Inicio → cuerpo → condición → paso.",
        ],
        correcta: 0,
        explicacion: "Después del cuerpo se ejecuta el paso y se vuelve a comprobar la condición.",
      },
      {
        id: 3,
        pregunta: "¿Cuál es la condición correcta para recorrer un array por índice?",
        opciones: ["i <= array.length", "i < array.length", "i > array.length", "i = array.length"],
        correcta: 1,
        explicacion: "El último índice es length - 1, por eso se usa < length.",
      },
      {
        id: 4,
        pregunta: "¿Qué ventaja tiene `let` frente a `var` en la cabecera del for?",
        opciones: [
          "Crea un binding nuevo por iteración.",
          "Hace que el bucle sea más rápido.",
          "Permite usar break.",
          "Evita declarar la condición.",
        ],
        correcta: 0,
        explicacion: "Cada vuelta captura su propio i, fundamental para closures.",
      },
    ],
    fuente: "MDN Web Docs – for · ECMAScript – For Statement · JavaScript.info – Loops: while and for",
  },

  /* ============================================================
     9 · for...in
     ============================================================ */
  {
    id: "js-for-in",
    titulo: "Bucle for...in",
    icon: "🗝️",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "for (const clave in objeto) { ... }",
    definicion: [
      "`for...in` recorre las **claves enumerables** de un objeto, incluidas las heredadas a través de su cadena de prototipos.",
    ],
    queEs: [
      "Es un bucle pensado para **objetos**, no para arrays.",
      "En cada vuelta, la variable recibe una **clave** (siempre como cadena), no el valor.",
      "Para obtener el valor hay que usar `objeto[clave]`.",
      "Recorre propiedades enumerables propias y heredadas; por eso conviene filtrar con `hasOwn`.",
    ],
    paraQueSirve: [
      "Inspeccionar las propiedades de un objeto plano.",
      "Construir listas de claves o mapas clave-valor.",
      "Depurar la forma de un objeto.",
      "Copiar propiedades propias a otro objeto (con cuidado).",
    ],
    comoFunciona: [
      "Se obtiene la lista de claves enumerables del objeto.",
      "En cada vuelta, la variable toma una clave.",
      "El cuerpo puede leer el valor con `objeto[clave]`.",
      "El orden no está garantizado para claves no enteras, aunque los motores modernos suelen seguir un orden.",
      "Al terminar todas las claves, el bucle finaliza.",
    ],
    sintaxis: [
      { caption: "Forma básica", code: 'const usuario = { nombre: "Ana", edad: 25 };\n\nfor (const clave in usuario) {\n  console.log(clave, usuario[clave]);\n}' },
      { caption: "Solo propiedades propias", code: 'for (const clave in usuario) {\n  if (Object.hasOwn(usuario, clave)) {\n    console.log(clave);\n  }\n}' },
    ],
    nota: 'No uses `for...in` para recorrer arrays: las claves son cadenas (`"0"`, `"1"`), puede incluir propiedades heredadas y el orden no es el que esperas.',
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Recorrer un objeto",
        descripcion: "La variable contiene la clave, no el valor.",
        code: 'const usuario = { nombre: "Ana", edad: 25, activo: true };\n\nfor (const clave in usuario) {\n  console.log(clave, "→", usuario[clave]);\n}',
      },
      {
        titulo: "Ejemplo 2 · Filtrar propiedades heredadas",
        descripcion: "`Object.hasOwn` asegura que la propiedad es del objeto.",
        code: 'const base = { heredada: true };\nconst hijo = Object.create(base);\nhijo.propia = "sí";\n\nfor (const clave in hijo) {\n  if (Object.hasOwn(hijo, clave)) {\n    console.log("propia:", clave);\n  }\n}',
      },
      {
        titulo: "Ejemplo 3 · Por qué no usarlo con arrays",
        descripcion: "El índice llega como cadena y puede colarse una propiedad extra.",
        code: 'const frutas = ["🍎", "🍌"];\nfrutas.extra = "no es un elemento";\n\nfor (const indice in frutas) {\n  console.log(typeof indice, indice);\n}',
      },
    ],
    errores: [
      {
        texto: "**Usar for...in en arrays**: obtienes índices como cadenas y propiedades añadidas.",
        code: '// ❌\nfor (const i in array) {\n  console.log(array[i]);\n}\n\n// ✅ Para arrays usa for...of o un for clásico\nfor (const valor of array) {\n  console.log(valor);\n}',
      },
      {
        texto: "**Olvidar las propiedades heredadas**: el bucle puede visitar claves que no declaraste.",
        code: '// ❌ Puede incluir heredadas\nfor (const clave in objeto) {\n  console.log(clave);\n}\n\n// ✅\nfor (const clave in objeto) {\n  if (Object.hasOwn(objeto, clave)) {\n    console.log(clave);\n  }\n}',
      },
      {
        texto: "**Esperar el valor en la variable**: for...in entrega la clave, no el valor.",
        code: '// ❌ Muestra las claves, no los valores\nfor (const valor in usuario) {\n  console.log(valor);\n}\n\n// ✅\nfor (const clave in usuario) {\n  console.log(usuario[clave]);\n}',
      },
    ],
    casos: [
      "Listar las propiedades de un objeto de configuración.",
      "Construir un mapa de claves a valores para una tabla.",
      "Depurar qué propiedades tiene un objeto.",
      "Copiar selectivamente propiedades propias.",
    ],
    relacion: [
      "**for...of**: recorre valores de iterables, no claves de objetos.",
      "**Object.keys / values / entries**: alternativas modernas y más seguras.",
      "**Object.hasOwn**: filtra propiedades heredadas.",
      "**Prototipos**: explica por qué aparecen claves heredadas.",
      "**Arrays**: para índices, mejor `for` clásico o `for...of`.",
    ],
    analogia:
      "Es como abrir un archivador y leer las **etiquetas** de cada carpeta. Para ver lo que hay dentro, tienes que abrir la carpeta usando su etiqueta (`objeto[clave]`). Además, el archivador puede incluir carpetas heredadas de otra oficina que no sabías que estaban ahí.",
    analogiaDiagrama: analogia(
      "for...in",
      [
        ["🏷️", "Clave", "La variable recibe la etiqueta, no el contenido."],
        ["📂", "Valor", "Se obtiene con objeto[clave]."],
        ["🧬", "Heredadas", "Puede incluir propiedades del prototipo."],
        ["🚫", "Arrays", "No es el bucle adecuado para ellos."],
      ],
      "for...in recorre etiquetas de objetos; para valores de arrays usa for...of.",
    ),
    relacionArbol: arbol("for...in", "Recorrido de claves", [
      ["🏷️", "clave", "Siempre es una cadena"],
      ["📂", "objeto[clave]", "Acceso al valor"],
      ["🧬", "Cadena de prototipos", "Puede aportar claves heredadas"],
      ["🛡️", "Object.hasOwn", "Filtra las propias"],
      ["📦", "for...of", "Alternativa para valores iterables"],
    ]),
    demo: {
      codigo: `const usuario = { nombre: "Ana", edad: 25, activo: true };

for (const clave in usuario) {
  console.log(clave, "→", usuario[clave]);
}

console.log("Fin del recorrido");`,
      pasos: [
        paso(1, { usuario: "{ nombre, edad, activo }" }, "", "El objeto tiene tres propiedades enumerables."),
        paso(3, { usuario: "{…}", clave: '"nombre"' }, "", "Primera clave: nombre."),
        paso(4, { usuario: "{…}", clave: '"nombre"' }, "nombre → Ana", "Se lee usuario[clave] para obtener el valor."),
        paso(3, { usuario: "{…}", clave: '"edad"' }, "nombre → Ana", "Segunda clave: edad."),
        paso(4, { usuario: "{…}", clave: '"edad"' }, "nombre → Ana\nedad → 25", "Se obtiene el valor 25."),
        paso(3, { usuario: "{…}", clave: '"activo"' }, "nombre → Ana\nedad → 25", "Tercera clave: activo."),
        paso(4, { usuario: "{…}", clave: '"activo"' }, "nombre → Ana\nedad → 25\nactivo → true", "Se obtiene el valor true."),
        paso(7, { usuario: "{…}" }, "nombre → Ana\nedad → 25\nactivo → true\nFin del recorrido", "No quedan claves: el bucle termina."),
      ],
    },
    scope: sc(
      "La clave es una variable nueva en cada vuelta",
      `const usuario = { nombre: "Ana", edad: 25 };
for (const clave in usuario) {
  let valor = usuario[clave];
  console.log(clave, valor);
}
console.log(typeof clave);
console.log(typeof valor);`,
      [
        ln('const usuario = { nombre: "Ana", edad: 25 };', "const", "global", "TDZ", "objeto", "El objeto que se va a recorrer."),
        ln("for (const clave in usuario)", "const", "bloque for-in", "TDZ", '"nombre", "edad"', "clave se crea de nuevo en cada iteración."),
        ln("let valor = usuario[clave];", "let", "bloque for-in", "TDZ", '"Ana", 25', "valor también es local de cada vuelta."),
        ln("console.log(typeof clave);", "expresion", "global", "—", '"undefined"', "clave no existe fuera del bucle."),
        ln("console.log(typeof valor);", "expresion", "global", "—", '"undefined"', "valor tampoco sobrevive al bucle."),
      ],
      [
        "La variable del for-in es local del bucle si usas const o let.",
        "Dentro del cuerpo puedes declarar variables auxiliares que se recrean en cada vuelta.",
      ],
    ),
    editor: {
      consigna: "Recorre el objeto y muestra clave y valor. Después añade una propiedad al prototipo para comprobar el problema de las claves heredadas.",
      inicial: `const usuario = { nombre: "Ana", edad: 25, activo: true };

for (const clave in usuario) {
  console.log(clave, "→", usuario[clave]);
}`,
      pista: "Prueba Object.hasOwn(usuario, clave) para filtrar.",
    },
    bugs: [
      {
        titulo: "for...in sobre un array",
        codigo: 'const frutas = ["🍎", "🍌", "🍇"];\nfrutas.extra = "propiedad";\nfor (const i in frutas) {\n  console.log(i, frutas[i]);\n}',
        problemas: [
          'Los índices llegan como cadenas ("0", "1", "2").',
          "La propiedad extra también se recorre aunque no sea un elemento.",
        ],
        corregido: 'const frutas = ["🍎", "🍌", "🍇"];\nfor (const fruta of frutas) {\n  console.log(fruta);\n}',
        explicacion: "Para arrays usa for...of o un for clásico por índice.",
      },
      {
        titulo: "Claves heredadas",
        codigo: 'const base = { heredada: "sí" };\nconst hijo = Object.create(base);\nhijo.propia = "también";\nfor (const clave in hijo) {\n  console.log(clave);\n}',
        problemas: [
          "El bucle muestra también la clave heredada.",
          "Puedes procesar propiedades que no pertenecen al objeto.",
        ],
        corregido: 'const base = { heredada: "sí" };\nconst hijo = Object.create(base);\nhijo.propia = "también";\nfor (const clave in hijo) {\n  if (Object.hasOwn(hijo, clave)) {\n    console.log(clave);\n  }\n}',
        explicacion: "Filtra con Object.hasOwn para quedarte solo con las propiedades propias.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué recibe la variable en cada vuelta de `for...in`?",
        opciones: ["El valor de la propiedad.", "La clave de la propiedad.", "El índice numérico.", "El objeto completo."],
        correcta: 1,
        explicacion: "for...in entrega claves; para el valor usa objeto[clave].",
      },
      {
        id: 2,
        pregunta: "¿Qué tipo tiene la clave en un `for...in`?",
        opciones: ["Siempre number.", "Siempre string.", "Siempre symbol.", "Depende de la propiedad."],
        correcta: 1,
        explicacion: "Las claves se entregan como cadenas, incluso los índices de un array.",
      },
      {
        id: 3,
        pregunta: "¿Qué bucle es más adecuado para un array de valores?",
        opciones: ["for...in", "for...of", "switch", "do...while"],
        correcta: 1,
        explicacion: "for...of recorre valores y evita índices como cadenas.",
      },
      {
        id: 4,
        pregunta: "¿Para qué sirve `Object.hasOwn(objeto, clave)`?",
        opciones: [
          "Para comprobar si la propiedad es propia y no heredada.",
          "Para convertir la clave en número.",
          "Para ordenar las claves.",
          "Para borrar la propiedad.",
        ],
        correcta: 0,
        explicacion: "Filtra las propiedades heredadas de la cadena de prototipos.",
      },
    ],
    fuente: "MDN Web Docs – for...in · ECMAScript – for-in Statement · JavaScript.info – Object property enumeration",
  },

  /* ============================================================
     10 · for...of
     ============================================================ */
  {
    id: "js-for-of",
    titulo: "Bucle for...of",
    icon: "📦",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "for (const valor of iterable) { ... }",
    definicion: [
      "`for...of` recorre los **valores** de un objeto iterable: arrays, cadenas, `Map`, `Set`, `arguments`, `NodeList` y cualquier objeto con `Symbol.iterator`.",
    ],
    queEs: [
      "Es el bucle moderno para recorrer valores sin preocuparte por índices.",
      "Funciona con todo lo que implemente el protocolo de iteración.",
      "En cada vuelta, la variable recibe directamente el valor.",
      "No funciona con objetos planos, porque no son iterables por defecto.",
    ],
    paraQueSirve: [
      "Recorrer arrays y cadenas de forma legible.",
      "Iterar `Map` y `Set` con sus valores o pares.",
      "Usar `break` y `continue` en un recorrido limpio.",
      "Evitar los problemas de `for...in` con arrays.",
    ],
    comoFunciona: [
      "Se llama al método `[Symbol.iterator]()` del objeto.",
      "Se obtiene un iterador con el método `next()`.",
      "Cada `next()` devuelve `{ value, done }`.",
      "El bucle asigna `value` a la variable y ejecuta el cuerpo.",
      "Cuando `done` es true, el bucle termina.",
    ],
    sintaxis: [
      { caption: "Forma básica", code: 'const frutas = ["🍎", "🍌", "🍇"];\n\nfor (const fruta of frutas) {\n  console.log(fruta);\n}' },
      { caption: "Con índice usando entries()", code: "for (const [i, fruta] of frutas.entries()) {\n  console.log(i, fruta);\n}" },
      { caption: "Map y Set", code: 'const stock = new Map([["🍎", 3], ["🍌", 5]]);\n\nfor (const [fruta, cantidad] of stock) {\n  console.log(fruta, cantidad);\n}' },
    ],
    nota: "`for...of` no recorre objetos planos. Si necesitas sus valores, usa `Object.values(obj)` o `Object.entries(obj)`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Array de frutas",
        descripcion: "La variable recibe cada valor, no el índice.",
        code: 'const frutas = ["🍎", "🍌", "🍇"];\n\nfor (const fruta of frutas) {\n  console.log(fruta);\n}',
      },
      {
        titulo: "Ejemplo 2 · Cadena de texto",
        descripcion: "Las cadenas también son iterables carácter a carácter.",
        code: 'for (const letra of "Hola") {\n  console.log(letra);\n}',
      },
      {
        titulo: "Ejemplo 3 · Map",
        descripcion: "Cada vuelta entrega un par [clave, valor].",
        code: 'const stock = new Map([\n  ["🍎", 3],\n  ["🍌", 5],\n]);\n\nfor (const [fruta, cantidad] of stock) {\n  console.log(fruta + ": " + cantidad);\n}',
      },
    ],
    errores: [
      {
        texto: "**Usar for...of con un objeto plano**: no es iterable y lanza TypeError.",
        code: '// ❌ TypeError: objeto is not iterable\nfor (const valor of { a: 1, b: 2 }) {\n  console.log(valor);\n}\n\n// ✅\nfor (const valor of Object.values({ a: 1, b: 2 })) {\n  console.log(valor);\n}',
      },
      {
        texto: "**Esperar el índice**: for...of entrega el valor, no la posición.",
        code: '// ❌ i es el valor, no el índice\nfor (const i of ["a", "b"]) {\n  console.log(i, array[i]);\n}\n\n// ✅\nfor (const [i, valor] of array.entries()) {\n  console.log(i, valor);\n}',
      },
      {
        texto: "**Modificar el array mientras lo recorres**: el iterador puede saltarse o repetir elementos.",
        code: '// ❌ Cambiar la longitud durante el recorrido\nfor (const fruta of frutas) {\n  frutas.push(fruta);\n}\n\n// ✅ Recorre una copia si necesitas modificar\nfor (const fruta of [...frutas]) {\n  frutas.push(fruta);\n}',
      },
    ],
    casos: [
      "Recorrer arrays de objetos para renderizar listas.",
      "Iterar los caracteres de un texto.",
      "Recorrer Map y Set.",
      "Procesar NodeList del DOM.",
    ],
    relacion: [
      "**for...in**: recorre claves de objetos, no valores.",
      "**for clásico**: necesario cuando quieres el índice o control fino.",
      "**Symbol.iterator**: protocolo que hace iterable a un objeto.",
      "**Map / Set**: estructuras iterables por excelencia.",
      "**break / continue**: funcionan igual que en otros bucles.",
    ],
    analogia:
      "Es como sacar caramelos de una bolsa uno por uno: no te importa el número de envoltorio, solo el caramelo. La bolsa solo tiene que ser “sacable” (iterable). Un objeto plano no es una bolsa de caramelos, así que no puedes usarlo directamente.",
    analogiaDiagrama: analogia(
      "for...of",
      [
        ["🍬", "Valor", "Recibes el contenido, no la etiqueta."],
        ["🎒", "Iterable", "Array, string, Map, Set, NodeList…"],
        ["🔁", "Iterador", "next() devuelve { value, done }."],
        ["🚫", "Objeto plano", "No es iterable; usa Object.values()."],
      ],
      "for...of habla el idioma del protocolo de iteración.",
    ),
    relacionArbol: arbol("for...of", "Recorrido de valores iterables", [
      ["🍬", "valor", "El contenido de cada vuelta"],
      ["🎒", "Iterable", "Debe implementar Symbol.iterator"],
      ["🔁", "Iterador", "next() → { value, done }"],
      ["🧩", "entries()", "Añade el índice a arrays"],
      ["🗝️", "for...in", "Alternativa para claves de objetos"],
    ]),
    demo: {
      codigo: `const frutas = ["🍎", "🍌", "🍇"];

for (const fruta of frutas) {
  console.log(fruta);
}

for (const letra of "Hola") {
  console.log(letra);
}`,
      pasos: [
        paso(1, { frutas: '["🍎","🍌","🍇"]' }, "", "El array es iterable."),
        paso(3, { frutas: '["🍎","🍌","🍇"]', fruta: '"🍎"' }, "", "Primera vuelta: fruta recibe el primer valor."),
        paso(4, { frutas: '["🍎","🍌","🍇"]', fruta: '"🍎"' }, "🍎", "Se imprime el valor."),
        paso(3, { frutas: '["🍎","🍌","🍇"]', fruta: '"🍌"' }, "🍎", "Segunda vuelta: fruta recibe 🍌."),
        paso(4, { frutas: '["🍎","🍌","🍇"]', fruta: '"🍌"' }, "🍎\n🍌", "Se imprime el segundo valor."),
        paso(3, { frutas: '["🍎","🍌","🍇"]', fruta: '"🍇"' }, "🍎\n🍌", "Tercera vuelta: fruta recibe 🍇."),
        paso(4, { frutas: '["🍎","🍌","🍇"]', fruta: '"🍇"' }, "🍎\n🍌\n🍇", "Se imprime el tercer valor."),
        paso(7, { frutas: '["🍎","🍌","🍇"]', letra: '"H"' }, "🍎\n🍌\n🍇", "El array termina; comienza el recorrido de la cadena."),
        paso(8, { letra: '"H"' }, "🍎\n🍌\n🍇\nH", "Las cadenas se recorren carácter a carácter."),
      ],
    },
    scope: sc(
      "Cada valor vive en su propia iteración",
      `const frutas = ["🍎", "🍌"];
for (const fruta of frutas) {
  let mensaje = "Fruta: " + fruta;
  console.log(mensaje);
}
console.log(typeof fruta);
console.log(typeof mensaje);`,
      [
        ln('const frutas = ["🍎", "🍌"];', "const", "global", "TDZ", "array", "El iterable que se va a recorrer."),
        ln("for (const fruta of frutas)", "const", "bloque for-of", "TDZ", '"🍎", "🍌"', "fruta se recrea con cada valor."),
        ln('let mensaje = "Fruta: " + fruta;', "let", "bloque for-of", "TDZ", '"Fruta: 🍎"', "mensaje es local de la vuelta."),
        ln("console.log(typeof fruta);", "expresion", "global", "—", '"undefined"', "fruta no existe fuera del bucle."),
        ln("console.log(typeof mensaje);", "expresion", "global", "—", '"undefined"', "mensaje tampoco sobrevive."),
      ],
      [
        "const en la cabecera es válido porque cada vuelta crea un binding nuevo.",
        "Las variables del cuerpo se recrean en cada iteración.",
      ],
    ),
    editor: {
      consigna: "Recorre frutas y caracteres. Después intenta recorrer un objeto plano para ver el TypeError.",
      inicial: `const frutas = ["🍎", "🍌", "🍇"];

for (const fruta of frutas) {
  console.log(fruta);
}

for (const letra of "Hola") {
  console.log(letra);
}`,
      pista: "Prueba for (const x of {a:1}) y observa el error.",
    },
    bugs: [
      {
        titulo: "Objeto plano no iterable",
        codigo: "const usuario = { nombre: 'Ana', edad: 25 };\nfor (const valor of usuario) {\n  console.log(valor);\n}",
        problemas: [
          "Los objetos planos no implementan Symbol.iterator.",
          "Se lanza TypeError: usuario is not iterable.",
        ],
        corregido: "const usuario = { nombre: 'Ana', edad: 25 };\nfor (const valor of Object.values(usuario)) {\n  console.log(valor);\n}",
        explicacion: "Convierte el objeto en un iterable con Object.values, Object.keys o Object.entries.",
      },
      {
        titulo: "Esperar el índice",
        codigo: "const frutas = ['🍎', '🍌'];\nfor (const i of frutas) {\n  console.log(i, frutas[i]);\n}",
        problemas: [
          'i contiene el valor ("🍎"), no el índice.',
          'frutas["🍎"] es undefined.',
        ],
        corregido: "const frutas = ['🍎', '🍌'];\nfor (const [i, fruta] of frutas.entries()) {\n  console.log(i, fruta);\n}",
        explicacion: "Usa entries() si necesitas índice y valor al mismo tiempo.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué recorre `for...of`?",
        opciones: ["Las claves de un objeto.", "Los valores de un iterable.", "Solo números.", "Las propiedades heredadas."],
        correcta: 1,
        explicacion: "for...of usa el protocolo de iteración y entrega valores.",
      },
      {
        id: 2,
        pregunta: "¿Qué ocurre al usar `for...of` con un objeto plano?",
        opciones: ["Recorre sus valores.", "Recorre sus claves.", "Lanza TypeError: no es iterable.", "Devuelve undefined."],
        correcta: 2,
        explicacion: "Los objetos planos no implementan Symbol.iterator.",
      },
      {
        id: 3,
        pregunta: "¿Cómo obtienes índice y valor en un `for...of`?",
        opciones: ["for (const i of array)", "array.entries()", "array.keys()", "for...in"],
        correcta: 1,
        explicacion: "entries() devuelve pares [índice, valor].",
      },
      {
        id: 4,
        pregunta: "¿Cuál de estos NO es iterable por defecto?",
        opciones: ["Array", "String", "Map", "Objeto plano"],
        correcta: 3,
        explicacion: "Un objeto plano no tiene Symbol.iterator.",
      },
    ],
    fuente: "MDN Web Docs – for...of · ECMAScript – Iteration protocols · JavaScript.info – Iterables",
  },
  /* ============================================================
     11 · function
     ============================================================ */
  {
    id: "js-funcion",
    titulo: "function",
    icon: "🧩",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "function nombre(parametros) { ... }",
    definicion: [
      "`function` es la palabra reservada que declara una **función**: un bloque de código reutilizable que recibe parámetros, ejecuta una tarea y puede devolver un valor.",
    ],
    queEs: [
      "Una función es un valor de primera clase: se puede guardar en variables, pasar como argumento y devolver.",
      "Las **declaraciones** de función se elevan completas y se pueden llamar antes de su línea.",
      "Las **expresiones** de función y las **arrow functions** se asignan a una variable y siguen las reglas de esa variable.",
      "Los parámetros son locales; los cambios dentro de la función no afectan al exterior salvo que muten un objeto.",
    ],
    paraQueSirve: [
      "Reutilizar lógica sin repetir código.",
      "Dividir un problema grande en partes pequeñas.",
      "Encapsular detalles y exponer una interfaz clara.",
      "Crear callbacks para eventos, arrays y promesas.",
    ],
    comoFunciona: [
      "Al llamar a la función, se crea un nuevo **contexto de ejecución**.",
      "Los argumentos se asignan a los parámetros.",
      "Se ejecuta el cuerpo hasta un `return` o hasta el final.",
      "El contexto se destruye y el valor de retorno vuelve al llamador.",
      "Si no hay `return`, la función devuelve `undefined`.",
    ],
    sintaxis: [
      { caption: "Declaración", code: 'function sumar(a, b) {\n  return a + b;\n}\n\nconsole.log(sumar(2, 3)); // 5' },
      { caption: "Expresión de función", code: "const restar = function (a, b) {\n  return a - b;\n};" },
      { caption: "Arrow function", code: "const multiplicar = (a, b) => a * b;" },
      { caption: "Parámetros por defecto y rest", code: 'function saludar(nombre = "invitado", ...extra) {\n  return "Hola " + nombre + " " + extra.join(" ");\n}' },
    ],
    nota: "Una función sin `return` devuelve `undefined`. No confundas `console.log` con devolver un valor.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Declaración y llamada",
        descripcion: "La declaración se eleva: puedes llamarla antes.",
        code: "console.log(sumar(2, 3)); // 5\n\nfunction sumar(a, b) {\n  return a + b;\n}",
      },
      {
        titulo: "Ejemplo 2 · Parámetros por defecto",
        descripcion: "Si falta el argumento, se usa el valor por defecto.",
        code: 'function saludar(nombre = "invitado") {\n  return "Hola, " + nombre;\n}\n\nconsole.log(saludar());        // Hola, invitado\nconsole.log(saludar("Ana"));   // Hola, Ana',
      },
      {
        titulo: "Ejemplo 3 · Arrow function",
        descripcion: "Sintaxis corta y `this` léxico.",
        code: 'const doble = (n) => n * 2;\nconsole.log(doble(4)); // 8\n\nconst frutas = ["🍎", "🍌"];\nconsole.log(frutas.map((f) => f + "!"));',
      },
    ],
    errores: [
      {
        texto: "**Llamar una expresión de función antes de definirla**: no se eleva como las declaraciones.",
        code: "// ❌ ReferenceError\nconsole.log(restar(5, 2));\nconst restar = function (a, b) {\n  return a - b;\n};\n\n// ✅\nconst restar2 = function (a, b) {\n  return a - b;\n};\nconsole.log(restar2(5, 2));",
      },
      {
        texto: "**Olvidar el return**: la función hace el cálculo pero devuelve undefined.",
        code: "// ❌ Devuelve undefined\nfunction sumar(a, b) {\n  const total = a + b;\n}\n\n// ✅\nfunction sumarBien(a, b) {\n  return a + b;\n}",
      },
      {
        texto: "**Confundir parámetro con argumento**: el parámetro es la variable; el argumento es el valor que pasas.",
        code: 'function saludar(nombre) { // nombre es el parámetro\n  return "Hola " + nombre;\n}\n\nsaludar("Ana"); // "Ana" es el argumento',
      },
    ],
    casos: [
      "Validar y transformar datos antes de mostrarlos.",
      "Crear utilidades reutilizables: formatear fechas, calcular totales.",
      "Callbacks de eventos y de métodos de array.",
      "Encapsular llamadas a APIs.",
    ],
    relacion: [
      "**return**: devuelve el resultado y termina la función.",
      "**Parámetros y argumentos**: entradas de la función.",
      "**Scope**: cada llamada crea un contexto con sus variables locales.",
      "**Closures**: una función puede recordar el ámbito donde se creó.",
      "**Arrow functions**: sintaxis corta con `this` léxico.",
    ],
    analogia:
      "Una función es una máquina expendedora: metes monedas (argumentos), la máquina hace su trabajo y te devuelve un producto (return). Si no tiene producto que dar, te devuelve `undefined`. La máquina puede usarse muchas veces con distintas monedas.",
    analogiaDiagrama: analogia(
      "function",
      [
        ["🎛️", "Parámetros", "Entradas declaradas en la firma."],
        ["⚙️", "Cuerpo", "Trabajo que realiza la función."],
        ["🎁", "return", "Salida que devuelve al llamador."],
        ["📦", "Contexto", "Variables locales que se crean en cada llamada."],
      ],
      "Sin return, la máquina funciona pero no entrega nada: devuelve undefined.",
    ),
    relacionArbol: arbol("function", "Bloque reutilizable", [
      ["🎛️", "Parámetros", "Variables de entrada"],
      ["⚙️", "Cuerpo", "Código que se ejecuta"],
      ["🎁", "return", "Valor de salida"],
      ["📦", "Scope local", "Variables que mueren al terminar"],
      ["🔒", "Closure", "Memoria del ámbito de creación"],
    ]),
    demo: {
      codigo: `console.log(sumar(2, 3));

function sumar(a, b) {
  return a + b;
}

const restar = function (a, b) {
  return a - b;
};

console.log(restar(5, 2));`,
      pasos: [
        paso(1, { sumar: "ƒ sumar(a, b)" }, "", "La declaración de función se eleva completa antes de ejecutar."),
        paso(3, { sumar: "ƒ sumar(a, b)", a: "2", b: "3" }, "", "Se crea el contexto de sumar con sus parámetros.", ["global", "sumar(2, 3)"]),
        paso(4, { sumar: "ƒ sumar(a, b)", a: "2", b: "3" }, "5", "return calcula 5 y termina la función.", ["global", "sumar(2, 3)"]),
        paso(7, { sumar: "ƒ sumar(a, b)", restar: "ƒ (a, b)" }, "5", "La expresión de función se asigna a restar.", ["global"]),
        paso(11, { sumar: "ƒ sumar(a, b)", restar: "ƒ (a, b)", a: "5", b: "2" }, "5", "Se llama a restar con 5 y 2.", ["global", "restar(5, 2)"]),
        paso(8, { sumar: "ƒ sumar(a, b)", restar: "ƒ (a, b)", a: "5", b: "2" }, "5", "Dentro de restar, a - b se evalúa como 3.", ["global", "restar(5, 2)"]),
        paso(11, { sumar: "ƒ sumar(a, b)", restar: "ƒ (a, b)" }, "5\n3", "El resultado vuelve al console.log.", ["global"]),
      ],
    },
    scope: sc(
      "Declaración, expresión y arrow no se elevan igual",
      `console.log(declarada());
// console.log(expresada()); // ReferenceError

function declarada() {
  return "declaración";
}

const expresada = function () {
  return "expresión";
};

const arrow = () => "arrow";

console.log(expresada(), arrow());`,
      [
        ln("function declarada() {", "function", "global", "ƒ declarada()", "ƒ declarada()", "La declaración se eleva completa: se puede llamar antes."),
        ln("const expresada = function () {", "const", "global", "TDZ", "ƒ función", "La expresión está en TDZ hasta esta línea."),
        ln("const arrow = () => 'arrow';", "const", "global", "TDZ", "ƒ arrow", "La arrow sigue las reglas de const."),
        ln("console.log(expresada(), arrow());", "expresion", "global", "—", "expresión arrow", "Solo se puede llamar después de la asignación."),
      ],
      [
        "Las declaraciones de función se elevan completas.",
        "Las expresiones y arrows se elevan como variables: quedan en TDZ hasta su línea.",
      ],
    ),
    editor: {
      consigna: "Crea una función con parámetros por defecto y otra con return. Comprueba qué devuelve una función sin return.",
      inicial: `console.log(sumar(2, 3));

function sumar(a, b) {
  return a + b;
}

function sinReturn(a, b) {
  const total = a + b;
}

console.log(sinReturn(2, 3));
console.log(typeof sinReturn(2, 3));`,
      pista: "Observa la diferencia entre console.log dentro y return.",
    },
    bugs: [
      {
        titulo: "Llamar antes de la expresión",
        codigo: "console.log(restar(5, 2));\nconst restar = function (a, b) {\n  return a - b;\n};",
        problemas: [
          "La expresión de función está en TDZ antes de su línea.",
          "Se lanza ReferenceError: Cannot access 'restar' before initialization.",
        ],
        corregido: "const restar = function (a, b) {\n  return a - b;\n};\nconsole.log(restar(5, 2));",
        explicacion: "Define la expresión antes de llamarla, o usa una declaración de función.",
      },
      {
        titulo: "Falta return",
        codigo: "function sumar(a, b) {\n  const total = a + b;\n}\nconsole.log(sumar(2, 3));",
        problemas: [
          "La función calcula total pero no lo devuelve.",
          "console.log recibe undefined.",
        ],
        corregido: "function sumar(a, b) {\n  return a + b;\n}\nconsole.log(sumar(2, 3)); // 5",
        explicacion: "return entrega el valor al llamador; sin return, el resultado es undefined.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve una función sin `return`?",
        opciones: ["null", "0", "undefined", "El último valor calculado"],
        correcta: 2,
        explicacion: "JavaScript devuelve undefined cuando la función termina sin return.",
      },
      {
        id: 2,
        pregunta: "¿Qué se eleva completa al inicio del ámbito?",
        opciones: ["La expresión de función.", "La declaración de función.", "La arrow function.", "Los parámetros."],
        correcta: 1,
        explicacion: "Las declaraciones function se elevan con su cuerpo.",
      },
      {
        id: 3,
        pregunta: "¿Cuál es la diferencia entre parámetro y argumento?",
        opciones: [
          "El parámetro es la variable; el argumento es el valor que se pasa.",
          "Son exactamente lo mismo.",
          "El argumento se declara en la firma.",
          "El parámetro solo existe en arrow functions.",
        ],
        correcta: 0,
        explicacion: "El parámetro se declara; el argumento se pasa en la llamada.",
      },
      {
        id: 4,
        pregunta: "¿Qué sintaxis crea una arrow function?",
        opciones: ["function (a) {}", "(a) => a * 2", "arrow (a) {}", "def (a): a * 2"],
        correcta: 1,
        explicacion: "La flecha => define una arrow function.",
      },
    ],
    fuente: "MDN Web Docs – Functions · ECMAScript – Function definitions · JavaScript.info – Functions",
  },

  /* ============================================================
     12 · return
     ============================================================ */
  {
    id: "js-return",
    titulo: "return",
    icon: "🎁",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "return valor;",
    definicion: [
      "`return` termina la ejecución de una función y **devuelve un valor** al lugar desde donde se llamó.",
    ],
    queEs: [
      "Es la salida de una función: todo lo que esté después de un `return` ejecutado no se ejecuta.",
      "Puede devolver cualquier valor: número, cadena, objeto, array, función o `undefined`.",
      "Un `return` sin expresión devuelve `undefined` y corta la función.",
      "Solo se puede usar dentro de una función; en el nivel superior lanza SyntaxError.",
    ],
    paraQueSirve: [
      "Entregar el resultado de un cálculo.",
      "Salir temprano cuando una validación falla.",
      "Devolver varios valores empaquetados en un objeto o array.",
      "Cortar un recorrido en cuanto se encuentra lo buscado.",
    ],
    comoFunciona: [
      "Se evalúa la expresión que sigue a `return` (si existe).",
      "Ese valor se convierte en el resultado de la llamada.",
      "El contexto de la función se destruye y el control vuelve al llamador.",
      "El código posterior al return dentro de la misma función no se ejecuta.",
    ],
    sintaxis: [
      { caption: "Devolver un valor", code: "function sumar(a, b) {\n  return a + b;\n}" },
      { caption: "Salida temprana", code: 'function dividir(a, b) {\n  if (b === 0) return "No se puede dividir entre 0";\n  return a / b;\n}' },
      { caption: "Devolver un objeto", code: "function crearUsuario(nombre) {\n  return { nombre, activo: true };\n}" },
    ],
    nota: "No pongas un salto de línea entre `return` y el valor: JavaScript inserta un punto y coma automático y devuelve `undefined`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Resultado de una operación",
        descripcion: "El valor vuelve al llamador.",
        code: "function sumar(a, b) {\n  return a + b;\n}\n\nconst total = sumar(2, 3);\nconsole.log(total); // 5",
      },
      {
        titulo: "Ejemplo 2 · Salida temprana",
        descripcion: "El return evita evaluar el resto de la función.",
        code: 'function clasificar(edad) {\n  if (edad < 0) return "Edad inválida";\n  if (edad < 18) return "Menor";\n  return "Mayor";\n}\n\nconsole.log(clasificar(20)); // "Mayor"',
      },
      {
        titulo: "Ejemplo 3 · Devolver varios valores",
        descripcion: "Se empaquetan en un objeto para mantenerlos legibles.",
        code: "function estadisticas(numeros) {\n  const suma = numeros.reduce((a, n) => a + n, 0);\n  return {\n    suma,\n    promedio: suma / numeros.length,\n    cantidad: numeros.length,\n  };\n}\n\nconsole.log(estadisticas([2, 4, 6]));",
      },
    ],
    errores: [
      {
        texto: "**Salto de línea después de return**: el ASI inserta un punto y coma y devuelve undefined.",
        code: "// ❌ Devuelve undefined\nfunction crear() {\n  return\n    { activo: true };\n}\n\n// ✅\nfunction crearBien() {\n  return { activo: true };\n}",
      },
      {
        texto: "**Creer que return sale de un forEach**: el return solo sale del callback, no del método.",
        code: "// ❌ No detiene el forEach\n[1, 2, 3].forEach((n) => {\n  if (n === 2) return;\n  console.log(n);\n});\n\n// ✅ Usa un for...of y return dentro de la función\nfunction buscar(numeros) {\n  for (const n of numeros) {\n    if (n === 2) return n;\n  }\n}",
      },
      {
        texto: "**Olvidar devolver el resultado**: la función hace el cálculo pero el llamador recibe undefined.",
        code: "// ❌\nfunction doble(n) {\n  n * 2;\n}\n\n// ✅\nfunction dobleBien(n) {\n  return n * 2;\n}",
      },
    ],
    casos: [
      "Devolver el resultado de una validación o cálculo.",
      "Salir de una función en cuanto se encuentra un error.",
      "Devolver datos combinados en un objeto.",
      "Cortar una búsqueda al encontrar el primer elemento.",
    ],
    relacion: [
      "**function**: return es su mecanismo de salida.",
      "**undefined**: valor por defecto si no hay return.",
      "**ASI**: el salto de línea puede romper el return.",
      "**for...of / for**: return sale de la función, no solo del bucle.",
      "**try...finally**: finally se ejecuta aunque haya return.",
    ],
    analogia:
      "Es el mostrador de entrega de una fábrica: cuando el producto está listo, lo pones en el mostrador y cierras la fábrica por ese pedido. Todo lo que había después queda sin hacer. Si el mostrador está vacío, entregas `undefined`.",
    analogiaDiagrama: analogia(
      "return",
      [
        ["🎁", "Valor", "Lo que la función entrega."],
        ["✂️", "Corte", "El resto de la función no se ejecuta."],
        ["🏁", "Fin", "El control vuelve al llamador."],
        ["⚠️", "ASI", "Un salto de línea puede cambiar el resultado."],
      ],
      "return no imprime: devuelve. console.log muestra; return entrega.",
    ),
    relacionArbol: arbol("return", "Salida de la función", [
      ["🎁", "Valor devuelto", "Puede ser cualquier tipo"],
      ["✂️", "Corte inmediato", "Lo posterior no se ejecuta"],
      ["♻️", "Contexto destruido", "Las variables locales desaparecen"],
      ["⚠️", "ASI", "Salto de línea peligroso"],
      ["🧩", "Callback", "return solo sale del callback, no del método"],
    ]),
    demo: {
      codigo: `function clasificar(edad) {
  if (edad < 0) {
    return "Edad inválida";
  }
  if (edad < 18) {
    return "Menor";
  }
  return "Mayor";
}

console.log(clasificar(20));
console.log(clasificar(-1));`,
      pasos: [
        paso(1, { clasificar: "ƒ clasificar(edad)" }, "", "La función se declara y se eleva."),
        paso(11, { clasificar: "ƒ clasificar(edad)", edad: "20" }, "", "Se llama con edad 20.", ["global", "clasificar(20)"]),
        paso(2, { edad: "20" }, "", "20 < 0 es false: no entra en la primera guarda.", ["global", "clasificar(20)"]),
        paso(5, { edad: "20" }, "", "20 < 18 es false: tampoco entra en la segunda.", ["global", "clasificar(20)"]),
        paso(8, { edad: "20" }, "Mayor", "Llega al return final y devuelve Mayor.", ["global", "clasificar(20)"]),
        paso(12, { clasificar: "ƒ clasificar(edad)", edad: "-1" }, "Mayor", "Segunda llamada, ahora con -1.", ["global", "clasificar(-1)"]),
        paso(3, { edad: "-1" }, "Mayor", "-1 < 0 es true: entra en la primera guarda.", ["global", "clasificar(-1)"]),
        paso(4, { edad: "-1" }, "Mayor\nEdad inválida", "El return corta la función y devuelve el mensaje.", ["global"]),
      ],
    },
    scope: sc(
      "return destruye el contexto de la función",
      `function calcular(a, b) {
  let total = a + b;
  if (total > 10) {
    return { total, estado: "alto" };
  }
  return { total, estado: "bajo" };
}

const resultado = calcular(8, 5);
console.log(resultado);
console.log(typeof total);`,
      [
        ln("function calcular(a, b) {", "function", "global", "ƒ calcular()", "ƒ calcular()", "La función se eleva completa."),
        ln("let total = a + b;", "let", "calcular", "TDZ", "13", "total es local de la función."),
        ln("return { total, estado: 'alto' };", "expresion", "calcular", "—", "objeto", "El return devuelve un objeto y destruye el contexto."),
        ln("const resultado = calcular(8, 5);", "const", "global", "TDZ", "objeto", "El valor devuelto se guarda en el ámbito global."),
        ln("console.log(typeof total);", "expresion", "global", "—", '"undefined"', "total era local y ya no existe."),
      ],
      [
        "Todo lo que se declara dentro de la función desaparece al hacer return.",
        "Solo el valor devuelto cruza la frontera de la función.",
      ],
    ),
    editor: {
      consigna: "Haz que la función devuelva un valor y comprueba qué pasa con el código después del return. Prueba también el return con salto de línea.",
      inicial: `function clasificar(edad) {
  if (edad < 0) {
    return "Edad inválida";
  }
  if (edad < 18) {
    return "Menor";
  }
  return "Mayor";
}

console.log(clasificar(20));
console.log(clasificar(15));
console.log(clasificar(-1));

function roto() {
  return
  { activo: true };
}
console.log(roto());`,
      pista: "El último return devuelve undefined por el salto de línea.",
    },
    bugs: [
      {
        titulo: "Return con salto de línea",
        codigo: "function crear() {\n  return\n  { activo: true };\n}\nconsole.log(crear());",
        problemas: [
          "El ASI inserta un punto y coma después de return.",
          "La función devuelve undefined y el objeto queda como bloque inalcanzable.",
        ],
        corregido: "function crear() {\n  return { activo: true };\n}\nconsole.log(crear());",
        explicacion: "Mantén el valor en la misma línea que return.",
      },
      {
        titulo: "Return dentro de forEach",
        codigo: "[1, 2, 3].forEach((n) => {\n  if (n === 2) return;\n  console.log(n);\n});",
        problemas: [
          "El return solo termina el callback de esa vuelta.",
          "El forEach sigue recorriendo el resto de elementos.",
        ],
        corregido: "function buscar(numeros) {\n  for (const n of numeros) {\n    if (n === 2) return n;\n  }\n}\nconsole.log(buscar([1, 2, 3]));",
        explicacion: "Para cortar el recorrido completo, usa un bucle dentro de una función y return.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué hace `return`?",
        opciones: [
          "Imprime un valor en la consola.",
          "Termina la función y devuelve un valor.",
          "Reinicia la función.",
          "Solo funciona en bucles.",
        ],
        correcta: 1,
        explicacion: "return corta la función y entrega el valor al llamador.",
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve `return` sin expresión?",
        opciones: ["null", "0", "undefined", "El último valor de la función"],
        correcta: 2,
        explicacion: "Un return vacío devuelve undefined y corta la ejecución.",
      },
      {
        id: 3,
        pregunta: "¿Qué problema tiene `return` seguido de un salto de línea y un objeto?",
        opciones: [
          "Ninguno, es válido.",
          "El ASI inserta ; y devuelve undefined.",
          "Lanza TypeError.",
          "Devuelve el objeto igualmente.",
        ],
        correcta: 1,
        explicacion: "La inserción automática de punto y coma rompe el return.",
      },
      {
        id: 4,
        pregunta: "¿Return dentro de un `forEach` detiene todo el recorrido?",
        opciones: ["Sí.", "No, solo sale del callback actual.", "Solo si el array es pequeño.", "Lanza un error."],
        correcta: 1,
        explicacion: "forEach no se puede cortar con return; usa for...of o some.",
      },
    ],
    fuente: "MDN Web Docs – return · ECMAScript – Return Statement · JavaScript.info – Functions",
  },

  /* ============================================================
     13 · Operadores de asignación
     ============================================================ */
  {
    id: "js-op-asignacion",
    titulo: "Operadores de asignación",
    icon: "📝",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "= += -= *= /= %= **= ??= ||= &&=",
    definicion: [
      "Los operadores de asignación guardan un valor en una variable. Los **compuestos** combinan una operación con la asignación en un solo paso.",
    ],
    queEs: [
      "`=` asigna el valor de la derecha a la variable de la izquierda.",
      "`+=`, `-=`, `*=`, `/=` y `%=` aplican la operación y luego asignan.",
      "`**=` eleva a una potencia; `??=`, `||=` y `&&=` asignan solo bajo cierta condición.",
      "`??=` asigna si el valor es `null` o `undefined`; `||=` si es falsy; `&&=` si es truthy.",
    ],
    paraQueSirve: [
      "Actualizar contadores y acumuladores de forma breve.",
      "Asignar valores por defecto sin repetir la variable.",
      "Mantener código más legible en bucles y cálculos.",
      "Inicializar configuraciones opcionales.",
    ],
    comoFunciona: [
      "Se evalúa la expresión de la derecha.",
      "En los compuestos, se lee el valor actual de la variable.",
      "Se aplica la operación correspondiente.",
      "El resultado se vuelve a guardar en la variable.",
      "En los lógicos, la asignación puede ocurrir o no según el valor actual.",
    ],
    sintaxis: [
      { caption: "Asignación simple", code: "let x = 10;" },
      { caption: "Asignación compuesta", code: "x += 5;  // x = x + 5\nx -= 3;  // x = x - 3\nx *= 2;  // x = x * 2\nx /= 4;  // x = x / 4\nx %= 3;  // x = x % 3" },
      { caption: "Asignación lógica", code: 'let nombre = null;\nnombre ??= "Invitado"; // asigna porque es null\n\nlet activo = true;\nactivo &&= false; // asigna porque era truthy' },
    ],
    nota: 'No confundas `=` con `===`. `||=` asigna ante cualquier valor falsy (0, "", false). Si 0 es un valor válido, usa `??=`.',
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Acumulador",
        descripcion: "Cada operador actualiza el valor anterior.",
        code: "let total = 10;\ntotal += 5;  // 15\ntotal -= 3;  // 12\ntotal *= 2;  // 24\ntotal /= 4;  // 6\ntotal %= 4;  // 2\nconsole.log(total);",
      },
      {
        titulo: "Ejemplo 2 · Valor por defecto con ??=",
        descripcion: "Solo asigna si el valor es null o undefined.",
        code: 'let nombre = null;\nnombre ??= "Invitado";\nconsole.log(nombre); // "Invitado"\n\nlet edad = 0;\nedad ??= 18;\nconsole.log(edad); // 0 (no asigna)',
      },
      {
        titulo: "Ejemplo 3 · Potencia",
        descripcion: "`**=` eleva el valor actual.",
        code: "let base = 3;\nbase **= 3;\nconsole.log(base); // 27",
      },
    ],
    errores: [
      {
        texto: "**Confundir `=` con `===`**: la asignación devuelve el valor asignado y puede activar un if sin querer.",
        code: '// ❌ Asigna y siempre entra\nif (estado = "activo") {\n  console.log("activo");\n}\n\n// ✅ Compara\nif (estado === "activo") {\n  console.log("activo");\n}',
      },
      {
        texto: "**Usar `||=` cuando 0 es válido**: reemplaza valores legítimos por el defecto.",
        code: "// ❌ 0 se considera falsy y se reemplaza\nlet cantidad = 0;\ncantidad ||= 10;\nconsole.log(cantidad); // 10\n\n// ✅ Solo reemplaza null/undefined\nlet cantidad2 = 0;\ncantidad2 ??= 10;\nconsole.log(cantidad2); // 0",
      },
      {
        texto: "**Asignar a una constante**: `const` no permite reasignación, ni siquiera con `+=`.",
        code: "// ❌ TypeError\nconst total = 10;\ntotal += 5;\n\n// ✅\nlet total2 = 10;\ntotal2 += 5;",
      },
    ],
    casos: [
      "Sumar precios en un carrito con `+=`.",
      "Aplicar descuentos sucesivos con `*=` y `-=`.",
      "Inicializar opciones de configuración con `??=`.",
      "Activar o desactivar banderas con `&&=` y `||=`.",
    ],
    relacion: [
      "**Operadores matemáticos**: son la base de los compuestos.",
      "**Operadores lógicos**: `??=`, `||=` y `&&=` combinan lógica y asignación.",
      "**const**: impide cualquier asignación posterior.",
      "**Incremento**: `x++` equivale a `x += 1`.",
      "**Comparación**: `=` asigna; `===` compara.",
    ],
    analogia:
      "Es como una libreta con un valor escrito. `=` borra y escribe un valor nuevo. `+=` lee lo que hay, le suma algo y vuelve a escribir el resultado. `??=` solo escribe si la página está en blanco (null/undefined); si ya hay algo, la respeta.",
    analogiaDiagrama: analogia(
      "Operadores de asignación",
      [
        ["✏️", "= · escribir", "Reemplaza el valor."],
        ["➕", "+= · acumular", "Lee, opera y guarda."],
        ["🛟", "??= · si falta", "Solo asigna con null/undefined."],
        ["⚖️", "||= · si es falsy", 'Asigna con 0, "", false…'],
      ],
      "La diferencia entre ??= y ||= está en qué valores consideras ausentes.",
    ),
    relacionArbol: arbol("Operadores de asignación", "Guardar y actualizar valores", [
      ["✏️", "=", "Asignación simple"],
      ["➕", "+= -= *= /=", "Operación y asignación"],
      ["🔢", "%= **=", "Módulo y potencia"],
      ["🛟", "??=", "Solo null/undefined"],
      ["⚖️", "||= &&=", "Asignación condicionada por truthiness"],
    ]),
    demo: {
      codigo: `let total = 10;
total += 5;
total -= 3;
total *= 2;
total /= 4;
total %= 4;
total **= 3;

let nombre = null;
nombre ??= "Invitado";

console.log(total, nombre);`,
      pasos: [
        paso(1, { total: "10" }, "", "Se inicializa total."),
        paso(2, { total: "15" }, "", "total += 5 equivale a total = total + 5."),
        paso(3, { total: "12" }, "", "total -= 3 resta 3."),
        paso(4, { total: "24" }, "", "total *= 2 duplica."),
        paso(5, { total: "6" }, "", "total /= 4 divide."),
        paso(6, { total: "2" }, "", "total %= 4 guarda el resto."),
        paso(7, { total: "8" }, "", "total **= 3 eleva 2 al cubo."),
        paso(9, { total: "8", nombre: "null" }, "", "nombre empieza como null."),
        paso(10, { total: "8", nombre: '"Invitado"' }, "", "??= asigna porque el valor es null."),
        paso(12, { total: "8", nombre: '"Invitado"' }, '8 "Invitado"', "Se muestran los resultados finales."),
      ],
    },
    scope: sc(
      "La asignación no crea un ámbito nuevo",
      `let total = 10;
total += 5;
{
  let total = 100;
  total += 1;
  console.log(total);
}
console.log(total);
const fijo = 3;
fijo += 1;`,
      [
        ln("let total = 10;", "let", "global", "TDZ", "10", "total vive en el ámbito global."),
        ln("total += 5;", "expresion", "global", "—", "15", "La asignación compuesta modifica el binding global."),
        ln("let total = 100;", "let", "bloque", "TDZ", "100", "Dentro del bloque se declara otro total independiente."),
        ln("total += 1;", "expresion", "bloque", "—", "101", "La asignación afecta al total del bloque, no al global."),
        ln("console.log(total);", "expresion", "global", "—", "15", "Al salir del bloque, vuelve a verse el total global."),
        ln("fijo += 1;", "expresion", "global", "—", "TypeError", "const no permite reasignación."),
      ],
      [
        "Los bloques crean un nuevo binding; la asignación afecta al más cercano.",
        "const bloquea cualquier asignación, incluida la compuesta.",
      ],
    ),
    editor: {
      consigna: "Encadena operadores y observa el valor después de cada línea. Prueba ??= con 0 y con null.",
      inicial: `let total = 10;
total += 5;
total -= 3;
total *= 2;
total /= 4;
total %= 4;
total **= 3;

let nombre = null;
nombre ??= "Invitado";

let cantidad = 0;
cantidad ??= 10;

console.log(total, nombre, cantidad);`,
      pista: "Cambia ??= por ||= y observa qué pasa con cantidad = 0.",
    },
    bugs: [
      {
        titulo: "= en lugar de ===",
        codigo: 'let estado = "inactivo";\nif (estado = "activo") {\n  console.log("Activo");\n}',
        problemas: [
          'La condición asigna "activo" a estado.',
          'La asignación devuelve "activo", que es truthy: siempre entra.',
        ],
        corregido: 'let estado = "inactivo";\nif (estado === "activo") {\n  console.log("Activo");\n}',
        explicacion: "Usa === para comparar; reserva = para asignar.",
      },
      {
        titulo: "||= borra el 0",
        codigo: "let cantidad = 0;\ncantidad ||= 10;\nconsole.log(cantidad);",
        problemas: [
          "0 es falsy, así que ||= lo reemplaza por 10.",
          "Si 0 era un valor válido, se pierde.",
        ],
        corregido: "let cantidad = 0;\ncantidad ??= 10;\nconsole.log(cantidad); // 0",
        explicacion: "??= solo asigna con null o undefined, no con 0.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué hace `total += 5`?",
        opciones: ["Compara total con 5.", "Equivale a total = total + 5.", "Borra total.", "Convierte total en 5."],
        correcta: 1,
        explicacion: "Suma 5 al valor actual y guarda el resultado.",
      },
      {
        id: 2,
        pregunta: "¿Cuándo asigna `??=`?",
        opciones: ["Cuando el valor es falsy.", "Cuando el valor es null o undefined.", "Siempre.", "Solo con números."],
        correcta: 1,
        explicacion: '??= respeta 0, "" y false; solo actúa con null/undefined.',
      },
      {
        id: 3,
        pregunta: "¿Qué diferencia hay entre `||=` y `??=`?",
        opciones: [
          "||= actúa con cualquier falsy; ??= solo con null/undefined.",
          "Son idénticos.",
          "||= solo funciona con strings.",
          "??= siempre asigna.",
        ],
        correcta: 0,
        explicacion: '||= reemplaza 0, "" y false; ??= no.',
      },
      {
        id: 4,
        pregunta: "¿Qué ocurre con `const x = 1; x += 2;`?",
        opciones: ["x pasa a 3.", "Lanza TypeError.", "Devuelve undefined.", "Se crea una nueva variable."],
        correcta: 1,
        explicacion: "const no permite reasignación.",
      },
    ],
    fuente: "MDN Web Docs – Assignment operators · ECMAScript – Assignment Operators · JavaScript.info – Operators",
  },

  /* ============================================================
     14 · Incremento y decremento
     ============================================================ */
  {
    id: "js-op-incremento",
    titulo: "Operadores de incremento y decremento",
    icon: "➕",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "++ --",
    definicion: [
      "`++` suma 1 a una variable numérica y `--` le resta 1. Pueden escribirse **antes** (prefijo) o **después** (postfijo) de la variable, y eso cambia el valor que devuelve la expresión.",
    ],
    queEs: [
      "`x++` es postfijo: devuelve el valor **anterior** y después incrementa.",
      "`++x` es prefijo: incrementa primero y devuelve el valor **nuevo**.",
      "`x--` y `--x` funcionan igual, pero restando 1.",
      "Solo se pueden aplicar a variables o propiedades; no a literales ni a expresiones.",
    ],
    paraQueSirve: [
      "Avanzar el contador de un bucle.",
      "Recorrer índices de arrays.",
      "Ajustar niveles, vidas o intentos en un juego.",
      "Escribir actualizaciones breves de una unidad.",
    ],
    comoFunciona: [
      "El operador lee el valor actual de la variable.",
      "Le suma o resta 1 y guarda el resultado.",
      "Si es prefijo, la expresión vale el resultado nuevo.",
      "Si es postfijo, la expresión vale el valor anterior.",
      "El cambio se aplica siempre a la variable original.",
    ],
    sintaxis: [
      { caption: "Postfijo", code: "let i = 0;\ni++;      // devuelve 0, i queda en 1" },
      { caption: "Prefijo", code: "let i = 0;\n++i;      // devuelve 1, i queda en 1" },
      { caption: "En un bucle", code: "for (let i = 0; i < 3; i++) {\n  console.log(i);\n}" },
      { caption: "Decremento", code: "let vidas = 3;\nvidas--;  // 2\n--vidas;  // 1" },
    ],
    nota: "Como instrucción suelta, `i++` y `++i` producen el mismo estado final. La diferencia importa cuando usas el valor devuelto dentro de otra expresión.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Prefijo frente a postfijo",
        descripcion: "Compara el valor que devuelve cada forma.",
        code: "let i = 5;\nconsole.log(i++); // 5 (postfijo)\nconsole.log(i);   // 6\nconsole.log(++i); // 7 (prefijo)\nconsole.log(i);   // 7",
      },
      {
        titulo: "Ejemplo 2 · Contador de bucle",
        descripcion: "El incremento ocurre al final de cada vuelta.",
        code: "for (let i = 1; i <= 3; i++) {\n  console.log(\"Vuelta\", i);\n}",
      },
      {
        titulo: "Ejemplo 3 · Decremento de vidas",
        descripcion: "Se resta una unidad por cada fallo.",
        code: "let vidas = 3;\n\nwhile (vidas > 0) {\n  console.log(\"Vidas:\", vidas);\n  vidas--;\n}\nconsole.log(\"Game over\");",
      },
    ],
    errores: [
      {
        texto: "**Usar `i++` cuando necesitas el valor nuevo**: el postfijo devuelve el valor anterior.",
        code: "// ❌ Guarda 0, no 1\nlet i = 0;\nlet siguiente = i++;\nconsole.log(siguiente); // 0\n\n// ✅\nlet j = 0;\nlet siguienteBien = ++j;\nconsole.log(siguienteBien); // 1",
      },
      {
        texto: "**Aplicarlo a un literal o a una expresión**: `5++` no es válido.",
        code: "// ❌ SyntaxError\nlet x = 5++;\n\n// ✅\nlet y = 5;\ny++;",
      },
      {
        texto: "**Incrementar dos veces por vuelta**: si el cuerpo y la cabecera incrementan, el recorrido se salta elementos.",
        code: "// ❌ i sube de dos en dos\nfor (let i = 0; i < 5; i++) {\n  i++;\n  console.log(i);\n}\n\n// ✅\nfor (let j = 0; j < 5; j++) {\n  console.log(j);\n}",
      },
    ],
    casos: [
      "Contadores de bucles y de iteraciones.",
      "Vidas, intentos o niveles en un juego.",
      "Recorrer índices de arrays con un for clásico.",
      "Ajustar punteros o posiciones en algoritmos.",
    ],
    relacion: [
      "**Asignación compuesta**: `x++` equivale a `x += 1`, pero devuelve el valor anterior.",
      "**Operadores matemáticos**: el incremento es una suma de 1.",
      "**for**: el paso suele usar `i++`.",
      "**Coerción**: `++` convierte el operando a número.",
      "**Inmutabilidad**: en programación funcional se evita modificar la variable.",
    ],
    analogia:
      "Es como un contador de personas en una puerta. El **prefijo** cuenta primero y luego te dice el número nuevo: sabes cuántas personas hay después de entrar. El **postfijo** te dice el número que había antes y, por detrás, suma uno. El contador final es el mismo; lo que cambia es la información que recibes en ese instante.",
    analogiaDiagrama: analogia(
      "++ y --",
      [
        ["⬆️", "++x · prefijo", "Incrementa y devuelve el valor nuevo."],
        ["⬇️", "x++ · postfijo", "Devuelve el valor anterior y luego incrementa."],
        ["🔁", "for (i++)", "Avanza el contador al final de cada vuelta."],
        ["🔢", "Coerción", "Convierte el operando a número."],
      ],
      "El estado final es igual; el valor devuelto es lo que cambia.",
    ),
    relacionArbol: arbol("Incremento y decremento", "Sumar o restar uno", [
      ["⬆️", "++x", "Prefijo: primero suma"],
      ["⬇️", "x++", "Postfijo: primero devuelve"],
      ["➖", "--x / x--", "Las versiones de resta"],
      ["🔁", "for", "Uso más habitual"],
      ["📝", "Asignación compuesta", "x += 1 es equivalente"],
    ]),
    demo: {
      codigo: `let i = 5;

console.log(i++); // 5
console.log(i);   // 6
console.log(++i); // 7
console.log(i--); // 7
console.log(--i); // 5`,
      pasos: [
        paso(1, { i: "5" }, "", "Se inicializa i en 5."),
        paso(3, { i: "6" }, "5", "i++ devuelve 5 y después suma 1: i queda en 6."),
        paso(4, { i: "6" }, "5\n6", "Al leer i de nuevo aparece el valor ya incrementado."),
        paso(5, { i: "7" }, "5\n6\n7", "++i suma primero y devuelve 7."),
        paso(6, { i: "6" }, "5\n6\n7\n7", "i-- devuelve 7 y luego resta: i queda en 6."),
        paso(7, { i: "5" }, "5\n6\n7\n7\n5", "--i resta primero y devuelve 5."),
      ],
    },
    scope: sc(
      "El operador modifica la variable, no crea un nuevo ámbito",
      `let i = 0;
{
  let i = 10;
  i++;
  console.log(i);
}
i++;
console.log(i);`,
      [
        ln("let i = 0;", "let", "global", "TDZ", "0", "i vive en el ámbito global."),
        ln("let i = 10;", "let", "bloque", "TDZ", "10", "Dentro del bloque hay otro i independiente."),
        ln("i++;", "expresion", "bloque", "—", "11", "El incremento afecta al i del bloque."),
        ln("console.log(i);", "expresion", "bloque", "—", "11", "Se muestra el i local."),
        ln("i++;", "expresion", "global", "—", "1", "Al salir, el incremento afecta al i global."),
        ln("console.log(i);", "expresion", "global", "—", "1", "Se muestra el i global, no el del bloque."),
      ],
      [
        "El incremento actúa sobre el binding más cercano.",
        "Un bloque con su propio let no modifica la variable externa.",
      ],
    ),
    editor: {
      consigna: "Predice el valor que devuelve cada línea antes de ejecutar. Cambia postfijo por prefijo y compara.",
      inicial: `let i = 5;

console.log(i++);
console.log(i);
console.log(++i);
console.log(i--);
console.log(--i);

let vidas = 3;
while (vidas > 0) {
  console.log("Vidas:", vidas);
  vidas--;
}`,
      pista: "Recuerda: postfijo devuelve el valor anterior; prefijo el nuevo.",
    },
    bugs: [
      {
        titulo: "Postfijo cuando se esperaba el nuevo valor",
        codigo: "let i = 0;\nlet siguiente = i++;\nconsole.log(siguiente);",
        problemas: [
          "i++ devuelve 0, el valor anterior al incremento.",
          "La variable siguiente recibe 0, no 1.",
        ],
        corregido: "let i = 0;\nlet siguiente = ++i;\nconsole.log(siguiente); // 1",
        explicacion: "Usa prefijo si necesitas el valor ya incrementado.",
      },
      {
        titulo: "Doble incremento en el bucle",
        codigo: "for (let i = 0; i < 5; i++) {\n  i++;\n  console.log(i);\n}",
        problemas: [
          "El cuerpo suma 1 y la cabecera suma otra vez.",
          "Se saltan valores y se ejecutan menos vueltas de las esperadas.",
        ],
        corregido: "for (let i = 0; i < 5; i++) {\n  console.log(i);\n}",
        explicacion: "Deja el avance del contador solo en la cabecera.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve `i++`?",
        opciones: ["El valor nuevo de i.", "El valor anterior de i.", "Siempre 1.", "undefined"],
        correcta: 1,
        explicacion: "El postfijo devuelve el valor previo y luego incrementa la variable.",
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve `++i`?",
        opciones: ["El valor anterior.", "El valor nuevo.", "0.", "Depende del tipo."],
        correcta: 1,
        explicacion: "El prefijo incrementa primero y devuelve el resultado.",
      },
      {
        id: 3,
        pregunta: "¿Qué estado final deja `let i = 0; i++;`?",
        opciones: ["i vale 0.", "i vale 1.", "i vale undefined.", "Lanza un error."],
        correcta: 1,
        explicacion: "Aunque devuelva 0 como expresión, la variable queda en 1.",
      },
      {
        id: 4,
        pregunta: "¿Se puede escribir `5++`?",
        opciones: ["Sí, devuelve 6.", "No, es un SyntaxError.", "Sí, pero devuelve 5.", "Solo en modo estricto."],
        correcta: 1,
        explicacion: "El operador necesita una referencia a una variable, no un literal.",
      },
    ],
    fuente: "MDN Web Docs – Increment / Decrement · ECMAScript – Update Expressions · JavaScript.info – Operators",
  },

  /* ============================================================
     15 · Operadores lógicos
     ============================================================ */
  {
    id: "js-op-logicos",
    titulo: "Operadores lógicos",
    icon: "🧠",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "&& || ! ??",
    definicion: [
      "Los operadores lógicos combinan valores booleanos o truthy/falsy. `&&` (AND), `||` (OR), `!` (NOT) y `??` (nullish coalescing) permiten construir condiciones y elegir valores por defecto.",
    ],
    queEs: [
      "`&&` devuelve el primer operando falsy, o el último si todos son truthy.",
      "`||` devuelve el primer operando truthy, o el último si todos son falsy.",
      "`!` invierte el valor booleano y siempre devuelve `true` o `false`.",
      "`??` devuelve el operando derecho solo si el izquierdo es `null` o `undefined`.",
    ],
    paraQueSirve: [
      "Combinar varias condiciones en un `if`.",
      "Asignar valores por defecto de forma compacta.",
      "Ejecutar código solo si existe un valor (`usuario && usuario.nombre`).",
      "Distinguir entre valores falsy válidos (0, cadena vacía) y valores ausentes.",
    ],
    comoFunciona: [
      "`&&` evalúa de izquierda a derecha y se detiene en el primer falsy (short-circuit).",
      "`||` se detiene en el primer truthy.",
      "`??` se detiene si el primer valor no es null ni undefined.",
      "`!` convierte el valor con `Boolean()` y lo invierte; `!!` convierte sin invertir.",
      "El resultado no siempre es booleano: `&&` y `||` devuelven uno de sus operandos.",
    ],
    sintaxis: [
      { caption: "AND y OR", code: 'const adulto = edad >= 18;\nconst conDocumento = true;\n\nconsole.log(adulto && conDocumento); // true\nconsole.log(adulto || conDocumento); // true' },
      { caption: "NOT", code: 'const activo = false;\nconsole.log(!activo);  // true\nconsole.log(!!\"hola\"); // true' },
      { caption: "Nullish coalescing", code: 'const nombre = null;\nconsole.log(nombre ?? \"Invitado\"); // "Invitado"\n\nconst cantidad = 0;\nconsole.log(cantidad ?? 10); // 0' },
    ],
    nota: "`||` trata 0, `\"\"`, `false` y `NaN` como ausentes; `??` solo trata `null` y `undefined`. Elige según tu caso.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Condición compuesta",
        descripcion: "Ambas partes deben cumplirse.",
        code: 'const edad = 20;\nconst tieneDocumento = true;\n\nif (edad >= 18 && tieneDocumento) {\n  console.log("Puede votar");\n}',
      },
      {
        titulo: "Ejemplo 2 · Valor por defecto",
        descripcion: "`||` reemplaza cualquier falsy; `??` solo null/undefined.",
        code: 'const usuario = "";\nconsole.log(usuario || "Invitado"); // "Invitado"\n\nconst cantidad = 0;\nconsole.log(cantidad ?? 10);       // 0',
      },
      {
        titulo: "Ejemplo 3 · Short-circuit para acceder seguro",
        descripcion: "Si el primer valor es falsy, no se evalúa la derecha.",
        code: 'const usuario = { nombre: "Ana" };\nconsole.log(usuario && usuario.nombre); // "Ana"\n\nconst vacio = null;\nconsole.log(vacio && vacio.nombre);     // null',
      },
    ],
    errores: [
      {
        texto: "**Usar `||` para valores que pueden ser 0**: el 0 se reemplaza por el valor por defecto.",
        code: '// ❌ cantidad pasa a 10\nlet cantidad = 0;\nconst total = cantidad || 10;\n\n// ✅\nconst totalBien = cantidad ?? 10;',
      },
      {
        texto: "**Esperar siempre un booleano**: `&&` y `||` devuelven operandos, no solo true/false.",
        code: '// ❌ "Ana" no es true\nconsole.log("Ana" && "Luis"); // "Luis"\n\n// ✅ Si quieres un booleano, usa Boolean()\nconsole.log(Boolean("Ana" && "Luis")); // true',
      },
      {
        texto: "**Mezclar `??` con `||` o `&&` sin paréntesis**: es un SyntaxError.",
        code: "// ❌ SyntaxError\nconst valor = null ?? 0 || 5;\n\n// ✅\nconst valorBien = (null ?? 0) || 5;",
      },
    ],
    casos: [
      "Validar formularios con varias reglas a la vez.",
      "Asignar valores por defecto a opciones de configuración.",
      "Evitar errores al acceder a objetos que pueden ser null.",
      "Mostrar u ocultar elementos según banderas de estado.",
    ],
    relacion: [
      "**if**: las condiciones suelen combinar operadores lógicos.",
      "**Truthy / falsy**: define qué valores cortocircuitan.",
      "**??=**: versión de asignación del nullish coalescing.",
      "**Ternario**: alternativa para elegir entre dos valores.",
      "**Precedencia**: `!` > `&&` > `||`; usa paréntesis para claridad.",
    ],
    analogia:
      "`&&` es una cadena de puertas: tienes que abrir todas para pasar; si una está cerrada, te detienes ahí. `||` es una fila de puertas alternativas: pasas por la primera que esté abierta. `??` es un portero que solo te detiene si el pase está **ausente** (null o undefined), pero acepta un pase en blanco si es válido.",
    analogiaDiagrama: analogia(
      "Operadores lógicos",
      [
        ["🔗", "&& · todas", "Se detiene en el primer falsy."],
        ["🚪", "|| · alguna", "Se detiene en el primer truthy."],
        ["🔀", "! · invierte", "Convierte a booleano y niega."],
        ["🛟", "?? · si falta", "Solo actúa con null/undefined."],
      ],
      "&& y || devuelven un operando; ?? distingue ausencia real de valor falsy.",
    ),
    relacionArbol: arbol("Operadores lógicos", "Combinar condiciones y valores", [
      ["🔗", "&&", "Primer falsy o el último valor"],
      ["🚪", "||", "Primer truthy o el último valor"],
      ["🔀", "!", "Inversión booleana"],
      ["🛟", "??", "Solo null/undefined"],
      ["⚡", "Short-circuit", "La evaluación se detiene antes"],
    ]),
    demo: {
      codigo: `const usuario = { nombre: "Ana", activo: true };
const nombre = usuario.nombre || "Invitado";
const saludo = usuario.activo && "Bienvenida";
const edad = 0;
const edadFinal = edad ?? 18;
const niega = !usuario.activo;

console.log(nombre, saludo, edadFinal, niega);`,
      pasos: [
        paso(1, { usuario: "{ nombre: 'Ana', activo: true }" }, "", "El objeto tiene nombre y activo."),
        paso(2, { usuario: "{…}", nombre: '"Ana"' }, "", "usuario.nombre es truthy, así que || devuelve \"Ana\"."),
        paso(3, { usuario: "{…}", nombre: '"Ana"', saludo: '"Bienvenida"' }, "", "activo es true, así que && devuelve el segundo operando."),
        paso(4, { usuario: "{…}", nombre: '"Ana"', saludo: '"Bienvenida"', edad: "0" }, "", "edad vale 0, un falsy válido."),
        paso(5, { usuario: "{…}", nombre: '"Ana"', saludo: '"Bienvenida"', edad: "0", edadFinal: "0" }, "", "?? respeta el 0 y no aplica el valor por defecto."),
        paso(6, { usuario: "{…}", nombre: '"Ana"', saludo: '"Bienvenida"', edad: "0", edadFinal: "0", niega: "false" }, "", "! invierte true y devuelve false."),
        paso(8, { usuario: "{…}", nombre: '"Ana"', saludo: '"Bienvenida"', edad: "0", edadFinal: "0", niega: "false" }, 'Ana Bienvenida 0 false', "Se muestran todos los resultados."),
      ],
    },
    scope: sc(
      "Los operadores lógicos no crean ámbito, pero sí short-circuit",
      `const config = { tema: null };
const tema = config.tema ?? "claro";
const nombre = "";
const etiqueta = nombre || "Anónimo";
let activo = true;
activo = activo && false;
console.log(tema, etiqueta, activo);`,
      [
        ln("const config = { tema: null };", "const", "global", "TDZ", "objeto", "config es un objeto con tema null."),
        ln('const tema = config.tema ?? "claro";', "const", "global", "TDZ", '"claro"', "?? aplica el valor por defecto porque tema es null."),
        ln('const nombre = "";', "const", "global", "TDZ", '""', "La cadena vacía es falsy."),
        ln('const etiqueta = nombre || "Anónimo";', "const", "global", "TDZ", '"Anónimo"', "|| reemplaza la cadena vacía."),
        ln("activo = activo && false;", "expresion", "global", "—", "false", "&& devuelve false y lo asigna a activo."),
        ln("console.log(tema, etiqueta, activo);", "expresion", "global", "—", "claro Anónimo false", "Los tres valores son independientes del ámbito."),
      ],
      [
        "El cortocircuito evita evaluar la parte derecha cuando ya se conoce el resultado.",
        "El resultado de && y || es un operando, no un booleano convertido.",
      ],
    ),
    editor: {
      consigna: "Prueba valores truthy y falsy. Cambia ?? por || para ver cómo el 0 se pierde.",
      inicial: `const usuario = { nombre: "Ana", activo: true };
const nombre = usuario.nombre || "Invitado";
const saludo = usuario.activo && "Bienvenida";

const cantidad = 0;
console.log(cantidad || 10);
console.log(cantidad ?? 10);

const vacio = null;
console.log(!vacio);
console.log(!!"texto");`,
      pista: "Observa la diferencia entre || y ?? con cantidad = 0.",
    },
    bugs: [
      {
        titulo: "|| borra el 0",
        codigo: "let cantidad = 0;\nconst total = cantidad || 10;\nconsole.log(total);",
        problemas: [
          "0 es falsy, así que || devuelve 10.",
          "Se pierde un valor que podía ser válido.",
        ],
        corregido: "let cantidad = 0;\nconst total = cantidad ?? 10;\nconsole.log(total); // 0",
        explicacion: "Usa ?? cuando 0, \"\" o false sean valores legítimos.",
      },
      {
        titulo: "Mezclar ?? con ||",
        codigo: "const valor = null ?? 0 || 5;\nconsole.log(valor);",
        problemas: [
          "JavaScript prohíbe mezclar ?? con || sin paréntesis.",
          "Se lanza un SyntaxError antes de ejecutar.",
        ],
        corregido: "const valor = (null ?? 0) || 5;\nconsole.log(valor); // 5",
        explicacion: "Añade paréntesis para dejar clara la precedencia.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve `\"\" || \"Invitado\"`?",
        opciones: ['""', '"Invitado"', "true", "false"],
        correcta: 1,
        explicacion: "|| devuelve el primer operando truthy.",
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve `0 ?? 10`?",
        opciones: ["10", "0", "null", "undefined"],
        correcta: 1,
        explicacion: "?? solo reemplaza null y undefined; 0 se conserva.",
      },
      {
        id: 3,
        pregunta: "¿Cuándo se detiene `a && b`?",
        opciones: ["Si a es truthy.", "Si a es falsy.", "Nunca.", "Siempre evalúa b."],
        correcta: 1,
        explicacion: "&& cortocircuita en el primer valor falsy.",
      },
      {
        id: 4,
        pregunta: "¿Qué devuelve `!\"texto\"`?",
        opciones: ["true", "false", '"texto"', "undefined"],
        correcta: 1,
        explicacion: "Una cadena no vacía es truthy, y ! la invierte a false.",
      },
    ],
    fuente: "MDN Web Docs – Logical operators · Nullish coalescing · ECMAScript – Logical Operators · JavaScript.info – Logical operators",
  },

  /* ============================================================
     16 · Operadores matemáticos
     ============================================================ */
  {
    id: "js-op-matematicos",
    titulo: "Operadores matemáticos",
    icon: "➗",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "+ - * / % **",
    definicion: [
      "Los operadores matemáticos realizan cálculos con números: suma (`+`), resta (`-`), multiplicación (`*`), división (`/`), módulo o resto (`%`) y potencia (`**`).",
    ],
    queEs: [
      "`+` suma números, pero también concatena cadenas si un operando es string.",
      "`-`, `*`, `/` y `**` convierten sus operandos a número.",
      "`%` devuelve el resto de la división, no un porcentaje.",
      "`**` eleva la base al exponente y es asociativo por la derecha.",
    ],
    paraQueSirve: [
      "Calcular totales, promedios y descuentos.",
      "Convertir unidades y escalas.",
      "Comprobar si un número es par con `% 2`.",
      "Aplicar potencias en fórmulas y gráficos.",
    ],
    comoFunciona: [
      "Se evalúan los operandos de izquierda a derecha según la precedencia.",
      "La multiplicación, división, módulo y potencia tienen más precedencia que la suma y la resta.",
      "Los paréntesis agrupan y fuerzan el orden.",
      "El resultado puede ser `NaN` si algún operando no se puede convertir a número útil.",
      "La división entre 0 devuelve `Infinity` o `-Infinity`, no un error.",
    ],
    sintaxis: [
      { caption: "Operaciones básicas", code: "const a = 10;\nconst b = 3;\n\nconsole.log(a + b); // 13\nconsole.log(a - b); // 7\nconsole.log(a * b); // 30\nconsole.log(a / b); // 3.333…" },
      { caption: "Resto y potencia", code: "console.log(10 % 3);  // 1\nconsole.log(2 ** 10); // 1024" },
      { caption: "Unario y coerción", code: 'console.log(+"5" + 2); // 7\nconsole.log(Number("5") + 2); // 7' },
    ],
    nota: "`+` está sobrecargado: suma números y concatena cadenas. Si un operando es string, el resultado suele ser texto.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Precedencia",
        descripcion: "La multiplicación se resuelve antes que la suma.",
        code: "console.log(2 + 3 * 4);   // 14\nconsole.log((2 + 3) * 4); // 20",
      },
      {
        titulo: "Ejemplo 2 · Resto para saber si es par",
        descripcion: "Un resto 0 indica divisibilidad.",
        code: "const numero = 8;\n\nif (numero % 2 === 0) {\n  console.log(\"Par\");\n} else {\n  console.log(\"Impar\");\n}",
      },
      {
        titulo: "Ejemplo 3 · Promedio",
        descripcion: "Se suman los valores y se divide entre la cantidad.",
        code: "const notas = [7, 8, 6, 9];\nconst suma = notas.reduce((a, n) => a + n, 0);\nconst promedio = suma / notas.length;\nconsole.log(promedio); // 7.5",
      },
    ],
    errores: [
      {
        texto: '**Sumar una cadena**: `"5" + 2` concatena y produce `"52"`.',
        code: '// ❌ "52"\nconsole.log("5" + 2);\n\n// ✅ 7\nconsole.log(Number("5") + 2);\nconsole.log(+"5" + 2);',
      },
      {
        texto: "**Confundir `%` con porcentaje**: devuelve el resto de la división.",
        code: "// ❌ Para un 20 % se multiplica por 0.2\nconsole.log(100 % 20); // 0, no 20\n\n// ✅\nconst descuento = 100 * 0.2;",
      },
      {
        texto: "**Esperar precisión decimal exacta**: los números son de coma flotante binaria.",
        code: "// ❌ No es exactamente 0.3\nconsole.log(0.1 + 0.2);\n\n// ✅ Redondea cuando muestres el resultado\nconsole.log((0.1 + 0.2).toFixed(2));",
      },
    ],
    casos: [
      "Calcular el total de un carrito.",
      "Obtener promedios y porcentajes.",
      "Comprobar paridad y divisibilidad.",
      "Aplicar fórmulas geométricas o financieras.",
    ],
    relacion: [
      "**Asignación compuesta**: `+=`, `-=`, `*=`, etc. combinan cálculo y asignación.",
      "**Number y Math**: utilidades para redondear y convertir.",
      "**NaN**: resultado de operaciones inválidas.",
      "**Comparaciones**: los resultados numéricos se comparan con `===`.",
      "**Precedencia**: paréntesis para controlar el orden.",
    ],
    analogia:
      "Son las teclas de una calculadora. `+`, `-`, `*` y `/` hacen lo que esperas, `%` te dice cuánto sobra al repartir en grupos iguales y `**` repite una multiplicación. El detalle es que la tecla `+` también sirve para pegar textos: si uno de los dos lados es texto, la calculadora pega en vez de sumar.",
    analogiaDiagrama: analogia(
      "Operadores matemáticos",
      [
        ["➕", "+", "Suma números o concatena textos."],
        ["➗", "/ y %", "División y resto."],
        ["✖️", "* y **", "Producto y potencia."],
        ["🎯", "Precedencia", "Paréntesis para controlar el orden."],
      ],
      "El operador + es el único que cambia de comportamiento con strings.",
    ),
    relacionArbol: arbol("Operadores matemáticos", "Cálculo numérico", [
      ["➕", "+ -", "Suma y resta"],
      ["✖️", "* /", "Producto y división"],
      ["🔢", "%", "Resto de la división"],
      ["🚀", "**", "Potencia"],
      ["📝", "+=", "Combinación con asignación"],
    ]),
    demo: {
      codigo: `const a = 10;
const b = 3;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
console.log(a ** b);
console.log("2" + 3);
console.log(+"2" + 3);`,
      pasos: [
        paso(1, { a: "10" }, "", "Se guarda a."),
        paso(2, { a: "10", b: "3" }, "", "Se guarda b."),
        paso(4, { a: "10", b: "3" }, "13", "10 + 3 suma porque ambos son números."),
        paso(5, { a: "10", b: "3" }, "13\n7", "La resta da 7."),
        paso(6, { a: "10", b: "3" }, "13\n7\n30", "El producto da 30."),
        paso(7, { a: "10", b: "3" }, "13\n7\n30\n3.3333333333333335", "La división produce un decimal."),
        paso(8, { a: "10", b: "3" }, "13\n7\n30\n3.333…\n1", "El resto de 10 entre 3 es 1."),
        paso(9, { a: "10", b: "3" }, "13\n7\n30\n3.333…\n1\n1000", "La potencia 10³ es 1000."),
        paso(10, { a: "10", b: "3" }, '13\n7\n30\n3.333…\n1\n1000\n"23"', 'Aquí + concatena porque "2" es string.'),
        paso(11, { a: "10", b: "3" }, '13\n7\n30\n3.333…\n1\n1000\n"23"\n5', "El + unario convierte \"2\" a número y luego suma 3."),
      ],
    },
    scope: sc(
      "Los operadores no cambian el ámbito de las variables",
      `let total = 10;
{
  let total = 100;
  total = total * 2;
  console.log(total);
}
total = total + 5;
console.log(total);`,
      [
        ln("let total = 10;", "let", "global", "TDZ", "10", "total global."),
        ln("let total = 100;", "let", "bloque", "TDZ", "100", "Un total independiente dentro del bloque."),
        ln("total = total * 2;", "expresion", "bloque", "—", "200", "La operación modifica el total del bloque."),
        ln("console.log(total);", "expresion", "bloque", "—", "200", "Se muestra el total local."),
        ln("total = total + 5;", "expresion", "global", "—", "15", "Fuera del bloque se modifica el total global."),
        ln("console.log(total);", "expresion", "global", "—", "15", "El total global nunca fue 200."),
      ],
      [
        "La precedencia no depende del ámbito: primero se resuelven * y /, luego + y -.",
        "Los bloques con let crean variables independientes.",
      ],
    ),
    editor: {
      consigna: "Cambia los números y añade paréntesis para comprobar la precedencia. Prueba a sumar una cadena.",
      inicial: `const a = 10;
const b = 3;

console.log(a + b);
console.log(a - b);
console.log(a * b);
console.log(a / b);
console.log(a % b);
console.log(a ** b);

console.log("2" + 3);
console.log(+"2" + 3);
console.log(2 + 3 * 4);
console.log((2 + 3) * 4);`,
      pista: "Observa cuándo + concatena en lugar de sumar.",
    },
    bugs: [
      {
        titulo: "Suma que concatena",
        codigo: 'const precio = "10";\nconst envio = 2;\nconsole.log(precio + envio);',
        problemas: [
          "precio es una cadena, así que + concatena.",
          'El resultado es "102" en lugar de 12.',
        ],
        corregido: "const precio = Number(\"10\");\nconst envio = 2;\nconsole.log(precio + envio); // 12",
        explicacion: "Convierte a número con Number() o el + unario antes de sumar.",
      },
      {
        titulo: "Confundir % con porcentaje",
        codigo: "const precio = 100;\nconst descuento = precio % 20;\nconsole.log(descuento);",
        problemas: [
          "% devuelve el resto de la división, no el 20 %.",
          "100 % 20 es 0, así que el descuento calculado es incorrecto.",
        ],
        corregido: "const precio = 100;\nconst descuento = precio * 0.2;\nconsole.log(descuento); // 20",
        explicacion: "Para porcentajes multiplica por la fracción (0.2 = 20 %).",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve `10 % 3`?",
        opciones: ["3", "1", "0.3", "30"],
        correcta: 1,
        explicacion: "% devuelve el resto: 10 = 3 × 3 + 1.",
      },
      {
        id: 2,
        pregunta: '¿Qué devuelve `"5" + 2`?',
        opciones: ["7", '"52"', "52", "NaN"],
        correcta: 1,
        explicacion: "Si un operando es string, + concatena.",
      },
      {
        id: 3,
        pregunta: "¿Qué operador eleva a una potencia?",
        opciones: ["^", "**", "%", "//"],
        correcta: 1,
        explicacion: "** es el operador de exponenciación.",
      },
      {
        id: 4,
        pregunta: "¿Qué resultado tiene `2 + 3 * 4`?",
        opciones: ["20", "14", "24", "9"],
        correcta: 1,
        explicacion: "La multiplicación se resuelve antes: 3 * 4 = 12, más 2 = 14.",
      },
    ],
    fuente: "MDN Web Docs – Arithmetic operators · ECMAScript – Numeric Operators · JavaScript.info – Basic operators, maths",
  },

  /* ============================================================
     17 · Operadores relacionales
     ============================================================ */
  {
    id: "js-op-relacionales",
    titulo: "Operadores relacionales y de igualdad",
    icon: "⚖️",
    categoria: "Palabras Reservadas y Estructuras",
    firma: "> < >= <= == === != !==",
    definicion: [
      "Los operadores relacionales comparan dos valores y devuelven un booleano. Los de igualdad comprueban si dos valores son equivalentes, con coerción (`==`) o sin ella (`===`).",
    ],
    queEs: [
      "`>`, `<`, `>=` y `<=` comparan magnitudes numéricas o cadenas.",
      "`==` y `!=` comparan con **coerción de tipos**.",
      "`===` y `!==` comparan **tipo y valor** sin coerción.",
      "Los objetos y arrays se comparan por **referencia**, no por contenido.",
    ],
    paraQueSirve: [
      "Validar rangos: edades, precios, notas.",
      "Ordenar y filtrar colecciones.",
      "Comprobar estados exactos en condiciones.",
      "Evitar errores de tipo usando igualdad estricta.",
    ],
    comoFunciona: [
      "Para `>`, `<`, `>=`, `<=`, si ambos son cadenas se comparan lexicográficamente; si no, se convierten a número.",
      "`==` aplica reglas de coerción: número con cadena, booleano a número, null y undefined entre sí.",
      "`===` devuelve false si los tipos difieren.",
      "`NaN` no es igual a nada, ni siquiera a sí mismo con `==` o `===`.",
      "`Object.is` es una comparación más estricta para casos especiales como `NaN` y `-0`.",
    ],
    sintaxis: [
      { caption: "Comparaciones de magnitud", code: "console.log(10 > 5);   // true\nconsole.log(10 <= 10); // true\nconsole.log(\"b\" > \"a\"); // true" },
      { caption: "Igualdad estricta", code: 'console.log(10 === 10);   // true\nconsole.log(10 === "10"); // false' },
      { caption: "Igualdad con coerción", code: 'console.log(10 == "10");  // true\nconsole.log(null == undefined); // true\nconsole.log(null === undefined); // false' },
    ],
    nota: "Usa `===` y `!==` por defecto. `==` solo tiene un caso práctico claro: `valor == null` detecta null y undefined a la vez.",
    ejemplos: [
      {
        titulo: "Ejemplo 1 · Rangos",
        descripcion: "Se combinan comparaciones con operadores lógicos.",
        code: "const edad = 20;\n\nif (edad >= 18 && edad < 65) {\n  console.log(\"Edad laboral\");\n}",
      },
      {
        titulo: "Ejemplo 2 · Estricta frente a coercitiva",
        descripcion: "El tipo importa en la comparación estricta.",
        code: 'console.log(10 == "10");  // true\nconsole.log(10 === "10"); // false\nconsole.log(0 == false);  // true\nconsole.log(0 === false); // false',
      },
      {
        titulo: "Ejemplo 3 · Objetos por referencia",
        descripcion: "Dos objetos con el mismo contenido no son el mismo objeto.",
        code: "const a = { x: 1 };\nconst b = { x: 1 };\nconst c = a;\n\nconsole.log(a === b); // false\nconsole.log(a === c); // true",
      },
    ],
    errores: [
      {
        texto: "**Comparar arrays u objetos con === esperando contenido**: solo compara referencias.",
        code: "// ❌ false\nconsole.log([1, 2] === [1, 2]);\n\n// ✅ Compara el contenido con JSON o elemento a elemento\nconsole.log(JSON.stringify([1, 2]) === JSON.stringify([1, 2]));",
      },
      {
        texto: "**Usar `==` y olvidar la coerción**: `\"0\" == false` es true.",
        code: '// ❌ Resultado inesperado\nconsole.log("0" == false); // true\n\n// ✅\nconsole.log("0" === false); // false',
      },
      {
        texto: "**Comparar con NaN usando ===**: nunca es igual a sí mismo.",
        code: "// ❌ false\nconsole.log(NaN === NaN);\n\n// ✅\nconsole.log(Number.isNaN(NaN));\nconsole.log(Object.is(NaN, NaN));",
      },
    ],
    casos: [
      "Validar formularios con rangos de edad o precios.",
      "Ordenar listas por fecha o puntuación.",
      "Comparar estados exactos con `===`.",
      "Detectar null o undefined con `valor == null`.",
    ],
    relacion: [
      "**Igualdad estricta**: base de las comparaciones seguras.",
      "**Coerción**: explica los resultados de `==`.",
      "**Operadores lógicos**: combinan comparaciones.",
      "**if**: usa el booleano resultante.",
      "**Object.is**: variante para NaN y -0.",
    ],
    analogia:
      "Comparar con `==` es como preguntar “¿pesan lo mismo?” aunque uno sea una manzana y otro una pesa: el sistema convierte y responde. Comparar con `===` es preguntar “¿son el mismo objeto, del mismo tipo y con el mismo valor?”. Para objetos, `===` pregunta si son literalmente la misma caja, no si tienen el mismo contenido.",
    analogiaDiagrama: analogia(
      "Operadores relacionales",
      [
        ["⚖️", "> < >= <=", "Comparan magnitud."],
        ["🔍", "== !=", "Comparan con coerción."],
        ["🎯", "=== !==", "Comparan tipo y valor."],
        ["📦", "Objetos", "Se comparan por referencia."],
      ],
      "Usa === por defecto; reserva == para el caso null/undefined.",
    ),
    relacionArbol: arbol("Operadores relacionales", "Comparar valores", [
      ["📏", "> < >= <=", "Magnitud"],
      ["🔍", "== !=", "Coerción de tipos"],
      ["🎯", "=== !==", "Igualdad estricta"],
      ["📦", "Referencias", "Objetos y arrays"],
      ["🧮", "Object.is", "NaN y -0"],
    ]),
    demo: {
      codigo: `const a = 10;
const b = "10";

console.log(a == b);
console.log(a === b);
console.log(a > 5);
console.log(a <= 10);
console.log(NaN === NaN);
console.log(Object.is(NaN, NaN));`,
      pasos: [
        paso(1, { a: "10" }, "", "a es el número 10."),
        paso(2, { a: "10", b: '"10"' }, "", "b es la cadena \"10\"."),
        paso(4, { a: "10", b: '"10"' }, "true", "== convierte la cadena a número y compara."),
        paso(5, { a: "10", b: '"10"' }, "true\nfalse", "=== detecta que los tipos son distintos."),
        paso(6, { a: "10", b: '"10"' }, "true\nfalse\ntrue", "10 > 5 es true."),
        paso(7, { a: "10", b: '"10"' }, "true\nfalse\ntrue\ntrue", "10 <= 10 es true."),
        paso(8, { a: "10", b: '"10"' }, "true\nfalse\ntrue\ntrue\nfalse", "NaN nunca es igual a sí mismo con ===."),
        paso(9, { a: "10", b: '"10"' }, "true\nfalse\ntrue\ntrue\nfalse\ntrue", "Object.is sí considera NaN igual a NaN."),
      ],
    },
    scope: sc(
      "Comparar no modifica las variables",
      `const a = 10;
const b = "10";
let resultado = a == b;
resultado = a === b;
console.log(resultado);
const objeto = { x: 1 };
console.log(objeto === { x: 1 });
console.log(typeof a, typeof b);`,
      [
        ln("const a = 10;", "const", "global", "TDZ", "10", "Número."),
        ln('const b = "10";', "const", "global", "TDZ", '"10"', "Cadena."),
        ln("let resultado = a == b;", "let", "global", "TDZ", "true", "== aplica coerción."),
        ln("resultado = a === b;", "expresion", "global", "—", "false", "=== no aplica coerción."),
        ln("console.log(objeto === { x: 1 });", "expresion", "global", "—", "false", "Son dos referencias distintas."),
        ln("console.log(typeof a, typeof b);", "expresion", "global", "—", 'number string', "La comparación no cambia los tipos originales."),
      ],
      [
        "La coerción ocurre solo durante la comparación; las variables conservan su tipo.",
        "Dos literales de objeto son referencias diferentes.",
      ],
    ),
    editor: {
      consigna: "Comprueba qué comparaciones dan true. Cambia === por == y observa la coerción.",
      inicial: `const a = 10;
const b = "10";

console.log(a == b);
console.log(a === b);
console.log(a > 5);
console.log(a <= 10);
console.log(NaN === NaN);
console.log(Object.is(NaN, NaN));

const obj1 = { x: 1 };
const obj2 = { x: 1 };
console.log(obj1 === obj2);`,
      pista: "typeof a y typeof b te ayudan a explicar cada resultado.",
    },
    bugs: [
      {
        titulo: "Comparar objetos por contenido",
        codigo: "const a = { x: 1 };\nconst b = { x: 1 };\nconsole.log(a === b);",
        problemas: [
          "=== compara referencias, no propiedades.",
          "Dos objetos distintos con el mismo contenido dan false.",
        ],
        corregido: "const a = { x: 1 };\nconst b = { x: 1 };\nconsole.log(JSON.stringify(a) === JSON.stringify(b)); // true",
        explicacion: "Compara el contenido explícitamente o usa una utilidad de igualdad profunda.",
      },
      {
        titulo: "Coerción inesperada con ==",
        codigo: 'const entrada = "0";\nif (entrada == false) {\n  console.log("Vacío");\n}',
        problemas: [
          'La cadena "0" se convierte a número 0 y == false es true.',
          "Se toma una rama que no corresponde al dato real.",
        ],
        corregido: 'const entrada = "0";\nif (entrada === "") {\n  console.log("Vacío");\n}',
        explicacion: "Usa === y comprueba el valor real que esperas.",
      },
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve `10 === \"10\"`?",
        opciones: ["true", "false", "NaN", "Lanza TypeError"],
        correcta: 1,
        explicacion: "=== exige el mismo tipo; number y string no coinciden.",
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve `NaN === NaN`?",
        opciones: ["true", "false", "NaN", "undefined"],
        correcta: 1,
        explicacion: "NaN no es igual a nada, ni a sí mismo, con ===.",
      },
      {
        id: 3,
        pregunta: "¿Qué compara `===` en objetos?",
        opciones: ["El contenido.", "La referencia.", "Solo el tipo.", "Las claves."],
        correcta: 1,
        explicacion: "Dos objetos son iguales solo si son la misma referencia.",
      },
      {
        id: 4,
        pregunta: "¿Qué operador detecta null y undefined a la vez?",
        opciones: ["valor === null", "valor === undefined", "valor == null", "valor != null"],
        correcta: 2,
        explicacion: "== null es true para null y undefined; es el uso práctico de ==.",
      },
    ],
    fuente: "MDN Web Docs – Equality comparisons · Relational operators · ECMAScript – Relational Operators · JavaScript.info – Comparisons",
  },

];

export const JS_ESTRUCTURAS_DOCS = Object.fromEntries(DOCS.map((doc) => [doc.id, doc]));

export const JS_ESTRUCTURAS = {
  id: "estructuras",
  label: "Palabras Reservadas y Estructuras",
  icon: "🧱",
  titulo: "Palabras reservadas y estructuras de control",
  descripcion:
    "Domina las declaraciones, los condicionales, los bucles, las funciones y los operadores con trazas, simuladores y retos.",
  grupos: [
    {
      seccion: "Declaración de variables",
      subtitulo: "var, let y const",
      metodos: [
        {
          id: "js-var-let-const",
          nombre: "var, let y const",
          firma: "var x = 1; let y = 2; const Z = 3;",
          icon: "📦",
        },
      ],
    },
    {
      seccion: "Estructuras condicionales",
      subtitulo: "if, if...else, anidados y switch",
      metodos: [
        { id: "js-if", nombre: "if", firma: "if (condicion) { ... }", icon: "🔀" },
        { id: "js-if-else", nombre: "if...else", firma: "if (condicion) { ... } else { ... }", icon: "↔️" },
        { id: "js-if-anidado", nombre: "if anidado / else if", firma: "if (a) { ... } else if (b) { ... } else { ... }", icon: "🪆" },
        { id: "js-switch", nombre: "switch", firma: "switch (valor) { case ...: ... break; default: ... }", icon: "🎛️" },
      ],
    },
    {
      seccion: "Estructuras repetitivas",
      subtitulo: "while, do...while, for, for...in y for...of",
      metodos: [
        { id: "js-while", nombre: "while", firma: "while (condicion) { ... }", icon: "🔁" },
        { id: "js-do-while", nombre: "do...while", firma: "do { ... } while (condicion);", icon: "🔄" },
        { id: "js-for", nombre: "for", firma: "for (inicio; condicion; paso) { ... }", icon: "➰" },
        { id: "js-for-in", nombre: "for...in", firma: "for (const clave in objeto) { ... }", icon: "🗝️" },
        { id: "js-for-of", nombre: "for...of", firma: "for (const valor of iterable) { ... }", icon: "📦" },
      ],
    },
    {
      seccion: "Funciones y retorno",
      subtitulo: "function y return",
      metodos: [
        { id: "js-funcion", nombre: "function", firma: "function nombre(parametros) { ... }", icon: "🧩" },
        { id: "js-return", nombre: "return", firma: "return valor;", icon: "🎁" },
      ],
    },
    {
      seccion: "Operadores",
      subtitulo: "asignación, incremento, lógicos, matemáticos y relacionales",
      metodos: [
        { id: "js-op-asignacion", nombre: "Asignación", firma: "= += -= *= /= %= **= ??= ||= &&=", icon: "📝" },
        { id: "js-op-incremento", nombre: "Incremento y decremento", firma: "++ --", icon: "➕" },
        { id: "js-op-logicos", nombre: "Lógicos", firma: "&& || ! ??", icon: "🧠" },
        { id: "js-op-matematicos", nombre: "Matemáticos", firma: "+ - * / % **", icon: "➗" },
        { id: "js-op-relacionales", nombre: "Relacionales", firma: "> < >= <= == === != !==", icon: "⚖️" },
      ],
    },
  ],
};
