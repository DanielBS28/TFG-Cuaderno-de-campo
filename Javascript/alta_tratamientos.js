import {
  comprobarUnidadMedida,
  conversionUnidad,
  calculoDosis,
  unidadValida,
  comprobarDosisAplicada,
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
const numCarnetAplicador = document.getElementById("numero_carnet_aplicador");

// DATOS EQUIPO TRATAMIENTO
const inputBuscarEquipo = document.getElementById("nombre-equipo");
const selectEquipo = document.getElementById("seleccion-equipamiento");

const nombreEquipo = document.getElementById("nombre-equipo-tratamiento");
const numeroROMA = document.getElementById("numero_roma");
const fechaAdquisicion = document.getElementById("fecha_adquisicion");
const fechaUltimaInspeccion = document.getElementById(
  "fecha_ultima_inspeccion"
);

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

// Limpiar campos cantidades de producto fitosanitario
const limpiarCamposCantidadProducto = () => {
  cantidadProducto.value = "";
  superficiceTratada.value = "";
  fechaTratamiento.value = "";
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

// Bloquear Filtro y Select de Parcela
const bloquearParcela = () => {
  selectParcela.innerHTML =
    "<option selected disabled>Seleccione una parcela</option>";
  selectParcela.selectedIndex = 0;
  selectParcela.disabled = true;
  inputBuscarParcela.value = "";
  inputBuscarParcela.disabled = true;
};

// Bloquear Filtro y Select de Tipo Cultivo
const bloquearTipoCultivo = () => {
  selectTipoCultivo.innerHTML =
    "<option selected disabled>Seleccione un cultivo</option>";
  selectTipoCultivo.selectedIndex = 0;
  selectTipoCultivo.disabled = true;
  inputBuscarTipoCultivo.value = "";
  inputBuscarTipoCultivo.disabled = true;
};

// Bloquear Filtro y Select de Tipo Plaga
const bloquearTipoPlaga = () => {
  selectTipoPlaga.innerHTML =
    "<option selected disabled>Seleccione una plaga</option>";
  selectTipoPlaga.selectedIndex = 0;
  selectTipoPlaga.disabled = true;
  inputBuscarTipoPlaga.value = "";
  inputBuscarTipoPlaga.disabled = true;
};

// Bloquear Filtro y Select de Producto Fitosanitario
const bloquearProducto = () => {
  selectProducto.innerHTML =
    "<option selected disabled>Seleccione un producto</option>";
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

// Función para cargar las explotaciones del agricultor
const cargarCamposExplotacion = () => {
  fetch(
    `http://localhost:3000/agricultores/explotaciones/${camposAgricultor.dni.value}`
  )
    .then((response) => response.json())
    .then((explotaciones) => {
      limpiarCamposParcela();
      bloquearParcela();
      limpiarCamposExplotacion();

      if (!Array.isArray(explotaciones) || explotaciones.length === 0) {
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

      cargarCultivosDePacela(idParcela);
      desbloquearTipoCultivo();
    })
    .catch((err) => {
      console.error("Error al obtener tratamientos:", err);
      camposParcela.tratamientos.value = "—";
    });
};

// Obtener tipo de cultivo de una parcela
const cargarCultivosDePacela = async (idParcela) => {
  try {
    const res = await fetch(
      `http://localhost:3000/parcelas/cultivos/${idParcela}`
    );
    const cultivos = await res.json();

    if (!Array.isArray(cultivos) || cultivos.length === 0) {
      alert("No hay cultivos asociados a esta parcela.");
      bloquearTipoCultivo();
      return;
    }

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
      bloquearTipoPlaga();
      return;
    }

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
      bloquearProducto();
      return;
    }

    window.productos = productos;
    actualizarSelectProducto(productos);
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};

// Imprimir información sobre el producto seleccionado
const infoProducto = (seleccionada) => {
  // Información Genérica del Producto
  propiedadesProducto.innerHTML = `
    <div id="propiedades-producto" style="margin: 30px 0;">
        <p><span>Fecha de Caducidad: </span>${seleccionada.Fecha_caducidad}</p>
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
    </div>
  `;
  labelCantidadProducto.innerText = `Cantidad del Producto en: ${comprobarUnidadMedida(
    seleccionada.Unidad_medida_dosis
  )}`;

  // Información Específica de las Dosis del Producto según Superficie del Cultivo
  if (unidadValida(seleccionada.Unidad_medida_dosis)) {
    propiedadesEspecificas.innerHTML = `
    <div id="propiedades-especificas" style="margin: 30px 0;">
        <p><span>La Dosis Máxima del Producto ${seleccionada.Nombre} para ${
      superficieCultivo.value
    } ha es: ${calculoDosis(
      superficieCultivo.value,
      conversionUnidad(seleccionada.Unidad_medida_dosis, seleccionada.Dosis_max)
    )} ${
      comprobarUnidadMedida(seleccionada.Unidad_medida_dosis).split("/")[0]
    }</span></p>
    </div>
  `;
  } else {
    propiedadesEspecificas.innerHTML = `
    <div id="propiedades-especificas" style="margin: 30px 0;">
        <p>No se pueden realizar cálculos automáticos con esta unidad (${seleccionada.Unidad_medida_dosis})</p>
    </div>
  `;
  }
  console.log(
    superficieCultivo.value,
    cantidadProducto.value,
    fechaTratamiento.value,
    document.getElementById("dosis-min-span").textContent,
    document.getElementById("dosis-max-span").textContent,
    document.getElementById("unidad-medida-dosis").textContent
  );
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
    const data = await res.json();
    mostrarDatosAgricultor(data);
    cargarCamposExplotacion();
    desbloquearExplotacion();
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
  const valorSeleccionado = selectTipoCultivo.value;
  const seleccionada = window.cultivos.find(
    (cultivo) => cultivo.Tipo_Cultivo === valorSeleccionado
  );

  if (seleccionada) {
    mostrarDatosCultivo(seleccionada);
    cargarPlagasDeCultivo(valorSeleccionado);
    desbloquearTipoPlaga();
  }
});

// Evento input tipo cultivo para filtrar
inputBuscarTipoCultivo.addEventListener("input", () => {
  const texto = inputBuscarTipoCultivo.value.trim();

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
    mostrarDatosPlaga(seleccionada);
    desbloquearProducto();
    cargarProductosDePlaga(nombreCultivo.value, valorSeleccionado);
  }
});

// Evento input tipo plaga para filtrar
inputBuscarTipoPlaga.addEventListener("input", () => {
  const texto = inputBuscarTipoPlaga.value.trim();

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
    desbloquearCantidadProducto();
    infoProducto(seleccionada);
  }
});

// Evento input producto fitosanitario para filtrar
inputBuscarProducto.addEventListener("input", () => {
  const texto = inputBuscarProducto.value.trim();

  if (!window.productos || window.productos.length === 0) return;

  const filtradas = window.productos.filter((producto) =>
    `${producto.Agente} ${producto.idProducto}`.toLowerCase().includes(texto)
  );

  actualizarSelectProducto(filtradas);
});

// Evento botón Validar Datos
btnValidarProducto.addEventListener("click", async (e) => {
  e.preventDefault();
  console.log("juro que hice click");
  comprobarDosisAplicada(
    superficieCultivo.value,
    cantidadProducto.value,
    fechaTratamiento.value,
    spanDosisMin.textContent,
    spanDosisMax.textContent,
    spanUnidadMedida.textContent
  );
});
