import {
  comprobarUnidadMedida,
  conversionUnidad,
  calculoDosis,
  unidadValida,
  comprobarDosisAplicada,
  redondearDecimales,
  comprobacionFinal,
  formatDate,
  formatDate2,
} from "./ConversionesDosis/calculosDosis.js";

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

// DATOS TIPO CULTIVO
const inputBuscarTipoCultivo = document.getElementById("nombre-cultivo");
const selectTipoCultivo = document.getElementById("seleccion-cultivo");

const nombreCultivo = document.getElementById("nombre-cultivo-buscado");
const superficieCultivo = document.getElementById("superficie-cultivo");

// DATOS TIPO PLAGA
const inputBuscarTipoPlaga = document.getElementById("nombre-plaga");
const selectTipoPlaga = document.getElementById("seleccion-plaga");

const nombrePlaga = document.getElementById("nombre-plaga-buscado");

// DATOS PRODUCTO FITOSANITARIO
const inputBuscarProducto = document.getElementById("nombre-producto");
const selectProducto = document.getElementById("productos");

const camposProducto = {
  nombreProducto: document.getElementById("nombre-producto-buscado"),
  numRegistro: document.getElementById("num-registro-producto"),
  dosisMin: document.getElementById("minima-dosis"),
  dosisMax: document.getElementById("maxima-dosis"),
  unidadDeMedida: document.getElementById("medida-dosis"),
};

const propiedadesProducto = document.getElementById("propiedades-producto");
const labelCantidadProducto = document.getElementById(
  "label_cantidad_producto"
);
const cantidadProducto = document.getElementById("cantidad_producto");
const superficiceTratada = document.getElementById("superficie_tratada");
const fechaTratamiento = document.getElementById("fecha_tratamiento");
const btnValidarProducto = document.getElementById("validar-datos");

const propiedadesEspecificas = document.getElementById(
  "propiedades-especificas"
);

// DATOS CARNET DEL APLICADOR
const inputBuscarAplicador = document.getElementById("nombre-aplicador");
const selectAplicador = document.getElementById("seleccion-aplicador");
const numCarnetAplicador = document.getElementById("numero-carnet-aplicador");

// DATOS EQUIPO TRATAMIENTO
const inputBuscarEquipo = document.getElementById("nombre-equipo");
const selectEquipo = document.getElementById("seleccion-equipamiento");

const camposEquipo = {
  nombreEquipo: document.getElementById("nombre-equipo-tratamiento"),
  numeroROMA: document.getElementById("numero_roma"),
  fechaAdquisicion: document.getElementById("fecha_adquisicion"),
  fechaUltimaInspeccion: document.getElementById("fecha_ultima_inspeccion"),
};

const btnCrearTratamiento = document.getElementById("crear-tratamiento");

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

// Mostrar datos de tipo de cultivo
const mostrarDatosCultivo = (seleccionada) => {
  nombreCultivo.value = seleccionada.Tipo_Cultivo;
  superficieCultivo.value = seleccionada.Superficie_ha;
};

// Mostrar datos de tipo de plaga
const mostrarDatosPlaga = (seleccionada) => {
  nombrePlaga.value = seleccionada.Agente;
};

// Mostrar datos de producto fitosanitario
const mostrarDatosProducto = (seleccionada) => {
  camposProducto.nombreProducto.value = seleccionada.Nombre;
  camposProducto.numRegistro.value = seleccionada.Num_registro;
  camposProducto.dosisMin.value = conversionUnidad(
    seleccionada.Unidad_medida_dosis,
    seleccionada.Dosis_min
  );
  camposProducto.dosisMax.value = conversionUnidad(
    seleccionada.Unidad_medida_dosis,
    seleccionada.Dosis_max
  );
  camposProducto.unidadDeMedida.value = comprobarUnidadMedida(
    seleccionada.Unidad_medida_dosis
  );
};

// Mostrar datos de aplicador
const mostrarDatosAplicador = (carnetAplicador) => {
  numCarnetAplicador.value = carnetAplicador;
};

