import { parse } from 'acorn';
import { formatValue } from '../SimuladorFind/findTrace';

const esLlamada = (node, arrayName, methodName) =>
  node?.type === 'CallExpression' &&
  node.callee?.type === 'MemberExpression' &&
  !node.callee.computed &&
  node.callee.property?.name === methodName &&
  node.callee.object?.type === 'Identifier' &&
  node.callee.object.name === arrayName &&
  node.arguments.length > 0;

const esFuncion = (node) =>
  node?.type === 'ArrowFunctionExpression' || node?.type === 'FunctionExpression';

/*
 * Instrumenta el callback real de `array.metodo(callback)` para poder
 * mostrar cada evaluación sin inventar resultados. Es la misma idea que
 * findTrace, pero funciona con cualquier método que reciba un callback.
 */
export const instrumentarMetodo = (source, arrayName, methodName) => {
  try {
    const ast = parse(source, {
      ecmaVersion: 'latest',
      sourceType: 'script',
      allowReturnOutsideFunction: true,
    });

    const callbacks = [];

    const visitar = (node) => {
      if (!node || typeof node !== 'object') return;
      if (esLlamada(node, arrayName, methodName)) {
        const callback = node.arguments[0];
        if (esFuncion(callback)) {
          callbacks.push({ start: callback.start, end: callback.end });
        }
      }
      for (const [key, child] of Object.entries(node)) {
        if (key === 'start' || key === 'end') continue;
        if (Array.isArray(child)) child.forEach(visitar);
        else if (child && typeof child.type === 'string') visitar(child);
      }
    };

    visitar(ast);

    if (callbacks.length === 0) {
      return { code: source, instrumented: false };
    }

    callbacks.sort((a, b) => b.start - a.start);

    let code = source;
    for (const { start, end } of callbacks) {
      const callbackSource = source.slice(start, end);
      const wrapper = `(function (...__args) {
        const __resultado = (${callbackSource}).apply(this, __args);
        __traceMetodo(__args, __resultado);
        return __resultado;
      })`;
      code = code.slice(0, start) + wrapper + code.slice(end);
    }

    return { code, instrumented: true };
  } catch {
    return { code: source, instrumented: false };
  }
};

export const describirTraza = (metodoId, args, resultado) => {
  if (metodoId === 'reduce' || metodoId === 'reduceright') {
    const [acumulador, valor] = args;
    return `acc ${formatValue(acumulador)} + ${formatValue(valor)} → ${formatValue(resultado)}`;
  }
  if (metodoId === 'sort' || metodoId === 'tosorted') {
    const [a, b] = args;
    return `comparar(${formatValue(a)}, ${formatValue(b)}) → ${formatValue(resultado)}`;
  }
  const [valor, indice] = args;
  return `[${indice ?? 0}] ${formatValue(valor)} → ${formatValue(resultado)}`;
};
