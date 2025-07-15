const fs = require('fs');
const path = require('path');

const PARTIDAS_1V1_FILE = path.join(__dirname, 'partidas_1v1.json');
const PARTIDAS_EQUIPOS_FILE = path.join(__dirname, 'partidas_equipos.json');

class PartidaRepository {
  static getAll1v1() {
    if (!fs.existsSync(PARTIDAS_1V1_FILE)) {
      fs.writeFileSync(PARTIDAS_1V1_FILE, '[]');
      return [];
    }
    const data = fs.readFileSync(PARTIDAS_1V1_FILE, 'utf-8');
    return JSON.parse(data);
  }

  static getAllEquipos() {
    if (!fs.existsSync(PARTIDAS_EQUIPOS_FILE)) {
      fs.writeFileSync(PARTIDAS_EQUIPOS_FILE, '[]');
      return [];
    }
    const data = fs.readFileSync(PARTIDAS_EQUIPOS_FILE, 'utf-8');
    return JSON.parse(data);
  }

  static getNextId(tipo = 'equipos') {
    if (tipo === 'equipos') {
      const partidas = PartidaRepository.getAllEquipos();
      if (partidas.length === 0) return 1;
      const maxId = Math.max(...partidas.map(p => Number(p.Partida_ID) || 0));
      return maxId + 1;
    } else {
      const partidas = PartidaRepository.getAll1v1();
      if (partidas.length === 0) return 1;
      const maxId = Math.max(...partidas.map(p => Number(p.Partida_ID) || 0));
      return maxId + 1;
    }
  }

  static save(partida) {
    if (partida.tipo === 'equipos') {
      const partidas = PartidaRepository.getAllEquipos();
      // Asignar ID autoincremental si no tiene uno
      if (!partida.Partida_ID) {
        partida.Partida_ID = PartidaRepository.getNextId('equipos');
      }
      
      // Verificar si ya existe una partida con ese ID
      const existingIndex = partidas.findIndex(p => Number(p.Partida_ID) === Number(partida.Partida_ID));
      if (existingIndex !== -1) {
        // Actualizar la partida existente
        partidas[existingIndex] = partida;
      } else {
        // Agregar nueva partida
        partidas.push(partida);
      }
      fs.writeFileSync(PARTIDAS_EQUIPOS_FILE, JSON.stringify(partidas, null, 2));
    } else {
      const partidas = PartidaRepository.getAll1v1();
      // Asignar ID autoincremental si no tiene uno
      if (!partida.Partida_ID) {
        partida.Partida_ID = PartidaRepository.getNextId('1v1');
      }
      
      // Verificar si ya existe una partida con ese ID
      const existingIndex = partidas.findIndex(p => Number(p.Partida_ID) === Number(partida.Partida_ID));
      if (existingIndex !== -1) {
        // Actualizar la partida existente
        partidas[existingIndex] = partida;
      } else {
        // Agregar nueva partida
        partidas.push(partida);
      }
      fs.writeFileSync(PARTIDAS_1V1_FILE, JSON.stringify(partidas, null, 2));
    }
  }

  static deleteById(id, tipo = 'equipos') {
    const numId = Number(id);
    if (tipo === 'equipos') {
      const partidas = PartidaRepository.getAllEquipos();
      const partidaIndex = partidas.findIndex(p => Number(p.Partida_ID) === numId);
      if (partidaIndex === -1) {
        throw new Error('Partida no encontrada');
      }
      partidas.splice(partidaIndex, 1);
      fs.writeFileSync(PARTIDAS_EQUIPOS_FILE, JSON.stringify(partidas, null, 2));
      return true;
    } else {
      const partidas = PartidaRepository.getAll1v1();
      const partidaIndex = partidas.findIndex(p => Number(p.Partida_ID) === numId);
      if (partidaIndex === -1) {
        throw new Error('Partida no encontrada');
      }
      partidas.splice(partidaIndex, 1);
      fs.writeFileSync(PARTIDAS_1V1_FILE, JSON.stringify(partidas, null, 2));
      return true;
    }
  }

  static getById(id, tipo = 'equipos') {
    const numId = Number(id);
    if (tipo === 'equipos') {
      const partidas = PartidaRepository.getAllEquipos();
      const partida = partidas.find(p => Number(p.Partida_ID) === numId);
      if (!partida) {
        throw new Error('Partida no encontrada');
      }
      return partida;
    } else {
      const partidas = PartidaRepository.getAll1v1();
      const partida = partidas.find(p => Number(p.Partida_ID) === numId);
      if (!partida) {
        throw new Error('Partida no encontrada');
      }
      return partida;
    }
  }
}

module.exports = PartidaRepository; 