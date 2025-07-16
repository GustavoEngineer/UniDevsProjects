const express = require('express');
const router = express.Router();
const service = require('../application/PersonajeService');

/**
 * @swagger
 * components:
 *   schemas:
 *     Personaje:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           readOnly: true
 *         nombre:
 *           type: string
 *         categoria:
 *           type: string
 *           enum: [Heroe, Villano, Antiheroe, Antivillano]
 *         ciudad:
 *           type: string
 *         golpeBasico:
 *           type: string
 *         golpeEspecial:
 *           type: string
 *         golpeCritico:
 *           type: string
 *         nivelVida:
 *           type: integer
 *           default: 100
 *         nivelPoder:
 *           type: string
 *           enum: [Alfa, beta, omega]
 *           description: Nivel de poder del personaje según su vida
 *
 *   requestBodies:
 *     PersonajeInput:
 *       description: Datos para crear un personaje (sin id)
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - categoria
 *               - ciudad
 *               - golpeBasico
 *               - golpeEspecial
 *               - golpeCritico
 *             properties:
 *               nombre:
 *                 type: string
 *               categoria:
 *                 type: string
 *                 enum: [Heroe, Villano, Antiheroe, Antivillano]
 *               ciudad:
 *                 type: string
 *               golpeBasico:
 *                 type: string
 *               golpeEspecial:
 *                 type: string
 *               golpeCritico:
 *                 type: string
 *               nivelVida:
 *                 type: integer
 *                 default: 100
 */

/**
 * @swagger
 * /personajes:
 *   get:
 *     summary: Obtener todos los personajes
 *     tags: [Personajes]
 *     responses:
 *       200:
 *         description: Lista de personajes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Personaje'
 */
router.get('/personajes', (req, res) => {
  res.json(service.getAll());
});

/**
 * @swagger
 * /personajes/{id}:
 *   get:
 *     summary: Obtener un personaje por ID
 *     tags: [Personajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID del personaje
 *     responses:
 *       200:
 *         description: Personaje encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personaje'
 *       404:
 *         description: Personaje no encontrado
 */
router.get('/personajes/:id', (req, res) => {
  const personaje = service.getById(req.params.id);
  if (!personaje) return res.status(404).json({ error: 'No encontrado' });
  res.json(personaje);
});

/**
 * @swagger
 * /personajes:
 *   post:
 *     summary: Crear un nuevo personaje
 *     tags: [Personajes]
 *     requestBody:
 *       $ref: '#/components/requestBodies/PersonajeInput'
 *     responses:
 *       201:
 *         description: Personaje creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personaje'
 *       400:
 *         description: Datos inválidos
 */
router.post('/personajes', (req, res) => {
  // Eliminar id si viene en el body
  if ('id' in req.body) delete req.body.id;
  try {
    const personaje = service.create(req.body);
    res.status(201).json(personaje);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

/**
 * @swagger
 * /personajes/{id}:
 *   put:
 *     summary: Actualizar un personaje por ID
 *     tags: [Personajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID del personaje
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Personaje'
 *     responses:
 *       200:
 *         description: Personaje actualizado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personaje'
 *       404:
 *         description: Personaje no encontrado
 */
router.put('/personajes/:id', (req, res) => {
  const personaje = service.update(req.params.id, req.body);
  if (!personaje) return res.status(404).json({ error: 'No encontrado' });
  res.json(personaje);
});

/**
 * @swagger
 * /personajes/{id}:
 *   delete:
 *     summary: Eliminar un personaje por ID
 *     tags: [Personajes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: number
 *         required: true
 *         description: ID del personaje
 *     responses:
 *       204:
 *         description: Eliminado exitosamente
 *       404:
 *         description: Personaje no encontrado
 */
router.delete('/personajes/:id', (req, res) => {
  const ok = service.delete(req.params.id);
  if (!ok) return res.status(404).json({ error: 'No encontrado' });
  res.status(204).send();
});

module.exports = router; 