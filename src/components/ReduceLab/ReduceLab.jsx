import { useEffect, useMemo, useState } from "react";
import "./ReduceLab.css";
import { MODOS, MISIONES, TOTAL_MISIONES } from "./misiones.js";
import {
  calcularMedallas,
  cargarProgreso,
  ejecutar,
  formatear,
  guardarProgreso,
  mismoResultado,
  PROGRESO_INICIAL,
  rangoDe,
  trazar,
} from "./motor.js";
import PanelMisiones from "./PanelMisiones.jsx";
import PanelProgreso from "./PanelProgreso.jsx";
import SimuladorReduce from "./SimuladorReduce.jsx";

const TABS = [
  { id: "misiones", label: "🎯 Misiones" },
  { id: "simulador", label: "🧪 Simulador" },
  { id: "progreso", label: "🏆 Progreso" },
];

const primerModo = (xp) =>
  MODOS.find((modo) => xp >= modo.xpDesbloqueo)?.id ?? MODOS[0].id;

function calcularXp(mision, pistas, solucionVista, experto) {
  const penalizacion = Math.min(pistas * 20, Math.floor(mision.xp * 0.6));
  let base = Math.max(mision.xp - penalizacion, Math.round(mision.xp * 0.3));
  if (solucionVista) base = Math.round(base * 0.25);
  if (experto) base = Math.round(base * 1.5);
  return Math.max(base, 10);
}

