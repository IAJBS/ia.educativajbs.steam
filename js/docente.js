// ================= DATOS =================
const docentes = JSON.parse(localStorage.getItem("docentes")) || [];

let docenteActivo = null;
let clases = [];
let keyClases = "";

// ================= ELEMENTOS =================
const loginBox = document.getElementById("loginDocente");
const panel = document.getElementById("panelDocente");
const saludo = document.getElementById("saludo");
const errorLogin = document.getElementById("errorLogin");

const tabla = document.getElementById("tablaClases");
const tbody = tabla.querySelector("tbody");
const sinClases = document.getElementById("sinClases");
const form = document.getElementById("formularioClase");

// ================= ESTADO INICIAL =================
loginBox.classList.remove("oculto");
panel.classList.add("oculto");

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
  keyClases = `clases_docente_${docenteActivo.dni}`;
  clases = JSON.parse(localStorage.getItem(keyClases)) || [];

  saludo.textContent = `Bienvenido, ${docenteActivo.nombre}`;

  usuario.value = "";
  clave.value = "";
  errorLogin.textContent = "";

  loginBox.classList.add("oculto");
  panel.classList.remove("oculto");

  ocultarFormulario();
  renderTabla();
}

// ================= CERRAR SESIÓN =================
function cerrarSesion() {
  docenteActivo = null;
  clases = [];
  keyClases = "";

  usuario.value = "";
  clave.value = "";
  errorLogin.textContent = "";

  ocultarFormulario();

  panel.classList.add("oculto");
  loginBox.classList.remove("oculto");
}

// ================= FORMULARIO =================
function mostrarFormulario() {
  form.classList.remove("oculto");
  tabla.classList.add("oculto");
}

function ocultarFormulario() {
  form.classList.add("oculto");
  tabla.classList.remove("oculto");
}

// ================= GUARDAR CLASE =================
function guardarClase() {
  if (!docenteActivo) {
    alert("Sesión inválida");
    return;
  }

  if (!grado.value || !seccion.value || !tema.value || !titulo.value) {
    alert("Completa grado, sección, tema y título");
    return;
  }

  clases.push({
    grado: grado.value,
    seccion: seccion.value,
    tema: tema.value,
    titulo: titulo.value,
    proposito: proposito.value,
    criterios: criterios.value,
    estado: "Registrada"
  });

  localStorage.setItem(keyClases, JSON.stringify(clases));

  form.reset();
  ocultarFormulario();
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
    tbody.innerHTML += `
      <tr>
        <td>${c.grado}</td>
        <td>${c.seccion}</td>
        <td>${c.tema}</td>
        <td>${c.titulo}</td>
        <td>${c.estado}</td>
        <td class="acciones">
          <button onclick="verDetalle(${i})">👁</button>
          <button class="activar" onclick="cambiarEstado(${i},'Activa')">▶</button>
          <button class="desarrollada" onclick="cambiarEstado(${i},'Desarrollada')">✔</button>
          <button class="eliminar" onclick="eliminar(${i})">✖</button>
        </td>
      </tr>
    `;
  });
}

// ================= DETALLE =================
function verDetalle(i) {
  const c = clases[i];
  alert(
    `TEMA: ${c.tema}\n\n` +
    `TÍTULO: ${c.titulo}\n\n` +
    `PROPÓSITO:\n${c.proposito}\n\n` +
    `CRITERIOS:\n${c.criterios}`
  );
}

// ================= ACCIONES =================
function cambiarEstado(i, estado) {
  clases[i].estado = estado;
  localStorage.setItem(keyClases, JSON.stringify(clases));
  renderTabla();
}

function eliminar(i) {
  if (!confirm("¿Eliminar esta clase?")) return;
  clases.splice(i, 1);
  localStorage.setItem(keyClases, JSON.stringify(clases));
  renderTabla();
}
