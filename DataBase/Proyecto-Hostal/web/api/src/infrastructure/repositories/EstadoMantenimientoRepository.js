const db = require('../db');
const EstadoMantenimiento = require('../../domain/models/EstadoMantenimiento');

class EstadoMantenimientoRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM estado_mantenimiento');
    return rows.map(row => new EstadoMantenimiento(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM estado_mantenimiento WHERE id_estado_mantenimiento = ?', [id]);
    return rows[0] ? new EstadoMantenimiento(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO estado_mantenimiento (nombre_estado) VALUES (?)',
      [data.nombre_estado]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    await db.query(
      'UPDATE estado_mantenimiento SET nombre_estado=? WHERE id_estado_mantenimiento=?',
      [data.nombre_estado, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM estado_mantenimiento WHERE id_estado_mantenimiento = ?', [id]);
    return true;
  }
}

module.exports = new EstadoMantenimientoRepository(); 