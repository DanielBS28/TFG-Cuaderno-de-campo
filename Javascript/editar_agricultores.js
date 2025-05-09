const inputBuscarAgricultor = document.getElementById("busqueda-agricultor");
const selectAgricultor = document.getElementById("seleccion-agricultor");

let listaAgricultores = [];

const campos = {
  nombre: document.getElementById("nombre"),
  apellido1: document.getElementById("apellido1"),
  apellido2: document.getElementById("apellido2"),
  dni: document.getElementById("dni"),
  password: document.getElementById("password"),
  carnet: document.getElementById("carnet"),
};

const mostrarPasswordCheckbox = document.getElementById("mostrarPassword");
const botonActualizar = document.getElementById("actualizar_datos_agricultor");

// ### FUNCIONES ###
// Activar campos editables
const activarCampos = () => {
  for (let key of ["nombre", "apellido1", "apellido2", "carnet"]) {
    campos[key].removeAttribute("readonly");
  }

  mostrarPasswordCheckbox.disabled = false;
}

// Comprobar campos vacíos
const comprobarCampos = () => {
  for (let key of ["nombre", "apellido1", "apellido2", "carnet", "password"]) {
    if (!campos[key].value.trim()) {
      alert(`El campo ${key} no puede estar vacío.`);
      return false;
    }
  }
  return true;
}

// Limpiar Input Password
const resetearInputPassword = () => {
  mostrarPasswordCheckbox.checked = false; // Resetear checkbox
  campos.password.type = "password";
  campos.password.disabled = true;
  document.getElementById("checkbox_password").innerText = "Reestablecer contraseña";
};

// Rellenar formulario con datos del agricultor
const rellenarFormulario = (data) => {
  campos.nombre.value = data.Nombre;
  campos.apellido1.value = data.Apellido1;
  campos.apellido2.value = data.Apellido2;
  campos.dni.value = data.dni;
  campos.carnet.value = data.carnet;
  campos.password.value = "**********"; // No se muestra la contraseña por seguridad

  activarCampos();
}

// Actualizar opciones del select de agricultores
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
      rellenarFormulario(data);
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

// Botón Actualizar Datos Agricultor
botonActualizar.addEventListener("click", async (e) => {
  e.preventDefault();

  if (!comprobarCampos()) return;

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
    location.reload();
  } catch (err) {
    alert(`Error: ${err.message}`);
  }
});

// Checkbox para habilitar reestablecer contraseña
mostrarPasswordCheckbox.addEventListener("change", () => {
  const habilitado = mostrarPasswordCheckbox.checked;

  campos.password.disabled = !habilitado;
  campos.password.value = habilitado ? "" : "**********";
  document.getElementById("checkbox_password").innerText = habilitado
    ? "Mantener contraseña"
    : "Reestablecer contraseña";
  campos.password.type = habilitado ? "text" : "password";
});
