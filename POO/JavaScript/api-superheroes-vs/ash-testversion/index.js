const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

const app = express();
app.use(express.json());

// Swagger definition
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Superhéroes',
    version: '1.0.0',
    description: 'API para gestionar héroes, villanos y más',
  },
};

const personajeRoutes = require('./presentation/personajeRoutes');
const partida1v1Routes = require('./presentation/partida1v1Routes');
const partidaEquipoRoutes = require('./presentation/partidaEquipoRoutes');
// const partidaRoutes = require('./presentation/partidaRoutes'); // Eliminado

const options = {
  swaggerDefinition,
  apis: ['./presentation/personajeRoutes.js', './presentation/partida1v1Routes.js', './presentation/partidaEquipoRoutes.js', './presentation/partidaRoutes.js'], // Documentación en rutas
};

const swaggerSpec = swaggerJSDoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', personajeRoutes);
app.use('/', partida1v1Routes);
app.use('/', partidaEquipoRoutes);
// app.use('/', partidaRoutes); // Eliminado

/**
 * @swagger
 * components:
 *   schemas:
 *     Personaje:
 *       type: object
 *       required:
 *         - nombre
 *         - categoria
 *         - ciudad
 *         - golpeBasico
 *         - golpeEspecial
 *         - golpeCritico
 *       properties:
 *         nombre:
 *           type: string
 *           description: Nombre del personaje
 *         categoria:
 *           type: string
 *           enum: [Heroe, Villano, Antiheroe, Antivillano]
 *           description: Categoría del personaje
 *         ciudad:
 *           type: string
 *           description: Ciudad de origen
 *         golpeBasico:
 *           type: string
 *           description: Nombre del golpe básico
 *         golpeEspecial:
 *           type: string
 *           description: Nombre del golpe especial
 *         golpeCritico:
 *           type: string
 *           description: Nombre del golpe crítico
 *         nivelVida:
 *           type: integer
 *           default: 100
 *           description: Nivel de vida (predeterminado 100)
 */

// Almacenamiento temporal en memoria
const personajes = [];

/**
 * @swagger
 * /personajes:
 *   post:
 *     summary: Crear un nuevo personaje
 *     tags: [Personajes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Personaje'
 *     responses:
 *       201:
 *         description: Personaje creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Personaje'
 *       400:
 *         description: Datos inválidos
 */
app.post('/personajes', (req, res) => {
  const { nombre, categoria, ciudad, golpeBasico, golpeEspecial, golpeCritico, nivelVida } = req.body;
  if (!nombre || !categoria || !ciudad || !golpeBasico || !golpeEspecial || !golpeCritico) {
    return res.status(400).json({ error: 'Faltan datos obligatorios' });
  }
  const personaje = {
    nombre,
    categoria,
    ciudad,
    golpeBasico,
    golpeEspecial,
    golpeCritico,
    nivelVida: nivelVida || 100,
  };
  personajes.push(personaje);
  res.status(201).json(personaje);
});

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
app.get('/personajes', (req, res) => {
  res.json(personajes);
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
  console.log(`Swagger UI disponible en http://localhost:${PORT}/api-docs`);
}); 