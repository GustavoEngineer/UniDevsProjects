const MantenimientoRepository = require('../../infrastructure/repositories/MantenimientoRepository');

class MantenimientoService {
  async getAll() {
    return await MantenimientoRepository.findAll();
  }

  async getById(id) {
    return await MantenimientoRepository.findById(id);
  }

  async create(data) {
    return await MantenimientoRepository.create(data);
  }

  async update(id, data) {
    return await MantenimientoRepository.update(id, data);
  }

  async delete(id) {
    return await MantenimientoRepository.delete(id);
  }
}

module.exports = new MantenimientoService(); 