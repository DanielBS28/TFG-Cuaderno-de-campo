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
const inputBuscarProvincia = document.getElementById("nombre-label-provincia");
const selectProvincia = document.getElementById("nombre-select-provincia");
const inputBuscarMunicipio = document.getElementById("nombre-label-municipio");
const selectMunicipio = document.getElementById("nombre-select-municipio");

const camposParcela = {
  nombre: document.getElementById("nombre-parcela"),
  codigoProvincia: document.getElementById("codigo_provincia"),
  codigoMunicipio: document.getElementById("codigo_municipio"),
  agregado: document.getElementById("agregado"),
  zona: document.getElementById("zona"),
  numPoligono: document.getElementById("poligono"),
  numParcela: document.getElementById("parcela"),
  superficieDeclarada: document.getElementById("sup_declarada"),
};

let cultivosOriginales = [];

const btnCrearParcela = document.getElementById("crear-parcela");

// ### FUNCIONES ### //
const mostrarDatosAgricultor = (data) => {
  camposAgricultor.nombre.value = data.Nombre;
  camposAgricultor.apellido1.value = data.Apellido1;
  camposAgricultor.apellido2.value = data.Apellido2;
  camposAgricultor.dni.value = data.dni;
  camposAgricultor.carnet.value = data.carnet;
};

const limpiarCamposExplotacion = () => {
  camposExplotacion.id.value = "";
  camposExplotacion.nombre.value = "";
  camposExplotacion.superficie.value = "";
  camposExplotacion.parcelas.value = "";
  selectExplotacion.selectedIndex = 0; // volver al primer <option>
};

const limpiarCamposParcela = () => {
  camposParcela.nombre.value = "";
  camposParcela.codigoProvincia.value = "";
  camposParcela.codigoMunicipio.value = "";
  camposParcela.agregado.value = "";
  camposParcela.zona.value = "";
  camposParcela.numPoligono.value = "";
  camposParcela.numParcela.value = "";
  camposParcela.superficieDeclarada.value = "";
  selectProvincia.selectedIndex = 0;
  selectMunicipio.selectedIndex = 0;
};

const desbloquearParcela = () => {
  inputBuscarProvincia.disabled = false;
  selectProvincia.disabled = false;

  camposParcela.nombre.disabled = false;
  camposParcela.codigoProvincia.disabled = false;
  camposParcela.codigoMunicipio.disabled = false;
  camposParcela.agregado.disabled = false;
  camposParcela.zona.disabled = false;
  camposParcela.numPoligono.disabled = false;
  camposParcela.numParcela.disabled = false;
  camposParcela.superficieDeclarada.disabled = false;
};

const bloquearParcela = () => {
  camposParcela.nombre.disabled = true;
  camposParcela.codigoProvincia.disabled = true;
  camposParcela.codigoMunicipio.disabled = true;
  camposParcela.agregado.disabled = true;
  camposParcela.zona.disabled = true;
  camposParcela.numPoligono.disabled = true;
  camposParcela.numParcela.disabled = true;
  camposParcela.superficieDeclarada.disabled = true;

  inputBuscarProvincia.disabled = true;
  selectProvincia.disabled = true;
  inputBuscarMunicipio.disabled = true;
  selectMunicipio.disabled = true;
};

const desbloquearExplotacion = () => {
  inputBuscarExplotacion.disabled = false;
  inputBuscarExplotacion.value = "";

  selectExplotacion.disabled = false;
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
  option.value = "Selecciona una explotación";
  option.textContent = "Selecciona una explotación";
};

const actualizarSelectAgricultores = (agricultores) => {
  selectAgricultor.innerHTML = `<option value="primera_opcion" disabled selected>Seleccione el agricultor</option>`;
  agricultores.forEach((a) => {
    const opcion = document.createElement("option");
    opcion.value = a.DNI;
    opcion.textContent = `${a.Nombre} ${a.Apellido1} - ${a.DNI}`;
    selectAgricultor.appendChild(opcion);
  });
};

const actualizarOpcionesSelectExplotaciones = (lista) => {
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
  lista.forEach((explotacion) => {
    option = document.createElement("option");
    option.value = explotacion.idExplotacion;
    option.textContent = `${explotacion.Nombre} | ${explotacion.Superficie_total} ha`;
    selectExplotacion.appendChild(option);
  });
};

