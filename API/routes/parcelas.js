const express = require("express");
const router = express.Router();
const db = require("../db");

// Obtener todos los tipos de cultivos
router.get("/cultivos", async (req, res) => {
  try {
    const [rows] = await db
      .promise()
      .query(`SELECT DISTINCT Cultivo FROM Usos`);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener cultivos:", error);
    res.status(500).json({ error: "Error al obtener cultivos" });
  }
});

// Dar de alta una parcela
router.post("/crear", async (req, res) => {
  const {
    id,
    nombre,
    codigoProvincia,
    codigoMunicipio,
    numPoligono,
    numParcela,
    superficieSIGPAC,
    tipoRegadio,
    tipoCultivo,
    idExplotacion,
  } = req.body;

  try {
    await db.promise().query(
      `INSERT INTO Parcela 
          (Numero_identificacion, Nombre_parcela, Provincia, Codigo_municipio, Poligono, Parcela, Superficie_ha, Tipo_R_S, Tipo_cultivo, Explotacion_idExplotacion)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        nombre,
        codigoProvincia,
        codigoMunicipio,
        numPoligono,
        numParcela,
        superficieSIGPAC,
        tipoRegadio,
        tipoCultivo,
        idExplotacion,
      ]
    );

    res.json({ message: "Parcela creada correctamente" });
  } catch (error) {
    console.error("Error al crear parcela:", error);
    res.status(500).json({ error: "No se pudo crear la parcela" });
  }
});

module.exports = router;
