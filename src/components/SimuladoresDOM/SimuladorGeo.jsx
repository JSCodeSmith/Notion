import { useEffect, useRef, useState } from "react";
import MarcoSimulador from "../SimuladoresJS/MarcoSimulador";
import "../SimuladoresJS/SimuladoresJS.css";
import "./SimuladoresDOM.css";

const BASE = { latitude: -12.0464, longitude: -77.0428 };
const OPCIONES = {
  enableHighAccuracy: true,
  timeout: 8000,
  maximumAge: 0,
};

export default function SimuladorGeo({ metodoId }) {
  const watchRef = useRef(null);
  const intervalRef = useRef(null);
  const countRef = useRef(0);
  const [coords, setCoords] = useState(null);
  const [origen, setOrigen] = useState(null);
  const [estado, setEstado] = useState("idle");
  const [error, setError] = useState(null);
  const [watchId, setWatchId] = useState(null);
  const [count, setCount] = useState(0);
  const [log, setLog] = useState([]);
  const [salida, setSalida] = useState(null);

  const pushLog = (tipo, texto) =>
    setLog((prev) => [...prev.slice(-30), { tipo, texto, id: Date.now() + Math.random() }]);

  const aplicar = (position, etiqueta) => {
    const { latitude, longitude, accuracy, altitude, heading, speed } = position.coords;
    setCoords({
      latitude,
      longitude,
      accuracy,
      altitude,
      heading,
      speed,
      timestamp: position.timestamp,
    });
    setOrigen(etiqueta);
    setEstado(etiqueta);
    pushLog(
      "ok",
      `${etiqueta}: ${latitude.toFixed(5)}, ${longitude.toFixed(5)} · precisión ±${Math.round(accuracy ?? 0)} m`,
    );
  };

  const posicionSimulada = (paso = 0) => ({
    coords: {
      latitude: BASE.latitude + Math.sin(paso / 3) * 0.0012,
      longitude: BASE.longitude + Math.cos(paso / 4) * 0.0012,
      accuracy: 8 + Math.random() * 18,
      altitude: 154,
      heading: (paso * 37) % 360,
      speed: 1.2,
    },
    timestamp: Date.now(),
  });

  const usarSimulado = (motivo) => {
    setError(motivo);
    const position = posicionSimulada(0);
    aplicar(position, "simulado");
    setSalida({
      texto: `📍 Posición simulada (permiso no disponible)\n\n${motivo}\n\nlatitude: ${position.coords.latitude}\nlongitude: ${position.coords.longitude}\naccuracy: ${Math.round(position.coords.accuracy)} m`,
      tipo: "warn",
    });
  };

  const obtener = () => {
    setError(null);
    setEstado("loading");
    setSalida(null);

    if (!navigator.geolocation) {
      usarSimulado("navigator.geolocation no está disponible en este navegador.");
      return;
    }

    pushLog("info", "getCurrentPosition() → solicitando ubicación...");
    navigator.geolocation.getCurrentPosition(
      (position) => {
        aplicar(position, "real");
        setSalida({
          texto: `navigator.geolocation.getCurrentPosition()\n\nlatitude: ${position.coords.latitude}\nlongitude: ${position.coords.longitude}\naccuracy: ${position.coords.accuracy} m\ntimestamp: ${position.timestamp}`,
          tipo: "ok",
        });
      },
      (err) => {
        usarSimulado(`getCurrentPosition() falló → ${err.code}: ${err.message}`);
      },
      OPCIONES,
    );
  };

  const detenerSeguimiento = () => {
    if (watchRef.current != null && navigator.geolocation?.clearWatch) {
      navigator.geolocation.clearWatch(watchRef.current);
    }
    watchRef.current = null;
    setWatchId(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const iniciarIntervalo = () => {
    if (intervalRef.current) return;
    intervalRef.current = setInterval(() => {
      countRef.current += 1;
      setCount(countRef.current);
      aplicar(posicionSimulada(countRef.current), "seguimiento simulado");
    }, 2000);
  };

  const seguir = () => {
    setError(null);
    setSalida(null);
    setEstado("watch");
    detenerSeguimiento();
    countRef.current = 0;
    setCount(0);

    if (!navigator.geolocation) {
      pushLog("warn", "watchPosition() no disponible: iniciando seguimiento simulado");
      iniciarIntervalo();
      return;
    }

    pushLog("info", "watchPosition() → iniciando seguimiento...");
    let id;
    try {
      id = navigator.geolocation.watchPosition(
        (position) => {
          countRef.current += 1;
          setCount(countRef.current);
          aplicar(position, "seguimiento real");
        },
        (err) => {
          if (watchRef.current != null && navigator.geolocation?.clearWatch) {
            navigator.geolocation.clearWatch(watchRef.current);
          }
          watchRef.current = null;
          setWatchId(null);
          setError(`watchPosition() falló → ${err.code}: ${err.message}`);
          pushLog("warn", "Permiso denegado o GPS no disponible: seguimiento simulado activo");
          iniciarIntervalo();
        },
        OPCIONES,
      );
    } catch (err) {
      setError(`watchPosition() lanzó ${err.name}: ${err.message}`);
      pushLog("warn", "watchPosition() falló de inmediato: seguimiento simulado activo");
      iniciarIntervalo();
      return;
    }
    watchRef.current = id;
    setWatchId(id);
  };

  const detener = () => {
    const id = watchId;
    detenerSeguimiento();
    setEstado("cleared");
    setSalida({
      texto: `clearWatch(${id ?? "id"})\n\nEl seguimiento se detuvo. Las actualizaciones ya no llegan.`,
      tipo: "ok",
    });
    if (id != null) pushLog("ok", `clearWatch(${id}) ejecutado`);
  };

  useEffect(() => {
    return () => {
      if (watchRef.current != null && navigator.geolocation?.clearWatch) {
        navigator.geolocation.clearWatch(watchRef.current);
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const codigo =
    metodoId === "geo-watchposition"
      ? `const id = navigator.geolocation.watchPosition(\n  (posicion) => console.log(posicion.coords),\n  (error) => console.error(error.message),\n  { enableHighAccuracy: true }\n);`
      : metodoId === "geo-clearwatch"
        ? `const id = navigator.geolocation.watchPosition(callback, errorCallback);\n\n// Cuando ya no necesitas seguir al usuario:\nnavigator.geolocation.clearWatch(id);`
        : metodoId === "geo-navigator"
          ? `if ("geolocation" in navigator) {\n  console.log("Geolocalización disponible");\n} else {\n  console.log("No disponible");\n}`
          : `navigator.geolocation.getCurrentPosition(\n  (posicion) => console.log(posicion.coords),\n  (error) => console.error(error.message),\n  { enableHighAccuracy: true, timeout: 8000 }\n);`;

  const consola = log.length ? (
    log.map((linea) => (
      <div key={linea.id} className={`sjs-log__line sjs-log__line--${linea.tipo}`}>
        {linea.texto}
      </div>
    ))
  ) : (
    <span className="log-system">Solicita una ubicación o inicia el seguimiento...</span>
  );

  const precision = coords?.accuracy ? `±${Math.round(coords.accuracy)} m` : "—";
  const hora = coords?.timestamp
    ? new Date(coords.timestamp).toLocaleTimeString("es-ES")
    : "—";

  return (
    <MarcoSimulador
      icon="📍"
      titulo="Geolocation API"
      descripcion="Solicita la ubicación real del navegador. Si el permiso se deniega, se usa una posición simulada para que puedas practicar getCurrentPosition, watchPosition y clearWatch."
      codigo={codigo}
      consola={consola}
      nota="⚠️ La geolocalización solo funciona en contextos seguros (HTTPS o localhost) y siempre requiere permiso del usuario. Maneja los errores y explica al usuario qué estás haciendo."
    >
      <div className="dom-lab">
        <div>
          <div className="sjs-card__label">
            <span>🗺️ Posición</span>
            <span
              className={`sjs-tag ${
                estado === "real" || estado === "seguimiento real"
                  ? "sjs-tag--ok"
                  : estado === "loading"
                    ? "sjs-tag--warn"
                    : "sjs-tag--info"
              }`}
            >
              {estado === "idle" ? "sin datos" : estado}
            </span>
          </div>

          <div className="geo-coords">
            <div className="geo-card">
              <span>latitude</span>
              <strong>{coords ? coords.latitude.toFixed(6) : "—"}</strong>
            </div>
            <div className="geo-card">
              <span>longitude</span>
              <strong>{coords ? coords.longitude.toFixed(6) : "—"}</strong>
            </div>
            <div className="geo-card">
              <span>accuracy</span>
              <strong>{precision}</strong>
            </div>
            <div className="geo-card">
              <span>timestamp</span>
              <strong>{hora}</strong>
            </div>
          </div>

          <div className="geo-mapa">
            <div className="geo-punto" />
            <span className="geo-mapa__label">
              {origen ? `origen: ${origen}` : "esperando ubicación..."}
            </span>
          </div>

          {error && (
            <div className="sjs-output sjs-output--warn" style={{ marginTop: 12 }}>
              {error}
            </div>
          )}

          <div className="sjs-tags">
            <span className="sjs-tag">watchPosition id: {watchId ?? "—"}</span>
            <span className="sjs-tag">actualizaciones: {count}</span>
          </div>
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🎛️ Acciones</span>
            <span className="sjs-tag">geolocation</span>
          </div>

          <div className="sjs-actions" style={{ flexDirection: "column", alignItems: "stretch" }}>
            <button
              type="button"
              className={`sjs-btn${metodoId === "geo-getcurrentposition" || metodoId === "geo-navigator" ? " sjs-btn--primary" : ""}`}
              onClick={obtener}
            >
              📌 getCurrentPosition()
            </button>
            <button
              type="button"
              className={`sjs-btn${metodoId === "geo-watchposition" ? " sjs-btn--primary" : ""}`}
              onClick={seguir}
            >
              🛰️ watchPosition()
            </button>
            <button
              type="button"
              className={`sjs-btn${metodoId === "geo-clearwatch" ? " sjs-btn--primary" : ""}`}
              onClick={detener}
            >
              🧹 clearWatch()
            </button>
          </div>

          <div className="sjs-note" style={{ marginTop: 14 }}>
            💡 <code>getCurrentPosition()</code> pide una posición puntual.{" "}
            <code>watchPosition()</code> devuelve un <code>id</code> y sigue
            enviando actualizaciones hasta que llames a{" "}
            <code>clearWatch(id)</code>.
          </div>
        </div>
      </div>

      {salida && (
        <div className={`sjs-output sjs-output--${salida.tipo}`} style={{ marginTop: 14 }}>
          {salida.texto}
        </div>
      )}
    </MarcoSimulador>
  );
}
