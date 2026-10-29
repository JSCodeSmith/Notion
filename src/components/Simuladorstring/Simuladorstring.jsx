import { useEffect, useMemo, useState } from "react";
import CodeBlock from "../CodeBlock/CodeBlock";
import "../SimuladorFind/SimuladorFind.css";
import "./SimuladorString.css";

/* ---------- Helpers ---------- */
const hex = (n) => "U+" + n.toString(16).toUpperCase().padStart(4, "0");
const show = (s) => JSON.stringify(s);
const isHi = (c) => c >= 0xd800 && c <= 0xdbff;
const isLo = (c) => c >= 0xdc00 && c <= 0xdfff;
const isSur = (c) => isHi(c) || isLo(c);
const LONE = "\uD83D";
const MAX_PASOS_REPEAT = 12;
const visible = (ch) =>
  ch === " " ? "␣" : ch === "\n" ? "⏎" : ch === "\t" ? "⇥" : ch;


// Celdas por carácter (para startsWith, endsWith, repeat, raw)
const celdasChars = (s) =>
  Array.from({ length: s.length }, (_, i) => ({ main: visible(s[i]), sub: "" }));

// Celdas por unidad UTF-16 (para code points, surrogates, etc.)
const celdasUnidades = (s) =>
  Array.from({ length: s.length }, (_, i) => {
    const c = s.charCodeAt(i);
    if (isSur(c))
      return { main: hex(c), sub: isHi(c) ? "surrogate alto" : "surrogate bajo" };
    return { main: visible(s[i]), sub: String(c) };
  });

const parseCodigos = (texto) =>
  String(texto).split(",").map((x) => x.trim()).filter((x) => x !== "").map(Number);

const celdasCodigos = (v) =>
  parseCodigos(v.codigos).map((n) => ({
    main: String(n),
    sub: Number.isFinite(n) ? hex(n & 0xffff) : "NaN",
  }));

function compilarRegex(texto, flags = "g") {
  try { return new RegExp(texto, flags) } catch { return null }
}

const celdasArray = (arr) =>
  arr.map((el, i) => ({ main: visible(String(el)), sub: `[${i}]` }));
function normalizarCeldas(raw) {
  if (Array.isArray(raw)) return { tipo: "chars", items: raw };
  if (raw && Array.isArray(raw.items)) return raw;
  return { tipo: "none", items: [] };
}



