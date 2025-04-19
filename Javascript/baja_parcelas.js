// DATOS AGRICULTOR
const dniAgricultor = document.getElementById("busqueda-dni");
const botonBuscarAgricultor = document.getElementById("buscar-agricultor-boton");

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

// DATOS PARCELA
const selectParcela = document.getElementById("seleccion-parcela");
const inputBuscarParcela = document.getElementById("nombre-parcela-busqueda");

const camposParcela = {
  id: document.getElementById("n_identificacion"),
  nombre: document.getElementById("nombre-parcela"),
  codigoProvincia: document.getElementById("codigo_provincia"),
  codigoMunicipio: document.getElementById("codigo_municipio"),
  nombreMunicipio: document.getElementById("nombre_municipio"),
  numPoligono: document.getElementById("poligono"),
  numParcela: document.getElementById("parcela"),
  superficieSIGPAC: document.getElementById("sup_sigpac"),
  tipoRegadio: document.getElementById("tipo_regadio"),
  tipoCultivo: document.getElementById("tipo_cultivo"),
};

// Función para mostrar los datos del agricultor
function mostrarDatosAgricultor(data) {
  camposAgricultor.nombre.value = data.Nombre;
  camposAgricultor.apellido1.value = data.Apellido1;
  camposAgricultor.apellido2.value = data.Apellido2;
  camposAgricultor.dni.value = data.dni;
  camposAgricultor.carnet.value = data.carnet;
}

// Desbloquear campos de explotación
const desbloquearExplotacion = () => {
  inputBuscarExplotacion.disabled = false;
  inputBuscarExplotacion.value = "";

  selectExplotacion.disabled = false;
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
};

// Función para cargar las explotaciones del agricultor
function cargarCamposExplotacion() {
  fetch(`http://localhost:3000/agricultores/explotaciones/${camposAgricultor.dni.value}`)
    .then((response) => response.json())
    .then((explotaciones) => {
      limpiarCamposExplotacion();
      limpiarCamposParcela();

      if (!Array.isArray(explotaciones) || explotaciones.length === 0) {
        selectExplotacion.disabled = true;
        inputBuscarExplotacion.disabled = true;
        alert("Este agricultor no tiene ninguna explotación.");
        return;
      }

      window.explotacionesOriginales = explotaciones;
      renderizarOpcionesExplotaciones(explotaciones);
    })
    .catch((error) => {
      console.error("Error cargando explotaciones:", error);
    });
}

// Renderizar opciones de explotaciones
function renderizarOpcionesExplotaciones(lista) {
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
  lista.forEach((explotacion) => {
    const option = document.createElement("option");
    option.value = explotacion.idExplotacion;
    option.textContent = `${explotacion.Nombre} | ${explotacion.Superficie_total} ha`;
    selectExplotacion.appendChild(option);
  });
}

// Limpiar campos de explotación
function limpiarCamposExplotacion() {
  camposExplotacion.id.value = "";
  camposExplotacion.nombre.value = "";
  camposExplotacion.superficie.value = "";
  camposExplotacion.parcelas.value = "";
  selectExplotacion.selectedIndex = 0;
}

//Cargar las parcelas totales de la explotación
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
};

// Obtener parcelas de una explotación
const cargarParcelasDeExplotacion = async (idExplotacion) => {
  try {
    const res = await fetch(`http://localhost:3000/parcelas/explotacion/${idExplotacion}`);
    const parcelas = await res.json();

    if (!Array.isArray(parcelas) || parcelas.length === 0) {
      selectParcela.disabled = true;
      inputBuscarParcela.disabled = true;
      alert("Esta explotación no tiene parcelas.");
      return;
    }

    window.parcelas = parcelas;
    renderizarOpcionesParcelas(parcelas);

    selectParcela.disabled = false;
    inputBuscarParcela.disabled = false;
  } catch (error) {
    console.error("Error al cargar parcelas:", error);
  }
};

// Rellenar las opciones del select de parcelas
function renderizarOpcionesParcelas(lista) {
  selectParcela.innerHTML =
    "<option selected disabled>Seleccione una parcela</option>";
  lista.forEach((parcela) => {
    const option = document.createElement("option");
    option.value = parcela.idParcela;
    option.textContent = `${parcela.Nombre} | ${parcela.Superficie_SIGPAC} ha`;
    selectParcela.appendChild(option);
  });
}

