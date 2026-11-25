import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Check, ChevronRight, RotateCcw, Play, ShoppingCart, Trophy, Zap, Timer, Sparkles, BookOpen, Save } from 'lucide-react';

type Attempt = { id:string; value:any };
type RoundDef = { id:string; label:string; target:string; list:string[]; mode:'primera'|'ultima'; hint:string };
const EMOJI: Record<string,string> = { leche:'🥛', pan:'🍞', huevos:'🥚', café:'☕', arroz:'🍚', azúcar:'🍬', queso:'🧀', manzana:'🍎', chocolate:'🍫' };
const BASE = ['leche','pan','huevos','leche','pan','café','leche'];
const ROUNDS: RoundDef[] = [
  {id:'r1', label:'Ronda 1 · Primera “leche”', target:'leche', list:BASE, mode:'primera', hint:'La primera leche está al principio.'},
  {id:'r2', label:'Ronda 2 · Primera “pan”', target:'pan', list:BASE, mode:'primera', hint:'Pan aparece en 1 y en 4.'},
  {id:'r3', label:'Ronda 3 · Primera “café”', target:'café', list:BASE, mode:'primera', hint:'Café solo aparece una vez.'},
  {id:'r4', label:'Ronda 4 · Primera “arroz” · Caso -1', target:'arroz', list:BASE, mode:'primera', hint:'Arroz no está en esta lista.'},
  {id:'r5', label:'Ronda 5 · Primera “huevos”', target:'huevos', list:BASE, mode:'primera', hint:'Huevos solo aparece una vez.'},
  {id:'r6', label:'Ronda 6 · Primera “chocolate” · Caso -1', target:'chocolate', list:['leche','pan','huevos','café','arroz','azúcar','queso','manzana'], mode:'primera', hint:'Chocolate no está en la lista nueva.'},
];
const NIVEL19_LIST = ['leche','pan','huevos','café','arroz','azúcar','manzana','leche','pan','huevos','café','arroz','azúcar','manzana','leche','queso','pan','queso','café'];
const POOL = ['leche','pan','huevos','café','arroz','azúcar','queso','manzana'];

async function apiCall(action:string, args:any){
  const res = await fetch("actions", { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({action, args}) });
  const json = await res.json().catch(()=>({}));
  if(!res.ok || json.error) throw new Error(json.error || 'No se pudo conectar con el guardado');
  return json.data;
}
function makeInfinite(): RoundDef {
  const list = Array.from({length:15},()=>POOL[Math.floor(Math.random()*POOL.length)]);
  const present = [...new Set(list)];
  const target = Math.random()<0.82 ? present[Math.floor(Math.random()*present.length)] : 'chocolate';
  return {id:'infinito-'+Date.now(), label:'Modo infinito', target, list, mode:'primera', hint:'Lista nueva de 15 productos.'};
}
function versusRound(step:number): RoundDef {
  const seq = [
    {target:'leche', mode:'primera' as const}, {target:'leche', mode:'ultima' as const},
    {target:'pan', mode:'primera' as const}, {target:'pan', mode:'ultima' as const},
    {target:'café', mode:'primera' as const}, {target:'café', mode:'ultima' as const},
  ][step % 6];
  return {id:'versus-'+step, label:`Primera vs Última · ${seq.target} · ${seq.mode}`, target:seq.target, list:BASE, mode:seq.mode, hint: seq.mode==='primera' ? 'Busca la primera aparición.' : 'Busca la última aparición.'};
}

