const inputBuscarAgricultor = document.getElementById("busqueda-agricultor");
const selectAgricultor = document.getElementById("seleccion-agricultor");

const camposAgricultor = {
  nombre: document.getElementById("nombre"),
  apellido1: document.getElementById("apellido1"),
  apellido2: document.getElementById("apellido2"),
  dni: document.getElementById("dni"),
  carnet: document.getElementById("carnet"),
};

let dniAgricultor = null;

const selectExplotacion = document.getElementById("seleccion");
const inputExplotacion = document.getElementById("buscar-explotacion");
let option = document.createElement("option");

const camposExplotacion = {
  id: document.getElementById("id-explotacion"),
  nombre: document.getElementById("nombre-explotacion"),
  superficie: document.getElementById("superficie-total"),
  parcelas: document.getElementById("total-parcelas"),
};

const formBaja = document.querySelector(".form-container form");

// ### FUNCIONES ###
const limpiarCamposExplotacion = () => {
  camposExplotacion.id.value = "";
  camposExplotacion.nombre.value = "";
  camposExplotacion.superficie.value = "";
  camposExplotacion.parcelas.value = "";
  selectExplotacion.selectedIndex = 0; // volver al primer <option>
};

const mostrarDatosAgricultor = (data) => {
  camposAgricultor.nombre.value = data.Nombre;
  camposAgricultor.apellido1.value = data.Apellido1;
  camposAgricultor.apellido2.value = data.Apellido2;
  camposAgricultor.dni.value = data.dni;
  camposAgricultor.carnet.value = data.carnet;
  dniAgricultor = data.dni;

  limpiarCamposExplotacion();
};

const actualizarSelectAgricultor = (agricultores) => {
  selectAgricultor.innerHTML = `<option value="primera_opcion" disabled selected>Seleccione el agricultor</option>`;
  agricultores.forEach((a) => {
    const opcion = document.createElement("option");
    opcion.value = a.DNI;
    opcion.textContent = `${a.Nombre} ${a.Apellido1} - ${a.DNI}`;
    selectAgricultor.appendChild(opcion);
  });
};

const actualizarSelectExplotacion = (lista) => {
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
  lista.forEach((explotacion) => {
    const option = document.createElement("option");
    option.value = explotacion.idExplotacion;
    option.textContent = `${explotacion.Nombre} | ${explotacion.Superficie_total} ha`;
    selectExplotacion.appendChild(option);
  });
};

const desbloquearExplotacion = () => {
  selectExplotacion.disabled = false;
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
  option.value = "Selecciona una explotación";
  option.textContent = "Selecciona una explotación";

  inputExplotacion.disabled = false;
  inputExplotacion.value = "";
};

// Obtener explotaciones asignadas y llenar el select
const obtenerExplotaciones = async (dniAgricultor) => {
  fetch(`http://localhost:3000/agricultores/explotaciones/${dniAgricultor}`)
    .then((response) => response.json())
    .then((explotaciones) => {
      if (explotaciones.length === 0) {
        selectExplotacion.disabled = true;
        inputExplotacion.disabled = true;
        alert("Este agricultor no tiene ninguna explotación.");
        return;
      }

      explotacionesOriginales = explotaciones; // <-- Guardamos la lista original

      actualizarSelectExplotacion(explotacionesOriginales);
      limpiarCamposExplotacion();
    })
    .catch((error) => {
      console.error("Error cargando explotaciones:", error);
    });
};

// ### EVENTOS ###
// Cargar todos los agricultores al iniciar
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("http://localhost:3000/agricultores/todos");
    const data = await res.json();
    listaAgricultores = data;
    actualizarSelectAgricultor(data);
  } catch (error) {
    console.error("Error al cargar agricultores:", error);
  }
});

// Mostrar datos al seleccionar
selectAgricultor.addEventListener("change", async (e) => {
  const dniSeleccionado = e.target.value;
  if (!dniSeleccionado || dniSeleccionado === "primera_opcion") return;

  try {
    const res = await fetch(
      `http://localhost:3000/agricultores/buscar/dni/${dniSeleccionado}`
    );
    const data = await res.json();
    mostrarDatosAgricultor(data);
    desbloquearExplotacion();
    obtenerExplotaciones(dniSeleccionado);
  } catch (error) {
    alert("Error al cargar datos del agricultor.");
    console.error("Error:", error);
  }
});

// Filtro del select Agricultores
inputBuscarAgricultor.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = listaAgricultores.filter((a) =>
    `${a.Nombre} ${a.Apellido1} ${a.Apellido2} ${a.DNI}`
      .toLowerCase()
      .includes(texto)
  );
  actualizarSelectAgricultor(filtrados);
});

// Escuchar cambios en el input para filtrar
inputExplotacion.addEventListener("input", () => {
  const texto = inputExplotacion.value.toLowerCase();
  const filtradas = explotacionesOriginales.filter((exp) =>
    exp.Nombre.toLowerCase().includes(texto)
  );
  actualizarSelectExplotacion(filtradas);
});

// Rellenar Inputs de Explotación
selectExplotacion.addEventListener("change", () => {
  const idSeleccionado = selectExplotacion.value;
  const seleccionada = explotacionesOriginales.find(
    (exp) => exp.idExplotacion == idSeleccionado
  );

  if (seleccionada) {
    camposExplotacion.id.value = seleccionada.idExplotacion;
    camposExplotacion.nombre.value = seleccionada.Nombre;
    camposExplotacion.superficie.value = `${seleccionada.Superficie_total} ha`;

    // Obtener parcelas
    fetch(`http://localhost:3000/explotaciones/parcelas/${idSeleccionado}`)
      .then((res) => res.json())
      .then((data) => {
        camposExplotacion.parcelas.value = data.total;
      })
      .catch((err) => {
        console.error("Error al obtener parcelas:", err);
        camposExplotacion.parcelas.value = "—";
      });
  }
});

// Eliminar Explotación
formBaja.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = camposExplotacion.id.value.trim();

  if (!id) {
    return alert(
      "Debe seleccionar una explotación válida antes de darla de baja."
    );
  }

  const confirmacion = confirm(
    "¿Está seguro que desea dar de baja esta explotación?"
  );
  if (!confirmacion) return;

  try {
    const res = await fetch(`http://localhost:3000/explotaciones/baja/${id}`, {
      method: "DELETE",
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
