const Q = (rows) =>
  rows.map(([pregunta, opciones, correcta], i) => ({
    id: i + 1,
    pregunta,
    opciones,
    correcta,
  }));

/* ======================================================================
   LISTA PARA LA TABLA (misma forma que METODOS_ARRAYS / METODOS_STRINGS)
   ====================================================================== */
export const METODOS_NUMEROS = [
  {
    seccion: "Validación de números",
    metodos: [
      {
        id: "isinteger",
        nombre: "Number.isInteger()",
        firma: "Number.isInteger(value)",
        icon: "✅",
      },
      {
        id: "issafeinteger",
        nombre: "Number.isSafeInteger()",
        firma: "Number.isSafeInteger(value)",
        icon: "🔒",
      },
      {
        id: "isfinite",
        nombre: "Number.isFinite()",
        firma: "Number.isFinite(value)",
        icon: "♾️",
      },
      {
        id: "isnan",
        nombre: "Number.isNaN()",
        firma: "Number.isNaN(value)",
        icon: "❓",
      },
    ],
  },
  {
    seccion: "Conversión de texto a número",
    metodos: [
      {
        id: "parseint",
        nombre: "Number.parseInt()",
        firma: "Number.parseInt(string, radix)",
        icon: "🔢",
      },
      {
        id: "parsefloat",
        nombre: "Number.parseFloat()",
        firma: "Number.parseFloat(string)",
        icon: "🔢",
      },
    ],
  },
  {
    seccion: "Formato y presentación",
    metodos: [
      {
        id: "tofixed",
        nombre: "toFixed()",
        firma: "Number.prototype.toFixed(digits)",
        icon: "💰",
      },
    ],
  },
];

/* ======================================================================
   APUNTES COMPLETOS
   ====================================================================== */
