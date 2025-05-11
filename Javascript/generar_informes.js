import { formatDate, formatDate2 } from "./ConversionesDosis/calculosDosis.js";

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

// DATOS TRATAMIENTO
const inputFechaInicio = document.getElementById("fecha_inicio");
const inputFechaFinal = document.getElementById("fecha_final");
const selectTratamiento = document.getElementById("seleccion-tratamiento");

const camposTratamiento = {
  id: document.getElementById("id_tratamiento"),
  idParcela: document.getElementById("n_identificacion_parcela"),
  cultivo: document.getElementById("tipo_cultivo_tratamiento"),
  fecha: document.getElementById("fecha_tratamiento"),
  plaga: document.getElementById("plaga-controlada"),
  producto: document.getElementById("producto-aplicado"),
  nRegistroProducto: document.getElementById("n_registro_producto"),
  cantidadProducto: document.getElementById("cantidad_producto"),
  unidadMedida: document.getElementById("unidad-medida"),
  supTratada: document.getElementById("superficie_tratada"),
  supCultivo: document.getElementById("superficie-cultivo"),
  carnetAplicador: document.getElementById("numero_carnet_aplicador"),
};

// DATOS EQUIPO
const camposEquipo = {
  ROMA: document.getElementById("numero_roma"),
  nombre: document.getElementById("nombre_equipo"),
  fechaAdquisicion: document.getElementById("fecha_adquisicion"),
  fechaUltimaInspeccion: document.getElementById("fecha_ultima_inspeccion"),
};

const inputCorreo = document.getElementById("correo");
const btnEnviarCorreo = document.getElementById("generar-informe-correo");
const btnGenerarInforme = document.getElementById("generar-informe-pdf");

// ### FUNCIONES ### \\
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

// Mostrar datos del tratamiento
const mostrarDatosTratamiento = (seleccionada) => {
  camposTratamiento.id.value = seleccionada.idTratamiento;
  camposTratamiento.idParcela.value =
    seleccionada.parcela_Numero_identificacion;
  camposTratamiento.cultivo.value = seleccionada.Tipo_Cultivo;
  camposTratamiento.fecha.value = formatDate2(seleccionada.Fecha_tratamiento);
  camposTratamiento.plaga.value = seleccionada.Plaga_controlar;
  camposTratamiento.producto.value = seleccionada.Nombre_producto;
  camposTratamiento.nRegistroProducto.value =
    seleccionada.Num_registro_producto;
  camposTratamiento.cantidadProducto.value =
    seleccionada.Cantidad_producto_aplicada;
  camposTratamiento.unidadMedida.value = seleccionada.Unidad_medida_dosis;
  camposTratamiento.supTratada.value = seleccionada.Superficie_tratada_ha;
  camposTratamiento.supCultivo.value = seleccionada.Superficie_cultivo;
  camposTratamiento.carnetAplicador.value =
    seleccionada.Numero_carnet_aplicador;
};