// Limpiar campos de parcela
function limpiarCamposParcela() {
  selectParcela.innerHTML =
    "<option selected disabled>Seleccione una parcela</option>";
    selectParcela.selectedIndex = 0;
    selectParcela.disabled = true;
    inputBuscarParcela.disabled = true;
  for (const key in camposParcela) {
    camposParcela[key].value = "";
  }
}

// Eliminar parcela seleccionada
async function eliminarParcela(idParcela) {
  const confirmacion = confirm("¿Estás seguro de que quieres eliminar esta parcela?");
  if (!confirmacion) return;

  try {
    const res = await fetch(`http://localhost:3000/parcelas/eliminar/${idParcela}`, {
      method: "DELETE",
    });
    const data = await res.json();

    if (res.ok) {
      alert("✅ Parcela eliminada correctamente");
      location.reload();
    } else {
      alert(data.error || "Error al eliminar la parcela");
    }
  } catch (error) {
    console.error("Error en la eliminación de parcela:", error);
    alert("Error inesperado al eliminar la parcela");
  }
}

// EVENTOS
// Evento botón buscar agricultor
botonBuscarAgricultor.addEventListener("click", async (e) => {
  e.preventDefault();
  const dni = dniAgricultor.value.trim();

  if (!dni) return alert("Introduce un DNI");

  const res = await fetch(`http://localhost:3000/agricultores/buscar/dni/${dni}`);
  const data = await res.json();

  if (res.ok) {
    mostrarDatosAgricultor(data);
    desbloquearExplotacion();
    cargarCamposExplotacion();
  } else {
    alert(data.error || "Agricultor no encontrado");
  }
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
    obtenerParcelasTotales(idSeleccionado);

    // Cargar parcelas en el select
    cargarParcelasDeExplotacion(idSeleccionado);
  }
});

// Escuchar cambios en el inputBuscarExplotacion para filtrar
inputBuscarExplotacion.addEventListener("input", () => {
  const texto = inputBuscarExplotacion.value.toLowerCase();
  const filtradas = window.explotacionesOriginales.filter((exp) =>
    exp.Nombre.toLowerCase().includes(texto)
  );
  renderizarOpcionesExplotaciones(filtradas);
});

// Evento select parcela
selectParcela.addEventListener("change", () => {
  const idSeleccionado = selectParcela.value;
  const seleccionada = window.parcelas.find(
    (parcela) => parcela.idParcela == idSeleccionado
  );

  if (seleccionada) {
    camposParcela.id.value = seleccionada.idParcela;
    camposParcela.nombre.value = seleccionada.Nombre;
    camposParcela.codigoProvincia.value = seleccionada.Codigo_Provincia;
    camposParcela.codigoMunicipio.value = seleccionada.Codigo_Municipio;
    camposParcela.nombreMunicipio.value = seleccionada.Nombre_Municipio;
    camposParcela.numPoligono.value = seleccionada.Poligono;
    camposParcela.numParcela.value = seleccionada.Parcela;
    camposParcela.superficieSIGPAC.value = seleccionada.Superficie_SIGPAC;
    camposParcela.tipoRegadio.value = seleccionada.Tipo_Regadio;
    camposParcela.tipoCultivo.value = seleccionada.Tipo_Cultivo;
  }
});

// Evento input parcela para filtrar
inputBuscarParcela.addEventListener("input", () => {
  const texto = inputBuscarParcela.value.trim().toLowerCase();

  if (!window.parcelas || window.parcelas.length === 0) return;

  const filtradas = window.parcelas.filter((parcela) =>
    parcela.Nombre.toLowerCase().includes(texto)
  );

  renderizarOpcionesParcelas(filtradas);
});


// Evento botón eliminar parcela
document.getElementById("eliminar-parcela").addEventListener("click", (e) => {
  e.preventDefault();
  const idParcela = camposParcela.id.value;
  if (!idParcela) return alert("No hay ninguna parcela seleccionada.");
  eliminarParcela(idParcela);
});
