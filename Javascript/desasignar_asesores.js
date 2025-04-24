const inputBuscarAgricultor = document.getElementById("busqueda-agricultor");
const selectAgricultor = document.getElementById("seleccion-agricultor");
const btnAsignar = document.getElementById("asignar");

const camposAgricultor = {
  nombre: document.getElementById("nombre"),
  apellido1: document.getElementById("apellido1"),
  apellido2: document.getElementById("apellido2"),
  dni: document.getElementById("dni"),
  carnet: document.getElementById("carnet"),
};

const inputBuscarAsesor = document.getElementById("busqueda-asesor");
const selectAsesor = document.getElementById("seleccion-asesor");

const camposAsesor = {
  nombre: document.getElementById("nombre-as"),
  apellido1: document.getElementById("apellido1-as"),
  apellido2: document.getElementById("apellido2-as"),
  dni: document.getElementById("dni-as"),
  carnet: document.getElementById("carnet-as"),
};

let dniAgricultor = null;
let dniAsesor = null;
let listaAgricultores = [];
let listaAsesores = [];

// ### FUNCIONES ###
const mostrarDatosAgricultor = (data) => {
  camposAgricultor.nombre.value = data.Nombre;
  camposAgricultor.apellido1.value = data.Apellido1;
  camposAgricultor.apellido2.value = data.Apellido2;
  camposAgricultor.dni.value = data.dni;
  camposAgricultor.carnet.value = data.carnet;
  dniAgricultor = data.dni;
};

const mostrarDatosAsesor = (data) => {
  camposAsesor.nombre.value = data.Nombre;
  camposAsesor.apellido1.value = data.Apellido1;
  camposAsesor.apellido2.value = data.Apellido2;
  camposAsesor.dni.value = data.DNI;
  camposAsesor.carnet.value = data.N_Carnet_asesor;
  dniAsesor = data.DNI;
};

const limpiarCamposAsesor = () => {
  camposAsesor.nombre.value = "";
  camposAsesor.apellido1.value = "";
  camposAsesor.apellido2.value = "";
  camposAsesor.dni.value = "";
  camposAsesor.carnet.value = "";
};

const habilitarCamposAsesor = () => {
  inputBuscarAsesor.disabled = false;
  selectAsesor.disabled = false;
};

const actualizarSelectAgricultores = (agricultores) => {
  selectAgricultor.innerHTML = `<option value="primera_opcion" disabled selected>Seleccione el agricultor</option>`;
  agricultores.forEach((a) => {
    const opcion = document.createElement("option");
    opcion.value = a.DNI;
    opcion.textContent = `${a.Nombre} ${a.Apellido1} - ${a.DNI}`;
    selectAgricultor.appendChild(opcion);
  });
};

const actualizarSelectAsesores = (asesores) => {
  selectAsesor.innerHTML = `<option value="primera_opcion" disabled selected>Seleccione el asesor</option>`;
  asesores.forEach((a) => {
    const opcion = document.createElement("option");
    opcion.value = a.DNI;
    opcion.textContent = `${a.Nombre} ${a.Apellido1} - ${a.DNI}`;
    selectAsesor.appendChild(opcion);
  });
};

const cargarSelectAsesores = async (dniSeleccionado) => {
  try {
    const res = await fetch(
      `http://localhost:3000/agricultores/asesores/${dniSeleccionado}`
    );
    const data = await res.json();
    listaAsesores = data;
    actualizarSelectAsesores(data);
  } catch (error) {
    console.error("Error al cargar asesores:", error);
  }
};

// ### EVENTOS ###
// Cargar todos los agricultores y asesores al iniciar
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("http://localhost:3000/agricultores/todos");
    const data = await res.json();
    listaAgricultores = data;
    actualizarSelectAgricultores(data);
  } catch (error) {
    console.error("Error al cargar agricultores:", error);
  }
});

// Mostrar datos del Agricultor al seleccionar
selectAgricultor.addEventListener("change", async (e) => {
  const dniSeleccionado = e.target.value;
  if (!dniSeleccionado || dniSeleccionado === "primera_opcion") return;

  try {
    const res = await fetch(
      `http://localhost:3000/agricultores/buscar/dni/${dniSeleccionado}`
    );
    const data = await res.json();
    limpiarCamposAsesor();
    mostrarDatosAgricultor(data);
    habilitarCamposAsesor();

    await cargarSelectAsesores(dniSeleccionado);

    // Comprobar si no hay asesores asignados
    if (listaAsesores.length === 0) {
      inputBuscarAsesor.disabled = true;
      selectAsesor.disabled = true;
      return alert("Este agricultor no tiene ningún asesor asignado.");
    }
  } catch (error) {
    alert("Error al cargar datos del agricultor.");
    console.error("Error:", error);
  }
});

// Filtro del select de Agricultores
inputBuscarAgricultor.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = listaAgricultores.filter((a) =>
    `${a.Nombre} ${a.Apellido1} ${a.Apellido2} ${a.DNI}`
      .toLowerCase()
      .includes(texto)
  );
  actualizarSelectAgricultores(filtrados);
});

// Mostrar datos del Asesor al seleccionar
selectAsesor.addEventListener("change", async (e) => {
  const dniSeleccionado = e.target.value;
  if (!dniSeleccionado || dniSeleccionado === "primera_opcion") return;

  try {
    const res = await fetch(
      `http://localhost:3000/asesores/buscar/dni/${dniSeleccionado}`
    );
    const data = await res.json();
    mostrarDatosAsesor(data);
  } catch (error) {
    alert("Error al cargar datos del asesor.");
    console.error("Error:", error);
  }
});

// Filtro del select de Asesores
inputBuscarAsesor.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = listaAsesores.filter((a) =>
    `${a.Nombre} ${a.Apellido1} ${a.Apellido2} ${a.DNI}`
      .toLowerCase()
      .includes(texto)
  );
  actualizarSelectAsesores(filtrados);
});

// Desasignar asesor del agricultor
document.getElementById("desasignar").addEventListener("click", async (e) => {
  e.preventDefault();

  camposAgricultor.dni = camposAgricultor.dni.value.trim();
  camposAsesor.dni = camposAsesor.dni.value.trim();

  if (!camposAgricultor.dni || !camposAsesor.dni) {
    return alert(
      "Debes buscar un agricultor y seleccionar un asesor para desasignar."
    );
  }

  const confirmacion = confirm(
    "¿Estás seguro de que deseas desasignar este asesor del agricultor?"
  );
  if (!confirmacion) return;

  try {
    const res = await fetch("http://localhost:3000/agricultores/desasignar", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ dniAgricultor, dniAsesor }),
    });

    const data = await res.json();

    if (res.ok) {
      alert(data.message);
      location.reload();
    } else {
      alert(data.error);
    }
  } catch (error) {
    console.error("Error al desasignar:", error);
    alert("Error al intentar desasignar el asesor.");
  }
});
