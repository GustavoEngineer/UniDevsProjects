const EstadoMantenimientoRepository = require('../../infrastructure/repositories/EstadoMantenimientoRepository');

class EstadoMantenimientoService {
  async getAll() {
    return await EstadoMantenimientoRepository.findAll();
  }

  async getById(id) {
    return await EstadoMantenimientoRepository.findById(id);
  }

  async create(data) {
    return await EstadoMantenimientoRepository.create(data);
  }

  async update(id, data) {
    return await EstadoMantenimientoRepository.update(id, data);
  }

  async delete(id) {
    return await EstadoMantenimientoRepository.delete(id);
  }
}

module.exports = new EstadoMantenimientoService(); 