/* Convertido automáticamente desde Apuntes/sort/App.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, Eraser, Flame, Package, Play, RefreshCw, RotateCcw, Shuffle, Trophy } from "lucide-react";
const COLORS = ["#ff4d6d", "#38e8ff", "#3dff8e", "#ffd52e", "#b78bff", "#ff9b2e", "#ff6bd6", "#7dff6a"];
const EMOJIS = ["\u{1F7E5}", "\u{1F7E6}", "\u{1F7E9}", "\u{1F7E8}", "\u{1F7EA}", "\u{1F7E7}", "\u{1F7EB}", "\u2B1B"];
function shuffled(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function makeBoxes(weights) {
  return weights.map((peso, i) => ({ id: i, peso, color: COLORS[i % COLORS.length], emoji: EMOJIS[i % EMOJIS.length] }));
}
function weightNum(b) {
  return Number(b.peso);
}
const LEVELS = [
  { id: "n1", title: "Nivel 1 \xB7 Menor a Mayor", short: "Nivel 1 \xB7 Ascendente", direction: "asc", weights: [50, 10, 30, 20, 40], reward: 10, hint: "Usa a.peso - b.peso." },
  { id: "n2", title: "Nivel 2 \xB7 Mayor a Menor", short: "Nivel 2 \xB7 Descendente", direction: "desc", weights: [15, 45, 5, 35, 25], reward: 10, hint: "Usa b.peso - a.peso." },
  { id: "n3", title: "Nivel 3 \xB7 TRAMPA Strings", short: "Nivel 3 \xB7 Trampa Strings", direction: "asc", weights: ["10", "9", "2", "30", "5"], reward: 10, hint: "Son strings. El comparador num\xE9rico convierte y ordena bien." },
  { id: "ascdesc", title: "Modo Asc vs Desc", short: "Modo Asc vs Desc", direction: "asc", weights: [50, 10, 30, 20, 40], reward: 10, hint: "El objetivo cambia. Lee el orden pedido antes de elegir." },
  { id: "infinito", title: "Modo Infinito", short: "Modo Infinito", direction: "asc", weights: [100, 9, 3, 27, 44, 61, 18, 72], reward: 10, hint: "8 cajas. Ojo con 100, 9 y 3: lexicogr\xE1fico las traiciona." },
  { id: "n19", title: "Nivel 19 \xB7 Encargado", short: "Nivel 19", direction: "asc", weights: [100, 5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 10, 20, 30, 40, 50, 60, 70, 80], reward: 20, hint: "19 cajas. 90 segundos. Menor a mayor." }
];
async function api(action, args) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.error) throw new Error(json?.error || `Error ${res.status}`);
  return json.data;
}
function App() {
  const [levelId, setLevelId] = useState("n1");
  const level = LEVELS.find((l) => l.id === levelId);
  const [ascDescDir, setAscDescDir] = useState("asc");
  const direction = levelId === "ascdesc" ? ascDescDir : level.direction;
  const [boxes, setBoxes] = useState(() => shuffled(makeBoxes(LEVELS[0].weights)));
  const [pool, setPool] = useState(() => shuffled(makeBoxes(LEVELS[0].weights)).map((b) => b.id));
  const [shelf, setShelf] = useState(Array(LEVELS[0].weights.length).fill(null));
  const [comparator, setComparator] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState(/* @__PURE__ */ new Set());
  const [feedback, setFeedback] = useState(null);
  const [logs, setLogs] = useState(["> Consola lista. Arrastra las cajas a la estanter\xEDa y elige un comparador."]);
  const [mutation, setMutation] = useState(null);
  const [bitacora, setBitacora] = useState(["Turno iniciado en el almac\xE9n. El comparador manda."]);
  const [dragId, setDragId] = useState(null);
  const [dropSlot, setDropSlot] = useState(null);
  const [failed, setFailed] = useState(false);
  const [successGlow, setSuccessGlow] = useState(false);
  const [timeLeft, setTimeLeft] = useState(90);
  const [timerRunning, setTimerRunning] = useState(false);
  const [recordId, setRecordId] = useState(null);
  const [saveState, setSaveState] = useState("Progreso: cargando\u2026");
  const [round, setRound] = useState(1);
  const busyRef = useRef(false);
  const byId = useMemo(() => new Map(boxes.map((b) => [b.id, b])), [boxes]);
  const expected = useMemo(() => [...boxes].sort((a, b) => direction === "asc" ? weightNum(a) - weightNum(b) : weightNum(b) - weightNum(a)).map((b) => b.id), [boxes, direction]);
  const expectedWeights = expected.map((id) => String(byId.get(id)?.peso));
  const reloadRecords = async () => {
    try {
      const data = await api("records.list", { collection: "almacen_progreso" });
      const rec = data?.records?.[0];
      if (rec) {
        setRecordId(rec.id);
        const v = rec.value || {};
        if (typeof v.points === "number") setPoints(v.points);
        if (typeof v.streak === "number") setStreak(v.streak);
        if (Array.isArray(v.solved)) setSolved(new Set(v.solved));
        setSaveState("Progreso guardado \u2713");
      } else setSaveState("Sin progreso guardado todav\xEDa");
    } catch {
      setSaveState("Sin conexi\xF3n al guardado: juegas en esta sesi\xF3n");
    }
  };
  useEffect(() => {
    reloadRecords();
  }, []);
  async function saveProgress(nextPoints, nextStreak, nextSolved) {
    const value = { points: nextPoints, streak: nextStreak, solved: [...nextSolved], updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
    try {
      setSaveState("Guardando progreso\u2026");
      if (recordId) {
        await api("records.replace", { collection: "almacen_progreso", id: recordId, value });
      } else {
        const created = await api("records.create", { collection: "almacen_progreso", value, idempotency_key: `almacen-progreso-inicial` });
        if (created?.id) setRecordId(created.id);
      }
      setSaveState("Progreso guardado \u2713");
    } catch (e) {
      setSaveState("No se pudo guardar este turno. Tu partida sigue en pantalla.");
    }
  }
  function startLevel(id, newDir) {
    const def = LEVELS.find((l) => l.id === id);
    const dir = id === "ascdesc" ? newDir || (ascDescDir === "asc" ? "desc" : "asc") : def.direction;
    if (id === "ascdesc" && newDir) setAscDescDir(newDir);
    if (id === "ascdesc" && !newDir) setAscDescDir(dir);
    const fresh = shuffled(makeBoxes(def.weights));
    setLevelId(id);
    setBoxes(fresh);
    setPool(fresh.map((b) => b.id));
    setShelf(Array(def.weights.length).fill(null));
    setComparator(null);
    setCodeInput("");
    setFeedback(null);
    setFailed(false);
    setSuccessGlow(false);
    setRound((r) => r + 1);
    setLogs([`> Nuevo turno: ${def.title}. Objetivo: ${dir === "asc" ? "MENOR a MAYOR" : "MAYOR a MENOR"}.`]);
    setMutation(null);
    setTimeLeft(90);
    setTimerRunning(id === "n19");
    setBitacora((b) => [`Nuevo turno: ${def.title}.`, ...b].slice(0, 12));
  }
  useEffect(() => {
    if (!timerRunning) return;
    if (timeLeft <= 0) {
      setTimerRunning(false);
      setFeedback({ type: "bad", title: "\u23F1 Tiempo agotado en Nivel 19", text: "El turno termin\xF3. Pulsa MEZCLAR o cambia de nivel y vuelve a intentarlo con calma." });
      setBitacora((b) => ["Nivel 19: tiempo agotado.", ...b].slice(0, 12));
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1e3);
    return () => clearTimeout(t);
  }, [timerRunning, timeLeft]);
  function moveToShelf(id) {
    const slot = shelf.findIndex((s) => s === null);
    if (slot === -1) return;
    setShelf((s) => {
      const n = [...s];
      n[slot] = id;
      return n;
    });
    setPool((p) => p.filter((x) => x !== id));
  }
  function returnToPool(id) {
    setShelf((s) => s.map((x) => x === id ? null : x));
    setPool((p) => [...p, id]);
  }
  function moveShelf(id, dir) {
    const idx = shelf.findIndex((x) => x === id);
    const target = idx + dir;
    if (idx < 0 || target < 0 || target >= shelf.length) return;
    setShelf((s) => {
      const n = [...s];
      [n[idx], n[target]] = [n[target], n[idx]];
      return n;
    });
  }
  function onDropSlot(slot) {
    if (dragId === null) return;
    if (pool.includes(dragId)) {
      setShelf((s) => {
        const n = [...s];
        const prev = n[slot];
        n[slot] = dragId;
        return n;
      });
      setPool((p) => {
        let n = p.filter((x) => x !== dragId);
        const occupied = shelf[slot];
        if (occupied !== null && occupied !== dragId) n = [...n, occupied];
        return n;
      });
    } else {
      const from = shelf.findIndex((x) => x === dragId);
      setShelf((s) => {
        const n = [...s];
        [n[from], n[slot]] = [n[slot], n[from]];
        return n;
      });
    }
    setDragId(null);
    setDropSlot(null);
  }
  function shuffleRound() {
    const fresh = shuffled(makeBoxes(level.weights));
    setBoxes(fresh);
    setPool(fresh.map((b) => b.id));
    setShelf(Array(level.weights.length).fill(null));
    setFeedback(null);
    setFailed(false);
    setSuccessGlow(false);
    if (levelId === "ascdesc") {
      const nd = ascDescDir === "asc" ? "desc" : "asc";
      setAscDescDir(nd);
      setLogs([`> Mezclado. Asc vs Desc ahora pide ${nd === "asc" ? "MENOR a MAYOR" : "MAYOR a MENOR"}.`]);
    } else setLogs(["> Mezclado. Las cajas volvieron al suelo desordenadas."]);
    setMutation(null);
    if (levelId === "n19") {
      setTimeLeft(90);
      setTimerRunning(true);
    }
  }
  function runDebugger() {
    const before = boxes.map((b) => String(b.peso));
    const copy = [...boxes];
    const lines = [];
    const comp = direction === "asc" ? (a, b) => weightNum(a) - weightNum(b) : (a, b) => weightNum(b) - weightNum(a);
    lines.push(`> Ejecutando cajas.sort((a,b) => ${direction === "asc" ? "a.peso - b.peso" : "b.peso - a.peso"})`);
    copy.sort((a, b) => {
      const r = comp(a, b);
      lines.push(`[Comparaci\xF3n] a=${a.peso}, b=${b.peso} \u2192 ${direction === "asc" ? `${a.peso}-${b.peso}` : `${b.peso}-${a.peso}`} = ${r > 0 ? "+" : ""}${r} (${r < 0 ? "negativo" : ""}${r > 0 ? "positivo" : ""}${r === 0 ? "cero" : ""}) \u2192 ${r < 0 ? "a antes que b" : r > 0 ? "b antes que a" : "igual, sin cambio"}`);
      return r;
    });
    lines.push("\u{1F9E0} Depurador: Si comparador devuelve <0 \u2192 a antes que b. Si >0 \u2192 b antes que a. Si 0 \u2192 igual.");
    lines.push("\u26A0\uFE0F Si devuelves booleano: a<b \u2192 true=1, false=0. Nunca devuelves negativo, por eso ordena mal.");
    lines.push(`> Resultado: [${copy.map((b) => b.peso).join(",")}] \u2190 MISMO array, MUTADO. Antes era [${before.join(",")}].`);
    lines.push("\u2696\uFE0F Comparaci\xF3n: sort() muta | toSorted() NO muta");
    if (levelId === "n3") {
      lines.push("Sin comparador: [10,9,2] \u2192 convierte a ['10','9','2'] \u2192 compara primer car\xE1cter '1'<'2'<'9' \u2192 ['10','2','9'] \xA1MAL!");
      lines.push("Con comparador num\xE9rico: ['10','9','2','30','5'] \u2192 [2,5,9,10,30] \u2705");
    }
    setLogs(lines);
    setMutation(`Antes: [${before.join(",")}] \u2192 Despu\xE9s: [${copy.map((b) => b.peso).join(",")}] | sort() mut\xF3 el array original en el sitio.`);
    setBitacora((b) => ["Depurador: se ejecut\xF3 el sort paso a paso.", ...b].slice(0, 12));
  }
  async function check() {
    if (shelf.some((s) => s === null)) {
      setFeedback({ type: "info", title: "Faltan cajas en la estanter\xEDa", text: "Coloca todas las cajas en los huecos antes de comprobar. Usa arrastrar o el bot\xF3n \u2193." });
      return;
    }
    if (!comparator) {
      setFeedback({ type: "info", title: "Elige un comparador", text: "El orden solo no basta: el comparador es la herramienta del encargado." });
      return;
    }
    if (busyRef.current) return;
    busyRef.current = true;
    const player = shelf;
    const orderOk = player.every((id, i) => id === expected[i]);
    const correctComparator = direction === "asc" ? comparator === "ab" : comparator === "ba";
    let delta = 0;
    let newStreak = streak;
    let newSolved = new Set(solved);
    let fb;
    const code = codeInput.trim();
    const codeOk = direction === "asc" ? /a\.peso\s*-\s*b\.peso/.test(code) : /b\.peso\s*-\s*a\.peso/.test(code);
    const codeBonus = code && codeOk ? 5 : 0;
    if (comparator === "bool") {
      delta = -5;
      newStreak = 0;
      fb = { type: "bad", title: "\u{1FAA4} Trampa booleana \xB7 \u22125", text: "a.peso < b.peso devuelve true/false. sort() lo convierte a 1/0 y ordena mal. Necesitas a.peso - b.peso que devuelve -40, 0, +40. Eso devuelve true/false, no un n\xFAmero. sort() necesita negativo/0/positivo." };
      setFailed(true);
    } else if (!orderOk) {
      delta = -3;
      newStreak = 0;
      fb = !correctComparator ? { type: "bad", title: "Comparador al rev\xE9s \xB7 \u22123", text: direction === "asc" ? "b.peso - a.peso ordena de MAYOR a MENOR. Te pidieron MENOR a MAYOR." : "a.peso - b.peso ordena de MENOR a MAYOR. Te pidieron MAYOR a MENOR." } : { type: "bad", title: "Orden incorrecto \xB7 \u22123", text: `Tu estanter\xEDa qued\xF3 [${player.map((id) => byId.get(id)?.peso).join(",")}]. El sort real da [${expectedWeights.join(",")}]. Revisa el paso a paso y mueve las cajas.` };
      setFailed(true);
    } else if (!correctComparator) {
      delta = -3;
      newStreak = 0;
      setFailed(true);
      fb = { type: "bad", title: "Orden bien, comparador mal \xB7 \u22123", text: direction === "asc" ? "b.peso - a.peso ordena de MAYOR a MENOR. Te pidieron MENOR a MAYOR." : "a.peso - b.peso ordena de MENOR a MAYOR. Te pidieron MAYOR a MENOR." };
    } else {
      delta = level.reward + codeBonus;
      newStreak = streak + 1;
      newSolved.add(levelId);
      setSuccessGlow(true);
      setFailed(false);
      setTimerRunning(false);
      fb = { type: "ok", title: `\u2705 \xA1Almac\xE9n ordenado! +${delta} puntos`, text: levelId === "n3" ? `Caso sin comparador / strings explicado: sort() sin comparador da ['10','2','30','5','9'] \xA1MAL! Con comparador num\xE9rico \u2192 [2,5,9,10,30] \u2705${codeBonus ? " +5 extra por escribir el c\xF3digo correcto." : ""}` : `Orden y comparador correctos.${codeBonus ? " +5 extra por escribir el c\xF3digo correcto." : ""} Antes cajas = [${boxes.map((b) => b.peso).join(",")}]. Despu\xE9s de sort(), cajas = [${expectedWeights.join(",")}]. \xA1Es el MISMO array, mutado! Si quer\xEDas no mutar, usa toSorted().` };
      if (levelId === "n19") fb.text += " Badge desbloqueado: ENCARGADO NIVEL 19.";
    }
    const nextPoints = Math.max(0, points + delta);
    setPoints(nextPoints);
    setStreak(newStreak);
    setSolved(newSolved);
    setFeedback(fb);
    setBitacora((b) => [`${fb.title} \xB7 ${level.short}`, ...b].slice(0, 12));
    runDebugger();
    await saveProgress(nextPoints, newStreak, newSolved);
    busyRef.current = false;
  }
  function resetRound() {
    setShelf(Array(boxes.length).fill(null));
    setPool(boxes.map((b) => b.id));
    setComparator(null);
    setCodeInput("");
    setFeedback(null);
    setFailed(false);
    setSuccessGlow(false);
    setLogs(["> Turno reiniciado. La estanter\xEDa qued\xF3 vac\xEDa."]);
  }
  const poolBoxes = pool.map((id) => byId.get(id)).filter(Boolean);
  return /* @__PURE__ */ jsx("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "var(--bg)" }, className: "overflow-x-clip", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1500px] px-3 pb-6 sm:px-5", children: [
    /* @__PURE__ */ jsx("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)" }, className: "sticky z-20 -mx-3 mb-4 border-b border-[var(--line)] bg-[#030508]/95 px-3 py-3 backdrop-blur sm:-mx-5 sm:px-5", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "mr-auto min-w-0", children: [
        /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(19px,3vw,34px)] font-bold leading-tight tracking-wide text-[var(--yellow)] [overflow-wrap:anywhere]", children: [
          "\u{1F3ED} ALMAC\xC9N \u201CEL COMPARADOR\u201D ",
          /* @__PURE__ */ jsx("span", { className: "text-white", children: "\xB7 ENCARGADO" })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-[13px] font-semibold tracking-[.16em] text-[var(--muted)]", children: [
          "ORDENA CON ",
          /* @__PURE__ */ jsx("span", { className: "mono text-[var(--cyan)]", children: "sort((a,b) => a.peso - b.peso)" }),
          " \xB7 EL COMPARADOR DEVUELVE UN N\xDAMERO"
        ] })
      ] }),
      /* @__PURE__ */ jsx("span", { className: "chip bg-[#12210f] text-[var(--green)]", children: "\u25CF PROGRESO GUARDADO" }),
      /* @__PURE__ */ jsxs("span", { className: "chip bg-[#2a1e00] text-[var(--yellow)]", children: [
        "\u2B50 PUNTOS: ",
        points
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "chip bg-[#241000] text-[var(--orange)]", children: [
        /* @__PURE__ */ jsx(Flame, { size: 14 }),
        " RACHA: ",
        streak
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "layout", children: [
      /* @__PURE__ */ jsxs("aside", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxs("section", { className: "panel p-3", children: [
          /* @__PURE__ */ jsx("h2", { className: "panel-title mb-3 text-[var(--yellow)]", children: "\u{1F4E6} NIVELES" }),
          /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: LEVELS.map((l) => /* @__PURE__ */ jsxs("button", { className: `level-btn ${levelId === l.id ? "active" : ""}`, onClick: () => startLevel(l.id), "aria-pressed": levelId === l.id, children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center justify-between gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold [overflow-wrap:anywhere]", children: l.short }),
              /* @__PURE__ */ jsx("span", { children: solved.has(l.id) ? "\u2705" : "\u25CB" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "mt-1 block text-[12px] text-[var(--muted)]", children: l.id === "n19" ? "19 cajas \xB7 90 s \xB7 +20" : l.id === "infinito" ? "8 cajas aleatorias \xB7 +10" : `+${l.reward} puntos \xB7 ${l.direction === "asc" ? "Menor a mayor" : "Mayor a menor"}` })
          ] }, l.id)) }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-[12px] text-[var(--muted)] [overflow-wrap:anywhere]", children: saveState })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-3", children: [
          /* @__PURE__ */ jsx("h2", { className: "panel-title mb-2 text-[var(--cyan)]", children: "sort() vs toSorted()" }),
          /* @__PURE__ */ jsxs("p", { className: "mono text-[12px] leading-relaxed text-[#cfe6ff] [overflow-wrap:anywhere]", children: [
            /* @__PURE__ */ jsx("b", { className: "text-[var(--red)]", children: "sort()" }),
            " muta el array original.",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("b", { className: "text-[var(--green)]", children: "toSorted()" }),
            " devuelve una copia nueva y deja el original intacto."
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mono mt-3 rounded bg-black/50 p-2 text-[11px] leading-relaxed [overflow-wrap:anywhere]", children: [
            "cajas.sort(...)",
            /* @__PURE__ */ jsx("br", {}),
            "// cajas YA cambi\xF3",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("br", {}),
            "cajas.toSorted(...)",
            /* @__PURE__ */ jsx("br", {}),
            "// cajas sigue igual"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-3", children: [
          /* @__PURE__ */ jsx("h2", { className: "panel-title mb-2 text-[var(--yellow)]", children: "\u{1F4D3} BIT\xC1CORA" }),
          /* @__PURE__ */ jsx("ul", { className: "flex flex-col gap-2", children: bitacora.map((b, i) => /* @__PURE__ */ jsx("li", { className: "border-l-2 border-[var(--yellow-dim)] pl-2 text-[13px] leading-snug text-[#cbd8ec] [overflow-wrap:anywhere]", children: b }, i)) }),
          /* @__PURE__ */ jsxs("button", { onClick: resetRound, className: "mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-white/5 px-3 py-2 text-sm font-bold", children: [
            /* @__PURE__ */ jsx(RotateCcw, { size: 15 }),
            " REINICIAR TURNO"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("main", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxs("section", { className: "panel p-3 sm:p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "panel-title text-[var(--yellow)]", children: "ALMAC\xC9N DESORDENADO" }),
              /* @__PURE__ */ jsxs("p", { className: "text-[13px] text-[var(--muted)]", children: [
                level.title,
                " \xB7 Ronda ",
                round
              ] })
            ] }),
            levelId === "n19" && /* @__PURE__ */ jsxs("div", { className: `flex items-center gap-2 rounded-lg px-3 py-2 font-bold ${timeLeft <= 15 ? "bg-red-950 text-red-200" : "bg-[#2a1e00] text-[var(--yellow)]"}`, children: [
              /* @__PURE__ */ jsx(Clock, { size: 17 }),
              " ",
              Math.floor(timeLeft / 60),
              ":",
              String(timeLeft % 60).padStart(2, "0"),
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-xs", children: "\xB7 +20" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("h3", { className: "mt-4 text-[clamp(17px,2vw,24px)] font-bold leading-tight", children: [
            "\u{1F3AF} Ordena las cajas de ",
            /* @__PURE__ */ jsx("span", { className: "text-[var(--yellow)]", children: direction === "asc" ? "MENOR a MAYOR" : "MAYOR a MENOR" }),
            " peso"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-[var(--muted)]", children: [
            level.hint,
            " ",
            levelId === "n3" && /* @__PURE__ */ jsx("span", { className: "text-white", children: "sort() sin comparador: ['10','9','2'] \u2192 ['10','2','9']" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h4", { className: "text-sm font-bold tracking-widest text-[var(--cyan)]", children: "\u{1F4E6} CAJAS EN EL SUELO" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-[var(--muted)]", children: "Arrastra o usa \u2193" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-wrap gap-2", children: [
            poolBoxes.length === 0 && /* @__PURE__ */ jsx("p", { className: "w-full rounded-lg bg-green-950/50 p-3 text-center text-sm text-green-200", children: "Todas las cajas est\xE1n en la estanter\xEDa. Revisa el orden y pulsa COMPROBAR." }),
            poolBoxes.map((b, idx) => /* @__PURE__ */ jsxs("div", { draggable: true, onDragStart: () => setDragId(b.id), onDragEnd: () => {
              setDragId(null);
              setDropSlot(null);
            }, className: "box-btn w-[104px] shrink-0", style: { background: `linear-gradient(180deg, ${b.color}33, #0a101d)`, borderColor: b.color }, children: [
              /* @__PURE__ */ jsx("div", { className: "text-2xl", children: b.emoji }),
              /* @__PURE__ */ jsxs("div", { className: "mono text-[12px] text-white", children: [
                "[",
                b.id,
                "]"
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-lg font-bold", children: [
                String(b.peso),
                "kg"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 flex justify-center gap-1", children: /* @__PURE__ */ jsx("button", { "aria-label": `Mover caja ${b.peso} a la estanter\xEDa`, onClick: () => moveToShelf(b.id), className: "rounded bg-[var(--yellow)] px-2 py-1 text-[11px] font-black text-black", children: "\u2193 ESTANTER\xCDA" }) }),
              /* @__PURE__ */ jsxs("div", { className: "mt-1 text-[10px] text-[var(--muted)]", children: [
                "origen #",
                idx
              ] })
            ] }, b.id))
          ] }),
          /* @__PURE__ */ jsxs("h4", { className: "mt-5 text-sm font-bold tracking-widest text-[var(--yellow)]", children: [
            "\u{1F5C4} ESTANTER\xCDA \xB7 ",
            shelf.filter(Boolean).length,
            "/",
            shelf.length,
            " CAJAS"
          ] }),
          /* @__PURE__ */ jsx("div", { className: `mt-2 grid gap-2 ${failed ? "shake" : ""} ${successGlow ? "glow-green" : ""}`, style: { gridTemplateColumns: "repeat(auto-fill,minmax(104px,1fr))" }, children: shelf.map((id, slot) => {
            const b = id !== null ? byId.get(id) : void 0;
            return /* @__PURE__ */ jsxs("div", { onDragOver: (e) => {
              e.preventDefault();
              setDropSlot(slot);
            }, onDragLeave: () => setDropSlot(null), onDrop: (e) => {
              e.preventDefault();
              onDropSlot(slot);
            }, className: `slot ${id !== null ? "filled" : ""} ${dropSlot === slot ? "drop" : ""}`, children: [
              /* @__PURE__ */ jsxs("span", { className: "mono text-[11px] text-[var(--muted)]", children: [
                "HUECO ",
                slot
              ] }),
              b ? /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("div", { className: "text-2xl", children: b.emoji }),
                /* @__PURE__ */ jsxs("div", { className: "text-lg font-bold", children: [
                  String(b.peso),
                  "kg"
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "mt-1 flex gap-1", children: [
                  /* @__PURE__ */ jsx("button", { "aria-label": "Mover a la izquierda", onClick: () => moveShelf(b.id, -1), className: "rounded border border-[var(--line)] px-2 py-1", children: "\u25C0" }),
                  /* @__PURE__ */ jsx("button", { "aria-label": "Mover a la derecha", onClick: () => moveShelf(b.id, 1), className: "rounded border border-[var(--line)] px-2 py-1", children: "\u25B6" }),
                  /* @__PURE__ */ jsx("button", { "aria-label": "Devolver al suelo", onClick: () => returnToPool(b.id), className: "rounded border border-[var(--line)] px-2 py-1", children: "\u25B2" })
                ] })
              ] }) : /* @__PURE__ */ jsx("span", { className: "mt-2 text-2xl opacity-30", children: "\u25A2" })
            ] }, slot);
          }) }),
          /* @__PURE__ */ jsx("h4", { className: "mt-5 text-sm font-bold tracking-widest text-[var(--cyan)]", children: "\u{1F9E9} ELIGE EL COMPARADOR" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-col gap-2", children: [
            /* @__PURE__ */ jsxs("label", { className: `radio-row ${comparator === "ab" ? "selected" : ""}`, children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "comp", checked: comparator === "ab", onChange: () => setComparator("ab") }),
              /* @__PURE__ */ jsxs("span", { className: "mono text-[13px] leading-snug [overflow-wrap:anywhere]", children: [
                "(a,b) => a.peso - b.peso ",
                /* @__PURE__ */ jsx("span", { className: "text-[var(--green)]", children: "\u2190 menor a mayor" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: `radio-row ${comparator === "ba" ? "selected" : ""}`, children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "comp", checked: comparator === "ba", onChange: () => setComparator("ba") }),
              /* @__PURE__ */ jsxs("span", { className: "mono text-[13px] leading-snug [overflow-wrap:anywhere]", children: [
                "(a,b) => b.peso - a.peso ",
                /* @__PURE__ */ jsx("span", { className: "text-[var(--orange)]", children: "\u2190 mayor a menor" })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: `radio-row ${comparator === "bool" ? "selected" : ""}`, children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "comp", checked: comparator === "bool", onChange: () => setComparator("bool") }),
              /* @__PURE__ */ jsxs("span", { className: "mono text-[13px] leading-snug [overflow-wrap:anywhere]", children: [
                "(a,b) => a.peso < b.peso ",
                /* @__PURE__ */ jsx("span", { className: "text-[var(--red)]", children: "\u2190 TRAMPA (booleano)" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "mt-4 block", children: [
            /* @__PURE__ */ jsx("span", { className: "text-sm font-bold", children: "\u270D\uFE0F C\xF3digo opcional \xB7 +5 extra si es correcto" }),
            /* @__PURE__ */ jsx("input", { value: codeInput, onChange: (e) => setCodeInput(e.target.value), placeholder: "Escribe: cajas.sort((a,b) => a.peso - b.peso)", className: "mono mt-1 w-full rounded-lg border border-[var(--line)] bg-black/50 px-3 py-2.5 text-[13px] text-white [overflow-wrap:anywhere]" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxs("button", { onClick: check, className: "flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--green)] px-4 py-3 font-black text-black min-w-[150px]", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { size: 18 }),
              " \u2705 COMPROBAR"
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: shuffleRound, className: "flex items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-white/5 px-4 py-3 font-bold", children: [
              /* @__PURE__ */ jsx(Shuffle, { size: 17 }),
              " \u{1F500} MEZCLAR"
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: runDebugger, className: "flex items-center justify-center gap-2 rounded-lg bg-[var(--yellow)] px-4 py-3 font-black text-black", children: [
              /* @__PURE__ */ jsx(Play, { size: 17 }),
              " \u25B6 VER SORT PASO A PASO"
            ] })
          ] }),
          feedback && /* @__PURE__ */ jsxs("div", { className: `mt-4 rounded-xl border p-3 ${feedback.type === "ok" ? "border-green-500/50 bg-green-950/40" : feedback.type === "bad" ? "border-red-500/50 bg-red-950/40" : "border-[var(--line)] bg-white/5"}`, children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold [overflow-wrap:anywhere]", children: feedback.title }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm leading-relaxed [overflow-wrap:anywhere]", children: feedback.text })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel mt-3 p-3 sm:p-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "panel-title text-[var(--yellow)]", children: "\u{1F50D} PANEL DE MUTACI\xD3N \xB7 SIEMPRE VISIBLE" }),
          /* @__PURE__ */ jsx("p", { className: "mono mt-3 rounded-lg bg-black/60 p-3 text-[13px] leading-relaxed [overflow-wrap:anywhere]", children: mutation || `Antes: [${boxes.map((b) => b.peso).join(",")}] \u2192 Despu\xE9s: pendiente de ejecutar sort()` }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm leading-relaxed text-[#cbd8ec] [overflow-wrap:anywhere]", children: [
            "sort() mut\xF3 el array original en el sitio. La variable ",
            /* @__PURE__ */ jsx("span", { className: "mono", children: "cajas" }),
            " YA cambi\xF3. ",
            /* @__PURE__ */ jsx("span", { className: "mono", children: "toSorted()" }),
            " NO mutar\xEDa."
          ] }),
          levelId === "n3" && /* @__PURE__ */ jsx("p", { className: "mt-2 rounded-lg bg-red-950/40 p-2 text-sm [overflow-wrap:anywhere]", children: "Sin comparador, JS convierte a strings: ['10','9','2'] \u2192 orden lexicogr\xE1fico ['10','2','9'] \xA1MAL! Con comparador num\xE9rico \u2192 [2,9,10] \u2705" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "panel min-w-0 p-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx("h2", { className: "panel-title text-[var(--green)]", children: "\u{1F5A5} DEPURADOR AVANZADO: .sort()" }),
          /* @__PURE__ */ jsxs("button", { onClick: () => setLogs(["> Consola limpia."]), className: "flex items-center gap-1 rounded border border-[var(--line)] px-2 py-1 text-xs font-bold", children: [
            /* @__PURE__ */ jsx(Eraser, { size: 13 }),
            " LIMPIAR"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 max-h-[560px] overflow-y-auto rounded-lg bg-black/70 p-3", children: logs.map((l, i) => /* @__PURE__ */ jsx("p", { className: "log-line mono mb-2 text-[12px] leading-relaxed text-[#bff3ff]", children: l }, i)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2 text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white/5 p-2", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[11px] text-[var(--muted)]", children: "OBJETIVO" }),
            /* @__PURE__ */ jsx("div", { className: "text-sm font-bold", children: direction === "asc" ? "\u2191 MENOR \u2192 MAYOR" : "\u2193 MAYOR \u2192 MENOR" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white/5 p-2", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[11px] text-[var(--muted)]", children: "ESPERADO" }),
            /* @__PURE__ */ jsxs("div", { className: "mono text-[12px] [overflow-wrap:anywhere]", children: [
              "[",
              expectedWeights.join(","),
              "]"
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white/5 p-2", children: [
            /* @__PURE__ */ jsx("div", { className: "text-[11px] text-[var(--muted)]", children: "NIVEL 19" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-1 text-sm font-bold", children: [
              /* @__PURE__ */ jsx(Trophy, { size: 14, className: "text-[var(--yellow)]" }),
              solved.has("n19") ? "ENCARGADO" : "\u2014"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-lg border border-yellow-500/30 bg-yellow-950/20 p-3", children: [
          /* @__PURE__ */ jsxs("p", { className: "flex gap-2 text-sm font-bold text-[var(--yellow)]", children: [
            /* @__PURE__ */ jsx(AlertTriangle, { size: 17, className: "shrink-0" }),
            " REGLA DE ORO"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm leading-relaxed [overflow-wrap:anywhere]", children: [
            "Negativo \u2192 a primero. Cero \u2192 igual. Positivo \u2192 b primero. Nunca devuelvas ",
            /* @__PURE__ */ jsx("span", { className: "mono", children: "true/false" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-[12px] leading-relaxed text-[var(--muted)] [overflow-wrap:anywhere]", children: "Puntuaci\xF3n: orden + comparador +10 \xB7 trampa booleana \u22125 \xB7 orden incorrecto \u22123 \xB7 c\xF3digo correcto +5 \xB7 Nivel 19 +20." })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] pt-3 text-[12px] text-[var(--muted)]", children: [
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(Package, { size: 14 }),
        " Almac\xE9n \u201CEl Comparador\u201D \xB7 Aprende el comparador num\xE9rico, la mutaci\xF3n y el orden lexicogr\xE1fico."
      ] }),
      /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
        /* @__PURE__ */ jsx(RefreshCw, { size: 13 }),
        " Tu progreso (puntos, racha y niveles resueltos) se guarda para volver a jugar."
      ] })
    ] })
  ] }) });
}
export {
  App as default
};
