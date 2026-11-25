import React, { useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2, ChevronLeft, ChevronRight, Clock, Eraser, Flame, Package, Play, RefreshCw, RotateCcw, Shuffle, Trophy } from "lucide-react";

type Box = { id:number; peso:number|string; color:string; emoji:string };
type LevelId = "n1"|"n2"|"n3"|"ascdesc"|"infinito"|"n19";
type Comparator = "ab"|"ba"|"bool"|null;

const COLORS = ["#ff4d6d","#38e8ff","#3dff8e","#ffd52e","#b78bff","#ff9b2e","#ff6bd6","#7dff6a"];
const EMOJIS = ["🟥","🟦","🟩","🟨","🟪","🟧","🟫","⬛"];

function shuffled<T>(arr:T[]):T[]{ const a=[...arr]; for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]];} return a; }
function makeBoxes(weights:(number|string)[]):Box[]{ return weights.map((peso,i)=>({id:i,peso,color:COLORS[i%COLORS.length],emoji:EMOJIS[i%EMOJIS.length]})); }
function weightNum(b:Box){ return Number(b.peso); }

type LevelDef = { id:LevelId; title:string; short:string; direction:"asc"|"desc"; weights:(number|string)[]; reward:number; hint:string };
const LEVELS:LevelDef[] = [
  {id:"n1", title:"Nivel 1 · Menor a Mayor", short:"Nivel 1 · Ascendente", direction:"asc", weights:[50,10,30,20,40], reward:10, hint:"Usa a.peso - b.peso."},
  {id:"n2", title:"Nivel 2 · Mayor a Menor", short:"Nivel 2 · Descendente", direction:"desc", weights:[15,45,5,35,25], reward:10, hint:"Usa b.peso - a.peso."},
  {id:"n3", title:"Nivel 3 · TRAMPA Strings", short:"Nivel 3 · Trampa Strings", direction:"asc", weights:["10","9","2","30","5"], reward:10, hint:"Son strings. El comparador numérico convierte y ordena bien."},
  {id:"ascdesc", title:"Modo Asc vs Desc", short:"Modo Asc vs Desc", direction:"asc", weights:[50,10,30,20,40], reward:10, hint:"El objetivo cambia. Lee el orden pedido antes de elegir."},
  {id:"infinito", title:"Modo Infinito", short:"Modo Infinito", direction:"asc", weights:[100,9,3,27,44,61,18,72], reward:10, hint:"8 cajas. Ojo con 100, 9 y 3: lexicográfico las traiciona."},
  {id:"n19", title:"Nivel 19 · Encargado", short:"Nivel 19", direction:"asc", weights:[100,5,15,25,35,45,55,65,75,85,95,10,20,30,40,50,60,70,80], reward:20, hint:"19 cajas. 90 segundos. Menor a mayor."},
];

async function api(action:string, args:Record<string,unknown>){
  const res = await fetch("actions", {method:"POST", headers:{"content-type":"application/json"}, body:JSON.stringify({action, args})});
  const json = await res.json().catch(()=>({}));
  if(!res.ok || json?.error) throw new Error(json?.error || `Error ${res.status}`);
  return json.data;
}

