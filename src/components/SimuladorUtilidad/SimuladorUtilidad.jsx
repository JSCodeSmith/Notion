import { useEffect, useMemo, useRef, useState } from 'react'
import CodeBlock from '../CodeBlock/CodeBlock'
import '../SimuladorFind/SimuladorFind.css'
import '../SimuladorMutador/SimuladorMutador.css' // reutiliza .arr-row, .arr-cell, .mut-*

const MAX = 10

/* ================= utilidades de formato ================= */
function fmt(v) {
  if (v === undefined) return 'undefined'
  if (typeof v === 'string') return JSON.stringify(v)
  if (Array.isArray(v)) return fmtArr(v)
  if (v && typeof v === 'object') {
    try { return JSON.stringify(v) } catch { return String(v) }
  }
  return String(v)
}
function fmtArr(a) {
  return `[${a.map(fmt).join(', ')}]`
}
// Igual que fmtArr pero muestra los huecos de arreglos dispersos
function fmtHuecos(a) {
  const out = []
  for (let i = 0; i < a.length; i++) {
    if (i in a) {
      out.push(fmt(a[i]))
    } else {
      let n = 0
      while (i < a.length && !(i in a)) { n++; i++ }
      i--
      out.push(`<${n} empty item${n > 1 ? 's' : ''}>`)
    }
  }
  return `[${out.join(', ')}]`
}

const inspeccionar = (v) => {
  if (v === undefined) return 'undefined'
  if (typeof v === 'string') return JSON.stringify(v)
  if (Array.isArray(v)) return fmtHuecos(v)
  if (v && typeof v === 'object') {
    try { return JSON.stringify(v) } catch { return String(v) }
  }
  return String(v)
}

/* ================= parseo de entradas ================= */
// Separa por comas de primer nivel (respeta [] y comillas)
function splitTop(text) {
  const out = []
  let depth = 0
  let quote = null
  let cur = ''
  for (const ch of text) {
    if (quote) { cur += ch; if (ch === quote) quote = null; continue }
    if (ch === '"' || ch === "'") { quote = ch; cur += ch; continue }
    if (ch === '[') depth++
    if (ch === ']') depth--
    if (ch === ',' && depth === 0) { out.push(cur); cur = ''; continue }
    cur += ch
  }
  if (cur.trim() !== '') out.push(cur)
  return out
}

