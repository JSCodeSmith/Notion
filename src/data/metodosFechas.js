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
export const METODOS_FECHAS = [
  {
    seccion: "Creación y timestamps",
    metodos: [
      {
        id: "newdate",
        nombre: "new Date()",
        firma: "new Date() · new Date(valor)",
        icon: "🗓️",
      },
      {
        id: "datenow",
        nombre: "Date.now()",
        firma: "Date.now()",
        icon: "⏱️",
      },
      {
        id: "gettime",
        nombre: "getTime()",
        firma: "Date.prototype.getTime()",
        icon: "🔢",
      },
    ],
  },
  {
    seccion: "Obtención de componentes",
    metodos: [
      {
        id: "getfullyear",
        nombre: "getFullYear()",
        firma: "Date.prototype.getFullYear()",
        icon: "📅",
      },
      {
        id: "getmonth",
        nombre: "getMonth()",
        firma: "Date.prototype.getMonth()",
        icon: "🗓️",
      },
      {
        id: "getdate",
        nombre: "getDate()",
        firma: "Date.prototype.getDate()",
        icon: "📆",
      },
      {
        id: "getday",
        nombre: "getDay()",
        firma: "Date.prototype.getDay()",
        icon: "📅",
      },
      {
        id: "gethours",
        nombre: "getHours()",
        firma: "Date.prototype.getHours()",
        icon: "🕒",
      },
      {
        id: "getminutes",
        nombre: "getMinutes()",
        firma: "Date.prototype.getMinutes()",
        icon: "⏰",
      },
      {
        id: "getseconds",
        nombre: "getSeconds()",
        firma: "Date.prototype.getSeconds()",
        icon: "⏱️",
      },
    ],
  },
  {
    seccion: "Modificación de componentes",
    metodos: [
      {
        id: "setfullyear",
        nombre: "setFullYear()",
        firma: "Date.prototype.setFullYear(year, month, day)",
        icon: "✏️",
      },
      {
        id: "setdate",
        nombre: "setDate()",
        firma: "Date.prototype.setDate(day)",
        icon: "✏️",
      },
      {
        id: "sethours",
        nombre: "setHours()",
        firma: "Date.prototype.setHours(hours, minutes, seconds, ms)",
        icon: "🕒",
      },
      {
        id: "setminutes",
        nombre: "setMinutes()",
        firma: "Date.prototype.setMinutes(minutes, seconds, ms)",
        icon: "⏰",
      },
    ],
  },
  {
    seccion: "Formato y conversión",
    metodos: [
      {
        id: "toisostring",
        nombre: "toISOString()",
        firma: "Date.prototype.toISOString()",
        icon: "📤",
      },
      {
        id: "tolocalestring",
        nombre: "toLocaleString()",
        firma: "Date.prototype.toLocaleString(locales, options)",
        icon: "🌍",
      },
      {
        id: "tolocaledatestring",
        nombre: "toLocaleDateString()",
        firma: "Date.prototype.toLocaleDateString(locales, options)",
        icon: "🌍",
      },
      {
        id: "tolocaletimestring",
        nombre: "toLocaleTimeString()",
        firma: "Date.prototype.toLocaleTimeString(locales, options)",
        icon: "🌍",
      },
    ],
  },
];

/* ======================================================================
   APUNTES COMPLETOS
   ====================================================================== */
