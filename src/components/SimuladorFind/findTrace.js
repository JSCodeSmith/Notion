import { parse } from 'acorn';

export const escapeHtml = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const formatValue = (value) => {
  if (typeof value === 'string') return `"${value}"`;
  if (value === undefined) return 'undefined';
  if (value === null) return 'null';
  if (typeof value === 'number' && Number.isNaN(value)) return 'NaN';
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
};

const isFindCall = (node, arrayName) =>
  node?.type === 'CallExpression' &&
  node.callee?.type === 'MemberExpression' &&
  !node.callee.computed &&
  node.callee.property?.name === 'find' &&
  node.callee.object?.type === 'Identifier' &&
  node.callee.object.name === arrayName &&
  node.arguments.length > 0;

/**
 * Instrumenta las llamadas `emojis.find(callback)` para que el callback real
 * se ejecute una sola vez y podamos ver cada evaluación sin inventar nada.
 *
 * Devuelve el código transformado y las fuentes de los callbacks encontrados.
 */
export const instrumentFindCall = (source, arrayName = 'emojis') => {
  try {
    const ast = parse(source, {
      ecmaVersion: 'latest',
      sourceType: 'script',
      allowReturnOutsideFunction: true,
    });

    const callbacks = [];

    const visit = (node) => {
      if (!node || typeof node !== 'object') return;

      if (isFindCall(node, arrayName)) {
        const callback = node.arguments[0];
        if (callback) {
          callbacks.push({ start: callback.start, end: callback.end });
        }
      }

      for (const [key, child] of Object.entries(node)) {
        if (key === 'start' || key === 'end') continue;
        if (Array.isArray(child)) child.forEach(visit);
        else if (child && typeof child.type === 'string') visit(child);
      }
    };

    visit(ast);

    if (callbacks.length === 0) {
      return { code: source, instrumented: false, callbackSources: [] };
    }

    // De derecha a izquierda para no desplazar las posiciones ya reemplazadas.
    callbacks.sort((a, b) => b.start - a.start);

    let code = source;
    const callbackSources = [];

    for (const { start, end } of callbacks) {
      const callbackSource = source.slice(start, end);
      callbackSources.push(callbackSource);
      const wrapper = `(function (...__args) {
        const __result = (${callbackSource}).apply(this, __args);
        __findTrace(__args[0], __args[1], __result);
        return __result;
      })`;
      code = code.slice(0, start) + wrapper + code.slice(end);
    }

    return { code, instrumented: true, callbackSources };
  } catch {
    return { code: source, instrumented: false, callbackSources: [] };
  }
};
