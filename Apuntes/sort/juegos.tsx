import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronRight, Flame, RotateCcw, Shuffle, Undo2, Trophy, Timer, Sparkles, UtensilsCrossed, Code2, Terminal, ChefHat } from 'lucide-react';

type Dish = { id:string; emoji:string; name:string; price:number|string; calories:number };
type LevelId = '1'|'2'|'3'|'4'|'inf'|'19';
type LevelData = { id:LevelId; request:string; comparator:string; code:string; dishes:Dish[]; expected:Dish[]; lesson:string; trap?:string };

const base1: Dish[] = [
  {id:'h', emoji:'🍔', name:'Hamburguesa', price:12, calories:850},
  {id:'e', emoji:'🥗', name:'Ensalada', price:8, calories:320},
  {id:'p', emoji:'🍕', name:'Pizza', price:15, calories:1100},
  {id:'s', emoji:'🍣', name:'Sushi', price:18, calories:450},
  {id:'t', emoji:'🌮', name:'Tacos', price:10, calories:600},
];
const tieMenu: Dish[] = [
  {id:'h', emoji:'🍔', name:'Hamburguesa', price:12, calories:850},
  {id:'b', emoji:'🌯', name:'Burrito', price:12, calories:500},
  {id:'e', emoji:'🥗', name:'Ensalada', price:8, calories:320},
  {id:'t', emoji:'🌮', name:'Tacos', price:10, calories:600},
  {id:'p', emoji:'🍕', name:'Pizza', price:15, calories:1100},
];
const stringMenu: Dish[] = [
  {id:'h', emoji:'🍔', name:'Hamburguesa', price:'12€', calories:850},
  {id:'e', emoji:'🥗', name:'Ensalada', price:'8€', calories:320},
  {id:'p', emoji:'🍕', name:'Pizza', price:'15€', calories:1100},
  {id:'s', emoji:'🍣', name:'Sushi', price:'18€', calories:450},
  {id:'t', emoji:'🌮', name:'Tacos', price:'10€', calories:600},
];
const pool: Dish[] = [
  {id:'pa', emoji:'🍝', name:'Pasta', price:13, calories:720},
  {id:'so', emoji:'🍲', name:'Sopa', price:7, calories:280},
  {id:'st', emoji:'🥩', name:'Filete', price:22, calories:940},
  {id:'fi', emoji:'🐟', name:'Pescado', price:19, calories:520},
  {id:'cu', emoji:'🍛', name:'Curry', price:11, calories:680},
  {id:'ra', emoji:'🍜', name:'Ramen', price:14, calories:810},
  {id:'sa', emoji:'🥪', name:'Sándwich', price:9, calories:430},
  {id:'de', emoji:'🍰', name:'Postre', price:6, calories:540},
  {id:'qu', emoji:'🧀', name:'Quesadilla', price:10, calories:610},
  {id:'ce', emoji:'🥘', name:'Cazuela', price:17, calories:880},
  {id:'ta', emoji:'🌮', name:'Tacos', price:10, calories:600},
  {id:'bu', emoji:'🍔', name:'Hamburguesa', price:12, calories:850},
];
const shuffleArr = <T,>(arr:T[]):T[] => [...arr].sort(()=>Math.random()-0.5);
const priceNum = (d:Dish)=> typeof d.price==='string' ? parseFloat(d.price) : d.price;
const byPriceAsc=(a:Dish,b:Dish)=>priceNum(a)-priceNum(b);
const byCalDesc=(a:Dish,b:Dish)=>b.calories-a.calories;
const byCompound=(a:Dish,b:Dish)=>priceNum(a)-priceNum(b) || a.calories-b.calories;

