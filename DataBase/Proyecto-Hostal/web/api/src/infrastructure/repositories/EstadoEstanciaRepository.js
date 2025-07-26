const db = require('../db');
const EstadoEstancia = require('../../domain/models/EstadoEstancia');

class EstadoEstanciaRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM estado_estancia');
    return rows.map(row => new EstadoEstancia(row));
  }

  async findById(id) {
    const [rows] = await db.query('SELECT * FROM estado_estancia WHERE id_estado_estancia = ?', [id]);
    return rows[0] ? new EstadoEstancia(rows[0]) : null;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO estado_estancia (nombre_estado) VALUES (?)',
      [data.nombre_estado]
    );
    return this.findById(result.insertId);
  }

  async update(id, data) {
    await db.query(
      'UPDATE estado_estancia SET nombre_estado=? WHERE id_estado_estancia=?',
      [data.nombre_estado, id]
    );
    return this.findById(id);
  }

  async delete(id) {
    await db.query('DELETE FROM estado_estancia WHERE id_estado_estancia = ?', [id]);
    return true;
  }
}

module.exports = new EstadoEstanciaRepository(); 