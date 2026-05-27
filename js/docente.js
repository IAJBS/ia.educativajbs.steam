let clases = JSON.parse(localStorage.getItem("clases_docente")) || [];

const tabla = document.getElementById("tablaClases");
const btnGuardar = document.getElementById("guardarClase");

btnGuardar.addEventListener("click", () => {
  const clase = {
    grado: grado.value,
    seccion: seccion.value,
    tema: tema.value,
    titulo: titulo.value,
    proposito: proposito.value,
    criterios: criterios.value,
    estado: "Inactiva"
  };

  if (!clase.grado || !clase.seccion || !clase.titulo) {
    alert("Complete los campos obligatorios");
    return;
  }

  clases.push(clase);
  localStorage.setItem("clases_docente", JSON.stringify(clases));
  limpiarFormulario();
  renderizar();
});

function renderizar() {
  tabla.innerHTML = "";
  clases.forEach((c, i) => {
    tabla.innerHTML += `
      <tr>
        <td>${c.grado}</td>
        <td>${c.seccion}</td>
        <td>${c.titulo}</td>
        <td>${c.tema}</td>
        <td>${c.estado}</td>
        <td>
          <button onclick="activar(${i})">Activar</button>
          <button onclick="desarrollada(${i})">✔</button>
          <button onclick="eliminar(${i})">🗑</button>
        </td>
      </tr>`;
  });
}

function activar(i) {
  clases.forEach(c => c.estado = "Inactiva");
  clases[i].estado = "Activa";
  guardar();
}

function desarrollada(i) {
  clases[i].estado = "Desarrollada";
  guardar();
}

function eliminar(i) {
  clases.splice(i, 1);
  guardar();
}

function guardar() {
  localStorage.setItem("clases_docente", JSON.stringify(clases));
  renderizar();
}

function limpiarFormulario() {
  document.querySelectorAll("input, textarea, select").forEach(e => e.value = "");
}

renderizar();
