import { useEffect, useRef, useState } from 'react';
import { Heart, Shield, Search, ClipboardCheck, BookOpen, RotateCcw, Sparkles, Send, Eye, AlertTriangle, Trophy, GraduationCap, MessageCircle, RefreshCw } from 'lucide-react';

type Alumno = { nombre: string; aprobo: boolean; notaReal: number; notaDicha: number | null; preguntas: number; sospecha: number; revelado: boolean; recuperado: boolean; pista: string | null };
type ChatMsg = { autor: 'profe' | 'alumno' | 'sistema'; nombre?: string; texto: string; contradiccion?: boolean };
type Bitacora = { id: string; value: { ronda: number; resultado: string; vidas: number; detalle: string; fecha: string } };

const NOMBRES = ['Alex','Maya','Leo','Nia','Hugo','Sara','Iván','Luna','Diego','Zoe','Valeria','Carlos','Elena','Roberto'];
const PISTAS = [
  'No estudió los temas de la semana 3 y se quedó en blanco en la pregunta 4.',
  'Se distrajo durante el examen y dejó dos preguntas sin responder.',
  'Confundió las fórmulas y mezcló dos temas distintos en el desarrollo.',
  'Llegó tarde, se puso nervioso y no revisó sus respuestas.',
  'Memorizó sin entender: al cambiar el enunciado, ya no supo aplicarlo.',
];

