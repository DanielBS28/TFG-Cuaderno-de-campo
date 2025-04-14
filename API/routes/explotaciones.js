const express = require("express");
const router = express.Router();
const db = require("../db");

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

module.exports = router;
