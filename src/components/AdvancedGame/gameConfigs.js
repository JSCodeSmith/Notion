/* Configuración de las misiones del ADVANCED INTERACTIVE PROGRAMMING GAME.
   Cada método tiene su propio reto con emojis, código inicial y solución. */

const FRUTAS = ["🍎", "🍌", "🍇", "🍊", "🍓", "🍒", "🥝", "🍍", "🍉", "🥑"];
const AVENTURA = ["🐉", "🦄", "💎", "⭐", "🚀", "🤖", "👾", "🎮", "🕹️", "🎲"];
const CARAS = ["😀", "😎", "😍", "🥳", "🤖", "👾"];

const elegir = (lista) => lista[Math.floor(Math.random() * lista.length)];
const mezclar = (lista) => {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};
const muestra = (lista, n) => mezclar(lista).slice(0, n);
const numero = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const tableroSimple = (items, etiqueta = "índice") => ({
  tarjetas: items.map((emoji, indice) => ({
    id: `${indice}-${emoji}`,
    emoji,
    etiqueta: `${etiqueta === "índice" ? "[" + indice + "]" : etiqueta + " " + (indice + 1)}`,
    sub: "",
  })),
});

const tableroObjetos = (items, campo, sufijo = "") => ({
  tarjetas: items.map((item, indice) => ({
    id: `${indice}-${item.emoji}`,
    emoji: item.emoji,
    etiqueta: `[${indice}]`,
    sub: `${campo}: ${item[campo]}${sufijo}`,
  })),
});

const codigoConArray = (nombre, valor) =>
  `const ${nombre} = ${JSON.stringify(valor)};\n`;

