class Personaje {
  constructor({ id, nombre, categoria, ciudad, golpeBasico, golpeEspecial, golpeCritico, nivelVida = 100 }) {
    if (!nombre || !categoria || !ciudad || !golpeBasico || !golpeEspecial || !golpeCritico) {
      throw new Error('Faltan datos obligatorios');
    }
    this.id = id;
    this.nombre = nombre;
    this.categoria = categoria;
    this.ciudad = ciudad;
    this.golpeBasico = golpeBasico;
    this.golpeEspecial = golpeEspecial;
    this.golpeCritico = golpeCritico;
    this.nivelVida = nivelVida;
  }
}

module.exports = Personaje; 