import { useState } from 'react';
import CodeBlock from '../CodeBlock/CodeBlock'; // <-- IMPORTAMOS TU COMPONENTE DE CÓDIGO
import './QuizFind.css';

const PREGUNTAS = [
  {
    id: 1,
    pregunta: "¿Qué devuelve find() si ningún elemento cumple la condición?",
    opciones: ["undefined", "null", "Un array vacío []", "false"],
    correcta: 0,
    pista: "El método no devuelve null ni un array vacío. Cuando termina el recorrido sin coincidencias, devuelve el valor que JavaScript usa para representar 'no hay valor'.",
    explicacionOk: "<strong>¡Exacto!</strong> Si el motor de JavaScript recorre todo el array y la función de prueba nunca devuelve <code>true</code>, el método <code>find()</code> no tiene nada que devolver. Por convención, el valor es <code>undefined</code>.",
    explicacionFail: "<strong>Casi.</strong> La respuesta correcta es <code>undefined</code>. A veces se confunde con <code>null</code> o con un array vacío <code>[]</code> (que es lo que devolvería <code>filter()</code>). Como <code>find()</code> busca un solo elemento y no lo encuentra, devuelve <code>undefined</code>.",
    codigo: "const arr = [1, 2, 3];\nconst res = arr.find(n => n > 10);\nconsole.log(res); // undefined"
  },
  {
    id: 2,
    pregunta: "¿Cuál es el propósito principal de find()?",
    opciones: ["Modificar el array", "Buscar el primer elemento que cumpla una condición", "Ordenar el array", "Filtrar todos los elementos"],
    correcta: 1,
    pista: "El nombre del método es literal: 'find' significa 'encontrar'. Piensa en qué hace cuando lo usas en un array.",
    explicacionOk: "<strong>¡Correcto!</strong> <code>find()</code> recorre el array y devuelve el primer elemento que haga que la función callback devuelva <code>true</code>.",
    explicacionFail: "<strong>Incorrecto.</strong> <code>find()</code> no modifica el array ni lo ordena. Su propósito es estrictamente buscar el primer elemento que cumpla una condición. <code>filter()</code> devuelve todos, <code>find()</code> solo el primero.",
    codigo: "const usuarios = [{id:1}, {id:2}, {id:3}];\nconst primero = usuarios.find(u => u.id > 1);\n// {id:2}"
  },
  {
    id: 3,
    pregunta: "¿Qué pasa cuando find() encuentra una coincidencia?",
    opciones: ["Sigue buscando por si hay más", "Se detiene inmediatamente (cortocircuito)", "Lanza un error", "Devuelve todos los elementos encontrados"],
    correcta: 1,
    pista: "El método está diseñado para ser eficiente. Si ya encontraste lo que buscabas, ¿tiene sentido seguir revisando los elementos restantes?",
    explicacionOk: "<strong>¡Bien!</strong> Al encontrar el primer elemento que cumple la condición, <code>find()</code> hace un 'cortocircuito' y detiene la ejecución inmediatamente, devolviendo ese elemento.",
    explicacionFail: "<strong>Error.</strong> <code>find()</code> se detiene inmediatamente cuando encuentra una coincidencia. Este comportamiento se llama cortocircuito.",
    codigo: "const arr = [5, 12, 8, 130];\n// Se detiene en 12, no revisa el 8 ni el 130.\narr.find(n => n > 10);"
  },
  {
    id: 4,
    pregunta: "¿Cuál es la diferencia principal entre find() y filter()?",
    opciones: ["find() devuelve el primer elemento, filter() devuelve un nuevo array", "No hay diferencia", "find() es más rápido", "filter() solo funciona con números"],
    correcta: 0,
    pista: "Piensa en el tipo de dato que devuelve cada uno. Uno devuelve un solo 'elemento' y el otro devuelve una 'colección' o lista de elementos.",
    explicacionOk: "<strong>¡Exacto!</strong> <code>find()</code> devuelve el primer elemento que coincide (o undefined). <code>filter()</code> devuelve un nuevo array con todos los elementos que coinciden (puede estar vacío).",
    explicacionFail: "<strong>Incorrecto.</strong> <code>find()</code> devuelve el primer elemento que cumpla la condición. <code>filter()</code> devuelve un nuevo array con TODOS los que cumplan la condición.",
    codigo: "const arr = [1, 2, 3, 4];\narr.find(n => n > 2);   // 3\narr.filter(n => n > 2); // [3, 4]"
  },
  {
    id: 5,
    pregunta: "¿Qué parámetros recibe la función callback de find()?",
    opciones: ["Solo el elemento", "El elemento, el índice y el array", "Solo el índice", "El array completo"],
    correcta: 1,
    pista: "Al igual que map o filter, la función interna de find recibe hasta 3 argumentos: el elemento actual, su posición y el array original.",
    explicacionOk: "<strong>¡Muy bien!</strong> Al igual que <code>map()</code> o <code>filter()</code>, la callback de <code>find()</code> recibe: <code>(elemento, indice, array)</code>.",
    explicacionFail: "<strong>Incorrecto.</strong> Aunque usualmente solo uses el elemento, la función callback internamente recibe el elemento, el índice actual y el array completo.",
    codigo: "arr.find((elemento, indice, array) => {\n  console.log(elemento, indice, array);\n  return elemento > 10;\n});"
  },
  {
    id: 6,
    pregunta: "¿Puede find() modificar el array original?",
    opciones: ["Sí, siempre", "No, es un método de solo lectura", "Solo si se usa con objetos", "Depende del navegador"],
    correcta: 1,
    pista: "find es un método de iteración, no de mutación. Piensa en lo que le pasa al array original después de usar find.",
    explicacionOk: "<strong>¡Correcto!</strong> <code>find()</code> no modifica el array original. Eso sí: el callback que le pasas sí puede mutarlo, y el objeto devuelto es la misma referencia que está dentro del array.",
    explicacionFail: "<strong>Falso.</strong> <code>find()</code> no modifica el array original. Si necesitas modificar un array mientras lo recorres o buscas, tendrías que hacerlo manualmente dentro de la callback (lo cual no es recomendado).",
    codigo: "const arr = [1, 2, 3];\narr.find(n => n > 1);\nconsole.log(arr); // [1, 2, 3] (Sin cambios)"
  },
  {
    id: 7,
    pregunta: "Si tengo [10, 20, 30, 40] y uso find(n => n > 25), ¿qué devuelve?",
    opciones: ["[30, 40]", "30", "[40]", "20"],
    correcta: 1,
    pista: "Recorre mentalmente el array. El 10 y el 20 son menores que 25. El 30 es mayor. ¿Se detiene ahí o sigue buscando?",
    explicacionOk: "<strong>¡Exacto!</strong> Evalúa el 10 (falso), el 20 (falso), y al llegar al 30 la condición es verdadera. Devuelve el elemento (30) y se detiene.",
    explicacionFail: "<strong>Error.</strong> La respuesta correcta es <code>30</code>. Devuelve el elemento como un número, no un array. Y como se detiene en el primer match, no llega a evaluar el 40.",
    codigo: "[10, 20, 30, 40].find(n => n > 25); // 30"
  },
  {
    id: 8,
    pregunta: "¿Qué devuelve findIndex() si no encuentra el elemento?",
    opciones: ["undefined", "null", "-1", "0"],
    correcta: 2,
    pista: "findIndex() busca la posición numérica. Si no lo encuentra, devuelve el número utilizado tradicionalmente para indicar 'no encontrado' en arrays.",
    explicacionOk: "<strong>¡Correcto!</strong> Mientras <code>find()</code> devuelve <code>undefined</code>, su hermano <code>findIndex()</code> devuelve <code>-1</code> cuando no encuentra el elemento.",
    explicacionFail: "<strong>Incorrecto.</strong> La respuesta correcta es <code>-1</code>. <code>findIndex()</code> siempre devuelve un número: el índice de la coincidencia o -1 si no hay coincidencia.",
    codigo: "[1, 2, 3].findIndex(n => n > 10); // -1"
  },
  {
    id: 9,
    pregunta: "¿Es find() un método iterativo?",
    opciones: ["Sí, recorre el array", "No, es estático", "Depende del array", "Solo si se usa con strings"],
    correcta: 0,
    pista: "Piensa en cómo funciona internamente. ¿Necesita revisar los elementos uno por uno para encontrar lo que buscas?",
    explicacionOk: "<strong>¡Así es!</strong> <code>find()</code> es un método iterativo de orden superior porque recorre (itera) el array elemento por elemento hasta encontrar una coincidencia.",
    explicacionFail: "<strong>Incorrecto.</strong> <code>find()</code> es iterativo. Itera sobre el array desde el índice 0 en adelante hasta encontrar una coincidencia o llegar al final.",
    codigo: "// Itera hasta encontrar el match\narray.find(elemento => condicion);"
  },
  {
    id: 10,
    pregunta: "¿Qué devuelve [0, 1, 2].find(n => n === 0)?",
    opciones: ["0", "undefined", "null", "false"],
    correcta: 0,
    pista: "0 es falsy, pero find() no devuelve el resultado del callback: devuelve el elemento encontrado.",
    explicacionOk: "<strong>¡Exacto!</strong> Devuelve <code>0</code>. Que sea falsy no significa que no se haya encontrado. Por eso debes comprobar <code>resultado !== undefined</code> y no <code>if (resultado)</code>.",
    explicacionFail: "<strong>Cuidado.</strong> La respuesta correcta es <code>0</code>. El callback devolvió <code>true</code> para el primer elemento, así que <code>find()</code> devuelve ese elemento. <code>0</code> es falsy, pero sigue siendo un resultado válido.",
    codigo: "const resultado = [0, 1, 2].find(n => n === 0);\nconsole.log(resultado); // 0\nconsole.log(resultado !== undefined); // true"
  }
];

