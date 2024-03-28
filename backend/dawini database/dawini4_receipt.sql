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
-- Table structure for table `receipt`
--

DROP TABLE IF EXISTS `receipt`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `receipt` (
  `idreceipt` int NOT NULL AUTO_INCREMENT,
  `time` varchar(45) NOT NULL,
  `purchase method` varchar(45) NOT NULL,
  `product_idproducts` int DEFAULT NULL,
  `User_idUser` int DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  PRIMARY KEY (`idreceipt`),
  KEY `fk_receipt_product_idx` (`product_idproducts`),
  KEY `fk_receipt_User1_idx` (`User_idUser`),
  CONSTRAINT `fk_receipt_product` FOREIGN KEY (`product_idproducts`) REFERENCES `product` (`idproducts`),
  CONSTRAINT `fk_receipt_User1` FOREIGN KEY (`User_idUser`) REFERENCES `user` (`idUser`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `receipt`
--

LOCK TABLES `receipt` WRITE;
/*!40000 ALTER TABLE `receipt` DISABLE KEYS */;
INSERT INTO `receipt` VALUES (25,'2023-01-15 08:30:00','Credit Card',2,1,60.00),(26,'2023-02-20 12:45:00','PayPal',2,2,80.00),(27,'2023-03-10 15:20:00','Credit Card',3,3,110.00),(28,'2023-04-05 10:10:00','Cash',4,4,90.00),(29,'2023-05-18 14:00:00','Credit Card',5,5,120.00),(30,'2023-06-22 16:30:00','PayPal',2,6,70.00),(31,'2023-07-12 09:45:00','Credit Card',2,7,100.00),(32,'2023-08-08 11:15:00','Cash',3,8,85.00),(33,'2023-09-25 13:40:00','PayPal',4,5,130.00),(34,'2023-10-30 17:00:00','Credit Card',5,7,95.00),(35,'2023-11-14 10:55:00','Cash',2,3,110.00),(36,'2023-12-19 14:25:00','PayPal',2,2,75.00),(40,'2024-01-15 08:30:00','Credit Card',2,2,60.00),(41,'2024-02-20 12:45:00','PayPal',2,2,80.00),(42,'2024-03-10 15:20:00','Credit Card',3,3,110.00),(43,'2024-01-15 08:30:00','Credit Card',2,2,60.00),(44,'2024-02-20 12:45:00','PayPal',2,2,80.00),(45,'2024-03-10 15:20:00','Credit Card',3,3,110.00),(46,'2024-01-15 08:30:00','Credit Card',2,2,60.00),(47,'2024-02-20 12:45:00','PayPal',2,2,80.00),(48,'2024-03-10 15:20:00','Credit Card',3,3,110.00),(49,'2024-01-15 08:30:00','Credit Card',2,2,60.00),(50,'2024-02-20 12:45:00','PayPal',2,2,80.00),(51,'2024-03-10 15:20:00','Credit Card',3,3,110.00),(52,'2024-01-15 08:30:00','Credit Card',2,1,1160.00);
/*!40000 ALTER TABLE `receipt` ENABLE KEYS */;
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
