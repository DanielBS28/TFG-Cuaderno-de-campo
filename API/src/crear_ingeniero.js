const bcrypt = require("bcrypt");
const db = require("./db");

async function crearIngeniero() {
    const dni = "12345678A";
    const nombre = "Ingeniero";
    const apellido1 = "Principal";
    const apellido2 = "CUE";
    const contrasena = "admin123";
    const rol = "Admin";

    try {
        const hash = await bcrypt.hash(contrasena, 10);

        // Insertar en Usuario
        await db.promise().query(
            `INSERT INTO Usuario (DNI, Nombre, Apellido1, Apellido2, Password, Rol)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [dni, nombre, apellido1, apellido2, hash, rol]
        );

        // Insertar en Ingeniero
        await db.promise().query(
            `INSERT INTO Ingeniero (Usuario_DNI) VALUES (?)`,
            [dni]
        );

        console.log("Ingeniero creado correctamente.");
    } catch (err) {
        console.error("Error al crear el ingeniero:", err);
    } finally {
        process.exit();
    }
}

crearIngeniero();