export const METODOS_FECHAS_DOCS = {
  /* ============================ new Date() ============================ */
  newdate: {
    id: "newdate",
    titulo: "new Date()",
    simulador: "fecha",
    definicion: [
      "Es el **constructor** de JavaScript que crea una nueva instancia del objeto `Date`, la cual representa un **momento específico en el tiempo**.",
      "Puede llamarse de distintas formas para crear fechas a partir del momento actual, de un *timestamp*, de un string o de componentes individuales (año, mes, día, hora...).",
    ],
    queEs: [
      "Es el mecanismo principal para trabajar con fechas y horas en JavaScript.",
      "Crea un objeto `Date` que encapsula internamente un *timestamp*: milisegundos desde el **1 de enero de 1970 UTC** (Unix Epoch).",
      "Almacena el instante en milisegundos y ofrece métodos para obtener o establecer sus componentes.",
      "Soporta **zonas horarias**: métodos locales (`getHours`) y métodos UTC (`getUTCHours`).",
      "Es **mutable**: los métodos `set...` modifican el mismo objeto en lugar de crear uno nuevo.",
    ],
    paraQueSirve: [
      "Crear fechas y horas en JavaScript.",
      "Representar momentos específicos en el tiempo.",
      "Realizar cálculos con fechas (sumar o restar días, horas, etc.).",
      "Comparar fechas y ordenarlas cronológicamente.",
      "Formatear fechas para mostrarlas al usuario.",
      "Extraer componentes (año, mes, día, hora...).",
      "Implementar calendarios, agendas y cronómetros.",
      "Generar *timestamps* para logs, IDs y métricas.",
    ],
    comoFunciona: [
      "`new Date()`: crea la fecha y hora actuales.",
      "`new Date(timestamp)`: crea la fecha a partir de milisegundos desde el Epoch.",
      "`new Date(dateString)`: crea la fecha a partir de un texto de fecha.",
      "`new Date(year, month, day, hours, minutes, seconds, ms)`: crea la fecha desde componentes individuales en hora local.",
      "Los **meses van de 0 a 11** (0 = enero, 11 = diciembre).",
      "Si los parámetros están fuera de rango, se **ajustan automáticamente** (*overflow*).",
    ],
    sintaxis: [
      {
        code: `// 1. Fecha actual
new Date()

// 2. Desde un timestamp en milisegundos
new Date(timestamp)

// 3. Desde un string de fecha
new Date(dateString)`,
      },
      {
        caption: "Desde componentes individuales (hora local):",
        code: `new Date(year, month)
new Date(year, month, day)
new Date(year, month, day, hours)
new Date(year, month, day, hours, minutes)
new Date(year, month, day, hours, minutes, seconds)
new Date(year, month, day, hours, minutes, seconds, milliseconds)`,
      },
      {
        caption: "Sin `new` el resultado es un string, no un objeto:",
        code: `Date() // "Mon Dec 25 2024 15:30:45 GMT+0100 (CET)"`,
      },
    ],
    nota: "**Parámetros:** todos opcionales. **Retorno:** un objeto `Date` (o un `string` si se llama a `Date()` sin `new`). Un `Date` inválido devuelve `\"Invalid Date\"` y `getTime()` devuelve `NaN`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Fecha y hora actual",
        code: `const now = new Date();
console.log(now); // 2024-12-25T15:30:45.123Z`,
      },
      {
        titulo: "Ejemplo 2: Desde un timestamp",
        code: `const timestamp = 1735084800000; // 2024-12-25 00:00:00 UTC
const dateFromTimestamp = new Date(timestamp);
console.log(dateFromTimestamp.toISOString()); // "2024-12-25T00:00:00.000Z"`,
      },
      {
        titulo: "Ejemplo 3: Desde un string",
        code: `const dateFromString = new Date("2024-12-25");
console.log(dateFromString.getFullYear()); // 2024
console.log(dateFromString.getMonth());   // 11 (diciembre)`,
      },
      {
        titulo: "Ejemplo 4: Desde componentes individuales",
        code: `const dateComponents = new Date(2024, 11, 25, 15, 30, 45, 500);
console.log(dateComponents.getFullYear());      // 2024
console.log(dateComponents.getMonth());         // 11
console.log(dateComponents.getDate());          // 25
console.log(dateComponents.getHours());         // 15
console.log(dateComponents.getMinutes());       // 30
console.log(dateComponents.getSeconds());       // 45
console.log(dateComponents.getMilliseconds());  // 500`,
      },
      {
        titulo: "Ejemplo 5: Ajuste automático (overflow)",
        code: `// 32 de enero → 1 de febrero
const autoAdjust = new Date(2024, 0, 32);
console.log(autoAdjust.getDate());  // 1
console.log(autoAdjust.getMonth()); // 1 (febrero)

// Mes 13 → enero del año siguiente
const nextYear = new Date(2024, 13, 1);
console.log(nextYear.getFullYear()); // 2025
console.log(nextYear.getMonth());    // 0 (enero)`,
      },
      {
        titulo: "Ejemplo 6: Fecha inválida",
        code: `const invalid = new Date("fecha inválida");
console.log(invalid.toString());        // "Invalid Date"
console.log(Number.isNaN(invalid.getTime())); // true`,
      },
    ],
    errores: [
      {
        texto: "**Usar `Date()` sin `new` esperando un objeto:** devuelve un string y no tiene métodos de `Date`.",
        code: `const date = Date();
console.log(typeof date); // "string"

// ❌ TypeError: date.getTime is not a function
date.getTime();

// ✅ Correcto
const date2 = new Date();
console.log(typeof date2.getTime()); // "number"`,
      },
      {
        texto: "**Olvidar que los meses empiezan en 0:** diciembre es `11`, no `12`.",
        code: `const mal = new Date(2024, 12, 25);
console.log(mal.getMonth()); // 0 (enero del año siguiente)

const bien = new Date(2024, 11, 25);
console.log(bien.getMonth()); // 11 (diciembre)`,
      },
      {
        texto: "**Usar años de 2 dígitos:** `99` se interpreta como el año 99 d.C., no como 1999.",
        code: `console.log(new Date(99, 11, 25).getFullYear());   // 99
console.log(new Date(1999, 11, 25).getFullYear()); // 1999`,
      },
      {
        texto: "**Usar formatos de string ambiguos:** `\"01/02/2024\"` puede ser 2 de enero o 1 de febrero según el navegador. Prefiere el formato ISO `AAAA-MM-DD`.",
        code: `new Date("01/02/2024"); // ⚠️ ambiguo
new Date("2024-01-02"); // ✅ 2 de enero`,
      },
      {
        texto: "**No considerar la zona horaria:** un string ISO sin hora se interpreta como UTC; los componentes individuales se interpretan como hora local.",
        code: `new Date("2024-12-25");        // 2024-12-25 00:00:00 UTC
new Date(2024, 11, 25);        // 2024-12-25 00:00:00 local`,
      },
    ],
    casos: [
      "**Registro de usuarios:** guardar `createdAt` y `updatedAt` con `new Date()`.",
      "**Informes por período:** calcular el inicio y el fin de un día, semana, mes o año.",
      "**Sistemas de citas y calendarios:** crear y comparar horarios de reuniones.",
      "**Vencimiento de licencias y suscripciones:** calcular la fecha de expiración.",
      "**Métricas temporales:** agrupar eventos por día u hora.",
      "**Clonar fechas:** `new Date(fecha.getTime())` crea una copia independiente.",
    ],
    relacion: [
      "**`Date.now()`:** obtiene el *timestamp* actual sin crear una instancia.",
      "**`Date.parse()`:** convierte un string de fecha en un *timestamp*.",
      "**`Date.UTC()`:** crea un *timestamp* para una fecha UTC específica.",
      "**`getTime()`:** devuelve el *timestamp* interno del objeto `Date`.",
      "**`toISOString()`:** convierte la fecha al formato estándar ISO 8601 en UTC.",
      "**`toLocaleString()`:** formatea la fecha según la configuración regional.",
    ],
    analogia:
      "Imagina que `new Date()` es un **relojero** que puede crear un reloj para cualquier momento. `new Date()` te entrega un reloj que marca la hora actual; `new Date(timestamp)` te da uno configurado a un instante exacto en milisegundos; `new Date(\"2024-12-25\")` te da un reloj ajustado a Navidad; y `new Date(2024, 11, 25)` te lo entrega armado con piezas separadas (año, mes, día).",
    fuente: "MDN Web Docs | ECMAScript Specification | MDN – Date constructor",
    notasPersonales: [
      "**Regla para memorizar:** siempre usa `new`; los meses empiezan en `0` y los años se escriben con 4 dígitos.",
      "Para strings, prefiere el formato ISO `AAAA-MM-DDTHH:mm:ss` para evitar ambigüedades entre navegadores.",
      "Un `Date` inválido no lanza error al crearse: falla después (`NaN` o `\"Invalid Date\"`).",
    ],
    quiz: Q([
      [
        "¿Qué devuelve Date() sin la palabra new?",
        ["Un objeto Date", "Un string con la fecha", "Un timestamp", "undefined"],
        1,
      ],
      [
        "¿Qué número corresponde a diciembre en new Date(2024, 11, 25)?",
        ["12", "11", "10", "0"],
        1,
      ],
      [
        "¿Qué representa internamente un objeto Date?",
        [
          "Una cadena de texto",
          "Milisegundos desde el 1 de enero de 1970 UTC",
          "Segundos desde el año 2000",
          "Un objeto con año, mes y día",
        ],
        1,
      ],
      [
        "¿Qué ocurre con new Date(2024, 0, 32)?",
        [
          "Lanza un error",
          "Se ajusta automáticamente al 1 de febrero",
          "Devuelve Invalid Date",
          "Devuelve el 32 de enero",
        ],
        1,
      ],
      [
        '¿Qué devuelve new Date("fecha inválida").getTime()?',
        ["0", "NaN", "null", "Un error"],
        1,
      ],
      [
        "¿Cómo se crea una fecha a partir de componentes en hora local?",
        [
          "new Date(timestamp)",
          "new Date(year, month, day, ...)",
          "Date.parse(year, month)",
          "new Date(ISOString)",
        ],
        1,
      ],
      [
        "¿Cuál es la forma recomendada de escribir una fecha en string?",
        ["DD/MM/AAAA", "MM/DD/AAAA", "AAAA-MM-DD (ISO 8601)", "Cualquiera da igual"],
        2,
      ],
      [
        "¿Qué método crea una copia independiente de una fecha?",
        ["const copia = original", "new Date(original.getTime())", "original.clone()", "Date(original)"],
        1,
      ],
    ]),
  },

  /* ============================ Date.now() ============================ */
  datenow: {
    id: "datenow",
    titulo: "Date.now()",
    simulador: "fecha",
    definicion: [
      "Es un **método estático** de `Date` que devuelve el número de **milisegundos** transcurridos desde el **1 de enero de 1970, 00:00:00 UTC** (Unix Epoch) hasta el momento actual.",
      "Es la forma más directa y eficiente de obtener el *timestamp* actual, porque no crea una instancia de `Date`.",
    ],
    queEs: [
      "Devuelve un **número entero** con precisión de milisegundos.",
      "Es **independiente de la zona horaria**: el valor siempre está referido a UTC.",
      "Es un método **estático**: se llama como `Date.now()`, no sobre una instancia.",
      "Es equivalente a `new Date().getTime()`, pero más rápido y con menos sobrecarga.",
      "En navegadores modernos la precisión está limitada a milisegundos.",
    ],
    paraQueSirve: [
      "Obtener el *timestamp* actual de forma eficiente.",
      "Medir tiempos de ejecución de código.",
      "Generar identificadores únicos y nombres de archivo.",
      "Implementar cachés con expiración (*TTL*).",
      "Crear logs y marcas de tiempo.",
      "Calcular diferencias de tiempo.",
      "Implementar *rate limiting* y *throttling*.",
    ],
    comoFunciona: [
      "Consulta el reloj del sistema.",
      "Devuelve los milisegundos transcurridos desde el Epoch.",
      "No lanza errores: siempre devuelve un número válido.",
      "No modifica ni crea objetos `Date`.",
      "Para mediciones de alta precisión se recomienda `performance.now()`.",
    ],
    sintaxis: [
      {
        code: `const timestamp = Date.now();`,
      },
      {
        caption: "Para obtener segundos (timestamp Unix clásico):",
        code: `const unixSegundos = Math.floor(Date.now() / 1000);`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** un `number` con los milisegundos desde el 1 de enero de 1970 UTC hasta ahora.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico",
        code: `const timestamp = Date.now();
console.log(timestamp); // 1703539200000 (ejemplo)`,
      },
      {
        titulo: "Ejemplo 2: Comparación con new Date().getTime()",
        code: `console.log(Date.now() === new Date().getTime()); // true (casi siempre)`,
      },
      {
        titulo: "Ejemplo 3: Medir tiempo de ejecución",
        code: `const start = Date.now();

for (let i = 0; i < 1000000; i++) {
  Math.sqrt(i);
}

const end = Date.now();
console.log(\`Tiempo de ejecución: \${end - start} ms\`);`,
      },
      {
        titulo: "Ejemplo 4: Generar un identificador único",
        code: `function generateId() {
  return \`\${Date.now()}-\${Math.random().toString(36).slice(2, 8)}\`;
}

console.log(generateId()); // "1703539200000-abc123"`,
      },
      {
        titulo: "Ejemplo 5: Caché con expiración (TTL)",
        code: `const cache = new Map();
const TTL = 5000; // 5 segundos

function set(key, value) {
  cache.set(key, { value, expires: Date.now() + TTL });
}

function get(key) {
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expires) {
    cache.delete(key);
    return null;
  }
  return entry.value;
}

set("dato", "valor");
console.log(get("dato")); // "valor"`,
      },
      {
        titulo: "Ejemplo 6: Milisegundos hasta una fecha",
        code: `function msUntil(fecha) {
  const target = new Date(fecha).getTime();
  return Math.max(0, target - Date.now());
}

console.log(msUntil("2024-12-31T23:59:59Z"));`,
      },
    ],
    errores: [
      {
        texto: "**Crear una instancia innecesaria:** `new Date().getTime()` funciona, pero `Date.now()` es más eficiente.",
        code: `// ❌ Menos eficiente
const ahora = new Date().getTime();

// ✅ Más eficiente
const ahora2 = Date.now();`,
      },
      {
        texto: "**Pensar que devuelve segundos:** devuelve **milisegundos**.",
        code: `const ms = Date.now();                      // 1703539200000
const s  = Math.floor(Date.now() / 1000);   // 1703539200`,
      },
      {
        texto: "**Usarlo para mediciones de altísima precisión:** puede devolver `0` en operaciones muy rápidas. Usa `performance.now()`.",
        code: `const start = Date.now();
// operación muy rápida
const duracion = Date.now() - start; // puede ser 0

const startPerf = performance.now();
// operación muy rápida
const duracionPerf = performance.now() - startPerf; // microsegundos`,
      },
      {
        texto: "**Asumir que los *timestamps* son únicos:** dos llamadas seguidas pueden coincidir. Combínalo con un valor aleatorio o un contador.",
        code: `const id1 = Date.now();
const id2 = Date.now(); // puede ser igual a id1

const id = \`\${Date.now()}-\${Math.random().toString(36).slice(2, 6)}\`;`,
      },
    ],
    casos: [
      "**Medición de rendimiento:** cronometrar funciones y peticiones.",
      "**Cachés con expiración:** calcular cuándo caduca un valor.",
      "**Tokens y sesiones:** guardar la hora de creación y de expiración.",
      "**Logs y auditoría:** marcar cada evento con su instante exacto.",
      "**Rate limiting:** contar solicitudes dentro de una ventana de tiempo.",
      "**Nombres de archivo únicos:** `archivo_1703539200000.png`.",
    ],
    relacion: [
      "**`new Date().getTime()`:** equivalente, pero requiere crear una instancia.",
      "**`performance.now()`:** *timestamp* de alta resolución para mediciones.",
      "**`Date.parse()`:** convierte un string de fecha a *timestamp*.",
      "**`Date.UTC()`:** crea un *timestamp* para una fecha UTC específica.",
      "**`new Date(timestamp)`:** hace el camino inverso, de número a fecha.",
    ],
    analogia:
      "Imagina un **cronómetro universal** que lleva corriendo desde la medianoche del 1 de enero de 1970. Cada vez que llamas a `Date.now()` miras su pantalla y obtienes exactamente cuántos milisegundos han pasado. No necesitas fabricar un cronómetro nuevo (un objeto `Date`): solo miras el que ya existe.",
    fuente: "MDN Web Docs | ECMAScript Specification | MDN – Date.now()",
    notasPersonales: [
      "**Regla para memorizar:** `Date.now()` = milisegundos desde 1970, siempre en UTC.",
      "Divide entre `1000` para segundos y entre `86400000` para días.",
      "Es la forma recomendada de obtener el *timestamp* actual.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve Date.now()?",
        [
          "Un objeto Date",
          "Milisegundos desde el 1 de enero de 1970 UTC",
          "Segundos desde 1970",
          "Un string con la fecha",
        ],
        1,
      ],
      [
        "¿Date.now() depende de la zona horaria local?",
        ["Sí, siempre", "No, siempre está en UTC", "Solo en Node.js", "Solo en el navegador"],
        1,
      ],
      [
        "¿Cómo se obtienen segundos a partir de Date.now()?",
        ["Date.now() / 1000 sin más", "Math.floor(Date.now() / 1000)", "Date.now() * 1000", "Date.now().seconds"],
        1,
      ],
      [
        "¿Cuál es más eficiente?",
        ["new Date().getTime()", "Date.now()", "Ambos igual", "Date.parse()"],
        1,
      ],
      [
        "¿Qué método se recomienda para medir tiempos de alta precisión?",
        ["Date.now()", "performance.now()", "new Date()", "Date.parse()"],
        1,
      ],
      [
        "¿Date.now() puede lanzar un error?",
        ["Sí, si la fecha es inválida", "No, siempre devuelve un número", "Solo con new", "Solo en modo estricto"],
        1,
      ],
      [
        "¿Qué devuelve Date.now() === new Date().getTime()?",
        ["Siempre false", "Casi siempre true", "NaN", "Un error"],
        1,
      ],
      [
        "¿Cuál es un riesgo de usar Date.now() como ID único?",
        [
          "Devuelve un string",
          "Dos llamadas seguidas pueden devolver el mismo valor",
          "No funciona en navegadores",
          "Solo funciona una vez",
        ],
        1,
      ],
    ]),
  },

  /* ============================ getTime() ============================ */
  gettime: {
    id: "gettime",
    titulo: "Date.prototype.getTime()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que devuelve el número de **milisegundos** transcurridos desde el **1 de enero de 1970, 00:00:00 UTC** (Unix Epoch) hasta la fecha representada por el objeto.",
      "Es la representación **numérica universal** de una fecha: no depende de la zona horaria y permite comparar y calcular con facilidad.",
    ],
    queEs: [
      "El *timestamp* devuelto es **siempre en UTC**.",
      "Es un valor **primitivo** (`number`), no un objeto.",
      "Los valores **negativos** representan fechas anteriores al 1 de enero de 1970.",
      "Es el formato estándar para comparar fechas y hacer cálculos temporales.",
      "Equivale a `date.valueOf()` y a `+date`.",
    ],
    paraQueSirve: [
      "Comparar fechas de forma precisa y sencilla.",
      "Calcular diferencias de tiempo entre dos fechas.",
      "Medir tiempos de ejecución y rendimiento.",
      "Generar identificadores únicos basados en tiempo.",
      "Almacenar fechas en bases de datos como números.",
      "Crear *timestamps* para logs y auditoría.",
      "Implementar cachés con expiración basada en tiempo.",
    ],
    comoFunciona: [
      "Toma el *timestamp* interno que guarda el objeto `Date`.",
      "Lo devuelve como un número de milisegundos desde el Epoch.",
      "No modifica el objeto original.",
      "Si la fecha es inválida, devuelve `NaN`.",
      "Un día equivale a `86 400 000` milisegundos.",
    ],
    sintaxis: [
      {
        code: `const ms = fecha.getTime();`,
      },
      {
        caption: "Equivalencias habituales:",
        code: `fecha.getTime() === fecha.valueOf(); // true
fecha.getTime() === +fecha;           // true`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** un `number` con los milisegundos desde el Epoch, o `NaN` si la fecha es inválida.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico",
        code: `const date = new Date(2024, 11, 25);
console.log(date.getTime()); // 1735084800000`,
      },
      {
        titulo: "Ejemplo 2: Comparar dos fechas",
        code: `const date1 = new Date(2024, 0, 1);
const date2 = new Date(2024, 11, 31);

if (date1.getTime() < date2.getTime()) {
  console.log("date1 es anterior a date2");
}`,
      },
      {
        titulo: "Ejemplo 3: Diferencia en días",
        code: `function daysBetween(a, b) {
  const diff = Math.abs(b.getTime() - a.getTime());
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}

console.log(daysBetween(new Date(2024, 0, 1), new Date(2024, 11, 31))); // 365`,
      },
      {
        titulo: "Ejemplo 4: Fechas antes del Epoch",
        code: `const oldDate = new Date(1969, 6, 20);
console.log(oldDate.getTime()); // número negativo`,
      },
      {
        titulo: "Ejemplo 5: Ordenar fechas",
        code: `const dates = [
  new Date(2024, 5, 15),
  new Date(2023, 11, 25),
  new Date(2024, 0, 1),
];

dates.sort((a, b) => a.getTime() - b.getTime());
console.log(dates.map((d) => d.toISOString()));`,
      },
      {
        titulo: "Ejemplo 6: Timestamp Unix en segundos",
        code: `function getUnixTimestamp(date = new Date()) {
  return Math.floor(date.getTime() / 1000);
}

console.log(getUnixTimestamp());`,
      },
    ],
    errores: [
      {
        texto: "**Comparar fechas con `===`:** dos objetos distintos nunca son iguales, aunque representen el mismo instante.",
        code: `const d1 = new Date(2024, 0, 1);
const d2 = new Date(2024, 0, 1);
console.log(d1 === d2);            // false
console.log(d1.getTime() === d2.getTime()); // true`,
      },
      {
        texto: "**Pensar que devuelve segundos:** devuelve **milisegundos**.",
        code: `const ms = new Date().getTime();            // 1703539200000
const s  = Math.floor(ms / 1000);          // 1703539200`,
      },
      {
        texto: "**Crear objetos `Date` innecesariamente** para obtener el instante actual.",
        code: `// ❌
const ahora = new Date().getTime();

// ✅
const ahora2 = Date.now();`,
      },
      {
        texto: "**No comprobar fechas inválidas:** `getTime()` devuelve `NaN` y cualquier comparación con `NaN` es `false`.",
        code: `const mala = new Date("abc");
console.log(mala.getTime());        // NaN
console.log(Number.isNaN(mala.getTime())); // true`,
      },
    ],
    casos: [
      "**Comparar y ordenar fechas** de forma fiable.",
      "**Calcular diferencias** en días, horas o minutos.",
      "**Cachés y tokens** con expiración por tiempo.",
      "**Logs y auditoría** con marcas de tiempo numéricas.",
      "**Medir rendimiento** de funciones y peticiones.",
      "**Guardar fechas en bases de datos** como números (más eficiente).",
    ],
    relacion: [
      "**`Date.now()`:** devuelve el *timestamp* actual sin instancia.",
      "**`valueOf()` / `+date`:** equivalentes a `getTime()`.",
      "**`Date.parse()`:** convierte un string a *timestamp*.",
      "**`Date.UTC()`:** obtiene el *timestamp* de una fecha UTC específica.",
      "**`performance.now()`:** *timestamp* de alta resolución para mediciones.",
    ],
    analogia:
      "`getTime()` es como un **cuentakilómetros del tiempo**: mide cuántos milisegundos han pasado desde un punto de referencia fijo (el 1 de enero de 1970). Es un cronómetro universal que todos los sistemas pueden usar para ponerse de acuerdo sobre qué hora es.",
    fuente: "MDN Web Docs | ECMAScript Specification | Unix Time",
    notasPersonales: [
      "**Regla para memorizar:** `getTime()` siempre devuelve milisegundos en UTC.",
      "Para comparar fechas usa `getTime()`, nunca `===` sobre los objetos.",
      "Si obtienes `NaN`, la fecha es inválida.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve getTime()?",
        ["Un objeto Date", "Milisegundos desde el Epoch", "Segundos desde 1970", "Un string ISO"],
        1,
      ],
      [
        "¿En qué zona horaria está el valor devuelto?",
        ["En la local", "En UTC", "En la del navegador", "Depende del string"],
        1,
      ],
      [
        "¿Qué devuelve una fecha inválida con getTime()?",
        ["0", "NaN", "null", "Un error"],
        1,
      ],
      [
        "¿Cuántos milisegundos tiene un día?",
        ["3600000", "86400000", "604800000", "1000"],
        1,
      ],
      [
        "¿Qué expresión es equivalente a fecha.getTime()?",
        ["fecha.toString()", "+fecha", "fecha.getDate()", "Date.now()"],
        1,
      ],
      [
        "¿Por qué d1 === d2 es false para dos fechas iguales?",
        [
          "Porque Date no admite comparación",
          "Porque son dos objetos distintos",
          "Porque una es local y otra UTC",
          "Porque falta new",
        ],
        1,
      ],
      [
        "¿Qué devuelve una fecha de 1969 con getTime()?",
        ["0", "Un número negativo", "NaN", "Un error"],
        1,
      ],
      [
        "¿Cómo se obtienen segundos Unix desde getTime()?",
        ["getTime() / 1000 sin redondear", "Math.floor(getTime() / 1000)", "getTime() * 1000", "getTime().seconds"],
        1,
      ],
    ]),
  },

  /* ========================== getFullYear() ========================== */
  getfullyear: {
    id: "getfullyear",
    titulo: "Date.prototype.getFullYear()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que devuelve el **año completo de 4 dígitos** de una fecha según la **hora local**.",
      "A diferencia de `getYear()` (obsoleto, que devuelve el año menos 1900), `getFullYear()` devuelve el año tal cual: `2024` en lugar de `124`.",
    ],
    queEs: [
      "Es el método estándar para obtener el año de una fecha.",
      "Es un **getter**: no modifica el objeto original.",
      "Trabaja con la **hora local** del sistema; para UTC se usa `getUTCFullYear()`.",
      "Devuelve un número entero, no un string.",
      "Los años negativos representan años antes de Cristo.",
    ],
    paraQueSirve: [
      "Obtener el año actual para mostrarlo en interfaces.",
      "Calcular la edad de una persona.",
      "Generar años fiscales y períodos contables.",
      "Filtrar datos por año específico.",
      "Crear calendarios y agendas.",
      "Validar rangos de fechas.",
      "Generar números de serie que incluyen el año.",
    ],
    comoFunciona: [
      "Lee el año del objeto `Date` según la hora local.",
      "Devuelve el año completo, con 4 dígitos cuando corresponde.",
      "Para años anteriores al 2000 devuelve el año completo (por ejemplo, `1999`).",
      "No modifica el objeto.",
      "Si la fecha es inválida, devuelve `NaN`.",
    ],
    sintaxis: [
      {
        code: `const year = fecha.getFullYear();`,
      },
      {
        caption: "Comparación con el obsoleto `getYear()`:",
        code: `const date = new Date(2024, 0, 1);
console.log(date.getFullYear()); // 2024
console.log(date.getYear());     // 124 (obsoleto)`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** un `number` con el año completo, o `NaN` si la fecha es inválida.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico",
        code: `const date = new Date(2024, 11, 25);
console.log(date.getFullYear()); // 2024`,
      },
      {
        titulo: "Ejemplo 2: Año actual",
        code: `const now = new Date();
console.log(now.getFullYear()); // año actual (ej: 2026)`,
      },
      {
        titulo: "Ejemplo 3: Años antes del 2000 y en el futuro",
        code: `console.log(new Date(1985, 6, 15).getFullYear()); // 1985
console.log(new Date(2050, 0, 1).getFullYear());  // 2050`,
      },
      {
        titulo: "Ejemplo 4: Calcular la edad",
        code: `function calculateAge(birthDate) {
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
}

console.log(calculateAge(new Date(1990, 5, 15)));`,
      },
      {
        titulo: "Ejemplo 5: Verificar año bisiesto",
        code: `function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

console.log(isLeapYear(2024)); // true
console.log(isLeapYear(2023)); // false
console.log(isLeapYear(1900)); // false`,
      },
      {
        titulo: "Ejemplo 6: Filtrar eventos por año",
        code: `const events = [
  { nombre: "Evento 1", date: "2024-06-15" },
  { nombre: "Evento 2", date: "2023-12-31" },
];

const del2024 = events.filter(
  (e) => new Date(e.date).getFullYear() === 2024
);

console.log(del2024.length); // 1`,
      },
    ],
    errores: [
      {
        texto: "**Usar `getYear()` en lugar de `getFullYear()`:** está obsoleto y devuelve el año menos 1900.",
        code: `// ❌ Obsoleto
date.getYear(); // 124 para 2024

// ✅ Correcto
date.getFullYear(); // 2024`,
      },
      {
        texto: "**Olvidar la zona horaria:** `getFullYear()` es local, no UTC.",
        code: `const d = new Date("2024-12-31T23:30:00Z");
console.log(d.getFullYear());    // puede ser 2025 según la zona
console.log(d.getUTCFullYear()); // 2024`,
      },
      {
        texto: "**Pensar que devuelve un string:** devuelve un `number`. Si necesitas texto, usa `String()` o `padStart()`.",
        code: `const year = new Date().getFullYear();
console.log(typeof year);            // "number"
console.log(String(year).padStart(4, "0"));`,
      },
      {
        texto: "**Asumir que los años negativos son un error:** JavaScript los admite para representar años a.C.",
        code: `console.log(new Date(-500, 0, 1).getFullYear()); // -500`,
      },
    ],
    casos: [
      "**Calcular la edad** de un usuario a partir de su fecha de nacimiento.",
      "**Facturación y números de serie** con el año: `FAC-2024-000001`.",
      "**Filtros y reportes anuales** de ventas o eventos.",
      "**Años fiscales** y períodos contables.",
      "**Calendarios y agendas** que muestran el año actual.",
      "**Suscripciones y licencias** con renovación anual.",
    ],
    relacion: [
      "**`getUTCFullYear()`:** año en UTC.",
      "**`setFullYear()`:** establece el año.",
      "**`getYear()`:** obsoleto (año menos 1900).",
      "**`getMonth()`:** mes (0-11).",
      "**`getDate()`:** día del mes (1-31).",
      "**`getDay()`:** día de la semana (0-6).",
    ],
    analogia:
      "`getFullYear()` es como **leer el año en un calendario de pared**: miras la fecha y ves claramente «2024». Es simple, directo y siempre te da el número completo de 4 dígitos, sin abreviaturas ni confusiones.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** `getFullYear()` devuelve el año completo; `getYear()` está obsoleto.",
      "Usa `getUTCFullYear()` si necesitas el año en UTC.",
      "Es un `number`, no un `string`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve new Date(2024, 11, 25).getFullYear()?",
        ["2024", "124", '"2024"', "11"],
        0,
      ],
      [
        "¿Qué devuelve getYear() para el año 2024?",
        ["2024", "124", "24", "NaN"],
        1,
      ],
      [
        "¿Qué método obtiene el año en UTC?",
        ["getFullYear()", "getUTCFullYear()", "getYear()", "toISOString()"],
        1,
      ],
      [
        "¿getFullYear() modifica la fecha original?",
        ["Sí, siempre", "No, es un getter", "Solo en modo estricto", "Solo si es bisiesto"],
        1,
      ],
      [
        "¿Qué devuelve getFullYear() en una fecha inválida?",
        ["0", "NaN", "null", "Un error"],
        1,
      ],
      [
        "¿Qué tipo de dato devuelve getFullYear()?",
        ["string", "number", "boolean", "object"],
        1,
      ],
    ]),
  },

  /* ============================ getMonth() ============================ */
  getmonth: {
    id: "getmonth",
    titulo: "Date.prototype.getMonth()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que devuelve el **mes** de una fecha según la hora local, como un número entre **0 y 11**.",
      "**Importante:** los meses en JavaScript empiezan en `0`. Enero es `0` y diciembre es `11`.",
    ],
    queEs: [
      "Es un **getter**: devuelve información sin modificar el objeto.",
      "Devuelve un valor de tipo `number`.",
      "Usa la **hora local** del sistema.",
      "Para mostrar el mes como lo entienden las personas hay que sumar `1`.",
      "Si la fecha es inválida, devuelve `NaN`.",
    ],
    paraQueSirve: [
      "Mostrar el mes actual.",
      "Formatear fechas.",
      "Crear calendarios.",
      "Agrupar información por meses.",
      "Realizar comparaciones entre fechas.",
      "Generar reportes mensuales.",
    ],
    comoFunciona: [
      "Se crea un objeto `Date`.",
      "Se llama al método `getMonth()`.",
      "JavaScript obtiene el mes correspondiente a esa fecha.",
      "Devuelve un número entre `0` y `11`.",
      "Si la fecha es inválida, devuelve `NaN`.",
    ],
    sintaxis: [
      {
        code: `const mes = fecha.getMonth();`,
      },
      {
        caption: "Tabla de valores:",
        code: `0  → Enero
1  → Febrero
2  → Marzo
3  → Abril
4  → Mayo
5  → Junio
6  → Julio
7  → Agosto
8  → Septiembre
9  → Octubre
10 → Noviembre
11 → Diciembre`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** un `number` entre `0` y `11`, o `NaN` si la fecha es inválida.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Mes de una fecha",
        code: `const fecha = new Date("2026-07-22");
console.log(fecha.getMonth()); // 6 (julio)`,
      },
      {
        titulo: "Ejemplo 2: Diciembre",
        code: `const fecha = new Date("2026-12-25");
console.log(fecha.getMonth()); // 11`,
      },
      {
        titulo: "Ejemplo 3: Mostrar el nombre del mes",
        code: `const meses = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const fecha = new Date();
console.log(meses[fecha.getMonth()]);`,
      },
      {
        titulo: "Ejemplo 4: Comparar si es diciembre",
        code: `const fecha = new Date();
if (fecha.getMonth() === 11) {
  console.log("Es diciembre.");
}`,
      },
      {
        titulo: "Ejemplo 5: Mostrar el mes en formato humano (1-12)",
        code: `const fecha = new Date("2026-07-22");
console.log(fecha.getMonth() + 1); // 7`,
      },
      {
        titulo: "Ejemplo 6: Fecha inválida",
        code: `const fecha = new Date("Fecha inválida");
console.log(fecha.getMonth()); // NaN`,
      },
    ],
    errores: [
      {
        texto: "**Pensar que enero es 1:** enero es `0`.",
        code: `const fecha = new Date("2026-01-15");
console.log(fecha.getMonth()); // 0`,
      },
      {
        texto: "**Mostrar el número del mes directamente:** para el usuario hay que sumar `1`.",
        code: `const fecha = new Date("2026-07-22");
console.log(fecha.getMonth());     // 6
console.log(fecha.getMonth() + 1); // 7`,
      },
      {
        texto: "**Llamarlo sobre una fecha inválida:** devuelve `NaN` sin lanzar error.",
        code: `const fecha = new Date("abc");
console.log(fecha.getMonth()); // NaN`,
      },
    ],
    casos: [
      "**Mostrar el mes actual** en una interfaz.",
      "**Agrupar ventas o eventos por mes.**",
      "**Crear calendarios** y selectores de mes.",
      "**Validar fechas** dentro de un rango de meses.",
      "**Generar reportes mensuales.**",
    ],
    relacion: [
      "**`getUTCMonth()`:** mes en UTC.",
      "**`setMonth()`:** establece el mes.",
      "**`getDate()`:** día del mes (1-31).",
      "**`getDay()`:** día de la semana (0-6).",
      "**`getFullYear()`:** año completo.",
    ],
    analogia:
      "Imagina un **archivador con 12 carpetas**, una por mes. JavaScript las numera de `0` (enero) a `11` (diciembre). Cuando llamas a `getMonth()`, te dice en qué carpeta está guardada la fecha. Las personas cuentan desde 1, por eso a veces hay que sumar uno.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** `getMonth()` va de `0` a `11`; suma `1` para mostrarlo.",
      "Enero = `0`, diciembre = `11`.",
      "Devuelve un `number`, no un string.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve getMonth() para julio?",
        ["7", "6", "06", "Julio"],
        1,
      ],
      [
        "¿Qué número corresponde a enero?",
        ["1", "0", "12", "11"],
        1,
      ],
      [
        "¿Qué número corresponde a diciembre?",
        ["12", "11", "0", "10"],
        1,
      ],
      [
        "¿Cómo se muestra el mes en formato humano (1-12)?",
        ["getMonth()", "getMonth() + 1", "getMonth() - 1", "getDate()"],
        1,
      ],
      [
        "¿Qué devuelve getMonth() en una fecha inválida?",
        ["0", "NaN", "null", "Un error"],
        1,
      ],
      [
        "¿Qué tipo de dato devuelve getMonth()?",
        ["string", "number", "boolean", "object"],
        1,
      ],
    ]),
  },

  /* ============================= getDate() ============================= */
  getdate: {
    id: "getdate",
    titulo: "Date.prototype.getDate()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que devuelve el **día del mes** (del `1` al `31`) según la hora local.",
      "**Importante:** `getDate()` devuelve el día del mes, **no** el día de la semana.",
    ],
    queEs: [
      "Es un **getter**: no modifica el objeto.",
      "Devuelve un valor de tipo `number`.",
      "El valor depende de la fecha almacenada en el objeto `Date`.",
      "Usa la hora local del sistema.",
      "Si la fecha es inválida, devuelve `NaN`.",
    ],
    paraQueSirve: [
      "Mostrar el día actual.",
      "Formatear fechas.",
      "Crear calendarios.",
      "Validar fechas.",
      "Realizar operaciones relacionadas con días del mes.",
      "Generar reportes con fechas.",
    ],
    comoFunciona: [
      "Se crea un objeto `Date`.",
      "Se llama al método `getDate()`.",
      "JavaScript obtiene el día del mes según la hora local.",
      "Devuelve un número entre `1` y `31`.",
      "Si la fecha es inválida, devuelve `NaN`.",
    ],
    sintaxis: [
      {
        code: `const dia = fecha.getDate();`,
      },
      {
        caption: "El primer día del mes es 1, no 0:",
        code: `new Date("2026-08-01").getDate(); // 1`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** un `number` entre `1` y `31`, o `NaN` si la fecha es inválida.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Día de una fecha",
        code: `const fecha = new Date("2026-07-22");
console.log(fecha.getDate()); // 22`,
      },
      {
        titulo: "Ejemplo 2: Primer día del mes",
        code: `const fecha = new Date("2026-08-01");
console.log(fecha.getDate()); // 1`,
      },
      {
        titulo: "Ejemplo 3: Último día de enero",
        code: `const fecha = new Date("2026-01-31");
console.log(fecha.getDate()); // 31`,
      },
      {
        titulo: "Ejemplo 4: Diferencia con getDay()",
        code: `const fecha = new Date("2026-07-22");
console.log(fecha.getDate()); // 22 (día del mes)
console.log(fecha.getDay());  // 3  (miércoles)`,
      },
      {
        titulo: "Ejemplo 5: Fecha inválida",
        code: `const fecha = new Date("Fecha inválida");
console.log(fecha.getDate()); // NaN`,
      },
    ],
    errores: [
      {
        texto: "**Confundir `getDate()` con `getDay()`:** el primero es el día del mes; el segundo, el día de la semana.",
        code: `const fecha = new Date("2026-07-22");
console.log(fecha.getDate()); // 22
console.log(fecha.getDay());  // 3`,
      },
      {
        texto: "**Pensar que los días empiezan en 0:** el primer día del mes es `1`.",
        code: `console.log(new Date("2026-07-01").getDate()); // 1`,
      },
      {
        texto: "**Llamarlo sobre una fecha inválida:** devuelve `NaN`.",
        code: `console.log(new Date("abc").getDate()); // NaN`,
      },
    ],
    casos: [
      "**Mostrar la fecha actual** en una interfaz.",
      "**Crear calendarios** y resaltar el día de hoy.",
      "**Validar días del mes** (por ejemplo, el 31 solo existe en algunos meses).",
      "**Generar reportes diarios.**",
      "**Formatear fechas** para el usuario.",
    ],
    relacion: [
      "**`getUTCDate()`:** día del mes en UTC.",
      "**`setDate()`:** establece el día del mes.",
      "**`getDay()`:** día de la semana (0-6).",
      "**`getMonth()`:** mes (0-11).",
      "**`getFullYear()`:** año completo.",
    ],
    analogia:
      "Imagina un **calendario de pared**. Cuando miras un cuadro concreto, por ejemplo «22 de julio», el número **22** es el día del mes: eso es exactamente lo que devuelve `getDate()`. No responde «¿es miércoles?», solo «¿qué número de día es dentro del mes?».",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** `getDate()` = día del mes (1-31); `getDay()` = día de la semana (0-6).",
      "El primer día del mes es `1`, no `0`.",
      "Devuelve un `number`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve getDate() para el 22 de julio?",
        ["22", "3", "7", "Julio"],
        0,
      ],
      [
        "¿Cuál es el rango de valores de getDate()?",
        ["0-30", "1-31", "0-6", "1-12"],
        1,
      ],
      [
        "¿Qué devuelve getDay() para el 22 de julio de 2026?",
        ["22", "3", "7", "1"],
        1,
      ],
      [
        "¿Cuál es el primer día del mes según getDate()?",
        ["0", "1", "31", "Depende del mes"],
        1,
      ],
      [
        "¿Qué devuelve getDate() en una fecha inválida?",
        ["0", "NaN", "1", "Un error"],
        1,
      ],
      [
        "¿getDate() modifica la fecha?",
        ["Sí", "No, es un getter", "Solo en UTC", "Solo en modo estricto"],
        1,
      ],
    ]),
  },

  /* ============================== getDay() ============================= */
  getday: {
    id: "getday",
    titulo: "Date.prototype.getDay()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que devuelve el **día de la semana** según la hora local, como un número entre **0 y 6**.",
      "**Importante:** `getDay()` devuelve el día de la semana, **no** el día del mes.",
    ],
    queEs: [
      "Es un **getter**: no modifica el objeto.",
      "Devuelve un valor de tipo `number`.",
      "Usa la hora local del sistema.",
      "La semana empieza en **domingo (`0`)**.",
      "Si la fecha es inválida, devuelve `NaN`.",
    ],
    paraQueSirve: [
      "Mostrar el nombre del día de la semana.",
      "Crear calendarios.",
      "Verificar si una fecha es fin de semana.",
      "Programar tareas según el día.",
      "Realizar validaciones relacionadas con días laborales.",
    ],
    comoFunciona: [
      "Se crea un objeto `Date`.",
      "Se llama a `getDay()`.",
      "JavaScript calcula el día de la semana correspondiente.",
      "Devuelve un número entre `0` y `6`.",
      "Si la fecha es inválida, devuelve `NaN`.",
    ],
    sintaxis: [
      {
        code: `const diaSemana = fecha.getDay();`,
      },
      {
        caption: "Tabla de valores:",
        code: `0 → Domingo
1 → Lunes
2 → Martes
3 → Miércoles
4 → Jueves
5 → Viernes
6 → Sábado`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** un `number` entre `0` y `6`, o `NaN` si la fecha es inválida.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Día de la semana de una fecha",
        code: `const fecha = new Date("2026-07-22");
console.log(fecha.getDay()); // 3 (miércoles)`,
      },
      {
        titulo: "Ejemplo 2: Mostrar el nombre del día",
        code: `const dias = [
  "Domingo", "Lunes", "Martes", "Miércoles",
  "Jueves", "Viernes", "Sábado",
];

const fecha = new Date();
console.log(dias[fecha.getDay()]);`,
      },
      {
        titulo: "Ejemplo 3: Verificar si es fin de semana",
        code: `const dia = new Date().getDay();
const esFinDeSemana = dia === 0 || dia === 6;
console.log(esFinDeSemana);`,
      },
      {
        titulo: "Ejemplo 4: Diferencia con getDate()",
        code: `const fecha = new Date("2026-07-22");
console.log(fecha.getDay());  // 3
console.log(fecha.getDate()); // 22`,
      },
      {
        titulo: "Ejemplo 5: Fecha inválida",
        code: `const fecha = new Date("Fecha inválida");
console.log(fecha.getDay()); // NaN`,
      },
    ],
    errores: [
      {
        texto: "**Confundir `getDay()` con `getDate()`:** `getDay()` es el día de la semana; `getDate()`, el día del mes.",
        code: `const fecha = new Date("2026-07-22");
console.log(fecha.getDay());  // 3
console.log(fecha.getDate()); // 22`,
      },
      {
        texto: "**Pensar que el lunes es 0:** la semana empieza en **domingo**.",
        code: `// 0 → Domingo, 1 → Lunes, ..., 6 → Sábado
console.log(new Date(2026, 6, 20).getDay()); // 1 (lunes)`,
      },
      {
        texto: "**Llamarlo sobre una fecha inválida:** devuelve `NaN`.",
        code: `console.log(new Date("abc").getDay()); // NaN`,
      },
    ],
    casos: [
      "**Mostrar el nombre del día actual.**",
      "**Determinar si una fecha es laboral.**",
      "**Verificar fines de semana.**",
      "**Programar recordatorios** según el día.",
      "**Construir calendarios** con las columnas de la semana.",
    ],
    relacion: [
      "**`getUTCDay()`:** día de la semana en UTC.",
      "**`getDate()`:** día del mes (1-31).",
      "**`getMonth()`:** mes (0-11).",
      "**`getFullYear()`:** año completo.",
      "**`getHours()`:** hora local.",
    ],
    analogia:
      "Mirando el mismo calendario: `getDate()` responde «¿qué número tiene este día dentro del mes?» → `22`; mientras que `getDay()` responde «¿qué día de la semana es?» → *miércoles*. Son dos preguntas distintas sobre el mismo cuadro.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** `getDay()` va de `0` (domingo) a `6` (sábado).",
      "No existe `setDay()`: el día de la semana se deriva de la fecha.",
      "Devuelve un `number`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve getDay() para un miércoles?",
        ["3", "22", "2", "4"],
        0,
      ],
      [
        "¿Qué día corresponde al valor 0?",
        ["Lunes", "Domingo", "Sábado", "Viernes"],
        1,
      ],
      [
        "¿Qué día corresponde al valor 6?",
        ["Domingo", "Sábado", "Viernes", "Lunes"],
        1,
      ],
      [
        "¿Cuál es el rango de getDay()?",
        ["1-7", "0-6", "1-31", "0-11"],
        1,
      ],
      [
        "¿Qué devuelve getDay() en una fecha inválida?",
        ["0", "NaN", "null", "Un error"],
        1,
      ],
      [
        "¿Existe setDay() para cambiar el día de la semana?",
        ["Sí", "No, no existe", "Solo en UTC", "Solo en Node.js"],
        1,
      ],
    ]),
  },

  /* ============================= getHours() ============================ */
  gethours: {
    id: "gethours",
    titulo: "Date.prototype.getHours()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que devuelve la **hora** de una fecha según la hora local, como un número entre **0 y 23**.",
      "**Importante:** usa el formato de **24 horas**, no el de 12 horas.",
    ],
    queEs: [
      "Es un **getter**: no modifica el objeto.",
      "Devuelve un valor de tipo `number`.",
      "Usa la zona horaria local del sistema.",
      "Para la hora en UTC se usa `getUTCHours()`.",
      "Si la fecha es inválida, devuelve `NaN`.",
    ],
    paraQueSirve: [
      "Mostrar la hora actual.",
      "Crear relojes digitales.",
      "Validar horarios.",
      "Programar tareas según la hora.",
      "Formatear fechas y horas.",
      "Registrar eventos con fecha y hora.",
    ],
    comoFunciona: [
      "Se crea un objeto `Date`.",
      "Se llama al método `getHours()`.",
      "JavaScript obtiene la hora local almacenada en el objeto.",
      "Devuelve un número entre `0` y `23`.",
      "Si la fecha es inválida, devuelve `NaN`.",
    ],
    sintaxis: [
      {
        code: `const hora = fecha.getHours();`,
      },
      {
        caption: "La medianoche es 0 y la última hora del día es 23:",
        code: `new Date("2026-07-22T00:00:00").getHours(); // 0
new Date("2026-07-22T23:59:59").getHours(); // 23`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** un `number` entre `0` y `23`, o `NaN` si la fecha es inválida.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Hora de una fecha",
        code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.getHours()); // 18`,
      },
      {
        titulo: "Ejemplo 2: Medianoche",
        code: `const fecha = new Date("2026-07-22T00:00:00");
console.log(fecha.getHours()); // 0`,
      },
      {
        titulo: "Ejemplo 3: Última hora del día",
        code: `const fecha = new Date("2026-07-22T23:59:59");
console.log(fecha.getHours()); // 23`,
      },
      {
        titulo: "Ejemplo 4: Diferencia con getUTCHours()",
        code: `const fecha = new Date("2026-07-22T18:45:30Z");
console.log(fecha.getHours());    // hora local
console.log(fecha.getUTCHours()); // 18`,
      },
      {
        titulo: "Ejemplo 5: Fecha inválida",
        code: `const fecha = new Date("Fecha inválida");
console.log(fecha.getHours()); // NaN`,
      },
    ],
    errores: [
      {
        texto: "**Pensar que devuelve el formato de 12 horas:** devuelve `15`, no `3 PM`.",
        code: `const fecha = new Date("2026-07-22T15:00:00");
console.log(fecha.getHours()); // 15`,
      },
      {
        texto: "**Confundir `getHours()` con `getUTCHours()`:** el primero usa la hora local.",
        code: `const fecha = new Date();
console.log(fecha.getHours());    // local
console.log(fecha.getUTCHours()); // UTC`,
      },
      {
        texto: "**Llamarlo sobre una fecha inválida:** devuelve `NaN`.",
        code: `console.log(new Date("abc").getHours()); // NaN`,
      },
    ],
    casos: [
      "**Mostrar la hora actual.**",
      "**Crear relojes digitales.**",
      "**Programar recordatorios.**",
      "**Validar horarios de atención.**",
      "**Registrar eventos con fecha y hora.**",
    ],
    relacion: [
      "**`getUTCHours()`:** hora en UTC.",
      "**`setHours()`:** establece la hora.",
      "**`getMinutes()`:** minutos (0-59).",
      "**`getSeconds()`:** segundos (0-59).",
      "**`getMilliseconds()`:** milisegundos (0-999).",
    ],
    analogia:
      "Imagina un **reloj digital** que muestra `18:45:30`. Cada método obtiene una parte distinta: `getHours()` → `18`, `getMinutes()` → `45` y `getSeconds()` → `30`. `getHours()` solo se fija en la hora e ignora los minutos y los segundos.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** `getHours()` va de `0` a `23` (formato 24 h).",
      "Usa `getUTCHours()` si necesitas la hora en UTC.",
      "Devuelve un `number`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve getHours() para las 18:45:30?",
        ["18", "45", "30", "6"],
        0,
      ],
      [
        "¿Cuál es el rango de getHours()?",
        ["0-12", "0-23", "1-24", "0-59"],
        1,
      ],
      [
        "¿Qué devuelve getHours() a medianoche?",
        ["0", "12", "24", "NaN"],
        0,
      ],
      [
        "¿Qué método devuelve la hora en UTC?",
        ["getHours()", "getUTCHours()", "getTime()", "getDay()"],
        1,
      ],
      [
        "¿getHours() usa formato de 12 o 24 horas?",
        ["12 horas", "24 horas", "Depende del locale", "Depende del navegador"],
        1,
      ],
      [
        "¿Qué devuelve getHours() en una fecha inválida?",
        ["0", "NaN", "null", "Un error"],
        1,
      ],
    ]),
  },

  /* ============================ getMinutes() =========================== */
  getminutes: {
    id: "getminutes",
    titulo: "Date.prototype.getMinutes()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que devuelve los **minutos** de una fecha según la hora local, como un número entre **0 y 59**.",
      "**Importante:** devuelve únicamente los minutos, no la hora completa.",
    ],
    queEs: [
      "Es un **getter**: no modifica el objeto.",
      "Devuelve un valor de tipo `number`.",
      "Usa la zona horaria local del sistema.",
      "Para los minutos en UTC se usa `getUTCMinutes()`.",
      "Si la fecha es inválida, devuelve `NaN`.",
    ],
    paraQueSirve: [
      "Mostrar los minutos actuales.",
      "Crear relojes digitales.",
      "Formatear horas.",
      "Validar horarios.",
      "Programar tareas según la hora.",
      "Registrar eventos con precisión.",
    ],
    comoFunciona: [
      "Se crea un objeto `Date`.",
      "Se llama al método `getMinutes()`.",
      "JavaScript obtiene los minutos de la hora local.",
      "Devuelve un número entre `0` y `59`.",
      "Si la fecha es inválida, devuelve `NaN`.",
    ],
    sintaxis: [
      {
        code: `const minutos = fecha.getMinutes();`,
      },
      {
        caption: "Rellena con cero para mostrar dos dígitos:",
        code: `String(fecha.getMinutes()).padStart(2, "0");`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** un `number` entre `0` y `59`, o `NaN` si la fecha es inválida.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Minutos de una fecha",
        code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.getMinutes()); // 45`,
      },
      {
        titulo: "Ejemplo 2: Hora exacta",
        code: `const fecha = new Date("2026-07-22T14:00:00");
console.log(fecha.getMinutes()); // 0`,
      },
      {
        titulo: "Ejemplo 3: Último minuto de la hora",
        code: `const fecha = new Date("2026-07-22T18:59:59");
console.log(fecha.getMinutes()); // 59`,
      },
      {
        titulo: "Ejemplo 4: Diferencia con getMonth()",
        code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.getMinutes()); // 45
