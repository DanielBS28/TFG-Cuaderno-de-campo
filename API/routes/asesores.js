const express = require("express");
const router = express.Router();
const db = require("../db");

//Alta de asesor
router.post("/alta", async (req, res) => {
    const { nombre, apellido1, apellido2, dni, carnet } = req.body;

    if (!nombre || !apellido1 || !dni || !carnet) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const conn = await db.promise().getConnection();
    await conn.beginTransaction();

    try {
        // Verificar si el DNI ya existe
        const [usuarioExistente] = await conn.query(
            "SELECT DNI FROM Asesor WHERE DNI = ?", [dni]
        );
        if (usuarioExistente.length > 0) {
            await conn.rollback();
            return res.status(409).json({ error: "El DNI ya está registrado." });
        }

        // Verificar si el número de carnet ya existe
        const [carnetExistente] = await conn.query(
            "SELECT N_carnet_asesor FROM Asesor WHERE N_carnet_asesor = ?", [carnet]
        );
        if (carnetExistente.length > 0) {
            await conn.rollback();
            return res.status(409).json({ error: "El número de carnet ya está en uso." });
        }

        await conn.query(`
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

// Buscar asesor por DNI
router.get("/buscar/dni/:dni", (req, res) => {
    const dni = req.params.dni;

    const query = `
        SELECT DNI as dni, Nombre, Apellido1, Apellido2, N_carnet_asesor
        FROM Asesor
        WHERE DNI = ?
    `;

    db.query(query, [dni], (err, results) => {
        if (err) return res.status(500).json({ error: "Error en la búsqueda por DNI" });
        if (results.length === 0) return res.status(404).json({ error: "Asesor no encontrado" });
        res.json(results[0]);
    });
});

// Baja de asesor por DNI
router.delete("/eliminar/:dni", async (req, res) => {
    const dni = req.params.dni;

    try {
        const [result] = await db.promise().query(
            "DELETE FROM Asesor WHERE DNI = ?", [dni]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Asesor no encontrado" });
        }

        res.status(200).json({ message: "Asesor dado de baja correctamente" });
    } catch (error) {
        console.error("Error al eliminar asesor:", error);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

module.exports = router;