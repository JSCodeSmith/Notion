import { useMemo, useState } from "react";
import CodeBlock from "../CodeBlock/CodeBlock";
import "../SimuladorFind/SimuladorFind.css";
import "../Simuladorstring/SimuladorString.css";

/* Laboratorio de la API Intl.
   Se centra en el método format() y permite cambiar locale, tipo y valor
   para comprobar cómo cambia el texto resultante. */

const LOCALES = ["es-ES", "es-PE", "en-US", "en-GB", "fr-FR", "de-DE", "ja-JP"];

const TIPOS = {
  numero: {
    label: "Número",
    valor: "1234567.89",
    ayuda: "new Intl.NumberFormat(locale)",
  },
  moneda: {
    label: "Moneda (EUR)",
    valor: "49.9",
    ayuda: 'new Intl.NumberFormat(locale, { style: "currency", currency: "EUR" })',
  },
  porcentaje: {
    label: "Porcentaje",
    valor: "0.256",
    ayuda: 'new Intl.NumberFormat(locale, { style: "percent" })',
  },
  fecha: {
    label: "Fecha larga",
    valor: "2026-10-08T18:30:00",
    ayuda: 'new Intl.DateTimeFormat(locale, { dateStyle: "long" })',
  },
  hora: {
    label: "Hora",
    valor: "2026-10-08T18:30:00",
    ayuda: 'new Intl.DateTimeFormat(locale, { timeStyle: "medium" })',
  },
  relativo: {
    label: "Tiempo relativo",
    valor: "-2",
    ayuda: 'new Intl.RelativeTimeFormat(locale, { numeric: "auto" })',
  },
  lista: {
    label: "Lista",
    valor: "HTML, CSS, JavaScript",
    ayuda: 'new Intl.ListFormat(locale, { type: "conjunction" })',
  },
  plural: {
    label: "Plural",
    valor: "3",
    ayuda: "new Intl.PluralRules(locale).select(numero)",
  },
};

const show = (valor) =>
  typeof valor === "string" ? JSON.stringify(valor) : String(valor);

function construirCodigo(tipo, locale, valor) {
  switch (tipo) {
    case "moneda":
      return `const formato = new Intl.NumberFormat("${locale}", {
  style: "currency",
  currency: "EUR",
});
const resultado = formato.format(${valor});`;
    case "porcentaje":
      return `const formato = new Intl.NumberFormat("${locale}", {
  style: "percent",
});
const resultado = formato.format(${valor});`;
    case "fecha":
      return `const formato = new Intl.DateTimeFormat("${locale}", {
  dateStyle: "long",
});
const resultado = formato.format(new Date("${valor}"));`;
    case "hora":
      return `const formato = new Intl.DateTimeFormat("${locale}", {
  timeStyle: "medium",
});
const resultado = formato.format(new Date("${valor}"));`;
    case "relativo":
      return `const formato = new Intl.RelativeTimeFormat("${locale}", {
  numeric: "auto",
});
const resultado = formato.format(${valor}, "day");`;
    case "lista":
      return `const formato = new Intl.ListFormat("${locale}", {
  style: "long",
  type: "conjunction",
});
const resultado = formato.format([${valor
        .split(",")
        .map((item) => JSON.stringify(item.trim()))
        .join(", ")}]);`;
    case "plural":
      return `const formato = new Intl.PluralRules("${locale}");
const resultado = formato.select(${valor});`;
    default:
      return `const formato = new Intl.NumberFormat("${locale}");
const resultado = formato.format(${valor});`;
  }
}

