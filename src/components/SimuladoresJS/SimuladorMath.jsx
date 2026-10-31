import { useMemo, useState } from "react";
import MarcoSimulador from "./MarcoSimulador";
import { fmt, toNumber, toNumberList } from "./simUtils";

const aGrados = (radianes) => (radianes * 180) / Math.PI;

const CAMPOS_X = [{ k: "x", label: "x", def: "-7.5" }];

/* Cada método compara el resultado con los redondeos vecinos. */
const redondeo = (nombre, fn, nota) => ({
  titulo: `Math.${nombre}()`,
  descripcion: `Calcula Math.${nombre}() y compáralo con ceil, floor, round y trunc para el mismo valor.`,
  campos: CAMPOS_X,
  calcular: ({ x }) => ({
    codigo: `Math.${nombre}(${fmt(x)})`,
    resultado: fmt(fn(x)),
    filas: [
      ["x", fmt(x)],
      ["Math.ceil(x)", fmt(Math.ceil(x))],
      ["Math.floor(x)", fmt(Math.floor(x))],
      ["Math.round(x)", fmt(Math.round(x))],
      ["Math.trunc(x)", fmt(Math.trunc(x))],
    ],
    nota,
  }),
});

const CONFIG = {
  "math-abs": {
    titulo: "Math.abs()",
    descripcion:
      "Devuelve el valor absoluto de un número: su distancia al cero, siempre sin signo.",
    campos: CAMPOS_X,
    calcular: ({ x }) => ({
      codigo: `Math.abs(${fmt(x)})`,
      resultado: fmt(Math.abs(x)),
      filas: [
        ["x", fmt(x)],
        ["-x", fmt(-x)],
        ["Math.abs(x)", fmt(Math.abs(x))],
        ["typeof resultado", '"number"'],
      ],
      nota: Number.isNaN(x)
        ? "El valor no se puede convertir a número, por eso devuelve NaN."
        : "El resultado nunca es negativo: -7.5 pasa a 7.5 y 7.5 sigue siendo 7.5.",
    }),
  },

  "math-ceil": redondeo(
    "ceil",
    Math.ceil,
    "Math.ceil() siempre redondea hacia arriba, incluso con números negativos: ceil(-4.2) es -4.",
  ),
  "math-floor": redondeo(
    "floor",
    Math.floor,
    "Math.floor() siempre redondea hacia abajo: floor(-4.2) es -5, no -4.",
  ),
  "math-round": redondeo(
    "round",
    Math.round,
    "Math.round() redondea al entero más cercano y los .5 hacia arriba: round(-4.5) es -4.",
  ),
  "math-trunc": redondeo(
    "trunc",
    Math.trunc,
    "Math.trunc() elimina la parte decimal sin redondear: trunc(-4.9) es -4.",
  ),

  "math-pow": {
    titulo: "Math.pow()",
    descripcion:
      "Eleva una base a un exponente. Es el equivalente a base ** exponente.",
    campos: [
      { k: "base", label: "base", def: "2" },
      { k: "exponente", label: "exponente", def: "10" },
    ],
    calcular: ({ base, exponente }) => ({
      codigo: `Math.pow(${fmt(base)}, ${fmt(exponente)})`,
      resultado: fmt(Math.pow(base, exponente)),
      filas: [
        ["base", fmt(base)],
        ["exponente", fmt(exponente)],
        ["Math.pow(base, exp)", fmt(Math.pow(base, exponente))],
        ["base ** exp", fmt(base ** exponente)],
      ],
      nota:
        "Un exponente negativo devuelve el inverso y un exponente fraccionario calcula raíces: Math.pow(9, 0.5) es 3.",
    }),
  },

  "math-sqrt": {
    titulo: "Math.sqrt()",
    descripcion:
      "Devuelve la raíz cuadrada no negativa de un número.",
    campos: [{ k: "x", label: "x", def: "81" }],
    calcular: ({ x }) => ({
      codigo: `Math.sqrt(${fmt(x)})`,
      resultado: fmt(Math.sqrt(x)),
      filas: [
        ["x", fmt(x)],
        ["Math.sqrt(x)", fmt(Math.sqrt(x))],
        ["resultado ** 2", fmt(Math.sqrt(x) ** 2)],
        ["Math.sqrt(-1)", "NaN"],
      ],
      nota:
        x < 0
          ? "Una raíz cuadrada de un número negativo no es real: JavaScript devuelve NaN."
          : "El resultado se puede comprobar elevándolo al cuadrado.",
    }),
  },

  "math-log": {
    titulo: "Math.log()",
    descripcion:
      "Devuelve el logaritmo natural (base e) de un número. Usa Math.log10() o Math.log2() para otras bases.",
    campos: [{ k: "x", label: "x", def: "100" }],
    calcular: ({ x }) => ({
      codigo: `Math.log(${fmt(x)})`,
      resultado: fmt(Math.log(x)),
      filas: [
        ["x", fmt(x)],
        ["Math.log(x) · base e", fmt(Math.log(x))],
        ["Math.log10(x)", fmt(Math.log10(x))],
        ["Math.log2(x)", fmt(Math.log2(x))],
      ],
      nota:
        x <= 0
          ? "Con 0 devuelve -Infinity y con negativos devuelve NaN."
          : "El logaritmo natural responde a la pregunta: ¿a qué exponente hay que elevar e para obtener x?",
    }),
  },

  "math-min": {
    titulo: "Math.min()",
    descripcion:
      "Devuelve el número más pequeño de los argumentos. Acepta una lista separada por comas.",
    campos: [
      { k: "lista", label: "números (separados por coma)", def: "8, -3, 15, 0.5", ancho: 260 },
    ],
    calcular: ({ lista }) => {
      const nums = toNumberList(lista);
      const resultado = Math.min(...nums);
      return {
        codigo: `Math.min(${nums.map((n) => fmt(n)).join(", ")})`,
        resultado: fmt(resultado),
        filas: [
          ["elementos", String(nums.length)],
          ["Math.min(...nums)", fmt(resultado)],
          ["algún NaN", String(nums.some(Number.isNaN))],
          ["lista vacía", fmt(Math.min())],
        ],
        lista: nums.map((n) => ({ main: fmt(n), sub: "número" })),
        nota:
          nums.length === 0
            ? "Sin argumentos devuelve Infinity."
            : "Si algún valor es NaN, el resultado completo es NaN.",
      };
    },
  },

  "math-max": {
    titulo: "Math.max()",
    descripcion:
      "Devuelve el número más grande de los argumentos. Acepta una lista separada por comas.",
    campos: [
      { k: "lista", label: "números (separados por coma)", def: "8, -3, 15, 0.5", ancho: 260 },
    ],
    calcular: ({ lista }) => {
      const nums = toNumberList(lista);
      const resultado = Math.max(...nums);
      return {
        codigo: `Math.max(${nums.map((n) => fmt(n)).join(", ")})`,
        resultado: fmt(resultado),
        filas: [
          ["elementos", String(nums.length)],
          ["Math.max(...nums)", fmt(resultado)],
          ["algún NaN", String(nums.some(Number.isNaN))],
          ["lista vacía", fmt(Math.max())],
        ],
        lista: nums.map((n) => ({ main: fmt(n), sub: "número" })),
        nota:
          nums.length === 0
            ? "Sin argumentos devuelve -Infinity."
            : "Ojo con los arrays: Math.max([1, 2]) devuelve NaN; hay que expandir con ...",
      };
    },
  },

  "math-random": {
    titulo: "Math.random()",
    descripcion:
      "Genera un número pseudoaleatorio entre 0 (incluido) y 1 (excluido). Combínalo con floor para obtener enteros.",
    aleatorio: true,
    campos: [
      { k: "min", label: "mínimo entero", def: "1", ancho: 110 },
      { k: "max", label: "máximo entero", def: "6", ancho: 110 },
    ],
    calcular: ({ min, max }, nonce) => {
      const a = Math.min(Math.trunc(toNumber(min)), Math.trunc(toNumber(max)));
      const b = Math.max(Math.trunc(toNumber(min)), Math.trunc(toNumber(max)));
      const r = Math.random();
      const entero = Math.floor(r * (b - a + 1)) + a;
      const muestras = Array.from({ length: 6 }, () => {
        const valor = Math.random();
        return { main: fmt(Math.floor(valor * (b - a + 1)) + a), sub: valor.toFixed(3) };
      });
      return {
        codigo: `const r = Math.random();\nconst dado = Math.floor(r * (${b} - ${a} + 1)) + ${a};`,
        resultado: fmt(entero),
        filas: [
          ["Math.random()", r.toFixed(6) + "…"],
          ["rango", `${a} … ${b}`],
          ["entero generado", fmt(entero)],
          ["muestra nº", String(nonce + 1)],
        ],
        lista: muestras,
        nota:
          "Math.random() nunca devuelve 1, así que floor(random() * n) produce enteros de 0 a n - 1.",
      };
    },
  },

  "math-sin": {
    titulo: "Math.sin()",
    descripcion:
      "Devuelve el seno de un ángulo medido en radianes. Convierte grados con (grados * Math.PI) / 180.",
    campos: [{ k: "grados", label: "ángulo (grados)", def: "30", ancho: 130 }],
    calcular: ({ grados }) => {
      const rad = (grados * Math.PI) / 180;
      return {
        codigo: `const rad = (${fmt(grados)} * Math.PI) / 180;\nMath.sin(rad);`,
        resultado: fmt(Math.sin(rad)),
        filas: [
          ["grados", fmt(grados)],
          ["radianes", fmt(rad)],
          ["Math.sin(rad)", fmt(Math.sin(rad))],
          ["Math.sin(Math.PI / 2)", fmt(Math.sin(Math.PI / 2))],
        ],
        nota:
          "El seno siempre está entre -1 y 1. Un giro completo son 2 * Math.PI radianes.",
      };
    },
  },

  "math-cos": {
    titulo: "Math.cos()",
    descripcion:
      "Devuelve el coseno de un ángulo medido en radianes. Convierte grados con (grados * Math.PI) / 180.",
    campos: [{ k: "grados", label: "ángulo (grados)", def: "60", ancho: 130 }],
    calcular: ({ grados }) => {
      const rad = (grados * Math.PI) / 180;
      return {
        codigo: `const rad = (${fmt(grados)} * Math.PI) / 180;\nMath.cos(rad);`,
        resultado: fmt(Math.cos(rad)),
        filas: [
          ["grados", fmt(grados)],
          ["radianes", fmt(rad)],
          ["Math.cos(rad)", fmt(Math.cos(rad))],
          ["Math.cos(0)", fmt(Math.cos(0))],
        ],
        nota:
          "cos(0) es 1 y cos(180°) es -1. El coseno también se mantiene entre -1 y 1.",
      };
    },
  },

  "math-atan2": {
    titulo: "Math.atan2()",
    descripcion:
      "Calcula el ángulo (en radianes) entre el eje X y el punto (x, y). Es más seguro que atan(x / y) porque conoce los signos.",
    campos: [
      { k: "y", label: "y", def: "1", ancho: 110 },
      { k: "x", label: "x", def: "1", ancho: 110 },
    ],
    calcular: ({ y, x }) => {
      const angulo = Math.atan2(y, x);
      const cuadrante =
        x === 0 && y === 0
          ? "origen"
          : x >= 0 && y >= 0
            ? "I"
            : x < 0 && y >= 0
              ? "II"
              : x < 0 && y < 0
                ? "III"
                : "IV";
      return {
        codigo: `Math.atan2(${fmt(y)}, ${fmt(x)})`,
        resultado: fmt(angulo),
        filas: [
          ["y", fmt(y)],
          ["x", fmt(x)],
          ["radianes", fmt(angulo)],
          ["grados", fmt(aGrados(angulo))],
          ["cuadrante", cuadrante],
        ],
        nota:
          "El resultado está entre -Math.PI y Math.PI. Se usa en juegos para apuntar hacia el cursor.",
      };
    },
  },

  "math-pi": {
    titulo: "Math.PI",
    descripcion:
      "Constante con el valor de π (≈ 3.14159). Se usa para círculos, ángulos y trigonometría.",
    campos: [{ k: "radio", label: "radio del círculo", def: "5", ancho: 130 }],
    calcular: ({ radio }) => {
      const r = toNumber(radio);
      return {
        codigo: `const circunferencia = 2 * Math.PI * ${fmt(r)};\nconst area = Math.PI * ${fmt(r)} ** 2;`,
        resultado: fmt(Math.PI),
        filas: [
          ["Math.PI", fmt(Math.PI)],
          ["radio", fmt(r)],
          ["circunferencia · 2πr", fmt(2 * Math.PI * r)],
          ["área · πr²", fmt(Math.PI * r ** 2)],
        ],
        nota:
          "Math.PI es una propiedad, no una función: Math.PI() lanza TypeError.",
      };
    },
  },
};

