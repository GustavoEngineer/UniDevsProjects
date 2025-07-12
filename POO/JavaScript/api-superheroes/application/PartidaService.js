const PersonajeService = require('./PersonajeService');
const Partida = require('../domain/Partida');
const PartidaRepository = require('../infrastructure/PartidaRepository');
const PartidaEquipoEnCurso = require('../domain/PartidaEquipoEnCurso');
const path = require('path');
const fs = require('fs');
const TEMP_FILE = path.join(__dirname, '../infrastructure/partidas_en_curso.json');

class PartidaService {
  static iniciarPartida1v1(id1, id2) {
    // Obtener personajes por ID
    const personaje1 = PersonajeService.getById(id1);
    const personaje2 = PersonajeService.getById(id2);
    if (!personaje1 || !personaje2) {
      throw new Error('Personaje no encontrado');
    }
    // Inicializar partida
    const partida = new Partida(personaje1, personaje2);
    // Simulación automática: alternar golpes básicos hasta que uno llegue a 0
    let turno = 0;
    while (partida.personajes[0].vida > 0 && partida.personajes[1].vida > 0) {
      const atacante = partida.personajes[turno % 2];
      const defensor = partida.personajes[(turno + 1) % 2];
      // Usar golpeBasico del personaje original
      const personajeOriginal = turno % 2 === 0 ? personaje1 : personaje2;
      const golpe = personajeOriginal.golpeBasico || 'golpeBasico';
      const danio = 5; // Valor fijo para golpe básico
      partida.registrarAccion({
        atacanteId: atacante.id,
        defensorId: defensor.id,
        golpe,
        danio
      });
      turno++;
    }
    // Guardar partida en historial
    PartidaRepository.save(partida);
    return partida;
  }

  static iniciarPartidaEquipos(equipo1Ids, equipo2Ids) {
    if (!Array.isArray(equipo1Ids) || !Array.isArray(equipo2Ids) || equipo1Ids.length !== 3 || equipo2Ids.length !== 3) {
      throw new Error('Debes enviar exactamente 3 IDs para cada equipo');
    }
    const PersonajeService = require('./PersonajeService');
    const Partida = require('../domain/Partida');
    const PartidaRepository = require('../infrastructure/PartidaRepository');

    // Obtener personajes de cada equipo
    const equipo1 = equipo1Ids.map(id => PersonajeService.getById(id)).filter(Boolean);
    const equipo2 = equipo2Ids.map(id => PersonajeService.getById(id)).filter(Boolean);
    if (equipo1.length !== 3 || equipo2.length !== 3) {
      throw new Error('Uno o más personajes no encontrados');
    }
    // Inicializar partida
    const partida = new Partida({ nombre: 'Equipo 1', id: 'E1', vida: equipo1.reduce((acc, p) => acc + (p.vida || 100), 0) }, { nombre: 'Equipo 2', id: 'E2', vida: equipo2.reduce((acc, p) => acc + (p.vida || 100), 0) });
    partida.tipo = 'equipos';
    // Simulación: alternar ataques entre equipos, cada personaje ataca a uno del otro equipo por turno
    let turno = 0;
    let vivos1 = equipo1.slice();
    let vivos2 = equipo2.slice();
    while (vivos1.length > 0 && vivos2.length > 0) {
      const atacante = turno % 2 === 0 ? vivos1[turno / 2 % vivos1.length] : vivos2[Math.floor(turno / 2) % vivos2.length];
      const defensores = turno % 2 === 0 ? vivos2 : vivos1;
      if (defensores.length === 0) break;
      const defensor = defensores[Math.floor(Math.random() * defensores.length)];
      const golpe = atacante.golpeBasico || 'golpeBasico';
      const danio = 5; // Valor fijo para golpe básico
      defensor.vida = (defensor.vida || 100) - danio;
      partida.historialAcciones.push({
        fecha: new Date().toISOString(),
        atacante: atacante.nombre,
        defensor: defensor.nombre,
        golpe,
        danio,
        vidaRestante: defensor.vida
      });
      // Eliminar defensor si su vida llega a 0
      if (defensor.vida <= 0) {
        const idx = defensores.indexOf(defensor);
        defensores.splice(idx, 1);
      }
      turno++;
    }
    // Guardar partida en historial
    PartidaRepository.save(partida);
    return partida;
  }

  static iniciarPartidaEquipoEnCurso(equipo1Ids, equipo2Ids) {
    // Obtener personajes de cada equipo (con nombre)
    const equipo1 = equipo1Ids.map(id => {
      const p = PersonajeService.getById(id);
      if (!p) throw new Error('Personaje no encontrado: ' + id);
      return { id: p.id, nombre: p.nombre };
    });
    const equipo2 = equipo2Ids.map(id => {
      const p = PersonajeService.getById(id);
      if (!p) throw new Error('Personaje no encontrado: ' + id);
      return { id: p.id, nombre: p.nombre };
    });

    // Obtener siguiente ID autoincremental
    const PartidaRepository = require('../infrastructure/PartidaRepository');
    const nextId = PartidaRepository.getNextId('equipos').toString();

    // Crear objeto partida
    const partida = {
      Partida_ID: nextId,
      tipo: 'equipos',
      equipo1,
      equipo2,
      rounds: [],
      finalizada: false
    };

    // Guardar en partidas_equipos.json
    PartidaRepository.save(partida);
    return partida;
  }

