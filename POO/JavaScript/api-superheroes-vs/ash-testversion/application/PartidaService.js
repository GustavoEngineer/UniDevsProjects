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
      // Calcular nivelPoder actualizado
      const nivelPoderAtacante = atacante.nivelPoder || (atacante.vidaActual >= 201 ? 'Alfa' : atacante.vidaActual >= 101 ? 'beta' : 'omega');
      const nivelPoderDefensor = defensor.nivelPoder || (defensor.vidaActual >= 201 ? 'Alfa' : defensor.vidaActual >= 101 ? 'beta' : 'omega');
      partida.registrarAccion({
        atacanteId: atacante.id,
        defensorId: defensor.id,
        golpe,
        danio,
        nivelPoderAtacante,
        nivelPoderDefensor
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
    const nextId = PartidaRepository.getNextId('equipos');

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

  static jugarRoundEquipo(round, partidaId, idPersonajeAtacante, tipoGolpe, usarEscudo, tipoEscudo) {
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
          { id: personaje1.id, nombre: personaje1.nombre, vidaInicial: 300, vidaActual: 300 },
          { id: personaje2.id, nombre: personaje2.nombre, vidaInicial: 300, vidaActual: 300 }
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

    // --- Lógica de escudo ---
    let escudoAplicado = null;
    if (usarEscudo && tipoEscudo && Array.isArray(personajeRoundDefensor.escudos)) {
      const idx = personajeRoundDefensor.escudos.indexOf(tipoEscudo);
      if (idx !== -1) {
        escudoAplicado = tipoEscudo;
        personajeRoundDefensor.escudos.splice(idx, 1); // Consumir escudo
      }
    }
    // Determinar nivel de poder del atacante
    let nivelPoderAtacante = 'omega';
    if (personajeRoundAtacante.vidaActual >= 201) nivelPoderAtacante = 'Alfa'; else if (personajeRoundAtacante.vidaActual >= 101 && personajeRoundAtacante.vidaActual < 201) nivelPoderAtacante = 'beta';
    // Calcular daño según el tipo de golpe y nivel de poder
    let danio = calcularDanio(tipoGolpe, nivelPoderAtacante);
    // Lógica de golpe crítico automático
    let danioCritico = false;
    let valorDanioCritico = 0;
    if (Math.random() < 0.2) {
      danioCritico = true;
      valorDanioCritico = Math.floor(personajeRoundDefensor.vidaActual * 0.4);
    }
    let danioTotal = danio + valorDanioCritico;
    // Aplicar efecto de escudo si corresponde
    if (escudoAplicado === 'dorado') {
      if (danioCritico) {
        danioTotal = 0;
      } else {
        const reduccion = 0.8 + Math.random() * 0.2;
        danioTotal = Math.round(danioTotal * (1 - reduccion));
      }
    } else if (escudoAplicado === 'azul') {
      if (danioCritico) {
        danioTotal = Math.round(danioTotal * 0.75);
      } else {
        danioTotal = Math.round(danioTotal * 0.5);
      }
    } else if (escudoAplicado === 'verde') {
      if (danioCritico) {
        // No protege críticos
      } else {
        const reduccion = 0.2 + Math.random() * 0.1;
        danioTotal = Math.round(danioTotal * (1 - reduccion));
      }
    }
    // Aplicar daño al defensor
    const vidaAnterior = personajeRoundDefensor.vidaActual;
    personajeRoundDefensor.vidaActual = Math.max(0, vidaAnterior - danioTotal);
    const vidaRestante = personajeRoundDefensor.vidaActual;
    // Calcular nivelPoder actualizado
    const nivelPoderDefensor = personajeRoundDefensor.nivelPoder || (personajeRoundDefensor.vidaActual >= 201 ? 'Alfa' : personajeRoundDefensor.vidaActual >= 101 ? 'beta' : 'omega');
    // Crear acción del round
    const accion = {
      numeroGolpe: roundActual.acciones.length + 1, // Número secuencial del golpe
      atacante: {
        id: atacante.id,
        nombre: atacante.nombre,
        nivelPoder: nivelPoderAtacante
      },
      defensor: {
        id: defensor.id,
        nombre: defensor.nombre,
        nivelPoder: nivelPoderDefensor
      },
      tipoGolpe: tipoGolpe,
      danio: danio,
      danioCritico: danioCritico,
      valorDanioCritico: valorDanioCritico,
      danioTotal: danioTotal,
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

    // Mostrar todos los personajes que pueden estar en el round 1, con estatus y vida actualizada
    const personajesDisponiblesRound1 = roundActual.personajes.map(p => {
      let nivelPoder = 'omega';
      if (p.vidaActual >= 201) nivelPoder = 'Alfa'; else if (p.vidaActual >= 101 && p.vidaActual < 201) nivelPoder = 'beta';
      return {
        id: p.id,
        nombre: p.nombre,
        equipo: partida.equipo1.some(eq => eq.id === p.id) ? 'Equipo 1' : 'Equipo 2',
        tipo: 'Participante Round 1',
        vidaActual: p.vidaActual,
        estatus: p.vidaActual > 0 ? 'Vivo' : 'Eliminado',
        nivelPoder,
        nivelEnergia: p.nivelEnergia ?? 0
      };
    });

    // Retornar estructura esperada por el endpoint
    return {
      round: round,
      accion: accion,
      defensorPerdio: defensorPerdio,
      ganador: roundActual.ganador,
      personajesDisponiblesRound1: personajesDisponiblesRound1
    };
  }

  static jugarRound2Equipo(partidaId, idPersonajeAtacante, tipoGolpe, usarEscudo, tipoEscudo) {
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
    const personajesValidosRound2 = round2.personajes.filter(p => p.vidaActual > 0).map(p => p.id);
    if (!personajesValidosRound2.includes(idPersonajeAtacante)) {
      const personajesValidosInfo = round2.personajes.filter(p => p.vidaActual > 0).map(p => ({ id: p.id, nombre: p.nombre }));
      const personajeSolicitado = round2.personajes.find(p => p.id === idPersonajeAtacante);
      if (personajeSolicitado && personajeSolicitado.vidaActual <= 0) {
        // Buscar quién lo eliminó
        const accionMuerte = round2.acciones.find(a => a.defensor.id === personajeSolicitado.id && a.vidaRestante === 0);
        const asesino = accionMuerte ? accionMuerte.atacante : null;
        throw new Error(`El personaje '${personajeSolicitado.nombre}' (ID: ${personajeSolicitado.id}) está eliminado${asesino ? `, fue eliminado por '${asesino.nombre}' (ID: ${asesino.id})` : ''}. Personajes válidos para atacar: ${JSON.stringify(personajesValidosInfo)}`);
      } else {
        throw new Error(`Personaje no válido para el round 2. Personajes válidos para atacar: ${JSON.stringify(personajesValidosInfo)}`);
      }
    }
    // Verificar turnos alternos entre equipos
    const ultimaAccionParaValidacion2 = round2.acciones[round2.acciones.length - 1];
    if (ultimaAccionParaValidacion2) {
      const ultimoAtacanteId = ultimaAccionParaValidacion2.atacante.id;
      const ultimoAtacanteEquipo = partida.equipo1.some(p => p.id === ultimoAtacanteId) ? 1 : 2;
      const atacanteActualEquipo = partida.equipo1.some(p => p.id === idPersonajeAtacante) ? 1 : 2;
      if (ultimoAtacanteEquipo === atacanteActualEquipo) {
        const personajesValidosInfo = round2.personajes.filter(p => p.vidaActual > 0).map(p => ({ id: p.id, nombre: p.nombre }));
        throw new Error(`No es tu turno. Debes esperar a que el otro equipo ataque. Personajes válidos para atacar: ${JSON.stringify(personajesValidosInfo)}`);
      }
    }
    // Verificar que el personaje atacante no esté eliminado
    const atacante2 = round2.personajes.find(p => p.id === idPersonajeAtacante);
    if (atacante2.vidaActual <= 0) {
      const accionMuerte = round2.acciones.find(a => a.defensor.id === atacante2.id && a.vidaRestante === 0);
      const asesino = accionMuerte ? accionMuerte.atacante : null;
      throw new Error(`El personaje '${atacante2.nombre}' (ID: ${atacante2.id}) está eliminado${asesino ? `, fue eliminado por '${asesino.nombre}' (ID: ${asesino.id})` : ''}.`);
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
          vidaInicial: 300,
          vidaActual: 300
        });
      }
      
      // Agregar siguiente personaje del equipo perdedor
      if (siguientePersonajePerdedor) {
        personajesRound2.push({
          id: siguientePersonajePerdedor.id,
          nombre: siguientePersonajePerdedor.nombre,
          vidaInicial: 300,
          vidaActual: 300
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
      // Buscar quién lo eliminó
      const accionMuerte = round2.acciones.find(a => a.defensor.id === atacante.id && a.vidaRestante === 0);
      const asesino = accionMuerte ? accionMuerte.atacante : null;
      throw new Error(`El personaje '${atacante.nombre}' (ID: ${atacante.id}) está eliminado${asesino ? `, fue eliminado por '${asesino.nombre}' (ID: ${asesino.id})` : ''}.`);
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
        const personajesValidosInfo = round2.personajes.filter(p => p.vidaActual > 0).map(p => ({ id: p.id, nombre: p.nombre }));
        throw new Error(`No es tu turno. Debes esperar a que el otro equipo ataque. Personajes válidos para atacar: ${JSON.stringify(personajesValidosInfo)}`);
      }
    }

    // Determinar nivel de poder del atacante
    let nivelPoderAtacante = 'omega';
    if (atacante.vidaActual >= 201) nivelPoderAtacante = 'Alfa'; else if (atacante.vidaActual >= 101 && atacante.vidaActual < 201) nivelPoderAtacante = 'beta';
    // Calcular daño según el tipo de golpe y nivel de poder
    let danio = calcularDanio(tipoGolpe, nivelPoderAtacante);
    // Lógica de golpe crítico automático
    let danioCritico = false;
    let valorDanioCritico = 0;
    if (Math.random() < 0.2) {
      danioCritico = true;
      valorDanioCritico = Math.floor(defensor.vidaActual * 0.4);
    }
    let danioTotal = danio + valorDanioCritico;
    // --- Lógica de escudo ---
    let escudoAplicado = null;
    if (usarEscudo && tipoEscudo && Array.isArray(defensor.escudos)) {
      const idx = defensor.escudos.indexOf(tipoEscudo);
      if (idx !== -1) {
        escudoAplicado = tipoEscudo;
        defensor.escudos.splice(idx, 1); // Consumir escudo
      }
    }
    // Aplicar efecto de escudo si corresponde
    if (escudoAplicado === 'dorado') {
      if (danioCritico) {
        danioTotal = 0;
      } else {
        const reduccion = 0.8 + Math.random() * 0.2;
        danioTotal = Math.round(danioTotal * (1 - reduccion));
      }
    } else if (escudoAplicado === 'azul') {
      if (danioCritico) {
        danioTotal = Math.round(danioTotal * 0.75);
      } else {
        danioTotal = Math.round(danioTotal * 0.5);
      }
    } else if (escudoAplicado === 'verde') {
      if (danioCritico) {
        // No protege críticos
      } else {
        const reduccion = 0.2 + Math.random() * 0.1;
        danioTotal = Math.round(danioTotal * (1 - reduccion));
      }
    }
    // Aplicar daño al defensor
    const vidaAnterior = defensor.vidaActual;
    defensor.vidaActual = Math.max(0, vidaAnterior - danioTotal);
    const vidaRestante = defensor.vidaActual;

    // Incrementar nivelEnergia del defensor según su nivel de poder
    let incrementoEnergia = 0;
    if (nivelPoderDefensor === 'Alfa') incrementoEnergia = 50;
    else if (nivelPoderDefensor === 'beta') incrementoEnergia = 33;
    else incrementoEnergia = 25;
    if (typeof defensor.nivelEnergia !== 'number') defensor.nivelEnergia = 0;
    defensor.nivelEnergia = Math.min(100, defensor.nivelEnergia + incrementoEnergia);

    // Otorgar escudo si la energía llegó a 100
    if (defensor.nivelEnergia >= 100) {
      let escudoObtenido = null;
      // Determinar nivel de poder actual
      let nivelPoderDefensor = 'omega';
      if (defensor.vidaActual >= 201) nivelPoderDefensor = 'Alfa';
      else if (defensor.vidaActual >= 101) nivelPoderDefensor = 'beta';
      // Probabilidades y lógica de escudos
      const rand = Math.random();
      if (nivelPoderDefensor === 'Alfa') {
        if (rand < 0.6) escudoObtenido = 'dorado';
        else if (rand < 0.6 + 0.8) escudoObtenido = 'azul'; // 0.6 + 0.8 = 1.4, pero como 0.6 ya fue, solo 0.8 más
        else if (rand < 0.6 + 0.8 + 0.85) escudoObtenido = 'verde';
      } else if (nivelPoderDefensor === 'beta') {
        if (rand < 0.9) escudoObtenido = 'azul';
        else if (rand < 0.9 + 0.85) escudoObtenido = 'verde';
      } else if (nivelPoderDefensor === 'omega') {
        if (rand < 0.25) escudoObtenido = 'azul';
        else if (rand < 0.25 + 0.85) escudoObtenido = 'verde';
      }
      // Si no se asignó por probabilidad, forzar verde como fallback
      if (!escudoObtenido) escudoObtenido = 'verde';
      if (!Array.isArray(defensor.escudos)) defensor.escudos = [];
      defensor.escudos.push(escudoObtenido);
      defensor.nivelEnergia = 0;
    }

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
      danioCritico: danioCritico,
      valorDanioCritico: valorDanioCritico,
      danioTotal: danioTotal,
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

    // Mostrar todos los personajes que pueden estar en el round 2, con estatus y vida actualizada
    const personajesDisponiblesRound2 = round2.personajes.map(p => {
      let nivelPoder = 'omega';
      if (p.vidaActual >= 201) nivelPoder = 'Alfa'; else if (p.vidaActual >= 101 && p.vidaActual < 201) nivelPoder = 'beta';
      return {
        id: p.id,
        nombre: p.nombre,
        equipo: partida.equipo1.some(eq => eq.id === p.id) ? 'Equipo 1' : 'Equipo 2',
        tipo: (personajeVivoRound1 && p.id === personajeVivoRound1.id) ? 'Sobreviviente Round 1' : 'Siguiente disponible',
        vidaActual: p.vidaActual,
        estatus: p.vidaActual > 0 ? 'Vivo' : 'Eliminado',
        nivelPoder,
        nivelEnergia: p.nivelEnergia ?? 0
      };
    });

    // Retornar solo información esencial
    return {
      round: 2,
      accion: accion,
      defensorPerdio: defensorPerdio,
      ganador: round2.ganador,
      personajesDisponiblesRound2: personajesDisponiblesRound2
    };
  }

  static jugarRound3Equipo(partidaId, idPersonajeAtacante, tipoGolpe, usarEscudo, tipoEscudo) {
    // Cargar partidas desde partidas_equipos.json
    const partidas = PartidaRepository.getAllEquipos();
    const partida = partidas.find(p => p.Partida_ID === partidaId);
    if (!partida) throw new Error('Partida no encontrada');
    if (partida.finalizada) throw new Error('La partida ya finalizó');

    // Validar que el round 2 esté completado
    if (!partida.rounds || partida.rounds.length < 2 || !partida.rounds[1] || !partida.rounds[1].finalizado) {
      throw new Error('No puedes iniciar el round 3 hasta que el round 2 esté finalizado.');
    }

    const round1 = partida.rounds[0];
    const round2 = partida.rounds[1];

    // Determinar sobreviviente de round 2
    const ganadorRound2 = round2.ganador;
    const personajeVivoRound2 = round2.personajes.find(p => p.nombre === ganadorRound2);

    // Obtener siguiente personaje disponible de cada equipo (que no haya jugado en round 1 ni 2)
    const personajesUsados = [];
    if (round1.personajes) personajesUsados.push(...round1.personajes.map(p => p.id));
    if (round2.personajes) personajesUsados.push(...round2.personajes.map(p => p.id));
    const todosLosPersonajes = [...partida.equipo1, ...partida.equipo2];
    const personajesNoUsados = todosLosPersonajes.filter(p => !personajesUsados.includes(p.id));

    // Para round 3: sobreviviente de round 2 + siguiente disponible de cada equipo (si hay)
    const personajesRound3 = [];
    if (personajeVivoRound2) {
      personajesRound3.push({
        id: personajeVivoRound2.id,
        nombre: personajeVivoRound2.nombre,
        equipo: partida.equipo1.some(eq => eq.id === personajeVivoRound2.id) ? 'Equipo 1' : 'Equipo 2',
        tipo: 'Sobreviviente Round 2',
        vidaActual: personajeVivoRound2.vidaActual,
        estatus: personajeVivoRound2.vidaActual > 0 ? 'Vivo' : 'Eliminado'
      });
    }
    // Siguiente disponible de cada equipo
    const equipos = [partida.equipo1, partida.equipo2];
    equipos.forEach((equipo, idx) => {
      const disponibles = equipo.filter(p => !personajesUsados.includes(p.id));
      if (disponibles.length > 0) {
        const siguiente = disponibles[0];
        personajesRound3.push({
          id: siguiente.id,
          nombre: siguiente.nombre,
          equipo: idx === 0 ? 'Equipo 1' : 'Equipo 2',
          tipo: 'Siguiente disponible',
          vidaActual: 300,
          estatus: 'Vivo'
        });
      }
    });

    // Inicializar round 3 si no existe
    if (!partida.rounds[2]) {
      partida.rounds[2] = {
        round: 3,
        personajes: personajesRound3.map(p => ({
          id: p.id,
          nombre: p.nombre,
          vidaInicial: 300,
          vidaActual: 300
        })),
        acciones: [],
        finalizado: false,
        ganador: null
      };
    }

    const round3 = partida.rounds[2];
    if (round3.finalizado) {
      throw new Error('El round 3 ya está finalizado');
    }

    // Determinar atacante y defensor
    const atacante = round3.personajes.find(p => p.id === idPersonajeAtacante);
    if (!atacante) {
      throw new Error('Personaje atacante no encontrado en el round 3');
    }
    // Validar que el personaje atacante sea válido para round 3
    const personajesValidosRound3 = round3.personajes.filter(p => p.vidaActual > 0).map(p => p.id);
    if (!personajesValidosRound3.includes(idPersonajeAtacante)) {
      const personajesValidosInfo = round3.personajes.filter(p => p.vidaActual > 0).map(p => ({ id: p.id, nombre: p.nombre }));
      const personajeSolicitado = round3.personajes.find(p => p.id === idPersonajeAtacante);
      if (personajeSolicitado && personajeSolicitado.vidaActual <= 0) {
        // Buscar quién lo eliminó
        const accionMuerte = round3.acciones.find(a => a.defensor.id === personajeSolicitado.id && a.vidaRestante === 0);
        const asesino = accionMuerte ? accionMuerte.atacante : null;
        throw new Error(`El personaje '${personajeSolicitado.nombre}' (ID: ${personajeSolicitado.id}) está eliminado${asesino ? `, fue eliminado por '${asesino.nombre}' (ID: ${asesino.id})` : ''}. Personajes válidos para atacar: ${JSON.stringify(personajesValidosInfo)}`);
      } else {
        throw new Error(`Personaje no válido para el round 3. Personajes válidos para atacar: ${JSON.stringify(personajesValidosInfo)}`);
      }
    }
    // Verificar turnos alternos entre equipos
    const ultimaAccionParaValidacion3 = round3.acciones[round3.acciones.length - 1];
    if (ultimaAccionParaValidacion3) {
      const ultimoAtacanteId = ultimaAccionParaValidacion3.atacante.id;
      const ultimoAtacanteEquipo = partida.equipo1.some(p => p.id === ultimoAtacanteId) ? 1 : 2;
      const atacanteActualEquipo = partida.equipo1.some(p => p.id === idPersonajeAtacante) ? 1 : 2;
      if (ultimoAtacanteEquipo === atacanteActualEquipo) {
        const personajesValidosInfo = round3.personajes.filter(p => p.vidaActual > 0).map(p => ({ id: p.id, nombre: p.nombre }));
        throw new Error(`No es tu turno. Debes esperar a que el otro equipo ataque. Personajes válidos para atacar: ${JSON.stringify(personajesValidosInfo)}`);
      }
    }
    // Verificar que el personaje atacante no esté eliminado
    const atacante3 = round3.personajes.find(p => p.id === idPersonajeAtacante);
    if (atacante3.vidaActual <= 0) {
      const accionMuerte = round3.acciones.find(a => a.defensor.id === atacante3.id && a.vidaRestante === 0);
      const asesino = accionMuerte ? accionMuerte.atacante : null;
      throw new Error(`El personaje '${atacante3.nombre}' (ID: ${atacante3.id}) está eliminado${asesino ? `, fue eliminado por '${asesino.nombre}' (ID: ${asesino.id})` : ''}.`);
    }

    // Determinar a qué equipo pertenece el atacante
    const equipoAtacante = partida.equipo1.some(p => p.id === atacante.id) ? 1 : 2;
    // Determinar el defensor
    let defensor;
    const ultimaAccion = round3.acciones[round3.acciones.length - 1];
    if (ultimaAccion) {
      const ultimoAtacanteId = ultimaAccion.atacante.id;
      const ultimoAtacanteEquipo = partida.equipo1.some(p => p.id === ultimoAtacanteId) ? 1 : 2;
      if (ultimoAtacanteEquipo !== equipoAtacante) {
        defensor = round3.personajes.find(p => p.id === ultimoAtacanteId);
      } else {
        defensor = round3.personajes.find(p => {
          const equipoDefensor = partida.equipo1.some(eq => eq.id === p.id) ? 1 : 2;
          return p.id !== atacante.id && equipoDefensor !== equipoAtacante;
        });
      }
      if (defensor && defensor.id === atacante.id) {
        throw new Error('No se puede atacar a sí mismo. Error en la lógica de contraataque.');
      }
    } else {
      defensor = round3.personajes.find(p => {
        const equipoDefensor = partida.equipo1.some(eq => eq.id === p.id) ? 1 : 2;
        return p.id !== atacante.id && equipoDefensor !== equipoAtacante;
      });
    }
    if (!defensor) {
      throw new Error('No se encontró un defensor válido del equipo contrario');
    }
    // Verificar turnos alternos entre equipos
    const ultimaAccionParaValidacion = round3.acciones[round3.acciones.length - 1];
    if (ultimaAccionParaValidacion) {
      const ultimoAtacanteId = ultimaAccionParaValidacion.atacante.id;
      const ultimoAtacanteEquipo = partida.equipo1.some(p => p.id === ultimoAtacanteId) ? 1 : 2;
      const atacanteActualEquipo = partida.equipo1.some(p => p.id === idPersonajeAtacante) ? 1 : 2;
      if (ultimoAtacanteEquipo === atacanteActualEquipo) {
        throw new Error('No es tu turno. Debes esperar a que el otro equipo ataque.');
      }
    }
    // Determinar nivel de poder del atacante
    let nivelPoderAtacante = 'omega';
    if (atacante.vidaActual >= 201) nivelPoderAtacante = 'Alfa'; else if (atacante.vidaActual >= 101 && atacante.vidaActual < 201) nivelPoderAtacante = 'beta';
    // Calcular daño según el tipo de golpe y nivel de poder
    let danio = calcularDanio(tipoGolpe, nivelPoderAtacante);
    // Lógica de golpe crítico automático
    let danioCritico = false;
    let valorDanioCritico = 0;
    if (Math.random() < 0.2) {
      danioCritico = true;
      valorDanioCritico = Math.floor(defensor.vidaActual * 0.4);
    }
    let danioTotal = danio + valorDanioCritico;
    // --- Lógica de escudo ---
    let escudoAplicado = null;
    if (usarEscudo && tipoEscudo && Array.isArray(defensor.escudos)) {
      const idx = defensor.escudos.indexOf(tipoEscudo);
      if (idx !== -1) {
        escudoAplicado = tipoEscudo;
        defensor.escudos.splice(idx, 1); // Consumir escudo
      }
    }
    // Aplicar efecto de escudo si corresponde
    if (escudoAplicado === 'dorado') {
      if (danioCritico) {
        danioTotal = 0;
      } else {
        const reduccion = 0.8 + Math.random() * 0.2;
        danioTotal = Math.round(danioTotal * (1 - reduccion));
      }
    } else if (escudoAplicado === 'azul') {
      if (danioCritico) {
        danioTotal = Math.round(danioTotal * 0.75);
      } else {
        danioTotal = Math.round(danioTotal * 0.5);
      }
    } else if (escudoAplicado === 'verde') {
      if (danioCritico) {
        // No protege críticos
      } else {
        const reduccion = 0.2 + Math.random() * 0.1;
        danioTotal = Math.round(danioTotal * (1 - reduccion));
      }
    }
    // Aplicar daño al defensor
    const vidaAnterior = defensor.vidaActual;
    defensor.vidaActual = Math.max(0, vidaAnterior - danioTotal);
    const vidaRestante = defensor.vidaActual;
    // Incrementar nivelEnergia del defensor (proporcional al daño recibido, tope 100)
    if (typeof defensor.nivelEnergia !== 'number') defensor.nivelEnergia = 0;
    const incrementoEnergia = Math.round((danioTotal / 160) * (100 / 3));
    defensor.nivelEnergia = Math.min(100, defensor.nivelEnergia + incrementoEnergia);
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
      danioCritico: danioCritico,
      valorDanioCritico: valorDanioCritico,
      danioTotal: danioTotal,
      vidaRestante: vidaRestante,
      timestamp: new Date().toISOString()
    };
    round3.acciones.push(accion);
    // Verificar si el defensor perdió
    const defensorPerdio = vidaRestante <= 0;
    if (defensorPerdio) {
      round3.ganador = atacante.nombre;
      // NO finalizar aún, solo marcar ganador provisional
    }

    // Verificar si solo queda un equipo con personajes vivos
    const vivosEquipo1 = round3.personajes.filter(p => p.vidaActual > 0 && partida.equipo1.some(eq => eq.id === p.id)).length;
    const vivosEquipo2 = round3.personajes.filter(p => p.vidaActual > 0 && partida.equipo2.some(eq => eq.id === p.id)).length;
    if (vivosEquipo1 === 0 || vivosEquipo2 === 0) {
      round3.finalizado = true;
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

      // Resumen de sobrevivientes
      const equipoGanador = vivosEquipo1 > 0 ? 'Equipo 1' : 'Equipo 2';
      const equipoPerdedor = vivosEquipo1 > 0 ? 'Equipo 2' : 'Equipo 1';
      const sobrevivientesGanador = round3.personajes.filter(p => p.vidaActual > 0 && ((equipoGanador === 'Equipo 1' && partida.equipo1.some(eq => eq.id === p.id)) || (equipoGanador === 'Equipo 2' && partida.equipo2.some(eq => eq.id === p.id)))).map(p => ({ id: p.id, nombre: p.nombre, vidaFinal: p.vidaActual }));
      const sobrevivientesPerdedor = round3.personajes.filter(p => p.vidaActual > 0 && ((equipoPerdedor === 'Equipo 1' && partida.equipo1.some(eq => eq.id === p.id)) || (equipoPerdedor === 'Equipo 2' && partida.equipo2.some(eq => eq.id === p.id)))).map(p => ({ id: p.id, nombre: p.nombre, vidaFinal: p.vidaActual }));
      round3.resumenFinal = {
        equipoGanador,
        equipoPerdedor,
        sobrevivientesGanador,
        sobrevivientesPerdedor
      };
    }
    PartidaRepository.save(partida);
    // Mostrar todos los personajes que pueden estar en el round 3, con estatus y vida actualizada
    const personajesDisponiblesRound3 = round3.personajes.map(p => {
      let nivelPoder = 'omega';
      if (p.vidaActual >= 201) nivelPoder = 'Alfa'; else if (p.vidaActual >= 101 && p.vidaActual < 201) nivelPoder = 'beta';
      return {
        id: p.id,
        nombre: p.nombre,
        equipo: partida.equipo1.some(eq => eq.id === p.id) ? 'Equipo 1' : 'Equipo 2',
        tipo: (personajeVivoRound2 && p.id === personajeVivoRound2.id) ? 'Sobreviviente Round 2' : 'Siguiente disponible',
        vidaActual: p.vidaActual,
        estatus: p.vidaActual > 0 ? 'Vivo' : 'Eliminado',
        nivelPoder,
        nivelEnergia: p.nivelEnergia ?? 0
      };
    });
    return {
      round: 3,
      accion: accion,
      defensorPerdio: defensorPerdio,
      ganador: round3.ganador,
      partidaFinalizada: partida.finalizada,
      ganadorFinal: partida.ganadorFinal,
      personajesDisponiblesRound3: personajesDisponiblesRound3,
      ...(round3.finalizado && round3.resumenFinal ? { resumenFinal: round3.resumenFinal } : {})
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

  // NUEVO: Ataque por ataque para 1v1
  static ataque1v1(partidaId, idPersonajeAtacante, tipoGolpe, usarEscudo, tipoEscudo) {
    // Buscar la partida
    const partidas = PartidaRepository.getAll1v1();
    const partida = partidas.find(p => p.Partida_ID === partidaId);
    if (!partida) throw new Error('Partida no encontrada');
    if (partida.finalizada) throw new Error('La partida ya finalizó');

    // Inicializar estructura de personajes si no existe
    if (!partida.personajes || partida.personajes.length !== 2) {
      throw new Error('Partida 1v1 mal inicializada');
    }
    // Usar historialAcciones para 1v1
    if (!partida.historialAcciones) partida.historialAcciones = [];

    // Vida actual de cada personaje (persistente)
    if (typeof partida.personajes[0].vidaActual !== 'number') partida.personajes[0].vidaActual = 300;
    if (typeof partida.personajes[1].vidaActual !== 'number') partida.personajes[1].vidaActual = 300;

    // Validar personajes válidos
    const personajesValidos = partida.personajes.filter(p => p.vidaActual > 0).map(p => p.id);
    if (!personajesValidos.includes(idPersonajeAtacante)) {
      const personajesDisponibles = partida.personajes.filter(p => p.vidaActual > 0).map(p => ({ id: p.id, nombre: p.nombre }));
      throw new Error(
        'Personaje no válido para el ataque. ' +
        'Personajes válidos para atacar: ' +
        personajesDisponibles.map(p => `${p.nombre} (ID: ${p.id})`).join(', ')
      );
    }
    // Verificar turnos alternos
    const ultimaAccion = partida.historialAcciones[partida.historialAcciones.length - 1];
    if (ultimaAccion && ultimaAccion.atacante.id === idPersonajeAtacante) {
      const personajesValidosInfo = partida.personajes.filter(p => p.vidaActual > 0).map(p => ({ id: p.id, nombre: p.nombre }));
      throw new Error(
        'No es tu turno. Debes esperar a que el otro personaje ataque. ' +
        'Personajes válidos para atacar: ' +
        personajesValidosInfo.map(p => `${p.nombre} (ID: ${p.id})`).join(', ')
      );
    }
    // Verificar que el personaje atacante no esté eliminado
    const personajeAtacante = partida.personajes.find(p => p.id === idPersonajeAtacante);
    if (personajeAtacante.vidaActual <= 0) {
      const accionMuerte = partida.historialAcciones.find(a => a.defensor.id === personajeAtacante.id && a.vidaRestante === 0);
      const asesino = accionMuerte ? accionMuerte.atacante : null;
      throw new Error(`El personaje '${personajeAtacante.nombre}' (ID: ${personajeAtacante.id}) está eliminado${asesino ? `, fue eliminado por '${asesino.nombre}' (ID: ${asesino.id})` : ''}.`);
    }
    // Determinar defensor
    const personajeDefensor = partida.personajes.find(p => p.id !== idPersonajeAtacante);
    if (!personajeDefensor || personajeDefensor.vidaActual <= 0) {
      throw new Error('No hay defensor válido.');
    }
    // --- Lógica de escudo ---
    let escudoAplicado = null;
    if (usarEscudo && tipoEscudo) {
      const escudosArray = Array.isArray(personajeDefensor.escudos) ? personajeDefensor.escudos : [];
      const idx = escudosArray.findIndex(e => String(e).toLowerCase() === String(tipoEscudo).toLowerCase());
      if (idx === -1) {
        return { exito: false, mensaje: 'El personaje no tiene escudos activos de ese tipo.', escudosDisponibles: personajeDefensor.escudos || [] };
      }
      escudoAplicado = escudosArray[idx];
      personajeDefensor.escudos.splice(idx, 1); // Consumir escudo
    }
    // Determinar nivel de poder del atacante
    let nivelPoderAtacante = 'omega';
    if (personajeAtacante.vidaActual >= 201) nivelPoderAtacante = 'Alfa';
    else if (personajeAtacante.vidaActual >= 101 && personajeAtacante.vidaActual < 201) nivelPoderAtacante = 'beta';
    // Calcular daño según el tipo de golpe y nivel de poder
    let danio = calcularDanio(tipoGolpe, nivelPoderAtacante);
    // Lógica de golpe crítico automático
    let danioCritico = false;
    let valorDanioCritico = 0;
    if (Math.random() < 0.2) {
      danioCritico = true;
      valorDanioCritico = Math.floor(personajeDefensor.vidaActual * 0.4);
    }
    let danioTotal = danio + valorDanioCritico;
    // Aplicar efecto de escudo si corresponde
    if (escudoAplicado === 'dorado') {
      if (danioCritico) {
        danioTotal = 0; // Anula críticos
      } else {
        // Reduce 80-100% daño
        const reduccion = 0.8 + Math.random() * 0.2; // 80-100%
        danioTotal = Math.round(danioTotal * (1 - reduccion));
      }
    } else if (escudoAplicado === 'azul') {
      if (danioCritico) {
        danioTotal = Math.round(danioTotal * 0.75); // Reduce 25% críticos
      } else {
        danioTotal = Math.round(danioTotal * 0.5); // Reduce 50% otros golpes
      }
    } else if (escudoAplicado === 'verde') {
      if (danioCritico) {
        // No protege críticos
      } else {
        const reduccion = 0.2 + Math.random() * 0.1; // 20-30%
        danioTotal = Math.round(danioTotal * (1 - reduccion));
      }
    }
    // Aplicar daño
    const vidaAnterior = personajeDefensor.vidaActual;
    personajeDefensor.vidaActual = Math.max(0, vidaAnterior - danioTotal);
    const vidaRestante = personajeDefensor.vidaActual;
    // Incrementar nivelEnergia del defensor según su nivel de poder
    let incrementoEnergia = 0;
    if (nivelPoderAtacante === 'Alfa') incrementoEnergia = 50;
    else if (nivelPoderAtacante === 'beta') incrementoEnergia = 33;
    else incrementoEnergia = 25;
    if (typeof personajeDefensor.nivelEnergia !== 'number') personajeDefensor.nivelEnergia = 0;
    personajeDefensor.nivelEnergia = Math.min(100, personajeDefensor.nivelEnergia + incrementoEnergia);

    // Otorgar escudo si la energía llegó a 100
    if (personajeDefensor.nivelEnergia >= 100) {
      let escudoObtenido = null;
      // Determinar nivel de poder actual
      let nivelPoderDefensor = 'omega';
      if (personajeDefensor.vidaActual >= 201) nivelPoderDefensor = 'Alfa';
      else if (personajeDefensor.vidaActual >= 101) nivelPoderDefensor = 'beta';
      // Probabilidades y lógica de escudos
      const rand = Math.random();
      if (nivelPoderDefensor === 'Alfa') {
        if (rand < 0.6) escudoObtenido = 'dorado';
        else if (rand < 0.6 + 0.8) escudoObtenido = 'azul';
        else if (rand < 0.6 + 0.8 + 0.85) escudoObtenido = 'verde';
      } else if (nivelPoderDefensor === 'beta') {
        if (rand < 0.9) escudoObtenido = 'azul';
        else if (rand < 0.9 + 0.85) escudoObtenido = 'verde';
      } else if (nivelPoderDefensor === 'omega') {
        if (rand < 0.25) escudoObtenido = 'azul';
        else if (rand < 0.25 + 0.85) escudoObtenido = 'verde';
      }
      // Si no se asignó por probabilidad, forzar verde como fallback
      if (!escudoObtenido) escudoObtenido = 'verde';
      if (!Array.isArray(personajeDefensor.escudos)) personajeDefensor.escudos = [];
      personajeDefensor.escudos.push(escudoObtenido);
      personajeDefensor.nivelEnergia = 0;
    }
    // Crear acción
    const accion = {
      numeroGolpe: partida.historialAcciones.length + 1,
      atacante: { id: personajeAtacante.id, nombre: personajeAtacante.nombre },
      defensor: { id: personajeDefensor.id, nombre: personajeDefensor.nombre },
      tipoGolpe,
      danio,
      danioCritico,
      valorDanioCritico,
      danioTotal,
      vidaRestante,
      timestamp: new Date().toISOString()
    };
    partida.historialAcciones.push(accion);
    // Verificar si el defensor perdió
    const defensorPerdio = vidaRestante <= 0;
    let ganador = null;
    let finalizada = false;
    if (defensorPerdio) {
      ganador = personajeAtacante.nombre;
      finalizada = true;
      partida.finalizada = true;
      // Resumen final
      const resumenFinal = {
        ganador: {
          id: personajeAtacante.id,
          nombre: personajeAtacante.nombre,
          vidaFinal: personajeAtacante.vidaActual
        },
        perdedor: {
          id: personajeDefensor.id,
          nombre: personajeDefensor.nombre,
          vidaFinal: personajeDefensor.vidaActual
        }
      };
      PartidaRepository.save(partida);
      return {
        mensaje: `¡${personajeAtacante.nombre} ha ganado la partida 1v1!`,
        resumenFinal,
        personajes: partida.personajes.map(p => ({
          id: p.id,
          nombre: p.nombre,
          vidaActual: p.vidaActual,
          estatus: p.vidaActual > 0 ? 'Vivo' : 'Eliminado'
        })),
        finalizada: true
      };
    }
    // Guardar cambios
    PartidaRepository.save(partida);
    // Personajes con estatus y nivelPoder
    const personajesAtaque = partida.personajes.map(p => {
      let nivelPoder = 'omega';
      if (p.vidaActual >= 201) nivelPoder = 'Alfa'; else if (p.vidaActual >= 101 && p.vidaActual < 201) nivelPoder = 'beta';
      return {
        id: p.id,
        nombre: p.nombre,
        vidaActual: p.vidaActual,
        estatus: p.vidaActual > 0 ? 'Vivo' : 'Eliminado',
        nivelPoder,
        nivelEnergia: p.nivelEnergia ?? 0
      };
    });
    // Incluir nivelPoder en la acción
    const accionConNivelPoder = {
      ...accion,
      atacante: { ...accion.atacante, nivelPoder: personajesAtaque.find(x => x.id === accion.atacante.id)?.nivelPoder },
      defensor: { ...accion.defensor, nivelPoder: personajesAtaque.find(x => x.id === accion.defensor.id)?.nivelPoder }
    };
    return {
      ataque: accionConNivelPoder,
      defensorPerdio,
      ganador,
      finalizada,
      personajes: personajesAtaque
    };
  }

  // Obtener partida 1v1 por ID
  static getPartida1v1ById(id) {
    try {
      return require('../infrastructure/PartidaRepository').getById(id, '1v1');
    } catch (e) {
      return null;
    }
  }

  // Eliminar partida 1v1 por ID
  static deletePartida1v1ById(id) {
    try {
      return require('../infrastructure/PartidaRepository').deleteById(id, '1v1');
    } catch (e) {
      return false;
    }
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

function calcularDanio(tipoGolpe, nivelPoder) {
  if (nivelPoder === 'Alfa') {
    if (tipoGolpe === 'golpeBasico') return Math.floor(Math.random() * (30 - 15 + 1)) + 15; // 15-30
    if (tipoGolpe === 'golpeEspecial') return Math.floor(Math.random() * (105 - 65 + 1)) + 65; // 65-105
    if (tipoGolpe === 'golpeCritico') return Math.floor(Math.random() * (135 - 105 + 1)) + 105; // 105-135
  } else if (nivelPoder === 'beta') {
    if (tipoGolpe === 'golpeBasico') return Math.floor(Math.random() * (15 - 1 + 1)) + 1; // 1-15
    if (tipoGolpe === 'golpeEspecial') return Math.floor(Math.random() * (65 - 35 + 1)) + 35; // 35-65
    if (tipoGolpe === 'golpeCritico') return Math.floor(Math.random() * (105 - 65 + 1)) + 65; // 65-105
  } else if (nivelPoder === 'omega') {
    if (tipoGolpe === 'golpeBasico') return Math.floor(Math.random() * (8 - 1 + 1)) + 1; // 1-8
    if (tipoGolpe === 'golpeEspecial') return Math.floor(Math.random() * (25 - 5 + 1)) + 5; // 5-25
    if (tipoGolpe === 'golpeCritico') return Math.floor(Math.random() * (55 - 25 + 1)) + 25; // 25-55
  }
  return 0;
}

module.exports = PartidaService; 