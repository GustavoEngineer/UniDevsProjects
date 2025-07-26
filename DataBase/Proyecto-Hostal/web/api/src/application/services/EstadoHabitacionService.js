const EstadoHabitacionRepository = require('../../infrastructure/repositories/EstadoHabitacionRepository');

class EstadoHabitacionService {
  async getAll() {
    return await EstadoHabitacionRepository.findAll();
  }

  async getById(id) {
    return await EstadoHabitacionRepository.findById(id);
  }

  async create(data) {
    return await EstadoHabitacionRepository.create(data);
  }

  async update(id, data) {
    return await EstadoHabitacionRepository.update(id, data);
  }

  async delete(id) {
    return await EstadoHabitacionRepository.delete(id);
  }
}

module.exports = new EstadoHabitacionService(); 