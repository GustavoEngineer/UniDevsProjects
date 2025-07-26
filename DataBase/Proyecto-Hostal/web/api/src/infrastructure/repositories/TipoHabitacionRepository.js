const db = require('../db');
const TipoHabitacion = require('../../domain/models/TipoHabitacion');

class TipoHabitacionRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM tipo_habitacion');
    return rows.map(row => new TipoHabitacion(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM tipo_habitacion WHERE id_tipo_habitacion = ?', [id]);
    return rows[0] ? new TipoHabitacion(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO tipo_habitacion (nombre_tipo, capacidad_maxima, precio_base_por_noche) VALUES (?, ?, ?)',
      [data.nombre_tipo, data.capacidad_maxima, data.precio_base_por_noche]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    await db.query(
      'UPDATE tipo_habitacion SET nombre_tipo=?, capacidad_maxima=?, precio_base_por_noche=? WHERE id_tipo_habitacion=?',
      [data.nombre_tipo, data.capacidad_maxima, data.precio_base_por_noche, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM tipo_habitacion WHERE id_tipo_habitacion = ?', [id]);
    return true;
  }
}

module.exports = new TipoHabitacionRepository(); 