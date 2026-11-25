import React, { useEffect, useMemo, useRef, useState } from 'react';

type Log = { text: string; kind: 'info' | 'ok' | 'bad' | 'code' };
type SaveState = 'idle' | 'saving' | 'saved' | 'offline';

const RELICS = [
  { id: 'escudo', emoji: '🛡', name: 'Escudo de Roble', poder: 10 },
  { id: 'arco', emoji: '🏹', name: 'Arco Élfico', poder: 20 },
  { id: 'daga', emoji: '🗡', name: 'Daga del Alba', poder: 30 },
  { id: 'espada', emoji: '⚔', name: 'Espada Rúnica', poder: 40 },
  { id: 'orbe', emoji: '🔮', name: 'Orbe de Fuego', poder: 50 },
];
const SPELLS = [
  { id: 'rayo', emoji: '⚡', name: 'Rayo', mana: 80 },
  { id: 'ventisca', emoji: '❄', name: 'Ventisca', mana: 60 },
  { id: 'vampirico', emoji: '💀', name: 'Toque Vampírico', mana: 50 },
  { id: 'fuego', emoji: '🔥', name: 'Bola de Fuego', mana: 40 },
  { id: 'torbellino', emoji: '🌪', name: 'Torbellino', mana: 20 },
];
const HEROES = [
  { nombre: 'Kael', emoji: '🐉', poder: '100⚔' },
  { nombre: 'Lyra', emoji: '🧝', poder: '80⚔' },
  { nombre: 'Mordo', emoji: '🧙', poder: '100⚔' },
  { nombre: 'Sylas', emoji: '🏹', poder: '60⚔' },
  { nombre: 'Bren', emoji: '🛡', poder: '80⚔' },
];
const ORACLE_ROUNDS = [
  { arr: [3, 1, 2], op: 'sort' as const },
  { arr: [5, 2, 8], op: 'toSorted' as const },
  { arr: [10, 9, 2], op: 'sort' as const },
  { arr: [4, 1, 3], op: 'toSorted' as const },
];
const SEAL_ROUNDS = [
  { arr: [10, 9, 2, 100, 5] },
  { arr: [7, 3, 9, 1] },
  { arr: [20, 4, 15, 8, 2] },
];
const LEVELS = [
  { n: 1, title: 'Reliquias', sub: 'Clic', icon: '🗡' },
  { n: 2, title: 'Hechizos', sub: 'Arrastrar', icon: '🔥' },
  { n: 3, title: 'Predicción', sub: 'Oráculo', icon: '🔮' },
  { n: 4, title: 'Comparador', sub: 'Perdido · Escribir', icon: '⌨️' },
  { n: 5, title: 'Sello', sub: 'Test Final', icon: '🏰' },
];
const fmt = (a: number[]) => `[${a.join(', ')}]`;

async function api(action: string, args: Record<string, unknown>) {
  const res = await fetch("actions", { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ action, args }) });
  const j = await res.json().catch(() => ({}));
  if (!res.ok || j.error) throw new Error(j.error || `Error ${res.status}`);
  return j.data;
}

