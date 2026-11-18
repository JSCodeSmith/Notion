/* Convertido automáticamente desde Apuntes/some/juego.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useRef, useState } from "react";
import { Activity, Brain, Radio, ShieldAlert, RotateCcw, ScanLine, Users } from "lucide-react";
const NOMBRES = ["Carlos", "Elena", "Roberto", "Sof\xEDa", "Miguel", "Luc\xEDa", "Javier", "Carmen", "Andr\xE9s", "Valeria"];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let uid = 1;
const nextId = () => uid++;
function normalizar(t) {
  return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}
function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function num(a, b) {
  return Math.floor(a + Math.random() * (b - a + 1));
}
function generarRespuestaCasera(p, texto) {
  const t = normalizar(texto);
  const tiene = (...words) => words.some((w) => t.includes(w));
  const es = (re) => re.test(t);
  const sano = !p.isZombie;
  if (sano) {
    if (es(/^(hola|buenas|hey|que tal|saludos)/) || tiene("hola", "buenas")) return pick([
      "Hola, doctor. Gracias por hablar conmigo, aqu\xED dentro todo da un poco de miedo.",
      "Hola. \xBFYa puedo salir? Prometo que estoy bien, solo estoy asustado.",
      "Buenas, doctor. Me alegra que alguien por fin me escuche."
    ]);
    if (tiene("quien eres", "como te llamas", "tu nombre")) return pick([
      `Me llamo ${p.nombre}. Trabajo aqu\xED cerca y vine porque me sent\xEDa mal.`,
      `Soy ${p.nombre}. No entiendo por qu\xE9 me tienen en cuarentena.`,
      `Me llamo ${p.nombre}, doctor. \xBFPuede decirle a mi familia que estoy bien?`
    ]);
    if (tiene("como estas", "como te sientes", "te sientes", "que sientes")) return pick([
      "Asustado, pero creo que estoy bien. Solo tengo un poco de fiebre por los nervios.",
      "Nervioso. Me duele un poco la cabeza, pero creo que es por no dormir.",
      "Me siento cansado y asustado, pero l\xFAcido. \xBFEso es buena se\xF1al, verdad?"
    ]);
    if (tiene("hambre", "comer", "comida")) return pick([
      "Un poco, no he comido desde ayer. \xBFMe traen algo?",
      "S\xED, tengo hambre. Un caldo caliente me vendr\xEDa muy bien.",
      "Algo de hambre, s\xED. No he probado bocado desde que llegu\xE9."
    ]);
    if (tiene("cerebro", "cerebros")) return "\xBFCerebros? No, doctor, yo pienso con normalidad. Solo me duele un poco la cabeza.";
    if (tiene("carne")) return "No, gracias. Hoy prefiero algo ligero, como sopa o pan.";
    if (tiene("dolor", "duele", "dolor")) return pick([
      "Me duele un poco la cabeza y los hombros, pero nada grave.",
      "Un dolor leve, como cuando uno no duerme bien.",
      "Me molesta un poco el cuello. \xBFSer\xE1 por el colch\xF3n?"
    ]);
    if (tiene("fiebre", "temperatura", "calentura")) return "Creo que tengo un poco de fiebre, pero seguro es por los nervios. \xBFMe puede tomar la temperatura otra vez?";
    if (tiene("hospital", "cuarentena", "aqui", "lugar")) return pick([
      "Este hospital me pone nervioso. \xBFCu\xE1nto tiempo m\xE1s me quedo aqu\xED?",
      "No entiendo por qu\xE9 hay tanta seguridad. \xBFPas\xF3 algo grave afuera?",
      "Quiero irme a casa. \xBFCu\xE1ndo me dan el alta?"
    ]);
    if (tiene("ayuda", "ayudame", "socorro")) return "Por favor, ay\xFAdeme a salir de aqu\xED. Le prometo que estoy bien, solo estoy asustado.";
    if (tiene("donde", "estoy")) return "Estoy en una habitaci\xF3n fr\xEDa, con una luz muy blanca. \xBFEsto es cuarentena?";
    if (tiene("familia", "mama", "papa", "hijos", "esposa", "esposo", "hermano")) return "Echo mucho de menos a mi familia. \xBFLes puede decir que estoy bien?";
    if (tiene("xd", "jaja", "risa")) return "Ja, ja\u2026 perdone, doctor. Con tanto miedo, hasta re\xEDrme me calma un poco.";
    if (tiene("miedo", "asustado", "nervios")) return "S\xED, tengo miedo. Pero hablar con usted me tranquiliza un poco.";
    if (tiene("zombi", "zombie", "infectado", "virus", "some")) return "\xBFZombi? No, doctor, yo no soy eso. Solo estoy asustado y quiero irme a casa.";
    if (tiene("gracias")) return "Gracias a usted por escucharme, doctor. De verdad lo necesitaba.";
    if (tiene("adios", "chao", "hasta luego")) return "Hasta luego, doctor. Ojal\xE1 la pr\xF3xima vez sea para darme el alta.";
    return pick([
      "Entiendo, doctor. \xBFMe puede explicar qu\xE9 est\xE1 pasando en el hospital?",
      "No estoy seguro, pero creo que estoy bien. Solo estoy muy cansado.",
      "\xBFPuedo tomar agua? Me siento un poco mareado por los nervios.",
      "Perdone, estoy un poco confundido. \xBFMe repite la pregunta?"
    ]);
  }
  const probDelata = Math.min(0.85, 0.42 + p.mensajes * 0.09);
  const seDelata = Math.random() < probDelata;
  const slip = (base, delata, sospecha) => ({ texto: seDelata ? delata : base, sospecha: seDelata ? sospecha : 0 });
  if (es(/^(hola|buenas|hey|que tal)/) || tiene("hola", "buenas")) {
    const r = slip("Hola... doctor... yo... bien... creo.", "Holaaa... grrr... huelo... digo, veo... a un doctor amable, argh.", 20);
    return r;
  }
  if (tiene("quien eres", "como te llamas", "tu nombre")) {
    const r = slip(`Me llamo... ${p.nombre}... creo... s\xED, ${p.nombre}.`, `Me llamo... ${p.nombre}... o me llamaba... grrr... ya no me acuerdo bien.`, 22);
    return r;
  }
  if (tiene("como estas", "como te sientes", "te sientes")) {
    const r = slip("Bien... un poco cansado... nada m\xE1s.", "Me siento... con hambre... de... dormir... s\xED, de dormir, grrr.", 20);
    return r;
  }
  if (tiene("hambre", "comer", "comida")) {
    const r = slip("Un poco... de hambre... normal.", "MUCHA hambre... de... ensalada... digo, de CEREBROS... digo, de comida normal, grrr.", 25);
    return r;
  }
  if (tiene("cerebro", "cerebros")) {
    const r = slip("\xBFCerebros? No... \xBFpor qu\xE9 dice eso?", "Cerebros... digo, cereales... me encantan los cereales... crujientes... grrr.", 25);
    return r;
  }
  if (tiene("carne")) {
    const r = slip("Carne... no s\xE9... quiz\xE1.", "Carne... cruda... digo, cocida... muy cocida... o cruda, grrr, da igual.", 24);
    return r;
  }
  if (tiene("dolor", "duele")) {
    const r = slip("Me duele... un poco... todo.", "Se me cae un brazo... digo, se me duerme un brazo... se me cae, grrr.", 22);
    return r;
  }
  if (tiene("fiebre", "temperatura")) {
    const r = slip("Fr\xEDo... tengo fr\xEDo...", "No tengo fiebre... estoy fr\xEDo... muy fr\xEDo... como... muerto, grrr.", 20);
    return r;
  }
  if (tiene("hospital", "cuarentena", "aqui")) {
    const r = slip("Este lugar... huele... raro...", "Este hospital huele... a gente viva... digo, a limpio... grrr, a limpio.", 23);
    return r;
  }
  if (tiene("ayuda")) {
    const r = slip("Ayuda... s\xED... ayuda...", "Ay\xFAdeme a salir... necesito... aire... y... algo que morder... digo, comer.", 22);
    return r;
  }
  if (tiene("zombi", "zombie", "infectado")) {
    const r = slip("\xBFZombi? Yo no... yo no...", "\xBFZOMBI? \xA1Yo no soy zombi! ... grrr... \xBFpor qu\xE9 me mira as\xED?", 25);
    return r;
  }
  if (tiene("xd", "jaja")) return seDelata ? "Ja... ja... grrr... qu\xE9 risa tan... humana." : "Ja, ja... s\xED... gracioso...";
  if (tiene("familia")) {
    const r = slip("Mi familia... no recuerdo...", "Mi familia... me... espera... para... cenar... grrr... cenar con ellos.", 20);
    return r;
  }
  if (tiene("gracias")) return seDelata ? "De nada... grrr... gracias a usted... por acercarse tanto." : "De nada... doctor...";
  return seDelata ? pick([
    "No s\xE9... mi cabeza... hace ruidos... grrr... como si algo me llamara.",
    "Tengo... hambre... otra vez... de... cosas... blandas... grrr.",
    "Se me cae... algo... no mire... grrr... es normal, \xBFno?",
    "Usted huele... bien... digo, se ve bien... grrr."
  ]) : pick([
    "No s\xE9... estoy... cansado...",
    "\xBFQu\xE9? Perd\xF3n... me perd\xED... \xBFqu\xE9 dec\xEDa?",
    "S\xED... eso... eso mismo...",
    "Hmm... no... no recuerdo..."
  ]);
}
async function api(action, args) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json.error) throw new Error(json.error || `Error ${res.status}`);
  return json.data;
}
function App() {
  const [vidas, setVidas] = useState(4);
  const [ronda, setRonda] = useState(1);
  const [pacientes, setPacientes] = useState([]);
  const [seleccionadoId, setSeleccionadoId] = useState(null);
  const [chat, setChat] = useState([]);
  const [input, setInput] = useState("");
  const [escribiendo, setEscribiendo] = useState(false);
  const [debug, setDebug] = useState([]);
  const [escaneando, setEscaneando] = useState(false);
  const [rondaTerminada, setRondaTerminada] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [alerta, setAlerta] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [registroEstado, setRegistroEstado] = useState("Cargando bit\xE1cora\u2026");
  const [guardando, setGuardando] = useState(false);
  const chatRef = useRef(null);
  const debugRef = useRef(null);
  const pacientesRef = useRef([]);
  const vidasRef = useRef(4);
  const seleccionadoRef = useRef(null);
  const escaneandoRef = useRef(false);
  pacientesRef.current = pacientes;
  vidasRef.current = vidas;
  seleccionadoRef.current = seleccionadoId;
  escaneandoRef.current = escaneando;
  const addDebug = useCallback((texto, kind) => setDebug((d) => [...d, { id: nextId(), texto, kind }]), []);
  const addChat = useCallback((tipo, texto) => setChat((c) => [...c, { id: nextId(), tipo, texto }]), []);
  const reloadRecords = useCallback(async () => {
    try {
      const data = await api("records.list", { collection: "protocol_z_sessions" });
      const recs = data?.records || [];
      setSessions(recs.slice(-8).reverse());
      setRegistroEstado(recs.length ? `${recs.length} registro(s) en la bit\xE1cora` : "Bit\xE1cora vac\xEDa \u2014 la primera ronda quedar\xE1 registrada");
    } catch {
      setRegistroEstado("Bit\xE1cora no disponible en esta vista previa \u2014 el juego sigue offline");
    }
  }, []);
  const createRow = useCallback(async (row) => {
    await api("records.create", { collection: "protocol_z_sessions", value: row, idempotency_key: `pz-${row.ronda}-${row.resultado}-${row.fecha}-${row.detalle}`.slice(0, 120) });
  }, []);
  const guardarSesion = useCallback(async (resultado, detalle, vidasFinal) => {
    setGuardando(true);
    try {
      const row = { resultado, vidas: vidasFinal, ronda, detalle, fecha: (/* @__PURE__ */ new Date()).toISOString() };
      await createRow(row);
      await reloadRecords();
      setRegistroEstado("Sesi\xF3n guardada en la bit\xE1cora");
    } catch (e) {
      setRegistroEstado("No se pudo guardar en la bit\xE1cora \u2014 el juego sigue offline");
    } finally {
      setGuardando(false);
    }
  }, [createRow, reloadRecords, ronda]);
  const initJuego = useCallback((mantenerVidas = false) => {
    const barajados = [...NOMBRES].sort(() => Math.random() - 0.5);
    const nuevos = barajados.slice(0, 4).map((nombre, i) => ({ id: i, nombre, isZombie: Math.random() < 0.35, historial: [], sospecha: 0, estado: "pendiente", mensajes: 0 }));
    setPacientes(nuevos);
    setSeleccionadoId(null);
    setChat([{ id: nextId(), tipo: "system", texto: "> Selecciona un paciente de la lista para iniciar el interrogatorio." }]);
    setDebug([
      { id: nextId(), texto: "> Esperando ejecuci\xF3n de Array.prototype.some()...", kind: "call" },
      { id: nextId(), texto: "> Listo para iterar el array de pacientes.", kind: "call" }
    ]);
    setAlerta(false);
    setRondaTerminada(false);
    setGameOver(false);
    setEscaneando(false);
    setEscribiendo(false);
    setInput("");
    if (!mantenerVidas) {
      setVidas(4);
    }
  }, []);
  useEffect(() => {
    initJuego();
    reloadRecords();
  }, [initJuego, reloadRecords]);
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight });
  }, [chat, escribiendo]);
  useEffect(() => {
    debugRef.current?.scrollTo({ top: debugRef.current.scrollHeight });
  }, [debug]);
  const seleccionarPaciente = (p) => {
    if (escaneandoRef.current) return;
    setSeleccionadoId(p.id);
    const base = [{ id: nextId(), tipo: "system", texto: `> Interrogando a ${p.nombre}. Presiona 'Enviar' para hablar.` }];
    const hist = p.historial.map((m) => ({ id: nextId(), tipo: m.role === "user" ? "doctor" : "patient", texto: m.content }));
    setChat([...base, ...hist]);
  };
  const enviarMensaje = async () => {
    const texto = input.trim();
    const selId = seleccionadoRef.current;
    if (!texto || selId === null || escribiendo || escaneandoRef.current) return;
    const paciente = pacientesRef.current.find((p) => p.id === selId);
    if (!paciente) return;
    setInput("");
    addChat("doctor", texto);
    const historialActual = [...paciente.historial, { role: "user", content: texto }];
    const pacienteActual = { ...paciente, historial: historialActual, mensajes: paciente.mensajes + 1 };
    setPacientes((prev) => prev.map((p) => p.id === selId ? pacienteActual : p));
    setEscribiendo(true);
    await sleep(700 + Math.random() * 500);
    const respuesta = generarRespuestaCasera(pacienteActual, texto);
    const esDelato = pacienteActual.isZombie && /(grrr|argh|CEREBROS|cereales|se me cae|carne|morder)/i.test(respuesta);
    let sospechaNueva = pacienteActual.sospecha;
    let textoFinal = respuesta;
    if (esDelato) {
      const inc = num(15, 25);
      sospechaNueva = Math.min(100, pacienteActual.sospecha + inc);
      textoFinal = `${respuesta} [SOSPECHA +${inc}%]`;
    }
    const historialFinal = [...historialActual, { role: "assistant", content: textoFinal }];
    setPacientes((prev) => prev.map((p) => p.id === selId ? { ...p, historial: historialFinal, sospecha: sospechaNueva } : p));
    setEscribiendo(false);
    addChat("patient", textoFinal);
  };
  const ejecutarEscaneoIndividual = async () => {
    const selId = seleccionadoRef.current;
    if (selId === null || escaneandoRef.current) return;
    const paciente = pacientesRef.current.find((p) => p.id === selId);
    if (!paciente || paciente.estado !== "pendiente") return;
    setEscaneando(true);
    setAlerta(false);
    setDebug([]);
    addDebug(`> Ejecutando [${paciente.nombre}].some(p => p.isZombie) // Array de 1 solo elemento`, "call");
    await sleep(500);
    addDebug(`[Iteraci\xF3n 0] Evaluando a ${paciente.nombre}...`, "eval");
    await sleep(600);
    const resultado = paciente.isZombie;
    addDebug(`   -> Callback retorn\xF3: ${resultado ? "TRUE" : "FALSE"} ${resultado ? "(\xA1Es un zombi!)" : "(Sano)"}`, resultado ? "true" : "false");
    await sleep(600);
    addDebug(`> .some() finalizado. Resultado: ${resultado}`, "result");
    await sleep(400);
    if (resultado) {
      setAlerta(true);
      setPacientes((prev) => prev.map((p) => p.id === selId ? { ...p, estado: "zombi" } : p));
      const nuevasVidas = vidasRef.current - 1;
      setVidas(nuevasVidas);
      addDebug(`\u2623 AMENAZA BIOL\xD3GICA DETECTADA \u2623`, "true");
      addChat("system", `> \xA1Alerta! ${paciente.nombre} era zombi. Has perdido una vida.`);
      if (nuevasVidas <= 0) {
        setGameOver(true);
        await guardarSesion("SISTEMA COMPROMETIDO", `${paciente.nombre} era zombi en escaneo individual`, 0);
      }
    } else {
      setPacientes((prev) => prev.map((p) => p.id === selId ? { ...p, estado: "sano", sospecha: 0 } : p));
      addDebug(`\u2705 Escaneo limpio. ${paciente.nombre} est\xE1 verificado.`, "result");
      addChat("system", `> \u2705 ${paciente.nombre} est\xE1 limpio. Ya no necesitas escanearlo.`);
    }
    setEscaneando(false);
  };
  const ejecutarEscaneoSome = async () => {
    if (escaneandoRef.current) return;
    setEscaneando(true);
    setAlerta(false);
    setDebug([]);
    addDebug(`> Inicializando pacientes.some(p => p.isZombie) en array de 4`, "call");
    await sleep(700);
    let zombieEncontrado = null;
    let evaluados = 0;
    for (let i = 0; i < pacientesRef.current.length; i++) {
      const p = pacientesRef.current[i];
      if (p.estado === "sano") {
        addDebug(`[Iteraci\xF3n ${i}] Saltado: ${p.nombre} ya verificado como sano`, "skip");
        await sleep(450);
        continue;
      }
      if (p.estado === "zombi") {
        addDebug(`[Iteraci\xF3n ${i}] Saltado: ${p.nombre} ya est\xE1 en cuarentena`, "skip");
        await sleep(450);
        continue;
      }
      evaluados++;
      addDebug(`[Iteraci\xF3n ${i}] Evaluando a ${p.nombre}...`, "eval");
      await sleep(600);
      const resultado = p.isZombie;
      addDebug(`   -> Callback retorn\xF3: ${resultado ? "TRUE" : "FALSE"} ${resultado ? "(\xA1Es un zombi!)" : "(Sano)"}`, resultado ? "true" : "false");
      await sleep(600);
      if (resultado) {
        zombieEncontrado = p;
        addDebug(`> \u26A1 SHORT-CIRCUIT ACTIVADO: .some() se detiene aqu\xED. Ignora los restantes.`, "short");
        await sleep(700);
        break;
      }
    }
    const hayZombie = !!zombieEncontrado;
    addDebug(`> .some() finalizado. Resultado final: ${hayZombie}`, "result");
    await sleep(400);
    if (hayZombie && zombieEncontrado) {
      setAlerta(true);
      setPacientes((prev) => prev.map((p) => p.id === zombieEncontrado.id ? { ...p, estado: "zombi" } : p));
      const nuevasVidas = vidasRef.current - 1;
      setVidas(nuevasVidas);
      addDebug(`\u2623 AMENAZA BIOL\xD3GICA DETECTADA \u2623`, "true");
      addChat("system", `> \xA1Alerta! ${zombieEncontrado.nombre} era un zombi. Has perdido una vida.`);
      if (nuevasVidas <= 0) {
        setGameOver(true);
        await guardarSesion("SISTEMA COMPROMETIDO", `${zombieEncontrado.nombre} detectado en escaneo global`, 0);
      } else {
        setRondaTerminada(true);
      }
    } else {
      addDebug(`\u2705 Escaneo limpio. Ning\xFAn paciente es zombi.`, "result");
      addChat("system", `> Escaneo completado. El array est\xE1 limpio. Siguiente ronda.`);
      setRondaTerminada(true);
      void evaluados;
    }
    setEscaneando(false);
  };
  const siguienteRonda = async () => {
    if (!gameOver) {
      await guardarSesion(rondaTerminada ? "RONDA COMPLETADA" : "RONDA", `Ronda ${ronda} completada`, vidasRef.current);
    }
    setRonda((r) => r + 1);
    initJuego(true);
  };
  const reiniciarJuego = () => {
    setRonda(1);
    setVidas(4);
    initJuego(false);
  };
  const seleccionado = pacientes.find((p) => p.id === seleccionadoId) || null;
  const individualDeshabilitado = !seleccionado || seleccionado.estado !== "pendiente" || escaneando || gameOver;
  return /* @__PURE__ */ jsxs("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)" }, className: "min-h-screen w-full overflow-x-clip bg-[var(--bg-dark)]", children: [
    /* @__PURE__ */ jsxs("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)" }, className: "sticky z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-glass)] bg-black/70 px-4 py-3 sm:px-7", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsx("div", { className: "text-[clamp(1.05rem,3vw,1.4rem)] font-bold leading-tight tracking-wide text-[#00f3ff] [text-shadow:0_0_10px_#00f3ff]", children: "\u{1F468}\u2695 DR. JUAN // INTERFAZ DE CONTENCI\xD3N SOME-19" }),
        /* @__PURE__ */ jsx("span", { className: "rounded-full border border-[#00ff66]/60 bg-[#00ff66]/10 px-2.5 py-1 text-[11px] font-bold tracking-widest text-[#00ff66]", children: "IA CASERA v2.0 - OFFLINE \u2705 SIN API" }),
        /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-white/15 px-2.5 py-1 text-[11px] tracking-widest text-white/70", children: [
          "RONDA ",
          ronda,
          " ",
          guardando ? "\u2022 GUARDANDO\u2026" : ""
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", "aria-label": `${vidas} vidas restantes`, children: [
        [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsx("span", { className: `text-2xl transition-all ${i >= vidas ? "scale-75 opacity-15 grayscale" : ""}`, style: { filter: i < vidas ? "drop-shadow(0 0 8px #ff003c)" : "none" }, children: "\u2764" }, i)),
        /* @__PURE__ */ jsxs("span", { className: "ml-1 text-sm font-bold text-white/80", children: [
          vidas,
          "/4"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxs("main", { className: "grid gap-4 p-3 sm:p-4 lg:grid-cols-[300px_minmax(0,1fr)_420px] lg:items-start", children: [
      /* @__PURE__ */ jsxs("section", { className: "panel", children: [
        /* @__PURE__ */ jsxs("h2", { className: "mb-3 flex items-center gap-2 border-b border-[var(--border-glass)] pb-2 text-base uppercase tracking-[2px] text-[#00f3ff]", children: [
          /* @__PURE__ */ jsx(Users, { size: 18 }),
          "Pacientes en Observaci\xF3n"
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2.5", children: pacientes.map((p, i) => /* @__PURE__ */ jsxs("button", { onClick: () => seleccionarPaciente(p), disabled: escaneando, className: `flex items-center gap-3 rounded-lg border p-3 text-left transition-all ${seleccionadoId === p.id ? "border-[#00f3ff] bg-[#00f3ff]/10 shadow-[0_0_15px_rgba(0,243,255,.2)]" : "border-white/5 bg-white/[.02] hover:border-[#00f3ff] hover:bg-[#00f3ff]/[.08]"}`, children: [
          /* @__PURE__ */ jsx("span", { className: "flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-glass)] bg-black text-xl", children: p.estado === "zombi" ? "\u{1F9DF}" : p.estado === "sano" ? "\u2705" : "\u{1F9D1}" }),
          /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxs("span", { className: "block truncate font-bold text-white", children: [
              "Paciente #",
              i + 1,
              " \xB7 ",
              p.nombre
            ] }),
            /* @__PURE__ */ jsx("span", { className: "block text-[13px] text-[#8b949e]", children: p.estado === "pendiente" ? "SIN ESCANEAR" : p.estado === "sano" ? "\u2705 SANO VERIFICADO" : "\u{1F9DF} ZOMBI EN CUARENTENA" }),
            /* @__PURE__ */ jsx("span", { className: "mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white/10", children: /* @__PURE__ */ jsx("span", { className: "block h-full rounded-full bg-[#ff003c] transition-all", style: { width: `${p.sospecha}%` } }) }),
            /* @__PURE__ */ jsxs("span", { className: "mt-1 block text-[11px] tracking-wide text-white/60", children: [
              "SOSPECHA ",
              p.sospecha,
              "%"
            ] })
          ] })
        ] }, p.id)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg border border-white/10 bg-black/40 p-3", children: [
          /* @__PURE__ */ jsxs("p", { className: "mb-2 flex items-center gap-2 text-[12px] font-bold tracking-widest text-[#00ff66]", children: [
            /* @__PURE__ */ jsx(Activity, { size: 14 }),
            "BIT\xC1CORA PERSISTENTE"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[13px] leading-snug text-white/70", children: registroEstado }),
          sessions.length > 0 && /* @__PURE__ */ jsx("ul", { className: "mt-2 space-y-1.5", children: sessions.map((s) => /* @__PURE__ */ jsxs("li", { className: "rounded border border-white/10 px-2 py-1.5 text-[12px] leading-snug text-white/75", children: [
            /* @__PURE__ */ jsx("span", { className: "font-bold text-white", children: s.value.resultado }),
            " \xB7 Ronda ",
            s.value.ronda,
            " \xB7 Vidas ",
            s.value.vidas,
            " \u2014 ",
            s.value.detalle
          ] }, s.id)) }),
          /* @__PURE__ */ jsx("p", { className: "mt-2 text-[11px] text-white/45", children: "La bit\xE1cora guarda el resultado de cada ronda. El juego en s\xED funciona sin conexi\xF3n." })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: `panel ${alerta ? "alert-mode" : ""}`, children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-3 border-b border-[var(--border-glass)] pb-2 text-base uppercase tracking-[2px] text-[#00f3ff]", children: "Interrogatorio Cl\xEDnico" }),
        /* @__PURE__ */ jsxs("div", { ref: chatRef, className: "flex min-h-[280px] flex-1 flex-col gap-2 overflow-y-auto rounded-lg border border-[#1a1a1a] bg-black/40 p-3 lg:max-h-[520px]", children: [
          chat.map((m) => /* @__PURE__ */ jsx("div", { className: `msg ${m.tipo}`, children: m.texto }, m.id)),
          escribiendo && /* @__PURE__ */ jsxs("div", { className: "msg patient", children: [
            "\u2026 escribiendo ",
            /* @__PURE__ */ jsx("span", { className: "blink", children: "\u258C" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex gap-2", children: [
          /* @__PURE__ */ jsx("input", { value: input, onChange: (e) => setInput(e.target.value), onKeyDown: (e) => {
            if (e.key === "Enter") enviarMensaje();
          }, disabled: !seleccionado || escaneando || gameOver, placeholder: seleccionado ? `Preg\xFAntale a ${seleccionado.nombre}\u2026` : "Selecciona un paciente para hablar\u2026", className: "min-w-0 flex-1 rounded-md border border-[var(--border-glass)] bg-black px-3 py-2.5 text-[var(--text-main)] outline-none focus:border-[#00f3ff] disabled:opacity-50", autoFocus: true }),
          /* @__PURE__ */ jsx("button", { onClick: enviarMensaje, disabled: !seleccionado || !input.trim() || escribiendo || escaneando || gameOver, className: "shrink-0 rounded-md bg-[#00f3ff] px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-black transition hover:shadow-[0_0_15px_#00f3ff] disabled:opacity-40", children: "Enviar" })
        ] }),
        /* @__PURE__ */ jsx("button", { onClick: ejecutarEscaneoIndividual, disabled: individualDeshabilitado, className: `pulse-green mt-3 w-full rounded-md border border-[#00ff66] bg-transparent px-3 py-4 text-[clamp(.95rem,2.5vw,1.1rem)] font-bold text-[#00ff66] transition hover:bg-[#00ff66] hover:text-black disabled:border-[#333] disabled:text-[#555] disabled:shadow-none ${seleccionado ? "" : ""}`, children: seleccionado ? `\u{1F50D} ESCANEAR SOLO A: ${seleccionado.nombre}${seleccionado.estado !== "pendiente" ? " \u2014 YA VERIFICADO" : ""}` : "\u{1F50D} SELECCIONA UN PACIENTE PARA ESCANEARLO SOLO A \xC9L" }),
        /* @__PURE__ */ jsx("button", { onClick: rondaTerminada ? siguienteRonda : ejecutarEscaneoSome, disabled: escaneando || gameOver, className: "mt-2 w-full rounded-md border border-[#00f3ff]/60 bg-[#00f3ff]/10 px-3 py-3 font-bold uppercase tracking-wider text-[#00f3ff] transition hover:bg-[#00f3ff] hover:text-black disabled:opacity-50", children: escaneando ? "EJECUTANDO .SOME()\u2026" : rondaTerminada ? "SIGUIENTE RONDA \u2192" : "INICIAR ESCANEO GLOBAL: pacientes.some()" }),
        /* @__PURE__ */ jsxs("p", { className: "mt-2 text-center text-[12px] leading-snug text-white/60", children: [
          "Global = revisa a todos hasta encontrar 1 zombi. Individual = revisa solo al seleccionado con ",
          /* @__PURE__ */ jsx("span", { className: "font-code text-[#00f3ff]", children: "[paciente].some()" })
        ] }),
        rondaTerminada && /* @__PURE__ */ jsx("p", { className: "mt-1 text-center text-[13px] font-bold text-[#00ff66]", children: "Ronda terminada. Pulsa SIGUIENTE RONDA para barajar 4 nombres nuevos." })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "panel !border-[#333] bg-[#050505]", children: [
        /* @__PURE__ */ jsxs("h2", { className: "mb-3 flex items-center gap-2 border-b border-[#333] pb-2 text-base uppercase tracking-[2px] text-[#00ff66]", children: [
          /* @__PURE__ */ jsx(Brain, { size: 18 }),
          "Depurador Cognitivo: .some()"
        ] }),
        /* @__PURE__ */ jsx("div", { ref: debugRef, className: "font-code min-h-[280px] flex-1 overflow-y-auto rounded-md bg-[#0d1117] p-3 text-[13px] leading-relaxed text-[#8b949e] lg:max-h-[560px]", children: debug.map((l) => /* @__PURE__ */ jsx("div", { className: `mb-1 ${l.kind === "call" ? "font-semibold text-[#00f3ff]" : l.kind === "eval" ? "text-[#e6edf3]" : l.kind === "true" ? "font-bold text-[#ff003c] [text-shadow:0_0_5px_#ff003c]" : l.kind === "false" ? "text-[#484f58]" : l.kind === "short" ? "inline-block rounded bg-[#ffcc00]/10 px-1.5 py-0.5 font-bold text-[#ffcc00]" : l.kind === "skip" ? "text-[#8b949e] italic" : "mt-2 border-t border-dashed border-[#333] pt-2 font-bold text-[#00ff66]"}`, children: l.texto }, l.id)) }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2 text-[11px] leading-snug text-white/60", children: [
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#00f3ff]", children: "\u25A0" }),
            " Llamada"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#ff003c]", children: "\u25A0" }),
            " TRUE = zombi"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#484f58]", children: "\u25A0" }),
            " FALSE = sano"
          ] }),
          /* @__PURE__ */ jsxs("span", { children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#ffcc00]", children: "\u25A0" }),
            " SHORT-CIRCUIT"
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-center gap-2 rounded-md border border-[#ff003c]/30 bg-[#ff003c]/5 px-3 py-2 text-[12px] text-white/70", children: [
          /* @__PURE__ */ jsx(ShieldAlert, { size: 16, className: "shrink-0 text-[#ff003c]" }),
          /* @__PURE__ */ jsx("span", { children: "Los pacientes verificados como sanos se saltan en el escaneo global." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mt-2 flex items-center gap-2 text-[12px] text-white/50", children: [
          /* @__PURE__ */ jsx(Radio, { size: 14, className: "text-[#00f3ff]" }),
          /* @__PURE__ */ jsx("span", { children: "IA casera local \xB7 sin red \xB7 sin claves" }),
          /* @__PURE__ */ jsx(ScanLine, { size: 14, className: "ml-auto text-[#00ff66]" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("footer", { className: "px-4 pb-6 text-center text-[12px] text-white/40", children: "PROTOCOLO Z v2 CORREGIDA \xB7 Nombres \xFAnicos por ronda \xB7 Avatares neutros hasta revelar \xB7 .some() paso a paso con short-circuit" }),
    gameOver && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 px-4 text-center backdrop-blur", children: [
      /* @__PURE__ */ jsx("h1", { className: "text-[clamp(2rem,8vw,4rem)] font-bold leading-tight text-[#ff003c] [text-shadow:0_0_30px_#ff003c]", children: "SISTEMA COMPROMETIDO" }),
      /* @__PURE__ */ jsx("p", { className: "mb-8 mt-3 text-lg text-[#888]", children: "La horda te ha superado, Doctor Juan." }),
      /* @__PURE__ */ jsxs("button", { onClick: reiniciarJuego, className: "flex items-center gap-2 rounded-md border border-[#00ff66] px-10 py-4 text-lg font-bold text-[#00ff66] transition hover:bg-[#00ff66] hover:text-black", children: [
        /* @__PURE__ */ jsx(RotateCcw, { size: 20 }),
        "REINICIAR PROTOCOLO"
      ] })
    ] })
  ] });
}
export {
  App as default
};
