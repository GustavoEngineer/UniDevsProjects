const ReservaRepository = require('../../infrastructure/repositories/ReservaRepository');

class ReservaService {
  async getAll() {
    return await ReservaRepository.findAll();
  }

  async getById(id) {
    return await ReservaRepository.findById(id);
  }

  async create(data) {
    return await ReservaRepository.create(data);
  }

  async update(id, data) {
    return await ReservaRepository.update(id, data);
  }

  async delete(id) {
    return await ReservaRepository.delete(id);
  }
}

module.exports = new ReservaService(); 