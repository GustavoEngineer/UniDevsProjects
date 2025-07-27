class Estancia {
  constructor({
    id_estancia,
    id_reserva,
    id_estado_estancia,
    id_huesped,
    hora_checkin,
    hora_checkout,
    numero_personas,
    vehiculo_registrado,
    placa_vehiculo,
    requiere_factura,
    nombre_estado,
    nombre_huesped,
    apellido_huesped,
    fecha_checkin_prevista,
    fecha_checkout_prevista,
    nombre_completo_huesped
  }) {
    this.id_estancia = id_estancia;
    this.id_reserva = id_reserva;
    this.id_estado_estancia = id_estado_estancia;
    this.id_huesped = id_huesped;
    this.hora_checkin = hora_checkin;
    this.hora_checkout = hora_checkout;
    this.numero_personas = numero_personas;
    this.vehiculo_registrado = vehiculo_registrado;
    this.placa_vehiculo = placa_vehiculo;
    this.requiere_factura = requiere_factura;
    this.nombre_estado = nombre_estado;
    this.nombre_huesped = nombre_huesped;
    this.apellido_huesped = apellido_huesped;
    this.fecha_checkin_prevista = fecha_checkin_prevista;
    this.fecha_checkout_prevista = fecha_checkout_prevista;
    this.nombre_completo_huesped = nombre_completo_huesped;
  }
}

module.exports = Estancia; 