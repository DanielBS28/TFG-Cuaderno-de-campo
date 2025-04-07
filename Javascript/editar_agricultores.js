const formDNI = document.getElementById("formulario-DNI");
const formCarnet = document.getElementById("formulario-Carnet");
const botonActualizar = document.getElementById("actualizar_datos_agricultor");

const campos = {
  nombre: document.getElementById("nombre"),
  apellido1: document.getElementById("apellido1"),
  apellido2: document.getElementById("apellido2"),
  dni: document.getElementById("dni"),
  password: document.getElementById("password"),
  carnet: document.getElementById("carnet"),
};

function rellenarFormulario(data) {
  campos.nombre.value = data.Nombre;
  campos.apellido1.value = data.Apellido1;
  campos.apellido2.value = data.Apellido2;
  campos.dni.value = data.dni;
  campos.carnet.value = data.carnet;
  campos.password.value = "**********"; // No se muestra la contraseña por seguridad

  // Activar campos editables
  for (let key of ["nombre", "apellido1", "apellido2", "carnet"]) {
    campos[key].removeAttribute("readonly");
  }

  document.getElementById("mostrarPassword").disabled = false;
}

async function buscarYMostrar(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Error en la búsqueda");

    rellenarFormulario(data);
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
}

formDNI.addEventListener("submit", (e) => {
  e.preventDefault();
  const dni = document.getElementById("DNIBuscado").value.trim();
  if (!dni) return alert("Introduce un DNI");
  buscarYMostrar(`http://localhost:3000/agricultores/buscar/dni/${dni}`);
  resetearInputPassword();
});

formCarnet.addEventListener("submit", (e) => {
  e.preventDefault();
  const carnet = document.getElementById("CBuscado").value.trim();
  if (!carnet) return alert("Introduce un número de carnet");
  buscarYMostrar(`http://localhost:3000/agricultores/buscar/carnet/${carnet}`);
  resetearInputPassword();
});

botonActualizar.addEventListener("click", async (e) => {
  e.preventDefault();

  // Validación
  for (let key of ["nombre", "apellido1", "apellido2", "carnet", "password"]) {
    if (!campos[key].value.trim()) {
      return alert(`El campo ${key} no puede estar vacío.`);
    }
  }

  // Preparar datos
  const payload = {
    nombre: campos.nombre.value.trim(),
    apellido1: campos.apellido1.value.trim(),
    apellido2: campos.apellido2.value.trim(),
    carnet: campos.carnet.value.trim(),
  };

  try {
    const res = await fetch(
      `http://localhost:3000/agricultores/actualizar/${campos.dni.value}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    const data = await res.json();

    if (!res.ok) throw new Error(data.error || "Error al actualizar");

    alert("Datos actualizados correctamente.");
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
});

const mostrarPasswordCheckbox = document.getElementById("mostrarPassword");
mostrarPasswordCheckbox.addEventListener("change", () => {
  const habilitado = mostrarPasswordCheckbox.checked;

  campos.password.disabled = !habilitado;
  campos.password.value = habilitado ? "" : "**********";
  document.getElementById("checkbox_password").innerText = habilitado
    ? "Mantener contraseña"
    : "Reestablecer contraseña";
  campos.password.type = habilitado ? "text" : "password";
});

const resetearInputPassword = () => {
  mostrarPasswordCheckbox.checked = false; // Resetear checkbox
  campos.password.type = "password";
  campos.password.disabled = true;
  document.getElementById("checkbox_password").innerText = "Reestablecer contraseña";
};
