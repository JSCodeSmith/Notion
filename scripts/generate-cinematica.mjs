import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildQuiz } from "./generate-apuntes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.join(__dirname, "..", "src", "data");

const CURSO = {
  id: "cinematica",
  label: "Cinemática",
  export: "FISICA_CINEMATICA",
  archivo: "fisicaCinematica",
  simulador: "fisica",
  icon: "🚀",
};

const GRUPO = {
  seccion: "Fundamentos y tipos de movimiento",
  conceptos: [
    "cin-objeto-estudio",
    "cin-velocidad-aceleracion",
    "cin-sistema-coordenadas",
    "cin-trigonometria",
    "cin-condiciones-iniciales",
    "cin-mru",
    "cin-mruv",
    "cin-parabolico",
    "cin-mcu",
    "cin-mcuv",
  ],
};

/* ------------------------------------------------------------------ */
/* 1. Contenido curado de cada tema                                    */
/* ------------------------------------------------------------------ */

const CONCEPTOS = [
  /* ---------------- 1. Objeto de estudio ---------------- */
  {
    id: "cin-objeto-estudio",
    titulo: "Objeto de estudio de la cinemática",
    icon: "🎯",
    firma: "Cinemática: estudia el movimiento sin atender a sus causas",
    simuladorTipo: "cin-objeto",
    definicion: [
      "**La cinemática** es la rama de la mecánica que describe el movimiento de los cuerpos (posición, velocidad y aceleración) en función del tiempo, **sin** analizar las causas que lo producen (eso es la dinámica).",
    ],
    queEs: [
      "Es una descripción geométrica y temporal del movimiento: dónde está el cuerpo y cómo cambia su posición con el tiempo.",
      "Trabaja con magnitudes como posición, desplazamiento, velocidad y aceleración.",
    ],
    paraQueSirve: [
      "🎯 Analizar trayectorias de proyectiles, vehículos, planetas o partículas.",
      "🎯 Diseñar sistemas mecánicos, robots, animaciones y simulaciones.",
      "🎯 Predecir dónde estará un objeto en un instante futuro dado su estado inicial.",
    ],
    comoFunciona: [
      "Se elige un **sistema de coordenadas** y un origen.",
      "Se definen **condiciones iniciales** (posición y velocidad en t = 0).",
      "Se aplican las ecuaciones del tipo de movimiento (MRU, MRUV, parabólico, circular).",
      "Se obtiene posición, velocidad y aceleración en cualquier instante.",
    ],
    errores: [
      "❌ Confundir cinemática con dinámica: la cinemática **no** explica **por qué** se mueve.",
      "❌ Mezclar unidades (m/s con km/h) sin convertir.",
      "❌ Ignorar el signo de la velocidad o la aceleración (indican dirección).",
      "❌ Usar fórmulas de MRUV en movimientos no uniformemente variados.",
    ],
    casos: [
      "💼 Calcular cuánto tarda un proyectil en caer desde una altura.",
      "💼 Diseñar la animación de un objeto que rebota en un videojuego.",
      "💼 Simular la trayectoria de una pelota en un deporte.",
      "💼 Predecir el punto de impacto de un satélite.",
    ],
    relacion: [
      "🧩 Depende de la **dinámica** para explicar las fuerzas (Newton).",
      "🧩 Se apoya en la **trigonometría** para descomponer vectores.",
      "🧩 Se combina con el **cálculo diferencial** para movimientos no uniformes.",
    ],
    analogia:
      "Es como ver un partido de fútbol en cámara lenta: describes **dónde** está cada jugador y **cómo se mueve**, pero no te importa **por qué** corre (eso sería la dinámica).",
    fuente: "Física clásica · Mecánica · Cinemática (Serway, Young & Freedman)",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Elige un origen y un sistema de ejes (por ejemplo, x horizontal y y vertical).",
          "2️⃣ Registra la posición del cuerpo en distintos instantes: `r(t) = (x(t), y(t), z(t))`.",
          "3️⃣ Deriva la posición respecto al tiempo para obtener la velocidad: `v(t) = dr/dt`.",
          "4️⃣ Deriva la velocidad respecto al tiempo para obtener la aceleración: `a(t) = dv/dt`.",
        ],
      },
    ],
  },

  /* ---------------- 2. Velocidad y aceleración ---------------- */
  {
    id: "cin-velocidad-aceleracion",
    titulo: "Velocidad y aceleración",
    icon: "⚡",
    firma: "v = dr/dt · a = dv/dt",
    simuladorTipo: "cin-velocidad",
    definicion: [
      "**La velocidad** es la razón de cambio de la posición respecto al tiempo; **la aceleración** es la razón de cambio de la velocidad respecto al tiempo.",
    ],
    queEs: [
      "La velocidad es un **vector** (tiene módulo, dirección y sentido), no solo un número.",
      "La aceleración también es un vector: puede aumentar, disminuir o cambiar la dirección de la velocidad.",
    ],
    paraQueSirve: [
      "🎯 Describir cómo se mueve un cuerpo en cada instante.",
      "🎯 Detectar frenadas, aceleraciones y cambios de dirección.",
      "🎯 Calcular distancias recorridas y tiempos de viaje.",
    ],
    comoFunciona: [
      "Velocidad media: `v̄ = Δr / Δt`.",
      "Velocidad instantánea: `v(t) = dr/dt` (derivada de la posición).",
      "Aceleración media: `ā = Δv / Δt`.",
      "Aceleración instantánea: `a(t) = dv/dt`.",
    ],
    errores: [
      "❌ Confundir velocidad con rapidez (la rapidez es el módulo de la velocidad).",
      "❌ Olvidar que la aceleración puede ser negativa (frenado) sin que el móvil retroceda.",
      "❌ Mezclar km/h con m/s sin convertir.",
      "❌ Ignorar que velocidad y aceleración son vectores (tienen dirección).",
    ],
    casos: [
      "💼 Un auto que frena: aceleración negativa (opuesta a la velocidad).",
      "💼 Una pelota en caída libre: aceleración constante = g ≈ 9.8 m/s².",
      "💼 Un satélite en órbita: velocidad tangencial constante, aceleración centrípeta.",
    ],
    relacion: [
      "🧩 Se apoya en las **derivadas** (cálculo diferencial).",
      "🧩 Es base del **MRU**, **MRUV**, **parabólico** y **circular**.",
      "🧩 Sin velocidad ni aceleración, la dinámica no puede calcular fuerzas.",
    ],
    analogia:
      "La velocidad es el **cuentakilómetros** de tu auto; la aceleración es el **pedal del acelerador** (positiva) o el **freno** (negativa).",
    fuente: "Serway, R. · Física para ciencias e ingeniería",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Mide la posición de un auto en dos instantes: `x(0) = 0 m`, `x(2) = 40 m`.",
          "2️⃣ Calcula la velocidad media: `v̄ = (40 - 0) / (2 - 0) = 20 m/s`.",
          "3️⃣ Si en `t = 2 s` frena hasta detenerse en `t = 4 s`: `ā = (0 - 20) / 2 = -10 m/s²`.",
          "4️⃣ La aceleración negativa indica que la velocidad **disminuye**, no que el auto retroceda.",
        ],
      },
    ],
  },

  /* ---------------- 3. Sistema de coordenadas ---------------- */
  {
    id: "cin-sistema-coordenadas",
    titulo: "Sistema de coordenadas",
    icon: "🧭",
    firma: "(x, y, z) con origen y ejes definidos",
    simuladorTipo: "cin-coordenadas",
    definicion: [
      "**Un sistema de coordenadas** es el marco de referencia que permite ubicar un cuerpo en el espacio mediante números (coordenadas).",
    ],
    queEs: [
      "Define un **origen** y unos **ejes** (x, y, z) con orientación y unidades.",
      "Puede ser cartesiano, polar, esférico o cilíndrico según el problema.",
    ],
    paraQueSirve: [
      "🎯 Expresar la posición de un cuerpo de forma numérica.",
      "🎯 Descomponer vectores en componentes más simples.",
      "🎯 Aplicar las ecuaciones del movimiento en cada eje.",
    ],
    comoFunciona: [
      "Elige un **origen** (punto de referencia).",
      "Elige los **ejes** y su sentido positivo.",
      "Proyecta el vector posición sobre cada eje para obtener sus componentes.",
      "En problemas 2D o 3D, aplica las ecuaciones eje por eje.",
    ],
    errores: [
      "❌ Cambiar de origen a mitad del problema.",
      "❌ Mezclar sentidos positivos en el mismo eje.",
      "❌ Usar coordenadas polares con fórmulas de cartesianas sin convertir.",
    ],
    casos: [
      "💼 Elegir el suelo como origen en caída libre (y positivo hacia arriba).",
      "💼 Usar coordenadas polares para movimientos circulares.",
      "💼 Colocar el origen en el punto de lanzamiento de un proyectil.",
    ],
    relacion: [
      "🧩 Es prerequisito de cualquier ecuación de movimiento.",
      "🧩 Se apoya en la **trigonometría** para descomponer vectores.",
      "🧩 Se combina con **vectores** y con **cálculo** para derivar posición.",
    ],
    analogia:
      "Es como el **plano de una ciudad con coordenadas GPS**: sin un origen y ejes claros, no puedes decir dónde está nada.",
    fuente: "Física clásica · Capítulo de vectores y sistemas de referencia",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Define el origen: por ejemplo, el punto de lanzamiento de una pelota.",
          "2️⃣ Elige los ejes: `x` horizontal (positivo hacia donde avanza) e `y` vertical (positivo hacia arriba).",
          "3️⃣ Expresa la posición inicial como `(x₀, y₀) = (0, 0)`.",
          "4️⃣ Cualquier movimiento futuro se describe con esas coordenadas.",
        ],
      },
    ],
  },

  /* ---------------- 4. Trigonometría aplicada ---------------- */
  {
    id: "cin-trigonometria",
    titulo: "Fundamentos trigonométricos aplicados a la cinemática",
    icon: "📐",
    firma: "vₓ = v·cosθ · v_y = v·senθ",
    simuladorTipo: "cin-trigonometria",
    definicion: [
      "**La trigonometría** permite descomponer un vector (velocidad o aceleración) en sus componentes horizontal y vertical usando el ángulo que forma con un eje.",
    ],
    queEs: [
      "Es la herramienta matemática para separar un vector en `x` e `y`.",
      "Se usa en movimientos con ángulos: proyectiles, rampas, péndulos.",
    ],
    paraQueSirve: [
      "🎯 Descomponer una velocidad inicial en sus partes horizontal y vertical.",
      "🎯 Resolver problemas de proyectiles y planos inclinados.",
      "🎯 Convertir entre coordenadas polares y cartesianas.",
    ],
    comoFunciona: [
      "Dado `v` y ángulo `θ` con la horizontal: `vₓ = v·cosθ`, `v_y = v·senθ`.",
      "Dado un vector `(vₓ, v_y)`: `v = √(vₓ² + v_y²)`, `θ = atan(v_y / vₓ)`.",
      "Recuerda: seno y coseno siempre con el mismo ángulo de referencia.",
    ],
    errores: [
      "❌ Confundir seno con coseno (depende del ángulo de referencia).",
      "❌ Usar grados en lugar de radianes (o viceversa) sin convertir.",
      "❌ Olvidar el signo del ángulo si apunta hacia abajo o a la izquierda.",
    ],
    casos: [
      "💼 Proyectil lanzado con `v₀ = 20 m/s` a `30°`: `v₀ₓ = 17.32 m/s`, `v₀y = 10 m/s`.",
      "💼 Plano inclinado con ángulo `θ`: la componente del peso paralela al plano es `mg·senθ`.",
      "💼 Péndulo: la tensión se descompone con seno y coseno del ángulo.",
    ],
    relacion: [
      "🧩 Se aplica directamente en **parabólico**, **circular** y **planos inclinados**.",
      "🧩 Sin trigonometría, no se pueden separar los movimientos en 2D.",
    ],
    analogia:
      "Es como **descomponer una fuerza en dos cuerdas que tiran de una caja**: una hacia los lados (coseno) y otra hacia arriba (seno).",
    fuente: "Geometría y trigonometría · Aplicaciones a la física",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Tienes `v = 50 m/s` a `θ = 37°` sobre la horizontal.",
          "2️⃣ Calcula `vₓ = 50 · cos(37°) ≈ 50 · 0.8 = 40 m/s`.",
          "3️⃣ Calcula `v_y = 50 · sen(37°) ≈ 50 · 0.6 = 30 m/s`.",
          "4️⃣ Verifica: `√(40² + 30²) = 50 m/s`. ✔",
        ],
      },
    ],
  },

  /* ---------------- 5. Condiciones iniciales ---------------- */
  {
    id: "cin-condiciones-iniciales",
    titulo: "Condiciones iniciales en cinemática",
    icon: "🚩",
    firma: "x₀, v₀, t₀ = 0",
    simuladorTipo: "cin-condiciones",
    definicion: [
      "**Las condiciones iniciales** son los valores de posición y velocidad del cuerpo en el instante `t = 0`, necesarios para resolver las ecuaciones de movimiento.",
    ],
    queEs: [
      "Son el punto de partida del problema: dónde está el cuerpo y cómo se mueve al inicio.",
      "Sin ellas, las ecuaciones diferenciales del movimiento tienen infinitas soluciones.",
    ],
    paraQueSirve: [
      "🎯 Fijar la solución única de un problema de cinemática.",
      "🎯 Determinar constantes de integración.",
      "🎯 Aplicar correctamente las ecuaciones horarias.",
    ],
    comoFunciona: [
      "Se definen `x₀` (posición inicial) y `v₀` (velocidad inicial).",
      "Si hay aceleración constante, se añade `a` (que puede ser `g` en caída libre).",
      "Se sustituyen en las ecuaciones: `x(t) = x₀ + v₀·t + ½·a·t²`.",
    ],
    errores: [
      "❌ No definir el origen correctamente (¿dónde es `x = 0`?).",
      "❌ Confundir `v₀ = 0` con «el cuerpo está en reposo todo el tiempo».",
      "❌ No considerar el signo de `v₀` (puede ser negativa).",
    ],
    casos: [
      "💼 Pelota lanzada hacia arriba: `y₀ = 0`, `v₀ = +20 m/s`, `a = -9.8 m/s²`.",
      "💼 Auto que arranca desde el reposo: `v₀ = 0`, `a = +2 m/s²`.",
      "💼 Proyectil disparado desde una altura: `y₀ = h`, `v₀y = v·senθ`.",
    ],
    relacion: [
      "🧩 Prerequisito de **MRU**, **MRUV**, **parabólico** y **circular**.",
      "🧩 Determina las constantes al integrar las ecuaciones diferenciales.",
    ],
    analogia:
      "Es como decirle al GPS: **«estoy aquí, y voy a esta velocidad»**: sin ese punto de partida, no puede predecir adónde irás.",
    fuente: "Cálculo diferencial aplicado a la física · Ecuaciones horarias",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Define el origen del eje `y` en el suelo.",
          "2️⃣ Anota `y₀ = 0 m` (la pelota está en el suelo al inicio).",
          "3️⃣ Anota `v₀ = +20 m/s` (lanzada hacia arriba).",
          "4️⃣ Aplica `y(t) = 0 + 20·t - 4.9·t²`.",
        ],
      },
    ],
  },

  /* ---------------- 6. MRU ---------------- */
  {
    id: "cin-mru",
    titulo: "Movimiento Rectilíneo Uniforme (MRU)",
    icon: "➡️",
    firma: "x(t) = x₀ + v·t",
    simuladorTipo: "cin-mru",
    definicion: [
      "**El MRU** es el movimiento de un cuerpo que se desplaza en línea recta con **velocidad constante** (sin aceleración).",
    ],
    queEs: [
      "La velocidad no cambia en módulo ni en dirección.",
      "La aceleración es cero.",
    ],
    paraQueSirve: [
      "🎯 Modelar movimientos simples: trenes, autos en autopista, cintas transportadoras.",
      "🎯 Base conceptual para movimientos más complejos.",
    ],
    comoFunciona: [
      "Ecuación de posición: `x(t) = x₀ + v·t`.",
      "Velocidad: `v = constante`.",
      "Aceleración: `a = 0`.",
      "En gráficas: `x–t` es una recta; `v–t` es una recta horizontal.",
    ],
    errores: [
      "❌ Usar MRU cuando la velocidad cambia.",
      "❌ Olvidar la posición inicial `x₀`.",
      "❌ Confundir desplazamiento con distancia recorrida (en MRU coinciden solo en línea recta sin retroceso).",
    ],
    casos: [
      "💼 Un tren que viaja a 80 km/h constante durante 2 h.",
      "💼 Una cinta transportadora con velocidad fija.",
      "💼 Un barco en aguas tranquilas.",
    ],
    relacion: [
      "🧩 Es el caso más simple del **MRUV** cuando `a = 0`.",
      "🧩 Se combina con el **parabólico** (componente horizontal).",
    ],
    analogia:
      "Es como **viajar con el control de crucero puesto**: siempre a la misma velocidad, sin acelerar ni frenar.",
    fuente: "Serway · Física · Capítulo de cinemática en una dimensión",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Un tren parte de `x₀ = 0 km` con `v = 80 km/h`.",
          "2️⃣ A los `t = 2 h`, la posición es `x = 0 + 80·2 = 160 km`.",
          "3️⃣ A los `t = 3 h`, `x = 240 km`.",
          "4️⃣ La gráfica `x–t` es una recta con pendiente `80`.",
        ],
      },
    ],
  },

  /* ---------------- 7. MRUV ---------------- */
  {
    id: "cin-mruv",
    titulo: "Movimiento Rectilíneo Uniformemente Variado (MRUV)",
    icon: "🚗",
    firma: "x(t) = x₀ + v₀·t + ½·a·t²",
    simuladorTipo: "cin-mruv",
    definicion: [
      "**El MRUV** es el movimiento de un cuerpo que se desplaza en línea recta con **aceleración constante** (puede ser positiva o negativa).",
    ],
    queEs: [
      "La velocidad cambia uniformemente con el tiempo.",
      "La aceleración es constante y no nula.",
    ],
    paraQueSirve: [
      "🎯 Modelar autos que aceleran o frenan.",
      "🎯 Caída libre de cuerpos.",
      "🎯 Lanzamiento vertical hacia arriba.",
    ],
    comoFunciona: [
      "Posición: `x(t) = x₀ + v₀·t + ½·a·t²`.",
      "Velocidad: `v(t) = v₀ + a·t`.",
      "Sin tiempo: `v² = v₀² + 2·a·Δx`.",
      "En gráficas: `x–t` es parábola; `v–t` es recta; `a–t` es horizontal.",
    ],
    errores: [
      "❌ Usar `a` positiva cuando el cuerpo frena.",
      "❌ Olvidar que en caída libre `a = -g` (si el eje `y` es positivo hacia arriba).",
      "❌ Aplicar MRUV a movimientos con aceleración variable.",
    ],
    casos: [
      "💼 Un auto que acelera de 0 a 100 km/h en 10 s.",
      "💼 Una piedra que cae desde un edificio.",
      "💼 Un ascensor que arranca y frena.",
    ],
    relacion: [
      "🧩 Es la base de la **caída libre**.",
      "🧩 Se combina con el **parabólico** (componente vertical).",
      "🧩 Se reduce a **MRU** si `a = 0`.",
    ],
    analogia:
      "Es como **apretar el acelerador de forma constante**: cada segundo ganas la misma cantidad de velocidad.",
    fuente: "Serway · Física · Capítulo de cinemática en una dimensión",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Un auto parte del reposo (`v₀ = 0`) con `a = 3 m/s²`.",
          "2️⃣ A los `t = 4 s`: `v = 0 + 3·4 = 12 m/s`.",
          "3️⃣ La distancia recorrida es `Δx = 0 + ½·3·4² = 24 m`.",
          "4️⃣ La gráfica `v–t` es una recta con pendiente `3`.",
        ],
      },
    ],
  },

  /* ---------------- 8. Parabólico ---------------- */
  {
    id: "cin-parabolico",
    titulo: "Movimiento Parabólico (MP)",
    icon: "🏹",
    firma: "x = v₀ₓ·t · y = y₀ + v₀y·t - ½·g·t²",
    simuladorTipo: "cin-parabolico",
    definicion: [
      "**El movimiento parabólico** es la combinación de un MRU horizontal y un MRUV vertical, dando como resultado una trayectoria parabólica.",
    ],
    queEs: [
      "El cuerpo se lanza con un ángulo `θ` respecto a la horizontal.",
      "La componente horizontal de la velocidad se mantiene constante.",
      "La componente vertical cambia por efecto de la gravedad.",
    ],
    paraQueSirve: [
      "🎯 Predecir la trayectoria de proyectiles: pelotas, balas, cohetes.",
      "🎯 Diseñar tiros en deportes (fútbol, baloncesto, béisbol).",
      "🎯 Calcular el alcance máximo de un lanzamiento.",
    ],
    comoFunciona: [
      "Descompón la velocidad inicial: `v₀ₓ = v₀·cosθ`, `v₀y = v₀·senθ`.",
      "Eje x (MRU): `x(t) = v₀ₓ·t`.",
      "Eje y (MRUV): `y(t) = y₀ + v₀y·t - ½·g·t²`.",
      "Alcance máximo con `y₀ = 0`: `R = v₀²·sen(2θ) / g`.",
    ],
    errores: [
      "❌ Tratar el movimiento como si fuera solo vertical u horizontal.",
      "❌ Olvidar que `v₀ₓ` es constante.",
      "❌ Usar `g = 10` cuando el problema pide `9.8`.",
    ],
    casos: [
      "💼 Un jugador patea un balón con `v₀ = 20 m/s` a 45°.",
      "💼 Un francotirador calcula la caída de la bala.",
      "💼 Un cañón dispara un proyectil.",
    ],
    relacion: [
      "🧩 Combina **MRU** (eje x) y **MRUV** (eje y).",
      "🧩 Usa **trigonometría** para descomponer la velocidad inicial.",
    ],
    analogia:
      "Es como **lanzar una piedra al río**: avanza hacia adelante (MRU) mientras cae por la gravedad (MRUV). El resultado es una curva.",
    fuente: "Serway · Física · Capítulo de movimiento en dos dimensiones",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Lanzas una pelota con `v₀ = 30 m/s` a `37°`. Descompón: `v₀ₓ = 24 m/s`, `v₀y = 18 m/s`.",
          "2️⃣ Tiempo de vuelo: `t_v = 2·v₀y / g = 2·18 / 9.8 ≈ 3.67 s`.",
          "3️⃣ Alcance: `R = v₀ₓ·t_v ≈ 24·3.67 ≈ 88 m`.",
          "4️⃣ Altura máxima: `h = v₀y² / (2g) = 18² / 19.6 ≈ 16.5 m`.",
        ],
      },
    ],
  },

  /* ---------------- 9. MCU ---------------- */
  {
    id: "cin-mcu",
    titulo: "Movimiento Circular Uniforme (MCU)",
    icon: "🌀",
    firma: "v = ω·r · a_c = v²/r",
    simuladorTipo: "cin-mcu",
    definicion: [
      "**El MCU** es el movimiento de un cuerpo que recorre una circunferencia con **rapidez constante**, aunque su velocidad **cambia de dirección** continuamente.",
    ],
    queEs: [
      "La rapidez es constante.",
      "La dirección de la velocidad cambia → existe aceleración centrípeta.",
      "La aceleración tangencial es cero.",
    ],
    paraQueSirve: [
      "🎯 Modelar satélites, ruedas, hélices y partículas en aceleradores.",
      "🎯 Analizar movimientos de rotación uniforme.",
    ],
    comoFunciona: [
      "Velocidad angular: `ω = Δθ / Δt = 2π / T`.",
      "Velocidad lineal: `v = ω·r`.",
      "Aceleración centrípeta: `a_c = v² / r = ω²·r`.",
      "Periodo: `T = 2π·r / v`. Frecuencia: `f = 1/T`.",
    ],
    errores: [
      "❌ Decir que no hay aceleración (sí hay, centrípeta).",
      "❌ Confundir la velocidad lineal con la angular.",
      "❌ Olvidar que la aceleración apunta al centro.",
    ],
    casos: [
      "💼 Una rueda que gira a 60 rpm.",
      "💼 Un satélite en órbita circular.",
      "💼 Una partícula en un ciclotrón.",
    ],
    relacion: [
      "🧩 Se generaliza en el **MCUV** cuando la rapidez cambia.",
      "🧩 Usa **trigonometría** para describir el ángulo.",
    ],
    analogia:
      "Es como **dar vueltas en una calesita**: siempre a la misma rapidez, pero tu dirección cambia todo el tiempo (por eso sientes que te empujan hacia afuera).",
    fuente: "Serway · Física · Capítulo de movimiento circular",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Una rueda de radio `r = 0.5 m` gira a `60 rpm`.",
          "2️⃣ Convierte `ω = 60·2π/60 = 2π ≈ 6.28 rad/s`.",
          "3️⃣ Velocidad lineal: `v = ω·r ≈ 3.14 m/s`.",
          "4️⃣ Aceleración centrípeta: `a_c = v²/r ≈ 19.74 m/s²`.",
        ],
      },
    ],
  },

  /* ---------------- 10. MCUV ---------------- */
  {
    id: "cin-mcuv",
    titulo: "Movimiento Circular Uniformemente Variado (MCUV)",
    icon: "🎡",
    firma: "ω(t) = ω₀ + α·t · θ(t) = θ₀ + ω₀·t + ½·α·t²",
    simuladorTipo: "cin-mcuv",
    definicion: [
      "**El MCUV** es el movimiento circular en el que la rapidez angular cambia de forma uniforme (aceleración angular constante).",
    ],
    queEs: [
      "La aceleración angular `α` es constante.",
      "Existe aceleración tangencial (`a_t = α·r`) además de la centrípeta.",
    ],
    paraQueSirve: [
      "🎯 Modelar ruedas que arrancan o frenan.",
      "🎯 Analizar motores que aceleran.",
      "🎯 Estudiar discos y volantes que cambian de rapidez.",
    ],
    comoFunciona: [
      "Velocidad angular: `ω(t) = ω₀ + α·t`.",
      "Posición angular: `θ(t) = θ₀ + ω₀·t + ½·α·t²`.",
      "Sin tiempo: `ω² = ω₀² + 2·α·Δθ`.",
      "Aceleración tangencial: `a_t = α·r`. Centrípeta: `a_c = ω²·r`.",
    ],
    errores: [
      "❌ Usar las ecuaciones del MCU cuando `α ≠ 0`.",
      "❌ Olvidar que la aceleración total tiene dos componentes (tangencial + centrípeta).",
      "❌ Mezclar radianes con grados.",
    ],
    casos: [
      "💼 Un ventilador que arranca desde el reposo.",
      "💼 Un disco duro que acelera hasta su velocidad de lectura.",
      "💼 Un auto que frena en una curva.",
    ],
    relacion: [
      "🧩 Es al **MCU** lo que el **MRUV** es al **MRU**.",
      "🧩 Se reduce a MCU cuando `α = 0`.",
    ],
    analogia:
      "Es como **acelerar en una calesita**: cada vuelta das más rápido, pero también sientes más empuje hacia afuera.",
    fuente: "Serway · Física · Capítulo de movimiento circular",
    extras: [
      {
        seccion: "🧪 Paso a paso",
        textos: [
          "1️⃣ Un ventilador parte del reposo (`ω₀ = 0`) con `α = 2 rad/s²`.",
          "2️⃣ A los `t = 3 s`: `ω = 0 + 2·3 = 6 rad/s`.",
          "3️⃣ El ángulo recorrido: `θ = 0 + 0 + ½·2·3² = 9 rad`.",
          "4️⃣ Aceleración tangencial (radio `r = 0.2 m`): `a_t = 2·0.2 = 0.4 m/s²`.",
        ],
      },
    ],
  },
];

