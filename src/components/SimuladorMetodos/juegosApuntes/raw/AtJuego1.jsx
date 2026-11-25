/* Convertido automáticamente desde Apuntes/at/App.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { RotateCcw, TriangleAlert, ChevronLeft, ChevronRight, Sparkles, Clock, Eraser, Trophy, Flame } from "lucide-react";
const GEARS = [
  { symbol: "\u{1F525}", name: "Fuego", pos: 0 },
  { symbol: "\u{1F4A7}", name: "Agua", pos: 1 },
  { symbol: "\u{1F32A}", name: "Viento", pos: 2 },
  { symbol: "\u{1F30D}", name: "Tierra", pos: 3 },
  { symbol: "\u2744", name: "Hielo", pos: 4 },
  { symbol: "\u26A1", name: "Rayo", pos: 5 },
  { symbol: "\u{1F319}", name: "Luna", pos: 6 }
];
const LEVELS = [
  { id: 1, title: "El Primer Engranaje", short: "at(0)", start: 0, target: 0, min: 0, narrative: "Chronos despierta en el reloj. El objetivo es el primero. Ya est\xE1s ah\xED: reconoce que at(0) es el primer engranaje y confirma sin moverte.", concept: "at(0) = primer elemento. No hace falta moverse si ya est\xE1s en el objetivo.", code: "reloj.at(0) // \u2192 \u{1F525}", hint: "No te muevas. Pulsa \xA1Sincronizar! directamente." },
  { id: 2, title: "El \xDAltimo Engranaje", short: "at(-1)", start: 0, target: 6, min: 1, narrative: "El objetivo es el \xFAltimo engranaje. Puedes ir hacia adelante 6 pasos o hacia atr\xE1s 1 paso con at(-1).", concept: "at(-1) = \xFAltimo elemento. Ir hacia atr\xE1s desde at(0) es m\xE1s corto.", code: "reloj.at(-1) // \u2192 \u{1F319}", hint: "Un paso \u2190 te lleva al final. Seis pasos \u2192 tambi\xE9n, pero no es el m\xEDnimo." },
  { id: 3, title: "El Pen\xFAltimo", short: "at(-2)", start: 3, target: 5, min: 2, narrative: "Chronos est\xE1 en at(3). El objetivo es el pen\xFAltimo. Calcula si es m\xE1s corto ir hacia adelante o hacia atr\xE1s.", concept: "at(-2) = pen\xFAltimo. at(5) y at(-2) son equivalentes. A veces hay dos caminos igual de cortos.", code: "reloj.at(-2) // \u2192 \u26A1 = reloj.at(5)", hint: "\u2192 \u2192 y \u2190 \u2190 valen 2 pasos. Elige el que prefieras." },
  { id: 4, title: "El Engranaje del Medio", short: "at(3) vs at(-4)", start: 0, target: 3, min: 3, narrative: "El objetivo es el cuarto engranaje. Decide si ir hacia adelante (3 pasos) o hacia atr\xE1s (4 pasos con at(-4)).", concept: "at(3) y at(-4) son equivalentes en un array de 7. El camino m\xE1s corto es hacia adelante.", code: "reloj.at(3) // \u2192 \u{1F30D} = reloj.at(-4)", hint: "Adelante son 3 pasos. Atr\xE1s son 4. El juego premia el m\xE1s corto." },
  { id: 5, title: "El Reloj Circular", short: "wrap + undefined", start: 6, target: 2, min: 3, narrative: "El reloj se ha vuelto loco. Chronos est\xE1 en at(6) y el objetivo es at(2). Usa el wrap circular o los \xEDndices negativos.", concept: "Circular: at(6) \u2192 \u2192 at(0). at(2) = at(-5). at(10) en un array de 7 \u2192 undefined.", code: "reloj.at(2) // \u2192 \u{1F32A} = reloj.at(-5)", hint: "\u2192 \u2192 \u2192 cruza el borde: 6 \u2192 0 \u2192 1 \u2192 2. Es el camino de 3 pasos." }
];
const neg = (p) => p - 7;
const dist = (from, to) => {
  const f = (to - from + 7) % 7;
  const b = (from - to + 7) % 7;
  return Math.min(f, b);
};
async function api(action, args) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(typeof json.error === "string" ? json.error : "No se pudo guardar el progreso");
  return json.data;
}
function App() {
  const [levelIdx, setLevelIdx] = useState(0);
  const level = LEVELS[levelIdx];
  const [pos, setPos] = useState(level.start);
  const [steps, setSteps] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [debug, setDebug] = useState([`> reloj.at(${level.start}) \u2192 ${GEARS[level.start].symbol}`, `Posici\xF3n: at(${neg(level.start)}) = at(${level.start})`, "Listo para sincronizar el reloj."]);
  const [log, setLog] = useState(["Chronos despierta en el Reloj de \xCDndices."]);
  const [spinning, setSpinning] = useState(false);
  const [shake, setShake] = useState(false);
  const [golden, setGolden] = useState(false);
  const [at10Used, setAt10Used] = useState(false);
  const [saveState, setSaveState] = useState("cargando");
  const [confirmClear, setConfirmClear] = useState(false);
  const progressIdRef = useRef(null);
  const loadedRef = useRef(false);
  async function persist(next) {
    setSaveState("guardando");
    try {
      if (!progressIdRef.current) {
        const created = await api("records.create", { collection: "reloj-progreso", value: next, idempotency_key: `reloj-${Date.now()}-${Math.random().toString(36).slice(2)}` });
        progressIdRef.current = created?.id ?? null;
      } else {
        await api("records.replace", { collection: "reloj-progreso", id: progressIdRef.current, value: next });
      }
      setSaveState("guardado");
    } catch {
      setSaveState("local");
    }
  }
  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    (async () => {
      try {
        const data = await api("records.list", { collection: "reloj-progreso" });
        const rec = data?.records?.[0];
        if (rec?.value) {
          const v = rec.value;
          progressIdRef.current = rec.id;
          setScore(typeof v.score === "number" ? v.score : 0);
          setStreak(typeof v.streak === "number" ? v.streak : 0);
          setSolved(Array.isArray(v.solved) ? v.solved : []);
          if (typeof v.level === "number" && v.level >= 0 && v.level < 5) {
            setLevelIdx(v.level);
            setPos(LEVELS[v.level].start);
            setDebug([`> reloj.at(${LEVELS[v.level].start}) \u2192 ${GEARS[LEVELS[v.level].start].symbol}`, "Progreso restaurado. Sigue donde lo dejaste."]);
          }
          setSaveState("guardado");
        } else setSaveState("local");
      } catch {
        setSaveState("local");
      }
    })();
  }, []);
  function selectLevel(i) {
    const lv = LEVELS[i];
    setLevelIdx(i);
    setPos(lv.start);
    setSteps(0);
    setFeedback(null);
    setGolden(false);
    setAt10Used(false);
    setDebug([`> reloj.at(${lv.start}) \u2192 ${GEARS[lv.start].symbol}`, `Posici\xF3n: at(${neg(lv.start)}) = at(${lv.start})`, `Nivel ${lv.id}: ${lv.title}`]);
    setLog((l) => [`Nivel ${lv.id} \u2014 ${lv.title}. Inicio en at(${lv.start}).`, ...l].slice(0, 30));
  }
  function move(dir, label) {
    const next = (pos + dir + 7) % 7;
    const nSteps = steps + 1;
    setPos(next);
    setSteps(nSteps);
    setFeedback(null);
    setGolden(false);
    const wrapNote = dir === 1 && pos === 6 ? " \u2696\uFE0F Circular: at(6) +1 \u2192 at(0)" : dir === -1 && pos === 0 ? " \u2696\uFE0F Circular: at(0) -1 \u2192 at(-1)" : "";
    setDebug((d) => [`> reloj.at(${neg(next)}) \u2192 ${GEARS[next].symbol}  \xB7  at(${neg(next)}) = at(${next})${wrapNote}`, `Posici\xF3n: at(${neg(next)}) = at(${next})`, `Pasos: ${nSteps} / M\xEDnimo: ${level.min}`, `\u{1F9E0} at(3) = at(-4) en array de 7 porque 3 - 7 = -4`, ...d].slice(0, 40));
  }
  function jumpTo(target2) {
    if (target2 === pos) return;
    const d = dist(pos, target2);
    const nSteps = steps + d;
    setPos(target2);
    setSteps(nSteps);
    setFeedback(null);
    setGolden(false);
    setDebug((x) => [`> reloj.at(${neg(target2)}) \u2192 ${GEARS[target2].symbol}  \xB7  at(${neg(target2)}) = at(${target2})`, `Posici\xF3n: at(${neg(target2)}) = at(${target2})`, `Pasos: ${nSteps} / M\xEDnimo: ${level.min}  \xB7  salto de ${d} paso(s) por el camino m\xE1s corto`, ...x].slice(0, 40));
  }
  async function sync() {
    const lv = level;
    if (pos !== lv.target) {
      const nextScore2 = score - 3, nextStreak2 = 0;
      setScore(nextScore2);
      setStreak(nextStreak2);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setFeedback({ ok: false, text: lv.id === 1 ? "\u274C Te moviste sin necesidad. at(0) ya era el objetivo." : "\u274C No llegaste al objetivo. El tiempo se distorsiona." });
      setDebug((d) => ["\u274C No llegaste al objetivo.", `Pasos: ${steps} / M\xEDnimo: ${lv.min}  \xB7  -3 puntos`, ...d].slice(0, 40));
      setLog((l) => [`Nivel ${lv.id}: intento fallido en at(${pos}). -3 puntos.`, ...l].slice(0, 30));
      await persist({ score: nextScore2, streak: nextStreak2, solved, level: levelIdx });
      return;
    }
    if (lv.id === 1 && steps > 0) {
      const nextScore2 = score - 3;
      setScore(nextScore2);
      setStreak(0);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setFeedback({ ok: false, text: "\u274C Te moviste sin necesidad. at(0) ya era el objetivo." });
      setLog((l) => [`Nivel 1: te moviste sin necesidad. -3 puntos.`, ...l].slice(0, 30));
      await persist({ score: nextScore2, streak: 0, solved, level: levelIdx });
      return;
    }
    let pts = 0, msg = "";
    if (lv.id === 5 && steps === 3) {
      pts = 15;
      msg = "\u2705 \xA1Sincronizado en 3 pasos! Usaste el wrap circular: at(6) \u2192 \u2192 \u2192 at(2). El reloj es circular.";
    } else if (lv.id === 5 && steps === 5) {
      pts = 5;
      msg = "\u2705 Llegaste con \xEDndices negativos, pero usaste 5 pasos. El m\xEDnimo era 3 (con wrap).";
    } else if (steps === lv.min) {
      pts = lv.id === 1 ? 10 : 10;
      msg = lv.id === 1 ? "\u2705 \xA1Sincronizado! reloj.at(0) devuelve el primer engranaje \u{1F525}. 0 pasos." : lv.id === 2 ? "\u2705 \xA1Sincronizado en 1 paso! reloj.at(-1) devuelve el \xFAltimo engranaje \u{1F319}. Ese es el camino m\xE1s corto." : lv.id === 3 ? "\u2705 \xA1Sincronizado en 2 pasos! reloj.at(-2) y reloj.at(5) devuelven el mismo engranaje \u26A1." : "\u2705 \xA1Sincronizado en 3 pasos! reloj.at(3) es el camino m\xE1s corto. reloj.at(-4) tambi\xE9n funciona, pero son 4 pasos.";
    } else {
      pts = 5;
      msg = lv.id === 4 && steps === 4 ? "\u2705 Llegaste con at(-4), pero usaste 4 pasos. El m\xEDnimo era 3 (con at(3))." : `\u2705 Llegaste, pero usaste ${steps} pasos. El m\xEDnimo era ${lv.min}.`;
    }
    const nextScore = score + pts, nextStreak = streak + 1;
    const nextSolved = solved.includes(lv.id) ? solved : [...solved, lv.id];
    setScore(nextScore);
    setStreak(nextStreak);
    setSolved(nextSolved);
    setFeedback({ ok: true, text: msg });
    setGolden(true);
    setSpinning(true);
    setTimeout(() => setSpinning(false), 1200);
    setDebug((d) => [`\u2705 \xA1Sincronizado! +${pts} puntos`, `Comparaci\xF3n: ${steps} pasos usados / ${lv.min} m\xEDnimo`, ...d].slice(0, 40));
    setLog((l) => [`Nivel ${lv.id} sincronizado en ${steps} pasos. +${pts} puntos.`, ...l].slice(0, 30));
    await persist({ score: nextScore, streak: nextStreak, solved: nextSolved, level: levelIdx });
  }
  async function tryAt10() {
    const nextScore = score - 5;
    setScore(nextScore);
    setStreak(0);
    setAt10Used(true);
    setShake(true);
    setTimeout(() => setShake(false), 500);
    setFeedback({ ok: false, text: "\u274C reloj.at(10) devuelve undefined porque el reloj solo tiene 7 engranajes. El \xEDndice m\xE1ximo es 6 (o -1)." });
    setDebug((d) => ["> reloj.at(10) // \u2192 undefined", "\u274C Fuera de rango: el reloj solo tiene 7 engranajes.", "\u2696\uFE0F \xCDndice m\xE1ximo: 6 (o -1)  \xB7  -5 puntos", ...d].slice(0, 40));
    setLog((l) => ["Nivel 5: intentaste at(10) \u2192 undefined. -5 puntos.", ...l].slice(0, 30));
    await persist({ score: nextScore, streak: 0, solved, level: levelIdx });
  }
  function restart() {
    setPos(level.start);
    setSteps(0);
    setFeedback(null);
    setGolden(false);
    setAt10Used(false);
    setDebug((d) => [`\u21BA Nivel ${level.id} reiniciado.`, `> reloj.at(${level.start}) \u2192 ${GEARS[level.start].symbol}`, ...d].slice(0, 40));
    setLog((l) => [`Nivel ${level.id} reiniciado.`, ...l].slice(0, 30));
  }
  async function clearProgress() {
    if (!confirmClear) {
      setConfirmClear(true);
      return;
    }
    setConfirmClear(false);
    try {
      if (progressIdRef.current) await api("records.delete", { collection: "reloj-progreso", id: progressIdRef.current });
    } catch {
    }
    progressIdRef.current = null;
    setScore(0);
    setStreak(0);
    setSolved([]);
    setSaveState("local");
    setLog((l) => ["Progreso guardado borrado. Empiezas de cero.", ...l].slice(0, 30));
  }
  const current = GEARS[pos];
  const target = GEARS[level.target];
  const nextLevel = levelIdx < 4 ? LEVELS[levelIdx + 1] : null;
  return /* @__PURE__ */ jsx("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "radial-gradient(900px 420px at 18% -10%, rgba(168,85,247,.22), transparent 60%), radial-gradient(800px 420px at 90% 0%, rgba(34,211,238,.16), transparent 55%), #030508" }, className: "overflow-x-clip px-3 py-4 sm:px-5 sm:py-6", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1500px]", children: [
    /* @__PURE__ */ jsxs("header", { className: "panel px-4 py-3 sm:px-5 flex flex-wrap items-center gap-3 justify-between", children: [
      /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsx("p", { className: "eyebrow m-0", children: "Chronos \xB7 Guardi\xE1n del tiempo" }),
        /* @__PURE__ */ jsxs("h1", { className: "m-0 leading-none font-bold", style: { fontSize: "clamp(22px,3.4vw,38px)" }, children: [
          "\u23F0 EL RELOJ DE \xCDNDICES ",
          /* @__PURE__ */ jsx("span", { className: "gold-text", children: "\u2014 CHRONOS" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "m-0 mt-1 text-sm", style: { color: "var(--muted)" }, children: "El reloj es un array circular de 7 engranajes. Llega al objetivo con el m\xEDnimo de pasos." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "mono rounded-full border px-3 py-1.5 text-xs sm:text-sm", style: { borderColor: "var(--line-cyan)", color: "var(--cyan)" }, children: saveState === "cargando" ? "CARGANDO\u2026" : saveState === "guardando" ? "GUARDANDO\u2026" : saveState === "guardado" ? "PROGRESO GUARDADO \u2713" : "MODO LOCAL \xB7 SIN GUARDAR" }),
        /* @__PURE__ */ jsxs("span", { className: "mono rounded-full border px-3 py-1.5 text-xs sm:text-sm", style: { borderColor: "var(--line)", color: "var(--gold)" }, children: [
          "\u{1F3C6} PUNTOS: ",
          score
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "mono rounded-full border px-3 py-1.5 text-xs sm:text-sm", style: { borderColor: "rgba(168,85,247,.45)", color: "#d8b4fe" }, children: [
          /* @__PURE__ */ jsx(Flame, { size: 13, className: "inline -mt-0.5" }),
          " RACHA: ",
          streak
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "mt-4 grid gap-4 items-start", style: { gridTemplateColumns: "1fr" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_420px] items-start", children: [
        /* @__PURE__ */ jsxs("aside", { className: "space-y-4 min-w-0", children: [
          /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
            /* @__PURE__ */ jsx("h2", { className: "m-0 text-lg font-bold", children: "\u{1F4CB} NIVELES" }),
            /* @__PURE__ */ jsx("p", { className: "m-0 mt-1 text-sm", style: { color: "var(--muted)" }, children: "Elige un nivel. \u2705 = sincronizado." }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: LEVELS.map((lv, i) => /* @__PURE__ */ jsxs("button", { onClick: () => selectLevel(i), className: "w-full text-left rounded-xl border p-3 transition hover:brightness-110", style: { borderColor: i === levelIdx ? "var(--gold)" : "rgba(255,255,255,.1)", background: i === levelIdx ? "rgba(245,196,81,.12)" : "rgba(255,255,255,.03)" }, children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-2", children: [
                /* @__PURE__ */ jsxs("strong", { className: "text-[15px] leading-tight", children: [
                  "Nivel ",
                  lv.id,
                  " \u2014 ",
                  lv.title
                ] }),
                /* @__PURE__ */ jsx("span", { children: solved.includes(lv.id) ? "\u2705" : "\u25CB" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mono text-xs mt-1", style: { color: "var(--cyan)" }, children: [
                lv.short,
                " \xB7 inicio at(",
                lv.start,
                ") \u2192 objetivo at(",
                lv.target,
                ")"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs mt-1", style: { color: "var(--muted)" }, children: [
                "M\xEDnimo: ",
                lv.min,
                " paso",
                lv.min === 1 ? "" : "s"
              ] })
            ] }, lv.id)) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border p-3", style: { borderColor: "var(--line-cyan)", background: "rgba(34,211,238,.07)" }, children: [
              /* @__PURE__ */ jsx("p", { className: "m-0 font-bold text-sm", children: "at() circular" }),
              /* @__PURE__ */ jsxs("p", { className: "mono m-0 mt-1 text-xs leading-relaxed", style: { color: "var(--muted)" }, children: [
                "at(0) \u2192 primero",
                /* @__PURE__ */ jsx("br", {}),
                "at(-1) \u2192 \xFAltimo",
                /* @__PURE__ */ jsx("br", {}),
                "at(6) \u2192 \u2192 at(0)",
                /* @__PURE__ */ jsx("br", {}),
                "at(0) \u2192 \u2190 at(-1)",
                /* @__PURE__ */ jsx("br", {}),
                "at(10) \u2192 undefined"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: clearProgress, className: "mt-3 w-full rounded-lg border px-3 py-2 text-sm flex items-center justify-center gap-2", style: { borderColor: "rgba(255,255,255,.15)" }, children: [
              /* @__PURE__ */ jsx(Eraser, { size: 15 }),
              " ",
              confirmClear ? "\xBFSeguro? Pulsa de nuevo para borrar" : "Borrar progreso guardado"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
            /* @__PURE__ */ jsxs("h3", { className: "m-0 flex items-center gap-2 text-base font-bold", children: [
              /* @__PURE__ */ jsx(Clock, { size: 17, className: "text-[#f5c451]" }),
              " Bit\xE1cora de Chronos"
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "m-0 mt-3 list-none p-0 space-y-2 max-h-[220px] overflow-y-auto scroll-thin pr-1", children: log.map((e, i) => /* @__PURE__ */ jsx("li", { className: "text-sm leading-snug border-l-2 pl-2", style: { borderColor: i === 0 ? "var(--gold)" : "rgba(255,255,255,.12)", color: i === 0 ? "var(--text)" : "var(--muted)" }, children: e }, i)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: `panel p-4 sm:p-5 min-w-0 ${golden ? "golden" : ""} ${shake ? "shaking" : ""}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-between gap-2 items-start", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "eyebrow m-0", children: [
                "Nivel ",
                level.id,
                " \xB7 ",
                level.short
              ] }),
              /* @__PURE__ */ jsx("h2", { className: "m-0 text-2xl sm:text-3xl font-bold", children: "\u23F0 RELOJ DE \xCDNDICES" }),
              /* @__PURE__ */ jsx("p", { className: "m-0 mt-1 font-semibold text-lg leading-snug", children: level.title })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "mono rounded-full px-3 py-1 text-xs border", style: { borderColor: "var(--line)", color: "var(--gold)" }, children: [
              "M\xCDNIMO: ",
              level.min,
              " \xB7 PASOS: ",
              steps
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-[15px] leading-relaxed", style: { color: "var(--muted)" }, children: level.narrative }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-2xl border p-3 sm:p-4", style: { borderColor: "rgba(168,85,247,.35)", background: "radial-gradient(circle at 50% 35%, rgba(168,85,247,.18), transparent 65%)" }, children: [
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1 sm:gap-2 text-center mono text-[11px] sm:text-sm", style: { color: "var(--muted)" }, children: GEARS.map((g) => /* @__PURE__ */ jsx("span", { children: g.pos }, g.pos)) }),
            /* @__PURE__ */ jsx("div", { className: `grid grid-cols-7 gap-1 sm:gap-2 mt-1 ${spinning ? "spinning" : ""}`, children: GEARS.map((g) => /* @__PURE__ */ jsxs(
              "button",
              {
                onClick: () => jumpTo(g.pos),
                title: `Ir a ${g.name} (${g.symbol}) \u2014 at(${g.pos}) = at(${neg(g.pos)})`,
                "aria-label": `Engranaje ${g.pos} ${g.name}`,
                className: `gear-btn rounded-xl border py-2 sm:py-3 text-xl sm:text-3xl ${g.pos === pos ? "active" : ""} ${g.pos === level.target ? "target" : ""}`,
                style: { borderColor: "rgba(255,255,255,.14)", background: g.pos === pos ? "rgba(245,196,81,.16)" : "rgba(255,255,255,.04)" },
                children: [
                  /* @__PURE__ */ jsx("span", { className: "block leading-none", children: g.symbol }),
                  /* @__PURE__ */ jsx("span", { className: "block text-[10px] sm:text-xs mt-1 font-bold", style: { color: "var(--muted)" }, children: g.name })
                ]
              },
              g.pos
            )) }),
            /* @__PURE__ */ jsx("div", { className: "grid grid-cols-7 gap-1 sm:gap-2 text-center mono text-[11px] sm:text-sm mt-1", style: { color: "var(--cyan)" }, children: GEARS.map((g) => /* @__PURE__ */ jsx("span", { children: neg(g.pos) }, g.pos)) }),
            /* @__PURE__ */ jsx("p", { className: "m-0 mt-2 text-center text-xs sm:text-sm", style: { color: "var(--muted)" }, children: "Pulsa un engranaje o usa \u2190 \u2192 \xB7 El reloj es circular: de at(6) pasas a at(0)" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-2xl border p-4 text-center", style: { borderColor: "var(--line)", background: "rgba(245,196,81,.06)" }, children: [
            /* @__PURE__ */ jsx("p", { className: "m-0 text-sm", style: { color: "var(--muted)" }, children: "Posici\xF3n actual" }),
            /* @__PURE__ */ jsxs("p", { className: "m-0 font-bold leading-tight", style: { fontSize: "clamp(20px,4vw,32px)" }, children: [
              "at(",
              neg(pos),
              ") = at(",
              pos,
              ") \u2192 ",
              current.symbol,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-base sm:text-xl", children: current.name })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "m-0 mt-1", children: [
              "Est\xE1s en ",
              /* @__PURE__ */ jsxs("strong", { children: [
                "at(",
                neg(pos),
                ") = at(",
                pos,
                ") \u2192 ",
                current.symbol
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "m-0 mt-2 text-lg", children: [
              "Objetivo: llegar al engranaje ",
              /* @__PURE__ */ jsxs("strong", { className: "gold-text", children: [
                "[",
                level.target,
                "]",
                target.symbol,
                " ",
                target.name
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mono m-0 mt-2 text-sm sm:text-base", children: [
              "reloj.at(",
              pos,
              ") ",
              /* @__PURE__ */ jsx("span", { style: { color: "var(--muted)" }, children: "// \u2192" }),
              " ",
              current.symbol,
              " \xA0\xB7\xA0 reloj.at(",
              neg(pos),
              ") ",
              /* @__PURE__ */ jsx("span", { style: { color: "var(--muted)" }, children: "// \u2192" }),
              " ",
              current.symbol
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap justify-center gap-2 sm:gap-3", children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => move(-1, "\u2190"), "aria-label": "Mover hacia atr\xE1s", className: "rounded-2xl border px-5 sm:px-7 py-3 text-2xl font-bold hover:brightness-125 active:scale-95", style: { borderColor: "var(--line-cyan)", background: "rgba(34,211,238,.12)" }, children: [
              /* @__PURE__ */ jsx(ChevronLeft, { size: 22, className: "inline" }),
              " \u2190"
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: () => move(1, "\u2192"), "aria-label": "Mover hacia adelante", className: "rounded-2xl border px-5 sm:px-7 py-3 text-2xl font-bold hover:brightness-125 active:scale-95", style: { borderColor: "var(--line-cyan)", background: "rgba(34,211,238,.12)" }, children: [
              "\u2192 ",
              /* @__PURE__ */ jsx(ChevronRight, { size: 22, className: "inline" })
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: sync, className: "rounded-2xl px-5 sm:px-6 py-3 font-bold text-base sm:text-lg hover:brightness-110 active:scale-95", style: { background: "linear-gradient(135deg,#f5c451,#ff8a3c)", color: "#1a1200" }, children: [
              /* @__PURE__ */ jsx(Sparkles, { size: 18, className: "inline -mt-0.5" }),
              " \xA1SINCRONIZAR!"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap justify-center gap-2", children: [
            /* @__PURE__ */ jsxs("button", { onClick: restart, className: "rounded-xl border px-4 py-2 text-sm flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(RotateCcw, { size: 15 }),
              " \u{1F504} Reiniciar nivel"
            ] }),
            level.id === 5 && /* @__PURE__ */ jsxs("button", { onClick: tryAt10, className: "rounded-xl border px-4 py-2 text-sm flex items-center gap-2", style: { borderColor: "rgba(255,84,112,.5)", color: "#ffb3c2" }, children: [
              /* @__PURE__ */ jsx(TriangleAlert, { size: 15 }),
              " \u26A0\uFE0F Intentar at(10) ",
              /* @__PURE__ */ jsx("span", { className: "opacity-70", children: "(-5)" })
            ] }),
            nextLevel && /* @__PURE__ */ jsxs("button", { onClick: () => selectLevel(levelIdx + 1), className: "rounded-xl border px-4 py-2 text-sm", children: [
              "Siguiente: Nivel ",
              nextLevel.id,
              " \u2192"
            ] })
          ] }),
          feedback && /* @__PURE__ */ jsxs("div", { role: "status", className: "mt-4 rounded-xl border p-3 text-[15px] leading-relaxed", style: { borderColor: feedback.ok ? "rgba(61,220,151,.6)" : "rgba(255,84,112,.6)", background: feedback.ok ? "rgba(61,220,151,.1)" : "rgba(255,84,112,.1)" }, children: [
            feedback.text,
            !feedback.ok && /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm", style: { color: "var(--muted)" }, children: "El tiempo se distorsiona\u2026 Respira y vuelve a calcular el camino m\xE1s corto." }),
            feedback.ok && /* @__PURE__ */ jsx("div", { className: "mt-1 text-sm", children: "\u2728 El reloj brilla. Chronos sonr\xEDe." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-xl border p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "m-0 text-sm font-bold", children: "\u{1F9E0} Concepto del nivel" }),
            /* @__PURE__ */ jsx("p", { className: "m-0 mt-1 text-sm leading-relaxed", style: { color: "var(--muted)" }, children: level.concept }),
            /* @__PURE__ */ jsxs("p", { className: "m-0 mt-2 text-sm", children: [
              /* @__PURE__ */ jsx("strong", { className: "gold-text", children: "\u{1F4A1} Pista:" }),
              " ",
              level.hint
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mono m-0 mt-2 text-xs sm:text-sm break-words", children: level.code })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 grid grid-cols-3 gap-2 text-center", children: [["+10", "m\xEDnimo"], ["+5", "m\xE1s pasos"], ["-3", "si se pasa"]].map(([v, l]) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl border p-2", children: [
            /* @__PURE__ */ jsx("div", { className: "font-bold text-lg gold-text", children: v }),
            /* @__PURE__ */ jsx("div", { className: "text-xs", style: { color: "var(--muted)" }, children: l })
          ] }, l)) }),
          level.id === 5 && /* @__PURE__ */ jsx("p", { className: "m-0 mt-2 text-center text-sm", style: { color: "var(--muted)" }, children: "Nivel 5 especial: +15 en 3 pasos con wrap \xB7 -5 si intentas at(10)" })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "panel panel-cyan p-4 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("h2", { className: "m-0 text-lg font-bold", children: [
              "\u{1F6E0}\uFE0F DEPURADOR AVANZADO: ",
              /* @__PURE__ */ jsx("span", { style: { color: "var(--cyan)" }, children: ".at()" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "mono text-xs px-2 py-1 rounded-full border", style: { borderColor: "var(--line-cyan)", color: "var(--cyan)" }, children: "EN VIVO" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mono mt-3 rounded-xl border p-3 text-[13px] leading-relaxed min-h-[220px] max-h-[360px] overflow-y-auto scroll-thin", style: { borderColor: "rgba(34,211,238,.25)", background: "rgba(2,6,14,.85)", overflowWrap: "anywhere" }, children: debug.map((line, i) => /* @__PURE__ */ jsx("p", { className: "m-0 py-0.5", style: { color: i === 0 ? "#ffe9a8" : line.startsWith("\u2705") ? "var(--ok)" : line.startsWith("\u274C") ? "var(--danger)" : "var(--muted)" }, children: line }, i)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-2 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border p-3", children: [
              /* @__PURE__ */ jsx("strong", { children: "Posici\xF3n:" }),
              " at(",
              neg(pos),
              ") = at(",
              pos,
              ") \u2192 ",
              current.symbol,
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsxs("span", { style: { color: "var(--muted)" }, children: [
                "Pasos: ",
                steps,
                " / M\xEDnimo: ",
                level.min,
                " \xB7 Objetivo: [",
                level.target,
                "]",
                target.symbol
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border p-3", children: [
              "\u{1F9E0} ",
              /* @__PURE__ */ jsx("strong", { children: "at(3) = at(-4)" }),
              " en array de 7 porque 3 \u2212 7 = \u22124"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border p-3", children: [
              "\u2696\uFE0F ",
              /* @__PURE__ */ jsx("strong", { children: "Circular:" }),
              " at(6) +1 \u2192 at(0) | at(0) \u22121 \u2192 at(-1)"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border p-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Trophy, { size: 16, className: "text-[#f5c451]" }),
              " ",
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("strong", { children: "Puntos:" }),
                " ",
                score,
                " \xB7 ",
                /* @__PURE__ */ jsx("strong", { children: "Racha:" }),
                " ",
                streak,
                " \xB7 ",
                /* @__PURE__ */ jsx("strong", { children: "Resueltos:" }),
                " ",
                solved.length,
                "/5"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
            /* @__PURE__ */ jsx("p", { className: "m-0 text-sm font-bold", children: "Progreso" }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 h-2 rounded-full overflow-hidden", style: { background: "rgba(255,255,255,.1)" }, children: /* @__PURE__ */ jsx("div", { className: "h-full", style: { width: `${solved.length / 5 * 100}%`, background: "linear-gradient(90deg,#22d3ee,#f5c451)", transition: "width .4s" } }) }),
            /* @__PURE__ */ jsx("p", { className: "m-0 mt-1 text-xs", style: { color: "var(--muted)" }, children: solved.length === 5 ? "\u{1F389} \xA1Reloj completamente sincronizado!" : `Te faltan ${5 - solved.length} engranajes por sincronizar.` })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "panel mt-4 p-4", children: [
        /* @__PURE__ */ jsxs("h2", { className: "m-0 text-lg font-bold", children: [
          "\u{1F50D} PANEL at() ",
          /* @__PURE__ */ jsx("span", { className: "text-sm font-medium", style: { color: "var(--muted)" }, children: "\u2014 siempre visible" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: ["at(0) \u2192 primero", "at(-1) \u2192 \xFAltimo", "at(-2) \u2192 pen\xFAltimo", "at(3) = at(-4) en array de 7", "Circular: at(6) \u2192 \u2192 at(0)", "at(10) \u2192 undefined"].map((t) => /* @__PURE__ */ jsx("span", { className: "mono rounded-full border px-3 py-2 text-xs sm:text-sm", style: { borderColor: t.includes("undefined") ? "rgba(255,84,112,.5)" : "var(--line)", color: t.includes("undefined") ? "#ffb3c2" : "var(--text)", background: "rgba(255,255,255,.03)" }, children: t }, t)) }),
        /* @__PURE__ */ jsxs("p", { className: "m-0 mt-3 text-sm leading-relaxed", style: { color: "var(--muted)" }, children: [
          "Regla de oro: ",
          /* @__PURE__ */ jsx("strong", { className: "text-white", children: "at() acepta positivos y negativos." }),
          " Puedes llegar al mismo engranaje con at(3) o at(-4) en un array de 7. El juego premia el camino m\xE1s corto. Tu progreso (puntos, racha y niveles resueltos) se guarda para que puedas continuar despu\xE9s."
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "mt-4 text-center text-xs pb-2", style: { color: "var(--muted)" }, children: "Chronos \xB7 El Reloj de \xCDndices \xB7 Aprende .at() jugando \xB7 at(0) primero \xB7 at(-1) \xFAltimo \xB7 at(10) undefined" })
  ] }) });
}
export {
  App as default
};
