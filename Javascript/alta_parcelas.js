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
let option = document.createElement("option");

const camposExplotacion = {
  id: document.getElementById("id-explotacion"),
  nombre: document.getElementById("nombre-buscado-explotacion"),
  superficie: document.getElementById("superficie"),
  parcelas: document.getElementById("total-parcelas"),
};

// DATOS PARCELA
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

let cultivosOriginales = [];

//FORMULARIO
const formCrearParcela = document.getElementById("general");

//FUNCIONES
function mostrarDatosAgricultor(data) {
  camposAgricultor.nombre.value = data.Nombre;
  camposAgricultor.apellido1.value = data.Apellido1;
  camposAgricultor.apellido2.value = data.Apellido2;
  camposAgricultor.dni.value = data.dni;
  camposAgricultor.carnet.value = data.carnet;
}

const desbloquearExplotacion = () => {
  inputBuscarExplotacion.disabled = false;
  inputBuscarExplotacion.value = "";

  selectExplotacion.disabled = false;
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
  option.value = "Selecciona una explotación";
  option.textContent = "Selecciona una explotación";
};

function cargarCamposExplotacion() {
  fetch(
    `http://localhost:3000/agricultores/explotaciones/${camposAgricultor.dni.value}`
  )
    .then((response) => response.json())
    .then((explotaciones) => {
      limpiarCamposExplotacion();
      limpiarCamposParcela();

      if (explotaciones.length === 0) {
        selectExplotacion.disabled = true;
        inputBuscarExplotacion.disabled = true;
        alert(
          "Este agricultor no tiene ninguna explotación. Por favor, añade una explotación antes de añadir parcelas."
        );
        return;
      }

      window.explotacionesOriginales = explotaciones; // <-- Guardamos la lista original

      renderizarOpciones(explotacionesOriginales);
    })
    .catch((error) => {
      console.error("Error cargando explotaciones:", error);
    });
}

function renderizarOpciones(lista) {
  selectExplotacion.innerHTML =
    "<option selected disabled>Seleccionar explotación</option>";
  lista.forEach((explotacion) => {
    option = document.createElement("option");
    option.value = explotacion.idExplotacion;
    option.textContent = `${explotacion.Nombre} | ${explotacion.Superficie_total} ha`;
    selectExplotacion.appendChild(option);
  });
}

function limpiarCamposExplotacion() {
  camposExplotacion.id.value = "";
  camposExplotacion.nombre.value = "";
  camposExplotacion.superficie.value = "";
  camposExplotacion.parcelas.value = "";
  selectExplotacion.selectedIndex = 0; // volver al primer <option>
}

//Cargar las parcelas totales de la explotación
const obtenerParcelasTotales = async (idSeleccionado) => {
  fetch(`http://localhost:3000/explotaciones/parcelas/${idSeleccionado}`)
    .then((res) => res.json())
    .then((data) => {
      camposExplotacion.parcelas.value = data.total;

      cargarCultivos();
      desbloquearParcela();
    })
    .catch((err) => {
      console.error("Error al obtener parcelas:", err);
      camposExplotacion.parcelas.value = "—";
    });
};

function desbloquearParcela() {
  camposParcela.id.disabled = false;
  camposParcela.nombre.disabled = false;
  camposParcela.codigoProvincia.disabled = false;
  camposParcela.codigoMunicipio.disabled = false;
  camposParcela.nombreMunicipio.disabled = false;
  camposParcela.numPoligono.disabled = false;
  camposParcela.numParcela.disabled = false;
  camposParcela.superficieSIGPAC.disabled = false;
  camposParcela.selectTipoRegadio.disabled = false;
  camposParcela.inputBuscarTipoCultivo.disabled = false;
  camposParcela.selectTipoCultivo.disabled = false;
}

function bloquearParcela() {
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
}

function limpiarCamposParcela() {
  camposParcela.id.value = "";
  camposParcela.nombre.value = "";
  camposParcela.codigoProvincia.value = "";
  camposParcela.codigoMunicipio.value = "";
  camposParcela.nombreMunicipio.value = "";
  camposParcela.numPoligono.value = "";
  camposParcela.numParcela.value = "";
  camposParcela.superficieSIGPAC.value = "";
  camposParcela.selectTipoRegadio.selectedIndex = 0; // volver al primer <option>
  camposParcela.inputBuscarTipoCultivo.value = "";
  camposParcela.selectTipoCultivo.selectedIndex = 0; // volver al primer <option>
}

// Cargar todos los tipos de cultivo en el select
function cargarCultivos() {
  fetch("http://localhost:3000/parcelas/cultivos")
    .then((res) => res.json())
    .then((cultivos) => {
      cultivosOriginales = cultivos; // Guardamos lista original

      renderizarCultivos(cultivosOriginales);
    })
    .catch((err) => {
      console.error("Error al cargar cultivos:", err);
    });
}

