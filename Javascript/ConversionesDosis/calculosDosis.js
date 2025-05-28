// Convertir unidades posibles a kg/ha o l/ha
export const comprobarUnidadMedida = (u) => {
  const arrayMasa = ["Kg/ha", "g/ha", "g/m2", "g/10m2"];
  const arrayVolumen = [
    "l/ha",
    "ml/ha",
    "cc/ha",
    "ml/m2",
    "l/10m²",
    "ml/100m2",
    "cc/100m2",
  ];

  if (arrayMasa.includes(u)) {
    return "Kg/ha";
  } else if (arrayVolumen.includes(u)) {
    return "l/ha";
  } else {
    return u;
  }
};

// Conversion de la dosis según tipo unidad
export const conversionUnidad = (u, dosis) => {
  // Masa → Kg/ha
  if (u === "Kg/ha") return dosis;
  if (u === "g/ha") return dosis / 1000;
  if (u === "g/m2") return dosis * 10;
  if (u === "g/10m2") return dosis;

  // Volumen → l/ha
  if (u === "l/ha") return dosis;
  if (u === "ml/ha") return dosis / 1000;
  if (u === "cc/ha") return dosis / 1000;
  if (u === "ml/m2") return dosis * 0.01;
  if (u === "l/10m²" || u === "l/10m2") return dosis * 100;
  if (u === "ml/100m2") return dosis * 0.01;
  if (u === "cc/100m2") return dosis * 0.01;

  return u;
};

// Calculo de la dosis según superficie
export const calculoDosis = (sup, dosis) => sup * dosis;

// Booleano para unidades validas
const arrayU = [
  "Kg/ha",
  "g/ha",
  "g/m2",
  "g/10m2",
  "l/ha",
  "ml/ha",
  "cc/ha",
  "ml/m2",
  "l/10m²",
  "ml/100m2",
  "cc/100m2",
];
export const unidadValida = (u) => (arrayU.includes(u) ? true : false);

// Comprobar valores max/min de la dosis aplicada según superficie
export const comprobarDosisAplicada = (
  supCultivo,
  sup,
  dosis,
  fecha,
  dosisMin,
  dosisMax,
  u
) => {
  if (!unidadValida(u))
    return alert(
      `Para la Unidad de Medida (${u}) no podemos hacer una validación informativa de las dósis.`
    );

  const errores = [];
  console.log(
    redondearDecimales(calculoDosis(sup, dosisMax)) +
      ">=" +
      dosis +
      " && " +
      supCultivo +
      ">=" +
      sup
  );
  // Validación de campos vacíos
  if (!sup || !supCultivo || !dosis || !fecha || !dosisMin || !dosisMax || !u) {
    errores.push("Todos los campos deben estar completos.");
  }

  sup = parseFloat(sup);
  supCultivo = parseFloat(supCultivo);
  dosis = parseFloat(dosis);
  dosisMin = parseFloat(dosisMin);
  dosisMax = parseFloat(dosisMax);

  // Validar que los campos numéricos sean números válidos
  if (
    isNaN(sup) ||
    isNaN(supCultivo) ||
    isNaN(dosis) ||
    isNaN(dosisMin) ||
    isNaN(dosisMax)
  ) {
    errores.push(
      "La superficie, dosis y valores mínimos/máximos deben ser números válidos."
    );
  }

  // Validar fecha del tratamiento
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const inputDate = new Date(fecha);
  inputDate.setHours(0, 0, 0, 0);
  if (inputDate > today) {
    errores.push("La fecha del tratamiento no puede ser mayor a hoy.");
  }

  // Validar superficie tratada
  if (supCultivo < sup) {
    errores.push(
      "La superficie tratada no puede superar la superficie total del cultivo."
    );
  }

  const dosisMaxima = redondearDecimales(calculoDosis(sup, dosisMax));
  const dosisMinima = redondearDecimales(calculoDosis(sup, dosisMin));

  if (dosis > dosisMaxima) {
    errores.push(
      `Para la superficie introducida (${sup} ha), la dosis máxima permitida es (${redondearDecimales(
        dosisMaxima
      )} ${comprobarUnidadMedida(u).split("/")[0]})`
    );
  }

  if (dosis < dosisMinima) {
    errores.push(
      `Para la superficie introducida (${sup} ha), la dosis mínima recomendada es (${redondearDecimales(
        dosisMinima
      )} ${comprobarUnidadMedida(u).split("/")[0]})`
    );
  }

  // Mostrar resultados
  if (errores.length > 0) {
    console.error("Errores:", errores);
    alert("Errores:\n" + errores.join("\n"));
  } else {
    alert("Datos correctos");
  }
};

