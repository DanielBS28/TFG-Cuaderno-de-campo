// DATOS AGRICULTOR
const inputBuscarAgricultor = document.getElementById("busqueda-agricultor");
const selectAgricultor = document.getElementById("seleccion-agricultor");

const camposAgricultor = {
  nombre: document.getElementById("nombre"),
  apellido1: document.getElementById("apellido1"),
  apellido2: document.getElementById("apellido2"),
  dni: document.getElementById("dni"),
  carnet: document.getElementById("carnet"),
};

// DATOS EXPLOTACION
const inputBuscarExplotacion = document.getElementById("nombre-exp");
const selectExplotacion = document.getElementById("seleccion-exp");

const camposExplotacion = {
  id: document.getElementById("id-explotacion"),
  nombre: document.getElementById("nombre-buscado-explotacion"),
  superficie: document.getElementById("superficie"),
  parcelas: document.getElementById("total-parcelas"),
};


// DATOS EQUIPAMIENTO
const inputBuscarEquipo = document.getElementById("nombre-equipo");
const selectEquipamiento = document.getElementById("seleccion-equipamiento");
let equipos = [];

const camposEquipamiento = {
    nombre: document.getElementById("nombre-equipo-tratamiento"),
    numeroRoma: document.getElementById("numero_roma"),
    fechaAdquisicion: document.getElementById("fecha_adquisicion"),
    fechaRevision: document.getElementById("fecha_ultima_inspeccion"),
};

// Mostrar datos del agricultor
const mostrarDatosAgricultor = (data) => {
  camposAgricultor.nombre.value = data.Nombre;
  camposAgricultor.apellido1.value = data.Apellido1;
  camposAgricultor.apellido2.value = data.Apellido2;
  camposAgricultor.dni.value = data.dni;
  camposAgricultor.carnet.value = data.carnet;
};

// Mostrar datos de explotación
const mostrarDatosExplotacion = (seleccionada) => {
  camposExplotacion.id.value = seleccionada.idExplotacion;
  camposExplotacion.nombre.value = seleccionada.Nombre;
  camposExplotacion.superficie.value = `${seleccionada.Superficie_total} ha`;
};

// Mostrar datos del equipo
const mostrarDatosEquipo = (equipo) => {
    camposEquipamiento.nombre.value = equipo.Nombre;
    camposEquipamiento.numeroRoma.value = equipo.Numero_ROMA;
    camposEquipamiento.fechaAdquisicion.value = equipo.Fecha_adquisicion.split("T")[0]; // formato YYYY-MM-DD
    camposEquipamiento.fechaRevision.value = equipo.Fecha_ultima_revision.split("T")[0]; // formato YYYY-MM-DD

};

//
// limpiar campos equipo
const limpiarCamposEquipos = () => {
    camposEquipamiento.nombre.value = "";
    camposEquipamiento.numeroRoma.value = "";
    camposEquipamiento.fechaAdquisicion.value = "";
    camposEquipamiento.fechaRevision.value = "";
    selectEquipamiento.selectedIndex = 0;

}

// Limpiar campos explotación
const limpiarCamposExplotacion = () => {
  camposExplotacion.id.value = "";
  camposExplotacion.nombre.value = "";
  camposExplotacion.superficie.value = "";
  camposExplotacion.parcelas.value = "";
  selectExplotacion.selectedIndex = 0;
};

// Desbloquear campos explotación
const desbloquearExplotacion = () => {
  inputBuscarExplotacion.disabled = false;
  inputBuscarExplotacion.value = "";
  selectExplotacion.disabled = false;
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
};

// Bloquear campos explotación
const bloquearExplotacion = () => {
  selectExplotacion.selectedIndex = 0;
  selectExplotacion.disabled = true;
  inputBuscarExplotacion.value = "";
  inputBuscarExplotacion.disabled = true;
};

// Bloquear campos del Equipo de tratamiento
const bloquearEquipo = () => {
  selectEquipamiento.selectedIndex = 0;
  selectEquipamiento.disabled = true;
  inputBuscarEquipo.value = "";
  inputBuscarEquipo.disabled = true;
};

