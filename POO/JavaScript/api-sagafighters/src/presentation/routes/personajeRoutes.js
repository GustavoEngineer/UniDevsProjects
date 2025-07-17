const express = require('express');
const router = express.Router();
const repo = require('../../infrastructure/repositories/PersonajeRepository');

/**
 * @swagger
 * components:
 *   schemas:
 *     Personaje:
 *       type: object
 *       properties:
 *         PersonajeID:
 *           type: integer
 *           description: ID único autoincremental
 *         Nombre:
 *           type: string
 *         Ciudad:
 *           type: string
 *         Categoria:
 *           type: string
 *           enum: [Héroe, Villano, Antihéroe, Antivillano]
 *         Saga:
 *           type: string
 *         Vida:
 *           type: integer
 *           minimum: 0
 *           maximum: 100
 *           description: HP máximo es 100. Definido por el juego.
 *         Energia:
 *           type: integer
 *           minimum: 0
 *           maximum: 100
 *           description: Definido por el juego.
 *         Combo:
 *           type: integer
 *           description: Definido por el juego.
 *         Ultra:
 *           type: integer
 *           minimum: 0
 *           maximum: 100
 *           description: Definido por el juego.
 *         Estado:
 *           type: string
 *           enum: [Normal, Aturdido, Cansado, Potenciado]
 *           description: Definido por el juego.
 *         combo1Name:
 *           type: string
 *           description: Nombre del combo menos poderoso
 *         combo2Name:
 *           type: string
 *           description: Nombre del combo intermedio
 *         combo3Name:
 *           type: string
 *           description: Nombre del combo más poderoso
 *         ultraName:
 *           type: string
 *           description: Nombre del ultra, el movimiento más poderoso
 *       required:
 *         - Nombre
 *         - Ciudad
 *         - Categoria
 *         - Saga
 *         - combo1Name
 *         - combo2Name
 *         - combo3Name
 *         - ultraName
 *
 *     PersonajeInput:
 *       type: object
 *       properties:
 *         Nombre:
 *           type: string
 *         Ciudad:
 *           type: string
 *         Categoria:
 *           type: string
 *           enum: [Héroe, Villano, Antihéroe, Antivillano]
 *         Saga:
 *           type: string
 *         combo1Name:
 *           type: string
 *         combo2Name:
 *           type: string
 *         combo3Name:
 *           type: string
 *         ultraName:
 *           type: string
 *       required:
 *         - Nombre
 *         - Ciudad
 *         - Categoria
 *         - Saga
 *         - combo1Name
 *         - combo2Name
 *         - combo3Name
 *         - ultraName
 *       example:
 *         Nombre: "Spider-Man"
 *         Ciudad: "Nueva York"
 *         Categoria: "Héroe"
 *         Saga: "Marvel"
 *         combo1Name: "Patada Araña"
 *         combo2Name: "Red de Impacto"
 *         combo3Name: "Golpe Acrobático"
 *         ultraName: "Sentido Arácnido Supremo"
 */

/**
 * @swagger
 * tags:
 *   - name: Personaje
 *     description: Personajes del sistema. Los campos numéricos deben ser enteros positivos. Los campos string solo aceptan letras y espacios.
 */

/**
 * @swagger
 * /api/personajes:
 *   get:
 *     summary: Obtener todos los personajes (con filtros opcionales)
 *     tags: [Personaje]
 *     parameters:
 *       - in: query
 *         name: Categoria
 *         schema:
 *           type: string
 *           enum: [Héroe, Villano, Antihéroe, Antivillano]
 *         description: Filtrar por categoría
 *       - in: query
 *         name: Saga
 *         schema:
 *           type: string
 *         description: Filtrar por saga
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
function publicPersonajeView(personaje) {
  return {
    PersonajeID: personaje.PersonajeID,
    Nombre: personaje.Nombre,
    Ciudad: personaje.Ciudad,
    Categoria: personaje.Categoria,
    Saga: personaje.Saga
  };
}

// Utilidad para validar enteros positivos estrictos
function esEnteroPositivo(valor) {
  return typeof valor === 'number' && Number.isInteger(valor) && valor > 0;
}
// Utilidad para validar string solo letras y espacios
function esStringLetras(valor) {
  return typeof valor === 'string' && /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]+$/.test(valor.trim());
}

router.get('/api/personajes', (req, res) => {
  try {
    const { Categoria, Saga } = req.query;
    const personajes = repo.getAll({ Categoria, Saga }).map(publicPersonajeView);
    res.json(personajes);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener personajes', message: err.message });
  }
});

/**
 * @swagger
 * /api/personajes/sagas:
 *   get:
 *     summary: Obtener todas las sagas únicas registradas
 *     tags: [Personaje]
 *     responses:
 *       200:
 *         description: Lista de sagas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: string
 */
