import React, { useEffect, useMemo, useRef, useState } from "react";

type Show = { hora: string; genero: string; tresD: boolean };
type Progress = { points: number; streak: number; clean: number; solved: string[]; badges: string[]; conditionDone: string[] };
type LevelId = "1" | "2" | "3" | "4" | "versus" | "boss" | "19" | "infinite";
type Level = {
  id: LevelId; title: string; short: string; rule: string; code: string; method: "findLast" | "find" | "ghost";
  shows: Show[]; test: (s: Show) => boolean; expected: string; explain: string;
};

const sleep = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const norm = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[""]/g, "'").replace(/\s+/g, "").replace(/;/g, "").toLowerCase();

const shows1: Show[] = [
  { hora: "12:00", genero: "Acción", tresD: false }, { hora: "15:00", genero: "Terror", tresD: true },
  { hora: "18:00", genero: "Comedia", tresD: false }, { hora: "21:00", genero: "Terror", tresD: false },
  { hora: "23:30", genero: "Acción", tresD: true },
];
const shows2: Show[] = [
  { hora: "11:00", genero: "Comedia", tresD: false }, { hora: "13:00", genero: "Terror", tresD: true },
  { hora: "16:00", genero: "Acción", tresD: false }, { hora: "18:30", genero: "Animación", tresD: true },
  { hora: "20:30", genero: "Comedia", tresD: true }, { hora: "22:45", genero: "Terror", tresD: false },
];
const shows3: Show[] = [
  { hora: "12:30", genero: "Terror", tresD: false }, { hora: "14:00", genero: "Acción", tresD: true },
  { hora: "16:30", genero: "Comedia", tresD: false }, { hora: "19:00", genero: "Acción", tresD: false },
  { hora: "21:00", genero: "Terror", tresD: true }, { hora: "23:00", genero: "Acción", tresD: true },
];
const shows19: Show[] = [
  { hora: "10:00", genero: "Acción", tresD: false }, { hora: "10:45", genero: "Terror", tresD: false },
  { hora: "11:30", genero: "Comedia", tresD: true }, { hora: "12:15", genero: "Animación", tresD: false },
  { hora: "13:00", genero: "Terror", tresD: true }, { hora: "13:45", genero: "Acción", tresD: true },
  { hora: "14:30", genero: "Comedia", tresD: false }, { hora: "15:15", genero: "Terror", tresD: false },
  { hora: "16:00", genero: "Animación", tresD: true }, { hora: "16:45", genero: "Acción", tresD: false },
  { hora: "17:30", genero: "Comedia", tresD: true }, { hora: "18:15", genero: "Terror", tresD: false },
  { hora: "19:00", genero: "Acción", tresD: true }, { hora: "19:45", genero: "Comedia", tresD: false },
  { hora: "20:30", genero: "Animación", tresD: false }, { hora: "21:15", genero: "Terror", tresD: true },
  { hora: "22:00", genero: "Terror", tresD: true }, { hora: "22:45", genero: "Acción", tresD: true },
  { hora: "23:45", genero: "Comedia", tresD: false },
];
const showsBoss: Show[] = [
  { hora: "12:00", genero: "Terror", tresD: false }, { hora: "13:30", genero: "Comedia", tresD: true },
  { hora: "15:00", genero: "Terror", tresD: false }, { hora: "16:30", genero: "Acción", tresD: true },
  { hora: "19:00", genero: "Terror", tresD: true }, { hora: "21:30", genero: "Terror", tresD: true },
];
const genres = ["Terror", "Acción", "Comedia", "Animación"];
function makeInfinite(seedGenre?: string) {
  const target = seedGenre || genres[Math.floor(Math.random() * genres.length)];
  const list: Show[] = Array.from({ length: 30 }, (_, i) => {
    const total = 600 + i * 28;
    const h = String(Math.floor(total / 60)).padStart(2, "0");
    const m = String(total % 60).padStart(2, "0");
    return { hora: `${h}:${m}`, genero: genres[Math.floor(Math.random() * genres.length)], tresD: Math.random() > 0.5 };
  });
  // Garantiza al menos dos coincidencias del género objetivo.
  list[7] = { ...list[7], genero: target };
  list[23] = { ...list[23], genero: target };
  return { list, target };
}
const initialProgress: Progress = { points: 0, streak: 0, clean: 0, solved: [], badges: [], conditionDone: [] };
const ORDER: LevelId[] = ["1", "2", "3", "4", "versus", "boss", "19", "infinite"];

