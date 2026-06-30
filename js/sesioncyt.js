/* ======================================================
   VARIABLES GENERALES
====================================================== */

let historial = [];

let rolSeleccionado = "";

let claseActual = JSON.parse(
  localStorage.getItem("claseSeleccionadaCYT")
);

/* ======================================================
   ELEMENTOS
====================================================== */


const inicio =
document.getElementById("inicio");

const activacion =
document.getElementById("activacion");

const tutor =
document.getElementById("tutor");

const metacognicion =
document.getElementById("metacognicion");

/* ======================================================
   CARGAR DATOS DE LA CLASE
====================================================== */

window.addEventListener(
  "DOMContentLoaded",
  () => {

    if (!claseActual) {

      alert(
        "No existe una clase seleccionada."
      );

      window.location.href =
      "cyt.html";

      return;
    }

    document.getElementById(
      "seccionActiva"
    ).textContent =
    `${claseActual.grado} ${claseActual.seccion}`;

    document.getElementById(
      "temaActivo"
    ).textContent =
    claseActual.tema;

  }
);

/* ======================================================
   VALIDAR CÓDIGO DE CLASE
====================================================== */

function iniciarSesion() {

  const codigoIngresado =
  document.getElementById(
    "codigoInput"
  ).value.trim();

  if (!codigoIngresado) {

    alert(
      "Ingresa el código de clase."
    );

    return;
  }

  if (
    codigoIngresado !==
    claseActual.codigoClase
  ) {

    alert(
      "Código incorrecto."
    );

    return;
  }

  inicio.style.display = "none";

  activacion.style.display = "block";

}

/* ======================================================
   CONTINUAR HACIA EL TUTOR IA
====================================================== */

function continuarTutor() {

  activacion.style.display =
  "none";

  tutor.style.display =
  "block";

  agregarMensajeIA(
    `Bienvenido al tema:
    ${claseActual.tema}.
    
    Cuéntame:
    ¿Qué entiendes por este tema?`
  );

}

/* ======================================================
   CHAT VISUAL
====================================================== */

function agregarMensajeIA(texto) {

  const chat =
  document.getElementById(
    "chatTutor"
  );

  chat.innerHTML += `

    <div class="mensaje ia">
      🤖 ${texto}
    </div>

  `;

  chat.scrollTop =
  chat.scrollHeight;

}

function agregarMensajeAlumno(texto) {

  const chat =
  document.getElementById(
    "chatTutor"
  );

  chat.innerHTML += `

    <div class="mensaje alumno">
      👨‍🎓 ${texto}
    </div>

  `;

  chat.scrollTop =
  chat.scrollHeight;

}
/* ======================================================
   CONFIGURACIÓN IA
====================================================== */

/*
   COLOCA AQUÍ TU API KEY
*/

const API_KEY = "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";

/* ======================================================
   RESPUESTA DEL ESTUDIANTE
====================================================== */

async function responderTutor() {

  const input =
  document.getElementById(
    "respuestaTutor"
  );

  const mensaje =
  input.value.trim();

  if (!mensaje) return;

  agregarMensajeAlumno(mensaje);

  historial.push({
    role: "user",
    content: mensaje
  });

  input.value = "";

  agregarMensajeIA(
    "Pensando respuesta..."
  );

  await consultarIA();

}

/* ======================================================
   CONSULTAR IA
====================================================== */

async function consultarIA() {

  try {

    const contextoInicial = {
  role: "system",
  content: `
Eres un tutor educativo experto en el área de Ciencia y Tecnología
para estudiantes de secundaria.

Tu rol es ACOMPAÑAR el aprendizaje, no dar respuestas directas.

=== CONTEXTO DE LA CLASE ===
Área: Ciencia y Tecnología
Tema: ${claseActual.tema}
Grado: ${claseActual.grado}
Sección: ${claseActual.seccion}
Docente: ${claseActual.docente}

Propósito de la clase:
${claseActual.proposito || "No especificado"}

Criterios de evaluación:
${claseActual.criterios || "No especificados"}

=== COMPETENCIAS DEL ÁREA ===
1. Indaga mediante métodos científicos:
   - Plantea preguntas
   - Formula hipótesis
   - Analiza información
   - Evalúa resultados

2. Explica el mundo físico:
   - Usa conceptos científicos
   - Relaciona ciencia con la vida diaria

3. Diseña soluciones tecnológicas:
   - Propone ideas
   - Evalúa soluciones prácticas

=== REGLAS PEDAGÓGICAS ===
- Usa lenguaje claro, cercano y escolar.
- Formula preguntas antes de explicar.
- Guía paso a paso el razonamiento.
- No entregues respuestas finales completas.
- Promueve el pensamiento crítico y científico.
- Relaciona el tema con situaciones reales.

=== METACOGNICIÓN INTEGRADA ===
Durante toda la conversación:
- Pregunta qué piensa el estudiante y por qué.
- Haz que reflexione sobre cómo aprende.
- Invita a evaluar si su idea es correcta o necesita mejorar.
- Ayuda a reconocer errores como parte del aprendizaje.

No anuncies la metacognición como una sección.
Debe sentirse natural dentro del diálogo.

=== INICIO DE LA SESIÓN ===
Comienza la sesión saludando y preguntando:
¿Qué sabes o qué has escuchado sobre este tema?
`
};

    const mensajes = [
      contextoInicial,
      ...historial
    ];

    const respuesta =
    await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type":
          "application/json",

          Authorization:
          `Bearer ${API_KEY}`
        },

        body: JSON.stringify({

          model:
          "llama-3.3-70b-versatile",

          messages: mensajes,

          temperature: 0.7

        })
      }
    );

    const data =
    await respuesta.json();

    const textoIA =
      data.choices[0]
      .message.content;

    reemplazarPensando(
      textoIA
    );

    historial.push({

      role: "assistant",

      content: textoIA

    });

  }

  catch(error){

    console.error(error);

    reemplazarPensando(
      "Ocurrió un error al conectar con la IA."
    );

  }

}

