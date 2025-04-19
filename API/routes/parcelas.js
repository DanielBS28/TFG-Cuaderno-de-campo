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
    nombreMunicipio,
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
          (Numero_identificacion, Nombre_parcela, Provincia, Codigo_municipio, Municipio, Poligono, Parcela, Superficie_ha, Tipo_R_S, Tipo_cultivo, Explotacion_idExplotacion)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
      [
        id,
        nombre,
        codigoProvincia,
        codigoMunicipio,
        nombreMunicipio,
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

// Eliminar una parcela por su ID
router.delete("/eliminar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db.promise().query(`DELETE FROM Parcela WHERE Numero_identificacion = ?`, [id]);
    res.json({ message: "Parcela eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar parcela:", error);
    res.status(500).json({ error: "No se pudo eliminar la parcela" });
  }
});

// Obtener todas las parcelas de una explotación
router.get("/explotacion/:id", async (req, res) => {
  const idExplotacion = req.params.id;

  try {
    const [rows] = await db.promise().query(
      `SELECT 
        Numero_identificacion AS idParcela,
        Nombre_parcela AS Nombre,
        Provincia AS Codigo_Provincia,
        Codigo_municipio AS Codigo_Municipio,
        Municipio AS Nombre_Municipio,
        Poligono,
        Parcela,
        Superficie_ha AS Superficie_SIGPAC,
        Tipo_R_S AS Tipo_Regadio,
        Tipo_cultivo AS Tipo_Cultivo
      FROM Parcela
      WHERE Explotacion_idExplotacion = ?`,
      [idExplotacion]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error al obtener parcelas de la explotación:", error);
    res.status(500).json({ error: "Error al obtener parcelas" });
  }
});


module.exports = router;
