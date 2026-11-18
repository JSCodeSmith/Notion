import React, { useEffect, useMemo, useRef, useState } from 'react';
import './index.css';

type Show = { hora: string; genero: string; tresD: boolean };
type Stage = { question: string; code: string; answer: number; expected: string[]; check: (f: Show) => boolean };
type Level = { id: string; short: string; title: string; shows: Show[]; stages: Stage[]; timeLimit?: number; base: number; special?: string };

const S = (hora: string, genero: string, tresD: boolean): Show => ({ hora, genero, tresD });
const baseShows = [S('12:00','Acción',false), S('15:00','Terror',true), S('18:00','Comedia',false), S('21:00','Terror',false), S('23:30','Acción',true)];
const LEVELS: Level[] = [
  { id:'r1', short:'Ronda 1', title:'Última de terror', shows: baseShows, base:10, stages:[{question:'¿En qué ÍNDICE está la última función de terror?', code:`funciones.findLastIndex(f => f.genero === "terror")`, answer:3, expected:[`f=>f.genero==='terror'`,`f=>f.genero==="terror"`], check:f=>f.genero==='Terror'}] },
  { id:'r2', short:'Ronda 2', title:'Última en 3D', shows:[S('12:00','Acción',false),S('14:00','Comedia',true),S('16:00','Terror',false),S('18:00','Acción',false),S('20:00','Terror',true),S('22:00','Comedia',false)], base:10, stages:[{question:'¿En qué ÍNDICE está la última función en 3D?', code:`funciones.findLastIndex(f => f.tresD)`, answer:4, expected:[`f=>f.tresD`,`f=>f.tresD===true`], check:f=>f.tresD}] },
  { id:'r3', short:'Ronda 3', title:'Última de acción', shows:[S('12:00','Terror',false),S('14:00','Comedia',true),S('16:00','Acción',false),S('18:00','Terror',true),S('20:00','Comedia',false),S('22:00','Acción',true)], base:10, stages:[{question:'¿En qué ÍNDICE está la última función de acción?', code:`funciones.findLastIndex(f => f.genero === "accion")`, answer:5, expected:[`f=>f.genero==='accion'`], check:f=>f.genero==='Acción'}] },
  { id:'r4', short:'Ronda 4', title:'Última antes de las 22:00', shows: baseShows, base:10, stages:[{question:'¿En qué ÍNDICE está la última función antes de las 22:00?', code:`funciones.findLastIndex(f => parseInt(f.hora) < 22)`, answer:3, expected:[`f=>parseint(f.hora)<22`], check:f=>parseInt(f.hora)<22}] },
  { id:'vs', short:'Primera vs Última', title:'Misma cartelera, dirección opuesta', shows: baseShows, base:10, stages:[
    {question:'Pregunta 1 · ¿ÍNDICE de la PRIMERA de terror?', code:`funciones.findIndex(f => f.genero === "terror")`, answer:1, expected:[`f=>f.genero==='terror'`], check:f=>f.genero==='Terror'},
    {question:'Pregunta 2 · ¿ÍNDICE de la ÚLTIMA de terror?', code:`funciones.findLastIndex(f => f.genero === "terror")`, answer:3, expected:[`f=>f.genero==='terror'`], check:f=>f.genero==='Terror'},
  ]},
  { id:'minus', short:'Modo -1', title:'La regla imposible', shows:[S('12:00','Terror',false),S('14:00','Acción',true),S('16:00','Terror',false),S('19:00','Terror',true),S('21:00','Comedia',true)], base:10, special:'-1', stages:[{question:'¿En qué ÍNDICE está la última de terror en 3D y antes de las 18:00?', code:`funciones.findLastIndex(f => f.genero === "terror" && f.tresD && parseInt(f.hora) < 18)`, answer:-1, expected:[`f=>f.genero==='terror'&&f.tresd&&parseint(f.hora)<18`], check:f=>f.genero==='Terror' && f.tresD && parseInt(f.hora)<18}] },
  { id:'time', short:'Contrarreloj', title:'8 segundos, jefe', shows: baseShows, base:10, timeLimit:8, stages:[{question:'¿En qué ÍNDICE está la última función de terror?', code:`funciones.findLastIndex(f => f.genero === "terror")`, answer:3, expected:[`f=>f.genero==='terror'`], check:f=>f.genero==='Terror'}] },
  { id:'boss', short:'Nivel 19', title:'JEFE NIVEL 19', shows:[S('12:00','Acción',false),S('13:00','Terror',true),S('14:00','Comedia',false),S('15:00','Terror',false),S('16:00','Acción',true),S('17:00','Terror',true),S('18:00','Comedia',true),S('19:00','Acción',false),S('20:00','Terror',false),S('20:30','Comedia',false),S('21:00','Terror',true),S('21:30','Acción',true),S('22:00','Comedia',false),S('22:30','Terror',false),S('23:00','Acción',false),S('23:30','Comedia',true),S('23:45','Terror',true),S('23:50','Acción',false),S('23:55','Comedia',false)], base:20, timeLimit:60, stages:[{question:'¿En qué ÍNDICE está la última de terror en 3D después de las 20:00?', code:`funciones.findLastIndex(f => f.genero === "terror" && f.tresD && parseInt(f.hora) >= 20)`, answer:16, expected:[`f=>f.genero==='terror'&&f.tresd&&parseint(f.hora)>=20`], check:f=>f.genero==='Terror' && f.tresD && parseInt(f.hora)>=20}] },
];

