const express = require('express');
const router = express.Router();
const PartidaService = require('../application/PartidaService');

/**
 * @swagger
 * tags:
 *   name: PartidasEquipo
 *   description: Endpoints para partidas en equipo
 */

/**
 * @swagger
 * /partidas/equipos/iniciar:
 *   post:
 *     summary: Iniciar una nueva batalla en equipo por rondas
 *     tags: [PartidasEquipo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - equipo1
 *               - equipo2
 *             properties:
 *               equipo1:
 *                 type: array
 *                 minItems: 3
 *                 maxItems: 3
 *                 description: IDs de los 3 personajes del primer equipo
 *                 items:
 *                   type: string
 *                 example: ["id1", "id2", "id3"]
 *               equipo2:
 *                 type: array
 *                 minItems: 3
 *                 maxItems: 3
 *                 description: IDs de los 3 personajes del segundo equipo
 *                 items:
 *                   type: string
 *                 example: ["id4", "id5", "id6"]
 *           example:
 *             equipo1: ["id1", "id2", "id3"]
 *             equipo2: ["id4", "id5", "id6"]
 *     responses:
 *       201:
 *         description: Partida en curso creada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 partidaId:
 *                   type: string
 *                 equipo1:
 *                   type: array
 *                   items:
 *                     type: string
 *                 equipo2:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Datos inválidos
 */
