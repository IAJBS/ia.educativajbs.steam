/* ======================================================
   PLATAFORMA EDUCATIVA CON IA
   PANEL DOCENTE VERSIÓN 2.0
====================================================== */

/* ======================================================
   VARIABLES GLOBALES
====================================================== */

let docenteActivo = null;

let clases = [];

let editandoClase = null;

let modoVistaPrevia = false;

/* ======================================================
   ELEMENTOS DEL DOM
====================================================== */

const loginDocente =
document.getElementById("loginDocente");

const panelDocente =
document.getElementById("panelDocente");

const formularioClase =
document.getElementById("formularioClase");

const panelResultados =
document.getElementById("panelResultados");

const panelIA =
document.getElementById("panelIA");

const panelPerfil =
document.getElementById("panelPerfil");

const saludo =
document.getElementById("saludo");

/* ======================================================
   INICIALIZAR SISTEMA
====================================================== */

window.addEventListener(
    "DOMContentLoaded",
    iniciarSistema
);

/* ======================================================
   INICIAR SISTEMA
====================================================== */

function iniciarSistema() {

    verificarSesion();

}

/* ======================================================
   VERIFICAR SESIÓN
====================================================== */

function verificarSesion() {

    const sesion =
    JSON.parse(
        sessionStorage.getItem("docenteActivo")
    );

    if(!sesion){

        mostrarLogin();

        return;

    }

    docenteActivo = sesion;

    cargarClases();

    mostrarPanelPrincipal();

}

/* ======================================================
   MOSTRAR LOGIN
====================================================== */

function mostrarLogin(){

    loginDocente.classList.remove("oculto");

    panelDocente.classList.add("oculto");

}

/* ======================================================
   MOSTRAR PANEL
====================================================== */

function mostrarPanelPrincipal(){

    loginDocente.classList.add("oculto");

    panelDocente.classList.remove("oculto");

    saludo.textContent =
    `Bienvenido(a), ${docenteActivo.nombre}`;

    actualizarDashboard();

    llenarPerfil();

    cargarTabla();

}

/* ======================================================
   LOGIN DOCENTE
====================================================== */

function loginDocente(){

    const usuario =
    document.getElementById("usuario")
    .value.trim();

    const clave =
    document.getElementById("clave")
    .value.trim();

    const mensaje =
    document.getElementById("errorLogin");

    const docentes =
    JSON.parse(
        localStorage.getItem("docentes")
    ) || [];

    const docente =
    docentes.find(d =>

        d.usuario === usuario &&
        d.clave === clave

    );

    if(!docente){

        mensaje.textContent =
        "Usuario o contraseña incorrectos.";

        return;

    }

    mensaje.textContent = "";

    docenteActivo = docente;

    sessionStorage.setItem(

        "docenteActivo",

        JSON.stringify(docente)

    );

    cargarClases();

    mostrarPanelPrincipal();

}

/* ======================================================
   CERRAR SESIÓN
====================================================== */

function cerrarSesion(){

    if(

        !confirm(
            "¿Deseas cerrar la sesión?"
        )

    ){

        return;

    }

    sessionStorage.removeItem(
        "docenteActivo"
    );

    docenteActivo = null;

    clases = [];

    location.reload();

}

/* ======================================================
   CARGAR CLASES
====================================================== */

function cargarClases(){

    if(!docenteActivo) return;

    const key =
    `clases_${docenteActivo.usuario}`;

    clases =
    JSON.parse(

        localStorage.getItem(key)

    ) || [];

}

/* ======================================================
   GUARDAR CLASES
====================================================== */

function guardarClases(){

    if(!docenteActivo) return;

    const key =
    `clases_${docenteActivo.usuario}`;

    localStorage.setItem(

        key,

        JSON.stringify(clases)

    );

}

/* ======================================================
   DASHBOARD
====================================================== */

function actualizarDashboard(){

    document.getElementById(
        "totalClases"
    ).textContent =
    clases.length;

    document.getElementById(
        "clasesActivas"
    ).textContent =

    clases.filter(c =>

        c.estado === "Activa"

    ).length;

    const participaciones =

    JSON.parse(

        localStorage.getItem(
            "participacionesCYT"
        )

    ) || [];

    document.getElementById(
        "participaciones"
    ).textContent =

    participaciones.filter(p =>

        p.docente ===
        docenteActivo.nombre

    ).length;

}

/* ======================================================
   PERFIL DOCENTE
====================================================== */

function llenarPerfil(){

    document.getElementById(
        "perfilNombre"
    ).textContent =
    docenteActivo.nombre;

    document.getElementById(
        "perfilUsuario"
    ).textContent =
    docenteActivo.usuario;

    document.getElementById(
        "perfilArea"
    ).textContent =
    docenteActivo.area;

}

