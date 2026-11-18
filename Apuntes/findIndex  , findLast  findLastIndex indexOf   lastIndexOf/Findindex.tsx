import React, { useEffect, useRef, useState } from 'react';

type Suspect = { nombre:string; sombrero:boolean; coartada:boolean; edad:number; lentes:boolean };
type CaseDef = { id:string; num:string; titulo:string; pista:string; sospechosos:Suspect[]; respuesta:number; codigo:string; tipo:string; dificil?:boolean };

const CASES: CaseDef[] = [
  { id:'c1', num:'1', titulo:'El primero con sombrero', pista:'Encuentra al primero con sombrero 🎩', tipo:'Condición booleana simple', codigo:'sospechosos.findIndex(s => s.sombrero) // → 2', respuesta:2, sospechosos:[
    {nombre:'Ana',sombrero:false,coartada:true,edad:28,lentes:false},
    {nombre:'Luis',sombrero:false,coartada:false,edad:35,lentes:true},
    {nombre:'Marta',sombrero:true,coartada:false,edad:31,lentes:false},
    {nombre:'Pedro',sombrero:true,coartada:true,edad:45,lentes:false},
    {nombre:'Sofía',sombrero:true,coartada:false,edad:27,lentes:true},
  ]},
  { id:'c2', num:'2', titulo:'Primero con edad > 40', pista:'Encuentra al primero con edad > 40', tipo:'Condición numérica', codigo:'sospechosos.findIndex(s => s.edad > 40) // → 3', respuesta:3, sospechosos:[
    {nombre:'Ana',sombrero:false,coartada:true,edad:22,lentes:false},
    {nombre:'Luis',sombrero:true,coartada:true,edad:35,lentes:false},
    {nombre:'Marta',sombrero:false,coartada:false,edad:39,lentes:true},
    {nombre:'Pedro',sombrero:true,coartada:true,edad:42,lentes:false},
    {nombre:'Sofía',sombrero:false,coartada:false,edad:50,lentes:true},
    {nombre:'Miguel',sombrero:true,coartada:true,edad:30,lentes:false},
  ]},
  { id:'c3', num:'3', titulo:'Sin coartada Y con sombrero', pista:'Encuentra al primero cuya coartada sea falsa Y tenga sombrero', tipo:'Condición compuesta (&&)', codigo:'sospechosos.findIndex(s => !s.coartada && s.sombrero) // → 3', respuesta:3, sospechosos:[
    {nombre:'Ana',sombrero:true,coartada:true,edad:28,lentes:false},
    {nombre:'Luis',sombrero:false,coartada:false,edad:35,lentes:true},
    {nombre:'Marta',sombrero:true,coartada:true,edad:31,lentes:false},
    {nombre:'Pedro',sombrero:true,coartada:false,edad:44,lentes:false},
    {nombre:'Sofía',sombrero:true,coartada:false,edad:27,lentes:true},
    {nombre:'Miguel',sombrero:false,coartada:false,edad:38,lentes:false},
  ]},
  { id:'c4', num:'4', titulo:'Primero que NO tenga coartada', pista:'Encuentra al primero que NO tenga coartada', tipo:'Negación (!)', codigo:'sospechosos.findIndex(s => !s.coartada) // → 1', respuesta:1, sospechosos:[
    {nombre:'Ana',sombrero:false,coartada:true,edad:28,lentes:false},
    {nombre:'Luis',sombrero:true,coartada:false,edad:35,lentes:false},
    {nombre:'Marta',sombrero:false,coartada:false,edad:31,lentes:true},
    {nombre:'Pedro',sombrero:true,coartada:true,edad:45,lentes:false},
    {nombre:'Sofía',sombrero:false,coartada:false,edad:27,lentes:false},
    {nombre:'Miguel',sombrero:true,coartada:true,edad:40,lentes:true},
  ]},
  { id:'c5', num:'5', titulo:"Primero con nombre por 'M'", pista:"Encuentra al primero con nombre que empiece por 'M'", tipo:'Condición sobre string', codigo:"sospechosos.findIndex(s => s.nombre.startsWith('M')) // → 3", respuesta:3, sospechosos:[
    {nombre:'Ana',sombrero:false,coartada:true,edad:28,lentes:false},
    {nombre:'Luis',sombrero:true,coartada:false,edad:35,lentes:false},
    {nombre:'Pedro',sombrero:false,coartada:true,edad:33,lentes:true},
    {nombre:'Marta',sombrero:true,coartada:false,edad:31,lentes:false},
    {nombre:'Sofía',sombrero:false,coartada:true,edad:27,lentes:true},
    {nombre:'Miguel',sombrero:true,coartada:false,edad:39,lentes:false},
  ]},
  { id:'c6', num:'6', titulo:'El primero con lentes', pista:'Encuentra al primero con lentes 👓', tipo:'Condición booleana simple', codigo:'sospechosos.findIndex(s => s.lentes) // → 2', respuesta:2, sospechosos:[
    {nombre:'Ana',sombrero:false,coartada:true,edad:28,lentes:false},
    {nombre:'Luis',sombrero:true,coartada:false,edad:35,lentes:false},
    {nombre:'Marta',sombrero:false,coartada:false,edad:31,lentes:true},
    {nombre:'Pedro',sombrero:true,coartada:true,edad:45,lentes:true},
    {nombre:'Sofía',sombrero:false,coartada:false,edad:27,lentes:false},
    {nombre:'Miguel',sombrero:false,coartada:true,edad:38,lentes:true},
  ]},
  { id:'trampa', num:'TRAMPA', titulo:'Nivel Trampa', pista:'Encuentra al primero con sombrero 🎩 — ¡cuidado con los que también cumplen!', tipo:'Trampa didáctica: el primero, no el más evidente', codigo:'sospechosos.findIndex(s => s.sombrero) // → 2', respuesta:2, sospechosos:[
    {nombre:'Ana',sombrero:false,coartada:true,edad:28,lentes:false},
    {nombre:'Luis',sombrero:false,coartada:false,edad:35,lentes:true},
    {nombre:'Marta',sombrero:true,coartada:false,edad:31,lentes:false},
    {nombre:'Pedro',sombrero:true,coartada:true,edad:45,lentes:false},
    {nombre:'Sofía',sombrero:true,coartada:false,edad:27,lentes:true},
  ]},
  { id:'n18', num:'18', titulo:'DETECTIVE NIVEL 18', pista:'Primero con edad > 30 Y sin coartada Y con sombrero', tipo:'Modo difícil · 18 sospechosos · 60 s', codigo:'sospechosos.findIndex(s => s.edad > 30 && !s.coartada && s.sombrero) // → 14', respuesta:14, dificil:true, sospechosos:[
    {nombre:'Ana',sombrero:true,coartada:true,edad:25,lentes:false},
    {nombre:'Luis',sombrero:false,coartada:false,edad:45,lentes:true},
    {nombre:'Marta',sombrero:true,coartada:false,edad:29,lentes:false},
    {nombre:'Pedro',sombrero:true,coartada:true,edad:50,lentes:false},
    {nombre:'Sofía',sombrero:false,coartada:false,edad:31,lentes:true},
    {nombre:'Miguel',sombrero:true,coartada:false,edad:28,lentes:false},
    {nombre:'Elena',sombrero:false,coartada:true,edad:42,lentes:true},
    {nombre:'Diego',sombrero:true,coartada:true,edad:33,lentes:false},
    {nombre:'Carla',sombrero:false,coartada:false,edad:38,lentes:false},
    {nombre:'Jorge',sombrero:true,coartada:false,edad:29,lentes:true},
    {nombre:'Lucía',sombrero:true,coartada:true,edad:45,lentes:false},
    {nombre:'Andrés',sombrero:false,coartada:false,edad:31,lentes:false},
    {nombre:'Paula',sombrero:true,coartada:false,edad:27,lentes:true},
    {nombre:'Hugo',sombrero:false,coartada:false,edad:55,lentes:false},
    {nombre:'Valeria',sombrero:true,coartada:false,edad:36,lentes:true},
    {nombre:'Tomás',sombrero:true,coartada:false,edad:24,lentes:false},
    {nombre:'Rosa',sombrero:true,coartada:false,edad:48,lentes:false},
    {nombre:'Iván',sombrero:true,coartada:false,edad:30,lentes:true},
  ]},
];

