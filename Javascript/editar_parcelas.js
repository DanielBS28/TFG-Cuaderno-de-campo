const formGeneral = document.getElementById("general");

// DATOS AGRICULTOR
const dniAgricultor = document.getElementById("busqueda-dni");
const botonBuscarAgricultor = document.getElementById(
  "buscar-agricultor-boton"
);

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
  selectTipoRegadio: document.getElementById("tipo_regadio"),
  inputBuscarTipoCultivo: document.getElementById("nombre-cultivo"),
  selectTipoCultivo: document.getElementById("seleccion-cultivo"),
};

// ### FUNCIONES ### //
// Función para mostrar los datos del agricultor
const mostrarDatosAgricultor = (data) => {
  camposAgricultor.nombre.value = data.Nombre;
  camposAgricultor.apellido1.value = data.Apellido1;
  camposAgricultor.apellido2.value = data.Apellido2;
  camposAgricultor.dni.value = data.dni;
  camposAgricultor.carnet.value = data.carnet;
};

// Función para mostrar los datos de la parcela
const mostrarDatosParcela = (seleccionada) => {
  window.idParcelaOriginal = seleccionada.idParcela;

  camposParcela.id.value = seleccionada.idParcela;
  camposParcela.nombre.value = seleccionada.Nombre;
  camposParcela.codigoProvincia.value = seleccionada.Codigo_Provincia;
  camposParcela.codigoMunicipio.value = seleccionada.Codigo_Municipio;
  camposParcela.nombreMunicipio.value = seleccionada.Nombre_Municipio;
  camposParcela.numPoligono.value = seleccionada.Poligono;
  camposParcela.numParcela.value = seleccionada.Parcela;
  camposParcela.superficieSIGPAC.value = seleccionada.Superficie_SIGPAC;
  camposParcela.selectTipoRegadio.value = seleccionada.Tipo_Regadio;
  camposParcela.selectTipoCultivo.value = seleccionada.Tipo_Cultivo;
};

// Desbloquear todos los campos de datos de la parcela
const desbloquearCamposParcela = () => {
  for (const key in camposParcela) {
    if (camposParcela[key]) {
      camposParcela[key].disabled = false;
    }
  }
};

// Desbloquear campos de explotación
const desbloquearExplotacion = () => {
  inputBuscarExplotacion.disabled = false;
  inputBuscarExplotacion.value = "";

  selectExplotacion.disabled = false;
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
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
  selectParcela.innerHTML =
    "<option selected disabled>Seleccione una parcela</option>";
  selectParcela.selectedIndex = 0;
  selectParcela.disabled = true;
  inputBuscarParcela.disabled = true;
  for (const key in camposParcela) {
    camposParcela[key].value = "";
  }
  camposParcela.selectTipoRegadio.selectedIndex = 0;
  camposParcela.selectTipoCultivo.selectedIndex = 0;
};

const bloquearParcela = () => {
  camposParcela.id.disabled = true;
  camposParcela.nombre.disabled = true;
  camposParcela.codigoProvincia.disabled = true;
  camposParcela.codigoMunicipio.disabled = true;
  camposParcela.nombreMunicipio.disabled = true;
  camposParcela.numPoligono.disabled = true;
  camposParcela.numParcela.disabled = true;
  camposParcela.superficieSIGPAC.disabled = true;
  camposParcela.selectTipoRegadio.disabled = true;
  camposParcela.inputBuscarTipoCultivo.disabled = true;
  camposParcela.selectTipoCultivo.disabled = true;
};

// Validación de sintaxis
const validarCamposParcela = (datos) => {
  const errores = [];
  const esNatural = (valor) => /^\d+$/.test(valor);

  if (!esNatural(datos.id)) errores.push("El ID debe ser un número natural.");
  if (!esNatural(datos.codigoProvincia))
    errores.push("Código de provincia inválido.");
  if (!esNatural(datos.codigoMunicipio))
    errores.push("Código de municipio inválido.");
  if (!esNatural(datos.numPoligono)) errores.push("Polígono inválido.");
  if (!esNatural(datos.numParcela)) errores.push("Parcela inválida.");

  const superficie = parseFloat(datos.superficieSIGPAC);
  if (isNaN(superficie) || superficie < 0)
    errores.push("Superficie SIGPAC inválida.");

  if (!datos.tipoRegadio || datos.tipoRegadio === "Seleccione")
    errores.push("Selecciona un tipo de regadío.");

  if (!datos.tipoCultivo || datos.tipoCultivo === "Seleccione")
    errores.push("Selecciona un tipo de cultivo.");

  if (!datos.nombre)
    errores.push("El nombre de la parcela no puede estar vacío.");
  if (!datos.nombreMunicipio)
    errores.push("El nombre del municipio no puede estar vacío.");

  return errores;
};

