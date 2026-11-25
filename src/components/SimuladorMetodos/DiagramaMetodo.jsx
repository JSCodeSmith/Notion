import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import '../SimuladorFind/SimuladorFindDiagrama.css';
import { formatValue } from '../SimuladorFind/findTrace';
import { ejecutarDemo, formatearResultado } from './ejecutarMetodo';
import { obtenerDemo, obtenerFamilia, obtenerNombre, uiMetodo } from './metodosMeta';

/* ------------------------------------------------------------------
   Etiquetas que cambian según el método
   ------------------------------------------------------------------ */

const ES_INDICE = new Set(['findindex', 'findlastindex', 'indexof', 'lastindexof']);
const ES_REVERSA = new Set(['findlast', 'findlastindex', 'lastindexof']);

/* Texto del nodo de retorno: cada método dice qué devuelve de verdad. */
const retornoTexto = (metodoId, ui, tipo) => {
  if (tipo === 'success') {
    if (metodoId === 'some' || metodoId === 'every') return 'Return true ✅';
    return `Return ${ui.retorno}`;
  }
  if (metodoId === 'some' || metodoId === 'every') return 'Return false ❌';
  return `Return ${ui.fallo}`;
};

/* ------------------------------------------------------------------
   Flujos: cada método dibuja SU recorrido, no el de la familia.
   ------------------------------------------------------------------ */

const flujoBusqueda = (metodoId, ui, reversa, esEvery) => {
  const successPos = esEvery ? { x: 110, y: 250 } : { x: 480, y: 445 };
  const failPos = esEvery ? { x: 480, y: 445 } : { x: 110, y: 250 };
  const decision = esEvery ? '¿Cumple?' : ui.decision;
  const check = reversa ? '¿idx ≥ 0?' : '¿idx < length?';
  return {
    nodos: [
      { id: 'start', x: 300, y: 45, tipo: 'pill', label: `Inicio: array.${ui.corto}()` },
      {
        id: 'iter',
        x: 300,
        y: 135,
        label: reversa ? 'Retroceder' : 'Iterar',
        sub: reversa ? 'idx = idx − 1' : 'idx = {idx}',
      },
      { id: 'check', x: 300, y: 250, tipo: 'decision', label: check },
      { id: 'eval', x: 300, y: 345, label: ui.accion, sub: '{cond}' },
      { id: 'dec', x: 300, y: 445, tipo: 'decision', label: decision },
      {
        id: 'fail',
        ...failPos,
        tipo: 'pill ret-fail',
        label: retornoTexto(metodoId, ui, 'fail'),
      },
      {
        id: 'success',
        ...successPos,
        tipo: 'pill ret-success',
        label: retornoTexto(metodoId, ui, 'success'),
      },
    ],
    paths: [
      { id: 'p1', d: 'M 300 80 L 300 105' },
      { id: 'p2', d: 'M 300 170 L 300 215' },
      { id: 'p3', d: 'M 250 250 L 165 250' },
      { id: 'p4', d: 'M 300 292 L 300 318' },
      { id: 'p5', d: 'M 300 380 L 300 412' },
      { id: 'p6', d: 'M 350 445 L 410 445' },
      { id: 'p7', d: 'M 250 445 L 55 445 L 55 135 L 245 135' },
    ],
  };
};

const flujoLineal = (nodos) => {
  const n = nodos.pasos.length;
  return {
    nodos: [
      { id: 'start', x: 300, y: 55, tipo: 'pill', label: nodos.inicio },
      ...nodos.pasos.map((paso, i) => ({
        id: paso.id,
        x: 300,
        y: 160 + i * 105,
        label: paso.label,
        sub: paso.sub,
      })),
      {
        id: 'success',
        x: 300,
        y: 160 + n * 105,
        tipo: 'pill ret-success',
        label: nodos.retorno,
      },
    ],
    paths: [
      { id: 'p1', d: 'M 300 90 L 300 122' },
      ...nodos.pasos.map((_, i) => ({
        id: `p${i + 2}`,
        d: `M 300 ${198 + i * 105} L 300 ${227 + i * 105}`,
      })),
    ],
  };
};

