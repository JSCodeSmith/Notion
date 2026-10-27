import { useState } from 'react'
import SimuladorFind from '../SimuladorFind/SimuladorFind'
import CodeBlock from '../CodeBlock/CodeBlock'
import './MetodoFindDoc.css'


const PREGUNTAS_QUIZ = [
  { id: 1, pregunta: "¿Qué devuelve find() si ningún elemento cumple la condición?", opciones: ["undefined", "null", "Un array vacío", "false"], correcta: 0 },
  { id: 2, pregunta: "¿Cuál es el propósito principal de find()?", opciones: ["Modificar el array", "Buscar el primer elemento que cumpla una condición", "Ordenar el array", "Filtrar todos los elementos"], correcta: 1 },
  { id: 3, pregunta: "¿Qué pasa cuando find() encuentra una coincidencia?", opciones: ["Sigue buscando por si hay más", "Se detiene inmediatamente (cortocircuito)", "Lanza un error", "Devuelve todos los elementos encontrados"], correcta: 1 },
  { id: 4, pregunta: "¿Cuál es la diferencia principal entre find() y filter()?", opciones: ["find() devuelve el primer elemento, filter() devuelve un nuevo array", "No hay diferencia", "find() es más rápido", "filter() solo funciona con números"], correcta: 0 },
  { id: 5, pregunta: "¿Qué parámetros recibe la función callback de find()?", opciones: ["Solo el elemento", "El elemento, el índice y el array", "Solo el índice", "El array completo"], correcta: 1 },
  { id: 6, pregunta: "¿Puede find() modificar el array original?", opciones: ["Sí, siempre", "No, es un método de solo lectura", "Solo si se usa con objetos", "Depende del navegador"], correcta: 1 },
  { id: 7, pregunta: "Si tengo [10, 20, 30, 40] y uso find(n => n > 25), ¿qué devuelve?", opciones: ["[30, 40]", "30", "[40]", "20"], correcta: 1 },
  { id: 8, pregunta: "¿Qué devuelve findIndex() si no encuentra el elemento?", opciones: ["undefined", "null", "-1", "0"], correcta: 2 },
  { id: 9, pregunta: "¿Es find() un método iterativo?", opciones: ["Sí, recorre el array", "No, es estático", "Depende del array", "Solo si se usa con strings"], correcta: 0 },
]

