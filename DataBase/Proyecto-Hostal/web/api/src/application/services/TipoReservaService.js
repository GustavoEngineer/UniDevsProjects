const TipoReservaRepository = require('../../infrastructure/repositories/TipoReservaRepository');

class TipoReservaService {
  async getAll() {
    return await TipoReservaRepository.findAll();
  }

  async getById(id) {
    return await TipoReservaRepository.findById(id);
  }

  async create(data) {
    return await TipoReservaRepository.create(data);
  }

  async update(id, data) {
    return await TipoReservaRepository.update(id, data);
  }

  async delete(id) {
    return await TipoReservaRepository.delete(id);
  }
}

module.exports = new TipoReservaService(); 