// Desbloquear campos de equipo
const desbloquearCamposEquipos = () => {
  inputBuscarEquipo.disabled = false;
  selectEquipamiento.disabled = false;
};

// Actualizar opciones agricultores
const actualizarSelectAgricultores = (agricultores) => {
  selectAgricultor.innerHTML = `<option value="primera_opcion" disabled selected>Seleccione el agricultor</option>`;
  agricultores.forEach((a) => {
    const opcion = document.createElement("option");
    opcion.value = a.DNI;
    opcion.textContent = `${a.Nombre} ${a.Apellido1} - ${a.DNI}`;
    selectAgricultor.appendChild(opcion);
  });
};

// Actualizar opciones explotaciones
const actualizarSelectExplotaciones = (lista) => {
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
  lista.forEach((explotacion) => {
    const option = document.createElement("option");
    option.value = explotacion.idExplotacion;
    option.textContent = `${explotacion.Nombre} | ${explotacion.Superficie_total} ha`;
    selectExplotacion.appendChild(option);
  });
};

// Cargar explotaciones del agricultor
const cargarCamposExplotacion = () => {
  fetch(
    `http://localhost:3000/agricultores/explotaciones/${camposAgricultor.dni.value}`
  )
    .then((response) => response.json())
    .then((explotaciones) => {
      if (!Array.isArray(explotaciones) || explotaciones.length === 0) {
        alert("Este agricultor no tiene ninguna explotación.");
        return;
      }
      desbloquearExplotacion();
      window.explotacionesOriginales = explotaciones;
      actualizarSelectExplotaciones(explotaciones);
    })
    .catch((error) => {
      console.error("Error cargando explotaciones:", error);
    });
};

// Cargar agricultores al cargar la página
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("http://localhost:3000/agricultores/todos");
    const data = await res.json();
    window.listaAgricultores = data;
    actualizarSelectAgricultores(data);
  } catch (error) {
    console.error("Error al cargar agricultores:", error);
  }
});

// Función para cargar el select con los equipos
const cargarSelectEquipos = (lista) => {
    selectEquipamiento.innerHTML = `
        <option value="" disabled selected>Seleccione el equipo</option>
    `;
    lista.forEach((equipo) => {
        const option = document.createElement("option");
        option.value = equipo.Numero_ROMA;
        option.textContent = `${equipo.Nombre} | ${equipo.Numero_ROMA}`;
        selectEquipamiento.appendChild(option);
    });
};

// Al seleccionar agricultor
selectAgricultor.addEventListener("change", async (e) => {
  const dniSeleccionado = e.target.value;
  if (!dniSeleccionado || dniSeleccionado === "primera_opcion") return;

  try {
    const res = await fetch(
      `http://localhost:3000/agricultores/buscar/dni/${dniSeleccionado}`
    );
    limpiarCamposExplotacion();
    limpiarCamposEquipos();
    bloquearExplotacion();
    const data = await res.json();
    mostrarDatosAgricultor(data);
    cargarCamposExplotacion();
    limpiarCamposEquipos();
    bloquearEquipo();
  } catch (error) {
    alert("Error al cargar datos del agricultor.");
    console.error("Error:", error);
  }
});

// Filtro de agricultores por texto
inputBuscarAgricultor.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = listaAgricultores.filter((a) =>
    `${a.Nombre} ${a.Apellido1} ${a.Apellido2} ${a.DNI}`
      .toLowerCase()
      .includes(texto)
  );
  actualizarSelectAgricultores(filtrados);
});

// Al seleccionar explotación
selectExplotacion.addEventListener("change", () => {
  const idSeleccionado = selectExplotacion.value;
  const seleccionada = window.explotacionesOriginales.find(
    (exp) => exp.idExplotacion == idSeleccionado
  );

  if (seleccionada) {
    mostrarDatosExplotacion(seleccionada);
    desbloquearCamposEquipos(); // desbloqueamos campos de equipo aquí
  }
});

// Filtrar explotaciones por texto
inputBuscarExplotacion.addEventListener("input", () => {
  const texto = inputBuscarExplotacion.value.trim().toLowerCase();
  const filtradas = window.explotacionesOriginales.filter((exp) =>
    exp.Nombre.toLowerCase().includes(texto)
  );
  actualizarSelectExplotaciones(filtradas);
});

