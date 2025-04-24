const inputBuscarAgricultor = document.getElementById("busqueda-agricultor");
const selectAgricultor = document.getElementById("seleccion-agricultor");

const formBaja = document.getElementById("formulario-baja");

const campos = {
    nombre: document.getElementById("nombre"),
    apellido1: document.getElementById("apellido1"),
    apellido2: document.getElementById("apellido2"),
    dni: document.getElementById("dni"),
    carnet: document.getElementById("carnet")
};

let dniAgricultor = null;
let listaAgricultores = [];

// ### FUNCIONES ###
const mostrarDatos = (data) => {
    campos.nombre.value = data.Nombre;
    campos.apellido1.value = data.Apellido1;
    campos.apellido2.value = data.Apellido2;
    campos.dni.value = data.dni;
    campos.carnet.value = data.carnet;
    dniAgricultor = data.dni;
}

const limpiarCampos = () => {
    for (const key in campos) {
        campos[key].value = "";
    }
    dniAgricultor = null;
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
        location.reload();
    } else {
        alert(data.error || "Error al eliminar agricultor.");
    }
});
