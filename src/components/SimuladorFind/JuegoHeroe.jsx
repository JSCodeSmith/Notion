import { useState, useEffect, useRef } from 'react';
import './JuegoHeroe.css';

// HÉROES AMPLIADOS (JSON de datos)
const HEROES = [
  { id: 1, nombre: "Aragorn", clase: "Guerrero", poder: 85, avatar: "🗡️" },
  { id: 2, nombre: "Gandalf", clase: "Mago", poder: 100, avatar: "🧙‍♂️" },
  { id: 3, nombre: "Legolas", clase: "Arquero", poder: 78, avatar: "🏹" },
  { id: 4, nombre: "Boromir", clase: "Guerrero", poder: 70, avatar: "🛡️" },
  { id: 5, nombre: "Galadriel", clase: "Mago", poder: 95, avatar: "🧝‍♀️" },
  { id: 6, nombre: "Gimli", clase: "Guerrero", poder: 75, avatar: "🪓" },
  { id: 7, nombre: "Frodo", clase: "Hobbit", poder: 30, avatar: "💍" },
  { id: 8, nombre: "Sam", clase: "Hobbit", poder: 35, avatar: "🍳" },
  { id: 9, nombre: "Saruman", clase: "Mago", poder: 98, avatar: "🔮" },
  { id: 10, nombre: "Sauron", clase: "Maia", poder: 150, avatar: "👁️" }
];

// MISIONES DE HISTORIA AMPLIADAS (10 Desafíos)
const STORY_MISSIONS = [
  { text: "Encuentra al primer Guerrero", code: 'heroes.find(h => h.clase === "Guerrero")', evaluator: (h) => h.clase === "Guerrero" },
  { text: "Encuentra al primer Mago", code: 'heroes.find(h => h.clase === "Mago")', evaluator: (h) => h.clase === "Mago" },
  { text: "Encuentra al primer Arquero", code: 'heroes.find(h => h.clase === "Arquero")', evaluator: (h) => h.clase === "Arquero" },
  { text: "Encuentra al primer Hobbit", code: 'heroes.find(h => h.clase === "Hobbit")', evaluator: (h) => h.clase === "Hobbit" },
  { text: "Encuentra un héroe con poder mayor a 90", code: 'heroes.find(h => h.poder > 90)', evaluator: (h) => h.poder > 90 },
  { text: "Encuentra un héroe con poder menor a 50", code: 'heroes.find(h => h.poder < 50)', evaluator: (h) => h.poder < 50 },
  { text: "Encuentra un Mago con poder mayor a 95", code: 'heroes.find(h => h.clase === "Mago" && h.poder > 95)', evaluator: (h) => h.clase === "Mago" && h.poder > 95 },
  { text: "Encuentra al primer Elfo (si no hay, undefined)", code: 'heroes.find(h => h.clase === "Elfo")', evaluator: (h) => h.clase === "Elfo", isTrick: true },
  { text: "Encuentra un Maia", code: 'heroes.find(h => h.clase === "Maia")', evaluator: (h) => h.clase === "Maia" },
  { text: "TRAMPA: Encuentra a un héroe con poder > 200", code: 'heroes.find(h => h.poder > 200)', evaluator: (h) => h.poder > 200, isTrick: true }
];

