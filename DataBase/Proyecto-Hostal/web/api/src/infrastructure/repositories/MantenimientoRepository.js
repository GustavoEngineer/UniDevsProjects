const db = require('../db');
const Mantenimiento = require('../../domain/models/Mantenimiento');

class MantenimientoRepository {
  async findAll() {
    const [rows] = await db.query(`
      SELECT m.*, em.nombre_estado, hab.numero_habitacion,
             emp.nombre as nombre_empleado, emp.apellido_paterno as apellido_empleado
      FROM mantenimiento m
      LEFT JOIN estado_mantenimiento em ON m.id_estado_mantenimiento = em.id_estado_mantenimiento
      LEFT JOIN habitacion hab ON m.id_habitacion = hab.id_habitacion
      LEFT JOIN empleado emp ON m.id_empleado = emp.id_empleado
    `);
    return rows.map(row => new Mantenimiento(row));
  }

  async findById(id) {
    const [rows] = await db.query(`
      SELECT m.*, em.nombre_estado, hab.numero_habitacion,
             emp.nombre as nombre_empleado, emp.apellido_paterno as apellido_empleado
      FROM mantenimiento m
      LEFT JOIN estado_mantenimiento em ON m.id_estado_mantenimiento = em.id_estado_mantenimiento
      LEFT JOIN habitacion hab ON m.id_habitacion = hab.id_habitacion
      LEFT JOIN empleado emp ON m.id_empleado = emp.id_empleado
      WHERE m.id_mantenimiento = ?
    `, [id]);
    return rows[0] ? new Mantenimiento(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO mantenimiento (id_habitacion, id_empleado, id_estado_mantenimiento, descripcion, fecha_inicio, fecha_fin) VALUES (?, ?, ?, ?, ?, ?)',
      [data.id_habitacion, data.id_empleado || null, data.id_estado_mantenimiento, data.descripcion, data.fecha_inicio, data.fecha_fin]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    // NOTA: Las fechas de auditoría (fecha_creacion, fecha_modificacion) NO se incluyen aquí
    // para evitar que se modifiquen manualmente. La fecha_modificacion se actualiza automáticamente
    // por la base de datos con ON UPDATE CURRENT_TIMESTAMP
    await db.query(
      'UPDATE mantenimiento SET id_habitacion=?, id_empleado=?, id_estado_mantenimiento=?, descripcion=?, fecha_inicio=?, fecha_fin=? WHERE id_mantenimiento=?',
      [data.id_habitacion, data.id_empleado || null, data.id_estado_mantenimiento, data.descripcion, data.fecha_inicio, data.fecha_fin, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM mantenimiento WHERE id_mantenimiento = ?', [id]);
    return true;
  }
}

module.exports = new MantenimientoRepository(); 