/* Convertido automáticamente desde Apuntes/lastIndexOf/App.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { Play, Check, ArrowRight, RotateCcw, Search, Timer, Trophy, Shield, TerminalSquare, BookOpen, Crosshair } from "lucide-react";
const EMOJI = { Pistola: "\u{1F52B}", Daga: "\u{1F5E1}", Arco: "\u{1F3F9}", Hacha: "\u{1FA93}", Cuchillo: "\u{1F52A}", Ballesta: "\u{1F3AF}" };
const BASE = ["Pistola", "Daga", "Pistola", "Arco", "Pistola", "Daga", "Arco"];
const NIVEL19 = ["Pistola", "Daga", "Arco", "Hacha", "Cuchillo", "Pistola", "Arco", "Daga", "Pistola", "Hacha", "Arco", "Cuchillo", "Pistola", "Daga", "Arco", "Cuchillo", "Pistola", "Hacha", "Arco"];
async function api(action, args) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(json.error || `Error ${res.status}`);
  return json.data;
}
function lastIdx(arr, t) {
  return arr.lastIndexOf(t);
}
function firstIdx(arr, t) {
  return arr.indexOf(t);
}
function randomInventory() {
  const pool = ["Pistola", "Daga", "Arco", "Hacha", "Cuchillo"];
  return Array.from({ length: 20 }, () => pool[Math.floor(Math.random() * pool.length)]);
}
function App() {
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mode, setMode] = useState("rondas");
  const [roundIdx, setRoundIdx] = useState(0);
  const [versusIdx, setVersusIdx] = useState(0);
  const [infinitoSeed, setInfinitoSeed] = useState(1);
  const [infinitoData, setInfinitoData] = useState(null);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  const [traverseIdx, setTraverseIdx] = useState(null);
  const [isTraversing, setIsTraversing] = useState(false);
  const [usedTraverse, setUsedTraverse] = useState(false);
  const [code, setCode] = useState("");
  const [codeValid, setCodeValid] = useState(false);
  const [codeMsg, setCodeMsg] = useState("");
  const [debugLines, setDebugLines] = useState(["> Consola lista. Pulsa RECORRER o CONFIRMAR para depurar.", "\u2139\uFE0F lastIndexOf busca desde el FINAL. indexOf busca desde el INICIO."]);
  const [log, setLog] = useState(["Bit\xE1cora abierta. El b\xFAnker est\xE1 en silencio."]);
  const [resolved, setResolved] = useState(/* @__PURE__ */ new Set());
  const [saved, setSaved] = useState([]);
  const [saveStatus, setSaveStatus] = useState("Cargando bit\xE1cora guardada\u2026");
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerOn, setTimerOn] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const timerRef = useRef(null);
  const traverseRef = useRef(null);
  const challenge = useMemo(() => {
    if (mode === "rondas") {
      const targets = ["Pistola", "Daga", "Arco", "Ballesta"];
      const t = targets[roundIdx] || "Pistola";
      return { id: `ronda-${roundIdx + 1}`, title: `RONDA ${roundIdx + 1} \u2014 \xDAltima ${t}`, inventory: BASE, target: t, answer: lastIdx(BASE, t), method: "lastIndexOf", hint: t === "Ballesta" ? "No est\xE1 en el inventario." : "Hay varias. Busca la \xDALTIMA." };
    }
    if (mode === "versus") {
      const isFirst = versusIdx === 0;
      return { id: `versus-${versusIdx}`, title: isFirst ? "PRIMERA vs \xDALTIMA \xB7 PRIMERA Pistola" : "PRIMERA vs \xDALTIMA \xB7 \xDALTIMA Pistola", inventory: BASE, target: "Pistola", answer: isFirst ? 0 : 4, method: isFirst ? "indexOf" : "lastIndexOf", hint: "Misma armer\xEDa. Cambia la direcci\xF3n." };
    }
    if (mode === "nivel19") {
      return { id: "nivel-19", title: "NIVEL 19 \u2014 \xDAltima Hacha \u{1FA93}", inventory: NIVEL19, target: "Hacha", answer: 17, method: "lastIndexOf", hint: "B\xFAnker grande: 19 armas. La \xFAltima Hacha est\xE1 al final." };
    }
    const inv = infinitoData?.inv || BASE;
    const target = infinitoData?.target || "Pistola";
    return { id: `infinito-${infinitoSeed}`, title: `MODO INFINITO \xB7 \xDAltima ${target}`, inventory: inv, target, answer: lastIdx(inv, target), method: "lastIndexOf", hint: "20 armas generadas. Sigue el rastro desde el final." };
  }, [mode, roundIdx, versusIdx, infinitoData, infinitoSeed]);
  const firstOccurrence = useMemo(() => challenge.inventory.indexOf(challenge.target), [challenge]);
  const comparison = `indexOf('${challenge.target}') \u2192 ${firstOccurrence} (primera)  |  lastIndexOf('${challenge.target}') \u2192 ${challenge.answer} (\xFAltima)`;
  useEffect(() => {
    (async () => {
      try {
        const data = await api("records.list", { collection: "rastro_del_final" });
        const rows = data?.records || [];
        setSaved(rows);
        setSaveStatus(rows.length ? `\u2713 ${rows.length} resultado(s) guardado(s) en la bit\xE1cora.` : "Bit\xE1cora guardada vac\xEDa. Completa una ronda para guardar.");
      } catch (e) {
        setSaveStatus("Guardado no disponible ahora. El juego sigue en local.");
      }
    })();
  }, []);
  useEffect(() => {
    if (mode === "infinito" && !infinitoData) {
      const inv = randomInventory();
      const target = inv[Math.floor(Math.random() * inv.length)];
      setInfinitoData({ inv, target });
    }
  }, [mode, infinitoData]);
  useEffect(() => {
    if (mode === "nivel19" && !confirmed && !timerOn) {
      setTimeLeft(60);
      setTimerOn(true);
    }
    if (mode !== "nivel19") {
      setTimerOn(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
  }, [mode, confirmed, timerOn]);
  useEffect(() => {
    if (!timerOn || confirmed) return;
    timerRef.current = setInterval(() => setTimeLeft((t) => {
      if (t <= 1) {
        clearInterval(timerRef.current);
        setTimerOn(false);
        setConfirmed(true);
        setIsCorrect(false);
        setFeedback("\u23F0 Tiempo agotado. En el Nivel 19 ten\xEDas 60 s. La \xFAltima Hacha era el \xEDndice 17.");
        setDebugLines((p) => [...p, "> \u23F0 Tiempo agotado en Nivel 19."]);
        return 0;
      }
      return t - 1;
    }), 1e3);
    return () => clearInterval(timerRef.current);
  }, [timerOn, confirmed]);
  function resetChallenge(keepPoints = true) {
    setSelected(null);
    setConfirmed(false);
    setFeedback("");
    setIsCorrect(null);
    setTraverseIdx(null);
    setIsTraversing(false);
    setUsedTraverse(false);
    setCode("");
    setCodeValid(false);
    setCodeMsg("");
    setShowCode(false);
    setDebugLines([`> Nuevo reto: ${challenge.title}`, `> inventario = [${challenge.inventory.map((x) => `'${x}'`).join(", ")}]`]);
    if (traverseRef.current) clearTimeout(traverseRef.current);
  }
  useEffect(() => {
    resetChallenge();
  }, [challenge.id]);
  function selectMode(m) {
    setMode(m);
    if (m === "infinito") {
      const inv = randomInventory();
      const target = inv[Math.floor(Math.random() * inv.length)];
      setInfinitoData({ inv, target });
      setInfinitoSeed((s) => s + 1);
    }
    if (m === "rondas") setRoundIdx(0);
    if (m === "versus") setVersusIdx(0);
    setLog((p) => [...p, `\u2192 Cambiaste a ${m}.`]);
  }
  function goRound(i) {
    setMode("rondas");
    setRoundIdx(i);
    setLog((p) => [...p, `\u2192 Fuiste a la Ronda ${i + 1}.`]);
  }
  function nextRound() {
    if (mode === "rondas") {
      if (roundIdx < 3) setRoundIdx(roundIdx + 1);
      else selectMode("versus");
    } else if (mode === "versus") {
      if (versusIdx === 0) setVersusIdx(1);
      else selectMode("infinito");
    } else if (mode === "infinito") {
      const inv = randomInventory();
      const target = inv[Math.floor(Math.random() * inv.length)];
      setInfinitoData({ inv, target });
      setInfinitoSeed((s) => s + 1);
    } else if (mode === "nivel19") {
      setTimeLeft(60);
      setTimerOn(true);
    }
  }
  function validateCode() {
    const norm = code.replace(/\s+/g, "").replace(/"/g, "'").toLowerCase();
    const expected = `inventario.${challenge.method}('${challenge.target.toLowerCase()}')`;
    const ok = norm.includes(`${challenge.method}('${challenge.target.toLowerCase()}')`) || norm.includes(expected);
    if (ok) {
      if (!codeValid) {
        setCodeValid(true);
        setCodeMsg("\u2713 C\xF3digo correcto. +5 al confirmar si aciertas.");
      } else setCodeMsg("Ya tienes el bonus de c\xF3digo para esta ronda.");
    } else setCodeMsg(`\u2717 Revisa: se espera inventario.${challenge.method}('${challenge.target}')`);
  }
  function buildDebug(selectedVal) {
    const lines = [];
    const inv = challenge.inventory;
    if (challenge.method === "lastIndexOf") {
      lines.push(`> Ejecutando inventario.lastIndexOf('${challenge.target}')`);
      lines.push(`[Recorrido \u2190\u2190\u2190 desde el final]`);
      for (let i = inv.length - 1; i >= 0; i--) {
        const eq = inv[i] === challenge.target;
        lines.push(`[${i}] ${inv[i]} === '${challenge.target}'? ${eq} ${eq ? "\u2192 \u2705 \xA1ENCONTRADO! Se detiene aqu\xED." : "\u2192 sigue"}`);
        if (eq) break;
      }
      if (challenge.answer === -1) lines.push(`Revis\xF3 [${inv.length - 1}]\u2026[0], ninguno === '${challenge.target}' \u2192 devuelve -1.`);
      else lines.push(`\u{1F9E0} Depurador: lastIndexOf usa IGUALDAD EXACTA === y recorre de ATR\xC1S hacia ADELANTE. No revis\xF3 los \xEDndices anteriores porque ya encontr\xF3 la \xFAltima.`);
      lines.push(`> Resultado: ${challenge.answer} \u2190 Es un N\xDAMERO, la posici\xF3n de la \xDALTIMA aparici\xF3n.`);
      lines.push(`\u2696\uFE0F Comparaci\xF3n: ${comparison} | findLastIndex(...) \u2192 ${challenge.answer} pero con condici\xF3n`);
    } else {
      lines.push(`> Ejecutando inventario.indexOf('${challenge.target}')`);
      lines.push(`[Recorrido \u2192\u2192\u2192 desde el inicio]`);
      for (let i = 0; i < inv.length; i++) {
        const eq = inv[i] === challenge.target;
        lines.push(`[${i}] ${inv[i]} === '${challenge.target}'? ${eq} ${eq ? "\u2192 \u2705 \xA1ENCONTRADO! Se detiene aqu\xED." : "\u2192 sigue"}`);
        if (eq) break;
      }
      lines.push(`> Resultado: ${challenge.answer} \u2190 Es un N\xDAMERO, la posici\xF3n de la PRIMERA aparici\xF3n.`);
      lines.push(`\u2696\uFE0F Comparaci\xF3n: ${comparison}`);
    }
    return lines;
  }
  function runTraverse() {
    if (isTraversing || confirmed) return;
    setUsedTraverse(true);
    setIsTraversing(true);
    const inv = challenge.inventory;
    const steps = challenge.method === "lastIndexOf" ? Array.from({ length: inv.length }, (_, k) => inv.length - 1 - k) : Array.from({ length: inv.length }, (_, k) => k);
    let idx = 0;
    const lines = [`> Ejecutando inventario.${challenge.method}('${challenge.target}')`];
    setDebugLines(lines);
    const tick = () => {
      if (idx >= steps.length) {
        setIsTraversing(false);
        setTraverseIdx(null);
        setDebugLines((p) => [...p, challenge.answer === -1 ? `Revis\xF3 todos, ninguno === '${challenge.target}' \u2192 devuelve -1.` : `\u2705 Se detiene en ${challenge.answer}.`]);
        return;
      }
      const i = steps[idx];
      setTraverseIdx(i);
      const eq = inv[i] === challenge.target;
      setDebugLines((p) => [...p, `[${i}] ${inv[i]} === '${challenge.target}'? ${eq} ${eq ? "\u2192 \u2705 \xA1ENCONTRADO!" : "\u2192 sigue"}`]);
      idx++;
      if (eq) {
        setTimeout(() => {
          setIsTraversing(false);
          setTraverseIdx(i);
        }, 450);
        return;
      }
      traverseRef.current = setTimeout(tick, 420);
    };
    traverseRef.current = setTimeout(tick, 200);
    setLog((p) => [...p, `\u{1F526} Recorriste ${challenge.method === "lastIndexOf" ? "desde el final \u2190\u2190\u2190" : "desde el inicio \u2192\u2192\u2192"}.`]);
  }
  async function confirm() {
    if (selected === null) {
      setFeedback("Elige un n\xFAmero en la barra de \xEDndices (o -1).");
      return;
    }
    const correct = selected === challenge.answer;
    let delta = 0;
    let msg = "";
    if (correct) {
      delta = mode === "nivel19" ? 20 : 10;
      if (codeValid) delta += 5;
      if (usedTraverse) delta += 5;
      msg = challenge.answer === -1 ? `\u2705 Correcto. lastIndexOf devuelve -1 porque '${challenge.target}' no est\xE1 en el inventario.` : `\u2705 Correcto. inventario.${challenge.method}('${challenge.target}') // \u2192 ${challenge.answer}`;
      if (mode === "nivel19") msg += " \u{1F3C5} Badge: EXPLORADOR NIVEL 19 desbloqueado.";
    } else {
      if (challenge.method === "lastIndexOf" && selected === firstOccurrence && challenge.answer !== firstOccurrence) {
        delta = -5;
        msg = `\u274C Error t\xEDpico: esa tambi\xE9n es ${challenge.target}, pero lastIndexOf devuelve la \xDALTIMA aparici\xF3n. La respuesta era ${challenge.answer}.`;
      } else if (challenge.answer === -1) {
        delta = -3;
        msg = `\u274C lastIndexOf devuelve -1 porque '${challenge.target}' no est\xE1 en el inventario.`;
      } else if (selected >= 0 && challenge.inventory[selected] === challenge.target) {
        delta = -5;
        msg = `\u274C Esa tambi\xE9n es ${challenge.target}, pero no es la \xDALTIMA. La respuesta era ${challenge.answer}.`;
      } else {
        delta = -3;
        msg = `\u274C No es ${selected}. Revisa el recorrido \u2190\u2190\u2190. La respuesta era ${challenge.answer}.`;
      }
    }
    const newPoints = points + delta;
    setPoints(newPoints);
    setStreak(correct ? streak + 1 : 0);
    setConfirmed(true);
    setIsCorrect(correct);
    setFeedback(msg);
    setDebugLines(buildDebug(selected));
    setResolved((prev) => {
      const n = new Set(prev);
      n.add(challenge.id);
      return n;
    });
    setLog((p) => [...p, `${correct ? "\u2705" : "\u274C"} ${challenge.title}: elegiste ${selected}, respuesta ${challenge.answer} (${delta >= 0 ? "+" : ""}${delta})`]);
    if (timerRef.current) clearInterval(timerRef.current);
    setSaveStatus("Guardando resultado\u2026");
    const key = `rastro-${challenge.id}-${Date.now()}`;
    try {
      const data = await api("records.create", { collection: "rastro_del_final", idempotency_key: key, value: { challenge: challenge.title, target: challenge.target, selected, answer: challenge.answer, correct, delta, totalPoints: newPoints, at: (/* @__PURE__ */ new Date()).toISOString() } });
      if (data?.record) setSaved((p) => [data.record, ...p].slice(0, 20));
      setSaveStatus("\u2713 Resultado guardado en la bit\xE1cora.");
    } catch (e) {
      setSaveStatus("No se pudo guardar ahora. Tu partida sigue en pantalla.");
    }
  }
  function restartAll() {
    setPoints(0);
    setStreak(0);
    setResolved(/* @__PURE__ */ new Set());
    setMode("rondas");
    setRoundIdx(0);
    setLog(["Bit\xE1cora reiniciada. Vuelves a la entrada del b\xFAnker."]);
    setSaveStatus("Partida reiniciada. El marcador vuelve a 0.");
  }
  const roundsList = [
    { n: 1, label: "\xDAltima Pistola", id: "ronda-0", ans: "\u2192 4" },
    { n: 2, label: "\xDAltima Daga", id: "ronda-1", ans: "\u2192 5" },
    { n: 3, label: "\xDAltimo Arco", id: "ronda-2", ans: "\u2192 6" },
    { n: 4, label: "\xDAltima Ballesta", id: "ronda-3", ans: "\u2192 -1" }
  ];
  return /* @__PURE__ */ jsxs("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "var(--bg)" }, className: "overflow-x-clip relative", children: [
    /* @__PURE__ */ jsxs("div", { "aria-hidden": true, className: "pointer-events-none absolute inset-0 overflow-hidden", children: [
      [...Array(14)].map((_, i) => /* @__PURE__ */ jsx("span", { className: "dust", style: { left: `${i * 71 % 100}%`, top: `${60 + i * 13 % 35}%`, animationDelay: `${i * 0.7}s` } }, i)),
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: "radial-gradient(600px 300px at 70% 0%, rgba(70,255,138,.10), transparent 60%), radial-gradient(500px 300px at 10% 100%, rgba(255,207,77,.06), transparent 60%)" } })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-[1500px] px-3 sm:px-5 pb-8", children: [
      /* @__PURE__ */ jsx("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)" }, className: "sticky z-20 -mx-1 px-1 pt-3 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "panel flex flex-wrap items-center gap-3 px-4 py-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsx("div", { className: "text-3xl", children: "\u{1F526}" }),
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(18px,3vw,30px)] leading-none font-bold tracking-wide [overflow-wrap:anywhere]", children: [
              "B\xDANKER ",
              /* @__PURE__ */ jsx("span", { className: "neon", children: "\u2018LA \xDALTIMA ARMA\u2019" }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline text-white/60 text-base", children: "\u2014 EXPLORADOR" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[12px] tracking-[.22em] text-[#9db8a6] mt-1", children: "EL RASTRO DEL FINAL \xB7 lastIndexOf" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ml-auto flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "chip bg-black/40", children: "SIN API \u2705" }),
          /* @__PURE__ */ jsx("span", { className: "chip bg-black/40", children: "NIVEL 19 \u{1F512}" }),
          /* @__PURE__ */ jsxs("span", { className: "chip bg-[#0a1f12] text-[#46ff8a] font-bold", children: [
            "PUNTOS: ",
            points
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "chip bg-[#221a05] text-[#ffcf4d] font-bold", children: [
            "RACHA: ",
            streak,
            " \u{1F525}"
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: restartAll, className: "chip bg-[#1a0b0e] text-white flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(RotateCcw, { size: 13 }),
            " REINICIAR"
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 lg:grid-cols-[300px_1fr_420px] items-start", children: [
        /* @__PURE__ */ jsxs("aside", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
            /* @__PURE__ */ jsxs("h2", { className: "font-bold text-lg flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Crosshair, { size: 18, className: "text-[#46ff8a]" }),
              " \u{1F3AF} RONDAS"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: roundsList.map((r) => /* @__PURE__ */ jsxs("button", { onClick: () => goRound(r.n - 1), className: `w-full text-left px-3 py-2.5 rounded-xl border flex items-center justify-between gap-2 ${challenge.id === r.id ? "border-[#46ff8a] bg-[#0a1f12]" : "border-[#1d3a28] bg-black/30 hover:bg-black/50"}`, children: [
              /* @__PURE__ */ jsxs("span", { className: "font-semibold [overflow-wrap:anywhere]", children: [
                "Ronda ",
                r.n,
                " \xB7 ",
                r.label
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "text-sm whitespace-nowrap", children: [
                resolved.has(r.id) ? "\u2705" : challenge.id === r.id ? "\u25C9" : "\u25CB",
                " ",
                resolved.has(r.id) ? r.ans : ""
              ] })
            ] }, r.id)) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-2", children: [
              /* @__PURE__ */ jsxs("button", { onClick: () => selectMode("versus"), className: `px-3 py-2.5 rounded-xl border text-left font-semibold ${mode === "versus" ? "border-[#ffcf4d] bg-[#221a05]" : "border-[#1d3a28] bg-black/30"}`, children: [
                "\u2696\uFE0F Modo PRIMERA vs \xDALTIMA ",
                /* @__PURE__ */ jsx("span", { className: "block text-xs font-normal text-[#9db8a6]", children: "indexOf \u2194 lastIndexOf \xB7 misma igualdad, direcci\xF3n opuesta" })
              ] }),
              /* @__PURE__ */ jsxs("button", { onClick: () => selectMode("infinito"), className: `px-3 py-2.5 rounded-xl border text-left font-semibold ${mode === "infinito" ? "border-[#46ff8a] bg-[#0a1f12]" : "border-[#1d3a28] bg-black/30"}`, children: [
                "\u267E\uFE0F Modo INFINITO ",
                /* @__PURE__ */ jsx("span", { className: "block text-xs font-normal text-[#9db8a6]", children: "20 armas aleatorias" })
              ] }),
              /* @__PURE__ */ jsxs("button", { onClick: () => selectMode("nivel19"), className: `px-3 py-2.5 rounded-xl border text-left font-semibold ${mode === "nivel19" ? "border-[#ff4d5e] bg-[#22100f]" : "border-[#1d3a28] bg-black/30"}`, children: [
                "\u{1F3C6} Nivel 19 \xB7 B\xFAnker grande ",
                /* @__PURE__ */ jsx("span", { className: "block text-xs font-normal text-[#9db8a6]", children: "19 armas \xB7 60 s \xB7 +20 \xB7 badge EXPLORADOR" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between text-xs text-[#9db8a6]", children: [
              /* @__PURE__ */ jsx("span", { children: "Progreso" }),
              /* @__PURE__ */ jsxs("span", { children: [
                resolved.size,
                " reto(s) resuelto(s)"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-2 bg-black/50 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#46ff8a] transition-all", style: { width: `${Math.min(100, resolved.size * 18)}%` } }) })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-bold flex gap-2 items-center", children: [
              /* @__PURE__ */ jsx(BookOpen, { size: 16 }),
              " indexOf vs lastIndexOf"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "code mt-3 text-[13px] leading-relaxed bg-black/60 border border-[#1d3a28] rounded-xl p-3 [overflow-wrap:anywhere]", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[#8dffb8]", children: "indexOf('Pistola')" }),
                " \u2192 0 ",
                /* @__PURE__ */ jsx("span", { className: "text-[#9db8a6]", children: "(primera)" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[#ffcf4d]", children: "lastIndexOf('Pistola')" }),
                " \u2192 4 ",
                /* @__PURE__ */ jsx("span", { className: "text-[#9db8a6]", children: "(\xFAltima)" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-2 text-[#9db8a6]", children: "findLastIndex(...) \u2192 4 pero con condici\xF3n, no con igualdad exacta." }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 text-white/90", children: [
                "Igualdad exacta ",
                /* @__PURE__ */ jsx("b", { children: "===" }),
                " + recorrido ",
                /* @__PURE__ */ jsx("b", { children: "\u2190\u2190\u2190" }),
                " + \xFAltima aparici\xF3n."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#9db8a6] mt-3 leading-snug", children: [
              "Error t\xEDpico: elegir la primera aparici\xF3n (confundir con ",
              /* @__PURE__ */ jsx("span", { className: "code", children: "indexOf" }),
              "). Aqu\xED manda la ",
              /* @__PURE__ */ jsx("b", { className: "text-white", children: "\xFAltima" }),
              "."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 text-xs border-t border-[#1d3a28] pt-3", children: [
              /* @__PURE__ */ jsx("div", { className: "font-bold tracking-wider text-[#46ff8a]", children: "\u{1F4D3} BIT\xC1CORA" }),
              /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-1.5 max-h-[180px] overflow-y-auto pr-1", children: log.slice(-12).map((l, i) => /* @__PURE__ */ jsx("div", { className: "text-[#cfe8d6] leading-snug [overflow-wrap:anywhere]", children: l }, i)) }),
              /* @__PURE__ */ jsx("div", { className: "mt-2 text-[#9db8a6]", children: saveStatus }),
              saved.slice(0, 3).map((s) => /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-[#9db8a6] [overflow-wrap:anywhere]", children: [
                "\xB7 Guardado: ",
                s.value?.challenge,
                " \u2014 ",
                s.value?.correct ? "\u2705" : "\u274C",
                " ",
                s.value?.delta
              ] }, s.id))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("main", { className: "space-y-4 min-w-0", children: /* @__PURE__ */ jsxs("section", { className: "panel p-4 sm:p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold text-[clamp(18px,2.5vw,24px)] tracking-wide", children: "\u{1F9F1} INVENTARIO DEL B\xDANKER" }),
            mode === "nivel19" && /* @__PURE__ */ jsxs("span", { className: "chip bg-[#22100f] text-[#ff8a94] flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Timer, { size: 13 }),
              " ",
              timeLeft,
              "s \xB7 NIVEL 19"
            ] }),
            mode === "infinito" && /* @__PURE__ */ jsxs("span", { className: "chip", children: [
              "\u267E\uFE0F RONDA ",
              infinitoSeed
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-[#9db8a6] mt-1", children: "Explorador en un b\xFAnker abandonado. Sigue el rastro desde el final." }),
          /* @__PURE__ */ jsx("div", { className: `mt-4 flex flex-wrap gap-2 ${isCorrect === false && confirmed ? "shake" : ""}`, children: challenge.inventory.map((w, i) => /* @__PURE__ */ jsxs("div", { className: `relative flex-1 min-w-[92px] max-w-[130px] rounded-2xl border px-2 py-3 text-center transition-all ${traverseIdx === i ? "border-[#46ff8a] bg-[#0a2a16] scale-[1.03]" : "border-[#26343e] bg-[#0a1115]"} ${confirmed && i === challenge.answer ? "border-[#46ff8a] bg-[#0a2a16] glow" : ""} ${confirmed && selected === i && !isCorrect ? "border-[#ff4d5e] bg-[#22100f]" : ""}`, children: [
            traverseIdx === i && /* @__PURE__ */ jsx("span", { className: "absolute -top-3 left-1/2 -translate-x-1/2 text-xl", children: "\u{1F526}" }),
            /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-[#9db8a6]", children: [
              "[",
              i,
              "]"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "text-3xl my-1", children: EMOJI[w] }),
            /* @__PURE__ */ jsx("div", { className: "font-bold text-[15px] leading-tight [overflow-wrap:anywhere]", children: w }),
            confirmed && i === challenge.answer && /* @__PURE__ */ jsx("div", { className: "text-[11px] text-[#46ff8a] font-bold mt-1", children: "\u2705 \xDALTIMA" }),
            confirmed && i === firstOccurrence && challenge.method === "lastIndexOf" && i !== challenge.answer && /* @__PURE__ */ jsx("div", { className: "text-[11px] text-[#ffcf4d] mt-1", children: "primera \xB7 no es esta" })
          ] }, i)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-2xl border border-[#46ff8a]/50 bg-[#07160d] p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "text-[12px] tracking-[.2em] text-[#46ff8a]", children: [
              "\u{1F3AF} PREGUNTA \xB7 ",
              challenge.method.toUpperCase()
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-[clamp(20px,3vw,30px)] font-bold leading-tight mt-1 [overflow-wrap:anywhere]", children: [
              "\xBFEn qu\xE9 \xCDNDICE est\xE1 la ",
              challenge.method === "indexOf" ? "PRIMERA" : "\xDALTIMA",
              " ",
              challenge.target,
              " ",
              EMOJI[challenge.target],
              "?"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#9db8a6] mt-1", children: [
              challenge.hint,
              " \xB7 Devuelve un ",
              /* @__PURE__ */ jsx("b", { className: "text-white", children: "N\xDAMERO" }),
              ", no el arma."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold tracking-wide text-sm", children: "BARRA DE \xCDNDICES \u2014 HAZ CLIC EN UN N\xDAMERO" }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-[#9db8a6]", children: [
                "Seleccionado: ",
                /* @__PURE__ */ jsx("b", { className: "text-white text-base", children: selected === null ? "\u2014" : selected })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-2", children: [
              challenge.inventory.map((_, i) => /* @__PURE__ */ jsx("button", { onClick: () => {
                if (!confirmed) {
                  setSelected(i);
                  setFeedback("");
                }
              }, disabled: confirmed, className: `min-w-[44px] h-11 px-2 rounded-xl border font-bold text-lg code ${selected === i ? "bg-[#46ff8a] text-black border-[#46ff8a]" : "bg-black/50 border-[#2a3a32] hover:border-[#46ff8a]"} ${confirmed && i === challenge.answer ? "!bg-[#46ff8a] !text-black" : ""}`, children: i }, i)),
              /* @__PURE__ */ jsx("button", { onClick: () => {
                if (!confirmed) {
                  setSelected(-1);
                  setFeedback("");
                }
              }, disabled: confirmed, className: `min-w-[52px] h-11 px-3 rounded-xl border font-bold text-lg code ${selected === -1 ? "bg-[#ff4d5e] text-white border-[#ff4d5e]" : "bg-[#22100f] border-[#5a222a] text-[#ff8a94] hover:border-[#ff4d5e]"}`, children: "-1" }),
              /* @__PURE__ */ jsx("span", { className: "self-center text-xs text-[#9db8a6] ml-1", children: "-1 = no existe" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxs("button", { onClick: runTraverse, disabled: isTraversing || confirmed, className: "flex-1 min-w-[200px] px-4 py-3 rounded-xl bg-[#46ff8a] text-black font-bold flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsx(Play, { size: 18 }),
              " \u25B6 RECORRER DESDE EL FINAL (\u2190\u2190\u2190)"
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: confirm, disabled: confirmed || selected === null, className: "flex-1 min-w-[170px] px-4 py-3 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2", children: [
              /* @__PURE__ */ jsx(Check, { size: 18 }),
              " \u2705 CONFIRMAR \xCDNDICE"
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: nextRound, className: "px-4 py-3 rounded-xl border border-[#ffcf4d] text-[#ffcf4d] font-bold flex items-center gap-2", children: [
              "\u27A1\uFE0F SIGUIENTE RONDA ",
              /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
            ] })
          ] }),
          isTraversing && /* @__PURE__ */ jsxs("div", { className: "mt-3 text-sm text-[#46ff8a]", children: [
            /* @__PURE__ */ jsx("span", { className: "blink", children: "\u{1F526}" }),
            " Cursor retrocediendo\u2026 mira el depurador y la fila."
          ] }),
          feedback && /* @__PURE__ */ jsx("div", { className: `mt-3 rounded-xl border p-3 font-semibold leading-snug [overflow-wrap:anywhere] ${isCorrect ? "border-[#46ff8a] bg-[#07160d] text-[#bfffd6]" : "border-[#ff4d5e] bg-[#1a0b0e] text-[#ffd6da]"}`, children: feedback }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-xl border border-[#26343e] bg-black/40 p-3", children: [
            /* @__PURE__ */ jsxs("label", { className: "text-sm font-bold", children: [
              "\u2328\uFE0F Escribe el c\xF3digo para +5 ",
              /* @__PURE__ */ jsx("span", { className: "text-[#9db8a6] font-normal", children: "(opcional)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-col sm:flex-row gap-2", children: [
              /* @__PURE__ */ jsx("input", { value: code, onChange: (e) => setCode(e.target.value), placeholder: `Ej: inventario.${challenge.method}('${challenge.target}')`, className: "code flex-1 min-w-0 bg-[#071009] border border-[#1d3a28] rounded-xl px-3 py-2.5 text-[14px] outline-none focus:border-[#46ff8a] [overflow-wrap:anywhere]" }),
              /* @__PURE__ */ jsx("button", { onClick: validateCode, className: "px-4 py-2.5 rounded-xl bg-[#1d3a28] font-bold whitespace-nowrap", children: "VALIDAR +5" })
            ] }),
            codeMsg && /* @__PURE__ */ jsx("p", { className: "text-sm mt-2 [overflow-wrap:anywhere]", children: codeMsg }),
            /* @__PURE__ */ jsx("button", { onClick: () => setShowCode(!showCode), className: "mt-2 text-sm text-[#46ff8a] underline underline-offset-2", children: showCode ? "Ocultar c\xF3digo revelado" : "Ver c\xF3digo revelado (despu\xE9s de intentar)" }),
            showCode && /* @__PURE__ */ jsxs("div", { className: "code mt-2 bg-black/70 border border-[#1d3a28] rounded-lg p-3 text-[13px] [overflow-wrap:anywhere]", children: [
              "inventario.",
              challenge.method,
              "('",
              challenge.target,
              "') // \u2192 ",
              challenge.answer,
              /* @__PURE__ */ jsx("br", {}),
              "inventario.lastIndexOf('Ballesta') // \u2192 -1"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid sm:grid-cols-3 gap-2 text-center text-[13px]", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-black/40 border border-[#1d3a28] px-2 py-2", children: [
              "\u2705 Acierto ",
              /* @__PURE__ */ jsx("b", { children: "+10" }),
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-[#9db8a6]", children: "(Nivel 19: +20)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-black/40 border border-[#1d3a28] px-2 py-2", children: [
              "\u26A0\uFE0F Primera aparici\xF3n ",
              /* @__PURE__ */ jsx("b", { className: "text-[#ffcf4d]", children: "-5" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-black/40 border border-[#1d3a28] px-2 py-2", children: [
              "\u274C Otro error ",
              /* @__PURE__ */ jsx("b", { className: "text-[#ff4d5e]", children: "-3" }),
              " \xB7 C\xF3digo +5 \xB7 Recorrer +5"
            ] })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxs("aside", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
            /* @__PURE__ */ jsxs("h2", { className: "font-bold flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(TerminalSquare, { size: 18, className: "text-[#46ff8a]" }),
              " DEPURADOR AVANZADO: .",
              challenge.method,
              "()"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 bg-black rounded-xl border border-[#1d3a28] p-3 min-h-[320px] max-h-[520px] overflow-y-auto", children: /* @__PURE__ */ jsxs("div", { className: "code text-[12.5px] leading-[1.7] space-y-1.5", children: [
              debugLines.map((l, i) => /* @__PURE__ */ jsx("div", { className: `${l.includes("\u2705") ? "text-[#46ff8a]" : l.includes("\u{1F9E0}") ? "text-[#ffcf4d]" : l.includes("\u2696\uFE0F") ? "text-[#8dffb8]" : "text-[#cfe8d6]"} [overflow-wrap:anywhere]`, children: l }, i)),
              /* @__PURE__ */ jsx("div", { className: "text-[#46ff8a] blink", children: "\u258A" })
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxs("button", { onClick: runTraverse, disabled: isTraversing || confirmed, className: "px-3 py-2.5 rounded-xl bg-[#46ff8a] text-black font-bold text-sm flex items-center justify-center gap-1", children: [
                /* @__PURE__ */ jsx(Search, { size: 15 }),
                " RECORRER"
              ] }),
              /* @__PURE__ */ jsx("button", { onClick: () => setDebugLines(buildDebug(selected)), className: "px-3 py-2.5 rounded-xl border border-[#1d3a28] font-bold text-sm", children: "VER TRAZA COMPLETA" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border border-[#1d3a28] bg-black/40 p-3", children: [
              /* @__PURE__ */ jsx("div", { className: "text-xs tracking-widest text-[#9db8a6]", children: "\u2696\uFE0F COMPARACI\xD3N SIEMPRE VISIBLE" }),
              /* @__PURE__ */ jsx("div", { className: "code text-[13px] mt-1 [overflow-wrap:anywhere]", children: comparison }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-[#9db8a6] mt-1", children: [
                "findLastIndex(...) \u2192 ",
                challenge.answer,
                " pero con condici\xF3n."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 text-sm leading-snug text-[#9db8a6]", children: [
              "\u{1F9E0} ",
              /* @__PURE__ */ jsx("b", { className: "text-white", children: "C\xF3mo funciona:" }),
              " compara con ",
              /* @__PURE__ */ jsx("span", { className: "code text-white", children: "===" }),
              ", de atr\xE1s hacia adelante, y se detiene en la primera coincidencia desde la derecha. Si no hay ninguna, devuelve ",
              /* @__PURE__ */ jsx("b", { className: "text-white", children: "-1" }),
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-bold flex gap-2 items-center", children: [
              /* @__PURE__ */ jsx(Shield, { size: 16, className: "text-[#ffcf4d]" }),
              " \u{1FA96} GU\xCDA DEL EXPLORADOR"
            ] }),
            /* @__PURE__ */ jsxs("ul", { className: "mt-2 text-sm space-y-2 text-[#cfe8d6] leading-snug", children: [
              /* @__PURE__ */ jsx("li", { children: "1. Lee la pregunta: \xBFprimera o \xFAltima?" }),
              /* @__PURE__ */ jsxs("li", { children: [
                "2. Si dudas, pulsa ",
                /* @__PURE__ */ jsx("b", { children: "RECORRER" }),
                " y observa el cursor \u{1F526}."
              ] }),
              /* @__PURE__ */ jsx("li", { children: "3. Elige el n\xFAmero, no el arma." }),
              /* @__PURE__ */ jsxs("li", { children: [
                "4. Si el arma no existe, elige ",
                /* @__PURE__ */ jsx("b", { children: "-1" }),
                "."
              ] }),
              /* @__PURE__ */ jsx("li", { children: "5. Escribe el c\xF3digo para ganar +5." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-lg bg-[#221a05] border border-[#5a4a1a] p-3 text-sm", children: [
              /* @__PURE__ */ jsx("b", { className: "text-[#ffcf4d]", children: "Pista del b\xFAnker:" }),
              " En la Ronda 1 hay Pistolas en 0, 2 y 4. La \xFAltima es la que est\xE1 m\xE1s a la derecha."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-bold flex gap-2 items-center", children: [
              /* @__PURE__ */ jsx(Trophy, { size: 16 }),
              " \u{1F3C6} MARCADOR"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex-1 rounded-xl bg-black/50 border border-[#1d3a28] p-3 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-[#46ff8a]", children: points }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-[#9db8a6]", children: "PUNTOS" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 rounded-xl bg-black/50 border border-[#1d3a28] p-3 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold text-[#ffcf4d]", children: streak }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-[#9db8a6]", children: "RACHA" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex-1 rounded-xl bg-black/50 border border-[#1d3a28] p-3 text-center", children: [
                /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold", children: resolved.size }),
                /* @__PURE__ */ jsx("div", { className: "text-xs text-[#9db8a6]", children: "RESUELTOS" })
              ] })
            ] }),
            resolved.has("nivel-19") && /* @__PURE__ */ jsx("div", { className: "mt-2 text-center font-bold text-[#ffcf4d]", children: "\u{1F3C5} BADGE: EXPLORADOR NIVEL 19" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9db8a6] mt-2", children: "Cada ronda confirmada se guarda en la bit\xE1cora. Puedes seguir jugando en Infinito." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("footer", { className: "mt-5 text-center text-xs text-[#9db8a6]", children: "B\xFAnker \u2018La \xDAltima Arma\u2019 \xB7 lastIndexOf devuelve un N\xDAMERO \xB7 Igualdad exacta === \xB7 Recorrido \u2190\u2190\u2190 \xB7 \xDAltima aparici\xF3n" })
    ] })
  ] });
}
export {
  App as default
};
