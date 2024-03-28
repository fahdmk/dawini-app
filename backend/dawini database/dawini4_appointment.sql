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
-- Table structure for table `appointment`
--

DROP TABLE IF EXISTS `appointment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `appointment` (
  `idAppointment` int NOT NULL AUTO_INCREMENT,
  `Price` varchar(45) DEFAULT NULL,
  `Date` varchar(45) DEFAULT NULL,
  `accepted/declined` varchar(45) DEFAULT NULL,
  `Care taker_idCare taker` int DEFAULT NULL,
  `User_idUser` int DEFAULT NULL,
  PRIMARY KEY (`idAppointment`),
  KEY `fk_Appointment_Care taker1_idx` (`Care taker_idCare taker`),
  KEY `fk_Appointment_User1_idx` (`User_idUser`),
  CONSTRAINT `fk_Appointment_Care taker1` FOREIGN KEY (`Care taker_idCare taker`) REFERENCES `caretaker` (`idCare taker`),
  CONSTRAINT `fk_Appointment_User1` FOREIGN KEY (`User_idUser`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `appointment`
--

LOCK TABLES `appointment` WRITE;
/*!40000 ALTER TABLE `appointment` DISABLE KEYS */;
INSERT INTO `appointment` VALUES (21,'50.00','2024-01-15 09:30:00','Accepted',13,3),(22,'60.00','2024-02-20 14:45:00','Accepted',14,3),(23,'70.00','2024-03-10 16:20:00','Accepted',15,3),(24,'80.00','2024-01-05 11:10:00','Accepted',16,4),(25,'90.00','2024-02-18 15:00:00','Accepted',17,4),(26,'50.00','2024-01-15 09:30:00','Accepted',13,3),(27,'60.00','2024-02-20 14:45:00','Accepted',14,3),(28,'70.00','2024-03-10 16:20:00','Accepted',15,3),(29,'80.00','2024-01-05 11:10:00','Accepted',16,4),(30,'90.00','2024-02-18 15:00:00','Accepted',17,4),(31,'50.00','2024-01-15 09:30:00','Accepted',13,3),(32,'60.00','2024-02-20 14:45:00','Accepted',14,3),(33,'70.00','2024-03-10 16:20:00','Accepted',15,3),(34,'80.00','2024-01-05 11:10:00','Accepted',16,4),(35,'90.00','2024-02-18 15:00:00','Accepted',17,4);
/*!40000 ALTER TABLE `appointment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-28 22:35:13
