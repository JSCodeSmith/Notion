import React, { useEffect, useMemo, useRef, useState } from 'react';

type Person = { nombre: string; vip: boolean; palomitas: boolean; edad: number };
type Level = {
  id: number; title: string; rule: string; code: string; concept: string;
  people: Person[]; answer: number; core: string; detail: string; accepted: string[];
};

const LEVELS: Level[] = [
  { id:1, title:'Primero con 🎟 VIP', rule:'El primero con 🎟 VIP', code:'fila.findIndex(p => p.vip)', concept:'Booleano simple', answer:2, core:'p.vip', detail:'vip', accepted:['p.vip','p.vip===true','p.vip==true'],
    people:[{nombre:'Ana',vip:false,palomitas:true,edad:28},{nombre:'Beto',vip:false,palomitas:false,edad:35},{nombre:'Caro',vip:true,palomitas:false,edad:16},{nombre:'Dani',vip:true,palomitas:true,edad:22},{nombre:'Eva',vip:true,palomitas:false,edad:19}] },
  { id:2, title:'Primero con edad < 18', rule:'El primero con edad < 18', code:'fila.findIndex(p => p.edad < 18)', concept:'Comparación numérica', answer:3, core:'p.edad<18', detail:'edad', accepted:['p.edad<18','p.edad<=17','p.edad<18'],
    people:[{nombre:'Ana',vip:true,palomitas:false,edad:25},{nombre:'Beto',vip:false,palomitas:true,edad:32},{nombre:'Caro',vip:false,palomitas:true,edad:19},{nombre:'Dani',vip:true,palomitas:false,edad:17},{nombre:'Eva',vip:false,palomitas:true,edad:22},{nombre:'Fede',vip:true,palomitas:false,edad:15}] },
  { id:3, title:'Primero con 🎟 VIP y 🍿', rule:'El primero con 🎟 VIP y 🍿 palomitas', code:'fila.findIndex(p => p.vip && p.palomitas)', concept:'Condición compuesta (&&)', answer:2, core:'p.vip&&p.palomitas', detail:'vip-palomitas', accepted:['p.vip&&p.palomitas','p.palomitas&&p.vip'],
    people:[{nombre:'Ana',vip:false,palomitas:true,edad:28},{nombre:'Beto',vip:true,palomitas:false,edad:35},{nombre:'Caro',vip:true,palomitas:true,edad:16},{nombre:'Dani',vip:true,palomitas:true,edad:22},{nombre:'Eva',vip:false,palomitas:true,edad:19}] },
  { id:4, title:'Primero sin 🍿 palomitas', rule:'El primero sin 🍿 palomitas', code:'fila.findIndex(p => !p.palomitas)', concept:'Negación (!)', answer:2, core:'!p.palomitas', detail:'palomitas', accepted:['!p.palomitas','p.palomitas===false','p.palomitas==false','!p.palomitas===true'],
    people:[{nombre:'Ana',vip:true,palomitas:true,edad:28},{nombre:'Beto',vip:false,palomitas:true,edad:35},{nombre:'Caro',vip:true,palomitas:false,edad:16},{nombre:'Dani',vip:false,palomitas:true,edad:22},{nombre:'Eva',vip:true,palomitas:false,edad:19}] },
  { id:5, title:"Primero con nombre 'C'", rule:"El primero cuyo nombre empiece por 'C'", code:"fila.findIndex(p => p.nombre.startsWith('C'))", concept:'Condición sobre string', answer:3, core:"p.nombre.startswith('c')", detail:'nombre', accepted:["p.nombre.startswith('c')",'p.nombre.startswith("c")',"p.nombre[0]==='c'","p.nombre[0]===\"c\""],
    people:[{nombre:'Ana',vip:false,palomitas:true,edad:28},{nombre:'Beto',vip:true,palomitas:false,edad:35},{nombre:'Dani',vip:true,palomitas:true,edad:22},{nombre:'Caro',vip:true,palomitas:false,edad:16},{nombre:'Eva',vip:false,palomitas:true,edad:19},{nombre:'Carlos',vip:true,palomitas:false,edad:31}] },
  { id:6, title:'TRAMPA: VIP + 🧒 + 🍿', rule:'El primero con 🎟 VIP y 🧒 menor y 🍿 palomitas', code:'fila.findIndex(p => p.vip && p.edad < 18 && p.palomitas)', concept:'Nadie cumple → -1', answer:-1, core:'p.vip&&p.edad<18&&p.palomitas', detail:'triple', accepted:['p.vip&&p.edad<18&&p.palomitas','p.vip&&p.palomitas&&p.edad<18','p.edad<18&&p.vip&&p.palomitas'],
    people:[{nombre:'Ana',vip:true,palomitas:true,edad:28},{nombre:'Beto',vip:true,palomitas:false,edad:16},{nombre:'Caro',vip:false,palomitas:true,edad:15},{nombre:'Dani',vip:true,palomitas:false,edad:28},{nombre:'Eva',vip:false,palomitas:false,edad:14},{nombre:'Fede',vip:false,palomitas:true,edad:30}] },
];

