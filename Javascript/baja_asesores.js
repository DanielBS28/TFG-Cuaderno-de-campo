const formDNI = document.getElementById("formulario-DNI");
const formCarnet = document.getElementById("formulario-Carnet");
const formBaja = document.querySelector(".form-container form"); // Usamos esta para baja

const campos = {
    nombre: document.getElementById("nombre"),
    apellido1: document.getElementById("apellido1"),
    apellido2: document.getElementById("apellido2"),
    DNI: document.getElementById("dni"),
    N_Carnet_asesor: document.getElementById("carnet")
};

let dniAsesor = null;

// Buscar por DNI
formDNI.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dni = document.getElementById("DNIBuscado").value.trim();

    if (!dni) return alert("Introduce un DNI");

    const res = await fetch(`http://localhost:3000/asesores/buscar/dni/${dni}`);
    const data = await res.json();

    if (res.ok) {
        mostrarDatos(data);
    } else {
        alert(data.error || "Asesor no encontrado");
    }
});

// Buscar por Carnet
formCarnet.addEventListener("submit", async (e) => {
    e.preventDefault();
    const carnet = document.getElementById("CBuscado").value.trim();

    if (!carnet) return alert("Introduce un número de carnet");

    const res = await fetch(`http://localhost:3000/asesores/buscar/carnet/${carnet}`);
    const data = await res.json();

    if (res.ok) {
        mostrarDatos(data);
    } else {
        alert(data.error || "Asesores no encontrado");
    }
});

function mostrarDatos(data) {
    campos.nombre.value = data.Nombre;
    campos.apellido1.value = data.Apellido1;
    campos.apellido2.value = data.Apellido2;
    campos.DNI.value = data.DNI;
    campos.N_Carnet_asesor.value = data.N_Carnet_asesor;
    dniAsesor = data.DNI;
}

// Eliminar asesor
formBaja.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!dniAsesor) {
        return alert("Debes buscar un asesor primero.");
    }

    const confirmar = confirm("¿Estás seguro de que deseas eliminar al asesor?");
    if (!confirmar) return;

    const res = await fetch(`http://localhost:3000/asesores/eliminar/${dniAsesor}`, {
        method: "DELETE"
    });

    const data = await res.json();

    if (res.ok) {
        alert("Asesor eliminado correctamente.");
        limpiarCampos();
    } else {
        alert(data.error || "Error al eliminar asesor.");
    }
});

function limpiarCampos() {
    for (const key in campos) {
        campos[key].value = "";
    }
    dniAsesor = null;
}
