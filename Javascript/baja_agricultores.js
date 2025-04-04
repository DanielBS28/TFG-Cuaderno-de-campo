const formDNI = document.getElementById("formulario-DNI");
const formCarnet = document.getElementById("formulario-Carnet");
const formBaja = document.getElementById("formulario-baja");

const campos = {
    nombre: document.getElementById("nombre"),
    apellido1: document.getElementById("apellido1"),
    apellido2: document.getElementById("apellido2"),
    dni: document.getElementById("dni"),
    carnet: document.getElementById("carnet")
};

let dniAgricultor = null;

// Buscar por DNI
formDNI.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dni = document.getElementById("DNIBuscado").value.trim();

    const res = await fetch(`http://localhost:3000/agricultores/buscar/dni/${dni}`);
    const data = await res.json();

    if (res.ok) {
        mostrarDatos(data);
    } else {
        alert(data.error || "Agricultor no encontrado");
    }
});

// Buscar por Carnet
formCarnet.addEventListener("submit", async (e) => {
    e.preventDefault();
    const carnet = document.getElementById("CBuscado").value.trim();

    const res = await fetch(`http://localhost:3000/agricultores/buscar/carnet/${carnet}`);
    const data = await res.json();

    if (res.ok) {
        mostrarDatos(data);
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

// Eliminar agricultor
formBaja.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!dniAgricultor) {
        return alert("Debes buscar un agricultor primero.");
    }

    const confirmar = confirm("¿Estás seguro de que deseas eliminar al agricultor?");
    if (!confirmar) return;

    const res = await fetch(`http://localhost:3000/agricultores/eliminar/${dniAgricultor}`, {
        method: "DELETE"
    });

    const data = await res.json();

    if (res.ok) {
        alert("Agricultor eliminado correctamente.");
        limpiarCampos();
    } else {
        alert(data.error || "Error al eliminar agricultor.");
    }
});

function limpiarCampos() {
    for (const key in campos) {
        campos[key].value = "";
    }
    dniAgricultor = null;
}