type LogItem = { id:string; texto:string; puntos:string; fecha:string };

async function api(action:string, args:any){
  const res = await fetch("actions", {method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify({action, args})});
  const json = await res.json();
  if(!res.ok || json.error) throw new Error(json.error || 'Error de guardado');
  return json.data;
}
const sleep = (ms:number)=> new Promise(r=>setTimeout(r,ms));
function normalizaCondicion(v:string){ return v.trim().toLowerCase().replace(/\s+/g,'').replace(/^\(?s\)?=>/,'').replace(/;$/,'').replace(/"/g,"'"); }
function condicionCorrecta(c:CaseDef, raw:string){
  if(!raw.trim()) return false;
  const n = normalizaCondicion(raw);
  if(c.id==='c1'||c.id==='trampa') return ['s.sombrero','s.sombrero===true','s.sombrero==true'].includes(n);
  if(c.id==='c2') return n==='s.edad>40'||n==='s.edad>=41';
  if(c.id==='c3') return n.includes('!s.coartada') && n.includes('s.sombrero') && n.includes('&&');
  if(c.id==='c4') return ['!s.coartada','s.coartada===false','s.coartada==false','!s.coartada===true'].includes(n);
  if(c.id==='c5') return n.includes("s.nombre.startswith('m')") || n.includes("s.nombre[0]==='m'") || n.includes("s.nombre[0]===\"m\"") || n.includes("s.nombre.startswith('m')");
  if(c.id==='c6') return ['s.lentes','s.lentes===true','s.lentes==true'].includes(n);
  if(c.id==='n18') return n.includes('s.edad>30') && n.includes('!s.coartada') && n.includes('s.sombrero') && n.includes('&&');
  return false;
}
function cumple(c:CaseDef, s:Suspect){
  if(c.id==='c1'||c.id==='trampa') return s.sombrero;
  if(c.id==='c2') return s.edad>40;
  if(c.id==='c3') return !s.coartada && s.sombrero;
  if(c.id==='c4') return !s.coartada;
  if(c.id==='c5') return s.nombre.startsWith('M');
  if(c.id==='c6') return s.lentes;
  if(c.id==='n18') return s.edad>30 && !s.coartada && s.sombrero;
  return false;
}
function evalTexto(c:CaseDef, s:Suspect){
  if(c.id==='c1'||c.id==='trampa') return `s.sombrero = ${s.sombrero}`;
  if(c.id==='c2') return `s.edad > 40 → ${s.edad} > 40 = ${s.edad>40}`;
  if(c.id==='c3') return `!s.coartada && s.sombrero → ${!s.coartada} && ${s.sombrero} = ${!s.coartada && s.sombrero}`;
  if(c.id==='c4') return `!s.coartada = ${!s.coartada}`;
  if(c.id==='c5') return `s.nombre.startsWith('M') → '${s.nombre}' = ${s.nombre.startsWith('M')}`;
  if(c.id==='c6') return `s.lentes = ${s.lentes}`;
  if(c.id==='n18') return `s.edad>30 && !s.coartada && s.sombrero → ${s.edad>30} && ${!s.coartada} && ${s.sombrero} = ${s.edad>30 && !s.coartada && s.sombrero}`;
  return '';
}

export default function App(){
  const [caseId,setCaseId]=useState('c1');
  const caso = CASES.find(c=>c.id===caseId) || CASES[0];
  const [selected,setSelected]=useState<number|null>(null);
  const [condicion,setCondicion]=useState('');
  const [puntos,setPuntos]=useState(0);
  const [racha,setRacha]=useState(0);
  const [resueltos,setResueltos]=useState<string[]>([]);
  const [insignia,setInsignia]=useState(false);
  const [badge18,setBadge18]=useState(false);
  const [logs,setLogs]=useState<LogItem[]>([]);
  const [debug,setDebug]=useState<string[]>(['> Depurador listo. Elige un sospechoso y pulsa SEÑALAR.','> Recuerda: findIndex devuelve el ÍNDICE, no el valor.']);
  const [animando,setAnimando]=useState(false);
  const [resultado,setResultado]=useState<{tipo:'correcto'|'tarde'|'malo'|null; elegido:number|null; mensaje:string} >({tipo:null,elegido:null,mensaje:''});
  const [timer,setTimer]=useState(60);
  const [tiempoAgotado,setTiempoAgotado]=useState(false);
  const [overlay,setOverlay]=useState(false);
  const [guardadoMsg,setGuardadoMsg]=useState('');
  const progressIdRef=useRef<string|null>(null);
  const [cargando,setCargando]=useState(true);

  // Cargar progreso y bitácora
  useEffect(()=>{
    (async()=>{
      try{
        const prog = await api('records.list',{collection:'findindex-progress'});
        if(prog?.records?.[0]){
          progressIdRef.current = prog.records[0].id;
          const v=prog.records[0].value||{};
          if(typeof v.puntos==='number') setPuntos(v.puntos);
          if(typeof v.racha==='number') setRacha(v.racha);
          if(Array.isArray(v.resueltos)) setResueltos(v.resueltos);
          if(v.insignia) setInsignia(true);
          if(v.badge18) setBadge18(true);
        }
        const l = await api('records.list',{collection:'findindex-bitacora', limit:100});
        if(l?.records) setLogs(l.records.map((r:any)=>({id:r.id, texto:String(r.value?.texto||''), puntos:String(r.value?.puntos||''), fecha:String(r.value?.fecha||'')})));
      }catch{ /* sin backend en vista previa: el juego sigue en local */ }
      setCargando(false);
    })();
  },[]);

  // Temporizador Nivel 18
  useEffect(()=>{
    if(caso.id!=='n18' || tiempoAgotado || resueltos.includes('n18') || animando) return;
    const t=setInterval(()=> setTimer(v=>{
      if(v<=1){ clearInterval(t); setTiempoAgotado(true); setDebug(d=>[...d,'> ⏰ TIEMPO AGOTADO (60 s). Reinicia el caso para intentarlo de nuevo.']); return 0; }
      return v-1;
    }),1000);
    return ()=>clearInterval(t);
  },[caso.id, tiempoAgotado, resueltos, animando]);

  async function guardarProgreso(nuevo:{puntos:number; racha:number; resueltos:string[]; insignia:boolean; badge18:boolean}){
    try{
      if(progressIdRef.current){
        const r = await api('records.replace',{collection:'findindex-progress', id:progressIdRef.current, value:nuevo});
        if(r?.id) progressIdRef.current=r.id;
      }else{
        const r = await api('records.create',{collection:'findindex-progress', value:nuevo, idempotency_key:`prog-${Date.now()}`});
        if(r?.id) progressIdRef.current=r.id;
      }
      setGuardadoMsg('✓ Progreso guardado');
      setTimeout(()=>setGuardadoMsg(''),2500);
    }catch{ setGuardadoMsg('Sin conexión: tu partida sigue en pantalla.'); }
  }
  async function guardarLog(texto:string, puntosTxt:string){
    try{
      const fecha=new Date().toLocaleTimeString('es-ES',{hour:'2-digit',minute:'2-digit'});
      const r = await api('records.create',{collection:'findindex-bitacora', value:{texto,puntos:puntosTxt,fecha}, idempotency_key:`log-${Date.now()}-${Math.random().toString(36).slice(2,8)}`});
      if(r?.id) setLogs(prev=>[{id:r.id,texto,puntos:puntosTxt,fecha},...prev].slice(0,50));
    }catch{ setLogs(prev=>[{id:`local-${Date.now()}`,texto,puntos:puntosTxt,fecha:'ahora'},...prev].slice(0,50)); }
  }

  function cambiarCaso(id:string){
    setCaseId(id); setSelected(null); setCondicion(''); setResultado({tipo:null,elegido:null,mensaje:''});
    setTimer(60); setTiempoAgotado(false); setOverlay(false);
    const c=CASES.find(x=>x.id===id)!;
    setDebug([`> Caso cambiado: ${c.num} — ${c.titulo}`,`> Pista: ${c.pista}`,`> Código: ${c.codigo}`]);
  }
  function reiniciarCaso(){
    setSelected(null); setCondicion(''); setResultado({tipo:null,elegido:null,mensaje:''});
    setTimer(60); setTiempoAgotado(false);
    setDebug(['> Caso reiniciado. Vuelve a observar la fila.','> findIndex devuelve el ÍNDICE del primero que cumple.']);
  }
  function siguienteCaso(){
    const idx=CASES.findIndex(c=>c.id===caseId);
    const next=CASES[(idx+1)%CASES.length];
    cambiarCaso(next.id);
  }
  async function reiniciarTodo(){
    const nuevo={puntos:0,racha:0,resueltos:[],insignia:false,badge18:false};
    setPuntos(0); setRacha(0); setResueltos([]); setInsignia(false); setBadge18(false); setOverlay(false);
    setSelected(null); setCondicion(''); setResultado({tipo:null,elegido:null,mensaje:''});
    await guardarProgreso(nuevo);
  }

  async function senalar(){
    if(animando) return;
    if(selected===null){ setDebug(d=>[...d,'> ⚠️ Primero elige un sospechoso en la fila o un índice.']); return; }
    if(caso.id==='n18' && tiempoAgotado){ setDebug(d=>[...d,'> ⏰ El tiempo terminó. Pulsa REINICIAR CASO.']); return; }
    const elegido=selected;
    const esCorrecto = elegido===caso.respuesta;
    const cumpleElegido = cumple(caso, caso.sospechosos[elegido]);
    const condOk = condicionCorrecta(caso, condicion);
    setAnimando(true);
    const lineas:string[]=[];
    const push=(t:string)=>{ lineas.push(t); setDebug([...lineas]); };
    push(`> Ejecutando ${caso.codigo.split(' //')[0]}`);
    // Iteraciones hasta la respuesta (short-circuit)
    for(let i=0;i<=caso.respuesta;i++){
      const s=caso.sospechosos[i];
      await sleep(380);
      const ok=cumple(caso,s);
      push(`[Iteración ${i}] Evaluando a ${s.nombre}... ${evalTexto(caso,s)} → ${ok?'¡DETENIDO!':'sigue'}`);
      if(ok) break;
    }
    await sleep(350);
    let delta=0; let tipo:'correcto'|'tarde'|'malo'='malo'; let mensaje=''; let nuevaRacha=racha; let nuevaInsignia=insignia; let nuevosResueltos=[...resueltos]; let nuevosPuntos=puntos;
    const todosCumplen = caso.sospechosos.map((s,i)=>cumple(caso,s)?i:null).filter((x):x is number=>x!==null);
    const ultimo = todosCumplen[todosCumplen.length-1];

    if(esCorrecto){
      tipo='correcto'; delta=10 + (condOk?5:0);
      let extraBadge=0;
      nuevaRacha=racha+1;
      if(nuevaRacha>=3 && !insignia){ nuevaInsignia=true; extraBadge=10; delta+=10; }
      if(caso.id==='n18') delta+=10; // +20 total en Nivel 18: 10 base + 10 extra nivel (con +5 condición si aplica)
      if(caso.id==='n18') delta+=0;
      // Ajuste Nivel 18: el enunciado pide +20 al acertar. Base 10 + 10 extra ya lo da.
      mensaje = caso.id==='n18'
        ? `✅ ¡CORRECTO! Índice 14. +20 puntos. ${condOk?' +5 condición correcta (incluido en el total si aplica).':''} ${nuevaRacha>=3 && !insignia?' ¡INSIGNIA DETECTIVE DESBLOQUEADA! +10 extra.':''} 🏅 DETECTIVE NIVEL 18`
        : `✅ ¡CORRECTO! Índice ${caso.respuesta}. +10 puntos.${condOk?' +5 por la condición.':''}${extraBadge?' ¡INSIGNIA DETECTIVE DESBLOQUEADA! +10 extra.':''}`;
      if(!nuevosResueltos.includes(caso.id)) nuevosResueltos.push(caso.id);
      push(`🧠 Depurador: findIndex encontró el PRIMERO que cumple y hace SHORT-CIRCUIT. No revisa a ${caso.sospechosos.slice(caso.respuesta+1).map(s=>s.nombre).join(', ') || 'nadie más'} aunque también cumplan.`);
      push(`> Resultado: ${caso.respuesta} (no es el valor, es el ÍNDICE)`);
    } else if(cumpleElegido && elegido>caso.respuesta){
      tipo='tarde'; delta=-5; nuevaRacha=0;
      const nombreElegido=caso.sospechosos[elegido].nombre;
      mensaje = caso.id==='trampa'
        ? `❌ ${nombreElegido} TAMBIÉN tiene sombrero, pero findIndex se detiene en el PRIMERO. La respuesta era el índice 2. -5`
        : `❌ ${nombreElegido} TAMBIÉN cumple la condición, pero findIndex se detiene en el PRIMERO. La respuesta era el índice ${caso.respuesta}. -5`;
      push(`🧠 Depurador: elegiste a ${nombreElegido} (índice ${elegido}), que sí cumple, pero findIndex ya se había detenido en ${caso.sospechosos[caso.respuesta].nombre} (índice ${caso.respuesta}).`);
      push(`> Resultado correcto: ${caso.respuesta} (no es el valor, es el ÍNDICE)`);
    } else {
      tipo='malo'; delta=-3; nuevaRacha=0;
      const nombreElegido=caso.sospechosos[elegido].nombre;
      mensaje = `❌ ${nombreElegido} NO cumple la condición. -3. La respuesta era el índice ${caso.respuesta} (${caso.sospechosos[caso.respuesta].nombre}).`;
      push(`🧠 Depurador: ${nombreElegido} no cumple la condición, por eso findIndex lo saltó. El primero que sí cumple es ${caso.sospechosos[caso.respuesta].nombre}.`);
      push(`> Resultado correcto: ${caso.respuesta} (no es el valor, es el ÍNDICE)`);
    }
    push(`⚖️ vs indexOf: indexOf buscaría igualdad exacta (===), findIndex busca CONDICIÓN.`);
    push(`⚖️ vs findLastIndex: findLastIndex daría ${ultimo} (el último), findIndex da ${caso.respuesta} (el primero).`);
    if(condOk) push(`✓ Condición escrita correcta: +5 extra.`);
    else if(condicion.trim()) push(`✏️ Tu condición no coincide con la esperada. La correcta es: ${caso.codigo}`);
    else push(`✏️ Escribe la condición la próxima vez para +5 extra.`);
    if(tipo==='correcto' && nuevaRacha>=3 && !insignia) push(`🔍 ¡INSIGNIA DETECTIVE DESBLOQUEADA! Resolver 3 seguidos → +10 extra.`);
    if(tipo==='correcto' && caso.id==='n18') push(`🏅 Badge: DETECTIVE NIVEL 18 desbloqueado.`);

    nuevosPuntos = Math.max(0, puntos + delta);
    const nuevoBadge18 = badge18 || (tipo==='correcto' && caso.id==='n18');
    setPuntos(nuevosPuntos); setRacha(nuevaRacha); setInsignia(nuevaInsignia); setResueltos(nuevosResueltos); setBadge18(nuevoBadge18);
    setResultado({tipo,elegido,mensaje});
    setAnimando(false);
    const logTxt = `Caso ${caso.num} — ${caso.titulo}: elegiste ${elegido} (${caso.sospechosos[elegido].nombre}), correcto ${caso.respuesta}`;
    await guardarLog(logTxt, delta>=0?`+${delta}`:`${delta}`);
    await guardarProgreso({puntos:nuevosPuntos, racha:nuevaRacha, resueltos:nuevosResueltos, insignia:nuevaInsignia, badge18:nuevoBadge18});
    if(nuevosResueltos.length===CASES.length){ setTimeout(()=>setOverlay(true),700); }
  }

  const todosResueltos = resueltos.length===CASES.length;

  return (
    <div data-safe-area-inset-root style={{boxSizing:'border-box', paddingTop:'var(--safe-area-inset-top)', minHeight:'100vh', background:'#030508'}}>
      <div style={{maxWidth:1500, margin:'0 auto', padding:'14px 14px 30px'}}>
        {/* HEADER */}
        <header data-safe-area-sticky-top style={{top:'var(--safe-area-inset-top)', position:'sticky', zIndex:20, background:'rgba(3,5,8,.92)', backdropFilter:'blur(10px)', border:'1px solid #1b2f4d', borderRadius:16, padding:'12px 14px', display:'flex', flexWrap:'wrap', gap:10, alignItems:'center', justifyContent:'space-between'}}>
          <div>
            <div style={{fontSize:'clamp(20px,3vw,30px)', fontWeight:800, letterSpacing:'.02em', lineHeight:1}}>🕵 DETECTIVE <span style={{color:'#22d3ee'}}>//</span> CASO FINDINDEX</div>
            <div style={{color:'#8fb3d1', fontSize:13, marginTop:4}}>Señala al <b style={{color:'white'}}>PRIMERO</b> que cumple la condición. El resultado es un <b style={{color:'#22ff88'}}>índice</b>, no un valor.</div>
          </div>
          <div style={{display:'flex', flexWrap:'wrap', gap:8, alignItems:'center'}}>
            <span style={{border:'1px solid #22ff88', color:'#22ff88', borderRadius:99, padding:'6px 10px', fontSize:12, fontWeight:700}}>SIN API ✅ IA CASERA</span>
            <span style={{background:'#22d3ee', color:'#02141a', borderRadius:99, padding:'6px 12px', fontWeight:800}}>PUNTOS: {puntos}</span>
            <span style={{background:'#ffe600', color:'#1a1400', borderRadius:99, padding:'6px 12px', fontWeight:800}}>RACHA: {racha} 🔥</span>
            {insignia && <span style={{border:'1px solid #ffe600', color:'#ffe600', borderRadius:99, padding:'6px 10px', fontWeight:800}}>🔍 DETECTIVE</span>}
            {badge18 && <span style={{background:'#ff2e88', color:'white', borderRadius:99, padding:'6px 10px', fontWeight:800}}>🏅 NIVEL 18</span>}
          </div>
        </header>

        <div style={{marginTop:12, background:'#071223', border:'1px solid #1b2f4d', borderRadius:12, padding:'10px 12px', fontSize:14, color:'#cfeaff'}}>
          <b style={{color:'#22d3ee'}}>¿Qué devuelve findIndex?</b> &nbsp; La <b>posición</b> del primer elemento que cumple una condición. Si devuelve <b>2</b>, es el sospechoso en la posición 2. &nbsp; <span style={{color:'#8fb3d1'}}>{cargando?'Cargando progreso…':guardadoMsg||'Tu progreso y tu bitácora se guardan para volver después.'}</span>
        </div>

        <main className="layout" style={{marginTop:14}}>
          {/* IZQUIERDA */}
          <aside className="panel" style={{padding:14}}>
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'center'}}><span className="panel-title">📂 CASOS</span><span style={{fontSize:12, color:'#8fb3d1'}}>{resueltos.length}/{CASES.length} resueltos</span></div>
            <div style={{marginTop:10, display:'flex', flexDirection:'column', gap:8}}>
              {CASES.map(c=>(
                <button key={c.id} className={`case-btn ${c.id===caseId?'active':''}`} onClick={()=>cambiarCaso(c.id)}>
                  <span><b style={{color: c.id==='n18'?'#ff2e88':c.id==='trampa'?'#ffe600':'#22d3ee'}}>{c.id==='trampa'?'⚠️ TRAMPA':c.id==='n18'?'🔥 18':`CASO ${c.num}`}</b><br/><span style={{fontSize:13, color:'#dbeeff'}}>{c.titulo}</span><br/><span style={{fontSize:11, color:'#8fb3d1'}}>{c.tipo}</span></span>
                  <span style={{fontSize:18}}>{resueltos.includes(c.id)?'✅':'⏳'}</span>
                </button>
              ))}
            </div>
            <div style={{marginTop:14, borderTop:'1px solid #1b2f4d', paddingTop:12}}>
              <div className="panel-title">📓 BITÁCORA</div>
              <div style={{fontSize:12, color:'#8fb3d1', marginTop:4}}>Cada intento queda registrado con sus puntos.</div>
              <div style={{maxHeight:260, overflowY:'auto', marginTop:8, display:'flex', flexDirection:'column', gap:7}}>
                {logs.length===0 && <div style={{color:'#8fb3d1', fontSize:13}}>Aún no hay intentos. Tu primer caso te espera.</div>}
                {logs.map(l=>(
                  <div key={l.id} style={{background:'#050b18', border:'1px solid #1b2f4d', borderRadius:10, padding:'8px 10px', fontSize:13}}>
                    <div style={{display:'flex', justifyContent:'space-between', gap:8}}><b style={{color:'#22d3ee'}}>{l.puntos} pts</b><span style={{color:'#8fb3d1'}}>{l.fecha}</span></div>
                    <div style={{color:'#dbeeff', marginTop:2}}>{l.texto}</div>
                  </div>
                ))}
              </div>
              <button className="btn-ghost" style={{width:'100%', marginTop:10}} onClick={reiniciarTodo}>↺ Reiniciar partida y puntos</button>
            </div>
          </aside>

          {/* CENTRO */}
          <section className="panel" style={{padding:16, overflowX:'clip'}}>
            <div style={{display:'flex', justifyContent:'space-between', gap:10, flexWrap:'wrap', alignItems:'flex-start'}}>
              <div>
                <div className="panel-title">🔦 ESCENA DEL CRIMEN</div>
                <h2 style={{fontSize:'clamp(22px,3vw,30px)', margin:'8px 0 2px', lineHeight:1.1}}>CASO #{caso.num}: “{caso.titulo}”</h2>
                <p style={{color:'#8fb3d1', margin:0}}>{caso.tipo}</p>
              </div>
              {caso.id==='n18' && <div style={{textAlign:'right'}}><div style={{fontSize:28, fontWeight:800, color: timer<=10?'#ff3b5c':'#ffe600'}} className="mono">⏱ {timer}s</div><div style={{fontSize:12, color:'#8fb3d1'}}>{tiempoAgotado?'Tiempo agotado':resueltos.includes('n18')?'¡Caso 18 resuelto!':'Tienes 60 segundos'}</div></div>}
            </div>

            <div style={{marginTop:14, background:'#050b18', border:'1px solid #22d3ee55', borderRadius:14, padding:'14px 14px'}}>
              <div style={{fontSize:12, letterSpacing:'.14em', color:'#22d3ee', fontWeight:700}}>PISTA DEL CASO</div>
              <div style={{fontSize:'clamp(19px,2.6vw,26px)', fontWeight:800, marginTop:4}}>{caso.pista}</div>
              <div className="mono" style={{marginTop:8, color:'#7dffb0', fontSize:13, wordBreak:'break-word'}}>{caso.codigo}</div>
              {caso.id==='trampa' && <div style={{marginTop:8, color:'#ffe600', fontSize:13}}>⚠️ Hay 3 con sombrero. Solo el primero cuenta. No elijas al más evidente.</div>}
            </div>

            <div style={{marginTop:14, display:'flex', justifyContent:'space-between'}}><b>La fila — un array de sospechosos</b><span className="mono" style={{color:'#8fb3d1', fontSize:12}}>← desplázate →</span></div>
            <div className="suspect-row" style={{marginTop:8}}>
              {caso.sospechosos.map((s,i)=>{
                const isSel=selected===i;
                const cls = resultado.elegido===i ? (resultado.tipo==='correcto'?'correct':resultado.tipo==='tarde'?'wrong':'wrong') : (i===caso.respuesta && resultado.tipo ? 'correct':'');
                return (
                  <button key={i} className={`s-card ${isSel?'selected':''} ${cls}`} onClick={()=>{setSelected(i); setResultado({tipo:null,elegido:null,mensaje:''});}} aria-label={`Sospechoso ${i} ${s.nombre}`}>
                    <div className="mono" style={{color:'#22d3ee', fontWeight:700}}>[{i}]</div>
                    <div style={{fontSize:36, lineHeight:1.1}}>{s.sombrero?'🎩':''}👤{s.lentes?'👓':''}</div>
                    <div style={{fontWeight:800, fontSize:17}}>{s.nombre}</div>
                    <div style={{fontSize:12, color:'#8fb3d1', marginTop:4, lineHeight:1.5}}>
                      {s.sombrero?'🎩 Sombrero ':'🚫 Sin sombrero'}<br/>
                      {s.lentes?'👓 Lentes ':'— Sin lentes'}<br/>
                      Edad: {s.edad}<br/>
                      Coartada: {s.coartada?'✅':'❌'}
                    </div>
                    {isSel && <div style={{marginTop:6, color:'#22d3ee', fontWeight:800, fontSize:12}}>◉ SELECCIONADO</div>}
                  </button>
                );
              })}
            </div>

            <div style={{marginTop:10}}>
              <div style={{fontWeight:800, fontSize:18}}>¿En qué índice está el primero que cumple?</div>
              <div style={{display:'flex', flexWrap:'wrap', gap:8, marginTop:10}}>
                {caso.sospechosos.map((_,i)=>(
                  <button key={i} className={`idx-btn ${selected===i?'sel':''} ${resultado.elegido===i && resultado.tipo==='correcto'?'correct':''} ${resultado.elegido===i && resultado.tipo!=='correcto' && resultado.tipo?'wrong':''}`} onClick={()=>setSelected(i)}>{i}</button>
                ))}
              </div>
            </div>

            <div style={{marginTop:16}}>
              <label style={{fontSize:13, color:'#8fb3d1'}}>Escribe la condición para +5 extra <span style={{color:'#cfeaff'}}>(ej: s =&gt; s.sombrero)</span></label>
              <input type="text" value={condicion} onChange={e=>setCondicion(e.target.value)} placeholder="s => s.sombrero" style={{marginTop:6}} />
            </div>

            {resultado.mensaje && <div style={{marginTop:12, padding:'12px 13px', borderRadius:12, background: resultado.tipo==='correcto'?'#052e1a':'#2a0a14', border:`1px solid ${resultado.tipo==='correcto'?'#22ff88':'#ff3b5c'}`, fontWeight:600, lineHeight:1.45}}>{resultado.mensaje}</div>}

            <div style={{display:'flex', flexWrap:'wrap', gap:10, marginTop:14}}>
              <button className="btn-primary" style={{flex:'1 1 200px'}} onClick={senalar} disabled={animando || selected===null}>{animando?'🕵 EJECUTANDO…':'🔍 SEÑALAR SOSPECHOSO'}</button>
              <button className="btn-ghost" onClick={siguienteCaso}>SIGUIENTE CASO →</button>
              <button className="btn-ghost" onClick={reiniciarCaso}>↺ REINICIAR CASO</button>
            </div>
            <div style={{marginTop:10, fontSize:13, color:'#8fb3d1'}}>+10 acierto · +5 condición correcta · −5 si cumple pero no es el primero · −3 si no cumple · 3 seguidos = 🔍 +10 extra. {caso.id==='n18' && 'Nivel 18: acierto = +20.'}</div>
          </section>

          {/* DERECHA */}
          <aside className="panel" style={{padding:14}}>
            <div className="panel-title">💻 DEPURADOR INTELIGENTE: .findIndex()</div>
            <div className="mono" style={{marginTop:10, background:'#02040a', border:'1px solid #1b2f4d', borderRadius:12, padding:12, minHeight:260, fontSize:12.5}}>
              {debug.map((l,i)=>(<div key={i} className="debug-line" style={{color: l.startsWith('> Resultado')?'#22ff88':l.includes('DETENIDO')?'#22ff88':l.includes('❌')||l.includes('NO cumple')?'#ff8aa0':l.startsWith('🧠')?'#ffe600':l.startsWith('⚖️')?'#22d3ee':'#dbeeff', marginBottom:7}}>{l}</div>))}
              {animando && <div className="blink" style={{color:'#22d3ee'}}>▌ ejecutando…</div>}
            </div>

            <div style={{marginTop:12, border:'1px solid #22d3ee66', borderRadius:12, padding:12, background:'#04121f'}}>
              <div style={{fontWeight:800, letterSpacing:'.08em', fontSize:12, color:'#22d3ee'}}>⚖️ COMPARACIÓN · SIEMPRE VISIBLE</div>
              <div style={{marginTop:9, display:'flex', flexDirection:'column', gap:9, fontSize:13, lineHeight:1.45}}>
                <div><b style={{color:'#22ff88'}}>findIndex</b> → devuelve el <b>ÍNDICE</b> del <b>PRIMERO</b> que cumple una <b>CONDICIÓN</b>. Se detiene (short-circuit).</div>
                <div><b style={{color:'#8fb3d1'}}>indexOf</b> → busca <b>igualdad exacta</b> (===): “¿dónde está exactamente Marta?”.</div>
                <div><b style={{color:'#ff2e88'}}>findLastIndex</b> → devuelve el <b>ÍNDICE del ÚLTIMO</b> que cumple. Con sombreros en 2, 3 y 4 daría <b>4</b>, no 2.</div>
              </div>
            </div>
            <div className="mono" style={{marginTop:12, background:'#050b18', border:'1px solid #1b2f4d', borderRadius:12, padding:12, fontSize:12, lineHeight:1.6, color:'#cfeaff'}}>
              <div style={{color:'#22d3ee'}}>const sospechosos = [ ... ];</div>
              <div>→ findIndex devuelve <b style={{color:'#22ff88'}}>posición</b>, no valor.</div>
              <div>→ Si devuelve <b>2</b>, es el sospechoso en la posición 2.</div>
              <div>→ Es una <b>condición</b>, no una igualdad exacta.</div>
              <div>→ Es el <b>primero</b>, no el más evidente.</div>
            </div>
            <div style={{marginTop:12, fontSize:13, color:'#8fb3d1'}}>Progreso: <b style={{color:'white'}}>{resueltos.length}/{CASES.length}</b> · Racha actual: <b style={{color:'white'}}>{racha}</b> · {todosResueltos?'¡Todos los casos resueltos!':'Sigue la pista y no te dejes engañar por los que también cumplen.'}</div>
            {todosResueltos && <button className="btn-primary" style={{width:'100%', marginTop:10}} onClick={()=>setOverlay(true)}>🏆 VER CASO RESUELTO</button>}
          </aside>
        </main>

        <footer style={{marginTop:14, textAlign:'center', color:'#8fb3d1', fontSize:12}}>Detective FindIndex · El primero que cumple gana. El índice es la respuesta.</footer>
      </div>

      {overlay && (
        <div style={{position:'fixed', inset:0, background:'rgba(1,3,8,.88)', backdropFilter:'blur(6px)', zIndex:50, display:'flex', alignItems:'center', justifyContent:'center', padding:16}}>
          <div className="panel" style={{maxWidth:560, width:'100%', padding:26, textAlign:'center'}}>
            <div style={{fontSize:52}}>🏆</div>
            <h2 style={{fontSize:'clamp(24px,5vw,34px)', margin:'8px 0'}}>CASO RESUELTO — ERES DETECTIVE NIVEL FINDINDEX</h2>
            <p style={{color:'#cfeaff', lineHeight:1.6}}>Dominaste la diferencia clave: <b>findIndex</b> devuelve el <b>índice del primero</b> que cumple una <b>condición</b>. No es indexOf. No es el último. No es el valor.</p>
            <div style={{marginTop:14, fontSize:22, fontWeight:800}}>PUNTOS TOTALES: <span style={{color:'#22ff88'}}>{puntos}</span></div>
            <div style={{marginTop:6, color:'#ffe600'}}>🔍 Insignia detective {insignia?'desbloqueada':'· sigue hasta 3 seguidos'} {badge18?'· 🏅 Nivel 18':''}</div>
            <div style={{display:'flex', gap:10, justifyContent:'center', marginTop:18, flexWrap:'wrap'}}>
              <button className="btn-primary" onClick={()=>setOverlay(false)}>SEGUIR JUGANDO</button>
              <button className="btn-ghost" onClick={()=>{setOverlay(false); cambiarCaso('c1');}}>VOLVER AL CASO 1</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
