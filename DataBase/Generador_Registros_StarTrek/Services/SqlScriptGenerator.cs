using StarTrekDataGenerator.Models.DbModels;
using System.Collections.Generic;
using System.Text;

namespace StarTrekDataGenerator.Services
{
    public class SqlScriptGenerator
    {
        private readonly string _databaseName;

        public SqlScriptGenerator(string databaseName)
        {
            _databaseName = databaseName;
        }

        public string GenerateCreateTablesScript()
        {
            var sb = new StringBuilder();
            sb.AppendLine($"USE `{_databaseName}`;");
            sb.AppendLine();
            sb.AppendLine("-- Drop tables in reverse order of dependencies to avoid foreign key issues");
            sb.AppendLine("SET FOREIGN_KEY_CHECKS = 0;"); // Temporarily disable FK checks for dropping
            sb.AppendLine("DROP TABLE IF EXISTS `Nave_Maniobra`;");
            sb.AppendLine("DROP TABLE IF EXISTS `Planeta_Raza`;");
            sb.AppendLine("DROP TABLE IF EXISTS `Naves`;");
            sb.AppendLine("DROP TABLE IF EXISTS `Flotas`;");
            sb.AppendLine("DROP TABLE IF EXISTS `Capitan`;");
            sb.AppendLine("DROP TABLE IF EXISTS `Planeta`;");
            sb.AppendLine("DROP TABLE IF EXISTS `Razas`;");
            sb.AppendLine("DROP TABLE IF EXISTS `Imperios`;");
            sb.AppendLine("DROP TABLE IF EXISTS `Maniobras`;");
            sb.AppendLine("DROP TABLE IF EXISTS `Montaña`;");
            sb.AppendLine("SET FOREIGN_KEY_CHECKS = 1;"); // Re-enable FK checks

            sb.AppendLine();
            sb.AppendLine("-- Table: Imperios");
            sb.AppendLine("CREATE TABLE `Imperios` (");
            sb.AppendLine("    `Imperio_ID` INT PRIMARY KEY AUTO_INCREMENT,");
            sb.AppendLine("    `Nombre` VARCHAR(255) NOT NULL,");
            sb.AppendLine("    `Temperatura_Promedio` DOUBLE NOT NULL,");
            sb.AppendLine("    UNIQUE KEY `UK_Imperios_Nombre` (`Nombre`),");
            sb.AppendLine("    CHECK (`Temperatura_Promedio` BETWEEN -100 AND 100)");
            sb.AppendLine(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
            sb.AppendLine();

            sb.AppendLine("-- Table: Maniobras");
            sb.AppendLine("CREATE TABLE `Maniobras` (");
            sb.AppendLine("    `Maniobra_ID` INT PRIMARY KEY AUTO_INCREMENT,");
            sb.AppendLine("    `Nombre_Maniobra` VARCHAR(255) NOT NULL,");
            sb.AppendLine("    `Consumo_Energia` DOUBLE NOT NULL,");
            sb.AppendLine("    UNIQUE KEY `UK_Maniobras_Nombre` (`Nombre_Maniobra`),");
            sb.AppendLine("    CHECK (`Consumo_Energia` > 0)");
            sb.AppendLine(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
            sb.AppendLine();

            sb.AppendLine("-- Table: Montaña");
            sb.AppendLine("CREATE TABLE `Montaña` (");
            sb.AppendLine("    `Montaña_ID` INT PRIMARY KEY AUTO_INCREMENT,");
            sb.AppendLine("    `Nombre_Montaña` VARCHAR(255) NOT NULL,");
            sb.AppendLine("    `Altura` DOUBLE NOT NULL,");
            sb.AppendLine("    UNIQUE KEY `UK_Montana_Nombre` (`Nombre_Montaña`),");
            sb.AppendLine("    CHECK (`Altura` > 0)");
            sb.AppendLine(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
            sb.AppendLine();

            sb.AppendLine("-- Table: Razas");
            sb.AppendLine("CREATE TABLE `Razas` (");
            sb.AppendLine("    `Raza_ID` INT PRIMARY KEY AUTO_INCREMENT,");
            sb.AppendLine("    `Nombre_Raza` VARCHAR(255) NOT NULL,");
            sb.AppendLine("    `Habilidad_Principal` VARCHAR(255) NOT NULL,");
            sb.AppendLine("    UNIQUE KEY `UK_Razas_Nombre` (`Nombre_Raza`)");
            sb.AppendLine(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
            sb.AppendLine();

            sb.AppendLine("-- Table: Planeta");
            sb.AppendLine("CREATE TABLE `Planeta` (");
            sb.AppendLine("    `Planeta_ID` INT PRIMARY KEY AUTO_INCREMENT,");
            sb.AppendLine("    `Nombre_Cientifico` VARCHAR(255) NOT NULL,");
            sb.AppendLine("    `Nombre_Vulgar` VARCHAR(255) NOT NULL,");
            sb.AppendLine("    `Poblacion_Total` BIGINT NOT NULL,");
            sb.AppendLine("    `Coordenadas` VARCHAR(255) NOT NULL,");
            sb.AppendLine("    `Montaña_ID` INT NOT NULL,");
            sb.AppendLine("    `Imperio_ID` INT NOT NULL,");
            sb.AppendLine("    UNIQUE KEY `UK_Planeta_Cientifico` (`Nombre_Cientifico`),");
            sb.AppendLine("    UNIQUE KEY `UK_Planeta_Vulgar` (`Nombre_Vulgar`),");
            sb.AppendLine("    FOREIGN KEY (`Montaña_ID`) REFERENCES `Montaña`(`Montaña_ID`) ON DELETE RESTRICT,");
            sb.AppendLine("    FOREIGN KEY (`Imperio_ID`) REFERENCES `Imperios`(`Imperio_ID`) ON DELETE RESTRICT,");
            sb.AppendLine("    CHECK (`Poblacion_Total` > 0)");
            sb.AppendLine(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
            sb.AppendLine();

            sb.AppendLine("-- Table: Capitán");
            sb.AppendLine("CREATE TABLE `Capitán` (");
            sb.AppendLine("    `Capitan_ID` INT PRIMARY KEY AUTO_INCREMENT,");
            sb.AppendLine("    `Nombre_Capitan` VARCHAR(255) NOT NULL,");
            sb.AppendLine("    `Imperio_ID` INT NOT NULL,");
            sb.AppendLine("    `Planeta_ID` INT NOT NULL,");
            sb.AppendLine("    UNIQUE KEY `UK_Capitan_Nombre` (`Nombre_Capitan`),");
            sb.AppendLine("    FOREIGN KEY (`Imperio_ID`) REFERENCES `Imperios`(`Imperio_ID`) ON DELETE RESTRICT,");
            sb.AppendLine("    FOREIGN KEY (`Planeta_ID`) REFERENCES `Planeta`(`Planeta_ID`) ON DELETE RESTRICT");
            sb.AppendLine(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
            sb.AppendLine();

            sb.AppendLine("-- Table: Flotas");
            sb.AppendLine("CREATE TABLE `Flotas` (");
            sb.AppendLine("    `Flota_ID` INT PRIMARY KEY AUTO_INCREMENT,");
            sb.AppendLine("    `Destino` VARCHAR(255) NOT NULL,");
            sb.AppendLine("    `Misiones` INT NOT NULL,");
            sb.AppendLine("    `Nave_ID` INT NOT NULL, -- Representative ship, will be updated after Naves are created");
            sb.AppendLine("    `Imperio_ID` INT NOT NULL,");
            sb.AppendLine("    FOREIGN KEY (`Imperio_ID`) REFERENCES `Imperios`(`Imperio_ID`) ON DELETE RESTRICT,");
            sb.AppendLine("    CHECK (`Misiones` >= 0)");
            sb.AppendLine(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
            sb.AppendLine();

            sb.AppendLine("-- Table: Naves");
            sb.AppendLine("CREATE TABLE `Naves` (");
            sb.AppendLine("    `Nave_ID` INT PRIMARY KEY AUTO_INCREMENT,");
            sb.AppendLine("    `Nombre` VARCHAR(255) NOT NULL,");
            sb.AppendLine("    `Velocidad_Max` DOUBLE NOT NULL,");
            sb.AppendLine("    `Energia_Acumulada` DOUBLE NOT NULL,");
            sb.AppendLine("    `Capitan_ID` INT NOT NULL,");
            sb.AppendLine("    `Flota_ID` INT NOT NULL, -- Todas las naves deben pertenecer a una flota");
            sb.AppendLine("    UNIQUE KEY `UK_Naves_Nombre` (`Nombre`),");
            sb.AppendLine("    FOREIGN KEY (`Capitan_ID`) REFERENCES `Capitán`(`Capitan_ID`) ON DELETE RESTRICT,");
            sb.AppendLine("    FOREIGN KEY (`Flota_ID`) REFERENCES `Flotas`(`Flota_ID`) ON DELETE RESTRICT,");
            sb.AppendLine("    CHECK (`Velocidad_Max` > 0),");
            sb.AppendLine("    CHECK (`Energia_Acumulada` > 0)");
            sb.AppendLine(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
            sb.AppendLine();

            sb.AppendLine("-- Table: Planeta_Raza (Many-to-Many junction table)");
            sb.AppendLine("CREATE TABLE `Planeta_Raza` (");
            sb.AppendLine("    `Planeta_ID` INT NOT NULL,");
            sb.AppendLine("    `Raza_ID` INT NOT NULL,");
            sb.AppendLine("    `Porcentaje_Población` DOUBLE NOT NULL,");
            sb.AppendLine("    PRIMARY KEY (`Planeta_ID`, `Raza_ID`),");
            sb.AppendLine("    FOREIGN KEY (`Planeta_ID`) REFERENCES `Planeta`(`Planeta_ID`) ON DELETE CASCADE,");
            sb.AppendLine("    FOREIGN KEY (`Raza_ID`) REFERENCES `Razas`(`Raza_ID`) ON DELETE CASCADE,");
            sb.AppendLine("    CHECK (`Porcentaje_Población` >= 0 AND `Porcentaje_Población` <= 100)");
            sb.AppendLine(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
            sb.AppendLine();

            sb.AppendLine("-- Table: Nave_Maniobra (Many-to-Many junction table)");
            sb.AppendLine("CREATE TABLE `Nave_Maniobra` (");
            sb.AppendLine("    `Nave_ID` INT NOT NULL,");
            sb.AppendLine("    `Maniobra_ID` INT NOT NULL,");
            sb.AppendLine("    PRIMARY KEY (`Nave_ID`, `Maniobra_ID`),");
            sb.AppendLine("    FOREIGN KEY (`Nave_ID`) REFERENCES `Naves`(`Nave_ID`) ON DELETE CASCADE,");
            sb.AppendLine("    FOREIGN KEY (`Maniobra_ID`) REFERENCES `Maniobras`(`Maniobra_ID`) ON DELETE CASCADE");
            sb.AppendLine(") ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;");
            sb.AppendLine();

            // Agregar índices adicionales para mejorar el rendimiento
            sb.AppendLine("-- Índices adicionales para optimizar consultas");
            sb.AppendLine("CREATE INDEX `IDX_Planeta_Imperio` ON `Planeta` (`Imperio_ID`);");
            sb.AppendLine("CREATE INDEX `IDX_Planeta_Montana` ON `Planeta` (`Montaña_ID`);");
            sb.AppendLine("CREATE INDEX `IDX_Capitan_Imperio` ON `Capitán` (`Imperio_ID`);");
            sb.AppendLine("CREATE INDEX `IDX_Capitan_Planeta` ON `Capitán` (`Planeta_ID`);");
            sb.AppendLine("CREATE INDEX `IDX_Flotas_Imperio` ON `Flotas` (`Imperio_ID`);");
            sb.AppendLine("CREATE INDEX `IDX_Naves_Capitan` ON `Naves` (`Capitan_ID`);");
            sb.AppendLine("CREATE INDEX `IDX_Naves_Flota` ON `Naves` (`Flota_ID`);");
            sb.AppendLine("CREATE INDEX `IDX_PlanetaRaza_Raza` ON `Planeta_Raza` (`Raza_ID`);");
            sb.AppendLine("CREATE INDEX `IDX_NaveManiobra_Maniobra` ON `Nave_Maniobra` (`Maniobra_ID`);");
            sb.AppendLine();

            return sb.ToString();
        }

        public string GenerateInsertStatements(GeneratedData data)
        {
            var sb = new StringBuilder();
            sb.AppendLine($"USE `{_databaseName}`;");
            sb.AppendLine();
            sb.AppendLine("SET FOREIGN_KEY_CHECKS = 0;"); // Temporarily disable FK checks for bulk inserts
            sb.AppendLine();

            // Imperios
            sb.AppendLine("-- Insert data into Imperios");
            foreach (var item in data.Imperios)
            {
                sb.AppendLine($"INSERT INTO `Imperios` (`Imperio_ID`, `Nombre`, `Temperatura_Promedio`) VALUES ({item.Imperio_ID}, '{EscapeSqlString(item.Nombre)}', {item.Temperatura_Promedio});");
            }
            sb.AppendLine();

            // Maniobras
            sb.AppendLine("-- Insert data into Maniobras");
            foreach (var item in data.Maniobras)
            {
                sb.AppendLine($"INSERT INTO `Maniobras` (`Maniobra_ID`, `Nombre_Maniobra`, `Consumo_Energia`) VALUES ({item.Maniobra_ID}, '{EscapeSqlString(item.Nombre_Maniobra)}', {item.Consumo_Energia});");
            }
            sb.AppendLine();

            // Montaña
            sb.AppendLine("-- Insert data into Montaña");
            foreach (var item in data.Montanas)
            {
                sb.AppendLine($"INSERT INTO `Montaña` (`Montaña_ID`, `Nombre_Montaña`, `Altura`) VALUES ({item.Montana_ID}, '{EscapeSqlString(item.Nombre_Montana)}', {item.Altura});");
            }
            sb.AppendLine();

            // Razas
            sb.AppendLine("-- Insert data into Razas");
            foreach (var item in data.Razas)
            {
                sb.AppendLine($"INSERT INTO `Razas` (`Raza_ID`, `Nombre_Raza`, `Habilidad_Principal`) VALUES ({item.Raza_ID}, '{EscapeSqlString(item.Nombre_Raza)}', '{EscapeSqlString(item.Habilidad_Principal)}');");
            }
            sb.AppendLine();

            // Planeta
            sb.AppendLine("-- Insert data into Planeta");
            foreach (var item in data.Planetas)
            {
                sb.AppendLine($"INSERT INTO `Planeta` (`Planeta_ID`, `Nombre_Cientifico`, `Nombre_Vulgar`, `Poblacion_Total`, `Coordenadas`, `Montaña_ID`, `Imperio_ID`) VALUES ({item.Planeta_ID}, '{EscapeSqlString(item.Nombre_Cientifico)}', '{EscapeSqlString(item.Nombre_Vulgar)}', {item.Poblacion_Total}, '{EscapeSqlString(item.Coordenadas)}', {item.Montana_ID}, {item.Imperio_ID});");
            }
            sb.AppendLine();

            // Capitan
            sb.AppendLine("-- Insert data into Capitán");
            foreach (var item in data.Capitanes)
            {
                sb.AppendLine($"INSERT INTO `Capitán` (`Capitan_ID`, `Nombre_Capitan`, `Imperio_ID`, `Planeta_ID`) VALUES ({item.Capitan_ID}, '{EscapeSqlString(item.Nombre_Capitan)}', {item.Imperio_ID}, {item.Planeta_ID});");
            }
            sb.AppendLine();

            // Flotas
            sb.AppendLine("-- Insert data into Flotas");
            foreach (var item in data.Flotas)
            {
                sb.AppendLine($"INSERT INTO `Flotas` (`Flota_ID`, `Destino`, `Misiones`, `Nave_ID`, `Imperio_ID`) VALUES ({item.Flota_ID}, '{EscapeSqlString(item.Destino)}', {item.Misiones}, {item.Nave_ID}, {item.Imperio_ID});");
            }
            sb.AppendLine();

            // Naves
            sb.AppendLine("-- Insert data into Naves");
            foreach (var item in data.Naves)
            {
                // Ahora Flota_ID siempre debe tener un valor
                sb.AppendLine($"INSERT INTO `Naves` (`Nave_ID`, `Nombre`, `Velocidad_Max`, `Energia_Acumulada`, `Capitan_ID`, `Flota_ID`) VALUES ({item.Nave_ID}, '{EscapeSqlString(item.Nombre)}', {item.Velocidad_Max}, {item.Energia_Acumulada}, {item.Capitan_ID}, {item.Flota_ID});");
            }
            sb.AppendLine();

            // Planeta_Raza
            sb.AppendLine("-- Insert data into Planeta_Raza");
            foreach (var item in data.PlanetasRazas)
            {
                sb.AppendLine($"INSERT INTO `Planeta_Raza` (`Planeta_ID`, `Raza_ID`, `Porcentaje_Población`) VALUES ({item.Planeta_ID}, {item.Raza_ID}, {item.Porcentaje_Poblacion});");
            }
            sb.AppendLine();

            // Nave_Maniobra
            sb.AppendLine("-- Insert data into Nave_Maniobra");
            foreach (var item in data.NavesManiobras)
            {
                sb.AppendLine($"INSERT INTO `Nave_Maniobra` (`Nave_ID`, `Maniobra_ID`) VALUES ({item.Nave_ID}, {item.Maniobra_ID});");
            }
            sb.AppendLine();

            sb.AppendLine("SET FOREIGN_KEY_CHECKS = 1;"); // Re-enable FK checks
            sb.AppendLine();

            // Agregar validaciones adicionales después de la inserción
            sb.AppendLine("-- Validaciones adicionales para asegurar integridad de datos");
            sb.AppendLine("-- Verificar que todos los capitanes tengan un imperio válido");
            sb.AppendLine("SELECT COUNT(*) as CapitanesSinImperio FROM `Capitán` c");
            sb.AppendLine("LEFT JOIN `Imperios` i ON c.Imperio_ID = i.Imperio_ID");
            sb.AppendLine("WHERE i.Imperio_ID IS NULL;");
            sb.AppendLine();

            sb.AppendLine("-- Verificar que todos los planetas tengan una montaña válida");
            sb.AppendLine("SELECT COUNT(*) as PlanetasSinMontana FROM `Planeta` p");
            sb.AppendLine("LEFT JOIN `Montaña` m ON p.Montaña_ID = m.Montaña_ID");
            sb.AppendLine("WHERE m.Montaña_ID IS NULL;");
            sb.AppendLine();

            sb.AppendLine("-- Verificar que todas las naves tengan un capitán válido");
            sb.AppendLine("SELECT COUNT(*) as NavesSinCapitan FROM `Naves` n");
            sb.AppendLine("LEFT JOIN `Capitán` c ON n.Capitan_ID = c.Capitan_ID");
            sb.AppendLine("WHERE c.Capitan_ID IS NULL;");
            sb.AppendLine();

            sb.AppendLine("-- Verificar que todas las naves tengan una flota válida");
            sb.AppendLine("SELECT COUNT(*) as NavesSinFlota FROM `Naves` n");
            sb.AppendLine("LEFT JOIN `Flotas` f ON n.Flota_ID = f.Flota_ID");
            sb.AppendLine("WHERE f.Flota_ID IS NULL;");
            sb.AppendLine();

            return sb.ToString();
        }

        private string? EscapeSqlString(string? value)
        {
            return value?.Replace("'", "''");
        }
    }
}