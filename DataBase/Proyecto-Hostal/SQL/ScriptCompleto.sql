-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: realposadajadeduartemarrufo
-- ------------------------------------------------------
-- Server version	8.0.42

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
-- Table structure for table `empleado`
--

DROP TABLE IF EXISTS `empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `empleado` (
  `id_empleado` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido_paterno` varchar(50) NOT NULL,
  `apellido_materno` varchar(50) DEFAULT NULL,
  `id_rol_empleado` int NOT NULL,
  `id_turno_empleado` int DEFAULT NULL,
  `telefono` bigint DEFAULT NULL COMMENT 'Debe estar en formato de número celular mexicano: +52 y 10 dígitos, sin símbolos ni espacios.',
  `email` varchar(100) DEFAULT NULL,
  `fecha_contratacion` date DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_empleado`),
  UNIQUE KEY `email` (`email`),
  KEY `id_rol_empleado` (`id_rol_empleado`),
  KEY `id_turno_empleado` (`id_turno_empleado`),
  CONSTRAINT `empleado_ibfk_1` FOREIGN KEY (`id_rol_empleado`) REFERENCES `rol_empleado` (`id_rol_empleado`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `empleado_ibfk_2` FOREIGN KEY (`id_turno_empleado`) REFERENCES `turno_empleado` (`id_turno_empleado`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `empleado_chk_1` CHECK (regexp_like(`email`,_utf8mb4'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `empleado`
--

LOCK TABLES `empleado` WRITE;
/*!40000 ALTER TABLE `empleado` DISABLE KEYS */;
INSERT INTO `empleado` VALUES (1,'Pedro','Gómez','Ruiz',1,1,521234567895,'pedro.gomez@example.com','2022-01-10','2025-07-24 17:34:02','2025-07-24 17:34:02'),(2,'Lucía','Morales','Castro',2,2,521234567896,'lucia.morales@example.com','2021-11-05','2025-07-24 17:34:02','2025-07-24 17:34:02'),(3,'Miguel','Santos','Flores',3,1,521234567897,'miguel.santos@example.com','2020-09-20','2025-07-24 17:34:02','2025-07-24 17:34:02'),(4,'Sofía','Navarro','Mendoza',1,2,521234567898,'sofia.navarro@example.com','2023-02-14','2025-07-24 17:34:02','2025-07-24 17:34:02'),(5,'Diego','Vargas','Silva',2,1,521234567899,'diego.vargas@example.com','2022-06-18','2025-07-24 17:34:02','2025-07-24 17:34:02');
/*!40000 ALTER TABLE `empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_estancia`
--

DROP TABLE IF EXISTS `estado_estancia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_estancia` (
  `id_estado_estancia` int NOT NULL AUTO_INCREMENT,
  `nombre_estado` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estado_estancia`),
  UNIQUE KEY `nombre_estado` (`nombre_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_estancia`
--

LOCK TABLES `estado_estancia` WRITE;
/*!40000 ALTER TABLE `estado_estancia` DISABLE KEYS */;
INSERT INTO `estado_estancia` VALUES (3,'Completada'),(1,'En estancia'),(2,'Extendida');
/*!40000 ALTER TABLE `estado_estancia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_habitacion`
--

DROP TABLE IF EXISTS `estado_habitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_habitacion` (
  `id_estado_habitacion` int NOT NULL AUTO_INCREMENT,
  `nombre_estado` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estado_habitacion`),
  UNIQUE KEY `nombre_estado` (`nombre_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_habitacion`
--

LOCK TABLES `estado_habitacion` WRITE;
/*!40000 ALTER TABLE `estado_habitacion` DISABLE KEYS */;
INSERT INTO `estado_habitacion` VALUES (2,'Disponible'),(4,'Fuera de Servicio'),(1,'Ocupada'),(3,'Reservada');
/*!40000 ALTER TABLE `estado_habitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estado_mantenimiento`
--

DROP TABLE IF EXISTS `estado_mantenimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estado_mantenimiento` (
  `id_estado_mantenimiento` int NOT NULL AUTO_INCREMENT,
  `nombre_estado` varchar(50) NOT NULL,
  PRIMARY KEY (`id_estado_mantenimiento`),
  UNIQUE KEY `nombre_estado` (`nombre_estado`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estado_mantenimiento`
--

LOCK TABLES `estado_mantenimiento` WRITE;
/*!40000 ALTER TABLE `estado_mantenimiento` DISABLE KEYS */;
INSERT INTO `estado_mantenimiento` VALUES (2,'Disponible'),(1,'En limpieza'),(4,'En reparación'),(3,'Sucio');
/*!40000 ALTER TABLE `estado_mantenimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estancia`
--

DROP TABLE IF EXISTS `estancia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estancia` (
  `id_estancia` int NOT NULL AUTO_INCREMENT,
  `id_reserva` int NOT NULL,
  `id_estado_estancia` int NOT NULL,
  `id_huesped` int NOT NULL,
  `hora_checkin` datetime NOT NULL,
  `hora_checkout` datetime DEFAULT NULL,
  `numero_personas` int NOT NULL,
  `vehiculo_registrado` tinyint(1) DEFAULT NULL,
  `placa_vehiculo` varchar(20) DEFAULT NULL,
  `requiere_factura` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_estancia`),
  KEY `id_reserva` (`id_reserva`),
  KEY `id_huesped` (`id_huesped`),
  KEY `id_estado_estancia` (`id_estado_estancia`),
  CONSTRAINT `estancia_ibfk_1` FOREIGN KEY (`id_reserva`) REFERENCES `reserva` (`id_reserva`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `estancia_ibfk_2` FOREIGN KEY (`id_huesped`) REFERENCES `huesped` (`id_huesped`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `estancia_ibfk_3` FOREIGN KEY (`id_estado_estancia`) REFERENCES `estado_estancia` (`id_estado_estancia`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `estancia_chk_1` CHECK ((`numero_personas` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estancia`
--

LOCK TABLES `estancia` WRITE;
/*!40000 ALTER TABLE `estancia` DISABLE KEYS */;
INSERT INTO `estancia` VALUES (1,1,1,1,'2024-06-05 14:00:00','2024-06-07 12:00:00',1,0,NULL,0),(2,2,2,2,'2024-06-08 15:00:00',NULL,2,1,'ABC123',1),(3,3,3,3,'2024-06-11 13:00:00','2024-06-13 11:00:00',3,0,NULL,0),(4,4,1,4,'2024-06-14 16:00:00',NULL,2,1,'XYZ789',1),(5,5,2,5,'2024-06-17 17:00:00',NULL,4,0,NULL,0);
/*!40000 ALTER TABLE `estancia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estancia_empleado`
--

DROP TABLE IF EXISTS `estancia_empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estancia_empleado` (
  `id_estancia` int NOT NULL,
  `id_empleado` int NOT NULL,
  PRIMARY KEY (`id_estancia`,`id_empleado`),
  KEY `id_empleado` (`id_empleado`),
  CONSTRAINT `estancia_empleado_ibfk_1` FOREIGN KEY (`id_estancia`) REFERENCES `estancia` (`id_estancia`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `estancia_empleado_ibfk_2` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estancia_empleado`
--

LOCK TABLES `estancia_empleado` WRITE;
/*!40000 ALTER TABLE `estancia_empleado` DISABLE KEYS */;
INSERT INTO `estancia_empleado` VALUES (1,1),(2,2),(3,3),(4,4),(5,5);
/*!40000 ALTER TABLE `estancia_empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `habitacion`
--

DROP TABLE IF EXISTS `habitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `habitacion` (
  `id_habitacion` int NOT NULL AUTO_INCREMENT,
  `numero_habitacion` varchar(10) NOT NULL,
  `id_tipo_habitacion` int NOT NULL,
  `id_estado_habitacion` int NOT NULL,
  PRIMARY KEY (`id_habitacion`),
  UNIQUE KEY `numero_habitacion` (`numero_habitacion`),
  KEY `id_tipo_habitacion` (`id_tipo_habitacion`),
  KEY `id_estado_habitacion` (`id_estado_habitacion`),
  CONSTRAINT `habitacion_ibfk_1` FOREIGN KEY (`id_tipo_habitacion`) REFERENCES `tipo_habitacion` (`id_tipo_habitacion`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `habitacion_ibfk_2` FOREIGN KEY (`id_estado_habitacion`) REFERENCES `estado_habitacion` (`id_estado_habitacion`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `habitacion`
--

LOCK TABLES `habitacion` WRITE;
/*!40000 ALTER TABLE `habitacion` DISABLE KEYS */;
INSERT INTO `habitacion` VALUES (1,'101',1,2),(2,'102',2,2),(3,'103',3,2),(4,'104',1,3),(5,'105',2,4);
/*!40000 ALTER TABLE `habitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `huesped`
--

DROP TABLE IF EXISTS `huesped`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `huesped` (
  `id_huesped` int NOT NULL AUTO_INCREMENT,
  `nombre` varchar(50) NOT NULL,
  `apellido_paterno` varchar(50) NOT NULL,
  `apellido_materno` varchar(50) DEFAULT NULL,
  `numero_celular` bigint NOT NULL COMMENT 'Debe estar en formato de número celular mexicano: +52 y 10 dígitos, sin símbolos ni espacios.',
  `correo` varchar(100) NOT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `nacionalidad` varchar(50) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_huesped`),
  UNIQUE KEY `correo` (`correo`),
  CONSTRAINT `huesped_chk_1` CHECK (regexp_like(`correo`,_utf8mb4'^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,}$'))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `huesped`
--

LOCK TABLES `huesped` WRITE;
/*!40000 ALTER TABLE `huesped` DISABLE KEYS */;
INSERT INTO `huesped` VALUES (1,'Juan','Pérez','García',521234567890,'juan.perez@example.com','1990-05-10','Mexicana','2025-07-24 17:33:22','2025-07-24 17:33:22'),(2,'Ana','López','Martínez',521234567891,'ana.lopez@example.com','1985-08-22','Mexicana','2025-07-24 17:33:22','2025-07-24 17:33:22'),(3,'Carlos','Ramírez','Sánchez',521234567892,'carlos.ramirez@example.com','1992-12-01','Mexicana','2025-07-24 17:33:22','2025-07-24 17:33:22'),(4,'María','Hernández','Díaz',521234567893,'maria.hernandez@example.com','1988-03-15','Mexicana','2025-07-24 17:33:22','2025-07-24 17:33:22'),(5,'Luis','Torres','Vega',521234567894,'luis.torres@example.com','1995-07-30','Mexicana','2025-07-24 17:33:22','2025-07-24 17:33:22');
/*!40000 ALTER TABLE `huesped` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `huesped_estancia`
--

DROP TABLE IF EXISTS `huesped_estancia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `huesped_estancia` (
  `id_estancia` int NOT NULL,
  `id_huesped` int NOT NULL,
  PRIMARY KEY (`id_estancia`,`id_huesped`),
  KEY `id_huesped` (`id_huesped`),
  CONSTRAINT `huesped_estancia_ibfk_1` FOREIGN KEY (`id_estancia`) REFERENCES `estancia` (`id_estancia`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `huesped_estancia_ibfk_2` FOREIGN KEY (`id_huesped`) REFERENCES `huesped` (`id_huesped`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `huesped_estancia`
--

LOCK TABLES `huesped_estancia` WRITE;
/*!40000 ALTER TABLE `huesped_estancia` DISABLE KEYS */;
INSERT INTO `huesped_estancia` VALUES (1,1),(2,2),(3,3),(4,4),(5,5);
/*!40000 ALTER TABLE `huesped_estancia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mantenimiento`
--

DROP TABLE IF EXISTS `mantenimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `mantenimiento` (
  `id_mantenimiento` int NOT NULL AUTO_INCREMENT,
  `id_habitacion` int NOT NULL,
  `id_empleado` int DEFAULT NULL,
  `id_estado_mantenimiento` int NOT NULL,
  `fecha_solicitud` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL,
  `descripcion` text NOT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_mantenimiento`),
  KEY `id_habitacion` (`id_habitacion`),
  KEY `id_empleado` (`id_empleado`),
  KEY `id_estado_mantenimiento` (`id_estado_mantenimiento`),
  CONSTRAINT `mantenimiento_ibfk_1` FOREIGN KEY (`id_habitacion`) REFERENCES `habitacion` (`id_habitacion`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_2` FOREIGN KEY (`id_empleado`) REFERENCES `empleado` (`id_empleado`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `mantenimiento_ibfk_3` FOREIGN KEY (`id_estado_mantenimiento`) REFERENCES `estado_mantenimiento` (`id_estado_mantenimiento`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mantenimiento`
--

LOCK TABLES `mantenimiento` WRITE;
/*!40000 ALTER TABLE `mantenimiento` DISABLE KEYS */;
INSERT INTO `mantenimiento` VALUES (1,1,1,1,'2024-06-01 10:00:00','2024-06-01','2024-06-02','Limpieza general','2025-07-24 17:35:14','2025-07-24 17:35:14'),(2,2,2,2,'2024-06-03 11:00:00','2024-06-03','2024-06-04','Revisión de aire acondicionado','2025-07-24 17:35:14','2025-07-24 17:35:14'),(3,3,3,3,'2024-06-05 12:00:00','2024-06-05','2024-06-06','Cambio de sábanas','2025-07-24 17:35:14','2025-07-24 17:35:14'),(4,4,4,4,'2024-06-07 13:00:00','2024-06-07',NULL,'Reparación de baño','2025-07-24 17:35:14','2025-07-24 17:35:14'),(5,5,5,1,'2024-06-09 14:00:00','2024-06-09',NULL,'Limpieza profunda','2025-07-24 17:35:14','2025-07-24 17:35:14');
/*!40000 ALTER TABLE `mantenimiento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodo_pago`
--

DROP TABLE IF EXISTS `metodo_pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodo_pago` (
  `id_metodo_pago` int NOT NULL AUTO_INCREMENT,
  `nombre_metodo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_metodo_pago`),
  UNIQUE KEY `nombre_metodo` (`nombre_metodo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodo_pago`
--

LOCK TABLES `metodo_pago` WRITE;
/*!40000 ALTER TABLE `metodo_pago` DISABLE KEYS */;
INSERT INTO `metodo_pago` VALUES (3,'Efectivo'),(1,'Tarjeta'),(2,'Transferencia');
/*!40000 ALTER TABLE `metodo_pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pago`
--

DROP TABLE IF EXISTS `pago`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pago` (
  `id_pago` int NOT NULL AUTO_INCREMENT,
  `id_estancia` int NOT NULL,
  `fecha_pago` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `monto` decimal(10,2) NOT NULL,
  `id_metodo_pago` int NOT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_pago`),
  KEY `id_estancia` (`id_estancia`),
  KEY `id_metodo_pago` (`id_metodo_pago`),
  CONSTRAINT `pago_ibfk_1` FOREIGN KEY (`id_estancia`) REFERENCES `estancia` (`id_estancia`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `pago_ibfk_2` FOREIGN KEY (`id_metodo_pago`) REFERENCES `metodo_pago` (`id_metodo_pago`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `pago_chk_1` CHECK ((`monto` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pago`
--

LOCK TABLES `pago` WRITE;
/*!40000 ALTER TABLE `pago` DISABLE KEYS */;
INSERT INTO `pago` VALUES (1,1,'2024-06-07 12:30:00',1000.00,1,'2025-07-24 17:35:24'),(2,2,'2024-06-10 13:30:00',1600.00,2,'2025-07-24 17:35:24'),(3,3,'2024-06-13 11:30:00',2400.00,3,'2025-07-24 17:35:24'),(4,4,'2024-06-16 12:00:00',800.00,1,'2025-07-24 17:35:24'),(5,5,'2024-06-19 13:00:00',1600.00,2,'2025-07-24 17:35:24');
/*!40000 ALTER TABLE `pago` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reserva`
--

DROP TABLE IF EXISTS `reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reserva` (
  `id_reserva` int NOT NULL AUTO_INCREMENT,
  `id_huesped` int NOT NULL,
  `id_habitacion` int NOT NULL,
  `fecha_reserva` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fecha_checkin_prevista` date NOT NULL,
  `fecha_checkout_prevista` date NOT NULL,
  `id_tipo_reserva` int NOT NULL,
  `precio_total_estimado` decimal(10,2) DEFAULT NULL,
  `fecha_creacion` datetime DEFAULT CURRENT_TIMESTAMP,
  `fecha_modificacion` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_reserva`),
  KEY `id_huesped` (`id_huesped`),
  KEY `id_habitacion` (`id_habitacion`),
  KEY `id_tipo_reserva` (`id_tipo_reserva`),
  CONSTRAINT `reserva_ibfk_1` FOREIGN KEY (`id_huesped`) REFERENCES `huesped` (`id_huesped`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `reserva_ibfk_2` FOREIGN KEY (`id_habitacion`) REFERENCES `habitacion` (`id_habitacion`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `reserva_ibfk_3` FOREIGN KEY (`id_tipo_reserva`) REFERENCES `tipo_reserva` (`id_tipo_reserva`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reserva`
--

LOCK TABLES `reserva` WRITE;
/*!40000 ALTER TABLE `reserva` DISABLE KEYS */;
INSERT INTO `reserva` VALUES (1,1,1,'2024-06-01 12:00:00','2024-06-05','2024-06-07',1,1000.00,'2025-07-24 17:34:35','2025-07-24 17:34:35'),(2,2,2,'2024-06-02 13:00:00','2024-06-08','2024-06-10',2,1600.00,'2025-07-24 17:34:35','2025-07-24 17:34:35'),(3,3,3,'2024-06-03 14:00:00','2024-06-11','2024-06-13',3,2400.00,'2025-07-24 17:34:35','2025-07-24 17:34:35'),(4,4,4,'2024-06-04 15:00:00','2024-06-14','2024-06-16',4,800.00,'2025-07-24 17:34:35','2025-07-24 17:34:35'),(5,5,5,'2024-06-05 16:00:00','2024-06-17','2024-06-19',1,1600.00,'2025-07-24 17:34:35','2025-07-24 17:34:35');
/*!40000 ALTER TABLE `reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rol_empleado`
--

DROP TABLE IF EXISTS `rol_empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rol_empleado` (
  `id_rol_empleado` int NOT NULL AUTO_INCREMENT,
  `nombre_rol` varchar(50) NOT NULL,
  PRIMARY KEY (`id_rol_empleado`),
  UNIQUE KEY `nombre_rol` (`nombre_rol`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rol_empleado`
--

LOCK TABLES `rol_empleado` WRITE;
/*!40000 ALTER TABLE `rol_empleado` DISABLE KEYS */;
INSERT INTO `rol_empleado` VALUES (3,'Administrador'),(2,'Limpieza'),(1,'Recepcionista');
/*!40000 ALTER TABLE `rol_empleado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_habitacion`
--

DROP TABLE IF EXISTS `tipo_habitacion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_habitacion` (
  `id_tipo_habitacion` int NOT NULL AUTO_INCREMENT,
  `nombre_tipo` varchar(50) NOT NULL,
  `capacidad_maxima` int NOT NULL,
  `precio_base_por_noche` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id_tipo_habitacion`),
  UNIQUE KEY `nombre_tipo` (`nombre_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_habitacion`
--

LOCK TABLES `tipo_habitacion` WRITE;
/*!40000 ALTER TABLE `tipo_habitacion` DISABLE KEYS */;
INSERT INTO `tipo_habitacion` VALUES (1,'Individual',1,500.00),(2,'Matrimonial',2,800.00),(3,'Familiar',4,1200.00);
/*!40000 ALTER TABLE `tipo_habitacion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_reserva`
--

DROP TABLE IF EXISTS `tipo_reserva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_reserva` (
  `id_tipo_reserva` int NOT NULL AUTO_INCREMENT,
  `nombre_tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id_tipo_reserva`),
  UNIQUE KEY `nombre_tipo` (`nombre_tipo`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_reserva`
--

LOCK TABLES `tipo_reserva` WRITE;
/*!40000 ALTER TABLE `tipo_reserva` DISABLE KEYS */;
INSERT INTO `tipo_reserva` VALUES (2,'En persona'),(1,'Online'),(4,'Por Intermediarios'),(3,'Telefonica');
/*!40000 ALTER TABLE `tipo_reserva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `turno_empleado`
--

DROP TABLE IF EXISTS `turno_empleado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `turno_empleado` (
  `id_turno_empleado` int NOT NULL AUTO_INCREMENT,
  `nombre_turno` varchar(50) NOT NULL,
  `hora_inicio` time DEFAULT NULL,
  `hora_fin` time DEFAULT NULL,
  PRIMARY KEY (`id_turno_empleado`),
  UNIQUE KEY `nombre_turno` (`nombre_turno`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `turno_empleado`
--

LOCK TABLES `turno_empleado` WRITE;
/*!40000 ALTER TABLE `turno_empleado` DISABLE KEYS */;
INSERT INTO `turno_empleado` VALUES (1,'Matutino','07:00:00','15:00:00'),(2,'Nocturno','15:00:00','23:00:00');
/*!40000 ALTER TABLE `turno_empleado` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-24 17:39:17
