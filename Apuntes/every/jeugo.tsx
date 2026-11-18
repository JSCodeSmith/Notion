import React, { useEffect, useMemo, useRef, useState } from "react";
import { Heart, Rocket, Wrench, Search, Send, RotateCcw, Sparkles, Shield, AlertTriangle, ChevronRight } from "lucide-react";

type SystemDef = { id:string; name:string; icon:string; role:string; hint:string };
const SYSTEMS: SystemDef[] = [
  { id:"motores", name:"Motores", icon:"🚀", role:"Ingeniería de Motores", hint:"Las toberas vibran más de lo normal y hay un zumbido raro al encender." },
  { id:"oxigeno", name:"Oxígeno", icon:"🫁", role:"Soporte Vital", hint:"Los tanques marcan menos presión de la que debería haber. Falta aire." },
  { id:"combustible", name:"Combustible", icon:"⛽", role:"Propulsión y Tanques", hint:"Hay una pequeña fuga y el medidor baja aunque nadie use combustible." },
  { id:"comunicaciones", name:"Comunicaciones", icon:"📡", role:"Comunicaciones", hint:"La antena pierde señal cada pocos segundos y se corta la radio." },
  { id:"escudos", name:"Escudos", icon:"🛡️", role:"Escudos Térmicos", hint:"Una placa del escudo está suelta y el calor entraría al reingreso." },
  { id:"comida", name:"Comida", icon:"🍔", role:"Provisiones", hint:"Las raciones están contadas mal: faltan paquetes para el viaje." },
];
const NAMES = ["Alex","Maya","Leo","Nia","Hugo","Sara","Iván","Luna","Diego","Zoe"];
const READY_LINES: Record<string,string[]> = {
  motores:["Motores al 100%, capitán, todo listo para despegar.","Motores perfectos. Empuje estable, sin vibraciones raras."],
  oxigeno:["Oxígeno al 100%, capitán. Aire limpio y tanques llenos.","Oxígeno estable, presión perfecta. Respira tranquilo, capitán."],
  combustible:["Combustible al 100%, capitán. Tanques llenos y sin fugas.","Combustible listo. Medidor estable, sin pérdidas."],
  comunicaciones:["Comunicaciones al 100%, capitán. Señal fuerte y clara.","Comunicaciones listas. Radio y antena funcionando perfecto."],
  escudos:["Escudos al 100%, capitán. Placas firmes y listas.","Escudos perfectos. Nada suelto, todo sellado."],
  comida:["Comida al 100%, capitán. Raciones completas para toda la tripulación.","Comida lista. Todo contado y guardado."],
};
const EVASIVE = [
  "Ehh... casi listo... un 99%... creo.",
  "Sí, sí, todo bien... creo. No mires mucho el medidor.",
  "¿Listo? Claro... casi... bueno, casi casi.",
];
const CONTRADICTIONS: Record<string,string> = {
  motores:"Espera... antes dije 100% y ahora... vale, los motores hacen un ruido raro.",
  oxigeno:"Bueno... antes dije que todo bien, pero... la presión no es la que debería.",
  combustible:"Ay... antes dije sin fugas, pero el medidor baja solo. Hay algo raro.",
  comunicaciones:"Mmm... antes dije señal fuerte, pero se corta cada poco. No es normal.",
  escudos:"Vale, me pillaste. Antes dije todo sellado, pero hay una placa suelta.",
  comida:"Eh... antes dije raciones completas, pero faltan paquetes. Lo conté mal.",
};

type SysState = { def:SystemDef; engineer:string; ready:boolean; checked:boolean; suspicion:number; asks:number; repaired:boolean };
type Msg = { id:number; from:"cap"|"eng"|"sys"; name?:string; text:string };
type DebugLine = { id:number; text:string; kind:"cmd"|"iter"|"ok"|"bad"|"brain"|"final" };
type Bitacora = { id:string; value:any; created_at:string };