/* ======================================================
   REEMPLAZAR MENSAJE TEMPORAL
====================================================== */

function reemplazarPensando(texto) {

  const chat =
  document.getElementById(
    "chatTutor"
  );

  const mensajes =
  chat.querySelectorAll(
    ".mensaje"
  );

  const ultimo =
  mensajes[mensajes.length - 1];

  if (
    ultimo &&
    ultimo.textContent.includes(
      "Pensando respuesta..."
    )
  ) {

    ultimo.innerHTML =
    `🤖 ${texto}`;

  }

}

/* ======================================================
   ENTER PARA ENVIAR
====================================================== */

document.addEventListener(
  "DOMContentLoaded",
  () => {

    const input =
    document.getElementById(
      "respuestaTutor"
    );

    if(!input) return;

    input.addEventListener(
      "keypress",
      function(e){

        if(e.key === "Enter"){

          responderTutor();

        }

      }
    );

  }
);
/* ======================================================
   METACOGNICIÓN
====================================================== */

function avanzarMetacognicion() {

  tutor.style.display = "none";

  metacognicion.style.display =
  "block";

  iniciarTemporizador();

}

/* ======================================================
   TEMPORIZADOR
====================================================== */

let tiempo = 60;

let intervalo;

function iniciarTemporizador() {

  const timer =
  document.getElementById("timer");

  intervalo = setInterval(() => {

    timer.textContent =
      `Tiempo restante: ${tiempo} segundos`;

    tiempo--;

    if (tiempo < 0) {

      clearInterval(intervalo);

      document.getElementById(
        "btnGuardar"
      ).disabled = false;

      timer.textContent =
        "Puedes guardar tus respuestas.";

    }

  }, 1000);

}

/* ======================================================
   GUARDAR RESPUESTAS
====================================================== */

function guardarRespuestas() {

  clearInterval(intervalo);

  mostrarFormularioFinal();

}

/* ======================================================
   FORMULARIO FINAL
====================================================== */

function mostrarFormularioFinal() {

  metacognicion.innerHTML = `

    <h2>Registro de participación</h2>

    <p>
      Completa tus datos para registrar
      tu participación en la sesión.
    </p>

    <input
      type="text"
      id="nombreEstudiante"
      placeholder="Nombre o código"
    >

    <input
      type="text"
      id="gradoEstudiante"
      placeholder="Grado"
      value="${claseActual.grado}"
    >

    <input
      type="text"
      id="seccionEstudiante"
      placeholder="Sección"
      value="${claseActual.seccion}"
    >

    <button onclick="registrarParticipacion()">
      Finalizar sesión
    </button>

  `;

}

/* ======================================================
   REGISTRAR PARTICIPACIÓN
====================================================== */

function registrarParticipacion() {

  const nombre =
  document.getElementById(
    "nombreEstudiante"
  ).value.trim();

  const grado =
  document.getElementById(
    "gradoEstudiante"
  ).value.trim();

  const seccion =
  document.getElementById(
    "seccionEstudiante"
  ).value.trim();

  if (
    !nombre ||
    !grado ||
    !seccion
  ) {

    alert(
      "Completa todos los campos."
    );

    return;
  }

  const participaciones =
    JSON.parse(
      localStorage.getItem(
        "participacionesCYT"
      )
    ) || [];

  participaciones.push({

    estudiante: nombre,

    grado: grado,

    seccion: seccion,

    clase: claseActual.titulo,

    tema: claseActual.tema,

    docente: claseActual.docente,

    fecha:
      new Date()
      .toLocaleString(),

    completo: true,

    resumenDescargado: false

  });

  localStorage.setItem(
    "participacionesCYT",
    JSON.stringify(
      participaciones
    )
  );

  metacognicion.innerHTML = `

    <h2>
      ✅ Participación registrada
    </h2>

    <p>
      Gracias por participar
      en la sesión.
    </p>

  `;

}
