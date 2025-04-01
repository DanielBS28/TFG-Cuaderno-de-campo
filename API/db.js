const mysql = require("mysql2");

// Conexión a MySQL con createPool (mejor manejo de conexiones)
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root", // Cambia esto si tienes otra contraseña
    database: "cuaderno_de_campo",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Exportar la conexión para usarla en otros módulos
module.exports = db;
