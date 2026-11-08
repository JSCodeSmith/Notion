/* Instrumentación ligera para el depurador paso a paso.
   Inserta llamadas a `__trace(línea, snapshot)` antes de cada sentencia.
   El snapshot se construye con los nombres declarados en el programa; cada
   acceso va dentro de try/catch para que las variables fuera de alcance o en
   zona muerta temporal (TDZ) simplemente no aparezcan. */

import { parse } from "acorn";

const MAX_NOMBRES = 80;
const SKIP = new Set([
  "EmptyStatement",
  "FunctionDeclaration",
  "ClassDeclaration",
  "ImportDeclaration",
  "ExportNamedDeclaration",
  "ExportDefaultDeclaration",
  "ExportAllDeclaration",
]);

const esSentencia = (nodo) =>
  Boolean(nodo) &&
  (nodo.type === "VariableDeclaration" || nodo.type.endsWith("Statement"));

function recolectarPatron(patron, nombres) {
  if (!patron) return;
  switch (patron.type) {
    case "Identifier":
      if (patron.name !== "__trace") nombres.add(patron.name);
      return;
    case "RestElement":
      recolectarPatron(patron.argument, nombres);
      return;
    case "AssignmentPattern":
      recolectarPatron(patron.left, nombres);
      return;
    case "ArrayPattern":
      for (const elemento of patron.elements) recolectarPatron(elemento, nombres);
      return;
    case "ObjectPattern":
      for (const propiedad of patron.properties) {
        if (propiedad.type === "RestElement") recolectarPatron(propiedad, nombres);
        else recolectarPatron(propiedad.value, nombres);
      }
      return;
    default:
      return;
  }
}

function recorrer(nodo, visitar, padre = null) {
  if (!nodo || typeof nodo.type !== "string") return;
  visitar(nodo, padre);
  for (const clave of Object.keys(nodo)) {
    if (clave === "loc" || clave === "start" || clave === "end") continue;
    const valor = nodo[clave];
    if (Array.isArray(valor)) {
      for (const hijo of valor) recorrer(hijo, visitar, nodo);
    } else if (valor && typeof valor.type === "string") {
      recorrer(valor, visitar, nodo);
    }
  }
}

function construirSnapshot(nombres) {
  const accesos = [];
  let cuenta = 0;
  for (const nombre of nombres) {
    if (cuenta >= MAX_NOMBRES) break;
    cuenta += 1;
    accesos.push(
      `try { s[${JSON.stringify(nombre)}] = ${nombre}; } catch (__e) {}`,
    );
  }
  accesos.push('try { s["this"] = this; } catch (__e) {}');
  return `function () { var s = {}; ${accesos.join(" ")} return s; }`;
}

function posicionTrasDirectivas(body) {
  if (!body) return null;
  let posicion = body.start + 1;
  for (const sentencia of body.body ?? []) {
    if (sentencia.type === "ExpressionStatement" && sentencia.directive) {
      posicion = sentencia.end;
    } else {
      break;
    }
  }
  return posicion;
}

