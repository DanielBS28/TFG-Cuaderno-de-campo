const express = require("express");
const router = express.Router();
const db = require("../src/db");

//Alta de asesor
router.post("/alta", async (req, res) => {
  const { nombre, apellido1, apellido2, dni, carnet } = req.body;

  if (!nombre.trim() || !apellido1.trim() || !apellido2.trim() || !dni.trim() || !carnet.trim()) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const conn = await db.promise().getConnection();
  await conn.beginTransaction();

  try {
    // Verificar si el DNI ya existe
    const [usuarioExistente] = await conn.query(
      "SELECT DNI FROM Asesor WHERE DNI = ?",
      [dni]
    );
    if (usuarioExistente.length > 0) {
      await conn.rollback();
      return res.status(409).json({ error: "El DNI ya está registrado." });
    }

    // Verificar si el número de carnet ya existe
    const [carnetExistente] = await conn.query(
      "SELECT N_carnet_asesor FROM Asesor WHERE N_carnet_asesor = ?",
      [carnet]
    );
    if (carnetExistente.length > 0) {
      await conn.rollback();
      return res
        .status(409)
        .json({ error: "El número de carnet ya está en uso." });
    }

    await conn.query(
      `
            INSERT INTO Asesor (N_carnet_asesor ,DNI, Nombre, Apellido1, Apellido2)
            VALUES (?, ?, ?, ?, ?)`,
      [carnet, dni, nombre, apellido1, apellido2]
    );

    await conn.commit();
    res.status(200).json({ message: "Asesor registrado correctamente" });
  } catch (err) {
    await conn.rollback();
    console.error("Error:", err);
    res.status(500).json({ error: "Error en el servidor" });
  } finally {
    conn.release();
  }
});

// Obtener todos los asesores
router.get("/todos", async (req, res) => {
  try {
    const [rows] = await db.promise().query(`
            SELECT * FROM asesor;
        `);

    res.json(rows);
  } catch (error) {
    console.error("Error al obtener todos los asesores:", error);
    res
      .status(500)
      .json({ error: "Error del servidor al obtener asesores." });
  }
});

// Buscar asesor por DNI
router.get("/buscar/dni/:dni", (req, res) => {
  const dni = req.params.dni;

  const query = `
        SELECT * FROM Asesor WHERE DNI = ?
    `;

  db.query(query, [dni], (err, results) => {
    if (err)
      return res.status(500).json({ error: "Error en la búsqueda por DNI" });
    if (results.length === 0)
      return res.status(404).json({ error: "Asesor no encontrado" });
    res.json(results[0]);
  });
});

// Buscar asesor por Nº de carnet
router.get("/buscar/carnet/:carnet", (req, res) => {
  const carnet = req.params.carnet;

  const query = `
        SELECT * FROM Asesor WHERE N_Carnet_asesor = ?;
    `;

  db.query(query, [carnet], (err, results) => {
    if (err)
      return res.status(500).json({ error: "Error en la búsqueda por carnet" });
    if (results.length === 0)
      return res.status(404).json({ error: "Asesor no encontrado" });
    res.json(results[0]);
  });
});

// Baja de asesor por DNI
router.delete("/eliminar/:dni", async (req, res) => {
  const dni = req.params.dni;

  try {
    const [result] = await db
      .promise()
      .query("DELETE FROM Asesor WHERE DNI = ?", [dni]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Asesor no encontrado" });
    }

    res.status(200).json({ message: "Asesor dado de baja correctamente" });
  } catch (error) {
    console.error("Error al eliminar asesor:", error);
    res.status(500).json({ error: "Error en el servidor" });
  }
});

// Actualizar asesor
router.put("/actualizar/:dni", async (req, res) => {
  const dni = req.params.dni;
  const { nombre, apellido1, apellido2, carnet } = req.body;

  if (!nombre || !apellido1 || !apellido2 || !carnet) {
    return res.status(400).json({ error: "Faltan campos obligatorios." });
  }

  const conn = await db.promise().getConnection();
  await conn.beginTransaction();

  try {
    // Verificar existencia
    const [[asesor]] = await conn.query("SELECT * FROM Asesor WHERE DNI = ?", [
      dni,
    ]);
    if (!asesor) {
      await conn.rollback();
      return res.status(404).json({ error: "Asesor no encontrado." });
    }

    // Verificar duplicado de carnet
    const [repetido] = await conn.query(
      "SELECT * FROM Asesor WHERE N_carnet_asesor = ? AND DNI != ?",
      [carnet, dni]
    );
    if (repetido.length > 0) {
      await conn.rollback();
      return res
        .status(409)
        .json({ error: "El número de carnet ya está en uso." });
    }

    // Actualizar datos
    await conn.query(
      "UPDATE Asesor SET Nombre = ?, Apellido1 = ?, Apellido2 = ?, N_carnet_asesor = ? WHERE DNI = ?",
      [nombre, apellido1, apellido2, carnet, dni]
    );

    await conn.commit();
    res.json({ message: "Datos del asesor actualizados correctamente." });
  } catch (err) {
    await conn.rollback();
    console.error("Error al actualizar asesor:", err);
    res.status(500).json({ error: "Error del servidor al actualizar." });
  } finally {
    conn.release();
  }
});

// Obtener asesores asignados a un agricultor
router.get("/asignados/:dni", (req, res) => {
  const { dni } = req.params;

  const sql = `
    SELECT t.*
    FROM asesor_has_agricultor
    INNER JOIN asesor t ON t.DNI = asesor_has_agricultor.Asesor_DNI
    WHERE asesor_has_agricultor.Agricultor_Usuario_DNI = ?
  `;

  db.query(sql, [dni], (err, results) => {
    if (err) {
      console.error("Error al obtener asesores asignados:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }
    res.json(results);
  });
});

module.exports = router;