/* ---------- Configuración por método ---------- */
// traza(v) → lista de pasos { tipo, msg, marks? }
// tipos: system | iteration | success | error | result
const CONFIGS = {
  /* ---------- String.raw ---------- */
  raw: {
    nombre: "String.raw()",
    campos: [
      {
        k: "texto",
        label: "Template",
        tipo: "text",
        def: "C:\\Users\\nuevo\\tmp",
        ancho: 190,
      },
    ],
    codigo: (v) => `const r = String.raw\`${v.texto}\`;`,
    celdas: (v) => celdasChars(v.texto),
    traza: (v) => {
      const s = v.texto;
      const marks = [];
      for (let i = 0; i < s.length; i++)
        if (s[i] === "\\") marks.push(i, i + 1);
      const interpretado = s.replace(/\\(n|t|\\)/g, (_, c) =>
        c === "n" ? "\n" : c === "t" ? "\t" : "\\",
      );
      const pasos = [
        { tipo: "iteration", msg: `> Template escrito: ${show(s)}` },
      ];
      if (marks.length) {
        pasos.push({
          tipo: "iteration",
          msg: "> Se detectaron secuencias con barra invertida (\\)",
          marks,
        });
        pasos.push({
          tipo: "error",
          msg: `✗ Un string normal las interpretaría → ${show(interpretado)}`,
        });
      } else {
        pasos.push({
          tipo: "iteration",
          msg: "> No hay barras invertidas: ambos resultados coinciden",
        });
      }
      pasos.push({
        tipo: "success",
        msg: "✅ String.raw conserva los caracteres exactamente como están escritos",
        marks,
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(s)}` });
      return pasos;
    },
  },

  /* ---------- codePointAt ---------- */
  codepointat: {
    nombre: "codePointAt()",
    campos: [
      { k: "texto", label: "Texto", tipo: "text", def: "A😀B", ancho: 110 },
      { k: "indice", label: "Índice", tipo: "number", def: "1", ancho: 60 },
    ],
    codigo: (v) => `const cp = ${show(v.texto)}.codePointAt(${v.indice});`,
    celdas: (v) => celdasUnidades(v.texto),
    traza: (v) => {
      const s = v.texto;
      const i = Math.trunc(Number(v.indice)) || 0;
      const pasos = [
        {
          tipo: "system",
          msg: `Texto ${show(s)} · length = ${s.length} (unidades UTF-16)`,
        },
      ];
      if (i < 0 || i >= s.length) {
        pasos.push({
          tipo: "error",
          msg: `❌ Índice ${i} fuera de rango (0 a ${s.length - 1}).`,
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: undefined" });
        return pasos;
      }
      const c = s.charCodeAt(i);
      pasos.push({
        tipo: "iteration",
        msg: `> Unidad en [${i}]: ${hex(c)} (${c})`,
        marks: [i],
      });
      if (isHi(c) && i + 1 < s.length && isLo(s.charCodeAt(i + 1))) {
        const lo = s.charCodeAt(i + 1);
        const cp = s.codePointAt(i);
        pasos.push({
          tipo: "iteration",
          msg: `> [${i}] es surrogate alto y [${i + 1}] es surrogate bajo → par sustituto`,
          marks: [i, i + 1],
        });
        pasos.push({
          tipo: "success",
          msg: `✅ Combina: (${c} - 0xD800) × 0x400 + (${lo} - 0xDC00) + 0x10000 = ${cp}`,
          marks: [i, i + 1],
        });
        pasos.push({ tipo: "result", msg: `⏹ Retorna: ${cp} (${hex(cp)})` });
      } else if (isSur(c)) {
        pasos.push({
          tipo: "error",
          msg: "⚠ Es una mitad de par (o un surrogate suelto): devuelve la unidad tal cual",
          marks: [i],
        });
        pasos.push({ tipo: "result", msg: `⏹ Retorna: ${c}` });
      } else {
        pasos.push({
          tipo: "success",
          msg: "✅ Carácter del BMP: el code point es igual a la unidad",
          marks: [i],
        });
        pasos.push({ tipo: "result", msg: `⏹ Retorna: ${c} (${hex(c)})` });
      }
      return pasos;
    },
  },

  /* ---------- charCodeAt ---------- */
  charcodeat: {
    nombre: "charCodeAt()",
    campos: [
      { k: "texto", label: "Texto", tipo: "text", def: "Hola😂", ancho: 110 },
      { k: "indice", label: "Índice", tipo: "number", def: "4", ancho: 60 },
    ],
    codigo: (v) => `const codigo = ${show(v.texto)}.charCodeAt(${v.indice});`,
    celdas: (v) => celdasUnidades(v.texto),
    traza: (v) => {
      const s = v.texto;
      const i = Math.trunc(Number(v.indice)) || 0;
      const pasos = [
        { tipo: "system", msg: `Texto ${show(s)} · length = ${s.length}` },
      ];
      if (i < 0 || i >= s.length) {
        pasos.push({
          tipo: "error",
          msg: `❌ Índice ${i} fuera de rango (0 a ${s.length - 1}).`,
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: NaN" });
        return pasos;
      }
      const c = s.charCodeAt(i);
      pasos.push({
        tipo: "iteration",
        msg: `> Unidad UTF-16 en [${i}]: ${show(s[i])}`,
        marks: [i],
      });
      if (isSur(c)) {
        pasos.push({
          tipo: "error",
          msg: "⚠ Es solo la mitad de un par sustituto: usa codePointAt() para el código completo",
          marks: [i],
        });
      } else {
        pasos.push({
          tipo: "success",
          msg: `✅ Código del carácter: ${c} (${hex(c)})`,
          marks: [i],
        });
      }
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${c}` });
      return pasos;
    },
  },

  /* ---------- String.fromCharCode ---------- */
  fromcharcode: {
    nombre: "String.fromCharCode()",
    campos: [
      {
        k: "codigos",
        label: "Códigos",
        tipo: "text",
        def: "72, 111, 108, 97",
        ancho: 170,
      },
    ],
    codigo: (v) => `const texto = String.fromCharCode(${v.codigos});`,
    celdas: celdasCodigos,
    traza: (v) => {
      const nums = parseCodigos(v.codigos);
      const pasos = [];
      if (nums.length === 0) {
        pasos.push({
          tipo: "system",
          msg: "Sin argumentos: devuelve la cadena vacía",
        });
        pasos.push({ tipo: "result", msg: '⏹ Retorna: ""' });
        return pasos;
      }
      let out = "";
      nums.forEach((n, k) => {
        const u = Number.isFinite(n)
          ? ((Math.trunc(n) % 65536) + 65536) % 65536
          : 0;
        const aviso = u !== n ? ` (se toman los 16 bits bajos → ${u})` : "";
        const ch = String.fromCharCode(u);
        out += ch;
        pasos.push({
          tipo: u !== n ? "error" : "iteration",
          msg: `> ${n}${aviso} → ${show(ch)}`,
          marks: [k],
        });
      });
      pasos.push({
        tipo: "success",
        msg: "✅ Todas las unidades UTF-16 se unen en una sola cadena",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(out)}` });
      return pasos;
    },
  },

  /* ---------- String.fromCodePoint ---------- */
  fromcodepoint: {
    nombre: "String.fromCodePoint()",
    campos: [
      {
        k: "codigos",
        label: "Code points",
        tipo: "text",
        def: "72, 128512, 33",
        ancho: 170,
      },
    ],
    codigo: (v) => `const texto = String.fromCodePoint(${v.codigos});`,
    celdas: (v) =>
      parseCodigos(v.codigos).map((n) => ({
        main: String(n),
        sub: Number.isFinite(n) ? "U+" + n.toString(16).toUpperCase() : "NaN",
      })),
    traza: (v) => {
      const nums = parseCodigos(v.codigos);
      const pasos = [];
      if (nums.length === 0) {
        pasos.push({
          tipo: "system",
          msg: "Sin argumentos: devuelve la cadena vacía",
        });
        pasos.push({ tipo: "result", msg: '⏹ Retorna: ""' });
        return pasos;
      }
      let out = "";
      for (let k = 0; k < nums.length; k++) {
        const n = nums[k];
        if (!Number.isInteger(n) || n < 0 || n > 0x10ffff) {
          pasos.push({
            tipo: "error",
            msg: `❌ ${n} no es un code point válido (0 a 0x10FFFF)`,
            marks: [k],
          });
          pasos.push({
            tipo: "result",
            msg: `⏹ Lanza: RangeError: Invalid code point ${n}`,
          });
          return pasos;
        }
        const ch = String.fromCodePoint(n);
        out += ch;
        const extra =
          n > 0xffff ? " · fuera del BMP: usa 2 unidades UTF-16" : "";
        pasos.push({
          tipo: "iteration",
          msg: `> ${n} → ${show(ch)}${extra}`,
          marks: [k],
        });
      }
      pasos.push({
        tipo: "success",
        msg: "✅ Todos los code points son válidos",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(out)}` });
      return pasos;
    },
  },

  /* ---------- repeat ---------- */
  repeat: {
    nombre: "repeat()",
    campos: [
      { k: "texto", label: "Texto", tipo: "text", def: "Hola ", ancho: 100 },
      { k: "veces", label: "Veces", tipo: "number", def: "3", ancho: 60 },
    ],
    codigo: (v) => `const resultado = ${show(v.texto)}.repeat(${v.veces});`,
    celdas: (v) => celdasChars(v.texto),
    traza: (v) => {
      const s = v.texto;
      const raw = Number(v.veces);
      const pasos = [];
      if (raw < 0 || raw === Infinity) {
        pasos.push({
          tipo: "error",
          msg: "❌ La cantidad no puede ser negativa ni Infinity",
        });
        pasos.push({
          tipo: "result",
          msg: "⏹ Lanza: RangeError: Invalid count value",
        });
        return pasos;
      }
      const n = Number.isNaN(raw) ? 0 : Math.trunc(raw);
      if (n > 100) {
        pasos.push({
          tipo: "error",
          msg: "⚠ El simulador limita la cantidad a 100 para no llenar la pantalla",
        });
        pasos.push({
          tipo: "result",
          msg: "⏹ Prueba con un valor entre 0 y 100",
        });
        return pasos;
      }
      pasos.push({
        tipo: "system",
        msg: `Cantidad: ${n}${n === 0 ? " → no se concatena nada" : ""}`,
      });
      for (let i = 1; i <= Math.min(n, MAX_PASOS_REPEAT); i++) {
        pasos.push({
          tipo: "iteration",
          msg: `> Vuelta ${i}: acumulado = ${show(s.repeat(i))}`,
        });
      }
      if (n > MAX_PASOS_REPEAT) {
        pasos.push({
          tipo: "iteration",
          msg: `> … (se omiten las vueltas ${MAX_PASOS_REPEAT + 1} a ${n})`,
        });
      }
      pasos.push({
        tipo: "success",
        msg: "✅ La cadena original no se modifica; se crea una nueva",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(s.repeat(n))}` });
      return pasos;
    },
  },

  /* ---------- isWellFormed ---------- */
  iswellformed: {
    nombre: "isWellFormed()",
    campos: [
      { k: "texto", label: "Texto", tipo: "text", def: "Hola 🚀", ancho: 120 },
      {
        k: "suelto",
        label: "Añadir surrogate suelto (\\uD83D) al final",
        tipo: "check",
        def: false,
      },
    ],
    codigo: (v) =>
      `const ok = ${show(v.texto + (v.suelto ? LONE : ""))}.isWellFormed();`,
    celdas: (v) => celdasUnidades(v.texto + (v.suelto ? LONE : "")),
    traza: (v) => {
      const s = v.texto + (v.suelto ? LONE : "");
      const pasos = [
        {
          tipo: "system",
          msg: `Revisando ${s.length} unidades UTF-16 de izquierda a derecha`,
        },
      ];
      let i = 0;
      while (i < s.length) {
        const c = s.charCodeAt(i);
        if (isHi(c)) {
          if (i + 1 < s.length && isLo(s.charCodeAt(i + 1))) {
            pasos.push({
              tipo: "iteration",
              msg: `> [${i}][${i + 1}] surrogate alto + bajo → par válido`,
              marks: [i, i + 1],
            });
            i += 2;
            continue;
          }
          pasos.push({
            tipo: "error",
            msg: `❌ [${i}] surrogate alto sin pareja (lone surrogate). Corta aquí.`,
            marks: [i],
          });
          pasos.push({ tipo: "result", msg: "⏹ Retorna: false" });
          return pasos;
        }
        if (isLo(c)) {
          pasos.push({
            tipo: "error",
            msg: `❌ [${i}] surrogate bajo sin su pareja alta (lone surrogate). Corta aquí.`,
            marks: [i],
          });
          pasos.push({ tipo: "result", msg: "⏹ Retorna: false" });
          return pasos;
        }
        pasos.push({
          tipo: "iteration",
          msg: `> [${i}] ${show(s[i])} unidad normal`,
          marks: [i],
        });
        i++;
      }
      pasos.push({
        tipo: "success",
        msg: "✅ Todas las unidades tienen su pareja correcta",
      });
      pasos.push({ tipo: "result", msg: "⏹ Retorna: true" });
      return pasos;
    },
  },

  /* ---------- toWellFormed ---------- */
  towellformed: {
    nombre: "toWellFormed()",
    campos: [
      { k: "texto", label: "Texto", tipo: "text", def: "Hola 🚀", ancho: 120 },
      {
        k: "suelto",
        label: "Añadir surrogate suelto (\\uD83D) al final",
        tipo: "check",
        def: true,
      },
    ],
    codigo: (v) =>
      `const limpio = ${show(v.texto + (v.suelto ? LONE : ""))}.toWellFormed();`,
    celdas: (v) => celdasUnidades(v.texto + (v.suelto ? LONE : "")),
    traza: (v) => {
      const s = v.texto + (v.suelto ? LONE : "");
      const pasos = [
        { tipo: "system", msg: `Revisando ${s.length} unidades UTF-16` },
      ];
      let out = "";
      let reemplazos = 0;
      let i = 0;
      while (i < s.length) {
        const c = s.charCodeAt(i);
        if (isHi(c) && i + 1 < s.length && isLo(s.charCodeAt(i + 1))) {
          pasos.push({
            tipo: "iteration",
            msg: `> [${i}][${i + 1}] par válido → se mantiene`,
            marks: [i, i + 1],
          });
          out += s[i] + s[i + 1];
          i += 2;
        } else if (isSur(c)) {
          pasos.push({
            tipo: "error",
            msg: `❌ [${i}] lone surrogate ${hex(c)} → se reemplaza por U+FFFD (\uFFFD)`,
            marks: [i],
          });
          out += "\uFFFD";
          reemplazos++;
          i++;
        } else {
          pasos.push({
            tipo: "iteration",
            msg: `> [${i}] ${show(s[i])} se mantiene`,
            marks: [i],
          });
          out += s[i];
          i++;
        }
      }
      pasos.push({
        tipo: "success",
        msg: reemplazos
          ? `✅ ${reemplazos} reemplazo(s). La original no cambia.`
          : "✅ Ya estaba bien formada: devuelve una copia idéntica",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(out)}` });
      return pasos;
    },
  },

  /* ---------- startsWith ---------- */
  startswith: {
    nombre: "startsWith()",
    campos: [
      {
        k: "texto",
        label: "Texto",
        tipo: "text",
        def: "JavaScript es genial",
        ancho: 160,
      },
      { k: "buscar", label: "Buscar", tipo: "text", def: "Java", ancho: 90 },
      { k: "pos", label: "Posición", tipo: "number", def: "0", ancho: 60 },
    ],
    codigo: (v) =>
      `const r = ${show(v.texto)}.startsWith(${show(v.buscar)}${Number(v.pos) ? ", " + v.pos : ""});`,
    celdas: (v) => celdasChars(v.texto),
    traza: (v) => {
      const s = v.texto;
      const b = v.buscar;
      const pos = Math.min(
        Math.max(Math.trunc(Number(v.pos)) || 0, 0),
        s.length,
      );
      const pasos = [
        {
          tipo: "system",
          msg: `Comparando ${show(b)} desde la posición ${pos} (distingue mayúsculas)`,
        },
      ];
      if (b === "") {
        pasos.push({
          tipo: "success",
          msg: "✅ La cadena vacía siempre coincide",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: true" });
        return pasos;
      }
      for (let j = 0; j < b.length; j++) {
        const idx = pos + j;
        if (idx >= s.length) {
          pasos.push({
            tipo: "error",
            msg: "❌ El texto se acabó antes de terminar la comparación",
          });
          pasos.push({ tipo: "result", msg: "⏹ Retorna: false" });
          return pasos;
        }
        const ok = s[idx] === b[j];
        pasos.push({
          tipo: ok ? "iteration" : "error",
          msg: `${ok ? ">" : "❌"} [${idx}] ${show(s[idx])} ${ok ? "===" : "!=="} ${show(b[j])}`,
          marks: [idx],
        });
        if (!ok) {
          pasos.push({ tipo: "result", msg: "⏹ Retorna: false" });
          return pasos;
        }
      }
      pasos.push({ tipo: "success", msg: "✅ Todos los caracteres coinciden" });
      pasos.push({ tipo: "result", msg: "⏹ Retorna: true" });
      return pasos;
    },
  },

  /* ---------- endsWith ---------- */
  endswith: {
    nombre: "endsWith()",
    campos: [
      {
        k: "texto",
        label: "Texto",
        tipo: "text",
        def: "documento_v1_final.pdf",
        ancho: 170,
      },
      { k: "buscar", label: "Buscar", tipo: "text", def: ".pdf", ancho: 80 },
      {
        k: "largo",
        label: "Length (opcional)",
        tipo: "number",
        def: "",
        ancho: 70,
      },
    ],
    codigo: (v) =>
      `const r = ${show(v.texto)}.endsWith(${show(v.buscar)}${v.largo !== "" ? ", " + v.largo : ""});`,
    celdas: (v) => celdasChars(v.texto),
    traza: (v) => {
      const s = v.texto;
      const b = v.buscar;
      const fin =
        v.largo === ""
          ? s.length
          : Math.min(Math.max(Math.trunc(Number(v.largo)) || 0, 0), s.length);
      const ini = fin - b.length;
      const pasos = [
        {
          tipo: "system",
          msg: `Se evalúan solo los primeros ${fin} caracteres: ${show(s.slice(0, fin))} (distingue mayúsculas)`,
        },
      ];
      if (b === "") {
        pasos.push({
          tipo: "success",
          msg: "✅ La cadena vacía siempre coincide",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: true" });
        return pasos;
      }
      if (ini < 0) {
        pasos.push({
          tipo: "error",
          msg: "❌ Lo buscado es más largo que el texto evaluado",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: false" });
        return pasos;
      }
      pasos.push({
        tipo: "iteration",
        msg: `> Se compara desde el índice ${ini} hasta ${fin - 1}`,
      });
      for (let j = 0; j < b.length; j++) {
        const idx = ini + j;
        const ok = s[idx] === b[j];
        pasos.push({
          tipo: ok ? "iteration" : "error",
          msg: `${ok ? ">" : "❌"} [${idx}] ${show(s[idx])} ${ok ? "===" : "!=="} ${show(b[j])}`,
          marks: [idx],
        });
        if (!ok) {
          pasos.push({ tipo: "result", msg: "⏹ Retorna: false" });
          return pasos;
        }
      }
      pasos.push({ tipo: "success", msg: "✅ El final coincide" });
      pasos.push({ tipo: "result", msg: "⏹ Retorna: true" });
      return pasos;
    },
  },

  /* ---------- toUpperCase ---------- */
touppercase: {
  nombre: "toUpperCase()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "Hola mundo 123!", ancho: 200 },
  ],
  codigo: (v) => `const resultado = ${show(v.texto)}.toUpperCase();`,
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => show(v.texto.toUpperCase()),
  traza: (v) => {
    const s = v.texto;
    const pasos = [
      {
        tipo: "system",
        msg: `Texto original: ${show(s)} · length = ${s.length}`,
      },
    ];

    if (s.length === 0) {
      pasos.push({
        tipo: "error",
        msg: "⚠️ Cadena vacía: no hay caracteres que convertir",
      });
      pasos.push({ tipo: "result", msg: '⏹ Retorna: ""' });
      return pasos;
    }

    let convertidos = 0;
    let intactos = 0;
    let acumulado = "";

    for (let i = 0; i < s.length; i++) {
      const original = s[i];
      const upper = original.toUpperCase();
      const cambia = upper !== original;

      if (cambia) convertidos++;
      else intactos++;

      acumulado += upper;

      pasos.push({
        tipo: cambia ? "success" : "iteration",
        msg: cambia
          ? `> [${i}] ${show(original)} → ${show(upper)} (minúscula → mayúscula)`
          : `> [${i}] ${show(original)} se mantiene igual`,
        marks: [i],
      });
    }

    pasos.push({
      tipo: "success",
      msg: `✅ Conversión aplicada: ${convertidos} carácter(es) cambiado(s) · ${intactos} intacto(s)`,
    });
    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${show(acumulado)}`,
    });

    return pasos;
  },

  /* ---------- toLowerCase ---------- */
tolowercase: {
  nombre: "toLowerCase()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "HOLA MUNDO 123!", ancho: 200 },
  ],
  codigo: (v) => `const resultado = ${show(v.texto)}.toLowerCase();`,
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => show(v.texto.toLowerCase()),
  traza: (v) => {
    const s = v.texto;
    const pasos = [
      {
        tipo: "system",
        msg: `Texto original: ${show(s)} · length = ${s.length}`,
      },
    ];

    if (s.length === 0) {
      pasos.push({
        tipo: "error",
        msg: "⚠️ Cadena vacía: no hay caracteres que convertir",
      });
      pasos.push({ tipo: "result", msg: '⏹ Retorna: ""' });
      return pasos;
    }

    let convertidos = 0;
    let intactos = 0;
    let acumulado = "";

    for (let i = 0; i < s.length; i++) {
      const original = s[i];
      const lower = original.toLowerCase();
      const cambia = lower !== original;

      if (cambia) convertidos++;
      else intactos++;

      acumulado += lower;

      pasos.push({
        tipo: cambia ? "success" : "iteration",
        msg: cambia
          ? `> [${i}] ${show(original)} → ${show(lower)} (mayúscula → minúscula)`
          : `> [${i}] ${show(original)} se mantiene igual`,
        marks: [i],
      });
    }

    pasos.push({
      tipo: "success",
      msg: `✅ Conversión aplicada: ${convertidos} carácter(es) cambiado(s) · ${intactos} intacto(s)`,
    });
    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${show(acumulado)}`,
    });

    return pasos;
  },
},
/* ---------- toLocaleUpperCase ---------- */
tolocaleuppercase: {
  nombre: "toLocaleUpperCase()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "istanbul i", ancho: 200 },
    { k: "locale", label: "locale", tipo: "text", def: "tr", ancho: 60 },
  ],
  codigo: (v) => {
    const loc = v.locale.trim() ? `, ${show(v.locale.trim())}` : "";
    return `const resultado = ${show(v.texto)}.toLocaleUpperCase(${loc});`;
  },
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => {
    try {
      const loc = v.locale.trim();
      return show(loc ? v.texto.toLocaleUpperCase(loc) : v.texto.toLocaleUpperCase());
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const locRaw = v.locale.trim();
    const pasos = [
      {
        tipo: "system",
        msg: `Texto original: ${show(s)} · length = ${s.length}${locRaw ? ` · locale = "${locRaw}"` : " · locale = (por defecto)"}`,
      },
    ];

    // Validar el locale antes que nada
    if (locRaw) {
      try {
        new Intl.Locale(locRaw);
      } catch {
        pasos.push({
          tipo: "error",
          msg: `❌ Locale inválido: "${locRaw}". Debe ser una etiqueta BCP 47 (ej. "tr", "es-MX", "en-US").`,
        });
        pasos.push({ tipo: "result", msg: "⏹ Lanza: RangeError" });
        return pasos;
      }
    }

    if (s.length === 0) {
      pasos.push({
        tipo: "error",
        msg: "⚠️ Cadena vacía: no hay caracteres que convertir",
      });
      pasos.push({ tipo: "result", msg: '⏹ Retorna: ""' });
      return pasos;
    }

    let convertidos = 0;
    let intactos = 0;
    let diferentes = 0; // casos donde toLocaleUpperCase ≠ toUpperCase
    let acumulado = "";

    for (let i = 0; i < s.length; i++) {
      const original = s[i];
      let upper;
      try {
        upper = locRaw ? original.toLocaleUpperCase(locRaw) : original.toLocaleUpperCase();
      } catch {
        upper = original;
      }
      const general = original.toUpperCase();

      const cambia = upper !== original;
      const difiere = upper !== general;

      if (cambia) convertidos++;
      else intactos++;
      if (difiere) diferentes++;

      acumulado += upper;

      if (difiere) {
        pasos.push({
          tipo: "success",
          msg: `> [${i}] ${show(original)} → ${show(upper)}  ⟵ aquí el locale CAMBIA el resultado (toUpperCase daría ${show(general)})`,
          marks: [i],
        });
      } else if (cambia) {
        pasos.push({
          tipo: "iteration",
          msg: `> [${i}] ${show(original)} → ${show(upper)}`,
          marks: [i],
        });
      } else {
        pasos.push({
          tipo: "iteration",
          msg: `> [${i}] ${show(original)} se mantiene igual`,
          marks: [i],
        });
      }
    }

    pasos.push({
      tipo: "success",
      msg: `✅ Conversión aplicada: ${convertidos} cambiado(s) · ${intactos} intacto(s) · ${diferentes} donde el locale marca la diferencia`,
    });

    if (diferentes === 0) {
      pasos.push({
        tipo: "system",
        msg: locRaw
          ? `ℹ️ Con el locale "${locRaw}" el resultado coincide con toUpperCase() en todos los caracteres.`
          : "ℹ️ Sin locale explícito, se usa el del entorno (normalmente coincide con toUpperCase()).",
      });
    }

    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${show(acumulado)}`,
    });

    return pasos;
  },
},
/* ---------- toLocaleLowerCase ---------- */
tolocalelowercase: {
  nombre: "toLocaleLowerCase()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "ISTANBUL I", ancho: 200 },
    { k: "locale", label: "locale", tipo: "text", def: "tr", ancho: 60 },
  ],
  codigo: (v) => {
    const loc = v.locale.trim() ? `, ${show(v.locale.trim())}` : "";
    return `const resultado = ${show(v.texto)}.toLocaleLowerCase(${loc});`;
  },
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => {
    try {
      const loc = v.locale.trim();
      return show(loc ? v.texto.toLocaleLowerCase(loc) : v.texto.toLocaleLowerCase());
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const locRaw = v.locale.trim();
    const pasos = [
      {
        tipo: "system",
        msg: `Texto original: ${show(s)} · length = ${s.length}${locRaw ? ` · locale = "${locRaw}"` : " · locale = (por defecto)"}`,
      },
    ];

    // Validar el locale antes que nada
    if (locRaw) {
      try {
        new Intl.Locale(locRaw);
      } catch {
        pasos.push({
          tipo: "error",
          msg: `❌ Locale inválido: "${locRaw}". Debe ser una etiqueta BCP 47 (ej. "tr", "es-MX", "en-US").`,
        });
        pasos.push({ tipo: "result", msg: "⏹ Lanza: RangeError" });
        return pasos;
      }
    }

    if (s.length === 0) {
      pasos.push({
        tipo: "error",
        msg: "⚠️ Cadena vacía: no hay caracteres que convertir",
      });
      pasos.push({ tipo: "result", msg: '⏹ Retorna: ""' });
      return pasos;
    }

    let convertidos = 0;
    let intactos = 0;
    let diferentes = 0; // casos donde toLocaleLowerCase ≠ toLowerCase
    let acumulado = "";

    for (let i = 0; i < s.length; i++) {
      const original = s[i];
      let lower;
      try {
        lower = locRaw ? original.toLocaleLowerCase(locRaw) : original.toLocaleLowerCase();
      } catch {
        lower = original;
      }
      const general = original.toLowerCase();

      const cambia = lower !== original;
      const difiere = lower !== general;

      if (cambia) convertidos++;
      else intactos++;
      if (difiere) diferentes++;

      acumulado += lower;

      if (difiere) {
        pasos.push({
          tipo: "success",
          msg: `> [${i}] ${show(original)} → ${show(lower)}  ⟵ aquí el locale CAMBIA el resultado (toLowerCase daría ${show(general)})`,
          marks: [i],
        });
      } else if (cambia) {
        pasos.push({
          tipo: "iteration",
          msg: `> [${i}] ${show(original)} → ${show(lower)}`,
          marks: [i],
        });
      } else {
        pasos.push({
          tipo: "iteration",
          msg: `> [${i}] ${show(original)} se mantiene igual`,
          marks: [i],
        });
      }
    }

    pasos.push({
      tipo: "success",
      msg: `✅ Conversión aplicada: ${convertidos} cambiado(s) · ${intactos} intacto(s) · ${diferentes} donde el locale marca la diferencia`,
    });

    if (diferentes === 0) {
      pasos.push({
        tipo: "system",
        msg: locRaw
          ? `ℹ️ Con el locale "${locRaw}" el resultado coincide con toLowerCase() en todos los caracteres.`
          : "ℹ️ Sin locale explícito, se usa el del entorno (normalmente coincide con toLowerCase()).",
      });
    }

    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${show(acumulado)}`,
    });

    return pasos;
  },
},

/* ---------- trim ---------- */
trim: {
  nombre: "trim()",
  campos: [
    { k: "texto", label: "Texto (con espacios)", tipo: "text", def: "   Hola Mundo   ", ancho: 240 },
  ],
  codigo: (v) => `const resultado = ${show(v.texto)}.trim();`,
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => show(v.texto.trim()),
  traza: (v) => {
    const s = v.texto;
    const n = s.length;

    const pasos = [
      {
        tipo: "system",
        msg: `Texto original: ${show(s)} · length = ${n}`,
      },
    ];

    if (n === 0) {
      pasos.push({
        tipo: "error",
        msg: "⚠️ Cadena vacía: no hay nada que recortar",
      });
      pasos.push({ tipo: "result", msg: '⏹ Retorna: ""' });
      return pasos;
    }

    // Detectar índices de espacios al inicio y al final
    let i = 0;
    while (i < n && /\s/.test(s[i])) i++;
    let j = n - 1;
    while (j >= 0 && /\s/.test(s[j])) j--;

    if (i === 0 && j === n - 1) {
      pasos.push({
        tipo: "iteration",
        msg: "> No hay espacios al inicio ni al final: el texto ya está limpio",
      });
      pasos.push({
        tipo: "success",
        msg: "✅ trim() no cambia nada",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(s)}` });
      return pasos;
    }

    // 1. Recorte desde el inicio
    if (i > 0) {
      pasos.push({
        tipo: "iteration",
        msg: `> Inicio: detectados ${i} espacio(s) iniciales (índices 0..${i - 1})`,
        marks: Array.from({ length: i }, (_, k) => k),
      });
      for (let k = 0; k < i; k++) {
        const marks = [];
        for (let m = k; m < i; m++) marks.push(m);
        pasos.push({
          tipo: "error",
          msg: `> Recorta [${k}] ${show(s[k])} del inicio`,
          marks,
        });
      }
    } else {
      pasos.push({
        tipo: "iteration",
        msg: "> Inicio: sin espacios que recortar",
      });
    }

    // 2. Recorte desde el final
    if (j < n - 1) {
      const fin = n - 1 - j;
      pasos.push({
        tipo: "iteration",
        msg: `> Final: detectados ${fin} espacio(s) finales (índices ${j + 1}..${n - 1})`,
        marks: Array.from({ length: fin }, (_, k) => j + 1 + k),
      });
      for (let k = n - 1; k > j; k--) {
        const marks = [];
        for (let m = j + 1; m <= k; m++) marks.push(m);
        pasos.push({
          tipo: "error",
          msg: `> Recorta [${k}] ${show(s[k])} del final`,
          marks,
        });
      }
    } else {
      pasos.push({
        tipo: "iteration",
        msg: "> Final: sin espacios que recortar",
      });
    }

    const resultado = s.slice(i, j + 1);

    pasos.push({
      tipo: "success",
      msg: `✅ Limpieza completada: se eliminaron ${i + (n - 1 - j)} espacio(s)`,
    });
    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${show(resultado)}`,
    });

    return pasos;
  },
},

/* ---------- trimStart ---------- */
trimstart: {
  nombre: "trimStart()",
  campos: [
    { k: "texto", label: "Texto (con espacios)", tipo: "text", def: "   Hola Mundo   ", ancho: 240 },
  ],
  codigo: (v) => `const resultado = ${show(v.texto)}.trimStart();`,
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => show(v.texto.trimStart()),
  traza: (v) => {
    const s = v.texto;
    const n = s.length;

    const pasos = [
      {
        tipo: "system",
        msg: `Texto original: ${show(s)} · length = ${n}`,
      },
    ];

    if (n === 0) {
          pasos.push({
            tipo: "error",
            msg: "⚠️ Cadena vacía: no hay nada que recortar",
          });
          pasos.push({ tipo: "result", msg: '⏹ Retorna: ""' });
          return pasos;
        }

        // Detectar cuántos espacios hay al inicio
        let i = 0;
        while (i < n && /\s/.test(s[i])) i++;

        if (i === 0) {
          pasos.push({
            tipo: "iteration",
            msg: "> No hay espacios al inicio: el texto ya está limpio por la izquierda",
          });
          pasos.push({
            tipo: "success",
            msg: "✅ trimStart() no cambia nada",
          });
          pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(s)}` });
          return pasos;
        }

        pasos.push({
          tipo: "iteration",
          msg: `> Detectados ${i} espacio(s) al inicio (índices 0..${i - 1})`,
          marks: Array.from({ length: i }, (_, k) => k),
        });

        for (let k = 0; k < i; k++) {
          const marks = [];
          for (let m = k; m < i; m++) marks.push(m);
          pasos.push({
            tipo: "error",
            msg: `> Recorta [${k}] ${show(s[k])} del inicio`,
            marks,
          });
        }

        const resultado = s.slice(i);

        // Recordatorio visual de lo que NO se ha tocado
        const espacioFinal = n - i > 0 && /\s/.test(s[n - 1]);
        if (espacioFinal) {
          pasos.push({
            tipo: "system",
            msg: `ℹ️ Los espacios del final NO se tocan (esto diferencia trimStart de trim)`,
          });
        }

        pasos.push({
          tipo: "success",
          msg: `✅ Limpieza completada: se eliminaron ${i} espacio(s) del inicio`,
        });
        pasos.push({
          tipo: "result",
          msg: `⏹ Retorna: ${show(resultado)}`,
        });

        return pasos;
      },
    },

    },

    /* ---------- trimEnd ---------- */
trimend: {
  nombre: "trimEnd()",
  campos: [
    { k: "texto", label: "Texto (con espacios)", tipo: "text", def: "   Hola Mundo   ", ancho: 240 },
  ],
  codigo: (v) => `const resultado = ${show(v.texto)}.trimEnd();`,
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => show(v.texto.trimEnd()),
  traza: (v) => {
    const s = v.texto;
    const n = s.length;

    const pasos = [
      {
        tipo: "system",
        msg: `Texto original: ${show(s)} · length = ${n}`,
      },
    ];

    if (n === 0) {
      pasos.push({
        tipo: "error",
        msg: "⚠️ Cadena vacía: no hay nada que recortar",
      });
      pasos.push({ tipo: "result", msg: '⏹ Retorna: ""' });
      return pasos;
    }

    // Detectar cuántos espacios hay al final
    let j = n - 1;
    while (j >= 0 && /\s/.test(s[j])) j--;
    const fin = n - 1 - j; // cantidad de espacios al final

    if (fin === 0) {
      pasos.push({
        tipo: "iteration",
        msg: "> No hay espacios al final: el texto ya está limpio por la derecha",
      });
      pasos.push({
        tipo: "success",
        msg: "✅ trimEnd() no cambia nada",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(s)}` });
      return pasos;
    }

    pasos.push({
      tipo: "iteration",
      msg: `> Detectados ${fin} espacio(s) al final (índices ${j + 1}..${n - 1})`,
      marks: Array.from({ length: fin }, (_, k) => j + 1 + k),
    });

    for (let k = n - 1; k > j; k--) {
      const marks = [];
      for (let m = j + 1; m <= k; m++) marks.push(m);
      pasos.push({
        tipo: "error",
        msg: `> Recorta [${k}] ${show(s[k])} del final`,
        marks,
      });
    }

    const resultado = s.slice(0, j + 1);

    // Recordatorio visual de lo que NO se ha tocado
    const espacioInicio = n > 0 && /\s/.test(s[0]);
    if (espacioInicio) {
      pasos.push({
        tipo: "system",
        msg: `ℹ️ Los espacios del inicio NO se tocan (esto diferencia trimEnd de trim)`,
      });
    }

    pasos.push({
      tipo: "success",
      msg: `✅ Limpieza completada: se eliminaron ${fin} espacio(s) del final`,
    });
    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${show(resultado)}`,
    });

    return pasos;
  },
},
/* ---------- trimLeft (alias de trimStart) ---------- */
trimleft: {
  nombre: "trimLeft()",
  esAlias: "trimstart",
  campos: [
    { k: "texto", label: "Texto (con espacios)", tipo: "text", def: "   Hola Mundo   ", ancho: 240 },
  ],
  codigo: (v) => `const resultado = ${show(v.texto)}.trimLeft(); // alias de trimStart()`,
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => show(v.texto.trimStart()),
  traza: (v) => {
    // Delegamos en la traza de trimStart
    const base = CONFIGS.trimstart.traza(v);
    // Añadimos un aviso al principio
    return [
      {
        tipo: "system",
        msg: 'ℹ️ trimLeft() es un ALIAS de trimStart(): se comporta exactamente igual.',
      },
      ...base,
    ];
  },
},

