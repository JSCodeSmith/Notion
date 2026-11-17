import { useState } from 'react'
import './JuegosEmbebidos.css'

/* Envuelve los juegos HTML de push() y reverse() guardados en /public/apuntes. */

const JUEGOS = {
  push: {
    titulo: 'Push · juegos embebidos',
    kicker: 'Array.prototype.push()',
    icon: '📥',
    descripcion:
      'Añade elementos al final del array. En estos juegos cada avance empuja un nuevo elemento a la pila de la partida.',
    consejo:
      'push() modifica el array original y devuelve la nueva longitud. Fíjate en cómo el juego «apila» avances: cada acción suma un elemento más.',
    juegos: [
      {
        id: 'goku-runner',
        nombre: '🏃 Goku Runner',
        metodo: 'push()',
        descripcion: 'Runner infinito: cada obstáculo superado suma un registro a la partida.',
        src: '/apuntes/push/MarioPush.html',
        controles: 'Flechas / espacio para saltar. Si el juego no responde, pulsa dentro del marco.',
      },
      {
        id: 'goku-zombies',
        nombre: '🧟 Goku vs Zombies',
        metodo: 'push()',
        descripcion: 'Defiende la línea: los enemigos se acumulan al final de la cola.',
        src: '/apuntes/push/deepseek_html_20261116_219b9b (1).html',
        controles: 'Sigue las instrucciones en pantalla. Pulsa dentro del marco para darle foco.',
      },
    ],
  },
  reverse: {
    titulo: 'Reverse · juegos embebidos',
    kicker: 'Array.prototype.reverse()',
    icon: '🔄',
    descripcion:
      'Invierte el orden de los elementos del array. Los juegos giran, voltean y reordenan para que practiques la idea.',
    consejo:
      'reverse() invierte el array en el mismo lugar (in-place) y devuelve la misma referencia. Si necesitas conservar el original, combina con slice() o toReversed().',
    juegos: [
      {
        id: 'reverse-game',
        nombre: '🔁 Juego Reverse',
        metodo: 'reverse()',
        descripcion: 'Voltea la secuencia para resolver el reto.',
        src: '/apuntes/reverse/JuegoReverse.html',
        controles: 'Usa los botones del juego. Pulsa dentro del marco para activar el teclado.',
      },
      {
        id: 'lego-lab',
        nombre: '🧱 LEGO Cyber Lab',
        metodo: 'reverse()',
        descripcion: 'Laboratorio con piezas que se invierten paso a paso.',
        src: '/apuntes/reverse/torreReverse.html',
        controles: 'Interactúa con las piezas en pantalla. Pulsa dentro del marco si no responde.',
      },
    ],
  },
}

const rutaSegura = (src) => src.replace(/ /g, '%20').replace(/\(/g, '%28').replace(/\)/g, '%29')

export default function JuegosEmbebidos({ tipo = 'push' }) {
  const data = JUEGOS[tipo] ?? JUEGOS.push
  const [activo, setActivo] = useState(data.juegos[0].id)
  const [recarga, setRecarga] = useState(0)
  const juego = data.juegos.find((j) => j.id === activo) ?? data.juegos[0]

  return (
    <section className={`jem jem--${tipo}`}>
      <header className="jem__head">
        <div className="jem__brand">
          <span className="jem__icon">{data.icon}</span>
          <div>
            <span className="jem__kicker">{data.kicker} · juegos</span>
            <h3>{data.titulo}</h3>
            <p>{data.descripcion}</p>
          </div>
        </div>
        <a
          className="jem__open"
          href={rutaSegura(juego.src)}
          target="_blank"
          rel="noreferrer"
        >
          ↗ Abrir en pestaña nueva
        </a>
      </header>

      <div className="jem__tabs" role="tablist" aria-label={`Juegos de ${tipo}`}>
        {data.juegos.map((j) => (
          <button
            key={j.id}
            type="button"
            role="tab"
            aria-selected={activo === j.id}
            className={`jem__tab ${activo === j.id ? 'is-active' : ''}`}
            onClick={() => {
              setActivo(j.id)
              setRecarga(0)
            }}
          >
            <strong>{j.nombre}</strong>
            <small>{j.metodo}</small>
          </button>
        ))}
      </div>

      <div className="jem__game">
        <div className="jem__frame-head">
          <div>
            <strong>{juego.nombre}</strong>
            <span>{juego.descripcion}</span>
          </div>
          <button
            type="button"
            className="jem__reload"
            onClick={() => setRecarga((n) => n + 1)}
            title="Reiniciar el juego"
          >
            ↺ Reiniciar
          </button>
        </div>
        <iframe
          key={`${juego.id}-${recarga}`}
          className="jem__iframe"
          src={rutaSegura(juego.src)}
          title={juego.nombre}
          loading="lazy"
          allow="fullscreen; autoplay; gamepad"
          sandbox="allow-scripts allow-same-origin allow-pointer-lock allow-popups"
        />
      </div>

      <div className="jem__foot">
        <p><strong>🎮 Controles:</strong> {juego.controles}</p>
        <p><strong>💡 Idea clave:</strong> {data.consejo}</p>
      </div>
    </section>
  )
}
