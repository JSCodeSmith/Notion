/* Convertido automáticamente desde Apuntes/every/App.tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Heart, Shield, Search, ClipboardCheck, BookOpen, RotateCcw, Sparkles, Send, Eye, AlertTriangle, Trophy, GraduationCap, MessageCircle, RefreshCw } from "lucide-react";
const NOMBRES = ["Alex", "Maya", "Leo", "Nia", "Hugo", "Sara", "Iv\xE1n", "Luna", "Diego", "Zoe", "Valeria", "Carlos", "Elena", "Roberto"];
const PISTAS = [
  "No estudi\xF3 los temas de la semana 3 y se qued\xF3 en blanco en la pregunta 4.",
  "Se distrajo durante el examen y dej\xF3 dos preguntas sin responder.",
  "Confundi\xF3 las f\xF3rmulas y mezcl\xF3 dos temas distintos en el desarrollo.",
  "Lleg\xF3 tarde, se puso nervioso y no revis\xF3 sus respuestas.",
  "Memoriz\xF3 sin entender: al cambiar el enunciado, ya no supo aplicarlo."
];
function mezclar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function generarRonda() {
  const elegidos = mezclar(NOMBRES).slice(0, 6);
  const cantReprobados = Math.random() < 0.5 ? 1 : 2;
  const indicesReprobados = new Set(mezclar([0, 1, 2, 3, 4, 5]).slice(0, cantReprobados));
  return elegidos.map((nombre, i) => {
    const reprobo = indicesReprobados.has(i);
    return { nombre, aprobo: !reprobo, notaReal: reprobo ? 5 + Math.floor(Math.random() * 6) : 14 + Math.floor(Math.random() * 7), notaDicha: null, preguntas: 0, sospecha: reprobo ? 8 : 0, revelado: false, recuperado: false, pista: null };
  });
}
async function api(action, args) {
  const res = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.error) throw new Error(json?.error || `Error ${res.status}`);
  return json.data;
}
function App() {
  const [ronda, setRonda] = useState(1);
  const [alumnos, setAlumnos] = useState(() => generarRonda());
  const [vidas, setVidas] = useState(4);
  const [intentosFallidos, setIntentosFallidos] = useState(0);
  const [seleccionado, setSeleccionado] = useState(0);
  const [chat, setChat] = useState([
    { autor: "sistema", texto: "Eres el profesor. Interroga uno por uno. Los que aprobaron dicen su nota feliz y siempre la misma. Los que reprobaron mienten\u2026 y si insistes, se contradicen." },
    { autor: "sistema", texto: "Empieza por: \u201C\xBFcu\xE1nto sacaste?\u201D y mira la barra de sospecha." }
  ]);
  const [debug, setDebug] = useState([
    "> Depurador listo. EVERY a\xFAn no se ha ejecutado.",
    "\u{1F9E0} Recuerda: .every() revisa uno por uno y se detiene en el primer FALSE."
  ]);
  const [input, setInput] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [victoria, setVictoria] = useState(false);
  const [bitacora, setBitacora] = useState([]);
  const [bitacoraError, setBitacoraError] = useState(null);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const inputRef = useRef(null);
  const chatRef = useRef(null);
  const debugRef = useRef(null);
  const guardadoRef = useRef(false);
  const alumnoActual = alumnos[seleccionado] || alumnos[0];
  const reprobadoConocido = alumnoActual && alumnoActual.revelado && !alumnoActual.aprobo;
  async function reloadRecords() {
    try {
      const data = await api("records.list", { collection: "every-bitacora" });
      const lista = data?.records || [];
      setBitacora([...lista].reverse());
      setBitacoraError(null);
    } catch (e) {
      setBitacoraError("Bit\xE1cora sin conexi\xF3n: esta partida se guarda en cuanto el servicio responda.");
    }
  }
  useEffect(() => {
    reloadRecords();
  }, []);
  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
  }, [chat]);
  useEffect(() => {
    debugRef.current?.scrollTo({ top: debugRef.current.scrollHeight, behavior: "smooth" });
  }, [debug]);
  async function guardarBitacora(resultado, detalle, vidasFinal) {
    if (guardadoRef.current) return;
    guardadoRef.current = true;
    setGuardando(true);
    try {
      await api("records.create", { collection: "every-bitacora", value: { ronda, resultado, vidas: vidasFinal, detalle, fecha: (/* @__PURE__ */ new Date()).toLocaleString("es-ES") } });
      await reloadRecords();
    } catch (e) {
      setBitacoraError("No se pudo guardar esta ronda en la bit\xE1cora.");
    }
    setGuardando(false);
  }
  function pushChat(m) {
    setChat((prev) => [...prev, m]);
  }
  function pushDebug(lines) {
    setDebug((prev) => [...prev, ...lines]);
  }
  function ejecutarEveryIndividual(al) {
    const lines = [
      `> Ejecutando [${al.nombre}].every(a => a.aprobo) // array de 1`,
      `[Iteraci\xF3n 0] Evaluando a ${al.nombre}...`,
      `   -> Callback retorn\xF3: ${al.aprobo ? "TRUE" : "FALSE"} (${al.aprobo ? `Aprob\xF3 con ${al.notaReal}` : `Reprob\xF3 con ${String(al.notaReal).padStart(2, "0")}`})`
    ];
    if (al.aprobo) lines.push(`\u{1F9E0} Depurador: Con 1 elemento y 1 TRUE, el resultado es TRUE. ${al.nombre} s\xED aprob\xF3.`);
    else lines.push(`\u{1F9E0} Depurador: \xA1SHORT-CIRCUIT! Con 1 solo FALSE, .every() ya sabe que el resultado es FALSE.`);
    lines.push(`> .every() finalizado. Resultado: ${al.aprobo}`);
    pushDebug(lines);
    setAlumnos((prev) => prev.map((x) => x.nombre === al.nombre ? { ...x, revelado: true } : x));
    pushChat({ autor: "sistema", texto: al.aprobo ? `\u2705 Revisi\xF3n individual: ${al.nombre} APROB\xD3 con ${al.notaReal}.` : `\u274C Revisi\xF3n individual: ${al.nombre} REPROB\xD3 con ${String(al.notaReal).padStart(2, "0")}. Dale recuperaci\xF3n.` });
  }
  function revisarTodos() {
    if (gameOver || victoria) return;
    const lines = ["> Ejecutando alumnos.every(a => a.aprobo)"];
    let resultado = true;
    let revisados = [];
    let culpable = null;
    for (let i = 0; i < alumnos.length; i++) {
      const al = alumnos[i];
      lines.push(`[Iteraci\xF3n ${i}] Evaluando a ${al.nombre}...`);
      lines.push(`   -> Callback retorn\xF3: ${al.aprobo ? "TRUE" : "FALSE"} (${al.aprobo ? `Aprob\xF3 con ${al.notaReal}` : `Reprob\xF3 con ${String(al.notaReal).padStart(2, "0")}`})`);
      revisados.push(al.nombre);
      if (al.aprobo) {
        lines.push(`\u{1F9E0} Depurador: Como dio TRUE, .every() DEBE seguir, a\xFAn no puede asegurar que TODOS aprobaron.`);
      } else {
        resultado = false;
        culpable = al;
        const restantes = alumnos.length - i - 1;
        lines.push(`\u{1F9E0} Depurador: \xA1SHORT-CIRCUIT! Con 1 solo FALSE, .every() ya sabe que el resultado es FALSE. No revisa a los ${restantes} restantes. Ahorr\xF3 ${restantes} iteraciones.`);
        break;
      }
    }
    lines.push(`> .every() finalizado. Resultado: ${resultado}`);
    if (resultado) lines.push("\u{1F9E0} Depurador: Revis\xF3 los 6 y todos dieron TRUE, por eso el resultado es TRUE. \xA1Todos aprobaron!");
    else if (culpable) lines.push(`> \u274C NO PUEDES PASAR EL CURSO, ${culpable.nombre.toUpperCase()} REPROB\xD3. Dale recuperaci\xF3n.`);
    pushDebug(lines);
    setAlumnos((prev) => prev.map((x) => revisados.includes(x.nombre) ? { ...x, revelado: true } : x));
    setMensaje(resultado ? "\xA1Los 6 dieron TRUE! Ya puedes intentar pasar el curso." : culpable ? `Se detuvo en ${culpable.nombre}. El resto sigue SIN REVISAR.` : "");
  }
  async function intentarPasar() {
    if (gameOver || victoria) return;
    const todos = alumnos.every((a) => a.aprobo);
    if (todos) {
      pushDebug(["> Ejecutando alumnos.every(a => a.aprobo) para pasar el curso", "> .every() finalizado. Resultado: true", "\u{1F9E0} Depurador: Revis\xF3 los 6 y todos dieron TRUE, por eso el resultado es TRUE. \xA1Todos aprobaron!"]);
      setAlumnos((prev) => prev.map((x) => ({ ...x, revelado: true })));
      setVictoria(true);
      setMensaje("\xA1CURSO APROBADO!");
      await guardarBitacora("VICTORIA", "Todos aprobaron. El curso pasa de nivel.", vidas);
      return;
    }
    const culpable = alumnos.find((a) => !a.aprobo);
    const nuevasVidas = vidas - 1;
    const nuevosIntentos = intentosFallidos + 1;
    setVidas(nuevasVidas);
    setIntentosFallidos(nuevosIntentos);
    pushDebug([`> Ejecutando alumnos.every(a => a.aprobo)`, `> .every() finalizado. Resultado: false`, `> \u274C NO PUEDES PASAR EL CURSO, ${culpable?.nombre.toUpperCase()} REPROB\xD3. Dale recuperaci\xF3n.`]);
    pushChat({ autor: "sistema", texto: `\u274C No puedes pasar el curso: ${culpable?.nombre} reprob\xF3. Pierdes 1 vida. Te quedan ${nuevasVidas} corazones.` });
    setAlumnos((prev) => prev.map((x) => x.nombre === culpable?.nombre ? { ...x, revelado: true } : x));
    if (nuevasVidas <= 0 || nuevosIntentos >= 2) {
      setGameOver(true);
      setMensaje("GAME OVER");
      await guardarBitacora("DERROTA", `${culpable?.nombre} reprob\xF3 y se intent\xF3 pasar el curso.`, Math.max(0, nuevasVidas));
    } else {
      setMensaje(`No pas\xF3. Intentos fallidos: ${nuevosIntentos}/2 \xB7 Vidas: ${nuevasVidas}/4`);
    }
  }
  function darRecuperacion() {
    if (!reprobadoConocido || gameOver || victoria) return;
    const exito = Math.random() < 0.7;
    const pista = PISTAS[Math.floor(Math.random() * PISTAS.length)];
    if (exito) {
      const nuevaNota = 14 + Math.floor(Math.random() * 4);
      setAlumnos((prev) => prev.map((x) => x.nombre === alumnoActual.nombre ? { ...x, aprobo: true, notaReal: nuevaNota, recuperado: true, sospecha: 0, pista: null } : x));
      pushChat({ autor: "alumno", nombre: alumnoActual.nombre, texto: `\xA1Lo logr\xE9, profe! En la recuperaci\xF3n saqu\xE9 ${nuevaNota}. \xA1Ahora s\xED aprob\xE9!` });
      pushChat({ autor: "sistema", texto: `\u{1F4D6} Recuperaci\xF3n aprobada: ${alumnoActual.nombre} ahora tiene ${nuevaNota}. Su aprobo cambi\xF3 a TRUE.` });
      pushDebug([`> Recuperaci\xF3n de ${alumnoActual.nombre}: TRUE`, `\u{1F9E0} Depurador: Ahora ${alumnoActual.nombre}.aprobo = true. Vuelve a ejecutar .every() para comprobar.`]);
      setMensaje(`\xA1${alumnoActual.nombre} aprob\xF3 la recuperaci\xF3n!`);
    } else {
      setAlumnos((prev) => prev.map((x) => x.nombre === alumnoActual.nombre ? { ...x, pista } : x));
      pushChat({ autor: "alumno", nombre: alumnoActual.nombre, texto: "Profe, lo intent\xE9\u2026 pero no me alcanz\xF3. Estoy nervioso." });
      pushChat({ autor: "sistema", texto: `\u{1F4D6} Recuperaci\xF3n fallida. Pista: ${pista}` });
      pushDebug([`> Recuperaci\xF3n de ${alumnoActual.nombre}: FALSE`, `\u{1F9E0} Pista: ${pista}`]);
      setMensaje("La recuperaci\xF3n no alcanz\xF3. Lee la pista del depurador.");
    }
    inputRef.current?.focus();
  }
  function enviarPregunta() {
    const texto = input.trim();
    if (!texto || gameOver || victoria) return;
    const al = alumnoActual;
    pushChat({ autor: "profe", texto: `${texto}  \u2192  para ${al.nombre}` });
    setInput("");
    const lower = texto.toLowerCase();
    const esNota = /(nota|sacaste|cuanto|cuánto|calific|saque|saqué)/.test(lower);
    const esCopiar = /copi/.test(lower);
    const esEstudiar = /estudiar|estudio|estudiaste/.test(lower);
    const esExamen = /examen|prueba/.test(lower);
    const esAprobo = /aprob|pasaste|pasar/.test(lower);
    const esReprobo = /reprob/.test(lower);
    let respuesta = "";
    let contradiccion = false;
    let delta = 0;
    if (al.aprobo) {
      if (esNota) respuesta = `\xA1Saqu\xE9 ${al.notaReal}, profe! Estudi\xE9 toda la semana. \u{1F604}`;
      else if (esCopiar) respuesta = "\xA1Jam\xE1s, profe! Yo estudi\xE9 toda la semana, palabra.";
      else if (esEstudiar) respuesta = `S\xED, profe. Estudi\xE9 toda la semana y por eso saqu\xE9 ${al.notaReal}.`;
      else if (esExamen) respuesta = `El examen me fue bien, profe. Me sent\xED seguro y saqu\xE9 ${al.notaReal}.`;
      else if (esAprobo) respuesta = `\xA1S\xED! Aprob\xE9 con ${al.notaReal}, profe. Estoy feliz.`;
      else if (esReprobo) respuesta = `\xBFReprobar? No, profe. Yo aprob\xE9 con ${al.notaReal}.`;
      else respuesta = `Hola, profe. Yo estoy tranquilo: aprob\xE9 con ${al.notaReal} porque estudi\xE9 mucho.`;
    } else {
      const vez = al.preguntas;
      if (esNota) {
        if (vez === 0) respuesta = "Ehh... saqu\xE9... 20... creo. \xA1Lo juro, profe!";
        else if (vez === 1) {
          respuesta = "Saqu\xE9 15, profe, lo juro. Bueno... creo que 15.";
          contradiccion = true;
          delta = 25;
        } else {
          respuesta = "Ehh... 10... creo. Bueno, tal vez 10. No me acuerdo bien.";
          contradiccion = true;
          delta = 25;
        }
      } else if (esCopiar) {
        respuesta = "\xBFCopiar? Yo... nunca... ehh... \xBFpor qu\xE9 lo pregunta, profe?";
        delta = 10;
      } else if (esEstudiar) respuesta = "Ehh... s\xED... estudi\xE9... un poco... creo que s\xED estudi\xE9.";
      else if (esExamen) respuesta = "El examen... ehh... estuvo... f\xE1cil... creo. O dif\xEDcil. No s\xE9.";
      else if (esAprobo) respuesta = "\xA1Claro que aprob\xE9, profe! Saqu\xE9 20, lo juro. Bueno... creo.";
      else if (esReprobo) respuesta = "\xBFReprobar yo? Nooo, profe. Yo... ehh... aprob\xE9. Creo.";
      else respuesta = "Ehh... profe... \xBFme puede repetir la pregunta? Me puse nervioso.";
    }
    pushChat({ autor: "alumno", nombre: al.nombre, texto: respuesta, contradiccion });
    if (contradiccion) pushDebug([`\u26A0\uFE0F Contradicci\xF3n de ${al.nombre}: antes dijo 20, ahora dice otra nota.`, `\u{1F9E0} Sospecha +25%. Los que mienten cambian su versi\xF3n.`]);
    else if (delta > 0) pushDebug([`\u26A0\uFE0F ${al.nombre} se puso nervioso. Sospecha +${delta}%.`]);
    setAlumnos((prev) => prev.map((x) => x.nombre === al.nombre ? { ...x, preguntas: x.preguntas + 1, notaDicha: !x.aprobo && esNota ? x.preguntas === 0 ? 20 : x.preguntas === 1 ? 15 : 10 : x.notaDicha, sospecha: Math.min(100, x.sospecha + delta) } : x));
    inputRef.current?.focus();
  }
  function reintentar() {
    const nueva = generarRonda();
    guardadoRef.current = false;
    setAlumnos(nueva);
    setSeleccionado(0);
    setRonda((r) => r + 1);
    setVidas(4);
    setIntentosFallidos(0);
    setGameOver(false);
    setVictoria(false);
    setMensaje("");
    setChat([{ autor: "sistema", texto: "Nueva ronda. Nuevos alumnos, nuevas notas. Interroga con calma." }]);
    setDebug(["> Depurador listo. Nueva ronda.", "\u{1F9E0} Recuerda: .every() revisa uno por uno y se detiene en el primer FALSE."]);
    setTimeout(() => inputRef.current?.focus(), 50);
  }
  return /* @__PURE__ */ jsxs("div", { "data-safe-area-inset-root": true, style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)", minHeight: "100vh", background: "#030508", color: "#eaf6ff" }, className: "overflow-x-clip", children: [
    /* @__PURE__ */ jsx("header", { "data-safe-area-sticky-top": true, style: { top: "var(--safe-area-inset-top)" }, className: "sticky z-30 border-b border-[#1b2b4d] bg-[#030508]/95 backdrop-blur", children: /* @__PURE__ */ jsxs("div", { className: "max-w-[1480px] mx-auto px-3 sm:px-5 py-3 flex flex-wrap items-center gap-2 sm:gap-3", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsx("div", { className: "w-10 h-10 rounded-xl bg-[#00e5ff] text-black grid place-items-center font-bold text-xl shrink-0", children: "\u{1F4DA}" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxs("h1", { className: "text-lg sm:text-2xl font-bold leading-none tracking-wide truncate", children: [
            "PROFESOR ",
            /* @__PURE__ */ jsx("span", { className: "text-[#00e5ff]", children: "//" }),
            " COLEGIO EVERY-1"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-[11px] sm:text-xs text-[#93a7c8] tracking-[.18em]", children: "EVERY: \xBFTODOS PASARON EL EXAMEN?" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "ml-auto flex flex-wrap items-center gap-2", children: [
        /* @__PURE__ */ jsx("span", { className: "chip bg-[#071a24] text-[#00e5ff]", children: "IA CASERA V2.0 - OFFLINE \u2705 SIN API" }),
        /* @__PURE__ */ jsxs("span", { className: "chip bg-[#241a08] text-[#ffd60a]", children: [
          "RONDA ",
          ronda
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "chip bg-[#120814] text-white flex items-center gap-1", children: [
          [1, 2, 3, 4].map((i) => /* @__PURE__ */ jsx(Heart, { size: 14, className: i <= vidas ? "fill-[#ff3b4e] text-[#ff3b4e]" : "text-[#33415e]" }, i)),
          " ",
          vidas,
          "/4"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("main", { className: "max-w-[1480px] mx-auto px-3 sm:px-5 py-4 sm:py-5", children: [
      /* @__PURE__ */ jsxs("section", { className: "panel p-3 sm:p-4 mb-4 flex flex-col lg:flex-row lg:items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 flex-1 min-w-0", children: [
          /* @__PURE__ */ jsx(GraduationCap, { className: "text-[#ffd60a] shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h2", { className: "font-bold text-base sm:text-lg leading-tight", children: [
              "EVERY = COMPROBAR QUE ",
              /* @__PURE__ */ jsx("span", { className: "text-[#2dff8a]", children: "TODO" }),
              " SEA VERDADERO"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-sm text-[#c6d4ee] leading-snug", children: [
              "Si ",
              /* @__PURE__ */ jsx("span", { className: "font-code text-[#ff2d95]", children: "alumnos.every(a => a.aprobo)" }),
              " encuentra ",
              /* @__PURE__ */ jsx("b", { children: "UNO" }),
              " en FALSE, todo es FALSE. Por eso se detiene: ",
              /* @__PURE__ */ jsx("b", { children: "short-circuit" }),
              "."
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "font-code text-[11px] sm:text-xs bg-black/60 border border-[#1b2b4d] rounded-xl px-3 py-2 shrink-0", children: [
          "alumnos.every(a => a.aprobo)",
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-[#2dff8a]", children: "TRUE + TRUE + TRUE\u2026 = TRUE" }),
          /* @__PURE__ */ jsx("br", {}),
          /* @__PURE__ */ jsx("span", { className: "text-[#ff3b4e]", children: "TRUE + FALSE = FALSE \u270B" })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "grid gap-4 lg:grid-cols-[300px_1fr_420px] items-start", children: [
        /* @__PURE__ */ jsxs("section", { className: "flex flex-col gap-4 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "panel p-3 sm:p-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxs("h2", { className: "font-bold tracking-wide flex items-center gap-2", children: [
                /* @__PURE__ */ jsx("span", { className: "text-[#00e5ff]", children: "\u{1F9D1}\u200D\u{1F393}" }),
                " ALUMNOS DEL CURSO"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-[#93a7c8]", children: "6 / ronda" })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2", children: alumnos.map((a, i) => /* @__PURE__ */ jsxs("button", { onClick: () => {
              setSeleccionado(i);
              setMensaje(`Interrogando a ${a.nombre}. Preg\xFAntale: \xBFcu\xE1nto sacaste?`);
              inputRef.current?.focus();
            }, className: `btn text-left rounded-xl border p-2.5 flex items-center gap-3 ${i === seleccionado ? "border-[#00e5ff] bg-[#00e5ff]/10 shadow-[0_0_22px_rgba(0,229,255,.22)]" : "border-[#1b2b4d] bg-black/30"}`, children: [
              /* @__PURE__ */ jsx("span", { className: "text-2xl shrink-0", children: "\u{1F9D1}\u200D\u{1F393}" }),
              /* @__PURE__ */ jsxs("span", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 flex-wrap", children: [
                  /* @__PURE__ */ jsx("b", { className: "truncate", children: a.nombre }),
                  a.recuperado && /* @__PURE__ */ jsx("span", { className: "text-[10px] bg-[#2dff8a]/15 text-[#2dff8a] border border-[#2dff8a]/40 rounded-full px-1.5 py-0.5", children: "RECUPERADO" })
                ] }),
                /* @__PURE__ */ jsxs("span", { className: "block text-xs text-[#93a7c8]", children: [
                  "Nota: ",
                  /* @__PURE__ */ jsx("b", { className: "text-white font-code", children: a.revelado ? `${String(a.notaReal).padStart(2, "0")} / 20` : "?? / 20" }),
                  " ",
                  a.notaDicha !== null && !a.revelado && /* @__PURE__ */ jsxs("span", { className: "text-[#ffd60a]", children: [
                    "\xB7 dice ",
                    a.notaDicha
                  ] })
                ] }),
                /* @__PURE__ */ jsx("span", { className: "block mt-1 h-1.5 rounded-full bg-[#15203a] overflow-hidden", children: /* @__PURE__ */ jsx("span", { className: "block h-full rounded-full", style: { width: `${a.sospecha}%`, background: a.sospecha >= 50 ? "#ff3b4e" : a.sospecha >= 25 ? "#ffd60a" : "#00e5ff" } }) }),
                /* @__PURE__ */ jsxs("span", { className: "block text-[10px] text-[#93a7c8]", children: [
                  "Sospecha ",
                  a.sospecha,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsx("span", { className: `shrink-0 text-[11px] font-bold px-2 py-1 rounded-full border ${a.revelado ? a.aprobo ? "bg-[#2dff8a]/15 text-[#2dff8a] border-[#2dff8a]/40" : "bg-[#ff3b4e]/15 text-[#ff3b4e] border-[#ff3b4e]/40" : "bg-white/5 text-[#93a7c8] border-[#1b2b4d]"}`, children: a.revelado ? a.aprobo ? "\u2705 APROB\xD3" : "\u274C REPROB\xD3" : "SIN REVISAR" })
            ] }, a.nombre)) }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-[#93a7c8] mt-3", children: "Toca un alumno para interrogarlo. La barra sube cuando se contradice." }),
            alumnoActual.pista && /* @__PURE__ */ jsxs("div", { className: "mt-3 text-xs bg-[#ffd60a]/10 border border-[#ffd60a]/40 rounded-xl p-2.5 text-[#ffe88a]", children: [
              "\u{1F4D6} Pista de ",
              alumnoActual.nombre,
              ": ",
              alumnoActual.pista
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "panel p-3 sm:p-4", children: [
            /* @__PURE__ */ jsxs("h3", { className: "font-bold flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsx(BookOpen, { size: 17, className: "text-[#00e5ff]" }),
              " BIT\xC1CORA PERSISTENTE"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#93a7c8] mb-3", children: [
              "Rondas guardadas. ",
              guardando ? "Guardando\u2026" : ""
            ] }),
            bitacoraError && /* @__PURE__ */ jsx("p", { className: "text-xs text-[#ffd60a] mb-2", children: bitacoraError }),
            /* @__PURE__ */ jsxs("div", { className: "scroll-thin max-h-[220px] overflow-y-auto flex flex-col gap-2 pr-1", children: [
              bitacora.length === 0 && /* @__PURE__ */ jsx("p", { className: "text-sm text-[#93a7c8]", children: "A\xFAn no hay rondas guardadas. Termina una ronda para dejarla en la bit\xE1cora." }),
              bitacora.map((b) => /* @__PURE__ */ jsxs("div", { className: "border border-[#1b2b4d] rounded-xl p-2.5 bg-black/30", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex justify-between gap-2", children: [
                  /* @__PURE__ */ jsxs("b", { className: "text-sm", children: [
                    "Ronda ",
                    b.value.ronda
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: `text-[11px] font-bold px-2 py-0.5 rounded-full ${b.value.resultado === "VICTORIA" ? "bg-[#2dff8a]/15 text-[#2dff8a]" : "bg-[#ff3b4e]/15 text-[#ff3b4e]"}`, children: b.value.resultado })
                ] }),
                /* @__PURE__ */ jsx("p", { className: "text-xs text-[#c6d4ee] mt-1", children: b.value.detalle }),
                /* @__PURE__ */ jsxs("p", { className: "text-[11px] text-[#93a7c8] mt-1", children: [
                  "Vidas: ",
                  b.value.vidas,
                  "/4 \xB7 ",
                  b.value.fecha
                ] })
              ] }, b.id))
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-3 sm:p-4 min-w-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap mb-3", children: [
            /* @__PURE__ */ jsxs("h2", { className: "font-bold tracking-wide flex items-center gap-2", children: [
              /* @__PURE__ */ jsx(MessageCircle, { size: 19, className: "text-[#ff2d95]" }),
              " INTERROGATORIO DEL PROFESOR"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "text-xs text-[#93a7c8]", children: [
              "Intentos fallidos: ",
              /* @__PURE__ */ jsxs("b", { className: "text-white", children: [
                intentosFallidos,
                "/2"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "bg-[#06101f] border border-[#1b2b4d] rounded-xl px-3 py-2 flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xl", children: "\u{1F9D1}\u200D\u{1F3EB}" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Interrogando a ",
              /* @__PURE__ */ jsx("b", { className: "text-[#00e5ff]", children: alumnoActual.nombre })
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "ml-auto hidden sm:inline text-xs text-[#93a7c8]", children: [
              "Preguntas: ",
              alumnoActual.preguntas,
              " \xB7 Sospecha ",
              alumnoActual.sospecha,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { ref: chatRef, className: "scroll-thin h-[360px] sm:h-[400px] overflow-y-auto mt-3 flex flex-col gap-2 pr-1", children: chat.map((m, idx) => /* @__PURE__ */ jsxs("div", { className: `max-w-[88%] rounded-2xl px-3 py-2 text-[15px] leading-snug ${m.autor === "profe" ? "self-end bg-[#00e5ff] text-black font-semibold rounded-br-md" : m.autor === "alumno" ? "self-start bg-[#141f3a] border border-[#24385f] rounded-bl-md" : "self-center bg-[#ffd60a]/10 border border-[#ffd60a]/30 text-[#ffe88a] text-sm text-center"}`, children: [
            m.autor === "alumno" && /* @__PURE__ */ jsxs("div", { className: "text-[11px] font-bold tracking-wider text-[#00e5ff] mb-0.5", children: [
              "\u{1F9D1}\u200D\u{1F393} ",
              m.nombre
            ] }),
            /* @__PURE__ */ jsx("div", { children: m.texto }),
            m.contradiccion && /* @__PURE__ */ jsx("div", { className: "mt-1 inline-block text-[11px] font-bold bg-[#ff3b4e] text-white px-2 py-0.5 rounded-full", children: "[CONTRADICCI\xD3N +25%]" })
          ] }, idx)) }),
          /* @__PURE__ */ jsxs("form", { onSubmit: (e) => {
            e.preventDefault();
            enviarPregunta();
          }, className: "mt-3 flex gap-2", children: [
            /* @__PURE__ */ jsx("input", { ref: inputRef, value: input, onChange: (e) => setInput(e.target.value), placeholder: `Preg\xFAntale a ${alumnoActual.nombre}: \xBFcu\xE1nto sacaste?`, className: "flex-1 min-w-0 bg-black/60 border border-[#1b2b4d] rounded-xl px-3 py-3 text-[15px] placeholder:text-[#5d729c]" }),
            /* @__PURE__ */ jsxs("button", { type: "submit", className: "btn shrink-0 bg-[#00e5ff] text-black font-bold rounded-xl px-3 sm:px-4 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsx(Send, { size: 17 }),
              /* @__PURE__ */ jsx("span", { className: "hidden sm:inline", children: "PREGUNTAR" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-2 flex flex-wrap gap-1.5", children: ["\xBFcu\xE1nto sacaste?", "\xBFestudiaste?", "\xBFcopiaste en el examen?", "\xBFaprobaste?", "\xBFc\xF3mo te fue en el examen?"].map((p) => /* @__PURE__ */ jsx("button", { onClick: () => {
            setInput(p);
            setTimeout(() => inputRef.current?.focus(), 0);
          }, className: "btn text-xs border border-[#24385f] bg-white/5 rounded-full px-2.5 py-1.5 text-[#c6d4ee]", children: p }, p)) }),
          /* @__PURE__ */ jsxs("div", { className: "grid sm:grid-cols-2 gap-2 mt-4", children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => ejecutarEveryIndividual(alumnoActual), className: "btn bg-[#071a24] border border-[#00e5ff]/60 text-[#bff6ff] rounded-xl px-3 py-3 text-left", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 font-bold", children: [
                /* @__PURE__ */ jsx(Shield, { size: 17 }),
                " \u{1F6E1}\uFE0F REVISAR SOLO A: ",
                alumnoActual.nombre
              ] }),
              /* @__PURE__ */ jsx("span", { className: "block font-code text-[11px] mt-1 opacity-80", children: "[alumno].every(a => a.aprobo)" })
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: revisarTodos, className: "btn bg-[#120814] border border-[#ff2d95]/60 text-[#ffc4e2] rounded-xl px-3 py-3 text-left", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 font-bold", children: [
                /* @__PURE__ */ jsx(Search, { size: 17 }),
                " \u{1F50D} REVISAR A TODOS"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "block font-code text-[11px] mt-1 opacity-80", children: "alumnos.every(a => a.aprobo)" })
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: intentarPasar, className: "btn bg-[#ffd60a] text-black rounded-xl px-3 py-3 text-left sm:col-span-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 font-bold", children: [
                /* @__PURE__ */ jsx(ClipboardCheck, { size: 18 }),
                " \u{1F4CB} INTENTAR PASAR EL CURSO"
              ] }),
              /* @__PURE__ */ jsx("span", { className: "block text-xs mt-0.5 font-semibold opacity-80", children: "Chequeo final con .every(). Si hay un FALSE, pierdes 1 vida." })
            ] }),
            reprobadoConocido && /* @__PURE__ */ jsxs("button", { onClick: darRecuperacion, className: "btn bg-[#2dff8a] text-black rounded-xl px-3 py-3 text-left sm:col-span-2", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2 font-bold", children: [
                /* @__PURE__ */ jsx(BookOpen, { size: 18 }),
                " \u{1F4D6} DAR RECUPERACI\xD3N A ",
                alumnoActual.nombre.toUpperCase()
              ] }),
              /* @__PURE__ */ jsx("span", { className: "block text-xs mt-0.5 font-semibold opacity-80", children: "70% de probabilidad de que ahora s\xED apruebe. Si no, te da una pista." })
            ] })
          ] }),
          mensaje && /* @__PURE__ */ jsxs("div", { className: "mt-3 flex items-start gap-2 bg-[#071a24] border border-[#00e5ff]/40 rounded-xl px-3 py-2.5 text-sm", children: [
            /* @__PURE__ */ jsx(Eye, { size: 17, className: "shrink-0 mt-0.5 text-[#00e5ff]" }),
            /* @__PURE__ */ jsx("span", { children: mensaje })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 grid grid-cols-3 gap-2 text-center text-xs", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-[#1b2b4d] bg-black/30 p-2", children: [
              /* @__PURE__ */ jsx("b", { className: "block text-base text-[#00e5ff]", children: alumnos.filter((a) => a.revelado && a.aprobo).length }),
              "APROBADOS",
              /* @__PURE__ */ jsx("br", {}),
              "confirmados"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-[#1b2b4d] bg-black/30 p-2", children: [
              /* @__PURE__ */ jsx("b", { className: "block text-base text-[#ff3b4e]", children: alumnos.filter((a) => a.revelado && !a.aprobo).length }),
              "REPROBADOS",
              /* @__PURE__ */ jsx("br", {}),
              "detectados"
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-[#1b2b4d] bg-black/30 p-2", children: [
              /* @__PURE__ */ jsx("b", { className: "block text-base text-[#ffd60a]", children: alumnos.filter((a) => !a.revelado).length }),
              "SIN",
              /* @__PURE__ */ jsx("br", {}),
              "REVISAR"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel p-3 sm:p-4 min-w-0 lg:sticky lg:top-[92px]", children: [
          /* @__PURE__ */ jsxs("h2", { className: "font-bold tracking-wide flex items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-[#2dff8a]", children: "\u26A1" }),
            " DEPURADOR INTELIGENTE: .every()"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-[#93a7c8] mb-3", children: "Mira c\xF3mo .every() piensa, paso a paso." }),
          /* @__PURE__ */ jsx("div", { ref: debugRef, className: "scroll-thin h-[360px] sm:h-[430px] overflow-y-auto bg-black/70 border border-[#1b2b4d] rounded-xl p-3 font-code text-[12px] leading-relaxed whitespace-pre-wrap break-words", children: debug.map((l, i) => /* @__PURE__ */ jsx("div", { className: l.includes("FALSE") || l.includes("\u274C") ? "text-[#ff8a96]" : l.includes("TRUE") ? "text-[#8affc2]" : l.includes("SHORT") || l.includes("\u{1F9E0}") ? "text-[#ffe88a]" : "text-[#c6d4ee]", children: l }, i)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 bg-[#ffd60a]/10 border border-[#ffd60a]/40 rounded-xl p-3", children: [
            /* @__PURE__ */ jsx("p", { className: "font-bold text-[#ffd60a] text-sm", children: "LEYENDA FIJA" }),
            /* @__PURE__ */ jsx("p", { className: "text-sm leading-snug mt-0.5", children: "EVERY = \xBFTODOS son TRUE? Si UNO es FALSE, todo es FALSE." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 text-xs text-[#93a7c8] leading-relaxed", children: [
            "Palabras que detecta la IA casera: ",
            /* @__PURE__ */ jsx("span", { className: "font-code text-[#c6d4ee]", children: "nota \xB7 sacaste \xB7 examen \xB7 aprobo \xB7 reprobo \xB7 estudiar \xB7 copiar" }),
            /* @__PURE__ */ jsx("br", {}),
            "Enter para enviar \xB7 El foco vuelve solo al input."
          ] })
        ] })
      ] })
    ] }),
    gameOver && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto p-4 grid place-items-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[680px] bg-[#120409] border-2 border-[#ff3b4e] rounded-3xl p-4 sm:p-7 shadow-[0_0_60px_rgba(255,59,78,.35)] my-auto", children: [
      /* @__PURE__ */ jsxs("div", { className: "text-center", children: [
        /* @__PURE__ */ jsx("div", { className: "text-5xl sm:text-6xl font-black tracking-tight text-[#ff3b4e]", children: "GAME OVER" }),
        /* @__PURE__ */ jsx("p", { className: "text-[#ffb3bc] mt-1", children: "No verificaste que TODOS aprobaran." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mt-5 bg-[#fff8e6] text-[#1a1300] rounded-2xl p-4 sm:p-5", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 font-bold", children: [
          /* @__PURE__ */ jsx("span", { children: "\u{1F4C4}" }),
          " CARTA DEL DIRECTOR"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "mt-3 leading-relaxed", children: [
          "Estimado Profesor: Por no verificar que TODOS sus alumnos aprobaron y por intentar pasar el curso con un alumno reprobado, se le descontar\xE1 ",
          /* @__PURE__ */ jsx("b", { children: "S/ 250" }),
          " de su sueldo de este mes y se le quitar\xE1 su caf\xE9 gratis por una semana."
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-3 leading-relaxed", children: "Adem\xE1s, deber\xE1 quedarse una hora extra a revisar ex\xE1menes." }),
        /* @__PURE__ */ jsx("p", { className: "mt-4 font-bold", children: "Atte. El Director - Colegio Every-1" }),
        /* @__PURE__ */ jsx("p", { className: "text-xs text-[#6d5b00] mt-2", children: "Mensaje ficticio del juego. Ning\xFAn sueldo real fue descontado." })
      ] }),
      /* @__PURE__ */ jsxs("button", { onClick: reintentar, className: "btn w-full mt-4 bg-[#ff3b4e] text-white font-bold rounded-xl py-3.5 flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsx(RotateCcw, { size: 18 }),
        " REINTENTAR - RECUPERAR MI SUELDO"
      ] })
    ] }) }),
    victoria && /* @__PURE__ */ jsx("div", { className: "fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto p-4 grid place-items-center", children: /* @__PURE__ */ jsxs("div", { className: "w-full max-w-[620px] bg-[#03130c] border-2 border-[#2dff8a] rounded-3xl p-4 sm:p-7 text-center shadow-[0_0_60px_rgba(45,255,138,.3)] my-auto", children: [
      /* @__PURE__ */ jsx("div", { className: "text-5xl", children: "\u{1F389}" }),
      /* @__PURE__ */ jsx("h2", { className: "text-3xl sm:text-4xl font-black text-[#2dff8a] mt-2 leading-tight", children: "\xA1TODOS APROBARON!" }),
      /* @__PURE__ */ jsxs("p", { className: "mt-3 text-lg leading-snug", children: [
        "El curso pasa de nivel. El Director te felicita y te da bono de ",
        /* @__PURE__ */ jsx("b", { className: "text-[#ffd60a]", children: "S/ 100" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mt-4 font-code text-sm bg-black/60 border border-[#1b2b4d] rounded-xl p-3", children: "alumnos.every(a => a.aprobo) === true" }),
      /* @__PURE__ */ jsx("p", { className: "text-sm text-[#93a7c8] mt-3", children: "Los 6 alumnos dieron TRUE. Por eso .every() dio TRUE." }),
      /* @__PURE__ */ jsxs("button", { onClick: reintentar, className: "btn w-full mt-5 bg-[#2dff8a] text-black font-bold rounded-xl py-3.5 flex items-center justify-center gap-2", children: [
        /* @__PURE__ */ jsx(Trophy, { size: 18 }),
        " JUGAR OTRA RONDA"
      ] }),
      guardando && /* @__PURE__ */ jsxs("p", { className: "text-xs text-[#93a7c8] mt-2 flex items-center justify-center gap-1", children: [
        /* @__PURE__ */ jsx(RefreshCw, { size: 13, className: "animate-spin" }),
        " Guardando en la bit\xE1cora\u2026"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "sr-only", children: [
      "Si un alumno miente, preg\xFAntale varias veces cu\xE1nto sac\xF3 y observa la contradicci\xF3n. ",
      /* @__PURE__ */ jsx(AlertTriangle, {}),
      " ",
      /* @__PURE__ */ jsx(Sparkles, {})
    ] })
  ] });
}
export {
  App as default
};
