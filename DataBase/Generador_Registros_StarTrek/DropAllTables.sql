USE `startrekjuangustavo`;

-- Deshabilitar verificación de claves foráneas para poder borrar todas las tablas
SET FOREIGN_KEY_CHECKS = 0;

-- Borrar todas las tablas en orden (no importa el orden cuando FOREIGN_KEY_CHECKS = 0)
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

-- Rehabilitar verificación de claves foráneas
SET FOREIGN_KEY_CHECKS = 1;

-- Verificar que todas las tablas han sido borradas
SELECT 'Todas las tablas han sido borradas exitosamente' AS Resultado; 