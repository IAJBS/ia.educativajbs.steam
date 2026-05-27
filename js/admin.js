const USUARIO = "DIRECTIVOJBS";
const CLAVE = "PROYECTOJBS";

let docentes = JSON.parse(localStorage.getItem("docentes")) || [];

function login() {
  const u = document.getElementById("usuario").value;
  const c = document.getElementById("clave").value;

  if (u === USUARIO && c === CLAVE) {
    document.getElementById("login").classList.add("oculto");
    document.getElementById("panel").classList.remove("oculto");
    cargarDocentes();
  } else {
    document.getElementById("error").textContent = "Acceso incorrecto";
  }
}

function agregarDocente() {
  const dni = document.getElementById("dni").value;
  const nombre = document.getElementById("nombre").value;
  const especialidad = document.getElementById("especialidad").value;
  const correo = document.getElementById("correo").value;

  docentes.push({ dni, nombre, especialidad, correo });

  localStorage.setItem("docentes", JSON.stringify(docentes));

  cargarDocentes();
}

function cargarDocentes() {
  const tabla = document.getElementById("listaDocentes");

  tabla.innerHTML = "";

  docentes.forEach((d, i) => {
    tabla.innerHTML += `
      <tr>
        <td>${d.dni}</td>
        <td>${d.nombre}</td>
        <td>${d.especialidad}</td>
        <td>${d.correo}</td>
        <td><button onclick="eliminar(${i})">Eliminar</button></td>
      </tr>
    `;
  });
}

function eliminar(i) {
  docentes.splice(i, 1);
  localStorage.setItem("docentes", JSON.stringify(docentes));
  cargarDocentes();
}
