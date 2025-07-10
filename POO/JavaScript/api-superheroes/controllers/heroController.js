import express from "express";
import { check, validationResult } from 'express-validator';
import heroService from "../services/heroService.js";
import battleService from "../services/battleService.js";
import Hero from "../models/heroModel.js";

const router = express.Router();

/**
 * @swagger
 * /api/heroes:
 *   get:
 *     summary: Obtener todos los héroes con paginación
 *     tags: [Héroes]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Número de página (por defecto 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Número de registros por página (por defecto 10)
 *     responses:
 *       200:
 *         description: Lista de héroes obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Hero'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                       description: Página actual
 *                     totalPages:
 *                       type: integer
 *                       description: Total de páginas
 *                     totalRecords:
 *                       type: integer
 *                       description: Total de registros
 *                     recordsPerPage:
 *                       type: integer
 *                       description: Registros por página
 *                     recordsInCurrentPage:
 *                       type: integer
 *                       description: Registros en la página actual
 *                     hasNextPage:
 *                       type: boolean
 *                       description: Si existe página siguiente
 *                     hasPreviousPage:
 *                       type: boolean
 *                       description: Si existe página anterior
 *                     nextPage:
 *                       type: integer
 *                       nullable: true
 *                       description: Número de la página siguiente
 *                     previousPage:
 *                       type: integer
 *                       nullable: true
 *                       description: Número de la página anterior
 *       500:
 *         description: Error del servidor
 */

router.get("/heroes", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const result = await heroService.getAllHeroes(page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/heroes:
 *   post:
 *     summary: Crear un nuevo héroe
 *     tags: [Héroes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - alias
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre real del héroe
 *               alias:
 *                 type: string
 *                 description: Alias o nombre de superhéroe
 *               city:
 *                 type: string
 *                 description: Ciudad donde opera el héroe
 *               team:
 *                 type: string
 *                 description: Equipo al que pertenece
 *     responses:
 *       201:
 *         description: Héroe creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hero'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/heroes",
    [
        check('name').not().isEmpty().withMessage('El nombre es requerido'),
        check('alias').not().isEmpty().withMessage('El alias es requerido')
    ], 
    async (req, res) => {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({ error : errors.array()})
        }

        try {
            const { name, alias, city, team } = req.body;
            const newHero = new Hero(null, name, alias, city, team);
            const addedHero = await heroService.addHero(newHero);

            res.status(201).json(addedHero);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
});

/**
 * @swagger
 * /api/heroes/{id}:
 *   put:
 *     summary: Actualizar un héroe existente
 *     tags: [Héroes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del héroe a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               alias:
 *                 type: string
 *               city:
 *                 type: string
 *               team:
 *                 type: string
 *     responses:
 *       200:
 *         description: Héroe actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Hero'
 *       404:
 *         description: Héroe no encontrado
 */
router.put("/heroes/:id", async (req, res) => {
    try {
        const updatedHero = await heroService.updateHero(req.params.id, req.body);
        res.json(updatedHero);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/heroes/{id}:
 *   delete:
 *     summary: Eliminar un héroe
 *     tags: [Héroes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del héroe a eliminar
 *     responses:
 *       200:
 *         description: Héroe eliminado exitosamente
 *       404:
 *         description: Héroe no encontrado
 */
router.delete('/heroes/:id', async (req, res) => {
    try {
        const result = await heroService.deleteHero(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }

});

/**
 * @swagger
 * /api/heroes/city/{city}:
 *   get:
 *     summary: Buscar héroes por ciudad
 *     tags: [Héroes]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: Ciudad para buscar héroes
 *     responses:
 *       200:
 *         description: Lista de héroes encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Hero'
 *       500:
 *         description: Error del servidor
 */
router.get('/heroes/city/:city', async (req, res) => {
    try {
        const heroes = await heroService.findHeroesByCity(req.params.city);
        res.json(heroes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/heroes/{id}/enfrentar:
 *   post:
 *     summary: Enfrentar a un héroe contra un villano con sistema de batalla
 *     tags: [Héroes]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del héroe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - villainId
 *               - action
 *             properties:
 *               villainId:
 *                 type: integer
 *                 description: ID del villano a enfrentar
 *               action:
 *                 type: string
 *                 enum: [attack, defense]
 *                 description: Acción del héroe (ataque o defensa)
 *     responses:
 *       200:
 *         description: Resultado del enfrentamiento
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 battle:
 *                   type: object
 *                   properties:
 *                     hero:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         action:
 *                           type: string
 *                         power:
 *                           type: integer
 *                     villain:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         action:
 *                           type: string
 *                         power:
 *                           type: integer
 *                     battleType:
 *                       type: string
 *                     winner:
 *                       type: string
 *                     description:
 *                       type: string
 *       404:
 *         description: Héroe o villano no encontrado
 *       400:
 *         description: Acción inválida
 */
router.post('/heroes/:id/enfrentar', async (req, res) => {
    try {
        const { villainId, action } = req.body;
        
        if (!action || (action !== 'attack' && action !== 'defense')) {
            return res.status(400).json({ 
                error: 'La acción debe ser "attack" o "defense"' 
            });
        }
        
        if (!villainId) {
            return res.status(400).json({ 
                error: 'El ID del villano es requerido' 
            });
        }
        
        const result = await battleService.heroVsVillain(req.params.id, villainId, action);
        res.json(result);
    } catch (err) {
        if (err.message.includes('no encontrado')) {
            res.status(404).json({ error: err.message });
        } else {
            res.status(400).json({ error: err.message });
        }
    }
});

export default router