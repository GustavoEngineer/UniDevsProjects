const EvenOddService = require('../domain/EvenOddService');

class EvenOddUseCase {
  static check(number) {
    return EvenOddService.isEven(number) ? 'par' : 'impar';
  }
}

module.exports = EvenOddUseCase; 