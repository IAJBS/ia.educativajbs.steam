// ================= DATOS BASE =================
const docentes = JSON.parse(localStorage.getItem("docentes")) || [];

const loginBox = document.getElementById("loginDocente");
const panel = document.getElementById("panelDocente");
const saludo = document.getElementById("saludo");
const errorLogin = document.getElementById("errorLogin");

const tabla = document.getElementById("tablaClases");
const tbody = tabla.querySelector("tbody");
const sinClases = document.getElementById("sinClases");
const form = document.getElementById("formularioClase");

let docenteActivo = null;
let clases = [];

// ================= ESTADO INICIAL =================

const sesion = sessionStorage.getItem("docenteActivo");

if (sesion) {
  docenteActivo = JSON.parse(sesion);
  iniciarSesion();
} else {
  mostrarLogin();
}

// ================= FUNCIONES DE SESIÓN =================

function mostrarLogin() {
  loginBox.classList.remove("oculto");
  panel.classList.add("oculto");
}

function iniciarSesion() {

  saludo.textContent =
    `Bienvenido, ${docenteActivo.nombre}`;

  loginBox.classList.add("oculto");
  panel.classList.remove("oculto");

  const key =
    `clases_${docenteActivo.usuario}`;

  clases =
    JSON.parse(localStorage.getItem(key)) || [];

  renderTabla();
}

// ================= LOGIN =================

function loginDocente() {

  const user =
    usuario.value.trim();

  const pass =
    clave.value.trim();

  const docente = docentes.find(
    d =>
      d.usuario === user &&
      d.password === pass
  );

  if (!docente) {

    errorLogin.textContent =
      "Usuario o contraseña incorrectos";

    return;
  }

  docenteActivo = docente;

  sessionStorage.setItem(
    "docenteActivo",
    JSON.stringify(docenteActivo)
  );

  usuario.value = "";
  clave.value = "";
  errorLogin.textContent = "";

  iniciarSesion();
}

// ================= CERRAR SESIÓN =================

function cerrarSesion() {

  sessionStorage.removeItem(
    "docenteActivo"
  );

  usuario.value = "";
  clave.value = "";

  location.reload();
}

// ================= FORMULARIO =================

function mostrarFormulario() {

  form.classList.remove("oculto");

  tabla.parentElement.classList.add(
    "oculto"
  );
}

function volverATabla() {

  form.classList.add("oculto");

  tabla.parentElement.classList.remove(
    "oculto"
  );
}

// ================= GUARDAR CLASE =================

function guardarClase() {

  if (
    !grado.value ||
    !seccion.value ||
    !tema.value ||
    !titulo.value
  ) {

    alert(
      "Completa grado, sección, tema y título"
    );

    return;
  }

  const nuevaClase = {

    idClase: Date.now(),

    grado: grado.value,

    seccion: seccion.value,

    tema: tema.value,

    titulo: titulo.value,

    proposito: proposito.value,

    criterios: criterios.value,

    docente: docenteActivo.nombre,

    area: docenteActivo.area,

    codigoClase: "",

    estado: "Registrada"

  };

  clases.push(nuevaClase);

  const key =
    `clases_${docenteActivo.usuario}`;

  localStorage.setItem(
    key,
    JSON.stringify(clases)
  );

  grado.value = "";
  seccion.value = "";
  tema.value = "";
  titulo.value = "";
  proposito.value = "";
  criterios.value = "";

  volverATabla();

  renderTabla();
}

// ================= TABLA =================

function renderTabla() {

  tbody.innerHTML = "";

  if (clases.length === 0) {

    sinClases.textContent =
      "Aún no tienes clases registradas.";

    tabla.classList.add("oculto");

    return;
  }

  sinClases.textContent = "";

  tabla.classList.remove("oculto");

  clases.forEach((c, i) => {

    const fila =
      document.createElement("tr");

    fila.innerHTML = `

      <td>${c.grado}</td>

      <td>${c.seccion}</td>

      <td>${c.tema}</td>

      <td>${c.titulo}</td>

      <td>

        ${c.estado}

        ${
          c.codigoClase
            ? `<br><small><strong>${c.codigoClase}</strong></small>`
            : ""
        }

      </td>

      <td class="acciones">

        <button
          class="activar"
          onclick="cambiarEstado(${i}, 'Activa')">

          Activar

        </button>

        <button
          class="desarrollada"
          onclick="cambiarEstado(${i}, 'Desarrollada')">

          ✔

        </button>

        <button
          class="eliminar"
          onclick="eliminarClase(${i})">

          ✖

        </button>

      </td>

    `;

    tbody.appendChild(fila);

  });

}

