class Partida {
  static lastId = 0;

  constructor(personaje1, personaje2) {
    this.Partida_ID = ++Partida.lastId; // Solo Partida_ID como identificador
    this.tipo = '1v1';
    this.fechaInicio = new Date().toISOString();
    this.personajes = [
      {
        nombre: personaje1.nombre,
        id: personaje1.id,
        vida: personaje1.vida,
        nivelPoder: personaje1.nivelPoder,
        escudos: Array.isArray(personaje1.escudos) ? [...personaje1.escudos] : []
      },
      {
        nombre: personaje2.nombre,
        id: personaje2.id,
        vida: personaje2.vida,
        nivelPoder: personaje2.nivelPoder,
        escudos: Array.isArray(personaje2.escudos) ? [...personaje2.escudos] : []
      }
    ];
    this.historialAcciones = [];
  }

  registrarAccion({ atacanteId, defensorId, golpe, danio, nivelPoderAtacante, nivelPoderDefensor }) {
    const atacante = this.personajes.find(p => p.id === atacanteId);
    const defensor = this.personajes.find(p => p.id === defensorId);
    if (!atacante || !defensor) return;
    defensor.vida = Math.max(0, defensor.vida - danio);
    // Actualizar nivelPoder tras el daño
    defensor.nivelPoder = defensor.vida >= 67 ? 'Alfa' : defensor.vida >= 34 ? 'beta' : 'omega';
    atacante.nivelPoder = atacante.vida >= 67 ? 'Alfa' : atacante.vida >= 34 ? 'beta' : 'omega';
    this.historialAcciones.push({
      fecha: new Date().toISOString(),
      atacante: { nombre: atacante.nombre, id: atacante.id, nivelPoder: nivelPoderAtacante },
      defensor: { nombre: defensor.nombre, id: defensor.id, nivelPoder: nivelPoderDefensor },
      golpe,
      danio,
      vidaRestante: defensor.vida
    });
  }
}

module.exports = Partida; 