/* ---------- trimRight (alias de trimEnd) ---------- */
trimright: {
  nombre: "trimRight()",
  esAlias: "trimend",
  campos: [
    { k: "texto", label: "Texto (con espacios)", tipo: "text", def: "   Hola Mundo   ", ancho: 240 },
  ],
  codigo: (v) => `const resultado = ${show(v.texto)}.trimRight(); // alias de trimEnd()`,
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => show(v.texto.trimEnd()),
  traza: (v) => {
    // Delegamos en la traza de trimEnd
    const base = CONFIGS.trimend.traza(v);
    // Añadimos un aviso al principio
    return [
      {
        tipo: "system",
        msg: 'ℹ️ trimRight() es un ALIAS de trimEnd(): se comporta exactamente igual.',
      },
      ...base,
    ];
  },
},
/* ---------- padStart ---------- */
padstart: {
  nombre: "padStart()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "5", ancho: 160 },
    { k: "target", label: "targetLength", tipo: "number", def: "3", ancho: 60 },
    { k: "pad", label: "padString", tipo: "text", def: "0", ancho: 60 },
  ],
  codigo: (v) => {
    const target = Number(v.target) || 0;
    return `const resultado = ${show(v.texto)}.padStart(${target}, ${show(v.pad)});`;
  },
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => {
    try {
      const target = Number(v.target) || 0;
      return show(v.texto.padStart(target, v.pad));
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const target = Math.trunc(Number(v.target));
    const pad = v.pad;

    const pasos = [
      {
        tipo: "system",
        msg: `Texto original: ${show(s)} · length = ${s.length} · targetLength = ${target || "NaN"} · padString = ${show(pad)}`,
      },
    ];

    // Validaciones
    if (!Number.isFinite(target) || Number.isNaN(target)) {
      pasos.push({
        tipo: "error",
        msg: "❌ targetLength inválido: debe ser un número",
      });
      pasos.push({ tipo: "result", msg: "⏹ Lanza: RangeError" });
      return pasos;
    }

    if (pad === "") {
      pasos.push({
        tipo: "iteration",
        msg: "> padString vacío → no hay con qué rellenar: el resultado es la cadena original",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(s)}` });
      return pasos;
    }

    // Caso: ya es más larga
    if (s.length >= target) {
      pasos.push({
        tipo: "iteration",
        msg: `> length actual (${s.length}) ≥ targetLength (${target}) → no se rellena nada`,
      });
      pasos.push({ tipo: "success", msg: "✅ La cadena ya cumple o supera el objetivo" });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(s)}` });
      return pasos;
    }

    // Calcular cuántos caracteres se van a añadir
    const hueco = target - s.length;
    pasos.push({
      tipo: "iteration",
      msg: `> Faltan ${hueco} caracteres para llegar a ${target}`,
    });

    // Construir el relleno (puede repetir y truncarse)
    let relleno = "";
    let i = 0;
    while (relleno.length < hueco) {
      const c = pad[i % pad.length];
      relleno += c;
      i++;
      pasos.push({
        tipo: "success",
        msg: `> Añade ${show(c)} a la izquierda (relleno actual: ${show(relleno)})`,
      });
    }

    // Si el padString era más largo que el hueco, avisamos del truncamiento
    if (pad.length > hueco) {
      pasos.push({
        tipo: "system",
        msg: `ℹ️ El padString ${show(pad)} se truncó: solo caben ${hueco} carácter(es)`,
      });
    }

    const resultado = s.padStart(target, pad);

    pasos.push({
      tipo: "success",
      msg: `✅ Resultado: ${show(resultado)} (length = ${resultado.length})`,
    });
    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${show(resultado)}`,
    });

    return pasos;
  },
},
/* ---------- padEnd ---------- */
padend: {
  nombre: "padEnd()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "Hola", ancho: 160 },
    { k: "target", label: "targetLength", tipo: "number", def: "10", ancho: 60 },
    { k: "pad", label: "padString", tipo: "text", def: ".", ancho: 60 },
  ],
  codigo: (v) => {
    const target = Number(v.target) || 0;
    return `const resultado = ${show(v.texto)}.padEnd(${target}, ${show(v.pad)});`;
  },
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => {
    try {
      const target = Number(v.target) || 0;
      return show(v.texto.padEnd(target, v.pad));
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const target = Math.trunc(Number(v.target));
    const pad = v.pad;

    const pasos = [
      {
        tipo: "system",
        msg: `Texto original: ${show(s)} · length = ${s.length} · targetLength = ${target || "NaN"} · padString = ${show(pad)}`,
      },
    ];

    // Validaciones
    if (!Number.isFinite(target) || Number.isNaN(target)) {
      pasos.push({
        tipo: "error",
        msg: "❌ targetLength inválido: debe ser un número",
      });
      pasos.push({ tipo: "result", msg: "⏹ Lanza: RangeError" });
      return pasos;
    }

    if (pad === "") {
      pasos.push({
        tipo: "iteration",
        msg: "> padString vacío → no hay con qué rellenar: el resultado es la cadena original",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(s)}` });
      return pasos;
    }

    // Caso: ya es más larga
    if (s.length >= target) {
      pasos.push({
        tipo: "iteration",
        msg: `> length actual (${s.length}) ≥ targetLength (${target}) → no se rellena nada`,
      });
      pasos.push({ tipo: "success", msg: "✅ La cadena ya cumple o supera el objetivo" });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(s)}` });
      return pasos;
    }

    // Calcular cuántos caracteres se van a añadir
    const hueco = target - s.length;
    pasos.push({
      tipo: "iteration",
      msg: `> Faltan ${hueco} caracteres para llegar a ${target}`,
    });

    // Construir el relleno (puede repetir y truncarse)
    let relleno = "";
    let i = 0;
    while (relleno.length < hueco) {
      const c = pad[i % pad.length];
      relleno += c;
      i++;
      pasos.push({
        tipo: "success",
        msg: `> Añade ${show(c)} a la derecha (relleno actual: ${show(relleno)})`,
      });
    }

    // Si el padString era más largo que el hueco, avisamos del truncamiento
    if (pad.length > hueco) {
      pasos.push({
        tipo: "system",
        msg: `ℹ️ El padString ${show(pad)} se truncó: solo caben ${hueco} carácter(es)`,
      });
    }

    const resultado = s.padEnd(target, pad);

    pasos.push({
      tipo: "success",
      msg: `✅ Resultado: ${show(resultado)} (length = ${resultado.length})`,
    });
    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${show(resultado)}`,
    });

    return pasos;
  },
},

