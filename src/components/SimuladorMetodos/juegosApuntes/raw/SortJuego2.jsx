/* Convertido automáticamente desde Apuntes/sort/juegos.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, Flame, RotateCcw, Shuffle, Undo2, Timer, Sparkles, UtensilsCrossed, Code2, Terminal, ChefHat } from "lucide-react";
const base1 = [
  { id: "h", emoji: "\u{1F354}", name: "Hamburguesa", price: 12, calories: 850 },
  { id: "e", emoji: "\u{1F957}", name: "Ensalada", price: 8, calories: 320 },
  { id: "p", emoji: "\u{1F355}", name: "Pizza", price: 15, calories: 1100 },
  { id: "s", emoji: "\u{1F363}", name: "Sushi", price: 18, calories: 450 },
  { id: "t", emoji: "\u{1F32E}", name: "Tacos", price: 10, calories: 600 }
];
const tieMenu = [
  { id: "h", emoji: "\u{1F354}", name: "Hamburguesa", price: 12, calories: 850 },
  { id: "b", emoji: "\u{1F32F}", name: "Burrito", price: 12, calories: 500 },
  { id: "e", emoji: "\u{1F957}", name: "Ensalada", price: 8, calories: 320 },
  { id: "t", emoji: "\u{1F32E}", name: "Tacos", price: 10, calories: 600 },
  { id: "p", emoji: "\u{1F355}", name: "Pizza", price: 15, calories: 1100 }
];
const stringMenu = [
  { id: "h", emoji: "\u{1F354}", name: "Hamburguesa", price: "12\u20AC", calories: 850 },
  { id: "e", emoji: "\u{1F957}", name: "Ensalada", price: "8\u20AC", calories: 320 },
  { id: "p", emoji: "\u{1F355}", name: "Pizza", price: "15\u20AC", calories: 1100 },
  { id: "s", emoji: "\u{1F363}", name: "Sushi", price: "18\u20AC", calories: 450 },
  { id: "t", emoji: "\u{1F32E}", name: "Tacos", price: "10\u20AC", calories: 600 }
];
const pool = [
  { id: "pa", emoji: "\u{1F35D}", name: "Pasta", price: 13, calories: 720 },
  { id: "so", emoji: "\u{1F372}", name: "Sopa", price: 7, calories: 280 },
  { id: "st", emoji: "\u{1F969}", name: "Filete", price: 22, calories: 940 },
  { id: "fi", emoji: "\u{1F41F}", name: "Pescado", price: 19, calories: 520 },
  { id: "cu", emoji: "\u{1F35B}", name: "Curry", price: 11, calories: 680 },
  { id: "ra", emoji: "\u{1F35C}", name: "Ramen", price: 14, calories: 810 },
  { id: "sa", emoji: "\u{1F96A}", name: "S\xE1ndwich", price: 9, calories: 430 },
  { id: "de", emoji: "\u{1F370}", name: "Postre", price: 6, calories: 540 },
  { id: "qu", emoji: "\u{1F9C0}", name: "Quesadilla", price: 10, calories: 610 },
  { id: "ce", emoji: "\u{1F958}", name: "Cazuela", price: 17, calories: 880 },
  { id: "ta", emoji: "\u{1F32E}", name: "Tacos", price: 10, calories: 600 },
  { id: "bu", emoji: "\u{1F354}", name: "Hamburguesa", price: 12, calories: 850 }
];
const shuffleArr = (arr) => [...arr].sort(() => Math.random() - 0.5);
const priceNum = (d) => typeof d.price === "string" ? parseFloat(d.price) : d.price;
const byPriceAsc = (a, b) => priceNum(a) - priceNum(b);
const byCalDesc = (a, b) => b.calories - a.calories;
const byCompound = (a, b) => priceNum(a) - priceNum(b) || a.calories - b.calories;
function makeLevel(id) {
  if (id === "1") return { id, request: "Quiero el men\xFA de M\xC1S BARATO a M\xC1S CARO", comparator: "(a, b) => a.precio - b.precio", code: "a.precio - b.precio", dishes: base1, expected: [...base1].sort(byPriceAsc), lesson: "El comparador devuelve un n\xFAmero. Si sale negativo, el primer plato va antes." };
  if (id === "2") return { id, request: "Quiero el men\xFA de M\xC1S CALOR\xCDAS a MENOS", comparator: "(a, b) => b.calorias - a.calorias", code: "b.calorias - a.calorias", dishes: base1, expected: [...base1].sort(byCalDesc), lesson: "Intercambiar a y b invierte el orden: b - a es descendente." };
  if (id === "3") return { id, request: "De M\xC1S BARATO a M\xC1S CARO; si empatan, MENOS CALOR\xCDAS primero", comparator: "(a, b) => a.precio - b.precio || a.calorias - b.calorias", code: "a.precio - b.precio || a.calorias - b.calorias", dishes: tieMenu, expected: [...tieMenu].sort(byCompound), lesson: "Si precio da 0 (empate), JS pasa al segundo criterio: calor\xEDas." };
  if (id === "4") return { id, request: "De M\xC1S BARATO a M\xC1S CARO (precios como texto: \u201C10\u20AC\u201D )", comparator: "(a, b) => parseFloat(a.precio) - parseFloat(b.precio)", code: "parseFloat(a.precio) - parseFloat(b.precio)", dishes: stringMenu, expected: [...stringMenu].sort(byPriceAsc), lesson: 'parseFloat("10\u20AC") = 10. Sin \xE9l, "10\u20AC" - "8\u20AC" = NaN y sort() ordena mal.', trap: "Elige el comparador correcto antes de comprobar." };
  if (id === "19") {
    const dishes2 = [
      { id: "a", emoji: "\u{1F354}", name: "Hamburguesa", price: 12, calories: 850 },
      { id: "b", emoji: "\u{1F957}", name: "Ensalada", price: 8, calories: 320 },
      { id: "c", emoji: "\u{1F355}", name: "Pizza", price: 15, calories: 1100 },
      { id: "d", emoji: "\u{1F363}", name: "Sushi", price: 18, calories: 450 },
      { id: "e", emoji: "\u{1F32E}", name: "Tacos", price: 10, calories: 600 },
      { id: "f", emoji: "\u{1F32F}", name: "Burrito", price: 12, calories: 500 },
      { id: "g", emoji: "\u{1F35D}", name: "Pasta", price: 13, calories: 720 },
      { id: "h", emoji: "\u{1F372}", name: "Sopa", price: 7, calories: 280 },
      { id: "i", emoji: "\u{1F969}", name: "Filete", price: 22, calories: 940 },
      { id: "j", emoji: "\u{1F96A}", name: "S\xE1ndwich", price: 9, calories: 430 }
    ];
    return { id, request: "COMPUESTO: de M\xC1S BARATO a M\xC1S CARO; si empatan, MENOS CALOR\xCDAS primero", comparator: "(a, b) => a.precio - b.precio || a.calorias - b.calorias", code: "a.precio - b.precio || a.calorias - b.calorias", dishes: dishes2, expected: [...dishes2].sort(byCompound), lesson: "Nivel 19: 10 platos, comparador compuesto y 90 segundos." };
  }
  const kinds = [byPriceAsc, byCalDesc, byCompound];
  const kind = Math.floor(Math.random() * 3);
  const dishes = shuffleArr(pool).slice(0, 6).map((d, i) => ({ ...d, id: `inf-${i}-${d.id}`, price: 5 + Math.floor(Math.random() * 20), calories: 200 + Math.floor(Math.random() * 9) * 100 }));
  const requests = ["Quiero el men\xFA de M\xC1S BARATO a M\xC1S CARO", "Quiero el men\xFA de M\xC1S CALOR\xCDAS a MENOS", "De M\xC1S BARATO a M\xC1S CARO; si empatan, MENOS CALOR\xCDAS primero"];
  const codes = ["a.precio - b.precio", "b.calorias - a.calorias", "a.precio - b.precio || a.calorias - b.calorias"];
  return { id: "inf", request: requests[kind], comparator: `(a, b) => ${codes[kind]}`, code: codes[kind], dishes, expected: [...dishes].sort(kinds[kind]), lesson: kind === 2 ? "Recuerda: 0 significa empate y activa el segundo criterio." : "Lee la petici\xF3n y elige el orden antes de hacer clic." };
}
async function api(action, args) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(json.error || `Error ${res.status}`);
  return json.data;
}
function App() {
  const [levelId, setLevelId] = useState("1");
  const [level, setLevel] = useState(() => makeLevel("1"));
  const [display, setDisplay] = useState(() => shuffleArr(base1));
  const [order, setOrder] = useState([]);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState([]);
  const [logs, setLogs] = useState(["\u{1F373} Cocina lista. El cliente espera su men\xFA ordenado."]);
  const [debug, setDebug] = useState(["> Esperando tu orden\u2026", "\u{1F9E0} El comparador devuelve un n\xFAmero, no true/false."]);
  const [feedback, setFeedback] = useState(null);
  const [codeInput, setCodeInput] = useState("");
  const [trapChoice, setTrapChoice] = useState("parseFloat(a.precio) - parseFloat(b.precio)");
  const [timeLeft, setTimeLeft] = useState(90);
  const [timerOn, setTimerOn] = useState(false);
  const [saveState, setSaveState] = useState("Cargando progreso\u2026");
  const recordId = useRef(null);
  const loaded = useRef(false);
  const [bonusUsed, setBonusUsed] = useState(false);
  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await api("records.list", { collection: "chef-progress" });
        const rec = data?.records?.[0];
        if (alive && rec?.value) {
          recordId.current = rec.id;
          setPoints(Number(rec.value.points || 0));
          setStreak(Number(rec.value.streak || 0));
          setSolved(Array.isArray(rec.value.solved) ? rec.value.solved : []);
          setSaveState("Progreso guardado");
        } else if (alive) setSaveState("Progreso listo para guardar");
      } catch {
        if (alive) setSaveState("Sin conexi\xF3n: tu partida sigue en esta sesi\xF3n");
      }
      loaded.current = true;
    })();
    return () => {
      alive = false;
    };
  }, []);
  useEffect(() => {
    if (!loaded.current) return;
    const t = setTimeout(async () => {
      try {
        const value = { points, streak, solved, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
        if (recordId.current) await api("records.replace", { collection: "chef-progress", id: recordId.current, value });
        else {
          const created = await api("records.create", { collection: "chef-progress", value });
          recordId.current = created?.id || null;
        }
        setSaveState("Progreso guardado");
      } catch {
        setSaveState("Sin conexi\xF3n: tu partida sigue en esta sesi\xF3n");
      }
    }, 650);
    return () => clearTimeout(t);
  }, [points, streak, solved]);
  useEffect(() => {
    if (!timerOn) return;
    if (timeLeft <= 0) {
      setTimerOn(false);
      setFeedback({ ok: false, text: "\u23F1 Tiempo agotado en el Nivel 19. Pulsa \u201CNivel 19\u201D para intentarlo de nuevo." });
      return;
    }
    const t = setTimeout(() => setTimeLeft((v) => v - 1), 1e3);
    return () => clearTimeout(t);
  }, [timerOn, timeLeft]);
  const startLevel = (id) => {
    const next = makeLevel(id);
    setLevelId(id);
    setLevel(next);
    setDisplay(shuffleArr(next.dishes));
    setOrder([]);
    setFeedback(null);
    setCodeInput("");
    setBonusUsed(false);
    setTimeLeft(90);
    setTimerOn(id === "19");
    setTrapChoice("parseFloat(a.precio) - parseFloat(b.precio)");
    setDebug([`> Nuevo pedido: Nivel ${id === "inf" ? "Infinito" : id === "19" ? "19" : id}`, `\u{1F9D1}\u{1F373} ${next.request}`]);
    setLogs((v) => [...v, `Nuevo pedido \xB7 Nivel ${id === "inf" ? "Infinito" : id}`].slice(-8));
  };
  const pick = (d) => {
    if (order.some((x) => x.id === d.id) || feedback?.ok) return;
    setOrder((v) => [...v, d]);
    setFeedback(null);
  };
  const undo = () => {
    setOrder((v) => v.slice(0, -1));
    setFeedback(null);
  };
  const shuffleMenu = () => {
    setDisplay(shuffleArr(level.dishes));
    setOrder([]);
    setFeedback(null);
    setLogs((v) => [...v, "\u{1F500} Men\xFA mezclado de nuevo"].slice(-8));
  };
  const resetAll = () => {
    setPoints(0);
    setStreak(0);
    setSolved([]);
    setSaveState("Progreso guardado");
    startLevel("1");
    setLogs(["\u{1F373} Cocina reiniciada. Nuevo turno."]);
  };
  const check = () => {
    if (order.length !== level.dishes.length) {
      setFeedback({ ok: false, text: `Te faltan ${level.dishes.length - order.length} platos. Completa \u201CTu orden\u201D antes de comprobar.` });
      return;
    }
    if (levelId === "4" && trapChoice !== "parseFloat(a.precio) - parseFloat(b.precio)") {
      setPoints((p) => Math.max(0, p - 5));
      setStreak(0);
      setFeedback({ ok: false, text: "\u{1FAA4} Trampa: ese comparador no convierte el texto. \u22125 puntos. Elige parseFloat." });
      setDebug([`> platos.sort((a,b) => ${trapChoice})`, '\u26A0\uFE0F Con texto, "10\u20AC" - "8\u20AC" = NaN.', '\u{1F9E0} parseFloat("10\u20AC") = 10 \xB7 parseFloat("8\u20AC") = 8']);
      setLogs((v) => [...v, "\u{1FAA4} Trampa parseFloat: \u22125"].slice(-8));
      return;
    }
    const firstBad = order.findIndex((d, i) => d.id !== level.expected[i].id);
    const [a, b] = level.dishes.slice(0, 2);
    const diff = levelId === "2" ? b.calories - a.calories : priceNum(a) - priceNum(b);
    const lines = [`> Ejecutando platos.sort((a, b) => ${level.code})`, `[Comparaci\xF3n] ${a.name} vs ${b.name} \u2192 ${diff} \u2192 ${diff < 0 ? "el primero va antes" : diff > 0 ? "el segundo va antes" : "empate, pasa al siguiente criterio"}`, "\u{1F9E0} Depurador: <0 \u2192 a antes, >0 \u2192 b antes, 0 \u2192 empate, pasa al siguiente criterio con ||", levelId === "3" || levelId === "19" ? "Para compuesto: \u201CSi a.precio - b.precio da 0 (empate), eval\xFAa a.calorias - b.calorias\u201D." : levelId === "4" ? 'Para parseFloat: \u201CparseFloat(\\"10\u20AC\\") = 10, parseFloat(\\"8\u20AC\\") = 8. Sin parseFloat, \\"10\u20AC\\" - \\"8\u20AC\\" = NaN y sort() ordena mal. Con strings, compara \\"1\\" vs \\"8\\\u201D.\u201D' : "El comparador devuelve un n\xFAmero, no true/false.", `> Resultado: [${level.expected.map((d) => typeof d.price === "string" ? d.price : `${d.price}\u20AC`).join(", ")}] \u2190 MISMO array, MUTADO`, "\u2696\uFE0F sort() muta | toSorted() NO muta"];
    setDebug(lines);
    if (firstBad === -1) {
      const base = levelId === "19" ? 20 : 10;
      let bonus = 0;
      const norm = codeInput.toLowerCase().replace(/\s+/g, "");
      const expectedNorm = level.code.toLowerCase().replace(/\s+/g, "");
      if (codeInput.trim() && !bonusUsed && (norm.includes(expectedNorm) || levelId === "4" && norm.includes("parsefloat"))) {
        bonus = 5;
        setBonusUsed(true);
      }
      setPoints((p) => p + base + bonus);
      setStreak((s) => s + 1);
      if (!solved.includes(levelId)) setSolved((v) => [...v, levelId]);
      setTimerOn(false);
      setFeedback({ ok: true, text: `\u2705 \xA1Orden perfecto! +${base} puntos${bonus ? ` + ${bonus} por el c\xF3digo` : ""}. Chef \u{1F468}\u200D\u{1F373}` });
      setLogs((v) => [...v, `\u2705 Nivel ${levelId} resuelto \xB7 +${base + bonus}`].slice(-8));
    } else {
      setPoints((p) => Math.max(0, p - 3));
      setStreak(0);
      setFeedback({ ok: false, errorIndex: firstBad, text: `\u274C Primer error \xB7 \u22123. Aqu\xED deber\xEDa ir ${level.expected[firstBad].emoji} ${level.expected[firstBad].name}, no ${order[firstBad].emoji} ${order[firstBad].name}.` });
      setLogs((v) => [...v, `\u274C Error en la posici\xF3n ${firstBad + 1} \xB7 \u22123`].slice(-8));
    }
  };
  const priceLabel = (d) => typeof d.price === "string" ? d.price : `${d.price}\u20AC`;
  const before = useMemo(() => level.dishes.map((d) => priceLabel(d)).join(", "), [level]);
  const after = useMemo(() => level.expected.map((d) => priceLabel(d)).join(", "), [level]);
  const levels = [["1", "Nivel 1", "Barato a Caro"], ["2", "Nivel 2", "Calor\xEDas Desc"], ["3", "Nivel 3", "Compuesto \xB7 Empate"], ["4", "Nivel 4", "Trampa parseFloat"], ["inf", "Modo Infinito", "Aleatorio \xB7 6 platos"], ["19", "Nivel 19", "10 platos \xB7 90 s"]];
  const fmt = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
  return /* @__PURE__ */ jsx("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "var(--bg)" }, className: "overflow-x-clip", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1680px] px-3 py-3 sm:px-5 sm:py-5", children: [
    /* @__PURE__ */ jsxs("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)" }, className: "sticky z-20 mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-[#273349] bg-[#0a101d]/95 px-4 py-3 backdrop-blur", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsx("div", { className: "grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#ff7a00] text-2xl shadow-[0_0_30px_rgba(255,122,0,.45)]", children: "\u{1F354}" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("h1", { className: "neon text-lg leading-none font-bold tracking-wide text-[#ff9b33] sm:text-2xl", children: [
            "RESTAURANTE \u201CEL ORDEN PERFECTO\u201D ",
            /* @__PURE__ */ jsx("span", { className: "text-white", children: "\xB7 CHEF" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs font-semibold tracking-[.22em] text-[#a7b2c5]", children: "SORT() CON COMPARADORES \xB7 COCINA EN VIVO" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ml-auto flex flex-wrap gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300", children: saveState }),
        /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-[#ff7a00] px-3 py-1 text-xs font-bold text-black", children: [
          "PUNTOS: ",
          points
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 rounded-full border border-orange-400/50 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-200", children: [
          /* @__PURE__ */ jsx(Flame, { size: 14 }),
          " RACHA: ",
          streak
        ] }),
        solved.includes("19") && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-[#ffd166] px-3 py-1 text-xs font-bold text-black", children: "\u{1F3C6} CHEF NIVEL 19" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_420px]", children: [
      /* @__PURE__ */ jsxs("aside", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold tracking-widest text-orange-300", children: "\u{1F4CB} PEDIDOS" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-[#a7b2c5]", children: [
              solved.length,
              "/6 resueltos"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: levels.map(([id, title, sub]) => /* @__PURE__ */ jsxs("button", { onClick: () => startLevel(id), className: `w-full rounded-xl border px-3 py-3 text-left transition ${levelId === id ? "border-[#ff7a00] bg-[#ff7a00]/15 shadow-[0_0_22px_rgba(255,122,0,.2)]" : "border-[#273349] bg-white/[.02] hover:border-orange-400/50"}`, children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("span", { className: "font-bold", children: title }),
              /* @__PURE__ */ jsx("span", { children: solved.includes(id) ? "\u2705" : "\u203A" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-0.5 text-sm text-[#a7b2c5]", children: sub })
          ] }, id)) }),
          /* @__PURE__ */ jsxs("button", { onClick: resetAll, className: "mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#273349] px-3 py-2 text-sm font-bold hover:bg-white/5", children: [
            /* @__PURE__ */ jsx(RotateCcw, { size: 16 }),
            " Reiniciar partida"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-[#ffd166]", children: "\u2696\uFE0F sort() vs toSorted()" }),
          /* @__PURE__ */ jsxs("div", { className: "font-code mt-3 space-y-2 text-xs leading-relaxed", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-orange-300", children: "sort()" }),
              " cambia el array original."
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-emerald-300", children: "toSorted()" }),
              " devuelve una copia nueva."
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "rounded-lg bg-black/40 p-2 text-[#a7b2c5]", children: [
              "const a=[3,1,2];",
              /* @__PURE__ */ jsx("br", {}),
              "a.sort() // a = [1,2,3]",
              /* @__PURE__ */ jsx("br", {}),
              "a.toSorted() // copia ordenada"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold tracking-widest", children: "\u{1F9FE} BIT\xC1CORA" }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: logs.map((l, i) => /* @__PURE__ */ jsx("p", { className: "border-l-2 border-orange-500 pl-3 text-sm leading-snug text-[#cbd5e6] [overflow-wrap:anywhere]", children: l }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "min-w-0 space-y-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-2xl border border-orange-400 bg-gradient-to-r from-[#ff7a00] to-[#ff9d2e] p-4 text-black shadow-[0_0_42px_rgba(255,122,0,.28)]", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs font-bold tracking-[.22em]", children: "\u{1F9D1}\u{1F373} CLIENTE" }),
              /* @__PURE__ */ jsxs("p", { className: "mt-1 text-xl font-bold leading-tight sm:text-2xl", children: [
                "\u201C",
                level.request,
                "\u201D"
              ] })
            ] }),
            levelId === "19" && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 rounded-xl bg-black/25 px-3 py-2 font-bold", children: [
              /* @__PURE__ */ jsx(Timer, { size: 18 }),
              fmt(timeLeft)
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm font-semibold", children: "Lee la petici\xF3n. Haz clic en los platos en el orden correcto." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "panel p-4 sm:p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-3 flex flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold tracking-widest text-orange-300", children: "MEN\xDA DESORDENADO" }),
            /* @__PURE__ */ jsx("span", { className: "text-xs font-semibold text-[#a7b2c5]", children: "Clic simple \xB7 SIN arrastrar" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid gap-2 sm:grid-cols-2 xl:grid-cols-3", children: display.map((d, idx) => {
            const used = order.some((x) => x.id === d.id);
            return /* @__PURE__ */ jsxs("button", { disabled: used, onClick: () => pick(d), className: `dish-card relative rounded-2xl border p-3 text-left ${used ? "border-[#273349] bg-black/30 opacity-35" : "border-[#354462] bg-[#111c31]"}`, children: [
              /* @__PURE__ */ jsx("span", { className: "absolute right-3 top-2 text-xs text-[#a7b2c5]", children: idx + 1 }),
              /* @__PURE__ */ jsx("span", { className: "text-3xl", children: d.emoji }),
              /* @__PURE__ */ jsx("div", { className: "mt-2 text-lg font-bold leading-tight", children: d.name }),
              /* @__PURE__ */ jsxs("div", { className: "mt-1 flex gap-2 text-sm", children: [
                /* @__PURE__ */ jsx("span", { className: "rounded-full bg-[#ff7a00]/15 px-2 py-0.5 font-bold text-orange-200", children: priceLabel(d) }),
                /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-white/5 px-2 py-0.5 text-[#cbd5e6]", children: [
                  d.calories,
                  " kcal"
                ] })
              ] }),
              used && /* @__PURE__ */ jsx("span", { className: "mt-2 block text-xs font-bold text-emerald-300", children: "\u2713 EN TU ORDEN" })
            ] }, d.id);
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsx("p", { className: "mb-2 text-sm font-bold tracking-widest text-[#a7b2c5]", children: "TU ORDEN:" }),
            /* @__PURE__ */ jsx("div", { className: `flex min-h-[64px] flex-wrap gap-2 rounded-xl border border-dashed p-2 ${feedback?.ok === false ? "shake border-red-400" : ""}`, children: order.length === 0 ? /* @__PURE__ */ jsx("span", { className: "self-center px-2 text-sm text-[#a7b2c5]", children: "Toca un plato para empezar\u2026" }) : order.map((d, i) => /* @__PURE__ */ jsxs("span", { className: `pop rounded-xl px-3 py-2 text-sm font-bold ${feedback?.errorIndex === i ? "bg-[#ff4d62] text-white" : feedback?.ok ? "bg-emerald-500 text-white" : "bg-[#ff7a00] text-black"}`, children: [
              i + 1,
              ". ",
              d.emoji,
              " ",
              d.name
            ] }, d.id)) })
          ] }),
          levelId === "4" && /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-xl border border-amber-400/40 bg-amber-400/5 p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-amber-200", children: "\u{1FAA4} Elige el comparador (Nivel 4)" }),
            /* @__PURE__ */ jsx("div", { className: "mt-2 space-y-2", children: ["a.precio - b.precio", "parseFloat(a.precio) - parseFloat(b.precio)", "a.precio < b.precio"].map((opt) => /* @__PURE__ */ jsxs("label", { className: `flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 font-code text-xs sm:text-sm ${trapChoice === opt ? "border-[#ff7a00] bg-[#ff7a00]/10" : "border-[#273349]"}`, children: [
              /* @__PURE__ */ jsx("input", { type: "radio", name: "trap", checked: trapChoice === opt, onChange: () => setTrapChoice(opt), className: "accent-[#ff7a00]" }),
              /* @__PURE__ */ jsxs("span", { className: "[overflow-wrap:anywhere]", children: [
                opt,
                opt.includes("parseFloat") ? " \xB7 correcto" : opt.includes("<") ? " \xB7 booleano trampa" : " \xB7 sin parseFloat"
              ] })
            ] }, opt)) })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "mt-4 block", children: [
            /* @__PURE__ */ jsxs("span", { className: "mb-1 flex items-center gap-2 text-sm font-bold text-[#ffd166]", children: [
              /* @__PURE__ */ jsx(Code2, { size: 16 }),
              " Escribe el c\xF3digo (opcional \xB7 +5 si es correcto)"
            ] }),
            /* @__PURE__ */ jsx("input", { value: codeInput, onChange: (e) => setCodeInput(e.target.value), placeholder: "Ej.: a.precio - b.precio", className: "font-code w-full rounded-xl border border-[#273349] bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-[#ff7a00]" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxs("button", { onClick: undo, disabled: !order.length, className: "flex items-center gap-2 rounded-xl border border-[#273349] px-4 py-3 font-bold disabled:opacity-40 hover:bg-white/5", children: [
              /* @__PURE__ */ jsx(Undo2, { size: 18 }),
              " \u21A9 DESHACER \xDALTIMO"
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: shuffleMenu, className: "flex items-center gap-2 rounded-xl border border-[#273349] px-4 py-3 font-bold hover:bg-white/5", children: [
              /* @__PURE__ */ jsx(Shuffle, { size: 18 }),
              " \u{1F500} MEZCLAR"
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: check, className: "flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#8dff57] px-4 py-3 font-bold text-black shadow-[0_0_24px_rgba(141,255,87,.25)] hover:brightness-110", children: [
              /* @__PURE__ */ jsx(Check, { size: 18 }),
              " \u2705 COMPROBAR"
            ] })
          ] }),
          feedback && /* @__PURE__ */ jsx("div", { className: `mt-3 rounded-xl border p-3 font-bold ${feedback.ok ? "border-emerald-400 bg-emerald-400/10 text-emerald-200" : "border-red-400 bg-red-500/10 text-red-200"}`, children: feedback.text }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm text-[#a7b2c5]", children: "Puntuaci\xF3n: acierto +10 (Nivel 19: +20) \xB7 primer error \u22123 \xB7 trampa parseFloat \u22125 \xB7 c\xF3digo correcto +5." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "panel p-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold tracking-widest text-orange-300", children: "\u{1F50D} PANEL DE MUTACI\xD3N" }),
          /* @__PURE__ */ jsxs("div", { className: "font-code mt-3 rounded-xl bg-black/50 p-3 text-xs leading-relaxed sm:text-sm", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#a7b2c5]", children: "Antes:" }),
              " [",
              before,
              "]"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[#a7b2c5]", children: "Despu\xE9s:" }),
              " [",
              after,
              "]"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-3 text-orange-200", children: "sort() mut\xF3 el array original. toSorted() NO mutar\xEDa." })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxs("section", { className: "panel overflow-hidden", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between border-b border-[#273349] bg-black/30 px-4 py-3", children: [
            /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-2 font-bold tracking-widest", children: [
              /* @__PURE__ */ jsx(Terminal, { size: 18, className: "text-orange-400" }),
              " DEPURADOR AVANZADO: .sort()"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "flicker h-2 w-2 rounded-full bg-emerald-400" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "scroll-thin max-h-[560px] space-y-2 overflow-y-auto p-4 font-code text-xs leading-relaxed sm:text-[13px]", children: debug.map((line, i) => /* @__PURE__ */ jsx("p", { className: line.startsWith(">") ? "text-[#8dff57]" : line.startsWith("\u{1F9E0}") ? "text-[#ffd166]" : "text-[#cbd5e6]", children: line }, i)) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-2 font-bold", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "text-[#ffd166]" }),
            " REVELADO AL COMPROBAR"
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "font-code mt-3 rounded-xl bg-black/50 p-3 text-xs leading-relaxed sm:text-sm", children: [
            "platos.sort((a, b) => ",
            level.code,
            ")",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsxs("span", { className: "text-[#a7b2c5]", children: [
              "// \u2192 [",
              level.expected.map((d) => `${d.emoji} ${priceLabel(d)}`).join(", "),
              "]"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-3 text-sm leading-relaxed text-[#cbd5e6]", children: level.lesson })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-2 font-bold", children: [
            /* @__PURE__ */ jsx(ChefHat, { className: "text-orange-300" }),
            " C\xD3MO SE JUEGA"
          ] }),
          /* @__PURE__ */ jsxs("ol", { className: "mt-3 space-y-2 text-sm leading-relaxed text-[#cbd5e6]", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("b", { className: "text-white", children: "1." }),
              " Lee la caja naranja del cliente."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("b", { className: "text-white", children: "2." }),
              " Toca los platos en el orden correcto."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("b", { className: "text-white", children: "3." }),
              " Deshaz el \xFAltimo si te equivocas."
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx("b", { className: "text-white", children: "4." }),
              " Pulsa COMPROBAR con todos los platos."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-2 rounded-xl bg-[#ff7a00]/10 px-3 py-2 text-sm font-bold text-orange-200", children: [
            /* @__PURE__ */ jsx(UtensilsCrossed, { size: 17 }),
            " El comparador decide: negativo, cero o positivo."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-[#ffd166]", children: "\u26A0\uFE0F TRAMPA CL\xC1SICA" }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm leading-relaxed text-[#cbd5e6]", children: "Sin parseFloat, sort() con texto compara \u201C1\u201D < \u201C8\u201D de forma lexicogr\xE1fica. Por eso [\u201C10\u20AC\u201D, \u201C12\u20AC\u201D, \u201C15\u20AC\u201D, \u201C18\u20AC\u201D, \u201C8\u20AC\u201D] sale mal." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "mt-4 flex flex-wrap items-center justify-between gap-2 pb-2 text-xs text-[#a7b2c5]", children: [
      /* @__PURE__ */ jsx("span", { children: "El Orden Perfecto \xB7 Aprende sort() jugando." }),
      /* @__PURE__ */ jsx("span", { children: "Tu progreso se guarda autom\xE1ticamente." })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "sr-only", children: "Fin del juego" })
  ] }) });
}
export {
  App as default
};
