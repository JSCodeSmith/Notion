/* Convertido automáticamente desde Apuntes/findIndex  , findLast  findLastIndex indexOf   lastIndexOf/findLastCINE.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const norm = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[""]/g, "'").replace(/\s+/g, "").replace(/;/g, "").toLowerCase();
const shows1 = [
  { hora: "12:00", genero: "Acci\xF3n", tresD: false },
  { hora: "15:00", genero: "Terror", tresD: true },
  { hora: "18:00", genero: "Comedia", tresD: false },
  { hora: "21:00", genero: "Terror", tresD: false },
  { hora: "23:30", genero: "Acci\xF3n", tresD: true }
];
const shows2 = [
  { hora: "11:00", genero: "Comedia", tresD: false },
  { hora: "13:00", genero: "Terror", tresD: true },
  { hora: "16:00", genero: "Acci\xF3n", tresD: false },
  { hora: "18:30", genero: "Animaci\xF3n", tresD: true },
  { hora: "20:30", genero: "Comedia", tresD: true },
  { hora: "22:45", genero: "Terror", tresD: false }
];
const shows3 = [
  { hora: "12:30", genero: "Terror", tresD: false },
  { hora: "14:00", genero: "Acci\xF3n", tresD: true },
  { hora: "16:30", genero: "Comedia", tresD: false },
  { hora: "19:00", genero: "Acci\xF3n", tresD: false },
  { hora: "21:00", genero: "Terror", tresD: true },
  { hora: "23:00", genero: "Acci\xF3n", tresD: true }
];
const shows19 = [
  { hora: "10:00", genero: "Acci\xF3n", tresD: false },
  { hora: "10:45", genero: "Terror", tresD: false },
  { hora: "11:30", genero: "Comedia", tresD: true },
  { hora: "12:15", genero: "Animaci\xF3n", tresD: false },
  { hora: "13:00", genero: "Terror", tresD: true },
  { hora: "13:45", genero: "Acci\xF3n", tresD: true },
  { hora: "14:30", genero: "Comedia", tresD: false },
  { hora: "15:15", genero: "Terror", tresD: false },
  { hora: "16:00", genero: "Animaci\xF3n", tresD: true },
  { hora: "16:45", genero: "Acci\xF3n", tresD: false },
  { hora: "17:30", genero: "Comedia", tresD: true },
  { hora: "18:15", genero: "Terror", tresD: false },
  { hora: "19:00", genero: "Acci\xF3n", tresD: true },
  { hora: "19:45", genero: "Comedia", tresD: false },
  { hora: "20:30", genero: "Animaci\xF3n", tresD: false },
  { hora: "21:15", genero: "Terror", tresD: true },
  { hora: "22:00", genero: "Terror", tresD: true },
  { hora: "22:45", genero: "Acci\xF3n", tresD: true },
  { hora: "23:45", genero: "Comedia", tresD: false }
];
const showsBoss = [
  { hora: "12:00", genero: "Terror", tresD: false },
  { hora: "13:30", genero: "Comedia", tresD: true },
  { hora: "15:00", genero: "Terror", tresD: false },
  { hora: "16:30", genero: "Acci\xF3n", tresD: true },
  { hora: "19:00", genero: "Terror", tresD: true },
  { hora: "21:30", genero: "Terror", tresD: true }
];
const genres = ["Terror", "Acci\xF3n", "Comedia", "Animaci\xF3n"];
function makeInfinite(seedGenre) {
  const target = seedGenre || genres[Math.floor(Math.random() * genres.length)];
  const list = Array.from({ length: 30 }, (_, i) => {
    const total = 600 + i * 28;
    const h = String(Math.floor(total / 60)).padStart(2, "0");
    const m = String(total % 60).padStart(2, "0");
    return { hora: `${h}:${m}`, genero: genres[Math.floor(Math.random() * genres.length)], tresD: Math.random() > 0.5 };
  });
  list[7] = { ...list[7], genero: target };
  list[23] = { ...list[23], genero: target };
  return { list, target };
}
const initialProgress = { points: 0, streak: 0, clean: 0, solved: [], badges: [], conditionDone: [] };
const ORDER = ["1", "2", "3", "4", "versus", "boss", "19", "infinite"];
async function api(action, args) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const payload = await res.json().catch(() => ({}));
  if (!res.ok || payload.error) throw new Error(payload.error || `Error ${res.status}`);
  return payload.data;
}
function App() {
  const [levelId, setLevelId] = useState("1");
  const [versusStep, setVersusStep] = useState(0);
  const [infinite, setInfinite] = useState(() => makeInfinite("Comedia"));
  const [selected, setSelected] = useState(null);
  const [cursor, setCursor] = useState(null);
  const [traversing, setTraversing] = useState(false);
  const [traversed, setTraversed] = useState(false);
  const [logs, setLogs] = useState(["// Depurador listo. Elige una funci\xF3n o recorre desde el final."]);
  const [feedback, setFeedback] = useState("Lee la regla, decide y confirma. Si lo prefieres, usa el recorrido para ver c\xF3mo piensa findLast.");
  const [feedbackKind, setFeedbackKind] = useState("info");
  const [condition, setCondition] = useState("");
  const [conditionMsg, setConditionMsg] = useState("");
  const [wrongId, setWrongId] = useState(null);
  const [light, setLight] = useState(false);
  const [progress, setProgress] = useState(initialProgress);
  const [recordId, setRecordId] = useState(null);
  const [apiState, setApiState] = useState("Guardando progreso\u2026");
  const [bitacora, setBitacora] = useState(["Turno iniciado en la cabina de proyecci\xF3n."]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [expired, setExpired] = useState(false);
  const timers = useRef([]);
  const level = useMemo(() => {
    const base = {
      "1": { title: "Ronda 1 \xB7 \xDAltima de terror", short: "Ronda 1", rule: "Encuentra la \xDALTIMA funci\xF3n de terror", code: `funciones.findLast(f => f.genero === 'terror')`, method: "findLast", shows: shows1, test: (s) => s.genero === "Terror", expected: "f=>f.genero==='terror'", explain: "Condici\xF3n de texto simple." },
      "2": { title: "Ronda 2 \xB7 \xDAltima en 3D", short: "Ronda 2", rule: "Encuentra la \xDALTIMA funci\xF3n en 3D", code: `funciones.findLast(f => f.tresD)`, method: "findLast", shows: shows2, test: (s) => s.tresD, expected: "f=>f.tresD", explain: "Condici\xF3n booleana: no hace falta comparar con true." },
      "3": { title: "Ronda 3 \xB7 \xDAltima de acci\xF3n", short: "Ronda 3", rule: "Encuentra la \xDALTIMA funci\xF3n de acci\xF3n", code: `funciones.findLast(f => f.genero === 'Acci\xF3n')`, method: "findLast", shows: shows3, test: (s) => s.genero === "Acci\xF3n", expected: "f=>f.genero==='acci\xF3n'", explain: "Otra condici\xF3n de texto, misma direcci\xF3n." },
      "4": { title: "Ronda 4 \xB7 \xDAltima antes de las 22:00", short: "Ronda 4", rule: "Encuentra la \xDALTIMA funci\xF3n antes de las 22:00", code: `funciones.findLast(f => parseInt(f.hora) < 22)`, method: "findLast", shows: shows1, test: (s) => parseInt(s.hora) < 22, expected: "f=>parseInt(f.hora)<22", explain: "Condici\xF3n num\xE9rica: parseInt convierte \u201C21:00\u201D en 21." },
      "versus": { title: versusStep === 0 ? "Primera vs \xDAltima \xB7 PRIMERA" : "Primera vs \xDAltima \xB7 \xDALTIMA", short: "Primera vs \xDAltima", rule: versusStep === 0 ? "Encuentra la PRIMERA funci\xF3n de terror" : "Encuentra la \xDALTIMA funci\xF3n de terror", code: versusStep === 0 ? `funciones.find(f => f.genero === 'terror')` : `funciones.findLast(f => f.genero === 'terror')`, method: versusStep === 0 ? "find" : "findLast", shows: shows1, test: (s) => s.genero === "Terror", expected: "f=>f.genero==='terror'", explain: "Misma condici\xF3n, direcci\xF3n opuesta." },
      "boss": { title: "Jefe \xB7 Funci\xF3n fantasma", short: "Jefe Fantasma", rule: "Encuentra la \xDALTIMA funci\xF3n de terror en 3D y antes de las 18:00", code: `funciones.findLast(f => f.genero === 'terror' && f.tresD && parseInt(f.hora) < 18)`, method: "ghost", shows: showsBoss, test: (s) => s.genero === "Terror" && s.tresD && parseInt(s.hora) < 18, expected: "f=>f.genero==='terror'&&f.tresD&&parseInt(f.hora)<18", explain: "Ninguna cumple las tres condiciones a la vez." },
      "19": { title: "Nivel 19 \xB7 La funci\xF3n decisiva", short: "Nivel 19", rule: "Encuentra la \xDALTIMA funci\xF3n de terror en 3D despu\xE9s de las 20:00", code: `funciones.findLast(f => f.genero === 'terror' && f.tresD && parseInt(f.hora) > 20)`, method: "findLast", shows: shows19, test: (s) => s.genero === "Terror" && s.tresD && parseInt(s.hora) > 20, expected: "f=>f.genero==='terror'&&f.tresD&&parseInt(f.hora)>20", explain: "Dos cumplen al final. Solo la \xFAltima cuenta." },
      "infinite": { title: "Cartelera infinita \xB7 30 funciones", short: "Cartelera Infinita", rule: `Encuentra la \xDALTIMA funci\xF3n de ${infinite.target.toLowerCase()}`, code: `funciones.findLast(f => f.genero === '${infinite.target}')`, method: "findLast", shows: infinite.list, test: (s) => s.genero === infinite.target, expected: `f=>f.genero==='${infinite.target.toLowerCase()}'`, explain: "Cartelera generada al azar: el recorrido inverso es tu mejor atajo." }
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
        if (first) {
          setRecordId(first.id);
          setProgress(first.value);
          setApiState("Progreso guardado");
        } else {
          const created = await api("records.create", { collection: "progreso-ultima-funcion", value: initialProgress });
          if (alive) {
            setRecordId(created.id);
            setApiState("Progreso guardado");
          }
        }
      } catch {
        if (alive) setApiState("Sin conexi\xF3n: tu partida sigue en esta sesi\xF3n");
      }
    })();
    return () => {
      alive = false;
    };
  }, []);
  useEffect(() => {
    if (levelId !== "19") return;
    setTimeLeft(60);
    setExpired(false);
    const t = window.setInterval(() => setTimeLeft((v) => {
      if (v <= 1) {
        window.clearInterval(t);
        setExpired(true);
        setFeedback("\u23F1 Tiempo agotado en el Nivel 19. Pulsa SIGUIENTE o vuelve a entrar para intentarlo con 60 segundos.");
        setFeedbackKind("bad");
        return 0;
      }
      return v - 1;
    }), 1e3);
    return () => window.clearInterval(t);
  }, [levelId]);
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);
  const persist = async (next) => {
    try {
      if (recordId) await api("records.replace", { collection: "progreso-ultima-funcion", id: recordId, value: next });
      else {
        const created = await api("records.create", { collection: "progreso-ultima-funcion", value: next });
        setRecordId(created.id);
      }
      setApiState("Progreso guardado");
    } catch {
      setApiState("Sin conexi\xF3n: tu partida sigue en esta sesi\xF3n");
    }
  };
  const updateProgress = (fn) => {
    setProgress((old) => {
      const next = fn(old);
      void persist(next);
      return next;
    });
  };
  const chooseLevel = (id) => {
    setLevelId(id);
    setVersusStep(0);
    setSelected(null);
    setCursor(null);
    setTraversed(false);
    setCondition("");
    setConditionMsg("");
    setWrongId(null);
    setLight(false);
    setFeedback("Nueva cartelera. Lee la regla y decide: \xBFadivinas o recorres desde el final?");
    setFeedbackKind("info");
    setLogs([`// ${id === "versus" ? "Modo Primera vs \xDAltima" : "Nueva cartelera"}. Elige o recorre.`]);
  };
  const nextLevel = () => {
    const i = ORDER.indexOf(levelId);
    const next = ORDER[(i + 1) % ORDER.length];
    chooseLevel(next);
    setBitacora((b) => [`\u27A1\uFE0F Avance a la siguiente funci\xF3n.`, ...b].slice(0, 12));
  };
  const traverse = async () => {
    if (traversing) return;
    setTraversing(true);
    setTraversed(false);
    setSelected(null);
    setWrongId(null);
    setLight(false);
    const dir = level.method === "find" ? 1 : -1;
    const start = level.method === "find" ? 0 : level.shows.length - 1;
    const end = level.method === "find" ? level.shows.length : -1;
    const intro = level.method === "find" ? `\u25B6 Recorrido izquierda \u2192 derecha con find. Buscamos la PRIMERA.` : `\u25C0 Recorrido derecha \u2192 izquierda con findLast. Buscamos la \xDALTIMA.`;
    setLogs([intro]);
    setFeedback(level.method === "find" ? "Recorriendo de izquierda a derecha\u2026" : "Recorriendo de derecha a izquierda\u2026");
    let found = null;
    for (let i = start; i !== end; i += dir) {
      setCursor(i);
      await sleep(700);
      const s = level.shows[i];
      const ok = level.test(s);
      const line = `[${i}] ${s.hora} \xB7 ${s.genero} ${s.tresD ? "3D" : "2D"} ${ok ? "\u2705 \xA1ALTO!" : "\u274C no cumple \u2192 sigue"}`;
      setLogs((l) => [...l, line]);
      if (ok) {
        found = i;
        break;
      }
    }
    setTraversing(false);
    setTraversed(true);
    if (found !== null) {
      const s = level.shows[found];
      setSelected(found);
      setLogs((l) => [...l, `${level.method === "find" ? "find" : "findLast"} = { hora: '${s.hora}', genero: '${s.genero}', tresD: ${s.tresD} }`]);
      setFeedback(`El cursor se detuvo en [${found}] ${s.hora}. Ahora pulsa CONFIRMAR FUNCI\xD3N para cerrar la ronda.`);
    } else {
      setLogs((l) => [...l, "Revis\xF3 todas de atr\xE1s hacia adelante. Ninguna cumpli\xF3 \u2192 findLast devuelve undefined, no -1, no null."]);
      setFeedback("El recorrido termin\xF3 sin coincidencias. La respuesta es \u{1F47B} NO EXISTE (undefined).");
    }
  };
  const award = (points, key, badge) => {
    updateProgress((p) => {
      const solved2 = p.solved.includes(key) ? p.solved : [...p.solved, key];
      const badges = badge && !p.badges.includes(badge) ? [...p.badges, badge] : p.badges;
      return { ...p, points: p.points + points, streak: p.streak + 1, clean: p.clean + 1, solved: solved2, badges };
    });
  };
  const confirm = () => {
    if (level.method === "ghost") {
      setFeedback("En el nivel fantasma no se confirma una funci\xF3n: pulsa \u{1F47B} NO EXISTE (undefined).");
      setFeedbackKind("info");
      return;
    }
    if (selected === null) {
      setFeedback("Primero elige una funci\xF3n en la cartelera o usa el recorrido.");
      setFeedbackKind("info");
      return;
    }
    const s = level.shows[selected];
    if (selected === target) {
      const is19 = levelId === "19";
      const bonus = is19 ? 20 : 10;
      setFeedbackKind("ok");
      setLight(true);
      setWrongId(null);
      setFeedback(`\u2705 \xA1Correcto! ${s.hora} \xB7 ${s.genero} \xB7 ${s.tresD ? "3D" : "2D"}. +${bonus} puntos. ${level.code} // \u2192 { hora: '${s.hora}', genero: '${s.genero}', tresD: ${s.tresD} }`);
      setLogs((l) => [...l, `\u2705 Confirmado: ${level.code}`, `// \u2192 { hora: '${s.hora}', genero: '${s.genero}', tresD: ${s.tresD} }`]);
      setBitacora((b) => [`\u2705 ${level.short}: acert\xF3 ${s.hora} (+${bonus}).`, ...b].slice(0, 12));
      const nextClean = progress.clean + 1;
      award(bonus, solvedKey, is19 ? "PROYECCIONISTA NIVEL 19" : void 0);
      if (nextClean === 3) {
        updateProgress((p) => ({ ...p, points: p.points + 15, badges: p.badges.includes("\u{1F9E0} MENTE INVERSA") ? p.badges : [...p.badges, "\u{1F9E0} MENTE INVERSA"] }));
        setFeedback((f) => f + " \u{1F9E0} Bonus: 3 seguidas sin caer en el primer match. +15 e insignia MENTE INVERSA.");
      }
      if (levelId === "versus" && versusStep === 0) {
        window.setTimeout(() => {
          setVersusStep(1);
          setSelected(null);
          setCursor(null);
          setTraversed(false);
          setFeedback("Ahora la misma cartelera pregunta por la \xDALTIMA. Cambia la direcci\xF3n.");
          setFeedbackKind("info");
        }, 900);
      }
    } else if (level.test(s)) {
      setFeedbackKind("bad");
      setWrongId(selected);
      setLight(false);
      setFeedback("Esa tambi\xE9n cumple, pero findLast busca desde el FINAL. Elegiste la primera, no la \xFAltima. \u22125 puntos.");
      setLogs((l) => [...l, `\u26A0\uFE0F [${selected}] cumple, pero NO es la \xFAltima. Inercia izquierda \u2192 derecha.`]);
      updateProgress((p) => ({ ...p, points: Math.max(0, p.points - 5), streak: 0, clean: 0 }));
    } else {
      setFeedbackKind("bad");
      setWrongId(selected);
      setLight(false);
      setFeedback(`Esa funci\xF3n no cumple la regla. \u22123 puntos. Revisa el g\xE9nero, el formato o la hora.`);
      updateProgress((p) => ({ ...p, points: Math.max(0, p.points - 3), streak: 0, clean: 0 }));
    }
  };
  const ghostAnswer = () => {
    setFeedbackKind("ok");
    setLight(true);
    setFeedback("\u{1F47B} Correcto: undefined. Revis\xF3 todas de atr\xE1s hacia adelante, ninguna cumpli\xF3, por eso devuelve undefined, no -1, no null. +10 puntos.");
    setLogs((l) => [...l, "\u{1F47B} findLast = undefined", "Motivo: ninguna funci\xF3n cumple las 3 condiciones a la vez."]);
    setBitacora((b) => ["\u{1F47B} Jefe fantasma resuelto: undefined (+10).", ...b].slice(0, 12));
    award(10, solvedKey);
  };
  const wrongGhostPick = () => {
    setFeedbackKind("bad");
    setFeedback("Esa funci\xF3n existe, pero no cumple las tres condiciones. En este jefe la respuesta es \u{1F47B} NO EXISTE. \u22123 puntos.");
    updateProgress((p) => ({ ...p, points: Math.max(0, p.points - 3), streak: 0, clean: 0 }));
  };
  const checkCondition = () => {
    if (!condition.trim()) {
      setConditionMsg("Escribe primero tu condici\xF3n.");
      return;
    }
    const key = solvedKey + "-cond";
    if (norm(condition) === norm(level.expected)) {
      if (progress.conditionDone.includes(key)) setConditionMsg("Esa condici\xF3n ya sum\xF3 su bonus en esta ronda.");
      else {
        updateProgress((p) => ({ ...p, points: p.points + 5, conditionDone: [...p.conditionDone, key] }));
        setConditionMsg("\u2705 Condici\xF3n correcta. +5 puntos.");
      }
    } else setConditionMsg("Todav\xEDa no coincide. Revisa el g\xE9nero, el operador y los par\xE9ntesis.");
  };
  const resetGame = () => {
    setProgress(initialProgress);
    void persist(initialProgress);
    setSelected(null);
    setCursor(null);
    setTraversed(false);
    setCondition("");
    setConditionMsg("");
    setBitacora(["Cabina reiniciada. La cartelera vuelve a empezar."]);
    setFeedback("Partida reiniciada. Tu progreso guardado vuelve a cero.");
    setFeedbackKind("info");
    setLight(false);
  };
  const regenerateInfinite = () => {
    setInfinite(makeInfinite());
    setSelected(null);
    setCursor(null);
    setTraversed(false);
    setLogs(["// Nueva cartelera aleatoria de 30 funciones."]);
    setFeedback("Nueva cartelera infinita generada. Busca la \xFAltima del g\xE9nero indicado.");
  };
  const levelMeta = { "1": "String simple", "2": "Booleana", "3": "Otra string", "4": "Num\xE9rica \xB7 parseInt", versus: "find vs findLast", boss: "Retorna undefined", "19": "19 funciones \xB7 60 s", infinite: "30 aleatorias" };
  return /* @__PURE__ */ jsxs("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "var(--bg)" }, className: "overflow-x-clip", children: [
    /* @__PURE__ */ jsx("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)" }, className: "sticky z-20 border-b border-[#1c2a4a] bg-[#030508]/95 backdrop-blur", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1500px] px-3 py-3 sm:px-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[11px] tracking-[0.28em] text-[#93a3c2]", children: "CABINA DE PROYECCI\xD3N \xB7 M\xC9TODO findLast()" }),
          /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(1.35rem,3vw,2.3rem)] font-bold leading-none", children: [
            "\u{1F3AC} CINE ",
            /* @__PURE__ */ jsx("span", { className: "neon", children: "\u201CEL \xDALTIMO PASE\u201D" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-[#ffd23f]", children: "\u2014 PROYECCIONISTA" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap gap-2 text-sm font-bold", children: [
          /* @__PURE__ */ jsx("span", { className: "rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-emerald-300", children: apiState }),
          /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-[#22e6ff]/40 bg-[#22e6ff]/10 px-3 py-1 text-[#22e6ff]", children: [
            "PUNTOS: ",
            progress.points
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-[#ff2d78]/40 bg-[#ff2d78]/10 px-3 py-1 text-pink-300", children: [
            "RACHA: ",
            progress.streak
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap items-center gap-2 text-xs", children: [
        /* @__PURE__ */ jsx("span", { className: "rounded bg-white/10 px-2 py-1", children: "findLast \u2192 devuelve el OBJETO, no el \xEDndice" }),
        /* @__PURE__ */ jsx("span", { className: "rounded bg-white/10 px-2 py-1", children: "findLastIndex \u2192 \xEDndice" }),
        /* @__PURE__ */ jsx("span", { className: "rounded bg-white/10 px-2 py-1", children: "find \u2192 el primero" }),
        progress.badges.map((b) => /* @__PURE__ */ jsx("span", { className: "rounded-full bg-[#ffd23f] px-2 py-1 font-bold text-black", children: b }, b))
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[1500px] px-3 py-4 sm:px-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 lg:grid-cols-[300px_1fr_420px] items-start", children: [
        /* @__PURE__ */ jsxs("aside", { className: "panel rounded-2xl p-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "text-xl font-bold", children: "\u{1F39F} CARTELERA / NIVELES" }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-[#93a3c2]", children: "Elige una ronda. El \u2705 aparece cuando la resuelves." }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: ORDER.map((id) => {
            const done = id === "versus" ? progress.solved.includes("versus-0") && progress.solved.includes("versus-1") : progress.solved.includes(id);
            const active = id === levelId;
            const label = id === "1" ? "Ronda 1 \xB7 Terror" : id === "2" ? "Ronda 2 \xB7 3D" : id === "3" ? "Ronda 3 \xB7 Acci\xF3n" : id === "4" ? "Ronda 4 \xB7 Antes de 22:00" : id === "versus" ? "Primera vs \xDAltima" : id === "boss" ? "Jefe \xB7 Fantasma" : id === "19" ? "Nivel 19 \xB7 19 funciones" : "Infinita \xB7 30 funciones";
            return /* @__PURE__ */ jsxs("button", { onClick: () => chooseLevel(id), className: `w-full rounded-xl border px-3 py-2.5 text-left ${active ? "border-[#22e6ff] bg-[#22e6ff]/15" : "border-white/10 bg-white/[.03] hover:bg-white/[.07]"}`, children: [
              /* @__PURE__ */ jsxs("span", { className: "flex justify-between gap-2 font-bold", children: [
                /* @__PURE__ */ jsx("span", { children: label }),
                /* @__PURE__ */ jsx("span", { children: done ? "\u2705" : "\u25CB" })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-[#93a3c2]", children: levelMeta[id] })
            ] }, id);
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 border-t border-white/10 pt-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-bold text-[#ffd23f]", children: "\u{1F4D3} BIT\xC1CORA" }),
            /* @__PURE__ */ jsx("ul", { className: "mt-2 max-h-44 space-y-2 overflow-y-auto pr-1 text-sm scroll-thin", children: bitacora.map((b, i) => /* @__PURE__ */ jsx("li", { className: "border-l-2 border-[#22e6ff]/50 pl-2 text-[#cbd5ea]", children: b }, i)) }),
            /* @__PURE__ */ jsx("button", { onClick: resetGame, className: "mt-4 w-full rounded-lg border border-red-400/50 bg-red-500/10 px-3 py-2 font-bold text-red-200", children: "\u21BA REINICIAR PARTIDA" }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-xs text-[#93a3c2]", children: "El reinicio guarda la partida en cero." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel relative overflow-hidden rounded-2xl p-4 sm:p-5", children: [
          /* @__PURE__ */ jsxs("div", { className: "pointer-events-none absolute right-4 top-4 hidden items-center gap-2 sm:flex", children: [
            /* @__PURE__ */ jsx("span", { className: "text-4xl", children: "\u{1F4FD}\uFE0F" }),
            /* @__PURE__ */ jsx("div", { className: `h-8 w-40 beam ${light ? "opacity-100" : "opacity-30"}` })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-end justify-between gap-3", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("p", { className: "text-xs tracking-[0.25em] text-[#93a3c2]", children: "CARTELERA DEL D\xCDA \xB7 ORDEN CRONOL\xD3GICO" }),
              /* @__PURE__ */ jsx("h2", { className: "text-[clamp(1.4rem,3vw,2rem)] font-bold leading-tight", children: level.title })
            ] }),
            levelId === "19" && /* @__PURE__ */ jsxs("div", { className: `rounded-xl border px-3 py-2 text-center ${expired ? "border-red-400 bg-red-500/15" : "border-[#ffd23f]/50 bg-[#ffd23f]/10"}`, children: [
              /* @__PURE__ */ jsxs("div", { className: "mono text-2xl font-bold text-[#ffd23f]", children: [
                "\u23F1 ",
                timeLeft,
                "s"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-[11px]", children: "NIVEL 19" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex items-center gap-2 rounded-xl bg-black/40 px-3 py-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: "\u25C0" }),
            /* @__PURE__ */ jsx("strong", { className: "text-[#22e6ff]", children: "CURSOR" }),
            /* @__PURE__ */ jsx("span", { className: "text-sm text-[#93a3c2]", children: traversing ? "recorriendo\u2026" : cursor === null ? "en espera, a la derecha de la cartelera" : `en [${cursor}] \xB7 ${level.shows[cursor]?.hora}` }),
            /* @__PURE__ */ jsx("span", { className: "ml-auto hidden text-xs text-[#93a3c2] sm:block", children: level.method === "find" ? "\u2192 izquierda a derecha" : "\u2190 derecha a izquierda" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 flex flex-wrap gap-2", children: level.shows.map((s, i) => {
            const isSelected = selected === i;
            const isCursor = cursor === i;
            const isCorrect = solved && target === i;
            const isWrong = wrongId === i;
            return /* @__PURE__ */ jsxs("button", { onClick: () => {
              if (level.method === "ghost") {
                setSelected(i);
                wrongGhostPick();
              } else {
                setSelected(i);
                setWrongId(null);
              }
            }, className: `card-show w-[calc(50%-4px)] rounded-xl border border-white/15 bg-[#0b1226] px-2 py-3 text-left sm:w-[calc(33.333%-6px)] lg:w-[calc(25%-6px)] ${isSelected ? "selected" : ""} ${isCursor ? "cursor" : ""} ${isCorrect ? "correct" : ""} ${isWrong ? "wrong" : ""}`, "aria-label": `Funci\xF3n ${i}, ${s.hora}, ${s.genero}, ${s.tresD ? "3D" : "2D"}`, children: [
              /* @__PURE__ */ jsxs("div", { className: "mono text-xs text-[#93a3c2]", children: [
                "[",
                i,
                "]"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "mono text-lg font-bold leading-tight", children: s.hora }),
              /* @__PURE__ */ jsx("div", { className: "font-bold", children: s.genero }),
              /* @__PURE__ */ jsx("div", { className: "text-sm text-[#93a3c2]", children: s.tresD ? "3D" : "2D" }),
              /* @__PURE__ */ jsx("div", { className: "mt-1 text-xl", children: "\u{1F39F}" })
            ] }, `${s.hora}-${i}`);
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 rounded-2xl border border-[#ffd23f]/35 bg-[#ffd23f]/[.07] p-4", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-[clamp(1.15rem,2.4vw,1.65rem)] font-bold leading-snug", children: [
              "\u{1F3AF} ",
              level.rule
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-1 text-sm text-[#93a3c2]", children: [
              level.explain,
              " ",
              solved ? "\xB7 Ronda resuelta \u2705" : "",
              " ",
              levelId === "versus" && versusStep === 0 ? "\xB7 Despu\xE9s viene la misma regla con findLast." : ""
            ] }),
            levelId === "versus" && /* @__PURE__ */ jsxs("p", { className: "mono mt-3 rounded bg-black/40 p-2 text-sm", children: [
              "Comparativa: ",
              /* @__PURE__ */ jsx("span", { className: "text-[#22e6ff]", children: "find \u2192 15:00" }),
              " \xB7 ",
              /* @__PURE__ */ jsx("span", { className: "text-[#ffd23f]", children: "findLast \u2192 21:00" }),
              ". Misma condici\xF3n, direcci\xF3n opuesta."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsx("button", { onClick: traverse, disabled: traversing, className: "rounded-xl bg-[#22e6ff] px-4 py-3 font-bold text-black disabled:opacity-50", children: traversing ? "\u23F3 RECORRIENDO\u2026" : level.method === "find" ? "\u25B6 RECORRER DESDE EL INICIO" : "\u25B6 RECORRER DESDE EL FINAL" }),
            /* @__PURE__ */ jsx("button", { onClick: confirm, className: "rounded-xl bg-[#3dff88] px-4 py-3 font-bold text-black", children: "\u2705 CONFIRMAR FUNCI\xD3N" }),
            level.method === "ghost" && /* @__PURE__ */ jsx("button", { onClick: ghostAnswer, className: "rounded-xl bg-[#ff2d78] px-4 py-3 font-bold text-white", children: "\u{1F47B} NO EXISTE (undefined)" }),
            /* @__PURE__ */ jsx("button", { onClick: nextLevel, className: "rounded-xl border border-white/25 bg-white/10 px-4 py-3 font-bold", children: "\u27A1\uFE0F SIGUIENTE FUNCI\xD3N" }),
            levelId === "infinite" && /* @__PURE__ */ jsx("button", { onClick: regenerateInfinite, className: "rounded-xl border border-[#ff2d78]/50 bg-[#ff2d78]/10 px-4 py-3 font-bold text-pink-200", children: "\u267E\uFE0F NUEVA CARTELERA ALEATORIA" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: `mt-4 rounded-xl border p-3 ${feedbackKind === "ok" ? "border-emerald-400/50 bg-emerald-400/10" : feedbackKind === "bad" ? "border-red-400/50 bg-red-400/10" : "border-white/10 bg-black/25"}`, role: "status", children: [
            /* @__PURE__ */ jsx("strong", { children: feedbackKind === "ok" ? "\u2705 " : feedbackKind === "bad" ? "\u26A0\uFE0F " : "\u{1F4A1} " }),
            feedback
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxs("label", { htmlFor: "condicion", className: "text-sm font-bold", children: [
              "Escribe la condici\xF3n para +5 ",
              /* @__PURE__ */ jsx("span", { className: "font-normal text-[#93a3c2]", children: "(ej: f => f.genero === 'terror')" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-2 flex flex-col gap-2 sm:flex-row", children: [
              /* @__PURE__ */ jsx("input", { id: "condicion", value: condition, onChange: (e) => setCondition(e.target.value), placeholder: "f => f.genero === 'terror'", className: "mono min-w-0 flex-1 rounded-lg border border-white/20 bg-black/50 px-3 py-3 text-sm text-white placeholder:text-slate-500" }),
              /* @__PURE__ */ jsx("button", { onClick: checkCondition, className: "rounded-lg border border-[#22e6ff]/50 bg-[#22e6ff]/10 px-4 py-3 font-bold text-[#22e6ff]", children: "COMPROBAR +5" })
            ] }),
            conditionMsg && /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-[#ffd23f]", children: conditionMsg })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5 grid gap-3 text-sm sm:grid-cols-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/[.04] p-3", children: [
              /* @__PURE__ */ jsx("b", { className: "text-[#3dff88]", children: "+10" }),
              " acierto del elemento correcto \xB7 ",
              /* @__PURE__ */ jsx("b", { className: "text-[#ffd23f]", children: "+20" }),
              " en Nivel 19"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/[.04] p-3", children: [
              /* @__PURE__ */ jsx("b", { className: "text-[#3dff88]", children: "+5" }),
              " condici\xF3n correcta \xB7 ",
              /* @__PURE__ */ jsx("b", { className: "text-[#ffd23f]", children: "+15" }),
              " con 3 seguidas sin caer en el primer match"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/[.04] p-3", children: [
              /* @__PURE__ */ jsx("b", { className: "text-red-300", children: "\u22125" }),
              " cumple pero no es la \xFAltima \xB7 ",
              /* @__PURE__ */ jsx("b", { className: "text-red-300", children: "\u22123" }),
              " no cumple"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "panel rounded-2xl p-4", children: [
          /* @__PURE__ */ jsxs("h2", { className: "text-xl font-bold", children: [
            "\u{1F9E0} DEPURADOR INTELIGENTE: ",
            /* @__PURE__ */ jsx("span", { className: "neon", children: ".findLast()" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-[#93a3c2]", children: "Mira c\xF3mo el cursor pregunta, de atr\xE1s hacia adelante, hasta encontrar la primera coincidencia desde el final." }),
          /* @__PURE__ */ jsx("div", { className: "scroll-thin mt-3 h-[300px] overflow-y-auto rounded-xl bg-[#02040a] p-3 mono text-[13px] leading-6", children: logs.map((l, i) => /* @__PURE__ */ jsx("div", { className: l.includes("\u2705") || l.includes("findLast =") ? "text-[#3dff88]" : l.includes("\u274C") || l.includes("\u26A0\uFE0F") ? "text-[#ff8b96]" : "text-[#cbd5ea]", children: l }, i)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-xl border border-[#22e6ff]/30 bg-black/40 p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs tracking-widest text-[#93a3c2]", children: "C\xD3DIGO QUE SE REVELA" }),
            /* @__PURE__ */ jsx("p", { className: "mono mt-2 break-words text-sm text-[#22e6ff]", children: level.code }),
            /* @__PURE__ */ jsx("p", { className: "mono mt-2 break-words text-sm text-[#93a3c2]", children: traversed || solved ? `// \u2192 ${target === null ? "undefined" : `{ hora: '${level.shows[target].hora}', genero: '${level.shows[target].genero}', tresD: ${level.shows[target].tresD} }`}` : "// \u2192 ? Recorre o confirma para revelar el objeto." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/[.04] p-3", children: [
              /* @__PURE__ */ jsx("b", { children: "El error t\xEDpico:" }),
              " elegir la primera que cumple por inercia izquierda \u2192 derecha. findLast corrige esa direcci\xF3n."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/[.04] p-3", children: [
              /* @__PURE__ */ jsx("b", { children: "Solo la \xFAltima:" }),
              " puede haber varias que cumplan. Solo la que est\xE1 m\xE1s a la derecha es la respuesta."
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl bg-white/[.04] p-3", children: [
              /* @__PURE__ */ jsx("b", { children: "Si no hay ninguna:" }),
              " el resultado es ",
              /* @__PURE__ */ jsx("span", { className: "mono text-[#ff2d78]", children: "undefined" }),
              ". No es -1 ni null."
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("footer", { className: "mt-5 pb-4 text-center text-xs text-[#93a3c2]", children: "La \xDAltima Funci\xF3n \xB7 Aprende findLast recorriendo la cartelera como un proyeccionista: de derecha a izquierda, hasta la \xFAltima coincidencia." })
    ] })
  ] });
}
export {
  App as default
};
