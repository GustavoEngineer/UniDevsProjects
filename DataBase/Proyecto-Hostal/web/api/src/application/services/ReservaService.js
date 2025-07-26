const ReservaRepository = require('../../infrastructure/repositories/ReservaRepository');
const { filterAuditFields } = require('../utils/auditUtils');

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
    // Filtrar campos que no deben modificarse (fechas de auditoría)
    const updateData = filterAuditFields(data);
    return await ReservaRepository.update(id, updateData);
  }

  async delete(id) {
    return await ReservaRepository.delete(id);
  }
}

module.exports = new ReservaService(); 