function ejecutar(tipo, locale, valor) {
  try {
    if (tipo === "moneda") {
      return new Intl.NumberFormat(locale, {
        style: "currency",
        currency: "EUR",
      }).format(Number(valor));
    }
    if (tipo === "porcentaje") {
      return new Intl.NumberFormat(locale, { style: "percent" }).format(
        Number(valor),
      );
    }
    if (tipo === "fecha") {
      return new Intl.DateTimeFormat(locale, {
        dateStyle: "long",
      }).format(new Date(valor));
    }
    if (tipo === "hora") {
      return new Intl.DateTimeFormat(locale, {
        timeStyle: "medium",
      }).format(new Date(valor));
    }
    if (tipo === "relativo") {
      return new Intl.RelativeTimeFormat(locale, {
        numeric: "auto",
      }).format(Number(valor), "day");
    }
    if (tipo === "lista") {
      return new Intl.ListFormat(locale, {
        style: "long",
        type: "conjunction",
      }).format(valor.split(",").map((item) => item.trim()).filter(Boolean));
    }
    if (tipo === "plural") {
      return new Intl.PluralRules(locale).select(Number(valor));
    }
    return new Intl.NumberFormat(locale).format(Number(valor));
  } catch (error) {
    return `⚠️ ${error.name}: ${error.message}`;
  }
}

export default function SimuladorIntl({ metodoId = "intl-format" }) {
  const inicial = TIPOS[tipoInicial(metodoId)] ? tipoInicial(metodoId) : "numero";
  const [tipo, setTipo] = useState(inicial);
  const [locale, setLocale] = useState("es-ES");
  const [valor, setValor] = useState(TIPOS[inicial].valor);

  const config = TIPOS[tipo];
  const resultado = useMemo(
    () => ejecutar(tipo, locale, valor),
    [tipo, locale, valor],
  );
  const codigo = useMemo(
    () => construirCodigo(tipo, locale, valor),
    [tipo, locale, valor],
  );

  const cambiarTipo = (nuevo) => {
    setTipo(nuevo);
    setValor(TIPOS[nuevo].valor);
  };

  return (
    <div className="sim-container">
      <div className="sim-header">
        <h3>
          🧪 Laboratorio interactivo: <code>Intl · format()</code>
        </h3>
      </div>

      <div className="sim-editor">
        <div className="sim-editor-header">
          Cambia el formateador, el idioma y el valor. El resultado se genera
          con la API nativa del navegador.
        </div>

        <div style={{ marginBottom: "16px" }}>
          <CodeBlock code={codigo} />
        </div>

        <div
          className="sim-controls"
          style={{ flexWrap: "wrap", alignItems: "center" }}
        >
          <label className="sim-field-label">
            Tipo
            <select
              className="sim-input"
              value={tipo}
              onChange={(event) => cambiarTipo(event.target.value)}
              style={{ width: "170px" }}
            >
              {Object.entries(TIPOS).map(([clave, item]) => (
                <option key={clave} value={clave}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>

          <label className="sim-field-label">
            Locale
            <select
              className="sim-input"
              value={locale}
              onChange={(event) => setLocale(event.target.value)}
              style={{ width: "110px" }}
            >
              {LOCALES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="sim-field-label">
            Valor
            <input
              type="text"
              className="sim-input"
              value={valor}
              onChange={(event) => setValor(event.target.value)}
              style={{ width: "220px" }}
              spellCheck={false}
            />
          </label>
        </div>

        <p style={{ margin: "12px 0 0", color: "#9b9b9b", fontSize: "12px" }}>
          {config.ayuda}
        </p>
      </div>

      <div className="sim-resultado-final">
        <span className="sim-resultado-label">↩ Resultado con format()</span>
        <code>{resultado}</code>
      </div>

      <div className="sim-console">
        <div className="sim-console-header">Detalle de la ejecución</div>
        <div className="sim-console-body">
          <div className="log-system">
            Formateador: <strong>{config.label}</strong> · locale: {locale}
          </div>
          <div className="log-system">
            Valor recibido: {show(valor)} · tipo del dato:{" "}
            {tipo === "fecha" || tipo === "hora" ? "Date" : "Number"}
          </div>
          <div className="log-success">Resultado devuelto: {resultado}</div>
        </div>
      </div>
    </div>
  );
}

function tipoInicial(metodoId) {
  if (metodoId === "intl-currency") return "moneda";
  if (metodoId === "intl-percent") return "porcentaje";
  if (metodoId === "intl-datetimeformat") return "fecha";
  if (metodoId === "intl-relativetimeformat") return "relativo";
  if (metodoId === "intl-listformat") return "lista";
  if (metodoId === "intl-pluralrules") return "plural";
  return "numero";
}
