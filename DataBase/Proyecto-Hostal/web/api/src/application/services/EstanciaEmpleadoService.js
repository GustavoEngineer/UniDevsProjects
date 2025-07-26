const EstanciaEmpleadoRepository = require('../../infrastructure/repositories/EstanciaEmpleadoRepository');

class EstanciaEmpleadoService {
  async getAll() {
    return await EstanciaEmpleadoRepository.findAll();
  }

  async getById(id_estancia, id_empleado) {
    return await EstanciaEmpleadoRepository.findById(id_estancia, id_empleado);
  }

  async create(data) {
    return await EstanciaEmpleadoRepository.create(data);
  }

  async delete(id_estancia, id_empleado) {
    return await EstanciaEmpleadoRepository.delete(id_estancia, id_empleado);
  }
}

module.exports = new EstanciaEmpleadoService(); 