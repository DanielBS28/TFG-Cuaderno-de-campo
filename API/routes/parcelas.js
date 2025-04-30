const express = require("express");
const router = express.Router();
const db = require("../src/db");

// Dar de alta una parcela
router.post("/crear", async (req, res) => {
  const {
    id,
    nombre,
    codigoProvincia,
    codigoMunicipio,
    nombreMunicipio,
    numPoligono,
    numParcela,
    superficieSIGPAC,
    tipoRegadio,
    tipoCultivo,
    idExplotacion,
  } = req.body;

  try {
    await db.promise().query(
      `INSERT INTO Parcela 
          (Numero_identificacion, Nombre_parcela, Provincia, Codigo_municipio, Municipio, Poligono, Parcela, Superficie_ha, Tipo_R_S, Tipo_cultivo, Explotacion_idExplotacion)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`,
      [
        id,
        nombre,
        codigoProvincia,
        codigoMunicipio,
        nombreMunicipio,
        numPoligono,
        numParcela,
        superficieSIGPAC,
        tipoRegadio,
        tipoCultivo,
        idExplotacion,
      ]
    );

    res.json({ message: "Parcela creada correctamente" });
  } catch (error) {
    console.error("Error al crear parcela:", error);
    res.status(500).json({ error: "No se pudo crear la parcela" });
  }
});

// Eliminar una parcela por su ID
router.delete("/eliminar/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await db
      .promise()
      .query(`DELETE FROM Parcela WHERE Numero_identificacion = ?`, [id]);
    res.json({ message: "Parcela eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar parcela:", error);
    res.status(500).json({ error: "No se pudo eliminar la parcela" });
  }
});

// Obtener todas las parcelas de una explotación
router.get("/explotacion/:id", async (req, res) => {
  const idExplotacion = req.params.id;

  try {
    const [rows] = await db.promise().query(
      `SELECT 
        Numero_identificacion AS idParcela,
        Ref_Catastral,
        Nombre_parcela AS Nombre,
        Provincia AS Codigo_Provincia,
        Codigo_municipio AS Codigo_Municipio,
        Municipio AS Nombre_Municipio,
        Agregado,
        Zona,
        Poligono,
        Parcela,
        Superficie_ha AS Superficie_SIGPAC,
        Superficie_declarada
      FROM Parcela
      WHERE Explotacion_idExplotacion = ?`,
      [idExplotacion]
    );

    res.json(rows);
  } catch (error) {
    console.error("Error al obtener parcelas de la explotación:", error);
    res.status(500).json({ error: "Error al obtener parcelas" });
  }
});

