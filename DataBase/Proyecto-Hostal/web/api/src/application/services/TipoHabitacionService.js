const TipoHabitacionRepository = require('../../infrastructure/repositories/TipoHabitacionRepository');

class TipoHabitacionService {
  async getAll() {
    return await TipoHabitacionRepository.findAll();
  }

  async getById(id) {
    return await TipoHabitacionRepository.findById(id);
  }

  async create(data) {
    return await TipoHabitacionRepository.create(data);
  }

  async update(id, data) {
    return await TipoHabitacionRepository.update(id, data);
  }

  async delete(id) {
    return await TipoHabitacionRepository.delete(id);
  }
}

module.exports = new TipoHabitacionService(); 