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
let option = document.createElement("option");

const camposExplotacion = {
  id: document.getElementById("id-explotacion"),
  nombre: document.getElementById("nombre-buscado-explotacion"),
  superficie: document.getElementById("superficie"),
  parcelas: document.getElementById("total-parcelas"),
};

//DATOS EQUIPAMIENTO

const camposEquipamiento = {

    roma: document.getElementById("numero_roma"),
    nombre: document.getElementById("nombre-equipo-tratamiento"),
    fechaAdquisicion: document.getElementById("fecha_adquisicion"),
    fechaRevision: document.getElementById("fecha_ultima_inspeccion")
}

//Botón de crear y asignar equipamiento
const btn_crear_y_asignar_equipamiento = document.getElementById("crear-asignar-equipamiento");

// #### FUNCIONES ## //
// Función para mostrar los datos del agricultor
const mostrarDatosAgricultor = (data) => {
  camposAgricultor.nombre.value = data.Nombre;
  camposAgricultor.apellido1.value = data.Apellido1;
  camposAgricultor.apellido2.value = data.Apellido2;
  camposAgricultor.dni.value = data.dni;
  camposAgricultor.carnet.value = data.carnet;
};

// Mostar datos de explotación
const mostrarDatosExplotacion = (seleccionada) => {
    camposExplotacion.id.value = seleccionada.idExplotacion;
    camposExplotacion.nombre.value = seleccionada.Nombre;
    camposExplotacion.superficie.value = `${seleccionada.Superficie_total} ha`;
  };
  

// Limpiar campos de explotación
const limpiarCamposExplotacion = () => {
  camposExplotacion.id.value = "";
  camposExplotacion.nombre.value = "";
  camposExplotacion.superficie.value = "";
  camposExplotacion.parcelas.value = "";
  selectExplotacion.selectedIndex = 0;
};

//Limpiar campos de equipamiento

const limpiarCamposEquipos = () => {
    camposEquipamiento.nombre.value = "";
    camposEquipamiento.roma.value = "";
    camposEquipamiento.fechaAdquisicion.value = "";
    camposEquipamiento.fechaRevision.value = "";
}

const bloquearCamposEquipos = () =>{

    camposEquipamiento.nombre.disabled = true;
    camposEquipamiento.roma.disabled = true;
    camposEquipamiento.fechaAdquisicion.disabled = true;
    camposEquipamiento.fechaRevision.disabled = true;
}


const desbloquearCamposEquipos = () =>{
    camposEquipamiento.nombre.disabled = false;
    camposEquipamiento.roma.disabled = false;
    camposEquipamiento.fechaAdquisicion.disabled = false;
    camposEquipamiento.fechaRevision.disabled = false;
} 

const bloquearExplotacion = () => {
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
  selectExplotacion.selectedIndex = 0;
  selectExplotacion.disabled = true;
  inputBuscarExplotacion.value = "";
  inputBuscarExplotacion.disabled = true;
}


// Desbloquear campos de explotación
const desbloquearExplotacion = () => {
  inputBuscarExplotacion.disabled = false;
  inputBuscarExplotacion.value = "";

  selectExplotacion.disabled = false;
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
};

// Actualizar el select de agricultores
const actualizarSelectAgricultores = (agricultores) => {
  selectAgricultor.innerHTML = `<option value="primera_opcion" disabled selected>Seleccione el agricultor</option>`;
  agricultores.forEach((a) => {
    const opcion = document.createElement("option");
    opcion.value = a.DNI;
    opcion.textContent = `${a.Nombre} ${a.Apellido1} - ${a.DNI}`;
    selectAgricultor.appendChild(opcion);
  });
};

// Renderizar opciones de explotaciones
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


// Función para cargar las explotaciones del agricultor
const cargarCamposExplotacion = () => {
  fetch(
    `http://localhost:3000/agricultores/explotaciones/${camposAgricultor.dni.value}`
  )
    .then((response) => response.json())
    .then((explotaciones) => {
      limpiarCamposExplotacion();

      if (!Array.isArray(explotaciones) || explotaciones.length === 0) {
        bloquearExplotacion();
        limpiarCamposEquipos();
        bloquearCamposEquipos();
        alert("Este agricultor no tiene ninguna explotación.");
        return;
      }

      window.explotacionesOriginales = explotaciones;
      actualizarSelectExplotaciones(explotaciones);
    })
    .catch((error) => {
      console.error("Error cargando explotaciones:", error);
    });
};

