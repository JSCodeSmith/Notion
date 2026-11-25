/* Convertido automáticamente desde Apuntes/toSorted/App.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Shield, Bug, RotateCcw, Undo2, Lightbulb, ChevronLeft, ChevronRight, ScrollText, Sparkles, FlaskConical } from "lucide-react";
const survivors = [
  { name: "Ana", emoji: "\u{1F469}", edad: 25 },
  { name: "Luis", emoji: "\u{1F468}", edad: 40 },
  { name: "Marta", emoji: "\u{1F9D1}", edad: 18 },
  { name: "Pedro", emoji: "\u{1F474}", edad: 60 },
  { name: "Sof\xEDa", emoji: "\u{1F466}", edad: 12 }
];
const expected1 = [...survivors].sort((a, b) => a.edad - b.edad);
const weapons = [
  { name: "Pistola", emoji: "\u{1F52B}", dano: 30 },
  { name: "Daga", emoji: "\u{1F5E1}", dano: 15 },
  { name: "Arco", emoji: "\u{1F3F9}", dano: 40 },
  { name: "Hacha", emoji: "\u{1FA93}", dano: 60 },
  { name: "Martillo", emoji: "\u{1F528}", dano: 25 }
];
const expected2 = [...weapons].sort((a, b) => b.dano - a.dano);
const resources = [
  { nombre: "Pan", emoji: "\u{1F35E}", cantidad: "100\u{1F35E}" },
  { nombre: "Agua", emoji: "\u{1F4A7}", cantidad: "80\u{1F4A7}" },
  { nombre: "Carne", emoji: "\u{1F356}", cantidad: "100\u{1F356}" },
  { nombre: "Trigo", emoji: "\u{1F33E}", cantidad: "60\u{1F33E}" },
  { nombre: "Queso", emoji: "\u{1F9C0}", cantidad: "80\u{1F9C0}" }
];
const defenders = [
  { nombre: "Kael", emoji: "\u{1F409}", poder: "100\u2694", edad: 30 },
  { nombre: "Lyra", emoji: "\u{1F9DD}", poder: "80\u2694", edad: 25 },
  { nombre: "Mordo", emoji: "\u{1F9D9}", poder: "100\u2694", edad: 40 },
  { nombre: "Sylas", emoji: "\u{1F3F9}", poder: "60\u2694", edad: 20 },
  { nombre: "bren", emoji: "\u{1F6E1}", poder: "80\u2694", edad: 35 }
];
const expectedDef = [...defenders].sort((a, b) => parseInt(b.poder) - parseInt(a.poder) || a.edad - b.edad || a.nombre.localeCompare(b.nombre));
const levels = [
  { id: 1, title: "Supervivientes", tag: "Clic", icon: "\u{1F465}" },
  { id: 2, title: "Armer\xEDa", tag: "Arrastrar", icon: "\u2694\uFE0F" },
  { id: 3, title: "Predicci\xF3n Mago", tag: "Predecir", icon: "\u{1F9D9}" },
  { id: 4, title: "Comparador Inventario", tag: "Escribir", icon: "\u{1F4E6}" },
  { id: 5, title: "Sello Test", tag: "Test", icon: "\u{1F6E1}\uFE0F" },
  { id: 6, title: "Jefe Final \xB7 Horda Triple", tag: "Ataque", icon: "\u{1F409}" }
];
const l3Rounds = [
  { title: "RONDA A \xB7 sort() sobre [3,1,2]", arr: "[3,1,2]", op: "sort((a,b)=>a-b)", q: "\xBFQu\xE9 pasar\xE1 con el original si uso sort((a,b)=>a-b)?", opts: ["Sigue [3,1,2]", "Se muta a [1,2,3]"], correct: 1, explain: "sort muta el original." },
  { title: "RONDA B \xB7 toSorted() sobre [3,1,2]", arr: "[3,1,2]", op: "toSorted((a,b)=>a-b)", q: "\xBFQu\xE9 pasar\xE1 si uso toSorted((a,b)=>a-b)?", opts: ["Sigue [3,1,2]", "Se muta a [1,2,3]"], correct: 0, explain: "toSorted devuelve copia nueva; el original sigue [3,1,2]." },
  { title: "RONDA C \xB7 sort() SIN comparador", arr: '["10","9","2"]', op: "sort()", q: '\xBFQu\xE9 pasar\xE1 si uso sort() SIN comparador en ["10","9","2"]?', opts: ['Sigue ["10","9","2"]', 'Se muta a ["2","9","10"] num\xE9rico', 'Se muta a ["10","2","9"] lexicogr\xE1fico'], correct: 2, explain: "sort() sin comparador ordena strings lexicogr\xE1ficamente y muta." },
  { title: "RONDA D \xB7 toSorted() con Number", arr: '["10","9","2"]', op: "toSorted((a,b)=>Number(a)-Number(b))", q: "\xBFQu\xE9 pasar\xE1 si uso toSorted((a,b)=>Number(a)-Number(b))?", opts: ['Sigue ["10","9","2] \u2014 el original queda intacto', 'Se muta a ["2","9","10]'], correct: 0, explain: "toSorted ordena num\xE9ricamente sin mutar el original." }
];
const l5Rounds = [
  { arr: [10, 9, 2, 100, 5], label: "[10, 9, 2, 100, 5]" },
  { arr: [42, 7, 19, 3, 88, 15], label: "[42, 7, 19, 3, 88, 15]" },
  { arr: [1e3, 99, 9, 500, 50], label: "[1000, 99, 9, 500, 50]" }
];
async function api(action, args) {
  const r = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error(j.error || `Error ${r.status}`);
  return j.data;
}
function App() {
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState([]);
  const [level, setLevel] = useState(1);
  const [feedback, setFeedback] = useState(null);
  const [shake, setShake] = useState(false);
  const [glow, setGlow] = useState(false);
  const [logs, setLogs] = useState([{ id: 1, text: "> Consola lista. El registro original es sagrado.", kind: "info" }, { id: 2, text: "> \u2696\uFE0F sort() muta | toSorted() NO muta", kind: "info" }]);
  const [bitacora, setBitacora] = useState(["Aria abri\xF3 el registro oficial del refugio."]);
  const [recordId, setRecordId] = useState(null);
  const [saveNote, setSaveNote] = useState("Progreso guardado en el registro del refugio.");
  const loadedRef = useRef(false);
  const logId = useRef(3);
  const pushLog = (text, kind = "info") => setLogs((p) => [{ id: logId.current++, text, kind }, ...p].slice(0, 40));
  const addPoints = (n, why) => {
    setPoints((p) => p + n);
    if (n > 0) {
      setGlow(true);
      setTimeout(() => setGlow(false), 1100);
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
    setBitacora((b) => [`${why} (${n >= 0 ? "+" : ""}${n} pts)`, ...b].slice(0, 12));
  };
  const markSolved = (id) => setSolved((s) => s.includes(id) ? s : [...s, id]);
  useEffect(() => {
    (async () => {
      try {
        const data = await api("records.list", { collection: "refugio_progress" });
        const rec = data?.records?.[0];
        if (rec) {
          setRecordId(rec.id);
          const v = rec.value || {};
          if (typeof v.points === "number") setPoints(v.points);
          if (typeof v.streak === "number") setStreak(v.streak);
          if (Array.isArray(v.solved)) setSolved(v.solved);
          setSaveNote("Progreso recuperado del registro del refugio.");
        }
      } catch {
        setSaveNote("Sin conexi\xF3n con el registro guardado: juegas en esta sesi\xF3n.");
      }
      loadedRef.current = true;
    })();
  }, []);
  useEffect(() => {
    if (!loadedRef.current) return;
    const t = setTimeout(async () => {
      try {
        const value = { points, streak, solved, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
        if (recordId) {
          await api("records.replace", { collection: "refugio_progress", id: recordId, value });
        } else {
          const rec = await api("records.create", { collection: "refugio_progress", value, idempotency_key: `refugio-${Date.now()}` });
          if (rec?.id) setRecordId(rec.id);
        }
        setSaveNote("Progreso guardado en el registro del refugio.");
      } catch {
        setSaveNote("No se pudo guardar el progreso en esta sesi\xF3n.");
      }
    }, 600);
    return () => clearTimeout(t);
  }, [points, streak, solved, recordId]);
  const [picked1, setPicked1] = useState([]);
  const remaining1 = survivors.filter((s) => !picked1.includes(s));
  const check1 = () => {
    if (picked1.length < 5) {
      setFeedback({ type: "bad", text: "\u274C Elige los 5 supervivientes antes de comprobar." });
      pushLog("> toSorted() \xB7 copia incompleta", "bad");
      return;
    }
    const wrong = picked1.findIndex((s, i) => s.name !== expected1[i].name);
    if (wrong === -1) {
      addPoints(10, "Nivel 1 \xB7 Supervivientes ordenados");
      markSolved(1);
      setFeedback({ type: "ok", text: "\u2705 La copia est\xE1 ordenada y el registro original sigue intacto. toSorted no muta." });
      pushLog("> Ejecutando supervivientes.toSorted((a,b)=>a.edad-b.edad)", "ok");
      pushLog("> Original antes: [Ana 25, Luis 40, Marta 18, Pedro 60, Sof\xEDa 12] \xB7 Original despu\xE9s: INTACTO", "ok");
      pushLog("> Copia creada: [Sof\xEDa 12 \u2192 Marta 18 \u2192 Ana 25 \u2192 Luis 40 \u2192 Pedro 60]", "ok");
    } else {
      addPoints(-3, "Nivel 1 \xB7 Orden incorrecto");
      setFeedback({ type: "bad", text: `\u274C Fall\xF3 en la posici\xF3n ${wrong + 1}: pusiste ${picked1[wrong].name} (${picked1[wrong].edad}) pero deber\xEDa ir ${expected1[wrong].name} (${expected1[wrong].edad}). Orden correcto: Sof\xEDa (12) \u2192 Marta (18) \u2192 Ana (25) \u2192 Luis (40) \u2192 Pedro (60).` });
      pushLog("> toSorted() \xB7 comparaci\xF3n en posici\xF3n " + (wrong + 1) + " incorrecta", "bad");
    }
  };
  const [copy2, setCopy2] = useState([]);
  const [dragItem, setDragItem] = useState(null);
  const remaining2 = weapons.filter((w) => !copy2.includes(w));
  const addToCopy = (w) => {
    if (copy2.length < 5) setCopy2([...copy2, w]);
  };
  const move2 = (i, dir) => {
    const arr = [...copy2];
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setCopy2(arr);
  };
  const check2 = () => {
    if (copy2.length === 0) {
      addPoints(-10, "Nivel 2 \xB7 Original vac\xEDo / copia vac\xEDa");
      setFeedback({ type: "bad", text: "\u274C La copia est\xE1 vac\xEDa. El arsenal qued\xF3 sin ordenar. -10 puntos." });
      return;
    }
    const wrong = copy2.findIndex((w, i) => w.name !== expected2[i].name);
    if (copy2.length === 5 && wrong === -1) {
      addPoints(10, "Nivel 2 \xB7 Armer\xEDa ordenada");
      markSolved(2);
      setFeedback({ type: "ok", text: "\u2705 La copia est\xE1 ordenada de mayor a menor da\xF1o. El registro original sigue intacto." });
      pushLog("> Ejecutando armas.toSorted((a,b)=>b.da\xF1o-a.da\xF1o)", "ok");
      pushLog("> Copia: [Hacha 60 \u2192 Arco 40 \u2192 Pistola 30 \u2192 Martillo 25 \u2192 Daga 15] \xB7 Original INTACTO", "ok");
    } else {
      addPoints(-3, "Nivel 2 \xB7 Orden incorrecto");
      setFeedback({ type: "bad", text: "\u274C El orden no es correcto. Recuerda: descendente = el mayor primero. Orden correcto: Hacha (60) \u2192 Arco (40) \u2192 Pistola (30) \u2192 Martillo (25) \u2192 Daga (15)." });
      pushLog("> toSorted() \xB7 orden descendente incorrecto", "bad");
    }
  };
  const [round3, setRound3] = useState(0);
  const [choice3, setChoice3] = useState(null);
  const [streak3, setStreak3] = useState(0);
  const [done3, setDone3] = useState(false);
  const check3 = () => {
    if (choice3 === null) return;
    const r = l3Rounds[round3];
    if (choice3 === r.correct) {
      const ns = streak3 + 1;
      setStreak3(ns);
      addPoints(10, `Nivel 3 \xB7 Ronda ${"ABCD"[round3]} correcta`);
      setStreak((s) => s + 1);
      setFeedback({ type: "ok", text: "\u2705 Correcto. sort muta el original; toSorted no. El mago te revela un alijo de suministros." });
      pushLog(`> Ejecutando ${r.arr}.${r.op} \u2192 original ${r.correct === 0 ? "INTACTO" : "MUTADO"}`, "ok");
      if (ns === 4) {
        addPoints(5, "Nivel 3 \xB7 Bonus 4 rondas seguidas");
        setFeedback({ type: "ok", text: "\u2705 \xA14 rondas seguidas! +5 bonus. El mago te revela un alijo de suministros. El registro queda intacto." });
      }
      if (round3 === 3) {
        setDone3(true);
        markSolved(3);
      } else setRound3(round3 + 1);
      setChoice3(null);
    } else {
      setStreak3(0);
      addPoints(-3, "Nivel 3 \xB7 Predicci\xF3n incorrecta");
      setStreak(0);
      setFeedback({ type: "bad", text: "\u274C Incorrecto. toSorted devuelve copia nueva; el original sigue [3,1,2]." });
      pushLog(`> Predicci\xF3n fallida \xB7 ${r.explain}`, "bad");
    }
  };
  const [input4, setInput4] = useState("(a,b) => ");
  const [help4, setHelp4] = useState(false);
  const [tried4, setTried4] = useState(0);
  const check4 = () => {
    const v = input4.toLowerCase();
    const hasParse = v.includes("parseint");
    const hasLocale = v.includes("localecompare");
    if (!hasParse) {
      addPoints(-5, "Nivel 4 \xB7 Sin parseInt");
      setTried4((t) => t + 1);
      setFeedback({ type: "bad", text: '\u274C Sin parseInt, toSorted compara strings y ordena lexicogr\xE1ficamente ("100\u{1F35E}" < "80\u{1F35E}"). Necesitas convertir a n\xFAmero.' });
      pushLog("> toSorted(comparador) \xB7 falta parseInt", "bad");
      return;
    }
    if (!hasLocale) {
      addPoints(-5, "Nivel 4 \xB7 Sin localeCompare");
      setTried4((t) => t + 1);
      setFeedback({ type: "bad", text: "\u274C Los empates en cantidad no se ordenan por nombre. A\xF1ade || a.nombre.localeCompare(b.nombre)." });
      pushLog("> toSorted(comparador) \xB7 falta localeCompare", "bad");
      return;
    }
    try {
      const body = input4.split("=>")[1]?.trim() || "0";
      const fn = new Function("a", "b", `return ${body}`);
      const result = [...resources].toSorted(fn);
      const order = result.map((r) => r.nombre).join(",");
      if (order !== "Trigo,Agua,Queso,Carne,Pan") throw new Error("orden");
      const pts = help4 ? 5 : 15;
      addPoints(pts, help4 ? "Nivel 4 \xB7 Comparador con ayuda" : "Nivel 4 \xB7 Comparador perfecto");
      markSolved(4);
      setFeedback({ type: "ok", text: "\u2705 \xA1Comparador correcto! parseInt convierte los strings y localeCompare ordena los empates. El original sigue intacto." });
      pushLog("> Ejecutando recursos.toSorted((a,b)=>parseInt(a.cantidad)-parseInt(b.cantidad) || a.nombre.localeCompare(b.nombre))", "ok");
      pushLog("> Copia: [Trigo 60 \u2192 Agua 80 \u2192 Queso 80 \u2192 Carne 100 \u2192 Pan 100] \xB7 Original INTACTO", "ok");
    } catch {
      addPoints(-5, "Nivel 4 \xB7 Comparador incorrecto");
      setTried4((t) => t + 1);
      setFeedback({ type: "bad", text: "\u274C El comparador no produce el orden esperado. Revisa el orden: cantidad ascendente y nombre en empates." });
    }
  };
  const [round5, setRound5] = useState(0);
  const [choice5, setChoice5] = useState(null);
  const [done5, setDone5] = useState(false);
  const check5 = () => {
    if (choice5 === null) return;
    const r = l5Rounds[round5];
    if (choice5 === 0) {
      addPoints(-10, "Nivel 5 \xB7 sort muta el original");
      setFeedback({ type: "bad", text: "\u274C sort MUTA el original. El registro se corrompe. Usa toSorted." });
      pushLog(`> Ejecutando original.sort(...) sobre ${r.label} \u2192 ORIGINAL MUTADO \xB7 El registro se corrompi\xF3. La horda entra.`, "bad");
    } else if (choice5 === 1) {
      addPoints(15, "Nivel 5 \xB7 toSorted");
      setFeedback({ type: "ok", text: "\u2705 \xA1Correcto! toSorted devuelve copia ordenada sin mutar el original. El refugio est\xE1 a salvo." });
      pushLog(`> Ejecutando original.toSorted((a,b)=>a-b) sobre ${r.label} \u2192 copia ordenada \xB7 original INTACTO`, "ok");
      advance5();
    } else {
      addPoints(10, "Nivel 5 \xB7 Spread v\xE1lido");
      setFeedback({ type: "ok", text: "\u2705 Tambi\xE9n es v\xE1lido: [...original].sort(...) copia primero y ordena la copia. Pero toSorted es m\xE1s directo." });
      pushLog(`> Ejecutando [...original].sort((a,b)=>a-b) \u2192 copia ordenada \xB7 original INTACTO`, "ok");
      advance5();
    }
    setChoice5(null);
  };
  const advance5 = () => {
    if (round5 === 2) {
      setDone5(true);
      markSolved(5);
    } else setRound5(round5 + 1);
  };
  const [input6, setInput6] = useState("(a,b) => ");
  const [help6, setHelp6] = useState(false);
  const check6 = () => {
    const v = input6.toLowerCase();
    if (!v.includes("parseint")) {
      addPoints(-5, "Nivel 6 \xB7 Sin parseInt");
      setFeedback({ type: "bad", text: "\u274C Sin parseInt, el poder se compara como string." });
      pushLog("> Jefe final \xB7 falta parseInt", "bad");
      return;
    }
    if (!v.includes("b.poder") || !v.includes("a.poder") || v.indexOf("b.poder") > v.indexOf("a.poder") && !v.includes("b.poder)-parseint(a.poder)")) {
    }
    const norm = v.replace(/\s+/g, "");
    if (!norm.includes("parseint(b.poder)-parseint(a.poder)")) {
      addPoints(-5, "Nivel 6 \xB7 Poder ascendente");
      setFeedback({ type: "bad", text: "\u274C El poder debe ser descendente: parseInt(b.poder)-parseInt(a.poder)." });
      pushLog("> Jefe final \xB7 poder debe ser descendente", "bad");
      return;
    }
    if (!v.includes("edad")) {
      addPoints(-5, "Nivel 6 \xB7 Sin edad");
      setFeedback({ type: "bad", text: "\u274C Los empates en poder no se ordenan por edad. A\xF1ade || a.edad-b.edad." });
      return;
    }
    if (!v.includes("localecompare")) {
      addPoints(-5, "Nivel 6 \xB7 Sin localeCompare");
      setFeedback({ type: "bad", text: "\u274C Los empates en poder y edad no se ordenan por nombre. A\xF1ade || a.nombre.localeCompare(b.nombre)." });
      return;
    }
    try {
      const body = input6.split("=>")[1]?.trim() || "0";
      const fn = new Function("a", "b", `return ${body}`);
      const result = [...defenders].toSorted(fn);
      if (result.map((d) => d.nombre).join(",") !== "Kael,Mordo,Lyra,bren,Sylas") throw new Error("orden");
      addPoints(help6 ? 10 : 20, help6 ? "Nivel 6 \xB7 Jefe con ayuda" : "Nivel 6 \xB7 Jefe final derrotado");
      markSolved(6);
      setFeedback({ type: "ok", text: "\u2705 \xA1Comparador triple correcto! Poder descendente, edad ascendente, nombre alfab\xE9tico. El refugio resiste el ataque. El original sigue intacto." });
      pushLog("> Ejecutando defensores.toSorted((a,b)=>parseInt(b.poder)-parseInt(a.poder) || a.edad-b.edad || a.nombre.localeCompare(b.nombre))", "ok");
      pushLog("> Copia: [Kael \u2192 Mordo \u2192 Lyra \u2192 bren \u2192 Sylas] \xB7 Original INTACTO", "ok");
    } catch {
      addPoints(-5, "Nivel 6 \xB7 Comparador incorrecto");
      setFeedback({ type: "bad", text: "\u274C El comparador no produce el orden esperado: Kael \u2192 Mordo \u2192 Lyra \u2192 bren \u2192 Sylas." });
    }
  };
  const resetAll = () => {
    setPoints(0);
    setStreak(0);
    setSolved([]);
    setPicked1([]);
    setCopy2([]);
    setRound3(0);
    setStreak3(0);
    setDone3(false);
    setRound5(0);
    setDone5(false);
    setInput4("(a,b) => ");
    setInput6("(a,b) => ");
    setHelp4(false);
    setHelp6(false);
    setFeedback(null);
    setBitacora(["Aria reinici\xF3 el registro. El original sigue intacto."]);
    pushLog("> Reinicio \xB7 el registro original queda INTACTO", "info");
  };
  const originalPreview = level === 1 ? "[Ana 25, Luis 40, Marta 18, Pedro 60, Sof\xEDa 12]" : level === 2 ? "[Pistola 30, Daga 15, Arco 40, Hacha 60, Martillo 25]" : level === 3 ? "[3, 1, 2]" : level === 4 ? "[Pan 100, Agua 80, Carne 100, Trigo 60, Queso 80]" : level === 5 ? l5Rounds[round5].label : "[Kael 100, Lyra 80, Mordo 100, Sylas 60, bren 80]";
  return /* @__PURE__ */ jsx("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "radial-gradient(900px 380px at 18% -5%, rgba(57,255,20,.14), transparent 60%), radial-gradient(700px 400px at 90% 10%, rgba(255,122,0,.13), transparent 55%), #030508" }, className: "overflow-x-clip", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1500px] px-3 sm:px-5 pb-6", children: [
    /* @__PURE__ */ jsxs("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)" }, className: "sticky z-20 -mx-3 sm:-mx-5 px-3 sm:px-5 pt-3 pb-3 bg-[#030508]/90 backdrop-blur", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 sm:gap-3 justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(1.5rem,4vw,2.4rem)] leading-none font-bold tracking-tight", children: [
            /* @__PURE__ */ jsx("span", { className: "neon", children: "\u{1F9DF} EL \xDALTIMO REFUGIO" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "orange", children: "- ARIA" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-[13px] sm:text-sm text-[#9db8a8] mt-1", children: [
            "Eres Aria, l\xEDder del refugio. El registro original es sagrado: nunca lo mutes. Ordena solo copias con ",
            /* @__PURE__ */ jsx("code", { className: "mono text-[#39ff14]", children: "toSorted()" }),
            "."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 items-center", children: [
          /* @__PURE__ */ jsx("span", { className: "chip", children: "\u{1F4E6} REGISTRO GUARDADO \u2705" }),
          /* @__PURE__ */ jsxs("span", { className: "chip", style: { borderColor: "#ffd23f", color: "#ffd23f" }, children: [
            "\u{1F3C6} PUNTOS: ",
            points
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "chip", style: { borderColor: "#ff7a00", color: "#ffb066" }, children: [
            "\u{1F525} RACHA: ",
            streak
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-2 h-2 rounded-full bg-[#101a13] overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-gradient-to-r from-[#39ff14] to-[#ff7a00] transition-all", style: { width: `${solved.length / 6 * 100}%` } }) }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#9db8a8] mt-1", children: [
        solved.length,
        "/6 niveles sellados \xB7 ",
        saveNote
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "grid gap-4 mt-3 lg:grid-cols-[300px_1fr_420px] items-start", children: [
      /* @__PURE__ */ jsxs("aside", { className: "space-y-4 lg:sticky lg:top-[92px]", children: [
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("h2", { className: "font-bold text-lg flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(ScrollText, { size: 19, className: "text-[#39ff14]" }),
            " \u{1F4CB} NIVELES"
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: levels.map((l) => /* @__PURE__ */ jsxs("button", { onClick: () => {
            setLevel(l.id);
            setFeedback(null);
          }, className: `w-full text-left rounded-xl px-3 py-2.5 border flex items-center gap-3 ${level === l.id ? "border-[#39ff14] bg-[#122b18]" : "border-[#264437] bg-[#0a1410]"}`, children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: l.icon }),
            /* @__PURE__ */ jsxs("span", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxs("span", { className: "block font-bold leading-tight [overflow-wrap:anywhere]", children: [
                "Nivel ",
                l.id,
                " \xB7 ",
                l.title
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-[#9db8a8]", children: l.tag })
            ] }),
            /* @__PURE__ */ jsx("span", { children: solved.includes(l.id) ? "\u2705" : "\u25CB" })
          ] }, l.id)) })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4 border-[#ff7a00]/50", style: { borderColor: "rgba(255,122,0,.45)" }, children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold text-[#ff7a00]", children: "sort() vs toSorted()" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 space-y-2 text-sm leading-snug", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-[#2a0f0f] border border-red-900/60 p-2.5", children: [
              /* @__PURE__ */ jsx("b", { className: "text-red-300", children: "sort() \u274C MUTA" }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("code", { className: "mono text-xs", children: "arr.sort()" }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-[#c9a9a9]", children: "Cambia el original. Corrompe el registro." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-[#0f2a12] border border-emerald-900/60 p-2.5", children: [
              /* @__PURE__ */ jsx("b", { className: "text-[#39ff14]", children: "toSorted() \u2705 NO MUTA" }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("code", { className: "mono text-xs", children: "arr.toSorted()" }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { className: "text-[#b8d8c2]", children: "Devuelve copia nueva. Original intacto." })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-[#9db8a8] text-xs", children: [
              "Regla de oro: si ves ",
              /* @__PURE__ */ jsx("code", { className: "mono", children: "sort()" }),
              " sobre el original, el refugio pierde puntos."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold flex gap-2 items-center", children: [
            /* @__PURE__ */ jsx(Sparkles, { size: 17, className: "text-[#ffd23f]" }),
            " \u{1F4DC} BIT\xC1CORA"
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "mt-2 space-y-1.5 text-[13px] text-[#c8e8d2]", children: bitacora.map((b, i) => /* @__PURE__ */ jsxs("li", { className: "[overflow-wrap:anywhere]", children: [
            "\u2022 ",
            b
          ] }, i)) }),
          /* @__PURE__ */ jsxs("button", { onClick: resetAll, className: "btn btn-ghost w-full mt-3 flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsx(RotateCcw, { size: 16 }),
            " Reiniciar partida"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("main", { className: "space-y-4 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "panel p-4 sm:p-5 flex flex-wrap gap-3 items-end justify-between", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("p", { className: "text-xs tracking-[.2em] text-[#9db8a8] font-bold", children: [
              "NIVEL ",
              level,
              " \xB7 ",
              levels[level - 1].title.toUpperCase()
            ] }),
            /* @__PURE__ */ jsx("h2", { className: "text-[clamp(1.4rem,3vw,2rem)] leading-tight font-bold", children: level === 1 ? "Los Supervivientes" : level === 2 ? "La Armer\xEDa" : level === 3 ? "La Predicci\xF3n del Mago" : level === 4 ? "El Comparador del Inventario" : level === 5 ? "El Sello del Refugio" : "El Ataque de la Horda" })
          ] }),
          /* @__PURE__ */ jsx("span", { className: "chip", children: solved.includes(level) ? "\u2705 NIVEL SELLADO" : "\u23F3 EN CURSO" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ jsxs("div", { className: `panel p-4 ${shake ? "shake" : ""}`, style: { borderColor: "rgba(255,122,0,.6)" }, children: [
            /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-2", children: [
              /* @__PURE__ */ jsx("h3", { className: "font-bold text-[#ff9a3d] [overflow-wrap:anywhere]", children: "\u{1F512} REGISTRO ORIGINAL BLOQUEADO" }),
              /* @__PURE__ */ jsx("span", { className: "chip", style: { borderColor: "#ff7a00", color: "#ffb066" }, children: "INTACTO" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#9db8a8] mt-1", children: [
              "No lo toques. Solo lectura. ",
              /* @__PURE__ */ jsx("code", { className: "mono", children: "sort()" }),
              " aqu\xED = -10."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 rounded-lg bg-[#1a0e05] border border-[#4a2a0f] p-3 mono text-[13px] leading-relaxed [overflow-wrap:anywhere]", children: originalPreview }),
            /* @__PURE__ */ jsx("p", { className: "text-xs mt-2 text-[#ffb066]", children: "\u{1F512} Candado activo \xB7 El original no se puede arrastrar ni editar." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `panel p-4 ${glow ? "glow" : ""}`, style: { borderColor: "rgba(57,255,20,.45)" }, children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-[#39ff14]", children: "\u{1F4C4} COPIA ORDENADA" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9db8a8] mt-1", children: "Aqu\xED s\xED puedes ordenar. Es una copia nueva." }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 min-h-[86px] rounded-lg bg-[#07130b] border border-[#23452e] p-3 mono text-[13px] leading-relaxed [overflow-wrap:anywhere]", children: [
              level === 1 && (picked1.length ? picked1.map((s) => `${s.emoji} ${s.name} ${s.edad}`).join(" \u2192 ") : "Copia vac\xEDa \u2014 haz clic en supervivientes en orden."),
              level === 2 && (copy2.length ? copy2.map((w) => `${w.emoji} ${w.name} ${w.dano}`).join(" \u2192 ") : "Copia vac\xEDa \u2014 arrastra o toca un arma."),
              level === 3 && "La copia aparece cuando el mago ejecuta tu predicci\xF3n.",
              level === 4 && "La copia aparecer\xE1 al comprobar tu comparador.",
              level === 5 && "Elige una opci\xF3n y mira qu\xE9 pasa con original y copia.",
              level === 6 && "La copia aparecer\xE1 al comprobar tu comparador triple."
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs mt-2 text-[#9fe8b0]", children: [
              "\u2705 ",
              /* @__PURE__ */ jsx("code", { className: "mono", children: "toSorted()" }),
              " crea este panel sin tocar el original."
            ] })
          ] })
        ] }),
        feedback && /* @__PURE__ */ jsx("div", { className: `panel p-4 ${feedback.type === "ok" ? "glow" : feedback.type === "bad" ? "shake" : ""}`, style: { borderColor: feedback.type === "ok" ? "#39ff14" : "#ff3b3b" }, children: /* @__PURE__ */ jsx("p", { className: `font-bold leading-snug [overflow-wrap:anywhere] ${feedback.type === "ok" ? "text-[#39ff14]" : "text-[#ff8a8a]"}`, children: feedback.text }) }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4 sm:p-5", children: [
          level === 1 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("p", { className: "text-[#c8e8d2]", children: [
              /* @__PURE__ */ jsx("b", { children: "Objetivo:" }),
              " ordena por edad ascendente haciendo clic en el orden correcto. Comparador: ",
              /* @__PURE__ */ jsx("code", { className: "mono text-[#39ff14]", children: "(a,b)=>a.edad-b.edad" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2", children: [
              remaining1.map((s) => /* @__PURE__ */ jsxs("button", { onClick: () => setPicked1([...picked1, s]), className: "item hover:border-[#39ff14]", children: [
                /* @__PURE__ */ jsxs("span", { children: [
                  /* @__PURE__ */ jsx("span", { className: "text-xl mr-2", children: s.emoji }),
                  /* @__PURE__ */ jsx("b", { children: s.name }),
                  " \xB7 ",
                  s.edad,
                  " a\xF1os"
                ] }),
                /* @__PURE__ */ jsx("span", { className: "text-[#39ff14]", children: "\uFF0B" })
              ] }, s.name)),
              remaining1.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-[#9db8a8] col-span-full", children: "Todos colocados. Comprueba la copia." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxs("button", { className: "btn btn-ghost flex gap-2 items-center", onClick: () => setPicked1(picked1.slice(0, -1)), children: [
                /* @__PURE__ */ jsx(Undo2, { size: 16 }),
                " Deshacer \xFAltimo"
              ] }),
              /* @__PURE__ */ jsx("button", { className: "btn btn-green", onClick: check1, children: "Comprobar copia" }),
              /* @__PURE__ */ jsx("button", { className: "btn btn-ghost", onClick: () => setPicked1([]), children: "Vaciar copia" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mono text-xs mt-4 bg-black/40 p-3 rounded-lg [overflow-wrap:anywhere]", children: "const copia = supervivientes.toSorted((a,b)=>a.edad-b.edad)" })
          ] }),
          level === 2 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("p", { className: "text-[#c8e8d2]", children: [
              /* @__PURE__ */ jsx("b", { children: "Objetivo:" }),
              " arrastra armas a la copia, ordenadas por da\xF1o ",
              /* @__PURE__ */ jsx("b", { children: "descendente" }),
              ". En m\xF3vil: toca un arma y usa \u25C0 \u25B6 para reordenar."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "grid md:grid-cols-2 gap-3 mt-3", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-[#ffb066] mb-2", children: "ALMAC\xC9N \u2014 toca o arrastra" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  remaining2.map((w) => /* @__PURE__ */ jsxs("div", { draggable: true, onDragStart: () => setDragItem(w), onDragEnd: () => setDragItem(null), className: "item cursor-grab", children: [
                    /* @__PURE__ */ jsxs("span", { children: [
                      w.emoji,
                      " ",
                      /* @__PURE__ */ jsx("b", { children: w.name }),
                      " \xB7 da\xF1o ",
                      w.dano
                    ] }),
                    /* @__PURE__ */ jsx("button", { className: "btn btn-orange !py-1.5 !px-3 text-sm", onClick: () => addToCopy(w), children: "A\xF1adir \u2192" })
                  ] }, w.name)),
                  remaining2.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-[#9db8a8]", children: "Almac\xE9n vac\xEDo." })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { onDragOver: (e) => e.preventDefault(), onDrop: (e) => {
                e.preventDefault();
                if (dragItem) addToCopy(dragItem);
              }, className: "rounded-xl border border-dashed border-[#39ff14]/60 bg-[#07130b] p-3 min-h-[180px]", children: [
                /* @__PURE__ */ jsx("p", { className: "text-xs font-bold text-[#39ff14] mb-2", children: "COPIA \u2014 suelta aqu\xED / reordena" }),
                /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
                  copy2.map((w, i) => /* @__PURE__ */ jsxs("div", { className: "item", children: [
                    /* @__PURE__ */ jsxs("span", { children: [
                      i + 1,
                      ". ",
                      w.emoji,
                      " ",
                      /* @__PURE__ */ jsx("b", { children: w.name }),
                      " \xB7 ",
                      w.dano
                    ] }),
                    /* @__PURE__ */ jsxs("span", { className: "flex gap-1", children: [
                      /* @__PURE__ */ jsx("button", { "aria-label": "Mover a la izquierda", className: "btn btn-ghost !p-2", onClick: () => move2(i, -1), children: /* @__PURE__ */ jsx(ChevronLeft, { size: 16 }) }),
                      /* @__PURE__ */ jsx("button", { "aria-label": "Mover a la derecha", className: "btn btn-ghost !p-2", onClick: () => move2(i, 1), children: /* @__PURE__ */ jsx(ChevronRight, { size: 16 }) }),
                      /* @__PURE__ */ jsx("button", { "aria-label": "Quitar", className: "btn btn-ghost !p-2", onClick: () => setCopy2(copy2.filter((x) => x !== w)), children: "\u2715" })
                    ] })
                  ] }, w.name)),
                  copy2.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-[#9db8a8]", children: "Copia vac\xEDa. Arrastra un arma aqu\xED." })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx("button", { className: "btn btn-green", onClick: check2, children: "Comprobar copia" }),
              /* @__PURE__ */ jsx("button", { className: "btn btn-ghost", onClick: () => setCopy2([]), children: "Vaciar copia" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mono text-xs mt-3 bg-black/40 p-3 rounded-lg [overflow-wrap:anywhere]", children: "const copia = armas.toSorted((a,b)=>b.da\xF1o-a.da\xF1o)" })
          ] }),
          level === 3 && /* @__PURE__ */ jsxs(Fragment, { children: [
            !done3 ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("p", { className: "text-[#c8e8d2]", children: [
                /* @__PURE__ */ jsx("b", { children: "El mago ejecuta la operaci\xF3n real" }),
                " y muestra el estado final del original. Predice antes de que ocurra."
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl bg-[#120a2a] border border-purple-900/60 p-4", children: [
                /* @__PURE__ */ jsx("p", { className: "font-bold text-purple-200", children: l3Rounds[round3].title }),
                /* @__PURE__ */ jsxs("p", { className: "mono text-sm mt-1 text-[#39ff14] [overflow-wrap:anywhere]", children: [
                  l3Rounds[round3].arr,
                  ".",
                  l3Rounds[round3].op
                ] }),
                /* @__PURE__ */ jsx("p", { className: "mt-2 font-bold", children: l3Rounds[round3].q }),
                /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: l3Rounds[round3].opts.map((o, i) => /* @__PURE__ */ jsx("button", { onClick: () => setChoice3(i), className: `opt ${choice3 === i ? "sel" : ""}`, children: o }, o)) })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2 items-center", children: [
                /* @__PURE__ */ jsx("button", { className: "btn btn-green", disabled: choice3 === null, onClick: check3, children: "Ejecutar predicci\xF3n" }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm text-[#9db8a8]", children: [
                  "Ronda ",
                  round3 + 1,
                  "/4 \xB7 Racha del mago: ",
                  streak3
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#39ff14]", children: "\u{1F9D9} El mago te entrega el alijo." }),
              /* @__PURE__ */ jsx("p", { className: "text-[#c8e8d2] mt-1", children: "Completaste las 4 rondas. Concepto sellado: sort muta, toSorted no muta." }),
              /* @__PURE__ */ jsx("button", { className: "btn btn-orange mt-3", onClick: () => setLevel(4), children: "Ir al Nivel 4 \u2192" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mono text-[11px] mt-4 bg-black/40 p-3 rounded-lg leading-relaxed [overflow-wrap:anywhere]", children: [
              "arr.sort((a,b)=>a-b) // MUTADO",
              /* @__PURE__ */ jsx("br", {}),
              "arr.toSorted((a,b)=>a-b) // INTACTO",
              /* @__PURE__ */ jsx("br", {}),
              '["10","9","2"].sort() // \u2192 ["10","2","9"] lexicogr\xE1fico MUTADO',
              /* @__PURE__ */ jsx("br", {}),
              '["10","9","2"].toSorted((a,b)=>Number(a)-Number(b)) // \u2192 ["2","9","10"] original INTACTO'
            ] })
          ] }),
          level === 4 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("p", { className: "text-[#c8e8d2]", children: [
              /* @__PURE__ */ jsx("b", { children: "Objetivo:" }),
              " escribe un comparador para ordenar por cantidad ascendente sin mutar el original. Si empatan, por nombre alfab\xE9tico. Las cantidades son strings con s\xEDmbolo."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2", children: resources.map((r) => /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-[#0a1712] border border-[#264437] p-3 text-center", children: [
              /* @__PURE__ */ jsx("div", { className: "text-2xl", children: r.emoji }),
              /* @__PURE__ */ jsx("b", { children: r.nombre }),
              /* @__PURE__ */ jsx("div", { className: "mono text-xs text-[#9db8a8] [overflow-wrap:anywhere]", children: r.cantidad })
            ] }, r.nombre)) }),
            /* @__PURE__ */ jsx("label", { className: "block mt-4 text-sm font-bold", children: "Tu comparador" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: input4, onChange: (e) => setInput4(e.target.value), placeholder: "(a,b) => ...", "aria-label": "Comparador del inventario" }),
            /* @__PURE__ */ jsxs("p", { className: "mono text-xs mt-2 text-[#9db8a8]", children: [
              "const copia = recursos.toSorted(",
              /* @__PURE__ */ jsx("span", { className: "text-[#39ff14]", children: input4 || "(a,b) => ..." }),
              ")"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx("button", { className: "btn btn-green", onClick: check4, children: "Comprobar comparador" }),
              /* @__PURE__ */ jsxs("button", { className: "btn btn-ghost flex gap-2 items-center", onClick: () => setHelp4(true), children: [
                /* @__PURE__ */ jsx(Lightbulb, { size: 16 }),
                " Ayuda"
              ] })
            ] }),
            help4 && /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl bg-[#2a1f05] border border-[#ffd23f]/40 p-3 text-sm space-y-1", children: [
              /* @__PURE__ */ jsx("p", { children: "\u{1F4A1} Las cantidades son strings con s\xEDmbolo \u2192 necesitas parseInt" }),
              /* @__PURE__ */ jsx("p", { children: "\u{1F4A1} Si empatan en cantidad, ordena por nombre \u2192 localeCompare" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9db8a8] mt-2", children: "Esperado: Trigo 60 \u2192 Agua 80 \u2192 Queso 80 \u2192 Carne 100 \u2192 Pan 100" })
          ] }),
          level === 5 && /* @__PURE__ */ jsxs(Fragment, { children: [
            !done5 ? /* @__PURE__ */ jsxs(Fragment, { children: [
              /* @__PURE__ */ jsxs("p", { className: "text-[#c8e8d2]", children: [
                /* @__PURE__ */ jsx("b", { children: "El Sello del Refugio:" }),
                " ordena ",
                /* @__PURE__ */ jsx("code", { className: "mono text-[#39ff14]", children: l5Rounds[round5].label }),
                " de menor a mayor SIN mutar. Elige la opci\xF3n y el juego ejecuta la operaci\xF3n."
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-2", children: [
                /* @__PURE__ */ jsx("button", { onClick: () => setChoice5(0), className: `opt ${choice5 === 0 ? "sel" : ""}`, children: "\u2610 original.sort((a,b)=>a-b)" }),
                /* @__PURE__ */ jsx("button", { onClick: () => setChoice5(1), className: `opt ${choice5 === 1 ? "sel" : ""}`, children: "\u2610 const copia = original.toSorted((a,b)=>a-b)" }),
                /* @__PURE__ */ jsx("button", { onClick: () => setChoice5(2), className: `opt ${choice5 === 2 ? "sel" : ""}`, children: "\u2610 const copia = [...original].sort((a,b)=>a-b)" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-2 items-center flex-wrap", children: [
                /* @__PURE__ */ jsx("button", { className: "btn btn-green", disabled: choice5 === null, onClick: check5, children: "Ejecutar opci\xF3n" }),
                /* @__PURE__ */ jsxs("span", { className: "text-sm text-[#9db8a8]", children: [
                  "Ronda ",
                  round5 + 1,
                  "/3"
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h3", { className: "text-xl font-bold text-[#39ff14]", children: "\u{1F6E1}\uFE0F Sello del refugio activado." }),
              /* @__PURE__ */ jsx("p", { className: "text-[#c8e8d2] mt-1", children: "El registro qued\xF3 intacto en las 3 rondas." }),
              /* @__PURE__ */ jsx("button", { className: "btn btn-orange mt-3", onClick: () => setLevel(6), children: "Enfrentar al Jefe Final \u2192" })
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mono text-xs mt-4 bg-black/40 p-3 rounded-lg [overflow-wrap:anywhere]", children: [
              "const copia = original.toSorted((a,b)=>a-b); // original \u2192 ",
              l5Rounds[round5].label,
              " INTACTO",
              /* @__PURE__ */ jsx("br", {}),
              "// copia \u2192 ordenada"
            ] })
          ] }),
          level === 6 && /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsxs("p", { className: "text-[#c8e8d2]", children: [
              /* @__PURE__ */ jsx("b", { children: "Jefe final:" }),
              " escribe un comparador compuesto: poder ",
              /* @__PURE__ */ jsx("b", { children: "descendente" }),
              ", edad ",
              /* @__PURE__ */ jsx("b", { children: "ascendente" }),
              " y nombre ",
              /* @__PURE__ */ jsx("b", { children: "alfab\xE9tico" }),
              ", sin mutar el original. Cuidado: ",
              /* @__PURE__ */ jsx("b", { children: "bren" }),
              " va en min\xFAscula."
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: defenders.map((d) => /* @__PURE__ */ jsxs("div", { className: "item", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                d.emoji,
                " ",
                /* @__PURE__ */ jsx("b", { children: d.nombre }),
                " \xB7 poder ",
                d.poder,
                " \xB7 edad ",
                d.edad
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "mono text-xs text-[#9db8a8]", children: [
                d.nombre,
                " / ",
                d.edad
              ] })
            ] }, d.nombre)) }),
            /* @__PURE__ */ jsx("label", { className: "block mt-4 text-sm font-bold", children: "Tu comparador triple" }),
            /* @__PURE__ */ jsx("input", { type: "text", value: input6, onChange: (e) => setInput6(e.target.value), placeholder: "(a,b) => ...", "aria-label": "Comparador triple del jefe final" }),
            /* @__PURE__ */ jsxs("p", { className: "mono text-xs mt-2 text-[#9db8a8] [overflow-wrap:anywhere]", children: [
              "const copia = defensores.toSorted(",
              /* @__PURE__ */ jsx("span", { className: "text-[#39ff14]", children: input6 }),
              ")"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsx("button", { className: "btn btn-orange", onClick: check6, children: "\u2694\uFE0F Comprobar comparador" }),
              /* @__PURE__ */ jsxs("button", { className: "btn btn-ghost flex gap-2 items-center", onClick: () => setHelp6(true), children: [
                /* @__PURE__ */ jsx(Lightbulb, { size: 16 }),
                " Ayuda"
              ] })
            ] }),
            help6 && /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl bg-[#2a1f05] border border-[#ffd23f]/40 p-3 text-sm space-y-1", children: [
              /* @__PURE__ */ jsx("p", { children: "\u{1F4A1} Poder es string con s\xEDmbolo \u2192 parseInt" }),
              /* @__PURE__ */ jsx("p", { children: "\u{1F4A1} Edad es n\xFAmero \u2192 resta directa" }),
              /* @__PURE__ */ jsx("p", { children: "\u{1F4A1} Nombre tiene may\xFAsculas/min\xFAsculas \u2192 localeCompare" }),
              /* @__PURE__ */ jsx("p", { children: "\u{1F4A1} Poder descendente \u2192 parseInt(b.poder)-parseInt(a.poder)" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9db8a8] mt-2", children: "Esperado: Kael \u2192 Mordo \u2192 Lyra \u2192 bren \u2192 Sylas" }),
            solved.includes(6) && /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl bg-[#122b18] border border-[#39ff14] p-4 text-center", children: [
              /* @__PURE__ */ jsx("p", { className: "text-2xl", children: "\u{1F3C6} \xA1EL REFUGIO RESISTE!" }),
              /* @__PURE__ */ jsx("p", { className: "text-[#c8e8d2]", children: "Has sellado los 6 niveles. El registro original sigue intacto." })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Shield, { size: 18, className: "text-[#39ff14]" }),
            " \u{1F50D} PANEL DE INMUTABILIDAD"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mono text-[13px] sm:text-sm mt-2 leading-relaxed [overflow-wrap:anywhere]", children: [
            "Original: [3,1,2] \u2192 sigue [3,1,2] ",
            /* @__PURE__ */ jsx("span", { className: "text-[#39ff14] font-bold", children: "INTACTO" }),
            " | Copia: [1,2,3] ",
            /* @__PURE__ */ jsx("span", { className: "text-[#39ff14]", children: "ORDENADA" }),
            " | ",
            /* @__PURE__ */ jsx("span", { className: "text-[#39ff14]", children: "toSorted() NO muta." }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-red-400", children: "sort() S\xCD muta." })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#9db8a8] mt-1", children: [
            "Nivel actual \xB7 Original: ",
            /* @__PURE__ */ jsx("span", { className: "mono [overflow-wrap:anywhere]", children: originalPreview })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "space-y-4 lg:sticky lg:top-[92px]", children: [
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("h2", { className: "font-bold flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Bug, { size: 19, className: "text-[#39ff14]" }),
            " DEPURADOR AVANZADO: ",
            /* @__PURE__ */ jsx("code", { className: "mono text-[#39ff14]", children: ".toSorted()" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#9db8a8] mt-1", children: "Cada comprobaci\xF3n deja rastro aqu\xED. Revisa original antes / despu\xE9s." }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 rounded-xl bg-black/60 border border-[#1d2f2a] p-3 max-h-[420px] overflow-y-auto", children: logs.map((l) => /* @__PURE__ */ jsx("p", { className: `mono text-[12px] leading-relaxed mb-2 [overflow-wrap:anywhere] ${l.kind === "ok" ? "text-[#7dff8a]" : l.kind === "bad" ? "text-[#ff8a8a]" : "text-[#b8d8c2]"}`, children: l.text }, l.id)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-lg bg-[#0f2a12] border border-emerald-900/60 p-3 text-sm", children: [
            /* @__PURE__ */ jsx("b", { children: "\u2696\uFE0F sort() muta | toSorted() NO muta" }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#b8d8c2] mt-1", children: "Si el original cambia, el registro se corrompe." })
          ] }),
          /* @__PURE__ */ jsx("button", { className: "btn btn-ghost w-full mt-3", onClick: () => setLogs([{ id: 99, text: "> Consola limpia. El original sigue intacto.", kind: "info" }]), children: "Limpiar consola" })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold flex gap-2 items-center", children: [
            /* @__PURE__ */ jsx(FlaskConical, { size: 17, className: "text-[#ff7a00]" }),
            " \u{1F9EA} C\xD3MO PUNT\xDAA ARIA"
          ] }),
          /* @__PURE__ */ jsxs("ul", { className: "mt-2 text-[13px] space-y-1.5 text-[#c8e8d2]", children: [
            /* @__PURE__ */ jsxs("li", { children: [
              "\u2705 Acierto normal: ",
              /* @__PURE__ */ jsx("b", { children: "+10" })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "\u2705 Nivel 4 y 5 con toSorted: ",
              /* @__PURE__ */ jsx("b", { children: "+15" })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "\u2705 Nivel 5 con spread: ",
              /* @__PURE__ */ jsx("b", { children: "+10" })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "\u2705 Nivel 6 jefe final: ",
              /* @__PURE__ */ jsx("b", { children: "+20" })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "\u274C Mutar con sort: ",
              /* @__PURE__ */ jsx("b", { children: "-10" })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "\u274C Comparador mal: ",
              /* @__PURE__ */ jsx("b", { children: "-5" })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "\u274C Orden / predicci\xF3n mal: ",
              /* @__PURE__ */ jsx("b", { children: "-3" })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "\u2B50 Bonus Nivel 3 (4 seguidas): ",
              /* @__PURE__ */ jsx("b", { children: "+5" })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "\u2B50 Bonus Nivel 4 con Ayuda: ",
              /* @__PURE__ */ jsx("b", { children: "+5" })
            ] }),
            /* @__PURE__ */ jsxs("li", { children: [
              "\u2B50 Bonus Nivel 6 con Ayuda: ",
              /* @__PURE__ */ jsx("b", { children: "+10" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-4 text-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-4xl floaty", children: "\u{1F9DF}\u{1F409}" }),
          /* @__PURE__ */ jsx("p", { className: "font-bold mt-2", children: "Aria vigila el refugio" }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-[#9db8a8]", children: "\u201CEl registro original es sagrado. Ordena copias, nunca el original.\u201D" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex justify-center gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "chip", children: "\u{1F7E2} REFUGIO: A SALVO" }),
            /* @__PURE__ */ jsx("span", { className: "chip", children: "\u{1F9D9} MAGO: ATENTO" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "text-center text-xs text-[#7a9484] mt-6 pb-2", children: [
      "EL \xDALTIMO REFUGIO \xB7 Aprende ",
      /* @__PURE__ */ jsx("code", { className: "mono", children: "toSorted()" }),
      " jugando \xB7 Original intacto, copia ordenada."
    ] })
  ] }) });
}
export {
  App as default
};
