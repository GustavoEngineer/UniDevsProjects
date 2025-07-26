const HuespedEstanciaRepository = require('../../infrastructure/repositories/HuespedEstanciaRepository');

class HuespedEstanciaService {
  async getAll() {
    return await HuespedEstanciaRepository.findAll();
  }

  async getById(id_estancia, id_huesped) {
    return await HuespedEstanciaRepository.findById(id_estancia, id_huesped);
  }

  async create(data) {
    return await HuespedEstanciaRepository.create(data);
  }

  async delete(id_estancia, id_huesped) {
    return await HuespedEstanciaRepository.delete(id_estancia, id_huesped);
  }
}

module.exports = new HuespedEstanciaService(); 