document.addEventListener("DOMContentLoaded", () => {
    const formAgricultor = document.getElementById("formulario-DNI");
    const formAsesor = document.getElementById("formulario-Carnet");
    const botonAsignar = document.getElementById("asignar");

    formAgricultor.addEventListener("submit", async function (e) {
        e.preventDefault();
        const dni = document.getElementById("DNIBuscado").value.trim();

        if (!dni) return alert("Introduce un DNI de agricultor");

        const res = await fetch(`http://localhost:3000/agricultores/buscar/dni/${dni}`);
        const data = await res.json();

        if (res.ok) {
            document.getElementById("nombre").value = data.Nombre;
            document.getElementById("apellido1").value = data.Apellido1;
            document.getElementById("apellido2").value = data.Apellido2;
            document.getElementById("dni").value = data.dni;
            document.getElementById("carnet").value = data.carnet;
        } else {
            alert(data.error);
        }
    });

    formAsesor.addEventListener("submit", async function (e) {
        e.preventDefault();
        const dni = document.getElementById("CBuscado").value.trim();

        if (!dni) return alert("Introduce un DNI de asesor");

        const res = await fetch(`http://localhost:3000/asesores/buscar/dni/${dni}`);
        const data = await res.json();

        if (res.ok) {
            document.getElementById("nombre-as").value = data.Nombre;
            document.getElementById("apellido1-as").value = data.Apellido1;
            document.getElementById("apellido2-as").value = data.Apellido2;
            document.getElementById("dni-as").value = data.DNI;
            document.getElementById("carnet-as").value = data.N_carnet_asesor;
        } else {
            alert(data.error);
        }
    });

    botonAsignar.addEventListener("click", async function () {
        const dniAgricultor = document.getElementById("dni").value.trim();
        const dniAsesor = document.getElementById("dni-as").value.trim();

        if (!dniAgricultor || !dniAsesor) {
            return alert("Debes buscar y seleccionar tanto al agricultor como al asesor.");
        }

        const res = await fetch("/agricultores/asignar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ dniAgricultor, dniAsesor })
        });

        const data = await res.json();

        if (res.ok) {
            alert(data.message);
            location.reload(); // solo recarga al asignar
        } else {
            alert(data.error);
        }
    });
});
