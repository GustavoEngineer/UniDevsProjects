const db = require('../db');
const Empleado = require('../../domain/models/Empleado');

class EmpleadoRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT e.*, r.nombre_rol, t.nombre_turno
      FROM empleado e
      LEFT JOIN rol_empleado r ON e.id_rol_empleado = r.id_rol_empleado
      LEFT JOIN turno_empleado t ON e.id_turno_empleado = t.id_turno_empleado
    `);
    return rows.map(row => new Empleado(row));
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT e.*, r.nombre_rol, t.nombre_turno
      FROM empleado e
      LEFT JOIN rol_empleado r ON e.id_rol_empleado = r.id_rol_empleado
      LEFT JOIN turno_empleado t ON e.id_turno_empleado = t.id_turno_empleado
      WHERE e.id_empleado = ?
    `, [id]);
    return rows[0] ? new Empleado(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO empleado (nombre, apellido_paterno, apellido_materno, telefono, email, fecha_contratacion, id_rol_empleado, id_turno_empleado) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [data.nombre, data.apellido_paterno, data.apellido_materno, data.telefono, data.email, data.fecha_contratacion, data.id_rol_empleado, data.id_turno_empleado]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    await db.query(
      'UPDATE empleado SET nombre=?, apellido_paterno=?, apellido_materno=?, telefono=?, email=?, fecha_contratacion=?, id_rol_empleado=?, id_turno_empleado=? WHERE id_empleado=?',
      [data.nombre, data.apellido_paterno, data.apellido_materno, data.telefono, data.email, data.fecha_contratacion, data.id_rol_empleado, data.id_turno_empleado, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM empleado WHERE id_empleado = ?', [id]);
    return true;
  }
}

module.exports = new EmpleadoRepository(); 