import React, { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Check, ChevronLeft, Clock3, Eraser, Eye, Moon, Play, RotateCcw, Save, Sparkles, Trophy, X } from "lucide-react";

type Mode = "rondas" | "versus" | "infinito" | "nivel19";
type SavedScore = { id: string; value: any; created_at?: string };
type RoundDef = { id: number; verse: string[]; target: string; label: string };

const EMOJI: Record<string, string> = { sol: "☀️", luna: "🌙", estrella: "⭐", amor: "❤️", noche: "🌌", mar: "🌊", luz: "💡", sombra: "🌑" };
const BASE = ["sol", "luna", "sol", "estrella", "sol", "luna"];
const VERSE5 = ["amor", "noche", "amor", "mar", "noche", "amor", "mar"];
const VERSE6 = ["luz", "sombra", "luz", "noche", "sombra", "luz", "noche", "luz"];
const VERSE19 = ["sol", "luna", "estrella", "amor", "noche", "luna", "mar", "luz", "sombra", "amor", "luna", "noche", "sol", "mar", "luz", "sombra", "luna", "estrella", "amor"];
const POOL = ["sol", "luna", "estrella", "amor", "noche", "mar", "luz", "sombra"];
const ROUNDS: RoundDef[] = [
  { id: 1, verse: BASE, target: "sol", label: "Última 'sol'" },
  { id: 2, verse: BASE, target: "luna", label: "Última 'luna'" },
  { id: 3, verse: BASE, target: "estrella", label: "Última 'estrella'" },
  { id: 4, verse: BASE, target: "mar", label: "Caso -1: 'mar'" },
  { id: 5, verse: VERSE5, target: "amor", label: "Última 'amor'" },
  { id: 6, verse: VERSE6, target: "sombra", label: "Última 'sombra'" },
];

