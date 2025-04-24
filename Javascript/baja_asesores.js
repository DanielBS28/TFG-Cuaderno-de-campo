const inputBuscarAsesor = document.getElementById("busqueda-asesor");
const selectAsesor = document.getElementById("seleccion-asesor");

const formBaja = document.querySelector(".form-container form");

const campos = {
    nombre: document.getElementById("nombre"),
    apellido1: document.getElementById("apellido1"),
    apellido2: document.getElementById("apellido2"),
    DNI: document.getElementById("dni"),
    N_Carnet_asesor: document.getElementById("carnet")
};

let listaAsesores = [];
let dniAsesor = null;

// ### FUNCIONES ###
const mostrarDatos = (data) => {
    campos.nombre.value = data.Nombre;
    campos.apellido1.value = data.Apellido1;
    campos.apellido2.value = data.Apellido2;
    campos.DNI.value = data.DNI;
    campos.N_Carnet_asesor.value = data.N_Carnet_asesor;
    dniAsesor = data.DNI;
}

const limpiarCampos = () => {
    for (const key in campos) {
        campos[key].value = "";
    }
    dniAsesor = null;
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
        mostrarDatos(data);
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
        location.reload();
    } else {
        alert(data.error || "Error al eliminar asesor.");
    }
});