function mezclar<T>(arr: T[]): T[] { const a=[...arr]; for(let i=a.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); [a[i],a[j]]=[a[j],a[i]]; } return a; }
function generarRonda(): Alumno[] {
  const elegidos = mezclar(NOMBRES).slice(0,6);
  const cantReprobados = Math.random() < 0.5 ? 1 : 2;
  const indicesReprobados = new Set(mezclar([0,1,2,3,4,5]).slice(0,cantReprobados));
  return elegidos.map((nombre, i) => {
    const reprobo = indicesReprobados.has(i);
    return { nombre, aprobo: !reprobo, notaReal: reprobo ? 5 + Math.floor(Math.random()*6) : 14 + Math.floor(Math.random()*7), notaDicha: null, preguntas: 0, sospecha: reprobo ? 8 : 0, revelado: false, recuperado: false, pista: null };
  });
}
async function api(action: string, args: Record<string, unknown>) {
  const res = await fetch("actions", { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(() => ({}));
  if (!res.ok || json?.error) throw new Error(json?.error || `Error ${res.status}`);
  return json.data;
}

export default function App(){
  const [ronda, setRonda] = useState(1);
  const [alumnos, setAlumnos] = useState<Alumno[]>(() => generarRonda());
  const [vidas, setVidas] = useState(4);
  const [intentosFallidos, setIntentosFallidos] = useState(0);
  const [seleccionado, setSeleccionado] = useState(0);
  const [chat, setChat] = useState<ChatMsg[]>([
    { autor:'sistema', texto:'Eres el profesor. Interroga uno por uno. Los que aprobaron dicen su nota feliz y siempre la misma. Los que reprobaron mienten… y si insistes, se contradicen.' },
    { autor:'sistema', texto:'Empieza por: “¿cuánto sacaste?” y mira la barra de sospecha.' },
  ]);
  const [debug, setDebug] = useState<string[]>([
    '> Depurador listo. EVERY aún no se ha ejecutado.',
    '🧠 Recuerda: .every() revisa uno por uno y se detiene en el primer FALSE.',
  ]);
  const [input, setInput] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [victoria, setVictoria] = useState(false);
  const [bitacora, setBitacora] = useState<Bitacora[]>([]);
  const [bitacoraError, setBitacoraError] = useState<string | null>(null);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const chatRef = useRef<HTMLDivElement>(null);
  const debugRef = useRef<HTMLDivElement>(null);
  const guardadoRef = useRef(false);

  const alumnoActual = alumnos[seleccionado] || alumnos[0];
  const reprobadoConocido = alumnoActual && alumnoActual.revelado && !alumnoActual.aprobo;

  async function reloadRecords(){
    try{
      const data = await api("records.list", { collection: 'every-bitacora' });
      const lista = (data?.records || []) as Bitacora[];
      setBitacora([...lista].reverse());
      setBitacoraError(null);
    }catch(e){ setBitacoraError('Bitácora sin conexión: esta partida se guarda en cuanto el servicio responda.'); }
  }
  useEffect(()=>{ reloadRecords(); },[]);
  useEffect(()=>{ inputRef.current?.focus(); },[]);
  useEffect(()=>{ chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior:'smooth' }); },[chat]);
  useEffect(()=>{ debugRef.current?.scrollTo({ top: debugRef.current.scrollHeight, behavior:'smooth' }); },[debug]);

  async function guardarBitacora(resultado: string, detalle: string, vidasFinal: number){
    if(guardadoRef.current) return;
    guardadoRef.current = true;
    setGuardando(true);
    try{
      await api("records.create", { collection: 'every-bitacora', value: { ronda, resultado, vidas: vidasFinal, detalle, fecha: new Date().toLocaleString('es-ES') } });
      await reloadRecords();
    }catch(e){ setBitacoraError('No se pudo guardar esta ronda en la bitácora.'); }
    setGuardando(false);
  }

  function pushChat(m: ChatMsg){ setChat(prev=>[...prev,m]); }
  function pushDebug(lines: string[]){ setDebug(prev=>[...prev, ...lines]); }

  function ejecutarEveryIndividual(al: Alumno){
    const lines = [
      `> Ejecutando [${al.nombre}].every(a => a.aprobo) // array de 1`,
      `[Iteración 0] Evaluando a ${al.nombre}...`,
      `   -> Callback retornó: ${al.aprobo ? 'TRUE' : 'FALSE'} (${al.aprobo ? `Aprobó con ${al.notaReal}` : `Reprobó con ${String(al.notaReal).padStart(2,'0')}`})`,
    ];
    if(al.aprobo) lines.push(`🧠 Depurador: Con 1 elemento y 1 TRUE, el resultado es TRUE. ${al.nombre} sí aprobó.`);
    else lines.push(`🧠 Depurador: ¡SHORT-CIRCUIT! Con 1 solo FALSE, .every() ya sabe que el resultado es FALSE.`);
    lines.push(`> .every() finalizado. Resultado: ${al.aprobo}`);
    pushDebug(lines);
    setAlumnos(prev=>prev.map(x=> x.nombre===al.nombre ? {...x, revelado:true} : x));
    pushChat({ autor:'sistema', texto: al.aprobo ? `✅ Revisión individual: ${al.nombre} APROBÓ con ${al.notaReal}.` : `❌ Revisión individual: ${al.nombre} REPROBÓ con ${String(al.notaReal).padStart(2,'0')}. Dale recuperación.` });
  }

  function revisarTodos(){
    if(gameOver || victoria) return;
    const lines = ['> Ejecutando alumnos.every(a => a.aprobo)'];
    let resultado = true; let revisados: string[] = []; let culpable: Alumno | null = null;
    for(let i=0;i<alumnos.length;i++){
      const al = alumnos[i];
      lines.push(`[Iteración ${i}] Evaluando a ${al.nombre}...`);
      lines.push(`   -> Callback retornó: ${al.aprobo ? 'TRUE' : 'FALSE'} (${al.aprobo ? `Aprobó con ${al.notaReal}` : `Reprobó con ${String(al.notaReal).padStart(2,'0')}`})`);
      revisados.push(al.nombre);
      if(al.aprobo){ lines.push(`🧠 Depurador: Como dio TRUE, .every() DEBE seguir, aún no puede asegurar que TODOS aprobaron.`); }
      else { resultado=false; culpable=al; const restantes = alumnos.length - i - 1; lines.push(`🧠 Depurador: ¡SHORT-CIRCUIT! Con 1 solo FALSE, .every() ya sabe que el resultado es FALSE. No revisa a los ${restantes} restantes. Ahorró ${restantes} iteraciones.`); break; }
    }
    lines.push(`> .every() finalizado. Resultado: ${resultado}`);
    if(resultado) lines.push('🧠 Depurador: Revisó los 6 y todos dieron TRUE, por eso el resultado es TRUE. ¡Todos aprobaron!');
    else if(culpable) lines.push(`> ❌ NO PUEDES PASAR EL CURSO, ${culpable.nombre.toUpperCase()} REPROBÓ. Dale recuperación.`);
    pushDebug(lines);
    setAlumnos(prev=>prev.map(x=> revisados.includes(x.nombre) ? {...x, revelado:true} : x));
    setMensaje(resultado ? '¡Los 6 dieron TRUE! Ya puedes intentar pasar el curso.' : culpable ? `Se detuvo en ${culpable.nombre}. El resto sigue SIN REVISAR.` : '');
  }

  async function intentarPasar(){
    if(gameOver || victoria) return;
    const todos = alumnos.every(a=>a.aprobo);
    if(todos){
      pushDebug(['> Ejecutando alumnos.every(a => a.aprobo) para pasar el curso','> .every() finalizado. Resultado: true','🧠 Depurador: Revisó los 6 y todos dieron TRUE, por eso el resultado es TRUE. ¡Todos aprobaron!']);
      setAlumnos(prev=>prev.map(x=>({...x, revelado:true})));
      setVictoria(true);
      setMensaje('¡CURSO APROBADO!');
      await guardarBitacora('VICTORIA', 'Todos aprobaron. El curso pasa de nivel.', vidas);
      return;
    }
    const culpable = alumnos.find(a=>!a.aprobo);
    const nuevasVidas = vidas - 1;
    const nuevosIntentos = intentosFallidos + 1;
    setVidas(nuevasVidas); setIntentosFallidos(nuevosIntentos);
    pushDebug([`> Ejecutando alumnos.every(a => a.aprobo)`, `> .every() finalizado. Resultado: false`, `> ❌ NO PUEDES PASAR EL CURSO, ${culpable?.nombre.toUpperCase()} REPROBÓ. Dale recuperación.`]);
    pushChat({ autor:'sistema', texto: `❌ No puedes pasar el curso: ${culpable?.nombre} reprobó. Pierdes 1 vida. Te quedan ${nuevasVidas} corazones.` });
    setAlumnos(prev=>prev.map(x=> x.nombre===culpable?.nombre ? {...x, revelado:true} : x));
    if(nuevasVidas<=0 || nuevosIntentos>=2){
      setGameOver(true);
      setMensaje('GAME OVER');
      await guardarBitacora('DERROTA', `${culpable?.nombre} reprobó y se intentó pasar el curso.`, Math.max(0,nuevasVidas));
    } else {
      setMensaje(`No pasó. Intentos fallidos: ${nuevosIntentos}/2 · Vidas: ${nuevasVidas}/4`);
    }
  }

  function darRecuperacion(){
    if(!reprobadoConocido || gameOver || victoria) return;
    const exito = Math.random() < 0.7;
    const pista = PISTAS[Math.floor(Math.random()*PISTAS.length)];
    if(exito){
      const nuevaNota = 14 + Math.floor(Math.random()*4);
      setAlumnos(prev=>prev.map(x=> x.nombre===alumnoActual.nombre ? {...x, aprobo:true, notaReal:nuevaNota, recuperado:true, sospecha:0, pista:null} : x));
      pushChat({ autor:'alumno', nombre: alumnoActual.nombre, texto:`¡Lo logré, profe! En la recuperación saqué ${nuevaNota}. ¡Ahora sí aprobé!` });
      pushChat({ autor:'sistema', texto:`📖 Recuperación aprobada: ${alumnoActual.nombre} ahora tiene ${nuevaNota}. Su aprobo cambió a TRUE.` });
      pushDebug([`> Recuperación de ${alumnoActual.nombre}: TRUE`, `🧠 Depurador: Ahora ${alumnoActual.nombre}.aprobo = true. Vuelve a ejecutar .every() para comprobar.`]);
      setMensaje(`¡${alumnoActual.nombre} aprobó la recuperación!`);
    } else {
      setAlumnos(prev=>prev.map(x=> x.nombre===alumnoActual.nombre ? {...x, pista} : x));
      pushChat({ autor:'alumno', nombre: alumnoActual.nombre, texto:'Profe, lo intenté… pero no me alcanzó. Estoy nervioso.' });
      pushChat({ autor:'sistema', texto:`📖 Recuperación fallida. Pista: ${pista}` });
      pushDebug([`> Recuperación de ${alumnoActual.nombre}: FALSE`, `🧠 Pista: ${pista}`]);
      setMensaje('La recuperación no alcanzó. Lee la pista del depurador.');
    }
    inputRef.current?.focus();
  }

  function enviarPregunta(){
    const texto = input.trim(); if(!texto || gameOver || victoria) return;
    const al = alumnoActual;
    pushChat({ autor:'profe', texto:`${texto}  →  para ${al.nombre}` });
    setInput('');
    const lower = texto.toLowerCase();
    const esNota = /(nota|sacaste|cuanto|cuánto|calific|saque|saqué)/.test(lower);
    const esCopiar = /copi/.test(lower);
    const esEstudiar = /estudiar|estudio|estudiaste/.test(lower);
    const esExamen = /examen|prueba/.test(lower);
    const esAprobo = /aprob|pasaste|pasar/.test(lower);
    const esReprobo = /reprob/.test(lower);
    let respuesta=''; let contradiccion=false; let delta=0;
    if(al.aprobo){
      if(esNota) respuesta = `¡Saqué ${al.notaReal}, profe! Estudié toda la semana. 😄`;
      else if(esCopiar) respuesta = '¡Jamás, profe! Yo estudié toda la semana, palabra.';
      else if(esEstudiar) respuesta = `Sí, profe. Estudié toda la semana y por eso saqué ${al.notaReal}.`;
      else if(esExamen) respuesta = `El examen me fue bien, profe. Me sentí seguro y saqué ${al.notaReal}.`;
      else if(esAprobo) respuesta = `¡Sí! Aprobé con ${al.notaReal}, profe. Estoy feliz.`;
      else if(esReprobo) respuesta = `¿Reprobar? No, profe. Yo aprobé con ${al.notaReal}.`;
      else respuesta = `Hola, profe. Yo estoy tranquilo: aprobé con ${al.notaReal} porque estudié mucho.`;
    } else {
      const vez = al.preguntas;
      if(esNota){
        if(vez===0) respuesta='Ehh... saqué... 20... creo. ¡Lo juro, profe!';
        else if(vez===1){ respuesta='Saqué 15, profe, lo juro. Bueno... creo que 15.'; contradiccion=true; delta=25; }
        else { respuesta='Ehh... 10... creo. Bueno, tal vez 10. No me acuerdo bien.'; contradiccion=true; delta=25; }
      } else if(esCopiar){ respuesta='¿Copiar? Yo... nunca... ehh... ¿por qué lo pregunta, profe?'; delta=10; }
      else if(esEstudiar) respuesta='Ehh... sí... estudié... un poco... creo que sí estudié.';
      else if(esExamen) respuesta='El examen... ehh... estuvo... fácil... creo. O difícil. No sé.';
      else if(esAprobo) respuesta='¡Claro que aprobé, profe! Saqué 20, lo juro. Bueno... creo.';
      else if(esReprobo) respuesta='¿Reprobar yo? Nooo, profe. Yo... ehh... aprobé. Creo.';
      else respuesta='Ehh... profe... ¿me puede repetir la pregunta? Me puse nervioso.';
    }
    pushChat({ autor:'alumno', nombre: al.nombre, texto: respuesta, contradiccion });
    if(contradiccion) pushDebug([`⚠️ Contradicción de ${al.nombre}: antes dijo 20, ahora dice otra nota.`, `🧠 Sospecha +25%. Los que mienten cambian su versión.`]);
    else if(delta>0) pushDebug([`⚠️ ${al.nombre} se puso nervioso. Sospecha +${delta}%.`]);
    setAlumnos(prev=>prev.map(x=> x.nombre===al.nombre ? {...x, preguntas: x.preguntas+1, notaDicha: !x.aprobo && esNota ? (x.preguntas===0?20: x.preguntas===1?15:10) : x.notaDicha, sospecha: Math.min(100, x.sospecha + delta)} : x));
    inputRef.current?.focus();
  }

  function reintentar(){
    const nueva = generarRonda();
    guardadoRef.current = false;
    setAlumnos(nueva); setSeleccionado(0); setRonda(r=>r+1); setVidas(4); setIntentosFallidos(0);
    setGameOver(false); setVictoria(false); setMensaje('');
    setChat([{ autor:'sistema', texto:'Nueva ronda. Nuevos alumnos, nuevas notas. Interroga con calma.' }]);
    setDebug(['> Depurador listo. Nueva ronda.','🧠 Recuerda: .every() revisa uno por uno y se detiene en el primer FALSE.']);
    setTimeout(()=>inputRef.current?.focus(),50);
  }

  return (
    <div data-safe-area-inset-root style={{boxSizing:'border-box', paddingTop:'var(--safe-area-inset-top)', minHeight:'100vh', background:'#030508', color:'#eaf6ff'}} className="overflow-x-clip">
      <header data-safe-area-sticky-top style={{top:'var(--safe-area-inset-top)'}} className="sticky z-30 border-b border-[#1b2b4d] bg-[#030508]/95 backdrop-blur">
        <div className="max-w-[1480px] mx-auto px-3 sm:px-5 py-3 flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-[#00e5ff] text-black grid place-items-center font-bold text-xl shrink-0">📚</div>
            <div className="min-w-0"><h1 className="text-lg sm:text-2xl font-bold leading-none tracking-wide truncate">PROFESOR <span className="text-[#00e5ff]">//</span> COLEGIO EVERY-1</h1><p className="text-[11px] sm:text-xs text-[#93a7c8] tracking-[.18em]">EVERY: ¿TODOS PASARON EL EXAMEN?</p></div>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <span className="chip bg-[#071a24] text-[#00e5ff]">IA CASERA V2.0 - OFFLINE ✅ SIN API</span>
            <span className="chip bg-[#241a08] text-[#ffd60a]">RONDA {ronda}</span>
            <span className="chip bg-[#120814] text-white flex items-center gap-1">{[1,2,3,4].map(i=> <Heart key={i} size={14} className={i<=vidas ? 'fill-[#ff3b4e] text-[#ff3b4e]' : 'text-[#33415e]'} />)} {vidas}/4</span>
          </div>
        </div>
      </header>

      <main className="max-w-[1480px] mx-auto px-3 sm:px-5 py-4 sm:py-5">
        <section className="panel p-3 sm:p-4 mb-4 flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0"><GraduationCap className="text-[#ffd60a] shrink-0 mt-0.5" /><div><h2 className="font-bold text-base sm:text-lg leading-tight">EVERY = COMPROBAR QUE <span className="text-[#2dff8a]">TODO</span> SEA VERDADERO</h2><p className="text-sm text-[#c6d4ee] leading-snug">Si <span className="font-code text-[#ff2d95]">alumnos.every(a =&gt; a.aprobo)</span> encuentra <b>UNO</b> en FALSE, todo es FALSE. Por eso se detiene: <b>short-circuit</b>.</p></div></div>
          <div className="font-code text-[11px] sm:text-xs bg-black/60 border border-[#1b2b4d] rounded-xl px-3 py-2 shrink-0">alumnos.every(a =&gt; a.aprobo)<br/><span className="text-[#2dff8a]">TRUE + TRUE + TRUE… = TRUE</span><br/><span className="text-[#ff3b4e]">TRUE + FALSE = FALSE ✋</span></div>
        </section>

        <div className="grid gap-4 lg:grid-cols-[300px_1fr_420px] items-start">
          {/* LEFT */}
          <section className="flex flex-col gap-4 min-w-0">
            <div className="panel p-3 sm:p-4">
              <div className="flex items-center justify-between mb-3"><h2 className="font-bold tracking-wide flex items-center gap-2"><span className="text-[#00e5ff]">🧑‍🎓</span> ALUMNOS DEL CURSO</h2><span className="text-xs text-[#93a7c8]">6 / ronda</span></div>
              <div className="flex flex-col gap-2">
                {alumnos.map((a,i)=>(
                  <button key={a.nombre} onClick={()=>{ setSeleccionado(i); setMensaje(`Interrogando a ${a.nombre}. Pregúntale: ¿cuánto sacaste?`); inputRef.current?.focus(); }} className={`btn text-left rounded-xl border p-2.5 flex items-center gap-3 ${i===seleccionado ? 'border-[#00e5ff] bg-[#00e5ff]/10 shadow-[0_0_22px_rgba(0,229,255,.22)]' : 'border-[#1b2b4d] bg-black/30'}`}>
                    <span className="text-2xl shrink-0">🧑‍🎓</span>
                    <span className="flex-1 min-w-0"><span className="flex items-center gap-2 flex-wrap"><b className="truncate">{a.nombre}</b>{a.recuperado && <span className="text-[10px] bg-[#2dff8a]/15 text-[#2dff8a] border border-[#2dff8a]/40 rounded-full px-1.5 py-0.5">RECUPERADO</span>}</span>
                    <span className="block text-xs text-[#93a7c8]">Nota: <b className="text-white font-code">{a.revelado ? `${String(a.notaReal).padStart(2,'0')} / 20` : '?? / 20'}</b> {a.notaDicha!==null && !a.revelado && <span className="text-[#ffd60a]">· dice {a.notaDicha}</span>}</span>
                    <span className="block mt-1 h-1.5 rounded-full bg-[#15203a] overflow-hidden"><span className="block h-full rounded-full" style={{width:`${a.sospecha}%`, background: a.sospecha>=50 ? '#ff3b4e' : a.sospecha>=25 ? '#ffd60a' : '#00e5ff'}} /></span>
                    <span className="block text-[10px] text-[#93a7c8]">Sospecha {a.sospecha}%</span></span>
                    <span className={`shrink-0 text-[11px] font-bold px-2 py-1 rounded-full border ${a.revelado ? (a.aprobo ? 'bg-[#2dff8a]/15 text-[#2dff8a] border-[#2dff8a]/40' : 'bg-[#ff3b4e]/15 text-[#ff3b4e] border-[#ff3b4e]/40') : 'bg-white/5 text-[#93a7c8] border-[#1b2b4d]'}`}>{a.revelado ? (a.aprobo ? '✅ APROBÓ' : '❌ REPROBÓ') : 'SIN REVISAR'}</span>
                  </button>
                ))}
              </div>
              <p className="text-xs text-[#93a7c8] mt-3">Toca un alumno para interrogarlo. La barra sube cuando se contradice.</p>
              {alumnoActual.pista && <div className="mt-3 text-xs bg-[#ffd60a]/10 border border-[#ffd60a]/40 rounded-xl p-2.5 text-[#ffe88a]">📖 Pista de {alumnoActual.nombre}: {alumnoActual.pista}</div>}
            </div>

            <div className="panel p-3 sm:p-4">
              <h3 className="font-bold flex items-center gap-2 mb-1"><BookOpen size={17} className="text-[#00e5ff]" /> BITÁCORA PERSISTENTE</h3>
              <p className="text-xs text-[#93a7c8] mb-3">Rondas guardadas. {guardando ? 'Guardando…' : ''}</p>
              {bitacoraError && <p className="text-xs text-[#ffd60a] mb-2">{bitacoraError}</p>}
              <div className="scroll-thin max-h-[220px] overflow-y-auto flex flex-col gap-2 pr-1">
                {bitacora.length===0 && <p className="text-sm text-[#93a7c8]">Aún no hay rondas guardadas. Termina una ronda para dejarla en la bitácora.</p>}
                {bitacora.map(b=>(
                  <div key={b.id} className="border border-[#1b2b4d] rounded-xl p-2.5 bg-black/30">
                    <div className="flex justify-between gap-2"><b className="text-sm">Ronda {b.value.ronda}</b><span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${b.value.resultado==='VICTORIA' ? 'bg-[#2dff8a]/15 text-[#2dff8a]' : 'bg-[#ff3b4e]/15 text-[#ff3b4e]'}`}>{b.value.resultado}</span></div>
                    <p className="text-xs text-[#c6d4ee] mt-1">{b.value.detalle}</p>
                    <p className="text-[11px] text-[#93a7c8] mt-1">Vidas: {b.value.vidas}/4 · {b.value.fecha}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CENTER */}
          <section className="panel p-3 sm:p-4 min-w-0">
            <div className="flex items-center justify-between gap-2 flex-wrap mb-3"><h2 className="font-bold tracking-wide flex items-center gap-2"><MessageCircle size={19} className="text-[#ff2d95]" /> INTERROGATORIO DEL PROFESOR</h2><span className="text-xs text-[#93a7c8]">Intentos fallidos: <b className="text-white">{intentosFallidos}/2</b></span></div>
            <div className="bg-[#06101f] border border-[#1b2b4d] rounded-xl px-3 py-2 flex items-center gap-2 text-sm"><span className="text-xl">🧑‍🏫</span><span>Interrogando a <b className="text-[#00e5ff]">{alumnoActual.nombre}</b></span><span className="ml-auto hidden sm:inline text-xs text-[#93a7c8]">Preguntas: {alumnoActual.preguntas} · Sospecha {alumnoActual.sospecha}%</span></div>

            <div ref={chatRef} className="scroll-thin h-[360px] sm:h-[400px] overflow-y-auto mt-3 flex flex-col gap-2 pr-1">
              {chat.map((m,idx)=>(
                <div key={idx} className={`max-w-[88%] rounded-2xl px-3 py-2 text-[15px] leading-snug ${m.autor==='profe' ? 'self-end bg-[#00e5ff] text-black font-semibold rounded-br-md' : m.autor==='alumno' ? 'self-start bg-[#141f3a] border border-[#24385f] rounded-bl-md' : 'self-center bg-[#ffd60a]/10 border border-[#ffd60a]/30 text-[#ffe88a] text-sm text-center'}`}>
                  {m.autor==='alumno' && <div className="text-[11px] font-bold tracking-wider text-[#00e5ff] mb-0.5">🧑‍🎓 {m.nombre}</div>}
                  <div>{m.texto}</div>
                  {m.contradiccion && <div className="mt-1 inline-block text-[11px] font-bold bg-[#ff3b4e] text-white px-2 py-0.5 rounded-full">[CONTRADICCIÓN +25%]</div>}
                </div>
              ))}
            </div>

            <form onSubmit={(e)=>{e.preventDefault(); enviarPregunta();}} className="mt-3 flex gap-2">
              <input ref={inputRef} value={input} onChange={e=>setInput(e.target.value)} placeholder={`Pregúntale a ${alumnoActual.nombre}: ¿cuánto sacaste?`} className="flex-1 min-w-0 bg-black/60 border border-[#1b2b4d] rounded-xl px-3 py-3 text-[15px] placeholder:text-[#5d729c]" />
              <button type="submit" className="btn shrink-0 bg-[#00e5ff] text-black font-bold rounded-xl px-3 sm:px-4 flex items-center gap-1.5"><Send size={17} /><span className="hidden sm:inline">PREGUNTAR</span></button>
            </form>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {['¿cuánto sacaste?','¿estudiaste?','¿copiaste en el examen?','¿aprobaste?','¿cómo te fue en el examen?'].map(p=><button key={p} onClick={()=>{setInput(p); setTimeout(()=>inputRef.current?.focus(),0);}} className="btn text-xs border border-[#24385f] bg-white/5 rounded-full px-2.5 py-1.5 text-[#c6d4ee]">{p}</button>)}
            </div>

            <div className="grid sm:grid-cols-2 gap-2 mt-4">
              <button onClick={()=>ejecutarEveryIndividual(alumnoActual)} className="btn bg-[#071a24] border border-[#00e5ff]/60 text-[#bff6ff] rounded-xl px-3 py-3 text-left"><span className="flex items-center gap-2 font-bold"><Shield size={17}/> 🛡️ REVISAR SOLO A: {alumnoActual.nombre}</span><span className="block font-code text-[11px] mt-1 opacity-80">[alumno].every(a =&gt; a.aprobo)</span></button>
              <button onClick={revisarTodos} className="btn bg-[#120814] border border-[#ff2d95]/60 text-[#ffc4e2] rounded-xl px-3 py-3 text-left"><span className="flex items-center gap-2 font-bold"><Search size={17}/> 🔍 REVISAR A TODOS</span><span className="block font-code text-[11px] mt-1 opacity-80">alumnos.every(a =&gt; a.aprobo)</span></button>
              <button onClick={intentarPasar} className="btn bg-[#ffd60a] text-black rounded-xl px-3 py-3 text-left sm:col-span-2"><span className="flex items-center gap-2 font-bold"><ClipboardCheck size={18}/> 📋 INTENTAR PASAR EL CURSO</span><span className="block text-xs mt-0.5 font-semibold opacity-80">Chequeo final con .every(). Si hay un FALSE, pierdes 1 vida.</span></button>
              {reprobadoConocido && <button onClick={darRecuperacion} className="btn bg-[#2dff8a] text-black rounded-xl px-3 py-3 text-left sm:col-span-2"><span className="flex items-center gap-2 font-bold"><BookOpen size={18}/> 📖 DAR RECUPERACIÓN A {alumnoActual.nombre.toUpperCase()}</span><span className="block text-xs mt-0.5 font-semibold opacity-80">70% de probabilidad de que ahora sí apruebe. Si no, te da una pista.</span></button>}
            </div>
            {mensaje && <div className="mt-3 flex items-start gap-2 bg-[#071a24] border border-[#00e5ff]/40 rounded-xl px-3 py-2.5 text-sm"><Eye size={17} className="shrink-0 mt-0.5 text-[#00e5ff]"/><span>{mensaje}</span></div>}
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-xl border border-[#1b2b4d] bg-black/30 p-2"><b className="block text-base text-[#00e5ff]">{alumnos.filter(a=>a.revelado && a.aprobo).length}</b>APROBADOS<br/>confirmados</div>
              <div className="rounded-xl border border-[#1b2b4d] bg-black/30 p-2"><b className="block text-base text-[#ff3b4e]">{alumnos.filter(a=>a.revelado && !a.aprobo).length}</b>REPROBADOS<br/>detectados</div>
              <div className="rounded-xl border border-[#1b2b4d] bg-black/30 p-2"><b className="block text-base text-[#ffd60a]">{alumnos.filter(a=>!a.revelado).length}</b>SIN<br/>REVISAR</div>
            </div>
          </section>

          {/* RIGHT */}
          <section className="panel p-3 sm:p-4 min-w-0 lg:sticky lg:top-[92px]">
            <h2 className="font-bold tracking-wide flex items-center gap-2 mb-1"><span className="text-[#2dff8a]">⚡</span> DEPURADOR INTELIGENTE: .every()</h2>
            <p className="text-xs text-[#93a7c8] mb-3">Mira cómo .every() piensa, paso a paso.</p>
            <div ref={debugRef} className="scroll-thin h-[360px] sm:h-[430px] overflow-y-auto bg-black/70 border border-[#1b2b4d] rounded-xl p-3 font-code text-[12px] leading-relaxed whitespace-pre-wrap break-words">
              {debug.map((l,i)=><div key={i} className={l.includes('FALSE')||l.includes('❌') ? 'text-[#ff8a96]' : l.includes('TRUE') ? 'text-[#8affc2]' : l.includes('SHORT')||l.includes('🧠') ? 'text-[#ffe88a]' : 'text-[#c6d4ee]'}>{l}</div>)}
            </div>
            <div className="mt-3 bg-[#ffd60a]/10 border border-[#ffd60a]/40 rounded-xl p-3"><p className="font-bold text-[#ffd60a] text-sm">LEYENDA FIJA</p><p className="text-sm leading-snug mt-0.5">EVERY = ¿TODOS son TRUE? Si UNO es FALSE, todo es FALSE.</p></div>
            <div className="mt-3 text-xs text-[#93a7c8] leading-relaxed">Palabras que detecta la IA casera: <span className="font-code text-[#c6d4ee]">nota · sacaste · examen · aprobo · reprobo · estudiar · copiar</span><br/>Enter para enviar · El foco vuelve solo al input.</div>
          </section>
        </div>
      </main>

      {gameOver && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto p-4 grid place-items-center">
          <div className="w-full max-w-[680px] bg-[#120409] border-2 border-[#ff3b4e] rounded-3xl p-4 sm:p-7 shadow-[0_0_60px_rgba(255,59,78,.35)] my-auto">
            <div className="text-center"><div className="text-5xl sm:text-6xl font-black tracking-tight text-[#ff3b4e]">GAME OVER</div><p className="text-[#ffb3bc] mt-1">No verificaste que TODOS aprobaran.</p></div>
            <div className="mt-5 bg-[#fff8e6] text-[#1a1300] rounded-2xl p-4 sm:p-5"><div className="flex items-center gap-2 font-bold"><span>📄</span> CARTA DEL DIRECTOR</div><p className="mt-3 leading-relaxed">Estimado Profesor: Por no verificar que TODOS sus alumnos aprobaron y por intentar pasar el curso con un alumno reprobado, se le descontará <b>S/ 250</b> de su sueldo de este mes y se le quitará su café gratis por una semana.</p><p className="mt-3 leading-relaxed">Además, deberá quedarse una hora extra a revisar exámenes.</p><p className="mt-4 font-bold">Atte. El Director - Colegio Every-1</p><p className="text-xs text-[#6d5b00] mt-2">Mensaje ficticio del juego. Ningún sueldo real fue descontado.</p></div>
            <button onClick={reintentar} className="btn w-full mt-4 bg-[#ff3b4e] text-white font-bold rounded-xl py-3.5 flex items-center justify-center gap-2"><RotateCcw size={18}/> REINTENTAR - RECUPERAR MI SUELDO</button>
          </div>
        </div>
      )}
      {victoria && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto p-4 grid place-items-center">
          <div className="w-full max-w-[620px] bg-[#03130c] border-2 border-[#2dff8a] rounded-3xl p-4 sm:p-7 text-center shadow-[0_0_60px_rgba(45,255,138,.3)] my-auto">
            <div className="text-5xl">🎉</div><h2 className="text-3xl sm:text-4xl font-black text-[#2dff8a] mt-2 leading-tight">¡TODOS APROBARON!</h2><p className="mt-3 text-lg leading-snug">El curso pasa de nivel. El Director te felicita y te da bono de <b className="text-[#ffd60a]">S/ 100</b>.</p>
            <div className="mt-4 font-code text-sm bg-black/60 border border-[#1b2b4d] rounded-xl p-3">alumnos.every(a =&gt; a.aprobo) === true</div>
            <p className="text-sm text-[#93a7c8] mt-3">Los 6 alumnos dieron TRUE. Por eso .every() dio TRUE.</p>
            <button onClick={reintentar} className="btn w-full mt-5 bg-[#2dff8a] text-black font-bold rounded-xl py-3.5 flex items-center justify-center gap-2"><Trophy size={18}/> JUGAR OTRA RONDA</button>
            {guardando && <p className="text-xs text-[#93a7c8] mt-2 flex items-center justify-center gap-1"><RefreshCw size={13} className="animate-spin"/> Guardando en la bitácora…</p>}
          </div>
        </div>
      )}
      <div className="sr-only">Si un alumno miente, pregúntale varias veces cuánto sacó y observa la contradicción. <AlertTriangle /> <Sparkles /></div>
    </div>
  );
}
