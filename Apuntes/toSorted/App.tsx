import React, { useEffect, useRef, useState } from 'react';
import { Trophy, Shield, Bug, RotateCcw, Undo2, CheckCircle2, XCircle, Lightbulb, ChevronLeft, ChevronRight, ScrollText, Swords, Sparkles, FlaskConical } from 'lucide-react';

type Log = { id:number; text:string; kind:'ok'|'bad'|'info' };
type Survivor = { name:string; emoji:string; edad:number };
type Weapon = { name:string; emoji:string; dano:number };
type Resource = { nombre:string; emoji:string; cantidad:string };
type Defender = { nombre:string; emoji:string; poder:string; edad:number };

const survivors: Survivor[] = [
  {name:'Ana',emoji:'👩',edad:25},{name:'Luis',emoji:'👨',edad:40},{name:'Marta',emoji:'🧑',edad:18},{name:'Pedro',emoji:'👴',edad:60},{name:'Sofía',emoji:'👦',edad:12},
];
const expected1 = [...survivors].sort((a,b)=>a.edad-b.edad);
const weapons: Weapon[] = [
  {name:'Pistola',emoji:'🔫',dano:30},{name:'Daga',emoji:'🗡',dano:15},{name:'Arco',emoji:'🏹',dano:40},{name:'Hacha',emoji:'🪓',dano:60},{name:'Martillo',emoji:'🔨',dano:25},
];
const expected2 = [...weapons].sort((a,b)=>b.dano-a.dano);
const resources: Resource[] = [
  {nombre:'Pan',emoji:'🍞',cantidad:'100🍞'},{nombre:'Agua',emoji:'💧',cantidad:'80💧'},{nombre:'Carne',emoji:'🍖',cantidad:'100🍖'},{nombre:'Trigo',emoji:'🌾',cantidad:'60🌾'},{nombre:'Queso',emoji:'🧀',cantidad:'80🧀'},
];
const defenders: Defender[] = [
  {nombre:'Kael',emoji:'🐉',poder:'100⚔',edad:30},{nombre:'Lyra',emoji:'🧝',poder:'80⚔',edad:25},{nombre:'Mordo',emoji:'🧙',poder:'100⚔',edad:40},{nombre:'Sylas',emoji:'🏹',poder:'60⚔',edad:20},{nombre:'bren',emoji:'🛡',poder:'80⚔',edad:35},
];
const expectedDef = [...defenders].sort((a,b)=>parseInt(b.poder)-parseInt(a.poder)||a.edad-b.edad||a.nombre.localeCompare(b.nombre));
const levels = [
  {id:1,title:'Supervivientes',tag:'Clic',icon:'👥'},
  {id:2,title:'Armería',tag:'Arrastrar',icon:'⚔️'},
  {id:3,title:'Predicción Mago',tag:'Predecir',icon:'🧙'},
  {id:4,title:'Comparador Inventario',tag:'Escribir',icon:'📦'},
  {id:5,title:'Sello Test',tag:'Test',icon:'🛡️'},
  {id:6,title:'Jefe Final · Horda Triple',tag:'Ataque',icon:'🐉'},
];
const l3Rounds = [
  {title:'RONDA A · sort() sobre [3,1,2]', arr:'[3,1,2]', op:'sort((a,b)=>a-b)', q:'¿Qué pasará con el original si uso sort((a,b)=>a-b)?', opts:['Sigue [3,1,2]','Se muta a [1,2,3]'], correct:1, explain:'sort muta el original.'},
  {title:'RONDA B · toSorted() sobre [3,1,2]', arr:'[3,1,2]', op:'toSorted((a,b)=>a-b)', q:'¿Qué pasará si uso toSorted((a,b)=>a-b)?', opts:['Sigue [3,1,2]','Se muta a [1,2,3]'], correct:0, explain:'toSorted devuelve copia nueva; el original sigue [3,1,2].'},
  {title:'RONDA C · sort() SIN comparador', arr:'["10","9","2"]', op:'sort()', q:'¿Qué pasará si uso sort() SIN comparador en ["10","9","2"]?', opts:['Sigue ["10","9","2"]','Se muta a ["2","9","10"] numérico','Se muta a ["10","2","9"] lexicográfico'], correct:2, explain:'sort() sin comparador ordena strings lexicográficamente y muta.'},
  {title:'RONDA D · toSorted() con Number', arr:'["10","9","2"]', op:'toSorted((a,b)=>Number(a)-Number(b))', q:'¿Qué pasará si uso toSorted((a,b)=>Number(a)-Number(b))?', opts:['Sigue ["10","9","2] — el original queda intacto','Se muta a ["2","9","10]'], correct:0, explain:'toSorted ordena numéricamente sin mutar el original.'},
];
const l5Rounds = [
  {arr:[10,9,2,100,5], label:'[10, 9, 2, 100, 5]'},
  {arr:[42,7,19,3,88,15], label:'[42, 7, 19, 3, 88, 15]'},
  {arr:[1000,99,9,500,50], label:'[1000, 99, 9, 500, 50]'},
];

async function api(action:string, args:any){
  const r = await fetch("actions", {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({action, args})});
  const j = await r.json().catch(()=>({}));
  if(!r.ok || j.error) throw new Error(j.error || `Error ${r.status}`);
  return j.data;
}