const flujoMutador = (ui, extras = {}) =>
  flujoLineal({
    inicio: `Inicio: array.${ui.corto}()`,
    pasos: [
      {
        id: 'op',
        label: extras.op ?? ui.accion,
        sub: extras.opSub ?? '{cond}',
      },
      {
        id: 'upd',
        label: extras.upd ?? 'Actualizar el array',
        sub: extras.updSub ?? 'mismo array, nueva longitud',
      },
    ],
    retorno: extras.retorno ?? `Return ${ui.retorno}`,
  });

const FLUJOS_METODO = {
  push: (ui, demo) =>
    flujoMutador(ui, {
      op: 'Añadir al final',
      opSub: `push(${(demo.items ?? []).map(String).join(', ')})`,
      upd: 'Actualizar length',
      updSub: 'length = length + 1',
      retorno: 'Return nueva longitud 🔢',
    }),
  unshift: (ui, demo) =>
    flujoMutador(ui, {
      op: 'Insertar al inicio',
      opSub: `unshift(${(demo.items ?? []).map(String).join(', ')})`,
      upd: 'Desplazar los índices',
      updSub: 'length = length + n',
      retorno: 'Return nueva longitud 🔢',
    }),
  pop: (ui) =>
    flujoMutador(ui, {
      op: 'Extraer el último',
      opSub: 'array[length − 1]',
      upd: 'Acortar el array',
      updSub: 'length = length − 1',
      retorno: 'Return elemento extraído ✅',
    }),
  shift: (ui) =>
    flujoMutador(ui, {
      op: 'Extraer el primero',
      opSub: 'array[0]',
      upd: 'Reindexar el resto',
      updSub: 'cada elemento baja 1',
      retorno: 'Return elemento extraído ✅',
    }),
  reverse: (ui) =>
    flujoMutador(ui, {
      op: 'Intercambiar extremos',
      opSub: '[i] ↔ [length − 1 − i]',
      upd: 'Array invertido en el sitio',
      updSub: 'avanza hacia el centro',
      retorno: 'Return el MISMO array 🔄',
    }),
  sort: (ui) =>
    flujoMutador(ui, {
      op: 'Comparar pareja',
      opSub: '(a, b) => Number(a) − Number(b)',
      upd: 'Intercambiar si hace falta',
      updSub: '[j−1] ↔ [j]',
      retorno: 'Return array ordenado 🔀',
    }),
  tosorted: (ui) =>
    flujoLineal({
      inicio: 'Inicio: array.toSorted()',
      pasos: [
        { id: 'copy', label: 'Copiar el array', sub: 'el original NO se toca' },
        { id: 'op', label: 'Comparar pareja', sub: '(a, b) => a − b' },
        { id: 'upd', label: 'Ordenar la copia', sub: 'intercambia en la copia' },
      ],
      retorno: 'Return copia ordenada 🧬',
    }),
  at: (ui, demo) =>
    flujoLineal({
      inicio: `Inicio: array.at(${demo.index ?? 0})`,
      pasos: [
        {
          id: 'calc',
          label: 'Resolver el índice',
          sub:
            Number(demo.index ?? 0) < 0
              ? `${demo.array?.length ?? 0} + (${demo.index}) = ${
                  (demo.array?.length ?? 0) + Number(demo.index ?? 0)
                }`
              : `índice directo: ${demo.index ?? 0}`,
        },
        { id: 'read', label: 'Leer esa posición', sub: 'array[indice]' },
      ],
      retorno: 'Return el elemento 🎯',
    }),
  some: (ui) => flujoBusqueda('some', ui, false, false),
  every: (ui) => flujoBusqueda('every', ui, false, true),
  findindex: (ui) => flujoBusqueda('findindex', ui, false, false),
  findlast: (ui) => flujoBusqueda('findlast', ui, true, false),
  findlastindex: (ui) => flujoBusqueda('findlastindex', ui, true, false),
  indexof: (ui) => flujoBusqueda('indexof', ui, false, false),
  lastindexof: (ui) => flujoBusqueda('lastindexof', ui, true, false),
};

