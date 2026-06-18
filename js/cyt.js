/* ======================================================
   ÁREA ACTUAL
====================================================== */

const AREA_ACTUAL = "CIENCIA Y TECNOLOGÍA";

/* ======================================================
   CONTENEDOR
====================================================== */

const listaClases =
document.getElementById("listaClases");

/* ======================================================
   DOCENTES REGISTRADOS
====================================================== */

const docentes =
JSON.parse(
  localStorage.getItem("docentes")
) || [];

/* ======================================================
   CLASES DEL ÁREA CYT
====================================================== */

let todasLasClases = [];

/* ======================================================
   RECORRER DOCENTES
====================================================== */

docentes.forEach(docente => {

  /* FILTRAR SOLO DOCENTES CYT */

  if (
    docente.area &&
    docente.area.toUpperCase() !== AREA_ACTUAL
  ) {
    return;
  }

  const key =
  `clases_${docente.usuario}`;

  const clasesDocente =
  JSON.parse(
    localStorage.getItem(key)
  ) || [];

  clasesDocente.forEach(clase => {

    todasLasClases.push({

      idClase: clase.idClase,

      codigoClase: clase.codigoClase || "",

      docente: docente.nombre,

      usuario: docente.usuario,

      area: clase.area || docente.area,

      grado: clase.grado,

      seccion: clase.seccion,

      tema: clase.tema,

      titulo: clase.titulo,

      proposito: clase.proposito,

      criterios: clase.criterios,

      estado: clase.estado

    });

  });

});

/* ======================================================
   MOSTRAR CLASES
====================================================== */

mostrarClases();

/* ======================================================
   FUNCIÓN PRINCIPAL
====================================================== */

function mostrarClases() {

  listaClases.innerHTML = "";

  if (todasLasClases.length === 0) {

    listaClases.innerHTML = `
      <div class="sin-clases">
        No existen clases registradas para Ciencia y Tecnología.
      </div>
    `;

    return;
  }

  todasLasClases.forEach((clase, index) => {

    let botonIngresar = "";

    if (clase.estado === "Activa") {

      botonIngresar = `
        <a
          href="sesioncyt.html"
          class="btn-ingresar"
          onclick="seleccionarClase(${index})"
        >
          Ingresar
        </a>
      `;

    }

    let estadoVisual = "";

    if (clase.estado === "Activa") {

      estadoVisual = `
        <span class="estado-activa">
          🟢 Activa
        </span>
      `;

    } else {

      estadoVisual = `
        <span class="estado-registrada">
          ⚪ ${clase.estado}
        </span>
      `;

    }

    listaClases.innerHTML += `

      <div class="clase-card">

        <h4>${clase.titulo}</h4>

        <p>
          <strong>Grado:</strong>
          ${clase.grado}
        </p>

        <p>
          <strong>Sección:</strong>
          ${clase.seccion}
        </p>

        <p>
          <strong>Tema:</strong>
          ${clase.tema}
        </p>

        <p>
          <strong>Docente:</strong>
          ${clase.docente}
        </p>

        <p>
          <strong>Estado:</strong>
          ${estadoVisual}
        </p>

        ${botonIngresar}

      </div>

    `;

  });

}

/* ======================================================
   GUARDAR CLASE SELECCIONADA
====================================================== */

function seleccionarClase(index) {

  localStorage.setItem(
    "claseSeleccionadaCYT",
    JSON.stringify(
      todasLasClases[index]
    )
  );

}
/* ======================================================
   GROQ IA - CONFIGURACIÓN BÁSICA (TEMPORAL)
====================================================== */

// ⚠️ SOLO PARA DESARROLLO / PROTOTIPO
// Luego se moverá a backend
const GROQ_API_KEY = "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";

/* ======================================================
   FUNCIÓN PARA CONSULTAR IA (CYT)
====================================================== */

async function consultarIACyt(promptUsuario) {

  try {

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${GROQ_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama3-70b-8192",
          messages: [
            {
              role: "system",
              content: `
Eres un tutor educativo de Ciencia y Tecnología.
Guías al estudiante con preguntas, ejemplos y metacognición
integrada de forma natural durante la conversación.
No entregas respuestas directas sin razonamiento.
`
            },
            {
              role: "user",
              content: promptUsuario
            }
          ],
          temperature: 0.7
        })
      }
    );

    const data = await response.json();

    if (!data.choices || !data.choices[0]) {
      throw new Error("Respuesta inválida de la IA");
    }

    return data.choices[0].message.content;

  } catch (error) {

    console.error("Error al consultar IA CYT:", error);

    return "⚠️ Error al comunicarse con el tutor IA. Intenta nuevamente.";

  }

}