router.get('/api/personajes/sagas', (req, res) => {
  try {
    const personajes = repo.getAll();
    const sagas = [...new Set(personajes.map(p => p.Saga))].filter(Boolean);
    res.json(sagas);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener sagas', message: err.message });
  }
});

/**
 * @swagger
 * /api/personajes/{id}:
 *   get:
 *     summary: Obtener un personaje por ID
 *     tags: [Personaje]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
router.get('/api/personajes/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const personaje = repo.getById(id);
    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }
    res.json(publicPersonajeView(personaje));
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener personaje', message: err.message });
  }
});

/**
 * @swagger
 * /api/personajes:
 *   post:
 *     summary: Crear un nuevo personaje
 *     tags: [Personaje]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PersonajeInput'
 *     responses:
 *       201:
 *         description: Personaje creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personaje'
 *       400:
 *         description: Error de validación
 */
router.post('/api/personajes', (req, res) => {
  try {
    const { Nombre, Ciudad, Categoria, Saga, combo1Name, combo2Name, combo3Name, ultraName } = req.body;
    if (!esStringLetras(Nombre) || !esStringLetras(Ciudad) || !esStringLetras(Categoria) || !esStringLetras(Saga) || !esStringLetras(combo1Name) || !esStringLetras(combo2Name) || !esStringLetras(combo3Name) || !esStringLetras(ultraName)) {
      return res.status(400).json({ error: 'Todos los campos deben ser solo letras y espacios.' });
    }
    const personaje = repo.create(req.body);
    res.status(201).json(personaje);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear personaje', message: err.message });
  }
});

/**
 * @swagger
 * /api/personajes/{id}:
 *   put:
 *     summary: Actualizar un personaje existente
 *     tags: [Personaje]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Personaje no encontrado
 */
router.put('/api/personajes/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { Nombre, Ciudad, Categoria, Saga, combo1Name, combo2Name, combo3Name, ultraName } = req.body;
    if (!esEnteroPositivo(id)) {
      return res.status(400).json({ error: 'El ID debe ser un entero positivo.' });
    }
    if (!esStringLetras(Nombre) || !esStringLetras(Ciudad) || !esStringLetras(Categoria) || !esStringLetras(Saga) || !esStringLetras(combo1Name) || !esStringLetras(combo2Name) || !esStringLetras(combo3Name) || !esStringLetras(ultraName)) {
      return res.status(400).json({ error: 'Todos los campos deben ser solo letras y espacios.' });
    }
    const personaje = repo.update(id, req.body);
    if (!personaje) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }
    res.json(personaje);
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar personaje', message: err.message });
  }
});

/**
 * @swagger
 * /api/personajes/{id}:
 *   delete:
 *     summary: Eliminar un personaje por ID
 *     tags: [Personaje]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del personaje
 *     responses:
 *       200:
 *         description: Personaje eliminado
 *       404:
 *         description: Personaje no encontrado
 */
router.delete('/api/personajes/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const ok = repo.delete(id);
    if (!ok) {
      return res.status(404).json({ error: 'Personaje no encontrado' });
    }
    res.json({ mensaje: 'Personaje eliminado' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar personaje', message: err.message });
  }
});

module.exports = router; 