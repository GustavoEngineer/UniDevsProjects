const db = require('../db');
const TurnoEmpleado = require('../../domain/models/TurnoEmpleado');

class TurnoEmpleadoRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM turno_empleado');
    return rows.map(row => new TurnoEmpleado(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM turno_empleado WHERE id_turno_empleado = ?', [id]);
    return rows[0] ? new TurnoEmpleado(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO turno_empleado (nombre_turno, hora_inicio, hora_fin) VALUES (?, ?, ?)',
      [data.nombre_turno, data.hora_inicio, data.hora_fin]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    await db.query(
      'UPDATE turno_empleado SET nombre_turno=?, hora_inicio=?, hora_fin=? WHERE id_turno_empleado=?',
      [data.nombre_turno, data.hora_inicio, data.hora_fin, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM turno_empleado WHERE id_turno_empleado = ?', [id]);
    return true;
  }
}

module.exports = new TurnoEmpleadoRepository(); 