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

// DATOS PARCELA
const selectParcela = document.getElementById("seleccion-parcela");
const inputBuscarParcela = document.getElementById("nombre-parcela-busqueda");

const camposParcela = {
  id: document.getElementById("n_identificacion"),
  catastro: document.getElementById("n_catastro"),
  nombre: document.getElementById("nombre-parcela"),
  codigoProvincia: document.getElementById("codigo_provincia"),
  codigoMunicipio: document.getElementById("codigo_municipio"),
  nombreMunicipio: document.getElementById("nombre_municipio"),
  agregado: document.getElementById("agregado"),
  zona: document.getElementById("zona"),
  numPoligono: document.getElementById("poligono"),
  numParcela: document.getElementById("parcela"),
  superficieSIGPAC: document.getElementById("sup_sigpac"),
  superficieDeclarada: document.getElementById("sup_declarada"),
  recintos: document.getElementById("recintos"),
  tratamientos: document.getElementById("tratamientos"),
};

// CAMPOS ACTUALIZAR PARCELA
const nuevoNombreParcela = document.getElementById("nuevo-nombre-parcela");
const nuevaSupDeclarada = document.getElementById("nueva_sup_declarada");

// #### FUNCIONES ## //
// Función para mostrar los datos del agricultor
const mostrarDatosAgricultor = (data) => {
  camposAgricultor.nombre.value = data.Nombre;
  camposAgricultor.apellido1.value = data.Apellido1;
  camposAgricultor.apellido2.value = data.Apellido2;
  camposAgricultor.dni.value = data.dni;
  camposAgricultor.carnet.value = data.carnet;
};

const mostrarDatosParcela = (seleccionada) => {
  camposParcela.id.value = seleccionada.idParcela;
  camposParcela.catastro.value = seleccionada.Ref_Catastral;
  camposParcela.nombre.value = seleccionada.Nombre;
  camposParcela.codigoProvincia.value = seleccionada.Codigo_Provincia;
  camposParcela.codigoMunicipio.value = seleccionada.Codigo_Municipio;
  camposParcela.nombreMunicipio.value = seleccionada.Nombre_Municipio;
  camposParcela.agregado.value = seleccionada.Agregado;
  camposParcela.zona.value = seleccionada.Zona;
  camposParcela.numPoligono.value = seleccionada.Poligono;
  camposParcela.numParcela.value = seleccionada.Parcela;
  camposParcela.superficieSIGPAC.value = seleccionada.Superficie_SIGPAC;
  camposParcela.superficieDeclarada.value = seleccionada.Superficie_declarada;
  camposParcela.recintos.value = seleccionada.Numero_recintos;
  camposParcela.tratamientos.value = seleccionada.Numero_tratamientos;
};

// Limpiar campos de explotación
const limpiarCamposExplotacion = () => {
  camposExplotacion.id.value = "";
  camposExplotacion.nombre.value = "";
  camposExplotacion.superficie.value = "";
  camposExplotacion.parcelas.value = "";
  selectExplotacion.selectedIndex = 0;
};

// Limpiar campos de parcela
const limpiarCamposParcela = () => {
  for (const key in camposParcela) {
    camposParcela[key].value = "";
  }
};

const bloquearExplotacion = () => {
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
  selectExplotacion.selectedIndex = 0;
  selectExplotacion.disabled = true;
  inputBuscarExplotacion.value = "";
  inputBuscarExplotacion.disabled = true;
}

const bloquearParcela = () => {
  selectParcela.innerHTML =
    "<option selected disabled>Seleccione una parcela</option>";
  selectParcela.selectedIndex = 0;
  selectParcela.disabled = true;
  inputBuscarParcela.value = "";
  inputBuscarParcela.disabled = true;
}

const bloquearActualizarParcela = () => {
  nuevoNombreParcela.disabled = true;
  nuevaSupDeclarada.disabled = true;
  nuevoNombreParcela.value = "";
  nuevaSupDeclarada.value = "";
}

// Desbloquear campos de explotación
const desbloquearExplotacion = () => {
  inputBuscarExplotacion.disabled = false;
  inputBuscarExplotacion.value = "";

  selectExplotacion.disabled = false;
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
};

const desbloquearActualizarParcela = () => {
  nuevoNombreParcela.disabled = false;
  nuevaSupDeclarada.disabled = false;
  nuevoNombreParcela.value = camposParcela.nombre.value;
  nuevaSupDeclarada.value = camposParcela.superficieDeclarada.value;
}

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

