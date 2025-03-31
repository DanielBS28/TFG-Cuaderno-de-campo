-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Cuaderno_de_campo
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Cuaderno_de_campo
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Cuaderno_de_campo` DEFAULT CHARACTER SET utf8 ;
USE `Cuaderno_de_campo` ;

-- -----------------------------------------------------
-- Table `Cuaderno_de_campo`.`Usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Cuaderno_de_campo`.`Usuario` (
  `DNI` VARCHAR(9) NOT NULL,
  `Nombre` VARCHAR(30) NULL,
  `Apellido1` VARCHAR(30) NULL,
  `Apellido2` VARCHAR(30) NULL,
  `Rol` ENUM('Admin', 'Agricultor') NULL,
  `Contraseña` VARCHAR(20) NULL,
  PRIMARY KEY (`DNI`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Cuaderno_de_campo`.`Ingeniero`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Cuaderno_de_campo`.`Ingeniero` (
  `Usuario_DNI` VARCHAR(9) NOT NULL,
  PRIMARY KEY (`Usuario_DNI`),
  INDEX `fk_Ingeniero_Usuario1_idx` (`Usuario_DNI` ASC) VISIBLE,
  CONSTRAINT `fk_Ingeniero_Usuario1`
    FOREIGN KEY (`Usuario_DNI`)
    REFERENCES `Cuaderno_de_campo`.`Usuario` (`DNI`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Cuaderno_de_campo`.`Agricultor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Cuaderno_de_campo`.`Agricultor` (
  `Usuario_DNI` VARCHAR(9) NOT NULL,
  `Numero_carnet` VARCHAR(45) NOT NULL,
  `Ingeniero_Usuario_DNI` VARCHAR(9) NULL,
  PRIMARY KEY (`Usuario_DNI`),
  INDEX `fk_Agricultor_Usuario1_idx` (`Usuario_DNI` ASC) VISIBLE,
  INDEX `fk_Agricultor_Ingeniero1_idx` (`Ingeniero_Usuario_DNI` ASC) VISIBLE,
  CONSTRAINT `fk_Agricultor_Usuario1`
    FOREIGN KEY (`Usuario_DNI`)
    REFERENCES `Cuaderno_de_campo`.`Usuario` (`DNI`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Agricultor_Ingeniero1`
    FOREIGN KEY (`Ingeniero_Usuario_DNI`)
    REFERENCES `Cuaderno_de_campo`.`Ingeniero` (`Usuario_DNI`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Cuaderno_de_campo`.`Asesor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Cuaderno_de_campo`.`Asesor` (
  `N_Carnet_asesor` VARCHAR(50) NOT NULL,
  `DNI` VARCHAR(9) NOT NULL,
  `Nombre` VARCHAR(30) NULL,
  `Apellido1` VARCHAR(30) NULL,
  `Apellido2` VARCHAR(30) NULL,
  PRIMARY KEY (`DNI`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Cuaderno_de_campo`.`Explotación`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Cuaderno_de_campo`.`Explotación` (
  `idExplotación` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Superficie_total` DOUBLE(10,2) NULL,
  `Nombre` VARCHAR(50) NULL,
  `Agricultor_Usuario_DNI` VARCHAR(9) NOT NULL,
  PRIMARY KEY (`idExplotación`, `Agricultor_Usuario_DNI`),
  INDEX `fk_Explotación_Agricultor1_idx` (`Agricultor_Usuario_DNI` ASC) VISIBLE,
  CONSTRAINT `fk_Explotación_Agricultor1`
    FOREIGN KEY (`Agricultor_Usuario_DNI`)
    REFERENCES `Cuaderno_de_campo`.`Agricultor` (`Usuario_DNI`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Cuaderno_de_campo`.`Parcela`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Cuaderno_de_campo`.`Parcela` (
  `Número_identificación` INT NOT NULL,
  `Provincia` VARCHAR(2) NULL,
  `Municipio` VARCHAR(10) NULL,
  `Código_municipio` VARCHAR(5) NULL,
  `Polígono` VARCHAR(10) NULL,
  `Parcela` VARCHAR(10) NULL,
  `Tipo_R_S` ENUM('Regadío', 'Secano') NULL,
  `Tipo_cultivo` VARCHAR(100) NULL,
  `Superficie_ha` DOUBLE(10,5) NULL,
  `Nombre_parcela` VARCHAR(45) NULL,
  PRIMARY KEY (`Número_identificación`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Cuaderno_de_campo`.`Producto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Cuaderno_de_campo`.`Producto` (
  `idProducto` INT(5) NOT NULL,
  `Nombre` VARCHAR(60) NULL,
  `Formulado` VARCHAR(300) NULL,
  `Fecha_registro` DATE NULL,
  `Num_registro` VARCHAR(20) NULL,
  `Fecha_límite_venta` DATE NULL,
  `Fecha_caducidad` DATE NULL,
  `Fecha_cancelación` DATE NULL,
  `Fabricante` VARCHAR(64) NULL,
  `Estado` VARCHAR(20) NULL,
  `Titular` VARCHAR(80) NULL,
  PRIMARY KEY (`idProducto`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Cuaderno_de_campo`.`Usos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Cuaderno_de_campo`.`Usos` (
  `id_uso` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `Producto_idProducto` INT(7) NOT NULL,
  `Cultivo` VARCHAR(100) NULL,
  `CódigoCultivo` VARCHAR(35) NULL,
  `CodigoAgente` VARCHAR(25) NULL,
  `Agente` VARCHAR(120) NULL,
  `Dosis_min` FLOAT(10,4) NULL,
  `Dosis_max` FLOAT(10,4) NULL,
  `Unidad_medida_dosis` VARCHAR(60) NULL,
  `Plazo_Seguridad` VARCHAR(70) NULL,
  `Volumen_caldo` VARCHAR(300) NULL,
  `Aplicaciones` VARCHAR(35) NULL,
  `Intervalo_aplicaciones` VARCHAR(35) NULL,
  `Condicionamiento_específico` VARCHAR(2000) NULL,
  `Método_aplicación` VARCHAR(55) NULL,
  `Volumen_min` FLOAT(10,4) NULL,
  `Volumen_max` FLOAT(14,4) NULL,
  `Unidades_volumen` VARCHAR(40) NULL,
  PRIMARY KEY (`id_uso`, `Producto_idProducto`),
  INDEX `fk_Usos_Producto1_idx` (`Producto_idProducto` ASC) VISIBLE,
  CONSTRAINT `fk_Usos_Producto1`
    FOREIGN KEY (`Producto_idProducto`)
    REFERENCES `Cuaderno_de_campo`.`Producto` (`idProducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Cuaderno_de_campo`.`Equipo`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Cuaderno_de_campo`.`Equipo` (
  `Número_ROMA` VARCHAR(30) NOT NULL,
  `Nombre` VARCHAR(45) NULL,
  `Fecha_adquisición` DATE NULL,
  `Fecha_última_revisión` DATE NULL,
  PRIMARY KEY (`Número_ROMA`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Cuaderno_de_campo`.`Tratamiento`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Cuaderno_de_campo`.`Tratamiento` (
  `idTratamiento` INT NOT NULL AUTO_INCREMENT,
  `Plaga_controlar` VARCHAR(45) NULL,
  `Fecha_tratamiento` DATE NULL,
  `Equipo_Número_ROMA` VARCHAR(30) NOT NULL,
  `Producto_idProducto` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`idTratamiento`, `Equipo_Número_ROMA`, `Producto_idProducto`),
  INDEX `fk_Tratamiento_Equipo1_idx` (`Equipo_Número_ROMA` ASC) VISIBLE,
  INDEX `fk_Tratamiento_Producto1_idx` (`Producto_idProducto` ASC) VISIBLE,
  CONSTRAINT `fk_Tratamiento_Equipo1`
    FOREIGN KEY (`Equipo_Número_ROMA`)
    REFERENCES `Cuaderno_de_campo`.`Equipo` (`Número_ROMA`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Tratamiento_Producto1`
    FOREIGN KEY (`Producto_idProducto`)
    REFERENCES `Cuaderno_de_campo`.`Producto` (`idProducto`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Cuaderno_de_campo`.`Tratamiento_parcela`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Cuaderno_de_campo`.`Tratamiento_parcela` (
  `Parcela_Número_identificación` INT NOT NULL,
  `Tratamiento_idTratamiento` INT NOT NULL,
  PRIMARY KEY (`Parcela_Número_identificación`, `Tratamiento_idTratamiento`),
  INDEX `fk_Parcela_has_Tratamiento_Tratamiento1_idx` (`Tratamiento_idTratamiento` ASC) VISIBLE,
  INDEX `fk_Parcela_has_Tratamiento_Parcela1_idx` (`Parcela_Número_identificación` ASC) VISIBLE,
  CONSTRAINT `fk_Parcela_has_Tratamiento_Parcela1`
    FOREIGN KEY (`Parcela_Número_identificación`)
    REFERENCES `Cuaderno_de_campo`.`Parcela` (`Número_identificación`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Parcela_has_Tratamiento_Tratamiento1`
    FOREIGN KEY (`Tratamiento_idTratamiento`)
    REFERENCES `Cuaderno_de_campo`.`Tratamiento` (`idTratamiento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Cuaderno_de_campo`.`Explotación_has_Parcela`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Cuaderno_de_campo`.`Explotación_has_Parcela` (
  `Explotación_idExplotación` INT UNSIGNED NOT NULL,
  `Explotación_Agricultor_Usuario_DNI` VARCHAR(9) NOT NULL,
  `Parcela_Número_identificación` INT NOT NULL,
  PRIMARY KEY (`Explotación_idExplotación`, `Explotación_Agricultor_Usuario_DNI`, `Parcela_Número_identificación`),
  INDEX `fk_Explotación_has_Parcela_Parcela1_idx` (`Parcela_Número_identificación` ASC) VISIBLE,
  INDEX `fk_Explotación_has_Parcela_Explotación1_idx` (`Explotación_idExplotación` ASC, `Explotación_Agricultor_Usuario_DNI` ASC) VISIBLE,
  CONSTRAINT `fk_Explotación_has_Parcela_Explotación1`
    FOREIGN KEY (`Explotación_idExplotación` , `Explotación_Agricultor_Usuario_DNI`)
    REFERENCES `Cuaderno_de_campo`.`Explotación` (`idExplotación` , `Agricultor_Usuario_DNI`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Explotación_has_Parcela_Parcela1`
    FOREIGN KEY (`Parcela_Número_identificación`)
    REFERENCES `Cuaderno_de_campo`.`Parcela` (`Número_identificación`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Cuaderno_de_campo`.`Asesor_has_Agricultor`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Cuaderno_de_campo`.`Asesor_has_Agricultor` (
  `Asesor_DNI` VARCHAR(9) NOT NULL,
  `Agricultor_Usuario_DNI` VARCHAR(9) NOT NULL,
  PRIMARY KEY (`Asesor_DNI`, `Agricultor_Usuario_DNI`),
  INDEX `fk_Asesor_has_Agricultor_Agricultor1_idx` (`Agricultor_Usuario_DNI` ASC) VISIBLE,
  INDEX `fk_Asesor_has_Agricultor_Asesor1_idx` (`Asesor_DNI` ASC) VISIBLE,
  CONSTRAINT `fk_Asesor_has_Agricultor_Asesor1`
    FOREIGN KEY (`Asesor_DNI`)
    REFERENCES `Cuaderno_de_campo`.`Asesor` (`DNI`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Asesor_has_Agricultor_Agricultor1`
    FOREIGN KEY (`Agricultor_Usuario_DNI`)
    REFERENCES `Cuaderno_de_campo`.`Agricultor` (`Usuario_DNI`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