function parseValor(t) {
  const s = t.trim()
  if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s)
  if (s === 'true') return true
  if (s === 'false') return false
  if (s === 'null') return null
  if (s === 'undefined') return undefined
  if (s.startsWith('[') && s.endsWith(']')) return parseLista(s)
  const m = s.match(/^(["'`])(.*)\1$/)
  return m ? m[2] : s
}

function parseLista(text) {
  const limpio = text.trim().replace(/^\[/, '').replace(/\]$/, '')
  if (limpio.trim() === '') return []
  return splitTop(limpio).map(parseValor)
}

// Argumentos de una llamada: los [..] se conservan como arrays anidados
const parseArgs = (text) => splitTop(text).map(parseValor)

/* ================= celdas ================= */
const C = (v, st = 'normal') => ({ v, st })
const base = (arr, st = 'normal') => arr.map((v) => C(v, st))
const GAP = { v: '', st: 'gap' }
const cellsReal = (a, st) => Array.from({ length: a.length }, (_, i) => (i in a ? C(a[i], st) : GAP))

const errorMax = `Máximo ${MAX} elementos para que la visualización sea legible.`

function cierre(steps, rows, retStr, extraMsg, tabla) {
  steps.push({
    rows,
    tabla,
    tipo: 'success',
    msg: '✔ Operación terminada',
    extra: [
      ...(extraMsg ? [{ tipo: 'iteration', msg: extraMsg }] : []),
      { tipo: 'result', msg: `⏹ Retorna: ${retStr}` },
    ],
  })
  return steps
}

/* ================= Array.of ================= */
function buildOf(v) {
  const items = parseArgs(v.items)
  if (items.length > MAX) return { error: `Máximo ${MAX} argumentos para que la visualización sea legible.` }
  const res = Array.of(...items)
  const lbl = '🏭 Array.of(...)'
  const fila = (cells) => ({ label: lbl, cells })

  const steps = [{ rows: [fila([])], tipo: 'system', msg: `Recibe ${items.length} argumento(s): ${fmtArr(items)}` }]
  items.forEach((it, i) => {
    const cells = base(items.slice(0, i + 1))
    cells[i].st = 'added'
    steps.push({ rows: [fila(cells)], tipo: 'success', msg: `Coloca ${fmt(it)} en el índice ${i}` })
  })
  steps.push({ rows: [fila(base(items))], tipo: 'iteration', msg: `length se establece en ${items.length}` })

  const solo = items.length === 1 && typeof items[0] === 'number'
  const final = fila(base(res, 'done'))
  if (solo) {
    const n = items[0]
    if (Number.isInteger(n) && n >= 0) {
      steps.push({
        rows: [final, { label: `⚖️ new Array(${n}) (para comparar)`, cells: Array(Math.min(n, 12)).fill(GAP) }],
        tipo: 'error',
        msg: `⚠ new Array(${n}) interpretaría ${n} como LONGITUD y crearía ${n} hueco(s) vacío(s). Array.of(${n}) lo guarda como ELEMENTO.`,
      })
    } else {
      steps.push({
        rows: [final],
        tipo: 'error',
        msg: `⚠ new Array(${n}) lanzaría RangeError (longitud inválida). Array.of(${n}) simplemente guarda el valor.`,
      })
    }
  } else if (items.length > 1) {
    steps.push({ rows: [final], tipo: 'system', msg: 'Con 2 o más argumentos new Array(...) daría lo mismo; la diferencia aparece solo con UN número.' })
  }

  cierre(steps, [final], fmtArr(res), `Resultado: array de ${res.length} elemento(s)`)
  return {
    steps,
    retStr: fmtArr(res),
    llamada: `Array.of(${items.map(fmt).join(', ')})`,
    codigo: `const resultado = Array.of(${items.map(fmt).join(', ')});`,
  }
}

/* ================= Array.isArray ================= */
const PRESETS = {
  vacio: { label: '[]', code: '[]', make: () => [], porque: 'es un arreglo real' },
  numeros: { label: '[1, 2, 3]', code: '[1, 2, 3]', make: () => [1, 2, 3], porque: 'es un arreglo real' },
  nuevo: { label: 'new Array()', code: 'new Array()', make: () => new Array(), porque: 'creado con el constructor, es un arreglo real' },
  proto: { label: 'Array.prototype', code: 'Array.prototype', make: () => Array.prototype, porque: 'curiosamente, el prototipo en sí es un arreglo' },
  objeto: { label: '{}', code: '{}', make: () => ({}), porque: 'es un objeto plano' },
  nulo: { label: 'null', code: 'null', make: () => null, porque: 'null no es un arreglo (aunque typeof diga "object")' },
  indef: { label: 'undefined', code: 'undefined', make: () => undefined, porque: 'no es un arreglo' },
  texto: { label: '"[]" (string)', code: '"[]"', make: () => '[]', porque: 'es un string, no un arreglo' },
  numero: { label: '42', code: '42', make: () => 42, porque: 'es un número' },
  arraylike: { label: '{ length: 2, 0: "a", 1: "b" } (array-like)', code: '{ length: 2, 0: "a", 1: "b" }', make: () => ({ length: 2, 0: 'a', 1: 'b' }), porque: 'tiene índices y length, pero es un objeto array-like' },
  args: { label: 'arguments (array-like)', code: '(function () { return arguments })(1, 2)', make: () => (function () { return arguments })(1, 2), porque: 'arguments es array-like, no un arreglo' },
  nodelist: { label: "document.querySelectorAll('p') (NodeList)", code: "document.querySelectorAll('p')", make: () => document.querySelectorAll('p'), porque: 'NodeList es array-like; conviértelo con Array.from()' },
}

function buildIsArray(v) {
  const p = PRESETS[v.valor]
  let x
  try { x = p.make() } catch (e) { return { error: `No se pudo crear el valor: ${e.message}` } }

  const t = typeof x
  const inst = x instanceof Array
  const isA = Array.isArray(x)

  const T = [['valor', p.code]]
  const steps = [{ tabla: [...T], tipo: 'system', msg: `Valor a evaluar: ${p.code}` }]

  T.push(['typeof valor', JSON.stringify(t)])
  steps.push({
    tabla: [...T],
    tipo: 'iteration',
    msg: t === 'object'
      ? 'typeof devuelve "object": no distingue arreglos de otros objetos'
      : `typeof devuelve "${t}"`,
  })

  T.push(['valor instanceof Array', String(inst)])
  steps.push({ tabla: [...T], tipo: 'iteration', msg: `instanceof Array → ${inst} (puede fallar con arreglos de otro iframe)` })

  T.push(['Array.isArray(valor)', String(isA)])
  steps.push({ tabla: [...T], tipo: isA ? 'success' : 'error', msg: `Array.isArray(valor) → ${isA}: ${p.porque}` })

  cierre(steps, undefined, String(isA), undefined, [...T])
  return {
    steps,
    retStr: String(isA),
    llamada: `Array.isArray(${p.code})`,
    codigo: `const valor = ${p.code};\nconst resultado = Array.isArray(valor);`,
  }
}

/* ================= at ================= */
function buildAt(v) {
  const arr = parseLista(v.arr)
  if (arr.length > MAX) return { error: errorMax }
  const raw = v.index.trim() === '' ? 0 : Number(v.index)
  const n = arr.length
  const rel = Number.isNaN(raw) ? 0 : Math.trunc(raw)
  const k = rel < 0 ? n + rel : rel
  const ret = arr.at(raw)
  const dentro = k >= 0 && k < n

  const fila = (cells) => [{ label: '📦 arr  (índice positivo arriba · negativo abajo)', cells, neg: true }]
  const steps = [{ rows: fila(base(arr)), tipo: 'system', msg: `Estado inicial: arr = ${fmtArr(arr)} · length = ${n}` }]

  if (!Number.isInteger(raw)) {
    steps.push({ rows: fila(base(arr)), tipo: 'iteration', msg: `${raw} no es un entero → se convierte a ${rel}` })
  }
  steps.push({
    rows: fila(base(arr)),
    tipo: 'iteration',
    msg: rel < 0
      ? `Índice negativo: cuenta desde el final → length + (${rel}) = ${n} + (${rel}) = ${k}`
      : `Índice no negativo: se usa directamente → ${k}`,
  })

  if (dentro) {
    const c = base(arr)
    c[k].st = 'current'
    steps.push({ rows: fila(c), tipo: 'success', msg: `La posición ${k} existe → devuelve ${fmt(arr[k])}` })
  } else {
    steps.push({
      rows: fila(base(arr)),
      tipo: 'error',
      msg: n === 0
        ? 'El array está vacío → devuelve undefined'
        : `La posición ${k} está fuera del rango 0..${n - 1} → devuelve undefined (sin lanzar error)`,
    })
  }

  const fin = base(arr)
  if (dentro) fin[k].st = 'done'
  cierre(steps, fila(fin), fmt(ret), `arr no cambia (método de solo lectura): ${fmtArr(arr)}`)
  return {
    steps,
    retStr: fmt(ret),
    llamada: `arr.at(${raw})`,
    codigo: `const arr = ${fmtArr(arr)};\nconst resultado = arr.at(${raw});`,
  }
}

/* ================= length ================= */
function buildLength(v) {
  const arr = parseLista(v.arr)
  if (arr.length > MAX) return { error: errorMax }
  const txt = v.nuevo.trim()
  const asignar = txt !== ''
  const nuevo = Number(txt)
  if (asignar && (!Number.isInteger(nuevo) || nuevo < 0 || nuevo > 4294967295)) {
    return { error: 'RangeError: Invalid array length (debe ser un entero entre 0 y 4294967295)' }
  }
  if (asignar && nuevo > 20) return { error: 'Máximo 20 para que la visualización sea legible.' }

  const n = arr.length
  const real = [...arr]
  if (asignar) real.length = nuevo
  const f = (cells) => [{ label: '📦 arr', cells }]

  const steps = [{ rows: f(base(arr)), tipo: 'system', msg: `Estado inicial: arr = ${fmtArr(arr)}` }]
  const lectura = base(arr)
  if (n) lectura[n - 1].st = 'compared'
  steps.push({
    rows: f(lectura),
    tipo: 'iteration',
    msg: n ? `Lectura: length = ${n} (índice más alto ${n - 1} + 1)` : 'Lectura: array vacío → length = 0',
  })

  if (asignar) {
    if (nuevo < n) {
      const c = base(arr)
      for (let i = nuevo; i < n; i++) c[i].st = 'removing'
      steps.push({ rows: f(c), tipo: 'error', msg: `Escritura: arr.length = ${nuevo} < ${n} → marca para eliminar los índices ${nuevo}..${n - 1}: ${fmtArr(arr.slice(nuevo))}` })
      steps.push({ rows: f(base(arr.slice(0, nuevo))), tipo: 'success', msg: 'Los elementos sobrantes se eliminan de forma destructiva y permanente' })
    } else if (nuevo > n) {
      steps.push({
        rows: f([...base(arr), ...Array(nuevo - n).fill(GAP)]),
        tipo: 'success',
        msg: `Escritura: arr.length = ${nuevo} > ${n} → crea ${nuevo - n} hueco(s) vacío(s); al leerlos devuelven undefined`,
      })
    } else {
      steps.push({ rows: f(base(arr)), tipo: 'iteration', msg: `Escritura: arr.length = ${nuevo} es el mismo valor → no cambia nada` })
    }
  }

  cierre(steps, f(cellsReal(real, 'done')), String(real.length), `arr quedó: ${fmtHuecos(real)} · length = ${real.length}`)
  return {
    steps,
    retStr: String(real.length),
    llamada: asignar ? `arr.length = ${nuevo}` : 'arr.length',
    codigo: `const arr = ${fmtArr(arr)};\n${asignar ? `arr.length = ${nuevo};\n` : ''}const total = arr.length;`,
  }
}

/* ================= concat ================= */
function buildConcat(v) {
  const arr = parseLista(v.arr)
  if (arr.length > MAX) return { error: errorMax }
  const args = parseArgs(v.args)
  const res = arr.concat(...args)

  const orig = { label: '📦 arr original', cells: base(arr) }
  const nuevo = (cells) => ({ label: '🆕 nuevo array (copia + argumentos)', cells })

  const steps = [{ rows: [orig, nuevo([])], tipo: 'system', msg: `Estado inicial: arr = ${fmtArr(arr)}` }]
  steps.push({ rows: [orig, nuevo(base(arr))], tipo: 'iteration', msg: 'Copia los elementos de arr en un array nuevo (copia superficial)' })

  let acum = [...arr]
  args.forEach((a, i) => {
    const agregados = Array.isArray(a) ? a : [a]
    const previo = [...acum]
    acum = [...acum, ...agregados]
    steps.push({
      rows: [orig, nuevo([...base(previo), ...base(agregados, 'added')])],
      tipo: 'success',
      msg: Array.isArray(a)
        ? `Argumento ${i + 1} es un array → agrega sus ${a.length} elemento(s) ${fmtArr(a)} (aplana un nivel)`
        : `Argumento ${i + 1} es un valor → se agrega tal cual: ${fmt(a)}`,
    })
  })

  cierre(steps, [orig, nuevo(base(res, 'done'))], fmtArr(res), `arr original intacto: ${fmtArr(arr)}`)
  return {
    steps,
    retStr: fmtArr(res),
    llamada: `arr.concat(${args.map(fmt).join(', ')})`,
    codigo: `const arr = ${fmtArr(arr)};\nconst nuevoArray = arr.concat(${args.map(fmt).join(', ')});`,
  }
}

/* ================= join ================= */
const SEPS = {
  def: { label: '(sin argumento) → usa ","', val: undefined },
  coma: { label: '", "', val: ', ' },
  espacio: { label: '" " (espacio)', val: ' ' },
  guion: { label: '"-"', val: '-' },
  barra: { label: '" | "', val: ' | ' },
  br: { label: '"<br>"', val: '<br>' },
  vacio: { label: '"" (vacío)', val: '' },
}

function buildJoin(v) {
  const arr = parseLista(v.arr)
  if (arr.length > MAX) return { error: errorMax }
  const s = SEPS[v.sep]
  const sepStr = s.val === undefined ? ',' : s.val
  const ret = s.val === undefined ? arr.join() : arr.join(s.val)
  const sepCode = s.val === undefined ? '' : JSON.stringify(s.val)
  const f = (cells) => [{ label: '📦 arr', cells }]

  const steps = [{
    rows: f(base(arr)),
    tabla: [['resultado parcial', '""']],
    tipo: 'system',
    msg: `Estado inicial: arr = ${fmtArr(arr)} · separador = ${JSON.stringify(sepStr)}${s.val === undefined ? ' (por defecto)' : ''}`,
  }]

  let acc = ''
  arr.forEach((el, i) => {
    const vacio = el === null || el === undefined
    const pieza = vacio ? '' : String(el)
    acc = i === 0 ? pieza : acc + sepStr + pieza
    const c = base(arr)
    for (let k = 0; k < i; k++) c[k].st = 'added'
    c[i].st = 'compared'
    const conv = vacio ? `${fmt(el)} se convierte en "" (vacío)` : `Convierte ${fmt(el)} a texto → ${JSON.stringify(pieza)}`
    steps.push({
      rows: f(c),
      tabla: [['resultado parcial', JSON.stringify(acc)]],
      tipo: 'iteration',
      msg: `${conv}${i > 0 ? ` y lo une con el separador ${JSON.stringify(sepStr)}` : ''}`,
    })
  })
  if (!arr.length) {
    steps.push({ rows: f([]), tabla: [['resultado parcial', '""']], tipo: 'error', msg: 'Array vacío: no hay nada que unir → retorna ""' })
  }

  cierre(steps, f(base(arr)), JSON.stringify(ret), `arr original intacto: ${fmtArr(arr)} · typeof resultado = "string"`, [['resultado final', JSON.stringify(ret)]])
  return {
    steps,
    retStr: JSON.stringify(ret),
    llamada: `arr.join(${sepCode})`,
    codigo: `const arr = ${fmtArr(arr)};\nconst texto = arr.join(${sepCode});`,
  }
}

/* ================= helpers para los métodos de transformación ================= */
const opts = (obj) => Object.entries(obj).map(([value, p]) => ({ value, label: p.label ?? p.code }))
const numOpt = (txt) => (txt.trim() === '' ? undefined : Number(txt))
// Normaliza un índice como lo hacen slice / fill / copyWithin
const idxRel = (x, n, def) => {
  if (x === undefined) return def
  const t = Number.isNaN(x) ? 0 : Math.trunc(x)
  return t < 0 ? Math.max(n + t, 0) : Math.min(t, n)
}

/* ================= map ================= */
const MAP_FNS = {
  doble: { code: 'n => n * 2', fn: (n) => n * 2 },
  mas1: { code: 'n => n + 1', fn: (n) => n + 1 },
  cuad: { code: 'n => n ** 2', fn: (n) => n ** 2 },
  moneda: { code: 'n => "$" + Number(n).toFixed(2)', fn: (n) => '$' + Number(n).toFixed(2) },
  indice: { code: '(n, i) => n * i', fn: (n, i) => n * i },
  sinReturn: { label: 'n => { n * 2 }   (olvida el return)', code: 'n => { n * 2 }', fn: () => undefined },
}

function buildMap(v) {
  const arr = parseLista(v.arr)
  if (arr.length > MAX) return { error: errorMax }
  const f = MAP_FNS[v.fn]
  const res = arr.map(f.fn)
  const orig = (cells) => ({ label: '📦 arr original', cells })
  const nuevo = (cells) => ({ label: '🆕 nuevo array', cells })

  const steps = [{ rows: [orig(base(arr)), nuevo([])], tipo: 'system', msg: `Estado inicial: arr = ${fmtArr(arr)}` }]
  arr.forEach((el, i) => {
    const c = base(arr)
    c[i].st = 'current'
    const salida = base(res.slice(0, i + 1))
    salida[i].st = 'added'
    steps.push({
      rows: [orig(c), nuevo(salida)],
      tipo: res[i] === undefined ? 'error' : 'success',
      msg: `callback(${fmt(el)}, ${i}) → ${fmt(res[i])}${res[i] === undefined ? '  (¡el callback no devolvió nada!)' : ''}`,
    })
  })
  cierre(steps, [orig(base(arr)), nuevo(base(res, 'done'))], fmtArr(res), `arr original intacto: ${fmtArr(arr)} · el nuevo array tiene el mismo length (${res.length})`)
  return {
    steps,
    retStr: fmtArr(res),
    llamada: `arr.map(${f.code})`,
    codigo: `const arr = ${fmtArr(arr)};\nconst nuevoArray = arr.map(${f.code});`,
  }
}

/* ================= filter ================= */
const FILTER_FNS = {
  par: { code: 'n => n % 2 === 0', fn: (n) => n % 2 === 0 },
  mayor3: { code: 'n => n > 3', fn: (n) => n > 3 },
  distinto3: { code: 'n => n !== 3', fn: (n) => n !== 3 },
  boolean: { label: 'Boolean   (quita valores falsy)', code: 'Boolean', fn: Boolean },
  indice: { code: '(n, i) => i !== 1', fn: (n, i) => i !== 1 },
}

function buildFilter(v) {
  const arr = parseLista(v.arr)
  if (arr.length > MAX) return { error: errorMax }
  const f = FILTER_FNS[v.fn]
  const res = arr.filter(f.fn)
  const orig = (cells) => ({ label: '📦 arr original (verde = se queda · rojo = se descarta)', cells })
  const nuevo = (cells) => ({ label: '🆕 nuevo array', cells })

  const steps = [{ rows: [orig(base(arr)), nuevo([])], tipo: 'system', msg: `Estado inicial: arr = ${fmtArr(arr)}` }]
  const estados = []
  const quedan = []
  arr.forEach((el, i) => {
    const ok = Boolean(f.fn(el, i, arr))
    estados.push(ok ? 'added' : 'removing')
    if (ok) quedan.push(el)
    const c = base(arr)
    estados.forEach((st, k) => { c[k].st = st })
    steps.push({
      rows: [orig(c), nuevo(base(quedan, 'added'))],
      tipo: ok ? 'success' : 'error',
      msg: `callback(${fmt(el)}, ${i}) → ${ok} → ${ok ? 'se conserva ✅' : 'se descarta ❌'}`,
    })
  })
  cierre(steps, [orig(base(arr)), nuevo(base(res, 'done'))], fmtArr(res), `arr original intacto: ${fmtArr(arr)} · se conservaron ${res.length} de ${arr.length}`)
  return {
    steps,
    retStr: fmtArr(res),
    llamada: `arr.filter(${f.code})`,
    codigo: `const arr = ${fmtArr(arr)};\nconst nuevoArray = arr.filter(${f.code});`,
  }
}

/* ================= flatMap ================= */
const FLATMAP_FNS = {
  par: { code: 'n => [n, n * 2]', fn: (n) => [n, n * 2] },
  uno: { code: 'n => [n * 2]', fn: (n) => [n * 2] },
  filtra: { label: 'n => (n % 2 === 0 ? [n * 10] : [])   (filtra y transforma)', code: 'n => (n % 2 === 0 ? [n * 10] : [])', fn: (n) => (n % 2 === 0 ? [n * 10] : []) },
  valor: { code: 'n => n * 2   (devuelve un valor, no un array)', fn: (n) => n * 2 },
  doble: { label: 'n => [[n]]   (anidado: solo aplana un nivel)', code: 'n => [[n]]', fn: (n) => [[n]] },
}

function buildFlatMap(v) {
  const arr = parseLista(v.arr)
  if (arr.length > MAX) return { error: errorMax }
  const f = FLATMAP_FNS[v.fn]
  const res = arr.flatMap(f.fn)
  const orig = (cells) => ({ label: '📦 arr original', cells })
  const nuevo = (cells) => ({ label: '🆕 nuevo array (aplanado un nivel)', cells })

  const steps = [{ rows: [orig(base(arr)), nuevo([])], tabla: [['map() intermedio', '[]']], tipo: 'system', msg: `Estado inicial: arr = ${fmtArr(arr)}` }]
  const mapeados = []
  let acum = []
  arr.forEach((el, i) => {
    const r = f.fn(el, i)
    mapeados.push(r)
    const agregados = Array.isArray(r) ? r : [r]
    const previo = acum
    acum = [...acum, ...agregados]
    const c = base(arr)
    c[i].st = 'current'
    steps.push({
      rows: [orig(c), nuevo([...base(previo), ...base(agregados, 'added')])],
      tabla: [['map() intermedio', fmtArr(mapeados)]],
      tipo: agregados.length ? 'success' : 'error',
      msg: `callback(${fmt(el)}) → ${fmt(r)} → ${agregados.length ? `aplana un nivel y agrega ${fmtArr(agregados)}` : 'array vacío: no agrega nada'}`,
    })
  })
  cierre(steps, [orig(base(arr)), nuevo(base(res, 'done'))], fmtArr(res), 'Equivale a arr.map(callback).flat(1)', [['map() intermedio', fmtArr(mapeados)], ['flat(1) → resultado', fmtArr(res)]])
  return {
    steps,
    retStr: fmtArr(res),
    llamada: `arr.flatMap(${f.code})`,
    codigo: `const arr = ${fmtArr(arr)};\nconst nuevoArray = arr.flatMap(${f.code});`,
  }
}

/* ================= slice ================= */
function buildSlice(v) {
  const arr = parseLista(v.arr)
  if (arr.length > MAX) return { error: errorMax }
  const n = arr.length
  const sArg = numOpt(v.start)
  const eArg = numOpt(v.end)
  const res = arr.slice(sArg, eArg)
  const s = idxRel(sArg, n, 0)
  const e = idxRel(eArg, n, n)

  const orig = (cells) => ({ label: '📦 arr  (índice positivo arriba · negativo abajo)', cells, neg: true })
  const nuevo = (cells) => ({ label: '🆕 nuevo array', cells })
  const steps = [{ rows: [orig(base(arr)), nuevo([])], tipo: 'system', msg: `Estado inicial: arr = ${fmtArr(arr)} · length = ${n}` }]

  steps.push({
    rows: [orig(base(arr)), nuevo([])],
    tipo: 'iteration',
    msg: sArg === undefined ? 'start omitido → 0'
      : sArg < 0 ? `start = ${sArg} es negativo → ${n} + (${sArg}) = ${s}`
      : `start = ${s} (inclusivo: este elemento SÍ entra)`,
  })
  steps.push({
    rows: [orig(base(arr)), nuevo([])],
    tipo: 'iteration',
    msg: eArg === undefined ? `end omitido → length = ${n}`
      : eArg < 0 ? `end = ${eArg} es negativo → ${n} + (${eArg}) = ${e}`
      : `end = ${e} (exclusivo: este elemento NO entra)`,
  })

  if (e > s) {
    const c = base(arr)
    for (let i = s; i < e; i++) c[i].st = 'current'
    steps.push({ rows: [orig(c), nuevo([])], tipo: 'success', msg: `Rango a copiar: índices ${s}..${e - 1} → ${fmtArr(arr.slice(s, e))}` })
    steps.push({ rows: [orig(base(arr)), nuevo(base(res, 'added'))], tipo: 'success', msg: 'Copia superficial de esos elementos en un array nuevo' })
  } else {
    steps.push({ rows: [orig(base(arr)), nuevo([])], tipo: 'error', msg: `start (${s}) ≥ end (${e}) → rango vacío → devuelve []` })
  }

  cierre(steps, [orig(base(arr)), nuevo(base(res, 'done'))], fmtArr(res), `arr original intacto: ${fmtArr(arr)}`)
  return {
    steps,
    retStr: fmtArr(res),
    llamada: `arr.slice(${[sArg, eArg].filter((x) => x !== undefined).join(', ')})`,
    codigo: `const arr = ${fmtArr(arr)};\nconst parte = arr.slice(${[sArg, eArg].filter((x) => x !== undefined).join(', ')});`,
  }
}

/* ================= fill ================= */
function buildFill(v) {
  const arr = parseLista(v.arr)
  if (arr.length > MAX) return { error: errorMax }
  const n = arr.length
  const val = parseValor(v.valor)
  const sArg = numOpt(v.start)
  const eArg = numOpt(v.end)
  const real = [...arr]
  real.fill(val, sArg, eArg)
  const s = idxRel(sArg, n, 0)
  const e = idxRel(eArg, n, n)

  const orig = { label: '📦 arr antes (referencia)', cells: base(arr) }
  const mut = (cells) => ({ label: '✏️ arr (se modifica en el lugar)', cells })
  const steps = [{ rows: [orig, mut(base(arr))], tipo: 'system', msg: `Estado inicial: arr = ${fmtArr(arr)}` }]
  steps.push({
    rows: [orig, mut(base(arr))],
    tipo: 'iteration',
    msg: e > s ? `Rango a rellenar: índices ${s}..${e - 1} (start inclusivo, end exclusivo)` : `Rango vacío (start ${s} ≥ end ${e}) → no rellena nada`,
  })
  const cur = [...arr]
  for (let i = s; i < e; i++) {
    cur[i] = val
    const c = base(cur)
    for (let k = s; k <= i; k++) c[k].st = 'added'
    steps.push({ rows: [orig, mut(c)], tipo: 'success', msg: `arr[${i}] = ${fmt(val)}` })
  }
  cierre(steps, [orig, mut(base(real, 'done'))], fmtArr(real), `arr quedó: ${fmtArr(real)} · el retorno es la MISMA referencia de arr`)
  const args = [fmt(val), sArg, eArg].filter((x, i) => i === 0 || x !== undefined).join(', ')
  return {
    steps,
    retStr: fmtArr(real),
    llamada: `arr.fill(${args})`,
    codigo: `const arr = ${fmtArr(arr)};\nconst retorno = arr.fill(${args});`,
  }
}

/* ================= with ================= */
function buildWith(v) {
  const arr = parseLista(v.arr)
  if (arr.length > MAX) return { error: errorMax }
  const n = arr.length
  const raw = v.index.trim() === '' ? 0 : Number(v.index)
  const rel = Number.isNaN(raw) ? 0 : Math.trunc(raw)
  const k = rel < 0 ? n + rel : rel
  const val = parseValor(v.valor)
  const dentro = k >= 0 && k < n

  const orig = { label: '📦 arr original  (índice positivo arriba · negativo abajo)', cells: base(arr), neg: true }
  const nuevo = (cells) => ({ label: '🆕 nuevo array', cells })
  const steps = [{ rows: [orig, nuevo([])], tipo: 'system', msg: `Estado inicial: arr = ${fmtArr(arr)} · length = ${n}` }]
  steps.push({
    rows: [orig, nuevo([])],
    tipo: 'iteration',
    msg: rel < 0 ? `Índice negativo: ${n} + (${rel}) = ${k}` : `Índice no negativo: se usa directamente → ${k}`,
  })

  const llamada = `arr.with(${rel}, ${fmt(val)})`
  const codigo = `const arr = ${fmtArr(arr)};\nconst nuevoArray = arr.with(${rel}, ${fmt(val)});`
  if (!dentro) {
    steps.push({
      rows: [orig],
      tipo: 'error',
      msg: '✖ RangeError: Invalid index',
      extra: [
        { tipo: 'error', msg: `El índice ${k} está fuera del rango 0..${n - 1}: with() lanza un error en lugar de devolver undefined` },
        { tipo: 'result', msg: '⏹ Lanza RangeError (no devuelve ningún array)' },
      ],
    })
    return { steps, retStr: 'RangeError', llamada, codigo }
  }

  const res = arr.with(rel, val)
  steps.push({ rows: [orig, nuevo(base(arr))], tipo: 'iteration', msg: 'Crea una copia superficial de arr' })
  const c = base(arr)
  c[k] = C(val, 'added')
  steps.push({ rows: [orig, nuevo(c)], tipo: 'success', msg: `Reemplaza la posición ${k} de la copia: ${fmt(arr[k])} → ${fmt(val)}` })
  cierre(steps, [orig, nuevo(base(res, 'done'))], fmtArr(res), `arr original intacto: ${fmtArr(arr)}`)
  return { steps, retStr: fmtArr(res), llamada, codigo }
}

/* ================= Array.from ================= */
const FROM_SRC = {
  texto: { code: '"Hola"', make: () => 'Hola', tipo: 'iterable (string: un carácter por elemento)' },
  set: { code: 'new Set([1, 2, 2, 3])', make: () => new Set([1, 2, 2, 3]), tipo: 'iterable (Set: ya no tiene duplicados)' },
  map: { code: 'new Map([["a", 1], ["b", 2]])', make: () => new Map([['a', 1], ['b', 2]]), tipo: 'iterable (Map: entrega pares [clave, valor])' },
  arraylike: { code: '{ 0: "a", 1: "b", length: 2 }', make: () => ({ 0: 'a', 1: 'b', length: 2 }), tipo: 'array-like (tiene length e índices)' },
  length3: { code: '{ length: 3 }', make: () => ({ length: 3 }), tipo: 'array-like (length 3 sin índices → 3 × undefined)' },
  sinlength: { code: '{ a: 1, b: 2 }', make: () => ({ a: 1, b: 2 }), tipo: 'objeto sin length ni iterador → no hay nada que extraer' },
  array: { code: '[1, 2, 3]', make: () => [1, 2, 3], tipo: 'iterable (array: copia superficial)' },
}
const FROM_FNS = {
  ninguna: { label: '(sin función de mapeo)', code: '', fn: undefined },
  indice: { code: '(_, i) => i + 1', fn: (_, i) => i + 1 },
  mayus: { code: 'x => String(x).toUpperCase()', fn: (x) => String(x).toUpperCase() },
  doble: { code: 'x => x * 2', fn: (x) => x * 2 },
  objetos: { code: '() => ({ puntos: 0 })', fn: () => ({ puntos: 0 }) },
}

function buildFrom(v) {
  const p = FROM_SRC[v.src]
  const f = FROM_FNS[v.fn]
  const src = p.make()
  const extraidos = Array.from(src)
  const res = f.fn ? Array.from(src, f.fn) : extraidos
  if (extraidos.length > MAX) return { error: errorMax }

  const T = [['fuente', p.code], ['tipo', p.tipo]]
  const filaExt = (cells) => ({ label: '📥 elementos extraídos de la fuente', cells })
  const filaRes = (cells) => ({ label: '🆕 resultado (Array real)', cells })
  const steps = [{ tabla: T, tipo: 'system', msg: `Fuente: ${p.code}` }]
  steps.push({
    rows: [filaExt(base(extraidos))],
    tabla: T,
    tipo: extraidos.length ? 'iteration' : 'error',
    msg: extraidos.length ? `Es ${p.tipo} → extrae ${extraidos.length} elemento(s)` : `${p.tipo}: devuelve []`,
  })
  if (f.fn) {
    extraidos.forEach((el, i) => {
      const c = base(extraidos)
      c[i].st = 'current'
      const salida = base(res.slice(0, i + 1))
      salida[i].st = 'added'
      steps.push({ rows: [filaExt(c), filaRes(salida)], tabla: T, tipo: 'success', msg: `mapFn(${fmt(el)}, ${i}) → ${fmt(res[i])}` })
    })
  }
  const independientes = v.fn === 'objetos' && res.length > 1 ? 'Cada celda es un objeto NUEVO e independiente (con fill({...}) todas compartirían la misma referencia)' : undefined
  cierre(steps, [filaRes(base(res, 'done'))], fmtArr(res), independientes, T)
  const llamadaArgs = f.fn ? `${p.code}, ${f.code}` : p.code
  return {
    steps,
    retStr: fmtArr(res),
    llamada: `Array.from(${llamadaArgs})`,
    codigo: `const resultado = Array.from(${llamadaArgs});`,
  }
}

/* ================= reverse / toReversed ================= */
function buildReverse(v, inmutable) {
  const arr = parseLista(v.arr)
  if (arr.length > MAX) return { error: errorMax }
  const n = arr.length
  const real = inmutable ? arr.toReversed() : [...arr].reverse()

  const orig = { label: '📦 arr antes (referencia)', cells: base(arr) }
  const trabajo = (cells) => ({ label: inmutable ? '🆕 nuevo array (copia invertida)' : '✏️ arr (se invierte en el lugar)', cells })
  const steps = [{ rows: [orig, trabajo(inmutable ? [] : base(arr))], tipo: 'system', msg: `Estado inicial: arr = ${fmtArr(arr)}` }]
  const work = [...arr]
  if (inmutable) steps.push({ rows: [orig, trabajo(base(work))], tipo: 'iteration', msg: 'Crea una copia superficial de arr (el original NO se tocará)' })
  if (n < 2) steps.push({ rows: [orig, trabajo(base(work))], tipo: 'iteration', msg: 'Con menos de 2 elementos no hay nada que invertir' })
  for (let i = 0; i < Math.floor(n / 2); i++) {
    const j = n - 1 - i
    const a = work[i]
    const b = work[j]
    work[i] = b
    work[j] = a
    const c = base(work)
    c[i].st = 'moved'
    c[j].st = 'moved'
    steps.push({ rows: [orig, trabajo(c)], tipo: 'iteration', msg: `Intercambia el índice ${i} (${fmt(a)}) con el índice ${j} (${fmt(b)})` })
  }
  cierre(
    steps,
    [orig, trabajo(base(real, 'done'))],
    fmtArr(real),
    inmutable ? `arr original intacto: ${fmtArr(arr)}` : `arr quedó: ${fmtArr(real)} · el retorno es la MISMA referencia de arr`,
  )
  const m = inmutable ? 'toReversed' : 'reverse'
  return {
    steps,
    retStr: fmtArr(real),
    llamada: `arr.${m}()`,
    codigo: `const arr = ${fmtArr(arr)};\nconst ${inmutable ? 'invertido' : 'retorno'} = arr.${m}();`,
  }
}

/* ================= flat ================= */
function buildFlat(v) {
  const arr = parseLista(v.arr)
  if (arr.length > MAX) return { error: errorMax }
  const dTxt = v.depth.trim()
  const depth = dTxt === '' ? 1 : dTxt.toLowerCase() === 'infinity' ? Infinity : Number(dTxt)
  if (Number.isNaN(depth)) return { error: 'Profundidad inválida (usa un número o Infinity).' }
  const res = arr.flat(depth)

  const orig = { label: '📦 arr original', cells: base(arr) }
  const actual = (label, cells) => ({ label, cells })
  const steps = [{ rows: [orig, actual('🆕 resultado', [])], tipo: 'system', msg: `Estado inicial: arr = ${fmtArr(arr)} · profundidad = ${depth}` }]

  let cur = arr
  let nivel = 0
  while (nivel < depth && cur.some(Array.isArray)) {
    cur = cur.flat(1)
    nivel++
    steps.push({
      rows: [orig, actual(`🆕 después del nivel ${nivel}`, base(cur))],
      tipo: 'success',
      msg: `Nivel ${nivel}: abre los subarreglos de primer nivel y sube sus elementos → ${fmtArr(cur)}`,
    })
  }
  if (nivel === 0) {
    steps.push({ rows: [orig, actual('🆕 resultado', base(cur))], tipo: 'iteration', msg: depth < 1 ? `Profundidad ${depth}: no aplana nada (devuelve una copia)` : 'No hay subarreglos: devuelve una copia' })
  } else if (cur.some(Array.isArray)) {
    steps.push({ rows: [orig, actual('🆕 resultado', base(cur))], tipo: 'error', msg: `Profundidad ${depth} alcanzada: los subarreglos más profundos se quedan anidados` })
  }
  cierre(steps, [orig, actual('🆕 resultado', base(res, 'done'))], fmtArr(res), `arr original intacto: ${fmtArr(arr)}`)
  return {
    steps,
    retStr: fmtArr(res),
    llamada: `arr.flat(${dTxt === '' ? '' : depth})`,
    codigo: `const arr = ${fmtArr(arr)};\nconst plano = arr.flat(${dTxt === '' ? '' : depth});`,
  }
}

/* ================= copyWithin ================= */
function buildCopyWithin(v) {
  const arr = parseLista(v.arr)
  if (arr.length > MAX) return { error: errorMax }
  const n = arr.length
  const tArg = v.target.trim() === '' ? 0 : Number(v.target)
  const sArg = numOpt(v.start)
  const eArg = numOpt(v.end)
  const real = [...arr]
  real.copyWithin(tArg, sArg, eArg)
  const to = idxRel(tArg, n, 0)
  const from = idxRel(sArg, n, 0)
  const fin = idxRel(eArg, n, n)
  const count = Math.min(fin - from, n - to)

  const orig = { label: '📦 arr antes (referencia)', cells: base(arr) }
  const mut = (cells) => ({ label: '✏️ arr (se modifica en el lugar · length no cambia)', cells })
  const steps = [{ rows: [orig, mut(base(arr))], tipo: 'system', msg: `Estado inicial: arr = ${fmtArr(arr)}` }]
  steps.push({ rows: [orig, mut(base(arr))], tipo: 'iteration', msg: `Índices resueltos → target: ${to} · start: ${from} · end: ${fin} (excluido)` })

  if (count > 0) {
    const origen = base(arr)
    for (let i = from; i < from + count; i++) origen[i].st = 'compared'
    steps.push({ rows: [orig, mut(origen)], tipo: 'iteration', msg: `Toma ${count} elemento(s) desde el índice ${from}: ${fmtArr(arr.slice(from, from + count))} (siempre lee los valores ORIGINALES)` })
    const destino = base(arr)
    for (let i = to; i < to + count; i++) destino[i].st = 'removing'
    steps.push({ rows: [orig, mut(destino)], tipo: 'error', msg: `Los va a pegar desde el índice ${to}, sobrescribiendo ${fmtArr(arr.slice(to, to + count))}` })
    const pegado = base(real)
    for (let i = to; i < to + count; i++) pegado[i].st = 'added'
    steps.push({ rows: [orig, mut(pegado)], tipo: 'success', msg: `Pegado: ${fmtArr(real.slice(to, to + count))} ahora ocupa los índices ${to}..${to + count - 1}` })
  } else {
    steps.push({ rows: [orig, mut(base(arr))], tipo: 'error', msg: 'No hay nada que copiar (rango vacío o fuera del final) → arr no cambia' })
  }
  cierre(steps, [orig, mut(base(real, 'done'))], fmtArr(real), `arr quedó: ${fmtArr(real)} · el retorno es la MISMA referencia de arr`)
  const args = [tArg, sArg, eArg].filter((x, i) => i === 0 || x !== undefined).join(', ')
  return {
    steps,
    retStr: fmtArr(real),
    llamada: `arr.copyWithin(${args})`,
    codigo: `const arr = ${fmtArr(arr)};\nconst retorno = arr.copyWithin(${args});`,
  }
}

/* ================= entries / keys / values ================= */
function buildIter(v, tipo) {
  const arr = parseLista(v.arr)
  if (arr.length > MAX) return { error: errorMax }
  const dato = (el, i) => (tipo === 'keys' ? i : tipo === 'values' ? el : [i, el])
  const res = arr.map((el, i) => dato(el, i))
  const f = (cells) => [{ label: '📦 arr', cells }]

  const steps = [{
    rows: f(base(arr)),
    tabla: [['iter', 'Array Iterator (todavía no recorrió nada)']],
    tipo: 'system',
    msg: `arr.${tipo}() crea un iterador perezoso: aún no recorrió nada`,
  }]
  arr.forEach((el, i) => {
    const c = base(arr)
    c[i].st = 'current'
    const d = dato(el, i)
    steps.push({
      rows: f(c),
      tabla: [['iter.next()', `{ value: ${fmt(d)}, done: false }`], ['entregado hasta ahora', fmtArr(res.slice(0, i + 1))]],
      tipo: 'iteration',
      msg: `iter.next() → { value: ${fmt(d)}, done: false }`,
    })
  })
  steps.push({
    rows: f(base(arr)),
    tabla: [['iter.next()', '{ value: undefined, done: true }'], ['entregado hasta ahora', fmtArr(res)]],
    tipo: 'system',
    msg: 'iter.next() → { value: undefined, done: true }: el iterador se agotó',
  })
  cierre(steps, f(base(arr)), fmtArr(res), 'El retorno real de arr.' + tipo + '() es el iterador; aquí se muestra [...iter]', [
    ['[...iter]  (1.ª vez)', fmtArr(res)],
    ['[...iter]  (2.ª vez)', '[]   (iterador agotado)'],
    ['Array.isArray(iter)', 'false'],
  ])
  return {
    steps,
    retStr: fmtArr(res),
    llamada: `arr.${tipo}()`,
    codigo: `const arr = ${fmtArr(arr)};\nconst iter = arr.${tipo}();\nconst resultado = [...iter];`,
  }
}

/* ================= configuración por método ================= */
const CONFIGS = {
  of: {
    titulo: 'Array.of()',
    tag: 'Método ESTÁTICO · crea un array nuevo con sus argumentos',
    ret: 'nuevo array',
    campos: [{ key: 'items', label: 'argumentos (separa con comas)', def: '5', wide: true }],
    labArr: '[1, 2, 3]',
    ejemplo: 'Array.of(7)',
    build: buildOf,
  },
  isarray: {
    titulo: 'Array.isArray()',
    tag: 'Método ESTÁTICO · valida si un valor es un arreglo real',
    ret: 'booleano',
    campos: [{
      key: 'valor',
      label: 'valor a evaluar',
      tipo: 'select',
      def: 'vacio',
      wide: true,
      opciones: Object.entries(PRESETS).map(([value, p]) => ({ value, label: p.label })),
    }],
    labArr: '[1, 2, 3]',
    ejemplo: 'Array.isArray(arr)',
    build: buildIsArray,
  },
  at: {
    titulo: 'arr.at()',
    tag: 'Método de SOLO LECTURA · no modifica arr',
    ret: 'elemento en esa posición o undefined',
    campos: [
      { key: 'arr', label: 'arr (separa con comas)', def: '["a", "b", "c", "d"]', wide: true },
      { key: 'index', label: 'índice (acepta negativos)', tipo: 'number', def: '-1' },
    ],
    labArr: '["a", "b", "c", "d"]',
    ejemplo: 'arr.at(-1)',
    build: buildAt,
  },
  length: {
    titulo: 'arr.length',
    tag: 'PROPIEDAD de lectura y escritura · escribirla modifica arr',
    ret: 'número de elementos',
    campos: [
      { key: 'arr', label: 'arr (separa con comas)', def: '[1, 2, 3, 4, 5]', wide: true },
      { key: 'nuevo', label: 'asignar length (vacío = solo leer)', tipo: 'number', def: '', placeholder: 'solo leer' },
    ],
    labArr: '[1, 2, 3, 4, 5]',
    ejemplo: 'arr.length = 2',
    build: buildLength,
  },
  concat: {
    titulo: 'arr.concat()',
    tag: 'Método INMUTABLE · devuelve un array nuevo',
    ret: 'nuevo array combinado',
    campos: [
      { key: 'arr', label: 'arr (separa con comas)', def: '[1, 2]', wide: true },
      { key: 'args', label: 'argumentos (valores o [arrays])', def: '[3, 4], 5', wide: true },
    ],
    labArr: '[1, 2]',
    ejemplo: 'arr.concat([9, 9])',
    build: buildConcat,
  },
  join: {
    titulo: 'arr.join()',
    tag: 'Método INMUTABLE · devuelve un string',
    ret: 'string',
    campos: [
      { key: 'arr', label: 'arr (separa con comas)', def: '["Manzana", "Pera", "Uva"]', wide: true },
      {
        key: 'sep',
        label: 'separador',
        tipo: 'select',
        def: 'coma',
        opciones: Object.entries(SEPS).map(([value, s]) => ({ value, label: s.label })),
      },
    ],
    labArr: '["Manzana", "Pera", "Uva"]',
    ejemplo: 'arr.join("-")',
    build: buildJoin,
  },

  /* ---------- transformación y copia ---------- */
  map: {
    titulo: 'arr.map()',
    tag: 'Método INMUTABLE · transforma cada elemento y devuelve un array nuevo',
    ret: 'nuevo array del mismo length',
    campos: [
      { key: 'arr', label: 'arr (separa con comas)', def: '[1, 2, 3, 4]', wide: true },
      { key: 'fn', label: 'callback', tipo: 'select', def: 'doble', wide: true, opciones: opts(MAP_FNS) },
    ],
    labArr: '[1, 2, 3, 4]',
    ejemplo: 'arr.map(n => n * 2)',
    build: buildMap,
  },
  filter: {
    titulo: 'arr.filter()',
    tag: 'Método INMUTABLE · conserva los elementos que cumplen la condición',
    ret: 'nuevo array (puede ser más corto)',
    campos: [
      { key: 'arr', label: 'arr (separa con comas)', def: '[1, 2, 3, 4, 5, 6]', wide: true },
      { key: 'fn', label: 'callback', tipo: 'select', def: 'par', wide: true, opciones: opts(FILTER_FNS) },
    ],
    labArr: '[1, 2, 3, 4, 5, 6]',
    ejemplo: 'arr.filter(n => n > 3)',
    build: buildFilter,
  },
  flatmap: {
    titulo: 'arr.flatMap()',
    tag: 'Método INMUTABLE · map() + flat(1) en un solo paso',
    ret: 'nuevo array aplanado un nivel',
    campos: [
      { key: 'arr', label: 'arr (separa con comas)', def: '[1, 2, 3]', wide: true },
      { key: 'fn', label: 'callback', tipo: 'select', def: 'par', wide: true, opciones: opts(FLATMAP_FNS) },
    ],
    labArr: '[1, 2, 3]',
    ejemplo: 'arr.flatMap(n => [n, n * 2])',
    build: buildFlatMap,
  },
  slice: {
    titulo: 'arr.slice()',
    tag: 'Método INMUTABLE · copia superficial de una porción',
    ret: 'nuevo array con la porción',
    campos: [
      { key: 'arr', label: 'arr (separa con comas)', def: '[10, 20, 30, 40, 50]', wide: true },
      { key: 'start', label: 'start (inclusivo · vacío = 0)', tipo: 'number', def: '1', placeholder: '0' },
      { key: 'end', label: 'end (exclusivo · vacío = length)', tipo: 'number', def: '4', placeholder: 'hasta el final' },
    ],
    labArr: '[10, 20, 30, 40, 50]',
    ejemplo: 'arr.slice(-2)',
    build: buildSlice,
  },
  fill: {
    titulo: 'arr.fill()',
    tag: 'Método MUTADOR · rellena con un valor estático en el lugar',
    ret: 'el mismo array (misma referencia)',
    campos: [
      { key: 'arr', label: 'arr (separa con comas)', def: '[1, 2, 3, 4, 5]', wide: true },
      { key: 'valor', label: 'valor', def: '0' },
      { key: 'start', label: 'start (inclusivo)', tipo: 'number', def: '1', placeholder: '0' },
      { key: 'end', label: 'end (exclusivo)', tipo: 'number', def: '4', placeholder: 'hasta el final' },
    ],
    labArr: '[1, 2, 3, 4, 5]',
    ejemplo: 'new Array(3).fill(0)',
    build: buildFill,
  },
  with: {
    titulo: 'arr.with()',
    tag: 'Método INMUTABLE · reemplaza un índice en una copia',
    ret: 'nuevo array con el cambio',
    campos: [
      { key: 'arr', label: 'arr (separa con comas)', def: '[100, 250, 400, 500]', wide: true },
      { key: 'index', label: 'índice (acepta negativos)', tipo: 'number', def: '-1' },
      { key: 'valor', label: 'nuevo valor', def: '600' },
    ],
    labArr: '[100, 250, 400, 500]',
    ejemplo: 'arr.with(0, 999)',
    build: buildWith,
  },
  from: {
    titulo: 'Array.from()',
    tag: 'Método ESTÁTICO · crea un array desde un iterable o un array-like',
    ret: 'nuevo array real',
    campos: [
      { key: 'src', label: 'fuente', tipo: 'select', def: 'texto', wide: true, opciones: opts(FROM_SRC) },
      { key: 'fn', label: 'función de mapeo (opcional)', tipo: 'select', def: 'ninguna', wide: true, opciones: opts(FROM_FNS) },
    ],
    labArr: '[1, 2, 3]',
    ejemplo: 'Array.from({ length: 5 }, (_, i) => i + 1)',
    build: buildFrom,
  },
  toreversed: {
    titulo: 'arr.toReversed()',
    tag: 'Método INMUTABLE (ES2023) · devuelve una copia invertida',
    ret: 'nuevo array invertido',
    campos: [{ key: 'arr', label: 'arr (separa con comas)', def: '[1, 2, 3, 4]', wide: true }],
    labArr: '[1, 2, 3, 4]',
    ejemplo: 'arr.toReversed()',
    build: (v) => buildReverse(v, true),
  },
  reverse: {
    titulo: 'arr.reverse()',
    tag: 'Método MUTADOR · invierte arr en el lugar',
    ret: 'el mismo array (misma referencia)',
    campos: [{ key: 'arr', label: 'arr (separa con comas)', def: '[1, 2, 3, 4]', wide: true }],
    labArr: '[1, 2, 3, 4]',
    ejemplo: 'arr.reverse()',
    build: (v) => buildReverse(v, false),
  },
  flat: {
    titulo: 'arr.flat()',
    tag: 'Método INMUTABLE · aplana subarreglos hasta la profundidad indicada',
    ret: 'nuevo array aplanado',
    campos: [
      { key: 'arr', label: 'arr (puede tener [subarreglos])', def: '[1, [2, [3, [4]]]]', wide: true },
      { key: 'depth', label: 'profundidad (vacío = 1 · Infinity = todo)', def: '1', placeholder: '1' },
    ],
    labArr: '[1, [2, [3, [4]]]]',
    ejemplo: 'arr.flat(Infinity)',
    build: buildFlat,
  },
  copywithin: {
    titulo: 'arr.copyWithin()',
    tag: 'Método MUTADOR · copia una porción sobre otra posición del mismo array',
    ret: 'el mismo array (misma referencia)',
    campos: [
      { key: 'arr', label: 'arr (separa con comas)', def: '[1, 2, 3, 4, 5]', wide: true },
      { key: 'target', label: 'target (dónde pega)', tipo: 'number', def: '0' },
      { key: 'start', label: 'start (desde dónde copia)', tipo: 'number', def: '3', placeholder: '0' },
      { key: 'end', label: 'end (exclusivo)', tipo: 'number', def: '', placeholder: 'hasta el final' },
    ],
    labArr: '[1, 2, 3, 4, 5]',
    ejemplo: 'arr.copyWithin(2, 0, 2)',
    build: buildCopyWithin,
  },

  /* ---------- iteradores ---------- */
  entries: {
    titulo: 'arr.entries()',
    tag: 'Método de SOLO LECTURA · devuelve un iterador de pares [índice, valor]',
    ret: 'Array Iterator (no un array)',
    campos: [{ key: 'arr', label: 'arr (separa con comas)', def: '["a", "b", "c"]', wide: true }],
    labArr: '["a", "b", "c"]',
    ejemplo: '[...arr.entries()]',
    build: (v) => buildIter(v, 'entries'),
  },
  keys: {
    titulo: 'arr.keys()',
    tag: 'Método de SOLO LECTURA · devuelve un iterador de índices',
    ret: 'Array Iterator (no un array)',
    campos: [{ key: 'arr', label: 'arr (separa con comas)', def: '["🍎", "🍌", "🍊"]', wide: true }],
    labArr: '["🍎", "🍌", "🍊"]',
    ejemplo: '[...arr.keys()]',
    build: (v) => buildIter(v, 'keys'),
  },
  values: {
    titulo: 'arr.values()',
    tag: 'Método de SOLO LECTURA · devuelve un iterador de valores',
    ret: 'Array Iterator (no un array)',
    campos: [{ key: 'arr', label: 'arr (separa con comas)', def: '["🍎", "🍌", "🍊"]', wide: true }],
    labArr: '["🍎", "🍌", "🍊"]',
    ejemplo: '[...arr.values()]',
    build: (v) => buildIter(v, 'values'),
  },
}

/* ================= UI ================= */
function Fila({ cells, neg }) {
  if (!cells.length) return <div className="arr-row"><span className="arr-empty">[ ] vacío</span></div>
  return (
    <div className="arr-row">
      {cells.map((c, i) => (
        <div key={i} className={`arr-cell st-${c.st}`}>
          <div className="arr-val">{c.st === 'gap' ? '' : fmt(c.v)}</div>
          <div className="arr-idx">{i}</div>
          {neg && <div className="arr-idx" style={{ opacity: 0.6 }}>{i - cells.length}</div>}
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
      <span><i className="lg lg-compared" /> comparado / actual</span>
      <span><i className="lg lg-done" /> resultado final</span>
    </div>
  )
}

export default function SimuladorUtilidad({ metodoId }) {
  const cfg = CONFIGS[metodoId]

  const [vals, setVals] = useState(() => Object.fromEntries(cfg.campos.map((c) => [c.key, c.def])))
  const [paso, setPaso] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [velocidad, setVelocidad] = useState(900)

  // consola libre
  const [labArr, setLabArr] = useState(() => parseLista(cfg.labArr))
  const [cmd, setCmd] = useState(cfg.ejemplo)
  const [salida, setSalida] = useState([])
  const termRef = useRef(null)
  const replRef = useRef(null)

  const reset = () => {
    setPlaying(false)
    setPaso(0)
  }
  const editar = (key) => (e) => {
    setVals((prev) => ({ ...prev, [key]: e.target.value }))
    reset()
  }

  /* ---------- simulación ---------- */
  const sim = useMemo(() => cfg.build(vals), [cfg, vals])
  const listo = !sim.error
  const total = listo ? sim.steps.length : 0
  const terminado = listo && paso === total
  const actual = listo ? sim.steps[Math.max(paso - 1, 0)] : null

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

  /* ---------- logs de la terminal ---------- */
  const logs = []
  if (listo && paso > 0) {
    logs.push({ tipo: 'system', msg: `▶ Ejecutando ${sim.llamada}` })
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
      nuevas.push({ tipo: 'success', msg: `arr = ${fmtHuecos(arr)}` })
      setLabArr(arr)
    } catch (e) {
      nuevas.push({ tipo: 'error', msg: `${e.name}: ${e.message}` })
    }
    setSalida((prev) => [...prev, ...nuevas])
  }

  return (
    <div className="sim-container">
      <div className="sim-header">
        <h3>🧪 Laboratorio interactivo: <code>{cfg.titulo}</code></h3>
      </div>

      {/* ---------- EDITOR / CONTROLES ---------- */}
      <div className="sim-editor">
        <div className="sim-editor-header">{cfg.tag} · retorna: {cfg.ret}</div>

        {listo && (
          <div style={{ marginBottom: '16px' }}>
            <CodeBlock code={sim.codigo} />
          </div>
        )}

        <div className="mut-fields">
          {cfg.campos.map((c) => (
            <div key={c.key} className={`mut-field ${c.wide ? 'mut-field--wide' : ''}`}>
              <label>{c.label}</label>
              {c.tipo === 'select' ? (
                <select className="mut-select" value={vals[c.key]} onChange={editar(c.key)} disabled={playing}>
                  {c.opciones.map((o) => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
              ) : (
                <input
                  className="sim-input"
                  type={c.tipo === 'number' ? 'number' : 'text'}
                  step={c.tipo === 'number' ? 'any' : undefined}
                  value={vals[c.key]}
                  onChange={editar(c.key)}
                  placeholder={c.placeholder}
                  disabled={playing}
                  spellCheck={false}
                />
              )}
            </div>
          ))}
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

        {sim.error && <p className="mut-error">⚠ {sim.error}</p>}
      </div>

      {/* ---------- ESCENARIO VISUAL ---------- */}
      {listo && (
        <div className="mut-stage">
          {actual.rows?.map((r) => (
            <div key={r.label}>
              <div className="mut-label">{r.label}</div>
              <Fila cells={r.cells} neg={r.neg} />
            </div>
          ))}

          {actual.tabla && (
            <div className="mut-summary">
              {actual.tabla.map(([k, val]) => (
                <div key={k}><span>{k}</span><code>{val}</code></div>
              ))}
            </div>
          )}

          <div className="mut-return">
            <span className="mut-label" style={{ margin: 0 }}>↩ Valor retornado</span>
            <code>{terminado ? sim.retStr : '…'}</code>
            <span className="mut-return-desc">({cfg.ret})</span>
          </div>

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
            <span className="log-system">Prueba: {cfg.ejemplo} — o usa console.log(arr)</span>
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
          <button className="sim-btn" onClick={() => setLabArr(parseLista(vals.arr ?? cfg.labArr))} title="Vuelve a cargar el array del simulador">↺ arr</button>
          <button className="sim-btn" onClick={() => setSalida([])}>🧹</button>
        </div>
      </div>
    </div>
  )
}