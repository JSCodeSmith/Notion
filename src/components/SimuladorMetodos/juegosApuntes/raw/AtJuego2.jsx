/* Convertido automáticamente desde Apuntes/at/juegos.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { Crosshair, Radio, Trophy, RotateCcw, ChevronRight, Target, Shield, Bug, BookOpen, Flame, Volume2 } from "lucide-react";
const HORDE5 = ["Ana", "Luis", "Marta", "Pedro", "Sof\xEDa"];
const LEVELS = [
  { id: 1, title: "El \xDAltimo de la Fila", code: "at(-1)", order: "\xA1Dispara al \xDALTIMO! \xA1El que est\xE1 m\xE1s cerca del refugio!", detail: "El vigilante pide al \xFAltimo. Los negativos cuentan desde el final.", target: 4, horde: HORDE5, concept: "at(-1) devuelve el \xFAltimo. Equivale a arr[arr.length - 1].", success: "\u2705 \xA1Disparo certero! horda.at(-1) devuelve a Sof\xEDa, la \xFAltima de la fila.", fail: (n) => `\u274C Disparaste a ${n}. at(-1) apunta al \xDALTIMO, que es Sof\xEDa (\xEDndice -1). La horda avanza.`, points: 10 },
  { id: 2, title: "El Primero de la Fila", code: "at(0)", order: "\xA1Dispara al PRIMERO! \xA1El que lidera la horda!", detail: "El primero es el que est\xE1 m\xE1s lejos y abre la marcha.", target: 0, horde: HORDE5, concept: "at(0) devuelve el primer elemento. Equivale a arr[0].", success: "\u2705 \xA1Disparo certero! horda.at(0) devuelve a Ana, la primera de la fila.", fail: (n) => `\u274C Disparaste a ${n}. at(0) apunta al PRIMERO, que es Ana (\xEDndice 0). La horda avanza.`, points: 10 },
  { id: 3, title: "El Pen\xFAltimo", code: "at(-2)", order: "\xA1Dispara al PEN\xDALTIMO! \xA1El segundo desde el final!", detail: "Un paso antes del final. No es el \xFAltimo, es el anterior.", target: 3, horde: HORDE5, concept: "at(-2) devuelve el pen\xFAltimo. Equivale a arr[arr.length - 2].", success: "\u2705 \xA1Disparo certero! horda.at(-2) devuelve a Pedro, el pen\xFAltimo de la fila.", fail: (n) => `\u274C Disparaste a ${n}. at(-2) apunta al PEN\xDALTIMO, que es Pedro (\xEDndice -2). La horda avanza.`, points: 10 },
  { id: 4, title: "El Tercero", code: "at(2)", order: "\xA1Dispara al TERCERO! \xA1El que est\xE1 en medio!", detail: "Tercero significa \xEDndice 2, porque el conteo empieza en 0.", target: 2, horde: HORDE5, concept: "at(2) devuelve el tercer elemento. Tercero = \xEDndice 2, no 3.", success: "\u2705 \xA1Disparo certero! horda.at(2) devuelve a Marta, la tercera de la fila.", fail: (n) => `\u274C Disparaste a ${n}. at(2) apunta al TERCERO, que es Marta (\xEDndice 2, no 3). La horda avanza.`, points: 10 },
  { id: 5, title: "El Disparo Perdido", code: "at(10) \u2192 undefined", order: "\xA1Dispara al S\xC9PTIMO! \xA1Posici\xF3n 10!", detail: "La horda qued\xF3 diezmada. Solo quedan 3. El vigilante est\xE1 confundido.", target: null, horde: ["Ana", "Luis", "Marta"], concept: "at(index) devuelve undefined si el \xEDndice est\xE1 fuera de rango. at(10) y at(-10) en un array de 3 \u2192 undefined.", success: "\u2705 \xA1Correcto! horda.at(10) devuelve undefined porque no hay zombie en la posici\xF3n 10. Conservas la munici\xF3n.", fail: (n) => `\u274C Disparaste a ${n}, pero el vigilante pidi\xF3 la posici\xF3n 10. at(10) devuelve undefined. La horda avanza.`, points: 15 }
];
async function callApi(action, args) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(json.error || `Error ${res.status}`);
  return json.data;
}
function App() {
  const [levelIdx, setLevelIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [ammo, setAmmo] = useState(10);
  const [selected, setSelected] = useState(null);
  const [solved, setSolved] = useState([]);
  const [feedback, setFeedback] = useState("El vigilante espera tu disparo. Elige un zombie de la fila y pulsa DISPARAR.");
  const [feedbackKind, setFeedbackKind] = useState("neutral");
  const [fallen, setFallen] = useState(null);
  const [advance, setAdvance] = useState(0);
  const [shake, setShake] = useState(false);
  const [boom, setBoom] = useState(false);
  const [bitacora, setBitacora] = useState(["Partida iniciada. Rex toma posici\xF3n en la azotea."]);
  const [logs, setLogs] = useState([
    { text: '> horda = ["Ana", "Luis", "Marta", "Pedro", "Sof\xEDa"]', kind: "cmd" },
    { text: "[\xCDndices] 0:Ana, 1:Luis, 2:Marta, 3:Pedro, 4:Sof\xEDa / -5, -4, -3, -2, -1", kind: "info" },
    { text: "\u{1F9E0} Depurador: at(-1) cuenta desde el final. at(0) = arr[0]. at(-1) = arr[arr.length - 1].", kind: "debug" },
    { text: "\u2696\uFE0F at() con negativo = desde el final | arr[] con negativo = undefined", kind: "info" }
  ]);
  const [savedScores, setSavedScores] = useState([]);
  const [saveStatus, setSaveStatus] = useState("Cargando marcador\u2026");
  const [runSaved, setRunSaved] = useState(false);
  const runIdRef = useRef(`horda-${Date.now()}-${Math.floor(Math.random() * 1e5)}`);
  const level = LEVELS[levelIdx];
  const isSolved = solved.includes(level.id);
  const gameOver = ammo <= 0 && !solved.includes(5);
  const allSolved = solved.length === 5;
  const negIndices = useMemo(() => level.horde.map((_, i) => i - level.horde.length), [level]);
  async function loadScores() {
    try {
      const data = await callApi("records.list", { collection: "horda_scores", limit: 20 });
      const rows = (data?.records || []).map((r) => r.value).filter((v) => v && typeof v.score === "number");
      rows.sort((a, b) => b.score - a.score);
      setSavedScores(rows.slice(0, 5));
      setSaveStatus(rows.length ? `Mejor marca guardada: ${rows[0].score} pts` : "Sin partidas guardadas todav\xEDa.");
    } catch {
      setSaveStatus("Guardado no disponible ahora. La partida sigue en local.");
    }
  }
  useEffect(() => {
    loadScores();
  }, []);
  async function saveRun(finalScore, finalStreak) {
    if (runSaved) return;
    setSaveStatus("Guardando puntuaci\xF3n\u2026");
    try {
      await callApi("records.create", { collection: "horda_scores", value: { score: finalScore, streak: finalStreak, solved: solved.length, ammo, at: (/* @__PURE__ */ new Date()).toISOString() }, idempotency_key: runIdRef.current });
      setRunSaved(true);
      setSaveStatus("\u2705 Puntuaci\xF3n guardada en el marcador.");
      await loadScores();
    } catch (e) {
      setSaveStatus(`No se pudo guardar: ${e?.message || "error"}. Tu partida sigue en local.`);
    }
  }
  useEffect(() => {
    if (allSolved && !runSaved) {
      saveRun(score, bestStreak);
    }
  }, [allSolved]);
  useEffect(() => {
    if (gameOver && !runSaved && score > 0) {
      saveRun(score, bestStreak);
    }
  }, [gameOver]);
  function pushLog(lines) {
    setLogs((p) => [...p, ...lines].slice(-30));
  }
  function shootZombie() {
    if (selected === null || isSolved || gameOver) return;
    const name = level.horde[selected];
    const code = level.id === 5 ? "horda.at(10)" : "horda.at(" + level.code.replace("at(", "").replace(")", "") + ")";
    if (level.id === 5) {
      setScore((s) => s - 5);
      setStreak(0);
      setAmmo((a) => a - 1);
      setAdvance((a) => a + 1);
      setShake(true);
      setFeedbackKind("bad");
      setFeedback(level.fail(name));
      setBitacora((b) => [`${level.title}: disparo a ${name} \u2192 -5 pts.`, ...b]);
      pushLog([
        { text: `> Ejecutando ${code}`, kind: "cmd" },
        { text: `[\xCDndices] 0:Ana, 1:Luis, 2:Marta / -3, -2, -1`, kind: "info" },
        { text: "\u{1F9E0} Depurador: at(10) fuera de rango \u2192 undefined. arr[10] tambi\xE9n undefined, pero at() permite negativos.", kind: "debug" },
        { text: "> Resultado: undefined", kind: "bad" },
        { text: "\u2696\uFE0F Disparo perdido: pediste una posici\xF3n que no existe.", kind: "bad" }
      ]);
      setTimeout(() => setShake(false), 500);
      setSelected(null);
      return;
    }
    const targetName = level.horde[level.target];
    const hit = selected === level.target;
    setAmmo((a) => a - 1);
    setAdvance((a) => hit ? a : a + 1);
    if (hit) {
      const ns = score + 10;
      const nst = streak + 1;
      setScore(ns);
      setStreak(nst);
      setBestStreak((b) => Math.max(b, nst));
      setSolved((s) => [...s, level.id]);
      setFallen(selected);
      setBoom(true);
      setFeedbackKind("ok");
      setFeedback(level.success);
      setBitacora((b) => [`${level.title}: acierto en ${name} \u2192 +10 pts.`, ...b]);
      pushLog([
        { text: `> Ejecutando horda.at(${level.code.replace("at(", "").replace(")", "")})`, kind: "cmd" },
        { text: `[\xCDndices] 0:Ana, 1:Luis, 2:Marta, 3:Pedro, 4:Sof\xEDa / -5, -4, -3, -2, -1`, kind: "info" },
        { text: "\u{1F9E0} Depurador: at(-1) cuenta desde el final. at(0) = arr[0]. at(-1) = arr[arr.length - 1].", kind: "debug" },
        { text: `> Resultado: ${targetName}`, kind: "ok" },
        { text: "\u2696\uFE0F at() con negativo = desde el final | arr[] con negativo = undefined", kind: "info" }
      ]);
      setTimeout(() => setBoom(false), 600);
    } else {
      setScore((s) => s - 3);
      setStreak(0);
      setShake(true);
      setFeedbackKind("bad");
      setFeedback(level.fail(name));
      setBitacora((b) => [`${level.title}: disparo a ${name} \u2192 -3 pts.`, ...b]);
      pushLog([
        { text: `> Ejecutando horda.at(${level.code.replace("at(", "").replace(")", "")})`, kind: "cmd" },
        { text: `[\xCDndices] 0:Ana, 1:Luis, 2:Marta, 3:Pedro, 4:Sof\xEDa / -5, -4, -3, -2, -1`, kind: "info" },
        { text: "\u{1F9E0} Depurador: at(-1) cuenta desde el final. at(0) = arr[0]. at(-1) = arr[arr.length - 1].", kind: "debug" },
        { text: `> Resultado: ${targetName}`, kind: "ok" },
        { text: `\u2696\uFE0F Apuntaste a ${name}, pero el objetivo era ${targetName}.`, kind: "bad" }
      ]);
      setTimeout(() => setShake(false), 500);
    }
    setSelected(null);
  }
  function noTarget() {
    if (level.id !== 5 || isSolved) return;
    const ns = score + 15;
    const nst = streak + 1;
    setScore(ns);
    setStreak(nst);
    setBestStreak((b) => Math.max(b, nst));
    setSolved((s) => [...s, level.id]);
    setFeedbackKind("ok");
    setFeedback(level.success);
    setBitacora((b) => ["Nivel 5: NO HAY OBJETIVO \u2192 +15 pts. Conservas la munici\xF3n.", ...b]);
    pushLog([
      { text: "> Ejecutando horda.at(10)", kind: "cmd" },
      { text: "[\xCDndices] 0:Ana, 1:Luis, 2:Marta / -3, -2, -1", kind: "info" },
      { text: "\u{1F9E0} Depurador: at(10) fuera de rango \u2192 undefined. arr[10] tambi\xE9n undefined, pero at() permite negativos.", kind: "debug" },
      { text: "> Resultado: undefined", kind: "ok" },
      { text: "\u2696\uFE0F at() con negativo = desde el final | arr[] con negativo = undefined", kind: "info" }
    ]);
  }
  function nextOrder() {
    if (levelIdx < 4) {
      setLevelIdx(levelIdx + 1);
    } else if (allSolved) {
      setFeedback("\u{1F3C6} Refugio a salvo. Has completado los 5 niveles. Pulsa REINICIAR para otra partida.");
    }
    setSelected(null);
    setFallen(null);
    setAdvance(0);
    setFeedbackKind("neutral");
    if (levelIdx < 4) setFeedback("Nueva orden en radio. Elige al zombie correcto.");
  }
  function goLevel(i) {
    setLevelIdx(i);
    setSelected(null);
    setFallen(null);
    setAdvance(0);
    setFeedback("Orden cambiada. Revisa la radio y apunta con calma.");
    setFeedbackKind("neutral");
  }
  function restart() {
    setLevelIdx(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setAmmo(10);
    setSelected(null);
    setSolved([]);
    setFallen(null);
    setAdvance(0);
    setShake(false);
    setFeedback("Partida reiniciada. Rex vuelve a la azotea.");
    setFeedbackKind("neutral");
    runIdRef.current = `horda-${Date.now()}-${Math.floor(Math.random() * 1e5)}`;
    setRunSaved(false);
    setSaveStatus("Nueva partida lista.");
    setBitacora(["Partida reiniciada. Rex toma posici\xF3n en la azotea."]);
  }
  return /* @__PURE__ */ jsxs("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "radial-gradient(900px 420px at 15% 0%, rgba(57,255,20,.14), transparent 55%), radial-gradient(800px 380px at 90% 20%, rgba(255,45,45,.14), transparent 50%), #030508", overflowX: "clip" }, children: [
    /* @__PURE__ */ jsx("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)" }, className: "sticky z-30 border-b border-[#1d3a2a] bg-[#030508]/92 backdrop-blur", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1500px] px-3 sm:px-5 py-3 flex flex-wrap items-center gap-2 sm:gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsx("div", { className: "w-11 h-11 shrink-0 rounded-xl bg-[#39ff14] text-black grid place-items-center text-2xl font-bold shadow-[0_0_28px_#39ff14]", children: "\u{1F9DF}" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(1.15rem,2.4vw,2rem)] leading-none font-bold tracking-wide [overflow-wrap:anywhere]", children: [
            "LA HORDA ZOMBIE ",
            /* @__PURE__ */ jsx("span", { className: "text-[#39ff14]", children: "\u2014 REX FRANCOTIRADOR" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-[12px] sm:text-[13px] text-[#9db8a6] tracking-[.18em] uppercase", children: [
            "Azzotea \xB7 Radio \xB7 M\xE9todo ",
            /* @__PURE__ */ jsx("span", { className: "code text-white", children: ".at()" }),
            " \xB7 Aprende \xEDndices con cada disparo"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ml-auto flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "px-3 py-2 rounded-full bg-[#ff8a00]/15 border border-[#ff8a00]/50 text-[#ffab4a] text-xs sm:text-sm font-bold", children: "\u{1F4FB} EN VIVO" }),
        /* @__PURE__ */ jsxs("span", { className: "px-3 py-2 rounded-full bg-[#39ff14]/10 border border-[#39ff14]/40 text-[#a3ff12] text-xs sm:text-sm font-bold", children: [
          "PUNTOS: ",
          score
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "px-3 py-2 rounded-full bg-white/5 border border-white/15 text-xs sm:text-sm font-bold", children: [
          "\u{1F525} RACHA: ",
          streak
        ] }),
        /* @__PURE__ */ jsxs("span", { className: `px-3 py-2 rounded-full border text-xs sm:text-sm font-bold ${ammo <= 3 ? "bg-[#ff2d2d]/20 border-[#ff2d2d] text-[#ff8a8a]" : "bg-white/5 border-white/15"}`, children: [
          "\u{1F52B} MUNICI\xD3N: ",
          ammo
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[1500px] px-3 sm:px-5 py-4 sm:py-6", children: [
      /* @__PURE__ */ jsxs("div", { className: "layout", children: [
        /* @__PURE__ */ jsxs("aside", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("h2", { className: "panel-title text-[#ffab4a]", children: "\u{1F4FB} NIVELES" }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-[#9db8a6]", children: [
                solved.length,
                "/5"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#cde9d3] mt-2", children: [
              "Eres Rex. El vigilante grita la orden. T\xFA traduces la orden a ",
              /* @__PURE__ */ jsx("span", { className: "code text-[#a3ff12]", children: "at()" }),
              " y disparas."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: LEVELS.map((l, i) => /* @__PURE__ */ jsxs("button", { onClick: () => goLevel(i), className: `level-btn w-full text-left p-3 rounded-xl border ${levelIdx === i ? "active" : "border-white/10 bg-white/[.02]"} flex gap-3 items-start`, children: [
              /* @__PURE__ */ jsx("span", { className: "w-7 h-7 rounded-full bg-black/60 border border-white/15 grid place-items-center text-sm font-bold shrink-0", children: solved.includes(l.id) ? "\u2705" : l.id }),
              /* @__PURE__ */ jsxs("span", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxs("span", { className: "block font-bold leading-tight [overflow-wrap:anywhere]", children: [
                  "Nivel ",
                  l.id,
                  " \xB7 ",
                  l.title
                ] }),
                /* @__PURE__ */ jsx("span", { className: "code text-xs text-[#a3ff12]", children: l.code }),
                /* @__PURE__ */ jsx("span", { className: "block text-xs text-[#9db8a6]", children: l.id === 5 ? "+15 si aciertas" : " +10 si aciertas" })
              ] }),
              /* @__PURE__ */ jsx(ChevronRight, { className: "ml-auto shrink-0 mt-1", size: 16 })
            ] }, l.id)) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-2 text-xs", children: [
              /* @__PURE__ */ jsx("span", { className: "h-2 flex-1 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsx("span", { className: "block h-full bg-[#39ff14]", style: { width: `${solved.length / 5 * 100}%` } }) }),
              /* @__PURE__ */ jsxs("b", { children: [
                Math.round(solved.length / 5 * 100),
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
            /* @__PURE__ */ jsx("h2", { className: "panel-title text-[#a3ff12]", children: "\u2696\uFE0F at() vs arr[]" }),
            /* @__PURE__ */ jsxs("div", { className: "code text-[12px] leading-6 mt-3 space-y-2", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[#39ff14]", children: "horda.at(-1)" }),
                " \u2192 \xFAltimo \u2713"
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[#ff8a8a]", children: "horda[-1]" }),
                " \u2192 undefined \u2717"
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[#39ff14]", children: "horda.at(0)" }),
                " \u2192 primero \u2713"
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                /* @__PURE__ */ jsx("span", { className: "text-[#39ff14]", children: "horda.at(10)" }),
                " \u2192 undefined"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#9db8a6] mt-3", children: [
              "Regla de oro: los negativos cuentan desde el final. ",
              /* @__PURE__ */ jsx("b", { className: "text-white", children: "at(-1)" }),
              " es el \xFAltimo, ",
              /* @__PURE__ */ jsx("b", { className: "text-white", children: "at(0)" }),
              " el primero, ",
              /* @__PURE__ */ jsx("b", { className: "text-white", children: "at(-2)" }),
              " el pen\xFAltimo."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Trophy, { size: 18, className: "text-[#ffc400]" }),
              /* @__PURE__ */ jsx("h2", { className: "panel-title text-[#ffc400]", children: "MARCADOR GUARDADO" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9db8a6] mt-2 [overflow-wrap:anywhere]", children: saveStatus }),
            savedScores.length > 0 && /* @__PURE__ */ jsx("ol", { className: "mt-3 space-y-2", children: savedScores.map((s, i) => /* @__PURE__ */ jsxs("li", { className: "flex justify-between gap-2 text-sm bg-black/30 rounded-lg px-3 py-2 border border-white/10", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "#",
                i + 1,
                " \xB7 ",
                s.solved,
                "/5 niveles"
              ] }),
              /* @__PURE__ */ jsxs("b", { className: "text-[#a3ff12]", children: [
                s.score,
                " pts"
              ] })
            ] }, i)) }),
            /* @__PURE__ */ jsx("p", { className: "text-[11px] text-[#9db8a6] mt-3", children: "Al completar la partida, tu puntuaci\xF3n queda guardada para volver a verla." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "space-y-4 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "panel relative overflow-hidden p-4 sm:p-5", children: [
            /* @__PURE__ */ jsx("div", { className: "scanline" }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 items-start justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs tracking-[.22em] text-[#ff8a8a] font-bold", children: "\u{1F4CD} AZOTEA \xB7 CALLE CERRADA" }),
                /* @__PURE__ */ jsx("h2", { className: "text-[clamp(1.5rem,3vw,2.2rem)] leading-none font-bold mt-1", children: "CALLE \u2014 HORDA" }),
                /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#9db8a6] mt-1", children: [
                  "Nivel ",
                  level.id,
                  " \xB7 ",
                  /* @__PURE__ */ jsx("b", { className: "text-white", children: level.title }),
                  " \xB7 ",
                  /* @__PURE__ */ jsx("span", { className: "code text-[#a3ff12]", children: level.code })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxs("span", { className: "px-3 py-1.5 rounded-full bg-[#ff2d2d]/15 border border-[#ff2d2d]/50 text-xs font-bold flex items-center gap-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "live-dot w-2 h-2 rounded-full bg-[#ff2d2d] inline-block" }),
                  "HORDA AVANZA +",
                  advance
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-bold", children: [
                  "\u{1F3AF} ",
                  level.horde.length,
                  " ZOMBIES"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: `mt-5 rounded-2xl border border-[#1d3a2a] bg-gradient-to-b from-[#0a1a10] to-[#05080a] p-3 sm:p-5 overflow-hidden ${shake ? "shake" : ""}`, children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between text-[11px] tracking-[.2em] text-[#9db8a6]", children: [
                /* @__PURE__ */ jsx("span", { children: "REFUGIO \u25C0" }),
                /* @__PURE__ */ jsx("span", { children: "CALLE" }),
                /* @__PURE__ */ jsx("span", { children: "\u25B6 HORDA" })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-3 flex gap-2 sm:gap-3", style: { transform: `translateX(${advance * 10}px)`, transition: "transform .4s" }, children: level.horde.map((name, i) => {
                const isFallen = fallen === i;
                return /* @__PURE__ */ jsxs("button", { onClick: () => {
                  if (!isSolved && !gameOver) {
                    setSelected(i);
                    setFeedback(`Apuntando a ${name}. Pulsa DISPARAR para confirmar.`);
                    setFeedbackKind("neutral");
                  }
                }, className: `zombie-btn flex-1 min-w-0 rounded-2xl border p-2 sm:p-3 text-center ${selected === i ? "selected border-[#ffc400]" : "border-white/10 bg-[#0b1a12]"} ${isFallen ? "fallen" : ""}`, "aria-label": `Disparar a ${name}, \xEDndice ${i}`, children: [
                  /* @__PURE__ */ jsxs("div", { className: "text-[10px] code text-[#9db8a6]", children: [
                    "[",
                    i,
                    "]"
                  ] }),
                  /* @__PURE__ */ jsx("div", { className: "z-face text-[clamp(2rem,6vw,3.4rem)] leading-none my-1 sm:my-2", children: isFallen ? "\u{1F4A5}" : "\u{1F9DF}" }),
                  /* @__PURE__ */ jsx("div", { className: "font-bold text-[clamp(.9rem,2.2vw,1.25rem)] leading-tight [overflow-wrap:anywhere]", children: name }),
                  /* @__PURE__ */ jsxs("div", { className: "code text-[11px] text-[#9db8a6] mt-1", children: [
                    "+",
                    i,
                    " \xB7 ",
                    negIndices[i]
                  ] }),
                  isFallen && /* @__PURE__ */ jsx("div", { className: "text-[11px] font-bold text-[#9db8a6] mt-1", children: "CA\xCDDO" }),
                  selected === i && !isFallen && /* @__PURE__ */ jsx("div", { className: "text-[11px] font-bold text-[#ffc400] mt-1", children: "\u25C9 EN LA MIRA" })
                ] }, name);
              }) }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 flex justify-between text-xs code text-[#9db8a6]", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  "\xCDndices + : ",
                  level.horde.map((_, i) => i).join("  ")
                ] }),
                /* @__PURE__ */ jsxs("span", { children: [
                  "\xCDndices \u2212 : ",
                  negIndices.join("  ")
                ] })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-2 h-1 bg-white/10 rounded-full overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-[#ff2d2d]", style: { width: `${Math.min(100, advance * 18 + 18)}%` } }) }),
              /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9db8a6] mt-2", children: "La fila avanza a cada fallo. Si aciertas, el zombie cae con \u{1F4A5} y se pone gris." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-2xl bg-[#ff8a00] text-black p-4 flex gap-3", children: [
              /* @__PURE__ */ jsx(Radio, { className: "shrink-0 mt-0.5", size: 28 }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold tracking-[.18em]", children: "\u{1F4FB} VIGILANTE \xB7 RADIO DEL REFUGIO" }),
                /* @__PURE__ */ jsxs("p", { className: "text-[clamp(1.1rem,2.6vw,1.55rem)] font-bold leading-tight [overflow-wrap:anywhere]", children: [
                  "\u201C",
                  level.order,
                  "\u201D"
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-sm font-semibold opacity-80", children: level.detail })
              ] }),
              /* @__PURE__ */ jsx(Volume2, { className: "ml-auto shrink-0 hidden sm:block", size: 22 })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 grid sm:grid-cols-3 gap-2", children: [
              /* @__PURE__ */ jsxs("button", { onClick: shootZombie, disabled: selected === null || isSolved || gameOver, className: "py-3.5 rounded-xl bg-[#39ff14] text-black font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-35 disabled:cursor-not-allowed shadow-[0_0_24px_rgba(57,255,20,.25)]", children: [
                /* @__PURE__ */ jsx(Crosshair, { size: 20 }),
                " \u{1F52B} DISPARAR"
              ] }),
              level.id === 5 && /* @__PURE__ */ jsx("button", { onClick: noTarget, disabled: isSolved || gameOver, className: "py-3.5 rounded-xl bg-[#ff2d2d] text-white font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-40", children: "\u{1F6AB} NO HAY OBJETIVO" }),
              /* @__PURE__ */ jsx("button", { onClick: nextOrder, className: "py-3.5 rounded-xl bg-white text-black font-bold text-lg flex items-center justify-center gap-2", children: "\u27A1\uFE0F SIGUIENTE ORDEN" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-center text-[#9db8a6] mt-2", children: level.id === 5 ? "En el Nivel 5 tambi\xE9n puedes disparar a un zombie, pero perder\xE1s 5 puntos." : "Selecciona un zombie y dispara. Cada disparo consume 1 de munici\xF3n." }),
            /* @__PURE__ */ jsxs("div", { className: `mt-4 rounded-xl border p-4 ${feedbackKind === "ok" ? "bg-[#39ff14]/10 border-[#39ff14]/50" : feedbackKind === "bad" ? "bg-[#ff2d2d]/10 border-[#ff2d2d]/50" : "bg-white/[.03] border-white/10"}`, children: [
              /* @__PURE__ */ jsx("p", { className: "font-bold leading-snug [overflow-wrap:anywhere]", children: feedback }),
              /* @__PURE__ */ jsx("p", { className: "code text-sm mt-2 text-[#a3ff12]", children: level.id === 5 ? "horda.at(10) // \u2192 undefined" : `horda.at(${level.code.replace("at(", "").replace(")", "")}) // \u2192 "${level.id === 5 ? "undefined" : level.target !== null ? level.horde[level.target] : "undefined"}"` }),
              /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#cde9d3] mt-1", children: [
                /* @__PURE__ */ jsx("b", { children: "Concepto:" }),
                " ",
                level.concept
              ] })
            ] }),
            (allSolved || gameOver) && /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-xl bg-[#ffc400] text-black p-4 flex flex-wrap gap-3 items-center justify-between", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "font-bold text-xl", children: allSolved ? "\u{1F3C6} \xA1REFUGIO A SALVO!" : "\u{1F480} SIN MUNICI\xD3N" }),
                /* @__PURE__ */ jsxs("p", { className: "font-semibold", children: [
                  allSolved ? "Completaste los 5 niveles." : "La horda sigue avanzando. Reinicia y vuelve a intentarlo.",
                  " Puntos: ",
                  score,
                  " \xB7 Mejor racha: ",
                  bestStreak
                ] })
              ] }),
              /* @__PURE__ */ jsxs("button", { onClick: restart, className: "bg-black text-white px-4 py-2.5 rounded-lg font-bold flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(RotateCcw, { size: 17 }),
                " REINICIAR"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "panel p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap justify-between gap-2 items-center", children: [
              /* @__PURE__ */ jsx("h3", { className: "panel-title text-[#a3ff12]", children: "\u{1F50D} PANEL at() \u2014 SIEMPRE VISIBLE" }),
              /* @__PURE__ */ jsxs("button", { onClick: restart, className: "text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(RotateCcw, { size: 13 }),
                " REINICIAR PARTIDA"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "code text-[13px] sm:text-sm leading-7 mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("b", { className: "text-[#39ff14]", children: "at(-1)" }),
                " \u2192 \xFAltimo"
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("b", { className: "text-[#39ff14]", children: "at(0)" }),
                " \u2192 primero"
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("b", { className: "text-[#39ff14]", children: "at(-2)" }),
                " \u2192 pen\xFAltimo"
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("b", { className: "text-[#39ff14]", children: "at(2)" }),
                " \u2192 tercero (\xEDndice 2, no 3)"
              ] }),
              /* @__PURE__ */ jsxs("span", { children: [
                /* @__PURE__ */ jsx("b", { className: "text-[#39ff14]", children: "at(10)" }),
                " fuera de rango \u2192 undefined"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[#9db8a6]", children: "Negativos = desde el final" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "panel p-4", children: [
            /* @__PURE__ */ jsxs("h3", { className: "panel-title text-white flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(BookOpen, { size: 17 }),
              " \u{1F4D3} BIT\xC1CORA DE REX"
            ] }),
            /* @__PURE__ */ jsx("ul", { className: "mt-3 space-y-1.5 max-h-[160px] overflow-y-auto scrollbox pr-1", children: bitacora.map((b, i) => /* @__PURE__ */ jsx("li", { className: "text-sm text-[#cde9d3] bg-black/25 rounded-lg px-3 py-2 border border-white/5 [overflow-wrap:anywhere]", children: b }, i)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "panel p-4 lg:sticky lg:top-[84px]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxs("h2", { className: "panel-title text-[#39ff14] flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(Bug, { size: 18 }),
              " DEPURADOR AVANZADO: .at()"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] px-2 py-1 rounded-full bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#a3ff12]", children: "CONSOLA" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 bg-black/70 rounded-xl border border-[#1d3a2a] p-3 min-h-[340px] max-h-[520px] overflow-y-auto scrollbox", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex gap-1.5 mb-3", children: [
              /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-[#ff2d2d]" }),
              /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-[#ffc400]" }),
              /* @__PURE__ */ jsx("span", { className: "w-3 h-3 rounded-full bg-[#39ff14]" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "code text-[12.5px] leading-6 space-y-2", children: logs.map((l, i) => /* @__PURE__ */ jsx("p", { className: `${l.kind === "ok" ? "text-[#39ff14]" : l.kind === "bad" ? "text-[#ff8a8a]" : l.kind === "cmd" ? "text-white" : l.kind === "debug" ? "text-[#ffab4a]" : "text-[#9db8a6]"} [overflow-wrap:anywhere]`, children: l.text }, i)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-3 gap-2 mt-3 text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/[.03] border border-white/10 p-2.5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-[#9db8a6]", children: "PUNTOS" }),
              /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-[#a3ff12]", children: score })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/[.03] border border-white/10 p-2.5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-[#9db8a6]", children: "RACHA" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold flex items-center justify-center gap-1", children: [
                /* @__PURE__ */ jsx(Flame, { size: 16, className: "text-[#ff8a00]" }),
                streak
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/[.03] border border-white/10 p-2.5", children: [
              /* @__PURE__ */ jsx("p", { className: "text-[11px] text-[#9db8a6]", children: "NIVEL" }),
              /* @__PURE__ */ jsxs("p", { className: "text-xl font-bold", children: [
                level.id,
                "/5"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border border-[#ff8a00]/40 bg-[#ff8a00]/10 p-3 flex gap-2", children: [
            /* @__PURE__ */ jsx(Shield, { size: 18, className: "text-[#ffab4a] shrink-0" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm leading-snug", children: [
              /* @__PURE__ */ jsx("b", { children: "Consejo de Rex:" }),
              " Si la orden dice \u201Ctercero\u201D, no pulses el cuarto. Cuenta desde 0."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border border-white/10 bg-black/30 p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs tracking-widest text-[#9db8a6] font-bold", children: "C\xD3MO JUGAR" }),
            /* @__PURE__ */ jsxs("ol", { className: "text-sm mt-2 space-y-1.5 list-decimal pl-4", children: [
              /* @__PURE__ */ jsx("li", { children: "Escucha la orden en la radio." }),
              /* @__PURE__ */ jsx("li", { children: "Toca al zombie de la fila." }),
              /* @__PURE__ */ jsx("li", { children: "Pulsa DISPARAR o, en el Nivel 5, NO HAY OBJETIVO." }),
              /* @__PURE__ */ jsx("li", { children: "Lee el depurador y avanza de nivel." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("footer", { className: "mt-5 text-center text-xs text-[#9db8a6] flex flex-wrap justify-center gap-x-4 gap-y-1", children: [
        /* @__PURE__ */ jsx("span", { children: "\u{1F9DF} LA HORDA ZOMBIE \xB7 at()" }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(Target, { size: 13 }),
          " +10 acierto \xB7 -3 fallo \xB7 -5 disparo perdido \xB7 +15 Nivel 5"
        ] }),
        /* @__PURE__ */ jsx("span", { children: "\u{1F52B} Munici\xF3n limitada \xB7 Cada disparo cuenta" })
      ] })
    ] })
  ] });
}
export {
  App as default
};