export const METODOS_NUMEROS_DOCS = {
  /* ======================= Number.isInteger() ======================= */
  isinteger: {
    id: "isinteger",
    titulo: "Number.isInteger()",
    simulador: "numero",
    definicion: [
      "Es un **método estático** del objeto global `Number` que determina si un valor es un **número entero válido**.",
      "Devuelve `true` si el valor es de tipo `number` y no tiene parte decimal; devuelve `false` en cualquier otro caso.",
    ],
    queEs: [
      "Forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
      "Es un método **estático**: se llama como `Number.isInteger(valor)` y no como `valor.isInteger()`.",
      "**No realiza conversiones de tipo** (*no coerciona*): un string como `\"10\"` devuelve `false` aunque parezca un número.",
      "No existe una función global `isInteger()`; el método correcto es siempre `Number.isInteger()`.",
    ],
    paraQueSirve: [
      "Validar si un valor es un número entero.",
      "Comprobar entradas numéricas de formularios.",
      "Validar índices de arrays antes de acceder a una posición.",
      "Verificar cantidades que no aceptan decimales (vidas, puntos, stock...).",
      "Evitar errores en cálculos que esperan números enteros.",
    ],
    comoFunciona: [
      "Recibe un valor como argumento.",
      "Comprueba si su tipo de dato es `number`, **sin convertir** strings, booleanos ni `null`.",
      "Verifica que el número no contenga parte decimal (equivale a `valor % 1 === 0`).",
      "Devuelve `true` si es un entero y `false` si no lo es.",
    ],
    sintaxis: [
      {
        code: `const esEntero = Number.isInteger(valor);`,
      },
      {
        caption: "Funciona igual con cero y con números negativos:",
        code: `Number.isInteger(0);    // true
Number.isInteger(-20);  // true`,
      },
    ],
    nota: "**Parámetro:** `valor`, cualquier valor. **Retorno:** `true` si es un entero de tipo `number`, `false` en caso contrario.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Números enteros",
        code: `console.log(Number.isInteger(10));   // true
console.log(Number.isInteger(0));    // true
console.log(Number.isInteger(-20));  // true
console.log(Number.isInteger(10.0)); // true (10.0 === 10)`,
      },
      {
        titulo: "Ejemplo 2: Números con decimales",
        code: `console.log(Number.isInteger(10.5));  // false
console.log(Number.isInteger(3.14));  // false
console.log(Number.isInteger(-2.75)); // false`,
      },
      {
        titulo: "Ejemplo 3: Valores que no son números",
        code: `console.log(Number.isInteger("10"));      // false (es un string)
console.log(Number.isInteger(true));      // false
console.log(Number.isInteger(null));      // false
console.log(Number.isInteger(undefined)); // false
console.log(Number.isInteger(NaN));       // false
console.log(Number.isInteger(Infinity));  // false`,
      },
      {
        titulo: "Ejemplo 4: Validar una edad y un índice",
        descripcion:
          "Como no convierte, primero debes transformar el texto con `Number()` si viene de un formulario.",
        code: `const edad = 18;
if (Number.isInteger(edad)) {
  console.log("Edad válida");
}

function obtenerElemento(arr, index) {
  if (!Number.isInteger(index)) return "Índice inválido";
  return arr[index];
}

console.log(obtenerElemento(["a", "b", "c"], 1)); // "b"`,
      },
    ],
    errores: [
      {
        texto:
          "**Confundirlo con `Number.isSafeInteger()`:** `isInteger()` solo mira si es entero, **no** si está dentro del rango seguro.",
        code: `Number.isInteger(9007199254740992);     // true  (¡pero no es seguro!)
Number.isSafeInteger(9007199254740992); // false`,
      },
      {
        texto: "**Usar un `isInteger()` global que no existe:** el método vive dentro de `Number`.",
        code: `// ❌ ReferenceError: isInteger is not defined
isInteger(5);

// ✅ Correcto
Number.isInteger(5); // true`,
      },
      {
        texto:
          "**Pensar que convierte strings:** devuelve `false` sin intentar convertir. Si necesitas convertir, hazlo tú.",
        code: `Number.isInteger("50");         // false
Number.isInteger(Number("50")); // true`,
      },
      {
        texto:
          "**Confundir `10.0` con un decimal:** los ceros a la derecha no cambian el valor; `10.0` es exactamente `10`.",
        code: `Number.isInteger(10.0); // true
Number.isInteger(10.5); // false`,
      },
    ],
    casos: [
      "**Validación de formularios:** comprobar que la edad o la cantidad ingresada es un entero.",
      "**Control de cantidades:** stock, vidas, puntos y niveles que no admiten decimales.",
      {
        texto: "**Verificar índices antes de usarlos:**",
        code: `if (Number.isInteger(index)) {
  array[index];
}`,
      },
      "**Sistemas financieros** donde ciertos montos no aceptan decimales.",
      "**Algoritmos matemáticos** que solo trabajan con enteros.",
    ],
    relacion: [
      "**`Number.isSafeInteger()`:** además de entero, verifica que esté dentro del rango seguro.",
      "**`Number.isNaN()`:** comprueba si el valor es `NaN`.",
      "**`Number.isFinite()`:** comprueba si es un número finito.",
      "**`Number.parseInt()`:** convierte texto a entero, pero **no valida** ni evita perder precisión.",
      "**Tipos primitivos:** `Number.isInteger()` solo devuelve `true` para valores de tipo `number`.",
    ],
    analogia:
      "Imagina una máquina que revisa monedas: una moneda de 10 soles pasa ✅ (entero), una de 2.50 soles no pasa ❌ (tiene decimales) y un billete escrito como `\"10\"` tampoco pasa ❌ (es texto, no una moneda real). `Number.isInteger()` no transforma la moneda: solo revisa si cumple la condición de ser un número entero.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** primero debe ser de tipo `number`, luego no debe tener decimales. `Number.isInteger(\"10\")` es `false`; `Number.isInteger(Number(\"10\"))` es `true`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve Number.isInteger(10)?",
        ["true", "false", "10", "undefined"],
        0,
      ],
      [
        "¿Qué devuelve Number.isInteger(10.5)?",
        ["true", "false", "10", "NaN"],
        1,
      ],
      [
        '¿Qué devuelve Number.isInteger("10")?',
        ["true", "false", "10", "Un error"],
        1,
      ],
      [
        "¿Qué devuelve Number.isInteger(10.0)?",
        ["true, porque 10.0 === 10", "false, porque tiene un punto", "NaN", "Un error"],
        0,
      ],
      [
        "¿Number.isInteger() convierte strings a números?",
        ["Sí, siempre", "No, no coerciona", "Solo si son enteros", "Solo en modo estricto"],
        1,
      ],
      [
        "¿Qué devuelve Number.isInteger(NaN)?",
        ["true", "false", "NaN", "Un error"],
        1,
      ],
      [
        "¿Qué método verifica además que el entero sea seguro?",
        ["Number.isInteger()", "Number.isSafeInteger()", "Number.isFinite()", "parseInt()"],
        1,
      ],
      [
        "¿Cómo se llama correctamente?",
        ["isInteger(5)", "(5).isInteger()", "Number.isInteger(5)", "Number.isInteger = 5"],
        2,
      ],
    ]),
  },

  /* ===================== Number.isSafeInteger() ===================== */
  issafeinteger: {
    id: "issafeinteger",
    titulo: "Number.isSafeInteger()",
    simulador: "numero",
    definicion: [
      "Es un **método estático** de `Number` que determina si un valor es un **número entero seguro** (*safe integer*).",
      "Un entero seguro es aquel que puede representarse **exactamente** como un número de doble precisión (IEEE 754) y que está dentro del rango `-(2^53 - 1)` a `2^53 - 1`.",
    ],
    queEs: [
      "JavaScript usa el formato **IEEE 754 de doble precisión**, por lo que no todos los enteros pueden representarse con exactitud.",
      "Los enteros que sí se representan sin pérdida de precisión se llaman **safe integers** (enteros seguros).",
      "Rango seguro: de `-(2^53 - 1)` a `2^53 - 1`, es decir, de `-9007199254740991` a `9007199254740991`.",
      "Constantes relacionadas: `Number.MAX_SAFE_INTEGER` y `Number.MIN_SAFE_INTEGER`.",
      "Es un método **estático**, **no coerciona** y fue introducido en **ES6 (ECMAScript 2015)**.",
    ],
    paraQueSirve: [
      "Validar números grandes que deben representarse sin pérdida de precisión.",
      "Evitar errores de precisión causados por el punto flotante.",
      "Validar claves y números en criptografía y seguridad.",
      "Asegurar que montos y cálculos financieros son exactos.",
      "Validar IDs y claves numéricas que deben ser exactas.",
      "Comprobar que un número cabe en el rango seguro antes de guardarlo en una base de datos.",
    ],
    comoFunciona: [
      "Recibe un valor como argumento.",
      "Comprueba que su tipo sea `number` (sin conversiones).",
      "Comprueba que sea un **entero** (`Number.isInteger(valor)`).",
      "Comprueba que esté dentro del rango seguro (`Math.abs(valor) <= Number.MAX_SAFE_INTEGER`).",
      "Devuelve `true` solo si cumple las tres condiciones; en caso contrario devuelve `false`.",
    ],
    sintaxis: [
      {
        code: `const esSeguro = Number.isSafeInteger(valor);`,
      },
      {
        caption: "El rango seguro se puede consultar con las constantes:",
        code: `Number.MAX_SAFE_INTEGER; // 9007199254740991  (2^53 - 1)
Number.MIN_SAFE_INTEGER; // -9007199254740991`,
      },
    ],
    nota: "**Parámetro:** `valor`, cualquier valor. **Retorno:** `true` si es un entero dentro del rango seguro; `false` si no es número, no es entero o está fuera del rango.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Enteros seguros",
        code: `Number.isSafeInteger(42);                // true
Number.isSafeInteger(-7);                // true
Number.isSafeInteger(0);                 // true
Number.isSafeInteger(9007199254740991);  // true  (2^53 - 1)
Number.isSafeInteger(-9007199254740991); // true  (-(2^53 - 1))`,
      },
      {
        titulo: "Ejemplo 2: Enteros fuera del rango seguro",
        code: `Number.isSafeInteger(9007199254740992);  // false (2^53)
Number.isSafeInteger(9007199254740993);  // false (2^53 + 1)
Number.isSafeInteger(-9007199254740992); // false (-(2^53))
Number.isSafeInteger(Infinity);          // false
Number.isSafeInteger(NaN);               // false`,
      },
      {
        titulo: "Ejemplo 3: Valores que no son enteros",
        code: `Number.isSafeInteger(3.14);  // false (no es entero)
Number.isSafeInteger(42.0);  // true  (42.0 === 42)
Number.isSafeInteger(42.5);  // false
Number.isSafeInteger("42");  // false (es un string)
Number.isSafeInteger(true);  // false
Number.isSafeInteger(null);  // false`,
      },
      {
        titulo: "Ejemplo 4: Diferencia con Number.isInteger()",
        code: `// isInteger solo verifica que sea entero, no el rango
Number.isInteger(9007199254740992);     // true  (¡pero no es seguro!)
Number.isSafeInteger(9007199254740992); // false (fuera del rango)

Number.isSafeInteger(42);   // true
Number.isSafeInteger(42.5); // false`,
      },
      {
        titulo: "Ejemplo 5: El problema de la precisión",
        code: `console.log(9007199254740992 + 1); // 9007199254740992 (¡no cambia!)
console.log(9007199254740993);     // 9007199254740992 (¡pierde precisión!)

const a = 9007199254740992;
const b = a + 1;
console.log(a === b);                     // true (¡son iguales por la imprecisión!)
console.log(Number.isSafeInteger(a));     // false (no es seguro)`,
      },
      {
        titulo: "Ejemplo 6: Validar un ID",
        code: `function validarID(id) {
  if (!Number.isSafeInteger(id)) {
    return "ID inválido: debe ser un entero seguro";
  }
  if (id <= 0) {
    return "ID inválido: debe ser positivo";
  }
  return "ID válido";
}

validarID(12345);              // 'ID válido'
validarID(9007199254740992);   // 'ID inválido: debe ser un entero seguro'
validarID(3.14);               // 'ID inválido: debe ser un entero seguro'
validarID("12345");            // 'ID inválido: debe ser un entero seguro'`,
      },
    ],
    errores: [
      {
        texto:
          "**Confundirlo con `Number.isInteger()`:** `isInteger()` devuelve `true` para enteros que están fuera del rango seguro.",
        code: `Number.isInteger(9007199254740992);     // true
Number.isSafeInteger(9007199254740992); // false`,
      },
      {
        texto:
          "**Asumir que todos los enteros son seguros:** usar números grandes sin verificar provoca pérdida de precisión y bugs difíciles de detectar.",
        code: `console.log(9007199254740993); // 9007199254740992 (¡pierde precisión!)`,
      },
      {
        texto:
          "**No verificar el resultado de una operación:** aunque ambos operandos sean seguros, el resultado puede salir del rango.",
        code: `const resultado = 9007199254740991 + 1;
Number.isSafeInteger(resultado); // false`,
      },
      {
        texto:
          "**Usarlo con strings esperando conversión:** devuelve `false`; convierte antes con `Number()` o `parseInt()`.",
        code: `Number.isSafeInteger("42");         // false
Number.isSafeInteger(Number("42")); // true`,
      },
    ],
    casos: [
      "**Validación de IDs:** verificar que un identificador numérico es un entero seguro.",
      "**Finanzas:** validar montos, precios y transacciones exactas.",
      "**Criptografía:** validar claves y números en algoritmos criptográficos.",
      "**Bases de datos:** comprobar que los números caben en el rango seguro antes de almacenarlos.",
      "**APIs:** validar que los datos recibidos son enteros seguros.",
      "**Cálculos matemáticos y gráficos:** asegurar que los resultados son exactos antes de continuar.",
    ],
    relacion: [
      "**`Number.isInteger()`:** verifica que sea entero, pero **no** el rango seguro.",
      "**`Number.isFinite()`:** verifica que sea un número finito (no `Infinity` ni `NaN`).",
      "**`Number.isNaN()`:** verifica si el valor es `NaN`.",
      "**`Number.MAX_SAFE_INTEGER` / `Number.MIN_SAFE_INTEGER`:** límites del rango seguro.",
      "**`parseInt()`:** convierte un string a entero, pero puede perder precisión.",
      "**`BigInt`:** tipo de dato para enteros de precisión arbitraria, más allá del rango seguro.",
    ],
    analogia:
      "`Number.isSafeInteger()` es como un control de calidad en una fábrica de relojes: no basta con que el reloj sea un reloj (entero), también debe ser preciso (dentro del rango seguro). Un reloj que se atrasa o adelanta (fuera del rango) no es aceptable, aunque sea un reloj. `Number.isInteger()` solo verifica que sea un reloj; `Number.isSafeInteger()` verifica ambas cosas.",
    fuente: "MDN Web Docs | ECMAScript 2015 Specification | IEEE 754",
    notasPersonales: [
      "**Regla para memorizar:** entero **+** dentro de `±(2^53 - 1)` **=** entero seguro.",
      "**Cuidado con las operaciones:** aunque ambos operandos sean seguros, el resultado puede no serlo. Verifícalo siempre.",
      "Para números más grandes que el rango seguro, usa `BigInt`.",
    ],
    quiz: Q([
      [
        "¿Qué rango cubre un entero seguro en JavaScript?",
        [
          "De -(2^31) a 2^31 - 1",
          "De -(2^53 - 1) a 2^53 - 1",
          "De 0 a 2^53",
          "Cualquier entero, sin límite",
        ],
        1,
      ],
      [
        "¿Qué devuelve Number.isSafeInteger(9007199254740992)?",
        ["true", "false", "NaN", "Un error"],
        1,
      ],
      [
        "¿Qué devuelve Number.isInteger(9007199254740992)?",
        ["true, aunque no sea seguro", "false", "NaN", "Un error"],
        0,
      ],
      [
        "¿Qué devuelve Number.isSafeInteger(42.0)?",
        ["true, porque 42.0 === 42", "false, porque tiene un punto", "NaN", "Un error"],
        0,
      ],
      [
        '¿Qué devuelve Number.isSafeInteger("42")?',
        ["true", "false, no coerciona", "42", "Un error"],
        1,
      ],
      [
        "¿Cuánto vale Number.MAX_SAFE_INTEGER?",
        ["2^32 - 1", "2^53 - 1", "2^53", "Infinity"],
        1,
      ],
      [
        "¿Qué tipo usarías para enteros más grandes que el rango seguro?",
        ["String", "BigInt", "Float", "Symbol"],
        1,
      ],
      [
        "¿Qué devuelve Number.isSafeInteger(Infinity)?",
        ["true", "false", "Infinity", "Un error"],
        1,
      ],
    ]),
  },

  /* ======================= Number.isFinite() ======================= */
  isfinite: {
    id: "isfinite",
    titulo: "Number.isFinite()",
    simulador: "numero",
    definicion: [
      "Es un **método estático** de `Number` que determina si un valor es un **número finito**, es decir, un número que no es `Infinity`, `-Infinity` ni `NaN`.",
      "Devuelve `true` si el valor es un número finito y `false` en caso contrario.",
    ],
    queEs: [
      "Fue introducido en **ECMAScript 2015 (ES6)** y ofrece una forma más estricta y segura de verificar números finitos.",
      "A diferencia de la función global `isFinite()`, **no realiza conversión de tipo**: si el valor no es un número (por ejemplo, un string), devuelve `false` directamente.",
      "Es un método **estático**: se llama como `Number.isFinite(valor)`, no como `valor.isFinite()`.",
      "Características clave: no coerciona, devuelve un booleano y es más predecible que la versión global.",
    ],
    paraQueSirve: [
      "Validar números antes de operar con ellos.",
      "Evitar errores en cálculos matemáticos con `Infinity`, `-Infinity` o `NaN`.",
      "Validar datos de entrada provenientes de formularios o APIs.",
      "Asegurar que los resultados de operaciones matemáticas son finitos.",
      "Filtrar valores no finitos de un array o conjunto de datos.",
    ],
    comoFunciona: [
      "Recibe un valor de cualquier tipo.",
      "Comprueba que su tipo sea `number`, **sin convertir** strings, booleanos ni `null`.",
      "Comprueba que no sea `Infinity`, `-Infinity` ni `NaN`.",
      "Devuelve `true` si es un número finito y `false` en cualquier otro caso.",
    ],
    sintaxis: [
      {
        code: `const esFinito = Number.isFinite(valor);`,
      },
      {
        caption: "Compáralo con la función global, que sí convierte:",
        code: `isFinite("42");        // true  (convierte "42" a 42)
Number.isFinite("42"); // false (no convierte)`,
      },
    ],
    nota: "**Parámetro:** `valor`, cualquier valor. **Retorno:** `true` si es un número finito; `false` si no es un número, o si es `Infinity`, `-Infinity` o `NaN`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Valores finitos",
        code: `Number.isFinite(42);    // true
Number.isFinite(3.14);  // true
Number.isFinite(-7);    // true
Number.isFinite(0);     // true
Number.isFinite(-0);    // true`,
      },
      {
        titulo: "Ejemplo 2: Valores no finitos",
        code: `Number.isFinite(Infinity);  // false
Number.isFinite(-Infinity); // false
Number.isFinite(NaN);       // false`,
      },
      {
        titulo: "Ejemplo 3: Valores que no son números",
        code: `Number.isFinite("42");      // false (¡no convierte el string!)
Number.isFinite("Hola");    // false
Number.isFinite(true);      // false
Number.isFinite(null);      // false
Number.isFinite(undefined); // false
Number.isFinite([]);        // false
Number.isFinite({});        // false`,
      },
      {
        titulo: "Ejemplo 4: Diferencia con isFinite() global",
        code: `// isFinite() global convierte el valor a número
isFinite("42");  // true  (convierte "42" a 42)
isFinite("");    // true  (convierte "" a 0)
isFinite(null);  // true  (convierte null a 0)
isFinite(true);  // true  (convierte true a 1)

// Number.isFinite() NO convierte el valor
Number.isFinite("42"); // false
Number.isFinite("");   // false
Number.isFinite(null); // false
Number.isFinite(true); // false`,
      },
      {
        titulo: "Ejemplo 5: Validación de datos",
        code: `function calcularPromedio(numeros) {
  const validos = numeros.filter((n) => Number.isFinite(n));
  if (validos.length === 0) {
    return "No hay números válidos";
  }
  const suma = validos.reduce((acc, n) => acc + n, 0);
  return suma / validos.length;
}

calcularPromedio([10, 20, "30", NaN, 40, Infinity]);
// 23.33 (solo toma 10, 20 y 40)`,
      },
      {
        titulo: "Ejemplo 6: Cálculos seguros",
        code: `function dividir(a, b) {
  const resultado = a / b;
  if (!Number.isFinite(resultado)) {
    return "Error: resultado no finito";
  }
  return resultado;
}

dividir(10, 2); // 5
dividir(10, 0); // 'Error: resultado no finito' (Infinity)
dividir(0, 0);  // 'Error: resultado no finito' (NaN)`,
      },
    ],
    errores: [
      {
        texto:
          "**Confundir con `isFinite()` global:** la versión global convierte strings, `null` y booleanos, y por eso puede dar resultados inesperados.",
        code: `isFinite("42");        // true
Number.isFinite("42"); // false`,
      },
      {
        texto: "**Intentar instanciarlo con `new`:** no es un constructor.",
        code: `// ❌ TypeError: Number.isFinite is not a constructor
new Number.isFinite(42);

// ✅ Correcto
Number.isFinite(42); // true`,
      },
      {
        texto:
          "**Usarlo como método de instancia:** no existe en los números; es estático.",
        code: `// ❌ TypeError: (42).isFinite is not a function
(42).isFinite();

// ✅ Correcto
Number.isFinite(42); // true`,
      },
      {
        texto:
          "**Asumir que `Number.isFinite(undefined)` es `true`:** `undefined` no es un número, así que devuelve `false`.",
        code: `Number.isFinite(undefined); // false`,
      },
    ],
    casos: [
      "**Validación de formularios:** verificar que el usuario ingresó un número válido y finito.",
      "**APIs y datos externos:** validar que los datos recibidos son números finitos.",
      "**Cálculos matemáticos:** asegurar que el resultado es finito antes de continuar.",
      "**Filtrado de arrays:** eliminar valores no finitos de un conjunto de datos.",
      "**Gráficos y visualizaciones:** asegurar que los datos a graficar son finitos.",
      "**Finanzas:** validar montos, precios y tasas.",
    ],
    relacion: [
      "**`isFinite()` global:** convierte el valor a número antes de evaluar.",
      "**`Number.isNaN()`:** verifica si el valor es `NaN` (sin conversión).",
      "**`Number.isInteger()`:** verifica si es un número entero (sin conversión).",
      "**`Number.isSafeInteger()`:** verifica si es un entero seguro (sin conversión).",
      "**`Number.parseFloat()`:** convierte un string a número decimal.",
      "**`typeof`:** indica el tipo de dato (`\"number\"`, `\"string\"`, etc.).",
    ],
    analogia:
      "`Number.isFinite()` es como un portero de discoteca que solo deja entrar a personas con invitación válida. No importa si alguien dice *«soy un número»* (el string `\"42\"`) o *«tengo una invitación»* (el booleano `true`): el portero solo deja pasar a los que **realmente** son números finitos. La función global `isFinite()` es un portero más permisivo que intenta convertir a todos en invitados válidos, y puede colar impostores.",
    fuente: "MDN Web Docs | ECMAScript 2015 Specification",
    notasPersonales: [
      "Usa siempre `Number.isFinite()` en lugar de `isFinite()` cuando quieras verificar sin conversión de tipo.",
      "**Recuerda:** `Number.isFinite(NaN)` es `false`, porque `NaN` no es un número finito.",
      "Combínalo con `typeof` si primero necesitas confirmar que el valor es de tipo `'number'`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve Number.isFinite(42)?",
        ["true", "false", "42", "NaN"],
        0,
      ],
      [
        "¿Qué devuelve Number.isFinite(Infinity)?",
        ["true", "false", "Infinity", "Un error"],
        1,
      ],
      [
        "¿Qué devuelve Number.isFinite(NaN)?",
        ["true", "false", "NaN", "Un error"],
        1,
      ],
      [
        '¿Qué devuelve Number.isFinite("42")?',
        ["true, porque parece número", "false, porque no convierte", "42", "Un error"],
        1,
      ],
      [
        "¿Cuál es la diferencia con isFinite() global?",
        [
          "La global convierte el valor a número antes de evaluar",
          "Son idénticas",
          "Number.isFinite convierte y la global no",
          "La global solo acepta strings",
        ],
        0,
      ],
      [
        "¿Qué devuelve Number.isFinite(null)?",
        ["true", "false", "0", "null"],
        1,
      ],
      [
        "¿Qué devuelve isFinite(null) (función global)?",
        ["true, porque null se convierte en 0", "false", "null", "Un error"],
        0,
      ],
      [
        "¿Cómo se llama correctamente?",
        ["(42).isFinite()", "Number.isFinite(42)", "isFinite.Number(42)", "Number(42).isFinite()"],
        1,
      ],
    ]),
  },

  /* ========================= Number.isNaN() ========================= */
  isnan: {
    id: "isnan",
    titulo: "Number.isNaN()",
    simulador: "numero",
    definicion: [
      "Es un **método estático** de `Number` que verifica si un valor es **exactamente `NaN`** (*Not-a-Number*), sin realizar conversiones de tipo.",
      "A diferencia de la función global `isNaN()`, no convierte el valor antes de comprobarlo.",
    ],
    queEs: [
      "Devuelve un valor booleano: `true` si el valor es `NaN` y `false` en cualquier otro caso.",
      "Es una forma más segura y precisa que la función global `isNaN()`.",
      "**`NaN` es el único valor de JavaScript que no es igual a sí mismo**: `NaN === NaN` devuelve `false`.",
      "Es un método estático: se llama como `Number.isNaN(valor)`.",
    ],
    paraQueSirve: [
      "Validar resultados de operaciones matemáticas.",
      "Comprobar conversiones hechas con `Number.parseInt()` o `Number.parseFloat()`.",
      "Evitar errores cuando se espera un número.",
      "Validar datos introducidos por el usuario.",
    ],
    comoFunciona: [
      "Recibe cualquier valor.",
      "Comprueba si ese valor es **exactamente** `NaN`, sin conversiones automáticas.",
      "Devuelve `true` si es `NaN` y `false` en cualquier otro caso.",
    ],
    sintaxis: [
      {
        code: `const esNaN = Number.isNaN(valor);`,
      },
      {
        caption: "Compáralo con la función global, que sí convierte:",
        code: `isNaN("Hola");        // true  (intenta convertir "Hola")
Number.isNaN("Hola"); // false (no es NaN, es un string)`,
      },
    ],
    nota: "**Parámetro:** `valor`, cualquier valor. **Retorno:** `true` solo si el valor es exactamente `NaN`; `false` en cualquier otro caso.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Valor NaN",
        code: `console.log(Number.isNaN(NaN)); // true`,
      },
      {
        titulo: "Ejemplo 2: Resultado de parseInt()",
        code: `const numero = Number.parseInt("Hola");
console.log(numero);              // NaN
console.log(Number.isNaN(numero)); // true`,
      },
      {
        titulo: "Ejemplo 3: Número válido",
        code: `console.log(Number.isNaN(100)); // false`,
      },
      {
        titulo: "Ejemplo 4: Cadena de texto",
        code: `console.log(Number.isNaN("100")); // false
// Aunque "100" parece un número, sigue siendo un string`,
      },
      {
        titulo: "Ejemplo 5: Operación inválida",
        code: `const resultado = Math.sqrt(-1);
console.log(resultado);            // NaN
console.log(Number.isNaN(resultado)); // true`,
      },
      {
        titulo: "Ejemplo 6: Validar una conversión",
        code: `const texto = "19.99 USD";
const precio = Number.parseFloat(texto);

if (Number.isNaN(precio)) {
  console.log("El precio no es válido");
} else {
  console.log("Precio:", precio); // Precio: 19.99
}`,
      },
    ],
    errores: [
      {
        texto:
          "**Confundir `Number.isNaN()` con `isNaN()` global:** la global primero intenta convertir el valor a número.",
        code: `isNaN("Hola");        // true  (convierte "Hola" → NaN)
Number.isNaN("Hola"); // false ("Hola" no es NaN, es un string)`,
      },
      {
        texto:
          "**Comparar con `NaN` usando `===`:** siempre devuelve `false`, incluso `NaN === NaN`.",
        code: `console.log(NaN === NaN);   // false
console.log(Number.isNaN(NaN)); // true`,
      },
      {
        texto:
          "**Pensar que cualquier texto devuelve `true`:** un string nunca es `NaN`; es un string.",
        code: `Number.isNaN("JavaScript"); // false`,
      },
      {
        texto:
          "**Usarlo para validar strings numéricos:** `Number.isNaN(\"100\")` es `false` porque no es `NaN`, pero tampoco es un número. Convierte primero.",
        code: `Number.isNaN(Number("100")); // false (100 es número válido)
Number.isNaN(Number("Hola")); // true`,
      },
    ],
    casos: [
      "**Validar conversiones con `Number.parseInt()` y `Number.parseFloat()`:** ambos devuelven `NaN` si fallan.",
      "**Verificar operaciones matemáticas:** por ejemplo `Math.sqrt(-1)` o `0 / 0`.",
      "**Comprobar datos antes de calcular:** evitar propagar `NaN` por todo el programa.",
      "**Formularios y aplicaciones:** mostrar un error cuando el dato no se pudo convertir.",
    ],
    relacion: [
      "**`NaN`:** valor especial que representa un resultado numérico inválido.",
      "**`isNaN()` global:** convierte el valor antes de comprobarlo.",
      "**`Number.parseInt()` / `Number.parseFloat()`:** pueden devolver `NaN` si la conversión falla.",
      "**`Number()`:** puede producir `NaN` al convertir cadenas no numéricas.",
      "**`Number.isFinite()`:** `NaN` no es finito, así que devuelve `false`.",
    ],
    analogia:
      "Imagina que un profesor revisa exámenes. Ana obtuvo 18, Luis obtuvo 0 y Pedro entregó una hoja completamente ilegible. `Number.isNaN()` pregunta: *¿este resultado es realmente una nota inválida?* Para 18 y 0 responde `false`; para la hoja ilegible (`NaN`) responde `true`. No pregunta si «parece un número», sino si el resultado es exactamente `NaN`.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "`Number.isNaN()` solo devuelve `true` cuando el valor es exactamente `NaN`.",
      "**Nunca uses `valor === NaN`:** usa `Number.isNaN(valor)`.",
      "Es más seguro y preciso que la función global `isNaN()`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve Number.isNaN(NaN)?",
        ["true", "false", "NaN", "Un error"],
        0,
      ],
      [
        "¿Qué devuelve Number.isNaN(100)?",
        ["true", "false", "100", "NaN"],
        1,
      ],
      [
        '¿Qué devuelve Number.isNaN("100")?',
        ["true", "false, porque es un string", "100", "Un error"],
        1,
      ],
      [
        '¿Qué devuelve isNaN("Hola") (función global)?',
        ["true, porque intenta convertir", "false", "NaN", "Un error"],
        0,
      ],
      [
        '¿Qué devuelve Number.isNaN("Hola")?',
        ["true", "false, porque no es NaN", "NaN", "Un error"],
        1,
      ],
      [
        "¿Qué devuelve NaN === NaN?",
        ["true", "false", "NaN", "Un error"],
        1,
      ],
      [
        "¿Qué devuelve Number.isNaN(Math.sqrt(-1))?",
        ["true", "false", "-1", "Un error"],
        0,
      ],
      [
        "¿Cuál es la forma correcta de comprobar si un valor es NaN?",
        ["valor === NaN", "valor !== valor está mal usado", "Number.isNaN(valor)", "typeof valor === 'NaN'"],
        2,
      ],
    ]),
  },

  /* ======================= Number.parseInt() ======================= */
  parseint: {
    id: "parseint",
    titulo: "Number.parseInt()",
    simulador: "numero",
    definicion: [
      "Es un **método estático** del objeto global `Number` que convierte una cadena de texto en un **número entero**, leyendo los caracteres numéricos desde el inicio de la cadena hasta encontrar uno que no sea válido para la base especificada.",
      "`Number.parseInt()` y `parseInt()` realizan la misma función; `Number.parseInt()` simplemente está agrupado dentro del objeto `Number`.",
    ],
    queEs: [
      "Se utiliza para convertir texto en números enteros.",
      "**Ignora la parte decimal** de una cadena (no redondea).",
      "Puede trabajar con diferentes sistemas numéricos (decimal, hexadecimal, binario, etc.) mediante el parámetro `radix`.",
      "Devuelve un valor de tipo `number` o `NaN` si no puede realizar la conversión.",
    ],
    paraQueSirve: [
      "Convertir datos ingresados por el usuario.",
      "Obtener números enteros desde formularios.",
      "Procesar valores provenientes de archivos o APIs.",
      "Extraer números de cadenas de texto como `\"100px\"` o `\"50%\"`.",
      "Convertir números escritos en diferentes bases (binario, hexadecimal, octal...).",
    ],
    comoFunciona: [
      "Recibe una cadena de texto y, opcionalmente, la base numérica (`radix`).",
      "Comienza a leer desde el primer carácter (ignora espacios iniciales y acepta un signo `+` o `-`).",
      "Convierte los caracteres válidos según la base indicada.",
      "Se detiene en cuanto encuentra un carácter que no es válido para esa base.",
      "Devuelve el número entero formado hasta ese punto, o `NaN` si no leyó ningún dígito.",
    ],
    sintaxis: [
      {
        code: `Number.parseInt(cadena);`,
      },
      {
        caption: "Versión completa (recomendada, indicando siempre la base):",
        code: `Number.parseInt(cadena, radix);`,
      },
    ],
    nota: "**Parámetros:** `cadena` (texto a convertir) y `radix` (base numérica de 2 a 36; es recomendable especificarla siempre). **Retorno:** un `number` entero o `NaN`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Convertir un número",
        code: `console.log(Number.parseInt("150")); // 150`,
      },
      {
        titulo: "Ejemplo 2: Ignorar texto al final",
        code: `console.log(Number.parseInt("25años")); // 25`,
      },
      {
        titulo: "Ejemplo 3: Número decimal",
        code: `console.log(Number.parseInt("18.95")); // 18
// La parte decimal se descarta: NO redondea`,
      },
      {
        titulo: "Ejemplo 4: Usando otra base",
        code: `console.log(Number.parseInt("1010", 2)); // 10
// 1010 en binario equivale a 10 en decimal`,
      },
      {
        titulo: "Ejemplo 5: Hexadecimal",
        code: `console.log(Number.parseInt("FF", 16)); // 255`,
      },
      {
        titulo: "Ejemplo 6: Comparación con Number()",
        code: `Number.parseInt("25px"); // 25
Number("25px");           // NaN (exige que toda la cadena sea válida)`,
      },
    ],
    errores: [
      {
        texto:
          "**No especificar el `radix`:** aunque hoy normalmente se interpreta como decimal, es buena práctica indicar la base.",
        code: `Number.parseInt("10");     // 10 (funciona, pero es ambiguo)
Number.parseInt("10", 10); // 10 (explícito y recomendado)`,
      },
      {
        texto:
          "**Pensar que redondea:** `parseInt()` deja de leer al encontrar el punto decimal, así que **trunca**.",
        code: `Number.parseInt("9.99"); // 9
Math.round(9.99);        // 10`,
      },
      {
        texto:
          "**La cadena no comienza con un número:** en ese caso devuelve `NaN`.",
        code: `Number.parseInt("Hola123"); // NaN
Number.parseInt("123Hola"); // 123`,
      },
      {
        texto:
          "**Confundir `parseInt()` con `Number()`:** `Number()` exige que **toda** la cadena represente un número válido.",
        code: `Number.parseInt("25px"); // 25
Number("25px");           // NaN`,
      },
    ],
    casos: [
      "Convertir edades ingresadas como texto.",
      "Procesar datos de formularios HTML.",
      "Leer valores numéricos desde archivos.",
      'Extraer números de cadenas como `"100px"` o `"50%"`.',
      "Convertir números en distintas bases (binario, hexadecimal, octal...).",
    ],
    relacion: [
      "**`parseInt()` global:** función equivalente a `Number.parseInt()`.",
      "**`Number.parseFloat()`:** convierte cadenas en números decimales.",
      "**`Number()`:** convierte toda la cadena en un número y falla si contiene caracteres no válidos.",
      "**`NaN`:** valor devuelto cuando la conversión no es posible.",
      "**`Number.isNaN()`:** permite verificar si el resultado es `NaN`.",
    ],
    analogia:
      "Imagina que lees una placa con el texto `\"250kg\"`. Un trabajador solo necesita saber el peso: lee ✅ `2`, ✅ `5`, ✅ `0` y, al encontrar la `k`, ❌ deja de leer. El resultado es `250`. Eso hace `Number.parseInt()`: lee números desde el inicio y se detiene cuando aparece un carácter que ya no forma parte del número.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** lee desde el inicio, se detiene en el primer carácter inválido y **nunca redondea**.",
      "Indica siempre el `radix` (por ejemplo, `10` para decimal) para evitar ambigüedades.",
      "Es equivalente a `parseInt()`, pero pertenece al objeto `Number`.",
    ],
    quiz: Q([
      [
        '¿Qué devuelve Number.parseInt("150")?',
        ["150", '"150"', "NaN", "1"],
        0,
      ],
      [
        '¿Qué devuelve Number.parseInt("25años")?',
        ["NaN", "25", "250", '"25"'],
        1,
      ],
      [
        '¿Qué devuelve Number.parseInt("18.95")?',
        ["19", "18.95", "18", "NaN"],
        2,
      ],
      [
        '¿Qué devuelve Number.parseInt("1010", 2)?',
        ["1010", "10", "20", "NaN"],
        1,
      ],
      [
        '¿Qué devuelve Number.parseInt("FF", 16)?',
        ["255", "FF", "15", "NaN"],
        0,
      ],
      [
        '¿Qué devuelve Number.parseInt("Hola123")?',
        ["123", "0", "NaN", "Un error"],
        2,
      ],
      [
        "¿parseInt() redondea los decimales?",
        ["Sí, al más cercano", "No, los descarta (trunca)", "Solo si son .5", "Lanza un error"],
        1,
      ],
      [
        '¿Qué diferencia hay entre Number.parseInt("25px") y Number("25px")?',
        [
          "parseInt devuelve 25 y Number devuelve NaN",
          "Ambos devuelven 25",
          "Ambos devuelven NaN",
          "parseInt devuelve NaN y Number devuelve 25",
        ],
        0,
      ],
    ]),
  },

  /* ====================== Number.parseFloat() ====================== */
  parsefloat: {
    id: "parsefloat",
    titulo: "Number.parseFloat()",
    simulador: "numero",
    definicion: [
      "Es un **método estático** del objeto global `Number` que convierte una cadena de texto en un **número decimal** (de punto flotante), leyendo los caracteres numéricos desde el inicio de la cadena hasta encontrar uno que no sea válido.",
      "`Number.parseFloat()` y `parseFloat()` realizan la misma función; `Number.parseFloat()` simplemente está organizado dentro del objeto `Number`.",
    ],
    queEs: [
      "Se utiliza para convertir texto en números decimales.",
      "Puede interpretar números con parte entera y parte decimal.",
      "Admite **notación científica** (`1.5e2`) y espacios iniciales.",
      "Devuelve un valor de tipo `number` o `NaN` si la conversión no es posible.",
      "Usa el **punto** (`.`) como separador decimal, no la coma.",
    ],
    paraQueSirve: [
      "Convertir datos ingresados por el usuario.",
      "Leer precios, pesos, temperaturas o cualquier valor decimal.",
      "Procesar datos provenientes de formularios, archivos o APIs.",
      "Extraer números decimales de cadenas de texto.",
    ],
    comoFunciona: [
      "Recibe una cadena de texto.",
      "Comienza a leer desde el primer carácter (ignora los espacios iniciales).",
      "Convierte los caracteres válidos en un número decimal (signo, dígitos, punto y exponente).",
      "Se detiene cuando encuentra un carácter que no forma parte del número.",
      "Devuelve el número decimal o `NaN` si no leyó ningún dígito.",
    ],
    sintaxis: [
      {
        code: `Number.parseFloat(cadena);`,
      },
      {
        caption: "Ejemplo de lectura parcial:",
        code: `Number.parseFloat("19.99USD"); // 19.99`,
      },
    ],
    nota: "**Parámetro:** `cadena`, el texto que se convertirá en número decimal. **Retorno:** un `number` si la conversión es válida; `NaN` si la cadena no comienza con un número.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Convertir un número decimal",
        code: `console.log(Number.parseFloat("15.75")); // 15.75`,
      },
      {
        titulo: "Ejemplo 2: Ignorar texto al final",
        code: `console.log(Number.parseFloat("99.99 dólares")); // 99.99`,
      },
      {
        titulo: "Ejemplo 3: Convertir un número entero",
        code: `console.log(Number.parseFloat("100")); // 100
// Aunque no tenga decimales, devuelve un valor de tipo number`,
      },
      {
        titulo: "Ejemplo 4: Notación científica",
        code: `console.log(Number.parseFloat("2.5e3")); // 2500
// 2.5e3 significa 2.5 × 10³`,
      },
      {
        titulo: "Ejemplo 5: Espacios al inicio",
        code: `console.log(Number.parseFloat("   45.8")); // 45.8
// Los espacios iniciales son ignorados`,
      },
      {
        titulo: "Ejemplo 6: Comparación con Number()",
        code: `Number.parseFloat("15.5kg"); // 15.5
Number("15.5kg");            // NaN (exige una cadena completa válida)`,
      },
    ],
    errores: [
      {
        texto:
          "**Pensar que convierte cualquier texto:** la cadena debe **comenzar** con un número.",
        code: `Number.parseFloat("Hola25"); // NaN
Number.parseFloat("25Hola"); // 25`,
      },
      {
        texto:
          "**Usar coma en lugar de punto:** JavaScript usa el punto como separador decimal, así que la coma corta la lectura.",
        code: `Number.parseFloat("10,5"); // 10
Number.parseFloat("10.5"); // 10.5`,
      },
      {
        texto:
          "**Confundir `parseFloat()` con `Number()`:** `Number()` requiere que toda la cadena represente un número válido.",
        code: `Number.parseFloat("15.5kg"); // 15.5
Number("15.5kg");            // NaN`,
      },
      {
        texto:
          "**Esperar un entero:** `parseFloat()` conserva los decimales. Para enteros usa `Number.parseInt()`.",
        code: `Number.parseFloat("8.9");  // 8.9
Number.parseInt("8.9");    // 8`,
      },
    ],
    casos: [
      'Leer precios como `"29.99"`.',
      'Procesar porcentajes como `"15.5%"`.',
      'Leer temperaturas como `"36.7°C"`.',
      "Convertir datos de formularios.",
      "Procesar respuestas de APIs que contienen números decimales.",
    ],
    relacion: [
      "**`parseFloat()` global:** función equivalente a `Number.parseFloat()`.",
      "**`Number.parseInt()`:** convierte cadenas en números enteros.",
      "**`Number()`:** convierte toda la cadena en un número y falla si contiene caracteres no válidos.",
      "**`NaN`:** valor devuelto cuando la conversión no es posible.",
      "**`Number.isNaN()`:** permite comprobar si el resultado es `NaN`.",
      "**Notación científica:** `Number.parseFloat()` puede interpretar valores como `1.2e5`.",
    ],
    analogia:
      "Imagina que lees una etiqueta con el texto `\"24.75 kg\"`. Una báscula solo necesita conocer el peso, así que lee ✅ `2`, ✅ `4`, ✅ `.`, ✅ `7`, ✅ `5` y, al encontrar un espacio o la letra `k`, ❌ deja de leer. El resultado es `24.75`. Eso hace `Number.parseFloat()`: lee un número decimal desde el inicio y se detiene cuando encuentra un carácter que ya no forma parte del número.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "`Number.parseFloat()` convierte texto en números decimales y devuelve `number` o `NaN`.",
      "Lee desde el inicio y se detiene al encontrar un carácter no válido.",
      "Usa el punto (`.`) como separador decimal, **no** la coma.",
      "Es equivalente a `parseFloat()`, pero pertenece al objeto `Number`.",
    ],
    quiz: Q([
      [
        '¿Qué devuelve Number.parseFloat("15.75")?',
        ["15.75", '"15.75"', "15", "NaN"],
        0,
      ],
      [
        '¿Qué devuelve Number.parseFloat("99.99 dólares")?',
        ["NaN", "99.99", "99", "Un error"],
        1,
      ],
      [
        '¿Qué devuelve Number.parseFloat("2.5e3")?',
        ["2.5", "2500", "2.53", "NaN"],
        1,
      ],
      [
        '¿Qué devuelve Number.parseFloat("Hola25")?',
        ["25", "0", "NaN", "Un error"],
        2,
      ],
      [
        '¿Qué devuelve Number.parseFloat("10,5")?',
        ["10.5", "10", "NaN", "Un error"],
        1,
      ],
      [
        '¿Qué devuelve Number.parseFloat("   45.8")?',
        ["NaN", "45.8", '"45.8"', "Un error"],
        1,
      ],
      [
        '¿Qué diferencia hay entre parseFloat("15.5kg") y Number("15.5kg")?',
        [
          "parseFloat devuelve 15.5 y Number devuelve NaN",
          "Ambos devuelven 15.5",
          "Ambos devuelven NaN",
          "parseFloat devuelve NaN y Number devuelve 15.5",
        ],
        0,
      ],
      [
        "¿Qué método usarías para obtener un entero de \"8.9\"?",
        ["Number.parseFloat()", "Number.parseInt()", "Number()", "String()"],
        1,
      ],
    ]),
  },

  /* ==================== Number.prototype.toFixed() ==================== */
  tofixed: {
    id: "tofixed",
    titulo: "Number.prototype.toFixed()",
    simulador: "numero",
    definicion: [
      "Es un **método de `Number.prototype`** que convierte un número en una **cadena de texto** (`string`) con una cantidad fija de decimales.",
      "Utiliza **redondeo** para ajustar el número a la cantidad de decimales indicada.",
    ],
    queEs: [
      "Es un método heredado de `Number.prototype`: se llama sobre una instancia numérica.",
      "Forma parte del lenguaje JavaScript (ECMAScript), **no de una Web API**.",
      "Se utiliza principalmente para **formatear números**.",
      "Aunque el resultado *parezca* un número, es un **string**: `(19.9).toFixed(2)` devuelve `\"19.90\"`.",
    ],
    paraQueSirve: [
      "Mostrar precios con dos decimales.",
      "Formatear resultados matemáticos.",
      "Crear reportes numéricos.",
      "Mostrar porcentajes o medidas con precisión fija.",
      "Mejorar la presentación de datos.",
    ],
    comoFunciona: [
      "Se llama `toFixed()` sobre un número.",
      "Se indica cuántos decimales se desean mostrar (de `0` a `100`).",
      "JavaScript redondea el número a esa cantidad de decimales.",
      "Devuelve una **cadena** con esa cantidad exacta de decimales (rellena con ceros si hace falta).",
    ],
    sintaxis: [
      {
        code: `numero.toFixed(digitos);`,
      },
      {
        caption: "Recuerda que el resultado es texto, no un número:",
        code: `const texto = (5.678).toFixed(2);
console.log(texto);        // "5.68"
console.log(typeof texto); // "string"`,
      },
    ],
    nota: "**Parámetro:** `digitos`, cantidad de decimales entre `0` y `100`. **Retorno:** un `string` con esa cantidad exacta de decimales.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Mostrar dos decimales",
        code: `const precio = 25;
console.log(precio.toFixed(2)); // "25.00"`,
      },
      {
        titulo: "Ejemplo 2: Redondear decimales",
        code: `const numero = 3.14159;
console.log(numero.toFixed(3)); // "3.142"`,
      },
      {
        titulo: "Ejemplo 3: Sin decimales",
        code: `const numero = 9.99;
console.log(numero.toFixed(0)); // "10"`,
      },
      {
        titulo: "Ejemplo 4: El resultado es un string",
        code: `const resultado = (12.5).toFixed(2);
console.log(resultado);        // "12.50"
console.log(typeof resultado); // "string"`,
      },
      {
        titulo: "Ejemplo 5: Volver a convertirlo en número",
        code: `const numero = Number((12.5).toFixed(2));
console.log(numero);        // 12.5
console.log(typeof numero); // "number"`,
      },
      {
        titulo: "Ejemplo 6: Caso práctico con precios",
        code: "const precio = 19.995;\nconsole.log(`Total: S/${precio.toFixed(2)}`);\n// Total: S/20.00",
      },
      {
        titulo: "Ejemplo 7: Porcentajes",
        code: `const porcentaje = 0.87654;
console.log((porcentaje * 100).toFixed(2) + "%"); // "87.65%"`,
      },
    ],
    errores: [
      {
        texto:
          "**Pensar que devuelve un número:** devuelve un string. Si lo sumas, JavaScript concatena.",
        code: `const resultado = (10.5).toFixed(2); // "10.50"
console.log(resultado + 5);          // "10.505"

// ✅ Convierte antes de operar:
console.log(Number(resultado) + 5);  // 15.5`,
      },
      {
        texto: "**Usarlo sobre un string:** los strings no tienen `toFixed()`.",
        code: `const precio = "20.5";

// ❌ TypeError: precio.toFixed is not a function
precio.toFixed(2);

// ✅ Convierte primero
Number(precio).toFixed(2); // "20.50"`,
      },
      {
        texto:
          "**Pensar que cambia el número original:** `toFixed()` devuelve una cadena nueva y no modifica el valor.",
        code: `let numero = 12.345;
numero.toFixed(2);
console.log(numero); // 12.345`,
      },
      {
        texto:
          "**Usar demasiados decimales:** el parámetro debe estar entre `0` y `100`; fuera de ese rango lanza `RangeError`.",
        code: `(10).toFixed(200); // ❌ RangeError
(10).toFixed(100); // ✅ (valor límite)`,
      },
    ],
    casos: [
      "💰 **Sistemas financieros y precios:** mostrar siempre dos decimales.",
      "📊 **Reportes estadísticos:** presentar promedios y resultados con precisión fija.",
      "📈 **Mostrar porcentajes:** `(valor * 100).toFixed(2) + \"%\"`.",
      "🧮 **Resultados de cálculos matemáticos:** evitar cadenas largas de decimales.",
      "🌡️ **Mediciones con precisión fija:** temperaturas, distancias, etc.",
    ],
    relacion: [
      "**`Number.prototype.toString()`:** convierte números a texto, pero no controla los decimales.",
      "**`Intl.NumberFormat`:** formateo avanzado de números según idioma y moneda.",
      "**`Number.parseFloat()`:** convierte strings a números (operación inversa).",
      "**`Number()`:** conversión explícita de tipos.",
      "**Punto flotante IEEE 754:** JavaScript puede presentar pequeñas imprecisiones en operaciones decimales.",
    ],
    analogia:
      "Imagina que tienes `S/ 25.5` y un cajero necesita mostrar siempre dos decimales: `S/ 25.50`. `toFixed(2)` es como decir: *«muestra siempre dos espacios después del punto decimal»*. Así, `5` → `5.00`, `5.6` → `5.60` y `5.678` → `5.68`.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** `toFixed(n)` = *texto con exactamente `n` decimales*. No cambia el número y no devuelve un número.",
      "Si necesitas operar después, envuelve el resultado con `Number()`.",
      "Para dinero en producción, valora `Intl.NumberFormat` (maneja moneda, separadores e idioma).",
    ],
    quiz: Q([
      [
        "¿Qué devuelve (25).toFixed(2)?",
        ['"25.00"', "25", "25.00 (número)", '"25"'],
        0,
      ],
      [
        "¿Qué tipo devuelve toFixed()?",
        ["number", "string", "boolean", "object"],
        1,
      ],
      [
        "¿Qué devuelve (3.14159).toFixed(3)?",
        ['"3.141"', '"3.142"', "3.142", '"3.14"'],
        1,
      ],
      [
        "¿Qué devuelve (9.99).toFixed(0)?",
        ['"9"', '"10"', "10", '"9.99"'],
        1,
      ],
      [
        "¿toFixed() modifica el número original?",
        ["Sí", "No, devuelve un string nuevo", "Solo si es decimal", "Solo en modo estricto"],
        1,
      ],
      [
        '¿Qué ocurre con "20.5".toFixed(2)?',
        ["Devuelve \"20.50\"", "TypeError", "Devuelve 20.5", "RangeError"],
        1,
      ],
      [
        "¿Qué rango válido tiene el parámetro digitos?",
        ["0 a 20", "0 a 100", "1 a 50", "Cualquier entero"],
        1,
      ],
      [
        "¿Cómo vuelves a convertir el resultado de toFixed() en número?",
        ["String(resultado)", "Number(resultado)", "resultado * 1.0 sin conversión", "JSON.parse(resultado)"],
        1,
      ],
    ]),
  },
};
