import React, { useCallback, useEffect, useRef, useState } from "react";
import { Activity, Brain, Heart, Radio, ShieldAlert, RotateCcw, ScanLine, Users } from "lucide-react";

type Role = "user" | "assistant";
type Estado = "pendiente" | "sano" | "zombi";
type ChatMsg = { id: number; tipo: "doctor" | "patient" | "system"; texto: string };
type DebugLine = { id: number; texto: string; kind: "call" | "eval" | "true" | "false" | "short" | "result" | "skip" };
type Paciente = {
  id: number; nombre: string; isZombie: boolean; historial: { role: Role; content: string }[];
  sospecha: number; estado: Estado; mensajes: number;
};
type Session = { id: string; value: { resultado: string; vidas: number; ronda: number; detalle: string; fecha: string } };

const NOMBRES = ["Carlos","Elena","Roberto","Sofía","Miguel","Lucía","Javier","Carmen","Andrés","Valeria"];
const sleep = (ms:number)=>new Promise(r=>setTimeout(r,ms));
let uid = 1;
const nextId = ()=>uid++;

function normalizar(t:string){
  return t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"").replace(/[^a-z0-9 ]/g," ").replace(/\s+/g," ").trim();
}
function pick<T>(arr:T[]){ return arr[Math.floor(Math.random()*arr.length)]; }
function num(a:number,b:number){ return Math.floor(a+Math.random()*(b-a+1)); }

