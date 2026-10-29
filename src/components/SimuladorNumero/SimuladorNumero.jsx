import { useEffect, useMemo, useState } from "react";
import CodeBlock from "../CodeBlock/CodeBlock";
import "../SimuladorFind/SimuladorFind.css";
import "../Simuladorstring/SimuladorString.css";

/* ======================================================================
   Utilidades
   ====================================================================== */
const show = (v) => {
  if (v === undefined) return "undefined";
  if (typeof v === "string") return JSON.stringify(v);
  if (typeof v === "number") {
    if (Number.isNaN(v)) return "NaN";
    if (v === Infinity) return "Infinity";
    if (v === -Infinity) return "-Infinity";
    if (Object.is(v, -0)) return "-0";
    return String(v);
  }
  if (typeof v === "bigint") return `${v}n`;
  if (Array.isArray(v)) return `[${v.map(show).join(", ")}]`;
  if (v && typeof v === "object") {
    try {
      return JSON.stringify(v);
    } catch {
      return String(v);
    }
  }
  return String(v);
};

const tipoDe = (v) => {
  if (v === null) return "object (null)";
  if (Array.isArray(v)) return "object (array)";
  return typeof v;
};

/* Convierte lo que escribe el usuario en un valor real de JS. */
function parseEntrada(texto) {
  const s = String(texto ?? "").trim();
  if (s === "") return "";
  if (s === "NaN") return NaN;
  if (s === "Infinity") return Infinity;
  if (s === "-Infinity") return -Infinity;
  if (s === "true") return true;
  if (s === "false") return false;
  if (s === "null") return null;
  if (s === "undefined") return undefined;
  if (/^(["'`]).*\1$/.test(s)) return s.slice(1, -1);
  if (/^-?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(s)) return Number(s);
  if (s.startsWith("[") && s.endsWith("]")) {
    const dentro = s.slice(1, -1).trim();
    return dentro === "" ? [] : dentro.split(",").map((x) => parseEntrada(x));
  }
  if (s === "{}" || (s.startsWith("{") && s.endsWith("}"))) return {};
  return s;
}

const MAX_SAFE = Number.MAX_SAFE_INTEGER;
const DIGITOS = "0123456789abcdefghijklmnopqrstuvwxyz";
const valorDigito = (ch) => DIGITOS.indexOf(String(ch).toLowerCase());

/* Devuelve el texto tal cual si ya es una expresión JS válida;
   si no, lo entrecomilla para que el código mostrado sea coherente. */
function exprEntrada(raw) {
  const s = String(raw ?? "").trim();
  if (s === "") return "undefined";
  if (/^-?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$/.test(s)) return s;
  if (
    ["NaN", "Infinity", "-Infinity", "true", "false", "null", "undefined"].includes(
      s,
    )
  )
    return s;
  if (/^(["'`]).*\1$/.test(s)) return s;
  if (s.startsWith("[") && s.endsWith("]")) return s;
  if (s.startsWith("{") && s.endsWith("}")) return s;
  return JSON.stringify(s);
}

/* ======================================================================
   Configuración por método
   ====================================================================== */
const CONFIGS = {
  /* ------------------------- Number.isFinite() ------------------------- */
  isfinite: {
    nombre: "Number.isFinite()",
    descripcion:
      "Método ESTÁTICO · ¿es un número finito? (no Infinity, -Infinity ni NaN) · no convierte tipos",
    campos: [
      {
        k: "valor",
        label: "valor a evaluar",
        tipo: "text",
        def: "42",
        ancho: 230,
      },
    ],
    codigo: (v) => `const resultado = Number.isFinite(${exprEntrada(v.valor)});`,
    celdas: (v) => {
      const x = parseEntrada(v.valor);
      let global;
      try {
        global = String(isFinite(x));
      } catch (e) {
        global = e.name;
      }
      return {
        tipo: "tokens",
        items: [
          { main: show(x), sub: "valor" },
          { main: tipoDe(x), sub: "typeof" },
          { main: global, sub: "isFinite() global" },
          { main: String(Number.isFinite(x)), sub: "Number.isFinite()" },
        ],
      };
    },
    resultadoFinal: (v) => String(Number.isFinite(parseEntrada(v.valor))),
    traza: (v) => {
      const x = parseEntrada(v.valor);
      const t = typeof x;
      const res = Number.isFinite(x);
      let global;
      try {
        global = isFinite(x);
      } catch (e) {
        global = e.name;
      }

      const razon = res
        ? "es un número finito ✅"
        : t !== "number"
          ? "no es de tipo number: no se convierte, devuelve false"
          : Number.isNaN(x)
            ? "NaN no es un número finito"
            : "Infinity / -Infinity no son números finitos";

      const pasos = [
        {
          tipo: "system",
          msg: `Valor: ${show(x)} · typeof → "${t}"`,
        },
        {
          tipo: "iteration",
          marks: [1],
          msg:
            t === "number"
              ? 'El tipo es "number": ahora solo falta comprobar que no sea Infinity, -Infinity ni NaN'
              : `El tipo es "${t}", no "number": Number.isFinite() no convierte y devolverá false`,
        },
        {
          tipo: global === res ? "iteration" : "error",
          marks: [2],
          msg: `isFinite() global → ${global}${
            global === res
              ? " (coincide en este caso)"
              : " ⚠️ la versión global convierte el valor a número antes de evaluar"
          }`,
        },
        {
          tipo: res ? "success" : "error",
          marks: [3],
          msg: `Number.isFinite(${show(x)}) → ${res}: ${razon}`,
        },
        { tipo: "result", msg: `⏹ Retorna: ${res}` },
      ];
      return pasos;
    },
  },

  /* -------------------------- Number.isNaN() --------------------------- */
  isnan: {
    nombre: "Number.isNaN()",
    descripcion:
      "Método ESTÁTICO · ¿el valor es exactamente NaN? · no convierte tipos",
    campos: [
      {
        k: "valor",
        label: "valor a evaluar (prueba NaN, '100', 'Hola'...)",
        tipo: "text",
        def: "NaN",
        ancho: 230,
      },
    ],
    codigo: (v) => `const resultado = Number.isNaN(${exprEntrada(v.valor)});`,
    celdas: (v) => {
      const x = parseEntrada(v.valor);
      let global;
      try {
        global = String(isNaN(x));
      } catch (e) {
        global = e.name;
      }
      return {
        tipo: "tokens",
        items: [
          { main: show(x), sub: "valor" },
          { main: tipoDe(x), sub: "typeof" },
          { main: String(x !== x), sub: "valor !== valor" },
          { main: global, sub: "isNaN() global" },
          { main: String(Number.isNaN(x)), sub: "Number.isNaN()" },
        ],
      };
    },
    resultadoFinal: (v) => String(Number.isNaN(parseEntrada(v.valor))),
    traza: (v) => {
      const x = parseEntrada(v.valor);
      const t = typeof x;
      const res = Number.isNaN(x);
      let global;
      try {
        global = isNaN(x);
      } catch (e) {
        global = e.name;
      }

      const razon = res
        ? "el valor es exactamente NaN"
        : t !== "number"
          ? `es un ${t}, no NaN: Number.isNaN() no convierte`
          : "es un número válido (no NaN)";

      const pasos = [
        { tipo: "system", msg: `Valor: ${show(x)} · typeof → "${t}"` },
        {
          tipo: "iteration",
          marks: [1],
          msg: `El tipo es "${t}". Number.isNaN() no convierte: solo devuelve true si el valor ES NaN`,
        },
        {
          tipo: x !== x ? "success" : "iteration",
          marks: [2],
          msg: `Comparación consigo mismo: ${show(x)} !== ${show(x)} → ${x !== x}${
            x !== x ? " (¡NaN es el único valor distinto de sí mismo!)" : ""
          }`,
        },
        {
          tipo: global === res ? "iteration" : "error",
          marks: [3],
          msg: `isNaN() global → ${global}${
            global === res
              ? " (coincide aquí)"
              : ' ⚠️ la versión global convierte primero a número: isNaN("Hola") es true'
          }`,
        },
        {
          tipo: res ? "success" : "error",
          marks: [4],
          msg: `Number.isNaN(${show(x)}) → ${res}: ${razon}`,
        },
        { tipo: "result", msg: `⏹ Retorna: ${res}` },
      ];
      return pasos;
    },
  },

  /* ------------------------ Number.isInteger() ------------------------- */
  isinteger: {
    nombre: "Number.isInteger()",
    descripcion:
      "Método ESTÁTICO · ¿es un número entero? · no convierte tipos",
    campos: [
      {
        k: "valor",
        label: "valor a evaluar (prueba 10, 10.5, '10', 10.0...)",
        tipo: "text",
        def: "10",
        ancho: 230,
      },
    ],
    codigo: (v) => `const resultado = Number.isInteger(${exprEntrada(v.valor)});`,
    celdas: (v) => {
      const x = parseEntrada(v.valor);
      const esNum = typeof x === "number";
      const mod = esNum ? String(x % 1) : "—";
      return {
        tipo: "tokens",
        items: [
          { main: show(x), sub: "valor" },
          { main: tipoDe(x), sub: "typeof" },
          { main: mod, sub: "valor % 1" },
          { main: String(Number.isInteger(x)), sub: "Number.isInteger()" },
        ],
      };
    },
    resultadoFinal: (v) => String(Number.isInteger(parseEntrada(v.valor))),
    traza: (v) => {
      const x = parseEntrada(v.valor);
      const t = typeof x;
      const esNum = t === "number";
      const res = Number.isInteger(x);
      const mod = esNum ? x % 1 : null;

      const razon = res
        ? "es de tipo number y no tiene parte decimal"
        : !esNum
          ? `es de tipo "${t}", no "number": no se convierte`
          : Number.isNaN(x)
            ? "NaN no es un entero"
            : !Number.isFinite(x)
              ? "Infinity / -Infinity no son enteros"
              : "tiene parte decimal";

      const pasos = [
        { tipo: "system", msg: `Valor: ${show(x)} · typeof → "${t}"` },
        {
          tipo: "iteration",
          marks: [1],
          msg: esNum
            ? 'El tipo es "number": pasa la primera comprobación'
            : `El tipo es "${t}", no "number": Number.isInteger() devolverá false sin convertir`,
        },
      ];

      if (esNum) {
        pasos.push({
          tipo: mod === 0 ? "success" : "error",
          marks: [2],
          msg: Number.isFinite(x)
            ? `valor % 1 = ${mod} → ${mod === 0 ? "no hay parte decimal ✅" : "hay parte decimal ❌"}`
            : `valor % 1 = ${mod} → no es un entero válido ❌`,
        });
      }

      pasos.push({
        tipo: res ? "success" : "error",
        marks: [3],
        msg: `Number.isInteger(${show(x)}) → ${res}: ${razon}`,
      });

      if (String(v.valor).includes(".") && res) {
        pasos.push({
          tipo: "iteration",
          msg: `Recuerda: ${String(v.valor).trim()} y ${show(x)} son exactamente el mismo valor (los ceros decimales no cuentan)`,
        });
      }

      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${res}` });
      return pasos;
    },
  },

  /* ---------------------- Number.isSafeInteger() ----------------------- */
  issafeinteger: {
    nombre: "Number.isSafeInteger()",
    descripcion:
      "Método ESTÁTICO · ¿es un entero dentro del rango seguro ±(2^53 - 1)?",
    campos: [
      {
        k: "valor",
        label: "valor a evaluar (prueba 42, 42.5, 9007199254740992...)",
        tipo: "text",
        def: "9007199254740991",
        ancho: 250,
      },
    ],
    codigo: (v) =>
      `const resultado = Number.isSafeInteger(${exprEntrada(v.valor)});`,
    celdas: (v) => {
      const x = parseEntrada(v.valor);
      const esNum = typeof x === "number";
      const entero = Number.isInteger(x);
      const rango = esNum && entero ? Math.abs(x) <= MAX_SAFE : false;
      return {
        tipo: "tokens",
        items: [
          { main: show(x), sub: "valor" },
          { main: tipoDe(x), sub: "typeof" },
          { main: String(entero), sub: "Number.isInteger()" },
          {
            main: esNum && entero ? String(rango) : "—",
            sub: "|valor| ≤ 2^53 - 1",
          },
          { main: String(Number.isSafeInteger(x)), sub: "Number.isSafeInteger()" },
        ],
      };
    },
    resultadoFinal: (v) =>
      String(Number.isSafeInteger(parseEntrada(v.valor))),
    traza: (v) => {
      const x = parseEntrada(v.valor);
      const t = typeof x;
      const esNum = t === "number";
      const entero = Number.isInteger(x);
      const dentro = esNum && entero ? Math.abs(x) <= MAX_SAFE : false;
      const res = Number.isSafeInteger(x);

      const razon = res
        ? "es un entero y está dentro del rango seguro"
        : !esNum
          ? `es de tipo "${t}", no "number": no se convierte`
          : !entero
            ? "no es un entero"
            : "está fuera del rango seguro";

      const pasos = [
        { tipo: "system", msg: `Valor: ${show(x)} · typeof → "${t}"` },
        {
          tipo: "iteration",
          marks: [1],
          msg: esNum
            ? 'El tipo es "number": pasa la primera comprobación'
            : `El tipo es "${t}", no "number": Number.isSafeInteger() devolverá false`,
        },
        {
          tipo: entero ? "success" : "error",
          marks: [2],
          msg: `Number.isInteger(${show(x)}) → ${entero}${
            entero ? " → ahora comprueba el rango" : " → no es entero, se detiene"
          }`,
        },
      ];

      if (entero) {
        pasos.push({
          tipo: dentro ? "success" : "error",
          marks: [3],
          msg: `Math.abs(${show(x)}) ${dentro ? "≤" : ">"} ${MAX_SAFE} → ${
            dentro
              ? "dentro del rango seguro ✅"
              : "fuera del rango seguro ❌ (se perdería precisión)"
          }`,
        });
      }

      pasos.push({
        tipo: res ? "success" : "error",
        marks: [4],
        msg: `Number.isSafeInteger(${show(x)}) → ${res}: ${razon}`,
      });

      if (typeof x === "number" && Math.abs(x) >= 2 ** 53 && Number.isFinite(x)) {
        pasos.push({
          tipo: "iteration",
          msg: "⚠️ A partir de 2^53 los enteros pierden precisión: dos números distintos pueden terminar siendo iguales",
        });
      }

      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${res}` });
      return pasos;
    },
  },

  /* ------------------------- Number.parseInt() ------------------------- */
  parseint: {
    nombre: "Number.parseInt()",
    descripcion:
      "Método ESTÁTICO · lee un entero desde el inicio de la cadena y se detiene en el primer carácter inválido",
    campos: [
      {
        k: "cadena",
        label: "cadena",
        tipo: "text",
        def: "25años",
        ancho: 220,
      },
      {
        k: "radix",
        label: "radix (base)",
        tipo: "select",
        def: "10",
        opciones: ["2", "8", "10", "16", "36"],
      },
    ],
    codigo: (v) =>
      `const numero = Number.parseInt(${JSON.stringify(v.cadena)}, ${v.radix});`,
    celdas: (v) => ({
      tipo: "chars",
      items: Array.from(String(v.cadena)).map((ch) => ({
        main: ch === " " ? "␣" : ch,
        sub: "",
      })),
    }),
    resultadoFinal: (v) =>
      show(Number.parseInt(String(v.cadena), Number(v.radix))),
    traza: (v) => {
      const cadena = String(v.cadena);
      const radix = Number(v.radix);
      const chars = Array.from(cadena);
      const res = Number.parseInt(cadena, radix);
      const pasos = [
        {
          tipo: "system",
          msg: `Cadena: ${show(cadena)} · radix = ${v.radix}`,
        },
      ];

      if (!Number.isInteger(radix) || radix < 2 || radix > 36) {
        pasos.push({
          tipo: "error",
          msg: `Radix inválido (${v.radix}): debe ser un entero entre 2 y 36 → parseInt devuelve NaN`,
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: NaN" });
        return pasos;
      }

      let i = 0;
      // espacios iniciales
      while (i < chars.length && /\s/.test(chars[i])) {
        pasos.push({
          tipo: "iteration",
          marks: [i],
          msg: `Ignora el espacio inicial (posición ${i})`,
        });
        i++;
      }
      // signo
      let signo = "";
      if (chars[i] === "+" || chars[i] === "-") {
        signo = chars[i];
        pasos.push({
          tipo: "iteration",
          marks: [i],
          msg: `Lee el signo ${JSON.stringify(signo)}`,
        });
        i++;
      }
      // prefijo 0x para base 16
      if (radix === 16 && chars[i] === "0" && (chars[i + 1] === "x" || chars[i + 1] === "X")) {
        pasos.push({
          tipo: "iteration",
          marks: [i, i + 1],
          msg: 'Detecta el prefijo "0x": los siguientes caracteres se leen en hexadecimal',
        });
        i += 2;
      }

      const inicioDigitos = i;
      while (i < chars.length) {
        const d = valorDigito(chars[i]);
        if (d < 0 || d >= radix) break;
        const parcial = Number.parseInt(cadena.slice(0, i + 1), radix);
        pasos.push({
          tipo: "success",
          marks: [i],
          msg: `Lee ${JSON.stringify(chars[i])} → dígito válido en base ${radix} (valor ${d}) · parcial: ${show(parcial)}`,
        });
        i++;
      }

      if (i === inicioDigitos) {
        pasos.push({
          tipo: "error",
          marks: i < chars.length ? [i] : [],
          msg:
            i < chars.length
              ? `El primer carácter ${JSON.stringify(chars[i])} no es un dígito válido en base ${radix} → NaN`
              : "La cadena está vacía o solo tiene espacios/signo → NaN",
        });
      } else if (i < chars.length) {
        pasos.push({
          tipo: "error",
          marks: [i],
          msg: `${JSON.stringify(chars[i])} no es válido en base ${radix} → se detiene aquí${
            chars[i] === "."
              ? " (no redondea: descarta la parte decimal)"
              : ""
          }`,
        });
      }

      if (Number.isNaN(res)) {
        pasos.push({
          tipo: "error",
          msg: "No se pudo leer ningún dígito → NaN",
        });
      } else {
        pasos.push({
          tipo: "success",
          msg: `Número entero formado: ${signo}${cadena
            .slice(inicioDigitos, i)
            .trim()} → ${show(res)}`,
        });
        if (cadena.includes(".")) {
          pasos.push({
            tipo: "iteration",
            msg: "Recuerda: parseInt() NO redondea; simplemente deja de leer en el punto decimal",
          });
        }
      }

      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(res)}` });
      return pasos;
    },
  },

  /* ------------------------ Number.parseFloat() ------------------------ */
  parsefloat: {
    nombre: "Number.parseFloat()",
    descripcion:
      "Método ESTÁTICO · lee un número decimal desde el inicio de la cadena y se detiene en el primer carácter inválido",
    campos: [
      {
        k: "cadena",
        label: "cadena (usa punto, no coma)",
        tipo: "text",
        def: "19.99USD",
        ancho: 240,
      },
    ],
    codigo: (v) =>
      `const numero = Number.parseFloat(${JSON.stringify(v.cadena)});`,
    celdas: (v) => ({
      tipo: "chars",
      items: Array.from(String(v.cadena)).map((ch) => ({
        main: ch === " " ? "␣" : ch,
        sub: "",
      })),
    }),
    resultadoFinal: (v) => show(Number.parseFloat(String(v.cadena))),
    traza: (v) => {
      const cadena = String(v.cadena);
      const chars = Array.from(cadena);
      const res = Number.parseFloat(cadena);
      const m = cadena.match(
        /^[\s]*[+-]?(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?/,
      );
      const fin = m ? m[0].length : 0;

      const pasos = [
        { tipo: "system", msg: `Cadena: ${show(cadena)}` },
      ];

      const inf = cadena.match(/^[\s]*([+-]?)Infinity/);
      if (inf) {
        const finInf = inf[0].length;
        for (let i = 0; i < finInf; i++) {
          pasos.push({
            tipo: "iteration",
            marks: [i],
            msg: `Lee ${JSON.stringify(chars[i])} → parte del número especial "Infinity"`,
          });
        }
        if (finInf < chars.length) {
          pasos.push({
            tipo: "error",
            marks: [finInf],
            msg: `${JSON.stringify(chars[finInf])} no forma parte del número → se detiene aquí`,
          });
        }
        pasos.push({
          tipo: "success",
          msg: `Número especial reconocido: "Infinity" → ${show(res)}`,
        });
        pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(res)}` });
        return pasos;
      }

      if (!m) {
        pasos.push({
          tipo: "error",
          marks: chars.length ? [0] : [],
          msg: "La cadena no comienza con un número válido → NaN",
        });
        pasos.push({ tipo: "result", msg: "⏹ Retorna: NaN" });
        return pasos;
      }

      for (let i = 0; i < fin; i++) {
        const ch = chars[i];
        const parcial = Number.parseFloat(cadena.slice(0, i + 1));
        let desc;
        if (/\s/.test(ch)) desc = "espacio inicial ignorado";
        else if (ch === "+" || ch === "-") {
          const antesEsExponente = /[eE]$/.test(cadena.slice(0, i));
          desc = antesEsExponente ? "signo del exponente" : "signo del número";
        } else if (ch === ".") desc = "punto decimal";
        else if (ch === "e" || ch === "E")
          desc = "inicio de la notación científica (exponente)";
        else desc = "dígito válido";
        pasos.push({
          tipo: "iteration",
          marks: [i],
          msg: `Lee ${JSON.stringify(ch)} → ${desc}${
            Number.isNaN(parcial) ? "" : ` · valor parcial: ${show(parcial)}`
          }`,
        });
      }

      if (fin < chars.length) {
        pasos.push({
          tipo: "error",
          marks: [fin],
          msg: `${JSON.stringify(chars[fin])} no forma parte del número → se detiene aquí${
            chars[fin] === ","
              ? ' (usa punto "." como separador decimal, no coma)'
              : ""
          }`,
        });
      }

      pasos.push({
        tipo: "success",
        msg: `Número decimal formado: ${JSON.stringify(
          cadena.slice(0, fin),
        )} → ${show(res)}`,
      });

      if (cadena.includes(",")) {
        pasos.push({
          tipo: "iteration",
          msg: 'Recuerda: JavaScript usa el punto (".") como separador decimal. parseFloat("10,5") devuelve 10',
        });
      }

      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(res)}` });
      return pasos;
    },
  },

  /* ------------------- Number.prototype.toFixed() ---------------------- */
  tofixed: {
    nombre: "Number.prototype.toFixed()",
    descripcion:
      "Método de INSTANCIA · formatea un número como texto con una cantidad fija de decimales (redondeando)",
    campos: [
      {
        k: "numero",
        label: "número",
        tipo: "text",
        def: "19.995",
        ancho: 150,
      },
      {
        k: "digitos",
        label: "digitos (0 a 100)",
        tipo: "number",
        def: "2",
        ancho: 80,
      },
    ],
    codigo: (v) =>
      `const texto = (${exprEntrada(v.numero)}).toFixed(${v.digitos});`,
    celdas: (v) => {
      const n = parseEntrada(v.numero);
      const d = String(v.digitos).trim() === "" ? 0 : Number(v.digitos);
      let resultado;
      try {
        resultado = show(n.toFixed(d));
      } catch (e) {
        resultado = `${e.name}`;
      }
      return {
        tipo: "tokens",
        items: [
          { main: show(n), sub: "número original" },
          { main: String(d), sub: "digitos" },
          { main: resultado, sub: "resultado (string)" },
        ],
      };
    },
    resultadoFinal: (v) => {
      const n = parseEntrada(v.numero);
      const d = String(v.digitos).trim() === "" ? 0 : Number(v.digitos);
      try {
        return show(n.toFixed(d));
      } catch (e) {
        return `${e.name}: ${e.message}`;
      }
    },
    traza: (v) => {
      const n = parseEntrada(v.numero);
      const d = String(v.digitos).trim() === "" ? 0 : Number(v.digitos);
      const pasos = [
        {
          tipo: "system",
          msg: `número = ${show(n)} · digitos = ${String(v.digitos).trim() === "" ? "0 (vacío)" : d}`,
        },
      ];

      if (typeof n !== "number") {
        pasos.push({
          tipo: "error",
          msg: `El valor es de tipo "${typeof n}", no "number": los strings no tienen toFixed()`,
        });
        pasos.push({
          tipo: "error",
          msg: `✖ TypeError: ${show(n)}.toFixed is not a function → convierte primero con Number()`,
        });
        pasos.push({
          tipo: "result",
          msg: "⏹ Lanza TypeError",
        });
        return pasos;
      }

      if (!Number.isInteger(d) || d < 0 || d > 100) {
        pasos.push({
          tipo: "error",
          msg: `digitos = ${d} no es válido: debe ser un entero entre 0 y 100`,
        });
        pasos.push({
          tipo: "error",
          msg: "✖ RangeError: toFixed() digits argument must be between 0 and 100",
        });
        pasos.push({ tipo: "result", msg: "⏹ Lanza RangeError" });
        return pasos;
      }

      const resultado = n.toFixed(d);
      pasos.push({
        tipo: "iteration",
        marks: [1],
        msg: `Se piden exactamente ${d} decimal(es): ${show(n)} → ${show(resultado)}`,
      });
      pasos.push({
        tipo: "iteration",
        marks: [0],
        msg: `Redondea el valor (no lo trunca) y rellena con ceros si faltan decimales`,
      });
      pasos.push({
        tipo: "success",
        marks: [2],
        msg: `Devuelve ${show(resultado)} · typeof → "string" (¡no es un número!)`,
      });
      pasos.push({
        tipo: "iteration",
        msg: `El número original no cambia: ${show(n)}. Para volver a operar usa Number(${show(resultado)})`,
      });
      pasos.push({ tipo: "result", msg: `⏹ Retorna: ${show(resultado)}` });
      return pasos;
    },
  },
};

/* ======================================================================
   UI
   ====================================================================== */
export default function SimuladorNumero({ metodoId }) {
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
    try {
      return config.celdas
        ? config.celdas(vals)
        : { tipo: "none", items: [] };
    } catch {
      return { tipo: "none", items: [] };
    }
  }, [config, vals]);

  const celdas = Array.isArray(celdasRaw)
    ? { tipo: "chars", items: celdasRaw }
    : celdasRaw;

  const resultadoFinal = useMemo(() => {
    try {
      return config.resultadoFinal(vals);
    } catch {
      return null;
    }
  }, [config, vals]);

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
                    style={{ width: c.ancho ? `${c.ancho}px` : "100px" }}
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
                {celdas.tipo === "chars" && (
                  <span className="box-index">[{i}]</span>
                )}
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
