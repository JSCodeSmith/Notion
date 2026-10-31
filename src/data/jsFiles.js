export const JS_FILES = {
  id: "archivos",
  label: "Archivos",
  icon: "📁",
  titulo: "FileReader",
  descripcion:
    "Lee archivos locales desde el navegador sin subirlos: texto plano, JSON, CSV o una Data URL en Base64 para previsualizar imágenes.",
  grupos: [
    {
      seccion: "Lectura de archivos",
      metodos: [
        {
          id: "filereader-readastext",
          nombre: "FileReader.readAsText()",
          firma: "reader.readAsText(file, encoding)",
          icon: "📄",
        },
        {
          id: "filereader-readasdataurl",
          nombre: "FileReader.readAsDataURL()",
          firma: "reader.readAsDataURL(file)",
          icon: "🖼️",
        },
      ],
    },
  ],
};

export const JS_FILES_DOCS = {
  "filereader-readastext": {
    id: "filereader-readastext",
    titulo: "FileReader.readAsText()",
    icon: "📄",
    categoria: "FileReader · Texto",
    firma: "reader.readAsText(file, encoding)",
    simulador: "filereader",

    definicion: [
      "Es un método de la interfaz **FileReader** que lee el contenido de un archivo como texto (`string`) de forma **asíncrona**. 📄",
      "Se usa sobre todo con archivos elegidos por el usuario mediante un `<input type=\"file\">`.",
    ],

    queEs: [
      "Permite acceder al contenido de archivos locales sin subirlos primero a un servidor. 🗂️",
      "Funciona con eventos: la lectura ocurre en segundo plano y el resultado llega en `reader.result`.",
      "Lee `.txt`, `.json`, `.csv`, `.html`, `.xml` y cualquier archivo de texto.",
      "Es parte de la Web API del navegador, no del lenguaje JavaScript.",
    ],

    paraQueSirve: [
      "📄 Leer archivos de texto seleccionados por el usuario.",
      "📥 Importar datos desde archivos.",
      "👀 Previsualizar contenido antes de subirlo.",
      "⚙️ Leer configuraciones JSON.",
      "📊 Procesar archivos CSV en el navegador.",
      "🧾 Cargar plantillas o textos sin pasar por el servidor.",
    ],

    comoFunciona: [
      "Se crea un `new FileReader()`.",
      "Se pasa un `File` o `Blob` a `readAsText()`.",
      "El navegador lee el contenido de forma asíncrona.",
      "Cuando termina, dispara el evento `load`.",
      "El contenido queda disponible en `reader.result`.",
      "Si falla, dispara `error`; también existe `loadstart`, `progress` y `loadend`.",
    ],

    sintaxis: [
      {
        code: `reader.readAsText(file, encoding);`,
      },
      {
        caption: "Lectura básica:",
        code: `const lector = new FileReader();

lector.onload = () => {
  console.log(lector.result);
};

lector.readAsText(archivo, "UTF-8");`,
      },
      {
        caption: "Con manejo de errores:",
        code: `const lector = new FileReader();

lector.onload = () => console.log(lector.result);
lector.onerror = () => console.error("No se pudo leer", lector.error);
lector.readAsText(archivo, "UTF-8");`,
      },
    ],

    nota: "💡 `readAsText()` devuelve `undefined`; el texto aparece después en `reader.result`. No intentes leerlo en la línea siguiente a la llamada.",

    ejemplos: [
      {
        titulo: "1. 📄 Leer un archivo .txt",
        code: `<input type="file" id="archivo" />

<script>
  const input = document.getElementById("archivo");

  input.addEventListener("change", () => {
    const archivo = input.files[0];
    const lector = new FileReader();

    lector.onload = () => {
      console.log(lector.result);
    };

    lector.readAsText(archivo);
  });
</script>`,
      },
      {
        titulo: "2. 🧾 Leer y parsear un JSON",
        code: `lector.onload = () => {
  try {
    const datos = JSON.parse(lector.result);
    console.log(datos);
  } catch (error) {
    console.error("JSON inválido", error);
  }
};

lector.readAsText(archivo, "UTF-8");`,
      },
      {
        titulo: "3. 📊 Procesar un CSV",
        code: `lector.onload = () => {
  const filas = lector.result
    .split("\\n")
    .filter(Boolean)
    .map((linea) => linea.split(","));

  console.table(filas);
};

lector.readAsText(archivo, "UTF-8");`,
      },
      {
        titulo: "4. ⏳ Mostrar progreso",
        code: `lector.onprogress = (evento) => {
  if (evento.lengthComputable) {
    const porcentaje = (evento.loaded / evento.total) * 100;
    console.log(porcentaje.toFixed(0) + "%");
  }
};`,
      },
      {
        titulo: "5. 🔁 Leer varios archivos",
        code: `async function leerArchivo(archivo) {
  const lector = new FileReader();

  return new Promise((resolve, reject) => {
    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject(lector.error);
    lector.readAsText(archivo, "UTF-8");
  });
}

const texto = await leerArchivo(input.files[0]);`,
      },
    ],

    errores: [
      "**Leer `reader.result` antes de `load`:** todavía es `null`.",
      "**Esperar un valor de retorno:** devuelve `undefined`.",
      "**Olvidar la codificación:** sin `\"UTF-8\"` los acentos pueden romperse.",
      "**Pasar una ruta en vez de un `File`:** `readAsText()` necesita un `File` o `Blob`.",
      "**No manejar `error`:** un archivo ilegible falla en silencio.",
      "**Reutilizar el reader mientras lee:** espera a que termine o crea otro.",
    ],

    casos: [
      "📥 Importar contactos desde CSV.",
      "⚙️ Cargar configuración desde JSON.",
      "📝 Previsualizar texto antes de subirlo.",
      "🧾 Leer plantillas o documentación local.",
      "📊 Analizar logs exportados.",
      "🎓 Cargar ejercicios o datos de prueba.",
    ],

    relacion: [
      "**`FileReader.readAsDataURL()`:** lee el archivo como Data URL en Base64.",
      "**`FileReader.readAsArrayBuffer()`:** lee datos binarios.",
      "**`<input type=\"file\">`:** origen habitual del objeto `File`.",
      "**`Blob.text()`:** alternativa moderna basada en promesas para leer texto.",
      "**`JSON.parse()`:** convierte el texto leído en objeto.",
      "**`URL.createObjectURL()`:** alternativa para previsualizar sin Base64.",
    ],

    analogia:
      "Es como pedirle a un bibliotecario que te lea un documento en voz alta 📖. Le entregas el archivo y él empieza a leer; tú no recibes nada en ese momento (devuelve `undefined`). Cuando termina, te avisa con un timbre (`load`) y deja el texto sobre la mesa en `reader.result`. Si el documento está dañado, suena el timbre de error.",

    fuente: "MDN Web Docs · FileReader · readAsText()",

    notasPersonales: [
      "✅ Asíncrono: el resultado llega en `reader.result`.",
      "✅ Devuelve `undefined`; usa `load` para leerlo.",
      "⚠️ Indica `\"UTF-8\"` para conservar acentos y emojis.",
      "✅ Para texto moderno también existe `blob.text()`.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué hace readAsText()?",
        opciones: [
          "Lee un archivo como texto de forma asíncrona",
          "Convierte el archivo a Base64",
          "Sube el archivo al servidor",
          "Descarga el archivo",
        ],
        correcta: 0,
      },
      {
        id: 2,
        pregunta: "¿Dónde aparece el resultado?",
        opciones: ["En el valor de retorno", "En reader.result", "En input.value", "En document.cookie"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué evento indica que la lectura terminó?",
        opciones: ["change", "load", "submit", "click"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué devuelve readAsText()?",
        opciones: ["El texto", "Una promesa", "undefined", "Un File"],
        correcta: 2,
      },
      {
        id: 5,
        pregunta: "¿Qué parámetro opcional permite conservar acentos?",
        opciones: ["La codificación, por ejemplo \"UTF-8\"", "El tamaño máximo", "El nombre del archivo", "El tipo MIME"],
        correcta: 0,
      },
    ],
  },

  "filereader-readasdataurl": {
    id: "filereader-readasdataurl",
    titulo: "FileReader.readAsDataURL()",
    icon: "🖼️",
    categoria: "FileReader · Data URL",
    firma: "reader.readAsDataURL(file)",
    simulador: "filereader",

    definicion: [
      "Es un método de la interfaz **FileReader** que lee el contenido de un archivo y lo convierte en una **Data URL** en formato Base64. 🖼️",
      "El resultado es una cadena como `data:image/png;base64,iVBORw0KGgo...` que se puede usar directamente en un `src`.",
    ],

    queEs: [
      "Convierte un `File` o `Blob` en una cadena de texto especial. 🔗",
      "La cadena incluye el tipo MIME, la codificación `base64` y los datos del archivo.",
      "Permite mostrar archivos en el navegador sin subirlos a un servidor.",
      "Es asíncrono, como el resto de métodos de FileReader.",
    ],

    paraQueSirve: [
      "🖼️ Mostrar imágenes antes de subirlas.",
      "👀 Crear vistas previas de archivos.",
      "🎬 Leer archivos multimedia.",
      "👤 Cargar avatares de usuario.",
      "🧩 Insertar archivos pequeños directamente en HTML o CSS.",
      "📄 Previsualizar PDFs u otros documentos.",
    ],

    comoFunciona: [
      "Se crea un `new FileReader()`.",
      "Se pasa un `File` o `Blob` a `readAsDataURL()`.",
      "El navegador convierte el archivo a Base64.",
      "Cuando termina, dispara el evento `load`.",
      "El resultado queda en `reader.result` como Data URL.",
      "Esa cadena se puede asignar a `img.src`, `a.href` o usarla en CSS.",
    ],

    sintaxis: [
      {
        code: `reader.readAsDataURL(file);`,
      },
      {
        caption: "Vista previa de una imagen:",
        code: `const lector = new FileReader();

lector.onload = () => {
  imagen.src = lector.result;
};

lector.readAsDataURL(archivo);`,
      },
      {
        caption: "Con promesa:",
        code: `function aDataURL(archivo) {
  return new Promise((resolve, reject) => {
    const lector = new FileReader();
    lector.onload = () => resolve(lector.result);
    lector.onerror = () => reject(lector.error);
    lector.readAsDataURL(archivo);
  });
}

const dataUrl = await aDataURL(archivo);`,
      },
    ],

    nota: "💡 Una Data URL pesa aproximadamente un 33 % más que el archivo original por el Base64. Para archivos grandes es mejor `URL.createObjectURL()`.",

    ejemplos: [
      {
        titulo: "1. 🖼️ Vista previa de una imagen",
        code: `<input type="file" id="imagen" accept="image/*" />
<img id="preview" alt="Vista previa" />

<script>
  const input = document.getElementById("imagen");
  const img = document.getElementById("preview");

  input.addEventListener("change", () => {
    const archivo = input.files[0];
    const lector = new FileReader();

    lector.onload = () => {
      img.src = lector.result;
    };

    lector.readAsDataURL(archivo);
  });
</script>`,
      },
      {
        titulo: "2. 🔗 Obtener la Data URL",
        code: `const lector = new FileReader();

lector.onload = () => {
  console.log(lector.result);
  // data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...
};

lector.readAsDataURL(archivo);`,
      },
      {
        titulo: "3. 📄 Previsualizar un PDF",
        code: `lector.onload = () => {
  const visor = document.querySelector("#visor");
  visor.src = lector.result; // funciona en <iframe> o <embed>
};

lector.readAsDataURL(archivo);`,
      },
      {
        titulo: "4. 👤 Avatar con validación",
        code: `input.addEventListener("change", () => {
  const archivo = input.files[0];

  if (!archivo.type.startsWith("image/")) {
    return alert("Selecciona una imagen");
  }

  if (archivo.size > 2 * 1024 * 1024) {
    return alert("Máximo 2 MB");
  }

  const lector = new FileReader();
  lector.onload = () => (avatar.src = lector.result);
  lector.readAsDataURL(archivo);
});`,
      },
      {
        titulo: "5. 🎨 Usar la Data URL en CSS",
        code: `lector.onload = () => {
  document.body.style.backgroundImage =
    "url('" + lector.result + "')";
};

lector.readAsDataURL(archivo);`,
      },
    ],

    errores: [
      "**Leer `reader.result` antes de `load`:** todavía es `null`.",
      "**Esperar un valor de retorno:** devuelve `undefined`.",
      "**Usarlo con archivos enormes:** la cadena Base64 ocupa mucha memoria.",
      "**Olvidar validar el tipo:** puedes intentar mostrar un PDF como imagen.",
      "**Confundirlo con `URL.createObjectURL()`:** la Data URL contiene los datos; la Object URL es una referencia.",
      "**Guardar Data URLs gigantes en la base de datos:** infla el almacenamiento.",
    ],

    casos: [
      "🖼️ Vista previa de avatares.",
      "📷 Miniaturas antes de subir.",
      "📄 Previsualización de PDFs.",
      "🎨 Fondos personalizados en CSS.",
      "🧩 Iconos pequeños embebidos.",
      "🖨️ Exportar imágenes desde un canvas.",
    ],

    relacion: [
      "**`FileReader.readAsText()`:** lee texto plano en lugar de Base64.",
      "**`URL.createObjectURL()`:** alternativa más ligera para archivos grandes.",
      "**`canvas.toDataURL()`:** genera una Data URL a partir de un canvas.",
      "**Base64:** codificación usada dentro de la Data URL.",
      "**`<input type=\"file\">`:** origen habitual del `File`.",
      "**`Blob`:** también se puede convertir con `readAsDataURL()`.",
    ],

    analogia:
      "Es como fotografiar un documento y pegar la foto dentro del propio formulario 📸. La imagen viaja incluida en el texto, con una etiqueta que dice qué tipo es (`data:image/png;base64,...`). Es cómodo para archivos pequeños, pero si la foto es enorme, el formulario se vuelve pesado: para eso conviene una Object URL, que es solo una dirección temporal.",

    fuente: "MDN Web Docs · FileReader · readAsDataURL()",

    notasPersonales: [
      "✅ Convierte un `File` o `Blob` en Data URL Base64.",
      "✅ El resultado aparece en `reader.result` tras `load`.",
      "⚠️ Aumenta el tamaño un ~33 %; no lo uses con archivos grandes.",
      "✅ Ideal para vistas previas de imágenes y avatares.",
    ],

    quiz: [
      {
        id: 1,
        pregunta: "¿Qué genera readAsDataURL()?",
        opciones: [
          "Un archivo comprimido",
          "Una Data URL en Base64",
          "Una Object URL temporal",
          "Un JSON",
        ],
        correcta: 1,
      },
      {
        id: 2,
        pregunta: "¿Dónde se obtiene el resultado?",
        opciones: ["En el valor de retorno", "En reader.result", "En URL", "En input.files"],
        correcta: 1,
      },
      {
        id: 3,
        pregunta: "¿Qué evento indica que terminó la conversión?",
        opciones: ["change", "load", "error", "progress"],
        correcta: 1,
      },
      {
        id: 4,
        pregunta: "¿Qué alternativa es mejor para archivos grandes?",
        opciones: [
          "readAsText()",
          "URL.createObjectURL()",
          "JSON.parse()",
          "localStorage",
        ],
        correcta: 1,
      },
      {
        id: 5,
        pregunta: "¿Qué incluye una Data URL?",
        opciones: [
          "Solo los datos binarios",
          "Tipo MIME, codificación base64 y datos",
          "La ruta del archivo en disco",
          "El nombre del usuario",
        ],
        correcta: 1,
      },
    ],
  },
};