export default function QuizFind() {
  const [preguntaActual, setPreguntaActual] = useState(0);
  const [respondida, setRespondida] = useState(false);
  const [opcionSeleccionada, setOpcionSeleccionada] = useState(null);
  const [mostrarPista, setMostrarPista] = useState(false);
  const [puntuacion, setPuntuacion] = useState(0);
  const [finalizado, setFinalizado] = useState(false);

  const pregunta = PREGUNTAS[preguntaActual];

  const handleRespuesta = (index) => {
    if (respondida) return;
    setRespondida(true);
    setOpcionSeleccionada(index);
    setMostrarPista(false);

    if (index === pregunta.correcta) {
      setPuntuacion(prev => prev + 1);
    }
  };

  const siguientePregunta = () => {
    if (preguntaActual < PREGUNTAS.length - 1) {
      setPreguntaActual(prev => prev + 1);
      setRespondida(false);
      setOpcionSeleccionada(null);
      setMostrarPista(false);
    } else {
      setFinalizado(true);
    }
  };

  const reiniciar = () => {
    setPreguntaActual(0);
    setRespondida(false);
    setOpcionSeleccionada(null);
    setMostrarPista(false);
    setPuntuacion(0);
    setFinalizado(false);
  };

  if (finalizado) {
    return (
      <div className="quiz-container">
        <div className="quiz-header">
          <div className="quiz-title">🚀 Repaso Completado</div>
        </div>
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px', color: '#fff' }}>
            Aciertos: {puntuacion} / {PREGUNTAS.length}
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>
            {puntuacion === PREGUNTAS.length ? "¡Perfecto! Dominas Array.prototype.find()." : "Buen intento. Repasa los conceptos y vuelve a probar."}
          </p>
          <button onClick={reiniciar} className="hint-btn" style={{ borderStyle: 'solid', padding: '10px 20px', fontSize: '1rem' }}>
            🔄 Reintentar Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      {/* Header */}
      <div className="quiz-header">
        <div className="quiz-title">🚀 Quiz: Repaso Activo</div>
        <div className="progress">Pregunta {preguntaActual + 1} de {PREGUNTAS.length}</div>
      </div>

      {/* Pregunta */}
      <div className="question-text" dangerouslySetInnerHTML={{ __html: pregunta.pregunta }} />

      {/* Botón de Pista */}
      {!respondida && (
        <button className="hint-btn" onClick={() => setMostrarPista(!mostrarPista)}>
          💡 {mostrarPista ? 'Ocultar Pista' : 'Ver Pista'}
        </button>
      )}
      
      {/* Caja de Pista */}
      {mostrarPista && !respondida && (
        <div className="hint-box" style={{ display: 'block' }}>
          <strong>Pista de repaso:</strong> {pregunta.pista}
        </div>
      )}

      {/* Opciones */}
      <div className="options-list">
        {pregunta.opciones.map((opcion, idx) => {
          const letra = String.fromCharCode(65 + idx); // A, B, C, D
          let claseOpcion = "option";
          
          if (respondida) {
            claseOpcion += " disabled";
            if (idx === pregunta.correcta) claseOpcion += " correct";
            else if (idx === opcionSeleccionada) claseOpcion += " incorrect";
          }

          return (
            <button
              key={idx}
              type="button"
              className={claseOpcion}
              onClick={() => handleRespuesta(idx)}
              disabled={respondida}
            >
              <div className="option-content">
                <span className="option-letter">{letra}</span>
                <span className="option-text">{opcion}</span>
              </div>
              <span className="icon-feedback">
                {respondida && idx === pregunta.correcta ? '✅' : '❌'}
              </span>
            </button>
          );
        })}
      </div>

      {/* Área de Feedback / Flashback */}
      {respondida && (
        <div className="flashback-area" style={{ display: 'block' }}>
          <div className="flashback-header">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
            Flashback Teórico
          </div>
          <div className="flashback-content">
            <div dangerouslySetInnerHTML={{ __html: opcionSeleccionada === pregunta.correcta ? pregunta.explicacionOk : pregunta.explicacionFail }} />
            
            {/* AQUI ESTA LA MAGIA: Usamos el componente CodeBlock */}
            {pregunta.codigo && (
              <div style={{ marginTop: '16px', borderLeft: '3px solid var(--quiz-blue)', borderRadius: '6px', overflow: 'hidden' }}>
                <CodeBlock code={pregunta.codigo} />
              </div>
            )}

            <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="hint-btn" style={{ borderStyle: 'solid', background: 'var(--quiz-blue)', color: '#fff', borderColor: 'var(--quiz-blue)' }} onClick={siguientePregunta}>
                {preguntaActual < PREGUNTAS.length - 1 ? 'Siguiente Pregunta →' : 'Ver Resultados'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}