export default function ReduceLab() {
  const [progreso, setProgreso] = useState(cargarProgreso);
  const [tab, setTab] = useState("misiones");
  const [modoId, setModoId] = useState(() => primerModo(cargarProgreso().xp));
  const [misionId, setMisionId] = useState(null);

  useEffect(() => {
    guardarProgreso(progreso);
  }, [progreso]);

  const modo = MODOS.find((item) => item.id === modoId) ?? MODOS[0];
  const mision = misionId ? (MISIONES[misionId] ?? null) : null;
  const rango = rangoDe(progreso.xp);
  const medallas = useMemo(() => calcularMedallas(progreso, MODOS), [progreso]);
  const resueltas = Object.keys(progreso.resueltas).length;
  const siguienteXp = rango.siguiente?.xp ?? rango.actual.xp;
  const tramo = Math.max(1, siguienteXp - rango.actual.xp);
  const avance = rango.siguiente
    ? Math.min(100, Math.round(((progreso.xp - rango.actual.xp) / tramo) * 100))
    : 100;

  const seleccionarModo = (id) => {
    setModoId(id);
    setMisionId(null);
  };

  const registrarFallo = () => {
    setProgreso((prev) => ({ ...prev, racha: 0 }));
  };

  const resolver = (misionActiva, codigo, { pistas, solucionVista, intentos }) => {
    let resultado;
    try {
      resultado = ejecutar(
        codigo,
        misionActiva.datos,
        misionActiva.inicial,
        misionActiva.usarInicial,
      );
    } catch (error) {
      registrarFallo();
      return { ok: false, error: error.message };
    }

    if (!mismoResultado(resultado, misionActiva.esperado)) {
      registrarFallo();
      return {
        ok: false,
        error: "Tu reducer devolvió un valor distinto al esperado.",
        detalle: `obtenido: ${formatear(resultado)} · esperado: ${formatear(misionActiva.esperado)}`,
      };
    }

    const yaResuelta = Boolean(progreso.resueltas[misionActiva.id]);
    const xpGanado = yaResuelta
      ? 0
      : calcularXp(misionActiva, pistas, solucionVista, progreso.experto);

    let traza = null;
    try {
      traza = trazar(
        codigo,
        misionActiva.datos,
        misionActiva.inicial,
        misionActiva.usarInicial,
      );
    } catch {
      traza = null;
    }

    setProgreso((prev) => {
      const previa = prev.resueltas[misionActiva.id];
      const nuevaRacha = prev.racha + 1;
      return {
        ...prev,
        xp: prev.xp + (previa ? 0 : xpGanado),
        racha: nuevaRacha,
        mejorRacha: Math.max(prev.mejorRacha, nuevaRacha),
        resueltas: {
          ...prev.resueltas,
          [misionActiva.id]: {
            xp: (previa?.xp ?? 0) + (previa ? 0 : xpGanado),
            intentos: (previa?.intentos ?? 0) + intentos + 1,
            pistas: Math.max(previa?.pistas ?? 0, pistas),
            limpia: Boolean(previa?.limpia) || (pistas === 0 && !solucionVista),
            fecha: new Date().toISOString(),
          },
        },
      };
    });

    return {
      ok: true,
      yaResuelta,
      xpGanado,
      traza,
      mensaje: yaResuelta
        ? "Repasar también cuenta: la misión ya estaba resuelta, así que no se suma XP nuevo."
        : solucionVista
          ? "Reductor correcto. Como viste la solución, el XP se redujo al 25%."
          : pistas > 0
            ? `Reductor correcto con ${pistas} pista(s): cada pista restó 20 XP.`
            : "Reductor impecable, sin pistas. XP completo.",
    };
  };

  const verSolucion = (id) => {
    setProgreso((prev) =>
      prev.solucionesVistas.includes(id)
        ? prev
        : { ...prev, solucionesVistas: [...prev.solucionesVistas, id] },
    );
  };

  const siguienteMision = (misionActiva) => {
    const modoActual = MODOS.find((item) => item.id === misionActiva.modoId);
    if (!modoActual) return;
    const indice = modoActual.misiones.findIndex((item) => item.id === misionActiva.id);
    const siguiente = modoActual.misiones[indice + 1];
    if (siguiente) {
      setMisionId(siguiente.id);
      return;
    }
    const siguienteModo = MODOS.find(
      (item) =>
        item.id !== modoActual.id &&
        progreso.xp >= item.xpDesbloqueo &&
        !item.misiones.every((m) => progreso.resueltas[m.id]),
    );
    if (siguienteModo) {
      setModoId(siguienteModo.id);
      setMisionId(siguienteModo.misiones[0].id);
      return;
    }
    setTab("progreso");
  };

  const alternarExperto = () => {
    setProgreso((prev) => ({ ...prev, experto: !prev.experto }));
  };

  const reiniciar = () => {
    setProgreso({ ...PROGRESO_INICIAL });
    setModoId(MODOS[0].id);
    setMisionId(null);
    setTab("misiones");
  };

  return (
    <section className="rl-app">
      <div className="rl-glow" aria-hidden="true" />

      <header className="rl-top">
        <div className="rl-brand">
          <span className="rl-brand__mark">⬢</span>
          <div>
            <h2>
              REDUCE <span>LAB</span>
            </h2>
            <p>Advanced Interactive Programming Game</p>
          </div>
          <span className="rl-version">v1.0</span>
        </div>

        <div className="rl-account">
          <div className="rl-account__rank" title={rango.actual.nombre}>
            <span>{rango.actual.icono}</span>
            <div>
              <strong>{rango.actual.nombre}</strong>
              <small>
                {resueltas}/{TOTAL_MISIONES} misiones
              </small>
            </div>
          </div>
          <div className="rl-account__xp">
            <span>{progreso.xp} XP</span>
            <div className="rl-account__bar">
              <span style={{ width: `${avance}%` }} />
            </div>
          </div>
        </div>
      </header>

      <nav className="rl-tabs" aria-label="Secciones de REDUCE LAB">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`rl-tab ${tab === item.id ? "is-active" : ""}`}
            onClick={() => setTab(item.id)}
            aria-pressed={tab === item.id}
          >
            {item.label}
            {item.id === "misiones" && <span className="rl-tab__dot">{TOTAL_MISIONES}</span>}
          </button>
        ))}
      </nav>

      <div className="rl-content">
        {tab === "misiones" && (
          <PanelMisiones
            key={mision?.id ?? modo.id}
            modos={MODOS}
            modo={modo}
            mision={mision}
            progreso={progreso}
            onModo={seleccionarModo}
            onMision={setMisionId}
            onResolver={resolver}
            onVerSolucion={verSolucion}
            onSiguiente={siguienteMision}
          />
        )}

        {tab === "simulador" && <SimuladorReduce />}

        {tab === "progreso" && (
          <PanelProgreso
            progreso={progreso}
            modos={MODOS}
            medallas={medallas}
            rango={rango}
            totalMisiones={TOTAL_MISIONES}
            onExperto={alternarExperto}
            onReiniciar={reiniciar}
          />
        )}
      </div>

      <footer className="rl-foot">
        <span>⬢ reduce() · un acumulador, infinitas transformaciones</span>
        <span className="rl-mono">progreso guardado en este navegador</span>
      </footer>
    </section>
  );
}
