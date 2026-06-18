// ================= CREDENCIALES =================
const USUARIO_ADMIN = "DIRECTIVOJBS";
const CLAVE_ADMIN = "PROYECTOJBS";

// ================= DATOS =================
let docentes = JSON.parse(localStorage.getItem("docentes")) || [];

// ================= ELEMENTOS =================
const loginBox = document.getElementById("loginAdmin");
const panel = document.getElementById("panelAdmin");
const error = document.getElementById("error");
const saludo = document.getElementById("saludo");

const tabla = document.getElementById("tablaDocentes");
const tbody = document.getElementById("listaDocentes");
const sinDocentes = document.getElementById("sinDocentes");
const form = document.getElementById("formularioDocente");

// Inputs login
const usuarioInput = document.getElementById("usuario");
const claveInput = document.getElementById("clave");

// Inputs formulario
const dniInput = document.getElementById("dni");
const nombreInput = document.getElementById("nombre");
const correoInput = document.getElementById("correo");
const celularInput = document.getElementById("celular");
const areaInput = document.getElementById("area");
const especialidadEPT = document.getElementById("especialidadEPT");

// ================= ESTADO INICIAL (SEGURO) =================
if (sessionStorage.getItem("adminActivo")) {
  iniciarSesion();
} else {
  loginBox.classList.remove("oculto");
  panel.classList.add("oculto");
}

// ================= SESIÓN =================
function login() {
  const u = usuarioInput.value.trim();
  const c = claveInput.value.trim();

  if (u === USUARIO_ADMIN && c === CLAVE_ADMIN) {
    sessionStorage.setItem("adminActivo", "true");
    iniciarSesion();
  } else {
    error.textContent = "Acceso incorrecto";
  }
}

function iniciarSesion() {
  loginBox.classList.add("oculto");
  panel.classList.remove("oculto");
  saludo.textContent = "Bienvenido, Directivo";
  cargarDocentes();
}

function cerrarSesion() {
  sessionStorage.removeItem("adminActivo");
  usuarioInput.value = "";
  claveInput.value = "";
  location.reload();
}

// ================= FORMULARIO =================
function mostrarFormulario() {
  form.classList.remove("oculto");
  tabla.parentElement.classList.add("oculto");
}

function volverATabla() {
  form.classList.add("oculto");
  tabla.parentElement.classList.remove("oculto");
}

// ================= EPT =================
function verificarEPT() {
  if (areaInput.value === "Educación para el Trabajo") {
    especialidadEPT.classList.remove("oculto");
  } else {
    especialidadEPT.classList.add("oculto");
    especialidadEPT.value = "";
  }
}

// ================= REGISTRAR DOCENTE =================
function agregarDocente() {
  const dni = dniInput.value.trim();
  const nombre = nombreInput.value.trim();
  const correo = correoInput.value.trim();
  const celular = celularInput.value.trim();
  const area = areaInput.value;
  const especialidad = especialidadEPT.value;

  if (!dni || !nombre || !correo || !celular || !area) {
    alert("Completa todos los campos");
    return;
  }

  if (area === "Educación para el Trabajo" && !especialidad) {
    alert("Selecciona especialidad EPT");
    return;
  }

  docentes.push({
    dni,
    nombre,
    correo,
    celular,
    area,
    especialidad: area === "Educación para el Trabajo" ? especialidad : "-",
    usuario: dni,
    password: dni + "JBS"
  });

  localStorage.setItem("docentes", JSON.stringify(docentes));

  limpiarFormulario();
  volverATabla();
  cargarDocentes();
}

// ================= TABLA =================
function cargarDocentes() {
  tbody.innerHTML = "";

  if (docentes.length === 0) {
    sinDocentes.textContent = "Aún no tienes docentes registrados.";
    tabla.classList.add("oculto");
    return;
  }

  sinDocentes.textContent = "";
  tabla.classList.remove("oculto");

  docentes.forEach((d, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${d.dni}</td>
      <td>${d.nombre}</td>
      <td>${d.area}</td>
      <td>${d.especialidad}</td>
      <td>${d.usuario}</td>
      <td>${d.password}</td>
      <td>
        <button class="eliminar" onclick="eliminarDocente(${i})">✖</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

function eliminarDocente(i) {
  docentes.splice(i, 1);
  localStorage.setItem("docentes", JSON.stringify(docentes));
  cargarDocentes();
}

// ================= LIMPIAR =================
function limpiarFormulario() {
  dniInput.value = "";
  nombreInput.value = "";
  correoInput.value = "";
  celularInput.value = "";
  areaInput.value = "";
  especialidadEPT.value = "";
  especialidadEPT.classList.add("oculto");
}
