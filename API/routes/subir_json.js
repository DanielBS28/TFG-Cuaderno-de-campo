const express = require("express");
const router = express.Router();
const db = require("../src/db");

// Ruta para subir productos y usos
router.post("/", async (req, res) => {
  const productos = req.body.Productos;

  if (!productos || !Array.isArray(productos)) {
    return res
      .status(400)
      .json({
        error: "El JSON debe contener un array bajo la propiedad 'Productos'.",
      });
  }

  const conn = await db.promise().getConnection();
  await conn.beginTransaction();

  try {
    for (const producto of productos) {
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

      // Insertar producto
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
                    Titular=VALUES(Titular)
                    `,
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

        // Insertar usos
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
    res.json({ message: "Productos y usos insertados correctamente" });
  } catch (error) {
    await conn.rollback();
    console.error("Error al insertar:", error);
    return res
      .status(500)
      .json({ error: "Error al insertar en la base de datos", detalle: error });
  } finally {
    conn.release(); // Liberar la conexión de la piscina
  }
});

module.exports = router;
