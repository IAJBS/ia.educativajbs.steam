const docente = JSON.parse(localStorage.getItem("docente_logueado")) || {
  nombre: "Docente"
};

const clases = JSON.parse(localStorage.getItem("clases_docente")) || [];

const saludo = document.getElementById("saludo");
const tabla = document.getElementById("tablaClases");
const tbody = tabla.querySelector("tbody");
const sinClases = document.getElementById("sinClases");

saludo.textContent = `Bienvenido, ${docente.nombre}`;

function mostrarFormulario() {
  document.getElementById("formularioClase").classList.toggle("oculto");
}

function guardarClase() {
  const clase = {
    grado: grado.value,
    seccion: seccion.value,
    titulo: titulo.value,
    estado: "Registrada"
  };

  clases.push(clase);
  localStorage.setItem("clases_docente", JSON.stringify(clases));

  document.getElementById("formularioClase").reset;
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
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${c.grado}</td>
      <td>${c.seccion}</td>
      <td>${c.titulo}</td>
      <td>${c.estado}</td>
      <td class="acciones">
        <button class="activar" onclick="activar(${i})">Activar</button>
        <button class="desarrollada" onclick="desarrollar(${i})">✔</button>
        <button class="eliminar" onclick="eliminar(${i})">✖</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

function activar(i) {
  clases[i].estado = "Activa";
  renderTabla();
}

function desarrollar(i) {
  clases[i].estado = "Desarrollada";
  renderTabla();
}

function eliminar(i) {
  clases.splice(i, 1);
  localStorage.setItem("clases_docente", JSON.stringify(clases));
  renderTabla();
}

renderTabla();
// ================= IA HEADER DOCENTE =================

const avatarIA = document.querySelector(".avatar-ia");
const mensajeIA = document.getElementById("mensaje-ia");

if (avatarIA && mensajeIA) {
  avatarIA.addEventListener("click", () => {
    mensajeIA.textContent =
      "Aquí puedes registrar, activar y gestionar tus clases.";
  });
}
