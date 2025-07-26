const HabitacionRepository = require('../../infrastructure/repositories/HabitacionRepository');

class HabitacionService {
  async getAll() {
    return await HabitacionRepository.findAll();
  }

  async getById(id) {
    return await HabitacionRepository.findById(id);
  }

  async create(data) {
    return await HabitacionRepository.create(data);
  }

  async update(id, data) {
    return await HabitacionRepository.update(id, data);
  }

  async delete(id) {
    return await HabitacionRepository.delete(id);
  }
}

module.exports = new HabitacionService(); 