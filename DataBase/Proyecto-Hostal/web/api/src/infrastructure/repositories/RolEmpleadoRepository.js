const db = require('../db');
const RolEmpleado = require('../../domain/models/RolEmpleado');

class RolEmpleadoRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM rol_empleado');
    return rows.map(row => new RolEmpleado(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM rol_empleado WHERE id_rol_empleado = ?', [id]);
    return rows[0] ? new RolEmpleado(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO rol_empleado (nombre_rol) VALUES (?)',
      [data.nombre_rol]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    await db.query(
      'UPDATE rol_empleado SET nombre_rol=? WHERE id_rol_empleado=?',
      [data.nombre_rol, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM rol_empleado WHERE id_rol_empleado = ?', [id]);
    return true;
  }
}

module.exports = new RolEmpleadoRepository(); 