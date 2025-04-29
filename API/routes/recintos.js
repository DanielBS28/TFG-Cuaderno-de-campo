const express = require("express");
const router = express.Router();
const db = require("../src/db");

// Obtener todos los recintos de una parcela
router.get("/parcela/:id", async (req, res) => {
    const idParcela = req.params.id;

  try {
    const [rows] = await db
      .promise()
      .query(`
        SELECT 
        idRecinto,
        Numero,
        Uso_SIGPAC,
        Descripcion_uso,
        Superficie_ha
        FROM Recinto WHERE parcela_Numero_identificacion = ?`, [
        idParcela,
      ]);

    res.json(rows);
  } catch (error) {
    console.error("Error al obtener recintos de la parcela:", error);
    res.status(500).json({ error: "Error al obtener recintos" });
  }
});

// Dar de alta un cultivo en un recinto
router.put("/cultivar/:id", async (req, res) => {
  const idRecinto = req.params.id;
  const { tipoCultivo, tipoRegadio } = req.body;

  try {
    await db.promise().query(
      `UPDATE Recinto SET Tipo_Cultivo = ?, Tipo_regadio = ? WHERE idRecinto = ?`,
      [tipoCultivo, tipoRegadio, idRecinto]
    );
    res.json({ message: "Cultivo actualizado correctamente en el recinto." });
  } catch (error) {
    console.error("Error al actualizar cultivo en recinto:", error);
    res.status(500).json({ error: "Error al actualizar el cultivo." });
  }
});

module.exports = router;
