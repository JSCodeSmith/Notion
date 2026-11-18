import React, { useEffect, useMemo, useRef, useState } from "react";
import { Clock3, ChevronLeft, ChevronRight, RotateCcw, Play, CheckCircle2, Brain, Camera, Search, Zap, Eye, ListOrdered, Target } from "lucide-react";

type Evento = { quien: string; accion: "sale" | "entra"; sombrero: boolean; edad: number; palomitas: boolean };
type Caso = { id: number; titulo: string; pista: string; eventos: Evento[]; codigo: string; aceptadas: string[]; clave: string };

const CASOS: Caso[] = [
  { id:1, titulo:"Último en salir", pista:"¿Quién fue el ÚLTIMO en salir?", eventos:[
    {quien:"Ana",accion:"sale",sombrero:true,edad:32,palomitas:false},
    {quien:"Luis",accion:"entra",sombrero:false,edad:28,palomitas:false},
    {quien:"Ana",accion:"sale",sombrero:false,edad:32,palomitas:true},
    {quien:"Pedro",accion:"entra",sombrero:true,edad:41,palomitas:false},
    {quien:"Ana",accion:"sale",sombrero:true,edad:32,palomitas:false},
  ], codigo:"eventos.findLast(e => e.accion === 'sale')", aceptadas:["e.accion==='sale'","e.accion===\"sale\"","e.accion==='sale'"], clave:"sale" },
  { id:2, titulo:"Último en entrar", pista:"¿Quién fue el ÚLTIMO en entrar?", eventos:[
    {quien:"Ana",accion:"sale",sombrero:true,edad:32,palomitas:false},
    {quien:"Luis",accion:"entra",sombrero:false,edad:28,palomitas:false},
    {quien:"Ana",accion:"sale",sombrero:false,edad:32,palomitas:true},
    {quien:"Pedro",accion:"entra",sombrero:true,edad:41,palomitas:false},
    {quien:"Ana",accion:"sale",sombrero:true,edad:32,palomitas:false},
  ], codigo:"eventos.findLast(e => e.accion === 'entra')", aceptadas:["e.accion==='entra'"], clave:"entra" },
  { id:3, titulo:"TRAMPA · Sale + sombrero", pista:"¿Quién fue el ÚLTIMO en salir y llevaba sombrero?", eventos:[
    {quien:"Ana",accion:"sale",sombrero:true,edad:32,palomitas:false},
    {quien:"Luis",accion:"entra",sombrero:false,edad:28,palomitas:false},
    {quien:"Ana",accion:"sale",sombrero:false,edad:32,palomitas:true},
    {quien:"Pedro",accion:"entra",sombrero:true,edad:41,palomitas:false},
    {quien:"Ana",accion:"sale",sombrero:true,edad:32,palomitas:false},
  ], codigo:"eventos.findLast(e => e.accion === 'sale' && e.sombrero)", aceptadas:["e.accion==='sale'&&e.sombrero","e.sombrero&&e.accion==='sale'","e.accion==='sale'&&e.sombrero===true"], clave:"sale+sombrero" },
  { id:4, titulo:"Nombre con 'A' y sale", pista:"¿Quién fue el ÚLTIMO cuyo nombre empieza por 'A' y sale?", eventos:[
    {quien:"Ana",accion:"entra",sombrero:false,edad:32,palomitas:false},
    {quien:"Luis",accion:"sale",sombrero:true,edad:28,palomitas:true},
    {quien:"Pedro",accion:"sale",sombrero:false,edad:41,palomitas:false},
    {quien:"Andrea",accion:"sale",sombrero:true,edad:29,palomitas:false},
    {quien:"Carlos",accion:"sale",sombrero:false,edad:35,palomitas:true},
    {quien:"Ana",accion:"sale",sombrero:false,edad:32,palomitas:false},
  ], codigo:"eventos.findLast(e => e.quien.startsWith('A') && e.accion === 'sale')", aceptadas:["e.quien.startswith('a')&&e.accion==='sale'","e.accion==='sale'&&e.quien.startswith('a')"], clave:"A+sale" },
  { id:5, titulo:"Sin sombrero y sale", pista:"¿Quién fue el ÚLTIMO sin sombrero que sale?", eventos:[
    {quien:"Ana",accion:"sale",sombrero:true,edad:32,palomitas:false},
    {quien:"Luis",accion:"entra",sombrero:false,edad:28,palomitas:false},
    {quien:"Pedro",accion:"sale",sombrero:true,edad:41,palomitas:true},
    {quien:"Andrea",accion:"sale",sombrero:false,edad:29,palomitas:false},
    {quien:"Carlos",accion:"entra",sombrero:true,edad:35,palomitas:false},
    {quien:"Ana",accion:"sale",sombrero:true,edad:32,palomitas:true},
  ], codigo:"eventos.findLast(e => e.accion === 'sale' && !e.sombrero)", aceptadas:["e.accion==='sale'&&!e.sombrero","!e.sombrero&&e.accion==='sale'","e.accion==='sale'&&e.sombrero===false"], clave:"sale+!sombrero" },
  { id:6, titulo:"Edad > 30 y sale", pista:"¿Quién fue el ÚLTIMO con edad > 30 que sale?", eventos:[
    {quien:"Ana",accion:"sale",sombrero:false,edad:32,palomitas:true},
    {quien:"Luis",accion:"sale",sombrero:true,edad:24,palomitas:false},
    {quien:"Pedro",accion:"entra",sombrero:false,edad:41,palomitas:false},
    {quien:"Andrea",accion:"sale",sombrero:true,edad:29,palomitas:false},
    {quien:"Carlos",accion:"sale",sombrero:false,edad:38,palomitas:false},
    {quien:"Ana",accion:"entra",sombrero:false,edad:32,palomitas:false},
  ], codigo:"eventos.findLast(e => e.edad > 30 && e.accion === 'sale')", aceptadas:["e.edad>30&&e.accion==='sale'","e.accion==='sale'&&e.edad>30","e.edad>=31&&e.accion==='sale'"], clave:"edad>30+sale" },
];

