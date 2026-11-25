import React, { useEffect, useMemo, useRef, useState } from "react";
import { Crosshair, Radio, Trophy, RotateCcw, ChevronRight, Skull, Zap, Target, Shield, Bug, BookOpen, Flame, Volume2 } from "lucide-react";

type Level = {
  id:number; title:string; code:string; order:string; detail:string; target:number | null;
  horde:string[]; concept:string; success:string; fail:(n:string)=>string; points:number;
};
const HORDE5=["Ana","Luis","Marta","Pedro","Sofía"];
const LEVELS:Level[]=[
  {id:1,title:"El Último de la Fila",code:"at(-1)",order:"¡Dispara al ÚLTIMO! ¡El que está más cerca del refugio!",detail:"El vigilante pide al último. Los negativos cuentan desde el final.",target:4,horde:HORDE5,concept:"at(-1) devuelve el último. Equivale a arr[arr.length - 1].",success:"✅ ¡Disparo certero! horda.at(-1) devuelve a Sofía, la última de la fila.",fail:(n)=>`❌ Disparaste a ${n}. at(-1) apunta al ÚLTIMO, que es Sofía (índice -1). La horda avanza.`,points:10},
  {id:2,title:"El Primero de la Fila",code:"at(0)",order:"¡Dispara al PRIMERO! ¡El que lidera la horda!",detail:"El primero es el que está más lejos y abre la marcha.",target:0,horde:HORDE5,concept:"at(0) devuelve el primer elemento. Equivale a arr[0].",success:"✅ ¡Disparo certero! horda.at(0) devuelve a Ana, la primera de la fila.",fail:(n)=>`❌ Disparaste a ${n}. at(0) apunta al PRIMERO, que es Ana (índice 0). La horda avanza.`,points:10},
  {id:3,title:"El Penúltimo",code:"at(-2)",order:"¡Dispara al PENÚLTIMO! ¡El segundo desde el final!",detail:"Un paso antes del final. No es el último, es el anterior.",target:3,horde:HORDE5,concept:"at(-2) devuelve el penúltimo. Equivale a arr[arr.length - 2].",success:"✅ ¡Disparo certero! horda.at(-2) devuelve a Pedro, el penúltimo de la fila.",fail:(n)=>`❌ Disparaste a ${n}. at(-2) apunta al PENÚLTIMO, que es Pedro (índice -2). La horda avanza.`,points:10},
  {id:4,title:"El Tercero",code:"at(2)",order:"¡Dispara al TERCERO! ¡El que está en medio!",detail:"Tercero significa índice 2, porque el conteo empieza en 0.",target:2,horde:HORDE5,concept:"at(2) devuelve el tercer elemento. Tercero = índice 2, no 3.",success:"✅ ¡Disparo certero! horda.at(2) devuelve a Marta, la tercera de la fila.",fail:(n)=>`❌ Disparaste a ${n}. at(2) apunta al TERCERO, que es Marta (índice 2, no 3). La horda avanza.`,points:10},
  {id:5,title:"El Disparo Perdido",code:"at(10) → undefined",order:"¡Dispara al SÉPTIMO! ¡Posición 10!",detail:"La horda quedó diezmada. Solo quedan 3. El vigilante está confundido.",target:null,horde:["Ana","Luis","Marta"],concept:"at(index) devuelve undefined si el índice está fuera de rango. at(10) y at(-10) en un array de 3 → undefined.",success:"✅ ¡Correcto! horda.at(10) devuelve undefined porque no hay zombie en la posición 10. Conservas la munición.",fail:(n)=>`❌ Disparaste a ${n}, pero el vigilante pidió la posición 10. at(10) devuelve undefined. La horda avanza.`,points:15},
];
type SavedScore={score:number; streak:number; solved:number; ammo:number; at:string};
type LogLine={text:string; kind:"cmd"|"info"|"ok"|"bad"|"debug"};