function renderizarCultivos(lista) {
  camposParcela.selectTipoCultivo.innerHTML = `
      <option disabled selected>Seleccione el tipo de cultivo</option>
    `;

  lista.forEach(({ Cultivo }) => {
    const option = document.createElement("option");
    option.value = Cultivo;
    option.textContent = Cultivo;
    camposParcela.selectTipoCultivo.appendChild(option);
  });
}

function validarCamposParcela() {
    const {
      id,
      nombre,
      codigoProvincia,
      nombreMunicipio,
      codigoMunicipio,
      numPoligono,
      numParcela,
      superficieSIGPAC,
      selectTipoRegadio,
      selectTipoCultivo,
    } = camposParcela;
  
    const errores = [];
    const esNatural = (valor) => /^\d+$/.test(valor);
  
    if (!esNatural(id.value)) errores.push("El ID debe ser un número natural.");
    if (!esNatural(codigoProvincia.value)) errores.push("Código de provincia inválido.");
    if (!esNatural(codigoMunicipio.value)) errores.push("Código de municipio inválido.");
    if (!esNatural(numPoligono.value)) errores.push("Polígono inválido.");
    if (!esNatural(numParcela.value)) errores.push("Parcela inválida.");
    if (isNaN(superficieSIGPAC.value) || superficieSIGPAC.value < 0) errores.push("Superficie SIGPAC inválida.");
    if (selectTipoRegadio.selectedIndex <= 0) errores.push("Selecciona un tipo de regadío.");
    if (selectTipoCultivo.selectedIndex <= 0) errores.push("Selecciona un tipo de cultivo.");

    if (!nombre.value.trim()) errores.push("El nombre de la parcela no puede estar vacío.");
    if (!nombreMunicipio.value.trim()) errores.push("El nombre del municipio no puede estar vacío.");
  
    return errores;
  }
  

//EVENTOS
botonBuscarAgricultor.addEventListener("click", async (e) => {
  e.preventDefault();
  const dni = dniAgricultor.value.trim();

  if (!dni) return alert("Introduce un DNI");

  const res = await fetch(
    `http://localhost:3000/agricultores/buscar/dni/${dni}`
  );
  const data = await res.json();

  if (res.ok) {
    bloquearParcela();
    mostrarDatosAgricultor(data);
    desbloquearExplotacion();
    cargarCamposExplotacion();
  } else {
    alert(data.error || "Agricultor no encontrado");
  }
});

// Escuchar cambios en el inputBuscarExplotacion para filtrar
inputBuscarExplotacion.addEventListener("input", () => {
  const texto = inputBuscarExplotacion.value.toLowerCase();
  const filtradas = window.explotacionesOriginales.filter((exp) =>
    exp.Nombre.toLowerCase().includes(texto)
  );
  renderizarOpciones(filtradas);
});

// Rellenar Inputs de Explotación
selectExplotacion.addEventListener("change", () => {
  const idSeleccionado = selectExplotacion.value;
  const seleccionada = window.explotacionesOriginales.find(
    (exp) => exp.idExplotacion == idSeleccionado
  );

  if (seleccionada) {
    camposExplotacion.id.value = seleccionada.idExplotacion;
    camposExplotacion.nombre.value = seleccionada.Nombre;
    camposExplotacion.superficie.value = `${seleccionada.Superficie_total} ha`;
    obtenerParcelasTotales(idSeleccionado);
  }
});

//Escuchar cambios en el inputBuscarTipoCultivo para filtrar
camposParcela.inputBuscarTipoCultivo.addEventListener("input", () => {
  const texto = camposParcela.inputBuscarTipoCultivo.value.toLowerCase();

  const filtrados = cultivosOriginales.filter(({ Cultivo }) =>
    Cultivo.toLowerCase().includes(texto)
  );

  renderizarCultivos(filtrados);
});

formCrearParcela.addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const errores = validarCamposParcela();
    if (errores.length > 0) {
      alert("Errores:\n\n" + errores.join("\n"));
      return;
    }
  
    const datosParcela = {
      id: camposParcela.id.value,
      nombre: camposParcela.nombre.value.trim(),
      codigoProvincia: camposParcela.codigoProvincia.value,
      codigoMunicipio: camposParcela.codigoMunicipio.value,
      nombreMunicipio: camposParcela.nombreMunicipio.value,
      numPoligono: camposParcela.numPoligono.value,
      numParcela: camposParcela.numParcela.value,
      superficieSIGPAC: parseFloat(camposParcela.superficieSIGPAC.value),
      tipoRegadio: camposParcela.selectTipoRegadio.value,
      tipoCultivo: camposParcela.selectTipoCultivo.value,
      idExplotacion: camposExplotacion.id.value,
    };
  
    try {
      const res = await fetch("http://localhost:3000/parcelas/crear", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(datosParcela),
      });
  
      const result = await res.json();
  
      if (!res.ok) {
        alert(result.error || "Error al crear la parcela");
        return;
      }
  
      alert("✅ Parcela creada correctamente");
      location.reload();
    } catch (error) {
      console.error("Error en la petición:", error);
      alert("Error inesperado al crear la parcela");
    }
  });
  
  
