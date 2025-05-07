document.querySelector("form").addEventListener("submit", async function(e) {
    e.preventDefault();

    const datos = {
        roma: document.getElementById("numero_roma").value,
        nombre: document.getElementById("nombre-equipo-tratamiento").value,
        fechaAdquisicion: document.getElementById("fecha_adquisicion").value,
        fechaRevision: document.getElementById("fecha_ultima_inspeccion").value
    };

    try {
        const respuesta = await fetch("http://localhost:3000/equipos/alta", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos)
        });

        const resultado = await respuesta.json();

        if (respuesta.ok) {
            alert(`El equipo ${datos.nombre} se ha registrado con éxito`);
            location.reload();
        } else {
            alert("Error: " + (resultado.error || "Error inesperado"));
        }
    } catch (error) {
        alert("Error de red o del servidor.");
        console.error("Error al enviar datos:", error);
    }
});