const flujoDe = (metodoId, familia, ui, demo) => {
  if (FLUJOS_METODO[metodoId]) return FLUJOS_METODO[metodoId](ui, demo);
  if (familia === 'busqueda') {
    return flujoBusqueda(metodoId, ui, ES_REVERSA.has(metodoId), false);
  }
  if (familia === 'mutador') return flujoMutador(ui);
  if (familia === 'reduccion') {
    return {
      nodos: [
        { id: 'start', x: 300, y: 45, tipo: 'pill', label: `Inicio: array.${ui.corto}()` },
        { id: 'init', x: 300, y: 130, label: 'Acumulador inicial', sub: '{valorInicial}' },
        { id: 'iter', x: 300, y: 220, label: 'Iterar', sub: 'idx = {idx}' },
        { id: 'eval', x: 300, y: 320, label: ui.accion, sub: '{cond}' },
        { id: 'dec', x: 300, y: 425, tipo: 'decision', label: '¿Es el último?' },
        {
          id: 'success',
          x: 480,
          y: 425,
          tipo: 'pill ret-success',
          label: `Return ${ui.retorno}`,
        },
      ],
      paths: [
        { id: 'p1', d: 'M 300 80 L 300 100' },
        { id: 'p2', d: 'M 300 160 L 300 190' },
        { id: 'p4', d: 'M 300 255 L 300 288' },
        { id: 'p5', d: 'M 300 355 L 300 392' },
        { id: 'p6', d: 'M 350 425 L 410 425' },
        { id: 'p7', d: 'M 250 425 L 55 425 L 55 220 L 245 220' },
      ],
    };
  }
  if (familia === 'iterador') {
    return {
      nodos: [
        { id: 'start', x: 300, y: 45, tipo: 'pill', label: `Inicio: array.${ui.corto}()` },
        { id: 'init', x: 300, y: 140, label: 'Crear iterador' },
        { id: 'check', x: 300, y: 250, tipo: 'decision', label: '¿done?' },
        { id: 'eval', x: 300, y: 350, label: ui.accion, sub: '{cond}' },
        { id: 'success', x: 480, y: 250, tipo: 'pill ret-success', label: 'Fin del iterador' },
      ],
      paths: [
        { id: 'p1', d: 'M 300 80 L 300 110' },
        { id: 'p2', d: 'M 300 165 L 300 215' },
        { id: 'p4', d: 'M 300 292 L 300 320' },
        { id: 'p3', d: 'M 350 250 L 415 250' },
        { id: 'p5', d: 'M 300 380 L 300 405 L 55 405 L 55 250 L 245 250' },
      ],
    };
  }
  if (familia === 'transformacion') {
    return {
      nodos: [
        { id: 'start', x: 300, y: 45, tipo: 'pill', label: `Inicio: array.${ui.corto}()` },
        { id: 'iter', x: 300, y: 135, label: 'Iterar', sub: 'idx = {idx}' },
        { id: 'check', x: 300, y: 250, tipo: 'decision', label: '¿idx < length?' },
        { id: 'eval', x: 300, y: 345, label: ui.accion, sub: '{cond}' },
        { id: 'dec', x: 300, y: 445, tipo: 'decision', label: '¿Es el último?' },
        {
          id: 'success',
          x: 480,
          y: 445,
          tipo: 'pill ret-success',
          label: `Return ${ui.retorno}`,
        },
      ],
      paths: [
        { id: 'p1', d: 'M 300 80 L 300 105' },
        { id: 'p2', d: 'M 300 170 L 300 215' },
        { id: 'p4', d: 'M 300 292 L 300 318' },
        { id: 'p5', d: 'M 300 380 L 300 412' },
        { id: 'p6', d: 'M 350 445 L 410 445' },
        { id: 'p7', d: 'M 250 445 L 55 445 L 55 135 L 245 135' },
        { id: 'p3', d: 'M 250 250 L 55 250 L 55 135 L 245 135' },
      ],
    };
  }
  return {
    nodos: [
      { id: 'start', x: 300, y: 70, tipo: 'pill', label: `Inicio: array.${ui.corto}()` },
      { id: 'op', x: 300, y: 210, label: ui.accion, sub: '{cond}' },
      { id: 'success', x: 300, y: 340, tipo: 'pill ret-success', label: `Return ${ui.retorno}` },
    ],
    paths: [
      { id: 'p1', d: 'M 300 105 L 300 175' },
      { id: 'p4', d: 'M 300 245 L 300 305' },
    ],
  };
};

