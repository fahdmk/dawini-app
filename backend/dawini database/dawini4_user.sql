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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `idUser` int NOT NULL AUTO_INCREMENT,
  `role` varchar(45) NOT NULL,
  `fullname` varchar(45) NOT NULL,
  `username` varchar(45) NOT NULL,
  `password` varchar(60) NOT NULL,
  `email` varchar(45) NOT NULL,
  `phone` varchar(45) NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `description` varchar(45) DEFAULT NULL,
  `online staus` varchar(45) DEFAULT NULL,
  `Adress` varchar(45) NOT NULL,
  `Location` varchar(45) DEFAULT NULL,
  `prefrences` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'User','John Doe','john_doe','password123','john@example.com','1234567890','2024-02-26 12:43:13','1990-01-01','Description for John Doe','Online','123 Main St','City1','Preference1'),(2,'User','Jane Smith','jane_smith','password456','jane@example.com','9876543210','2024-02-26 12:43:13','1985-05-15','Description for Jane Smith','Online','456 Oak St','City2','Preference2'),(3,'User','Bob Johnson','bob_johnson','password789','bob@example.com','4567890123','2024-02-26 12:43:13','1978-09-22','Description for Bob Johnson','Offline','789 Maple St','City3','Preference3'),(4,'User','Alice Williams','alice_williams','passwordabc','alice@example.com','7890123456','2024-02-26 12:43:13','1995-03-10','Description for Alice Williams','Online','101 Pine St','City4','Preference4'),(5,'User','Chris Davis','chris_davis','passwordxyz','chris@example.com','3210987654','2024-02-26 12:43:13','1982-11-28','Description for Chris Davis','Offline','202 Cedar St','City5','Preference5'),(6,'User','Eva Miller','eva_miller','password123','eva@example.com','1234567890','2024-02-26 12:43:53','1992-04-18','Description for Eva Miller','Online','456 Elm St','City6','Preference6'),(7,'User','David Wilson','david_wilson','password456','david@example.com','9876543210','2024-02-26 12:43:53','1987-07-25','Description for David Wilson','Offline','789 Birch St','City7','Preference7'),(8,'User','Sophia Brown','sophia_brown','password789','sophia@example.com','4567890123','2024-02-26 12:43:53','1979-12-12','Description for Sophia Brown','Online','101 Oak St','City8','Preference8'),(9,'User','Leo Taylor','leo_taylor','passwordabc','leo@example.com','7890123456','2024-02-26 12:43:53','1998-02-03','Description for Leo Taylor','Offline','202 Pine St','City9','Preference9'),(10,'User','Emma Evans','emma_evans','passwordxyz','emma@example.com','3210987654','2024-02-26 12:43:53','1984-06-30','Description for Emma Evans','Online','303 Cedar St','City10','Preference10'),(11,'User','Michael White','michael_white','password123','michael@example.com','1234567890','2024-02-26 12:43:53','1976-09-14','Description for Michael White','Offline','404 Maple St','City11','Preference11'),(12,'User','Olivia Harris','olivia_harris','password456','olivia@example.com','9876543210','2024-02-26 12:43:53','1991-01-22','Description for Olivia Harris','Online','505 Birch St','City12','Preference12'),(13,'user','John Doe','johndoe','mysecretpassword','johndoe@example.com','1234567890','2024-03-13 11:03:54','1990-01-01',NULL,NULL,'123 Main St, City',NULL,NULL),(14,'user','John Doe','johndoe','mysecretpassword','johndoe@example.com','1234567890','2024-03-13 11:28:54','1990-01-01',NULL,NULL,'123 Main St, City',NULL,NULL),(15,'patient','sdfs','sdfs','sdfsd','sdfsd','65656','2024-03-16 14:48:42','2024-03-11',NULL,NULL,'zerfez',NULL,NULL),(16,'patient','sdfs','sdfs','sdfsd','sdfsd','65656','2024-03-16 14:48:57','2024-03-11',NULL,NULL,'zerfez',NULL,NULL),(17,'patient','fahd mekki','fahd mekki','123','email','93794224','2024-03-16 14:51:49','2001-09-13',NULL,NULL,'kairouan',NULL,NULL),(18,'patient','fahd mekki','fahd mekki','123','email','93794224','2024-03-16 14:55:48','2001-09-13',NULL,NULL,'kairouan',NULL,NULL),(19,'patient','fahd mekki','fahd mekki','123','email','93794224','2024-03-16 14:56:02','2001-09-13',NULL,NULL,'kairouan',NULL,NULL),(20,'patient','ahmed','ahmed','ahmed','ahmed','98653245','2024-03-16 14:58:38','2024-03-14',NULL,NULL,'ahmed',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
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