/* ======================================================
   MOSTRAR FORMULARIO
====================================================== */

function mostrarFormulario(){

    formularioClase
    .classList
    .remove("oculto");

    panelResultados
    .classList
    .add("oculto");

    if(panelIA)
    panelIA.classList.add("oculto");

    if(panelPerfil)
    panelPerfil.classList.add("oculto");

}

/* ======================================================
   VOLVER A LA TABLA
====================================================== */

function volverATabla(){

    formularioClase
    .classList
    .add("oculto");

    limpiarFormulario();

}

/* ======================================================
   LIMPIAR FORMULARIO
====================================================== */

function limpiarFormulario(){

    editandoClase = null;

    document.getElementById("grado").value = "";

    document.getElementById("seccion").value = "";

    document.getElementById("tema").value = "";

    document.getElementById("titulo").value = "";

    document.getElementById("explora").value = "";

    document.getElementById("analiza").value = "";

    document.getElementById("disena").value = "";

    document.getElementById("comprueba").value = "";

    document.getElementById("comunica").value = "";

    document.getElementById("reflexiona").value = "";

    document.getElementById("proposito").value = "";

    document.getElementById("criterios").value = "";

    document.getElementById("producto").value = "";

}

/* ======================================================
   LA PARTE 2 CONTINÚA DESDE AQUÍ
====================================================== */
/* ======================================================
   GUARDAR CLASE
====================================================== */

function guardarClase(){

    const grado =
    document.getElementById("grado").value.trim();

    const seccion =
    document.getElementById("seccion").value.trim();

    const tema =
    document.getElementById("tema").value.trim();

    const titulo =
    document.getElementById("titulo").value.trim();

    const explora =
    document.getElementById("explora").value.trim();

    const analiza =
    document.getElementById("analiza").value.trim();

    const disena =
    document.getElementById("disena").value.trim();

    const comprueba =
    document.getElementById("comprueba").value.trim();

    const comunica =
    document.getElementById("comunica").value.trim();

    const reflexiona =
    document.getElementById("reflexiona").value.trim();

    const proposito =
    document.getElementById("proposito").value.trim();

    const criterios =
    document.getElementById("criterios").value.trim();

    const producto =
    document.getElementById("producto").value.trim();

    if(

        grado==="" ||

        seccion==="" ||

        tema==="" ||

        titulo===""

    ){

        alert(
            "Complete la información general."
        );

        return;

    }

    const datosClase={

        idClase:

        editandoClase
        ?
        clases[editandoClase].idClase
        :
        Date.now(),

        grado,

        seccion,

        tema,

        titulo,

        explora,

        analiza,

        disena,

        comprueba,

        comunica,

        reflexiona,

        proposito,

        criterios,

        producto,

        docente:
        docenteActivo.nombre,

        usuario:
        docenteActivo.usuario,

        area:
        docenteActivo.area,

        estado:

        editandoClase!=null

        ?

        clases[editandoClase].estado

        :

        "Registrada",

        codigoClase:

        editandoClase!=null

        ?

        clases[editandoClase].codigoClase

        :

        ""

    };

    if(editandoClase==null){

        clases.push(datosClase);

    }

    else{

        clases[editandoClase]=datosClase;

    }

    guardarClases();

    cargarTabla();

    actualizarDashboard();

    volverATabla();

}

/* ======================================================
   EDITAR
====================================================== */

function editarClase(indice){

    editandoClase=indice;

    const c=clases[indice];

    mostrarFormulario();

    document.getElementById("grado").value=c.grado;

    document.getElementById("seccion").value=c.seccion;

    document.getElementById("tema").value=c.tema;

    document.getElementById("titulo").value=c.titulo;

    document.getElementById("explora").value=c.explora||"";

    document.getElementById("analiza").value=c.analiza||"";

    document.getElementById("disena").value=c.disena||"";

    document.getElementById("comprueba").value=c.comprueba||"";

    document.getElementById("comunica").value=c.comunica||"";

    document.getElementById("reflexiona").value=c.reflexiona||"";

    document.getElementById("proposito").value=c.proposito||"";

    document.getElementById("criterios").value=c.criterios||"";

    document.getElementById("producto").value=c.producto||"";

}

/* ======================================================
   DUPLICAR
====================================================== */

function duplicarClase(indice){

    const copia={

        ...clases[indice]

    };

    copia.idClase=Date.now();

    copia.estado="Registrada";

    copia.codigoClase="";

    copia.titulo+=" (Copia)";

    clases.push(copia);

    guardarClases();

    cargarTabla();

    actualizarDashboard();

}

/* ======================================================
   ELIMINAR
====================================================== */

