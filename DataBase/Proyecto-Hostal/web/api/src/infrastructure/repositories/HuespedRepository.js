const db = require('../db');
const Huesped = require('../../domain/models/Huesped');

class HuespedRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM huesped');
    return rows.map(row => new Huesped(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM huesped WHERE id_huesped = ?', [id]);
    return rows[0] ? new Huesped(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO huesped (nombre, apellido_paterno, apellido_materno, numero_celular, correo, fecha_nacimiento, nacionalidad) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [
        data.nombre, 
        data.apellido_paterno, 
        data.apellido_materno, 
        data.telefono || data.numero_celular, 
        data.email || data.correo, 
        data.fecha_nacimiento, 
        data.nacionalidad
      ]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    // NOTA: Las fechas de auditoría (fecha_creacion, fecha_modificacion) NO se incluyen aquí
    // para evitar que se modifiquen manualmente. La fecha_modificacion se actualiza automáticamente
    // por la base de datos con ON UPDATE CURRENT_TIMESTAMP
    await db.query(
      'UPDATE huesped SET nombre=?, apellido_paterno=?, apellido_materno=?, numero_celular=?, correo=?, fecha_nacimiento=?, nacionalidad=? WHERE id_huesped=?',
      [
        data.nombre, 
        data.apellido_paterno, 
        data.apellido_materno, 
        data.telefono || data.numero_celular, 
        data.email || data.correo, 
        data.fecha_nacimiento, 
        data.nacionalidad, 
        id
      ]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM huesped WHERE id_huesped = ?', [id]);
    return true;
  }
}

module.exports = new HuespedRepository(); 