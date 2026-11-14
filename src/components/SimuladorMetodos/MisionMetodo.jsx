import { useMemo, useState } from 'react';
import CodeBlock from '../CodeBlock/CodeBlock';
import { ejecutarDemo, formatearResultado } from './ejecutarMetodo';
import { obtenerFamilia } from './metodosMeta';
import { formatValue } from '../SimuladorFind/findTrace';

const hash = (texto) => {
  let h = 0;
  for (let i = 0; i < texto.length; i += 1) {
    h = (h * 31 + texto.charCodeAt(i)) % 1000003;
  }
  return h;
};

const barajar = (lista, semilla) => {
  const copia = [...lista];
  let estado = semilla || 1;
  for (let i = copia.length - 1; i > 0; i -= 1) {
    estado = (estado * 1103515245 + 12345) % 2147483648;
    const j = estado % (i + 1);
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
};

const listaArray = (array) => `[${array.map(formatValue).join(', ')}]`;

const poolPorFamilia = (familia, demo, metodoId) => {
  const correcta = formatearResultado(metodoId, demo.result);
  const original = demo.original ?? [];
  const listaOriginal = listaArray(original);
  let candidatos = [];

  if (familia === 'busqueda') {
    if (typeof demo.result === 'boolean') {
      candidatos = ['true', 'false', 'undefined', 'null'];
    } else if (typeof demo.result === 'number') {
      candidatos = [correcta, '-1', 'undefined', String(original.length)];
    } else if (demo.result === undefined) {
      candidatos = ['undefined', 'null', '[]', '-1'];
    } else {
      const otros = original
        .map((valor) => formatValue(valor))
        .filter((valor) => valor !== correcta)
        .slice(0, 2);
      candidatos = [correcta, ...otros, 'undefined', 'null'];
    }
  } else if (familia === 'transformacion') {
    candidatos = [correcta, listaOriginal, '[]', 'undefined', 'null'];
  } else if (familia === 'mutador') {
    if (typeof demo.result === 'number') {
      candidatos = [
        correcta,
        String(original.length),
        String(original.length + 2),
        'undefined',
      ];
    } else if (Array.isArray(demo.result)) {
      candidatos = [correcta, listaOriginal, '[]', 'undefined'];
    } else {
      candidatos = [correcta, 'undefined', listaOriginal, String(original.length - 1)];
    }
  } else if (familia === 'reduccion') {
    const suma = original.reduce((acc, valor) => acc + Number(valor || 0), 0);
    candidatos = [correcta, String(suma), 'undefined', 'null', '0'];
  } else if (familia === 'iterador') {
    candidatos = [correcta, '[]', 'undefined', 'null'];
  } else if (typeof demo.result === 'string') {
    candidatos = [correcta, 'undefined', 'null', listaOriginal];
  } else if (typeof demo.result === 'boolean') {
    candidatos = ['true', 'false', 'undefined', 'null'];
  } else if (typeof demo.result === 'number') {
    candidatos = [
      correcta,
      String(original.length + 1),
      'undefined',
      'null',
    ];
  } else {
    candidatos = [correcta, 'undefined', 'null', '[]'];
  }

  const vistos = new Set();
  const unicos = candidatos.filter((opcion) => {
    const clave = String(opcion);
    if (vistos.has(clave)) return false;
    vistos.add(clave);
    return true;
  });

  for (const relleno of ['undefined', 'null', '[]', '0', '-1', 'false', 'true']) {
    if (unicos.length >= 4) break;
    if (!vistos.has(relleno)) {
      vistos.add(relleno);
      unicos.push(relleno);
    }
  }

  return unicos;
};

const resumenPasos = (demo) => {
  const evaluaciones = demo.pasos
    .filter((paso) => paso.tipo === 'success' || paso.tipo === 'error' || paso.fase === 'accion')
    .slice(0, 4)
    .map((paso) => paso.msg);
  return evaluaciones.length > 0
    ? evaluaciones.join(' → ')
    : 'La operación se resolvió en un solo paso.';
};

const explicacion = (familia, demo, metodoId) => {
  const resultado = formatearResultado(metodoId, demo.result);

  switch (familia) {
    case 'busqueda':
      return `El motor recorre el array en orden y evalúa la condición. El primer elemento que cumple la condición produce el cortocircuito y el método devuelve ${resultado}.`;
    case 'transformacion':
      return `El método recorre el array y construye una salida nueva sin modificar la entrada principal. En este caso devuelve ${resultado}.`;
    case 'mutador':
      return `El método trabaja sobre el array original: lo modifica en el sitio y además devuelve ${resultado}. El array queda como ${listaArray(demo.finalArray ?? demo.original)}.`;
    case 'reduccion':
      return `El acumulador empieza en ${formatValue(demo.demo.initial)} y se actualiza con cada elemento hasta terminar en ${resultado}.`;
    case 'iterador':
      return `El método recorre el array y entrega cada valor, índice o par sin cambiar el arreglo. El resultado es ${resultado}.`;
    default:
      return `El método calcula el valor directamente a partir de la entrada. El resultado es ${resultado}.`;
  }
};

const pista = (familia, demo) => {
  switch (familia) {
    case 'busqueda':
      return `Sigue el orden del diagrama: evalúa ${demo.demo.cond ?? 'la condición'} elemento por elemento. Si ninguna coincide, no devuelve un array: devuelve el valor de fallo.`;
    case 'transformacion':
      return 'Piensa en la forma del valor devuelto: ¿es el mismo array, uno nuevo, un elemento suelto o un valor calculado? El original no se toca.';
    case 'mutador':
      return `Fíjate en el efecto secundario: el array de entrada cambia. El valor devuelto puede ser el array mutado o el dato de la operación.`;
    case 'reduccion':
      return 'No mires el array completo: sigue el acumulador paso a paso. El resultado final es el último valor del acumulador.';
    case 'iterador':
      return 'Este método no transforma el array: produce una secuencia o ejecuta un efecto por cada elemento.';
    default:
      return 'Lee la entrada y aplica el cálculo directamente. No hay callback ni recorrido con cortocircuito.';
  }
};

export default function MisionMetodo({ metodo }) {
  const familia = obtenerFamilia(metodo.id);
  const demo = useMemo(() => ejecutarDemo(metodo.id), [metodo.id]);

  const reto = useMemo(() => {
    const correcta = formatearResultado(metodo.id, demo.result);
    const opciones = poolPorFamilia(familia, demo, metodo.id);
    return {
      correcta,
      opciones: barajar(opciones.slice(0, 4), hash(`${metodo.id}-opciones`)),
      codigo: demo.demo.code,
    };
  }, [demo, familia, metodo.id]);

  const [seleccion, setSeleccion] = useState(null);
  const [mostrarPista, setMostrarPista] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [intentos, setIntentos] = useState(0);

  const respondida = seleccion !== null;
  const acerto = seleccion === reto.correcta;

  const responder = (opcion) => {
    if (respondida) return;
    setSeleccion(opcion);
    setIntentos((prev) => prev + 1);
    if (opcion === reto.correcta) setAciertos((prev) => prev + 1);
  };

  const reintentar = () => {
    setSeleccion(null);
    setMostrarPista(false);
  };

  const letra = (indice) => String.fromCharCode(65 + indice);

  return (
    <section className="sm-mision">
      <header className="sm-section-head">
        <div>
          <h3>🎯 Misión #1: La búsqueda del Emoji</h3>
          <p>
            Predice el resultado real de <code>{metodo.titulo}</code>. Sin
            ejecutarlo: usa el diagrama y tu modelo mental.
          </p>
        </div>
        <span className="sm-mision__score">
          {aciertos}/{intentos} aciertos
        </span>
      </header>

      <div className="sm-mision__code">
        <span className="sm-mision__label">Código de la misión</span>
        <CodeBlock code={reto.codigo} />
        <p className="sm-mision__entrada">
          Array de partida: <code>{listaArray(demo.original)}</code>
        </p>
      </div>

      <p className="sm-mision__pregunta">
        ¿Qué devuelve exactamente esta ejecución?
      </p>

      {!respondida && (
        <button
          type="button"
          className="sm-link-btn sm-link-btn--hint"
          onClick={() => setMostrarPista((prev) => !prev)}
        >
          💡 {mostrarPista ? 'Ocultar pista' : 'Ver pista'}
        </button>
      )}

      {mostrarPista && !respondida && (
        <div className="sm-mision__pista">{pista(familia, demo)}</div>
      )}

      <div className="sm-opciones">
        {reto.opciones.map((opcion, indice) => {
          let clase = 'sm-opcion';
          if (respondida) {
            if (opcion === reto.correcta) clase += ' is-correct';
            else if (opcion === seleccion) clase += ' is-wrong';
            else clase += ' is-muted';
          }
          return (
            <button
              key={`${metodo.id}-opcion-${indice}`}
              type="button"
              className={clase}
              onClick={() => responder(opcion)}
              disabled={respondida}
            >
              <span className="sm-opcion__letra">{letra(indice)}</span>
              <span className="sm-opcion__texto">{opcion}</span>
              {respondida && opcion === reto.correcta && (
                <span className="sm-opcion__icono">✅</span>
              )}
              {respondida && opcion === seleccion && opcion !== reto.correcta && (
                <span className="sm-opcion__icono">❌</span>
              )}
            </button>
          );
        })}
      </div>

      {respondida && (
        <div className={`sm-feedback ${acerto ? 'is-ok' : 'is-fail'}`}>
          <h4>
            {acerto
              ? '¡Misión cumplida! 🏆'
              : `Casi. La respuesta correcta era ${reto.correcta}`}
          </h4>
          <p>{explicacion(familia, demo, metodo.id)}</p>
          <details className="sm-feedback__traza">
            <summary>Ver la traza real resumida</summary>
            <p>{resumenPasos(demo)}</p>
          </details>
          <div className="sm-feedback__actions">
            <button type="button" className="sm-btn" onClick={reintentar}>
              🔄 Reintentar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