// Comprobar valores max/min de la dosis aplicada según superficie
export const comprobacionFinal = (
  supCultivo,
  sup,
  dosis,
  fecha,
  dosisMin,
  dosisMax,
  u
) => {
  const errores = [];

  // Validar fecha del tratamiento
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const inputDate = new Date(fecha);
  inputDate.setHours(0, 0, 0, 0);
  if (inputDate > today) {
    errores.push("La fecha del tratamiento no puede ser mayor a hoy.");
  }

  // Validar superficie tratada
  if (supCultivo < sup) {
    errores.push(
      "La superficie tratada no puede superar la superficie total del cultivo."
    );
  }

  if (!unidadValida(u)) {
    const confirmarUnidad = confirm(
      `Para la Unidad de Medida (${u}) no podemos hacer una validación informativa de las dósis.
      ¿Quiere continuar igualmente?`
    );
    if (!confirmarUnidad) return false;
  } else {
    console.log(
      redondearDecimales(calculoDosis(sup, dosisMax)) +
        ">=" +
        dosis +
        " && " +
        supCultivo +
        ">=" +
        sup
    );

    sup = parseFloat(sup);
    supCultivo = parseFloat(supCultivo);
    dosis = parseFloat(dosis);
    dosisMin = parseFloat(dosisMin);
    dosisMax = parseFloat(dosisMax);

    // Validar que los campos numéricos sean números válidos
    if (
      isNaN(sup) ||
      isNaN(supCultivo) ||
      isNaN(dosis) ||
      isNaN(dosisMin) ||
      isNaN(dosisMax)
    ) {
      errores.push(
        "La superficie, dosis y valores mínimos/máximos deben ser números válidos."
      );
    }

    const dosisMaxima = redondearDecimales(calculoDosis(sup, dosisMax));
    const dosisMinima = redondearDecimales(calculoDosis(sup, dosisMin));

    if (dosis > dosisMaxima) {
      errores.push(
        `Para la superficie introducida (${sup} ha), la dosis máxima permitida es (${redondearDecimales(
          dosisMaxima
        )} ${comprobarUnidadMedida(u).split("/")[0]})`
      );
    }

    if (dosis < dosisMinima) {
      const confirmar = confirm(
        `Para la superficie introducida (${sup} ha), la dosis mínima recomendada es (${redondearDecimales(
          dosisMinima
        )} ${
          comprobarUnidadMedida(u).split("/")[0]
        }). ¿Quiere aplicar esta dosis de todas formas?`
      );
      if (!confirmar) return false;
    }
  }

  // Mostrar resultados
  if (errores.length > 0) {
    alert("Errores:\n" + errores.join("\n"));
    return false;
  }
  return confirm(
    "El tratamiento es apto para nuestras comprobaciones. ¿Estás seguro que desea realizar el tratamiento?"
  );
};

// Redondear a 3 decimales
export const redondearDecimales = (n) => Math.round(n * 1000) / 1000;

// Convertir campo DATE a dd-mm-aaaa
export const formatDate = (fecha) => {
  const d = new Date(fecha);
  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
  const año = d.getFullYear();
  return `${dia}-${mes}-${año}`;
};

// Convertir campo DATE a yyyy-MM-dd
export const formatDate2 = (fecha) => {
  const d = new Date(fecha);
  const dia = String(d.getDate()).padStart(2, "0");
  const mes = String(d.getMonth() + 1).padStart(2, "0"); // Los meses van de 0 a 11
  const año = d.getFullYear();
  return `${año}-${mes}-${dia}`;
};
