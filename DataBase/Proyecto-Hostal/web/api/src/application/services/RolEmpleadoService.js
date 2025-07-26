const RolEmpleadoRepository = require('../../infrastructure/repositories/RolEmpleadoRepository');

class RolEmpleadoService {
  async getAll() {
    return await RolEmpleadoRepository.findAll();
  }

  async getById(id) {
    return await RolEmpleadoRepository.findById(id);
  }

  async create(data) {
    return await RolEmpleadoRepository.create(data);
  }

  async update(id, data) {
    return await RolEmpleadoRepository.update(id, data);
  }

  async delete(id) {
    return await RolEmpleadoRepository.delete(id);
  }
}

module.exports = new RolEmpleadoService(); 