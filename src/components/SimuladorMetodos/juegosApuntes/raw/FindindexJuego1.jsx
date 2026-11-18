/* Convertido automáticamente desde Apuntes/findIndex  , findLast  findLastIndex indexOf   lastIndexOf/Findindex.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
const CASES = [
  { id: "c1", num: "1", titulo: "El primero con sombrero", pista: "Encuentra al primero con sombrero \u{1F3A9}", tipo: "Condici\xF3n booleana simple", codigo: "sospechosos.findIndex(s => s.sombrero) // \u2192 2", respuesta: 2, sospechosos: [
    { nombre: "Ana", sombrero: false, coartada: true, edad: 28, lentes: false },
    { nombre: "Luis", sombrero: false, coartada: false, edad: 35, lentes: true },
    { nombre: "Marta", sombrero: true, coartada: false, edad: 31, lentes: false },
    { nombre: "Pedro", sombrero: true, coartada: true, edad: 45, lentes: false },
    { nombre: "Sof\xEDa", sombrero: true, coartada: false, edad: 27, lentes: true }
  ] },
  { id: "c2", num: "2", titulo: "Primero con edad > 40", pista: "Encuentra al primero con edad > 40", tipo: "Condici\xF3n num\xE9rica", codigo: "sospechosos.findIndex(s => s.edad > 40) // \u2192 3", respuesta: 3, sospechosos: [
    { nombre: "Ana", sombrero: false, coartada: true, edad: 22, lentes: false },
    { nombre: "Luis", sombrero: true, coartada: true, edad: 35, lentes: false },
    { nombre: "Marta", sombrero: false, coartada: false, edad: 39, lentes: true },
    { nombre: "Pedro", sombrero: true, coartada: true, edad: 42, lentes: false },
    { nombre: "Sof\xEDa", sombrero: false, coartada: false, edad: 50, lentes: true },
    { nombre: "Miguel", sombrero: true, coartada: true, edad: 30, lentes: false }
  ] },
  { id: "c3", num: "3", titulo: "Sin coartada Y con sombrero", pista: "Encuentra al primero cuya coartada sea falsa Y tenga sombrero", tipo: "Condici\xF3n compuesta (&&)", codigo: "sospechosos.findIndex(s => !s.coartada && s.sombrero) // \u2192 3", respuesta: 3, sospechosos: [
    { nombre: "Ana", sombrero: true, coartada: true, edad: 28, lentes: false },
    { nombre: "Luis", sombrero: false, coartada: false, edad: 35, lentes: true },
    { nombre: "Marta", sombrero: true, coartada: true, edad: 31, lentes: false },
    { nombre: "Pedro", sombrero: true, coartada: false, edad: 44, lentes: false },
    { nombre: "Sof\xEDa", sombrero: true, coartada: false, edad: 27, lentes: true },
    { nombre: "Miguel", sombrero: false, coartada: false, edad: 38, lentes: false }
  ] },
  { id: "c4", num: "4", titulo: "Primero que NO tenga coartada", pista: "Encuentra al primero que NO tenga coartada", tipo: "Negaci\xF3n (!)", codigo: "sospechosos.findIndex(s => !s.coartada) // \u2192 1", respuesta: 1, sospechosos: [
    { nombre: "Ana", sombrero: false, coartada: true, edad: 28, lentes: false },
    { nombre: "Luis", sombrero: true, coartada: false, edad: 35, lentes: false },
    { nombre: "Marta", sombrero: false, coartada: false, edad: 31, lentes: true },
    { nombre: "Pedro", sombrero: true, coartada: true, edad: 45, lentes: false },
    { nombre: "Sof\xEDa", sombrero: false, coartada: false, edad: 27, lentes: false },
    { nombre: "Miguel", sombrero: true, coartada: true, edad: 40, lentes: true }
  ] },
  { id: "c5", num: "5", titulo: "Primero con nombre por 'M'", pista: "Encuentra al primero con nombre que empiece por 'M'", tipo: "Condici\xF3n sobre string", codigo: "sospechosos.findIndex(s => s.nombre.startsWith('M')) // \u2192 3", respuesta: 3, sospechosos: [
    { nombre: "Ana", sombrero: false, coartada: true, edad: 28, lentes: false },
    { nombre: "Luis", sombrero: true, coartada: false, edad: 35, lentes: false },
    { nombre: "Pedro", sombrero: false, coartada: true, edad: 33, lentes: true },
    { nombre: "Marta", sombrero: true, coartada: false, edad: 31, lentes: false },
    { nombre: "Sof\xEDa", sombrero: false, coartada: true, edad: 27, lentes: true },
    { nombre: "Miguel", sombrero: true, coartada: false, edad: 39, lentes: false }
  ] },
  { id: "c6", num: "6", titulo: "El primero con lentes", pista: "Encuentra al primero con lentes \u{1F453}", tipo: "Condici\xF3n booleana simple", codigo: "sospechosos.findIndex(s => s.lentes) // \u2192 2", respuesta: 2, sospechosos: [
    { nombre: "Ana", sombrero: false, coartada: true, edad: 28, lentes: false },
    { nombre: "Luis", sombrero: true, coartada: false, edad: 35, lentes: false },
    { nombre: "Marta", sombrero: false, coartada: false, edad: 31, lentes: true },
    { nombre: "Pedro", sombrero: true, coartada: true, edad: 45, lentes: true },
    { nombre: "Sof\xEDa", sombrero: false, coartada: false, edad: 27, lentes: false },
    { nombre: "Miguel", sombrero: false, coartada: true, edad: 38, lentes: true }
  ] },
  { id: "trampa", num: "TRAMPA", titulo: "Nivel Trampa", pista: "Encuentra al primero con sombrero \u{1F3A9} \u2014 \xA1cuidado con los que tambi\xE9n cumplen!", tipo: "Trampa did\xE1ctica: el primero, no el m\xE1s evidente", codigo: "sospechosos.findIndex(s => s.sombrero) // \u2192 2", respuesta: 2, sospechosos: [
    { nombre: "Ana", sombrero: false, coartada: true, edad: 28, lentes: false },
    { nombre: "Luis", sombrero: false, coartada: false, edad: 35, lentes: true },
    { nombre: "Marta", sombrero: true, coartada: false, edad: 31, lentes: false },
    { nombre: "Pedro", sombrero: true, coartada: true, edad: 45, lentes: false },
    { nombre: "Sof\xEDa", sombrero: true, coartada: false, edad: 27, lentes: true }
  ] },
  { id: "n18", num: "18", titulo: "DETECTIVE NIVEL 18", pista: "Primero con edad > 30 Y sin coartada Y con sombrero", tipo: "Modo dif\xEDcil \xB7 18 sospechosos \xB7 60 s", codigo: "sospechosos.findIndex(s => s.edad > 30 && !s.coartada && s.sombrero) // \u2192 14", respuesta: 14, dificil: true, sospechosos: [
    { nombre: "Ana", sombrero: true, coartada: true, edad: 25, lentes: false },
    { nombre: "Luis", sombrero: false, coartada: false, edad: 45, lentes: true },
    { nombre: "Marta", sombrero: true, coartada: false, edad: 29, lentes: false },
    { nombre: "Pedro", sombrero: true, coartada: true, edad: 50, lentes: false },
    { nombre: "Sof\xEDa", sombrero: false, coartada: false, edad: 31, lentes: true },
    { nombre: "Miguel", sombrero: true, coartada: false, edad: 28, lentes: false },
    { nombre: "Elena", sombrero: false, coartada: true, edad: 42, lentes: true },
    { nombre: "Diego", sombrero: true, coartada: true, edad: 33, lentes: false },
    { nombre: "Carla", sombrero: false, coartada: false, edad: 38, lentes: false },
    { nombre: "Jorge", sombrero: true, coartada: false, edad: 29, lentes: true },
    { nombre: "Luc\xEDa", sombrero: true, coartada: true, edad: 45, lentes: false },
    { nombre: "Andr\xE9s", sombrero: false, coartada: false, edad: 31, lentes: false },
    { nombre: "Paula", sombrero: true, coartada: false, edad: 27, lentes: true },
    { nombre: "Hugo", sombrero: false, coartada: false, edad: 55, lentes: false },
    { nombre: "Valeria", sombrero: true, coartada: false, edad: 36, lentes: true },
    { nombre: "Tom\xE1s", sombrero: true, coartada: false, edad: 24, lentes: false },
    { nombre: "Rosa", sombrero: true, coartada: false, edad: 48, lentes: false },
    { nombre: "Iv\xE1n", sombrero: true, coartada: false, edad: 30, lentes: true }
  ] }
];
async function api(action, args) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json();
  if (!res.ok || json.error) throw new Error(json.error || "Error de guardado");
  return json.data;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
function normalizaCondicion(v) {
  return v.trim().toLowerCase().replace(/\s+/g, "").replace(/^\(?s\)?=>/, "").replace(/;$/, "").replace(/"/g, "'");
}
function condicionCorrecta(c, raw) {
  if (!raw.trim()) return false;
  const n = normalizaCondicion(raw);
  if (c.id === "c1" || c.id === "trampa") return ["s.sombrero", "s.sombrero===true", "s.sombrero==true"].includes(n);
  if (c.id === "c2") return n === "s.edad>40" || n === "s.edad>=41";
  if (c.id === "c3") return n.includes("!s.coartada") && n.includes("s.sombrero") && n.includes("&&");
  if (c.id === "c4") return ["!s.coartada", "s.coartada===false", "s.coartada==false", "!s.coartada===true"].includes(n);
  if (c.id === "c5") return n.includes("s.nombre.startswith('m')") || n.includes("s.nombre[0]==='m'") || n.includes('s.nombre[0]==="m"') || n.includes("s.nombre.startswith('m')");
  if (c.id === "c6") return ["s.lentes", "s.lentes===true", "s.lentes==true"].includes(n);
  if (c.id === "n18") return n.includes("s.edad>30") && n.includes("!s.coartada") && n.includes("s.sombrero") && n.includes("&&");
  return false;
}
function cumple(c, s) {
  if (c.id === "c1" || c.id === "trampa") return s.sombrero;
  if (c.id === "c2") return s.edad > 40;
  if (c.id === "c3") return !s.coartada && s.sombrero;
  if (c.id === "c4") return !s.coartada;
  if (c.id === "c5") return s.nombre.startsWith("M");
  if (c.id === "c6") return s.lentes;
  if (c.id === "n18") return s.edad > 30 && !s.coartada && s.sombrero;
  return false;
}
function evalTexto(c, s) {
  if (c.id === "c1" || c.id === "trampa") return `s.sombrero = ${s.sombrero}`;
  if (c.id === "c2") return `s.edad > 40 \u2192 ${s.edad} > 40 = ${s.edad > 40}`;
  if (c.id === "c3") return `!s.coartada && s.sombrero \u2192 ${!s.coartada} && ${s.sombrero} = ${!s.coartada && s.sombrero}`;
  if (c.id === "c4") return `!s.coartada = ${!s.coartada}`;
  if (c.id === "c5") return `s.nombre.startsWith('M') \u2192 '${s.nombre}' = ${s.nombre.startsWith("M")}`;
  if (c.id === "c6") return `s.lentes = ${s.lentes}`;
  if (c.id === "n18") return `s.edad>30 && !s.coartada && s.sombrero \u2192 ${s.edad > 30} && ${!s.coartada} && ${s.sombrero} = ${s.edad > 30 && !s.coartada && s.sombrero}`;
  return "";
}
function App() {
  const [caseId, setCaseId] = useState("c1");
  const caso = CASES.find((c) => c.id === caseId) || CASES[0];
  const [selected, setSelected] = useState(null);
  const [condicion, setCondicion] = useState("");
  const [puntos, setPuntos] = useState(0);
  const [racha, setRacha] = useState(0);
  const [resueltos, setResueltos] = useState([]);
  const [insignia, setInsignia] = useState(false);
  const [badge18, setBadge18] = useState(false);
  const [logs, setLogs] = useState([]);
  const [debug, setDebug] = useState(["> Depurador listo. Elige un sospechoso y pulsa SE\xD1ALAR.", "> Recuerda: findIndex devuelve el \xCDNDICE, no el valor."]);
  const [animando, setAnimando] = useState(false);
  const [resultado, setResultado] = useState({ tipo: null, elegido: null, mensaje: "" });
  const [timer, setTimer] = useState(60);
  const [tiempoAgotado, setTiempoAgotado] = useState(false);
  const [overlay, setOverlay] = useState(false);
  const [guardadoMsg, setGuardadoMsg] = useState("");
  const progressIdRef = useRef(null);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    (async () => {
      try {
        const prog = await api("records.list", { collection: "findindex-progress" });
        if (prog?.records?.[0]) {
          progressIdRef.current = prog.records[0].id;
          const v = prog.records[0].value || {};
          if (typeof v.puntos === "number") setPuntos(v.puntos);
          if (typeof v.racha === "number") setRacha(v.racha);
          if (Array.isArray(v.resueltos)) setResueltos(v.resueltos);
          if (v.insignia) setInsignia(true);
          if (v.badge18) setBadge18(true);
        }
        const l = await api("records.list", { collection: "findindex-bitacora", limit: 100 });
        if (l?.records) setLogs(l.records.map((r) => ({ id: r.id, texto: String(r.value?.texto || ""), puntos: String(r.value?.puntos || ""), fecha: String(r.value?.fecha || "") })));
      } catch {
      }
      setCargando(false);
    })();
  }, []);
  useEffect(() => {
    if (caso.id !== "n18" || tiempoAgotado || resueltos.includes("n18") || animando) return;
    const t = setInterval(() => setTimer((v) => {
      if (v <= 1) {
        clearInterval(t);
        setTiempoAgotado(true);
        setDebug((d) => [...d, "> \u23F0 TIEMPO AGOTADO (60 s). Reinicia el caso para intentarlo de nuevo."]);
        return 0;
      }
      return v - 1;
    }), 1e3);
    return () => clearInterval(t);
  }, [caso.id, tiempoAgotado, resueltos, animando]);
  async function guardarProgreso(nuevo) {
    try {
      if (progressIdRef.current) {
        const r = await api("records.replace", { collection: "findindex-progress", id: progressIdRef.current, value: nuevo });
        if (r?.id) progressIdRef.current = r.id;
      } else {
        const r = await api("records.create", { collection: "findindex-progress", value: nuevo, idempotency_key: `prog-${Date.now()}` });
        if (r?.id) progressIdRef.current = r.id;
      }
      setGuardadoMsg("\u2713 Progreso guardado");
      setTimeout(() => setGuardadoMsg(""), 2500);
    } catch {
      setGuardadoMsg("Sin conexi\xF3n: tu partida sigue en pantalla.");
    }
  }
  async function guardarLog(texto, puntosTxt) {
    try {
      const fecha = (/* @__PURE__ */ new Date()).toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" });
      const r = await api("records.create", { collection: "findindex-bitacora", value: { texto, puntos: puntosTxt, fecha }, idempotency_key: `log-${Date.now()}-${Math.random().toString(36).slice(2, 8)}` });
      if (r?.id) setLogs((prev) => [{ id: r.id, texto, puntos: puntosTxt, fecha }, ...prev].slice(0, 50));
    } catch {
      setLogs((prev) => [{ id: `local-${Date.now()}`, texto, puntos: puntosTxt, fecha: "ahora" }, ...prev].slice(0, 50));
    }
  }
  function cambiarCaso(id) {
    setCaseId(id);
    setSelected(null);
    setCondicion("");
    setResultado({ tipo: null, elegido: null, mensaje: "" });
    setTimer(60);
    setTiempoAgotado(false);
    setOverlay(false);
    const c = CASES.find((x) => x.id === id);
    setDebug([`> Caso cambiado: ${c.num} \u2014 ${c.titulo}`, `> Pista: ${c.pista}`, `> C\xF3digo: ${c.codigo}`]);
  }
  function reiniciarCaso() {
    setSelected(null);
    setCondicion("");
    setResultado({ tipo: null, elegido: null, mensaje: "" });
    setTimer(60);
    setTiempoAgotado(false);
    setDebug(["> Caso reiniciado. Vuelve a observar la fila.", "> findIndex devuelve el \xCDNDICE del primero que cumple."]);
  }
  function siguienteCaso() {
    const idx = CASES.findIndex((c) => c.id === caseId);
    const next = CASES[(idx + 1) % CASES.length];
    cambiarCaso(next.id);
  }
  async function reiniciarTodo() {
    const nuevo = { puntos: 0, racha: 0, resueltos: [], insignia: false, badge18: false };
    setPuntos(0);
    setRacha(0);
    setResueltos([]);
    setInsignia(false);
    setBadge18(false);
    setOverlay(false);
    setSelected(null);
    setCondicion("");
    setResultado({ tipo: null, elegido: null, mensaje: "" });
    await guardarProgreso(nuevo);
  }
  async function senalar() {
    if (animando) return;
    if (selected === null) {
      setDebug((d) => [...d, "> \u26A0\uFE0F Primero elige un sospechoso en la fila o un \xEDndice."]);
      return;
    }
    if (caso.id === "n18" && tiempoAgotado) {
      setDebug((d) => [...d, "> \u23F0 El tiempo termin\xF3. Pulsa REINICIAR CASO."]);
      return;
    }
    const elegido = selected;
    const esCorrecto = elegido === caso.respuesta;
    const cumpleElegido = cumple(caso, caso.sospechosos[elegido]);
    const condOk = condicionCorrecta(caso, condicion);
    setAnimando(true);
    const lineas = [];
    const push = (t) => {
      lineas.push(t);
      setDebug([...lineas]);
    };
    push(`> Ejecutando ${caso.codigo.split(" //")[0]}`);
    for (let i = 0; i <= caso.respuesta; i++) {
      const s = caso.sospechosos[i];
      await sleep(380);
      const ok = cumple(caso, s);
      push(`[Iteraci\xF3n ${i}] Evaluando a ${s.nombre}... ${evalTexto(caso, s)} \u2192 ${ok ? "\xA1DETENIDO!" : "sigue"}`);
      if (ok) break;
    }
    await sleep(350);
    let delta = 0;
    let tipo = "malo";
    let mensaje = "";
    let nuevaRacha = racha;
    let nuevaInsignia = insignia;
    let nuevosResueltos = [...resueltos];
    let nuevosPuntos = puntos;
    const todosCumplen = caso.sospechosos.map((s, i) => cumple(caso, s) ? i : null).filter((x) => x !== null);
    const ultimo = todosCumplen[todosCumplen.length - 1];
    if (esCorrecto) {
      tipo = "correcto";
      delta = 10 + (condOk ? 5 : 0);
      let extraBadge = 0;
      nuevaRacha = racha + 1;
      if (nuevaRacha >= 3 && !insignia) {
        nuevaInsignia = true;
        extraBadge = 10;
        delta += 10;
      }
      if (caso.id === "n18") delta += 10;
      if (caso.id === "n18") delta += 0;
      mensaje = caso.id === "n18" ? `\u2705 \xA1CORRECTO! \xCDndice 14. +20 puntos. ${condOk ? " +5 condici\xF3n correcta (incluido en el total si aplica)." : ""} ${nuevaRacha >= 3 && !insignia ? " \xA1INSIGNIA DETECTIVE DESBLOQUEADA! +10 extra." : ""} \u{1F3C5} DETECTIVE NIVEL 18` : `\u2705 \xA1CORRECTO! \xCDndice ${caso.respuesta}. +10 puntos.${condOk ? " +5 por la condici\xF3n." : ""}${extraBadge ? " \xA1INSIGNIA DETECTIVE DESBLOQUEADA! +10 extra." : ""}`;
      if (!nuevosResueltos.includes(caso.id)) nuevosResueltos.push(caso.id);
      push(`\u{1F9E0} Depurador: findIndex encontr\xF3 el PRIMERO que cumple y hace SHORT-CIRCUIT. No revisa a ${caso.sospechosos.slice(caso.respuesta + 1).map((s) => s.nombre).join(", ") || "nadie m\xE1s"} aunque tambi\xE9n cumplan.`);
      push(`> Resultado: ${caso.respuesta} (no es el valor, es el \xCDNDICE)`);
    } else if (cumpleElegido && elegido > caso.respuesta) {
      tipo = "tarde";
      delta = -5;
      nuevaRacha = 0;
      const nombreElegido = caso.sospechosos[elegido].nombre;
      mensaje = caso.id === "trampa" ? `\u274C ${nombreElegido} TAMBI\xC9N tiene sombrero, pero findIndex se detiene en el PRIMERO. La respuesta era el \xEDndice 2. -5` : `\u274C ${nombreElegido} TAMBI\xC9N cumple la condici\xF3n, pero findIndex se detiene en el PRIMERO. La respuesta era el \xEDndice ${caso.respuesta}. -5`;
      push(`\u{1F9E0} Depurador: elegiste a ${nombreElegido} (\xEDndice ${elegido}), que s\xED cumple, pero findIndex ya se hab\xEDa detenido en ${caso.sospechosos[caso.respuesta].nombre} (\xEDndice ${caso.respuesta}).`);
      push(`> Resultado correcto: ${caso.respuesta} (no es el valor, es el \xCDNDICE)`);
    } else {
      tipo = "malo";
      delta = -3;
      nuevaRacha = 0;
      const nombreElegido = caso.sospechosos[elegido].nombre;
      mensaje = `\u274C ${nombreElegido} NO cumple la condici\xF3n. -3. La respuesta era el \xEDndice ${caso.respuesta} (${caso.sospechosos[caso.respuesta].nombre}).`;
      push(`\u{1F9E0} Depurador: ${nombreElegido} no cumple la condici\xF3n, por eso findIndex lo salt\xF3. El primero que s\xED cumple es ${caso.sospechosos[caso.respuesta].nombre}.`);
      push(`> Resultado correcto: ${caso.respuesta} (no es el valor, es el \xCDNDICE)`);
    }
    push(`\u2696\uFE0F vs indexOf: indexOf buscar\xEDa igualdad exacta (===), findIndex busca CONDICI\xD3N.`);
    push(`\u2696\uFE0F vs findLastIndex: findLastIndex dar\xEDa ${ultimo} (el \xFAltimo), findIndex da ${caso.respuesta} (el primero).`);
    if (condOk) push(`\u2713 Condici\xF3n escrita correcta: +5 extra.`);
    else if (condicion.trim()) push(`\u270F\uFE0F Tu condici\xF3n no coincide con la esperada. La correcta es: ${caso.codigo}`);
    else push(`\u270F\uFE0F Escribe la condici\xF3n la pr\xF3xima vez para +5 extra.`);
    if (tipo === "correcto" && nuevaRacha >= 3 && !insignia) push(`\u{1F50D} \xA1INSIGNIA DETECTIVE DESBLOQUEADA! Resolver 3 seguidos \u2192 +10 extra.`);
    if (tipo === "correcto" && caso.id === "n18") push(`\u{1F3C5} Badge: DETECTIVE NIVEL 18 desbloqueado.`);
    nuevosPuntos = Math.max(0, puntos + delta);
    const nuevoBadge18 = badge18 || tipo === "correcto" && caso.id === "n18";
    setPuntos(nuevosPuntos);
    setRacha(nuevaRacha);
    setInsignia(nuevaInsignia);
    setResueltos(nuevosResueltos);
    setBadge18(nuevoBadge18);
    setResultado({ tipo, elegido, mensaje });
    setAnimando(false);
    const logTxt = `Caso ${caso.num} \u2014 ${caso.titulo}: elegiste ${elegido} (${caso.sospechosos[elegido].nombre}), correcto ${caso.respuesta}`;
    await guardarLog(logTxt, delta >= 0 ? `+${delta}` : `${delta}`);
    await guardarProgreso({ puntos: nuevosPuntos, racha: nuevaRacha, resueltos: nuevosResueltos, insignia: nuevaInsignia, badge18: nuevoBadge18 });
    if (nuevosResueltos.length === CASES.length) {
      setTimeout(() => setOverlay(true), 700);
    }
  }
  const todosResueltos = resueltos.length === CASES.length;
  return /* @__PURE__ */ jsxs("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "#030508" }, children: [
    /* @__PURE__ */ jsxs("div", { style: { maxWidth: 1500, margin: "0 auto", padding: "14px 14px 30px" }, children: [
      /* @__PURE__ */ jsxs("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)", position: "sticky", zIndex: 20, background: "rgba(3,5,8,.92)", backdropFilter: "blur(10px)", border: "1px solid #1b2f4d", borderRadius: 16, padding: "12px 14px", display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between" }, children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("div", { style: { fontSize: "clamp(20px,3vw,30px)", fontWeight: 800, letterSpacing: ".02em", lineHeight: 1 }, children: [
            "\u{1F575} DETECTIVE ",
            /* @__PURE__ */ jsx("span", { style: { color: "#22d3ee" }, children: "//" }),
            " CASO FINDINDEX"
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { color: "#8fb3d1", fontSize: 13, marginTop: 4 }, children: [
            "Se\xF1ala al ",
            /* @__PURE__ */ jsx("b", { style: { color: "white" }, children: "PRIMERO" }),
            " que cumple la condici\xF3n. El resultado es un ",
            /* @__PURE__ */ jsx("b", { style: { color: "#22ff88" }, children: "\xEDndice" }),
            ", no un valor."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }, children: [
          /* @__PURE__ */ jsx("span", { style: { border: "1px solid #22ff88", color: "#22ff88", borderRadius: 99, padding: "6px 10px", fontSize: 12, fontWeight: 700 }, children: "SIN API \u2705 IA CASERA" }),
          /* @__PURE__ */ jsxs("span", { style: { background: "#22d3ee", color: "#02141a", borderRadius: 99, padding: "6px 12px", fontWeight: 800 }, children: [
            "PUNTOS: ",
            puntos
          ] }),
          /* @__PURE__ */ jsxs("span", { style: { background: "#ffe600", color: "#1a1400", borderRadius: 99, padding: "6px 12px", fontWeight: 800 }, children: [
            "RACHA: ",
            racha,
            " \u{1F525}"
          ] }),
          insignia && /* @__PURE__ */ jsx("span", { style: { border: "1px solid #ffe600", color: "#ffe600", borderRadius: 99, padding: "6px 10px", fontWeight: 800 }, children: "\u{1F50D} DETECTIVE" }),
          badge18 && /* @__PURE__ */ jsx("span", { style: { background: "#ff2e88", color: "white", borderRadius: 99, padding: "6px 10px", fontWeight: 800 }, children: "\u{1F3C5} NIVEL 18" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { marginTop: 12, background: "#071223", border: "1px solid #1b2f4d", borderRadius: 12, padding: "10px 12px", fontSize: 14, color: "#cfeaff" }, children: [
        /* @__PURE__ */ jsx("b", { style: { color: "#22d3ee" }, children: "\xBFQu\xE9 devuelve findIndex?" }),
        " \xA0 La ",
        /* @__PURE__ */ jsx("b", { children: "posici\xF3n" }),
        " del primer elemento que cumple una condici\xF3n. Si devuelve ",
        /* @__PURE__ */ jsx("b", { children: "2" }),
        ", es el sospechoso en la posici\xF3n 2. \xA0 ",
        /* @__PURE__ */ jsx("span", { style: { color: "#8fb3d1" }, children: cargando ? "Cargando progreso\u2026" : guardadoMsg || "Tu progreso y tu bit\xE1cora se guardan para volver despu\xE9s." })
      ] }),
      /* @__PURE__ */ jsxs("main", { className: "layout", style: { marginTop: 14 }, children: [
        /* @__PURE__ */ jsxs("aside", { className: "panel", style: { padding: 14 }, children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center" }, children: [
            /* @__PURE__ */ jsx("span", { className: "panel-title", children: "\u{1F4C2} CASOS" }),
            /* @__PURE__ */ jsxs("span", { style: { fontSize: 12, color: "#8fb3d1" }, children: [
              resueltos.length,
              "/",
              CASES.length,
              " resueltos"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { style: { marginTop: 10, display: "flex", flexDirection: "column", gap: 8 }, children: CASES.map((c) => /* @__PURE__ */ jsxs("button", { className: `case-btn ${c.id === caseId ? "active" : ""}`, onClick: () => cambiarCaso(c.id), children: [
            /* @__PURE__ */ jsxs("span", { children: [
              /* @__PURE__ */ jsx("b", { style: { color: c.id === "n18" ? "#ff2e88" : c.id === "trampa" ? "#ffe600" : "#22d3ee" }, children: c.id === "trampa" ? "\u26A0\uFE0F TRAMPA" : c.id === "n18" ? "\u{1F525} 18" : `CASO ${c.num}` }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { style: { fontSize: 13, color: "#dbeeff" }, children: c.titulo }),
              /* @__PURE__ */ jsx("br", {}),
              /* @__PURE__ */ jsx("span", { style: { fontSize: 11, color: "#8fb3d1" }, children: c.tipo })
            ] }),
            /* @__PURE__ */ jsx("span", { style: { fontSize: 18 }, children: resueltos.includes(c.id) ? "\u2705" : "\u23F3" })
          ] }, c.id)) }),
          /* @__PURE__ */ jsxs("div", { style: { marginTop: 14, borderTop: "1px solid #1b2f4d", paddingTop: 12 }, children: [
            /* @__PURE__ */ jsx("div", { className: "panel-title", children: "\u{1F4D3} BIT\xC1CORA" }),
            /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "#8fb3d1", marginTop: 4 }, children: "Cada intento queda registrado con sus puntos." }),
            /* @__PURE__ */ jsxs("div", { style: { maxHeight: 260, overflowY: "auto", marginTop: 8, display: "flex", flexDirection: "column", gap: 7 }, children: [
              logs.length === 0 && /* @__PURE__ */ jsx("div", { style: { color: "#8fb3d1", fontSize: 13 }, children: "A\xFAn no hay intentos. Tu primer caso te espera." }),
              logs.map((l) => /* @__PURE__ */ jsxs("div", { style: { background: "#050b18", border: "1px solid #1b2f4d", borderRadius: 10, padding: "8px 10px", fontSize: 13 }, children: [
                /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 8 }, children: [
                  /* @__PURE__ */ jsxs("b", { style: { color: "#22d3ee" }, children: [
                    l.puntos,
                    " pts"
                  ] }),
                  /* @__PURE__ */ jsx("span", { style: { color: "#8fb3d1" }, children: l.fecha })
                ] }),
                /* @__PURE__ */ jsx("div", { style: { color: "#dbeeff", marginTop: 2 }, children: l.texto })
              ] }, l.id))
            ] }),
            /* @__PURE__ */ jsx("button", { className: "btn-ghost", style: { width: "100%", marginTop: 10 }, onClick: reiniciarTodo, children: "\u21BA Reiniciar partida y puntos" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel", style: { padding: 16, overflowX: "clip" }, children: [
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap", alignItems: "flex-start" }, children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx("div", { className: "panel-title", children: "\u{1F526} ESCENA DEL CRIMEN" }),
              /* @__PURE__ */ jsxs("h2", { style: { fontSize: "clamp(22px,3vw,30px)", margin: "8px 0 2px", lineHeight: 1.1 }, children: [
                "CASO #",
                caso.num,
                ": \u201C",
                caso.titulo,
                "\u201D"
              ] }),
              /* @__PURE__ */ jsx("p", { style: { color: "#8fb3d1", margin: 0 }, children: caso.tipo })
            ] }),
            caso.id === "n18" && /* @__PURE__ */ jsxs("div", { style: { textAlign: "right" }, children: [
              /* @__PURE__ */ jsxs("div", { style: { fontSize: 28, fontWeight: 800, color: timer <= 10 ? "#ff3b5c" : "#ffe600" }, className: "mono", children: [
                "\u23F1 ",
                timer,
                "s"
              ] }),
              /* @__PURE__ */ jsx("div", { style: { fontSize: 12, color: "#8fb3d1" }, children: tiempoAgotado ? "Tiempo agotado" : resueltos.includes("n18") ? "\xA1Caso 18 resuelto!" : "Tienes 60 segundos" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginTop: 14, background: "#050b18", border: "1px solid #22d3ee55", borderRadius: 14, padding: "14px 14px" }, children: [
            /* @__PURE__ */ jsx("div", { style: { fontSize: 12, letterSpacing: ".14em", color: "#22d3ee", fontWeight: 700 }, children: "PISTA DEL CASO" }),
            /* @__PURE__ */ jsx("div", { style: { fontSize: "clamp(19px,2.6vw,26px)", fontWeight: 800, marginTop: 4 }, children: caso.pista }),
            /* @__PURE__ */ jsx("div", { className: "mono", style: { marginTop: 8, color: "#7dffb0", fontSize: 13, wordBreak: "break-word" }, children: caso.codigo }),
            caso.id === "trampa" && /* @__PURE__ */ jsx("div", { style: { marginTop: 8, color: "#ffe600", fontSize: 13 }, children: "\u26A0\uFE0F Hay 3 con sombrero. Solo el primero cuenta. No elijas al m\xE1s evidente." })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginTop: 14, display: "flex", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsx("b", { children: "La fila \u2014 un array de sospechosos" }),
            /* @__PURE__ */ jsx("span", { className: "mono", style: { color: "#8fb3d1", fontSize: 12 }, children: "\u2190 despl\xE1zate \u2192" })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "suspect-row", style: { marginTop: 8 }, children: caso.sospechosos.map((s, i) => {
            const isSel = selected === i;
            const cls = resultado.elegido === i ? resultado.tipo === "correcto" ? "correct" : resultado.tipo === "tarde" ? "wrong" : "wrong" : i === caso.respuesta && resultado.tipo ? "correct" : "";
            return /* @__PURE__ */ jsxs("button", { className: `s-card ${isSel ? "selected" : ""} ${cls}`, onClick: () => {
              setSelected(i);
              setResultado({ tipo: null, elegido: null, mensaje: "" });
            }, "aria-label": `Sospechoso ${i} ${s.nombre}`, children: [
              /* @__PURE__ */ jsxs("div", { className: "mono", style: { color: "#22d3ee", fontWeight: 700 }, children: [
                "[",
                i,
                "]"
              ] }),
              /* @__PURE__ */ jsxs("div", { style: { fontSize: 36, lineHeight: 1.1 }, children: [
                s.sombrero ? "\u{1F3A9}" : "",
                "\u{1F464}",
                s.lentes ? "\u{1F453}" : ""
              ] }),
              /* @__PURE__ */ jsx("div", { style: { fontWeight: 800, fontSize: 17 }, children: s.nombre }),
              /* @__PURE__ */ jsxs("div", { style: { fontSize: 12, color: "#8fb3d1", marginTop: 4, lineHeight: 1.5 }, children: [
                s.sombrero ? "\u{1F3A9} Sombrero " : "\u{1F6AB} Sin sombrero",
                /* @__PURE__ */ jsx("br", {}),
                s.lentes ? "\u{1F453} Lentes " : "\u2014 Sin lentes",
                /* @__PURE__ */ jsx("br", {}),
                "Edad: ",
                s.edad,
                /* @__PURE__ */ jsx("br", {}),
                "Coartada: ",
                s.coartada ? "\u2705" : "\u274C"
              ] }),
              isSel && /* @__PURE__ */ jsx("div", { style: { marginTop: 6, color: "#22d3ee", fontWeight: 800, fontSize: 12 }, children: "\u25C9 SELECCIONADO" })
            ] }, i);
          }) }),
          /* @__PURE__ */ jsxs("div", { style: { marginTop: 10 }, children: [
            /* @__PURE__ */ jsx("div", { style: { fontWeight: 800, fontSize: 18 }, children: "\xBFEn qu\xE9 \xEDndice est\xE1 el primero que cumple?" }),
            /* @__PURE__ */ jsx("div", { style: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }, children: caso.sospechosos.map((_, i) => /* @__PURE__ */ jsx("button", { className: `idx-btn ${selected === i ? "sel" : ""} ${resultado.elegido === i && resultado.tipo === "correcto" ? "correct" : ""} ${resultado.elegido === i && resultado.tipo !== "correcto" && resultado.tipo ? "wrong" : ""}`, onClick: () => setSelected(i), children: i }, i)) })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginTop: 16 }, children: [
            /* @__PURE__ */ jsxs("label", { style: { fontSize: 13, color: "#8fb3d1" }, children: [
              "Escribe la condici\xF3n para +5 extra ",
              /* @__PURE__ */ jsx("span", { style: { color: "#cfeaff" }, children: "(ej: s => s.sombrero)" })
            ] }),
            /* @__PURE__ */ jsx("input", { type: "text", value: condicion, onChange: (e) => setCondicion(e.target.value), placeholder: "s => s.sombrero", style: { marginTop: 6 } })
          ] }),
          resultado.mensaje && /* @__PURE__ */ jsx("div", { style: { marginTop: 12, padding: "12px 13px", borderRadius: 12, background: resultado.tipo === "correcto" ? "#052e1a" : "#2a0a14", border: `1px solid ${resultado.tipo === "correcto" ? "#22ff88" : "#ff3b5c"}`, fontWeight: 600, lineHeight: 1.45 }, children: resultado.mensaje }),
          /* @__PURE__ */ jsxs("div", { style: { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14 }, children: [
            /* @__PURE__ */ jsx("button", { className: "btn-primary", style: { flex: "1 1 200px" }, onClick: senalar, disabled: animando || selected === null, children: animando ? "\u{1F575} EJECUTANDO\u2026" : "\u{1F50D} SE\xD1ALAR SOSPECHOSO" }),
            /* @__PURE__ */ jsx("button", { className: "btn-ghost", onClick: siguienteCaso, children: "SIGUIENTE CASO \u2192" }),
            /* @__PURE__ */ jsx("button", { className: "btn-ghost", onClick: reiniciarCaso, children: "\u21BA REINICIAR CASO" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginTop: 10, fontSize: 13, color: "#8fb3d1" }, children: [
            "+10 acierto \xB7 +5 condici\xF3n correcta \xB7 \u22125 si cumple pero no es el primero \xB7 \u22123 si no cumple \xB7 3 seguidos = \u{1F50D} +10 extra. ",
            caso.id === "n18" && "Nivel 18: acierto = +20."
          ] })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "panel", style: { padding: 14 }, children: [
          /* @__PURE__ */ jsx("div", { className: "panel-title", children: "\u{1F4BB} DEPURADOR INTELIGENTE: .findIndex()" }),
          /* @__PURE__ */ jsxs("div", { className: "mono", style: { marginTop: 10, background: "#02040a", border: "1px solid #1b2f4d", borderRadius: 12, padding: 12, minHeight: 260, fontSize: 12.5 }, children: [
            debug.map((l, i) => /* @__PURE__ */ jsx("div", { className: "debug-line", style: { color: l.startsWith("> Resultado") ? "#22ff88" : l.includes("DETENIDO") ? "#22ff88" : l.includes("\u274C") || l.includes("NO cumple") ? "#ff8aa0" : l.startsWith("\u{1F9E0}") ? "#ffe600" : l.startsWith("\u2696\uFE0F") ? "#22d3ee" : "#dbeeff", marginBottom: 7 }, children: l }, i)),
            animando && /* @__PURE__ */ jsx("div", { className: "blink", style: { color: "#22d3ee" }, children: "\u258C ejecutando\u2026" })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginTop: 12, border: "1px solid #22d3ee66", borderRadius: 12, padding: 12, background: "#04121f" }, children: [
            /* @__PURE__ */ jsx("div", { style: { fontWeight: 800, letterSpacing: ".08em", fontSize: 12, color: "#22d3ee" }, children: "\u2696\uFE0F COMPARACI\xD3N \xB7 SIEMPRE VISIBLE" }),
            /* @__PURE__ */ jsxs("div", { style: { marginTop: 9, display: "flex", flexDirection: "column", gap: 9, fontSize: 13, lineHeight: 1.45 }, children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("b", { style: { color: "#22ff88" }, children: "findIndex" }),
                " \u2192 devuelve el ",
                /* @__PURE__ */ jsx("b", { children: "\xCDNDICE" }),
                " del ",
                /* @__PURE__ */ jsx("b", { children: "PRIMERO" }),
                " que cumple una ",
                /* @__PURE__ */ jsx("b", { children: "CONDICI\xD3N" }),
                ". Se detiene (short-circuit)."
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("b", { style: { color: "#8fb3d1" }, children: "indexOf" }),
                " \u2192 busca ",
                /* @__PURE__ */ jsx("b", { children: "igualdad exacta" }),
                " (===): \u201C\xBFd\xF3nde est\xE1 exactamente Marta?\u201D."
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("b", { style: { color: "#ff2e88" }, children: "findLastIndex" }),
                " \u2192 devuelve el ",
                /* @__PURE__ */ jsx("b", { children: "\xCDNDICE del \xDALTIMO" }),
                " que cumple. Con sombreros en 2, 3 y 4 dar\xEDa ",
                /* @__PURE__ */ jsx("b", { children: "4" }),
                ", no 2."
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mono", style: { marginTop: 12, background: "#050b18", border: "1px solid #1b2f4d", borderRadius: 12, padding: 12, fontSize: 12, lineHeight: 1.6, color: "#cfeaff" }, children: [
            /* @__PURE__ */ jsx("div", { style: { color: "#22d3ee" }, children: "const sospechosos = [ ... ];" }),
            /* @__PURE__ */ jsxs("div", { children: [
              "\u2192 findIndex devuelve ",
              /* @__PURE__ */ jsx("b", { style: { color: "#22ff88" }, children: "posici\xF3n" }),
              ", no valor."
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              "\u2192 Si devuelve ",
              /* @__PURE__ */ jsx("b", { children: "2" }),
              ", es el sospechoso en la posici\xF3n 2."
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              "\u2192 Es una ",
              /* @__PURE__ */ jsx("b", { children: "condici\xF3n" }),
              ", no una igualdad exacta."
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              "\u2192 Es el ",
              /* @__PURE__ */ jsx("b", { children: "primero" }),
              ", no el m\xE1s evidente."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { style: { marginTop: 12, fontSize: 13, color: "#8fb3d1" }, children: [
            "Progreso: ",
            /* @__PURE__ */ jsxs("b", { style: { color: "white" }, children: [
              resueltos.length,
              "/",
              CASES.length
            ] }),
            " \xB7 Racha actual: ",
            /* @__PURE__ */ jsx("b", { style: { color: "white" }, children: racha }),
            " \xB7 ",
            todosResueltos ? "\xA1Todos los casos resueltos!" : "Sigue la pista y no te dejes enga\xF1ar por los que tambi\xE9n cumplen."
          ] }),
          todosResueltos && /* @__PURE__ */ jsx("button", { className: "btn-primary", style: { width: "100%", marginTop: 10 }, onClick: () => setOverlay(true), children: "\u{1F3C6} VER CASO RESUELTO" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("footer", { style: { marginTop: 14, textAlign: "center", color: "#8fb3d1", fontSize: 12 }, children: "Detective FindIndex \xB7 El primero que cumple gana. El \xEDndice es la respuesta." })
    ] }),
    overlay && /* @__PURE__ */ jsx("div", { style: { position: "fixed", inset: 0, background: "rgba(1,3,8,.88)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }, children: /* @__PURE__ */ jsxs("div", { className: "panel", style: { maxWidth: 560, width: "100%", padding: 26, textAlign: "center" }, children: [
      /* @__PURE__ */ jsx("div", { style: { fontSize: 52 }, children: "\u{1F3C6}" }),
      /* @__PURE__ */ jsx("h2", { style: { fontSize: "clamp(24px,5vw,34px)", margin: "8px 0" }, children: "CASO RESUELTO \u2014 ERES DETECTIVE NIVEL FINDINDEX" }),
      /* @__PURE__ */ jsxs("p", { style: { color: "#cfeaff", lineHeight: 1.6 }, children: [
        "Dominaste la diferencia clave: ",
        /* @__PURE__ */ jsx("b", { children: "findIndex" }),
        " devuelve el ",
        /* @__PURE__ */ jsx("b", { children: "\xEDndice del primero" }),
        " que cumple una ",
        /* @__PURE__ */ jsx("b", { children: "condici\xF3n" }),
        ". No es indexOf. No es el \xFAltimo. No es el valor."
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { marginTop: 14, fontSize: 22, fontWeight: 800 }, children: [
        "PUNTOS TOTALES: ",
        /* @__PURE__ */ jsx("span", { style: { color: "#22ff88" }, children: puntos })
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { marginTop: 6, color: "#ffe600" }, children: [
        "\u{1F50D} Insignia detective ",
        insignia ? "desbloqueada" : "\xB7 sigue hasta 3 seguidos",
        " ",
        badge18 ? "\xB7 \u{1F3C5} Nivel 18" : ""
      ] }),
      /* @__PURE__ */ jsxs("div", { style: { display: "flex", gap: 10, justifyContent: "center", marginTop: 18, flexWrap: "wrap" }, children: [
        /* @__PURE__ */ jsx("button", { className: "btn-primary", onClick: () => setOverlay(false), children: "SEGUIR JUGANDO" }),
        /* @__PURE__ */ jsx("button", { className: "btn-ghost", onClick: () => {
          setOverlay(false);
          cambiarCaso("c1");
        }, children: "VOLVER AL CASO 1" })
      ] })
    ] }) })
  ] });
}
export {
  App as default
};
