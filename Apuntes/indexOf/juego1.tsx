import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Weapon = { name: string; emoji: string };
type Mode = "rondas" | "versus" | "infinito" | "nivel19";
type RoundKey = string;

const BASE: Weapon[] = [
  { name: "Pistola", emoji: "🔫" },
  { name: "Daga", emoji: "🗡" },
  { name: "Pistola", emoji: "🔫" },
  { name: "Arco", emoji: "🏹" },
  { name: "Pistola", emoji: "🔫" },
  { name: "Daga", emoji: "🗡" },
  { name: "Arco", emoji: "🏹" },
];
const POOL: Weapon[] = [
  { name: "Pistola", emoji: "🔫" },
  { name: "Daga", emoji: "🗡" },
  { name: "Arco", emoji: "🏹" },
  { name: "Hacha", emoji: "🪓" },
  { name: "Cuchillo", emoji: "🔪" },
];
const LEVEL19: Weapon[] = [
  { name: "Pistola", emoji: "🔫" }, { name: "Daga", emoji: "🗡" }, { name: "Arco", emoji: "🏹" },
  { name: "Cuchillo", emoji: "🔪" }, { name: "Pistola", emoji: "🔫" }, { name: "Daga", emoji: "🗡" },
  { name: "Arco", emoji: "🏹" }, { name: "Pistola", emoji: "🔫" }, { name: "Cuchillo", emoji: "🔪" },
  { name: "Daga", emoji: "🗡" }, { name: "Arco", emoji: "🏹" }, { name: "Pistola", emoji: "🔫" },
  { name: "Daga", emoji: "🗡" }, { name: "Cuchillo", emoji: "🔪" }, { name: "Hacha", emoji: "🪓" },
  { name: "Pistola", emoji: "🔫" }, { name: "Daga", emoji: "🗡" }, { name: "Arco", emoji: "🏹" },
  { name: "Hacha", emoji: "🪓" },
];
const ROUND_TARGETS = ["Pistola", "Daga", "Arco", "Ballesta"];
const ROUND_TITLES = ["Primera Pistola", "Primera Daga", "Primer Arco", "Primera Ballesta"];

function makeInfinite() {
  const inv: Weapon[] = Array.from({ length: 20 }, () => POOL[Math.floor(Math.random() * POOL.length)]);
  const target = POOL[Math.floor(Math.random() * POOL.length)].name;
  return { inv, target };
}
function indexOfName(inv: Weapon[], name: string) { return inv.findIndex((w) => w.name === name); }
function lastIndexOfName(inv: Weapon[], name: string) {
  for (let i = inv.length - 1; i >= 0; i--) if (inv[i].name === name) return i;
  return -1;
}

