/* Convertido automáticamente desde Apuntes/findIndex  , findLast  findLastIndex indexOf   lastIndexOf/findLastIndexCarta.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { Coins, Eye, Play, CheckCircle2, ArrowRight, RotateCcw, Trophy, Timer, Sparkles, BookOpen } from "lucide-react";
const VALUES = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
function mk(num, suit) {
  return { label: VALUES[num - 1], num, suit, color: suit === "\u2665" || suit === "\u2666" ? "roja" : "negra" };
}
function mulberry(seed) {
  return function() {
    seed |= 0;
    seed = seed + 1831565813 | 0;
    let t = Math.imul(seed ^ seed >>> 15, 1 | seed);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function matches(c, key) {
  switch (key) {
    case "roja":
      return c.color === "roja";
    case "espadas":
      return c.suit === "\u2660";
    case "mayor4":
      return c.num > 4;
    case "corazones":
      return c.suit === "\u2665";
    case "negra":
      return c.color === "negra";
    case "diamantes":
      return c.suit === "\u2666";
    case "menor5":
      return c.num < 5;
    case "igual7":
      return c.num === 7;
    case "corazones-espadas":
      return c.suit === "\u2665" || c.suit === "\u2660";
    case "par":
      return c.num % 2 === 0;
    case "impar":
      return c.num % 2 === 1;
    case "mayorIgual8":
      return c.num >= 8;
    case "treboles":
      return c.suit === "\u2663";
    case "menorIgual3":
      return c.num <= 3;
    case "rojaMayor5":
      return c.color === "roja" && c.num > 5;
    case "negraPar":
      return c.color === "negra" && c.num % 2 === 0;
    case "espadas-treboles":
      return c.suit === "\u2660" || c.suit === "\u2663";
    case "mayor6":
      return c.num > 6;
    case "rojaMayor8":
      return c.color === "roja" && c.num > 8;
    default:
      return false;
  }
}
function procedural(id, titulo, regla, key, code, condHint) {
  const rnd = mulberry(id * 977 + 41);
  const suits = ["\u2660", "\u2665", "\u2666", "\u2663"];
  const deck = Array.from({ length: 7 }, () => mk(1 + Math.floor(rnd() * 13), suits[Math.floor(rnd() * 4)]));
  if (!deck.some((c) => matches(c, key))) {
    deck[4] = key === "treboles" ? mk(7, "\u2663") : key === "diamantes" ? mk(8, "\u2666") : key === "corazones-espadas" ? mk(9, "\u2665") : key === "negraPar" ? mk(8, "\u2660") : key === "rojaMayor5" ? mk(9, "\u2665") : key === "espadas-treboles" ? mk(6, "\u2663") : mk(7, "\u2660");
  }
  return { id, titulo, regla, key, code, condHint, deck };
}
const HANDS = [
  { id: 1, titulo: "\xDAltima carta roja", regla: "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta roja (\u2665 o \u2666)?", key: "roja", code: "cartas.findLastIndex(c => c.color === 'roja')", condHint: "roja", deck: [mk(2, "\u2660"), mk(3, "\u2665"), mk(5, "\u2660"), mk(2, "\u2666"), mk(8, "\u2660"), mk(7, "\u2665"), mk(4, "\u2660")] },
  { id: 2, titulo: "\xDAltima de espadas \u2660", regla: "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta de espadas \u2660?", key: "espadas", code: "cartas.findLastIndex(c => c.palo === '\u2660')", condHint: "\u2660", deck: [mk(2, "\u2665"), mk(5, "\u2666"), mk(3, "\u2660"), mk(9, "\u2665"), mk(6, "\u2660"), mk(4, "\u2666"), mk(7, "\u2665")] },
  { id: 3, titulo: "\xDAltima con valor > 4", regla: "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta con valor > 4?", key: "mayor4", code: "cartas.findLastIndex(c => c.valor > 4)", condHint: "> 4", deck: [mk(2, "\u2663"), mk(3, "\u2665"), mk(5, "\u2660"), mk(2, "\u2666"), mk(7, "\u2665"), mk(4, "\u2660"), mk(9, "\u2666")] },
  { id: 4, titulo: "\xDAltima de corazones \u2665", regla: "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta de corazones \u2665? Ojo: \u2666 es roja, pero no es \u2665.", key: "corazones", code: "cartas.findLastIndex(c => c.palo === '\u2665')", condHint: "\u2665", deck: [mk(2, "\u2660"), mk(4, "\u2665"), mk(3, "\u2663"), mk(8, "\u2665"), mk(6, "\u2660"), mk(9, "\u2666"), mk(5, "\u2663")] },
  procedural(5, "\xDAltima carta negra", "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta negra (\u2660 o \u2663)?", "negra", "cartas.findLastIndex(c => c.color === 'negra')", "negra"),
  procedural(6, "\xDAltima de diamantes \u2666", "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta de diamantes \u2666?", "diamantes", "cartas.findLastIndex(c => c.palo === '\u2666')", "\u2666"),
  procedural(7, "\xDAltima con valor < 5", "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta con valor < 5?", "menor5", "cartas.findLastIndex(c => c.valor < 5)", "< 5"),
  procedural(8, "\xDAltima con valor === 7", "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta con valor exactamente 7?", "igual7", "cartas.findLastIndex(c => c.valor === 7)", "=== 7"),
  procedural(9, "\xDAltima \u2665 o \u2660", "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta de corazones \u2665 o espadas \u2660?", "corazones-espadas", "cartas.findLastIndex(c => c.palo === '\u2665' || c.palo === '\u2660')", "\u2665"),
  procedural(10, "\xDAltima con valor par", "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta con valor PAR?", "par", "cartas.findLastIndex(c => c.valor % 2 === 0)", "par"),
  procedural(11, "\xDAltima con valor impar", "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta con valor IMPAR?", "impar", "cartas.findLastIndex(c => c.valor % 2 === 1)", "impar"),
  procedural(12, "\xDAltima con valor \u2265 8", "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta con valor mayor o igual a 8?", "mayorIgual8", "cartas.findLastIndex(c => c.valor >= 8)", ">= 8"),
  procedural(13, "\xDAltima de tr\xE9boles \u2663", "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta de tr\xE9boles \u2663?", "treboles", "cartas.findLastIndex(c => c.palo === '\u2663')", "\u2663"),
  procedural(14, "\xDAltima con valor \u2264 3", "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta con valor menor o igual a 3?", "menorIgual3", "cartas.findLastIndex(c => c.valor <= 3)", "<= 3"),
  procedural(15, "\xDAltima roja con valor > 5", "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta ROJA con valor > 5?", "rojaMayor5", "cartas.findLastIndex(c => c.color === 'roja' && c.valor > 5)", "roja"),
  procedural(16, "\xDAltima negra con valor par", "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta NEGRA con valor PAR?", "negraPar", "cartas.findLastIndex(c => c.color === 'negra' && c.valor % 2 === 0)", "negra"),
  procedural(17, "\xDAltima \u2660 o \u2663", "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta de espadas \u2660 o tr\xE9boles \u2663?", "espadas-treboles", "cartas.findLastIndex(c => c.palo === '\u2660' || c.palo === '\u2663')", "\u2660"),
  procedural(18, "\xDAltima con valor > 6", "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta con valor > 6?", "mayor6", "cartas.findLastIndex(c => c.valor > 6)", "> 6"),
  { id: 19, titulo: "JEFE FINAL \xB7 \xDAltima roja > 8", regla: "JEFE FINAL \u2014 \xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta ROJA con valor > 8? Tienes 60 segundos.", key: "rojaMayor8", code: "cartas.findLastIndex(c => c.color === 'roja' && c.valor > 8)", condHint: "roja", deck: [mk(2, "\u2660"), mk(3, "\u2665"), mk(5, "\u2663"), mk(7, "\u2666"), mk(9, "\u2660"), mk(6, "\u2665"), mk(13, "\u2663"), mk(2, "\u2666"), mk(12, "\u2660"), mk(8, "\u2665"), mk(4, "\u2663"), mk(10, "\u2666"), mk(3, "\u2660"), mk(11, "\u2665"), mk(8, "\u2663"), mk(10, "\u2660"), mk(12, "\u2665"), mk(13, "\u2660"), mk(2, "\u2663")] }
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
async function api(action, args) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const j = await res.json().catch(() => ({}));
  if (!res.ok || j.error) throw new Error(j.error || "No se pudo guardar el progreso");
  return j.data;
}
function App() {
  const [handId, setHandId] = useState(1);
  const [mode, setMode] = useState("normal");
  const [phase, setPhase] = useState(0);
  const [infiniteSeed, setInfiniteSeed] = useState(1);
  const [selected, setSelected] = useState(null);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState([]);
  const [logs, setLogs] = useState(["> Casino listo. Eres el crupier.", "> findLastIndex devuelve un N\xDAMERO, no la carta.", "> Lee la regla y responde desde la DERECHA."]);
  const [feedback, setFeedback] = useState("Elige un \xEDndice y ll\xE9valo al cuadro. Puedes usar el barrido para ver la l\xF3gica.");
  const [feedbackKind, setFeedbackKind] = useState("info");
  const [revealed, setRevealed] = useState(false);
  const [sweepIdx, setSweepIdx] = useState(null);
  const [sweeping, setSweeping] = useState(false);
  const [usedSweep, setUsedSweep] = useState(false);
  const [condition, setCondition] = useState("");
  const [history, setHistory] = useState([]);
  const [countdown, setCountdown] = useState(3);
  const [hidden, setHidden] = useState(false);
  const [peekIdx, setPeekIdx] = useState(null);
  const [bossTime, setBossTime] = useState(60);
  const [showReset, setShowReset] = useState(false);
  const [saveState, setSaveState] = useState("Progreso guardado en esta sesi\xF3n");
  const [recordId, setRecordId] = useState(null);
  const loadedRef = useRef(false);
  const savingRef = useRef(false);
  const hand = HANDS.find((h) => h.id === handId) || HANDS[0];
  const infiniteDeck = useMemo(() => {
    const rnd = mulberry(infiniteSeed * 131 + 7);
    const suits = ["\u2660", "\u2665", "\u2666", "\u2663"];
    const keys = ["diamantes", "mayor6", "negra", "roja"];
    const key = keys[infiniteSeed % keys.length];
    const deck = Array.from({ length: 20 }, () => mk(1 + Math.floor(rnd() * 13), suits[Math.floor(rnd() * 4)]));
    if (!deck.some((c) => matches(c, key))) deck[17] = mk(9, "\u2666");
    const codes = { "diamantes": "cartas.findLastIndex(c => c.palo === '\u2666')", "mayor6": "cartas.findLastIndex(c => c.valor > 6)", "negra": "cartas.findLastIndex(c => c.color === 'negra')", "roja": "cartas.findLastIndex(c => c.color === 'roja')" };
    const reglas = { "diamantes": "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta de diamantes \u2666 entre 20?", "mayor6": "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta con valor > 6 entre 20?", "negra": "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta NEGRA entre 20?", "roja": "\xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta ROJA entre 20?" };
    return { deck, key, code: codes[key], regla: reglas[key] };
  }, [infiniteSeed]);
  const active = useMemo(() => {
    if (mode === "minus1") return { deck: [mk(2, "\u2665"), mk(5, "\u2660"), mk(3, "\u2666"), mk(9, "\u2665"), mk(4, "\u2660"), mk(7, "\u2666"), mk(6, "\u2665")], key: "treboles", code: "cartas.findLastIndex(c => c.palo === '\u2663')", regla: "MODO -1 \u2014 \xBFEn qu\xE9 \xCDNDICE est\xE1 la \xDALTIMA carta de tr\xE9boles \u2663? Mira bien: puede que no haya ninguna.", titulo: "Modo -1 \xB7 La imposible" };
    if (mode === "firstLast") return { deck: HANDS[0].deck, key: "roja", code: phase === 0 ? "cartas.findIndex(c => c.color === 'roja')" : HANDS[0].code, regla: phase === 0 ? "PRIMERA vs \xDALTIMA \xB7 \xBF\xCDNDICE de la PRIMERA carta roja?" : "PRIMERA vs \xDALTIMA \xB7 \xBF\xCDNDICE de la \xDALTIMA carta roja?", titulo: "Primera vs \xDAltima" };
    if (mode === "memory") return { deck: HANDS[0].deck, key: "roja", code: HANDS[0].code, regla: "MODO MEMORIA \u2014 Memoriza la mesa. Se voltear\xE1 en 3, 2, 1\u2026 Recuerda el \xEDndice de la \xFAltima roja.", titulo: "Modo Memoria" };
    if (mode === "infinite") return { deck: infiniteDeck.deck, key: infiniteDeck.key, code: infiniteDeck.code, regla: infiniteDeck.regla, titulo: "Baraja Infinita \xB7 20 cartas" };
    return { deck: hand.deck, key: hand.key, code: hand.code, regla: hand.regla, titulo: `Mano ${hand.id} \xB7 ${hand.titulo}` };
  }, [mode, phase, hand, infiniteDeck]);
  const expected = useMemo(() => {
    let r = -1;
    active.deck.forEach((c, i) => {
      if (matches(c, active.key)) r = i;
    });
    return r;
  }, [active]);
  const firstIdx = useMemo(() => active.deck.findIndex((c) => matches(c, active.key)), [active]);
  const displayExpected = mode === "firstLast" && phase === 0 ? firstIdx : expected;
  const isBoss = mode === "normal" && handId === 19;
  useEffect(() => {
    (async () => {
      try {
        const data = await api("records.list", { collection: "carta-roja-progreso" });
        const rec = data?.records?.[0];
        if (rec) {
          setRecordId(rec.id);
          const v = rec.value || {};
          if (typeof v.points === "number") setPoints(v.points);
          if (typeof v.streak === "number") setStreak(v.streak);
          if (Array.isArray(v.solved)) setSolved(v.solved);
          if (typeof v.handId === "number") setHandId(v.handId);
          setSaveState("Progreso recuperado");
        }
      } catch {
        setSaveState("Sin conexi\xF3n al guardado: tu partida sigue en esta sesi\xF3n");
      }
      loadedRef.current = true;
    })();
  }, []);
  useEffect(() => {
    if (!loadedRef.current) return;
    const t = setTimeout(async () => {
      if (savingRef.current) return;
      savingRef.current = true;
      try {
        const value = { points, streak, solved, handId, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
        if (recordId) {
          await api("records.replace", { collection: "carta-roja-progreso", id: recordId, value });
        } else {
          const created = await api("records.create", { collection: "carta-roja-progreso", value });
          if (created?.id) setRecordId(created.id);
        }
        setSaveState("Progreso guardado");
      } catch {
        setSaveState("No se pudo guardar ahora");
      }
      savingRef.current = false;
    }, 600);
    return () => clearTimeout(t);
  }, [points, streak, solved, handId, recordId]);
  useEffect(() => {
    if (mode !== "memory") return;
    setHidden(false);
    setCountdown(3);
    setRevealed(false);
    setSelected(null);
    const iv = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(iv);
          setHidden(true);
          setFeedback("Cartas boca abajo \u{1F0A0}. Recuerda el \xEDndice. Si necesitas mirar, cada vistazo cuesta -2.");
          return 0;
        }
        return c - 1;
      });
    }, 1e3);
    return () => clearInterval(iv);
  }, [mode]);
  useEffect(() => {
    if (!isBoss || revealed) return;
    setBossTime(60);
    const iv = setInterval(() => setBossTime((t) => Math.max(0, t - 1)), 1e3);
    return () => clearInterval(iv);
  }, [isBoss, handId, revealed]);
  useEffect(() => {
    if (isBoss && bossTime === 0 && !revealed) {
      setFeedback("\u23F1 Tiempo agotado en el Jefe Final. Respira, lee desde la derecha y vuelve a intentarlo.");
      setFeedbackKind("bad");
    }
  }, [bossTime, isBoss, revealed]);
  function resetRound() {
    setSelected(null);
    setRevealed(false);
    setSweepIdx(null);
    setUsedSweep(false);
    setCondition("");
    setFeedback("Nueva mesa. Lee la regla y responde desde la derecha.");
    setFeedbackKind("info");
    setPeekIdx(null);
    if (mode === "memory") {
      setHidden(false);
      setCountdown(3);
    }
  }
  function chooseMode(m) {
    setMode(m);
    setPhase(0);
    setHandId(m === "normal" ? handId : handId);
    setInfiniteSeed((s) => s + 1);
    setTimeout(resetRound, 0);
    setLogs([`> Modo: ${m}.`, `> ${m === "minus1" ? "Busca una carta que quiz\xE1 no existe." : m === "firstLast" ? "Primero findIndex, luego findLastIndex. Siente la direcci\xF3n." : m === "memory" ? "Memoriza antes de que se volteen." : m === "infinite" ? "20 cartas. La regla cambia en cada reparto." : "Mesa normal."}`]);
  }
  function chooseHand(id) {
    setMode("normal");
    setHandId(id);
    setPhase(0);
    setTimeout(resetRound, 0);
    setLogs([`> Mano ${id} repartida.`, `> ${HANDS.find((h) => h.id === id)?.regla}`]);
  }
  async function runSweep() {
    if (sweeping) return;
    setSweeping(true);
    setUsedSweep(true);
    setRevealed(false);
    const useFirst = mode === "firstLast" && phase === 0;
    const newLogs = [];
    newLogs.push(`> Ejecutando ${active.code}`);
    newLogs.push(useFirst ? "[Recorrido desde el inicio] findIndex avanza 0 \u2192 final" : "[Iteraci\xF3n desde el final] findLastIndex retrocede desde el final");
    setLogs((prev) => [...prev, ...newLogs]);
    if (useFirst) {
      for (let i = 0; i < active.deck.length; i++) {
        setSweepIdx(i);
        await sleep(380);
        const ok = matches(active.deck[i], active.key);
        setLogs((p) => [...p, `[${i}] ${active.deck[i].suit} ${active.deck[i].color} \u2014 ${ok ? "true \u2192 \u2705 \xA1ENCONTRADO! Se detiene aqu\xED." : "false \u2192 sigue"}`]);
        if (ok) break;
      }
    } else {
      for (let i = active.deck.length - 1; i >= 0; i--) {
        setSweepIdx(i);
        await sleep(380);
        const ok = matches(active.deck[i], active.key);
        setLogs((p) => [...p, `[${i}] ${active.deck[i].suit} ${active.deck[i].color} \u2014 ${ok ? "true \u2192 \u2705 \xA1ENCONTRADO! Se detiene aqu\xED." : "false \u2192 sigue"}`]);
        if (ok) break;
        if (i === 0) setLogs((p) => [...p, "Revis\xF3 todas de atr\xE1s hacia adelante, ninguna cumpli\xF3, por eso devuelve -1."]);
      }
    }
    setLogs((p) => [...p, useFirst ? "\u{1F9E0} Depurador: findIndex recorre de ADELANTE hacia ATR\xC1S." : "\u{1F9E0} Depurador: findLastIndex recorre de ATR\xC1S hacia ADELANTE. No revis\xF3 las anteriores porque ya encontr\xF3 el \xFAltimo.", `> Resultado: ${displayExpected} \u2190 Es un N\xDAMERO, no la carta.`]);
    setSweeping(false);
  }
  function confirm() {
    if (selected === null) {
      setFeedback("Primero lleva un n\xFAmero al cuadro de respuesta. Haz clic en un n\xFAmero o arr\xE1stralo.");
      setFeedbackKind("bad");
      return;
    }
    const correct = selected === displayExpected;
    const isMatchButNotLast = !correct && selected >= 0 && selected < active.deck.length && matches(active.deck[selected], active.key);
    const isImpossible = displayExpected === -1;
    let delta = 0;
    let msg = "";
    let kind = "bad";
    const isBossRound = isBoss;
    if (correct) {
      delta = isBossRound ? 20 : 10;
      if (usedSweep) delta += 5;
      const condOk = condition.trim() !== "" && (condition.includes(hand.condHint) || condition.toLowerCase().includes("roja") && active.key.includes("roja") || condition.includes(">") || condition.includes("===") || condition.includes("palo") || condition.includes("color") || condition.includes("valor"));
      if (condOk) delta += 5;
      msg = `\u2705 \xA1Correcto! ${active.code} // \u2192 ${displayExpected}. ${isBossRound ? "Jefe Final superado: +20." : "+10 por acierto directo."}${usedSweep ? " +5 por usar el barrido y acertar." : ""}${condOk ? " +5 por escribir la condici\xF3n." : ""} ${isImpossible ? "Revis\xF3 todas, ninguna cumpli\xF3: por eso -1." : ""}`;
      kind = "ok";
      setStreak((s) => s + 1);
      if (mode === "normal" && !solved.includes(handId)) setSolved((s) => [...s, handId]);
      if (mode === "firstLast" && phase === 0) {
        setTimeout(() => {
          setPhase(1);
          resetRound();
          setFeedback("Ahora la misma mesa, pero desde el FINAL. \xBF\xCDndice de la \xDALTIMA roja?");
          setFeedbackKind("info");
        }, 900);
      }
      if (isBossRound) msg += " \u{1F3C6} Badge: CRUPIER NIVEL 19";
    } else if (isMatchButNotLast) {
      delta = -5;
      setStreak(0);
      msg = `\u274C Esa carta tambi\xE9n cumple, pero findLastIndex busca desde el FINAL. El \xEDndice correcto es ${displayExpected}. -5 por el error t\xEDpico de inercia izquierda \u2192 derecha.`;
    } else {
      delta = -3;
      setStreak(0);
      msg = `\u274C Esa carta no cumple la regla. El \xEDndice correcto es ${displayExpected}. -3. Vuelve a leer la regla y barre desde la derecha.`;
    }
    setPoints((p) => Math.max(0, p + delta));
    setRevealed(true);
    setLogs((p) => [...p, `> Confirmado: ${selected} \xB7 ${correct ? "\u2705" : "\u274C"} \xB7 Puntos ${delta >= 0 ? "+" : ""}${delta}`, `> ${active.code} // \u2192 ${displayExpected}`, `\u2696\uFE0F Comparaci\xF3n: findLast \u2192 OBJETO carta | findLastIndex \u2192 N\xDAMERO ${displayExpected} | findIndex \u2192 N\xDAMERO ${firstIdx}`]);
    setHistory((h) => [{ texto: `${active.titulo} \xB7 elegiste ${selected} \xB7 correcto ${displayExpected}`, pts: delta }, ...h].slice(0, 8));
    setFeedback(msg);
    setFeedbackKind(kind);
  }
  function nextHand() {
    if (mode === "infinite") {
      setInfiniteSeed((s) => s + 1);
      resetRound();
      setLogs((p) => [...p, "> Nueva baraja infinita repartida."]);
      return;
    }
    if (mode !== "normal") {
      chooseMode("normal");
      return;
    }
    const next = handId >= 19 ? 1 : handId + 1;
    chooseHand(next);
  }
  function peek() {
    if (mode !== "memory" || !hidden) return;
    setPoints((p) => Math.max(0, p - 2));
    const idx = Math.floor(Math.random() * active.deck.length);
    setPeekIdx(idx);
    setFeedback("\u{1F441} Vistazo de 1 segundo: -2 puntos. Esa carta vuelve a voltearse.");
    setFeedbackKind("info");
    setTimeout(() => setPeekIdx(null), 1e3);
  }
  function doReset() {
    setPoints(0);
    setStreak(0);
    setSolved([]);
    setHistory([]);
    setHandId(1);
    setMode("normal");
    setShowReset(false);
    resetRound();
    setSaveState("Partida reiniciada");
  }
  const showMinus1 = mode === "minus1";
  const indices = active.deck.map((_, i) => i);
  return /* @__PURE__ */ jsxs("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "radial-gradient(900px 400px at 50% -80px, rgba(245,197,66,.18), transparent), var(--bg)" }, className: "overflow-x-clip", children: [
    /* @__PURE__ */ jsxs("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)" }, className: "sticky z-30 border-b border-[var(--line)] bg-[#050816]/90 backdrop-blur", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-[1500px] px-3 sm:px-5 py-3 flex flex-wrap items-center gap-3 justify-between", children: [
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-[clamp(1.25rem,3vw,2rem)] leading-none font-bold tracking-wide", children: [
            "\u{1F0CF} CASINO ",
            /* @__PURE__ */ jsx("span", { className: "gold-text", children: "\u201CLA \xDALTIMA MESA\u201D" }),
            " ",
            /* @__PURE__ */ jsx("span", { className: "text-[var(--neon)]", children: "\xB7 CRUPIER" })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "text-xs sm:text-sm text-[var(--muted)]", children: [
            "findLastIndex \u2192 devuelve un ",
            /* @__PURE__ */ jsx("b", { className: "text-white", children: "N\xDAMERO" }),
            ", no la carta \xB7 Lee desde la derecha"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2", children: [
          /* @__PURE__ */ jsxs("span", { className: "px-3 py-2 rounded-full bg-[#131c33] border border-[var(--line)] text-sm font-bold", children: [
            "\u{1FA99} PUNTOS: ",
            /* @__PURE__ */ jsx("b", { className: "text-[var(--gold)]", children: points })
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "px-3 py-2 rounded-full bg-[#131c33] border border-[var(--line)] text-sm font-bold", children: [
            "\u{1F525} RACHA: ",
            streak
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => setShowReset(true), className: "px-3 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold flex items-center gap-1", children: [
            /* @__PURE__ */ jsx(RotateCcw, { size: 15 }),
            " Reiniciar"
          ] })
        ] })
      ] }),
      showReset && /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-[1500px] px-4 pb-3", children: /* @__PURE__ */ jsxs("div", { className: "p-3 rounded-xl bg-[#2a1218] border border-red-400/40 flex flex-wrap gap-2 items-center text-sm", children: [
        "\xBFReiniciar puntos, racha y manos resueltas? ",
        /* @__PURE__ */ jsx("button", { onClick: doReset, className: "px-3 py-1 rounded bg-red-500 font-bold", children: "S\xED, reiniciar" }),
        /* @__PURE__ */ jsx("button", { onClick: () => setShowReset(false), className: "px-3 py-1 rounded bg-white/15", children: "Cancelar" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "mx-auto max-w-[1500px] px-3 sm:px-5 py-4 grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_420px] items-start", children: [
      /* @__PURE__ */ jsxs("aside", { className: "panel p-4 order-2 lg:order-1", children: [
        /* @__PURE__ */ jsxs("h2", { className: "font-bold text-lg tracking-wide flex items-center gap-2", children: [
          "\u{1F3B4} MANOS ",
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-[var(--muted)]", children: [
            solved.length,
            "/19 resueltas"
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 grid grid-cols-5 lg:grid-cols-1 gap-2 max-h-[320px] lg:max-h-[520px] overflow-y-auto pr-1", children: HANDS.map((h) => /* @__PURE__ */ jsx("button", { onClick: () => chooseHand(h.id), className: `text-left px-3 py-2 rounded-xl border text-sm font-semibold ${mode === "normal" && handId === h.id ? "bg-[var(--gold)] text-black border-[var(--gold)]" : "bg-white/5 border-white/10 hover:bg-white/10"}`, children: /* @__PURE__ */ jsxs("span", { className: "flex justify-between gap-1", children: [
          /* @__PURE__ */ jsxs("span", { className: "break-words", children: [
            h.id,
            ". ",
            h.id === 19 ? "JEFE FINAL" : h.titulo
          ] }),
          /* @__PURE__ */ jsx("span", { children: solved.includes(h.id) ? "\u2705" : "" })
        ] }) }, h.id)) }),
        /* @__PURE__ */ jsx("h3", { className: "mt-5 font-bold text-[var(--gold)]", children: "\u2728 MODOS ESPECIALES" }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 grid gap-2", children: [
          /* @__PURE__ */ jsxs("button", { onClick: () => chooseMode("minus1"), className: `p-3 rounded-xl border text-left ${mode === "minus1" ? "bg-red-500/20 border-red-400" : "bg-white/5 border-white/10"}`, children: [
            /* @__PURE__ */ jsx("b", { children: "\u22121 \xB7 La imposible" }),
            /* @__PURE__ */ jsx("span", { className: "block text-xs text-[var(--muted)]", children: "Regla sin match: la respuesta es -1." })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => chooseMode("firstLast"), className: `p-3 rounded-xl border text-left ${mode === "firstLast" ? "bg-cyan-500/20 border-cyan-400" : "bg-white/5 border-white/10"}`, children: [
            /* @__PURE__ */ jsx("b", { children: "\u2194 Primera vs \xDAltima" }),
            /* @__PURE__ */ jsx("span", { className: "block text-xs text-[var(--muted)]", children: "Misma mesa: findIndex y luego findLastIndex." })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => chooseMode("memory"), className: `p-3 rounded-xl border text-left ${mode === "memory" ? "bg-violet-500/20 border-violet-400" : "bg-white/5 border-white/10"}`, children: [
            /* @__PURE__ */ jsx("b", { children: "\u{1F9E0} Memoria" }),
            /* @__PURE__ */ jsx("span", { className: "block text-xs text-[var(--muted)]", children: "Se voltean en 3, 2, 1\u2026 Cada vistazo -2." })
          ] }),
          /* @__PURE__ */ jsxs("button", { onClick: () => chooseMode("infinite"), className: `p-3 rounded-xl border text-left ${mode === "infinite" ? "bg-emerald-500/20 border-emerald-400" : "bg-white/5 border-white/10"}`, children: [
            /* @__PURE__ */ jsx("b", { children: "\u267E Baraja Infinita" }),
            /* @__PURE__ */ jsx("span", { className: "block text-xs text-[var(--muted)]", children: "20 cartas, regla al azar." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
          /* @__PURE__ */ jsxs("h3", { className: "font-bold flex gap-2 items-center", children: [
            /* @__PURE__ */ jsx(BookOpen, { size: 16 }),
            " Bit\xE1cora del crupier"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[var(--muted)]", children: saveState }),
          /* @__PURE__ */ jsx("ul", { className: "mt-2 space-y-2 text-sm", children: history.length === 0 ? /* @__PURE__ */ jsx("li", { className: "text-[var(--muted)]", children: "A\xFAn no hay jugadas. Tu historial aparecer\xE1 aqu\xED." }) : history.map((h, i) => /* @__PURE__ */ jsxs("li", { className: "p-2 rounded-lg bg-black/30 border border-white/10 flex justify-between gap-2", children: [
            /* @__PURE__ */ jsx("span", { className: "break-words", children: h.texto }),
            /* @__PURE__ */ jsxs("b", { className: h.pts >= 0 ? "text-emerald-300" : "text-red-300", children: [
              h.pts >= 0 ? "+" : "",
              h.pts
            ] })
          ] }, i)) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "order-1 lg:order-2 min-w-0", children: [
        /* @__PURE__ */ jsxs("div", { className: "rounded-[22px] p-3 sm:p-4 border-2 border-[#c99a2e] shadow-[0_0_40px_rgba(245,197,66,.18)]", style: { background: "radial-gradient(circle at 50% 20%, #1d6a43, #0b3d24 55%, #062416)" }, children: [
          /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center justify-between gap-2 px-1", children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("h2", { className: "font-bold text-xl sm:text-2xl tracking-wide", children: "\u{1F3B4} MESA DEL CRUPIER" }),
              /* @__PURE__ */ jsxs("p", { className: "text-emerald-100/80 text-sm", children: [
                active.titulo,
                " \xB7 ",
                active.deck.length,
                " cartas"
              ] })
            ] }),
            isBoss && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-black/50 px-3 py-2 rounded-full font-bold", children: [
              /* @__PURE__ */ jsx(Timer, { size: 16, className: "text-[var(--gold)]" }),
              " ",
              bossTime,
              "s ",
              /* @__PURE__ */ jsx("span", { className: "w-20 h-2 bg-white/20 rounded overflow-hidden", children: /* @__PURE__ */ jsx("span", { className: "block h-full bg-[var(--gold)]", style: { width: `${bossTime / 60 * 100}%` } }) })
            ] }),
            mode === "memory" && !hidden && /* @__PURE__ */ jsx("div", { className: "text-2xl font-bold bg-black/60 px-4 py-2 rounded-full blink", children: countdown > 0 ? `${countdown} \xB7 \xA1MEMORIZA!` : "\xA1Ya!" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 bg-[#fff8e6] text-black rounded-2xl p-3 sm:p-4 font-bold text-center text-[clamp(1rem,2.5vw,1.35rem)] leading-snug", children: [
            "\u{1F3AF} ",
            active.regla
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-4 flex flex-wrap justify-center gap-2 sm:gap-3", children: active.deck.map((c, i) => {
            const faceDown = mode === "memory" && hidden && peekIdx !== i;
            const isSweep = sweepIdx === i;
            const isCorrect = revealed && i === displayExpected;
            const isWrongPick = revealed && selected === i && selected !== displayExpected;
            return /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsx("div", { className: `card w-[52px] sm:w-[68px] h-[74px] sm:h-[96px] rounded-xl flex flex-col items-center justify-center border-2 ${faceDown ? "bg-[#123a8a] border-white text-white text-3xl" : "bg-white border-gray-300"} ${isSweep ? "sweep" : ""} ${isCorrect ? "gold-glow" : ""} ${isWrongPick ? "shake border-red-500" : ""}`, children: faceDown ? /* @__PURE__ */ jsx("span", { children: "\u{1F0A0}" }) : /* @__PURE__ */ jsxs(Fragment, { children: [
                /* @__PURE__ */ jsx("span", { className: `text-[clamp(1.6rem,5vw,2.4rem)] leading-none ${c.color === "roja" ? "text-red-600" : "text-slate-900"}`, children: c.suit }),
                /* @__PURE__ */ jsx("span", { className: `font-bold text-lg ${c.color === "roja" ? "text-red-600" : "text-slate-900"}`, children: c.label }),
                /* @__PURE__ */ jsx("span", { className: "text-[10px] uppercase tracking-wider text-gray-500", children: c.color })
              ] }) }),
              /* @__PURE__ */ jsxs("div", { className: `mt-1 inline-block px-2 py-0.5 rounded text-xs font-bold ${isSweep ? "bg-[var(--neon)] text-black" : isCorrect ? "bg-[var(--gold)] text-black" : "bg-black/60 text-white"}`, children: [
                "[",
                i,
                "]"
              ] })
            ] }, i);
          }) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 bg-black/45 border border-yellow-200/30 rounded-2xl p-3 sm:p-4", children: [
            /* @__PURE__ */ jsx("p", { className: "text-center font-bold text-yellow-100", children: "\u{1F3AF} CUADRO DE RESPUESTA \u2014 Arrastra o haz clic en un n\xFAmero para llevarlo al cuadro" }),
            /* @__PURE__ */ jsxs("div", { onDragOver: (e) => e.preventDefault(), onDrop: (e) => {
              e.preventDefault();
              const v = Number(e.dataTransfer.getData("text/plain"));
              if (!Number.isNaN(v)) setSelected(v);
            }, className: "mx-auto mt-3 max-w-[420px] min-h-[86px] rounded-xl border-2 border-dashed border-[var(--gold)] bg-[#0a0f1e] flex items-center justify-center gap-3 px-3", children: [
              /* @__PURE__ */ jsx("span", { className: "text-2xl", children: "\u{1F3AF}" }),
              /* @__PURE__ */ jsx("span", { className: "text-sm text-[var(--muted)]", children: "CUADRO:" }),
              /* @__PURE__ */ jsx("span", { className: `pop inline-flex items-center justify-center min-w-[62px] h-[62px] rounded-full border-4 font-bold text-3xl ${selected === null ? "border-white/30 text-white/50" : "border-[var(--gold)] bg-[var(--gold)] text-black shadow-[0_0_22px_rgba(245,197,66,.8)]"}`, children: selected === null ? "?" : selected }),
              selected !== null && /* @__PURE__ */ jsx("button", { onClick: () => setSelected(null), className: "text-xs underline text-white/70", children: "Quitar" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap justify-center gap-2", children: [
              indices.map((i) => /* @__PURE__ */ jsx("button", { draggable: true, onDragStart: (e) => {
                e.dataTransfer.setData("text/plain", String(i));
              }, onClick: () => setSelected(i), className: `w-11 h-11 rounded-full font-bold border-2 cursor-grab active:cursor-grabbing ${selected === i ? "bg-[var(--gold)] text-black border-[var(--gold)] scale-110" : "bg-white text-black border-gray-300 hover:bg-yellow-100"}`, children: i }, i)),
              showMinus1 && /* @__PURE__ */ jsx("button", { onClick: () => setSelected(-1), className: `w-14 h-11 rounded-full font-bold border-2 ${selected === -1 ? "bg-red-500 text-white border-red-400" : "bg-red-600 text-white border-red-300"}`, children: "-1" })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-center text-xs text-white/60 mt-2", children: "Toca un n\xFAmero para moverlo al cuadro. Para cambiar, toca otro n\xFAmero." }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4 flex flex-wrap justify-center gap-2", children: [
              /* @__PURE__ */ jsxs("button", { onClick: runSweep, disabled: sweeping, className: "px-4 py-2.5 rounded-full bg-[var(--neon)] text-black font-bold flex items-center gap-1 disabled:opacity-50", children: [
                /* @__PURE__ */ jsx(Play, { size: 16 }),
                " \u25B6 BARRIDO INVERSO"
              ] }),
              /* @__PURE__ */ jsxs("button", { onClick: confirm, className: "px-4 py-2.5 rounded-full bg-[var(--gold)] text-black font-bold flex items-center gap-1", children: [
                /* @__PURE__ */ jsx(CheckCircle2, { size: 16 }),
                " \u2705 CONFIRMAR \xCDNDICE"
              ] }),
              /* @__PURE__ */ jsxs("button", { onClick: nextHand, className: "px-4 py-2.5 rounded-full bg-white text-black font-bold flex items-center gap-1", children: [
                "\u27A1\uFE0F SIGUIENTE MANO ",
                /* @__PURE__ */ jsx(ArrowRight, { size: 16 })
              ] }),
              mode === "memory" && /* @__PURE__ */ jsxs("button", { onClick: peek, disabled: !hidden, className: "px-4 py-2.5 rounded-full bg-violet-400 text-black font-bold flex items-center gap-1 disabled:opacity-50", children: [
                /* @__PURE__ */ jsx(Eye, { size: 16 }),
                " \u{1F441} VOLTEAR PARA MIRAR (-2)"
              ] })
            ] }),
            /* @__PURE__ */ jsxs("label", { className: "block mt-4 text-sm font-bold text-yellow-100", children: [
              "\u270D\uFE0F Escribe la condici\xF3n para +5 ",
              /* @__PURE__ */ jsx("span", { className: "font-normal text-white/60", children: "(opcional)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-1 flex flex-col sm:flex-row gap-2", children: [
              /* @__PURE__ */ jsx("input", { value: condition, onChange: (e) => setCondition(e.target.value), placeholder: "ej: c => c.color === 'roja'", className: "flex-1 min-w-0 px-3 py-2.5 rounded-xl bg-white text-black font-code text-sm" }),
              /* @__PURE__ */ jsxs("span", { className: "px-3 py-2.5 rounded-xl bg-white/10 text-xs self-center", children: [
                "Pista: incluye ",
                hand.condHint
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: `mt-4 p-3 rounded-xl font-semibold ${feedbackKind === "ok" ? "bg-emerald-500/20 border border-emerald-300 text-emerald-100" : feedbackKind === "bad" ? "bg-red-500/20 border border-red-300 text-red-100" : "bg-white/10 border border-white/15"}`, children: feedback }),
            revealed && /* @__PURE__ */ jsxs("div", { className: "mt-3 p-3 rounded-xl bg-black/70 font-code text-sm break-words", children: [
              /* @__PURE__ */ jsx("span", { className: "text-[var(--neon)]", children: active.code }),
              " ",
              /* @__PURE__ */ jsxs("span", { className: "text-white", children: [
                "// \u2192 ",
                displayExpected
              ] }),
              isBoss && displayExpected === 16 && selected === 16 && /* @__PURE__ */ jsx("span", { className: "block mt-1 text-[var(--gold)]", children: "\u{1F3C6} Badge desbloqueado: CRUPIER NIVEL 19" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-center text-xs text-[var(--muted)] mt-3 flex flex-wrap justify-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { children: "\u2705 Directo +10" }),
          /* @__PURE__ */ jsx("span", { children: "\u274C Cumple pero no \xFAltima -5" }),
          /* @__PURE__ */ jsx("span", { children: "\u274C No cumple -3" }),
          /* @__PURE__ */ jsx("span", { children: "\u270D\uFE0F Condici\xF3n +5" }),
          /* @__PURE__ */ jsx("span", { children: "\u25B6 Barrido + acierto +5" }),
          /* @__PURE__ */ jsx("span", { children: "\u{1F451} Jefe +20" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("aside", { className: "panel p-4 order-3", children: [
        /* @__PURE__ */ jsxs("h2", { className: "font-bold text-lg", children: [
          "\u{1F5A5} DEPURADOR AVANZADO: ",
          /* @__PURE__ */ jsx("span", { className: "text-[var(--neon)]", children: ".findLastIndex()" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 bg-black rounded-xl border border-emerald-400/20 p-3 h-[380px] overflow-y-auto font-code text-[12px] leading-relaxed", children: [
          logs.map((l, i) => /* @__PURE__ */ jsx("p", { className: "break-words whitespace-pre-wrap text-emerald-100/90", children: l }, i)),
          /* @__PURE__ */ jsx("p", { className: "text-emerald-400 blink", children: "\u258C" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 p-3 rounded-xl bg-[#fff7d6] text-black text-sm", children: [
          /* @__PURE__ */ jsx("b", { children: "\u2696\uFE0F Comparaci\xF3n siempre visible" }),
          /* @__PURE__ */ jsxs("p", { className: "font-code mt-1 break-words", children: [
            "findLast \u2192 OBJETO carta",
            /* @__PURE__ */ jsx("br", {}),
            "findLastIndex \u2192 N\xDAMERO ",
            displayExpected,
            /* @__PURE__ */ jsx("br", {}),
            "findIndex \u2192 N\xDAMERO ",
            firstIdx,
            " (primera)"
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs", children: [
            "findLastIndex recorre de ",
            /* @__PURE__ */ jsx("b", { children: "atr\xE1s hacia adelante" }),
            " y se detiene en el primer match desde la derecha."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2 text-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "p-2 rounded-lg bg-white/5", children: [
            /* @__PURE__ */ jsx(Sparkles, { className: "mx-auto text-[var(--gold)]", size: 18 }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs mt-1", children: [
              "Memoria",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("b", { children: "Recorrido inverso" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-2 rounded-lg bg-white/5", children: [
            /* @__PURE__ */ jsx(Coins, { className: "mx-auto text-[var(--gold)]", size: 18 }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs mt-1", children: [
              "Fichas",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("b", { children: "Al acertar" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "p-2 rounded-lg bg-white/5", children: [
            /* @__PURE__ */ jsx(Trophy, { className: "mx-auto text-[var(--gold)]", size: 18 }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs mt-1", children: [
              "Meta",
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("b", { children: "Nivel 19" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: () => setLogs(["> Consola limpia.", "> Vuelve a pulsar Barrido o Confirmar."]), className: "mt-3 w-full py-2 rounded-xl bg-white/10 font-bold text-sm", children: "Limpiar consola" }),
        revealed && selected === displayExpected && /* @__PURE__ */ jsxs("div", { className: "mt-3 text-center text-3xl", children: [
          "\u{1FA99} \u{1FA99} \u{1FA99} ",
          /* @__PURE__ */ jsx("span", { className: "block text-sm font-bold text-[var(--gold)]", children: "La carta correcta brilla dorada" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "mx-auto max-w-[1500px] px-4 pb-8 text-center text-xs text-[var(--muted)]", children: "La \xDAltima Carta Roja \xB7 Aprende findLastIndex se\xF1alando el \xEDndice, no la carta. Tu progreso (puntos, racha y manos resueltas) se guarda para continuar despu\xE9s." })
  ] });
}
export {
  App as default
};
