const db = require('../db');
const HuespedEstancia = require('../../domain/models/HuespedEstancia');

class HuespedEstanciaRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM huesped_estancia');
    return rows.map(row => new HuespedEstancia(row));
  }

  async findById(id_estancia, id_huesped) {
    const [rows] = await db.query('SELECT * FROM huesped_estancia WHERE id_estancia = ? AND id_huesped = ?', [id_estancia, id_huesped]);
    return rows[0] ? new HuespedEstancia(rows[0]) : null;
  }

  async create(data) {
    await db.query(
      'INSERT INTO huesped_estancia (id_estancia, id_huesped) VALUES (?, ?)',
      [data.id_estancia, data.id_huesped]
    );
    return this.findById(data.id_estancia, data.id_huesped);
  }

  async delete(id_estancia, id_huesped) {
    await db.query('DELETE FROM huesped_estancia WHERE id_estancia = ? AND id_huesped = ?', [id_estancia, id_huesped]);
    return true;
  }
}

module.exports = new HuespedEstanciaRepository(); 