export default function JuegoHeroe() {
  const [gameState, setGameState] = useState('start'); 
  const [mode, setMode] = useState('campaign');
  const [level, setLevel] = useState(0);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [mission, setMission] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [roundState, setRoundState] = useState('playing'); 
  const [logs, setLogs] = useState([]);
  const [shake, setShake] = useState(false);

  const consoleEndRef = useRef(null);

  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollTop = consoleEndRef.current.scrollHeight;
    }
  }, [logs]);

  const sleep = (ms) => new Promise(res => setTimeout(res, ms));

  const generateCampaignMission = (lvl) => {
    const rand = Math.random();
    if (lvl > 2 && lvl % 4 === 0) {
      return { text: "Encuentra a un héroe con poder > 300", code: 'heroes.find(h => h.poder > 300)', evaluator: (h) => h.poder > 300, isTrick: true };
    }
    if (rand < 0.3) {
      const clases = ["Mago", "Guerrero", "Arquero", "Hobbit"];
      const target = clases[Math.floor(Math.random() * clases.length)];
      return { text: `Encuentra al primer ${target}`, code: `heroes.find(h => h.clase === "${target}")`, evaluator: (h) => h.clase === target };
    } else if (rand < 0.6) {
      const min = Math.floor(Math.random() * 50) + 40;
      return { text: `Encuentra al primer héroe con poder > ${min}`, code: `heroes.find(h => h.poder > ${min})`, evaluator: (h) => h.poder > min };
    } else {
      return { text: "Encuentra al primer Guerrero con poder > 80", code: 'heroes.find(h => h.clase === "Guerrero" && h.poder > 80)', evaluator: (h) => h.clase === "Guerrero" && h.poder > 80 };
    }
  };

  const startGame = (selectedMode) => {
    setMode(selectedMode);
    setLevel(0);
    setXp(0);
    setStreak(0);
    setLives(3);
    setGameState('playing');
    setRoundState('playing');
    startRound(selectedMode, 0);
  };

  const startRound = (currentMode = mode, currentLevel = level) => {
    if (currentMode === 'story' && currentLevel >= STORY_MISSIONS.length) {
      setGameState('gameover'); 
      return;
    }
    setIsAnimating(false);
    setRoundState('playing');
    const newMission = currentMode === 'story' ? STORY_MISSIONS[currentLevel] : generateCampaignMission(currentLevel + 1);
    setMission(newMission);
    setLogs([{ text: '> Haz clic en el héroe que creas correcto.', type: 'info' }]);
  };

  const handleHeroClick = async (index, isUndefined = false) => {
    if (isAnimating || roundState !== 'playing') return;
    setIsAnimating(true);
    setLogs(prev => [...prev, { text: `> Seleccionaste: ${isUndefined ? 'undefined' : HEROES[index].nombre}.`, type: 'info' }, { text: '> Ejecutando find()...', type: 'info' }]);
    
    await sleep(600);

    let foundIndex = -1;
    for (let i = 0; i < HEROES.length; i++) {
      setLogs(prev => [...prev, { text: `> Evaluando a ${HEROES[i].nombre}...`, type: 'eval' }]);
      await sleep(300);
      if (mission.evaluator(HEROES[i])) {
        foundIndex = i;
        setLogs(prev => [...prev, { text: `✅ ¡Cortocircuito! Encontrado.`, type: 'success' }]);
        break;
      }
    }

    await sleep(400);

    let won = false;
    if (mission.isTrick) {
      won = isUndefined && foundIndex === -1;
    } else {
      won = !isUndefined && index === foundIndex;
    }

    if (won) {
      setStreak(s => s + 1);
      const earned = 50 + (streak * 10);
      setXp(x => x + earned);
      setLogs(prev => [...prev, { text: `🏆 ¡Correcto! +${earned} XP.`, type: 'success' }]);
      setRoundState('won');
    } else {
      setStreak(0);
      const newLives = lives - 1;
      setLives(newLives);
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setLogs(prev => [...prev, { text: `❌ Incorrecto. find() se detuvo en ${foundIndex !== -1 ? HEROES[foundIndex].nombre : 'undefined'}.`, type: 'error' }]);
      
      if (newLives <= 0) {
        setRoundState('gameover');
      } else {
        setRoundState('lost');
      }
    }

    setIsAnimating(false);
  };

  const nextRound = () => {
    const nextLvl = level + 1;
    setLevel(nextLvl);
    startRound(mode, nextLvl);
  };

  if (gameState === 'start') {
    return (
      <div className="jh-container">
        <div className="jh-game-container">
          <div className="jh-start-screen">
            <h1>La Búsqueda del Héroe</h1>
            <p>Aprende a usar Array.prototype.find() adivinando quién será el primero en cumplir la condición. ¡Cuidado, a veces no hay nadie y devuelve undefined!</p>
            <button className="jh-btn-mode" onClick={() => startGame('campaign')}><span>🗺️ Modo Campaña</span><span className="jh-mode-desc">Niveles progresivos</span></button>
            <button className="jh-btn-mode" onClick={() => startGame('story')}><span>📖 Modo Historia</span><span className="jh-mode-desc">10 misiones desafiantes</span></button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="jh-container">
      <div className={`jh-game-container ${shake ? 'jh-shake' : ''}`}>
        <div className="jh-header">
          <div className="jh-title">⚔️ La Búsqueda del Héroe</div>
          <div className="jh-stats">
            {streak > 1 && <div className="jh-badge jh-badge-streak">🔥 Racha: {streak}</div>}
            <div className="jh-badge jh-badge-lives">❤️ {lives}</div>
            <div className="jh-badge jh-badge-xp">{xp} XP</div>
          </div>
        </div>

        <div className="jh-mission-board">
          <div className="jh-mission-label">Misión Actual {level + 1}</div>
          <div className="jh-mission-text">{mission?.text}</div>
          <div className="jh-mission-condition">{mission?.code}</div>
        </div>

        <div className="jh-heroes-grid">
          {HEROES.map((hero, i) => (
            <div key={i} className="jh-hero-card" onClick={() => handleHeroClick(i)}>
              <div className="jh-hero-avatar">{hero.avatar}</div>
              <div className="jh-hero-name">{hero.nombre}</div>
              <div className="jh-hero-class">{hero.clase}</div>
              <div className="jh-hero-stats">Poder: {hero.poder}</div>
            </div>
          ))}
          {mission?.isTrick && (
            <div className="jh-hero-card jh-card-undefined" onClick={() => handleHeroClick(-1, true)}>
              <div className="jh-hero-avatar" style={{fontSize:'1.8rem', color:'var(--accent-red)'}}>∅</div>
              <div className="jh-hero-name">undefined</div>
              <div className="jh-hero-stats">(No encontrado)</div>
            </div>
          )}
        </div>

        <div className="jh-playground">
          <div className="jh-panel">
            <div className="jh-panel-header"><span style={{color:'var(--accent-green)'}}>●</span> heroes.find()</div>
            <div className="jh-code-block" dangerouslySetInnerHTML={{__html: `<span style="color:#ff7b72;">const</span> <span style="color:#79c0ff;">resultado</span> = <span style="color:#d2a8ff;">${mission?.code.replace('heroes.', '')}</span>;`}} />
          </div>
          <div className="jh-panel">
            <div className="jh-panel-header"><span style={{color:'var(--accent-blue)'}}>●</span> Consola</div>
            <div className="jh-console">
              {logs.map((l, i) => <div key={i} style={{color: l.type==='success'?'var(--accent-green)':l.type==='error'?'var(--accent-red)':l.type==='eval'?'var(--accent-yellow)':'inherit', marginBottom: '4px'}}>{l.text}</div>)}
              <div ref={consoleEndRef} />
            </div>
          </div>
        </div>

        {/* BARRA DE ACCIONES - SIEMPRE VISIBLE PARA EVITAR SALTOS */}
        <div className="jh-action-bar" style={{ minHeight: '76px' }}>
          {roundState === 'playing' && (
            <button className="jh-btn-next" disabled style={{ opacity: 0.5, cursor: 'not-allowed' }}>
              Selecciona un Héroe...
            </button>
          )}
          {roundState === 'won' && (
            <button className="jh-btn-next" onClick={nextRound}>Siguiente Misión ➔</button>
          )}
          {roundState === 'lost' && (
            <button className="jh-btn-next" onClick={() => startRound()} style={{ background: 'var(--accent-red)', boxShadow: '0 4px 15px rgba(248, 81, 73, 0.3)' }}>Reintentar Misión 🔄</button>
          )}
          {roundState === 'gameover' && (
            <button className="jh-btn-next" onClick={() => setGameState('start')}>Volver al Inicio 🏠</button>
          )}
          <button className="jh-btn-restart" onClick={() => setGameState('start')}>Reiniciar Juego 🔄</button>
        </div>
      </div>
    </div>
  );
}