const sleep = (ms:number)=>new Promise(r=>setTimeout(r,ms));
const norm = (v:string)=>v.toLowerCase().replace(/\s+/g,'').replace(/[""]/g,"'").replace(/á/g,'a').replace(/ó/g,'o');

type SaveState = { points:number; streak:number; solved:string[]; log:string[] };
type ApiResp = { data?: any; error?: string };

async function api(action:string, args:any):Promise<ApiResp>{
  const res = await fetch("actions", {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({action, args})});
  if(!res.ok) throw new Error(`La conexión devolvió ${res.status}`);
  return await res.json();
}

function App(){
  const [levelId,setLevelId]=useState('r1');
  const [stageIdx,setStageIdx]=useState(0);
  const [selected,setSelected]=useState<number|null>(null);
  const [usedScan,setUsedScan]=useState(false);
  const [condition,setCondition]=useState('');
  const [conditionOk,setConditionOk]=useState(false);
  const [resolved,setResolved]=useState(false);
  const [success,setSuccess]=useState<boolean|null>(null);
  const [feedback,setFeedback]=useState('');
  const [score,setScore]=useState(0);
  const [streak,setStreak]=useState(0);
  const [solved,setSolved]=useState<string[]>([]);
  const [log,setLog]=useState<string[]>(['🎬 Turno de noche en “El Último Pase”. El jefe pide índices, no películas.']);
  const [debug,setDebug]=useState<string[]>(['> Depurador listo. Pulsa RECORRER o CONFIRMAR para ver el recorrido inverso.']);
  const [scanIdx,setScanIdx]=useState<number|null>(null);
  const [busy,setBusy]=useState(false);
  const [shake,setShake]=useState(false);
  const [timeLeft,setTimeLeft]=useState<number|null>(null);
  const [timedOut,setTimedOut]=useState(false);
  const [showRestart,setShowRestart]=useState(false);
  const [saveStatus,setSaveStatus]=useState('Sincronizando progreso…');
  const [recordId,setRecordId]=useState<string|null>(null);
  const loadedRef=useRef(false);
  const saveTimer=useRef<number|undefined>(undefined);
  const barRef=useRef<HTMLDivElement|null>(null);
  const dragRef=useRef(false);

  const level = LEVELS.find(l=>l.id===levelId)!;
  const stage = level.stages[stageIdx];
  const firstMatch = level.shows.findIndex(stage.check);
  const foundShow = stage.answer>=0 ? level.shows[stage.answer] : null;
  const progressKey = level.id + (level.stages.length>1 ? `:${stageIdx}` : '');

  const pushLog=(s:string)=>setLog(v=>[s,...v].slice(0,14));
  const addDebug=(s:string)=>setDebug(v=>[...v,s].slice(-30));

  useEffect(()=>{ (async()=>{
    try{
      const r=await api('records.list',{collection:'progreso-findlastindex'});
      if(r.error) throw new Error(r.error);
      const rec=r.data?.records?.[0];
      if(rec){ setRecordId(rec.id); const v:SaveState=rec.value||{}; setScore(v.points||0); setStreak(v.streak||0); setSolved(v.solved||[]); if(v.log?.length) setLog(v.log); setSaveStatus('Progreso guardado'); }
      else setSaveStatus('Progreso listo para guardarse');
    }catch{ setSaveStatus('Sin conexión: el progreso no se guardará hasta reconectar'); }
    loadedRef.current=true;
  })(); },[]);

  const persist=(next:SaveState)=>{
    if(!loadedRef.current) return;
    window.clearTimeout(saveTimer.current);
    saveTimer.current=window.setTimeout(async()=>{
      try{
        setSaveStatus('Guardando…');
        const payload={points:next.points, streak:next.streak, solved:next.solved, log:next.log};
        if(recordId){ const r=await api('records.replace',{collection:'progreso-findlastindex', id:recordId, value:payload}); if(r.error) throw new Error(r.error); }
        else { const r=await api('records.create',{collection:'progreso-findlastindex', value:payload}); if(r.error) throw new Error(r.error); if(r.data?.id) setRecordId(r.data.id); }
        setSaveStatus('Progreso guardado');
      }catch(e){ setSaveStatus('No se pudo guardar el progreso'); }
    },350);
  };
  const commit=(points:number, streakV:number, solvedV:string[], logV:string[])=>{ persist({points, streak:streakV, solved:solvedV, log:logV}); };

  const chooseLevel=(id:string)=>{
    const l=LEVELS.find(x=>x.id===id)!;
    setLevelId(id); setStageIdx(0); setSelected(null); setUsedScan(false); setCondition(''); setConditionOk(false); setResolved(false); setSuccess(null); setFeedback(''); setScanIdx(null); setTimedOut(false); setTimeLeft(l.timeLimit??null);
    setDebug([`> Nuevo nivel: ${l.title}`, `> Cartelera cargada con ${l.shows.length} funciones.`]);
  };
  useEffect(()=>{ setTimeLeft(level.timeLimit??null); },[levelId, stageIdx]);
  useEffect(()=>{
    if(timeLeft===null || resolved || timedOut || busy) return;
    if(timeLeft<=0){
      setTimedOut(true); setSuccess(false); setFeedback('¡Se acabó el tiempo! El jefe quería el índice ya.');
      const np=Math.max(0,score-3); const nl=[`⏱ Tiempo agotado en ${level.short}: −3 puntos.`,...log].slice(0,14);
      setScore(np); setStreak(0); setLog(nl); commit(np,0,solved,nl);
      setDebug(v=>[...v,'> ⏱ Tiempo agotado antes de confirmar.','> El recorrido no se completó a tiempo.']); return;
    }
    const t=window.setTimeout(()=>setTimeLeft(v=>(v??0)-1),1000); return ()=>window.clearTimeout(t);
  },[timeLeft,resolved,timedOut]);

  const indexFromPointer=(clientX:number)=>{
    const el=barRef.current; if(!el) return 0;
    const r=el.getBoundingClientRect(); const ratio=Math.max(0,Math.min(1,(clientX-r.left)/r.width));
    return Math.round(ratio*(level.shows.length-1));
  };
  const checkCondition=()=>{
    const ok=stage.expected.some(e=>norm(condition)===norm(e));
    setConditionOk(ok);
    if(condition.trim()){ setFeedback(ok?'✅ Condición correcta: +5 si aciertas esta ronda.':'La condición escrita no coincide exactamente con la esperada. Puedes intentarlo de nuevo antes de confirmar.'); }
  };

  const runDebugger=async()=>{
    setDebug([`> Ejecutando ${stage.code}`,'[Iteración desde el final]']);
    for(let i=level.shows.length-1;i>=0;i--){
      const f=level.shows[i]; const ok=stage.check(f); setScanIdx(i); addDebug(`[${i}] ${f.hora} ${f.genero} ${f.tresD?'3D':'2D'} — condición? ${ok} → ${ok?'✅ ¡ENCONTRADO! Se detiene aquí.':'sigue'}`);
      await sleep(600);
      if(ok) break;
      if(i===0) addDebug('Revisó todas de atrás hacia adelante, ninguna cumplió → devuelve -1.');
    }
    await sleep(250); setScanIdx(null);
    if(stage.answer>=0){ addDebug('🧠 Depurador: findLastIndex recorre de ATRÁS hacia ADELANTE. No revisó los índices anteriores porque ya encontró el último.'); addDebug(`> Resultado: ${stage.answer} ← Es un NÚMERO, no un objeto.`); }
    else { addDebug('🧠 Depurador: revisó todas, ninguna cumplió. findLast devolvería undefined; findLastIndex devuelve -1 porque devuelve un índice.'); addDebug('> Resultado: -1 ← “No encontrado” para índices.'); }
    addDebug(`⚖️ Comparación: findLast(...) → OBJETO ${stage.answer>=0?JSON.stringify(foundShow):'undefined'} | findLastIndex(...) → NÚMERO ${stage.answer}`);
    addDebug(`⚖️ vs findIndex: findIndex daría ${firstMatch} (primero desde el inicio), findLastIndex da ${stage.answer} (último desde el final).`);
  };
  const scan=async()=>{ if(busy||resolved) return; setBusy(true); setUsedScan(true); await runDebugger(); setBusy(false); };

  const confirm=async()=>{
    if(busy||resolved||timedOut) return;
    if(selected===null){ setFeedback('Elige un índice en la barra o pulsa −1 si crees que no hay coincidencia.'); return; }
    setBusy(true); await runDebugger();
    let delta=0; let ok=false; let msg=''; let newStreak=streak;
    if(selected===stage.answer){
      ok=true; delta=level.base + (usedScan?5:0) + (conditionOk?5:0); newStreak=streak+1;
      msg = level.id==='boss' ? `✅ ¡Jefe de sala! Índice ${selected} correcto. +${delta} puntos.` : `✅ Correcto. El índice es ${selected}. +${delta} puntos.`;
      if(usedScan) msg+=' Incluye +5 por usar Recorrer.'; if(conditionOk) msg+=' Incluye +5 por la condición.';
    } else if(selected===firstMatch && firstMatch!==stage.answer && stage.answer>=0){
      delta=-5; newStreak=0; msg=`Esa también cumple, pero findLastIndex busca desde el FINAL. El índice correcto es ${stage.answer}, no ${selected}.`;
    } else if(selected===-1 && stage.answer!==-1){
      delta=-3; newStreak=0; msg=`Hay una coincidencia en la cartelera, así que no es −1. El índice correcto es ${stage.answer}.`;
    } else {
      delta=-3; newStreak=0; msg=`La función en el índice ${selected} no cumple la regla.`;
    }
    const np=Math.max(0,score+delta); const isSolved=ok;
    const solvedNext = isSolved && !solved.includes(progressKey) ? [...solved,progressKey] : solved;
    setScore(np); setStreak(newStreak); setSuccess(ok); setResolved(ok); setFeedback(msg); if(!ok) setShake(true);
    const nl=[`${ok?'✅':'❌'} ${level.short}${level.stages.length>1?` · Pregunta ${stageIdx+1}`:''}: ${ok?`+${delta}`:`${delta}`} puntos (índice ${selected}).`,...log].slice(0,14);
    setLog(nl); if(isSolved) setSolved(solvedNext); commit(np,newStreak,solvedNext,nl);
    if(ok && level.stages.length>1 && stageIdx<level.stages.length-1){
      window.setTimeout(()=>{ setStageIdx(stageIdx+1); setSelected(null); setUsedScan(false); setCondition(''); setConditionOk(false); setResolved(false); setSuccess(null); setFeedback('Primera pregunta superada. Ahora cambia la dirección: busca desde el final.'); setDebug(v=>[...v,'> Siguiente pregunta: cambia la dirección del recorrido.']); },1600);
    }
    setBusy(false); window.setTimeout(()=>setShake(false),500);
  };

  const nextLevel=()=>{ const i=LEVELS.findIndex(l=>l.id===levelId); if(i<LEVELS.length-1) chooseLevel(LEVELS[i+1].id); };
  const restart=async()=>{
    setShowRestart(false); setScore(0); setStreak(0); setSolved([]); const nl=['🔄 Sala reiniciada. El jefe vuelve a pedir el primer índice.']; setLog(nl); commit(0,0,[],nl); chooseLevel('r1');
  };

  const markerLeft = useMemo(()=> selected===null ? 0 : selected===-1 ? -6 : (selected/(Math.max(1,level.shows.length-1)))*100, [selected,level]);

  return <div data-safe-area-inset-root style={{boxSizing:'border-box',paddingTop:'var(--safe-area-inset-top)',minHeight:'100vh',background:'var(--bg)'}} className="overflow-x-clip">
    <header data-safe-area-sticky-top style={{top:'var(--safe-area-inset-top)'}} className="sticky z-30 border-b border-[#1e2e4d] bg-[#030508]/95 backdrop-blur">
      <div className="mx-auto max-w-[1500px] px-3 py-3 sm:px-5">
        <div className="flex flex-wrap items-center gap-2">
          <div className="min-w-0 flex-1"><h1 className="text-[clamp(1.25rem,3.4vw,2rem)] font-bold leading-none tracking-wide"><span className="pink">🎬 CINE “EL ÚLTIMO PASE”</span> <span className="neon">— JEFE DE SALA</span></h1><p className="mono mt-1 text-[11px] sm:text-xs text-[#9cb1cf]">FINDLASTINDEX // DEVUELVE UN NÚMERO, NO UN OBJETO</p></div>
          <span className="rounded-full border border-emerald-400/50 bg-emerald-400/10 px-2 py-1 text-xs font-bold text-emerald-300">SIN API ✅</span>
          <span className="rounded-full border border-cyan-400/50 bg-cyan-400/10 px-3 py-1 text-sm font-bold">PUNTOS: <b className="neon">{score}</b></span>
          <span className="rounded-full border border-pink-500/50 bg-pink-500/10 px-3 py-1 text-sm font-bold">RACHA: {streak} 🔥</span>
        </div>
      </div>
    </header>

    <main className="mx-auto max-w-[1500px] px-3 py-4 sm:px-5 sm:py-6">
      <section className="panel mb-4 overflow-hidden p-4 sm:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold tracking-[.22em] text-cyan-300">EL CORAZÓN DEL JUEGO</p><h2 className="mt-1 text-[clamp(1.4rem,4vw,2.4rem)] font-bold leading-tight">Señala una <span className="neon">POSICIÓN</span>, no un objeto.</h2></div><div className="mono text-xs text-[#9cb1cf]">Recorrido inverso · derecha → izquierda</div></div>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-xl border border-[#1e2e4d] bg-black/30 p-3"><p className="font-bold text-pink-400">findLast</p><p className="mono mt-1 text-xs">→ devuelve el VALOR / OBJETO</p></div>
          <div className="rounded-xl border border-cyan-400 bg-cyan-400/10 p-3"><p className="font-bold text-cyan-300">findLastIndex ★</p><p className="mono mt-1 text-xs">→ devuelve la POSICIÓN / NÚMERO</p></div>
          <div className="rounded-xl border border-[#1e2e4d] bg-black/30 p-3"><p className="font-bold text-amber-300">findIndex</p><p className="mono mt-1 text-xs">→ busca desde el INICIO</p></div>
        </div>
      </section>

      <div className="grid items-start gap-4 lg:grid-cols-[300px_1fr_420px]">
        <aside className="space-y-4">
          <section className="panel p-4"><div className="flex items-center justify-between"><h2 className="text-lg font-bold">🎟 NIVELES</h2><span className="mono text-xs text-emerald-300">{solved.length} resueltos</span></div>
            <div className="mt-3 space-y-2">{LEVELS.map(l=>{ const done=l.stages.some((_,i)=>solved.includes(l.id+(l.stages.length>1?`:${i}`:''))); const active=l.id===levelId; return <button key={l.id} onClick={()=>chooseLevel(l.id)} className={`w-full rounded-xl border px-3 py-2.5 text-left transition ${active?'border-cyan-400 bg-cyan-400/10 shadow-[0_0_22px_rgba(56,232,255,.18)]':'border-[#1e2e4d] bg-black/20 hover:border-cyan-400/50'}`}><span className="flex justify-between gap-2"><b>{l.short}</b><span>{done?'✅':active?'▶':''}</span></span><span className="block text-sm text-[#9cb1cf]">{l.title}</span></button> })}</div>
            <div className="mt-4 rounded-xl border border-pink-500/30 bg-pink-500/5 p-3"><h3 className="font-bold text-pink-300">findLast vs findLastIndex</h3><p className="mono mt-2 text-[11px] leading-5">findLast(...) → OBJETO<br/>findLastIndex(...) → NÚMERO<br/><span className="text-emerald-300">Uno entrega la película. El otro, su butaca.</span></p></div>
          </section>
          <section className="panel p-4"><h2 className="font-bold">📓 BITÁCORA</h2><p className="mt-1 text-xs text-[#9cb1cf]">{saveStatus}</p><ul className="mt-3 space-y-2">{log.map((x,i)=><li key={i} className="rounded-lg bg-black/25 px-2.5 py-2 text-sm leading-snug">{x}</li>)}</ul>
            {!showRestart ? <button onClick={()=>setShowRestart(true)} className="mt-3 w-full rounded-lg border border-red-400/50 py-2 font-bold text-red-300">↺ REINICIAR SALA</button> : <div className="mt-3 rounded-lg border border-red-400/40 p-2 text-center text-sm">¿Borrar puntos y niveles?<div className="mt-2 flex gap-2"><button onClick={restart} className="flex-1 rounded-md bg-red-500 py-2 font-bold">Sí, reiniciar</button><button onClick={()=>setShowRestart(false)} className="flex-1 rounded-md border py-2">Cancelar</button></div></div>}
          </section>
        </aside>

        <section className={`panel p-4 sm:p-5 ${shake?'shake':''}`}>
          <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="text-2xl font-bold tracking-wide">🎬 CARTELERA</h2>{timeLeft!==null && <div className={`mono rounded-xl border px-3 py-2 text-xl font-bold ${timeLeft<=5?'border-red-400 bg-red-500/15 text-red-300':'border-amber-300 bg-amber-300/10 text-amber-200'}`}>⏱ {timeLeft}s</div>}{level.id==='boss' && <span className="rounded-full bg-yellow-300 px-3 py-1 text-xs font-black text-black">👑 JEFE NIVEL 19 · +20</span>}</div>
          <p className="mt-1 text-sm text-[#9cb1cf]">Orden cronológico · {level.title} · Pregunta {stageIdx+1} de {level.stages.length}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-5">{level.shows.map((f,i)=>{ const isSel=selected===i; const isScan=scanIdx===i; const isRight=resolved&&success&&selected===i; return <article key={i} className={`relative min-w-0 rounded-2xl border p-3 text-center transition ${isRight?'correct-card':isSel?'border-cyan-300 bg-cyan-400/10':isScan?'border-yellow-300 bg-yellow-300/10 scanning':'border-[#1e2e4d] bg-[#0a101d]'}`}><div className="mono text-2xl font-bold text-cyan-300">[{i}]</div><div className="mt-1 text-xl font-bold">{f.hora}</div><div className="mt-1 text-sm font-semibold">{f.genero}</div><div className={`mono mt-2 inline-block rounded-full px-2 py-0.5 text-[11px] ${f.tresD?'bg-fuchsia-500/20 text-fuchsia-200':'bg-slate-500/20 text-slate-300'}`}>{f.tresD?'3D':'2D'}</div>{isScan&&<div className="mt-2 text-xs text-yellow-300">◀ revisando…</div>}</article> })}</div>

          <div className="mt-6 rounded-2xl border border-cyan-400/40 bg-cyan-400/5 p-4"><p className="text-xs font-bold tracking-[.2em] text-cyan-300">REGLA DEL JEFE</p><h3 className="mt-1 text-[clamp(1.25rem,3vw,1.8rem)] font-bold leading-snug">🎯 {stage.question}</h3><p className="mt-2 text-sm text-[#9cb1cf]">Responde con un <b className="text-white">NÚMERO</b>. Arrastra el marcador 👆 o pulsa un índice.</p></div>

          <div className="mt-5"><div className="mb-2 flex items-center justify-between"><b>BARRA DE ÍNDICES</b><span className="mono text-xs text-[#9cb1cf]">{selected===null?'Sin selección':selected===-1?'Seleccionado: −1':`Seleccionado: ${selected}`}</span></div>
            <div ref={barRef} className="no-select relative h-16 rounded-2xl border border-[#1e2e4d] bg-black/40 px-2" onPointerDown={(e)=>{ if(resolved||busy) return; dragRef.current=true; (e.target as HTMLElement).setPointerCapture?.(e.pointerId); setSelected(indexFromPointer(e.clientX)); }} onPointerMove={(e)=>{ if(dragRef.current) setSelected(indexFromPointer(e.clientX)); }} onPointerUp={()=>dragRef.current=false} onPointerCancel={()=>dragRef.current=false}>
              <div className="absolute left-2 right-2 top-1/2 h-1 -translate-y-1/2 rounded bg-[#24385f]" />
              <div className="absolute inset-x-2 top-1/2 flex -translate-y-1/2 justify-between">{level.shows.map((_,i)=><button key={i} aria-label={`Elegir índice ${i}`} onClick={(e)=>{e.stopPropagation(); if(!resolved&&!busy) setSelected(i);}} className={`z-10 flex h-10 w-10 items-center justify-center rounded-full border text-sm font-bold sm:h-11 sm:w-11 ${selected===i?'border-cyan-300 bg-cyan-400 text-black shadow-[0_0_20px_#38e8ff]':resolved&&success&&selected===i?'border-emerald-400 bg-emerald-400 text-black':'border-[#3a527f] bg-[#0a101d] text-white hover:border-cyan-300'}`}>{i}</button>)}</div>
              <div className="pointer-events-none absolute -top-1 z-20 text-2xl transition-all" style={{left:`calc(${selected===null?0:markerLeft}% + ${selected===null?8:selected===-1?0:8}px)`}}>👆</div>
            </div>
            <p className="mt-2 text-center text-xs text-[#9cb1cf]">Arrastra el marcador sobre la barra. En móvil, desliza el dedo.</p>
          </div>

          {level.special==='-1' && <button onClick={()=>setSelected(-1)} className={`mt-4 w-full rounded-xl border-2 py-3 text-xl font-black ${selected===-1?'border-red-400 bg-red-500 text-white':'border-red-400/60 bg-red-500/10 text-red-200'}`}>−1 · NINGUNA CUMPLE LA REGLA</button>}

          <div className="mt-4 grid gap-2 sm:grid-cols-3"><button onClick={scan} disabled={busy||resolved} className="rounded-xl bg-cyan-400 px-3 py-3 font-bold text-black">▶ RECORRER DESDE EL FINAL</button><button onClick={confirm} disabled={busy||resolved||timedOut} className="rounded-xl bg-emerald-400 px-3 py-3 font-bold text-black">✅ CONFIRMAR ÍNDICE</button><button onClick={nextLevel} disabled={levelId==='boss'} className="rounded-xl border border-fuchsia-400/60 bg-fuchsia-500/10 px-3 py-3 font-bold text-fuchsia-200">➡️ SIGUIENTE</button></div>

          <div className="mt-4 rounded-xl border border-[#1e2e4d] bg-black/25 p-3"><label className="text-sm font-bold">✍️ Escribe la condición para +5 <span className="font-normal text-[#9cb1cf]">(opcional)</span></label><div className="mt-2 flex flex-col gap-2 sm:flex-row"><input value={condition} onChange={e=>setCondition(e.target.value)} placeholder="ej: f => f.genero === 'terror'" className="mono min-w-0 flex-1 rounded-lg border border-[#2b4270] bg-[#030508] px-3 py-2.5 text-sm outline-none focus:border-cyan-400" /><button onClick={checkCondition} className="rounded-lg border border-cyan-400/60 px-4 py-2.5 font-bold text-cyan-200">Comprobar</button></div>{conditionOk && <p className="mt-2 text-sm text-emerald-300">✅ Condición correcta. Se sumará al acertar.</p>}</div>

          {feedback && <div className={`mt-4 rounded-xl border p-4 text-base font-semibold leading-snug ${success?'border-emerald-400 bg-emerald-400/10 text-emerald-200':'border-red-400/60 bg-red-500/10 text-red-100'}`} role="status">{feedback}</div>}
          {resolved && <div className="mt-4 rounded-2xl border border-emerald-400/50 bg-emerald-400/5 p-4"><h3 className="font-bold text-emerald-300">⚖️ COMPARACIÓN DIDÁCTICA — SIEMPRE VISIBLE AL FINAL</h3><p className="mono mt-3 break-words text-sm leading-6">findLast(...) → OBJETO: {foundShow?JSON.stringify(foundShow):'undefined'}<br/>findLastIndex(...) → NÚMERO: {stage.answer}</p><p className="mt-2 text-sm text-[#cbd8ec]">Uno devuelve el objeto. El otro, solo su posición. {level.id==='vs' && 'findIndex → 1, findLastIndex → 3. Misma condición, dirección opuesta.'}</p></div>}
        </section>

        <aside className="panel overflow-hidden lg:sticky lg:top-24"><div className="border-b border-[#1e2e4d] bg-[#0a101d] px-4 py-3"><h2 className="text-lg font-bold">🛠️ DEPURADOR AVANZADO</h2><p className="mono text-xs text-cyan-300">.findLastIndex() · recorrido inverso</p></div><div className="debug-scroll max-h-[560px] overflow-y-auto p-4"><div className="mono space-y-2 text-[12px] leading-5">{debug.map((line,i)=><p key={i} className={line.includes('ENCONTRADO')?'text-emerald-300':line.startsWith('> Resultado')?'font-bold text-cyan-300':line.includes('Comparación')?'text-amber-200':'text-[#cbd8ec]'}>{line}</p>)}</div><div className="mt-5 rounded-xl border border-[#1e2e4d] bg-black/30 p-3"><p className="text-sm font-bold text-cyan-200">Código real al final</p><p className="mono mt-2 break-words text-xs leading-5 text-emerald-200">{stage.code} <span className="text-white">// → {stage.answer}</span></p><p className="mt-3 text-sm leading-6 text-[#cbd8ec]">🧠 findLastIndex recorre de <b>atrás hacia adelante</b>. Al encontrar, se detiene: no revisa lo anterior. Si nada cumple, devuelve <b>−1</b>, no <i>undefined</i>, porque devuelve un índice.</p></div><div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs"><div className="rounded-lg bg-black/30 p-2">+10<br/>acierto</div><div className="rounded-lg bg-black/30 p-2">+5<br/>recorrer</div><div className="rounded-lg bg-black/30 p-2">−5 / −3<br/>errores</div></div></div></aside>
      </div>
      <footer className="mt-4 text-center text-xs text-[#7d90ae]">Cine “El Último Pase” · El jefe pide el número de butaca, no la película. · Tu progreso se guarda para continuar la función.</footer>
    </main>
  </div>
}

export default App;
