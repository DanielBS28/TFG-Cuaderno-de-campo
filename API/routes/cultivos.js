const express = require("express");
const router = express.Router();
const db = require("../src/db");

// Obtener todos los tipos de cultivos
router.get("/", async (req, res) => {
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

module.exports = router;