/* ------------------------------------------------------------------ */
/* 2. Utilidades                                                       */
/* ------------------------------------------------------------------ */

const norm = (v = "") =>
  v
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();

const quitarBold = (v = "") => String(v).replace(/\*\*/g, "");

const clip = (v = "", max = 160) => {
  const t = String(v).replace(/\s+/g, " ").trim();
  if (t.length <= max) return t;
  const corte = t.lastIndexOf(" ", max);
  return `${t.slice(0, corte > max * 0.6 ? corte : max).trim()}…`;
};

const XP = { facil: 60, medio: 90 };

/* ------------------------------------------------------------------ */
/* 2. Utilidades de limpieza                                           */
/* ------------------------------------------------------------------ */

const limpiarTexto = (t = "") => {
  if (typeof t !== "string") return "";
  return String(t)
    .replace(/[“”«»„‟]/g, '"')
    .replace(/[‘’‚‛]/g, "'")
    .replace(/[—–]/g, "-")
    .replace(/…/g, "...")
    .replace(/\u00a0/g, " ")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();
};

/* ------------------------------------------------------------------ */
/* 3. Documento                                                        */
/* ------------------------------------------------------------------ */

function buildDoc(c) {
  const limpiarArray = (arr) => (arr ?? []).map(limpiarTexto);
  const limpiarExtra = (extras) =>
    (extras ?? []).map((e) => ({
      seccion: limpiarTexto(e.seccion),
      textos: limpiarArray(e.textos),
    }));

  return {
    id: c.id,
    titulo: limpiarTexto(c.titulo),
    icon: c.icon,
    curso: CURSO.id,
    cursoLabel: CURSO.label,
    categoria: "Fisica · Cinematica", // sin tildes para búsquedas
    resumen: clip(limpiarTexto(quitarBold(c.definicion[0] ?? "")), 180),
    firma: limpiarTexto(c.firma),
    simulador: CURSO.simulador,
    simuladorTipo: c.simuladorTipo,

    definicion: limpiarArray(c.definicion),
    queEs: limpiarArray(c.queEs),
    paraQueSirve: limpiarArray(c.paraQueSirve),
    comoFunciona: limpiarArray(c.comoFunciona),
    errores: limpiarArray(c.errores),
    casos: limpiarArray(c.casos),
    relacion: limpiarArray(c.relacion),
    analogia: limpiarTexto(c.analogia ?? ""),
    notasPersonales: limpiarArray(c.notasPersonales),
    extras: limpiarExtra(c.extras),
    fuente: limpiarTexto(
      c.fuente ?? "Serway · Fisica para ciencias e ingenieria",
    ),
    sintaxis: [{ code: limpiarTexto(c.firma) }],
    ejemplos:
      c.extras?.[0]?.textos?.slice(0, 2).map((t, i) => ({
        titulo: `Ejemplo ${i + 1}`,
        descripcion: "",
        code: limpiarTexto(t),
      })) ?? [],
  };
}

