export const JS_INTL = {
  id: "intl",
  label: "Intl",
  icon: "🌍",
  titulo: "Internacionalización con Intl",
  descripcion:
    "Formatea números, monedas, fechas y textos según el idioma y la región del usuario con la API nativa de internacionalización.",
  grupos: [
    {
      seccion: "Números y monedas",
      metodos: [
        {
          id: "intl-numberformat",
          nombre: "Intl.NumberFormat",
          firma: "new Intl.NumberFormat(locale, opciones)",
          icon: "🔢",
        },
        {
          id: "intl-currency",
          nombre: "Intl.NumberFormat (moneda)",
          firma: 'new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" })',
          icon: "💶",
        },
        {
          id: "intl-percent",
          nombre: "Intl.NumberFormat (porcentaje)",
          firma: 'new Intl.NumberFormat(locale, { style: "percent" })',
          icon: "📊",
        },
        {
          id: "intl-pluralrules",
          nombre: "Intl.PluralRules",
          firma: "new Intl.PluralRules(locale, opciones)",
          icon: "🔀",
        },
      ],
    },
    {
      seccion: "Fechas y tiempo",
      metodos: [
        {
          id: "intl-datetimeformat",
          nombre: "Intl.DateTimeFormat",
          firma: "new Intl.DateTimeFormat(locale, opciones)",
          icon: "📅",
        },
        {
          id: "intl-relativetimeformat",
          nombre: "Intl.RelativeTimeFormat",
          firma: "new Intl.RelativeTimeFormat(locale, opciones)",
          icon: "⏳",
        },
      ],
    },
    {
      seccion: "Texto y ordenación",
      metodos: [
        {
          id: "intl-listformat",
          nombre: "Intl.ListFormat",
          firma: "new Intl.ListFormat(locale, opciones)",
          icon: "📋",
        },
        {
          id: "intl-collator",
          nombre: "Intl.Collator",
          firma: "new Intl.Collator(locale, opciones)",
          icon: "🔤",
        },
      ],
    },
  ],
};