const actualizarSelectProvincias = (lista) => {
  selectProvincia.innerHTML = `<option disabled selected>Seleccione provincia</option>`;
  lista.forEach(({ codigo, descripcion }) => {
    const option = document.createElement("option");
    option.value = codigo;
    option.textContent = descripcion;
    selectProvincia.appendChild(option);
  });
};

const actualizarSelectMunicipios = (lista) => {
  selectMunicipio.innerHTML = `<option disabled selected>Seleccione municipio</option>`;
  lista.forEach(({ codigo, descripcion }) => {
    const option = document.createElement("option");
    option.value = codigo;
    option.textContent = descripcion;
    selectMunicipio.appendChild(option);
  });
};

const validarCamposParcela = (datosParcela) => {
  const errores = [];
  const esNatural = (valor) => /^\d+$/.test(valor);

  if (!esNatural(datosParcela.codigoProvincia))
    errores.push("Código de provincia inválido.");
  if (!esNatural(datosParcela.codigoMunicipio))
    errores.push("Código de municipio inválido.");
  if (!esNatural(datosParcela.agregado)) errores.push("Agregado inválido.");
  if (!esNatural(datosParcela.zona)) errores.push("Zona inválida.");
  if (!esNatural(datosParcela.numPoligono)) errores.push("Polígono inválido.");
  if (!esNatural(datosParcela.numParcela)) errores.push("Parcela inválida.");
  if (
    isNaN(datosParcela.superficieDeclarada) ||
    datosParcela.superficieDeclarada <= 0
  )
    errores.push("Superficie SIGPAC inválida.");

  if (!datosParcela.nombre)
    errores.push("El nombre de la parcela no puede estar vacío.");

  return errores;
};

const cargarCamposExplotacion = () => {
  fetch(
    `http://localhost:3000/agricultores/explotaciones/${camposAgricultor.dni.value}`
  )
    .then((response) => response.json())
    .then((explotaciones) => {
      limpiarCamposExplotacion();
      limpiarCamposParcela();
      bloquearParcela();

      if (explotaciones.length === 0) {
        selectExplotacion.disabled = true;
        inputBuscarExplotacion.disabled = true;
        alert(
          "Este agricultor no tiene ninguna explotación. Por favor, añade una explotación antes de añadir parcelas."
        );
        return;
      }

      window.explotacionesOriginales = explotaciones; // <-- Guardamos la lista original

      actualizarOpcionesSelectExplotaciones(explotacionesOriginales);
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

      desbloquearParcela();
    })
    .catch((err) => {
      console.error("Error al obtener parcelas:", err);
      camposExplotacion.parcelas.value = "—";
    });
};

// Cargar provincias del SIGPAC
const cargarProvincias = async () => {
  try {
    const response = await fetch(
      "https://sigpac-hubcloud.es/codigossigpac/provincia.json"
    );
    const data = await response.json();

    window.provinciasOriginales = data.codigos; //  lista original de provincias

    selectProvincia.innerHTML = `<option disabled selected>Seleccione provincia</option>`;
    data.codigos.forEach(({ codigo, descripcion }) => {
      const option = document.createElement("option");
      option.value = codigo;
      option.textContent = descripcion;
      selectProvincia.appendChild(option);
    });
  } catch (error) {
    console.error("Error al cargar provincias:", error);
  }
};

// Cargar municipios del SIGPAC según provincia seleccionada
const cargarMunicipios = async (codigoProvincia) => {
  try {
    const response = await fetch(
      `https://sigpac-hubcloud.es/codigossigpac/municipio${codigoProvincia}.json`
    );
    const data = await response.json();

    window.municipiosOriginales = data.codigos;
    actualizarSelectMunicipios(data.codigos);
  } catch (error) {
    console.error("Error al cargar municipios:", error);
  }
};