const RETOS = {
  find: {
    titulo: "La búsqueda del dragón",
    icono: "🔎",
    metodo: "find()",
    xp: 120,
    descripcion:
      "Recorre el bosque de emojis y devuelve el primer dragón que encuentres. find() se detiene en la primera coincidencia.",
    pista:
      "Usa emojis.find(e => e === \"🐉\"). Si no hay coincidencia, find() devuelve undefined.",
    crearRonda() {
      const objetivo = "🐉";
      const items = mezclar([...muestra(FRUTAS, 4), objetivo]);
      return { items, objetivo, esperado: objetivo };
    },
    tablero(ronda) {
      return tableroSimple(ronda.items);
    },
    objetivo(ronda) {
      return `Haz que find() devuelva el primer ${ronda.objetivo}.`;
    },
    starter(ronda) {
      return `${codigoConArray("emojis", ronda.items)}
// 🎯 Devuelve el primer "${ronda.objetivo}" del array
return null;`;
    },
    solucion(ronda) {
      return `${codigoConArray("emojis", ronda.items)}
return emojis.find((emoji) => emoji === "${ronda.objetivo}");`;
    },
  },

  findindex: {
    titulo: "El índice del unicornio",
    icono: "📍",
    metodo: "findIndex()",
    xp: 130,
    descripcion:
      "Esta vez no quieres el unicornio: quieres saber en qué posición vive. findIndex() devuelve el índice de la primera coincidencia.",
    pista:
      "La callback devuelve true cuando encuentra el objetivo. Si no existe, findIndex() devuelve -1.",
    crearRonda() {
      const objetivo = "🦄";
      const items = mezclar([...muestra(FRUTAS, 4), objetivo]);
      return {
        items,
        objetivo,
        esperado: items.indexOf(objetivo),
      };
    },
    tablero(ronda) {
      return tableroSimple(ronda.items);
    },
    objetivo(ronda) {
      return `Devuelve el índice de ${ronda.objetivo} dentro del array.`;
    },
    starter(ronda) {
      return `${codigoConArray("emojis", ronda.items)}
// 🎯 Encuentra la posición de "${ronda.objetivo}"
return null;`;
    },
    solucion(ronda) {
      return `${codigoConArray("emojis", ronda.items)}
return emojis.findIndex((emoji) => emoji === "${ronda.objetivo}");`;
    },
  },

  findlast: {
    titulo: "El último nivel del dragón",
    icono: "🐉",
    metodo: "findLast()",
    xp: 140,
    descripcion:
      "Hay varios dragones en el equipo, pero solo te interesa el último que alcanzó el nivel 3 o más. findLast() busca desde el final.",
    pista:
      "findLast(e => e.nivel >= 3) devuelve el último objeto que cumple la condición.",
    crearRonda() {
      const equipo = mezclar([
        { emoji: "🐉", nivel: 1 },
        { emoji: "🦄", nivel: 4 },
        { emoji: "🐉", nivel: 3 },
        { emoji: "🤖", nivel: 2 },
        { emoji: "🐉", nivel: 5 },
      ]);
      return {
        items: equipo,
        esperado: equipo.findLast((item) => item.nivel >= 3),
      };
    },
    tablero(ronda) {
      return tableroObjetos(ronda.items, "nivel", " ⚡");
    },
    objetivo() {
      return "Devuelve el ÚLTIMO emoji cuyo nivel sea mayor o igual a 3.";
    },
    starter(ronda) {
      return `${codigoConArray("equipo", ronda.items)}
// 🎯 Encuentra el último emoji con nivel >= 3
return null;`;
    },
    solucion(ronda) {
      return `${codigoConArray("equipo", ronda.items)}
return equipo.findLast((item) => item.nivel >= 3);`;
    },
  },

  findlastindex: {
    titulo: "Rastreo inverso",
    icono: "🛰️",
    metodo: "findLastIndex()",
    xp: 145,
    descripcion:
      "El radar busca desde el final. Devuelve la posición del último emoji que tenga nivel 3 o más.",
    pista:
      "findLastIndex() es como findIndex(), pero empieza por el último elemento.",
    crearRonda() {
      const equipo = mezclar([
        { emoji: "🐉", nivel: 2 },
        { emoji: "🦄", nivel: 4 },
        { emoji: "🐉", nivel: 3 },
        { emoji: "🤖", nivel: 1 },
        { emoji: "🐉", nivel: 5 },
      ]);
      return {
        items: equipo,
        esperado: equipo.findLastIndex((item) => item.nivel >= 3),
      };
    },
    tablero(ronda) {
      return tableroObjetos(ronda.items, "nivel", " ⚡");
    },
    objetivo() {
      return "Devuelve el índice del ÚLTIMO emoji con nivel >= 3.";
    },
    starter(ronda) {
      return `${codigoConArray("equipo", ronda.items)}
// 🎯 Devuelve el índice del último emoji con nivel >= 3
return null;`;
    },
    solucion(ronda) {
      return `${codigoConArray("equipo", ronda.items)}
return equipo.findLastIndex((item) => item.nivel >= 3);`;
    },
  },

  "string-indexof": {
    titulo: "El código secreto",
    icono: "🔤",
    metodo: "String.indexOf()",
    xp: 150,
    descripcion:
      "La cadena es un túnel lleno de emojis. Encuentra la primera aparición del emoji objetivo y devuelve su índice.",
    pista:
      "indexOf() devuelve -1 si no encuentra el texto. Ojo: cada emoji ocupa 2 unidades UTF-16.",
    crearRonda() {
      const objetivos = ["🕹️", "🎲", "🚀", "👾"];
      const objetivo = elegir(objetivos);
      const cadena = ["🎮", "🎲", "🕹️", "🎯", "🚀", "👾"]
        .map((emoji) => (emoji === objetivo ? objetivo : elegir(AVENTURA)))
        .join("-");
      return {
        cadena,
        objetivo,
        esperado: cadena.indexOf(objetivo),
        piezas: cadena.split("-"),
      };
    },
    tablero(ronda) {
      return {
        tarjetas: ronda.piezas.map((emoji, indice) => ({
          id: `${indice}-${emoji}`,
          emoji,
          etiqueta: `[${indice}]`,
          sub: `offset: ${ronda.cadena.indexOf(emoji)}`,
        })),
      };
    },
    objetivo(ronda) {
      return `Devuelve el índice de "${ronda.objetivo}" en la cadena.`;
    },
    starter(ronda) {
      return `const cadena = "${ronda.cadena}";

// 🎯 Busca "${ronda.objetivo}" con indexOf()
return null;`;
    },
    solucion(ronda) {
      return `const cadena = "${ronda.cadena}";

return cadena.indexOf("${ronda.objetivo}");`;
    },
  },

  lastindexof: {
    titulo: "La última pizza",
    icono: "🍕",
    metodo: "lastIndexOf()",
    xp: 150,
    descripcion:
      "Hay varias pizzas escondidas en la mochila. Devuelve la posición de la última pizza, no de la primera.",
    pista:
      "lastIndexOf() empieza a buscar desde el final, pero devuelve el índice absoluto desde el inicio.",
    crearRonda() {
      const objetivo = "🍕";
      const items = mezclar([
        "🍕",
        "🍔",
        "🍟",
        "🍕",
        "🌮",
        "🍩",
        "🍕",
        "🍪",
      ]);
      return { items, objetivo, esperado: items.lastIndexOf(objetivo) };
    },
    tablero(ronda) {
      return tableroSimple(ronda.items);
    },
    objetivo(ronda) {
      return `Devuelve el índice de la ÚLTIMA ${ronda.objetivo} del array.`;
    },
    starter(ronda) {
      return `${codigoConArray("mochila", ronda.items)}
// 🎯 Encuentra la última "${ronda.objetivo}"
return null;`;
    },
    solucion(ronda) {
      return `${codigoConArray("mochila", ronda.items)}
return mochila.lastIndexOf("${ronda.objetivo}");`;
    },
  },

  every: {
    titulo: "Todos a la nave",
    icono: "🚀",
    metodo: "every()",
    xp: 160,
    descripcion:
      "Para despegar, TODO el equipo necesita al menos 3 de energía. Devuelve true solo si todos cumplen la condición.",
    pista:
      "every() devuelve true si la callback es verdadera para todos los elementos. Se detiene en el primer false.",
    crearRonda() {
      const equipo = ["🐉", "🦄", "🤖", "👾", "🚀"].map((emoji) => ({
        emoji,
        energia: numero(1, 5),
      }));
      if (Math.random() < 0.5) {
        equipo.forEach((item) => {
          item.energia = numero(3, 5);
        });
      } else if (equipo.every((item) => item.energia >= 3)) {
        equipo[numero(0, equipo.length - 1)].energia = numero(1, 2);
      }
      return {
        items: equipo,
        esperado: equipo.every((item) => item.energia >= 3),
      };
    },
    tablero(ronda) {
      return tableroObjetos(ronda.items, "energia", " ⚡");
    },
    objetivo() {
      return "Devuelve true si TODOS tienen energía >= 3; si no, false.";
    },
    starter(ronda) {
      return `${codigoConArray("equipo", ronda.items)}
// 🎯 Comprueba si todos tienen energia >= 3
return null;`;
    },
    solucion(ronda) {
      return `${codigoConArray("equipo", ronda.items)}
return equipo.every((item) => item.energia >= 3);`;
    },
  },

  some: {
    titulo: "¿Hay algún dragón?",
    icono: "❓",
    metodo: "some()",
    xp: 155,
    descripcion:
      "El detector solo necesita encontrar un dragón para activar la alarma. Devuelve true si al menos uno cumple la condición.",
    pista:
      "some() se detiene en la primera coincidencia. Si ninguno cumple, devuelve false.",
    crearRonda() {
      const equipo = [
        { emoji: "🐉", tipo: "dragón" },
        { emoji: "🦄", tipo: "unicornio" },
        { emoji: "🤖", tipo: "robot" },
        { emoji: "👾", tipo: "alien" },
      ];
      const items = mezclar(equipo);
      if (Math.random() >= 0.55) {
        const dragon = items.find((item) => item.tipo === "dragón");
        dragon.emoji = "🐱";
        dragon.tipo = "gato";
      }
      return {
        items,
        esperado: items.some((item) => item.tipo === "dragón"),
      };
    },
    tablero(ronda) {
      return {
        tarjetas: ronda.items.map((item, indice) => ({
          id: `${indice}-${item.emoji}`,
          emoji: item.emoji,
          etiqueta: `[${indice}]`,
          sub: item.tipo,
        })),
      };
    },
    objetivo() {
      return "Devuelve true si existe al menos un emoji de tipo dragón.";
    },
    starter(ronda) {
      return `${codigoConArray("equipo", ronda.items)}
// 🎯 Comprueba si hay algún tipo "dragón"
return null;`;
    },
    solucion(ronda) {
      return `${codigoConArray("equipo", ronda.items)}
return equipo.some((item) => item.tipo === "dragón");`;
    },
  },

  map: {
    titulo: "Sube de nivel",
    icono: "🔄",
    metodo: "map()",
    xp: 170,
    descripcion:
      "Transforma cada emoji en una etiqueta de nivel. map() devuelve un array nuevo con la misma cantidad de elementos.",
    pista:
      "map() recibe una callback y devuelve un array nuevo. No modifica el array original.",
    crearRonda() {
      const equipo = ["🍎", "🍌", "🍇", "🍊"].map((emoji) => ({
        emoji,
        nivel: numero(1, 5),
      }));
      return {
        items: equipo,
        esperado: equipo.map((item) => `${item.emoji} Nv.${item.nivel}`),
      };
    },
    tablero(ronda) {
      return tableroObjetos(ronda.items, "nivel", " ⚡");
    },
    objetivo() {
      return 'Devuelve un array de textos con el formato "🍎 Nv.3".';
    },
    starter(ronda) {
      return `${codigoConArray("equipo", ronda.items)}
// 🎯 Convierte cada objeto en un texto con el formato "🍎 Nv.3"
return null;`;
    },
    solucion(ronda) {
      return `${codigoConArray("equipo", ronda.items)}
return equipo.map((item) => item.emoji + " Nv." + item.nivel);`;
    },
  },

  filter: {
    titulo: "El escuadrón de élite",
    icono: "🧹",
    metodo: "filter()",
    xp: 170,
    descripcion:
      "Solo los emojis con poder 4 o más pueden entrar al escuadrón. filter() devuelve un array nuevo con los que pasan el filtro.",
    pista:
      "filter() devuelve un array. Si nadie cumple la condición, devuelve [].",
    crearRonda() {
      const equipo = ["🐉", "🦄", "🤖", "👾", "🚀"].map((emoji) => ({
        emoji,
        poder: numero(1, 6),
      }));
      if (!equipo.some((item) => item.poder >= 4)) {
        equipo[0].poder = 5;
      }
      return {
        items: equipo,
        esperado: equipo.filter((item) => item.poder >= 4),
      };
    },
    tablero(ronda) {
      return tableroObjetos(ronda.items, "poder", " 💥");
    },
    objetivo() {
      return "Devuelve solo los emojis con poder >= 4.";
    },
    starter(ronda) {
      return `${codigoConArray("equipo", ronda.items)}
// 🎯 Filtra los emojis con poder >= 4
return null;`;
    },
    solucion(ronda) {
      return `${codigoConArray("equipo", ronda.items)}
return equipo.filter((item) => item.poder >= 4);`;
    },
  },

  flatmap: {
    titulo: "Une los equipos",
    icono: "🫓",
    metodo: "flatMap()",
    xp: 185,
    descripcion:
      "Cada equipo tiene varios emojis. flatMap() transforma y aplana el resultado en un solo array de guerreros.",
    pista:
      "flatMap(equipo => equipo.map(...)) transforma cada equipo y luego une todos los resultados en un solo nivel.",
    crearRonda() {
      const equipos = [
        ["🍎", "🍌"],
        ["🍇", "🍊", "🍓"],
        ["🍒", "🥝"],
      ];
      return {
        equipos,
        esperado: equipos.flatMap((equipo) =>
          equipo.map((emoji) => `${emoji}⚔️`),
        ),
      };
    },
    tablero(ronda) {
      return {
        tarjetas: ronda.equipos.map((equipo, indice) => ({
          id: indice,
          emoji: equipo.join(" "),
          etiqueta: `Equipo ${indice + 1}`,
          sub: `${equipo.length} miembros`,
        })),
      };
    },
    objetivo() {
      return 'Devuelve un solo array con cada emoji terminado en "⚔️".';
    },
    starter(ronda) {
      return `${codigoConArray("equipos", ronda.equipos)}
// 🎯 Aplana los equipos y añade "⚔️" a cada emoji
return null;`;
    },
    solucion(ronda) {
      return `${codigoConArray("equipos", ronda.equipos)}
return equipos.flatMap((equipo) =>
  equipo.map((emoji) => emoji + "⚔️"),
);`;
    },
  },

  "string-slice": {
    titulo: "Corta el portal",
    icono: "✂️",
    metodo: "String.slice()",
    xp: 175,
    descripcion:
      "Selecciona una ventana de emojis dentro de la cadena. slice(inicio, fin) no incluye el índice final.",
    pista:
      "slice() extrae desde inicio hasta fin - 1. Los emojis ocupan 2 unidades UTF-16.",
    crearRonda() {
      const cadena = CARAS.join("");
      const inicio = numero(0, 4) * 2;
      const fin = Math.min(cadena.length, inicio + numero(1, 3) * 2);
      return {
        cadena,
        inicio,
        fin,
        esperado: cadena.slice(inicio, fin),
      };
    },
    tablero() {
      return {
        tarjetas: [...CARAS].map((emoji, indice) => ({
          id: `${indice}-${emoji}`,
          emoji,
          etiqueta: `[${indice * 2}-${indice * 2 + 1}]`,
          sub: "",
        })),
      };
    },
    objetivo(ronda) {
      return `Devuelve la porción de cadena desde ${ronda.inicio} hasta ${ronda.fin}.`;
    },
    starter(ronda) {
      return `const cadena = "${ronda.cadena}";

// 🎯 Extrae desde ${ronda.inicio} hasta ${ronda.fin} (sin incluir ${ronda.fin})
return null;`;
    },
    solucion(ronda) {
      return `const cadena = "${ronda.cadena}";

return cadena.slice(${ronda.inicio}, ${ronda.fin});`;
    },
  },

  fill: {
    titulo: "Rellena el tablero",
    icono: "🪣",
    metodo: "fill()",
    xp: 165,
    descripcion:
      "Rellena un rango del tablero con estrellas. fill() modifica el array y devuelve la misma referencia.",
    pista:
      "fill(valor, inicio, fin) rellena desde inicio hasta fin - 1. No pases del final del array.",
    crearRonda() {
      const slots = ["⬜", "⬜", "⬜", "⬜", "⬜", "⬜"];
      const inicio = numero(1, 3);
      const fin = Math.min(slots.length, inicio + numero(1, 3));
      return {
        items: slots,
        inicio,
        fin,
        esperado: slots.fill("⭐", inicio, fin),
      };
    },
    tablero(ronda) {
      return tableroSimple(ronda.items);
    },
    objetivo(ronda) {
      return `Rellena con ⭐ desde ${ronda.inicio} hasta ${ronda.fin} (sin incluir ${ronda.fin}).`;
    },
    starter(ronda) {
      return `${codigoConArray("slots", ronda.items)}
// 🎯 Rellena con "⭐" desde ${ronda.inicio} hasta ${ronda.fin}
return null;`;
    },
    solucion(ronda) {
      return `${codigoConArray("slots", ronda.items)}
return slots.fill("⭐", ${ronda.inicio}, ${ronda.fin});`;
    },
  },

  with: {
    titulo: "Sustitución interdimensional",
    icono: "🌀",
    metodo: "with()",
    xp: 175,
    descripcion:
      "Cambia un emoji por otro sin tocar el array original. with() devuelve una copia nueva con el cambio.",
    pista:
      "with(indice, valor) no muta el array. El índice puede ser negativo para contar desde el final.",
    crearRonda() {
      const items = muestra(FRUTAS, 5);
      const indice = numero(0, items.length - 1);
      return {
        items,
        indice,
        reemplazo: "🐉",
        esperado: items.with(indice, "🐉"),
      };
    },
    tablero(ronda) {
      return tableroSimple(ronda.items);
    },
    objetivo(ronda) {
      return `Devuelve una copia con 🐉 en el índice ${ronda.indice}.`;
    },
    starter(ronda) {
      return `${codigoConArray("emojis", ronda.items)}
// 🎯 Cambia el índice ${ronda.indice} por "🐉" sin mutar el original
return null;`;
    },
    solucion(ronda) {
      return `${codigoConArray("emojis", ronda.items)}
return emojis.with(${ronda.indice}, "🐉");`;
    },
  },

  push: {
    titulo: "Refuerzos al final",
    icono: "➕",
    metodo: "push()",
    xp: 150,
    descripcion:
      "Añade nuevos emojis al final de la mochila. push() modifica el array y devuelve la nueva longitud.",
    pista:
      "push() devuelve la nueva longitud, no el array. Puedes comprobar la mutación con console.log.",
    crearRonda() {
      const items = muestra(FRUTAS, 3);
      const nuevos = muestra(["🍇", "🍓", "🥝", "🍍"], 2);
      return {
        items,
        nuevos,
        esperado: items.length + nuevos.length,
      };
    },
    tablero(ronda) {
      return tableroSimple(ronda.items);
    },
    objetivo(ronda) {
      return `Añade ${ronda.nuevos.join(" y ")} al final y devuelve la nueva longitud.`;
    },
    starter(ronda) {
      return `${codigoConArray("emojis", ronda.items)}
// 🎯 Añade ${ronda.nuevos.map((e) => `"${e}"`).join(", ")} y devuelve la longitud
return null;`;
    },
    solucion(ronda) {
      return `${codigoConArray("emojis", ronda.items)}
const total = emojis.push(${ronda.nuevos.map((e) => `"${e}"`).join(", ")});
console.log(emojis);
return total;`;
    },
  },
};

export const ADVANCED_GAME_IDS = new Set(Object.keys(RETOS));

export function getGameConfig(metodoId) {
  return RETOS[metodoId] ?? null;
}
