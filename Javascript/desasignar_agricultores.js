const formAgricultor = document.getElementById("formulario-DNI");
const formAsesor = document.getElementById("formulario-Carnet");
const selectAsesor = document.getElementById("seleccion");
let option = document.createElement("option");

formAgricultor.addEventListener("submit", async function (e) {
  e.preventDefault();
  const dni = document.getElementById("DNIBuscado").value.trim();

  if (!dni) return alert("Introduce un DNI de agricultor");

  const res = await fetch(
    `http://localhost:3000/agricultores/buscar/dni/${dni}`
  );
  const data = await res.json();

  if (res.ok) {
    document.getElementById("nombre").value = data.Nombre;
    document.getElementById("apellido1").value = data.Apellido1;
    document.getElementById("apellido2").value = data.Apellido2;
    document.getElementById("dni").value = data.dni;
    document.getElementById("carnet").value = data.carnet;

    limpiarCamposAsesor();
    selectAsesor.disabled = false;
    selectAsesor.innerHTML =
      "<option selected disabled>Seleccionar asesor</option>"; // Limpiar el select antes de llenarlo

    option.value = "Selecciona un asesor";
    option.textContent = "Selecciona un asesor";

    // Obtener asesores asignados y llenar el select
    fetch(`http://localhost:3000/agricultores/asesores/${dni}`)
      .then((response) => response.json())
      .then((asesores) => {
        if (asesores.length === 0) {
          selectAsesor.disabled = true;
          alert("Este agricultor no tiene ningún asesor asignado.");
          return;
        }

        asesores.forEach((asesor) => {
          option = document.createElement("option");
          option.value = asesor.DNI;
          option.textContent = `${asesor.Nombre} ${asesor.Apellido1} ${asesor.Apellido2}`;
          selectAsesor.appendChild(option);
        });
      })
      .catch((error) => {
        console.error("Error cargando asesores:", error);
      });
  } else {
    alert(data.error);
  }
});

selectAsesor.addEventListener("change", async function () {
  const dniAsesor = this.value;

  if (!dniAsesor || dniAsesor === "Selecciona un asesor") return;

  try {
    const res = await fetch(
      `http://localhost:3000/asesores/buscar/dni/${dniAsesor}`
    );
    const data = await res.json();

    if (res.ok) {
      document.getElementById("nombre-as").value = data.Nombre;
      document.getElementById("apellido1-as").value = data.Apellido1;
      document.getElementById("apellido2-as").value = data.Apellido2;
      document.getElementById("dni-as").value = data.DNI;
      document.getElementById("carnet-as").value = data.N_carnet_asesor;
    } else {
      alert("Asesor no encontrado");
    }
  } catch (error) {
    console.error("Error al obtener asesor:", error);
    alert("Error al cargar los datos del asesor");
  }
});

document.getElementById("desasignar").addEventListener("click", async () => {
    const dniAgricultor = document.getElementById("dni").value.trim();
    const dniAsesor = document.getElementById("dni-as").value.trim();
  
    if (!dniAgricultor || !dniAsesor) {
      return alert("Debes buscar un agricultor y seleccionar un asesor para desasignar.");
    }
  
    const confirmacion = confirm("¿Estás seguro de que deseas desasignar este asesor del agricultor?");
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
  

const limpiarCamposAsesor = () => {
  document.getElementById("nombre-as").value = "";
  document.getElementById("apellido1-as").value = "";
  document.getElementById("apellido2-as").value = "";
  document.getElementById("dni-as").value = "";
  document.getElementById("carnet-as").value = "";
};
