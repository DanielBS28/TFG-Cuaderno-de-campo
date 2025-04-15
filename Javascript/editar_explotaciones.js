const formDNI = document.getElementById("formulario-DNI");
const formCarnet = document.getElementById("formulario-Carnet");
const selectExplotacion = document.getElementById("seleccion");
const inputBuscarExplotacion = document.getElementById("buscar-explotacion");
const inputNombreExplotacion = document.getElementById("nombre-explotacion");
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
}

const desbloquearSelect = () => {
  selectExplotacion.disabled = false;
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
  option.value = "Selecciona una explotación";
  option.textContent = "Selecciona una explotación";

  inputBuscarExplotacion.disabled = false;
  inputBuscarExplotacion.value = "";

  // Obtener explotaciones asignadas y llenar el select
  fetch(`http://localhost:3000/agricultores/explotaciones/${campos.dni.value}`)
    .then((response) => response.json())
    .then((explotaciones) => {
      if (explotaciones.length === 0) {
        selectExplotacion.disabled = true;
        inputBuscarExplotacion.disabled = true;
        alert("Este agricultor no tiene ninguna explotación.");
        return;
      }

      explotacionesOriginales = explotaciones; // lista original

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
  inputBuscarExplotacion.addEventListener("input", () => {
    const texto = inputBuscarExplotacion.value.toLowerCase();
    const filtradas = explotacionesOriginales.filter((exp) =>
      exp.Nombre.toLowerCase().includes(texto)
    );
    renderizarOpciones(filtradas);
  });
};

selectExplotacion.addEventListener("change", (e) => {
  const idSeleccionado = selectExplotacion.value;
  const seleccionada = explotacionesOriginales.find(
    (exp) => exp.idExplotacion == idSeleccionado
  );

  if (seleccionada) {
    inputNombreExplotacion.disabled = false;
    inputNombreExplotacion.value = seleccionada.Nombre;
  }
});

function limpiarCamposExplotacion() {
  inputNombreExplotacion.disabled = true;
  inputNombreExplotacion.value = "";
}

const formEditar = document.querySelector(".form-container form");

formEditar.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = selectExplotacion.value;

  if (!id) {
    alert("Debe seleccionar una explotación válida antes de darla de baja.");
    return;
  }

  const nuevoNombre = inputNombreExplotacion.value.trim();

  if (!nuevoNombre) {
    alert("El nombre de la explotación no puede estar vacío.");
    return;
  }

  const confirmacion = confirm(
    "¿Está seguro que desea editar el nombre de esta explotación?"
  );
  if (!confirmacion) return;

  try {
    const res = await fetch(
      `http://localhost:3000/explotaciones/editar/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre: nuevoNombre }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Nombre de la explotación actualizado correctamente.");

      location.reload();
    } else {
      alert(data.error || "No se pudo actualizar el nombre de la explotación.");
    }
  } catch (err) {
    console.error("Error al actualizar.:", err);
    alert("Error del servidor al actualizar.");
  }
});