function makeLevel(id:LevelId):LevelData{
  if(id==='1') return {id, request:'Quiero el menú de MÁS BARATO a MÁS CARO', comparator:'(a, b) => a.precio - b.precio', code:'a.precio - b.precio', dishes:base1, expected:[...base1].sort(byPriceAsc), lesson:'El comparador devuelve un número. Si sale negativo, el primer plato va antes.'};
  if(id==='2') return {id, request:'Quiero el menú de MÁS CALORÍAS a MENOS', comparator:'(a, b) => b.calorias - a.calorias', code:'b.calorias - a.calorias', dishes:base1, expected:[...base1].sort(byCalDesc), lesson:'Intercambiar a y b invierte el orden: b - a es descendente.'};
  if(id==='3') return {id, request:'De MÁS BARATO a MÁS CARO; si empatan, MENOS CALORÍAS primero', comparator:'(a, b) => a.precio - b.precio || a.calorias - b.calorias', code:'a.precio - b.precio || a.calorias - b.calorias', dishes:tieMenu, expected:[...tieMenu].sort(byCompound), lesson:'Si precio da 0 (empate), JS pasa al segundo criterio: calorías.'};
  if(id==='4') return {id, request:'De MÁS BARATO a MÁS CARO (precios como texto: “10€” )', comparator:'(a, b) => parseFloat(a.precio) - parseFloat(b.precio)', code:'parseFloat(a.precio) - parseFloat(b.precio)', dishes:stringMenu, expected:[...stringMenu].sort(byPriceAsc), lesson:'parseFloat("10€") = 10. Sin él, "10€" - "8€" = NaN y sort() ordena mal.', trap:'Elige el comparador correcto antes de comprobar.'};
  if(id==='19'){
    const dishes: Dish[] = [
      {id:'a', emoji:'🍔', name:'Hamburguesa', price:12, calories:850},{id:'b', emoji:'🥗', name:'Ensalada', price:8, calories:320},
      {id:'c', emoji:'🍕', name:'Pizza', price:15, calories:1100},{id:'d', emoji:'🍣', name:'Sushi', price:18, calories:450},
      {id:'e', emoji:'🌮', name:'Tacos', price:10, calories:600},{id:'f', emoji:'🌯', name:'Burrito', price:12, calories:500},
      {id:'g', emoji:'🍝', name:'Pasta', price:13, calories:720},{id:'h', emoji:'🍲', name:'Sopa', price:7, calories:280},
      {id:'i', emoji:'🥩', name:'Filete', price:22, calories:940},{id:'j', emoji:'🥪', name:'Sándwich', price:9, calories:430},
    ];
    return {id, request:'COMPUESTO: de MÁS BARATO a MÁS CARO; si empatan, MENOS CALORÍAS primero', comparator:'(a, b) => a.precio - b.precio || a.calorias - b.calorias', code:'a.precio - b.precio || a.calorias - b.calorias', dishes, expected:[...dishes].sort(byCompound), lesson:'Nivel 19: 10 platos, comparador compuesto y 90 segundos.'};
  }
  const kinds = [byPriceAsc, byCalDesc, byCompound];
  const kind = Math.floor(Math.random()*3);
  const dishes = shuffleArr(pool).slice(0,6).map((d,i)=>({...d, id:`inf-${i}-${d.id}`, price:5+Math.floor(Math.random()*20), calories:200+Math.floor(Math.random()*9)*100}));
  const requests = ['Quiero el menú de MÁS BARATO a MÁS CARO','Quiero el menú de MÁS CALORÍAS a MENOS','De MÁS BARATO a MÁS CARO; si empatan, MENOS CALORÍAS primero'];
  const codes = ['a.precio - b.precio','b.calorias - a.calorias','a.precio - b.precio || a.calorias - b.calorias'];
  return {id:'inf', request:requests[kind], comparator:`(a, b) => ${codes[kind]}`, code:codes[kind], dishes, expected:[...dishes].sort(kinds[kind]), lesson: kind===2 ? 'Recuerda: 0 significa empate y activa el segundo criterio.' : 'Lee la petición y elige el orden antes de hacer clic.'};
}

async function api(action:string, args:Record<string,unknown>){
  const res = await fetch("actions", {method:'POST', headers:{'content-type':'application/json'}, body:JSON.stringify({action, args})});
  const json = await res.json().catch(()=>({}));
  if(!res.ok || json.error) throw new Error(json.error || `Error ${res.status}`);
  return json.data;
}

