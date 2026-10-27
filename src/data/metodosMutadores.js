// Formato inline permitido en los textos: **negrita**, *cursiva* y `código`
// Los items de las listas pueden ser string o { texto, code, nota }

export const METODOS_MUTADORES = {
  push: {
    id: "push",
    titulo: "Array.prototype.push()",
    simulador: "mutador",
    definicion: [
      "Es un método **mutador** integrado en JavaScript que se utiliza para añadir uno o más elementos al **final** de un array.",
      "Devuelve la **nueva longitud** (el número total de elementos) que tiene el array después de la modificación.",
    ],
    queEs: [
      "Es uno de los métodos más básicos e importantes para la manipulación de arrays.",
      "A diferencia de los métodos de búsqueda que vimos antes, `push()` es un método **mutador**, lo que significa que modifica directamente el array original sobre el cual se ejecuta.",
    ],
    paraQueSirve: [
      "Sirve para hacer crecer una lista dinámicamente.",
      "Es el método por excelencia cuando estás recolectando datos secuencialmente, guardando registros en un historial, o agregando elementos a una lista de tareas (To-Do list) a medida que el usuario los introduce.",
    ],
    comoFunciona: [
      "Toma los argumentos que le pases (pueden ser números, strings, objetos, u otros arrays).",
      "Los coloca en orden en las posiciones finales del array, asignándoles los nuevos índices correspondientes.",
      "Actualiza internamente la propiedad `.length` del array.",
      "Al terminar la operación, **retorna un número entero** que representa la nueva cantidad de elementos del array.",
    ],
    sintaxis: [
      {
        code: `// Añadir un solo elemento
array.push(elemento1);

// Añadir múltiples elementos a la vez
array.push(elemento1, elemento2, elementoN);`,
      },
    ],
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico con tipos primitivos",
        code: `const carrito = ["Laptop", "Mouse"];
const nuevaLongitud = carrito.push("Teclado");

console.log(carrito);       // Resultado: ["Laptop", "Mouse", "Teclado"] (Array modificado)
console.log(nuevaLongitud); // Resultado: 3 (Devuelve la cantidad de elementos)`,
      },
      {
        titulo: "Ejemplo 2: Añadir múltiples elementos a la vez",
        code: `const numeros = [1, 2];
numeros.push(3, 4, 5);
console.log(numeros); // Resultado: [1, 2, 3, 4, 5]`,
      },
    ],
    errores: [
      {
        texto:
          "**Confundir el valor de retorno:** Un error clásico de principiante es intentar asignar el resultado de `push()` a una variable esperando el array actualizado.",
        code: `const misNotas = ["Nota 1"];
const misNotasActualizadas = misNotas.push("Nota 2");
console.log(misNotasActualizadas); // Resultado: 2 (¡Es la longitud, no el array!)`,
      },
      {
        texto:
          "**Romper la inmutabilidad en React:** En React, nunca debes usar `push()` directamente sobre el estado, porque mutarías el estado original de forma invisible y React no renderizará los cambios.",
        code: `// ❌ INCORRECTO EN REACT:
setNotas(notas.push("Nueva Nota"));

// ✅ CORRECTO EN REACT (Usando Spread Operator para crear un nuevo array):
setNotas([...notas, "Nueva Nota"]);`,
      },
    ],
    casos: [
      "**Acumulación de datos:** Guardar las acciones o logs de un usuario en un array cronológico a medida que ocurren.",
      "**Algoritmos de estructuras de datos:** Implementar el comportamiento de una estructura tipo Pila (Stack), donde el último en entrar es el primero en salir.",
    ],
    relacion: [
      "**`pop()`:** Es su hermano opuesto. Remueve el último elemento del array y lo retorna.",
      "**`unshift()`:** Hace lo mismo que `push()`, pero añade los elementos al principio del array (índice 0), desplazando todos los demás hacia la derecha (lo cual es más costoso en rendimiento).",
      "**Operador Spread (`[...]`):** Es la alternativa inmutable a `push()`. Consigue el mismo resultado visual sin modificar el array original.",
    ],
    analogia:
      "Imagina que estás en la fila de un banco. Cuando llega un cliente nuevo, no se mete al principio ni en el medio; por educación, se coloca **al final de la fila**. La fila se vuelve más larga y el contador de personas en espera aumenta en uno. Eso es exactamente lo que hace `push()`.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve push()?",
        opciones: [
          "El array modificado",
          "La nueva longitud del array",
          "El elemento agregado",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿push() modifica el array original?",
        opciones: [
          "No, crea una copia",
          "Sí, es un método mutador",
          "Solo si contiene números",
          "Depende del navegador",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Dónde añade push() los elementos?",
        opciones: [
          "Al principio",
          "En el medio",
          "Al final",
          "En una posición aleatoria",
        ],
        correcta: 2,
      },
      {
        id: 4,
        pregunta:
          "Si const a = [1, 2] y ejecuto a.push(3, 4, 5), ¿cómo queda a?",
        opciones: [
          "[1, 2]",
          "[1, 2, 3, 4, 5]",
          "[3, 4, 5]",
          "[1, 2, [3, 4, 5]]",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: '¿Qué pasa con setNotas(notas.push("Nueva Nota")) en React?',
        opciones: [
          "Funciona perfecto",
          "Guarda un número (la longitud) y muta el estado original",
          "Agrega la nota al inicio",
          "Lanza un error de sintaxis",
        ],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿Cuál es la alternativa inmutable a push() en React?",
        opciones: ["pop()", '[...notas, "Nueva Nota"]', "shift()", "splice()"],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿Qué estructura de datos se modela con push() y pop()?",
        opciones: [
          "Pila (Stack, LIFO)",
          "Cola (Queue, FIFO)",
          "Árbol binario",
          "Tabla hash",
        ],
        correcta: 0,
      },
      {
        id: 8,
        pregunta: "¿Por qué unshift() es más costoso que push()?",
        opciones: [
          "Porque devuelve más datos",
          "Porque debe desplazar todos los elementos existentes",
          "Porque crea una copia del array",
          "Porque usa recursión",
        ],
        correcta: 1,
      },
    ],
  },

  pop: {
    id: "pop",
    titulo: "Array.prototype.pop()",
    simulador: "mutador",
    definicion: [
      "Es un método **mutador** integrado en JavaScript que se utiliza para eliminar el **último** elemento de un array.",
      "Modifica el tamaño del array original y devuelve el **elemento exacto que fue eliminado**.",
    ],
    queEs: [
      "Es el hermano opuesto del método `push()`.",
      'Mientras que `push()` hace crecer el array por el final, `pop()` lo encoge desde el mismo extremo. Al igual que `push()`, pertenece al "bajo mundo" de los métodos **mutadores**, ya que altera directamente la estructura y longitud de los datos originales en la memoria.',
    ],
    paraQueSirve: [
      "Sirve para extraer de forma secuencial el elemento más reciente de una lista.",
      'Se utiliza mucho en algoritmos donde necesitas procesar elementos en orden inverso al que entraron, limpiar un historial paso a paso o implementar mecánicas de "deshacer" (Undo).',
    ],
    comoFunciona: [
      "Ubica el último elemento disponible en el array (el que se encuentra en la posición `array.length - 1`).",
      "Remueve físicamente ese elemento del array en la memoria RAM.",
      "Actualiza de manera automática la propiedad `.length`, reduciéndola en 1.",
      "**Retorna el elemento eliminado**. Si el array ya estaba vacío antes de ejecutar el método, no hace nada y devuelve `undefined`.",
    ],
    sintaxis: [
      {
        code: `// No recibe ningún argumento o parámetro
const elementoRemovido = array.pop();`,
      },
    ],
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico con extracción de valor",
        code: `const pestañasBrowser = ["Inicio", "Notion", "GitHub"];
const pestañaCerrada = pestañasBrowser.pop();

console.log(pestañasBrowser); // Resultado: ["Inicio", "Notion"] (Arreglo mutado)
console.log(pestañaCerrada);   // Resultado: "GitHub" (El elemento que sacamos)`,
      },
      {
        titulo: "Ejemplo 2: Ejecución sobre un array vacío",
        code: `const vacio = [];
const resultado = vacio.pop();

console.log(resultado); // Resultado: undefined
console.log(vacio.length); // Resultado: 0`,
      },
    ],
    errores: [
      {
        texto:
          "**Confundir el valor de retorno con el array modificado:** A diferencia de `push()` (que devuelve la longitud), `pop()` devuelve el objeto o valor extraído. Si intentas guardar el resultado esperando ver el array sin el último elemento, perderás el array.",
        code: `let tareas = ["Diseñar", "Programar"];
tareas = tareas.pop();
console.log(tareas); // Resultado: "Programar" (¡Destruiste el arreglo!)`,
      },
      {
        texto:
          "**Mutación involuntaria en React:** Al igual que con `push()`, usar `pop()` directamente sobre una variable de estado en React modificará la dirección de memoria original de manera destructiva sin disparar un nuevo renderizado de la interfaz.",
        code: `// ❌ INCORRECTO EN REACT:
setHistorial(historial.pop());

// ✅ CORRECTO EN REACT (Extraer de forma inmutable usando slicing o filtrado):
setHistorial(historial.slice(0, -1)); // Crea un nuevo array sin el último elemento`,
      },
    ],
    casos: [
      "**Mecánica de Deshacer (Undo):** Guardar los estados de una acción en un array y usar `pop()` para remover el último cambio cuando el usuario presiona Ctrl+Z.",
      "**Estructuras de Datos (Pilas / Stacks):** Junto con `push()`, permite modelar de forma perfecta el comportamiento *LIFO (Last In, First Out)*, donde el último plato en la pila es el primero que lavas.",
    ],
    relacion: [
      "**`push()`:** Añade elementos al final de la estructura.",
      "**`shift()`:** Es el equivalente a `pop()`, pero elimina el **primer** elemento del array (índice 0), obligando a reindexar toda la lista en memoria (más costoso en rendimiento).",
      "**`slice(0, -1)`:** Es la alternativa inmutable si solo deseas obtener una copia del array sin el último elemento, protegiendo el original.",
    ],
    analogia:
      "Imagina un tubo vertical lleno de pelotas de tenis. No puedes sacar una pelota del fondo ni del medio sin armar un desastre. La única forma física y natural de vaciar el tubo es quitando **la pelota que está arriba del todo**. Retiras esa pelota, la sostienes en tu mano (valor de retorno) y el tubo ahora tiene una pelota menos. Eso es `pop()`.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve pop()?",
        opciones: [
          "La nueva longitud",
          "El array sin el último elemento",
          "El elemento eliminado",
          "true",
        ],
        correcta: 2,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve pop() si el array está vacío?",
        opciones: ["null", "-1", "Un error", "undefined"],
        correcta: 3,
      },
      {
        id: 3,
        pregunta: "¿Qué elemento elimina pop()?",
        opciones: [
          "El primero",
          "El último",
          "El del medio",
          "El que indiques por índice",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta:
          'Si hago let tareas = ["Diseñar", "Programar"]; tareas = tareas.pop(); ¿cuánto vale tareas?',
        opciones: ['["Diseñar"]', '"Programar"', "2", "undefined"],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Cuál es la alternativa inmutable a pop() en React?",
        opciones: [
          "historial.slice(0, -1)",
          "historial.pop()",
          "historial.shift()",
          "historial.push()",
        ],
        correcta: 0,
      },
      {
        id: 6,
        pregunta: "¿Qué principio modelan juntos push() y pop()?",
        opciones: ["FIFO", "LIFO", "Round Robin", "Prioridad"],
        correcta: 1,
      },
      {
        id: 7,
        pregunta: "¿Por qué pop() es más rápido que shift()?",
        opciones: [
          "No necesita reindexar los demás elementos",
          "Porque no modifica el array",
          "Porque usa menos memoria",
          "Porque es asíncrono",
        ],
        correcta: 0,
      },
      {
        id: 8,
        pregunta: "¿Qué parámetros recibe pop()?",
        opciones: ["Un índice", "Un callback", "Ninguno", "Una cantidad"],
        correcta: 2,
      },
    ],
  },

  shift: {
    id: "shift",
    titulo: "Array.prototype.shift()",
    simulador: "mutador",
    definicion: [
      "Es un método **mutador** integrado en JavaScript que se utiliza para eliminar el **primer** elemento de un array (el que se encuentra en el índice `0`).",
      "Modifica el tamaño del array original, desplaza todos los elementos restantes una posición hacia la izquierda y devuelve el **elemento exacto que fue eliminado**.",
    ],
    queEs: [
      "Es el equivalente a `pop()`, pero operando en el extremo opuesto del array.",
      'Pertenece al "bajo mundo" de los métodos **mutadores**.',
      "Al alterar el índice `0`, obliga a JavaScript a reescribir las posiciones de memoria de todos los demás elementos, lo que lo hace un método más costoso en rendimiento que `pop()`.",
    ],
    paraQueSirve: [
      "Sirve para extraer elementos secuencialmente respetando el orden en el que llegaron.",
      "Es el método fundamental para procesar listas de espera, colas de impresión o flujos de tareas donde el primero en llegar debe ser el primero en ser atendido.",
    ],
    comoFunciona: [
      "Ubica el elemento en el índice `0` del array.",
      "Remueve físicamente ese elemento de la memoria RAM.",
      "**Reindexa el array:** Mueve el elemento del índice `1` al `0`, el del `2` al `1`, y así sucesivamente.",
      "Actualiza de manera automática la propiedad `.length`, reduciéndola en 1.",
      "**Retorna el elemento eliminado**. Si el array ya estaba vacío, devuelve `undefined`.",
    ],
    sintaxis: [
      {
        code: `// No recibe ningún argumento o parámetro
const primerElementoRemovido = array.shift();`,
      },
    ],
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico con extracción de valor",
        code: `const filaBanco = ["Josue", "Ana", "Hugo"];
const atendido = filaBanco.shift();

console.log(filaBanco); // Resultado: ["Ana", "Hugo"] (Arreglo mutado y reindexado)
console.log(atendido);  // Resultado: "Josue" (El elemento que sacamos del principio)`,
      },
      {
        titulo: "Ejemplo 2: Ejecución sobre un array vacío",
        code: `const tareas = [];
const resultado = tareas.shift();

console.log(resultado); // Resultado: undefined`,
      },
    ],
    errores: [
      "**Ignorar el costo de rendimiento (Big O):** Usar `shift()` en arrays gigantescos (ej. 100,000 elementos) puede ralentizar tu app, porque la computadora tiene que reescribir 99,999 índices en memoria uno por uno.",
      {
        texto:
          "**Mutación involuntaria en React:** Al igual que `pop()` o `push()`, usar `shift()` directamente sobre un estado modificará la dirección de memoria original sin que React se entere, rompiendo el renderizado.",
        code: `// ❌ INCORRECTO EN REACT:
setLista(lista.shift());

// ✅ CORRECTO EN REACT (Extraer de forma inmutable usando destructuring y rest):
const [primerElemento, ...resto] = lista;
setLista(resto); // Pasamos un array nuevo sin el primer elemento`,
      },
    ],
    casos: [
      "**Estructuras de Datos (Colas / Queues):** Junto con `push()`, implementa el comportamiento *FIFO (First In, First Out)*: el primero en entrar es el primero en salir (como la fila del supermercado).",
      "**Procesamiento de Streams:** Consumir mensajes o eventos de un búfer cronológicamente a medida que el sistema los procesa.",
    ],
    relacion: [
      "**`unshift()`:** Su hermano opuesto. Añade elementos al **principio** del array (índice 0) y desplaza el resto a la derecha.",
      "**`pop()`:** Elimina el **último** elemento del array (no requiere reindexar, es más rápido).",
      "**Destructuring / Rest (`const [primero, ...resto] = array`):** La alternativa inmutable moderna para separar el primer elemento sin tocar el array original.",
    ],
    analogia:
      "Imagina la cola para entrar a un concierto. La seguridad del evento solo atiende a la persona que está **al principio de la fila** (índice 0). En cuanto esa persona muestra su boleto y entra (valor de retorno), la fila se mueve hacia adelante: el que era el segundo ahora pasa a ser el primero, el tercero pasa a ser el segundo, etc. Eso es `shift()`.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué elemento elimina shift()?",
        opciones: [
          "El último",
          "El primero (índice 0)",
          "Uno aleatorio",
          "Todos",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve shift()?",
        opciones: [
          "La nueva longitud",
          "El array reindexado",
          "El elemento eliminado",
          "Siempre undefined",
        ],
        correcta: 2,
      },
      {
        id: 3,
        pregunta: "¿Qué comportamiento implementa shift() junto con push()?",
        opciones: ["LIFO", "FIFO", "Ordenamiento", "Búsqueda binaria"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Por qué shift() es más costoso que pop()?",
        opciones: [
          "Porque debe reindexar todos los elementos restantes",
          "Porque copia el array",
          "Porque es recursivo",
          "No es más costoso",
        ],
        correcta: 0,
      },
      {
        id: 5,
        pregunta:
          'Si const fila = ["Josue", "Ana", "Hugo"] y ejecuto fila.shift(), ¿cómo queda fila?',
        opciones: [
          '["Josue", "Ana"]',
          '["Ana", "Hugo"]',
          '["Josue"]',
          '["Hugo"]',
        ],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿Cuál es la alternativa inmutable moderna a shift()?",
        opciones: [
          "const [primero, ...resto] = lista",
          "lista.pop()",
          "lista.push()",
          "lista.sort()",
        ],
        correcta: 0,
      },
      {
        id: 7,
        pregunta: "¿Qué devuelve shift() sobre un array vacío?",
        opciones: ["undefined", "0", "null", "Un error"],
        correcta: 0,
      },
      {
        id: 8,
        pregunta:
          "¿Qué método es el hermano opuesto que añade elementos al principio?",
        opciones: ["push()", "unshift()", "pop()", "splice()"],
        correcta: 1,
      },
    ],
  },

  unshift: {
    id: "unshift",
    titulo: "Array.prototype.unshift()",
    simulador: "mutador",
    definicion: [
      "Es un método **mutador** integrado en JavaScript que se utiliza para añadir uno o más elementos al **principio** de un array (en el índice `0`).",
      "Modifica el tamaño del array original, desplaza todos los elementos existentes hacia la derecha y devuelve la **nueva longitud** del array.",
    ],
    queEs: [
      "Es el hermano opuesto del método `push()`. Mientras que `push()` inyecta elementos al final, `unshift()` los inyecta al inicio de la lista.",
      'Pertenece al "bajo mundo" de los métodos **mutadores**. Al alterar la posición inicial, obliga a JavaScript a desplazar los índices de todos los elementos existentes en memoria, compartiendo el mismo coste de rendimiento que `shift()`.',
    ],
    paraQueSirve: [
      "Sirve para dar prioridad absoluta a los elementos nuevos.",
      "Se utiliza mucho en sistemas de notificaciones en tiempo real, muros de redes sociales (donde los posts más recientes deben aparecer arriba del todo) o historiales de navegación donde lo último que hiciste encabeza la lista.",
    ],
    comoFunciona: [
      "Toma los elementos que le pases como argumentos.",
      "Desplaza todos los elementos que ya estaban en el array hacia la derecha en la memoria RAM (el índice `0` pasa a ser `1`, el `1` pasa a ser `2`, etc.).",
      "Inserta los nuevos elementos en los huecos liberados al principio del array.",
      "Actualiza automáticamente la propiedad `.length`.",
      "**Retorna la nueva longitud del array** (un número entero).",
    ],
    sintaxis: [
      {
        code: `// Añadir un solo elemento al inicio
array.unshift(elemento1);

// Añadir múltiples elementos a la vez
array.unshift(elemento1, elemento2, elementoN);`,
      },
    ],
    ejemplos: [
      {
        titulo: "Ejemplo 1: Uso básico con inyección al principio",
        code: `const notificaciones = ["Mensaje de Ana", "Alerta de Sistema"];
const conteoTotal = notificaciones.unshift("Nuevo correo recibido");

console.log(notificaciones); // Resultado: ["Nuevo correo recibido", "Mensaje de Ana", "Alerta de Sistema"]
console.log(conteoTotal);    // Resultado: 3 (Devuelve la nueva longitud)`,
      },
      {
        titulo:
          "Ejemplo 2: Insertar múltiples elementos (mantiene el orden de inserción)",
        code: `const numeros = [3, 4];
numeros.unshift(1, 2);
console.log(numeros); // Resultado: [1, 2, 3, 4]`,
      },
    ],
    errores: [
      {
        texto:
          "**Confundir el valor de retorno:** Al igual que `push()`, `unshift()` devuelve la **longitud** (un número) y no el array modificado.",
        code: `let lista = ["B"];
lista = lista.unshift("A");
console.log(lista); // Resultado: 2 (¡Sobreescribiste tu arreglo con un número!)`,
      },
      "**Rendimiento degradado (Big O):** Usar `unshift()` repetidamente dentro de bucles grandes con arreglos de miles de elementos puede ralentizar tu app, ya que la computadora tiene que mover todos los índices hacia la derecha en cada iteración.",
      {
        texto:
          "**Mutación invisible en React:** Usar `unshift()` sobre un estado mutará la dirección de memoria original de manera destructiva. React no se enterará del cambio y la pantalla no se actualizará.",
        code: `// ❌ INCORRECTO EN REACT:
setMensajes(mensajes.unshift("Nuevo"));

// ✅ CORRECTO EN REACT (Usando Spread Operator de forma inmutable):
setMensajes(["Nuevo", ...mensajes]); // El elemento va al principio del nuevo arreglo`,
      },
    ],
    casos: [
      "**Feeds de Noticias / Redes Sociales:** Insertar publicaciones nuevas al principio de la lista para que el usuario las vea inmediatamente sin necesidad de scroll.",
      "**Historiales Recientes:** Mostrar las últimas búsquedas o los archivos abiertos recientemente ordenados del más nuevo al más antiguo.",
    ],
    relacion: [
      "**`push()`:** Añade elementos al **final** del array (operación mucho más rápida ya que no requiere reindexar nada).",
      "**`shift()`:** Remueve el **primer** elemento del array (índice 0).",
      '**Operador Spread (`["Nuevo", ...original]`):** La alternativa inmutable moderna para colocar elementos al principio sin mutar la dirección de memoria original.',
    ],
    analogia:
      "Imagina la fila para abordar un avión. De repente, llega un pasajero de Primera Clase (VIP). La tripulación no lo manda al final; lo colocan **al principio de la fila** (índice 0). Para que esto suceda, absolutamente todas las personas que ya estaban formadas tienen que dar un paso hacia atrás (reindexación) para cederle el espacio. La fila ahora es más larga. Eso es `unshift()`.",
    fuente: "MDN Web Docs | ECMAScript Specification",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve unshift()?",
        opciones: [
          "El array modificado",
          "La nueva longitud",
          "El primer elemento",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Dónde añade unshift() los elementos?",
        opciones: [
          "Al final",
          "Al principio (índice 0)",
          "En el medio",
          "Donde indiques",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta:
          "Si const n = [3, 4] y ejecuto n.unshift(1, 2), ¿cómo queda n?",
        opciones: ["[3, 4, 1, 2]", "[1, 2, 3, 4]", "[2, 1, 3, 4]", "[1, 2]"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta:
          "¿Por qué unshift() degrada el rendimiento en bucles grandes?",
        opciones: [
          "Desplaza todos los índices a la derecha en cada ejecución",
          "Crea muchos arrays nuevos",
          "Es asíncrono",
          "No tiene problemas de rendimiento",
        ],
        correcta: 0,
      },
      {
        id: 5,
        pregunta: '¿Qué es setMensajes(["Nuevo", ...mensajes]) en React?',
        opciones: [
          "Algo incorrecto porque muta el estado",
          "La alternativa inmutable con spread",
          "Lo mismo que push()",
          "Un error de sintaxis",
        ],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿Cuál es un caso de uso típico de unshift()?",
        opciones: [
          "Feeds y notificaciones donde lo nuevo aparece arriba",
          "Ordenar una lista",
          "Eliminar duplicados",
          "Buscar índices",
        ],
        correcta: 0,
      },
      {
        id: 7,
        pregunta: "¿Cuál es más rápido en arrays grandes?",
        opciones: [
          "unshift()",
          "push()",
          "Son idénticos",
          "Depende del tipo de dato",
        ],
        correcta: 1,
      },
      {
        id: 8,
        pregunta:
          'Si hago let lista = ["B"]; lista = lista.unshift("A"); ¿cuánto vale lista?',
        opciones: ['["A", "B"]', '"A"', "2", "1"],
        correcta: 2,
      },
    ],
  },

  splice: {
    id: "splice",
    titulo: "Array.prototype.splice()",
    simulador: "mutador",
    definicion: [
      "Es un método **mutador** integrado en JavaScript que sirve para **cambiar el contenido de un array** eliminando elementos existentes, reemplazándolos o agregando elementos nuevos en cualquier posición intermedia.",
      "Modifica el array original y devuelve un **nuevo array con los elementos eliminados**.",
    ],
    queEs: [
      "Es la herramienta de manipulación más potente y destructiva del prototipo de arrays.",
      "A diferencia de `push`, `pop`, `shift` o `unshift`, que están limitados a los extremos, `splice()` puede operar en el **medio** del array.",
      'Pertenece al "bajo mundo" de los métodos **mutadores**, alterando drásticamente los índices y la estructura de la memoria RAM.',
    ],
    paraQueSirve: [
      "Sirve para realizar cirugías precisas en tus datos: eliminar un elemento específico mediante su ID (obtenido previamente con `findIndex`), insertar un ítem en una posición exacta (por ejemplo, mover una canción a un puesto específico en una playlist), o reemplazar datos viejos por nuevos de un solo golpe.",
    ],
    comoFunciona: [
      "**Punto de partida:** Recibe un índice de inicio (`start`). Si es negativo, cuenta desde el final del array.",
      "**Corte:** Recibe un segundo parámetro (`deleteCount`) que indica cuántos elementos borrar a partir de ahí.",
      "**Inserción:** Recibe parámetros opcionales adicionales (`item1, item2...`) para insertarlos exactamente en el hueco que se abrió.",
      "**Reindexación:** JavaScript reacomoda automáticamente todos los elementos restantes a la izquierda o derecha en la memoria.",
      "**Retorno:** Devuelve un array con los elementos que fueron removidos (si no se borró ninguno, devuelve `[]`).",
    ],
    sintaxis: [
      {
        code: `// array.splice(inicio, cantidadABorrar, item1, item2, ...);

// Caso 1: Solo borrar a partir de una posición
const eliminados = array.splice(indiceInicio, cantidadABorrar);

// Caso 2: Insertar elementos sin borrar nada
array.splice(indiceInicio, 0, 'nuevoItem1', 'nuevoItem2');

// Caso 3: Reemplazar elementos (borrar e insertar en el mismo lugar)
array.splice(indiceInicio, 2, 'reemplazo1', 'reemplazo2');`,
      },
    ],
    ejemplos: [
      {
        titulo: "Ejemplo 1: Eliminar un elemento específico",
        code: `const tareas = ["Diseñar", "Programar", "Testear"];
// Borrar 1 elemento en el índice 1 ("Programar")
const borradas = tareas.splice(1, 1);

console.log(tareas);   // Resultado: ["Diseñar", "Testear"] (Array mutado)
console.log(borradas); // Resultado: ["Programar"] (Array con el elemento eliminado)`,
      },
      {
        titulo: "Ejemplo 2: Insertar en medio sin borrar nada",
        code: `const playlist = ["Canción 1", "Canción 3"];
// En el índice 1, borra 0 elementos e inyecta "Canción 2"
playlist.splice(1, 0, "Canción 2");

console.log(playlist); // Resultado: ["Canción 1", "Canción 2", "Canción 3"]`,
      },
    ],
    errores: [
      "**Confundir `splice()` con `slice()`:** `splice()` (con **P** de **P**eligro/Mutador) destruye y cambia el array original. `slice()` (con **C** de **C**opia) extrae una porción de forma inmutable sin tocar el original.",
      {
        texto:
          "**Confundir el valor de retorno:** Pensar que `splice()` devuelve el array modificado. Devuelve los elementos **eliminados en forma de array**.",
        code: `let lista = ["A", "B", "C"];
lista = lista.splice(1, 1);
console.log(lista); // Resultado: ["B"] (¡Te quedaste solo con lo que borraste!)`,
      },
      {
        texto:
          "**Mutación destructiva en React:** Usar `splice()` en un estado altera la referencia original. React no detectará el cambio y no redibujará la UI.",
        code: `// ❌ INCORRECTO EN REACT:
setComponentes(componentes.splice(2, 1));

// ✅ CORRECTO EN REACT (Clonar primero con spread, luego aplicar splice en la copia):
const nuevaLista = [...componentes];
nuevaLista.splice(2, 1);
setComponentes(nuevaLista);`,
      },
    ],
    casos: [
      '**Eliminar por índice:** Borrar un registro específico de una tabla tras hacer clic en un botón "Eliminar".',
      "**Sistemas de Arrastrar y Soltar (Drag and Drop):** Remover un elemento de una posición (`splice(origen, 1)`) e insertarlo en su nueva posición (`splice(destino, 0, item)`).",
    ],
    relacion: [
      "**`toSpliced()` (ES2023):** Es la versión **inmutable** moderna de `splice()`. Hace exactamente lo mismo, pero en lugar de mutar el original, te devuelve un array nuevo ya modificado. ¡Ideal para React!",
      "**`findIndex()`:** Su compañero ideal. Lo usas para buscar el índice de un objeto por una propiedad interna, y luego le pasas ese índice a `splice()` para removerlo.",
    ],
    analogia:
      'Imagina una libreta con hojas de argollas. Si usas `splice(2, 1, "Hoja Nueva")`, vas a la página 3 (índice 2), **arrancas** esa hoja física de la libreta (la guardas en tu mano como valor de retorno) y en ese mismo espacio **enganchas** una hoja nueva. La libreta cambió físicamente su contenido en el medio.',
    fuente: "MDN Web Docs | ECMAScript Specification",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve splice()?",
        opciones: [
          "El array modificado",
          "Un array con los elementos eliminados",
          "La nueva longitud",
          "El primer elemento",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿splice() modifica el array original?",
        opciones: [
          "No",
          "Sí, es un método mutador",
          "Solo al insertar",
          "Solo al borrar",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta:
          'Si const t = ["Diseñar", "Programar", "Testear"] y ejecuto t.splice(1, 1), ¿cómo queda t?',
        opciones: [
          '["Diseñar", "Testear"]',
          '["Programar"]',
          '["Diseñar", "Programar"]',
          '["Testear"]',
        ],
        correcta: 0,
      },
      {
        id: 4,
        pregunta:
          "Para insertar elementos sin borrar nada, ¿qué valor va en deleteCount?",
        opciones: ["1", "-1", "0", "null"],
        correcta: 2,
      },
      {
        id: 5,
        pregunta: "¿Qué pasa si el índice start es negativo?",
        opciones: [
          "Lanza un error",
          "Cuenta desde el final del array",
          "Se ignora",
          "Equivale a 0",
        ],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿Cuál es la diferencia entre splice() y slice()?",
        opciones: [
          "splice() muta el array y slice() devuelve una copia sin tocar el original",
          "Son iguales",
          "slice() muta el array",
          "splice() es inmutable",
        ],
        correcta: 0,
      },
      {
        id: 7,
        pregunta: "¿Cuál es la versión inmutable moderna de splice()?",
        opciones: ["toSpliced()", "toSorted()", "with()", "flat()"],
        correcta: 0,
      },
      {
        id: 8,
        pregunta:
          "¿Qué método es el compañero ideal de splice() para obtener el índice a borrar?",
        opciones: ["findIndex()", "push()", "join()", "concat()"],
        correcta: 0,
      },
    ],
  },

  tospliced: {
    id: "tospliced",
    titulo: "Array.prototype.toSpliced()",
    simulador: "mutador",
    definicion: [
      "Es un método **inmutable** integrado en JavaScript (añadido en ECMAScript 2023) que sirve para cambiar el contenido de un array eliminando, reemplazando o agregando elementos en cualquier posición intermedia.",
      "A diferencia de `splice()`, este método **no modifica el array original**, sino que devuelve un **array completamente nuevo** con los cambios aplicados.",
    ],
    queEs: [
      'Es la versión segura y "amigable con React" del clásico `splice()`. Pertenece al "mundo de la inmutabilidad".',
      "En lugar de mutar los datos en la dirección de memoria original, automáticamente reserva un nuevo bloque en la memoria RAM, copia los elementos y aplica la cirugía en el aire, devolviendo la nueva referencia.",
    ],
    paraQueSirve: [
      "Sirve para realizar las mismas cirugías precisas que `splice()` (borrar, insertar o reemplazar en medio de una lista) pero cumpliendo con el principio de **inmutabilidad** por defecto.",
      "Es ideal para actualizar estados en React, arquitecturas Redux o programación funcional sin necesidad de clonar previamente con el operador spread (`[...]`).",
    ],
    comoFunciona: [
      "**Clonación Implícita:** JavaScript crea automáticamente un nuevo array en una dirección de memoria distinta.",
      "**Corte e Inserción:** Aplica los mismos tres parámetros que ya conoces: `start` (índice donde inicia la operación, acepta negativos), `deleteCount` (opcional: cuántos elementos eliminar) e `item1, item2...` (opcional: elementos a insertar en ese hueco).",
      "**Retorno:** Devuelve el **nuevo array modificado**. El array original permanece intacto en su casilla de memoria.",
    ],
    sintaxis: [
      {
        code: `// const nuevoArray = array.toSpliced(inicio, cantidadABorrar, item1, item2, ...);

// Caso 1: Borrar elementos de forma inmutable
const listaSinItems = array.toSpliced(indiceInicio, cantidadABorrar);

// Caso 2: Insertar elementos de forma inmutable
const listaConNuevos = array.toSpliced(indiceInicio, 0, 'nuevo1', 'nuevo2');`,
      },
    ],
    ejemplos: [
      {
        titulo: "Ejemplo 1: Eliminar un elemento en React (Comparativa)",
        code: `const frameworkOriginal = ["Angular", "React", "Vue"];

// Con el toSpliced moderno (ES2023)
const nuevoFrameworks = frameworkOriginal.toSpliced(0, 1);

console.log(frameworkOriginal); // Resultado: ["Angular", "React", "Vue"] (¡A salvo, inmutable!)
console.log(nuevoFrameworks);   // Resultado: ["React", "Vue"] (Nueva dirección de memoria)`,
      },
      {
        titulo: "Ejemplo 2: Reemplazo masivo en medio del array",
        code: `const numeros = [1, 10, 11, 4];
// En el índice 1, borra 2 elementos e inyecta el 2 y el 3
const secuenciaCorrecta = numeros.toSpliced(1, 2, 2, 3);

console.log(numeros);           // Resultado: [1, 10, 11, 4]
console.log(secuenciaCorrecta); // Resultado: [1, 2, 3, 4]`,
      },
    ],
    errores: [
      {
        texto:
          "**Confundir el valor de retorno con `splice()`:** Recordar que `splice()` devuelve *lo que borraste*, mientras que `toSpliced()` devuelve *el resultado final de la lista*.",
        code: `const letras = ["A", "B", "C"];
const resultado = letras.toSpliced(1, 1);

console.log(resultado); // Resultado: ["A", "C"] (El array final con la cirugía hecha)
// ¡Si esto hubiera sido .splice(), resultado valdría ["B"]!`,
      },
      "**Soporte en entornos antiguos (Browsers viejos):** Al ser un método moderno, si trabajas en proyectos legados muy antiguos sin Babel o configuraciones actualizadas de empaquetadores (Vite/Webpack), podría dar un error de `undefined`. En entornos modernos (2026) está totalmente estandarizado.",
    ],
    casos: [
      {
        texto:
          "**Actualización directa de estados en React:** Modificar listas en el estado de forma limpia y directa.",
        code: `// Modificación inmutable perfecta de un solo golpe:
setTareas(prev => prev.toSpliced(indiceDestino, 1));`,
      },
      "**Pipelines de datos funcionales:** Transformar arrays encadenando métodos sin alterar la fuente original de la información.",
    ],
    relacion: [
      "**`splice()`:** Su hermano destructivo y mutador que altera la memoria RAM original.",
      "**`slice()`:** Extrae fragmentos sin alterar el original, pero no permite realizar inserciones o reemplazos directos en medio como sí lo hace `toSpliced()`.",
      "**Copia Superficial (Shallow Copy):** Al igual que el spread operator, `toSpliced()` hace una copia superficial; si el array contiene objetos, las referencias de los objetos internos siguen apuntando a los mismos casilleros de memoria.",
    ],
    analogia:
      "Imagina que tienes una fotografía impresa. En lugar de agarrar unas tijeras y pegamento para recortar y alterar la foto original físicamente (`splice`), le tomas una fotocopia digital exacta, usas un software de edición en la pantalla para quitar o poner una persona en el medio, e imprimes una **foto completamente nueva** (`toSpliced`). Tienes dos fotos físicas separadas y la original no sufrió ningún daño.",
    fuente: "MDN Web Docs | ECMAScript 2023 Specification",
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve toSpliced()?",
        opciones: [
          "Los elementos eliminados",
          "Un nuevo array con los cambios aplicados",
          "La nueva longitud",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿toSpliced() modifica el array original?",
        opciones: [
          "Sí",
          "No, permanece intacto",
          "Solo al insertar",
          "Solo si contiene objetos",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿En qué versión de ECMAScript se añadió toSpliced()?",
        opciones: ["ES5", "ES2015", "ES2023", "ES2010"],
        correcta: 2,
      },
      {
        id: 4,
        pregunta:
          'Si const letras = ["A", "B", "C"], ¿qué devuelve letras.toSpliced(1, 1)?',
        opciones: ['["B"]', '["A", "C"]', '["A", "B"]', '["C"]'],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué tipo de copia realiza toSpliced()?",
        opciones: [
          "Profunda (deep copy)",
          "Superficial (shallow copy)",
          "No copia nada",
          "Solo copia las referencias de los objetos",
        ],
        correcta: 1,
      },
      {
        id: 6,
        pregunta: "¿Qué ventaja tiene toSpliced() frente a splice() en React?",
        opciones: [
          "Evita tener que clonar manualmente con spread antes de modificar",
          "Es siempre más rápido",
          "Funciona en navegadores muy antiguos",
          "Devuelve los elementos eliminados",
        ],
        correcta: 0,
      },
      {
        id: 7,
        pregunta:
          "Si const numeros = [1, 10, 11, 4], ¿qué devuelve numeros.toSpliced(1, 2, 2, 3)?",
        opciones: [
          "[1, 2, 3, 4]",
          "[1, 10, 11, 4]",
          "[2, 3]",
          "[1, 2, 3, 10, 11, 4]",
        ],
        correcta: 0,
      },
      {
        id: 8,
        pregunta: "¿Qué puede hacer toSpliced() que slice() no puede?",
        opciones: [
          "Insertar o reemplazar elementos en medio del array",
          "Copiar un fragmento",
          "No mutar el original",
          "Aceptar índices negativos",
        ],
        correcta: 0,
      },
    ],
  },

  sort: {
    id: "sort",
    titulo: "Array.prototype.sort()",
    simulador: "mutador",
    comoFuncionaSinNumerar: true,
    definicion: [
      "Es un método incorporado en el prototipo de los arreglos (`Array`) en JavaScript que ordena los elementos de un arreglo **en el mismo lugar** (mutando el arreglo original) y devuelve el arreglo ordenado.",
    ],
    queEs: [
      "Es un método de orden superior que permite organizar los elementos de una colección de datos.",
      "Por defecto, el ordenamiento es **alfabético y ascendente**, basado en el valor Unicode de los caracteres.",
      "Para realizar ordenamientos numéricos o personalizados, requiere que se le pase una **función de comparación** como argumento.",
    ],
    paraQueSirve: [
      "Ordenar strings alfabéticamente (con o sin sensibilidad a mayúsculas/acentos).",
      "Ordenar números de menor a mayor (o viceversa).",
      "Ordenar un arreglo de objetos basándose en el valor de una de sus propiedades (por ejemplo, ordenar usuarios por edad o productos por precio).",
    ],
    comoFunciona: [
      "**Muta el arreglo original:** No crea una copia; modifica los elementos dentro del arreglo sobre el cual se invoca.",
      "**Conversión a String por defecto:** Si no se proporciona una función de comparación, `sort()` convierte todos los elementos que no sean `undefined` a cadenas de texto (`strings`) y los compara según su posición en el estándar Unicode.",
      "**Tratamiento de `undefined`:** Todos los elementos `undefined` se mueven automáticamente al final del arreglo, y no se pasan a la función de comparación.",
      "**Algoritmo interno:** Los motores modernos (como V8 de Chrome/Node.js) utilizan algoritmos de ordenamiento **estables** (como *Timsort*), garantizando que los elementos con valores idénticos mantengan su orden relativo original.",
    ],
    sintaxis: [
      {
        code: `arreglo.sort(function comparar(primerElemento, segundoElemento){
  // Tu lógica de comparación aquí
});`,
      },
    ],
    nota: "**Parámetro `comparar` (opcional):** función que define el orden y debe retornar un número. **Negativo (< 0):** `primerElemento` va antes que `segundoElemento`. **Cero (0):** se mantiene el orden original entre ellos (en motores estables). **Positivo (> 0):** `segundoElemento` va antes que `primerElemento`.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: El comportamiento por defecto (Strings)",
        code: `const frutas = ['plátano', 'manzana', 'cereza'];
frutas.sort();

console.log(frutas); // Salida: ['cereza', 'manzana', 'plátano']`,
      },
      {
        titulo: "Ejemplo 2: Ordenar números (Requiere función de comparación)",
        descripcion:
          "Para ordenar números de forma ascendente, restamos el segundo del primero: `a - b`.",
        code: `const numeros = [10, 5, 80, 2];

// Orden ascendente
numeros.sort((a, b) => a - b);
console.log(numeros); // Salida: [2, 5, 10, 80]

// Orden descendente
numeros.sort((a, b) => b - a);
console.log(numeros); // Salida: [80, 10, 5, 2]`,
      },
      {
        titulo: "Ejemplo 3: Ordenar objetos por propiedad",
        code: `const usuarios = [
  { nombre: 'Sofía', edad: 28 },
  { nombre: 'Lucas', edad: 22 },
  { nombre: 'Ana', edad: 35 }
];

// Ordenar por edad de menor a mayor
usuarios.sort((a, b) => a.edad - b.edad);

console.log(usuarios);
// Salida: Lucas (22), Sofía (28), Ana (35)`,
      },
    ],
    errores: [
      {
        texto:
          "**Ordenar números sin función de comparación:** Es el error más clásico de JavaScript.",
        code: `const numeros = [10, 5, 80, 2];
numeros.sort();
console.log(numeros); // ❌ Salida: [10, 2, 5, 80]`,
        nota: '*¿Por qué pasa?* Porque convierte los números a texto. En orden alfabético, `"10"` va antes que `"2"`, de la misma forma que `"Abel"` va antes que `"Belén"`.',
      },
      {
        texto: "**Olvidar que muta el arreglo original:**",
        code: `const original = [3, 1, 2];
const ordenado = original.sort();

// ❌ ¡Ambos arreglos ahora están ordenados [1, 2, 3]!
console.log(original); // [1, 2, 3]`,
        nota: "*Solución:* Si necesitas mantener el original intacto, haz una copia antes de ordenar usando el operador spread: `const ordenado = [...original].sort();` o utiliza el método moderno `.toSorted()`.",
      },
    ],
    casos: [
      "**Tablas interactivas de datos:** Permitir al usuario ordenar columnas (por precio, fecha, orden alfabético).",
      "**Rankings o Leaderboards:** Mostrar listas de puntuaciones máximas de manera descendente en un videojuego o aplicación financiera.",
    ],
    relacion: [
      "**`sort()` vs `toSorted()`:** Introducido en especificaciones recientes de ECMAScript, **`toSorted()`** hace exactamente lo mismo que `sort()`, pero **no muta** el arreglo original; en su lugar, devuelve una nueva copia ordenada. Es la alternativa ideal para evitar mutaciones accidentales.",
      {
        texto:
          "**`localeCompare()`:** Para ordenar strings con caracteres especiales, tildes o eñes de forma correcta según el idioma, se debe combinar `sort()` con `localeCompare()`:",
        code: `const nombres = ['Álvaro', 'Zapato', 'Ángel'];
nombres.sort((a, b) => a.localeCompare(b, 'es'));
// Salida correcta: ['Álvaro', 'Ángel', 'Zapato']`,
      },
    ],
    analogia:
      'Imagina que eres un **organizador de libros** en una biblioteca escolar. Si no te dan instrucciones (sin función de comparación), tu instinto por defecto es ordenarlos estrictamente por su título alfabético (empezando por la primera letra, luego la segunda, etc.). Si el director te pide ordenarlos por "año de publicación" o por "grosor del libro", te está dando una **función de comparación personalizada** para que dejes de mirar las letras del título y compares activamente dos libros basándote en un criterio diferente.',
    fuente: "MDN Web Docs | ECMAScript 2026 Language Specification",
    notasPersonales: [
      "**Atajo mental:** Grábate a fuego esta fórmula para números: `(a, b) => a - b` ordena de **menor a mayor** (Ascendente). Si quieres lo contrario, simplemente invierte el orden de la resta: `(a, b) => b - a` (Descendente). No intentes reinventar la rueda con condicionales `if (a > b)` a menos que sea estrictamente necesario.",
    ],
    quiz: [
      {
        id: 1,
        pregunta:
          "¿Cuál es el orden por defecto de sort() sin función de comparación?",
        opciones: [
          "Numérico ascendente",
          "Alfabético ascendente por Unicode (convierte a strings)",
          "Descendente",
          "Aleatorio",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué devuelve [10, 5, 80, 2].sort()?",
        opciones: [
          "[2, 5, 10, 80]",
          "[10, 2, 5, 80]",
          "[80, 10, 5, 2]",
          "[10, 5, 80, 2]",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta:
          "¿Qué función de comparación ordena números de menor a mayor?",
        opciones: [
          "(a, b) => b - a",
          "(a, b) => a - b",
          "(a, b) => a + b",
          "No hace falta ninguna",
        ],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿sort() modifica el array original?",
        opciones: [
          "No, trabaja con una copia",
          "Sí, y devuelve el mismo array ordenado",
          "Solo con strings",
          "Solo con objetos",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué hace sort() con los elementos undefined?",
        opciones: [
          "Los pone al principio",
          "Los mueve al final sin pasarlos a la función de comparación",
          "Los elimina",
          "Los convierte en 0",
        ],
        correcta: 1,
      },
      {
        id: 6,
        pregunta:
          "Si la función de comparación devuelve un valor negativo, ¿qué significa?",
        opciones: [
          "primerElemento va antes que segundoElemento",
          "segundoElemento va antes que primerElemento",
          "Se mantiene el orden",
          "Se produce un error",
        ],
        correcta: 0,
      },
      {
        id: 7,
        pregunta:
          "¿Qué método se combina con sort() para ordenar bien tildes y eñes?",
        opciones: ["localeCompare()", "push()", "includes()", "Math.max()"],
        correcta: 0,
      },
      {
        id: 8,
        pregunta:
          "¿Cuál es la alternativa moderna a sort() que no muta el original?",
        opciones: ["toSorted()", "reverse()", "splice()", "flat()"],
        correcta: 0,
      },
    ],
  },

  tosorted: {
    id: "tosorted",
    titulo: "Array.prototype.toSorted()",
    simulador: "mutador",
    comoFuncionaSinNumerar: true,
    definicion: [
      "Es un método incorporado en el prototipo de los arreglos (`Array`) en JavaScript que devuelve un **nuevo arreglo** con los elementos ordenados en orden ascendente, manteniendo el arreglo original **completamente intacto** (sin mutaciones).",
    ],
    queEs: [
      "Introducido formalmente en la especificación ECMAScript 2023, `toSorted()` es la versión **no mutante** (pura) del clásico método `Array.prototype.sort()`.",
      "Sigue la filosofía moderna de la programación funcional, donde se prioriza la inmutabilidad de los datos para evitar efectos secundarios imprevistos en la aplicación.",
    ],
    paraQueSirve: [
      "Aplicaciones basadas en arquitecturas de estado predecibles (como React, Redux o librerías de gestión de estado).",
      "Flujos de datos donde el arreglo original se necesita conservar en su orden de creación o de base de datos.",
      "Evitar tener que clonar manualmente arreglos antes de ordenarlos (ej. `[...arr].sort()`).",
    ],
    comoFunciona: [
      "**Copia implícita:** Internamente, realiza una copia superficial (*shallow copy*) del arreglo original.",
      "**Ordenamiento:** Aplica el mismo algoritmo de ordenamiento estable que `sort()` sobre la copia.",
      "**Retorno:** Devuelve el nuevo arreglo ordenado.",
      "**Comportamiento por defecto:** Al igual que `sort()`, si no se le proporciona una función de comparación, convierte los elementos a cadenas de texto (`strings`) y los ordena según su valor Unicode. Los elementos `undefined` se envían al final.",
    ],
    sintaxis: [
      {
        code: `const nuevoArregloOrdenado = arregloOriginal.toSorted(function comparar(primerElemento, segundoElemento){
  // Tu lógica de comparación aquí
});`,
      },
    ],
    nota: "**Parámetro `comparar` (opcional):** la misma función de comparación utilizada en `.sort()`. Debe retornar un número negativo, cero, o un número positivo para determinar el orden de precedencia.",
    ejemplos: [
      {
        titulo: "Ejemplo 1: Comparativa básica con sort() (Inmutabilidad)",
        descripcion:
          "Observa cómo el arreglo original no se ve afectado al usar `toSorted()`:",
        code: `const meses = ['Marzo', 'Enero', 'Diciembre'];

// Ordenamos sin modificar el original
const mesesOrdenados = meses.toSorted();

console.log(meses);          // Salida: ['Marzo', 'Enero', 'Diciembre'] (¡Intacto!)
console.log(mesesOrdenados); // Salida: ['Diciembre', 'Enero', 'Marzo']`,
      },
      {
        titulo: "Ejemplo 2: Ordenamiento numérico ascendente",
        code: `const calificaciones = [10, 5, 8, 3, 9];

const ordenadas = calificaciones.toSorted((a, b) => a - b);

console.log(calificaciones); // Salida: [10, 5, 8, 3, 9] (Original intacto)
console.log(ordenadas);      // Salida: [3, 5, 8, 9, 10]`,
      },
    ],
    errores: [
      {
        texto:
          "**Esperar una copia profunda (*Deep Copy*):** Al igual que la mayoría de métodos de copia en JS, `toSorted()` realiza una copia superficial. Si el arreglo contiene objetos anidados, las referencias a esos objetos internos seguirán siendo las mismas.",
        code: `const usuarios = [{ nombre: 'Ana', config: { activo: true } }];
const ordenados = usuarios.toSorted();

// Modificar un objeto anidado en el nuevo arreglo afectará también al original
ordenados[0].config.activo = false;
console.log(usuarios[0].config.activo); // ❌ false`,
      },
      {
        texto:
          "**Olvidar que hereda las reglas de conversión a texto de `sort()`:** Si no pasas una función comparadora para números, cometerás el mismo error de ordenación que con `sort()`.",
        code: `const numeros = [10, 5, 80, 2];
console.log(numeros.toSorted()); // ❌ Salida: [10, 2, 5, 80]`,
      },
    ],
    casos: [
      '**Visualización en interfaces de usuario (React/Vue):** Cuando tienes un estado que contiene una lista de productos y el usuario selecciona "ordenar por menor precio", puedes renderizar `productos.toSorted((a, b) => a.precio - b.precio)` directamente sin alterar el estado original de la aplicación.',
      {
        texto:
          "**Pipelines de datos limpios:** Encadenar métodos de arreglos de manera segura:",
        code: `const nombresFiltradosYOrdenados = nombres
  .filter(n => n.startsWith('A'))
  .toSorted(); // No muta nada en el camino`,
      },
    ],
    relacion: [
      '**`toSorted()` vs `[...arr].sort()`:** Antes de existir `toSorted()`, la forma estándar de no mutar el original era escribir `const copia = [...original].sort()`. `toSorted()` elimina este "truco" o *workaround*, haciendo el código mucho más legible, expresivo y semántico.',
      '**Familia "to" en JS moderno:** `toSorted()` forma parte de un grupo de métodos no mutantes que llegaron juntos a JavaScript: `toReversed()` (versión no mutante de `reverse()`), `toSpliced()` (versión no mutante de `splice()`) y `with()` (reemplaza un elemento en un índice específico de forma no mutante).',
    ],
    analogia:
      "Imagina que tienes una **hoja de papel original** con una lista de nombres desordenados. Usar `.sort()` es como borrar y reescribir sobre esa misma hoja para ordenarla: la lista original desaparece para siempre. Usar `.toSorted()` es como **sacarle una fotocopia** a la hoja, sentarte en tu escritorio a ordenar los nombres en la copia y entregársela a tu jefe. Conservas tu hoja original impecable en tu carpeta por si la necesitas después.",
    fuente: "MDN Web Docs | ECMAScript 2026 Language Specification",
    notasPersonales: [
      "**Consejo de compatibilidad:** Aunque `toSorted()` es ampliamente compatible en navegadores modernos y entornos de Node.js (desde Node 20+), si estás trabajando en un proyecto antiguo o con soporte para navegadores muy viejos sin transpiladores (como Babel), es posible que necesites un *polyfill* o seguir usando el clásico `[...arreglo].sort()`. Para proyectos modernos, ¡conviértelo en tu estándar predeterminado!",
    ],
    quiz: [
      {
        id: 1,
        pregunta: "¿Qué devuelve toSorted()?",
        opciones: [
          "El mismo array ordenado",
          "Un nuevo array ordenado",
          "La longitud del array",
          "undefined",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Qué le pasa al array original al usar toSorted()?",
        opciones: [
          "Queda ordenado",
          "Queda intacto",
          "Se vacía",
          "Se invierte",
        ],
        correcta: 1,
      },
      {
        id: 3,
        pregunta:
          "¿Cuál era la forma antigua de ordenar sin mutar el original?",
        opciones: [
          "[...arr].sort()",
          "arr.reverse()",
          "arr.slice(0, -1)",
          "arr.concat()",
        ],
        correcta: 0,
      },
      {
        id: 4,
        pregunta:
          "¿Qué devuelve [10, 5, 80, 2].toSorted() sin función de comparación?",
        opciones: [
          "[2, 5, 10, 80]",
          "[10, 2, 5, 80]",
          "[80, 10, 5, 2]",
          "Lanza un error",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué tipo de copia realiza toSorted()?",
        opciones: [
          "Superficial (shallow copy)",
          "Profunda (deep copy)",
          "Ninguna",
          "Depende del contenido",
        ],
        correcta: 0,
      },
      {
        id: 6,
        pregunta: "¿En qué versión de ECMAScript se introdujo toSorted()?",
        opciones: ["ES2015", "ES2023", "ES2018", "ES2010"],
        correcta: 1,
      },
      {
        id: 7,
        pregunta:
          "¿Cuál de estos métodos pertenece a la misma familia no mutante que toSorted()?",
        opciones: ["toReversed()", "reverse()", "push()", "pop()"],
        correcta: 0,
      },
      {
        id: 8,
        pregunta: "¿Cuál es un caso de uso ideal para toSorted()?",
        opciones: [
          "Mostrar una lista ordenada en React sin alterar el estado original",
          "Eliminar elementos del estado",
          "Agregar elementos al final",
          "Buscar índices",
        ],
        correcta: 0,
      },
    ],
  },
};
