import { useCallback, useState } from 'react'
import Header from './components/Header/Header'
import CommandBar from './components/CommandBar/CommandBar'
import CareerGrid from './components/CareerGrid/CareerGrid'
import CareerDetail from './components/CareerDetail/CareerDetail'
import HtmlCurso from './components/HtmlCurso/HtmlCurso'
import { CARRERAS } from './data/carreras'
import { SEARCH_INDEX } from './data/searchIndex'
import './App.css'

const tabBtn = (on) => ({
  padding: '8px 18px', borderRadius: 999, cursor: 'pointer', fontWeight: 700,
  border: '1px solid ' + (on ? '#7c6cff' : '#2a2a2a'),
  background: on ? '#241f45' : '#161616', color: on ? '#cfc8ff' : '#bbb',
})

export default function App() {
  const [activeCareerId, setActiveCareerId] = useState(null)
  const [activeCourseId, setActiveCourseId] = useState(null)
  const [activeMethodId, setActiveMethodId] = useState(null)
  const [webTab, setWebTab] = useState('css')

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
        setActiveMethodId(item.methodId)
        if (item.courseId === 'web') {
          setWebTab(String(item.methodId).startsWith('html-') ? 'html' : 'css')
        }
        scrollTop()
      }
    },
    [goToCareer]
  )

  const breadcrumb =
    activeCareer && activeCourse
      ? [
          { icon: '📚', label: 'Biblioteca', onClick: goHome },
          {
            icon: activeCareer.emoji,
            label: activeCareer.nombre,
            onClick: () => {
              setActiveCourseId(null)
              setActiveMethodId(null)
            },
          },
          { icon: activeCourse.icon, label: activeCourse.nombre },
        ]
      : []

  const esWeb = activeCourse?.id === 'web'

  return (
    <div className="app">
      <Header onGoHome={goHome}>
        <CommandBar searchIndex={SEARCH_INDEX} onSelect={handleSelect} />
      </Header>

      <main className="app__main">
        {activeCareer && activeCourse ? (
          <>
            {esWeb && (
              <div style={{ display: 'flex', gap: 8, margin: '12px 0' }}>
                <button
                  style={tabBtn(webTab === 'css')}
                  onClick={() => { setWebTab('css'); setActiveMethodId(null) }}
                >
                  🎨 CSS
                </button>
                <button
                  style={tabBtn(webTab === 'html')}
                  onClick={() => { setWebTab('html'); setActiveMethodId(null) }}
                >
                  🌐 HTML
                </button>
              </div>
            )}

            {esWeb && webTab === 'html' ? (
              <HtmlCurso
                metodoActivo={activeMethodId}
                onMetodoChange={setActiveMethodId}
              />
            ) : (
              <CareerDetail
                key={activeCourse.id}
                carrera={{ ...activeCourse, emoji: activeCourse.icon }}
                onBack={() => {
                  setActiveCourseId(null)
                  setActiveMethodId(null)
                }}
                metodoActivo={activeMethodId}
                onMetodoChange={setActiveMethodId}
                breadcrumb={breadcrumb}
              />
            )}
          </>
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