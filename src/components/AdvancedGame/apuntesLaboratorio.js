/* Apuntes propios del laboratorio de JavaScript.
   Notas breves escritas para acompañar la práctica: no repiten el apunte
   completo, explican cómo pensar el concepto y qué probar en el editor. */

export const APUNTES_LAB = {
  "object-defineproperty": {
    idea:
      "Una propiedad no es solo un valor: también es un contrato con tres permisos (escribir, enumerar y configurar). defineProperty() sirve para firmar ese contrato.",
    modelo:
      "Piensa en una vitrina: el valor es lo que se exhibe; writable decide si puedes cambiar el producto, enumerable si aparece en el catálogo y configurable si puedes rehacer la vitrina.",
    checklist: [
      "defineProperty() modifica el objeto; no devuelve una copia.",
      "Si omites un permiso en el descriptor, queda en false.",
      "En modo estricto, escribir una propiedad no escribible lanza TypeError; sin strict falla en silencio.",
      "Inspecciona siempre con Object.getOwnPropertyDescriptor().",
    ],
    reto:
      "Crea una propiedad `precio` que se pueda leer y enumerar, pero no modificar ni borrar. Después intenta cambiarla y comprueba el descriptor.",
    pista:
      "Usa writable: false y configurable: false. Para ver el fallo, ejecuta el intento dentro de try/catch.",
  },
  "object-defineproperties": {
    idea:
      "defineProperties() es la versión por lotes de defineProperty(): recibe un mapa de nombres a descriptores y aplica todos en una sola llamada.",
    modelo:
      "Es como entregar varias llaves en un mismo llavero: cada propiedad conserva sus propios permisos, pero se configuran juntas.",
    checklist: [
      "Cada descriptor tiene sus propios flags; no se heredan entre propiedades.",
      "Los flags omitidos vuelven a ser false.",
      "El método devuelve el mismo objeto que recibió.",
      "Si un descriptor es inválido, la operación puede fallar antes de aplicar el resto.",
    ],
    reto:
      "Crea una ficha con `emoji` editable y `total` de solo lectura. Intenta cambiar `total` y explica qué ocurre.",
    pista:
      "Comprueba el resultado con Object.keys() y con getOwnPropertyDescriptor().",
  },
  "object-getownpropertydescriptor": {
    idea:
      "El descriptor es la radiografía de una propiedad: muestra valor, writable, enumerable, configurable y, si es un accesor, get y set.",
    modelo:
      "Es la ficha técnica de una pieza: no te dice para qué sirve, pero sí cómo está construida y qué se puede hacer con ella.",
    checklist: [
      "Solo funciona con propiedades propias; las heredadas devuelven undefined.",
      "Una propiedad normal creada con un literal suele ser writable, enumerable y configurable.",
      "Las propiedades creadas con defineProperty() tienen los flags que declares.",
      "Puedes comparar el descriptor antes y después de congelar un objeto.",
    ],
    reto:
      "Crea una propiedad oculta con defineProperty() y demuestra que no aparece en Object.keys() pero sí se puede leer.",
    pista:
      "Usa enumerable: false y consulta el descriptor para confirmarlo.",
  },
  "object-prototype-hasownproperty": {
    idea:
      "hasOwnProperty() responde una pregunta muy concreta: ¿esta propiedad está guardada en el objeto o solo la hereda de su prototipo?",
    modelo:
      "Tu mochila tiene tus cuadernos; la biblioteca del aula tiene otros. hasOwnProperty() solo mira dentro de tu mochila.",
    checklist: [
      "`'toString' in obj` es true aunque no sea propia: está en el prototipo.",
      "hasOwnProperty() es un método heredado; un objeto con Object.create(null) no lo tiene.",
      "Object.hasOwn() es la alternativa moderna y evita conflictos si la propiedad se llama hasOwnProperty.",
      "No confundas existencia con valor: una propiedad puede existir y valer undefined.",
    ],
    reto:
      "Comprueba si `emoji` y `toString` son propiedades propias de una ficha. Luego repite la prueba con un objeto creado con Object.create(null).",
    pista:
      "Para el objeto sin prototipo, usa Object.prototype.hasOwnProperty.call(objeto, 'clave').",
  },
  "object-prototype-tostring": {
    idea:
      "Object.prototype.toString.call(valor) revela la etiqueta interna del valor, incluso cuando typeof no alcanza a distinguir tipos como Array, Date o null.",
    modelo:
      "Es como mirar la etiqueta cosida por dentro de una prenda: no importa cómo la uses por fuera, la etiqueta dice qué es realmente.",
    checklist: [
      "devuelve una cadena con formato `[object Tipo]`.",
      "call() permite usarlo sobre cualquier valor sin heredar métodos raros.",
      "Array.isArray() sigue siendo la forma específica para arrays; toString es más general.",
      "Symbol.toStringTag puede personalizar la etiqueta de un objeto.",
    ],
    reto:
      "Obtén la etiqueta interna de un array, un objeto, null, una fecha y un número. Compara los resultados.",
    pista:
      "Llama siempre desde Object.prototype: `Object.prototype.toString.call(valor)`.",
  },
  "object-prototype-valueof": {
    idea:
      "valueOf() define qué valor primitivo representa un objeto cuando JavaScript necesita convertirlo, por ejemplo en una suma o una comparación.",
    modelo:
      "Es el número de bastidor de un vehículo: el objeto sigue siendo el vehículo, pero al identificarlo se usa ese valor.",
    checklist: [
      "Si no lo sobrescribes, devuelve el propio objeto.",
      "La conversión a número suele intentar valueOf() antes que toString().",
      "En una fecha, valueOf() devuelve milisegundos desde 1970.",
      "No lo uses para esconder lógica de negocio: puede volver el código difícil de leer.",
    ],
    reto:
      "Crea un objeto `precio` con valueOf() que devuelva 25 y comprueba cuánto valen `precio + 5` y `precio * 2`.",
    pista:
      "Si el resultado no es el esperado, revisa que valueOf() devuelva un primitivo, no otro objeto.",
  },
  "object-getprototypeof": {
    idea:
      "getPrototypeOf() te dice de quién hereda un objeto. Es la forma directa de mirar el eslabón anterior de la cadena de prototipos.",
    modelo:
      "Es como preguntar por el árbol genealógico de un objeto: no ves a todos los ancestros, solo al padre inmediato.",
    checklist: [
      "Un objeto literal hereda de Object.prototype.",
      "Object.create(null) devuelve null como prototipo: no hereda nada.",
      "Puedes comparar prototipos con === para saber si dos objetos comparten padre.",
      "Cambiar el prototipo con setPrototypeOf() afecta a la cadena, no a las propiedades propias.",
    ],
    reto:
      "Crea un objeto base con un método saludar(), otro con Object.create(base) y comprueba si comparten el mismo prototipo.",
    pista:
      "Imprime el resultado de `Object.getPrototypeOf(hijo) === base`.",
  },
  "object-setprototypeof": {
    idea:
      "setPrototypeOf() cambia el padre de un objeto en caliente. Es potente, pero suele ser una mala idea en código de producción por su coste y por los efectos inesperados.",
    modelo:
      "Es cambiar la familia a la que pertenece un objeto después de nacer: sus pertenencias siguen siendo suyas, pero empieza a heredar otras cosas.",
    checklist: [
      "Las propiedades propias no se mueven: solo cambia lo que se hereda.",
      "Puede desactivar optimizaciones del motor de JavaScript.",
      "Para crear un objeto con un prototipo concreto, prefiere Object.create(proto).",
      "Evita cambiar el prototipo de objetos ya usados por otras partes del programa.",
    ],
    reto:
      "Crea una ficha con un método propio y cámbiale el prototipo por otro que tenga un método nuevo. Comprueba qué se conserva.",
    pista:
      "Compara Object.keys(ficha) antes y después del cambio.",
  },
  "object-new": {
    idea:
      "new Object() crea un objeto vacío, pero si recibe un objeto devuelve ese mismo objeto; si recibe un primitivo, crea un objeto envoltorio.",
    modelo:
      "Es como pedir una caja vacía: si ya tienes una caja, te devuelven la tuya; si llevas una etiqueta suelta, la meten en una caja.",
    checklist: [
      "new Object() sin argumentos equivale a {}.",
      "new Object(objeto) devuelve la misma referencia, no una copia.",
      "new Object(5) crea un Number envoltorio, no un número primitivo.",
      "En código moderno se prefieren los literales {} y los tipos primitivos.",
    ],
    reto:
      "Comprueba con === si `new Object(emojis)` devuelve exactamente el mismo array que `emojis`.",
    pista:
      "La respuesta debería ser true: no se clona el array.",
  },
  "object-seal": {
    idea:
      "Object.seal() cierra la estructura del objeto: no se pueden añadir ni eliminar propiedades, pero las existentes se pueden modificar.",
    modelo:
      "Es como sellar una caja de compartimentos: no puedes meter ni sacar compartimentos, pero sí cambiar lo que hay dentro de cada uno.",
    checklist: [
      "Sella = no extensible + propiedades no configurables.",
      "Las propiedades existentes siguen siendo escribibles si lo eran antes.",
      "delete falla (o lanza TypeError en strict).",
      "Object.isSealed() confirma el estado.",
    ],
    reto:
      "Sella una ficha con `emoji`, intenta añadir `puntos` y luego cambia el emoji. ¿Cuál de las dos operaciones funciona?",
    pista:
      "Añadir falla; cambiar el valor existente sí funciona.",
  },
  "object-issealed": {
    idea:
      "isSealed() responde true cuando el objeto no es extensible y todas sus propiedades propias son no configurables.",
    modelo:
      "Es el indicador de una caja ya cerrada con precinto: no se abre para añadir ni quitar nada.",
    checklist: [
      "Un objeto vacío pasado por Object.seal() también está sellado.",
      "Un objeto congelado también está sellado, pero no al revés.",
      "Puede haber propiedades escribibles dentro de un objeto sellado.",
      "No confundas sellado con inmutable.",
    ],
    reto:
      "Compara isSealed() en un objeto normal, uno sellado y uno congelado. Explica las diferencias.",
    pista:
      "Congelado implica sellado; sellado no implica congelado.",
  },
  "object-preventextensions": {
    idea:
      "preventExtensions() impide añadir propiedades nuevas, pero deja modificar y eliminar las que ya existen.",
    modelo:
      "Es como cerrar la puerta de entrada a nuevos muebles, pero permitir mover o sacar los que ya están dentro.",
    checklist: [
      "No cambia writable ni configurable de las propiedades existentes.",
      "Puedes borrar propiedades con delete.",
      "Object.isExtensible() devuelve false después de aplicarlo.",
      "Es el nivel de bloqueo más suave de los tres: preventExtensions, seal y freeze.",
    ],
    reto:
      "Aplica preventExtensions() a una ficha, intenta añadir una propiedad y luego borra una existente. Observa qué pasa.",
    pista:
      "Añadir falla; borrar puede funcionar.",
  },
  "object-isextensible": {
    idea:
      "isExtensible() dice si un objeto acepta propiedades nuevas. Es la pregunta inversa a preventExtensions().",
    modelo:
      "Es comprobar si la puerta de la tienda admite nuevos productos en el escaparate.",
    checklist: [
      "Un objeto normal es extensible por defecto.",
      "preventExtensions(), seal() y freeze() lo vuelven no extensible.",
      "No dice nada sobre si las propiedades existentes se pueden modificar.",
      "Los Proxy pueden personalizar la respuesta con su trap isExtensible.",
    ],
    reto:
      "Crea tres objetos: uno normal, uno con preventExtensions() y uno congelado. Compara isExtensible() en los tres.",
    pista:
      "Los tres resultados deberían ser true, false y false.",
  },
  "object-isfrozen": {
    idea:
      "isFrozen() confirma el bloqueo máximo: el objeto no es extensible y sus propiedades de datos no se pueden escribir ni configurar.",
    modelo:
      "Es una pieza de museo: no se puede cambiar, ni añadir, ni quitar, ni reconfigurar.",
    checklist: [
      "Congelar implica sellar, pero sellar no implica congelar.",
      "Las propiedades de acceso (get/set) pueden seguir funcionando aunque el objeto esté congelado.",
      "Object.freeze() es superficial: los objetos anidados no se congelan automáticamente.",
      "En strict mode, escribir en una propiedad congelada lanza TypeError.",
    ],
    reto:
      "Congela una ficha con un objeto anidado y comprueba si puedes modificar una propiedad del objeto interno.",
    pista:
      "El congelado es superficial; el objeto interno sigue siendo mutable.",
  },
  "object-is": {
    idea:
      "Object.is() es una comparación de igualdad más precisa que === en dos casos: NaN consigo mismo y los ceros con signo.",
    modelo:
      "Es la balanza de precisión: para casi todo coincide con ===, pero detecta diferencias que === ignora.",
    checklist: [
      "Object.is(NaN, NaN) es true; NaN === NaN es false.",
      "Object.is(-0, +0) es false; -0 === +0 es true.",
      "Los objetos se comparan por referencia, igual que con ===.",
      "React usa Object.is para decidir si un estado cambió.",
    ],
    reto:
      "Compara con === y con Object.is los pares (NaN, NaN), (-0, +0) y dos objetos con el mismo contenido.",
    pista:
      "Solo los dos primeros pares muestran diferencias entre ambos operadores.",
  },
  "object-groupby": {
    idea:
      "Object.groupBy() agrupa elementos de un iterable según la clave que devuelve una función. Es el `reduce` de agrupación, pero legible.",
    modelo:
      "Es como repartir cartas en cajas etiquetadas: la función decide en qué caja va cada carta.",
    checklist: [
      "Devuelve un objeto con prototipo null, no un Map.",
      "Las claves se convierten a propiedades (string o symbol).",
      "Mantiene el orden de aparición dentro de cada grupo.",
      "No está en todos los motores antiguos: comprueba compatibilidad o usa un polyfill.",
    ],
    reto:
      "Agrupa una lista de emojis por su longitud o por la primera letra de su nombre y revisa las claves del resultado.",
    pista:
      "La función de agrupación debe devolver la clave; Object.groupBy se encarga del resto.",
  },
  "function-call": {
    idea:
      "call() ejecuta una función de inmediato y decide qué objeto será `this`; los argumentos se pasan uno a uno.",
    modelo:
      "Es invitar a una función a trabajar en la mesa de otro objeto: usas su capacidad, pero el contexto cambia.",
    checklist: [
      "El primer argumento es `this`; el resto son los parámetros normales.",
      "No crea una copia de la función: la ejecuta.",
      "Sirve para pedir prestado un método: `Array.prototype.slice.call(...)`.",
      "En strict mode, si pasas null o undefined, `this` no se convierte en el objeto global.",
    ],
    reto:
      "Tienes dos objetos con `emoji` y una función que usa `this.emoji`. Ejecútala con call() para cada objeto.",
    pista:
      "La función debe declararse aparte y recibir el objeto como primer argumento de call().",
  },
  "function-apply": {
    idea:
      "apply() hace lo mismo que call(), pero recibe los argumentos en un array o array-like. Es ideal cuando ya tienes una lista de valores.",
    modelo:
      "Es la misma invitación que call(), pero los argumentos llegan en una bandeja en lugar de uno por uno.",
    checklist: [
      "Primer argumento: `this`. Segundo argumento: array de parámetros.",
      "Math.max.apply(null, numeros) es el clásico; hoy puede sustituirse por spread.",
      "No confundas apply() con bind(): apply ejecuta; bind devuelve una función.",
      "Si el segundo argumento es null o undefined, se trata como lista vacía.",
    ],
    reto:
      "Usa apply() para llamar a una función que suma tres números, pasando los tres valores en un array.",
    pista:
      "La firma es `fn.apply(contexto, [a, b, c])`.",
  },
  "function-bind": {
    idea:
      "bind() no ejecuta la función: devuelve una nueva función con `this` fijado y, opcionalmente, algunos argumentos ya precargados.",
    modelo:
      "Es guardar una receta con el horno ya encendido y los ingredientes medidos: cuando la uses, solo faltan los detalles finales.",
    checklist: [
      "El `this` queda bloqueado; volver a llamar a call() o apply() no lo cambia.",
      "Los argumentos parciales se colocan antes de los que pases después.",
      "La función devuelta tiene nombre `bound ...`.",
      "Con `new`, el `this` de bind se ignora, pero los argumentos parciales se conservan.",
    ],
    reto:
      "Crea una función `saludar(saludo, nombre)` y usa bind() para fijar el saludo y el objeto `this`. Luego llama a la función resultante solo con el nombre.",
    pista:
      "`const saludarHola = saludar.bind(persona, 'Hola');` y después `saludarHola('Ana')`.",
  },
  "typedarray-set": {
    idea:
      "TypedArray.prototype.set() copia valores dentro de un buffer ya existente. No cambia la longitud del destino: escribe encima de las posiciones que le indiques.",
    modelo:
      "Es rellenar celdas de una bandeja: la bandeja ya tiene un tamaño fijo y tú decides desde qué celda empezar.",
    checklist: [
      "El primer argumento es la fuente (array, TypedArray o array-like).",
      "El segundo argumento es el offset de destino; por defecto 0.",
      "Si la fuente no cabe, lanza RangeError.",
      "Los valores se convierten al tipo del TypedArray; en Uint8Array se ajustan a 0–255.",
    ],
    reto:
      "Crea un Uint8Array de 6 posiciones y copia [10, 20, 30] a partir del índice 2. Comprueba las posiciones vacías.",
    pista:
      "Las posiciones no escritas conservan su valor inicial, normalmente 0.",
  },
  "uint8array-from": {
    idea:
      "Uint8Array.from() crea un TypedArray nuevo a partir de un iterable, un array-like o incluso otro TypedArray, aplicando una función de mapeo si la pasas.",
    modelo:
      "Es una fotocopiadora que además puede transformar cada página mientras la copia.",
    checklist: [
      "Crea un buffer nuevo; no reutiliza el de la fuente.",
      "Cada valor se convierte a entero sin signo de 8 bits (módulo 256).",
      "Puedes pasar una función de mapeo como segundo argumento.",
      "A diferencia de set(), no necesitas un destino previo.",
    ],
    reto:
      "Crea un Uint8Array a partir de [1, 2, 300, -1] y explica por qué algunos valores cambian.",
    pista:
      "Los valores se ajustan al rango 0–255: 300 se convierte en 44 y -1 en 255.",
  },
  "string-at": {
    idea:
      "at() permite leer una posición de la cadena sin calcular índices desde length. Su superpoder son los negativos: -1 es el último carácter.",
    modelo:
      "Es un cursor con dos direcciones: avanza desde el principio con números positivos y retrocede desde el final con números negativos.",
    checklist: [
      "at(0) es el primer carácter; at(-1), el último.",
      "Fuera de rango devuelve undefined, no una cadena vacía.",
      "Los índices decimales se truncan antes de buscar la posición.",
      "Sigue contando unidades UTF-16: un emoji puede ocupar dos posiciones.",
    ],
    reto:
      "Obtén el primer, el último y el penúltimo carácter de un texto usando solo at(). Después compara el resultado con charAt() y con corchetes.",
    pista:
      "Usa at(0), at(-1) y at(-2). Prueba también at(100) para ver que devuelve undefined.",
  },
  "string-length": {
    idea:
      "length no es un método: es una propiedad de solo lectura que cuenta unidades UTF-16. Sirve para validar, recorrer y calcular posiciones.",
    modelo:
      "Es la etiqueta de una cinta métrica: informa del tamaño, pero no puedes cambiar la cuerda escribiendo otro número en la etiqueta.",
    checklist: [
      "Se lee sin paréntesis: texto.length.",
      "No modifica la cadena aunque intentes asignarle un valor.",
      "Los emojis suelen ocupar 2 unidades UTF-16.",
      "Para caracteres visibles usa [...texto].length.",
    ],
    reto:
      "Comprueba la longitud de tu nombre y de un texto con emojis. Explica por qué length y [...texto].length pueden dar resultados distintos.",
    pista:
      "Compara '😀'.length (2) con [...'😀'].length (1). El primero cuenta unidades internas; el segundo, caracteres visibles.",
  },
  "intl-format": {
    idea:
      "format() es la salida de cualquier formateador Intl: recibe un valor y devuelve un string adaptado al idioma y a las opciones del formateador.",
    modelo:
      "El formateador es una plantilla configurada una vez; format() es el sello que aplica esa plantilla a cada valor que le pasas.",
    checklist: [
      "format() no modifica el valor original: devuelve texto.",
      "Cada formateador (NumberFormat, DateTimeFormat, ListFormat...) tiene su propio format().",
      "La configuración vive en el constructor; format() solo recibe el valor.",
      "Reutiliza el formateador fuera de bucles para no recrearlo en cada iteración.",
    ],
    reto:
      "Crea un Intl.NumberFormat para es-ES y otro para en-US. Formatea el mismo número con ambos y explica las diferencias de separadores y decimales.",
    pista:
      "new Intl.NumberFormat('es-ES').format(1234.56) devuelve '1.234,56'; con 'en-US' devuelve '1,234.56'.",
  },
};