  static jugarRoundEquipo(round, partidaId, idPersonajeAtacante, tipoGolpe) {
    // Cargar partidas desde partidas_equipos.json
    const partidas = PartidaRepository.getAllEquipos();
    const partida = partidas.find(p => p.Partida_ID === partidaId);
    if (!partida) throw new Error('Partida no encontrada');
    if (partida.finalizada) throw new Error('La partida ya finalizó');

    // Obtener personajes de la partida
    const PersonajeService = require('./PersonajeService');
    const personaje1 = PersonajeService.getById(partida.equipo1[0].id);
    const personaje2 = PersonajeService.getById(partida.equipo2[0].id);
    
    if (!personaje1 || !personaje2) throw new Error('Personajes no encontrados');

    // Validar que el personaje atacante sea uno de los seleccionados
    const personajesDisponibles = [personaje1.id, personaje2.id];
    if (!personajesDisponibles.includes(idPersonajeAtacante)) {
      throw new Error('Personaje no disponible para este round');
    }

    // Inicializar round si no existe
    if (!partida.rounds) partida.rounds = [];
    if (!partida.rounds[round - 1]) {
      partida.rounds[round - 1] = {
        round: round,
        personajes: [
          { id: personaje1.id, nombre: personaje1.nombre, vidaInicial: 100, vidaActual: 100 },
          { id: personaje2.id, nombre: personaje2.nombre, vidaInicial: 100, vidaActual: 100 }
        ],
        acciones: [],
        finalizado: false,
        ganador: null
      };
    }

    const roundActual = partida.rounds[round - 1];
    
    // Verificar si el round ya está finalizado
    if (roundActual.finalizado) {
      throw new Error('Este round ya está finalizado');
    }

    // Determinar atacante y defensor
    const atacante = idPersonajeAtacante === personaje1.id ? personaje1 : personaje2;
    const defensor = idPersonajeAtacante === personaje1.id ? personaje2 : personaje1;
    
    // Obtener personaje del round (con vida actualizada)
    const personajeRoundAtacante = roundActual.personajes.find(p => p.id === atacante.id);
    const personajeRoundDefensor = roundActual.personajes.find(p => p.id === defensor.id);

    // Verificar que sea el turno correcto del atacante
    const ultimaAccion = roundActual.acciones[roundActual.acciones.length - 1];
    if (ultimaAccion) {
      const ultimoAtacanteId = ultimaAccion.atacante.id;
      if (ultimoAtacanteId === idPersonajeAtacante) {
        throw new Error('No es tu turno. Debes esperar a que el otro personaje ataque.');
      }
    }

    // Calcular daño según el tipo de golpe
    let danio = 0;
    switch (tipoGolpe) {
      case 'golpeBasico':
        danio = Math.floor(Math.random() * (10 - 5 + 1)) + 5; // Rango 5-10
        break;
      case 'golpeEspecial':
        danio = Math.floor(Math.random() * (40 - 30 + 1)) + 30; // Rango 30-40
        break;
      case 'golpeCritico':
        danio = Math.floor(Math.random() * (60 - 45 + 1)) + 45; // Rango 45-60
        break;
      default:
        throw new Error('Tipo de golpe inválido. Debe ser: golpeBasico, golpeEspecial o golpeCritico');
    }

    // Aplicar daño al defensor
    const vidaAnterior = personajeRoundDefensor.vidaActual;
    personajeRoundDefensor.vidaActual = Math.max(0, vidaAnterior - danio);
    const vidaRestante = personajeRoundDefensor.vidaActual;

    // Crear acción del round
    const accion = {
      numeroGolpe: roundActual.acciones.length + 1, // Número secuencial del golpe
      atacante: {
        id: atacante.id,
        nombre: atacante.nombre
      },
      defensor: {
        id: defensor.id,
        nombre: defensor.nombre
      },
      tipoGolpe: tipoGolpe,
      danio: danio,
      vidaRestante: vidaRestante,
      timestamp: new Date().toISOString()
    };

    // Agregar acción al round
    roundActual.acciones.push(accion);

    // Verificar si el defensor perdió
    const defensorPerdio = vidaRestante <= 0;
    if (defensorPerdio) {
      roundActual.ganador = atacante.nombre;
      roundActual.finalizado = true;
    }

    // Guardar cambios en la partida
    PartidaRepository.save(partida);

    // Solo retornar la partida actualizada
    return partida;
  }

  static getHistorial1v1() {
    return PartidaRepository.getAll1v1();
  }

  static getHistorialEquipos() {
    return PartidaRepository.getAllEquipos();
  }

  static eliminarPartidaEquipo(id) {
    const PartidaRepository = require('../infrastructure/PartidaRepository');
    return PartidaRepository.deleteById(id, 'equipos');
  }

  static getPartidaById(id, tipo = 'equipos') {
    const PartidaRepository = require('../infrastructure/PartidaRepository');
    return PartidaRepository.getById(id, tipo);
  }
}

function resumenGanador(partida) {
  // Cuenta los rounds ganados por cada equipo
  let victorias1 = 0, victorias2 = 0;
  for (const r of partida.rounds) {
    if (!r.resultado) continue;
    if (partida.equipo1.some(p => p.id === r.id1) && r.resultado.ganador && r.resultado.ganador === (require('./PersonajeService').getById(r.id1)?.nombre)) {
      victorias1++;
    } else if (partida.equipo2.some(p => p.id === r.id2) && r.resultado.ganador && r.resultado.ganador === (require('./PersonajeService').getById(r.id2)?.nombre)) {
      victorias2++;
    }
  }
  if (victorias1 > victorias2) return 'Equipo 1';
  if (victorias2 > victorias1) return 'Equipo 2';
  return 'Empate';
}

module.exports = PartidaService; 