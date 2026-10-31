import { useCallback, useEffect, useRef, useState } from 'react'
import { reproducir } from './sonidos'

let contador = 0

/* Cola de alertas bonitas con autocierre y sonido opcional. */
export function useAlertas() {
  const [alertas, setAlertas] = useState([])
  const timers = useRef(new Set())

  useEffect(() => {
    const pendientes = timers.current
    return () => {
      pendientes.forEach((id) => clearTimeout(id))
      pendientes.clear()
    }
  }, [])

  const cerrar = useCallback((id) => {
    setAlertas((prev) => prev.filter((alerta) => alerta.id !== id))
  }, [])

  const notificar = useCallback(
    (titulo, { tipo = 'info', texto = '', duracion = 3400, silencioso = false } = {}) => {
      contador += 1
      const id = contador
      setAlertas((prev) => [...prev.slice(-3), { id, titulo, texto, tipo }])

      if (!silencioso) {
        if (tipo === 'error') reproducir('vacio')
        else if (tipo === 'exito') reproducir('acierto')
      }

      const timer = setTimeout(() => {
        setAlertas((prev) => prev.filter((alerta) => alerta.id !== id))
        timers.current.delete(timer)
      }, duracion)
      timers.current.add(timer)
    },
    [],
  )

  return { alertas, notificar, cerrar }
}
