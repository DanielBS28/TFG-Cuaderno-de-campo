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

module.exports = router;