const NAMES = ['Ana','Beto','Caro','Dani','Eva','Fede','Gala','Hugo','Iris','Javi','Luna','Marco','Nina','Omar','Pía','Quino','Rosa','Santi','Tina','Ugo','Vera','Willy','Ximena','Yago','Zoe','Alba','Bruno','Clara','Diego','Emma'];
function makeInfinite(): Person[] {
  const arr: Person[] = Array.from({length:50}, (_,i)=>{
    const n = NAMES[i % NAMES.length] + (i>=NAMES.length ? ' ' + (Math.floor(i/NAMES.length)+1) : '');
    return { nombre:n, vip: Math.random()<.38, palomitas: Math.random()<.48, edad: 12+Math.floor(Math.random()*49) };
  });
  arr[3].vip = true; arr[10].palomitas = true; arr[20].edad = 14;
  arr[1].vip = false; arr[2].vip = false; arr[0].vip = false;
  return arr;
}
function checkPerson(level: Level, p: Person): boolean {
  if(level.id===1) return p.vip;
  if(level.id===2) return p.edad<18;
  if(level.id===3) return p.vip && p.palomitas;
  if(level.id===4) return !p.palomitas;
  if(level.id===5) return p.nombre.startsWith('C');
  return p.vip && p.edad<18 && p.palomitas;
}
function describe(level: Level, p: Person): string {
  const menor = p.edad<18;
  if(level.id===1) return `vip: ${p.vip}`;
  if(level.id===2) return `edad: ${p.edad} → edad < 18: ${p.edad<18}`;
  if(level.id===3) return `vip: ${p.vip}, palomitas: ${p.palomitas}`;
  if(level.id===4) return `palomitas: ${p.palomitas} → !palomitas: ${!p.palomitas}`;
  if(level.id===5) return `nombre: "${p.nombre}" → empieza por 'C': ${p.nombre.startsWith('C')}`;
  return `vip: ${p.vip}, menor: ${menor} (edad ${p.edad}), palomitas: ${p.palomitas}`;
}
function normalizeCond(raw: string){
  return raw.toLowerCase().replace(/\s+/g,'').replace(/;$/,'').replace(/^\(p\)=>/,'').replace(/^p=>/,'').replace(/"/g,"'").replace(/\(p\)/g,'p');
}

export default function App(){
  const [levelId,setLevelId] = useState(1);
  const [infinite,setInfinite] = useState(false);
  const [people,setPeople] = useState<Person[]>(LEVELS[0].people);
  const [round,setRound] = useState(1);
  const [points,setPoints] = useState(0);
  const [streak,setStreak] = useState(0);
  const [badge,setBadge] = useState(false);
  const [solved,setSolved] = useState<number[]>([]);
  const [phase,setPhase] = useState<1|2|3>(1);
  const [cursor,setCursor] = useState(-1);
  const [scanning,setScanning] = useState(false);
  const [passed,setPassed] = useState(false);
  const [scanDone,setScanDone] = useState(false);
  const [resolved,setResolved] = useState(false);
  const [result,setResult] = useState('');
  const [logs,setLogs] = useState<string[]>(['▶ Depurador listo. Pulsa ESCANEAR para recorrer la fila.']);
  const [condition,setCondition] = useState('');
  const [condOk,setCondOk] = useState<boolean|null>(null);
  const [bitacora,setBitacora] = useState<string[]>(['🎬 Bienvenido/a, acomodador/a. La sala está lista.']);
  const [shake,setShake] = useState(false);
  const [confetti,setConfetti] = useState(false);
  const [infStep,setInfStep] = useState(0);
  const [infTargets,setInfTargets] = useState<number[]>([]);
  const [infFound,setInfFound] = useState<number[]>([]);
  const [infDone,setInfDone] = useState(false);
  const cursorRef = useRef(-1); cursorRef.current = cursor;
  const scanningRef = useRef(false); scanningRef.current = scanning;

  const level = LEVELS.find(l=>l.id===levelId)!;
  const correct = useMemo(()=>{
    if(!infinite) return level.answer;
    if(!infTargets.length) return -999;
    return infTargets[infStep];
  },[infinite,level,infTargets,infStep]);
  const infStart = useMemo(()=> infStep===0?0: (infFound[infStep-1]??0)+1,[infStep,infFound]);

  const pushLog = (s:string)=> setLogs(prev=>[...prev.slice(-60),s]);
  const pushBit = (s:string)=> setBitacora(prev=>[s,...prev].slice(0,12));

  const startScan = ()=>{
    if(scanning || resolved) return;
    const start = infinite ? infStart : 0;
    setPhase(2); setScanning(true); setPassed(false); setScanDone(false); setCursor(start);
    const p = people[start];
    const ok = infinite ? (infStep===0? p.vip : infStep===1? p.palomitas : p.edad<18) : checkPerson(level,p);
    pushLog(`▶ Inicio en [${start}] — fila[${start}]`);
    pushLog(`[${start}] ${p.nombre} — ${infinite ? (infStep===0?`vip: ${p.vip}`:infStep===1?`palomitas: ${p.palomitas}`:`edad: ${p.edad} → menor: ${p.edad<18}`) : describe(level,p)} → ${ok?'✅ ¡ALTO! findIndex se detendría aquí.':'❌ no cumple → sigue'}`);
    if(ok && start===correct) pushLog(`💡 Pista: este SÍ cumple. Si no detienes ahora, te pasarás.`);
  };

  useEffect(()=>{
    if(!scanning) return;
    const t = setTimeout(()=>{
      const cur = cursorRef.current;
      const next = cur+1;
      // passing detection: leaving correct without stopping
      if(correct!==-999 && correct!==-1 && cur===correct && !passed){
        setPassed(true); setPoints(p=>p-5); setStreak(0);
        pushLog(`⚠️ ¡Ya pasaste al primero! findIndex se habría detenido aquí en el ${correct}. Si sigues, perderás -5.`);
        pushBit(`⚠️ Ronda ${round}: te pasaste del ${correct} (−5)`);
      }
      if(next>=people.length){
        setScanning(false); setScanDone(true); setPhase(3);
        pushLog(`🏁 Fin del recorrido. Revisó ${people.length} personas.`);
        if(!infinite && level.answer===-1) pushLog(`🧠 Revisó los ${people.length}, ninguno cumplió las 3 condiciones → por eso devuelve -1.`);
        if(infinite) pushLog(`🏁 Fin del tramo. Si no detuviste en el primero, vuelve a escanear este paso.`);
        return;
      }
      setCursor(next);
      const p = people[next];
      const ok = infinite ? (infStep===0? p.vip : infStep===1? p.palomitas : p.edad<18) : checkPerson(level,p);
      pushLog(`[${next}] ${p.nombre} — ${infinite ? (infStep===0?`vip: ${p.vip}`:infStep===1?`palomitas: ${p.palomitas}`:`edad: ${p.edad} → menor: ${p.edad<18}`) : describe(level,p)} → ${ok?'✅ ¡ALTO!':'❌ no cumple → sigue'}`);
    },700);
    return ()=>clearTimeout(t);
  },[scanning,cursor,people,correct]);

  const failShake = ()=>{ setShake(true); setTimeout(()=>setShake(false),500); };

  const stopHere = ()=>{
    if(resolved) return;
    if(!infinite && level.answer===-1){
      setScanning(false); setResolved(true); setPhase(3); setPoints(p=>p-3); setStreak(0); failShake();
      setResult(`❌ En esta fila NADIE cumple las 3 condiciones. Detener en [${cursor}] resta −3. La respuesta era −1.`); pushLog(`🛑 Detenido en [${cursor}] → no es válido en el caso −1. −3 puntos.`); pushBit(`❌ Ronda ${round}: detuviste en [${cursor}] en la trampa (−3)`); return;
    }
    if(cursor<0){ setResult('Pulsa ESCANEAR primero para mover el cursor.'); return; }
    setScanning(false);
    const isCorrect = cursor===correct;
    const norm = normalizeCond(condition);
    const condGood = !infinite && condition.trim()!=='' && level.accepted.map(a=>normalizeCond(a)).includes(norm);
    setCondOk(condition.trim()?condGood:null);
    if(isCorrect){
      if(passed){
        setResolved(true); setPhase(3);
        setResult(`⚠️ Te habías pasado del ${correct} (−5 ya aplicado). Detener aquí ya no suma +10. findIndex se habría detenido antes.`); pushLog(`🛑 Detenido en [${cursor}] después de pasarse. Sin +10.`); pushBit(`⚠️ Ronda ${round}: detuviste tarde en [${cursor}]`);
        return;
      }
      setConfetti(true); setTimeout(()=>setConfetti(false),1800);
      if(!infinite){
        const bonus = condGood?5:0; const base = 10+bonus;
        const newStreak = streak+1; let extra=0; let gotBadge=false;
        if(newStreak>=3){ extra=15; gotBadge=true; }
        setPoints(p=>p+base+extra); setStreak(gotBadge?0:newStreak); if(gotBadge) setBadge(true);
        setSolved(prev=>prev.includes(levelId)?prev:[...prev,levelId]);
        setResult(`✅ ¡Correcto! ${level.code} // → ${correct}${condGood?'  ·  +5 por la condición':''}${extra?'  ·  +15 BONUS ACOMODADOR EXPERTO 🎬':''}  →  +${base+extra} puntos.`);
        pushLog(`🎉 ${level.code} // → ${correct} ✅  (+${base+extra})`); pushBit(`✅ Ronda ${round}: Nivel ${levelId} correcto en [${correct}] (+${base+extra})`);
      } else {
        setPoints(p=>p+10); const found=[...infFound,cursor]; setInfFound(found);
        pushLog(`🎉 Paso ${infStep+1} correcto: ${infStep===0?'X':infStep===1?'Y':'Z'} = ${cursor} (+10)`);
        if(infStep<2){ setResult(`✅ Paso ${infStep+1} correcto: ${infStep===0?'X':infStep===1?'Y':'Z'} = ${cursor} (+10). Pulsa ESCANEAR para el paso ${infStep+2}.`); setInfStep(infStep+1); setCursor(-1); setPhase(1); setScanDone(false); }
        else { setInfDone(true); setResult(`🏆 ¡CADENA COMPLETA! X=${found[0]}, Y=${found[1]}, Z=${found[2]}  ·  +30 en total. Eres acomodador/a experto/a.`); pushBit(`🏆 Fila Infinita completa: X=${found[0]}, Y=${found[1]}, Z=${found[2]} (+30)`); setResolved(true); }
      }
      if(!infinite) setResolved(true);
      setPhase(3);
    } else {
      setPoints(p=>p-3); setStreak(0); failShake(); setResolved(true); setPhase(3);
      setResult(`❌ Detuviste en [${cursor}], pero ${people[cursor]?.nombre} no es el primero que cumple. ${level.code} // → ${correct}. −3 puntos.`); pushLog(`🛑 Detenido en [${cursor}] → incorrecto. Correcto: ${correct}. −3.`); pushBit(`❌ Ronda ${round}: detuviste en [${cursor}], correcto era ${correct} (−3)`);
    }
  };

  const nobody = ()=>{
    if(!scanDone){ setResult('Primero deja que el escaneo llegue al final de la fila. Así compruebas que nadie cumple.'); return; }
    if(resolved) return;
    setScanning(false); setResolved(true); setPhase(3); setConfetti(true); setTimeout(()=>setConfetti(false),1800);
    setPoints(p=>p+10); const ns=streak+1; let extra=0; if(ns>=3){extra=15; setBadge(true); setStreak(0);} else setStreak(ns);
    setSolved(prev=>prev.includes(6)?prev:[...prev,6]);
    setResult(`✅ ¡Correcto! ${level.code} // → −1. Revisó los 6, ninguno cumplió las 3, por eso devuelve −1. +${10+extra} puntos.`); pushLog(`🎉 ${level.code} // → -1 ✅ (+${10+extra})`); pushBit(`✅ Ronda ${round}: trampa resuelta, −1 (+${10+extra})`);
  };

  const chooseLevel = (id:number)=>{
    setInfinite(false); setLevelId(id); setPeople(LEVELS.find(l=>l.id===id)!.people); setRound(r=>r+1); setPhase(1); setCursor(-1); setScanning(false); setPassed(false); setScanDone(false); setResolved(false); setResult(''); setCondition(''); setCondOk(null); setConfetti(false); setLogs([`▶ Nivel ${id}: ${LEVELS.find(l=>l.id===id)!.rule}. Lee la regla y pulsa ESCANEAR.`]); pushBit(`🎟 Nivel ${id} cargado`);
  };
  const startInfinite = ()=>{
    const arr = makeInfinite();
    // compute chained targets
    const x = arr.findIndex(p=>p.vip); const y = arr.slice(x+1).findIndex(p=>p.palomitas)+(x+1); const z = arr.slice(y+1).findIndex(p=>p.edad<18)+(y+1);
    setPeople(arr); setInfinite(true); setInfTargets([x,y,z]); setInfFound([]); setInfStep(0); setInfDone(false); setRound(r=>r+1); setPhase(1); setCursor(-1); setScanning(false); setPassed(false); setScanDone(false); setResolved(false); setResult(''); setCondition(''); setConfetti(false); setLogs([`♾️ Fila Infinita: 50 personas generadas. Paso 1 busca el primer VIP desde [0].`]); pushBit('♾️ Modo Fila Infinita: 50 personas');
  };
  const nextRound = ()=>{
    if(infinite){ startInfinite(); return; }
    const next = levelId>=6?1:levelId+1; chooseLevel(next);
  };
  const restart = ()=>{
    setPoints(0); setStreak(0); setBadge(false); setSolved([]); setRound(1); setLogs(['▶ Juego reiniciado. Depurador listo.']); setBitacora(['🎬 Juego reiniciado. La sala está lista.']); chooseLevel(1);
  };
  const phaseLabel = phase===1?'FASE 1 · LEER LA REGLA':phase===2?'FASE 2 · ESCANEAR':'FASE 3 · CONFIRMAR';

  return (
    <div data-safe-area-inset-root style={{boxSizing:'border-box',paddingTop:'var(--safe-area-inset-top)',minHeight:'100vh',background:'#030508'}} className="overflow-x-clip text-[#f4f6ff]">
      {/* MARQUESINA */}
      <div className="curtain relative overflow-hidden border-b-4 border-[#ffd23f]">
        <div className="flex justify-between px-3 py-1" aria-hidden="true">{Array.from({length:18}).map((_,i)=><span key={i} className="light inline-block h-2.5 w-2.5 rounded-full bg-[#ffd23f] shadow-[0_0_12px_#ffd23f]" style={{animationDelay:`${i*0.09}s`}} />)}</div>
        <div className="px-3 pb-3 text-center"><p className="text-[11px] tracking-[0.35em] text-[#ffd23f] font-bold">★ CINE ★ PALOMITAS ★ ESTRENO ★</p><h1 className="text-[clamp(24px,4vw,44px)] leading-none font-bold text-white drop-shadow-[0_0_18px_rgba(255,43,58,.8)]">🎬 CINE “EL PRIMER MATCH” <span className="text-[#ffd23f]">— Ronda {round}</span></h1></div>
      </div>

      <header data-safe-area-sticky-top style={{top:'var(--safe-area-inset-top)'}} className="sticky z-40 bg-[#030508]/95 backdrop-blur border-b border-[#26324f]">
        <div className="mx-auto max-w-[1500px] px-3 py-2 flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-emerald-500/15 border border-emerald-400/40 text-emerald-300 px-3 py-1 text-sm font-bold">SIN API ✅ · JS local</span>
          <span className="rounded-full bg-[#ffd23f]/15 border border-[#ffd23f]/40 text-[#ffd23f] px-3 py-1 text-sm font-bold">⭐ PUNTOS: {points}</span>
          <span className="rounded-full bg-[#ff2b3a]/15 border border-[#ff2b3a]/40 text-rose-200 px-3 py-1 text-sm font-bold">🔥 RACHA: {streak}</span>
          {badge && <span className="rounded-full bg-violet-500/20 border border-violet-300/50 text-violet-200 px-3 py-1 text-sm font-bold">🎬 ACOMODADOR/A EXPERTO/A</span>}
          <button onClick={restart} className="ghost-btn ml-auto px-3 py-1.5 text-sm">↺ Reiniciar</button>
        </div>
        <div className="mx-auto max-w-[1500px] px-3 pb-2 text-xs sm:text-sm text-[#aab4d4]">Eres el/la acomodador/a. Encuentra al <b className="text-white">PRIMERO</b> que cumpla la regla. Avanza desde el inicio y detente en el primer acierto.</div>
      </header>

      {/* CONCEPTO CLAVE */}
      <section className="mx-auto max-w-[1500px] px-3 pt-3">
        <div className="panel p-3 sm:p-4">
          <p className="text-[#ffd23f] font-bold tracking-wide text-sm">🧠 CONCEPTO DIDÁCTICO CLAVE — LÉELO SIEMPRE</p>
          <div className="mt-2 grid gap-2 text-sm sm:grid-cols-2 lg:grid-cols-5">
            <div className="rounded-lg bg-black/30 border border-[#26324f] p-2"><b>findIndex devuelve el ÍNDICE</b><br/><span className="text-[#aab4d4]">Si devuelve 2, es la posición [2], no la persona.</span></div>
            <div className="rounded-lg bg-black/30 border border-[#26324f] p-2"><b>Condición, no igualdad</b><br/><span className="text-[#aab4d4]">La regla es “tiene VIP”, no “es Caro”.</span></div>
            <div className="rounded-lg bg-black/30 border border-[#26324f] p-2"><b>Solo el PRIMERO</b><br/><span className="text-[#aab4d4]">Hay 3 VIP, pero solo el índice 2 es válido.</span></div>
            <div className="rounded-lg bg-black/30 border border-[#26324f] p-2"><b>Escaneo ordenado</b><br/><span className="text-[#aab4d4]">De izquierda a derecha y se detiene.</span></div>
            <div className="rounded-lg bg-black/30 border border-[#26324f] p-2"><b>Caso −1</b><br/><span className="text-[#aab4d4]">Si nadie cumple, findIndex devuelve −1.</span></div>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1500px] px-3 py-3 grid gap-3 lg:grid-cols-[300px_1fr_420px] items-start">
        {/* IZQUIERDA */}
        <div className="grid gap-3">
          <section className="panel p-3 sm:p-4">
            <h2 className="font-bold text-lg">🎟 NIVELES</h2>
            <div className="mt-2 grid gap-2">
              {LEVELS.map(l=>(
                <button key={l.id} onClick={()=>chooseLevel(l.id)} className={`text-left rounded-xl border px-3 py-2 transition ${levelId===l.id && !infinite?'border-[#ffd23f] bg-[#ffd23f]/10':'border-[#26324f] bg-black/20 hover:border-[#ffd23f]/50'}`}>
                  <div className="flex justify-between gap-2"><b>{l.id}. {l.title}</b><span>{solved.includes(l.id)?'✅':''}</span></div>
                  <div className="text-xs text-[#aab4d4]">{l.concept} · Respuesta: {l.id===6?'−1':`[${l.answer}]`}</div>
                </button>
              ))}
              <button onClick={startInfinite} className={`text-left rounded-xl border px-3 py-2 ${infinite?'border-emerald-400 bg-emerald-400/10':'border-[#26324f] bg-black/20'}`}><b>♾️ MODO FILA INFINITA: 50 PERSONAS</b><div className="text-xs text-[#aab4d4]">3 reglas encadenadas · +30 si aciertas las 3</div></button>
            </div>
            <div className="mt-3 rounded-xl bg-[#ffd23f]/10 border border-[#ffd23f]/30 p-3">
              <p className="text-xs tracking-widest text-[#ffd23f] font-bold">REGLA ACTUAL</p>
              <p className="text-xl leading-tight font-bold mt-1">{infinite ? (infStep===0?'El primero con 🎟 VIP':infStep===1?`El primero con 🍿 palomitas desde [${infStart}]`:`El primero menor (edad < 18) desde [${infStart}]`) : level.rule}</p>
              <p className="mono text-xs mt-2 text-emerald-300 break-words">{infinite ? (infStep===0?'fila.findIndex(p => p.vip)':infStep===1?`fila.slice(${infStart}).findIndex(p => p.palomitas)`:`fila.slice(${infStart}).findIndex(p => p.edad < 18)`) : level.code}</p>
              <p className="mt-2 inline-block rounded-full bg-black/40 px-2 py-1 text-xs font-bold">{phaseLabel}</p>
              {infinite && <p className="mt-2 text-sm">Paso <b>{infStep+1} de 3</b> · {infFound.length?`Encontrados: ${infFound.join(', ')}`: 'Aún sin pasos resueltos'}</p>}
            </div>
          </section>
          <section className="panel p-3 sm:p-4">
            <h3 className="font-bold">📓 BITÁCORA</h3>
            <ul className="mt-2 grid gap-1.5 text-sm text-[#cbd2ee]">{bitacora.map((b,i)=><li key={i} className="rounded-lg bg-black/25 px-2 py-1.5">{b}</li>)}</ul>
            <p className="mt-2 text-xs text-[#aab4d4]">Puntuación: +10 acierto · +5 condición · −5 pasarte · −3 detener mal · +15 con 3 seguidas sin pasarte.</p>
          </section>
        </div>

        {/* CENTRO */}
        <section className="panel relative overflow-hidden p-3 sm:p-4">
          {confetti && <div aria-hidden="true">{Array.from({length:26}).map((_,i)=><span key={i} className="pop text-2xl" style={{left:`${(i*37)%96}%`,animationDelay:`${(i%7)*0.12}s`}}>🍿</span>)}</div>}
          <div className="flex flex-wrap items-center justify-between gap-2"><h2 className="font-bold text-lg">🎞️ FILA DEL CINE</h2><span className="text-sm text-[#aab4d4]">{people.length} personas · Cursor: {cursor>=0?`[${cursor}] ${people[cursor]?.nombre}`:'—'}</span></div>
          {infinite && <div className="mt-2 mono text-xs sm:text-sm bg-black/40 border border-emerald-400/30 rounded-lg p-2">X = {infFound[0]??'?'} · Y = {infFound[1]??'?'} · Z = {infFound[2]??'?'} <span className="text-[#aab4d4]">— X: primer VIP · Y: primer 🍿 desde X+1 · Z: primer menor desde Y+1</span></div>}
          <div className="mt-2 flex items-center gap-2 text-sm"><span className={`font-bold ${scanning?'blink text-[#ffd23f]':''}`}>{scanning?'▶ CURSOR EN MOVIMIENTO':'▶ CURSOR'}</span><div className="h-2 flex-1 rounded-full bg-white/10 overflow-hidden"><div className="h-full bg-gradient-to-r from-[#ff2b3a] to-[#ffd23f] transition-all duration-500" style={{width: cursor>=0?`${((cursor+1)/people.length)*100}%`:'0%'}} /></div><span className="mono">{cursor>=0?`[${cursor}]`:''}</span></div>

          <div className={`mt-3 overflow-x-auto scroll-thin pb-2 ${shake?'shake':''}`}>
            <div className="flex gap-2" style={{minWidth:'max-content'}}>
              {people.map((p,i)=>{
                const isCursor = i===cursor;
                const isWin = resolved && !infinite && i===correct;
                const isInfWin = infinite && infFound.includes(i);
                const isPassedMark = passed && i===correct;
                return (
                  <div key={i} className="w-[104px] shrink-0">
                    <div className={`text-center text-2xl h-9 ${isCursor?'':'opacity-0'}`} aria-hidden="true">⬇️</div>
                    <div className={`rounded-xl border p-2 text-center transition-all ${isCursor?'border-[#ffd23f] bg-[#ffd23f]/10 scale-[1.03]':(isWin||isInfWin)?'win-card border-emerald-400 bg-emerald-400/10':isPassedMark?'border-red-500 bg-red-500/10':'border-[#26324f] bg-black/25'}`}>
                      <div className="mono text-xs text-[#aab4d4]">[{i}]</div>
                      <div className="text-3xl leading-none my-1">👤</div>
                      <div className="font-bold leading-tight break-words">{p.nombre}</div>
                      <div className="text-lg leading-tight min-h-[28px]">{p.vip?'🎟 ':''}{p.palomitas?'🍿 ':''}{p.edad<18?'🧒':''}</div>
                      <div className="text-xs text-[#aab4d4]">Edad: {p.edad}</div>
                      <div className="text-[11px] text-[#aab4d4] leading-tight">vip: {String(p.vip)} · 🍿: {String(p.palomitas)}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {passed && <div role="alert" className="mt-2 rounded-xl border border-red-500 bg-red-500/15 p-3 font-bold text-red-100">⚠️ ¡Ya pasaste al primero! findIndex se habría detenido aquí en el {correct}. Si sigues, perderás −5.</div>}
          {result && <div role="status" className="mt-2 rounded-xl border border-[#ffd23f]/40 bg-[#ffd23f]/10 p-3 font-bold">{result}</div>}

          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <button onClick={startScan} disabled={scanning||resolved} className="neon-btn px-4 py-3 text-base sm:text-lg">▶ ESCANEAR</button>
            <button onClick={stopHere} disabled={resolved||cursor<0} className="gold-btn px-4 py-3 text-base sm:text-lg">⏸ DETENER AQUÍ</button>
            {!infinite && levelId===6 && <button onClick={nobody} disabled={resolved} className="ghost-btn px-4 py-3">🚫 NADIE CUMPLE (−1)</button>}
            <button onClick={nextRound} className="ghost-btn px-4 py-3">➡️ SIGUIENTE RONDA</button>
          </div>
          <p className="mt-2 text-xs text-[#aab4d4]">En el Nivel 6, deja que el escaneo llegue al final y luego pulsa “NADIE CUMPLE (−1)”.</p>
          <label className="mt-3 block">
            <span className="text-sm font-bold">✍️ Escribe la condición para +5 extra <span className="font-normal text-[#aab4d4]">(opcional · ej: p =&gt; p.vip)</span></span>
            <input value={condition} onChange={e=>{setCondition(e.target.value); setCondOk(null);}} disabled={resolved} placeholder="p => p.vip" className="mono mt-1 w-full rounded-xl border border-[#344168] bg-black/50 px-3 py-2.5 text-white outline-none focus:border-[#ffd23f]" />
          </label>
          {condOk!==null && <p className="mt-1 text-sm font-bold">{condOk?'✅ Condición correcta: +5 al acertar.':'ℹ️ Esa condición no coincide con la regla de esta ronda.'}</p>}
          {infinite && <div className="mt-3 rounded-xl bg-black/30 border border-[#26324f] p-3 text-sm"><b>Cómo funciona la cadena:</b> Paso 1 busca VIP. Paso 2 es como hacer <span className="mono">findIndex</span> sobre <span className="mono">fila.slice(X+1)</span> buscando 🍿. Paso 3 lo mismo desde Y+1 buscando menor. Detén el cursor en cada paso.</div>}
        </section>

        {/* DERECHA */}
        <section className="panel p-3 sm:p-4">
          <h2 className="font-bold text-lg">🖥️ DEPURADOR AVANZADO: <span className="mono text-base">.findIndex()</span></h2>
          <div className="mono mt-2 rounded-xl bg-black/70 border border-[#26324f] p-3 text-[12px] leading-5 min-h-[260px] max-h-[420px] overflow-y-auto scroll-thin" aria-live="polite">
            {logs.map((l,i)=><div key={i} className={l.includes('⚠️')?'text-red-300 font-bold':l.includes('✅')||l.includes('🎉')?'text-emerald-300':l.includes('▶')?'text-[#ffd23f]':'text-[#d7dcf5]'}>{l}</div>)}
          </div>
          <div className="mono mt-3 rounded-xl bg-[#0a1a12] border border-emerald-400/30 p-3 text-sm break-words"><span className="text-emerald-300">{infinite?'// Cadena infinita':level.code}</span><br/><span className="text-white">// → {resolved ? (infinite? (infDone?`${infFound.join(' → ')}`:'…') : level.answer) : '?'}</span></div>
          <div className="mt-3 grid gap-2 text-sm">
            <div className="rounded-lg bg-black/25 p-2"><b>¿Qué devuelve?</b><br/><span className="text-[#aab4d4]">Un número: el índice. Nunca la persona completa.</span></div>
            <div className="rounded-lg bg-black/25 p-2"><b>¿Cuándo se detiene?</b><br/><span className="text-[#aab4d4]">En el PRIMER true. No sigue buscando.</span></div>
            <div className="rounded-lg bg-black/25 p-2"><b>¿Y si no hay match?</b><br/><span className="text-[#aab4d4]">Recorre toda la fila y devuelve −1.</span></div>
          </div>
          <button onClick={()=>setLogs(['▶ Depurador limpio. Pulsa ESCANEAR para volver a recorrer.'])} className="ghost-btn mt-3 w-full px-3 py-2 text-sm">🧹 Limpiar depurador</button>
        </section>
      </main>
      <footer className="mx-auto max-w-[1500px] px-3 pb-6 text-center text-xs text-[#aab4d4]">🎬 La fila avanza de izquierda a derecha. Tu trabajo es detenerte justo en el primer match. · Juego local, sin API.</footer>
    </div>
  );
}
