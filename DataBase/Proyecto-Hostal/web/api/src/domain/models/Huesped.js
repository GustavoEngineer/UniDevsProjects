class Huesped {
  constructor({
    id_huesped,
    nombre,
    apellido_paterno,
    apellido_materno,
    numero_celular,
    correo,
    fecha_nacimiento,
    nacionalidad,
    fecha_creacion,
    fecha_modificacion
  }) {
    this.id_huesped = id_huesped;
    this.nombre = nombre;
    this.apellido_paterno = apellido_paterno;
    this.apellido_materno = apellido_materno;
    this.numero_celular = numero_celular;
    this.correo = correo;
    this.fecha_nacimiento = fecha_nacimiento;
    this.nacionalidad = nacionalidad;
    this.fecha_creacion = fecha_creacion;
    this.fecha_modificacion = fecha_modificacion;
  }
}

module.exports = Huesped; 