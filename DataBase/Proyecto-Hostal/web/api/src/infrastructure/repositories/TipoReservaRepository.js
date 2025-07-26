const db = require('../db');
const TipoReserva = require('../../domain/models/TipoReserva');

class TipoReservaRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM tipo_reserva');
    return rows.map(row => new TipoReserva(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM tipo_reserva WHERE id_tipo_reserva = ?', [id]);
    return rows[0] ? new TipoReserva(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO tipo_reserva (nombre_tipo) VALUES (?)',
      [data.nombre_tipo]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    await db.query(
      'UPDATE tipo_reserva SET nombre_tipo=? WHERE id_tipo_reserva=?',
      [data.nombre_tipo, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM tipo_reserva WHERE id_tipo_reserva = ?', [id]);
    return true;
  }
}

module.exports = new TipoReservaRepository(); 