export default function MetodoFindDoc({ onBack }) {
  const [preguntaActual, setPreguntaActual] = useState(0)
  const [respuestas, setRespuestas] = useState([])
  const [mostrarResultado, setMostrarResultado] = useState(false)

  const handleRespuesta = (indexOpcion) => {
    const nuevas = [...respuestas, indexOpcion]
    setRespuestas(nuevas)
    if (preguntaActual < PREGUNTAS_QUIZ.length - 1) {
      setPreguntaActual(preguntaActual + 1)
    } else {
      setMostrarResultado(true)
    }
  }

  const reiniciar = () => {
    setPreguntaActual(0)
    setRespuestas([])
    setMostrarResultado(false)
  }

  const puntuacion = respuestas.reduce((acc, resp, index) => 
    resp === PREGUNTAS_QUIZ[index].correcta ? acc + 1 : acc, 0
  )

  return (
    <article className="notion-page detail-page">
      <button type="button" className="notion-back-btn" onClick={onBack}>
        ← Volver a los Métodos
      </button>

      <div className="doc-header">
        <h1 className="doc-title" style={{ color: '#ff5a5f' }}>Array.prototype.find()</h1>
      </div>

      <div className="doc-grid">
        <div className="doc-card">
          <h3>📝 Definición</h3>
          <ul>
            <li>Es un método iterativo integrado en JavaScript que se utiliza para buscar un elemento dentro de un array.</li>
            <li>Devuelve el <strong>primer elemento</strong> que cumpla con una condición determinada por una función.</li>
          </ul>
        </div>

        <div className="doc-card">
          <h3>🧠 ¿Qué es?</h3>
          <p>Es un método de orden superior que recorre los elementos de un array uno a uno y ejecuta una función de prueba para cada uno, deteniéndose inmediatamente cuando encuentra una coincidencia.</p>
        </div>

        <div className="doc-card">
          <h3>🎯 ¿Para qué sirve?</h3>
          <ul>
            <li>Localizar de forma rápida un objeto o valor específico dentro de una lista sin necesidad de escribir bucles manuales.</li>
            <li>Es ideal cuando buscas <strong>un único elemento</strong> (por ejemplo, buscar un usuario por su ID).</li>
          </ul>
        </div>

        <div className="doc-card">
          <h3>⚙️ ¿Cómo funciona?</h3>
          <ol>
            <li>Recorre el array desde el índice 0 en adelante.</li>
            <li>Evalúa cada elemento con la función condición que le pasas.</li>
            <li><strong>Cortocircuito:</strong> En el momento exacto en que la función devuelve <code>true</code>, se detiene y devuelve ese elemento.</li>
            <li>Si recorre todo el array y nadie cumple la condición, devuelve <code>undefined</code>.</li>
          </ol>
        </div>

        <div className="doc-card doc-card--full">
          <h3>📝 Sintaxis / Estructura</h3>
          <CodeBlock code={`const elementoEncontrado = array.find((elemento, indice, array) => {
  // Condición que debe devolver true o false
  return condicion;
});`} />
          <p className="code-caption">Forma corta:</p>
          <CodeBlock code={`const resultado = array.find(elemento => elemento.propiedad === valorBuscado);`} />
        </div>

        <div className="doc-card doc-card--full" style={{ padding: 0, background: 'transparent', border: 'none' }}>
          <SimuladorFind />
        </div>

        <div className="doc-card doc-card--full">
          <h3>💡 Ejemplos</h3>
          <p className="example-title"><strong>Ejemplo 1: Buscar un objeto por ID</strong></p>
          <CodeBlock code={`const usuarios = [
  { id: 1, nombre: "Josue" },
  { id: 2, nombre: "Ana" },
  { id: 3, nombre: "Carlos" }
];
const usuarioFijado = usuarios.find(u => u.id === 2);
// Resultado: { id: 2, nombre: "Ana" }`} />

          <p className="example-title" style={{ marginTop: '16px' }}><strong>Ejemplo 2: Cuando no encuentra nada</strong></p>
          <CodeBlock code={`const numeros = [5, 12, 8, 130, 44];
const elNumeroGrande = numeros.find(n => n > 200);
// Resultado: undefined`} />
        </div>

        <div className="doc-card">
          <h3>⚠️ Errores comunes</h3>
          <ul>
            <li><strong>Confundirlo con <code>filter()</code>:</strong> <code>find()</code> solo devuelve un elemento.</li>
            <li><strong>No manejar el <code>undefined</code>:</strong> Si no encuentra nada, devuelve <code>undefined</code>. Intentar acceder a sus propiedades romperá tu app.</li>
          </ul>
        </div>

        <div className="doc-card">
          <h3>💼 Casos de uso</h3>
          <ul>
            <li><strong>Dashboards:</strong> Buscar el elemento que el usuario seleccionó para editar.</li>
            <li><strong>Autenticación:</strong> Buscar si un correo ya existe.</li>
          </ul>
        </div>

        <div className="doc-card">
          <h3>🧩 Relación con otros conceptos</h3>
          <ul>
            <li><strong><code>filter()</code>:</strong> Devuelve un <em>nuevo array</em>.</li>
            <li><strong><code>findIndex()</code>:</strong> Devuelve la posición (índice). Si no lo encuentra, devuelve <code>-1</code>.</li>
          </ul>
        </div>

        <div className="doc-card">
          <h3>🧠 Analogía</h3>
          <p>Imagina que buscas una carpeta en un archivador. Vas revisando una por una. En el momento en que la encuentras, <strong>la sacas y cierras el archivador</strong>. No sigues mirando. Eso es <code>find()</code>.</p>
        </div>

        <div className="doc-card doc-card--full doc-card--quiz" style={{ marginTop: '24px' }}>
          <h3>🧪 Quiz ({PREGUNTAS_QUIZ.length} preguntas)</h3>
          
          {!mostrarResultado ? (
            <>
              <div className="quiz-progress">Pregunta {preguntaActual + 1} de {PREGUNTAS_QUIZ.length}</div>
              <p className="quiz-question">{PREGUNTAS_QUIZ[preguntaActual].pregunta}</p>
              <div className="quiz-options">
                {PREGUNTAS_QUIZ[preguntaActual].opciones.map((opcion, idx) => (
                  <button key={idx} className="quiz-btn" onClick={() => handleRespuesta(idx)}>
                    {opcion}
                  </button>
                ))}
              </div>
            </>
          ) : (
            <div className="quiz-result">
              <h2>Completado</h2>
              <p className="score-text">Aciertos: <strong>{puntuacion}</strong> / {PREGUNTAS_QUIZ.length}</p>
              <div className="quiz-review">
                {PREGUNTAS_QUIZ.map((q, index) => {
                  const correcta = respuestas[index] === q.correcta
                  return (
                    <div key={q.id} className={`review-item ${correcta ? 'correct' : 'wrong'}`}>
                      <span>{correcta ? '✅' : '❌'} Pregunta {index + 1}</span>
                    </div>
                  )
                })}
              </div>
              <button className="sim-btn primary" onClick={reiniciar} style={{ marginTop: '16px' }}>
                🔄 Reintentar
              </button>
            </div>
          )}
        </div>

        <div className="doc-card doc-card--full" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <h3 style={{ margin: 0 }}>📚 Fuente:</h3>
          <span style={{ color: 'var(--text-faint)' }}>MDN Web Docs | ECMAScript Specification</span>
        </div>
      </div>
    </article>
  )
}