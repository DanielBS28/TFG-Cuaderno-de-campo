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

const btnVisualizarSIGPAC = document.getElementById("SIGPAC");
const btnAutomatizarParcela = document.getElementById("automatizar-parcela");

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
};

const bloquearParcela = () => {
  selectParcela.innerHTML =
    "<option selected disabled>Seleccione una parcela</option>";
  selectParcela.selectedIndex = 0;
  selectParcela.disabled = true;
  inputBuscarParcela.value = "";
  inputBuscarParcela.disabled = true;
};

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
    })
    .catch((err) => {
      console.error("Error al obtener tratamientos:", err);
      camposParcela.tratamientos.value = "—";
    });
};

// Obtener recintos BDD de una parcela
const cargarRecintosDeParcela = async (idParcela) => {
  try {
    const res = await fetch(
      `http://localhost:3000/recintos/parcela/${idParcela}`
    );
    const recintos = await res.json();

    if (!Array.isArray(recintos) || recintos.length === 0) {
      alert("Esta parcela no tiene recintos.");
      return;
    }

    return recintos;
  } catch (error) {
    console.error("Error al cargar recintos:", error);
  }
};

// Obtener los recintos SIGPAC de una parcela
const obtenerRecintosDeParcela = async ({
  codigoProvincia,
  codigoMunicipio,
  agregado,
  zona,
  numPoligono,
  numParcela,
  idParcela,
}) => {
  const url = `https://sigpac-hubcloud.es/servicioconsultassigpac/query/recinfoparc/${codigoProvincia}/${codigoMunicipio}/${agregado}/${zona}/${numPoligono}/${numParcela}.json`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error("No se pudo obtener recintos de SIGPAC.");
      return [];
    }

    const recintosData = await res.json();

    // Ahora cargamos la lista de usos SIGPAC
    const usosRes = await fetch(
      "https://sigpac-hubcloud.es/codigossigpac/cod_uso_sigpac.json"
    );
    const usosData = await usosRes.json();

    const mapaUsos = {};
    (usosData.codigos || []).forEach(({ codigo, descripcion }) => {
      mapaUsos[codigo] = descripcion;
    });

    if (!Array.isArray(usosData.codigos)) {
      console.error("La lista de usos SIGPAC no es válida.");
      return [];
    }

    // Procesar recintos
    const recintosProcesados = recintosData.map((recinto) => {
      const superficieHa =
        Math.round((recinto.superficie / 10000) * 10000) / 10000;
      const descripcionUso =
        mapaUsos[recinto.uso_sigpac] || "Descripción desconocida";

      return {
        idRecinto: `${idParcela}:${recinto.recinto}`,
        parcela_Numero_identificacion: idParcela,
        Numero: recinto.recinto,
        Uso_SIGPAC: recinto.uso_sigpac,
        Descripcion_uso: descripcionUso,
        Superficie_ha: superficieHa,
      };
    });

    return recintosProcesados;
  } catch (error) {
    console.error("Error al obtener recintos de la parcela:", error);
    return [];
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

// Evento botón eliminar parcela
btnAutomatizarParcela.addEventListener("click", async (e) => {
  e.preventDefault();
  const idParcela = camposParcela.id.value;
  if (!idParcela) return alert("No hay ninguna parcela seleccionada.");

  if (!confirm("¿Seguro que quieres actualizar los recintos de la parcela con los últimos datos del SIGPAC?")) return;

  const recintosBDD = await cargarRecintosDeParcela(idParcela);

  const recintosSIGPAC = await obtenerRecintosDeParcela({
    codigoProvincia: camposParcela.codigoProvincia.value,
    codigoMunicipio: camposParcela.codigoMunicipio.value,
    agregado: camposParcela.agregado.value,
    zona: camposParcela.zona.value,
    numPoligono: camposParcela.numPoligono.value,
    numParcela: camposParcela.numParcela.value,
    idParcela: idParcela,
  });

  // Crear mapas para facilitar la comparación
  const mapSIGPAC = new Map(recintosSIGPAC.map((r) => [r.Numero, r]));

  // Obtener también los idRecinto de SIGPAC
  const idsSIGPAC = new Set(recintosSIGPAC.map((r) => r.idRecinto));

  // Filtrar solo los recintos que no están en SIGPAC y cuyo idRecinto no coincide
  const recintosAEliminar = recintosBDD.filter(
    (r) => !mapSIGPAC.has(r.Numero) && !idsSIGPAC.has(r.idRecinto)
  );

  if (recintosAEliminar.length > 0) {
    console.log("Recintos a eliminar:", recintosAEliminar);
    const idsAEliminar = recintosAEliminar.map((r) => r.idRecinto);

    // Eliminar los recintos de la BDD que no están en SIGPAC
    await fetch("http://localhost:3000/recintos/eliminar-multiples", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ids: idsAEliminar }),
    });
    console.log("Recintos eliminados correctamente.");
  }

  // Insertar los recintos que están en SIGPAC y no en la BDD
  await fetch("http://localhost:3000/recintos/insertar-o-actualizar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ recintos: recintosSIGPAC }),
  });
  
  alert("Datos de los recintos de la parcela actualizados correctamente");
  location.reload();
});

// Evento botón mostrar parcela en el SIGPAC
btnVisualizarSIGPAC.addEventListener("click", (e) => {
  e.preventDefault();
  const idParcela = camposParcela.id.value;
  if (!idParcela) return alert("No hay ninguna parcela seleccionada.");

  const urlSIGPAC = `https://sigpac.mapa.es/fega/visor/?provincia=${camposParcela.codigoProvincia.value}&municipio=${camposParcela.codigoMunicipio.value}&agregado=${camposParcela.agregado.value}&zona=${camposParcela.zona.value}&poligono=${camposParcela.numPoligono.value}&parcela=${camposParcela.numParcela.value}`;

  window.open(urlSIGPAC, "_blank");
});
