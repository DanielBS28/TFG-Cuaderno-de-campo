const formDNI = document.getElementById("formulario-DNI");
const formCarnet = document.getElementById("formulario-Carnet");
const selectExplotacion = document.getElementById("seleccion");
const inputExplotacion = document.getElementById("buscar-explotacion");
let option = document.createElement("option");

const campos = {
  nombre: document.getElementById("nombre"),
  apellido1: document.getElementById("apellido1"),
  apellido2: document.getElementById("apellido2"),
  dni: document.getElementById("dni"),
  carnet: document.getElementById("carnet"),
};

// Buscar por DNI
formDNI.addEventListener("submit", async (e) => {
  e.preventDefault();
  const dni = document.getElementById("DNIBuscado").value.trim();

  if (!dni) return alert("Introduce un DNI");

  const res = await fetch(
    `http://localhost:3000/agricultores/buscar/dni/${dni}`
  );
  const data = await res.json();

  if (res.ok) {
    mostrarDatos(data);
    desbloquearSelect();
  } else {
    alert(data.error || "Agricultor no encontrado");
  }
});

// Buscar por Carnet
formCarnet.addEventListener("submit", async (e) => {
  e.preventDefault();
  const carnet = document.getElementById("CBuscado").value.trim();

  if (!carnet) return alert("Introduce un número de carnet");

  const res = await fetch(
    `http://localhost:3000/agricultores/buscar/carnet/${carnet}`
  );
  const data = await res.json();

  if (res.ok) {
    mostrarDatos(data);
    desbloquearSelect();
  } else {
    alert(data.error || "Agricultor no encontrado");
  }
});

function mostrarDatos(data) {
  campos.nombre.value = data.Nombre;
  campos.apellido1.value = data.Apellido1;
  campos.apellido2.value = data.Apellido2;
  campos.dni.value = data.dni;
  campos.carnet.value = data.carnet;
  dniAgricultor = data.dni;

  limpiarCamposExplotacion();
}

const desbloquearSelect = () => {
  selectExplotacion.disabled = false;
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
  option.value = "Selecciona una explotación";
  option.textContent = "Selecciona una explotación";

  inputExplotacion.disabled = false;
  inputExplotacion.value = "";

  // Obtener explotaciones asignadas y llenar el select
  fetch(`http://localhost:3000/agricultores/explotaciones/${campos.dni.value}`)
    .then((response) => response.json())
    .then((explotaciones) => {
      if (explotaciones.length === 0) {
        selectExplotacion.disabled = true;
        inputExplotacion.disabled = true;
        alert("Este agricultor no tiene ninguna explotación.");
        return;
      }

      explotacionesOriginales = explotaciones; // <-- Guardamos la lista original

      renderizarOpciones(explotacionesOriginales);
      limpiarCamposExplotacion();
    })
    .catch((error) => {
      console.error("Error cargando explotaciones:", error);
    });

  function renderizarOpciones(lista) {
    selectExplotacion.innerHTML =
      "<option selected disabled>Seleccionar explotación</option>";
    lista.forEach((explotacion) => {
      const option = document.createElement("option");
      option.value = explotacion.idExplotacion;
      option.textContent = `${explotacion.Nombre} | ${explotacion.Superficie_total} ha`;
      selectExplotacion.appendChild(option);
    });
  }

  // Escuchar cambios en el input para filtrar
  inputExplotacion.addEventListener("input", () => {
    const texto = inputExplotacion.value.toLowerCase();
    const filtradas = explotacionesOriginales.filter((exp) =>
      exp.Nombre.toLowerCase().includes(texto)
    );
    renderizarOpciones(filtradas);
  });
};

// Rellenar Inputs de Explotación
const campoId = document.getElementById("id-explotacion");
const campoNombre = document.getElementById("nombre-explotacion");
const campoSuperficie = document.getElementById("superficie-total");
const campoParcelas = document.getElementById("total-parcelas");

selectExplotacion.addEventListener("change", () => {
  const idSeleccionado = selectExplotacion.value;
  const seleccionada = explotacionesOriginales.find(exp => exp.idExplotacion == idSeleccionado);

  if (seleccionada) {
    campoId.value = seleccionada.idExplotacion;
    campoNombre.value = seleccionada.Nombre;
    campoSuperficie.value = `${seleccionada.Superficie_total} ha`;

    // Obtener parcelas
    fetch(`http://localhost:3000/explotaciones/parcelas/${idSeleccionado}`)
      .then(res => res.json())
      .then(data => {
        campoParcelas.value = data.total;
      })
      .catch(err => {
        console.error("Error al obtener parcelas:", err);
        campoParcelas.value = "—";
      });
  }
});

// Eliminar Explotación
const formBaja = document.querySelector(".form-container form");

formBaja.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = campoId.value;

  if (!id) {
    alert("Debe seleccionar una explotación válida antes de darla de baja.");
    return;
  }

  const confirmacion = confirm("¿Está seguro que desea dar de baja esta explotación?");
  if (!confirmacion) return;

  try {
    const res = await fetch(`http://localhost:3000/explotaciones/baja/${id}`, {
      method: "DELETE"
    });

    const data = await res.json();

    if (res.ok) {
      alert("Explotación dada de baja correctamente.");

      location.reload();
    } else {
      alert(data.error || "No se pudo eliminar la explotación.");
    }
  } catch (err) {
    console.error("Error al dar de baja:", err);
    alert("Error del servidor al eliminar.");
  }
});

function limpiarCamposExplotacion() {
    campoId.value = "";
    campoNombre.value = "";
    campoSuperficie.value = "";
    campoParcelas.value = "";
    selectExplotacion.selectedIndex = 0; // volver al primer <option>
  }
  
