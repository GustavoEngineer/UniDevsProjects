class Mantenimiento {
  constructor({
    id_mantenimiento,
    id_habitacion,
    id_empleado,
    id_estado_mantenimiento,
    descripcion,
    fecha_solicitud,
    fecha_inicio,
    fecha_fin,
    fecha_creacion,
    fecha_modificacion,
    nombre_estado,
    numero_habitacion,
    nombre_empleado,
    apellido_empleado
  }) {
    this.id_mantenimiento = id_mantenimiento;
    this.id_habitacion = id_habitacion;
    this.id_empleado = id_empleado;
    this.id_estado_mantenimiento = id_estado_mantenimiento;
    this.descripcion = descripcion;
    this.fecha_solicitud = fecha_solicitud;
    this.fecha_inicio = fecha_inicio;
    this.fecha_fin = fecha_fin;
    this.fecha_creacion = fecha_creacion;
    this.fecha_modificacion = fecha_modificacion;
    this.nombre_estado = nombre_estado;
    this.numero_habitacion = numero_habitacion;
    this.nombre_empleado = nombre_empleado;
    this.apellido_empleado = apellido_empleado;
  }
}

module.exports = Mantenimiento; 