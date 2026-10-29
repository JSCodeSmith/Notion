import { useEffect, useMemo, useState } from "react";
import CodeBlock from "../CodeBlock/CodeBlock";
import "../SimuladorFind/SimuladorFind.css";
import "../Simuladorstring/SimuladorString.css";

/* ======================================================================
   Utilidades
   ====================================================================== */
const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

const DIAS = [
  "domingo", "lunes", "martes", "miércoles",
  "jueves", "viernes", "sábado",
];

const show = (v) => {
  if (v === undefined) return "undefined";
  if (typeof v === "string") return JSON.stringify(v);
  if (typeof v === "number") {
    if (Number.isNaN(v)) return "NaN";
    if (v === Infinity) return "Infinity";
    if (v === -Infinity) return "-Infinity";
    return String(v);
  }
  return String(v);
};

const pad = (n) => String(n).padStart(2, "0");

/* Convierte el texto del campo en un objeto Date. */
function parseFecha(texto) {
  const s = String(texto ?? "").trim();
  if (s === "" || s.toLowerCase() === "now" || s.toLowerCase() === "ahora") {
    return new Date();
  }
  return new Date(s);
}

const esValida = (d) => !Number.isNaN(d.getTime());

const iso = (d) => (esValida(d) ? d.toISOString() : "Invalid Date");

const legible = (d) =>
  esValida(d)
    ? `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(
        d.getHours(),
      )}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`
    : "Invalid Date";

function componentes(d) {
  if (!esValida(d)) return null;
  return {
    anio: d.getFullYear(),
    mes: d.getMonth(),
    mesNombre: MESES[d.getMonth()],
    dia: d.getDate(),
    diaSemana: d.getDay(),
    diaSemanaNombre: DIAS[d.getDay()],
    horas: d.getHours(),
    minutos: d.getMinutes(),
    segundos: d.getSeconds(),
    ms: d.getMilliseconds(),
    timestamp: d.getTime(),
  };
}

/* Tokens con los componentes de una fecha. */
function tokensComponentes(d, activo = -1) {
  const c = componentes(d);
  if (!c) {
    return {
      tipo: "tokens",
      items: [{ main: "Invalid Date", sub: "fecha inválida" }],
    };
  }
  return {
    tipo: "tokens",
    items: [
      { main: c.anio, sub: "año" },
      { main: c.mes, sub: "mes (0-11)" },
      { main: c.dia, sub: "día del mes" },
      { main: c.diaSemana, sub: "día semana" },
      { main: c.horas, sub: "horas" },
      { main: c.minutos, sub: "minutos" },
      { main: c.segundos, sub: "segundos" },
      { main: c.timestamp, sub: "timestamp" },
    ],
    activo,
  };
}

const campoFecha = (def = "2024-12-25T10:30:45") => ({
  k: "fecha",
  label: "fecha (ISO, texto o 'ahora')",
  tipo: "text",
  def,
  ancho: 210,
});

const campoLocale = {
  k: "locale",
  label: "locale",
  tipo: "select",
  def: "es-PE",
  opciones: ["es-PE", "es-ES", "en-US", "de-DE", "ja-JP", "fr-FR"],
};

/* ======================================================================
   Fábrica de configuraciones para los getters
   ====================================================================== */
