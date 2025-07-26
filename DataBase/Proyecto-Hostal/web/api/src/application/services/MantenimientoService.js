const MantenimientoRepository = require('../../infrastructure/repositories/MantenimientoRepository');
const { filterAuditFields } = require('../utils/auditUtils');

class MantenimientoService {
  async getAll() {
    return await MantenimientoRepository.findAll();
  }

  async getById(id) {
    return await MantenimientoRepository.findById(id);
  }

  async create(data) {
    return await MantenimientoRepository.create(data);
  }

  async update(id, data) {
    // Filtrar campos que no deben modificarse (fechas de auditoría)
    const updateData = filterAuditFields(data);
    return await MantenimientoRepository.update(id, updateData);
  }

  async delete(id) {
    return await MantenimientoRepository.delete(id);
  }
}

module.exports = new MantenimientoService(); 