//Cargar las parcelas totales de la explotación
const obtenerParcelasTotales = async (idSeleccionado) => {
  fetch(`http://localhost:3000/explotaciones/parcelas/${idSeleccionado}`)
    .then((res) => res.json())
    .then((data) => {
      camposExplotacion.parcelas.value = data.total;
      desbloquearCamposEquipos();
    })
    .catch((err) => {
      console.error("Error al obtener parcelas:", err);
      camposExplotacion.parcelas.value = "—";
    });
};

// ### EVENTOS ### //
// Cargar todos los agricultores al iniciar
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("http://localhost:3000/agricultores/todos");
    const data = await res.json();
    listaAgricultores = data;
    actualizarSelectAgricultores(data);
  } catch (error) {
    console.error("Error al cargar agricultores:", error);
  }
});

// Mostrar datos del Agricultor al seleccionar
selectAgricultor.addEventListener("change", async (e) => {
  const dniSeleccionado = e.target.value;
  if (!dniSeleccionado || dniSeleccionado === "primera_opcion") return;

  try {
    const res = await fetch(
      `http://localhost:3000/agricultores/buscar/dni/${dniSeleccionado}`
    );
    const data = await res.json();
    mostrarDatosAgricultor(data);
    desbloquearExplotacion();
    cargarCamposExplotacion();
    bloquearCamposEquipos();
    limpiarCamposEquipos();
    
  } catch (error) {
    alert("Error al cargar datos del agricultor.");
    console.error("Error:", error);
  }
});


// Filtro del select Agricultor
inputBuscarAgricultor.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = listaAgricultores.filter((a) =>
    `${a.Nombre} ${a.Apellido1} ${a.Apellido2} ${a.DNI}`
      .toLowerCase()
      .includes(texto)
  );
  actualizarSelectAgricultores(filtrados);
});

// Evento select explotación
selectExplotacion.addEventListener("change", () => {
  const idSeleccionado = selectExplotacion.value;
  const seleccionada = window.explotacionesOriginales.find(
    (exp) => exp.idExplotacion == idSeleccionado
  );

  if (seleccionada) {
    // Imprimir datos de explotación
    camposExplotacion.id.value = seleccionada.idExplotacion;
    camposExplotacion.nombre.value = seleccionada.Nombre;
    camposExplotacion.superficie.value = `${seleccionada.Superficie_total} ha`;
    obtenerParcelasTotales(camposExplotacion.id.value);

  }
});

// Escuchar cambios en el inputBuscarExplotacion para filtrar
inputBuscarExplotacion.addEventListener("input", () => {
  const texto = inputBuscarExplotacion.value.toLowerCase();
  const filtradas = window.explotacionesOriginales.filter((exp) =>
    exp.Nombre.toLowerCase().includes(texto)
  );
  actualizarSelectExplotaciones(filtradas);
});

btn_crear_y_asignar_equipamiento.addEventListener("click", async (e) => {
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
        } else {
            alert("Error: " + (resultado.error || "Error inesperado"));
        }
    } catch (error) {
        alert("Error de red o del servidor.");
        console.error("Error al enviar datos:", error);
    }

      await registrarEquipo();
  
  });

  const registrarEquipo = async () =>{

    const idExplotacion = camposExplotacion.id.value.trim();
    const numeroROMA = camposEquipamiento.roma.value.trim();

    if (!idExplotacion || !numeroROMA) return;

      try {
        const res = await fetch("http://localhost:3000/explotaciones/asignar-equipo", {
          method: "POST",
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
          alert("Equipamiento asignado correctamente.");
           location.reload(); 
        } else {
          alert(data.error || "Error al asignar el equipamiento.");
        }
      } catch (error) {
        console.error("Error en la asignación:", error);
        alert("Error al asignar equipamiento.");
      }
    
  };
 