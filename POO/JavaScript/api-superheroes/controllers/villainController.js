import express from "express";
import { check, validationResult } from 'express-validator';
import villainService from "../services/villainService.js";
import battleService from "../services/battleService.js";
import Villain from "../models/villainModel.js";

const router = express.Router();

/**
 * @swagger
 * /api/villains:
 *   get:
 *     summary: Obtener todos los villanos con paginación
 *     tags: [Villanos]
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
 *         description: Lista de villanos obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Villain'
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

router.get("/villains", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const result = await villainService.getAllVillains(page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/villains:
 *   post:
 *     summary: Crear un nuevo villano
 *     tags: [Villanos]
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
 *                 description: Nombre real del villano
 *               alias:
 *                 type: string
 *                 description: Alias o nombre de villano
 *               city:
 *                 type: string
 *                 description: Ciudad donde opera el villano
 *               team:
 *                 type: string
 *                 description: Equipo al que pertenece
 *     responses:
 *       201:
 *         description: Villano creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Villain'
 *       400:
 *         description: Datos inválidos
 *       500:
 *         description: Error del servidor
 */
router.post("/villains",
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
            const newVillain = new Villain(null, name, alias, city, team);
            const addedVillain = await villainService.addVillain(newVillain);

            res.status(201).json(addedVillain);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
});

/**
 * @swagger
 * /api/villains/{id}:
 *   put:
 *     summary: Actualizar un villano existente
 *     tags: [Villanos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del villano a actualizar
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
 *         description: Villano actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Villain'
 *       404:
 *         description: Villano no encontrado
 */
router.put("/villains/:id", async (req, res) => {
    try {
        const updatedVillain = await villainService.updateVillain(req.params.id, req.body);
        res.json(updatedVillain);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/villains/{id}:
 *   delete:
 *     summary: Eliminar un villano
 *     tags: [Villanos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del villano a eliminar
 *     responses:
 *       200:
 *         description: Villano eliminado exitosamente
 *       404:
 *         description: Villano no encontrado
 */
router.delete('/villains/:id', async (req, res) => {
    try {
        const result = await villainService.deleteVillain(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
});

/**
 * @swagger
 * /api/villains/city/{city}:
 *   get:
 *     summary: Buscar villanos por ciudad
 *     tags: [Villanos]
 *     parameters:
 *       - in: path
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         description: Ciudad para buscar villanos
 *     responses:
 *       200:
 *         description: Lista de villanos encontrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Villain'
 *       500:
 *         description: Error del servidor
 */
router.get('/villains/city/:city', async (req, res) => {
    try {
        const villains = await villainService.findVillainsByCity(req.params.city);
        res.json(villains);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/villains/{id}/enfrentar:
 *   post:
 *     summary: Enfrentar a un villano contra un héroe con sistema de batalla
 *     tags: [Villanos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del villano
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - heroId
 *               - action
 *             properties:
 *               heroId:
 *                 type: integer
 *                 description: ID del héroe a enfrentar
 *               action:
 *                 type: string
 *                 enum: [attack, defense]
 *                 description: Acción del villano (ataque o defensa)
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
 *         description: Villano o héroe no encontrado
 *       400:
 *         description: Acción inválida
 */
router.post('/villains/:id/enfrentar', async (req, res) => {
    try {
        const { heroId, action } = req.body;
        
        if (!action || (action !== 'attack' && action !== 'defense')) {
            return res.status(400).json({ 
                error: 'La acción debe ser "attack" o "defense"' 
            });
        }
        
        if (!heroId) {
            return res.status(400).json({ 
                error: 'El ID del héroe es requerido' 
            });
        }
        
        const result = await battleService.villainVsHero(req.params.id, heroId, action);
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