class TipoHabitacion {
  constructor({
    id_tipo_habitacion,
    nombre_tipo,
    capacidad_maxima,
    precio_base_por_noche
  }) {
    this.id_tipo_habitacion = id_tipo_habitacion;
    this.nombre_tipo = nombre_tipo;
    this.capacidad_maxima = capacidad_maxima;
    this.precio_base_por_noche = precio_base_por_noche;
  }
}

module.exports = TipoHabitacion; 