/* Ejemplos vivos de los apuntes HTML convertidos.
   Se inyectan `emojis` (categoría array), `texto` (texto) o `numeros` (numero)
   antes de ejecutar cada ejemplo. */

export const APUNTES_HTML_CONFIGS = {
  "object-defineproperty": {
    titulo: "Crea una propiedad con permisos",
    descripcion: "defineProperty() permite decidir si una propiedad se puede escribir, enumerar o configurar.",
    prueba: "Intenta cambiar el emoji después de crearlo: la propiedad no es escribible.",
    codigo: "const ficha = {};\nObject.defineProperty(ficha, \"emoji\", {\n  value: emojis[0] ?? \"✨\",\n  writable: false,\n  enumerable: true,\n  configurable: false,\n});\nconsole.log(\"Ficha:\", ficha);\nconsole.log(\n  \"Descriptor:\",\n  Object.getOwnPropertyDescriptor(ficha, \"emoji\"),\n);\ntry {\n  ficha.emoji = \"🚫\";\n} catch (error) {\n  console.log(\"No se puede cambiar:\", error.name);\n}\nconsole.log(\"Valor final:\", ficha.emoji);\nreturn ficha.emoji;",
    estricto: false,
  },
  "object-defineproperties": {
    titulo: "Varias propiedades de una sola vez",
    descripcion: "defineProperties() recibe un objeto de descriptores y aplica cada uno a la misma ficha.",
    prueba: "Añade un descriptor nuevo y comprueba cómo aparece en el objeto.",
    codigo: "const ficha = {};\nObject.defineProperties(ficha, {\n  emoji: {\n    value: emojis[0] ?? \"✨\",\n    enumerable: true,\n    writable: true,\n  },\n  total: {\n    value: emojis.length,\n    enumerable: true,\n    writable: false,\n  },\n});\nconsole.log(\"Ficha:\", ficha);\nconsole.log(\"Claves:\", Object.keys(ficha));\nreturn { emoji: ficha.emoji, total: ficha.total };",
    estricto: false,
  },
  "object-getownpropertydescriptor": {
    titulo: "Inspecciona los permisos de una propiedad",
    descripcion: "El descriptor revela si la propiedad se puede escribir, enumerar o reconfigurar.",
    prueba: "Compara una propiedad normal con una creada con defineProperty().",
    codigo: "const ficha = { emoji: emojis[0] ?? \"✨\" };\nObject.defineProperty(ficha, \"codigo\", {\n  value: \"A-01\",\n  enumerable: false,\n  writable: false,\n});\nconsole.log(\"emoji:\", Object.getOwnPropertyDescriptor(ficha, \"emoji\"));\nconsole.log(\"codigo:\", Object.getOwnPropertyDescriptor(ficha, \"codigo\"));\nconsole.log(\"Claves enumerables:\", Object.keys(ficha));\nreturn Object.getOwnPropertyDescriptor(ficha, \"codigo\");",
    estricto: false,
  },
  "object-prototype-hasownproperty": {
    titulo: "Propia frente a heredada",
    descripcion: "hasOwnProperty() distingue lo que el objeto guarda de lo que hereda del prototipo.",
    prueba: "Prueba con 'toString': existe, pero no es propia de la ficha.",
    codigo: "const ficha = { emoji: emojis[0] ?? \"✨\" };\nconsole.log(\"emoji:\", ficha.hasOwnProperty(\"emoji\"));\nconsole.log(\"toString:\", ficha.hasOwnProperty(\"toString\"));\nconsole.log(\"toString en el prototipo:\", \"toString\" in ficha);\nreturn ficha.hasOwnProperty(\"emoji\");",
    estricto: false,
  },
  "object-prototype-tostring": {
    titulo: "La etiqueta interna de cada valor",
    descripcion: "Object.prototype.toString.call() es una forma fiable de conocer el tipo real de un valor.",
    prueba: "Compara un array, un objeto, un número y null.",
    codigo: "const ficha = { emoji: emojis[0] ?? \"✨\" };\nconsole.log(\"Ficha:\", ficha.toString());\nconsole.log(\"Array:\", Object.prototype.toString.call(emojis));\nconsole.log(\"Número:\", Object.prototype.toString.call(42));\nconsole.log(\"Null:\", Object.prototype.toString.call(null));\nreturn Object.prototype.toString.call(emojis);",
    estricto: false,
  },
  "object-prototype-valueof": {
    titulo: "Convierte el objeto en número",
    descripcion: "Si defines valueOf(), el objeto puede participar en operaciones aritméticas.",
    prueba: "Cambia el valor interno y observa cómo cambia la suma.",
    codigo: "const precio = {\n  valor: emojis.length,\n  valueOf() {\n    return this.valor;\n  },\n};\nconsole.log(\"valueOf:\", precio.valueOf());\nconsole.log(\"precio + 5:\", precio + 5);\nconsole.log(\"precio * 2:\", precio * 2);\nreturn precio + 5;",
    estricto: false,
  },
  "object-getprototypeof": {
    titulo: "Descubre de quién hereda",
    descripcion: "getPrototypeOf() permite comprobar si dos objetos comparten el mismo prototipo.",
    prueba: "Crea una ficha con Object.create() y compara su prototipo con el de un literal.",
    codigo: "const base = {\n  saludar() {\n    return \"Hola \" + this.emoji;\n  },\n};\nconst ficha = Object.create(base);\nficha.emoji = emojis[0] ?? \"✨\";\nconsole.log(\"¿Prototipo correcto?\", Object.getPrototypeOf(ficha) === base);\nconsole.log(ficha.saludar());\nreturn ficha.saludar();",
    estricto: false,
  },
  "object-setprototypeof": {
    titulo: "Cambia el prototipo en caliente",
    descripcion: "setPrototypeOf() conecta un objeto con un nuevo prototipo y conserva sus propiedades propias.",
    prueba: "Invoca el método heredado antes y después del cambio.",
    codigo: "const base = {\n  describir() {\n    return \"Soy \" + this.emoji;\n  },\n};\nconst ficha = { emoji: emojis[0] ?? \"✨\" };\nconsole.log(\"Prototipo inicial:\", Object.getPrototypeOf(ficha) === Object.prototype);\nObject.setPrototypeOf(ficha, base);\nconsole.log(ficha.describir());\nconsole.log(\"Nuevo prototipo:\", Object.getPrototypeOf(ficha) === base);\nreturn ficha.describir();",
    estricto: false,
  },
  "object-new": {
    titulo: "new Object() con y sin valor",
    descripcion: "new Object() sin argumentos crea un objeto vacío. Con un objeto, devuelve ese objeto tal cual.",
    prueba: "Compara new Object(emojis) con emojis usando ===.",
    codigo: "const vacio = new Object();\nvacio.emoji = emojis[0] ?? \"✨\";\nconst mismoArray = new Object(emojis);\nconsole.log(\"Objeto vacío:\", vacio);\nconsole.log(\"¿Devuelve el mismo array?\", mismoArray === emojis);\nconsole.log(\"Longitud:\", mismoArray.length);\nreturn vacio;",
    estricto: false,
  },
  "object-seal": {
    titulo: "Sella la ficha pero deja editar",
    descripcion: "Un objeto sellado conserva sus propiedades actuales; no se pueden añadir ni eliminar.",
    prueba: "Intenta añadir 'puntos' y luego cambia el emoji: lo segundo sí funciona.",
    codigo: "const ficha = { emoji: emojis[0] ?? \"✨\" };\nObject.seal(ficha);\ntry {\n  ficha.puntos = 10;\n} catch (error) {\n  console.log(\"No se añaden propiedades:\", error.name);\n}\nficha.emoji = \"🔄\";\nconsole.log(\"¿Sellado?\", Object.isSealed(ficha));\nconsole.log(\"Ficha:\", ficha);\nreturn ficha;",
    estricto: false,
  },
  "object-issealed": {
    titulo: "Detecta si está sellado",
    descripcion: "isSealed() devuelve true solo cuando el objeto no es extensible y todas sus propiedades son no configurables.",
    prueba: "Compara un objeto normal con uno pasado por Object.seal().",
    codigo: "const abierto = { emoji: emojis[0] ?? \"✨\" };\nconst sellado = Object.seal({ emoji: emojis[1] ?? emojis[0] ?? \"✨\" });\nconsole.log(\"Abierto:\", Object.isSealed(abierto));\nconsole.log(\"Sellado:\", Object.isSealed(sellado));\nreturn Object.isSealed(sellado);",
    estricto: false,
  },
  "object-preventextensions": {
    titulo: "Bloquea propiedades nuevas",
    descripcion: "preventExtensions() solo cierra la puerta a propiedades nuevas; las actuales siguen vivas.",
    prueba: "Intenta añadir una propiedad y luego borra una existente: verás la diferencia con seal().",
    codigo: "const ficha = { emoji: emojis[0] ?? \"✨\" };\nObject.preventExtensions(ficha);\ntry {\n  ficha.puntos = 10;\n} catch (error) {\n  console.log(\"No se añade:\", error.name);\n}\nficha.emoji = \"🔄\";\ndelete ficha.emoji;\nconsole.log(\"¿Extensible?\", Object.isExtensible(ficha));\nconsole.log(\"Ficha:\", ficha);\nreturn Object.isExtensible(ficha);",
    estricto: false,
  },
  "object-isextensible": {
    titulo: "¿Admite propiedades nuevas?",
    descripcion: "isExtensible() devuelve false después de preventExtensions(), seal() o freeze().",
    prueba: "Prueba los tres métodos y compara los resultados.",
    codigo: "const abierto = { emoji: emojis[0] ?? \"✨\" };\nconst cerrado = Object.preventExtensions({ emoji: emojis[1] ?? emojis[0] ?? \"✨\" });\nconst congelado = Object.freeze({ emoji: emojis[2] ?? emojis[0] ?? \"✨\" });\nconsole.log(\"Abierto:\", Object.isExtensible(abierto));\nconsole.log(\"Cerrado:\", Object.isExtensible(cerrado));\nconsole.log(\"Congelado:\", Object.isExtensible(congelado));\nreturn Object.isExtensible(cerrado);",
    estricto: false,
  },
  "object-isfrozen": {
    titulo: "Detecta objetos congelados",
    descripcion: "isFrozen() solo devuelve true si el objeto no es extensible y todas sus propiedades son de solo lectura.",
    prueba: "Compara un objeto normal, uno sellado y uno congelado.",
    codigo: "const normal = { emoji: emojis[0] ?? \"✨\" };\nconst sellado = Object.seal({ emoji: emojis[1] ?? emojis[0] ?? \"✨\" });\nconst congelado = Object.freeze({ emoji: emojis[2] ?? emojis[0] ?? \"✨\" });\nconsole.log(\"Normal:\", Object.isFrozen(normal));\nconsole.log(\"Sellado:\", Object.isFrozen(sellado));\nconsole.log(\"Congelado:\", Object.isFrozen(congelado));\nreturn Object.isFrozen(congelado);",
    estricto: false,
  },
  "object-is": {
    titulo: "Las diferencias con ===",
    descripcion: "Object.is() considera iguales a dos NaN y distintos a 0 y -0.",
    prueba: "Compara los mismos casos con === para ver la diferencia.",
    codigo: "console.log(\"NaN con Object.is:\", Object.is(NaN, NaN));\nconsole.log(\"NaN con ===:\", NaN === NaN);\nconsole.log(\"0 y -0 con Object.is:\", Object.is(0, -0));\nconsole.log(\"0 y -0 con ===\", 0 === -0);\nconsole.log(\"Mismo emoji:\", Object.is(emojis[0], emojis[0]));\nreturn Object.is(NaN, NaN);",
    estricto: false,
  },
  "object-groupby": {
    titulo: "Agrupa emojis por posición",
    descripcion: "groupBy() crea un objeto cuyas claves son los grupos y cuyos valores son arrays de elementos.",
    prueba: "Cambia la función de agrupación para separar por longitud del emoji o por índice.",
    codigo: "const grupos = Object.groupBy(emojis, (emoji, indice) =>\n  indice % 2 === 0 ? \"pares\" : \"impares\",\n);\nconsole.log(\"Grupos:\", grupos);\nconsole.log(\"Pares:\", grupos.pares);\nconsole.log(\"Impares:\", grupos.impares);\nreturn grupos;",
    estricto: false,
  },
  "function-call": {
    titulo: "Ejecuta con otro this",
    descripcion: "call() invoca la función de inmediato y le pasa el objeto que debe usar como this.",
    prueba: "Cambia el emoji de la ficha y vuelve a ejecutar.",
    codigo: "const ficha = { emoji: emojis[0] ?? \"✨\" };\nfunction describir(sufijo) {\n  return this.emoji + \" \" + sufijo;\n}\nconsole.log(describir.call(ficha, \"vive aquí\"));\nconsole.log(describir.call({ emoji: \"🌍\" }, \"es el mundo\"));\nreturn describir.call(ficha, \"vive aquí\");",
    estricto: false,
  },
  "function-apply": {
    titulo: "Argumentos en un array",
    descripcion: "apply() es como call(), pero recibe la lista de argumentos dentro de un array.",
    prueba: "Cambia los números del array de argumentos y observa el total.",
    codigo: "const ficha = { emoji: emojis[0] ?? \"✨\" };\nfunction sumarPuntos(a, b) {\n  return this.emoji + \": \" + (a + b);\n}\nconst argumentos = [10, 5];\nconsole.log(sumarPuntos.apply(ficha, argumentos));\nconsole.log(sumarPuntos.apply({ emoji: \"🌍\" }, [1, 2]));\nreturn sumarPuntos.apply(ficha, argumentos);",
    estricto: false,
  },
  "function-bind": {
    titulo: "Prepara una función enlazada",
    descripcion: "bind() no ejecuta la función: crea una copia que siempre usará el mismo this.",
    prueba: "Ejecuta la función enlazada varias veces y comprueba que el this no cambia.",
    codigo: "const ficha = { emoji: emojis[0] ?? \"✨\" };\nfunction saludar(saludo) {\n  return saludo + \", \" + this.emoji;\n}\nconst saludoFijo = saludar.bind(ficha, \"Hola\");\nconsole.log(saludoFijo());\nconsole.log(saludoFijo());\nconsole.log(\"La original no cambia:\", saludar.call({ emoji: \"🌍\" }, \"Hey\"));\nreturn saludoFijo();",
    estricto: false,
  },
  "typedarray-set": {
    titulo: "Copia números en un buffer",
    descripcion: "set() escribe los valores en el TypedArray sin cambiar su longitud.",
    prueba: "Cambia la cantidad de emojis o el offset para mover los valores dentro del buffer.",
    codigo: "const valores = emojis.map((_, indice) => (indice + 1) * 10);\nconst destino = new Uint8Array(valores.length + 2);\ndestino.set(valores, 1);\nconsole.log(\"Valores:\", valores);\nconsole.log(\"Buffer:\", destino);\nconsole.log(\"Longitud:\", destino.length);\nreturn Array.from(destino);",
    estricto: false,
  },
  "uint8array-from": {
    titulo: "Convierte valores en bytes",
    descripcion: "from() recorre el iterable y guarda cada resultado como un byte de 0 a 255.",
    prueba: "Añade emojis o cambia la multiplicación para ver cómo se ajustan los bytes.",
    codigo: "const bytes = Uint8Array.from(emojis, (_, indice) =>\n  ((indice + 1) * 40) % 256,\n);\nconsole.log(\"Emojis:\", emojis.length);\nconsole.log(\"Bytes:\", bytes);\nconsole.log(\"Como array normal:\", Array.from(bytes));\nreturn Array.from(bytes);",
    estricto: false,
  },

  /* --- Object: copia, prototipos y colecciones --- */

  "js-object-assign": {
    titulo: "Copia y fusiona objetos",
    descripcion:
      "assign() copia las propiedades enumerables de los orígenes al destino y devuelve el mismo destino.",
    prueba:
      "Cambia el orden de los orígenes: la última propiedad con el mismo nombre gana.",
    codigo:
      "const base = { emoji: emojis[0] ?? \"😀\", puntos: 10 };\nconst copia = Object.assign({}, base);\ncopia.puntos = 999;\nconst fusion = Object.assign({}, base, { nivel: \"oro\" });\nconsole.log(\"Original:\", base);\nconsole.log(\"Copia modificada:\", copia);\nconsole.log(\"Fusión:\", fusion);\nconsole.log(\"¿Misma referencia?\", copia === base);\nreturn fusion;",
    estricto: false,
  },

  "js-object-create": {
    titulo: "Elige el prototipo del objeto",
    descripcion:
      "create() fabrica un objeto nuevo cuyo prototipo es el que tú indiques. Con null, no hereda nada.",
    prueba:
      "Compara la ficha creada con base frente al objeto sin prototipo.",
    codigo:
      "const base = {\n  saludar() {\n    return \"Hola \" + this.emoji;\n  },\n};\nconst ficha = Object.create(base);\nficha.emoji = emojis[0] ?? \"😀\";\nconst sinPrototipo = Object.create(null);\nsinPrototipo.emoji = emojis[1] ?? emojis[0] ?? \"😀\";\nconsole.log(\"¿Hereda de base?\", Object.getPrototypeOf(ficha) === base);\nconsole.log(ficha.saludar());\nconsole.log(\"Prototipo nulo:\", Object.getPrototypeOf(sinPrototipo));\nreturn ficha.saludar();",
    estricto: false,
  },

  "js-object-entries": {
    titulo: "Recorre pares clave-valor",
    descripcion:
      "entries() devuelve un array de pares [clave, valor], ideal para recorrer objetos con for...of.",
    prueba:
      "Añade una propiedad nueva a la ficha y observa cómo aparece en el recorrido.",
    codigo:
      "const ficha = {\n  emoji: emojis[0] ?? \"😀\",\n  puntos: emojis.length,\n  nivel: \"oro\",\n};\nfor (const [clave, valor] of Object.entries(ficha)) {\n  console.log(clave + \" → \" + valor);\n}\nconst pares = Object.entries(ficha).map(\n  ([clave, valor]) => clave + \"=\" + valor,\n);\nconsole.log(\"Pares:\", pares);\nreturn pares;",
    estricto: false,
  },

  "js-object-freeze": {
    titulo: "Congela el objeto de verdad",
    descripcion:
      "freeze() impide añadir, borrar o modificar propiedades. En modo estricto, el intento lanza un TypeError.",
    prueba:
      "Quita el bloque try/catch y ejecuta: verás el error exacto en la consola.",
    codigo:
      "const ficha = Object.freeze({\n  emoji: emojis[0] ?? \"😀\",\n  puntos: 10,\n});\nconsole.log(\"¿Congelado?\", Object.isFrozen(ficha));\ntry {\n  ficha.puntos = 99;\n} catch (error) {\n  console.log(\"No se puede modificar:\", error.name);\n}\nconsole.log(\"Valor final:\", ficha.puntos);\nreturn ficha;",
    estricto: true,
  },

  "js-object-fromentries": {
    titulo: "Convierte pares en objeto",
    descripcion:
      "fromEntries() es la operación inversa de entries(): recibe pares [clave, valor] y devuelve un objeto.",
    prueba:
      "Duplica una clave en el array y comprueba qué valor sobrevive.",
    codigo:
      "const pares = [\n  [\"emoji\", emojis[0] ?? \"😀\"],\n  [\"puntos\", emojis.length],\n  [\"nivel\", \"oro\"],\n];\nconst ficha = Object.fromEntries(pares);\nconsole.log(\"Pares:\", pares);\nconsole.log(\"Objeto:\", ficha);\nconsole.log(\"Claves:\", Object.keys(ficha));\nreturn ficha;",
    estricto: false,
  },

  "js-object-hasown": {
    titulo: "Propia frente a heredada",
    descripcion:
      "hasOwn() solo devuelve true para propiedades que el objeto guarda directamente, no para las heredadas.",
    prueba:
      "Prueba con 'saludo', que vive en el prototipo: existe, pero no es propia.",
    codigo:
      "const base = { saludo: \"hola\" };\nconst ficha = Object.create(base);\nficha.emoji = emojis[0] ?? \"😀\";\nconsole.log(\"emoji propia:\", Object.hasOwn(ficha, \"emoji\"));\nconsole.log(\"saludo propia:\", Object.hasOwn(ficha, \"saludo\"));\nconsole.log(\"saludo heredada:\", \"saludo\" in ficha);\nreturn Object.hasOwn(ficha, \"emoji\");",
    estricto: false,
  },

  "js-object-keys": {
    titulo: "Lista las claves enumerables",
    descripcion:
      "keys() devuelve solo las claves propias que se pueden enumerar; las ocultas con defineProperty no aparecen.",
    prueba:
      "Cambia enumerable a true en 'secreto' y vuelve a ejecutar.",
    codigo:
      "const ficha = {\n  emoji: emojis[0] ?? \"😀\",\n  puntos: 10,\n  nivel: \"oro\",\n};\nObject.defineProperty(ficha, \"secreto\", {\n  value: true,\n  enumerable: false,\n});\nconsole.log(\"Claves enumerables:\", Object.keys(ficha));\nconsole.log(\"Todas las propias:\", Object.getOwnPropertyNames(ficha));\nconsole.log(\"Cantidad:\", Object.keys(ficha).length);\nreturn Object.keys(ficha);",
    estricto: false,
  },

  "js-object-values": {
    titulo: "Extrae solo los valores",
    descripcion:
      "values() devuelve un array con los valores enumerables del objeto, en el mismo orden que keys().",
    prueba:
      "Añade una propiedad numérica y comprueba cómo cambia el array de valores.",
    codigo:
      "const ficha = {\n  emoji: emojis[0] ?? \"😀\",\n  puntos: 10,\n  nivel: \"oro\",\n};\nconsole.log(\"Valores:\", Object.values(ficha));\nconsole.log(\"Suma de puntos:\", ficha.puntos + emojis.length);\nreturn Object.values(ficha);",
    estricto: false,
  },

  /* --- Web API: window.print() (simulada en el worker) --- */

  "js-window-print": {
    titulo: "Simula el diálogo de impresión",
    descripcion:
      "window.print() abre el diálogo nativo del navegador. Aquí simulamos la API para ver el flujo dentro del worker.",
    prueba:
      "Cambia el contenido del documento y observa cómo se prepara antes de imprimir.",
    codigo:
      "/* En el worker no existe window real: creamos una simulación. */\nconst window = {\n  print() {\n    console.log(\"🖨️ Se abriría el diálogo de impresión del navegador.\");\n    return undefined;\n  },\n};\nconst documento = emojis.map(\n  (emoji, indice) => `${indice + 1}. ${emoji}`,\n);\nconsole.log(\"Contenido a imprimir:\");\ndocumento.forEach((linea) => console.log(linea));\nconst resultado = window.print();\nconsole.log(\"window.print() devuelve:\", resultado);\nreturn documento.length;",
    estricto: false,
  },
};

export const APUNTES_HTML_CATEGORIAS = {
  "object-defineproperty": "array",
  "object-defineproperties": "array",
  "object-getownpropertydescriptor": "array",
  "object-prototype-hasownproperty": "array",
  "object-prototype-tostring": "array",
  "object-prototype-valueof": "array",
  "object-getprototypeof": "array",
  "object-setprototypeof": "array",
  "object-new": "array",
  "object-seal": "array",
  "object-issealed": "array",
  "object-preventextensions": "array",
  "object-isextensible": "array",
  "object-isfrozen": "array",
  "object-is": "array",
  "object-groupby": "array",
  "function-call": "array",
  "function-apply": "array",
  "function-bind": "array",
  "typedarray-set": "array",
  "uint8array-from": "array",
  "js-object-assign": "array",
  "js-object-create": "array",
  "js-object-entries": "array",
  "js-object-freeze": "array",
  "js-object-fromentries": "array",
  "js-object-hasown": "array",
  "js-object-keys": "array",
  "js-object-values": "array",
  "js-window-print": "array",
};