// Mostrar datos del equipo
const mostrarDatosEquipo = (seleccionada) => {
  camposEquipo.ROMA.value = seleccionada.Numero_ROMA;
  camposEquipo.nombre.value = seleccionada.Nombre;
  camposEquipo.fechaAdquisicion.value = formatDate2(
    seleccionada.Fecha_adquisicion
  );
  camposEquipo.fechaUltimaInspeccion.value = formatDate2(
    seleccionada.Fecha_ultima_revision
  );
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

// Limpiar campos de tratamiento
const limpiarCamposTratamiento = () => {
  for (const key in camposTratamiento) {
    camposTratamiento[key].value = "";
  }
};

// Limpiar campos de equipo
const limpiarCamposEquipo = () => {
  for (const key in camposEquipo) {
    camposEquipo[key].value = "";
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

// Desbloquear campos de parcela
const desbloquearParcela = () => {
  selectParcela.disabled = false;
  inputBuscarParcela.disabled = false;
};

// Desbloquear campos de tratamiento
const desbloquearTratamiento = () => {
  inputFechaInicio.disabled = false;
  inputFechaFinal.disabled = false;
  selectTratamiento.disabled = false;
};

// Bloquear Filtro y Select de Explotación
const bloquearExplotacion = () => {
  selectExplotacion.selectedIndex = 0;
  selectExplotacion.disabled = true;
  inputBuscarExplotacion.value = "";
  inputBuscarExplotacion.disabled = true;
};

// Bloquear Filtro y Select de Parcela
const bloquearParcela = () => {
  selectParcela.selectedIndex = 0;
  selectParcela.disabled = true;
  inputBuscarParcela.value = "";
  inputBuscarParcela.disabled = true;
};

// Bloquear Filtro y Select de Tratamiento
const bloquearTratamiento = () => {
  selectTratamiento.selectedIndex = 0;
  selectTratamiento.disabled = true;
  inputFechaInicio.value = "";
  inputFechaInicio.disabled = true;
  inputFechaFinal.value = "";
  inputFechaFinal.disabled = true;
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

// Rellenar las opciones del select de tratamientos
const actualizarSelectTratamientos = (lista) => {
  selectTratamiento.innerHTML =
    "<option selected disabled>Seleccione el tratamiento a eliminar</option>";
  lista.forEach((tratamiento) => {
    const option = document.createElement("option");
    option.value = tratamiento.idTratamiento;
    option.textContent = `${tratamiento.Tipo_Cultivo} | ${
      tratamiento.Nombre_producto
    } | ${formatDate(tratamiento.Fecha_tratamiento)}`;
    selectTratamiento.appendChild(option);
  });
};

// Función para cargar las explotaciones del agricultor
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
      alert("Esta explotación no tiene parcelas.");
      return;
    }
    desbloquearParcela();
    window.parcelas = parcelas;
    actualizarSelectParcelas(parcelas);
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

// Obtener todos los tratamiento de la parcela seleccionada
const obtenerTratamientosDeParcela = async (idParcela) => {
  try {
    const res = await fetch(
      `http://localhost:3000/tratamientos/parcela/${idParcela}`
    );
    const tratamientos = await res.json();

    if (!Array.isArray(tratamientos) || tratamientos.length === 0) {
      alert("Esta parcela no tiene tratamientos.");
      return;
    }
    desbloquearTratamiento();
    window.tratamientos = tratamientos;
    actualizarSelectTratamientos(tratamientos);
  } catch (error) {
    console.error("Error al cargar tratamientos:", error);
  }
};

const filtrarTratamientosPorFecha = () => {
  const inicio = inputFechaInicio.value;
  const final = inputFechaFinal.value;

  if (!window.tratamientos) return;

  const tratamientosFiltrados = window.tratamientos.filter((t) => {
    const fechaTrat = new Date(t.Fecha_tratamiento);
    fechaTrat.setHours(0, 0, 0, 0);

    const desde = inicio ? new Date(inicio) : null;
    if (desde) desde.setHours(0, 0, 0, 0);

    const hasta = final ? new Date(final) : null;
    if (hasta) hasta.setHours(0, 0, 0, 0);

    if (desde && fechaTrat < desde) return false;
    if (hasta && fechaTrat > hasta) return false;

    return true;
  });

  actualizarSelectTratamientos(tratamientosFiltrados);
};

// Normalizar Campos para el Informe
const normalizarNombreCampo = (clave) => {
  const mapa = {
    id: "ID Tratamiento",
    idParcela: "ID Parcela",
    cultivo: "Tipo de Cultivo",
    fecha: "Fecha de Tratamiento",
    plaga: "Plaga Controlada",
    producto: "Producto Aplicado",
    nRegistroProducto: "N.º Registro Producto",
    cantidadProducto: "Cantidad Aplicada",
    unidadMedida: "Unidad de Medida",
    supTratada: "Superficie Tratada (ha)",
    supCultivo: "Superficie de Cultivo (ha)",
    carnetAplicador: "Carnet del Aplicador",

    ROMA: "N.º ROMA",
    nombre: "Nombre del Equipo",
    fechaAdquisicion: "Fecha de Adquisición",
    fechaUltimaInspeccion: "Última Inspección",
  };

  // Si no está en el mapa, capitaliza la clave
  return (
    mapa[clave] ||
    clave.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
  );
};

// Generar PDF
const generarPDFInformeTratamientoYEquipo = (
  camposTratamiento,
  camposEquipo,
  logoSrc = "../Fotos/Logo.png",
  existeDoc = null
) => {
  const cultivo = camposTratamiento.cultivo.value.trim();
  const producto = camposTratamiento.producto.value.trim();
  const fecha = formatDate(camposTratamiento.fecha.value.trim());

  const { jsPDF } = window.jspdf;
  const doc = existeDoc || new jsPDF();
  const esNuevo = !existeDoc;

  const logo = new Image();
  logo.src = logoSrc;

  logo.onload = () => {
    doc.addImage(logo, "PNG", 10, 10, 30, 30);

    doc.setFont("times", "normal");
    doc.setFontSize(14);
    doc.text(`Informe del Tratamiento`, 105, 25, { align: "center" });

    doc.setFontSize(11);
    doc.text(
      "Fecha de generación: " + new Date().toLocaleDateString(),
      200,
      40,
      { align: "right" }
    );

    doc.autoTable({
      startY: 50,
      head: [["Campo", "Valor"]],
      body: Object.entries(camposTratamiento).map(([clave, campo]) => [
        normalizarNombreCampo(clave),
        campo.value || "—",
      ]),
      theme: "grid",
      headStyles: { fillColor: [220, 220, 220] },
    });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 10,
      head: [["Campo", "Valor"]],
      body: Object.entries(camposEquipo).map(([clave, campo]) => [
        normalizarNombreCampo(clave),
        campo.value || "—",
      ]),
      theme: "grid",
      headStyles: { fillColor: [220, 220, 220] },
    });

    // Guardar solo si no se proporcionó un doc externo (es decir se usará para descarga)
    if (esNuevo) {
      doc.save(`Informe_Tratamiento_${cultivo}_${producto}_${fecha}.pdf`);
    }
  };
  return doc;
};

const esCorreoValido = (correo) => {
  const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return regex.test(correo);
};

// Generar PDF como promesa
const generarPDFPromesa = (
  camposTratamiento,
  camposEquipo,
  logoSrc = "../Fotos/Logo.png"
) =>
  new Promise((resolve) => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const logo = new Image();
    logo.src = logoSrc;
    logo.onload = () => {
      generarPDFInformeTratamientoYEquipo(
        camposTratamiento,
        camposEquipo,
        logo.src,
        doc
      );

      // Esperamos al siguiente "frame" para asegurarnos de que todo el contenido se renderice
      requestAnimationFrame(() => {
        resolve(doc);
      });
    };
  });