export default function App() {
  const [mode, setMode] = useState<Mode>("rondas");
  const [round, setRound] = useState(0);
  const [versusFirst, setVersusFirst] = useState(true);
  const [infinite, setInfinite] = useState(() => makeInfinite());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const [lastWrong, setLastWrong] = useState(false);
  const [traversing, setTraversing] = useState(false);
  const [scanIndex, setScanIndex] = useState<number | null>(null);
  const [debugLines, setDebugLines] = useState<string[]>(["🖥️ Consola lista. Elige un índice o pulsa RECORRER."]);
  const [feedback, setFeedback] = useState("Lee el canto, elige un número y confirma. Puedes recorrer primero para ver cómo piensa indexOf.");
  const [log, setLog] = useState<string[]>(["🎯 Turno 1: la armería está lista."]);
  const [codeInput, setCodeInput] = useState("");
  const [codeClaimed, setCodeClaimed] = useState(false);
  const [saveStatus, setSaveStatus] = useState("Progreso guardado cuando hay conexión.");
  const [savedCount, setSavedCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerOn, setTimerOn] = useState(false);
  const timerRef = useRef<number | null>(null);
  const scanRef = useRef<number | null>(null);

  const current = useMemo(() => {
    if (mode === "rondas") {
      const target = ROUND_TARGETS[round];
      return { inv: BASE, target, answer: indexOfName(BASE, target), method: "indexOf" as const, label: ROUND_TITLES[round], key: `ronda-${round + 1}` };
    }
    if (mode === "versus") {
      const target = "Pistola";
      return { inv: BASE, target, answer: versusFirst ? indexOfName(BASE, target) : lastIndexOfName(BASE, target), method: (versusFirst ? "indexOf" : "lastIndexOf") as const, label: versusFirst ? "Primera Pistola" : "Última Pistola", key: versusFirst ? "versus-primera" : "versus-ultima" };
    }
    if (mode === "infinito") {
      return { inv: infinite.inv, target: infinite.target, answer: indexOfName(infinite.inv, infinite.target), method: "indexOf" as const, label: `Primera ${infinite.target}`, key: `infinito-${infinite.inv.map((w) => w.name[0]).join("")}` };
    }
    return { inv: LEVEL19, target: "Hacha", answer: 14, method: "indexOf" as const, label: "Primera Hacha", key: "nivel-19" };
  }, [mode, round, versusFirst, infinite]);

  const firstIdx = useMemo(() => indexOfName(current.inv, current.target), [current]);
  const lastIdx = useMemo(() => lastIndexOfName(current.inv, current.target), [current]);
  const questionWord = current.method === "lastIndexOf" ? "ÚLTIMA" : "PRIMERA";
  const targetEmoji = POOL.find((w) => w.name === current.target)?.emoji ?? (current.target === "Ballesta" ? "🏹" : "🎯");

  const reloadRecords = useCallback(async () => {
    try {
      const res = await fetch("actions", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ action: "records.list", args: { collection: "buscador_resultados", limit: 100 } }),
      });
      const json = await res.json();
      if (!res.ok || json.error) { setSaveStatus("Guardado no disponible en esta vista previa."); return; }
      setSavedCount(json.data?.records?.length ?? 0);
    } catch { setSaveStatus("Guardado no disponible en esta vista previa."); }
  }, []);

  useEffect(() => { reloadRecords(); }, [reloadRecords]);
  useEffect(() => () => { if (timerRef.current) window.clearInterval(timerRef.current); if (scanRef.current) window.clearInterval(scanRef.current); }, []);

  useEffect(() => {
    if (mode !== "nivel19") { setTimerOn(false); setTimeLeft(60); return; }
    setTimerOn(true); setTimeLeft(60);
    if (timerRef.current) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) { if (timerRef.current) window.clearInterval(timerRef.current); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) window.clearInterval(timerRef.current); };
  }, [mode, current.key]);

  const createRow = useCallback(async (row: Record<string, unknown>, key: string) => {
    const res = await fetch("actions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ action: "records.create", args: { collection: "buscador_resultados", value: row, idempotency_key: key } }),
    });
    const json = await res.json();
    if (!res.ok || json.error) throw new Error(typeof json.error === "string" ? json.error : "No se pudo guardar el intento.");
    return json.data;
  }, []);

  const persistAttempt = useCallback(async (payload: Record<string, unknown>, key: string) => {
    try { await createRow(payload, key); await reloadRecords(); setSaveStatus("✅ Intento guardado."); }
    catch (e) { setSaveStatus(e instanceof Error && e.message.includes("limit") ? "⚠️ Límite de registros alcanzado: este intento no se guardó." : "⚠️ Intento jugado, pero no se pudo guardar."); }
  }, [createRow, reloadRecords]);

  function resetTurn(nextMode?: Mode, nextRound?: number, nextVersus?: boolean) {
    setSelected(null); setConfirmed(false); setLastWrong(false); setScanIndex(null); setTraversing(false);
    setCodeInput(""); setCodeClaimed(false); setTimeLeft(60);
    setFeedback("Lee el canto, elige un número y confirma. Puedes recorrer primero para ver cómo piensa indexOf.");
    setDebugLines(["🖥️ Consola lista. Elige un índice o pulsa RECORRER."]);
    if (scanRef.current) window.clearInterval(scanRef.current);
    if (nextMode) setMode(nextMode);
    if (nextRound !== undefined) setRound(nextRound);
    if (nextVersus !== undefined) setVersusFirst(nextVersus);
  }

  function chooseMode(m: Mode) {
    if (m === "infinito") setInfinite(makeInfinite());
    resetTurn(m, m === "rondas" ? 0 : undefined);
    setLog((p) => [`🧭 Modo cambiado: ${m === "versus" ? "Primera vs Última" : m === "infinito" ? "Infinito" : m === "nivel19" ? "Nivel 19" : "Rondas"}.`, ...p].slice(0, 8));
  }

  function startTraversal() {
    if (traversing || confirmed) return;
    setDebugLines([`> Ejecutando inventario.${current.method}('${current.target}')`]);
    setTraversing(true); setScanIndex(0);
    let i = 0;
    if (scanRef.current) window.clearInterval(scanRef.current);
    scanRef.current = window.setInterval(() => {
      if (i >= current.inv.length) {
        setDebugLines((p) => [...p, `Revisó [0]…[${current.inv.length - 1}], ninguno === '${current.target}' → devuelve -1.`, "🧠 Depurador: indexOf usa IGUALDAD EXACTA ===, no condición. No es como findIndex que usa s => ... .", `> Resultado: -1 ← Es un NÚMERO. Significa “no está”.`, `⚖️ Comparación: indexOf('${current.target}') → -1 | lastIndexOf('${current.target}') → -1 | findIndex(...) → -1 pero con condición`]);
        setTraversing(false); setScanIndex(null); if (scanRef.current) window.clearInterval(scanRef.current); return;
      }
      const w = current.inv[i];
      const isTarget = w.name === current.target;
      const stop = current.method === "indexOf" ? isTarget : (current.method === "lastIndexOf" ? isTarget && i === current.answer : false);
      // En modo última, el recorrido visual va de derecha a izquierda.
      if (current.method === "lastIndexOf") {
        const j = current.inv.length - 1 - i;
        const wj = current.inv[j];
        setScanIndex(j);
        setDebugLines((p) => [...p, `[Iteración ${i}] [${j}] ${wj.name} === '${current.target}'? ${wj.name === current.target}`]);
        if (wj.name === current.target) {
          setDebugLines((p) => [...p, `✅ ¡ENCONTRADO! lastIndexOf se detiene en la ÚLTIMA aparición.`, `> Resultado: ${j} ← Es un NÚMERO, la posición de la ÚLTIMA aparición.`, `⚖️ Comparación: indexOf('${current.target}') → ${firstIdx} (primera) | lastIndexOf('${current.target}') → ${j} (última) | findIndex(...) → ${firstIdx} pero con condición`]);
          setTraversing(false); setScanIndex(null); if (scanRef.current) window.clearInterval(scanRef.current);
        }
        i++;
        if (i >= current.inv.length && traversing) { /* lo cierra la siguiente vuelta */ }
        return;
      }
      setScanIndex(i);
      setDebugLines((p) => [...p, `[Iteración ${i}] [${i}] ${w.name} === '${current.target}'? ${isTarget}${isTarget ? " → ✅ ¡ENCONTRADO! Se detiene aquí." : ""}`]);
      if (stop) {
        setDebugLines((p) => [...p, "🧠 Depurador: indexOf usa IGUALDAD EXACTA ===, no condición. No es como findIndex que usa s => ... . Compara valor por valor.", `> Resultado: ${i} ← Es un NÚMERO, la posición de la PRIMERA aparición.`, `⚖️ Comparación: indexOf('${current.target}') → ${firstIdx} (primera) | lastIndexOf('${current.target}') → ${lastIdx} (última) | findIndex(p => p === '${current.target}') → ${firstIdx} pero con condición`]);
        setTraversing(false); setScanIndex(null); if (scanRef.current) window.clearInterval(scanRef.current);
      }
      i++;
    }, 420);
  }

  function instantDebug(outcome: string) {
    const lines: string[] = [`> Ejecutando inventario.${current.method}('${current.target}')`];
    if (current.answer === -1) {
      for (let i = 0; i < current.inv.length; i++) lines.push(`[Iteración ${i}] [${i}] ${current.inv[i].name} === '${current.target}'? false`);
      lines.push(`Revisó [0]…[${current.inv.length - 1}], ninguno === '${current.target}' → devuelve -1. Si fuera findIndex con condición también daría -1, pero indexOf es solo igualdad.`);
      lines.push(`> Resultado: -1 ← Es un NÚMERO.`);
    } else if (current.method === "lastIndexOf") {
      for (let i = current.inv.length - 1; i >= current.answer; i--) lines.push(`[Iteración ${current.inv.length - 1 - i}] [${i}] ${current.inv[i].name} === '${current.target}'? ${current.inv[i].name === current.target}`);
      lines.push(`✅ ¡ENCONTRADO! Se detiene en la ÚLTIMA aparición.`);
      lines.push(`> Resultado: ${current.answer} ← Es un NÚMERO, la posición de la ÚLTIMA aparición.`);
    } else {
      for (let i = 0; i <= current.answer; i++) lines.push(`[Iteración ${i}] [${i}] ${current.inv[i].name} === '${current.target}'? ${current.inv[i].name === current.target}${i === current.answer ? " → ✅ ¡ENCONTRADO! Se detiene aquí." : ""}`);
      lines.push("🧠 Depurador: indexOf usa IGUALDAD EXACTA ===, no condición. No es como findIndex que usa s => ... . Compara valor por valor.");
      lines.push(`> Resultado: ${current.answer} ← Es un NÚMERO, la posición de la PRIMERA aparición.`);
    }
    if (outcome === "tipico" && selected !== null) {
      lines.push(`⚠️ Tu elección fue ${selected}. Revisó [0] ${current.inv[0].name} === '${current.target}' ${current.inv[0].name === current.target ? "true, ya se habría detenido en 0. No llega al " + selected + "." : ""}`);
    }
    lines.push(`⚖️ Comparación: indexOf('${current.target}') → ${firstIdx} (primera) | lastIndexOf('${current.target}') → ${lastIdx} (última) | findIndex(...) → ${firstIdx} pero con condición`);
    setDebugLines(lines);
  }

  async function confirm() {
    if (selected === null) { setFeedback("⚠️ Primero elige un índice en la barra inferior (o pulsa -1 si crees que no está)."); return; }
    if (confirmed || traversing) return;
    const isCorrect = selected === current.answer;
    const isTypical = !isCorrect && selected >= 0 && current.inv[selected]?.name === current.target;
    const points = isCorrect ? (mode === "nivel19" ? 20 : 10) : isTypical ? -5 : -3;
    const newScore = Math.max(0, score + points);
    setScore(newScore);
    setConfirmed(true); setLastWrong(!isCorrect);
    if (isCorrect) {
      setStreak((s) => s + 1);
      setSolved((s) => new Set(s).add(current.key));
      setFeedback(current.answer === -1
        ? `✅ Correcto: indexOf devuelve -1 porque '${current.target}' no está en el inventario. +${points} puntos.`
        : `✅ ¡Exacto! inventario.${current.method}('${current.target}') // → ${current.answer}. +${points} puntos. El arma brilla dorada.`);
    } else if (isTypical) {
      setStreak(0);
      setFeedback(current.method === "lastIndexOf"
        ? `❌ Esa también es ${current.target}, pero lastIndexOf devuelve la ÚLTIMA aparición. La respuesta era ${current.answer}. −5 puntos.`
        : `❌ Esa también es ${current.target}, pero indexOf devuelve la PRIMERA aparición. La respuesta era ${current.answer}. −5 puntos.`);
    } else {
      setStreak(0);
      setFeedback(current.answer === -1
        ? `❌ No está en el inventario. indexOf devuelve -1 porque no hay ningún '${current.target}'. −3 puntos.`
        : `❌ En [${selected}] hay ${current.inv[selected]?.name ?? "nada"}. La primera ${current.target} está en ${current.answer}. −3 puntos.`);
    }
    instantDebug(isTypical ? "tipico" : isCorrect ? "ok" : "mal");
    setLog((p) => [`${isCorrect ? "✅" : "❌"} ${current.label}: elegiste ${selected}, respuesta ${current.answer} (${points > 0 ? "+" : ""}${points}).`, ...p].slice(0, 8));
    const key = `intento-${current.key}-${selected}-${Date.now()}`;
    await persistAttempt({ modo: mode, ronda: current.label, objetivo: current.target, elegido: selected, respuesta: current.answer, puntos: points, acierto: isCorrect, error_tipico: isTypical, creado: new Date().toISOString() }, key);
  }

  function nextRound() {
    if (mode === "rondas") {
      if (round < 3) { resetTurn(undefined, round + 1); setLog((p) => [`➡️ Ronda ${round + 2}: ${ROUND_TITLES[round + 1]}.`, ...p].slice(0, 8)); }
      else { chooseMode("versus"); }
    } else if (mode === "versus") { resetTurn(undefined, undefined, !versusFirst); }
    else if (mode === "infinito") { setInfinite(makeInfinite()); resetTurn(); }
    else { resetTurn(); setTimeLeft(60); }
  }

  function validateCode() {
    if (codeClaimed) { setFeedback("Ya reclamaste el +5 de código en este turno."); return; }
    const clean = codeInput.toLowerCase().replace(/\s+/g, "");
    const wantsLast = current.method === "lastIndexOf";
    const ok = clean.includes("inventario.") && clean.includes(current.target.toLowerCase()) && (wantsLast ? clean.includes("lastindexof") : clean.includes("indexof")) && !clean.includes("findindex");
    if (ok) {
      setScore((s) => s + 5); setCodeClaimed(true);
      setFeedback(`✅ Código correcto: inventario.${current.method}('${current.target}') // → ${current.answer}. +5 puntos extra.`);
      setDebugLines((p) => [...p, `> Código validado: inventario.${current.method}('${current.target}') // → ${current.answer}`]);
    } else {
      setFeedback(`❌ Ese código no coincide. Prueba: inventario.${current.method}('${current.target}')`);
    }
  }

  function resetGame() {
    setScore(0); setStreak(0); setSolved(new Set()); setRound(0); setVersusFirst(true); setInfinite(makeInfinite());
    resetTurn("rondas", 0, true);
    setLog(["🔄 Partida reiniciada. La armería vuelve a estar lista."]);
  }

  const solvedCount = solved.size;

  return (
    <div data-safe-area-inset-root style={{boxSizing: 'border-box', paddingTop: 'var(--safe-area-inset-top)'}} className="min-h-[100dvh] bg-[#030508] text-[#eef3fb] overflow-x-clip">
      <header data-safe-area-sticky-top style={{top: 'var(--safe-area-inset-top)'}} className="sticky z-20 border-b border-[#26334d] bg-[#030508]/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-4">
          <div className="min-w-0">
            <p className="text-[11px] font-bold tracking-[0.28em] text-[#ff9a3d]">CAMPO DE TIRO · EL BUSCADOR EXPRÉS</p>
            <h1 className="text-xl font-bold leading-tight sm:text-3xl [overflow-wrap:anywhere]">🔫 ARMERÍA “EL PRIMER DISPARO” <span className="text-[#ff6a00]">— ARMERO</span></h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full border border-emerald-400/50 bg-emerald-400/10 px-3 py-1 text-xs font-bold">PROGRESO GUARDADO</span>
            <span className="rounded-full bg-[#ff6a00] px-3 py-1 text-sm font-bold text-black">PUNTOS: {score}</span>
            <span className="rounded-full border border-[#ffc400] bg-[#ffc400]/10 px-3 py-1 text-sm font-bold text-[#ffc400]">🔥 RACHA: {streak}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1440px] grid-cols-1 gap-4 px-3 py-4 sm:px-4 lg:grid-cols-[300px_minmax(0,1fr)_420px]">
        {/* IZQUIERDA */}
        <aside className="space-y-4">
          <section className="panel p-4">
            <div className="mb-3 flex items-center justify-between"><h2 className="text-lg font-bold">🎯 RONDAS</h2><span className="font-code text-xs text-[#9aa9c3]">{solvedCount} resueltas</span></div>
            <div className="space-y-2">
              {ROUND_TITLES.map((t, i) => (
                <button key={t} onClick={() => { setMode("rondas"); resetTurn("rondas", i); }} className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left text-sm font-bold ${mode === "rondas" && round === i ? "border-[#ff6a00] bg-[#ff6a00]/15 text-white" : "border-[#26334d] bg-[#0d1526]"}`}>
                  <span className="[overflow-wrap:anywhere]">Ronda {i + 1} · {t}</span><span>{solved.has(`ronda-${i + 1}`) ? "✅" : "○"}</span>
                </button>
              ))}
            </div>
            <div className="mt-4 space-y-2 border-t border-[#26334d] pt-3">
              <button onClick={() => chooseMode("versus")} className={`w-full rounded-xl border px-3 py-2 text-left text-sm font-bold ${mode === "versus" ? "border-[#ffc400] bg-[#ffc400]/15" : "border-[#26334d] bg-[#0d1526]"}`}>⚔️ Modo Primera vs Última <span className="block text-xs font-medium text-[#9aa9c3]">indexOf ⇄ lastIndexOf</span></button>
              <button onClick={() => chooseMode("infinito")} className={`w-full rounded-xl border px-3 py-2 text-left text-sm font-bold ${mode === "infinito" ? "border-[#ffc400] bg-[#ffc400]/15" : "border-[#26334d] bg-[#0d1526]"}`}>♾️ Modo Infinito <span className="block text-xs font-medium text-[#9aa9c3]">20 armas aleatorias</span></button>
              <button onClick={() => chooseMode("nivel19")} className={`w-full rounded-xl border px-3 py-2 text-left text-sm font-bold ${mode === "nivel19" ? "border-[#ffc400] bg-[#ffc400]/15" : "border-[#26334d] bg-[#0d1526]"}`}>🏆 Nivel 19 · Primera Hacha <span className="block text-xs font-medium text-[#9aa9c3]">60 s · +20 · badge Armero Nivel 19</span></button>
            </div>
            {solved.has("nivel-19") && <p className="mt-3 rounded-xl bg-[#ffc400] px-3 py-2 text-center text-sm font-bold text-black">🏅 BADGE: ARMERO NIVEL 19</p>}
          </section>

          <section className="panel panel-orange p-4">
            <h2 className="mb-2 text-base font-bold">indexOf vs findIndex vs lastIndexOf</h2>
            <div className="font-code space-y-2 text-[12px] leading-relaxed [overflow-wrap:anywhere]">
              <p><span className="text-[#ff9a3d]">indexOf</span> → igualdad exacta <b>===</b>, sin condición. Devuelve un <b>NÚMERO</b>.</p>
              <p><span className="text-[#ffc400]">findIndex</span> → usa condición: <span className="text-emerald-300">p =&gt; p === '…'</span></p>
              <p><span className="text-sky-300">lastIndexOf</span> → misma igualdad, desde el <b>final</b>.</p>
              <p className="rounded-lg bg-black/40 p-2">indexOf('Pistola') → 0<br />lastIndexOf('Pistola') → 4<br />findIndex(...) → 0, con condición</p>
            </div>
          </section>

          <section className="panel p-4">
            <h2 className="mb-2 text-base font-bold">📓 Bitácora</h2>
            <ul className="space-y-2 text-sm text-[#c7d2e5]">
              {log.map((l, i) => <li key={i} className="[overflow-wrap:anywhere]">{l}</li>)}
            </ul>
            <p className="mt-3 text-xs text-[#9aa9c3] [overflow-wrap:anywhere]">{saveStatus} Intentos guardados: {savedCount}.</p>
            <button onClick={resetGame} className="btn btn-ghost mt-3 w-full">↺ REINICIAR PARTIDA</button>
          </section>
        </aside>

        {/* CENTRO */}
        <section className="min-w-0 space-y-4">
          <div className="panel panel-orange p-4 sm:p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-xl font-bold">📦 INVENTARIO <span className="text-sm font-medium text-[#9aa9c3]">({current.inv.length} armas)</span></h2>
              {mode === "nivel19" && <span className={`rounded-full px-3 py-1 font-code text-sm font-bold ${timeLeft <= 10 ? "bg-red-500 text-white" : "bg-[#ffc400] text-black"}`}>⏱ {timeLeft}s</span>}
              {mode === "infinito" && <span className="rounded-full border border-sky-400/50 px-3 py-1 text-xs font-bold">♾️ INVENTARIO ALEATORIO</span>}
            </div>

            <div className={`mt-4 flex flex-wrap gap-2 ${lastWrong ? "shake" : ""}`}>
              {current.inv.map((w, i) => {
                const isAnswer = confirmed && i === current.answer;
                const isScanning = scanIndex === i;
                return (
                  <div key={`${w.name}-${i}`} className={`weapon-card relative w-[calc(50%-4px)] rounded-2xl border border-[#26334d] bg-[#0d1526] px-2 py-3 text-center sm:w-[calc(33.333%-6px)] ${isAnswer ? "golden" : ""} ${isScanning ? "scanning" : ""}`}>
                    {isScanning && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-lg">🔎</span>}
                    {isAnswer && <span className="absolute -top-3 right-1 text-lg floaty">🎯</span>}
                    <p className="font-code text-[11px] text-[#9aa9c3]">[{i}]</p>
                    <p className="my-1 text-4xl" aria-hidden="true">{w.emoji}</p>
                    <p className="text-sm font-bold [overflow-wrap:anywhere]">{w.name}</p>
                    {isAnswer && <p className="mt-1 text-[11px] font-bold text-[#ffc400]">PRIMERA · DETENIDO</p>}
                  </div>
                );
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-[#ff6a00]/50 bg-[#1a0f04] p-4 text-center">
              <p className="text-[11px] font-bold tracking-[0.24em] text-[#ff9a3d]">EL CANTO DEL ARMERO</p>
              <p className="mt-1 text-2xl font-bold leading-tight sm:text-3xl [overflow-wrap:anywhere]">🎯 ¿En qué ÍNDICE está la <span className="text-[#ff6a00]">{questionWord}</span> {current.target} {targetEmoji}?</p>
              <p className="mt-1 text-sm text-[#c7d2e5]">Recuerda: la respuesta es un <b>NÚMERO</b>. indexOf se detiene en la primera coincidencia exacta.</p>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs font-bold tracking-widest text-[#9aa9c3]">BARRA DE ÍNDICES — ELIGE UN NÚMERO</p>
              <div className="flex flex-wrap items-center gap-2">
                {current.inv.map((_, i) => (
                  <button key={i} onClick={() => { if (!confirmed && !traversing) { setSelected(i); setLastWrong(false); } }} className={`index-btn ${selected === i ? "selected" : ""} ${confirmed && i === current.answer ? "correct" : ""} ${confirmed && selected === i && selected !== current.answer ? "wrong" : ""}`} aria-label={`Índice ${i}`}>{i}</button>
                ))}
                <button onClick={() => { if (!confirmed && !traversing) { setSelected(-1); setLastWrong(false); } }} className={`index-btn border-dashed !border-[#ffc400] !bg-[#2a2103] !text-[#ffc400] ${selected === -1 ? "!bg-[#ffc400] !text-black" : ""}`} aria-label="No encontrado, menos uno">-1</button>
                <span className="text-xs text-[#9aa9c3]">← botón especial: “no está”</span>
              </div>
            </div>

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <button onClick={startTraversal} disabled={traversing || confirmed} className="btn btn-primary">▶ RECORRER DESDE EL INICIO</button>
              <button onClick={confirm} disabled={confirmed || traversing} className="btn btn-gold">✅ CONFIRMAR ÍNDICE</button>
              <button onClick={nextRound} className="btn">➡️ SIGUIENTE RONDA</button>
            </div>

            <div className={`mt-4 rounded-xl border p-3 text-sm font-bold [overflow-wrap:anywhere] ${confirmed ? (lastWrong ? "border-red-500/60 bg-red-500/10 text-red-100" : "border-emerald-400/50 bg-emerald-400/10 text-emerald-100") : "border-[#26334d] bg-black/30"}`} role="status">{feedback}</div>

            <div className="mt-4 rounded-xl border border-[#26334d] bg-black/30 p-3">
              <label htmlFor="codigo" className="text-sm font-bold">💻 Escribe el código para +5 <span className="font-normal text-[#9aa9c3]">(ej: inventario.indexOf('Pistola'))</span></label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input id="codigo" value={codeInput} onChange={(e) => setCodeInput(e.target.value)} placeholder={`inventario.${current.method}('${current.target}')`} className="font-code min-w-0 flex-1 rounded-xl border border-[#26334d] bg-[#0a0f1c] px-3 py-2.5 text-sm [overflow-wrap:anywhere]" />
                <button onClick={validateCode} className="btn btn-primary shrink-0">VALIDAR +5</button>
              </div>
            </div>

            <div className="font-code mt-4 rounded-xl bg-black/50 p-3 text-[12px] leading-relaxed [overflow-wrap:anywhere]">
              <p>inventario.indexOf('{current.target}') <span className="text-[#9aa9c3]">// → {firstIdx}</span></p>
              <p>inventario.indexOf('Ballesta') <span className="text-[#9aa9c3]">// → -1</span></p>
              <p className="mt-2 text-[#ffc400]">⚖️ indexOf('{current.target}') → {firstIdx} (primera) | lastIndexOf('{current.target}') → {lastIdx} (última) | findIndex(p =&gt; p === '{current.target}') → {firstIdx} pero con condición</p>
            </div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold">
              <span className="rounded-full bg-emerald-400/15 px-2.5 py-1 text-emerald-300">✅ Acierto +{mode === "nivel19" ? 20 : 10}</span>
              <span className="rounded-full bg-red-400/15 px-2.5 py-1 text-red-300">❌ Error típico −5 · Otro error −3</span>
              <span className="rounded-full bg-[#ffc400]/15 px-2.5 py-1 text-[#ffc400]">💻 Código +5</span>
            </div>
          </div>
        </section>

        {/* DERECHA */}
        <aside>
          <section className="panel p-4 lg:sticky lg:top-24">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold">🧑‍💻 DEPURADOR AVANZADO: <span className="text-[#ff6a00]">.indexOf()</span></h2>
              <span className={`h-2.5 w-2.5 rounded-full ${traversing ? "bg-[#ffc400] blink" : "bg-emerald-400"}`} />
            </div>
            <div className="console-scroll max-h-[520px] overflow-y-auto rounded-xl border border-[#26334d] bg-black/70 p-3">
              <div className="font-code space-y-2 text-[12px] leading-relaxed text-[#c8f0d5]">
                {debugLines.map((l, i) => <p key={i} className="[overflow-wrap:anywhere]">{l}</p>)}
                {traversing && <p className="text-[#ff9a3d]">▋ recorriendo…</p>}
              </div>
            </div>
            <div className="font-code mt-3 space-y-2 rounded-xl bg-[#0d1526] p-3 text-[12px] leading-relaxed [overflow-wrap:anywhere]">
              <p><b className="text-[#ff9a3d]">Regla de oro:</b> indexOf compara con <b>===</b>, valor por valor, de izquierda a derecha.</p>
              <p><b>Resultado:</b> un NÚMERO (la posición) o <b>-1</b> si no existe.</p>
              <p><b>Error típico:</b> elegir una aparición posterior es confundir indexOf con lastIndexOf.</p>
            </div>
            <button onClick={() => setDebugLines(["🖥️ Consola lista. Elige un índice o pulsa RECORRER."])} className="btn btn-ghost mt-3 w-full">🧹 LIMPIAR CONSOLA</button>
            <p className="mt-3 text-center text-xs text-[#9aa9c3]">Igualdad exacta + recorrido →→→ + primera aparición.</p>
          </section>
        </aside>
      </main>
      <footer className="mx-auto max-w-[1440px] px-4 pb-6 text-center text-xs text-[#9aa9c3]">Armería “El Primer Disparo” · indexOf devuelve la PRIMERA aparición. Si eliges otra Pistola, ya se habría detenido antes.</footer>
    </div>
  );
}
