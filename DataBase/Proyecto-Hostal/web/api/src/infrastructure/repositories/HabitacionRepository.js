const db = require('../db');
const Habitacion = require('../../domain/models/Habitacion');

class HabitacionRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT h.*, t.precio_base_por_noche
      FROM habitacion h
      JOIN tipo_habitacion t ON h.id_tipo_habitacion = t.id_tipo_habitacion
    `);
    return rows.map(row => new Habitacion(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM habitacion WHERE id_habitacion = ?', [id]);
    return rows[0] ? new Habitacion(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO habitacion (numero_habitacion, id_tipo_habitacion, id_estado_habitacion) VALUES (?, ?, ?)',
      [data.numero_habitacion, data.id_tipo_habitacion, data.id_estado_habitacion]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    await db.query(
      'UPDATE habitacion SET numero_habitacion=?, id_tipo_habitacion=?, id_estado_habitacion=? WHERE id_habitacion=?',
      [data.numero_habitacion, data.id_tipo_habitacion, data.id_estado_habitacion, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM habitacion WHERE id_habitacion = ?', [id]);
    return true;
  }
}

module.exports = new HabitacionRepository(); 