const PagoRepository = require('../../infrastructure/repositories/PagoRepository');

class PagoService {
  async getAll() {
    return await PagoRepository.findAll();
  }

  async getById(id) {
    return await PagoRepository.findById(id);
  }

  async create(data) {
    return await PagoRepository.create(data);
  }

  async update(id, data) {
    return await PagoRepository.update(id, data);
  }

  async delete(id) {
    return await PagoRepository.delete(id);
  }
}

module.exports = new PagoService(); 