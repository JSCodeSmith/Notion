import { useEffect, useMemo, useState } from "react";
import "./Estructuras.css";

const LETRAS = ["A", "B", "C", "D", "E"];

function TextoRico({ texto }) {
  const partes = String(texto ?? "").split(/(\*\*.+?\*\*|`[^`]+`)/g);
  return partes.map((parte, i) => {
    if (parte.startsWith("**") && parte.endsWith("**")) {
      return <strong key={i}>{parte.slice(2, -2)}</strong>;
    }
    if (parte.startsWith("`") && parte.endsWith("`")) {
      return <code key={i}>{parte.slice(1, -1)}</code>;
    }
    return parte;
  });
}

export default function QuizReto({ metodo }) {
  const preguntas = useMemo(() => metodo.quiz ?? [], [metodo.quiz]);
  const [indice, setIndice] = useState(0);
  const [elegida, setElegida] = useState(null);
  const [respuestas, setRespuestas] = useState([]);
  const [mostrarPista, setMostrarPista] = useState(false);
  const [terminado, setTerminado] = useState(false);

  useEffect(() => {
    setIndice(0);
    setElegida(null);
    setRespuestas([]);
    setMostrarPista(false);
    setTerminado(false);
  }, [metodo.id]);

  if (!preguntas.length) return null;

  const pregunta = preguntas[indice];
  const aciertos = respuestas.filter((r) => r.ok).length;
  const racha = (() => {
    let actual = 0;
    let mejor = 0;
    respuestas.forEach((r) => {
      actual = r.ok ? actual + 1 : 0;
      mejor = Math.max(mejor, actual);
    });
    return mejor;
  })();

  const responder = (opcion) => {
    if (elegida !== null) return;
    setElegida(opcion);
    setRespuestas((prev) => [
      ...prev,
      { idx: opcion, ok: opcion === pregunta.correcta },
    ]);
  };

  const siguiente = () => {
    if (indice >= preguntas.length - 1) {
      setTerminado(true);
      return;
    }
    setIndice((i) => i + 1);
    setElegida(null);
    setMostrarPista(false);
  };

  const reiniciar = () => {
    setIndice(0);
    setElegida(null);
    setRespuestas([]);
    setMostrarPista(false);
    setTerminado(false);
  };

  const porcentaje = Math.round((aciertos / preguntas.length) * 100);
  const rango =
    porcentaje === 100
      ? { emoji: "🏆", texto: "¡Dominio total!" }
      : porcentaje >= 75
        ? { emoji: "🥇", texto: "Nivel avanzado" }
        : porcentaje >= 50
          ? { emoji: "🥈", texto: "Vas por buen camino" }
          : { emoji: "📚", texto: "Toca repasar el apunte" };

  return (
    <div className="reto">
      <div className="reto__head">
        <h3>🎯 Quiz · Reto interactivo</h3>
        <div className="reto__stats">
          <span className="reto__stat">⭐ {aciertos} / {preguntas.length}</span>
          <span className="reto__stat">🔥 Racha {racha}</span>
          <span className="reto__stat">
            {terminado ? "✅ completado" : `Pregunta ${indice + 1} de ${preguntas.length}`}
          </span>
        </div>
      </div>

      <div className="reto__barra" aria-hidden="true">
        <span style={{ width: `${((terminado ? preguntas.length : indice) / preguntas.length) * 100}%` }} />
      </div>

      {!terminado ? (
        <>
          <p className="reto__pregunta">
            <TextoRico texto={pregunta.pregunta} />
          </p>

          <div className="reto__opciones">
            {pregunta.opciones.map((opcion, i) => {
              const esCorrecta = i === pregunta.correcta;
              let clase = "";
              if (elegida !== null) {
                if (esCorrecta) clase = " is-correct";
                else if (i === elegida) clase = " is-wrong";
                else clase = " is-apagada";
              }
              return (
                <button
                  key={i}
                  type="button"
                  className={`reto__opcion${clase}`}
                  onClick={() => responder(i)}
                  disabled={elegida !== null}
                >
                  <span className="reto__letra">{LETRAS[i]}</span>
                  <span>
                    <TextoRico texto={opcion} />
                  </span>
                </button>
              );
            })}
          </div>

          {pregunta.pista && elegida === null && (
            <div className="reto__footer" style={{ justifyContent: "flex-start" }}>
              <button
                type="button"
                className="est-btn est-btn--ghost"
                onClick={() => setMostrarPista((v) => !v)}
              >
                {mostrarPista ? "🙈 Ocultar pista" : "💡 Ver pista"}
              </button>
            </div>
          )}
          {mostrarPista && pregunta.pista && (
            <div className="reto__pista">💡 {pregunta.pista}</div>
          )}

          {elegida !== null && (
            <div
              className={`reto__feedback${elegida === pregunta.correcta ? " reto__feedback--ok" : " reto__feedback--ko"}`}
            >
              <strong>
                {elegida === pregunta.correcta ? "✅ ¡Correcto!" : "❌ Casi..."}
              </strong>
              {pregunta.explicacion ? (
                <TextoRico texto={pregunta.explicacion} />
              ) : (
                <>
                  La respuesta correcta es <strong>{LETRAS[pregunta.correcta]}</strong>:{" "}
                  <TextoRico texto={pregunta.opciones[pregunta.correcta]} />
                </>
              )}
            </div>
          )}

          <div className="reto__footer">
            <button type="button" className="est-btn est-btn--ghost" onClick={reiniciar}>
              ↺ Reiniciar reto
            </button>
            <button
              type="button"
              className="est-btn est-btn--primary"
              onClick={siguiente}
              disabled={elegida === null}
            >
              {indice >= preguntas.length - 1 ? "🏁 Ver resultado" : "Siguiente ▶"}
            </button>
          </div>
        </>
      ) : (
        <div className="reto__final">
          <div className="reto__nota">{rango.emoji}</div>
          <h4>{rango.texto}</h4>
          <p className="est-tool__sub" style={{ color: "#c6d5ea" }}>
            Acertaste <strong>{aciertos}</strong> de <strong>{preguntas.length}</strong> (
            {porcentaje}%). Mejor racha: <strong>{racha}</strong>.
          </p>
          <div className="reto__review">
            {preguntas.map((q, i) => {
              const r = respuestas[i];
              const ok = Boolean(r?.ok);
              return (
                <div key={q.id ?? i} className={`reto__review-item ${ok ? "ok" : "ko"}`}>
                  {ok ? "✅" : "❌"} {i + 1}. <TextoRico texto={q.pregunta} />
                </div>
              );
            })}
          </div>
          <button type="button" className="est-btn est-btn--primary" onClick={reiniciar}>
            🔄 Repetir reto
          </button>
        </div>
      )}
    </div>
  );
}
