const db = require('../db');
const Reserva = require('../../domain/models/Reserva');

class ReservaRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT r.*, tr.nombre_tipo as nombre_tipo_reserva,
             h.nombre as nombre_huesped, 
             CONCAT(h.apellido_paterno, ' ', COALESCE(h.apellido_materno, '')) as apellido_huesped,
             hab.numero_habitacion as numero_habitacion
      FROM reserva r
      LEFT JOIN tipo_reserva tr ON r.id_tipo_reserva = tr.id_tipo_reserva
      LEFT JOIN huesped h ON r.id_huesped = h.id_huesped
      LEFT JOIN habitacion hab ON r.id_habitacion = hab.id_habitacion
    `);
    return rows.map(row => new Reserva(row));
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT r.*, tr.nombre_tipo as nombre_tipo_reserva,
             h.nombre as nombre_huesped, 
             CONCAT(h.apellido_paterno, ' ', COALESCE(h.apellido_materno, '')) as apellido_huesped,
             hab.numero_habitacion as numero_habitacion
      FROM reserva r
      LEFT JOIN tipo_reserva tr ON r.id_tipo_reserva = tr.id_tipo_reserva
      LEFT JOIN huesped h ON r.id_huesped = h.id_huesped
      LEFT JOIN habitacion hab ON r.id_habitacion = hab.id_habitacion
      WHERE r.id_reserva = ?
    `, [id]);
    return rows[0] ? new Reserva(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO reserva (id_huesped, id_habitacion, fecha_reserva, fecha_checkin_prevista, fecha_checkout_prevista, id_tipo_reserva, precio_total_estimado) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [data.id_huesped, data.id_habitacion, data.fecha_reserva, data.fecha_checkin_prevista, data.fecha_checkout_prevista, data.id_tipo_reserva, data.precio_total_estimado]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    // NOTA: Las fechas de auditoría (fecha_creacion, fecha_modificacion) NO se incluyen aquí
    // para evitar que se modifiquen manualmente. La fecha_modificacion se actualiza automáticamente
    // por la base de datos con ON UPDATE CURRENT_TIMESTAMP
    await db.query(
      'UPDATE reserva SET id_huesped=?, id_habitacion=?, fecha_reserva=?, fecha_checkin_prevista=?, fecha_checkout_prevista=?, id_tipo_reserva=?, precio_total_estimado=? WHERE id_reserva=?',
      [data.id_huesped, data.id_habitacion, data.fecha_reserva, data.fecha_checkin_prevista, data.fecha_checkout_prevista, data.id_tipo_reserva, data.precio_total_estimado, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM reserva WHERE id_reserva = ?', [id]);
    return true;
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
    let query = `
      SELECT r.*, tr.nombre_tipo as nombre_tipo_reserva,
             h.nombre as nombre_huesped, 
             CONCAT(h.apellido_paterno, ' ', COALESCE(h.apellido_materno, '')) as apellido_huesped,
             hab.numero_habitacion as numero_habitacion
      FROM reserva r
      LEFT JOIN tipo_reserva tr ON r.id_tipo_reserva = tr.id_tipo_reserva
      LEFT JOIN huesped h ON r.id_huesped = h.id_huesped
      LEFT JOIN habitacion hab ON r.id_habitacion = hab.id_habitacion
      WHERE r.id_habitacion = ? 
        AND r.id_reserva != ?
        AND (
          (r.fecha_checkin_prevista <= ? AND r.fecha_checkout_prevista > ?) OR
          (r.fecha_checkin_prevista < ? AND r.fecha_checkout_prevista >= ?) OR
          (r.fecha_checkin_prevista >= ? AND r.fecha_checkout_prevista <= ?)
        )
    `;
    
    const params = [
      habitacionId,
      reservaIdExcluir || 0,
      fechaCheckout, fechaCheckin,  // Para verificar si la reserva existente termina después del check-in nuevo
      fechaCheckin, fechaCheckout,  // Para verificar si la reserva existente empieza antes del check-out nuevo
      fechaCheckin, fechaCheckout   // Para verificar si la reserva existente está completamente dentro del rango nuevo
    ];
    
    const [rows] = await db.query(query, params);
    return rows.map(row => new Reserva(row));
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
    return await this.verificarDisponibilidadHabitacion(habitacionId, fechaCheckin, fechaCheckout, reservaIdExcluir);
  }
}

module.exports = new ReservaRepository(); 