/* ------------------------------------------------------------------ */
/* 4. Laboratorio (emparejar + completar + paso a paso)                */
/* ------------------------------------------------------------------ */

function extraerPares(doc) {
  const pares = [];
  const vistos = new Set();
  const fuentes = [
    ...(doc.paraQueSirve ?? []),
    ...(doc.relacion ?? []),
    ...(doc.errores ?? []),
    ...(doc.casos ?? []),
  ];
  for (const item of fuentes) {
    if (typeof item !== "string" || item.startsWith("```")) continue;
    const limpio = quitarBold(item).trim();
    const m = limpio.match(/^([^:]{3,60}):\s+(.{15,180})$/u);
    if (!m) continue;
    const concepto = m[1].trim();
    const descripcion = clip(m[2].trim(), 160);
    if (vistos.has(norm(concepto))) continue;
    vistos.add(norm(concepto));
    pares.push({ concepto, descripcion });
    if (pares.length >= 6) break;
  }
  return pares;
}

const primerNegrita = (texto = "") => {
  const m = texto.match(/\*\*([^*]{2,40})\*\*/);
  return m ? m[1].trim() : "";
};

function misionCompletar(doc, hermanos) {
  const conNegrita = (doc.definicion ?? []).find((t) =>
    /\*\*([^*]{2,40})\*\*/.test(t),
  );
  if (!conNegrita) return null;
  const termino = primerNegrita(conNegrita);
  if (!termino) return null;
  const frase = quitarBold(conNegrita).replace(termino, "__________");
  if (frase === quitarBold(conNegrita)) return null;

  const distractores = [];
  for (const h of hermanos) {
    if (h.id === doc.id || distractores.length === 3) continue;
    const t = primerNegrita((h.definicion ?? [])[0] || "");
    if (!t || t === termino || frase.includes(t)) continue;
    distractores.push(t);
  }
  if (distractores.length < 3) return null;

  return {
    id: `${doc.id}-completar`,
    tipo: "completar",
    titulo: "Completa la definición",
    dificultad: "Fácil",
    xp: XP.facil,
    frase,
    opciones: [termino, ...distractores].slice(0, 4),
    correcto: termino,
    pista: `El término empieza por «${termino.charAt(0)}…».`,
    solucion: `${termino}: ${clip(quitarBold(conNegrita), 220)}`,
  };
}

