class TurnoEmpleado {
  constructor({
    id_turno_empleado,
    nombre_turno,
    hora_inicio,
    hora_fin
  }) {
    this.id_turno_empleado = id_turno_empleado;
    this.nombre_turno = nombre_turno;
    this.hora_inicio = hora_inicio;
    this.hora_fin = hora_fin;
  }
}

module.exports = TurnoEmpleado; 