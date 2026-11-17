import { useMemo, useState } from 'react'
import './JuegosSome.css'

/* ================================================================== */
/* Juego de detective de gatos — some() sobre objetos                 */
/* ================================================================== */

const GATOS = [
  { nombre: 'Luna', emoji: '🐈‍⬛', color: 'negro', edad: 3, ojos: 'verdes', sueno: 14, raza: 'Siamés' },
  { nombre: 'Milo', emoji: '🐈', color: 'naranja', edad: 5, ojos: 'ámbar', sueno: 16, raza: 'Atigrado' },
  { nombre: 'Nina', emoji: '🐈', color: 'blanco', edad: 2, ojos: 'azules', sueno: 15, raza: 'Persa' },
  { nombre: 'Tofu', emoji: '🐈', color: 'gris', edad: 7, ojos: 'verdes', sueno: 13, raza: 'Azul ruso' },
  { nombre: 'Canela', emoji: '🐈', color: 'naranja', edad: 4, ojos: 'verdes', sueno: 17, raza: 'Bengalí' },
  { nombre: 'Pixel', emoji: '🐈‍⬛', color: 'negro', edad: 1, ojos: 'amarillos', sueno: 12, raza: 'Mestizo' },
]

const CASOS_GATOS = [
  {
    pregunta: '¿Hay algún gato negro en la camada?',
    criterio: 'gato.color === "negro"',
    test: (g) => g.color === 'negro',
    pista: 'some() se detiene en el primer gato que cumpla la condición.',
    nota: 'Luna y Pixel son negros. some() devuelve true en cuanto encuentra el primero (Luna).',
  },
  {
    pregunta: '¿Hay algún gato mayor de 6 años?',
    criterio: 'gato.edad > 6',
    test: (g) => g.edad > 6,
    pista: 'Compara la edad de cada gato con 6.',
    nota: 'Tofu tiene 7 años. Es el primero que supera los 6, así que some() devuelve true sin revisar a los demás.',
  },
  {
    pregunta: '¿Hay algún gato con ojos azules?',
    criterio: 'gato.ojos === "azules"',
    test: (g) => g.ojos === 'azules',
    pista: 'Solo uno de los seis tiene los ojos azules.',
    nota: 'Nina es la única con ojos azules: some() devuelve true.',
  },
  {
    pregunta: '¿Hay algún gato que duerma más de 18 horas al día?',
    criterio: 'gato.sueno > 18',
    test: (g) => g.sueno > 18,
    pista: 'El máximo de la camada es 17 horas.',
    nota: 'Ningún gato supera las 18 horas: some() recorre toda la lista y devuelve false.',
  },
  {
    pregunta: '¿Hay algún gato llamado «Nube»?',
    criterio: 'gato.nombre === "Nube"',
    test: (g) => g.nombre === 'Nube',
    pista: 'Repasa los nombres uno por uno.',
    nota: 'No existe ningún gato llamado Nube. Después de revisar todos, some() devuelve false.',
  },
  {
    pregunta: '¿Hay algún gato naranja con más de 4 años?',
    criterio: 'gato.color === "naranja" && gato.edad > 4',
    test: (g) => g.color === 'naranja' && g.edad > 4,
    pista: 'Necesitas que se cumplan las dos condiciones a la vez.',
    nota: 'Milo es naranja y tiene 5 años. Canela también es naranja, pero tiene 4 y no supera la condición. some() devuelve true.',
  },
  {
    pregunta: '¿Hay algún gato siamés en la camada?',
    criterio: 'gato.raza === "Siamés"',
    test: (g) => g.raza === 'Siamés',
    pista: 'Es la primera tarjeta de la lista.',
    nota: 'Luna es siamesa. some() devuelve true en el primer elemento y no necesita seguir.',
  },
]

