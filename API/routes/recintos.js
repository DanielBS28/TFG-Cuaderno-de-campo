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
        Superficie_ha,
        Tipo_Cultivo,
        Tipo_regadio
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

// Dar de baja cultivo en un recinto
router.put("/baja-cultivo/:id", async (req, res) => {
  const idRecinto = req.params.id;

  try {
    await db.promise().query(
      `UPDATE Recinto SET Tipo_Cultivo = NULL, Tipo_regadio = NULL WHERE idRecinto = ?`,
      [idRecinto]
    );
    res.json({ message: "Cultivo dado de baja correctamente en el recinto." });
  } catch (error) {
    console.error("Error al dar de baja cultivo:", error);
    res.status(500).json({ error: "Error al dar de baja el cultivo." });
  }
});

// Eliminar varios recintos por sus idRecinto
router.delete("/eliminar-multiples", async (req, res) => {
  const { ids } = req.body;

  if (!Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ error: "Debes proporcionar un array de IDs." });
  }

  try {
    const placeholders = ids.map(() => "?").join(", ");
    const query = `DELETE FROM Recinto WHERE idRecinto IN (${placeholders})`;

    await db.promise().query(query, ids);

    res.json({ message: `Se eliminaron ${ids.length} recinto(s).` });
  } catch (error) {
    console.error("Error al eliminar recintos:", error);
    res.status(500).json({ error: "Error al eliminar recintos." });
  }
});

// Insertar o actualizar múltiples recintos con ON DUPLICATE KEY
router.post("/insertar-o-actualizar", async (req, res) => {
  const { recintos } = req.body;

  if (!Array.isArray(recintos) || recintos.length === 0) {
    return res.status(400).json({ error: "Debes enviar un array de recintos." });
  }
  
  try {
    const values = recintos.map(r => [
      r.idRecinto,
      r.parcela_Numero_identificacion,
      r.Numero,
      r.Uso_SIGPAC,
      r.Descripcion_uso,
      r.Superficie_ha
    ]);

    const placeholders = values.map(() => "(?, ?, ?, ?, ?, ?)").join(", ");
    const query = `
      INSERT INTO Recinto (
        idRecinto,
        parcela_Numero_identificacion,
        Numero,
        Uso_SIGPAC,
        Descripcion_uso,
        Superficie_ha
      ) VALUES ${placeholders}
      ON DUPLICATE KEY UPDATE
        Uso_SIGPAC = VALUES(Uso_SIGPAC),
        Descripcion_uso = VALUES(Descripcion_uso),
        Superficie_ha = VALUES(Superficie_ha)
    `;

    const flatValues = values.flat();
    await db.promise().query(query, flatValues);

    res.json({ message: `Recintos insertados o actualizados correctamente.`});

  } catch (error) {
    console.error("Error al insertar/actualizar recintos:", error);
    res.status(500).json({ error: "Error al insertar/actualizar recintos." });
  }
});


module.exports = router;
