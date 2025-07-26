const db = require('../db');
const EstanciaEmpleado = require('../../domain/models/EstanciaEmpleado');

class EstanciaEmpleadoRepository {
  async findAll() {
    const [rows] = await db.query('SELECT * FROM estancia_empleado');
    return rows.map(row => new EstanciaEmpleado(row));
  }

  async findById(id_estancia, id_empleado) {
    const [rows] = await db.query('SELECT * FROM estancia_empleado WHERE id_estancia = ? AND id_empleado = ?', [id_estancia, id_empleado]);
    return rows[0] ? new EstanciaEmpleado(rows[0]) : null;
  }

  async create(data) {
    await db.query(
      'INSERT INTO estancia_empleado (id_estancia, id_empleado) VALUES (?, ?)',
      [data.id_estancia, data.id_empleado]
    );
    return this.findById(data.id_estancia, data.id_empleado);
  }

  async delete(id_estancia, id_empleado) {
    await db.query('DELETE FROM estancia_empleado WHERE id_estancia = ? AND id_empleado = ?', [id_estancia, id_empleado]);
    return true;
  }
}

module.exports = new EstanciaEmpleadoRepository(); 