function construirPasoAPaso(doc) {
  const pasos = [];
  for (const extra of doc.extras ?? []) {
    let actual = null;
    for (const parrafo of extra.textos ?? []) {
      for (const linea of parrafo.split("\n")) {
        const m = linea.trim().match(/^(\d)\uFE0F?\u20E3\s+(.+)$/);
        if (m) {
          actual = {
            titulo: m[2].trim(),
            explicacion: "",
            codigo: "",
            salida: "",
          };
          pasos.push(actual);
        } else if (actual) {
          actual.explicacion += (actual.explicacion ? "\n" : "") + linea;
        }
      }
    }
  }
  return pasos.map((p, i) => ({ paso: i + 1, ...p }));
}

function construirLab(doc, hermanos) {
  const misiones = [];
  const pares = extraerPares(doc);
  if (pares.length >= 4) {
    misiones.push({
      id: `${doc.id}-emparejar`,
      tipo: "emparejar",
      titulo: "Une concepto y descripción",
      dificultad: "Medio",
      xp: XP.medio,
      pares,
      pista: "Selecciona un concepto y luego su descripción.",
      solucion: pares
        .map((p) => `${p.concepto} → ${p.descripcion}`)
        .join(" · "),
    });
  }
  const completar = misionCompletar(doc, hermanos);
  if (completar) misiones.push(completar);

  return {
    misiones,
    pasoAPaso: construirPasoAPaso(doc),
    consola: true,
    editor: true,
    depuracion: true,
  };
}

