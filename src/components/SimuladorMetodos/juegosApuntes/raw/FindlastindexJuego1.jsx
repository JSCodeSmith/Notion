/* Convertido automáticamente desde Apuntes/findIndex  , findLast  findLastIndex indexOf   lastIndexOf/findLastIndex.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
const S = (hora, genero, tresD) => ({ hora, genero, tresD });
const baseShows = [S("12:00", "Acci\xF3n", false), S("15:00", "Terror", true), S("18:00", "Comedia", false), S("21:00", "Terror", false), S("23:30", "Acci\xF3n", true)];
const LEVELS = [
  { id: "r1", short: "Ronda 1", title: "\xDAltima de terror", shows: baseShows, base: 10, stages: [{ question: "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xFAltima funci\xF3n de terror?", code: `funciones.findLastIndex(f => f.genero === "terror")`, answer: 3, expected: [`f=>f.genero==='terror'`, `f=>f.genero==="terror"`], check: (f) => f.genero === "Terror" }] },
  { id: "r2", short: "Ronda 2", title: "\xDAltima en 3D", shows: [S("12:00", "Acci\xF3n", false), S("14:00", "Comedia", true), S("16:00", "Terror", false), S("18:00", "Acci\xF3n", false), S("20:00", "Terror", true), S("22:00", "Comedia", false)], base: 10, stages: [{ question: "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xFAltima funci\xF3n en 3D?", code: `funciones.findLastIndex(f => f.tresD)`, answer: 4, expected: [`f=>f.tresD`, `f=>f.tresD===true`], check: (f) => f.tresD }] },
  { id: "r3", short: "Ronda 3", title: "\xDAltima de acci\xF3n", shows: [S("12:00", "Terror", false), S("14:00", "Comedia", true), S("16:00", "Acci\xF3n", false), S("18:00", "Terror", true), S("20:00", "Comedia", false), S("22:00", "Acci\xF3n", true)], base: 10, stages: [{ question: "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xFAltima funci\xF3n de acci\xF3n?", code: `funciones.findLastIndex(f => f.genero === "accion")`, answer: 5, expected: [`f=>f.genero==='accion'`], check: (f) => f.genero === "Acci\xF3n" }] },
  { id: "r4", short: "Ronda 4", title: "\xDAltima antes de las 22:00", shows: baseShows, base: 10, stages: [{ question: "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xFAltima funci\xF3n antes de las 22:00?", code: `funciones.findLastIndex(f => parseInt(f.hora) < 22)`, answer: 3, expected: [`f=>parseint(f.hora)<22`], check: (f) => parseInt(f.hora) < 22 }] },
  { id: "vs", short: "Primera vs \xDAltima", title: "Misma cartelera, direcci\xF3n opuesta", shows: baseShows, base: 10, stages: [
    { question: "Pregunta 1 \xB7 \xBF\xCDNDICE de la PRIMERA de terror?", code: `funciones.findIndex(f => f.genero === "terror")`, answer: 1, expected: [`f=>f.genero==='terror'`], check: (f) => f.genero === "Terror" },
    { question: "Pregunta 2 \xB7 \xBF\xCDNDICE de la \xDALTIMA de terror?", code: `funciones.findLastIndex(f => f.genero === "terror")`, answer: 3, expected: [`f=>f.genero==='terror'`], check: (f) => f.genero === "Terror" }
  ] },
  { id: "minus", short: "Modo -1", title: "La regla imposible", shows: [S("12:00", "Terror", false), S("14:00", "Acci\xF3n", true), S("16:00", "Terror", false), S("19:00", "Terror", true), S("21:00", "Comedia", true)], base: 10, special: "-1", stages: [{ question: "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xFAltima de terror en 3D y antes de las 18:00?", code: `funciones.findLastIndex(f => f.genero === "terror" && f.tresD && parseInt(f.hora) < 18)`, answer: -1, expected: [`f=>f.genero==='terror'&&f.tresd&&parseint(f.hora)<18`], check: (f) => f.genero === "Terror" && f.tresD && parseInt(f.hora) < 18 }] },
  { id: "time", short: "Contrarreloj", title: "8 segundos, jefe", shows: baseShows, base: 10, timeLimit: 8, stages: [{ question: "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xFAltima funci\xF3n de terror?", code: `funciones.findLastIndex(f => f.genero === "terror")`, answer: 3, expected: [`f=>f.genero==='terror'`], check: (f) => f.genero === "Terror" }] },
  { id: "boss", short: "Nivel 19", title: "JEFE NIVEL 19", shows: [S("12:00", "Acci\xF3n", false), S("13:00", "Terror", true), S("14:00", "Comedia", false), S("15:00", "Terror", false), S("16:00", "Acci\xF3n", true), S("17:00", "Terror", true), S("18:00", "Comedia", true), S("19:00", "Acci\xF3n", false), S("20:00", "Terror", false), S("20:30", "Comedia", false), S("21:00", "Terror", true), S("21:30", "Acci\xF3n", true), S("22:00", "Comedia", false), S("22:30", "Terror", false), S("23:00", "Acci\xF3n", false), S("23:30", "Comedia", true), S("23:45", "Terror", true), S("23:50", "Acci\xF3n", false), S("23:55", "Comedia", false)], base: 20, timeLimit: 60, stages: [{ question: "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xFAltima de terror en 3D despu\xE9s de las 20:00?", code: `funciones.findLastIndex(f => f.genero === "terror" && f.tresD && parseInt(f.hora) >= 20)`, answer: 16, expected: [`f=>f.genero==='terror'&&f.tresd&&parseint(f.hora)>=20`], check: (f) => f.genero === "Terror" && f.tresD && parseInt(f.hora) >= 20 }] }
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const norm = (v) => v.toLowerCase().replace(/\s+/g, "").replace(/[""]/g, "'").replace(/á/g, "a").replace(/ó/g, "o");
async function api(action, args) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  if (!res.ok) throw new Error(`La conexi\xF3n devolvi\xF3 ${res.status}`);
  return await res.json();
}
function App() {
  const [levelId, setLevelId] = useState("r1");
  const [stageIdx, setStageIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [usedScan, setUsedScan] = useState(false);
  const [condition, setCondition] = useState("");
  const [conditionOk, setConditionOk] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [success, setSuccess] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState([]);
  const [log, setLog] = useState(["\u{1F3AC} Turno de noche en \u201CEl \xDAltimo Pase\u201D. El jefe pide \xEDndices, no pel\xEDculas."]);
  const [debug, setDebug] = useState(["> Depurador listo. Pulsa RECORRER o CONFIRMAR para ver el recorrido inverso."]);
  const [scanIdx, setScanIdx] = useState(null);
  const [busy, setBusy] = useState(false);
  const [shake, setShake] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [timedOut, setTimedOut] = useState(false);
  const [showRestart, setShowRestart] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Sincronizando progreso\u2026");
  const [recordId, setRecordId] = useState(null);
  const loadedRef = useRef(false);
  const saveTimer = useRef(void 0);
  const barRef = useRef(null);
  const dragRef = useRef(false);
  const level = LEVELS.find((l) => l.id === levelId);
  const stage = level.stages[stageIdx];
  const firstMatch = level.shows.findIndex(stage.check);
  const foundShow = stage.answer >= 0 ? level.shows[stage.answer] : null;
  const progressKey = level.id + (level.stages.length > 1 ? `:${stageIdx}` : "");
  const pushLog = (s) => setLog((v) => [s, ...v].slice(0, 14));
  const addDebug = (s) => setDebug((v) => [...v, s].slice(-30));
  useEffect(() => {
    (async () => {
      try {
        const r = await api("records.list", { collection: "progreso-findlastindex" });
        if (r.error) throw new Error(r.error);
        const rec = r.data?.records?.[0];
        if (rec) {
          setRecordId(rec.id);
          const v = rec.value || {};
          setScore(v.points || 0);
          setStreak(v.streak || 0);
          setSolved(v.solved || []);
          if (v.log?.length) setLog(v.log);
          setSaveStatus("Progreso guardado");
        } else setSaveStatus("Progreso listo para guardarse");
      } catch {
        setSaveStatus("Sin conexi\xF3n: el progreso no se guardar\xE1 hasta reconectar");
      }
      loadedRef.current = true;
    })();
  }, []);
  const persist = (next) => {
    if (!loadedRef.current) return;
    window.clearTimeout(saveTimer.current);
    saveTimer.current = window.setTimeout(async () => {
      try {
        setSaveStatus("Guardando\u2026");
        const payload = { points: next.points, streak: next.streak, solved: next.solved, log: next.log };
        if (recordId) {
          const r = await api("records.replace", { collection: "progreso-findlastindex", id: recordId, value: payload });
          if (r.error) throw new Error(r.error);
        } else {
          const r = await api("records.create", { collection: "progreso-findlastindex", value: payload });
          if (r.error) throw new Error(r.error);
          if (r.data?.id) setRecordId(r.data.id);
        }
        setSaveStatus("Progreso guardado");
      } catch (e) {
        setSaveStatus("No se pudo guardar el progreso");
      }
    }, 350);
  };
  const commit = (points, streakV, solvedV, logV) => {
    persist({ points, streak: streakV, solved: solvedV, log: logV });
  };
  const chooseLevel = (id) => {
    const l = LEVELS.find((x) => x.id === id);
    setLevelId(id);
    setStageIdx(0);
    setSelected(null);
    setUsedScan(false);
    setCondition("");
    setConditionOk(false);
    setResolved(false);
    setSuccess(null);
    setFeedback("");
    setScanIdx(null);
    setTimedOut(false);
    setTimeLeft(l.timeLimit ?? null);
    setDebug([`> Nuevo nivel: ${l.title}`, `> Cartelera cargada con ${l.shows.length} funciones.`]);
  };
  useEffect(() => {
    setTimeLeft(level.timeLimit ?? null);
  }, [levelId, stageIdx]);
  useEffect(() => {
    if (timeLeft === null || resolved || timedOut || busy) return;
    if (timeLeft <= 0) {
      setTimedOut(true);
      setSuccess(false);
      setFeedback("\xA1Se acab\xF3 el tiempo! El jefe quer\xEDa el \xEDndice ya.");
      const np = Math.max(0, score - 3);
      const nl = [`\u23F1 Tiempo agotado en ${level.short}: \u22123 puntos.`, ...log].slice(0, 14);
      setScore(np);
      setStreak(0);
      setLog(nl);
      commit(np, 0, solved, nl);
      setDebug((v) => [...v, "> \u23F1 Tiempo agotado antes de confirmar.", "> El recorrido no se complet\xF3 a tiempo."]);
      return;
    }
    const t = window.setTimeout(() => setTimeLeft((v) => (v ?? 0) - 1), 1e3);
    return () => window.clearTimeout(t);
  }, [timeLeft, resolved, timedOut]);
  const indexFromPointer = (clientX) => {
    const el = barRef.current;
    if (!el) return 0;
    const r = el.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (clientX - r.left) / r.width));
    return Math.round(ratio * (level.shows.length - 1));
  };
  const checkCondition = () => {
    const ok = stage.expected.some((e) => norm(condition) === norm(e));
    setConditionOk(ok);
    if (condition.trim()) {
      setFeedback(ok ? "\u2705 Condici\xF3n correcta: +5 si aciertas esta ronda." : "La condici\xF3n escrita no coincide exactamente con la esperada. Puedes intentarlo de nuevo antes de confirmar.");
    }
  };
  const runDebugger = async () => {
    setDebug([`> Ejecutando ${stage.code}`, "[Iteraci\xF3n desde el final]"]);
    for (let i = level.shows.length - 1; i >= 0; i--) {
      const f = level.shows[i];
      const ok = stage.check(f);
      setScanIdx(i);
      addDebug(`[${i}] ${f.hora} ${f.genero} ${f.tresD ? "3D" : "2D"} \u2014 condici\xF3n? ${ok} \u2192 ${ok ? "\u2705 \xA1ENCONTRADO! Se detiene aqu\xED." : "sigue"}`);
      await sleep(600);
      if (ok) break;
      if (i === 0) addDebug("Revis\xF3 todas de atr\xE1s hacia adelante, ninguna cumpli\xF3 \u2192 devuelve -1.");
    }
    await sleep(250);
    setScanIdx(null);
    if (stage.answer >= 0) {
      addDebug("\u{1F9E0} Depurador: findLastIndex recorre de ATR\xC1S hacia ADELANTE. No revis\xF3 los \xEDndices anteriores porque ya encontr\xF3 el \xFAltimo.");
      addDebug(`> Resultado: ${stage.answer} \u2190 Es un N\xDAMERO, no un objeto.`);
    } else {
      addDebug("\u{1F9E0} Depurador: revis\xF3 todas, ninguna cumpli\xF3. findLast devolver\xEDa undefined; findLastIndex devuelve -1 porque devuelve un \xEDndice.");
      addDebug("> Resultado: -1 \u2190 \u201CNo encontrado\u201D para \xEDndices.");
    }
    addDebug(`\u2696\uFE0F Comparaci\xF3n: findLast(...) \u2192 OBJETO ${stage.answer >= 0 ? JSON.stringify(foundShow) : "undefined"} | findLastIndex(...) \u2192 N\xDAMERO ${stage.answer}`);
    addDebug(`\u2696\uFE0F vs findIndex: findIndex dar\xEDa ${firstMatch} (primero desde el inicio), findLastIndex da ${stage.answer} (\xFAltimo desde el final).`);
  };
  const scan = async () => {
    if (busy || resolved) return;
    setBusy(true);
    setUsedScan(true);
    await runDebugger();
    setBusy(false);
  };
  const confirm = async () => {
    if (busy || resolved || timedOut) return;
    if (selected === null) {
      setFeedback("Elige un \xEDndice en la barra o pulsa \u22121 si crees que no hay coincidencia.");
      return;
    }
    setBusy(true);
    await runDebugger();
    let delta = 0;
    let ok = false;
    let msg = "";
    let newStreak = streak;
    if (selected === stage.answer) {
      ok = true;
      delta = level.base + (usedScan ? 5 : 0) + (conditionOk ? 5 : 0);
      newStreak = streak + 1;
      msg = level.id === "boss" ? `\u2705 \xA1Jefe de sala! \xCDndice ${selected} correcto. +${delta} puntos.` : `\u2705 Correcto. El \xEDndice es ${selected}. +${delta} puntos.`;
      if (usedScan) msg += " Incluye +5 por usar Recorrer.";
      if (conditionOk) msg += " Incluye +5 por la condici\xF3n.";
    } else if (selected === firstMatch && firstMatch !== stage.answer && stage.answer >= 0) {
      delta = -5;
      newStreak = 0;
      msg = `Esa tambi\xE9n cumple, pero findLastIndex busca desde el FINAL. El \xEDndice correcto es ${stage.answer}, no ${selected}.`;
    } else if (selected === -1 && stage.answer !== -1) {
      delta = -3;
      newStreak = 0;
      msg = `Hay una coincidencia en la cartelera, as\xED que no es \u22121. El \xEDndice correcto es ${stage.answer}.`;
    } else {
      delta = -3;
      newStreak = 0;
      msg = `La funci\xF3n en el \xEDndice ${selected} no cumple la regla.`;
    }
    const np = Math.max(0, score + delta);
    const isSolved = ok;
    const solvedNext = isSolved && !solved.includes(progressKey) ? [...solved, progressKey] : solved;
    setScore(np);
    setStreak(newStreak);
    setSuccess(ok);
    setResolved(ok);
    setFeedback(msg);
    if (!ok) setShake(true);
    const nl = [`${ok ? "\u2705" : "\u274C"} ${level.short}${level.stages.length > 1 ? ` \xB7 Pregunta ${stageIdx + 1}` : ""}: ${ok ? `+${delta}` : `${delta}`} puntos (\xEDndice ${selected}).`, ...log].slice(0, 14);
    setLog(nl);
    if (isSolved) setSolved(solvedNext);
    commit(np, newStreak, solvedNext, nl);
    if (ok && level.stages.length > 1 && stageIdx < level.stages.length - 1) {
      window.setTimeout(() => {
        setStageIdx(stageIdx + 1);
        setSelected(null);
        setUsedScan(false);
        setCondition("");
        setConditionOk(false);
        setResolved(false);
        setSuccess(null);
        setFeedback("Primera pregunta superada. Ahora cambia la direcci\xF3n: busca desde el final.");
        setDebug((v) => [...v, "> Siguiente pregunta: cambia la direcci\xF3n del recorrido."]);
      }, 1600);
    }
    setBusy(false);
    window.setTimeout(() => setShake(false), 500);
  };
  const nextLevel = () => {
    const i = LEVELS.findIndex((l) => l.id === levelId);
    if (i < LEVELS.length - 1) chooseLevel(LEVELS[i + 1].id);
  };
  const restart = async () => {
    setShowRestart(false);
    setScore(0);
    setStreak(0);
    setSolved([]);
    const nl = ["\u{1F504} Sala reiniciada. El jefe vuelve a pedir el primer \xEDndice."];
    setLog(nl);
    commit(0, 0, [], nl);
    chooseLevel("r1");
  };
  const markerLeft = useMemo(() => selected === null ? 0 : selected === -1 ? -6 : selected / Math.max(1, level.shows.length - 1) * 100, [selected, level]);
  return /* @__PURE__ */ jsxs("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "var(--bg)" }, className: "overflow-x-clip", children: [
    /* @__PURE__ */ jsx("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)" }, className: "sticky z-30 border-b border-[#1e2e4d] bg-[#030508]/95 backdrop-blur", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-[1500px] px-3 py-3 sm:px-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(1.25rem,3.4vw,2rem)] font-bold leading-none tracking-wide", children: [
          /* @__PURE__ */ jsx("span", { className: "pink", children: "\u{1F3AC} CINE \u201CEL \xDALTIMO PASE\u201D" }),
          " ",
          /* @__PURE__ */ jsx("span", { className: "neon", children: "\u2014 JEFE DE SALA" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mono mt-1 text-[11px] sm:text-xs text-[#9cb1cf]", children: "FINDLASTINDEX // DEVUELVE UN N\xDAMERO, NO UN OBJETO" })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "rounded-full border border-emerald-400/50 bg-emerald-400/10 px-2 py-1 text-xs font-bold text-emerald-300", children: "SIN API \u2705" }),
      /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-cyan-400/50 bg-cyan-400/10 px-3 py-1 text-sm font-bold", children: [
        "PUNTOS: ",
        /* @__PURE__ */ jsx("b", { className: "neon", children: score })
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-pink-500/50 bg-pink-500/10 px-3 py-1 text-sm font-bold", children: [
        "RACHA: ",
        streak,
        " \u{1F525}"
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[1500px] px-3 py-4 sm:px-5 sm:py-6", children: [
      /* @__PURE__ */ jsxs("section", { className: "panel mb-4 overflow-hidden p-4 sm:p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold tracking-[.22em] text-cyan-300", children: "EL CORAZ\xD3N DEL JUEGO" }),
            /* @__PURE__ */ jsxs("h2", { className: "mt-1 text-[clamp(1.4rem,4vw,2.4rem)] font-bold leading-tight", children: [
              "Se\xF1ala una ",
              /* @__PURE__ */ jsx("span", { className: "neon", children: "POSICI\xD3N" }),
              ", no un objeto."
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mono text-xs text-[#9cb1cf]", children: "Recorrido inverso \xB7 derecha \u2192 izquierda" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-3 md:grid-cols-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-[#1e2e4d] bg-black/30 p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-pink-400", children: "findLast" }),
            /* @__PURE__ */ jsx("p", { className: "mono mt-1 text-xs", children: "\u2192 devuelve el VALOR / OBJETO" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-cyan-400 bg-cyan-400/10 p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-cyan-300", children: "findLastIndex \u2605" }),
            /* @__PURE__ */ jsx("p", { className: "mono mt-1 text-xs", children: "\u2192 devuelve la POSICI\xD3N / N\xDAMERO" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-[#1e2e4d] bg-black/30 p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-amber-300", children: "findIndex" }),
            /* @__PURE__ */ jsx("p", { className: "mono mt-1 text-xs", children: "\u2192 busca desde el INICIO" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid items-start gap-4 lg:grid-cols-[300px_1fr_420px]", children: [
        /* @__PURE__ */ jsxs("aside", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: "\u{1F39F} NIVELES" }),
              /* @__PURE__ */ jsxs("span", { className: "mono text-xs text-emerald-300", children: [
                solved.length,
                " resueltos"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: LEVELS.map((l) => {
              const done = l.stages.some((_, i) => solved.includes(l.id + (l.stages.length > 1 ? `:${i}` : "")));
              const active = l.id === levelId;
              return /* @__PURE__ */ jsxs("button", { onClick: () => chooseLevel(l.id), className: `w-full rounded-xl border px-3 py-2.5 text-left transition ${active ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_22px_rgba(56,232,255,.18)]" : "border-[#1e2e4d] bg-black/20 hover:border-cyan-400/50"}`, children: [
                /* @__PURE__ */ jsxs("span", { className: "flex justify-between gap-2", children: [
                  /* @__PURE__ */ jsx("b", { children: l.short }),
                  /* @__PURE__ */ jsx("span", { children: done ? "\u2705" : active ? "\u25B6" : "" })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "block text-sm text-[#9cb1cf]", children: l.title })
              ] }, l.id);
            }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-xl border border-pink-500/30 bg-pink-500/5 p-3", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-pink-300", children: "findLast vs findLastIndex" }),
              /* @__PURE__ */ jsxs("p", { className: "mono mt-2 text-[11px] leading-5", children: [
                "findLast(...) \u2192 OBJETO",
                /* @__PURE__ */ jsx("br", {}),
                "findLastIndex(...) \u2192 N\xDAMERO",
                /* @__PURE__ */ jsx("br", {}),
                /* @__PURE__ */ jsx("span", { className: "text-emerald-300", children: "Uno entrega la pel\xEDcula. El otro, su butaca." })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold", children: "\u{1F4D3} BIT\xC1CORA" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-[#9cb1cf]", children: saveStatus }),
            /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-2", children: log.map((x, i) => /* @__PURE__ */ jsx("li", { className: "rounded-lg bg-black/25 px-2.5 py-2 text-sm leading-snug", children: x }, i)) }),
            !showRestart ? /* @__PURE__ */ jsx("button", { onClick: () => setShowRestart(true), className: "mt-3 w-full rounded-lg border border-red-400/50 py-2 font-bold text-red-300", children: "\u21BA REINICIAR SALA" }) : /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-lg border border-red-400/40 p-2 text-center text-sm", children: [
              "\xBFBorrar puntos y niveles?",
              /* @__PURE__ */ jsxs("div", { className: "mt-2 flex gap-2", children: [
                /* @__PURE__ */ jsx("button", { onClick: restart, className: "flex-1 rounded-md bg-red-500 py-2 font-bold", children: "S\xED, reiniciar" }),
                /* @__PURE__ */ jsx("button", { onClick: () => setShowRestart(false), className: "flex-1 rounded-md border py-2", children: "Cancelar" })
              ] })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: `panel p-4 sm:p-5 ${shake ? "shake" : ""}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold tracking-wide", children: "\u{1F3AC} CARTELERA" }),
            timeLeft !== null && /* @__PURE__ */ jsxs("div", { className: `mono rounded-xl border px-3 py-2 text-xl font-bold ${timeLeft <= 5 ? "border-red-400 bg-red-500/15 text-red-300" : "border-amber-300 bg-amber-300/10 text-amber-200"}`, children: [
              "\u23F1 ",
              timeLeft,
              "s"
            ] }),
            level.id === "boss" && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-yellow-300 px-3 py-1 text-xs font-black text-black", children: "\u{1F451} JEFE NIVEL 19 \xB7 +20" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-[#9cb1cf]", children: [
            "Orden cronol\xF3gico \xB7 ",
            level.title,
            " \xB7 Pregunta ",
            stageIdx + 1,
            " de ",
            level.stages.length
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5", children: level.shows.map((f, i) => {
            const isSel = selected === i;
            const isScan = scanIdx === i;
            const isRight = resolved && success && selected === i;
            return /* @__PURE__ */ jsxs("article", { className: `relative min-w-0 rounded-2xl border p-3 text-center transition ${isRight ? "correct-card" : isSel ? "border-cyan-300 bg-cyan-400/10" : isScan ? "border-yellow-300 bg-yellow-300/10 scanning" : "border-[#1e2e4d] bg-[#0a101d]"}`, children: [
              /* @__PURE__ */ jsxs("div", { className: "mono text-2xl font-bold text-cyan-300", children: [
                "[",
                i,
                "]"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 text-xl font-bold", children: f.hora }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm font-semibold", children: f.genero }),
              /* @__PURE__ */ jsx("div", { className: `mono mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] ${f.tresD ? "bg-fuchsia-500/20 text-fuchsia-200" : "bg-slate-500/20 text-slate-300"}`, children: f.tresD ? "3D" : "2D" }),
              isScan && /* @__PURE__ */ jsx("div", { className: "mt-2 text-xs text-yellow-300", children: "\u25C0 revisando\u2026" })
            ] }, i);
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-6 rounded-2xl border border-cyan-400/40 bg-cyan-400/5 p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold tracking-[.2em] text-cyan-300", children: "REGLA DEL JEFE" }),
            /* @__PURE__ */ jsxs("h3", { className: "mt-1 text-[clamp(1.25rem,3vw,1.8rem)] font-bold leading-snug", children: [
              "\u{1F3AF} ",
              stage.question
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-[#9cb1cf]", children: [
              "Responde con un ",
              /* @__PURE__ */ jsx("b", { className: "text-white", children: "N\xDAMERO" }),
              ". Arrastra el marcador \u{1F446} o pulsa un \xEDndice."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-2 flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("b", { children: "BARRA DE \xCDNDICES" }),
              /* @__PURE__ */ jsx("span", { className: "mono text-xs text-[#9cb1cf]", children: selected === null ? "Sin selecci\xF3n" : selected === -1 ? "Seleccionado: \u22121" : `Seleccionado: ${selected}` })
            ] }),
            /* @__PURE__ */ jsxs("div", { ref: barRef, className: "no-select relative h-16 rounded-2xl border border-[#1e2e4d] bg-black/40 px-2", onPointerDown: (e) => {
              if (resolved || busy) return;
              dragRef.current = true;
              e.target.setPointerCapture?.(e.pointerId);
              setSelected(indexFromPointer(e.clientX));
            }, onPointerMove: (e) => {
              if (dragRef.current) setSelected(indexFromPointer(e.clientX));
            }, onPointerUp: () => dragRef.current = false, onPointerCancel: () => dragRef.current = false, children: [
              /* @__PURE__ */ jsx("div", { className: "absolute left-2 right-2 top-1/2 h-1 -translate-y-1/2 rounded bg-[#24385f]" }),
              /* @__PURE__ */ jsx("div", { className: "absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between", children: level.shows.map((_, i) => /* @__PURE__ */ jsx("button", { "aria-label": `Elegir \xEDndice ${i}`, onClick: (e) => {
                e.stopPropagation();
                if (!resolved && !busy) setSelected(i);
              }, className: `z-10 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold sm:h-11 sm:w-11 ${selected === i ? "border-cyan-300 bg-cyan-400 text-black shadow-[0_0_20px_#38e8ff]" : resolved && success && selected === i ? "border-emerald-400 bg-emerald-400 text-black" : "border-[#3a527f] bg-[#0a101d] text-white hover:border-cyan-300"}`, children: i }, i)) }),
              /* @__PURE__ */ jsx("div", { className: "pointer-events-none absolute -top-1 z-20 text-2xl transition-all", style: { left: `calc(${selected === null ? 0 : markerLeft}% + ${selected === null ? 8 : selected === -1 ? 0 : 8}px)` }, children: "\u{1F446}" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-xs text-[#9cb1cf]", children: "Arrastra el marcador sobre la barra. En m\xF3vil, desliza el dedo." })
          ] }),
          level.special === "-1" && /* @__PURE__ */ jsx("button", { onClick: () => setSelected(-1), className: `mt-4 w-full rounded-xl border-2 py-3 text-xl font-black ${selected === -1 ? "border-red-400 bg-red-500 text-white" : "border-red-400/60 bg-red-500/10 text-red-200"}`, children: "\u22121 \xB7 NINGUNA CUMPLE LA REGLA" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 sm:grid-cols-3", children: [
            /* @__PURE__ */ jsx("button", { onClick: scan, disabled: busy || resolved, className: "rounded-xl bg-cyan-400 px-3 py-3 font-bold text-black", children: "\u25B6 RECORRER DESDE EL FINAL" }),
            /* @__PURE__ */ jsx("button", { onClick: confirm, disabled: busy || resolved || timedOut, className: "rounded-xl bg-emerald-400 px-3 py-3 font-bold text-black", children: "\u2705 CONFIRMAR \xCDNDICE" }),
            /* @__PURE__ */ jsx("button", { onClick: nextLevel, disabled: levelId === "boss", className: "rounded-xl border border-fuchsia-400/60 bg-fuchsia-500/10 px-3 py-3 font-bold text-fuchsia-200", children: "\u27A1\uFE0F SIGUIENTE" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-xl border border-[#1e2e4d] bg-black/25 p-3", children: [
            /* @__PURE__ */ jsxs("label", { className: "text-sm font-bold", children: [
              "\u270D\uFE0F Escribe la condici\xF3n para +5 ",
              /* @__PURE__ */ jsx("span", { className: "font-normal text-[#9cb1cf]", children: "(opcional)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-col gap-2 sm:flex-row", children: [
              /* @__PURE__ */ jsx("input", { value: condition, onChange: (e) => setCondition(e.target.value), placeholder: "ej: f => f.genero === 'terror'", className: "mono min-w-0 flex-1 rounded-lg border border-[#2b4270] bg-[#030508] px-3 py-2.5 text-sm outline-none focus:border-cyan-400" }),
              /* @__PURE__ */ jsx("button", { onClick: checkCondition, className: "rounded-lg border border-cyan-400/60 px-4 py-2.5 font-bold text-cyan-200", children: "Comprobar" })
            ] }),
            conditionOk && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-emerald-300", children: "\u2705 Condici\xF3n correcta. Se sumar\xE1 al acertar." })
          ] }),
          feedback && /* @__PURE__ */ jsx("div", { className: `mt-4 rounded-xl border p-4 text-base font-semibold leading-snug ${success ? "border-emerald-400 bg-emerald-400/10 text-emerald-200" : "border-red-400/60 bg-red-500/10 text-red-100"}`, role: "status", children: feedback }),
          resolved && /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-2xl border border-emerald-400/50 bg-emerald-400/5 p-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-emerald-300", children: "\u2696\uFE0F COMPARACI\xD3N DID\xC1CTICA \u2014 SIEMPRE VISIBLE AL FINAL" }),
            /* @__PURE__ */ jsxs("p", { className: "mono mt-3 break-words text-sm leading-6", children: [
              "findLast(...) \u2192 OBJETO: ",
              foundShow ? JSON.stringify(foundShow) : "undefined",
              /* @__PURE__ */ jsx("br", {}),
              "findLastIndex(...) \u2192 N\xDAMERO: ",
              stage.answer
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-[#cbd8ec]", children: [
              "Uno devuelve el objeto. El otro, solo su posici\xF3n. ",
              level.id === "vs" && "findIndex \u2192 1, findLastIndex \u2192 3. Misma condici\xF3n, direcci\xF3n opuesta."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "panel overflow-hidden lg:sticky lg:top-24", children: [
          /* @__PURE__ */ jsxs("div", { className: "border-b border-[#1e2e4d] bg-[#0a101d] px-4 py-3", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold", children: "\u{1F6E0}\uFE0F DEPURADOR AVANZADO" }),
            /* @__PURE__ */ jsx("p", { className: "mono text-xs text-cyan-300", children: ".findLastIndex() \xB7 recorrido inverso" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "debug-scroll max-h-[560px] overflow-y-auto p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "mono space-y-2 text-[12px] leading-5", children: debug.map((line, i) => /* @__PURE__ */ jsx("p", { className: line.includes("ENCONTRADO") ? "text-emerald-300" : line.startsWith("> Resultado") ? "font-bold text-cyan-300" : line.includes("Comparaci\xF3n") ? "text-amber-200" : "text-[#cbd8ec]", children: line }, i)) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-xl border border-[#1e2e4d] bg-black/30 p-3", children: [
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-cyan-200", children: "C\xF3digo real al final" }),
              /* @__PURE__ */ jsxs("p", { className: "mono mt-2 break-words text-xs leading-5 text-emerald-200", children: [
                stage.code,
                " ",
                /* @__PURE__ */ jsxs("span", { className: "text-white", children: [
                  "// \u2192 ",
                  stage.answer
                ] })
              ] }),
              /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm leading-6 text-[#cbd8ec]", children: [
                "\u{1F9E0} findLastIndex recorre de ",
                /* @__PURE__ */ jsx("b", { children: "atr\xE1s hacia adelante" }),
                ". Al encontrar, se detiene: no revisa lo anterior. Si nada cumple, devuelve ",
                /* @__PURE__ */ jsx("b", { children: "\u22121" }),
                ", no ",
                /* @__PURE__ */ jsx("i", { children: "undefined" }),
                ", porque devuelve un \xEDndice."
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2 text-center text-xs", children: [
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-black/30 p-2", children: [
                "+10",
                /* @__PURE__ */ jsx("br", {}),
                "acierto"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-black/30 p-2", children: [
                "+5",
                /* @__PURE__ */ jsx("br", {}),
                "recorrer"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-black/30 p-2", children: [
                "\u22125 / \u22123",
                /* @__PURE__ */ jsx("br", {}),
                "errores"
              ] })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("footer", { className: "mt-4 text-center text-xs text-[#7d90ae]", children: "Cine \u201CEl \xDAltimo Pase\u201D \xB7 El jefe pide el n\xFAmero de butaca, no la pel\xEDcula. \xB7 Tu progreso se guarda para continuar la funci\xF3n." })
    ] })
  ] });
}
var stdin_default = App;
export {
  stdin_default as default
};
