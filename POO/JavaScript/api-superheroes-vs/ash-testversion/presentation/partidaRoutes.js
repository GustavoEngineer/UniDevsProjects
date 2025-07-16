// Este archivo solo contiene la definición de schemas y documentación Swagger compartida
/**
 * @swagger
 * components:
 *   schemas:
 *     Partida:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID autoincremental de la partida
 *         tipo:
 *           type: string
 *           description: Tipo de partida (1v1 o equipos)
 *         fechaInicio:
 *           type: string
 *           format: date-time
 *           description: Fecha y hora de inicio
 *         personajes:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               id:
 *                 type: string
 *               vida:
 *                 type: integer
 *         historialAcciones:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               fecha:
 *                 type: string
 *                 format: date-time
 *               atacante:
 *                 type: string
 *               defensor:
 *                 type: string
 *               golpe:
 *                 type: string
 *               danio:
 *                 type: integer
 *               vidaRestante:
 *                 type: integer
 */ 