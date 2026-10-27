import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { normalize } from '../../data/carreras'
import { buildSearchIndex } from '../../data/searchIndex.js'
import './CommandBar.css'

const bareTitle = (item) =>
  normalize(item.title).replace(/\(\)$/, '').replace(/^array\./, '')

function scoreItem(item, q) {
  const title = normalize(item.title)
  const bare = bareTitle(item)

  let score = 0
  if (title === q || bare === q) score = 100
  else if (bare.startsWith(q) || title.startsWith(q)) score = 80
  else if (bare.includes(q) || title.includes(q)) score = 60
  else if (normalize(item.subtitle).includes(q)) score = 40
  else if (normalize(item.keywords).includes(q)) score = 20

  if (score > 0 && item.hasDoc) score += 5
  return score
}

function badgeText(item) {
  if (item.type === 'metodo') return item.hasDoc ? 'Apunte' : 'Sin apunte'
  if (item.type === 'curso') return 'Curso'
  return 'Carrera'
}

function SearchIcon() {
  return (
    <svg
      className="cmd__icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  )
}

export default function CommandBar({ carreras, metodos = [], docIds, onSelect }) {
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef(null)
  const rootRef = useRef(null)

  const index = useMemo(
    () => buildSearchIndex(carreras, { metodos, docIds }),
    [carreras, metodos, docIds]
  )

  const results = useMemo(() => {
    const q = normalize(query.trim())

    // Sin texto: mostrar carreras + TODOS los métodos
    if (!q) {
      return index.filter(
        (item) => item.type === 'carrera' || item.type === 'metodo'
      )
    }

    // Con texto: TODOS los que coincidan, sin cortar
    return index
      .map((item) => ({ item, score: scoreItem(item, q) }))
      .filter((entry) => entry.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((entry) => entry.item)
  }, [index, query])

  useEffect(() => {
    setActiveIndex(0)
  }, [query])

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        inputRef.current?.focus()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  useEffect(() => {
    if (!open) return
    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handlePointerDown)
    return () => document.removeEventListener('mousedown', handlePointerDown)
  }, [open])

  const handleSelect = useCallback(
    (item) => {
      if (!item) return
      onSelect(item)
      setQuery('')
      setOpen(false)
      inputRef.current?.blur()
    },
    [onSelect]
  )

  const handleInputKeyDown = (event) => {
    if (event.key === 'Escape') {
      setOpen(false)
      inputRef.current?.blur()
      return
    }
    if (!open || results.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((prev) => (prev + 1) % results.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((prev) => (prev - 1 + results.length) % results.length)
    } else if (event.key === 'Enter') {
      event.preventDefault()
      handleSelect(results[activeIndex])
    }
  }

  const showPanel = open

  return (
    <div className="cmd" ref={rootRef}>
      <div className={`cmd__field ${open ? 'is-open' : ''}`}>
        <SearchIcon />
        <input
          ref={inputRef}
          className="cmd__input"
          type="text"
          value={query}
          placeholder="Buscar carreras, cursos, métodos (find, push, sort...)"
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleInputKeyDown}
          autoComplete="off"
        />
        {query ? (
          <button
            type="button"
            className="cmd__clear"
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
          >
            ✕
          </button>
        ) : (
          <span className="cmd__kbd">
            <kbd>Ctrl</kbd>
            <kbd>K</kbd>
          </span>
        )}
      </div>

      {showPanel && (
        <div className="cmd__panel">
          <div className="cmd__panel-head">
            {query.trim() ? `${results.length} resultado(s)` : 'Sugerencias'}
          </div>
          {results.length === 0 ? (
            <p className="cmd__empty">Sin resultados para “{query.trim()}”.</p>
          ) : (
            <ul className="cmd__list">
              {results.map((item, i) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`cmd__item ${i === activeIndex ? 'is-active' : ''}`}
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => handleSelect(item)}
                  >
                    <span className="cmd__item-icon">{item.icon}</span>
                    <span className="cmd__item-text">
                      <span className="cmd__item-title">{item.title}</span>
                      <span className="cmd__item-sub">{item.subtitle}</span>
                    </span>
                    <span className="cmd__item-badge">{badgeText(item)}</span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}