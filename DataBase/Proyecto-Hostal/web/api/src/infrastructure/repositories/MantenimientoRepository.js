const db = require('../db');
const Mantenimiento = require('../../domain/models/Mantenimiento');

class MantenimientoRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM mantenimiento');
    return rows.map(row => new Mantenimiento(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM mantenimiento WHERE id_mantenimiento = ?', [id]);
    return rows[0] ? new Mantenimiento(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO mantenimiento (id_habitacion, id_estado_mantenimiento, descripcion, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?)',
      [data.id_habitacion, data.id_estado_mantenimiento, data.descripcion, data.fecha_inicio, data.fecha_fin]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    await db.query(
      'UPDATE mantenimiento SET id_habitacion=?, id_estado_mantenimiento=?, descripcion=?, fecha_inicio=?, fecha_fin=? WHERE id_mantenimiento=?',
      [data.id_habitacion, data.id_estado_mantenimiento, data.descripcion, data.fecha_inicio, data.fecha_fin, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM mantenimiento WHERE id_mantenimiento = ?', [id]);
    return true;
  }
}

module.exports = new MantenimientoRepository(); 