// Rellenar las opciones del select de parcelas
const actualizarSelectParcelas = (lista) => {
  selectParcela.innerHTML =
    "<option selected disabled>Seleccione una parcela</option>";
  lista.forEach((parcela) => {
    const option = document.createElement("option");
    option.value = parcela.idParcela;
    option.textContent = `${parcela.Nombre} | ${parcela.Superficie_SIGPAC} ha`;
    selectParcela.appendChild(option);
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
      limpiarCamposParcela();
      bloquearParcela();
      bloquearActualizarParcela();

      if (!Array.isArray(explotaciones) || explotaciones.length === 0) {
        bloquearExplotacion();
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
    })
    .catch((err) => {
      console.error("Error al obtener parcelas:", err);
      camposExplotacion.parcelas.value = "—";
    });
};

// Obtener parcelas de una explotación
const cargarParcelasDeExplotacion = async (idExplotacion) => {
  try {
    const res = await fetch(
      `http://localhost:3000/parcelas/explotacion/${idExplotacion}`
    );
    const parcelas = await res.json();

    if (!Array.isArray(parcelas) || parcelas.length === 0) {
      bloquearParcela();
      alert("Esta explotación no tiene parcelas.");
      return;
    }

    window.parcelas = parcelas;
    actualizarSelectParcelas(parcelas);

    selectParcela.disabled = false;
    inputBuscarParcela.disabled = false;
  } catch (error) {
    console.error("Error al cargar parcelas:", error);
  }
};

// Obtener recintos totales de una parcela
const obtenerRecintosTotales = async (idParcela) => {
  fetch(`http://localhost:3000/parcelas/recintos/${idParcela}`)
    .then((res) => res.json())
    .then((data) => {
      camposParcela.recintos.value = data.total;
    })
    .catch((err) => {
      console.error("Error al obtener recintos:", err);
      camposParcela.recintos.value = "—";
    });
};

// Obtener tratamientos totales de una parcela
const obtenerTrataminetosTotales = async (idParcela) => {
  fetch(`http://localhost:3000/parcelas/tratamientos/${idParcela}`)
    .then((res) => res.json())
    .then((data) => {
      camposParcela.tratamientos.value = data.total;

      desbloquearActualizarParcela();
    })
    .catch((err) => {
      console.error("Error al obtener tratamientos:", err);
      camposParcela.tratamientos.value = "—";
    });
};

// Editar parcela seleccionada
const editarParcela = async (idParcela) => {
  const nuevoNombre = nuevoNombreParcela.value.trim();
  const superficieInput = nuevaSupDeclarada.value.trim();

  if (!nuevoNombre) {
    alert("El nuevo nombre de la parcela no puede estar vacío.");
    return;
  }

  const nuevaSuperficie = parseFloat(superficieInput.replace(",", "."));
  if (isNaN(nuevaSuperficie) || nuevaSuperficie <= 0) {
    alert("La superficie declarada debe ser un número válido mayor a 0.");
    return;
  }

  const confirmacion = confirm("¿Estás seguro de que quieres actualizar esta parcela?");
  if (!confirmacion) return;

  const body = {
    nombre: nuevoNombre,
    superficieDeclarada: nuevaSuperficie,
  };

  try {
    const res = await fetch(`http://localhost:3000/parcelas/editar/${idParcela}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (res.ok) {
      alert("Parcela editada correctamente");
      location.reload();
    } else {
      alert(data.error || "Error al editar la parcela");
    }
  } catch (error) {
    console.error("Error en la edición de parcela:", error);
    alert("Error inesperado al editar la parcela");
  }
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
    limpiarCamposParcela();
    bloquearActualizarParcela();
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
  actualizarSelectExplotaciones(filtradas);
});

// Evento select parcela
selectParcela.addEventListener("change", () => {
  const idSeleccionado = selectParcela.value;
  const seleccionada = window.parcelas.find(
    (parcela) => parcela.idParcela == idSeleccionado
  );

  if (seleccionada) {
    obtenerRecintosTotales(idSeleccionado);
    obtenerTrataminetosTotales(idSeleccionado);
    mostrarDatosParcela(seleccionada);
  }
});

// Evento input parcela para filtrar
inputBuscarParcela.addEventListener("input", () => {
  const texto = inputBuscarParcela.value.trim().toLowerCase();

  if (!window.parcelas || window.parcelas.length === 0) return;

  const filtradas = window.parcelas.filter((parcela) =>
    parcela.Nombre.toLowerCase().includes(texto)
  );

  actualizarSelectParcelas(filtradas);
});

// Evento botón actualizar parcela
document.getElementById("editar-parcela").addEventListener("click", (e) => {
  e.preventDefault();
  const idParcela = camposParcela.id.value;
  if (!idParcela) return alert("No hay ninguna parcela seleccionada.");
  editarParcela(idParcela);
});

// Evento botón mostrar parcela en el SIGPAC
document.getElementById("SIGPAC").addEventListener("click", (e) => {
  e.preventDefault();
  const idParcela = camposParcela.id.value;
  if (!idParcela) return alert("No hay ninguna parcela seleccionada.");

  const urlSIGPAC = `https://sigpac.mapa.es/fega/visor/?provincia=${camposParcela.codigoProvincia.value}&municipio=${camposParcela.codigoMunicipio.value}&agregado=${camposParcela.agregado.value}&zona=${camposParcela.zona.value}&poligono=${camposParcela.numPoligono.value}&parcela=${camposParcela.numParcela.value}`;

  window.open(urlSIGPAC, "_blank");
});
