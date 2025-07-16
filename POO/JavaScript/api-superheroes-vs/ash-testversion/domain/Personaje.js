class Personaje {
  constructor({ id, nombre, categoria, ciudad, golpeBasico, golpeEspecial, golpeCritico, nivelVida = 300 }) {
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
    // Nuevo atributo: nivelEnergia (para escudos, inicia en 0, tope 100)
    this.nivelEnergia = 0;
    // Inventario de escudos: puede tener varios, pero solo usar uno a la vez
    this.escudos = [];
  }

  get nivelPoder() {
    if (this.nivelVida >= 201) return 'Alfa'; // 67% de 300 = 201
    if (this.nivelVida >= 101) return 'beta'; // 34% de 300 = 101
    return 'omega';
  }
}

module.exports = Personaje; 