const verificarExistenciaParcelaSIGPAC = async ({
  codigoProvincia,
  codigoMunicipio,
  agregado,
  zona,
  numPoligono,
  numParcela,
}) => {
  const url = `https://sigpac-hubcloud.es/servicioconsultassigpac/query/refcatparcela/${codigoProvincia}/${codigoMunicipio}/${agregado}/${zona}/${numPoligono}/${numParcela}.json`;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      return { existe: false, referenciaCatastral: null };
    }

    const data = await res.json();

    if (Array.isArray(data) && data.length > 0) {
      return {
        existe: true,
        referenciaCatastral: data[0].referencia_cat || null,
      };
    }

    return { existe: false, referenciaCatastral: null };
  } catch (error) {
    console.error("Error al verificar en SIGPAC:", error);
    return { existe: false, referenciaCatastral: null };
  }
};

const generarIdParcela = ({
  codigoProvincia,
  codigoMunicipio,
  agregado,
  zona,
  numPoligono,
  numParcela,
}) => {
  return `${codigoProvincia}:${codigoMunicipio}:${agregado}:${zona}:${numPoligono}:${numParcela}`;
};

// Obtener todos los recintos de una parcela
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
// Cargar todos los agricultores al iniciar y provincias del SIGPAC
window.addEventListener("DOMContentLoaded", async () => {
  try {
    const res = await fetch("http://localhost:3000/agricultores/todos");
    const data = await res.json();
    listaAgricultores = data;
    actualizarSelectAgricultores(data);
  } catch (error) {
    console.error("Error al cargar agricultores:", error);
  }

  cargarProvincias();
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

// Mostar datos de Explotacion al seleccionar
selectExplotacion.addEventListener("change", () => {
  const idSeleccionado = selectExplotacion.value;
  const seleccionada = window.explotacionesOriginales.find(
    (exp) => exp.idExplotacion == idSeleccionado
  );

  if (seleccionada) {
    limpiarCamposParcela();
    //Bloquear input y select Municipio
    inputBuscarMunicipio.disabled = true;
    selectMunicipio.disabled = true;

    //Mostar datos de la explotación
    camposExplotacion.id.value = seleccionada.idExplotacion;
    camposExplotacion.nombre.value = seleccionada.Nombre;
    camposExplotacion.superficie.value = `${seleccionada.Superficie_total} ha`;
    obtenerParcelasTotales(idSeleccionado);
  }
});

// Filtro del select Explotacion
inputBuscarExplotacion.addEventListener("input", () => {
  const texto = inputBuscarExplotacion.value.toLowerCase();
  const filtradas = window.explotacionesOriginales.filter((exp) =>
    exp.Nombre.toLowerCase().includes(texto)
  );
  actualizarOpcionesSelectExplotaciones(filtradas);
});

// Evento Select Provincia
selectProvincia.addEventListener("change", (e) => {
  const codigoSeleccionado = e.target.value;

  if (!codigoSeleccionado) return;

  // Rellenar input de código provincia
  camposParcela.codigoProvincia.value = codigoSeleccionado;

  // Desbloquear y limpiar municipio
  camposParcela.codigoMunicipio.value = "";
  inputBuscarMunicipio.disabled = false;
  selectMunicipio.disabled = false;

  //Vaciar el selectMunicipio si antes se había usado
  selectMunicipio.innerHTML = `<option disabled selected>Seleccione municipio</option>`;
  cargarMunicipios(codigoSeleccionado);
});

// Filtro del Select Provincia
inputBuscarProvincia.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtradas = window.provinciasOriginales.filter((p) =>
    p.descripcion.toLowerCase().includes(texto)
  );
  actualizarSelectProvincias(filtradas);
});

// Evento Select Municipio
selectMunicipio.addEventListener("change", (e) => {
  const codigoSeleccionado = e.target.value;
  if (!codigoSeleccionado) return;

  // Rellenar el input con el código del municipio
  camposParcela.codigoMunicipio.value = codigoSeleccionado;
});

// Filtro del Select Municipio
inputBuscarMunicipio.addEventListener("input", (e) => {
  const texto = e.target.value.toLowerCase();
  const filtrados = window.municipiosOriginales.filter((m) =>
    m.descripcion.toLowerCase().includes(texto)
  );
  actualizarSelectMunicipios(filtrados);
});