function lastIndexOf(verse: string[], target: string) { return verse.lastIndexOf(target); }
function firstIndexOf(verse: string[], target: string) { return verse.indexOf(target); }
function randomVerse(): { verse: string[]; target: string } {
  const verse = Array.from({ length: 15 }, () => POOL[Math.floor(Math.random() * POOL.length)]);
  const target = verse[Math.floor(Math.random() * verse.length)];
  return { verse, target };
}
function cleanCode(s: string) { return s.toLowerCase().replace(/\s+/g, "").replace(/["']/g, "'").replace(/;$/, ""); }

export default function App() {
  const [mode, setMode] = useState<Mode>("rondas");
  const [roundIdx, setRoundIdx] = useState(0);
  const [versusAskFirst, setVersusAskFirst] = useState(true);
  const [infinite, setInfinite] = useState(() => randomVerse());
  const [answer, setAnswer] = useState("");
  const [code, setCode] = useState("");
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState<number[]>([]);
  const [solvedVersus, setSolvedVersus] = useState<string[]>([]);
  const [usedTraverse, setUsedTraverse] = useState(false);
  const [traversing, setTraversing] = useState(false);
  const [cursor, setCursor] = useState<number | null>(null);
  const [logs, setLogs] = useState<string[]>(["✦ El depurador está listo. Pulsa RECORRER para ver el recorrido ←←←."]);
  const [feedback, setFeedback] = useState<{ type: "ok" | "bad" | "info"; text: string } | null>(null);
  const [shake, setShake] = useState(false);
  const [bitacora, setBitacora] = useState<string[]>(["La biblioteca abre. El eco espera la última palabra."]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [level19Done, setLevel19Done] = useState(false);
  const [saved, setSaved] = useState<SavedScore[]>([]);
  const [saveMsg, setSaveMsg] = useState("");
  const [loadingScores, setLoadingScores] = useState(true);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const current: { verse: string[]; target: string; askFirst: boolean; title: string; codeHint: string } = useMemo(() => {
    if (mode === "rondas") {
      const r = ROUNDS[roundIdx];
      return { verse: r.verse, target: r.target, askFirst: false, title: `Ronda ${r.id} · ${r.label}`, codeHint: `verso.lastIndexOf('${r.target}')` };
    }
    if (mode === "versus") return { verse: BASE, target: "sol", askFirst: versusAskFirst, title: versusAskFirst ? "Primera vs Última · PRIMERA 'sol'" : "Primera vs Última · ÚLTIMA 'sol'", codeHint: versusAskFirst ? "verso.indexOf('sol')" : "verso.lastIndexOf('sol')" };
    if (mode === "infinito") return { verse: infinite.verse, target: infinite.target, askFirst: false, title: "Modo Infinito · verso de 15 palabras", codeHint: `verso.lastIndexOf('${infinite.target}')` };
    return { verse: VERSE19, target: "luna", askFirst: false, title: "Nivel 19 · Última 'luna'", codeHint: "verso.lastIndexOf('luna')" };
  }, [mode, roundIdx, versusAskFirst, infinite]);

  const expected = current.askFirst ? firstIndexOf(current.verse, current.target) : lastIndexOf(current.verse, current.target);
  const opposite = current.askFirst ? lastIndexOf(current.verse, current.target) : firstIndexOf(current.verse, current.target);
  const method = current.askFirst ? "indexOf" : "lastIndexOf";
  const methodWord = current.askFirst ? "PRIMERA" : "ÚLTIMA";

  async function reloadRecords() {
    setLoadingScores(true);
    try {
      const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "records.list", args: { collection: "eco-de-palabras-partidas", limit: 20 } }) });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok || payload.error) throw new Error(payload.error || "No se pudo cargar el marcador.");
      setSaved((payload.data?.records || []) as SavedScore[]);
    } catch {
      setSaved([]);
    } finally { setLoadingScores(false); }
  }
  useEffect(() => { reloadRecords(); }, []);

  useEffect(() => {
    setAnswer(""); setCode(""); setFeedback(null); setUsedTraverse(false); setCursor(null); setShake(false);
    setLogs([`✦ ${current.title}. El verso tiene ${current.verse.length} palabras.`]);
    if (mode === "nivel19" && !level19Done) setTimeLeft(60);
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, roundIdx, versusAskFirst, infinite]);

  useEffect(() => {
    if (mode !== "nivel19" || level19Done) return;
    if (timeLeft <= 0) { setFeedback({ type: "bad", text: "⏰ Se acabó el tiempo. La última 'luna' estaba en el índice 16." }); setStreak(0); return; }
    const id = window.setInterval(() => setTimeLeft(v => Math.max(0, v - 1)), 1000);
    return () => window.clearInterval(id);
  }, [mode, timeLeft, level19Done]);

  function pushLog(lines: string[]) { setLogs(prev => [...prev, ...lines].slice(-30)); }

  async function traverse() {
    if (traversing) return;
    setTraversing(true); setUsedTraverse(true); setFeedback(null);
    pushLog([`> Ejecutando verso.${method}('${current.target}')`]);
    let found: number | null = null;
    const order = current.askFirst ? [...current.verse.keys()] : [...current.verse.keys()].reverse();
    for (const i of order) {
      setCursor(i);
      const equal = current.verse[i] === current.target;
      pushLog([`[${i}] '${current.verse[i]}' === '${current.target}'? ${equal} → ${equal ? "✅ coincide" : "sigue"}`]);
      await new Promise(r => setTimeout(r, 210));
      if (equal) { found = i; break; }
    }
    setTraversing(false); setCursor(found);
    if (found !== null) pushLog([`✅ ¡ENCONTRADO! Se detiene aquí.`, `> Resultado: ${found} ← Es un NÚMERO.`]);
    else pushLog([`Revisó [${order.join("], [")}], ninguno === '${current.target}' → devuelve -1.`, `> Resultado: -1`]);
    pushLog([`🧠 Igualdad exacta ===. 'Sol' con mayúscula NO sería igual a 'sol'.`, `⚖️ indexOf('${current.target}') → ${firstIndexOf(current.verse, current.target)} (primera) | lastIndexOf('${current.target}') → ${lastIndexOf(current.verse, current.target)} (última)`]);
  }

  function nextAfterSolve() {
    if (mode === "rondas" && roundIdx < ROUNDS.length - 1) setRoundIdx(roundIdx + 1);
    else if (mode === "versus") setVersusAskFirst(!versusAskFirst);
    else if (mode === "infinito") setInfinite(randomVerse());
  }

  function check() {
    if (traversing) return;
    const value = answer.trim();
    if (value === "" || Number.isNaN(Number(value))) { setFeedback({ type: "info", text: "Escribe un número. Puede ser -1 si la palabra no está en el verso." }); return; }
    const n = Number(value);
    const codeOk = code.trim() !== "" && cleanCode(code).includes(`${method}('${current.target}')`);
    if (n === expected) {
      let gain = mode === "nivel19" ? 20 : 10;
      if (codeOk) gain += 5;
      if (usedTraverse) gain += 5;
      setPoints(p => p + gain); setStreak(s => s + 1);
      if (mode === "rondas" && !solved.includes(ROUNDS[roundIdx].id)) setSolved([...solved, ROUNDS[roundIdx].id]);
      if (mode === "versus") setSolvedVersus([...new Set([...solvedVersus, versusAskFirst ? "primera" : "ultima"])]);
      if (mode === "nivel19") setLevel19Done(true);
      setFeedback({ type: "ok", text: `✅ ¡Exacto! verso.${method}('${current.target}') // → ${expected} · +${gain} puntos${codeOk ? " (incluye +5 por código)" : ""}${usedTraverse ? " (incluye +5 por recorrer)" : ""}${mode === "nivel19" ? " · Badge POETA NIVEL 19 desbloqueada." : ""}` });
      setBitacora(prev => [`✅ ${current.title}: ${expected} (+${gain})`, ...prev].slice(0, 8));
      pushLog([`> Resultado confirmado: ${expected}`, `🎉 Eco dorado: la palabra brilla en el verso.`]);
      window.setTimeout(nextAfterSolve, 1150);
    } else {
      const isOpposite = n === opposite && opposite !== expected;
      const loss = isOpposite ? -5 : -3;
      setPoints(p => Math.max(0, p + loss)); setStreak(0); setShake(true);
      window.setTimeout(() => setShake(false), 500);
      let text = "";
      if (isOpposite) text = current.askFirst ? `Esa es la ÚLTIMA 'sol', pero pedimos la PRIMERA. indexOf devuelve la primera aparición. La respuesta era ${expected}. (−5)` : `Ese también es '${current.target}', pero ${method} devuelve la ÚLTIMA aparición. La respuesta era ${expected}. (−5)`;
      else if (expected === -1) text = `lastIndexOf devuelve -1 porque '${current.target}' no está en el verso. (−3)`;
      else if (n >= 0 && n < current.verse.length && current.verse[n] === current.target) text = `Ese también es '${current.target}', pero lastIndexOf devuelve la ÚLTIMA aparición. La respuesta era ${expected}. (−3)`;
      else text = `Ese índice no es la ${methodWord.toLowerCase()} '${current.target}'. La respuesta era ${expected}. (−3)`;
      setFeedback({ type: "bad", text });
      setBitacora(prev => [`❌ ${current.title}: escribió ${n}, era ${expected} (${loss})`, ...prev].slice(0, 8));
      if (isOpposite) pushLog([`⚠️ Error típico: confundiste la dirección.`, `Revisó desde el final y ya encontró la última en ${lastIndexOf(current.verse, current.target)}. No llega al ${firstIndexOf(current.verse, current.target)}.`]);
      else pushLog([`✖ ${n} no es la respuesta.`, `⚖️ indexOf('${current.target}') → ${firstIndexOf(current.verse, current.target)} | lastIndexOf('${current.target}') → ${lastIndexOf(current.verse, current.target)}`]);
    }
  }

  async function saveScore() {
    setSaving(true); setSaveMsg("");
    const value = { puntos: points, racha: streak, rondas_resueltas: solved, modo: mode, nivel19: level19Done, guardado_en: new Date().toISOString() };
    try {
      const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "records.create", args: { collection: "eco-de-palabras-partidas", value, idempotency_key: `eco-${Date.now()}-${points}-${mode}` } }) });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok || payload.error) throw new Error(payload.error || "No se pudo guardar.");
      setSaveMsg("✅ Puntuación guardada.");
      await reloadRecords();
    } catch (e) { setSaveMsg(`❌ ${e instanceof Error ? e.message : "No se pudo guardar."}`); }
    finally { setSaving(false); }
  }

  function restart() {
    setPoints(0); setStreak(0); setSolved([]); setSolvedVersus([]); setLevel19Done(false); setMode("rondas"); setRoundIdx(0); setVersusAskFirst(true); setInfinite(randomVerse()); setTimeLeft(60); setBitacora(["🔄 La biblioteca vuelve a abrir. Nuevo intento, mismo eco."]); setLogs(["✦ Partida reiniciada."]); setAnswer(""); setCode("");
  }

  const bestSaved = saved.length ? Math.max(...saved.map(s => Number(s.value?.puntos || 0))) : 0;

  return (
    <div data-safe-area-inset-root className="min-h-screen w-full overflow-x-clip bg-[#030508] text-[#e8e2d2]" style={{ boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)" }}>
      <div className="mx-auto max-w-[1500px] px-3 pb-8 sm:px-5">
        <header data-safe-area-sticky-top className="sticky z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(242,201,76,.22)] bg-[#030508]/95 py-3" style={{ top: "var(--safe-area-inset-top)" }}>
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#f2c94c] bg-[#f2c94c]/10 text-2xl" aria-hidden>📖</div>
            <div className="min-w-0">
              <h1 className="text-[clamp(1.25rem,3vw,2rem)] font-bold leading-none tracking-wide">POETA <span className="text-[#f2c94c]">· ECO DE PALABRAS</span></h1>
              <p className="mt-1 text-xs uppercase tracking-[.22em] text-[#9aa7bd]">lastIndexOf con strings · la última repetición</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-[#45e6a3]/40 bg-[#45e6a3]/10 px-3 py-1 text-sm font-bold text-[#45e6a3]">🌙 BIBLIOTECA</span>
            <span className="rounded-full border border-[#f2c94c]/50 bg-[#f2c94c]/10 px-3 py-1 text-sm font-bold">PUNTOS: <span className="text-[#f2c94c]">{points}</span></span>
            <span className="rounded-full border border-[#b8d7ff]/40 bg-[#b8d7ff]/10 px-3 py-1 text-sm font-bold">RACHA: {streak} 🔥</span>
            {level19Done && <span className="rounded-full bg-[#f2c94c] px-3 py-1 text-sm font-bold text-black">🏅 POETA NIVEL 19</span>}
          </div>
        </header>

        <div className="mt-4 grid items-start gap-4 lg:grid-cols-[300px_minmax(0,1fr)_420px]">
          {/* IZQUIERDA */}
          <aside className="space-y-4">
            <section className="panel p-4">
              <div className="flex items-center justify-between"><h2 className="font-bold tracking-wide">📜 VERSOS</h2><span className="text-xs text-[#9aa7bd]">{solved.length}/6 rondas</span></div>
              <div className="mt-3 space-y-2">
                {ROUNDS.map((r, i) => (
                  <button key={r.id} onClick={() => { setMode("rondas"); setRoundIdx(i); }} className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left ${mode === "rondas" && roundIdx === i ? "border-[#f2c94c] bg-[#f2c94c]/15" : "border-white/10 bg-white/[.02]"}`}>
                    <span><strong>Ronda {r.id}</strong><span className="block text-xs text-[#9aa7bd]">{r.label}</span></span><span>{solved.includes(r.id) ? "✅" : "○"}</span>
                  </button>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button onClick={() => setMode("versus")} className={`rounded-xl border px-2 py-2 text-sm font-bold ${mode === "versus" ? "border-[#f2c94c] bg-[#f2c94c]/15" : "border-white/10"}`}>⚖️ Primera vs Última {solvedVersus.length === 2 ? "✅" : ""}</button>
                <button onClick={() => { setMode("infinito"); setInfinite(randomVerse()); }} className={`rounded-xl border px-2 py-2 text-sm font-bold ${mode === "infinito" ? "border-[#f2c94c] bg-[#f2c94c]/15" : "border-white/10"}`}>♾️ Infinito</button>
              </div>
              <button onClick={() => setMode("nivel19")} className={`mt-2 flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left ${mode === "nivel19" ? "border-[#f2c94c] bg-[#f2c94c]/15" : "border-[#f2c94c]/30 bg-[#f2c94c]/[.04]"}`}>
                <span><strong>🌙 Nivel 19</strong><span className="block text-xs text-[#9aa7bd]">19 palabras · 60 s · +20</span></span><span>{level19Done ? "🏅" : mode === "nivel19" ? <span className="mono flex items-center gap-1 text-[#f2c94c]"><Clock3 size={14} />{timeLeft}s</span> : "→"}</span>
              </button>
            </section>

            <section className="panel p-4">
              <h3 className="font-bold text-[#f2c94c]">indexOf vs lastIndexOf con strings</h3>
              <p className="mono mt-3 text-[13px] leading-relaxed">indexOf('{current.target}') → {firstIndexOf(current.verse, current.target)} <span className="text-[#9aa7bd]">(primera)</span><br />lastIndexOf('{current.target}') → {lastIndexOf(current.verse, current.target)} <span className="text-[#9aa7bd]">(última)</span></p>
              <p className="mt-3 text-sm leading-relaxed text-[#c8d0de]">Misma igualdad exacta <span className="mono text-[#f2c94c]">===</span>. Dirección opuesta: <strong>indexOf</strong> busca →→→ desde el inicio; <strong>lastIndexOf</strong> busca ←←← desde el final.</p>
            </section>

            <section className="panel p-4">
              <h3 className="font-bold">🪶 Bitácora del poeta</h3>
              <div className="mt-2 space-y-2">
                {bitacora.map((b, i) => <p key={i} className="text-sm leading-snug text-[#c8d0de] [overflow-wrap:anywhere]">{b}</p>)}
              </div>
              <div className="mt-4 border-t border-white/10 pt-3">
                <p className="text-xs uppercase tracking-widest text-[#9aa7bd]">Marcador guardado</p>
                <p className="mt-1 text-sm">{loadingScores ? "Cargando…" : saved.length ? `Mejor puntuación guardada: ${bestSaved} · ${saved.length} partidas` : "Aún no hay partidas guardadas."}</p>
                <button onClick={saveScore} disabled={saving} className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f2c94c] px-3 py-2 font-bold text-black"><Save size={16} />{saving ? "Guardando…" : "Guardar puntuación"}</button>
                {saveMsg && <p className="mt-2 text-sm [overflow-wrap:anywhere]">{saveMsg}</p>}
              </div>
              <button onClick={restart} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-2 font-bold"><RotateCcw size={16} /> Reiniciar partida</button>
            </section>
          </aside>

          {/* CENTRO */}
          <main className="space-y-4">
            <section className={`panel p-4 sm:p-6 ${shake ? "shake border-[#ff5470]" : ""}`}>
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div><p className="text-xs uppercase tracking-[.25em] text-[#9aa7bd]">📖 Verso · lee con calma</p><h2 className="mt-1 text-2xl font-bold">{current.title}</h2></div>
                {mode === "nivel19" && !level19Done && <span className="mono flex items-center gap-2 rounded-full border border-[#ff5470]/40 bg-[#ff5470]/10 px-3 py-1 text-sm"><Clock3 size={15} /> {timeLeft}s</span>}
              </div>

              <div className="paper mt-4 rounded-2xl p-3 sm:p-4">
                <div className="flex flex-wrap gap-2">
                  {current.verse.map((w, i) => {
                    const isCursor = cursor === i;
                    const isFound = feedback?.type === "ok" && i === expected;
                    return (
                      <button key={`${i}-${w}`} onClick={() => { setAnswer(String(i)); inputRef.current?.focus(); }} title={`Poner ${i} en el input`} className={`min-w-[92px] flex-1 rounded-xl border px-2 py-3 text-center ${isFound ? "gold-glow" : isCursor ? "traverse" : "border-[#e8e2d2]/20 bg-[#030508]/35"}`}>
                        <span className="mono block text-xs text-[#f2c94c]">[{i}]</span>
                        <span className="mt-1 block text-lg font-bold leading-tight [overflow-wrap:anywhere]">{w} {EMOJI[w]}</span>
                        {isFound && <span className="echo mt-1 block text-xs font-bold text-[#f2c94c]">← última '{w}' 📖</span>}
                        {isCursor && !isFound && <span className="block text-xs text-[#b8d7ff]">◀ revisando</span>}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-3 text-center text-xs text-[#9aa7bd]">Toca una palabra para poner su índice en el input. El input es la respuesta principal.</p>
              </div>

              <div className="mt-5 text-center">
                <p className="text-sm uppercase tracking-[.2em] text-[#f2c94c]">🎯 Pregunta</p>
                <p className="mt-2 text-[clamp(1.4rem,3.4vw,2.2rem)] font-bold leading-tight">¿En qué ÍNDICE aparece por <span className="text-[#f2c94c]">{methodWord}</span> vez <span className="text-[#f2c94c]">‘{current.target}’</span>?</p>
              </div>

              <form onSubmit={e => { e.preventDefault(); check(); }} className="mt-5">
                <label className="text-sm font-bold" htmlFor="indice">Tu respuesta · un número</label>
                <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                  <input ref={inputRef} id="indice" type="number" value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Escribe el índice o -1" autoFocus className="mono min-w-0 flex-1 rounded-2xl border-2 border-[#f2c94c]/60 bg-black/50 px-5 py-4 text-center text-3xl font-bold text-[#ffe9a3] outline-none placeholder:text-base placeholder:text-[#9aa7bd] focus:border-[#f2c94c]" />
                  <button type="submit" disabled={traversing} className="flex items-center justify-center gap-2 rounded-2xl bg-[#f2c94c] px-5 py-4 text-lg font-bold text-black"><Check size={20} /> COMPROBAR <span className="hidden text-xs font-semibold sm:inline">(Enter)</span></button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button type="button" onClick={traverse} disabled={traversing} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#b8d7ff]/50 bg-[#b8d7ff]/10 px-3 py-3 font-bold"><Play size={17} /> {traversing ? "Recorriendo…" : "RECORRER DESDE EL FINAL (←←←)"}</button>
                  <button type="button" onClick={() => { setAnswer("-1"); inputRef.current?.focus(); }} className="rounded-xl border border-[#ff5470]/50 bg-[#ff5470]/10 px-4 py-3 font-bold">−1 · No está</button>
                  <button type="button" onClick={() => { setAnswer(""); setCode(""); setFeedback(null); }} className="flex items-center gap-2 rounded-xl border border-white/15 px-3 py-3 font-bold"><Eraser size={16} /> Limpiar</button>
                </div>
              </form>

              <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
                <label className="flex items-center gap-2 text-sm font-bold" htmlFor="codigo"><Sparkles size={16} className="text-[#f2c94c]" /> Código opcional · +5 si es correcto</label>
                <input id="codigo" value={code} onChange={e => setCode(e.target.value)} placeholder={`Ej: verso.${method}('${current.target}')`} className="mono mt-2 w-full rounded-xl border border-white/15 bg-[#030508] px-4 py-3 text-sm text-[#b8d7ff] outline-none [overflow-wrap:anywhere]" />
                <p className="mt-2 text-xs text-[#9aa7bd]">Pista: el método devuelve un número, no la palabra.</p>
              </div>

              {feedback && <div className={`fade-up mt-4 rounded-2xl border p-4 ${feedback.type === "ok" ? "border-[#45e6a3]/50 bg-[#45e6a3]/10" : feedback.type === "bad" ? "border-[#ff5470]/50 bg-[#ff5470]/10" : "border-[#f2c94c]/40 bg-[#f2c94c]/10"}`} role="status"><p className="text-base font-semibold leading-relaxed [overflow-wrap:anywhere]">{feedback.text}</p>{feedback.type === "ok" && <p className="mono mt-2 text-sm">verso.{method}('{current.target}') // → {expected}</p>}</div>}
              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#9aa7bd]"><span>✅ Acierto +10</span><span>⚠️ Error de dirección −5</span><span>❌ Otro error −3</span><span>🧭 Recorrer + acierto +5</span><span>💻 Código +5</span></div>
            </section>

            <section className="panel p-4">
              <h3 className="flex items-center gap-2 font-bold"><BookOpen size={18} className="text-[#f2c94c]" /> Cómo lo recuerda el poeta</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#c8d0de]">No busques la primera palabra que suena igual. Deja que el eco viaje desde el final: la primera coincidencia que encuentres al retroceder es la <strong>última</strong> aparición. Si el eco no vuelve, la respuesta es <strong>−1</strong>.</p>
            </section>
          </main>

          {/* DERECHA */}
          <aside className="space-y-4">
            <section className="panel overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><h2 className="font-bold">🖥️ DEPURADOR AVANZADO</h2><span className="mono text-xs text-[#45e6a3]">.lastIndexOf()</span></div>
              <div className="scroll-thin max-h-[560px] overflow-y-auto bg-black/60 p-4 lg:max-h-[680px]">
                <div className="space-y-2">
                  {logs.map((l, i) => <p key={i} className="mono text-[12.5px] leading-relaxed text-[#d7e2f2] [overflow-wrap:anywhere]">{l}</p>)}
                </div>
                <div className="mt-4 border-t border-[#f2c94c]/25 pt-3">
                  <p className="mono text-[12.5px] leading-relaxed text-[#ffe9a3]">🧠 Depurador: lastIndexOf usa IGUALDAD EXACTA === de strings. 'Sol' con mayúscula NO sería igual a 'sol'. Por eso es sensible a mayúsculas.</p>
                  <p className="mono mt-2 text-[12.5px] leading-relaxed text-[#b8d7ff]">&gt; Resultado: {expected} ← Es un NÚMERO, la posición de la ÚLTIMA aparición.</p>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs text-[#9aa7bd]"><span className="flex items-center gap-1"><Eye size={13} /> Recorrido ←←←</span><span>Igualdad ===</span><span className="flex items-center gap-1"><Moon size={13} /> Eco activo</span></div>
            </section>
            <section className="panel p-4">
              <h3 className="flex items-center gap-2 font-bold"><Trophy size={18} className="text-[#f2c94c]" /> Partidas guardadas</h3>
              {loadingScores ? <p className="mt-2 text-sm text-[#9aa7bd]">Cargando marcador…</p> : saved.length === 0 ? <p className="mt-2 text-sm text-[#9aa7bd]">Guarda tu puntuación para verla aquí.</p> : <div className="mt-3 space-y-2">{saved.slice(0, 4).map(s => <div key={s.id} className="flex items-center justify-between rounded-xl border border-white/10 px-3 py-2 text-sm"><span className="capitalize">{String(s.value?.modo || "rondas")}</span><strong className="text-[#f2c94c]">{Number(s.value?.puntos || 0)} pts</strong></div>)}</div>}
              <p className="mt-3 flex items-start gap-1 text-xs leading-relaxed text-[#9aa7bd]"><X size={13} className="mt-0.5 shrink-0" /> La puntuación solo se guarda cuando pulsas “Guardar puntuación”.</p>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
