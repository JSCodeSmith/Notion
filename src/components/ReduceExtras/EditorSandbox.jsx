import { useCallback, useEffect, useRef, useState } from 'react'
import { usePersistencia } from './usePersistencia'

const CLAVE_CODIGO = 'reduce:editor:codigo:v1'
const CLAVE_AUTO = 'reduce:editor:auto:v1'
const LIMITE_MS = 3000

const CODIGO_INICIAL = `// "datos" = pistolas, sonidos y alertas.
// Usa return para devolver el resultado.
const total = datos.reduce(
  (acc, item) => acc + item.poder,
  0,
);

console.log("Elementos:", datos.length);
console.log("Poder total:", total);
return total;`

/* Iframe aislado: sin same-origin, sin red y con límite de tiempo.
   El código del usuario solo puede devolver datos por postMessage. */
const HARNESS = `<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8" />
<meta http-equiv="Content-Security-Policy" content="default-src 'none'; script-src 'unsafe-inline' 'unsafe-eval'; style-src 'unsafe-inline'" />
</head>
<body>
<script>
(function () {
  'use strict';
  var MAX_LOGS = 60;

  function formatear(valor) {
    if (typeof valor === 'undefined') return 'undefined';
    if (typeof valor === 'function') return '[Function ' + (valor.name || 'anónima') + ']';
    if (typeof valor === 'bigint') return String(valor) + 'n';
    if (typeof valor === 'symbol') return String(valor);
    if (typeof valor === 'string') return JSON.stringify(valor);
    try {
      var texto = JSON.stringify(valor, function (clave, v) {
        return typeof v === 'bigint' ? String(v) + 'n' : v;
      }, 2);
      return typeof texto === 'undefined' ? String(valor) : texto;
    } catch (error) {
      return String(valor);
    }
  }

  function responder(mensaje) {
    try { parent.postMessage(mensaje, '*'); } catch (error) {}
  }

  function crearConsola(logs) {
    function registrar(nivel) {
      return function () {
        if (logs.length >= MAX_LOGS) return;
        var partes = [];
        for (var i = 0; i < arguments.length; i += 1) partes.push(formatear(arguments[i]));
        logs.push({ nivel: nivel, texto: partes.join(' ') });
      };
    }
    return { log: registrar('log'), info: registrar('info'), warn: registrar('warn'), error: registrar('error'), debug: registrar('debug') };
  }

  window.addEventListener('error', function (evento) {
    responder({ tipo: 'resultado', ok: false, error: String(evento.message || 'Error inesperado'), logs: [], ms: 0 });
  });

  window.addEventListener('unhandledrejection', function (evento) {
    responder({ tipo: 'resultado', ok: false, error: String(evento.reason && evento.reason.message ? evento.reason.message : evento.reason), logs: [], ms: 0 });
  });

  window.addEventListener('message', async function (evento) {
    var datos = evento.data || {};
    if (datos.tipo !== 'ejecutar') return;

    var logs = [];
    var consola = crearConsola(logs);
    var inicio = performance.now();

    try {
      var fn = new Function('datos', 'console', '"use strict";\\n' + String(datos.codigo));
      var valor = await fn(datos.datos, consola);
      responder({
        tipo: 'resultado',
        id: datos.id,
        ok: true,
        valor: formatear(valor),
        logs: logs,
        ms: performance.now() - inicio
      });
    } catch (error) {
      responder({
        tipo: 'resultado',
        id: datos.id,
        ok: false,
        error: error && error.message ? error.message : String(error),
        logs: logs,
        ms: performance.now() - inicio
      });
    }
  });

  responder({ tipo: 'listo' });
})();
</script>
</body>
</html>`

const SALIDA_INICIAL = { estado: 'inicial', valor: '', error: '', logs: [], ms: 0 }

