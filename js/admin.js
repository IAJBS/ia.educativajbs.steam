// ================= CREDENCIALES =================
const USUARIO_ADMIN = "DIRECTIVOJBS";
const CLAVE_ADMIN = "PROYECTOJBS";

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

// ================= SESIÓN =================
function login() {
  const u = usuario.value.trim();
  const c = clave.value.trim();

  if (u === USUARIO_ADMIN && c === CLAVE_ADMIN) {
    localStorage.setItem("adminActivo", "true");
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
  localStorage.removeItem("adminActivo");
  location.reload();
}

// ================= INICIAL =================
if (localStorage.getItem("adminActivo")) {
  iniciarSesion();
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
  const area = document.getElementById("area").value;
  const ept = document.getElementById("especialidadEPT");

  if (area === "Educación para el Trabajo") {
    ept.classList.remove("oculto");
  } else {
    ept.classList.add("oculto");
    ept.value = "";
  }
}

// ================= REGISTRAR =================
function agregarDocente() {
  const dni = dniInput.value || dni.value;
  const nombreDoc = nombre.value;
  const correoDoc = correo.value;
  const celularDoc = celular.value;
  const areaDoc = area.value;
  const especialidad = especialidadEPT.value;

  if (!dni || !nombreDoc || !correoDoc || !celularDoc || !areaDoc) {
    alert("Completa todos los campos");
    return;
  }

  if (areaDoc === "Educación para el Trabajo" && !especialidad) {
    alert("Selecciona especialidad EPT");
    return;
  }

  docentes.push({
    dni,
    nombre: nombreDoc,
    correo: correoDoc,
    celular: celularDoc,
    area: areaDoc,
    especialidad: areaDoc === "Educación para el Trabajo" ? especialidad : "-",
    usuario: dni,
    password: dni + "JBS"
  });

  localStorage.setItem("docentes", JSON.stringify(docentes));
  limpiar();
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
    tbody.innerHTML += `
      <tr>
        <td>${d.dni}</td>
        <td>${d.nombre}</td>
        <td>${d.area}</td>
        <td>${d.especialidad}</td>
        <td>${d.usuario}</td>
        <td>${d.password}</td>
        <td>
          <button class="eliminar" onclick="eliminar(${i})">✖</button>
        </td>
      </tr>
    `;
  });
}

function eliminar(i) {
  docentes.splice(i, 1);
  localStorage.setItem("docentes", JSON.stringify(docentes));
  cargarDocentes();
}

// ================= LIMPIAR =================
function limpiar() {
  dni.value = "";
  nombre.value = "";
  correo.value = "";
  celular.value = "";
  area.value = "";
  especialidadEPT.value = "";
  especialidadEPT.classList.add("oculto");
}