router.post('/partidas/equipos/iniciar', (req, res) => {
  const { equipo1, equipo2 } = req.body;
  if (!Array.isArray(equipo1) || !Array.isArray(equipo2) || equipo1.length !== 3 || equipo2.length !== 3) {
    return res.status(400).json({ error: 'Debes enviar exactamente 3 IDs para cada equipo' });
  }
  try {
    const partida = PartidaService.iniciarPartidaEquipoEnCurso(equipo1, equipo2);
    res.status(201).json({
      Partida_ID: partida.Partida_ID,
      equipo1: partida.equipo1,
      equipo2: partida.equipo2,
      rounds: partida.rounds
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @swagger
 * /partidas/equipos/round/1:
 *   post:
 *     summary: Jugar el round 1 de una batalla en equipo
 *     tags: [PartidasEquipo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - Partida_ID
 *               - idPersonajeAtacante
 *               - tipoGolpe
 *             properties:
 *               Partida_ID:
 *                 type: string
 *                 description: ID de la partida
 *               idPersonajeAtacante:
 *                 type: string
 *                 description: ID del personaje que ataca (debe ser uno de los primeros de cada equipo)
 *               tipoGolpe:
 *                 type: string
 *                 enum: [golpeBasico, golpeEspecial, golpeCritico]
 *     responses:
 *       200:
 *         description: Resultado del ataque
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 round:
 *                   type: integer
 *                 accion:
 *                   type: object
 *                   properties:
 *                     numeroGolpe:
 *                       type: integer
 *                       description: Número secuencial del golpe (1, 2, 3, etc.)
 *                     atacante:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         nombre:
 *                           type: string
 *                     defensor:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         nombre:
 *                           type: string
 *                     tipoGolpe:
 *                       type: string
 *                       enum: [golpeBasico, golpeEspecial, golpeCritico]
 *                     danio:
 *                       type: integer
 *                     vidaRestante:
 *                       type: integer
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                 defensorPerdio:
 *                   type: boolean
 *                 ganador:
 *                   type: string
 *       400:
 *         description: Datos inválidos
 */
router.post('/partidas/equipos/round/1', async (req, res) => {
  const { Partida_ID, idPersonajeAtacante, tipoGolpe } = req.body;
  try {
    const result = await PartidaService.jugarRoundEquipo(1, Partida_ID, idPersonajeAtacante, tipoGolpe);
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @swagger
 * /partidas/equipos/round/2:
 *   post:
 *     summary: Jugar el round 2 de una batalla en equipo (requiere round 1 completado)
 *     tags: [PartidasEquipo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - partidaId
 *               - idPersonajeAtacante
 *               - tipoGolpe
 *             properties:
 *               partidaId:
 *                 type: string
 *                 description: ID de la partida en curso
 *               idPersonajeAtacante:
 *                 type: string
 *                 description: ID del personaje que ataca (debe ser válido para round 2)
 *               tipoGolpe:
 *                 type: string
 *                 enum: [golpeBasico, golpeEspecial, golpeCritico]
 *                 description: Tipo de golpe a realizar
 *     responses:
 *       200:
 *         description: Resultado del round 2
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 round:
 *                   type: integer
 *                 accion:
 *                   type: object
 *                   properties:
 *                     numeroGolpe:
 *                       type: integer
 *                     atacante:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         nombre:
 *                           type: string
 *                     defensor:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         nombre:
 *                           type: string
 *                     tipoGolpe:
 *                       type: string
 *                     danio:
 *                       type: integer
 *                     vidaRestante:
 *                       type: integer
 *                     timestamp:
 *                       type: string
 *                 defensorPerdio:
 *                   type: boolean
 *                 ganador:
 *                   type: string
 *                 personajesDisponiblesRound2:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       nombre:
 *                         type: string
 *                       equipo:
 *                         type: string
 *                       tipo:
 *                         type: string
 *                         enum: [Sobreviviente Round 1, Siguiente disponible]
 *       400:
 *         description: Datos inválidos o round 1 no completado
 */
router.post('/partidas/equipos/round/2', async (req, res) => {
  const { partidaId, idPersonajeAtacante, tipoGolpe } = req.body;
  
  if (!partidaId || !idPersonajeAtacante || !tipoGolpe) {
    return res.status(400).json({ error: 'Faltan datos obligatorios: partidaId, idPersonajeAtacante, tipoGolpe' });
  }
  
  try {
    const result = await PartidaService.jugarRound2Equipo(partidaId, idPersonajeAtacante, tipoGolpe);
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @swagger
 * /partidas/equipos/round/3:
 *   post:
 *     summary: Jugar el round 3 de una batalla en equipo (requiere round 2 completado)
 *     tags: [PartidasEquipo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - partidaId
 *               - idPersonajeAtacante
 *               - tipoGolpe
 *             properties:
 *               partidaId:
 *                 type: string
 *                 description: ID de la partida en curso
 *               idPersonajeAtacante:
 *                 type: string
 *                 description: ID del personaje que ataca (debe ser válido para round 3)
 *               tipoGolpe:
 *                 type: string
 *                 enum: [golpeBasico, golpeEspecial, golpeCritico]
 *                 description: Tipo de golpe a realizar
 *     responses:
 *       200:
 *         description: Resultado del round 3
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 round:
 *                   type: integer
 *                 accion:
 *                   type: object
 *                   properties:
 *                     numeroGolpe:
 *                       type: integer
 *                       description: Número secuencial del golpe (1, 2, 3, etc.)
 *                     atacante:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         nombre:
 *                           type: string
 *                     defensor:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                         nombre:
 *                           type: string
 *                     tipoGolpe:
 *                       type: string
 *                       enum: [golpeBasico, golpeEspecial, golpeCritico]
 *                     danio:
 *                       type: integer
 *                     vidaRestante:
 *                       type: integer
 *                     timestamp:
 *                       type: string
 *                       format: date-time
 *                 defensorPerdio:
 *                   type: boolean
 *                 ganador:
 *                   type: string
 *                 partidaFinalizada:
 *                   type: boolean
 *                 ganadorFinal:
 *                   type: string
 *                 personajesDisponiblesRound3:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       nombre:
 *                         type: string
 *                       equipo:
 *                         type: string
 *                       tipo:
 *                         type: string
 *       400:
 *         description: Datos inválidos
 */
router.post('/partidas/equipos/round/3', async (req, res) => {
  const { partidaId, idPersonajeAtacante, tipoGolpe } = req.body;
  try {
    const result = await PartidaService.jugarRound3Equipo(partidaId, idPersonajeAtacante, tipoGolpe);
    res.json(result);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @swagger
 * /partidas/historial/equipos:
 *   get:
 *     summary: Obtener el historial de partidas en equipo
 *     tags: [PartidasEquipo]
 *     responses:
 *       200:
 *         description: Lista de partidas en equipo
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Partida'
 */
router.get('/partidas/historial/equipos', (req, res) => {
  res.json(PartidaService.getHistorialEquipos());
});

/**
 * @swagger
 * /partidas/equipos/{Partida_ID}:
 *   get:
 *     summary: Obtener una partida de equipo específica por ID
 *     tags: [PartidasEquipo]
 *     parameters:
 *       - in: path
 *         name: Partida_ID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la partida a obtener
 *     responses:
 *       200:
 *         description: Partida encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 Partida_ID:
 *                   type: string
 *                 tipo:
 *                   type: string
 *                 equipo1:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       nombre:
 *                         type: string
 *                 equipo2:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       nombre:
 *                         type: string
 *                 rounds:
 *                   type: array
 *                 finalizada:
 *                   type: boolean
 *       404:
 *         description: Partida no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Partida no encontrada"
 */
router.get('/partidas/equipos/:Partida_ID', (req, res) => {
  const { Partida_ID } = req.params;
  try {
    const partida = PartidaService.getPartidaById(Partida_ID, 'equipos');
    res.json(partida);
  } catch (error) {
    if (error.message.includes('no encontrada')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

/**
 * @swagger
 * /partidas/equipos/{Partida_ID}:
 *   delete:
 *     summary: Eliminar una partida de equipo por ID
 *     tags: [PartidasEquipo]
 *     parameters:
 *       - in: path
 *         name: Partida_ID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la partida a eliminar
 *     responses:
 *       200:
 *         description: Partida eliminada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Partida eliminada exitosamente"
 *       404:
 *         description: Partida no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Partida no encontrada"
 *       400:
 *         description: Error al eliminar la partida
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
router.delete('/partidas/equipos/:Partida_ID', (req, res) => {
  const { Partida_ID } = req.params;
  try {
    PartidaService.eliminarPartidaEquipo(Partida_ID);
    res.json({ message: 'Partida eliminada exitosamente' });
  } catch (error) {
    if (error.message.includes('no encontrada')) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
});

module.exports = router; 