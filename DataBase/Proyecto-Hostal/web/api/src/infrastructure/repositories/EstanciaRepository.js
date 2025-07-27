const db = require('../db');
const Estancia = require('../../domain/models/Estancia');

class EstanciaRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT e.*, ee.nombre_estado, 
             h.nombre as nombre_huesped, h.apellido_paterno as apellido_huesped,
             r.fecha_checkin_prevista, r.fecha_checkout_prevista,
             CONCAT(h.nombre, ' ', h.apellido_paterno) as nombre_completo_huesped
      FROM estancia e
      LEFT JOIN estado_estancia ee ON e.id_estado_estancia = ee.id_estado_estancia
      LEFT JOIN huesped h ON e.id_huesped = h.id_huesped
      LEFT JOIN reserva r ON e.id_reserva = r.id_reserva
    `);
    return rows.map(row => new Estancia(row));
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT e.*, ee.nombre_estado, 
             h.nombre as nombre_huesped, h.apellido_paterno as apellido_huesped,
             r.fecha_checkin_prevista, r.fecha_checkout_prevista,
             CONCAT(h.nombre, ' ', h.apellido_paterno) as nombre_completo_huesped
      FROM estancia e
      LEFT JOIN estado_estancia ee ON e.id_estado_estancia = ee.id_estado_estancia
      LEFT JOIN huesped h ON e.id_huesped = h.id_huesped
      LEFT JOIN reserva r ON e.id_reserva = r.id_reserva
      WHERE e.id_estancia = ?
    `, [id]);
    return rows[0] ? new Estancia(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO estancia (id_reserva, id_estado_estancia, id_huesped, hora_checkin, hora_checkout, numero_personas, vehiculo_registrado, placa_vehiculo, requiere_factura) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [data.id_reserva, data.id_estado_estancia, data.id_huesped, data.hora_checkin, data.hora_checkout, data.numero_personas, data.vehiculo_registrado, data.placa_vehiculo, data.requiere_factura]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    await db.query(
      'UPDATE estancia SET id_reserva=?, id_estado_estancia=?, id_huesped=?, hora_checkin=?, hora_checkout=?, numero_personas=?, vehiculo_registrado=?, placa_vehiculo=?, requiere_factura=? WHERE id_estancia=?',
      [data.id_reserva, data.id_estado_estancia, data.id_huesped, data.hora_checkin, data.hora_checkout, data.numero_personas, data.vehiculo_registrado, data.placa_vehiculo, data.requiere_factura, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM estancia WHERE id_estancia = ?', [id]);
    return true;
  }

  /**
   * Obtiene todas las reservas con información del huésped para el selector
   */
  async obtenerReservasConHuesped() {
    const [rows] = await db.query(`
      SELECT r.id_reserva, r.id_huesped, r.fecha_checkin_prevista, r.fecha_checkout_prevista,
             h.nombre, h.apellido_paterno, h.apellido_materno,
             CONCAT(h.nombre, ' ', h.apellido_paterno, ' (', DATE_FORMAT(r.fecha_checkin_prevista, '%d/%m/%Y'), ' - ', DATE_FORMAT(r.fecha_checkout_prevista, '%d/%m/%Y'), ')') as descripcion_reserva
      FROM reserva r
      LEFT JOIN huesped h ON r.id_huesped = h.id_huesped
      ORDER BY r.fecha_checkin_prevista DESC
    `);
    return rows;
  }
}

module.exports = new EstanciaRepository(); 