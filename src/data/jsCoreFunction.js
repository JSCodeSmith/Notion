/* Generado desde Apuntes/ — JS Core.
   Regenerar con: node scripts/generate-js-core.mjs */

export const JS_CORE_FUNCTION = {
  "id": "js-function",
  "label": "Function",
  "icon": "📞",
  "titulo": "Function: this y argumentos",
  "descripcion": "Controla el valor de this y la forma de pasar argumentos al invocar funciones.",
  "simulador": "function",
  "grupos": [
    {
      "seccion": "Invocación con contexto",
      "metodos": [
        {
          "id": "js-function-call",
          "nombre": "Function.prototype.call()",
          "firma": "fn.call(thisArg, ...args)",
          "icon": "📞",
        },
        {
          "id": "js-function-apply",
          "nombre": "Function.prototype.apply()",
          "firma": "fn.apply(thisArg, [args])",
          "icon": "📦",
        },
        {
          "id": "js-function-bind",
          "nombre": "Function.prototype.bind()",
          "firma": "fn.bind(thisArg, ...args)",
          "icon": "😊",
        },
      ],
    },
  ],
};

export const JS_CORE_FUNCTION_DOCS = {
  "js-function-call": {
    "id": "js-function-call",
    "titulo": "Function.prototype.call()",
    "icon": "📞",
    "categoria": "Function",
    "firma": "fn.call(thisArg, ...args)",
    "simulador": "function-call",
    "definicion": [
      "`call()` es un **método** de `Function.prototype` que permite **invocar una función inmediatamente**, especificando explícitamente el valor de `this` y pasando los argumentos uno por uno.",
    ],
    "queEs": [
      "Es un **método heredado** de `Function.prototype`.",
      "**Sí forma parte del lenguaje JavaScript (ECMAScript)**, **no de una Web API**.",
      "Permite controlar el contexto (`this`) con el que se ejecuta una función.",
    ],
    "paraQueSirve": [
      "Se utiliza para:",
      "Cambiar el valor de `this` al ejecutar una función.",
      "Reutilizar métodos entre distintos objetos.",
      "Invocar funciones con un contexto específico.",
      "Implementar herencia o composición en algunos patrones de JavaScript.",
    ],
    "comoFunciona": [
      "Se tiene una función.",
      "Se llama al método `call()`.",
      "El primer argumento indica cuál será el valor de `this`.",
      "Los demás argumentos se pasan a la función de forma individual.",
      "La función se ejecuta inmediatamente.",
    ],
    "sintaxis": [
      {
        "code": "funcion.call(thisArg,arg1,arg2, ...,argN);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Cambiar el valor de `this`",
        "code": "function saludar() {\n\t\tconsole.log(`Hola, soy${this.nombre}`);\n}\nconst persona= {\n    nombre:\"Josué\"\n};\nsaludar.call(persona);\n\nHola, soy Josué",
      },
      {
        "titulo": "Pasar argumentos",
        "code": "function presentar(ciudad,pais) {c\n\t\tonsole.log(`${this.nombre} vive en${ciudad},${pais}`);\n}\nconst persona= {\n    nombre:\"Ana\"\n};\npresentar.call(persona,\"Lima\",\"Perú\");\n\nAna vive en Lima, Perú",
      },
      {
        "titulo": "Reutilizar un método",
        "code": "const persona1= {\n\t\tnombre:\"Carlos\",\n\t\tsaludar() {\n\t\t    console.log(`Hola, soy${this.nombre}`);\n\t   }\n};\nconst persona2= {\n    nombre:\"Laura\"\n};\npersona1.saludar.call(persona2);\n\nHola, soy Laura",
      },
      {
        "titulo": "Si `thisArg` es `null`",
        "descripcion": "En modo no estricto (`non-strict`), `this` será el objeto global (`window` en navegadores). En modo estricto (`\"use strict\"`), `this` será `null`.",
        "code": "function mostrar() {\n\tconsole.log(this);\n}\nmostrar.call(null);",
      },
    ],
    "errores": [
      {
        "texto": "❌ Confundir `call()` con `apply()` — `call()` recibe los argumentos **uno por uno**. Mientras que: `apply()` los recibe dentro de un **array**.",
        "code": "funcion.call(objeto,1,2,3);\n\nfuncion.apply(objeto, [1,2,3]);",
      },
      {
        "texto": "❌ Pensar que cambia permanentemente `this` — `call()` solo cambia `this` **durante esa ejecución**.",
        "code": "saludar.call(persona);",
      },
      {
        "texto": "❌ Usarlo sobre algo que no es una función — Esto produce un error porque `call()` solo existe en funciones.",
        "code": "const numero=10;\nnumero.call();",
      },
    ],
    "casos": [
      "Reutilizar métodos entre objetos.",
      "Controlar explícitamente el valor de `this`.",
      "Invocar funciones con un contexto diferente.",
      "Compatibilidad con código antiguo.",
      "Algunos patrones avanzados de programación orientada a objetos.",
    ],
    "relacion": [
      "`this` → `call()` permite establecer su valor.",
      "`apply()` → Similar a `call()`, pero recibe un array de argumentos.",
      "`bind()` → Crea una nueva función con `this` fijo, pero no la ejecuta inmediatamente.",
      "`Function.prototype` → `call()` está definido en este prototipo.",
      "**Métodos y funciones** → Puede utilizarse para compartir métodos entre objetos.",
    ],
    "analogia": "Imagina que un profesor normalmente da clase en un salón. Con `call()` es como decirle: **\"Hoy vas a dar la misma clase, pero en este otro salón.\"** La clase (función) es la misma. El salón (`this`) cambia temporalmente. Al terminar, todo vuelve a la normalidad.",
    "fuente": "Documentación oficial de MDN: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/call Especificación ECMAScript: https://tc39.es/ecma262/#sec-function.prototype.call",
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Function.prototype.call()?",
        "opciones": [
          "fn.bind(thisArg, ...args)",
          "Ninguna de las anteriores",
          "fn.apply(thisArg, [args])",
          "fn.call(thisArg, ...args)",
        ],
        "correcta": 3,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Function.prototype.call()?",
        "opciones": [
          "Ninguna de las anteriores",
          "apply() es un método de Function.prototype que permite invocar una función inmediatamente, especificando explícitamente el valor de this y…",
          "Function.prototype.bind() es un método de las funciones en JavaScript que crea una nueva función con el this fijado permanentemente a un…",
          "call() es un método de Function.prototype que permite invocar una función inmediatamente, especificando explícitamente el valor de this y…",
        ],
        "correcta": 3,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Function.prototype.call()?",
        "opciones": [
          "🔒 Fijar el this de una función de forma permanente.",
          "Todas las anteriores",
          "Ninguna de las anteriores",
          "Se utiliza para: Cambiar el valor de this al ejecutar una función.",
        ],
        "correcta": 3,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Function.prototype.call()?",
        "opciones": [
          "Todas las anteriores",
          "Creer que bind() ejecuta la función → No la ejecuta; devuelve una nueva",
          "Ninguna de las anteriores",
          "Confundir call() con apply() — call() recibe los argumentos uno por uno. Mientras que: apply() los recibe dentro de un array.",
        ],
        "correcta": 3,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-function-call-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es un método heredado de `Function.prototype`.",
            },
            {
              "concepto": "¿Cómo funciona?",
              "descripcion": "Se tiene una función.",
            },
            {
              "concepto": "Error común",
              "descripcion": "❌ Confundir `call()` con `apply()` — `call()` recibe los argumentos uno por uno. Mientras que: `apply()` los recibe dentro de un array.",
            },
            {
              "concepto": "Caso de uso",
              "descripcion": "Reutilizar métodos entre objetos.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "¿Qué es? → Es un método heredado de `Function.prototype`. · ¿Cómo funciona? → Se tiene una función. · Error común → ❌ Confundir `call()` con `apply()` — `call()` recibe los argumentos uno por uno. Mientras que: `apply()` los recibe dentro de un array. · Caso de uso → Reutilizar métodos entre objetos.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "Cambiar el valor de `this`",
          "explicacion": "",
          "codigo": "function saludar() {\n\t\tconsole.log(`Hola, soy${this.nombre}`);\n}\nconst persona= {\n    nombre:\"Josué\"\n};\nsaludar.call(persona);\n\nHola, soy Josué",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "Pasar argumentos",
          "explicacion": "",
          "codigo": "function presentar(ciudad,pais) {c\n\t\tonsole.log(`${this.nombre} vive en${ciudad},${pais}`);\n}\nconst persona= {\n    nombre:\"Ana\"\n};\npresentar.call(persona,\"Lima\",\"Perú\");\n\nAna vive en Lima, Perú",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "Reutilizar un método",
          "explicacion": "",
          "codigo": "const persona1= {\n\t\tnombre:\"Carlos\",\n\t\tsaludar() {\n\t\t    console.log(`Hola, soy${this.nombre}`);\n\t   }\n};\nconst persona2= {\n    nombre:\"Laura\"\n};\npersona1.saludar.call(persona2);\n\nHola, soy Laura",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "Si `thisArg` es `null`",
          "explicacion": "En modo no estricto (`non-strict`), `this` será el objeto global (`window` en navegadores). En modo estricto (`\"use strict\"`), `this` será `null`.",
          "codigo": "function mostrar() {\n\tconsole.log(this);\n}\nmostrar.call(null);",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-function-apply": {
    "id": "js-function-apply",
    "titulo": "Function.prototype.apply()",
    "icon": "📦",
    "categoria": "Function",
    "firma": "fn.apply(thisArg, [args])",
    "simulador": "function-apply",
    "definicion": [
      "`apply()` es un **método** de `Function.prototype` que permite **invocar una función inmediatamente**, especificando explícitamente el valor de `this` y pasando los argumentos como un **array** o un **objeto iterable similar a un array (array-like)**.",
    ],
    "queEs": [
      "Es un **método heredado** de `Function.prototype`.",
      "**Forma parte del lenguaje JavaScript (ECMAScript)**, **no de una Web API**.",
      "Permite controlar el contexto (`this`) con el que se ejecuta una función y enviar múltiples argumentos agrupados en un arreglo.",
    ],
    "paraQueSirve": [
      "Se utiliza para:",
      "Cambiar el valor de `this` al ejecutar una función.",
      "Pasar una lista de argumentos almacenados en un array.",
      "Reutilizar métodos entre distintos objetos.",
      "Trabajar con objetos similares a arreglos (*array-like*).",
    ],
    "comoFunciona": [
      "Se tiene una función.",
      "Se llama al método `apply()`.",
      "El primer argumento indica cuál será el valor de `this`.",
      "El segundo argumento es un **array** o un **objeto array-like** con los parámetros de la función.",
      "La función se ejecuta inmediatamente.",
    ],
    "sintaxis": [
      {
        "code": "funcion.apply(thisArg, [arg1,arg2, ...,argN]);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "Cambiar el valor de `this`",
        "code": "function saludar() {\n\t\tconsole.log(`Hola, soy${this.nombre}`);\n}\nconst persona= {\n    nombre:\"Josué\"\n};\nsaludar.apply(persona);\n\nHola, soy Josué",
      },
      {
        "titulo": "Pasar argumentos mediante un array",
        "code": "function presentar(ciudad,pais) {\n\t\tconsole.log(`${this.nombre} vive en${ciudad},${pais}`);\n}\nconst persona= {\n    nombre:\"Ana\"\n};\npresentar.apply(persona, [\"Lima\",\"Perú\"]);\n\nAna vive en Lima, Perú",
      },
      {
        "titulo": "Reutilizar un método",
        "code": "const persona1= {\n    nombre:\"Carlos\",\n\t    saludar() {\n\t\t\t    console.log(`Hola, soy${this.nombre}`);\n    }\n};\nconst persona2= {\n    nombre:\"Laura\"\n};\npersona1.saludar.apply(persona2);\n\nHola, soy Laura",
      },
      {
        "titulo": "Obtener el máximo de un arreglo",
        "code": "const numeros= [5,12,8,20];\nconst maximo=Math.max.apply(null,numeros);\nconsole.log(maximo);\n\n20\n\nMath.max(...numeros);",
      },
    ],
    "errores": [
      {
        "texto": "❌ Confundir `apply()` con `call()` — Incorrecto: `apply()` **no recibe argumentos separados**. Lo correcto:",
        "code": "funcion.apply(objeto,1,2,3);\n\nfuncion.apply(objeto, [1,2,3]);",
      },
      {
        "texto": "❌ Pasar un valor que no sea un array o array-like — El segundo argumento debe ser un **array** o un **objeto similar a un array**.",
        "code": "funcion.apply(objeto,\"Hola\");",
      },
      {
        "texto": "❌ Pensar que cambia permanentemente `this` — `apply()` solo modifica `this` **durante esa llamada**.",
        "code": "saludar.apply(persona);",
      },
      {
        "texto": "❌ Usarlo sobre algo que no es una función — Esto produce un error porque `apply()` solo existe en funciones.",
        "code": "const numero=10;\nnumero.apply();",
      },
    ],
    "casos": [
      "Ejecutar funciones con argumentos almacenados en un array.",
      "Reutilizar métodos entre distintos objetos.",
      "Adaptar objetos array-like.",
      "Compatibilidad con código JavaScript antiguo.",
      "Invocar funciones con un contexto específico.",
    ],
    "relacion": [
      "`this` → `apply()` permite establecer su valor.",
      "`call()` → Similar a `apply()`, pero recibe los argumentos uno por uno.",
      "`bind()` → Devuelve una nueva función con `this` fijado, sin ejecutarla inmediatamente.",
      "`Function.prototype` → `apply()` está definido en este prototipo.",
      "**Operador Spread (**`...`**)** → En muchos casos modernos reemplaza el uso de `apply()` para expandir arreglos.",
    ],
    "analogia": "Imagina que vas a enviar una lista de invitados a un evento. Con `call()`, dices cada nombre por separado: Ana, Luis, Carlos. Con `apply()`, entregas **la lista completa** de invitados. El resultado es el mismo: todos reciben la invitación. La diferencia está en **cómo entregas los argumentos**.",
    "fuente": "Documentación oficial de MDN: https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Function/apply Especificación ECMAScript: https://tc39.es/ecma262/#sec-function.prototype.apply",
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Function.prototype.apply()?",
        "opciones": [
          "fn.apply(thisArg, [args])",
          "fn.bind(thisArg, ...args)",
          "fn.call(thisArg, ...args)",
          "Ninguna de las anteriores",
        ],
        "correcta": 0,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Function.prototype.apply()?",
        "opciones": [
          "Function.prototype.bind() es un método de las funciones en JavaScript que crea una nueva función con el this fijado permanentemente a un…",
          "apply() es un método de Function.prototype que permite invocar una función inmediatamente, especificando explícitamente el valor de this y…",
          "call() es un método de Function.prototype que permite invocar una función inmediatamente, especificando explícitamente el valor de this y…",
          "Ninguna de las anteriores",
        ],
        "correcta": 1,
      },
      {
        "id": 3,
        "pregunta": "¿Para qué sirve Function.prototype.apply()?",
        "opciones": [
          "Se utiliza para: Cambiar el valor de this al ejecutar una función.",
          "Ninguna de las anteriores",
          "🔒 Fijar el this de una función de forma permanente.",
          "Todas las anteriores",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Function.prototype.apply()?",
        "opciones": [
          "Pasar un valor que no sea un array o array-like — El segundo argumento debe ser un array o un objeto similar a un array.",
          "Confundir call() con apply() — call() recibe los argumentos uno por uno. Mientras que: apply() los recibe dentro de un array.",
          "Creer que bind() ejecuta la función → No la ejecuta; devuelve una nueva",
          "Ninguna de las anteriores",
        ],
        "correcta": 0,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-function-apply-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "❌ Confundir `apply()` con `call()` — Incorrecto",
              "descripcion": "`apply()` no recibe argumentos separados. Lo correcto:",
            },
            {
              "concepto": "¿Qué es?",
              "descripcion": "Es un método heredado de `Function.prototype`.",
            },
            {
              "concepto": "¿Cómo funciona?",
              "descripcion": "Se tiene una función.",
            },
            {
              "concepto": "Error común",
              "descripcion": "❌ Confundir `apply()` con `call()` — Incorrecto: `apply()` no recibe argumentos separados. Lo correcto:",
            },
            {
              "concepto": "Caso de uso",
              "descripcion": "Ejecutar funciones con argumentos almacenados en un array.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "❌ Confundir `apply()` con `call()` — Incorrecto → `apply()` no recibe argumentos separados. Lo correcto: · ¿Qué es? → Es un método heredado de `Function.prototype`. · ¿Cómo funciona? → Se tiene una función. · Error común → ❌ Confundir `apply()` con `call()` — Incorrecto: `apply()` no recibe argumentos separados. Lo correcto: · Caso de uso → Ejecutar funciones con argumentos almacenados en un array.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "Cambiar el valor de `this`",
          "explicacion": "",
          "codigo": "function saludar() {\n\t\tconsole.log(`Hola, soy${this.nombre}`);\n}\nconst persona= {\n    nombre:\"Josué\"\n};\nsaludar.apply(persona);\n\nHola, soy Josué",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "Pasar argumentos mediante un array",
          "explicacion": "",
          "codigo": "function presentar(ciudad,pais) {\n\t\tconsole.log(`${this.nombre} vive en${ciudad},${pais}`);\n}\nconst persona= {\n    nombre:\"Ana\"\n};\npresentar.apply(persona, [\"Lima\",\"Perú\"]);\n\nAna vive en Lima, Perú",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "Reutilizar un método",
          "explicacion": "",
          "codigo": "const persona1= {\n    nombre:\"Carlos\",\n\t    saludar() {\n\t\t\t    console.log(`Hola, soy${this.nombre}`);\n    }\n};\nconst persona2= {\n    nombre:\"Laura\"\n};\npersona1.saludar.apply(persona2);\n\nHola, soy Laura",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "Obtener el máximo de un arreglo",
          "explicacion": "",
          "codigo": "const numeros= [5,12,8,20];\nconst maximo=Math.max.apply(null,numeros);\nconsole.log(maximo);\n\n20\n\nMath.max(...numeros);",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
  "js-function-bind": {
    "id": "js-function-bind",
    "titulo": "Function.prototype.bind()",
    "icon": "😊",
    "categoria": "Function",
    "firma": "fn.bind(thisArg, ...args)",
    "simulador": "function-bind",
    "definicion": [
      "`Function.prototype.bind()` es un **método de las funciones** en JavaScript que **crea una nueva función** con el `this` **fijado permanentemente** a un valor dado y, opcionalmente, con **argumentos preestablecidos** (*partial application*).",
    ],
    "queEs": [
      "Es uno de los tres métodos que permiten **controlar el **`this` en JavaScript (junto con `call` y `apply`).",
      "A diferencia de ellos, `bind()` **no ejecuta** la función:",
      "devuelve una **copia enlazada** que puedes invocar **más tarde**, en cualquier contexto, y siempre conservará el `this` y los argumentos iniciales que le indicaste.",
    ],
    "paraQueSirve": [
      "🔒 **Fijar el **`this` de una función de forma permanente.",
      "🧩 Crear **funciones parcialmente aplicadas** (*partial application*).",
      "🎛️ Pasar **métodos como callbacks** sin perder su contexto.",
      "🏗️ Implementar **currying** sencillo.",
      "🔄 Reutilizar funciones con **valores predefinidos**.",
      "🧱 Emular **métodos de instancia** en otros objetos.",
    ],
    "comoFunciona": [
      "Recibe un **primer argumento**: el valor que será `this` dentro de la función.",
      "Recibe **argumentos opcionales** que se **\"congelan\"** al inicio.",
      "Devuelve una **nueva función** (`bound function`).",
      "Esa nueva función, al llamarse: Usa el `this` fijado (ignora el `this` de la llamada). Antepone los argumentos preestablecidos a los nuevos.",
      "`bind()` **no modifica** la función original.",
      "⚠️ El `this` fijado con `bind` **no se puede cambiar** ni con `call` ni con `apply`.",
    ],
    "sintaxis": [
      {
        "code": "const nuevaFuncion = funcionOriginal.bind(thisArg, arg1, arg2, ...);",
      },
    ],
    "ejemplos": [
      {
        "titulo": "**🔹 Ejemplo 1: Fijar **`this`",
        "code": "const persona = {\n  nombre: \"Ana\",\n  saludar() {\n    console.log(`Hola, soy${this.nombre}`);\n  }\n};\n\nconst saludarSuelto = persona.saludar;\nsaludarSuelto(); // ❌ \"Hola, soy undefined\"\n\nconst saludarFijado = persona.saludar.bind(persona);\nsaludarFijado(); // ✅ \"Hola, soy Ana\"",
      },
      {
        "titulo": "**🔹 Ejemplo 2: Partial application (argumentos preestablecidos)**",
        "code": "function multiplicar(a, b) {\n  return a * b;\n}\n\nconst duplicar = multiplicar.bind(null, 2);\nconsole.log(duplicar(5)); // 10\nconsole.log(duplicar(10)); // 20\n\nconst triplicar = multiplicar.bind(null, 3);\nconsole.log(triplicar(4)); // 12",
      },
      {
        "titulo": "**🔹 Ejemplo 3: **`this`** + argumentos combinados**",
        "code": "function presentar(saludo, puntuacion) {\n  console.log(`${saludo}, soy${this.nombre}${puntuacion}`);\n}\n\nconst persona = { nombre: \"Luis\" };\n\nconst saludarLuis = presentar.bind(persona, \"Hey\");\nsaludarLuis(\"!\"); // \"Hey, soy Luis!\"\nsaludarLuis(\"!!!\"); // \"Hey, soy Luis!!!\"",
      },
      {
        "titulo": "**🔹 Ejemplo 4: Como callback en **`setTimeout`",
        "code": "const contador = {\n  valor: 0,\n  incrementar() {\n    this.valor++;\n    console.log(this.valor);\n  }\n};\n\n// ❌ Pierde el this\nsetTimeout(contador.incrementar, 1000); // NaN\n\n// ✅ Con bind\nsetTimeout(contador.incrementar.bind(contador), 1000); // 1",
      },
      {
        "titulo": "**🔹 Ejemplo 5: Como callback en eventos**",
        "code": "class Boton {\n  constructor() {\n    this.clicks = 0;\n    const btn = document.querySelector(\"#btn\");\n    btn.addEventListener(\"click\", this.manejarClick.bind(this));\n  }\n  manejarClick() {\n    this.clicks++;\n    console.log(`Clicks:${this.clicks}`);\n  }\n}",
      },
      {
        "titulo": "**🔹 Ejemplo 6: El **`this`** no se puede sobreescribir**",
        "code": "function quienSoy() {\n  console.log(this.nombre);\n}\n\nconst fija = quienSoy.bind({ nombre: \"Fijo\" });\nfija.call({ nombre: \"Otro\" }); // \"Fijo\" ✅ (bind gana)",
      },
      {
        "titulo": "**🔹 Ejemplo 7: Reutilizar métodos de un objeto en otro**",
        "code": "const coche = {\n  marca: \"Toyota\",\n  mostrar() {\n    console.log(this.marca);\n  }\n};\n\nconst moto = { marca: \"Yamaha\" };\nconst mostrarMoto = coche.mostrar.bind(moto);\nmostrarMoto(); // \"Yamaha\"",
      },
    ],
    "errores": [
      "Creer que `bind()` **ejecuta** la función → ❌ No la ejecuta; devuelve una nueva",
      "Esperar que `call/apply` cambien el `this` → ❌ `bind` tiene prioridad absoluta",
      "Usar `bind` en **arrow functions** → ❌ Las arrows **ignoran** `this`; no tiene efecto",
      "Llamar `bind` dentro de un bucle sin guardar → Crea funciones nuevas cada vez → ineficiente",
      "Olvidar `new` con constructores bound → `new (F.bind(obj))` crea instancia de `F`, no de `obj`",
      "Pensar que modifica la función original → ❌ Es **inmutable**, devuelve copia",
      "No guardar la función bound → `func.bind(x)()` funciona, pero pierdes la referencia",
      "Confundir con `call`/`apply` → Aquellos **ejecutan**; `bind` **prepara**",
      {
        "texto": "**❌ Ejemplo de error clásico**",
        "code": "const obj = {\n  nombre: \"Ana\",\n  saludar: () => console.log(this.nombre) // ❌ arrow ignora bind\n};\n\nconst f = obj.saludar.bind({ nombre: \"Luis\" });\nf(); // undefined (las arrows no tienen this propio)",
      },
      {
        "texto": "**❌ **`bind`** y **`new`",
        "code": "function Persona(nombre) {\n  this.nombre = nombre;\n}\nconst Bound = Persona.bind({ nombre: \"ignorado\" });\nconst p = new Bound(\"Pedro\");\nconsole.log(p.nombre); // \"Pedro\" ✅ (el this del bind se ignora con new)",
      },
    ],
    "casos": [
      "🎯 Pasar **métodos como callbacks** (`setTimeout`, `addEventListener`).",
      "🧩 **Partial application**: crear funciones derivadas.",
      "🏗️ En **clases**: enlazar métodos en el constructor.",
      "🎛️ **Event handlers** que necesitan acceso a `this`.",
      "🔄 **Currying** básico.",
      "🧪 **Testing**: fijar contexto en spies/mocks.",
      "🧱 Reutilizar métodos entre objetos no relacionados.",
      "⚙️ React class components: `this.handleClick = this.handleClick.bind(this)`.",
    ],
    "relacion": [
      "`call()` → Ejecuta con `this` dado + args individuales",
      "`apply()` → Ejecuta con `this` dado + args en array",
      "`bind()` → **Devuelve** nueva función con `this` fijo + args",
      "Arrow functions → **No tienen **`this`** propio**; heredan del scope",
      "`this` → Contexto de ejecución que `bind` fija",
      "Currying → Técnica relacionada con partial application",
      "Closures → `bind` internamente usa closures para recordar args",
      "`new` → Ignora el `thisArg` de `bind` cuando se usa con constructores",
      "**🆚 Comparativa **`call`** vs **`apply`** vs **`bind`",
      "`call` → ✅ Sí · Fijo · Individuales · Resultado",
      "`apply` → ✅ Sí · Fijo · Array · Resultado",
      "`bind` → ❌ No · Fijo permanente · Preestablecidos + nuevos · Nueva función",
    ],
    "analogia": "Imagina que tienes una **plantilla de carta** 📄 que dice: *\"Hola, soy [nombre]. [mensaje]\"* `call` / `apply` = rellenas los campos **y envías la carta ya**. `bind` = **imprimes una copia** con `[nombre]` ya escrito como *\"Ana\"* y la guardas. Cada vez que quieras, solo agregas el `[mensaje]` y la envías. El `[nombre]` ya quedó **fijo para siempre**, no se puede cambiar. Y si intentas usar la carta con otro nombre → **no funciona**, sigue diciendo \"Ana\".",
    "fuente": "📘 MDN – Function.prototype.bind() 📗 ECMAScript Specification – §20.2.3.2 Function.prototype.bind 📕 \"You Don't Know JS: this & Object Prototypes\" – Kyle Simpson 📙 \"JavaScript: The Definitive Guide\" – David Flanagan",
    "extras": [],
    "quiz": [
      {
        "id": 1,
        "pregunta": "¿Cuál es la firma correcta de Function.prototype.bind()?",
        "opciones": [
          "Ninguna de las anteriores",
          "fn.bind(thisArg, ...args)",
          "fn.call(thisArg, ...args)",
          "fn.apply(thisArg, [args])",
        ],
        "correcta": 1,
      },
      {
        "id": 2,
        "pregunta": "Según tus apuntes, ¿qué describe mejor Function.prototype.bind()?",
        "opciones": [
          "Function.prototype.bind() es un método de las funciones en JavaScript que crea una nueva función con el this fijado permanentemente a un…",
          "Ninguna de las anteriores",
          "call() es un método de Function.prototype que permite invocar una función inmediatamente, especificando explícitamente el valor de this y…",
          "apply() es un método de Function.prototype que permite invocar una función inmediatamente, especificando explícitamente el valor de this y…",
        ],
        "correcta": 0,
      },
      {
        "id": 4,
        "pregunta": "¿Cuál de estos errores o advertencias corresponde a Function.prototype.bind()?",
        "opciones": [
          "Confundir call() con apply() — call() recibe los argumentos uno por uno. Mientras que: apply() los recibe dentro de un array.",
          "Creer que bind() ejecuta la función → No la ejecuta; devuelve una nueva",
          "Todas las anteriores",
          "Ninguna de las anteriores",
        ],
        "correcta": 1,
      },
    ],
    "lab": {
      "misiones": [
        {
          "id": "js-function-bind-emparejar",
          "tipo": "emparejar",
          "titulo": "Une concepto y descripción",
          "dificultad": "Medio",
          "xp": 90,
          "pares": [
            {
              "concepto": "🧩 Partial application",
              "descripcion": "crear funciones derivadas.",
            },
            {
              "concepto": "🏗️ En clases",
              "descripcion": "enlazar métodos en el constructor.",
            },
            {
              "concepto": "🧪 Testing",
              "descripcion": "fijar contexto en spies/mocks.",
            },
            {
              "concepto": "⚙️ React class components",
              "descripcion": "`this.handleClick = this.handleClick.bind(this)`.",
            },
          ],
          "pista": "Selecciona un concepto y luego su descripción.",
          "solucion": "🧩 Partial application → crear funciones derivadas. · 🏗️ En clases → enlazar métodos en el constructor. · 🧪 Testing → fijar contexto en spies/mocks. · ⚙️ React class components → `this.handleClick = this.handleClick.bind(this)`.",
        },
      ],
      "pasoAPaso": [
        {
          "paso": 1,
          "titulo": "**🔹 Ejemplo 1: Fijar **`this`",
          "explicacion": "",
          "codigo": "const persona = {\n  nombre: \"Ana\",\n  saludar() {\n    console.log(`Hola, soy${this.nombre}`);\n  }\n};\n\nconst saludarSuelto = persona.saludar;\nsaludarSuelto(); // ❌ \"Hola, soy undefined\"\n\nconst saludarFijado = persona.saludar.bind(persona);\nsaludarFijado(); // ✅ \"Hola, soy Ana\"",
          "salida": "",
        },
        {
          "paso": 2,
          "titulo": "**🔹 Ejemplo 2: Partial application (argumentos preestablecidos)**",
          "explicacion": "",
          "codigo": "function multiplicar(a, b) {\n  return a * b;\n}\n\nconst duplicar = multiplicar.bind(null, 2);\nconsole.log(duplicar(5)); // 10\nconsole.log(duplicar(10)); // 20\n\nconst triplicar = multiplicar.bind(null, 3);\nconsole.log(triplicar(4)); // 12",
          "salida": "",
        },
        {
          "paso": 3,
          "titulo": "**🔹 Ejemplo 3: **`this`** + argumentos combinados**",
          "explicacion": "",
          "codigo": "function presentar(saludo, puntuacion) {\n  console.log(`${saludo}, soy${this.nombre}${puntuacion}`);\n}\n\nconst persona = { nombre: \"Luis\" };\n\nconst saludarLuis = presentar.bind(persona, \"Hey\");\nsaludarLuis(\"!\"); // \"Hey, soy Luis!\"\nsaludarLuis(\"!!!\"); // \"Hey, soy Luis!!!\"",
          "salida": "",
        },
        {
          "paso": 4,
          "titulo": "**🔹 Ejemplo 4: Como callback en **`setTimeout`",
          "explicacion": "",
          "codigo": "const contador = {\n  valor: 0,\n  incrementar() {\n    this.valor++;\n    console.log(this.valor);\n  }\n};\n\n// ❌ Pierde el this\nsetTimeout(contador.incrementar, 1000); // NaN\n\n// ✅ Con bind\nsetTimeout(contador.incrementar.bind(contador), 1000); // 1",
          "salida": "",
        },
        {
          "paso": 5,
          "titulo": "**🔹 Ejemplo 5: Como callback en eventos**",
          "explicacion": "",
          "codigo": "class Boton {\n  constructor() {\n    this.clicks = 0;\n    const btn = document.querySelector(\"#btn\");\n    btn.addEventListener(\"click\", this.manejarClick.bind(this));\n  }\n  manejarClick() {\n    this.clicks++;\n    console.log(`Clicks:${this.clicks}`);\n  }\n}",
          "salida": "",
        },
        {
          "paso": 6,
          "titulo": "**🔹 Ejemplo 6: El **`this`** no se puede sobreescribir**",
          "explicacion": "",
          "codigo": "function quienSoy() {\n  console.log(this.nombre);\n}\n\nconst fija = quienSoy.bind({ nombre: \"Fijo\" });\nfija.call({ nombre: \"Otro\" }); // \"Fijo\" ✅ (bind gana)",
          "salida": "",
        },
        {
          "paso": 7,
          "titulo": "**🔹 Ejemplo 7: Reutilizar métodos de un objeto en otro**",
          "explicacion": "",
          "codigo": "const coche = {\n  marca: \"Toyota\",\n  mostrar() {\n    console.log(this.marca);\n  }\n};\n\nconst moto = { marca: \"Yamaha\" };\nconst mostrarMoto = coche.mostrar.bind(moto);\nmostrarMoto(); // \"Yamaha\"",
          "salida": "",
        },
      ],
      "consola": true,
      "editor": true,
      "depuracion": true,
    },
  },
};
