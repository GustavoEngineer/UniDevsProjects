USE `startrekjuangustavo`;

-- Drop tables in reverse order of dependencies to avoid foreign key issues
SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS `Nave_Maniobra`;
DROP TABLE IF EXISTS `Planeta_Raza`;
DROP TABLE IF EXISTS `Naves`;
DROP TABLE IF EXISTS `Flotas`;
DROP TABLE IF EXISTS `Capitan`;
DROP TABLE IF EXISTS `Planeta`;
DROP TABLE IF EXISTS `Razas`;
DROP TABLE IF EXISTS `Imperios`;
DROP TABLE IF EXISTS `Maniobras`;
DROP TABLE IF EXISTS `Montaña`;
SET FOREIGN_KEY_CHECKS = 1;

-- Table: Imperios
CREATE TABLE `Imperios` (
    `Imperio_ID` INT PRIMARY KEY AUTO_INCREMENT,
    `Nombre` VARCHAR(255) NOT NULL,
    `Temperatura_Promedio` DOUBLE NOT NULL,
    UNIQUE KEY `UK_Imperios_Nombre` (`Nombre`),
    CHECK (`Temperatura_Promedio` BETWEEN -100 AND 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: Maniobras
CREATE TABLE `Maniobras` (
    `Maniobra_ID` INT PRIMARY KEY AUTO_INCREMENT,
    `Nombre_Maniobra` VARCHAR(255) NOT NULL,
    `Consumo_Energia` DOUBLE NOT NULL,
    UNIQUE KEY `UK_Maniobras_Nombre` (`Nombre_Maniobra`),
    CHECK (`Consumo_Energia` > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: Montaña
CREATE TABLE `Montaña` (
    `Montaña_ID` INT PRIMARY KEY AUTO_INCREMENT,
    `Nombre_Montaña` VARCHAR(255) NOT NULL,
    `Altura` DOUBLE NOT NULL,
    UNIQUE KEY `UK_Montana_Nombre` (`Nombre_Montaña`),
    CHECK (`Altura` > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: Razas
CREATE TABLE `Razas` (
    `Raza_ID` INT PRIMARY KEY AUTO_INCREMENT,
    `Nombre_Raza` VARCHAR(255) NOT NULL,
    `Habilidad_Principal` VARCHAR(255) NOT NULL,
    UNIQUE KEY `UK_Razas_Nombre` (`Nombre_Raza`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: Planeta
CREATE TABLE `Planeta` (
    `Planeta_ID` INT PRIMARY KEY AUTO_INCREMENT,
    `Nombre_Cientifico` VARCHAR(255) NOT NULL,
    `Nombre_Vulgar` VARCHAR(255) NOT NULL,
    `Poblacion_Total` BIGINT NOT NULL,
    `Coordenadas` VARCHAR(255) NOT NULL,
    `Montaña_ID` INT NOT NULL,
    `Imperio_ID` INT NOT NULL,
    UNIQUE KEY `UK_Planeta_Cientifico` (`Nombre_Cientifico`),
    UNIQUE KEY `UK_Planeta_Vulgar` (`Nombre_Vulgar`),
    FOREIGN KEY (`Montaña_ID`) REFERENCES `Montaña`(`Montaña_ID`) ON DELETE RESTRICT,
    FOREIGN KEY (`Imperio_ID`) REFERENCES `Imperios`(`Imperio_ID`) ON DELETE RESTRICT,
    CHECK (`Poblacion_Total` > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: Capitán
CREATE TABLE `Capitán` (
    `Capitan_ID` INT PRIMARY KEY AUTO_INCREMENT,
    `Nombre_Capitan` VARCHAR(255) NOT NULL,
    `Imperio_ID` INT NOT NULL,
    `Planeta_ID` INT NOT NULL,
    UNIQUE KEY `UK_Capitan_Nombre` (`Nombre_Capitan`),
    FOREIGN KEY (`Imperio_ID`) REFERENCES `Imperios`(`Imperio_ID`) ON DELETE RESTRICT,
    FOREIGN KEY (`Planeta_ID`) REFERENCES `Planeta`(`Planeta_ID`) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: Flotas
CREATE TABLE `Flotas` (
    `Flota_ID` INT PRIMARY KEY AUTO_INCREMENT,
    `Destino` VARCHAR(255) NOT NULL,
    `Misiones` INT NOT NULL,
    `Nave_ID` INT NOT NULL, -- Representative ship, will be updated after Naves are created
    `Imperio_ID` INT NOT NULL,
    FOREIGN KEY (`Imperio_ID`) REFERENCES `Imperios`(`Imperio_ID`) ON DELETE RESTRICT,
    CHECK (`Misiones` >= 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: Naves
CREATE TABLE `Naves` (
    `Nave_ID` INT PRIMARY KEY AUTO_INCREMENT,
    `Nombre` VARCHAR(255) NOT NULL,
    `Velocidad_Max` DOUBLE NOT NULL,
    `Energia_Acumulada` DOUBLE NOT NULL,
    `Capitan_ID` INT NOT NULL,
    `Flota_ID` INT NOT NULL, -- Todas las naves deben pertenecer a una flota
    UNIQUE KEY `UK_Naves_Nombre` (`Nombre`),
    FOREIGN KEY (`Capitan_ID`) REFERENCES `Capitán`(`Capitan_ID`) ON DELETE RESTRICT,
    FOREIGN KEY (`Flota_ID`) REFERENCES `Flotas`(`Flota_ID`) ON DELETE RESTRICT,
    CHECK (`Velocidad_Max` > 0),
    CHECK (`Energia_Acumulada` > 0)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: Planeta_Raza (Many-to-Many junction table)
CREATE TABLE `Planeta_Raza` (
    `Planeta_ID` INT NOT NULL,
    `Raza_ID` INT NOT NULL,
    `Porcentaje_Población` DOUBLE NOT NULL,
    PRIMARY KEY (`Planeta_ID`, `Raza_ID`),
    FOREIGN KEY (`Planeta_ID`) REFERENCES `Planeta`(`Planeta_ID`) ON DELETE CASCADE,
    FOREIGN KEY (`Raza_ID`) REFERENCES `Razas`(`Raza_ID`) ON DELETE CASCADE,
    CHECK (`Porcentaje_Población` >= 0 AND `Porcentaje_Población` <= 100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Table: Nave_Maniobra (Many-to-Many junction table)
CREATE TABLE `Nave_Maniobra` (
    `Nave_ID` INT NOT NULL,
    `Maniobra_ID` INT NOT NULL,
    PRIMARY KEY (`Nave_ID`, `Maniobra_ID`),
    FOREIGN KEY (`Nave_ID`) REFERENCES `Naves`(`Nave_ID`) ON DELETE CASCADE,
    FOREIGN KEY (`Maniobra_ID`) REFERENCES `Maniobras`(`Maniobra_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- Índices adicionales para optimizar consultas
CREATE INDEX `IDX_Planeta_Imperio` ON `Planeta` (`Imperio_ID`);
CREATE INDEX `IDX_Planeta_Montana` ON `Planeta` (`Montaña_ID`);
CREATE INDEX `IDX_Capitan_Imperio` ON `Capitán` (`Imperio_ID`);
CREATE INDEX `IDX_Capitan_Planeta` ON `Capitán` (`Planeta_ID`);
CREATE INDEX `IDX_Flotas_Imperio` ON `Flotas` (`Imperio_ID`);
CREATE INDEX `IDX_Naves_Capitan` ON `Naves` (`Capitan_ID`);
CREATE INDEX `IDX_Naves_Flota` ON `Naves` (`Flota_ID`);
CREATE INDEX `IDX_PlanetaRaza_Raza` ON `Planeta_Raza` (`Raza_ID`);
CREATE INDEX `IDX_NaveManiobra_Maniobra` ON `Nave_Maniobra` (`Maniobra_ID`);

