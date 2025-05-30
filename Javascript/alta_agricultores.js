document.querySelector("form").addEventListener("submit", async (e) =>{
    e.preventDefault();

    const datos = {
        nombre: document.getElementById("nombre").value,
        apellido1: document.getElementById("apellido1").value,
        apellido2: document.getElementById("apellido2").value,
        dni: document.getElementById("dni").value,
        contrasena: document.getElementById("contrasena").value,
        carnet: document.getElementById("carnet").value
    };

    const validarDNI = dni => {
        const letras = 'TRWAGMYFPDXBNJZSQVHLCKE';
        const dniRegex = /^\d{8}[A-Z]$/;
    
        if (!dniRegex.test(dni)) return false;
        const numero = parseInt(dni.substring(0, 8), 10);
        const letraEsperada = letras[numero % 23];
        return letraEsperada === dni.charAt(8);
    }

    if (!validarDNI(datos.dni)) {
        return alert("DNI no válido");       
    }

    const respuesta = await fetch("http://localhost:3000/agricultores/alta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });

    const resultado = await respuesta.json();
    if (respuesta.ok) {
        alert("Agricultor registrado con éxito");
        location.reload();
    } else {
        alert("Error: " + resultado.error);
    }
});

document.getElementById("mostrarPassword").addEventListener("change", function() {
    const campoPassword = document.getElementById("contrasena");
    campoPassword.type = this.checked ? "text" : "password";
});