function eliminarClase(indice){

    if(

        !confirm(

            "¿Eliminar esta clase?"

        )

    ){

        return;

    }

    clases.splice(

        indice,

        1

    );

    guardarClases();

    cargarTabla();

    actualizarDashboard();

}

/* ======================================================
   VISTA PREVIA
====================================================== */

function vistaPrevia(indice){

    const c=clases[indice];

    alert(

`TÍTULO

${c.titulo}

TEMA

${c.tema}

PROPÓSITO

${c.proposito}

CRITERIOS

${c.criterios}`

    );

}

/* ======================================================
   PARTE 3 CONTINÚA AQUÍ
====================================================== */
/* ======================================================
   GENERAR CÓDIGO DE CLASE
====================================================== */

function generarCodigoClase(){

    const letras = "ABCDEFGHJKLMNPQRSTUVWXYZ";

    let codigo = "CYT-";

    codigo += Math.floor(
        1000 + Math.random() * 9000
    );

    codigo += "-";

    codigo += letras[
        Math.floor(
            Math.random() * letras.length
        )
    ];

    codigo += letras[
        Math.floor(
            Math.random() * letras.length
        )
    ];

    return codigo;

}

/* ======================================================
   ACTIVAR CLASE
====================================================== */

function activarClase(indice){

    if(
        !confirm(
            "¿Activar esta clase?"
        )
    ){
        return;
    }

    /* Solo una clase activa por docente */

    clases.forEach(clase=>{

        if(clase.estado==="Activa"){

            clase.estado="Registrada";

            clase.codigoClase="";

        }

    });

    clases[indice].estado="Activa";

    clases[indice].codigoClase=
    generarCodigoClase();

    guardarClases();

    actualizarDashboard();

    cargarTabla();

    alert(

`Clase activada correctamente.

Código:

${clases[indice].codigoClase}

Compártelo con tus estudiantes.`

    );

}

/* ======================================================
   FINALIZAR CLASE
====================================================== */

function finalizarClase(indice){

    if(
        !confirm(
            "¿Finalizar esta clase?"
        )
    ){
        return;
    }

    clases[indice].estado="Desarrollada";

    guardarClases();

    actualizarDashboard();

    cargarTabla();

}

/* ======================================================
   CARGAR TABLA
====================================================== */

function cargarTabla(){

    const tabla =
    document.querySelector(
        "#tablaClases tbody"
    );

    const mensaje =
    document.getElementById(
        "sinClases"
    );

    const tablaCompleta =
    document.getElementById(
        "tablaClases"
    );

    tabla.innerHTML="";

    if(clases.length===0){

        tablaCompleta.classList.add(
            "oculto"
        );

        mensaje.textContent=
        "No existen clases registradas.";

        return;

    }

    mensaje.textContent="";

    tablaCompleta.classList.remove(
        "oculto"
    );

    clases.forEach((clase,indice)=>{

        let colorEstado="";

        switch(clase.estado){

            case "Activa":

                colorEstado=
                "🟢 Activa";

                break;

            case "Desarrollada":

                colorEstado=
                "🔵 Desarrollada";

                break;

            default:

                colorEstado=
                "⚪ Registrada";

        }

        tabla.innerHTML += `

<tr>

<td>

${colorEstado}

</td>

<td>

${clase.grado}

</td>

<td>

${clase.seccion}

</td>

<td>

${clase.tema}

</td>

<td>

${clase.titulo}

</td>

<td>

<button
onclick="editarClase(${indice})">

Editar

</button>

<button
onclick="duplicarClase(${indice})">

Duplicar

</button>

<button
onclick="vistaPrevia(${indice})">

Vista previa

</button>

<button
onclick="activarClase(${indice})">

Activar

</button>

<button
onclick="finalizarClase(${indice})">

Finalizar

</button>

<button
onclick="eliminarClase(${indice})">

Eliminar

</button>

</td>

</tr>

`;

    });

}

/* ======================================================
   BUSCADOR
====================================================== */

const buscador =
document.getElementById(
    "buscarClase"
);

if(buscador){

buscador.addEventListener(
"keyup",
filtrarTabla
);

}

/* ======================================================
   FILTRO ESTADO
====================================================== */

const filtroEstado =
document.getElementById(
    "filtroEstado"
);

if(filtroEstado){

filtroEstado.addEventListener(
"change",
filtrarTabla
);

}

/* ======================================================
   FILTRAR TABLA
====================================================== */

