-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema dawini4
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema dawini4
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `dawini4` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `dawini4` ;

-- -----------------------------------------------------
-- Table `dawini4`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dawini4`.`admin` (
  `idADMIN` INT NOT NULL AUTO_INCREMENT,
  `UserName` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`idADMIN`))
ENGINE = InnoDB
AUTO_INCREMENT = 6
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dawini4`.`caretaker`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dawini4`.`caretaker` (
  `idCare taker` INT NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `Password` VARCHAR(45) NOT NULL,
  `full name` VARCHAR(45) NOT NULL,
  `adress` VARCHAR(45) NOT NULL,
  `Location` VARCHAR(45) NULL DEFAULT NULL,
  `working_area` VARCHAR(255) NULL DEFAULT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `cv` VARCHAR(45) NOT NULL,
  `speciality` VARCHAR(45) NULL DEFAULT NULL,
  `phone` VARCHAR(45) NULL DEFAULT NULL,
  `Role` VARCHAR(45) NOT NULL,
  `CIN` VARCHAR(45) NOT NULL,
  `ADMIN_idADMIN` INT NULL DEFAULT NULL,
  `verification` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idCare taker`),
  INDEX `fk_Care taker_ADMIN1_idx` (`ADMIN_idADMIN` ASC) VISIBLE,
  CONSTRAINT `fk_Care taker_ADMIN1`
    FOREIGN KEY (`ADMIN_idADMIN`)
    REFERENCES `dawini4`.`admin` (`idADMIN`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dawini4`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dawini4`.`user` (
  `idUser` INT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(45) NOT NULL,
  `fullname` VARCHAR(45) NOT NULL,
  `username` VARCHAR(45) NOT NULL,
  `password` VARCHAR(60) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `phone` VARCHAR(45) NOT NULL,
  `creation_date` DATETIME NULL DEFAULT NULL,
  `birthday` DATE NULL DEFAULT NULL,
  `description` VARCHAR(45) NULL DEFAULT NULL,
  `online staus` VARCHAR(45) NULL DEFAULT NULL,
  `Adress` VARCHAR(45) NOT NULL,
  `Location` VARCHAR(45) NULL DEFAULT NULL,
  `prefrences` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`idUser`))
ENGINE = InnoDB
AUTO_INCREMENT = 21
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dawini4`.`appointment`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dawini4`.`appointment` (
  `idAppointment` INT NOT NULL AUTO_INCREMENT,
  `Price` VARCHAR(45) NULL DEFAULT NULL,
  `Date` VARCHAR(45) NULL DEFAULT NULL,
  `accepted/declined` VARCHAR(45) NULL DEFAULT NULL,
  `Care taker_idCare taker` INT NULL DEFAULT NULL,
  `User_idUser` INT NULL DEFAULT NULL,
  PRIMARY KEY (`idAppointment`),
  INDEX `fk_Appointment_Care taker1_idx` (`Care taker_idCare taker` ASC) VISIBLE,
  INDEX `fk_Appointment_User1_idx` (`User_idUser` ASC) VISIBLE,
  CONSTRAINT `fk_Appointment_Care taker1`
    FOREIGN KEY (`Care taker_idCare taker`)
    REFERENCES `dawini4`.`caretaker` (`idCare taker`),
  CONSTRAINT `fk_Appointment_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `dawini4`.`user` (`idUser`))
ENGINE = InnoDB
AUTO_INCREMENT = 36
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dawini4`.`conversation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dawini4`.`conversation` (
  `User_idUser` INT NOT NULL,
  `Care taker_idCare taker` INT NOT NULL,
  `user messages` VARCHAR(10000) NULL DEFAULT NULL,
  `caretaker messages` VARCHAR(10000) NULL DEFAULT NULL,
  PRIMARY KEY (`User_idUser`, `Care taker_idCare taker`),
  INDEX `fk_User_has_Care taker_Care taker1_idx` (`Care taker_idCare taker` ASC) VISIBLE,
  INDEX `fk_User_has_Care taker_User1_idx` (`User_idUser` ASC) VISIBLE,
  CONSTRAINT `fk_User_has_Care taker_Care taker1`
    FOREIGN KEY (`Care taker_idCare taker`)
    REFERENCES `dawini4`.`caretaker` (`idCare taker`),
  CONSTRAINT `fk_User_has_Care taker_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `dawini4`.`user` (`idUser`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dawini4`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dawini4`.`product` (
  `idproducts` INT NOT NULL AUTO_INCREMENT,
  `productName` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `Price` VARCHAR(45) NOT NULL,
  `Deliverycompany` VARCHAR(45) NOT NULL,
  `Producer` VARCHAR(45) NOT NULL,
  `Stock` VARCHAR(45) NOT NULL,
  `discounts` VARCHAR(45) NOT NULL,
  `deliveryestimate time` VARCHAR(45) NULL DEFAULT NULL,
  `productscol` VARCHAR(45) NULL DEFAULT NULL,
  `ADMIN_idADMIN` INT NULL DEFAULT NULL,
  `lastupdate` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `photo` LONGBLOB NULL DEFAULT NULL,
  PRIMARY KEY (`idproducts`),
  UNIQUE INDEX `unique_admin_idx` (`ADMIN_idADMIN` ASC) VISIBLE,
  INDEX `fk_product_ADMIN1_idx` (`ADMIN_idADMIN` ASC) VISIBLE,
  CONSTRAINT `fk_product_ADMIN1`
    FOREIGN KEY (`ADMIN_idADMIN`)
    REFERENCES `dawini4`.`admin` (`idADMIN`))
ENGINE = InnoDB
AUTO_INCREMENT = 14
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `dawini4`.`receipt`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `dawini4`.`receipt` (
  `idreceipt` INT NOT NULL AUTO_INCREMENT,
  `time` VARCHAR(45) NOT NULL,
  `purchase method` VARCHAR(45) NOT NULL,
  `product_idproducts` INT NULL DEFAULT NULL,
  `User_idUser` INT NULL DEFAULT NULL,
  `price` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`idreceipt`),
  INDEX `fk_receipt_product_idx` (`product_idproducts` ASC) VISIBLE,
  INDEX `fk_receipt_User1_idx` (`User_idUser` ASC) VISIBLE,
  CONSTRAINT `fk_receipt_product`
    FOREIGN KEY (`product_idproducts`)
    REFERENCES `dawini4`.`product` (`idproducts`),
  CONSTRAINT `fk_receipt_User1`
    FOREIGN KEY (`User_idUser`)
    REFERENCES `dawini4`.`user` (`idUser`))
ENGINE = InnoDB
AUTO_INCREMENT = 53
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

