class Mantenimiento {
  constructor({
    id_mantenimiento,
    id_habitacion,
    id_estado_mantenimiento,
    descripcion,
    fecha_inicio,
    fecha_fin,
    fecha_creacion,
    fecha_modificacion
  }) {
    this.id_mantenimiento = id_mantenimiento;
    this.id_habitacion = id_habitacion;
    this.id_estado_mantenimiento = id_estado_mantenimiento;
    this.descripcion = descripcion;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.fecha_creacion = fecha_creacion;
    this.fecha_modificacion = fecha_modificacion;
  }
}

module.exports = Mantenimiento; 