function shuffle<T>(arr:T[]):T[]{ const a=[...arr]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function norm(s:string){ return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,""); }
function makeRound(round:number): SysState[]{
  const engineers = shuffle(NAMES).slice(0,6);
  const failCount = Math.random()<0.55?1:2;
  const failIdx = shuffle([0,1,2,3,4,5]).slice(0,failCount);
  return SYSTEMS.map((def,i)=>({ def, engineer:engineers[i], ready:!failIdx.includes(i), checked:false, suspicion: failIdx.includes(i)?18:6, asks:0, repaired:false }));
}
async function api(action:string, args:any){
  const res = await fetch("actions", { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(()=>({}));
  if(!res.ok || json.error) throw new Error(json.error || `Error ${res.status}`);
  return json.data;
}

export default function App(){
  const [round,setRound]=useState(1);
  const [lives,setLives]=useState(4);
  const [systems,setSystems]=useState<SysState[]>(()=>makeRound(1));
  const [selected,setSelected]=useState("motores");
  const [input,setInput]=useState("");
  const [messages,setMessages]=useState<Msg[]>([
    {id:1,from:"sys",text:"🚀 NAVE SOME-1 · CAPITÁN EN EL PUENTE. Interroga a un ingeniero: haz clic en su sistema y pregúntale. El depurador vigila cada .every()."},
    {id:2,from:"eng",name:"Alex · Motores",text:"Capitán, aquí Motores. Listo para su interrogatorio."},
  ]);
  const [debug,setDebug]=useState<DebugLine[]>([
    {id:1,text:"> Depurador listo. Escribe sistemas.every(s => s.estaListo) para comprobar.",kind:"cmd"},
    {id:2,text:"🧠 Depurador: .every() solo da TRUE si TODOS dan TRUE. Un solo FALSE basta para dar FALSE.",kind:"brain"},
  ]);
  const [bitacora,setBitacora]=useState<Bitacora[]>([]);
  const [bitacoraError,setBitacoraError]=useState("");
  const [status,setStatus]=useState("");
  const [launching,setLaunching]=useState(false);
  const [failedLaunch,setFailedLaunch]=useState(false);
  const [gameOver,setGameOver]=useState(false);
  const [repairBusy,setRepairBusy]=useState(false);
  const [saving,setSaving]=useState(false);
  const msgRef=useRef<HTMLDivElement>(null);
  const dbgRef=useRef<HTMLDivElement>(null);
  const idRef=useRef(10);

  const nextId=()=>++idRef.current;
  const sel = systems.find(s=>s.def.id===selected) || systems[0];
  const checkedCount = systems.filter(s=>s.checked).length;
  const readyCount = systems.filter(s=>s.ready).length;

  const loadBitacora=async()=>{
    try{ const data=await api("records.list",{collection:"every-bitacora", limit:50}); setBitacora((data?.records||[]).slice().reverse()); setBitacoraError(""); }
    catch(e){ setBitacoraError("La bitácora guardada no está disponible ahora. El juego sigue offline."); }
  };
  useEffect(()=>{ loadBitacora(); },[]);
  useEffect(()=>{ msgRef.current?.scrollTo({top:msgRef.current.scrollHeight,behavior:"smooth"}); },[messages]);
  useEffect(()=>{ dbgRef.current?.scrollTo({top:dbgRef.current.scrollHeight,behavior:"smooth"}); },[debug]);

  const pushDebug=(text:string,kind:DebugLine["kind"])=> setDebug(d=>[...d,{id:nextId(),text,kind}]);
  const pushMsg=(m:Omit<Msg,"id">)=> setMessages(mm=>[...mm,{...m,id:nextId()}]);

  const saveBitacora=async(value:any)=>{
    setSaving(true);
    try{
      const rec=await api("records.create",{collection:"every-bitacora", value, idempotency_key:`every-${Date.now()}-${Math.random().toString(36).slice(2,8)}`});
      if(rec) setBitacora(b=>[rec,...b].slice(0,50));
    }catch(e){ setBitacoraError("No se pudo guardar esta ronda en la bitácora."); }
    setSaving(false);
  };

  const ask=(raw?:string)=>{
    const q=(raw ?? input).trim();
    if(!q) return;
    if(gameOver || launching) return;
    let targetId=selected;
    const found=SYSTEMS.find(s=>norm(q).includes(norm(s.name)));
    if(found) targetId=found.id;
    const target=systems.find(s=>s.def.id===targetId)!;
    setSelected(targetId);
    pushMsg({from:"cap",name:"CAPITÁN",text:q});
    setInput("");
    const n=norm(q);
    setTimeout(()=>{
      let reply="";
      const asks=target.asks+1;
      if(!target.ready){
        if(asks>=3) reply=CONTRADICTIONS[target.def.id];
        else if(asks===2) reply=EVASIVE[1];
        else reply=EVASIVE[0];
        // keyword tail
        if(n.includes("despegar")) reply += " ¿Despegar? Ehh... mejor revisa todo antes.";
        if(n.includes("elon")||n.includes("musk")) reply += " Elon nos mira... mejor no le digas nada todavía.";
        if(n.includes("falla")) reply += " ¿Falla? Yo no dije falla... ¿verdad?";
        setSystems(prev=>prev.map(s=>s.def.id===targetId?{...s,asks,suspicion:Math.min(100,s.suspicion+25)}:s));
      } else {
        const lines=READY_LINES[target.def.id];
        reply=lines[Math.floor(Math.random()*lines.length)];
        if(n.includes("elon")||n.includes("musk")) reply+=" Elon estará orgulloso, capitán.";
        if(n.includes("despegar")) reply+=" Podemos despegar cuando usted ordene.";
        if(n.includes("falla")) reply+=" En mi sistema no hay ninguna falla, capitán. Puede comprobarlo.";
        setSystems(prev=>prev.map(s=>s.def.id===targetId?{...s,asks}:s));
      }
      pushMsg({from:"eng",name:`${target.engineer} · ${target.def.name}`,text:reply});
      if(!target.ready && asks>=2) pushMsg({from:"sys",text:`⚠️ SOSPECHA SUBE EN ${target.def.name.toUpperCase()}: el ingeniero se contradice. Sospecha +25.`});
    },260);
  };

  const reviewSingle=()=>{
    const target=sel;
    pushDebug(`> Ejecutando [${target.def.name}].every(s => s.estaListo) // array de 1`, "cmd");
    pushDebug(`[Iteración 0] Evaluando ${target.def.name}...`, "iter");
    pushDebug(`   -> Callback retornó: ${target.ready?"TRUE (Listo)":"FALSE (Falla)"}`, target.ready?"ok":"bad");
    if(target.ready){
      pushDebug(`🧠 Depurador: Con 1 elemento, si da TRUE el resultado es TRUE. Este sistema está listo.`, "brain");
      pushDebug(`> [${target.def.name}].every() finalizado. Resultado: true`, "final");
      setStatus(`✅ ${target.def.name}: LISTO. Su ingeniero decía la verdad.`);
    } else {
      pushDebug(`🧠 Depurador: ¡SHORT-CIRCUIT! Con 1 elemento que da FALSE, ya sabe que el resultado es FALSE.`, "brain");
      pushDebug(`> [${target.def.name}].every() finalizado. Resultado: false`, "final");
      setStatus(`❌ ${target.def.name}: FALLA. Necesita reparación.`);
      pushMsg({from:"sys",text:`❌ REVISIÓN INDIVIDUAL: ${target.def.name} está en FALLA. ${target.engineer} intentaba disimularlo.`});
    }
    setSystems(prev=>prev.map(s=>s.def.id===target.def.id?{...s,checked:true}:s));
  };

  const reviewAll=()=>{
    pushDebug(`> Ejecutando sistemas.every(s => s.estaListo)`, "cmd");
    let evaluated=0; let failed:SysState|null=null;
    for(let i=0;i<systems.length;i++){
      const s=systems[i]; evaluated++;
      pushDebug(`[Iteración ${i}] Evaluando ${s.def.name}...`, "iter");
      pushDebug(`   -> Callback retornó: ${s.ready?"TRUE (Listo)":"FALSE (Falla)"}`, s.ready?"ok":"bad");
      if(s.ready){
        pushDebug(`🧠 Depurador: Como dio TRUE, .every() DEBE seguir, aún no puede asegurar que TODOS están listos.`, "brain");
      } else {
        const remaining=systems.length-i-1;
        pushDebug(`🧠 Depurador: ¡SHORT-CIRCUIT! Como encontró 1 FALSE, .every() ya sabe que el resultado final es FALSE. No necesita revisar los ${remaining} restantes. Ahorró ${remaining} iteraciones.`, "brain");
        failed=s; break;
      }
    }
    const checkedIds=new Set(systems.slice(0,evaluated).map(s=>s.def.id));
    setSystems(prev=>prev.map(s=>checkedIds.has(s.def.id)?{...s,checked:true}:s));
    if(failed){
      pushDebug(`> .every() finalizado. Resultado: false`, "final");
      pushDebug(`> ❌ NO PUEDES DESPEGAR, ${failed.def.name.toUpperCase()} FALLÓ. Repara ese sistema.`, "bad");
      setStatus(`❌ NO PUEDES DESPEGAR, ${failed.def.name.toUpperCase()} FALLÓ. Repara ese sistema.`);
      pushMsg({from:"sys",text:`❌ REVISIÓN GLOBAL: .every() se detuvo en ${failed.def.name}. ${failed.engineer} es quien arruinó al grupo.`});
    } else {
      pushDebug(`🧠 Depurador: Revisó los 6 y todos dieron TRUE, por eso el resultado es TRUE. ¡Todos están listos!`, "brain");
      pushDebug(`> .every() finalizado. Resultado: true`, "final");
      setStatus(`✅ TODOS LISTOS. sistemas.every() = TRUE. Puedes intentar despegar.`);
      pushMsg({from:"sys",text:`✅ REVISIÓN GLOBAL: los 6 sistemas dieron TRUE. ¡Todos listos para despegar!`});
    }
  };

  const repair=()=>{
    if(!sel || sel.ready) return;
    setRepairBusy(true);
    pushMsg({from:"cap",name:"CAPITÁN",text:`🔧 ${sel.engineer}, repara ${sel.def.name} ahora mismo.`});
    setTimeout(()=>{
      const ok=Math.random()<0.7;
      if(ok){
        setSystems(prev=>prev.map(s=>s.def.id===sel.def.id?{...s,ready:true,checked:true,suspicion:4,repaired:true}:s));
        pushMsg({from:"eng",name:`${sel.engineer} · ${sel.def.name}`,text:`¡Reparado, capitán! ${sel.def.name} ya está al 100%. Puede comprobarlo con .every().`});
        setStatus(`🔧 ${sel.def.name} REPARADO. Ahora estaListo = true.`);
        pushDebug(`> Reparación en ${sel.def.name}: ÉXITO. estaListo pasó de false a true.`, "ok");
      } else {
        setSystems(prev=>prev.map(s=>s.def.id===sel.def.id?{...s,suspicion:Math.min(100,s.suspicion+15)}:s));
        pushMsg({from:"eng",name:`${sel.engineer} · ${sel.def.name}`,text:`No quedó, capitán... PISTA: ${sel.def.hint}`});
        setStatus(`🔧 La reparación falló. ${sel.engineer} te dio una pista. Inténtalo otra vez.`);
        pushDebug(`> Reparación en ${sel.def.name}: FALLÓ (30%). El ingeniero dejó una pista.`, "bad");
      }
      setRepairBusy(false);
    },650);
  };

  const attemptLaunch=()=>{
    if(launching||gameOver) return;
    pushDebug(`> 🚀 INTENTAR DESPEGAR: Ejecutando sistemas.every(s => s.estaListo)`, "cmd");
    const failed=systems.find(s=>!s.ready);
    if(!failed){
      pushDebug(`🧠 Depurador: Revisó los 6 y todos dieron TRUE, por eso el resultado es TRUE. ¡Todos están listos!`, "brain");
      pushDebug(`> .every() finalizado. Resultado: true`, "final");
      setSystems(prev=>prev.map(s=>({...s,checked:true})));
      setLaunching(true);
      setStatus("🚀 ¡DESPEGUE EXITOSO! ¡TODOS LOS SISTEMAS LISTOS!");
      saveBitacora({ ronda:round, resultado:"DESPEGUE EXITOSO", sistemas: systems.map(s=>`${s.def.name}:${s.ready?"LISTO":"FALLA"}`).join(", "), fecha:new Date().toLocaleString("es-ES") });
    } else {
      const newLives=lives-1;
      setLives(newLives);
      setFailedLaunch(true);
      setTimeout(()=>setFailedLaunch(false),650);
      pushDebug(`> .every() finalizado. Resultado: false`, "final");
      pushDebug(`> ❌ NO PUEDES DESPEGAR, ${failed.def.name.toUpperCase()} FALLÓ. Repara ese sistema.`, "bad");
      setStatus(`❌ NO PUEDES DESPEGAR, ${failed.def.name.toUpperCase()} FALLÓ. Pierdes 1 corazón. Te quedan ${newLives}/4.`);
      pushMsg({from:"sys",text:`❌ DESPEGUE BLOQUEADO: ${failed.def.name} sigue en FALLA. Corazones: ${newLives}/4.`});
      if(newLives<=0){
        setTimeout(()=>{
          setGameOver(true);
          saveBitacora({ ronda:round, resultado:"MISIÓN FALLIDA", sistemas: systems.map(s=>`${s.def.name}:${s.ready?"LISTO":"FALLA"}`).join(", "), fecha:new Date().toLocaleString("es-ES") });
        },700);
      }
    }
  };

  const nextMission=()=>{
    const nr=round+1;
    setRound(nr); setSystems(makeRound(nr)); setLaunching(false); setSelected("motores");
    setMessages([{id:nextId(),from:"sys",text:`🚀 MISIÓN ${nr} · Nueva tripulación, nuevos sistemas. Hay 1 o 2 fallas escondidas. Interroga antes de despegar.`}]);
    setDebug([{id:nextId(),text:`> Misión ${nr} iniciada. sistemas.every(s => s.estaListo) pendiente.`,kind:"cmd"}]);
    setStatus(`🛰️ MISIÓN ${nr} iniciada. Interroga a los ingenieros.`);
  };
  const restart=()=>{
    setRound(1); setLives(4); setSystems(makeRound(1)); setGameOver(false); setLaunching(false); setSelected("motores");
    setMessages([{id:nextId(),from:"sys",text:"🚀 NAVE SOME-1 REINICIADA. Corazones 4/4. Nueva misión, capitán."}]);
    setDebug([{id:nextId(),text:"> Depurador listo. systems.every(s => s.estaListo) te espera.",kind:"cmd"}]);
    setStatus("🔄 Partida reiniciada. Ronda 1.");
    loadBitacora();
  };

  const quickQs=["¿Estás listo?","¿Hay alguna falla?","¿Podemos despegar?","¿Qué dice Elon Musk de esto?"];
  const dbgColor=(k:string)=> k==="bad"?"text-[#ff7a92]":k==="ok"?"text-[#2eff8a]":k==="brain"?"text-[#ffc83d]":k==="final"?"text-white font-bold":"text-[#9fb0c8]";

  return (
    <div data-safe-area-inset-root style={{boxSizing:"border-box",paddingTop:"var(--safe-area-inset-top)",minHeight:"100vh",background:"var(--bg)"}} className="overflow-x-clip">
      <header data-safe-area-sticky-top style={{top:"var(--safe-area-inset-top)"}} className="sticky z-30 border-b border-[#1c2b4d] bg-[#030508]/95 backdrop-blur">
        <div className="mx-auto max-w-[1500px] px-3 sm:px-5 py-3 flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="min-w-0">
            <h1 className="text-[clamp(20px,3vw,34px)] leading-[1.05] font-bold tracking-wide">🚀 CAPITÁN <span className="text-[#9fb0c8]">//</span> <span className="neon">CONTRATADO POR ELON MUSK</span></h1>
            <p className="text-[#9fb0c8] font-semibold tracking-[.18em] text-[12px] sm:text-sm">NAVE SOME-1 · <span className="text-[#2eff8a]">EVERY: ¿TODOS LISTOS PARA DESPEGAR?</span></p>
          </div>
          <div className="flex flex-wrap items-center gap-2 lg:ml-auto">
            <span className="chip !text-[#2eff8a] !border-[#234a33]">IA CASERA V2.0 - OFFLINE ✅ SIN API</span>
            <span className="chip !text-white !border-[#38f8ff]">RONDA {round}</span>
            <span className="flex items-center gap-1 bg-[#0a1122] border border-[#1c2b4d] rounded-full px-3 py-1.5" aria-label={`Vidas ${lives} de 4`}>
              {[0,1,2,3].map(i=><Heart key={i} size={18} className={i<lives?"fill-[#ff3d5e] text-[#ff3d5e]":"text-[#2a3550]"} />)}
              <b className="text-sm ml-1">{lives}/4</b>
            </span>
          </div>
        </div>
        <div className="mx-auto max-w-[1500px] px-3 sm:px-5 pb-3 flex flex-wrap gap-2 text-[12px] sm:text-[13px] text-[#9fb0c8]">
          <span className="chip">sistemas.every(s =&gt; s.estaListo)</span>
          <span className="chip">✅ TRUE = todos listos</span>
          <span className="chip">❌ 1 FALSE = no despegas</span>
          <span className="chip">Revisados: {checkedCount}/6 · Listos: {readyCount}/6</span>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-3 sm:px-5 py-4 grid gap-4 lg:grid-cols-[300px_1fr_420px] items-start">
        {/* LEFT */}
        <section className="space-y-4 min-w-0">
          <div className="panel p-4">
            <div className="flex items-center justify-between"><h2 className="font-bold text-lg tracking-wide">SISTEMAS DE LA NAVE</h2><span className="text-xs font-code text-[#9fb0c8]">{checkedCount}/6 revisados</span></div>
            <p className="text-sm text-[#9fb0c8] mt-1">Toca un sistema para interrogar a su ingeniero.</p>
            <div className="mt-3 space-y-2">
              {systems.map(s=>{
                const label=!s.checked?"SIN REVISAR":s.ready?"✅ LISTO":"❌ FALLA - NECESITA REPARACIÓN";
                const color=!s.checked?"text-[#ffc83d]":s.ready?"text-[#2eff8a]":"text-[#ff7a92]";
                return (
                  <button key={s.def.id} onClick={()=>{setSelected(s.def.id); setStatus(`🎤 Interrogando a ${s.engineer} · ${s.def.name}. Pregúntale si está listo.`);}} className={`sys-card w-full text-left ${selected===s.def.id?"selected":""}`} aria-pressed={selected===s.def.id}>
                    <div className="flex items-start gap-3">
                      <span className="text-2xl leading-none">{s.def.icon}</span>
                      <div className="min-w-0 flex-1">
                        <div className="flex justify-between gap-2"><b className="text-[17px] leading-tight">{s.def.name}</b><span className="text-[11px] font-code text-[#9fb0c8]">{s.def.id}.estaListo</span></div>
                        <div className="text-sm text-[#9fb0c8]">{s.engineer} · {s.def.role}</div>
                        <div className={`text-[13px] font-bold mt-1 ${color}`}>{label}</div>
                        <div className="flex items-center gap-2 mt-2"><div className="susp flex-1"><div style={{width:`${s.suspicion}%`,background:s.suspicion>=60?"#ff3d5e":s.suspicion>=30?"#ffc83d":"#2eff8a"}} /></div><span className="text-[11px] font-code text-[#9fb0c8]">{s.suspicion}%</span></div>
                        <div className="text-[11px] text-[#9fb0c8] mt-1">Sospecha · Preguntas: {s.asks}</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="panel p-4">
            <div className="flex items-center justify-between"><h2 className="font-bold text-lg">📓 BITÁCORA PERSISTENTE</h2><span className="text-[11px] font-code text-[#2eff8a]">{saving?"Guardando…":"Guardada"}</span></div>
            <p className="text-sm text-[#9fb0c8]">Resultados de rondas. Se guarda aunque cierres y vuelvas.</p>
            {bitacoraError && <p className="text-[13px] text-[#ffc83d] mt-2">{bitacoraError}</p>}
            <div className="mt-3 space-y-2 max-h-[260px] overflow-y-auto scrollbox pr-1">
              {bitacora.length===0 && <p className="text-sm text-[#9fb0c8] border border-dashed border-[#263a66] rounded-xl p-3">Sin misiones guardadas todavía. Completa un despegue o termina una partida para escribir la primera entrada.</p>}
              {bitacora.map(b=>(
                <article key={b.id} className="border border-[#1c2b4d] rounded-xl p-3 bg-[#080f20]">
                  <div className="flex justify-between gap-2"><b className="text-[15px]">{b.value?.resultado || "Misión"}</b><span className="text-[11px] font-code text-[#9fb0c8]">Ronda {b.value?.ronda ?? "—"}</span></div>
                  <p className="text-[13px] text-[#9fb0c8] mt-1 break-words">{b.value?.sistemas || ""}</p>
                  <p className="text-[11px] font-code text-[#5f7292] mt-1">{b.value?.fecha || ""}</p>
                </article>
              ))}
            </div>
            <button onClick={loadBitacora} className="btn btn-dark w-full mt-3 flex items-center justify-center gap-2"><RotateCcw size={16}/> Actualizar bitácora</button>
          </div>
        </section>

        {/* CENTER */}
        <section className={`panel p-4 sm:p-5 min-w-0 ${failedLaunch?"shake": ""}`}>
          <div className="flex flex-wrap items-start justify-between gap-2">
            <div><h2 className="font-bold text-xl tracking-wide">INTERROGATORIO A INGENIEROS</h2><p className="text-sm text-[#9fb0c8]">Interrogando a <b className="text-white">{sel?.engineer}</b> · {sel?.def.name} {sel?.def.icon} · {sel?.def.role}</p></div>
            <span className="chip">🎤 Preguntas: {sel?.asks} · Sospecha {sel?.suspicion}%</span>
          </div>

          <div ref={msgRef} className="scrollbox mt-4 h-[340px] sm:h-[380px] overflow-y-auto rounded-2xl border border-[#1c2b4d] bg-[#040713] p-3 space-y-3" aria-live="polite">
            {messages.map(m=>(
              <div key={m.id} className={`flex ${m.from==="cap"?"justify-end":"justify-start"}`}>
                <div className={`msg ${m.from==="cap"?"msg-cap":m.from==="eng"?"msg-eng":"msg-sys"}`}>
                  {m.name && <div className="text-[11px] font-code uppercase tracking-wider opacity-80 mb-1">{m.name}</div>}
                  <div className="text-[15px]">{m.text}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3">
            <div className="flex flex-wrap gap-2">{quickQs.map(q=><button key={q} onClick={()=>ask(q)} className="chip hover:border-[#38f8ff] hover:text-white">{q}</button>)}</div>
            <form onSubmit={e=>{e.preventDefault(); ask();}} className="mt-3 flex gap-2">
              <label className="sr-only" htmlFor="pregunta">Pregunta al ingeniero</label>
              <input id="pregunta" value={input} onChange={e=>setInput(e.target.value)} placeholder={`Pregunta a ${sel?.engineer} (${sel?.def.name}): ¿estás listo? ¿hay falla?`} className="flex-1 min-w-0 bg-[#040713] border border-[#263a66] rounded-xl px-3 py-3 text-[15px] placeholder:text-[#5f7292]" />
              <button type="submit" className="btn btn-neon flex items-center gap-2 shrink-0"><Send size={17}/> PREGUNTAR</button>
            </form>
            <p className="text-[12px] text-[#9fb0c8] mt-2 font-code">La IA casera detecta: listo · falla · oxígeno · motores · combustible · despegar · elon · musk</p>
          </div>

          <div className="mt-4 grid sm:grid-cols-2 gap-2">
            <button onClick={reviewSingle} className="btn btn-dark text-left"><span className="flex items-center gap-2 text-[#38f8ff]"><Shield size={18}/> 🛡️ REVISAR SOLO ESTE SISTEMA</span><span className="block font-code text-[12px] text-[#9fb0c8] mt-1">[{sel?.def.name}].every(s =&gt; s.estaListo)</span><span className="block text-sm mt-1">Revisa solo a {sel?.engineer}.</span></button>
            <button onClick={reviewAll} className="btn btn-dark text-left"><span className="flex items-center gap-2 text-[#ffc83d]"><Search size={18}/> 🔍 REVISAR TODOS</span><span className="block font-code text-[12px] text-[#9fb0c8] mt-1">sistemas.every(s =&gt; s.estaListo)</span><span className="block text-sm mt-1">Con short-circuit: se detiene en el primer FALSE.</span></button>
          </div>

          {sel && !sel.ready && sel.checked && (
            <div className="mt-3 rounded-2xl border border-[#ff3d5e]/50 bg-[#2a0a14] p-3 flex flex-col sm:flex-row sm:items-center gap-3 pop">
              <div className="flex-1"><b className="text-[#ff7a92]">❌ {sel.def.name} EN FALLA</b><p className="text-sm text-[#e8c8cf]">Reparar tiene 70% de éxito. Si falla, {sel.engineer} te dará una pista.</p></div>
              <button onClick={repair} disabled={repairBusy} className="btn btn-danger flex items-center justify-center gap-2 shrink-0"><Wrench size={18}/> {repairBusy?"REPARANDO…":"🔧 REPARAR ESTE SISTEMA"}</button>
            </div>
          )}
          {sel && !sel.ready && !sel.checked && (
            <div className="mt-3 rounded-xl border border-dashed border-[#263a66] p-3 text-sm text-[#9fb0c8] flex gap-2"><AlertTriangle size={18} className="text-[#ffc83d] shrink-0"/> {sel.def.name} aún no está confirmado. Pregunta 2–3 veces o pulsa <b className="text-white">Revisar solo este sistema</b> para descubrir si miente.</div>
          )}

          <button onClick={attemptLaunch} className="btn btn-primary w-full mt-4 text-[18px] py-4 flex items-center justify-center gap-2"><Rocket size={22}/> 🚀 INTENTAR DESPEGAR</button>
          {status && <div className={`mt-3 rounded-xl border p-3 text-[15px] font-semibold ${status.includes("❌")?"border-[#ff3d5e]/50 bg-[#2a0a14] text-[#ffc6d0]":status.includes("✅")||status.includes("🚀")||status.includes("🔧")?"border-[#2eff8a]/40 bg-[#0a2416] text-[#c8ffe0]":"border-[#263a66] bg-[#0a1122]"}`} role="status">{status}</div>}
          <p className="text-center text-[13px] text-[#9fb0c8] mt-3">EVERY consiste en comprobar que <b className="text-white">TODO sea TRUE</b>. Si alguno es FALSE, el resultado es FALSE.</p>
        </section>

        {/* RIGHT */}
        <section className="panel p-4 min-w-0">
          <div className="flex items-center justify-between"><h2 className="font-bold text-lg">🧠 DEPURADOR INTELIGENTE</h2><span className="chip">.every()</span></div>
          <p className="text-sm text-[#9fb0c8] mt-1">Como un profesor: te explica cada iteración y por qué se detiene.</p>
          <div className="mt-3 rounded-xl bg-[#0b1224] border border-[#1c2b4d] p-3">
            <div className="font-code text-[13px] leading-relaxed text-[#9fb0c8]">sistemas.every(s =&gt; s.estaListo)</div>
            <div className="mt-2 flex flex-wrap gap-1">{systems.map((s,i)=><span key={s.def.id} className={`font-code text-[11px] px-2 py-1 rounded-full border ${s.checked?(s.ready?"border-[#2eff8a] text-[#2eff8a]":"border-[#ff3d5e] text-[#ff7a92]"):"border-[#263a66] text-[#9fb0c8]"}`}>{i}:{s.def.name} {s.checked?(s.ready?"✓":"✕"):"?"}</span>)}</div>
          </div>
          <div ref={dbgRef} className="scrollbox mt-3 h-[380px] sm:h-[460px] overflow-y-auto rounded-2xl bg-black/70 border border-[#1c2b4d] p-3 font-code text-[13px] leading-[1.55] space-y-1.5" aria-live="polite">
            {debug.map(l=><p key={l.id} className={dbgColor(l.kind)}>{l.text}</p>)}
          </div>
          <div className="mt-3 rounded-xl border border-[#263a66] p-3">
            <b className="flex items-center gap-2"><Sparkles size={16} className="text-[#ffc83d]"/> ¿Cómo funciona .every()?</b>
            <p className="text-sm text-[#9fb0c8] mt-1">Recorre uno por uno. Si uno da <b className="text-[#ff7a92]">FALSE</b>, hace <b className="text-white">SHORT-CIRCUIT</b>: se detiene y ya no revisa los demás. Solo si los 6 dan TRUE, el resultado final es TRUE.</p>
          </div>
          <button onClick={()=>setDebug([{id:nextId(),text:"> Consola limpia. Lista para la siguiente depuración.",kind:"cmd"}])} className="btn btn-dark w-full mt-3">Limpiar depurador</button>
        </section>
      </main>

      <footer className="mx-auto max-w-[1500px] px-3 sm:px-5 pb-6 text-center text-[13px] text-[#9fb0c8]">
        <p>Capitán: si TODOS dicen TRUE, despegas. Si UNO solo dice FALSE, el depurador hace SHORT-CIRCUIT y te dice quién falló. Repara ese uno.</p>
        <p className="font-code mt-1">EVERY = comprobar que TODO sea TRUE · SIN API · IA casera 100% offline</p>
      </footer>

      {/* LAUNCH OVERLAY */}
      {launching && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-[#02030f]" role="dialog" aria-modal="true" aria-label="Despegue exitoso">
          <div className="absolute inset-0" style={{background:"radial-gradient(ellipse at 50% 110%, #1a2b6b 0%, #050818 48%, #01020a 100%)"}}>
            {Array.from({length:60}).map((_,i)=><span key={i} className="star" style={{left:`${(i*37)%100}%`,top:`${(i*53)%78}%`,width:i%3===0?3:2,height:i%3===0?3:2,animationDelay:`${(i%7)*0.3}s`}}/>)}
          </div>
          <div className="relative h-full flex flex-col items-center justify-end pb-[10vh] px-4 text-center launching">
            <div className="mb-4"><p className="text-[#2eff8a] font-bold tracking-[.25em] text-sm">SISTEMAS.EVERY() = TRUE</p><h2 className="text-[clamp(28px,6vw,58px)] leading-none font-bold mt-2">🚀 ¡DESPEGUE EXITOSO!</h2><p className="text-xl sm:text-2xl font-bold mt-2">¡TODOS LOS SISTEMAS LISTOS!</p><p className="text-[#9fb0c8] text-lg mt-2">ELON MUSK: Buen trabajo, Capitán.</p></div>
            <div className="rocket-move relative flex flex-col items-center">
              <div className="text-[clamp(110px,22vw,190px)] leading-none drop-shadow-[0_0_35px_rgba(255,180,0,.7)]" style={{filter:"drop-shadow(0 0 24px rgba(255,200,0,.6))"}}>🚀</div>
              <div className="relative -mt-3 flex justify-center">
                <div className="flame w-[68px] h-[110px] rounded-b-full bg-gradient-to-b from-[#fff7ae] via-[#ffc83d] to-[#ff4d00] shadow-[0_0_45px_#ff8a00]" />
                <div className="flame2 absolute top-2 w-[34px] h-[70px] rounded-b-full bg-[#fff3c4]" />
              </div>
              <div className="flex gap-4 mt-1">{[0,1,2].map(i=><span key={i} className="smoke w-8 h-8 rounded-full bg-[#cbd5e1]/70 blur-[2px]" style={{animationDelay:`${i*0.35}s`}}/> )}</div>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-3"><button onClick={nextMission} className="btn btn-primary text-lg px-6 py-3 flex items-center gap-2">SIGUIENTE MISIÓN <ChevronRight size={20}/></button></div>
            <p className="font-code text-[12px] text-[#9fb0c8] mt-3">El cohete sube en 3.5 segundos · Fuego y humo activados 🔥</p>
          </div>
        </div>
      )}

      {/* GAME OVER */}
      {gameOver && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Misión fallida">
          <div className="panel max-w-[560px] w-full p-6 sm:p-8 text-center pop">
            <div className="text-6xl">💥</div>
            <h2 className="text-[clamp(28px,6vw,44px)] font-bold leading-tight mt-3 text-[#ff7a92]">MISIÓN FALLIDA</h2>
            <p className="text-xl font-bold mt-2">LA NAVE NO DESPEGÓ</p>
            <p className="text-[#9fb0c8] mt-3 text-[15px] leading-relaxed">GAME OVER. El director te descontó puntos por despegar sin que TODOS los sistemas estuvieran listos.<br/>Recuerda: <span className="font-code text-white">sistemas.every(s =&gt; s.estaListo)</span> debe ser TRUE. Un solo FALSE lo arruina todo.</p>
            <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-center"><button onClick={restart} className="btn btn-primary px-6 py-3 flex items-center justify-center gap-2"><RotateCcw size={18}/> REINICIAR MISIÓN</button><button onClick={()=>{setGameOver(false); setLives(2); setStatus("🛟 El director te dio 2 corazones extra. Repara y vuelve a intentarlo.");}} className="btn btn-dark px-6 py-3">Seguir con 2 corazones</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
