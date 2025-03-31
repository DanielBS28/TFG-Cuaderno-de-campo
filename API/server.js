const express = require("express"); // require --> commonJS
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.disable("x-powered-by"); // deshabilitar el header X-Powered-By: Express
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "80mb" })); // Aumentar el límite de tamaño del cuerpo a 80mb
app.use(bodyParser.urlencoded({ extended: true, limit: "80mb" }));

// Conexión a MySQL con createPool (mejor manejo de conexiones)
const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "cfgs", // Cambia esto si tienes otra contraseña
    database: "cuaderno_de_campo",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Ruta principal
app.get("/", (req, res) => {
    res.json({ message: "API de Cuaderno de Campo" });
});

// Ruta para subir productos y usos
app.post("/subir-json", async (req, res) => {
    const productos = req.body.Productos;

    console.log("AAA");

    if (!productos || !Array.isArray(productos)) {
        return res.status(400).json({ error: "El JSON debe contener un array bajo la propiedad 'Productos'." });
    }
    console.log("BBB");

    const conn = await db.promise().getConnection();
    await conn.beginTransaction();

    try {
        for (const producto of productos) {
            const {
                IdProducto, Nombre, Formulado, Titular, Fabricante,
                Fecha_Registro, Estado, Fecha_Caducidad,
                Fecha_Cancelacion, Fecha_LimiteVenta, Num_Registro, Usos
            } = producto;

            // Insertar producto
            await conn.query(
                `INSERT INTO Producto (idProducto, Nombre, Formulado, Fecha_registro, Num_registro, Fecha_limite_venta, Fecha_caducidad, Fecha_cancelacion, Fabricante, Estado, Titular)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                 ON DUPLICATE KEY UPDATE Nombre=VALUES(Nombre)`,
                [IdProducto, Nombre, Formulado, Fecha_Registro || null, Num_Registro, Fecha_LimiteVenta || null, Fecha_Caducidad || null, Fecha_Cancelacion || null, Fabricante, Estado, Titular]
            );

            for (const uso of Usos) {
                const {
                    CodigoCultivo, Cultivo, CodigoAgente, Agente,
                    Dosis_Min, Dosis_Max, UnidadMedidaDosis, PlazoSeguridad,
                    VolumenCaldo, Aplicaciones, IntervaloAplicaciones,
                    CondicionamientoEspecifico, MetodoAplicacion,
                    Volumen_Min, VolumenMax, UnidadesVolumen
                } = uso;

                // Insertar usos
                await conn.query(
                    `INSERT INTO Usos (Producto_idProducto, Cultivo, CodigoCultivo, CodigoAgente, Agente, Dosis_min, Dosis_max, Unidad_medida_dosis, Plazo_Seguridad, Volumen_caldo, Aplicaciones, Intervalo_aplicaciones, Condicionamiento_especifico, Metodo_aplicacion, Volumen_min, Volumen_max, Unidades_volumen)
                     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                    [IdProducto, Cultivo, CodigoCultivo, CodigoAgente, Agente, Dosis_Min, Dosis_Max, UnidadMedidaDosis, PlazoSeguridad, VolumenCaldo, Aplicaciones, IntervaloAplicaciones, CondicionamientoEspecifico, MetodoAplicacion, Volumen_Min, VolumenMax, UnidadesVolumen]
                );                
            }
        }

        await conn.commit();
        res.json({ message: "Productos y usos insertados correctamente" });
    } catch (error) {
        await conn.rollback();
        console.error("Error al insertar:", error);
        return res.status(500).json({ error: "Error al insertar en la base de datos", detalle: error });
    } finally {
        conn.release(); // Liberar la conexión de la piscina
    }
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
