class Partida {
  static lastId = 0;

  constructor(personaje1, personaje2) {
    this.id = ++Partida.lastId;
    this.tipo = '1v1';
    this.fechaInicio = new Date().toISOString();
    this.personajes = [
      { nombre: personaje1.nombre, id: personaje1.id, vida: personaje1.vida },
      { nombre: personaje2.nombre, id: personaje2.id, vida: personaje2.vida }
    ];
    this.historialAcciones = [];
  }

  registrarAccion({ atacanteId, defensorId, golpe, danio }) {
    const atacante = this.personajes.find(p => p.id === atacanteId);
    const defensor = this.personajes.find(p => p.id === defensorId);
    if (!atacante || !defensor) return;
    defensor.vida = Math.max(0, defensor.vida - danio);
    this.historialAcciones.push({
      fecha: new Date().toISOString(),
      atacante: atacante.nombre,
      defensor: defensor.nombre,
      golpe,
      danio,
      vidaRestante: defensor.vida
    });
  }
}

module.exports = Partida; 