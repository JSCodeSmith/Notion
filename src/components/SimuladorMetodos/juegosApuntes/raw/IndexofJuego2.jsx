/* Convertido automáticamente desde Apuntes/indexOf/juego1.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
const BASE = [
  { name: "Pistola", emoji: "\u{1F52B}" },
  { name: "Daga", emoji: "\u{1F5E1}" },
  { name: "Pistola", emoji: "\u{1F52B}" },
  { name: "Arco", emoji: "\u{1F3F9}" },
  { name: "Pistola", emoji: "\u{1F52B}" },
  { name: "Daga", emoji: "\u{1F5E1}" },
  { name: "Arco", emoji: "\u{1F3F9}" }
];
const POOL = [
  { name: "Pistola", emoji: "\u{1F52B}" },
  { name: "Daga", emoji: "\u{1F5E1}" },
  { name: "Arco", emoji: "\u{1F3F9}" },
  { name: "Hacha", emoji: "\u{1FA93}" },
  { name: "Cuchillo", emoji: "\u{1F52A}" }
];
const LEVEL19 = [
  { name: "Pistola", emoji: "\u{1F52B}" },
  { name: "Daga", emoji: "\u{1F5E1}" },
  { name: "Arco", emoji: "\u{1F3F9}" },
  { name: "Cuchillo", emoji: "\u{1F52A}" },
  { name: "Pistola", emoji: "\u{1F52B}" },
  { name: "Daga", emoji: "\u{1F5E1}" },
  { name: "Arco", emoji: "\u{1F3F9}" },
  { name: "Pistola", emoji: "\u{1F52B}" },
  { name: "Cuchillo", emoji: "\u{1F52A}" },
  { name: "Daga", emoji: "\u{1F5E1}" },
  { name: "Arco", emoji: "\u{1F3F9}" },
  { name: "Pistola", emoji: "\u{1F52B}" },
  { name: "Daga", emoji: "\u{1F5E1}" },
  { name: "Cuchillo", emoji: "\u{1F52A}" },
  { name: "Hacha", emoji: "\u{1FA93}" },
  { name: "Pistola", emoji: "\u{1F52B}" },
  { name: "Daga", emoji: "\u{1F5E1}" },
  { name: "Arco", emoji: "\u{1F3F9}" },
  { name: "Hacha", emoji: "\u{1FA93}" }
];
const ROUND_TARGETS = ["Pistola", "Daga", "Arco", "Ballesta"];
const ROUND_TITLES = ["Primera Pistola", "Primera Daga", "Primer Arco", "Primera Ballesta"];
function makeInfinite() {
  const inv = Array.from({ length: 20 }, () => POOL[Math.floor(Math.random() * POOL.length)]);
  const target = POOL[Math.floor(Math.random() * POOL.length)].name;
  return { inv, target };
}
function indexOfName(inv, name) {
  return inv.findIndex((w) => w.name === name);
}
function lastIndexOfName(inv, name) {
  for (let i = inv.length - 1; i >= 0; i--) if (inv[i].name === name) return i;
  return -1;
}
function App() {
  const [mode, setMode] = useState("rondas");
  const [round, setRound] = useState(0);
  const [versusFirst, setVersusFirst] = useState(true);
  const [infinite, setInfinite] = useState(() => makeInfinite());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState(/* @__PURE__ */ new Set());
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [lastWrong, setLastWrong] = useState(false);
  const [traversing, setTraversing] = useState(false);
  const [scanIndex, setScanIndex] = useState(null);
  const [debugLines, setDebugLines] = useState(["\u{1F5A5}\uFE0F Consola lista. Elige un \xEDndice o pulsa RECORRER."]);
  const [feedback, setFeedback] = useState("Lee el canto, elige un n\xFAmero y confirma. Puedes recorrer primero para ver c\xF3mo piensa indexOf.");
  const [log, setLog] = useState(["\u{1F3AF} Turno 1: la armer\xEDa est\xE1 lista."]);
  const [codeInput, setCodeInput] = useState("");
  const [codeClaimed, setCodeClaimed] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Progreso guardado cuando hay conexi\xF3n.");
  const [savedCount, setSavedCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerOn, setTimerOn] = useState(false);
  const timerRef = useRef(null);
  const scanRef = useRef(null);
  const current = useMemo(() => {
    if (mode === "rondas") {
      const target = ROUND_TARGETS[round];
      return { inv: BASE, target, answer: indexOfName(BASE, target), method: "indexOf", label: ROUND_TITLES[round], key: `ronda-${round + 1}` };
    }
    if (mode === "versus") {
      const target = "Pistola";
      return { inv: BASE, target, answer: versusFirst ? indexOfName(BASE, target) : lastIndexOfName(BASE, target), method: versusFirst ? "indexOf" : "lastIndexOf", label: versusFirst ? "Primera Pistola" : "\xDAltima Pistola", key: versusFirst ? "versus-primera" : "versus-ultima" };
    }
    if (mode === "infinito") {
      return { inv: infinite.inv, target: infinite.target, answer: indexOfName(infinite.inv, infinite.target), method: "indexOf", label: `Primera ${infinite.target}`, key: `infinito-${infinite.inv.map((w) => w.name[0]).join("")}` };
    }
    return { inv: LEVEL19, target: "Hacha", answer: 14, method: "indexOf", label: "Primera Hacha", key: "nivel-19" };
  }, [mode, round, versusFirst, infinite]);
  const firstIdx = useMemo(() => indexOfName(current.inv, current.target), [current]);
  const lastIdx = useMemo(() => lastIndexOfName(current.inv, current.target), [current]);
  const questionWord = current.method === "lastIndexOf" ? "\xDALTIMA" : "PRIMERA";
  const targetEmoji = POOL.find((w) => w.name === current.target)?.emoji ?? (current.target === "Ballesta" ? "\u{1F3F9}" : "\u{1F3AF}");
  const reloadRecords = useCallback(async () => {
    try {
      const res = await fetch("actions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "records.list", args: { collection: "buscador_resultados", limit: 100 } })
      });
      const json = await res.json();
      if (!res.ok || json.error) {
        setSaveStatus("Guardado no disponible en esta vista previa.");
        return;
      }
      setSavedCount(json.data?.records?.length ?? 0);
    } catch {
      setSaveStatus("Guardado no disponible en esta vista previa.");
    }
  }, []);
  useEffect(() => {
    reloadRecords();
  }, [reloadRecords]);
  useEffect(() => () => {
    if (timerRef.current) window.clearInterval(timerRef.current);
    if (scanRef.current) window.clearInterval(scanRef.current);
  }, []);
  useEffect(() => {
    if (mode !== "nivel19") {
      setTimerOn(false);
      setTimeLeft(60);
      return;
    }
    setTimerOn(true);
    setTimeLeft(60);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) window.clearInterval(timerRef.current);
          return 0;
        }
        return t - 1;
      });
    }, 1e3);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [mode, current.key]);
  const createRow = useCallback(async (row, key) => {
    const res = await fetch("actions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "records.create", args: { collection: "buscador_resultados", value: row, idempotency_key: key } })
    });
    const json = await res.json();
    if (!res.ok || json.error) throw new Error(typeof json.error === "string" ? json.error : "No se pudo guardar el intento.");
    return json.data;
  }, []);
  const persistAttempt = useCallback(async (payload, key) => {
    try {
      await createRow(payload, key);
      await reloadRecords();
      setSaveStatus("\u2705 Intento guardado.");
    } catch (e) {
      setSaveStatus(e instanceof Error && e.message.includes("limit") ? "\u26A0\uFE0F L\xEDmite de registros alcanzado: este intento no se guard\xF3." : "\u26A0\uFE0F Intento jugado, pero no se pudo guardar.");
    }
  }, [createRow, reloadRecords]);
  function resetTurn(nextMode, nextRound2, nextVersus) {
    setSelected(null);
    setConfirmed(false);
    setLastWrong(false);
    setScanIndex(null);
    setTraversing(false);
    setCodeInput("");
    setCodeClaimed(false);
    setTimeLeft(60);
    setFeedback("Lee el canto, elige un n\xFAmero y confirma. Puedes recorrer primero para ver c\xF3mo piensa indexOf.");
    setDebugLines(["\u{1F5A5}\uFE0F Consola lista. Elige un \xEDndice o pulsa RECORRER."]);
    if (scanRef.current) window.clearInterval(scanRef.current);
    if (nextMode) setMode(nextMode);
    if (nextRound2 !== void 0) setRound(nextRound2);
    if (nextVersus !== void 0) setVersusFirst(nextVersus);
  }
  function chooseMode(m) {
    if (m === "infinito") setInfinite(makeInfinite());
    resetTurn(m, m === "rondas" ? 0 : void 0);
    setLog((p) => [`\u{1F9ED} Modo cambiado: ${m === "versus" ? "Primera vs \xDAltima" : m === "infinito" ? "Infinito" : m === "nivel19" ? "Nivel 19" : "Rondas"}.`, ...p].slice(0, 8));
  }
  function startTraversal() {
    if (traversing || confirmed) return;
    setDebugLines([`> Ejecutando inventario.${current.method}('${current.target}')`]);
    setTraversing(true);
    setScanIndex(0);
    let i = 0;
    if (scanRef.current) window.clearInterval(scanRef.current);
    scanRef.current = window.setInterval(() => {
      if (i >= current.inv.length) {
        setDebugLines((p) => [...p, `Revis\xF3 [0]\u2026[${current.inv.length - 1}], ninguno === '${current.target}' \u2192 devuelve -1.`, "\u{1F9E0} Depurador: indexOf usa IGUALDAD EXACTA ===, no condici\xF3n. No es como findIndex que usa s => ... .", `> Resultado: -1 \u2190 Es un N\xDAMERO. Significa \u201Cno est\xE1\u201D.`, `\u2696\uFE0F Comparaci\xF3n: indexOf('${current.target}') \u2192 -1 | lastIndexOf('${current.target}') \u2192 -1 | findIndex(...) \u2192 -1 pero con condici\xF3n`]);
        setTraversing(false);
        setScanIndex(null);
        if (scanRef.current) window.clearInterval(scanRef.current);
        return;
      }
      const w = current.inv[i];
      const isTarget = w.name === current.target;
      const stop = current.method === "indexOf" ? isTarget : current.method === "lastIndexOf" ? isTarget && i === current.answer : false;
      if (current.method === "lastIndexOf") {
        const j = current.inv.length - 1 - i;
        const wj = current.inv[j];
        setScanIndex(j);
        setDebugLines((p) => [...p, `[Iteraci\xF3n ${i}] [${j}] ${wj.name} === '${current.target}'? ${wj.name === current.target}`]);
        if (wj.name === current.target) {
          setDebugLines((p) => [...p, `\u2705 \xA1ENCONTRADO! lastIndexOf se detiene en la \xDALTIMA aparici\xF3n.`, `> Resultado: ${j} \u2190 Es un N\xDAMERO, la posici\xF3n de la \xDALTIMA aparici\xF3n.`, `\u2696\uFE0F Comparaci\xF3n: indexOf('${current.target}') \u2192 ${firstIdx} (primera) | lastIndexOf('${current.target}') \u2192 ${j} (\xFAltima) | findIndex(...) \u2192 ${firstIdx} pero con condici\xF3n`]);
          setTraversing(false);
          setScanIndex(null);
          if (scanRef.current) window.clearInterval(scanRef.current);
        }
        i++;
        if (i >= current.inv.length && traversing) {
        }
        return;
      }
      setScanIndex(i);
      setDebugLines((p) => [...p, `[Iteraci\xF3n ${i}] [${i}] ${w.name} === '${current.target}'? ${isTarget}${isTarget ? " \u2192 \u2705 \xA1ENCONTRADO! Se detiene aqu\xED." : ""}`]);
      if (stop) {
        setDebugLines((p) => [...p, "\u{1F9E0} Depurador: indexOf usa IGUALDAD EXACTA ===, no condici\xF3n. No es como findIndex que usa s => ... . Compara valor por valor.", `> Resultado: ${i} \u2190 Es un N\xDAMERO, la posici\xF3n de la PRIMERA aparici\xF3n.`, `\u2696\uFE0F Comparaci\xF3n: indexOf('${current.target}') \u2192 ${firstIdx} (primera) | lastIndexOf('${current.target}') \u2192 ${lastIdx} (\xFAltima) | findIndex(p => p === '${current.target}') \u2192 ${firstIdx} pero con condici\xF3n`]);
        setTraversing(false);
        setScanIndex(null);
        if (scanRef.current) window.clearInterval(scanRef.current);
      }
      i++;
    }, 420);
  }
  function instantDebug(outcome) {
    const lines = [`> Ejecutando inventario.${current.method}('${current.target}')`];
    if (current.answer === -1) {
      for (let i = 0; i < current.inv.length; i++) lines.push(`[Iteraci\xF3n ${i}] [${i}] ${current.inv[i].name} === '${current.target}'? false`);
      lines.push(`Revis\xF3 [0]\u2026[${current.inv.length - 1}], ninguno === '${current.target}' \u2192 devuelve -1. Si fuera findIndex con condici\xF3n tambi\xE9n dar\xEDa -1, pero indexOf es solo igualdad.`);
      lines.push(`> Resultado: -1 \u2190 Es un N\xDAMERO.`);
    } else if (current.method === "lastIndexOf") {
      for (let i = current.inv.length - 1; i >= current.answer; i--) lines.push(`[Iteraci\xF3n ${current.inv.length - 1 - i}] [${i}] ${current.inv[i].name} === '${current.target}'? ${current.inv[i].name === current.target}`);
      lines.push(`\u2705 \xA1ENCONTRADO! Se detiene en la \xDALTIMA aparici\xF3n.`);
      lines.push(`> Resultado: ${current.answer} \u2190 Es un N\xDAMERO, la posici\xF3n de la \xDALTIMA aparici\xF3n.`);
    } else {
      for (let i = 0; i <= current.answer; i++) lines.push(`[Iteraci\xF3n ${i}] [${i}] ${current.inv[i].name} === '${current.target}'? ${current.inv[i].name === current.target}${i === current.answer ? " \u2192 \u2705 \xA1ENCONTRADO! Se detiene aqu\xED." : ""}`);
      lines.push("\u{1F9E0} Depurador: indexOf usa IGUALDAD EXACTA ===, no condici\xF3n. No es como findIndex que usa s => ... . Compara valor por valor.");
      lines.push(`> Resultado: ${current.answer} \u2190 Es un N\xDAMERO, la posici\xF3n de la PRIMERA aparici\xF3n.`);
    }
    if (outcome === "tipico" && selected !== null) {
      lines.push(`\u26A0\uFE0F Tu elecci\xF3n fue ${selected}. Revis\xF3 [0] ${current.inv[0].name} === '${current.target}' ${current.inv[0].name === current.target ? "true, ya se habr\xEDa detenido en 0. No llega al " + selected + "." : ""}`);
    }
    lines.push(`\u2696\uFE0F Comparaci\xF3n: indexOf('${current.target}') \u2192 ${firstIdx} (primera) | lastIndexOf('${current.target}') \u2192 ${lastIdx} (\xFAltima) | findIndex(...) \u2192 ${firstIdx} pero con condici\xF3n`);
    setDebugLines(lines);
  }
  async function confirm() {
    if (selected === null) {
      setFeedback("\u26A0\uFE0F Primero elige un \xEDndice en la barra inferior (o pulsa -1 si crees que no est\xE1).");
      return;
    }
    if (confirmed || traversing) return;
    const isCorrect = selected === current.answer;
    const isTypical = !isCorrect && selected >= 0 && current.inv[selected]?.name === current.target;
    const points = isCorrect ? mode === "nivel19" ? 20 : 10 : isTypical ? -5 : -3;
    const newScore = Math.max(0, score + points);
    setScore(newScore);
    setConfirmed(true);
    setLastWrong(!isCorrect);
    if (isCorrect) {
      setStreak((s) => s + 1);
      setSolved((s) => new Set(s).add(current.key));
      setFeedback(current.answer === -1 ? `\u2705 Correcto: indexOf devuelve -1 porque '${current.target}' no est\xE1 en el inventario. +${points} puntos.` : `\u2705 \xA1Exacto! inventario.${current.method}('${current.target}') // \u2192 ${current.answer}. +${points} puntos. El arma brilla dorada.`);
    } else if (isTypical) {
      setStreak(0);
      setFeedback(current.method === "lastIndexOf" ? `\u274C Esa tambi\xE9n es ${current.target}, pero lastIndexOf devuelve la \xDALTIMA aparici\xF3n. La respuesta era ${current.answer}. \u22125 puntos.` : `\u274C Esa tambi\xE9n es ${current.target}, pero indexOf devuelve la PRIMERA aparici\xF3n. La respuesta era ${current.answer}. \u22125 puntos.`);
    } else {
      setStreak(0);
      setFeedback(current.answer === -1 ? `\u274C No est\xE1 en el inventario. indexOf devuelve -1 porque no hay ning\xFAn '${current.target}'. \u22123 puntos.` : `\u274C En [${selected}] hay ${current.inv[selected]?.name ?? "nada"}. La primera ${current.target} est\xE1 en ${current.answer}. \u22123 puntos.`);
    }
    instantDebug(isTypical ? "tipico" : isCorrect ? "ok" : "mal");
    setLog((p) => [`${isCorrect ? "\u2705" : "\u274C"} ${current.label}: elegiste ${selected}, respuesta ${current.answer} (${points > 0 ? "+" : ""}${points}).`, ...p].slice(0, 8));
    const key = `intento-${current.key}-${selected}-${Date.now()}`;
    await persistAttempt({ modo: mode, ronda: current.label, objetivo: current.target, elegido: selected, respuesta: current.answer, puntos: points, acierto: isCorrect, error_tipico: isTypical, creado: (/* @__PURE__ */ new Date()).toISOString() }, key);
  }
  function nextRound() {
    if (mode === "rondas") {
      if (round < 3) {
        resetTurn(void 0, round + 1);
        setLog((p) => [`\u27A1\uFE0F Ronda ${round + 2}: ${ROUND_TITLES[round + 1]}.`, ...p].slice(0, 8));
      } else {
        chooseMode("versus");
      }
    } else if (mode === "versus") {
      resetTurn(void 0, void 0, !versusFirst);
    } else if (mode === "infinito") {
      setInfinite(makeInfinite());
      resetTurn();
    } else {
      resetTurn();
      setTimeLeft(60);
    }
  }
  function validateCode() {
    if (codeClaimed) {
      setFeedback("Ya reclamaste el +5 de c\xF3digo en este turno.");
      return;
    }
    const clean = codeInput.toLowerCase().replace(/\s+/g, "");
    const wantsLast = current.method === "lastIndexOf";
    const ok = clean.includes("inventario.") && clean.includes(current.target.toLowerCase()) && (wantsLast ? clean.includes("lastindexof") : clean.includes("indexof")) && !clean.includes("findindex");
    if (ok) {
      setScore((s) => s + 5);
      setCodeClaimed(true);
      setFeedback(`\u2705 C\xF3digo correcto: inventario.${current.method}('${current.target}') // \u2192 ${current.answer}. +5 puntos extra.`);
      setDebugLines((p) => [...p, `> C\xF3digo validado: inventario.${current.method}('${current.target}') // \u2192 ${current.answer}`]);
    } else {
      setFeedback(`\u274C Ese c\xF3digo no coincide. Prueba: inventario.${current.method}('${current.target}')`);
    }
  }
  function resetGame() {
    setScore(0);
    setStreak(0);
    setSolved(/* @__PURE__ */ new Set());
    setRound(0);
    setVersusFirst(true);
    setInfinite(makeInfinite());
    resetTurn("rondas", 0, true);
    setLog(["\u{1F504} Partida reiniciada. La armer\xEDa vuelve a estar lista."]);
  }
  const solvedCount = solved.size;
  return /* @__PURE__ */ jsxs("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)" }, className: "min-h-[100dvh] bg-[#030508] text-[#eef3fb] overflow-x-clip", children: [
    /* @__PURE__ */ jsx("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)" }, className: "sticky z-20 border-b border-[#26334d] bg-[#030508]/95 backdrop-blur", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-4", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold tracking-[0.28em] text-[#ff9a3d]", children: "CAMPO DE TIRO \xB7 EL BUSCADOR EXPR\xC9S" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-xl font-bold leading-tight sm:text-3xl [overflow-wrap:anywhere]", children: [
          "\u{1F52B} ARMER\xCDA \u201CEL PRIMER DISPARO\u201D ",
          /* @__PURE__ */ jsx("span", { className: "text-[#ff6a00]", children: "\u2014 ARMERO" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "rounded-full border border-emerald-400/50 bg-emerald-400/10 px-3 py-1 text-xs font-bold", children: "PROGRESO GUARDADO" }),
        /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-[#ff6a00] px-3 py-1 text-sm font-bold text-black", children: [
          "PUNTOS: ",
          score
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-[#ffc400] bg-[#ffc400]/10 px-3 py-1 text-sm font-bold text-[#ffc400]", children: [
          "\u{1F525} RACHA: ",
          streak
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto grid max-w-[1440px] grid-cols-1 gap-4 px-3 py-4 sm:px-4 lg:grid-cols-[300px_minmax(0,1fr)_420px]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: "\u{1F3AF} RONDAS" }),
            /* @__PURE__ */ jsxs("span", { className: "font-code text-xs text-[#9aa9c3]", children: [
              solvedCount,
              " resueltas"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: ROUND_TITLES.map((t, i) => /* @__PURE__ */ jsxs("button", { onClick: () => {
            setMode("rondas");
            resetTurn("rondas", i);
          }, className: `flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm font-bold ${mode === "rondas" && round === i ? "border-[#ff6a00] bg-[#ff6a00]/15 text-white" : "border-[#26334d] bg-[#0d1526]"}`, children: [
            /* @__PURE__ */ jsxs("span", { className: "[overflow-wrap:anywhere]", children: [
              "Ronda ",
              i + 1,
              " \xB7 ",
              t
            ] }),
            /* @__PURE__ */ jsx("span", { children: solved.has(`ronda-${i + 1}`) ? "\u2705" : "\u25CB" })
          ] }, t)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2 border-t border-[#26334d] pt-3", children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => chooseMode("versus"), className: `w-full rounded-xl border px-3 py-2 text-left text-sm font-bold ${mode === "versus" ? "border-[#ffc400] bg-[#ffc400]/15" : "border-[#26334d] bg-[#0d1526]"}`, children: [
              "\u2694\uFE0F Modo Primera vs \xDAltima ",
              /* @__PURE__ */ jsx("span", { className: "block text-xs font-medium text-[#9aa9c3]", children: "indexOf \u21C4 lastIndexOf" })
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: () => chooseMode("infinito"), className: `w-full rounded-xl border px-3 py-2 text-left text-sm font-bold ${mode === "infinito" ? "border-[#ffc400] bg-[#ffc400]/15" : "border-[#26334d] bg-[#0d1526]"}`, children: [
              "\u267E\uFE0F Modo Infinito ",
              /* @__PURE__ */ jsx("span", { className: "block text-xs font-medium text-[#9aa9c3]", children: "20 armas aleatorias" })
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: () => chooseMode("nivel19"), className: `w-full rounded-xl border px-3 py-2 text-left text-sm font-bold ${mode === "nivel19" ? "border-[#ffc400] bg-[#ffc400]/15" : "border-[#26334d] bg-[#0d1526]"}`, children: [
              "\u{1F3C6} Nivel 19 \xB7 Primera Hacha ",
              /* @__PURE__ */ jsx("span", { className: "block text-xs font-medium text-[#9aa9c3]", children: "60 s \xB7 +20 \xB7 badge Armero Nivel 19" })
            ] })
          ] }),
          solved.has("nivel-19") && /* @__PURE__ */ jsx("p", { className: "mt-3 rounded-xl bg-[#ffc400] px-3 py-2 text-center text-sm font-bold text-black", children: "\u{1F3C5} BADGE: ARMERO NIVEL 19" })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel panel-orange p-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-base font-bold", children: "indexOf vs findIndex vs lastIndexOf" }),
          /* @__PURE__ */ jsxs("div", { className: "font-code space-y-2 text-[12px] leading-relaxed [overflow-wrap:anywhere]", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#ff9a3d]", children: "indexOf" }),
              " \u2192 igualdad exacta ",
              /* @__PURE__ */ jsx("b", { children: "===" }),
              ", sin condici\xF3n. Devuelve un ",
              /* @__PURE__ */ jsx("b", { children: "N\xDAMERO" }),
              "."
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#ffc400]", children: "findIndex" }),
              " \u2192 usa condici\xF3n: ",
              /* @__PURE__ */ jsx("span", { className: "text-emerald-300", children: "p => p === '\u2026'" })
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-sky-300", children: "lastIndexOf" }),
              " \u2192 misma igualdad, desde el ",
              /* @__PURE__ */ jsx("b", { children: "final" }),
              "."
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "rounded-lg bg-black/40 p-2", children: [
              "indexOf('Pistola') \u2192 0",
              /* @__PURE__ */ jsx("br", {}),
              "lastIndexOf('Pistola') \u2192 4",
              /* @__PURE__ */ jsx("br", {}),
              "findIndex(...) \u2192 0, con condici\xF3n"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "mb-2 text-base font-bold", children: "\u{1F4D3} Bit\xE1cora" }),
          /* @__PURE__ */ jsx("ul", { className: "space-y-2 text-sm text-[#c7d2e5]", children: log.map((l, i) => /* @__PURE__ */ jsx("li", { className: "[overflow-wrap:anywhere]", children: l }, i)) }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-xs text-[#9aa9c3] [overflow-wrap:anywhere]", children: [
            saveStatus,
            " Intentos guardados: ",
            savedCount,
            "."
          ] }),
          /* @__PURE__ */ jsx("button", { onClick: resetGame, className: "btn btn-ghost mt-3 w-full", children: "\u21BA REINICIAR PARTIDA" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "min-w-0 space-y-4", children: /* @__PURE__ */ jsxs("div", { className: "panel panel-orange p-4 sm:p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold", children: [
            "\u{1F4E6} INVENTARIO ",
            /* @__PURE__ */ jsxs("span", { className: "text-sm font-medium text-[#9aa9c3]", children: [
              "(",
              current.inv.length,
              " armas)"
            ] })
          ] }),
          mode === "nivel19" && /* @__PURE__ */ jsxs("span", { className: `rounded-full px-3 py-1 font-code text-sm font-bold ${timeLeft <= 10 ? "bg-red-500 text-white" : "bg-[#ffc400] text-black"}`, children: [
            "\u23F1 ",
            timeLeft,
            "s"
          ] }),
          mode === "infinito" && /* @__PURE__ */ jsx("span", { className: "rounded-full border border-sky-400/50 px-3 py-1 text-xs font-bold", children: "\u267E\uFE0F INVENTARIO ALEATORIO" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `mt-4 flex flex-wrap gap-2 ${lastWrong ? "shake" : ""}`, children: current.inv.map((w, i) => {
          const isAnswer = confirmed && i === current.answer;
          const isScanning = scanIndex === i;
          return /* @__PURE__ */ jsxs("div", { className: `weapon-card relative w-[calc(50%-4px)] rounded-2xl border border-[#26334d] bg-[#0d1526] px-2 py-3 text-center sm:w-[calc(33.333%-6px)] ${isAnswer ? "golden" : ""} ${isScanning ? "scanning" : ""}`, children: [
            isScanning && /* @__PURE__ */ jsx("span", { className: "absolute -top-3 left-1/2 -translate-x-1/2 text-lg", children: "\u{1F50E}" }),
            isAnswer && /* @__PURE__ */ jsx("span", { className: "absolute -top-3 right-1 text-lg floaty", children: "\u{1F3AF}" }),
            /* @__PURE__ */ jsxs("p", { className: "font-code text-[11px] text-[#9aa9c3]", children: [
              "[",
              i,
              "]"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "my-1 text-4xl", "aria-hidden": "true", children: w.emoji }),
            /* @__PURE__ */ jsx("p", { className: "text-sm font-bold [overflow-wrap:anywhere]", children: w.name }),
            isAnswer && /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] font-bold text-[#ffc400]", children: "PRIMERA \xB7 DETENIDO" })
          ] }, `${w.name}-${i}`);
        }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-2xl border border-[#ff6a00]/50 bg-[#1a0f04] p-4 text-center", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[11px] font-bold tracking-[0.24em] text-[#ff9a3d]", children: "EL CANTO DEL ARMERO" }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-2xl font-bold leading-tight sm:text-3xl [overflow-wrap:anywhere]", children: [
            "\u{1F3AF} \xBFEn qu\xE9 \xCDNDICE est\xE1 la ",
            /* @__PURE__ */ jsx("span", { className: "text-[#ff6a00]", children: questionWord }),
            " ",
            current.target,
            " ",
            targetEmoji,
            "?"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-[#c7d2e5]", children: [
            "Recuerda: la respuesta es un ",
            /* @__PURE__ */ jsx("b", { children: "N\xDAMERO" }),
            ". indexOf se detiene en la primera coincidencia exacta."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
          /* @__PURE__ */ jsx("p", { className: "mb-2 text-xs font-bold tracking-widest text-[#9aa9c3]", children: "BARRA DE \xCDNDICES \u2014 ELIGE UN N\xDAMERO" }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            current.inv.map((_, i) => /* @__PURE__ */ jsx("button", { onClick: () => {
              if (!confirmed && !traversing) {
                setSelected(i);
                setLastWrong(false);
              }
            }, className: `index-btn ${selected === i ? "selected" : ""} ${confirmed && i === current.answer ? "correct" : ""} ${confirmed && selected === i && selected !== current.answer ? "wrong" : ""}`, "aria-label": `\xCDndice ${i}`, children: i }, i)),
            /* @__PURE__ */ jsx("button", { onClick: () => {
              if (!confirmed && !traversing) {
                setSelected(-1);
                setLastWrong(false);
              }
            }, className: `index-btn border-dashed !border-[#ffc400] !bg-[#2a2103] !text-[#ffc400] ${selected === -1 ? "!bg-[#ffc400] !text-black" : ""}`, "aria-label": "No encontrado, menos uno", children: "-1" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-[#9aa9c3]", children: "\u2190 bot\xF3n especial: \u201Cno est\xE1\u201D" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 sm:grid-cols-3", children: [
          /* @__PURE__ */ jsx("button", { onClick: startTraversal, disabled: traversing || confirmed, className: "btn btn-primary", children: "\u25B6 RECORRER DESDE EL INICIO" }),
          /* @__PURE__ */ jsx("button", { onClick: confirm, disabled: confirmed || traversing, className: "btn btn-gold", children: "\u2705 CONFIRMAR \xCDNDICE" }),
          /* @__PURE__ */ jsx("button", { onClick: nextRound, className: "btn", children: "\u27A1\uFE0F SIGUIENTE RONDA" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `mt-4 rounded-xl border p-3 text-sm font-bold [overflow-wrap:anywhere] ${confirmed ? lastWrong ? "border-red-500/60 bg-red-500/10 text-red-100" : "border-emerald-400/50 bg-emerald-400/10 text-emerald-100" : "border-[#26334d] bg-black/30"}`, role: "status", children: feedback }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-xl border border-[#26334d] bg-black/30 p-3", children: [
          /* @__PURE__ */ jsxs("label", { htmlFor: "codigo", className: "text-sm font-bold", children: [
            "\u{1F4BB} Escribe el c\xF3digo para +5 ",
            /* @__PURE__ */ jsx("span", { className: "font-normal text-[#9aa9c3]", children: "(ej: inventario.indexOf('Pistola'))" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-col gap-2 sm:flex-row", children: [
            /* @__PURE__ */ jsx("input", { id: "codigo", value: codeInput, onChange: (e) => setCodeInput(e.target.value), placeholder: `inventario.${current.method}('${current.target}')`, className: "font-code min-w-0 flex-1 rounded-xl border border-[#26334d] bg-[#0a0f1c] px-3 py-2.5 text-sm [overflow-wrap:anywhere]" }),
            /* @__PURE__ */ jsx("button", { onClick: validateCode, className: "btn btn-primary shrink-0", children: "VALIDAR +5" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "font-code mt-4 rounded-xl bg-black/50 p-3 text-[12px] leading-relaxed [overflow-wrap:anywhere]", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "inventario.indexOf('",
            current.target,
            "') ",
            /* @__PURE__ */ jsxs("span", { className: "text-[#9aa9c3]", children: [
              "// \u2192 ",
              firstIdx
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "inventario.indexOf('Ballesta') ",
            /* @__PURE__ */ jsx("span", { className: "text-[#9aa9c3]", children: "// \u2192 -1" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2 text-[#ffc400]", children: [
            "\u2696\uFE0F indexOf('",
            current.target,
            "') \u2192 ",
            firstIdx,
            " (primera) | lastIndexOf('",
            current.target,
            "') \u2192 ",
            lastIdx,
            " (\xFAltima) | findIndex(p => p === '",
            current.target,
            "') \u2192 ",
            firstIdx,
            " pero con condici\xF3n"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2 text-xs font-bold", children: [
          /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-emerald-400/15 px-2.5 py-1 text-emerald-300", children: [
            "\u2705 Acierto +",
            mode === "nivel19" ? 20 : 10
          ] }),
          /* @__PURE__ */ jsx("span", { className: "rounded-full bg-red-400/15 px-2.5 py-1 text-red-300", children: "\u274C Error t\xEDpico \u22125 \xB7 Otro error \u22123" }),
          /* @__PURE__ */ jsx("span", { className: "rounded-full bg-[#ffc400]/15 px-2.5 py-1 text-[#ffc400]", children: "\u{1F4BB} C\xF3digo +5" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("aside", { children: /* @__PURE__ */ jsxs("section", { className: "panel p-4 lg:sticky lg:top-24", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-lg font-bold", children: [
            "\u{1F9D1}\u200D\u{1F4BB} DEPURADOR AVANZADO: ",
            /* @__PURE__ */ jsx("span", { className: "text-[#ff6a00]", children: ".indexOf()" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: `h-2.5 w-2.5 rounded-full ${traversing ? "bg-[#ffc400] blink" : "bg-emerald-400"}` })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "console-scroll max-h-[520px] overflow-y-auto rounded-xl border border-[#26334d] bg-black/70 p-3", children: /* @__PURE__ */ jsxs("div", { className: "font-code space-y-2 text-[12px] leading-relaxed text-[#c8f0d5]", children: [
          debugLines.map((l, i) => /* @__PURE__ */ jsx("p", { className: "[overflow-wrap:anywhere]", children: l }, i)),
          traversing && /* @__PURE__ */ jsx("p", { className: "text-[#ff9a3d]", children: "\u258B recorriendo\u2026" })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "font-code mt-3 space-y-2 rounded-xl bg-[#0d1526] p-3 text-[12px] leading-relaxed [overflow-wrap:anywhere]", children: [
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("b", { className: "text-[#ff9a3d]", children: "Regla de oro:" }),
            " indexOf compara con ",
            /* @__PURE__ */ jsx("b", { children: "===" }),
            ", valor por valor, de izquierda a derecha."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("b", { children: "Resultado:" }),
            " un N\xDAMERO (la posici\xF3n) o ",
            /* @__PURE__ */ jsx("b", { children: "-1" }),
            " si no existe."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            /* @__PURE__ */ jsx("b", { children: "Error t\xEDpico:" }),
            " elegir una aparici\xF3n posterior es confundir indexOf con lastIndexOf."
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setDebugLines(["\u{1F5A5}\uFE0F Consola lista. Elige un \xEDndice o pulsa RECORRER."]), className: "btn btn-ghost mt-3 w-full", children: "\u{1F9F9} LIMPIAR CONSOLA" }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-center text-xs text-[#9aa9c3]", children: "Igualdad exacta + recorrido \u2192\u2192\u2192 + primera aparici\xF3n." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "mx-auto max-w-[1440px] px-4 pb-6 text-center text-xs text-[#9aa9c3]", children: "Armer\xEDa \u201CEl Primer Disparo\u201D \xB7 indexOf devuelve la PRIMERA aparici\xF3n. Si eliges otra Pistola, ya se habr\xEDa detenido antes." })
  ] });
}
export {
  App as default
};
