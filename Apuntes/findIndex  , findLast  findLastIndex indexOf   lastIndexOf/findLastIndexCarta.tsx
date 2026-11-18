import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Coins, Eye, Play, CheckCircle2, ArrowRight, RotateCcw, Trophy, Timer, Sparkles, ChevronRight, BookOpen } from 'lucide-react';

type Suit = '♠'|'♥'|'♦'|'♣';
type CardT = { label:string; num:number; suit:Suit; color:'roja'|'negra' };
type Mode = 'normal'|'minus1'|'firstLast'|'memory'|'infinite';
type History = { texto:string; pts:number };

const VALUES = ['A','2','3','4','5','6','7','8','9','10','J','Q','K'];
function mk(num:number, suit:Suit): CardT { return { label: VALUES[num-1], num, suit, color:(suit==='♥'||suit==='♦')?'roja':'negra' }; }
function mulberry(seed:number){ return function(){ seed|=0; seed=seed+0x6D2B79F5|0; let t=Math.imul(seed^seed>>>15,1|seed); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }

function matches(c:CardT, key:string): boolean {
  switch(key){
    case 'roja': return c.color==='roja';
    case 'espadas': return c.suit==='♠';
    case 'mayor4': return c.num>4;
    case 'corazones': return c.suit==='♥';
    case 'negra': return c.color==='negra';
    case 'diamantes': return c.suit==='♦';
    case 'menor5': return c.num<5;
    case 'igual7': return c.num===7;
    case 'corazones-espadas': return c.suit==='♥'||c.suit==='♠';
    case 'par': return c.num%2===0;
    case 'impar': return c.num%2===1;
    case 'mayorIgual8': return c.num>=8;
    case 'treboles': return c.suit==='♣';
    case 'menorIgual3': return c.num<=3;
    case 'rojaMayor5': return c.color==='roja' && c.num>5;
    case 'negraPar': return c.color==='negra' && c.num%2===0;
    case 'espadas-treboles': return c.suit==='♠'||c.suit==='♣';
    case 'mayor6': return c.num>6;
    case 'rojaMayor8': return c.color==='roja' && c.num>8;
    default: return false;
  }
}
type HandDef = { id:number; titulo:string; regla:string; key:string; code:string; condHint:string; deck:CardT[] };
function procedural(id:number, titulo:string, regla:string, key:string, code:string, condHint:string): HandDef {
  const rnd = mulberry(id*977+41);
  const suits: Suit[] = ['♠','♥','♦','♣'];
  const deck: CardT[] = Array.from({length:7},()=> mk(1+Math.floor(rnd()*13), suits[Math.floor(rnd()*4)]));
  if(!deck.some(c=>matches(c,key))){ deck[4]= key==='treboles'?mk(7,'♣'):key==='diamantes'?mk(8,'♦'):key==='corazones-espadas'?mk(9,'♥'):key==='negraPar'?mk(8,'♠'):key==='rojaMayor5'?mk(9,'♥'):key==='espadas-treboles'?mk(6,'♣'):mk(7,'♠'); }
  return { id, titulo, regla, key, code, condHint, deck };
}
const HANDS: HandDef[] = [
  { id:1, titulo:'Última carta roja', regla:'¿En qué ÍNDICE está la ÚLTIMA carta roja (♥ o ♦)?', key:'roja', code:"cartas.findLastIndex(c => c.color === 'roja')", condHint:'roja', deck:[mk(2,'♠'),mk(3,'♥'),mk(5,'♠'),mk(2,'♦'),mk(8,'♠'),mk(7,'♥'),mk(4,'♠')] },
  { id:2, titulo:'Última de espadas ♠', regla:'¿En qué ÍNDICE está la ÚLTIMA carta de espadas ♠?', key:'espadas', code:"cartas.findLastIndex(c => c.palo === '♠')", condHint:'♠', deck:[mk(2,'♥'),mk(5,'♦'),mk(3,'♠'),mk(9,'♥'),mk(6,'♠'),mk(4,'♦'),mk(7,'♥')] },
  { id:3, titulo:'Última con valor > 4', regla:'¿En qué ÍNDICE está la ÚLTIMA carta con valor > 4?', key:'mayor4', code:"cartas.findLastIndex(c => c.valor > 4)", condHint:'> 4', deck:[mk(2,'♣'),mk(3,'♥'),mk(5,'♠'),mk(2,'♦'),mk(7,'♥'),mk(4,'♠'),mk(9,'♦')] },
  { id:4, titulo:'Última de corazones ♥', regla:'¿En qué ÍNDICE está la ÚLTIMA carta de corazones ♥? Ojo: ♦ es roja, pero no es ♥.', key:'corazones', code:"cartas.findLastIndex(c => c.palo === '♥')", condHint:'♥', deck:[mk(2,'♠'),mk(4,'♥'),mk(3,'♣'),mk(8,'♥'),mk(6,'♠'),mk(9,'♦'),mk(5,'♣')] },
  procedural(5,'Última carta negra','¿En qué ÍNDICE está la ÚLTIMA carta negra (♠ o ♣)?','negra',"cartas.findLastIndex(c => c.color === 'negra')",'negra'),
  procedural(6,'Última de diamantes ♦','¿En qué ÍNDICE está la ÚLTIMA carta de diamantes ♦?','diamantes',"cartas.findLastIndex(c => c.palo === '♦')",'♦'),
  procedural(7,'Última con valor < 5','¿En qué ÍNDICE está la ÚLTIMA carta con valor < 5?','menor5',"cartas.findLastIndex(c => c.valor < 5)",'< 5'),
  procedural(8,'Última con valor === 7','¿En qué ÍNDICE está la ÚLTIMA carta con valor exactamente 7?','igual7',"cartas.findLastIndex(c => c.valor === 7)",'=== 7'),
  procedural(9,'Última ♥ o ♠','¿En qué ÍNDICE está la ÚLTIMA carta de corazones ♥ o espadas ♠?','corazones-espadas',"cartas.findLastIndex(c => c.palo === '♥' || c.palo === '♠')",'♥'),
  procedural(10,'Última con valor par','¿En qué ÍNDICE está la ÚLTIMA carta con valor PAR?','par',"cartas.findLastIndex(c => c.valor % 2 === 0)",'par'),
  procedural(11,'Última con valor impar','¿En qué ÍNDICE está la ÚLTIMA carta con valor IMPAR?','impar',"cartas.findLastIndex(c => c.valor % 2 === 1)",'impar'),
  procedural(12,'Última con valor ≥ 8','¿En qué ÍNDICE está la ÚLTIMA carta con valor mayor o igual a 8?','mayorIgual8',"cartas.findLastIndex(c => c.valor >= 8)",'>= 8'),
  procedural(13,'Última de tréboles ♣','¿En qué ÍNDICE está la ÚLTIMA carta de tréboles ♣?','treboles',"cartas.findLastIndex(c => c.palo === '♣')",'♣'),
  procedural(14,'Última con valor ≤ 3','¿En qué ÍNDICE está la ÚLTIMA carta con valor menor o igual a 3?','menorIgual3',"cartas.findLastIndex(c => c.valor <= 3)",'<= 3'),
  procedural(15,'Última roja con valor > 5','¿En qué ÍNDICE está la ÚLTIMA carta ROJA con valor > 5?','rojaMayor5',"cartas.findLastIndex(c => c.color === 'roja' && c.valor > 5)",'roja'),
  procedural(16,'Última negra con valor par','¿En qué ÍNDICE está la ÚLTIMA carta NEGRA con valor PAR?','negraPar',"cartas.findLastIndex(c => c.color === 'negra' && c.valor % 2 === 0)",'negra'),
  procedural(17,'Última ♠ o ♣','¿En qué ÍNDICE está la ÚLTIMA carta de espadas ♠ o tréboles ♣?','espadas-treboles',"cartas.findLastIndex(c => c.palo === '♠' || c.palo === '♣')",'♠'),
  procedural(18,'Última con valor > 6','¿En qué ÍNDICE está la ÚLTIMA carta con valor > 6?','mayor6',"cartas.findLastIndex(c => c.valor > 6)",'> 6'),
  { id:19, titulo:'JEFE FINAL · Última roja > 8', regla:'JEFE FINAL — ¿En qué ÍNDICE está la ÚLTIMA carta ROJA con valor > 8? Tienes 60 segundos.', key:'rojaMayor8', code:"cartas.findLastIndex(c => c.color === 'roja' && c.valor > 8)", condHint:'roja', deck:[mk(2,'♠'),mk(3,'♥'),mk(5,'♣'),mk(7,'♦'),mk(9,'♠'),mk(6,'♥'),mk(13,'♣'),mk(2,'♦'),mk(12,'♠'),mk(8,'♥'),mk(4,'♣'),mk(10,'♦'),mk(3,'♠'),mk(11,'♥'),mk(8,'♣'),mk(10,'♠'),mk(12,'♥'),mk(13,'♠'),mk(2,'♣')] },
];

const sleep = (ms:number)=>new Promise(r=>setTimeout(r,ms));
async function api(action:string, args:any){
  const res = await fetch("actions", { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({action, args}) });
  const j = await res.json().catch(()=>({}));
  if(!res.ok || j.error) throw new Error(j.error || 'No se pudo guardar el progreso');
  return j.data;
}

export default function App(){
  const [handId,setHandId]=useState(1);
  const [mode,setMode]=useState<Mode>('normal');
  const [phase,setPhase]=useState(0);
  const [infiniteSeed,setInfiniteSeed]=useState(1);
  const [selected,setSelected]=useState<number|null>(null);
  const [points,setPoints]=useState(0);
  const [streak,setStreak]=useState(0);
  const [solved,setSolved]=useState<number[]>([]);
  const [logs,setLogs]=useState<string[]>(['> Casino listo. Eres el crupier.','> findLastIndex devuelve un NÚMERO, no la carta.','> Lee la regla y responde desde la DERECHA.']);
  const [feedback,setFeedback]=useState('Elige un índice y llévalo al cuadro. Puedes usar el barrido para ver la lógica.');
  const [feedbackKind,setFeedbackKind]=useState<'info'|'ok'|'bad'>('info');
  const [revealed,setRevealed]=useState(false);
  const [sweepIdx,setSweepIdx]=useState<number|null>(null);
  const [sweeping,setSweeping]=useState(false);
  const [usedSweep,setUsedSweep]=useState(false);
  const [condition,setCondition]=useState('');
  const [history,setHistory]=useState<History[]>([]);
  const [countdown,setCountdown]=useState(3);
  const [hidden,setHidden]=useState(false);
  const [peekIdx,setPeekIdx]=useState<number|null>(null);
  const [bossTime,setBossTime]=useState(60);
  const [showReset,setShowReset]=useState(false);
  const [saveState,setSaveState]=useState('Progreso guardado en esta sesión');
  const [recordId,setRecordId]=useState<string|null>(null);
  const loadedRef=useRef(false);
  const savingRef=useRef(false);

  const hand = HANDS.find(h=>h.id===handId) || HANDS[0];
  const infiniteDeck = useMemo(()=>{
    const rnd=mulberry(infiniteSeed*131+7); const suits: Suit[]=['♠','♥','♦','♣'];
    const keys=['diamantes','mayor6','negra','roja'];
    const key=keys[infiniteSeed % keys.length];
    const deck=Array.from({length:20},()=>mk(1+Math.floor(rnd()*13), suits[Math.floor(rnd()*4)]));
    if(!deck.some(c=>matches(c,key))) deck[17]=mk(9,'♦');
    const codes:Record<string,string>={"diamantes":"cartas.findLastIndex(c => c.palo === '♦')","mayor6":"cartas.findLastIndex(c => c.valor > 6)","negra":"cartas.findLastIndex(c => c.color === 'negra')","roja":"cartas.findLastIndex(c => c.color === 'roja')"};
    const reglas:Record<string,string>={"diamantes":"¿En qué ÍNDICE está la ÚLTIMA carta de diamantes ♦ entre 20?","mayor6":"¿En qué ÍNDICE está la ÚLTIMA carta con valor > 6 entre 20?","negra":"¿En qué ÍNDICE está la ÚLTIMA carta NEGRA entre 20?","roja":"¿En qué ÍNDICE está la ÚLTIMA carta ROJA entre 20?"};
    return {deck,key,code:codes[key],regla:reglas[key]};
  },[infiniteSeed]);

  const active = useMemo(()=>{
    if(mode==='minus1') return { deck:[mk(2,'♥'),mk(5,'♠'),mk(3,'♦'),mk(9,'♥'),mk(4,'♠'),mk(7,'♦'),mk(6,'♥')], key:'treboles', code:"cartas.findLastIndex(c => c.palo === '♣')", regla:'MODO -1 — ¿En qué ÍNDICE está la ÚLTIMA carta de tréboles ♣? Mira bien: puede que no haya ninguna.', titulo:'Modo -1 · La imposible' };
    if(mode==='firstLast') return { deck: HANDS[0].deck, key:'roja', code: phase===0 ? "cartas.findIndex(c => c.color === 'roja')" : HANDS[0].code, regla: phase===0 ? 'PRIMERA vs ÚLTIMA · ¿ÍNDICE de la PRIMERA carta roja?' : 'PRIMERA vs ÚLTIMA · ¿ÍNDICE de la ÚLTIMA carta roja?', titulo:'Primera vs Última' };
    if(mode==='memory') return { deck: HANDS[0].deck, key:'roja', code:HANDS[0].code, regla:'MODO MEMORIA — Memoriza la mesa. Se volteará en 3, 2, 1… Recuerda el índice de la última roja.', titulo:'Modo Memoria' };
    if(mode==='infinite') return { deck: infiniteDeck.deck, key: infiniteDeck.key, code: infiniteDeck.code, regla: infiniteDeck.regla, titulo:'Baraja Infinita · 20 cartas' };
    return { deck: hand.deck, key: hand.key, code: hand.code, regla: hand.regla, titulo:`Mano ${hand.id} · ${hand.titulo}` };
  },[mode,phase,hand,infiniteDeck]);

  const expected = useMemo(()=>{ let r=-1; active.deck.forEach((c,i)=>{ if(matches(c,active.key)) r=i; }); return r; },[active]);
  const firstIdx = useMemo(()=> active.deck.findIndex(c=>matches(c,active.key)),[active]);
  const displayExpected = mode==='firstLast' && phase===0 ? firstIdx : expected;
  const isBoss = mode==='normal' && handId===19;

  // Load progress
  useEffect(()=>{
    (async()=>{
      try{
        const data = await api("records.list", { collection:"carta-roja-progreso" });
        const rec = data?.records?.[0];
        if(rec){ setRecordId(rec.id); const v=rec.value||{}; if(typeof v.points==='number') setPoints(v.points); if(typeof v.streak==='number') setStreak(v.streak); if(Array.isArray(v.solved)) setSolved(v.solved); if(typeof v.handId==='number') setHandId(v.handId); setSaveState('Progreso recuperado'); }
      }catch{ setSaveState('Sin conexión al guardado: tu partida sigue en esta sesión'); }
      loadedRef.current=true;
    })();
  },[]);

  // Save progress
  useEffect(()=>{
    if(!loadedRef.current) return;
    const t=setTimeout(async()=>{
      if(savingRef.current) return; savingRef.current=true;
      try{
        const value={points,streak,solved,handId,updatedAt:new Date().toISOString()};
        if(recordId){ await api("records.replace", { collection:"carta-roja-progreso", id:recordId, value }); }
        else { const created=await api("records.create", { collection:"carta-roja-progreso", value }); if(created?.id) setRecordId(created.id); }
        setSaveState('Progreso guardado');
      }catch{ setSaveState('No se pudo guardar ahora'); }
      savingRef.current=false;
    },600);
    return ()=>clearTimeout(t);
  },[points,streak,solved,handId,recordId]);

  // Memory countdown
  useEffect(()=>{
    if(mode!=='memory') return;
    setHidden(false); setCountdown(3); setRevealed(false); setSelected(null);
    const iv=setInterval(()=>{ setCountdown(c=>{ if(c<=1){ clearInterval(iv); setHidden(true); setFeedback('Cartas boca abajo 🂠. Recuerda el índice. Si necesitas mirar, cada vistazo cuesta -2.'); return 0; } return c-1; }); },1000);
    return ()=>clearInterval(iv);
  },[mode]);

  // Boss timer
  useEffect(()=>{
    if(!isBoss || revealed) return;
    setBossTime(60);
    const iv=setInterval(()=>setBossTime(t=>Math.max(0,t-1)),1000);
    return ()=>clearInterval(iv);
  },[isBoss,handId,revealed]);

  useEffect(()=>{ if(isBoss && bossTime===0 && !revealed){ setFeedback('⏱ Tiempo agotado en el Jefe Final. Respira, lee desde la derecha y vuelve a intentarlo.'); setFeedbackKind('bad'); } },[bossTime,isBoss,revealed]);

  function resetRound(){
    setSelected(null); setRevealed(false); setSweepIdx(null); setUsedSweep(false); setCondition(''); setFeedback('Nueva mesa. Lee la regla y responde desde la derecha.'); setFeedbackKind('info'); setPeekIdx(null);
    if(mode==='memory'){ setHidden(false); setCountdown(3); }
  }
  function chooseMode(m:Mode){ setMode(m); setPhase(0); setHandId(m==='normal'?handId:handId); setInfiniteSeed(s=>s+1); setTimeout(resetRound,0); setLogs([`> Modo: ${m}.`, `> ${m==='minus1'?'Busca una carta que quizá no existe.':m==='firstLast'?'Primero findIndex, luego findLastIndex. Siente la dirección.':m==='memory'?'Memoriza antes de que se volteen.':m==='infinite'?'20 cartas. La regla cambia en cada reparto.':'Mesa normal.'}`]); }
  function chooseHand(id:number){ setMode('normal'); setHandId(id); setPhase(0); setTimeout(resetRound,0); setLogs([`> Mano ${id} repartida.`, `> ${HANDS.find(h=>h.id===id)?.regla}`]); }

  async function runSweep(){
    if(sweeping) return; setSweeping(true); setUsedSweep(true); setRevealed(false);
    const useFirst = mode==='firstLast' && phase===0;
    const newLogs:string[]=[];
    newLogs.push(`> Ejecutando ${active.code}`);
    newLogs.push(useFirst ? '[Recorrido desde el inicio] findIndex avanza 0 → final' : '[Iteración desde el final] findLastIndex retrocede desde el final');
    setLogs(prev=>[...prev, ...newLogs]);
    if(useFirst){
      for(let i=0;i<active.deck.length;i++){ setSweepIdx(i); await sleep(380); const ok=matches(active.deck[i],active.key); setLogs(p=>[...p, `[${i}] ${active.deck[i].suit} ${active.deck[i].color} — ${ok?'true → ✅ ¡ENCONTRADO! Se detiene aquí.':'false → sigue'}`]); if(ok) break; }
    } else {
      for(let i=active.deck.length-1;i>=0;i--){ setSweepIdx(i); await sleep(380); const ok=matches(active.deck[i],active.key); setLogs(p=>[...p, `[${i}] ${active.deck[i].suit} ${active.deck[i].color} — ${ok?'true → ✅ ¡ENCONTRADO! Se detiene aquí.':'false → sigue'}`]); if(ok) break; if(i===0) setLogs(p=>[...p,'Revisó todas de atrás hacia adelante, ninguna cumplió, por eso devuelve -1.']); }
    }
    setLogs(p=>[...p, useFirst ? '🧠 Depurador: findIndex recorre de ADELANTE hacia ATRÁS.' : '🧠 Depurador: findLastIndex recorre de ATRÁS hacia ADELANTE. No revisó las anteriores porque ya encontró el último.', `> Resultado: ${displayExpected} ← Es un NÚMERO, no la carta.`]);
    setSweeping(false);
  }

  function confirm(){
    if(selected===null){ setFeedback('Primero lleva un número al cuadro de respuesta. Haz clic en un número o arrástralo.'); setFeedbackKind('bad'); return; }
    const correct = selected===displayExpected;
    const isMatchButNotLast = !correct && selected>=0 && selected<active.deck.length && matches(active.deck[selected],active.key);
    const isImpossible = displayExpected===-1;
    let delta=0; let msg=''; let kind:'ok'|'bad'='bad';
    const isBossRound=isBoss;
    if(correct){
      delta = isBossRound ? 20 : 10;
      if(usedSweep) delta+=5;
      const condOk = condition.trim()!=='' && (condition.includes(hand.condHint) || condition.toLowerCase().includes('roja') && active.key.includes('roja') || condition.includes('>') || condition.includes('===') || condition.includes('palo') || condition.includes('color') || condition.includes('valor'));
      if(condOk) delta+=5;
      msg = `✅ ¡Correcto! ${active.code} // → ${displayExpected}. ${isBossRound?'Jefe Final superado: +20.':'+10 por acierto directo.'}${usedSweep?' +5 por usar el barrido y acertar.':''}${condOk?' +5 por escribir la condición.':''} ${isImpossible?'Revisó todas, ninguna cumplió: por eso -1.':''}`;
      kind='ok'; setStreak(s=>s+1);
      if(mode==='normal' && !solved.includes(handId)) setSolved(s=>[...s,handId]);
      if(mode==='firstLast' && phase===0){ setTimeout(()=>{ setPhase(1); resetRound(); setFeedback('Ahora la misma mesa, pero desde el FINAL. ¿Índice de la ÚLTIMA roja?'); setFeedbackKind('info'); },900); }
      if(isBossRound) msg+=' 🏆 Badge: CRUPIER NIVEL 19';
    } else if(isMatchButNotLast){ delta=-5; setStreak(0); msg=`❌ Esa carta también cumple, pero findLastIndex busca desde el FINAL. El índice correcto es ${displayExpected}. -5 por el error típico de inercia izquierda → derecha.`; }
    else { delta=-3; setStreak(0); msg=`❌ Esa carta no cumple la regla. El índice correcto es ${displayExpected}. -3. Vuelve a leer la regla y barre desde la derecha.`; }
    setPoints(p=>Math.max(0,p+delta)); setRevealed(true);
    setLogs(p=>[...p, `> Confirmado: ${selected} · ${correct?'✅':'❌'} · Puntos ${delta>=0?'+':''}${delta}`, `> ${active.code} // → ${displayExpected}`, `⚖️ Comparación: findLast → OBJETO carta | findLastIndex → NÚMERO ${displayExpected} | findIndex → NÚMERO ${firstIdx}`]);
    setHistory(h=>[{texto:`${active.titulo} · elegiste ${selected} · correcto ${displayExpected}`, pts:delta}, ...h].slice(0,8));
    setFeedback(msg); setFeedbackKind(kind);
  }
  function nextHand(){
    if(mode==='infinite'){ setInfiniteSeed(s=>s+1); resetRound(); setLogs(p=>[...p,'> Nueva baraja infinita repartida.']); return; }
    if(mode!=='normal'){ chooseMode('normal'); return; }
    const next = handId>=19?1:handId+1; chooseHand(next);
  }
  function peek(){
    if(mode!=='memory' || !hidden) return;
    setPoints(p=>Math.max(0,p-2));
    const idx = Math.floor(Math.random()*active.deck.length);
    setPeekIdx(idx); setFeedback('👁 Vistazo de 1 segundo: -2 puntos. Esa carta vuelve a voltearse.'); setFeedbackKind('info');
    setTimeout(()=>setPeekIdx(null),1000);
  }
  function doReset(){ setPoints(0); setStreak(0); setSolved([]); setHistory([]); setHandId(1); setMode('normal'); setShowReset(false); resetRound(); setSaveState('Partida reiniciada'); }

  const showMinus1 = mode==='minus1';
  const indices = active.deck.map((_,i)=>i);

  return (
    <div data-safe-area-inset-root style={{boxSizing:'border-box', paddingTop:'var(--safe-area-inset-top)', minHeight:'100vh', background:'radial-gradient(900px 400px at 50% -80px, rgba(245,197,66,.18), transparent), var(--bg)'}} className="overflow-x-clip">
      <header data-safe-area-sticky-top style={{top:'var(--safe-area-inset-top)'}} className="sticky z-30 border-b border-[var(--line)] bg-[#050816]/90 backdrop-blur">
        <div className="mx-auto max-w-[1500px] px-3 sm:px-5 py-3 flex flex-wrap items-center gap-3 justify-between">
          <div className="min-w-0"><h1 className="text-[clamp(1.25rem,3vw,2rem)] leading-none font-bold tracking-wide">🃏 CASINO <span className="gold-text">“LA ÚLTIMA MESA”</span> <span className="text-[var(--neon)]">· CRUPIER</span></h1><p className="text-xs sm:text-sm text-[var(--muted)]">findLastIndex → devuelve un <b className="text-white">NÚMERO</b>, no la carta · Lee desde la derecha</p></div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-2 rounded-full bg-[#131c33] border border-[var(--line)] text-sm font-bold">🪙 PUNTOS: <b className="text-[var(--gold)]">{points}</b></span>
            <span className="px-3 py-2 rounded-full bg-[#131c33] border border-[var(--line)] text-sm font-bold">🔥 RACHA: {streak}</span>
            <button onClick={()=>setShowReset(true)} className="px-3 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-bold flex items-center gap-1"><RotateCcw size={15}/> Reiniciar</button>
          </div>
        </div>
        {showReset && <div className="mx-auto max-w-[1500px] px-4 pb-3"><div className="p-3 rounded-xl bg-[#2a1218] border border-red-400/40 flex flex-wrap gap-2 items-center text-sm">¿Reiniciar puntos, racha y manos resueltas? <button onClick={doReset} className="px-3 py-1 rounded bg-red-500 font-bold">Sí, reiniciar</button><button onClick={()=>setShowReset(false)} className="px-3 py-1 rounded bg-white/15">Cancelar</button></div></div>}
      </header>

      <main className="mx-auto max-w-[1500px] px-3 sm:px-5 py-4 grid gap-4 lg:grid-cols-[300px_minmax(0,1fr)_420px] items-start">
        {/* IZQUIERDA */}
        <aside className="panel p-4 order-2 lg:order-1">
          <h2 className="font-bold text-lg tracking-wide flex items-center gap-2">🎴 MANOS <span className="text-xs text-[var(--muted)]">{solved.length}/19 resueltas</span></h2>
          <div className="mt-3 grid grid-cols-5 lg:grid-cols-1 gap-2 max-h-[320px] lg:max-h-[520px] overflow-y-auto pr-1">
            {HANDS.map(h=>(
              <button key={h.id} onClick={()=>chooseHand(h.id)} className={`text-left px-3 py-2 rounded-xl border text-sm font-semibold ${mode==='normal'&&handId===h.id?'bg-[var(--gold)] text-black border-[var(--gold)]':'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                <span className="flex justify-between gap-1"><span className="break-words">{h.id}. {h.id===19?'JEFE FINAL':h.titulo}</span><span>{solved.includes(h.id)?'✅':''}</span></span>
              </button>
            ))}
          </div>
          <h3 className="mt-5 font-bold text-[var(--gold)]">✨ MODOS ESPECIALES</h3>
          <div className="mt-2 grid gap-2">
            <button onClick={()=>chooseMode('minus1')} className={`p-3 rounded-xl border text-left ${mode==='minus1'?'bg-red-500/20 border-red-400':'bg-white/5 border-white/10'}`}><b>−1 · La imposible</b><span className="block text-xs text-[var(--muted)]">Regla sin match: la respuesta es -1.</span></button>
            <button onClick={()=>chooseMode('firstLast')} className={`p-3 rounded-xl border text-left ${mode==='firstLast'?'bg-cyan-500/20 border-cyan-400':'bg-white/5 border-white/10'}`}><b>↔ Primera vs Última</b><span className="block text-xs text-[var(--muted)]">Misma mesa: findIndex y luego findLastIndex.</span></button>
            <button onClick={()=>chooseMode('memory')} className={`p-3 rounded-xl border text-left ${mode==='memory'?'bg-violet-500/20 border-violet-400':'bg-white/5 border-white/10'}`}><b>🧠 Memoria</b><span className="block text-xs text-[var(--muted)]">Se voltean en 3, 2, 1… Cada vistazo -2.</span></button>
            <button onClick={()=>chooseMode('infinite')} className={`p-3 rounded-xl border text-left ${mode==='infinite'?'bg-emerald-500/20 border-emerald-400':'bg-white/5 border-white/10'}`}><b>♾ Baraja Infinita</b><span className="block text-xs text-[var(--muted)]">20 cartas, regla al azar.</span></button>
          </div>
          <div className="mt-5"><h3 className="font-bold flex gap-2 items-center"><BookOpen size={16}/> Bitácora del crupier</h3><p className="text-xs text-[var(--muted)]">{saveState}</p>
            <ul className="mt-2 space-y-2 text-sm">{history.length===0?<li className="text-[var(--muted)]">Aún no hay jugadas. Tu historial aparecerá aquí.</li>:history.map((h,i)=>(<li key={i} className="p-2 rounded-lg bg-black/30 border border-white/10 flex justify-between gap-2"><span className="break-words">{h.texto}</span><b className={h.pts>=0?'text-emerald-300':'text-red-300'}>{h.pts>=0?'+':''}{h.pts}</b></li>))}</ul>
          </div>
        </aside>

        {/* CENTRO */}
        <section className="order-1 lg:order-2 min-w-0">
          <div className="rounded-[22px] p-3 sm:p-4 border-2 border-[#c99a2e] shadow-[0_0_40px_rgba(245,197,66,.18)]" style={{background:'radial-gradient(circle at 50% 20%, #1d6a43, #0b3d24 55%, #062416)'}}>
            <div className="flex flex-wrap items-center justify-between gap-2 px-1">
              <div><h2 className="font-bold text-xl sm:text-2xl tracking-wide">🎴 MESA DEL CRUPIER</h2><p className="text-emerald-100/80 text-sm">{active.titulo} · {active.deck.length} cartas</p></div>
              {isBoss && <div className="flex items-center gap-2 bg-black/50 px-3 py-2 rounded-full font-bold"><Timer size={16} className="text-[var(--gold)]"/> {bossTime}s <span className="w-20 h-2 bg-white/20 rounded overflow-hidden"><span className="block h-full bg-[var(--gold)]" style={{width:`${bossTime/60*100}%`}}/></span></div>}
              {mode==='memory' && !hidden && <div className="text-2xl font-bold bg-black/60 px-4 py-2 rounded-full blink">{countdown>0?`${countdown} · ¡MEMORIZA!`:'¡Ya!'}</div>}
            </div>

            <div className="mt-3 bg-[#fff8e6] text-black rounded-2xl p-3 sm:p-4 font-bold text-center text-[clamp(1rem,2.5vw,1.35rem)] leading-snug">🎯 {active.regla}</div>

            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:gap-3">
              {active.deck.map((c,i)=>{
                const faceDown = (mode==='memory' && hidden && peekIdx!==i);
                const isSweep = sweepIdx===i;
                const isCorrect = revealed && i===displayExpected;
                const isWrongPick = revealed && selected===i && selected!==displayExpected;
                return (
                  <div key={i} className="text-center">
                    <div className={`card w-[52px] sm:w-[68px] h-[74px] sm:h-[96px] rounded-xl flex flex-col items-center justify-center border-2 ${faceDown?'bg-[#123a8a] border-white text-white text-3xl':'bg-white border-gray-300'} ${isSweep?'sweep':''} ${isCorrect?'gold-glow':''} ${isWrongPick?'shake border-red-500':''}`}>
                      {faceDown ? <span>🂠</span> : <><span className={`text-[clamp(1.6rem,5vw,2.4rem)] leading-none ${c.color==='roja'?'text-red-600':'text-slate-900'}`}>{c.suit}</span><span className={`font-bold text-lg ${c.color==='roja'?'text-red-600':'text-slate-900'}`}>{c.label}</span><span className="text-[10px] uppercase tracking-wider text-gray-500">{c.color}</span></>}
                    </div>
                    <div className={`mt-1 inline-block px-2 py-0.5 rounded text-xs font-bold ${isSweep?'bg-[var(--neon)] text-black':isCorrect?'bg-[var(--gold)] text-black':'bg-black/60 text-white'}`}>[{i}]</div>
                  </div>
                );
              })}
            </div>

            <div className="mt-4 bg-black/45 border border-yellow-200/30 rounded-2xl p-3 sm:p-4">
              <p className="text-center font-bold text-yellow-100">🎯 CUADRO DE RESPUESTA — Arrastra o haz clic en un número para llevarlo al cuadro</p>
              <div onDragOver={e=>e.preventDefault()} onDrop={e=>{ e.preventDefault(); const v=Number(e.dataTransfer.getData('text/plain')); if(!Number.isNaN(v)) setSelected(v); }} className="mx-auto mt-3 max-w-[420px] min-h-[86px] rounded-xl border-2 border-dashed border-[var(--gold)] bg-[#0a0f1e] flex items-center justify-center gap-3 px-3">
                <span className="text-2xl">🎯</span><span className="text-sm text-[var(--muted)]">CUADRO:</span>
                <span className={`pop inline-flex items-center justify-center min-w-[62px] h-[62px] rounded-full border-4 font-bold text-3xl ${selected===null?'border-white/30 text-white/50':'border-[var(--gold)] bg-[var(--gold)] text-black shadow-[0_0_22px_rgba(245,197,66,.8)]'}`}>{selected===null?'?':selected}</span>
                {selected!==null && <button onClick={()=>setSelected(null)} className="text-xs underline text-white/70">Quitar</button>}
              </div>

              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {indices.map(i=>(
                  <button key={i} draggable onDragStart={e=>{ e.dataTransfer.setData('text/plain', String(i)); }} onClick={()=>setSelected(i)} className={`w-11 h-11 rounded-full font-bold border-2 cursor-grab active:cursor-grabbing ${selected===i?'bg-[var(--gold)] text-black border-[var(--gold)] scale-110':'bg-white text-black border-gray-300 hover:bg-yellow-100'}`}>{i}</button>
                ))}
                {showMinus1 && <button onClick={()=>setSelected(-1)} className={`w-14 h-11 rounded-full font-bold border-2 ${selected===-1?'bg-red-500 text-white border-red-400':'bg-red-600 text-white border-red-300'}`}>-1</button>}
              </div>
              <p className="text-center text-xs text-white/60 mt-2">Toca un número para moverlo al cuadro. Para cambiar, toca otro número.</p>

              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <button onClick={runSweep} disabled={sweeping} className="px-4 py-2.5 rounded-full bg-[var(--neon)] text-black font-bold flex items-center gap-1 disabled:opacity-50"><Play size={16}/> ▶ BARRIDO INVERSO</button>
                <button onClick={confirm} className="px-4 py-2.5 rounded-full bg-[var(--gold)] text-black font-bold flex items-center gap-1"><CheckCircle2 size={16}/> ✅ CONFIRMAR ÍNDICE</button>
                <button onClick={nextHand} className="px-4 py-2.5 rounded-full bg-white text-black font-bold flex items-center gap-1">➡️ SIGUIENTE MANO <ArrowRight size={16}/></button>
                {mode==='memory' && <button onClick={peek} disabled={!hidden} className="px-4 py-2.5 rounded-full bg-violet-400 text-black font-bold flex items-center gap-1 disabled:opacity-50"><Eye size={16}/> 👁 VOLTEAR PARA MIRAR (-2)</button>}
              </div>

              <label className="block mt-4 text-sm font-bold text-yellow-100">✍️ Escribe la condición para +5 <span className="font-normal text-white/60">(opcional)</span></label>
              <div className="mt-1 flex flex-col sm:flex-row gap-2"><input value={condition} onChange={e=>setCondition(e.target.value)} placeholder="ej: c => c.color === 'roja'" className="flex-1 min-w-0 px-3 py-2.5 rounded-xl bg-white text-black font-code text-sm"/><span className="px-3 py-2.5 rounded-xl bg-white/10 text-xs self-center">Pista: incluye {hand.condHint}</span></div>

              <div className={`mt-4 p-3 rounded-xl font-semibold ${feedbackKind==='ok'?'bg-emerald-500/20 border border-emerald-300 text-emerald-100':feedbackKind==='bad'?'bg-red-500/20 border border-red-300 text-red-100':'bg-white/10 border border-white/15'}`}>{feedback}</div>
              {revealed && <div className="mt-3 p-3 rounded-xl bg-black/70 font-code text-sm break-words"><span className="text-[var(--neon)]">{active.code}</span> <span className="text-white">// → {displayExpected}</span>{isBoss && displayExpected===16 && selected===16 && <span className="block mt-1 text-[var(--gold)]">🏆 Badge desbloqueado: CRUPIER NIVEL 19</span>}</div>}
            </div>
          </div>
          <p className="text-center text-xs text-[var(--muted)] mt-3 flex flex-wrap justify-center gap-2"><span>✅ Directo +10</span><span>❌ Cumple pero no última -5</span><span>❌ No cumple -3</span><span>✍️ Condición +5</span><span>▶ Barrido + acierto +5</span><span>👑 Jefe +20</span></p>
        </section>

        {/* DERECHA */}
        <aside className="panel p-4 order-3">
          <h2 className="font-bold text-lg">🖥 DEPURADOR AVANZADO: <span className="text-[var(--neon)]">.findLastIndex()</span></h2>
          <div className="mt-3 bg-black rounded-xl border border-emerald-400/20 p-3 h-[380px] overflow-y-auto font-code text-[12px] leading-relaxed">
            {logs.map((l,i)=>(<p key={i} className="break-words whitespace-pre-wrap text-emerald-100/90">{l}</p>))}
            <p className="text-emerald-400 blink">▌</p>
          </div>
          <div className="mt-3 p-3 rounded-xl bg-[#fff7d6] text-black text-sm"><b>⚖️ Comparación siempre visible</b><p className="font-code mt-1 break-words">findLast → OBJETO carta<br/>findLastIndex → NÚMERO {displayExpected}<br/>findIndex → NÚMERO {firstIdx} (primera)</p><p className="mt-2 text-xs">findLastIndex recorre de <b>atrás hacia adelante</b> y se detiene en el primer match desde la derecha.</p></div>
          <div className="mt-3 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-lg bg-white/5"><Sparkles className="mx-auto text-[var(--gold)]" size={18}/><p className="text-xs mt-1">Memoria<br/><b>Recorrido inverso</b></p></div>
            <div className="p-2 rounded-lg bg-white/5"><Coins className="mx-auto text-[var(--gold)]" size={18}/><p className="text-xs mt-1">Fichas<br/><b>Al acertar</b></p></div>
            <div className="p-2 rounded-lg bg-white/5"><Trophy className="mx-auto text-[var(--gold)]" size={18}/><p className="text-xs mt-1">Meta<br/><b>Nivel 19</b></p></div>
          </div>
          <button onClick={()=>setLogs(['> Consola limpia.','> Vuelve a pulsar Barrido o Confirmar.'])} className="mt-3 w-full py-2 rounded-xl bg-white/10 font-bold text-sm">Limpiar consola</button>
          {revealed && selected===displayExpected && <div className="mt-3 text-center text-3xl">🪙 🪙 🪙 <span className="block text-sm font-bold text-[var(--gold)]">La carta correcta brilla dorada</span></div>}
        </aside>
      </main>
      <footer className="mx-auto max-w-[1500px] px-4 pb-8 text-center text-xs text-[var(--muted)]">La Última Carta Roja · Aprende findLastIndex señalando el índice, no la carta. Tu progreso (puntos, racha y manos resueltas) se guarda para continuar después.</footer>
    </div>
  );
}