// Renderizar opciones de explotaciones
const renderizarOpcionesExplotaciones = (lista) => {
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
      limpiarCamposParcela();
      bloquearParcela();

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

// Rellenar las opciones del select de parcelas
const renderizarOpcionesParcelas = (lista) => {
  selectParcela.innerHTML =
    "<option selected disabled>Seleccione una parcela</option>";
  lista.forEach((parcela) => {
    const option = document.createElement("option");
    option.value = parcela.idParcela;
    option.textContent = `${parcela.Nombre} | ${parcela.Superficie_SIGPAC} ha`;
    selectParcela.appendChild(option);
  });
};

// Obtener parcelas de una explotación
const cargarParcelasDeExplotacion = async (idExplotacion) => {
  try {
    const res = await fetch(
      `http://localhost:3000/parcelas/explotacion/${idExplotacion}`
    );
    const parcelas = await res.json();

    limpiarCamposParcela();
    bloquearParcela();

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

const renderizarCultivos = (lista) => {
  camposParcela.selectTipoCultivo.innerHTML = `
        <option disabled selected>Seleccione el tipo de cultivo</option>
      `;

  lista.forEach(({ Cultivo }) => {
    const option = document.createElement("option");
    option.value = Cultivo;
    option.textContent = Cultivo;
    camposParcela.selectTipoCultivo.appendChild(option);
  });
};

// Cargar todos los tipos de cultivo en el select
const cargarCultivos = (valorSeleccionado = null) => {
  fetch("http://localhost:3000/parcelas/cultivos")
    .then((res) => res.json())
    .then((cultivos) => {
      cultivosOriginales = cultivos;
      renderizarCultivos(cultivosOriginales);

      if (valorSeleccionado) {
        camposParcela.selectTipoCultivo.value = valorSeleccionado;
      }
    })
    .catch((err) => {
      console.error("Error al cargar cultivos:", err);
    });
};

// ### EVENTOS ### //
// Evento botón buscar agricultor
botonBuscarAgricultor.addEventListener("click", async (e) => {
  e.preventDefault();
  const dni = dniAgricultor.value.trim();

  if (!dni) return alert("Introduce un DNI");

  const res = await fetch(
    `http://localhost:3000/agricultores/buscar/dni/${dni}`
  );
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
    desbloquearCamposParcela();
    cargarCultivos(seleccionada.Tipo_Cultivo);
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

  renderizarOpcionesParcelas(filtradas);
});

//Escuchar cambios en el inputBuscarTipoCultivo para filtrar
camposParcela.inputBuscarTipoCultivo.addEventListener("input", () => {
  const texto = camposParcela.inputBuscarTipoCultivo.value.toLowerCase();

  const filtrados = cultivosOriginales.filter(({ Cultivo }) =>
    Cultivo.toLowerCase().includes(texto)
  );

  renderizarCultivos(filtrados);
});

formGeneral.addEventListener("submit", async (e) => {
  e.preventDefault(); // Evita recarga de página

  const idOriginal = window.idParcelaOriginal;
  const datos = {
    id: camposParcela.id.value.trim(),
    nombre: camposParcela.nombre.value.trim(),
    codigoProvincia: camposParcela.codigoProvincia.value.trim(),
    codigoMunicipio: camposParcela.codigoMunicipio.value.trim(),
    nombreMunicipio: camposParcela.nombreMunicipio.value.trim(),
    numPoligono: camposParcela.numPoligono.value.trim(),
    numParcela: camposParcela.numParcela.value.trim(),
    superficieSIGPAC: camposParcela.superficieSIGPAC.value.trim(),
    tipoRegadio: camposParcela.selectTipoRegadio.value,
    tipoCultivo: camposParcela.selectTipoCultivo.value,
  };

  const errores = validarCamposParcela(datos);
  if (errores.length > 0) {
    alert("Errores encontrados:\n" + errores.join("\n"));
    return; 
  }

  try {
    const res = await fetch(
      `http://localhost:3000/parcelas/editar/${idOriginal}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datos),
      }
    );

    const resultado = await res.json();

    if (res.ok) {
      alert("Datos de la parcela actualizados correctamente.");
      location.reload();
    } else {
      alert(resultado.error || "Error al actualizar los datos.");
    }
  } catch (err) {
    console.error("Error en el servidor:", err);
    alert("Error en el servidor al actualizar la parcela.");
  }
});
