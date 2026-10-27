import { useCallback, useState } from 'react'
import Header from './components/Header/Header'
import CommandBar from './components/CommandBar/CommandBar'
import CareerGrid from './components/CareerGrid/CareerGrid'
import CareerDetail from './components/CareerDetail/CareerDetail'
import { CARRERAS, METODOS_ARRAYS } from './data/carreras'
import { METODOS_DOCS } from './data/metodosDocs'
import './App.css'

// Fuera del componente: se crea una sola vez.
// 'find' tiene componente propio (MetodoFindDoc), el resto vive en METODOS_DOCS.
const DOC_IDS = new Set(['find', ...Object.keys(METODOS_DOCS)])

export default function App() {
  const [activeCareerId, setActiveCareerId] = useState(null)
  const [activeCourseId, setActiveCourseId] = useState(null)
  const [activeMethodId, setActiveMethodId] = useState(null)

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
          metodos={METODOS_ARRAYS}
          docIds={DOC_IDS}
          onSelect={handleSelect}
        />
      </Header>

      <main className="app__main">
        {activeCareer && activeCourse ? (
          <CareerDetail
            carrera={{ ...activeCourse, emoji: activeCourse.icon }}
            onBack={() => {
              setActiveCourseId(null)
              setActiveMethodId(null)
            }}
            metodoActivo={activeMethodId}
            onMetodoChange={setActiveMethodId}
          />
        ) : activeCareer ? (
          <CareerDetail
            carrera={activeCareer}
            onBack={goHome}
            onSelectCourse={goToCourse}
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