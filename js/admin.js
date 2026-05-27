const CODIGO_ADMIN = "PROYECTOJBS";
let docentes = JSON.parse(localStorage.getItem("docentes")) || [];

function verificarCodigo() {
  const codigo = document.getElementById("codigoAdmin").value;

  if (codigo === CODIGO_ADMIN) {
    document.getElementById("loginAdmin").style.display = "none";
    document.getElementById("panelAdmin").classList.remove("oculto");
    cargarDocentes();
  } else {
    document.getElementById("errorLogin").innerText = "Código incorrecto";
  }
}

function registrarDocente() {
  const dni = document.getElementById("dni").value;
  const nombre = document.getElementById("nombre").value;
  const especialidad = document.getElementById("especialidad").value;
  const correo = document.getElementById("correo").value;

  if (!dni || !nombre || !especialidad || !correo) {
    alert("Complete todos los campos");
    return;
  }

  docentes.push({ dni, nombre, especialidad, correo });
  localStorage.setItem("docentes", JSON.stringify(docentes));

  limpiarFormulario();
  cargarDocentes();
}

function cargarDocentes() {
  const tabla = document.getElementById("tablaDocentes");
  tabla.innerHTML = "";

  docentes.forEach((docente, index) => {
    tabla.innerHTML += `
      <tr>
        <td>${docente.dni}</td>
        <td>${docente.nombre}</td>
        <td>${docente.especialidad}</td>
        <td>${docente.correo}</td>
        <td>
          <button onclick="eliminarDocente(${index})">Eliminar</button>
        </td>
      </tr>
    `;
  });
}

function eliminarDocente(index) {
  if (confirm("¿Eliminar docente?")) {
    docentes.splice(index, 1);
    localStorage.setItem("docentes", JSON.stringify(docentes));
    cargarDocentes();
  }
}

function limpiarFormulario() {
  document.getElementById("dni").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("especialidad").value = "";
  document.getElementById("correo").value = "";
}
