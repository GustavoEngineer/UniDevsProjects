const HuespedRepository = require('../../infrastructure/repositories/HuespedRepository');
const { filterAuditFields } = require('../utils/auditUtils');

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
    // Filtrar campos que no deben modificarse (fechas de auditoría)
    const updateData = filterAuditFields(data);
    return await HuespedRepository.update(id, updateData);
  }

  async delete(id) {
    return await HuespedRepository.delete(id);
  }
}

module.exports = new HuespedService(); 