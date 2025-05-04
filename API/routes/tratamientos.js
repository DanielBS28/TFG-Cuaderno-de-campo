const express = require("express");
const router = express.Router();
const db = require("../src/db");

// Crear un nuevo tratamiento
router.post("/realizar", (req, res) => {
    const {
      Equipo_Numero_ROMA,
      Producto_idProducto,
      parcela_Numero_identificacion,
      Plaga_controlar,
      Fecha_tratamiento,
      Tipo_Cultivo,
      Num_registro_producto,
      Superficie_cultivo,
      Superficie_tratada_ha,
      Cantidad_producto_aplicada,
      Unidad_medida_dosis,
      Numero_carnet_aplicador,
    } = req.body;
  
    const sql = `
      INSERT INTO tratamiento (
        Equipo_Numero_ROMA,
        Producto_idProducto,
        parcela_Numero_identificacion,
        Plaga_controlar,
        Fecha_tratamiento,
        Tipo_Cultivo,
        Num_registro_producto,
        Superficie_cultivo,
        Superficie_tratada_ha,
        Cantidad_producto_aplicada,
        Unidad_medida_dosis,
        Numero_carnet_aplicador
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
  
    const values = [
      Equipo_Numero_ROMA,
      Producto_idProducto,
      parcela_Numero_identificacion,
      Plaga_controlar,
      Fecha_tratamiento,
      Tipo_Cultivo,
      Num_registro_producto,
      Superficie_cultivo,
      Superficie_tratada_ha,
      Cantidad_producto_aplicada,
      Unidad_medida_dosis,
      Numero_carnet_aplicador,
    ];
  
    db.query(sql, values, (err, results) => {
      if (err) {
        console.error("Error al insertar tratamiento:", err);
        return res.status(500).json({ error: "Error al insertar tratamiento" });
      }
      res.status(201).json({
        mensaje: "Tratamiento registrado correctamente",
        idTratamiento: results.insertId,
      });
    });
  });

module.exports = router;