// Mostrar datos del equipo
const mostrarDatosEquipo = (seleccionada) => {
  camposEquipo.nombreEquipo.value = seleccionada.Nombre;
  camposEquipo.numeroROMA.value = seleccionada.Numero_ROMA;
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

// Limpiar campos de tipo de cultivo
const limpiarCamposCultivo = () => {
  nombreCultivo.value = "";
  superficieCultivo.value = "";
};

// Limpiar campos de tipo de plaga
const limpiarCamposPlaga = () => {
  nombrePlaga.value = "";
};

// Limpiar campos producto
const limpiarCamposProducto = () => {
  for (const key in camposProducto) {
    camposProducto[key].value = "";
  }
  propiedadesProducto.innerHTML = "<div id='propiedades-producto'></div>";
  labelCantidadProducto.innerText = "Cantidad del Producto en:";
  propiedadesEspecificas.innerHTML = "<div id='propiedades-especificas'></div>";
};

// Limpiar campos cantidades de producto fitosanitario
const limpiarCamposCantidadProducto = () => {
  cantidadProducto.value = "";
  superficiceTratada.value = "";
  fechaTratamiento.value = "";
};

// Limpiar campos del Aplicador del tratamiento
const limpiarCamposAplicador = () => {
  numCarnetAplicador.value = "";
};

// Limpiar campos de Equipo de tratamiento
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

// Desbloquear campos de tipo cultivo
const desbloquearTipoCultivo = () => {
  inputBuscarTipoCultivo.disabled = false;
  selectTipoCultivo.disabled = false;
};

// Desbloquear campos de tipo plaga
const desbloquearTipoPlaga = () => {
  inputBuscarTipoPlaga.disabled = false;
  selectTipoPlaga.disabled = false;
};

// Desbloquear campos de producto fitosanitario
const desbloquearProducto = () => {
  inputBuscarProducto.disabled = false;
  selectProducto.disabled = false;
};

// Desbloquear campos cantidad de producto fitosanitario
const desbloquearCantidadProducto = () => {
  cantidadProducto.disabled = false;
  superficiceTratada.disabled = false;
  fechaTratamiento.disabled = false;
  btnValidarProducto.disabled = false;
};

// Desbloquear campos del Aplicador del tratamiento
const desbloquearAplicador = () => {
  inputBuscarAplicador.disabled = false;
  selectAplicador.disabled = false;
};

// Desbloquear campos del Equipo de tratamiento
const desbloquearEquipo = () => {
  inputBuscarEquipo.disabled = false;
  selectEquipo.disabled = false;
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

// Bloquear Filtro y Select de Tipo Cultivo
const bloquearTipoCultivo = () => {
  selectTipoCultivo.selectedIndex = 0;
  selectTipoCultivo.disabled = true;
  inputBuscarTipoCultivo.value = "";
  inputBuscarTipoCultivo.disabled = true;
};

// Bloquear Filtro y Select de Tipo Plaga
const bloquearTipoPlaga = () => {
  selectTipoPlaga.selectedIndex = 0;
  selectTipoPlaga.disabled = true;
  inputBuscarTipoPlaga.value = "";
  inputBuscarTipoPlaga.disabled = true;
};

// Bloquear Filtro y Select de Producto Fitosanitario
const bloquearProducto = () => {
  selectProducto.selectedIndex = 0;
  selectProducto.disabled = true;
  inputBuscarProducto.value = "";
  inputBuscarProducto.disabled = true;
};

// Bloquear campos de cantidad de producto fitosanitario
const bloquearCantidadProducto = () => {
  cantidadProducto.disabled = true;
  superficiceTratada.disabled = true;
  fechaTratamiento.disabled = true;
  btnValidarProducto.disabled = true;
};

// Bloquear campos del Aplicador del tratamiento
const bloquearAplicador = () => {
  selectAplicador.selectedIndex = 0;
  selectAplicador.disabled = true;
  inputBuscarAplicador.value = "";
  inputBuscarAplicador.disabled = true;
};

// Bloquear campos del Equipo de tratamiento
const bloquearEquipo = () => {
  selectEquipo.selectedIndex = 0;
  selectEquipo.disabled = true;
  inputBuscarEquipo.value = "";
  inputBuscarEquipo.disabled = true;
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

// Rellenar las opciones del select de tipo cultivo
const actualizarSelectTipoCultivo = (lista) => {
  selectTipoCultivo.innerHTML =
    "<option selected disabled>Seleccione un cultivo</option>";
  lista.forEach((cultivo) => {
    const option = document.createElement("option");
    option.value = cultivo.Tipo_Cultivo;
    option.textContent = `${cultivo.Tipo_Cultivo} | ${cultivo.Superficie_ha} ha`;
    selectTipoCultivo.appendChild(option);
  });
};

// Rellenar las opciones del select de tipo plaga
const actualizarSelectTipoPlaga = (lista) => {
  selectTipoPlaga.innerHTML =
    "<option selected disabled>Seleccione una plaga</option>";
  lista.forEach((plaga) => {
    const option = document.createElement("option");
    option.value = plaga.Agente;
    option.textContent = `${plaga.Agente}`;
    selectTipoPlaga.appendChild(option);
  });
};

// Rellenar las opciones del select de productos fitosanitarios
const actualizarSelectProducto = (lista) => {
  selectProducto.innerHTML =
    "<option selected disabled>Seleccione un producto</option>";
  lista.forEach((producto) => {
    const option = document.createElement("option");
    option.value = producto.idProducto;
    option.textContent = `${producto.Nombre} | ${producto.Num_registro}`;
    selectProducto.appendChild(option);
  });
};

// Rellenar las opciones del select de aplicadores
const actualizarSelectAplicadores = (aplicadores) => {
  selectAplicador.innerHTML = `
    <option disabled selected>Seleccione el aplicador</option>
    <option value="segunda_opcion" disabled>Agricultor</option>
  `;

  // Insertar agricultor
  const agricultor = camposAgricultor;
  if (agricultor) {
    const optAgr = document.createElement("option");
    optAgr.value = agricultor.dni.value;
    optAgr.textContent = `${agricultor.nombre.value} ${agricultor.apellido1.value} | ${agricultor.dni.value}`;
    selectAplicador.appendChild(optAgr);
  }

  // Insertar separador para asesores
  const separador = document.createElement("option");
  separador.value = "tercera_opcion";
  separador.textContent = "Asesores";
  separador.disabled = true;
  selectAplicador.appendChild(separador);

  // Insertar asesores
  aplicadores.forEach((asesor) => {
    const optAsesor = document.createElement("option");
    optAsesor.value = asesor.DNI;
    optAsesor.textContent = `${asesor.Nombre} ${asesor.Apellido1} | ${asesor.DNI}`;
    selectAplicador.appendChild(optAsesor);
  });
};

// Rellenar las opciones del select de equipos
const actualizarSelectEquipos = (equipos) => {
  selectEquipo.innerHTML =
    "<option disabled selected>Seleccione el equipo</option>";
  equipos.forEach((equipo) => {
    const option = document.createElement("option");
    option.value = equipo.Numero_ROMA;
    option.textContent = `${equipo.Nombre} | ${equipo.Numero_ROMA}`;
    selectEquipo.appendChild(option);
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

// Obtener tipo de cultivo de una parcela
const cargarCultivosDeParcela = async (idParcela) => {
  try {
    const res = await fetch(
      `http://localhost:3000/parcelas/cultivos/${idParcela}`
    );
    const cultivos = await res.json();

    if (!Array.isArray(cultivos) || cultivos.length === 0) {
      alert("No hay cultivos asociados a esta parcela.");
      return;
    }
    desbloquearTipoCultivo();
    window.cultivos = cultivos;
    actualizarSelectTipoCultivo(cultivos);
  } catch (error) {
    console.error("Error al cargar cultivos:", error);
  }
};

// Obtener plagas de un cultivo
const cargarPlagasDeCultivo = async (tipoCultivo) => {
  try {
    const res = await fetch(
      `http://localhost:3000/cultivos/plagas/${tipoCultivo}`
    );
    const plagas = await res.json();

    if (!Array.isArray(plagas) || plagas.length === 0) {
      alert("No hay plagas asociadas a este cultivo.");
      return;
    }
    desbloquearTipoPlaga();
    window.plagas = plagas;
    actualizarSelectTipoPlaga(plagas);
  } catch (error) {
    console.error("Error al cargar plagas:", error);
  }
};

// Obtener productos fitosanitarios para una plaga de un cultivo
const cargarProductosDePlaga = async (tipoCultivo, tipoPlaga) => {
  try {
    const res = await fetch(
      `http://localhost:3000/cultivos/plagas/productos/${tipoCultivo}/${tipoPlaga}`
    );
    const productos = await res.json();

    if (!Array.isArray(productos) || productos.length === 0) {
      alert("No hay productos fitosanitarios asociados a esta plaga.");
      return;
    }
    desbloquearProducto();
    window.productos = productos;
    actualizarSelectProducto(productos);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

// Obtener última fecha del tratamiento del producto seleccionado
const obtenerUltimaFechaTratamiento = async (idParcela, idProducto) => {
  try {
    const res = await fetch(
      `http://localhost:3000/tratamientos/fecha-mas-reciente/${idParcela}/${idProducto}`
    );
    const data = await res.json();

    if (data && data.Fecha_tratamiento) {
      return formatDate(data.Fecha_tratamiento);
    } else {
      return "No se han realizado tratamientos previos.";
    }
  } catch (err) {
    console.error("Error al obtener la última fecha de tratamiento:", err);
    return null;
  }
};

// Imprimir información sobre el producto seleccionado
const infoProducto = async (seleccionada) => {
  const ultimoTratamiento = await obtenerUltimaFechaTratamiento(
    camposParcela.id.value,
    seleccionada.idProducto
  );

  // Información Genérica del Producto
  propiedadesProducto.innerHTML = `
    <div id="propiedades-producto" style="margin: 30px 0;">
        <p><span>Fecha de Caducidad: </span>${formatDate(
          seleccionada.Fecha_caducidad
        )}</p>
        <p><span>Estado: </span>${seleccionada.Estado}</p>
        <p><span>Dosis Mínima: </span>${conversionUnidad(
          seleccionada.Unidad_medida_dosis,
          seleccionada.Dosis_min
        )}</p>
        <p><span>Dosis Máxima: </span>${conversionUnidad(
          seleccionada.Unidad_medida_dosis,
          seleccionada.Dosis_max
        )}</p>
        <p><span>Unidad de Medida: </span>${comprobarUnidadMedida(
          seleccionada.Unidad_medida_dosis
        )}</p>
        <p><span>Plazo de Seguridad: </span>${seleccionada.Plazo_Seguridad}</p>
        <p><span>Volumen Caldo: </span>${seleccionada.Volumen_caldo}</p>
        <p><span>Aplicaciones: </span>${seleccionada.Aplicaciones}</p>
        <p><span>Intervalo de Aplicaciones: </span>${
          seleccionada.Intervalo_aplicaciones
        }</p>
        <p><span>Condicionamiento específico: </span>${
          seleccionada.Condicionamiento_especifico
        }</p>
        <p><span>Método de Aplicación: </span>${
          seleccionada.Metodo_aplicacion
        }</p>
        <p><span>Volumen Mínimo: </span>${seleccionada.Volumen_min}</p>
        <p><span>Volumen Máximo: </span>${seleccionada.Volumen_max}</p>
        <p><span>Unidades Volumen: </span>${seleccionada.Unidades_volumen}</p>
        <p><span>Último Tratamiento Realizado: </span>${ultimoTratamiento}</p>
    </div>
  `;

  labelCantidadProducto.innerText = `Cantidad del Producto en: ${comprobarUnidadMedida(
    seleccionada.Unidad_medida_dosis
  )}`;

  // Información Específica de las Dosis del Producto según Superficie del Cultivo
  if (unidadValida(seleccionada.Unidad_medida_dosis)) {
    propiedadesEspecificas.innerHTML = `
    <div id="propiedades-especificas" style="margin: 30px 0;">
        <p><span>La Dosis Máxima del Producto ${
          seleccionada.Nombre
        } es: ${redondearDecimales(
      calculoDosis(
        superficieCultivo.value,
        conversionUnidad(
          seleccionada.Unidad_medida_dosis,
          seleccionada.Dosis_max
        )
      )
    )} ${
      comprobarUnidadMedida(seleccionada.Unidad_medida_dosis).split("/")[0]
    } para una Superficie de ${superficieCultivo.value} ha </span></p>
    </div>
  `;
  } else {
    propiedadesEspecificas.innerHTML = `
    <div id="propiedades-especificas" style="margin: 30px 0;">
        <p>No se pueden realizar cálculos automáticos con esta unidad (${seleccionada.Unidad_medida_dosis})</p>
    </div>
  `;
  }
};

// Cargar asesores del agricultor
const cargarAsesores = async () => {
  try {
    const dniAgricultor = camposAgricultor.dni.value;
    const res = await fetch(
      `http://localhost:3000/asesores/asignados/${dniAgricultor}`
    );
    const asesores = await res.json();
    window.aplicadores = asesores;
    actualizarSelectAplicadores(asesores);
  } catch (err) {
    console.error("Error cargando asesores:", err);
  }
};

// Cargar equipos de una explotación
const cargarEquipos = async (idExplotacion) => {
  if (!idExplotacion) return;

  try {
    const res = await fetch(
      `http://localhost:3000/equipos/explotacion/${idExplotacion}`
    );
    const equipos = await res.json();

    if (!Array.isArray(equipos) || equipos.length === 0) {
      alert("No hay equipos disponibles para esta explotación.");
      return;
    }
    desbloquearEquipo();
    window.equipos = equipos;
    actualizarSelectEquipos(equipos);
    desbloquearParcela();
    bloquearEquipo();
  } catch (err) {
    console.error("Error al cargar equipos:", err);
  }
};

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
    limpiarCamposCultivo();
    limpiarCamposPlaga();
    limpiarCamposProducto();
    limpiarCamposCantidadProducto();
    limpiarCamposAplicador();
    limpiarCamposEquipo();

    bloquearExplotacion();
    bloquearParcela();
    bloquearTipoCultivo();
    bloquearTipoPlaga();
    bloquearProducto();
    bloquearCantidadProducto();
    bloquearAplicador();
    bloquearEquipo();

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
    limpiarCamposCultivo();
    limpiarCamposPlaga();
    limpiarCamposProducto();
    limpiarCamposCantidadProducto();
    limpiarCamposAplicador();
    limpiarCamposEquipo();

    bloquearParcela();
    bloquearTipoCultivo();
    bloquearTipoPlaga();
    bloquearProducto();
    bloquearCantidadProducto();
    bloquearAplicador();
    bloquearEquipo();

    mostrarDatosExplotacion(seleccionada);
    obtenerParcelasTotales(idSeleccionado);
    // Cargar parcelas en el select
    cargarParcelasDeExplotacion(idSeleccionado);
    // Cargar equipos de la explotación
    cargarEquipos(idSeleccionado);
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
    limpiarCamposCultivo();
    limpiarCamposPlaga();
    limpiarCamposProducto();
    limpiarCamposCantidadProducto();
    limpiarCamposAplicador();
    limpiarCamposEquipo();

    bloquearTipoCultivo();
    bloquearTipoPlaga();
    bloquearProducto();
    bloquearCantidadProducto();
    bloquearAplicador();
    bloquearEquipo();

    mostrarDatosParcela(seleccionada);
    obtenerRecintosTotales(idSeleccionado);
    obtenerTrataminetosTotales(idSeleccionado);
    cargarCultivosDeParcela(idSeleccionado);
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

// Evento select tipo cultivo
selectTipoCultivo.addEventListener("change", () => {
  const valorSeleccionado = selectTipoCultivo.value;
  const seleccionada = window.cultivos.find(
    (cultivo) => cultivo.Tipo_Cultivo === valorSeleccionado
  );

  if (seleccionada) {
    limpiarCamposPlaga();
    limpiarCamposProducto();
    limpiarCamposCantidadProducto();
    limpiarCamposAplicador();
    limpiarCamposEquipo();

    bloquearTipoPlaga();
    bloquearProducto();
    bloquearCantidadProducto();
    bloquearAplicador();
    bloquearEquipo();

    mostrarDatosCultivo(seleccionada);
    cargarPlagasDeCultivo(valorSeleccionado);
  }
});

// Evento input tipo cultivo para filtrar
inputBuscarTipoCultivo.addEventListener("input", () => {
  const texto = inputBuscarTipoCultivo.value.trim().toLowerCase();

  if (!window.cultivos || window.cultivos.length === 0) return;

  const filtradas = window.cultivos.filter((cultivo) =>
    `${cultivo.Tipo_Cultivo} ${cultivo.Superficie_ha}`
      .toLowerCase()
      .includes(texto)
  );

  actualizarSelectTipoCultivo(filtradas);
});

// Evento select tipo plaga
selectTipoPlaga.addEventListener("change", () => {
  const valorSeleccionado = selectTipoPlaga.value;
  const seleccionada = window.plagas.find(
    (plaga) => plaga.Agente === valorSeleccionado
  );

  if (seleccionada) {
    limpiarCamposProducto();
    limpiarCamposCantidadProducto();
    limpiarCamposAplicador();
    limpiarCamposEquipo();

    bloquearProducto();
    bloquearCantidadProducto();
    bloquearAplicador();
    bloquearEquipo();

    mostrarDatosPlaga(seleccionada);
    cargarProductosDePlaga(nombreCultivo.value, valorSeleccionado);
  }
});

// Evento input tipo plaga para filtrar
inputBuscarTipoPlaga.addEventListener("input", () => {
  const texto = inputBuscarTipoPlaga.value.trim().toLowerCase();

  if (!window.plagas || window.plagas.length === 0) return;

  const filtradas = window.plagas.filter((plaga) =>
    plaga.Agente.toLowerCase().includes(texto)
  );

  actualizarSelectTipoPlaga(filtradas);
});

// Evento select producto fitosanitario
selectProducto.addEventListener("change", () => {
  const valorSeleccionado = selectProducto.value;
  const seleccionada = window.productos.find(
    (producto) => producto.idProducto == valorSeleccionado
  );

  if (seleccionada) {
    limpiarCamposCantidadProducto();
    limpiarCamposAplicador();
    limpiarCamposEquipo();

    bloquearCantidadProducto();
    bloquearAplicador();
    bloquearEquipo();

    mostrarDatosProducto(seleccionada);
    infoProducto(seleccionada);
    cargarAsesores();

    desbloquearCantidadProducto();
    desbloquearAplicador();
    desbloquearEquipo();
  }
});

// Evento input producto fitosanitario para filtrar
inputBuscarProducto.addEventListener("input", () => {
  const texto = inputBuscarProducto.value.trim().toLowerCase();

  if (!window.productos || window.productos.length === 0) return;

  const filtradas = window.productos.filter((producto) =>
    `${producto.Agente} ${producto.idProducto}`.toLowerCase().includes(texto)
  );

  actualizarSelectProducto(filtradas);
});

// Evento botón Validar Datos
btnValidarProducto.addEventListener("click", async (e) => {
  e.preventDefault();
  comprobarDosisAplicada(
    superficieCultivo.value,
    superficiceTratada.value,
    cantidadProducto.value,
    fechaTratamiento.value,
    camposProducto.dosisMin.value,
    camposProducto.dosisMax.value,
    camposProducto.unidadDeMedida.value
  );
});

// Evento select del Aplicador del tratamiento
selectAplicador.addEventListener("change", async () => {
  const seleccionadaAgr = camposAgricultor.dni.value;
  const valorSeleccionado = selectAplicador.value;

  const seleccionadaAs = window.aplicadores.find(
    (aplicador) => aplicador.DNI == valorSeleccionado
  );

  if (valorSeleccionado == seleccionadaAgr)
    mostrarDatosAplicador(camposAgricultor.carnet.value);
  else if (seleccionadaAs)
    mostrarDatosAplicador(seleccionadaAs.N_Carnet_asesor);
});

// Evento input aplicador del tratamiento para filtrar
inputBuscarAplicador.addEventListener("input", () => {
  const texto = inputBuscarAplicador.value.trim().toLowerCase();

  if (!window.aplicadores || window.aplicadores.length === 0) return;

  const filtradas = window.aplicadores.filter((aplicador) =>
    `${aplicador.Nombre} ${aplicador.Apellido1} | ${aplicador.DNI}`
      .toLowerCase()
      .includes(texto)
  );
  actualizarSelectAplicadores(filtradas);
});

// Evento select del Equipo de tratamiento
selectEquipo.addEventListener("change", async () => {
  const valorSeleccionado = selectEquipo.value;
  const seleccionada = window.equipos.find(
    (equipo) => equipo.Numero_ROMA == valorSeleccionado
  );

  if (seleccionada) {
    mostrarDatosEquipo(seleccionada);
  }
});

// Evento input equipo de tratamiento para filtrar
inputBuscarEquipo.addEventListener("input", () => {
  const texto = inputBuscarEquipo.value.trim().toLowerCase();
  if (!window.equipos || window.equipos.length === 0) return;

  const filtradas = window.equipos.filter((equipo) =>
    `${equipo.Nombre} | ${equipo.Numero_ROMA}`.toLowerCase().includes(texto)
  );

  actualizarSelectEquipos(filtradas);
});

// Evento botón Realizar Tratamiento
btnCrearTratamiento.addEventListener("click", async (e) => {
  e.preventDefault();

  const datosTratamiento = {
    cantidadProducto: cantidadProducto.value.trim(),
    superficie: superficiceTratada.value.trim(),
    fecha: fechaTratamiento.value,
    carnetAplicador: numCarnetAplicador.value.trim(),
    equipo: camposEquipo.nombreEquipo.value.trim(),
    ROMA: camposEquipo.numeroROMA.value.trim(),
  };

  if (Object.values(datosTratamiento).some((valor) => valor === "")) {
    alert(
      "Todos los campos del apartado Realizar Tratamiento deben estar completados."
    );
    return;
  }

  const validacionOK = comprobacionFinal(
    superficieCultivo.value,
    superficiceTratada.value,
    cantidadProducto.value,
    fechaTratamiento.value,
    camposProducto.dosisMin.value,
    camposProducto.dosisMax.value,
    camposProducto.unidadDeMedida.value
  );

  if (!validacionOK) return;

  // Objeto para el INSERT
  const nuevoTratamiento = {
    Equipo_Numero_ROMA: camposEquipo.numeroROMA.value.trim(),
    Producto_idProducto: parseInt(selectProducto.value),
    parcela_Numero_identificacion: camposParcela.id.value.trim(),
    Plaga_controlar: nombrePlaga.value.trim() || null,
    Fecha_tratamiento: fechaTratamiento.value || null,
    Tipo_Cultivo: nombreCultivo.value.trim() || null,
    Num_registro_producto: camposProducto.numRegistro.value.trim() || null,
    Superficie_cultivo: parseFloat(superficieCultivo.value) || null,
    Superficie_tratada_ha: parseFloat(superficiceTratada.value) || null,
    Cantidad_producto_aplicada: parseFloat(cantidadProducto.value) || null,
    Unidad_medida_dosis: camposProducto.unidadDeMedida.value.trim() || null,
    Numero_carnet_aplicador: numCarnetAplicador.value.trim() || null,
  };

  try {
    const res = await fetch("http://localhost:3000/tratamientos/realizar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoTratamiento),
    });

    if (!res.ok) throw new Error("No se pudo insertar el tratamiento");

    alert("Tratamiento registrado correctamente");
    location.reload();
  } catch (err) {
    console.error("Error al insertar tratamiento:", err);
    alert("Error al registrar el tratamiento.");
  }
});
