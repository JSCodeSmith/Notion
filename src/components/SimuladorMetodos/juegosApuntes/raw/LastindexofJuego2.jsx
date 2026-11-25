/* Convertido automáticamente desde Apuntes/lastIndexOf/juego.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { BookOpen, Check, Clock3, Eraser, Eye, Moon, Play, RotateCcw, Save, Sparkles, Trophy, X } from "lucide-react";
const EMOJI = { sol: "\u2600\uFE0F", luna: "\u{1F319}", estrella: "\u2B50", amor: "\u2764\uFE0F", noche: "\u{1F30C}", mar: "\u{1F30A}", luz: "\u{1F4A1}", sombra: "\u{1F311}" };
const BASE = ["sol", "luna", "sol", "estrella", "sol", "luna"];
const VERSE5 = ["amor", "noche", "amor", "mar", "noche", "amor", "mar"];
const VERSE6 = ["luz", "sombra", "luz", "noche", "sombra", "luz", "noche", "luz"];
const VERSE19 = ["sol", "luna", "estrella", "amor", "noche", "luna", "mar", "luz", "sombra", "amor", "luna", "noche", "sol", "mar", "luz", "sombra", "luna", "estrella", "amor"];
const POOL = ["sol", "luna", "estrella", "amor", "noche", "mar", "luz", "sombra"];
const ROUNDS = [
  { id: 1, verse: BASE, target: "sol", label: "\xDAltima 'sol'" },
  { id: 2, verse: BASE, target: "luna", label: "\xDAltima 'luna'" },
  { id: 3, verse: BASE, target: "estrella", label: "\xDAltima 'estrella'" },
  { id: 4, verse: BASE, target: "mar", label: "Caso -1: 'mar'" },
  { id: 5, verse: VERSE5, target: "amor", label: "\xDAltima 'amor'" },
  { id: 6, verse: VERSE6, target: "sombra", label: "\xDAltima 'sombra'" }
];
function lastIndexOf(verse, target) {
  return verse.lastIndexOf(target);
}
function firstIndexOf(verse, target) {
  return verse.indexOf(target);
}
function randomVerse() {
  const verse = Array.from({ length: 15 }, () => POOL[Math.floor(Math.random() * POOL.length)]);
  const target = verse[Math.floor(Math.random() * verse.length)];
  return { verse, target };
}
function cleanCode(s) {
  return s.toLowerCase().replace(/\s+/g, "").replace(/["']/g, "'").replace(/;$/, "");
}
function App() {
  const [mode, setMode] = useState("rondas");
  const [roundIdx, setRoundIdx] = useState(0);
  const [versusAskFirst, setVersusAskFirst] = useState(true);
  const [infinite, setInfinite] = useState(() => randomVerse());
  const [answer, setAnswer] = useState("");
  const [code, setCode] = useState("");
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState([]);
  const [solvedVersus, setSolvedVersus] = useState([]);
  const [usedTraverse, setUsedTraverse] = useState(false);
  const [traversing, setTraversing] = useState(false);
  const [cursor, setCursor] = useState(null);
  const [logs, setLogs] = useState(["\u2726 El depurador est\xE1 listo. Pulsa RECORRER para ver el recorrido \u2190\u2190\u2190."]);
  const [feedback, setFeedback] = useState(null);
  const [shake, setShake] = useState(false);
  const [bitacora, setBitacora] = useState(["La biblioteca abre. El eco espera la \xFAltima palabra."]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [level19Done, setLevel19Done] = useState(false);
  const [saved, setSaved] = useState([]);
  const [saveMsg, setSaveMsg] = useState("");
  const [loadingScores, setLoadingScores] = useState(true);
  const [saving, setSaving] = useState(false);
  const inputRef = useRef(null);
  const current = useMemo(() => {
    if (mode === "rondas") {
      const r = ROUNDS[roundIdx];
      return { verse: r.verse, target: r.target, askFirst: false, title: `Ronda ${r.id} \xB7 ${r.label}`, codeHint: `verso.lastIndexOf('${r.target}')` };
    }
    if (mode === "versus") return { verse: BASE, target: "sol", askFirst: versusAskFirst, title: versusAskFirst ? "Primera vs \xDAltima \xB7 PRIMERA 'sol'" : "Primera vs \xDAltima \xB7 \xDALTIMA 'sol'", codeHint: versusAskFirst ? "verso.indexOf('sol')" : "verso.lastIndexOf('sol')" };
    if (mode === "infinito") return { verse: infinite.verse, target: infinite.target, askFirst: false, title: "Modo Infinito \xB7 verso de 15 palabras", codeHint: `verso.lastIndexOf('${infinite.target}')` };
    return { verse: VERSE19, target: "luna", askFirst: false, title: "Nivel 19 \xB7 \xDAltima 'luna'", codeHint: "verso.lastIndexOf('luna')" };
  }, [mode, roundIdx, versusAskFirst, infinite]);
  const expected = current.askFirst ? firstIndexOf(current.verse, current.target) : lastIndexOf(current.verse, current.target);
  const opposite = current.askFirst ? lastIndexOf(current.verse, current.target) : firstIndexOf(current.verse, current.target);
  const method = current.askFirst ? "indexOf" : "lastIndexOf";
  const methodWord = current.askFirst ? "PRIMERA" : "\xDALTIMA";
  async function reloadRecords() {
    setLoadingScores(true);
    try {
      const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "records.list", args: { collection: "eco-de-palabras-partidas", limit: 20 } }) });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok || payload.error) throw new Error(payload.error || "No se pudo cargar el marcador.");
      setSaved(payload.data?.records || []);
    } catch {
      setSaved([]);
    } finally {
      setLoadingScores(false);
    }
  }
  useEffect(() => {
    reloadRecords();
  }, []);
  useEffect(() => {
    setAnswer("");
    setCode("");
    setFeedback(null);
    setUsedTraverse(false);
    setCursor(null);
    setShake(false);
    setLogs([`\u2726 ${current.title}. El verso tiene ${current.verse.length} palabras.`]);
    if (mode === "nivel19" && !level19Done) setTimeLeft(60);
    const t = window.setTimeout(() => inputRef.current?.focus(), 80);
    return () => window.clearTimeout(t);
  }, [mode, roundIdx, versusAskFirst, infinite]);
  useEffect(() => {
    if (mode !== "nivel19" || level19Done) return;
    if (timeLeft <= 0) {
      setFeedback({ type: "bad", text: "\u23F0 Se acab\xF3 el tiempo. La \xFAltima 'luna' estaba en el \xEDndice 16." });
      setStreak(0);
      return;
    }
    const id = window.setInterval(() => setTimeLeft((v) => Math.max(0, v - 1)), 1e3);
    return () => window.clearInterval(id);
  }, [mode, timeLeft, level19Done]);
  function pushLog(lines) {
    setLogs((prev) => [...prev, ...lines].slice(-30));
  }
  async function traverse() {
    if (traversing) return;
    setTraversing(true);
    setUsedTraverse(true);
    setFeedback(null);
    pushLog([`> Ejecutando verso.${method}('${current.target}')`]);
    let found = null;
    const order = current.askFirst ? [...current.verse.keys()] : [...current.verse.keys()].reverse();
    for (const i of order) {
      setCursor(i);
      const equal = current.verse[i] === current.target;
      pushLog([`[${i}] '${current.verse[i]}' === '${current.target}'? ${equal} \u2192 ${equal ? "\u2705 coincide" : "sigue"}`]);
      await new Promise((r) => setTimeout(r, 210));
      if (equal) {
        found = i;
        break;
      }
    }
    setTraversing(false);
    setCursor(found);
    if (found !== null) pushLog([`\u2705 \xA1ENCONTRADO! Se detiene aqu\xED.`, `> Resultado: ${found} \u2190 Es un N\xDAMERO.`]);
    else pushLog([`Revis\xF3 [${order.join("], [")}], ninguno === '${current.target}' \u2192 devuelve -1.`, `> Resultado: -1`]);
    pushLog([`\u{1F9E0} Igualdad exacta ===. 'Sol' con may\xFAscula NO ser\xEDa igual a 'sol'.`, `\u2696\uFE0F indexOf('${current.target}') \u2192 ${firstIndexOf(current.verse, current.target)} (primera) | lastIndexOf('${current.target}') \u2192 ${lastIndexOf(current.verse, current.target)} (\xFAltima)`]);
  }
  function nextAfterSolve() {
    if (mode === "rondas" && roundIdx < ROUNDS.length - 1) setRoundIdx(roundIdx + 1);
    else if (mode === "versus") setVersusAskFirst(!versusAskFirst);
    else if (mode === "infinito") setInfinite(randomVerse());
  }
  function check() {
    if (traversing) return;
    const value = answer.trim();
    if (value === "" || Number.isNaN(Number(value))) {
      setFeedback({ type: "info", text: "Escribe un n\xFAmero. Puede ser -1 si la palabra no est\xE1 en el verso." });
      return;
    }
    const n = Number(value);
    const codeOk = code.trim() !== "" && cleanCode(code).includes(`${method}('${current.target}')`);
    if (n === expected) {
      let gain = mode === "nivel19" ? 20 : 10;
      if (codeOk) gain += 5;
      if (usedTraverse) gain += 5;
      setPoints((p) => p + gain);
      setStreak((s) => s + 1);
      if (mode === "rondas" && !solved.includes(ROUNDS[roundIdx].id)) setSolved([...solved, ROUNDS[roundIdx].id]);
      if (mode === "versus") setSolvedVersus([.../* @__PURE__ */ new Set([...solvedVersus, versusAskFirst ? "primera" : "ultima"])]);
      if (mode === "nivel19") setLevel19Done(true);
      setFeedback({ type: "ok", text: `\u2705 \xA1Exacto! verso.${method}('${current.target}') // \u2192 ${expected} \xB7 +${gain} puntos${codeOk ? " (incluye +5 por c\xF3digo)" : ""}${usedTraverse ? " (incluye +5 por recorrer)" : ""}${mode === "nivel19" ? " \xB7 Badge POETA NIVEL 19 desbloqueada." : ""}` });
      setBitacora((prev) => [`\u2705 ${current.title}: ${expected} (+${gain})`, ...prev].slice(0, 8));
      pushLog([`> Resultado confirmado: ${expected}`, `\u{1F389} Eco dorado: la palabra brilla en el verso.`]);
      window.setTimeout(nextAfterSolve, 1150);
    } else {
      const isOpposite = n === opposite && opposite !== expected;
      const loss = isOpposite ? -5 : -3;
      setPoints((p) => Math.max(0, p + loss));
      setStreak(0);
      setShake(true);
      window.setTimeout(() => setShake(false), 500);
      let text = "";
      if (isOpposite) text = current.askFirst ? `Esa es la \xDALTIMA 'sol', pero pedimos la PRIMERA. indexOf devuelve la primera aparici\xF3n. La respuesta era ${expected}. (\u22125)` : `Ese tambi\xE9n es '${current.target}', pero ${method} devuelve la \xDALTIMA aparici\xF3n. La respuesta era ${expected}. (\u22125)`;
      else if (expected === -1) text = `lastIndexOf devuelve -1 porque '${current.target}' no est\xE1 en el verso. (\u22123)`;
      else if (n >= 0 && n < current.verse.length && current.verse[n] === current.target) text = `Ese tambi\xE9n es '${current.target}', pero lastIndexOf devuelve la \xDALTIMA aparici\xF3n. La respuesta era ${expected}. (\u22123)`;
      else text = `Ese \xEDndice no es la ${methodWord.toLowerCase()} '${current.target}'. La respuesta era ${expected}. (\u22123)`;
      setFeedback({ type: "bad", text });
      setBitacora((prev) => [`\u274C ${current.title}: escribi\xF3 ${n}, era ${expected} (${loss})`, ...prev].slice(0, 8));
      if (isOpposite) pushLog([`\u26A0\uFE0F Error t\xEDpico: confundiste la direcci\xF3n.`, `Revis\xF3 desde el final y ya encontr\xF3 la \xFAltima en ${lastIndexOf(current.verse, current.target)}. No llega al ${firstIndexOf(current.verse, current.target)}.`]);
      else pushLog([`\u2716 ${n} no es la respuesta.`, `\u2696\uFE0F indexOf('${current.target}') \u2192 ${firstIndexOf(current.verse, current.target)} | lastIndexOf('${current.target}') \u2192 ${lastIndexOf(current.verse, current.target)}`]);
    }
  }
  async function saveScore() {
    setSaving(true);
    setSaveMsg("");
    const value = { puntos: points, racha: streak, rondas_resueltas: solved, modo: mode, nivel19: level19Done, guardado_en: (/* @__PURE__ */ new Date()).toISOString() };
    try {
      const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action: "records.create", args: { collection: "eco-de-palabras-partidas", value, idempotency_key: `eco-${Date.now()}-${points}-${mode}` } }) });
      const payload = await res.json().catch(() => ({}));
      if (!res.ok || payload.error) throw new Error(payload.error || "No se pudo guardar.");
      setSaveMsg("\u2705 Puntuaci\xF3n guardada.");
      await reloadRecords();
    } catch (e) {
      setSaveMsg(`\u274C ${e instanceof Error ? e.message : "No se pudo guardar."}`);
    } finally {
      setSaving(false);
    }
  }
  function restart() {
    setPoints(0);
    setStreak(0);
    setSolved([]);
    setSolvedVersus([]);
    setLevel19Done(false);
    setMode("rondas");
    setRoundIdx(0);
    setVersusAskFirst(true);
    setInfinite(randomVerse());
    setTimeLeft(60);
    setBitacora(["\u{1F504} La biblioteca vuelve a abrir. Nuevo intento, mismo eco."]);
    setLogs(["\u2726 Partida reiniciada."]);
    setAnswer("");
    setCode("");
  }
  const bestSaved = saved.length ? Math.max(...saved.map((s) => Number(s.value?.puntos || 0))) : 0;
  return /* @__PURE__ */ jsx("div", { "data-safe-area-inset-root": true, className: "min-h-screen w-full overflow-x-clip bg-[#030508] text-[#e8e2d2]", style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)" }, children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1500px] px-3 pb-8 sm:px-5", children: [
    /* @__PURE__ */ jsxs("header", { "data-safe-area-sticky-top": true, className: "sticky z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[rgba(242,201,76,.22)] bg-[#030508]/95 py-3", style: { top: "var(--safe-area-inset-top)" }, children: [
      /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#f2c94c] bg-[#f2c94c]/10 text-2xl", "aria-hidden": true, children: "\u{1F4D6}" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(1.25rem,3vw,2rem)] font-bold leading-none tracking-wide", children: [
            "POETA ",
            /* @__PURE__ */ jsx("span", { className: "text-[#f2c94c]", children: "\xB7 ECO DE PALABRAS" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs uppercase tracking-[.22em] text-[#9aa7bd]", children: "lastIndexOf con strings \xB7 la \xFAltima repetici\xF3n" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "rounded-full border border-[#45e6a3]/40 bg-[#45e6a3]/10 px-3 py-1 text-sm font-bold text-[#45e6a3]", children: "\u{1F319} BIBLIOTECA" }),
        /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-[#f2c94c]/50 bg-[#f2c94c]/10 px-3 py-1 text-sm font-bold", children: [
          "PUNTOS: ",
          /* @__PURE__ */ jsx("span", { className: "text-[#f2c94c]", children: points })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-[#b8d7ff]/40 bg-[#b8d7ff]/10 px-3 py-1 text-sm font-bold", children: [
          "RACHA: ",
          streak,
          " \u{1F525}"
        ] }),
        level19Done && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-[#f2c94c] px-3 py-1 text-sm font-bold text-black", children: "\u{1F3C5} POETA NIVEL 19" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "mt-4 grid items-start gap-4 lg:grid-cols-[300px_minmax(0,1fr)_420px]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold tracking-wide", children: "\u{1F4DC} VERSOS" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-[#9aa7bd]", children: [
              solved.length,
              "/6 rondas"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: ROUNDS.map((r, i) => /* @__PURE__ */ jsxs("button", { onClick: () => {
            setMode("rondas");
            setRoundIdx(i);
          }, className: `flex w-full items-center justify-between rounded-xl border px-3 py-2 text-left ${mode === "rondas" && roundIdx === i ? "border-[#f2c94c] bg-[#f2c94c]/15" : "border-white/10 bg-white/[.02]"}`, children: [
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsxs("strong", { children: [
                "Ronda ",
                r.id
              ] }),
              /* @__PURE__ */ jsx("span", { className: "block text-xs text-[#9aa7bd]", children: r.label })
            ] }),
            /* @__PURE__ */ jsx("span", { children: solved.includes(r.id) ? "\u2705" : "\u25CB" })
          ] }, r.id)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2", children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => setMode("versus"), className: `rounded-xl border px-2 py-2 text-sm font-bold ${mode === "versus" ? "border-[#f2c94c] bg-[#f2c94c]/15" : "border-white/10"}`, children: [
              "\u2696\uFE0F Primera vs \xDAltima ",
              solvedVersus.length === 2 ? "\u2705" : ""
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => {
              setMode("infinito");
              setInfinite(randomVerse());
            }, className: `rounded-xl border px-2 py-2 text-sm font-bold ${mode === "infinito" ? "border-[#f2c94c] bg-[#f2c94c]/15" : "border-white/10"}`, children: "\u267E\uFE0F Infinito" })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => setMode("nivel19"), className: `mt-2 flex w-full items-center justify-between rounded-xl border px-3 py-3 text-left ${mode === "nivel19" ? "border-[#f2c94c] bg-[#f2c94c]/15" : "border-[#f2c94c]/30 bg-[#f2c94c]/[.04]"}`, children: [
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("strong", { children: "\u{1F319} Nivel 19" }),
              /* @__PURE__ */ jsx("span", { className: "block text-xs text-[#9aa7bd]", children: "19 palabras \xB7 60 s \xB7 +20" })
            ] }),
            /* @__PURE__ */ jsx("span", { children: level19Done ? "\u{1F3C5}" : mode === "nivel19" ? /* @__PURE__ */ jsxs("span", { className: "mono flex items-center gap-1 text-[#f2c94c]", children: [
              /* @__PURE__ */ jsx(Clock3, { size: 14 }),
              timeLeft,
              "s"
            ] }) : "\u2192" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-[#f2c94c]", children: "indexOf vs lastIndexOf con strings" }),
          /* @__PURE__ */ jsxs("p", { className: "mono mt-3 text-[13px] leading-relaxed", children: [
            "indexOf('",
            current.target,
            "') \u2192 ",
            firstIndexOf(current.verse, current.target),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-[#9aa7bd]", children: "(primera)" }),
            /* @__PURE__ */ jsx("br", {}),
            "lastIndexOf('",
            current.target,
            "') \u2192 ",
            lastIndexOf(current.verse, current.target),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-[#9aa7bd]", children: "(\xFAltima)" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-sm leading-relaxed text-[#c8d0de]", children: [
            "Misma igualdad exacta ",
            /* @__PURE__ */ jsx("span", { className: "mono text-[#f2c94c]", children: "===" }),
            ". Direcci\xF3n opuesta: ",
            /* @__PURE__ */ jsx("strong", { children: "indexOf" }),
            " busca \u2192\u2192\u2192 desde el inicio; ",
            /* @__PURE__ */ jsx("strong", { children: "lastIndexOf" }),
            " busca \u2190\u2190\u2190 desde el final."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "\u{1FAB6} Bit\xE1cora del poeta" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-2", children: bitacora.map((b, i) => /* @__PURE__ */ jsx("p", { className: "text-sm leading-snug text-[#c8d0de] [overflow-wrap:anywhere]", children: b }, i)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 border-t border-white/10 pt-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-widest text-[#9aa7bd]", children: "Marcador guardado" }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm", children: loadingScores ? "Cargando\u2026" : saved.length ? `Mejor puntuaci\xF3n guardada: ${bestSaved} \xB7 ${saved.length} partidas` : "A\xFAn no hay partidas guardadas." }),
            /* @__PURE__ */ jsxs("button", { onClick: saveScore, disabled: saving, className: "mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-[#f2c94c] px-3 py-2 font-bold text-black", children: [
              /* @__PURE__ */ jsx(Save, { size: 16 }),
              saving ? "Guardando\u2026" : "Guardar puntuaci\xF3n"
            ] }),
            saveMsg && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm [overflow-wrap:anywhere]", children: saveMsg })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: restart, className: "mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/15 px-3 py-2 font-bold", children: [
            /* @__PURE__ */ jsx(RotateCcw, { size: 16 }),
            " Reiniciar partida"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("main", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("section", { className: `panel p-4 sm:p-6 ${shake ? "shake border-[#ff5470]" : ""}`, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs uppercase tracking-[.25em] text-[#9aa7bd]", children: "\u{1F4D6} Verso \xB7 lee con calma" }),
              /* @__PURE__ */ jsx("h2", { className: "mt-1 text-2xl font-bold", children: current.title })
            ] }),
            mode === "nivel19" && !level19Done && /* @__PURE__ */ jsxs("span", { className: "mono flex items-center gap-2 rounded-full border border-[#ff5470]/40 bg-[#ff5470]/10 px-3 py-1 text-sm", children: [
              /* @__PURE__ */ jsx(Clock3, { size: 15 }),
              " ",
              timeLeft,
              "s"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "paper mt-4 rounded-2xl p-3 sm:p-4", children: [
            /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: current.verse.map((w, i) => {
              const isCursor = cursor === i;
              const isFound = feedback?.type === "ok" && i === expected;
              return /* @__PURE__ */ jsxs("button", { onClick: () => {
                setAnswer(String(i));
                inputRef.current?.focus();
              }, title: `Poner ${i} en el input`, className: `min-w-[92px] flex-1 rounded-xl border px-2 py-3 text-center ${isFound ? "gold-glow" : isCursor ? "traverse" : "border-[#e8e2d2]/20 bg-[#030508]/35"}`, children: [
                /* @__PURE__ */ jsxs("span", { className: "mono block text-xs text-[#f2c94c]", children: [
                  "[",
                  i,
                  "]"
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "mt-1 block text-lg font-bold leading-tight [overflow-wrap:anywhere]", children: [
                  w,
                  " ",
                  EMOJI[w]
                ] }),
                isFound && /* @__PURE__ */ jsxs("span", { className: "echo mt-1 block text-xs font-bold text-[#f2c94c]", children: [
                  "\u2190 \xFAltima '",
                  w,
                  "' \u{1F4D6}"
                ] }),
                isCursor && !isFound && /* @__PURE__ */ jsx("span", { className: "block text-xs text-[#b8d7ff]", children: "\u25C0 revisando" })
              ] }, `${i}-${w}`);
            }) }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-center text-xs text-[#9aa7bd]", children: "Toca una palabra para poner su \xEDndice en el input. El input es la respuesta principal." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 text-center", children: [
            /* @__PURE__ */ jsx("p", { className: "text-sm uppercase tracking-[.2em] text-[#f2c94c]", children: "\u{1F3AF} Pregunta" }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-[clamp(1.4rem,3.4vw,2.2rem)] font-bold leading-tight", children: [
              "\xBFEn qu\xE9 \xCDNDICE aparece por ",
              /* @__PURE__ */ jsx("span", { className: "text-[#f2c94c]", children: methodWord }),
              " vez ",
              /* @__PURE__ */ jsxs("span", { className: "text-[#f2c94c]", children: [
                "\u2018",
                current.target,
                "\u2019"
              ] }),
              "?"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
            e.preventDefault();
            check();
          }, className: "mt-5", children: [
            /* @__PURE__ */ jsx("label", { className: "text-sm font-bold", htmlFor: "indice", children: "Tu respuesta \xB7 un n\xFAmero" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-col gap-2 sm:flex-row", children: [
              /* @__PURE__ */ jsx("input", { ref: inputRef, id: "indice", type: "number", value: answer, onChange: (e) => setAnswer(e.target.value), placeholder: "Escribe el \xEDndice o -1", autoFocus: true, className: "mono min-w-0 flex-1 rounded-2xl border-2 border-[#f2c94c]/60 bg-black/50 px-5 py-4 text-center text-3xl font-bold text-[#ffe9a3] outline-none placeholder:text-base placeholder:text-[#9aa7bd] focus:border-[#f2c94c]" }),
              /* @__PURE__ */ jsxs("button", { type: "submit", disabled: traversing, className: "flex items-center justify-center gap-2 rounded-2xl bg-[#f2c94c] px-5 py-4 text-lg font-bold text-black", children: [
                /* @__PURE__ */ jsx(Check, { size: 20 }),
                " COMPROBAR ",
                /* @__PURE__ */ jsx("span", { className: "hidden text-xs font-semibold sm:inline", children: "(Enter)" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: traverse, disabled: traversing, className: "flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#b8d7ff]/50 bg-[#b8d7ff]/10 px-3 py-3 font-bold", children: [
                /* @__PURE__ */ jsx(Play, { size: 17 }),
                " ",
                traversing ? "Recorriendo\u2026" : "RECORRER DESDE EL FINAL (\u2190\u2190\u2190)"
              ] }),
              /* @__PURE__ */ jsx("button", { type: "button", onClick: () => {
                setAnswer("-1");
                inputRef.current?.focus();
              }, className: "rounded-xl border border-[#ff5470]/50 bg-[#ff5470]/10 px-4 py-3 font-bold", children: "\u22121 \xB7 No est\xE1" }),
              /* @__PURE__ */ jsxs("button", { type: "button", onClick: () => {
                setAnswer("");
                setCode("");
                setFeedback(null);
              }, className: "flex items-center gap-2 rounded-xl border border-white/15 px-3 py-3 font-bold", children: [
                /* @__PURE__ */ jsx(Eraser, { size: 16 }),
                " Limpiar"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-2xl border border-white/10 bg-black/30 p-4", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-sm font-bold", htmlFor: "codigo", children: [
              /* @__PURE__ */ jsx(Sparkles, { size: 16, className: "text-[#f2c94c]" }),
              " C\xF3digo opcional \xB7 +5 si es correcto"
            ] }),
            /* @__PURE__ */ jsx("input", { id: "codigo", value: code, onChange: (e) => setCode(e.target.value), placeholder: `Ej: verso.${method}('${current.target}')`, className: "mono mt-2 w-full rounded-xl border border-white/15 bg-[#030508] px-4 py-3 text-sm text-[#b8d7ff] outline-none [overflow-wrap:anywhere]" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-[#9aa7bd]", children: "Pista: el m\xE9todo devuelve un n\xFAmero, no la palabra." })
          ] }),
          feedback && /* @__PURE__ */ jsxs("div", { className: `fade-up mt-4 rounded-2xl border p-4 ${feedback.type === "ok" ? "border-[#45e6a3]/50 bg-[#45e6a3]/10" : feedback.type === "bad" ? "border-[#ff5470]/50 bg-[#ff5470]/10" : "border-[#f2c94c]/40 bg-[#f2c94c]/10"}`, role: "status", children: [
            /* @__PURE__ */ jsx("p", { className: "text-base font-semibold leading-relaxed [overflow-wrap:anywhere]", children: feedback.text }),
            feedback.type === "ok" && /* @__PURE__ */ jsxs("p", { className: "mono mt-2 text-sm", children: [
              "verso.",
              method,
              "('",
              current.target,
              "') // \u2192 ",
              expected
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-[#9aa7bd]", children: [
            /* @__PURE__ */ jsx("span", { children: "\u2705 Acierto +10" }),
            /* @__PURE__ */ jsx("span", { children: "\u26A0\uFE0F Error de direcci\xF3n \u22125" }),
            /* @__PURE__ */ jsx("span", { children: "\u274C Otro error \u22123" }),
            /* @__PURE__ */ jsx("span", { children: "\u{1F9ED} Recorrer + acierto +5" }),
            /* @__PURE__ */ jsx("span", { children: "\u{1F4BB} C\xF3digo +5" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "flex items-center gap-2 font-bold", children: [
            /* @__PURE__ */ jsx(BookOpen, { size: 18, className: "text-[#f2c94c]" }),
            " C\xF3mo lo recuerda el poeta"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm leading-relaxed text-[#c8d0de]", children: [
            "No busques la primera palabra que suena igual. Deja que el eco viaje desde el final: la primera coincidencia que encuentres al retroceder es la ",
            /* @__PURE__ */ jsx("strong", { children: "\xFAltima" }),
            " aparici\xF3n. Si el eco no vuelve, la respuesta es ",
            /* @__PURE__ */ jsx("strong", { children: "\u22121" }),
            "."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("section", { className: "panel overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-white/10 px-4 py-3", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold", children: "\u{1F5A5}\uFE0F DEPURADOR AVANZADO" }),
            /* @__PURE__ */ jsx("span", { className: "mono text-xs text-[#45e6a3]", children: ".lastIndexOf()" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "scroll-thin max-h-[560px] overflow-y-auto bg-black/60 p-4 lg:max-h-[680px]", children: [
            /* @__PURE__ */ jsx("div", { className: "space-y-2", children: logs.map((l, i) => /* @__PURE__ */ jsx("p", { className: "mono text-[12.5px] leading-relaxed text-[#d7e2f2] [overflow-wrap:anywhere]", children: l }, i)) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 border-t border-[#f2c94c]/25 pt-3", children: [
              /* @__PURE__ */ jsx("p", { className: "mono text-[12.5px] leading-relaxed text-[#ffe9a3]", children: "\u{1F9E0} Depurador: lastIndexOf usa IGUALDAD EXACTA === de strings. 'Sol' con may\xFAscula NO ser\xEDa igual a 'sol'. Por eso es sensible a may\xFAsculas." }),
              /* @__PURE__ */ jsxs("p", { className: "mono mt-2 text-[12.5px] leading-relaxed text-[#b8d7ff]", children: [
                "> Resultado: ",
                expected,
                " \u2190 Es un N\xDAMERO, la posici\xF3n de la \xDALTIMA aparici\xF3n."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-t border-white/10 px-4 py-3 text-xs text-[#9aa7bd]", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Eye, { size: 13 }),
              " Recorrido \u2190\u2190\u2190"
            ] }),
            /* @__PURE__ */ jsx("span", { children: "Igualdad ===" }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(Moon, { size: 13 }),
              " Eco activo"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "flex items-center gap-2 font-bold", children: [
            /* @__PURE__ */ jsx(Trophy, { size: 18, className: "text-[#f2c94c]" }),
            " Partidas guardadas"
          ] }),
          loadingScores ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[#9aa7bd]", children: "Cargando marcador\u2026" }) : saved.length === 0 ? /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[#9aa7bd]", children: "Guarda tu puntuaci\xF3n para verla aqu\xED." }) : /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: saved.slice(0, 4).map((s) => /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between rounded-xl border border-white/10 px-3 py-2 text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "capitalize", children: String(s.value?.modo || "rondas") }),
            /* @__PURE__ */ jsxs("strong", { className: "text-[#f2c94c]", children: [
              Number(s.value?.puntos || 0),
              " pts"
            ] })
          ] }, s.id)) }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 flex items-start gap-1 text-xs leading-relaxed text-[#9aa7bd]", children: [
            /* @__PURE__ */ jsx(X, { size: 13, className: "mt-0.5 shrink-0" }),
            " La puntuaci\xF3n solo se guarda cuando pulsas \u201CGuardar puntuaci\xF3n\u201D."
          ] })
        ] })
      ] })
    ] })
  ] }) });
}
export {
  App as default
};
