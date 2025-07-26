const TurnoEmpleadoRepository = require('../../infrastructure/repositories/TurnoEmpleadoRepository');

class TurnoEmpleadoService {
  async getAll() {
    return await TurnoEmpleadoRepository.findAll();
  }

  async getById(id) {
    return await TurnoEmpleadoRepository.findById(id);
  }

  async create(data) {
    return await TurnoEmpleadoRepository.create(data);
  }

  async update(id, data) {
    return await TurnoEmpleadoRepository.update(id, data);
  }

  async delete(id) {
    return await TurnoEmpleadoRepository.delete(id);
  }
}

module.exports = new TurnoEmpleadoService(); 