export default function App(){
  const [levelId,setLevelId] = useState<LevelId>("n1");
  const level = LEVELS.find(l=>l.id===levelId)!;
  const [ascDescDir,setAscDescDir] = useState<"asc"|"desc">("asc");
  const direction = levelId==="ascdesc" ? ascDescDir : level.direction;
  const [boxes,setBoxes] = useState<Box[]>(()=>shuffled(makeBoxes(LEVELS[0].weights)));
  const [pool,setPool] = useState<number[]>(()=>shuffled(makeBoxes(LEVELS[0].weights)).map(b=>b.id));
  const [shelf,setShelf] = useState<(number|null)[]>(Array(LEVELS[0].weights.length).fill(null));
  const [comparator,setComparator] = useState<Comparator>(null);
  const [codeInput,setCodeInput] = useState("");
  const [points,setPoints] = useState(0);
  const [streak,setStreak] = useState(0);
  const [solved,setSolved] = useState<Set<string>>(new Set());
  const [feedback,setFeedback] = useState<{type:"ok"|"bad"|"info"; title:string; text:string}|null>(null);
  const [logs,setLogs] = useState<string[]>(["> Consola lista. Arrastra las cajas a la estantería y elige un comparador."]);
  const [mutation,setMutation] = useState<string|null>(null);
  const [bitacora,setBitacora] = useState<string[]>(["Turno iniciado en el almacén. El comparador manda."]);
  const [dragId,setDragId] = useState<number|null>(null);
  const [dropSlot,setDropSlot] = useState<number|null>(null);
  const [failed,setFailed] = useState(false);
  const [successGlow,setSuccessGlow] = useState(false);
  const [timeLeft,setTimeLeft] = useState(90);
  const [timerRunning,setTimerRunning] = useState(false);
  const [recordId,setRecordId] = useState<string|null>(null);
  const [saveState,setSaveState] = useState("Progreso: cargando…");
  const [round,setRound] = useState(1);
  const busyRef = useRef(false);

  const byId = useMemo(()=>new Map(boxes.map(b=>[b.id,b])),[boxes]);
  const expected = useMemo(()=>[...boxes].sort((a,b)=> direction==="asc" ? weightNum(a)-weightNum(b) : weightNum(b)-weightNum(a)).map(b=>b.id),[boxes,direction]);
  const expectedWeights = expected.map(id=>String(byId.get(id)?.peso));

  const reloadRecords = async()=>{
    try{
      const data = await api("records.list", {collection:"almacen_progreso"});
      const rec = data?.records?.[0];
      if(rec){
        setRecordId(rec.id);
        const v = rec.value||{};
        if(typeof v.points==="number") setPoints(v.points);
        if(typeof v.streak==="number") setStreak(v.streak);
        if(Array.isArray(v.solved)) setSolved(new Set(v.solved));
        setSaveState("Progreso guardado ✓");
      } else setSaveState("Sin progreso guardado todavía");
    }catch{ setSaveState("Sin conexión al guardado: juegas en esta sesión"); }
  };
  useEffect(()=>{ reloadRecords(); },[]);

  async function saveProgress(nextPoints:number,nextStreak:number,nextSolved:Set<string>){
    const value={points:nextPoints,streak:nextStreak,solved:[...nextSolved],updatedAt:new Date().toISOString()};
    try{
      setSaveState("Guardando progreso…");
      if(recordId){ await api("records.replace", {collection:"almacen_progreso", id:recordId, value}); }
      else { const created = await api("records.create", {collection:"almacen_progreso", value, idempotency_key:`almacen-progreso-inicial`}); if(created?.id) setRecordId(created.id); }
      setSaveState("Progreso guardado ✓");
    }catch(e){ setSaveState("No se pudo guardar este turno. Tu partida sigue en pantalla."); }
  }

  function startLevel(id:LevelId, newDir?: "asc"|"desc"){
    const def = LEVELS.find(l=>l.id===id)!;
    const dir = id==="ascdesc" ? (newDir || (ascDescDir==="asc"?"desc":"asc")) : def.direction;
    if(id==="ascdesc" && newDir) setAscDescDir(newDir);
    if(id==="ascdesc" && !newDir) setAscDescDir(dir);
    const fresh = shuffled(makeBoxes(def.weights));
    setLevelId(id); setBoxes(fresh); setPool(fresh.map(b=>b.id)); setShelf(Array(def.weights.length).fill(null));
    setComparator(null); setCodeInput(""); setFeedback(null); setFailed(false); setSuccessGlow(false); setRound(r=>r+1);
    setLogs([`> Nuevo turno: ${def.title}. Objetivo: ${dir==="asc"?"MENOR a MAYOR":"MAYOR a MENOR"}.`]);
    setMutation(null);
    setTimeLeft(90); setTimerRunning(id==="n19");
    setBitacora(b=>[`Nuevo turno: ${def.title}.`, ...b].slice(0,12));
  }

  useEffect(()=>{
    if(!timerRunning) return;
    if(timeLeft<=0){ setTimerRunning(false); setFeedback({type:"bad",title:"⏱ Tiempo agotado en Nivel 19",text:"El turno terminó. Pulsa MEZCLAR o cambia de nivel y vuelve a intentarlo con calma."}); setBitacora(b=>["Nivel 19: tiempo agotado.",...b].slice(0,12)); return; }
    const t=setTimeout(()=>setTimeLeft(v=>v-1),1000); return ()=>clearTimeout(t);
  },[timerRunning,timeLeft]);

  function moveToShelf(id:number){
    const slot = shelf.findIndex(s=>s===null); if(slot===-1) return;
    setShelf(s=>{const n=[...s]; n[slot]=id; return n;}); setPool(p=>p.filter(x=>x!==id));
  }
  function returnToPool(id:number){ setShelf(s=>s.map(x=>x===id?null:x)); setPool(p=>[...p,id]); }
  function moveShelf(id:number, dir:-1|1){
    const idx=shelf.findIndex(x=>x===id); const target=idx+dir; if(idx<0||target<0||target>=shelf.length) return;
    setShelf(s=>{const n=[...s]; [n[idx],n[target]]=[n[target],n[idx]]; return n;});
  }
  function onDropSlot(slot:number){
    if(dragId===null) return;
    if(pool.includes(dragId)){ setShelf(s=>{const n=[...s]; const prev=n[slot]; n[slot]=dragId; return n;}); setPool(p=>{let n=p.filter(x=>x!==dragId); const occupied=shelf[slot]; if(occupied!==null && occupied!==dragId) n=[...n,occupied]; return n;}); }
    else { const from=shelf.findIndex(x=>x===dragId); setShelf(s=>{const n=[...s]; [n[from],n[slot]]=[n[slot],n[from]]; return n;}); }
    setDragId(null); setDropSlot(null);
  }
  function shuffleRound(){
    const fresh = shuffled(makeBoxes(level.weights));
    setBoxes(fresh); setPool(fresh.map(b=>b.id)); setShelf(Array(level.weights.length).fill(null)); setFeedback(null); setFailed(false); setSuccessGlow(false);
    if(levelId==="ascdesc"){ const nd = ascDescDir==="asc"?"desc":"asc"; setAscDescDir(nd); setLogs([`> Mezclado. Asc vs Desc ahora pide ${nd==="asc"?"MENOR a MAYOR":"MAYOR a MENOR"}.`]); }
    else setLogs(["> Mezclado. Las cajas volvieron al suelo desordenadas."]);
    setMutation(null); if(levelId==="n19"){ setTimeLeft(90); setTimerRunning(true); }
  }

  function runDebugger(){
    const before = boxes.map(b=>String(b.peso));
    const copy = [...boxes];
    const lines:string[] = [];
    const comp = direction==="asc" ? (a:Box,b:Box)=>weightNum(a)-weightNum(b) : (a:Box,b:Box)=>weightNum(b)-weightNum(a);
    lines.push(`> Ejecutando cajas.sort((a,b) => ${direction==="asc"?"a.peso - b.peso":"b.peso - a.peso"})`);
    copy.sort((a,b)=>{ const r=comp(a,b); lines.push(`[Comparación] a=${a.peso}, b=${b.peso} → ${direction==="asc"?`${a.peso}-${b.peso}`:`${b.peso}-${a.peso}`} = ${r>0?"+":""}${r} (${r<0?"negativo":""}${r>0?"positivo":""}${r===0?"cero":""}) → ${r<0?"a antes que b":r>0?"b antes que a":"igual, sin cambio"}`); return r; });
    lines.push("🧠 Depurador: Si comparador devuelve <0 → a antes que b. Si >0 → b antes que a. Si 0 → igual.");
    lines.push("⚠️ Si devuelves booleano: a<b → true=1, false=0. Nunca devuelves negativo, por eso ordena mal.");
    lines.push(`> Resultado: [${copy.map(b=>b.peso).join(",")}] ← MISMO array, MUTADO. Antes era [${before.join(",")}].`);
    lines.push("⚖️ Comparación: sort() muta | toSorted() NO muta");
    if(levelId==="n3"){ lines.push("Sin comparador: [10,9,2] → convierte a ['10','9','2'] → compara primer carácter '1'<'2'<'9' → ['10','2','9'] ¡MAL!"); lines.push("Con comparador numérico: ['10','9','2','30','5'] → [2,5,9,10,30] ✅"); }
    setLogs(lines);
    setMutation(`Antes: [${before.join(",")}] → Después: [${copy.map(b=>b.peso).join(",")}] | sort() mutó el array original en el sitio.`);
    setBitacora(b=>["Depurador: se ejecutó el sort paso a paso.",...b].slice(0,12));
  }

  async function check(){
    if(shelf.some(s=>s===null)){ setFeedback({type:"info",title:"Faltan cajas en la estantería",text:"Coloca todas las cajas en los huecos antes de comprobar. Usa arrastrar o el botón ↓."}); return; }
    if(!comparator){ setFeedback({type:"info",title:"Elige un comparador",text:"El orden solo no basta: el comparador es la herramienta del encargado."}); return; }
    if(busyRef.current) return; busyRef.current=true;
    const player = shelf as number[];
    const orderOk = player.every((id,i)=>id===expected[i]);
    const correctComparator = direction==="asc" ? comparator==="ab" : comparator==="ba";
    let delta=0; let newStreak=streak; let newSolved=new Set(solved); let fb:{type:"ok"|"bad"|"info";title:string;text:string};
    const code = codeInput.trim();
    const codeOk = direction==="asc" ? /a\.peso\s*-\s*b\.peso/.test(code) : /b\.peso\s*-\s*a\.peso/.test(code);
    const codeBonus = code && codeOk ? 5 : 0;

    if(comparator==="bool"){
      delta=-5; newStreak=0;
      fb={type:"bad",title:"🪤 Trampa booleana · −5",text:"a.peso < b.peso devuelve true/false. sort() lo convierte a 1/0 y ordena mal. Necesitas a.peso - b.peso que devuelve -40, 0, +40. Eso devuelve true/false, no un número. sort() necesita negativo/0/positivo."};
      setFailed(true);
    } else if(!orderOk){
      delta=-3; newStreak=0;
      fb = !correctComparator
        ? {type:"bad",title:"Comparador al revés · −3",text: direction==="asc" ? "b.peso - a.peso ordena de MAYOR a MENOR. Te pidieron MENOR a MAYOR." : "a.peso - b.peso ordena de MENOR a MAYOR. Te pidieron MAYOR a MENOR."}
        : {type:"bad",title:"Orden incorrecto · −3",text:`Tu estantería quedó [${player.map(id=>byId.get(id)?.peso).join(",")}]. El sort real da [${expectedWeights.join(",")}]. Revisa el paso a paso y mueve las cajas.`};
      setFailed(true);
    } else if(!correctComparator){
      delta=-3; newStreak=0; setFailed(true);
      fb={type:"bad",title:"Orden bien, comparador mal · −3",text: direction==="asc" ? "b.peso - a.peso ordena de MAYOR a MENOR. Te pidieron MENOR a MAYOR." : "a.peso - b.peso ordena de MENOR a MAYOR. Te pidieron MAYOR a MENOR."};
    } else {
      delta = level.reward + codeBonus; newStreak=streak+1; newSolved.add(levelId);
      setSuccessGlow(true); setFailed(false); setTimerRunning(false);
      fb={type:"ok",title:`✅ ¡Almacén ordenado! +${delta} puntos`,text: levelId==="n3" ? `Caso sin comparador / strings explicado: sort() sin comparador da ['10','2','30','5','9'] ¡MAL! Con comparador numérico → [2,5,9,10,30] ✅${codeBonus?" +5 extra por escribir el código correcto.":""}` : `Orden y comparador correctos.${codeBonus?" +5 extra por escribir el código correcto.":""} Antes cajas = [${boxes.map(b=>b.peso).join(",")}]. Después de sort(), cajas = [${expectedWeights.join(",")}]. ¡Es el MISMO array, mutado! Si querías no mutar, usa toSorted().`};
      if(levelId==="n19") fb.text += " Badge desbloqueado: ENCARGADO NIVEL 19.";
    }
    const nextPoints=Math.max(0,points+delta);
    setPoints(nextPoints); setStreak(newStreak); setSolved(newSolved);
    setFeedback(fb);
    setBitacora(b=>[`${fb.title} · ${level.short}`,...b].slice(0,12));
    runDebugger();
    await saveProgress(nextPoints,newStreak,newSolved);
    busyRef.current=false;
  }

  function resetRound(){ setShelf(Array(boxes.length).fill(null)); setPool(boxes.map(b=>b.id)); setComparator(null); setCodeInput(""); setFeedback(null); setFailed(false); setSuccessGlow(false); setLogs(["> Turno reiniciado. La estantería quedó vacía."]); }

  const poolBoxes = pool.map(id=>byId.get(id)!).filter(Boolean);

  return (
    <div data-safe-area-inset-root style={{boxSizing:"border-box", paddingTop:"var(--safe-area-inset-top)", minHeight:"100vh", background:"var(--bg)"}} className="overflow-x-clip">
      <div className="mx-auto max-w-[1500px] px-3 pb-6 sm:px-5">
        {/* HEADER */}
        <header data-safe-area-sticky-top style={{top:"var(--safe-area-inset-top)"}} className="sticky z-20 -mx-3 mb-4 border-b border-[var(--line)] bg-[#030508]/95 px-3 py-3 backdrop-blur sm:-mx-5 sm:px-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="mr-auto min-w-0">
              <h1 className="text-[clamp(19px,3vw,34px)] font-bold leading-tight tracking-wide text-[var(--yellow)] [overflow-wrap:anywhere]">🏭 ALMACÉN “EL COMPARADOR” <span className="text-white">· ENCARGADO</span></h1>
              <p className="text-[13px] font-semibold tracking-[.16em] text-[var(--muted)]">ORDENA CON <span className="mono text-[var(--cyan)]">sort((a,b) =&gt; a.peso - b.peso)</span> · EL COMPARADOR DEVUELVE UN NÚMERO</p>
            </div>
            <span className="chip bg-[#12210f] text-[var(--green)]">● PROGRESO GUARDADO</span>
            <span className="chip bg-[#2a1e00] text-[var(--yellow)]">⭐ PUNTOS: {points}</span>
            <span className="chip bg-[#241000] text-[var(--orange)]"><Flame size={14}/> RACHA: {streak}</span>
          </div>
        </header>

        <div className="layout">
          {/* IZQUIERDA */}
          <aside className="flex flex-col gap-3">
            <section className="panel p-3">
              <h2 className="panel-title mb-3 text-[var(--yellow)]">📦 NIVELES</h2>
              <div className="flex flex-col gap-2">
                {LEVELS.map(l=>(
                  <button key={l.id} className={`level-btn ${levelId===l.id?"active":""}`} onClick={()=>startLevel(l.id)} aria-pressed={levelId===l.id}>
                    <span className="flex items-center justify-between gap-2"><span className="font-bold [overflow-wrap:anywhere]">{l.short}</span><span>{solved.has(l.id)?"✅":"○"}</span></span>
                    <span className="mt-1 block text-[12px] text-[var(--muted)]">{l.id==="n19"?"19 cajas · 90 s · +20":l.id==="infinito"?"8 cajas aleatorias · +10":`+${l.reward} puntos · ${l.direction==="asc"?"Menor a mayor":"Mayor a menor"}`}</span>
                  </button>
                ))}
              </div>
              <p className="mt-3 text-[12px] text-[var(--muted)] [overflow-wrap:anywhere]">{saveState}</p>
            </section>

            <section className="panel p-3">
              <h2 className="panel-title mb-2 text-[var(--cyan)]">sort() vs toSorted()</h2>
              <p className="mono text-[12px] leading-relaxed text-[#cfe6ff] [overflow-wrap:anywhere]"><b className="text-[var(--red)]">sort()</b> muta el array original.<br/><b className="text-[var(--green)]">toSorted()</b> devuelve una copia nueva y deja el original intacto.</p>
              <div className="mono mt-3 rounded bg-black/50 p-2 text-[11px] leading-relaxed [overflow-wrap:anywhere]">cajas.sort(...)<br/>// cajas YA cambió<br/><br/>cajas.toSorted(...)<br/>// cajas sigue igual</div>
            </section>

            <section className="panel p-3">
              <h2 className="panel-title mb-2 text-[var(--yellow)]">📓 BITÁCORA</h2>
              <ul className="flex flex-col gap-2">
                {bitacora.map((b,i)=>(<li key={i} className="border-l-2 border-[var(--yellow-dim)] pl-2 text-[13px] leading-snug text-[#cbd8ec] [overflow-wrap:anywhere]">{b}</li>))}
              </ul>
              <button onClick={resetRound} className="mt-3 flex w-full items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-white/5 px-3 py-2 text-sm font-bold"><RotateCcw size={15}/> REINICIAR TURNO</button>
            </section>
          </aside>

          {/* CENTRO */}
          <main className="min-w-0">
            <section className="panel p-3 sm:p-4">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div><h2 className="panel-title text-[var(--yellow)]">ALMACÉN DESORDENADO</h2><p className="text-[13px] text-[var(--muted)]">{level.title} · Ronda {round}</p></div>
                {levelId==="n19" && <div className={`flex items-center gap-2 rounded-lg px-3 py-2 font-bold ${timeLeft<=15?"bg-red-950 text-red-200":"bg-[#2a1e00] text-[var(--yellow)]"}`}><Clock size={17}/> {Math.floor(timeLeft/60)}:{String(timeLeft%60).padStart(2,"0")} <span className="text-xs">· +20</span></div>}
              </div>

              <h3 className="mt-4 text-[clamp(17px,2vw,24px)] font-bold leading-tight">🎯 Ordena las cajas de <span className="text-[var(--yellow)]">{direction==="asc"?"MENOR a MAYOR":"MAYOR a MENOR"}</span> peso</h3>
              <p className="mt-1 text-sm text-[var(--muted)]">{level.hint} {levelId==="n3" && <span className="text-white">sort() sin comparador: ['10','9','2'] → ['10','2','9']</span>}</p>

              <div className="mt-4 flex items-center justify-between"><h4 className="text-sm font-bold tracking-widest text-[var(--cyan)]">📦 CAJAS EN EL SUELO</h4><span className="text-xs text-[var(--muted)]">Arrastra o usa ↓</span></div>
              <div className="mt-2 flex flex-wrap gap-2">
                {poolBoxes.length===0 && <p className="w-full rounded-lg bg-green-950/50 p-3 text-center text-sm text-green-200">Todas las cajas están en la estantería. Revisa el orden y pulsa COMPROBAR.</p>}
                {poolBoxes.map((b,idx)=>(
                  <div key={b.id} draggable onDragStart={()=>setDragId(b.id)} onDragEnd={()=>{setDragId(null); setDropSlot(null);}} className="box-btn w-[104px] shrink-0" style={{background:`linear-gradient(180deg, ${b.color}33, #0a101d)`, borderColor:b.color}}>
                    <div className="text-2xl">{b.emoji}</div>
                    <div className="mono text-[12px] text-white">[{b.id}]</div>
                    <div className="text-lg font-bold">{String(b.peso)}kg</div>
                    <div className="mt-1 flex justify-center gap-1">
                      <button aria-label={`Mover caja ${b.peso} a la estantería`} onClick={()=>moveToShelf(b.id)} className="rounded bg-[var(--yellow)] px-2 py-1 text-[11px] font-black text-black">↓ ESTANTERÍA</button>
                    </div>
                    <div className="mt-1 text-[10px] text-[var(--muted)]">origen #{idx}</div>
                  </div>
                ))}
              </div>

              <h4 className="mt-5 text-sm font-bold tracking-widest text-[var(--yellow)]">🗄 ESTANTERÍA · {shelf.filter(Boolean).length}/{shelf.length} CAJAS</h4>
              <div className={`mt-2 grid gap-2 ${failed?"shake":""} ${successGlow?"glow-green":""}`} style={{gridTemplateColumns:"repeat(auto-fill,minmax(104px,1fr))"}}>
                {shelf.map((id,slot)=>{
                  const b = id!==null ? byId.get(id) : undefined;
                  return (
                    <div key={slot} onDragOver={e=>{e.preventDefault(); setDropSlot(slot);}} onDragLeave={()=>setDropSlot(null)} onDrop={e=>{e.preventDefault(); onDropSlot(slot);}} className={`slot ${id!==null?"filled":""} ${dropSlot===slot?"drop":""}`}>
                      <span className="mono text-[11px] text-[var(--muted)]">HUECO {slot}</span>
                      {b ? <>
                        <div className="text-2xl">{b.emoji}</div>
                        <div className="text-lg font-bold">{String(b.peso)}kg</div>
                        <div className="mt-1 flex gap-1">
                          <button aria-label="Mover a la izquierda" onClick={()=>moveShelf(b.id,-1)} className="rounded border border-[var(--line)] px-2 py-1">◀</button>
                          <button aria-label="Mover a la derecha" onClick={()=>moveShelf(b.id,1)} className="rounded border border-[var(--line)] px-2 py-1">▶</button>
                          <button aria-label="Devolver al suelo" onClick={()=>returnToPool(b.id)} className="rounded border border-[var(--line)] px-2 py-1">▲</button>
                        </div>
                      </> : <span className="mt-2 text-2xl opacity-30">▢</span>}
                    </div>
                  );
                })}
              </div>

              <h4 className="mt-5 text-sm font-bold tracking-widest text-[var(--cyan)]">🧩 ELIGE EL COMPARADOR</h4>
              <div className="mt-2 flex flex-col gap-2">
                <label className={`radio-row ${comparator==="ab"?"selected":""}`}><input type="radio" name="comp" checked={comparator==="ab"} onChange={()=>setComparator("ab")}/><span className="mono text-[13px] leading-snug [overflow-wrap:anywhere]">(a,b) =&gt; a.peso - b.peso <span className="text-[var(--green)]">← menor a mayor</span></span></label>
                <label className={`radio-row ${comparator==="ba"?"selected":""}`}><input type="radio" name="comp" checked={comparator==="ba"} onChange={()=>setComparator("ba")}/><span className="mono text-[13px] leading-snug [overflow-wrap:anywhere]">(a,b) =&gt; b.peso - a.peso <span className="text-[var(--orange)]">← mayor a menor</span></span></label>
                <label className={`radio-row ${comparator==="bool"?"selected":""}`}><input type="radio" name="comp" checked={comparator==="bool"} onChange={()=>setComparator("bool")}/><span className="mono text-[13px] leading-snug [overflow-wrap:anywhere]">(a,b) =&gt; a.peso &lt; b.peso <span className="text-[var(--red)]">← TRAMPA (booleano)</span></span></label>
              </div>

              <label className="mt-4 block">
                <span className="text-sm font-bold">✍️ Código opcional · +5 extra si es correcto</span>
                <input value={codeInput} onChange={e=>setCodeInput(e.target.value)} placeholder="Escribe: cajas.sort((a,b) => a.peso - b.peso)" className="mono mt-1 w-full rounded-lg border border-[var(--line)] bg-black/50 px-3 py-2.5 text-[13px] text-white [overflow-wrap:anywhere]" />
              </label>

              <div className="mt-4 flex flex-wrap gap-2">
                <button onClick={check} className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[var(--green)] px-4 py-3 font-black text-black min-w-[150px]"><CheckCircle2 size={18}/> ✅ COMPROBAR</button>
                <button onClick={shuffleRound} className="flex items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-white/5 px-4 py-3 font-bold"><Shuffle size={17}/> 🔀 MEZCLAR</button>
                <button onClick={runDebugger} className="flex items-center justify-center gap-2 rounded-lg bg-[var(--yellow)] px-4 py-3 font-black text-black"><Play size={17}/> ▶ VER SORT PASO A PASO</button>
              </div>

              {feedback && <div className={`mt-4 rounded-xl border p-3 ${feedback.type==="ok"?"border-green-500/50 bg-green-950/40":feedback.type==="bad"?"border-red-500/50 bg-red-950/40":"border-[var(--line)] bg-white/5"}`}><p className="font-bold [overflow-wrap:anywhere]">{feedback.title}</p><p className="mt-1 text-sm leading-relaxed [overflow-wrap:anywhere]">{feedback.text}</p></div>}
            </section>

            <section className="panel mt-3 p-3 sm:p-4">
              <h2 className="panel-title text-[var(--yellow)]">🔍 PANEL DE MUTACIÓN · SIEMPRE VISIBLE</h2>
              <p className="mono mt-3 rounded-lg bg-black/60 p-3 text-[13px] leading-relaxed [overflow-wrap:anywhere]">{mutation || `Antes: [${boxes.map(b=>b.peso).join(",")}] → Después: pendiente de ejecutar sort()`}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#cbd8ec] [overflow-wrap:anywhere]">sort() mutó el array original en el sitio. La variable <span className="mono">cajas</span> YA cambió. <span className="mono">toSorted()</span> NO mutaría.</p>
              {levelId==="n3" && <p className="mt-2 rounded-lg bg-red-950/40 p-2 text-sm [overflow-wrap:anywhere]">Sin comparador, JS convierte a strings: ['10','9','2'] → orden lexicográfico ['10','2','9'] ¡MAL! Con comparador numérico → [2,9,10] ✅</p>}
            </section>
          </main>

          {/* DERECHA */}
          <aside className="panel min-w-0 p-3">
            <div className="flex items-center justify-between gap-2"><h2 className="panel-title text-[var(--green)]">🖥 DEPURADOR AVANZADO: .sort()</h2><button onClick={()=>setLogs(["> Consola limpia."])} className="flex items-center gap-1 rounded border border-[var(--line)] px-2 py-1 text-xs font-bold"><Eraser size={13}/> LIMPIAR</button></div>
            <div className="mt-3 max-h-[560px] overflow-y-auto rounded-lg bg-black/70 p-3">
              {logs.map((l,i)=>(<p key={i} className="log-line mono mb-2 text-[12px] leading-relaxed text-[#bff3ff]">{l}</p>))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center">
              <div className="rounded-lg bg-white/5 p-2"><div className="text-[11px] text-[var(--muted)]">OBJETIVO</div><div className="text-sm font-bold">{direction==="asc"?"↑ MENOR → MAYOR":"↓ MAYOR → MENOR"}</div></div>
              <div className="rounded-lg bg-white/5 p-2"><div className="text-[11px] text-[var(--muted)]">ESPERADO</div><div className="mono text-[12px] [overflow-wrap:anywhere]">[{expectedWeights.join(",")}]</div></div>
              <div className="rounded-lg bg-white/5 p-2"><div className="text-[11px] text-[var(--muted)]">NIVEL 19</div><div className="flex items-center justify-center gap-1 text-sm font-bold"><Trophy size={14} className="text-[var(--yellow)]"/>{solved.has("n19")?"ENCARGADO":"—"}</div></div>
            </div>
            <div className="mt-3 rounded-lg border border-yellow-500/30 bg-yellow-950/20 p-3">
              <p className="flex gap-2 text-sm font-bold text-[var(--yellow)]"><AlertTriangle size={17} className="shrink-0"/> REGLA DE ORO</p>
              <p className="mt-1 text-sm leading-relaxed [overflow-wrap:anywhere]">Negativo → a primero. Cero → igual. Positivo → b primero. Nunca devuelvas <span className="mono">true/false</span>.</p>
            </div>
            <p className="mt-3 text-[12px] leading-relaxed text-[var(--muted)] [overflow-wrap:anywhere]">Puntuación: orden + comparador +10 · trampa booleana −5 · orden incorrecto −3 · código correcto +5 · Nivel 19 +20.</p>
          </aside>
        </div>

        <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-[var(--line)] pt-3 text-[12px] text-[var(--muted)]">
          <span className="flex items-center gap-1"><Package size={14}/> Almacén “El Comparador” · Aprende el comparador numérico, la mutación y el orden lexicográfico.</span>
          <span className="flex items-center gap-1"><RefreshCw size={13}/> Tu progreso (puntos, racha y niveles resueltos) se guarda para volver a jugar.</span>
        </footer>
      </div>
    </div>
  );
}