export default function EditorSandbox({ datos = [], notificar }) {
  const [codigo, setCodigo] = usePersistencia(CLAVE_CODIGO, CODIGO_INICIAL)
  const [auto, setAuto] = usePersistencia(CLAVE_AUTO, true)
  const [salida, setSalida] = useState(SALIDA_INICIAL)
  const [ejecutando, setEjecutando] = useState(false)
  const [listo, setListo] = useState(false)
  const [version, setVersion] = useState(0)

  const iframeRef = useRef(null)
  const listoRef = useRef(false)
  const idRef = useRef(0)
  const timeoutRef = useRef(null)
  const autoBloqueadoRef = useRef(false)
  const gutterRef = useRef(null)
  const areaRef = useRef(null)

  const reiniciarIframe = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    idRef.current += 1
    listoRef.current = false
    setListo(false)
    setEjecutando(false)
    setVersion((valor) => valor + 1)
  }, [])

  const correr = useCallback(() => {
    const iframe = iframeRef.current
    if (!listoRef.current || !iframe?.contentWindow) return

    autoBloqueadoRef.current = false
    idRef.current += 1
    const id = idRef.current
    setEjecutando(true)
    if (timeoutRef.current) clearTimeout(timeoutRef.current)

    timeoutRef.current = setTimeout(() => {
      autoBloqueadoRef.current = true
      setEjecutando(false)
      setSalida({
        estado: 'error',
        valor: '',
        error: `La ejecución superó ${LIMITE_MS / 1000} s (posible bucle infinito). El sandbox se reinició.`,
        logs: [],
        ms: LIMITE_MS,
      })
      reiniciarIframe()
    }, LIMITE_MS)

    iframe.contentWindow.postMessage({ tipo: 'ejecutar', id, codigo, datos }, '*')
  }, [codigo, datos, reiniciarIframe])

  useEffect(() => {
    const alRecibir = (evento) => {
      const iframe = iframeRef.current
      if (!iframe || evento.source !== iframe.contentWindow) return

      if (evento.data?.tipo === 'listo') {
        listoRef.current = true
        setListo(true)
        return
      }

      if (evento.data?.tipo !== 'resultado') return
      if (evento.data.id !== idRef.current) return

      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      const { ok, valor, error, logs, ms } = evento.data
      setEjecutando(false)
      setSalida({
        estado: ok ? 'ok' : 'error',
        valor: valor ?? '',
        error: error ?? '',
        logs: Array.isArray(logs) ? logs.slice(0, 40) : [],
        ms: Math.round(ms || 0),
      })
    }

    window.addEventListener('message', alRecibir)
    return () => {
      window.removeEventListener('message', alRecibir)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  /* Un timeout no debe relanzar el mismo código en bucle. */
  useEffect(() => {
    autoBloqueadoRef.current = false
  }, [codigo])

  /* Resultado dinámico: se vuelve a ejecutar al cambiar el código o los datos. */
  useEffect(() => {
    if (!auto || !listo || autoBloqueadoRef.current) return
    const id = setTimeout(correr, 650)
    return () => clearTimeout(id)
  }, [auto, listo, correr])

  const manejarTecla = (evento) => {
    if (evento.key === 'Tab') {
      evento.preventDefault()
      const area = evento.currentTarget
      const inicio = area.selectionStart
      const fin = area.selectionEnd
      const siguiente = `${codigo.slice(0, inicio)}  ${codigo.slice(fin)}`
      setCodigo(siguiente)
      requestAnimationFrame(() => {
        area.selectionStart = inicio + 2
        area.selectionEnd = inicio + 2
      })
      return
    }
    if ((evento.ctrlKey || evento.metaKey) && evento.key === 'Enter') {
      evento.preventDefault()
      correr()
    }
  }

  const sincronizarScroll = (evento) => {
    if (gutterRef.current) gutterRef.current.scrollTop = evento.currentTarget.scrollTop
  }

  const restaurar = () => {
    setCodigo(CODIGO_INICIAL)
    setSalida(SALIDA_INICIAL)
    notificar?.('Editor restaurado', { tipo: 'info', texto: 'Volvió el ejemplo inicial de reduce().' })
  }

  const lineas = codigo.split('\n').length
  const bytes = new Blob([codigo]).size

  return (
    <section className="rx-card rx-editor" aria-labelledby="rx-editor-titulo">
      <header className="rx-head">
        <div>
          <span className="rx-kicker">⌨️ Sandbox seguro</span>
          <h3 id="rx-editor-titulo" className="rx-title">Editor de Array.prototype.reduce()</h3>
          <p className="rx-sub">
            Escribe tu reducer, ejecútalo aislado y observa el resultado al instante. Nada de lo que
            escribas puede afectar al resto de la página.
          </p>
        </div>
        <div className="rx-head__actions">
          <label className="rx-switch" title="Ejecutar automáticamente al escribir">
            <input
              type="checkbox"
              checked={Boolean(auto)}
              onChange={(evento) => setAuto(evento.target.checked)}
            />
            <span className="rx-switch__track" aria-hidden="true" />
            <span className="rx-switch__label">Auto</span>
          </label>
          <button type="button" className="rx-btn rx-btn--ghost" onClick={restaurar}>
            ↺ Restaurar
          </button>
          <button
            type="button"
            className="rx-btn rx-btn--primary"
            onClick={correr}
            disabled={!listo}
          >
            ▶ Ejecutar
          </button>
        </div>
      </header>

      <div className="rx-editor__bar">
        <span className={`rx-dot ${listo ? 'is-on' : ''}`} aria-hidden="true" />
        <span className="rx-editor__estado">
          {!listo ? 'Iniciando sandbox…' : ejecutando ? 'Ejecutando…' : 'Sandbox listo'}
        </span>
        <span className="rx-editor__meta">{lineas} líneas · {bytes} B</span>
        <span className="rx-badge rx-badge--cyan">sandbox="allow-scripts"</span>
      </div>

      <div className="rx-editor__grid">
        <div className="rx-editor__panel">
          <div className="rx-editor__area">
            <pre ref={gutterRef} className="rx-editor__gutter" aria-hidden="true">
              {Array.from({ length: lineas }, (_, i) => (
                <span key={i}>{i + 1}</span>
              ))}
            </pre>
            <textarea
              ref={areaRef}
              className="rx-editor__code"
              value={codigo}
              onChange={(evento) => setCodigo(evento.target.value)}
              onKeyDown={manejarTecla}
              onScroll={sincronizarScroll}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
              aria-label="Editor de código del reducer"
            />
          </div>
          <footer className="rx-editor__pie">
            <span><kbd>Ctrl</kbd> + <kbd>Enter</kbd> para ejecutar</span>
            <span>{datos.length} elemento{datos.length === 1 ? '' : 's'} disponibles en <code>datos</code></span>
          </footer>
        </div>

        <div className="rx-consola" aria-live="polite">
          <div className="rx-consola__head">
            <span>Salida</span>
            <span className="rx-consola__ms">{salida.ms > 0 ? `${salida.ms} ms` : '—'}</span>
          </div>

          {salida.estado === 'inicial' && (
            <p className="rx-consola__vacio">Ejecuta el código para ver el resultado aquí.</p>
          )}

          {salida.estado === 'error' && (
            <div className="rx-consola__error">
              <strong>Error</strong>
              <pre>{salida.error}</pre>
            </div>
          )}

          {salida.estado === 'ok' && (
            <div className="rx-consola__resultado">
              <span className="rx-consola__label">return</span>
              <pre>{salida.valor === '' ? 'undefined' : salida.valor}</pre>
            </div>
          )}

          {salida.logs.length > 0 && (
            <div className="rx-consola__logs">
              {salida.logs.map((log, i) => (
                <div key={i} className={`rx-log rx-log--${log.nivel}`}>
                  <span aria-hidden="true">›</span>
                  <code>{log.texto}</code>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <iframe
        key={version}
        ref={iframeRef}
        className="rx-sandbox"
        title="Sandbox de ejecución de reduce"
        sandbox="allow-scripts"
        srcDoc={HARNESS}
        onLoad={() => {
          listoRef.current = true
          setListo(true)
        }}
      />
    </section>
  )
}
