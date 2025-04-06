// Elementos del DOM
const formDNI = document.getElementById("formulario-DNI");
const formCarnet = document.getElementById("formulario-Carnet");
const formExplotacion = document.querySelector(".form-container form");

const campos = {
    nombre: document.getElementById("nombre"),
    apellido1: document.getElementById("apellido1"),
    apellido2: document.getElementById("apellido2"),
    dni: document.getElementById("dni"),
    carnet: document.getElementById("carnet"),
    nombreExplotacion: document.getElementById("nombre_explotacion")
};

let dniAgricultor = null;

// Función para mostrar los datos del agricultor
function mostrarDatos(data) {
    campos.nombre.value = data.Nombre;
    campos.apellido1.value = data.Apellido1;
    campos.apellido2.value = data.Apellido2;
    campos.dni.value = data.dni;
    campos.carnet.value = data.carnet;
    dniAgricultor = data.dni;

    // Habilitar el campo para nombre de la explotación
    campos.nombreExplotacion.disabled = false;
}

// Buscar por DNI
formDNI.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dni = document.getElementById("DNIBuscado").value.trim();

    if (!dni) return alert("Introduce un DNI");

    try {
        const res = await fetch(`http://localhost:3000/agricultores/buscar/dni/${dni}`);
        const data = await res.json();

        if (res.ok) {
            mostrarDatos(data);
        } else {
            alert(data.error || "Agricultor no encontrado");
        }
    } catch (err) {
        console.error(err);
        alert("Error en la búsqueda");
    }
});

// Buscar por Carnet
formCarnet.addEventListener("submit", async (e) => {
    e.preventDefault();
    const carnet = document.getElementById("CBuscado").value.trim();

    if (!carnet) return alert("Introduce un número de carnet");

    try {
        const res = await fetch(`http://localhost:3000/agricultores/buscar/carnet/${carnet}`);
        const data = await res.json();

        if (res.ok) {
            mostrarDatos(data);
        } else {
            alert(data.error || "Agricultor no encontrado");
        }
    } catch (err) {
        console.error(err);
        alert("Error en la búsqueda");
    }
});

// Alta de explotación
formExplotacion.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nombreExplotacion = campos.nombreExplotacion.value.trim();

    if (!dniAgricultor || !nombreExplotacion) {
        return alert("Completa los datos correctamente antes de dar de alta la explotación.");
    }

    const datos = {
        nombre: nombreExplotacion,
        dni: dniAgricultor
    };

    try {
        const respuesta = await fetch("http://localhost:3000/explotaciones/alta", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            alert("Explotación registrada con éxito");
            location.reload();
        } else {
            alert("Error: " + resultado.error);
        }
    } catch (err) {
        console.error(err);
        alert("Error al registrar la explotación.");
    }
});