/* ---------- substring ---------- */
substring: {
  nombre: "substring()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "JavaScript", ancho: 160 },
    { k: "start", label: "indexStart", tipo: "number", def: "0", ancho: 60 },
    { k: "end", label: "indexEnd (opcional)", tipo: "number", def: "4", ancho: 70 },
  ],
  codigo: (v) => {
    const endTxt = v.end.trim();
    const endArg = endTxt === "" ? "" : `, ${Math.trunc(Number(endTxt))}`;
    return `const resultado = ${show(v.texto)}.substring(${Math.trunc(Number(v.start)) || 0}${endArg});`;
  },
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => {
    try {
      const sArg = Math.trunc(Number(v.start)) || 0;
      const eTxt = v.end.trim();
      const eArg = eTxt === "" ? undefined : Math.trunc(Number(eTxt));
      return show(v.texto.substring(sArg, eArg));
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const n = s.length;

    const startRaw = Math.trunc(Number(v.start)) || 0;
    const endTxt = v.end.trim();
    const endRaw = endTxt === "" ? undefined : Math.trunc(Number(endTxt));

    const pasos = [
      {
        tipo: "system",
        msg: `Texto: ${show(s)} · length = ${n} · indexStart = ${startRaw} · indexEnd = ${endRaw === undefined ? "(omitido)" : endRaw}`,
      },
    ];

    if (n === 0) {
      pasos.push({
        tipo: "error",
        msg: "⚠️ Cadena vacía: no hay nada que extraer",
      });
      pasos.push({ tipo: "result", msg: '⏹ Retorna: ""' });
      return pasos;
    }

    // --- Normalizar start con las reglas de substring ---
    // 1) Si es negativo o NaN → 0
    // 2) Si es > length → length
    let startNorm = startRaw;
    if (!Number.isFinite(startNorm) || startNorm < 0) startNorm = 0;
    if (startNorm > n) startNorm = n;
    if (startNorm !== startRaw) {
      pasos.push({
        tipo: "iteration",
        msg: `> indexStart ${startRaw} se normaliza a ${startNorm} (${startRaw < 0 ? "negativo → 0" : "> length → length"})`,
      });
    }

    // --- Normalizar end con las reglas de substring ---
    let endNorm;
    if (endRaw === undefined) {
      endNorm = n;
      pasos.push({
        tipo: "iteration",
        msg: `> indexEnd omitido → se usa length = ${endNorm}`,
      });
    } else {
      endNorm = endRaw;
      if (!Number.isFinite(endNorm) || endNorm < 0) endNorm = 0;
      if (endNorm > n) endNorm = n;
      if (endNorm !== endRaw) {
        pasos.push({
          tipo: "iteration",
          msg: `> indexEnd ${endRaw} se normaliza a ${endNorm} (${endRaw < 0 ? "negativo → 0" : "> length → length"})`,
        });
      }
    }

    // --- Intercambio automático ---
    let a = startNorm;
    let b = endNorm;
    if (a > b) {
      pasos.push({
        tipo: "system",
        msg: `↔️ indexStart (${a}) > indexEnd (${b}): substring() los intercambia automáticamente`,
      });
      [a, b] = [b, a];
    }

    // --- Mostrar el rango incluido ---
    if (b <= a) {
      pasos.push({
        tipo: "error",
        msg: `> Rango vacío (${a}..${b}) → no hay caracteres que extraer`,
      });
      pasos.push({ tipo: "result", msg: '⏹ Retorna: ""' });
      return pasos;
    }

    pasos.push({
      tipo: "iteration",
      msg: `> Se extraen los índices ${a}..${b - 1} (el ${b} se EXCLUYE)`,
      marks: Array.from({ length: b - a }, (_, k) => a + k),
    });

    // Carácter excluido (si existe)
    if (b < n) {
      pasos.push({
        tipo: "error",
        msg: `> El índice ${b} (${show(s[b])}) queda EXCLUIDO`,
        marks: [b],
      });
    }

    const resultado = s.substring(startRaw, endRaw);

    pasos.push({
      tipo: "success",
      msg: `✅ Subcadena extraída: ${show(resultado)} (length = ${resultado.length})`,
    });
    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${show(resultado)}`,
    });

    return pasos;
  },
},

/* ---------- slice ---------- */
slice: {
  nombre: "slice()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "JavaScript", ancho: 160 },
    { k: "start", label: "indexStart", tipo: "number", def: "0", ancho: 60 },
    { k: "end", label: "indexEnd (opcional)", tipo: "number", def: "4", ancho: 70 },
  ],
  codigo: (v) => {
    const endTxt = v.end.trim();
    const endArg = endTxt === "" ? "" : `, ${Math.trunc(Number(endTxt))}`;
    return `const resultado = ${show(v.texto)}.slice(${Math.trunc(Number(v.start)) || 0}${endArg});`;
  },
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => {
    try {
      const sArg = Math.trunc(Number(v.start)) || 0;
      const eTxt = v.end.trim();
      const eArg = eTxt === "" ? undefined : Math.trunc(Number(eTxt));
      return show(v.texto.slice(sArg, eArg));
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const n = s.length;

    const startRaw = Math.trunc(Number(v.start)) || 0;
    const endTxt = v.end.trim();
    const endRaw = endTxt === "" ? undefined : Math.trunc(Number(endTxt));

    const pasos = [
      {
        tipo: "system",
        msg: `Texto: ${show(s)} · length = ${n} · indexStart = ${startRaw} · indexEnd = ${endRaw === undefined ? "(omitido)" : endRaw}`,
      },
    ];

    if (n === 0) {
      pasos.push({
        tipo: "error",
        msg: "⚠️ Cadena vacía: no hay nada que extraer",
      });
      pasos.push({ tipo: "result", msg: '⏹ Retorna: ""' });
      return pasos;
    }

    // --- Normalizar start con las reglas de slice ---
    // Negativo → length + start. Fuera de rango se recorta a [0, length].
    const normSliceIndex = (x) => {
      if (x < 0) return Math.max(n + x, 0);
      return Math.min(x, n);
    };

    const startNorm = normSliceIndex(startRaw);
    if (startNorm !== startRaw) {
      pasos.push({
        tipo: "iteration",
        msg: startRaw < 0
          ? `> indexStart ${startRaw} es negativo → length + (${startRaw}) = ${startNorm}`
          : `> indexStart ${startRaw} > length → se recorta a ${startNorm}`,
      });
    }

    // --- Normalizar end con las reglas de slice ---
    let endNorm;
    if (endRaw === undefined) {
      endNorm = n;
      pasos.push({
        tipo: "iteration",
        msg: `> indexEnd omitido → se usa length = ${endNorm}`,
      });
    } else {
      endNorm = normSliceIndex(endRaw);
      if (endNorm !== endRaw) {
        pasos.push({
          tipo: "iteration",
          msg: endRaw < 0
            ? `> indexEnd ${endRaw} es negativo → length + (${endRaw}) = ${endNorm}`
            : `> indexEnd ${endRaw} > length → se recorta a ${endNorm}`,
        });
      }
    }

    // --- slice NO intercambia: si start >= end devuelve "" ---
    if (startNorm >= endNorm) {
      pasos.push({
        tipo: "error",
        msg: `> indexStart (${startNorm}) ≥ indexEnd (${endNorm}): slice() NO intercambia → devuelve ""`,
      });
      if (startNorm > endNorm) {
        pasos.push({
          tipo: "system",
          msg: "ℹ️ Recuerda: substring() en este caso los intercambiaría. slice() es más predecible.",
        });
      }
      pasos.push({ tipo: "result", msg: '⏹ Retorna: ""' });
      return pasos;
    }

    // --- Mostrar el rango incluido ---
    pasos.push({
      tipo: "iteration",
      msg: `> Se extraen los índices ${startNorm}..${endNorm - 1} (el ${endNorm} se EXCLUYE)`,
      marks: Array.from({ length: endNorm - startNorm }, (_, k) => startNorm + k),
    });

    // Carácter excluido (si existe)
    if (endNorm < n) {
      pasos.push({
        tipo: "error",
        msg: `> El índice ${endNorm} (${show(s[endNorm])}) queda EXCLUIDO`,
        marks: [endNorm],
      });
    }

    const resultado = s.slice(startRaw, endRaw);

    pasos.push({
      tipo: "success",
      msg: `✅ Subcadena extraída: ${show(resultado)} (length = ${resultado.length})`,
    });
    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${show(resultado)}`,
    });

    return pasos;
  },
},