async function api(action: string, args: Record<string, unknown>) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok || payload.error) throw new Error(payload.error || `Error ${res.status}`);
  return payload.data;
}

export default function App() {
  const [levelId, setLevelId] = useState<LevelId>("1");
  const [versusStep, setVersusStep] = useState<0 | 1>(0);
  const [infinite, setInfinite] = useState(() => makeInfinite("Comedia"));
  const [selected, setSelected] = useState<number | null>(null);
  const [cursor, setCursor] = useState<number | null>(null);
  const [traversing, setTraversing] = useState(false);
  const [traversed, setTraversed] = useState(false);
  const [logs, setLogs] = useState<string[]>(["// Depurador listo. Elige una función o recorre desde el final."]);
  const [feedback, setFeedback] = useState<string>("Lee la regla, decide y confirma. Si lo prefieres, usa el recorrido para ver cómo piensa findLast.");
  const [feedbackKind, setFeedbackKind] = useState<"info" | "ok" | "bad">("info");
  const [condition, setCondition] = useState("");
  const [conditionMsg, setConditionMsg] = useState("");
  const [wrongId, setWrongId] = useState<number | null>(null);
  const [light, setLight] = useState(false);
  const [progress, setProgress] = useState<Progress>(initialProgress);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [apiState, setApiState] = useState("Guardando progreso…");
  const [bitacora, setBitacora] = useState<string[]>(["Turno iniciado en la cabina de proyección."]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [expired, setExpired] = useState(false);
  const timers = useRef<number[]>([]);

  const level: Level = useMemo(() => {
    const base = {
      "1": { title: "Ronda 1 · Última de terror", short: "Ronda 1", rule: "Encuentra la ÚLTIMA función de terror", code: `funciones.findLast(f => f.genero === 'terror')`, method: "findLast" as const, shows: shows1, test: (s: Show) => s.genero === "Terror", expected: "f=>f.genero==='terror'", explain: "Condición de texto simple." },
      "2": { title: "Ronda 2 · Última en 3D", short: "Ronda 2", rule: "Encuentra la ÚLTIMA función en 3D", code: `funciones.findLast(f => f.tresD)`, method: "findLast" as const, shows: shows2, test: (s: Show) => s.tresD, expected: "f=>f.tresD", explain: "Condición booleana: no hace falta comparar con true." },
      "3": { title: "Ronda 3 · Última de acción", short: "Ronda 3", rule: "Encuentra la ÚLTIMA función de acción", code: `funciones.findLast(f => f.genero === 'Acción')`, method: "findLast" as const, shows: shows3, test: (s: Show) => s.genero === "Acción", expected: "f=>f.genero==='acción'", explain: "Otra condición de texto, misma dirección." },
      "4": { title: "Ronda 4 · Última antes de las 22:00", short: "Ronda 4", rule: "Encuentra la ÚLTIMA función antes de las 22:00", code: `funciones.findLast(f => parseInt(f.hora) < 22)`, method: "findLast" as const, shows: shows1, test: (s: Show) => parseInt(s.hora) < 22, expected: "f=>parseInt(f.hora)<22", explain: "Condición numérica: parseInt convierte “21:00” en 21." },
      "versus": { title: versusStep === 0 ? "Primera vs Última · PRIMERA" : "Primera vs Última · ÚLTIMA", short: "Primera vs Última", rule: versusStep === 0 ? "Encuentra la PRIMERA función de terror" : "Encuentra la ÚLTIMA función de terror", code: versusStep === 0 ? `funciones.find(f => f.genero === 'terror')` : `funciones.findLast(f => f.genero === 'terror')`, method: versusStep === 0 ? "find" as const : "findLast" as const, shows: shows1, test: (s: Show) => s.genero === "Terror", expected: "f=>f.genero==='terror'", explain: "Misma condición, dirección opuesta." },
      "boss": { title: "Jefe · Función fantasma", short: "Jefe Fantasma", rule: "Encuentra la ÚLTIMA función de terror en 3D y antes de las 18:00", code: `funciones.findLast(f => f.genero === 'terror' && f.tresD && parseInt(f.hora) < 18)`, method: "ghost" as const, shows: showsBoss, test: (s: Show) => s.genero === "Terror" && s.tresD && parseInt(s.hora) < 18, expected: "f=>f.genero==='terror'&&f.tresD&&parseInt(f.hora)<18", explain: "Ninguna cumple las tres condiciones a la vez." },
      "19": { title: "Nivel 19 · La función decisiva", short: "Nivel 19", rule: "Encuentra la ÚLTIMA función de terror en 3D después de las 20:00", code: `funciones.findLast(f => f.genero === 'terror' && f.tresD && parseInt(f.hora) > 20)`, method: "findLast" as const, shows: shows19, test: (s: Show) => s.genero === "Terror" && s.tresD && parseInt(s.hora) > 20, expected: "f=>f.genero==='terror'&&f.tresD&&parseInt(f.hora)>20", explain: "Dos cumplen al final. Solo la última cuenta." },
      "infinite": { title: "Cartelera infinita · 30 funciones", short: "Cartelera Infinita", rule: `Encuentra la ÚLTIMA función de ${infinite.target.toLowerCase()}`, code: `funciones.findLast(f => f.genero === '${infinite.target}')`, method: "findLast" as const, shows: infinite.list, test: (s: Show) => s.genero === infinite.target, expected: `f=>f.genero==='${infinite.target.toLowerCase()}'`, explain: "Cartelera generada al azar: el recorrido inverso es tu mejor atajo." },
    };
    const b = base[levelId];
    return { id: levelId, ...b };
  }, [levelId, versusStep, infinite]);

  const target = useMemo(() => {
    if (level.method === "ghost") return null;
    if (level.method === "find") {
      for (let i = 0; i < level.shows.length; i++) if (level.test(level.shows[i])) return i;
      return null;
    }
    for (let i = level.shows.length - 1; i >= 0; i--) if (level.test(level.shows[i])) return i;
    return null;
  }, [level]);

  const solvedKey = levelId === "versus" ? `versus-${versusStep}` : levelId;
  const solved = progress.solved.includes(solvedKey);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await api("records.list", { collection: "progreso-ultima-funcion" });
        if (!alive) return;
        const first = data.records?.[0];
        if (first) { setRecordId(first.id); setProgress(first.value as Progress); setApiState("Progreso guardado"); }
        else {
          const created = await api("records.create", { collection: "progreso-ultima-funcion", value: initialProgress });
          if (alive) { setRecordId(created.id); setApiState("Progreso guardado"); }
        }
      } catch { if (alive) setApiState("Sin conexión: tu partida sigue en esta sesión"); }
    })();
    return () => { alive = false; };
  }, []);

  useEffect(() => {
    if (levelId !== "19") return;
    setTimeLeft(60); setExpired(false);
    const t = window.setInterval(() => setTimeLeft((v) => {
      if (v <= 1) { window.clearInterval(t); setExpired(true); setFeedback("⏱ Tiempo agotado en el Nivel 19. Pulsa SIGUIENTE o vuelve a entrar para intentarlo con 60 segundos."); setFeedbackKind("bad"); return 0; }
      return v - 1;
    }), 1000);
    return () => window.clearInterval(t);
  }, [levelId]);

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);
  const persist = async (next: Progress) => {
    try {
      if (recordId) await api("records.replace", { collection: "progreso-ultima-funcion", id: recordId, value: next });
      else {
        const created = await api("records.create", { collection: "progreso-ultima-funcion", value: next });
        setRecordId(created.id);
      }
      setApiState("Progreso guardado");
    } catch { setApiState("Sin conexión: tu partida sigue en esta sesión"); }
  };
  const updateProgress = (fn: (p: Progress) => Progress) => {
    setProgress((old) => { const next = fn(old); void persist(next); return next; });
  };

  const chooseLevel = (id: LevelId) => {
    setLevelId(id); setVersusStep(0); setSelected(null); setCursor(null); setTraversed(false);
    setCondition(""); setConditionMsg(""); setWrongId(null); setLight(false);
    setFeedback("Nueva cartelera. Lee la regla y decide: ¿adivinas o recorres desde el final?");
    setFeedbackKind("info");
    setLogs([`// ${id === "versus" ? "Modo Primera vs Última" : "Nueva cartelera"}. Elige o recorre.`]);
  };
  const nextLevel = () => {
    const i = ORDER.indexOf(levelId);
    const next = ORDER[(i + 1) % ORDER.length];
    chooseLevel(next);
    setBitacora((b) => [`➡️ Avance a la siguiente función.`, ...b].slice(0, 12));
  };

  const traverse = async () => {
    if (traversing) return;
    setTraversing(true); setTraversed(false); setSelected(null); setWrongId(null); setLight(false);
    const dir = level.method === "find" ? 1 : -1;
    const start = level.method === "find" ? 0 : level.shows.length - 1;
    const end = level.method === "find" ? level.shows.length : -1;
    const intro = level.method === "find" ? `▶ Recorrido izquierda → derecha con find. Buscamos la PRIMERA.` : `◀ Recorrido derecha → izquierda con findLast. Buscamos la ÚLTIMA.`;
    setLogs([intro]);
    setFeedback(level.method === "find" ? "Recorriendo de izquierda a derecha…" : "Recorriendo de derecha a izquierda…");
    let found: number | null = null;
    for (let i = start; i !== end; i += dir) {
      setCursor(i);
      await sleep(700);
      const s = level.shows[i];
      const ok = level.test(s);
      const line = `[${i}] ${s.hora} · ${s.genero} ${s.tresD ? "3D" : "2D"} ${ok ? "✅ ¡ALTO!" : "❌ no cumple → sigue"}`;
      setLogs((l) => [...l, line]);
      if (ok) { found = i; break; }
    }
    setTraversing(false); setTraversed(true);
    if (found !== null) {
      const s = level.shows[found];
      setSelected(found);
      setLogs((l) => [...l, `${level.method === "find" ? "find" : "findLast"} = { hora: '${s.hora}', genero: '${s.genero}', tresD: ${s.tresD} }`]);
      setFeedback(`El cursor se detuvo en [${found}] ${s.hora}. Ahora pulsa CONFIRMAR FUNCIÓN para cerrar la ronda.`);
    } else {
      setLogs((l) => [...l, "Revisó todas de atrás hacia adelante. Ninguna cumplió → findLast devuelve undefined, no -1, no null."]);
      setFeedback("El recorrido terminó sin coincidencias. La respuesta es 👻 NO EXISTE (undefined).");
    }
  };

  const award = (points: number, key: string, badge?: string) => {
    updateProgress((p) => {
      const solved = p.solved.includes(key) ? p.solved : [...p.solved, key];
      const badges = badge && !p.badges.includes(badge) ? [...p.badges, badge] : p.badges;
      return { ...p, points: p.points + points, streak: p.streak + 1, clean: p.clean + 1, solved, badges };
    });
  };

  const confirm = () => {
    if (level.method === "ghost") { setFeedback("En el nivel fantasma no se confirma una función: pulsa 👻 NO EXISTE (undefined)."); setFeedbackKind("info"); return; }
    if (selected === null) { setFeedback("Primero elige una función en la cartelera o usa el recorrido."); setFeedbackKind("info"); return; }
    const s = level.shows[selected];
    if (selected === target) {
      const is19 = levelId === "19";
      const bonus = is19 ? 20 : 10;
      setFeedbackKind("ok"); setLight(true); setWrongId(null);
      setFeedback(`✅ ¡Correcto! ${s.hora} · ${s.genero} · ${s.tresD ? "3D" : "2D"}. +${bonus} puntos. ${level.code} // → { hora: '${s.hora}', genero: '${s.genero}', tresD: ${s.tresD} }`);
      setLogs((l) => [...l, `✅ Confirmado: ${level.code}`, `// → { hora: '${s.hora}', genero: '${s.genero}', tresD: ${s.tresD} }`]);
      setBitacora((b) => [`✅ ${level.short}: acertó ${s.hora} (+${bonus}).`, ...b].slice(0, 12));
      const nextClean = progress.clean + 1;
      award(bonus, solvedKey, is19 ? "PROYECCIONISTA NIVEL 19" : undefined);
      if (nextClean === 3) {
        updateProgress((p) => ({ ...p, points: p.points + 15, badges: p.badges.includes("🧠 MENTE INVERSA") ? p.badges : [...p.badges, "🧠 MENTE INVERSA"] }));
        setFeedback((f) => f + " 🧠 Bonus: 3 seguidas sin caer en el primer match. +15 e insignia MENTE INVERSA.");
      }
      if (levelId === "versus" && versusStep === 0) {
        window.setTimeout(() => { setVersusStep(1); setSelected(null); setCursor(null); setTraversed(false); setFeedback("Ahora la misma cartelera pregunta por la ÚLTIMA. Cambia la dirección."); setFeedbackKind("info"); }, 900);
      }
    } else if (level.test(s)) {
      setFeedbackKind("bad"); setWrongId(selected); setLight(false);
      setFeedback("Esa también cumple, pero findLast busca desde el FINAL. Elegiste la primera, no la última. −5 puntos.");
      setLogs((l) => [...l, `⚠️ [${selected}] cumple, pero NO es la última. Inercia izquierda → derecha.`]);
      updateProgress((p) => ({ ...p, points: Math.max(0, p.points - 5), streak: 0, clean: 0 }));
    } else {
      setFeedbackKind("bad"); setWrongId(selected); setLight(false);
      setFeedback(`Esa función no cumple la regla. −3 puntos. Revisa el género, el formato o la hora.`);
      updateProgress((p) => ({ ...p, points: Math.max(0, p.points - 3), streak: 0, clean: 0 }));
    }
  };
  const ghostAnswer = () => {
    setFeedbackKind("ok"); setLight(true);
    setFeedback("👻 Correcto: undefined. Revisó todas de atrás hacia adelante, ninguna cumplió, por eso devuelve undefined, no -1, no null. +10 puntos.");
    setLogs((l) => [...l, "👻 findLast = undefined", "Motivo: ninguna función cumple las 3 condiciones a la vez."]);
    setBitacora((b) => ["👻 Jefe fantasma resuelto: undefined (+10).", ...b].slice(0, 12));
    award(10, solvedKey);
  };
  const wrongGhostPick = () => {
    setFeedbackKind("bad"); setFeedback("Esa función existe, pero no cumple las tres condiciones. En este jefe la respuesta es 👻 NO EXISTE. −3 puntos.");
    updateProgress((p) => ({ ...p, points: Math.max(0, p.points - 3), streak: 0, clean: 0 }));
  };
  const checkCondition = () => {
    if (!condition.trim()) { setConditionMsg("Escribe primero tu condición."); return; }
    const key = solvedKey + "-cond";
    if (norm(condition) === norm(level.expected)) {
      if (progress.conditionDone.includes(key)) setConditionMsg("Esa condición ya sumó su bonus en esta ronda.");
      else {
        updateProgress((p) => ({ ...p, points: p.points + 5, conditionDone: [...p.conditionDone, key] }));
        setConditionMsg("✅ Condición correcta. +5 puntos.");
      }
    } else setConditionMsg("Todavía no coincide. Revisa el género, el operador y los paréntesis.");
  };
  const resetGame = () => {
    setProgress(initialProgress); void persist(initialProgress);
    setSelected(null); setCursor(null); setTraversed(false); setCondition(""); setConditionMsg("");
    setBitacora(["Cabina reiniciada. La cartelera vuelve a empezar."]);
    setFeedback("Partida reiniciada. Tu progreso guardado vuelve a cero."); setFeedbackKind("info"); setLight(false);
  };
  const regenerateInfinite = () => {
    setInfinite(makeInfinite()); setSelected(null); setCursor(null); setTraversed(false);
    setLogs(["// Nueva cartelera aleatoria de 30 funciones."]);
    setFeedback("Nueva cartelera infinita generada. Busca la última del género indicado.");
  };

  const levelMeta: Record<LevelId, string> = { "1": "String simple", "2": "Booleana", "3": "Otra string", "4": "Numérica · parseInt", versus: "find vs findLast", boss: "Retorna undefined", "19": "19 funciones · 60 s", infinite: "30 aleatorias" };

  return (
    <div data-safe-area-inset-root style={{ boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "var(--bg)" }} className="overflow-x-clip">
      <header data-safe-area-sticky-top style={{ top: "var(--safe-area-inset-top)" }} className="sticky z-20 border-b border-[#1c2a4a] bg-[#030508]/95 backdrop-blur">
        <div className="mx-auto max-w-[1500px] px-3 py-3 sm:px-5">
          <div className="flex flex-wrap items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] tracking-[0.28em] text-[#93a3c2]">CABINA DE PROYECCIÓN · MÉTODO findLast()</p>
              <h1 className="text-[clamp(1.35rem,3vw,2.3rem)] font-bold leading-none">🎬 CINE <span className="neon">“EL ÚLTIMO PASE”</span> <span className="text-[#ffd23f]">— PROYECCIONISTA</span></h1>
            </div>
            <div className="flex flex-wrap gap-2 text-sm font-bold">
              <span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-emerald-300">{apiState}</span>
              <span className="rounded-full border border-[#22e6ff]/40 bg-[#22e6ff]/10 px-3 py-1 text-[#22e6ff]">PUNTOS: {progress.points}</span>
              <span className="rounded-full border border-[#ff2d78]/40 bg-[#ff2d78]/10 px-3 py-1 text-pink-300">RACHA: {progress.streak}</span>
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="rounded bg-white/10 px-2 py-1">findLast → devuelve el OBJETO, no el índice</span>
            <span className="rounded bg-white/10 px-2 py-1">findLastIndex → índice</span>
            <span className="rounded bg-white/10 px-2 py-1">find → el primero</span>
            {progress.badges.map((b) => <span key={b} className="rounded-full bg-[#ffd23f] px-2 py-1 font-bold text-black">{b}</span>)}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-3 py-4 sm:px-5">
        <div className="grid gap-4 lg:grid-cols-[300px_1fr_420px] items-start">
          {/* IZQUIERDA */}
          <aside className="panel rounded-2xl p-4">
            <h2 className="text-xl font-bold">🎟 CARTELERA / NIVELES</h2>
            <p className="mt-1 text-sm text-[#93a3c2]">Elige una ronda. El ✅ aparece cuando la resuelves.</p>
            <div className="mt-3 space-y-2">
              {ORDER.map((id) => {
                const done = id === "versus" ? progress.solved.includes("versus-0") && progress.solved.includes("versus-1") : progress.solved.includes(id);
                const active = id === levelId;
                const label = id === "1" ? "Ronda 1 · Terror" : id === "2" ? "Ronda 2 · 3D" : id === "3" ? "Ronda 3 · Acción" : id === "4" ? "Ronda 4 · Antes de 22:00" : id === "versus" ? "Primera vs Última" : id === "boss" ? "Jefe · Fantasma" : id === "19" ? "Nivel 19 · 19 funciones" : "Infinita · 30 funciones";
                return <button key={id} onClick={() => chooseLevel(id)} className={`w-full rounded-xl border px-3 py-2.5 text-left ${active ? "border-[#22e6ff] bg-[#22e6ff]/15" : "border-white/10 bg-white/[.03] hover:bg-white/[.07]"}`}><span className="flex justify-between gap-2 font-bold"><span>{label}</span><span>{done ? "✅" : "○"}</span></span><span className="text-xs text-[#93a3c2]">{levelMeta[id]}</span></button>;
              })}
            </div>
            <div className="mt-5 border-t border-white/10 pt-4">
              <h3 className="font-bold text-[#ffd23f]">📓 BITÁCORA</h3>
              <ul className="mt-2 max-h-44 space-y-2 overflow-y-auto pr-1 text-sm scroll-thin">{bitacora.map((b, i) => <li key={i} className="border-l-2 border-[#22e6ff]/50 pl-2 text-[#cbd5ea]">{b}</li>)}</ul>
              <button onClick={resetGame} className="mt-4 w-full rounded-lg border border-red-400/50 bg-red-500/10 px-3 py-2 font-bold text-red-200">↺ REINICIAR PARTIDA</button>
              <p className="mt-2 text-center text-xs text-[#93a3c2]">El reinicio guarda la partida en cero.</p>
            </div>
          </aside>

          {/* CENTRO */}
          <section className="panel relative overflow-hidden rounded-2xl p-4 sm:p-5">
            <div className="pointer-events-none absolute right-4 top-4 hidden items-center gap-2 sm:flex"><span className="text-4xl">📽️</span><div className={`h-8 w-40 beam ${light ? "opacity-100" : "opacity-30"}`} /></div>
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div><p className="text-xs tracking-[0.25em] text-[#93a3c2]">CARTELERA DEL DÍA · ORDEN CRONOLÓGICO</p><h2 className="text-[clamp(1.4rem,3vw,2rem)] font-bold leading-tight">{level.title}</h2></div>
              {levelId === "19" && <div className={`rounded-xl border px-3 py-2 text-center ${expired ? "border-red-400 bg-red-500/15" : "border-[#ffd23f]/50 bg-[#ffd23f]/10"}`}><div className="mono text-2xl font-bold text-[#ffd23f]">⏱ {timeLeft}s</div><div className="text-[11px]">NIVEL 19</div></div>}
            </div>

            <div className="mt-4 flex items-center gap-2 rounded-xl bg-black/40 px-3 py-2">
              <span className="text-xl">◀</span><strong className="text-[#22e6ff]">CURSOR</strong>
              <span className="text-sm text-[#93a3c2]">{traversing ? "recorriendo…" : cursor === null ? "en espera, a la derecha de la cartelera" : `en [${cursor}] · ${level.shows[cursor]?.hora}`}</span>
              <span className="ml-auto hidden text-xs text-[#93a3c2] sm:block">{level.method === "find" ? "→ izquierda a derecha" : "← derecha a izquierda"}</span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {level.shows.map((s, i) => {
                const isSelected = selected === i;
                const isCursor = cursor === i;
                const isCorrect = solved && target === i;
                const isWrong = wrongId === i;
                return <button key={`${s.hora}-${i}`} onClick={() => { if (level.method === "ghost") { setSelected(i); wrongGhostPick(); } else { setSelected(i); setWrongId(null); } }} className={`card-show w-[calc(50%-4px)] rounded-xl border border-white/15 bg-[#0b1226] px-2 py-3 text-left sm:w-[calc(33.333%-6px)] lg:w-[calc(25%-6px)] ${isSelected ? "selected" : ""} ${isCursor ? "cursor" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`} aria-label={`Función ${i}, ${s.hora}, ${s.genero}, ${s.tresD ? "3D" : "2D"}`}>
                  <div className="mono text-xs text-[#93a3c2]">[{i}]</div>
                  <div className="mono text-lg font-bold leading-tight">{s.hora}</div>
                  <div className="font-bold">{s.genero}</div>
                  <div className="text-sm text-[#93a3c2]">{s.tresD ? "3D" : "2D"}</div>
                  <div className="mt-1 text-xl">🎟</div>
                </button>;
              })}
            </div>

            <div className="mt-5 rounded-2xl border border-[#ffd23f]/35 bg-[#ffd23f]/[.07] p-4">
              <p className="text-[clamp(1.15rem,2.4vw,1.65rem)] font-bold leading-snug">🎯 {level.rule}</p>
              <p className="mt-1 text-sm text-[#93a3c2]">{level.explain} {solved ? "· Ronda resuelta ✅" : ""} {levelId === "versus" && versusStep === 0 ? "· Después viene la misma regla con findLast." : ""}</p>
              {levelId === "versus" && <p className="mono mt-3 rounded bg-black/40 p-2 text-sm">Comparativa: <span className="text-[#22e6ff]">find → 15:00</span> · <span className="text-[#ffd23f]">findLast → 21:00</span>. Misma condición, dirección opuesta.</p>}
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <button onClick={traverse} disabled={traversing} className="rounded-xl bg-[#22e6ff] px-4 py-3 font-bold text-black disabled:opacity-50">{traversing ? "⏳ RECORRIENDO…" : level.method === "find" ? "▶ RECORRER DESDE EL INICIO" : "▶ RECORRER DESDE EL FINAL"}</button>
              <button onClick={confirm} className="rounded-xl bg-[#3dff88] px-4 py-3 font-bold text-black">✅ CONFIRMAR FUNCIÓN</button>
              {level.method === "ghost" && <button onClick={ghostAnswer} className="rounded-xl bg-[#ff2d78] px-4 py-3 font-bold text-white">👻 NO EXISTE (undefined)</button>}
              <button onClick={nextLevel} className="rounded-xl border border-white/25 bg-white/10 px-4 py-3 font-bold">➡️ SIGUIENTE FUNCIÓN</button>
              {levelId === "infinite" && <button onClick={regenerateInfinite} className="rounded-xl border border-[#ff2d78]/50 bg-[#ff2d78]/10 px-4 py-3 font-bold text-pink-200">♾️ NUEVA CARTELERA ALEATORIA</button>}
            </div>

            <div className={`mt-4 rounded-xl border p-3 ${feedbackKind === "ok" ? "border-emerald-400/50 bg-emerald-400/10" : feedbackKind === "bad" ? "border-red-400/50 bg-red-400/10" : "border-white/10 bg-black/25"}`} role="status"><strong>{feedbackKind === "ok" ? "✅ " : feedbackKind === "bad" ? "⚠️ " : "💡 "}</strong>{feedback}</div>

            <div className="mt-4">
              <label htmlFor="condicion" className="text-sm font-bold">Escribe la condición para +5 <span className="font-normal text-[#93a3c2]">(ej: f =&gt; f.genero === 'terror')</span></label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <input id="condicion" value={condition} onChange={(e) => setCondition(e.target.value)} placeholder="f => f.genero === 'terror'" className="mono min-w-0 flex-1 rounded-lg border border-white/20 bg-black/50 px-3 py-3 text-sm text-white placeholder:text-slate-500" />
                <button onClick={checkCondition} className="rounded-lg border border-[#22e6ff]/50 bg-[#22e6ff]/10 px-4 py-3 font-bold text-[#22e6ff]">COMPROBAR +5</button>
              </div>
              {conditionMsg && <p className="mt-2 text-sm text-[#ffd23f]">{conditionMsg}</p>}
            </div>

            <div className="mt-5 grid gap-3 text-sm sm:grid-cols-3">
              <div className="rounded-xl bg-white/[.04] p-3"><b className="text-[#3dff88]">+10</b> acierto del elemento correcto · <b className="text-[#ffd23f]">+20</b> en Nivel 19</div>
              <div className="rounded-xl bg-white/[.04] p-3"><b className="text-[#3dff88]">+5</b> condición correcta · <b className="text-[#ffd23f]">+15</b> con 3 seguidas sin caer en el primer match</div>
              <div className="rounded-xl bg-white/[.04] p-3"><b className="text-red-300">−5</b> cumple pero no es la última · <b className="text-red-300">−3</b> no cumple</div>
            </div>
          </section>

          {/* DERECHA */}
          <aside className="panel rounded-2xl p-4">
            <h2 className="text-xl font-bold">🧠 DEPURADOR INTELIGENTE: <span className="neon">.findLast()</span></h2>
            <p className="mt-1 text-sm text-[#93a3c2]">Mira cómo el cursor pregunta, de atrás hacia adelante, hasta encontrar la primera coincidencia desde el final.</p>
            <div className="scroll-thin mt-3 h-[300px] overflow-y-auto rounded-xl bg-[#02040a] p-3 mono text-[13px] leading-6">
              {logs.map((l, i) => <div key={i} className={l.includes("✅") || l.includes("findLast =") ? "text-[#3dff88]" : l.includes("❌") || l.includes("⚠️") ? "text-[#ff8b96]" : "text-[#cbd5ea]"}>{l}</div>)}
            </div>
            <div className="mt-4 rounded-xl border border-[#22e6ff]/30 bg-black/40 p-3">
              <p className="text-xs tracking-widest text-[#93a3c2]">CÓDIGO QUE SE REVELA</p>
              <p className="mono mt-2 break-words text-sm text-[#22e6ff]">{level.code}</p>
              <p className="mono mt-2 break-words text-sm text-[#93a3c2]">{traversed || solved ? `// → ${target === null ? "undefined" : `{ hora: '${level.shows[target].hora}', genero: '${level.shows[target].genero}', tresD: ${level.shows[target].tresD} }`}` : "// → ? Recorre o confirma para revelar el objeto."}</p>
            </div>
            <div className="mt-4 space-y-3 text-sm">
              <div className="rounded-xl bg-white/[.04] p-3"><b>El error típico:</b> elegir la primera que cumple por inercia izquierda → derecha. findLast corrige esa dirección.</div>
              <div className="rounded-xl bg-white/[.04] p-3"><b>Solo la última:</b> puede haber varias que cumplan. Solo la que está más a la derecha es la respuesta.</div>
              <div className="rounded-xl bg-white/[.04] p-3"><b>Si no hay ninguna:</b> el resultado es <span className="mono text-[#ff2d78]">undefined</span>. No es -1 ni null.</div>
            </div>
          </aside>
        </div>
        <footer className="mt-5 pb-4 text-center text-xs text-[#93a3c2]">La Última Función · Aprende findLast recorriendo la cartelera como un proyeccionista: de derecha a izquierda, hasta la última coincidencia.</footer>
      </main>
    </div>
  );
}
