const express = require("express");
const router = express.Router();
const db = require("../src/db");

// Alta equipamiento
router.post("/alta", async (req, res) => {
  const { roma, nombre, fechaAdquisicion, fechaRevision } = req.body;

  if (!roma.trim() || !nombre.trim() || !fechaAdquisicion || !fechaRevision) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  const conn = await db.promise().getConnection();
  await conn.beginTransaction();

  try {
    // Verifica si el Nombre del equipo existe
    const [equipoExistente] = await conn.query(
      "SELECT Numero_ROMA FROM equipo WHERE Numero_ROMA = ?",
      [roma]
    );

    if (equipoExistente.length > 0) {
      await conn.rollback();
      return res.status(409).json({ error: "El equipo de tratamiento ya existe" });
    }

    // Verifica que fechaAdquisicion sea anterior a fechaRevision
    if (new Date(fechaAdquisicion) > new Date(fechaRevision)) {
        await conn.rollback();
        return res.status(400).json({
         error: "La fecha de adquisición debe ser anterior o igual a la fecha de revisión."
         });
    }


    // Insert
    await conn.query(
      `INSERT INTO equipo (Numero_ROMA, Nombre, Fecha_adquisicion, Fecha_ultima_revision)
       VALUES (?,?,?,?)`,
      [roma, nombre, fechaAdquisicion, fechaRevision]
    );

    await conn.commit();
    res.status(200).json({ message: "Equipo registrado correctamente" });

  } catch (error) {
    await conn.rollback();
    console.error("Error:", error);
    res.status(500).json({ error: "Error en el servidor" });
  } finally {
    conn.release();
  }
});

// Obtener todos los equipos de una explotación
router.get("/explotacion/:id", async (req, res) => {
  const id = req.params.id;

  const query = `
    SELECT * FROM explotacion_has_equipo 
    INNER JOIN equipo t ON t.Numero_ROMA = explotacion_has_equipo.equipo_Numero_ROMA 
    WHERE explotacion_idExplotacion = ?
  `;

  try {
    const [rows] = await db.promise().query(query, [id]);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener equipos por explotación:", error);
    res.status(500).json({ error: "Error al obtener equipos" });
  }
});

// Obtener todos los equipos
router.get("/", async (req, res) => {
  try {
    const [rows] = await db.promise().query("SELECT * FROM equipo");
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener equipos:", error);
    res.status(500).json({ error: "Error al obtener equipos" });
  }
});

// Eliminar equipo
router.delete("/:roma", async (req, res) => {
  const { roma } = req.params;

  if (!roma) {
      return res.status(400).json({ error: "Falta el número ROMA." });
  }

  const conn = await db.promise().getConnection();

  try {
      const [result] = await conn.query(
          "DELETE FROM equipo WHERE Numero_ROMA = ?",
          [roma]
      );

      if (result.affectedRows === 0) {
          return res.status(404).json({ error: "Equipo no encontrado." });
      }

      res.status(200).json({ message: "Equipo eliminado correctamente" });
  } catch (error) {
      console.error("Error al eliminar el equipo:", error);
      res.status(500).json({ error: "No se ha podido eliminar el equipo, ya que está asociado a un tratamiento." });
  } finally {
      conn.release();
  }
});

// Ruta para actualizar los datos de un equipo
router.put("/actualizar/:roma", async (req, res) => {
  const roma = req.params.roma;
  const { nombre, fecha_adquisicion, fecha_ultima_revision } = req.body;

  // Validación de campos requeridos
  if (!nombre.trim() || !fecha_adquisicion || !fecha_ultima_revision) {
    return res.status(400).json({ error: "Faltan datos requeridos" });
  }

  // Validación de fechas
  if (new Date(fecha_adquisicion) > new Date(fecha_ultima_revision)) {
    return res.status(400).json({
      error: "La fecha de adquisición debe ser anterior o igual a la fecha de revisión."
      });
  }

  try {
    const [result] = await db.promise().query(
      "UPDATE equipo SET Nombre = ?, Fecha_adquisicion = ?, Fecha_ultima_revision = ? WHERE Numero_ROMA = ?",
      [nombre, fecha_adquisicion, fecha_ultima_revision, roma]
    );

    if (result.affectedRows > 0) {
      return res.json({ message: "Equipo actualizado correctamente" });
    } else {
      return res.status(404).json({ error: "Equipo no encontrado" });
    }
  } catch (err) {
    console.error("Error al actualizar el equipo:", err);
    return res.status(500).json({ error: "Error en la base de datos" });
  }
});


module.exports = router;
