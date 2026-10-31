import { useCallback, useEffect, useState } from 'react'

/* Estado que se guarda solo en localStorage.
   El primer render lee lo guardado; cada cambio se persiste con un pequeño
   debounce para no escribir en cada tecla. */
export function usePersistencia(clave, valorInicial) {
  const inicial = () =>
    typeof valorInicial === 'function' ? valorInicial() : valorInicial

  const [valor, setValor] = useState(() => {
    if (typeof window === 'undefined') return inicial()
    try {
      const crudo = window.localStorage.getItem(clave)
      if (crudo === null) return inicial()
      return JSON.parse(crudo)
    } catch {
      return inicial()
    }
  })

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        window.localStorage.setItem(clave, JSON.stringify(valor))
      } catch {
        /* almacenamiento lleno o bloqueado */
      }
    }, 220)
    return () => clearTimeout(id)
  }, [clave, valor])

  const reiniciar = useCallback(() => setValor(inicial()), [valorInicial]) // eslint-disable-line react-hooks/exhaustive-deps

  return [valor, setValor, reiniciar]
}
