import CodeBlock from '../CodeBlock/CodeBlock'
import SimuladorFindDiagrama from '../SimuladorFind/SimuladorFindDiagrama' 

import SimuladorFindInteractivo from '../SimuladorFind/SimuladorFindInteractivo';

import MisionEmoji from '../SimuladorFind/MisionEmoji';


import './MetodoFindDoc.css'
import SandboxPro from '../SimuladorFind/SandboxPro'
import QuizFind from '../SimuladorFind/QuizFind'; // Ajusta la ruta según donde lo creaste
import DiagramaFlujoMetodos from '../SimuladorFind/DiagramaFlujoMetodos'

import JuegoHeroe from '../SimuladorFind/JuegoHeroe';
import LabFind from '../SimuladorFind/LabFind';
import JuegoBestia from '../SimuladorFind/JuegoBestia';

export default function MetodoFindDoc({ onBack }) {
  return (
    <article className="notion-page detail-page">
      <button type="button" className="notion-back-btn" onClick={onBack}>
        ← Volver a los Métodos
      </button>

      <div className="doc-header">
        <h1 className="doc-title" style={{ color: '#ff5a5f' }}>Array.prototype.find()</h1>
      </div>

      <div className="doc-grid">
        
        {/* LAS 3 COLUMNAS EXACTAS */}
        <div className="doc-triple">
          <div className="doc-card">
            <h3>📝 Definición</h3>
            <ul>
              <li>Es un método iterativo integrado en JavaScript que se utiliza para buscar un elemento dentro de un array.</li>
              <li>Devuelve el <strong>primer elemento</strong> cuyo callback devuelva un valor <em>truthy</em>.</li>
              <li>No modifica el array, pero el callback sí puede hacerlo y el elemento devuelto conserva la misma referencia.</li>
            </ul>
          </div>

          <div className="doc-card">
            <h3>🧠 ¿Qué es?</h3>
            <p>Es un método de orden superior que recorre los elementos de un array uno a uno y ejecuta una función de prueba para cada uno, deteniéndose inmediatamente cuando encuentra una coincidencia (salida temprana o <em>short-circuit</em>).</p>
          </div>

          <div className="doc-card">
            <h3>🎯 ¿Para qué sirve?</h3>
            <ul>
              <li>Localizar de forma rápida un objeto o valor específico dentro de una lista sin necesidad de escribir bucles manuales.</li>
              <li>Es ideal cuando buscas <strong>un único elemento</strong> (por ejemplo, buscar un usuario por su ID).</li>
              <li>Si solo necesitas saber <strong>si existe</strong>, usa <code>some()</code>; si necesitas la posición, usa <code>findIndex()</code>.</li>
            </ul>
          </div>
        </div>

        {/* SIMULADOR A ANCHO COMPLETO */}
        <div 
          className="doc-card doc-card--full" 
          style={{ 
            padding: 0, 
            background: 'transparent', 
            border: 'none',
            gridColumn: '1 / -1',
            width: '100%',
            overflow: 'visible'
          }}
        >
          <SimuladorFindDiagrama />
        </div>

        <div className="doc-card doc-card--full">
          <h3>📝 Sintaxis / Estructura</h3>
          <CodeBlock code={`const elementoEncontrado = array.find((elemento, indice, array) => {
  // Cualquier valor truthy detiene la búsqueda
  return condicion;
}, thisArg); // thisArg es opcional`} />
          <p className="code-caption">Forma corta:</p>
          <CodeBlock code={`const resultado = array.find(elemento => elemento.propiedad === valorBuscado);`} />
          <p className="code-caption">
            El callback recibe <code>(elemento, indice, array)</code>. El segundo argumento de <code>find()</code>,
            <code>thisArg</code>, se usa como <code>this</code> dentro del callback.
          </p>
        </div>

        <div className="doc-card doc-card--full" style={{ padding: 0, background: 'transparent', border: 'none' }}>
          <SimuladorFindInteractivo />
        </div>

        <div className="doc-card doc-card--full" style={{ padding: 0, background: 'transparent', border: 'none', marginTop: '24px' }}>
            <LabFind />
          </div>
        <div className="doc-card doc-card--full" style={{ padding: 0, background: 'transparent', border: 'none' }}>
          <MisionEmoji />
        </div>
        <div className="doc-card doc-card--full" style={{ padding: 0, background: 'transparent', border: 'none' }}>
          <SandboxPro />
        </div>

        <div className="doc-card doc-card--full">
          <h3>💡 Ejemplos</h3>
          <p className="example-title"><strong>Ejemplo 1: Buscar un objeto por ID</strong></p>
          <CodeBlock code={`const usuarios = [
  { id: 1, nombre: "Josue" },
  { id: 2, nombre: "Ana" },
  { id: 3, nombre: "Carlos" }
];
const usuarioFijado = usuarios.find(u => u.id === 2);
// Resultado: { id: 2, nombre: "Ana" }`} />

          <p className="example-title" style={{ marginTop: '16px' }}><strong>Ejemplo 2: Cuando no encuentra nada</strong></p>
          <CodeBlock code={`const numeros = [5, 12, 8, 130, 44];
const elNumeroGrande = numeros.find(n => n > 200);
// Resultado: undefined`} />
        </div>

        <div className="doc-card">
          <h3>⚠️ Errores comunes</h3>
          <ul>
            <li><strong>Confundirlo con <code>filter()</code>:</strong> <code>find()</code> solo devuelve un elemento.</li>
            <li><strong>No manejar el <code>undefined</code>:</strong> Si no encuentra nada, devuelve <code>undefined</code>. Acceder a sus propiedades lanza un <code>TypeError</code>.</li>
            <li><strong>Comprobar con <code>if (resultado)</code>:</strong> <code>0</code>, <code>""</code> y <code>false</code> son resultados válidos. Comprueba con <code>resultado !== undefined</code>.</li>
            <li><strong>Usarlo solo para saber si existe:</strong> para eso es más claro <code>some()</code>.</li>
          </ul>
        </div>

        <div className="doc-card">
          <h3>💼 Casos de uso</h3>
          <ul>
            <li><strong>Dashboards:</strong> Buscar el elemento que el usuario seleccionó para editar.</li>
            <li><strong>Autenticación:</strong> Buscar el usuario por correo cuando necesitas sus datos; si solo quieres saber si existe, <code>some()</code>.</li>
            <li><strong>Catálogos:</strong> Obtener el primer producto que cumple un filtro concreto.</li>
          </ul>
        </div>

   

        <div className="doc-card doc-card--full" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h3>🧩 Relación con otros conceptos</h3>
            <ul>
              <li><strong><code>filter()</code>:</strong> Devuelve un <em>nuevo array</em> con todos los elementos que cumplan la condición.</li>
              <li><strong><code>findIndex()</code>:</strong> Devuelve la posición (índice) del primer elemento que cumpla la condición. Si no lo encuentra, devuelve <code>-1</code>.</li>
              <li><strong><code>findLast()</code> / <code>findLastIndex()</code>:</strong> Igual que <code>find()</code>, pero empiezan por el final del array.</li>
              <li><strong><code>some()</code>:</strong> Devuelve un booleano. Es la opción correcta cuando solo quieres comprobar existencia.</li>
            </ul>
          </div>
          
          {/* EL DIAGRAMA VA AQUÍ ADENTRO */}
          <div style={{ marginTop: '10px', width: '100%' }}>
            <DiagramaFlujoMetodos />
          </div>
        </div>
        
       <div className="doc-card doc-card--full" style={{ padding: 0, background: 'transparent', border: 'none', marginTop: '24px' }}>
          <JuegoHeroe />
        </div>
        <div className="doc-card doc-card--full" style={{ padding: 0, background: 'transparent', border: 'none', marginTop: '24px' }}>
          <JuegoBestia />
        </div>
      
        <div className="doc-card doc-card--full">
          <h3>🧠 Analogía</h3>
          <p>Imagina que buscas una carpeta en un archivador. Vas revisando una por una. En el momento en que la encuentras, <strong>la sacas y cierras el archivador</strong>. No sigues mirando. Eso es <code>find()</code>.</p>
        </div>

        <div className="doc-card doc-card--full" style={{ padding: 0, background: 'transparent', border: 'none', marginTop: '24px' }}>
          <QuizFind />
        </div>



        <div className="doc-card doc-card--full" style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <h3 style={{ margin: 0 }}>📚 Fuente:</h3>
          <a href="https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Array/find" target="_blank" rel="noreferrer">MDN Web Docs</a>
          <span style={{ color: 'var(--text-faint)' }}>|</span>
          <a href="https://tc39.es/ecma262/#sec-array.prototype.find" target="_blank" rel="noreferrer">ECMAScript Specification</a>
        </div>
      </div>
    </article>
  )
}