class Pago {
  constructor({
    id_pago,
    id_reserva,
    id_metodo_pago,
    monto,
    fecha_pago,
    referencia,
    fecha_creacion,
    fecha_modificacion
  }) {
    this.id_pago = id_pago;
    this.id_reserva = id_reserva;
    this.id_metodo_pago = id_metodo_pago;
    this.monto = monto;
    this.fecha_pago = fecha_pago;
    this.referencia = referencia;
    this.fecha_creacion = fecha_creacion;
    this.fecha_modificacion = fecha_modificacion;
  }
}

module.exports = Pago; 