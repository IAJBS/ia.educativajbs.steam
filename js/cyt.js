/* ======================================================
   ÁREA ACTUAL
====================================================== */

const AREA_ACTUAL = "CIENCIA Y TECNOLOGÍA";

/* ======================================================
   NORMALIZAR TEXTO
====================================================== */

function normalizar(texto) {
  return texto
    .toUpperCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

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
    normalizar(docente.area) !== normalizar(AREA_ACTUAL)
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

      area:
        clase.area ||
        docente.area ||
        AREA_ACTUAL,

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
