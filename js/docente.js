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
const sesion = localStorage.getItem("docenteActivo");

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
  saludo.textContent = `Bienvenido, ${docenteActivo.nombre}`;
  loginBox.classList.add("oculto");
  panel.classList.remove("oculto");

  const key = `clases_${docenteActivo.usuario}`;
  clases = JSON.parse(localStorage.getItem(key)) || [];

  renderTabla();
}

// ================= LOGIN =================
function loginDocente() {
  const user = usuario.value.trim();
  const pass = clave.value.trim();

  const docente = docentes.find(
    d => d.usuario === user && d.password === pass
  );

  if (!docente) {
    errorLogin.textContent = "Usuario o contraseña incorrectos";
    return;
  }

  docenteActivo = docente;
  localStorage.setItem("docenteActivo", JSON.stringify(docenteActivo));

  usuario.value = "";
  clave.value = "";
  errorLogin.textContent = "";

  iniciarSesion();
}

// ================= CERRAR SESIÓN =================
function cerrarSesion() {
  localStorage.removeItem("docenteActivo");
  usuario.value = "";
  clave.value = "";
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

// ================= GUARDAR CLASE =================
function guardarClase() {
  if (!grado.value || !seccion.value || !tema.value || !titulo.value) {
    alert("Completa grado, sección, tema y título");
    return;
  }

  const nuevaClase = {
    grado: grado.value,
    seccion: seccion.value,
    tema: tema.value,
    titulo: titulo.value,
    proposito: proposito.value,
    criterios: criterios.value,
    estado: "Registrada"
  };

  clases.push(nuevaClase);

  const key = `clases_${docenteActivo.usuario}`;
  localStorage.setItem(key, JSON.stringify(clases));

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
    sinClases.textContent = "Aún no tienes clases registradas.";
    tabla.classList.add("oculto");
    return;
  }

  sinClases.textContent = "";
  tabla.classList.remove("oculto");

  clases.forEach((c, i) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${c.grado}</td>
      <td>${c.seccion}</td>
      <td>${c.tema}</td>
      <td>${c.titulo}</td>
      <td>${c.estado}</td>
      <td class="acciones">
        <button class="activar" onclick="cambiarEstado(${i}, 'Activa')">Activar</button>
        <button class="desarrollada" onclick="cambiarEstado(${i}, 'Desarrollada')">✔</button>
        <button class="eliminar" onclick="eliminarClase(${i})">✖</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

// ================= ACCIONES =================
function cambiarEstado(i, estado) {
  clases[i].estado = estado;
  localStorage.setItem(`clases_${docenteActivo.usuario}`, JSON.stringify(clases));
  renderTabla();
}

function eliminarClase(i) {
  clases.splice(i, 1);
  localStorage.setItem(`clases_${docenteActivo.usuario}`, JSON.stringify(clases));
  renderTabla();
}

// ================= IA HEADER =================
const avatarIA = document.querySelector(".avatar-ia");
const mensajeIA = document.getElementById("mensaje-ia");

if (avatarIA && mensajeIA) {
  avatarIA.addEventListener("click", () => {
    mensajeIA.textContent =
      "Aquí puedes registrar, activar y gestionar tus clases.";
  });
}
// ================= LIMPIEZA DE LOGIN AL CARGAR =================
document.addEventListener("DOMContentLoaded", () => {
  if (typeof usuario !== "undefined") usuario.value = "";
  if (typeof clave !== "undefined") clave.value = "";
  if (errorLogin) errorLogin.textContent = "";
});
