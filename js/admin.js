const USUARIO_ADMIN = "DIRECTIVOJBS";
const CLAVE_ADMIN = "PROYECTOJBS";

let docentes = JSON.parse(localStorage.getItem("docentes")) || [];

/* ================= LOGIN ================= */
function login() {
  const u = document.getElementById("usuario").value;
  const c = document.getElementById("clave").value;

  if (u === USUARIO_ADMIN && c === CLAVE_ADMIN) {
    document.getElementById("login").classList.add("oculto");
    document.getElementById("panel").classList.remove("oculto");
    cargarDocentes();
  } else {
    document.getElementById("error").textContent = "Acceso incorrecto";
  }
}

/* ================= EPT ================= */
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

/* ================= REGISTRAR ================= */
function agregarDocente() {

  const dni = document.getElementById("dni").value;
  const nombre = document.getElementById("nombre").value;
  const correo = document.getElementById("correo").value;
  const celular = document.getElementById("celular").value;
  const area = document.getElementById("area").value;
  const especialidad = document.getElementById("especialidadEPT").value;

  if (!dni || !nombre || !correo || !celular || !area) {
    alert("Completa todos los campos");
    return;
  }

  if (area === "Educación para el Trabajo" && !especialidad) {
    alert("Selecciona especialidad EPT");
    return;
  }

  const docente = {
    dni,
    nombre,
    correo,
    celular,
    area,
    especialidad: area === "Educación para el Trabajo" ? especialidad : "-",
    usuario: dni,
    password: dni + "JBS"
  };

  docentes.push(docente);
  localStorage.setItem("docentes", JSON.stringify(docentes));

  limpiar();
  cargarDocentes();
}

/* ================= LISTAR ================= */
function cargarDocentes() {

  const tabla = document.getElementById("listaDocentes");
  tabla.innerHTML = "";

  docentes.forEach((d, i) => {
    tabla.innerHTML += `
      <tr>
        <td>${d.dni}</td>
        <td>${d.nombre}</td>
        <td>${d.area}</td>
        <td>${d.especialidad}</td>
        <td>${d.usuario}</td>
        <td>${d.password}</td>
        <td><button onclick="eliminar(${i})">Eliminar</button></td>
      </tr>
    `;
  });
}

/* ================= ELIMINAR ================= */
function eliminar(i) {
  docentes.splice(i, 1);
  localStorage.setItem("docentes", JSON.stringify(docentes));
  cargarDocentes();
}

/* ================= LIMPIAR ================= */
function limpiar() {
  document.getElementById("dni").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("celular").value = "";
  document.getElementById("area").value = "";
  document.getElementById("especialidadEPT").value = "";
  document.getElementById("especialidadEPT").classList.add("oculto");
}
