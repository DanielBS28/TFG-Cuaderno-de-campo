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
export const comprobarDosisAplicada = (sup, dosis, fecha, dosisMin, dosisMax, u) => {
  // Obtener la fecha actual
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Eliminar la hora para comparar solo fechas

  const inputDate = new Date(fecha);
  inputDate.setHours(0, 0, 0, 0); // Igualar precisión

  console.log(sup, dosis, fecha, dosisMin, dosisMax, u);

  if (calculoDosis(sup, dosisMax) >= dosis && inputDate <= today)
    return alert("Datos correctos");
  else return alert("mamaste");
};
