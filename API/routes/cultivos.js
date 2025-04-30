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

// Obtener plagas de un cultivo
router.get("/plagas/:cultivo", async (req, res) => {
  const cultivo = req.params.cultivo;
  try {
    const [rows] = await db
      .promise()
      .query(`SELECT DISTINCT CodigoAgente,Agente FROM Usos WHERE Cultivo = ?`, [cultivo]);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener plagas:", error);
    res.status(500).json({ error: "Error al obtener plagas" });
  }
});

// Obtener productos de un cultivo y plaga
router.get("/plagas/productos/:cultivo/:plaga", async (req, res) => {
  const cultivo = req.params.cultivo;
  const plaga = req.params.plaga;
  try {
    const [rows] = await db.promise().query(
      `SELECT * FROM Producto INNER JOIN
          (SELECT DISTINCT * FROM Usos WHERE Cultivo = ? AND Agente = ?)s 
          ON s.Producto_idProducto = producto.idProducto;`,
      [cultivo, plaga]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
});

module.exports = router;