function generarRespuestaCasera(p:Paciente, texto:string){
  const t = normalizar(texto);
  const tiene = (...words:string[])=>words.some(w=>t.includes(w));
  const es = (re:RegExp)=>re.test(t);
  const sano = !p.isZombie;

  if(sano){
    if(es(/^(hola|buenas|hey|que tal|saludos)/) || tiene("hola","buenas")) return pick([
      "Hola, doctor. Gracias por hablar conmigo, aquí dentro todo da un poco de miedo.",
      "Hola. ¿Ya puedo salir? Prometo que estoy bien, solo estoy asustado.",
      "Buenas, doctor. Me alegra que alguien por fin me escuche."
    ]);
    if(tiene("quien eres","como te llamas","tu nombre")) return pick([
      `Me llamo ${p.nombre}. Trabajo aquí cerca y vine porque me sentía mal.`,
      `Soy ${p.nombre}. No entiendo por qué me tienen en cuarentena.`,
      `Me llamo ${p.nombre}, doctor. ¿Puede decirle a mi familia que estoy bien?`
    ]);
    if(tiene("como estas","como te sientes","te sientes","que sientes")) return pick([
      "Asustado, pero creo que estoy bien. Solo tengo un poco de fiebre por los nervios.",
      "Nervioso. Me duele un poco la cabeza, pero creo que es por no dormir.",
      "Me siento cansado y asustado, pero lúcido. ¿Eso es buena señal, verdad?"
    ]);
    if(tiene("hambre","comer","comida")) return pick([
      "Un poco, no he comido desde ayer. ¿Me traen algo?",
      "Sí, tengo hambre. Un caldo caliente me vendría muy bien.",
      "Algo de hambre, sí. No he probado bocado desde que llegué."
    ]);
    if(tiene("cerebro","cerebros")) return "¿Cerebros? No, doctor, yo pienso con normalidad. Solo me duele un poco la cabeza.";
    if(tiene("carne")) return "No, gracias. Hoy prefiero algo ligero, como sopa o pan.";
    if(tiene("dolor","duele","dolor")) return pick([
      "Me duele un poco la cabeza y los hombros, pero nada grave.",
      "Un dolor leve, como cuando uno no duerme bien.",
      "Me molesta un poco el cuello. ¿Será por el colchón?"
    ]);
    if(tiene("fiebre","temperatura","calentura")) return "Creo que tengo un poco de fiebre, pero seguro es por los nervios. ¿Me puede tomar la temperatura otra vez?";
    if(tiene("hospital","cuarentena","aqui","lugar")) return pick([
      "Este hospital me pone nervioso. ¿Cuánto tiempo más me quedo aquí?",
      "No entiendo por qué hay tanta seguridad. ¿Pasó algo grave afuera?",
      "Quiero irme a casa. ¿Cuándo me dan el alta?"
    ]);
    if(tiene("ayuda","ayudame","socorro")) return "Por favor, ayúdeme a salir de aquí. Le prometo que estoy bien, solo estoy asustado.";
    if(tiene("donde","estoy")) return "Estoy en una habitación fría, con una luz muy blanca. ¿Esto es cuarentena?";
    if(tiene("familia","mama","papa","hijos","esposa","esposo","hermano")) return "Echo mucho de menos a mi familia. ¿Les puede decir que estoy bien?";
    if(tiene("xd","jaja","risa")) return "Ja, ja… perdone, doctor. Con tanto miedo, hasta reírme me calma un poco.";
    if(tiene("miedo","asustado","nervios")) return "Sí, tengo miedo. Pero hablar con usted me tranquiliza un poco.";
    if(tiene("zombi","zombie","infectado","virus","some")) return "¿Zombi? No, doctor, yo no soy eso. Solo estoy asustado y quiero irme a casa.";
    if(tiene("gracias")) return "Gracias a usted por escucharme, doctor. De verdad lo necesitaba.";
    if(tiene("adios","chao","hasta luego")) return "Hasta luego, doctor. Ojalá la próxima vez sea para darme el alta.";
    return pick([
      "Entiendo, doctor. ¿Me puede explicar qué está pasando en el hospital?",
      "No estoy seguro, pero creo que estoy bien. Solo estoy muy cansado.",
      "¿Puedo tomar agua? Me siento un poco mareado por los nervios.",
      "Perdone, estoy un poco confundido. ¿Me repite la pregunta?"
    ]);
  }

  // ZOMBI: se delata con probabilidad creciente
  const probDelata = Math.min(0.85, 0.42 + p.mensajes * 0.09);
  const seDelata = Math.random() < probDelata;
  const slip = (base:string, delata:string, sospecha:number)=>({ texto: seDelata ? delata : base, sospecha: seDelata ? sospecha : 0 });

  if(es(/^(hola|buenas|hey|que tal)/) || tiene("hola","buenas")){
    const r = slip("Hola... doctor... yo... bien... creo.", "Holaaa... grrr... huelo... digo, veo... a un doctor amable, argh.", 20);
    return r;
  }
  if(tiene("quien eres","como te llamas","tu nombre")){
    const r = slip(`Me llamo... ${p.nombre}... creo... sí, ${p.nombre}.`, `Me llamo... ${p.nombre}... o me llamaba... grrr... ya no me acuerdo bien.`, 22);
    return r;
  }
  if(tiene("como estas","como te sientes","te sientes")){
    const r = slip("Bien... un poco cansado... nada más.", "Me siento... con hambre... de... dormir... sí, de dormir, grrr.", 20);
    return r;
  }
  if(tiene("hambre","comer","comida")){
    const r = slip("Un poco... de hambre... normal.", "MUCHA hambre... de... ensalada... digo, de CEREBROS... digo, de comida normal, grrr.", 25);
    return r;
  }
  if(tiene("cerebro","cerebros")){
    const r = slip("¿Cerebros? No... ¿por qué dice eso?", "Cerebros... digo, cereales... me encantan los cereales... crujientes... grrr.", 25);
    return r;
  }
  if(tiene("carne")){
    const r = slip("Carne... no sé... quizá.", "Carne... cruda... digo, cocida... muy cocida... o cruda, grrr, da igual.", 24);
    return r;
  }
  if(tiene("dolor","duele")){
    const r = slip("Me duele... un poco... todo.", "Se me cae un brazo... digo, se me duerme un brazo... se me cae, grrr.", 22);
    return r;
  }
  if(tiene("fiebre","temperatura")) {
    const r = slip("Frío... tengo frío...", "No tengo fiebre... estoy frío... muy frío... como... muerto, grrr.", 20);
    return r;
  }
  if(tiene("hospital","cuarentena","aqui")) {
    const r = slip("Este lugar... huele... raro...", "Este hospital huele... a gente viva... digo, a limpio... grrr, a limpio.", 23);
    return r;
  }
  if(tiene("ayuda")) {
    const r = slip("Ayuda... sí... ayuda...", "Ayúdeme a salir... necesito... aire... y... algo que morder... digo, comer.", 22);
    return r;
  }
  if(tiene("zombi","zombie","infectado")) {
    const r = slip("¿Zombi? Yo no... yo no...", "¿ZOMBI? ¡Yo no soy zombi! ... grrr... ¿por qué me mira así?", 25);
    return r;
  }
  if(tiene("xd","jaja")) return seDelata ? "Ja... ja... grrr... qué risa tan... humana." : "Ja, ja... sí... gracioso...";
  if(tiene("familia")) {
    const r = slip("Mi familia... no recuerdo...", "Mi familia... me... espera... para... cenar... grrr... cenar con ellos.", 20);
    return r;
  }
  if(tiene("gracias")) return seDelata ? "De nada... grrr... gracias a usted... por acercarse tanto." : "De nada... doctor...";
  return seDelata ? pick([
    "No sé... mi cabeza... hace ruidos... grrr... como si algo me llamara.",
    "Tengo... hambre... otra vez... de... cosas... blandas... grrr.",
    "Se me cae... algo... no mire... grrr... es normal, ¿no?",
    "Usted huele... bien... digo, se ve bien... grrr."
  ]) : pick([
    "No sé... estoy... cansado...",
    "¿Qué? Perdón... me perdí... ¿qué decía?",
    "Sí... eso... eso mismo...",
    "Hmm... no... no recuerdo..."
  ]);
}

