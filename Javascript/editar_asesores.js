const formDNI = document.getElementById("formulario-DNI");
const formCarnet = document.getElementById("formulario-Carnet");
const botonActualizar = document.getElementById("actualizar_datos_asesor");

const campos = {
  nombre: document.getElementById("nombre"),
  apellido1: document.getElementById("apellido1"),
  apellido2: document.getElementById("apellido2"),
  dni: document.getElementById("dni"),
  carnet: document.getElementById("carnet"),
};

function rellenarFormulario(data) {
  campos.nombre.value = data.Nombre;
  campos.apellido1.value = data.Apellido1;
  campos.apellido2.value = data.Apellido2;
  campos.dni.value = data.DNI;
  campos.carnet.value = data.N_carnet_asesor;

  // Habilitar campos
  for (let key of ["nombre", "apellido1", "apellido2", "carnet"]) {
    campos[key].removeAttribute("readonly");
  }
}

async function buscarYMostrar(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Error en la búsqueda");

    rellenarFormulario(data);
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
}

formDNI.addEventListener("submit", (e) => {
  e.preventDefault();
  const dni = document.getElementById("DNIBuscado").value.trim();
  if (!dni) return alert("Introduce un DNI");
  buscarYMostrar(`http://localhost:3000/asesores/buscar/dni/${dni}`);
});

formCarnet.addEventListener("submit", (e) => {
  e.preventDefault();
  const carnet = document.getElementById("CBuscado").value.trim();
  if (!carnet) return alert("Introduce un número de carnet");
  buscarYMostrar(`http://localhost:3000/asesores/buscar/carnet/${carnet}`);
});

botonActualizar.addEventListener("click", async (e) => {
  e.preventDefault();

  // Validar campos obligatorios
  for (let key of ["nombre", "apellido1", "apellido2", "carnet"]) {
    if (!campos[key].value.trim()) {
      return alert(`El campo ${key} no puede estar vacío.`);
    }
  }

  const payload = {
    nombre: campos.nombre.value.trim(),
    apellido1: campos.apellido1.value.trim(),
    apellido2: campos.apellido2.value.trim(),
    carnet: campos.carnet.value.trim(),
  };

  try {
    console.log("DNI que se está mandando al actualizar:", campos.dni.value);

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
