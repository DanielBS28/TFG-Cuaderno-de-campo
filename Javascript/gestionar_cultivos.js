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

// DATOS RECINTO
const selectRecinto = document.getElementById("optionsContainer");

const selectTipoCultivo = document.getElementById("seleccion");
const inputBuscarTipoCultivo = document.getElementById("nombre-cultivo");
const nombreCultivo = document.getElementById("nombre-cultivo-buscado");
const selectTipoRegadio = document.getElementById("tipo_regadio");

const btnCrearCultivo = document.getElementById("crear-cultivo");

// ### FUNCIONES ### //
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

// Mostrar datos de parcela
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

// Limpiar campos de recinto
const limpiarCamposCultivo = () => {
  nombreCultivo.value = "";
};

// Desbloquear campos de explotación
const desbloquearExplotacion = () => {
  inputBuscarExplotacion.disabled = false;
  inputBuscarExplotacion.value = "";

  selectExplotacion.disabled = false;
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
};

// Desbloquear campos de parcela
const desbloquearParcela = () => {
  selectParcela.disabled = false;
  inputBuscarParcela.disabled = false;
};

// Desbloquear tipo de cultivo
const desbloquearTipoCultivo = () => {
  selectTipoCultivo.disabled = false;
  inputBuscarTipoCultivo.disabled = false;
  selectTipoRegadio.disabled = false;
};

// Bloquear Filtro y Select de Agricultor
const bloquearAgricultor = () => {
  selectAgricultor.innerHTML =
    "<option selected disabled>Seleccione un agricultor</option>";
  selectAgricultor.selectedIndex = 0;
  selectAgricultor.disabled = true;
  inputBuscarAgricultor.value = "";
  inputBuscarAgricultor.disabled = true;
}

// Bloquear Filtro y Select de Explotación
const bloquearExplotacion = () => {
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
  selectExplotacion.selectedIndex = 0;
  selectExplotacion.disabled = true;
  inputBuscarExplotacion.value = "";
  inputBuscarExplotacion.disabled = true;
};

// Bloquear Filtro y Select de Parcela
const bloquearParcela = () => {
  selectParcela.innerHTML =
    "<option selected disabled>Seleccione una parcela</option>";
  selectParcela.selectedIndex = 0;
  selectParcela.disabled = true;
  inputBuscarParcela.value = "";
  inputBuscarParcela.disabled = true;
};

// Bloquear y Limpiar Filtro y Select de Recinto
const bloquearRecinto = () => {
  selectRecinto.innerHTML =
    "<div class='options-container' id='optionsContainer'></div>";
};

// Bloquear y Limpiar Filtro y Select de Tipo Cultivo
const bloquearTipoCultivo = () => {
  selectTipoCultivo.selectedIndex = 0;
  selectTipoCultivo.disabled = true;
  inputBuscarTipoCultivo.value = "";
  inputBuscarTipoCultivo.disabled = true;
  selectTipoRegadio.selectedIndex = 0;
  selectTipoRegadio.disabled = true;
};

// Obtener el cultivo de un recinto
const obtenerCultivoDeRecinto = (tipoCultivo) =>
  !tipoCultivo ? "Sin cultivo" : tipoCultivo;

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

// Rellenar las opciones del select de recintos
const actualizarSelectRecintos = (lista) => {
  let html = ``;

  for (const r of lista) {
    html += `
      <label class="option-item">
        <input type="checkbox" value="${r.idRecinto}">${r.Numero} | ${
      r.Descripcion_uso
    } | ${r.Superficie_ha} | ${obtenerCultivoDeRecinto(r.Tipo_Cultivo)}</input>
      </label>
    `;
  }

  selectRecinto.innerHTML = html;
};

// Rellenar las opciones del select de cultivos
const renderizarCultivos = (lista) => {
  selectTipoCultivo.innerHTML = `
      <option disabled selected>Seleccione el tipo de cultivo</option>`;
  lista.forEach(({ Cultivo }) => {
    const option = document.createElement("option");
    option.value = Cultivo;
    option.textContent = Cultivo;
    selectTipoCultivo.appendChild(option);
  });
};

