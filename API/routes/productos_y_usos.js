const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const db = require("../src/db");

let procesoEstado = "idle"; // Estado global del proceso

let browser;

// ### FUNCIÓN ### //
// Espera dinámica hasta que se detecte un archivo .json en la carpeta de descarga
const esperarArchivo = async (
  directorio,
  extension,
  timeout = 90000, // Tiempo límite
  intervalo = 1000
) => {
  let contador = 0;
  const tiempoInicio = Date.now();
  return new Promise((resolve, reject) => {
    const intervaloId = setInterval(() => {
      const archivos = fs.readdirSync(directorio);
      const archivoJson = archivos.find((f) => f.endsWith(extension));
      console.log(contador++);
      if (archivoJson) {
        console.log("Archivo detectado");
        clearInterval(intervaloId);
        resolve(archivoJson);
      } else if (Date.now() - tiempoInicio > timeout) {
        clearInterval(intervaloId);
        reject(
          new Error(
            "Timeout: no se descargó el archivo .json a tiempo. Revise su conexión a internet."
          )
        );
      }
    }, intervalo);
  });
};

// Ruta para consultar el estado del proceso
router.get("/estado_proceso", (req, res) => {
  res.json({ estado: procesoEstado });
});

// Ruta para automatizar descarga y actualizar base de datos
router.get("/automatizar_json", async (req, res) => {
  procesoEstado = "procesando";
  res.json({ message: "Proceso de actualización iniciado en segundo plano." });

  (async () => {
    const downloadPath = path.resolve(__dirname, "../../Data");

    try {
      fs.mkdirSync(downloadPath, { recursive: true });

      // Eliminar archivos anteriores en la carpeta
      const archivosExistentes = fs.readdirSync(downloadPath);
      for (const archivo of archivosExistentes) {
        fs.unlinkSync(path.join(downloadPath, archivo));
      }

      browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
      });

      const page = await browser.newPage();

      const client = await page.target().createCDPSession();
      await client.send("Page.setDownloadBehavior", {
        behavior: "allow",
        downloadPath,
      });

      await page.goto("https://servicio.mapa.gob.es/regfiweb", {
        waitUntil: "networkidle2",
      });

      await page.waitForSelector("#lnkResumenes a", { timeout: 15000 });
      await page.click("#lnkResumenes a"); // CLic en el apartado "Resúmenes"
      await new Promise((resolve) => setTimeout(resolve, 1000));

      await page.waitForSelector("#btnProductosAutorizadosJson", {
        timeout: 15000,
      });
      await page.click("#btnProductosAutorizadosJson"); // Clic en el botón que inicia la descarga del JSON

      await esperarArchivo(downloadPath, ".json"); // Esperar a que se descargue el archivo JSON
      await browser.close();

      const files = fs.readdirSync(downloadPath);
      const jsonFile = files.find((f) => f.endsWith(".json"));

      if (!jsonFile) {
        procesoEstado = "fallido";
        throw new Error("No se encontró ningún archivo .json descargado");
      }

      const filePath = path.join(downloadPath, jsonFile);
      const rawData = fs.readFileSync(filePath);
      const jsonData = JSON.parse(rawData);

      const jsonLimpio = {
        Productos: jsonData.Productos.map((itemProducto) => ({
          IdProducto: itemProducto.DATOSPRODUCTO.IdProducto,
          Num_Registro: itemProducto.DATOSPRODUCTO.Num_Registro,
          Nombre: itemProducto.DATOSPRODUCTO.Nombre,
          Formulado: itemProducto.DATOSPRODUCTO.Formulado,
          Titular: itemProducto.DATOSPRODUCTO.Titular,
          Fabricante: itemProducto.DATOSPRODUCTO.Fabricante,
          Fecha_Registro: itemProducto.DATOSPRODUCTO.Fecha_Registro,
          Estado: itemProducto.DATOSPRODUCTO.Estado,
          Fecha_Caducidad: itemProducto.DATOSPRODUCTO.Fecha_Caducidad,
          Fecha_Cancelacion: itemProducto.DATOSPRODUCTO.Fecha_Cancelacion,
          Fecha_limite_venta: itemProducto.DATOSPRODUCTO.Fecha_LimiteVenta,
          Usos: itemProducto.USOS.map((itemUso) => ({
            CodigoCultivo: itemUso.CodigoCultivo,
            Cultivo: itemUso.Cultivo,
            CodigoAgente: itemUso.CodigoAgente,
            Agente: itemUso.Agente,
            Dosis_Min: itemUso.Dosis_Min,
            Dosis_Max: itemUso.Dosis_Max,
            UnidadMedidaDosis: itemUso["Unidad Medida dosis"],
            PlazoSeguridad: itemUso["Plazo Seguridad"],
            VolumenCaldo: itemUso["Volumen Caldo"],
            Aplicaciones: itemUso.Aplicaciones,
            IntervaloAplicaciones: itemUso.IntervaloAplicaciones,
            CondicionamientoEspecifico: itemUso.CondicionamientoEspecifico,
            MetodoAplicacion: itemUso.MetodoAplicacion,
            Volumen_Min: itemUso.Volumen_Min,
            VolumenMax: itemUso.VolumenMax,
            UnidadesVolumen: itemUso["Unidades Volumen"],
          })),
        })),
      };

      const conn = await db.promise().getConnection();
      await conn.beginTransaction();

      try {
        for (const producto of jsonLimpio.Productos) {
          const {
            IdProducto,
            Nombre,
            Formulado,
            Titular,
            Fabricante,
            Fecha_Registro,
            Estado,
            Fecha_Caducidad,
            Fecha_Cancelacion,
            Fecha_limite_venta,
            Num_Registro,
            Usos,
          } = producto;

          await conn.query(
            `INSERT INTO Producto (idProducto, Nombre, Formulado, Fecha_registro, Num_registro, Fecha_limite_venta, Fecha_caducidad, Fecha_cancelacion, Fabricante, Estado, Titular)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
             ON DUPLICATE KEY UPDATE
                Nombre=VALUES(Nombre),
                Formulado=VALUES(Formulado),
                Fecha_registro=VALUES(Fecha_registro),
                Num_registro=VALUES(Num_registro),
                Fecha_limite_venta=VALUES(Fecha_limite_venta),
                Fecha_caducidad=VALUES(Fecha_caducidad),
                Fecha_cancelacion=VALUES(Fecha_cancelacion),
                Fabricante=VALUES(Fabricante),
                Estado=VALUES(Estado),
                Titular=VALUES(Titular)`,
            [
              IdProducto,
              Nombre,
              Formulado,
              Fecha_Registro || null,
              Num_Registro,
              Fecha_limite_venta || null,
              Fecha_Caducidad || null,
              Fecha_Cancelacion || null,
              Fabricante,
              Estado,
              Titular,
            ]
          );

          for (const uso of Usos) {
            const {
              CodigoCultivo,
              Cultivo,
              CodigoAgente,
              Agente,
              Dosis_Min,
              Dosis_Max,
              UnidadMedidaDosis,
              PlazoSeguridad,
              VolumenCaldo,
              Aplicaciones,
              IntervaloAplicaciones,
              CondicionamientoEspecifico,
              MetodoAplicacion,
              Volumen_Min,
              VolumenMax,
              UnidadesVolumen,
            } = uso;

            await conn.query(
              `INSERT INTO Usos (
                Producto_idProducto, Cultivo, CodigoCultivo, CodigoAgente, Agente, Dosis_min, Dosis_max, Unidad_medida_dosis,
                Plazo_Seguridad, Volumen_caldo, Aplicaciones, Intervalo_aplicaciones, Condicionamiento_especifico,
                Metodo_aplicacion, Volumen_min, Volumen_max, Unidades_volumen
              )
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
              ON DUPLICATE KEY UPDATE
                Cultivo = VALUES(Cultivo),
                Agente = VALUES(Agente),
                Dosis_min = VALUES(Dosis_min),
                Dosis_max = VALUES(Dosis_max),
                Unidad_medida_dosis = VALUES(Unidad_medida_dosis),
                Plazo_Seguridad = VALUES(Plazo_Seguridad),
                Volumen_caldo = VALUES(Volumen_caldo),
                Aplicaciones = VALUES(Aplicaciones),
                Intervalo_aplicaciones = VALUES(Intervalo_aplicaciones),
                Condicionamiento_especifico = VALUES(Condicionamiento_especifico),
                Metodo_aplicacion = VALUES(Metodo_aplicacion),
                Volumen_min = VALUES(Volumen_min),
                Volumen_max = VALUES(Volumen_max),
                Unidades_volumen = VALUES(Unidades_volumen)`,
              [
                IdProducto,
                Cultivo,
                CodigoCultivo,
                CodigoAgente,
                Agente,
                Dosis_Min,
                Dosis_Max,
                UnidadMedidaDosis,
                PlazoSeguridad,
                VolumenCaldo,
                Aplicaciones,
                IntervaloAplicaciones,
                CondicionamientoEspecifico,
                MetodoAplicacion,
                Volumen_Min,
                VolumenMax,
                UnidadesVolumen,
              ]
            );
          }
        }

        await conn.commit();
        procesoEstado = "completado";
      } catch (error) {
        await conn.rollback();
        procesoEstado = "fallido";
        console.error("Error al insertar:", error);
      } finally {
        conn.release();
      }
    } catch (err) {
      procesoEstado = "fallido";
      console.error("Error general:", err);
    } finally {
      if (browser) await browser.close();
    }
  })();
});

module.exports = router;
