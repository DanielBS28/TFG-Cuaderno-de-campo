const express = require("express");
const router = express.Router();
const multer = require("multer");
const nodemailer = require("nodemailer");
const fs = require("fs");
const { email } = require("../src/config");

const upload = multer({ dest: "../Data" });

router.post("/enviar", upload.single("informe"), async (req, res) => {
    const { correo } = req.body;
    const archivo = req.file;
  
    if (!correo || !archivo) {
      return res.status(400).json({ error: "Correo o archivo faltante." });
    }
  
    try {
      const transporter = nodemailer.createTransport({
        host: email.HOST,
        port: email.PORT,
        secure: false,
        auth: {
          user: email.USER,
          pass: email.PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
  
      await transporter.sendMail({
        from: `"Cuaderno de Campo" <${email.USER}>`,
        to: correo,
        subject: "Informe de Tratamiento y Equipo",
        text: "Adjunto encontrará el informe generado.",
        attachments: [
          {
            filename: archivo.originalname,
            path: archivo.path,
          },
        ],
      });
  
      console.log("Correo enviado. Eliminando archivo temporal...");
      fs.unlink(archivo.path, (err) => {
        if (err) console.error("No se pudo borrar archivo:", err);
        else console.log("Archivo temporal borrado:", archivo.path);
      });
  
      res.send("OK");
    } catch (err) {
      console.error("Error al enviar el informe:", err);
      return res.status(500).json({ error: "Error al enviar el informe por correo." });
    }
  });

module.exports = router;
