import React, { useEffect, useRef, useState } from "react";
import { RotateCcw, TriangleAlert, Check, ChevronLeft, ChevronRight, Sparkles, Clock, Eraser, Trophy, Flame } from "lucide-react";

type Level = {
  id: number; title: string; short: string; start: number; target: number; min: number;
  narrative: string; concept: string; code: string; hint: string;
};
type Progress = { score: number; streak: number; solved: number[]; level: number };

const GEARS = [
  { symbol: "🔥", name: "Fuego", pos: 0 },
  { symbol: "💧", name: "Agua", pos: 1 },
  { symbol: "🌪", name: "Viento", pos: 2 },
  { symbol: "🌍", name: "Tierra", pos: 3 },
  { symbol: "❄", name: "Hielo", pos: 4 },
  { symbol: "⚡", name: "Rayo", pos: 5 },
  { symbol: "🌙", name: "Luna", pos: 6 },
];
const LEVELS: Level[] = [
  { id: 1, title: "El Primer Engranaje", short: "at(0)", start: 0, target: 0, min: 0, narrative: "Chronos despierta en el reloj. El objetivo es el primero. Ya estás ahí: reconoce que at(0) es el primer engranaje y confirma sin moverte.", concept: "at(0) = primer elemento. No hace falta moverse si ya estás en el objetivo.", code: "reloj.at(0) // → 🔥", hint: "No te muevas. Pulsa ¡Sincronizar! directamente." },
  { id: 2, title: "El Último Engranaje", short: "at(-1)", start: 0, target: 6, min: 1, narrative: "El objetivo es el último engranaje. Puedes ir hacia adelante 6 pasos o hacia atrás 1 paso con at(-1).", concept: "at(-1) = último elemento. Ir hacia atrás desde at(0) es más corto.", code: "reloj.at(-1) // → 🌙", hint: "Un paso ← te lleva al final. Seis pasos → también, pero no es el mínimo." },
  { id: 3, title: "El Penúltimo", short: "at(-2)", start: 3, target: 5, min: 2, narrative: "Chronos está en at(3). El objetivo es el penúltimo. Calcula si es más corto ir hacia adelante o hacia atrás.", concept: "at(-2) = penúltimo. at(5) y at(-2) son equivalentes. A veces hay dos caminos igual de cortos.", code: "reloj.at(-2) // → ⚡ = reloj.at(5)", hint: "→ → y ← ← valen 2 pasos. Elige el que prefieras." },
  { id: 4, title: "El Engranaje del Medio", short: "at(3) vs at(-4)", start: 0, target: 3, min: 3, narrative: "El objetivo es el cuarto engranaje. Decide si ir hacia adelante (3 pasos) o hacia atrás (4 pasos con at(-4)).", concept: "at(3) y at(-4) son equivalentes en un array de 7. El camino más corto es hacia adelante.", code: "reloj.at(3) // → 🌍 = reloj.at(-4)", hint: "Adelante son 3 pasos. Atrás son 4. El juego premia el más corto." },
  { id: 5, title: "El Reloj Circular", short: "wrap + undefined", start: 6, target: 2, min: 3, narrative: "El reloj se ha vuelto loco. Chronos está en at(6) y el objetivo es at(2). Usa el wrap circular o los índices negativos.", concept: "Circular: at(6) → → at(0). at(2) = at(-5). at(10) en un array de 7 → undefined.", code: "reloj.at(2) // → 🌪 = reloj.at(-5)", hint: "→ → → cruza el borde: 6 → 0 → 1 → 2. Es el camino de 3 pasos." },
];
const neg = (p: number) => p - 7;
const dist = (from: number, to: number) => { const f = (to - from + 7) % 7; const b = (from - to + 7) % 7; return Math.min(f, b); };

async function api(action: string, args: Record<string, unknown>) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(typeof json.error === "string" ? json.error : "No se pudo guardar el progreso");
  return json.data;
}

