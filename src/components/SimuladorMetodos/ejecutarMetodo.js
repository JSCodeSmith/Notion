import { formatValue } from '../SimuladorFind/findTrace';
import {
  FAMILIA,
  MUTA,
  obtenerDemo,
  obtenerFamilia,
  obtenerNombre,
} from './metodosMeta';

const copiar = (valor) => {
  if (!Array.isArray(valor)) return valor;
  return valor.map((item) =>
    Array.isArray(item) ? [...item] : item
  );
};

const esIndice = (metodoId) =>
  ['findindex', 'findlastindex', 'indexof', 'lastindexof'].includes(metodoId);

const normalizarIndice = (indice, largo) => {
  const n = Number(indice);
  if (!Number.isFinite(n)) return 0;
  const entero = Math.trunc(n);
  return entero < 0 ? Math.max(largo + entero, 0) : Math.min(entero, largo);
};

const textoResultado = (metodoId, valor) => {
  if (esIndice(metodoId)) return String(valor);
  if (metodoId === 'some' || metodoId === 'every' || metodoId === 'isarray') {
    return String(valor);
  }
  if (metodoId === 'push' || metodoId === 'unshift' || metodoId === 'length') {
    return String(valor);
  }
  return formatValue(valor);
};

export function ejecutarDemo(metodoId) {
  const demo = obtenerDemo(metodoId);
  const familia = obtenerFamilia(metodoId);
  const nombre = obtenerNombre(metodoId);
  const original = copiar(demo.array ?? []);
  const pasos = [];
  const estados = {};
  let contador = 0;

  const paso = (fase, tipo, msg, extra = {}) => {
    pasos.push({
      key: contador++,
      fase,
      tipo,
      msg,
      index: extra.index ?? -1,
      estados: { ...estados },
      array: extra.array ? copiar(extra.array) : null,
      salida: extra.salida ? copiar(extra.salida) : null,
      explicacion: extra.explicacion ?? '',
    });
  };

  paso('inicio', 'system', `▶ Ejecutando ${nombre} sobre [${original.map(formatValue).join(', ')}]`);

  let result;
  let finalArray = original;

  if (familia === 'busqueda') {
    const reversa = ['findlast', 'findlastindex', 'lastindexof'].includes(metodoId);
    const orden = original.map((_, i) => i);
    if (reversa) orden.reverse();

    let cerrado = false;
    for (const idx of orden) {
      estados[idx] = 'active';
      const ok =
        metodoId === 'indexof' || metodoId === 'lastindexof'
          ? original[idx] === demo.buscar
          : Boolean(demo.fn?.(original[idx], idx, original));

      paso(
        'evaluar',
        ok ? 'success' : 'error',
        `[${idx}] ${formatValue(original[idx])} → ${demo.cond ?? 'condición'} = ${ok ? 'TRUE' : 'FALSE'}`,
        { index: idx }
      );

      if (ok) {
        if (metodoId === 'some') {
          estados[idx] = 'found';
          result = true;
          cerrado = true;
          break;
        }
        if (metodoId === 'every') {
          estados[idx] = 'ok';
          continue;
        }
        estados[idx] = 'found';
        result = esIndice(metodoId) ? idx : original[idx];
        cerrado = true;
        break;
      }

      if (metodoId === 'every') {
        estados[idx] = 'fail';
        result = false;
        cerrado = true;
        break;
      }
      estados[idx] = 'discarded';
    }

    if (!cerrado) {
      if (metodoId === 'some') result = false;
      else if (metodoId === 'every') result = true;
      else if (metodoId === 'find' || metodoId === 'findlast') result = undefined;
      else result = -1;
    }
  } else if (familia === 'transformacion') {
    switch (metodoId) {
      case 'map': {
        const salida = [];
        original.forEach((valor, idx) => {
          estados[idx] = 'active';
          const nuevo = demo.fn?.(valor, idx, original);
          salida.push(nuevo);
          estados[idx] = 'done';
          paso('accion', 'eval', `[${idx}] ${formatValue(valor)} → ${formatValue(nuevo)}`, {
            index: idx,
            salida,
          });
        });
        result = salida;
        break;
      }
      case 'filter': {
        const salida = [];
        original.forEach((valor, idx) => {
          estados[idx] = 'active';
          const ok = Boolean(demo.fn?.(valor, idx, original));
          if (ok) salida.push(valor);
          estados[idx] = ok ? 'ok' : 'discarded';
          paso(
            'decision',
            ok ? 'success' : 'error',
            `[${idx}] ${formatValue(valor)} → ${ok ? 'se conserva' : 'se descarta'}`,
            { index: idx, salida }
          );
        });
        result = salida;
        break;
      }
      case 'flatmap': {
        const salida = [];
        original.forEach((valor, idx) => {
          estados[idx] = 'active';
          const mapeado = demo.fn?.(valor, idx, original);
          const trozos = Array.isArray(mapeado) ? mapeado : [mapeado];
          salida.push(...trozos);
          estados[idx] = 'done';
          paso(
            'accion',
            'eval',
            `[${idx}] ${formatValue(valor)} → ${formatValue(mapeado)} (se aplana)`,
            { index: idx, salida }
          );
        });
        result = salida;
        break;
      }
      case 'slice': {
        const inicio = normalizarIndice(demo.start ?? 0, original.length);
        const fin = normalizarIndice(demo.end ?? original.length, original.length);
        paso('iterar', 'info', `Índices normalizados: start=${inicio}, end=${fin}`);
        original.forEach((valor, idx) => {
          if (idx >= inicio && idx < fin) estados[idx] = 'ok';
          else estados[idx] = 'discarded';
        });
        result = original.slice(inicio, fin);
        paso('accion', 'eval', `Copia desde [${inicio}] hasta [${fin}] sin incluir el final.`, {
          salida: result,
        });
        break;
      }
      case 'fill': {
        const inicio = normalizarIndice(demo.start ?? 0, original.length);
        const fin = normalizarIndice(demo.end ?? original.length, original.length);
        finalArray = copiar(original);
        finalArray.fill(demo.value, inicio, fin);
        finalArray.forEach((_, idx) => {
          estados[idx] = idx >= inicio && idx < fin ? 'new' : 'normal';
        });
        paso(
          'mutar',
          'eval',
          `Rellena de [${inicio}] a [${fin}] con ${formatValue(demo.value)}. El array cambia.`,
          { array: finalArray }
        );
        result = finalArray;
        break;
      }
      case 'with': {
        const idx = normalizarIndice(demo.index ?? 0, original.length);
        result = copiar(original);
        result[idx] = demo.value;
        estados[idx] = 'new';
        paso(
          'accion',
          'eval',
          `Copia el array y reemplaza [${idx}] por ${formatValue(demo.value)}.`,
          { index: idx, salida: result }
        );
        break;
      }
      case 'from': {
        const texto = String(demo.arrayLike ?? 'abc');
        result = Array.from(texto);
        result.forEach((_, idx) => {
          estados[idx] = 'new';
        });
        paso('accion', 'eval', `Convierte ${formatValue(texto)} en un array real.`, {
          salida: result,
        });
        break;
      }
      case 'toreversed': {
        result = copiar(original).reverse();
        paso('accion', 'eval', 'Copia el array y lo recorre al revés.', { salida: result });
        break;
      }
      case 'reverse': {
        finalArray = copiar(original).reverse();
        finalArray.forEach((_, idx) => {
          estados[idx] = 'moved';
        });
        paso('mutar', 'eval', 'Invierte el array original en el sitio.', {
          array: finalArray,
        });
        result = finalArray;
        break;
      }
      case 'flat': {
        const depth = demo.depth ?? 1;
        result = original.flat(depth);
        paso('accion', 'eval', `Aplana los subarrays ${depth} nivel(es).`, {
          salida: result,
        });
        break;
      }
      case 'copywithin': {
        const target = normalizarIndice(demo.target ?? 0, original.length);
        const start = normalizarIndice(demo.start ?? 0, original.length);
        finalArray = copiar(original);
        finalArray.copyWithin(target, start);
        finalArray.forEach((_, idx) => {
          estados[idx] = idx >= target ? 'moved' : 'normal';
        });
        paso(
          'mutar',
          'eval',
          `Copia el tramo desde [${start}] sobre [${target}]. El array cambia.`,
          { array: finalArray }
        );
        result = finalArray;
        break;
      }
      case 'tosorted': {
        result = copiar(original).sort((a, b) => a - b);
        paso('accion', 'eval', 'Copia el array y lo ordena sin mutar el original.', {
          salida: result,
        });
        break;
      }
      case 'tospliced': {
        const inicio = normalizarIndice(demo.start ?? 0, original.length);
        const borrar = demo.deleteCount ?? 0;
        result = copiar(original);
        result.splice(inicio, borrar, ...(demo.items ?? []));
        result.forEach((_, idx) => {
          estados[idx] = 'new';
        });
        paso(
          'accion',
          'eval',
          `Copia el array y reemplaza ${borrar} elemento(s) desde [${inicio}].`,
          { salida: result }
        );
        break;
      }
      default:
        result = original;
    }
  } else if (familia === 'mutador') {
    switch (metodoId) {
      case 'push': {
        finalArray = copiar(original);
        const largo = finalArray.push(...(demo.items ?? []));
        finalArray.forEach((_, idx) => {
          estados[idx] = idx >= original.length ? 'new' : 'normal';
        });
        paso('mutar', 'eval', `Añade ${formatValue(demo.items)} al final.`, {
          array: finalArray,
        });
        result = largo;
        break;
      }
      case 'pop': {
        finalArray = copiar(original);
        const eliminado = finalArray.pop();
        finalArray.forEach((_, idx) => {
          estados[idx] = 'normal';
        });
        if (original.length > 0) estados[original.length - 1] = 'removed';
        paso('mutar', 'eval', `Elimina el último elemento: ${formatValue(eliminado)}.`, {
          array: finalArray,
        });
        result = eliminado;
        break;
      }
      case 'shift': {
        finalArray = copiar(original);
        const eliminado = finalArray.shift();
        finalArray.forEach((_, idx) => {
          estados[idx] = 'moved';
        });
        paso('mutar', 'eval', `Elimina el primer elemento: ${formatValue(eliminado)}.`, {
          array: finalArray,
        });
        result = eliminado;
        break;
      }
      case 'unshift': {
        finalArray = copiar(original);
        const largo = finalArray.unshift(...(demo.items ?? []));
        finalArray.forEach((_, idx) => {
          estados[idx] = 'new';
        });
        paso('mutar', 'eval', `Añade ${formatValue(demo.items)} al inicio.`, {
          array: finalArray,
        });
        result = largo;
        break;
      }
      case 'splice': {
        const inicio = normalizarIndice(demo.start ?? 0, original.length);
        const borrar = demo.deleteCount ?? 0;
        finalArray = copiar(original);
        const eliminados = finalArray.splice(inicio, borrar, ...(demo.items ?? []));
        finalArray.forEach((_, idx) => {
          estados[idx] = idx >= inicio ? 'new' : 'normal';
        });
        paso(
          'mutar',
          'eval',
          `Desde [${inicio}] elimina ${borrar} y añade ${formatValue(demo.items ?? [])}. Eliminados: ${formatValue(eliminados)}.`,
          { array: finalArray }
        );
        result = eliminados;
        break;
      }
      case 'sort': {
        finalArray = copiar(original).sort((a, b) => a - b);
        finalArray.forEach((_, idx) => {
          estados[idx] = 'moved';
        });
        paso('mutar', 'eval', 'Ordena el array original comparando con (a, b) => a - b.', {
          array: finalArray,
        });
        result = finalArray;
        break;
      }
      case 'length': {
        result = original.length;
        paso('accion', 'eval', `La propiedad length vale ${result}.`, {
          index: -1,
        });
        break;
      }
      default:
        result = original;
    }
  } else if (familia === 'reduccion') {
    const reversa = metodoId === 'reduceright';
    const orden = original.map((_, i) => i);
    if (reversa) orden.reverse();
    let acumulador = demo.initial ?? 0;
    paso('iterar', 'info', `Acumulador inicial: ${formatValue(acumulador)}`);

    orden.forEach((idx) => {
      estados[idx] = 'active';
      const anterior = acumulador;
      acumulador = demo.fn?.(acumulador, original[idx], idx, original);
      estados[idx] = 'done';
      paso(
        'accion',
        'eval',
        `[${idx}] ${formatValue(anterior)} + ${formatValue(original[idx])} → ${formatValue(acumulador)}`,
        { index: idx }
      );
    });
    result = acumulador;
  } else if (familia === 'iterador') {
    if (metodoId === 'foreach') {
      original.forEach((valor, idx) => {
        estados[idx] = 'active';
        const salida = demo.fn?.(valor, idx, original);
        estados[idx] = 'done';
        paso(
          'accion',
          'eval',
          `[${idx}] ${formatValue(valor)} → efecto secundario: ${formatValue(salida)}`,
          { index: idx }
        );
      });
      result = undefined;
    } else if (metodoId === 'entries') {
      result = original.map((valor, idx) => [idx, valor]);
      result.forEach(([idx], pos) => {
        estados[pos] = 'active';
        paso('accion', 'eval', `[${idx}] → par ${formatValue(result[pos])}`, {
          index: pos,
          salida: result,
        });
      });
    } else if (metodoId === 'keys') {
      result = original.map((_, idx) => idx);
      result.forEach((valor, pos) => {
        estados[pos] = 'active';
        paso('accion', 'eval', `[${pos}] → índice ${valor}`, { index: pos, salida: result });
      });
    } else {
      result = [...original];
      result.forEach((valor, pos) => {
        estados[pos] = 'active';
        paso('accion', 'eval', `[${pos}] → valor ${formatValue(valor)}`, {
          index: pos,
          salida: result,
        });
      });
    }
  } else {
    switch (metodoId) {
      case 'join': {
        result = original.join(demo.sep ?? ',');
        paso('accion', 'eval', `Une los elementos con ${formatValue(demo.sep ?? ',')}.`, {
          salida: result,
        });
        break;
      }
      case 'split': {
        const texto = String(demo.texto ?? 'a-b-c');
        result = texto.split(demo.sep ?? '-');
        paso(
          'accion',
          'eval',
          `Divide ${formatValue(texto)} usando ${formatValue(demo.sep ?? '-')} como separador.`,
          { salida: result }
        );
        break;
      }
      case 'of': {
        result = [...(demo.items ?? [])];
        paso('accion', 'eval', 'Crea un array nuevo con los argumentos recibidos.', {
          salida: result,
        });
        break;
      }
      case 'isarray': {
        result = Array.isArray(demo.value ?? original);
        paso('accion', 'eval', `¿El valor es un array real? → ${result}`, {
          index: -1,
        });
        break;
      }
      case 'at': {
        const idx = Number(demo.index ?? 0);
        const real = idx < 0 ? original.length + idx : idx;
        result = original[real];
        estadoSeguro(estados, real, 'found');
        paso(
          'accion',
          'eval',
          `at(${idx}) apunta al índice real ${real} → ${formatValue(result)}`,
          { index: real }
        );
        break;
      }
      case 'length': {
        result = original.length;
        paso('accion', 'eval', `La propiedad length vale ${result}.`);
        break;
      }
      case 'concat': {
        result = original.concat(...(demo.items ?? []));
        paso('accion', 'eval', 'Copia el array y concatena los argumentos.', { salida: result });
        break;
      }
      default:
        result = original;
    }
  }

  finalArray = finalArray ?? original;

  if (pasos.length === 1) {
    paso('accion', 'eval', `Resultado calculado: ${textoResultado(metodoId, result)}`);
  }

  paso('retorno', 'return', `■ Retorna: ${textoResultado(metodoId, result)}`, {
    salida: Array.isArray(result) ? result : null,
  });

  return {
    metodoId,
    nombre,
    familia: FAMILIA[metodoId] ?? 'utilidad',
    demo,
    original,
    finalArray,
    muta: MUTA.has(metodoId),
    result,
    pasos,
  };
}

function estadoSeguro(estados, indice, valor) {
  if (indice >= 0) estados[indice] = valor;
}

export const formatearResultado = (metodoId, result) =>
  textoResultado(metodoId, result);

export const esMetodoConCallback = (metodoId) =>
  [
    'find', 'findindex', 'findlast', 'findlastindex', 'some', 'every',
    'map', 'filter', 'flatmap', 'foreach', 'reduce', 'reduceright', 'sort',
    'tosorted',
  ].includes(metodoId);
