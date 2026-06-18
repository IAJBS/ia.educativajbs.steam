function seleccionarArea(area) {
  localStorage.setItem("areaElegida", area);
}

const mensajeIA = document.getElementById("mensaje-ia");
const area = localStorage.getItem("areaElegida");

if (area === "cyt") {
  mensajeIA.textContent = "🔵 Explora, experimenta y pregunta";
} else if (area) {
  mensajeIA.textContent = "✨ Continúa aprendiendo en tu área";
}