/* ------------------------------------------------------------------ */
/* 5. Serialización                                                    */
/* ------------------------------------------------------------------ */

function serialize(value, indent = 0) {
  const pad = "  ".repeat(indent);
  if (Array.isArray(value)) {
    if (!value.length) return "[]";
    const simple = value.every(
      (it) => typeof it === "string" && !it.includes("\n") && it.length < 90,
    );
    if (simple)
      return `[\n${value
        .map((it) => `${pad}  ${JSON.stringify(it)},`)
        .join("\n")}\n${pad}]`;
    return `[\n${value
      .map((it) => `${pad}  ${serialize(it, indent + 1)},`)
      .join("\n")}\n${pad}]`;
  }
  if (value && typeof value === "object") {
    const entries = Object.entries(value).filter(([, v]) => v !== undefined);
    if (!entries.length) return "{}";
    return `{\n${entries
      .map(
        ([k, v]) =>
          `${pad}  ${JSON.stringify(k)}: ${serialize(v, indent + 1)},`,
      )
      .join("\n")}\n${pad}}`;
  }
  return JSON.stringify(value);
}

/* ------------------------------------------------------------------ */
/* 6. Generación                                                       */
/* ------------------------------------------------------------------ */

const docs = CONCEPTOS.map(buildDoc);
for (const doc of docs) {
  doc.quiz = buildQuiz(doc, docs);
  doc.lab = construirLab(doc, docs);
}

