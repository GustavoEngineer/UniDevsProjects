class Habitacion {
  constructor({
    id_habitacion,
    numero_habitacion,
    id_tipo_habitacion,
    id_estado_habitacion,
    precio_base_por_noche
  }) {
    this.id_habitacion = id_habitacion;
    this.numero_habitacion = numero_habitacion;
    this.id_tipo_habitacion = id_tipo_habitacion;
    this.id_estado_habitacion = id_estado_habitacion;
    this.precio_base_por_noche = precio_base_por_noche;
  }
}

module.exports = Habitacion; 