async function api(action:string, args:any){
  const res = await fetch("actions", { method:"POST", headers:{ "content-type":"application/json" }, body: JSON.stringify({ action, args }) });
  const json = await res.json().catch(()=>({}));
  if(!res.ok || json.error) throw new Error(json.error || `Error ${res.status}`);
  return json.data;
}

export default function App(){
  const [vidas,setVidas]=useState(4);
  const [ronda,setRonda]=useState(1);
  const [pacientes,setPacientes]=useState<Paciente[]>([]);
  const [seleccionadoId,setSeleccionadoId]=useState<number|null>(null);
  const [chat,setChat]=useState<ChatMsg[]>([]);
  const [input,setInput]=useState("");
  const [escribiendo,setEscribiendo]=useState(false);
  const [debug,setDebug]=useState<DebugLine[]>([]);
  const [escaneando,setEscaneando]=useState(false);
  const [rondaTerminada,setRondaTerminada]=useState(false);
  const [gameOver,setGameOver]=useState(false);
  const [alerta,setAlerta]=useState(false);
  const [sessions,setSessions]=useState<Session[]>([]);
  const [registroEstado,setRegistroEstado]=useState("Cargando bitácora…");
  const [guardando,setGuardando]=useState(false);
  const chatRef=useRef<HTMLDivElement>(null);
  const debugRef=useRef<HTMLDivElement>(null);
  const pacientesRef=useRef<Paciente[]>([]);
  const vidasRef=useRef(4);
  const seleccionadoRef=useRef<number|null>(null);
  const escaneandoRef=useRef(false);

  pacientesRef.current=pacientes; vidasRef.current=vidas; seleccionadoRef.current=seleccionadoId; escaneandoRef.current=escaneando;

  const addDebug=useCallback((texto:string,kind:DebugLine["kind"])=>setDebug(d=>[...d,{id:nextId(),texto,kind}]),[]);
  const addChat=useCallback((tipo:ChatMsg["tipo"],texto:string)=>setChat(c=>[...c,{id:nextId(),tipo,texto}]),[]);

  const reloadRecords = useCallback(async()=>{
    try{
      const data = await api("records.list", { collection:"protocol_z_sessions" });
      const recs = (data?.records || []) as Session[];
      setSessions(recs.slice(-8).reverse());
      setRegistroEstado(recs.length ? `${recs.length} registro(s) en la bitácora` : "Bitácora vacía — la primera ronda quedará registrada");
    }catch{
      setRegistroEstado("Bitácora no disponible en esta vista previa — el juego sigue offline");
    }
  },[]);

  const createRow = useCallback(async(row:{resultado:string;vidas:number;ronda:number;detalle:string;fecha:string})=>{
    await api("records.create", { collection:"protocol_z_sessions", value: row, idempotency_key:`pz-${row.ronda}-${row.resultado}-${row.fecha}-${row.detalle}`.slice(0,120) });
  },[]);

  const guardarSesion = useCallback(async(resultado:string, detalle:string, vidasFinal:number)=>{
    setGuardando(true);
    try{
      const row={resultado, vidas:vidasFinal, ronda, detalle, fecha:new Date().toISOString()};
      await createRow(row);
      await reloadRecords();
      setRegistroEstado("Sesión guardada en la bitácora");
    }catch(e){
      setRegistroEstado("No se pudo guardar en la bitácora — el juego sigue offline");
    }finally{ setGuardando(false); }
  },[createRow,reloadRecords,ronda]);

  const initJuego = useCallback((mantenerVidas=false)=>{
    const barajados=[...NOMBRES].sort(()=>Math.random()-0.5);
    const nuevos:Paciente[] = barajados.slice(0,4).map((nombre,i)=>({ id:i, nombre, isZombie: Math.random()<0.35, historial:[], sospecha:0, estado:"pendiente" as Estado, mensajes:0 }));
    setPacientes(nuevos);
    setSeleccionadoId(null);
    setChat([{id:nextId(),tipo:"system",texto:"> Selecciona un paciente de la lista para iniciar el interrogatorio."}]);
    setDebug([
      {id:nextId(),texto:"> Esperando ejecución de Array.prototype.some()...",kind:"call"},
      {id:nextId(),texto:"> Listo para iterar el array de pacientes.",kind:"call"},
    ]);
    setAlerta(false); setRondaTerminada(false); setGameOver(false); setEscaneando(false); setEscribiendo(false); setInput("");
    if(!mantenerVidas){ setVidas(4); }
  },[]);

  useEffect(()=>{ initJuego(); reloadRecords(); },[initJuego,reloadRecords]);

  useEffect(()=>{ chatRef.current?.scrollTo({top:chatRef.current.scrollHeight}); },[chat,escribiendo]);
  useEffect(()=>{ debugRef.current?.scrollTo({top:debugRef.current.scrollHeight}); },[debug]);

  const seleccionarPaciente=(p:Paciente)=>{
    if(escaneandoRef.current) return;
    setSeleccionadoId(p.id);
    const base:ChatMsg[]=[{id:nextId(),tipo:"system",texto:`> Interrogando a ${p.nombre}. Presiona 'Enviar' para hablar.`}];
    const hist:ChatMsg[]=p.historial.map(m=>({id:nextId(),tipo:m.role==="user"?"doctor":"patient",texto:m.content}));
    setChat([...base,...hist]);
  };

  const enviarMensaje=async()=>{
    const texto=input.trim();
    const selId=seleccionadoRef.current;
    if(!texto || selId===null || escribiendo || escaneandoRef.current) return;
    const paciente=pacientesRef.current.find(p=>p.id===selId);
    if(!paciente) return;
    setInput("");
    addChat("doctor",texto);
    const historialActual=[...paciente.historial,{role:"user" as Role,content:texto}];
    const pacienteActual={...paciente,historial:historialActual,mensajes:paciente.mensajes+1};
    setPacientes(prev=>prev.map(p=>p.id===selId?pacienteActual:p));
    setEscribiendo(true);
    await sleep(700+Math.random()*500);
    const respuesta=generarRespuestaCasera(pacienteActual,texto);
    // Detectar si la respuesta contiene un delato: lo inferimos por marcadores de zombi
    const esDelato = pacienteActual.isZombie && /(grrr|argh|CEREBROS|cereales|se me cae|carne|morder)/i.test(respuesta);
    let sospechaNueva=pacienteActual.sospecha;
    let textoFinal=respuesta;
    if(esDelato){
      const inc=num(15,25); sospechaNueva=Math.min(100,pacienteActual.sospecha+inc); textoFinal=`${respuesta} [SOSPECHA +${inc}%]`;
    }
    const historialFinal=[...historialActual,{role:"assistant" as Role,content:textoFinal}];
    setPacientes(prev=>prev.map(p=>p.id===selId?{...p,historial:historialFinal,sospecha:sospechaNueva}:p));
    setEscribiendo(false);
    addChat("patient",textoFinal);
  };

  const ejecutarEscaneoIndividual=async()=>{
    const selId=seleccionadoRef.current;
    if(selId===null || escaneandoRef.current) return;
    const paciente=pacientesRef.current.find(p=>p.id===selId);
    if(!paciente || paciente.estado!=="pendiente") return;
    setEscaneando(true); setAlerta(false);
    setDebug([]);
    addDebug(`> Ejecutando [${paciente.nombre}].some(p => p.isZombie) // Array de 1 solo elemento`,"call");
    await sleep(500);
    addDebug(`[Iteración 0] Evaluando a ${paciente.nombre}...`,"eval");
    await sleep(600);
    const resultado=paciente.isZombie;
    addDebug(`   -> Callback retornó: ${resultado ? "TRUE" : "FALSE"} ${resultado ? "(¡Es un zombi!)" : "(Sano)"}`, resultado?"true":"false");
    await sleep(600);
    addDebug(`> .some() finalizado. Resultado: ${resultado}`,"result");
    await sleep(400);

    if(resultado){
      setAlerta(true);
      setPacientes(prev=>prev.map(p=>p.id===selId?{...p,estado:"zombi" as Estado}:p));
      const nuevasVidas=vidasRef.current-1; setVidas(nuevasVidas);
      addDebug(`☣ AMENAZA BIOLÓGICA DETECTADA ☣`,"true");
      addChat("system",`> ¡Alerta! ${paciente.nombre} era zombi. Has perdido una vida.`);
      if(nuevasVidas<=0){ setGameOver(true); await guardarSesion("SISTEMA COMPROMETIDO", `${paciente.nombre} era zombi en escaneo individual`, 0); }
    }else{
      setPacientes(prev=>prev.map(p=>p.id===selId?{...p,estado:"sano" as Estado,sospecha:0}:p));
      addDebug(`✅ Escaneo limpio. ${paciente.nombre} está verificado.`,"result");
      addChat("system",`> ✅ ${paciente.nombre} está limpio. Ya no necesitas escanearlo.`);
    }
    setEscaneando(false);
  };

  const ejecutarEscaneoSome=async()=>{
    if(escaneandoRef.current) return;
    setEscaneando(true); setAlerta(false);
    setDebug([]);
    addDebug(`> Inicializando pacientes.some(p => p.isZombie) en array de 4`,"call");
    await sleep(700);
    let zombieEncontrado:Paciente|null=null;
    let evaluados=0;
    // Bucle for real, paso a paso — equivale a lo que hace .some() por dentro
    for(let i=0;i<pacientesRef.current.length;i++){
      const p=pacientesRef.current[i];
      if(p.estado==="sano"){
        addDebug(`[Iteración ${i}] Saltado: ${p.nombre} ya verificado como sano`,"skip");
        await sleep(450); continue;
      }
      if(p.estado==="zombi"){
        addDebug(`[Iteración ${i}] Saltado: ${p.nombre} ya está en cuarentena`,"skip");
        await sleep(450); continue;
      }
      evaluados++;
      addDebug(`[Iteración ${i}] Evaluando a ${p.nombre}...`,"eval");
      await sleep(600);
      const resultado=p.isZombie;
      addDebug(`   -> Callback retornó: ${resultado ? "TRUE" : "FALSE"} ${resultado ? "(¡Es un zombi!)" : "(Sano)"}`, resultado?"true":"false");
      await sleep(600);
      if(resultado){
        zombieEncontrado=p;
        // Marcar solo al encontrado; los sanos previos quedan pendientes hasta verificarse individualmente, como en el original
        addDebug(`> ⚡ SHORT-CIRCUIT ACTIVADO: .some() se detiene aquí. Ignora los restantes.`,"short");
        await sleep(700);
        break;
      }
    }
    const hayZombie=!!zombieEncontrado;
    addDebug(`> .some() finalizado. Resultado final: ${hayZombie}`,"result");
    await sleep(400);
    if(hayZombie && zombieEncontrado){
      setAlerta(true);
      setPacientes(prev=>prev.map(p=>p.id===zombieEncontrado!.id?{...p,estado:"zombi" as Estado}:p));
      const nuevasVidas=vidasRef.current-1; setVidas(nuevasVidas);
      addDebug(`☣ AMENAZA BIOLÓGICA DETECTADA ☣`,"true");
      addChat("system",`> ¡Alerta! ${zombieEncontrado.nombre} era un zombi. Has perdido una vida.`);
      if(nuevasVidas<=0){
        setGameOver(true);
        await guardarSesion("SISTEMA COMPROMETIDO", `${zombieEncontrado.nombre} detectado en escaneo global`, 0);
      }else{
        setRondaTerminada(true);
      }
    }else{
      addDebug(`✅ Escaneo limpio. Ningún paciente es zombi.`,"result");
      addChat("system",`> Escaneo completado. El array está limpio. Siguiente ronda.`);
      setRondaTerminada(true);
      // Si no hubo zombi y no se terminó por vidas, la ronda se considera completada al avanzar; guardamos al pasar a siguiente ronda
      void evaluados;
    }
    setEscaneando(false);
  };

  const siguienteRonda=async()=>{
    // Guardar la ronda que acaba de terminar si no fue game over
    if(!gameOver){
      await guardarSesion(rondaTerminada ? "RONDA COMPLETADA" : "RONDA", `Ronda ${ronda} completada`, vidasRef.current);
    }
    setRonda(r=>r+1);
    initJuego(true);
  };

  const reiniciarJuego=()=>{
    setRonda(1); setVidas(4); initJuego(false);
  };

  const seleccionado=pacientes.find(p=>p.id===seleccionadoId) || null;
  const individualDeshabilitado=!seleccionado || seleccionado.estado!=="pendiente" || escaneando || gameOver;

  return (
    <div data-safe-area-inset-root style={{boxSizing:"border-box",paddingTop:"var(--safe-area-inset-top)"}} className="min-h-screen w-full overflow-x-clip bg-[var(--bg-dark)]">
      <header data-safe-area-sticky-top style={{top:"var(--safe-area-inset-top)"}} className="sticky z-20 flex flex-wrap items-center justify-between gap-3 border-b border-[var(--border-glass)] bg-black/70 px-4 py-3 sm:px-7">
        <div className="flex min-w-0 flex-wrap items-center gap-3">
          <div className="text-[clamp(1.05rem,3vw,1.4rem)] font-bold leading-tight tracking-wide text-[#00f3ff] [text-shadow:0_0_10px_#00f3ff]">👨⚕ DR. JUAN // INTERFAZ DE CONTENCIÓN SOME-19</div>
          <span className="rounded-full border border-[#00ff66]/60 bg-[#00ff66]/10 px-2.5 py-1 text-[11px] font-bold tracking-widest text-[#00ff66]">IA CASERA v2.0 - OFFLINE ✅ SIN API</span>
          <span className="rounded-full border border-white/15 px-2.5 py-1 text-[11px] tracking-widest text-white/70">RONDA {ronda} {guardando ? "• GUARDANDO…" : ""}</span>
        </div>
        <div className="flex items-center gap-2" aria-label={`${vidas} vidas restantes`}>
          {[0,1,2,3].map(i=>(
            <span key={i} className={`text-2xl transition-all ${i>=vidas ? "scale-75 opacity-15 grayscale" : ""}`} style={{filter:i<vidas?"drop-shadow(0 0 8px #ff003c)":"none"}}>❤</span>
          ))}
          <span className="ml-1 text-sm font-bold text-white/80">{vidas}/4</span>
        </div>
      </header>

      <main className="grid gap-4 p-3 sm:p-4 lg:grid-cols-[300px_minmax(0,1fr)_420px] lg:items-start">
        {/* IZQUIERDA */}
        <section className="panel">
          <h2 className="mb-3 flex items-center gap-2 border-b border-[var(--border-glass)] pb-2 text-base uppercase tracking-[2px] text-[#00f3ff]"><Users size={18}/>Pacientes en Observación</h2>
          <div className="flex flex-col gap-2.5">
            {pacientes.map((p,i)=>(
              <button key={p.id} onClick={()=>seleccionarPaciente(p)} disabled={escaneando} className={`flex items-center gap-3 rounded-lg border p-3 text-left transition-all ${seleccionadoId===p.id ? "border-[#00f3ff] bg-[#00f3ff]/10 shadow-[0_0_15px_rgba(0,243,255,.2)]" : "border-white/5 bg-white/[.02] hover:border-[#00f3ff] hover:bg-[#00f3ff]/[.08]"}`}>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border-glass)] bg-black text-xl">{p.estado==="zombi" ? "🧟" : p.estado==="sano" ? "✅" : "🧑"}</span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-bold text-white">Paciente #{i+1} · {p.nombre}</span>
                  <span className="block text-[13px] text-[#8b949e]">{p.estado==="pendiente" ? "SIN ESCANEAR" : p.estado==="sano" ? "✅ SANO VERIFICADO" : "🧟 ZOMBI EN CUARENTENA"}</span>
                  <span className="mt-1.5 block h-1.5 overflow-hidden rounded-full bg-white/10"><span className="block h-full rounded-full bg-[#ff003c] transition-all" style={{width:`${p.sospecha}%`}}/></span>
                  <span className="mt-1 block text-[11px] tracking-wide text-white/60">SOSPECHA {p.sospecha}%</span>
                </span>
              </button>
            ))}
          </div>
          <div className="mt-4 rounded-lg border border-white/10 bg-black/40 p-3">
            <p className="mb-2 flex items-center gap-2 text-[12px] font-bold tracking-widest text-[#00ff66]"><Activity size={14}/>BITÁCORA PERSISTENTE</p>
            <p className="text-[13px] leading-snug text-white/70">{registroEstado}</p>
            {sessions.length>0 && (
              <ul className="mt-2 space-y-1.5">
                {sessions.map(s=>(
                  <li key={s.id} className="rounded border border-white/10 px-2 py-1.5 text-[12px] leading-snug text-white/75">
                    <span className="font-bold text-white">{s.value.resultado}</span> · Ronda {s.value.ronda} · Vidas {s.value.vidas} — {s.value.detalle}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-2 text-[11px] text-white/45">La bitácora guarda el resultado de cada ronda. El juego en sí funciona sin conexión.</p>
          </div>
        </section>

        {/* CENTRO */}
        <section className={`panel ${alerta ? "alert-mode" : ""}`}>
          <h2 className="mb-3 border-b border-[var(--border-glass)] pb-2 text-base uppercase tracking-[2px] text-[#00f3ff]">Interrogatorio Clínico</h2>
          <div ref={chatRef} className="flex min-h-[280px] flex-1 flex-col gap-2 overflow-y-auto rounded-lg border border-[#1a1a1a] bg-black/40 p-3 lg:max-h-[520px]">
            {chat.map(m=><div key={m.id} className={`msg ${m.tipo}`}>{m.texto}</div>)}
            {escribiendo && <div className="msg patient">… escribiendo <span className="blink">▌</span></div>}
          </div>
          <div className="mt-3 flex gap-2">
            <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter") enviarMensaje();}} disabled={!seleccionado || escaneando || gameOver} placeholder={seleccionado ? `Pregúntale a ${seleccionado.nombre}…` : "Selecciona un paciente para hablar…"} className="min-w-0 flex-1 rounded-md border border-[var(--border-glass)] bg-black px-3 py-2.5 text-[var(--text-main)] outline-none focus:border-[#00f3ff] disabled:opacity-50" autoFocus />
            <button onClick={enviarMensaje} disabled={!seleccionado || !input.trim() || escribiendo || escaneando || gameOver} className="shrink-0 rounded-md bg-[#00f3ff] px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-black transition hover:shadow-[0_0_15px_#00f3ff] disabled:opacity-40">Enviar</button>
          </div>

          <button onClick={ejecutarEscaneoIndividual} disabled={individualDeshabilitado} className={`pulse-green mt-3 w-full rounded-md border border-[#00ff66] bg-transparent px-3 py-4 text-[clamp(.95rem,2.5vw,1.1rem)] font-bold text-[#00ff66] transition hover:bg-[#00ff66] hover:text-black disabled:border-[#333] disabled:text-[#555] disabled:shadow-none ${seleccionado ? "" : ""}`}>
            {seleccionado ? `🔍 ESCANEAR SOLO A: ${seleccionado.nombre}${seleccionado.estado!=="pendiente" ? " — YA VERIFICADO" : ""}` : "🔍 SELECCIONA UN PACIENTE PARA ESCANEARLO SOLO A ÉL"}
          </button>
          <button onClick={rondaTerminada ? siguienteRonda : ejecutarEscaneoSome} disabled={escaneando || gameOver} className="mt-2 w-full rounded-md border border-[#00f3ff]/60 bg-[#00f3ff]/10 px-3 py-3 font-bold uppercase tracking-wider text-[#00f3ff] transition hover:bg-[#00f3ff] hover:text-black disabled:opacity-50">
            {escaneando ? "EJECUTANDO .SOME()…" : rondaTerminada ? "SIGUIENTE RONDA →" : "INICIAR ESCANEO GLOBAL: pacientes.some()"}
          </button>
          <p className="mt-2 text-center text-[12px] leading-snug text-white/60">Global = revisa a todos hasta encontrar 1 zombi. Individual = revisa solo al seleccionado con <span className="font-code text-[#00f3ff]">[paciente].some()</span></p>
          {rondaTerminada && <p className="mt-1 text-center text-[13px] font-bold text-[#00ff66]">Ronda terminada. Pulsa SIGUIENTE RONDA para barajar 4 nombres nuevos.</p>}
        </section>

        {/* DERECHA */}
        <section className="panel !border-[#333] bg-[#050505]">
          <h2 className="mb-3 flex items-center gap-2 border-b border-[#333] pb-2 text-base uppercase tracking-[2px] text-[#00ff66]"><Brain size={18}/>Depurador Cognitivo: .some()</h2>
          <div ref={debugRef} className="font-code min-h-[280px] flex-1 overflow-y-auto rounded-md bg-[#0d1117] p-3 text-[13px] leading-relaxed text-[#8b949e] lg:max-h-[560px]">
            {debug.map(l=>(
              <div key={l.id} className={`mb-1 ${l.kind==="call" ? "font-semibold text-[#00f3ff]" : l.kind==="eval" ? "text-[#e6edf3]" : l.kind==="true" ? "font-bold text-[#ff003c] [text-shadow:0_0_5px_#ff003c]" : l.kind==="false" ? "text-[#484f58]" : l.kind==="short" ? "inline-block rounded bg-[#ffcc00]/10 px-1.5 py-0.5 font-bold text-[#ffcc00]" : l.kind==="skip" ? "text-[#8b949e] italic" : "mt-2 border-t border-dashed border-[#333] pt-2 font-bold text-[#00ff66]"}`}>{l.texto}</div>
            ))}
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] leading-snug text-white/60">
            <span><span className="text-[#00f3ff]">■</span> Llamada</span><span><span className="text-[#ff003c]">■</span> TRUE = zombi</span>
            <span><span className="text-[#484f58]">■</span> FALSE = sano</span><span><span className="text-[#ffcc00]">■</span> SHORT-CIRCUIT</span>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-md border border-[#ff003c]/30 bg-[#ff003c]/5 px-3 py-2 text-[12px] text-white/70"><ShieldAlert size={16} className="shrink-0 text-[#ff003c]"/><span>Los pacientes verificados como sanos se saltan en el escaneo global.</span></div>
          <div className="mt-2 flex items-center gap-2 text-[12px] text-white/50"><Radio size={14} className="text-[#00f3ff]"/><span>IA casera local · sin red · sin claves</span><ScanLine size={14} className="ml-auto text-[#00ff66]"/></div>
        </section>
      </main>

      <footer className="px-4 pb-6 text-center text-[12px] text-white/40">PROTOCOLO Z v2 CORREGIDA · Nombres únicos por ronda · Avatares neutros hasta revelar · .some() paso a paso con short-circuit</footer>

      {gameOver && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 px-4 text-center backdrop-blur">
          <h1 className="text-[clamp(2rem,8vw,4rem)] font-bold leading-tight text-[#ff003c] [text-shadow:0_0_30px_#ff003c]">SISTEMA COMPROMETIDO</h1>
          <p className="mb-8 mt-3 text-lg text-[#888]">La horda te ha superado, Doctor Juan.</p>
          <button onClick={reiniciarJuego} className="flex items-center gap-2 rounded-md border border-[#00ff66] px-10 py-4 text-lg font-bold text-[#00ff66] transition hover:bg-[#00ff66] hover:text-black"><RotateCcw size={20}/>REINICIAR PROTOCOLO</button>
        </div>
      )}
    </div>
  );
}
