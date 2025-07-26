const EmpleadoRepository = require('../../infrastructure/repositories/EmpleadoRepository');
const { filterAuditFields } = require('../utils/auditUtils');

class EmpleadoService {
  async getAll() {
    return await EmpleadoRepository.findAll();
  }

  async getById(id) {
    return await EmpleadoRepository.findById(id);
  }

  async create(data) {
    return await EmpleadoRepository.create(data);
  }

  async update(id, data) {
    // Filtrar campos que no deben modificarse (fechas de auditoría)
    const updateData = filterAuditFields(data);
    return await EmpleadoRepository.update(id, updateData);
  }

  async delete(id) {
    return await EmpleadoRepository.delete(id);
  }
}

module.exports = new EmpleadoService(); 