/* Convertido automáticamente desde Apuntes/toSorted/juego.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
const RELICS = [
  { id: "escudo", emoji: "\u{1F6E1}", name: "Escudo de Roble", poder: 10 },
  { id: "arco", emoji: "\u{1F3F9}", name: "Arco \xC9lfico", poder: 20 },
  { id: "daga", emoji: "\u{1F5E1}", name: "Daga del Alba", poder: 30 },
  { id: "espada", emoji: "\u2694", name: "Espada R\xFAnica", poder: 40 },
  { id: "orbe", emoji: "\u{1F52E}", name: "Orbe de Fuego", poder: 50 }
];
const SPELLS = [
  { id: "rayo", emoji: "\u26A1", name: "Rayo", mana: 80 },
  { id: "ventisca", emoji: "\u2744", name: "Ventisca", mana: 60 },
  { id: "vampirico", emoji: "\u{1F480}", name: "Toque Vamp\xEDrico", mana: 50 },
  { id: "fuego", emoji: "\u{1F525}", name: "Bola de Fuego", mana: 40 },
  { id: "torbellino", emoji: "\u{1F32A}", name: "Torbellino", mana: 20 }
];
const HEROES = [
  { nombre: "Kael", emoji: "\u{1F409}", poder: "100\u2694" },
  { nombre: "Lyra", emoji: "\u{1F9DD}", poder: "80\u2694" },
  { nombre: "Mordo", emoji: "\u{1F9D9}", poder: "100\u2694" },
  { nombre: "Sylas", emoji: "\u{1F3F9}", poder: "60\u2694" },
  { nombre: "Bren", emoji: "\u{1F6E1}", poder: "80\u2694" }
];
const ORACLE_ROUNDS = [
  { arr: [3, 1, 2], op: "sort" },
  { arr: [5, 2, 8], op: "toSorted" },
  { arr: [10, 9, 2], op: "sort" },
  { arr: [4, 1, 3], op: "toSorted" }
];
const SEAL_ROUNDS = [
  { arr: [10, 9, 2, 100, 5] },
  { arr: [7, 3, 9, 1] },
  { arr: [20, 4, 15, 8, 2] }
];
const LEVELS = [
  { n: 1, title: "Reliquias", sub: "Clic", icon: "\u{1F5E1}" },
  { n: 2, title: "Hechizos", sub: "Arrastrar", icon: "\u{1F525}" },
  { n: 3, title: "Predicci\xF3n", sub: "Or\xE1culo", icon: "\u{1F52E}" },
  { n: 4, title: "Comparador", sub: "Perdido \xB7 Escribir", icon: "\u2328\uFE0F" },
  { n: 5, title: "Sello", sub: "Test Final", icon: "\u{1F3F0}" }
];
const fmt = (a) => `[${a.join(", ")}]`;
async function api(action, args) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const j = await res.json().catch(() => ({}));
  if (!res.ok || j.error) throw new Error(j.error || `Error ${res.status}`);
  return j.data;
}
function App() {
  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState([]);
  const [logs, setLogs] = useState([
    { text: "> Grimorio abierto. Kael, el original siempre queda intacto.", kind: "info" },
    { text: "> \u2696\uFE0F sort() muta | toSorted() NO muta", kind: "code" }
  ]);
  const [feedback, setFeedback] = useState(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [glowKey, setGlowKey] = useState(0);
  const [recordId, setRecordId] = useState(null);
  const [saveState, setSaveState] = useState("idle");
  const [saveMsg, setSaveMsg] = useState("");
  const [l1Pick, setL1Pick] = useState([]);
  const [l2New, setL2New] = useState([]);
  const [dragId, setDragId] = useState(null);
  const [dragOver, setDragOver] = useState(null);
  const [oRound, setORound] = useState(0);
  const [oPick, setOPick] = useState(null);
  const [oRevealed, setORevealed] = useState(false);
  const [oStreak, setOStreak] = useState(0);
  const [oDone, setODone] = useState(false);
  const [l4Code, setL4Code] = useState("(a,b) => ");
  const [l4Help, setL4Help] = useState(false);
  const [l4Attempts, setL4Attempts] = useState(0);
  const [l4Result, setL4Result] = useState(null);
  const [sRound, setSRound] = useState(0);
  const [sChoice, setSChoice] = useState(null);
  const [sRevealed, setSRevealed] = useState(false);
  const [sMutated, setSMutated] = useState(false);
  const pointsRef = useRef(points);
  const solvedRef = useRef(solved);
  const streakRef = useRef(streak);
  pointsRef.current = points;
  solvedRef.current = solved;
  streakRef.current = streak;
  const savingRef = useRef(false);
  const pushLog = (text, kind = "info") => setLogs((p) => [...p.slice(-28), { text, kind }]);
  const persist = async (pts = pointsRef.current, slv = solvedRef.current, stk = streakRef.current) => {
    if (savingRef.current) return;
    savingRef.current = true;
    setSaveState("saving");
    try {
      const value = { points: pts, solved: slv, streak: stk, level, updated: (/* @__PURE__ */ new Date()).toISOString() };
      if (recordId) await api("records.replace", { collection: "grimorio_progreso", id: recordId, value });
      else {
        const rec = await api("records.create", { collection: "grimorio_progreso", value, idempotency_key: `grimorio-${Date.now()}` });
        if (rec?.id) setRecordId(rec.id);
      }
      setSaveState("saved");
      setSaveMsg("Progreso guardado");
    } catch (e) {
      setSaveState("offline");
      setSaveMsg("Sin conexi\xF3n: tu partida sigue en pantalla");
    } finally {
      savingRef.current = false;
    }
  };
  useEffect(() => {
    (async () => {
      try {
        const data = await api("records.list", { collection: "grimorio_progreso" });
        const rec = data?.records?.[0];
        if (rec?.value) {
          setRecordId(rec.id);
          setPoints(rec.value.points || 0);
          setSolved(rec.value.solved || []);
          setStreak(rec.value.streak || 0);
          setSaveState("saved");
          setSaveMsg("Partida recuperada");
        }
      } catch {
        setSaveState("offline");
        setSaveMsg("Sin conexi\xF3n: juega sin guardar");
      }
    })();
  }, []);
  const addPoints = (delta, reason) => {
    const np = Math.max(0, points + delta);
    const ns = delta > 0 ? streak + 1 : 0;
    const nextSolved = solved;
    setPoints(np);
    setStreak(ns);
    pointsRef.current = np;
    streakRef.current = ns;
    solvedRef.current = nextSolved;
    pushLog(`${delta > 0 ? "+" : ""}${delta} puntos \u2014 ${reason}`, delta > 0 ? "ok" : "bad");
    persist(np, nextSolved, ns);
    return { np, ns };
  };
  const markSolved = (n) => {
    if (solved.includes(n)) return;
    const next = [...solved, n];
    setSolved(next);
    solvedRef.current = next;
    persist(pointsRef.current, next, streakRef.current);
  };
  const fail = (text) => {
    setFeedback({ text, ok: false });
    setShakeKey((k) => k + 1);
  };
  const win = (text) => {
    setFeedback({ text, ok: true });
    setGlowKey((k) => k + 1);
  };
  const l1Sorted = useMemo(() => [...RELICS].sort((a, b) => a.poder - b.poder), []);
  const checkL1 = () => {
    const picked = l1Pick.map((id) => RELICS.find((r) => r.id === id));
    const expected = l1Sorted.map((r) => r.id);
    pushLog("> Ejecutando reliquias.toSorted((a,b)=>a.poder-b.poder)", "code");
    pushLog("> Original antes: [30, 10, 50, 20, 40] \xB7 poderes", "info");
    if (l1Pick.length < 5) {
      addPoints(-3, "copia incompleta");
      fail("\u274C Copia incompleta. Coloca las 5 reliquias en la copia ordenada.");
      return;
    }
    const wrongIdx = picked.findIndex((r, i) => r.id !== expected[i]);
    if (wrongIdx === -1) {
      pushLog("> Copia creada: Escudo \u2192 Arco \u2192 Daga \u2192 Espada \u2192 Orbe", "ok");
      pushLog("> Original despu\xE9s INTACTO \xB7 \u2696\uFE0F sort() muta | toSorted() NO muta", "ok");
      addPoints(10, "Nivel 1 ordenado");
      markSolved(1);
      win("\u2705 La copia est\xE1 ordenada y el grimorio original sigue intacto. toSorted no muta.");
    } else {
      const bad = picked[wrongIdx];
      const good = l1Sorted[wrongIdx];
      addPoints(-3, "orden incorrecto Nivel 1");
      pushLog(`> Comparaci\xF3n ${wrongIdx + 1}: esperabas ${good.name} (${good.poder})`, "bad");
      fail(`\u274C Fall\xF3 en la posici\xF3n ${wrongIdx + 1}: pusiste ${bad.name} (${bad.poder}) pero deber\xEDa ir ${good.name} (${good.poder}). Orden correcto: Escudo \u2192 Arco \u2192 Daga \u2192 Espada \u2192 Orbe.`);
    }
  };
  const l2Available = SPELLS.filter((s) => !l2New.includes(s.id));
  const l2Expected = useMemo(() => [...SPELLS].sort((a, b) => b.mana - a.mana).map((s) => s.id), []);
  const addToNew = (id) => setL2New((p) => p.includes(id) ? p : [...p, id]);
  const moveInNew = (idx, dir) => {
    setL2New((p) => {
      const n = [...p];
      const j = idx + dir;
      if (j < 0 || j >= n.length) return p;
      [n[idx], n[j]] = [n[j], n[idx]];
      return n;
    });
  };
  const checkL2 = () => {
    pushLog("> Ejecutando hechizos.toSorted((a,b)=>b.mana-a.mana)", "code");
    pushLog("> Original antes: [40, 60, 80, 20, 50] \xB7 man\xE1 \xB7 p\xE1gina bloqueada", "info");
    if (l2New.length === 0) {
      addPoints(-10, "p\xE1gina nueva vac\xEDa");
      fail("\u274C Vaciaste la p\xE1gina original. Eso es mutar el grimorio. La p\xE1gina nueva no puede quedar vac\xEDa.");
      return;
    }
    if (JSON.stringify(l2New) === JSON.stringify(l2Expected)) {
      pushLog("> Copia: Rayo \u2192 Ventisca \u2192 Toque \u2192 Bola \u2192 Torbellino", "ok");
      pushLog("> Original despu\xE9s INTACTO", "ok");
      addPoints(10, "Nivel 2 ordenado");
      markSolved(2);
      win("\u2705 La p\xE1gina nueva est\xE1 ordenada de mayor a menor man\xE1. La p\xE1gina original sigue intacta.");
    } else {
      addPoints(-3, "orden incorrecto Nivel 2");
      fail("\u274C Orden incorrecto. Descendente = mayor primero. Orden correcto: Rayo (80) \u2192 Ventisca (60) \u2192 Toque Vamp\xEDrico (50) \u2192 Bola de Fuego (40) \u2192 Torbellino (20).");
    }
  };
  const oracle = ORACLE_ROUNDS[oRound];
  const oracleSorted = [...oracle.arr].sort((a, b) => a - b);
  const revealOracle = () => {
    if (!oPick) {
      fail("\u274C Elige una predicci\xF3n: \xBFel original sigue intacto o se muta?");
      return;
    }
    const actuallyMutated = oracle.op === "sort";
    const correct = oPick === "mutado" === actuallyMutated;
    pushLog(`> Ejecutando arr.${oracle.op}((a,b)=>a-b) sobre ${fmt(oracle.arr)}`, "code");
    pushLog(`> Original antes: ${fmt(oracle.arr)}`, "info");
    if (correct) {
      const ns = oStreak + 1;
      setOStreak(ns);
      let bonus = 0;
      if (ns === 4) bonus = 5;
      pushLog(`> Original despu\xE9s: ${actuallyMutated ? fmt(oracleSorted) + " MUTADO" : fmt(oracle.arr) + " INTACTO"}`, actuallyMutated ? "bad" : "ok");
      addPoints(10 + bonus, bonus ? "Nivel 3 + bonus 4 seguidas" : "Nivel 3 predicci\xF3n");
      if (oRound === 3) {
        setODone(true);
        markSolved(3);
        win("\u2705 Correcto. sort muta el original; toSorted no. El or\xE1culo te revela el siguiente hechizo. \xA1Bonus +5 por 4 rondas seguidas!");
      } else win(`\u2705 Correcto. ${actuallyMutated ? "sort muta el original." : "toSorted devuelve copia nueva; el original sigue intacto."} El or\xE1culo te revela el siguiente hechizo.`);
    } else {
      setOStreak(0);
      addPoints(-3, "predicci\xF3n incorrecta");
      fail(`\u274C Incorrecto. ${actuallyMutated ? `sort MUTA: el original pasa a ${fmt(oracleSorted)}.` : `toSorted devuelve copia nueva; el original sigue ${fmt(oracle.arr)}.`}`);
    }
    setORevealed(true);
  };
  const nextOracle = () => {
    if (oRound < 3) {
      setORound(oRound + 1);
      setOPick(null);
      setORevealed(false);
      setFeedback(null);
    }
  };
  const checkL4 = () => {
    const code = l4Code.trim();
    pushLog("> Ejecutando heroes.toSorted(comparador escrito)", "code");
    pushLog("> Original antes: Kael 100\u2694 \xB7 Lyra 80\u2694 \xB7 Mordo 100\u2694 \xB7 Sylas 60\u2694 \xB7 Bren 80\u2694", "info");
    let fn = null;
    try {
      fn = new Function(`return (${code})`)();
      if (typeof fn !== "function") throw new Error("no es funci\xF3n");
    } catch {
      addPoints(-5, "comparador mal escrito");
      fail("\u274C Comparador mal escrito. Revisa la sintaxis: (a,b) => parseInt(a.poder)-parseInt(b.poder) || a.nombre.localeCompare(b.nombre)");
      return;
    }
    let result = [];
    try {
      result = [...HEROES].toSorted(fn);
    } catch {
      addPoints(-5, "comparador con error");
      fail("\u274C Tu comparador lanz\xF3 un error al ejecutarse. Revisa parseInt y localeCompare.");
      return;
    }
    const got = result.map((h) => h.nombre).join(",");
    const expected = "Sylas,Bren,Lyra,Kael,Mordo";
    setL4Result(result.map((h) => `${h.emoji} ${h.nombre} ${h.poder}`).join(" \u2192 "));
    setL4Attempts((a) => a + 1);
    if (got === expected) {
      const pts = l4Help ? 5 : 15;
      pushLog(`> Copia: ${result.map((h) => h.nombre).join(" \u2192 ")}`, "ok");
      pushLog("> Original despu\xE9s INTACTO", "ok");
      addPoints(pts, l4Help ? "Nivel 4 con Ayuda" : "Nivel 4 comparador");
      markSolved(4);
      win(`\u2705 \xA1Comparador correcto! parseInt convierte los strings y localeCompare ordena los empates. El original sigue intacto. +${pts} puntos.`);
    } else if (!code.includes("parseInt")) {
      addPoints(-5, "falta parseInt");
      fail('\u274C Sin parseInt, toSorted compara strings y ordena lexicogr\xE1ficamente ("100\u2694" < "80\u2694"). Necesitas convertir a n\xFAmero.');
    } else if (!code.includes("localeCompare")) {
      addPoints(-5, "falta localeCompare");
      fail("\u274C Los empates en poder no se ordenan por nombre. A\xF1ade || a.nombre.localeCompare(b.nombre).");
    } else {
      addPoints(-5, "comparador mal");
      fail("\u274C Comparador incorrecto. Revisa el orden: primero poder con parseInt, luego nombre con localeCompare.");
    }
  };
  const sealArr = SEAL_ROUNDS[sRound].arr;
  const chooseSeal = (choice) => {
    setSChoice(choice);
    setSRevealed(true);
    const sorted = [...sealArr].sort((a, b) => a - b);
    pushLog(`> Ejecutando opci\xF3n: ${choice === "sort" ? "original.sort((a,b)=>a-b)" : choice === "toSorted" ? "original.toSorted((a,b)=>a-b)" : "[...original].sort((a,b)=>a-b)"}`, "code");
    pushLog(`> Original antes: ${fmt(sealArr)}`, "info");
    if (choice === "sort") {
      setSMutated(true);
      pushLog(`> Original despu\xE9s: ${fmt(sorted)} MUTADO \xB7 \u{1F480} El grimorio se destruy\xF3.`, "bad");
      addPoints(-10, "sort muta el grimorio");
      fail("\u274C sort MUTA el original. El grimorio se destruye. Usa toSorted.");
    } else if (choice === "toSorted") {
      setSMutated(false);
      pushLog(`> Copia: ${fmt(sorted)} \xB7 Original despu\xE9s: ${fmt(sealArr)} INTACTO`, "ok");
      addPoints(15, "Nivel 5 toSorted");
      if (sRound === 2) markSolved(5);
      win("\u2705 \xA1Correcto! toSorted devuelve copia ordenada sin mutar el original. El grimorio est\xE1 a salvo.");
    } else {
      setSMutated(false);
      pushLog(`> Copia: ${fmt(sorted)} \xB7 Original despu\xE9s: ${fmt(sealArr)} INTACTO`, "ok");
      addPoints(10, "Nivel 5 spread");
      if (sRound === 2) markSolved(5);
      win("\u2705 Tambi\xE9n es v\xE1lido: [...original].sort(...) copia primero y ordena la copia. Pero toSorted es m\xE1s directo.");
    }
  };
  const nextSeal = () => {
    if (sRound < 2) {
      setSRound(sRound + 1);
      setSChoice(null);
      setSRevealed(false);
      setSMutated(false);
      setFeedback(null);
    }
  };
  const restoreSeal = () => {
    setSMutated(false);
    setSChoice(null);
    setSRevealed(false);
    setFeedback({ text: "\u{1F4D6} Grimorio restaurado. El original vuelve a estar intacto. Elige de nuevo.", ok: true });
  };
  const resetAll = () => {
    setPoints(0);
    setStreak(0);
    setSolved([]);
    pointsRef.current = 0;
    streakRef.current = 0;
    solvedRef.current = [];
    setL1Pick([]);
    setL2New([]);
    setORound(0);
    setOPick(null);
    setORevealed(false);
    setOStreak(0);
    setODone(false);
    setL4Code("(a,b) => ");
    setL4Help(false);
    setL4Result(null);
    setSRound(0);
    setSChoice(null);
    setSRevealed(false);
    setSMutated(false);
    setFeedback(null);
    setLogs([{ text: "> Grimorio reiniciado. Kael vuelve a empezar.", kind: "info" }]);
    setLevel(1);
    persist(0, [], 0);
  };
  const originalPreview = level === 1 ? "[30, 10, 50, 20, 40]" : level === 2 ? "[40, 60, 80, 20, 50]" : level === 3 ? fmt(oracle.arr) : level === 4 ? "Kael 100\u2694 \xB7 Lyra 80\u2694 \xB7 Mordo 100\u2694 \xB7 Sylas 60\u2694 \xB7 Bren 80\u2694" : fmt(sealArr);
  return /* @__PURE__ */ jsxs("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)" }, className: "min-h-screen w-full bg-[#030508] text-[#f4ead2] overflow-x-clip", children: [
    /* @__PURE__ */ jsxs("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)" }, className: "sticky z-30 border-b border-[#f5c451]/25 bg-[#030508]/95 backdrop-blur", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1500px] px-3 sm:px-5 py-3 flex flex-wrap items-center gap-2 sm:gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(1.15rem,3.2vw,1.9rem)] leading-none font-bold tracking-wide text-[#f5c451] [overflow-wrap:anywhere]", children: [
            "\u{1F4D6} GRIMORIO DEL H\xC9ROE CA\xCDDO ",
            /* @__PURE__ */ jsx("span", { className: "text-[#a855f7]", children: "\u2014 KAEL" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-[12px] sm:text-sm text-[#9aa3b8]", children: [
            "Eres Kael, el \xFAltimo h\xE9roe. La horda desorden\xF3 el grimorio. El original ",
            /* @__PURE__ */ jsx("b", { className: "text-[#ff7a18]", children: "SIEMPRE" }),
            " debe quedar intacto."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ml-auto flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "chip rounded-full px-2.5 py-1 text-xs font-bold", children: "SIN API \u2705" }),
          /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-[#f5c451] text-black px-3 py-1 text-sm font-extrabold", children: [
            "PUNTOS: ",
            points
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-[#a855f7] bg-[#a855f7]/20 px-3 py-1 text-sm font-bold", children: [
            "\u{1F525} RACHA: ",
            streak
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "text-[11px] text-[#9aa3b8]", children: [
            saveMsg || "Guardado local de partida",
            " \xB7 ",
            saveState === "saving" ? "Guardando\u2026" : saveState === "saved" ? "\u25CF" : "\u25CB"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1500px] px-3 sm:px-5 pb-2 flex flex-wrap gap-2 text-[12px]", children: [
        /* @__PURE__ */ jsx("span", { className: "text-[#9aa3b8]", children: "+10 acierto \xB7 +15 Niveles 4 y 5 con toSorted \xB7 +10 Nivel 5 con spread \xB7 \u221210 mutar con sort \xB7 \u22125 comparador mal \xB7 \u22123 orden / predicci\xF3n \xB7 +5 bonus N3 (4 seguidas) y N4 con Ayuda*" }),
        /* @__PURE__ */ jsx("button", { onClick: resetAll, className: "btn-ghost rounded-lg px-3 py-1 font-bold ml-auto", children: "\u21BA Reiniciar grimorio" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[1500px] px-3 sm:px-5 py-4 grid gap-4 lg:grid-cols-[300px_1fr_420px] items-start", children: [
      /* @__PURE__ */ jsxs("aside", { className: "space-y-4 lg:sticky lg:top-24", children: [
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", "aria-label": "Niveles", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold text-[#f5c451]", children: "\u{1F4DC} NIVELES" }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: LEVELS.map((l) => /* @__PURE__ */ jsxs("button", { onClick: () => {
            setLevel(l.n);
            setFeedback(null);
          }, className: `w-full text-left rounded-xl border px-3 py-2.5 flex items-center gap-3 ${level === l.n ? "border-[#f5c451] bg-[#f5c451]/15" : "border-white/10 bg-white/[.03]"}`, children: [
            /* @__PURE__ */ jsx("span", { className: "text-2xl", children: l.icon }),
            /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxs("span", { className: "block font-bold leading-tight", children: [
                "Nivel ",
                l.n,
                " \xB7 ",
                l.title
              ] }),
              /* @__PURE__ */ jsx("span", { className: "block text-xs text-[#9aa3b8]", children: l.sub })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-lg", children: solved.includes(l.n) ? "\u2705" : "\u25CB" })
          ] }, l.n)) }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-xs text-[#9aa3b8]", children: [
            solved.length,
            "/5 niveles resueltos \xB7 ",
            solved.length === 5 ? "\u{1F3C6} El grimorio est\xE1 a salvo, Kael." : "Completa cada nivel sin mutar el original."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4 border-[#ff7a18]/40", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-[#ff7a18]", children: "sort() vs toSorted()" }),
          /* @__PURE__ */ jsxs("div", { className: "mono mt-3 space-y-2 text-[12px] leading-relaxed", children: [
            /* @__PURE__ */ jsxs("p", { className: "rounded-lg bg-red-500/10 border border-red-500/30 p-2", children: [
              /* @__PURE__ */ jsx("b", { className: "text-[#ff4d6d]", children: "sort()" }),
              /* @__PURE__ */ jsx("br", {}),
              "MUTA el original.",
              /* @__PURE__ */ jsx("br", {}),
              "arr.sort() \u2192 original cambia."
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2", children: [
              /* @__PURE__ */ jsx("b", { className: "text-[#34d399]", children: "toSorted()" }),
              /* @__PURE__ */ jsx("br", {}),
              "NO muta. Devuelve copia nueva.",
              /* @__PURE__ */ jsx("br", {}),
              "arr.toSorted() \u2192 original intacto."
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#9aa3b8]", children: "Regla de oro: nunca llames sort() sobre el grimorio original." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "\u{1F9DF} Bit\xE1cora de Kael" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[#cbd5e1] leading-relaxed", children: "\u201CEncontr\xE9 el grimorio entre cenizas. Cada p\xE1gina desordenada es un hechizo que puede salvar el reino\u2026 o destruirlo si toco el original.\u201D" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-[#9aa3b8]", children: "Consejo: el comparador decide el orden. Sin \xE9l, los n\xFAmeros se ordenan como texto." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "space-y-4 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-3 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "panel p-4 border-[#ff7a18]/50", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-[#ff7a18]", children: "\u{1F512} ORIGINAL BLOQUEADO" }),
              /* @__PURE__ */ jsx("span", { className: "text-xs font-bold bg-[#ff7a18]/20 text-[#ff7a18] px-2 py-1 rounded-full", children: "INTACTO" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mono mt-3 text-sm break-words [overflow-wrap:anywhere]", children: originalPreview }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-[#9aa3b8]", children: "No se puede arrastrar, borrar ni ordenar. Solo leer." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "panel p-4 border-emerald-400/30", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-[#34d399]", children: "\u{1F4C4} COPIA ORDENADA" }),
            /* @__PURE__ */ jsx("p", { className: "mono mt-3 text-sm [overflow-wrap:anywhere]", children: level === 1 ? l1Pick.length ? l1Pick.map((id) => RELICS.find((r) => r.id === id).emoji + " " + RELICS.find((r) => r.id === id).name).join(" \u2192 ") : "\u2014 copia vac\xEDa \u2014" : level === 2 ? l2New.length ? l2New.map((id) => SPELLS.find((s) => s.id === id).emoji + " " + SPELLS.find((s) => s.id === id).name).join(" \u2192 ") : "\u2014 p\xE1gina nueva vac\xEDa \u2014" : level === 3 ? `Ronda ${oRound + 1}/4 \xB7 ${oracle.op} \xB7 ${fmt(oracle.arr)}` : level === 4 ? l4Result || "\u2014 escribe un comparador \u2014" : `Ronda ${sRound + 1}/3 \xB7 ${fmt(sealArr)}` }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-[#9aa3b8]", children: "Aqu\xED s\xED puedes ordenar: es una copia, no el original." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: `panel p-4 sm:p-5 ${feedback?.ok ? "glow" : ""} ${feedback && !feedback.ok ? "shake" : ""}`, children: [
          level === 1 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs tracking-widest text-[#a855f7] font-bold", children: "NIVEL 1 \xB7 CLIC SIMPLE" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mt-1", children: "Las Reliquias del H\xE9roe" }),
            /* @__PURE__ */ jsxs("p", { className: "text-[#cbd5e1] mt-1", children: [
              "Ordena por ",
              /* @__PURE__ */ jsx("b", { children: "poder ascendente" }),
              " haciendo clic en cada reliquia en el orden correcto. Cada clic la coloca en la copia."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: RELICS.map((r) => {
              const used = l1Pick.includes(r.id);
              const pos = l1Pick.indexOf(r.id);
              return /* @__PURE__ */ jsxs("button", { disabled: used, onClick: () => setL1Pick((p) => [...p, r.id]), className: `rounded-xl border px-3 py-3 text-left min-w-[130px] flex-1 ${used ? "opacity-40 border-white/10" : "border-[#f5c451]/40 bg-white/[.04] hover:bg-[#f5c451]/10"}`, children: [
                /* @__PURE__ */ jsx("span", { className: "text-2xl", children: r.emoji }),
                /* @__PURE__ */ jsx("span", { className: "block font-bold leading-tight mt-1", children: r.name }),
                /* @__PURE__ */ jsxs("span", { className: "mono text-xs text-[#f5c451]", children: [
                  "poder ",
                  r.poder
                ] }),
                used && /* @__PURE__ */ jsxs("span", { className: "block text-xs text-emerald-300", children: [
                  "\u2713 en copia \xB7 posici\xF3n ",
                  pos + 1
                ] })
              ] }, r.id);
            }) }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 mono text-xs bg-black/40 rounded-lg p-3", children: "const copia = reliquias.toSorted((a,b)=>a.poder-b.poder)" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => setL1Pick((p) => p.slice(0, -1)), className: "btn-ghost rounded-lg px-4 py-2 font-bold", children: "\u21A9 Deshacer \xFAltimo" }),
              /* @__PURE__ */ jsx("button", { onClick: () => setL1Pick([]), className: "btn-ghost rounded-lg px-4 py-2 font-bold", children: "Limpiar copia" }),
              /* @__PURE__ */ jsx("button", { onClick: checkL1, className: "btn-gold rounded-lg px-5 py-2", children: "\u2713 Comprobar" })
            ] })
          ] }),
          level === 2 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs tracking-widest text-[#a855f7] font-bold", children: "NIVEL 2 \xB7 ARRASTRAR Y SOLTAR" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mt-1", children: "Los Hechizos del Grimorio" }),
            /* @__PURE__ */ jsxs("p", { className: "text-[#cbd5e1] mt-1", children: [
              "Arrastra los hechizos a la p\xE1gina nueva, ordenados por ",
              /* @__PURE__ */ jsx("b", { children: "man\xE1 descendente" }),
              " (mayor primero). En m\xF3vil usa \u2795 y las flechas \u25C0 \u25B6."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-3 md:grid-cols-2", children: [
              /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-white/10 p-3 bg-black/20", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm", children: "Hechizos disponibles" }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 space-y-2", children: [
                  l2Available.map((s) => /* @__PURE__ */ jsxs("div", { draggable: true, onDragStart: () => setDragId(s.id), className: "flex items-center gap-2 rounded-lg border border-[#a855f7]/40 bg-[#a855f7]/10 px-2 py-2 cursor-grab", children: [
                    /* @__PURE__ */ jsx("span", { className: "text-xl", children: s.emoji }),
                    /* @__PURE__ */ jsx("span", { className: "flex-1 min-w-0 font-bold [overflow-wrap:anywhere]", children: s.name }),
                    /* @__PURE__ */ jsxs("span", { className: "mono text-xs", children: [
                      "man\xE1 ",
                      s.mana
                    ] }),
                    /* @__PURE__ */ jsx("button", { onClick: () => addToNew(s.id), className: "btn-gold rounded px-2 py-1 text-xs", children: "\u2795 A\xF1adir" })
                  ] }, s.id)),
                  l2Available.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-[#9aa3b8]", children: "Todos est\xE1n en la p\xE1gina nueva." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { onDragOver: (e) => {
                e.preventDefault();
              }, onDrop: (e) => {
                e.preventDefault();
                if (dragId) addToNew(dragId);
                setDragId(null);
              }, className: "rounded-xl border border-dashed border-emerald-400/50 p-3 bg-emerald-500/[.05] min-h-[170px]", children: [
                /* @__PURE__ */ jsx("h4", { className: "font-bold text-sm", children: "\u{1F4C4} P\xE1gina nueva \u2014 suelta aqu\xED" }),
                /* @__PURE__ */ jsxs("div", { className: "mt-2 space-y-2", children: [
                  l2New.map((id, idx) => {
                    const s = SPELLS.find((x) => x.id === id);
                    return /* @__PURE__ */ jsxs("div", { draggable: true, onDragStart: () => setDragId(id), onDragOver: (e) => {
                      e.preventDefault();
                      setDragOver(idx);
                    }, onDrop: (e) => {
                      e.preventDefault();
                      if (dragId && dragId !== id) {
                        setL2New((p) => {
                          const n = p.filter((x) => x !== dragId);
                          n.splice(idx, 0, dragId);
                          return n;
                        });
                      }
                      setDragId(null);
                    }, className: `flex items-center gap-2 rounded-lg border px-2 py-2 bg-black/30 ${dragOver === idx ? "border-[#f5c451]" : "border-white/10"}`, children: [
                      /* @__PURE__ */ jsx("span", { className: "text-xl", children: s.emoji }),
                      /* @__PURE__ */ jsxs("span", { className: "flex-1 min-w-0 font-bold [overflow-wrap:anywhere]", children: [
                        idx + 1,
                        ". ",
                        s.name
                      ] }),
                      /* @__PURE__ */ jsx("span", { className: "mono text-xs", children: s.mana }),
                      /* @__PURE__ */ jsx("button", { onClick: () => moveInNew(idx, -1), "aria-label": "Mover a la izquierda", className: "btn-ghost rounded px-2 py-1", children: "\u25C0" }),
                      /* @__PURE__ */ jsx("button", { onClick: () => moveInNew(idx, 1), "aria-label": "Mover a la derecha", className: "btn-ghost rounded px-2 py-1", children: "\u25B6" }),
                      /* @__PURE__ */ jsx("button", { onClick: () => setL2New((p) => p.filter((x) => x !== id)), className: "btn-ghost rounded px-2 py-1 text-xs", children: "Quitar" })
                    ] }, id);
                  }),
                  l2New.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-[#9aa3b8]", children: "Vac\xEDa. Arrastra o a\xF1ade hechizos aqu\xED." })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 mono text-xs bg-black/40 rounded-lg p-3", children: "const copia = hechizos.toSorted((a,b)=>b.mana-a.mana)" }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx("button", { onClick: () => setL2New([]), className: "btn-ghost rounded-lg px-4 py-2 font-bold", children: "Limpiar p\xE1gina nueva" }),
              /* @__PURE__ */ jsx("button", { onClick: checkL2, className: "btn-gold rounded-lg px-5 py-2", children: "\u2713 Comprobar" })
            ] })
          ] }),
          level === 3 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs tracking-widest text-[#a855f7] font-bold", children: "NIVEL 3 \xB7 PREDICCI\xD3N \xB7 OR\xC1CULO" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mt-1", children: "La Predicci\xF3n del Or\xE1culo" }),
            /* @__PURE__ */ jsxs("p", { className: "text-[#cbd5e1] mt-1", children: [
              "Ronda ",
              oRound + 1,
              " de 4 \xB7 Racha del or\xE1culo: ",
              /* @__PURE__ */ jsx("b", { children: oStreak }),
              ". Predice qu\xE9 le pasar\xE1 al original."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 panel !rounded-xl p-4 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9aa3b8]", children: "GRIMORIO ORIGINAL \xB7 OPERACI\xD3N" }),
              /* @__PURE__ */ jsxs("p", { className: "mono text-xl sm:text-2xl mt-2 [overflow-wrap:anywhere]", children: [
                fmt(oracle.arr),
                " \xB7 ",
                /* @__PURE__ */ jsxs("span", { className: "text-[#f5c451]", children: [
                  oracle.op,
                  "((a,b)=>a-b)"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 grid sm:grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxs("button", { disabled: oRevealed, onClick: () => setOPick("intacto"), className: `rounded-xl border p-4 text-left ${oPick === "intacto" ? "border-emerald-400 bg-emerald-500/15" : "border-white/10 bg-white/[.03]"}`, children: [
                /* @__PURE__ */ jsxs("b", { children: [
                  "\u{1F6E1} Sigue ",
                  fmt(oracle.arr)
                ] }),
                /* @__PURE__ */ jsx("span", { className: "block text-sm text-[#9aa3b8]", children: "El original no cambia." })
              ] }),
              /* @__PURE__ */ jsxs("button", { disabled: oRevealed, onClick: () => setOPick("mutado"), className: `rounded-xl border p-4 text-left ${oPick === "mutado" ? "border-red-400 bg-red-500/15" : "border-white/10 bg-white/[.03]"}`, children: [
                /* @__PURE__ */ jsxs("b", { children: [
                  "\u{1F480} Se muta a ",
                  fmt(oracleSorted)
                ] }),
                /* @__PURE__ */ jsx("span", { className: "block text-sm text-[#9aa3b8]", children: "El original queda ordenado." })
              ] })
            ] }),
            oRevealed && /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border border-white/10 bg-black/30 p-3 mono text-sm", children: [
              "Resultado real \u2014 Original despu\xE9s: ",
              /* @__PURE__ */ jsx("b", { className: oracle.op === "sort" ? "text-[#ff4d6d]" : "text-emerald-300", children: oracle.op === "sort" ? fmt(oracleSorted) + " MUTADO" : fmt(oracle.arr) + " INTACTO" }),
              " \xB7 Copia: ",
              fmt(oracleSorted)
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: !oRevealed ? /* @__PURE__ */ jsx("button", { onClick: revealOracle, className: "btn-gold rounded-lg px-5 py-2", children: "\u{1F52E} Revelar predicci\xF3n" }) : !oDone ? /* @__PURE__ */ jsx("button", { onClick: nextOracle, className: "btn-gold rounded-lg px-5 py-2", children: "Siguiente ronda \u2192" }) : /* @__PURE__ */ jsx("button", { onClick: () => setLevel(4), className: "btn-gold rounded-lg px-5 py-2", children: "Ir al Nivel 4 \u2192" }) }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 mono text-xs bg-black/40 rounded-lg p-3", children: [
              "arr.sort((a,b)=>a-b) // arr \u2192 [1,2,3] MUTADO",
              /* @__PURE__ */ jsx("br", {}),
              "arr.toSorted((a,b)=>a-b) // arr \u2192 [3,1,2] INTACTO"
            ] })
          ] }),
          level === 4 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs tracking-widest text-[#a855f7] font-bold", children: "NIVEL 4 \xB7 ESCRIBIR \xB7 COMPARADOR PERDIDO" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mt-1", children: "El Comparador Perdido" }),
            /* @__PURE__ */ jsxs("p", { className: "text-[#cbd5e1] mt-1", children: [
              "Ordena por ",
              /* @__PURE__ */ jsx("b", { children: "poder ascendente" }),
              " sin mutar el original. Si empatan en poder, por ",
              /* @__PURE__ */ jsx("b", { children: "nombre alfab\xE9tico" }),
              ". Los poderes son strings con \u2694."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap gap-2", children: HEROES.map((h) => /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-white/15 bg-white/[.04] px-3 py-1.5 text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "mr-1", children: h.emoji }),
              h.nombre,
              " ",
              /* @__PURE__ */ jsx("span", { className: "mono text-[#f5c451]", children: h.poder })
            ] }, h.nombre)) }),
            /* @__PURE__ */ jsx("label", { className: "block mt-4 text-sm font-bold", htmlFor: "comparador", children: "Escribe tu comparador" }),
            /* @__PURE__ */ jsx("input", { id: "comparador", value: l4Code, onChange: (e) => setL4Code(e.target.value), className: "mono mt-1 w-full rounded-xl border border-[#f5c451]/40 bg-black/50 px-3 py-3 text-sm [overflow-wrap:anywhere]", placeholder: "(a,b) => ..." }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-[#9aa3b8]", children: [
              "Ejemplo de forma: (a,b) => \u2026 \xB7 Intentos: ",
              l4Attempts
            ] }),
            l4Help && /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border border-[#f5c451]/40 bg-[#f5c451]/10 p-3 text-sm space-y-1", children: [
              /* @__PURE__ */ jsxs("p", { children: [
                "\u{1F4A1} Pista 1: Los poderes son strings con s\xEDmbolo \u2192 necesitas ",
                /* @__PURE__ */ jsx("b", { children: "parseInt" }),
                "."
              ] }),
              /* @__PURE__ */ jsxs("p", { children: [
                "\u{1F4A1} Pista 2: Si empatan en poder, ordena por nombre \u2192 ",
                /* @__PURE__ */ jsx("b", { children: "localeCompare" }),
                "."
              ] })
            ] }),
            l4Result && /* @__PURE__ */ jsxs("p", { className: "mt-3 rounded-xl bg-black/30 p-3 text-sm [overflow-wrap:anywhere]", children: [
              "Tu copia: ",
              /* @__PURE__ */ jsx("b", { children: l4Result })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxs("button", { onClick: () => setL4Help(true), className: "btn-ghost rounded-lg px-4 py-2 font-bold", children: [
                "\u{1F4A1} Ayuda ",
                l4Help ? "\xB7 mostrada" : ""
              ] }),
              /* @__PURE__ */ jsx("button", { onClick: checkL4, className: "btn-gold rounded-lg px-5 py-2", children: "\u2713 Comprobar comparador" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 mono text-xs bg-black/40 rounded-lg p-3", children: "const copia = heroes.toSorted((a,b)=>parseInt(a.poder)-parseInt(b.poder) || a.nombre.localeCompare(b.nombre))" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-[#9aa3b8]", children: "Orden correcto: Sylas 60 \u2192 Bren 80 \u2192 Lyra 80 \u2192 Kael 100 \u2192 Mordo 100 \xB7 Con Ayuda y acierto: +5 \xB7 Sin Ayuda: +15" })
          ] }),
          level === 5 && /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs tracking-widest text-[#a855f7] font-bold", children: "NIVEL 5 \xB7 TEST FINAL \xB7 SELLO DEL GRIMORIO" }),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl font-bold mt-1", children: "El Sello del Grimorio" }),
            /* @__PURE__ */ jsxs("p", { className: "text-[#cbd5e1] mt-1", children: [
              "Ronda ",
              sRound + 1,
              " de 3. Ordena ",
              /* @__PURE__ */ jsx("b", { children: "menor a mayor SIN mutar" }),
              ". Elige una opci\xF3n: el juego ejecuta tu elecci\xF3n."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 text-center panel !rounded-xl p-4", children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9aa3b8]", children: "ARRAY ORIGINAL" }),
              /* @__PURE__ */ jsx("p", { className: "mono text-2xl mt-1", children: fmt(sealArr) }),
              sMutated && /* @__PURE__ */ jsx("p", { className: "text-sm text-[#ff4d6d] font-bold mt-1", children: "\u{1F480} ORIGINAL MUTADO \u2014 el grimorio se destruy\xF3" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: [["sort", "original.sort((a,b)=>a-b)"], ["toSorted", "const copia = original.toSorted((a,b)=>a-b)"], ["spread", "const copia = [...original].sort((a,b)=>a-b)"]].map(([key, code]) => /* @__PURE__ */ jsxs("button", { disabled: sRevealed && sChoice !== key, onClick: () => chooseSeal(key), className: `w-full text-left rounded-xl border p-3 mono text-sm [overflow-wrap:anywhere] ${sChoice === key ? key === "sort" ? "border-red-400 bg-red-500/15" : "border-emerald-400 bg-emerald-500/15" : "border-white/10 bg-white/[.03]"}`, children: [
              /* @__PURE__ */ jsx("span", { className: "mr-2", children: key === "sort" ? "\u2610" : "\u2610" }),
              code,
              " ",
              /* @__PURE__ */ jsx("span", { className: "text-[#9aa3b8]", children: key === "sort" ? "\xB7 \u221210" : key === "toSorted" ? "\xB7 +15" : "\xB7 +10" })
            ] }, key)) }),
            sRevealed && /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl bg-black/30 p-3 mono text-sm", children: [
              "Original despu\xE9s: ",
              /* @__PURE__ */ jsx("b", { className: sMutated ? "text-[#ff4d6d]" : "text-emerald-300", children: sMutated ? fmt([...sealArr].sort((a, b) => a - b)) + " MUTADO" : fmt(sealArr) + " INTACTO" }),
              " \xB7 Copia: ",
              fmt([...sealArr].sort((a, b) => a - b))
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              sMutated && /* @__PURE__ */ jsx("button", { onClick: restoreSeal, className: "btn-danger rounded-lg px-4 py-2 font-bold", children: "\u{1F4D6} Restaurar grimorio" }),
              sRevealed && !sMutated && sRound < 2 && /* @__PURE__ */ jsx("button", { onClick: nextSeal, className: "btn-gold rounded-lg px-5 py-2", children: "Siguiente ronda \u2192" }),
              sRevealed && !sMutated && sRound === 2 && /* @__PURE__ */ jsx("button", { onClick: () => setLevel(1), className: "btn-gold rounded-lg px-5 py-2", children: "\u{1F3C6} Volver a jugar" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 mono text-xs bg-black/40 rounded-lg p-3", children: [
              "const copia = original.toSorted((a,b)=>a-b); // original \u2192 ",
              fmt(sealArr),
              " INTACTO",
              /* @__PURE__ */ jsx("br", {}),
              "// copia \u2192 ",
              fmt([...sealArr].sort((a, b) => a - b))
            ] })
          ] }),
          feedback && /* @__PURE__ */ jsx("div", { role: "status", className: `mt-4 rounded-xl border p-3 text-[15px] leading-relaxed [overflow-wrap:anywhere] ${feedback.ok ? "border-emerald-400/50 bg-emerald-500/10" : "border-red-400/50 bg-red-500/10"}`, children: feedback.text })
        ] }, `${level}-${shakeKey}-${glowKey}`),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4 border-[#f5c451]/40", "aria-label": "Panel de inmutabilidad", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-[#f5c451]", children: "\u{1F50D} PANEL DE INMUTABILIDAD" }),
          /* @__PURE__ */ jsxs("p", { className: "mono mt-2 text-sm leading-relaxed [overflow-wrap:anywhere]", children: [
            "Original: [3,1,2] \u2192 sigue [3,1,2] ",
            /* @__PURE__ */ jsx("span", { className: "text-emerald-300 font-bold", children: "INTACTO" }),
            " | Copia: [1,2,3] ",
            /* @__PURE__ */ jsx("span", { className: "text-[#f5c451]", children: "ORDENADA" }),
            " | ",
            /* @__PURE__ */ jsx("b", { children: "toSorted() NO muta. sort() S\xCD muta." })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-[#9aa3b8]", children: [
            "Nivel actual \xB7 Original: ",
            /* @__PURE__ */ jsx("span", { className: "mono", children: originalPreview }),
            " \xB7 La copia es la que cambia, nunca el grimorio."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("aside", { className: "lg:sticky lg:top-24", children: /* @__PURE__ */ jsxs("section", { className: "panel p-4", "aria-label": "Depurador avanzado", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-[#a855f7]", children: "\u{1F6E0} DEPURADOR AVANZADO: .toSorted()" }),
          /* @__PURE__ */ jsx("button", { onClick: () => setLogs([{ text: "> Consola limpia. El grimorio espera.", kind: "info" }]), className: "btn-ghost rounded-lg px-2 py-1 text-xs font-bold", children: "Limpiar" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mono mt-3 h-[380px] lg:h-[520px] overflow-y-auto rounded-xl bg-black/60 border border-white/10 p-3 text-[12px] leading-relaxed space-y-2", "aria-live": "polite", children: logs.map((l, i) => /* @__PURE__ */ jsx("p", { className: `${l.kind === "ok" ? "text-emerald-300" : l.kind === "bad" ? "text-[#ff8fa3]" : l.kind === "code" ? "text-[#f5c451]" : "text-[#cbd5e1]"} [overflow-wrap:anywhere]`, children: l.text }, i)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2 text-center text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white/[.04] p-2", children: [
            /* @__PURE__ */ jsx("b", { className: "block text-base", children: points }),
            "Puntos"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white/[.04] p-2", children: [
            /* @__PURE__ */ jsxs("b", { className: "block text-base", children: [
              solved.length,
              "/5"
            ] }),
            "Niveles"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-white/[.04] p-2", children: [
            /* @__PURE__ */ jsx("b", { className: "block text-base", children: streak }),
            "Racha"
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 text-xs text-[#9aa3b8]", children: "En cada comprobaci\xF3n el depurador muestra la ejecuci\xF3n, el original antes y despu\xE9s, la copia creada y las comparaciones." })
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "mx-auto max-w-[1500px] px-3 sm:px-5 pb-8 text-center text-xs text-[#9aa3b8]", children: "\u{1F4D6} El Grimorio del H\xE9roe Ca\xEDdo \xB7 Kael \xB7 * En Nivel 4, con Ayuda y acierto: +5. Sin Ayuda: +15. \xB7 Tu progreso se guarda en esta partida." })
  ] });
}
export {
  App as default
};
