/* Convertido automáticamente desde Apuntes/findIndex  , findLast  findLastIndex indexOf   lastIndexOf/findIndexCine.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
const LEVELS = [
  {
    id: 1,
    title: "Primero con \u{1F39F} VIP",
    rule: "El primero con \u{1F39F} VIP",
    code: "fila.findIndex(p => p.vip)",
    concept: "Booleano simple",
    answer: 2,
    core: "p.vip",
    detail: "vip",
    accepted: ["p.vip", "p.vip===true", "p.vip==true"],
    people: [{ nombre: "Ana", vip: false, palomitas: true, edad: 28 }, { nombre: "Beto", vip: false, palomitas: false, edad: 35 }, { nombre: "Caro", vip: true, palomitas: false, edad: 16 }, { nombre: "Dani", vip: true, palomitas: true, edad: 22 }, { nombre: "Eva", vip: true, palomitas: false, edad: 19 }]
  },
  {
    id: 2,
    title: "Primero con edad < 18",
    rule: "El primero con edad < 18",
    code: "fila.findIndex(p => p.edad < 18)",
    concept: "Comparaci\xF3n num\xE9rica",
    answer: 3,
    core: "p.edad<18",
    detail: "edad",
    accepted: ["p.edad<18", "p.edad<=17", "p.edad<18"],
    people: [{ nombre: "Ana", vip: true, palomitas: false, edad: 25 }, { nombre: "Beto", vip: false, palomitas: true, edad: 32 }, { nombre: "Caro", vip: false, palomitas: true, edad: 19 }, { nombre: "Dani", vip: true, palomitas: false, edad: 17 }, { nombre: "Eva", vip: false, palomitas: true, edad: 22 }, { nombre: "Fede", vip: true, palomitas: false, edad: 15 }]
  },
  {
    id: 3,
    title: "Primero con \u{1F39F} VIP y \u{1F37F}",
    rule: "El primero con \u{1F39F} VIP y \u{1F37F} palomitas",
    code: "fila.findIndex(p => p.vip && p.palomitas)",
    concept: "Condici\xF3n compuesta (&&)",
    answer: 2,
    core: "p.vip&&p.palomitas",
    detail: "vip-palomitas",
    accepted: ["p.vip&&p.palomitas", "p.palomitas&&p.vip"],
    people: [{ nombre: "Ana", vip: false, palomitas: true, edad: 28 }, { nombre: "Beto", vip: true, palomitas: false, edad: 35 }, { nombre: "Caro", vip: true, palomitas: true, edad: 16 }, { nombre: "Dani", vip: true, palomitas: true, edad: 22 }, { nombre: "Eva", vip: false, palomitas: true, edad: 19 }]
  },
  {
    id: 4,
    title: "Primero sin \u{1F37F} palomitas",
    rule: "El primero sin \u{1F37F} palomitas",
    code: "fila.findIndex(p => !p.palomitas)",
    concept: "Negaci\xF3n (!)",
    answer: 2,
    core: "!p.palomitas",
    detail: "palomitas",
    accepted: ["!p.palomitas", "p.palomitas===false", "p.palomitas==false", "!p.palomitas===true"],
    people: [{ nombre: "Ana", vip: true, palomitas: true, edad: 28 }, { nombre: "Beto", vip: false, palomitas: true, edad: 35 }, { nombre: "Caro", vip: true, palomitas: false, edad: 16 }, { nombre: "Dani", vip: false, palomitas: true, edad: 22 }, { nombre: "Eva", vip: true, palomitas: false, edad: 19 }]
  },
  {
    id: 5,
    title: "Primero con nombre 'C'",
    rule: "El primero cuyo nombre empiece por 'C'",
    code: "fila.findIndex(p => p.nombre.startsWith('C'))",
    concept: "Condici\xF3n sobre string",
    answer: 3,
    core: "p.nombre.startswith('c')",
    detail: "nombre",
    accepted: ["p.nombre.startswith('c')", 'p.nombre.startswith("c")', "p.nombre[0]==='c'", 'p.nombre[0]==="c"'],
    people: [{ nombre: "Ana", vip: false, palomitas: true, edad: 28 }, { nombre: "Beto", vip: true, palomitas: false, edad: 35 }, { nombre: "Dani", vip: true, palomitas: true, edad: 22 }, { nombre: "Caro", vip: true, palomitas: false, edad: 16 }, { nombre: "Eva", vip: false, palomitas: true, edad: 19 }, { nombre: "Carlos", vip: true, palomitas: false, edad: 31 }]
  },
  {
    id: 6,
    title: "TRAMPA: VIP + \u{1F9D2} + \u{1F37F}",
    rule: "El primero con \u{1F39F} VIP y \u{1F9D2} menor y \u{1F37F} palomitas",
    code: "fila.findIndex(p => p.vip && p.edad < 18 && p.palomitas)",
    concept: "Nadie cumple \u2192 -1",
    answer: -1,
    core: "p.vip&&p.edad<18&&p.palomitas",
    detail: "triple",
    accepted: ["p.vip&&p.edad<18&&p.palomitas", "p.vip&&p.palomitas&&p.edad<18", "p.edad<18&&p.vip&&p.palomitas"],
    people: [{ nombre: "Ana", vip: true, palomitas: true, edad: 28 }, { nombre: "Beto", vip: true, palomitas: false, edad: 16 }, { nombre: "Caro", vip: false, palomitas: true, edad: 15 }, { nombre: "Dani", vip: true, palomitas: false, edad: 28 }, { nombre: "Eva", vip: false, palomitas: false, edad: 14 }, { nombre: "Fede", vip: false, palomitas: true, edad: 30 }]
  }
];
const NAMES = ["Ana", "Beto", "Caro", "Dani", "Eva", "Fede", "Gala", "Hugo", "Iris", "Javi", "Luna", "Marco", "Nina", "Omar", "P\xEDa", "Quino", "Rosa", "Santi", "Tina", "Ugo", "Vera", "Willy", "Ximena", "Yago", "Zoe", "Alba", "Bruno", "Clara", "Diego", "Emma"];
function makeInfinite() {
  const arr = Array.from({ length: 50 }, (_, i) => {
    const n = NAMES[i % NAMES.length] + (i >= NAMES.length ? " " + (Math.floor(i / NAMES.length) + 1) : "");
    return { nombre: n, vip: Math.random() < 0.38, palomitas: Math.random() < 0.48, edad: 12 + Math.floor(Math.random() * 49) };
  });
  arr[3].vip = true;
  arr[10].palomitas = true;
  arr[20].edad = 14;
  arr[1].vip = false;
  arr[2].vip = false;
  arr[0].vip = false;
  return arr;
}
function checkPerson(level, p) {
  if (level.id === 1) return p.vip;
  if (level.id === 2) return p.edad < 18;
  if (level.id === 3) return p.vip && p.palomitas;
  if (level.id === 4) return !p.palomitas;
  if (level.id === 5) return p.nombre.startsWith("C");
  return p.vip && p.edad < 18 && p.palomitas;
}
function describe(level, p) {
  const menor = p.edad < 18;
  if (level.id === 1) return `vip: ${p.vip}`;
  if (level.id === 2) return `edad: ${p.edad} \u2192 edad < 18: ${p.edad < 18}`;
  if (level.id === 3) return `vip: ${p.vip}, palomitas: ${p.palomitas}`;
  if (level.id === 4) return `palomitas: ${p.palomitas} \u2192 !palomitas: ${!p.palomitas}`;
  if (level.id === 5) return `nombre: "${p.nombre}" \u2192 empieza por 'C': ${p.nombre.startsWith("C")}`;
  return `vip: ${p.vip}, menor: ${menor} (edad ${p.edad}), palomitas: ${p.palomitas}`;
}
function normalizeCond(raw) {
  return raw.toLowerCase().replace(/\s+/g, "").replace(/;$/, "").replace(/^\(p\)=>/, "").replace(/^p=>/, "").replace(/"/g, "'").replace(/\(p\)/g, "p");
}
function App() {
  const [levelId, setLevelId] = useState(1);
  const [infinite, setInfinite] = useState(false);
  const [people, setPeople] = useState(LEVELS[0].people);
  const [round, setRound] = useState(1);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badge, setBadge] = useState(false);
  const [solved, setSolved] = useState([]);
  const [phase, setPhase] = useState(1);
  const [cursor, setCursor] = useState(-1);
  const [scanning, setScanning] = useState(false);
  const [passed, setPassed] = useState(false);
  const [scanDone, setScanDone] = useState(false);
  const [resolved, setResolved] = useState(false);
  const [result, setResult] = useState("");
  const [logs, setLogs] = useState(["\u25B6 Depurador listo. Pulsa ESCANEAR para recorrer la fila."]);
  const [condition, setCondition] = useState("");
  const [condOk, setCondOk] = useState(null);
  const [bitacora, setBitacora] = useState(["\u{1F3AC} Bienvenido/a, acomodador/a. La sala est\xE1 lista."]);
  const [shake, setShake] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [infStep, setInfStep] = useState(0);
  const [infTargets, setInfTargets] = useState([]);
  const [infFound, setInfFound] = useState([]);
  const [infDone, setInfDone] = useState(false);
  const cursorRef = useRef(-1);
  cursorRef.current = cursor;
  const scanningRef = useRef(false);
  scanningRef.current = scanning;
  const level = LEVELS.find((l) => l.id === levelId);
  const correct = useMemo(() => {
    if (!infinite) return level.answer;
    if (!infTargets.length) return -999;
    return infTargets[infStep];
  }, [infinite, level, infTargets, infStep]);
  const infStart = useMemo(() => infStep === 0 ? 0 : (infFound[infStep - 1] ?? 0) + 1, [infStep, infFound]);
  const pushLog = (s) => setLogs((prev) => [...prev.slice(-60), s]);
  const pushBit = (s) => setBitacora((prev) => [s, ...prev].slice(0, 12));
  const startScan = () => {
    if (scanning || resolved) return;
    const start = infinite ? infStart : 0;
    setPhase(2);
    setScanning(true);
    setPassed(false);
    setScanDone(false);
    setCursor(start);
    const p = people[start];
    const ok = infinite ? infStep === 0 ? p.vip : infStep === 1 ? p.palomitas : p.edad < 18 : checkPerson(level, p);
    pushLog(`\u25B6 Inicio en [${start}] \u2014 fila[${start}]`);
    pushLog(`[${start}] ${p.nombre} \u2014 ${infinite ? infStep === 0 ? `vip: ${p.vip}` : infStep === 1 ? `palomitas: ${p.palomitas}` : `edad: ${p.edad} \u2192 menor: ${p.edad < 18}` : describe(level, p)} \u2192 ${ok ? "\u2705 \xA1ALTO! findIndex se detendr\xEDa aqu\xED." : "\u274C no cumple \u2192 sigue"}`);
    if (ok && start === correct) pushLog(`\u{1F4A1} Pista: este S\xCD cumple. Si no detienes ahora, te pasar\xE1s.`);
  };
  useEffect(() => {
    if (!scanning) return;
    const t = setTimeout(() => {
      const cur = cursorRef.current;
      const next = cur + 1;
      if (correct !== -999 && correct !== -1 && cur === correct && !passed) {
        setPassed(true);
        setPoints((p2) => p2 - 5);
        setStreak(0);
        pushLog(`\u26A0\uFE0F \xA1Ya pasaste al primero! findIndex se habr\xEDa detenido aqu\xED en el ${correct}. Si sigues, perder\xE1s -5.`);
        pushBit(`\u26A0\uFE0F Ronda ${round}: te pasaste del ${correct} (\u22125)`);
      }
      if (next >= people.length) {
        setScanning(false);
        setScanDone(true);
        setPhase(3);
        pushLog(`\u{1F3C1} Fin del recorrido. Revis\xF3 ${people.length} personas.`);
        if (!infinite && level.answer === -1) pushLog(`\u{1F9E0} Revis\xF3 los ${people.length}, ninguno cumpli\xF3 las 3 condiciones \u2192 por eso devuelve -1.`);
        if (infinite) pushLog(`\u{1F3C1} Fin del tramo. Si no detuviste en el primero, vuelve a escanear este paso.`);
        return;
      }
      setCursor(next);
      const p = people[next];
      const ok = infinite ? infStep === 0 ? p.vip : infStep === 1 ? p.palomitas : p.edad < 18 : checkPerson(level, p);
      pushLog(`[${next}] ${p.nombre} \u2014 ${infinite ? infStep === 0 ? `vip: ${p.vip}` : infStep === 1 ? `palomitas: ${p.palomitas}` : `edad: ${p.edad} \u2192 menor: ${p.edad < 18}` : describe(level, p)} \u2192 ${ok ? "\u2705 \xA1ALTO!" : "\u274C no cumple \u2192 sigue"}`);
    }, 700);
    return () => clearTimeout(t);
  }, [scanning, cursor, people, correct]);
  const failShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };
  const stopHere = () => {
    if (resolved) return;
    if (!infinite && level.answer === -1) {
      setScanning(false);
      setResolved(true);
      setPhase(3);
      setPoints((p) => p - 3);
      setStreak(0);
      failShake();
      setResult(`\u274C En esta fila NADIE cumple las 3 condiciones. Detener en [${cursor}] resta \u22123. La respuesta era \u22121.`);
      pushLog(`\u{1F6D1} Detenido en [${cursor}] \u2192 no es v\xE1lido en el caso \u22121. \u22123 puntos.`);
      pushBit(`\u274C Ronda ${round}: detuviste en [${cursor}] en la trampa (\u22123)`);
      return;
    }
    if (cursor < 0) {
      setResult("Pulsa ESCANEAR primero para mover el cursor.");
      return;
    }
    setScanning(false);
    const isCorrect = cursor === correct;
    const norm = normalizeCond(condition);
    const condGood = !infinite && condition.trim() !== "" && level.accepted.map((a) => normalizeCond(a)).includes(norm);
    setCondOk(condition.trim() ? condGood : null);
    if (isCorrect) {
      if (passed) {
        setResolved(true);
        setPhase(3);
        setResult(`\u26A0\uFE0F Te hab\xEDas pasado del ${correct} (\u22125 ya aplicado). Detener aqu\xED ya no suma +10. findIndex se habr\xEDa detenido antes.`);
        pushLog(`\u{1F6D1} Detenido en [${cursor}] despu\xE9s de pasarse. Sin +10.`);
        pushBit(`\u26A0\uFE0F Ronda ${round}: detuviste tarde en [${cursor}]`);
        return;
      }
      setConfetti(true);
      setTimeout(() => setConfetti(false), 1800);
      if (!infinite) {
        const bonus = condGood ? 5 : 0;
        const base = 10 + bonus;
        const newStreak = streak + 1;
        let extra = 0;
        let gotBadge = false;
        if (newStreak >= 3) {
          extra = 15;
          gotBadge = true;
        }
        setPoints((p) => p + base + extra);
        setStreak(gotBadge ? 0 : newStreak);
        if (gotBadge) setBadge(true);
        setSolved((prev) => prev.includes(levelId) ? prev : [...prev, levelId]);
        setResult(`\u2705 \xA1Correcto! ${level.code} // \u2192 ${correct}${condGood ? "  \xB7  +5 por la condici\xF3n" : ""}${extra ? "  \xB7  +15 BONUS ACOMODADOR EXPERTO \u{1F3AC}" : ""}  \u2192  +${base + extra} puntos.`);
        pushLog(`\u{1F389} ${level.code} // \u2192 ${correct} \u2705  (+${base + extra})`);
        pushBit(`\u2705 Ronda ${round}: Nivel ${levelId} correcto en [${correct}] (+${base + extra})`);
      } else {
        setPoints((p) => p + 10);
        const found = [...infFound, cursor];
        setInfFound(found);
        pushLog(`\u{1F389} Paso ${infStep + 1} correcto: ${infStep === 0 ? "X" : infStep === 1 ? "Y" : "Z"} = ${cursor} (+10)`);
        if (infStep < 2) {
          setResult(`\u2705 Paso ${infStep + 1} correcto: ${infStep === 0 ? "X" : infStep === 1 ? "Y" : "Z"} = ${cursor} (+10). Pulsa ESCANEAR para el paso ${infStep + 2}.`);
          setInfStep(infStep + 1);
          setCursor(-1);
          setPhase(1);
          setScanDone(false);
        } else {
          setInfDone(true);
          setResult(`\u{1F3C6} \xA1CADENA COMPLETA! X=${found[0]}, Y=${found[1]}, Z=${found[2]}  \xB7  +30 en total. Eres acomodador/a experto/a.`);
          pushBit(`\u{1F3C6} Fila Infinita completa: X=${found[0]}, Y=${found[1]}, Z=${found[2]} (+30)`);
          setResolved(true);
        }
      }
      if (!infinite) setResolved(true);
      setPhase(3);
    } else {
      setPoints((p) => p - 3);
      setStreak(0);
      failShake();
      setResolved(true);
      setPhase(3);
      setResult(`\u274C Detuviste en [${cursor}], pero ${people[cursor]?.nombre} no es el primero que cumple. ${level.code} // \u2192 ${correct}. \u22123 puntos.`);
      pushLog(`\u{1F6D1} Detenido en [${cursor}] \u2192 incorrecto. Correcto: ${correct}. \u22123.`);
      pushBit(`\u274C Ronda ${round}: detuviste en [${cursor}], correcto era ${correct} (\u22123)`);
    }
  };
  const nobody = () => {
    if (!scanDone) {
      setResult("Primero deja que el escaneo llegue al final de la fila. As\xED compruebas que nadie cumple.");
      return;
    }
    if (resolved) return;
    setScanning(false);
    setResolved(true);
    setPhase(3);
    setConfetti(true);
    setTimeout(() => setConfetti(false), 1800);
    setPoints((p) => p + 10);
    const ns = streak + 1;
    let extra = 0;
    if (ns >= 3) {
      extra = 15;
      setBadge(true);
      setStreak(0);
    } else setStreak(ns);
    setSolved((prev) => prev.includes(6) ? prev : [...prev, 6]);
    setResult(`\u2705 \xA1Correcto! ${level.code} // \u2192 \u22121. Revis\xF3 los 6, ninguno cumpli\xF3 las 3, por eso devuelve \u22121. +${10 + extra} puntos.`);
    pushLog(`\u{1F389} ${level.code} // \u2192 -1 \u2705 (+${10 + extra})`);
    pushBit(`\u2705 Ronda ${round}: trampa resuelta, \u22121 (+${10 + extra})`);
  };
  const chooseLevel = (id) => {
    setInfinite(false);
    setLevelId(id);
    setPeople(LEVELS.find((l) => l.id === id).people);
    setRound((r) => r + 1);
    setPhase(1);
    setCursor(-1);
    setScanning(false);
    setPassed(false);
    setScanDone(false);
    setResolved(false);
    setResult("");
    setCondition("");
    setCondOk(null);
    setConfetti(false);
    setLogs([`\u25B6 Nivel ${id}: ${LEVELS.find((l) => l.id === id).rule}. Lee la regla y pulsa ESCANEAR.`]);
    pushBit(`\u{1F39F} Nivel ${id} cargado`);
  };
  const startInfinite = () => {
    const arr = makeInfinite();
    const x = arr.findIndex((p) => p.vip);
    const y = arr.slice(x + 1).findIndex((p) => p.palomitas) + (x + 1);
    const z = arr.slice(y + 1).findIndex((p) => p.edad < 18) + (y + 1);
    setPeople(arr);
    setInfinite(true);
    setInfTargets([x, y, z]);
    setInfFound([]);
    setInfStep(0);
    setInfDone(false);
    setRound((r) => r + 1);
    setPhase(1);
    setCursor(-1);
    setScanning(false);
    setPassed(false);
    setScanDone(false);
    setResolved(false);
    setResult("");
    setCondition("");
    setConfetti(false);
    setLogs([`\u267E\uFE0F Fila Infinita: 50 personas generadas. Paso 1 busca el primer VIP desde [0].`]);
    pushBit("\u267E\uFE0F Modo Fila Infinita: 50 personas");
  };
  const nextRound = () => {
    if (infinite) {
      startInfinite();
      return;
    }
    const next = levelId >= 6 ? 1 : levelId + 1;
    chooseLevel(next);
  };
  const restart = () => {
    setPoints(0);
    setStreak(0);
    setBadge(false);
    setSolved([]);
    setRound(1);
    setLogs(["\u25B6 Juego reiniciado. Depurador listo."]);
    setBitacora(["\u{1F3AC} Juego reiniciado. La sala est\xE1 lista."]);
    chooseLevel(1);
  };
  const phaseLabel = phase === 1 ? "FASE 1 \xB7 LEER LA REGLA" : phase === 2 ? "FASE 2 \xB7 ESCANEAR" : "FASE 3 \xB7 CONFIRMAR";
  return /* @__PURE__ */ jsxs("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "#030508" }, className: "overflow-x-clip text-[#f4f6ff]", children: [
    /* @__PURE__ */ jsxs("div", { className: "curtain relative overflow-hidden border-b-4 border-[#ffd23f]", children: [
      /* @__PURE__ */ jsx("div", { className: "flex justify-between px-3 py-1", "aria-hidden": "true", children: Array.from({ length: 18 }).map((_, i) => /* @__PURE__ */ jsx("span", { className: "light inline-block h-2.5 w-2.5 rounded-full bg-[#ffd23f] shadow-[0_0_12px_#ffd23f]", style: { animationDelay: `${i * 0.09}s` } }, i)) }),
      /* @__PURE__ */ jsxs("div", { className: "px-3 pb-3 text-center", children: [
        /* @__PURE__ */ jsx("p", { className: "text-[11px] tracking-[0.35em] text-[#ffd23f] font-bold", children: "\u2605 CINE \u2605 PALOMITAS \u2605 ESTRENO \u2605" }),
        /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(24px,4vw,44px)] leading-none font-bold text-white drop-shadow-[0_0_18px_rgba(255,43,58,.8)]", children: [
          "\u{1F3AC} CINE \u201CEL PRIMER MATCH\u201D ",
          /* @__PURE__ */ jsxs("span", { className: "text-[#ffd23f]", children: [
            "\u2014 Ronda ",
            round
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)" }, className: "sticky z-40 bg-[#030508]/95 backdrop-blur border-b border-[#26324f]", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1500px] px-3 py-2 flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 px-3 py-1 text-sm font-bold", children: "SIN API \u2705 \xB7 JS local" }),
        /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-[#ffd23f]/15 border border-[#ffd23f]/40 text-[#ffd23f] px-3 py-1 text-sm font-bold", children: [
          "\u2B50 PUNTOS: ",
          points
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-[#ff2b3a]/15 border border-[#ff2b3a]/40 text-rose-200 px-3 py-1 text-sm font-bold", children: [
          "\u{1F525} RACHA: ",
          streak
        ] }),
        badge && /* @__PURE__ */ jsx("span", { className: "rounded-full bg-violet-500/20 border border-violet-300/50 text-violet-200 px-3 py-1 text-sm font-bold", children: "\u{1F3AC} ACOMODADOR/A EXPERTO/A" }),
        /* @__PURE__ */ jsx("button", { onClick: restart, className: "ghost-btn ml-auto px-3 py-1.5 text-sm", children: "\u21BA Reiniciar" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1500px] px-3 pb-2 text-xs sm:text-sm text-[#aab4d4]", children: [
        "Eres el/la acomodador/a. Encuentra al ",
        /* @__PURE__ */ jsx("b", { className: "text-white", children: "PRIMERO" }),
        " que cumpla la regla. Avanza desde el inicio y detente en el primer acierto."
      ] })
    ] }),
    /* @__PURE__ */ jsx("section", { className: "mx-auto max-w-[1500px] px-3 pt-3", children: /* @__PURE__ */ jsxs("div", { className: "panel p-3 sm:p-4", children: [
      /* @__PURE__ */ jsx("p", { className: "text-[#ffd23f] font-bold tracking-wide text-sm", children: "\u{1F9E0} CONCEPTO DID\xC1CTICO CLAVE \u2014 L\xC9ELO SIEMPRE" }),
      /* @__PURE__ */ jsxs("div", { className: "mt-2 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-black/30 border border-[#26324f] p-2", children: [
          /* @__PURE__ */ jsx("b", { children: "findIndex devuelve el \xCDNDICE" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-[#aab4d4]", children: "Si devuelve 2, es la posici\xF3n [2], no la persona." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-black/30 border border-[#26324f] p-2", children: [
          /* @__PURE__ */ jsx("b", { children: "Condici\xF3n, no igualdad" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-[#aab4d4]", children: "La regla es \u201Ctiene VIP\u201D, no \u201Ces Caro\u201D." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-black/30 border border-[#26324f] p-2", children: [
          /* @__PURE__ */ jsx("b", { children: "Solo el PRIMERO" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-[#aab4d4]", children: "Hay 3 VIP, pero solo el \xEDndice 2 es v\xE1lido." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-black/30 border border-[#26324f] p-2", children: [
          /* @__PURE__ */ jsx("b", { children: "Escaneo ordenado" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-[#aab4d4]", children: "De izquierda a derecha y se detiene." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-black/30 border border-[#26324f] p-2", children: [
          /* @__PURE__ */ jsx("b", { children: "Caso \u22121" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-[#aab4d4]", children: "Si nadie cumple, findIndex devuelve \u22121." })
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[1500px] px-3 py-3 grid gap-3 lg:grid-cols-[300px_1fr_420px] items-start", children: [
      /* @__PURE__ */ jsxs("div", { className: "grid gap-3", children: [
        /* @__PURE__ */ jsxs("section", { className: "panel p-3 sm:p-4", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", children: "\u{1F39F} NIVELES" }),
          /* @__PURE__ */ jsxs("div", { className: "mt-2 grid gap-2", children: [
            LEVELS.map((l) => /* @__PURE__ */ jsxs("button", { onClick: () => chooseLevel(l.id), className: `text-left rounded-xl border px-3 py-2 transition ${levelId === l.id && !infinite ? "border-[#ffd23f] bg-[#ffd23f]/10" : "border-[#26324f] bg-black/20 hover:border-[#ffd23f]/50"}`, children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-2", children: [
                /* @__PURE__ */ jsxs("b", { children: [
                  l.id,
                  ". ",
                  l.title
                ] }),
                /* @__PURE__ */ jsx("span", { children: solved.includes(l.id) ? "\u2705" : "" })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-[#aab4d4]", children: [
                l.concept,
                " \xB7 Respuesta: ",
                l.id === 6 ? "\u22121" : `[${l.answer}]`
              ] })
            ] }, l.id)),
            /* @__PURE__ */ jsxs("button", { onClick: startInfinite, className: `text-left rounded-xl border px-3 py-2 ${infinite ? "border-emerald-400 bg-emerald-400/10" : "border-[#26324f] bg-black/20"}`, children: [
              /* @__PURE__ */ jsx("b", { children: "\u267E\uFE0F MODO FILA INFINITA: 50 PERSONAS" }),
              /* @__PURE__ */ jsx("div", { className: "text-xs text-[#aab4d4]", children: "3 reglas encadenadas \xB7 +30 si aciertas las 3" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl bg-[#ffd23f]/10 border border-[#ffd23f]/30 p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xs tracking-widest text-[#ffd23f] font-bold", children: "REGLA ACTUAL" }),
            /* @__PURE__ */ jsx("p", { className: "text-xl leading-tight font-bold mt-1", children: infinite ? infStep === 0 ? "El primero con \u{1F39F} VIP" : infStep === 1 ? `El primero con \u{1F37F} palomitas desde [${infStart}]` : `El primero menor (edad < 18) desde [${infStart}]` : level.rule }),
            /* @__PURE__ */ jsx("p", { className: "mono text-xs mt-2 text-emerald-300 break-words", children: infinite ? infStep === 0 ? "fila.findIndex(p => p.vip)" : infStep === 1 ? `fila.slice(${infStart}).findIndex(p => p.palomitas)` : `fila.slice(${infStart}).findIndex(p => p.edad < 18)` : level.code }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 inline-block rounded-full bg-black/40 px-2 py-1 text-xs font-bold", children: phaseLabel }),
            infinite && /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm", children: [
              "Paso ",
              /* @__PURE__ */ jsxs("b", { children: [
                infStep + 1,
                " de 3"
              ] }),
              " \xB7 ",
              infFound.length ? `Encontrados: ${infFound.join(", ")}` : "A\xFAn sin pasos resueltos"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-3 sm:p-4", children: [
          /* @__PURE__ */ jsx("h3", { className: "font-bold", children: "\u{1F4D3} BIT\xC1CORA" }),
          /* @__PURE__ */ jsx("ul", { className: "mt-2 grid gap-1.5 text-sm text-[#cbd2ee]", children: bitacora.map((b, i) => /* @__PURE__ */ jsx("li", { className: "rounded-lg bg-black/25 px-2 py-1.5", children: b }, i)) }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-[#aab4d4]", children: "Puntuaci\xF3n: +10 acierto \xB7 +5 condici\xF3n \xB7 \u22125 pasarte \xB7 \u22123 detener mal \xB7 +15 con 3 seguidas sin pasarte." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "panel relative overflow-hidden p-3 sm:p-4", children: [
        confetti && /* @__PURE__ */ jsx("div", { "aria-hidden": "true", children: Array.from({ length: 26 }).map((_, i) => /* @__PURE__ */ jsx("span", { className: "pop text-2xl", style: { left: `${i * 37 % 96}%`, animationDelay: `${i % 7 * 0.12}s` }, children: "\u{1F37F}" }, i)) }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", children: "\u{1F39E}\uFE0F FILA DEL CINE" }),
          /* @__PURE__ */ jsxs("span", { className: "text-sm text-[#aab4d4]", children: [
            people.length,
            " personas \xB7 Cursor: ",
            cursor >= 0 ? `[${cursor}] ${people[cursor]?.nombre}` : "\u2014"
          ] })
        ] }),
        infinite && /* @__PURE__ */ jsxs("div", { className: "mt-2 mono text-xs sm:text-sm bg-black/40 border border-emerald-400/30 rounded-lg p-2", children: [
          "X = ",
          infFound[0] ?? "?",
          " \xB7 Y = ",
          infFound[1] ?? "?",
          " \xB7 Z = ",
          infFound[2] ?? "?",
          " ",
          /* @__PURE__ */ jsx("span", { className: "text-[#aab4d4]", children: "\u2014 X: primer VIP \xB7 Y: primer \u{1F37F} desde X+1 \xB7 Z: primer menor desde Y+1" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx("span", { className: `font-bold ${scanning ? "blink text-[#ffd23f]" : ""}`, children: scanning ? "\u25B6 CURSOR EN MOVIMIENTO" : "\u25B6 CURSOR" }),
          /* @__PURE__ */ jsx("div", { className: "h-2 flex-1 rounded-full bg-white/10 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "h-full bg-gradient-to-r from-[#ff2b3a] to-[#ffd23f] transition-all duration-500", style: { width: cursor >= 0 ? `${(cursor + 1) / people.length * 100}%` : "0%" } }) }),
          /* @__PURE__ */ jsx("span", { className: "mono", children: cursor >= 0 ? `[${cursor}]` : "" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: `mt-3 overflow-x-auto scroll-thin pb-2 ${shake ? "shake" : ""}`, children: /* @__PURE__ */ jsx("div", { className: "flex gap-2", style: { minWidth: "max-content" }, children: people.map((p, i) => {
          const isCursor = i === cursor;
          const isWin = resolved && !infinite && i === correct;
          const isInfWin = infinite && infFound.includes(i);
          const isPassedMark = passed && i === correct;
          return /* @__PURE__ */ jsxs("div", { className: "w-[104px] shrink-0", children: [
            /* @__PURE__ */ jsx("div", { className: `text-center text-2xl h-9 ${isCursor ? "" : "opacity-0"}`, "aria-hidden": "true", children: "\u2B07\uFE0F" }),
            /* @__PURE__ */ jsxs("div", { className: `rounded-xl border p-2 text-center transition-all ${isCursor ? "border-[#ffd23f] bg-[#ffd23f]/10 scale-[1.03]" : isWin || isInfWin ? "win-card border-emerald-400 bg-emerald-400/10" : isPassedMark ? "border-red-500 bg-red-500/10" : "border-[#26324f] bg-black/25"}`, children: [
              /* @__PURE__ */ jsxs("div", { className: "mono text-xs text-[#aab4d4]", children: [
                "[",
                i,
                "]"
              ] }),
              /* @__PURE__ */ jsx("div", { className: "text-3xl leading-none my-1", children: "\u{1F464}" }),
              /* @__PURE__ */ jsx("div", { className: "font-bold leading-tight break-words", children: p.nombre }),
              /* @__PURE__ */ jsxs("div", { className: "text-lg leading-tight min-h-[28px]", children: [
                p.vip ? "\u{1F39F} " : "",
                p.palomitas ? "\u{1F37F} " : "",
                p.edad < 18 ? "\u{1F9D2}" : ""
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-xs text-[#aab4d4]", children: [
                "Edad: ",
                p.edad
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-[#aab4d4] leading-tight", children: [
                "vip: ",
                String(p.vip),
                " \xB7 \u{1F37F}: ",
                String(p.palomitas)
              ] })
            ] })
          ] }, i);
        }) }) }),
        passed && /* @__PURE__ */ jsxs("div", { role: "alert", className: "mt-2 rounded-xl border border-red-500 bg-red-500/15 p-3 font-bold text-red-100", children: [
          "\u26A0\uFE0F \xA1Ya pasaste al primero! findIndex se habr\xEDa detenido aqu\xED en el ",
          correct,
          ". Si sigues, perder\xE1s \u22125."
        ] }),
        result && /* @__PURE__ */ jsx("div", { role: "status", className: "mt-2 rounded-xl border border-[#ffd23f]/40 bg-[#ffd23f]/10 p-3 font-bold", children: result }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-2 sm:grid-cols-2", children: [
          /* @__PURE__ */ jsx("button", { onClick: startScan, disabled: scanning || resolved, className: "neon-btn px-4 py-3 text-base sm:text-lg", children: "\u25B6 ESCANEAR" }),
          /* @__PURE__ */ jsx("button", { onClick: stopHere, disabled: resolved || cursor < 0, className: "gold-btn px-4 py-3 text-base sm:text-lg", children: "\u23F8 DETENER AQU\xCD" }),
          !infinite && levelId === 6 && /* @__PURE__ */ jsx("button", { onClick: nobody, disabled: resolved, className: "ghost-btn px-4 py-3", children: "\u{1F6AB} NADIE CUMPLE (\u22121)" }),
          /* @__PURE__ */ jsx("button", { onClick: nextRound, className: "ghost-btn px-4 py-3", children: "\u27A1\uFE0F SIGUIENTE RONDA" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-xs text-[#aab4d4]", children: "En el Nivel 6, deja que el escaneo llegue al final y luego pulsa \u201CNADIE CUMPLE (\u22121)\u201D." }),
        /* @__PURE__ */ jsxs("label", { className: "mt-3 block", children: [
          /* @__PURE__ */ jsxs("span", { className: "text-sm font-bold", children: [
            "\u270D\uFE0F Escribe la condici\xF3n para +5 extra ",
            /* @__PURE__ */ jsx("span", { className: "font-normal text-[#aab4d4]", children: "(opcional \xB7 ej: p => p.vip)" })
          ] }),
          /* @__PURE__ */ jsx("input", { value: condition, onChange: (e) => {
            setCondition(e.target.value);
            setCondOk(null);
          }, disabled: resolved, placeholder: "p => p.vip", className: "mono mt-1 w-full rounded-xl border border-[#344168] bg-black/50 px-3 py-2.5 text-white outline-none focus:border-[#ffd23f]" })
        ] }),
        condOk !== null && /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm font-bold", children: condOk ? "\u2705 Condici\xF3n correcta: +5 al acertar." : "\u2139\uFE0F Esa condici\xF3n no coincide con la regla de esta ronda." }),
        infinite && /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl bg-black/30 border border-[#26324f] p-3 text-sm", children: [
          /* @__PURE__ */ jsx("b", { children: "C\xF3mo funciona la cadena:" }),
          " Paso 1 busca VIP. Paso 2 es como hacer ",
          /* @__PURE__ */ jsx("span", { className: "mono", children: "findIndex" }),
          " sobre ",
          /* @__PURE__ */ jsx("span", { className: "mono", children: "fila.slice(X+1)" }),
          " buscando \u{1F37F}. Paso 3 lo mismo desde Y+1 buscando menor. Det\xE9n el cursor en cada paso."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "panel p-3 sm:p-4", children: [
        /* @__PURE__ */ jsxs("h2", { className: "font-bold text-lg", children: [
          "\u{1F5A5}\uFE0F DEPURADOR AVANZADO: ",
          /* @__PURE__ */ jsx("span", { className: "mono text-base", children: ".findIndex()" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mono mt-2 rounded-xl bg-black/70 border border-[#26324f] p-3 text-[12px] leading-5 min-h-[260px] max-h-[420px] overflow-y-auto scroll-thin", "aria-live": "polite", children: logs.map((l, i) => /* @__PURE__ */ jsx("div", { className: l.includes("\u26A0\uFE0F") ? "text-red-300 font-bold" : l.includes("\u2705") || l.includes("\u{1F389}") ? "text-emerald-300" : l.includes("\u25B6") ? "text-[#ffd23f]" : "text-[#d7dcf5]", children: l }, i)) }),
        /* @__PURE__ */ jsxs("div", { className: "mono mt-3 rounded-xl bg-[#0a1a12] border border-emerald-400/30 p-3 text-sm break-words", children: [
          /* @__PURE__ */ jsx("span", { className: "text-emerald-300", children: infinite ? "// Cadena infinita" : level.code }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsxs("span", { className: "text-white", children: [
            "// \u2192 ",
            resolved ? infinite ? infDone ? `${infFound.join(" \u2192 ")}` : "\u2026" : level.answer : "?"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 grid gap-2 text-sm", children: [
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-black/25 p-2", children: [
            /* @__PURE__ */ jsx("b", { children: "\xBFQu\xE9 devuelve?" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-[#aab4d4]", children: "Un n\xFAmero: el \xEDndice. Nunca la persona completa." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-black/25 p-2", children: [
            /* @__PURE__ */ jsx("b", { children: "\xBFCu\xE1ndo se detiene?" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-[#aab4d4]", children: "En el PRIMER true. No sigue buscando." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-lg bg-black/25 p-2", children: [
            /* @__PURE__ */ jsx("b", { children: "\xBFY si no hay match?" }),
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { className: "text-[#aab4d4]", children: "Recorre toda la fila y devuelve \u22121." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setLogs(["\u25B6 Depurador limpio. Pulsa ESCANEAR para volver a recorrer."]), className: "ghost-btn mt-3 w-full px-3 py-2 text-sm", children: "\u{1F9F9} Limpiar depurador" })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "mx-auto max-w-[1500px] px-3 pb-6 text-center text-xs text-[#aab4d4]", children: "\u{1F3AC} La fila avanza de izquierda a derecha. Tu trabajo es detenerte justo en el primer match. \xB7 Juego local, sin API." })
  ] });
}
export {
  App as default
};