async function callApi(action:string, args:any){
  const res=await fetch("actions",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({action,args})});
  const json=await res.json().catch(()=>({}));
  if(!res.ok || json.error) throw new Error(json.error || `Error ${res.status}`);
  return json.data;
}

export default function App(){
  const [levelIdx,setLevelIdx]=useState(0);
  const [score,setScore]=useState(0);
  const [streak,setStreak]=useState(0);
  const [bestStreak,setBestStreak]=useState(0);
  const [ammo,setAmmo]=useState(10);
  const [selected,setSelected]=useState<number|null>(null);
  const [solved,setSolved]=useState<number[]>([]);
  const [feedback,setFeedback]=useState("El vigilante espera tu disparo. Elige un zombie de la fila y pulsa DISPARAR.");
  const [feedbackKind,setFeedbackKind]=useState<"neutral"|"ok"|"bad">("neutral");
  const [fallen,setFallen]=useState<number|null>(null);
  const [advance,setAdvance]=useState(0);
  const [shake,setShake]=useState(false);
  const [boom,setBoom]=useState(false);
  const [bitacora,setBitacora]=useState<string[]>(["Partida iniciada. Rex toma posición en la azotea."]);
  const [logs,setLogs]=useState<LogLine[]>([
    {text:"> horda = [\"Ana\", \"Luis\", \"Marta\", \"Pedro\", \"Sofía\"]",kind:"cmd"},
    {text:"[Índices] 0:Ana, 1:Luis, 2:Marta, 3:Pedro, 4:Sofía / -5, -4, -3, -2, -1",kind:"info"},
    {text:"🧠 Depurador: at(-1) cuenta desde el final. at(0) = arr[0]. at(-1) = arr[arr.length - 1].",kind:"debug"},
    {text:"⚖️ at() con negativo = desde el final | arr[] con negativo = undefined",kind:"info"},
  ]);
  const [savedScores,setSavedScores]=useState<SavedScore[]>([]);
  const [saveStatus,setSaveStatus]=useState("Cargando marcador…");
  const [runSaved,setRunSaved]=useState(false);
  const runIdRef=useRef(`horda-${Date.now()}-${Math.floor(Math.random()*100000)}`);
  const level=LEVELS[levelIdx];
  const isSolved=solved.includes(level.id);
  const gameOver=ammo<=0 && !solved.includes(5);
  const allSolved=solved.length===5;
  const negIndices=useMemo(()=>level.horde.map((_,i)=>i-level.horde.length),[level]);

  async function loadScores(){
    try{
      const data=await callApi("records.list",{collection:"horda_scores",limit:20});
      const rows=(data?.records||[]).map((r:any)=>r.value).filter((v:any)=>v && typeof v.score==="number") as SavedScore[];
      rows.sort((a,b)=>b.score-a.score);
      setSavedScores(rows.slice(0,5));
      setSaveStatus(rows.length?`Mejor marca guardada: ${rows[0].score} pts`:"Sin partidas guardadas todavía.");
    }catch{ setSaveStatus("Guardado no disponible ahora. La partida sigue en local."); }
  }
  useEffect(()=>{ loadScores(); },[]);

  async function saveRun(finalScore:number, finalStreak:number){
    if(runSaved) return;
    setSaveStatus("Guardando puntuación…");
    try{
      await callApi("records.create",{collection:"horda_scores",value:{score:finalScore,streak:finalStreak,solved:solved.length,ammo,at:new Date().toISOString()},idempotency_key:runIdRef.current});
      setRunSaved(true); setSaveStatus("✅ Puntuación guardada en el marcador.");
      await loadScores();
    }catch(e:any){ setSaveStatus(`No se pudo guardar: ${e?.message||"error"}. Tu partida sigue en local.`); }
  }
  useEffect(()=>{ if(allSolved && !runSaved){ saveRun(score,bestStreak); } },[allSolved]);
  useEffect(()=>{ if(gameOver && !runSaved && score>0){ saveRun(score,bestStreak); } },[gameOver]);

  function pushLog(lines:LogLine[]){ setLogs(p=>[...p,...lines].slice(-30)); }

  function shootZombie(){
    if(selected===null || isSolved || gameOver) return;
    const name=level.horde[selected];
    const code=level.id===5?"horda.at(10)":"horda.at("+level.code.replace("at(","").replace(")","")+")";
    if(level.id===5){
      setScore(s=>s-5); setStreak(0); setAmmo(a=>a-1); setAdvance(a=>a+1); setShake(true); setFeedbackKind("bad");
      setFeedback(level.fail(name));
      setBitacora(b=>[`${level.title}: disparo a ${name} → -5 pts.`,...b]);
      pushLog([
        {text:`> Ejecutando ${code}`,kind:"cmd"},
        {text:`[Índices] 0:Ana, 1:Luis, 2:Marta / -3, -2, -1`,kind:"info"},
        {text:"🧠 Depurador: at(10) fuera de rango → undefined. arr[10] también undefined, pero at() permite negativos.",kind:"debug"},
        {text:"> Resultado: undefined",kind:"bad"},
        {text:"⚖️ Disparo perdido: pediste una posición que no existe.",kind:"bad"},
      ]);
      setTimeout(()=>setShake(false),500);
      setSelected(null); return;
    }
    const targetName=level.horde[level.target!];
    const hit=selected===level.target;
    setAmmo(a=>a-1); setAdvance(a=>hit?a:a+1);
    if(hit){
      const ns=score+10; const nst=streak+1;
      setScore(ns); setStreak(nst); setBestStreak(b=>Math.max(b,nst)); setSolved(s=>[...s,level.id]); setFallen(selected); setBoom(true); setFeedbackKind("ok"); setFeedback(level.success);
      setBitacora(b=>[`${level.title}: acierto en ${name} → +10 pts.`,...b]);
      pushLog([
        {text:`> Ejecutando horda.at(${level.code.replace("at(","").replace(")","")})`,kind:"cmd"},
        {text:`[Índices] 0:Ana, 1:Luis, 2:Marta, 3:Pedro, 4:Sofía / -5, -4, -3, -2, -1`,kind:"info"},
        {text:"🧠 Depurador: at(-1) cuenta desde el final. at(0) = arr[0]. at(-1) = arr[arr.length - 1].",kind:"debug"},
        {text:`> Resultado: ${targetName}`,kind:"ok"},
        {text:"⚖️ at() con negativo = desde el final | arr[] con negativo = undefined",kind:"info"},
      ]);
      setTimeout(()=>setBoom(false),600);
    } else {
      setScore(s=>s-3); setStreak(0); setShake(true); setFeedbackKind("bad"); setFeedback(level.fail(name));
      setBitacora(b=>[`${level.title}: disparo a ${name} → -3 pts.`,...b]);
      pushLog([
        {text:`> Ejecutando horda.at(${level.code.replace("at(","").replace(")","")})`,kind:"cmd"},
        {text:`[Índices] 0:Ana, 1:Luis, 2:Marta, 3:Pedro, 4:Sofía / -5, -4, -3, -2, -1`,kind:"info"},
        {text:"🧠 Depurador: at(-1) cuenta desde el final. at(0) = arr[0]. at(-1) = arr[arr.length - 1].",kind:"debug"},
        {text:`> Resultado: ${targetName}`,kind:"ok"},
        {text:`⚖️ Apuntaste a ${name}, pero el objetivo era ${targetName}.`,kind:"bad"},
      ]);
      setTimeout(()=>setShake(false),500);
    }
    setSelected(null);
  }

  function noTarget(){
    if(level.id!==5 || isSolved) return;
    const ns=score+15; const nst=streak+1;
    setScore(ns); setStreak(nst); setBestStreak(b=>Math.max(b,nst)); setSolved(s=>[...s,level.id]); setFeedbackKind("ok");
    setFeedback(level.success); setBitacora(b=>["Nivel 5: NO HAY OBJETIVO → +15 pts. Conservas la munición.",...b]);
    pushLog([
      {text:"> Ejecutando horda.at(10)",kind:"cmd"},
      {text:"[Índices] 0:Ana, 1:Luis, 2:Marta / -3, -2, -1",kind:"info"},
      {text:"🧠 Depurador: at(10) fuera de rango → undefined. arr[10] también undefined, pero at() permite negativos.",kind:"debug"},
      {text:"> Resultado: undefined",kind:"ok"},
      {text:"⚖️ at() con negativo = desde el final | arr[] con negativo = undefined",kind:"info"},
    ]);
  }
  function nextOrder(){
    if(levelIdx<4){ setLevelIdx(levelIdx+1); }
    else if(allSolved){ setFeedback("🏆 Refugio a salvo. Has completado los 5 niveles. Pulsa REINICIAR para otra partida."); }
    setSelected(null); setFallen(null); setAdvance(0); setFeedbackKind("neutral");
    if(levelIdx<4) setFeedback("Nueva orden en radio. Elige al zombie correcto.");
  }
  function goLevel(i:number){ setLevelIdx(i); setSelected(null); setFallen(null); setAdvance(0); setFeedback("Orden cambiada. Revisa la radio y apunta con calma."); setFeedbackKind("neutral"); }
  function restart(){
    setLevelIdx(0); setScore(0); setStreak(0); setBestStreak(0); setAmmo(10); setSelected(null); setSolved([]); setFallen(null); setAdvance(0); setShake(false); setFeedback("Partida reiniciada. Rex vuelve a la azotea."); setFeedbackKind("neutral");
    runIdRef.current=`horda-${Date.now()}-${Math.floor(Math.random()*100000)}`; setRunSaved(false); setSaveStatus("Nueva partida lista.");
    setBitacora(["Partida reiniciada. Rex toma posición en la azotea."]);
  }

  return (
    <div data-safe-area-inset-root style={{boxSizing:"border-box",paddingTop:"var(--safe-area-inset-top)",minHeight:"100vh",background:"radial-gradient(900px 420px at 15% 0%, rgba(57,255,20,.14), transparent 55%), radial-gradient(800px 380px at 90% 20%, rgba(255,45,45,.14), transparent 50%), #030508",overflowX:"clip"}}>
      <header data-safe-area-sticky-top style={{top:"var(--safe-area-inset-top)"}} className="sticky z-30 border-b border-[#1d3a2a] bg-[#030508]/92 backdrop-blur">
        <div className="mx-auto max-w-[1500px] px-3 sm:px-5 py-3 flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 shrink-0 rounded-xl bg-[#39ff14] text-black grid place-items-center text-2xl font-bold shadow-[0_0_28px_#39ff14]">🧟</div>
            <div className="min-w-0">
              <h1 className="text-[clamp(1.15rem,2.4vw,2rem)] leading-none font-bold tracking-wide [overflow-wrap:anywhere]">LA HORDA ZOMBIE <span className="text-[#39ff14]">— REX FRANCOTIRADOR</span></h1>
              <p className="text-[12px] sm:text-[13px] text-[#9db8a6] tracking-[.18em] uppercase">Azzotea · Radio · Método <span className="code text-white">.at()</span> · Aprende índices con cada disparo</p>
            </div>
          </div>
          <div className="ml-auto flex flex-wrap gap-2">
            <span className="px-3 py-2 rounded-full bg-[#ff8a00]/15 border border-[#ff8a00]/50 text-[#ffab4a] text-xs sm:text-sm font-bold">📻 EN VIVO</span>
            <span className="px-3 py-2 rounded-full bg-[#39ff14]/10 border border-[#39ff14]/40 text-[#a3ff12] text-xs sm:text-sm font-bold">PUNTOS: {score}</span>
            <span className="px-3 py-2 rounded-full bg-white/5 border border-white/15 text-xs sm:text-sm font-bold">🔥 RACHA: {streak}</span>
            <span className={`px-3 py-2 rounded-full border text-xs sm:text-sm font-bold ${ammo<=3?"bg-[#ff2d2d]/20 border-[#ff2d2d] text-[#ff8a8a]":"bg-white/5 border-white/15"}`}>🔫 MUNICIÓN: {ammo}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-3 sm:px-5 py-4 sm:py-6">
        <div className="layout">
          {/* IZQUIERDA */}
          <aside className="space-y-4">
            <section className="panel p-4">
              <div className="flex items-center justify-between"><h2 className="panel-title text-[#ffab4a]">📻 NIVELES</h2><span className="text-xs text-[#9db8a6]">{solved.length}/5</span></div>
              <p className="text-sm text-[#cde9d3] mt-2">Eres Rex. El vigilante grita la orden. Tú traduces la orden a <span className="code text-[#a3ff12]">at()</span> y disparas.</p>
              <div className="mt-3 space-y-2">
                {LEVELS.map((l,i)=>(
                  <button key={l.id} onClick={()=>goLevel(i)} className={`level-btn w-full text-left p-3 rounded-xl border ${levelIdx===i?"active":"border-white/10 bg-white/[.02]"} flex gap-3 items-start`}>
                    <span className="w-7 h-7 rounded-full bg-black/60 border border-white/15 grid place-items-center text-sm font-bold shrink-0">{solved.includes(l.id)?"✅":l.id}</span>
                    <span className="min-w-0"><span className="block font-bold leading-tight [overflow-wrap:anywhere]">Nivel {l.id} · {l.title}</span><span className="code text-xs text-[#a3ff12]">{l.code}</span><span className="block text-xs text-[#9db8a6]">{l.id===5?"+15 si aciertas":" +10 si aciertas"}</span></span>
                    <ChevronRight className="ml-auto shrink-0 mt-1" size={16}/>
                  </button>
                ))}
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs"><span className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden"><span className="block h-full bg-[#39ff14]" style={{width:`${solved.length/5*100}%`}}/></span><b>{Math.round(solved.length/5*100)}%</b></div>
            </section>

            <section className="panel p-4">
              <h2 className="panel-title text-[#a3ff12]">⚖️ at() vs arr[]</h2>
              <div className="code text-[12px] leading-6 mt-3 space-y-2">
                <p><span className="text-[#39ff14]">horda.at(-1)</span> → último ✓</p>
                <p><span className="text-[#ff8a8a]">horda[-1]</span> → undefined ✗</p>
                <p><span className="text-[#39ff14]">horda.at(0)</span> → primero ✓</p>
                <p><span className="text-[#39ff14]">horda.at(10)</span> → undefined</p>
              </div>
              <p className="text-sm text-[#9db8a6] mt-3">Regla de oro: los negativos cuentan desde el final. <b className="text-white">at(-1)</b> es el último, <b className="text-white">at(0)</b> el primero, <b className="text-white">at(-2)</b> el penúltimo.</p>
            </section>

            <section className="panel p-4">
              <div className="flex items-center gap-2"><Trophy size={18} className="text-[#ffc400]"/><h2 className="panel-title text-[#ffc400]">MARCADOR GUARDADO</h2></div>
              <p className="text-xs text-[#9db8a6] mt-2 [overflow-wrap:anywhere]">{saveStatus}</p>
              {savedScores.length>0 && <ol className="mt-3 space-y-2">{savedScores.map((s,i)=>(<li key={i} className="flex justify-between gap-2 text-sm bg-black/30 rounded-lg px-3 py-2 border border-white/10"><span>#{i+1} · {s.solved}/5 niveles</span><b className="text-[#a3ff12]">{s.score} pts</b></li>))}</ol>}
              <p className="text-[11px] text-[#9db8a6] mt-3">Al completar la partida, tu puntuación queda guardada para volver a verla.</p>
            </section>
          </aside>

          {/* CENTRO */}
          <section className="space-y-4 min-w-0">
            <div className="panel relative overflow-hidden p-4 sm:p-5">
              <div className="scanline"/>
              <div className="flex flex-wrap gap-2 items-start justify-between">
                <div><p className="text-xs tracking-[.22em] text-[#ff8a8a] font-bold">📍 AZOTEA · CALLE CERRADA</p><h2 className="text-[clamp(1.5rem,3vw,2.2rem)] leading-none font-bold mt-1">CALLE — HORDA</h2><p className="text-sm text-[#9db8a6] mt-1">Nivel {level.id} · <b className="text-white">{level.title}</b> · <span className="code text-[#a3ff12]">{level.code}</span></p></div>
                <div className="flex gap-2"><span className="px-3 py-1.5 rounded-full bg-[#ff2d2d]/15 border border-[#ff2d2d]/50 text-xs font-bold flex items-center gap-1"><span className="live-dot w-2 h-2 rounded-full bg-[#ff2d2d] inline-block"/>HORDA AVANZA +{advance}</span><span className="px-3 py-1.5 rounded-full bg-white/5 border border-white/15 text-xs font-bold">🎯 {level.horde.length} ZOMBIES</span></div>
              </div>

              <div className={`mt-5 rounded-2xl border border-[#1d3a2a] bg-gradient-to-b from-[#0a1a10] to-[#05080a] p-3 sm:p-5 overflow-hidden ${shake?"shake":""}`}>
                <div className="flex justify-between text-[11px] tracking-[.2em] text-[#9db8a6]"><span>REFUGIO ◀</span><span>CALLE</span><span>▶ HORDA</span></div>
                <div className="mt-3 flex gap-2 sm:gap-3" style={{transform:`translateX(${advance*10}px)`,transition:"transform .4s"}}>
                  {level.horde.map((name,i)=>{
                    const isFallen=fallen===i;
                    return (
                      <button key={name} onClick={()=>{if(!isSolved && !gameOver){setSelected(i); setFeedback(`Apuntando a ${name}. Pulsa DISPARAR para confirmar.`); setFeedbackKind("neutral");}}} className={`zombie-btn flex-1 min-w-0 rounded-2xl border p-2 sm:p-3 text-center ${selected===i?"selected border-[#ffc400]":"border-white/10 bg-[#0b1a12]"} ${isFallen?"fallen":""}`} aria-label={`Disparar a ${name}, índice ${i}`}>
                        <div className="text-[10px] code text-[#9db8a6]">[{i}]</div>
                        <div className="z-face text-[clamp(2rem,6vw,3.4rem)] leading-none my-1 sm:my-2">{isFallen?"💥":"🧟"}</div>
                        <div className="font-bold text-[clamp(.9rem,2.2vw,1.25rem)] leading-tight [overflow-wrap:anywhere]">{name}</div>
                        <div className="code text-[11px] text-[#9db8a6] mt-1">+{i} · {negIndices[i]}</div>
                        {isFallen && <div className="text-[11px] font-bold text-[#9db8a6] mt-1">CAÍDO</div>}
                        {selected===i && !isFallen && <div className="text-[11px] font-bold text-[#ffc400] mt-1">◉ EN LA MIRA</div>}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-3 flex justify-between text-xs code text-[#9db8a6]"><span>Índices + : {level.horde.map((_,i)=>i).join("  ")}</span><span>Índices − : {negIndices.join("  ")}</span></div>
                <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden"><div className="h-full bg-[#ff2d2d]" style={{width:`${Math.min(100, advance*18+18)}%`}}/></div>
                <p className="text-xs text-[#9db8a6] mt-2">La fila avanza a cada fallo. Si aciertas, el zombie cae con 💥 y se pone gris.</p>
              </div>

              <div className="mt-4 rounded-2xl bg-[#ff8a00] text-black p-4 flex gap-3">
                <Radio className="shrink-0 mt-0.5" size={28}/>
                <div className="min-w-0"><p className="text-xs font-bold tracking-[.18em]">📻 VIGILANTE · RADIO DEL REFUGIO</p><p className="text-[clamp(1.1rem,2.6vw,1.55rem)] font-bold leading-tight [overflow-wrap:anywhere]">“{level.order}”</p><p className="text-sm font-semibold opacity-80">{level.detail}</p></div>
                <Volume2 className="ml-auto shrink-0 hidden sm:block" size={22}/>
              </div>

              <div className="mt-4 grid sm:grid-cols-3 gap-2">
                <button onClick={shootZombie} disabled={selected===null || isSolved || gameOver} className="py-3.5 rounded-xl bg-[#39ff14] text-black font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-35 disabled:cursor-not-allowed shadow-[0_0_24px_rgba(57,255,20,.25)]"><Crosshair size={20}/> 🔫 DISPARAR</button>
                {level.id===5 && <button onClick={noTarget} disabled={isSolved || gameOver} className="py-3.5 rounded-xl bg-[#ff2d2d] text-white font-bold text-lg flex items-center justify-center gap-2 disabled:opacity-40">🚫 NO HAY OBJETIVO</button>}
                <button onClick={nextOrder} className="py-3.5 rounded-xl bg-white text-black font-bold text-lg flex items-center justify-center gap-2">➡️ SIGUIENTE ORDEN</button>
              </div>
              <p className="text-xs text-center text-[#9db8a6] mt-2">{level.id===5?"En el Nivel 5 también puedes disparar a un zombie, pero perderás 5 puntos.":"Selecciona un zombie y dispara. Cada disparo consume 1 de munición."}</p>

              <div className={`mt-4 rounded-xl border p-4 ${feedbackKind==="ok"?"bg-[#39ff14]/10 border-[#39ff14]/50":feedbackKind==="bad"?"bg-[#ff2d2d]/10 border-[#ff2d2d]/50":"bg-white/[.03] border-white/10"}`}>
                <p className="font-bold leading-snug [overflow-wrap:anywhere]">{feedback}</p>
                <p className="code text-sm mt-2 text-[#a3ff12]">{level.id===5?"horda.at(10) // → undefined":`horda.at(${level.code.replace("at(","").replace(")","")}) // → "${level.id===5?"undefined":level.target!==null?level.horde[level.target]:"undefined"}"`}</p>
                <p className="text-sm text-[#cde9d3] mt-1"><b>Concepto:</b> {level.concept}</p>
              </div>

              {(allSolved||gameOver) && <div className="mt-4 rounded-xl bg-[#ffc400] text-black p-4 flex flex-wrap gap-3 items-center justify-between"><div><p className="font-bold text-xl">{allSolved?"🏆 ¡REFUGIO A SALVO!":"💀 SIN MUNICIÓN"}</p><p className="font-semibold">{allSolved?"Completaste los 5 niveles.":"La horda sigue avanzando. Reinicia y vuelve a intentarlo."} Puntos: {score} · Mejor racha: {bestStreak}</p></div><button onClick={restart} className="bg-black text-white px-4 py-2.5 rounded-lg font-bold flex items-center gap-2"><RotateCcw size={17}/> REINICIAR</button></div>}
            </div>

            <div className="panel p-4">
              <div className="flex flex-wrap justify-between gap-2 items-center"><h3 className="panel-title text-[#a3ff12]">🔍 PANEL at() — SIEMPRE VISIBLE</h3><button onClick={restart} className="text-xs font-bold px-3 py-1.5 rounded-full border border-white/20 flex items-center gap-1"><RotateCcw size={13}/> REINICIAR PARTIDA</button></div>
              <div className="code text-[13px] sm:text-sm leading-7 mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-x-4">
                <span><b className="text-[#39ff14]">at(-1)</b> → último</span><span><b className="text-[#39ff14]">at(0)</b> → primero</span><span><b className="text-[#39ff14]">at(-2)</b> → penúltimo</span><span><b className="text-[#39ff14]">at(2)</b> → tercero (índice 2, no 3)</span><span><b className="text-[#39ff14]">at(10)</b> fuera de rango → undefined</span><span className="text-[#9db8a6]">Negativos = desde el final</span>
              </div>
            </div>

            <div className="panel p-4">
              <h3 className="panel-title text-white flex items-center gap-2"><BookOpen size={17}/> 📓 BITÁCORA DE REX</h3>
              <ul className="mt-3 space-y-1.5 max-h-[160px] overflow-y-auto scrollbox pr-1">{bitacora.map((b,i)=>(<li key={i} className="text-sm text-[#cde9d3] bg-black/25 rounded-lg px-3 py-2 border border-white/5 [overflow-wrap:anywhere]">{b}</li>))}</ul>
            </div>
          </section>

          {/* DERECHA */}
          <aside className="panel p-4 lg:sticky lg:top-[84px]">
            <div className="flex items-center justify-between"><h2 className="panel-title text-[#39ff14] flex items-center gap-2"><Bug size={18}/> DEPURADOR AVANZADO: .at()</h2><span className="text-[11px] px-2 py-1 rounded-full bg-[#39ff14]/10 border border-[#39ff14]/30 text-[#a3ff12]">CONSOLA</span></div>
            <div className="mt-3 bg-black/70 rounded-xl border border-[#1d3a2a] p-3 min-h-[340px] max-h-[520px] overflow-y-auto scrollbox">
              <div className="flex gap-1.5 mb-3"><span className="w-3 h-3 rounded-full bg-[#ff2d2d]"/><span className="w-3 h-3 rounded-full bg-[#ffc400]"/><span className="w-3 h-3 rounded-full bg-[#39ff14]"/></div>
              <div className="code text-[12.5px] leading-6 space-y-2">{logs.map((l,i)=>(<p key={i} className={`${l.kind==="ok"?"text-[#39ff14]":l.kind==="bad"?"text-[#ff8a8a]":l.kind==="cmd"?"text-white":l.kind==="debug"?"text-[#ffab4a]":"text-[#9db8a6]"} [overflow-wrap:anywhere]`}>{l.text}</p>))}</div>
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3 text-center">
              <div className="rounded-xl bg-white/[.03] border border-white/10 p-2.5"><p className="text-[11px] text-[#9db8a6]">PUNTOS</p><p className="text-xl font-bold text-[#a3ff12]">{score}</p></div>
              <div className="rounded-xl bg-white/[.03] border border-white/10 p-2.5"><p className="text-[11px] text-[#9db8a6]">RACHA</p><p className="text-xl font-bold flex items-center justify-center gap-1"><Flame size={16} className="text-[#ff8a00]"/>{streak}</p></div>
              <div className="rounded-xl bg-white/[.03] border border-white/10 p-2.5"><p className="text-[11px] text-[#9db8a6]">NIVEL</p><p className="text-xl font-bold">{level.id}/5</p></div>
            </div>
            <div className="mt-3 rounded-xl border border-[#ff8a00]/40 bg-[#ff8a00]/10 p-3 flex gap-2"><Shield size={18} className="text-[#ffab4a] shrink-0"/><p className="text-sm leading-snug"><b>Consejo de Rex:</b> Si la orden dice “tercero”, no pulses el cuarto. Cuenta desde 0.</p></div>
            <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3"><p className="text-xs tracking-widest text-[#9db8a6] font-bold">CÓMO JUGAR</p><ol className="text-sm mt-2 space-y-1.5 list-decimal pl-4"><li>Escucha la orden en la radio.</li><li>Toca al zombie de la fila.</li><li>Pulsa DISPARAR o, en el Nivel 5, NO HAY OBJETIVO.</li><li>Lee el depurador y avanza de nivel.</li></ol></div>
          </aside>
        </div>
        <footer className="mt-5 text-center text-xs text-[#9db8a6] flex flex-wrap justify-center gap-x-4 gap-y-1"><span>🧟 LA HORDA ZOMBIE · at()</span><span className="flex items-center gap-1"><Target size={13}/> +10 acierto · -3 fallo · -5 disparo perdido · +15 Nivel 5</span><span>🔫 Munición limitada · Cada disparo cuenta</span></footer>
      </main>
    </div>
  );
}
