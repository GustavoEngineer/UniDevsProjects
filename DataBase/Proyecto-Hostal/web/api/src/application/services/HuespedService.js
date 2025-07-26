const HuespedRepository = require('../../infrastructure/repositories/HuespedRepository');

class HuespedService {
  async getAll() {
    return await HuespedRepository.findAll();
  }

  async getById(id) {
    return await HuespedRepository.findById(id);
  }

  async create(data) {
    return await HuespedRepository.create(data);
  }

  async update(id, data) {
    return await HuespedRepository.update(id, data);
  }

  async delete(id) {
    return await HuespedRepository.delete(id);
  }
}

module.exports = new HuespedService(); 