function TableroGatos({ gatos, activos, revelado }) {
  return (
    <div className="jsg-grid">
      {gatos.map((g, i) => {
        const hit = revelado && activos.includes(i)
        return (
          <article
            key={g.nombre}
            className={`jsg-card ${hit ? 'is-hit' : ''}`}
            style={{ '--i': i }}
          >
            <span className="jsg-card__ava">{g.emoji}</span>
            <strong>{g.nombre}</strong>
            <ul>
              <li>Color: <b>{g.color}</b></li>
              <li>Edad: <b>{g.edad} años</b></li>
              <li>Ojos: <b>{g.ojos}</b></li>
              <li>Duerme: <b>{g.sueno} h</b></li>
            </ul>
            <span className="jsg-card__tag">{g.raza}</span>
            {hit && <span className="jsg-card__hit">✓ cumple</span>}
          </article>
        )
      })}
    </div>
  )
}

export function DetectiveGatos() {
  const [ronda, setRonda] = useState(0)
  const [respuesta, setRespuesta] = useState(null)
  const [aciertos, setAciertos] = useState(0)
  const [terminado, setTerminado] = useState(false)
  const [verArchivo, setVerArchivo] = useState(false)

  const caso = CASOS_GATOS[ronda]
  const activos = useMemo(
    () => GATOS.map((g, i) => (caso.test(g) ? i : -1)).filter((i) => i >= 0),
    [caso]
  )
  const correcta = activos.length > 0

  const responder = (valor) => {
    if (respuesta !== null) return
    setRespuesta(valor)
    if (valor === correcta) setAciertos((n) => n + 1)
  }

  const siguiente = () => {
    if (ronda < CASOS_GATOS.length - 1) {
      setRonda((n) => n + 1)
      setRespuesta(null)
      return
    }
    setTerminado(true)
  }

  const reiniciar = () => {
    setRonda(0)
    setRespuesta(null)
    setAciertos(0)
    setTerminado(false)
  }

  return (
    <section className="jsg jsg--gatos">
      <header className="jsg__head">
        <div className="jsg__brand">
          <img className="jsg__photo jsg__photo--round" src="/apuntes/some/gatos.png" alt="Tablero de gatos sospechosos" />
          <div>
            <span className="jsg__kicker">some() · juego de lógica</span>
            <h3>🕵️ Juego de detective de gatos</h3>
            <p>
              Lee la pista, revisa la camada y decide si <code>some()</code> devolverá{' '}
              <b>true</b> o <b>false</b>.
            </p>
          </div>
        </div>
        <div className="jsg__meta">
          <span>Caso {Math.min(ronda + 1, CASOS_GATOS.length)} / {CASOS_GATOS.length}</span>
          <strong>🏅 {aciertos}</strong>
        </div>
      </header>

      <div className="jsg__bar" aria-hidden="true">
        <span style={{ width: `${((ronda + (respuesta !== null ? 1 : 0)) / CASOS_GATOS.length) * 100}%` }} />
      </div>

      {terminado ? (
        <div className="jsg__final">
          <h4>🏁 Caso cerrado</h4>
          <p>Resolviste {aciertos} de {CASOS_GATOS.length} pistas sobre la camada.</p>
          <div className="jsg__final-score">{aciertos} / {CASOS_GATOS.length}</div>
          <p className="jsg__final-note">
            Recuerda: <code>some()</code> devuelve un <b>booleano</b> y se detiene en la primera coincidencia.
          </p>
          <button type="button" className="jsg-btn jsg-btn--primary" onClick={reiniciar}>🔄 Investigar de nuevo</button>
        </div>
      ) : (
        <>
          <div className="jsg__question">
            <span className="jsg__q-icon">🔍</span>
            <div>
              <h4>{caso.pregunta}</h4>
              <code className="jsg__crit">{caso.criterio}</code>
            </div>
          </div>

          <TableroGatos gatos={GATOS} activos={activos} revelado={respuesta !== null} />

          <div className="jsg__answers">
            <button
              type="button"
              className={`jsg-ans ${respuesta !== null && correcta ? 'is-reveal' : ''} ${
                respuesta === true && !correcta ? 'is-bad' : ''
              } ${respuesta === true && correcta ? 'is-good' : ''}`}
              onClick={() => responder(true)}
              disabled={respuesta !== null}
            >
              <span>✅</span>
              <div>
                <strong>Sí, al menos uno cumple</strong>
                <small>some() devuelve true</small>
              </div>
            </button>
            <button
              type="button"
              className={`jsg-ans ${respuesta !== null && !correcta ? 'is-reveal' : ''} ${
                respuesta === false && correcta ? 'is-bad' : ''
              } ${respuesta === false && !correcta ? 'is-good' : ''}`}
              onClick={() => responder(false)}
              disabled={respuesta !== null}
            >
              <span>🚫</span>
              <div>
                <strong>No, ninguno cumple</strong>
                <small>some() devuelve false</small>
              </div>
            </button>
          </div>

          {respuesta !== null && (
            <div className={`jsg__feedback ${respuesta === correcta ? 'is-ok' : 'is-fail'}`}>
              <span>{respuesta === correcta ? '✔' : '✖'}</span>
              <div>
                <strong>
                  {respuesta === correcta ? '¡Bien visto, detective!' : 'La camada te engañó un poco'}
                </strong>
                <p>{caso.nota}</p>
                <p className="jsg__hint">💡 {caso.pista}</p>
              </div>
            </div>
          )}

          <div className="jsg__actions">
            <button
              type="button"
              className="jsg-btn jsg-btn--ghost"
              onClick={() => setVerArchivo((v) => !v)}
            >
              {verArchivo ? '🙈 Ocultar archivo de razas' : '📚 Ver archivo de razas'}
            </button>
            <button
              type="button"
              className="jsg-btn jsg-btn--primary"
              onClick={siguiente}
              disabled={respuesta === null}
            >
              {ronda < CASOS_GATOS.length - 1 ? 'Siguiente pista →' : 'Cerrar el caso'}
            </button>
          </div>

          {verArchivo && (
            <div className="jsg__archive">
              <img src="/apuntes/some/gato2.png" alt="Archivo de razas de gatos" />
            </div>
          )}
        </>
      )}
    </section>
  )
}