export default function App(){
  const [view, setView] = useState<'rondas'|'versus'|'infinito'|'nivel19'>('rondas');
  const [roundIdx, setRoundIdx] = useState(0);
  const [versusStep, setVersusStep] = useState(0);
  const [infiniteRound, setInfiniteRound] = useState<RoundDef>(()=>makeInfinite());
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState<Set<string>>(new Set());
  const [answer, setAnswer] = useState('');
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState<{type:'ok'|'warn'|'bad'|'info', text:string}|null>(null);
  const [debug, setDebug] = useState<string[]>([
    '🛒 Depurador listo. Pulsa RECORRER o COMPROBAR.',
    'indexOf busca de izquierda a derecha y se detiene en la primera coincidencia exacta.',
  ]);
  const [cursor, setCursor] = useState<number|null>(null);
  const [traversing, setTraversing] = useState(false);
  const [shake, setShake] = useState(false);
  const [glowIdx, setGlowIdx] = useState<number|null>(null);
  const [log, setLog] = useState<string[]>(['🛒 Bienvenido al Supermercado “El Primer Producto”. Lee la lista y escribe el índice.']);
  const [saveStatus, setSaveStatus] = useState('Conectando guardado…');
  const [savedAttempts, setSavedAttempts] = useState<Attempt[]>([]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerOn, setTimerOn] = useState(false);
  const [showAllLog, setShowAllLog] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const traversingRef = useRef(false);

  const current: RoundDef = useMemo(()=>{
    if(view==='rondas') return ROUNDS[roundIdx];
    if(view==='versus') return versusRound(versusStep);
    if(view==='infinito') return infiniteRound;
    return {id:'nivel19', label:'Nivel 19 · Primera “queso”', target:'queso', list:NIVEL19_LIST, mode:'primera', hint:'Hay 19 productos. El queso aparece tarde.'};
  },[view, roundIdx, versusStep, infiniteRound]);

  const correct = useMemo(()=> current.mode==='primera' ? current.list.indexOf(current.target) : current.list.lastIndexOf(current.target), [current]);
  const method = current.mode==='primera' ? 'indexOf' : 'lastIndexOf';
  const revealed = `lista.${method}('${current.target}') // → ${correct}`;

  async function reloadRecords(){
    const data = await apiCall("records.list", {collection:'partidas_compras'});
    const recs = (data?.records || []) as Attempt[];
    setSavedAttempts(recs.slice(-6).reverse());
    setSaveStatus(`Guardado: ${recs.length} intento(s) en el historial`);
  }
  useEffect(()=>{ reloadRecords().catch(()=> setSaveStatus('Guardado no disponible en esta vista previa. Tu partida sigue en pantalla.')); },[]);

  useEffect(()=>{ setAnswer(''); setCode(''); setFeedback(null); setCursor(null); setGlowIdx(null); setTraversing(false); traversingRef.current=false;
    if(view==='nivel19'){ setTimeLeft(60); setTimerOn(true); } else setTimerOn(false);
    setDebug([`🎯 Nueva pregunta: ${current.mode==='primera' ? 'PRIMERA' : 'ÚLTIMA'} “${current.target}”`, `Lista de ${current.list.length} productos. Recuerda: igualdad exacta ===.`]);
    const t = setTimeout(()=> inputRef.current?.focus(), 80); return ()=>clearTimeout(t);
  },[current.id, view]);

  useEffect(()=>{
    if(!timerOn) return;
    const id = setInterval(()=> setTimeLeft(s=>{
      if(s<=1){ clearInterval(id); setTimerOn(false); setFeedback({type:'bad', text:'⏰ Se acabó el tiempo en Nivel 19. Pulsa Reiniciar o cambia de ronda para intentarlo de nuevo.'}); return 0; }
      return s-1;
    }),1000);
    return ()=>clearInterval(id);
  },[timerOn, current.id]);

  function pushLog(s:string){ setLog(p=>[s, ...p].slice(0,30)); }

  async function saveAttempt(kind:string, pts:number, val:number){
    const key = `intento-${Date.now()}-${Math.floor(Math.random()*100000)}`;
    try{
      await apiCall("records.create", {collection:'partidas_compras', value:{ronda:current.label, objetivo:current.target, metodo:method, respuesta:val, correcta:correct, puntos:pts, resultado:kind, fecha:new Date().toISOString()}, idempotency_key:key});
      await reloadRecords();
    }catch(e){ setSaveStatus('No se pudo guardar este intento. Sigue jugando.'); }
  }

  function buildDebug(val:number){
    const lines:string[] = [];
    lines.push(`> Ejecutando lista.${method}('${current.target}')`);
    if(correct===-1){
      lines.push(`Revisó [0]…[${current.list.length-1}], ninguno === '${current.target}' → devuelve -1.`);
    } else {
      for(let i=0;i<=correct;i++) lines.push(`[Iteración ${i}] [${i}] '${current.list[i]}' === '${current.target}'? ${current.list[i]===current.target ? 'true → ✅ ¡ENCONTRADO! Se detiene aquí.' : 'false → sigue.'}`);
    }
    lines.push(`🧠 Depurador: ${method} usa IGUALDAD EXACTA === de strings. 'Leche' con mayúscula NO sería igual a 'leche'. Por eso es sensible a mayúsculas.`);
    lines.push(`> Resultado: ${correct} ← Es un NÚMERO, la posición de la ${current.mode==='primera'?'PRIMERA':'ÚLTIMA'} aparición.`);
    lines.push(`⚖️ Comparación: indexOf('${current.target}') → ${current.list.indexOf(current.target)} (primera) | lastIndexOf('${current.target}') → ${current.list.lastIndexOf(current.target)} (última)`);
    if(val!==correct && val>=0 && val<current.list.length && current.list[val]===current.target) lines.push(`Revisó [0] '${current.list[0]}' === '${current.target}' ${current.list[0]===current.target?'true':''}, ya se habría detenido en ${correct}. No llega al ${val}.`);
    setDebug(lines);
  }

  function check(){
    if(answer==='' || Number.isNaN(Number(answer))){ setFeedback({type:'info', text:'Escribe un número en el input. Puede ser -1 si el producto no está.'}); return; }
    const val = Number(answer);
    const normalized = code.trim().replace(/\s+/g,'').replace(/"/g,"'").toLowerCase();
    const expectedA = `lista.${method}('${current.target.toLowerCase()}')`;
    const expectedB = `${method}('${current.target.toLowerCase()}')`;
    const codeOk = code.trim()!=='' && (normalized===expectedA || normalized===expectedB);
    let pts = 0; let kind='incorrecto';
    if(val===correct){
      pts = 10 + (codeOk?5:0) + (view==='nivel19'?20:0);
      kind='acierto';
      setScore(s=>s+pts); setStreak(s=>s+1);
      setSolved(prev=> new Set(prev).add(current.id));
      setGlowIdx(correct>=0?correct:null);
      setFeedback({type:'ok', text: correct===-1 ? `✅ ¡Correcto! indexOf devuelve -1 porque '${current.target}' no está en la lista.${codeOk?' +5 por el código.':''}${view==='nivel19'?' +20 por Nivel 19.':''}` : `✅ ¡Correcto! ${revealed}.${codeOk?' +5 por escribir el código.':''}${view==='nivel19'?' +20 por Nivel 19.':''} ${view==='nivel19'?'🏅 Badge: COMPRADOR NIVEL 19':''}`});
      setTimerOn(false);
      pushLog(`✅ ${current.label} → ${val} (+${pts})`);
    } else if(val>=0 && val<current.list.length && current.list[val]===current.target && current.mode==='primera'){
      pts=-5; kind='otra-aparicion'; setScore(s=>s+pts); setStreak(0); setShake(true); setTimeout(()=>setShake(false),500);
      setFeedback({type:'warn', text:`Ese también es '${current.target}', pero indexOf devuelve la PRIMERA aparición. La respuesta era ${correct}. (-5)`});
      pushLog(`⚠️ ${current.label} → ${val} (otra aparición, -5)`);
    } else {
      pts=-3; kind='incorrecto'; setScore(s=>s+pts); setStreak(0); setShake(true); setTimeout(()=>setShake(false),500);
      if(correct===-1) setFeedback({type:'bad', text:`❌ indexOf devuelve -1 porque '${current.target}' no está en la lista. (-3)`});
      else setFeedback({type:'bad', text:`❌ Incorrecto. La respuesta era ${correct}. (-3) ${code.trim()!=='' && !codeOk ? 'Revisa el código: debe ser '+expectedA : ''}`});
      pushLog(`❌ ${current.label} → ${val} (-3)`);
    }
    buildDebug(val);
    saveAttempt(kind, pts, val);
  }

  function traverse(){
    if(traversingRef.current) return;
    traversingRef.current=true; setTraversing(true); setCursor(0); setDebug([`> Ejecutando lista.${method}('${current.target}')`, '▶ Recorriendo desde el inicio → → →']);
    let i=0;
    const targetIdx = correct===-1 ? current.list.length-1 : correct;
    const id = setInterval(()=>{
      setCursor(i);
      if(i>=targetIdx){
        clearInterval(id); traversingRef.current=false; setTraversing(false);
        setCursor(correct>=0?correct:null); if(correct>=0) setGlowIdx(correct);
        buildDebug(answer==='' ? correct : Number(answer));
      }
      i++;
    }, 340);
  }

  function goRound(i:number){ setView('rondas'); setRoundIdx(i); }
  function restart(){ setScore(0); setStreak(0); setSolved(new Set()); setLog(['🔄 Partida reiniciada. El historial guardado se conserva.']); setAnswer(''); setCode(''); setFeedback({type:'info', text:'Partida reiniciada. Elige una ronda y vuelve a jugar.'}); if(view==='infinito') setInfiniteRound(makeInfinite()); if(view==='nivel19'){ setTimeLeft(60); setTimerOn(true);} }

  const leftItems = [
    ...ROUNDS.map((r,i)=>({key:r.id, label:r.label, onClick:()=>goRound(i), done:solved.has(r.id), active:view==='rondas'&&roundIdx===i})),
    {key:'versus', label:'⚔️ Modo PRIMERA vs ÚLTIMA', onClick:()=>{setView('versus'); setVersusStep(0);}, done:solved.has('versus-0'), active:view==='versus'},
    {key:'infinito', label:'♾️ Modo INFINITO · 15 productos', onClick:()=>{setView('infinito'); setInfiniteRound(makeInfinite());}, done:false, active:view==='infinito'},
    {key:'nivel19', label:'🏆 Nivel 19 · Primera “queso” · 60s', onClick:()=>setView('nivel19'), done:solved.has('nivel19'), active:view==='nivel19'},
  ];

  return (
    <div data-safe-area-inset-root style={{boxSizing:'border-box', paddingTop:'var(--safe-area-inset-top)', minHeight:'100vh', background:'var(--bg)'}} className="overflow-x-clip">
      <header className="border-b border-[#1c3a2a] bg-[#030508]">
        <div className="mx-auto max-w-[1500px] px-3 sm:px-5 py-3 flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-[#0d2a1a] border border-[#2dff8a]/40 grid place-items-center text-2xl floaty">🛒</div>
            <div className="min-w-0">
              <h1 className="font-bold leading-tight text-[clamp(0.95rem,4.2vw,1.75rem)] tracking-wide [overflow-wrap:anywhere]">SUPERMERCADO <span className="neon">“EL PRIMER PRODUCTO”</span> <span className="hidden md:inline text-[#9db8a8]">— COMPRADOR</span></h1>
              <p className="text-[#9db8a8] text-[12px] sm:text-sm font-semibold tracking-widest">LA LISTA DE COMPRAS · indexOf CON STRINGS</p>
            </div>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <span className="mono text-[11px] sm:text-xs px-2 py-1 rounded-full border border-[#2dff8a]/40 text-[#a7ffcb]">GUARDADO ✅</span>
            <span className="px-3 py-1.5 rounded-full bg-[#ffd84d] text-black font-bold text-sm">PUNTOS: {score}</span>
            <span className="px-3 py-1.5 rounded-full bg-white text-black font-bold text-sm">🔥 RACHA: {streak}</span>
            <button onClick={restart} className="btn bg-[#14211a] border border-[#2a4a36] text-white px-3 py-1.5 text-sm flex items-center gap-1"><RotateCcw size={15}/> Reiniciar</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-3 sm:px-5 py-4 lg:py-5 grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_420px] items-start">
        {/* IZQUIERDA */}
        <aside className="space-y-4 min-w-0">
          <section className="panel p-4">
            <div className="flex items-center justify-between"><h2 className="font-bold tracking-widest text-lg">🧾 LISTAS</h2><span className="mono text-xs text-[#9db8a8]">{solved.size} resueltas</span></div>
            <p className="text-[#9db8a8] text-sm mt-1">Elige una ronda. La marca ✅ aparece cuando aciertas.</p>
            <div className="mt-3 space-y-2">
              {leftItems.map(it=>(
                <button key={it.key} onClick={it.onClick} className={`w-full text-left px-3 py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-between gap-2 ${it.active?'bg-[#2dff8a] text-black border-[#2dff8a]':'bg-[#071018] border-[#223d2e] hover:border-[#2dff8a]/60'}`}>
                  <span className="[overflow-wrap:anywhere]">{it.label}</span><span>{it.done?'✅':it.active?'▶':<ChevronRight size={16}/>}</span>
                </button>
              ))}
            </div>
            <div className="mt-3 flex gap-2">
              <button onClick={()=>{ if(view==='rondas'&&roundIdx<5) setRoundIdx(roundIdx+1); if(view==='versus') setVersusStep(s=>s+1); if(view==='infinito') setInfiniteRound(makeInfinite()); }} className="btn flex-1 bg-[#2dff8a] text-black px-3 py-2 text-sm">Siguiente ▶</button>
              <button onClick={()=>{ if(view==='rondas'&&roundIdx>0) setRoundIdx(roundIdx-1); }} className="btn bg-[#14211a] border border-[#2a4a36] px-3 py-2 text-sm">◀ Anterior</button>
            </div>
          </section>

          <section className="panel p-4 border-[#ffd84d]/30">
            <h3 className="font-bold text-[#ffd84d]">💡 indexOf con strings</h3>
            <p className="mono text-[13px] leading-relaxed mt-2 text-[#d8ffe9] [overflow-wrap:anywhere]">lista.indexOf('leche') → 0<br/>Devuelve un <b>NÚMERO</b>.<br/>Igualdad exacta ===.<br/>Primera aparición.<br/>Si no existe → -1.</p>
            <div className="mt-3 text-xs text-[#9db8a8] leading-relaxed">indexOf ≠ findIndex (condición) ≠ lastIndexOf (última).<br/>“Leche” ≠ “leche”.</div>
          </section>

          <section className="panel p-4">
            <h3 className="font-bold flex items-center gap-2"><BookOpen size={17} className="text-[#2dff8a]"/> BITÁCORA</h3>
            <p className="text-xs text-[#9db8a8] mt-1 flex items-center gap-1"><Save size={12}/>{saveStatus}</p>
            <div className="mt-2 space-y-1.5 max-h-[220px] overflow-y-auto scroll-thin pr-1">
              {(showAllLog?log:log.slice(0,5)).map((l,i)=>(<p key={i} className="text-[13px] leading-snug text-[#c9e8d5] [overflow-wrap:anywhere]">{l}</p>))}
            </div>
            {log.length>5 && <button onClick={()=>setShowAllLog(v=>!v)} className="mt-2 text-xs font-bold text-[#2dff8a]">{showAllLog?'Ver menos':'Ver toda la bitácora'}</button>}
            {savedAttempts.length>0 && <div className="mt-3 pt-3 border-t border-[#223d2e]"><p className="text-xs font-bold tracking-widest text-[#9db8a8]">HISTORIAL GUARDADO</p>{savedAttempts.map(a=>(<p key={a.id} className="mono text-[11px] mt-1 text-[#9db8a8] [overflow-wrap:anywhere]">{String(a.value?.ronda||'').slice(0,28)} · {String(a.value?.respuesta)} · {String(a.value?.puntos)} pts</p>))}</div>}
          </section>
        </aside>

        {/* CENTRO */}
        <section className={`panel p-4 sm:p-5 min-w-0 ${shake?'shake':''}`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="font-bold text-[clamp(1.25rem,3vw,2rem)] tracking-wide">🛒 LISTA DE COMPRAS</h2>
            <div className="flex items-center gap-2">
              {view==='nivel19' && <span className="flex items-center gap-1 bg-[#ff4d6d] text-white px-3 py-1 rounded-full font-bold text-sm"><Timer size={15}/> {timeLeft}s</span>}
              <span className="mono text-xs px-2 py-1 rounded-full bg-[#071018] border border-[#223d2e]">{current.list.length} productos</span>
            </div>
          </div>
          <p className="text-[#9db8a8] text-sm mt-1">Toca un producto para rellenar el input con su índice. Esa es solo una ayuda: tú decides la respuesta.</p>

          <div className="mt-4 grid gap-2">
            {current.list.map((p,i)=>{
              const repeated = current.list.indexOf(p)!==i;
              const isCursor = cursor===i;
              const isGlow = glowIdx===i;
              return (
                <button key={i} onClick={()=>setAnswer(String(i))} className={`relative text-left flex items-center gap-3 px-3 sm:px-4 py-2.5 rounded-xl border transition ${isGlow?'glow':isCursor?'border-[#ffd84d] bg-[#2a2305]':'bg-[#071018] border-[#223d2e] hover:border-[#2dff8a]/50'}`}>
                  <span className="mono text-[#2dff8a] font-bold w-9 shrink-0">[{i}]</span>
                  <span className="text-2xl shrink-0">{EMOJI[p]||'🛒'}</span>
                  <span className="font-bold text-lg [overflow-wrap:anywhere]">{p}</span>
                  {repeated && <span className="ml-auto text-xs font-bold text-[#ffd84d] shrink-0">← repetido</span>}
                  {isCursor && <span className="absolute -top-2 right-3 bg-[#ffd84d] text-black text-[11px] font-black px-2 py-0.5 rounded-full">👉 CURSOR</span>}
                  {isGlow && <span className="ml-auto text-xl">🛒</span>}
                </button>
              );
            })}
          </div>

          <div className="mt-5 rounded-2xl bg-[#071018] border border-[#2dff8a]/30 p-4">
            <p className="text-[#ffd84d] font-bold tracking-widest text-xs">🎯 PREGUNTA · {view==='nivel19'?'NIVEL 19 · +20':view==='infinito'?'MODO INFINITO':'RONDA'}</p>
            <h3 className="font-bold text-[clamp(1.35rem,3.4vw,2.2rem)] leading-tight mt-1 [overflow-wrap:anywhere]">¿En qué ÍNDICE aparece por <span className="neon">{current.mode==='primera'?'PRIMERA':'ÚLTIMA'}</span> vez <span className="text-[#ffd84d]">‘{current.target}’</span>?</h3>
            <p className="text-[#9db8a8] text-sm mt-1">Escribe el número. Si no está, escribe <b className="text-white">-1</b>.</p>

            <form onSubmit={e=>{e.preventDefault(); check();}} className="mt-4 grid gap-3">
              <label className="text-xs font-bold tracking-widest text-[#9db8a8]" htmlFor="indice">TU RESPUESTA · ÍNDICE</label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input id="indice" ref={inputRef} type="number" min={-1} max={30} value={answer} onChange={e=>setAnswer(e.target.value)} placeholder="Escribe el índice o -1" autoFocus className="mono flex-1 min-w-0 bg-[#030508] border-2 border-[#2dff8a]/50 rounded-xl px-4 py-4 text-2xl sm:text-3xl font-bold text-white outline-none focus:border-[#2dff8a] placeholder:text-[#5d7a68] placeholder:text-base" />
                <button type="button" onClick={()=>{setAnswer('-1');}} className="btn bg-[#ffd84d] text-black px-5 py-3 text-lg shrink-0">-1 · No está</button>
              </div>
              <div className="flex flex-wrap gap-2">
                <button type="submit" className="btn bg-[#2dff8a] text-black px-5 py-3 flex items-center gap-2"><Check size={18}/> ✅ COMPROBAR (Enter)</button>
                <button type="button" onClick={traverse} disabled={traversing} className="btn bg-[#071018] border border-[#2dff8a] text-[#a7ffcb] px-4 py-3 flex items-center gap-2"><Play size={16}/> ▶ RECORRER DESDE EL INICIO</button>
              </div>
              <div>
                <label className="text-xs font-bold tracking-widest text-[#9db8a8]" htmlFor="codigo">CÓDIGO OPCIONAL · +5 SI ES CORRECTO</label>
                <input id="codigo" value={code} onChange={e=>setCode(e.target.value)} placeholder="Ej: lista.indexOf('leche')" className="mono mt-1 w-full bg-[#030508] border border-[#223d2e] rounded-xl px-3 py-3 text-sm text-white outline-none focus:border-[#ffd84d] [overflow-wrap:anywhere]" />
              </div>
            </form>

            {feedback && <div className={`mt-4 rounded-xl px-4 py-3 font-semibold leading-snug ${feedback.type==='ok'?'bg-[#123a22] border border-[#2dff8a]':feedback.type==='warn'?'bg-[#3a2d08] border border-[#ffd84d]':'bg-[#3a0f1e] border border-[#ff4d6d]'}`}>{feedback.text}</div>}
            <div className="mt-4 mono text-[13px] sm:text-sm bg-black/50 border border-[#223d2e] rounded-xl p-3 [overflow-wrap:anywhere]"><span className="text-[#9db8a8]">Código revelado al comprobar: </span><span className="text-[#a7ffcb]">{revealed}</span></div>
            <div className="mt-3 flex flex-wrap gap-2 text-xs font-bold"><span className="px-2 py-1 rounded-full bg-[#123a22] text-[#a7ffcb]">✅ Acierto +10</span><span className="px-2 py-1 rounded-full bg-[#3a2d08] text-[#ffd84d]">Otra aparición -5</span><span className="px-2 py-1 rounded-full bg-[#3a0f1e] text-[#ffb3c2]">Incorrecto -3</span><span className="px-2 py-1 rounded-full bg-[#1b2a3a] text-[#bfe0ff]">Código +5 · Nivel 19 +20</span></div>
          </div>
        </section>

        {/* DERECHA */}
        <aside className="panel p-4 min-w-0">
          <div className="flex items-center justify-between gap-2"><h2 className="font-bold tracking-widest">🧑‍💻 DEPURADOR AVANZADO</h2><span className="text-[#2dff8a]"><Sparkles size={18}/></span></div>
          <p className="mono text-sm text-[#a7ffcb] mt-1">.indexOf()</p>
          <div className="mt-3 rounded-xl bg-black border border-[#223d2e] p-3 min-h-[280px] max-h-[520px] overflow-y-auto scroll-thin">
            {debug.map((l,i)=>(<p key={i} className="mono text-[12px] sm:text-[13px] leading-relaxed py-1 border-b border-white/5 text-[#d8ffe9] [overflow-wrap:anywhere]">{l}</p>))}
          </div>
          <div className="mt-3 rounded-xl bg-[#071018] border border-[#223d2e] p-3">
            <p className="font-bold text-sm flex items-center gap-1"><Trophy size={15} className="text-[#ffd84d]"/> Comparación siempre visible</p>
            <p className="mono text-[12px] mt-2 leading-relaxed [overflow-wrap:anywhere]">indexOf('{current.target}') → <b className="text-[#2dff8a]">{current.list.indexOf(current.target)}</b> (primera) | lastIndexOf('{current.target}') → <b className="text-[#ffd84d]">{current.list.lastIndexOf(current.target)}</b> (última)</p>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-xl bg-[#071018] border border-[#223d2e] p-2"><p className="text-[10px] tracking-widest text-[#9db8a8]">PUNTOS</p><p className="font-bold text-xl">{score}</p></div>
            <div className="rounded-xl bg-[#071018] border border-[#223d2e] p-2"><p className="text-[10px] tracking-widest text-[#9db8a8]">RACHA</p><p className="font-bold text-xl">{streak}</p></div>
            <div className="rounded-xl bg-[#071018] border border-[#223d2e] p-2"><p className="text-[10px] tracking-widest text-[#9db8a8]">RESPUESTA</p><p className="font-bold text-xl text-[#2dff8a]">{correct}</p></div>
          </div>
          <p className="text-xs text-[#9db8a8] mt-3 leading-relaxed">El depurador no revela la respuesta antes de recorrer: recorre paso a paso y se detiene en la primera coincidencia exacta.</p>
        </aside>
      </main>
      <footer className="mx-auto max-w-[1500px] px-5 pb-8 text-center text-xs text-[#9db8a8]">🛒 Supermercado “El Primer Producto” · indexOf devuelve la PRIMERA aparición con igualdad exacta === · Escribe el índice, no solo lo señales.</footer>
    </div>
  );
}
