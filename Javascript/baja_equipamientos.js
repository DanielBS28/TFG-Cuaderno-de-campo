const inputBusqueda = document.getElementById("busqueda-equipo");
const selectEquipos = document.getElementById("seleccion-equipo");

const nombreInput = document.getElementById("nombre-equipo-tratamiento");
const romaInput = document.getElementById("numero_roma");
const fechaAdqInput = document.getElementById("fecha_adquisicion");
const fechaRevInput = document.getElementById("fecha_ultima_inspeccion");

let equipos = [];

// Cargar equipos al iniciar
window.addEventListener("DOMContentLoaded", async () => {
    try {
        const res = await fetch("http://localhost:3000/equipos");
        equipos = await res.json();
        cargarSelect(equipos);
    } catch (err) {
        console.error("Error al cargar equipos:", err);
    }
});

// Función para cargar el select con equipos
function cargarSelect(lista) {
    selectEquipos.innerHTML = `
        <option value="" disabled selected>Seleccione el equipo</option>
    `;
    lista.forEach(eq => {
        const option = document.createElement("option");
        option.value = eq.Numero_ROMA;
        option.textContent = `${eq.Nombre} | ${eq.Numero_ROMA}`;
        selectEquipos.appendChild(option);
    });
}

// Filtrado por texto
inputBusqueda.addEventListener("input", () => {
    const texto = inputBusqueda.value.trim().toLowerCase();
    if (!equipos || equipos.length === 0) return;

    const filtradas = equipos.filter((equipo) =>
        `${equipo.Nombre} | ${equipo.Numero_ROMA}`.toLowerCase().includes(texto)
    );

    cargarSelect(filtradas);
});
  
// Mostrar datos al seleccionar equipo
selectEquipos.addEventListener("change", () => {
    const seleccionado = equipos.find(eq => eq.Numero_ROMA == selectEquipos.value);
    if (seleccionado) {
        nombreInput.value = seleccionado.Nombre;
        romaInput.value = seleccionado.Numero_ROMA;
        fechaAdqInput.value = seleccionado.Fecha_adquisicion.split("T")[0]; // formato YYYY-MM-DD
        fechaRevInput.value = seleccionado.Fecha_ultima_revision.split("T")[0];
    }
});

// Eliminar equipo
document.getElementById("baja-equipamiento").addEventListener("click", async (e) => {
    e.preventDefault();

    const roma = romaInput.value;
    if (!roma) {
        alert("Selecciona un equipo para dar de baja");
        return;
    }

    const confirmar = confirm("¿Estás seguro de que deseas eliminar este equipo?");
    if (!confirmar) return;

    try {
        const res = await fetch(`http://localhost:3000/equipos/${roma}`, {
            method: "DELETE"
        });

        if (res.ok) {
            alert("Equipo eliminado correctamente");
            location.reload();
        } else {
            const error = await res.json();
            alert("Error al eliminar: " + error.error);
        }
    } catch (err) {
        console.error("Error en la eliminación:", err);
        alert("Error en la solicitud");
    }
});