selectEquipamiento.addEventListener("change", async () => {
  const valorSeleccionado = selectEquipamiento.value;
  const seleccionada = window.equipos.find(
    (equipo) => equipo.Numero_ROMA == valorSeleccionado
  );

  if (seleccionada) {
    mostrarDatosEquipo(seleccionada);
  }
});


// Obtener parcelas totales de una explotación
const obtenerParcelasTotales = async (idSeleccionado) => {
  fetch(`http://localhost:3000/explotaciones/parcelas/${idSeleccionado}`)
    .then((res) => res.json())
    .then((data) => {
      camposExplotacion.parcelas.value = data.total;
    })
    .catch((err) => {
      console.error("Error al obtener parcelas:", err);
      camposExplotacion.parcelas.value = "—";
    });

    desbloquearCamposEquipos();
    cargarEquipos(idSeleccionado);
    limpiarCamposEquipos(); 

};

// Evento select explotación
selectExplotacion.addEventListener("change", () => {
  const idSeleccionado = selectExplotacion.value;
  const seleccionada = window.explotacionesOriginales.find(
    (exp) => exp.idExplotacion == idSeleccionado
  );

  if (seleccionada) {
    
    mostrarDatosExplotacion(seleccionada);
    obtenerParcelasTotales(idSeleccionado);
  }
});


// Función para cargar el select con equipos
const actualizarSelectEquipos = (equipos) => {
  selectEquipamiento.innerHTML =
    "<option disabled selected>Seleccione el equipo</option>";
  equipos.forEach((equipo) => {
    const option = document.createElement("option");
    option.value = equipo.Numero_ROMA;
    option.textContent = `${equipo.Nombre} | ${equipo.Numero_ROMA}`;
    selectEquipamiento.appendChild(option);
  });
};


//Cargar equipos de una explotación
const cargarEquipos = async (idExplotacion) => {
  if (!idExplotacion) return;

  try {
    const res = await fetch(
      `http://localhost:3000/equipos/explotacion/${idExplotacion}`
    );
    const equipos = await res.json();

    if (!Array.isArray(equipos) || equipos.length === 0) {
      alert("No hay equipos disponibles para esta explotación.");
      bloquearEquipo();
      return;
    }
    window.equipos = equipos;
    desbloquearCamposEquipos();
    cargarSelectEquipos(equipos);
  
  } catch (err) {
    console.error("Error al cargar equipos:", err);
  }
};

// Evento input equipo de tratamiento para filtrar
inputBuscarEquipo.addEventListener("input", () => {
  const texto = inputBuscarEquipo.value.trim().toLowerCase();
  if (!window.equipos || window.equipos.length === 0) return;

  const filtradas = window.equipos.filter((equipo) =>
    `${equipo.Nombre} | ${equipo.Numero_ROMA}`.toLowerCase().includes(texto)
  );

  actualizarSelectEquipos(filtradas);
});
const btnAsignarEquipo = document.getElementById("desasignar-equipamiento");
// desasignar_equipamientos.js

const btnDesasignarEquipo = document.getElementById("desasignar-equipamiento");

btnDesasignarEquipo.addEventListener("click", async (e) => {
  e.preventDefault();

  const idExplotacion = camposExplotacion.id.value.trim();
  const numeroROMA = camposEquipamiento.numeroRoma.value.trim();

  if (!idExplotacion || !numeroROMA) {
    return alert("Debes seleccionar un equipo para poder desasignarlo de una explotación.");
  }

  const confirmacion = confirm(`¿Seguro que deseas desasignar el equipo ${numeroROMA} de la explotación ${idExplotacion}?`);
  if (!confirmacion) return;

  try {
    const res = await fetch("http://localhost:3000/explotaciones/desasignar-equipo", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        explotacion_idExplotacion: idExplotacion,
        equipo_Numero_ROMA: numeroROMA,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      alert("Equipamiento desasignado correctamente.");
      limpiarCamposEquipos();
      location.reload();
    } else {
      alert(data.error || "Error al desasignar el equipamiento.");
    }
  } catch (error) {
    console.error("Error en la desasignación:", error);
    alert("Error al desasignar equipamiento.");
  }
});
