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

// Obtener todos los tratamientos de una parcela
router.get("/parcela/:id", async (req, res) => {
  const idParcela = req.params.id;

  try {
    const [rows] = await db
      .promise()
      .query(
        `SELECT * FROM equipo INNER JOIN 
        (SELECT * FROM tratamiento INNER JOIN 
        (SELECT idProducto,Nombre AS Nombre_producto FROM producto)p 
        ON p.idProducto = tratamiento.Producto_idProducto)t 
        ON t.Equipo_Numero_ROMA = equipo.Numero_ROMA 
        WHERE parcela_Numero_identificacion = ?`,
        [idParcela]
      );

      res.json(rows);
  } catch (error) {
    console.error("Error al obtener tratamientos de la parcela:", error);
    res.status(500).json({ error: "Error al obtener parcelas" });
  }
});

// Eliminar tratamiento por ID
router.delete("/eliminar/:idTratamiento", (req, res) => {
  const { idTratamiento } = req.params;

  const sql = "DELETE FROM tratamiento WHERE idTratamiento = ?";
  db.query(sql, [idTratamiento], (err, result) => {
    if (err) {
      console.error("Error al eliminar tratamiento:", err);
      return res.status(500).json({ error: "Error al eliminar tratamiento" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Tratamiento no encontrado" });
    }

    res.json({ mensaje: "Tratamiento eliminado correctamente" });
  });
});

// Obtener la fecha del tratamiento más reciente para una parcela y producto
router.get("/fecha-mas-reciente/:idParcela/:idProducto", async (req, res) => {
  const { idParcela, idProducto } = req.params;

  try {
    const [rows] = await db
      .promise()
      .query(
        `SELECT Fecha_tratamiento 
         FROM tratamiento 
         WHERE parcela_Numero_identificacion = ? 
           AND Producto_idProducto = ? 
         ORDER BY Fecha_tratamiento DESC 
         LIMIT 1`,
        [idParcela, idProducto]
      );

    if (rows.length === 0) {
      return res.json({ Fecha_tratamiento: null });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error("Error al obtener la fecha más reciente:", error);
    res.status(500).json({ error: "Error al obtener la fecha más reciente" });
  }
});

module.exports = router;