export default function SimuladorMath({ metodoId }) {
  const config = CONFIG[metodoId] ?? CONFIG["math-abs"];
  const [vals, setVals] = useState(() =>
    Object.fromEntries(config.campos.map((campo) => [campo.k, campo.def])),
  );
  const [nonce, setNonce] = useState(0);

  const data = useMemo(() => {
    try {
      return config.calcular(vals, nonce);
    } catch (error) {
      return {
        codigo: `// ${config.titulo}`,
        resultado: "NaN",
        filas: [],
        nota: `❌ ${error.message}`,
      };
    }
  }, [config, vals, nonce]);

  const cambiar = (k, valor) => setVals((prev) => ({ ...prev, [k]: valor }));
  const reiniciar = () => {
    setVals(Object.fromEntries(config.campos.map((campo) => [campo.k, campo.def])));
    setNonce(0);
  };

  return (
    <MarcoSimulador
      icon="🧮"
      titulo={config.titulo}
      descripcion={config.descripcion}
      codigo={data.codigo}
      nota={data.nota}
      consola={
        <>
          <div className="log-system">▶ Ejecutando {config.titulo}</div>
          {data.filas.map(([etiqueta, valor]) => (
            <div key={etiqueta} className="log-iteration">
              {etiqueta} → <strong>{valor}</strong>
            </div>
          ))}
          <div className="log-result">↩ Resultado: {data.resultado}</div>
        </>
      }
    >
      <div className="sjs-toolbar">
        {config.campos.map((campo) => (
          <label key={campo.k} className="sjs-field">
            <span>{campo.label}</span>
            <input
              className="sjs-input"
              style={{ width: campo.ancho ? `${campo.ancho}px` : "140px" }}
              value={vals[campo.k]}
              onChange={(evento) => cambiar(campo.k, evento.target.value)}
              inputMode="text"
              spellCheck={false}
            />
          </label>
        ))}
        <button type="button" className="sjs-btn sjs-btn--primary" onClick={reiniciar}>
          🔄 Reiniciar
        </button>
        {config.aleatorio && (
          <button
            type="button"
            className="sjs-btn"
            onClick={() => setNonce((n) => n + 1)}
          >
            🎲 Generar otra muestra
          </button>
        )}
      </div>

      <div className="sjs-grid-2">
        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🧾 Código</span>
          </div>
          <div className="sjs-output">{data.codigo}</div>
        </div>
        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>↩ Resultado</span>
            <span className="sjs-tag sjs-tag--ok">number</span>
          </div>
          <div className="sjs-output sjs-output--ok" style={{ fontSize: 22 }}>
            {data.resultado}
          </div>
        </div>
      </div>

      {data.filas.length > 0 && (
        <div className="sjs-card" style={{ marginTop: 14 }}>
          <div className="sjs-card__label">
            <span>🔍 Valores intermedios</span>
          </div>
          <table className="sjs-table">
            <tbody>
              {data.filas.map(([etiqueta, valor]) => (
                <tr key={etiqueta}>
                  <th style={{ width: "48%" }}>{etiqueta}</th>
                  <td>{valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.lista?.length > 0 && (
        <div className="sjs-card" style={{ marginTop: 14 }}>
          <div className="sjs-card__label">
            <span>🎲 Muestras</span>
            <span className="sjs-tag">{data.lista.length}</span>
          </div>
          <div className="sjs-grid-3">
            {data.lista.map((item, indice) => (
              <div key={indice} className="sjs-output" style={{ textAlign: "center" }}>
                <strong>{item.main}</strong>
                {item.sub && (
                  <div style={{ color: "#6f6f78", fontSize: 11 }}>{item.sub}</div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </MarcoSimulador>
  );
}