console.log(fecha.getMonth());   // 6`,
      },
      {
        titulo: "Ejemplo 5: Fecha inválida",
        code: `const fecha = new Date("Fecha inválida");
console.log(fecha.getMinutes()); // NaN`,
      },
    ],
    errores: [
      {
        texto: "**Confundir `getMinutes()` con `getMonth()`:** uno devuelve los minutos y el otro el mes.",
        code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.getMinutes()); // 45
console.log(fecha.getMonth());   // 6`,
      },
      {
        texto: "**Pensar que devuelve la hora completa:** solo devuelve los minutos.",
        code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.getMinutes()); // 45 (no "18:45")`,
      },
      {
        texto: "**Llamarlo sobre una fecha inválida:** devuelve `NaN`.",
        code: `console.log(new Date("abc").getMinutes()); // NaN`,
      },
    ],
    casos: [
      "**Mostrar los minutos actuales.**",
      "**Crear relojes digitales.**",
      "**Validar horarios.**",
      "**Registrar eventos con precisión.**",
      "**Formatear fechas y horas.**",
    ],
    relacion: [
      "**`getUTCMinutes()`:** minutos en UTC.",
      "**`setMinutes()`:** establece los minutos.",
      "**`getHours()`:** hora (0-23).",
      "**`getSeconds()`:** segundos (0-59).",
      "**`getMilliseconds()`:** milisegundos (0-999).",
    ],
    analogia:
      "En el mismo reloj digital `18:45:30`, `getMinutes()` solo observa la **parte central**: los minutos (`45`). No le importan la hora ni los segundos.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** `getMinutes()` va de `0` a `59`.",
      "No lo confundas con `getMonth()` (mes).",
      "Devuelve un `number`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve getMinutes() para las 18:45:30?",
        ["18", "45", "30", "6"],
        1,
      ],
      [
        "¿Cuál es el rango de getMinutes()?",
        ["0-23", "0-59", "1-60", "0-11"],
        1,
      ],
      [
        "¿Qué devuelve getMinutes() a la hora exacta 14:00?",
        ["0", "14", "60", "NaN"],
        0,
      ],
      [
        "¿Qué método devuelve los minutos en UTC?",
        ["getMinutes()", "getUTCMinutes()", "getTime()", "getMonth()"],
        1,
      ],
      [
        "¿Qué devuelve getMinutes() en una fecha inválida?",
        ["0", "NaN", "null", "Un error"],
        1,
      ],
      [
        "¿Qué diferencia hay entre getMinutes() y getMonth()?",
        [
          "Son iguales",
          "getMinutes devuelve minutos y getMonth devuelve el mes",
          "getMonth devuelve minutos y getMinutes el mes",
          "Ninguno existe",
        ],
        1,
      ],
    ]),
  },

  /* ============================ getSeconds() =========================== */
  getseconds: {
    id: "getseconds",
    titulo: "Date.prototype.getSeconds()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que devuelve los **segundos** de una fecha según la hora local, como un número entre **0 y 59**.",
      "**Importante:** devuelve únicamente los segundos, no la hora completa.",
    ],
    queEs: [
      "Es un **getter**: no modifica el objeto.",
      "Devuelve un valor de tipo `number`.",
      "Usa la zona horaria local del sistema.",
      "Para los segundos en UTC se usa `getUTCSeconds()`.",
      "Si la fecha es inválida, devuelve `NaN`.",
    ],
    paraQueSirve: [
      "Mostrar los segundos actuales.",
      "Crear cronómetros y relojes.",
      "Medir el paso del tiempo.",
      "Formatear fechas y horas.",
      "Registrar eventos con precisión.",
      "Actualizar interfaces en tiempo real.",
    ],
    comoFunciona: [
      "Se crea un objeto `Date`.",
      "Se llama al método `getSeconds()`.",
      "JavaScript obtiene los segundos de la hora local.",
      "Devuelve un número entre `0` y `59`.",
      "Si la fecha es inválida, devuelve `NaN`.",
    ],
    sintaxis: [
      {
        code: `const segundos = fecha.getSeconds();`,
      },
      {
        caption: "No confundir con los milisegundos:",
        code: `new Date("2026-07-22T18:45:30.500").getSeconds();      // 30
new Date("2026-07-22T18:45:30.500").getMilliseconds(); // 500`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** un `number` entre `0` y `59`, o `NaN` si la fecha es inválida.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Segundos de una fecha",
        code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.getSeconds()); // 30`,
      },
      {
        titulo: "Ejemplo 2: Inicio del minuto",
        code: `const fecha = new Date("2026-07-22T14:15:00");
console.log(fecha.getSeconds()); // 0`,
      },
      {
        titulo: "Ejemplo 3: Último segundo del minuto",
        code: `const fecha = new Date("2026-07-22T18:59:59");
console.log(fecha.getSeconds()); // 59`,
      },
      {
        titulo: "Ejemplo 4: Diferencia con getMilliseconds()",
        code: `const fecha = new Date("2026-07-22T18:45:30.500");
console.log(fecha.getSeconds());      // 30
console.log(fecha.getMilliseconds()); // 500`,
      },
      {
        titulo: "Ejemplo 5: Fecha inválida",
        code: `const fecha = new Date("Fecha inválida");
console.log(fecha.getSeconds()); // NaN`,
      },
    ],
    errores: [
      {
        texto: "**Confundir `getSeconds()` con `getMilliseconds()`:** uno devuelve segundos y el otro milisegundos.",
        code: `const fecha = new Date("2026-07-22T18:45:30.500");
console.log(fecha.getSeconds());      // 30
console.log(fecha.getMilliseconds()); // 500`,
      },
      {
        texto: "**Pensar que devuelve la hora completa:** solo devuelve los segundos.",
        code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.getSeconds()); // 30 (no "18:45:30")`,
      },
      {
        texto: "**Llamarlo sobre una fecha inválida:** devuelve `NaN`.",
        code: `console.log(new Date("abc").getSeconds()); // NaN`,
      },
    ],
    casos: [
      "**Mostrar los segundos actuales.**",
      "**Crear cronómetros y relojes.**",
      "**Registrar eventos con precisión.**",
      "**Actualizar interfaces en tiempo real.**",
      "**Medir intervalos de tiempo.**",
    ],
    relacion: [
      "**`getUTCSeconds()`:** segundos en UTC.",
      "**`setSeconds()`:** establece los segundos.",
      "**`getHours()`:** hora (0-23).",
      "**`getMinutes()`:** minutos (0-59).",
      "**`getMilliseconds()`:** milisegundos (0-999).",
    ],
    analogia:
      "En un **cronómetro** que muestra `18:45:30`, `getSeconds()` solo observa la **parte final**: los segundos (`30`). Los milisegundos serían la parte aún más fina del mismo cronómetro.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** `getSeconds()` va de `0` a `59`.",
      "No lo confundas con `getMilliseconds()` (0-999).",
      "Devuelve un `number`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve getSeconds() para las 18:45:30?",
        ["18", "45", "30", "500"],
        2,
      ],
      [
        "¿Cuál es el rango de getSeconds()?",
        ["0-23", "0-59", "0-999", "0-11"],
        1,
      ],
      [
        "¿Qué devuelve getMilliseconds() para 18:45:30.500?",
        ["30", "500", "0", "59"],
        1,
      ],
      [
        "¿Qué método devuelve los segundos en UTC?",
        ["getSeconds()", "getUTCSeconds()", "getTime()", "getMinutes()"],
        1,
      ],
      [
        "¿Qué devuelve getSeconds() en una fecha inválida?",
        ["0", "NaN", "null", "Un error"],
        1,
      ],
      [
        "¿Qué devuelve getSeconds() en el inicio de un minuto?",
        ["0", "1", "60", "NaN"],
        0,
      ],
    ]),
  },

  /* =========================== setFullYear() =========================== */
  setfullyear: {
    id: "setfullyear",
    titulo: "Date.prototype.setFullYear()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que **establece el año completo** de un objeto `Date` según la hora local, pudiendo también establecer opcionalmente el **mes** y el **día**.",
      "A diferencia de `setYear()` (obsoleto, de 2 dígitos), `setFullYear()` trabaja con el año completo de 4 dígitos.",
    ],
    queEs: [
      "Es un **setter mutable**: modifica el objeto `Date` original, no crea uno nuevo.",
      "Mantiene la hora, los minutos, los segundos y los milisegundos existentes.",
      "Si no se pasan `month` ni `day`, conserva los actuales.",
      "Admite años negativos (años antes de Cristo).",
      "Actualiza el *timestamp* interno del objeto.",
      "Devuelve el nuevo *timestamp* en milisegundos.",
    ],
    paraQueSirve: [
      "Actualizar el año de una fecha existente.",
      "Crear fechas modificando solo el año.",
      "Implementar cálculos de fechas (por ejemplo, sumar años).",
      "Establecer fechas límite de expiración o renovación.",
      "Corregir años incorrectos en fechas.",
      "Generar fechas recurrentes anuales (aniversarios, cumpleaños).",
      "Implementar navegación de calendarios por año.",
    ],
    comoFunciona: [
      "Modifica el año del objeto `Date` según la hora local.",
      "Si se proporcionan `month` y `day`, también se actualizan.",
      "Los **meses van de 0 a 11**.",
      "Los valores fuera de rango se ajustan automáticamente (*overflow*).",
      "Si algún parámetro es inválido, el objeto queda como fecha inválida.",
      "Retorna el *timestamp* en milisegundos del objeto modificado.",
    ],
    sintaxis: [
      {
        code: `fecha.setFullYear(year)
fecha.setFullYear(year, month)
fecha.setFullYear(year, month, day)`,
      },
      {
        caption: "El mes es base 0 (0 = enero, 11 = diciembre):",
        code: `const date = new Date(2024, 5, 15);
date.setFullYear(2025, 0, 1);
console.log(date.toISOString()); // 2025-01-01...`,
      },
    ],
    nota: "**Parámetros:** `year` (obligatorio, año completo), `month` (opcional, 0-11) y `day` (opcional, 1-31). **Retorno:** el *timestamp* en milisegundos del objeto modificado.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Cambiar solo el año",
        code: `const date = new Date(2024, 11, 25, 10, 30);
date.setFullYear(2025);

console.log(date.getFullYear()); // 2025
console.log(date.getMonth());    // 11 (se mantiene)
console.log(date.getDate());     // 25 (se mantiene)
console.log(date.getHours());    // 10 (se mantiene)`,
      },
      {
        titulo: "Ejemplo 2: Año, mes y día",
        code: `const date = new Date(2024, 5, 15);
date.setFullYear(2025, 0, 1);
console.log(date.toISOString()); // 2025-01-01T...`,
      },
      {
        titulo: "Ejemplo 3: Sumar años",
        code: `function addYears(date, years) {
  const newDate = new Date(date);
  newDate.setFullYear(newDate.getFullYear() + years);
  return newDate;
}

const start = new Date(2024, 0, 1);
console.log(addYears(start, 5).getFullYear()); // 2029`,
      },
      {
        titulo: "Ejemplo 4: Ajuste automático (31 de febrero)",
        code: `const date = new Date(2024, 0, 31); // 31 de enero
date.setFullYear(2024, 1, 31);      // 31 de febrero

console.log(date.getMonth()); // 2 (marzo)
console.log(date.getDate());  // 2 (2 de marzo)`,
      },
      {
        titulo: "Ejemplo 5: Renovar una suscripción",
        code: `function renewSubscription(subscription) {
  const nueva = new Date(subscription.expiryDate);
  nueva.setFullYear(nueva.getFullYear() + 1);
  subscription.expiryDate = nueva;
  return subscription;
}

const sub = { userId: 1, expiryDate: new Date(2024, 11, 31) };
renewSubscription(sub);
console.log(sub.expiryDate.getFullYear()); // 2025`,
      },
      {
        titulo: "Ejemplo 6: Valor inválido",
        code: `const date = new Date();
date.setFullYear(NaN);
console.log(Number.isNaN(date.getTime())); // true`,
      },
    ],
    errores: [
      {
        texto: "**Usar `setYear()` en lugar de `setFullYear()`:** `setYear()` está obsoleto.",
        code: `// ❌ Obsoleto
date.setYear(2024);

// ✅ Correcto
date.setFullYear(2024);`,
      },
      {
        texto: "**Pasar años de 2 dígitos:** `99` establece el año 99 d.C., no 1999.",
        code: `date.setFullYear(99);   // año 99
date.setFullYear(1999); // año 1999`,
      },
      {
        texto: "**Olvidar que los meses empiezan en 0:** el mes `12` produce *overflow* a enero del año siguiente.",
        code: `date.setFullYear(2024, 12, 1); // enero de 2025
date.setFullYear(2024, 11, 1); // diciembre de 2024`,
      },
      {
        texto: "**Olvidar que modifica el objeto original:** si necesitas conservar la fecha, clónala antes.",
        code: `const original = new Date(2024, 0, 1);
const copy = original; // ⚠️ misma referencia
copy.setFullYear(2025);
console.log(original.getFullYear()); // 2025

// ✅ Copia independiente
const copia = new Date(original);`,
      },
    ],
    casos: [
      "**Renovación de suscripciones y licencias** anuales.",
      "**Cumpleaños y aniversarios:** mover la fecha al año actual.",
      "**Navegación de calendarios:** cambiar de año.",
      "**Fechas límite** de expiración o vencimiento.",
      "**Corrección de datos** con años mal ingresados.",
    ],
    relacion: [
      "**`getFullYear()`:** obtiene el año.",
      "**`setUTCFullYear()`:** establece el año en UTC.",
      "**`setYear()`:** obsoleto.",
      "**`setMonth()`:** establece el mes.",
      "**`setDate()`:** establece el día del mes.",
    ],
    analogia:
      "`setFullYear()` es como **cambiar la hoja del año en un calendario de pared**: mueves solo el año y dejas intactos el mes, el día y la hora. Si fuerzas una combinación imposible (como el 31 de febrero), el calendario se ajusta solo al mes siguiente.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** `setFullYear(year, month, day)`; el mes es base 0.",
      "Es **mutable**: modifica el objeto original.",
      "Devuelve el *timestamp* en milisegundos.",
    ],
    quiz: Q([
      [
        "¿Qué hace setFullYear(2025) sobre una fecha de 2024?",
        [
          "Cambia solo el año y mantiene mes, día y hora",
          "Cambia el año y pone enero y día 1",
          "Devuelve una fecha nueva sin modificar la original",
          "Lanza un error",
        ],
        0,
      ],
      [
        "¿Qué rango tiene el parámetro month?",
        ["1-12", "0-11", "0-6", "1-31"],
        1,
      ],
      [
        "¿setFullYear() modifica el objeto original?",
        ["Sí, es mutable", "No, devuelve uno nuevo", "Solo en UTC", "Solo si el año es bisiesto"],
        0,
      ],
      [
        "¿Qué devuelve setFullYear()?",
        ["El objeto Date", "El año", "El timestamp en milisegundos", "undefined"],
        2,
      ],
      [
        "¿Qué ocurre con setFullYear(2024, 1, 31)?",
        [
          "Lanza un error",
          "Se ajusta al 2 de marzo",
          "Devuelve el 31 de febrero",
          "Devuelve Invalid Date",
        ],
        1,
      ],
      [
        "¿Qué método está obsoleto y no debería usarse?",
        ["setFullYear()", "setYear()", "getFullYear()", "setDate()"],
        1,
      ],
    ]),
  },

  /* ============================= setDate() ============================= */
  setdate: {
    id: "setdate",
    titulo: "Date.prototype.setDate()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que **establece el día del mes** (1-31) de un objeto `Date` según la hora local, ajustando automáticamente el mes y el año si es necesario.",
      "Permite cambiar el día manteniendo el mes y el año existentes, con manejo automático de *overflows*.",
    ],
    queEs: [
      "Es un **setter mutable**: modifica el objeto `Date` original.",
      "La hora, los minutos, los segundos y los milisegundos se mantienen.",
      "Admite valores fuera de rango y los ajusta automáticamente.",
      "`setDate(0)` devuelve el último día del mes anterior.",
      "**No existe `setDay()`**: el día de la semana se deriva de la fecha.",
      "Devuelve el nuevo *timestamp* en milisegundos.",
    ],
    paraQueSirve: [
      "Cambiar el día de una fecha existente.",
      "Sumar o restar días a una fecha.",
      "Implementar navegación de calendarios (día siguiente o anterior).",
      "Establecer fechas específicas dentro de un mes.",
      "Manejar ajustes automáticos de fin de mes.",
      "Generar fechas recurrentes (mismo día cada mes).",
      "Crear rangos de fechas día a día.",
    ],
    comoFunciona: [
      "Establece el día del mes (1-31) según la hora local.",
      "Si el día existe en el mes actual, se asigna directamente.",
      "Si el día es mayor que los días del mes, se ajusta al mes siguiente.",
      "Si el día es `0` o negativo, se ajusta al mes anterior.",
      "La hora y los minutos se mantienen sin cambios.",
      "Si el parámetro es inválido, el objeto queda como fecha inválida.",
    ],
    sintaxis: [
      {
        code: `fecha.setDate(day)`,
      },
      {
        caption: "Ajustes automáticos:",
        code: `// 32 de enero → 1 de febrero
new Date(2024, 0, 31).setDate(32);

// Día 0 → último día del mes anterior
new Date(2024, 0, 15).setDate(0); // 31 de diciembre de 2023`,
      },
    ],
    nota: "**Parámetro:** `day` (obligatorio), día del mes; se aceptan valores fuera de rango con ajuste automático. **Retorno:** el *timestamp* en milisegundos del objeto modificado.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Cambiar el día",
        code: `const date = new Date(2024, 11, 25);
date.setDate(15);

console.log(date.getDate());      // 15
console.log(date.getMonth());     // 11 (diciembre)
console.log(date.getFullYear());  // 2024`,
      },
      {
        titulo: "Ejemplo 2: Día mayor que los días del mes",
        code: `const date = new Date(2024, 0, 31); // 31 de enero
date.setDate(32);

console.log(date.getDate());  // 1
console.log(date.getMonth()); // 1 (febrero)`,
      },
      {
        titulo: "Ejemplo 3: Día 0 (último día del mes anterior)",
        code: `const date = new Date(2024, 0, 15);
date.setDate(0);

console.log(date.getDate());     // 31
console.log(date.getMonth());    // 11 (diciembre)
console.log(date.getFullYear()); // 2023`,
      },
      {
        titulo: "Ejemplo 4: Sumar días",
        code: `function addDays(date, days) {
  const nueva = new Date(date);
  nueva.setDate(nueva.getDate() + days);
  return nueva;
}

const start = new Date(2024, 0, 1);
console.log(addDays(start, 5).toISOString());  // 2024-01-06
console.log(addDays(start, 31).toISOString()); // 2024-02-01`,
      },
      {
        titulo: "Ejemplo 5: Último día del mes",
        code: `function getLastDayOfMonth(year, month) {
  return new Date(year, month + 1, 0).getDate();
}

console.log(getLastDayOfMonth(2024, 0)); // 31
console.log(getLastDayOfMonth(2024, 1)); // 29 (bisiesto)
console.log(getLastDayOfMonth(2023, 1)); // 28`,
      },
      {
        titulo: "Ejemplo 6: Generar un rango de fechas",
        code: `function dateRange(startDate, endDate) {
  const fechas = [];
  const actual = new Date(startDate);

  while (actual <= endDate) {
    fechas.push(new Date(actual));
    actual.setDate(actual.getDate() + 1);
  }
  return fechas;
}

console.log(dateRange(new Date(2024, 6, 1), new Date(2024, 6, 10)).length); // 10`,
      },
    ],
    errores: [
      {
        texto: "**No considerar el ajuste automático:** `setDate(32)` no da error, salta al mes siguiente.",
        code: `const date = new Date(2024, 0, 31);
date.setDate(32);
console.log(date.getDate()); // 1 (febrero)`,
      },
      {
        texto: "**Asumir que `setDate(0)` da error:** es válido y devuelve el último día del mes anterior.",
        code: `const date = new Date(2024, 0, 15);
date.setDate(0);
console.log(date.getDate()); // 31`,
      },
      {
        texto: "**Buscar `setDay()`:** no existe; solo se puede establecer el día del mes.",
        code: `// ❌ TypeError: date.setDay is not a function
date.setDay(1);

// ✅ Para el día del mes
date.setDate(1);`,
      },
      {
        texto: "**Olvidar que modifica el objeto original:** clona la fecha si necesitas conservarla.",
        code: `const original = new Date(2024, 6, 15);
const copy = original; // ⚠️ misma referencia
copy.setDate(20);
console.log(original.getDate()); // 20

const copia = new Date(original); // ✅ independiente`,
      },
    ],
    casos: [
      "**Navegación de calendario:** día siguiente y día anterior.",
      "**Rangos de fechas:** listar todos los días entre dos fechas.",
      "**Fin de mes:** calcular el último día del mes.",
      "**Fechas recurrentes:** el mismo día de cada mes.",
      "**Vencimientos:** sumar o restar días a una fecha.",
    ],
    relacion: [
      "**`getDate()`:** obtiene el día del mes.",
      "**`setUTCDate()`:** establece el día del mes en UTC.",
      "**`setMonth()`:** establece el mes.",
      "**`setFullYear()`:** establece el año.",
      "**`setHours()` / `setMinutes()`:** ajustan la parte horaria.",
    ],
    analogia:
      "`setDate()` es como **mover el dedo por un calendario**: si estás en el 31 de enero y avanzas un día más allá del último, el calendario pasa solo al 1 de febrero. Si retrocedes por debajo del día 1, retrocede al último día del mes anterior.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** `setDate(n)` fija el día del mes y ajusta mes y año si hace falta.",
      "`setDate(0)` = último día del mes anterior.",
      "No existe `setDay()`.",
    ],
    quiz: Q([
      [
        "¿Qué establece setDate(15)?",
        ["El mes", "El día del mes", "El día de la semana", "El año"],
        1,
      ],
      [
        "¿Qué ocurre con setDate(32) en enero?",
        ["Lanza un error", "Se ajusta al 1 de febrero", "Devuelve 32", "Devuelve Invalid Date"],
        1,
      ],
      [
        "¿Qué devuelve setDate(0) en enero?",
        [
          "0",
          "El último día de diciembre del año anterior",
          "El primer día de enero",
          "Un error",
        ],
        1,
      ],
      [
        "¿Existe setDay()?",
        ["Sí", "No, no existe", "Solo en UTC", "Solo en Node.js"],
        1,
      ],
      [
        "¿Qué devuelve setDate()?",
        ["El día", "El objeto Date", "El timestamp en milisegundos", "undefined"],
        2,
      ],
      [
        "¿Cómo se calcula el último día de un mes?",
        [
          "new Date(year, month + 1, 0).getDate()",
          "new Date(year, month, 32).getDate()",
          "new Date(year, month).getDate()",
          "new Date(year, month, 1).getDate()",
        ],
        0,
      ],
    ]),
  },

  /* ============================= setHours() ============================ */
  sethours: {
    id: "sethours",
    titulo: "Date.prototype.setHours()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que **establece las horas** (0-23) de un objeto `Date` según la hora local, pudiendo también establecer opcionalmente los **minutos**, **segundos** y **milisegundos**.",
      "Permite cambiar la hora manteniendo el resto de componentes, con manejo automático de *overflows*.",
    ],
    queEs: [
      "Es un **setter mutable**: modifica el objeto `Date` original.",
      "Si solo se pasan horas, se mantienen los minutos, segundos y milisegundos.",
      "Los valores fuera de rango se ajustan automáticamente.",
      "Trabaja con la **hora local**, no con UTC.",
      "Devuelve el nuevo *timestamp* en milisegundos.",
    ],
    paraQueSirve: [
      "Cambiar la hora de una fecha existente.",
      "Sumar o restar horas a una fecha.",
      "Implementar temporizadores y cronómetros.",
      "Ajustar horas para conversiones de zona horaria.",
      "Establecer horas exactas (medianoche, mediodía, fin del día).",
      "Manejar ajustes automáticos de días.",
      "Crear marcas de tiempo con precisión horaria.",
    ],
    comoFunciona: [
      "Establece las horas (0-23) y opcionalmente minutos, segundos y milisegundos.",
      "Si solo se pasan horas, conserva el resto de componentes.",
      "Horas mayores que 23 se ajustan al día siguiente.",
      "Horas negativas se ajustan al día anterior.",
      "Los minutos, segundos y milisegundos también se ajustan si están fuera de rango.",
      "Retorna el *timestamp* en milisegundos del objeto modificado.",
    ],
    sintaxis: [
      {
        code: `fecha.setHours(hours)
fecha.setHours(hours, minutes)
fecha.setHours(hours, minutes, seconds)
fecha.setHours(hours, minutes, seconds, milliseconds)`,
      },
      {
        caption: "Valores fuera de rango:",
        code: `// 25 h → 1:00 del día siguiente
new Date(2024, 11, 25, 10, 30).setHours(25);

// -1 h → 23:00 del día anterior
new Date(2024, 11, 25, 10, 30).setHours(-1);`,
      },
    ],
    nota: "**Parámetros:** `hours` (obligatorio, 0-23), `minutes` (0-59), `seconds` (0-59) y `milliseconds` (0-999), todos opcionales. **Retorno:** el *timestamp* en milisegundos del objeto modificado.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Cambiar solo las horas",
        code: `const date = new Date(2024, 11, 25, 10, 30);
date.setHours(15);

console.log(date.getHours());   // 15
console.log(date.getMinutes()); // 30 (se mantiene)`,
      },
      {
        titulo: "Ejemplo 2: Horas, minutos, segundos y milisegundos",
        code: `const date = new Date(2024, 11, 25, 10, 30, 45, 500);
date.setHours(15, 20, 30, 200);

console.log(date.getHours());        // 15
console.log(date.getMinutes());      // 20
console.log(date.getSeconds());      // 30
console.log(date.getMilliseconds()); // 200`,
      },
      {
        titulo: "Ejemplo 3: Ajuste automático",
        code: `const date = new Date(2024, 11, 25, 10, 30);
date.setHours(25);

console.log(date.getHours()); // 1
console.log(date.getDate());  // 26 (día siguiente)`,
      },
      {
        titulo: "Ejemplo 4: Sumar horas",
        code: `function addHours(date, hours) {
  const nueva = new Date(date);
  nueva.setHours(nueva.getHours() + hours);
  return nueva;
}

const start = new Date(2024, 11, 25, 10, 30);
console.log(addHours(start, 5).getHours());  // 15
console.log(addHours(start, 25).getDate());  // 26
console.log(addHours(start, -3).getHours()); // 7`,
      },
      {
        titulo: "Ejemplo 5: Medianoche y fin del día",
        code: `function setMidnight(date) {
  const nueva = new Date(date);
  nueva.setHours(0, 0, 0, 0);
  return nueva;
}

function setEndOfDay(date) {
  const nueva = new Date(date);
  nueva.setHours(23, 59, 59, 999);
  return nueva;
}

const d = new Date(2024, 11, 25, 10, 30);
console.log(setMidnight(d).getHours()); // 0
console.log(setEndOfDay(d).getHours()); // 23`,
      },
      {
        titulo: "Ejemplo 6: Redondear a la hora más cercana",
        code: `function roundToNearestHour(date) {
  const nueva = new Date(date);
  if (nueva.getMinutes() >= 30) {
    nueva.setHours(nueva.getHours() + 1, 0, 0, 0);
  } else {
    nueva.setHours(nueva.getHours(), 0, 0, 0);
  }
  return nueva;
}

console.log(roundToNearestHour(new Date(2024, 11, 25, 10, 29)).getHours()); // 10
console.log(roundToNearestHour(new Date(2024, 11, 25, 10, 30)).getHours()); // 11`,
      },
    ],
    errores: [
      {
        texto: "**Pasar horas fuera de rango sin entender el ajuste:** `setHours(25)` cambia también el día.",
        code: `const date = new Date(2024, 11, 25, 10, 30);
date.setHours(25);
console.log(date.getHours()); // 1
console.log(date.getDate());  // 26`,
      },
      {
        texto: "**Confundir el orden de parámetros:** es `setHours(hours, minutes, seconds, milliseconds)`.",
        code: `// ❌ setHours(minutes, hours)
// ✅ setHours(hours, minutes)`,
      },
      {
        texto: "**No considerar la zona horaria:** `setHours()` trabaja en hora local.",
        code: `const date = new Date("2024-12-25T10:30:00Z");
date.setHours(15); // modifica la hora local, no la UTC`,
      },
      {
        texto: "**Olvidar que modifica el objeto original:** clona la fecha si necesitas conservarla.",
        code: `const original = new Date(2024, 11, 25, 10, 30);
const copy = original; // ⚠️ misma referencia
copy.setHours(15);
console.log(original.getHours()); // 15

const copia = new Date(original); // ✅ independiente`,
      },
    ],
    casos: [
      "**Establecer medianoche** para comparar solo fechas.",
      "**Temporizadores y cronómetros.**",
      "**Horarios de atención** y validaciones.",
      "**Sumar o restar horas** a una fecha.",
      "**Redondear horas** en agendas y citas.",
    ],
    relacion: [
      "**`getHours()`:** obtiene la hora.",
      "**`setUTCHours()`:** establece la hora en UTC.",
      "**`setMinutes()`:** establece los minutos.",
      "**`setDate()`:** cambia el día del mes.",
      "**`setFullYear()`:** cambia el año.",
    ],
    analogia:
      "`setHours()` es como **girar la manecilla de las horas** de un reloj: puedes moverla solo a otra hora y los minutos siguen donde estaban. Si giras más allá de las 23, el reloj avanza también al día siguiente.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** `setHours(hours, minutes, seconds, ms)` y los valores fuera de rango se ajustan solos.",
      "Es **mutable**: modifica el objeto original.",
      "Usa `setUTCHours()` si trabajas en UTC.",
    ],
    quiz: Q([
      [
        "¿Qué establece setHours(15)?",
        [
          "Solo la hora y mantiene los minutos",
          "La hora y pone los minutos a 0",
          "El día",
          "El timestamp",
        ],
        0,
      ],
      [
        "¿Qué ocurre con setHours(25)?",
        [
          "Lanza un error",
          "Pasa a la 1:00 del día siguiente",
          "Devuelve 25",
          "Devuelve Invalid Date",
        ],
        1,
      ],
      [
        "¿Qué devuelve setHours()?",
        ["La hora", "El objeto Date", "El timestamp en milisegundos", "undefined"],
        2,
      ],
      [
        "¿Cuál es el orden correcto de los parámetros?",
        [
          "setHours(minutes, hours, seconds, ms)",
          "setHours(hours, minutes, seconds, ms)",
          "setHours(seconds, minutes, hours)",
          "setHours(ms, seconds, minutes, hours)",
        ],
        1,
      ],
      [
        "¿setHours() trabaja en hora local o UTC?",
        ["Local", "UTC", "Depende del string", "Depende del navegador"],
        0,
      ],
      [
        "¿Cómo se establece la medianoche?",
        ["setHours(12, 0, 0, 0)", "setHours(0, 0, 0, 0)", "setHours(24, 0, 0, 0)", "setDate(0)"],
        1,
      ],
    ]),
  },

  /* ============================ setMinutes() =========================== */
  setminutes: {
    id: "setminutes",
    titulo: "Date.prototype.setMinutes()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que **establece los minutos** (0-59) de un objeto `Date` según la hora local, pudiendo también establecer opcionalmente los **segundos** y **milisegundos**.",
      "Permite cambiar los minutos manteniendo el resto de componentes, con manejo automático de *overflows*.",
    ],
    queEs: [
      "Es un **setter mutable**: modifica el objeto `Date` original.",
      "Si solo se pasan minutos, se mantienen los segundos y milisegundos.",
      "Los valores fuera de rango se ajustan automáticamente.",
      "Trabaja con la **hora local**, no con UTC.",
      "Devuelve el nuevo *timestamp* en milisegundos.",
    ],
    paraQueSirve: [
      "Cambiar los minutos de una fecha existente.",
      "Sumar o restar minutos a una fecha.",
      "Implementar temporizadores y cronómetros.",
      "Redondear horarios (a la hora, a los 15 minutos...).",
      "Establecer minutos exactos en una fecha.",
      "Registrar eventos con precisión.",
    ],
    comoFunciona: [
      "Establece los minutos (0-59) y opcionalmente segundos y milisegundos.",
      "Si solo se pasan minutos, conserva los segundos y milisegundos.",
      "Minutos mayores que 59 se ajustan a la hora siguiente.",
      "Minutos negativos se ajustan a la hora anterior.",
      "Los segundos y milisegundos también se ajustan si están fuera de rango.",
      "Retorna el *timestamp* en milisegundos del objeto modificado.",
    ],
    sintaxis: [
      {
        code: `fecha.setMinutes(minutes)
fecha.setMinutes(minutes, seconds)
fecha.setMinutes(minutes, seconds, milliseconds)`,
      },
      {
        caption: "Valores fuera de rango:",
        code: `// 90 min → 30 minutos de la hora siguiente
new Date(2024, 11, 25, 10, 30).setMinutes(90);

// -10 min → 50 minutos de la hora anterior
new Date(2024, 11, 25, 10, 30).setMinutes(-10);`,
      },
    ],
    nota: "**Parámetros:** `minutes` (obligatorio, 0-59), `seconds` (0-59) y `milliseconds` (0-999), opcionales. **Retorno:** el *timestamp* en milisegundos del objeto modificado.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Cambiar solo los minutos",
        code: `const date = new Date(2024, 11, 25, 10, 30);
date.setMinutes(15);

console.log(date.getMinutes()); // 15
console.log(date.getHours());   // 10 (se mantiene)`,
      },
      {
        titulo: "Ejemplo 2: Minutos, segundos y milisegundos",
        code: `const date = new Date(2024, 11, 25, 10, 30, 45, 500);
date.setMinutes(15, 20, 300);

console.log(date.getMinutes());      // 15
console.log(date.getSeconds());      // 20
console.log(date.getMilliseconds()); // 300`,
      },
      {
        titulo: "Ejemplo 3: Ajuste automático",
        code: `const date = new Date(2024, 11, 25, 10, 30);
date.setMinutes(90);

console.log(date.getMinutes()); // 30
console.log(date.getHours());   // 11 (hora + 1)`,
      },
      {
        titulo: "Ejemplo 4: Sumar minutos",
        code: `function addMinutes(date, minutes) {
  const nueva = new Date(date);
  nueva.setMinutes(nueva.getMinutes() + minutes);
  return nueva;
}

const start = new Date(2024, 11, 25, 10, 30);
console.log(addMinutes(start, 45).getHours());   // 11
console.log(addMinutes(start, 90).getHours());   // 12
console.log(addMinutes(start, -30).getMinutes()); // 0`,
      },
      {
        titulo: "Ejemplo 5: Redondear a los 15 minutos",
        code: `function roundToNearest15(date) {
  const nueva = new Date(date);
  const rounded = Math.round(nueva.getMinutes() / 15) * 15;
  nueva.setMinutes(rounded, 0, 0);
  return nueva;
}

console.log(roundToNearest15(new Date(2024, 11, 25, 10, 12)).getMinutes()); // 15
console.log(roundToNearest15(new Date(2024, 11, 25, 10, 23)).getMinutes()); // 30`,
      },
      {
        titulo: "Ejemplo 6: Cadena de métodos (retorna timestamp)",
        code: `const date = new Date();
const timestamp = date.setMinutes(30);

console.log(typeof timestamp);   // "number"
console.log(date.getMinutes()); // 30`,
      },
    ],
    errores: [
      {
        texto: "**Pasar minutos fuera de rango sin entender el ajuste:** `setMinutes(90)` también cambia la hora.",
        code: `const date = new Date(2024, 11, 25, 10, 30);
date.setMinutes(90);
console.log(date.getMinutes()); // 30
console.log(date.getHours());   // 11`,
      },
      {
        texto: "**Confundir el orden de parámetros:** es `setMinutes(minutes, seconds, milliseconds)`.",
        code: `// ❌ setMinutes(seconds, minutes)
// ✅ setMinutes(minutes, seconds)`,
      },
      {
        texto: "**No considerar la zona horaria:** `setMinutes()` trabaja en hora local.",
        code: `const date = new Date("2024-12-25T10:30:00Z");
date.setMinutes(15); // modifica la hora local`,
      },
      {
        texto: "**Olvidar que modifica el objeto original:** clona la fecha si necesitas conservarla.",
        code: `const original = new Date(2024, 11, 25, 10, 30);
const copy = original; // ⚠️ misma referencia
copy.setMinutes(15);
console.log(original.getMinutes()); // 15`,
      },
    ],
    casos: [
      "**Redondear horarios** en agendas y citas.",
      "**Temporizadores y cronómetros.**",
      "**Sumar o restar minutos** a una fecha.",
      "**Establecer una hora exacta** (por ejemplo, en punto).",
      "**Registrar eventos** con precisión de minutos.",
    ],
    relacion: [
      "**`getMinutes()`:** obtiene los minutos.",
      "**`setUTCMinutes()`:** establece los minutos en UTC.",
      "**`setHours()`:** establece la hora.",
      "**`setSeconds()`:** establece los segundos.",
      "**`setDate()`:** cambia el día del mes.",
    ],
    analogia:
      "`setMinutes()` es como **girar la manecilla de los minutos**: puedes llevarla a otro minuto y la hora se mantiene. Si la giras más de una vuelta completa (más de 59), la manecilla de las horas avanza también.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    notasPersonales: [
      "**Regla para memorizar:** `setMinutes(minutes, seconds, ms)`; los valores fuera de rango se ajustan solos.",
      "Es **mutable**: modifica el objeto original.",
      "Usa `setUTCMinutes()` si trabajas en UTC.",
    ],
    quiz: Q([
      [
        "¿Qué establece setMinutes(15)?",
        [
          "Solo los minutos y mantiene segundos y milisegundos",
          "Los minutos y pone los segundos a 0",
          "La hora",
          "El mes",
        ],
        0,
      ],
      [
        "¿Qué ocurre con setMinutes(90) a las 10:30?",
        [
          "Lanza un error",
          "Pasa a las 11:30",
          "Devuelve 90",
          "Pasa a las 10:90",
        ],
        1,
      ],
      [
        "¿Qué devuelve setMinutes()?",
        ["Los minutos", "El objeto Date", "El timestamp en milisegundos", "undefined"],
        2,
      ],
      [
        "¿Cuál es el orden correcto de los parámetros?",
        [
          "setMinutes(seconds, minutes, ms)",
          "setMinutes(minutes, seconds, ms)",
          "setMinutes(hours, minutes)",
          "setMinutes(ms, seconds, minutes)",
        ],
        1,
      ],
      [
        "¿setMinutes() trabaja en hora local o UTC?",
        ["Local", "UTC", "Depende del navegador", "Depende del string"],
        0,
      ],
      [
        "¿Qué método redondea a la hora exacta?",
        ["setMinutes(0, 0, 0)", "setHours(0)", "setDate(1)", "setSeconds(0)"],
        0,
      ],
    ]),
  },

  /* ============================ toISOString() ========================== */
  toisostring: {
    id: "toisostring",
    titulo: "Date.prototype.toISOString()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que convierte una fecha y hora en una **cadena de texto** con formato **ISO 8601**, utilizando siempre la zona horaria **UTC**.",
      "El formato devuelto es `AAAA-MM-DDTHH:mm:ss.sssZ`.",
    ],
    queEs: [
      "Devuelve un `string`, nunca un objeto.",
      "Siempre expresa la fecha y hora en **UTC**, aunque el objeto se haya creado en hora local.",
      "No recibe parámetros.",
      "Es el formato estándar para intercambiar fechas entre sistemas.",
      "Lanza un `RangeError` si la fecha es inválida.",
    ],
    paraQueSirve: [
      "Enviar fechas a APIs.",
      "Guardar fechas en bases de datos.",
      "Compartir fechas entre sistemas.",
      "Generar formatos estándar internacionales.",
      "Serializar objetos `Date` a texto.",
      "Registrar eventos en logs.",
    ],
    comoFunciona: [
      "Se crea un objeto `Date`.",
      "Se llama a `toISOString()`.",
      "JavaScript convierte la fecha a UTC.",
      "Devuelve una cadena con formato ISO 8601 terminada en `Z`.",
      "Si la fecha es inválida, lanza `RangeError: Invalid time value`.",
    ],
    sintaxis: [
      {
        code: `const texto = fecha.toISOString();`,
      },
      {
        caption: "Partes del formato `2026-07-22T22:35:48.125Z`:",
        code: `AAAA → año
MM   → mes
DD   → día
T    → separador entre fecha y hora
HH   → hora
mm   → minutos
ss   → segundos
sss  → milisegundos
Z    → indica que la hora está en UTC`,
      },
    ],
    nota: "**Parámetros:** ninguno. **Retorno:** un `string` en formato ISO 8601 en UTC. **Error:** `RangeError` si la fecha es inválida.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Fecha actual",
        code: `const ahora = new Date();
console.log(ahora.toISOString()); // "2026-07-22T22:35:48.125Z"`,
      },
      {
        titulo: "Ejemplo 2: Fecha específica",
        code: `const fecha = new Date("2026-12-25T10:30:00");
console.log(fecha.toISOString()); // "2026-12-25T15:30:00.000Z" (según la zona)`,
      },
      {
        titulo: "Ejemplo 3: Guardar una fecha",
        code: `const fecha = new Date();
const texto = fecha.toISOString();
console.log(typeof texto); // "string"`,
      },
      {
        titulo: "Ejemplo 4: Enviar una fecha en JSON",
        code: `const usuario = {
  nombre: "Ana",
  fechaRegistro: new Date().toISOString(),
};

console.log(JSON.stringify(usuario));
// {"nombre":"Ana","fechaRegistro":"2026-07-22T22:35:48.125Z"}`,
      },
      {
        titulo: "Ejemplo 5: Fecha inválida",
        code: `const fecha = new Date("Fecha inválida");

try {
  console.log(fecha.toISOString());
} catch (error) {
  console.log(error.name);    // "RangeError"
  console.log(error.message); // "Invalid time value"
}`,
      },
    ],
    errores: [
      {
        texto: "**Pensar que usa la hora local:** el resultado siempre está en UTC.",
        code: `const fecha = new Date("2026-07-22T18:45:30");
console.log(fecha.toISOString());   // ...T23:45:30.000Z (ejemplo)
console.log(fecha.toLocaleString()); // hora local`,
      },
      {
        texto: "**Confundir el formato ISO con el formato local:** ISO usa `AAAA-MM-DD` y `T`; el local usa separadores como `/`.",
        code: `// ISO:    2026-07-22T22:35:48.125Z
// Local:  22/07/2026 17:35:48`,
      },
      {
        texto: "**Usarlo sobre una fecha inválida:** lanza `RangeError` en lugar de devolver `NaN`.",
        code: `const fecha = new Date("abc");

// ❌ RangeError: Invalid time value
fecha.toISOString();`,
      },
    ],
    casos: [
      "**APIs REST:** enviar fechas en el cuerpo o en los parámetros.",
      "**Bases de datos:** almacenar fechas en un formato estándar.",
      "**Logs:** registrar eventos con marcas de tiempo universales.",
      "**JSON:** serializar objetos que contienen fechas.",
      "**Sincronización entre países:** evitar ambigüedades de zona horaria.",
    ],
    relacion: [
      "**`toLocaleString()`:** devuelve la fecha con formato local.",
      "**`toString()`:** devuelve una representación legible en hora local.",
      "**`JSON.stringify()`:** convierte automáticamente los `Date` usando `toISOString()`.",
      "**`Date.parse()`:** hace el camino inverso, de ISO a *timestamp*.",
      "**UTC / ISO 8601:** zona horaria y estándar que utiliza el método.",
    ],
    analogia:
      "Imagina que personas de distintos países deben ponerse de acuerdo sobre una fecha. En lugar de usar formatos diferentes (`22/07/2026`, `07/22/2026`, `2026/07/23`), todos adoptan un idioma común: `2026-07-22T22:30:00.000Z`. Ese idioma universal es ISO 8601, y `toISOString()` es el traductor.",
    fuente: "MDN Web Docs | ECMAScript Specification | ISO 8601",
    notasPersonales: [
      "**Regla para memorizar:** `toISOString()` = formato estándar + siempre UTC.",
      "Devuelve un `string`; para volver a fecha usa `new Date(texto)`.",
      "Lanza `RangeError` si la fecha es inválida.",
    ],
    quiz: Q([
      [
        "¿Qué formato devuelve toISOString()?",
        ["DD/MM/AAAA", "AAAA-MM-DDTHH:mm:ss.sssZ", "MM/DD/AAAA", "Solo la hora"],
        1,
      ],
      [
        "¿En qué zona horaria devuelve la fecha?",
        ["Local", "UTC", "La del navegador", "Depende del locale"],
        1,
      ],
      [
        "¿Qué significa la letra Z al final?",
        ["Zona local", "Que la hora está en UTC", "Que es inválida", "Que es medianoche"],
        1,
      ],
      [
        "¿Qué lanza toISOString() con una fecha inválida?",
        ["NaN", "RangeError", "null", "undefined"],
        1,
      ],
      [
        "¿Qué tipo de dato devuelve toISOString()?",
        ["Date", "string", "number", "object"],
        1,
      ],
      [
        "¿Qué método usa JSON.stringify() para serializar un Date?",
        ["toString()", "toISOString()", "toLocaleString()", "getTime()"],
        1,
      ],
      [
        "¿Cómo se vuelve de ISO a un objeto Date?",
        ["Date.toISO(texto)", "new Date(texto)", "Date.parse() solo", "texto.toDate()"],
        1,
      ],
      [
        "¿toISOString() recibe parámetros?",
        ["Sí, locales", "Sí, opciones", "No", "Solo la zona horaria"],
        2,
      ],
    ]),
  },

  /* =========================== toLocaleString() ======================== */
  tolocalestring: {
    id: "tolocalestring",
    titulo: "Date.prototype.toLocaleString()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que convierte una fecha y hora en un **string** usando el **formato regional** (*locale*) del usuario o el que se especifique.",
      "El resultado puede variar según el idioma, el país y las opciones de formato.",
    ],
    queEs: [
      "Devuelve un `string` pensado para ser leído por personas.",
      "Adapta automáticamente el formato según la configuración regional.",
      "Usa la **hora local** del sistema.",
      "Permite personalizar el resultado con `locales` y `options`.",
      "No debe confundirse con `toISOString()`, que siempre usa UTC.",
    ],
    paraQueSirve: [
      "Mostrar fechas al usuario.",
      "Formatear fechas según el idioma.",
      "Crear interfaces internacionales (i18n).",
      "Mostrar la hora local.",
      "Personalizar el formato de fecha y hora.",
      "Formatear reportes y documentos.",
    ],
    comoFunciona: [
      "Se crea un objeto `Date`.",
      "Se llama a `toLocaleString()`.",
      "JavaScript consulta la configuración regional.",
      "Formatea la fecha y la hora según ese formato.",
      "Devuelve un `string`.",
    ],
    sintaxis: [
      {
        code: `fecha.toLocaleString();
fecha.toLocaleString(locales, opciones);`,
      },
      {
        caption: "Ejemplos de `locales`:",
        code: `"es-PE" → 22/7/2026, 18:45:30
"en-US" → 7/22/2026, 6:45:30 PM
"es-ES" → 22/7/2026, 18:45:30`,
      },
    ],
    nota: "**Parámetros:** `locales` (opcional, string o array) y `opciones` (opcional, objeto de formato). **Retorno:** un `string` con fecha y hora formateadas según la configuración regional.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Formato local del sistema",
        code: `const fecha = new Date();
console.log(fecha.toLocaleString()); // 22/7/2026, 18:45:30 (ejemplo)`,
      },
      {
        titulo: "Ejemplo 2: Español (Perú)",
        code: `const fecha = new Date();
console.log(fecha.toLocaleString("es-PE")); // 22/7/2026, 18:45:30`,
      },
      {
        titulo: "Ejemplo 3: Inglés (Estados Unidos)",
        code: `const fecha = new Date();
console.log(fecha.toLocaleString("en-US")); // 7/22/2026, 6:45:30 PM`,
      },
      {
        titulo: "Ejemplo 4: Solo la fecha con estilo completo",
        code: `const fecha = new Date();
console.log(fecha.toLocaleString("es-PE", { dateStyle: "full" }));
// miércoles, 22 de julio de 2026`,
      },
      {
        titulo: "Ejemplo 5: Fecha y hora personalizadas",
        code: `const fecha = new Date();
console.log(
  fecha.toLocaleString("es-PE", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
);
// miércoles, 22 de julio de 2026, 18:45`,
      },
    ],
    errores: [
      {
        texto: "**Pensar que todos ven el mismo formato:** depende del idioma y la configuración del dispositivo.",
        code: `// En Perú: 22/7/2026, 18:45:30
// En EE.UU.: 7/22/2026, 6:45:30 PM
console.log(new Date().toLocaleString());`,
      },
      {
        texto: "**Confundirlo con `toISOString()`:** `toISOString()` usa UTC y un formato fijo; `toLocaleString()` usa la hora local y un formato para personas.",
        code: `fecha.toISOString();    // 2026-07-22T23:45:30.000Z
fecha.toLocaleString(); // 22/7/2026, 18:45:30`,
      },
      {
        texto: "**Esperar un formato fijo:** no siempre es idéntico en todos los navegadores o sistemas operativos.",
        code: `// Para un formato estable usa toISOString()
fecha.toISOString();`,
      },
    ],
    casos: [
      "**Mostrar fechas en páginas web.**",
      "**Interfaces internacionales (i18n).**",
      "**Aplicaciones con varios idiomas.**",
      "**Reportes y documentos** con fechas legibles.",
      "**Notificaciones y correos** con fecha y hora local.",
    ],
    relacion: [
      "**`toISOString()`:** formato ISO 8601 en UTC.",
      "**`toLocaleDateString()`:** solo la fecha.",
      "**`toLocaleTimeString()`:** solo la hora.",
      "**`Intl.DateTimeFormat`:** API más avanzada para formatear fechas.",
      "**`toString()`:** representación fija del navegador.",
    ],
    analogia:
      "`toLocaleString()` es como un **traductor**: la misma fecha se muestra a personas de distintos países en el formato que les resulta natural. En Perú se lee `22/07/2026`; en Estados Unidos, `07/22/2026`; en Japón, `2026/07/22`. El instante es el mismo, solo cambia la forma de escribirlo.",
    fuente: "MDN Web Docs | ECMAScript Specification | Intl",
    notasPersonales: [
      "**Regla para memorizar:** `toLocaleString()` = fecha y hora para personas, en hora local.",
      "Especifica siempre el `locale` para que el formato sea predecible.",
      "Si necesitas un formato estable para máquinas, usa `toISOString()`.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve toLocaleString()?",
        ["Un objeto Date", "Un string con fecha y hora formateadas", "Un timestamp", "Solo la fecha"],
        1,
      ],
      [
        "¿Qué zona horaria usa?",
        ["UTC", "La local del sistema", "Siempre GMT", "La del servidor"],
        1,
      ],
      [
        "¿Qué parámetro permite elegir el idioma?",
        ["timeZone", "locales", "options.dateStyle", "format"],
        1,
      ],
      [
        "¿Cuál es la diferencia con toISOString()?",
        [
          "Son iguales",
          "toISOString usa UTC y formato fijo; toLocaleString usa hora local y formato regional",
          "toLocaleString usa UTC",
          "toISOString usa la hora local",
        ],
        1,
      ],
      [
        "¿Qué opción muestra la fecha en estilo completo?",
        ["{ dateStyle: 'full' }", "{ full: true }", "{ style: 'full' }", "{ format: 'full' }"],
        0,
      ],
      [
        "¿El formato de toLocaleString() es idéntico en todos los dispositivos?",
        ["Sí, siempre", "No, puede variar", "Solo en Node.js", "Solo con es-ES"],
        1,
      ],
    ]),
  },

  /* ======================== toLocaleDateString() ======================= */
  tolocaledatestring: {
    id: "tolocaledatestring",
    titulo: "Date.prototype.toLocaleDateString()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que devuelve un **string** con la **parte de fecha** de un objeto `Date`, formateada según la configuración regional (idioma y país) especificada.",
      "A diferencia de `toLocaleString()`, **no incluye la hora**.",
    ],
    queEs: [
      "Devuelve solo la **fecha**, sin la hora.",
      "Usa el sistema de internacionalización (i18n) de JavaScript.",
      "Muestra los nombres de meses y días en el idioma correcto.",
      "Ordena día, mes y año según la región (DD/MM/AAAA o MM/DD/AAAA).",
      "Permite personalizar el formato con `options`.",
    ],
    paraQueSirve: [
      "Mostrar fechas en interfaces de usuario con formato local.",
      "Crear aplicaciones internacionalizadas (i18n).",
      "Generar fechas legibles para informes y documentos.",
      "Formatear fechas según las preferencias del usuario.",
      "Mostrar fechas en calendarios y agendas.",
      "Cumplir requisitos legales de formato por región.",
    ],
    comoFunciona: [
      "Determina el *locale* a usar (por parámetro o del sistema).",
      "Aplica las opciones de formato si se proporcionan.",
      "Genera la representación en string según las reglas culturales.",
      "Devuelve el string formateado, solo con la fecha.",
    ],
    sintaxis: [
      {
        code: `fecha.toLocaleDateString([locales[, options]])`,
      },
      {
        caption: "Opciones principales:",
        code: `dateStyle: "full" | "long" | "medium" | "short"
timeZone: "UTC" | "America/New_York" | ...
year: "numeric" | "2-digit"
month: "numeric" | "2-digit" | "long" | "short" | "narrow"
day: "numeric" | "2-digit"
weekday: "long" | "short" | "narrow"`,
      },
    ],
    nota: "**Parámetros:** `locales` (opcional) y `options` (opcional). **Retorno:** un `string` con la fecha formateada, sin la hora.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Formato local",
        code: `const date = new Date(2024, 11, 25);
console.log(date.toLocaleDateString()); // según el sistema
// España: "25/12/2024" · EE.UU.: "12/25/2024"`,
      },
      {
        titulo: "Ejemplo 2: Distintos locales",
        code: `const date = new Date(2024, 11, 25);

console.log(date.toLocaleDateString("es-ES")); // "25/12/2024"
console.log(date.toLocaleDateString("en-US")); // "12/25/2024"
console.log(date.toLocaleDateString("de-DE")); // "25.12.2024"
console.log(date.toLocaleDateString("ja-JP")); // "2024/12/25"`,
      },
      {
        titulo: "Ejemplo 3: Estilos predefinidos",
        code: `const date = new Date(2024, 11, 25);

console.log(date.toLocaleDateString("es-ES", { dateStyle: "full" }));
// "miércoles, 25 de diciembre de 2024"

console.log(date.toLocaleDateString("en-US", { dateStyle: "long" }));
// "December 25, 2024"

console.log(date.toLocaleDateString("es-ES", { dateStyle: "short" }));
// "25/12/24"`,
      },
      {
        titulo: "Ejemplo 4: Formato personalizado",
        code: `const date = new Date(2024, 11, 25);

console.log(
  date.toLocaleDateString("es-ES", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })
);
// "miércoles, 25 de diciembre de 2024"`,
      },
      {
        titulo: "Ejemplo 5: Año de 2 dígitos",
        code: `const date = new Date(2024, 11, 25);

console.log(
  date.toLocaleDateString("es-ES", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  })
);
// "25/12/24"`,
      },
      {
        titulo: "Ejemplo 6: Rango de fechas legible",
        code: `function formatDateRange(start, end, locale = "es-ES") {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return \`\${start.toLocaleDateString(locale, options)} - \${end.toLocaleDateString(locale, options)}\`;
}

console.log(formatDateRange(new Date(2024, 0, 1), new Date(2024, 11, 31)));
// "1 de enero de 2024 - 31 de diciembre de 2024"`,
      },
    ],
    errores: [
      {
        texto: "**No especificar el locale:** el formato puede variar según la configuración del sistema.",
        code: `date.toLocaleDateString();        // depende del sistema
date.toLocaleDateString("es-ES"); // predecible`,
      },
      {
        texto: "**Confundirlo con `toLocaleString()`:** el primero solo muestra la fecha; el segundo, fecha y hora.",
        code: `date.toLocaleDateString(); // "25/12/2024"
date.toLocaleString();     // "25/12/2024, 15:30:45"`,
      },
      {
        texto: "**Asumir un formato fijo:** el formato depende del locale y puede cambiar.",
        code: `date.toLocaleDateString("en-US"); // "12/25/2024"
date.toLocaleDateString("es-ES"); // "25/12/2024"`,
      },
      {
        texto: "**Olvidar que los meses empiezan en 0:** `new Date(2024, 11, 25)` es diciembre, no noviembre.",
        code: `new Date(2024, 11, 25).toLocaleDateString("es-ES"); // 25/12/2024
new Date(2024, 10, 25).toLocaleDateString("es-ES"); // 25/11/2024`,
      },
    ],
    casos: [
      "**Calendarios de eventos** con fechas legibles.",
      "**Formateadores de fechas** para usuarios de distintos países.",
      "**Informes y facturas** con formato legal local.",
      "**Dashboards** con rangos de fechas.",
      "**Correos y notificaciones** con fecha formateada.",
    ],
    relacion: [
      "**`toLocaleString()`:** fecha y hora.",
      "**`toLocaleTimeString()`:** solo la hora.",
      "**`toISOString()`:** formato ISO 8601 en UTC.",
      "**`Intl.DateTimeFormat`:** API avanzada de internacionalización.",
      "**`new Date()`:** crea la fecha que se va a formatear.",
    ],
    analogia:
      "`toLocaleDateString()` es como un **traductor de calendarios**: la misma fecha se escribe `25/12/2024` en España, `12/25/2024` en Estados Unidos y `2024/12/25` en Japón. No cambia el día, solo la forma de presentarlo según la cultura.",
    fuente: "MDN Web Docs | ECMAScript Specification | Intl.DateTimeFormat",
    notasPersonales: [
      "**Regla para memorizar:** `toLocaleDateString()` = solo fecha, en hora local y formato regional.",
      "Usa `dateStyle` para un formato rápido y consistente.",
      "Especifica el `locale` para que el resultado sea predecible.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve toLocaleDateString()?",
        ["Fecha y hora", "Solo la fecha", "Solo la hora", "Un timestamp"],
        1,
      ],
      [
        '¿Qué devuelve new Date(2024, 11, 25).toLocaleDateString("es-ES")?',
        ["25/12/2024", "12/25/2024", "25/11/2024", "2024-12-25"],
        0,
      ],
      [
        '¿Qué devuelve la misma fecha con locale "en-US"?',
        ["25/12/2024", "12/25/2024", "2024/12/25", "25.12.2024"],
        1,
      ],
      [
        "¿Qué opción muestra la fecha en estilo completo?",
        ["{ dateStyle: 'full' }", "{ style: 'full' }", "{ full: true }", "{ format: 'full' }"],
        0,
      ],
      [
        "¿Cuál es la diferencia con toLocaleString()?",
        [
          "Ninguna",
          "toLocaleDateString solo muestra la fecha",
          "toLocaleString solo muestra la fecha",
          "toLocaleDateString usa UTC",
        ],
        1,
      ],
      [
        "¿Qué tipo de dato devuelve?",
        ["Date", "string", "number", "object"],
        1,
      ],
    ]),
  },

  /* ======================== toLocaleTimeString() ======================= */
  tolocaletimestring: {
    id: "tolocaletimestring",
    titulo: "Date.prototype.toLocaleTimeString()",
    simulador: "fecha",
    definicion: [
      "Es un método de `Date` que devuelve un **string** con la **parte de tiempo (hora)** de un objeto `Date`, formateada según la configuración regional (idioma y país) especificada.",
      "A diferencia de `toLocaleString()`, **no incluye la fecha**.",
    ],
    queEs: [
      "Devuelve solo la **hora**, sin la fecha.",
      "Usa el sistema de internacionalización (i18n) de JavaScript.",
      "Muestra el formato de **12 o 24 horas** según la región.",
      "Puede incluir el nombre de la zona horaria.",
      "Permite personalizar el formato con `options`.",
    ],
    paraQueSirve: [
      "Mostrar horas en interfaces con formato local.",
      "Crear aplicaciones internacionalizadas (i18n).",
      "Generar horas legibles para informes y logs.",
      "Mostrar horarios de eventos y citas.",
      "Implementar relojes y temporizadores en distintos idiomas.",
      "Presentar marcas de tiempo en aplicaciones de mensajería.",
    ],
    comoFunciona: [
      "Determina el *locale* a usar (por parámetro o del sistema).",
      "Aplica las opciones de formato si se proporcionan.",
      "Genera la representación en string según las reglas culturales.",
      "Devuelve el string formateado, solo con la hora.",
    ],
    sintaxis: [
      {
        code: `fecha.toLocaleTimeString([locales[, options]])`,
      },
      {
        caption: "Opciones principales:",
        code: `timeStyle: "full" | "long" | "medium" | "short"
timeZone: "UTC" | "America/New_York" | ...
hour: "numeric" | "2-digit"
minute: "numeric" | "2-digit"
second: "numeric" | "2-digit"
hour12: true | false
timeZoneName: "long" | "short"`,
      },
    ],
    nota: "**Parámetros:** `locales` (opcional) y `options` (opcional). **Retorno:** un `string` con la hora formateada, sin la fecha.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Formato local",
        code: `const date = new Date(2024, 11, 25, 15, 30, 45);
console.log(date.toLocaleTimeString());
// España: "15:30:45" · EE.UU.: "3:30:45 PM"`,
      },
      {
        titulo: "Ejemplo 2: Distintos locales",
        code: `const date = new Date(2024, 11, 25, 15, 30, 45);

console.log(date.toLocaleTimeString("es-ES")); // "15:30:45"
console.log(date.toLocaleTimeString("en-US")); // "3:30:45 PM"
console.log(date.toLocaleTimeString("ja-JP")); // "15:30:45"`,
      },
      {
        titulo: "Ejemplo 3: Estilos predefinidos",
        code: `const date = new Date(2024, 11, 25, 15, 30, 45);

console.log(date.toLocaleTimeString("es-ES", { timeStyle: "short" }));
// "15:30"

console.log(date.toLocaleTimeString("en-US", { timeStyle: "medium" }));
// "3:30:45 PM"`,
      },
      {
        titulo: "Ejemplo 4: Formato 12 vs 24 horas",
        code: `const date = new Date(2024, 11, 25, 15, 30);

console.log(
  date.toLocaleTimeString("en-US", { hour: "numeric", minute: "numeric", hour12: true })
); // "3:30 PM"

console.log(
  date.toLocaleTimeString("es-ES", { hour: "numeric", minute: "numeric", hour12: false })
); // "15:30"`,
      },
      {
        titulo: "Ejemplo 5: Con zona horaria",
        code: `const date = new Date(2024, 11, 25, 15, 30);

console.log(
  date.toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  })
);
// "15:30 GMT+1"`,
      },
      {
        titulo: "Ejemplo 6: Reloj en tiempo real",
        code: `function startClock(locale = "es-ES") {
  setInterval(() => {
    console.log(
      new Date().toLocaleTimeString(locale, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })
    );
  }, 1000);
}

// startClock("es-ES");`,
      },
    ],
    errores: [
      {
        texto: "**No especificar el locale:** el formato puede variar según la configuración del sistema.",
        code: `date.toLocaleTimeString();        // depende del sistema
date.toLocaleTimeString("es-ES"); // predecible`,
      },
      {
        texto: "**Confundirlo con `toLocaleString()`:** el primero solo muestra la hora; el segundo, fecha y hora.",
        code: `date.toLocaleTimeString(); // "15:30:45"
date.toLocaleString();     // "25/12/2024, 15:30:45"`,
      },
      {
        texto: "**Asumir siempre el formato de 12 horas:** depende del locale y de las opciones.",
        code: `date.toLocaleTimeString("en-US"); // "3:30:45 PM"
date.toLocaleTimeString("es-ES"); // "15:30:45"`,
      },
      {
        texto: "**No manejar zonas horarias:** por defecto las horas se convierten a la zona local.",
        code: `date.toLocaleTimeString("es-ES", { timeZone: "UTC" });
date.toLocaleTimeString("es-ES", { timeZone: "Asia/Tokyo" });`,
      },
    ],
    casos: [
      "**Horarios de eventos y citas.**",
      "**Relojes y temporizadores** en distintos idiomas.",
      "**Logs y registros** con hora local legible.",
      "**Aplicaciones de mensajería** con marcas de tiempo.",
      "**Dashboards** con métricas temporales.",
    ],
    relacion: [
      "**`toLocaleString()`:** fecha y hora.",
      "**`toLocaleDateString()`:** solo la fecha.",
      "**`toISOString()`:** formato ISO 8601 en UTC.",
      "**`toTimeString()`:** hora en formato fijo del navegador.",
      "**`Intl.DateTimeFormat`:** API avanzada de internacionalización.",
    ],
    analogia:
      "`toLocaleTimeString()` es como un **traductor de relojes**: la misma hora se muestra como `15:30` en España y como `3:30 PM` en Estados Unidos. El instante no cambia, solo la manera de leerlo según la costumbre local.",
    fuente: "MDN Web Docs | ECMAScript Specification | Intl.DateTimeFormat",
    notasPersonales: [
      "**Regla para memorizar:** `toLocaleTimeString()` = solo hora, en hora local y formato regional.",
      "Usa `hour12: false` si quieres forzar el formato de 24 horas.",
      "Especifica el `locale` para que el resultado sea predecible.",
    ],
    quiz: Q([
      [
        "¿Qué devuelve toLocaleTimeString()?",
        ["Fecha y hora", "Solo la hora", "Solo la fecha", "Un timestamp"],
        1,
      ],
      [
        '¿Qué devuelve a las 15:30:45 con locale "en-US"?',
        ["15:30:45", "3:30:45 PM", "03:30:45", "15:30 PM"],
        1,
      ],
      [
        '¿Qué devuelve a las 15:30:45 con locale "es-ES"?',
        ["15:30:45", "3:30:45 PM", "03:30:45 PM", "15:30 PM"],
        0,
      ],
      [
        "¿Qué opción fuerza el formato de 24 horas?",
        ["hour12: true", "hour12: false", "hour: '24'", "timeStyle: '24'"],
        1,
      ],
      [
        "¿Cuál es la diferencia con toLocaleString()?",
        [
          "Ninguna",
          "toLocaleTimeString solo muestra la hora",
          "toLocaleString solo muestra la hora",
          "toLocaleTimeString usa UTC",
        ],
        1,
      ],
      [
        "¿Qué opción añade el nombre de la zona horaria?",
        ["timeZoneName", "timeZone", "zone", "tz"],
        0,
      ],
    ]),
  },
};
