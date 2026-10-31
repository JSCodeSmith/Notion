import { useMemo, useState } from "react";
import MarcoSimulador from "./MarcoSimulador";

const PREFIJO = "aula:";
const CLAVES_DEMO = {
  tema: "oscuro",
  usuario: '{"nombre":"Ana","edad":25}',
  idioma: "es",
};

const leerEntradas = (store) => {
  const entradas = [];
  try {
    for (let i = 0; i < store.length; i += 1) {
      const clave = store.key(i);
      if (clave && clave.startsWith(PREFIJO)) {
        entradas.push({ clave, valor: store.getItem(clave) });
      }
    }
  } catch {
    return [];
  }
  return entradas;
};

export default function SimuladorStorage({ metodoId }) {
  const esSession = metodoId === "storage-sessionstorage";
  const [tipo, setTipo] = useState(esSession ? "session" : "local");
  const [clave, setClave] = useState("tema");
  const [valor, setValor] = useState('"oscuro"');
  const [indice, setIndice] = useState("0");
  const [log, setLog] = useState([]);

  const store = useMemo(() => {
    if (typeof window === "undefined") return null;
    return tipo === "session" ? window.sessionStorage : window.localStorage;
  }, [tipo]);

  const [entradas, setEntradas] = useState(() => {
    if (typeof window === "undefined") return [];
    return leerEntradas(tipo === "session" ? window.sessionStorage : window.localStorage);
  });
  const nombreStore = tipo === "session" ? "sessionStorage" : "localStorage";

  const registrar = (tipoLog, msg) => setLog((prev) => [...prev.slice(-8), { tipo: tipoLog, msg }]);

  const recargar = () => setEntradas(store ? leerEntradas(store) : []);

  const cambiarTipo = (nuevo) => {
    setTipo(nuevo);
    if (typeof window === "undefined") return;
    setEntradas(leerEntradas(nuevo === "session" ? window.sessionStorage : window.localStorage));
  };

  const claveCompleta = (nombre) => `${PREFIJO}${nombre.trim()}`;

  const guardar = (nombreClave = clave, valorGuardar = valor) => {
    if (!store) return;
    const nombre = String(nombreClave).trim();
    if (!nombre) {
      registrar("error", "❌ setItem() necesita una clave no vacía.");
      return;
    }
    try {
      let texto = String(valorGuardar);
      // Acepta objetos/arrays escritos como JSON y los guarda serializados.
      if (/^[[{]/.test(texto.trim())) {
        try {
          texto = JSON.stringify(JSON.parse(texto));
        } catch {
          registrar("error", "⚠️ El valor parece JSON pero no es válido; se guarda tal cual.");
        }
      }
      store.setItem(claveCompleta(nombre), texto);
      registrar("success", `✅ ${nombreStore}.setItem("${nombre}", ${JSON.stringify(texto)})`);
      recargar();
    } catch (error) {
      registrar("error", `❌ ${error.name}: ${error.message}`);
    }
  };

  const leer = () => {
    if (!store) return;
    const nombre = clave.trim();
    try {
      const resultado = store.getItem(claveCompleta(nombre));
      registrar(
        resultado === null ? "error" : "success",
        `getItem("${nombre}") → ${resultado === null ? "null (la clave no existe)" : JSON.stringify(resultado)}`,
      );
    } catch (error) {
      registrar("error", `❌ ${error.name}: ${error.message}`);
    }
  };

  const eliminar = () => {
    if (!store) return;
    const nombre = clave.trim();
    try {
      store.removeItem(claveCompleta(nombre));
      registrar("success", `✅ removeItem("${nombre}") · la clave ya no existe`);
      recargar();
    } catch (error) {
      registrar("error", `❌ ${error.name}: ${error.message}`);
    }
  };

  const consultarKey = (posicion = indice) => {
    if (!store) return;
    try {
      const n = Number(posicion);
      const todas = leerEntradas(store);
      const nombre = store.key(n);
      registrar(
        nombre === null ? "error" : "iteration",
        `key(${Number.isNaN(n) ? 0 : n}) → ${nombre === null ? "null" : JSON.stringify(nombre)} · ${todas.length} clave(s) con prefijo`,
      );
    } catch (error) {
      registrar("error", `❌ ${error.name}: ${error.message}`);
    }
  };

  const limpiar = () => {
    if (!store) return;
    try {
      const antes = leerEntradas(store).length;
      leerEntradas(store).forEach(({ clave: nombre }) => store.removeItem(nombre));
      registrar("success", `✅ clear() simulado: ${antes} clave(s) eliminadas (solo las de la demo)`);
      recargar();
    } catch (error) {
      registrar("error", `❌ ${error.name}: ${error.message}`);
    }
  };

  const cargarDemo = () => {
    if (!store) return;
    try {
      Object.entries(CLAVES_DEMO).forEach(([nombre, contenido]) =>
        store.setItem(claveCompleta(nombre), contenido),
      );
      registrar("success", "✅ Datos de ejemplo cargados: tema, usuario e idioma");
      recargar();
    } catch (error) {
      registrar("error", `❌ ${error.name}: ${error.message}`);
    }
  };

  const codigo = `const storage = ${nombreStore};

storage.setItem("tema", '"oscuro"');
storage.getItem("tema");      // '"oscuro"'
storage.key(0);               // primera clave
storage.removeItem("tema");
storage.clear();`;

  return (
    <MarcoSimulador
      icon="💾"
      titulo={`${nombreStore} · API Storage`}
      descripcion="Prueba setItem, getItem, removeItem, key y clear sobre un almacenamiento real, aislado con el prefijo «aula:»."
      codigo={codigo}
      nota={
        <>
          💡 Solo se muestran y borran las claves que empiezan por <code>aula:</code>. El resto
          de datos del navegador no se toca. <code>key(n)</code> devuelve la clave en la
          posición <code>n</code> o <code>null</code> si no existe.
        </>
      }
      consola={
        <>
          <div className="log-system">
            Usando {nombreStore} · prefijo "{PREFIJO}"
          </div>
          {log.map((linea, i) => (
            <div key={i} className={`log-${linea.tipo}`}>
              {linea.msg}
            </div>
          ))}
          <div className="log-system">
            {nombreStore}.length → {entradas.length} (solo claves de la demo)
          </div>
        </>
      }
    >
      <div className="sjs-actions">
        <button
          type="button"
          className={`sjs-btn ${tipo === "local" ? "sjs-btn--primary" : ""}`}
          onClick={() => cambiarTipo("local")}
        >
          🗄️ localStorage
        </button>
        <button
          type="button"
          className={`sjs-btn ${tipo === "session" ? "sjs-btn--primary" : ""}`}
          onClick={() => cambiarTipo("session")}
        >
          🗂️ sessionStorage
        </button>
        <button type="button" className="sjs-btn" onClick={cargarDemo}>
          📦 Cargar ejemplo
        </button>
        <button type="button" className="sjs-btn" onClick={limpiar}>
          🧹 Vaciar demo
        </button>
      </div>

      <div className="sjs-grid-2">
        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>📥 setItem() / getItem()</span>
          </div>
          <label className="sjs-field" style={{ marginBottom: 10 }}>
            <span>clave</span>
            <input
              className="sjs-input"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              spellCheck={false}
            />
          </label>
          <label className="sjs-field" style={{ marginBottom: 12 }}>
            <span>valor (texto o JSON)</span>
            <input
              className="sjs-input"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              spellCheck={false}
            />
          </label>
          <div className="sjs-actions" style={{ marginBottom: 0 }}>
            <button
              type="button"
              className="sjs-btn sjs-btn--primary"
              onClick={() => guardar()}
            >
              💾 setItem()
            </button>
            <button type="button" className="sjs-btn" onClick={leer}>
              📤 getItem()
            </button>
            <button type="button" className="sjs-btn sjs-btn--danger" onClick={eliminar}>
              🗑️ removeItem()
            </button>
          </div>
        </div>

        <div className="sjs-card">
          <div className="sjs-card__label">
            <span>🔑 key() y borrado</span>
            <span className="sjs-tag">{entradas.length} claves</span>
          </div>
          <label className="sjs-field" style={{ marginBottom: 12 }}>
            <span>índice para key(n)</span>
            <input
              className="sjs-input"
              value={indice}
              onChange={(e) => setIndice(e.target.value)}
              inputMode="numeric"
            />
          </label>
          <div className="sjs-actions" style={{ marginBottom: 10 }}>
            <button type="button" className="sjs-btn" onClick={() => consultarKey()}>
              🔑 key(n)
            </button>
            <button type="button" className="sjs-btn" onClick={() => consultarKey(0)}>
              ⏮️ key(0)
            </button>
            <button
              type="button"
              className="sjs-btn"
              onClick={() => consultarKey(Math.max(entradas.length - 1, 0))}
            >
              ⏭️ última
            </button>
          </div>
          <div className="sjs-tags">
            <span className="sjs-tag">solo strings</span>
            <span className="sjs-tag">síncrono</span>
            <span className="sjs-tag sjs-tag--warn">~5-10 MB</span>
          </div>
        </div>
      </div>

      <div className="sjs-card" style={{ marginTop: 14 }}>
        <div className="sjs-card__label">
          <span>📋 {nombreStore}</span>
          <span className="sjs-tag sjs-tag--info">claves «aula:»</span>
        </div>
        {entradas.length === 0 ? (
          <div className="sjs-output sjs-output--muted">
            Vacío. Pulsa «Cargar ejemplo» o guarda una clave.
          </div>
        ) : (
          <table className="sjs-table">
            <thead>
              <tr>
                <th style={{ width: "30%" }}>key(n)</th>
                <th>getItem(clave)</th>
              </tr>
            </thead>
            <tbody>
              {entradas.map((entrada) => (
                <tr key={entrada.clave}>
                  <td>{entrada.clave}</td>
                  <td>{entrada.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </MarcoSimulador>
  );
}
