import { useMemo, useState } from "react";
import { SIMULADORES, dinero, numero } from "./simuladoresAritmetica";
import "./SimuladorAritmetica.css";

/* ======================================================================
   Piezas visuales
   ====================================================================== */

function Campo({ campo, valor, onChange }) {
  return (
    <label className="simarit-campo">
      <span className="simarit-campo__label">{campo.label}</span>
      <span className="simarit-campo__control">
        {campo.prefijo && <em>{campo.prefijo}</em>}
        <input
          type="number"
          inputMode="decimal"
          value={valor}
          step={campo.step ?? "any"}
          onChange={(evento) => onChange(campo.k, evento.target.value)}
        />
        {campo.sufijo && <em>{campo.sufijo}</em>}
      </span>
    </label>
  );
}

function Barra({ segmentos }) {
  const visibles = (segmentos ?? []).filter(
    (segmento) => segmento.valor > 0,
  );
  const total = visibles.reduce((suma, segmento) => suma + segmento.valor, 0);
  if (!visibles.length || total <= 0) return null;

  return (
    <div className="simarit-barra">
      <div className="simarit-barra__pista">
        {visibles.map((segmento, i) => (
          <span
            key={`${segmento.label}-${i}`}
            className={`simarit-barra__seg simarit-barra__seg--${segmento.tono}`}
            style={{ width: `${(segmento.valor / total) * 100}%` }}
            title={`${segmento.label}: ${dinero(segmento.valor)}`}
          />
        ))}
      </div>
      <div className="simarit-barra__leyenda">
        {visibles.map((segmento, i) => (
          <span key={`${segmento.label}-${i}`}>
            <i
              className={`simarit-punto simarit-punto--${segmento.tono}`}
            />
            {segmento.label}: <strong>{dinero(segmento.valor)}</strong>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ======================================================================
   Componente principal
   ====================================================================== */

export default function SimuladorAritmetica({
  tipo,
  registro = SIMULADORES,
  eyebrow = "🧮 Aritmética interactiva",
}) {
  const config = registro[tipo] ?? null;
  const [valores, setValores] = useState(() =>
    config
      ? Object.fromEntries(config.campos.map((campo) => [campo.k, String(campo.def)]))
      : {},
  );

  const resultado = useMemo(() => {
    if (!config) return null;
    const numeros = Object.fromEntries(
      config.campos.map((campo) => [campo.k, numero(valores[campo.k])]),
    );
    return config.calcular(numeros);
  }, [config, valores]);

  if (!config || !resultado) return null;

  const cambiar = (k, v) => setValores((prev) => ({ ...prev, [k]: v }));

  const reiniciar = () => {
    setValores(
      Object.fromEntries(config.campos.map((campo) => [campo.k, String(campo.def)])),
    );
  };

  return (
    <section className="simarit">
      <header className="simarit__head">
        <div>
          <p className="simarit__eyebrow">{eyebrow}</p>
          <h3>{config.titulo}</h3>
          <p className="simarit__desc">{config.descripcion}</p>
        </div>
        <button type="button" className="simarit__reset" onClick={reiniciar}>
          ↺ Reiniciar
        </button>
      </header>

      <div className="simarit__formula">{config.formula}</div>

      <div className="simarit__grid">
        <div className="simarit__campos">
          <p className="simarit__titulo">Datos editables</p>
          {config.campos.map((campo) => (
            <Campo
              key={campo.k}
              campo={campo}
              valor={valores[campo.k] ?? ""}
              onChange={cambiar}
            />
          ))}
        </div>

        <div className="simarit__resultados">
          <p className="simarit__titulo">Resultados</p>
          <div className="simarit__tarjetas">
            {resultado.resultados.map((item) => (
              <div
                key={item.label}
                className={`simarit-tarjeta ${
                  item.tono ? `simarit-tarjeta--${item.tono}` : ""
                }`}
              >
                <span>{item.label}</span>
                <strong>{item.valor}</strong>
              </div>
            ))}
          </div>
          <Barra segmentos={resultado.barra} />
        </div>
      </div>

      {resultado.aviso && (
        <p className="simarit__aviso">⚠️ {resultado.aviso}</p>
      )}

      <div className="simarit__pasos">
        <p className="simarit__titulo">Paso a paso</p>
        <ol>
          {resultado.pasos.map((paso, i) => (
            <li key={i}>{paso}</li>
          ))}
        </ol>
      </div>
    </section>
  );
}