export default function App(){
  const [levelId,setLevelId] = useState<LevelId>('1');
  const [level,setLevel] = useState<LevelData>(()=>makeLevel('1'));
  const [display,setDisplay] = useState<Dish[]>(()=>shuffleArr(base1));
  const [order,setOrder] = useState<Dish[]>([]);
  const [points,setPoints] = useState(0);
  const [streak,setStreak] = useState(0);
  const [solved,setSolved] = useState<string[]>([]);
  const [logs,setLogs] = useState<string[]>(['🍳 Cocina lista. El cliente espera su menú ordenado.']);
  const [debug,setDebug] = useState<string[]>(['> Esperando tu orden…','🧠 El comparador devuelve un número, no true/false.']);
  const [feedback,setFeedback] = useState<{ok:boolean; text:string; errorIndex?:number}|null>(null);
  const [codeInput,setCodeInput] = useState('');
  const [trapChoice,setTrapChoice] = useState('parseFloat(a.precio) - parseFloat(b.precio)');
  const [timeLeft,setTimeLeft] = useState(90);
  const [timerOn,setTimerOn] = useState(false);
  const [saveState,setSaveState] = useState('Cargando progreso…');
  const recordId = useRef<string|null>(null);
  const loaded = useRef(false);
  const [bonusUsed,setBonusUsed] = useState(false);

  useEffect(()=>{
    let alive=true;
    (async()=>{
      try{
        const data = await api('records.list', {collection:'chef-progress'});
        const rec = data?.records?.[0];
        if(alive && rec?.value){
          recordId.current = rec.id;
          setPoints(Number(rec.value.points||0)); setStreak(Number(rec.value.streak||0)); setSolved(Array.isArray(rec.value.solved)?rec.value.solved:[]);
          setSaveState('Progreso guardado');
        } else if(alive) setSaveState('Progreso listo para guardar');
      }catch{ if(alive) setSaveState('Sin conexión: tu partida sigue en esta sesión'); }
      loaded.current=true;
    })();
    return ()=>{alive=false};
  },[]);

  useEffect(()=>{
    if(!loaded.current) return;
    const t=setTimeout(async()=>{
      try{
        const value={points, streak, solved, updatedAt:new Date().toISOString()};
        if(recordId.current) await api('records.replace', {collection:'chef-progress', id:recordId.current, value});
        else { const created=await api('records.create', {collection:'chef-progress', value}); recordId.current=created?.id||null; }
        setSaveState('Progreso guardado');
      }catch{ setSaveState('Sin conexión: tu partida sigue en esta sesión'); }
    },650);
    return ()=>clearTimeout(t);
  },[points,streak,solved]);

  useEffect(()=>{
    if(!timerOn) return;
    if(timeLeft<=0){ setTimerOn(false); setFeedback({ok:false,text:'⏱ Tiempo agotado en el Nivel 19. Pulsa “Nivel 19” para intentarlo de nuevo.'}); return; }
    const t=setTimeout(()=>setTimeLeft(v=>v-1),1000); return ()=>clearTimeout(t);
  },[timerOn,timeLeft]);

  const startLevel=(id:LevelId)=>{
    const next=makeLevel(id); setLevelId(id); setLevel(next); setDisplay(shuffleArr(next.dishes)); setOrder([]); setFeedback(null); setCodeInput(''); setBonusUsed(false);
    setTimeLeft(90); setTimerOn(id==='19'); setTrapChoice('parseFloat(a.precio) - parseFloat(b.precio)');
    setDebug([`> Nuevo pedido: Nivel ${id==='inf'?'Infinito':id==='19'?'19':id}`, `🧑🍳 ${next.request}`]);
    setLogs(v=>[...v, `Nuevo pedido · Nivel ${id==='inf'?'Infinito':id}`].slice(-8));
  };
  const pick=(d:Dish)=>{
    if(order.some(x=>x.id===d.id) || feedback?.ok) return;
    setOrder(v=>[...v,d]); setFeedback(null);
  };
  const undo=()=>{ setOrder(v=>v.slice(0,-1)); setFeedback(null); };
  const shuffleMenu=()=>{ setDisplay(shuffleArr(level.dishes)); setOrder([]); setFeedback(null); setLogs(v=>[...v,'🔀 Menú mezclado de nuevo'].slice(-8)); };
  const resetAll=()=>{ setPoints(0); setStreak(0); setSolved([]); setSaveState('Progreso guardado'); startLevel('1'); setLogs(['🍳 Cocina reiniciada. Nuevo turno.']); };

  const check=()=>{
    if(order.length!==level.dishes.length){ setFeedback({ok:false,text:`Te faltan ${level.dishes.length-order.length} platos. Completa “Tu orden” antes de comprobar.`}); return; }
    if(levelId==='4' && trapChoice!=='parseFloat(a.precio) - parseFloat(b.precio)'){
      setPoints(p=>Math.max(0,p-5)); setStreak(0); setFeedback({ok:false,text:'🪤 Trampa: ese comparador no convierte el texto. −5 puntos. Elige parseFloat.'});
      setDebug([`> platos.sort((a,b) => ${trapChoice})`, '⚠️ Con texto, "10€" - "8€" = NaN.', '🧠 parseFloat("10€") = 10 · parseFloat("8€") = 8']); setLogs(v=>[...v,'🪤 Trampa parseFloat: −5'].slice(-8)); return;
    }
    const firstBad = order.findIndex((d,i)=>d.id!==level.expected[i].id);
    const [a,b] = level.dishes.slice(0,2);
    const diff = levelId==='2' ? b.calories-a.calories : priceNum(a)-priceNum(b);
    const lines=[`> Ejecutando platos.sort((a, b) => ${level.code})`, `[Comparación] ${a.name} vs ${b.name} → ${diff} → ${diff<0?'el primero va antes':diff>0?'el segundo va antes':'empate, pasa al siguiente criterio'}`, '🧠 Depurador: <0 → a antes, >0 → b antes, 0 → empate, pasa al siguiente criterio con ||', levelId==='3'||levelId==='19' ? 'Para compuesto: “Si a.precio - b.precio da 0 (empate), evalúa a.calorias - b.calorias”.' : levelId==='4' ? 'Para parseFloat: “parseFloat(\\"10€\\") = 10, parseFloat(\\"8€\\") = 8. Sin parseFloat, \\"10€\\" - \\"8€\\" = NaN y sort() ordena mal. Con strings, compara \\"1\\" vs \\"8\\”.”' : 'El comparador devuelve un número, no true/false.', `> Resultado: [${level.expected.map(d=>typeof d.price==='string'?d.price:`${d.price}€`).join(', ')}] ← MISMO array, MUTADO`, '⚖️ sort() muta | toSorted() NO muta'];
    setDebug(lines);
    if(firstBad===-1){
      const base = levelId==='19' ? 20 : 10;
      let bonus=0;
      const norm=codeInput.toLowerCase().replace(/\s+/g,'');
      const expectedNorm=level.code.toLowerCase().replace(/\s+/g,'');
      if(codeInput.trim() && !bonusUsed && (norm.includes(expectedNorm) || (levelId==='4' && norm.includes('parsefloat')))){
        bonus=5; setBonusUsed(true);
      }
      setPoints(p=>p+base+bonus); setStreak(s=>s+1); if(!solved.includes(levelId)) setSolved(v=>[...v,levelId]);
      setTimerOn(false);
      setFeedback({ok:true,text:`✅ ¡Orden perfecto! +${base} puntos${bonus?` + ${bonus} por el código`:''}. Chef 👨‍🍳`});
      setLogs(v=>[...v,`✅ Nivel ${levelId} resuelto · +${base+bonus}`].slice(-8));
    }else{
      setPoints(p=>Math.max(0,p-3)); setStreak(0);
      setFeedback({ok:false,errorIndex:firstBad,text:`❌ Primer error · −3. Aquí debería ir ${level.expected[firstBad].emoji} ${level.expected[firstBad].name}, no ${order[firstBad].emoji} ${order[firstBad].name}.`});
      setLogs(v=>[...v,`❌ Error en la posición ${firstBad+1} · −3`].slice(-8));
    }
  };

  const priceLabel=(d:Dish)=> typeof d.price==='string'?d.price:`${d.price}€`;
  const before = useMemo(()=>level.dishes.map(d=>priceLabel(d)).join(', '),[level]);
  const after = useMemo(()=>level.expected.map(d=>priceLabel(d)).join(', '),[level]);
  const levels:[LevelId,string,string][]=[['1','Nivel 1','Barato a Caro'],['2','Nivel 2','Calorías Desc'],['3','Nivel 3','Compuesto · Empate'],['4','Nivel 4','Trampa parseFloat'],['inf','Modo Infinito','Aleatorio · 6 platos'],['19','Nivel 19','10 platos · 90 s']];
  const fmt=(s:number)=>`${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`;

  return <div data-safe-area-inset-root style={{boxSizing:'border-box', paddingTop:'var(--safe-area-inset-top)', minHeight:'100vh', background:'var(--bg)'}} className="overflow-x-clip">
    <div className="mx-auto max-w-[1680px] px-3 py-3 sm:px-5 sm:py-5">
      <header data-safe-area-sticky-top style={{top:'var(--safe-area-inset-top)'}} className="sticky z-20 mb-4 flex flex-wrap items-center gap-3 rounded-2xl border border-[#273349] bg-[#0a101d]/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-3 min-w-0"><div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-[#ff7a00] text-2xl shadow-[0_0_30px_rgba(255,122,0,.45)]">🍔</div><div className="min-w-0"><h1 className="neon text-lg leading-none font-bold tracking-wide text-[#ff9b33] sm:text-2xl">RESTAURANTE “EL ORDEN PERFECTO” <span className="text-white">· CHEF</span></h1><p className="mt-1 text-xs font-semibold tracking-[.22em] text-[#a7b2c5]">SORT() CON COMPARADORES · COCINA EN VIVO</p></div></div>
        <div className="ml-auto flex flex-wrap gap-2"><span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs font-bold text-emerald-300">{saveState}</span><span className="rounded-full bg-[#ff7a00] px-3 py-1 text-xs font-bold text-black">PUNTOS: {points}</span><span className="flex items-center gap-1 rounded-full border border-orange-400/50 bg-orange-500/10 px-3 py-1 text-xs font-bold text-orange-200"><Flame size={14}/> RACHA: {streak}</span>{solved.includes('19') && <span className="rounded-full bg-[#ffd166] px-3 py-1 text-xs font-bold text-black">🏆 CHEF NIVEL 19</span>}</div>
      </header>

      <main className="grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_420px]">
        <aside className="space-y-4">
          <section className="panel p-4"><div className="mb-3 flex items-center justify-between"><h2 className="font-bold tracking-widest text-orange-300">📋 PEDIDOS</h2><span className="text-xs text-[#a7b2c5]">{solved.length}/6 resueltos</span></div><div className="space-y-2">{levels.map(([id,title,sub])=><button key={id} onClick={()=>startLevel(id)} className={`w-full rounded-xl border px-3 py-3 text-left transition ${levelId===id?'border-[#ff7a00] bg-[#ff7a00]/15 shadow-[0_0_22px_rgba(255,122,0,.2)]':'border-[#273349] bg-white/[.02] hover:border-orange-400/50'}`}><div className="flex items-center justify-between"><span className="font-bold">{title}</span><span>{solved.includes(id)?'✅':'›'}</span></div><div className="mt-0.5 text-sm text-[#a7b2c5]">{sub}</div></button>)}</div><button onClick={resetAll} className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#273349] px-3 py-2 text-sm font-bold hover:bg-white/5"><RotateCcw size={16}/> Reiniciar partida</button></section>
          <section className="panel p-4"><h2 className="font-bold text-[#ffd166]">⚖️ sort() vs toSorted()</h2><div className="font-code mt-3 space-y-2 text-xs leading-relaxed"><p><span className="text-orange-300">sort()</span> cambia el array original.</p><p><span className="text-emerald-300">toSorted()</span> devuelve una copia nueva.</p><p className="rounded-lg bg-black/40 p-2 text-[#a7b2c5]">const a=[3,1,2];<br/>a.sort() // a = [1,2,3]<br/>a.toSorted() // copia ordenada</p></div></section>
          <section className="panel p-4"><h2 className="font-bold tracking-widest">🧾 BITÁCORA</h2><div className="mt-3 space-y-2">{logs.map((l,i)=><p key={i} className="border-l-2 border-orange-500 pl-3 text-sm leading-snug text-[#cbd5e6] [overflow-wrap:anywhere]">{l}</p>)}</div></section>
        </aside>

        <section className="min-w-0 space-y-4">
          <div className="rounded-2xl border border-orange-400 bg-gradient-to-r from-[#ff7a00] to-[#ff9d2e] p-4 text-black shadow-[0_0_42px_rgba(255,122,0,.28)]"><div className="flex flex-wrap items-start justify-between gap-3"><div><p className="text-xs font-bold tracking-[.22em]">🧑🍳 CLIENTE</p><p className="mt-1 text-xl font-bold leading-tight sm:text-2xl">“{level.request}”</p></div>{levelId==='19' && <div className="flex items-center gap-2 rounded-xl bg-black/25 px-3 py-2 font-bold"><Timer size={18}/>{fmt(timeLeft)}</div>}</div><p className="mt-2 text-sm font-semibold">Lee la petición. Haz clic en los platos en el orden correcto.</p></div>

          <div className="panel p-4 sm:p-5"><div className="mb-3 flex flex-wrap items-center justify-between gap-2"><h2 className="font-bold tracking-widest text-orange-300">MENÚ DESORDENADO</h2><span className="text-xs font-semibold text-[#a7b2c5]">Clic simple · SIN arrastrar</span></div><div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">{display.map((d,idx)=>{const used=order.some(x=>x.id===d.id);return <button key={d.id} disabled={used} onClick={()=>pick(d)} className={`dish-card relative rounded-2xl border p-3 text-left ${used?'border-[#273349] bg-black/30 opacity-35':'border-[#354462] bg-[#111c31]'}`}><span className="absolute right-3 top-2 text-xs text-[#a7b2c5]">{idx+1}</span><span className="text-3xl">{d.emoji}</span><div className="mt-2 text-lg font-bold leading-tight">{d.name}</div><div className="mt-1 flex gap-2 text-sm"><span className="rounded-full bg-[#ff7a00]/15 px-2 py-0.5 font-bold text-orange-200">{priceLabel(d)}</span><span className="rounded-full bg-white/5 px-2 py-0.5 text-[#cbd5e6]">{d.calories} kcal</span></div>{used && <span className="mt-2 block text-xs font-bold text-emerald-300">✓ EN TU ORDEN</span>}</button>})}</div>

          <div className="mt-5"><p className="mb-2 text-sm font-bold tracking-widest text-[#a7b2c5]">TU ORDEN:</p><div className={`flex min-h-[64px] flex-wrap gap-2 rounded-xl border border-dashed p-2 ${feedback?.ok===false?'shake border-red-400':''}`}>{order.length===0?<span className="self-center px-2 text-sm text-[#a7b2c5]">Toca un plato para empezar…</span>:order.map((d,i)=><span key={d.id} className={`pop rounded-xl px-3 py-2 text-sm font-bold ${feedback?.errorIndex===i?'bg-[#ff4d62] text-white':feedback?.ok?'bg-emerald-500 text-white':'bg-[#ff7a00] text-black'}`}>{i+1}. {d.emoji} {d.name}</span>)}</div></div>

          {levelId==='4' && <div className="mt-4 rounded-xl border border-amber-400/40 bg-amber-400/5 p-3"><p className="font-bold text-amber-200">🪤 Elige el comparador (Nivel 4)</p><div className="mt-2 space-y-2">{['a.precio - b.precio','parseFloat(a.precio) - parseFloat(b.precio)','a.precio < b.precio'].map(opt=><label key={opt} className={`flex cursor-pointer items-center gap-2 rounded-lg border px-3 py-2 font-code text-xs sm:text-sm ${trapChoice===opt?'border-[#ff7a00] bg-[#ff7a00]/10':'border-[#273349]'}`}><input type="radio" name="trap" checked={trapChoice===opt} onChange={()=>setTrapChoice(opt)} className="accent-[#ff7a00]"/><span className="[overflow-wrap:anywhere]">{opt}{opt.includes('parseFloat')?' · correcto':opt.includes('<')?' · booleano trampa':' · sin parseFloat'}</span></label>)}</div></div>}

          <label className="mt-4 block"><span className="mb-1 flex items-center gap-2 text-sm font-bold text-[#ffd166]"><Code2 size={16}/> Escribe el código (opcional · +5 si es correcto)</span><input value={codeInput} onChange={e=>setCodeInput(e.target.value)} placeholder="Ej.: a.precio - b.precio" className="font-code w-full rounded-xl border border-[#273349] bg-black/40 px-3 py-3 text-sm text-white outline-none focus:border-[#ff7a00]"/></label>

          <div className="mt-4 flex flex-wrap gap-2"><button onClick={undo} disabled={!order.length} className="flex items-center gap-2 rounded-xl border border-[#273349] px-4 py-3 font-bold disabled:opacity-40 hover:bg-white/5"><Undo2 size={18}/> ↩ DESHACER ÚLTIMO</button><button onClick={shuffleMenu} className="flex items-center gap-2 rounded-xl border border-[#273349] px-4 py-3 font-bold hover:bg-white/5"><Shuffle size={18}/> 🔀 MEZCLAR</button><button onClick={check} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#8dff57] px-4 py-3 font-bold text-black shadow-[0_0_24px_rgba(141,255,87,.25)] hover:brightness-110"><Check size={18}/> ✅ COMPROBAR</button></div>
          {feedback && <div className={`mt-3 rounded-xl border p-3 font-bold ${feedback.ok?'border-emerald-400 bg-emerald-400/10 text-emerald-200':'border-red-400 bg-red-500/10 text-red-200'}`}>{feedback.text}</div>}
          <p className="mt-3 text-sm text-[#a7b2c5]">Puntuación: acierto +10 (Nivel 19: +20) · primer error −3 · trampa parseFloat −5 · código correcto +5.</p></div>

          <div className="panel p-4"><h2 className="font-bold tracking-widest text-orange-300">🔍 PANEL DE MUTACIÓN</h2><div className="font-code mt-3 rounded-xl bg-black/50 p-3 text-xs leading-relaxed sm:text-sm"><p><span className="text-[#a7b2c5]">Antes:</span> [{before}]</p><p className="mt-1"><span className="text-[#a7b2c5]">Después:</span> [{after}]</p><p className="mt-3 text-orange-200">sort() mutó el array original. toSorted() NO mutaría.</p></div></div>
        </section>

        <aside className="space-y-4">
          <section className="panel overflow-hidden"><div className="flex items-center justify-between border-b border-[#273349] bg-black/30 px-4 py-3"><h2 className="flex items-center gap-2 font-bold tracking-widest"><Terminal size={18} className="text-orange-400"/> DEPURADOR AVANZADO: .sort()</h2><span className="flicker h-2 w-2 rounded-full bg-emerald-400"/></div><div className="scroll-thin max-h-[560px] space-y-2 overflow-y-auto p-4 font-code text-xs leading-relaxed sm:text-[13px]">{debug.map((line,i)=><p key={i} className={line.startsWith('>')?'text-[#8dff57]':line.startsWith('🧠')?'text-[#ffd166]':'text-[#cbd5e6]'}>{line}</p>)}</div></section>
          <section className="panel p-4"><h2 className="flex items-center gap-2 font-bold"><Sparkles className="text-[#ffd166]"/> REVELADO AL COMPROBAR</h2><div className="font-code mt-3 rounded-xl bg-black/50 p-3 text-xs leading-relaxed sm:text-sm">platos.sort((a, b) =&gt; {level.code})<br/><span className="text-[#a7b2c5]">// → [{level.expected.map(d=>`${d.emoji} ${priceLabel(d)}`).join(', ')}]</span></div><p className="mt-3 text-sm leading-relaxed text-[#cbd5e6]">{level.lesson}</p></section>
          <section className="panel p-4"><h2 className="flex items-center gap-2 font-bold"><ChefHat className="text-orange-300"/> CÓMO SE JUEGA</h2><ol className="mt-3 space-y-2 text-sm leading-relaxed text-[#cbd5e6]"><li><b className="text-white">1.</b> Lee la caja naranja del cliente.</li><li><b className="text-white">2.</b> Toca los platos en el orden correcto.</li><li><b className="text-white">3.</b> Deshaz el último si te equivocas.</li><li><b className="text-white">4.</b> Pulsa COMPROBAR con todos los platos.</li></ol><div className="mt-4 flex items-center gap-2 rounded-xl bg-[#ff7a00]/10 px-3 py-2 text-sm font-bold text-orange-200"><UtensilsCrossed size={17}/> El comparador decide: negativo, cero o positivo.</div></section>
          <section className="panel p-4"><h2 className="font-bold text-[#ffd166]">⚠️ TRAMPA CLÁSICA</h2><p className="mt-2 text-sm leading-relaxed text-[#cbd5e6]">Sin parseFloat, sort() con texto compara “1” &lt; “8” de forma lexicográfica. Por eso [“10€”, “12€”, “15€”, “18€”, “8€”] sale mal.</p></section>
        </aside>
      </main>
      <footer className="mt-4 flex flex-wrap items-center justify-between gap-2 pb-2 text-xs text-[#a7b2c5]"><span>El Orden Perfecto · Aprende sort() jugando.</span><span>Tu progreso se guarda automáticamente.</span></footer>
      <div className="sr-only">Fin del juego</div>
    </div>
  </div>
}
