/*
 * Importa los juegos reales de Apuntes/ (TSX + CSS) a componentes React JSX
 * dentro de src/components/SimuladorMetodos/juegosApuntes/.
 *
 * - Quita TypeScript con esbuild (loader tsx) y conserva JSX.
 * - Encapsula el CSS de cada juego bajo una clase .apx-<juego> para que sus
 *   reglas :root/html/body/#root no toquen el resto de la aplicación.
 * - Genera un Tailwind aislado bajo .apx-game (sin preflight global).
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { transform } from 'esbuild'
import postcss from 'postcss'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const RAIZ = path.resolve(__dirname, '..')
const APUNTES = path.join(RAIZ, 'Apuntes')
const DESTINO = path.join(
  RAIZ,
  'src',
  'components',
  'SimuladorMetodos',
  'juegosApuntes',
)
const RAW = path.join(DESTINO, 'raw')

const JUEGOS = [
  {
    metodo: 'findindex',
    orden: 1,
    nombre: 'FindindexJuego1',
    scope: 'apx-findindex-1',
    tsx: 'findIndex  , findLast  findLastIndex indexOf   lastIndexOf/Findindex.tsx',
    css: 'findIndex  , findLast  findLastIndex indexOf   lastIndexOf/Findindex.css',
  },
  {
    metodo: 'findindex',
    orden: 2,
    nombre: 'FindindexJuego2',
    scope: 'apx-findindex-2',
    tsx: 'findIndex  , findLast  findLastIndex indexOf   lastIndexOf/findIndexCine.tsx',
    css: 'findIndex  , findLast  findLastIndex indexOf   lastIndexOf/findIndexCine.css',
  },
  {
    metodo: 'findlast',
    orden: 1,
    nombre: 'FindlastJuego1',
    scope: 'apx-findlast-1',
    tsx: 'findIndex  , findLast  findLastIndex indexOf   lastIndexOf/findLast .tsx',
    css: 'findIndex  , findLast  findLastIndex indexOf   lastIndexOf/findLast .css',
  },
  {
    metodo: 'findlast',
    orden: 2,
    nombre: 'FindlastJuego2',
    scope: 'apx-findlast-2',
    tsx: 'findIndex  , findLast  findLastIndex indexOf   lastIndexOf/findLastCINE.tsx',
    css: 'findIndex  , findLast  findLastIndex indexOf   lastIndexOf/findLastCINE.css',
  },
  {
    metodo: 'findlastindex',
    orden: 1,
    nombre: 'FindlastindexJuego1',
    scope: 'apx-findlastindex-1',
    tsx: 'findIndex  , findLast  findLastIndex indexOf   lastIndexOf/findLastIndex.tsx',
    css: 'findIndex  , findLast  findLastIndex indexOf   lastIndexOf/findLastIndex .css',
  },
  {
    metodo: 'findlastindex',
    orden: 2,
    nombre: 'FindlastindexJuego2',
    scope: 'apx-findlastindex-2',
    tsx: 'findIndex  , findLast  findLastIndex indexOf   lastIndexOf/findLastIndexCarta.tsx',
    css: 'findIndex  , findLast  findLastIndex indexOf   lastIndexOf/findLastIndexCarta.css',
  },
  {
    metodo: 'some',
    orden: 1,
    nombre: 'SomeJuego1',
    scope: 'apx-some-1',
    tsx: 'some/juego.tsx',
    css: 'some/juego.css',
  },
  {
    metodo: 'some',
    orden: 2,
    nombre: 'SomeJuego2',
    scope: 'apx-some-2',
    tsx: 'some/juego2.tsx',
    css: 'some/index.css',
  },
  {
    metodo: 'every',
    orden: 1,
    nombre: 'EveryJuego1',
    scope: 'apx-every-1',
    tsx: 'every/App.tsx',
    css: 'every/index.css',
  },
  {
    metodo: 'every',
    orden: 2,
    nombre: 'EveryJuego2',
    scope: 'apx-every-2',
    tsx: 'every/jeugo.tsx',
    css: 'every/juego.css',
  },
  {
    metodo: 'indexof',
    orden: 1,
    nombre: 'IndexofJuego1',
    scope: 'apx-indexof-1',
    tsx: 'indexOf/App.tsx',
    css: 'indexOf/index.css',
  },
  {
    metodo: 'indexof',
    orden: 2,
    nombre: 'IndexofJuego2',
    scope: 'apx-indexof-2',
    tsx: 'indexOf/juego1.tsx',
    css: 'indexOf/jugo2.css',
  },
  {
    metodo: 'lastindexof',
    orden: 1,
    nombre: 'LastindexofJuego1',
    scope: 'apx-lastindexof-1',
    tsx: 'lastIndexOf/App.tsx',
    css: 'lastIndexOf/index.css',
  },
  {
    metodo: 'lastindexof',
    orden: 2,
    nombre: 'LastindexofJuego2',
    scope: 'apx-lastindexof-2',
    tsx: 'lastIndexOf/juego.tsx',
    css: 'lastIndexOf/juego.css',
  },
  {
    metodo: 'sort',
    orden: 1,
    nombre: 'SortJuego1',
    scope: 'apx-sort-1',
    tsx: 'sort/App.tsx',
    css: 'sort/index.css',
  },
  {
    metodo: 'sort',
    orden: 2,
    nombre: 'SortJuego2',
    scope: 'apx-sort-2',
    tsx: 'sort/juegos.tsx',
    css: 'sort/juegos.css',
  },
  {
    metodo: 'tosorted',
    orden: 1,
    nombre: 'TosortedJuego1',
    scope: 'apx-tosorted-1',
    tsx: 'toSorted/App.tsx',
    css: 'toSorted/index.css',
  },
  {
    metodo: 'tosorted',
    orden: 2,
    nombre: 'TosortedJuego2',
    scope: 'apx-tosorted-2',
    tsx: 'toSorted/juego.tsx',
    css: 'toSorted/juego.css',
  },
  {
    metodo: 'at',
    orden: 1,
    nombre: 'AtJuego1',
    scope: 'apx-at-1',
    tsx: 'at/App.tsx',
    css: 'at/index.css',
  },
  {
    metodo: 'at',
    orden: 2,
    nombre: 'AtJuego2',
    scope: 'apx-at-2',
    tsx: 'at/juegos.tsx',
    css: 'at/juegos.css',
  },
]

const escaparScope = (scope) => (scope.startsWith('.') ? scope : '.' + scope)

/* Convierte :root/html/body/#root en el wrapper y prefija el resto. */
function scopeSelector(selector, scope) {
  let s = selector.trim()
  if (!s) return s

  s = s.replace(
    /(^|[\s>+~,(])(:root|html|body|#root)(?=$|[\s>+~,.)#:[\]])/g,
    (_, antes) => antes + scope,
  )

  if (s === scope) return s
  if (s.startsWith(scope)) return s
  if (s === '*') return `${scope} *`
  return `${scope} ${s}`
}

function scopePlugin(scope) {
  const prefijo = escaparScope(scope)
  return {
    postcssPlugin: 'apx-scope-css',
    Once(root) {
      root.walkAtRules((at) => {
        if (at.name === 'tailwind' || at.name === 'import') at.remove()
      })
      root.walkRules((rule) => {
        if (
          rule.parent?.type === 'atrule' &&
          /keyframes$/i.test(rule.parent.name)
        ) {
          return
        }
        rule.selectors = rule.selectors.map((s) => scopeSelector(s, prefijo))
      })
    },
  }
}

async function convertirTsx(juego) {
  const ruta = path.join(APUNTES, juego.tsx)
  let codigo = fs.readFileSync(ruta, 'utf8')

  // Los CSS se importan desde el wrapper, no desde el juego.
  codigo = codigo.replace(
    /^\s*import\s+['"][^'"]+\.css['"];?\s*$/gm,
    '',
  )

  const salida = await transform(codigo, {
    loader: 'tsx',
    jsx: 'automatic',
    format: 'esm',
    target: 'es2020',
    legalComments: 'none',
  })

  const cabecera =
    `/* Convertido automáticamente desde Apuntes/${juego.tsx}. */\n` +
    `/* No editar a mano: vuelve a ejecutar scripts/import-apuntes.mjs. */\n`

  const destino = path.join(RAW, `${juego.nombre}.jsx`)
  fs.writeFileSync(destino, cabecera + salida.code, 'utf8')
  return destino
}

async function convertirCss(juego) {
  const ruta = path.join(APUNTES, juego.css)
  const css = fs.readFileSync(ruta, 'utf8')
  const resultado = await postcss([scopePlugin(escaparScope(juego.scope))]).process(
    css,
    { from: ruta },
  )
  const destino = path.join(DESTINO, `${juego.nombre}.css`)
  fs.writeFileSync(destino, resultado.css, 'utf8')
  return destino
}

function escribirWrapper(juego) {
  const contenido = `import Juego from './raw/${juego.nombre}'
import './${juego.nombre}.css'

/* Juego real de ${juego.metodo} importado desde Apuntes/${juego.tsx}. */
export default function ${juego.nombre}() {
  return (
    <div className="apx-game ${juego.scope}">
      <Juego />
    </div>
  )
}
`
  const destino = path.join(DESTINO, `${juego.nombre}.jsx`)
  fs.writeFileSync(destino, contenido, 'utf8')
  return destino
}

async function generarTailwind() {
  const entrada = `@import url('https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Fira+Code:wght@400;500;600&display=swap');
@tailwind components;
@tailwind utilities;
`
  const config = {
    content: [
      path.join(DESTINO, '**', '*.jsx'),
      path.join(APUNTES, '**', '*.tsx'),
    ],
    corePlugins: { preflight: false },
    theme: { extend: {} },
  }

  const resultado = await postcss([
    tailwindcss(config),
    autoprefixer,
    scopePlugin('.apx-game'),
  ]).process(entrada, { from: undefined })

  const destino = path.join(DESTINO, 'apuntesTw.css')
  fs.writeFileSync(destino, resultado.css, 'utf8')
  return destino
}

function escribirBase() {
  const contenido = `/* Base aislada de los juegos de Apuntes. Solo afecta a .apx-game. */
.apx-game {
  color-scheme: dark;
  font-family: 'Rajdhani', system-ui, sans-serif;
  line-height: 1.5;
  text-align: left;
}

.apx-game *,
.apx-game *::before,
.apx-game *::after {
  box-sizing: border-box;
}

/* Reset acotado: replica lo mínimo del preflight de Tailwind sin tocar la app. */
.apx-game :where(h1, h2, h3, h4, h5, h6, p, figure, blockquote, dl, dd) {
  margin: 0;
}

.apx-game :where(ul, ol) {
  margin: 0;
  padding: 0;
  list-style: none;
}

.apx-game :where(h1, h2, h3, h4, h5, h6) {
  font-size: inherit;
  font-weight: inherit;
}

.apx-game :where(a) {
  color: inherit;
  text-decoration: inherit;
}

.apx-game :where(button, input, optgroup, select, textarea) {
  font-family: inherit;
  font-size: 100%;
  line-height: inherit;
  color: inherit;
  margin: 0;
  padding: 0;
}

.apx-game :where(button, [type='button'], [type='reset'], [type='submit']) {
  background-color: transparent;
  background-image: none;
  cursor: pointer;
  text-transform: none;
}

.apx-game :where(img, svg, video, canvas, audio, iframe, embed, object) {
  display: block;
  vertical-align: middle;
}

.apx-game :where(img, video) {
  max-width: 100%;
  height: auto;
}

.apx-game :where(table) {
  border-collapse: collapse;
  border-color: inherit;
  text-indent: 0;
}

/* Los juegos son apps de pantalla completa: acotamos su altura para que no
   aplasten el apunte. Se pueden seguir recorriendo con normalidad. */
.apx-game .min-h-screen {
  min-height: 100%;
}

.apx-game {
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  border-radius: 16px;
}

.apx-game > * {
  width: 100%;
  max-width: 100%;
}

/* Scrollbars finas y coherentes dentro de cada juego. */
.apx-game ::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
.apx-game ::-webkit-scrollbar-thumb {
  background: rgba(120, 140, 170, 0.35);
  border-radius: 999px;
}
.apx-game ::-webkit-scrollbar-track {
  background: transparent;
}
`
  const destino = path.join(DESTINO, 'apuntesBase.css')
  fs.writeFileSync(destino, contenido, 'utf8')
  return destino
}

function escribirIndice(juegos) {
  const porMetodo = new Map()
  for (const juego of juegos) {
    if (!porMetodo.has(juego.metodo)) porMetodo.set(juego.metodo, [])
    porMetodo.get(juego.metodo).push(juego)
  }

  const imports = juegos
    .map((j) => `import ${j.nombre} from './${j.nombre}'`)
    .join('\n')

  const mapa = [...porMetodo.entries()]
    .map(
      ([metodo, lista]) =>
        `  ${metodo}: [${lista
          .sort((a, b) => a.orden - b.orden)
          .map((j) => j.nombre)
          .join(', ')}],`,
    )
    .join('\n')

  const contenido = `/* Generado por scripts/import-apuntes.mjs. */
import './apuntesTw.css'
import './apuntesBase.css'
${imports}

export const JUEGOS_APUNTES = {
${mapa}
}
`
  const destino = path.join(DESTINO, 'index.js')
  fs.writeFileSync(destino, contenido, 'utf8')
  return destino
}

async function main() {
  fs.mkdirSync(DESTINO, { recursive: true })
  fs.mkdirSync(RAW, { recursive: true })

  for (const juego of JUEGOS) {
    await convertirTsx(juego)
    await convertirCss(juego)
    escribirWrapper(juego)
    console.log('✓', juego.nombre)
  }

  escribirBase()
  escribirIndice(JUEGOS)
  await generarTailwind()

  console.log('\nListo:', JUEGOS.length, 'juegos convertidos en', DESTINO)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