export default function App() {
  const [levelIdx, setLevelIdx] = useState(0);
  const level = LEVELS[levelIdx];
  const [pos, setPos] = useState(level.start);
  const [steps, setSteps] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<{ ok: boolean; text: string } | null>(null);
  const [debug, setDebug] = useState<string[]>([`> reloj.at(${level.start}) → ${GEARS[level.start].symbol}`, `Posición: at(${neg(level.start)}) = at(${level.start})`, "Listo para sincronizar el reloj."]);
  const [log, setLog] = useState<string[]>(["Chronos despierta en el Reloj de Índices."]);
  const [spinning, setSpinning] = useState(false);
  const [shake, setShake] = useState(false);
  const [golden, setGolden] = useState(false);
  const [at10Used, setAt10Used] = useState(false);
  const [saveState, setSaveState] = useState<"cargando" | "guardado" | "local" | "guardando">("cargando");
  const [confirmClear, setConfirmClear] = useState(false);
  const progressIdRef = useRef<string | null>(null);
  const loadedRef = useRef(false);

  async function persist(next: Progress) {
    setSaveState("guardando");
    try {
      if (!progressIdRef.current) {
        const created = await api("records.create", { collection: "reloj-progreso", value: next, idempotency_key: `reloj-${Date.now()}-${Math.random().toString(36).slice(2)}` });
        progressIdRef.current = created?.id ?? null;
      } else {
        await api("records.replace", { collection: "reloj-progreso", id: progressIdRef.current, value: next });
      }
      setSaveState("guardado");
    } catch { setSaveState("local"); }
  }

  useEffect(() => {
    if (loadedRef.current) return; loadedRef.current = true;
    (async () => {
      try {
        const data = await api("records.list", { collection: "reloj-progreso" });
        const rec = data?.records?.[0];
        if (rec?.value) {
          const v = rec.value as Progress;
          progressIdRef.current = rec.id;
          setScore(typeof v.score === "number" ? v.score : 0);
          setStreak(typeof v.streak === "number" ? v.streak : 0);
          setSolved(Array.isArray(v.solved) ? v.solved : []);
          if (typeof v.level === "number" && v.level >= 0 && v.level < 5) {
            setLevelIdx(v.level);
            setPos(LEVELS[v.level].start);
            setDebug([`> reloj.at(${LEVELS[v.level].start}) → ${GEARS[LEVELS[v.level].start].symbol}`, "Progreso restaurado. Sigue donde lo dejaste."]);
          }
          setSaveState("guardado");
        } else setSaveState("local");
      } catch { setSaveState("local"); }
    })();
  }, []);

  function selectLevel(i: number) {
    const lv = LEVELS[i];
    setLevelIdx(i); setPos(lv.start); setSteps(0); setFeedback(null); setGolden(false); setAt10Used(false);
    setDebug([`> reloj.at(${lv.start}) → ${GEARS[lv.start].symbol}`, `Posición: at(${neg(lv.start)}) = at(${lv.start})`, `Nivel ${lv.id}: ${lv.title}`]);
    setLog(l => [`Nivel ${lv.id} — ${lv.title}. Inicio en at(${lv.start}).`, ...l].slice(0, 30));
  }

  function move(dir: 1 | -1, label: string) {
    const next = (pos + dir + 7) % 7;
    const nSteps = steps + 1;
    setPos(next); setSteps(nSteps); setFeedback(null); setGolden(false);
    const wrapNote = dir === 1 && pos === 6 ? " ⚖️ Circular: at(6) +1 → at(0)" : dir === -1 && pos === 0 ? " ⚖️ Circular: at(0) -1 → at(-1)" : "";
    setDebug(d => [`> reloj.at(${neg(next)}) → ${GEARS[next].symbol}  ·  at(${neg(next)}) = at(${next})${wrapNote}`, `Posición: at(${neg(next)}) = at(${next})`, `Pasos: ${nSteps} / Mínimo: ${level.min}`, `🧠 at(3) = at(-4) en array de 7 porque 3 - 7 = -4`, ...d].slice(0, 40));
  }

  function jumpTo(target: number) {
    if (target === pos) return;
    const d = dist(pos, target);
    const nSteps = steps + d;
    setPos(target); setSteps(nSteps); setFeedback(null); setGolden(false);
    setDebug(x => [`> reloj.at(${neg(target)}) → ${GEARS[target].symbol}  ·  at(${neg(target)}) = at(${target})`, `Posición: at(${neg(target)}) = at(${target})`, `Pasos: ${nSteps} / Mínimo: ${level.min}  ·  salto de ${d} paso(s) por el camino más corto`, ...x].slice(0, 40));
  }

  async function sync() {
    const lv = level;
    if (pos !== lv.target) {
      const nextScore = score - 3, nextStreak = 0;
      setScore(nextScore); setStreak(nextStreak); setShake(true); setTimeout(() => setShake(false), 500);
      setFeedback({ ok: false, text: lv.id === 1 ? "❌ Te moviste sin necesidad. at(0) ya era el objetivo." : "❌ No llegaste al objetivo. El tiempo se distorsiona." });
      setDebug(d => ["❌ No llegaste al objetivo.", `Pasos: ${steps} / Mínimo: ${lv.min}  ·  -3 puntos`, ...d].slice(0, 40));
      setLog(l => [`Nivel ${lv.id}: intento fallido en at(${pos}). -3 puntos.`, ...l].slice(0, 30));
      await persist({ score: nextScore, streak: nextStreak, solved, level: levelIdx });
      return;
    }
    if (lv.id === 1 && steps > 0) {
      const nextScore = score - 3;
      setScore(nextScore); setStreak(0); setShake(true); setTimeout(() => setShake(false), 500);
      setFeedback({ ok: false, text: "❌ Te moviste sin necesidad. at(0) ya era el objetivo." });
      setLog(l => [`Nivel 1: te moviste sin necesidad. -3 puntos.`, ...l].slice(0, 30));
      await persist({ score: nextScore, streak: 0, solved, level: levelIdx });
      return;
    }
    let pts = 0, msg = "";
    if (lv.id === 5 && steps === 3) { pts = 15; msg = "✅ ¡Sincronizado en 3 pasos! Usaste el wrap circular: at(6) → → → at(2). El reloj es circular."; }
    else if (lv.id === 5 && steps === 5) { pts = 5; msg = "✅ Llegaste con índices negativos, pero usaste 5 pasos. El mínimo era 3 (con wrap)."; }
    else if (steps === lv.min) {
      pts = lv.id === 1 ? 10 : 10;
      msg = lv.id === 1 ? "✅ ¡Sincronizado! reloj.at(0) devuelve el primer engranaje 🔥. 0 pasos." : lv.id === 2 ? "✅ ¡Sincronizado en 1 paso! reloj.at(-1) devuelve el último engranaje 🌙. Ese es el camino más corto." : lv.id === 3 ? "✅ ¡Sincronizado en 2 pasos! reloj.at(-2) y reloj.at(5) devuelven el mismo engranaje ⚡." : "✅ ¡Sincronizado en 3 pasos! reloj.at(3) es el camino más corto. reloj.at(-4) también funciona, pero son 4 pasos.";
    } else {
      pts = 5;
      msg = lv.id === 4 && steps === 4 ? "✅ Llegaste con at(-4), pero usaste 4 pasos. El mínimo era 3 (con at(3))." : `✅ Llegaste, pero usaste ${steps} pasos. El mínimo era ${lv.min}.`;
    }
    const nextScore = score + pts, nextStreak = streak + 1;
    const nextSolved = solved.includes(lv.id) ? solved : [...solved, lv.id];
    setScore(nextScore); setStreak(nextStreak); setSolved(nextSolved); setFeedback({ ok: true, text: msg });
    setGolden(true); setSpinning(true); setTimeout(() => setSpinning(false), 1200);
    setDebug(d => [`✅ ¡Sincronizado! +${pts} puntos`, `Comparación: ${steps} pasos usados / ${lv.min} mínimo`, ...d].slice(0, 40));
    setLog(l => [`Nivel ${lv.id} sincronizado en ${steps} pasos. +${pts} puntos.`, ...l].slice(0, 30));
    await persist({ score: nextScore, streak: nextStreak, solved: nextSolved, level: levelIdx });
  }

  async function tryAt10() {
    const nextScore = score - 5;
    setScore(nextScore); setStreak(0); setAt10Used(true); setShake(true); setTimeout(() => setShake(false), 500);
    setFeedback({ ok: false, text: "❌ reloj.at(10) devuelve undefined porque el reloj solo tiene 7 engranajes. El índice máximo es 6 (o -1)." });
    setDebug(d => ["> reloj.at(10) // → undefined", "❌ Fuera de rango: el reloj solo tiene 7 engranajes.", "⚖️ Índice máximo: 6 (o -1)  ·  -5 puntos", ...d].slice(0, 40));
    setLog(l => ["Nivel 5: intentaste at(10) → undefined. -5 puntos.", ...l].slice(0, 30));
    await persist({ score: nextScore, streak: 0, solved, level: levelIdx });
  }

  function restart() {
    setPos(level.start); setSteps(0); setFeedback(null); setGolden(false); setAt10Used(false);
    setDebug(d => [`↺ Nivel ${level.id} reiniciado.`, `> reloj.at(${level.start}) → ${GEARS[level.start].symbol}`, ...d].slice(0, 40));
    setLog(l => [`Nivel ${level.id} reiniciado.`, ...l].slice(0, 30));
  }

  async function clearProgress() {
    if (!confirmClear) { setConfirmClear(true); return; }
    setConfirmClear(false);
    try {
      if (progressIdRef.current) await api("records.delete", { collection: "reloj-progreso", id: progressIdRef.current });
    } catch { /* el juego sigue en modo local */ }
    progressIdRef.current = null; setScore(0); setStreak(0); setSolved([]); setSaveState("local");
    setLog(l => ["Progreso guardado borrado. Empiezas de cero.", ...l].slice(0, 30));
  }

  const current = GEARS[pos]; const target = GEARS[level.target];
  const nextLevel = levelIdx < 4 ? LEVELS[levelIdx + 1] : null;

  return (
    <div data-safe-area-inset-root style={{ boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "radial-gradient(900px 420px at 18% -10%, rgba(168,85,247,.22), transparent 60%), radial-gradient(800px 420px at 90% 0%, rgba(34,211,238,.16), transparent 55%), #030508" }} className="overflow-x-clip px-3 py-4 sm:px-5 sm:py-6">
      <div className="mx-auto max-w-[1500px]">
        {/* HEADER */}
        <header className="panel px-4 py-3 sm:px-5 flex flex-wrap items-center gap-3 justify-between">
          <div className="min-w-0">
            <p className="eyebrow m-0">Chronos · Guardián del tiempo</p>
            <h1 className="m-0 leading-none font-bold" style={{ fontSize: "clamp(22px,3.4vw,38px)" }}>⏰ EL RELOJ DE ÍNDICES <span className="gold-text">— CHRONOS</span></h1>
            <p className="m-0 mt-1 text-sm" style={{ color: "var(--muted)" }}>El reloj es un array circular de 7 engranajes. Llega al objetivo con el mínimo de pasos.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="mono rounded-full border px-3 py-1.5 text-xs sm:text-sm" style={{ borderColor: "var(--line-cyan)", color: "var(--cyan)" }}>{saveState === "cargando" ? "CARGANDO…" : saveState === "guardando" ? "GUARDANDO…" : saveState === "guardado" ? "PROGRESO GUARDADO ✓" : "MODO LOCAL · SIN GUARDAR"}</span>
            <span className="mono rounded-full border px-3 py-1.5 text-xs sm:text-sm" style={{ borderColor: "var(--line)", color: "var(--gold)" }}>🏆 PUNTOS: {score}</span>
            <span className="mono rounded-full border px-3 py-1.5 text-xs sm:text-sm" style={{ borderColor: "rgba(168,85,247,.45)", color: "#d8b4fe" }}><Flame size={13} className="inline -mt-0.5" /> RACHA: {streak}</span>
          </div>
        </header>

        {/* GRID */}
        <main className="mt-4 grid gap-4 items-start" style={{ gridTemplateColumns: "1fr" }}>
          <div className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_420px] items-start">
            {/* LEFT */}
            <aside className="space-y-4 min-w-0">
              <section className="panel p-4">
                <h2 className="m-0 text-lg font-bold">📋 NIVELES</h2>
                <p className="m-0 mt-1 text-sm" style={{ color: "var(--muted)" }}>Elige un nivel. ✅ = sincronizado.</p>
                <div className="mt-3 space-y-2">
                  {LEVELS.map((lv, i) => (
                    <button key={lv.id} onClick={() => selectLevel(i)} className="w-full text-left rounded-xl border p-3 transition hover:brightness-110" style={{ borderColor: i === levelIdx ? "var(--gold)" : "rgba(255,255,255,.1)", background: i === levelIdx ? "rgba(245,196,81,.12)" : "rgba(255,255,255,.03)" }}>
                      <div className="flex justify-between gap-2"><strong className="text-[15px] leading-tight">Nivel {lv.id} — {lv.title}</strong><span>{solved.includes(lv.id) ? "✅" : "○"}</span></div>
                      <div className="mono text-xs mt-1" style={{ color: "var(--cyan)" }}>{lv.short} · inicio at({lv.start}) → objetivo at({lv.target})</div>
                      <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>Mínimo: {lv.min} paso{lv.min === 1 ? "" : "s"}</div>
                    </button>
                  ))}
                </div>
                <div className="mt-3 rounded-xl border p-3" style={{ borderColor: "var(--line-cyan)", background: "rgba(34,211,238,.07)" }}>
                  <p className="m-0 font-bold text-sm">at() circular</p>
                  <p className="mono m-0 mt-1 text-xs leading-relaxed" style={{ color: "var(--muted)" }}>at(0) → primero<br />at(-1) → último<br />at(6) → → at(0)<br />at(0) → ← at(-1)<br />at(10) → undefined</p>
                </div>
                <button onClick={clearProgress} className="mt-3 w-full rounded-lg border px-3 py-2 text-sm flex items-center justify-center gap-2" style={{ borderColor: "rgba(255,255,255,.15)" }}><Eraser size={15} /> {confirmClear ? "¿Seguro? Pulsa de nuevo para borrar" : "Borrar progreso guardado"}</button>
              </section>

              <section className="panel p-4">
                <h3 className="m-0 flex items-center gap-2 text-base font-bold"><Clock size={17} className="text-[#f5c451]" /> Bitácora de Chronos</h3>
                <ul className="m-0 mt-3 list-none p-0 space-y-2 max-h-[220px] overflow-y-auto scroll-thin pr-1">
                  {log.map((e, i) => <li key={i} className="text-sm leading-snug border-l-2 pl-2" style={{ borderColor: i === 0 ? "var(--gold)" : "rgba(255,255,255,.12)", color: i === 0 ? "var(--text)" : "var(--muted)" }}>{e}</li>)}
                </ul>
              </section>
            </aside>

            {/* CENTER */}
            <section className={`panel p-4 sm:p-5 min-w-0 ${golden ? "golden" : ""} ${shake ? "shaking" : ""}`}>
              <div className="flex flex-wrap justify-between gap-2 items-start">
                <div><p className="eyebrow m-0">Nivel {level.id} · {level.short}</p><h2 className="m-0 text-2xl sm:text-3xl font-bold">⏰ RELOJ DE ÍNDICES</h2><p className="m-0 mt-1 font-semibold text-lg leading-snug">{level.title}</p></div>
                <span className="mono rounded-full px-3 py-1 text-xs border" style={{ borderColor: "var(--line)", color: "var(--gold)" }}>MÍNIMO: {level.min} · PASOS: {steps}</span>
              </div>
              <p className="mt-3 text-[15px] leading-relaxed" style={{ color: "var(--muted)" }}>{level.narrative}</p>

              {/* GEARS */}
              <div className="mt-4 rounded-2xl border p-3 sm:p-4" style={{ borderColor: "rgba(168,85,247,.35)", background: "radial-gradient(circle at 50% 35%, rgba(168,85,247,.18), transparent 65%)" }}>
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center mono text-[11px] sm:text-sm" style={{ color: "var(--muted)" }}>{GEARS.map(g => <span key={g.pos}>{g.pos}</span>)}</div>
                <div className={`grid grid-cols-7 gap-1 sm:gap-2 mt-1 ${spinning ? "spinning" : ""}`}>
                  {GEARS.map(g => (
                    <button key={g.pos} onClick={() => jumpTo(g.pos)} title={`Ir a ${g.name} (${g.symbol}) — at(${g.pos}) = at(${neg(g.pos)})`} aria-label={`Engranaje ${g.pos} ${g.name}`}
                      className={`gear-btn rounded-xl border py-2 sm:py-3 text-xl sm:text-3xl ${g.pos === pos ? "active" : ""} ${g.pos === level.target ? "target" : ""}`}
                      style={{ borderColor: "rgba(255,255,255,.14)", background: g.pos === pos ? "rgba(245,196,81,.16)" : "rgba(255,255,255,.04)" }}>
                      <span className="block leading-none">{g.symbol}</span><span className="block text-[10px] sm:text-xs mt-1 font-bold" style={{ color: "var(--muted)" }}>{g.name}</span>
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-1 sm:gap-2 text-center mono text-[11px] sm:text-sm mt-1" style={{ color: "var(--cyan)" }}>{GEARS.map(g => <span key={g.pos}>{neg(g.pos)}</span>)}</div>
                <p className="m-0 mt-2 text-center text-xs sm:text-sm" style={{ color: "var(--muted)" }}>Pulsa un engranaje o usa ← → · El reloj es circular: de at(6) pasas a at(0)</p>
              </div>

              <div className="mt-4 rounded-2xl border p-4 text-center" style={{ borderColor: "var(--line)", background: "rgba(245,196,81,.06)" }}>
                <p className="m-0 text-sm" style={{ color: "var(--muted)" }}>Posición actual</p>
                <p className="m-0 font-bold leading-tight" style={{ fontSize: "clamp(20px,4vw,32px)" }}>at({neg(pos)}) = at({pos}) → {current.symbol} <span className="text-base sm:text-xl">{current.name}</span></p>
                <p className="m-0 mt-1">Estás en <strong>at({neg(pos)}) = at({pos}) → {current.symbol}</strong></p>
                <p className="m-0 mt-2 text-lg">Objetivo: llegar al engranaje <strong className="gold-text">[{level.target}]{target.symbol} {target.name}</strong></p>
                <p className="mono m-0 mt-2 text-sm sm:text-base">reloj.at({pos}) <span style={{ color: "var(--muted)" }}>// →</span> {current.symbol} &nbsp;·&nbsp; reloj.at({neg(pos)}) <span style={{ color: "var(--muted)" }}>// →</span> {current.symbol}</p>
              </div>

              <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
                <button onClick={() => move(-1, "←")} aria-label="Mover hacia atrás" className="rounded-2xl border px-5 sm:px-7 py-3 text-2xl font-bold hover:brightness-125 active:scale-95" style={{ borderColor: "var(--line-cyan)", background: "rgba(34,211,238,.12)" }}><ChevronLeft size={22} className="inline" /> ←</button>
                <button onClick={() => move(1, "→")} aria-label="Mover hacia adelante" className="rounded-2xl border px-5 sm:px-7 py-3 text-2xl font-bold hover:brightness-125 active:scale-95" style={{ borderColor: "var(--line-cyan)", background: "rgba(34,211,238,.12)" }}>→ <ChevronRight size={22} className="inline" /></button>
                <button onClick={sync} className="rounded-2xl px-5 sm:px-6 py-3 font-bold text-base sm:text-lg hover:brightness-110 active:scale-95" style={{ background: "linear-gradient(135deg,#f5c451,#ff8a3c)", color: "#1a1200" }}><Sparkles size={18} className="inline -mt-0.5" /> ¡SINCRONIZAR!</button>
              </div>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                <button onClick={restart} className="rounded-xl border px-4 py-2 text-sm flex items-center gap-2"><RotateCcw size={15} /> 🔄 Reiniciar nivel</button>
                {level.id === 5 && <button onClick={tryAt10} className="rounded-xl border px-4 py-2 text-sm flex items-center gap-2" style={{ borderColor: "rgba(255,84,112,.5)", color: "#ffb3c2" }}><TriangleAlert size={15} /> ⚠️ Intentar at(10) <span className="opacity-70">(-5)</span></button>}
                {nextLevel && <button onClick={() => selectLevel(levelIdx + 1)} className="rounded-xl border px-4 py-2 text-sm">Siguiente: Nivel {nextLevel.id} →</button>}
              </div>

              {feedback && (
                <div role="status" className="mt-4 rounded-xl border p-3 text-[15px] leading-relaxed" style={{ borderColor: feedback.ok ? "rgba(61,220,151,.6)" : "rgba(255,84,112,.6)", background: feedback.ok ? "rgba(61,220,151,.1)" : "rgba(255,84,112,.1)" }}>
                  {feedback.text}
                  {!feedback.ok && <div className="mt-1 text-sm" style={{ color: "var(--muted)" }}>El tiempo se distorsiona… Respira y vuelve a calcular el camino más corto.</div>}
                  {feedback.ok && <div className="mt-1 text-sm">✨ El reloj brilla. Chronos sonríe.</div>}
                </div>
              )}

              <div className="mt-4 rounded-xl border p-3">
                <p className="m-0 text-sm font-bold">🧠 Concepto del nivel</p>
                <p className="m-0 mt-1 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{level.concept}</p>
                <p className="m-0 mt-2 text-sm"><strong className="gold-text">💡 Pista:</strong> {level.hint}</p>
                <p className="mono m-0 mt-2 text-xs sm:text-sm break-words">{level.code}</p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                {[["+10", "mínimo"], ["+5", "más pasos"], ["-3", "si se pasa"]].map(([v, l]) => <div key={l} className="rounded-xl border p-2"><div className="font-bold text-lg gold-text">{v}</div><div className="text-xs" style={{ color: "var(--muted)" }}>{l}</div></div>)}
              </div>
              {level.id === 5 && <p className="m-0 mt-2 text-center text-sm" style={{ color: "var(--muted)" }}>Nivel 5 especial: +15 en 3 pasos con wrap · -5 si intentas at(10)</p>}
            </section>

            {/* RIGHT DEBUGGER */}
            <aside className="panel panel-cyan p-4 min-w-0">
              <div className="flex items-center justify-between gap-2"><h2 className="m-0 text-lg font-bold">🛠️ DEPURADOR AVANZADO: <span style={{ color: "var(--cyan)" }}>.at()</span></h2><span className="mono text-xs px-2 py-1 rounded-full border" style={{ borderColor: "var(--line-cyan)", color: "var(--cyan)" }}>EN VIVO</span></div>
              <div className="mono mt-3 rounded-xl border p-3 text-[13px] leading-relaxed min-h-[220px] max-h-[360px] overflow-y-auto scroll-thin" style={{ borderColor: "rgba(34,211,238,.25)", background: "rgba(2,6,14,.85)", overflowWrap: "anywhere" }}>
                {debug.map((line, i) => <p key={i} className="m-0 py-0.5" style={{ color: i === 0 ? "#ffe9a8" : line.startsWith("✅") ? "var(--ok)" : line.startsWith("❌") ? "var(--danger)" : "var(--muted)" }}>{line}</p>)}
              </div>
              <div className="mt-3 space-y-2 text-sm">
                <div className="rounded-xl border p-3"><strong>Posición:</strong> at({neg(pos)}) = at({pos}) → {current.symbol}<br /><span style={{ color: "var(--muted)" }}>Pasos: {steps} / Mínimo: {level.min} · Objetivo: [{level.target}]{target.symbol}</span></div>
                <div className="rounded-xl border p-3">🧠 <strong>at(3) = at(-4)</strong> en array de 7 porque 3 − 7 = −4</div>
                <div className="rounded-xl border p-3">⚖️ <strong>Circular:</strong> at(6) +1 → at(0) | at(0) −1 → at(-1)</div>
                <div className="rounded-xl border p-3 flex items-center gap-2"><Trophy size={16} className="text-[#f5c451]" /> <span><strong>Puntos:</strong> {score} · <strong>Racha:</strong> {streak} · <strong>Resueltos:</strong> {solved.length}/5</span></div>
              </div>
              <div className="mt-3">
                <p className="m-0 text-sm font-bold">Progreso</p>
                <div className="mt-1 h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,.1)" }}><div className="h-full" style={{ width: `${(solved.length / 5) * 100}%`, background: "linear-gradient(90deg,#22d3ee,#f5c451)", transition: "width .4s" }} /></div>
                <p className="m-0 mt-1 text-xs" style={{ color: "var(--muted)" }}>{solved.length === 5 ? "🎉 ¡Reloj completamente sincronizado!" : `Te faltan ${5 - solved.length} engranajes por sincronizar.`}</p>
              </div>
            </aside>
          </div>

          {/* BOTTOM at() PANEL */}
          <section className="panel mt-4 p-4">
            <h2 className="m-0 text-lg font-bold">🔍 PANEL at() <span className="text-sm font-medium" style={{ color: "var(--muted)" }}>— siempre visible</span></h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {["at(0) → primero", "at(-1) → último", "at(-2) → penúltimo", "at(3) = at(-4) en array de 7", "Circular: at(6) → → at(0)", "at(10) → undefined"].map(t => (
                <span key={t} className="mono rounded-full border px-3 py-2 text-xs sm:text-sm" style={{ borderColor: t.includes("undefined") ? "rgba(255,84,112,.5)" : "var(--line)", color: t.includes("undefined") ? "#ffb3c2" : "var(--text)", background: "rgba(255,255,255,.03)" }}>{t}</span>
              ))}
            </div>
            <p className="m-0 mt-3 text-sm leading-relaxed" style={{ color: "var(--muted)" }}>Regla de oro: <strong className="text-white">at() acepta positivos y negativos.</strong> Puedes llegar al mismo engranaje con at(3) o at(-4) en un array de 7. El juego premia el camino más corto. Tu progreso (puntos, racha y niveles resueltos) se guarda para que puedas continuar después.</p>
          </section>
        </main>
        <footer className="mt-4 text-center text-xs pb-2" style={{ color: "var(--muted)" }}>Chronos · El Reloj de Índices · Aprende .at() jugando · at(0) primero · at(-1) último · at(10) undefined</footer>
      </div>
    </div>
  );
}
