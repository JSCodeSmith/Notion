import { useEffect, useMemo, useRef, useState } from 'react'
import CodeBlock from '../CodeBlock/CodeBlock'
import '../SimuladorFind/SimuladorFind.css'
import './SimuladorMutador.css'

const MAX = 10

/* ================= utilidades ================= */
const fmt = (v) => (typeof v === 'string' ? JSON.stringify(v) : String(v))
const fmtArr = (a) => `[${a.map(fmt).join(', ')}]`

const inspeccionar = (v) => {
  if (v === undefined) return 'undefined'
  if (typeof v === 'string') return JSON.stringify(v)
  if (Array.isArray(v)) return `[${v.map(inspeccionar).join(', ')}]`
  if (v && typeof v === 'object') {
    try { return JSON.stringify(v) } catch { return String(v) }
  }
  return String(v)
}

function parseValor(t) {
  const s = t.trim()
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s)
  if (s === 'true') return true
  if (s === 'false') return false
  if (s === 'null') return null
  const m = s.match(/^(["'`])(.*)\1$/)
  return m ? m[2] : s
}

function parseLista(text) {
  const limpio = text.trim().replace(/^\[/, '').replace(/\]$/, '')
  if (limpio.trim() === '') return []
  return limpio.split(',').map(parseValor)
}

const C = (v, st = 'normal') => ({ v, st })
const base = (arr, st = 'normal') => arr.map((v) => C(v, st))
const GAP = { v: '', st: 'gap' }

/* ================= comparadores ================= */
const COMPARADORES = {
  default: { label: 'Sin función (por defecto)', code: '', fn: undefined },
  asc: { label: '(a, b) => a - b', code: '(a, b) => a - b', fn: (a, b) => a - b },
  desc: { label: '(a, b) => b - a', code: '(a, b) => b - a', fn: (a, b) => b - a },
  locale: {
    label: "(a, b) => a.localeCompare(b, 'es')",
    code: "(a, b) => a.localeCompare(b, 'es')",
    fn: (a, b) => String(a).localeCompare(String(b), 'es'),
  },
}

const comparar = (key) => {
  const fn = COMPARADORES[key].fn
  return (a, b) => {
    const r = fn ? fn(a, b) : String(a) < String(b) ? -1 : String(a) > String(b) ? 1 : 0
    return Number.isNaN(r) ? 0 : r
  }
}

/* ================= metadatos por método ================= */
const META = {
  push: { fn: 'push', mutates: true, ret: 'nueva longitud', arr: '[1, 2, 3]', items: '4, 5', campos: ['items'], ejemplo: 'arr.push(99)' },
  pop: { fn: 'pop', mutates: true, ret: 'elemento eliminado', arr: '[1, 2, 3, 4]', campos: [], ejemplo: 'arr.pop()' },
  shift: { fn: 'shift', mutates: true, ret: 'elemento eliminado', arr: '["Josue", "Ana", "Hugo"]', campos: [], ejemplo: 'arr.shift()' },
  unshift: { fn: 'unshift', mutates: true, ret: 'nueva longitud', arr: '[3, 4]', items: '1, 2', campos: ['items'], ejemplo: 'arr.unshift("X")' },
  splice: { fn: 'splice', mutates: true, ret: 'array con los eliminados', arr: '["Diseñar", "Programar", "Testear"]', start: '1', dc: '1', items: '', campos: ['splice'], ejemplo: 'arr.splice(1, 1, "Nuevo")' },
  tospliced: { fn: 'toSpliced', mutates: false, ret: 'nuevo array ya modificado', arr: '[1, 10, 11, 4]', start: '1', dc: '2', items: '2, 3', campos: ['splice'], ejemplo: 'arr.toSpliced(0, 1)' },
  sort: { fn: 'sort', mutates: true, ret: 'el mismo array (misma referencia)', arr: '[10, 5, 80, 2]', cmp: 'default', campos: ['cmp'], ejemplo: 'arr.sort((a, b) => a - b)' },
  tosorted: { fn: 'toSorted', mutates: false, ret: 'nuevo array ordenado', arr: '["Marzo", "Enero", "Diciembre"]', cmp: 'default', campos: ['cmp'], ejemplo: 'arr.toSorted()' },
}

/* ================= ejecución REAL (fuente de verdad) ================= */
function ejecutarReal(id, orig, a) {
  const arr = [...orig]
  try {
    switch (id) {
      case 'push': return { arr, ret: arr.push(...a.items) }
      case 'pop': return { arr, ret: arr.pop() }
      case 'shift': return { arr, ret: arr.shift() }
      case 'unshift': return { arr, ret: arr.unshift(...a.items) }
      case 'splice': return { arr, ret: arr.splice(...a.spliceArgs) }
      case 'tospliced': return { arr, ret: arr.toSpliced(...a.spliceArgs) }
      case 'sort': return { arr, ret: arr.sort(a.cmpFn) }
      case 'tosorted': return { arr, ret: arr.toSorted(a.cmpFn) }
      default: return { error: 'Método desconocido' }
    }
  } catch (e) {
    return { error: `${e.name}: ${e.message}` }
  }
}

/* ================= trazas paso a paso ================= */
const inicial = (orig) => ({
  cells: base(orig),
  tipo: 'system',
  msg: `Estado inicial: arr = ${fmtArr(orig)} · length = ${orig.length}`,
})

const copia = (orig) => ({
  cells: base(orig),
  tipo: 'system',
  msg: 'Crea una copia superficial de arr (el original NO se tocará)',
})

function trazaPush(orig, items) {
  const steps = [inicial(orig)]
  const work = [...orig]
  items.forEach((it) => {
    work.push(it)
    const cells = base(work)
    cells[work.length - 1].st = 'added'
    steps.push({ cells, tipo: 'success', msg: `Coloca ${fmt(it)} en el índice ${work.length - 1}` })
  })
  steps.push({ cells: base(work), tipo: 'iteration', msg: `length se actualiza: ${orig.length} → ${work.length}` })
  return steps
}

function trazaPop(orig) {
  const steps = [inicial(orig)]
  if (!orig.length) {
    steps.push({ cells: [], tipo: 'error', msg: 'El array está vacío: no hay nada que remover' })
    return steps
  }
  const last = orig.length - 1
  const c = base(orig)
  c[last].st = 'removing'
  steps.push({ cells: c, tipo: 'iteration', msg: `Ubica el último elemento: índice length - 1 = ${last} → ${fmt(orig[last])}` })
  steps.push({ cells: base(orig.slice(0, last)), tipo: 'success', msg: `Remueve ${fmt(orig[last])} (será el valor retornado)` })
  steps.push({ cells: base(orig.slice(0, last)), tipo: 'iteration', msg: `length se actualiza: ${orig.length} → ${last}` })
  return steps
}

function trazaShift(orig) {
  const steps = [inicial(orig)]
  if (!orig.length) {
    steps.push({ cells: [], tipo: 'error', msg: 'El array está vacío: no hay primer elemento' })
    return steps
  }
  const c = base(orig)
  c[0].st = 'removing'
  steps.push({ cells: c, tipo: 'iteration', msg: `Ubica el elemento del índice 0 → ${fmt(orig[0])}` })
  const resto = orig.slice(1)
  steps.push({ cells: base(resto), tipo: 'success', msg: `Remueve ${fmt(orig[0])} (será el valor retornado)` })
  resto.forEach((v, k) => {
    const cells = base(resto)
    for (let i = 0; i <= k; i++) cells[i].st = 'moved'
    steps.push({ cells, tipo: 'iteration', msg: `Reindexa: ${fmt(v)} pasa del índice ${k + 1} al ${k}` })
  })
  steps.push({ cells: base(resto), tipo: 'iteration', msg: `length se actualiza: ${orig.length} → ${resto.length}` })
  return steps
}

function trazaUnshift(orig, items) {
  const steps = [inicial(orig)]
  const k = items.length
  if (!k) {
    steps.push({ cells: base(orig), tipo: 'iteration', msg: 'No hay elementos que añadir: el array no cambia' })
    return steps
  }
  steps.push({
    cells: [...Array(k).fill(GAP), ...base(orig, 'moved')],
    tipo: 'iteration',
    msg: `Desplaza ${orig.length} elemento(s) ${k} posición(es) a la derecha (cada índice i pasa a i + ${k})`,
  })
  items.forEach((it, i) => {
    steps.push({
      cells: [...items.slice(0, i + 1).map((v) => C(v, 'added')), ...Array(k - i - 1).fill(GAP), ...base(orig)],
      tipo: 'success',
      msg: `Inserta ${fmt(it)} en el índice ${i}`,
    })
  })
  steps.push({ cells: base([...items, ...orig]), tipo: 'iteration', msg: `length se actualiza: ${orig.length} → ${orig.length + k}` })
  return steps
}

function trazaSplice(orig, { start, dcOmitida, dc, items }, inmutable) {
  const n = orig.length
  const s = start < 0 ? Math.max(n + start, 0) : Math.min(start, n)
  const del = dcOmitida ? n - s : Math.min(Math.max(dc, 0), n - s)
  const antes = orig.slice(0, s)
  const quitados = orig.slice(s, s + del)
  const despues = orig.slice(s + del)
  const mueve = items.length !== del && despues.length > 0

  const steps = [inicial(orig)]
  if (inmutable) steps.push(copia(orig))

  const c1 = base(orig)
  if (s < n) c1[s].st = 'current'
  steps.push({
    cells: c1,
    tipo: 'iteration',
    msg:
      start < 0
        ? `start = ${start} es negativo → cuenta desde el final: ${n} + (${start}) = ${s}`
        : s >= n
          ? `start = ${start} ≥ length → se usa ${s} (el final del array)`
          : `Punto de partida (start): índice ${s}`,
  })

  if (del > 0) {
    const c2 = base(orig)
    for (let i = s; i < s + del; i++) c2[i].st = 'removing'
    steps.push({ cells: c2, tipo: 'error', msg: `deleteCount = ${del} → marca para eliminar: ${fmtArr(quitados)}` })
    steps.push({
      cells: base([...antes, ...despues]),
      tipo: 'success',
      msg: inmutable ? 'Los omite en la copia nueva' : 'Los elimina del array (se devuelven dentro de un array)',
    })
  } else {
    steps.push({ cells: base(orig), tipo: 'iteration', msg: 'deleteCount = 0 → no elimina nada' })
  }

  if (items.length) {
    steps.push({
      cells: [...base(antes), ...items.map((v) => C(v, 'added')), ...base(despues, mueve ? 'moved' : 'normal')],
      tipo: 'success',
      msg: `Inserta ${fmtArr(items)} desde el índice ${s}${mueve ? ' y desplaza el resto' : ''}`,
    })
  } else if (del > 0 && despues.length) {
    steps.push({
      cells: [...base(antes), ...base(despues, 'moved')],
      tipo: 'iteration',
      msg: 'Reindexa: los elementos posteriores se mueven hacia la izquierda',
    })
  }
  return steps
}

// Visualización didáctica con insertion sort (estable). El motor real usa TimSort;
// el resultado final es el mismo y sale de la ejecución real.
function trazaSort(orig, cmpKey, inmutable) {
  const cmp = comparar(cmpKey)
  const steps = [inicial(orig)]
  if (inmutable) steps.push(copia(orig))
  if (cmpKey === 'default') {
    steps.push({
      cells: base(orig),
      tipo: 'system',
      msg: 'Sin función: convierte cada valor a texto y compara por Unicode (por eso "10" va antes que "2")',
    })
  }
  const work = [...orig]
  for (let i = 1; i < work.length; i++) {
    for (let j = i - 1; j >= 0; j--) {
      const a = work[j]
      const b = work[j + 1]
      const r = cmp(a, b)
      if (r > 0) {
        work[j] = b
        work[j + 1] = a
        const cells = base(work)
        cells[j].st = 'moved'
        cells[j + 1].st = 'moved'
        steps.push({ cells, tipo: 'iteration', msg: `comparar(${fmt(a)}, ${fmt(b)}) = ${r} (> 0) → intercambia posiciones ${j} y ${j + 1}` })
      } else {
        const cells = base(work)
        cells[j].st = 'compared'
        cells[j + 1].st = 'compared'
        steps.push({ cells, tipo: 'success', msg: `comparar(${fmt(a)}, ${fmt(b)}) = ${r} (≤ 0) → ya están en orden` })
        break
      }
    }
  }
  return steps
}

/* ================= UI ================= */
function Fila({ cells }) {
  if (!cells.length) return <div className="arr-row"><span className="arr-empty">[ ] vacío</span></div>
  return (
    <div className="arr-row">
      {cells.map((c, i) => (
        <div key={i} className={`arr-cell st-${c.st}`}>
          <div className="arr-val">{c.st === 'gap' ? '' : fmt(c.v)}</div>
          <div className="arr-idx">{i}</div>
        </div>
      ))}
    </div>
  )
}

function Leyenda() {
  return (
    <div className="mut-legend">
      <span><i className="lg lg-added" /> agregado</span>
      <span><i className="lg lg-removing" /> eliminado</span>
      <span><i className="lg lg-moved" /> movido</span>
      <span><i className="lg lg-compared" /> comparado / inicio</span>
      <span><i className="lg lg-done" /> resultado final</span>
    </div>
  )
}

export default function SimuladorMutador({ metodoId }) {
  const meta = META[metodoId]

  const [arrText, setArrText] = useState(meta.arr)
  const [itemsText, setItemsText] = useState(meta.items ?? '')
  const [startText, setStartText] = useState(meta.start ?? '0')
  const [dcText, setDcText] = useState(meta.dc ?? '1')
  const [cmpKey, setCmpKey] = useState(meta.cmp ?? 'default')
  const [paso, setPaso] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [velocidad, setVelocidad] = useState(900)

  // consola libre
  const [labArr, setLabArr] = useState(() => parseLista(meta.arr))
  const [cmd, setCmd] = useState(meta.ejemplo)
  const [salida, setSalida] = useState([])
  const termRef = useRef(null)
  const replRef = useRef(null)

  const reset = () => {
    setPlaying(false)
    setPaso(0)
  }
  const editar = (setter) => (e) => {
    setter(e.target.value)
    reset()
  }

  /* ---------- entradas parseadas ---------- */
  const arrOrig = useMemo(() => parseLista(arrText), [arrText])
  const items = useMemo(() => parseLista(itemsText), [itemsText])
  const start = Math.trunc(Number(startText)) || 0
  const dcOmitida = dcText.trim() === '' && items.length === 0
  const dc = Math.trunc(Number(dcText)) || 0
  const error = arrOrig.length > MAX ? `Máximo ${MAX} elementos para que la visualización sea legible.` : null

  /* ---------- simulación completa ---------- */
  const sim = useMemo(() => {
    if (error) return null
    const spliceArgs = dcOmitida ? [start] : [start, dc, ...items]
    const real = ejecutarReal(metodoId, arrOrig, { items, spliceArgs, cmpFn: COMPARADORES[cmpKey].fn })
    if (real.error) return { error: real.error }

    let steps
    switch (metodoId) {
      case 'push': steps = trazaPush(arrOrig, items); break
      case 'pop': steps = trazaPop(arrOrig); break
      case 'shift': steps = trazaShift(arrOrig); break
      case 'unshift': steps = trazaUnshift(arrOrig, items); break
      case 'splice': steps = trazaSplice(arrOrig, { start, dcOmitida, dc, items }, false); break
      case 'tospliced': steps = trazaSplice(arrOrig, { start, dcOmitida, dc, items }, true); break
      case 'sort': steps = trazaSort(arrOrig, cmpKey, false); break
      default: steps = trazaSort(arrOrig, cmpKey, true)
    }

    const resultado = meta.mutates ? real.arr : real.ret
    const retStr = Array.isArray(real.ret) ? fmtArr(real.ret) : fmt(real.ret)
    steps.push({
      cells: base(resultado, 'done'),
      tipo: 'success',
      msg: '✔ Operación terminada',
      extra: [
        {
          tipo: 'iteration',
          msg: meta.mutates
            ? `arr quedó: ${fmtArr(real.arr)}`
            : `arr original intacto: ${fmtArr(real.arr)} · nuevoArray: ${fmtArr(real.ret)}`,
        },
        { tipo: 'result', msg: `⏹ Retorna: ${retStr}` },
      ],
    })
    return { steps, resultado, retStr, arrDespues: real.arr }
  }, [metodoId, arrOrig, items, start, dcOmitida, dc, cmpKey, error, meta.mutates])

  const total = sim?.steps?.length ?? 0
  const listo = Boolean(sim && !sim.error)
  const terminado = listo && paso === total
  const actual = listo && paso > 0 ? sim.steps[paso - 1] : null
  const celdas = actual ? actual.cells : base(arrOrig)

  /* ---------- autoplay ---------- */
  useEffect(() => {
    if (!playing) return
    if (paso >= total) {
      setPlaying(false)
      return
    }
    const t = setTimeout(() => setPaso((p) => p + 1), velocidad)
    return () => clearTimeout(t)
  }, [playing, paso, total, velocidad])

  const avanzar = () => setPaso((p) => Math.min(p + 1, total))
  const toggleEjecutar = () => {
    if (playing) return setPlaying(false)
    if (paso === 0 || paso >= total) setPaso(1)
    setPlaying(true)
  }

  /* ---------- código mostrado ---------- */
  const argsStr = (() => {
    if (metodoId === 'push' || metodoId === 'unshift') return items.map(fmt).join(', ')
    if (metodoId === 'splice' || metodoId === 'tospliced') {
      return (dcOmitida ? [start] : [start, dc, ...items]).map(fmt).join(', ')
    }
    if (metodoId === 'sort' || metodoId === 'tosorted') return COMPARADORES[cmpKey].code
    return ''
  })()
  const nombreVar = meta.mutates ? 'retorno' : 'nuevoArray'
  const codigo = `const arr = ${fmtArr(arrOrig)};\nconst ${nombreVar} = arr.${meta.fn}(${argsStr});`

  /* ---------- logs de la terminal ---------- */
  const logs = []
  if (listo && paso > 0) {
    logs.push({ tipo: 'system', msg: `▶ Ejecutando arr.${meta.fn}(${argsStr})` })
    sim.steps.slice(0, paso).forEach((s) => {
      logs.push({ tipo: s.tipo, msg: `> ${s.msg}` })
      s.extra?.forEach((e) => logs.push(e))
    })
  }

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight
  }, [paso])
  useEffect(() => {
    if (replRef.current) replRef.current.scrollTop = replRef.current.scrollHeight
  }, [salida])

  /* ---------- consola libre ---------- */
  const ejecutarCmd = () => {
    const code = cmd.trim()
    if (!code) return
    const arr = [...labArr]
    const nuevas = [{ tipo: 'system', msg: `› ${code}` }]
    const fakeConsole = {
      log: (...a) => nuevas.push({ tipo: 'iteration', msg: a.map((x) => (typeof x === 'string' ? x : inspeccionar(x))).join(' ') }),
    }
    try {
      let fn
      try {
        fn = new Function('arr', 'console', `"use strict"; return (${code.replace(/;+\s*$/, '')})`)
      } catch {
        fn = new Function('arr', 'console', `"use strict"; ${code}`)
      }
      const out = fn(arr, fakeConsole)
      if (out !== undefined) nuevas.push({ tipo: 'result', msg: `← ${inspeccionar(out)}` })
      nuevas.push({ tipo: 'success', msg: `arr = ${fmtArr(arr)}` })
      setLabArr(arr)
    } catch (e) {
      nuevas.push({ tipo: 'error', msg: `${e.name}: ${e.message}` })
    }
    setSalida((prev) => [...prev, ...nuevas])
  }

  return (
    <div className="sim-container">
      <div className="sim-header">
        <h3>🧪 Laboratorio interactivo: <code>arr.{meta.fn}()</code></h3>
      </div>

      {/* ---------- EDITOR / CONTROLES ---------- */}
      <div className="sim-editor">
        <div className="sim-editor-header">
          {meta.mutates ? 'Método MUTADOR · modifica arr en el lugar' : 'Método INMUTABLE · devuelve una copia nueva'} · retorna: {meta.ret}
        </div>

        <div style={{ marginBottom: '16px' }}>
          <CodeBlock code={codigo} />
        </div>

        <div className="mut-fields">
          <div className="mut-field mut-field--wide">
            <label>arr (separa con comas)</label>
            <input className="sim-input" value={arrText} onChange={editar(setArrText)} disabled={playing} spellCheck={false} />
          </div>

          {meta.campos.includes('items') && (
            <div className="mut-field mut-field--wide">
              <label>elementos a añadir</label>
              <input className="sim-input" value={itemsText} onChange={editar(setItemsText)} disabled={playing} spellCheck={false} />
            </div>
          )}

          {meta.campos.includes('splice') && (
            <>
              <div className="mut-field">
                <label>start</label>
                <input className="sim-input" type="number" value={startText} onChange={editar(setStartText)} disabled={playing} />
              </div>
              <div className="mut-field">
                <label>deleteCount</label>
                <input className="sim-input" type="number" value={dcText} onChange={editar(setDcText)} disabled={playing} placeholder="hasta el final" />
              </div>
              <div className="mut-field mut-field--wide">
                <label>item1, item2… (opcional)</label>
                <input className="sim-input" value={itemsText} onChange={editar(setItemsText)} disabled={playing} spellCheck={false} />
              </div>
            </>
          )}

          {meta.campos.includes('cmp') && (
            <div className="mut-field">
              <label>función de comparación</label>
              <select className="mut-select" value={cmpKey} onChange={editar(setCmpKey)} disabled={playing}>
                {Object.entries(COMPARADORES).map(([k, c]) => (
                  <option key={k} value={k}>{c.label}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        <div className="mut-actions">
          <button onClick={toggleEjecutar} className="sim-btn primary" disabled={!listo}>
            {playing ? '⏸ Pausar' : terminado ? '🔁 Repetir' : '▶ Ejecutar'}
          </button>
          <button onClick={avanzar} className="sim-btn" disabled={!listo || playing || terminado}>⏭ Paso</button>
          <button onClick={reset} className="sim-btn">🔄 Reset</button>
          <select className="mut-select" value={velocidad} onChange={(e) => setVelocidad(Number(e.target.value))}>
            <option value={1500}>Lento</option>
            <option value={900}>Normal</option>
            <option value={350}>Rápido</option>
          </select>
          {listo && <span className="mut-progress">Paso {paso} / {total}</span>}
        </div>

        {error && <p className="mut-error">⚠ {error}</p>}
        {sim?.error && <p className="mut-error">⚠ {sim.error}</p>}
        {metodoId.startsWith('sort') || metodoId === 'tosorted' ? (
          <p className="mut-note">Visualización didáctica con insertion sort; el motor real usa TimSort y el resultado final es el mismo.</p>
        ) : null}
      </div>

      {/* ---------- ESCENARIO VISUAL ---------- */}
      {listo && (
        <div className="mut-stage">
          <div>
            <div className="mut-label">📦 arr original (antes de ejecutar)</div>
            <Fila cells={base(arrOrig)} />
          </div>

          <div>
            <div className="mut-label">
              {meta.mutates ? '✏️ arr (se modifica en el lugar)' : '🆕 nuevoArray (copia · el original no cambia)'}
            </div>
            <Fila cells={celdas} />
          </div>

          <div className="mut-return">
            <span className="mut-label" style={{ margin: 0 }}>↩ Valor retornado</span>
            <code>{terminado ? sim.retStr : '…'}</code>
            <span className="mut-return-desc">({meta.ret})</span>
          </div>

          {terminado && (
            <div className="mut-summary">
              <div><span>Original antes</span><code>{fmtArr(arrOrig)}</code></div>
              <div>
                <span>{meta.mutates ? 'arr después (mutado)' : 'arr después (intacto ✔)'}</span>
                <code>{fmtArr(sim.arrDespues)}</code>
              </div>
              {!meta.mutates && <div><span>nuevoArray</span><code>{fmtArr(sim.resultado)}</code></div>}
              <div><span>Valor retornado</span><code>{sim.retStr}</code></div>
            </div>
          )}

          <Leyenda />
        </div>
      )}

      {/* ---------- TERMINAL PASO A PASO ---------- */}
      <div className="sim-console">
        <div className="sim-console-header">Terminal · paso a paso</div>
        <div className="sim-console-body" ref={termRef}>
          {logs.length === 0 && <span className="log-system">Esperando ejecución...</span>}
          {logs.map((l, i) => (
            <div key={i} className={`log-${l.tipo}`}>{l.msg}</div>
          ))}
        </div>
      </div>

      {/* ---------- CONSOLA LIBRE ---------- */}
      <div className="sim-console mut-lab">
        <div className="sim-console-header">
          🖥️ Consola libre · escribe JavaScript usando la variable <code>arr</code>
        </div>
        <div className="mut-lab-arr">
          <div className="mut-label">arr (vivo · {labArr.length} elemento(s))</div>
          <Fila cells={base(labArr)} />
        </div>
        <div className="sim-console-body" ref={replRef}>
          {salida.length === 0 && (
            <span className="log-system">Prueba: {meta.ejemplo} — o usa console.log(arr)</span>
          )}
          {salida.map((l, i) => (
            <div key={i} className={`log-${l.tipo}`}>{l.msg}</div>
          ))}
        </div>
        <div className="mut-repl-bar">
          <span className="mut-prompt">›</span>
          <input
            className="mut-repl-input"
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && ejecutarCmd()}
            spellCheck={false}
            placeholder="arr.push(10)"
          />
          <button className="sim-btn primary" onClick={ejecutarCmd}>Ejecutar</button>
          <button className="sim-btn" onClick={() => setLabArr(parseLista(arrText))} title="Vuelve a cargar el array del simulador">↺ arr</button>
          <button className="sim-btn" onClick={() => setSalida([])}>🧹</button>
        </div>
      </div>
    </div>
  )
}