// Función para cargar las explotaciones del agricultor
const cargarCamposExplotacion = () => {
  fetch(
    `http://localhost:3000/agricultores/explotaciones/${camposAgricultor.dni.value}`
  )
    .then((response) => response.json())
    .then((explotaciones) => {
      limpiarCamposCultivo();
      bloquearTipoCultivo();
      bloquearRecinto();
      limpiarCamposParcela();
      bloquearParcela();
      limpiarCamposExplotacion();

      if (!Array.isArray(explotaciones) || explotaciones.length === 0) {
        alert("Este agricultor no tiene ninguna explotación.");
        bloquearExplotacion();
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

    limpiarCamposCultivo();
    bloquearRecinto();
    bloquearTipoCultivo();

    if (!Array.isArray(parcelas) || parcelas.length === 0) {
      limpiarCamposParcela();
      bloquearParcela();
      alert("Esta explotación no tiene parcelas.");
      return;
    }

    window.parcelas = parcelas;
    actualizarSelectParcelas(parcelas);

    desbloquearParcela();
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
    })
    .catch((err) => {
      console.error("Error al obtener tratamientos:", err);
      camposParcela.tratamientos.value = "—";
    });
};

// Obtener recintos de una parcela
const cargarRecintosDeParcela = async (idParcela) => {
  try {
    const res = await fetch(
      `http://localhost:3000/recintos/parcela/${idParcela}`
    );
    const recintos = await res.json();

    limpiarCamposCultivo();
    bloquearRecinto();
    bloquearTipoCultivo();
    if (!Array.isArray(recintos) || recintos.length === 0) {
      alert("Esta parcela no tiene recintos.");
      return;
    }

    window.recintos = recintos;
    actualizarSelectRecintos(recintos);
    desbloquearTipoCultivo();
  } catch (error) {
    console.error("Error al cargar recintos:", error);
  }
};

// Cargar todos los tipos de cultivo en el select
const cargarCultivos = () => {
  fetch("http://localhost:3000/cultivos")
    .then((res) => res.json())
    .then((cultivos) => {
      if (!Array.isArray(cultivos) || cultivos.length === 0) {
        bloquearAgricultor();
        return alert("No hay cultivos disponibles. Asegúrese de actualizar el JSON para cargar los cultivos en la base de datos.");
      }

      window.cultivosOriginales = cultivos; // Guardamos lista original
      renderizarCultivos(cultivosOriginales);
    })
    .catch((err) => {
      console.error("Error al cargar cultivos:", err);
    });
};

// Crear cultivo en el recinto seleccionado
const realizarCultivo = async () => {
  const checkboxesSeleccionados = document.querySelectorAll(
    "#optionsContainer input[type='checkbox']:checked"
  );
  const tipoCultivo = nombreCultivo.value.trim();
  const tipoRegadio = selectTipoRegadio.value;

  if (checkboxesSeleccionados.length === 0) {
    alert("Debes seleccionar al menos un recinto.");
    return;
  }

  if (!tipoCultivo || !tipoRegadio || selectTipoRegadio.selectedIndex === 0) {
    alert("Debes seleccionar tipo de cultivo y tipo de regadío.");
    return;
  }

  const confirmacion = confirm(
    `¿Estás seguro de que quieres asignar el cultivo "${tipoCultivo}" y el tipo de regadío "${tipoRegadio}" a ${checkboxesSeleccionados.length} recinto(s)?`
  );

  if (!confirmacion) return;

  try {
    let errores = 0;

    for (const checkbox of checkboxesSeleccionados) {
      const idRecinto = checkbox.value;

      const res = await fetch(
        `http://localhost:3000/recintos/cultivar/${idRecinto}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tipoCultivo, tipoRegadio }),
        }
      );

      if (!res.ok) {
        console.error(`Error en recinto ${idRecinto}`);
        errores++;
      }
    }

    if (errores === 0) {
      alert("¡Todos los cultivos se asignaron correctamente!");
    } else {
      alert(
        `Se asignaron algunos cultivos con errores. Revisa la consola para más detalles.`
      );
    }

    location.reload();
  } catch (error) {
    console.error("Error general al asignar cultivos:", error);
    alert("Ocurrió un error inesperado al registrar los cultivos.");
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
  cargarCultivos();
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
    mostrarDatosExplotacion(seleccionada);
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
    cargarRecintosDeParcela(idSeleccionado);
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

// Evento select tipo cultivo
selectTipoCultivo.addEventListener("change", () => {
  const cultivoSeleccionado = selectTipoCultivo.value;
  if (cultivoSeleccionado) {
    nombreCultivo.value = cultivoSeleccionado;
  } else {
    nombreCultivo.value = "";
  }
});

// Evento input tipo cultivo para filtrar
inputBuscarTipoCultivo.addEventListener("input", () => {
  const texto = inputBuscarTipoCultivo.value.trim().toLowerCase();

  if (!window.cultivosOriginales || window.cultivosOriginales.length === 0)
    return;

  const filtradas = window.cultivosOriginales.filter((cultivo) =>
    cultivo.Cultivo.toLowerCase().includes(texto)
  );

  renderizarCultivos(filtradas);
});

//Evento del select multiple de recintos

function initMultiSelect() {
  const selectHeader = document.getElementById("selectHeader");
  const optionsContainer = document.getElementById("optionsContainer");
  const checkboxes = document.querySelectorAll(".option-item input");
  const selectedCount = document.getElementById("selectedCount");

  // Toggle del dropdown
  selectHeader.addEventListener("click", function () {
    optionsContainer.classList.toggle("open");
    selectHeader.classList.toggle("open");
  });

  // Cerrar al hacer clic fuera
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".custom-multiselect")) {
      optionsContainer.classList.remove("open");
      selectHeader.classList.remove("open");
    }
  });
}

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", initMultiSelect);

// Evento botón crear cultivo
btnCrearCultivo.addEventListener("click", (e) => {
  e.preventDefault();
  realizarCultivo();
});

// Evento botón mostrar parcela en el SIGPAC
document.getElementById("SIGPAC").addEventListener("click", (e) => {
  e.preventDefault();
  const idParcela = camposParcela.id.value;
  if (!idParcela) return alert("No hay ninguna parcela seleccionada.");

  const urlSIGPAC = `https://sigpac.mapa.es/fega/visor/?provincia=${camposParcela.codigoProvincia.value}&municipio=${camposParcela.codigoMunicipio.value}&agregado=${camposParcela.agregado.value}&zona=${camposParcela.zona.value}&poligono=${camposParcela.numPoligono.value}&parcela=${camposParcela.numParcela.value}`;

  window.open(urlSIGPAC, "_blank");
});