export default function App() {
  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState(0);
  const [streak, setStreak] = useState(0);
  const [solved, setSolved] = useState<number[]>([]);
  const [logs, setLogs] = useState<Log[]>([
    { text: '> Grimorio abierto. Kael, el original siempre queda intacto.', kind: 'info' },
    { text: '> ⚖️ sort() muta | toSorted() NO muta', kind: 'code' },
  ]);
  const [feedback, setFeedback] = useState<{ text: string; ok: boolean } | null>(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [glowKey, setGlowKey] = useState(0);
  const [recordId, setRecordId] = useState<string | null>(null);
  const [saveState, setSaveState] = useState<SaveState>('idle');
  const [saveMsg, setSaveMsg] = useState('');

  // Nivel 1
  const [l1Pick, setL1Pick] = useState<string[]>([]);
  // Nivel 2
  const [l2New, setL2New] = useState<string[]>([]);
  const [dragId, setDragId] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<number | null>(null);
  // Nivel 3
  const [oRound, setORound] = useState(0);
  const [oPick, setOPick] = useState<'intacto' | 'mutado' | null>(null);
  const [oRevealed, setORevealed] = useState(false);
  const [oStreak, setOStreak] = useState(0);
  const [oDone, setODone] = useState(false);
  // Nivel 4
  const [l4Code, setL4Code] = useState('(a,b) => ');
  const [l4Help, setL4Help] = useState(false);
  const [l4Attempts, setL4Attempts] = useState(0);
  const [l4Result, setL4Result] = useState<string | null>(null);
  // Nivel 5
  const [sRound, setSRound] = useState(0);
  const [sChoice, setSChoice] = useState<'sort' | 'toSorted' | 'spread' | null>(null);
  const [sRevealed, setSRevealed] = useState(false);
  const [sMutated, setSMutated] = useState(false);

  const pointsRef = useRef(points);
  const solvedRef = useRef(solved);
  const streakRef = useRef(streak);
  pointsRef.current = points; solvedRef.current = solved; streakRef.current = streak;
  const savingRef = useRef(false);

  const pushLog = (text: string, kind: Log['kind'] = 'info') => setLogs(p => [...p.slice(-28), { text, kind }]);

  const persist = async (pts = pointsRef.current, slv = solvedRef.current, stk = streakRef.current) => {
    if (savingRef.current) return;
    savingRef.current = true; setSaveState('saving');
    try {
      const value = { points: pts, solved: slv, streak: stk, level, updated: new Date().toISOString() };
      if (recordId) await api('records.replace', { collection: 'grimorio_progreso', id: recordId, value });
      else {
        const rec: any = await api('records.create', { collection: 'grimorio_progreso', value, idempotency_key: `grimorio-${Date.now()}` });
        if (rec?.id) setRecordId(rec.id);
      }
      setSaveState('saved'); setSaveMsg('Progreso guardado');
    } catch (e) {
      setSaveState('offline'); setSaveMsg('Sin conexión: tu partida sigue en pantalla');
    } finally { savingRef.current = false; }
  };

  useEffect(() => {
    (async () => {
      try {
        const data: any = await api('records.list', { collection: 'grimorio_progreso' });
        const rec = data?.records?.[0];
        if (rec?.value) {
          setRecordId(rec.id); setPoints(rec.value.points || 0); setSolved(rec.value.solved || []); setStreak(rec.value.streak || 0); setSaveState('saved'); setSaveMsg('Partida recuperada');
        }
      } catch { setSaveState('offline'); setSaveMsg('Sin conexión: juega sin guardar'); }
    })();
  }, []);

  const addPoints = (delta: number, reason: string) => {
    const np = Math.max(0, points + delta);
    const ns = delta > 0 ? streak + 1 : 0;
    const nextSolved = solved;
    setPoints(np); setStreak(ns); pointsRef.current = np; streakRef.current = ns; solvedRef.current = nextSolved;
    pushLog(`${delta > 0 ? '+' : ''}${delta} puntos — ${reason}`, delta > 0 ? 'ok' : 'bad');
    persist(np, nextSolved, ns);
    return { np, ns };
  };
  const markSolved = (n: number) => {
    if (solved.includes(n)) return;
    const next = [...solved, n]; setSolved(next); solvedRef.current = next;
    persist(pointsRef.current, next, streakRef.current);
  };
  const fail = (text: string) => { setFeedback({ text, ok: false }); setShakeKey(k => k + 1); };
  const win = (text: string) => { setFeedback({ text, ok: true }); setGlowKey(k => k + 1); };

  // ---------- NIVEL 1 ----------
  const l1Sorted = useMemo(() => [...RELICS].sort((a, b) => a.poder - b.poder), []);
  const checkL1 = () => {
    const picked = l1Pick.map(id => RELICS.find(r => r.id === id)!);
    const expected = l1Sorted.map(r => r.id);
    pushLog('> Ejecutando reliquias.toSorted((a,b)=>a.poder-b.poder)', 'code');
    pushLog('> Original antes: [30, 10, 50, 20, 40] · poderes', 'info');
    if (l1Pick.length < 5) { addPoints(-3, 'copia incompleta'); fail('❌ Copia incompleta. Coloca las 5 reliquias en la copia ordenada.'); return; }
    const wrongIdx = picked.findIndex((r, i) => r.id !== expected[i]);
    if (wrongIdx === -1) {
      pushLog('> Copia creada: Escudo → Arco → Daga → Espada → Orbe', 'ok');
      pushLog('> Original después INTACTO · ⚖️ sort() muta | toSorted() NO muta', 'ok');
      addPoints(10, 'Nivel 1 ordenado'); markSolved(1); win('✅ La copia está ordenada y el grimorio original sigue intacto. toSorted no muta.');
    } else {
      const bad = picked[wrongIdx]; const good = l1Sorted[wrongIdx];
      addPoints(-3, 'orden incorrecto Nivel 1');
      pushLog(`> Comparación ${wrongIdx + 1}: esperabas ${good.name} (${good.poder})`, 'bad');
      fail(`❌ Falló en la posición ${wrongIdx + 1}: pusiste ${bad.name} (${bad.poder}) pero debería ir ${good.name} (${good.poder}). Orden correcto: Escudo → Arco → Daga → Espada → Orbe.`);
    }
  };

  // ---------- NIVEL 2 ----------
  const l2Available = SPELLS.filter(s => !l2New.includes(s.id));
  const l2Expected = useMemo(() => [...SPELLS].sort((a, b) => b.mana - a.mana).map(s => s.id), []);
  const addToNew = (id: string) => setL2New(p => p.includes(id) ? p : [...p, id]);
  const moveInNew = (idx: number, dir: -1 | 1) => {
    setL2New(p => { const n = [...p]; const j = idx + dir; if (j < 0 || j >= n.length) return p; [n[idx], n[j]] = [n[j], n[idx]]; return n; });
  };
  const checkL2 = () => {
    pushLog('> Ejecutando hechizos.toSorted((a,b)=>b.mana-a.mana)', 'code');
    pushLog('> Original antes: [40, 60, 80, 20, 50] · maná · página bloqueada', 'info');
    if (l2New.length === 0) { addPoints(-10, 'página nueva vacía'); fail('❌ Vaciaste la página original. Eso es mutar el grimorio. La página nueva no puede quedar vacía.'); return; }
    if (JSON.stringify(l2New) === JSON.stringify(l2Expected)) {
      pushLog('> Copia: Rayo → Ventisca → Toque → Bola → Torbellino', 'ok'); pushLog('> Original después INTACTO', 'ok');
      addPoints(10, 'Nivel 2 ordenado'); markSolved(2); win('✅ La página nueva está ordenada de mayor a menor maná. La página original sigue intacta.');
    } else {
      addPoints(-3, 'orden incorrecto Nivel 2'); fail('❌ Orden incorrecto. Descendente = mayor primero. Orden correcto: Rayo (80) → Ventisca (60) → Toque Vampírico (50) → Bola de Fuego (40) → Torbellino (20).');
    }
  };

  // ---------- NIVEL 3 ----------
  const oracle = ORACLE_ROUNDS[oRound];
  const oracleSorted = [...oracle.arr].sort((a, b) => a - b);
  const revealOracle = () => {
    if (!oPick) { fail('❌ Elige una predicción: ¿el original sigue intacto o se muta?'); return; }
    const actuallyMutated = oracle.op === 'sort';
    const correct = (oPick === 'mutado') === actuallyMutated;
    pushLog(`> Ejecutando arr.${oracle.op}((a,b)=>a-b) sobre ${fmt(oracle.arr)}`, 'code');
    pushLog(`> Original antes: ${fmt(oracle.arr)}`, 'info');
    if (correct) {
      const ns = oStreak + 1; setOStreak(ns);
      let bonus = 0; if (ns === 4) bonus = 5;
      pushLog(`> Original después: ${actuallyMutated ? fmt(oracleSorted) + ' MUTADO' : fmt(oracle.arr) + ' INTACTO'}`, actuallyMutated ? 'bad' : 'ok');
      addPoints(10 + bonus, bonus ? 'Nivel 3 + bonus 4 seguidas' : 'Nivel 3 predicción');
      if (oRound === 3) { setODone(true); markSolved(3); win('✅ Correcto. sort muta el original; toSorted no. El oráculo te revela el siguiente hechizo. ¡Bonus +5 por 4 rondas seguidas!'); }
      else win(`✅ Correcto. ${actuallyMutated ? 'sort muta el original.' : 'toSorted devuelve copia nueva; el original sigue intacto.'} El oráculo te revela el siguiente hechizo.`);
    } else {
      setOStreak(0); addPoints(-3, 'predicción incorrecta');
      fail(`❌ Incorrecto. ${actuallyMutated ? `sort MUTA: el original pasa a ${fmt(oracleSorted)}.` : `toSorted devuelve copia nueva; el original sigue ${fmt(oracle.arr)}.`}`);
    }
    setORevealed(true);
  };
  const nextOracle = () => { if (oRound < 3) { setORound(oRound + 1); setOPick(null); setORevealed(false); setFeedback(null); } };

  // ---------- NIVEL 4 ----------
  const checkL4 = () => {
    const code = l4Code.trim();
    pushLog('> Ejecutando heroes.toSorted(comparador escrito)', 'code');
    pushLog('> Original antes: Kael 100⚔ · Lyra 80⚔ · Mordo 100⚔ · Sylas 60⚔ · Bren 80⚔', 'info');
    let fn: any = null;
    try { fn = new Function(`return (${code})`)(); if (typeof fn !== 'function') throw new Error('no es función'); }
    catch { addPoints(-5, 'comparador mal escrito'); fail('❌ Comparador mal escrito. Revisa la sintaxis: (a,b) => parseInt(a.poder)-parseInt(b.poder) || a.nombre.localeCompare(b.nombre)'); return; }
    let result: typeof HEROES = [];
    try { result = [...HEROES].toSorted(fn); } catch { addPoints(-5, 'comparador con error'); fail('❌ Tu comparador lanzó un error al ejecutarse. Revisa parseInt y localeCompare.'); return; }
    const got = result.map(h => h.nombre).join(',');
    const expected = 'Sylas,Bren,Lyra,Kael,Mordo';
    setL4Result(result.map(h => `${h.emoji} ${h.nombre} ${h.poder}`).join(' → '));
    setL4Attempts(a => a + 1);
    if (got === expected) {
      const pts = l4Help ? 5 : 15;
      pushLog(`> Copia: ${result.map(h => h.nombre).join(' → ')}`, 'ok'); pushLog('> Original después INTACTO', 'ok');
      addPoints(pts, l4Help ? 'Nivel 4 con Ayuda' : 'Nivel 4 comparador'); markSolved(4);
      win(`✅ ¡Comparador correcto! parseInt convierte los strings y localeCompare ordena los empates. El original sigue intacto. +${pts} puntos.`);
    } else if (!code.includes('parseInt')) {
      addPoints(-5, 'falta parseInt'); fail('❌ Sin parseInt, toSorted compara strings y ordena lexicográficamente ("100⚔" < "80⚔"). Necesitas convertir a número.');
    } else if (!code.includes('localeCompare')) {
      addPoints(-5, 'falta localeCompare'); fail('❌ Los empates en poder no se ordenan por nombre. Añade || a.nombre.localeCompare(b.nombre).');
    } else { addPoints(-5, 'comparador mal'); fail('❌ Comparador incorrecto. Revisa el orden: primero poder con parseInt, luego nombre con localeCompare.'); }
  };

  // ---------- NIVEL 5 ----------
  const sealArr = SEAL_ROUNDS[sRound].arr;
  const chooseSeal = (choice: 'sort' | 'toSorted' | 'spread') => {
    setSChoice(choice); setSRevealed(true);
    const sorted = [...sealArr].sort((a, b) => a - b);
    pushLog(`> Ejecutando opción: ${choice === 'sort' ? 'original.sort((a,b)=>a-b)' : choice === 'toSorted' ? 'original.toSorted((a,b)=>a-b)' : '[...original].sort((a,b)=>a-b)'}`, 'code');
    pushLog(`> Original antes: ${fmt(sealArr)}`, 'info');
    if (choice === 'sort') {
      setSMutated(true); pushLog(`> Original después: ${fmt(sorted)} MUTADO · 💀 El grimorio se destruyó.`, 'bad'); addPoints(-10, 'sort muta el grimorio');
      fail('❌ sort MUTA el original. El grimorio se destruye. Usa toSorted.');
    } else if (choice === 'toSorted') {
      setSMutated(false); pushLog(`> Copia: ${fmt(sorted)} · Original después: ${fmt(sealArr)} INTACTO`, 'ok'); addPoints(15, 'Nivel 5 toSorted'); if (sRound === 2) markSolved(5);
      win('✅ ¡Correcto! toSorted devuelve copia ordenada sin mutar el original. El grimorio está a salvo.');
    } else {
      setSMutated(false); pushLog(`> Copia: ${fmt(sorted)} · Original después: ${fmt(sealArr)} INTACTO`, 'ok'); addPoints(10, 'Nivel 5 spread'); if (sRound === 2) markSolved(5);
      win('✅ También es válido: [...original].sort(...) copia primero y ordena la copia. Pero toSorted es más directo.');
    }
  };
  const nextSeal = () => { if (sRound < 2) { setSRound(sRound + 1); setSChoice(null); setSRevealed(false); setSMutated(false); setFeedback(null); } };
  const restoreSeal = () => { setSMutated(false); setSChoice(null); setSRevealed(false); setFeedback({ text: '📖 Grimorio restaurado. El original vuelve a estar intacto. Elige de nuevo.', ok: true }); };

  const resetAll = () => {
    setPoints(0); setStreak(0); setSolved([]); pointsRef.current = 0; streakRef.current = 0; solvedRef.current = [];
    setL1Pick([]); setL2New([]); setORound(0); setOPick(null); setORevealed(false); setOStreak(0); setODone(false);
    setL4Code('(a,b) => '); setL4Help(false); setL4Result(null); setSRound(0); setSChoice(null); setSRevealed(false); setSMutated(false);
    setFeedback(null); setLogs([{ text: '> Grimorio reiniciado. Kael vuelve a empezar.', kind: 'info' }]); setLevel(1);
    persist(0, [], 0);
  };

  const originalPreview = level === 1 ? '[30, 10, 50, 20, 40]' : level === 2 ? '[40, 60, 80, 20, 50]' : level === 3 ? fmt(oracle.arr) : level === 4 ? 'Kael 100⚔ · Lyra 80⚔ · Mordo 100⚔ · Sylas 60⚔ · Bren 80⚔' : fmt(sealArr);

  return (
    <div data-safe-area-inset-root style={{ boxSizing: 'border-box', paddingTop: 'var(--safe-area-inset-top)' }} className="min-h-screen w-full bg-[#030508] text-[#f4ead2] overflow-x-clip">
      {/* HEADER */}
      <header data-safe-area-sticky-top style={{ top: 'var(--safe-area-inset-top)' }} className="sticky z-30 border-b border-[#f5c451]/25 bg-[#030508]/95 backdrop-blur">
        <div className="mx-auto max-w-[1500px] px-3 sm:px-5 py-3 flex flex-wrap items-center gap-2 sm:gap-3">
          <div className="min-w-0">
            <h1 className="text-[clamp(1.15rem,3.2vw,1.9rem)] leading-none font-bold tracking-wide text-[#f5c451] [overflow-wrap:anywhere]">📖 GRIMORIO DEL HÉROE CAÍDO <span className="text-[#a855f7]">— KAEL</span></h1>
            <p className="text-[12px] sm:text-sm text-[#9aa3b8]">Eres Kael, el último héroe. La horda desordenó el grimorio. El original <b className="text-[#ff7a18]">SIEMPRE</b> debe quedar intacto.</p>
          </div>
          <div className="ml-auto flex flex-wrap items-center gap-2">
            <span className="chip rounded-full px-2.5 py-1 text-xs font-bold">SIN API ✅</span>
            <span className="rounded-full bg-[#f5c451] text-black px-3 py-1 text-sm font-extrabold">PUNTOS: {points}</span>
            <span className="rounded-full border border-[#a855f7] bg-[#a855f7]/20 px-3 py-1 text-sm font-bold">🔥 RACHA: {streak}</span>
            <span className="text-[11px] text-[#9aa3b8]">{saveMsg || 'Guardado local de partida'} · {saveState === 'saving' ? 'Guardando…' : saveState === 'saved' ? '●' : '○'}</span>
          </div>
        </div>
        <div className="mx-auto max-w-[1500px] px-3 sm:px-5 pb-2 flex flex-wrap gap-2 text-[12px]">
          <span className="text-[#9aa3b8]">+10 acierto · +15 Niveles 4 y 5 con toSorted · +10 Nivel 5 con spread · −10 mutar con sort · −5 comparador mal · −3 orden / predicción · +5 bonus N3 (4 seguidas) y N4 con Ayuda*</span>
          <button onClick={resetAll} className="btn-ghost rounded-lg px-3 py-1 font-bold ml-auto">↺ Reiniciar grimorio</button>
        </div>
      </header>

      <main className="mx-auto max-w-[1500px] px-3 sm:px-5 py-4 grid gap-4 lg:grid-cols-[300px_1fr_420px] items-start">
        {/* IZQUIERDA */}
        <aside className="space-y-4 lg:sticky lg:top-24">
          <section className="panel p-4" aria-label="Niveles">
            <h2 className="text-lg font-bold text-[#f5c451]">📜 NIVELES</h2>
            <div className="mt-3 space-y-2">
              {LEVELS.map(l => (
                <button key={l.n} onClick={() => { setLevel(l.n); setFeedback(null); }} className={`w-full text-left rounded-xl border px-3 py-2.5 flex items-center gap-3 ${level === l.n ? 'border-[#f5c451] bg-[#f5c451]/15' : 'border-white/10 bg-white/[.03]'}`}>
                  <span className="text-2xl">{l.icon}</span>
                  <span className="min-w-0 flex-1"><span className="block font-bold leading-tight">Nivel {l.n} · {l.title}</span><span className="block text-xs text-[#9aa3b8]">{l.sub}</span></span>
                  <span className="text-lg">{solved.includes(l.n) ? '✅' : '○'}</span>
                </button>
              ))}
            </div>
            <p className="mt-3 text-xs text-[#9aa3b8]">{solved.length}/5 niveles resueltos · {solved.length === 5 ? '🏆 El grimorio está a salvo, Kael.' : 'Completa cada nivel sin mutar el original.'}</p>
          </section>
          <section className="panel p-4 border-[#ff7a18]/40">
            <h3 className="font-bold text-[#ff7a18]">sort() vs toSorted()</h3>
            <div className="mono mt-3 space-y-2 text-[12px] leading-relaxed">
              <p className="rounded-lg bg-red-500/10 border border-red-500/30 p-2"><b className="text-[#ff4d6d]">sort()</b><br />MUTA el original.<br />arr.sort() → original cambia.</p>
              <p className="rounded-lg bg-emerald-500/10 border border-emerald-500/30 p-2"><b className="text-[#34d399]">toSorted()</b><br />NO muta. Devuelve copia nueva.<br />arr.toSorted() → original intacto.</p>
              <p className="text-[#9aa3b8]">Regla de oro: nunca llames sort() sobre el grimorio original.</p>
            </div>
          </section>
          <section className="panel p-4">
            <h3 className="font-bold">🧟 Bitácora de Kael</h3>
            <p className="mt-2 text-sm text-[#cbd5e1] leading-relaxed">“Encontré el grimorio entre cenizas. Cada página desordenada es un hechizo que puede salvar el reino… o destruirlo si toco el original.”</p>
            <p className="mt-2 text-xs text-[#9aa3b8]">Consejo: el comparador decide el orden. Sin él, los números se ordenan como texto.</p>
          </section>
        </aside>

        {/* CENTRO */}
        <section className="space-y-4 min-w-0">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="panel p-4 border-[#ff7a18]/50">
              <div className="flex items-center justify-between"><h3 className="font-bold text-[#ff7a18]">🔒 ORIGINAL BLOQUEADO</h3><span className="text-xs font-bold bg-[#ff7a18]/20 text-[#ff7a18] px-2 py-1 rounded-full">INTACTO</span></div>
              <p className="mono mt-3 text-sm break-words [overflow-wrap:anywhere]">{originalPreview}</p>
              <p className="mt-2 text-xs text-[#9aa3b8]">No se puede arrastrar, borrar ni ordenar. Solo leer.</p>
            </div>
            <div className="panel p-4 border-emerald-400/30">
              <h3 className="font-bold text-[#34d399]">📄 COPIA ORDENADA</h3>
              <p className="mono mt-3 text-sm [overflow-wrap:anywhere]">{level === 1 ? (l1Pick.length ? l1Pick.map(id => RELICS.find(r => r.id === id)!.emoji + ' ' + RELICS.find(r => r.id === id)!.name).join(' → ') : '— copia vacía —') : level === 2 ? (l2New.length ? l2New.map(id => SPELLS.find(s => s.id === id)!.emoji + ' ' + SPELLS.find(s => s.id === id)!.name).join(' → ') : '— página nueva vacía —') : level === 3 ? `Ronda ${oRound + 1}/4 · ${oracle.op} · ${fmt(oracle.arr)}` : level === 4 ? (l4Result || '— escribe un comparador —') : `Ronda ${sRound + 1}/3 · ${fmt(sealArr)}`}</p>
              <p className="mt-2 text-xs text-[#9aa3b8]">Aquí sí puedes ordenar: es una copia, no el original.</p>
            </div>
          </div>

          <div key={`${level}-${shakeKey}-${glowKey}`} className={`panel p-4 sm:p-5 ${feedback?.ok ? 'glow' : ''} ${feedback && !feedback.ok ? 'shake' : ''}`}>
            {level === 1 && (
              <div>
                <p className="text-xs tracking-widest text-[#a855f7] font-bold">NIVEL 1 · CLIC SIMPLE</p>
                <h2 className="text-2xl font-bold mt-1">Las Reliquias del Héroe</h2>
                <p className="text-[#cbd5e1] mt-1">Ordena por <b>poder ascendente</b> haciendo clic en cada reliquia en el orden correcto. Cada clic la coloca en la copia.</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {RELICS.map(r => { const used = l1Pick.includes(r.id); const pos = l1Pick.indexOf(r.id); return (
                    <button key={r.id} disabled={used} onClick={() => setL1Pick(p => [...p, r.id])} className={`rounded-xl border px-3 py-3 text-left min-w-[130px] flex-1 ${used ? 'opacity-40 border-white/10' : 'border-[#f5c451]/40 bg-white/[.04] hover:bg-[#f5c451]/10'}`}>
                      <span className="text-2xl">{r.emoji}</span><span className="block font-bold leading-tight mt-1">{r.name}</span><span className="mono text-xs text-[#f5c451]">poder {r.poder}</span>{used && <span className="block text-xs text-emerald-300">✓ en copia · posición {pos + 1}</span>}
                    </button>); })}
                </div>
                <div className="mt-3 mono text-xs bg-black/40 rounded-lg p-3">const copia = reliquias.toSorted((a,b)=&gt;a.poder-b.poder)</div>
                <div className="mt-3 flex flex-wrap gap-2"><button onClick={() => setL1Pick(p => p.slice(0, -1))} className="btn-ghost rounded-lg px-4 py-2 font-bold">↩ Deshacer último</button><button onClick={() => setL1Pick([])} className="btn-ghost rounded-lg px-4 py-2 font-bold">Limpiar copia</button><button onClick={checkL1} className="btn-gold rounded-lg px-5 py-2">✓ Comprobar</button></div>
              </div>
            )}
            {level === 2 && (
              <div>
                <p className="text-xs tracking-widest text-[#a855f7] font-bold">NIVEL 2 · ARRASTRAR Y SOLTAR</p>
                <h2 className="text-2xl font-bold mt-1">Los Hechizos del Grimorio</h2>
                <p className="text-[#cbd5e1] mt-1">Arrastra los hechizos a la página nueva, ordenados por <b>maná descendente</b> (mayor primero). En móvil usa ➕ y las flechas ◀ ▶.</p>
                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 p-3 bg-black/20"><h4 className="font-bold text-sm">Hechizos disponibles</h4><div className="mt-2 space-y-2">{l2Available.map(s => (
                    <div key={s.id} draggable onDragStart={() => setDragId(s.id)} className="flex items-center gap-2 rounded-lg border border-[#a855f7]/40 bg-[#a855f7]/10 px-2 py-2 cursor-grab"><span className="text-xl">{s.emoji}</span><span className="flex-1 min-w-0 font-bold [overflow-wrap:anywhere]">{s.name}</span><span className="mono text-xs">maná {s.mana}</span><button onClick={() => addToNew(s.id)} className="btn-gold rounded px-2 py-1 text-xs">➕ Añadir</button></div>))}{l2Available.length === 0 && <p className="text-sm text-[#9aa3b8]">Todos están en la página nueva.</p>}</div></div>
                  <div onDragOver={e => { e.preventDefault(); }} onDrop={e => { e.preventDefault(); if (dragId) addToNew(dragId); setDragId(null); }} className="rounded-xl border border-dashed border-emerald-400/50 p-3 bg-emerald-500/[.05] min-h-[170px]"><h4 className="font-bold text-sm">📄 Página nueva — suelta aquí</h4><div className="mt-2 space-y-2">{l2New.map((id, idx) => { const s = SPELLS.find(x => x.id === id)!; return (
                    <div key={id} draggable onDragStart={() => setDragId(id)} onDragOver={e => { e.preventDefault(); setDragOver(idx); }} onDrop={e => { e.preventDefault(); if (dragId && dragId !== id) { setL2New(p => { const n = p.filter(x => x !== dragId); n.splice(idx, 0, dragId); return n; }); } setDragId(null); }} className={`flex items-center gap-2 rounded-lg border px-2 py-2 bg-black/30 ${dragOver === idx ? 'border-[#f5c451]' : 'border-white/10'}`}><span className="text-xl">{s.emoji}</span><span className="flex-1 min-w-0 font-bold [overflow-wrap:anywhere]">{idx + 1}. {s.name}</span><span className="mono text-xs">{s.mana}</span><button onClick={() => moveInNew(idx, -1)} aria-label="Mover a la izquierda" className="btn-ghost rounded px-2 py-1">◀</button><button onClick={() => moveInNew(idx, 1)} aria-label="Mover a la derecha" className="btn-ghost rounded px-2 py-1">▶</button><button onClick={() => setL2New(p => p.filter(x => x !== id))} className="btn-ghost rounded px-2 py-1 text-xs">Quitar</button></div>); })}{l2New.length === 0 && <p className="text-sm text-[#9aa3b8]">Vacía. Arrastra o añade hechizos aquí.</p>}</div></div>
                </div>
                <div className="mt-3 mono text-xs bg-black/40 rounded-lg p-3">const copia = hechizos.toSorted((a,b)=&gt;b.mana-a.mana)</div>
                <div className="mt-3 flex flex-wrap gap-2"><button onClick={() => setL2New([])} className="btn-ghost rounded-lg px-4 py-2 font-bold">Limpiar página nueva</button><button onClick={checkL2} className="btn-gold rounded-lg px-5 py-2">✓ Comprobar</button></div>
              </div>
            )}
            {level === 3 && (
              <div>
                <p className="text-xs tracking-widest text-[#a855f7] font-bold">NIVEL 3 · PREDICCIÓN · ORÁCULO</p>
                <h2 className="text-2xl font-bold mt-1">La Predicción del Oráculo</h2>
                <p className="text-[#cbd5e1] mt-1">Ronda {oRound + 1} de 4 · Racha del oráculo: <b>{oStreak}</b>. Predice qué le pasará al original.</p>
                <div className="mt-4 panel !rounded-xl p-4 text-center"><p className="text-xs text-[#9aa3b8]">GRIMORIO ORIGINAL · OPERACIÓN</p><p className="mono text-xl sm:text-2xl mt-2 [overflow-wrap:anywhere]">{fmt(oracle.arr)} · <span className="text-[#f5c451]">{oracle.op}((a,b)=&gt;a-b)</span></p></div>
                <div className="mt-3 grid sm:grid-cols-2 gap-2">
                  <button disabled={oRevealed} onClick={() => setOPick('intacto')} className={`rounded-xl border p-4 text-left ${oPick === 'intacto' ? 'border-emerald-400 bg-emerald-500/15' : 'border-white/10 bg-white/[.03]'}`}><b>🛡 Sigue {fmt(oracle.arr)}</b><span className="block text-sm text-[#9aa3b8]">El original no cambia.</span></button>
                  <button disabled={oRevealed} onClick={() => setOPick('mutado')} className={`rounded-xl border p-4 text-left ${oPick === 'mutado' ? 'border-red-400 bg-red-500/15' : 'border-white/10 bg-white/[.03]'}`}><b>💀 Se muta a {fmt(oracleSorted)}</b><span className="block text-sm text-[#9aa3b8]">El original queda ordenado.</span></button>
                </div>
                {oRevealed && <div className="mt-3 rounded-xl border border-white/10 bg-black/30 p-3 mono text-sm">Resultado real — Original después: <b className={oracle.op === 'sort' ? 'text-[#ff4d6d]' : 'text-emerald-300'}>{oracle.op === 'sort' ? fmt(oracleSorted) + ' MUTADO' : fmt(oracle.arr) + ' INTACTO'}</b> · Copia: {fmt(oracleSorted)}</div>}
                <div className="mt-3 flex flex-wrap gap-2">{!oRevealed ? <button onClick={revealOracle} className="btn-gold rounded-lg px-5 py-2">🔮 Revelar predicción</button> : !oDone ? <button onClick={nextOracle} className="btn-gold rounded-lg px-5 py-2">Siguiente ronda →</button> : <button onClick={() => setLevel(4)} className="btn-gold rounded-lg px-5 py-2">Ir al Nivel 4 →</button>}</div>
                <div className="mt-3 mono text-xs bg-black/40 rounded-lg p-3">arr.sort((a,b)=&gt;a-b) // arr → [1,2,3] MUTADO<br />arr.toSorted((a,b)=&gt;a-b) // arr → [3,1,2] INTACTO</div>
              </div>
            )}
            {level === 4 && (
              <div>
                <p className="text-xs tracking-widest text-[#a855f7] font-bold">NIVEL 4 · ESCRIBIR · COMPARADOR PERDIDO</p>
                <h2 className="text-2xl font-bold mt-1">El Comparador Perdido</h2>
                <p className="text-[#cbd5e1] mt-1">Ordena por <b>poder ascendente</b> sin mutar el original. Si empatan en poder, por <b>nombre alfabético</b>. Los poderes son strings con ⚔.</p>
                <div className="mt-4 flex flex-wrap gap-2">{HEROES.map(h => <span key={h.nombre} className="rounded-full border border-white/15 bg-white/[.04] px-3 py-1.5 text-sm"><span className="mr-1">{h.emoji}</span>{h.nombre} <span className="mono text-[#f5c451]">{h.poder}</span></span>)}</div>
                <label className="block mt-4 text-sm font-bold" htmlFor="comparador">Escribe tu comparador</label>
                <input id="comparador" value={l4Code} onChange={e => setL4Code(e.target.value)} className="mono mt-1 w-full rounded-xl border border-[#f5c451]/40 bg-black/50 px-3 py-3 text-sm [overflow-wrap:anywhere]" placeholder="(a,b) => ..." />
                <p className="mt-2 text-xs text-[#9aa3b8]">Ejemplo de forma: (a,b) =&gt; … · Intentos: {l4Attempts}</p>
                {l4Help && <div className="mt-3 rounded-xl border border-[#f5c451]/40 bg-[#f5c451]/10 p-3 text-sm space-y-1"><p>💡 Pista 1: Los poderes son strings con símbolo → necesitas <b>parseInt</b>.</p><p>💡 Pista 2: Si empatan en poder, ordena por nombre → <b>localeCompare</b>.</p></div>}
                {l4Result && <p className="mt-3 rounded-xl bg-black/30 p-3 text-sm [overflow-wrap:anywhere]">Tu copia: <b>{l4Result}</b></p>}
                <div className="mt-3 flex flex-wrap gap-2"><button onClick={() => setL4Help(true)} className="btn-ghost rounded-lg px-4 py-2 font-bold">💡 Ayuda {l4Help ? '· mostrada' : ''}</button><button onClick={checkL4} className="btn-gold rounded-lg px-5 py-2">✓ Comprobar comparador</button></div>
                <div className="mt-3 mono text-xs bg-black/40 rounded-lg p-3">const copia = heroes.toSorted((a,b)=&gt;parseInt(a.poder)-parseInt(b.poder) || a.nombre.localeCompare(b.nombre))</div>
                <p className="mt-2 text-xs text-[#9aa3b8]">Orden correcto: Sylas 60 → Bren 80 → Lyra 80 → Kael 100 → Mordo 100 · Con Ayuda y acierto: +5 · Sin Ayuda: +15</p>
              </div>
            )}
            {level === 5 && (
              <div>
                <p className="text-xs tracking-widest text-[#a855f7] font-bold">NIVEL 5 · TEST FINAL · SELLO DEL GRIMORIO</p>
                <h2 className="text-2xl font-bold mt-1">El Sello del Grimorio</h2>
                <p className="text-[#cbd5e1] mt-1">Ronda {sRound + 1} de 3. Ordena <b>menor a mayor SIN mutar</b>. Elige una opción: el juego ejecuta tu elección.</p>
                <div className="mt-4 text-center panel !rounded-xl p-4"><p className="text-xs text-[#9aa3b8]">ARRAY ORIGINAL</p><p className="mono text-2xl mt-1">{fmt(sealArr)}</p>{sMutated && <p className="text-sm text-[#ff4d6d] font-bold mt-1">💀 ORIGINAL MUTADO — el grimorio se destruyó</p>}</div>
                <div className="mt-3 space-y-2">
                  {([['sort', 'original.sort((a,b)=>a-b)'], ['toSorted', 'const copia = original.toSorted((a,b)=>a-b)'], ['spread', 'const copia = [...original].sort((a,b)=>a-b)']] as const).map(([key, code]) => (
                    <button key={key} disabled={sRevealed && sChoice !== key} onClick={() => chooseSeal(key)} className={`w-full text-left rounded-xl border p-3 mono text-sm [overflow-wrap:anywhere] ${sChoice === key ? (key === 'sort' ? 'border-red-400 bg-red-500/15' : 'border-emerald-400 bg-emerald-500/15') : 'border-white/10 bg-white/[.03]'}`}>
                      <span className="mr-2">{key === 'sort' ? '☐' : '☐'}</span>{code} <span className="text-[#9aa3b8]">{key === 'sort' ? '· −10' : key === 'toSorted' ? '· +15' : '· +10'}</span>
                    </button>))}
                </div>
                {sRevealed && <div className="mt-3 rounded-xl bg-black/30 p-3 mono text-sm">Original después: <b className={sMutated ? 'text-[#ff4d6d]' : 'text-emerald-300'}>{sMutated ? fmt([...sealArr].sort((a, b) => a - b)) + ' MUTADO' : fmt(sealArr) + ' INTACTO'}</b> · Copia: {fmt([...sealArr].sort((a, b) => a - b))}</div>}
                <div className="mt-3 flex flex-wrap gap-2">{sMutated && <button onClick={restoreSeal} className="btn-danger rounded-lg px-4 py-2 font-bold">📖 Restaurar grimorio</button>}{sRevealed && !sMutated && sRound < 2 && <button onClick={nextSeal} className="btn-gold rounded-lg px-5 py-2">Siguiente ronda →</button>}{sRevealed && !sMutated && sRound === 2 && <button onClick={() => setLevel(1)} className="btn-gold rounded-lg px-5 py-2">🏆 Volver a jugar</button>}</div>
                <div className="mt-3 mono text-xs bg-black/40 rounded-lg p-3">const copia = original.toSorted((a,b)=&gt;a-b); // original → {fmt(sealArr)} INTACTO<br />// copia → {fmt([...sealArr].sort((a, b) => a - b))}</div>
              </div>
            )}
            {feedback && <div role="status" className={`mt-4 rounded-xl border p-3 text-[15px] leading-relaxed [overflow-wrap:anywhere] ${feedback.ok ? 'border-emerald-400/50 bg-emerald-500/10' : 'border-red-400/50 bg-red-500/10'}`}>{feedback.text}</div>}
          </div>

          {/* PANEL INMUTABILIDAD */}
          <section className="panel p-4 border-[#f5c451]/40" aria-label="Panel de inmutabilidad">
            <h3 className="font-bold text-[#f5c451]">🔍 PANEL DE INMUTABILIDAD</h3>
            <p className="mono mt-2 text-sm leading-relaxed [overflow-wrap:anywhere]">Original: [3,1,2] → sigue [3,1,2] <span className="text-emerald-300 font-bold">INTACTO</span> | Copia: [1,2,3] <span className="text-[#f5c451]">ORDENADA</span> | <b>toSorted() NO muta. sort() SÍ muta.</b></p>
            <p className="mt-2 text-xs text-[#9aa3b8]">Nivel actual · Original: <span className="mono">{originalPreview}</span> · La copia es la que cambia, nunca el grimorio.</p>
          </section>
        </section>

        {/* DERECHA */}
        <aside className="lg:sticky lg:top-24">
          <section className="panel p-4" aria-label="Depurador avanzado">
            <div className="flex items-center justify-between"><h2 className="font-bold text-[#a855f7]">🛠 DEPURADOR AVANZADO: .toSorted()</h2><button onClick={() => setLogs([{ text: '> Consola limpia. El grimorio espera.', kind: 'info' }])} className="btn-ghost rounded-lg px-2 py-1 text-xs font-bold">Limpiar</button></div>
            <div className="mono mt-3 h-[380px] lg:h-[520px] overflow-y-auto rounded-xl bg-black/60 border border-white/10 p-3 text-[12px] leading-relaxed space-y-2" aria-live="polite">
              {logs.map((l, i) => <p key={i} className={`${l.kind === 'ok' ? 'text-emerald-300' : l.kind === 'bad' ? 'text-[#ff8fa3]' : l.kind === 'code' ? 'text-[#f5c451]' : 'text-[#cbd5e1]'} [overflow-wrap:anywhere]`}>{l.text}</p>)}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-center text-xs">
              <div className="rounded-lg bg-white/[.04] p-2"><b className="block text-base">{points}</b>Puntos</div>
              <div className="rounded-lg bg-white/[.04] p-2"><b className="block text-base">{solved.length}/5</b>Niveles</div>
              <div className="rounded-lg bg-white/[.04] p-2"><b className="block text-base">{streak}</b>Racha</div>
            </div>
            <p className="mt-3 text-xs text-[#9aa3b8]">En cada comprobación el depurador muestra la ejecución, el original antes y después, la copia creada y las comparaciones.</p>
          </section>
        </aside>
      </main>
      <footer className="mx-auto max-w-[1500px] px-3 sm:px-5 pb-8 text-center text-xs text-[#9aa3b8]">📖 El Grimorio del Héroe Caído · Kael · * En Nivel 4, con Ayuda y acierto: +5. Sin Ayuda: +15. · Tu progreso se guarda en esta partida.</footer>
    </div>
  );
}