export const JS_INTL_DOCS = {
  "intl-numberformat": {
    id: "intl-numberformat",
    titulo: "Intl.NumberFormat",
    icon: "🔢",
    categoria: "Intl",
    firma: "new Intl.NumberFormat(locale, opciones)",

    definicion: [
      "`Intl.NumberFormat` es un constructor de la API de internacionalización que crea un **formateador reutilizable** para presentar números según las convenciones de un idioma y una región. 🔢",
      "No transforma el valor numérico: devuelve una **cadena de texto** con los separadores, los decimales y la agrupación propios de esa localización.",
    ],

    queEs: [
      "Es un objeto nativo de ECMAScript disponible en navegadores y en Node.js moderno, sin librerías externas. 🌍",
      "Cada instancia guarda su configuración, así que lo habitual es crearla una vez y reutilizarla muchas veces.",
    ],

    paraQueSirve: [
      "🔢 Mostrar cifras grandes con el separador correcto: `1.234.567` en español y `1,234,567` en inglés.",
      "🌐 Adaptar la interfaz al idioma del usuario sin escribir lógica de formato a mano.",
      "💰 Servir de base para los formatos de moneda y de porcentaje, que son variantes del mismo formateador.",
      "📊 Limitar los decimales en informes, precios o medidas para que el resultado sea legible.",
    ],

    comoFunciona: [
      "Se invoca con `new` y recibe un locale o un array de locales, además de un objeto de opciones.",
      "El motor consulta los datos de internacionalización incluidos en el entorno (CLDR) y elige separadores, símbolos y orden de los dígitos.",
      "El método `format()` recibe un número y devuelve la cadena ya formateada.",
      "Las opciones `minimumFractionDigits`, `maximumFractionDigits` o `useGrouping` controlan el resultado.",
      "Si el locale no es válido lanza `RangeError`; si se omite, se usa el locale del entorno.",
    ],

    sintaxis: [
      {
        code: `const formato = new Intl.NumberFormat("es-ES");
console.log(formato.format(1234567.89));
// 1.234.567,89`,
      },
      {
        caption: "Con opciones de decimales y agrupación:",
        code: `const formato = new Intl.NumberFormat("es-ES", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
  useGrouping: true,
});
console.log(formato.format(9876.5));
// 9.876,50`,
      },
      {
        caption: "Reutilizar el formateador con varios valores:",
        code: `const formato = new Intl.NumberFormat("en-US");
const precios = [12.5, 1500, 98765.432];
const texto = precios.map((precio) => formato.format(precio));
console.log(texto);
// ["12.5", "1,500", "98,765.432"]`,
      },
    ],

    nota: "💡 `format()` devuelve siempre un `string`. Si necesitas seguir calculando, conserva el número original y formatea únicamente en el momento de mostrarlo.",

    ejemplos: [
      {
        titulo: "1. 🔢 Formato español e inglés",
        code: `const es = new Intl.NumberFormat("es-ES");
const en = new Intl.NumberFormat("en-US");
console.log(es.format(1234567.89)); // 1.234.567,89
console.log(en.format(1234567.89)); // 1,234,567.89`,
      },
      {
        titulo: "2. 🎯 Limitar decimales",
        code: `const formato = new Intl.NumberFormat("es-ES", {
  maximumFractionDigits: 1,
});
console.log(formato.format(3.14159)); // 3,1
console.log(formato.format(2.999)); // 3`,
      },
      {
        titulo: "3. 🧮 Notación compacta",
        code: `const compacto = new Intl.NumberFormat("es-ES", {
  notation: "compact",
  maximumFractionDigits: 1,
});
console.log(compacto.format(1500)); // 1,5 mil
console.log(compacto.format(2300000)); // 2,3 M`,
      },
      {
        titulo: "4. 📏 Unidades de medida",
        code: `const formato = new Intl.NumberFormat("es-ES", {
  style: "unit",
  unit: "kilometer",
  unitDisplay: "long",
});
console.log(formato.format(12)); // 12 kilómetros`,
      },
    ],

    errores: [
      "**Olvidar `new`:** `Intl.NumberFormat(\"es-ES\")` sin `new` lanza `TypeError`; es un constructor.",
      "**Pasar una cadena a `format()`:** `formato.format(\"1234,5\")` no interpreta la coma española. Convierte antes con `Number()`.",
      "**Crear el formateador dentro de un bucle:** construir una instancia por iteración es lento; créala una vez fuera.",
      "**Esperar un número de vuelta:** `format()` devuelve texto; para operar necesitas el valor numérico original.",
      "**Confundir locale con país:** `\"es\"` aplica convenciones genéricas; `\"es-ES\"` fija región y evita ambigüedades.",
    ],

    casos: [
      "🛒 Mostrar precios y totales de un carrito adaptados al país del usuario.",
      "📈 Presentar estadísticas y contadores con separadores de miles legibles.",
      "📱 Formatear números en aplicaciones multiidioma sin duplicar código.",
      "🧾 Redondear importes a un número fijo de decimales en facturas.",
    ],

    relacion: [
      "**`Intl.NumberFormat` con `style: \"currency\"`:** añade el símbolo y las reglas de la moneda.",
      "**`Intl.NumberFormat` con `style: \"percent\"`:** multiplica por cien y añade el signo de porcentaje.",
      "**`Number.prototype.toFixed()`:** redondea, pero no adapta separadores ni idioma.",
      "**`Intl.PluralRules`:** decide si el texto que acompaña al número va en singular o plural.",
      "**`toLocaleString()`:** atajo de este formateador; útil para casos sueltos, menos para reutilizar configuración.",
    ],

    analogia:
      "Imagina que un número es un viajero que lleva el mismo pasaporte a todas partes, pero cambia de ropa según el país. 🧳 El valor `1234567.89` es siempre el mismo; `Intl.NumberFormat` es el sastre que lo viste de `1.234.567,89` en España y de `1,234,567.89` en Estados Unidos. La ropa cambia, el viajero no.",

    fuente: "MDN Web Docs · ECMAScript Internationalization API",

    notasPersonales: [
      "✅ El locale por defecto es el del entorno; conviene pasarlo explícitamente.",
      "✅ `format()` siempre devuelve un `string`.",
      "✅ Reutiliza la instancia: crearla es más costoso que llamar a `format()`.",
      "💡 Regla: el número se guarda sin formato y se formatea solo al pintarlo.",
      "🧪 Comprueba el resultado con `es-ES` y `en-US` para detectar suposiciones.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve el método format() de Intl.NumberFormat?",
        opciones: [
          "Un número con separadores",
          "Una cadena de texto formateada",
          "Un objeto con partes",
          "Un booleano",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué ocurre si llamas a Intl.NumberFormat sin new?",
        opciones: [
          "Funciona igual",
          "Devuelve una cadena",
          "Lanza un TypeError",
          "Devuelve undefined",
        ],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿Cómo se muestra 1234567.89 en es-ES?",
        opciones: [
          "1,234,567.89",
          "1.234.567,89",
          "1234567,89",
          "1 234 567.89",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué opción limita los decimales mostrados?",
        opciones: [
          "maximumFractionDigits",
          "maxDecimals",
          "decimalLimit",
          "precision",
        ],
        correcta: 0,
      },
      {
        id: 5,
        pregunta: "¿Cuál es la forma recomendada de usar el formateador en un bucle?",
        opciones: [
          "Crear una instancia en cada iteración",
          "Crear la instancia una vez y reutilizarla",
          "Usar eval en cada paso",
          "Convertir todo a texto antes",
        ],
        correcta: 1,
      },
    ],
  },

  "intl-currency": {
    id: "intl-currency",
    titulo: "Intl.NumberFormat (moneda)",
    icon: "💶",
    categoria: "Intl",
    firma: 'new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" })',

    definicion: [
      "Es la variante de `Intl.NumberFormat` que presenta un número como **importe monetario**, añadiendo el símbolo o el código de la moneda y respetando sus decimales habituales. 💶",
      "Se activa con la opción `style: \"currency\"` y el código ISO de la divisa en `currency`, por ejemplo `\"EUR\"`, `\"USD\"` o `\"JPY\"`.",
    ],

    queEs: [
      "Un formateador regional especializado: combina las reglas numéricas con las convenciones monetarias del locale. 🌍",
      "No convierte entre divisas ni consulta tipos de cambio; solo da formato al número que recibe.",
    ],

    paraQueSirve: [
      "🛒 Mostrar precios en la tienda con el símbolo y la posición correctos.",
      "🧾 Presentar facturas, totales e impuestos con dos decimales.",
      "🌐 Enseñar la misma cantidad en euros y en dólares según el idioma del usuario.",
      "💱 Indicar el código ISO cuando el símbolo puede ser ambiguo, como `USD` frente a `$`.",
    ],

    comoFunciona: [
      "Recibe un locale y un objeto de opciones con `style: \"currency\"`.",
      "El campo `currency` es obligatorio y debe ser un código ISO 4217 válido de tres letras.",
      "El motor elige el símbolo, su posición, el separador decimal y el número de decimales propios de la divisa.",
      "`currencyDisplay` permite mostrar el símbolo, el código, el nombre completo o un nombre estrecho.",
      "Si el código no es válido lanza `RangeError`; si se omite `currency`, también.",
    ],

    sintaxis: [
      {
        code: `const euros = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});
console.log(euros.format(1234.5));
// 1.234,50 €`,
      },
      {
        caption: "Mostrar el código ISO en lugar del símbolo:",
        code: `const dolares = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "code",
});
console.log(dolares.format(99.9));
// USD 99.90`,
      },
      {
        caption: "Formato contable para negativos:",
        code: `const contable = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
  currencySign: "accounting",
});
console.log(contable.format(-45.2));
// (45,20 €)`,
      },
    ],

    nota: "💡 La moneda no se deduce del locale: `es-ES` no implica euros. Debes indicar `currency` de forma explícita y con un código ISO válido.",

    ejemplos: [
      {
        titulo: "1. 💶 Euros y dólares",
        code: `const euros = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});
const dolares = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
console.log(euros.format(49.99)); // 49,99 €
console.log(dolares.format(49.99)); // $49.99`,
      },
      {
        titulo: "2. 🧾 Total de una compra",
        code: `const precios = [12.5, 7.25, 30];
const total = precios.reduce((suma, precio) => suma + precio, 0);
const formato = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});
console.log(formato.format(total)); // 49,75 €`,
      },
      {
        titulo: "3. 🇯🇵 Monedas sin decimales",
        code: `const yenes = new Intl.NumberFormat("ja-JP", {
  style: "currency",
  currency: "JPY",
});
console.log(yenes.format(1500)); // ￥1,500`,
      },
      {
        titulo: "4. 🔤 Con el nombre completo",
        code: `const formato = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "USD",
  currencyDisplay: "name",
});
console.log(formato.format(20)); // 20 dólares estadounidenses`,
      },
    ],

    errores: [
      "**Omitir `currency`:** con `style: \"currency\"` el código es obligatorio; si falta, lanza `RangeError`.",
      "**Usar un código inventado:** `\"EURO\"` o `\"E\"` no son ISO 4217; el resultado es un `RangeError`.",
      "**Suponer que el locale fija la moneda:** `es-ES` puede mostrar dólares si así se indica.",
      "**Concatenar el símbolo a mano:** `\"€\" + cantidad` ignora la posición y el espaciado de cada idioma.",
      "**Esperar una conversión:** el formateador no cambia el valor; 100 euros seguirán siendo 100 aunque se muestren como dólares.",
    ],

    casos: [
      "🛍️ Catálogos con precios localizados por país.",
      "🧾 Facturas y recibos con importes negativos en formato contable.",
      "📊 Paneles de ventas que comparan importes en varias divisas.",
      "💳 Pasarelas de pago que muestran el importe exacto antes de confirmar.",
    ],

    relacion: [
      "**`Intl.NumberFormat`:** es el mismo constructor; la moneda solo activa una opción de estilo.",
      "**`currencyDisplay`:** controla si se ve el símbolo, el código o el nombre de la divisa.",
      "**`currencySign: \"accounting\"`:** muestra los negativos entre paréntesis.",
      "**`Intl.NumberFormat` con porcentajes:** comparte opciones como los decimales y la agrupación.",
      "**APIs de tipos de cambio:** se encargan de la conversión, que `Intl` no realiza.",
    ],

    analogia:
      "Piensa en una etiqueta de precio que se imprime para cada país. 🏷️ El importe es el mismo número, pero la etiqueta cambia de idioma, coloca el símbolo delante o detrás y decide cuántos decimales enseñar. `Intl.NumberFormat` con `style: \"currency\"` es la imprenta que fabrica esa etiqueta; el tipo de cambio sería otro departamento que aquí no existe.",

    fuente: "MDN Web Docs · ECMAScript Internationalization API · ISO 4217",

    notasPersonales: [
      "✅ `currency` es obligatorio cuando `style` vale `\"currency\"`.",
      "✅ Usa códigos ISO de tres letras, nunca nombres ni símbolos.",
      "✅ Los decimales dependen de la divisa: el yen no usa fracciones.",
      "💡 Regla: formatea el importe al mostrarlo, no antes de calcular.",
      "🧪 Prueba `currencyDisplay: \"code\"` si el símbolo puede confundirse.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué opción activa el formato de moneda?",
        opciones: [
          'style: "money"',
          'style: "currency"',
          'format: "coin"',
          'type: "currency"',
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué valor debe tener currency?",
        opciones: [
          "El símbolo, como €",
          "El nombre del país",
          "Un código ISO 4217, como EUR",
          "Un número de dos cifras",
        ],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿Intl.NumberFormat convierte euros a dólares?",
        opciones: [
          "Sí, automáticamente",
          "Solo si se usa currencyDisplay",
          "No, únicamente cambia el formato",
          "Sí, si el locale es en-US",
        ],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Qué muestra currencySign: \"accounting\" en un importe negativo?",
        opciones: [
          "El importe entre paréntesis",
          "El importe en rojo",
          "Un signo menos doble",
          "Nada, lo oculta",
        ],
        correcta: 0,
      },
      {
        id: 5,
        pregunta: "¿Por qué el yen japonés suele mostrarse sin decimales?",
        opciones: [
          "Porque el locale ja-JP lo prohíbe",
          "Porque la divisa no usa fracciones habitualmente",
          "Porque Intl redondea siempre a cero",
          "Porque falta la opción maximumFractionDigits",
        ],
        correcta: 1,
      },
    ],
  },

  "intl-percent": {
    id: "intl-percent",
    titulo: "Intl.NumberFormat (porcentaje)",
    icon: "📊",
    categoria: "Intl",
    firma: 'new Intl.NumberFormat(locale, { style: "percent" })',

    definicion: [
      "Es la variante de `Intl.NumberFormat` que presenta un número como **porcentaje**, multiplicándolo por cien y añadiendo el signo propio del locale. 📊",
      "Se activa con `style: \"percent\"`; el valor de entrada debe ser la **proporción decimal**, no el porcentaje ya multiplicado.",
    ],

    queEs: [
      "Un formateador regional que aplica las reglas de porcentaje de un idioma: símbolo, espacio y número de decimales. 🌍",
      "Comparte con `Intl.NumberFormat` todas las opciones de redondeo y agrupación.",
    ],

    paraQueSirve: [
      "📈 Mostrar tasas de conversión, descuentos o intereses con el formato local.",
      "🧮 Presentar proporciones calculadas como `0.25` en lugar de multiplicar a mano por cien.",
      "🌐 Evitar diferencias de espaciado entre `25 %` en español y `25%` en inglés.",
      "📊 Limitar los decimales de un porcentaje para que la interfaz quede limpia.",
    ],

    comoFunciona: [
      "Recibe un locale y un objeto de opciones con `style: \"percent\"`.",
      "Al llamar a `format()`, el motor multiplica el valor por cien.",
      "Después aplica las reglas del locale: posición del símbolo, espacio y decimales.",
      "`maximumFractionDigits` y `minimumFractionDigits` controlan la precisión mostrada.",
      "La opción `signDisplay` permite forzar el signo positivo o mostrar solo los negativos.",
    ],

    sintaxis: [
      {
        code: `const formato = new Intl.NumberFormat("es-ES", {
  style: "percent",
});
console.log(formato.format(0.25));
// 25 %`,
      },
      {
        caption: "Con un decimal y sin agrupación:",
        code: `const formato = new Intl.NumberFormat("es-ES", {
  style: "percent",
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});
console.log(formato.format(0.1234));
// 12,3 %`,
      },
      {
        caption: "Forzar el signo en variaciones:",
        code: `const formato = new Intl.NumberFormat("en-US", {
  style: "percent",
  signDisplay: "exceptZero",
  maximumFractionDigits: 1,
});
console.log(formato.format(0.04)); // +4%
console.log(formato.format(-0.02)); // -2%`,
      },
    ],

    nota: "💡 El valor se multiplica por cien de forma automática: pasa `0.25` para obtener `25 %`. Si pasas `25`, el resultado será `2.500 %`.",

    ejemplos: [
      {
        titulo: "1. 📊 Proporción simple",
        code: `const formato = new Intl.NumberFormat("es-ES", {
  style: "percent",
});
console.log(formato.format(0.5)); // 50 %
console.log(formato.format(1)); // 100 %
console.log(formato.format(0.075)); // 7,5 %`,
      },
      {
        titulo: "2. 🛒 Descuento calculado",
        code: `const precio = 80;
const descuento = 0.15;
const formato = new Intl.NumberFormat("es-ES", {
  style: "percent",
});
console.log("Descuento:", formato.format(descuento)); // 15 %
console.log("Precio final:", precio * (1 - descuento)); // 68`,
      },
      {
        titulo: "3. 📈 Variación con signo",
        code: `const formato = new Intl.NumberFormat("es-ES", {
  style: "percent",
  signDisplay: "always",
  maximumFractionDigits: 1,
});
console.log(formato.format(0.032)); // +3,2 %
console.log(formato.format(-0.018)); // -1,8 %`,
      },
      {
        titulo: "4. 🌐 Comparar locales",
        code: `const valor = 0.256;
console.log(new Intl.NumberFormat("es-ES", { style: "percent" }).format(valor));
// 26 %
console.log(new Intl.NumberFormat("en-US", { style: "percent" }).format(valor));
// 26%`,
      },
    ],

    errores: [
      "**Pasar el porcentaje ya multiplicado:** `formato.format(25)` produce `2.500 %`; hay que pasar `0.25`.",
      "**Olvidar `style: \"percent\"`:** sin esa opción solo se formatea el número y no aparece el signo.",
      "**Redondear antes de formatear:** `0.256` con dos decimales puede sorprender; deja que el formateador decida.",
      "**Suponer que el espacio es universal:** en español suele haber un espacio fino antes del `%`; en inglés no.",
      "**Usar el resultado para calcular:** `format()` devuelve texto; conserva la proporción numérica.",
    ],

    casos: [
      "📈 Paneles con tasas de conversión y crecimiento.",
      "🛒 Etiquetas de descuento en tiendas online.",
      "🏦 Intereses y comisiones presentados al cliente.",
      "📊 Resultados de encuestas con porcentajes redondeados.",
    ],

    relacion: [
      "**`Intl.NumberFormat`:** mismo constructor; `style` cambia el tipo de presentación.",
      "**`Intl.NumberFormat` con moneda:** comparte decimales, agrupación y locale.",
      "**Cálculo de proporciones:** divide la parte entre el total antes de formatear.",
      "**`toFixed()`:** añade decimales pero no el símbolo ni las reglas locales.",
      "**`Intl.PluralRules`:** ayuda a concordar textos como «1 % de descuento».",
    ],

    analogia:
      "Un porcentaje es como una nota de clase expresada sobre cien. 📝 El dato interno es `0.25`, pero el boletín lo publica como `25 %`. `Intl.NumberFormat` con `style: \"percent\"` es el profesor que convierte la fracción en la nota visible y además la escribe con el formato del país.",

    fuente: "MDN Web Docs · ECMAScript Internationalization API",

    notasPersonales: [
      "✅ La entrada es una proporción: `0.25` equivale a `25 %`.",
      "✅ `format()` multiplica por cien automáticamente.",
      "✅ Usa `maximumFractionDigits` para controlar los decimales.",
      "💡 Regla: calcula en decimales y formatea al final.",
      "🧪 Revisa el espaciado entre `es-ES` y `en-US`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué valor hay que pasar para mostrar 25 %?",
        opciones: ["25", "0.25", "2.5", "250"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué opción activa el formato de porcentaje?",
        opciones: [
          'style: "percent"',
          'style: "percentage"',
          'type: "percent"',
          'format: "%"',
        ],
        correcta: 0,
      },
      {
        id: 3,
        pregunta: "¿Qué devuelve format() en un porcentaje?",
        opciones: [
          "Un número decimal",
          "Una cadena con el signo y el número",
          "Un objeto Ratio",
          "Un booleano",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué opción muestra siempre el signo + o -?",
        opciones: [
          "signDisplay: \"always\"",
          "showSign: true",
          "signed: true",
          "positiveSign: true",
        ],
        correcta: 0,
      },
      {
        id: 5,
        pregunta: "¿Qué ocurre si pasas 0.5 al formateador?",
        opciones: [
          "Muestra 0,5 %",
          "Muestra 5 %",
          "Muestra 50 %",
          "Lanza un RangeError",
        ],
        correcta: 2,
      },
    ],
  },

  "intl-datetimeformat": {
    id: "intl-datetimeformat",
    titulo: "Intl.DateTimeFormat",
    icon: "📅",
    categoria: "Intl",
    firma: "new Intl.DateTimeFormat(locale, opciones)",

    definicion: [
      "`Intl.DateTimeFormat` crea un formateador que convierte un objeto `Date` en una **cadena de fecha y hora** adaptada al idioma y la región. 📅",
      "Permite elegir qué partes mostrar (día, mes, año, hora) y con qué estilo, sin construir el texto manualmente.",
    ],

    queEs: [
      "Es el constructor de `Intl` dedicado a fechas y horas, con soporte de zonas horarias y calendarios. 🌍",
      "Se apoya en los datos de internacionalización del entorno para traducir meses, días y formatos.",
    ],

    paraQueSirve: [
      "📅 Mostrar fechas legibles como `lunes, 3 de noviembre de 2026`.",
      "🌐 Adaptar el orden día/mes/año al país del usuario y evitar ambigüedades.",
      "⏰ Presentar horas con o sin segundos y en la zona horaria correcta.",
      "🗓️ Generar etiquetas de calendario, historiales y recibos con un formato consistente.",
    ],

    comoFunciona: [
      "Recibe un locale y un objeto de opciones con las partes que quieres mostrar.",
      "El método `format()` acepta un `Date`, una marca de tiempo numérica o una cadena de fecha válida.",
      "El motor consulta los nombres de meses y días del locale y ordena los componentes según su convención.",
      "Las opciones `dateStyle` y `timeStyle` ofrecen atajos como `\"full\"`, `\"long\"`, `\"medium\"` o `\"short\"`.",
      "`timeZone` fija la zona horaria; si se omite, se usa la del entorno. Una fecha inválida lanza `RangeError`.",
    ],

    sintaxis: [
      {
        code: `const formato = new Intl.DateTimeFormat("es-ES");
console.log(formato.format(new Date(2026, 10, 3)));
// 3/11/2026`,
      },
      {
        caption: "Fecha completa con estilo largo:",
        code: `const formato = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "full",
});
console.log(formato.format(new Date(2026, 10, 3)));
// martes, 3 de noviembre de 2026`,
      },
      {
        caption: "Fecha y hora con zona horaria:",
        code: `const formato = new Intl.DateTimeFormat("es-ES", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "America/Mexico_City",
});
console.log(formato.format(new Date()));
// 3 nov 2026, 10:45`,
      },
    ],

    nota: "💡 Los meses de `new Date(año, mes, día)` empiezan en cero: el mes `10` es noviembre. Con cadenas ISO como `\"2026-11-03\"` no hay ese desfase.",

    ejemplos: [
      {
        titulo: "1. 📅 Fecha corta en dos idiomas",
        code: `const fecha = new Date(2026, 10, 3);
console.log(new Intl.DateTimeFormat("es-ES").format(fecha));
// 3/11/2026
console.log(new Intl.DateTimeFormat("en-US").format(fecha));
// 11/3/2026`,
      },
      {
        titulo: "2. 🗓️ Solo el mes y el año",
        code: `const formato = new Intl.DateTimeFormat("es-ES", {
  month: "long",
  year: "numeric",
});
console.log(formato.format(new Date(2026, 10, 3)));
// noviembre de 2026`,
      },
      {
        titulo: "3. ⏰ Hora con segundos",
        code: `const formato = new Intl.DateTimeFormat("es-ES", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});
console.log(formato.format(new Date(2026, 10, 3, 14, 5, 9)));
// 14:05:09`,
      },
      {
        titulo: "4. 🧩 Descomponer con formatToParts()",
        code: `const formato = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
});
const partes = formato.formatToParts(new Date(2026, 10, 3));
console.log(partes.map((parte) => parte.type + ": " + parte.value));
// ["day: 3", "literal: de ", "month: noviembre"]`,
      },
    ],

    errores: [
      "**Pasar un `Date` inválido:** `formato.format(new Date(\"no es fecha\"))` lanza `RangeError`.",
      "**Olvidar el desfase de meses:** `new Date(2026, 10, 3)` es noviembre, no octubre.",
      "**Mezclar `dateStyle` con opciones sueltas:** algunas combinaciones lanzan `TypeError`.",
      "**Ignorar la zona horaria:** la misma marca de tiempo puede mostrar días distintos según el país.",
      "**Construir fechas concatenando textos:** usa `Date` y deja que el formateador traduzca.",
    ],

    casos: [
      "🧾 Recibos y facturas con fecha y hora local.",
      "🗓️ Calendarios y agendas multiidioma.",
      "📰 Fechas de publicación en blogs y noticias.",
      "⏱️ Historiales de actividad con marcas temporales legibles.",
    ],

    relacion: [
      "**`Date`:** es el tipo de entrada que consume el formateador.",
      "**`Intl.RelativeTimeFormat`:** expresa distancias como «hace 3 días» en lugar de una fecha exacta.",
      "**`toLocaleDateString()`:** atajo de este formateador para casos puntuales.",
      "**`timeZone`:** permite mostrar la misma marca de tiempo en otra región.",
      "**`formatToParts()`:** devuelve las piezas por separado para maquetarlas a medida.",
    ],

    analogia:
      "Una fecha es como un billete de avión con la misma hora universal, pero cada país lo imprime con su propio orden y su idioma. ✈️ `Intl.DateTimeFormat` es el mostrador que traduce ese instante al formato local: primero el día en España, primero el mes en Estados Unidos, y siempre con los nombres de los meses en el idioma elegido.",

    fuente: "MDN Web Docs · ECMAScript Internationalization API · IANA Time Zone Database",

    notasPersonales: [
      "✅ Acepta `Date`, números y cadenas de fecha válidas.",
      "✅ `dateStyle` y `timeStyle` simplifican las combinaciones más comunes.",
      "✅ Especifica `timeZone` cuando la hora deba ser la de otra región.",
      "💡 Regla: guarda instantes en UTC y formatea en la zona del usuario.",
      "🧪 Recuerda que el mes de `Date` empieza en cero.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué tipo de valor devuelve format()?",
        opciones: ["Un Date", "Una cadena de texto", "Un número", "Un array"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué mes representa new Date(2026, 10, 3)?",
        opciones: ["Octubre", "Noviembre", "Diciembre", "Enero"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué opción muestra una fecha completa como «martes, 3 de noviembre de 2026»?",
        opciones: [
          'dateStyle: "full"',
          'format: "complete"',
          'style: "long"',
          'month: "all"',
        ],
        correcta: 0,
      },
      {
        id: 4,
        pregunta: "¿Qué ocurre al formatear una fecha inválida?",
        opciones: [
          "Devuelve null",
          "Devuelve una cadena vacía",
          "Lanza RangeError",
          "Usa la fecha actual",
        ],
        correcta: 2,
      },
      {
        id: 5,
        pregunta: "¿Para qué sirve formatToParts()?",
        opciones: [
          "Para obtener cada componente por separado",
          "Para convertir a UTC",
          "Para comparar dos fechas",
          "Para sumar días",
        ],
        correcta: 0,
      },
    ],
  },

  "intl-relativetimeformat": {
    id: "intl-relativetimeformat",
    titulo: "Intl.RelativeTimeFormat",
    icon: "⏳",
    categoria: "Intl",
    firma: "new Intl.RelativeTimeFormat(locale, opciones)",

    definicion: [
      "`Intl.RelativeTimeFormat` convierte una diferencia de tiempo en una frase relativa como **«hace 3 días»** o **«dentro de 2 horas»**, adaptada al idioma. ⏳",
      "Se le pasa una cantidad y una unidad; el signo indica si el momento es pasado (negativo) o futuro (positivo).",
    ],

    queEs: [
      "Es el constructor de `Intl` especializado en expresiones de tiempo relativo. 🌍",
      "No calcula la diferencia entre fechas: solo redacta el texto a partir del número y la unidad que recibe.",
    ],

    paraQueSirve: [
      "⏳ Mostrar «hace 5 minutos» en lugar de una marca temporal exacta.",
      "🔔 Indicar vencimientos y recordatorios como «dentro de 2 días».",
      "🌐 Traducir automáticamente esas frases al idioma del usuario.",
      "📱 Dar contexto rápido en feeds, chats y notificaciones.",
    ],

    comoFunciona: [
      "Recibe un locale y opciones como `numeric` o `style`.",
      "El método `format(valor, unidad)` recibe un número y una unidad: `\"second\"`, `\"minute\"`, `\"hour\"`, `\"day\"`, `\"week\"`, `\"month\"`, `\"quarter\"` o `\"year\"`.",
      "Un valor negativo indica pasado y uno positivo indica futuro.",
      "Con `numeric: \"auto\"` se usan palabras como «ayer» o «mañana» cuando existen.",
      "Con `numeric: \"always\"` siempre se muestra la cantidad: «hace 1 día».",
    ],

    sintaxis: [
      {
        code: `const formato = new Intl.RelativeTimeFormat("es-ES");
console.log(formato.format(-3, "day"));
// hace 3 días`,
      },
      {
        caption: "Con palabras naturales para valores cercanos:",
        code: `const formato = new Intl.RelativeTimeFormat("es-ES", {
  numeric: "auto",
});
console.log(formato.format(-1, "day")); // ayer
console.log(formato.format(1, "day")); // mañana`,
      },
      {
        caption: "Estilo corto y unidades distintas:",
        code: `const formato = new Intl.RelativeTimeFormat("en-US", {
  numeric: "auto",
  style: "short",
});
console.log(formato.format(-2, "hour")); // 2 hr. ago
console.log(formato.format(3, "week")); // in 3 wk.`,
      },
    ],

    nota: "💡 El formateador no conoce las fechas: tú calculas la diferencia y decides la unidad. Para pasar de milisegundos a días, divide y redondea antes de llamar a `format()`.",

    ejemplos: [
      {
        titulo: "1. ⏳ Pasado inmediato",
        code: `const formato = new Intl.RelativeTimeFormat("es-ES", {
  numeric: "auto",
});
console.log(formato.format(-5, "minute")); // hace 5 minutos
console.log(formato.format(-1, "hour")); // hace 1 hora`,
      },
      {
        titulo: "2. 🔔 Próximo vencimiento",
        code: `const formato = new Intl.RelativeTimeFormat("es-ES", {
  numeric: "auto",
});
console.log(formato.format(2, "day")); // pasado mañana
console.log(formato.format(1, "month")); // el próximo mes`,
      },
      {
        titulo: "3. 📅 Diferencia entre fechas",
        code: `const ahora = new Date();
const entrega = new Date(ahora.getTime() + 3 * 24 * 60 * 60 * 1000);
const dias = Math.round((entrega - ahora) / (24 * 60 * 60 * 1000));
const formato = new Intl.RelativeTimeFormat("es-ES", {
  numeric: "auto",
});
console.log(formato.format(dias, "day")); // dentro de 3 días`,
      },
      {
        titulo: "4. 🌐 Comparar idiomas",
        code: `const formatoEs = new Intl.RelativeTimeFormat("es-ES");
const formatoEn = new Intl.RelativeTimeFormat("en-US");
console.log(formatoEs.format(-2, "week")); // hace 2 semanas
console.log(formatoEn.format(-2, "week")); // 2 weeks ago`,
      },
    ],

    errores: [
      "**Pasar una fecha en vez de un número:** `format(new Date(), \"day\")` no funciona; primero calcula la diferencia.",
      "**Usar una unidad inventada:** `\"days\"` o `\"dia\"` lanzan `RangeError`; deben ser singulares en inglés.",
      "**Olvidar el signo:** `format(3, \"day\")` habla de futuro, no de pasado.",
      "**Esperar cálculo automático:** el formateador solo redacta; la aritmética es tuya.",
      "**Mezclar unidades sin convertir:** 90 minutos deben pasarse a horas si quieres «hace 2 horas».",
    ],

    casos: [
      "💬 Mensajes de chat con marcas como «hace 2 minutos».",
      "🔔 Recordatorios de tareas y vencimientos.",
      "📰 Feeds de noticias con la antigüedad de cada publicación.",
      "📦 Seguimiento de envíos con la llegada estimada.",
    ],

    relacion: [
      "**`Intl.DateTimeFormat`:** muestra la fecha exacta; este formateador muestra la distancia.",
      "**`Date`:** se usa para calcular la diferencia que luego se pasa como número.",
      "**`numeric: \"auto\"`:** activa palabras naturales como «ayer» y «mañana».",
      "**`style`:** permite versiones `\"long\"`, `\"short\"` y `\"narrow\"`.",
      "**`Intl.PluralRules`:** comparte la lógica de singular y plural que hay detrás.",
    ],

    analogia:
      "Es como el cartel de un aeropuerto que no dice la hora exacta de salida, sino «el vuelo sale dentro de 20 minutos». 🛫 El reloj interno conoce el instante, pero el cartel elige la unidad y la frase más útil para el pasajero. Tú calculas la diferencia; `Intl.RelativeTimeFormat` escribe el cartel en su idioma.",

    fuente: "MDN Web Docs · ECMAScript Internationalization API",

    notasPersonales: [
      "✅ Recibe un número y una unidad en inglés singular.",
      "✅ Negativo = pasado; positivo = futuro.",
      "✅ `numeric: \"auto\"` produce «ayer» o «mañana» cuando aplica.",
      "💡 Regla: calcula la diferencia y elige una unidad razonable.",
      "🧪 No esperes que convierta entre unidades por ti.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué significa un valor negativo en format()?",
        opciones: ["Futuro", "Pasado", "Error", "Sin cambio"],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué unidades acepta format()?",
        opciones: [
          "Cualquier texto libre",
          "Unidades en inglés singular como day o hour",
          "Solo milisegundos",
          "Números del 1 al 12",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué hace numeric: \"auto\"?",
        opciones: [
          "Usa palabras como ayer o mañana cuando existen",
          "Convierte a número",
          "Oculta la cantidad",
          "Fuerza el formato largo",
        ],
        correcta: 0,
      },
      {
        id: 4,
        pregunta: "¿Qué calcula Intl.RelativeTimeFormat por sí solo?",
        opciones: [
          "La diferencia entre dos fechas",
          "La zona horaria",
          "Nada: solo redacta el texto",
          "El cambio de hora",
        ],
        correcta: 2,
      },
      {
        id: 5,
        pregunta: "¿Cómo se dice «hace 2 semanas» con numeric auto en español?",
        opciones: [
          "hace 2 semanas",
          "2 semanas atrás",
          "la semana pasada",
          "dentro de 2 semanas",
        ],
        correcta: 0,
      },
    ],
  },

  "intl-listformat": {
    id: "intl-listformat",
    titulo: "Intl.ListFormat",
    icon: "📋",
    categoria: "Intl",
    firma: "new Intl.ListFormat(locale, opciones)",

    definicion: [
      "`Intl.ListFormat` une una lista de elementos en una **frase legible** con las conjunciones y los separadores propios de cada idioma. 📋",
      "En español produce «manzana, pera y plátano»; en inglés, «apple, pear, and banana».",
    ],

    queEs: [
      "Es el constructor de `Intl` que formatea enumeraciones de texto. 🌍",
      "No ordena ni filtra los elementos: respeta el orden del array y solo construye la cadena.",
    ],

    paraQueSirve: [
      "📋 Mostrar listas naturales en mensajes, resúmenes y descripciones.",
      "🌐 Evitar concatenar comas y «y» a mano, que cambia según el idioma.",
      "✅ Presentar etiquetas de permisos o categorías de forma compacta.",
      "🔀 Expresar alternativas con «o» mediante `type: \"disjunction\"`.",
    ],

    comoFunciona: [
      "Recibe un locale y opciones de estilo y tipo.",
      "El método `format()` acepta un array de cadenas y devuelve una sola cadena.",
      "`type: \"conjunction\"` usa «y»; `type: \"disjunction\"` usa «o»; `type: \"unit\"` usa comas sin conjunción.",
      "`style` controla la longitud: `\"long\"`, `\"short\"` o `\"narrow\"`.",
      "Con un array vacío devuelve una cadena vacía; con un solo elemento no añade conjunción.",
    ],

    sintaxis: [
      {
        code: `const formato = new Intl.ListFormat("es-ES");
console.log(formato.format(["manzana", "pera", "plátano"]));
// manzana, pera y plátano`,
      },
      {
        caption: "Alternativas con «o»:",
        code: `const formato = new Intl.ListFormat("es-ES", {
  type: "disjunction",
});
console.log(formato.format(["rojo", "verde", "azul"]));
// rojo, verde o azul`,
      },
      {
        caption: "Formato de unidades, sin conjunción:",
        code: `const formato = new Intl.ListFormat("es-ES", {
  style: "short",
  type: "unit",
});
console.log(formato.format(["3 kg", "2 cajas", "1 botella"]));
// 3 kg, 2 cajas, 1 botella`,
      },
    ],

    nota: "💡 Solo acepta cadenas. Si la lista contiene números u objetos, conviértelos antes con `map()` y `String()`.",

    ejemplos: [
      {
        titulo: "1. 📋 Lista con «y»",
        code: `const formato = new Intl.ListFormat("es-ES");
console.log(formato.format(emojis));
// 🍎, 🐉 y 🍌`,
      },
      {
        titulo: "2. 🔀 Lista con «o»",
        code: `const formato = new Intl.ListFormat("es-ES", {
  type: "disjunction",
});
console.log(formato.format(["sí", "no", "quizá"]));
// sí, no o quizá`,
      },
      {
        titulo: "3. 🌐 Dos idiomas, misma lista",
        code: `const elementos = ["Ana", "Luis", "Marta"];
console.log(new Intl.ListFormat("es-ES").format(elementos));
// Ana, Luis y Marta
console.log(new Intl.ListFormat("en-US").format(elementos));
// Ana, Luis, and Marta`,
      },
      {
        titulo: "4. 🏷️ Etiquetas de un objeto",
        code: `const permisos = { leer: true, escribir: false, borrar: true };
const activos = Object.keys(permisos).filter((clave) => permisos[clave]);
const formato = new Intl.ListFormat("es-ES");
console.log("Permisos:", formato.format(activos));
// Permisos: leer y borrar`,
      },
    ],

    errores: [
      "**Pasar elementos que no son cadenas:** convierte antes con `String()` o `map()`.",
      "**Creer que ordena:** `ListFormat` respeta el orden recibido; para ordenar usa `sort()` o `Intl.Collator`.",
      "**Esperar separadores en listas de un solo elemento:** no se añade ninguna conjunción.",
      "**Confundir `type` con `style`:** `type` elige «y» u «o»; `style` elige la longitud.",
      "**Usarlo para listas visuales:** si necesitas viñetas o HTML, genera la estructura por separado.",
    ],

    casos: [
      "📨 Resúmenes como «Han comentado Ana, Luis y Marta».",
      "🏷️ Mostrar permisos o etiquetas activas de un usuario.",
      "🛒 Enumerar productos de un pedido en un correo.",
      "🔀 Indicar opciones disponibles en un formulario.",
    ],

    relacion: [
      "**`Array.prototype.join()`:** une con un separador fijo, sin reglas de idioma.",
      "**`Intl.Collator`:** ordena los elementos antes de pasarlos al formateador.",
      "**`Intl.PluralRules`:** ayuda a concordar el texto que rodea la lista.",
      "**`map()`:** convierte números u objetos a cadenas antes de formatear.",
      "**`Intl.NumberFormat`:** formatea los valores numéricos que aparezcan en la lista.",
    ],

    analogia:
      "Imagina a una persona leyendo una lista en voz alta. 🗣️ No dice «manzana coma pera coma plátano»: dice «manzana, pera y plátano», y en otro idioma cambiará la conjunción y hasta la coma final. `Intl.ListFormat` es ese locutor que conoce las pausas y las palabras de enlace de cada lengua.",

    fuente: "MDN Web Docs · ECMAScript Internationalization API",

    notasPersonales: [
      "✅ Acepta solo arrays de cadenas.",
      "✅ `type` elige conjunción, disyunción o unidad.",
      "✅ `style` controla la longitud del formato.",
      "💡 Regla: úsalo para texto natural, no para listas con viñetas.",
      "🧪 Con un array vacío devuelve una cadena vacía.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué produce Intl.ListFormat en español por defecto?",
        opciones: [
          "Une con comas y «y»",
          "Une con comas y «o»",
          "Crea una lista HTML",
          "Ordena alfabéticamente",
        ],
        correcta: 0,
      },
      {
        id: 2,
        pregunta: "¿Qué tipo usa «o» como conjunción?",
        opciones: ["conjunction", "disjunction", "unit", "alternative"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué hace ListFormat con el orden del array?",
        opciones: [
          "Lo ordena alfabéticamente",
          "Lo invierte",
          "Lo respeta tal cual",
          "Lo ordena por longitud",
        ],
        correcta: 2,
      },
      {
        id: 4,
        pregunta: "¿Qué tipos de elementos acepta format()?",
        opciones: [
          "Números y objetos",
          "Cadenas de texto",
          "Solo emojis",
          "Cualquier valor sin conversión",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué devuelve al formatear un array vacío?",
        opciones: [
          "null",
          "Una cadena vacía",
          "Un RangeError",
          "«y»",
        ],
        correcta: 1,
      },
    ],
  },

  "intl-collator": {
    id: "intl-collator",
    titulo: "Intl.Collator",
    icon: "🔤",
    categoria: "Intl",
    firma: "new Intl.Collator(locale, opciones)",

    definicion: [
      "`Intl.Collator` crea un **comparador** que ordena cadenas según las reglas alfabéticas de un idioma, teniendo en cuenta acentos, mayúsculas y números. 🔤",
      "Su método `compare()` devuelve un número negativo, cero o positivo, igual que la función que espera `Array.prototype.sort()`.",
    ],

    queEs: [
      "Es el constructor de `Intl` dedicado a la comparación y ordenación lingüística. 🌍",
      "A diferencia de una comparación con `<`, entiende que en español la «ñ» va después de la «n» y que «á» equivale a «a» según la sensibilidad elegida.",
    ],

    paraQueSirve: [
      "🔤 Ordenar nombres, ciudades o productos con el alfabeto correcto.",
      "🌐 Clasificar listas de forma coherente en interfaces multiidioma.",
      "🔢 Ordenar cadenas con números de forma natural: «item 2» antes que «item 10».",
      "🔍 Comparar texto ignorando mayúsculas o acentos según el caso.",
    ],

    comoFunciona: [
      "Recibe un locale y opciones como `sensitivity`, `numeric` o `caseFirst`.",
      "El método `compare(a, b)` devuelve un valor negativo si `a` va antes, cero si son equivalentes y positivo si va después.",
      "La opción `sensitivity` controla qué diferencias importan: base, acento, caso o variante.",
      "Con `numeric: true` los tramos de dígitos se comparan por valor, no como texto.",
      "El comparador se puede pasar directamente a `sort()` y reutilizar en muchas ordenaciones.",
    ],

    sintaxis: [
      {
        code: `const collator = new Intl.Collator("es-ES");
const palabras = ["Zaragoza", "Ávila", "Barcelona"];
console.log(palabras.sort(collator.compare));
// ["Ávila", "Barcelona", "Zaragoza"]`,
      },
      {
        caption: "Ordenación natural de números:",
        code: `const collator = new Intl.Collator("es-ES", {
  numeric: true,
});
console.log(["item 10", "item 2", "item 1"].sort(collator.compare));
// ["item 1", "item 2", "item 10"]`,
      },
      {
        caption: "Ignorar mayúsculas y acentos:",
        code: `const collator = new Intl.Collator("es-ES", {
  sensitivity: "base",
});
console.log(collator.compare("Árbol", "arbol"));
// 0`,
      },
    ],

    nota: "💡 Pasa `collator.compare` sin paréntesis a `sort()`. Si escribes `sort(collator.compare())` ejecutas la comparación una vez y pasas su resultado, que no es una función.",

    ejemplos: [
      {
        titulo: "1. 🔤 Orden alfabético español",
        code: `const collator = new Intl.Collator("es-ES");
const nombres = ["Óscar", "Ana", "Ñandú", "Nuria"];
console.log(nombres.sort(collator.compare));
// ["Ana", "Nuria", "Ñandú", "Óscar"]`,
      },
      {
        titulo: "2. 🔢 Números como valores",
        code: `const collator = new Intl.Collator("es-ES", { numeric: true });
const archivos = ["foto 12", "foto 3", "foto 1"];
console.log(archivos.sort(collator.compare));
// ["foto 1", "foto 3", "foto 12"]`,
      },
      {
        titulo: "3. 🎚️ Sensibilidad al acento",
        code: `const base = new Intl.Collator("es-ES", { sensitivity: "base" });
const acento = new Intl.Collator("es-ES", { sensitivity: "accent" });
console.log(base.compare("cafe", "café")); // 0
console.log(acento.compare("cafe", "café")); // -1`,
      },
      {
        titulo: "4. 🌐 El mismo array en dos idiomas",
        code: `const letras = ["z", "ä", "a"];
console.log(letras.slice().sort(new Intl.Collator("es-ES").compare));
// ["a", "ä", "z"]
console.log(letras.slice().sort(new Intl.Collator("sv-SE").compare));
// ["a", "z", "ä"]`,
      },
    ],

    errores: [
      "**Invocar `compare()` dentro de `sort()`:** pasa la función, no su resultado.",
      "**Suponer que devuelve solo -1 o 1:** puede devolver cualquier número negativo o positivo.",
      "**Usar `<` para ordenar:** no respeta acentos, mayúsculas ni la «ñ».",
      "**Olvidar `numeric: true`:** «item 10» quedará antes que «item 2».",
      "**Recrear el collator en cada comparación:** reduce el rendimiento; créalo una vez.",
    ],

    casos: [
      "📇 Ordenar contactos y agendas por nombre.",
      "🛍️ Clasificar productos y categorías en un catálogo.",
      "📂 Ordenar nombres de archivo con números de forma natural.",
      "🔍 Comparar textos ignorando mayúsculas en un buscador.",
    ],

    relacion: [
      "**`Array.prototype.sort()`:** consume el comparador que devuelve `Intl.Collator`.",
      "**`String.prototype.localeCompare()`:** crea un comparador al vuelo; útil para una sola comparación.",
      "**`Intl.ListFormat`:** presenta la lista ya ordenada.",
      "**`sensitivity`:** decide si importan acentos, mayúsculas o variantes.",
      "**`numeric`:** compara secuencias de dígitos por su valor.",
    ],

    analogia:
      "Es como el bibliotecario que conoce el alfabeto de cada país. 📚 Para él, «Ávila» va antes que «Barcelona» aunque la letra con tilde no sea la misma que la «a» sin tilde, y «libro 2» va antes que «libro 10» porque entiende que son números. `Intl.Collator` es ese criterio experto aplicado a cualquier lista.",

    fuente: "MDN Web Docs · ECMAScript Internationalization API · Unicode Collation Algorithm",

    notasPersonales: [
      "✅ `compare(a, b)` devuelve negativo, cero o positivo.",
      "✅ Pasa `collator.compare` a `sort()` sin invocarlo.",
      "✅ `numeric: true` ordena números de forma natural.",
      "💡 Regla: no ordenes texto con `<` si hay usuarios de varios idiomas.",
      "🧪 `sensitivity: \"base\"` ignora acentos y mayúsculas.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve compare() cuando dos cadenas son equivalentes?",
        opciones: ["1", "-1", "0", "null"],
        correcta: 2,
      },
      {
        id: 2,
        pregunta: "¿Cómo se pasa el comparador a sort()?",
        opciones: [
          "sort(collator.compare())",
          "sort(collator.compare)",
          "sort(collator)",
          "sort(compare(collator))",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué opción ordena «item 2» antes que «item 10»?",
        opciones: [
          "sensitivity: \"base\"",
          "numeric: true",
          "caseFirst: \"upper\"",
          "ignorePunctuation: true",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué hace sensitivity: \"base\"?",
        opciones: [
          "Distingue mayúsculas y acentos",
          "Ignora acentos y mayúsculas",
          "Ordena solo números",
          "Fuerza el orden inglés",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué alternativa directa existe para comparar dos cadenas?",
        opciones: [
          "String.prototype.localeCompare()",
          "String.prototype.match()",
          "Array.prototype.join()",
          "Intl.ListFormat",
        ],
        correcta: 0,
      },
    ],
  },

  "intl-pluralrules": {
    id: "intl-pluralrules",
    titulo: "Intl.PluralRules",
    icon: "🔀",
    categoria: "Intl",
    firma: "new Intl.PluralRules(locale, opciones)",

    definicion: [
      "`Intl.PluralRules` indica qué **forma gramatical** corresponde a una cantidad en un idioma: singular, plural y, en algunos casos, categorías adicionales. 🔀",
      "Su método `select()` devuelve etiquetas como `\"one\"`, `\"other\"`, `\"few\"` o `\"many\"`, no el texto traducido.",
    ],

    queEs: [
      "Es el constructor de `Intl` que encapsula las reglas de pluralización de cada lengua. 🌍",
      "No traduce ni concatena palabras: solo clasifica el número para que tú elijas la variante correcta.",
    ],

    paraQueSirve: [
      "🔀 Elegir entre «1 elemento» y «3 elementos» sin duplicar condiciones.",
      "🌐 Manejar idiomas con más de dos formas plurales, como el polaco o el árabe.",
      "🧾 Construir mensajes dinámicos en sistemas de traducción.",
      "📊 Mostrar contadores y resúmenes con concordancia gramatical correcta.",
    ],

    comoFunciona: [
      "Recibe un locale y opciones como `type`.",
      "El método `select()` acepta un número y devuelve la categoría plural correspondiente al idioma.",
      "Las categorías posibles son `\"zero\"`, `\"one\"`, `\"two\"`, `\"few\"`, `\"many\"` y `\"other\"`.",
      "En español solo se usan `\"one\"` para el 1 y `\"other\"` para el resto.",
      "Con `type: \"ordinal\"` clasifica números ordinales, útil para «1.º», «2.º», «3.º».",
    ],

    sintaxis: [
      {
        code: `const reglas = new Intl.PluralRules("es-ES");
console.log(reglas.select(1)); // one
console.log(reglas.select(3)); // other`,
      },
      {
        caption: "Elegir la forma del mensaje:",
        code: `const reglas = new Intl.PluralRules("es-ES");
const formas = { one: "elemento", other: "elementos" };
const cantidad = 3;
console.log(cantidad + " " + formas[reglas.select(cantidad)]);
// 3 elementos`,
      },
      {
        caption: "Ordinales:",
        code: `const ordinales = new Intl.PluralRules("es-ES", {
  type: "ordinal",
});
console.log(ordinales.select(1)); // one
console.log(ordinales.select(2)); // other`,
      },
    ],

    nota: "💡 `select()` devuelve una categoría, no una frase. Necesitas un diccionario de formas por idioma para convertir `\"one\"` en «elemento» y `\"other\"` en «elementos».",

    ejemplos: [
      {
        titulo: "1. 🔀 Singular y plural en español",
        code: `const reglas = new Intl.PluralRules("es-ES");
[0, 1, 2, 5].forEach((cantidad) => {
  console.log(cantidad, reglas.select(cantidad));
});
// 0 other, 1 one, 2 other, 5 other`,
      },
      {
        titulo: "2. 🧾 Mensaje con concordancia",
        code: `const reglas = new Intl.PluralRules("es-ES");
const formas = { one: "comentario", other: "comentarios" };
const total = 1;
console.log(total + " " + formas[reglas.select(total)]);
// 1 comentario`,
      },
      {
        titulo: "3. 🌐 Un idioma con más formas",
        code: `const polaco = new Intl.PluralRules("pl-PL");
[1, 2, 5, 22].forEach((cantidad) => {
  console.log(cantidad, polaco.select(cantidad));
});
// 1 one, 2 few, 5 many, 22 few`,
      },
      {
        titulo: "4. 🥇 Ordinales en inglés",
        code: `const ordinales = new Intl.PluralRules("en-US", {
  type: "ordinal",
});
console.log(ordinales.select(1)); // one
console.log(ordinales.select(2)); // two
console.log(ordinales.select(3)); // few`,
      },
    ],

    errores: [
      "**Esperar el texto traducido:** devuelve categorías como `\"one\"`; la traducción es responsabilidad tuya.",
      "**Asumir dos formas en todos los idiomas:** el polaco o el árabe necesitan `\"few\"` y `\"many\"`.",
      "**Usar `\"zero\"` en español:** no es una categoría activa; el 0 cae en `\"other\"`.",
      "**Olvidar `type: \"ordinal\"`:** sin esa opción se clasifican cardinales, no posiciones.",
      "**Concatenar sin diccionario:** `cantidad + reglas.select(cantidad)` muestra la etiqueta inglesa, no una frase.",
    ],

    casos: [
      "💬 Contadores de mensajes, «me gusta» y notificaciones.",
      "🛒 Textos de carrito como «1 artículo» o «5 artículos».",
      "🏆 Posiciones ordinales en clasificaciones.",
      "🌍 Motores de traducción que necesitan elegir la variante correcta.",
    ],

    relacion: [
      "**`Intl.NumberFormat`:** formatea la cantidad que acompaña al texto.",
      "**`Intl.ListFormat`:** presenta listas con conjunciones correctas.",
      "**`type: \"ordinal\"`:** clasifica números de posición.",
      "**`selectRange()`:** elige la forma para un rango, como «1–3 elementos».",
      "**Sistemas i18n:** usan estas categorías para seleccionar traducciones.",
    ],

    analogia:
      "Piensa en un sastre que tiene patrones distintos según cuántas prendas vaya a vestir. 🧵 En español basta con dos patrones: uno para una prenda y otro para varias. En polaco hay más tallas intermedias. `Intl.PluralRules` es la tabla que dice qué patrón toca; la tela y el color los pone tu diccionario de traducciones.",

    fuente: "MDN Web Docs · ECMAScript Internationalization API · Unicode CLDR",

    notasPersonales: [
      "✅ `select()` devuelve una categoría, no una frase.",
      "✅ En español: `\"one\"` para 1 y `\"other\"` para el resto.",
      "✅ Otros idiomas pueden usar `\"few\"`, `\"many\"` o `\"two\"`.",
      "💡 Regla: combina la categoría con un diccionario de formas.",
      "🧪 Usa `type: \"ordinal\"` para posiciones.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve select(1) en español?",
        opciones: ["\"one\"", "\"single\"", "\"uno\"", "1"],
        correcta: 0,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve select() exactamente?",
        opciones: [
          "La frase traducida",
          "Una categoría gramatical",
          "Un número formateado",
          "Un booleano",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué opción clasifica números ordinales?",
        opciones: [
          'type: "ordinal"',
          'style: "ordinal"',
          'format: "position"',
          'category: "rank"',
        ],
        correcta: 0,
      },
      {
        id: 4,
        pregunta: "¿Qué categoría recibe el 0 en español?",
        opciones: ["\"zero\"", "\"one\"", "\"other\"", "\"many\""],
        correcta: 2,
      },
      {
        id: 5,
        pregunta: "¿Por qué el polaco necesita más formas que el español?",
        opciones: [
          "Porque usa otro alfabeto",
          "Porque sus reglas de plural tienen más categorías",
          "Porque Intl no lo soporta",
          "Porque todos sus números son ordinales",
        ],
        correcta: 1,
      },
    ],
  },
};