function filtrarTabla(){

    const texto=
    document
    .getElementById("buscarClase")
    .value
    .toLowerCase();

    const estado=
    document
    .getElementById("filtroEstado")
    .value;

    const filas=
    document.querySelectorAll(
        "#tablaClases tbody tr"
    );

    filas.forEach((fila,i)=>{

        const clase=clases[i];

        let visible=true;

        if(

            texto!=="" &&

            !clase.tema
            .toLowerCase()
            .includes(texto)

            &&

            !clase.titulo
            .toLowerCase()
            .includes(texto)

        ){

            visible=false;

        }

        if(

            estado!=="" &&

            clase.estado!==estado

        ){

            visible=false;

        }

        fila.style.display=

        visible

        ?

        ""

        :

        "none";

    });

}

/* ======================================================
   PARTE 4 CONTINÚA DESDE AQUÍ
====================================================== */
/* ======================================================
   VER RESULTADOS
====================================================== */

function verResultados(){

    panelResultados.classList.remove(
        "oculto"
    );

    formularioClase.classList.add(
        "oculto"
    );

    if(panelIA)
    panelIA.classList.add("oculto");

    cargarResultados();

}

/* ======================================================
   CERRAR RESULTADOS
====================================================== */

function cerrarResultados(){

    panelResultados.classList.add(
        "oculto"
    );

}

/* ======================================================
   CARGAR RESULTADOS
====================================================== */

function cargarResultados(){

    const tabla=

    document.querySelector(
        "#tablaResultados tbody"
    );

    tabla.innerHTML="";

    const participaciones=

    JSON.parse(

        localStorage.getItem(
            "participacionesCYT"
        )

    ) || [];

    const resultados=

    participaciones.filter(

        p=>p.docente===docenteActivo.nombre

    );

    if(resultados.length===0){

        tabla.innerHTML=`

<tr>

<td colspan="5">

No existen participaciones registradas.

</td>

</tr>

`;

        return;

    }

    resultados.forEach(registro=>{

        tabla.innerHTML+=`

<tr>

<td>

${registro.estudiante}

</td>

<td>

${registro.clase}

</td>

<td>

${registro.tema}

</td>

<td>

${registro.fecha}

</td>

<td>

${registro.completo
?
"✅ Completa"
:
"⏳ Pendiente"}

</td>

</tr>

`;

    });

}

/* ======================================================
   EXPORTAR RESULTADOS
====================================================== */

function exportarResultados(){

    const datos=

    JSON.parse(

        localStorage.getItem(
            "participacionesCYT"
        )

    ) || [];

    const contenido=

    JSON.stringify(

        datos,

        null,

        4

    );

    const archivo=

    new Blob(

        [contenido],

        {

            type:"application/json"

        }

    );

    const enlace=

    document.createElement("a");

    enlace.href=

    URL.createObjectURL(

        archivo

    );

    enlace.download=

    "participaciones.json";

    enlace.click();

}

/* ======================================================
   HISTORIAL
====================================================== */

function verHistorial(){

    alert(

`Próximamente podrás visualizar:

• Clases desarrolladas

• Clases activas

• Resultados históricos

• Estadísticas

• Reportes por estudiante

• Reportes por sesión`

    );

}

/* ======================================================
   IA DOCENTE
====================================================== */

function abrirIADocente(){

    if(panelIA){

        panelIA.classList.remove(
            "oculto"
        );

    }

}

/* ======================================================
   GENERADORES IA
====================================================== */

function generarExploraIA(){

    alert(
        "Próximamente conectado con IA."
    );

}

function generarAnalizaIA(){

    alert(
        "Próximamente conectado con IA."
    );

}

function generarDisenaIA(){

    alert(
        "Próximamente conectado con IA."
    );

}

function generarCompruebaIA(){

    alert(
        "Próximamente conectado con IA."
    );

}

function generarComunicaIA(){

    alert(
        "Próximamente conectado con IA."
    );

}

function generarReflexionaIA(){

    alert(
        "Próximamente conectado con IA."
    );

}

function generarPropositoIA(){

    alert(
        "Próximamente conectado con IA."
    );

}

function generarCriteriosIA(){

    alert(
        "Próximamente conectado con IA."
    );

}

/* ======================================================
   TEMPORIZADOR DE INACTIVIDAD
====================================================== */

const TIEMPO_INACTIVIDAD =
5*60*1000;

let temporizador;

function reiniciarTemporizador(){

    clearTimeout(
        temporizador
    );

    temporizador=

    setTimeout(()=>{

        alert(

        "La sesión expiró por inactividad."

        );

        cerrarSesion();

    },

    TIEMPO_INACTIVIDAD);

}

document.addEventListener(

    "click",

    reiniciarTemporizador

);

document.addEventListener(

    "keypress",

    reiniciarTemporizador

);

reiniciarTemporizador();

/* ======================================================
   INICIALIZACIÓN
====================================================== */

cargarTabla();

actualizarDashboard();

/* ======================================================
   FIN DEL PANEL DOCENTE V2.0
====================================================== */