/* ================================================================== */
/* DETECTOR DE INFECTADOS — some() como alarma                        */
/* ================================================================== */

const PACIENTES = [
  { nombre: 'Ana', emoji: '🧑', temperatura: 36.5, mordida: false, infectado: false },
  { nombre: 'Bruno', emoji: '🧔', temperatura: 39.2, mordida: true, infectado: true },
  { nombre: 'Carla', emoji: '👩', temperatura: 37.8, mordida: false, infectado: false },
  { nombre: 'Dante', emoji: '👨', temperatura: 40.1, mordida: true, infectado: true },
  { nombre: 'Elena', emoji: '👧', temperatura: 36.9, mordida: false, infectado: false },
  { nombre: 'Fabio', emoji: '🧑‍🦱', temperatura: 38.6, mordida: true, infectado: true },
]

const CASOS_ZOMBIE = [
  {
    pregunta: '¿Hay al menos un paciente infectado?',
    criterio: 'paciente.infectado === true',
    test: (p) => p.infectado === true,
    nota: 'Bruno es el primero con infectado = true. some() se detiene ahí y activa la alarma con true.',
  },
  {
    pregunta: '¿Hay algún paciente con mordida?',
    criterio: 'paciente.mordida === true',
    test: (p) => p.mordida === true,
    nota: 'Bruno, Dante y Fabio tienen mordida. Basta con el primero para que some() devuelva true.',
  },
  {
    pregunta: '¿Hay algún paciente con temperatura mayor a 40 °C?',
    criterio: 'paciente.temperatura > 40',
    test: (p) => p.temperatura > 40,
    nota: 'Dante registra 40.1 °C. some() devuelve true al encontrarlo.',
  },
  {
    pregunta: '¿Hay algún paciente con temperatura mayor a 41 °C?',
    criterio: 'paciente.temperatura > 41',
    test: (p) => p.temperatura > 41,
    nota: 'El máximo es 40.1 °C. Al no encontrar ninguno, some() devuelve false y la alarma no suena.',
  },
  {
    pregunta: '¿Hay algún paciente llamado «Zoe»?',
    criterio: 'paciente.nombre === "Zoe"',
    test: (p) => p.nombre === 'Zoe',
    nota: 'Ningún paciente se llama Zoe. some() recorre toda la lista y devuelve false.',
  },
  {
    pregunta: '¿Hay algún paciente con mordida y temperatura de 39 °C o más?',
    criterio: 'paciente.mordida && paciente.temperatura >= 39',
    test: (p) => p.mordida && p.temperatura >= 39,
    nota: 'Bruno cumple ambas condiciones: tiene mordida y 39.2 °C. some() devuelve true.',
  },
  {
    pregunta: '¿Hay algún paciente con temperatura menor a 36 °C?',
    criterio: 'paciente.temperatura < 36',
    test: (p) => p.temperatura < 36,
    nota: 'La temperatura más baja es 36.5 °C. No hay coincidencias: some() devuelve false.',
  },
]

