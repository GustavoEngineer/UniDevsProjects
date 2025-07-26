class Empleado {
  constructor({
    id_empleado,
    nombre,
    apellido_paterno,
    apellido_materno,
    telefono,
    email,
    fecha_contratacion,
    id_rol_empleado,
    id_turno_empleado,
    fecha_creacion,
    fecha_modificacion,
    nombre_rol,
    nombre_turno
  }) {
    this.id_empleado = id_empleado;
    this.nombre = nombre;
    this.apellido_paterno = apellido_paterno;
    this.apellido_materno = apellido_materno;
    this.telefono = telefono;
    this.email = email;
    this.fecha_contratacion = fecha_contratacion;
    this.id_rol_empleado = id_rol_empleado;
    this.id_turno_empleado = id_turno_empleado;
    this.fecha_creacion = fecha_creacion;
    this.fecha_modificacion = fecha_modificacion;
    this.nombre_rol = nombre_rol;
    this.nombre_turno = nombre_turno;
  }
}

module.exports = Empleado; 