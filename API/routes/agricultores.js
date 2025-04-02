const express = require("express");
const router = express.Router();
const db = require("../db");
const bcrypt = require("bcrypt");

// Alta de agricultor
router.post("/alta", async (req, res) => {
    const { nombre, apellido1, apellido2, dni, contrasena, carnet } = req.body;

    if (!nombre || !apellido1 || !dni || !contrasena || !carnet) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    const conn = await db.promise().getConnection();
    await conn.beginTransaction();

    try {
        // Verificar si el DNI ya existe
        const [usuarioExistente] = await conn.query(
            "SELECT DNI FROM Usuario WHERE DNI = ?", [dni]
        );
        if (usuarioExistente.length > 0) {
            await conn.rollback();
            return res.status(409).json({ error: "El DNI ya está registrado." });
        }

        // Verificar si el número de carnet ya existe
        const [carnetExistente] = await conn.query(
            "SELECT Numero_carnet FROM Agricultor WHERE Numero_carnet = ?", [carnet]
        );
        if (carnetExistente.length > 0) {
            await conn.rollback();
            return res.status(409).json({ error: "El número de carnet ya está en uso." });
        }

        const hash = await bcrypt.hash(contrasena, 10);

        await conn.query(`
            INSERT INTO Usuario (DNI, Nombre, Apellido1, Apellido2, Password, Rol)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [dni, nombre, apellido1, apellido2, hash, "Agricultor"]
        );

        await conn.query(`
            INSERT INTO Agricultor (Usuario_DNI, Numero_carnet, Ingeniero_Usuario_DNI)
            VALUES (?, ?, ?)`,
            [dni, carnet, "12345678A"] // ingeniero por defecto
        );

        await conn.commit();
        res.status(200).json({ message: "Agricultor registrado correctamente" });
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

// Eliminar agricultor por DNI
router.delete("/eliminar/:dni", (req, res) => {
    const dni = req.params.dni;

    const deleteAgricultor = "DELETE FROM Agricultor WHERE Usuario_DNI = ?";
    const deleteUsuario = "DELETE FROM Usuario WHERE DNI = ?";

    db.query(deleteAgricultor, [dni], (err1) => {
        if (err1) return res.status(500).json({ error: "Error al eliminar agricultor" });

        db.query(deleteUsuario, [dni], (err2) => {
            if (err2) return res.status(500).json({ error: "Error al eliminar usuario" });

            res.json({ mensaje: "Agricultor eliminado correctamente" });
        });
    });
});

module.exports = router;