-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: dawini4
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `caretaker`
--

DROP TABLE IF EXISTS `caretaker`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `caretaker` (
  `idCare taker` int NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `Password` varchar(45) NOT NULL,
  `full name` varchar(45) NOT NULL,
  `adress` varchar(45) NOT NULL,
  `Location` varchar(45) DEFAULT NULL,
  `working_area` varchar(255) DEFAULT NULL,
  `email` varchar(45) DEFAULT NULL,
  `cv` varchar(45) NOT NULL,
  `speciality` varchar(45) DEFAULT NULL,
  `phone` varchar(45) DEFAULT NULL,
  `Role` varchar(45) NOT NULL,
  `CIN` varchar(45) NOT NULL,
  `ADMIN_idADMIN` int DEFAULT NULL,
  `verification` varchar(45) DEFAULT NULL,
  `latitude` decimal(10,8) DEFAULT NULL,
  `longitude` decimal(11,8) DEFAULT NULL,
  PRIMARY KEY (`idCare taker`),
  KEY `fk_Care taker_ADMIN1_idx` (`ADMIN_idADMIN`),
  CONSTRAINT `fk_Care taker_ADMIN1` FOREIGN KEY (`ADMIN_idADMIN`) REFERENCES `admin` (`idADMIN`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `caretaker`
--

LOCK TABLES `caretaker` WRITE;
/*!40000 ALTER TABLE `caretaker` DISABLE KEYS */;
INSERT INTO `caretaker` VALUES (13,'caretaker1','caretaker1password','Caretaker 1 Full Name','Caretaker 1 Address','36.787882,10.263728','Working Area 1','caretaker1@email.com','CV 1','Speciality 1','123456789','Caretaker','CIN12345',1,'Verified',36.86177322,10.20621995),(14,'caretaker2','caretaker2password','Caretaker 2 Full Name','Caretaker 2 Address','36.834088,10.211080','Working Area 2','caretaker2@email.com','CV 2','Speciality 2','987654321','Caretaker','CIN54321',2,'Verified',36.81300515,10.20137451),(15,'caretaker3','caretaker3password','Caretaker 3 Full Name','Caretaker 3 Address','36.756737,10.286970','Working Area 3','caretaker3@email.com','CV 3','Speciality 3','111222333','Caretaker','CIN67890',3,'Verified',36.79113896,10.27013621),(16,'caretaker4','caretaker4password','Caretaker 4 Full Name','Caretaker 4 Address','36.871203,10.252701','Working Area 4','caretaker4@email.com','CV 4','Speciality 4','444555666','Caretaker','CIN09876',4,'Verified',36.81459391,10.22021745),(17,'caretaker5','caretaker5password','Caretaker 5 Full Name','Caretaker 5 Address','36.992233,10.268594','Working Area 5','caretaker5@email.com','CV 5','Speciality 5','777888999','Caretaker','CIN56789',5,'Verified',36.85703372,10.25290580),(18,'caretaker6','caretaker6password','Caretaker 6 Full Name','Caretaker 6 Address','36.761589,10.278984','Working Area 6','caretaker6@email.com','CV 6','Speciality 5','222333444','Caretaker','CIN23456',5,'Verified',36.85229557,10.12325308),(19,'nurse_username111111','nurse_password','Nurse Fullname','Nurse Address','36.790102,10.183352','Nurse Working Area','nurse@example.com','Nurse CV',NULL,'1234567890','nurse','nurse_CIN',NULL,NULL,36.83031236,10.16565649),(20,'dze','sfzer','dze','efze','36.907630,10.222832','sefze','sdfs','aaa',NULL,'zefzer','nurse','sef',NULL,NULL,36.75527477,10.13819565),(21,'aaa','aaa','aaa','aaa','36.884047,10.183644','aaa','aaa','aaa',NULL,'aaa','nurse','aaa',NULL,NULL,36.87740937,10.23480889);
/*!40000 ALTER TABLE `caretaker` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-28 22:35:14
