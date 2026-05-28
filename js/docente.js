// ================= DATOS BASE =================
const docentes = JSON.parse(localStorage.getItem("docentes")) || [];
const clases = JSON.parse(localStorage.getItem("clases_docente")) || [];

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
// Siempre mostrar login al cargar
loginBox.classList.remove("oculto");
panel.classList.add("oculto");
localStorage.removeItem("docenteActivo");

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

  // Guardar sesión
  localStorage.setItem("docenteActivo", JSON.stringify(docente));

  // Mostrar panel
  loginBox.classList.add("oculto");
  panel.classList.remove("oculto");
  saludo.textContent = `Bienvenido, ${docente.nombre}`;

  errorLogin.textContent = "";
}

// ================= CERRAR SESIÓN =================
function cerrarSesion() {
  localStorage.removeItem("docenteActivo");
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
    estado: "Registrada"
  };

  clases.push(nuevaClase);
  localStorage.setItem("clases_docente", JSON.stringify(clases));

  // Limpiar formulario
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
        <button class="eliminar" onclick="eliminar(${i})">✖</button>
      </td>
    `;
    tbody.appendChild(fila);
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

// ================= INICIAL =================
renderTabla();
