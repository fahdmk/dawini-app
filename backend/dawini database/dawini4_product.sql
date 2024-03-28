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
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product` (
  `idproducts` int NOT NULL AUTO_INCREMENT,
  `productName` varchar(45) NOT NULL,
  `description` varchar(45) NOT NULL,
  `Price` varchar(45) NOT NULL,
  `Deliverycompany` varchar(45) NOT NULL,
  `Producer` varchar(45) NOT NULL,
  `Stock` varchar(45) NOT NULL,
  `discounts` varchar(45) NOT NULL,
  `deliveryestimate time` varchar(45) DEFAULT NULL,
  `productscol` varchar(45) DEFAULT NULL,
  `ADMIN_idADMIN` int DEFAULT NULL,
  `lastupdate` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `photo` longblob,
  PRIMARY KEY (`idproducts`),
  UNIQUE KEY `unique_admin_idx` (`ADMIN_idADMIN`),
  KEY `fk_product_ADMIN1_idx` (`ADMIN_idADMIN`),
  CONSTRAINT `fk_product_ADMIN1` FOREIGN KEY (`ADMIN_idADMIN`) REFERENCES `admin` (`idADMIN`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb3;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (2,'Product1','Description for Product1','49.99','DeliveryCo1','Producer1','100','5%','2 days','Additional Info',NULL,'2024-02-26 11:41:24',NULL),(3,'Product 1','Description 1','50.00','Delivery Company 1','Producer 1','100','10%','2 days','Product Column 1',1,'2024-02-26 11:46:47',NULL),(4,'Product 2','Description 2','75.00','Delivery Company 2','Producer 2','150','15%','3 days','Product Column 2',2,'2024-02-26 11:46:47',NULL),(5,'Product 3','Description 3','100.00','Delivery Company 3','Producer 3','200','20%','4 days','Product Column 3',3,'2024-02-26 11:46:47',NULL),(6,'Product 4','Description 4','120.00','Delivery Company 4','Producer 4','180','12%','2 days','Product Column 4',4,'2024-02-26 11:46:47',NULL),(7,'Product 5','Description 5','200.00','Delivery Company 5','Producer 5','250','25%','5 days','Product Column 5',5,'2024-02-26 11:46:47',NULL),(9,'wheelchair','steel wheelchair','1000','armes','aze','15','5',NULL,NULL,NULL,'2024-02-26 13:29:08',NULL),(10,'bed','medical bed','10000','axon','axon','12','5',NULL,NULL,NULL,'2024-02-26 22:58:15',NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
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
