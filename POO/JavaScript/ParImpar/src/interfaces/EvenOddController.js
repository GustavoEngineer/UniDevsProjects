const EvenOddUseCase = require('../application/EvenOddUseCase');

class EvenOddController {
  static check(req, res) {
    const { number } = req.query;
    const num = Number(number);
    try {
      const result = EvenOddUseCase.check(num);
      res.json({ number: num, result });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
}

module.exports = EvenOddController; 