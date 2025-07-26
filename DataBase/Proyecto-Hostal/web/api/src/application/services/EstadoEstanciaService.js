const EstadoEstanciaRepository = require('../../infrastructure/repositories/EstadoEstanciaRepository');

class EstadoEstanciaService {
  async getAll() {
    return await EstadoEstanciaRepository.findAll();
  }

  async getById(id) {
    return await EstadoEstanciaRepository.findById(id);
  }

  async create(data) {
    return await EstadoEstanciaRepository.create(data);
  }

  async update(id, data) {
    return await EstadoEstanciaRepository.update(id, data);
  }

  async delete(id) {
    return await EstadoEstanciaRepository.delete(id);
  }
}

module.exports = new EstadoEstanciaService(); 