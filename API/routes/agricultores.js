const express = require("express");
const router = express.Router();
const db = require("../src/db");
const bcrypt = require("bcrypt");

// Alta de agricultor
router.post("/alta", async (req, res) => {
    const { nombre, apellido1, apellido2, dni, contrasena, carnet } = req.body;

    if (!nombre.trim() || !apellido1.trim() || !dni.trim() || !contrasena.trim() || !carnet.trim()) {
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

// Obtener todos los agricultores
router.get("/todos", async (req, res) => {
    try {
        const [rows] = await db.promise().query(`
            SELECT u.DNI, u.Nombre, u.Apellido1, u.Apellido2
            FROM Usuario u
            INNER JOIN Agricultor a ON u.DNI = a.Usuario_DNI
        `);

        res.json(rows);
    } catch (error) {
        console.error("Error al obtener todos los agricultores:", error);
        res.status(500).json({ error: "Error del servidor al obtener agricultores." });
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

// Asignar asesor a agricultor
router.post("/asignar", async (req, res) => {
    const { dniAgricultor, dniAsesor } = req.body;

    if (!dniAgricultor || !dniAsesor) {
        return res.status(400).json({ error: "Faltan DNI del agricultor o del asesor." });
    }

    const conn = await db.promise().getConnection();
    await conn.beginTransaction();

    try {
        // Verificar que existan
        const [[agricultor]] = await conn.query(
            "SELECT * FROM Agricultor WHERE Usuario_DNI = ?", [dniAgricultor]
        );
        const [[asesor]] = await conn.query(
            "SELECT * FROM Asesor WHERE DNI = ?", [dniAsesor]
        );

        if (!agricultor) {
            await conn.rollback();
            return res.status(404).json({ error: "Agricultor no encontrado" });
        }
        if (!asesor) {
            await conn.rollback();
            return res.status(404).json({ error: "Asesor no encontrado" });
        }

        // Insertar en la tabla intermedia
        await conn.query(
            `INSERT INTO Asesor_has_Agricultor (Asesor_DNI, Agricultor_Usuario_DNI)
             VALUES (?, ?)`, [dniAsesor, dniAgricultor]
        );

        await conn.commit();
        res.status(200).json({ message: "Asignación realizada con éxito" });
    } catch (err) {
        await conn.rollback();

        if (err.code === 'ER_DUP_ENTRY') {
            return res.status(409).json({ error: "Esta asignación ya existe." });
        }

        console.error("Error al asignar asesor:", err);
        res.status(500).json({ error: "Error al asignar asesor" });
    } finally {
        conn.release();
    }
});

// Actualizar agricultor
router.put("/actualizar/:dni", async (req, res) => {
    const dni = req.params.dni;
    const { nombre, apellido1, apellido2, carnet, contrasena } = req.body;

    if (!nombre || !apellido1 || !apellido2 || !carnet) {
        return res.status(400).json({ error: "Faltan campos obligatorios." });
    }

    const conn = await db.promise().getConnection();
    await conn.beginTransaction();

    try {
        // Verificar existencia
        const [[usuario]] = await conn.query(
            "SELECT * FROM Usuario WHERE DNI = ?", [dni]
        );
        if (!usuario) {
            await conn.rollback();
            return res.status(404).json({ error: "Agricultor no encontrado." });
        }

        // Verificar duplicado de carnet
        const [repetido] = await conn.query(
            "SELECT * FROM Agricultor WHERE Numero_carnet = ? AND Usuario_DNI != ?",
            [carnet, dni]
        );
        if (repetido.length > 0) {
            await conn.rollback();
            return res.status(409).json({ error: "El número de carnet ya está en uso." });
        }

        // En caso de cambiar la contraseña
        if (contrasena && contrasena.trim()) {
            const hash = await bcrypt.hash(contrasena, 10);
            await conn.query(
                `UPDATE Usuario SET Nombre = ?, Apellido1 = ?, Apellido2 = ?, Password = ? WHERE DNI = ?`,
                [nombre, apellido1, apellido2, hash, dni]
            );
        } else {
            await conn.query(
                `UPDATE Usuario SET Nombre = ?, Apellido1 = ?, Apellido2 = ? WHERE DNI = ?`,
                [nombre, apellido1, apellido2, dni]
            );
        }

        // Actualizar carnet
        await conn.query(
            `UPDATE Agricultor SET Numero_carnet = ? WHERE Usuario_DNI = ?`,
            [carnet, dni]
        );

        await conn.commit();
        res.json({ message: "Datos actualizados correctamente." });
    } catch (err) {
        await conn.rollback();
        console.error("Error al actualizar agricultor:", err);
        res.status(500).json({ error: "Error del servidor al actualizar." });
    } finally {
        conn.release();
    }
});

// Obtener asesores asignados a un agricultor
router.get("/asesores/:dni", async (req, res) => {
    const dniAgricultor = req.params.dni;

    try {
        const [rows] = await db.promise().query(`
            SELECT DNI,Nombre,Apellido1,Apellido2 from Asesor_has_Agricultor 
            inner join(select * from Asesor)s  
            on Asesor_has_Agricultor.Asesor_DNI = s.DNI Where Agricultor_Usuario_DNI = ?;
        `, [dniAgricultor]);

        res.json(rows);
    } catch (error) {
        console.error("Error al obtener asesores asignados:", error);
        res.status(500).json({ error: "Error al obtener asesores asignados" });
    }
});

// Desasignar asesor de un agricultor
router.delete("/desasignar", async (req, res) => {
    const { dniAgricultor, dniAsesor } = req.body;

    if (!dniAgricultor || !dniAsesor) {
        return res.status(400).json({ error: "Faltan DNI del asesor o del agricultor" });
    }

    try {
        const [result] = await db.promise().query(
            `DELETE FROM Asesor_has_Agricultor WHERE Asesor_DNI = ? AND Agricultor_Usuario_DNI = ?`,
            [dniAsesor, dniAgricultor]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No se encontró la asignación a eliminar." });
        }

        res.status(200).json({ message: "Asesor desasignado correctamente." });
    } catch (error) {
        console.error("Error al desasignar asesor:", error);
        res.status(500).json({ error: "Error del servidor al desasignar." });
    }
});

// Obtener explotaciones asignadas a un agricultor
router.get("/explotaciones/:dni", async (req, res) => {
    const dniAgricultor = req.params.dni;

    try {
        const [rows] = await db.promise().query(`
            select idExplotacion, Nombre, Superficie_total from Explotacion where Agricultor_Usuario_DNI1 =?;
        `, [dniAgricultor]);

        res.json(rows);
    } catch (error) {
        console.error("Error al obtener explotaciones asignadas:", error);
        res.status(500).json({ error: "Error al obtener explotaciones asignadas" });
    }
});

module.exports = router;