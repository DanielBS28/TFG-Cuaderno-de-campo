-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema cuaderno_de_campo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cuaderno_de_campo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cuaderno_de_campo` DEFAULT CHARACTER SET utf8mb3 ;
USE `cuaderno_de_campo` ;

-- -----------------------------------------------------
-- Table `cuaderno_de_campo`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cuaderno_de_campo`.`usuario` (
  `DNI` VARCHAR(9) NOT NULL,
  `Nombre` VARCHAR(30) NULL DEFAULT NULL,
  `Apellido1` VARCHAR(30) NULL DEFAULT NULL,
  `Apellido2` VARCHAR(30) NULL DEFAULT NULL,
  `Rol` ENUM('Admin', 'Agricultor') NULL DEFAULT NULL,
  `Password` VARCHAR(60) NULL DEFAULT NULL,
  PRIMARY KEY (`DNI`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cuaderno_de_campo`.`ingeniero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cuaderno_de_campo`.`ingeniero` (
  `Usuario_DNI` VARCHAR(9) NOT NULL,
  PRIMARY KEY (`Usuario_DNI`),
  INDEX `fk_Ingeniero_Usuario1_idx` (`Usuario_DNI` ASC) VISIBLE,
  CONSTRAINT `fk_Ingeniero_Usuario1`
    FOREIGN KEY (`Usuario_DNI`)
    REFERENCES `cuaderno_de_campo`.`usuario` (`DNI`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cuaderno_de_campo`.`agricultor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cuaderno_de_campo`.`agricultor` (
  `Usuario_DNI` VARCHAR(9) NOT NULL,
  `Numero_carnet` VARCHAR(45) NOT NULL,
  `Ingeniero_Usuario_DNI` VARCHAR(9) NULL DEFAULT NULL,
  PRIMARY KEY (`Usuario_DNI`),
  UNIQUE INDEX `Numero_carnet_UNIQUE` (`Numero_carnet` ASC) VISIBLE,
  INDEX `fk_Agricultor_Usuario1_idx` (`Usuario_DNI` ASC) VISIBLE,
  INDEX `fk_Agricultor_Ingeniero1_idx` (`Ingeniero_Usuario_DNI` ASC) VISIBLE,
  CONSTRAINT `fk_Agricultor_Ingeniero1`
    FOREIGN KEY (`Ingeniero_Usuario_DNI`)
    REFERENCES `cuaderno_de_campo`.`ingeniero` (`Usuario_DNI`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Agricultor_Usuario1`
    FOREIGN KEY (`Usuario_DNI`)
    REFERENCES `cuaderno_de_campo`.`usuario` (`DNI`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cuaderno_de_campo`.`asesor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cuaderno_de_campo`.`asesor` (
  `N_Carnet_asesor` VARCHAR(50) NOT NULL,
  `DNI` VARCHAR(9) NOT NULL,
  `Nombre` VARCHAR(30) NULL DEFAULT NULL,
  `Apellido1` VARCHAR(30) NULL DEFAULT NULL,
  `Apellido2` VARCHAR(30) NULL DEFAULT NULL,
  PRIMARY KEY (`DNI`),
  UNIQUE INDEX `N_Carnet_asesor_UNIQUE` (`N_Carnet_asesor` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cuaderno_de_campo`.`asesor_has_agricultor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cuaderno_de_campo`.`asesor_has_agricultor` (
  `Asesor_DNI` VARCHAR(9) NOT NULL,
  `Agricultor_Usuario_DNI` VARCHAR(9) NOT NULL,
  PRIMARY KEY (`Asesor_DNI`, `Agricultor_Usuario_DNI`),
  INDEX `fk_Asesor_has_Agricultor_Agricultor1_idx` (`Agricultor_Usuario_DNI` ASC) VISIBLE,
  INDEX `fk_Asesor_has_Agricultor_Asesor1_idx` (`Asesor_DNI` ASC) VISIBLE,
  CONSTRAINT `fk_Asesor_has_Agricultor_Agricultor1`
    FOREIGN KEY (`Agricultor_Usuario_DNI`)
    REFERENCES `cuaderno_de_campo`.`agricultor` (`Usuario_DNI`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Asesor_has_Agricultor_Asesor1`
    FOREIGN KEY (`Asesor_DNI`)
    REFERENCES `cuaderno_de_campo`.`asesor` (`DNI`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cuaderno_de_campo`.`equipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cuaderno_de_campo`.`equipo` (
  `Numero_ROMA` VARCHAR(30) NOT NULL,
  `Nombre` VARCHAR(45) NULL DEFAULT NULL,
  `Fecha_adquisicion` DATE NULL DEFAULT NULL,
  `Fecha_ultima_revision` DATE NULL DEFAULT NULL,
  PRIMARY KEY (`Numero_ROMA`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cuaderno_de_campo`.`explotacion`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cuaderno_de_campo`.`explotacion` (
  `idExplotacion` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Agricultor_Usuario_DNI1` VARCHAR(9) NOT NULL,
  `Superficie_total` DECIMAL(11,4) NULL DEFAULT NULL,
  `Nombre` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`idExplotacion`),
  INDEX `fk_Explotacion_Agricultor1_idx` (`Agricultor_Usuario_DNI1` ASC) VISIBLE,
  CONSTRAINT `fk_Explotacion_Agricultor1`
    FOREIGN KEY (`Agricultor_Usuario_DNI1`)
    REFERENCES `cuaderno_de_campo`.`agricultor` (`Usuario_DNI`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
AUTO_INCREMENT = 3
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cuaderno_de_campo`.`explotacion_has_equipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cuaderno_de_campo`.`explotacion_has_equipo` (
  `explotacion_idExplotacion` INT UNSIGNED NOT NULL,
  `equipo_Numero_ROMA` VARCHAR(30) NOT NULL,
  PRIMARY KEY (`explotacion_idExplotacion`, `equipo_Numero_ROMA`),
  INDEX `fk_explotacion_has_equipo_equipo1_idx` (`equipo_Numero_ROMA` ASC) VISIBLE,
  INDEX `fk_explotacion_has_equipo_explotacion1_idx` (`explotacion_idExplotacion` ASC) VISIBLE,
  CONSTRAINT `fk_explotacion_has_equipo_equipo1`
    FOREIGN KEY (`equipo_Numero_ROMA`)
    REFERENCES `cuaderno_de_campo`.`equipo` (`Numero_ROMA`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_explotacion_has_equipo_explotacion1`
    FOREIGN KEY (`explotacion_idExplotacion`)
    REFERENCES `cuaderno_de_campo`.`explotacion` (`idExplotacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cuaderno_de_campo`.`parcela`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cuaderno_de_campo`.`parcela` (
  `Numero_identificacion` VARCHAR(30) NOT NULL,
  `Explotacion_idExplotacion` INT UNSIGNED NOT NULL,
  `Provincia` VARCHAR(2) NULL DEFAULT NULL,
  `Codigo_municipio` VARCHAR(5) NULL DEFAULT NULL,
  `Municipio` VARCHAR(60) NULL DEFAULT NULL,
  `Agregado` VARCHAR(15) NULL DEFAULT NULL,
  `Zona` VARCHAR(15) NULL DEFAULT NULL,
  `Poligono` VARCHAR(10) NULL DEFAULT NULL,
  `Parcela` VARCHAR(10) NULL DEFAULT NULL,
  `Superficie_ha` DECIMAL(10,4) NULL DEFAULT NULL,
  `Superficie_declarada` DECIMAL(10,4) NULL DEFAULT NULL,
  `Nombre_parcela` VARCHAR(45) NULL DEFAULT NULL,
  `Ref_Catastral` VARCHAR(55) NULL DEFAULT NULL,
  PRIMARY KEY (`Numero_identificacion`),
  INDEX `fk_Parcela_Explotacion1_idx` (`Explotacion_idExplotacion` ASC) VISIBLE,
  CONSTRAINT `fk_Parcela_Explotacion1`
    FOREIGN KEY (`Explotacion_idExplotacion`)
    REFERENCES `cuaderno_de_campo`.`explotacion` (`idExplotacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cuaderno_de_campo`.`producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cuaderno_de_campo`.`producto` (
  `idProducto` INT NOT NULL,
  `Nombre` VARCHAR(60) NULL DEFAULT NULL,
  `Formulado` VARCHAR(300) NULL DEFAULT NULL,
  `Fecha_registro` DATE NULL DEFAULT NULL,
  `Num_registro` VARCHAR(20) NULL DEFAULT NULL,
  `Fecha_limite_venta` DATE NULL DEFAULT NULL,
  `Fecha_caducidad` DATE NULL DEFAULT NULL,
  `Fecha_cancelacion` DATE NULL DEFAULT NULL,
  `Fabricante` VARCHAR(64) NULL DEFAULT NULL,
  `Estado` VARCHAR(20) NULL DEFAULT NULL,
  `Titular` VARCHAR(80) NULL DEFAULT NULL,
  PRIMARY KEY (`idProducto`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cuaderno_de_campo`.`recinto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cuaderno_de_campo`.`recinto` (
  `idRecinto` VARCHAR(30) NOT NULL,
  `parcela_Numero_identificacion` VARCHAR(30) NOT NULL,
  `Numero` VARCHAR(15) NULL DEFAULT NULL,
  `Uso_SIGPAC` VARCHAR(7) NULL DEFAULT NULL,
  `Descripcion_uso` VARCHAR(45) NULL DEFAULT NULL,
  `Superficie_ha` DECIMAL(10,4) NULL DEFAULT NULL,
  `Tipo_Cultivo` VARCHAR(100) NULL DEFAULT NULL,
  `Tipo_regadio` ENUM('Regadío', 'Secano') NULL DEFAULT NULL,
  PRIMARY KEY (`idRecinto`),
  INDEX `fk_Recinto_parcela1_idx` (`parcela_Numero_identificacion` ASC) VISIBLE,
  CONSTRAINT `fk_Recinto_parcela1`
    FOREIGN KEY (`parcela_Numero_identificacion`)
    REFERENCES `cuaderno_de_campo`.`parcela` (`Numero_identificacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cuaderno_de_campo`.`tratamiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cuaderno_de_campo`.`tratamiento` (
  `idTratamiento` INT NOT NULL AUTO_INCREMENT,
  `Equipo_Numero_ROMA` VARCHAR(30) NOT NULL,
  `Producto_idProducto` INT NOT NULL,
  `parcela_Numero_identificacion` VARCHAR(30) NOT NULL,
  `Plaga_controlar` VARCHAR(120) NULL DEFAULT NULL,
  `Fecha_tratamiento` DATE NULL DEFAULT NULL,
  `Tipo_Cultivo` VARCHAR(100) NULL DEFAULT NULL,
  `Num_registro_producto` VARCHAR(20) NULL DEFAULT NULL,
  `Superficie_cultivo` DECIMAL(10,4) NULL,
  `Superficie_tratada_ha` DECIMAL(10,4) NULL DEFAULT NULL,
  `Cantidad_producto_aplicada` DOUBLE NULL DEFAULT NULL,
  `Unidad_medida_dosis` VARCHAR(60) NULL DEFAULT NULL,
  `Numero_carnet_aplicador` VARCHAR(50) NULL DEFAULT NULL,
  PRIMARY KEY (`idTratamiento`),
  INDEX `fk_Tratamiento_Equipo1_idx` (`Equipo_Numero_ROMA` ASC) VISIBLE,
  INDEX `fk_Tratamiento_Producto1_idx` (`Producto_idProducto` ASC) VISIBLE,
  INDEX `fk_tratamiento_parcela1_idx` (`parcela_Numero_identificacion` ASC) VISIBLE,
  CONSTRAINT `fk_Tratamiento_Equipo1`
    FOREIGN KEY (`Equipo_Numero_ROMA`)
    REFERENCES `cuaderno_de_campo`.`equipo` (`Numero_ROMA`)
    ON DELETE RESTRICT
    ON UPDATE CASCADE,
  CONSTRAINT `fk_tratamiento_parcela1`
    FOREIGN KEY (`parcela_Numero_identificacion`)
    REFERENCES `cuaderno_de_campo`.`parcela` (`Numero_identificacion`)
    ON DELETE CASCADE
    ON UPDATE CASCADE,
  CONSTRAINT `fk_Tratamiento_Producto1`
    FOREIGN KEY (`Producto_idProducto`)
    REFERENCES `cuaderno_de_campo`.`producto` (`idProducto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `cuaderno_de_campo`.`usos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `cuaderno_de_campo`.`usos` (
  `Producto_idProducto` INT NOT NULL,
  `Cultivo` VARCHAR(100) NULL DEFAULT NULL,
  `CodigoCultivo` VARCHAR(35) NOT NULL,
  `CodigoAgente` VARCHAR(25) NOT NULL,
  `Agente` VARCHAR(120) NULL DEFAULT NULL,
  `Dosis_min` DOUBLE NULL DEFAULT NULL,
  `Dosis_max` DOUBLE NULL DEFAULT NULL,
  `Unidad_medida_dosis` VARCHAR(60) NULL DEFAULT NULL,
  `Plazo_Seguridad` VARCHAR(70) NULL DEFAULT NULL,
  `Volumen_caldo` VARCHAR(300) NULL DEFAULT NULL,
  `Aplicaciones` VARCHAR(35) NULL DEFAULT NULL,
  `Intervalo_aplicaciones` VARCHAR(35) NULL DEFAULT NULL,
  `Condicionamiento_especifico` VARCHAR(2000) NULL DEFAULT NULL,
  `Metodo_aplicacion` VARCHAR(55) NULL DEFAULT NULL,
  `Volumen_min` DOUBLE NULL DEFAULT NULL,
  `Volumen_max` DOUBLE NULL DEFAULT NULL,
  `Unidades_volumen` VARCHAR(40) NULL DEFAULT NULL,
  PRIMARY KEY (`Producto_idProducto`, `CodigoCultivo`, `CodigoAgente`),
  INDEX `fk_Usos_Producto1_idx` (`Producto_idProducto` ASC) VISIBLE,
  CONSTRAINT `fk_Usos_Producto1`
    FOREIGN KEY (`Producto_idProducto`)
    REFERENCES `cuaderno_de_campo`.`producto` (`idProducto`)
    ON DELETE CASCADE
    ON UPDATE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;

DELIMITER //

CREATE TRIGGER actualizar_superficie_total_insert
AFTER INSERT ON Parcela
FOR EACH ROW
BEGIN
  UPDATE Explotacion
  SET Superficie_total = (
    SELECT IFNULL(SUM(Superficie_ha), 0)
    FROM Parcela
    WHERE Explotacion_idExplotacion = NEW.Explotacion_idExplotacion
  )
  WHERE idExplotacion = NEW.Explotacion_idExplotacion;
END//

CREATE TRIGGER actualizar_superficie_total_update
AFTER UPDATE ON Parcela
FOR EACH ROW
BEGIN
  UPDATE Explotacion
  SET Superficie_total = (
    SELECT IFNULL(SUM(Superficie_ha), 0)
    FROM Parcela
    WHERE Explotacion_idExplotacion = NEW.Explotacion_idExplotacion
  )
  WHERE idExplotacion = NEW.Explotacion_idExplotacion;
END//

CREATE TRIGGER actualizar_superficie_total_delete
AFTER DELETE ON Parcela
FOR EACH ROW
BEGIN
  UPDATE Explotacion
  SET Superficie_total = (
    SELECT IFNULL(SUM(Superficie_ha), 0)
    FROM Parcela
    WHERE Explotacion_idExplotacion = OLD.Explotacion_idExplotacion
  )
  WHERE idExplotacion = OLD.Explotacion_idExplotacion;
END//


CREATE TRIGGER actualizar_superficie_parcela_insert
AFTER INSERT ON Recinto
FOR EACH ROW
BEGIN
  -- Actualizar superficie de la parcela sumando todas las superficies de sus recintos
  UPDATE Parcela
  SET Superficie_ha = (
    SELECT IFNULL(SUM(Superficie_ha), 0)
    FROM Recinto
    WHERE parcela_Numero_identificacion = NEW.parcela_Numero_identificacion
  )
  WHERE Numero_identificacion = NEW.parcela_Numero_identificacion;
END//

CREATE TRIGGER actualizar_superficie_parcela_update
AFTER UPDATE ON Recinto
FOR EACH ROW
BEGIN
  -- Actualiza la superficie de la parcela solo si se cambió la superficie del recinto
  IF NEW.Superficie_ha <> OLD.Superficie_ha THEN
    UPDATE Parcela
    SET Superficie_ha = (
      SELECT IFNULL(SUM(Superficie_ha), 0)
      FROM Recinto
      WHERE parcela_Numero_identificacion = NEW.parcela_Numero_identificacion
    )
    WHERE Numero_identificacion = NEW.parcela_Numero_identificacion;
  END IF;
END//

CREATE TRIGGER actualizar_superficie_parcela_delete
AFTER DELETE ON Recinto
FOR EACH ROW
BEGIN
  UPDATE Parcela
  SET Superficie_ha = (
    SELECT IFNULL(SUM(Superficie_ha), 0)
    FROM Recinto
    WHERE parcela_Numero_identificacion = OLD.parcela_Numero_identificacion
  )
  WHERE Numero_identificacion = OLD.parcela_Numero_identificacion;
END//

DELIMITER ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
