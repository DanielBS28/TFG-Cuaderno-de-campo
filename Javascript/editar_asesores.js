const inputBuscarAsesor = document.getElementById("busqueda-asesor");
const selectAsesor = document.getElementById("seleccion-asesor");

const botonActualizar = document.getElementById("actualizar_datos_asesor");

const campos = {
  nombre: document.getElementById("nombre"),
  apellido1: document.getElementById("apellido1"),
  apellido2: document.getElementById("apellido2"),
  dni: document.getElementById("dni"),
  carnet: document.getElementById("carnet"),
};

let listaAsesores = [];

// ### FUNCIONES ###
// Habilitar campos
const habilitarCampos = () => {
  for (let key of ["nombre", "apellido1", "apellido2", "carnet"]) {
    campos[key].removeAttribute("readonly");
  }
}

const rellenarFormulario = (data) => {
  campos.nombre.value = data.Nombre;
  campos.apellido1.value = data.Apellido1;
  campos.apellido2.value = data.Apellido2;
  campos.dni.value = data.DNI;
  campos.carnet.value = data.N_Carnet_asesor;

  habilitarCampos();
}

// Comprobar campos obligatorios
const comprobarCampos = () => {
  for (let key of ["nombre", "apellido1", "apellido2", "carnet"]) {
    if (!campos[key].value.trim()) {
      alert(`El campo ${key} no puede estar vacío.`);
      return false;
    }
  }
  return true;
}

const actualizarOpcionesSelect = (asesores) => {
  selectAsesor.innerHTML = `<option value="primera_opcion" disabled selected>Seleccione el asesor</option>`;
  asesores.forEach(a => {
      const opcion = document.createElement("option");
      opcion.value = a.DNI;
      opcion.textContent = `${a.Nombre} ${a.Apellido1} - ${a.DNI}`;
      selectAsesor.appendChild(opcion);
  });
};

// ### EVENTOS ###
// Cargar todos los asesores al iniciar
window.addEventListener("DOMContentLoaded", async () => {
  try {
      const res = await fetch("http://localhost:3000/asesores/todos");
      const data = await res.json();
      listaAsesores = data;
      actualizarOpcionesSelect(data);
  } catch (error) {
      console.error("Error al cargar asesores:", error);
  }
});

// Mostrar datos al seleccionar
selectAsesor.addEventListener("change", async (e) => {
  const dniSeleccionado = e.target.value;
  if (!dniSeleccionado || dniSeleccionado === "primera_opcion") return;

  try {
      const res = await fetch(`http://localhost:3000/asesores/buscar/dni/${dniSeleccionado}`);
      const data = await res.json();
      rellenarFormulario(data);
  } catch (error) {
      alert("Error al cargar datos del asesor.");
      console.error("Error:", error);
  }
});

// Filtro del select
inputBuscarAsesor.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = listaAsesores.filter(a =>
      `${a.Nombre} ${a.Apellido1} ${a.Apellido2} ${a.DNI}`.toLowerCase().includes(texto)
  );
  actualizarOpcionesSelect(filtrados);
});

// Actualizar datos asesor
botonActualizar.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!comprobarCampos()) return;

  // Carga de datos
  const payload = {
    nombre: campos.nombre.value.trim(),
    apellido1: campos.apellido1.value.trim(),
    apellido2: campos.apellido2.value.trim(),
    carnet: campos.carnet.value.trim(),
  };

  try {
    const res = await fetch(
      `http://localhost:3000/asesores/actualizar/${campos.dni.value}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Error al actualizar");

    alert("Datos del asesor actualizados correctamente.");
    location.reload();
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
});