export function apuntesDeLaboratorio(metodo) {
  if (!metodo) return null;
  const id = String(metodo.id ?? "");
  const alias = {
    "js-hasownproperty": "object-prototype-hasownproperty",
    "js-new-object": "object-new",
    "js-object-tostring": "object-prototype-tostring",
    "js-object-valueof": "object-prototype-valueof",
  };
  const propios =
    APUNTES_LAB[id] ??
    APUNTES_LAB[alias[id]] ??
    APUNTES_LAB[id.replace(/^js-/, "")];
  if (propios) return propios;

  const idea =
    (metodo.definicion ?? [])
      .map((texto) => String(texto).replace(/\*\*/g, ""))
      .find(Boolean) ?? "Practica el concepto con el ejemplo y observa cada salida.";

  /* Los errores pueden venir como string o como { texto, code }. */
  const soloTexto = (item) =>
    typeof item === "string" ? item : item?.texto ?? "";

  const primerError = soloTexto(metodo.errores?.[0]);

  return {
    idea,
    modelo: metodo.analogia ?? "",
    checklist:
      metodo.notasPersonales?.length > 0
        ? metodo.notasPersonales
        : (metodo.queEs ?? []).slice(0, 3),
    reto:
      "Cambia un valor del ejemplo, predice el resultado antes de ejecutar y compáralo con la consola.",
    pista:
      primerError ||
      "Lee el error, revisa la línea marcada y vuelve a ejecutar.",
  };
}
