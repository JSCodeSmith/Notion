/* Convertido automáticamente desde Apuntes/findIndex  , findLast  findLastIndex indexOf   lastIndexOf/findLast .tsx. */
/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */
import { jsx, jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useRef, useState } from "react";
import { Clock3, ChevronLeft, ChevronRight, RotateCcw, Play, CheckCircle2, Camera, Search, Zap, Eye, ListOrdered, Target } from "lucide-react";
const CASOS = [
  { id: 1, titulo: "\xDAltimo en salir", pista: "\xBFQui\xE9n fue el \xDALTIMO en salir?", eventos: [
    { quien: "Ana", accion: "sale", sombrero: true, edad: 32, palomitas: false },
    { quien: "Luis", accion: "entra", sombrero: false, edad: 28, palomitas: false },
    { quien: "Ana", accion: "sale", sombrero: false, edad: 32, palomitas: true },
    { quien: "Pedro", accion: "entra", sombrero: true, edad: 41, palomitas: false },
    { quien: "Ana", accion: "sale", sombrero: true, edad: 32, palomitas: false }
  ], codigo: "eventos.findLast(e => e.accion === 'sale')", aceptadas: ["e.accion==='sale'", 'e.accion==="sale"', "e.accion==='sale'"], clave: "sale" },
  { id: 2, titulo: "\xDAltimo en entrar", pista: "\xBFQui\xE9n fue el \xDALTIMO en entrar?", eventos: [
    { quien: "Ana", accion: "sale", sombrero: true, edad: 32, palomitas: false },
    { quien: "Luis", accion: "entra", sombrero: false, edad: 28, palomitas: false },
    { quien: "Ana", accion: "sale", sombrero: false, edad: 32, palomitas: true },
    { quien: "Pedro", accion: "entra", sombrero: true, edad: 41, palomitas: false },
    { quien: "Ana", accion: "sale", sombrero: true, edad: 32, palomitas: false }
  ], codigo: "eventos.findLast(e => e.accion === 'entra')", aceptadas: ["e.accion==='entra'"], clave: "entra" },
  { id: 3, titulo: "TRAMPA \xB7 Sale + sombrero", pista: "\xBFQui\xE9n fue el \xDALTIMO en salir y llevaba sombrero?", eventos: [
    { quien: "Ana", accion: "sale", sombrero: true, edad: 32, palomitas: false },
    { quien: "Luis", accion: "entra", sombrero: false, edad: 28, palomitas: false },
    { quien: "Ana", accion: "sale", sombrero: false, edad: 32, palomitas: true },
    { quien: "Pedro", accion: "entra", sombrero: true, edad: 41, palomitas: false },
    { quien: "Ana", accion: "sale", sombrero: true, edad: 32, palomitas: false }
  ], codigo: "eventos.findLast(e => e.accion === 'sale' && e.sombrero)", aceptadas: ["e.accion==='sale'&&e.sombrero", "e.sombrero&&e.accion==='sale'", "e.accion==='sale'&&e.sombrero===true"], clave: "sale+sombrero" },
  { id: 4, titulo: "Nombre con 'A' y sale", pista: "\xBFQui\xE9n fue el \xDALTIMO cuyo nombre empieza por 'A' y sale?", eventos: [
    { quien: "Ana", accion: "entra", sombrero: false, edad: 32, palomitas: false },
    { quien: "Luis", accion: "sale", sombrero: true, edad: 28, palomitas: true },
    { quien: "Pedro", accion: "sale", sombrero: false, edad: 41, palomitas: false },
    { quien: "Andrea", accion: "sale", sombrero: true, edad: 29, palomitas: false },
    { quien: "Carlos", accion: "sale", sombrero: false, edad: 35, palomitas: true },
    { quien: "Ana", accion: "sale", sombrero: false, edad: 32, palomitas: false }
  ], codigo: "eventos.findLast(e => e.quien.startsWith('A') && e.accion === 'sale')", aceptadas: ["e.quien.startswith('a')&&e.accion==='sale'", "e.accion==='sale'&&e.quien.startswith('a')"], clave: "A+sale" },
  { id: 5, titulo: "Sin sombrero y sale", pista: "\xBFQui\xE9n fue el \xDALTIMO sin sombrero que sale?", eventos: [
    { quien: "Ana", accion: "sale", sombrero: true, edad: 32, palomitas: false },
    { quien: "Luis", accion: "entra", sombrero: false, edad: 28, palomitas: false },
    { quien: "Pedro", accion: "sale", sombrero: true, edad: 41, palomitas: true },
    { quien: "Andrea", accion: "sale", sombrero: false, edad: 29, palomitas: false },
    { quien: "Carlos", accion: "entra", sombrero: true, edad: 35, palomitas: false },
    { quien: "Ana", accion: "sale", sombrero: true, edad: 32, palomitas: true }
  ], codigo: "eventos.findLast(e => e.accion === 'sale' && !e.sombrero)", aceptadas: ["e.accion==='sale'&&!e.sombrero", "!e.sombrero&&e.accion==='sale'", "e.accion==='sale'&&e.sombrero===false"], clave: "sale+!sombrero" },
  { id: 6, titulo: "Edad > 30 y sale", pista: "\xBFQui\xE9n fue el \xDALTIMO con edad > 30 que sale?", eventos: [
    { quien: "Ana", accion: "sale", sombrero: false, edad: 32, palomitas: true },
    { quien: "Luis", accion: "sale", sombrero: true, edad: 24, palomitas: false },
    { quien: "Pedro", accion: "entra", sombrero: false, edad: 41, palomitas: false },
    { quien: "Andrea", accion: "sale", sombrero: true, edad: 29, palomitas: false },
    { quien: "Carlos", accion: "sale", sombrero: false, edad: 38, palomitas: false },
    { quien: "Ana", accion: "entra", sombrero: false, edad: 32, palomitas: false }
  ], codigo: "eventos.findLast(e => e.edad > 30 && e.accion === 'sale')", aceptadas: ["e.edad>30&&e.accion==='sale'", "e.accion==='sale'&&e.edad>30", "e.edad>=31&&e.accion==='sale'"], clave: "edad>30+sale" }
];
function cumple(caso, e) {
  if (caso.id === 1) return e.accion === "sale";
  if (caso.id === 2) return e.accion === "entra";
  if (caso.id === 3) return e.accion === "sale" && e.sombrero;
  if (caso.id === 4) return e.quien.startsWith("A") && e.accion === "sale";
  if (caso.id === 5) return e.accion === "sale" && !e.sombrero;
  return e.edad > 30 && e.accion === "sale";
}
function normaliza(s) {
  return s.toLowerCase().replace(/\s+/g, "").replace(/"/g, "'").replace(/;$/, "").replace(/^\((e|ev|evento)\)=>/, "e=>").replace(/^e=>/, "").replace(/^return/, "").replace(/^\(e\)=>/, "e=>").replace(/^\(e\)/, "e");
}
function objStr(e) {
  return `{ quien: '${e.quien}', accion: '${e.accion}', sombrero: ${e.sombrero}, edad: ${e.edad} }`;
}
async function api(action, args) {
  const r = await fetch("actions", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ action, args }) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || j.error) throw new Error(j.error || `Error ${r.status}`);
  return j.data;
}
function App() {
  const [casoIdx, setCasoIdx] = useState(0);
  const caso = CASOS[casoIdx];
  const [seleccion, setSeleccion] = useState(2);
  const [condicion, setCondicion] = useState("");
  const [puntos, setPuntos] = useState(0);
  const [racha, setRacha] = useState(0);
  const [sinPrimer, setSinPrimer] = useState(0);
  const [insignia, setInsignia] = useState(false);
  const [revelado, setRevelado] = useState(false);
  const [resultado, setResultado] = useState(null);
  const [tipoResultado, setTipoResultado] = useState(null);
  const [debug, setDebug] = useState(["> Consola lista. Elige un testigo y pulsa CONFIRMAR \xDALTIMO."]);
  const [bitacora, setBitacora] = useState(["Sesi\xF3n iniciada. Revisa la cinta sin quedarte con el primer match."]);
  const [rebobinando, setRebobinando] = useState(false);
  const [guardado, setGuardado] = useState("Guardado local en esta sesi\xF3n");
  const [recordId, setRecordId] = useState(null);
  const [arrastrando, setArrastrando] = useState(false);
  const [hora, setHora] = useState(/* @__PURE__ */ new Date());
  const trackRef = useRef(null);
  const timers = useRef([]);
  const matches = useMemo(() => caso.eventos.map((e, i) => cumple(caso, e) ? i : -1).filter((i) => i >= 0), [caso]);
  const correcto = matches[matches.length - 1];
  const primero = matches[0];
  const progreso = `${casoIdx + 1} / ${CASOS.length}`;
  useEffect(() => {
    const t = setInterval(() => setHora(/* @__PURE__ */ new Date()), 1e3);
    return () => clearInterval(t);
  }, []);
  useEffect(() => () => {
    timers.current.forEach(clearTimeout);
  }, []);
  async function cargar() {
    try {
      const data = await api("records.list", { collection: "findlast-progreso" });
      const rec = data?.records?.[0];
      if (rec) {
        setRecordId(rec.id);
        const v = rec.value || {};
        if (typeof v.puntos === "number") setPuntos(v.puntos);
        if (typeof v.racha === "number") setRacha(v.racha);
        if (typeof v.sinPrimer === "number") setSinPrimer(v.sinPrimer);
        if (v.insignia) setInsignia(true);
        setGuardado("Progreso recuperado");
      }
    } catch {
      setGuardado("Sin conexi\xF3n con el guardado; el juego sigue en esta sesi\xF3n");
    }
  }
  useEffect(() => {
    cargar();
  }, []);
  async function guardar(p, r, s, b) {
    try {
      const value = { puntos: p, racha: r, sinPrimer: s, insignia: b, actualizado: (/* @__PURE__ */ new Date()).toISOString() };
      if (recordId) await api("records.replace", { collection: "findlast-progreso", id: recordId, value });
      else {
        const created = await api("records.create", { collection: "findlast-progreso", value });
        if (created?.id) setRecordId(created.id);
      }
      setGuardado("Progreso guardado");
    } catch {
      setGuardado("No se pudo guardar; sigue jugando");
    }
  }
  function limpiarTimers() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }
  function cambiarCaso(i) {
    limpiarTimers();
    setCasoIdx(i);
    setSeleccion(0);
    setRevelado(false);
    setResultado(null);
    setTipoResultado(null);
    setCondicion("");
    setDebug([`> Caso #${i + 1} cargado. Recorre la cinta de atr\xE1s hacia adelante.`]);
    setBitacora((b) => [...b, `Caso #${i + 1}: ${CASOS[i].titulo}`]);
  }
  function moverDesdeEvento(e, idx) {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const nuevo = Math.round(ratio * (caso.eventos.length - 1));
    setSeleccion(arrastrando ? nuevo : idx);
  }
  function rebobinar() {
    if (rebobinando) return;
    limpiarTimers();
    setRebobinando(true);
    setRevelado(false);
    setResultado(null);
    const pasos = [];
    for (let i = caso.eventos.length - 1; i >= 0; i--) {
      const idx = caso.eventos.length - 1 - i;
      timers.current.push(window.setTimeout(() => {
        setSeleccion(i);
        pasos.push(`[Rebobinar] [${i}] ${caso.eventos[i].quien} \u2014 ${caso.eventos[i].accion}`);
        setDebug((d) => [...d.slice(-8), `[Rebobinar] [${i}] ${caso.eventos[i].quien} \u2014 ${caso.eventos[i].accion}`]);
        if (i === 0) {
          setRebobinando(false);
          setDebug((d) => [...d, "\u2713 Rebobinado completo. Ahora busca desde el final."]);
        }
      }, idx * 600));
    }
  }
  async function confirmar() {
    if (revelado) return;
    const ev = caso.eventos[seleccion];
    const esCorrecto = seleccion === correcto;
    const esPrimero = seleccion === primero && !esCorrecto;
    const noCumple = !cumple(caso, ev);
    const condOk = condicion.trim() ? CASOS[casoIdx].aceptadas.some((a) => normaliza(a) === normaliza(condicion)) : false;
    let nuevosPuntos = puntos;
    let nuevaRacha = racha;
    let nuevoSin = sinPrimer;
    let nuevaInsignia = insignia;
    let bonus = 0;
    let mensaje = "";
    let tipo = "ok";
    if (esCorrecto) {
      nuevosPuntos += 10;
      nuevaRacha += 1;
      if (condOk) nuevosPuntos += 5;
      mensaje = `\u2705 \xA1Correcto! No es el \xEDndice, es el OBJETO: ${objStr(ev)}`;
    } else if (esPrimero) {
      nuevosPuntos -= 5;
      nuevaRacha = 0;
      nuevoSin = 0;
      tipo = "primer";
      mensaje = caso.id === 3 ? `\u274C Ana sali\xF3 con sombrero en [0] y en [4], pero findLast devuelve el \xDALTIMO. La respuesta era el \xEDndice 4.` : `\u274C Ese es el PRIMERO que cumple, no el \xDALTIMO. Est\xE1s confundiendo find con findLast.`;
    } else if (noCumple) {
      nuevosPuntos -= 3;
      nuevaRacha = 0;
      tipo = "no";
      mensaje = `\u274C Ese evento no cumple la condici\xF3n. Revisa la pista y rebobina desde el final.`;
    } else {
      nuevosPuntos -= 3;
      nuevaRacha = 0;
      tipo = "no";
      mensaje = `\u274C Cumple la condici\xF3n, pero no es el \xDALTIMO. Sigue buscando hacia el final.`;
    }
    if (!esPrimero) {
      nuevoSin += 1;
      if (nuevoSin >= 3 && !nuevaInsignia) {
        nuevaInsignia = true;
        bonus = 15;
        nuevosPuntos += 15;
        nuevoSin = 0;
      }
    }
    if (condOk && esCorrecto) mensaje += ` +5 por la condici\xF3n.`;
    if (bonus) mensaje += ` \u{1F9E0} Bonus \u201Cmemoria de pez\u201D +15.`;
    setPuntos(nuevosPuntos);
    setRacha(nuevaRacha);
    setSinPrimer(nuevoSin);
    setInsignia(nuevaInsignia);
    setRevelado(true);
    setResultado(mensaje);
    setTipoResultado(tipo);
    setBitacora((b) => [...b, `Caso #${caso.id} \xB7 Elegido [${seleccion}] ${ev.quien} \u2192 ${esCorrecto ? "\u2705 +10" : "\u274C"}${condOk && esCorrecto ? " +5" : ""}${bonus ? " +15 bonus" : ""}`].slice(-8));
    const lineas = [
      `> Ejecutando ${caso.codigo}`,
      `[Iteraci\xF3n desde el final] [${correcto}] ${caso.eventos[correcto].quien} - ${caso.eventos[correcto].accion} \u2192 \u2705 \xA1ENCONTRADO! Se detiene aqu\xED.`,
      `\u{1F9E0} Depurador: findLast recorre de ATR\xC1S hacia ADELANTE. No revis\xF3 ${caso.eventos.map((_, i) => `[${i}]`).filter((_, i) => i > correcto).join(",") || "ninguno posterior"} porque ya encontr\xF3 el \xFAltimo.`,
      `> Resultado: ${objStr(caso.eventos[correcto])} \u2190 Es el OBJETO, no el \xEDndice ${correcto}. Si quisieras el \xEDndice usar\xEDas findLastIndex.`,
      `\u2696\uFE0F vs find: find dar\xEDa el de [${primero}] (el primero). findLast da el de [${correcto}] (el \xFAltimo).`
    ];
    setDebug(["> Ejecutando\u2026"]);
    lineas.forEach((l, i) => {
      timers.current.push(window.setTimeout(() => setDebug((d) => [...d, l]), 350 * (i + 1)));
    });
    await guardar(nuevosPuntos, nuevaRacha, nuevoSin, nuevaInsignia);
  }
  function reiniciar() {
    limpiarTimers();
    setPuntos(0);
    setRacha(0);
    setSinPrimer(0);
    setInsignia(false);
    setRecordId(null);
    cambiarCaso(0);
    setGuardado("Marcador reiniciado en esta sesi\xF3n");
    setBitacora(["Sesi\xF3n reiniciada."]);
  }
  return /* @__PURE__ */ jsxs("div", { "data-safe-area-inset-root": true, className: "min-h-screen overflow-x-clip bg-[#030508] text-[#e8f6ff]", style: { boxSizing: "border-box", paddingTop: "var(--safe-area-inset-top)" }, children: [
    /* @__PURE__ */ jsx("div", { className: "scanlines" }),
    /* @__PURE__ */ jsx("div", { className: "vignette" }),
    /* @__PURE__ */ jsxs("div", { className: "relative z-10 mx-auto max-w-[1500px] px-3 pb-8 sm:px-5", children: [
      /* @__PURE__ */ jsxs("header", { "data-safe-area-sticky-top": true, className: "sticky z-30 -mx-1 mb-4 flex flex-wrap items-center gap-2 border-b border-[#1e2a3d] bg-[#030508]/95 px-2 py-3 backdrop-blur sm:mx-0 sm:px-3", style: { top: "var(--safe-area-inset-top)" }, children: [
        /* @__PURE__ */ jsxs("div", { className: "mr-auto flex items-center gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "grid h-9 w-9 place-items-center rounded-full bg-[#ff3b57]/15 text-xl", children: "\u{1F575}" }),
          /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("h1", { className: "text-base font-bold leading-none tracking-wide sm:text-xl", children: [
              "CINTA DE SEGURIDAD ",
              /* @__PURE__ */ jsxs("span", { className: "text-[#38e8ff]", children: [
                "\u2014 CASO #",
                caso.id
              ] })
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] uppercase tracking-[.18em] text-[#8da6bd]", children: "FindLast \xB7 La cinta de seguridad" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 rounded-full border border-red-500/50 bg-red-500/10 px-2 py-1 text-xs font-bold", children: [
          /* @__PURE__ */ jsx("span", { className: "rec-dot h-2 w-2 rounded-full bg-[#ff3b57]" }),
          "REC \u25CF"
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "hidden items-center gap-1 rounded-full border border-[#1e2a3d] px-2 py-1 text-xs sm:flex", children: [
          /* @__PURE__ */ jsx(Clock3, { size: 13 }),
          " ",
          hora.toLocaleTimeString("es-ES")
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "rounded-full bg-[#38e8ff] px-3 py-1 text-xs font-bold text-black", children: [
          "PUNTOS: ",
          puntos
        ] }),
        /* @__PURE__ */ jsxs("span", { className: "rounded-full border border-[#ffe066] px-3 py-1 text-xs font-bold text-[#ffe066]", children: [
          "RACHA: ",
          racha
        ] }),
        insignia && /* @__PURE__ */ jsx("span", { className: "rounded-full border border-[#45ff8f] bg-[#45ff8f]/10 px-3 py-1 text-xs font-bold text-[#45ff8f]", children: "\u{1F9E0} MEMORIA DE PEZ" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4 grid gap-3 rounded-xl border border-[#38e8ff]/30 bg-[#071018] p-3 sm:grid-cols-3", children: [
        /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
          /* @__PURE__ */ jsx("b", { className: "text-[#38e8ff]", children: "findLast" }),
          " = ",
          /* @__PURE__ */ jsx("b", { children: "\xDALTIMO" }),
          " que cumple. Devuelve el ",
          /* @__PURE__ */ jsx("b", { children: "elemento" }),
          "."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
          /* @__PURE__ */ jsx("b", { children: "CONDICI\xD3N" }),
          ", no igualdad. La pista es \u201Csale\u201D, no \u201Ces Ana\u201D."
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm", children: [
          /* @__PURE__ */ jsx("b", { children: "Recorre de ATR\xC1S hacia ADELANTE." }),
          " Ana sale en 0, 2 y 4; solo cuenta la \xFAltima."
        ] })
      ] }),
      /* @__PURE__ */ jsxs("main", { className: "grid items-start gap-4 lg:grid-cols-[300px_1fr_420px]", children: [
        /* @__PURE__ */ jsxs("section", { className: "panel order-2 p-4 lg:order-1", children: [
          /* @__PURE__ */ jsxs("h2", { className: "mb-3 flex items-center gap-2 text-lg font-bold", children: [
            "\u{1F4C2} CASOS ",
            /* @__PURE__ */ jsx("span", { className: "ml-auto text-xs text-[#8da6bd]", children: progreso })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "space-y-2", children: CASOS.map((c, i) => /* @__PURE__ */ jsxs("button", { onClick: () => cambiarCaso(i), className: `w-full rounded-lg border p-3 text-left transition ${i === casoIdx ? "border-[#38e8ff] bg-[#38e8ff]/10" : "border-[#1e2a3d] hover:border-[#38e8ff]/50"}`, children: [
            /* @__PURE__ */ jsxs("span", { className: "flex justify-between text-sm font-bold", children: [
              /* @__PURE__ */ jsxs("span", { children: [
                "Caso ",
                c.id
              ] }),
              /* @__PURE__ */ jsx("span", { className: "text-[#38e8ff]", children: i === casoIdx ? "\u25B6 EN PANTALLA" : "" })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "mt-1 block text-sm text-[#c7d7e5]", children: c.titulo }),
            /* @__PURE__ */ jsx("span", { className: "font-code mt-1 block break-words text-[11px] text-[#8da6bd]", children: c.codigo })
          ] }, c.id)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 space-y-2 border-t border-[#1e2a3d] pt-3 text-sm", children: [
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("b", { className: "text-[#45ff8f]", children: "findLast" }),
              " = \xFAltimo que cumple"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("b", { className: "text-[#ffe066]", children: "find" }),
              " = primero"
            ] }),
            /* @__PURE__ */ jsxs("p", { children: [
              /* @__PURE__ */ jsx("b", { className: "text-[#ff4fd8]", children: "findLastIndex" }),
              " = \xEDndice del \xFAltimo"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-[#8da6bd]", children: "No se\xF1ales un \xEDndice: se\xF1ala al testigo, el objeto completo." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 border-t border-[#1e2a3d] pt-3", children: [
            /* @__PURE__ */ jsx("h3", { className: "mb-2 text-sm font-bold tracking-widest text-[#8da6bd]", children: "BIT\xC1CORA" }),
            /* @__PURE__ */ jsx("ul", { className: "font-code space-y-1 text-[11px] text-[#a9c2d6]", children: bitacora.map((b, i) => /* @__PURE__ */ jsxs("li", { children: [
              "\u2022 ",
              b
            ] }, i)) }),
            /* @__PURE__ */ jsxs("button", { onClick: reiniciar, className: "mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#ff3b57]/50 py-2 text-sm font-bold text-[#ff8fa0]", children: [
              /* @__PURE__ */ jsx(RotateCcw, { size: 15 }),
              " REINICIAR PARTIDA"
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-[11px] text-[#8da6bd]", children: guardado })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("section", { className: "panel order-1 p-3 sm:p-5 lg:order-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "mb-3 flex flex-wrap items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-2 text-xl font-bold", children: [
              /* @__PURE__ */ jsx(Camera, { size: 20, className: "text-[#38e8ff]" }),
              " CINTA DE SEGURIDAD"
            ] }),
            /* @__PURE__ */ jsxs("span", { className: "font-code text-xs text-[#8da6bd]", children: [
              "CAM 01 \xB7 ",
              hora.toLocaleTimeString("es-ES")
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "rounded-xl border border-[#ffe066]/25 bg-[#15100a] p-4", children: [
            /* @__PURE__ */ jsxs("p", { className: "text-[11px] font-bold uppercase tracking-[.2em] text-[#ffe066]", children: [
              "Pista del caso #",
              caso.id
            ] }),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-2xl font-bold leading-tight sm:text-3xl", children: caso.pista }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm text-[#c7d7e5]", children: [
              "Arrastra el marcador o toca un evento. Luego rebobina y confirma el ",
              /* @__PURE__ */ jsx("b", { children: "\xFAltimo" }),
              " que cumple."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-2 flex justify-between text-[11px] font-bold text-[#8da6bd]", children: [
              /* @__PURE__ */ jsx("span", { children: "\u25C0 INICIO" }),
              /* @__PURE__ */ jsxs("span", { className: "text-[#38e8ff]", children: [
                "MARCADOR EN [",
                seleccion,
                "]"
              ] }),
              /* @__PURE__ */ jsx("span", { children: "FINAL \u25B6" })
            ] }),
            /* @__PURE__ */ jsxs(
              "div",
              {
                ref: trackRef,
                className: "relative h-12 touch-none select-none rounded-full border border-[#2d3d57] bg-[#0a111e] px-2",
                onPointerDown: (e) => {
                  setArrastrando(true);
                  e.target.setPointerCapture?.(e.pointerId);
                  moverDesdeEvento(e, seleccion);
                },
                onPointerMove: (e) => {
                  if (arrastrando) moverDesdeEvento(e, seleccion);
                },
                onPointerUp: () => setArrastrando(false),
                onPointerCancel: () => setArrastrando(false),
                children: [
                  /* @__PURE__ */ jsx("div", { className: "absolute left-2 right-2 top-1/2 h-1 -translate-y-1/2 rounded bg-[#25334a]" }),
                  /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2", style: { left: `calc(${seleccion / (caso.eventos.length - 1) * 100}% )` }, children: /* @__PURE__ */ jsxs("div", { className: "flex -translate-y-1 items-center whitespace-nowrap rounded-md border-2 border-[#38e8ff] bg-[#07131f] px-2 py-1 text-xs font-bold shadow-[0_0_20px_#38e8ff66]", children: [
                    /* @__PURE__ */ jsx("span", { className: "mr-1 text-[#38e8ff]", children: "\u25B6" }),
                    "[____] MARCADOR"
                  ] }) }),
                  caso.eventos.map((_, i) => /* @__PURE__ */ jsx("button", { "aria-label": `Ir a evento ${i}`, className: "absolute top-1/2 z-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8da6bd]", style: { left: `${i / (caso.eventos.length - 1) * 100}%` } }, i))
                ]
              }
            ),
            /* @__PURE__ */ jsx("p", { className: "mt-2 text-center text-xs text-[#8da6bd]", children: "Arrastra el marcador o haz clic en un evento. El marcador salta al evento m\xE1s cercano." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: `mt-4 grid gap-2 sm:grid-cols-2 ${caso.eventos.length === 6 ? "lg:grid-cols-3" : "lg:grid-cols-5"} ${tipoResultado === "primer" || tipoResultado === "no" ? "shake" : ""}`, children: caso.eventos.map((e, i) => {
            const elegido = i === seleccion;
            const ok = revelado && i === correcto;
            const mal = revelado && i === seleccion && seleccion !== correcto;
            return /* @__PURE__ */ jsxs("button", { onClick: () => {
              setSeleccion(i);
              setRevelado(false);
              setResultado(null);
            }, className: `event-card relative min-w-0 rounded-xl border p-3 text-left ${ok ? "glow-green border-[#45ff8f] bg-[#072314]" : mal ? "border-[#ff3b57] bg-[#280a10]" : elegido ? "border-[#38e8ff] bg-[#0b2435] shadow-[0_0_24px_#38e8ff33]" : "border-[#1e2a3d] bg-[#0a111e]"}`, children: [
              /* @__PURE__ */ jsxs("span", { className: "font-code text-xs text-[#8da6bd]", children: [
                "[",
                i,
                "]"
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "mt-2 block truncate text-lg font-bold", children: [
                "\u{1F464} ",
                e.quien
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "mt-1 block text-base", children: [
                "\u{1F6AA} ",
                e.accion
              ] }),
              /* @__PURE__ */ jsx("span", { className: "mt-1 block min-h-6 text-base", children: e.sombrero ? "\u{1F3A9} sombrero" : "" }),
              /* @__PURE__ */ jsxs("span", { className: "mt-1 block text-xs text-[#a9c2d6]", children: [
                "Edad: ",
                e.edad
              ] }),
              /* @__PURE__ */ jsx("span", { className: "mt-1 block text-sm", children: e.palomitas ? "\u{1F37F} palomitas" : "" }),
              revelado && cumple(caso, e) && /* @__PURE__ */ jsx("span", { className: "absolute right-2 top-2 rounded bg-[#45ff8f]/15 px-1 text-[10px] font-bold text-[#45ff8f]", children: "CUMPLE" }),
              ok && /* @__PURE__ */ jsx("span", { className: "mt-2 block text-xs font-bold text-[#45ff8f]", children: "\u2705 \xDALTIMO \xB7 OBJETO" })
            ] }, i);
          }) }),
          revelado && resultado && /* @__PURE__ */ jsxs("div", { className: `mt-4 rounded-lg border p-3 text-sm font-bold ${tipoResultado === "ok" ? "border-[#45ff8f] bg-[#072314] text-[#b8ffd6]" : "border-[#ff3b57] bg-[#280a10] text-[#ffb3c0]"}`, children: [
            resultado,
            /* @__PURE__ */ jsxs("p", { className: "font-code mt-2 break-words text-xs font-normal opacity-90", children: [
              caso.codigo,
              " ",
              "// \u2192 ",
              objStr(caso.eventos[correcto])
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid gap-2 sm:grid-cols-3", children: [
            /* @__PURE__ */ jsxs("button", { onClick: rebobinar, disabled: rebobinando, className: "flex items-center justify-center gap-2 rounded-lg bg-[#ffe066] px-3 py-3 font-bold text-black", children: [
              /* @__PURE__ */ jsx(Play, { size: 16 }),
              " ",
              rebobinando ? "REBOBINANDO\u2026" : "\u23EA REBOBINAR"
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: confirmar, disabled: revelado, className: "flex items-center justify-center gap-2 rounded-lg bg-[#45ff8f] px-3 py-3 font-bold text-black", children: [
              /* @__PURE__ */ jsx(CheckCircle2, { size: 17 }),
              " \u2705 CONFIRMAR \xDALTIMO"
            ] }),
            /* @__PURE__ */ jsx("button", { onClick: () => cambiarCaso((casoIdx + 1) % CASOS.length), className: "flex items-center justify-center gap-2 rounded-lg border border-[#38e8ff] px-3 py-3 font-bold text-[#38e8ff]", children: "\u27A1\uFE0F SIGUIENTE CASO" })
          ] }),
          /* @__PURE__ */ jsxs("label", { className: "mt-4 block", children: [
            /* @__PURE__ */ jsxs("span", { className: "mb-1 block text-sm font-bold", children: [
              "Escribe la condici\xF3n para +5 ",
              /* @__PURE__ */ jsx("span", { className: "font-normal text-[#8da6bd]", children: "(opcional)" })
            ] }),
            /* @__PURE__ */ jsx("input", { value: condicion, onChange: (e) => setCondicion(e.target.value), placeholder: "ej: e => e.accion === 'sale'", className: "font-code w-full rounded-lg border border-[#1e2a3d] bg-[#050a12] px-3 py-3 text-sm outline-none focus:border-[#38e8ff]" })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3 flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxs("button", { onClick: () => setCasoIdx((c) => Math.max(0, c - 1)), className: "flex items-center gap-1 rounded-md border px-2 py-1 text-xs", children: [
              /* @__PURE__ */ jsx(ChevronLeft, { size: 14 }),
              " Anterior"
            ] }),
            /* @__PURE__ */ jsxs("button", { onClick: () => setCasoIdx((c) => Math.min(CASOS.length - 1, c + 1)), className: "flex items-center gap-1 rounded-md border px-2 py-1 text-xs", children: [
              "Siguiente ",
              /* @__PURE__ */ jsx(ChevronRight, { size: 14 })
            ] }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-[#8da6bd]", children: "+10 acierto \xB7 +5 condici\xF3n \xB7 \u22125 primer match \xB7 \u22123 no cumple \xB7 \u{1F9E0} +15 a las 3 rondas sin caer en el primer match" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("aside", { className: "panel order-3 p-4", children: [
          /* @__PURE__ */ jsxs("h2", { className: "flex items-center gap-2 text-lg font-bold", children: [
            /* @__PURE__ */ jsx(Search, { size: 19, className: "text-[#45ff8f]" }),
            " DEPURADOR INTELIGENTE"
          ] }),
          /* @__PURE__ */ jsx("p", { className: "font-code mt-1 text-sm text-[#38e8ff]", children: ".findLast()" }),
          /* @__PURE__ */ jsx("div", { className: "font-code mt-3 min-h-[310px] space-y-2 overflow-x-clip rounded-lg border border-[#1e2a3d] bg-black/70 p-3 text-[12px] leading-relaxed", children: debug.map((l, i) => /* @__PURE__ */ jsx("p", { className: l.includes("\u2705") || l.includes("Resultado") ? "text-[#45ff8f]" : l.includes("Rebobinar") ? "text-[#ffe066]" : l.includes("vs find") ? "text-[#ff4fd8]" : "text-[#c7d7e5]", children: l }, i)) }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 grid grid-cols-3 gap-2 text-center", children: [
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-2", children: [
              /* @__PURE__ */ jsx(Eye, { size: 16, className: "mx-auto text-[#38e8ff]" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] text-[#8da6bd]", children: "DEVUELVE" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold", children: "OBJETO" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-2", children: [
              /* @__PURE__ */ jsx(ListOrdered, { size: 16, className: "mx-auto text-[#ffe066]" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] text-[#8da6bd]", children: "ORDEN" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold", children: "ATR\xC1S \u2192" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "rounded-lg border p-2", children: [
              /* @__PURE__ */ jsx(Target, { size: 16, className: "mx-auto text-[#45ff8f]" }),
              /* @__PURE__ */ jsx("p", { className: "mt-1 text-[11px] text-[#8da6bd]", children: "BUSCA" }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-bold", children: "\xDALTIMO" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-4 rounded-lg border border-[#38e8ff]/25 bg-[#071018] p-3", children: [
            /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 text-sm font-bold", children: [
              /* @__PURE__ */ jsx(Zap, { size: 15, className: "text-[#ffe066]" }),
              " REGLA DE ORO"
            ] }),
            /* @__PURE__ */ jsxs("p", { className: "mt-2 text-sm leading-relaxed text-[#c7d7e5]", children: [
              "Si hay varios que cumplen, ",
              /* @__PURE__ */ jsx("b", { children: "findLast se queda con el de m\xE1s a la derecha" }),
              ". No es el primero, no es el \xEDndice: es el testigo completo."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("p", { className: "mt-3 text-xs text-[#8da6bd]", children: [
            "Sin caer en el primer match: ",
            sinPrimer,
            " / 3 \xB7 La insignia aparece al completar 3 rondas seguidas sin ese error."
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("footer", { className: "mt-4 text-center text-xs text-[#8da6bd]", children: "Revisa la cinta. Rebobina mentalmente. Se\xF1ala al testigo, no al n\xFAmero." })
    ] })
  ] });
}
export {
  App as default
};
