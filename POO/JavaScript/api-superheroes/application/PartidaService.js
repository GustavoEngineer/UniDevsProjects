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

    // Retornar estructura esperada por el endpoint
    return {
      round: round,
      accion: accion,
      defensorPerdio: defensorPerdio,
      ganador: roundActual.ganador,
      personajesDisponiblesEquipo1: partida.equipo1.map(p => p.id),
      personajesDisponiblesEquipo2: partida.equipo2.map(p => p.id)
    };
  }

  static jugarRound2Equipo(partidaId, idPersonajeAtacante, tipoGolpe) {
    // Cargar partidas desde partidas_equipos.json
    const partidas = PartidaRepository.getAllEquipos();
    const partida = partidas.find(p => p.Partida_ID === partidaId);
    if (!partida) throw new Error('Partida no encontrada');
    if (partida.finalizada) throw new Error('La partida ya finalizó');

    // Validar que el round 1 esté completado
    if (!partida.rounds || partida.rounds.length === 0 || !partida.rounds[0] || !partida.rounds[0].finalizado) {
      throw new Error('No puedes iniciar el round 2 hasta que el round 1 esté finalizado.');
    }

    const round1 = partida.rounds[0];
    const ganadorRound1 = round1.ganador;
    
    // Determinar qué equipo ganó el round 1
    const equipoGanadorRound1 = partida.equipo1.some(p => p.nombre === ganadorRound1) ? 1 : 2;
    const equipoPerdedorRound1 = equipoGanadorRound1 === 1 ? 2 : 1;

    // Obtener personajes disponibles para round 2
    const PersonajeService = require('./PersonajeService');
    
    // Equipo ganador: puede usar el personaje vivo del round 1 o el siguiente disponible (no el último)
    const equipoGanador = equipoGanadorRound1 === 1 ? partida.equipo1 : partida.equipo2;
    const personajeVivoRound1 = round1.personajes.find(p => p.nombre === ganadorRound1);
    const personajesGanadorDisponibles = equipoGanador.filter(p => p.id !== personajeVivoRound1.id);
    const siguientePersonajeGanador = personajesGanadorDisponibles[0]; // Primer personaje disponible (no el último)
    
    // Equipo perdedor: debe usar el siguiente personaje disponible (no el último)
    const equipoPerdedor = equipoPerdedorRound1 === 1 ? partida.equipo1 : partida.equipo2;
    const personajesPerdedorUsados = round1.personajes.map(p => p.id);
    const personajesPerdedorDisponibles = equipoPerdedor.filter(p => !personajesPerdedorUsados.includes(p.id));
    const siguientePersonajePerdedor = personajesPerdedorDisponibles[0]; // Primer personaje disponible (no el último)

    // Validar que el personaje atacante sea válido para round 2
    const personajesValidosRound2 = [];
    if (personajeVivoRound1) personajesValidosRound2.push(personajeVivoRound1.id);
    if (siguientePersonajeGanador) personajesValidosRound2.push(siguientePersonajeGanador.id);
    if (siguientePersonajePerdedor) personajesValidosRound2.push(siguientePersonajePerdedor.id);

    if (!personajesValidosRound2.includes(idPersonajeAtacante)) {
      throw new Error('Personaje no válido para el round 2. Personajes válidos: ' + personajesValidosRound2.join(', '));
    }

    // Inicializar round 2 si no existe
    if (!partida.rounds[1]) {
      console.log('🔧 Inicializando round 2...');
      console.log('- Personaje vivo round 1:', personajeVivoRound1?.nombre);
      console.log('- Siguiente equipo ganador:', siguientePersonajeGanador?.nombre);
      console.log('- Siguiente equipo perdedor:', siguientePersonajePerdedor?.nombre);
      
      // Crear lista de personajes para round 2
      const personajesRound2 = [];
      
      // Agregar personaje vivo del round 1
      if (personajeVivoRound1) {
        personajesRound2.push({
          id: personajeVivoRound1.id,
          nombre: personajeVivoRound1.nombre,
          vidaInicial: personajeVivoRound1.vidaActual,
          vidaActual: personajeVivoRound1.vidaActual
        });
      }
      
      // Agregar siguiente personaje del equipo ganador
      if (siguientePersonajeGanador) {
        personajesRound2.push({
          id: siguientePersonajeGanador.id,
          nombre: siguientePersonajeGanador.nombre,
          vidaInicial: 100,
          vidaActual: 100
        });
      }
      
      // Agregar siguiente personaje del equipo perdedor
      if (siguientePersonajePerdedor) {
        personajesRound2.push({
          id: siguientePersonajePerdedor.id,
          nombre: siguientePersonajePerdedor.nombre,
          vidaInicial: 100,
          vidaActual: 100
        });
      }
      
      console.log('- Personajes round 2:', personajesRound2.map(p => `${p.nombre} (${p.id})`));
      
      partida.rounds[1] = {
        round: 2,
        personajes: personajesRound2,
        acciones: [],
        finalizado: false,
        ganador: null
      };
    }

    const round2 = partida.rounds[1];
    
    // Verificar si el round 2 ya está finalizado
    if (round2.finalizado) {
      throw new Error('El round 2 ya está finalizado');
    }

    // Determinar atacante y defensor
    const atacante = round2.personajes.find(p => p.id === idPersonajeAtacante);
    if (!atacante) {
      throw new Error('Personaje atacante no encontrado en el round 2');
    }
    
    // Determinar a qué equipo pertenece el atacante
    const equipoAtacante = partida.equipo1.some(p => p.id === atacante.id) ? 1 : 2;
    
    // Determinar el defensor
    let defensor;
    const ultimaAccion = round2.acciones[round2.acciones.length - 1];
    
    if (ultimaAccion) {
      // Si hay una acción anterior, el defensor debe ser el último atacante del equipo contrario
      const ultimoAtacanteId = ultimaAccion.atacante.id;
      const ultimoAtacanteEquipo = partida.equipo1.some(p => p.id === ultimoAtacanteId) ? 1 : 2;
      
      // Verificar que el atacante actual sea del equipo contrario al último atacante
      if (ultimoAtacanteEquipo !== equipoAtacante) {
        // Contraataque directo: atacar al último atacante del equipo contrario
        defensor = round2.personajes.find(p => p.id === ultimoAtacanteId);
      } else {
        // Nuevo ataque: elegir cualquier personaje del equipo contrario
        defensor = round2.personajes.find(p => {
          const equipoDefensor = partida.equipo1.some(eq => eq.id === p.id) ? 1 : 2;
          return p.id !== atacante.id && equipoDefensor !== equipoAtacante;
        });
      }
      
      // Verificar que el defensor no sea el mismo que el atacante
      if (defensor && defensor.id === atacante.id) {
        throw new Error('No se puede atacar a sí mismo. Error en la lógica de contraataque.');
      }
    } else {
      // Primera acción del round 2: elegir cualquier personaje del equipo contrario
      defensor = round2.personajes.find(p => {
        const equipoDefensor = partida.equipo1.some(eq => eq.id === p.id) ? 1 : 2;
        return p.id !== atacante.id && equipoDefensor !== equipoAtacante;
      });
    }
    
    if (!defensor) {
      throw new Error('No se encontró un defensor válido del equipo contrario');
    }

    // Verificar que el personaje atacante no esté descalificado (vida <= 0)
    if (atacante.vidaActual <= 0) {
      throw new Error(`El personaje ${atacante.nombre} está descalificado (vida: ${atacante.vidaActual}). No puede atacar.`);
    }

    // Los personajes pueden ser usados múltiples veces en el round 2

    // Verificar turnos alternos entre equipos
    const ultimaAccionParaValidacion = round2.acciones[round2.acciones.length - 1];
    if (ultimaAccionParaValidacion) {
      const ultimoAtacanteId = ultimaAccionParaValidacion.atacante.id;
      const ultimoAtacanteEquipo = partida.equipo1.some(p => p.id === ultimoAtacanteId) ? 1 : 2;
      const atacanteActualEquipo = partida.equipo1.some(p => p.id === idPersonajeAtacante) ? 1 : 2;
      
      // Debe ser turno del equipo contrario
      if (ultimoAtacanteEquipo === atacanteActualEquipo) {
        throw new Error('No es tu turno. Debes esperar a que el otro equipo ataque.');
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
    const vidaAnterior = defensor.vidaActual;
    defensor.vidaActual = Math.max(0, vidaAnterior - danio);
    const vidaRestante = defensor.vidaActual;

    // Crear acción del round
    const accion = {
      numeroGolpe: round2.acciones.length + 1,
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
    round2.acciones.push(accion);

    // Verificar si el defensor perdió
    const defensorPerdio = vidaRestante <= 0;
    if (defensorPerdio) {
      round2.ganador = atacante.nombre;
      
      // Contar supervivientes por equipo
      const supervivientesEquipo1 = round2.personajes.filter(p => p.vidaActual > 0 && partida.equipo1.some(eq => eq.id === p.id)).length;
      const supervivientesEquipo2 = round2.personajes.filter(p => p.vidaActual > 0 && partida.equipo2.some(eq => eq.id === p.id)).length;
      
      // --- NUEVA LÓGICA: Finalizar round si todos los personajes disponibles del equipo anterior fueron eliminados ---
      const equipoPerdedor = equipoPerdedorRound1 === 1 ? partida.equipo1 : partida.equipo2;
      const idsPerdedorRound2 = personajesPerdedorDisponibles.map(p => p.id);
      const algunoVivoEquipoPerdedor = round2.personajes.some(p => idsPerdedorRound2.includes(p.id) && p.vidaActual > 0);
      // --- FIN NUEVA LÓGICA ---
      // --- NUEVA LÓGICA: Finalizar round si solo queda un personaje vivo en total ---
      const totalVivos = round2.personajes.filter(p => p.vidaActual > 0).length;
      if (!algunoVivoEquipoPerdedor || totalVivos === 1) {
        round2.finalizado = true;
      }
      // --- FIN NUEVA LÓGICA ---
    }

    // Guardar cambios en la partida
    PartidaRepository.save(partida);

    // Obtener personajes disponibles para round 2 con nombres (excluyendo los ya usados)
    const personajesDisponiblesRound2 = [];
    
    // Obtener personajes ya usados en este round 2
    const personajesUsadosEnRound2 = round2.acciones.map(accion => accion.atacante.id);
    
    // Solo agregar personajes que no han sido usados aún
    if (personajeVivoRound1 && !personajesUsadosEnRound2.includes(personajeVivoRound1.id)) {
      personajesDisponiblesRound2.push({
        id: personajeVivoRound1.id,
        nombre: personajeVivoRound1.nombre,
        equipo: equipoGanadorRound1 === 1 ? 'Equipo 1' : 'Equipo 2',
        tipo: 'Sobreviviente Round 1'
      });
    }
    if (siguientePersonajeGanador && !personajesUsadosEnRound2.includes(siguientePersonajeGanador.id)) {
      personajesDisponiblesRound2.push({
        id: siguientePersonajeGanador.id,
        nombre: siguientePersonajeGanador.nombre,
        equipo: equipoGanadorRound1 === 1 ? 'Equipo 1' : 'Equipo 2',
        tipo: 'Siguiente disponible'
      });
    }
    if (siguientePersonajePerdedor && !personajesUsadosEnRound2.includes(siguientePersonajePerdedor.id)) {
      personajesDisponiblesRound2.push({
        id: siguientePersonajePerdedor.id,
        nombre: siguientePersonajePerdedor.nombre,
        equipo: equipoPerdedorRound1 === 1 ? 'Equipo 1' : 'Equipo 2',
        tipo: 'Siguiente disponible'
      });
    }

    // Retornar solo información esencial
    return {
      round: 2,
      accion: accion,
      defensorPerdio: defensorPerdio,
      ganador: round2.ganador,
      personajesDisponiblesRound2: personajesDisponiblesRound2
    };
  }

  static jugarRound3Equipo(partidaId, idPersonajeAtacante, tipoGolpe) {
    // Cargar partidas desde partidas_equipos.json
    const partidas = PartidaRepository.getAllEquipos();
    const partida = partidas.find(p => p.Partida_ID === partidaId);
    if (!partida) throw new Error('Partida no encontrada');
    if (partida.finalizada) throw new Error('La partida ya finalizó');

    // Validar que el round 2 esté completado
    if (!partida.rounds || partida.rounds.length < 2 || !partida.rounds[1] || !partida.rounds[1].finalizado) {
      throw new Error('El round 2 debe estar completado antes de iniciar el round 3');
    }

    const round1 = partida.rounds[0];
    const round2 = partida.rounds[1];
    
    // Obtener personajes disponibles para round 3
    const PersonajeService = require('./PersonajeService');
    
    // Obtener todos los personajes de ambos equipos
    const todosLosPersonajes = [...partida.equipo1, ...partida.equipo2];
    
    // Filtrar personajes que no han sido usados en rounds anteriores
    const personajesUsadosEnRoundsAnteriores = [];
    
    // Agregar personajes del round 1
    if (round1.personajes) {
      personajesUsadosEnRoundsAnteriores.push(...round1.personajes.map(p => p.id));
    }
    
    // Agregar personajes del round 2
    if (round2.personajes) {
      personajesUsadosEnRoundsAnteriores.push(...round2.personajes.map(p => p.id));
    }
    
    // Personajes disponibles para round 3: los que no han sido usados en rounds anteriores
    const personajesDisponiblesRound3 = todosLosPersonajes.filter(p => 
      !personajesUsadosEnRoundsAnteriores.includes(p.id)
    );

    // Validar que el personaje atacante sea válido para round 3
    if (!personajesDisponiblesRound3.some(p => p.id === idPersonajeAtacante)) {
      const nombresDisponibles = personajesDisponiblesRound3.map(p => p.nombre).join(', ');
      throw new Error(`Personaje no válido para el round 3. Personajes disponibles: ${nombresDisponibles}`);
    }

    // Inicializar round 3 si no existe
    if (!partida.rounds[2]) {
      console.log('🔧 Inicializando round 3...');
      console.log('- Personajes disponibles:', personajesDisponiblesRound3.map(p => p.nombre));
      
      // Crear lista de personajes para round 3
      const personajesRound3 = personajesDisponiblesRound3.map(p => ({
        id: p.id,
        nombre: p.nombre,
        vidaInicial: 100,
        vidaActual: 100
      }));
      
      console.log('- Personajes round 3:', personajesRound3.map(p => `${p.nombre} (${p.id})`));
      
      partida.rounds[2] = {
        round: 3,
        personajes: personajesRound3,
        acciones: [],
        finalizado: false,
        ganador: null
      };
    }

    const round3 = partida.rounds[2];
    
    // Verificar si el round 3 ya está finalizado
    if (round3.finalizado) {
      throw new Error('El round 3 ya está finalizado');
    }

    // Determinar atacante y defensor
    const atacante = round3.personajes.find(p => p.id === idPersonajeAtacante);
    if (!atacante) {
      throw new Error('Personaje atacante no encontrado en el round 3');
    }
    
    // Determinar a qué equipo pertenece el atacante
    const equipoAtacante = partida.equipo1.some(p => p.id === atacante.id) ? 1 : 2;
    
    // Determinar el defensor
    let defensor;
    const ultimaAccion = round3.acciones[round3.acciones.length - 1];
    
    if (ultimaAccion) {
      // Si hay una acción anterior, el defensor debe ser el último atacante del equipo contrario
      const ultimoAtacanteId = ultimaAccion.atacante.id;
      const ultimoAtacanteEquipo = partida.equipo1.some(p => p.id === ultimoAtacanteId) ? 1 : 2;
      
      // Verificar que el atacante actual sea del equipo contrario al último atacante
      if (ultimoAtacanteEquipo !== equipoAtacante) {
        // Contraataque directo: atacar al último atacante del equipo contrario
        defensor = round3.personajes.find(p => p.id === ultimoAtacanteId);
      } else {
        // Nuevo ataque: elegir cualquier personaje del equipo contrario
        defensor = round3.personajes.find(p => {
          const equipoDefensor = partida.equipo1.some(eq => eq.id === p.id) ? 1 : 2;
          return p.id !== atacante.id && equipoDefensor !== equipoAtacante;
        });
      }
      
      // Verificar que el defensor no sea el mismo que el atacante
      if (defensor && defensor.id === atacante.id) {
        throw new Error('No se puede atacar a sí mismo. Error en la lógica de contraataque.');
      }
    } else {
      // Primera acción del round 3: elegir cualquier personaje del equipo contrario
      defensor = round3.personajes.find(p => {
        const equipoDefensor = partida.equipo1.some(eq => eq.id === p.id) ? 1 : 2;
        return p.id !== atacante.id && equipoDefensor !== equipoAtacante;
      });
    }
    
    if (!defensor) {
      throw new Error('No se encontró un defensor válido del equipo contrario');
    }

    // Verificar que el personaje atacante no esté descalificado (vida <= 0)
    if (atacante.vidaActual <= 0) {
      throw new Error(`El personaje ${atacante.nombre} está descalificado (vida: ${atacante.vidaActual}). No puede atacar.`);
    }

    // Los personajes pueden ser usados múltiples veces en el round 3

    // Verificar turnos alternos entre equipos
    const ultimaAccionParaValidacion = round3.acciones[round3.acciones.length - 1];
    if (ultimaAccionParaValidacion) {
      const ultimoAtacanteId = ultimaAccionParaValidacion.atacante.id;
      const ultimoAtacanteEquipo = partida.equipo1.some(p => p.id === ultimoAtacanteId) ? 1 : 2;
      const atacanteActualEquipo = partida.equipo1.some(p => p.id === idPersonajeAtacante) ? 1 : 2;
      
      // Debe ser turno del equipo contrario
      if (ultimoAtacanteEquipo === atacanteActualEquipo) {
        throw new Error('No es tu turno. Debes esperar a que el otro equipo ataque.');
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
    const vidaAnterior = defensor.vidaActual;
    defensor.vidaActual = Math.max(0, vidaAnterior - danio);
    const vidaRestante = defensor.vidaActual;

    // Crear acción del round
    const accion = {
      numeroGolpe: round3.acciones.length + 1,
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
    round3.acciones.push(accion);

    // Verificar si el defensor perdió
    const defensorPerdio = vidaRestante <= 0;
    if (defensorPerdio) {
      round3.ganador = atacante.nombre;
      round3.finalizado = true;
      
      // Finalizar la partida completa
      partida.finalizada = true;
      
      // Determinar ganador final de la partida
      let victoriasEquipo1 = 0;
      let victoriasEquipo2 = 0;
      
      for (const round of partida.rounds) {
        if (round.ganador) {
          const equipoGanador = partida.equipo1.some(p => p.nombre === round.ganador) ? 1 : 2;
          if (equipoGanador === 1) victoriasEquipo1++;
          else victoriasEquipo2++;
        }
      }
      
      partida.ganadorFinal = victoriasEquipo1 > victoriasEquipo2 ? 'Equipo 1' : 'Equipo 2';
    }

    // Guardar cambios en la partida
    PartidaRepository.save(partida);

    // Obtener personajes disponibles para round 3 con nombres
    const personajesDisponiblesRound3ConInfo = personajesDisponiblesRound3.map(p => ({
      id: p.id,
      nombre: p.nombre,
      equipo: partida.equipo1.some(eq => eq.id === p.id) ? 'Equipo 1' : 'Equipo 2',
      tipo: 'Disponible para Round 3'
    }));

    // Retornar información del round 3
    return {
      round: 3,
      accion: accion,
      defensorPerdio: defensorPerdio,
      ganador: round3.ganador,
      partidaFinalizada: partida.finalizada,
      ganadorFinal: partida.ganadorFinal,
      personajesDisponiblesRound3: personajesDisponiblesRound3ConInfo
    };
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