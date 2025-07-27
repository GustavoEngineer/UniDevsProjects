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
    
    // Validar disponibilidad de habitación si se está cambiando
    if (updateData.id_habitacion || updateData.fecha_checkin_prevista || updateData.fecha_checkout_prevista) {
      const currentReserva = await this.getById(id);
      const habitacionId = updateData.id_habitacion || currentReserva.id_habitacion;
      const checkin = updateData.fecha_checkin_prevista || currentReserva.fecha_checkin_prevista;
      const checkout = updateData.fecha_checkout_prevista || currentReserva.fecha_checkout_prevista;
      
      const conflictos = await this.verificarDisponibilidadHabitacion(habitacionId, checkin, checkout, id);
      if (conflictos.length > 0) {
        const conflicto = conflictos[0];
        throw new Error(`La habitación no está disponible en las fechas seleccionadas. Conflicto con la reserva #${conflicto.id_reserva} (${conflicto.nombre_huesped} ${conflicto.apellido_huesped}) del ${conflicto.fecha_checkin_prevista} al ${conflicto.fecha_checkout_prevista}`);
      }
    }
    
    return await ReservaRepository.update(id, updateData);
  }

  async delete(id) {
    return await ReservaRepository.delete(id);
  }

  /**
   * Verifica la disponibilidad de una habitación en un rango de fechas
   * @param {number} habitacionId - ID de la habitación
   * @param {string} fechaCheckin - Fecha de check-in (YYYY-MM-DD)
   * @param {string} fechaCheckout - Fecha de check-out (YYYY-MM-DD)
   * @param {number} reservaIdExcluir - ID de la reserva a excluir (para actualizaciones)
   * @returns {Array} Array de reservas que causan conflictos
   */
  async verificarDisponibilidadHabitacion(habitacionId, fechaCheckin, fechaCheckout, reservaIdExcluir = null) {
    return await ReservaRepository.verificarDisponibilidadHabitacion(habitacionId, fechaCheckin, fechaCheckout, reservaIdExcluir);
  }

  /**
   * Obtiene todas las reservas que podrían causar conflictos con una habitación
   * @param {number} habitacionId - ID de la habitación
   * @param {string} fechaCheckin - Fecha de check-in (YYYY-MM-DD)
   * @param {string} fechaCheckout - Fecha de check-out (YYYY-MM-DD)
   * @param {number} reservaIdExcluir - ID de la reserva a excluir (para actualizaciones)
   * @returns {Array} Array de reservas conflictivas
   */
  async obtenerReservasConflictivas(habitacionId, fechaCheckin, fechaCheckout, reservaIdExcluir = null) {
    return await ReservaRepository.obtenerReservasConflictivas(habitacionId, fechaCheckin, fechaCheckout, reservaIdExcluir);
  }
}

module.exports = new ReservaService(); 