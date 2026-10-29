import { useCallback, useState } from 'react'
import Header from './components/Header/Header'
import CommandBar from './components/CommandBar/CommandBar'
import CareerGrid from './components/CareerGrid/CareerGrid'
import CareerDetail from './components/CareerDetail/CareerDetail'
import { CARRERAS, METODOS_ARRAYS } from './data/carreras'
import { METODOS_DOCS } from './data/metodosDocs'
import { CONSOLE_API_CONCEPTOS, CONSOLE_API_DOCS } from './APIs/ConsoleAPI/data'
import './App.css'
import { METODOS_STRINGS } from './data/metodosStrings'
import { METODOS_NUMEROS } from './data/metodosNumeros'
import { METODOS_FECHAS, METODOS_FECHAS_DOCS } from './data/metodosFechas'

// Fuera del componente: se crea una sola vez.
// 'find' tiene componente propio (MetodoFindDoc), el resto vive en METODOS_DOCS.
const DOC_IDS = new Set([
  'find',
  ...Object.keys(METODOS_DOCS),
  ...Object.keys(METODOS_FECHAS_DOCS),
  ...Object.keys(CONSOLE_API_DOCS),
])

export default function App() {
  const [activeCareerId, setActiveCareerId] = useState(null)
  const [activeCourseId, setActiveCourseId] = useState(null)
  const [activeMethodId, setActiveMethodId] = useState(null)

  const METODOS_BUSCADOR = [
    ...METODOS_ARRAYS,
    ...METODOS_STRINGS.map((g) => ({
      ...g,
      seccion: `Strings · ${g.seccion}`,
    })),
    ...METODOS_NUMEROS.map((g) => ({
      ...g,
      seccion: `Números · ${g.seccion}`,
    })),
    ...METODOS_FECHAS.map((g) => ({
      ...g,
      seccion: `Fechas · ${g.seccion}`,
    })),
    {
      seccion: 'Console API',
      subtitulo: 'APIs',
      careerId: 'programacion',
      courseId: 'lenguajes',
      metodos: CONSOLE_API_CONCEPTOS,
    },
  ]


  const activeCareer = activeCareerId
    ? CARRERAS.find((c) => c.id === activeCareerId) ?? null
    : null

  const activeCourse =
    activeCareer && activeCourseId
      ? activeCareer.cursos.find((c) => c.id === activeCourseId) ?? null
      : null


  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  const goToCareer = useCallback((id) => {
    setActiveCareerId(id)
    setActiveCourseId(null)
    setActiveMethodId(null)
    scrollTop()
  }, [])

  const goToCourse = useCallback((courseId) => {
    setActiveCourseId(courseId)
    setActiveMethodId(null)
    scrollTop()
  }, [])

  const goHome = useCallback(() => {
    setActiveCareerId(null)
    setActiveCourseId(null)
    setActiveMethodId(null)
    scrollTop()
  }, [])

  const handleSelect = useCallback(
    (item) => {
      if (!item) return

      if (item.type === 'carrera') {
        goToCareer(item.careerId)
        return
      }

      if (item.type === 'curso') {
        setActiveCareerId(item.careerId)
        setActiveCourseId(item.courseId)
        setActiveMethodId(null)
        scrollTop()
        return
      }

      if (item.type === 'metodo') {
        setActiveCareerId(item.careerId)
        setActiveCourseId(item.courseId)
        setActiveMethodId(item.methodId) // abre el apunte directamente
        scrollTop()
      }
    },
    [goToCareer]
  )

  return (
    <div className="app">
      <Header onGoHome={goHome}>
        <CommandBar
          carreras={CARRERAS}
          metodos={METODOS_BUSCADOR}
          docIds={DOC_IDS}
          onSelect={handleSelect}
        />
      </Header>

      <main className="app__main">
      {activeCareer && activeCourse ? (
        <CareerDetail
          key={activeCourse.id}
          carrera={{ ...activeCourse, emoji: activeCourse.icon }}
          onBack={() => { setActiveCourseId(null); setActiveMethodId(null) }}
          metodoActivo={activeMethodId}
          onMetodoChange={setActiveMethodId}
          breadcrumb={[
            { icon: '📚', label: 'Biblioteca', onClick: goHome },
            { icon: activeCareer.emoji, label: activeCareer.nombre,
              onClick: () => { setActiveCourseId(null); setActiveMethodId(null) } },
            { icon: activeCourse.icon, label: activeCourse.nombre },
          ]}
        />
      ) : activeCareer ? (
  <CareerDetail
    carrera={activeCareer}
    onBack={goHome}
    onSelectCourse={goToCourse}
    breadcrumb={[
      { icon: '📚', label: 'Biblioteca', onClick: goHome },
      { icon: activeCareer.emoji, label: activeCareer.nombre },
    ]}
  />
) : (
  <CareerGrid carreras={CARRERAS} onSelectCareer={goToCareer} />
)}
      </main>

      <footer className="app__footer">
        <span>Biblioteca · {CARRERAS.length} macro-carreras</span>
      </footer>
    </div>
  )
}