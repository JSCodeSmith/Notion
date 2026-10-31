import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { reproducir } from './sonidos'
import { usePersistencia } from './usePersistencia'

const MAX_BALAS = 12
const RECARGA_MS = 1100
const RADIO_ARENA = 20
const ALTURA_OJO = 1.65
const VELOCIDAD = 6.2
const GRAVEDAD = 21
const IMPULSO = 7
const DURACION = 60
const CLAVE_RECORD = 'reduce:juego:record:v1'

const HUD_INICIAL = {
  estado: 'inicio',
  puntos: 0,
  balas: MAX_BALAS,
  combo: 1,
  tiempo: DURACION,
  recargando: false,
  enemigos: 0,
}

const COLORES = [0x22f5ff, 0xff3bd4, 0xffe45e, 0x7cff8b]

const formatearTiempo = (segundos) => {
  const total = Math.max(0, Math.ceil(segundos))
  const minutos = Math.floor(total / 60)
  return `${minutos}:${String(total % 60).padStart(2, '0')}`
}

export default function JuegoPistolas({ notificar, mudo, alternarMudo }) {
  const contenedorRef = useRef(null)
  const flashRef = useRef(null)
  const accionesRef = useRef({})
  const [hud, setHud] = useState(HUD_INICIAL)
  const [golpe, setGolpe] = useState(null)
  const [soportado, setSoportado] = useState(true)
  const [esTactil] = useState(
    () => Boolean(window.matchMedia?.('(pointer: coarse)').matches),
  )
  const [record, setRecord] = usePersistencia(CLAVE_RECORD, 0)

  const recordRef = useRef(record)

  useEffect(() => {
    const contenedor = contenedorRef.current
    if (!contenedor) return

    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' })
    } catch {
      /* Sin WebGL no hay escena: se avisa fuera del efecto. */
      queueMicrotask(() => setSoportado(false))
      return
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    renderer.domElement.className = 'rx-fps__lienzo'
    contenedor.appendChild(renderer.domElement)

    const escena = new THREE.Scene()
    escena.background = new THREE.Color(0x05020e)
    escena.fog = new THREE.FogExp2(0x05020e, 0.028)

    const camara = new THREE.PerspectiveCamera(74, 16 / 9, 0.08, 120)
    camara.rotation.order = 'YXZ'
    camara.position.set(0, ALTURA_OJO, 0)
    escena.add(camara)

    /* ---------- Escenario ---------- */
    const suelo = new THREE.Mesh(
      new THREE.CircleGeometry(34, 72),
      new THREE.MeshStandardMaterial({ color: 0x080414, metalness: 0.85, roughness: 0.35 }),
    )
    suelo.rotation.x = -Math.PI / 2
    escena.add(suelo)

    const rejilla = new THREE.GridHelper(64, 64, 0x1ee7ff, 0x3a1a63)
    rejilla.position.y = 0.015
    rejilla.material.transparent = true
    rejilla.material.opacity = 0.42
    escena.add(rejilla)

    const anilloExterior = new THREE.Mesh(
      new THREE.TorusGeometry(RADIO_ARENA + 1, 0.06, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0xff3bd4 }),
    )
    anilloExterior.rotation.x = Math.PI / 2
    anilloExterior.position.y = 0.05
    escena.add(anilloExterior)

    const anilloInterior = new THREE.Mesh(
      new THREE.TorusGeometry(11, 0.035, 8, 96),
      new THREE.MeshBasicMaterial({ color: 0x22f5ff, transparent: true, opacity: 0.7 }),
    )
    anilloInterior.rotation.x = Math.PI / 2
    anilloInterior.position.y = 0.04
    escena.add(anilloInterior)

    for (let i = 0; i < 10; i += 1) {
      const angulo = (i / 10) * Math.PI * 2
      const columna = new THREE.Group()
      const cuerpo = new THREE.Mesh(
        new THREE.BoxGeometry(0.8, 7 + (i % 3), 0.8),
        new THREE.MeshStandardMaterial({
          color: 0x0b0620,
          emissive: i % 2 === 0 ? 0x003b4a : 0x3a0033,
          emissiveIntensity: 0.9,
          metalness: 0.7,
          roughness: 0.3,
        }),
      )
      cuerpo.position.y = (7 + (i % 3)) / 2
      columna.add(cuerpo)

      const tira = new THREE.Mesh(
        new THREE.BoxGeometry(0.06, 5.4, 0.06),
        new THREE.MeshBasicMaterial({ color: i % 2 === 0 ? 0x22f5ff : 0xff3bd4 }),
      )
      tira.position.set(0.42, 3.4, 0.42)
      columna.add(tira)

      columna.position.set(Math.cos(angulo) * (RADIO_ARENA + 3), 0, Math.sin(angulo) * (RADIO_ARENA + 3))
      escena.add(columna)
    }

    /* Estrellas de fondo. */
    const posicionesEstrellas = new Float32Array(700 * 3)
    for (let i = 0; i < 700; i += 1) {
      const radio = 38 + Math.random() * 40
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      posicionesEstrellas[i * 3] = radio * Math.sin(phi) * Math.cos(theta)
      posicionesEstrellas[i * 3 + 1] = Math.abs(radio * Math.cos(phi)) * 0.6 + 2
      posicionesEstrellas[i * 3 + 2] = radio * Math.sin(phi) * Math.sin(theta)
    }
    const geometriaEstrellas = new THREE.BufferGeometry()
    geometriaEstrellas.setAttribute('position', new THREE.BufferAttribute(posicionesEstrellas, 3))
    const estrellas = new THREE.Points(
      geometriaEstrellas,
      new THREE.PointsMaterial({
        color: 0xa9e9ff,
        size: 0.09,
        transparent: true,
        opacity: 0.8,
        depthWrite: false,
      }),
    )
    escena.add(estrellas)

    escena.add(new THREE.HemisphereLight(0x6d8cff, 0x14001e, 1.1))
    const luzCian = new THREE.PointLight(0x22f5ff, 60, 45, 2)
    luzCian.position.set(9, 8, 9)
    escena.add(luzCian)
    const luzMagenta = new THREE.PointLight(0xff3bd4, 55, 45, 2)
    luzMagenta.position.set(-9, 7, -7)
    escena.add(luzMagenta)

    /* ---------- Estado mutable del juego ---------- */
    const estado = {
      fase: 'inicio',
      puntos: 0,
      balas: MAX_BALAS,
      combo: 1,
      tiempo: DURACION,
      recargando: false,
      ultimoAcierto: -10,
    }

    const enemigos = []
    const particulas = []
    const teclas = new Set()
    const temporizadores = new Set()
    /* Reloj propio: THREE.Clock quedó obsoleto en three 0.187. */
    let marcaTiempo = performance.now()
    let tiempoTranscurrido = 0
    const reloj = {
      get elapsedTime() {
        return tiempoTranscurrido
      },
      getDelta() {
        const ahora = performance.now()
        const delta = (ahora - marcaTiempo) / 1000
        marcaTiempo = ahora
        tiempoTranscurrido += delta
        return delta
      },
    }
    const raycaster = new THREE.Raycaster()
    const centro = new THREE.Vector2(0, 0)

    let yaw = 0
    let pitch = 0
    let velocidadY = 0
    let enSuelo = true
    let raf = 0
    let timeoutRecarga = null
    let acumuladorHud = 0
    let idGolpe = 0
    let toque = null
    let sinBloqueo = false

    const publicar = () => {
      setHud({
        estado: estado.fase,
        puntos: estado.puntos,
        balas: estado.balas,
        combo: estado.combo,
        tiempo: estado.tiempo,
        recargando: estado.recargando,
        enemigos: enemigos.length,
      })
    }

    const programar = (fn, ms) => {
      const id = setTimeout(() => {
        temporizadores.delete(id)
        fn()
      }, ms)
      temporizadores.add(id)
      return id
    }

    const destruir = (objeto) => {
      objeto.traverse((hijo) => {
        if (hijo.geometry) hijo.geometry.dispose()
        if (hijo.material) {
          const materiales = Array.isArray(hijo.material) ? hijo.material : [hijo.material]
          materiales.forEach((material) => material.dispose())
        }
      })
    }

    /* ---------- Partículas ---------- */
    const crearParticulas = (posicion, color, cantidad, fuerza, tamano = 0.16, duracion = 0.6) => {
      const posiciones = new Float32Array(cantidad * 3)
      const velocidades = new Float32Array(cantidad * 3)

      for (let i = 0; i < cantidad; i += 1) {
        const theta = Math.random() * Math.PI * 2
        const phi = Math.acos(2 * Math.random() - 1)
        const rapidez = fuerza * (0.35 + Math.random() * 0.8)
        velocidades[i * 3] = Math.sin(phi) * Math.cos(theta) * rapidez
        velocidades[i * 3 + 1] = Math.cos(phi) * rapidez
        velocidades[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * rapidez
      }

      const geometria = new THREE.BufferGeometry()
      geometria.setAttribute('position', new THREE.BufferAttribute(posiciones, 3))
      const material = new THREE.PointsMaterial({
        color,
        size: tamano,
        transparent: true,
        opacity: 1,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      })
      const puntos = new THREE.Points(geometria, material)
      puntos.position.copy(posicion)
      escena.add(puntos)
      particulas.push({ puntos, velocidades, vida: 0, duracion })
    }

    const actualizarParticulas = (dt) => {
      for (let i = particulas.length - 1; i >= 0; i -= 1) {
        const item = particulas[i]
        item.vida += dt
        const posiciones = item.puntos.geometry.attributes.position.array
        for (let j = 0; j < item.velocidades.length / 3; j += 1) {
          posiciones[j * 3] += item.velocidades[j * 3] * dt
          posiciones[j * 3 + 1] += item.velocidades[j * 3 + 1] * dt
          posiciones[j * 3 + 2] += item.velocidades[j * 3 + 2] * dt
          item.velocidades[j * 3 + 1] -= 3.2 * dt
        }
        item.puntos.geometry.attributes.position.needsUpdate = true
        item.puntos.material.opacity = Math.max(0, 1 - item.vida / item.duracion)

        if (item.vida >= item.duracion) {
          escena.remove(item.puntos)
          item.puntos.geometry.dispose()
          item.puntos.material.dispose()
          particulas.splice(i, 1)
        }
      }
    }

    /* ---------- Objetivos ---------- */
    const crearEnemigo = () => {
      const grupo = new THREE.Group()
      const color = COLORES[Math.floor(Math.random() * COLORES.length)]
      const angulo = Math.random() * Math.PI * 2
      const radio = 6.5 + Math.random() * 10.5

      grupo.position.set(
        Math.cos(angulo) * radio,
        1.5 + Math.random() * 2.4,
        Math.sin(angulo) * radio,
      )

      const nucleo = new THREE.Mesh(
        new THREE.IcosahedronGeometry(0.52, 0),
        new THREE.MeshStandardMaterial({
          color: 0x080313,
          emissive: color,
          emissiveIntensity: 2.6,
          metalness: 0.7,
          roughness: 0.2,
        }),
      )
      grupo.add(nucleo)

      const halo = new THREE.Mesh(
        new THREE.TorusGeometry(0.82, 0.045, 8, 44),
        new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.95 }),
      )
      halo.rotation.x = Math.PI / 2
      grupo.add(halo)

      const satelite = new THREE.Mesh(
        new THREE.SphereGeometry(0.09, 8, 8),
        new THREE.MeshBasicMaterial({ color }),
      )
      satelite.position.set(0.82, 0, 0)
      grupo.add(satelite)

      const hitbox = new THREE.Mesh(
        new THREE.SphereGeometry(0.92, 10, 10),
        new THREE.MeshBasicMaterial({ visible: false }),
      )
      hitbox.userData.objetivo = true
      hitbox.userData.grupo = grupo
      grupo.add(hitbox)

      grupo.userData = {
        color,
        halo,
        nucleo,
        hitbox,
        baseY: grupo.position.y,
        fase: Math.random() * Math.PI * 2,
      }

      escena.add(grupo)
      enemigos.push(grupo)
      return grupo
    }

    const quitarEnemigo = (grupo) => {
      const indice = enemigos.indexOf(grupo)
      if (indice >= 0) enemigos.splice(indice, 1)
      escena.remove(grupo)
      destruir(grupo)
    }

    const explotar = (grupo) => {
      crearParticulas(grupo.position.clone(), grupo.userData.color, 38, 5.2, 0.18, 0.7)
      reproducir('explosion')
      quitarEnemigo(grupo)
    }

    const acertar = (grupo) => {
      const ahora = reloj.elapsedTime
      if (ahora - estado.ultimoAcierto < 2.4) estado.combo = Math.min(5, estado.combo + 1)
      else estado.combo = 1

      estado.ultimoAcierto = ahora
      const ganancia = 100 * estado.combo
      estado.puntos += ganancia
      idGolpe += 1
      setGolpe({ id: idGolpe, texto: `+${ganancia}`, combo: estado.combo })
      reproducir('acierto')
      explotar(grupo)
      programar(crearEnemigo, 650)
      publicar()
    }

    /* ---------- Arma ---------- */
    const recargar = () => {
      if (estado.fase !== 'jugando' || estado.recargando || estado.balas === MAX_BALAS) return
      if (timeoutRecarga) clearTimeout(timeoutRecarga)
      estado.recargando = true
      publicar()
      reproducir('recarga')

      timeoutRecarga = setTimeout(() => {
        estado.recargando = false
        estado.balas = MAX_BALAS
        publicar()
        reproducir('click')
      }, RECARGA_MS)
    }

    const destello = () => {
      const flash = flashRef.current
      if (!flash) return
      flash.classList.remove('is-on')
      void flash.offsetWidth
      flash.classList.add('is-on')
    }

    const disparar = () => {
      if (estado.fase !== 'jugando' || estado.recargando) return

      if (estado.balas <= 0) {
        reproducir('vacio')
        programar(recargar, 260)
        return
      }

      estado.balas -= 1
      reproducir('disparo')
      destello()
      pitch = Math.min(1.15, pitch + 0.016)

      const direccion = new THREE.Vector3()
      camara.getWorldDirection(direccion)
      crearParticulas(
        camara.position.clone().add(direccion.clone().multiplyScalar(0.85)),
        0x9ffcff,
        12,
        2.4,
        0.08,
        0.32,
      )

      raycaster.setFromCamera(centro, camara)
      const objetivos = enemigos.map((enemigo) => enemigo.userData.hitbox)
      const impactos = raycaster.intersectObjects(objetivos, false)

      if (impactos.length > 0) {
        const grupo = impactos[0].object.userData.grupo
        if (grupo) acertar(grupo)
      }

      if (estado.balas === 0) programar(recargar, 420)
      publicar()
    }

    /* ---------- Movimiento ---------- */
    const mover = (dt) => {
      const adelante = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw))
      const derecha = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw))
      const movimiento = new THREE.Vector3()

      if (teclas.has('KeyW') || teclas.has('ArrowUp')) movimiento.add(adelante)
      if (teclas.has('KeyS') || teclas.has('ArrowDown')) movimiento.sub(adelante)
      if (teclas.has('KeyD') || teclas.has('ArrowRight')) movimiento.add(derecha)
      if (teclas.has('KeyA') || teclas.has('ArrowLeft')) movimiento.sub(derecha)

      if (movimiento.lengthSq() > 0) {
        movimiento.normalize().multiplyScalar(VELOCIDAD * dt)
        camara.position.add(movimiento)
      }

      const distancia = Math.hypot(camara.position.x, camara.position.z)
      if (distancia > RADIO_ARENA) {
        const factor = RADIO_ARENA / distancia
        camara.position.x *= factor
        camara.position.z *= factor
      }

      if (teclas.has('Space') && enSuelo) {
        velocidadY = IMPULSO
        enSuelo = false
      }
      velocidadY -= GRAVEDAD * dt
      camara.position.y += velocidadY * dt
      if (camara.position.y <= ALTURA_OJO) {
        camara.position.y = ALTURA_OJO
        velocidadY = 0
        enSuelo = true
      }

      camara.rotation.set(pitch, yaw, 0)
    }

    /* ---------- Ciclo de ronda ---------- */
    const reiniciarMundo = () => {
      enemigos.slice().forEach(quitarEnemigo)
      for (let i = particulas.length - 1; i >= 0; i -= 1) {
        escena.remove(particulas[i].puntos)
        particulas[i].puntos.geometry.dispose()
        particulas[i].puntos.material.dispose()
        particulas.splice(i, 1)
      }
      temporizadores.forEach((id) => clearTimeout(id))
      temporizadores.clear()
      teclas.clear()
      if (timeoutRecarga) clearTimeout(timeoutRecarga)

      estado.puntos = 0
      estado.balas = MAX_BALAS
      estado.combo = 1
      estado.tiempo = DURACION
      estado.recargando = false
      estado.ultimoAcierto = -10
      yaw = 0
      pitch = 0
      velocidadY = 0
      enSuelo = true
      camara.position.set(0, ALTURA_OJO, 0)
      camara.rotation.set(0, 0, 0)

      for (let i = 0; i < 3; i += 1) crearEnemigo()
      publicar()
    }

    const terminar = () => {
      if (estado.fase !== 'jugando') return
      estado.fase = 'fin'
      estado.tiempo = 0
      estado.recargando = false
      temporizadores.forEach((id) => clearTimeout(id))
      temporizadores.clear()
      teclas.clear()
      if (timeoutRecarga) clearTimeout(timeoutRecarga)
      if (document.pointerLockElement) document.exitPointerLock()
      publicar()
      reproducir('nivel')

      if (estado.puntos > recordRef.current) {
        recordRef.current = estado.puntos
        setRecord(estado.puntos)
        notificar?.('¡Nuevo récord!', {
          tipo: 'exito',
          texto: `${estado.puntos} puntos acumulados en ${DURACION} s.`,
        })
      } else {
        notificar?.('Ronda terminada', {
          tipo: 'info',
          texto: `${estado.puntos} puntos · récord ${recordRef.current}.`,
        })
      }
    }

    const pedirBloqueo = () => {
      if (window.matchMedia?.('(pointer: coarse)').matches) return
      try {
        const resultado = renderer.domElement.requestPointerLock()
        if (resultado && typeof resultado.catch === 'function') resultado.catch(() => {})
      } catch {
        /* sin pointer lock: se juega arrastrando */
      }
    }

    const iniciar = () => {
      reiniciarMundo()
      estado.fase = 'jugando'
      publicar()
      pedirBloqueo()
    }

    const reanudar = () => {
      if (estado.fase !== 'pausa') return
      estado.fase = 'jugando'
      publicar()
      pedirBloqueo()
    }

    /* ---------- Eventos ---------- */
    const alTeclear = (evento) => {
      if (evento.code === 'Space' && estado.fase === 'jugando') evento.preventDefault()
      if (evento.code === 'KeyR' && estado.fase === 'jugando') {
        evento.preventDefault()
        recargar()
      }
      if (evento.code === 'KeyP' && estado.fase === 'jugando') {
        document.exitPointerLock?.()
      }
      teclas.add(evento.code)
    }

    const alSoltar = (evento) => {
      teclas.delete(evento.code)
    }

    const alMoverRaton = (evento) => {
      if (document.pointerLockElement !== renderer.domElement) return
      yaw -= evento.movementX * 0.0022
      pitch = THREE.MathUtils.clamp(pitch - evento.movementY * 0.0022, -1.2, 1.2)
    }

    const alPresionar = (evento) => {
      if (estado.fase !== 'jugando') return
      if (evento.pointerType === 'touch') return
      if (document.pointerLockElement === renderer.domElement || sinBloqueo) {
        if (evento.button === 0) disparar()
      } else {
        pedirBloqueo()
      }
    }

    const alErrorBloqueo = () => {
      sinBloqueo = true
    }

    const alCambiarBloqueo = () => {
      if (document.pointerLockElement !== renderer.domElement && estado.fase === 'jugando') {
        estado.fase = 'pausa'
        publicar()
      }
    }

    const alMirarTactil = (evento) => {
      const esTouch = evento.pointerType === 'touch'
      if ((!esTouch && !sinBloqueo) || estado.fase !== 'jugando') return
      if (!toque) {
        toque = { x: evento.clientX, y: evento.clientY, id: evento.pointerId }
        renderer.domElement.setPointerCapture?.(evento.pointerId)
        return
      }
      if (evento.pointerId !== toque.id) return
      yaw -= (evento.clientX - toque.x) * 0.005
      pitch = THREE.MathUtils.clamp(pitch - (evento.clientY - toque.y) * 0.005, -1.2, 1.2)
      toque.x = evento.clientX
      toque.y = evento.clientY
    }

    const alSoltarTactil = () => {
      toque = null
    }

    const alSalirVentana = () => teclas.clear()

    const alOcultar = () => {
      if (document.hidden && estado.fase === 'jugando') {
        estado.fase = 'pausa'
        publicar()
        document.exitPointerLock?.()
      }
    }

    const alRedimensionar = () => {
      const ancho = contenedor.clientWidth || 800
      const alto = contenedor.clientHeight || 450
      renderer.setSize(ancho, alto, false)
      camara.aspect = ancho / alto
      camara.updateProjectionMatrix()
    }

    const observador = new ResizeObserver(alRedimensionar)
    observador.observe(contenedor)
    alRedimensionar()

    window.addEventListener('keydown', alTeclear)
    window.addEventListener('keyup', alSoltar)
    window.addEventListener('blur', alSalirVentana)
    document.addEventListener('mousemove', alMoverRaton)
    document.addEventListener('pointerlockchange', alCambiarBloqueo)
    document.addEventListener('pointerlockerror', alErrorBloqueo)
    document.addEventListener('visibilitychange', alOcultar)
    renderer.domElement.addEventListener('pointerdown', alPresionar)
    renderer.domElement.addEventListener('pointerdown', alMirarTactil)
    renderer.domElement.addEventListener('pointermove', alMirarTactil)
    renderer.domElement.addEventListener('pointerup', alSoltarTactil)
    renderer.domElement.addEventListener('contextmenu', (evento) => evento.preventDefault())

    accionesRef.current = {
      iniciar,
      reanudar,
      disparar,
      recargar,
      mover: (codigo, activo) => {
        if (activo) teclas.add(codigo)
        else teclas.delete(codigo)
      },
    }

    /* ---------- Bucle ---------- */
    const animar = () => {
      raf = requestAnimationFrame(animar)
      const dt = Math.min(reloj.getDelta(), 0.05)
      const ahora = reloj.elapsedTime

      for (const enemigo of enemigos) {
        enemigo.rotation.y += dt * 0.9
        enemigo.position.y = enemigo.userData.baseY + Math.sin(ahora * 2 + enemigo.userData.fase) * 0.16
        enemigo.userData.halo.rotation.z += dt * 1.8
      }

      estrellas.rotation.y += dt * 0.012
      anilloInterior.rotation.z += dt * 0.25
      actualizarParticulas(dt)

      if (estado.fase === 'jugando') {
        mover(dt)
        estado.tiempo -= dt

        if (estado.combo > 1 && ahora - estado.ultimoAcierto > 2.4) {
          estado.combo = 1
          publicar()
        }

        if (estado.tiempo <= 0) {
          terminar()
        } else {
          acumuladorHud += dt
          if (acumuladorHud >= 0.2) {
            acumuladorHud = 0
            publicar()
          }
        }
      }

      renderer.render(escena, camara)
    }

    if (enemigos.length === 0) {
      for (let i = 0; i < 3; i += 1) crearEnemigo()
    }
    publicar()
    animar()

    return () => {
      cancelAnimationFrame(raf)
      observador.disconnect()
      temporizadores.forEach((id) => clearTimeout(id))
      temporizadores.clear()
      if (timeoutRecarga) clearTimeout(timeoutRecarga)

      window.removeEventListener('keydown', alTeclear)
      window.removeEventListener('keyup', alSoltar)
      window.removeEventListener('blur', alSalirVentana)
      document.removeEventListener('mousemove', alMoverRaton)
      document.removeEventListener('pointerlockchange', alCambiarBloqueo)
      document.removeEventListener('pointerlockerror', alErrorBloqueo)
      document.removeEventListener('visibilitychange', alOcultar)

      if (document.pointerLockElement === renderer.domElement) document.exitPointerLock()
      if (renderer.domElement.parentNode === contenedor) contenedor.removeChild(renderer.domElement)

      escena.traverse((objeto) => {
        if (objeto.geometry) objeto.geometry.dispose()
        if (objeto.material) {
          const materiales = Array.isArray(objeto.material) ? objeto.material : [objeto.material]
          materiales.forEach((material) => material.dispose())
        }
      })
      renderer.dispose()
      accionesRef.current = {}
    }
  }, [setRecord, notificar])

  const iniciarPartida = () => accionesRef.current.iniciar?.()
  const continuar = () => accionesRef.current.reanudar?.()
  const disparar = () => accionesRef.current.disparar?.()
  const recargar = () => accionesRef.current.recargar?.()
  const moverTactil = (codigo, activo) => {
    accionesRef.current.mover?.(codigo, activo)
  }

  return (
    <section className="rx-card rx-fps-card" aria-labelledby="rx-fps-titulo">
      <header className="rx-head">
        <div>
          <span className="rx-kicker">🎮 FPS · Reduce Arena</span>
          <h3 id="rx-fps-titulo" className="rx-title">Pistolas del acumulador</h3>
          <p className="rx-sub">
            Primera persona en 3D: muévete, salta y destruye objetivos. Cada impacto suma al
            acumulador, igual que <code>reduce()</code>.
          </p>
        </div>
        <div className="rx-head__actions">
          <span className="rx-badge rx-badge--magenta">récord {record}</span>
          <button
            type="button"
            className="rx-btn rx-btn--ghost"
            onClick={alternarMudo}
            aria-pressed={Boolean(mudo)}
          >
            {mudo ? '🔇 Sin sonido' : '🔊 Sonido'}
          </button>
        </div>
      </header>

      <div
        className={`rx-fps ${hud.recargando ? 'is-reloading' : ''} ${
          hud.estado === 'jugando' ? 'is-playing' : ''
        } ${esTactil ? 'is-touch' : ''}`}
      >
        <div ref={contenedorRef} className="rx-fps__canvas" aria-label="Escenario 3D del juego" />

        {!soportado && (
          <div className="rx-fps__overlay">
            <div className="rx-fps__panel">
              <h4>WebGL no disponible</h4>
              <p>Tu navegador no pudo crear el escenario 3D. Prueba con otro navegador o activa la aceleración por hardware.</p>
            </div>
          </div>
        )}

        <div ref={flashRef} className="rx-fps__flash" aria-hidden="true" />

        {(hud.estado === 'jugando' || hud.estado === 'pausa') && (
          <div className="rx-fps__hud">
            <div className="rx-fps__top">
              <div className="rx-fps__marcador">
                <span className="rx-fps__label">SCORE</span>
                <strong key={hud.puntos} className="rx-fps__score">{hud.puntos}</strong>
                <span className="rx-fps__formula">acc = {hud.puntos}</span>
              </div>
              <div className="rx-fps__reloj">
                <span className="rx-fps__label">TIEMPO</span>
                <strong>{formatearTiempo(hud.tiempo)}</strong>
                <span className="rx-fps__barra"><i style={{ width: `${Math.max(0, (hud.tiempo / DURACION) * 100)}%` }} /></span>
              </div>
              <div className="rx-fps__combo">
                <span className="rx-fps__label">COMBO</span>
                <strong className={hud.combo > 1 ? 'is-hot' : ''}>×{hud.combo}</strong>
                <span className="rx-fps__enemigos">{hud.enemigos} objetivos</span>
              </div>
            </div>

            <div className="rx-fps__crosshair" aria-hidden="true">
              <span /><span /><span /><span /><i />
            </div>

            {golpe && (
              <div key={golpe.id} className="rx-fps__golpe" aria-hidden="true">
                {golpe.texto}
                {golpe.combo > 1 && <small>combo ×{golpe.combo}</small>}
              </div>
            )}

            <div className="rx-fps__bottom">
              <div className="rx-fps__municion">
                <span className="rx-fps__label">{hud.recargando ? 'RECARGANDO…' : 'MUNICIÓN'}</span>
                <div className="rx-fps__balas">
                  {Array.from({ length: MAX_BALAS }, (_, i) => (
                    <i key={i} className={i < hud.balas ? 'is-llena' : ''} />
                  ))}
                </div>
                <strong>{hud.balas}<small> / {MAX_BALAS}</small></strong>
              </div>
              <p className="rx-fps__ayuda">
                <kbd>WASD</kbd> mover · <kbd>ESPACIO</kbd> saltar · <kbd>R</kbd> recargar · <kbd>CLIC</kbd> disparar
              </p>
            </div>

            {esTactil && (
              <div className="rx-fps__tactil">
                <div className="rx-fps__dpad">
                  <button type="button" aria-label="Avanzar" onPointerDown={() => moverTactil('KeyW', true)} onPointerUp={() => moverTactil('KeyW', false)} onPointerLeave={() => moverTactil('KeyW', false)}>▲</button>
                  <button type="button" aria-label="Izquierda" onPointerDown={() => moverTactil('KeyA', true)} onPointerUp={() => moverTactil('KeyA', false)} onPointerLeave={() => moverTactil('KeyA', false)}>◀</button>
                  <button type="button" aria-label="Derecha" onPointerDown={() => moverTactil('KeyD', true)} onPointerUp={() => moverTactil('KeyD', false)} onPointerLeave={() => moverTactil('KeyD', false)}>▶</button>
                  <button type="button" aria-label="Retroceder" onPointerDown={() => moverTactil('KeyS', true)} onPointerUp={() => moverTactil('KeyS', false)} onPointerLeave={() => moverTactil('KeyS', false)}>▼</button>
                </div>
                <div className="rx-fps__acciones">
                  <button type="button" className="rx-fps__recargar" onClick={recargar}>R</button>
                  <button type="button" className="rx-fps__disparar" onClick={disparar} aria-label="Disparar">🔥</button>
                </div>
              </div>
            )}
          </div>
        )}

        {hud.estado !== 'jugando' && soportado && (
          <div className="rx-fps__overlay">
            <div className="rx-fps__panel">
              {hud.estado === 'inicio' && (
                <>
                  <span className="rx-fps__chip">reduce + acción</span>
                  <h4>REDUCE ARENA</h4>
                  <p>
                    Destruye los núcleos neón antes de que acabe el tiempo. Cada acierto acumula
                    <strong> +100 × combo</strong>.
                  </p>
                  <ul className="rx-fps__controles">
                    <li><kbd>W A S D</kbd><span>moverse</span></li>
                    <li><kbd>ESPACIO</kbd><span>saltar</span></li>
                    <li><kbd>CLIC</kbd><span>disparar</span></li>
                    <li><kbd>R</kbd><span>recargar</span></li>
                  </ul>
                  <button type="button" className="rx-btn rx-btn--primary rx-btn--lg" onClick={iniciarPartida}>
                    ▶ Jugar ahora
                  </button>
                  <small>Récord actual: {record} puntos · {DURACION} s por ronda</small>
                </>
              )}

              {hud.estado === 'pausa' && (
                <>
                  <span className="rx-fps__chip">pausa</span>
                  <h4>Partida en pausa</h4>
                  <p>El acumulador te espera. Retoma la acción cuando quieras.</p>
                  <div className="rx-fps__pausa-acciones">
                    <button type="button" className="rx-btn rx-btn--primary" onClick={continuar}>▶ Continuar</button>
                    <button type="button" className="rx-btn rx-btn--ghost" onClick={iniciarPartida}>↺ Reiniciar</button>
                  </div>
                </>
              )}

              {hud.estado === 'fin' && (
                <>
                  <span className="rx-fps__chip">ronda terminada</span>
                  <h4>{hud.puntos} puntos</h4>
                  <p>
                    {hud.puntos >= record && hud.puntos > 0
                      ? '¡Nuevo récord! El acumulador creció al máximo.'
                      : `Tu récord sigue en ${record} puntos.`}
                  </p>
                  <button type="button" className="rx-btn rx-btn--primary rx-btn--lg" onClick={iniciarPartida}>
                    ↺ Otra ronda
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>

      <p className="rx-fps__nota">
        🔒 El juego corre en canvas/WebGL y no ejecuta código del editor. Los sonidos son
        sintetizados con <strong>Howler.js</strong> y el puntaje se guarda en <code>localStorage</code>.
      </p>
    </section>
  )
}