/* ---------- charAt ---------- */
charat: {
  nombre: "charAt()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "JavaScript", ancho: 160 },
    { k: "index", label: "index", tipo: "number", def: "0", ancho: 60 },
  ],
  codigo: (v) => {
    const iTxt = v.index.trim();
    const iArg = iTxt === "" ? "" : Math.trunc(Number(iTxt));
    return `const resultado = ${show(v.texto)}.charAt(${iArg});`;
  },
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => {
    try {
      const iTxt = v.index.trim();
      const iArg = iTxt === "" ? undefined : Math.trunc(Number(iTxt));
      return show(iArg === undefined ? v.texto.charAt() : v.texto.charAt(iArg));
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const n = s.length;

    const iTxt = v.index.trim();
    const indexRaw = iTxt === "" ? undefined : Math.trunc(Number(iTxt));

    const pasos = [
      {
        tipo: "system",
        msg: `Texto: ${show(s)} · length = ${n} · index = ${indexRaw === undefined ? "(omitido → 0)" : indexRaw}`,
      },
    ];

    if (n === 0) {
      pasos.push({
        tipo: "error",
        msg: "⚠️ Cadena vacía: no hay caracteres que leer",
      });
      pasos.push({ tipo: "result", msg: '⏹ Retorna: ""' });
      return pasos;
    }

    const index = indexRaw === undefined ? 0 : indexRaw;

    // Mostrar qué se va a evaluar
    if (indexRaw === undefined) {
      pasos.push({
        tipo: "iteration",
        msg: "> Sin argumento: se usa el índice 0 por defecto",
      });
    }

    // Fuera de rango
    if (index < 0 || index >= n) {
      pasos.push({
        tipo: "error",
        msg: `> El índice ${index} está FUERA de rango (0..${n - 1})`,
      });
      pasos.push({
        tipo: "system",
        msg: `ℹ️ Diferencia clave: "Hola"[${index}] → undefined, pero "Hola".charAt(${index}) → ""`,
      });
      pasos.push({ tipo: "result", msg: '⏹ Retorna: ""' });
      return pasos;
    }

    // Dentro de rango
    const caracter = s.charAt(index);
    pasos.push({
      tipo: "success",
      msg: `> El índice ${index} corresponde al carácter ${show(caracter)}`,
      marks: [index],
    });

    const resultado = s.charAt(index);

    pasos.push({
      tipo: "success",
      msg: `✅ Carácter extraído: ${show(resultado)} (length = ${resultado.length})`,
    });
    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${show(resultado)}`,
    });

    return pasos;
  },
},


/* ---------- split ---------- */
split: {
  nombre: "split()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "JavaScript,Python,PHP,Java", ancho: 260 },
    { k: "sep", label: "separator (texto o regex)", tipo: "regex", def: ",", ancho: 140 },
    { k: "limit", label: "limit (opcional)", tipo: "number", def: "", ancho: 70 },
  ],
  codigo: (v) => {
    const sepTxt = v.sep.trim();
    const sepArg = sepTxt === "" ? '""' : show(sepTxt);
    const limTxt = v.limit.trim();
    const limArg = limTxt === "" ? "" : `, ${Math.trunc(Number(limTxt))}`;
    return `const resultado = ${show(v.texto)}.split(${sepArg}${limArg});`;
  },
  celdas: (v) => {
    try {
      const sepTxt = v.sep.trim();
      const sep = sepTxt === "" ? undefined : sepTxt;
      const limTxt = v.limit.trim();
      const lim = limTxt === "" ? undefined : Math.trunc(Number(limTxt));
      const arr = sep === undefined ? [v.texto] : v.texto.split(sep, lim);
      return { tipo: "array", items: celdasArray(arr) };
    } catch {
      return { tipo: "none", items: [] };
    }
  },
  resultadoFinal: (v) => {
    try {
      const sepTxt = v.sep.trim();
      const sep = sepTxt === "" ? undefined : sepTxt;
      const limTxt = v.limit.trim();
      const lim = limTxt === "" ? undefined : Math.trunc(Number(limTxt));
      const arr = sep === undefined ? [v.texto] : v.texto.split(sep, lim);
      return `[${arr.map((x) => show(x)).join(", ")}]`;
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const sepTxt = v.sep.trim();
    const sep = sepTxt === "" ? undefined : sepTxt;
    const limTxt = v.limit.trim();
    const limRaw = limTxt === "" ? undefined : Math.trunc(Number(limTxt));

    const pasos = [
      {
        tipo: "system",
        msg: `Texto: ${show(s)} · separator = ${sep === undefined ? "(vacío)" : show(sep)} · limit = ${limRaw === undefined ? "(omitido)" : limRaw}`,
      },
    ];

    if (sep === undefined) {
      pasos.push({
        tipo: "iteration",
        msg: "> Separador vacío → el array resultante tiene un único elemento con la cadena completa",
      });
      pasos.push({
        tipo: "result",
        msg: `⏹ Retorna: ${show(s)} → [${show(s)}]`,
      });
      return pasos;
    }

    // Validar limit
    if (limRaw !== undefined && (limRaw < 0 || Number.isNaN(limRaw))) {
      pasos.push({
        tipo: "error",
        msg: `❌ limit inválido (${limRaw}): debe ser un entero ≥ 0`,
      });
      pasos.push({ tipo: "result", msg: "⏹ Lanza: RangeError" });
      return pasos;
    }

    if (limRaw === 0) {
      pasos.push({
        tipo: "iteration",
        msg: "> limit = 0 → el array resultante está vacío",
      });
      pasos.push({ tipo: "result", msg: "⏹ Retorna: []" });
      return pasos;
    }

    // Verificar que el separador sea válido como regex
    if (sep !== undefined) {
      try {
        new RegExp(sep);
      } catch {
        pasos.push({
          tipo: "error",
          msg: `❌ El separator ${show(sep)} no es una expresión regular válida`,
        });
        pasos.push({ tipo: "result", msg: "⏹ Lanza: SyntaxError" });
        return pasos;
      }
    }

    // Ejecutar split real para obtener los trozos
    let partes;
    try {
      partes = s.split(sep, limRaw);
    } catch (e) {
      pasos.push({
        tipo: "error",
        msg: `❌ ${e.name}: ${e.message}`,
      });
      pasos.push({ tipo: "result", msg: "⏹ Lanza: " + e.name });
      return pasos;
    }

    pasos.push({
      tipo: "iteration",
      msg: `> Buscando apariciones de ${show(sep)} en el texto...`,
    });

    // Mostrar cada trozo resultante
    partes.forEach((parte, i) => {
      pasos.push({
        tipo: "success",
        msg: `> Trozo [${i}]: ${show(parte)} (length = ${parte.length})`,
      });
    });

    if (limRaw !== undefined && partes.length === limRaw) {
      pasos.push({
        tipo: "system",
        msg: `ℹ️ Se alcanzó el limit (${limRaw}): el resto del texto no se procesó`,
      });
    }

    pasos.push({
      tipo: "success",
      msg: `✅ División completada: ${partes.length} elemento(s)`,
    });

    // Recordatorio sobre emojis
    if (sep === "" && /[\uD800-\uDFFF]/.test(s)) {
      pasos.push({
        tipo: "error",
        msg: "⚠️ El texto contiene caracteres fuera del BMP (posibles emojis): split('') puede romperlos",
      });
      pasos.push({
        tipo: "system",
        msg: "ℹ️ Alternativa recomendada: [...texto] o Array.from(texto)",
      });
    }

    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: [${partes.map((x) => show(x)).join(", ")}]`,
    });

    return pasos;
  },
},

/* ---------- replace ---------- */
replace: {
  nombre: "replace()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "gato gato gato", ancho: 220 },
    { k: "patron", label: "patrón (texto o regex)", tipo: "regex", def: "gato", ancho: 140 },
    { k: "flags", label: "flags (solo si es regex)", tipo: "text", def: "", ancho: 80 },
    { k: "reemplazo", label: "reemplazo", tipo: "text", def: "perro", ancho: 120 },
  ],
  codigo: (v) => {
    const patronTxt = v.patron.trim();
    const flagsTxt = v.flags.trim();
    const reemplazo = show(v.reemplazo);

    // Si el patrón parece una regex (contiene caracteres especiales o se han puesto flags),
    // lo mostramos como literal /patron/flags. Si no, entre comillas.
    const esRegex = flagsTxt !== "" || /[.*+?^${}()|[\]\\]/.test(patronTxt);

    const patronArg = esRegex
      ? `/${patronTxt}/${flagsTxt}`
      : show(patronTxt);

    return `const resultado = ${show(v.texto)}.replace(${patronArg}, ${reemplazo});`;
  },
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => {
    try {
      const patronTxt = v.patron.trim();
      const flagsTxt = v.flags.trim();
      const esRegex = flagsTxt !== "" || /[.*+?^${}()|[\]\\]/.test(patronTxt);

      let patron;
      if (esRegex) {
        patron = new RegExp(patronTxt, flagsTxt);
      } else {
        patron = patronTxt;
      }

      return show(v.texto.replace(patron, v.reemplazo));
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const patronTxt = v.patron.trim();
    const flagsTxt = v.flags.trim();
    const reemplazo = v.reemplazo;

    const pasos = [
      {
        tipo: "system",
        msg: `Texto: ${show(s)}`,
      },
    ];

    if (patronTxt === "") {
      pasos.push({
        tipo: "error",
        msg: "❌ Patrón vacío: no hay nada que buscar",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(s)}` });
      return pasos;
    }

    // Detectar si es regex o string literal
    const pareceRegex = flagsTxt !== "" || /[.*+?^${}()|[\]\\]/.test(patronTxt);
    let patron;
    let esGlobal = false;

    if (pareceRegex) {
      try {
        patron = new RegExp(patronTxt, flagsTxt);
        esGlobal = flagsTxt.includes("g");
      } catch (e) {
        pasos.push({
          tipo: "error",
          msg: `❌ Regex inválida: ${e.message}`,
        });
        pasos.push({ tipo: "result", msg: "⏹ Lanza: SyntaxError" });
        return pasos;
      }
      pasos.push({
        tipo: "system",
        msg: `Patrón: /${patronTxt}/${flagsTxt}${esGlobal ? "  (flag g activa → reemplazará TODAS)" : "  (sin flag g → solo la PRIMERA)"}`,
      });
    } else {
      patron = patronTxt;
      pasos.push({
        tipo: "system",
        msg: `Patrón: ${show(patronTxt)} (string literal → solo reemplaza la PRIMERA coincidencia)`,
      });
    }

    // Ejecutar el replace real
    let resultado;
    try {
      resultado = s.replace(patron, reemplazo);
    } catch (e) {
      pasos.push({ tipo: "error", msg: `❌ ${e.name}: ${e.message}` });
      pasos.push({ tipo: "result", msg: "⏹ Lanza: " + e.name });
      return pasos;
    }

    if (resultado === s) {
      pasos.push({
        tipo: "error",
        msg: "> No se encontró ninguna coincidencia del patrón",
      });
      pasos.push({
        tipo: "result",
        msg: `⏹ Retorna: ${show(s)}  (sin cambios)`,
      });
      return pasos;
    }

    // Contar cuántas coincidencias se reemplazaron
    const reemplazos = esGlobal
      ? (s.match(patron) || []).length
      : 1;

    pasos.push({
      tipo: "success",
      msg: `> Se reemplazará(án) ${reemplazos} coincidencia(s)`,
    });

    // Mostrar qué partes del texto quedaron fuera y cuáles coinciden
    // Sencillo: dividir el texto en "antes" y "después" del primer reemplazo
    // Para evitar complicaciones con regex compleja, mostramos los caracteres
    // que NO coinciden, y las coincidencias resaltadas.
    const matches = [];
    if (esGlobal) {
      let m;
      const re = new RegExp(patronTxt, flagsTxt);
      while ((m = re.exec(s)) !== null) {
        matches.push({ index: m.index, length: m[0].length, value: m[0] });
        if (m.index === re.lastIndex) re.lastIndex++;
      }
    } else {
      const idx = s.search(patron);
      if (idx !== -1) {
        // Para longitudes usamos un enfoque simple: buscar el primer match
        const re = patron instanceof RegExp ? patron : new RegExp(patron.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
        const m = re.exec(s);
        if (m) matches.push({ index: m.index, length: m[0].length, value: m[0] });
      }
    }

    matches.forEach((match, i) => {
      const marks = Array.from({ length: match.length }, (_, k) => match.index + k);
      pasos.push({
        tipo: "success",
        msg: `> Coincidencia ${i + 1}: ${show(match.value)} (índice ${match.index}) → se reemplaza por ${show(reemplazo)}`,
        marks,
      });
    });

    if (!esGlobal && matches.length === 1) {
      // Avisar que hay más coincidencias no reemplazadas
      const total = (s.match(new RegExp(patronTxt.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g")) || []).length;
      if (total > 1) {
        pasos.push({
          tipo: "system",
          msg: `ℹ️ Había ${total} coincidencias en total, pero solo se reemplazó 1 (sin flag g). Usa /${patronTxt}/g para todas.`,
        });
      }
    }

    pasos.push({
      tipo: "success",
      msg: `✅ Resultado: ${show(resultado)}`,
    });
    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${show(resultado)}`,
    });

    return pasos;
  },
},