// ================= CAMBIAR ESTADO =================

function cambiarEstado(i, estado) {

  clases[i].estado = estado;

  if (
    estado === "Activa" &&
    !clases[i].codigoClase
  ) {

    clases[i].codigoClase =
      "CYT-" +
      Math.floor(
        1000 + Math.random() * 9000
      );

  }

  localStorage.setItem(
    `clases_${docenteActivo.usuario}`,
    JSON.stringify(clases)
  );

  renderTabla();

}

// ================= ELIMINAR =================

function eliminarClase(i) {

  clases.splice(i, 1);

  localStorage.setItem(
    `clases_${docenteActivo.usuario}`,
    JSON.stringify(clases)
  );

  renderTabla();
}

// ================= IA HEADER =================

const avatarIA =
  document.querySelector(".avatar-ia");

const mensajeIA =
  document.getElementById("mensaje-ia");

if (avatarIA && mensajeIA) {

  avatarIA.addEventListener(
    "click",
    () => {

      mensajeIA.textContent =
        "Aquí puedes registrar, activar y gestionar tus clases.";

    }
  );

}

// ================= LIMPIEZA LOGIN =================

document.addEventListener(
  "DOMContentLoaded",
  () => {

    if (
      typeof usuario !== "undefined"
    ) {
      usuario.value = "";
    }

    if (
      typeof clave !== "undefined"
    ) {
      clave.value = "";
    }

    if (errorLogin) {
      errorLogin.textContent = "";
    }

  }
);

// ================= INACTIVIDAD =================

const TIEMPO_INACTIVIDAD =
  5 * 60 * 1000;

let temporizadorInactividad;

function reiniciarInactividad() {

  clearTimeout(
    temporizadorInactividad
  );

  if (docenteActivo) {

    temporizadorInactividad =
      setTimeout(() => {

        alert(
          "Sesión cerrada por inactividad"
        );

        sessionStorage.removeItem(
          "docenteActivo"
        );

        location.reload();

      }, TIEMPO_INACTIVIDAD);

  }

}

[
  "mousemove",
  "keydown",
  "click",
  "scroll"
].forEach(evento => {

  document.addEventListener(
    evento,
    reiniciarInactividad
  );

});

document.addEventListener(
  "DOMContentLoaded",
  () => {

    if (
      sessionStorage.getItem(
        "docenteActivo"
      )
    ) {

      reiniciarInactividad();

    }

  }
);
/* ======================================================
   VER RESULTADOS DE ESTUDIANTES
====================================================== */

function verResultados() {

  const panelResultados =
    document.getElementById(
      "panelResultados"
    );

  const tablaResultados =
    document.querySelector(
      "#tablaResultados tbody"
    );

  tablaResultados.innerHTML = "";

  const participaciones =
    JSON.parse(
      localStorage.getItem(
        "participacionesCYT"
      )
    ) || [];

  const resultadosDocente =
    participaciones.filter(p =>
      p.docente === docenteActivo.nombre
    );

  if (
    resultadosDocente.length === 0
  ) {

    tablaResultados.innerHTML = `

      <tr>

        <td colspan="5">

          No existen registros
          de estudiantes todavía.

        </td>

      </tr>

    `;

  }

  resultadosDocente.forEach(r => {

    tablaResultados.innerHTML += `

      <tr>

        <td>${r.estudiante}</td>

        <td>${r.clase}</td>

        <td>${r.tema}</td>

        <td>${r.fecha}</td>

        <td>

          ${
            r.completo
              ? "✅ Completó"
              : "⚪ Incompleto"
          }

        </td>

      </tr>

    `;

  });

  document.getElementById(
    "panelDocente"
  ).classList.add("oculto");

  panelResultados.classList.remove(
    "oculto"
  );

}

/* ======================================================
   CERRAR RESULTADOS
====================================================== */

function cerrarResultados() {

  document.getElementById(
    "panelResultados"
  ).classList.add("oculto");

  document.getElementById(
    "panelDocente"
  ).classList.remove("oculto");

}
