const EstanciaRepository = require('../../infrastructure/repositories/EstanciaRepository');

class EstanciaService {
  async getAll() {
    return await EstanciaRepository.findAll();
  }

  async getById(id) {
    return await EstanciaRepository.findById(id);
  }

  async create(data) {
    return await EstanciaRepository.create(data);
  }

  async update(id, data) {
    return await EstanciaRepository.update(id, data);
  }

  async delete(id) {
    return await EstanciaRepository.delete(id);
  }
}

module.exports = new EstanciaService(); 