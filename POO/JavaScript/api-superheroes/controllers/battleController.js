import express from "express";
import battleHistoryService from "../services/battleHistoryService.js";

const router = express.Router();

/**
 * @swagger
 * /api/battles:
 *   get:
 *     summary: Obtener todas las batallas con paginación
 *     tags: [Batallas]
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
 *         description: Lista de batallas obtenida exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       hero:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           action:
 *                             type: string
 *                           power:
 *                             type: integer
 *                       villain:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           action:
 *                             type: string
 *                           power:
 *                             type: integer
 *                       battleType:
 *                         type: string
 *                       winner:
 *                         type: string
 *                       description:
 *                         type: string
 *                       timestamp:
 *                         type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalRecords:
 *                       type: integer
 *                     recordsPerPage:
 *                       type: integer
 *                     recordsInCurrentPage:
 *                       type: integer
 *                     hasNextPage:
 *                       type: boolean
 *                     hasPreviousPage:
 *                       type: boolean
 *                     nextPage:
 *                       type: integer
 *                       nullable: true
 *                     previousPage:
 *                       type: integer
 *                       nullable: true
 *       500:
 *         description: Error del servidor
 */
router.get("/battles", async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        
        const result = await battleHistoryService.getAllBattles(page, limit);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router 