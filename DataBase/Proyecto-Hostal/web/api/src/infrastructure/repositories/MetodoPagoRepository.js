const db = require('../db');
const MetodoPago = require('../../domain/models/MetodoPago');

class MetodoPagoRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM metodo_pago');
    return rows.map(row => new MetodoPago(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM metodo_pago WHERE id_metodo_pago = ?', [id]);
    return rows[0] ? new MetodoPago(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO metodo_pago (nombre_metodo) VALUES (?)',
      [data.nombre_metodo]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    await db.query(
      'UPDATE metodo_pago SET nombre_metodo=? WHERE id_metodo_pago=?',
      [data.nombre_metodo, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM metodo_pago WHERE id_metodo_pago = ?', [id]);
    return true;
  }
}

module.exports = new MetodoPagoRepository(); 