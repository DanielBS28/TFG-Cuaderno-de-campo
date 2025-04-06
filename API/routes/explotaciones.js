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

// Buscar agricultor por DNI
router.get("/buscar/dni/:dni", (req, res) => {
    const dni = req.params.dni;

    const query = `
        SELECT a.Usuario_DNI as dni, u.Nombre, u.Apellido1, u.Apellido2, a.Numero_carnet as carnet
        FROM Agricultor a
        JOIN Usuario u ON a.Usuario_DNI = u.DNI
        WHERE a.Usuario_DNI = ?;
    `;

    db.query(query, [dni], (err, results) => {
        if (err) return res.status(500).json({ error: "Error en la búsqueda por DNI" });
        if (results.length === 0) return res.status(404).json({ error: "Agricultor no encontrado" });
        res.json(results[0]);
    });
});

// Buscar agricultor por Nº de carnet
router.get("/buscar/carnet/:carnet", (req, res) => {
    const carnet = req.params.carnet;

    const query = `
        SELECT a.Usuario_DNI as dni, u.Nombre, u.Apellido1, u.Apellido2, a.Numero_carnet as carnet
        FROM Agricultor a
        JOIN Usuario u ON a.Usuario_DNI = u.DNI
        WHERE a.Numero_carnet = ?;
    `;

    db.query(query, [carnet], (err, results) => {
        if (err) return res.status(500).json({ error: "Error en la búsqueda por carnet" });
        if (results.length === 0) return res.status(404).json({ error: "Agricultor no encontrado" });
        res.json(results[0]);
    });
});



module.exports = router;