// ### EVENTOS ### //
// Cargar todos los agricultores al iniciar
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

// Mostrar datos del Agricultor al seleccionar
selectAgricultor.addEventListener("change", async (e) => {
  const dniSeleccionado = e.target.value;
  if (!dniSeleccionado || dniSeleccionado === "primera_opcion") return;

  try {
    const res = await fetch(
      `http://localhost:3000/agricultores/buscar/dni/${dniSeleccionado}`
    );
    limpiarCamposExplotacion();
    limpiarCamposParcela();
    limpiarCamposTratamiento();
    limpiarCamposEquipo();

    bloquearExplotacion();
    bloquearParcela();
    bloquearTratamiento();

    const data = await res.json();
    mostrarDatosAgricultor(data);
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
    limpiarCamposTratamiento();
    limpiarCamposEquipo();

    bloquearParcela();
    bloquearTratamiento();

    mostrarDatosExplotacion(seleccionada);
    obtenerParcelasTotales(idSeleccionado);
    // Cargar parcelas en el select
    cargarParcelasDeExplotacion(idSeleccionado);
  }
});

// Escuchar cambios en el inputBuscarExplotacion para filtrar
inputBuscarExplotacion.addEventListener("input", () => {
  const texto = inputBuscarExplotacion.value.trim().toLowerCase();
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
    limpiarCamposTratamiento();
    limpiarCamposEquipo();

    bloquearTratamiento();

    mostrarDatosParcela(seleccionada);
    obtenerRecintosTotales(idSeleccionado);
    obtenerTrataminetosTotales(idSeleccionado);
    obtenerTratamientosDeParcela(idSeleccionado);
  }
});

