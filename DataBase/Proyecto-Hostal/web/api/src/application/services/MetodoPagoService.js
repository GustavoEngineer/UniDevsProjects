const MetodoPagoRepository = require('../../infrastructure/repositories/MetodoPagoRepository');

class MetodoPagoService {
  async getAll() {
    return await MetodoPagoRepository.findAll();
  }

  async getById(id) {
    return await MetodoPagoRepository.findById(id);
  }

  async create(data) {
    return await MetodoPagoRepository.create(data);
  }

  async update(id, data) {
    return await MetodoPagoRepository.update(id, data);
  }

  async delete(id) {
    return await MetodoPagoRepository.delete(id);
  }
}

module.exports = new MetodoPagoService(); 