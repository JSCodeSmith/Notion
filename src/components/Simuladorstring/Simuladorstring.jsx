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