export function instrumentar(codigo) {
  let ast;
  try {
    ast = parse(String(codigo ?? ""), {
      ecmaVersion: "latest",
      sourceType: "script",
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
      allowHashBang: true,
      locations: true,
    });
  } catch (error) {
    return {
      ok: false,
      error:
        error?.name === "SyntaxError"
          ? `SyntaxError: ${error.message.replace(/\s*\(\d+:\d+\)$/, "")}`
          : String(error?.message ?? error),
      linea:
        Number.isFinite(error?.loc?.line) && error.loc.line > 0
          ? error.loc.line
          : null,
    };
  }

  const nombres = new Set();
  recorrer(ast, (nodo) => {
    if (nodo.type === "VariableDeclarator") recolectarPatron(nodo.id, nombres);
    if (
      nodo.type === "FunctionDeclaration" ||
      nodo.type === "FunctionExpression" ||
      nodo.type === "ArrowFunctionExpression"
    ) {
      for (const parametro of nodo.params ?? []) recolectarPatron(parametro, nombres);
      if (nodo.id?.name) nombres.add(nodo.id.name);
    }
    if (nodo.type === "CatchClause") recolectarPatron(nodo.param, nombres);
  });

  const snapshot = construirSnapshot(nombres);
  const edits = [];
  const añadir = (pos, texto, orden = 0) => edits.push({ pos, texto, orden });
  const traza = (linea, pos, orden = 1) =>
    añadir(pos, `__trace(${Number.isFinite(linea) ? linea : 1}, ${snapshot});\n`, orden);

  const envolver = (cuerpo) => {
    if (!cuerpo || cuerpo.type === "BlockStatement") return;
    añadir(cuerpo.start, "{ ", 0);
    traza(cuerpo.loc?.start?.line, cuerpo.start, 1);
    añadir(cuerpo.end, " }", 0);
  };

  recorrer(ast, (nodo, padre) => {
    /* Cuerpos de función: captura parámetros y variables locales. */
    if (
      (nodo.type === "FunctionDeclaration" ||
        nodo.type === "FunctionExpression" ||
        nodo.type === "ArrowFunctionExpression") &&
      nodo.body
    ) {
      if (nodo.body.type === "BlockStatement") {
        const pos = posicionTrasDirectivas(nodo.body);
        if (pos !== null) traza(nodo.body.loc?.start?.line, pos, 1);
      } else {
        /* Cuerpo de expresión: `(x) => x + 1` pasa a
           `(x) => { ... return x + 1; }`. Si la expresión venía entre
           paréntesis —por ejemplo un objeto literal `({ ... })`— los
           incluimos en el bloque para no dejar paréntesis sueltos.
           `nodo.end` marca el final real del cuerpo (incluidos los
           paréntesis de cierre y cualquier comentario intermedio), así que
           lo usamos como cierre en lugar de adivinarlo con un escaneo. */
        let inicio = nodo.body.start;
        let fin = nodo.body.end;
        const conParentesis = nodo.end > nodo.body.end;
        let abren = 0;
        let cursor = inicio;
        while (cursor > 0) {
          const anterior = codigo[cursor - 1];
          if (/\s/.test(anterior)) {
            cursor -= 1;
            continue;
          }
          if (anterior === "(") {
            abren += 1;
            cursor -= 1;
            continue;
          }
          break;
        }
        if (conParentesis) {
          if (abren > 0) {
            inicio = cursor;
            fin = nodo.end;
          } else {
            /* Hay paréntesis de cierre pero no encontramos los de apertura
               (por ejemplo, un comentario justo después del paréntesis).
               Mejor dejar la expresión intacta que generar código inválido. */
            return;
          }
        }
        añadir(inicio, "{ ", 0);
        traza(nodo.body.loc?.start?.line, inicio, 1);
        añadir(inicio, "return ", 2);
        añadir(fin, "; }", 0);
      }
    }

    /* Sentencias de control con un solo cuerpo: lo convertimos en bloque. */
    if (
      nodo.type === "IfStatement" ||
      nodo.type === "ForStatement" ||
      nodo.type === "ForInStatement" ||
      nodo.type === "ForOfStatement" ||
      nodo.type === "WhileStatement" ||
      nodo.type === "DoWhileStatement" ||
      nodo.type === "WithStatement" ||
      nodo.type === "LabeledStatement"
    ) {
      envolver(nodo.body);
    }
    if (nodo.type === "IfStatement") envolver(nodo.alternate);

    /* Punto de parada antes de cada sentencia ejecutable. */
    if (esSentencia(nodo) && !SKIP.has(nodo.type)) {
      const padreTipo = padre?.type;
      const dentroDePrograma =
        padreTipo === "Program" ||
        padreTipo === "BlockStatement" ||
        padreTipo === "SwitchCase" ||
        padreTipo === "StaticBlock";
      if (dentroDePrograma && !(nodo.type === "ExpressionStatement" && nodo.directive)) {
        traza(nodo.loc?.start?.line, nodo.start, 1);
      }
    }
  });

  edits.sort((a, b) => a.pos - b.pos || a.orden - b.orden);

  let salida = "";
  let cursor = 0;
  for (const edit of edits) {
    const pos = Math.max(cursor, Math.min(edit.pos, codigo.length));
    if (pos < cursor) continue;
    salida += codigo.slice(cursor, pos);
    salida += edit.texto;
    cursor = pos;
  }
  salida += codigo.slice(cursor);

  return { ok: true, codigo: salida };
}
