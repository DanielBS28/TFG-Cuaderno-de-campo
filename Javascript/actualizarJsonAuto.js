const botonActualizar = document.getElementById("automatica");

async function iniciarPollingEstado() {
  const intervalId = setInterval(async () => {
    try {
      const estadoRes = await fetch("http://localhost:3000/productos_y_usos/estado_proceso");
      const estadoData = await estadoRes.json();
      console.log("Estado actual:", estadoData.estado);

      if (estadoData.estado === "completado") {
        clearInterval(intervalId);
        alert("El proceso ha finalizado correctamente.");
        botonActualizar.disabled = false;
        botonActualizar.textContent = "Actualizar JSON";
        sessionStorage.removeItem("esperandoProcesoJson");
      } else if (estadoData.estado === "fallido") {
        clearInterval(intervalId);
        alert("El proceso ha fallado. Consulta la consola del servidor.");
        botonActualizar.disabled = false;
        botonActualizar.textContent = "Actualizar JSON";
        sessionStorage.removeItem("esperandoProcesoJson");
      } else if (estadoData.estado === "idle") {
        clearInterval(intervalId);
        alert("Ha ocurrido un error inesperado. Por favor, intentelo de nuevo.");
        botonActualizar.disabled = false;
        botonActualizar.textContent = "Actualizar JSON";
        sessionStorage.removeItem("esperandoProcesoJson");
      }
    } catch (err) {
      clearInterval(intervalId);
      alert("Error al consultar el estado del proceso.");
      console.error(err);
      botonActualizar.disabled = false;
      botonActualizar.textContent = "Actualizar JSON";
      sessionStorage.removeItem("esperandoProcesoJson");
    }
  }, 5000);
}

botonActualizar.addEventListener("click", async (event) => {
  event.preventDefault();

  if (!confirm("¿Seguro que deseas actualizar el JSON automáticamente?")) return;

  botonActualizar.disabled = true;
  botonActualizar.textContent = "Procesando...";
  sessionStorage.setItem("esperandoProcesoJson", "true");

  try {
    const response = await fetch("http://localhost:3000/productos_y_usos/automatizar_json");
    const data = await response.json();

    alert(data.message);
    iniciarPollingEstado();
  } catch (err) {
    alert("Error de red o servidor al iniciar el proceso.");
    console.error(err);
    botonActualizar.disabled = false;
    botonActualizar.textContent = "Actualizar JSON";
    sessionStorage.removeItem("esperandoProcesoJson");
  }
});

window.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("esperandoProcesoJson") === "true") {
    botonActualizar.disabled = true;
    botonActualizar.textContent = "Procesando...";
    iniciarPollingEstado();
  }
});
