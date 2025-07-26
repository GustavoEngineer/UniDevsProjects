class Reserva {
  constructor({
    id_reserva,
    id_huesped,
    id_habitacion,
    fecha_reserva,
    fecha_checkin_prevista,
    fecha_checkout_prevista,
    id_tipo_reserva,
    precio_total_estimado,
    fecha_creacion,
    fecha_modificacion,
    nombre_tipo_reserva,
    nombre_huesped,
    apellido_huesped,
    numero_habitacion
  }) {
    this.id_reserva = id_reserva;
    this.id_huesped = id_huesped;
    this.id_habitacion = id_habitacion;
    this.fecha_reserva = fecha_reserva;
    this.fecha_checkin_prevista = fecha_checkin_prevista;
    this.fecha_checkout_prevista = fecha_checkout_prevista;
    this.id_tipo_reserva = id_tipo_reserva;
    this.precio_total_estimado = precio_total_estimado;
    this.fecha_creacion = fecha_creacion;
    this.fecha_modificacion = fecha_modificacion;
    this.nombre_tipo_reserva = nombre_tipo_reserva || null;
    this.nombre_huesped = nombre_huesped || null;
    this.apellido_huesped = apellido_huesped || null;
    this.numero_habitacion = numero_habitacion || null;
  }
}

module.exports = Reserva; 