const { v4: uuidv4 } = require('uuid');

class PartidaEquipoEnCurso {
  constructor(equipo1Ids, equipo2Ids) {
    // El ID se asignará desde el servicio para usar IDs autoincrementales
    this.equipo1 = equipo1Ids.map(id => ({ id, disponible: true }));
    this.equipo2 = equipo2Ids.map(id => ({ id, disponible: true }));
    this.rounds = [];
    this.finalizada = false;
  }

  registrarRound(round, id1, id2, resultado) {
    this.rounds.push({ round, id1, id2, resultado });
    // Marcar personajes como no disponibles
    const p1 = this.equipo1.find(p => p.id === id1);
    const p2 = this.equipo2.find(p => p.id === id2);
    if (p1) p1.disponible = false;
    if (p2) p2.disponible = false;
    // Si es el round 3, marcar como finalizada
    if (round === 3) this.finalizada = true;
  }

  personajesDisponibles(equipo) {
    return (equipo === 1 ? this.equipo1 : this.equipo2).filter(p => p.disponible).map(p => p.id);
  }
}

module.exports = PartidaEquipoEnCurso; 