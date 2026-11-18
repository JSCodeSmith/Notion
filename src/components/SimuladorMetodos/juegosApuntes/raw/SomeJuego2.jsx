/* Convertido automáticamente desde Apuntes/some/juego2.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
const NAMES = ["Alex", "Maya", "Leo", "Nia", "Hugo", "Sara", "Iv\xE1n", "Luna", "Diego", "Zoe"];
const ROLES = ["Piloto", "Ingeniero", "M\xE9dico", "Cocinero", "Cient\xEDfico", "Comunicaciones"];
const ROLE_DATA = {
  Piloto: { location: "el puente", task: "revisando la navegaci\xF3n" },
  Ingeniero: { location: "motores", task: "revisando el ox\xEDgeno" },
  M\u00E9dico: { location: "la enfermer\xEDa", task: "revisando los signos vitales" },
  Cocinero: { location: "la cafeter\xEDa", task: "preparando la comida" },
  Cient\u00EDfico: { location: "el laboratorio", task: "analizando muestras" },
  Comunicaciones: { location: "comunicaciones", task: "revisando las antenas" }
};
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}
function makeCrew(round) {
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
    suspicion: 0
  }));
}
function initialLogs(round) {
  return [
    { id: uid(), text: `> PROTOCOLO SOME activado \u2014 Ronda ${round}`, kind: "call" },
    { id: uid(), text: "\u{1F9E0} Depurador Inteligente: .some() pregunta \u201C\xBFhay AL MENOS UNO que cumpla la condici\xF3n?\u201D. En cuanto ve un TRUE, se detiene.", kind: "brain" },
    { id: uid(), text: "\u{1F9E0} Depurador Inteligente: Si todos dan FALSE, el resultado es false y la nave est\xE1 limpia. Un FALSE no basta para decidir.", kind: "brain" },
    { id: uid(), text: "> Esperando interrogatorio o escaneo del capit\xE1n\u2026", kind: "info" }
  ];
}
async function callApi(action, args) {
  const res = await fetch("actions", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ action, args })
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.error) throw new Error(json?.error || `Error ${res.status}`);
  return json.data;
}
function App() {
  const [round, setRound] = useState(1);
  const [crew, setCrew] = useState(() => makeCrew(1));
  const [selectedId, setSelectedId] = useState(null);
  const [chatByCrew, setChatByCrew] = useState({});
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [lives, setLives] = useState(4);
  const [ethics, setEthics] = useState(100);
  const [logs, setLogs] = useState(() => initialLogs(1));
  const [status, setStatus] = useState("playing");
  const [loseReason, setLoseReason] = useState("");
  const [scanStats, setScanStats] = useState("Sin escaneos todav\xEDa. Interroga primero, luego escanea con \xE9tica.");
  const [bitacora, setBitacora] = useState([]);
  const [pending, setPending] = useState([]);
  const [bitacoraError, setBitacoraError] = useState("");
  const [saveError, setSaveError] = useState("");
  const [saving, setSaving] = useState(false);
  const chatRef = useRef(null);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const selected = crew.find((c) => c.id === selectedId) || null;
  const currentChat = selected ? chatByCrew[selected.id] || [] : [];
  const loadBitacora = async () => {
    try {
      const data = await callApi("records.list", { collection: "bitacora_impostor" });
      const recs = data?.records || [];
      const items = recs.map((r) => ({
        id: r.id,
        texto: String(r.value?.texto || ""),
        ronda: Number(r.value?.ronda || 0),
        created_at: r.created_at || ""
      })).filter((x) => x.texto).sort((a, b) => b.ronda - a.ronda);
      setBitacora(items);
      setBitacoraError("");
    } catch {
      setBitacoraError("Bit\xE1cora persistente no disponible en esta vista previa. Los resultados de la ronda se guardar\xE1n al publicar.");
    }
  };
  useEffect(() => {
    loadBitacora();
  }, []);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [currentChat, typing]);
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: "smooth" });
  }, [logs]);
  const pushLog = (entries) => {
    setLogs((prev) => [...prev, ...entries.map((e) => ({ ...e, id: uid() }))].slice(-140));
  };
  const appendChat = (crewId, msgs) => {
    setChatByCrew((prev) => ({ ...prev, [crewId]: [...prev[crewId] || [], ...msgs] }));
  };
  const persistBitacora = async (texto, rondaNum, metodo) => {
    setSaving(true);
    setSaveError("");
    const item = { id: `local-${uid()}`, texto, ronda: rondaNum, created_at: (/* @__PURE__ */ new Date()).toISOString() };
    try {
      const key = `bitacora-ronda-${rondaNum}-${metodo}`;
      const created = await callApi("records.create", {
        collection: "bitacora_impostor",
        value: { ronda: rondaNum, texto, metodo, createdLabel: (/* @__PURE__ */ new Date()).toLocaleString("es-ES") },
        idempotency_key: key
      });
      const rec = created;
      setBitacora((prev) => [{ id: rec.id, texto: String(rec.value?.texto || texto), ronda: rondaNum, created_at: rec.created_at }, ...prev]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      if (msg.includes("idempotency")) {
        await loadBitacora();
      } else {
        setPending((p) => [item, ...p]);
        setSaveError("No se pudo guardar esta ronda en la bit\xE1cora persistente. Queda en esta sesi\xF3n.");
      }
    } finally {
      setSaving(false);
    }
  };
  const selectCrew = (c) => {
    if (status !== "playing") return;
    setSelectedId(c.id);
    setInput("");
    setTimeout(() => inputRef.current?.focus(), 30);
    setChatByCrew((prev) => {
      if (prev[c.id]?.length) return prev;
      return { ...prev, [c.id]: [{ id: uid(), from: "system", text: `> Interrogando a ${c.name} (${c.role}). Presiona 'Enviar' para hablar.` }] };
    });
    pushLog([{ text: `> Capit\xE1n selecciona a ${c.name} (${c.role}) para interrogar.`, kind: "info" }]);
  };
  const healthyAnswer = (c, q) => {
    const d = ROLE_DATA[c.role];
    const opts = [
      `Estaba en ${d.location} ${d.task}, capit\xE1n. Todo en orden.`,
      `En ${d.location}, capit\xE1n. Mi tarea era ${d.task}.`,
      `Tranquilo, capit\xE1n. Yo estaba en ${d.location} ${d.task}.`
    ];
    if (q.includes("donde") || q.includes("estabas") || q.includes("d\xF3nde")) return `Estaba en ${d.location} ${d.task}, capit\xE1n. Pueden verificarlo.`;
    if (q.includes("tarea") || q.includes("hacias") || q.includes("hac\xEDas") || q.includes("haciendo")) return `Mi tarea era ${d.task}, capit\xE1n. Sin novedades.`;
    if (q.includes("sabotaje")) return `No vi ning\xFAn sabotaje, capit\xE1n. Yo estaba concentrado en ${d.task} en ${d.location}.`;
    if (q.includes("impostor") || q.includes("quien") || q.includes("qui\xE9n")) return `No quiero acusar sin pruebas, capit\xE1n. Yo solo hago mi trabajo en ${d.location}.`;
    if (q.includes("mientes") || q.includes("mentira") || q.includes("miente")) return `Le juro que digo la verdad, capit\xE1n. Estaba en ${d.location}.`;
    if (q.includes("motores") || q.includes("cafeter") || q.includes("puente") || q.includes("laboratorio") || q.includes("enfermer")) {
      const mentioned = q.includes(d.location.split(" ")[1] || "") || q.includes(d.location);
      return mentioned ? `S\xED, capit\xE1n. Estaba en ${d.location} ${d.task}.` : `No, capit\xE1n. Yo no estaba ah\xED. Yo estaba en ${d.location} ${d.task}.`;
    }
    if (q.includes("hola") || q.includes("como estas") || q.includes("c\xF3mo")) return `Bien, capit\xE1n. En ${d.location}, ${d.task}. \xBFNecesita algo?`;
    return opts[Math.floor(Math.random() * opts.length)];
  };
  const impostorAnswer = (c, q) => {
    const slips = ["ehh... yo... estaba... en... eh...", "no me mires as\xED, capit\xE1n", "\xBFpor qu\xE9 a m\xED?"];
    const slip = slips[Math.floor(Math.random() * slips.length)];
    if (q.includes("donde") || q.includes("estabas") || q.includes("d\xF3nde")) {
      if (c.whereCount === 0) return { text: `${slip} cafeter\xEDa, lo juro, capit\xE1n. Yo estaba en cafeter\xEDa.`, contradiction: false };
      if (c.whereCount === 1) return { text: `Estaba en motores, s\xED, en motores... lo juro. Estaba revisando motores.`, contradiction: false };
      return { text: `Estaba en el puente... \xBFo era cafeter\xEDa? Eh... en el puente, lo juro. No, espera... en el puente.`, contradiction: true };
    }
    if (q.includes("tarea") || q.includes("hacias") || q.includes("haciendo")) return { text: `Yo... estaba revisando... eh... cosas, capit\xE1n. Todo normal, lo juro.`, contradiction: false };
    if (q.includes("sabotaje")) return { text: `\xBFSabotaje? Yo no vi nada... \xBFpor qu\xE9 a m\xED? Yo estaba en cafeter\xEDa, lo juro.`, contradiction: false };
    if (q.includes("impostor") || q.includes("quien")) return { text: `\xBFYo? No, capit\xE1n, no me mires as\xED, capit\xE1n. Yo no soy. Busque en motores.`, contradiction: false };
    if (q.includes("mientes") || q.includes("mentira") || q.includes("miente")) return { text: `\xA1No miento! Yo estaba en cafeter\xEDa, lo juro... digo, en motores... en el puente. Lo juro.`, contradiction: c.whereCount >= 1 };
    if (q.includes("cafeter") || q.includes("motores") || q.includes("puente")) return { text: `S\xED, s\xED... ah\xED estaba. En... eh... ah\xED mismo, capit\xE1n. Lo juro.`, contradiction: false };
    const generic = [
      `Eh... todo tranquilo, capit\xE1n. Yo estaba en cafeter\xEDa, lo juro.`,
      `No s\xE9 nada, capit\xE1n. \xBFPor qu\xE9 a m\xED? Yo solo estaba por ah\xED...`,
      `Yo no vi nada raro. Ehh... yo... estaba... en... cafeter\xEDa.`
    ];
    return { text: generic[Math.floor(Math.random() * generic.length)], contradiction: false };
  };
  const sendMessage = (forced) => {
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
      const isWhere = q.includes("donde") || q.includes("estabas") || q.includes("d\xF3nde");
      let answer = "";
      let contradiction = false;
      let newSuspicion = target.suspicion;
      let newWhere = target.whereCount;
      let newQuestions = target.questions + 1;
      if (target.isImpostor) {
        const r = impostorAnswer(target, q);
        answer = r.text;
        contradiction = r.contradiction;
        if (isWhere) newWhere += 1;
        if (contradiction) newSuspicion = Math.min(100, newSuspicion + 25);
        else newSuspicion = Math.min(100, newSuspicion + 8);
      } else {
        answer = healthyAnswer(target, q);
        newSuspicion = Math.max(0, Math.min(100, newSuspicion + 1));
      }
      appendChat(target.id, [{ id: uid(), from: "crew", text: answer }]);
      if (contradiction) {
        appendChat(target.id, [{ id: uid(), from: "tag", text: "[CONTRADICCI\xD3N +25%] \u2014 Su coartada cambi\xF3 3 veces: cafeter\xEDa \u2192 motores \u2192 puente." }]);
        pushLog([{ text: `\u{1F9E0} Depurador Inteligente: ${target.name} cambi\xF3 su coartada. Sospecha +25%. Las contradicciones son m\xE1s fiables que un escaneo a ciegas.`, kind: "brain" }]);
      }
      let sabotage = false;
      if (target.isImpostor && newQuestions >= 5) {
        sabotage = true;
        newQuestions = 0;
      }
      setCrew((prev) => prev.map((c) => c.id === target.id ? { ...c, questions: newQuestions, whereCount: newWhere, suspicion: newSuspicion } : c));
      if (sabotage) {
        const nextLives = lives - 1;
        setLives(nextLives);
        appendChat(target.id, [{ id: uid(), from: "system", text: "\u26A0\uFE0F SABOTAJE: Mientras lo interrogabas, algo fall\xF3 en la nave. Pierdes 1 vida." }]);
        pushLog([{ text: "\u26A0\uFE0F Depurador Inteligente: El impostor aprovech\xF3 el interrogatorio largo para sabotear. Interroga con preguntas clave y escanea con \xE9tica.", kind: "warn" }]);
        if (nextLives <= 0) {
          setStatus("lost");
          setLoseReason("NAVE COMPROMETIDA POR SABOTAJE: Las vidas llegaron a 0 mientras el impostor segu\xEDa a bordo.");
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
      { text: `[Iteraci\xF3n 0] Evaluando a ${target.name} (${target.role})...`, kind: "iter" },
      { text: `   -> Callback retorn\xF3: ${isImp ? "TRUE (\xA1Es impostor!)" : "FALSE (Tripulante)"}`, kind: isImp ? "true" : "false" },
      { text: `\u{1F9E0} Depurador Inteligente: Array de 1 elemento, solo hay 1 iteraci\xF3n posible. Si da TRUE es impostor, si da FALSE est\xE1 limpio.`, kind: "brain" },
      { text: `> .some() finalizado. Resultado: ${isImp}`, kind: "call" }
    ]);
    setScanStats(`Iteraciones usadas: 1 / 1 - Ahorradas por short-circuit: 0 \u2014 Escaneo \xE9tico sobre ${target.name}.`);
    if (isImp) {
      setCrew((prev) => prev.map((c) => c.id === target.id ? { ...c, expelled: true } : c));
      setStatus("won");
      appendChat(target.id, [{ id: uid(), from: "system", text: "\u2705 DETECCI\xD3N \xC9TICA \u2014 Impostor expulsado. Ronda limpia." }]);
      await persistBitacora(`Ronda ${round}: Impostor era ${target.name} - Detectado con escaneo \xE9tico`, round, "etico");
    } else {
      setCrew((prev) => prev.map((c) => c.id === target.id ? { ...c, verified: true, suspicion: 0 } : c));
      appendChat(target.id, [{ id: uid(), from: "system", text: "\u2705 TRIPULANTE VERIFICADO \u2014 Limpio. Ya no se vuelve a escanear." }]);
    }
  };
  const abusiveScan = async () => {
    if (status !== "playing") return;
    const entries = [
      { text: "\u26A0\uFE0F Depurador Inteligente: Detectado ESCANEO ABUSIVO. Revisaste a toda la tripulaci\xF3n sin interrogarlos uno a uno. Eficiente en c\xF3digo, pero poco \xE9tico en la nave.", kind: "warn" },
      { text: "> Ejecutando tripulantes.some(t => t.esImpostor)", kind: "call" }
    ];
    let used = 0, skipped = 0, found = null;
    crew.forEach((c, idx) => {
      if (found) return;
      if (c.verified && !c.isImpostor) {
        skipped += 1;
        entries.push({ text: `\u23ED\uFE0F Saltando a ${c.name} (${c.role}) \u2014 ya verificado como sano. No se vuelve a escanear.`, kind: "skip" });
        return;
      }
      if (c.expelled) {
        skipped += 1;
        return;
      }
      entries.push({ text: `[Iteraci\xF3n ${idx}] Evaluando a ${c.name} (${c.role})...`, kind: "iter" });
      used += 1;
      if (c.isImpostor) {
        found = c;
        entries.push({ text: "   -> Callback retorn\xF3: TRUE (\xA1Es impostor!)", kind: "true" });
        entries.push({ text: `\u{1F9E0} Depurador Inteligente: Como ya encontr\xF3 1 TRUE, .some() hace SHORT-CIRCUIT. Ya no revisa a los restantes.`, kind: "brain" });
      } else {
        entries.push({ text: "   -> Callback retorn\xF3: FALSE (Tripulante)", kind: "false" });
        entries.push({ text: "\u{1F9E0} Depurador Inteligente: Como dio FALSE, .some() DEBE seguir, a\xFAn no puede asegurar que no hay impostor.", kind: "brain" });
      }
    });
    const remaining = crew.length - used - skipped;
    const ethicsAfter = Math.max(0, ethics - 25);
    setEthics(ethicsAfter);
    entries.push({ text: `> .some() finalizado. Resultado: ${found ? "true" : "false"}`, kind: "call" });
    entries.push({ text: `\u26A0\uFE0F VIOLASTE LA PRIVACIDAD DE TODA LA TRIPULACI\xD3N \u2014 \xC9tica -25%.`, kind: "warn" });
    pushLog(entries);
    setScanStats(`Iteraciones usadas: ${used} / ${crew.length} - Ahorradas por short-circuit: ${Math.max(0, remaining)} \u2014 Saltados por verificados: ${skipped}.`);
    if (ethicsAfter <= 0) {
      setStatus("lost");
      setLoseReason("MOT\xCDN: La tripulaci\xF3n ya no conf\xEDa en ti por escanear abusivamente. \xC9tica en 0.");
      if (found) setCrew((prev) => prev.map((c) => c.id === found.id ? { ...c, expelled: true } : c));
      await persistBitacora(`Ronda ${round}: Mot\xEDn por abuso de poder - \xC9tica en 0 tras escaneo abusivo`, round, "motin");
      return;
    }
    if (found) {
      const f = found;
      setCrew((prev) => prev.map((c) => c.id === f.id ? { ...c, expelled: true } : c));
      setStatus("won");
      appendChat(f.id, [{ id: uid(), from: "system", text: "\u26A0\uFE0F Impostor expulsado con escaneo abusivo. Ganaste, pero con penalizaci\xF3n de \xE9tica." }]);
      await persistBitacora(`Ronda ${round}: Impostor era ${f.name} - Detectado con escaneo abusivo (\xE9tica -25%)`, round, "abusivo");
    } else {
      pushLog([{ text: "\u{1F9E0} Depurador Inteligente: Resultado false. Nadie era impostor en este escaneo, pero igual perdiste \xE9tica porque escaneaste a todos sin motivo.", kind: "brain" }]);
    }
  };
  const nextRound = () => {
    const nr = round + 1;
    setRound(nr);
    setCrew(makeCrew(nr));
    setSelectedId(null);
    setChatByCrew({});
    setInput("");
    setTyping(false);
    setLives(4);
    setEthics(100);
    setStatus("playing");
    setLoseReason("");
    setLogs(initialLogs(nr));
    setScanStats("Nueva ronda. Interroga primero, luego escanea con \xE9tica.");
  };
  const restart = () => {
    setRound(1);
    setCrew(makeCrew(1));
    setSelectedId(null);
    setChatByCrew({});
    setInput("");
    setTyping(false);
    setLives(4);
    setEthics(100);
    setStatus("playing");
    setLoseReason("");
    setLogs(initialLogs(1));
    setScanStats("Protocolo reiniciado. Interroga primero, luego escanea con \xE9tica.");
  };
  const allBitacora = useMemo(() => [...pending, ...bitacora].sort((a, b) => b.ronda - a.ronda), [pending, bitacora]);
  const quick = ["\xBFD\xF3nde estabas?", "\xBFQu\xE9 hac\xEDas?", "\xBFViste alg\xFAn sabotaje?", "\xBFQui\xE9n crees que es el impostor?", "\xBFEst\xE1s mintiendo?"];
  return /* @__PURE__ */ jsxs("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "#030508", color: "var(--text)" }, className: "overflow-x-clip", children: [
    /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "pointer-events-none fixed inset-0", style: { background: "radial-gradient(600px 300px at 15% 0%, rgba(34,211,238,.14), transparent 60%), radial-gradient(500px 280px at 90% 10%, rgba(168,85,247,.12), transparent 60%), radial-gradient(700px 400px at 50% 100%, rgba(34,197,94,.08), transparent 60%)" } }),
    /* @__PURE__ */ jsxs("div", { className: "relative mx-auto max-w-[1500px] px-2 sm:px-3 pb-3", children: [
      /* @__PURE__ */ jsxs("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)" }, className: "sticky z-30 -mx-2 sm:-mx-3 px-2 sm:px-3 py-2 bg-[#030508]/95 backdrop-blur border-b border-[#1c2f52]", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxs("p", { className: "font-bold leading-none text-[clamp(18px,3vw,28px)] tracking-wide", children: [
              "\u{1F468}\u200D\u{1F680} CAPIT\xC1N ",
              /* @__PURE__ */ jsx("span", { className: "text-cyan-300 neon", children: "// NAVE SOME-1" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[12px] tracking-[0.22em] text-slate-400", children: "PROTOCOLO SOME \u2022 INTERROGATORIO + DEPURACI\xD3N" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 mx-auto", children: [
            /* @__PURE__ */ jsx("span", { className: "rounded-full border border-emerald-400/50 bg-emerald-400/10 px-2 py-1 text-[11px] sm:text-xs font-bold text-emerald-300", children: "IA CASERA V2.0 - OFFLINE \u2705 SIN API" }),
            /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-cyan-400/50 bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-200", children: [
              "RONDA ",
              round
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
            /* @__PURE__ */ jsx("span", { className: "text-lg leading-none", "aria-label": `${lives} vidas`, title: `${lives} de 4 vidas`, children: [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx("span", { className: i <= lives ? "text-red-500" : "text-slate-700", children: i <= lives ? "\u2764" : "\u2661" }, i)) }),
            /* @__PURE__ */ jsxs("span", { className: "font-code text-sm font-bold", children: [
              lives,
              "/4"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "text-[11px] font-bold tracking-widest text-slate-300 whitespace-nowrap", children: "CONFIANZA / \xC9TICA" }),
          /* @__PURE__ */ jsx("div", { className: "h-2.5 flex-1 overflow-hidden rounded-full bg-slate-800 border border-[#1c2f52]", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full transition-all", style: { width: `${ethics}%`, background: ethics > 50 ? "#22c55e" : ethics > 25 ? "#facc15" : "#ef4444" } }) }),
          /* @__PURE__ */ jsxs("span", { className: "font-code text-xs font-bold", children: [
            ethics,
            "%"
          ] })
        ] })
      ] }),
      status === "won" && /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border border-emerald-400/60 bg-emerald-400/10 px-3 py-3 flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsx("p", { className: "font-bold text-emerald-200 flex-1 min-w-[220px]", children: "\u2705 RONDA COMPLETADA \u2014 Impostor expulsado. La nave respira. \xBFSiguiente ronda?" }),
        /* @__PURE__ */ jsx("button", { onClick: nextRound, className: "rounded-lg bg-emerald-500 px-4 py-2 font-bold text-black hover:bg-emerald-400", children: "SIGUIENTE RONDA \u2192" })
      ] }),
      saveError && /* @__PURE__ */ jsx("p", { className: "mt-2 rounded-lg border border-amber-400/40 bg-amber-400/10 px-3 py-2 text-sm text-amber-200", children: saveError }),
      saving && /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-cyan-200", children: "Guardando ronda en la bit\xE1cora persistente\u2026" }),
      /* @__PURE__ */ jsxs("main", { className: "mt-3 grid gap-3 lg:grid-cols-[300px_minmax(0,1fr)_420px] items-start", children: [
        /* @__PURE__ */ jsxs("section", { className: "panel rounded-2xl p-3 min-w-0", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold tracking-wide text-[15px]", children: "\u{1F468}\u200D\u{1F680} TRIPULANTES EN LA NAVE" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-0.5", children: "Toca uno para interrogarlo. Todos se ven iguales hasta ser revelados." }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: crew.map((c) => /* @__PURE__ */ jsxs("button", { onClick: () => selectCrew(c), disabled: status !== "playing", className: `w-full rounded-xl border px-2.5 py-2.5 text-left transition ${selectedId === c.id ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_18px_rgba(34,211,238,.25)]" : "border-[#1c2f52] bg-[#0a1428] hover:border-cyan-400/60"} ${c.expelled ? "opacity-70" : ""}`, children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsx("span", { className: "text-2xl shrink-0", children: c.expelled ? "\u{1F47D}" : c.verified ? "\u2705" : "\u{1F9D1}\u200D\u{1F680}" }),
              /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxs("span", { className: "block truncate font-bold text-[17px] leading-tight", children: [
                  c.name,
                  " ",
                  /* @__PURE__ */ jsxs("span", { className: "text-xs font-normal text-slate-400", children: [
                    "\u2022 ",
                    c.role
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "block text-[12px] leading-tight text-slate-300", children: c.expelled ? "\u{1F534} IMPOSTOR EXPULSADO" : c.verified ? "\u2705 TRIPULANTE VERIFICADO" : selectedId === c.id ? "\u{1F7E2} SELECCIONADO PARA INTERROGAR" : "Sin verificar" })
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "shrink-0 rounded-full border border-[#1c2f52] px-2 py-0.5 font-code text-[11px] text-cyan-200", children: [
                "SOS ",
                c.suspicion,
                "%"
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 h-1.5 overflow-hidden rounded-full bg-slate-800", children: /* @__PURE__ */ jsx("div", { className: "h-full rounded-full bg-gradient-to-r from-cyan-400 to-amber-400", style: { width: `${c.suspicion}%` } }) })
          ] }, c.id)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-xl border border-[#1c2f52] bg-[#050b18] p-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-sm tracking-wide", children: "\u{1F4D3} BIT\xC1CORA PERSISTENTE" }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-slate-400", children: "Resultado de cada ronda, guardado para no perderlo." }),
            bitacoraError && /* @__PURE__ */ jsx("p", { className: "mt-2 text-[12px] text-amber-200", children: bitacoraError }),
            /* @__PURE__ */ jsxs("div", { className: "scroll-thin mt-2 max-h-[220px] space-y-2 overflow-y-auto pr-1", children: [
              allBitacora.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-slate-400", children: "A\xFAn no hay rondas terminadas. Expulsa al impostor y quedar\xE1 registrado aqu\xED." }),
              allBitacora.map((b) => /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-[#1c2f52] bg-[#0a1428] px-2.5 py-2 text-[13px] leading-snug", children: [
                b.texto,
                pending.some((p) => p.id === b.id) ? " \u2022 (en esta sesi\xF3n)" : ""
              ] }, b.id))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel rounded-2xl p-3 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold tracking-wide", children: "INTERROGATORIO DEL CAPIT\xC1N" }),
            /* @__PURE__ */ jsx("span", { className: "ml-auto rounded-full bg-cyan-400/10 border border-cyan-400/40 px-2 py-0.5 text-[11px] font-bold text-cyan-200", children: selected ? `HABLANDO CON ${selected.name.toUpperCase()}` : "ELIGE UN TRIPULANTE" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-1", children: "Pregunta d\xF3nde estaba. El impostor cambia su coartada. A la 3\xAA pregunta se contradice." }),
          /* @__PURE__ */ jsxs("div", { ref: chatRef, className: "scroll-thin mt-3 h-[380px] sm:h-[420px] overflow-y-auto rounded-xl border border-[#1c2f52] bg-[#040814] p-3 space-y-3", children: [
            !selected && /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-dashed border-[#1c2f52] p-4 text-center text-slate-400", children: [
              "\u{1F448} Elige un tripulante a la izquierda para empezar el interrogatorio.",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-xs", children: "Prueba: \u201C\xBFD\xF3nde estabas?\u201D tres veces con la misma persona." })
            ] }),
            currentChat.map((m) => /* @__PURE__ */ jsxs("div", { className: `max-w-[92%] rounded-2xl px-3 py-2 text-[15px] leading-snug break-words ${m.from === "capitan" ? "ml-auto bg-cyan-500 text-black font-semibold rounded-br-sm" : m.from === "crew" ? "bg-[#101f3a] border border-[#1c2f52] rounded-bl-sm" : m.from === "tag" ? "mx-auto bg-amber-400/15 border border-amber-400/50 text-amber-200 font-bold text-center" : "mx-auto bg-slate-800/70 text-slate-300 text-[13px] font-code text-center"}`, children: [
              m.from === "crew" && selected && /* @__PURE__ */ jsxs("span", { className: "block text-[11px] font-bold tracking-widest text-cyan-300", children: [
                selected.name.toUpperCase(),
                " \u2022 ",
                selected.role.toUpperCase()
              ] }),
              m.text
            ] }, m.id)),
            typing && /* @__PURE__ */ jsxs("div", { className: "inline-flex items-center gap-2 rounded-2xl bg-[#101f3a] border border-[#1c2f52] px-3 py-2 text-sm text-slate-300", children: [
              /* @__PURE__ */ jsx("span", { className: "blink", children: "\u25CF" }),
              " escribiendo\u2026"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: quick.map((q) => /* @__PURE__ */ jsx("button", { onClick: () => sendMessage(q), disabled: !selected || status !== "playing" || typing, className: "rounded-full border border-[#2a4370] bg-[#0a1428] px-2.5 py-1 text-[12px] hover:border-cyan-400 hover:text-cyan-200 disabled:opacity-40", children: q }, q)) }),
          /* @__PURE__ */ jsxs("form", { className: "mt-2 flex gap-2", onSubmit: (e) => {
            e.preventDefault();
            sendMessage();
          }, children: [
            /* @__PURE__ */ jsx("input", { ref: inputRef, value: input, onChange: (e) => setInput(e.target.value), disabled: !selected || status !== "playing" || typing, placeholder: selected ? `Pregunta a ${selected.name}\u2026 (Enter para enviar)` : "Elige un tripulante para hablar", className: "min-w-0 flex-1 rounded-xl border border-[#1c2f52] bg-[#050b18] px-3 py-3 text-[15px] placeholder:text-slate-500 disabled:opacity-50" }),
            /* @__PURE__ */ jsx("button", { type: "submit", disabled: !selected || status !== "playing" || typing || !input.trim(), className: "shrink-0 rounded-xl bg-cyan-400 px-4 py-3 font-bold text-black hover:bg-cyan-300 disabled:opacity-40", children: "Enviar \u27A4" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2", children: [
            /* @__PURE__ */ jsxs("button", { onClick: ethicalScan, disabled: !selected || status !== "playing" || !selected.verified === false && false || selected?.verified || selected?.expelled, className: "glow-green w-full rounded-xl bg-emerald-500 px-4 py-3.5 text-left font-bold text-black hover:bg-emerald-400 disabled:opacity-40 disabled:shadow-none", children: [
              "\u{1F6E1}\uFE0F ESCANEO \xC9TICO: SOLO A: ",
              selected ? selected.name : "\u2014",
              /* @__PURE__ */ jsx("span", { className: "block text-[12px] font-normal", children: "Gratis. No quita \xE9tica ni vidas. Solo revisa a quien interrogaste." })
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: abusiveScan, disabled: status !== "playing", className: "glow-red w-full rounded-xl border-2 border-red-500 bg-red-500/10 px-4 py-3 text-left font-bold text-red-200 hover:bg-red-500/20 disabled:opacity-40", children: [
              "\u26A0\uFE0F ESCANEO ABUSIVO: A TODOS ",
              /* @__PURE__ */ jsx("span", { className: "font-code text-[12px] font-normal", children: "(tripulantes.some())" }),
              /* @__PURE__ */ jsx("span", { className: "block text-[12px] font-normal text-red-200/80", children: "R\xE1pido, pero quita 25% de \xE9tica. 4 usos = mot\xEDn." })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[12px] leading-snug text-slate-400", children: "\xC9tico = revisas solo a quien interrogaste, con sospecha. Abusivo = revisas a todos sin permiso, r\xE1pido pero te cuesta \xE9tica." }),
            /* @__PURE__ */ jsx("p", { className: "text-[12px] text-slate-500", children: "Consejo del capit\xE1n: interroga 3 veces sobre \u201Cd\xF3nde estabas\u201D antes de gastar un escaneo." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel rounded-2xl p-3 min-w-0", children: [
          /* @__PURE__ */ jsxs("h2", { className: "font-bold tracking-wide", children: [
            "DEPURADOR COGNITIVO: ",
            /* @__PURE__ */ jsx("span", { className: "font-code text-cyan-300", children: ".some()" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-slate-400 mt-1", children: "No solo TRUE / FALSE. El depurador explica cada paso como un profesor." }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-[11px] font-bold", children: [
              /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-red-500 blink" }),
              " EN VIVO"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "font-code text-[11px] text-slate-400", children: "tripulantes.some(t => t.esImpostor)" })
          ] }),
          /* @__PURE__ */ jsx("div", { ref: logRef, className: "scroll-thin font-code mt-2 h-[420px] sm:h-[470px] overflow-y-auto rounded-xl border border-[#1c2f52] bg-black/60 p-3 text-[12.5px] leading-relaxed", children: logs.map((l) => /* @__PURE__ */ jsx("p", { className: `break-words whitespace-pre-wrap ${l.kind === "call" ? "text-cyan-300" : l.kind === "true" ? "text-red-400 font-bold" : l.kind === "false" ? "text-slate-400" : l.kind === "brain" ? "text-emerald-300" : l.kind === "warn" ? "text-amber-300 font-bold" : l.kind === "skip" ? "text-violet-300" : l.kind === "stats" ? "text-yellow-300" : l.kind === "iter" ? "text-white" : "text-slate-300"}`, children: l.text }, l.id)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border border-yellow-400/40 bg-yellow-400/10 px-3 py-2.5", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[12px] font-bold text-yellow-200", children: "\u{1F4CA} ESTAD\xCDSTICAS DEL \xDALTIMO ESCANEO" }),
            /* @__PURE__ */ jsx("p", { className: "font-code text-[12px] text-yellow-100/90 mt-0.5 break-words", children: scanStats })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2 text-center text-[11px]", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-[#1c2f52] p-2", children: [
              /* @__PURE__ */ jsx("span", { className: "block text-cyan-300 font-bold", children: "LLAMADA" }),
              "cyan"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-[#1c2f52] p-2", children: [
              /* @__PURE__ */ jsx("span", { className: "block text-red-400 font-bold", children: "TRUE" }),
              "rojo"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border border-[#1c2f52] p-2", children: [
              /* @__PURE__ */ jsx("span", { className: "block text-yellow-300 font-bold", children: "SHORT-CIRCUIT" }),
              "amarillo"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-[11px] text-slate-500 leading-snug", children: "FALSE = gris. La explicaci\xF3n inteligente siempre va en verde claro con \u{1F9E0}." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("footer", { className: "mt-3 border-t border-[#1c2f52] pt-2 pb-1 flex flex-wrap gap-x-3 gap-y-1 justify-between text-[11px] text-slate-500", children: [
        /* @__PURE__ */ jsx("span", { children: "PROTOCOLO SOME - NAVE v1 - 6 tripulantes, 1 impostor, .some() paso a paso con short-circuit" }),
        /* @__PURE__ */ jsx("span", { children: "IA casera 100% offline \u2022 Sin API externa" })
      ] })
    ] }),
    status === "lost" && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[520px] rounded-2xl border-2 border-red-500 bg-[#0a0508] p-5 text-center shadow-[0_0_50px_rgba(239,68,68,.35)]", children: [
      /* @__PURE__ */ jsx("p", { className: "text-5xl", children: "\u{1F6A8}" }),
      /* @__PURE__ */ jsx("h2", { className: "mt-2 text-3xl font-bold tracking-wide text-red-400", children: "NAVE COMPROMETIDA" }),
      /* @__PURE__ */ jsx("p", { className: "mt-3 text-[15px] leading-snug text-slate-200", children: loseReason }),
      /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-slate-400", children: "El protocolo se detiene. Tu bit\xE1cora queda guardada." }),
      /* @__PURE__ */ jsx("button", { onClick: restart, className: "mt-4 w-full rounded-xl bg-red-500 px-4 py-3 font-bold text-white hover:bg-red-400", children: "REINICIAR PROTOCOLO \u21BB" })
    ] }) })
  ] });
}
export {
  App as default
};
