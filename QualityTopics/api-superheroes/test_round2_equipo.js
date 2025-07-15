const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testRound2Equipo() {
  console.log('🧪 Probando Round 2 de Equipos...\n');

  try {
    // 1. Primero necesitamos crear una partida
    console.log('1️⃣ Creando partida de equipos...');
    const partidaResponse = await fetch(`${BASE_URL}/partidas/equipos/iniciar`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        equipo1: ['1', '2', '3'],
        equipo2: ['4', '5', '6']
      })
    });

    if (!partidaResponse.ok) {
      const error = await partidaResponse.text();
      throw new Error(`Error creando partida: ${error}`);
    }

    const partida = await partidaResponse.json();
    console.log('✅ Partida creada:', partida.Partida_ID);
    console.log('Equipo 1:', partida.equipo1.map(p => p.nombre).join(', '));
    console.log('Equipo 2:', partida.equipo2.map(p => p.nombre).join(', '));

    // 2. Jugar round 1 completo alternando ataques
    console.log('\n2️⃣ Jugando round 1 completo...');
    let round1Terminado = false;
    let turno = 0;
    let resultadoAtaque = null;
    let atacanteId = partida.equipo1[0].id;
    let defensorId = partida.equipo2[0].id;
    let ganadorRound1 = null;
    while (!round1Terminado) {
      const tipoGolpe = turno % 2 === 0 ? 'golpeBasico' : 'golpeEspecial';
      const idPersonajeAtacante = turno % 2 === 0 ? atacanteId : defensorId;
      const response = await fetch(`${BASE_URL}/partidas/equipos/round/1`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Partida_ID: partida.Partida_ID,
          idPersonajeAtacante,
          tipoGolpe
        })
      });
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Error en ataque round 1: ${error}`);
      }
      resultadoAtaque = await response.json();
      console.log(`Ataque #${turno + 1}:`, resultadoAtaque.accion.atacante.nombre, '->', resultadoAtaque.accion.defensor.nombre, '| Daño:', resultadoAtaque.accion.danio, '| Vida restante defensor:', resultadoAtaque.accion.vidaRestante);
      if (resultadoAtaque.defensorPerdio) {
        round1Terminado = true;
        ganadorRound1 = resultadoAtaque.ganador;
        console.log('🏆 Round 1 completado! Ganador:', ganadorRound1);
      }
      turno++;
    }

    // 3. Jugar round 2 con un personaje válido
    console.log('\n3️⃣ Jugando round 2...');
    // Determinar personaje válido para round 2 (el que sobrevivió o el siguiente del equipo ganador, y el siguiente del perdedor)
    // Para la prueba, intentamos con el sobreviviente del equipo ganador
    const idPersonajeAtacanteRound2 = resultadoAtaque.accion.atacante.id;
    const round2Response = await fetch(`${BASE_URL}/partidas/equipos/round/2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        partidaId: partida.Partida_ID,
        idPersonajeAtacante: idPersonajeAtacanteRound2,
        tipoGolpe: 'golpeBasico'
      })
    });
    if (!round2Response.ok) {
      const error = await round2Response.text();
      throw new Error(`Error en round 2: ${error}`);
    }
    const resultadoRound2 = await round2Response.json();
    console.log('✅ Round 2 iniciado correctamente');
    console.log('Acción:', resultadoRound2.accion.atacante.nombre, '->', resultadoRound2.accion.defensor.nombre);
    console.log('Daño:', resultadoRound2.accion.danio);
    console.log('Vida restante:', resultadoRound2.accion.vidaRestante);

    console.log('\n🎉 Prueba completada!');

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  }
}

// Ejecutar la prueba
testRound2Equipo(); 