function configGetter({
  nombre,
  descripcion,
  obtener,
  etiqueta,
  indice,
  rango,
  nota,
}) {
  return {
    nombre,
    descripcion,
    campos: [campoFecha()],
    codigo: () => `const ${etiqueta} = fecha.${nombre}();`,
    celdas: (v) => tokensComponentes(parseFecha(v.fecha), indice),
    resultadoFinal: (v) => show(obtener(parseFecha(v.fecha))),
    traza: (v) => {
      const d = parseFecha(v.fecha);
      const c = componentes(d);
      const pasos = [{ tipo: "system", msg: `fecha = ${iso(d)} · hora local` }];

      if (!c) {
        pasos.push({
          tipo: "error",
          msg: "La fecha es inválida (Invalid Date): el método devuelve NaN",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: NaN" });
        return pasos;
      }

      const valor = obtener(d);
      pasos.push({
        tipo: "iteration",
        marks: [indice],
        msg: `Se lee ${nota} de la fecha: ${legible(d)} → ${show(valor)}`,
      });
      pasos.push({
        tipo: "success",
        marks: [indice],
        msg: `${nombre}() devuelve ${show(valor)} (${rango})`,
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(valor)}` });
      return pasos;
    },
  };
}

/* ======================================================================
   Configuración por método
   ====================================================================== */
const CONFIGS = {
  /* ----------------------------- new Date() ---------------------------- */
  newdate: {
    nombre: "new Date()",
    descripcion:
      "Constructor · crea un objeto Date desde la fecha actual, un string, un timestamp o componentes",
    campos: [
      {
        k: "modo",
        label: "forma de creación",
        tipo: "select",
        def: "componentes",
        opciones: ["ahora", "string", "timestamp", "componentes"],
      },
      {
        k: "valor",
        label: "valor (string, timestamp o año,mes,día,h,min,s)",
        tipo: "text",
        def: "2024,11,25,15,30,45",
        ancho: 250,
      },
    ],
    codigo: (v) => {
      if (v.modo === "ahora") return "const fecha = new Date();";
      if (v.modo === "timestamp") return `const fecha = new Date(${v.valor});`;
      if (v.modo === "string")
        return `const fecha = new Date(${JSON.stringify(v.valor)});`;
      return `const fecha = new Date(${v.valor});`;
    },
    crear: (v, ctx) => {
      if (v.modo === "ahora") return new Date(ctx.ahora);
      if (v.modo === "timestamp")
        return new Date(Number(String(v.valor).trim()));
      if (v.modo === "string") return new Date(String(v.valor));
      const nums = String(v.valor)
        .split(",")
        .map((x) => Number(x.trim()));
      return new Date(...nums);
    },
    celdas: (v, ctx) => tokensComponentes(CONFIGS.newdate.crear(v, ctx)),
    resultadoFinal: (v, ctx) => iso(CONFIGS.newdate.crear(v, ctx)),
    traza: (v, ctx) => {
      const d = CONFIGS.newdate.crear(v, ctx);
      const c = componentes(d);
      const pasos = [
        { tipo: "system", msg: `modo = ${v.modo} · valor = ${show(v.valor)}` },
      ];

      if (v.modo === "componentes") {
        pasos.push({
          tipo: "iteration",
          msg: "Los componentes se interpretan en hora local y los meses van de 0 (enero) a 11 (diciembre)",
        });
      }
      if (v.modo === "string") {
        pasos.push({
          tipo: "iteration",
          msg: 'Un string ISO sin hora se interpreta en UTC; con hora, en la zona indicada o local',
        });
      }
      if (v.modo === "timestamp") {
        pasos.push({
          tipo: "iteration",
          msg: "El número se interpreta como milisegundos desde el 1 de enero de 1970 UTC",
        });
      }
      if (v.modo === "ahora") {
        pasos.push({
          tipo: "iteration",
          msg: "Sin argumentos, el constructor toma la fecha y hora actuales",
        });
      }

      if (!c) {
        pasos.push({
          tipo: "error",
          msg: "La entrada no representa una fecha válida → Invalid Date",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: Invalid Date" });
        return pasos;
      }

      pasos.push({
        tipo: "success",
        msg: `Objeto Date creado → ${iso(d)} · ${legible(d)} (hora local)`,
      });
      pasos.push({
        tipo: "iteration",
        msg: `Componentes: año ${c.anio} · mes ${c.mes} (${c.mesNombre}) · día ${c.dia} · ${c.diaSemanaNombre} · ${pad(c.horas)}:${pad(c.minutos)}:${pad(c.segundos)}`,
      });
      pasos.push({
        tipo: "iteration",
        msg: `Timestamp interno: ${c.timestamp} ms desde el Epoch`,
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${iso(d)}` });
      return pasos;
    },
  },

  /* ----------------------------- Date.now() ---------------------------- */
  datenow: {
    nombre: "Date.now()",
    descripcion:
      "Método ESTÁTICO · milisegundos desde el 1 de enero de 1970 UTC hasta ahora",
    campos: [],
    codigo: () => "const timestamp = Date.now();",
    celdas: (v, ctx) => ({
      tipo: "tokens",
      items: [
        { main: ctx.ahora, sub: "milisegundos" },
        { main: Math.floor(ctx.ahora / 1000), sub: "segundos" },
        { main: Math.floor(ctx.ahora / 60000), sub: "minutos" },
        { main: Math.floor(ctx.ahora / 86400000), sub: "días" },
        { main: iso(new Date(ctx.ahora)), sub: "ISO (UTC)" },
      ],
    }),
    resultadoFinal: (v, ctx) => show(ctx.ahora),
    traza: (v, ctx) => {
      const d = new Date(ctx.ahora);
      return [
        { tipo: "system", msg: "Se consulta el reloj del sistema" },
        {
          tipo: "iteration",
          marks: [0],
          msg: `Instante actual → ${ctx.ahora} ms desde el Epoch`,
        },
        {
          tipo: "iteration",
          marks: [1],
          msg: `En segundos: Math.floor(${ctx.ahora} / 1000) = ${Math.floor(ctx.ahora / 1000)}`,
        },
        {
          tipo: "iteration",
          marks: [3],
          msg: `En días: Math.floor(${ctx.ahora} / 86400000) = ${Math.floor(ctx.ahora / 86400000)}`,
        },
        {
          tipo: "success",
          marks: [4],
          msg: `Equivale a ${iso(d)} en UTC`,
        },
        {
          tipo: "iteration",
          msg: "No crea ningún objeto Date: es un método estático y nunca lanza errores",
        },
        { tipo: "result", msg: `⏹ Retorna: ${ctx.ahora}` },
      ];
    },
  },

  /* ----------------------------- getTime() ----------------------------- */
  gettime: {
    nombre: "Date.prototype.getTime()",
    descripcion:
      "Método de INSTANCIA · devuelve el timestamp en milisegundos (UTC) de la fecha",
    campos: [campoFecha()],
    codigo: () => "const ms = fecha.getTime();",
    celdas: (v) => {
      const d = parseFecha(v.fecha);
      if (!esValida(d)) {
        return { tipo: "tokens", items: [{ main: "NaN", sub: "fecha inválida" }] };
      }
      return {
        tipo: "tokens",
        items: [
          { main: d.getTime(), sub: "milisegundos" },
          { main: Math.floor(d.getTime() / 1000), sub: "segundos Unix" },
          { main: Math.floor(d.getTime() / 86400000), sub: "días desde 1970" },
          { main: iso(d), sub: "ISO (UTC)" },
        ],
      };
    },
    resultadoFinal: (v) => show(parseFecha(v.fecha).getTime()),
    traza: (v) => {
      const d = parseFecha(v.fecha);
      const pasos = [{ tipo: "system", msg: `fecha = ${legible(d)} (hora local)` }];

      if (!esValida(d)) {
        pasos.push({
          tipo: "error",
          msg: "La fecha es inválida → getTime() devuelve NaN",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: NaN" });
        return pasos;
      }

      pasos.push({
        tipo: "iteration",
        marks: [3],
        msg: `El instante se expresa en UTC: ${iso(d)}`,
      });
      pasos.push({
        tipo: "success",
        marks: [0],
        msg: `Milisegundos desde el 1 de enero de 1970 UTC → ${d.getTime()}`,
      });
      pasos.push({
        tipo: "iteration",
        marks: [1],
        msg: `En segundos (timestamp Unix): ${Math.floor(d.getTime() / 1000)}`,
      });
      pasos.push({
        tipo: "iteration",
        msg: `Equivale a valueOf() y a +fecha: ${+d === d.getTime()}`,
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${d.getTime()}` });
      return pasos;
    },
  },

  /* ---------------------------- getFullYear() -------------------------- */
  getfullyear: configGetter({
    nombre: "getFullYear",
    descripcion: "Getter · año completo de 4 dígitos (hora local)",
    obtener: (d) => d.getFullYear(),
    etiqueta: "anio",
    indice: 0,
    rango: "año completo",
    nota: "el año",
  }),

  /* ----------------------------- getMonth() ---------------------------- */
  getmonth: configGetter({
    nombre: "getMonth",
    descripcion: "Getter · mes de la fecha, de 0 (enero) a 11 (diciembre)",
    obtener: (d) => d.getMonth(),
    etiqueta: "mes",
    indice: 1,
    rango: "0 a 11",
    nota: "el mes base 0",
  }),

  /* ----------------------------- getDate() ----------------------------- */
  getdate: configGetter({
    nombre: "getDate",
    descripcion: "Getter · día del mes, de 1 a 31 (no el día de la semana)",
    obtener: (d) => d.getDate(),
    etiqueta: "dia",
    indice: 2,
    rango: "1 a 31",
    nota: "el día del mes",
  }),

  /* ------------------------------ getDay() ----------------------------- */
  getday: configGetter({
    nombre: "getDay",
    descripcion: "Getter · día de la semana, de 0 (domingo) a 6 (sábado)",
    obtener: (d) => d.getDay(),
    etiqueta: "diaSemana",
    indice: 3,
    rango: "0 a 6",
    nota: "el día de la semana",
  }),

  /* ----------------------------- getHours() ---------------------------- */
  gethours: configGetter({
    nombre: "getHours",
    descripcion: "Getter · hora local en formato de 24 horas (0 a 23)",
    obtener: (d) => d.getHours(),
    etiqueta: "horas",
    indice: 4,
    rango: "0 a 23",
    nota: "la hora",
  }),

  /* ---------------------------- getMinutes() --------------------------- */
  getminutes: configGetter({
    nombre: "getMinutes",
    descripcion: "Getter · minutos de la hora local (0 a 59)",
    obtener: (d) => d.getMinutes(),
    etiqueta: "minutos",
    indice: 5,
    rango: "0 a 59",
    nota: "los minutos",
  }),

  /* ---------------------------- getSeconds() --------------------------- */
  getseconds: configGetter({
    nombre: "getSeconds",
    descripcion: "Getter · segundos de la hora local (0 a 59)",
    obtener: (d) => d.getSeconds(),
    etiqueta: "segundos",
    indice: 6,
    rango: "0 a 59",
    nota: "los segundos",
  }),

  /* ---------------------------- setFullYear() -------------------------- */
  setfullyear: {
    nombre: "Date.prototype.setFullYear()",
    descripcion:
      "Setter MUTABLE · cambia el año (y opcionalmente mes y día) en hora local",
    campos: [
      campoFecha(),
      { k: "anio", label: "año", tipo: "number", def: "2025", ancho: 90 },
      { k: "mes", label: "mes (0-11, opcional)", tipo: "text", def: "", ancho: 120 },
      { k: "dia", label: "día (opcional)", tipo: "text", def: "", ancho: 100 },
    ],
    codigo: (v) => {
      const partes = [v.anio];
      if (String(v.mes).trim() !== "") partes.push(v.mes);
      if (String(v.dia).trim() !== "") partes.push(v.dia);
      return `fecha.setFullYear(${partes.join(", ")});`;
    },
    resultadoFinal: (v) => {
      const d = parseFecha(v.fecha);
      const n = Number(v.anio);
      const m = String(v.mes).trim() === "" ? undefined : Number(v.mes);
      const dd = String(v.dia).trim() === "" ? undefined : Number(v.dia);
      const args = [n];
      if (m !== undefined) args.push(m);
      if (dd !== undefined) args.push(dd);
      try {
        return show(d.setFullYear(...args));
      } catch (e) {
        return `${e.name}: ${e.message}`;
      }
    },
    celdas: (v) => {
      const d = parseFecha(v.fecha);
      return tokensComponentes(d, 0);
    },
    traza: (v) => {
      const original = parseFecha(v.fecha);
      const d = new Date(original.getTime());
      const pasos = [
        { tipo: "system", msg: `fecha antes = ${legible(original)}` },
      ];

      if (!esValida(d)) {
        pasos.push({
          tipo: "error",
          msg: "La fecha de partida es inválida → el resultado sigue siendo inválido",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: NaN" });
        return pasos;
      }

      const n = Number(v.anio);
      const m = String(v.mes).trim() === "" ? undefined : Number(v.mes);
      const dd = String(v.dia).trim() === "" ? undefined : Number(v.dia);
      const antes = { anio: d.getFullYear(), mes: d.getMonth(), dia: d.getDate() };

      const args = [n];
      if (m !== undefined) args.push(m);
      if (dd !== undefined) args.push(dd);
      d.setFullYear(...args);
      const c = componentes(d);

      pasos.push({
        tipo: "iteration",
        marks: [0],
        msg: `Se establece el año ${n}${m === undefined ? " y se conserva el mes" : ` y el mes ${m}`}${dd === undefined ? "" : ` y el día ${dd}`}`,
      });

      if (!c) {
        pasos.push({
          tipo: "error",
          msg: "Algún parámetro inválido dejó la fecha como Invalid Date",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: NaN" });
        return pasos;
      }

      if (antes.mes !== c.mes || antes.dia !== c.dia) {
        pasos.push({
          tipo: "iteration",
          msg: `Ajuste automático (overflow): el mes/día cambió de ${antes.mes}/${antes.dia} a ${c.mes}/${c.dia}`,
        });
      }

      pasos.push({
        tipo: "success",
        marks: [0],
        msg: `fecha después = ${legible(d)} · año ${c.anio}, mes ${c.mes} (${c.mesNombre}), día ${c.dia}`,
      });
      pasos.push({
        tipo: "iteration",
        msg: `Es mutable: el mismo objeto Date cambió → ${legible(d)} (antes ${legible(original)})`,
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${d.getTime()}` });
      return pasos;
    },
  },

  /* ------------------------------ setDate() ---------------------------- */
  setdate: {
    nombre: "Date.prototype.setDate()",
    descripcion:
      "Setter MUTABLE · cambia el día del mes y ajusta mes y año si hace falta",
    campos: [
      campoFecha(),
      { k: "dia", label: "día del mes", tipo: "number", def: "15", ancho: 110 },
    ],
    codigo: (v) => `fecha.setDate(${v.dia});`,
    resultadoFinal: (v) => {
      const d = parseFecha(v.fecha);
      return show(d.setDate(Number(v.dia)));
    },
    celdas: (v) => tokensComponentes(parseFecha(v.fecha), 2),
    traza: (v) => {
      const d = parseFecha(v.fecha);
      const pasos = [{ tipo: "system", msg: `fecha antes = ${legible(d)}` }];

      if (!esValida(d)) {
        pasos.push({
          tipo: "error",
          msg: "La fecha de partida es inválida → el resultado sigue siendo inválido",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: NaN" });
        return pasos;
      }

      const dia = Number(v.dia);
      const antes = { mes: d.getMonth(), anio: d.getFullYear(), dia: d.getDate() };
      d.setDate(dia);
      const c = componentes(d);

      pasos.push({
        tipo: "iteration",
        marks: [2],
        msg: `Se establece el día ${dia} (la hora se mantiene)`,
      });

      if (!c) {
        pasos.push({
          tipo: "error",
          msg: "El parámetro inválido dejó la fecha como Invalid Date",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: NaN" });
        return pasos;
      }

      if (antes.mes !== c.mes || antes.anio !== c.anio) {
        pasos.push({
          tipo: "iteration",
          msg: `Ajuste automático: se pasó de ${antes.dia}/${antes.mes + 1}/${antes.anio} a ${c.dia}/${c.mes + 1}/${c.anio}`,
        });
      }
      if (dia <= 0) {
        pasos.push({
          tipo: "iteration",
          msg: "Un día 0 o negativo retrocede al mes anterior (día 0 = último día del mes anterior)",
        });
      }

      pasos.push({
        tipo: "success",
        marks: [2],
        msg: `fecha después = ${legible(d)}`,
      });
      pasos.push({
        tipo: "iteration",
        msg: `Es mutable: el objeto original también cambió → día ${originalDia(antes, c)}`,
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${d.getTime()}` });
      return pasos;
    },
  },

  /* ------------------------------ setHours() --------------------------- */
  sethours: {
    nombre: "Date.prototype.setHours()",
    descripcion:
      "Setter MUTABLE · cambia la hora (y opcionalmente minutos, segundos y ms)",
    campos: [
      campoFecha(),
      { k: "horas", label: "horas (0-23)", tipo: "number", def: "15", ancho: 100 },
      { k: "minutos", label: "minutos (opcional)", tipo: "text", def: "", ancho: 110 },
      { k: "segundos", label: "segundos (opcional)", tipo: "text", def: "", ancho: 110 },
    ],
    codigo: (v) => {
      const partes = [v.horas];
      if (String(v.minutos).trim() !== "") partes.push(v.minutos);
      if (String(v.segundos).trim() !== "") partes.push(v.segundos);
      return `fecha.setHours(${partes.join(", ")});`;
    },
    resultadoFinal: (v) => {
      const d = parseFecha(v.fecha);
      const h = Number(v.horas);
      const m = String(v.minutos).trim() === "" ? undefined : Number(v.minutos);
      const s = String(v.segundos).trim() === "" ? undefined : Number(v.segundos);
      const args = [h];
      if (m !== undefined) args.push(m);
      if (s !== undefined) args.push(s);
      return show(d.setHours(...args));
    },
    celdas: (v) => tokensComponentes(parseFecha(v.fecha), 4),
    traza: (v) => {
      const d = parseFecha(v.fecha);
      const pasos = [{ tipo: "system", msg: `fecha antes = ${legible(d)}` }];

      if (!esValida(d)) {
        pasos.push({
          tipo: "error",
          msg: "La fecha de partida es inválida → el resultado sigue siendo inválido",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: NaN" });
        return pasos;
      }

      const h = Number(v.horas);
      const m = String(v.minutos).trim() === "" ? undefined : Number(v.minutos);
      const s = String(v.segundos).trim() === "" ? undefined : Number(v.segundos);
      const antesDia = d.getDate();
      const args = [h];
      if (m !== undefined) args.push(m);
      if (s !== undefined) args.push(s);
      d.setHours(...args);
      const c = componentes(d);

      pasos.push({
        tipo: "iteration",
        marks: [4],
        msg: `Se establecen las horas en ${h}${m === undefined ? " (los minutos se conservan)" : ` y los minutos en ${m}`}${s === undefined ? "" : ` y los segundos en ${s}`}`,
      });

      if (!c) {
        pasos.push({
          tipo: "error",
          msg: "Algún parámetro inválido dejó la fecha como Invalid Date",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: NaN" });
        return pasos;
      }

      if (antesDia !== c.dia) {
        pasos.push({
          tipo: "iteration",
          msg: `Ajuste automático: las horas fuera de rango cambiaron también el día (${antesDia} → ${c.dia})`,
        });
      }

      pasos.push({
        tipo: "success",
        marks: [4],
        msg: `fecha después = ${legible(d)}`,
      });
      pasos.push({
        tipo: "iteration",
        msg: "Es mutable: el objeto original también quedó modificado",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${d.getTime()}` });
      return pasos;
    },
  },

  /* ----------------------------- setMinutes() -------------------------- */
  setminutes: {
    nombre: "Date.prototype.setMinutes()",
    descripcion:
      "Setter MUTABLE · cambia los minutos (y opcionalmente segundos y ms)",
    campos: [
      campoFecha(),
      { k: "minutos", label: "minutos (0-59)", tipo: "number", def: "15", ancho: 110 },
      { k: "segundos", label: "segundos (opcional)", tipo: "text", def: "", ancho: 110 },
    ],
    codigo: (v) => {
      const partes = [v.minutos];
      if (String(v.segundos).trim() !== "") partes.push(v.segundos);
      return `fecha.setMinutes(${partes.join(", ")});`;
    },
    resultadoFinal: (v) => {
      const d = parseFecha(v.fecha);
      const m = Number(v.minutos);
      const s = String(v.segundos).trim() === "" ? undefined : Number(v.segundos);
      const args = [m];
      if (s !== undefined) args.push(s);
      return show(d.setMinutes(...args));
    },
    celdas: (v) => tokensComponentes(parseFecha(v.fecha), 5),
    traza: (v) => {
      const d = parseFecha(v.fecha);
      const pasos = [{ tipo: "system", msg: `fecha antes = ${legible(d)}` }];

      if (!esValida(d)) {
        pasos.push({
          tipo: "error",
          msg: "La fecha de partida es inválida → el resultado sigue siendo inválido",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: NaN" });
        return pasos;
      }

      const m = Number(v.minutos);
      const s = String(v.segundos).trim() === "" ? undefined : Number(v.segundos);
      const antesHora = d.getHours();
      const args = [m];
      if (s !== undefined) args.push(s);
      d.setMinutes(...args);
      const c = componentes(d);

      pasos.push({
        tipo: "iteration",
        marks: [5],
        msg: `Se establecen los minutos en ${m}${s === undefined ? " (los segundos se conservan)" : ` y los segundos en ${s}`}`,
      });

      if (!c) {
        pasos.push({
          tipo: "error",
          msg: "Algún parámetro inválido dejó la fecha como Invalid Date",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: NaN" });
        return pasos;
      }

      if (antesHora !== c.horas) {
        pasos.push({
          tipo: "iteration",
          msg: `Ajuste automático: los minutos fuera de rango cambiaron también la hora (${antesHora} → ${c.horas})`,
        });
      }

      pasos.push({
        tipo: "success",
        marks: [5],
        msg: `fecha después = ${legible(d)}`,
      });
      pasos.push({
        tipo: "iteration",
        msg: "Es mutable: el objeto original también quedó modificado",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${d.getTime()}` });
      return pasos;
    },
  },

  /* ---------------------------- toISOString() -------------------------- */
  toisostring: {
    nombre: "Date.prototype.toISOString()",
    descripcion:
      "Formato · convierte la fecha a texto ISO 8601 en UTC (AAAA-MM-DDTHH:mm:ss.sssZ)",
    campos: [campoFecha()],
    codigo: () => "const texto = fecha.toISOString();",
    celdas: (v) => {
      const d = parseFecha(v.fecha);
      if (!esValida(d)) {
        return {
          tipo: "tokens",
          items: [{ main: "RangeError", sub: "Invalid time value" }],
        };
      }
      return {
        tipo: "tokens",
        items: [
          { main: d.getUTCFullYear(), sub: "año (UTC)" },
          { main: pad(d.getUTCMonth() + 1), sub: "mes" },
          { main: pad(d.getUTCDate()), sub: "día" },
          { main: pad(d.getUTCHours()), sub: "hora" },
          { main: pad(d.getUTCMinutes()), sub: "minutos" },
          { main: pad(d.getUTCSeconds()), sub: "segundos" },
          { main: d.getUTCMilliseconds(), sub: "ms" },
        ],
      };
    },
    resultadoFinal: (v) => {
      const d = parseFecha(v.fecha);
      try {
        return show(d.toISOString());
      } catch (e) {
        return `${e.name}: ${e.message}`;
      }
    },
    traza: (v) => {
      const d = parseFecha(v.fecha);
      const pasos = [{ tipo: "system", msg: `fecha = ${legible(d)} (hora local)` }];

      if (!esValida(d)) {
        pasos.push({
          tipo: "error",
          msg: "✖ RangeError: Invalid time value",
        });
        pasos.push({ tipo: "result", msg: "⏹ Lanza RangeError" });
        return pasos;
      }

      pasos.push({
        tipo: "iteration",
        msg: `Se convierte el instante a UTC: ${iso(d)}`,
      });
      pasos.push({
        tipo: "iteration",
        marks: [0, 1, 2],
        msg: `Fecha en UTC: ${pad(d.getUTCDate())}/${pad(d.getUTCMonth() + 1)}/${d.getUTCFullYear()}`,
      });
      pasos.push({
        tipo: "iteration",
        marks: [3, 4, 5, 6],
        msg: `Hora en UTC: ${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}.${String(d.getUTCMilliseconds()).padStart(3, "0")}`,
      });
      pasos.push({
        tipo: "success",
        msg: `Devuelve el string ${show(d.toISOString())}`,
      });
      pasos.push({
        tipo: "iteration",
        msg: 'La "Z" final indica que la hora está en UTC (Zulu time)',
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(d.toISOString())}` });
      return pasos;
    },
  },

  /* --------------------------- toLocaleString() ------------------------ */
  tolocalestring: {
    nombre: "Date.prototype.toLocaleString()",
    descripcion:
      "Formato · fecha y hora legibles según el locale (hora local)",
    campos: [
      campoFecha(),
      campoLocale,
      {
        k: "estilo",
        label: "opciones",
        tipo: "select",
        def: "por defecto",
        opciones: [
          "por defecto",
          "dateStyle: full",
          "dateStyle: long",
          "dateStyle: short",
          "personalizado",
        ],
      },
    ],
    codigo: (v) => {
      const opciones = opcionesLocaleString(v.estilo);
      return opciones
        ? `const texto = fecha.toLocaleString(${JSON.stringify(v.locale)}, ${opciones});`
        : `const texto = fecha.toLocaleString(${JSON.stringify(v.locale)});`;
    },
    celdas: (v) => tokensComponentes(parseFecha(v.fecha)),
    resultadoFinal: (v) => {
      const d = parseFecha(v.fecha);
      try {
        return show(d.toLocaleString(v.locale, opcionesLocaleString(v.estilo)));
      } catch (e) {
        return `${e.name}: ${e.message}`;
      }
    },
    traza: (v) => {
      const d = parseFecha(v.fecha);
      const pasos = [{ tipo: "system", msg: `fecha = ${legible(d)} · locale = ${v.locale}` }];

      if (!esValida(d)) {
        pasos.push({
          tipo: "error",
          msg: "La fecha es inválida → el resultado es \"Invalid Date\"",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: \"Invalid Date\"" });
        return pasos;
      }

      pasos.push({
        tipo: "iteration",
        msg: "Se consulta la configuración regional y se aplican las opciones de formato",
      });
      pasos.push({
        tipo: "iteration",
        marks: [0, 1, 2],
        msg: `Se usa la hora local del sistema: ${legible(d)}`,
      });
      pasos.push({
        tipo: "success",
        msg: `Resultado: ${show(d.toLocaleString(v.locale, opcionesLocaleString(v.estilo)))}`,
      });
      pasos.push({
        tipo: "iteration",
        msg: "No confundir con toISOString(): este método usa la hora local y un formato para personas",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(d.toLocaleString(v.locale, opcionesLocaleString(v.estilo)))}` });
      return pasos;
    },
  },

  /* ------------------------- toLocaleDateString() ---------------------- */
  tolocaledatestring: {
    nombre: "Date.prototype.toLocaleDateString()",
    descripcion: "Formato · solo la fecha, legible según el locale",
    campos: [
      campoFecha(),
      campoLocale,
      {
        k: "estilo",
        label: "opciones",
        tipo: "select",
        def: "por defecto",
        opciones: [
          "por defecto",
          "dateStyle: full",
          "dateStyle: long",
          "dateStyle: short",
          "personalizado",
        ],
      },
    ],
    codigo: (v) => {
      const opciones = opcionesFecha(v.estilo);
      return opciones
        ? `const texto = fecha.toLocaleDateString(${JSON.stringify(v.locale)}, ${opciones});`
        : `const texto = fecha.toLocaleDateString(${JSON.stringify(v.locale)});`;
    },
    celdas: (v) => tokensComponentes(parseFecha(v.fecha)),
    resultadoFinal: (v) => {
      const d = parseFecha(v.fecha);
      try {
        return show(d.toLocaleDateString(v.locale, opcionesFecha(v.estilo)));
      } catch (e) {
        return `${e.name}: ${e.message}`;
      }
    },
    traza: (v) => {
      const d = parseFecha(v.fecha);
      const pasos = [{ tipo: "system", msg: `fecha = ${legible(d)} · locale = ${v.locale}` }];

      if (!esValida(d)) {
        pasos.push({
          tipo: "error",
          msg: "La fecha es inválida → el resultado es \"Invalid Date\"",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: \"Invalid Date\"" });
        return pasos;
      }

      pasos.push({
        tipo: "iteration",
        msg: "Se formatea solo la parte de fecha (sin la hora)",
      });
      pasos.push({
        tipo: "iteration",
        marks: [0, 1, 2],
        msg: `Día, mes y año según la región: ${d.toLocaleDateString(v.locale, opcionesFecha(v.estilo))}`,
      });
      pasos.push({
        tipo: "success",
        msg: `Resultado: ${show(d.toLocaleDateString(v.locale, opcionesFecha(v.estilo)))}`,
      });
      pasos.push({
        tipo: "iteration",
        msg: "El formato cambia según el locale (DD/MM/AAAA, MM/DD/AAAA, AAAA/MM/DD...)",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(d.toLocaleDateString(v.locale, opcionesFecha(v.estilo)))}` });
      return pasos;
    },
  },

  /* ------------------------- toLocaleTimeString() ---------------------- */
  tolocaletimestring: {
    nombre: "Date.prototype.toLocaleTimeString()",
    descripcion: "Formato · solo la hora, legible según el locale",
    campos: [
      campoFecha(),
      campoLocale,
      {
        k: "estilo",
        label: "opciones",
        tipo: "select",
        def: "por defecto",
        opciones: [
          "por defecto",
          "timeStyle: short",
          "timeStyle: medium",
          "timeStyle: long",
          "personalizado",
        ],
      },
    ],
    codigo: (v) => {
      const opciones = opcionesHora(v.estilo);
      return opciones
        ? `const texto = fecha.toLocaleTimeString(${JSON.stringify(v.locale)}, ${opciones});`
        : `const texto = fecha.toLocaleTimeString(${JSON.stringify(v.locale)});`;
    },
    celdas: (v) => tokensComponentes(parseFecha(v.fecha)),
    resultadoFinal: (v) => {
      const d = parseFecha(v.fecha);
      try {
        return show(d.toLocaleTimeString(v.locale, opcionesHora(v.estilo)));
      } catch (e) {
        return `${e.name}: ${e.message}`;
      }
    },
    traza: (v) => {
      const d = parseFecha(v.fecha);
      const pasos = [{ tipo: "system", msg: `fecha = ${legible(d)} · locale = ${v.locale}` }];

      if (!esValida(d)) {
        pasos.push({
          tipo: "error",
          msg: "La fecha es inválida → el resultado es \"Invalid Date\"",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: \"Invalid Date\"" });
        return pasos;
      }

      pasos.push({
        tipo: "iteration",
        msg: "Se formatea solo la parte de hora (sin la fecha)",
      });
      pasos.push({
        tipo: "iteration",
        marks: [4, 5, 6],
        msg: `Hora local: ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`,
      });
      pasos.push({
        tipo: "success",
        msg: `Resultado: ${show(d.toLocaleTimeString(v.locale, opcionesHora(v.estilo)))}`,
      });
      pasos.push({
        tipo: "iteration",
        msg: "Según el locale se usa formato de 12 horas (AM/PM) o de 24 horas",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(d.toLocaleTimeString(v.locale, opcionesHora(v.estilo)))}` });
      return pasos;
    },
  },
};

/* --------------------- opciones de formato por estilo -------------------- */
function opcionesLocaleString(estilo) {
  if (estilo === "dateStyle: full") return '{ dateStyle: "full" }';
  if (estilo === "dateStyle: long") return '{ dateStyle: "long" }';
  if (estilo === "dateStyle: short") return '{ dateStyle: "short" }';
  if (estilo === "personalizado")
    return '{ weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }';
  return null;
}

function opcionesFecha(estilo) {
  if (estilo === "dateStyle: full") return '{ dateStyle: "full" }';
  if (estilo === "dateStyle: long") return '{ dateStyle: "long" }';
  if (estilo === "dateStyle: short") return '{ dateStyle: "short" }';
  if (estilo === "personalizado")
    return '{ weekday: "long", year: "numeric", month: "long", day: "numeric" }';
  return null;
}

function opcionesHora(estilo) {
  if (estilo === "timeStyle: short") return '{ timeStyle: "short" }';
  if (estilo === "timeStyle: medium") return '{ timeStyle: "medium" }';
  if (estilo === "timeStyle: long") return '{ timeStyle: "long" }';
  if (estilo === "personalizado")
    return '{ hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }';
  return null;
}

function originalDia(antes, despues) {
  return `${despues.dia}/${despues.mes + 1}/${despues.anio} (antes ${antes.dia}/${antes.mes + 1}/${antes.anio})`;
}

/* ======================================================================
   UI
   ====================================================================== */
export default function SimuladorFecha({ metodoId }) {
  const config = CONFIGS[metodoId];

  const [vals, setVals] = useState(() =>
    Object.fromEntries(config.campos.map((c) => [c.k, c.def])),
  );
  const [paso, setPaso] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [ahora, setAhora] = useState(() => Date.now());

  /* Un único "ahora" por juego de valores, para que todos los pasos coincidan. */
  const ctx = useMemo(() => ({ ahora }), [ahora]);

  const traza = useMemo(() => {
    try {
      return config.traza(vals, ctx);
    } catch (e) {
      return [{ tipo: "error", msg: "❌ " + e.message }];
    }
  }, [config, vals, ctx]);

  const celdasRaw = useMemo(() => {
    try {
      return config.celdas
        ? config.celdas(vals, ctx)
        : { tipo: "none", items: [] };
    } catch {
      return { tipo: "none", items: [] };
    }
  }, [config, vals, ctx]);

  const celdas = Array.isArray(celdasRaw)
    ? { tipo: "chars", items: celdasRaw }
    : celdasRaw;

  const resultadoFinal = useMemo(() => {
    try {
      return config.resultadoFinal(vals, ctx);
    } catch {
      return null;
    }
  }, [config, vals, ctx]);

  useEffect(() => {
    if (!playing) return;
    if (paso >= traza.length) {
      setPlaying(false);
      return;
    }
    const t = setTimeout(() => setPaso((p) => p + 1), 900);
    return () => clearTimeout(t);
  }, [playing, paso, traza.length]);

  const reset = () => {
    setPlaying(false);
    setPaso(0);
  };
  const avanzar = () => setPaso((p) => Math.min(p + 1, traza.length));
  const toggleEjecutar = () => {
    if (playing) setPlaying(false);
    else {
      if (paso === 0) avanzar();
      setPlaying(true);
    }
  };
  const cambiar = (k, valor) => {
    setVals((prev) => ({ ...prev, [k]: valor }));
    setAhora(Date.now());
    reset();
  };

  const visibles = traza.slice(0, paso);
  const terminado = paso > 0 && paso >= traza.length;
  const conMarks = visibles.filter((s) => s.marks && s.marks.length);
  const ultimaMarca = conMarks[conMarks.length - 1];
  const pasadas = new Set(conMarks.slice(0, -1).flatMap((s) => s.marks));

  const claseCelda = (i) => {
    let c = "sim-box";
    if (ultimaMarca && ultimaMarca.marks.includes(i)) {
      c +=
        ultimaMarca.tipo === "success"
          ? " is-found"
          : ultimaMarca.tipo === "error"
            ? " is-failed"
            : " is-current";
    } else if (pasadas.has(i)) {
      c += " is-past";
    }
    return c;
  };

  const logs = [];
  if (paso > 0) logs.push({ tipo: "system", msg: `▶ Ejecutando ${config.nombre}` });
  visibles.forEach((s) => logs.push({ tipo: s.tipo, msg: s.msg }));

  return (
    <div className="sim-container">
      <div className="sim-header">
        <h3>
          🧪 Laboratorio interactivo: <code>{config.nombre}</code>
        </h3>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">{config.descripcion}</div>

        <div style={{ marginBottom: "16px" }}>
          <CodeBlock code={config.codigo(vals)} />
        </div>

        <div
          className="sim-controls"
          style={{ flexWrap: "wrap", alignItems: "center" }}
        >
          {config.campos.map((c) => {
            if (c.tipo === "select") {
              return (
                <label key={c.k} className="sim-field-label">
                  {c.label}
                  <select
                    className="sim-input"
                    value={vals[c.k]}
                    onChange={(e) => cambiar(c.k, e.target.value)}
                    disabled={playing}
                    style={{ width: c.ancho ? `${c.ancho}px` : "150px" }}
                  >
                    {c.opciones.map((o) => (
                      <option key={o} value={o}>
                        {o}
                      </option>
                    ))}
                  </select>
                </label>
              );
            }
            return (
              <label key={c.k} className="sim-field-label">
                {c.label}
                <input
                  type={c.tipo === "number" ? "number" : "text"}
                  value={vals[c.k]}
                  onChange={(e) => cambiar(c.k, e.target.value)}
                  className="sim-input"
                  style={{ width: c.ancho ? `${c.ancho}px` : "100px" }}
                  disabled={playing}
                  spellCheck={false}
                />
              </label>
            );
          })}
          <button
            onClick={toggleEjecutar}
            className="sim-btn primary"
            disabled={terminado}
          >
            {playing ? "⏸ Pausar" : "▶ Ejecutar"}
          </button>
          <button
            onClick={avanzar}
            className="sim-btn"
            disabled={playing || terminado}
          >
            ⏭ Paso
          </button>
          <button onClick={reset} className="sim-btn">
            🔄 Reset
          </button>
        </div>
      </div>

      {celdas.tipo !== "none" && celdas.items.length > 0 && (
        <div
          className="sim-array-container"
          style={{ flexDirection: "row", flexWrap: "wrap" }}
        >
          {celdas.items.map((celda, i) => (
            <div key={i} className={claseCelda(i)}>
              <div
                className="box-inner"
                style={{
                  flexDirection: "column",
                  gap: "2px",
                  minWidth: "64px",
                  alignItems: "center",
                }}
              >
                <span className="box-data">{celda.main}</span>
                {celda.sub && (
                  <span className="box-index" style={{ fontSize: "10px" }}>
                    {celda.sub}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {terminado && resultadoFinal !== null && (
        <div className="sim-resultado-final">
          <span className="sim-resultado-label">↩ Resultado final</span>
          <code>{resultadoFinal}</code>
        </div>
      )}

      <div className="sim-console">
        <div className="sim-console-header">Terminal · paso a paso</div>
        <div className="sim-console-body">
          {logs.length === 0 && (
            <span className="log-system">Esperando ejecución...</span>
          )}
          {logs.map((log, i) => (
            <div key={i} className={`log-${log.tipo}`}>
              {log.msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