/* ---------- replaceAll ---------- */
replaceall: {
  nombre: "replaceAll()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "gato gato gato", ancho: 220 },
    { k: "patron", label: "patrón (texto o regex)", tipo: "regex", def: "gato", ancho: 140 },
    { k: "flags", label: "flags (solo si es regex · obligatorio /g)", tipo: "text", def: "", ancho: 90 },
    { k: "reemplazo", label: "reemplazo", tipo: "text", def: "perro", ancho: 120 },
  ],
  codigo: (v) => {
    const patronTxt = v.patron.trim();
    const flagsTxt = v.flags.trim();
    const reemplazo = show(v.reemplazo);

    const esRegex = flagsTxt !== "" || /[.*+?^${}()|[\]\\]/.test(patronTxt);

    const patronArg = esRegex
      ? `/${patronTxt}/${flagsTxt}`
      : show(patronTxt);

    return `const resultado = ${show(v.texto)}.replaceAll(${patronArg}, ${reemplazo});`;
  },
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => {
    try {
      const patronTxt = v.patron.trim();
      const flagsTxt = v.flags.trim();
      const esRegex = flagsTxt !== "" || /[.*+?^${}()|[\]\\]/.test(patronTxt);

      let patron;
      if (esRegex) {
        if (!flagsTxt.includes("g")) {
          return "⚠️ TypeError: RegExp sin flag /g";
        }
        patron = new RegExp(patronTxt, flagsTxt);
      } else {
        patron = patronTxt;
      }

      return show(v.texto.replaceAll(patron, v.reemplazo));
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const patronTxt = v.patron.trim();
    const flagsTxt = v.flags.trim();
    const reemplazo = v.reemplazo;

    const pasos = [
      {
        tipo: "system",
        msg: `Texto: ${show(s)}`,
      },
    ];

    if (patronTxt === "") {
      pasos.push({
        tipo: "error",
        msg: "❌ Patrón vacío: no hay nada que buscar",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(s)}` });
      return pasos;
    }

    // Detectar si es regex o string literal
    const pareceRegex = flagsTxt !== "" || /[.*+?^${}()|[\]\\]/.test(patronTxt);
    let patron;

    if (pareceRegex) {
      // Validar que tenga /g
      if (!flagsTxt.includes("g")) {
        pasos.push({
          tipo: "error",
          msg: `❌ replaceAll() con RegExp EXIGE la flag /g. Has pasado /${patronTxt}/${flagsTxt}`,
        });
        pasos.push({
          tipo: "result",
          msg: "⏹ Lanza: TypeError: String.prototype.replaceAll called with a non-global RegExp",
        });
        return pasos;
      }
      try {
        patron = new RegExp(patronTxt, flagsTxt);
      } catch (e) {
        pasos.push({
          tipo: "error",
          msg: `❌ Regex inválida: ${e.message}`,
        });
        pasos.push({ tipo: "result", msg: "⏹ Lanza: SyntaxError" });
        return pasos;
      }
      pasos.push({
        tipo: "system",
        msg: `Patrón: /${patronTxt}/${flagsTxt}  (regex con flag g ✓)`,
      });
    } else {
      patron = patronTxt;
      pasos.push({
        tipo: "system",
        msg: `Patrón: ${show(patronTxt)} (string literal → reemplaza TODAS las coincidencias)`,
      });
    }

    // Ejecutar el replaceAll real
    let resultado;
    try {
      resultado = s.replaceAll(patron, reemplazo);
    } catch (e) {
      pasos.push({ tipo: "error", msg: `❌ ${e.name}: ${e.message}` });
      pasos.push({ tipo: "result", msg: "⏹ Lanza: " + e.name });
      return pasos;
    }

    if (resultado === s) {
      pasos.push({
        tipo: "error",
        msg: "> No se encontró ninguna coincidencia del patrón",
      });
      pasos.push({
        tipo: "result",
        msg: `⏹ Retorna: ${show(s)}  (sin cambios)`,
      });
      return pasos;
    }

    // Encontrar todas las coincidencias para resaltarlas
    const matches = [];
    if (pareceRegex) {
      let m;
      const re = new RegExp(patronTxt, flagsTxt);
      while ((m = re.exec(s)) !== null) {
        matches.push({ index: m.index, length: m[0].length, value: m[0] });
        if (m.index === re.lastIndex) re.lastIndex++;
      }
    } else {
      // String literal: buscamos todas las apariciones manualmente
      let start = 0;
      while (true) {
        const idx = s.indexOf(patronTxt, start);
        if (idx === -1) break;
        matches.push({ index: idx, length: patronTxt.length, value: patronTxt });
        start = idx + patronTxt.length;
      }
    }

    pasos.push({
      tipo: "success",
      msg: `> Se reemplazarán TODAS las coincidencias (${matches.length})`,
    });

    matches.forEach((match, i) => {
      const marks = Array.from({ length: match.length }, (_, k) => match.index + k);
      pasos.push({
        tipo: "success",
        msg: `> Coincidencia ${i + 1}: ${show(match.value)} (índice ${match.index}) → se reemplaza por ${show(reemplazo)}`,
        marks,
      });
    });

    pasos.push({
      tipo: "success",
      msg: `✅ Resultado: ${show(resultado)}`,
    });
    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${show(resultado)}`,
    });

    return pasos;
  },
},

