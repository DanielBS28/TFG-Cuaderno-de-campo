const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const config = require("./config");

const app = express();
app.disable("x-powered-by"); // deshabilitar el header X-Powered-By: Express

//CONFIGURACION
app.set("PORT", config.app.PORT);

//RUTAS
const subirJsonRouter = require("../routes/subir_json");
const agricultoresRouter = require("../routes/agricultores");
const asesoresRouter = require("../routes/asesores");
const explotacionesRouter = require("../routes/explotaciones");
const parcelasRouter = require("../routes/parcelas");
const recintosRouter = require("../routes/recintos");
const cultivosRouter = require("../routes/cultivos");
const equiposRouter = require("../routes/equipos");
const tratamientosRouter = require("../routes/tratamientos");
const informesRouter = require("../routes/informes");

// Middleware
app.use(
  cors({
    origin: ["http://127.0.0.1:5504", "http://localhost:5504"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(bodyParser.json({ limit: "80mb" })); // Aumentar el límite de tamaño del cuerpo a 80mb
app.use(bodyParser.urlencoded({ extended: true, limit: "80mb" }));

// Ruta para subir JSON de productos y usos
app.use("/data", subirJsonRouter);

// Ruta para funcionalidades agricultores
app.use("/agricultores", agricultoresRouter);

// Ruta para funcionalidades asesores
app.use("/asesores", asesoresRouter);

// Ruta para funcionalidades explotacines
app.use("/explotaciones", explotacionesRouter);

// Ruta para funcionalidades parcelas
app.use("/parcelas", parcelasRouter);

// Ruta para funcionalidades recintos
app.use("/recintos", recintosRouter);

// Ruta para funcionalidades cultivos
app.use("/cultivos", cultivosRouter);

// Ruta para funcionalidades equipos
app.use("/equipos", equiposRouter);

// Ruta para funcionalidades tratamientos
app.use("/tratamientos", tratamientosRouter);

// Ruta para funcinalidades informes
app.use("/informes", informesRouter);

// Ruta principal
app.get("/", (req, res) => {
  res.json({ message: "API de Cuaderno de Campo" });
});

module.exports = app;
