const express = require("express");
const router = express.Router();
const db = require("../src/db");

// Alta de explotación
router.post("/alta", async (req, res) => {
    const { nombre, dni } = req.body;

    if (!nombre || !dni) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const conn = await db.promise().getConnection();
    await conn.beginTransaction();

    try {
        // Verificar si el agricultor existe
        const [agricultor] = await conn.query(
            "SELECT Usuario_DNI FROM Agricultor WHERE Usuario_DNI = ?", [dni]
        );        

        if (agricultor.length === 0) {
            await conn.rollback();
            return res.status(404).json({ error: "El agricultor no existe" });
        }

        // Insertar la explotación (superficie inicial 0)
        await conn.query(`
            INSERT INTO Explotacion (Nombre, Superficie_total, Agricultor_Usuario_DNI1)
            VALUES (?, 0, ?)`, [nombre, dni]
        );

        await conn.commit();
        res.status(200).json({ message: "Explotación registrada correctamente" });
    } catch (err) {
        await conn.rollback();
        console.error("Error:", err);
        res.status(500).json({ error: "Error en el servidor" });
    } finally {
        conn.release();
    }
});

// Obtener número de parcelas totales de una explotación
router.get("/parcelas/:idExplotacion", async (req, res) => {
    const id = req.params.idExplotacion;

    try {
        const [rows] = await db.promise().query(
            "SELECT COUNT(*) as total FROM Parcela WHERE Explotacion_idExplotacion = ?",
            [id]
        );

        res.json({ total: rows[0].total });
    } catch (error) {
        console.error("Error al obtener parcelas:", error);
        res.status(500).json({ error: "Error al contar parcelas" });
    }
});

// Eliminar explotación
router.delete("/baja/:id", async (req, res) => {
    const idExplotacion = req.params.id;

    try {
        const [rows] = await db.promise().query(
            "SELECT * FROM Explotacion WHERE idExplotacion = ?", [idExplotacion]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "La explotación no existe." });
        }

        await db.promise().query(
            "DELETE FROM Explotacion WHERE idExplotacion = ?", [idExplotacion]
        );

        res.json({ message: "Explotación eliminada correctamente." });
    } catch (error) {
        console.error("Error al eliminar explotación:", error);
        res.status(500).json({ error: "Error al eliminar la explotación." });
    }
});

// Actualizar nombre explotación
router.put("/editar/:id", async (req, res) => {
    const idExplotacion = req.params.id;
    const {nombre} = req.body;

    if (!nombre) {
        return res.status(400).json({ error: "Faltan campos obligatorios." });
    }

    try {
        const [rows] = await db.promise().query(
            "SELECT Nombre FROM Explotacion WHERE idExplotacion = ?", [idExplotacion]
        );

        if (rows.length === 0) {
            return res.status(404).json({ error: "La explotación no existe." });
        }

        await db.promise().query(
            "UPDATE Explotacion SET Nombre = ? WHERE idExplotacion = ?", [nombre, idExplotacion]
        );

        res.json({ message: "Nombre de la explotación actualizado correctamente." });
    } catch (error) {
        console.error("Error al actualizar nombre de la explotación:", error);
        res.status(500).json({ error: "Error al actualizar nombre de la explotación." });
    }
});

// Obtener explotaciones por DNI del agricultor
router.get("/dni-agricultor/:dni", async (req, res) => {

    const dni = req.params.dni;

    try {
        const [rows] = await db.promise().query(
            "SELECT idExplotacion, Nombre FROM Explotacion WHERE Agricultor_Usuario_DNI1 = ?",
            [dni]
        );

        res.status(200).json(rows);
    } catch (error) {
        console.error("Error al obtener explotaciones por DNI:", error);
        res.status(500).json({ error: "Error al obtener explotaciones" });
    }
});


//asignar equipo
router.post("/asignar-equipo", async (req, res) => {
    const { explotacion_idExplotacion, equipo_Numero_ROMA } = req.body;

    if (!explotacion_idExplotacion || !equipo_Numero_ROMA) {
      return res.status(400).json({ error: "Faltan datos de la explotación o del equipo." });
    }
  
    const conn = await db.promise().getConnection();
    await conn.beginTransaction();
  
    try {
      // Verificar que existan
      const [[explotacion]] = await conn.query(
        "SELECT * FROM Explotacion WHERE idExplotacion = ?",
        [explotacion_idExplotacion]
      );
      const [[equipo]] = await conn.query(
        "SELECT * FROM Equipo WHERE Numero_ROMA = ?",
        [equipo_Numero_ROMA]
      );
  
      if (!explotacion) {
        await conn.rollback();
        return res.status(404).json({ error: "Explotación no encontrada" });
      }
  
      if (!equipo) {
        await conn.rollback();
        return res.status(404).json({ error: "Equipo no encontrado" });
      }
  
      // Insertar en la tabla intermedia
      await conn.query(
        `INSERT INTO explotacion_has_equipo (explotacion_idExplotacion, equipo_Numero_ROMA)
         VALUES (?, ?)`,
        [explotacion_idExplotacion, equipo_Numero_ROMA]
      );
  
      await conn.commit();
      res.status(200).json({ message: "Equipamiento asignado con éxito" });
  
    } catch (err) {
      await conn.rollback();
  
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: "Esta asignación ya existe." });
      }
  
      console.error("Error al asignar equipo:", err);
      res.status(500).json({ error: "Error al asignar equipo" });
    } finally {
      conn.release();
    }
  });

  // desasignar equipo
router.delete("/desasignar-equipo", async (req, res) => {
    const { explotacion_idExplotacion, equipo_Numero_ROMA } = req.body;
  
    if (!explotacion_idExplotacion || !equipo_Numero_ROMA) {
      return res.status(400).json({ error: "Faltan datos de la explotación o del equipo." });
    }
  
    const conn = await db.promise().getConnection();
    await conn.beginTransaction();
  
    try {
      // Verificar que exista la relación
      const [relacion] = await conn.query(
        `SELECT * FROM explotacion_has_equipo 
         WHERE explotacion_idExplotacion = ? AND equipo_Numero_ROMA = ?`,
        [explotacion_idExplotacion, equipo_Numero_ROMA]
      );
  
      if (relacion.length === 0) {
        await conn.rollback();
        return res.status(404).json({ error: "La relación no existe." });
      }
  
      // Eliminar la relación
      await conn.query(
        `DELETE FROM explotacion_has_equipo 
         WHERE explotacion_idExplotacion = ? AND equipo_Numero_ROMA = ?`,
        [explotacion_idExplotacion, equipo_Numero_ROMA]
      );
  
      await conn.commit();
      res.status(200).json({ message: "Equipamiento desasignado con éxito" });
  
    } catch (err) {
      await conn.rollback();
      console.error("Error al desasignar equipo:", err);
      res.status(500).json({ error: "Error al desasignar equipo" });
    } finally {
      conn.release();
    }
  });
  


module.exports = router;