/* ---------- includes ---------- */
includes: {
  nombre: "includes()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "Aprendiendo JavaScript", ancho: 220 },
    { k: "buscar", label: "búsqueda", tipo: "text", def: "JavaScript", ancho: 140 },
    { k: "pos", label: "posición inicial", tipo: "number", def: "0", ancho: 80 },
  ],
  codigo: (v) => {
    const pTxt = v.pos.trim();
    const pArg = pTxt === "" || Number(pTxt) === 0 ? "" : `, ${Math.trunc(Number(pTxt))}`;
    return `const r = ${show(v.texto)}.includes(${show(v.buscar)}${pArg});`;
  },
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => {
    try {
      const pTxt = v.pos.trim();
      const pArg = pTxt === "" ? 0 : Math.trunc(Number(pTxt));
      return String(v.texto.includes(v.buscar, pArg));
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const b = v.buscar;
    const posRaw = v.pos.trim() === "" ? 0 : Math.trunc(Number(v.pos));
    const pos = Math.min(Math.max(posRaw, 0), s.length);

    const pasos = [
      {
        tipo: "system",
        msg: `Texto: ${show(s)} · búsqueda: ${show(b)} · desde posición ${pos}`,
      },
    ];

    // Buscado vacío
    if (b === "") {
      pasos.push({
        tipo: "success",
        msg: "✅ La cadena vacía siempre se encuentra",
      });
      pasos.push({ tipo: "result", msg: "⏹ Retorna: true" });
      return pasos;
    }

    // Buscado más largo que el espacio disponible
    if (b.length > s.length - pos) {
      pasos.push({
        tipo: "error",
        msg: `❌ La búsqueda (${b.length} caracteres) es más larga que el espacio disponible (${s.length - pos})`,
      });
      pasos.push({ tipo: "result", msg: "⏹ Retorna: false" });
      return pasos;
    }

    // Ventana deslizante
    for (let inicio = pos; inicio <= s.length - b.length; inicio++) {
      const ventana = s.slice(inicio, inicio + b.length);

      if (ventana === b) {
        const marks = Array.from({ length: b.length }, (_, k) => inicio + k);
        pasos.push({
          tipo: "success",
          msg: `✅ Ventana [${inicio}..${inicio + b.length - 1}] coincide: ${show(ventana)} === ${show(b)}`,
          marks,
        });
        pasos.push({
          tipo: "success",
          msg: `✅ Coincidencia encontrada en el índice ${inicio}`,
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: true" });
        return pasos;
      } else {
        // Solo marcar el primer carácter evaluado para no saturar
        pasos.push({
          tipo: "iteration",
          msg: `> Ventana [${inicio}..${inicio + b.length - 1}]: ${show(ventana)} ≠ ${show(b)} → avanzar`,
          marks: [inicio],
        });
      }
    }

    pasos.push({
      tipo: "error",
      msg: "❌ Se recorrió toda la cadena sin encontrar la búsqueda",
    });
    pasos.push({ tipo: "result", msg: "⏹ Retorna: false" });
    return pasos;
  },
},
/* ---------- indexOf ---------- */
indexof: {
  nombre: "indexOf()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "Me gusta JavaScript", ancho: 220 },
    { k: "buscar", label: "búsqueda", tipo: "text", def: "JavaScript", ancho: 140 },
    { k: "pos", label: "posición inicial", tipo: "number", def: "0", ancho: 80 },
  ],
  codigo: (v) => {
    const pTxt = v.pos.trim();
    const pArg = pTxt === "" || Number(pTxt) === 0 ? "" : `, ${Math.trunc(Number(pTxt))}`;
    return `const pos = ${show(v.texto)}.indexOf(${show(v.buscar)}${pArg});`;
  },
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => {
    try {
      const pTxt = v.pos.trim();
      const pArg = pTxt === "" ? 0 : Math.trunc(Number(pTxt));
      return String(v.texto.indexOf(v.buscar, pArg));
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const b = v.buscar;
    const posRaw = v.pos.trim() === "" ? 0 : Math.trunc(Number(v.pos));
    const pos = Math.min(Math.max(posRaw, 0), s.length);

    const pasos = [
      {
        tipo: "system",
        msg: `Texto: ${show(s)} · búsqueda: ${show(b)} · desde posición ${pos}`,
      },
    ];

    // Buscado vacío
    if (b === "") {
      pasos.push({
        tipo: "success",
        msg: "✅ La cadena vacía se encuentra en la posición de inicio",
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${pos}` });
      return pasos;
    }

    // Buscado más largo que el espacio disponible
    if (b.length > s.length - pos) {
      pasos.push({
        tipo: "error",
        msg: `❌ La búsqueda (${b.length} caracteres) es más larga que el espacio disponible (${s.length - pos})`,
      });
      pasos.push({ tipo: "result", msg: "⏹ Retorna: -1" });
      return pasos;
    }

    // Ventana deslizante
    for (let inicio = pos; inicio <= s.length - b.length; inicio++) {
      const ventana = s.slice(inicio, inicio + b.length);

      if (ventana === b) {
        const marks = Array.from({ length: b.length }, (_, k) => inicio + k);
        pasos.push({
          tipo: "success",
          msg: `✅ Ventana [${inicio}..${inicio + b.length - 1}] coincide: ${show(ventana)} === ${show(b)}`,
          marks,
        });
        pasos.push({
          tipo: "success",
          msg: `✅ Primera coincidencia en el índice ${inicio}`,
        });

        // Didáctico: trampa del 0
        if (inicio === 0) {
          pasos.push({
            tipo: "system",
            msg: "ℹ️ OJO: el resultado es 0 (falsy). `if (pos)` fallaría aquí. Usa `if (pos !== -1)`.",
          });
        }

        pasos.push({ tipo: "result", msg: `⏹ Retorna: ${inicio}` });
        return pasos;
      } else {
        pasos.push({
          tipo: "iteration",
          msg: `> Ventana [${inicio}..${inicio + b.length - 1}]: ${show(ventana)} ≠ ${show(b)} → avanzar`,
          marks: [inicio],
        });
      }
    }

    pasos.push({
      tipo: "error",
      msg: "❌ Se recorrió toda la cadena sin encontrar la búsqueda",
    });
    pasos.push({
      tipo: "system",
      msg: "ℹ️ Se devuelve -1. Recuerda comparar con `!== -1` (nunca uses `if (pos)`).",
    });
    pasos.push({ tipo: "result", msg: "⏹ Retorna: -1" });
    return pasos;
  },
},

/* ---------- search ---------- */
search: {
  nombre: "search()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "Hola mundo, hoy es 17 de agosto", ancho: 280 },
    { k: "patron", label: "regex", tipo: "regex", def: "mundo", ancho: 140 },
    { k: "flags", label: "flags", tipo: "text", def: "", ancho: 60 },
  ],
  codigo: (v) => {
    const pTxt = v.patron.trim();
    const fTxt = v.flags.trim();
    return `const pos = ${show(v.texto)}.search(/${pTxt}/${fTxt});`;
  },
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => {
    try {
      const pTxt = v.patron.trim();
      const fTxt = v.flags.trim();
      const re = new RegExp(pTxt, fTxt);
      return String(v.texto.search(re));
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const pTxt = v.patron.trim();
    const fTxt = v.flags.trim();

    const pasos = [
      {
        tipo: "system",
        msg: `Texto: ${show(s)}`,
      },
    ];

    if (pTxt === "") {
      pasos.push({
        tipo: "system",
        msg: "ℹ️ Patrón vacío → cualquier posición coincide (se devuelve 0)",
      });
      pasos.push({ tipo: "result", msg: "⏹ Retorna: 0" });
      return pasos;
    }

    // Compilar regex (validación)
    let re;
    try {
      re = new RegExp(pTxt, fTxt);
    } catch (e) {
      pasos.push({
        tipo: "error",
        msg: `❌ Regex inválida: ${e.message}`,
      });
      pasos.push({ tipo: "result", msg: "⏹ Lanza: SyntaxError" });
      return pasos;
    }

    pasos.push({
      tipo: "system",
      msg: `Patrón: /${pTxt}/${fTxt}${fTxt.includes("g") ? "  (la flag g se ignora: search() siempre devuelve la primera)" : ""}`,
    });

    // Ejecutar search real
    const pos = s.search(re);

    if (pos === -1) {
      pasos.push({
        tipo: "error",
        msg: "❌ Se recorrió toda la cadena sin encontrar el patrón",
      });
      pasos.push({
        tipo: "result",
        msg: "⏹ Retorna: -1",
      });
      return pasos;
    }

    // Marcar los caracteres del match para visualización
    const m = re.exec(s);
    if (m) {
      const marks = Array.from({ length: m[0].length }, (_, k) => pos + k);
      pasos.push({
        tipo: "success",
        msg: `✅ Primera coincidencia encontrada en el índice ${pos}: ${show(m[0])}`,
        marks,
      });
    } else {
      pasos.push({
        tipo: "success",
        msg: `✅ Primera coincidencia encontrada en el índice ${pos}`,
        marks: [pos],
      });
    }

    if (pos === 0) {
      pasos.push({
        tipo: "system",
        msg: "ℹ️ OJO: el resultado es 0 (falsy). `if (pos)` fallaría aquí. Usa `if (pos !== -1)`.",
      });
    }

    pasos.push({
      tipo: "system",
      msg: `ℹ️ Recuerda: search() devuelve solo la POSICIÓN. Para el TEXTO usa match().`,
    });

    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${pos}`,
    });

    return pasos;
  },
},

/* ---------- match ---------- */
match: {
  nombre: "match()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "Hola 123, tengo 456 y también 789", ancho: 280 },
    { k: "patron", label: "regex", tipo: "regex", def: "\\d+", ancho: 140 },
    { k: "flags", label: "flags", tipo: "text", def: "", ancho: 60 },
  ],
  codigo: (v) => {
    const pTxt = v.patron.trim();
    const fTxt = v.flags.trim();
    return `const resultado = ${show(v.texto)}.match(/${pTxt}/${fTxt});`;
  },
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => {
    try {
      const pTxt = v.patron.trim();
      const fTxt = v.flags.trim();
      const re = new RegExp(pTxt, fTxt);
      const resultado = v.texto.match(re);
      if (resultado === null) return "null";
      return `[${resultado.map((x) => show(x)).join(", ")}]`;
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const pTxt = v.patron.trim();
    const fTxt = v.flags.trim();

    const pasos = [
      {
        tipo: "system",
        msg: `Texto: ${show(s)}`,
      },
    ];

    if (pTxt === "") {
      pasos.push({
        tipo: "system",
        msg: "ℹ️ Patrón vacío: coincide con un string vacío en la posición 0",
      });
      pasos.push({ tipo: "result", msg: '⏹ Retorna: [""]' });
      return pasos;
    }

    // Compilar regex
    let re;
    try {
      re = new RegExp(pTxt, fTxt);
    } catch (e) {
      pasos.push({
        tipo: "error",
        msg: `❌ Regex inválida: ${e.message}`,
      });
      pasos.push({ tipo: "result", msg: "⏹ Lanza: SyntaxError" });
      return pasos;
    }

    const tieneG = fTxt.includes("g");

    pasos.push({
      tipo: "system",
      msg: `Patrón: /${pTxt}/${fTxt}  · ${tieneG ? "flag g activa → devolverá TODAS las coincidencias" : "SIN flag g → devolverá solo la PRIMERA + index/input/grupos"}`,
    });

    // Ejecutar match real
    let resultado;
    try {
      resultado = s.match(re);
    } catch (e) {
      pasos.push({
        tipo: "error",
        msg: `❌ ${e.name}: ${e.message}`,
      });
      pasos.push({ tipo: "result", msg: "⏹ Lanza: " + e.name });
      return pasos;
    }

    // Caso sin coincidencias
    if (resultado === null) {
      pasos.push({
        tipo: "error",
        msg: "❌ No se encontró ninguna coincidencia",
      });
      pasos.push({
        tipo: "system",
        msg: "ℹ️ IMPORTANTE: match() devuelve null, NO un array vacío []. Verifica antes de acceder a .length.",
      });
      pasos.push({ tipo: "result", msg: "⏹ Retorna: null" });
      return pasos;
    }

    // Con flag g: array de strings
    if (tieneG) {
      pasos.push({
        tipo: "success",
        msg: `✅ Encontradas ${resultado.length} coincidencia(s)`,
      });

      // Encontrar todas las posiciones para resaltarlas
      const re2 = new RegExp(pTxt, fTxt);
      let m;
      let i = 0;
      while ((m = re2.exec(s)) !== null) {
        const marks = Array.from({ length: m[0].length }, (_, k) => m.index + k);
        pasos.push({
          tipo: "success",
          msg: `> Coincidencia ${i + 1}: ${show(m[0])} (índice ${m.index})`,
          marks,
        });
        i++;
        if (m.index === re2.lastIndex) re2.lastIndex++;
      }

      pasos.push({
        tipo: "system",
        msg: "ℹ️ Con flag g se pierden index, input y grupos. Para recuperarlos usa matchAll().",
      });

      pasos.push({
        tipo: "result",
        msg: `⏹ Retorna: [${resultado.map((x) => show(x)).join(", ")}]`,
      });
      return pasos;
    }

    // Sin flag g: primera coincidencia + index + input + grupos
    const primera = resultado[0];
    const marks = Array.from({ length: primera.length }, (_, k) => resultado.index + k);

    pasos.push({
      tipo: "success",
      msg: `✅ Primera coincidencia: ${show(primera)}`,
      marks,
    });

    pasos.push({
      tipo: "iteration",
      msg: `> index: ${resultado.index}  (posición de la coincidencia)`,
    });
    pasos.push({
      tipo: "iteration",
      msg: `> input: ${show(s)}  (string original)`,
    });

    if (resultado.groups) {
      pasos.push({
        tipo: "iteration",
        msg: `> groups: ${JSON.stringify(resultado.groups)}  (grupos nombrados)`,
      });
    }

    // Grupos de captura
    if (resultado.length > 1) {
      pasos.push({
        tipo: "system",
        msg: `> Grupos de captura (${resultado.length - 1}):`,
      });
      for (let k = 1; k < resultado.length; k++) {
        pasos.push({
          tipo: "iteration",
          msg: `>> [${k}] ${show(resultado[k])}`,
        });
      }
    }

    // Aviso si hay más coincidencias que no se devolvieron
    const total = (s.match(new RegExp(pTxt, fTxt + "g")) || []).length;
    if (total > 1) {
      pasos.push({
        tipo: "system",
        msg: `ℹ️ Hay ${total} coincidencias en total, pero sin flag g solo se devuelve la primera. Usa /${pTxt}/${fTxt}g para todas.`,
      });
    }

    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: [${resultado.map((x) => show(x)).join(", ")}]`,
    });

    return pasos;
  },
},

/* ---------- matchAll ---------- */
matchall: {
  nombre: "matchAll()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "Juan: 20, Pedro: 25, Ana: 30", ancho: 260 },
    { k: "patron", label: "regex (obligatorio /g)", tipo: "regex", def: "(\\w+):\\s(\\d+)", ancho: 200 },
    { k: "flags", label: "flags (obligatorio incluir g)", tipo: "text", def: "g", ancho: 80 },
  ],
  codigo: (v) => {
    const pTxt = v.patron.trim();
    const fTxt = v.flags.trim();
    return `const iter = ${show(v.texto)}.matchAll(/${pTxt}/${fTxt});`;
  },
  celdas: (v) => celdasChars(v.texto),
  resultadoFinal: (v) => {
    try {
      const pTxt = v.patron.trim();
      const fTxt = v.flags.trim();
      if (!fTxt.includes("g")) return "⚠️ TypeError: RegExp sin flag /g";
      const re = new RegExp(pTxt, fTxt);
      const iter = v.texto.matchAll(re);
      const arr = [...iter];
      if (arr.length === 0) return "[]";
      return `[${arr.length} coincidencia(s)]`;
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const pTxt = v.patron.trim();
    const fTxt = v.flags.trim();

    const pasos = [
      {
        tipo: "system",
        msg: `Texto: ${show(s)}`,
      },
    ];

    if (pTxt === "") {
      pasos.push({
        tipo: "error",
        msg: "❌ Patrón vacío: no hay nada que buscar",
      });
      pasos.push({ tipo: "result", msg: "⏹ Retorna: un iterador vacío" });
      return pasos;
    }

    // Validar /g
    if (!fTxt.includes("g")) {
      pasos.push({
        tipo: "error",
        msg: `❌ matchAll() REQUIERE la flag g. Has pasado /${pTxt}/${fTxt}`,
      });
      pasos.push({
        tipo: "result",
        msg: "⏹ Lanza: TypeError: String.prototype.matchAll called with a non-global RegExp",
      });
      return pasos;
    }

    // Compilar regex
    let re;
    try {
      re = new RegExp(pTxt, fTxt);
    } catch (e) {
      pasos.push({
        tipo: "error",
        msg: `❌ Regex inválida: ${e.message}`,
      });
      pasos.push({ tipo: "result", msg: "⏹ Lanza: SyntaxError" });
      return pasos;
    }

    pasos.push({
      tipo: "system",
      msg: `Patrón: /${pTxt}/${fTxt}  (flag g ✓ · devolverá un iterador)`,
    });

    // Consumir el iterador paso a paso
    const iter = s.matchAll(re);
    let coincidencias = 0;

    for (const m of iter) {
      coincidencias++;
      const marks = Array.from({ length: m[0].length }, (_, k) => m.index + k);

      pasos.push({
        tipo: "success",
        msg: `> Coincidencia ${coincidencias}: ${show(m[0])} (índice ${m.index})`,
        marks,
      });

      if (m.length > 1) {
        pasos.push({
          tipo: "iteration",
          msg: `>> Grupos capturados (${m.length - 1}):`,
        });
        for (let k = 1; k < m.length; k++) {
          pasos.push({
            tipo: "iteration",
            msg: `>>> [${k}] ${show(m[k])}`,
          });
        }
      }

      if (m.groups) {
        pasos.push({
          tipo: "iteration",
          msg: `>> groups: ${JSON.stringify(m.groups)}`,
        });
      }
    }

    if (coincidencias === 0) {
      pasos.push({
        tipo: "error",
        msg: "❌ No se encontró ninguna coincidencia",
      });
      pasos.push({
        tipo: "result",
        msg: "⏹ Retorna: un iterador vacío",
      });
      return pasos;
    }

    pasos.push({
      tipo: "success",
      msg: `✅ Total: ${coincidencias} coincidencia(s) encontradas`,
    });

    pasos.push({
      tipo: "system",
      msg: "ℹ️ El iterador ya está agotado. Para recorrer de nuevo, vuelve a llamar a matchAll().",
    });

    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: un iterador con ${coincidencias} coincidencia(s)`,
    });

    return pasos;
  },
},
/* ---------- localeCompare ---------- */
localecompare: {
  nombre: "localeCompare()",
  campos: [
    { k: "a", label: "cadena A", tipo: "text", def: "ñandú", ancho: 140 },
    { k: "b", label: "cadena B", tipo: "text", def: "nube", ancho: 140 },
    { k: "locale", label: "locale", tipo: "text", def: "es", ancho: 80 },
    { k: "numeric", label: "numeric: true", tipo: "check", def: false },
  ],
  codigo: (v) => {
    const locTxt = v.locale.trim();
    const locArg = locTxt === "" ? "" : `, ${show(locTxt)}`;
    const optsArg = v.numeric ? `, { numeric: true }` : "";
    return `const resultado = ${show(v.a)}.localeCompare(${show(v.b)}${locArg}${optsArg});`;
  },
  celdas: () => ({ tipo: "none", items: [] }),
  resultadoFinal: (v) => {
    try {
      const locTxt = v.locale.trim();
      const opts = v.numeric ? { numeric: true } : undefined;
      const result = locTxt
        ? v.a.localeCompare(v.b, locTxt, opts)
        : v.a.localeCompare(v.b, undefined, opts);
      return String(result);
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const a = v.a;
    const b = v.b;
    const locTxt = v.locale.trim();
    const opts = v.numeric ? { numeric: true } : undefined;

    const pasos = [
      {
        tipo: "system",
        msg: `Comparando: A = ${show(a)}  vs  B = ${show(b)}${locTxt ? ` · locale = "${locTxt}"` : " · locale = (por defecto)"}${v.numeric ? " · numeric: true" : ""}`,
      },
    ];

    // Validar locale
    if (locTxt) {
      try {
        new Intl.Locale(locTxt);
      } catch {
        pasos.push({
          tipo: "error",
          msg: `❌ Locale inválido: "${locTxt}". Debe ser una etiqueta BCP 47 (ej. "es", "en-US", "tr").`,
        });
        pasos.push({ tipo: "result", msg: "⏹ Lanza: RangeError" });
        return pasos;
      }
    }

    // Comparar
    let result;
    try {
      result = locTxt
        ? a.localeCompare(b, locTxt, opts)
        : a.localeCompare(b, undefined, opts);
    } catch (e) {
      pasos.push({
        tipo: "error",
        msg: `❌ ${e.name}: ${e.message}`,
      });
      pasos.push({ tipo: "result", msg: "⏹ Lanza: " + e.name });
      return pasos;
    }

    pasos.push({
      tipo: "iteration",
      msg: `> localeCompare() devuelve: ${result}`,
    });

    // Traducir a lenguaje humano
    if (result < 0) {
      pasos.push({
        tipo: "success",
        msg: `✅ A va ANTES que B en el orden alfabético${locTxt ? ` del locale "${locTxt}"` : ""}`,
      });
    } else if (result > 0) {
      pasos.push({
        tipo: "success",
        msg: `✅ A va DESPUÉS que B en el orden alfabético${locTxt ? ` del locale "${locTxt}"` : ""}`,
      });
    } else {
      pasos.push({
        tipo: "success",
        msg: `✅ A y B se consideran IGUALES en el orden alfabético${locTxt ? ` del locale "${locTxt}"` : ""}`,
      });
    }

    // Aviso sobre el valor exacto
    if (result !== -1 && result !== 0 && result !== 1) {
      pasos.push({
        tipo: "system",
        msg: `ℹ️ El resultado no es exactamente -1/0/1: la especificación permite cualquier entero. Por eso se compara con < 0, === 0, > 0.`,
      });
    }

    // Ejemplo del patrón recomendado
    pasos.push({
      tipo: "system",
      msg: `ℹ️ Patrón recomendado: if (result < 0) { /* A antes */ } else if (result > 0) { /* A después */ } else { /* iguales */ }`,
    });

    // Mostrar cuál sería el resultado con sort() si hubiera array
    const orden = result <= 0 ? `[${show(a)}, ${show(b)}]` : `[${show(b)}, ${show(a)}]`;
    pasos.push({
      tipo: "iteration",
      msg: `> Si los ordenaras con .sort((x, y) => x.localeCompare(y${locTxt ? `, ${show(locTxt)}` : ""})): ${orden}`,
    });

    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${result}`,
    });

    return pasos;
  },
},

/* ---------- codePointAt ---------- */
codepointat: {
  nombre: "codePointAt()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "A😀B", ancho: 110 },
    { k: "indice", label: "Índice", tipo: "number", def: "1", ancho: 60 },
  ],
  codigo: (v) => `const cp = ${show(v.texto)}.codePointAt(${v.indice});`,
  celdas: (v) => celdasUnidades(v.texto),
  resultadoFinal: (v) => {
    try {
      const i = Math.trunc(Number(v.indice)) || 0;
      return String(v.texto.codePointAt(i));
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const i = Math.trunc(Number(v.indice)) || 0;

    const pasos = [
      {
        tipo: "system",
        msg: `Texto ${show(s)} · length = ${s.length} (unidades UTF-16)`,
      },
    ];

    // Fuera de rango
    if (i < 0 || i >= s.length) {
      pasos.push({
        tipo: "error",
        msg: `❌ Índice ${i} fuera de rango (0 a ${s.length - 1}).`,
      });
      pasos.push({ tipo: "result", msg: "⏹ Retorna: undefined" });
      return pasos;
    }

    const c = s.charCodeAt(i);
    pasos.push({
      tipo: "iteration",
      msg: `> Unidad en [${i}]: ${hex(c)} (${c})`,
      marks: [i],
    });

    // Caso: es surrogate alto y el siguiente es surrogate bajo
    if (isHi(c) && i + 1 < s.length && isLo(s.charCodeAt(i + 1))) {
      const lo = s.charCodeAt(i + 1);
      const cp = s.codePointAt(i);
      pasos.push({
        tipo: "iteration",
        msg: `> [${i}] es surrogate alto y [${i + 1}] es surrogate bajo → par sustituto`,
        marks: [i, i + 1],
      });
      pasos.push({
        tipo: "success",
        msg: `✅ Combina: (${c} - 0xD800) × 0x400 + (${lo} - 0xDC00) + 0x10000 = ${cp}`,
        marks: [i, i + 1],
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${cp} (${hex(cp)})` });
    } else if (isSur(c)) {
      // Caso: surrogate suelto (no tiene pareja)
      pasos.push({
        tipo: "error",
        msg: "⚠️ Es una mitad de par (o un surrogate suelto): devuelve la unidad tal cual",
        marks: [i],
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${c}` });
    } else {
      // Caso: carácter del BMP
      pasos.push({
        tipo: "success",
        msg: "✅ Carácter del BMP: el code point es igual a la unidad",
        marks: [i],
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${c} (${hex(c)})` });
    }

    return pasos;
  },
},

