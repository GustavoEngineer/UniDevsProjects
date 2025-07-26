const EmpleadoRepository = require('../../infrastructure/repositories/EmpleadoRepository');

class EmpleadoService {
  async getAll() {
    return await EmpleadoRepository.findAll();
  }

  async getById(id) {
    return await EmpleadoRepository.findById(id);
  }

  async create(data) {
    return await EmpleadoRepository.create(data);
  }

  async update(id, data) {
    return await EmpleadoRepository.update(id, data);
  }

  async delete(id) {
    return await EmpleadoRepository.delete(id);
  }
}

module.exports = new EmpleadoService(); 