function cumple(caso: Caso, e: Evento): boolean {
  if(caso.id===1) return e.accion==="sale";
  if(caso.id===2) return e.accion==="entra";
  if(caso.id===3) return e.accion==="sale" && e.sombrero;
  if(caso.id===4) return e.quien.startsWith("A") && e.accion==="sale";
  if(caso.id===5) return e.accion==="sale" && !e.sombrero;
  return e.edad>30 && e.accion==="sale";
}
function normaliza(s:string){
  return s.toLowerCase().replace(/\s+/g,"").replace(/"/g,"'").replace(/;$/,"").replace(/^\((e|ev|evento)\)=>/,"e=>").replace(/^e=>/,"").replace(/^return/,"").replace(/^\(e\)=>/,"e=>").replace(/^\(e\)/,"e");
}
function objStr(e:Evento){ return `{ quien: '${e.quien}', accion: '${e.accion}', sombrero: ${e.sombrero}, edad: ${e.edad} }`; }

async function api(action:string, args:any){
  const r = await fetch("actions", {method:"POST", headers:{"content-type":"application/json"}, body: JSON.stringify({action, args})});
  const j = await r.json().catch(()=>({}));
  if(!r.ok || j.error) throw new Error(j.error || `Error ${r.status}`);
  return j.data;
}

export default function App(){
  const [casoIdx,setCasoIdx]=useState(0);
  const caso=CASOS[casoIdx];
  const [seleccion,setSeleccion]=useState(2);
  const [condicion,setCondicion]=useState("");
  const [puntos,setPuntos]=useState(0);
  const [racha,setRacha]=useState(0);
  const [sinPrimer,setSinPrimer]=useState(0);
  const [insignia,setInsignia]=useState(false);
  const [revelado,setRevelado]=useState(false);
  const [resultado,setResultado]=useState<string|null>(null);
  const [tipoResultado,setTipoResultado]=useState<"ok"|"primer"|"no"|null>(null);
  const [debug,setDebug]=useState<string[]>(["> Consola lista. Elige un testigo y pulsa CONFIRMAR ÚLTIMO."]);
  const [bitacora,setBitacora]=useState<string[]>(["Sesión iniciada. Revisa la cinta sin quedarte con el primer match."]);
  const [rebobinando,setRebobinando]=useState(false);
  const [guardado,setGuardado]=useState("Guardado local en esta sesión");
  const [recordId,setRecordId]=useState<string|null>(null);
  const [arrastrando,setArrastrando]=useState(false);
  const [hora,setHora]=useState(new Date());
  const trackRef=useRef<HTMLDivElement>(null);
  const timers=useRef<number[]>([]);

  const matches = useMemo(()=> caso.eventos.map((e,i)=> cumple(caso,e)?i:-1).filter(i=>i>=0),[caso]);
  const correcto = matches[matches.length-1];
  const primero = matches[0];
  const progreso = `${casoIdx+1} / ${CASOS.length}`;

  useEffect(()=>{ const t=setInterval(()=>setHora(new Date()),1000); return ()=>clearInterval(t); },[]);
  useEffect(()=>()=>{ timers.current.forEach(clearTimeout); },[]);

  async function cargar(){
    try{
      const data:any = await api("records.list", {collection:"findlast-progreso"});
      const rec=data?.records?.[0];
      if(rec){ setRecordId(rec.id); const v=rec.value||{}; if(typeof v.puntos==="number") setPuntos(v.puntos); if(typeof v.racha==="number") setRacha(v.racha); if(typeof v.sinPrimer==="number") setSinPrimer(v.sinPrimer); if(v.insignia) setInsignia(true); setGuardado("Progreso recuperado"); }
    }catch{ setGuardado("Sin conexión con el guardado; el juego sigue en esta sesión"); }
  }
  useEffect(()=>{ cargar(); },[]);
  async function guardar(p:number,r:number,s:number,b:boolean){
    try{
      const value={puntos:p,racha:r,sinPrimer:s,insignia:b,actualizado:new Date().toISOString()};
      if(recordId) await api("records.replace",{collection:"findlast-progreso",id:recordId,value});
      else { const created:any=await api("records.create",{collection:"findlast-progreso",value}); if(created?.id) setRecordId(created.id); }
      setGuardado("Progreso guardado");
    }catch{ setGuardado("No se pudo guardar; sigue jugando"); }
  }

  function limpiarTimers(){ timers.current.forEach(clearTimeout); timers.current=[]; }
  function cambiarCaso(i:number){
    limpiarTimers(); setCasoIdx(i); setSeleccion(0); setRevelado(false); setResultado(null); setTipoResultado(null); setCondicion(""); setDebug([`> Caso #${i+1} cargado. Recorre la cinta de atrás hacia adelante.`]); setBitacora(b=>[...b,`Caso #${i+1}: ${CASOS[i].titulo}`]);
  }
  function moverDesdeEvento(e:React.PointerEvent, idx:number){
    if(!trackRef.current) return;
    const rect=trackRef.current.getBoundingClientRect();
    const ratio=Math.max(0,Math.min(1,(e.clientX-rect.left)/rect.width));
    const nuevo=Math.round(ratio*(caso.eventos.length-1));
    setSeleccion(arrastrando? nuevo : idx);
  }
  function rebobinar(){
    if(rebobinando) return;
    limpiarTimers(); setRebobinando(true); setRevelado(false); setResultado(null);
    const pasos:string[]=[];
    for(let i=caso.eventos.length-1;i>=0;i--){
      const idx=caso.eventos.length-1-i;
      timers.current.push(window.setTimeout(()=>{
        setSeleccion(i); pasos.push(`[Rebobinar] [${i}] ${caso.eventos[i].quien} — ${caso.eventos[i].accion}`);
        setDebug(d=>[...d.slice(-8),`[Rebobinar] [${i}] ${caso.eventos[i].quien} — ${caso.eventos[i].accion}`]);
        if(i===0){ setRebobinando(false); setDebug(d=>[...d,"✓ Rebobinado completo. Ahora busca desde el final."]); }
      }, idx*600));
    }
  }
  async function confirmar(){
    if(revelado) return;
    const ev=caso.eventos[seleccion];
    const esCorrecto=seleccion===correcto;
    const esPrimero=seleccion===primero && !esCorrecto;
    const noCumple=!cumple(caso,ev);
    const condOk = condicion.trim() ? CASOS[casoIdx].aceptadas.some(a=>normaliza(a)===normaliza(condicion)) : false;
    let nuevosPuntos=puntos; let nuevaRacha=racha; let nuevoSin=sinPrimer; let nuevaInsignia=insignia; let bonus=0; let mensaje=""; let tipo:"ok"|"primer"|"no"="ok";
    if(esCorrecto){ nuevosPuntos+=10; nuevaRacha+=1; if(condOk) nuevosPuntos+=5; mensaje=`✅ ¡Correcto! No es el índice, es el OBJETO: ${objStr(ev)}`; }
    else if(esPrimero){ nuevosPuntos-=5; nuevaRacha=0; nuevoSin=0; tipo="primer"; mensaje = caso.id===3 ? `❌ Ana salió con sombrero en [0] y en [4], pero findLast devuelve el ÚLTIMO. La respuesta era el índice 4.` : `❌ Ese es el PRIMERO que cumple, no el ÚLTIMO. Estás confundiendo find con findLast.`; }
    else if(noCumple){ nuevosPuntos-=3; nuevaRacha=0; tipo="no"; mensaje=`❌ Ese evento no cumple la condición. Revisa la pista y rebobina desde el final.`; }
    else { nuevosPuntos-=3; nuevaRacha=0; tipo="no"; mensaje=`❌ Cumple la condición, pero no es el ÚLTIMO. Sigue buscando hacia el final.`; }
    if(!esPrimero){ nuevoSin+=1; if(nuevoSin>=3 && !nuevaInsignia){ nuevaInsignia=true; bonus=15; nuevosPuntos+=15; nuevoSin=0; } }
    if(condOk && esCorrecto) mensaje+=` +5 por la condición.`;
    if(bonus) mensaje+=` 🧠 Bonus “memoria de pez” +15.`;
    setPuntos(nuevosPuntos); setRacha(nuevaRacha); setSinPrimer(nuevoSin); setInsignia(nuevaInsignia);
    setRevelado(true); setResultado(mensaje); setTipoResultado(tipo);
    setBitacora(b=>[...b,`Caso #${caso.id} · Elegido [${seleccion}] ${ev.quien} → ${esCorrecto?"✅ +10":"❌"}${condOk&&esCorrecto?" +5":""}${bonus?" +15 bonus":""}`].slice(-8));
    const lineas=[
      `> Ejecutando ${caso.codigo}`,
      `[Iteración desde el final] [${correcto}] ${caso.eventos[correcto].quien} - ${caso.eventos[correcto].accion} → ✅ ¡ENCONTRADO! Se detiene aquí.`,
      `🧠 Depurador: findLast recorre de ATRÁS hacia ADELANTE. No revisó ${caso.eventos.map((_,i)=>`[${i}]`).filter((_,i)=>i>correcto).join(",") || "ninguno posterior"} porque ya encontró el último.`,
      `> Resultado: ${objStr(caso.eventos[correcto])} ← Es el OBJETO, no el índice ${correcto}. Si quisieras el índice usarías findLastIndex.`,
      `⚖️ vs find: find daría el de [${primero}] (el primero). findLast da el de [${correcto}] (el último).`
    ];
    setDebug(["> Ejecutando…"]);
    lineas.forEach((l,i)=>{ timers.current.push(window.setTimeout(()=>setDebug(d=>[...d,l]), 350*(i+1))); });
    await guardar(nuevosPuntos,nuevaRacha,nuevoSin,nuevaInsignia);
  }
  function reiniciar(){
    limpiarTimers(); setPuntos(0); setRacha(0); setSinPrimer(0); setInsignia(false); setRecordId(null); cambiarCaso(0); setGuardado("Marcador reiniciado en esta sesión"); setBitacora(["Sesión reiniciada."]);
  }

  return (
    <div data-safe-area-inset-root className="min-h-screen overflow-x-clip bg-[#030508] text-[#e8f6ff]" style={{boxSizing:"border-box",paddingTop:"var(--safe-area-inset-top)"}}>
      <div className="scanlines"/><div className="vignette"/>
      <div className="relative z-10 mx-auto max-w-[1500px] px-3 pb-8 sm:px-5">
        <header data-safe-area-sticky-top className="sticky z-30 -mx-1 mb-4 flex flex-wrap items-center gap-2 border-b border-[#1e2a3d] bg-[#030508]/95 px-2 py-3 backdrop-blur sm:mx-0 sm:px-3" style={{top:"var(--safe-area-inset-top)"}}>
          <div className="mr-auto flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-[#ff3b57]/15 text-xl">🕵</span>
            <div><h1 className="text-base font-bold leading-none tracking-wide sm:text-xl">CINTA DE SEGURIDAD <span className="text-[#38e8ff]">— CASO #{caso.id}</span></h1><p className="mt-1 text-[11px] uppercase tracking-[.18em] text-[#8da6bd]">FindLast · La cinta de seguridad</p></div>
          </div>
          <span className="flex items-center gap-1.5 rounded-full border border-red-500/50 bg-red-500/10 px-2 py-1 text-xs font-bold"><span className="rec-dot h-2 w-2 rounded-full bg-[#ff3b57]"/>REC ●</span>
          <span className="hidden items-center gap-1 rounded-full border border-[#1e2a3d] px-2 py-1 text-xs sm:flex"><Clock3 size={13}/> {hora.toLocaleTimeString("es-ES")}</span>
          <span className="rounded-full bg-[#38e8ff] px-3 py-1 text-xs font-bold text-black">PUNTOS: {puntos}</span>
          <span className="rounded-full border border-[#ffe066] px-3 py-1 text-xs font-bold text-[#ffe066]">RACHA: {racha}</span>
          {insignia && <span className="rounded-full border border-[#45ff8f] bg-[#45ff8f]/10 px-3 py-1 text-xs font-bold text-[#45ff8f]">🧠 MEMORIA DE PEZ</span>}
        </header>

        <div className="mb-4 grid gap-3 rounded-xl border border-[#38e8ff]/30 bg-[#071018] p-3 sm:grid-cols-3">
          <p className="text-sm"><b className="text-[#38e8ff]">findLast</b> = <b>ÚLTIMO</b> que cumple. Devuelve el <b>elemento</b>.</p>
          <p className="text-sm"><b>CONDICIÓN</b>, no igualdad. La pista es “sale”, no “es Ana”.</p>
          <p className="text-sm"><b>Recorre de ATRÁS hacia ADELANTE.</b> Ana sale en 0, 2 y 4; solo cuenta la última.</p>
        </div>

        <main className="grid items-start gap-4 lg:grid-cols-[300px_1fr_420px]">
          <section className="panel order-2 p-4 lg:order-1">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold">📂 CASOS <span className="ml-auto text-xs text-[#8da6bd]">{progreso}</span></h2>
            <div className="space-y-2">
              {CASOS.map((c,i)=>(<button key={c.id} onClick={()=>cambiarCaso(i)} className={`w-full rounded-lg border p-3 text-left transition ${i===casoIdx?"border-[#38e8ff] bg-[#38e8ff]/10":"border-[#1e2a3d] hover:border-[#38e8ff]/50"}`}><span className="flex justify-between text-sm font-bold"><span>Caso {c.id}</span><span className="text-[#38e8ff]">{i===casoIdx?"▶ EN PANTALLA":""}</span></span><span className="mt-1 block text-sm text-[#c7d7e5]">{c.titulo}</span><span className="font-code mt-1 block break-words text-[11px] text-[#8da6bd]">{c.codigo}</span></button>))}
            </div>
            <div className="mt-4 space-y-2 border-t border-[#1e2a3d] pt-3 text-sm">
              <p><b className="text-[#45ff8f]">findLast</b> = último que cumple</p><p><b className="text-[#ffe066]">find</b> = primero</p><p><b className="text-[#ff4fd8]">findLastIndex</b> = índice del último</p>
              <p className="text-[#8da6bd]">No señales un índice: señala al testigo, el objeto completo.</p>
            </div>
            <div className="mt-4 border-t border-[#1e2a3d] pt-3">
              <h3 className="mb-2 text-sm font-bold tracking-widest text-[#8da6bd]">BITÁCORA</h3>
              <ul className="font-code space-y-1 text-[11px] text-[#a9c2d6]">{bitacora.map((b,i)=><li key={i}>• {b}</li>)}</ul>
              <button onClick={reiniciar} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[#ff3b57]/50 py-2 text-sm font-bold text-[#ff8fa0]"><RotateCcw size={15}/> REINICIAR PARTIDA</button>
              <p className="mt-2 text-center text-[11px] text-[#8da6bd]">{guardado}</p>
            </div>
          </section>

          <section className="panel order-1 p-3 sm:p-5 lg:order-2">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h2 className="flex items-center gap-2 text-xl font-bold"><Camera size={20} className="text-[#38e8ff]"/> CINTA DE SEGURIDAD</h2><span className="font-code text-xs text-[#8da6bd]">CAM 01 · {hora.toLocaleTimeString("es-ES")}</span></div>
            <div className="rounded-xl border border-[#ffe066]/25 bg-[#15100a] p-4">
              <p className="text-[11px] font-bold uppercase tracking-[.2em] text-[#ffe066]">Pista del caso #{caso.id}</p>
              <p className="mt-2 text-2xl font-bold leading-tight sm:text-3xl">{caso.pista}</p>
              <p className="mt-2 text-sm text-[#c7d7e5]">Arrastra el marcador o toca un evento. Luego rebobina y confirma el <b>último</b> que cumple.</p>
            </div>

            <div className="mt-5">
              <div className="mb-2 flex justify-between text-[11px] font-bold text-[#8da6bd]"><span>◀ INICIO</span><span className="text-[#38e8ff]">MARCADOR EN [{seleccion}]</span><span>FINAL ▶</span></div>
              <div ref={trackRef} className="relative h-12 touch-none select-none rounded-full border border-[#2d3d57] bg-[#0a111e] px-2"
                onPointerDown={(e)=>{setArrastrando(true); (e.target as HTMLElement).setPointerCapture?.(e.pointerId); moverDesdeEvento(e,seleccion);}}
                onPointerMove={(e)=>{if(arrastrando) moverDesdeEvento(e,seleccion);}}
                onPointerUp={()=>setArrastrando(false)} onPointerCancel={()=>setArrastrando(false)}>
                <div className="absolute left-2 right-2 top-1/2 h-1 -translate-y-1/2 rounded bg-[#25334a]"/>
                <div className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2" style={{left:`calc(${(seleccion/(caso.eventos.length-1))*100}% )`}}>
                  <div className="flex -translate-y-1 items-center whitespace-nowrap rounded-md border-2 border-[#38e8ff] bg-[#07131f] px-2 py-1 text-xs font-bold shadow-[0_0_20px_#38e8ff66]"><span className="mr-1 text-[#38e8ff]">▶</span>[____] MARCADOR</div>
                </div>
                {caso.eventos.map((_,i)=>(<button key={i} aria-label={`Ir a evento ${i}`} className="absolute top-1/2 z-0 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8da6bd]" style={{left:`${(i/(caso.eventos.length-1))*100}%`}}/>))}
              </div>
              <p className="mt-2 text-center text-xs text-[#8da6bd]">Arrastra el marcador o haz clic en un evento. El marcador salta al evento más cercano.</p>
            </div>

            <div className={`mt-4 grid gap-2 sm:grid-cols-2 ${caso.eventos.length===6?"lg:grid-cols-3":"lg:grid-cols-5"} ${tipoResultado==="primer"||tipoResultado==="no"?"shake":""}`}>
              {caso.eventos.map((e,i)=>{
                const elegido=i===seleccion; const ok=revelado&&i===correcto; const mal=revelado&&i===seleccion&&seleccion!==correcto;
                return <button key={i} onClick={()=>{setSeleccion(i); setRevelado(false); setResultado(null);}} className={`event-card relative min-w-0 rounded-xl border p-3 text-left ${ok?"glow-green border-[#45ff8f] bg-[#072314]":mal?"border-[#ff3b57] bg-[#280a10]":elegido?"border-[#38e8ff] bg-[#0b2435] shadow-[0_0_24px_#38e8ff33]":"border-[#1e2a3d] bg-[#0a111e]"}`}>
                  <span className="font-code text-xs text-[#8da6bd]">[{i}]</span>
                  <span className="mt-2 block truncate text-lg font-bold">👤 {e.quien}</span>
                  <span className="mt-1 block text-base">🚪 {e.accion}</span>
                  <span className="mt-1 block min-h-6 text-base">{e.sombrero?"🎩 sombrero":""}</span>
                  <span className="mt-1 block text-xs text-[#a9c2d6]">Edad: {e.edad}</span>
                  <span className="mt-1 block text-sm">{e.palomitas?"🍿 palomitas":""}</span>
                  {revelado && cumple(caso,e) && <span className="absolute right-2 top-2 rounded bg-[#45ff8f]/15 px-1 text-[10px] font-bold text-[#45ff8f]">CUMPLE</span>}
                  {ok && <span className="mt-2 block text-xs font-bold text-[#45ff8f]">✅ ÚLTIMO · OBJETO</span>}
                </button>;
              })}
            </div>

            {revelado && resultado && <div className={`mt-4 rounded-lg border p-3 text-sm font-bold ${tipoResultado==="ok"?"border-[#45ff8f] bg-[#072314] text-[#b8ffd6]":"border-[#ff3b57] bg-[#280a10] text-[#ffb3c0]"}`}>{resultado}<p className="font-code mt-2 break-words text-xs font-normal opacity-90">{caso.codigo} {"// → "}{objStr(caso.eventos[correcto])}</p></div>}

            <div className="mt-4 grid gap-2 sm:grid-cols-3">
              <button onClick={rebobinar} disabled={rebobinando} className="flex items-center justify-center gap-2 rounded-lg bg-[#ffe066] px-3 py-3 font-bold text-black"><Play size={16}/> {rebobinando?"REBOBINANDO…":"⏪ REBOBINAR"}</button>
              <button onClick={confirmar} disabled={revelado} className="flex items-center justify-center gap-2 rounded-lg bg-[#45ff8f] px-3 py-3 font-bold text-black"><CheckCircle2 size={17}/> ✅ CONFIRMAR ÚLTIMO</button>
              <button onClick={()=>cambiarCaso((casoIdx+1)%CASOS.length)} className="flex items-center justify-center gap-2 rounded-lg border border-[#38e8ff] px-3 py-3 font-bold text-[#38e8ff]">➡️ SIGUIENTE CASO</button>
            </div>
            <label className="mt-4 block"><span className="mb-1 block text-sm font-bold">Escribe la condición para +5 <span className="font-normal text-[#8da6bd]">(opcional)</span></span><input value={condicion} onChange={e=>setCondicion(e.target.value)} placeholder="ej: e => e.accion === 'sale'" className="font-code w-full rounded-lg border border-[#1e2a3d] bg-[#050a12] px-3 py-3 text-sm outline-none focus:border-[#38e8ff]"/></label>
            <div className="mt-3 flex flex-wrap gap-2">
              <button onClick={()=>setCasoIdx(c=>Math.max(0,c-1))} className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs"><ChevronLeft size={14}/> Anterior</button>
              <button onClick={()=>setCasoIdx(c=>Math.min(CASOS.length-1,c+1))} className="flex items-center gap-1 rounded-md border px-2 py-1 text-xs">Siguiente <ChevronRight size={14}/></button>
              <span className="text-xs text-[#8da6bd]">+10 acierto · +5 condición · −5 primer match · −3 no cumple · 🧠 +15 a las 3 rondas sin caer en el primer match</span>
            </div>
          </section>

          <aside className="panel order-3 p-4">
            <h2 className="flex items-center gap-2 text-lg font-bold"><Search size={19} className="text-[#45ff8f]"/> DEPURADOR INTELIGENTE</h2>
            <p className="font-code mt-1 text-sm text-[#38e8ff]">.findLast()</p>
            <div className="font-code mt-3 min-h-[310px] space-y-2 overflow-x-clip rounded-lg border border-[#1e2a3d] bg-black/70 p-3 text-[12px] leading-relaxed">
              {debug.map((l,i)=><p key={i} className={l.includes("✅")||l.includes("Resultado")?"text-[#45ff8f]":l.includes("Rebobinar")?"text-[#ffe066]":l.includes("vs find")?"text-[#ff4fd8]":"text-[#c7d7e5]"}>{l}</p>)}
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg border p-2"><Eye size={16} className="mx-auto text-[#38e8ff]"/><p className="mt-1 text-[11px] text-[#8da6bd]">DEVUELVE</p><p className="text-sm font-bold">OBJETO</p></div>
              <div className="rounded-lg border p-2"><ListOrdered size={16} className="mx-auto text-[#ffe066]"/><p className="mt-1 text-[11px] text-[#8da6bd]">ORDEN</p><p className="text-sm font-bold">ATRÁS →</p></div>
              <div className="rounded-lg border p-2"><Target size={16} className="mx-auto text-[#45ff8f]"/><p className="mt-1 text-[11px] text-[#8da6bd]">BUSCA</p><p className="text-sm font-bold">ÚLTIMO</p></div>
            </div>
            <div className="mt-4 rounded-lg border border-[#38e8ff]/25 bg-[#071018] p-3">
              <p className="flex items-center gap-2 text-sm font-bold"><Zap size={15} className="text-[#ffe066]"/> REGLA DE ORO</p>
              <p className="mt-2 text-sm leading-relaxed text-[#c7d7e5]">Si hay varios que cumplen, <b>findLast se queda con el de más a la derecha</b>. No es el primero, no es el índice: es el testigo completo.</p>
            </div>
            <p className="mt-3 text-xs text-[#8da6bd]">Sin caer en el primer match: {sinPrimer} / 3 · La insignia aparece al completar 3 rondas seguidas sin ese error.</p>
          </aside>
        </main>
        <footer className="mt-4 text-center text-xs text-[#8da6bd]">Revisa la cinta. Rebobina mentalmente. Señala al testigo, no al número.</footer>
      </div>
    </div>
  );
}
