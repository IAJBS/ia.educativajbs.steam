// ================= LOGIN =================
const docentes = JSON.parse(localStorage.getItem("docentes")) || [];
let docenteActivo = JSON.parse(localStorage.getItem("docenteActivo"));

const loginBox = document.getElementById("loginDocente");
const panel = document.getElementById("panelDocente");
const saludo = document.getElementById("saludo");
const errorLogin = document.getElementById("errorLogin");

function loginDocente() {
  const user = usuario.value.trim();
  const pass = clave.value.trim();

  const docente = docentes.find(d => d.dni === user && d.clave === pass);
  if (!docente) {
    errorLogin.textContent = "Usuario o contraseña incorrectos";
    return;
  }

  localStorage.setItem("docenteActivo", JSON.stringify(docente));
  location.reload();
}

if (docenteActivo) {
  loginBox.classList.add("oculto");
  panel.classList.remove("oculto");
  saludo.textContent = `Bienvenido, ${docenteActivo.nombre}`;
}

// ================= CLASES =================
const clases = JSON.parse(localStorage.getItem("clases_docente")) || [];
const tabla = document.getElementById("tablaClases");
const tbody = tabla.querySelector("tbody");
const sinClases = document.getElementById("sinClases");
const form = document.getElementById("formularioClase");

function mostrarFormulario() {
  form.classList.remove("oculto");
  tabla.parentElement.classList.add("oculto");
}

function volverATabla() {
  form.classList.add("oculto");
  tabla.parentElement.classList.remove("oculto");
}

function guardarClase() {
  if (!grado.value || !seccion.value || !titulo.value) return;

  clases.push({
    grado: grado.value,
    seccion: seccion.value,
    titulo: titulo.value,
    estado: "Registrada"
  });

  localStorage.setItem("clases_docente", JSON.stringify(clases));
  form.reset();
  volverATabla();
  renderTabla();
}

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
        <td>${c.titulo}</td>
        <td>${c.estado}</td>
        <td class="acciones">
          <button class="activar" onclick="cambiarEstado(${i},'Activa')">Activar</button>
          <button class="desarrollada" onclick="cambiarEstado(${i},'Desarrollada')">✔</button>
          <button class="eliminar" onclick="eliminar(${i})">✖</button>
        </td>
      </tr>`;
  });
}

function cambiarEstado(i, estado) {
  clases[i].estado = estado;
  localStorage.setItem("clases_docente", JSON.stringify(clases));
  renderTabla();
}

function eliminar(i) {
  clases.splice(i, 1);
  localStorage.setItem("clases_docente", JSON.stringify(clases));
  renderTabla();
}

renderTabla();

// ================= IA HEADER =================
const avatarIA = document.querySelector(".avatar-ia");
const mensajeIA = document.getElementById("mensaje-ia");

avatarIA.addEventListener("click", () => {
  mensajeIA.textContent =
    "Aquí puedes registrar, activar y gestionar tus clases.";
});
