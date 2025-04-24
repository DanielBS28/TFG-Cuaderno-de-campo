// Elementos del DOM
const inputBuscarAgricultor = document.getElementById("busqueda-agricultor");
const selectAgricultor = document.getElementById("seleccion-agricultor");

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

// ### FUNCIONES ###
// Función para mostrar los datos del agricultor
const mostrarDatos = (data) => {
    campos.nombre.value = data.Nombre;
    campos.apellido1.value = data.Apellido1;
    campos.apellido2.value = data.Apellido2;
    campos.dni.value = data.dni;
    campos.carnet.value = data.carnet;
    dniAgricultor = data.dni;

    // Habilitar el campo para nombre de la explotación
    campos.nombreExplotacion.disabled = false;
}

const actualizarOpcionesSelect = (agricultores) => {
    selectAgricultor.innerHTML = `<option value="primera_opcion" disabled selected>Seleccione el agricultor</option>`;
    agricultores.forEach(a => {
        const opcion = document.createElement("option");
        opcion.value = a.DNI;
        opcion.textContent = `${a.Nombre} ${a.Apellido1} - ${a.DNI}`;
        selectAgricultor.appendChild(opcion);
    });
};

// ### EVENTOS ###
// Cargar todos los agricultores al iniciar
window.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("http://localhost:3000/agricultores/todos");
        const data = await res.json();
        listaAgricultores = data;
        actualizarOpcionesSelect(data);
    } catch (error) {
        console.error("Error al cargar agricultores:", error);
    }
});

// Mostrar datos al seleccionar
selectAgricultor.addEventListener("change", async (e) => {
    const dniSeleccionado = e.target.value;
    if (!dniSeleccionado || dniSeleccionado === "primera_opcion") return;

    try {
        const res = await fetch(`http://localhost:3000/agricultores/buscar/dni/${dniSeleccionado}`);
        const data = await res.json();
        mostrarDatos(data);
    } catch (error) {
        alert("Error al cargar datos del agricultor.");
        console.error("Error:", error);
    }
});

// Filtro del select
inputBuscarAgricultor.addEventListener("input", (e) => {
    const texto = e.target.value.toLowerCase();
    const filtrados = listaAgricultores.filter(a =>
        `${a.Nombre} ${a.Apellido1} ${a.Apellido2} ${a.DNI}`.toLowerCase().includes(texto)
    );
    actualizarOpcionesSelect(filtrados);
});

// Alta de explotación
formExplotacion.addEventListener("submit", async (e) => {
    e.preventDefault();

    campos.nombreExplotacion = campos.nombreExplotacion.value.trim();

    if (!dniAgricultor || !campos.nombreExplotacion) {
        return alert("Completa los datos correctamente antes de dar de alta la explotación.");
    }

    const datos = {
        nombre: campos.nombreExplotacion,
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
