import { useState, useEffect, useRef } from 'react';
import './JuegoBestia.css';

const TIPOS_ITEM = [
  { icon: "🍄", type: "Comida", name: "Hongo" }, { icon: "🍎", type: "Comida", name: "Manzana" },
  { icon: "🗡️", type: "Arma", name: "Espada" }, { icon: "🪓", type: "Arma", name: "Hacha" },
  { icon: "🧪", type: "Poción", name: "Poción" }, { icon: "⚗️", type: "Poción", name: "Elixir" },
  { icon: "🛡️", type: "Defensa", name: "Escudo" }, { icon: "🥊", type: "Defensa", name: "Guante" }
];

export default function JuegoBestia() {
  const [gameState, setGameState] = useState('start'); // start, playing, win, lose
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [highScore, setHighScore] = useState(parseInt(localStorage.getItem('escapeBeastHighScore')) || 0);
  
  const [beastProgress, setBeastProgress] = useState(0);
  const [mission, setMission] = useState(null);
  const [logs, setLogs] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const timerRef = useRef(null);
  const consoleRef = useRef(null);
  const beastProgressRef = useRef(0);
  const gameStateRef = useRef(gameState);

  useEffect(() => {
    gameStateRef.current = gameState;
  }, [gameState]);

  useEffect(() => {
    if (consoleRef.current) consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
  }, [logs]);

  // La persecución vive en un intervalo: decide el final fuera del actualizador
  // de estado, así StrictMode no puede duplicar el game over ni los logs.
  useEffect(() => {
    if (gameState !== 'playing' || isAnimating) return;

    timerRef.current = setInterval(() => {
      const next = Math.min(beastProgressRef.current + (mission?.speed || 1), 100);
      beastProgressRef.current = next;
      setBeastProgress(next);

      if (next >= 100) {
        clearInterval(timerRef.current);
        setGameState('lose');
        setCombo(0);
        setLogs(prev => [...prev, { text: '💀 La bestia te atrapó por ser muy lento.', type: 'error' }]);
      }
    }, 100);

    return () => clearInterval(timerRef.current);
  }, [gameState, isAnimating, mission]);

  const sleep = (ms) => new Promise(res => setTimeout(res, ms));

  const generateRandomItems = (count) => {
    return Array.from({ length: count }, () => {
      const base = TIPOS_ITEM[Math.floor(Math.random() * TIPOS_ITEM.length)];
      return { ...base, power: Math.floor(Math.random() * 50) + 20 };
    });
  };

  const generateMission = (lvl) => {
    const speed = 1.0 + (lvl * 0.15);
    if (lvl >= 3 && Math.random() < 0.15) {
      const powerTarget = 200 + (lvl * 10);
      return {
        desc: `¡TRAMPA! El código pide poder > ${powerTarget}. Nada lo cumple. ¡Huye a la caja 'undefined'!`,
        code: `<span style="color:#ff7b72">const</span> escape = items.<span style="color:#d2a8ff">find</span>(item => item.power > <span style="color:#79c0ff">${powerTarget}</span>);`,
        evaluator: (item) => item.power > powerTarget,
        items: generateRandomItems(3),
        speed,
        isTrap: true
      };
    }
    const type = Math.floor(Math.random() * 3);
    let conditionStr, evaluator, desc, items = generateRandomItems(3);
    if (type === 0) {
      const targetType = TIPOS_ITEM[Math.floor(Math.random() * TIPOS_ITEM.length)].type;
      conditionStr = `item.type === "${targetType}"`;
      evaluator = (item) => item.type === targetType;
      desc = `Encuentra el primer ítem de tipo "${targetType}"`;
      if (!items.some(evaluator)) items[Math.floor(Math.random()*3)] = { ...TIPOS_ITEM.find(t => t.type === targetType), power: 50 };
    } else if (type === 1) {
      const targetPower = Math.floor(Math.random() * 40) + 40;
      conditionStr = `item.power > ${targetPower}`;
      evaluator = (item) => item.power > targetPower;
      desc = `Busca un ítem con poder mayor a ${targetPower}`;
      if (!items.some(evaluator)) items[Math.floor(Math.random()*3)].power = targetPower + 10;
    } else {
      const targetType = TIPOS_ITEM[Math.floor(Math.random() * TIPOS_ITEM.length)].type;
      const targetPower = Math.floor(Math.random() * 30) + 50;
      conditionStr = `item.type === "${targetType}" && item.power > ${targetPower}`;
      evaluator = (item) => item.type === targetType && item.power > targetPower;
      desc = `Busca un/a ${targetType} con poder > ${targetPower}`;
      if (!items.some(evaluator)) {
        const newItem = { ...TIPOS_ITEM.find(t => t.type === targetType), power: targetPower + 10 };
        items[Math.floor(Math.random()*3)] = newItem;
      }
    }
    return { desc, code: `<span style="color:#ff7b72">const</span> escape = items.<span style="color:#d2a8ff">find</span>(item => ${conditionStr});`, evaluator, items, speed };
  };

  const startGame = () => {
    setScore(0);
    setCombo(0);
    startLevel(0);
  };

  // AQUÍ ESTABA EL ERROR: Faltaba setGameState('playing')
  const startLevel = (lvl) => {
    setGameState('playing'); // <-- ESTO ARREGLA EL BOTÓN
    setLevel(lvl);
    setMission(generateMission(lvl));
    beastProgressRef.current = 0;
    setBeastProgress(0);
    setIsAnimating(false);
    setLogs([{ text: '> ¡La bestia te persigue! Encuentra el ítem correcto.', type: 'info' }]);
  };

  const handleBoxClick = async (index, isUndefined = false) => {
    if (isAnimating || gameState !== 'playing') return;
    setIsAnimating(true);
    
    setLogs(prev => [...prev, { text: `> Seleccionaste: ${isUndefined ? '[undefined]' : mission.items[index].name}`, type: 'info' }]);
    
    let foundIndex = -1;
    for (let i = 0; i < mission.items.length; i++) {
      await sleep(400);
      if (mission.evaluator(mission.items[i])) {
        foundIndex = i;
        setLogs(prev => [...prev, { text: `✅ find() devolvió: ${mission.items[i].name}.`, type: 'success' }]);
        break;
      }
    }

    await sleep(500);

    // La bestia pudo atraparnos mientras se reproducía la animación.
    if (gameStateRef.current !== 'playing') return;

    if (mission.isTrap) {
      if (isUndefined && foundIndex === -1) {
        levelWin();
      } else {
        gameOver("El find() no encontró nada (undefined). Debiste hacer clic en la caja 'undefined'.");
      }
    } else {
      if (!isUndefined && index === foundIndex) {
        levelWin();
      } else {
        const foundItem = foundIndex !== -1 ? mission.items[foundIndex] : null;
        gameOver(
          foundItem
            ? `Elegiste mal. find() encontró: ${foundItem.name} (Índice ${foundIndex}).`
            : 'Elegiste mal. find() no encontró ningún elemento y devolvió undefined.'
        );
      }
    }
  };

  const levelWin = () => {
    setGameState('win');
    clearInterval(timerRef.current);
    const newCombo = combo + 1;
    setCombo(newCombo);
    const timeBonus = Math.max(0, 100 - Math.floor(beastProgressRef.current));
    const earned = (100 + timeBonus) * newCombo;
    const newScore = score + earned;
    setScore(newScore);

    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem('escapeBeastHighScore', String(newScore));
    }
  };

  const gameOver = (msg) => {
    setGameState('lose');
    clearInterval(timerRef.current);
    setCombo(0);
    setLogs(prev => [...prev, { text: `💀 ${msg}`, type: 'error' }]);
  };

  if (gameState === 'start') {
    return (
      <div className="bj-container">
        <div className="bj-game-container">
          <div className="bj-start-screen">
            <h1>🏃‍♂️ Escapa de la Bestia</h1>
            <p>La bestia te persigue sin fin. Usa tu conocimiento de <code>Array.prototype.find()</code> para encontrar el ítem correcto antes de que te atrape. ¡Los niveles son infinitos!</p>
            <div style={{ fontFamily: 'var(--font-code)', background: '#222', padding: '8px 16px', borderRadius: '8px', color: 'var(--accent-yellow)', border: '1px solid #444' }}>🏆 Récord: {highScore} XP</div>
            <button className="bj-btn-main" style={{ display: 'block', marginTop: '20px' }} onClick={startGame}>¡Comenzar a Correr! 🏁</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bj-container">
      <div className="bj-game-container">
        <div className="bj-header">
          <div className="bj-title">🏃‍♂️ Escapa de la Bestia</div>
          <div className="bj-stats-group">
            <div className="bj-stat-badge blue">Nivel {level + 1}</div>
            {combo > 0 && <div className="bj-stat-badge" style={{color: 'var(--accent-green)'}}>🔥 x{combo}</div>}
            <div className="bj-stat-badge">🏆 {score} XP</div>
          </div>
          <div className="bj-beast-health-container">
            <div className="bj-beast-health-label">Peligro</div>
            <div className="bj-beast-health-bar"><div className="bj-beast-fill" style={{ width: `${beastProgress}%` }}></div></div>
          </div>
        </div>

        <div className="bj-scenario">
          <div className={`bj-hero ${beastProgress > 30 ? 'danger' : ''}`}>🏃‍♂️💨</div>
          <div className="bj-beast" style={{ bottom: beastProgress > 60 ? '30px' : '-80px' }}>🐺</div>
        </div>

        <div className="bj-mission-panel">
          <div className="bj-mission-desc">{mission?.desc}</div>
          <div className="bj-code-line" dangerouslySetInnerHTML={{ __html: mission?.code }} />
        </div>

        <div className="bj-boxes-grid">
          {mission?.items.map((item, i) => (
            <div key={i} className="bj-box" onClick={() => handleBoxClick(i, false)}>
              <span className="bj-id-badge">[{i}]</span>
              <div className="bj-item-icon">{item.icon}</div>
              <div className="bj-item-name">{item.name}</div>
            </div>
          ))}
          {mission?.isTrap && (
            <div className="bj-box bj-box-undefined" onClick={() => handleBoxClick(-1, true)}>
              <span className="bj-id-badge">[?]</span>
              <div className="bj-item-icon">∅</div>
              <div className="bj-item-name" style={{ color: 'var(--accent-red)', fontWeight: 'bold' }}>undefined</div>
            </div>
          )}
        </div>

        <div className="bj-console-panel" ref={consoleRef}>
          {logs.map((l, i) => <div key={i} style={{ color: l.type === 'success' ? 'var(--accent-green)' : l.type === 'error' ? 'var(--accent-red)' : 'inherit', fontWeight: l.type !== 'info' ? 'bold' : 'normal', marginBottom: '6px' }}>{l.text}</div>)}
        </div>

        {(gameState === 'win' || gameState === 'lose') && (
          <div className="bj-overlay">
            <h2 className={gameState === 'win' ? 'bj-title-win' : 'bj-title-lose'}>
              {gameState === 'win' ? '¡NIVEL SUPERADO!' : '¡TE ATRAPÓ!'}
            </h2>
            <p>{gameState === 'win' ? `+${(100 + Math.max(0, 100 - Math.floor(beastProgress))) * combo} XP. Prepárate para el siguiente.` : `Llegaste al nivel ${level + 1}. Récord: ${highScore} XP.`}</p>
            <button className={`bj-btn-main ${gameState === 'lose' ? 'green' : ''}`} onClick={gameState === 'win' ? () => startLevel(level + 1) : startGame}>
              {gameState === 'win' ? 'Siguiente Nivel ➔' : 'Volver a Jugar 🔄'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}