const PARAMETRO = {
  busqueda: { etiqueta: (demo) => `Condición (n ${demo.op ?? '>' } ?)`, tipo: 'number' },
  transformacion: null,
  mutador: null,
  reduccion: null,
  iterador: null,
  utilidad: null,
};

const parsearArray = (texto) => {
  try {
    const valor = new Function(`return (${texto});`)();
    return Array.isArray(valor) ? valor : null;
  } catch {
    return null;
  }
};

const leerValor = (texto) => {
  try {
    return new Function(`return (${texto});`)();
  } catch {
    return texto;
  }
};

/* Negritas y código inline dentro de las explicaciones. */
const conFormato = (texto) =>
  String(texto)
    .split(/(\*\*.+?\*\*|`[^`]+`)/g)
    .map((parte, i) => {
      if (parte.startsWith('**') && parte.endsWith('**')) {
        return <strong key={i}>{parte.slice(2, -2)}</strong>;
      }
      if (parte.startsWith('`') && parte.endsWith('`')) {
        return <code key={i}>{parte.slice(1, -1)}</code>;
      }
      return parte;
    });

/* ------------------------------------------------------------------
   Guion de la animación a partir de la traza real
   ------------------------------------------------------------------ */

const construirGuion = (metodoId, demo, familia, resultado) => {
  const guion = [];
  const add = (paso, nodo, path, extra = {}) => {
    guion.push({
      log: paso.msg,
      fase: paso.fase,
      tipo: paso.tipo,
      index: paso.index,
      salida: paso.salida,
      nodo,
      path,
      ...extra,
    });
  };

  const esEvery = metodoId === 'every';

  const nodoFinal = () => {
    if (familia !== 'busqueda') return { nodo: 'success', path: 'p5' };
    let ok;
    if (metodoId === 'some' || metodoId === 'every') ok = resultado === true;
    else if (ES_INDICE.has(metodoId)) ok = resultado !== -1;
    else ok = resultado !== undefined;
    if (esEvery) return ok ? { nodo: 'success', path: 'p3' } : { nodo: 'fail', path: 'p6' };
    return ok ? { nodo: 'success', path: 'p6' } : { nodo: 'fail', path: 'p3' };
  };

  for (const paso of demo.pasos) {
    if (paso.fase === 'inicio') {
      add(paso, 'start', 'p1');
      continue;
    }

    if (familia === 'busqueda') {
      if (paso.fase === 'evaluar') {
        const encontrado = paso.tipo === 'success';
        add(paso, 'iter', 'p2', { log: '' });
        add(paso, 'check', 'p4', { log: '' });
        add(paso, 'eval', 'p5');
        if (esEvery) {
          add(paso, 'dec', encontrado ? 'p7' : 'p6', { log: '' });
        } else {
          add(paso, 'dec', encontrado ? 'p6' : 'p7', { log: '' });
        }
      } else if (paso.fase === 'resumen') {
        if (esEvery) add(paso, 'success', 'p3');
        else add(paso, 'fail', 'p3');
      } else if (paso.fase === 'retorno') {
        const fin = nodoFinal();
        const ultimo = guion[guion.length - 1];
        if (ultimo?.nodo === fin.nodo) ultimo.log = paso.msg;
        else add(paso, fin.nodo, fin.path);
      }
      continue;
    }

    if (metodoId === 'tosorted') {
      if (paso.fase === 'accion') add(paso, 'copy', 'p1');
      else if (paso.fase === 'comparar') add(paso, 'op', 'p2');
      else if (paso.fase === 'mutar') add(paso, 'upd', 'p3');
      else if (paso.fase === 'retorno') add(paso, 'success', 'p4');
      continue;
    }

    if (metodoId === 'at') {
      if (paso.fase === 'accion') {
        add(paso, 'calc', 'p1');
        add(paso, 'read', 'p2', { log: '' });
      } else if (paso.fase === 'retorno') {
        add(paso, 'success', 'p3');
      }
      continue;
    }

    if (
      familia === 'mutador' ||
      metodoId === 'reverse' ||
      metodoId === 'sort'
    ) {
      if (paso.fase === 'comparar') {
        add(paso, 'op', 'p1');
      } else if (paso.fase === 'mutar') {
        add(paso, 'op', 'p1', metodoId === 'sort' ? { log: '' } : {});
        add(paso, 'upd', 'p2', { log: '' });
      } else if (paso.fase === 'iterar' || paso.fase === 'accion') {
        add(paso, 'op', 'p1');
      } else if (paso.fase === 'retorno') {
        add(paso, 'success', 'p3');
      }
      continue;
    }

    if (familia === 'transformacion') {
      if (paso.fase === 'iterar' || paso.fase === 'accion' || paso.fase === 'mutar') {
        add(paso, 'iter', 'p2', { log: '' });
        add(paso, 'eval', 'p4');
        add(paso, 'dec', 'p7', { log: '' });
      } else if (paso.fase === 'retorno') {
        add(paso, 'success', 'p6');
      }
      continue;
    }

    if (familia === 'reduccion') {
      if (paso.fase === 'iterar' && paso.index === -1) {
        add(paso, 'init', 'p1');
      } else if (paso.fase === 'iterar' || paso.fase === 'accion') {
        add(paso, 'iter', 'p2', { log: '' });
        add(paso, 'eval', 'p4');
        add(paso, 'dec', 'p7', { log: '' });
      } else if (paso.fase === 'retorno') {
        add(paso, 'success', 'p6');
      }
      continue;
    }

    if (familia === 'iterador') {
      if (paso.fase === 'iterar') {
        add(paso, 'init', 'p1');
      } else if (paso.fase === 'accion') {
        add(paso, 'check', 'p4', { log: '' });
        add(paso, 'eval', 'p5');
      } else if (paso.fase === 'retorno') {
        add(paso, 'success', 'p3');
      }
      continue;
    }

    // utilidad genérica
    if (paso.fase === 'accion') {
      add(paso, 'op', 'p1');
    } else if (paso.fase === 'retorno') {
      add(paso, 'success', 'p4');
    }
  }

  return guion;
};

const claseLog = (tipo) => {
  if (tipo === 'success') return 'log-success';
  if (tipo === 'error') return 'log-error';
  if (tipo === 'return') return 'log-return';
  if (tipo === 'eval') return 'log-eval';
  return 'log-info';
};

export default function DiagramaMetodo({ metodo }) {
  const familia = obtenerFamilia(metodo.id);
  const nombre = obtenerNombre(metodo.id);
  const demoBase = obtenerDemo(metodo.id);
  const ui = uiMetodo(metodo.id);
  const esPorValor = metodo.id === 'indexof' || metodo.id === 'lastindexof';
  const paramConfig = esPorValor ? null : PARAMETRO[familia];

  const [arrayTexto, setArrayTexto] = useState(() => JSON.stringify(demoBase.array ?? []));
  const [limite, setLimite] = useState(() => String(demoBase.limite ?? ''));
  const [config, setConfig] = useState(() => ({
    arreglo: demoBase.array ?? [],
    limite: demoBase.limite,
    valor: demoBase.buscar,
    indiceAt: demoBase.index,
  }));
  const [valorTexto, setValorTexto] = useState(() =>
    demoBase.buscar !== undefined ? String(demoBase.buscar) : ''
  );
  const [indiceTexto, setIndiceTexto] = useState(() => String(demoBase.index ?? 0));

  const plan = useMemo(() => {
    const opciones = { arreglo: config.arreglo };
    if (config.limite !== undefined && config.limite !== null && config.limite !== '') {
      opciones.limite = config.limite;
    }
    if (config.valor !== undefined) opciones.valor = config.valor;
    if (metodo.id === 'at') {
      opciones.parametros = { index: Number(config.indiceAt ?? 0) };
    }
    let ejecucion;
    try {
      ejecucion = ejecutarDemo(metodo.id, opciones);
    } catch {
      ejecucion = ejecutarDemo(metodo.id);
    }
    return {
      ...ejecucion,
      guion: construirGuion(metodo.id, ejecucion, familia, ejecucion.result),
    };
  }, [config, familia, metodo.id]);

  const flujo = flujoDe(metodo.id, familia, ui, plan.demo);

  const total = plan.guion.length;
  const [indice, setIndice] = useState(0);
  const [auto, setAuto] = useState(false);
  const [logs, setLogs] = useState([
    { texto: '> Flujo reiniciado. Listo para ejecutar.', clase: 'log-info' },
  ]);

  const consolaRef = useRef(null);
  const terminado = indice >= total;
  const enMarcha = auto && !terminado;
  const actual = plan.guion[Math.min(indice, total) - 1] ?? null;

  useEffect(() => {
    if (consolaRef.current) {
      consolaRef.current.scrollTop = consolaRef.current.scrollHeight;
    }
  }, [logs]);

  const reiniciar = useCallback(() => {
    const arreglo = parsearArray(arrayTexto);
    setAuto(false);
    setIndice(0);
    if (!arreglo) {
      setLogs([{ texto: '❌ El array no es válido. Usa algo como [1, 2, 3].', clase: 'log-error' }]);
      return;
    }
    setConfig({
      arreglo,
      limite: paramConfig && limite !== '' ? limite : undefined,
      valor: esPorValor && valorTexto !== '' ? leerValor(valorTexto) : undefined,
      indiceAt: metodo.id === 'at' ? Number(indiceTexto) : undefined,
    });
    setLogs([{ texto: '> Flujo reiniciado. Listo para ejecutar.', clase: 'log-info' }]);
  }, [arrayTexto, limite, paramConfig, esPorValor, valorTexto, metodo.id, indiceTexto]);

  const avanzar = useCallback(() => {
    setIndice((prev) => {
      if (prev >= total) return prev;
      const siguiente = plan.guion[prev];
      if (siguiente?.log) {
        setLogs((logsPrev) => [
          ...logsPrev,
          { texto: siguiente.log, clase: claseLog(siguiente.tipo) },
        ]);
      }
      return prev + 1;
    });
  }, [plan.guion, total]);

  useEffect(() => {
    if (!enMarcha) return;
    const timer = setTimeout(avanzar, 1000);
    return () => clearTimeout(timer);
  }, [enMarcha, avanzar, indice]);

  useEffect(() => {
    if (terminado && auto) setAuto(false);
  }, [terminado, auto]);

  const alternarAuto = () => {
    if (enMarcha) {
      setAuto(false);
      return;
    }
    if (terminado) {
      reiniciar();
      setAuto(true);
      return;
    }
    setAuto(true);
  };

  const pasoManual = () => {
    setAuto(false);
    avanzar();
  };

  const activo = (id) => (actual?.nodo === id ? 'active' : '');
  const camino = (id) => {
    if (actual?.path === id) return 'active flowing';
    const posActual = flujo.paths.findIndex((p) => p.id === actual?.path);
    const pos = flujo.paths.findIndex((p) => p.id === id);
    return pos !== -1 && posActual !== -1 && pos < posActual ? 'active flowing' : '';
  };

  const pasoTeoria = (() => {
    const pasos = Math.max(metodo.comoFunciona?.length ?? 0, 0);
    if (pasos === 0) return -1;
    if (total === 0) return -1;
    return Math.min(Math.floor((indice / total) * pasos), pasos - 1);
  })();

  const etiqueta = (texto) =>
    texto
      .replace('{metodo}', nombre.replace('Array.prototype.', '').replace('()', ''))
      .replace('{cond}', demoBase.cond ?? '—')
      .replace('{fallo}', ui.fallo)
      .replace('{exito}', ui.retorno)
      .replace('{valorInicial}', formatValue(demoBase.initial ?? 0));

  const subTexto = (nodo) => {
    if (nodo.sub === 'idx = {idx}') {
      return `idx = ${actual?.index >= 0 ? actual.index : 0}`;
    }
    return etiqueta(nodo.sub);
  };

  return (
    <div className="sim-diagrama-find">
      <div className="left-panel">
        <div className="title">⚙️ ¿Cómo funciona?</div>

        <div className="theory-list">
          {(metodo.comoFunciona ?? []).slice(0, 6).map((texto, i) => (
            <div
              key={`${metodo.id}-teoria-${i}`}
              className={`theory-step ${i === pasoTeoria ? 'active' : ''}`}
            >
              <div className="num">{i + 1}</div>
              <p>{conFormato(texto)}</p>
            </div>
          ))}
        </div>

        <div className="input-group">
          <label>Array de prueba</label>
          <input
            type="text"
            className="input-field"
            value={arrayTexto}
            onChange={(e) => setArrayTexto(e.target.value)}
            disabled={enMarcha || (indice > 0 && !terminado)}
          />
        </div>

        {paramConfig && (
          <div className="input-group">
            <label>{paramConfig.etiqueta(demoBase)}</label>
            <input
              type="number"
              className="input-field"
              value={limite}
              onChange={(e) => setLimite(e.target.value)}
              disabled={enMarcha || (indice > 0 && !terminado)}
            />
          </div>
        )}

        {esPorValor && (
          <div className="input-group">
            <label>Valor buscado (igualdad estricta)</label>
            <input
              type="text"
              className="input-field"
              value={valorTexto}
              onChange={(e) => setValorTexto(e.target.value)}
              disabled={enMarcha || (indice > 0 && !terminado)}
            />
          </div>
        )}

        {metodo.id === 'at' && (
          <div className="input-group">
            <label>Índice (negativo = desde el final)</label>
            <input
              type="number"
              className="input-field"
              value={indiceTexto}
              onChange={(e) => setIndiceTexto(e.target.value)}
              disabled={enMarcha || (indice > 0 && !terminado)}
            />
          </div>
        )}

        <div className="btn-group">
          <div className="btn-row">
            <button type="button" className="btn btn-run" onClick={alternarAuto}>
              {enMarcha ? '⏸ Pausar' : '▶ Auto'}
            </button>
            <button
              type="button"
              className="btn btn-step"
              onClick={pasoManual}
              disabled={enMarcha || terminado}
            >
              ⏭ Paso
            </button>
          </div>
          <button type="button" className="btn btn-reset" onClick={reiniciar}>
            🔄 Reiniciar
          </button>
        </div>

        <div
          className={`result-box ${
            terminado ? (plan.finalArray && plan.muta ? 'success' : 'success') : ''
          }`}
        >
          <div className="label">Resultado Final</div>
          <div className="value">
            {terminado ? formatearResultado(metodo.id, plan.result) : 'Esperando...'}
          </div>
        </div>
      </div>

      <div className="right-panel">
        <div className="diagram-wrapper">
          <div className="canvas">
            <svg viewBox="0 0 600 500" preserveAspectRatio="none">
              <defs>
                <marker
                  id={`flecha-${metodo.id}`}
                  viewBox="0 0 10 10"
                  refX="9"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="#3f3f46" />
                </marker>
              </defs>
              {flujo.paths.map((p) => (
                <path
                  key={`${metodo.id}-path-${p.id}`}
                  className={camino(p.id)}
                  d={p.d}
                  markerEnd={`url(#flecha-${metodo.id})`}
                />
              ))}
            </svg>

            {flujo.nodos.map((nodo) => {
              const x = (nodo.x / 600) * 100;
              const y = (nodo.y / 500) * 100;
              const clases = [
                'node',
                nodo.tipo === 'pill' ? 'pill' : '',
                nodo.tipo === 'decision' ? 'decision' : '',
                nodo.tipo === 'pill ret-fail' ? 'pill ret-fail' : '',
                nodo.tipo === 'pill ret-success' ? 'pill ret-success' : '',
                activo(nodo.id),
              ]
                .filter(Boolean)
                .join(' ');
              return (
                <div
                  key={`${metodo.id}-nodo-${nodo.id}`}
                  className={clases}
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {nodo.tipo === 'decision' ? (
                    <span>{etiqueta(nodo.label)}</span>
                  ) : (
                    <>
                      {etiqueta(nodo.label)}
                      {nodo.sub && <div className="sub">{subTexto(nodo)}</div>}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="console-wrapper">
          <div className="console-header">
            <span>Terminal de Depuración</span>
            <span style={{ color: 'var(--text-muted)' }}>
              ● {enMarcha ? 'Auto' : terminado ? 'Completado' : 'Listo'}
            </span>
          </div>
          <div className="console-body" ref={consolaRef}>
            {logs.map((linea, i) => (
              <div key={`${metodo.id}-log-${i}`} className={`log-line ${linea.clase}`}>
                {linea.texto}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
