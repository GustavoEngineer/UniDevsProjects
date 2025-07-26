const db = require('../db');
const EstadoHabitacion = require('../../domain/models/EstadoHabitacion');

class EstadoHabitacionRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM estado_habitacion');
    return rows.map(row => new EstadoHabitacion(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM estado_habitacion WHERE id_estado_habitacion = ?', [id]);
    return rows[0] ? new EstadoHabitacion(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO estado_habitacion (nombre_estado) VALUES (?)',
      [data.nombre_estado]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    await db.query(
      'UPDATE estado_habitacion SET nombre_estado=? WHERE id_estado_habitacion=?',
      [data.nombre_estado, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM estado_habitacion WHERE id_estado_habitacion = ?', [id]);
    return true;
  }
}

module.exports = new EstadoHabitacionRepository(); 