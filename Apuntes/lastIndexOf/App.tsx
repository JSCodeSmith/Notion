import React, { useEffect, useMemo, useRef, useState } from "react";
import { Play, Check, ArrowRight, RotateCcw, Search, Zap, Timer, Trophy, Shield, ChevronRight, TerminalSquare, BookOpen, Crosshair } from "lucide-react";

type Weapon = "Pistola" | "Daga" | "Arco" | "Hacha" | "Cuchillo" | "Ballesta";
const EMOJI: Record<string,string> = { Pistola:"🔫", Daga:"🗡", Arco:"🏹", Hacha:"🪓", Cuchillo:"🔪", Ballesta:"🎯" };
const BASE: Weapon[] = ["Pistola","Daga","Pistola","Arco","Pistola","Daga","Arco"];
const NIVEL19: Weapon[] = ["Pistola","Daga","Arco","Hacha","Cuchillo","Pistola","Arco","Daga","Pistola","Hacha","Arco","Cuchillo","Pistola","Daga","Arco","Cuchillo","Pistola","Hacha","Arco"];

type Challenge = { id:string; title:string; inventory:Weapon[]; target:Weapon; answer:number; method:"lastIndexOf"|"indexOf"; hint:string };
type SavedRow = { id:string; value:any };

async function api(action:string, args:any){
  const res = await fetch("actions", { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(()=>({}));
  if(!res.ok || json.error) throw new Error(json.error || `Error ${res.status}`);
  return json.data;
}

function lastIdx(arr:Weapon[], t:Weapon){ return arr.lastIndexOf(t); }
function firstIdx(arr:Weapon[], t:Weapon){ return arr.indexOf(t); }

function randomInventory(): Weapon[]{
  const pool:Weapon[] = ["Pistola","Daga","Arco","Hacha","Cuchillo"];
  return Array.from({length:20},()=>pool[Math.floor(Math.random()*pool.length)]);
}

export default function App(){
  const [points,setPoints] = useState(0);
  const [streak,setStreak] = useState(0);
  const [mode,setMode] = useState<"rondas"|"versus"|"infinito"|"nivel19">("rondas");
  const [roundIdx,setRoundIdx] = useState(0);
  const [versusIdx,setVersusIdx] = useState(0);
  const [infinitoSeed,setInfinitoSeed] = useState(1);
  const [infinitoData,setInfinitoData] = useState<{inv:Weapon[]; target:Weapon}|null>(null);
  const [selected,setSelected] = useState<number|null>(null);
  const [confirmed,setConfirmed] = useState(false);
  const [feedback,setFeedback] = useState("");
  const [isCorrect,setIsCorrect] = useState<boolean|null>(null);
  const [traverseIdx,setTraverseIdx] = useState<number|null>(null);
  const [isTraversing,setIsTraversing] = useState(false);
  const [usedTraverse,setUsedTraverse] = useState(false);
  const [code,setCode] = useState("");
  const [codeValid,setCodeValid] = useState(false);
  const [codeMsg,setCodeMsg] = useState("");
  const [debugLines,setDebugLines] = useState<string[]>(["> Consola lista. Pulsa RECORRER o CONFIRMAR para depurar.", "ℹ️ lastIndexOf busca desde el FINAL. indexOf busca desde el INICIO."]);
  const [log,setLog] = useState<string[]>(["Bitácora abierta. El búnker está en silencio."]);
  const [resolved,setResolved] = useState<Set<string>>(new Set());
  const [saved,setSaved] = useState<SavedRow[]>([]);
  const [saveStatus,setSaveStatus] = useState("Cargando bitácora guardada…");
  const [timeLeft,setTimeLeft] = useState(60);
  const [timerOn,setTimerOn] = useState(false);
  const [showCode,setShowCode] = useState(false);
  const timerRef = useRef<any>(null);
  const traverseRef = useRef<any>(null);

  const challenge:Challenge = useMemo(()=>{
    if(mode==="rondas"){
      const targets:Weapon[] = ["Pistola","Daga","Arco","Ballesta"];
      const t = targets[roundIdx] || "Pistola";
      return { id:`ronda-${roundIdx+1}`, title:`RONDA ${roundIdx+1} — Última ${t}`, inventory:BASE, target:t, answer:lastIdx(BASE,t), method:"lastIndexOf", hint: t==="Ballesta" ? "No está en el inventario." : "Hay varias. Busca la ÚLTIMA." };
    }
    if(mode==="versus"){
      const isFirst = versusIdx===0;
      return { id:`versus-${versusIdx}`, title: isFirst ? "PRIMERA vs ÚLTIMA · PRIMERA Pistola" : "PRIMERA vs ÚLTIMA · ÚLTIMA Pistola", inventory:BASE, target:"Pistola", answer: isFirst?0:4, method: isFirst?"indexOf":"lastIndexOf", hint:"Misma armería. Cambia la dirección." };
    }
    if(mode==="nivel19"){
      return { id:"nivel-19", title:"NIVEL 19 — Última Hacha 🪓", inventory:NIVEL19, target:"Hacha", answer:17, method:"lastIndexOf", hint:"Búnker grande: 19 armas. La última Hacha está al final." };
    }
    const inv = infinitoData?.inv || BASE;
    const target = infinitoData?.target || "Pistola";
    return { id:`infinito-${infinitoSeed}`, title:`MODO INFINITO · Última ${target}`, inventory:inv, target, answer:lastIdx(inv,target), method:"lastIndexOf", hint:"20 armas generadas. Sigue el rastro desde el final." };
  },[mode,roundIdx,versusIdx,infinitoData,infinitoSeed]);

  const firstOccurrence = useMemo(()=> challenge.inventory.indexOf(challenge.target), [challenge]);
  const comparison = `indexOf('${challenge.target}') → ${firstOccurrence} (primera)  |  lastIndexOf('${challenge.target}') → ${challenge.answer} (última)`;

  // Cargar partidas guardadas
  useEffect(()=>{
    (async()=>{
      try{
        const data = await api("records.list", { collection:"rastro_del_final" });
        const rows = data?.records || [];
        setSaved(rows);
        setSaveStatus(rows.length ? `✓ ${rows.length} resultado(s) guardado(s) en la bitácora.` : "Bitácora guardada vacía. Completa una ronda para guardar.");
      }catch(e){ setSaveStatus("Guardado no disponible ahora. El juego sigue en local."); }
    })();
  },[]);

  // Generar infinito al entrar
  useEffect(()=>{
    if(mode==="infinito" && !infinitoData){
      const inv = randomInventory(); const target = inv[Math.floor(Math.random()*inv.length)];
      setInfinitoData({inv,target});
    }
  },[mode,infinitoData]);

  // Temporizador Nivel 19
  useEffect(()=>{
    if(mode==="nivel19" && !confirmed && !timerOn){ setTimeLeft(60); setTimerOn(true); }
    if(mode!=="nivel19"){ setTimerOn(false); if(timerRef.current) clearInterval(timerRef.current); }
  },[mode,confirmed,timerOn]);
  useEffect(()=>{
    if(!timerOn || confirmed) return;
    timerRef.current = setInterval(()=> setTimeLeft(t=>{
      if(t<=1){ clearInterval(timerRef.current); setTimerOn(false); setConfirmed(true); setIsCorrect(false); setFeedback("⏰ Tiempo agotado. En el Nivel 19 tenías 60 s. La última Hacha era el índice 17."); setDebugLines(p=>[...p,"> ⏰ Tiempo agotado en Nivel 19."]); return 0; }
      return t-1;
    }),1000);
    return ()=> clearInterval(timerRef.current);
  },[timerOn,confirmed]);

  function resetChallenge(keepPoints=true){
    setSelected(null); setConfirmed(false); setFeedback(""); setIsCorrect(null); setTraverseIdx(null); setIsTraversing(false); setUsedTraverse(false); setCode(""); setCodeValid(false); setCodeMsg(""); setShowCode(false);
    setDebugLines([`> Nuevo reto: ${challenge.title}`, `> inventario = [${challenge.inventory.map(x=>`'${x}'`).join(", ")}]`]);
    if(traverseRef.current) clearTimeout(traverseRef.current);
  }
  // Al cambiar de reto, limpiar (evita bucles usando key)
  useEffect(()=>{ resetChallenge(); /* eslint-disable-next-line */ },[challenge.id]);

  function selectMode(m:typeof mode){
    setMode(m); if(m==="infinito"){ const inv=randomInventory(); const target=inv[Math.floor(Math.random()*inv.length)]; setInfinitoData({inv,target}); setInfinitoSeed(s=>s+1); }
    if(m==="rondas") setRoundIdx(0); if(m==="versus") setVersusIdx(0);
    setLog(p=>[...p, `→ Cambiaste a ${m}.`]);
  }
  function goRound(i:number){ setMode("rondas"); setRoundIdx(i); setLog(p=>[...p, `→ Fuiste a la Ronda ${i+1}.`]); }
  function nextRound(){
    if(mode==="rondas"){ if(roundIdx<3) setRoundIdx(roundIdx+1); else selectMode("versus"); }
    else if(mode==="versus"){ if(versusIdx===0) setVersusIdx(1); else selectMode("infinito"); }
    else if(mode==="infinito"){ const inv=randomInventory(); const target=inv[Math.floor(Math.random()*inv.length)]; setInfinitoData({inv,target}); setInfinitoSeed(s=>s+1); }
    else if(mode==="nivel19"){ setTimeLeft(60); setTimerOn(true); }
  }

  function validateCode(){
    const norm = code.replace(/\s+/g,"").replace(/"/g,"'").toLowerCase();
    const expected = `inventario.${challenge.method}('${challenge.target.toLowerCase()}')`;
    const ok = norm.includes(`${challenge.method}('${challenge.target.toLowerCase()}')`) || norm.includes(expected);
    if(ok){ if(!codeValid){ setCodeValid(true); setCodeMsg("✓ Código correcto. +5 al confirmar si aciertas."); } else setCodeMsg("Ya tienes el bonus de código para esta ronda."); }
    else setCodeMsg(`✗ Revisa: se espera inventario.${challenge.method}('${challenge.target}')`);
  }

  function buildDebug(selectedVal:number|null){
    const lines:string[] = [];
    const inv = challenge.inventory;
    if(challenge.method==="lastIndexOf"){
      lines.push(`> Ejecutando inventario.lastIndexOf('${challenge.target}')`);
      lines.push(`[Recorrido ←←← desde el final]`);
      for(let i=inv.length-1;i>=0;i--){
        const eq = inv[i]===challenge.target;
        lines.push(`[${i}] ${inv[i]} === '${challenge.target}'? ${eq} ${eq?"→ ✅ ¡ENCONTRADO! Se detiene aquí.":"→ sigue"}`);
        if(eq) break;
      }
      if(challenge.answer===-1) lines.push(`Revisó [${inv.length-1}]…[0], ninguno === '${challenge.target}' → devuelve -1.`);
      else lines.push(`🧠 Depurador: lastIndexOf usa IGUALDAD EXACTA === y recorre de ATRÁS hacia ADELANTE. No revisó los índices anteriores porque ya encontró la última.`);
      lines.push(`> Resultado: ${challenge.answer} ← Es un NÚMERO, la posición de la ÚLTIMA aparición.`);
      lines.push(`⚖️ Comparación: ${comparison} | findLastIndex(...) → ${challenge.answer} pero con condición`);
    } else {
      lines.push(`> Ejecutando inventario.indexOf('${challenge.target}')`);
      lines.push(`[Recorrido →→→ desde el inicio]`);
      for(let i=0;i<inv.length;i++){ const eq=inv[i]===challenge.target; lines.push(`[${i}] ${inv[i]} === '${challenge.target}'? ${eq} ${eq?"→ ✅ ¡ENCONTRADO! Se detiene aquí.":"→ sigue"}`); if(eq) break; }
      lines.push(`> Resultado: ${challenge.answer} ← Es un NÚMERO, la posición de la PRIMERA aparición.`);
      lines.push(`⚖️ Comparación: ${comparison}`);
    }
    return lines;
  }

  function runTraverse(){
    if(isTraversing || confirmed) return;
    setUsedTraverse(true); setIsTraversing(true);
    const inv = challenge.inventory;
    const steps = challenge.method==="lastIndexOf" ? Array.from({length:inv.length},(_,k)=>inv.length-1-k) : Array.from({length:inv.length},(_,k)=>k);
    let idx=0;
    const lines:string[] = [`> Ejecutando inventario.${challenge.method}('${challenge.target}')`];
    setDebugLines(lines);
    const tick=()=>{
      if(idx>=steps.length){ setIsTraversing(false); setTraverseIdx(null); setDebugLines(p=>[...p, challenge.answer===-1 ? `Revisó todos, ninguno === '${challenge.target}' → devuelve -1.` : `✅ Se detiene en ${challenge.answer}.`]); return; }
      const i = steps[idx]; setTraverseIdx(i);
      const eq = inv[i]===challenge.target;
      setDebugLines(p=>[...p, `[${i}] ${inv[i]} === '${challenge.target}'? ${eq} ${eq?"→ ✅ ¡ENCONTRADO!":"→ sigue"}`]);
      idx++;
      if(eq){ setTimeout(()=>{ setIsTraversing(false); setTraverseIdx(i); }, 450); return; }
      traverseRef.current=setTimeout(tick, 420);
    };
    traverseRef.current=setTimeout(tick, 200);
    setLog(p=>[...p, `🔦 Recorriste ${challenge.method==="lastIndexOf"?"desde el final ←←←":"desde el inicio →→→"}.`]);
  }

  async function confirm(){
    if(selected===null){ setFeedback("Elige un número en la barra de índices (o -1)."); return; }
    const correct = selected===challenge.answer;
    let delta=0; let msg="";
    if(correct){
      delta = mode==="nivel19" ? 20 : 10;
      if(codeValid) delta+=5;
      if(usedTraverse) delta+=5;
      msg = challenge.answer===-1 ? `✅ Correcto. lastIndexOf devuelve -1 porque '${challenge.target}' no está en el inventario.` : `✅ Correcto. inventario.${challenge.method}('${challenge.target}') // → ${challenge.answer}`;
      if(mode==="nivel19") msg += " 🏅 Badge: EXPLORADOR NIVEL 19 desbloqueado.";
    } else {
      if(challenge.method==="lastIndexOf" && selected===firstOccurrence && challenge.answer!==firstOccurrence){ delta=-5; msg=`❌ Error típico: esa también es ${challenge.target}, pero lastIndexOf devuelve la ÚLTIMA aparición. La respuesta era ${challenge.answer}.`; }
      else if(challenge.answer===-1){ delta=-3; msg=`❌ lastIndexOf devuelve -1 porque '${challenge.target}' no está en el inventario.`; }
      else if(selected>=0 && challenge.inventory[selected]===challenge.target){ delta=-5; msg=`❌ Esa también es ${challenge.target}, pero no es la ÚLTIMA. La respuesta era ${challenge.answer}.`; }
      else { delta=-3; msg=`❌ No es ${selected}. Revisa el recorrido ←←←. La respuesta era ${challenge.answer}.`; }
    }
    const newPoints = points+delta;
    setPoints(newPoints); setStreak(correct? streak+1:0); setConfirmed(true); setIsCorrect(correct); setFeedback(msg);
    setDebugLines(buildDebug(selected));
    setResolved(prev=>{ const n=new Set(prev); n.add(challenge.id); return n; });
    setLog(p=>[...p, `${correct?"✅":"❌"} ${challenge.title}: elegiste ${selected}, respuesta ${challenge.answer} (${delta>=0?"+":""}${delta})`]);
    if(timerRef.current) clearInterval(timerRef.current);
    // Guardar resultado
    setSaveStatus("Guardando resultado…");
    const key = `rastro-${challenge.id}-${Date.now()}`;
    try{
      const data = await api("records.create", { collection:"rastro_del_final", idempotency_key:key, value:{ challenge:challenge.title, target:challenge.target, selected, answer:challenge.answer, correct, delta, totalPoints:newPoints, at:new Date().toISOString() } });
      if(data?.record) setSaved(p=>[data.record,...p].slice(0,20));
      setSaveStatus("✓ Resultado guardado en la bitácora.");
    }catch(e:any){ setSaveStatus("No se pudo guardar ahora. Tu partida sigue en pantalla."); }
  }

  function restartAll(){
    setPoints(0); setStreak(0); setResolved(new Set()); setMode("rondas"); setRoundIdx(0); setLog(["Bitácora reiniciada. Vuelves a la entrada del búnker."]); setSaveStatus("Partida reiniciada. El marcador vuelve a 0.");
  }

  const roundsList = [
    {n:1,label:"Última Pistola",id:"ronda-0",ans:"→ 4"},
    {n:2,label:"Última Daga",id:"ronda-1",ans:"→ 5"},
    {n:3,label:"Último Arco",id:"ronda-2",ans:"→ 6"},
    {n:4,label:"Última Ballesta",id:"ronda-3",ans:"→ -1"},
  ];

  return (
    <div data-safe-area-inset-root style={{boxSizing:"border-box", paddingTop:"var(--safe-area-inset-top)", minHeight:"100vh", background:"var(--bg)"}} className="overflow-x-clip relative">
      {/* polvo / ambiente */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(14)].map((_,i)=><span key={i} className="dust" style={{left:`${(i*71)%100}%`, top:`${60+(i*13)%35}%`, animationDelay:`${i*0.7}s`}} />)}
        <div className="absolute inset-0" style={{background:"radial-gradient(600px 300px at 70% 0%, rgba(70,255,138,.10), transparent 60%), radial-gradient(500px 300px at 10% 100%, rgba(255,207,77,.06), transparent 60%)"}} />
      </div>

      <div className="relative mx-auto max-w-[1500px] px-3 sm:px-5 pb-8">
        {/* HEADER */}
        <header data-safe-area-sticky-top style={{top:"var(--safe-area-inset-top)"}} className="sticky z-20 -mx-1 px-1 pt-3 pb-3" >
          <div className="panel flex flex-wrap items-center gap-3 px-4 py-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="text-3xl">🔦</div>
              <div className="min-w-0">
                <h1 className="text-[clamp(18px,3vw,30px)] leading-none font-bold tracking-wide [overflow-wrap:anywhere]">BÚNKER <span className="neon">‘LA ÚLTIMA ARMA’</span> <span className="hidden sm:inline text-white/60 text-base">— EXPLORADOR</span></h1>
                <p className="text-[12px] tracking-[.22em] text-[#9db8a6] mt-1">EL RASTRO DEL FINAL · lastIndexOf</p>
              </div>
            </div>
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <span className="chip bg-black/40">SIN API ✅</span>
              <span className="chip bg-black/40">NIVEL 19 🔒</span>
              <span className="chip bg-[#0a1f12] text-[#46ff8a] font-bold">PUNTOS: {points}</span>
              <span className="chip bg-[#221a05] text-[#ffcf4d] font-bold">RACHA: {streak} 🔥</span>
              <button onClick={restartAll} className="chip bg-[#1a0b0e] text-white flex items-center gap-1"><RotateCcw size={13}/> REINICIAR</button>
            </div>
          </div>
        </header>

        <div className="grid gap-4 lg:grid-cols-[300px_1fr_420px] items-start">
          {/* IZQUIERDA */}
          <aside className="space-y-4">
            <section className="panel p-4">
              <h2 className="font-bold text-lg flex items-center gap-2"><Crosshair size={18} className="text-[#46ff8a]"/> 🎯 RONDAS</h2>
              <div className="mt-3 space-y-2">
                {roundsList.map(r=>(
                  <button key={r.id} onClick={()=>goRound(r.n-1)} className={`w-full text-left px-3 py-2.5 rounded-xl border flex items-center justify-between gap-2 ${challenge.id===r.id?"border-[#46ff8a] bg-[#0a1f12]":"border-[#1d3a28] bg-black/30 hover:bg-black/50"}`}>
                    <span className="font-semibold [overflow-wrap:anywhere]">Ronda {r.n} · {r.label}</span>
                    <span className="text-sm whitespace-nowrap">{resolved.has(r.id)?"✅":challenge.id===r.id?"◉":"○"} {resolved.has(r.id)?r.ans:""}</span>
                  </button>
                ))}
              </div>
              <div className="mt-3 grid gap-2">
                <button onClick={()=>selectMode("versus")} className={`px-3 py-2.5 rounded-xl border text-left font-semibold ${mode==="versus"?"border-[#ffcf4d] bg-[#221a05]":"border-[#1d3a28] bg-black/30"}`}>⚖️ Modo PRIMERA vs ÚLTIMA <span className="block text-xs font-normal text-[#9db8a6]">indexOf ↔ lastIndexOf · misma igualdad, dirección opuesta</span></button>
                <button onClick={()=>selectMode("infinito")} className={`px-3 py-2.5 rounded-xl border text-left font-semibold ${mode==="infinito"?"border-[#46ff8a] bg-[#0a1f12]":"border-[#1d3a28] bg-black/30"}`}>♾️ Modo INFINITO <span className="block text-xs font-normal text-[#9db8a6]">20 armas aleatorias</span></button>
                <button onClick={()=>selectMode("nivel19")} className={`px-3 py-2.5 rounded-xl border text-left font-semibold ${mode==="nivel19"?"border-[#ff4d5e] bg-[#22100f]":"border-[#1d3a28] bg-black/30"}`}>🏆 Nivel 19 · Búnker grande <span className="block text-xs font-normal text-[#9db8a6]">19 armas · 60 s · +20 · badge EXPLORADOR</span></button>
              </div>
              <div className="mt-3 flex items-center justify-between text-xs text-[#9db8a6]"><span>Progreso</span><span>{resolved.size} reto(s) resuelto(s)</span></div>
              <div className="h-2 bg-black/50 rounded-full overflow-hidden"><div className="h-full bg-[#46ff8a] transition-all" style={{width:`${Math.min(100,resolved.size*18)}%`}}/></div>
            </section>

            <section className="panel p-4">
              <h3 className="font-bold flex gap-2 items-center"><BookOpen size={16}/> indexOf vs lastIndexOf</h3>
              <div className="code mt-3 text-[13px] leading-relaxed bg-black/60 border border-[#1d3a28] rounded-xl p-3 [overflow-wrap:anywhere]">
                <div><span className="text-[#8dffb8]">indexOf('Pistola')</span> → 0 <span className="text-[#9db8a6]">(primera)</span></div>
                <div className="mt-2"><span className="text-[#ffcf4d]">lastIndexOf('Pistola')</span> → 4 <span className="text-[#9db8a6]">(última)</span></div>
                <div className="mt-2 text-[#9db8a6]">findLastIndex(...) → 4 pero con condición, no con igualdad exacta.</div>
                <div className="mt-3 text-white/90">Igualdad exacta <b>===</b> + recorrido <b>←←←</b> + última aparición.</div>
              </div>
              <p className="text-sm text-[#9db8a6] mt-3 leading-snug">Error típico: elegir la primera aparición (confundir con <span className="code">indexOf</span>). Aquí manda la <b className="text-white">última</b>.</p>
              <div className="mt-3 text-xs border-t border-[#1d3a28] pt-3">
                <div className="font-bold tracking-wider text-[#46ff8a]">📓 BITÁCORA</div>
                <div className="mt-2 space-y-1.5 max-h-[180px] overflow-y-auto pr-1">
                  {log.slice(-12).map((l,i)=><div key={i} className="text-[#cfe8d6] leading-snug [overflow-wrap:anywhere]">{l}</div>)}
                </div>
                <div className="mt-2 text-[#9db8a6]">{saveStatus}</div>
                {saved.slice(0,3).map(s=><div key={s.id} className="text-[11px] text-[#9db8a6] [overflow-wrap:anywhere]">· Guardado: {s.value?.challenge} — {s.value?.correct?"✅":"❌"} {s.value?.delta}</div>)}
              </div>
            </section>
          </aside>

          {/* CENTRO */}
          <main className="space-y-4 min-w-0">
            <section className="panel p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold text-[clamp(18px,2.5vw,24px)] tracking-wide">🧱 INVENTARIO DEL BÚNKER</h2>
                {mode==="nivel19" && <span className="chip bg-[#22100f] text-[#ff8a94] flex items-center gap-1"><Timer size={13}/> {timeLeft}s · NIVEL 19</span>}
                {mode==="infinito" && <span className="chip">♾️ RONDA {infinitoSeed}</span>}
              </div>
              <p className="text-sm text-[#9db8a6] mt-1">Explorador en un búnker abandonado. Sigue el rastro desde el final.</p>

              {/* Inventario */}
              <div className={`mt-4 flex flex-wrap gap-2 ${isCorrect===false && confirmed ? "shake":""}`}>
                {challenge.inventory.map((w,i)=>(
                  <div key={i} className={`relative flex-1 min-w-[92px] max-w-[130px] rounded-2xl border px-2 py-3 text-center transition-all ${traverseIdx===i?"border-[#46ff8a] bg-[#0a2a16] scale-[1.03]":"border-[#26343e] bg-[#0a1115]"} ${confirmed && i===challenge.answer?"border-[#46ff8a] bg-[#0a2a16] glow":""} ${confirmed && selected===i && !isCorrect?"border-[#ff4d5e] bg-[#22100f]":""}`}>
                    {traverseIdx===i && <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xl">🔦</span>}
                    <div className="text-[11px] text-[#9db8a6]">[{i}]</div>
                    <div className="text-3xl my-1">{EMOJI[w]}</div>
                    <div className="font-bold text-[15px] leading-tight [overflow-wrap:anywhere]">{w}</div>
                    {confirmed && i===challenge.answer && <div className="text-[11px] text-[#46ff8a] font-bold mt-1">✅ ÚLTIMA</div>}
                    {confirmed && i===firstOccurrence && challenge.method==="lastIndexOf" && i!==challenge.answer && <div className="text-[11px] text-[#ffcf4d] mt-1">primera · no es esta</div>}
                  </div>
                ))}
              </div>

              {/* Pregunta */}
              <div className="mt-5 rounded-2xl border border-[#46ff8a]/50 bg-[#07160d] p-4">
                <div className="text-[12px] tracking-[.2em] text-[#46ff8a]">🎯 PREGUNTA · {challenge.method.toUpperCase()}</div>
                <p className="text-[clamp(20px,3vw,30px)] font-bold leading-tight mt-1 [overflow-wrap:anywhere]">¿En qué ÍNDICE está la {challenge.method==="indexOf"?"PRIMERA":"ÚLTIMA"} {challenge.target} {EMOJI[challenge.target]}?</p>
                <p className="text-sm text-[#9db8a6] mt-1">{challenge.hint} · Devuelve un <b className="text-white">NÚMERO</b>, no el arma.</p>
              </div>

              {/* Barra índices */}
              <div className="mt-4">
                <div className="flex items-center justify-between"><h3 className="font-bold tracking-wide text-sm">BARRA DE ÍNDICES — HAZ CLIC EN UN NÚMERO</h3><span className="text-xs text-[#9db8a6]">Seleccionado: <b className="text-white text-base">{selected===null?"—":selected}</b></span></div>
                <div className="mt-2 flex flex-wrap gap-2">
                  {challenge.inventory.map((_,i)=>(
                    <button key={i} onClick={()=>{ if(!confirmed){ setSelected(i); setFeedback(""); } }} disabled={confirmed} className={`min-w-[44px] h-11 px-2 rounded-xl border font-bold text-lg code ${selected===i?"bg-[#46ff8a] text-black border-[#46ff8a]":"bg-black/50 border-[#2a3a32] hover:border-[#46ff8a]"} ${confirmed && i===challenge.answer?"!bg-[#46ff8a] !text-black":""}`}>{i}</button>
                  ))}
                  <button onClick={()=>{ if(!confirmed){ setSelected(-1); setFeedback(""); } }} disabled={confirmed} className={`min-w-[52px] h-11 px-3 rounded-xl border font-bold text-lg code ${selected===-1?"bg-[#ff4d5e] text-white border-[#ff4d5e]":"bg-[#22100f] border-[#5a222a] text-[#ff8a94] hover:border-[#ff4d5e]"}`}>-1</button>
                  <span className="self-center text-xs text-[#9db8a6] ml-1">-1 = no existe</span>
                </div>
              </div>

              {/* Botones */}
              <div className="mt-5 flex flex-wrap gap-2">
                <button onClick={runTraverse} disabled={isTraversing || confirmed} className="flex-1 min-w-[200px] px-4 py-3 rounded-xl bg-[#46ff8a] text-black font-bold flex items-center justify-center gap-2"><Play size={18}/> ▶ RECORRER DESDE EL FINAL (←←←)</button>
                <button onClick={confirm} disabled={confirmed || selected===null} className="flex-1 min-w-[170px] px-4 py-3 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2"><Check size={18}/> ✅ CONFIRMAR ÍNDICE</button>
                <button onClick={nextRound} className="px-4 py-3 rounded-xl border border-[#ffcf4d] text-[#ffcf4d] font-bold flex items-center gap-2">➡️ SIGUIENTE RONDA <ArrowRight size={16}/></button>
              </div>

              {isTraversing && <div className="mt-3 text-sm text-[#46ff8a]"><span className="blink">🔦</span> Cursor retrocediendo… mira el depurador y la fila.</div>}
              {feedback && <div className={`mt-3 rounded-xl border p-3 font-semibold leading-snug [overflow-wrap:anywhere] ${isCorrect?"border-[#46ff8a] bg-[#07160d] text-[#bfffd6]":"border-[#ff4d5e] bg-[#1a0b0e] text-[#ffd6da]"}`}>{feedback}</div>}

              {/* Código */}
              <div className="mt-4 rounded-xl border border-[#26343e] bg-black/40 p-3">
                <label className="text-sm font-bold">⌨️ Escribe el código para +5 <span className="text-[#9db8a6] font-normal">(opcional)</span></label>
                <div className="mt-2 flex flex-col sm:flex-row gap-2">
                  <input value={code} onChange={e=>setCode(e.target.value)} placeholder={`Ej: inventario.${challenge.method}('${challenge.target}')`} className="code flex-1 min-w-0 bg-[#071009] border border-[#1d3a28] rounded-xl px-3 py-2.5 text-[14px] outline-none focus:border-[#46ff8a] [overflow-wrap:anywhere]" />
                  <button onClick={validateCode} className="px-4 py-2.5 rounded-xl bg-[#1d3a28] font-bold whitespace-nowrap">VALIDAR +5</button>
                </div>
                {codeMsg && <p className="text-sm mt-2 [overflow-wrap:anywhere]">{codeMsg}</p>}
                <button onClick={()=>setShowCode(!showCode)} className="mt-2 text-sm text-[#46ff8a] underline underline-offset-2">{showCode?"Ocultar código revelado":"Ver código revelado (después de intentar)"}</button>
                {showCode && <div className="code mt-2 bg-black/70 border border-[#1d3a28] rounded-lg p-3 text-[13px] [overflow-wrap:anywhere]">inventario.{challenge.method}('{challenge.target}') // → {challenge.answer}<br/>inventario.lastIndexOf('Ballesta') // → -1</div>}
              </div>

              <div className="mt-4 grid sm:grid-cols-3 gap-2 text-center text-[13px]">
                <div className="rounded-lg bg-black/40 border border-[#1d3a28] px-2 py-2">✅ Acierto <b>+10</b> <span className="text-[#9db8a6]">(Nivel 19: +20)</span></div>
                <div className="rounded-lg bg-black/40 border border-[#1d3a28] px-2 py-2">⚠️ Primera aparición <b className="text-[#ffcf4d]">-5</b></div>
                <div className="rounded-lg bg-black/40 border border-[#1d3a28] px-2 py-2">❌ Otro error <b className="text-[#ff4d5e]">-3</b> · Código +5 · Recorrer +5</div>
              </div>
            </section>
          </main>

          {/* DERECHA */}
          <aside className="space-y-4">
            <section className="panel p-4">
              <h2 className="font-bold flex items-center gap-2"><TerminalSquare size={18} className="text-[#46ff8a]"/> DEPURADOR AVANZADO: .{challenge.method}()</h2>
              <div className="mt-3 bg-black rounded-xl border border-[#1d3a28] p-3 min-h-[320px] max-h-[520px] overflow-y-auto">
                <div className="code text-[12.5px] leading-[1.7] space-y-1.5">
                  {debugLines.map((l,i)=><div key={i} className={`${l.includes("✅")?"text-[#46ff8a]":l.includes("🧠")?"text-[#ffcf4d]":l.includes("⚖️")?"text-[#8dffb8]":"text-[#cfe8d6]"} [overflow-wrap:anywhere]`}>{l}</div>)}
                  <div className="text-[#46ff8a] blink">▊</div>
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button onClick={runTraverse} disabled={isTraversing||confirmed} className="px-3 py-2.5 rounded-xl bg-[#46ff8a] text-black font-bold text-sm flex items-center justify-center gap-1"><Search size={15}/> RECORRER</button>
                <button onClick={()=>setDebugLines(buildDebug(selected))} className="px-3 py-2.5 rounded-xl border border-[#1d3a28] font-bold text-sm">VER TRAZA COMPLETA</button>
              </div>
              <div className="mt-3 rounded-xl border border-[#1d3a28] bg-black/40 p-3">
                <div className="text-xs tracking-widest text-[#9db8a6]">⚖️ COMPARACIÓN SIEMPRE VISIBLE</div>
                <div className="code text-[13px] mt-1 [overflow-wrap:anywhere]">{comparison}</div>
                <div className="text-xs text-[#9db8a6] mt-1">findLastIndex(...) → {challenge.answer} pero con condición.</div>
              </div>
              <div className="mt-3 text-sm leading-snug text-[#9db8a6]">🧠 <b className="text-white">Cómo funciona:</b> compara con <span className="code text-white">===</span>, de atrás hacia adelante, y se detiene en la primera coincidencia desde la derecha. Si no hay ninguna, devuelve <b className="text-white">-1</b>.</div>
            </section>

            <section className="panel p-4">
              <h3 className="font-bold flex gap-2 items-center"><Shield size={16} className="text-[#ffcf4d]"/> 🪖 GUÍA DEL EXPLORADOR</h3>
              <ul className="mt-2 text-sm space-y-2 text-[#cfe8d6] leading-snug">
                <li>1. Lee la pregunta: ¿primera o última?</li>
                <li>2. Si dudas, pulsa <b>RECORRER</b> y observa el cursor 🔦.</li>
                <li>3. Elige el número, no el arma.</li>
                <li>4. Si el arma no existe, elige <b>-1</b>.</li>
                <li>5. Escribe el código para ganar +5.</li>
              </ul>
              <div className="mt-3 rounded-lg bg-[#221a05] border border-[#5a4a1a] p-3 text-sm"><b className="text-[#ffcf4d]">Pista del búnker:</b> En la Ronda 1 hay Pistolas en 0, 2 y 4. La última es la que está más a la derecha.</div>
            </section>

            <section className="panel p-4">
              <h3 className="font-bold flex gap-2 items-center"><Trophy size={16}/> 🏆 MARCADOR</h3>
              <div className="mt-3 flex gap-2">
                <div className="flex-1 rounded-xl bg-black/50 border border-[#1d3a28] p-3 text-center"><div className="text-2xl font-bold text-[#46ff8a]">{points}</div><div className="text-xs text-[#9db8a6]">PUNTOS</div></div>
                <div className="flex-1 rounded-xl bg-black/50 border border-[#1d3a28] p-3 text-center"><div className="text-2xl font-bold text-[#ffcf4d]">{streak}</div><div className="text-xs text-[#9db8a6]">RACHA</div></div>
                <div className="flex-1 rounded-xl bg-black/50 border border-[#1d3a28] p-3 text-center"><div className="text-2xl font-bold">{resolved.size}</div><div className="text-xs text-[#9db8a6]">RESUELTOS</div></div>
              </div>
              {resolved.has("nivel-19") && <div className="mt-2 text-center font-bold text-[#ffcf4d]">🏅 BADGE: EXPLORADOR NIVEL 19</div>}
              <p className="text-xs text-[#9db8a6] mt-2">Cada ronda confirmada se guarda en la bitácora. Puedes seguir jugando en Infinito.</p>
            </section>
          </aside>
        </div>

        <footer className="mt-5 text-center text-xs text-[#9db8a6]">Búnker ‘La Última Arma’ · lastIndexOf devuelve un NÚMERO · Igualdad exacta === · Recorrido ←←← · Última aparición</footer>
      </div>
    </div>
  );
}
