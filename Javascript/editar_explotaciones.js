const inputBuscarAgricultor = document.getElementById("busqueda-agricultor");
const selectAgricultor = document.getElementById("seleccion-agricultor");

const inputBuscarExplotacion = document.getElementById("buscar-explotacion");
const selectExplotacion = document.getElementById("seleccion");
const inputNombreExplotacion = document.getElementById("nombre-explotacion");
const botonActualizar = document.getElementById("actualizar_datos_explotacion");

let listaAgricultores = [];
let listaExplotaciones = [];

// ### FUNCIONES ###

// Activar campos de edición
const activarCampos = () => {
  inputBuscarExplotacion.disabled = false;
  selectExplotacion.disabled = false;
  inputNombreExplotacion.disabled = false;
};

// Rellenar datos del agricultor
const rellenarCamposAgricultor = (data) => {
  document.getElementById("nombre").value = data.Nombre;
  document.getElementById("apellido1").value = data.Apellido1;
  document.getElementById("apellido2").value = data.Apellido2;
  document.getElementById("dni").value = data.dni;
  document.getElementById("carnet").value = data.carnet;
};

const limpiarCamposExplotacion = () => {
  inputBuscarExplotacion.value = "";
  selectExplotacion.innerHTML = `<option value="Prueba" disabled selected>Seleccione explotación</option>`;
  inputNombreExplotacion.value = "";
  inputNombreExplotacion.disabled = true;
  selectExplotacion.disabled = true;
  inputBuscarExplotacion.disabled = true;
}

// Actualizar las opciones del select de agricultores
const actualizarOpcionesSelectAgricultores = (agricultores) => {
  selectAgricultor.innerHTML = `<option value="primera_opcion" disabled selected>Seleccione el agricultor</option>`;
  agricultores.forEach((a) => {
    const opcion = document.createElement("option");
    opcion.value = a.DNI;
    opcion.textContent = `${a.Nombre} ${a.Apellido1} ${a.Apellido2} - ${a.DNI}`;
    selectAgricultor.appendChild(opcion);
  });
};

// Actualizar el select de explotaciones filtradas
const actualizarOpcionesSelectExplotaciones = (explotaciones) => {
  selectExplotacion.innerHTML = `<option value="Prueba" disabled selected>Seleccione explotación</option>`;
  explotaciones.forEach((exp) => {
    const opcion = document.createElement("option");
    opcion.value = exp.idExplotacion;
    opcion.textContent = exp.Nombre;
    selectExplotacion.appendChild(opcion);
  });
};

// ### EVENTOS ###

// Cargar todos los agricultores al iniciar
window.addEventListener("DOMContentLoaded", async () => {
  try {
      const res = await fetch("http://localhost:3000/agricultores/todos");
      const data = await res.json();
      listaAgricultores = data;
      actualizarOpcionesSelectAgricultores(data);
  } catch (error) {
      console.error("Error al cargar agricultores:", error);
  }
});

// Selección de agricultor
selectAgricultor.addEventListener("change", async (e) => {
  const dniSeleccionado = e.target.value;
  if (!dniSeleccionado || dniSeleccionado === "primera_opcion") return;

  try {
    const resAgricultor = await fetch(`http://localhost:3000/agricultores/buscar/dni/${dniSeleccionado}`);
    if (!resAgricultor.ok) {
      throw new Error("No se pudo obtener el agricultor.");
    }
    const dataAgricultor = await resAgricultor.json();
    limpiarCamposExplotacion();
    rellenarCamposAgricultor(dataAgricultor);
    activarCampos();
  
    const resExplotaciones = await fetch(`http://localhost:3000/explotaciones/dni-agricultor/${dniSeleccionado}`);
    if (!resExplotaciones.ok) {
      throw new Error("No se pudieron obtener las explotaciones.");
    }
    const dataExplotaciones = await resExplotaciones.json();
    listaExplotaciones = dataExplotaciones;
    actualizarOpcionesSelectExplotaciones(dataExplotaciones);
  } catch (error) {
    console.error("Error al cargar los datos:", error);
    alert("Error al cargar datos del agricultor o sus explotaciones.");
  }
  
});

// Filtro de explotaciones
inputBuscarExplotacion.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtradas = listaExplotaciones.filter((exp) =>
    exp.Nombre.toLowerCase().includes(texto)
  );
  actualizarOpcionesSelectExplotaciones(filtradas);
});

// Mostrar nombre al seleccionar una explotación
selectExplotacion.addEventListener("change", (e) => {
  const seleccionada = listaExplotaciones.find(
    (exp) => exp.idExplotacion == e.target.value
  );
  if (seleccionada) {
    inputNombreExplotacion.value = seleccionada.Nombre;
  }
});

// Actualizar nombre de la explotación
botonActualizar.addEventListener("click", async (e) => {
  e.preventDefault();

  const id = selectExplotacion.value;
  const nuevoNombre = inputNombreExplotacion.value.trim();

  if (!id || id === "Prueba" || !nuevoNombre) {
    alert("Debe seleccionar una explotación válida y rellenar un nombre nuevo.");
    return;
  }

  try {
    const res = await fetch(`http://localhost:3000/explotaciones/editar/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ nombre: nuevoNombre }),
    });

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Error al actualizar nombre.");

    alert("Nombre de la explotación actualizado correctamente.");
    location.reload();
  } catch (error) {
    alert(`Error: ${error.message}`);
  }
});