// Evento input parcela para filtrar
inputBuscarParcela.addEventListener("input", () => {
  const texto = inputBuscarParcela.value.trim().toLowerCase().toLowerCase();

  if (!window.parcelas || window.parcelas.length === 0) return;

  const filtradas = window.parcelas.filter((parcela) =>
    parcela.Nombre.toLowerCase().includes(texto)
  );

  actualizarSelectParcelas(filtradas);
});

// Evento Select tratamiento
selectTratamiento.addEventListener("change", () => {
  const idSeleccionado = selectTratamiento.value;
  const seleccionada = window.tratamientos.find(
    (tratamiento) => tratamiento.idTratamiento == idSeleccionado
  );

  if (seleccionada) {
    mostrarDatosTratamiento(seleccionada);
    mostrarDatosEquipo(seleccionada);
  }
});

// Evento input tratamiento para filtrar por fecha en el select
inputFechaInicio.addEventListener("change", filtrarTratamientosPorFecha);
inputFechaFinal.addEventListener("change", filtrarTratamientosPorFecha);

// Evento botón enviar informe generado por correo
btnEnviarCorreo.addEventListener("click", async (e) => {
  e.preventDefault();

  const cultivo = camposTratamiento.cultivo.value.trim();
  const producto = camposTratamiento.producto.value.trim();
  const fecha = formatDate(camposTratamiento.fecha.value.trim());

  const correo = inputCorreo?.value?.trim();
  if (!correo || !esCorreoValido(correo)) {
    return alert("Por favor, introduzca un correo electrónico válido.");
  }

  const idTratamiento = camposTratamiento.id.value.trim();
  if (!idTratamiento) return alert("Seleccione primero un tratamiento.");

  let pdfBlob;
  try {
    const doc = await generarPDFPromesa(camposTratamiento, camposEquipo);
    pdfBlob = new Blob([doc.output("blob")], { type: "application/pdf" });
    console.log("PDF generado correctamente.");
  } catch (err) {
    console.error("Error generando el PDF:", err);
    alert("Error al generar el PDF. Inténtelo de nuevo.");
    return;
  }

  const formData = new FormData();
  formData.append("correo", correo);
  formData.append(
    "informe",
    pdfBlob,
    `Informe_Tratamiento_${cultivo}_${producto}_${fecha}.pdf`
  );

  try {
    const res = await fetch("http://localhost:3000/informes/enviar", {
      method: "POST",
      body: formData,
    });

    let texto;
    try {
      texto = await res.text();
    } catch (err) {
      texto = "Error leyendo respuesta";
    }

    if (res.ok) {
      alert("Informe enviado correctamente al correo indicado.");
    } else {
      alert("Error al enviar el correo.");
    }
  } catch (error) {
    alert("Se ha enviado el informe, para controlar errores inesperados se recargará la página.");
  }
});

// Evento botón generar informe
btnGenerarInforme.addEventListener("click", async (e) => {
  e.preventDefault();

  const idTratamiento = camposTratamiento.id.value.trim();
  if (!idTratamiento)
    return alert("Asegúrese de haber seleccionado un tratamiento.");

  generarPDFInformeTratamientoYEquipo(camposTratamiento, camposEquipo);
});