function TableroZombies({ pacientes, activos, revelado }) {
  return (
    <div className="jsg-grid jsg-grid--z">
      {pacientes.map((p, i) => {
        const hit = revelado && activos.includes(i)
        return (
          <article key={p.nombre} className={`jsg-card jsg-card--z ${hit ? 'is-hit is-zombie' : ''}`} style={{ '--i': i }}>
            <span className="jsg-card__ava">{hit ? '🧟' : p.emoji}</span>
            <strong>{p.nombre}</strong>
            <ul>
              <li>Temp: <b>{p.temperatura} °C</b></li>
              <li>Mordida: <b>{p.mordida ? 'sí' : 'no'}</b></li>
              <li>Infectado: <b>{p.infectado ? 'sí' : 'no'}</b></li>
            </ul>
            <span className="jsg-card__tag">{hit ? 'AISLAR' : 'en observación'}</span>
            {hit && <span className="jsg-card__hit">☣ positivo</span>}
          </article>
        )
      })}
    </div>
  )
}

export function DetectorInfectados() {
  const [ronda, setRonda] = useState(0)
  const [respuesta, setRespuesta] = useState(null)
  const [aciertos, setAciertos] = useState(0)
  const [terminado, setTerminado] = useState(false)
  const [verArchivo, setVerArchivo] = useState(false)

  const caso = CASOS_ZOMBIE[ronda]
  const activos = useMemo(
    () => PACIENTES.map((p, i) => (caso.test(p) ? i : -1)).filter((i) => i >= 0),
    [caso]
  )
  const correcta = activos.length > 0

  const responder = (valor) => {
    if (respuesta !== null) return
    setRespuesta(valor)
    if (valor === correcta) setAciertos((n) => n + 1)
  }

  const siguiente = () => {
    if (ronda < CASOS_ZOMBIE.length - 1) {
      setRonda((n) => n + 1)
      setRespuesta(null)
      return
    }
    setTerminado(true)
  }

  const reiniciar = () => {
    setRonda(0)
    setRespuesta(null)
    setAciertos(0)
    setTerminado(false)
  }

  return (
    <section className="jsg jsg--zombies">
      <header className="jsg__head">
        <div className="jsg__brand">
          <img className="jsg__photo" src="/apuntes/some/zombies.png" alt="Detector de infectados" />
          <div>
            <span className="jsg__kicker">some() · protocolo de alarma</span>
            <h3>☣️ DETECTOR DE INFECTADOS</h3>
            <p>
              Escanea el grupo. Si <code>some()</code> encuentra un caso positivo, la alarma se activa.
            </p>
          </div>
        </div>
        <div className="jsg__meta">
          <span>Escaneo {Math.min(ronda + 1, CASOS_ZOMBIE.length)} / {CASOS_ZOMBIE.length}</span>
          <strong>🏅 {aciertos}</strong>
        </div>
      </header>

      <div className="jsg__bar" aria-hidden="true">
        <span style={{ width: `${((ronda + (respuesta !== null ? 1 : 0)) / CASOS_ZOMBIE.length) * 100}%` }} />
      </div>

      {terminado ? (
        <div className="jsg__final">
          <h4>🏁 Protocolo completado</h4>
          <p>Acertaste {aciertos} de {CASOS_ZOMBIE.length} escaneos.</p>
          <div className="jsg__final-score">{aciertos} / {CASOS_ZOMBIE.length}</div>
          <p className="jsg__final-note">
            <code>some()</code> responde una sola pregunta: ¿existe al menos un elemento que cumpla la condición?
            Devuelve <b>true</b> o <b>false</b>, nunca una lista.
          </p>
          <button type="button" className="jsg-btn jsg-btn--primary" onClick={reiniciar}>🔄 Reiniciar escaneo</button>
        </div>
      ) : (
        <>
          <div className="jsg__question">
            <span className="jsg__q-icon">☣️</span>
            <div>
              <h4>{caso.pregunta}</h4>
              <code className="jsg__crit">{caso.criterio}</code>
            </div>
          </div>

          <TableroZombies pacientes={PACIENTES} activos={activos} revelado={respuesta !== null} />

          <div className="jsg__answers">
            <button
              type="button"
              className={`jsg-ans jsg-ans--z ${respuesta !== null && correcta ? 'is-reveal' : ''} ${
                respuesta === true && !correcta ? 'is-bad' : ''
              } ${respuesta === true && correcta ? 'is-good' : ''}`}
              onClick={() => responder(true)}
              disabled={respuesta !== null}
            >
              <span>🚨</span>
              <div>
                <strong>ACTIVAR ALARMA</strong>
                <small>some() devuelve true</small>
              </div>
            </button>
            <button
              type="button"
              className={`jsg-ans jsg-ans--z ${respuesta !== null && !correcta ? 'is-reveal' : ''} ${
                respuesta === false && correcta ? 'is-bad' : ''
              } ${respuesta === false && !correcta ? 'is-good' : ''}`}
              onClick={() => responder(false)}
              disabled={respuesta !== null}
            >
              <span>🟢</span>
              <div>
                <strong>ZONA SEGURA</strong>
                <small>some() devuelve false</small>
              </div>
            </button>
          </div>

          {respuesta !== null && (
            <div className={`jsg__feedback ${respuesta === correcta ? 'is-ok' : 'is-fail'}`}>
              <span>{respuesta === correcta ? '✔' : '✖'}</span>
              <div>
                <strong>
                  {respuesta === correcta ? 'Escaneo correcto' : 'El escáner detectó otra cosa'}
                </strong>
                <p>{caso.nota}</p>
                {activos.length > 0 && (
                  <p className="jsg__hint">
                    🔬 Coincidencias encontradas: <b>{activos.length}</b>. some() se detuvo en la primera
                    (posición {activos[0]}).
                  </p>
                )}
              </div>
            </div>
          )}

          <div className="jsg__actions">
            <button
              type="button"
              className="jsg-btn jsg-btn--ghost"
              onClick={() => setVerArchivo((v) => !v)}
            >
              {verArchivo ? '🙈 Ocultar archivo' : '📚 Ver archivo de casos'}
            </button>
            <button
              type="button"
              className="jsg-btn jsg-btn--primary"
              onClick={siguiente}
              disabled={respuesta === null}
            >
              {ronda < CASOS_ZOMBIE.length - 1 ? 'Siguiente escaneo →' : 'Cerrar protocolo'}
            </button>
          </div>

          {verArchivo && (
            <div className="jsg__archive">
              <img src="/apuntes/some/zombies2.png" alt="Archivo de casos de infectados" />
            </div>
          )}
        </>
      )}
    </section>
  )
}

/* ================================================================== */
/* Contenedor con la teoría de some()                                  */
/* ================================================================== */

export default function JuegosSome() {
  return (
    <div className="jsg-wrap">
      <div className="jsg-intro">
        <span className="jsg-intro__tag">Array.prototype.some(callbackFn, thisArg)</span>
        <h3>🧪 Dos juegos para dominar some()</h3>
        <p>
          <code>some()</code> recorre el array y se detiene en cuanto encuentra un elemento que cumpla la
          condición. Devuelve <b>true</b> si existe al menos uno y <b>false</b> si ninguno cumple.
          Practícalo con la camada de gatos y con el protocolo de infectados.
        </p>
      </div>
      <DetectiveGatos />
      <DetectorInfectados />
    </div>
  )
}
