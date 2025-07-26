const db = require('../db');
const Pago = require('../../domain/models/Pago');

class PagoRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM pago');
    return rows.map(row => new Pago(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM pago WHERE id_pago = ?', [id]);
    return rows[0] ? new Pago(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO pago (id_reserva, id_metodo_pago, monto, fecha_pago, referencia) VALUES (?, ?, ?, ?, ?)',
      [data.id_reserva, data.id_metodo_pago, data.monto, data.fecha_pago, data.referencia]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    await db.query(
      'UPDATE pago SET id_reserva=?, id_metodo_pago=?, monto=?, fecha_pago=?, referencia=? WHERE id_pago=?',
      [data.id_reserva, data.id_metodo_pago, data.monto, data.fecha_pago, data.referencia, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM pago WHERE id_pago = ?', [id]);
    return true;
  }
}

module.exports = new PagoRepository(); 