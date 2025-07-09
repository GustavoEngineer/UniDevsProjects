/**
 * @swagger
 * /even-odd:
 *   get:
 *     summary: Determina si un número es par o impar
 *     parameters:
 *       - in: query
 *         name: number
 *         schema:
 *           type: integer
 *         required: true
 *         description: El número a evaluar
 *     responses:
 *       200:
 *         description: Resultado de la evaluación
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 number:
 *                   type: integer
 *                 result:
 *                   type: string
 *                   enum: [par, impar]
 *       400:
 *         description: Parámetro inválido o faltante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
const EvenOddUseCase = require('../application/EvenOddUseCase');

class EvenOddController {
  static check(req, res) {
    const { number } = req.query;
    // Validaciones mínimas estrictas
    if (typeof number !== 'string' || !/^-?[0-9]+$/.test(number)) {
      return res.status(400).json({ error: 'No se aceptan números negativos.' });
    }
    const num = Number(number);
    if (num < 0) {
      return res.status(400).json({ error: 'No se aceptan números negativos.' });
    }
    if (!Number.isInteger(num)) {
      return res.status(400).json({ error: 'No se aceptan números negativos.' });
    }
    try {
      const result = EvenOddUseCase.check(num);
      res.json({ number: num, result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = EvenOddController; 