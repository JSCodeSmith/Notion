/* Convertido automáticamente desde Apuntes/indexOf/App.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronRight, RotateCcw, Play, Trophy, Timer, Sparkles, BookOpen, Save } from "lucide-react";
const EMOJI = { leche: "\u{1F95B}", pan: "\u{1F35E}", huevos: "\u{1F95A}", caf\u00E9: "\u2615", arroz: "\u{1F35A}", az\u00FAcar: "\u{1F36C}", queso: "\u{1F9C0}", manzana: "\u{1F34E}", chocolate: "\u{1F36B}" };
const BASE = ["leche", "pan", "huevos", "leche", "pan", "caf\xE9", "leche"];
const ROUNDS = [
  { id: "r1", label: "Ronda 1 \xB7 Primera \u201Cleche\u201D", target: "leche", list: BASE, mode: "primera", hint: "La primera leche est\xE1 al principio." },
  { id: "r2", label: "Ronda 2 \xB7 Primera \u201Cpan\u201D", target: "pan", list: BASE, mode: "primera", hint: "Pan aparece en 1 y en 4." },
  { id: "r3", label: "Ronda 3 \xB7 Primera \u201Ccaf\xE9\u201D", target: "caf\xE9", list: BASE, mode: "primera", hint: "Caf\xE9 solo aparece una vez." },
  { id: "r4", label: "Ronda 4 \xB7 Primera \u201Carroz\u201D \xB7 Caso -1", target: "arroz", list: BASE, mode: "primera", hint: "Arroz no est\xE1 en esta lista." },
  { id: "r5", label: "Ronda 5 \xB7 Primera \u201Chuevos\u201D", target: "huevos", list: BASE, mode: "primera", hint: "Huevos solo aparece una vez." },
  { id: "r6", label: "Ronda 6 \xB7 Primera \u201Cchocolate\u201D \xB7 Caso -1", target: "chocolate", list: ["leche", "pan", "huevos", "caf\xE9", "arroz", "az\xFAcar", "queso", "manzana"], mode: "primera", hint: "Chocolate no est\xE1 en la lista nueva." }
];
const NIVEL19_LIST = ["leche", "pan", "huevos", "caf\xE9", "arroz", "az\xFAcar", "manzana", "leche", "pan", "huevos", "caf\xE9", "arroz", "az\xFAcar", "manzana", "leche", "queso", "pan", "queso", "caf\xE9"];
const POOL = ["leche", "pan", "huevos", "caf\xE9", "arroz", "az\xFAcar", "queso", "manzana"];
async function apiCall(action, args) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(json.error || "No se pudo conectar con el guardado");
  return json.data;
}
function makeInfinite() {
  const list = Array.from({ length: 15 }, () => POOL[Math.floor(Math.random() * POOL.length)]);
  const present = [...new Set(list)];
  const target = Math.random() < 0.82 ? present[Math.floor(Math.random() * present.length)] : "chocolate";
  return { id: "infinito-" + Date.now(), label: "Modo infinito", target, list, mode: "primera", hint: "Lista nueva de 15 productos." };
}
function versusRound(step) {
  const seq = [
    { target: "leche", mode: "primera" },
    { target: "leche", mode: "ultima" },
    { target: "pan", mode: "primera" },
    { target: "pan", mode: "ultima" },
    { target: "caf\xE9", mode: "primera" },
    { target: "caf\xE9", mode: "ultima" }
  ][step % 6];
  return { id: "versus-" + step, label: `Primera vs \xDAltima \xB7 ${seq.target} \xB7 ${seq.mode}`, target: seq.target, list: BASE, mode: seq.mode, hint: seq.mode === "primera" ? "Busca la primera aparici\xF3n." : "Busca la \xFAltima aparici\xF3n." };
}
function App() {
  const [view, setView] = useState("rondas");
  const [roundIdx, setRoundIdx] = useState(0);
  const [versusStep, setVersusStep] = useState(0);
  const [infiniteRound, setInfiniteRound] = useState(() => makeInfinite());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState(/* @__PURE__ */ new Set());
  const [answer, setAnswer] = useState("");
  const [code, setCode] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [debug, setDebug] = useState([
    "\u{1F6D2} Depurador listo. Pulsa RECORRER o COMPROBAR.",
    "indexOf busca de izquierda a derecha y se detiene en la primera coincidencia exacta."
  ]);
  const [cursor, setCursor] = useState(null);
  const [traversing, setTraversing] = useState(false);
  const [shake, setShake] = useState(false);
  const [glowIdx, setGlowIdx] = useState(null);
  const [log, setLog] = useState(["\u{1F6D2} Bienvenido al Supermercado \u201CEl Primer Producto\u201D. Lee la lista y escribe el \xEDndice."]);
  const [saveStatus, setSaveStatus] = useState("Conectando guardado\u2026");
  const [savedAttempts, setSavedAttempts] = useState([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerOn, setTimerOn] = useState(false);
  const [showAllLog, setShowAllLog] = useState(false);
  const inputRef = useRef(null);
  const traversingRef = useRef(false);
  const current = useMemo(() => {
    if (view === "rondas") return ROUNDS[roundIdx];
    if (view === "versus") return versusRound(versusStep);
    if (view === "infinito") return infiniteRound;
    return { id: "nivel19", label: "Nivel 19 \xB7 Primera \u201Cqueso\u201D", target: "queso", list: NIVEL19_LIST, mode: "primera", hint: "Hay 19 productos. El queso aparece tarde." };
  }, [view, roundIdx, versusStep, infiniteRound]);
  const correct = useMemo(() => current.mode === "primera" ? current.list.indexOf(current.target) : current.list.lastIndexOf(current.target), [current]);
  const method = current.mode === "primera" ? "indexOf" : "lastIndexOf";
  const revealed = `lista.${method}('${current.target}') // \u2192 ${correct}`;
  async function reloadRecords() {
    const data = await apiCall("records.list", { collection: "partidas_compras" });
    const recs = data?.records || [];
    setSavedAttempts(recs.slice(-6).reverse());
    setSaveStatus(`Guardado: ${recs.length} intento(s) en el historial`);
  }
  useEffect(() => {
    reloadRecords().catch(() => setSaveStatus("Guardado no disponible en esta vista previa. Tu partida sigue en pantalla."));
  }, []);
  useEffect(() => {
    setAnswer("");
    setCode("");
    setFeedback(null);
    setCursor(null);
    setGlowIdx(null);
    setTraversing(false);
    traversingRef.current = false;
    if (view === "nivel19") {
      setTimeLeft(60);
      setTimerOn(true);
    } else setTimerOn(false);
    setDebug([`\u{1F3AF} Nueva pregunta: ${current.mode === "primera" ? "PRIMERA" : "\xDALTIMA"} \u201C${current.target}\u201D`, `Lista de ${current.list.length} productos. Recuerda: igualdad exacta ===.`]);
    const t = setTimeout(() => inputRef.current?.focus(), 80);
    return () => clearTimeout(t);
  }, [current.id, view]);
  useEffect(() => {
    if (!timerOn) return;
    const id = setInterval(() => setTimeLeft((s) => {
      if (s <= 1) {
        clearInterval(id);
        setTimerOn(false);
        setFeedback({ type: "bad", text: "\u23F0 Se acab\xF3 el tiempo en Nivel 19. Pulsa Reiniciar o cambia de ronda para intentarlo de nuevo." });
        return 0;
      }
      return s - 1;
    }), 1e3);
    return () => clearInterval(id);
  }, [timerOn, current.id]);
  function pushLog(s) {
    setLog((p) => [s, ...p].slice(0, 30));
  }
  async function saveAttempt(kind, pts, val) {
    const key = `intento-${Date.now()}-${Math.floor(Math.random() * 1e5)}`;
    try {
      await apiCall("records.create", { collection: "partidas_compras", value: { ronda: current.label, objetivo: current.target, metodo: method, respuesta: val, correcta: correct, puntos: pts, resultado: kind, fecha: (/* @__PURE__ */ new Date()).toISOString() }, idempotency_key: key });
      await reloadRecords();
    } catch (e) {
      setSaveStatus("No se pudo guardar este intento. Sigue jugando.");
    }
  }
  function buildDebug(val) {
    const lines = [];
    lines.push(`> Ejecutando lista.${method}('${current.target}')`);
    if (correct === -1) {
      lines.push(`Revis\xF3 [0]\u2026[${current.list.length - 1}], ninguno === '${current.target}' \u2192 devuelve -1.`);
    } else {
      for (let i = 0; i <= correct; i++) lines.push(`[Iteraci\xF3n ${i}] [${i}] '${current.list[i]}' === '${current.target}'? ${current.list[i] === current.target ? "true \u2192 \u2705 \xA1ENCONTRADO! Se detiene aqu\xED." : "false \u2192 sigue."}`);
    }
    lines.push(`\u{1F9E0} Depurador: ${method} usa IGUALDAD EXACTA === de strings. 'Leche' con may\xFAscula NO ser\xEDa igual a 'leche'. Por eso es sensible a may\xFAsculas.`);
    lines.push(`> Resultado: ${correct} \u2190 Es un N\xDAMERO, la posici\xF3n de la ${current.mode === "primera" ? "PRIMERA" : "\xDALTIMA"} aparici\xF3n.`);
    lines.push(`\u2696\uFE0F Comparaci\xF3n: indexOf('${current.target}') \u2192 ${current.list.indexOf(current.target)} (primera) | lastIndexOf('${current.target}') \u2192 ${current.list.lastIndexOf(current.target)} (\xFAltima)`);
    if (val !== correct && val >= 0 && val < current.list.length && current.list[val] === current.target) lines.push(`Revis\xF3 [0] '${current.list[0]}' === '${current.target}' ${current.list[0] === current.target ? "true" : ""}, ya se habr\xEDa detenido en ${correct}. No llega al ${val}.`);
    setDebug(lines);
  }
  function check() {
    if (answer === "" || Number.isNaN(Number(answer))) {
      setFeedback({ type: "info", text: "Escribe un n\xFAmero en el input. Puede ser -1 si el producto no est\xE1." });
      return;
    }
    const val = Number(answer);
    const normalized = code.trim().replace(/\s+/g, "").replace(/"/g, "'").toLowerCase();
    const expectedA = `lista.${method}('${current.target.toLowerCase()}')`;
    const expectedB = `${method}('${current.target.toLowerCase()}')`;
    const codeOk = code.trim() !== "" && (normalized === expectedA || normalized === expectedB);
    let pts = 0;
    let kind = "incorrecto";
    if (val === correct) {
      pts = 10 + (codeOk ? 5 : 0) + (view === "nivel19" ? 20 : 0);
      kind = "acierto";
      setScore((s) => s + pts);
      setStreak((s) => s + 1);
      setSolved((prev) => new Set(prev).add(current.id));
      setGlowIdx(correct >= 0 ? correct : null);
      setFeedback({ type: "ok", text: correct === -1 ? `\u2705 \xA1Correcto! indexOf devuelve -1 porque '${current.target}' no est\xE1 en la lista.${codeOk ? " +5 por el c\xF3digo." : ""}${view === "nivel19" ? " +20 por Nivel 19." : ""}` : `\u2705 \xA1Correcto! ${revealed}.${codeOk ? " +5 por escribir el c\xF3digo." : ""}${view === "nivel19" ? " +20 por Nivel 19." : ""} ${view === "nivel19" ? "\u{1F3C5} Badge: COMPRADOR NIVEL 19" : ""}` });
      setTimerOn(false);
      pushLog(`\u2705 ${current.label} \u2192 ${val} (+${pts})`);
    } else if (val >= 0 && val < current.list.length && current.list[val] === current.target && current.mode === "primera") {
      pts = -5;
      kind = "otra-aparicion";
      setScore((s) => s + pts);
      setStreak(0);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setFeedback({ type: "warn", text: `Ese tambi\xE9n es '${current.target}', pero indexOf devuelve la PRIMERA aparici\xF3n. La respuesta era ${correct}. (-5)` });
      pushLog(`\u26A0\uFE0F ${current.label} \u2192 ${val} (otra aparici\xF3n, -5)`);
    } else {
      pts = -3;
      kind = "incorrecto";
      setScore((s) => s + pts);
      setStreak(0);
      setShake(true);
      setTimeout(() => setShake(false), 500);
      if (correct === -1) setFeedback({ type: "bad", text: `\u274C indexOf devuelve -1 porque '${current.target}' no est\xE1 en la lista. (-3)` });
      else setFeedback({ type: "bad", text: `\u274C Incorrecto. La respuesta era ${correct}. (-3) ${code.trim() !== "" && !codeOk ? "Revisa el c\xF3digo: debe ser " + expectedA : ""}` });
      pushLog(`\u274C ${current.label} \u2192 ${val} (-3)`);
    }
    buildDebug(val);
    saveAttempt(kind, pts, val);
  }
  function traverse() {
    if (traversingRef.current) return;
    traversingRef.current = true;
    setTraversing(true);
    setCursor(0);
    setDebug([`> Ejecutando lista.${method}('${current.target}')`, "\u25B6 Recorriendo desde el inicio \u2192 \u2192 \u2192"]);
    let i = 0;
    const targetIdx = correct === -1 ? current.list.length - 1 : correct;
    const id = setInterval(() => {
      setCursor(i);
      if (i >= targetIdx) {
        clearInterval(id);
        traversingRef.current = false;
        setTraversing(false);
        setCursor(correct >= 0 ? correct : null);
        if (correct >= 0) setGlowIdx(correct);
        buildDebug(answer === "" ? correct : Number(answer));
      }
      i++;
    }, 340);
  }
  function goRound(i) {
    setView("rondas");
    setRoundIdx(i);
  }
  function restart() {
    setScore(0);
    setStreak(0);
    setSolved(/* @__PURE__ */ new Set());
    setLog(["\u{1F504} Partida reiniciada. El historial guardado se conserva."]);
    setAnswer("");
    setCode("");
    setFeedback({ type: "info", text: "Partida reiniciada. Elige una ronda y vuelve a jugar." });
    if (view === "infinito") setInfiniteRound(makeInfinite());
    if (view === "nivel19") {
      setTimeLeft(60);
      setTimerOn(true);
    }
  }
  const leftItems = [
    ...ROUNDS.map((r, i) => ({ key: r.id, label: r.label, onClick: () => goRound(i), done: solved.has(r.id), active: view === "rondas" && roundIdx === i })),
    { key: "versus", label: "\u2694\uFE0F Modo PRIMERA vs \xDALTIMA", onClick: () => {
      setView("versus");
      setVersusStep(0);
    }, done: solved.has("versus-0"), active: view === "versus" },
    { key: "infinito", label: "\u267E\uFE0F Modo INFINITO \xB7 15 productos", onClick: () => {
      setView("infinito");
      setInfiniteRound(makeInfinite());
    }, done: false, active: view === "infinito" },
    { key: "nivel19", label: "\u{1F3C6} Nivel 19 \xB7 Primera \u201Cqueso\u201D \xB7 60s", onClick: () => setView("nivel19"), done: solved.has("nivel19"), active: view === "nivel19" }
  ];
  return /* @__PURE__ */ jsxs("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "var(--bg)" }, className: "overflow-x-clip", children: [
    /* @__PURE__ */ jsx("header", { className: "border-b border-[#1c3a2a] bg-[#030508]", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1500px] px-3 sm:px-5 py-3 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsx("div", { className: "w-11 h-11 rounded-2xl bg-[#0d2a1a] border border-[#2dff8a]/40 grid place-items-center text-2xl floaty", children: "\u{1F6D2}" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("h1", { className: "font-bold leading-tight text-[clamp(0.95rem,4.2vw,1.75rem)] tracking-wide [overflow-wrap:anywhere]", children: [
            "SUPERMERCADO ",
            /* @__PURE__ */ jsx("span", { className: "neon", children: "\u201CEL PRIMER PRODUCTO\u201D" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "hidden md:inline text-[#9db8a8]", children: "\u2014 COMPRADOR" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#9db8a8] text-[12px] sm:text-sm font-semibold tracking-widest", children: "LA LISTA DE COMPRAS \xB7 indexOf CON STRINGS" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ml-auto flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "mono text-[11px] sm:text-xs px-2 py-1 rounded-full border border-[#2dff8a]/40 text-[#a7ffcb]", children: "GUARDADO \u2705" }),
        /* @__PURE__ */ jsxs("span", { className: "px-3 py-1.5 rounded-full bg-[#ffd84d] text-black font-bold text-sm", children: [
          "PUNTOS: ",
          score
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "px-3 py-1.5 rounded-full bg-white text-black font-bold text-sm", children: [
          "\u{1F525} RACHA: ",
          streak
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: restart, className: "btn bg-[#14211a] border border-[#2a4a36] text-white px-3 py-1.5 text-sm flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(RotateCcw, { size: 15 }),
          " Reiniciar"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[1500px] px-3 sm:px-5 py-4 lg:py-5 grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_420px] items-start", children: [
      /* @__PURE__ */ jsxs("aside", { className: "space-y-4 min-w-0", children: [
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold tracking-widest text-lg", children: "\u{1F9FE} LISTAS" }),
            /* @__PURE__ */ jsxs("span", { className: "mono text-xs text-[#9db8a8]", children: [
              solved.size,
              " resueltas"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[#9db8a8] text-sm mt-1", children: "Elige una ronda. La marca \u2705 aparece cuando aciertas." }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: leftItems.map((it) => /* @__PURE__ */ jsxs("button", { onClick: it.onClick, className: `w-full text-left px-3 py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-between gap-2 ${it.active ? "bg-[#2dff8a] text-black border-[#2dff8a]" : "bg-[#071018] border-[#223d2e] hover:border-[#2dff8a]/60"}`, children: [
            /* @__PURE__ */ jsx("span", { className: "[overflow-wrap:anywhere]", children: it.label }),
            /* @__PURE__ */ jsx("span", { children: it.done ? "\u2705" : it.active ? "\u25B6" : /* @__PURE__ */ jsx(ChevronRight, { size: 16 }) })
          ] }, it.key)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-2", children: [
            /* @__PURE__ */ jsx("button", { onClick: () => {
              if (view === "rondas" && roundIdx < 5) setRoundIdx(roundIdx + 1);
              if (view === "versus") setVersusStep((s) => s + 1);
              if (view === "infinito") setInfiniteRound(makeInfinite());
            }, className: "btn flex-1 bg-[#2dff8a] text-black px-3 py-2 text-sm", children: "Siguiente \u25B6" }),
            /* @__PURE__ */ jsx("button", { onClick: () => {
              if (view === "rondas" && roundIdx > 0) setRoundIdx(roundIdx - 1);
            }, className: "btn bg-[#14211a] border border-[#2a4a36] px-3 py-2 text-sm", children: "\u25C0 Anterior" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4 border-[#ffd84d]/30", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-[#ffd84d]", children: "\u{1F4A1} indexOf con strings" }),
          /* @__PURE__ */ jsxs("p", { className: "mono text-[13px] leading-relaxed mt-2 text-[#d8ffe9] [overflow-wrap:anywhere]", children: [
            "lista.indexOf('leche') \u2192 0",
            /* @__PURE__ */ jsx("br", {}),
            "Devuelve un ",
            /* @__PURE__ */ jsx("b", { children: "N\xDAMERO" }),
            ".",
            /* @__PURE__ */ jsx("br", {}),
            "Igualdad exacta ===.",
            /* @__PURE__ */ jsx("br", {}),
            "Primera aparici\xF3n.",
            /* @__PURE__ */ jsx("br", {}),
            "Si no existe \u2192 -1."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 text-xs text-[#9db8a8] leading-relaxed", children: [
            "indexOf \u2260 findIndex (condici\xF3n) \u2260 lastIndexOf (\xFAltima).",
            /* @__PURE__ */ jsx("br", {}),
            "\u201CLeche\u201D \u2260 \u201Cleche\u201D."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(BookOpen, { size: 17, className: "text-[#2dff8a]" }),
            " BIT\xC1CORA"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#9db8a8] mt-1 flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Save, { size: 12 }),
            saveStatus
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-1.5 max-h-[220px] overflow-y-auto scroll-thin pr-1", children: (showAllLog ? log : log.slice(0, 5)).map((l, i) => /* @__PURE__ */ jsx("p", { className: "text-[13px] leading-snug text-[#c9e8d5] [overflow-wrap:anywhere]", children: l }, i)) }),
          log.length > 5 && /* @__PURE__ */ jsx("button", { onClick: () => setShowAllLog((v) => !v), className: "mt-2 text-xs font-bold text-[#2dff8a]", children: showAllLog ? "Ver menos" : "Ver toda la bit\xE1cora" }),
          savedAttempts.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-3 pt-3 border-t border-[#223d2e]", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs font-bold tracking-widest text-[#9db8a8]", children: "HISTORIAL GUARDADO" }),
            savedAttempts.map((a) => /* @__PURE__ */ jsxs("p", { className: "mono text-[11px] mt-1 text-[#9db8a8] [overflow-wrap:anywhere]", children: [
              String(a.value?.ronda || "").slice(0, 28),
              " \xB7 ",
              String(a.value?.respuesta),
              " \xB7 ",
              String(a.value?.puntos),
              " pts"
            ] }, a.id))
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: `panel p-4 sm:p-5 min-w-0 ${shake ? "shake" : ""}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-[clamp(1.25rem,3vw,2rem)] tracking-wide", children: "\u{1F6D2} LISTA DE COMPRAS" }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            view === "nivel19" && /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 bg-[#ff4d6d] text-white px-3 py-1 rounded-full font-bold text-sm", children: [
              /* @__PURE__ */ jsx(Timer, { size: 15 }),
              " ",
              timeLeft,
              "s"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "mono text-xs px-2 py-1 rounded-full bg-[#071018] border border-[#223d2e]", children: [
              current.list.length,
              " productos"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-[#9db8a8] text-sm mt-1", children: "Toca un producto para rellenar el input con su \xEDndice. Esa es solo una ayuda: t\xFA decides la respuesta." }),
        /* @__PURE__ */ jsx("div", { className: "mt-4 grid gap-2", children: current.list.map((p, i) => {
          const repeated = current.list.indexOf(p) !== i;
          const isCursor = cursor === i;
          const isGlow = glowIdx === i;
          return /* @__PURE__ */ jsxs("button", { onClick: () => setAnswer(String(i)), className: `relative text-left flex items-center gap-3 px-3 sm:px-4 py-2.5 rounded-xl border transition ${isGlow ? "glow" : isCursor ? "border-[#ffd84d] bg-[#2a2305]" : "bg-[#071018] border-[#223d2e] hover:border-[#2dff8a]/50"}`, children: [
            /* @__PURE__ */ jsxs("span", { className: "mono text-[#2dff8a] font-bold w-9 shrink-0", children: [
              "[",
              i,
              "]"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-2xl shrink-0", children: EMOJI[p] || "\u{1F6D2}" }),
            /* @__PURE__ */ jsx("span", { className: "font-bold text-lg [overflow-wrap:anywhere]", children: p }),
            repeated && /* @__PURE__ */ jsx("span", { className: "ml-auto text-xs font-bold text-[#ffd84d] shrink-0", children: "\u2190 repetido" }),
            isCursor && /* @__PURE__ */ jsx("span", { className: "absolute -top-2 right-3 bg-[#ffd84d] text-black text-[11px] font-black px-2 py-0.5 rounded-full", children: "\u{1F449} CURSOR" }),
            isGlow && /* @__PURE__ */ jsx("span", { className: "ml-auto text-xl", children: "\u{1F6D2}" })
          ] }, i);
        }) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-2xl bg-[#071018] border border-[#2dff8a]/30 p-4", children: [
          /* @__PURE__ */ jsxs("p", { className: "text-[#ffd84d] font-bold tracking-widest text-xs", children: [
            "\u{1F3AF} PREGUNTA \xB7 ",
            view === "nivel19" ? "NIVEL 19 \xB7 +20" : view === "infinito" ? "MODO INFINITO" : "RONDA"
          ] }),
          /* @__PURE__ */ jsxs("h3", { className: "font-bold text-[clamp(1.35rem,3.4vw,2.2rem)] leading-tight mt-1 [overflow-wrap:anywhere]", children: [
            "\xBFEn qu\xE9 \xCDNDICE aparece por ",
            /* @__PURE__ */ jsx("span", { className: "neon", children: current.mode === "primera" ? "PRIMERA" : "\xDALTIMA" }),
            " vez ",
            /* @__PURE__ */ jsxs("span", { className: "text-[#ffd84d]", children: [
              "\u2018",
              current.target,
              "\u2019"
            ] }),
            "?"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-[#9db8a8] text-sm mt-1", children: [
            "Escribe el n\xFAmero. Si no est\xE1, escribe ",
            /* @__PURE__ */ jsx("b", { className: "text-white", children: "-1" }),
            "."
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
            e.preventDefault();
            check();
          }, className: "mt-4 grid gap-3", children: [
            /* @__PURE__ */ jsx("label", { className: "text-xs font-bold tracking-widest text-[#9db8a8]", htmlFor: "indice", children: "TU RESPUESTA \xB7 \xCDNDICE" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col sm:flex-row gap-2", children: [
              /* @__PURE__ */ jsx("input", { id: "indice", ref: inputRef, type: "number", min: -1, max: 30, value: answer, onChange: (e) => setAnswer(e.target.value), placeholder: "Escribe el \xEDndice o -1", autoFocus: true, className: "mono flex-1 min-w-0 bg-[#030508] border-2 border-[#2dff8a]/50 rounded-xl px-4 py-4 text-2xl sm:text-3xl font-bold text-white outline-none focus:border-[#2dff8a] placeholder:text-[#5d7a68] placeholder:text-base" }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
                setAnswer("-1");
              }, className: "btn bg-[#ffd84d] text-black px-5 py-3 text-lg shrink-0", children: "-1 \xB7 No est\xE1" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxs("button", { type: "submit", className: "btn bg-[#2dff8a] text-black px-5 py-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Check, { size: 18 }),
                " \u2705 COMPROBAR (Enter)"
              ] }),
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: traverse, disabled: traversing, className: "btn bg-[#071018] border border-[#2dff8a] text-[#a7ffcb] px-4 py-3 flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(Play, { size: 16 }),
                " \u25B6 RECORRER DESDE EL INICIO"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("label", { className: "text-xs font-bold tracking-widest text-[#9db8a8]", htmlFor: "codigo", children: "C\xD3DIGO OPCIONAL \xB7 +5 SI ES CORRECTO" }),
              /* @__PURE__ */ jsx("input", { id: "codigo", value: code, onChange: (e) => setCode(e.target.value), placeholder: "Ej: lista.indexOf('leche')", className: "mono mt-1 w-full bg-[#030508] border border-[#223d2e] rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-[#ffd84d] [overflow-wrap:anywhere]" })
            ] })
          ] }),
          feedback && /* @__PURE__ */ jsx("div", { className: `mt-4 rounded-xl px-4 py-3 font-semibold leading-snug ${feedback.type === "ok" ? "bg-[#123a22] border border-[#2dff8a]" : feedback.type === "warn" ? "bg-[#3a2d08] border border-[#ffd84d]" : "bg-[#3a0f1e] border border-[#ff4d6d]"}`, children: feedback.text }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 mono text-[13px] sm:text-sm bg-black/50 border border-[#223d2e] rounded-xl p-3 [overflow-wrap:anywhere]", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#9db8a8]", children: "C\xF3digo revelado al comprobar: " }),
            /* @__PURE__ */ jsx("span", { className: "text-[#a7ffcb]", children: revealed })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2 text-xs font-bold", children: [
            /* @__PURE__ */ jsx("span", { className: "px-2 py-1 rounded-full bg-[#123a22] text-[#a7ffcb]", children: "\u2705 Acierto +10" }),
            /* @__PURE__ */ jsx("span", { className: "px-2 py-1 rounded-full bg-[#3a2d08] text-[#ffd84d]", children: "Otra aparici\xF3n -5" }),
            /* @__PURE__ */ jsx("span", { className: "px-2 py-1 rounded-full bg-[#3a0f1e] text-[#ffb3c2]", children: "Incorrecto -3" }),
            /* @__PURE__ */ jsx("span", { className: "px-2 py-1 rounded-full bg-[#1b2a3a] text-[#bfe0ff]", children: "C\xF3digo +5 \xB7 Nivel 19 +20" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "panel p-4 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold tracking-widest", children: "\u{1F9D1}\u200D\u{1F4BB} DEPURADOR AVANZADO" }),
          /* @__PURE__ */ jsx("span", { className: "text-[#2dff8a]", children: /* @__PURE__ */ jsx(Sparkles, { size: 18 }) })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mono text-sm text-[#a7ffcb] mt-1", children: ".indexOf()" }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 rounded-xl bg-black border border-[#223d2e] p-3 min-h-[280px] max-h-[520px] overflow-y-auto scroll-thin", children: debug.map((l, i) => /* @__PURE__ */ jsx("p", { className: "mono text-[12px] sm:text-[13px] leading-relaxed py-1 border-b border-white/5 text-[#d8ffe9] [overflow-wrap:anywhere]", children: l }, i)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl bg-[#071018] border border-[#223d2e] p-3", children: [
          /* @__PURE__ */ jsxs("p", { className: "font-bold text-sm flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(Trophy, { size: 15, className: "text-[#ffd84d]" }),
            " Comparaci\xF3n siempre visible"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mono text-[12px] mt-2 leading-relaxed [overflow-wrap:anywhere]", children: [
            "indexOf('",
            current.target,
            "') \u2192 ",
            /* @__PURE__ */ jsx("b", { className: "text-[#2dff8a]", children: current.list.indexOf(current.target) }),
            " (primera) | lastIndexOf('",
            current.target,
            "') \u2192 ",
            /* @__PURE__ */ jsx("b", { className: "text-[#ffd84d]", children: current.list.lastIndexOf(current.target) }),
            " (\xFAltima)"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2 text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-[#071018] border border-[#223d2e] p-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-widest text-[#9db8a8]", children: "PUNTOS" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-xl", children: score })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-[#071018] border border-[#223d2e] p-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-widest text-[#9db8a8]", children: "RACHA" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-xl", children: streak })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-[#071018] border border-[#223d2e] p-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-[10px] tracking-widest text-[#9db8a8]", children: "RESPUESTA" }),
            /* @__PURE__ */ jsx("p", { className: "font-bold text-xl text-[#2dff8a]", children: correct })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9db8a8] mt-3 leading-relaxed", children: "El depurador no revela la respuesta antes de recorrer: recorre paso a paso y se detiene en la primera coincidencia exacta." })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "mx-auto max-w-[1500px] px-5 pb-8 text-center text-xs text-[#9db8a8]", children: "\u{1F6D2} Supermercado \u201CEl Primer Producto\u201D \xB7 indexOf devuelve la PRIMERA aparici\xF3n con igualdad exacta === \xB7 Escribe el \xEDndice, no solo lo se\xF1ales." })
  ] });
}
export {
  App as default
};
