const PagoRepository = require('../../infrastructure/repositories/PagoRepository');
const { filterAuditFields } = require('../utils/auditUtils');

class PagoService {
  async getAll() {
    return await PagoRepository.findAll();
  }

  async getById(id) {
    return await PagoRepository.findById(id);
  }

  async create(data) {
    return await PagoRepository.create(data);
  }

  async update(id, data) {
    // Filtrar campos que no deben modificarse (fechas de auditoría)
    const updateData = filterAuditFields(data);
    return await PagoRepository.update(id, updateData);
  }

  async delete(id) {
    return await PagoRepository.delete(id);
  }
}

module.exports = new PagoService(); 