export default function App(){
  const [points,setPoints]=useState(0);
  const [streak,setStreak]=useState(0);
  const [solved,setSolved]=useState<number[]>([]);
  const [level,setLevel]=useState(1);
  const [feedback,setFeedback]=useState<{type:'ok'|'bad'|'info';text:string}|null>(null);
  const [shake,setShake]=useState(false);
  const [glow,setGlow]=useState(false);
  const [logs,setLogs]=useState<Log[]>([{id:1,text:'> Consola lista. El registro original es sagrado.',kind:'info'},{id:2,text:'> ⚖️ sort() muta | toSorted() NO muta',kind:'info'}]);
  const [bitacora,setBitacora]=useState<string[]>(['Aria abrió el registro oficial del refugio.']);
  const [recordId,setRecordId]=useState<string|null>(null);
  const [saveNote,setSaveNote]=useState('Progreso guardado en el registro del refugio.');
  const loadedRef=useRef(false);
  const logId=useRef(3);

  const pushLog=(text:string,kind:Log['kind']='info')=>setLogs(p=>[{id:logId.current++,text,kind},...p].slice(0,40));
  const addPoints=(n:number,why:string)=>{ setPoints(p=>p+n); if(n>0){setGlow(true); setTimeout(()=>setGlow(false),1100);} else {setShake(true); setTimeout(()=>setShake(false),500);} setBitacora(b=>[`${why} (${n>=0?'+':''}${n} pts)` ,...b].slice(0,12)); };
  const markSolved=(id:number)=>setSolved(s=>s.includes(id)?s:[...s,id]);

  // persistence
  useEffect(()=>{
    (async()=>{
      try{
        const data:any = await api("records.list", {collection:"refugio_progress"});
        const rec = data?.records?.[0];
        if(rec){
          setRecordId(rec.id);
          const v=rec.value||{};
          if(typeof v.points==='number') setPoints(v.points);
          if(typeof v.streak==='number') setStreak(v.streak);
          if(Array.isArray(v.solved)) setSolved(v.solved);
          setSaveNote('Progreso recuperado del registro del refugio.');
        }
      }catch{ setSaveNote('Sin conexión con el registro guardado: juegas en esta sesión.'); }
      loadedRef.current=true;
    })();
  },[]);
  useEffect(()=>{
    if(!loadedRef.current) return;
    const t=setTimeout(async()=>{
      try{
        const value={points,streak,solved,updatedAt:new Date().toISOString()};
        if(recordId){ await api("records.replace", {collection:"refugio_progress", id:recordId, value}); }
        else { const rec:any=await api("records.create", {collection:"refugio_progress", value, idempotency_key:`refugio-${Date.now()}`}); if(rec?.id) setRecordId(rec.id); }
        setSaveNote('Progreso guardado en el registro del refugio.');
      }catch{ setSaveNote('No se pudo guardar el progreso en esta sesión.'); }
    },600);
    return ()=>clearTimeout(t);
  },[points,streak,solved,recordId]);

  // Level 1
  const [picked1,setPicked1]=useState<Survivor[]>([]);
  const remaining1 = survivors.filter(s=>!picked1.includes(s));
  const check1=()=>{
    if(picked1.length<5){ setFeedback({type:'bad',text:'❌ Elige los 5 supervivientes antes de comprobar.'}); pushLog('> toSorted() · copia incompleta','bad'); return; }
    const wrong = picked1.findIndex((s,i)=>s.name!==expected1[i].name);
    if(wrong===-1){ addPoints(10,'Nivel 1 · Supervivientes ordenados'); markSolved(1); setFeedback({type:'ok',text:'✅ La copia está ordenada y el registro original sigue intacto. toSorted no muta.'}); pushLog('> Ejecutando supervivientes.toSorted((a,b)=>a.edad-b.edad)','ok'); pushLog('> Original antes: [Ana 25, Luis 40, Marta 18, Pedro 60, Sofía 12] · Original después: INTACTO','ok'); pushLog('> Copia creada: [Sofía 12 → Marta 18 → Ana 25 → Luis 40 → Pedro 60]','ok'); }
    else { addPoints(-3,'Nivel 1 · Orden incorrecto'); setFeedback({type:'bad',text:`❌ Falló en la posición ${wrong+1}: pusiste ${picked1[wrong].name} (${picked1[wrong].edad}) pero debería ir ${expected1[wrong].name} (${expected1[wrong].edad}). Orden correcto: Sofía (12) → Marta (18) → Ana (25) → Luis (40) → Pedro (60).`}); pushLog('> toSorted() · comparación en posición '+(wrong+1)+' incorrecta','bad'); }
  };

  // Level 2
  const [copy2,setCopy2]=useState<Weapon[]>([]);
  const [dragItem,setDragItem]=useState<Weapon|null>(null);
  const remaining2 = weapons.filter(w=>!copy2.includes(w));
  const addToCopy=(w:Weapon)=>{ if(copy2.length<5) setCopy2([...copy2,w]); };
  const move2=(i:number,dir:number)=>{ const arr=[...copy2]; const j=i+dir; if(j<0||j>=arr.length) return; [arr[i],arr[j]]=[arr[j],arr[i]]; setCopy2(arr); };
  const check2=()=>{
    if(copy2.length===0){ addPoints(-10,'Nivel 2 · Original vacío / copia vacía'); setFeedback({type:'bad',text:'❌ La copia está vacía. El arsenal quedó sin ordenar. -10 puntos.'}); return; }
    const wrong=copy2.findIndex((w,i)=>w.name!==expected2[i].name);
    if(copy2.length===5 && wrong===-1){ addPoints(10,'Nivel 2 · Armería ordenada'); markSolved(2); setFeedback({type:'ok',text:'✅ La copia está ordenada de mayor a menor daño. El registro original sigue intacto.'}); pushLog('> Ejecutando armas.toSorted((a,b)=>b.daño-a.daño)','ok'); pushLog('> Copia: [Hacha 60 → Arco 40 → Pistola 30 → Martillo 25 → Daga 15] · Original INTACTO','ok'); }
    else { addPoints(-3,'Nivel 2 · Orden incorrecto'); setFeedback({type:'bad',text:'❌ El orden no es correcto. Recuerda: descendente = el mayor primero. Orden correcto: Hacha (60) → Arco (40) → Pistola (30) → Martillo (25) → Daga (15).'}); pushLog('> toSorted() · orden descendente incorrecto','bad'); }
  };

  // Level 3
  const [round3,setRound3]=useState(0);
  const [choice3,setChoice3]=useState<number|null>(null);
  const [streak3,setStreak3]=useState(0);
  const [done3,setDone3]=useState(false);
  const check3=()=>{
    if(choice3===null) return;
    const r=l3Rounds[round3];
    if(choice3===r.correct){
      const ns=streak3+1; setStreak3(ns); addPoints(10,`Nivel 3 · Ronda ${'ABCD'[round3]} correcta`); setStreak(s=>s+1);
      setFeedback({type:'ok',text:'✅ Correcto. sort muta el original; toSorted no. El mago te revela un alijo de suministros.'});
      pushLog(`> Ejecutando ${r.arr}.${r.op} → original ${r.correct===0?'INTACTO':'MUTADO'}`,'ok');
      if(ns===4){ addPoints(5,'Nivel 3 · Bonus 4 rondas seguidas'); setFeedback({type:'ok',text:'✅ ¡4 rondas seguidas! +5 bonus. El mago te revela un alijo de suministros. El registro queda intacto.'}); }
      if(round3===3){ setDone3(true); markSolved(3); } else setRound3(round3+1);
      setChoice3(null);
    } else {
      setStreak3(0); addPoints(-3,'Nivel 3 · Predicción incorrecta'); setStreak(0);
      setFeedback({type:'bad',text:'❌ Incorrecto. toSorted devuelve copia nueva; el original sigue [3,1,2].'}); pushLog(`> Predicción fallida · ${r.explain}`,'bad');
    }
  };

  // Level 4
  const [input4,setInput4]=useState('(a,b) => ');
  const [help4,setHelp4]=useState(false);
  const [tried4,setTried4]=useState(0);
  const check4=()=>{
    const v=input4.toLowerCase();
    const hasParse=v.includes('parseint'); const hasLocale=v.includes('localecompare');
    if(!hasParse){ addPoints(-5,'Nivel 4 · Sin parseInt'); setTried4(t=>t+1); setFeedback({type:'bad',text:'❌ Sin parseInt, toSorted compara strings y ordena lexicográficamente ("100🍞" < "80🍞"). Necesitas convertir a número.'}); pushLog('> toSorted(comparador) · falta parseInt','bad'); return; }
    if(!hasLocale){ addPoints(-5,'Nivel 4 · Sin localeCompare'); setTried4(t=>t+1); setFeedback({type:'bad',text:'❌ Los empates en cantidad no se ordenan por nombre. Añade || a.nombre.localeCompare(b.nombre).'}); pushLog('> toSorted(comparador) · falta localeCompare','bad'); return; }
    // validate real result if possible
    try{
      const body=input4.split('=>')[1]?.trim()||'0';
      const fn=new Function('a','b',`return ${body}`) as (a:any,b:any)=>number;
      const result=[...resources].toSorted(fn as any);
      const order=result.map(r=>r.nombre).join(',');
      if(order!=='Trigo,Agua,Queso,Carne,Pan') throw new Error('orden');
      const pts = help4?5:15; addPoints(pts, help4?'Nivel 4 · Comparador con ayuda':'Nivel 4 · Comparador perfecto'); markSolved(4);
      setFeedback({type:'ok',text:'✅ ¡Comparador correcto! parseInt convierte los strings y localeCompare ordena los empates. El original sigue intacto.'});
      pushLog('> Ejecutando recursos.toSorted((a,b)=>parseInt(a.cantidad)-parseInt(b.cantidad) || a.nombre.localeCompare(b.nombre))','ok');
      pushLog('> Copia: [Trigo 60 → Agua 80 → Queso 80 → Carne 100 → Pan 100] · Original INTACTO','ok');
    }catch{ addPoints(-5,'Nivel 4 · Comparador incorrecto'); setTried4(t=>t+1); setFeedback({type:'bad',text:'❌ El comparador no produce el orden esperado. Revisa el orden: cantidad ascendente y nombre en empates.'}); }
  };

  // Level 5
  const [round5,setRound5]=useState(0);
  const [choice5,setChoice5]=useState<number|null>(null);
  const [done5,setDone5]=useState(false);
  const check5=()=>{
    if(choice5===null) return;
    const r=l5Rounds[round5];
    if(choice5===0){ addPoints(-10,'Nivel 5 · sort muta el original'); setFeedback({type:'bad',text:'❌ sort MUTA el original. El registro se corrompe. Usa toSorted.'}); pushLog(`> Ejecutando original.sort(...) sobre ${r.label} → ORIGINAL MUTADO · El registro se corrompió. La horda entra.`,'bad'); }
    else if(choice5===1){ addPoints(15,'Nivel 5 · toSorted'); setFeedback({type:'ok',text:'✅ ¡Correcto! toSorted devuelve copia ordenada sin mutar el original. El refugio está a salvo.'}); pushLog(`> Ejecutando original.toSorted((a,b)=>a-b) sobre ${r.label} → copia ordenada · original INTACTO`,'ok'); advance5(); }
    else { addPoints(10,'Nivel 5 · Spread válido'); setFeedback({type:'ok',text:'✅ También es válido: [...original].sort(...) copia primero y ordena la copia. Pero toSorted es más directo.'}); pushLog(`> Ejecutando [...original].sort((a,b)=>a-b) → copia ordenada · original INTACTO`,'ok'); advance5(); }
    setChoice5(null);
  };
  const advance5=()=>{ if(round5===2){ setDone5(true); markSolved(5); } else setRound5(round5+1); };

  // Level 6
  const [input6,setInput6]=useState('(a,b) => ');
  const [help6,setHelp6]=useState(false);
  const check6=()=>{
    const v=input6.toLowerCase();
    if(!v.includes('parseint')){ addPoints(-5,'Nivel 6 · Sin parseInt'); setFeedback({type:'bad',text:'❌ Sin parseInt, el poder se compara como string.'}); pushLog('> Jefe final · falta parseInt','bad'); return; }
    if(!v.includes('b.poder')||!v.includes('a.poder')||v.indexOf('b.poder')>v.indexOf('a.poder') && !v.includes('b.poder)-parseint(a.poder)')){ /* allow generic */ }
    // detect descending: should contain b.poder before a.poder in first parseInt expression, simplified: check "b.poder)-parseint(a.poder" or "b.poder) - parseint(a.poder"
    const norm=v.replace(/\s+/g,'');
    if(!norm.includes('parseint(b.poder)-parseint(a.poder)')){ addPoints(-5,'Nivel 6 · Poder ascendente'); setFeedback({type:'bad',text:'❌ El poder debe ser descendente: parseInt(b.poder)-parseInt(a.poder).'}); pushLog('> Jefe final · poder debe ser descendente','bad'); return; }
    if(!v.includes('edad')){ addPoints(-5,'Nivel 6 · Sin edad'); setFeedback({type:'bad',text:'❌ Los empates en poder no se ordenan por edad. Añade || a.edad-b.edad.'}); return; }
    if(!v.includes('localecompare')){ addPoints(-5,'Nivel 6 · Sin localeCompare'); setFeedback({type:'bad',text:'❌ Los empates en poder y edad no se ordenan por nombre. Añade || a.nombre.localeCompare(b.nombre).'}); return; }
    try{
      const body=input6.split('=>')[1]?.trim()||'0';
      const fn=new Function('a','b',`return ${body}`) as any;
      const result=[...defenders].toSorted(fn);
      if(result.map((d:any)=>d.nombre).join(',')!=='Kael,Mordo,Lyra,bren,Sylas') throw new Error('orden');
      addPoints(help6?10:20, help6?'Nivel 6 · Jefe con ayuda':'Nivel 6 · Jefe final derrotado');
      markSolved(6); setFeedback({type:'ok',text:'✅ ¡Comparador triple correcto! Poder descendente, edad ascendente, nombre alfabético. El refugio resiste el ataque. El original sigue intacto.'});
      pushLog('> Ejecutando defensores.toSorted((a,b)=>parseInt(b.poder)-parseInt(a.poder) || a.edad-b.edad || a.nombre.localeCompare(b.nombre))','ok');
      pushLog('> Copia: [Kael → Mordo → Lyra → bren → Sylas] · Original INTACTO','ok');
    }catch{ addPoints(-5,'Nivel 6 · Comparador incorrecto'); setFeedback({type:'bad',text:'❌ El comparador no produce el orden esperado: Kael → Mordo → Lyra → bren → Sylas.'}); }
  };

  const resetAll=()=>{ setPoints(0); setStreak(0); setSolved([]); setPicked1([]); setCopy2([]); setRound3(0); setStreak3(0); setDone3(false); setRound5(0); setDone5(false); setInput4('(a,b) => '); setInput6('(a,b) => '); setHelp4(false); setHelp6(false); setFeedback(null); setBitacora(['Aria reinició el registro. El original sigue intacto.']); pushLog('> Reinicio · el registro original queda INTACTO','info'); };

  const originalPreview = level===1 ? '[Ana 25, Luis 40, Marta 18, Pedro 60, Sofía 12]' : level===2 ? '[Pistola 30, Daga 15, Arco 40, Hacha 60, Martillo 25]' : level===3 ? '[3, 1, 2]' : level===4 ? '[Pan 100, Agua 80, Carne 100, Trigo 60, Queso 80]' : level===5 ? l5Rounds[round5].label : '[Kael 100, Lyra 80, Mordo 100, Sylas 60, bren 80]';

  return (
    <div data-safe-area-inset-root style={{boxSizing:'border-box', paddingTop:'var(--safe-area-inset-top)', minHeight:'100vh', background:'radial-gradient(900px 380px at 18% -5%, rgba(57,255,20,.14), transparent 60%), radial-gradient(700px 400px at 90% 10%, rgba(255,122,0,.13), transparent 55%), #030508'}} className="overflow-x-clip">
      <div className="mx-auto max-w-[1500px] px-3 sm:px-5 pb-6">
        {/* HEADER */}
        <header data-safe-area-sticky-top style={{top:'var(--safe-area-inset-top)'}} className="sticky z-20 -mx-3 sm:-mx-5 px-3 sm:px-5 pt-3 pb-3 bg-[#030508]/90 backdrop-blur">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 justify-between">
            <div className="min-w-0">
              <h1 className="text-[clamp(1.5rem,4vw,2.4rem)] leading-none font-bold tracking-tight"><span className="neon">🧟 EL ÚLTIMO REFUGIO</span> <span className="orange">- ARIA</span></h1>
              <p className="text-[13px] sm:text-sm text-[#9db8a8] mt-1">Eres Aria, líder del refugio. El registro original es sagrado: nunca lo mutes. Ordena solo copias con <code className="mono text-[#39ff14]">toSorted()</code>.</p>
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <span className="chip">📦 REGISTRO GUARDADO ✅</span>
              <span className="chip" style={{borderColor:'#ffd23f',color:'#ffd23f'}}>🏆 PUNTOS: {points}</span>
              <span className="chip" style={{borderColor:'#ff7a00',color:'#ffb066'}}>🔥 RACHA: {streak}</span>
            </div>
          </div>
          <div className="mt-2 h-2 rounded-full bg-[#101a13] overflow-hidden"><div className="h-full bg-gradient-to-r from-[#39ff14] to-[#ff7a00] transition-all" style={{width:`${(solved.length/6)*100}%`}}/></div>
          <p className="text-xs text-[#9db8a8] mt-1">{solved.length}/6 niveles sellados · {saveNote}</p>
        </header>

        <div className="grid gap-4 mt-3 lg:grid-cols-[300px_1fr_420px] items-start">
          {/* LEFT */}
          <aside className="space-y-4 lg:sticky lg:top-[92px]">
            <section className="panel p-4">
              <h2 className="font-bold text-lg flex items-center gap-2"><ScrollText size={19} className="text-[#39ff14]"/> 📋 NIVELES</h2>
              <div className="mt-3 space-y-2">
                {levels.map(l=>(
                  <button key={l.id} onClick={()=>{setLevel(l.id); setFeedback(null);}} className={`w-full text-left rounded-xl px-3 py-2.5 border flex items-center gap-3 ${level===l.id?'border-[#39ff14] bg-[#122b18]':'border-[#264437] bg-[#0a1410]'}`}>
                    <span className="text-xl">{l.icon}</span>
                    <span className="flex-1 min-w-0"><span className="block font-bold leading-tight [overflow-wrap:anywhere]">Nivel {l.id} · {l.title}</span><span className="text-xs text-[#9db8a8]">{l.tag}</span></span>
                    <span>{solved.includes(l.id)?'✅':'○'}</span>
                  </button>
                ))}
              </div>
            </section>
            <section className="panel p-4 border-[#ff7a00]/50" style={{borderColor:'rgba(255,122,0,.45)'}}>
              <h3 className="font-bold text-[#ff7a00]">sort() vs toSorted()</h3>
              <div className="mt-2 space-y-2 text-sm leading-snug">
                <div className="rounded-lg bg-[#2a0f0f] border border-red-900/60 p-2.5"><b className="text-red-300">sort() ❌ MUTA</b><br/><code className="mono text-xs">arr.sort()</code><br/><span className="text-[#c9a9a9]">Cambia el original. Corrompe el registro.</span></div>
                <div className="rounded-lg bg-[#0f2a12] border border-emerald-900/60 p-2.5"><b className="text-[#39ff14]">toSorted() ✅ NO MUTA</b><br/><code className="mono text-xs">arr.toSorted()</code><br/><span className="text-[#b8d8c2]">Devuelve copia nueva. Original intacto.</span></div>
                <p className="text-[#9db8a8] text-xs">Regla de oro: si ves <code className="mono">sort()</code> sobre el original, el refugio pierde puntos.</p>
              </div>
            </section>
            <section className="panel p-4">
              <h3 className="font-bold flex gap-2 items-center"><Sparkles size={17} className="text-[#ffd23f]"/> 📜 BITÁCORA</h3>
              <ul className="mt-2 space-y-1.5 text-[13px] text-[#c8e8d2]">{bitacora.map((b,i)=><li key={i} className="[overflow-wrap:anywhere]">• {b}</li>)}</ul>
              <button onClick={resetAll} className="btn btn-ghost w-full mt-3 flex items-center justify-center gap-2"><RotateCcw size={16}/> Reiniciar partida</button>
            </section>
          </aside>

          {/* CENTER */}
          <main className="space-y-4 min-w-0">
            <div className="panel p-4 sm:p-5 flex flex-wrap gap-3 items-end justify-between">
              <div><p className="text-xs tracking-[.2em] text-[#9db8a8] font-bold">NIVEL {level} · {levels[level-1].title.toUpperCase()}</p><h2 className="text-[clamp(1.4rem,3vw,2rem)] leading-tight font-bold">{level===1?'Los Supervivientes':level===2?'La Armería':level===3?'La Predicción del Mago':level===4?'El Comparador del Inventario':level===5?'El Sello del Refugio':'El Ataque de la Horda'}</h2></div>
              <span className="chip">{solved.includes(level)?'✅ NIVEL SELLADO':'⏳ EN CURSO'}</span>
            </div>

            {/* Original + Copy always */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className={`panel p-4 ${shake?'shake':''}`} style={{borderColor:'rgba(255,122,0,.6)'}}>
                <div className="flex justify-between gap-2"><h3 className="font-bold text-[#ff9a3d] [overflow-wrap:anywhere]">🔒 REGISTRO ORIGINAL BLOQUEADO</h3><span className="chip" style={{borderColor:'#ff7a00',color:'#ffb066'}}>INTACTO</span></div>
                <p className="text-xs text-[#9db8a8] mt-1">No lo toques. Solo lectura. <code className="mono">sort()</code> aquí = -10.</p>
                <div className="mt-3 rounded-lg bg-[#1a0e05] border border-[#4a2a0f] p-3 mono text-[13px] leading-relaxed [overflow-wrap:anywhere]">{originalPreview}</div>
                <p className="text-xs mt-2 text-[#ffb066]">🔒 Candado activo · El original no se puede arrastrar ni editar.</p>
              </div>
              <div className={`panel p-4 ${glow?'glow':''}`} style={{borderColor:'rgba(57,255,20,.45)'}}>
                <h3 className="font-bold text-[#39ff14]">📄 COPIA ORDENADA</h3>
                <p className="text-xs text-[#9db8a8] mt-1">Aquí sí puedes ordenar. Es una copia nueva.</p>
                <div className="mt-3 min-h-[86px] rounded-lg bg-[#07130b] border border-[#23452e] p-3 mono text-[13px] leading-relaxed [overflow-wrap:anywhere]">
                  {level===1 && (picked1.length? picked1.map(s=>`${s.emoji} ${s.name} ${s.edad}`).join(' → ') : 'Copia vacía — haz clic en supervivientes en orden.')}
                  {level===2 && (copy2.length? copy2.map(w=>`${w.emoji} ${w.name} ${w.dano}`).join(' → ') : 'Copia vacía — arrastra o toca un arma.')}
                  {level===3 && 'La copia aparece cuando el mago ejecuta tu predicción.'}
                  {level===4 && 'La copia aparecerá al comprobar tu comparador.'}
                  {level===5 && 'Elige una opción y mira qué pasa con original y copia.'}
                  {level===6 && 'La copia aparecerá al comprobar tu comparador triple.'}
                </div>
                <p className="text-xs mt-2 text-[#9fe8b0]">✅ <code className="mono">toSorted()</code> crea este panel sin tocar el original.</p>
              </div>
            </div>

            {feedback && <div className={`panel p-4 ${feedback.type==='ok'?'glow':feedback.type==='bad'?'shake':''}`} style={{borderColor:feedback.type==='ok'?'#39ff14':'#ff3b3b'}}><p className={`font-bold leading-snug [overflow-wrap:anywhere] ${feedback.type==='ok'?'text-[#39ff14]':'text-[#ff8a8a]'}`}>{feedback.text}</p></div>}

            {/* LEVEL CONTENT */}
            <section className="panel p-4 sm:p-5">
              {level===1 && <>
                <p className="text-[#c8e8d2]"><b>Objetivo:</b> ordena por edad ascendente haciendo clic en el orden correcto. Comparador: <code className="mono text-[#39ff14]">(a,b)=&gt;a.edad-b.edad</code></p>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {remaining1.map(s=><button key={s.name} onClick={()=>setPicked1([...picked1,s])} className="item hover:border-[#39ff14]"><span><span className="text-xl mr-2">{s.emoji}</span><b>{s.name}</b> · {s.edad} años</span><span className="text-[#39ff14]">＋</span></button>)}
                  {remaining1.length===0 && <p className="text-sm text-[#9db8a8] col-span-full">Todos colocados. Comprueba la copia.</p>}
                </div>
                <div className="mt-3 flex flex-wrap gap-2"><button className="btn btn-ghost flex gap-2 items-center" onClick={()=>setPicked1(picked1.slice(0,-1))}><Undo2 size={16}/> Deshacer último</button><button className="btn btn-green" onClick={check1}>Comprobar copia</button><button className="btn btn-ghost" onClick={()=>setPicked1([])}>Vaciar copia</button></div>
                <p className="mono text-xs mt-4 bg-black/40 p-3 rounded-lg [overflow-wrap:anywhere]">const copia = supervivientes.toSorted((a,b)=&gt;a.edad-b.edad)</p>
              </>}

              {level===2 && <>
                <p className="text-[#c8e8d2]"><b>Objetivo:</b> arrastra armas a la copia, ordenadas por daño <b>descendente</b>. En móvil: toca un arma y usa ◀ ▶ para reordenar.</p>
                <div className="grid md:grid-cols-2 gap-3 mt-3">
                  <div><p className="text-xs font-bold text-[#ffb066] mb-2">ALMACÉN — toca o arrastra</p><div className="space-y-2">{remaining2.map(w=><div key={w.name} draggable onDragStart={()=>setDragItem(w)} onDragEnd={()=>setDragItem(null)} className="item cursor-grab"><span>{w.emoji} <b>{w.name}</b> · daño {w.dano}</span><button className="btn btn-orange !py-1.5 !px-3 text-sm" onClick={()=>addToCopy(w)}>Añadir →</button></div>)}{remaining2.length===0 && <p className="text-sm text-[#9db8a8]">Almacén vacío.</p>}</div></div>
                  <div onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault(); if(dragItem) addToCopy(dragItem);}} className="rounded-xl border border-dashed border-[#39ff14]/60 bg-[#07130b] p-3 min-h-[180px]"><p className="text-xs font-bold text-[#39ff14] mb-2">COPIA — suelta aquí / reordena</p><div className="space-y-2">{copy2.map((w,i)=><div key={w.name} className="item"><span>{i+1}. {w.emoji} <b>{w.name}</b> · {w.dano}</span><span className="flex gap-1"><button aria-label="Mover a la izquierda" className="btn btn-ghost !p-2" onClick={()=>move2(i,-1)}><ChevronLeft size={16}/></button><button aria-label="Mover a la derecha" className="btn btn-ghost !p-2" onClick={()=>move2(i,1)}><ChevronRight size={16}/></button><button aria-label="Quitar" className="btn btn-ghost !p-2" onClick={()=>setCopy2(copy2.filter(x=>x!==w))}>✕</button></span></div>)}{copy2.length===0 && <p className="text-sm text-[#9db8a8]">Copia vacía. Arrastra un arma aquí.</p>}</div></div>
                </div>
                <div className="mt-3 flex flex-wrap gap-2"><button className="btn btn-green" onClick={check2}>Comprobar copia</button><button className="btn btn-ghost" onClick={()=>setCopy2([])}>Vaciar copia</button></div>
                <p className="mono text-xs mt-3 bg-black/40 p-3 rounded-lg [overflow-wrap:anywhere]">const copia = armas.toSorted((a,b)=&gt;b.daño-a.daño)</p>
              </>}

              {level===3 && <>
                {!done3 ? <>
                  <p className="text-[#c8e8d2]"><b>El mago ejecuta la operación real</b> y muestra el estado final del original. Predice antes de que ocurra.</p>
                  <div className="mt-3 rounded-xl bg-[#120a2a] border border-purple-900/60 p-4"><p className="font-bold text-purple-200">{l3Rounds[round3].title}</p><p className="mono text-sm mt-1 text-[#39ff14] [overflow-wrap:anywhere]">{l3Rounds[round3].arr}.{l3Rounds[round3].op}</p><p className="mt-2 font-bold">{l3Rounds[round3].q}</p><div className="mt-3 space-y-2">{l3Rounds[round3].opts.map((o,i)=><button key={o} onClick={()=>setChoice3(i)} className={`opt ${choice3===i?'sel':''}`}>{o}</button>)}</div></div>
                  <div className="mt-3 flex flex-wrap gap-2 items-center"><button className="btn btn-green" disabled={choice3===null} onClick={check3}>Ejecutar predicción</button><span className="text-sm text-[#9db8a8]">Ronda {round3+1}/4 · Racha del mago: {streak3}</span></div>
                </> : <div><h3 className="text-xl font-bold text-[#39ff14]">🧙 El mago te entrega el alijo.</h3><p className="text-[#c8e8d2] mt-1">Completaste las 4 rondas. Concepto sellado: sort muta, toSorted no muta.</p><button className="btn btn-orange mt-3" onClick={()=>setLevel(4)}>Ir al Nivel 4 →</button></div>}
                <p className="mono text-[11px] mt-4 bg-black/40 p-3 rounded-lg leading-relaxed [overflow-wrap:anywhere]">arr.sort((a,b)=&gt;a-b) // MUTADO<br/>arr.toSorted((a,b)=&gt;a-b) // INTACTO<br/>["10","9","2"].sort() // → ["10","2","9"] lexicográfico MUTADO<br/>["10","9","2"].toSorted((a,b)=&gt;Number(a)-Number(b)) // → ["2","9","10"] original INTACTO</p>
              </>}

              {level===4 && <>
                <p className="text-[#c8e8d2]"><b>Objetivo:</b> escribe un comparador para ordenar por cantidad ascendente sin mutar el original. Si empatan, por nombre alfabético. Las cantidades son strings con símbolo.</p>
                <div className="mt-3 grid grid-cols-2 sm:grid-cols-5 gap-2">{resources.map(r=><div key={r.nombre} className="rounded-xl bg-[#0a1712] border border-[#264437] p-3 text-center"><div className="text-2xl">{r.emoji}</div><b>{r.nombre}</b><div className="mono text-xs text-[#9db8a8] [overflow-wrap:anywhere]">{r.cantidad}</div></div>)}</div>
                <label className="block mt-4 text-sm font-bold">Tu comparador</label>
                <input type="text" value={input4} onChange={e=>setInput4(e.target.value)} placeholder="(a,b) => ..." aria-label="Comparador del inventario"/>
                <p className="mono text-xs mt-2 text-[#9db8a8]">const copia = recursos.toSorted(<span className="text-[#39ff14]">{input4 || '(a,b) => ...'}</span>)</p>
                <div className="mt-3 flex flex-wrap gap-2"><button className="btn btn-green" onClick={check4}>Comprobar comparador</button><button className="btn btn-ghost flex gap-2 items-center" onClick={()=>setHelp4(true)}><Lightbulb size={16}/> Ayuda</button></div>
                {help4 && <div className="mt-3 rounded-xl bg-[#2a1f05] border border-[#ffd23f]/40 p-3 text-sm space-y-1"><p>💡 Las cantidades son strings con símbolo → necesitas parseInt</p><p>💡 Si empatan en cantidad, ordena por nombre → localeCompare</p></div>}
                <p className="text-xs text-[#9db8a8] mt-2">Esperado: Trigo 60 → Agua 80 → Queso 80 → Carne 100 → Pan 100</p>
              </>}

              {level===5 && <>
                {!done5 ? <>
                  <p className="text-[#c8e8d2]"><b>El Sello del Refugio:</b> ordena <code className="mono text-[#39ff14]">{l5Rounds[round5].label}</code> de menor a mayor SIN mutar. Elige la opción y el juego ejecuta la operación.</p>
                  <div className="mt-3 space-y-2">
                    <button onClick={()=>setChoice5(0)} className={`opt ${choice5===0?'sel':''}`}>☐ original.sort((a,b)=&gt;a-b)</button>
                    <button onClick={()=>setChoice5(1)} className={`opt ${choice5===1?'sel':''}`}>☐ const copia = original.toSorted((a,b)=&gt;a-b)</button>
                    <button onClick={()=>setChoice5(2)} className={`opt ${choice5===2?'sel':''}`}>☐ const copia = [...original].sort((a,b)=&gt;a-b)</button>
                  </div>
                  <div className="mt-3 flex gap-2 items-center flex-wrap"><button className="btn btn-green" disabled={choice5===null} onClick={check5}>Ejecutar opción</button><span className="text-sm text-[#9db8a8]">Ronda {round5+1}/3</span></div>
                </> : <div><h3 className="text-xl font-bold text-[#39ff14]">🛡️ Sello del refugio activado.</h3><p className="text-[#c8e8d2] mt-1">El registro quedó intacto en las 3 rondas.</p><button className="btn btn-orange mt-3" onClick={()=>setLevel(6)}>Enfrentar al Jefe Final →</button></div>}
                <p className="mono text-xs mt-4 bg-black/40 p-3 rounded-lg [overflow-wrap:anywhere]">const copia = original.toSorted((a,b)=&gt;a-b); // original → {l5Rounds[round5].label} INTACTO<br/>// copia → ordenada</p>
              </>}

              {level===6 && <>
                <p className="text-[#c8e8d2]"><b>Jefe final:</b> escribe un comparador compuesto: poder <b>descendente</b>, edad <b>ascendente</b> y nombre <b>alfabético</b>, sin mutar el original. Cuidado: <b>bren</b> va en minúscula.</p>
                <div className="mt-3 space-y-2">{defenders.map(d=><div key={d.nombre} className="item"><span>{d.emoji} <b>{d.nombre}</b> · poder {d.poder} · edad {d.edad}</span><span className="mono text-xs text-[#9db8a8]">{d.nombre} / {d.edad}</span></div>)}</div>
                <label className="block mt-4 text-sm font-bold">Tu comparador triple</label>
                <input type="text" value={input6} onChange={e=>setInput6(e.target.value)} placeholder="(a,b) => ..." aria-label="Comparador triple del jefe final"/>
                <p className="mono text-xs mt-2 text-[#9db8a8] [overflow-wrap:anywhere]">const copia = defensores.toSorted(<span className="text-[#39ff14]">{input6}</span>)</p>
                <div className="mt-3 flex flex-wrap gap-2"><button className="btn btn-orange" onClick={check6}>⚔️ Comprobar comparador</button><button className="btn btn-ghost flex gap-2 items-center" onClick={()=>setHelp6(true)}><Lightbulb size={16}/> Ayuda</button></div>
                {help6 && <div className="mt-3 rounded-xl bg-[#2a1f05] border border-[#ffd23f]/40 p-3 text-sm space-y-1"><p>💡 Poder es string con símbolo → parseInt</p><p>💡 Edad es número → resta directa</p><p>💡 Nombre tiene mayúsculas/minúsculas → localeCompare</p><p>💡 Poder descendente → parseInt(b.poder)-parseInt(a.poder)</p></div>}
                <p className="text-xs text-[#9db8a8] mt-2">Esperado: Kael → Mordo → Lyra → bren → Sylas</p>
                {solved.includes(6) && <div className="mt-3 rounded-xl bg-[#122b18] border border-[#39ff14] p-4 text-center"><p className="text-2xl">🏆 ¡EL REFUGIO RESISTE!</p><p className="text-[#c8e8d2]">Has sellado los 6 niveles. El registro original sigue intacto.</p></div>}
              </>}
            </section>

            {/* Imm mutability */}
            <section className="panel p-4">
              <h3 className="font-bold flex items-center gap-2"><Shield size={18} className="text-[#39ff14]"/> 🔍 PANEL DE INMUTABILIDAD</h3>
              <p className="mono text-[13px] sm:text-sm mt-2 leading-relaxed [overflow-wrap:anywhere]">Original: [3,1,2] → sigue [3,1,2] <span className="text-[#39ff14] font-bold">INTACTO</span> | Copia: [1,2,3] <span className="text-[#39ff14]">ORDENADA</span> | <span className="text-[#39ff14]">toSorted() NO muta.</span> <span className="text-red-400">sort() SÍ muta.</span></p>
              <p className="text-xs text-[#9db8a8] mt-1">Nivel actual · Original: <span className="mono [overflow-wrap:anywhere]">{originalPreview}</span></p>
            </section>
          </main>

          {/* RIGHT */}
          <aside className="space-y-4 lg:sticky lg:top-[92px]">
            <section className="panel p-4">
              <h2 className="font-bold flex items-center gap-2"><Bug size={19} className="text-[#39ff14]"/> DEPURADOR AVANZADO: <code className="mono text-[#39ff14]">.toSorted()</code></h2>
              <p className="text-xs text-[#9db8a8] mt-1">Cada comprobación deja rastro aquí. Revisa original antes / después.</p>
              <div className="mt-3 rounded-xl bg-black/60 border border-[#1d2f2a] p-3 max-h-[420px] overflow-y-auto">
                {logs.map(l=><p key={l.id} className={`mono text-[12px] leading-relaxed mb-2 [overflow-wrap:anywhere] ${l.kind==='ok'?'text-[#7dff8a]':l.kind==='bad'?'text-[#ff8a8a]':'text-[#b8d8c2]'}`}>{l.text}</p>)}
              </div>
              <div className="mt-3 rounded-lg bg-[#0f2a12] border border-emerald-900/60 p-3 text-sm"><b>⚖️ sort() muta | toSorted() NO muta</b><p className="text-xs text-[#b8d8c2] mt-1">Si el original cambia, el registro se corrompe.</p></div>
              <button className="btn btn-ghost w-full mt-3" onClick={()=>setLogs([{id:99,text:'> Consola limpia. El original sigue intacto.',kind:'info'}])}>Limpiar consola</button>
            </section>
            <section className="panel p-4">
              <h3 className="font-bold flex gap-2 items-center"><FlaskConical size={17} className="text-[#ff7a00]"/> 🧪 CÓMO PUNTÚA ARIA</h3>
              <ul className="mt-2 text-[13px] space-y-1.5 text-[#c8e8d2]">
                <li>✅ Acierto normal: <b>+10</b></li><li>✅ Nivel 4 y 5 con toSorted: <b>+15</b></li><li>✅ Nivel 5 con spread: <b>+10</b></li><li>✅ Nivel 6 jefe final: <b>+20</b></li><li>❌ Mutar con sort: <b>-10</b></li><li>❌ Comparador mal: <b>-5</b></li><li>❌ Orden / predicción mal: <b>-3</b></li><li>⭐ Bonus Nivel 3 (4 seguidas): <b>+5</b></li><li>⭐ Bonus Nivel 4 con Ayuda: <b>+5</b></li><li>⭐ Bonus Nivel 6 con Ayuda: <b>+10</b></li>
              </ul>
            </section>
            <section className="panel p-4 text-center">
              <div className="text-4xl floaty">🧟🐉</div>
              <p className="font-bold mt-2">Aria vigila el refugio</p>
              <p className="text-sm text-[#9db8a8]">“El registro original es sagrado. Ordena copias, nunca el original.”</p>
              <div className="mt-3 flex justify-center gap-2"><span className="chip">🟢 REFUGIO: A SALVO</span><span className="chip">🧙 MAGO: ATENTO</span></div>
            </section>
          </aside>
        </div>

        <footer className="text-center text-xs text-[#7a9484] mt-6 pb-2">EL ÚLTIMO REFUGIO · Aprende <code className="mono">toSorted()</code> jugando · Original intacto, copia ordenada.</footer>
      </div>
    </div>
  );
}
