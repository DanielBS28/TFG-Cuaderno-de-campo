const express = require("express");
const router = express.Router();
const db = require("../src/db");

// Obtener todos los equipos de una explotacion
router.get("/explotacion/:id", async (req, res) => {
  const id = req.params.id;

  const query = `
      SELECT * FROM explotacion_has_equipo INNER JOIN (SELECT * FROM equipo)t 
      ON t.Numero_ROMA = explotacion_has_equipo.equipo_Numero_ROMA WHERE explotacion_idExplotacion = ?
    `;

  try {
    const [rows] = await db.promise().query(query, [id]);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener equipos por explotación:", error);
    res.status(500).json({ error: "Error al obtener equipos" });
  }
});

module.exports = router;
