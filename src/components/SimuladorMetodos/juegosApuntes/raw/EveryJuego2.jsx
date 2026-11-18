/* Convertido automáticamente desde Apuntes/every/jeugo.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Heart, Rocket, Wrench, Search, Send, RotateCcw, Sparkles, Shield, AlertTriangle, ChevronRight } from "lucide-react";
const SYSTEMS = [
  { id: "motores", name: "Motores", icon: "\u{1F680}", role: "Ingenier\xEDa de Motores", hint: "Las toberas vibran m\xE1s de lo normal y hay un zumbido raro al encender." },
  { id: "oxigeno", name: "Ox\xEDgeno", icon: "\u{1FAC1}", role: "Soporte Vital", hint: "Los tanques marcan menos presi\xF3n de la que deber\xEDa haber. Falta aire." },
  { id: "combustible", name: "Combustible", icon: "\u26FD", role: "Propulsi\xF3n y Tanques", hint: "Hay una peque\xF1a fuga y el medidor baja aunque nadie use combustible." },
  { id: "comunicaciones", name: "Comunicaciones", icon: "\u{1F4E1}", role: "Comunicaciones", hint: "La antena pierde se\xF1al cada pocos segundos y se corta la radio." },
  { id: "escudos", name: "Escudos", icon: "\u{1F6E1}\uFE0F", role: "Escudos T\xE9rmicos", hint: "Una placa del escudo est\xE1 suelta y el calor entrar\xEDa al reingreso." },
  { id: "comida", name: "Comida", icon: "\u{1F354}", role: "Provisiones", hint: "Las raciones est\xE1n contadas mal: faltan paquetes para el viaje." }
];
const NAMES = ["Alex", "Maya", "Leo", "Nia", "Hugo", "Sara", "Iv\xE1n", "Luna", "Diego", "Zoe"];
const READY_LINES = {
  motores: ["Motores al 100%, capit\xE1n, todo listo para despegar.", "Motores perfectos. Empuje estable, sin vibraciones raras."],
  oxigeno: ["Ox\xEDgeno al 100%, capit\xE1n. Aire limpio y tanques llenos.", "Ox\xEDgeno estable, presi\xF3n perfecta. Respira tranquilo, capit\xE1n."],
  combustible: ["Combustible al 100%, capit\xE1n. Tanques llenos y sin fugas.", "Combustible listo. Medidor estable, sin p\xE9rdidas."],
  comunicaciones: ["Comunicaciones al 100%, capit\xE1n. Se\xF1al fuerte y clara.", "Comunicaciones listas. Radio y antena funcionando perfecto."],
  escudos: ["Escudos al 100%, capit\xE1n. Placas firmes y listas.", "Escudos perfectos. Nada suelto, todo sellado."],
  comida: ["Comida al 100%, capit\xE1n. Raciones completas para toda la tripulaci\xF3n.", "Comida lista. Todo contado y guardado."]
};
const EVASIVE = [
  "Ehh... casi listo... un 99%... creo.",
  "S\xED, s\xED, todo bien... creo. No mires mucho el medidor.",
  "\xBFListo? Claro... casi... bueno, casi casi."
];
const CONTRADICTIONS = {
  motores: "Espera... antes dije 100% y ahora... vale, los motores hacen un ruido raro.",
  oxigeno: "Bueno... antes dije que todo bien, pero... la presi\xF3n no es la que deber\xEDa.",
  combustible: "Ay... antes dije sin fugas, pero el medidor baja solo. Hay algo raro.",
  comunicaciones: "Mmm... antes dije se\xF1al fuerte, pero se corta cada poco. No es normal.",
  escudos: "Vale, me pillaste. Antes dije todo sellado, pero hay una placa suelta.",
  comida: "Eh... antes dije raciones completas, pero faltan paquetes. Lo cont\xE9 mal."
};
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function norm(s) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}
function makeRound(round) {
  const engineers = shuffle(NAMES).slice(0, 6);
  const failCount = Math.random() < 0.55 ? 1 : 2;
  const failIdx = shuffle([0, 1, 2, 3, 4, 5]).slice(0, failCount);
  return SYSTEMS.map((def, i) => ({ def, engineer: engineers[i], ready: !failIdx.includes(i), checked: false, suspicion: failIdx.includes(i) ? 18 : 6, asks: 0, repaired: false }));
}
async function api(action, args) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(json.error || `Error ${res.status}`);
  return json.data;
}
function App() {
  const [round, setRound] = useState(1);
  const [lives, setLives] = useState(4);
  const [systems, setSystems] = useState(() => makeRound(1));
  const [selected, setSelected] = useState("motores");
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { id: 1, from: "sys", text: "\u{1F680} NAVE SOME-1 \xB7 CAPIT\xC1N EN EL PUENTE. Interroga a un ingeniero: haz clic en su sistema y preg\xFAntale. El depurador vigila cada .every()." },
    { id: 2, from: "eng", name: "Alex \xB7 Motores", text: "Capit\xE1n, aqu\xED Motores. Listo para su interrogatorio." }
  ]);
  const [debug, setDebug] = useState([
    { id: 1, text: "> Depurador listo. Escribe sistemas.every(s => s.estaListo) para comprobar.", kind: "cmd" },
    { id: 2, text: "\u{1F9E0} Depurador: .every() solo da TRUE si TODOS dan TRUE. Un solo FALSE basta para dar FALSE.", kind: "brain" }
  ]);
  const [bitacora, setBitacora] = useState([]);
  const [bitacoraError, setBitacoraError] = useState("");
  const [status, setStatus] = useState("");
  const [launching, setLaunching] = useState(false);
  const [failedLaunch, setFailedLaunch] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [repairBusy, setRepairBusy] = useState(false);
  const [saving, setSaving] = useState(false);
  const msgRef = useRef(null);
  const dbgRef = useRef(null);
  const idRef = useRef(10);
  const nextId = () => ++idRef.current;
  const sel = systems.find((s) => s.def.id === selected) || systems[0];
  const checkedCount = systems.filter((s) => s.checked).length;
  const readyCount = systems.filter((s) => s.ready).length;
  const loadBitacora = async () => {
    try {
      const data = await api("records.list", { collection: "every-bitacora", limit: 50 });
      setBitacora((data?.records || []).slice().reverse());
      setBitacoraError("");
    } catch (e) {
      setBitacoraError("La bit\xE1cora guardada no est\xE1 disponible ahora. El juego sigue offline.");
    }
  };
  useEffect(() => {
    loadBitacora();
  }, []);
  useEffect(() => {
    msgRef.current?.scrollTo({ top: msgRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);
  useEffect(() => {
    dbgRef.current?.scrollTo({ top: dbgRef.current.scrollHeight, behavior: "smooth" });
  }, [debug]);
  const pushDebug = (text, kind) => setDebug((d) => [...d, { id: nextId(), text, kind }]);
  const pushMsg = (m) => setMessages((mm) => [...mm, { ...m, id: nextId() }]);
  const saveBitacora = async (value) => {
    setSaving(true);
    try {
      const rec = await api("records.create", { collection: "every-bitacora", value, idempotency_key: `every-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` });
      if (rec) setBitacora((b) => [rec, ...b].slice(0, 50));
    } catch (e) {
      setBitacoraError("No se pudo guardar esta ronda en la bit\xE1cora.");
    }
    setSaving(false);
  };
  const ask = (raw) => {
    const q = (raw ?? input).trim();
    if (!q) return;
    if (gameOver || launching) return;
    let targetId = selected;
    const found = SYSTEMS.find((s) => norm(q).includes(norm(s.name)));
    if (found) targetId = found.id;
    const target = systems.find((s) => s.def.id === targetId);
    setSelected(targetId);
    pushMsg({ from: "cap", name: "CAPIT\xC1N", text: q });
    setInput("");
    const n = norm(q);
    setTimeout(() => {
      let reply = "";
      const asks = target.asks + 1;
      if (!target.ready) {
        if (asks >= 3) reply = CONTRADICTIONS[target.def.id];
        else if (asks === 2) reply = EVASIVE[1];
        else reply = EVASIVE[0];
        if (n.includes("despegar")) reply += " \xBFDespegar? Ehh... mejor revisa todo antes.";
        if (n.includes("elon") || n.includes("musk")) reply += " Elon nos mira... mejor no le digas nada todav\xEDa.";
        if (n.includes("falla")) reply += " \xBFFalla? Yo no dije falla... \xBFverdad?";
        setSystems((prev) => prev.map((s) => s.def.id === targetId ? { ...s, asks, suspicion: Math.min(100, s.suspicion + 25) } : s));
      } else {
        const lines = READY_LINES[target.def.id];
        reply = lines[Math.floor(Math.random() * lines.length)];
        if (n.includes("elon") || n.includes("musk")) reply += " Elon estar\xE1 orgulloso, capit\xE1n.";
        if (n.includes("despegar")) reply += " Podemos despegar cuando usted ordene.";
        if (n.includes("falla")) reply += " En mi sistema no hay ninguna falla, capit\xE1n. Puede comprobarlo.";
        setSystems((prev) => prev.map((s) => s.def.id === targetId ? { ...s, asks } : s));
      }
      pushMsg({ from: "eng", name: `${target.engineer} \xB7 ${target.def.name}`, text: reply });
      if (!target.ready && asks >= 2) pushMsg({ from: "sys", text: `\u26A0\uFE0F SOSPECHA SUBE EN ${target.def.name.toUpperCase()}: el ingeniero se contradice. Sospecha +25.` });
    }, 260);
  };
  const reviewSingle = () => {
    const target = sel;
    pushDebug(`> Ejecutando [${target.def.name}].every(s => s.estaListo) // array de 1`, "cmd");
    pushDebug(`[Iteraci\xF3n 0] Evaluando ${target.def.name}...`, "iter");
    pushDebug(`   -> Callback retorn\xF3: ${target.ready ? "TRUE (Listo)" : "FALSE (Falla)"}`, target.ready ? "ok" : "bad");
    if (target.ready) {
      pushDebug(`\u{1F9E0} Depurador: Con 1 elemento, si da TRUE el resultado es TRUE. Este sistema est\xE1 listo.`, "brain");
      pushDebug(`> [${target.def.name}].every() finalizado. Resultado: true`, "final");
      setStatus(`\u2705 ${target.def.name}: LISTO. Su ingeniero dec\xEDa la verdad.`);
    } else {
      pushDebug(`\u{1F9E0} Depurador: \xA1SHORT-CIRCUIT! Con 1 elemento que da FALSE, ya sabe que el resultado es FALSE.`, "brain");
      pushDebug(`> [${target.def.name}].every() finalizado. Resultado: false`, "final");
      setStatus(`\u274C ${target.def.name}: FALLA. Necesita reparaci\xF3n.`);
      pushMsg({ from: "sys", text: `\u274C REVISI\xD3N INDIVIDUAL: ${target.def.name} est\xE1 en FALLA. ${target.engineer} intentaba disimularlo.` });
    }
    setSystems((prev) => prev.map((s) => s.def.id === target.def.id ? { ...s, checked: true } : s));
  };
  const reviewAll = () => {
    pushDebug(`> Ejecutando sistemas.every(s => s.estaListo)`, "cmd");
    let evaluated = 0;
    let failed = null;
    for (let i = 0; i < systems.length; i++) {
      const s = systems[i];
      evaluated++;
      pushDebug(`[Iteraci\xF3n ${i}] Evaluando ${s.def.name}...`, "iter");
      pushDebug(`   -> Callback retorn\xF3: ${s.ready ? "TRUE (Listo)" : "FALSE (Falla)"}`, s.ready ? "ok" : "bad");
      if (s.ready) {
        pushDebug(`\u{1F9E0} Depurador: Como dio TRUE, .every() DEBE seguir, a\xFAn no puede asegurar que TODOS est\xE1n listos.`, "brain");
      } else {
        const remaining = systems.length - i - 1;
        pushDebug(`\u{1F9E0} Depurador: \xA1SHORT-CIRCUIT! Como encontr\xF3 1 FALSE, .every() ya sabe que el resultado final es FALSE. No necesita revisar los ${remaining} restantes. Ahorr\xF3 ${remaining} iteraciones.`, "brain");
        failed = s;
        break;
      }
    }
    const checkedIds = new Set(systems.slice(0, evaluated).map((s) => s.def.id));
    setSystems((prev) => prev.map((s) => checkedIds.has(s.def.id) ? { ...s, checked: true } : s));
    if (failed) {
      pushDebug(`> .every() finalizado. Resultado: false`, "final");
      pushDebug(`> \u274C NO PUEDES DESPEGAR, ${failed.def.name.toUpperCase()} FALL\xD3. Repara ese sistema.`, "bad");
      setStatus(`\u274C NO PUEDES DESPEGAR, ${failed.def.name.toUpperCase()} FALL\xD3. Repara ese sistema.`);
      pushMsg({ from: "sys", text: `\u274C REVISI\xD3N GLOBAL: .every() se detuvo en ${failed.def.name}. ${failed.engineer} es quien arruin\xF3 al grupo.` });
    } else {
      pushDebug(`\u{1F9E0} Depurador: Revis\xF3 los 6 y todos dieron TRUE, por eso el resultado es TRUE. \xA1Todos est\xE1n listos!`, "brain");
      pushDebug(`> .every() finalizado. Resultado: true`, "final");
      setStatus(`\u2705 TODOS LISTOS. sistemas.every() = TRUE. Puedes intentar despegar.`);
      pushMsg({ from: "sys", text: `\u2705 REVISI\xD3N GLOBAL: los 6 sistemas dieron TRUE. \xA1Todos listos para despegar!` });
    }
  };
  const repair = () => {
    if (!sel || sel.ready) return;
    setRepairBusy(true);
    pushMsg({ from: "cap", name: "CAPIT\xC1N", text: `\u{1F527} ${sel.engineer}, repara ${sel.def.name} ahora mismo.` });
    setTimeout(() => {
      const ok = Math.random() < 0.7;
      if (ok) {
        setSystems((prev) => prev.map((s) => s.def.id === sel.def.id ? { ...s, ready: true, checked: true, suspicion: 4, repaired: true } : s));
        pushMsg({ from: "eng", name: `${sel.engineer} \xB7 ${sel.def.name}`, text: `\xA1Reparado, capit\xE1n! ${sel.def.name} ya est\xE1 al 100%. Puede comprobarlo con .every().` });
        setStatus(`\u{1F527} ${sel.def.name} REPARADO. Ahora estaListo = true.`);
        pushDebug(`> Reparaci\xF3n en ${sel.def.name}: \xC9XITO. estaListo pas\xF3 de false a true.`, "ok");
      } else {
        setSystems((prev) => prev.map((s) => s.def.id === sel.def.id ? { ...s, suspicion: Math.min(100, s.suspicion + 15) } : s));
        pushMsg({ from: "eng", name: `${sel.engineer} \xB7 ${sel.def.name}`, text: `No qued\xF3, capit\xE1n... PISTA: ${sel.def.hint}` });
        setStatus(`\u{1F527} La reparaci\xF3n fall\xF3. ${sel.engineer} te dio una pista. Int\xE9ntalo otra vez.`);
        pushDebug(`> Reparaci\xF3n en ${sel.def.name}: FALL\xD3 (30%). El ingeniero dej\xF3 una pista.`, "bad");
      }
      setRepairBusy(false);
    }, 650);
  };
  const attemptLaunch = () => {
    if (launching || gameOver) return;
    pushDebug(`> \u{1F680} INTENTAR DESPEGAR: Ejecutando sistemas.every(s => s.estaListo)`, "cmd");
    const failed = systems.find((s) => !s.ready);
    if (!failed) {
      pushDebug(`\u{1F9E0} Depurador: Revis\xF3 los 6 y todos dieron TRUE, por eso el resultado es TRUE. \xA1Todos est\xE1n listos!`, "brain");
      pushDebug(`> .every() finalizado. Resultado: true`, "final");
      setSystems((prev) => prev.map((s) => ({ ...s, checked: true })));
      setLaunching(true);
      setStatus("\u{1F680} \xA1DESPEGUE EXITOSO! \xA1TODOS LOS SISTEMAS LISTOS!");
      saveBitacora({ ronda: round, resultado: "DESPEGUE EXITOSO", sistemas: systems.map((s) => `${s.def.name}:${s.ready ? "LISTO" : "FALLA"}`).join(", "), fecha: (/* @__PURE__ */ new Date()).toLocaleString("es-ES") });
    } else {
      const newLives = lives - 1;
      setLives(newLives);
      setFailedLaunch(true);
      setTimeout(() => setFailedLaunch(false), 650);
      pushDebug(`> .every() finalizado. Resultado: false`, "final");
      pushDebug(`> \u274C NO PUEDES DESPEGAR, ${failed.def.name.toUpperCase()} FALL\xD3. Repara ese sistema.`, "bad");
      setStatus(`\u274C NO PUEDES DESPEGAR, ${failed.def.name.toUpperCase()} FALL\xD3. Pierdes 1 coraz\xF3n. Te quedan ${newLives}/4.`);
      pushMsg({ from: "sys", text: `\u274C DESPEGUE BLOQUEADO: ${failed.def.name} sigue en FALLA. Corazones: ${newLives}/4.` });
      if (newLives <= 0) {
        setTimeout(() => {
          setGameOver(true);
          saveBitacora({ ronda: round, resultado: "MISI\xD3N FALLIDA", sistemas: systems.map((s) => `${s.def.name}:${s.ready ? "LISTO" : "FALLA"}`).join(", "), fecha: (/* @__PURE__ */ new Date()).toLocaleString("es-ES") });
        }, 700);
      }
    }
  };
  const nextMission = () => {
    const nr = round + 1;
    setRound(nr);
    setSystems(makeRound(nr));
    setLaunching(false);
    setSelected("motores");
    setMessages([{ id: nextId(), from: "sys", text: `\u{1F680} MISI\xD3N ${nr} \xB7 Nueva tripulaci\xF3n, nuevos sistemas. Hay 1 o 2 fallas escondidas. Interroga antes de despegar.` }]);
    setDebug([{ id: nextId(), text: `> Misi\xF3n ${nr} iniciada. sistemas.every(s => s.estaListo) pendiente.`, kind: "cmd" }]);
    setStatus(`\u{1F6F0}\uFE0F MISI\xD3N ${nr} iniciada. Interroga a los ingenieros.`);
  };
  const restart = () => {
    setRound(1);
    setLives(4);
    setSystems(makeRound(1));
    setGameOver(false);
    setLaunching(false);
    setSelected("motores");
    setMessages([{ id: nextId(), from: "sys", text: "\u{1F680} NAVE SOME-1 REINICIADA. Corazones 4/4. Nueva misi\xF3n, capit\xE1n." }]);
    setDebug([{ id: nextId(), text: "> Depurador listo. systems.every(s => s.estaListo) te espera.", kind: "cmd" }]);
    setStatus("\u{1F504} Partida reiniciada. Ronda 1.");
    loadBitacora();
  };
  const quickQs = ["\xBFEst\xE1s listo?", "\xBFHay alguna falla?", "\xBFPodemos despegar?", "\xBFQu\xE9 dice Elon Musk de esto?"];
  const dbgColor = (k) => k === "bad" ? "text-[#ff7a92]" : k === "ok" ? "text-[#2eff8a]" : k === "brain" ? "text-[#ffc83d]" : k === "final" ? "text-white font-bold" : "text-[#9fb0c8]";
  return /* @__PURE__ */ jsxs("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "var(--bg)" }, className: "overflow-x-clip", children: [
    /* @__PURE__ */ jsxs("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)" }, className: "sticky z-30 border-b border-[#1c2b4d] bg-[#030508]/95 backdrop-blur", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1500px] px-3 sm:px-5 py-3 flex flex-col lg:flex-row lg:items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(20px,3vw,34px)] leading-[1.05] font-bold tracking-wide", children: [
            "\u{1F680} CAPIT\xC1N ",
            /* @__PURE__ */ jsx("span", { className: "text-[#9fb0c8]", children: "//" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "neon", children: "CONTRATADO POR ELON MUSK" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-[#9fb0c8] font-semibold tracking-[.18em] text-[12px] sm:text-sm", children: [
            "NAVE SOME-1 \xB7 ",
            /* @__PURE__ */ jsx("span", { className: "text-[#2eff8a]", children: "EVERY: \xBFTODOS LISTOS PARA DESPEGAR?" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 lg:ml-auto", children: [
          /* @__PURE__ */ jsx("span", { className: "chip !text-[#2eff8a] !border-[#234a33]", children: "IA CASERA V2.0 - OFFLINE \u2705 SIN API" }),
          /* @__PURE__ */ jsxs("span", { className: "chip !text-white !border-[#38f8ff]", children: [
            "RONDA ",
            round
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 bg-[#0a1122] border border-[#1c2b4d] rounded-full px-3 py-1.5", "aria-label": `Vidas ${lives} de 4`, children: [
            [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx(Heart, { size: 18, className: i < lives ? "fill-[#ff3d5e] text-[#ff3d5e]" : "text-[#2a3550]" }, i)),
            /* @__PURE__ */ jsxs("b", { className: "text-sm ml-1", children: [
              lives,
              "/4"
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1500px] px-3 sm:px-5 pb-3 flex flex-wrap gap-2 text-[12px] sm:text-[13px] text-[#9fb0c8]", children: [
        /* @__PURE__ */ jsx("span", { className: "chip", children: "sistemas.every(s => s.estaListo)" }),
        /* @__PURE__ */ jsx("span", { className: "chip", children: "\u2705 TRUE = todos listos" }),
        /* @__PURE__ */ jsx("span", { className: "chip", children: "\u274C 1 FALSE = no despegas" }),
        /* @__PURE__ */ jsxs("span", { className: "chip", children: [
          "Revisados: ",
          checkedCount,
          "/6 \xB7 Listos: ",
          readyCount,
          "/6"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[1500px] px-3 sm:px-5 py-4 grid gap-4 lg:grid-cols-[300px_1fr_420px] items-start", children: [
      /* @__PURE__ */ jsxs("section", { className: "space-y-4 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg tracking-wide", children: "SISTEMAS DE LA NAVE" }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs font-code text-[#9fb0c8]", children: [
              checkedCount,
              "/6 revisados"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-[#9fb0c8] mt-1", children: "Toca un sistema para interrogar a su ingeniero." }),
          /* @__PURE__ */ jsx("div", { className: "mt-3 space-y-2", children: systems.map((s) => {
            const label = !s.checked ? "SIN REVISAR" : s.ready ? "\u2705 LISTO" : "\u274C FALLA - NECESITA REPARACI\xD3N";
            const color = !s.checked ? "text-[#ffc83d]" : s.ready ? "text-[#2eff8a]" : "text-[#ff7a92]";
            return /* @__PURE__ */ jsx("button", { onClick: () => {
              setSelected(s.def.id);
              setStatus(`\u{1F3A4} Interrogando a ${s.engineer} \xB7 ${s.def.name}. Preg\xFAntale si est\xE1 listo.`);
            }, className: `sys-card w-full text-left ${selected === s.def.id ? "selected" : ""}`, "aria-pressed": selected === s.def.id, children: /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-2xl leading-none", children: s.def.icon }),
              /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-2", children: [
                  /* @__PURE__ */ jsx("b", { className: "text-[17px] leading-tight", children: s.def.name }),
                  /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-code text-[#9fb0c8]", children: [
                    s.def.id,
                    ".estaListo"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-sm text-[#9fb0c8]", children: [
                  s.engineer,
                  " \xB7 ",
                  s.def.role
                ] }),
                /* @__PURE__ */ jsx("div", { className: `text-[13px] font-bold mt-1 ${color}`, children: label }),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
                  /* @__PURE__ */ jsx("div", { className: "susp flex-1", children: /* @__PURE__ */ jsx("div", { style: { width: `${s.suspicion}%`, background: s.suspicion >= 60 ? "#ff3d5e" : s.suspicion >= 30 ? "#ffc83d" : "#2eff8a" } }) }),
                  /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-code text-[#9fb0c8]", children: [
                    s.suspicion,
                    "%"
                  ] })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "text-[11px] text-[#9fb0c8] mt-1", children: [
                  "Sospecha \xB7 Preguntas: ",
                  s.asks
                ] })
              ] })
            ] }) }, s.def.id);
          }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "panel p-4", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", children: "\u{1F4D3} BIT\xC1CORA PERSISTENTE" }),
            /* @__PURE__ */ jsx("span", { className: "text-[11px] font-code text-[#2eff8a]", children: saving ? "Guardando\u2026" : "Guardada" })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-sm text-[#9fb0c8]", children: "Resultados de rondas. Se guarda aunque cierres y vuelvas." }),
          bitacoraError && /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#ffc83d] mt-2", children: bitacoraError }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 space-y-2 max-h-[260px] overflow-y-auto scrollbox pr-1", children: [
            bitacora.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-[#9fb0c8] border border-dashed border-[#263a66] rounded-xl p-3", children: "Sin misiones guardadas todav\xEDa. Completa un despegue o termina una partida para escribir la primera entrada." }),
            bitacora.map((b) => /* @__PURE__ */ jsxs("article", { className: "border border-[#1c2b4d] rounded-xl p-3 bg-[#080f20]", children: [
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-2", children: [
                /* @__PURE__ */ jsx("b", { className: "text-[15px]", children: b.value?.resultado || "Misi\xF3n" }),
                /* @__PURE__ */ jsxs("span", { className: "text-[11px] font-code text-[#9fb0c8]", children: [
                  "Ronda ",
                  b.value?.ronda ?? "\u2014"
                ] })
              ] }),
              /* @__PURE__ */ jsx("p", { className: "text-[13px] text-[#9fb0c8] mt-1 break-words", children: b.value?.sistemas || "" }),
              /* @__PURE__ */ jsx("p", { className: "text-[11px] font-code text-[#5f7292] mt-1", children: b.value?.fecha || "" })
            ] }, b.id))
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: loadBitacora, className: "btn btn-dark w-full mt-3 flex items-center justify-center gap-2", children: [
            /* @__PURE__ */ jsx(RotateCcw, { size: 16 }),
            " Actualizar bit\xE1cora"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: `panel p-4 sm:p-5 min-w-0 ${failedLaunch ? "shake" : ""}`, children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl tracking-wide", children: "INTERROGATORIO A INGENIEROS" }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#9fb0c8]", children: [
              "Interrogando a ",
              /* @__PURE__ */ jsx("b", { className: "text-white", children: sel?.engineer }),
              " \xB7 ",
              sel?.def.name,
              " ",
              sel?.def.icon,
              " \xB7 ",
              sel?.def.role
            ] })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "chip", children: [
            "\u{1F3A4} Preguntas: ",
            sel?.asks,
            " \xB7 Sospecha ",
            sel?.suspicion,
            "%"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { ref: msgRef, className: "scrollbox mt-4 h-[340px] sm:h-[380px] overflow-y-auto rounded-2xl border border-[#1c2b4d] bg-[#040713] p-3 space-y-3", "aria-live": "polite", children: messages.map((m) => /* @__PURE__ */ jsx("div", { className: `flex ${m.from === "cap" ? "justify-end" : "justify-start"}`, children: /* @__PURE__ */ jsxs("div", { className: `msg ${m.from === "cap" ? "msg-cap" : m.from === "eng" ? "msg-eng" : "msg-sys"}`, children: [
          m.name && /* @__PURE__ */ jsx("div", { className: "text-[11px] font-code uppercase tracking-wider opacity-80 mb-1", children: m.name }),
          /* @__PURE__ */ jsx("div", { className: "text-[15px]", children: m.text })
        ] }) }, m.id)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-2", children: quickQs.map((q) => /* @__PURE__ */ jsx("button", { onClick: () => ask(q), className: "chip hover:border-[#38f8ff] hover:text-white", children: q }, q)) }),
          /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
            e.preventDefault();
            ask();
          }, className: "mt-3 flex gap-2", children: [
            /* @__PURE__ */ jsx("label", { className: "sr-only", htmlFor: "pregunta", children: "Pregunta al ingeniero" }),
            /* @__PURE__ */ jsx("input", { id: "pregunta", value: input, onChange: (e) => setInput(e.target.value), placeholder: `Pregunta a ${sel?.engineer} (${sel?.def.name}): \xBFest\xE1s listo? \xBFhay falla?`, className: "flex-1 min-w-0 bg-[#040713] border border-[#263a66] rounded-xl px-3 py-3 text-[15px] placeholder:text-[#5f7292]" }),
            /* @__PURE__ */ jsxs("button", { type: "submit", className: "btn btn-neon flex items-center gap-2 shrink-0", children: [
              /* @__PURE__ */ jsx(Send, { size: 17 }),
              " PREGUNTAR"
            ] })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[12px] text-[#9fb0c8] mt-2 font-code", children: "La IA casera detecta: listo \xB7 falla \xB7 ox\xEDgeno \xB7 motores \xB7 combustible \xB7 despegar \xB7 elon \xB7 musk" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 grid sm:grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxs("button", { onClick: reviewSingle, className: "btn btn-dark text-left", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-[#38f8ff]", children: [
              /* @__PURE__ */ jsx(Shield, { size: 18 }),
              " \u{1F6E1}\uFE0F REVISAR SOLO ESTE SISTEMA"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "block font-code text-[12px] text-[#9fb0c8] mt-1", children: [
              "[",
              sel?.def.name,
              "].every(s => s.estaListo)"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "block text-sm mt-1", children: [
              "Revisa solo a ",
              sel?.engineer,
              "."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: reviewAll, className: "btn btn-dark text-left", children: [
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 text-[#ffc83d]", children: [
              /* @__PURE__ */ jsx(Search, { size: 18 }),
              " \u{1F50D} REVISAR TODOS"
            ] }),
            /* @__PURE__ */ jsx("span", { className: "block font-code text-[12px] text-[#9fb0c8] mt-1", children: "sistemas.every(s => s.estaListo)" }),
            /* @__PURE__ */ jsx("span", { className: "block text-sm mt-1", children: "Con short-circuit: se detiene en el primer FALSE." })
          ] })
        ] }),
        sel && !sel.ready && sel.checked && /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-2xl border border-[#ff3d5e]/50 bg-[#2a0a14] p-3 flex flex-col sm:flex-row sm:items-center gap-3 pop", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1", children: [
            /* @__PURE__ */ jsxs("b", { className: "text-[#ff7a92]", children: [
              "\u274C ",
              sel.def.name,
              " EN FALLA"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#e8c8cf]", children: [
              "Reparar tiene 70% de \xE9xito. Si falla, ",
              sel.engineer,
              " te dar\xE1 una pista."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: repair, disabled: repairBusy, className: "btn btn-danger flex items-center justify-center gap-2 shrink-0", children: [
            /* @__PURE__ */ jsx(Wrench, { size: 18 }),
            " ",
            repairBusy ? "REPARANDO\u2026" : "\u{1F527} REPARAR ESTE SISTEMA"
          ] })
        ] }),
        sel && !sel.ready && !sel.checked && /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border border-dashed border-[#263a66] p-3 text-sm text-[#9fb0c8] flex gap-2", children: [
          /* @__PURE__ */ jsx(AlertTriangle, { size: 18, className: "text-[#ffc83d] shrink-0" }),
          " ",
          sel.def.name,
          " a\xFAn no est\xE1 confirmado. Pregunta 2\u20133 veces o pulsa ",
          /* @__PURE__ */ jsx("b", { className: "text-white", children: "Revisar solo este sistema" }),
          " para descubrir si miente."
        ] }),
        /* @__PURE__ */ jsxs("button", { onClick: attemptLaunch, className: "btn btn-primary w-full mt-4 text-[18px] py-4 flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(Rocket, { size: 22 }),
          " \u{1F680} INTENTAR DESPEGAR"
        ] }),
        status && /* @__PURE__ */ jsx("div", { className: `mt-3 rounded-xl border p-3 text-[15px] font-semibold ${status.includes("\u274C") ? "border-[#ff3d5e]/50 bg-[#2a0a14] text-[#ffc6d0]" : status.includes("\u2705") || status.includes("\u{1F680}") || status.includes("\u{1F527}") ? "border-[#2eff8a]/40 bg-[#0a2416] text-[#c8ffe0]" : "border-[#263a66] bg-[#0a1122]"}`, role: "status", children: status }),
        /* @__PURE__ */ jsxs("p", { className: "text-center text-[13px] text-[#9fb0c8] mt-3", children: [
          "EVERY consiste en comprobar que ",
          /* @__PURE__ */ jsx("b", { className: "text-white", children: "TODO sea TRUE" }),
          ". Si alguno es FALSE, el resultado es FALSE."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "panel p-4 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx("h2", { className: "font-bold text-lg", children: "\u{1F9E0} DEPURADOR INTELIGENTE" }),
          /* @__PURE__ */ jsx("span", { className: "chip", children: ".every()" })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "text-sm text-[#9fb0c8] mt-1", children: "Como un profesor: te explica cada iteraci\xF3n y por qu\xE9 se detiene." }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl bg-[#0b1224] border border-[#1c2b4d] p-3", children: [
          /* @__PURE__ */ jsx("div", { className: "font-code text-[13px] leading-relaxed text-[#9fb0c8]", children: "sistemas.every(s => s.estaListo)" }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-wrap gap-1", children: systems.map((s, i) => /* @__PURE__ */ jsxs("span", { className: `font-code text-[11px] px-2 py-1 rounded-full border ${s.checked ? s.ready ? "border-[#2eff8a] text-[#2eff8a]" : "border-[#ff3d5e] text-[#ff7a92]" : "border-[#263a66] text-[#9fb0c8]"}`, children: [
            i,
            ":",
            s.def.name,
            " ",
            s.checked ? s.ready ? "\u2713" : "\u2715" : "?"
          ] }, s.def.id)) })
        ] }),
        /* @__PURE__ */ jsx("div", { ref: dbgRef, className: "scrollbox mt-3 h-[380px] sm:h-[460px] overflow-y-auto rounded-2xl bg-black/70 border border-[#1c2b4d] p-3 font-code text-[13px] leading-[1.55] space-y-1.5", "aria-live": "polite", children: debug.map((l) => /* @__PURE__ */ jsx("p", { className: dbgColor(l.kind), children: l.text }, l.id)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 rounded-xl border border-[#263a66] p-3", children: [
          /* @__PURE__ */ jsxs("b", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Sparkles, { size: 16, className: "text-[#ffc83d]" }),
            " \xBFC\xF3mo funciona .every()?"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#9fb0c8] mt-1", children: [
            "Recorre uno por uno. Si uno da ",
            /* @__PURE__ */ jsx("b", { className: "text-[#ff7a92]", children: "FALSE" }),
            ", hace ",
            /* @__PURE__ */ jsx("b", { className: "text-white", children: "SHORT-CIRCUIT" }),
            ": se detiene y ya no revisa los dem\xE1s. Solo si los 6 dan TRUE, el resultado final es TRUE."
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setDebug([{ id: nextId(), text: "> Consola limpia. Lista para la siguiente depuraci\xF3n.", kind: "cmd" }]), className: "btn btn-dark w-full mt-3", children: "Limpiar depurador" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("footer", { className: "mx-auto max-w-[1500px] px-3 sm:px-5 pb-6 text-center text-[13px] text-[#9fb0c8]", children: [
      /* @__PURE__ */ jsx("p", { children: "Capit\xE1n: si TODOS dicen TRUE, despegas. Si UNO solo dice FALSE, el depurador hace SHORT-CIRCUIT y te dice qui\xE9n fall\xF3. Repara ese uno." }),
      /* @__PURE__ */ jsx("p", { className: "font-code mt-1", children: "EVERY = comprobar que TODO sea TRUE \xB7 SIN API \xB7 IA casera 100% offline" })
    ] }),
    launching && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 overflow-hidden bg-[#02030f]", role: "dialog", "aria-modal": "true", "aria-label": "Despegue exitoso", children: [
      /* @__PURE__ */ jsx("div", { className: "absolute inset-0", style: { background: "radial-gradient(ellipse at 50% 110%, #1a2b6b 0%, #050818 48%, #01020a 100%)" }, children: Array.from({ length: 60 }).map((_, i) => /* @__PURE__ */ jsx("span", { className: "star", style: { left: `${i * 37 % 100}%`, top: `${i * 53 % 78}%`, width: i % 3 === 0 ? 3 : 2, height: i % 3 === 0 ? 3 : 2, animationDelay: `${i % 7 * 0.3}s` } }, i)) }),
      /* @__PURE__ */ jsxs("div", { className: "relative h-full flex flex-col items-center justify-end pb-[10vh] px-4 text-center launching", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4", children: [
          /* @__PURE__ */ jsx("p", { className: "text-[#2eff8a] font-bold tracking-[.25em] text-sm", children: "SISTEMAS.EVERY() = TRUE" }),
          /* @__PURE__ */ jsx("h2", { className: "text-[clamp(28px,6vw,58px)] leading-none font-bold mt-2", children: "\u{1F680} \xA1DESPEGUE EXITOSO!" }),
          /* @__PURE__ */ jsx("p", { className: "text-xl sm:text-2xl font-bold mt-2", children: "\xA1TODOS LOS SISTEMAS LISTOS!" }),
          /* @__PURE__ */ jsx("p", { className: "text-[#9fb0c8] text-lg mt-2", children: "ELON MUSK: Buen trabajo, Capit\xE1n." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "rocket-move relative flex flex-col items-center", children: [
          /* @__PURE__ */ jsx("div", { className: "text-[clamp(110px,22vw,190px)] leading-none drop-shadow-[0_0_35px_rgba(255,180,0,.7)]", style: { filter: "drop-shadow(0 0 24px rgba(255,200,0,.6))" }, children: "\u{1F680}" }),
          /* @__PURE__ */ jsxs("div", { className: "relative -mt-3 flex justify-center", children: [
            /* @__PURE__ */ jsx("div", { className: "flame w-[68px] h-[110px] rounded-b-full bg-gradient-to-b from-[#fff7ae] via-[#ffc83d] to-[#ff4d00] shadow-[0_0_45px_#ff8a00]" }),
            /* @__PURE__ */ jsx("div", { className: "flame2 absolute top-2 w-[34px] h-[70px] rounded-b-full bg-[#fff3c4]" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex gap-4 mt-1", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsx("span", { className: "smoke w-8 h-8 rounded-full bg-[#cbd5e1]/70 blur-[2px]", style: { animationDelay: `${i * 0.35}s` } }, i)) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-6 flex flex-wrap justify-center gap-3", children: /* @__PURE__ */ jsxs("button", { onClick: nextMission, className: "btn btn-primary text-lg px-6 py-3 flex items-center gap-2", children: [
          "SIGUIENTE MISI\xD3N ",
          /* @__PURE__ */ jsx(ChevronRight, { size: 20 })
        ] }) }),
        /* @__PURE__ */ jsx("p", { className: "font-code text-[12px] text-[#9fb0c8] mt-3", children: "El cohete sube en 3.5 segundos \xB7 Fuego y humo activados \u{1F525}" })
      ] })
    ] }),
    gameOver && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center p-4", role: "dialog", "aria-modal": "true", "aria-label": "Misi\xF3n fallida", children: /* @__PURE__ */ jsxs("div", { className: "panel max-w-[560px] w-full p-6 sm:p-8 text-center pop", children: [
      /* @__PURE__ */ jsx("div", { className: "text-6xl", children: "\u{1F4A5}" }),
      /* @__PURE__ */ jsx("h2", { className: "text-[clamp(28px,6vw,44px)] font-bold leading-tight mt-3 text-[#ff7a92]", children: "MISI\xD3N FALLIDA" }),
      /* @__PURE__ */ jsx("p", { className: "text-xl font-bold mt-2", children: "LA NAVE NO DESPEG\xD3" }),
      /* @__PURE__ */ jsxs("p", { className: "text-[#9fb0c8] mt-3 text-[15px] leading-relaxed", children: [
        "GAME OVER. El director te descont\xF3 puntos por despegar sin que TODOS los sistemas estuvieran listos.",
        /* @__PURE__ */ jsx("br", {}),
        "Recuerda: ",
        /* @__PURE__ */ jsx("span", { className: "font-code text-white", children: "sistemas.every(s => s.estaListo)" }),
        " debe ser TRUE. Un solo FALSE lo arruina todo."
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 flex flex-col sm:flex-row gap-2 justify-center", children: [
        /* @__PURE__ */ jsxs("button", { onClick: restart, className: "btn btn-primary px-6 py-3 flex items-center justify-center gap-2", children: [
          /* @__PURE__ */ jsx(RotateCcw, { size: 18 }),
          " REINICIAR MISI\xD3N"
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => {
          setGameOver(false);
          setLives(2);
          setStatus("\u{1F6DF} El director te dio 2 corazones extra. Repara y vuelve a intentarlo.");
        }, className: "btn btn-dark px-6 py-3", children: "Seguir con 2 corazones" })
      ] })
    ] }) })
  ] });
}
export {
  App as default
};