/* ---------- normalize ---------- */
normalize: {
  nombre: "normalize()",
  campos: [
    { k: "texto", label: "Texto", tipo: "text", def: "café", ancho: 140 },
    { k: "form", label: "forma (NFC/NFD/NFKC/NFKD)", tipo: "text", def: "NFC", ancho: 80 },
  ],
  codigo: (v) => {
    const formTxt = v.form.trim().toUpperCase();
    const formArg = formTxt === "" ? "" : `, ${show(formTxt)}`;
    return `const resultado = ${show(v.texto)}.normalize(${formArg.trim()});`;
  },
  celdas: () => ({ tipo: "none", items: [] }),
  resultadoFinal: (v) => {
    try {
      const formTxt = v.form.trim().toUpperCase();
      const formArg = formTxt === "" ? undefined : formTxt;
      const res = formArg ? v.texto.normalize(formArg) : v.texto.normalize();
      return show(res);
    } catch (e) {
      return `⚠️ ${e.name}: ${e.message}`;
    }
  },
  traza: (v) => {
    const s = v.texto;
    const formRaw = v.form.trim().toUpperCase();
    const formArg = formRaw === "" ? "NFC" : formRaw;

    const pasos = [
      {
        tipo: "system",
        msg: `Texto original: ${show(s)} · forma solicitada: ${formArg}`,
      },
    ];

    // Validar la forma
    const FORMAS_VALIDAS = ["NFC", "NFD", "NFKC", "NFKD"];
    if (!FORMAS_VALIDAS.includes(formArg)) {
      pasos.push({
        tipo: "error",
        msg: `❌ Forma inválida: "${formRaw}". Debe ser NFC, NFD, NFKC o NFKD.`,
      });
      pasos.push({
        tipo: "result",
        msg: "⏹ Lanza: RangeError: The normalization form should be one of NFC, NFD, NFKC, NFKD.",
      });
      return pasos;
    }

    // Comparar antes y después
    let resultado;
    try {
      resultado = s.normalize(formArg);
    } catch (e) {
      pasos.push({ tipo: "error", msg: `❌ ${e.name}: ${e.message}` });
      pasos.push({ tipo: "result", msg: "⏹ Lanza: " + e.name });
      return pasos;
    }

    // Mostrar unidades UTF-16 del original
    const originalUnits = [];
    for (let i = 0; i < s.length; i++) {
      const c = s.charCodeAt(i);
      originalUnits.push(`U+${c.toString(16).toUpperCase().padStart(4, "0")}`);
    }
    pasos.push({
      tipo: "system",
      msg: `Original (${s.length} unidad(es) UTF-16): ${originalUnits.join(" ")}`,
    });

    // Mostrar unidades UTF-16 del resultado
    const resultUnits = [];
    for (let i = 0; i < resultado.length; i++) {
      const c = resultado.charCodeAt(i);
      resultUnits.push(`U+${c.toString(16).toUpperCase().padStart(4, "0")}`);
    }
    pasos.push({
      tipo: "system",
      msg: `Normalizado (${resultado.length} unidad(es) UTF-16): ${resultUnits.join(" ")}`,
    });

    // Explicar el efecto según la forma
    const explicacion = {
      NFC: "Composición Canónica: los caracteres base + combinaciones se combinan en un solo carácter siempre que sea posible.",
      NFD: "Descomposición Canónica: los caracteres compuestos se descomponen en base + diacrítico(s). Útil para eliminar tildes.",
      NFKC: "Composición de Compatibilidad: además de componer, normaliza formas de compatibilidad (ligaduras como 'ﬁ' → 'fi').",
      NFKD: "Descomposición de Compatibilidad: descompone todo y también aplica compatibilidad. La forma más agresiva.",
    }[formArg];

    pasos.push({
      tipo: "iteration",
      msg: `> ${formArg}: ${explicacion}`,
    });

    // ¿Cambió?
    if (resultado === s) {
      pasos.push({
        tipo: "success",
        msg: "✅ El texto ya estaba en la forma canónica solicitada: el resultado es idéntico",
      });
    } else {
      pasos.push({
        tipo: "success",
        msg: `✅ Normalización aplicada: ${show(s)} → ${show(resultado)}`,
      });
      if (s.length !== resultado.length) {
        pasos.push({
          tipo: "iteration",
          msg: `> El length cambió: ${s.length} → ${resultado.length} unidades UTF-16`,
        });
      }
    }

    // Aviso: comparar dos formas
    pasos.push({
      tipo: "system",
      msg: `ℹ️ Recuerda: "café" (NFC) !== "cafe\\u0301" (NFD) con ===, pero ambos .normalize('NFC') son iguales.`,
    });

    pasos.push({
      tipo: "result",
      msg: `⏹ Retorna: ${show(resultado)}`,
    });

    return pasos;
  },
},



};

export default function SimuladorString({ metodoId }) {
  const config = CONFIGS[metodoId];

  const [vals, setVals] = useState(() =>
    Object.fromEntries(config.campos.map((c) => [c.k, c.def])),
  );
  const [paso, setPaso] = useState(0);
  const [playing, setPlaying] = useState(false);

  const traza = useMemo(() => {
    try {
      return config.traza(vals);
    } catch (e) {
      return [{ tipo: "error", msg: "❌ " + e.message }];
    }
  }, [config, vals]);

  const celdasRaw = useMemo(() => {
    try { return config.celdas ? config.celdas(vals) : { tipo: "none", items: [] } }
    catch { return { tipo: "none", items: [] } }
  }, [config, vals]);

  const celdas = useMemo(() => normalizarCeldas(celdasRaw), [celdasRaw]);

  const resultadoFinal = useMemo(() => {
    if (!config.resultadoFinal) return null;
    try { return config.resultadoFinal(vals) } catch { return null }
  }, [config, vals]);

  useEffect(() => {
    if (!playing) return;
    if (paso >= traza.length) { setPlaying(false); return }
    const t = setTimeout(() => setPaso((p) => p + 1), 900);
    return () => clearTimeout(t);
  }, [playing, paso, traza.length]);

  const reset = () => { setPlaying(false); setPaso(0) };
  const avanzar = () => setPaso((p) => Math.min(p + 1, traza.length));
  const toggleEjecutar = () => {
    if (playing) setPlaying(false);
    else { if (paso === 0) avanzar(); setPlaying(true) }
  };
  const cambiar = (k, valor) => {
    setVals((prev) => ({ ...prev, [k]: valor }));
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
      c += ultimaMarca.tipo === "success" ? " is-found"
         : ultimaMarca.tipo === "error"   ? " is-failed"
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
        <h3>🔍 Simulador Interactivo: <code>{config.nombre}</code></h3>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">
          {config.nombre} · cambia los valores y pulsa Ejecutar
        </div>

        <div style={{ marginBottom: "16px" }}>
          <CodeBlock code={config.codigo(vals)} />
        </div>

        <div className="sim-controls" style={{ flexWrap: "wrap", alignItems: "center" }}>
          {config.campos.map((c) => {
            if (c.tipo === "check") {
              return (
                <label key={c.k} className="sim-field-label">
                  <input
                    type="checkbox"
                    checked={Boolean(vals[c.k])}
                    onChange={(e) => cambiar(c.k, e.target.checked)}
                    disabled={playing}
                  />
                  {c.label}
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
                {c.tipo === "regex" && compilarRegex(vals[c.k]) === null && (
                  <span className="sim-regex-error">regex inválida</span>
                )}
              </label>
            );
          })}
          <button onClick={toggleEjecutar} className="sim-btn primary" disabled={terminado}>
            {playing ? "⏸ Pausar" : "▶ Ejecutar"}
          </button>
          <button onClick={avanzar} className="sim-btn" disabled={playing || terminado}>
            ⏭ Paso
          </button>
          <button onClick={reset} className="sim-btn">🔄 Reset</button>
        </div>
      </div>

      {celdas.tipo !== "none" && celdas.items.length > 0 && (
        <div className="sim-array-container" style={{ flexDirection: "row", flexWrap: "wrap" }}>
          {celdas.items.map((celda, i) => (
            <div key={i} className={claseCelda(i)}>
              <div className="box-inner" style={{ flexDirection: "column", gap: "2px", minWidth: "56px", alignItems: "center" }}>
                <span className="box-index">[{i}]</span>
                <span className="box-data">{celda.main}</span>
                {celda.sub && (
                  <span className="box-index" style={{ fontSize: "10px" }}>{celda.sub}</span>
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
        <div className="sim-console-header">Terminal</div>
        <div className="sim-console-body">
          {logs.length === 0 && <span className="log-system">Esperando ejecución...</span>}
          {logs.map((log, i) => (
            <div key={i} className={`log-${log.tipo}`}>{log.msg}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

