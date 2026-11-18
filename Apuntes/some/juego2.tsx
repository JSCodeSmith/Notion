import React, { useEffect, useMemo, useRef, useState } from "react";

type Crew = {
  id: string;
  name: string;
  role: string;
  isImpostor: boolean;
  verified: boolean;
  expelled: boolean;
  questions: number;
  whereCount: number;
  suspicion: number;
};
type ChatMsg = { id: string; from: "capitan" | "crew" | "system" | "tag"; text: string };
type LogKind = "call" | "iter" | "true" | "false" | "brain" | "warn" | "skip" | "stats" | "info";
type LogEntry = { id: string; text: string; kind: LogKind };
type BitacoraItem = { id: string; texto: string; ronda: number; created_at: string };

const NAMES = ["Alex", "Maya", "Leo", "Nia", "Hugo", "Sara", "Iván", "Luna", "Diego", "Zoe"];
const ROLES = ["Piloto", "Ingeniero", "Médico", "Cocinero", "Científico", "Comunicaciones"];
const ROLE_DATA: Record<string, { location: string; task: string }> = {
  Piloto: { location: "el puente", task: "revisando la navegación" },
  Ingeniero: { location: "motores", task: "revisando el oxígeno" },
  Médico: { location: "la enfermería", task: "revisando los signos vitales" },
  Cocinero: { location: "la cafetería", task: "preparando la comida" },
  Científico: { location: "el laboratorio", task: "analizando muestras" },
  Comunicaciones: { location: "comunicaciones", task: "revisando las antenas" },
};

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function uid() { return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`; }
function makeCrew(round: number): Crew[] {
  const names = shuffle(NAMES).slice(0, 6);
  const roles = shuffle(ROLES);
  const impostorIdx = Math.floor(Math.random() * 6);
  return names.map((name, i) => ({
    id: `r${round}-${name}-${i}`,
    name,
    role: roles[i],
    isImpostor: i === impostorIdx,
    verified: false,
    expelled: false,
    questions: 0,
    whereCount: 0,
    suspicion: 0,
  }));
}
function initialLogs(round: number): LogEntry[] {
  return [
    { id: uid(), text: `> PROTOCOLO SOME activado — Ronda ${round}`, kind: "call" },
    { id: uid(), text: "🧠 Depurador Inteligente: .some() pregunta “¿hay AL MENOS UNO que cumpla la condición?”. En cuanto ve un TRUE, se detiene.", kind: "brain" },
    { id: uid(), text: "🧠 Depurador Inteligente: Si todos dan FALSE, el resultado es false y la nave está limpia. Un FALSE no basta para decidir.", kind: "brain" },
    { id: uid(), text: "> Esperando interrogatorio o escaneo del capitán…", kind: "info" },
  ];
}
async function callApi(action: string, args: Record<string, unknown>) {
  const res = await fetch("actions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action, args }),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.error) throw new Error(json?.error || `Error ${res.status}`);
  return json.data;
}

export default function App() {
  const [round, setRound] = useState(1);
  const [crew, setCrew] = useState<Crew[]>(() => makeCrew(1));
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [chatByCrew, setChatByCrew] = useState<Record<string, ChatMsg[]>>({});
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [lives, setLives] = useState(4);
  const [ethics, setEthics] = useState(100);
  const [logs, setLogs] = useState<LogEntry[]>(() => initialLogs(1));
  const [status, setStatus] = useState<"playing" | "won" | "lost">("playing");
  const [loseReason, setLoseReason] = useState("");
  const [scanStats, setScanStats] = useState<string>("Sin escaneos todavía. Interroga primero, luego escanea con ética.");
  const [bitacora, setBitacora] = useState<BitacoraItem[]>([]);
  const [pending, setPending] = useState<BitacoraItem[]>([]);
  const [bitacoraError, setBitacoraError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);

  const chatRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const selected = crew.find((c) => c.id === selectedId) || null;
  const currentChat = selected ? chatByCrew[selected.id] || [] : [];

  const loadBitacora = async () => {
    try {
      const data = await callApi("records.list", { collection: "bitacora_impostor" });
      const recs = (data?.records || []) as Array<{ id: string; value: any; created_at: string }>;
      const items: BitacoraItem[] = recs.map((r) => ({
        id: r.id,
        texto: String(r.value?.texto || ""),
        ronda: Number(r.value?.ronda || 0),
        created_at: r.created_at || "",
      })).filter((x) => x.texto).sort((a, b) => b.ronda - a.ronda);
      setBitacora(items);
      setBitacoraError("");
    } catch {
      setBitacoraError("Bitácora persistente no disponible en esta vista previa. Los resultados de la ronda se guardarán al publicar.");
    }
  };

  useEffect(() => { loadBitacora(); }, []);
  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" }); }, [currentChat, typing]);
  useEffect(() => { logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" }); }, [logs]);

  const pushLog = (entries: Omit<LogEntry, "id">[]) => {
    setLogs((prev) => [...prev, ...entries.map((e) => ({ ...e, id: uid() }))].slice(-140));
  };
  const appendChat = (crewId: string, msgs: ChatMsg[]) => {
    setChatByCrew((prev) => ({ ...prev, [crewId]: [...(prev[crewId] || []), ...msgs] }));
  };

  const persistBitacora = async (texto: string, rondaNum: number, metodo: string) => {
    setSaving(true); setSaveError("");
    const item: BitacoraItem = { id: `local-${uid()}`, texto, ronda: rondaNum, created_at: new Date().toISOString() };
    try {
      const key = `bitacora-ronda-${rondaNum}-${metodo}`;
      const created = await callApi("records.create", {
        collection: "bitacora_impostor",
        value: { ronda: rondaNum, texto, metodo, createdLabel: new Date().toLocaleString("es-ES") },
        idempotency_key: key,
      });
      const rec = created as { id: string; value: any; created_at: string };
      setBitacora((prev) => [{ id: rec.id, texto: String(rec.value?.texto || texto), ronda: rondaNum, created_at: rec.created_at }, ...prev]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      // Idempotency reuse means it may already be stored — reload to confirm.
      if (msg.includes("idempotency")) { await loadBitacora(); }
      else { setPending((p) => [item, ...p]); setSaveError("No se pudo guardar esta ronda en la bitácora persistente. Queda en esta sesión."); }
    } finally { setSaving(false); }
  };

  const selectCrew = (c: Crew) => {
    if (status !== "playing") return;
    setSelectedId(c.id);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 30);
    setChatByCrew((prev) => {
      if (prev[c.id]?.length) return prev;
      return { ...prev, [c.id]: [{ id: uid(), from: "system", text: `> Interrogando a ${c.name} (${c.role}). Presiona 'Enviar' para hablar.` }] };
    });
    pushLog([{ text: `> Capitán selecciona a ${c.name} (${c.role}) para interrogar.`, kind: "info" }]);
  };

  const healthyAnswer = (c: Crew, q: string): string => {
    const d = ROLE_DATA[c.role];
    const opts = [
      `Estaba en ${d.location} ${d.task}, capitán. Todo en orden.`,
      `En ${d.location}, capitán. Mi tarea era ${d.task}.`,
      `Tranquilo, capitán. Yo estaba en ${d.location} ${d.task}.`,
    ];
    if (q.includes("donde") || q.includes("estabas") || q.includes("dónde")) return `Estaba en ${d.location} ${d.task}, capitán. Pueden verificarlo.`;
    if (q.includes("tarea") || q.includes("hacias") || q.includes("hacías") || q.includes("haciendo")) return `Mi tarea era ${d.task}, capitán. Sin novedades.`;
    if (q.includes("sabotaje")) return `No vi ningún sabotaje, capitán. Yo estaba concentrado en ${d.task} en ${d.location}.`;
    if (q.includes("impostor") || q.includes("quien") || q.includes("quién")) return `No quiero acusar sin pruebas, capitán. Yo solo hago mi trabajo en ${d.location}.`;
    if (q.includes("mientes") || q.includes("mentira") || q.includes("miente")) return `Le juro que digo la verdad, capitán. Estaba en ${d.location}.`;
    if (q.includes("motores") || q.includes("cafeter") || q.includes("puente") || q.includes("laboratorio") || q.includes("enfermer")) {
      const mentioned = q.includes(d.location.split(" ")[1] || "") || q.includes(d.location);
      return mentioned ? `Sí, capitán. Estaba en ${d.location} ${d.task}.` : `No, capitán. Yo no estaba ahí. Yo estaba en ${d.location} ${d.task}.`;
    }
    if (q.includes("hola") || q.includes("como estas") || q.includes("cómo")) return `Bien, capitán. En ${d.location}, ${d.task}. ¿Necesita algo?`;
    return opts[Math.floor(Math.random() * opts.length)];
  };

  const impostorAnswer = (c: Crew, q: string): { text: string; contradiction: boolean } => {
    const slips = ["ehh... yo... estaba... en... eh...", "no me mires así, capitán", "¿por qué a mí?"];
    const slip = slips[Math.floor(Math.random() * slips.length)];
    if (q.includes("donde") || q.includes("estabas") || q.includes("dónde")) {
      if (c.whereCount === 0) return { text: `${slip} cafetería, lo juro, capitán. Yo estaba en cafetería.`, contradiction: false };
      if (c.whereCount === 1) return { text: `Estaba en motores, sí, en motores... lo juro. Estaba revisando motores.`, contradiction: false };
      return { text: `Estaba en el puente... ¿o era cafetería? Eh... en el puente, lo juro. No, espera... en el puente.`, contradiction: true };
    }
    if (q.includes("tarea") || q.includes("hacias") || q.includes("haciendo")) return { text: `Yo... estaba revisando... eh... cosas, capitán. Todo normal, lo juro.`, contradiction: false };
    if (q.includes("sabotaje")) return { text: `¿Sabotaje? Yo no vi nada... ¿por qué a mí? Yo estaba en cafetería, lo juro.`, contradiction: false };
    if (q.includes("impostor") || q.includes("quien")) return { text: `¿Yo? No, capitán, no me mires así, capitán. Yo no soy. Busque en motores.`, contradiction: false };
    if (q.includes("mientes") || q.includes("mentira") || q.includes("miente")) return { text: `¡No miento! Yo estaba en cafetería, lo juro... digo, en motores... en el puente. Lo juro.`, contradiction: c.whereCount >= 1 };
    if (q.includes("cafeter") || q.includes("motores") || q.includes("puente")) return { text: `Sí, sí... ahí estaba. En... eh... ahí mismo, capitán. Lo juro.`, contradiction: false };
    const generic = [
      `Eh... todo tranquilo, capitán. Yo estaba en cafetería, lo juro.`,
      `No sé nada, capitán. ¿Por qué a mí? Yo solo estaba por ahí...`,
      `Yo no vi nada raro. Ehh... yo... estaba... en... cafetería.`,
    ];
    return { text: generic[Math.floor(Math.random() * generic.length)], contradiction: false };
  };

  const sendMessage = (forced?: string) => {
    const text = (forced ?? input).trim();
    if (!text || !selected || status !== "playing" || typing) return;
    const target = selected;
    const q = text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    appendChat(target.id, [{ id: uid(), from: "capitan", text }]);
    setInput("");
    setTyping(true);
    const delay = 700 + Math.random() * 500;
    window.setTimeout(() => {
      setTyping(false);
      const isWhere = q.includes("donde") || q.includes("estabas") || q.includes("dónde");
      let answer = "";
      let contradiction = false;
      let newSuspicion = target.suspicion;
      let newWhere = target.whereCount;
      let newQuestions = target.questions + 1;
      if (target.isImpostor) {
        const r = impostorAnswer(target, q);
        answer = r.text; contradiction = r.contradiction;
        if (isWhere) newWhere += 1;
        if (contradiction) newSuspicion = Math.min(100, newSuspicion + 25);
        else newSuspicion = Math.min(100, newSuspicion + 8);
      } else {
        answer = healthyAnswer(target, q);
        newSuspicion = Math.max(0, Math.min(100, newSuspicion + 1));
      }
      appendChat(target.id, [{ id: uid(), from: "crew", text: answer }]);
      if (contradiction) {
        appendChat(target.id, [{ id: uid(), from: "tag", text: "[CONTRADICCIÓN +25%] — Su coartada cambió 3 veces: cafetería → motores → puente." }]);
        pushLog([{ text: `🧠 Depurador Inteligente: ${target.name} cambió su coartada. Sospecha +25%. Las contradicciones son más fiables que un escaneo a ciegas.`, kind: "brain" }]);
      }
      let sabotage = false;
      if (target.isImpostor && newQuestions >= 5) { sabotage = true; newQuestions = 0; }
      setCrew((prev) => prev.map((c) => c.id === target.id ? { ...c, questions: newQuestions, whereCount: newWhere, suspicion: newSuspicion } : c));
      if (sabotage) {
        const nextLives = lives - 1;
        setLives(nextLives);
        appendChat(target.id, [{ id: uid(), from: "system", text: "⚠️ SABOTAJE: Mientras lo interrogabas, algo falló en la nave. Pierdes 1 vida." }]);
        pushLog([{ text: "⚠️ Depurador Inteligente: El impostor aprovechó el interrogatorio largo para sabotear. Interroga con preguntas clave y escanea con ética.", kind: "warn" }]);
        if (nextLives <= 0) {
          setStatus("lost");
          setLoseReason("NAVE COMPROMETIDA POR SABOTAJE: Las vidas llegaron a 0 mientras el impostor seguía a bordo.");
        }
      }
    }, delay);
  };

  const ethicalScan = async () => {
    if (!selected || status !== "playing" || selected.verified || selected.expelled) return;
    const target = selected;
    const isImp = target.isImpostor;
    pushLog([
      { text: `> Ejecutando [${target.name}].some(t => t.esImpostor) // Array de 1 solo elemento`, kind: "call" },
      { text: `[Iteración 0] Evaluando a ${target.name} (${target.role})...`, kind: "iter" },
      { text: `   -> Callback retornó: ${isImp ? "TRUE (¡Es impostor!)" : "FALSE (Tripulante)"}`, kind: isImp ? "true" : "false" },
      { text: `🧠 Depurador Inteligente: Array de 1 elemento, solo hay 1 iteración posible. Si da TRUE es impostor, si da FALSE está limpio.`, kind: "brain" },
      { text: `> .some() finalizado. Resultado: ${isImp}`, kind: "call" },
    ]);
    setScanStats(`Iteraciones usadas: 1 / 1 - Ahorradas por short-circuit: 0 — Escaneo ético sobre ${target.name}.`);
    if (isImp) {
      setCrew((prev) => prev.map((c) => c.id === target.id ? { ...c, expelled: true } : c));
      setStatus("won");
      appendChat(target.id, [{ id: uid(), from: "system", text: "✅ DETECCIÓN ÉTICA — Impostor expulsado. Ronda limpia." }]);
      await persistBitacora(`Ronda ${round}: Impostor era ${target.name} - Detectado con escaneo ético`, round, "etico");
    } else {
      setCrew((prev) => prev.map((c) => c.id === target.id ? { ...c, verified: true, suspicion: 0 } : c));
      appendChat(target.id, [{ id: uid(), from: "system", text: "✅ TRIPULANTE VERIFICADO — Limpio. Ya no se vuelve a escanear." }]);
    }
  };

  const abusiveScan = async () => {
    if (status !== "playing") return;
    const entries: Omit<LogEntry, "id">[] = [
      { text: "⚠️ Depurador Inteligente: Detectado ESCANEO ABUSIVO. Revisaste a toda la tripulación sin interrogarlos uno a uno. Eficiente en código, pero poco ético en la nave.", kind: "warn" },
      { text: "> Ejecutando tripulantes.some(t => t.esImpostor)", kind: "call" },
    ];
    let used = 0, skipped = 0, found: Crew | null = null;
    crew.forEach((c, idx) => {
      if (found) return;
      if (c.verified && !c.isImpostor) {
        skipped += 1;
        entries.push({ text: `⏭️ Saltando a ${c.name} (${c.role}) — ya verificado como sano. No se vuelve a escanear.`, kind: "skip" });
        return;
      }
      if (c.expelled) { skipped += 1; return; }
      entries.push({ text: `[Iteración ${idx}] Evaluando a ${c.name} (${c.role})...`, kind: "iter" });
      used += 1;
      if (c.isImpostor) {
        found = c;
        entries.push({ text: "   -> Callback retornó: TRUE (¡Es impostor!)", kind: "true" });
        entries.push({ text: `🧠 Depurador Inteligente: Como ya encontró 1 TRUE, .some() hace SHORT-CIRCUIT. Ya no revisa a los restantes.`, kind: "brain" });
      } else {
        entries.push({ text: "   -> Callback retornó: FALSE (Tripulante)", kind: "false" });
        entries.push({ text: "🧠 Depurador Inteligente: Como dio FALSE, .some() DEBE seguir, aún no puede asegurar que no hay impostor.", kind: "brain" });
      }
    });
    const remaining = crew.length - used - skipped;
    const ethicsAfter = Math.max(0, ethics - 25);
    setEthics(ethicsAfter);
    entries.push({ text: `> .some() finalizado. Resultado: ${found ? "true" : "false"}`, kind: "call" });
    entries.push({ text: `⚠️ VIOLASTE LA PRIVACIDAD DE TODA LA TRIPULACIÓN — Ética -25%.`, kind: "warn" });
    pushLog(entries);
    setScanStats(`Iteraciones usadas: ${used} / ${crew.length} - Ahorradas por short-circuit: ${Math.max(0, remaining)} — Saltados por verificados: ${skipped}.`);
    if (ethicsAfter <= 0) {
      setStatus("lost");
      setLoseReason("MOTÍN: La tripulación ya no confía en ti por escanear abusivamente. Ética en 0.");
      if (found) setCrew((prev) => prev.map((c) => c.id === found!.id ? { ...c, expelled: true } : c));
      await persistBitacora(`Ronda ${round}: Motín por abuso de poder - Ética en 0 tras escaneo abusivo`, round, "motin");
      return;
    }
    if (found) {
      const f = found;
      setCrew((prev) => prev.map((c) => c.id === f.id ? { ...c, expelled: true } : c));
      setStatus("won");
      appendChat(f.id, [{ id: uid(), from: "system", text: "⚠️ Impostor expulsado con escaneo abusivo. Ganaste, pero con penalización de ética." }]);
      await persistBitacora(`Ronda ${round}: Impostor era ${f.name} - Detectado con escaneo abusivo (ética -25%)`, round, "abusivo");
    } else {
      pushLog([{ text: "🧠 Depurador Inteligente: Resultado false. Nadie era impostor en este escaneo, pero igual perdiste ética porque escaneaste a todos sin motivo.", kind: "brain" }]);
    }
  };

  const nextRound = () => {
    const nr = round + 1;
    setRound(nr); setCrew(makeCrew(nr)); setSelectedId(null); setChatByCrew({}); setInput(""); setTyping(false);
    setLives(4); setEthics(100); setStatus("playing"); setLoseReason("");
    setLogs(initialLogs(nr)); setScanStats("Nueva ronda. Interroga primero, luego escanea con ética.");
  };
  const restart = () => {
    setRound(1); setCrew(makeCrew(1)); setSelectedId(null); setChatByCrew({}); setInput(""); setTyping(false);
    setLives(4); setEthics(100); setStatus("playing"); setLoseReason("");
    setLogs(initialLogs(1)); setScanStats("Protocolo reiniciado. Interroga primero, luego escanea con ética.");
  };

  const allBitacora = useMemo(() => [...pending, ...bitacora].sort((a, b) => b.ronda - a.ronda), [pending, bitacora]);
  const quick = ["¿Dónde estabas?", "¿Qué hacías?", "¿Viste algún sabotaje?", "¿Quién crees que es el impostor?", "¿Estás mintiendo?"];

  return (
    <div data-safe-area-inset-root style={{ boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "#030508", color: "var(--text)" }} className="overflow-x-clip">
      {/* Fondo neon */}
      <div aria-hidden className="pointer-events-none fixed inset-0" style={{ background: "radial-gradient(600px 300px at 15% 0%, rgba(34,211,238,.14), transparent 60%), radial-gradient(500px 280px at 90% 10%, rgba(168,85,247,.12), transparent 60%), radial-gradient(700px 400px at 50% 100%, rgba(34,197,94,.08), transparent 60%)" }} />

      <div className="relative mx-auto max-w-[1500px] px-2 sm:px-3 pb-3">
        <header data-safe-area-sticky-top style={{ top: "var(--safe-area-inset-top)" }} className="sticky z-30 -mx-2 sm:-mx-3 px-2 sm:px-3 py-2 bg-[#030508]/95 backdrop-blur border-b border-[#1c2f52]">
          <div className="flex flex-wrap items-center gap-2">
            <div className="min-w-0">
              <p className="font-bold leading-none text-[clamp(18px,3vw,28px)] tracking-wide">👨‍🚀 CAPITÁN <span className="text-cyan-300 neon">// NAVE SOME-1</span></p>
              <p className="text-[12px] tracking-[0.22em] text-slate-400">PROTOCOLO SOME • INTERROGATORIO + DEPURACIÓN</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mx-auto">
              <span className="rounded-full border border-emerald-400/50 bg-emerald-400/10 px-2 py-1 text-[11px] sm:text-xs font-bold text-emerald-300">IA CASERA V2.0 - OFFLINE ✅ SIN API</span>
              <span className="rounded-full border border-cyan-400/50 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200">RONDA {round}</span>
            </div>
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-lg leading-none" aria-label={`${lives} vidas`} title={`${lives} de 4 vidas`}>{[1, 2, 3, 4].map((i) => <span key={i} className={i <= lives ? "text-red-500" : "text-slate-700"}>{i <= lives ? "❤" : "♡"}</span>)}</span>
              <span className="font-code text-sm font-bold">{lives}/4</span>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-[11px] font-bold tracking-widest text-slate-300 whitespace-nowrap">CONFIANZA / ÉTICA</span>
            <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-slate-800 border border-[#1c2f52]"><div className="h-full rounded-full transition-all" style={{ width: `${ethics}%`, background: ethics > 50 ? "#22c55e" : ethics > 25 ? "#facc15" : "#ef4444" }} /></div>
            <span className="font-code text-xs font-bold">{ethics}%</span>
          </div>
        </header>

        {status === "won" && (
          <div className="mt-3 rounded-xl border border-emerald-400/60 bg-emerald-400/10 px-3 py-3 flex flex-wrap items-center gap-3">
            <p className="font-bold text-emerald-200 flex-1 min-w-[220px]">✅ RONDA COMPLETADA — Impostor expulsado. La nave respira. ¿Siguiente ronda?</p>
            <button onClick={nextRound} className="rounded-lg bg-emerald-500 px-4 py-2 font-bold text-black hover:bg-emerald-400">SIGUIENTE RONDA →</button>
          </div>
        )}
        {saveError && <p className="mt-2 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-sm text-amber-200">{saveError}</p>}
        {saving && <p className="mt-2 text-xs text-cyan-200">Guardando ronda en la bitácora persistente…</p>}

        <main className="mt-3 grid gap-3 lg:grid-cols-[300px_minmax(0,1fr)_420px] items-start">
          {/* IZQUIERDA */}
          <section className="panel rounded-2xl p-3 min-w-0">
            <h2 className="font-bold tracking-wide text-[15px]">👨‍🚀 TRIPULANTES EN LA NAVE</h2>
            <p className="text-xs text-slate-400 mt-0.5">Toca uno para interrogarlo. Todos se ven iguales hasta ser revelados.</p>
            <div className="mt-3 space-y-2">
              {crew.map((c) => (
                <button key={c.id} onClick={() => selectCrew(c)} disabled={status !== "playing"} className={`w-full rounded-xl border px-2.5 py-2.5 text-left transition ${selectedId === c.id ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_18px_rgba(34,211,238,.25)]" : "border-[#1c2f52] bg-[#0a1428] hover:border-cyan-400/60"} ${c.expelled ? "opacity-70" : ""}`}>
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="text-2xl shrink-0">{c.expelled ? "👽" : c.verified ? "✅" : "🧑‍🚀"}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-bold text-[17px] leading-tight">{c.name} <span className="text-xs font-normal text-slate-400">• {c.role}</span></span>
                      <span className="block text-[12px] leading-tight text-slate-300">
                        {c.expelled ? "🔴 IMPOSTOR EXPULSADO" : c.verified ? "✅ TRIPULANTE VERIFICADO" : selectedId === c.id ? "🟢 SELECCIONADO PARA INTERROGAR" : "Sin verificar"}
                      </span>
                    </span>
                    <span className="shrink-0 rounded-full border border-[#1c2f52] px-2 py-0.5 font-code text-[11px] text-cyan-200">SOS {c.suspicion}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-amber-400" style={{ width: `${c.suspicion}%` }} /></div>
                </button>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-[#1c2f52] bg-[#050b18] p-3">
              <h3 className="font-bold text-sm tracking-wide">📓 BITÁCORA PERSISTENTE</h3>
              <p className="text-[11px] text-slate-400">Resultado de cada ronda, guardado para no perderlo.</p>
              {bitacoraError && <p className="mt-2 text-[12px] text-amber-200">{bitacoraError}</p>}
              <div className="scroll-thin mt-2 max-h-[220px] space-y-2 overflow-y-auto pr-1">
                {allBitacora.length === 0 && <p className="text-sm text-slate-400">Aún no hay rondas terminadas. Expulsa al impostor y quedará registrado aquí.</p>}
                {allBitacora.map((b) => (
                  <div key={b.id} className="rounded-lg border border-[#1c2f52] bg-[#0a1428] px-2.5 py-2 text-[13px] leading-snug">{b.texto}{pending.some((p) => p.id === b.id) ? " • (en esta sesión)" : ""}</div>
                ))}
              </div>
            </div>
          </section>

          {/* CENTRO */}
          <section className="panel rounded-2xl p-3 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-bold tracking-wide">INTERROGATORIO DEL CAPITÁN</h2>
              <span className="ml-auto rounded-full bg-cyan-400/10 border border-cyan-400/40 px-2 py-0.5 text-[11px] font-bold text-cyan-200">{selected ? `HABLANDO CON ${selected.name.toUpperCase()}` : "ELIGE UN TRIPULANTE"}</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">Pregunta dónde estaba. El impostor cambia su coartada. A la 3ª pregunta se contradice.</p>

            <div ref={chatRef} className="scroll-thin mt-3 h-[380px] sm:h-[420px] overflow-y-auto rounded-xl border border-[#1c2f52] bg-[#040814] p-3 space-y-3">
              {!selected && <div className="rounded-lg border border-dashed border-[#1c2f52] p-4 text-center text-slate-400">👈 Elige un tripulante a la izquierda para empezar el interrogatorio.<br /><span className="text-xs">Prueba: “¿Dónde estabas?” tres veces con la misma persona.</span></div>}
              {currentChat.map((m) => (
                <div key={m.id} className={`max-w-[92%] rounded-2xl px-3 py-2 text-[15px] leading-snug break-words ${m.from === "capitan" ? "ml-auto bg-cyan-500 text-black font-semibold rounded-br-sm" : m.from === "crew" ? "bg-[#101f3a] border border-[#1c2f52] rounded-bl-sm" : m.from === "tag" ? "mx-auto bg-amber-400/15 border border-amber-400/50 text-amber-200 font-bold text-center" : "mx-auto bg-slate-800/70 text-slate-300 text-[13px] font-code text-center"}`}>
                  {m.from === "crew" && selected && <span className="block text-[11px] font-bold tracking-widest text-cyan-300">{selected.name.toUpperCase()} • {selected.role.toUpperCase()}</span>}
                  {m.text}
                </div>
              ))}
              {typing && <div className="inline-flex items-center gap-2 rounded-2xl bg-[#101f3a] border border-[#1c2f52] px-3 py-2 text-sm text-slate-300"><span className="blink">●</span> escribiendo…</div>}
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {quick.map((q) => <button key={q} onClick={() => sendMessage(q)} disabled={!selected || status !== "playing" || typing} className="rounded-full border border-[#2a4370] bg-[#0a1428] px-2.5 py-1 text-[12px] hover:border-cyan-400 hover:text-cyan-200 disabled:opacity-40">{q}</button>)}
            </div>

            <form className="mt-2 flex gap-2" onSubmit={(e) => { e.preventDefault(); sendMessage(); }}>
              <input ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} disabled={!selected || status !== "playing" || typing} placeholder={selected ? `Pregunta a ${selected.name}… (Enter para enviar)` : "Elige un tripulante para hablar"} className="min-w-0 flex-1 rounded-xl border border-[#1c2f52] bg-[#050b18] px-3 py-3 text-[15px] placeholder:text-slate-500 disabled:opacity-50" />
              <button type="submit" disabled={!selected || status !== "playing" || typing || !input.trim()} className="shrink-0 rounded-xl bg-cyan-400 px-4 py-3 font-bold text-black hover:bg-cyan-300 disabled:opacity-40">Enviar ➤</button>
            </form>

            <div className="mt-4 space-y-2">
              <button onClick={ethicalScan} disabled={!selected || status !== "playing" || !selected.verified === false && false || selected?.verified || selected?.expelled} className="glow-green w-full rounded-xl bg-emerald-500 px-4 py-3.5 text-left font-bold text-black hover:bg-emerald-400 disabled:opacity-40 disabled:shadow-none">
                🛡️ ESCANEO ÉTICO: SOLO A: {selected ? selected.name : "—"}
                <span className="block text-[12px] font-normal">Gratis. No quita ética ni vidas. Solo revisa a quien interrogaste.</span>
              </button>
              <button onClick={abusiveScan} disabled={status !== "playing"} className="glow-red w-full rounded-xl border-2 border-red-500 bg-red-500/10 px-4 py-3 text-left font-bold text-red-200 hover:bg-red-500/20 disabled:opacity-40">
                ⚠️ ESCANEO ABUSIVO: A TODOS <span className="font-code text-[12px] font-normal">(tripulantes.some())</span>
                <span className="block text-[12px] font-normal text-red-200/80">Rápido, pero quita 25% de ética. 4 usos = motín.</span>
              </button>
              <p className="text-[12px] leading-snug text-slate-400">Ético = revisas solo a quien interrogaste, con sospecha. Abusivo = revisas a todos sin permiso, rápido pero te cuesta ética.</p>
              <p className="text-[12px] text-slate-500">Consejo del capitán: interroga 3 veces sobre “dónde estabas” antes de gastar un escaneo.</p>
            </div>
          </section>

          {/* DERECHA */}
          <section className="panel rounded-2xl p-3 min-w-0">
            <h2 className="font-bold tracking-wide">DEPURADOR COGNITIVO: <span className="font-code text-cyan-300">.some()</span></h2>
            <p className="text-xs text-slate-400 mt-1">No solo TRUE / FALSE. El depurador explica cada paso como un profesor.</p>
            <div className="mt-3 flex items-center justify-between gap-2">
              <span className="flex items-center gap-1.5 text-[11px] font-bold"><span className="h-2 w-2 rounded-full bg-red-500 blink" /> EN VIVO</span>
              <span className="font-code text-[11px] text-slate-400">tripulantes.some(t =&gt; t.esImpostor)</span>
            </div>
            <div ref={logRef} className="scroll-thin font-code mt-2 h-[420px] sm:h-[470px] overflow-y-auto rounded-xl border border-[#1c2f52] bg-black/60 p-3 text-[12.5px] leading-relaxed">
              {logs.map((l) => (
                <p key={l.id} className={`break-words whitespace-pre-wrap ${l.kind === "call" ? "text-cyan-300" : l.kind === "true" ? "text-red-400 font-bold" : l.kind === "false" ? "text-slate-400" : l.kind === "brain" ? "text-emerald-300" : l.kind === "warn" ? "text-amber-300 font-bold" : l.kind === "skip" ? "text-violet-300" : l.kind === "stats" ? "text-yellow-300" : l.kind === "iter" ? "text-white" : "text-slate-300"}`}>{l.text}</p>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-yellow-400/40 bg-yellow-400/10 px-3 py-2.5">
              <p className="text-[12px] font-bold text-yellow-200">📊 ESTADÍSTICAS DEL ÚLTIMO ESCANEO</p>
              <p className="font-code text-[12px] text-yellow-100/90 mt-0.5 break-words">{scanStats}</p>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-[11px]">
              <div className="rounded-lg border border-[#1c2f52] p-2"><span className="block text-cyan-300 font-bold">LLAMADA</span>cyan</div>
              <div className="rounded-lg border border-[#1c2f52] p-2"><span className="block text-red-400 font-bold">TRUE</span>rojo</div>
              <div className="rounded-lg border border-[#1c2f52] p-2"><span className="block text-yellow-300 font-bold">SHORT-CIRCUIT</span>amarillo</div>
            </div>
            <p className="mt-2 text-[11px] text-slate-500 leading-snug">FALSE = gris. La explicación inteligente siempre va en verde claro con 🧠.</p>
          </section>
        </main>

        <footer className="mt-3 border-t border-[#1c2f52] pt-2 pb-1 flex flex-wrap gap-x-3 gap-y-1 justify-between text-[11px] text-slate-500">
          <span>PROTOCOLO SOME - NAVE v1 - 6 tripulantes, 1 impostor, .some() paso a paso con short-circuit</span>
          <span>IA casera 100% offline • Sin API externa</span>
        </footer>
      </div>

      {status === "lost" && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4">
          <div className="w-full max-w-[520px] rounded-2xl border-2 border-red-500 bg-[#0a0508] p-5 text-center shadow-[0_0_50px_rgba(239,68,68,.35)]">
            <p className="text-5xl">🚨</p>
            <h2 className="mt-2 text-3xl font-bold tracking-wide text-red-400">NAVE COMPROMETIDA</h2>
            <p className="mt-3 text-[15px] leading-snug text-slate-200">{loseReason}</p>
            <p className="mt-2 text-sm text-slate-400">El protocolo se detiene. Tu bitácora queda guardada.</p>
            <button onClick={restart} className="mt-4 w-full rounded-xl bg-red-500 px-4 py-3 font-bold text-white hover:bg-red-400">REINICIAR PROTOCOLO ↻</button>
          </div>
        </div>
      )}
    </div>
  );
}
