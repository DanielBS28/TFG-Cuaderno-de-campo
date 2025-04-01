const express = require("express"); // require --> commonJS
const bodyParser = require("body-parser");
const cors = require("cors");

const subirJsonRouter = require("./routes/subir_json");
const agricultoresRouter = require("./routes/agricultores");

const app = express();
app.disable("x-powered-by"); // deshabilitar el header X-Powered-By: Express
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: "80mb" })); // Aumentar el límite de tamaño del cuerpo a 80mb
app.use(bodyParser.urlencoded({ extended: true, limit: "80mb" }));

// Ruta para subir JSON de productos y usos
app.use("/data", subirJsonRouter);

// Ruta para la alta de agricultores
app.use("/agricultores", agricultoresRouter);

// Ruta principal
app.get("/", (req, res) => {
    res.json({ message: "API de Cuaderno de Campo" });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