// Crear parcela y sus recintos
router.post("/crear-con-recintos", async (req, res) => {
  const {
    id,
    nombre,
    codigoProvincia,
    codigoMunicipio,
    nombreMunicipio,
    agregado,
    zona,
    numPoligono,
    numParcela,
    superficieDeclarada,
    referenciaCatastral,
    idExplotacion,
    recintos,
  } = req.body;

  const conn = await db.promise().getConnection();
  try {
    await conn.beginTransaction();

    const [parcelaExiste] = await conn.query(
      "SELECT 1 FROM Parcela WHERE Numero_identificacion = ?",
      [id]
    );
    if (parcelaExiste.length > 0) {
      await conn.rollback();
      return res
        .status(400)
        .json({ error: "Ya existe una parcela con ese ID." });
    }

    for (const recinto of recintos) {
      const [existe] = await conn.query(
        "SELECT 1 FROM Recinto WHERE idRecinto = ?",
        [recinto.idRecinto]
      );
      if (existe.length > 0) {
        await conn.rollback();
        return res
          .status(400)
          .json({ error: `Ya existe un recinto con ID ${recinto.idRecinto}.` });
      }
    }

    // Insertar parcela
    await conn.query(
      `INSERT INTO Parcela (
        Numero_identificacion,
        Explotacion_idExplotacion,
        Provincia,
        Codigo_municipio,
        Municipio,
        Agregado,
        Zona,
        Poligono,
        Parcela,
        Superficie_declarada,
        Nombre_parcela,
        Ref_Catastral
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        idExplotacion,
        codigoProvincia,
        codigoMunicipio,
        nombreMunicipio,
        agregado,
        zona,
        numPoligono,
        numParcela,
        superficieDeclarada,
        nombre,
        referenciaCatastral,
      ]
    );

    // Insertar recintos
    for (const recinto of recintos) {
      await conn.query(
        `INSERT INTO Recinto (
          idRecinto,
          parcela_Numero_identificacion,
          Numero,
          Uso_SIGPAC,
          Descripcion_uso,
          Superficie_ha
        ) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          recinto.idRecinto,
          recinto.parcela_Numero_identificacion,
          recinto.Numero,
          recinto.Uso_SIGPAC,
          recinto.Descripcion_uso,
          recinto.Superficie_ha,
        ]
      );
    }

    await conn.commit();
    res.json({ message: "Parcela y recintos creados correctamente" });
  } catch (error) {
    await conn.rollback();
    console.error("Error al crear parcela con recintos:", error);
    res
      .status(500)
      .json({ error: "No se pudo crear la parcela con sus recintos" });
  } finally {
    conn.release();
  }
});

// Obtener número de recintos totales de una parcela
router.get("/recintos/:idParcela", async (req, res) => {
  const id = req.params.idParcela;

  try {
      const [rows] = await db.promise().query(
          "SELECT COUNT(*) as total FROM Recinto WHERE parcela_Numero_identificacion = ?",
          [id]
      );

      res.json({ total: rows[0].total });
  } catch (error) {
      console.error("Error al obtener recintos:", error);
      res.status(500).json({ error: "Error al contar recintos" });
  }
});

// Obtener número de tratamientos totales de una parcela
router.get("/tratamientos/:idParcela", async (req, res) => {
  const id = req.params.idParcela;

  try {
      const [rows] = await db.promise().query(
          "SELECT COUNT(*) as total FROM Tratamiento WHERE parcela_Numero_identificacion = ?",
          [id]
      );

      res.json({ total: rows[0].total });
  } catch (error) {
      console.error("Error al obtener tratamientos:", error);
      res.status(500).json({ error: "Error al contar tratamientos" });
  }
});

// Actualizar nombre y superficie declarada de una parcela
router.put("/editar/:id", async (req, res) => {
  const idParcela = req.params.id;
  const { nombre, superficieDeclarada } = req.body;

  console.log("ID Parcela:", idParcela);
  console.log("Nombre:", nombre);
  console.log("Superficie Declarada:", superficieDeclarada);

  if (!nombre || !superficieDeclarada) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  try {
    const [result] = await db
      .promise()
      .query(
        `UPDATE Parcela 
         SET Nombre_parcela = ?, Superficie_declarada = ?
         WHERE Numero_identificacion = ?`,
        [nombre, superficieDeclarada, idParcela]
      );

    res.json({ message: "Parcela actualizada correctamente" });
  } catch (error) {
    console.error("Error al actualizar parcela:", error);
    res.status(500).json({ error: "Error al actualizar la parcela" });
  }
});

router.get("/cultivos/:idParcela", async (req, res) => {
  const { idParcela } = req.params;
  try {
    const [rows] = await db.promise().query(`
      SELECT 
        Tipo_Cultivo,
        SUM(Superficie_ha) AS Superficie_ha
      FROM recinto
      WHERE parcela_Numero_identificacion = ?
        AND Tipo_Cultivo IS NOT NULL
      GROUP BY Tipo_Cultivo
    `, [idParcela]);

    res.json(rows);
  } catch (error) {
    console.error("Error al obtener cultivos de la parcela:", error);
    res.status(500).json({ error: "Error al obtener cultivos" });
  }
});


module.exports = router;