// Sincronizar Input codigo provincia con Select
camposParcela.codigoProvincia.addEventListener("input", (e) => {
  const valor = e.target.value.trim();
  let encontrado = false;

  for (let i = 0; i < selectProvincia.options.length; i++) {
    const option = selectProvincia.options[i];
    if (option.value === valor) {
      selectProvincia.selectedIndex = i;
      selectProvincia.dispatchEvent(new Event("change"));
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    selectProvincia.selectedIndex = 0; // Reset a "Seleccione provincia"
  }
});

// Sincronizar Input codigo municipio con Select
camposParcela.codigoMunicipio.addEventListener("input", (e) => {
  const valor = e.target.value.trim();
  let encontrado = false;

  for (let i = 0; i < selectMunicipio.options.length; i++) {
    const option = selectMunicipio.options[i];
    if (option.value === valor) {
      selectMunicipio.selectedIndex = i;
      selectMunicipio.dispatchEvent(new Event("change"));
      encontrado = true;
      break;
    }
  }

  if (!encontrado) {
    selectMunicipio.selectedIndex = 0;
  }
});

// Crear Parcela
btnCrearParcela.addEventListener("click", async (e) => {
  e.preventDefault();

  const datosParcela = {
    nombre: camposParcela.nombre.value.trim(),
    codigoProvincia: camposParcela.codigoProvincia.value.trim(),
    codigoMunicipio: camposParcela.codigoMunicipio.value.trim(),
    agregado: camposParcela.agregado.value.trim(),
    zona: camposParcela.zona.value.trim(),
    numPoligono: camposParcela.numPoligono.value.trim(),
    numParcela: camposParcela.numParcela.value.trim(),
    superficieDeclarada: camposParcela.superficieDeclarada.value.trim(),
    municipio: selectMunicipio.options[selectMunicipio.selectedIndex].text,
  };

  const errores = validarCamposParcela(datosParcela);
  if (errores.length > 0) {
    alert("Errores encontrados:\n" + errores.join("\n"));
    return;
  }

  const { existe, referenciaCatastral } =
    await verificarExistenciaParcelaSIGPAC({
      codigoProvincia: datosParcela.codigoProvincia,
      codigoMunicipio: datosParcela.codigoMunicipio,
      agregado: datosParcela.agregado,
      zona: datosParcela.zona,
      numPoligono: datosParcela.numPoligono,
      numParcela: datosParcela.numParcela,
    });

  if (!existe) {
    alert("La parcela no existe en SIGPAC.");
    return;
  }

  const idGenerado = generarIdParcela(datosParcela);

  console.log("Parcela confirmada. Referencia catastral:", referenciaCatastral);
  console.log("ID generado:", idGenerado);

  // objeto final a enviar
  const parcelaFinal = {
    id: idGenerado,
    ...datosParcela,
    idExplotacion: camposExplotacion.id.value,
    referenciaCatastral: referenciaCatastral,
  };
  console.log("Parcela a enviar:", parcelaFinal);

  const recintos = await obtenerRecintosDeParcela({
    codigoProvincia: datosParcela.codigoProvincia,
    codigoMunicipio: datosParcela.codigoMunicipio,
    agregado: datosParcela.agregado,
    zona: datosParcela.zona,
    numPoligono: datosParcela.numPoligono,
    numParcela: datosParcela.numParcela,
    idParcela: idGenerado,
  });
  
  console.log("Recintos:", recintos);

  try {
    const res = await fetch("http://localhost:3000/parcelas/crear-con-recintos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: idGenerado,
        nombre: datosParcela.nombre,
        codigoProvincia: datosParcela.codigoProvincia,
        codigoMunicipio: datosParcela.codigoMunicipio,
        nombreMunicipio: datosParcela.municipio, 
        agregado: datosParcela.agregado,
        zona: datosParcela.zona,
        numPoligono: datosParcela.numPoligono,
        numParcela: datosParcela.numParcela,
        superficieDeclarada: parseFloat(datosParcela.superficieDeclarada),
        referenciaCatastral,
        idExplotacion: camposExplotacion.id.value,
        recintos: recintos,
      }),
    });
  
    const result = await res.json();
  
    if (!res.ok) {
      alert(result.error || "Error al crear parcela");
      return;
    }
  
    alert("Parcela y recintos creados correctamente");
    location.reload();
  } catch (error) {
    console.error("Error al crear parcela con recintos:", error);
    alert("Error inesperado al crear la parcela");
  }
});
