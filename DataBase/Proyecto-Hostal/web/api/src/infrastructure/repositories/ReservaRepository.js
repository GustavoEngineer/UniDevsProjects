const db = require('../db');
const Reserva = require('../../domain/models/Reserva');

class ReservaRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM reserva');
    return rows.map(row => new Reserva(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM reserva WHERE id_reserva = ?', [id]);
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
}

module.exports = new ReservaRepository(); 