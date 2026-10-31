import { Howl, Howler } from 'howler'
import { useCallback, useState } from 'react'

/* Sonidos sintetizados en el navegador (WAV -> data URI) y reproducidos con
   Howler.js. Así no hacen falta archivos de audio externos. */

const FRECUENCIA_MUESTREO = 22050
const CLAVE_MUDO = 'reduce:audio:mudo:v1'

const DEFINICIONES = {
  disparo: { dur: 0.16, f0: 1650, f1: 110, tipo: 'square', vol: 0.42, ruido: 0.62, caida: 26 },
  recarga: { dur: 0.34, f0: 230, f1: 860, tipo: 'saw', vol: 0.3, ruido: 0.22, caida: 7 },
  acierto: { dur: 0.24, f0: 520, f1: 1580, tipo: 'sine', vol: 0.42, ruido: 0.04, caida: 9 },
  explosion: { dur: 0.45, f0: 260, f1: 42, tipo: 'saw', vol: 0.55, ruido: 0.86, caida: 8 },
  click: { dur: 0.06, f0: 1320, f1: 880, tipo: 'square', vol: 0.15, ruido: 0, caida: 45 },
  vacio: { dur: 0.09, f0: 190, f1: 110, tipo: 'square', vol: 0.24, ruido: 0.12, caida: 30 },
  nivel: { dur: 0.5, f0: 420, f1: 920, tipo: 'sine', vol: 0.36, ruido: 0, caida: 4.2 },
}

function codificarWav(muestras) {
  const buffer = new ArrayBuffer(44 + muestras.length * 2)
  const vista = new DataView(buffer)
  const texto = (offset, cadena) => {
    for (let i = 0; i < cadena.length; i += 1) vista.setUint8(offset + i, cadena.charCodeAt(i))
  }

  texto(0, 'RIFF')
  vista.setUint32(4, 36 + muestras.length * 2, true)
  texto(8, 'WAVE')
  texto(12, 'fmt ')
  vista.setUint32(16, 16, true)
  vista.setUint16(20, 1, true)
  vista.setUint16(22, 1, true)
  vista.setUint32(24, FRECUENCIA_MUESTREO, true)
  vista.setUint32(28, FRECUENCIA_MUESTREO * 2, true)
  vista.setUint16(32, 2, true)
  vista.setUint16(34, 16, true)
  texto(36, 'data')
  vista.setUint32(40, muestras.length * 2, true)

  for (let i = 0; i < muestras.length; i += 1) {
    const muestra = Math.max(-1, Math.min(1, muestras[i]))
    vista.setInt16(44 + i * 2, muestra < 0 ? muestra * 0x8000 : muestra * 0x7fff, true)
  }

  const bytes = new Uint8Array(buffer)
  let binario = ''
  const trozo = 0x8000
  for (let i = 0; i < bytes.length; i += trozo) {
    binario += String.fromCharCode.apply(null, bytes.subarray(i, i + trozo))
  }
  return `data:audio/wav;base64,${btoa(binario)}`
}

function sintetizar({ dur, f0, f1, tipo, vol, ruido, caida }) {
  const total = Math.floor(FRECUENCIA_MUESTREO * dur)
  const muestras = new Float32Array(total)
  let fase = 0

  for (let i = 0; i < total; i += 1) {
    const t = i / FRECUENCIA_MUESTREO
    const avance = i / total
    const frecuencia = f0 + (f1 - f0) * avance
    fase += (2 * Math.PI * frecuencia) / FRECUENCIA_MUESTREO

    let onda
    if (tipo === 'sine') onda = Math.sin(fase)
    else if (tipo === 'saw') onda = 2 * ((fase / (2 * Math.PI)) % 1) - 1
    else onda = Math.sin(fase) >= 0 ? 1 : -1

    const ataque = Math.min(1, t / 0.008)
    const envolvente = ataque * Math.exp(-t * caida)
    const siseo = Math.random() * 2 - 1
    muestras[i] = vol * envolvente * ((1 - ruido) * onda + ruido * siseo)
  }

  return codificarWav(muestras)
}

const cache = new Map()

function obtenerHowl(id) {
  if (cache.has(id)) return cache.get(id)
  const definicion = DEFINICIONES[id]
  if (!definicion) return null
  const howl = new Howl({
    src: [sintetizar(definicion)],
    format: ['wav'],
    volume: definicion.vol,
    preload: true,
  })
  cache.set(id, howl)
  return howl
}

export function estaMudo() {
  try {
    return window.localStorage.getItem(CLAVE_MUDO) === '1'
  } catch {
    return false
  }
}

export function fijarMudo(valor) {
  try {
    window.localStorage.setItem(CLAVE_MUDO, valor ? '1' : '0')
  } catch {
    /* sin almacenamiento */
  }
  Howler.mute(valor)
}

export function reproducir(id) {
  if (estaMudo()) return
  try {
    const howl = obtenerHowl(id)
    if (!howl) return
    if (Howler.ctx && Howler.ctx.state === 'suspended') Howler.ctx.resume()
    howl.play()
  } catch {
    /* audio bloqueado por el navegador */
  }
}

export function useSonidos() {
  const [mudo, setMudo] = useState(estaMudo)

  const alternar = useCallback(() => {
    setMudo((anterior) => {
      const siguiente = !anterior
      fijarMudo(siguiente)
      if (!siguiente) reproducir('click')
      return siguiente
    })
  }, [])

  return { mudo, alternar, reproducir }
}
