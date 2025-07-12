const express = require('express');
const router = express.Router();
const PartidaService = require('../application/PartidaService');

/**
 * @swagger
 * tags:
 *   name: Partidas1v1
 *   description: Endpoints para partidas 1v1
 */

/**
 * @swagger
 * /partidas/1v1:
 *   post:
 *     summary: Iniciar una partida 1v1 entre dos personajes
 *     tags: [Partidas1v1]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id1
 *               - id2
 *             properties:
 *               id1:
 *                 type: string
 *                 description: ID del primer personaje
 *               id2:
 *                 type: string
 *                 description: ID del segundo personaje
 *     responses:
 *       201:
 *         description: Partida creada y jugada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Partida'
 *       400:
 *         description: Datos inválidos
 */
router.post('/partidas/1v1', (req, res) => {
  const { id1, id2 } = req.body;
  if (!id1 || !id2) {
    return res.status(400).json({ error: 'Faltan datos' });
  }
  try {
    const partida = PartidaService.iniciarPartida1v1(id1, id2);
    res.status(201).json(partida);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @swagger
 * /partidas/historial/1v1:
 *   get:
 *     summary: Obtener el historial de partidas 1v1
 *     tags: [Partidas1v1]
 *     responses:
 *       200:
 *         description: Lista de partidas 1v1
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Partida'
 */
router.get('/partidas/historial/1v1', (req, res) => {
  res.json(PartidaService.getHistorial1v1());
});

module.exports = router; 