const docsById = Object.fromEntries(docs.map((d) => [d.id, d]));

const meta = {
  id: CURSO.id,
  label: CURSO.label,
  icon: CURSO.icon,
  titulo: "Cinemática",
  descripcion:
    "Estudio del movimiento sin atender a sus causas: velocidad, aceleración, MRU, MRUV, parabólico y circular.",
  simulador: CURSO.simulador,
  grupos: [
    {
      seccion: GRUPO.seccion,
      metodos: GRUPO.conceptos
        .filter((id) => docsById[id])
        .map((id) => {
          const doc = docsById[id];
          return {
            id,
            nombre: doc.titulo,
            firma: doc.firma,
            icon: doc.icon,
            lab: doc.lab.misiones.length,
          };
        }),
    },
  ],
};

const content = `/* Cinemática · apuntes propios.
   Generado por scripts/generate-cinematica.mjs — no editar a mano. */

export const ${CURSO.export} = ${serialize(meta)};

export const ${CURSO.export}_DOCS = ${serialize(docsById)};
`;

fs.writeFileSync(path.join(DATA_DIR, `${CURSO.archivo}.js`), content, "utf8");

console.log("\n✅ Cinemática generada:\n");
console.log(`- ${docs.length} temas → ${CURSO.export}`);
for (const doc of docs) {
  console.log(
    `   · ${doc.titulo} (${doc.lab.pasoAPaso.length} pasos, ${doc.quiz.length} preguntas, ${doc.lab.misiones.length} misiones)`,
  );
}
