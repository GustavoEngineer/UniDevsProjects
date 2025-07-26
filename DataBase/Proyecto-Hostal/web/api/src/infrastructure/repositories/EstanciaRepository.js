const db = require('../db');
const Estancia = require('../../domain/models/Estancia');

class EstanciaRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM estancia');
    return rows.map(row => new Estancia(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM estancia WHERE id_estancia = ?', [id]);
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
}

module.exports = new EstanciaRepository(); 