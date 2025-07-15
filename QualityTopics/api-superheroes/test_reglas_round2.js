const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testReglasRound2() {
  console.log('🧪 Probando nuevas reglas del Round 2...\n');

  try {
    // 1. Crear nueva partida
    console.log('1️⃣ Creando nueva partida...');
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

    // 2. Jugar round 1 completo
    console.log('\n2️⃣ Jugando round 1 completo...');
    let round1Terminado = false;
    let turno = 0;
    let atacanteId = partida.equipo1[0].id;
    let defensorId = partida.equipo2[0].id;
    
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
      
      const resultadoAtaque = await response.json();
      console.log(`Ataque #${turno + 1}:`, resultadoAtaque.accion.atacante.nombre, '->', resultadoAtaque.accion.defensor.nombre, '| Daño:', resultadoAtaque.accion.danio, '| Vida restante:', resultadoAtaque.accion.vidaRestante);
      
      if (resultadoAtaque.defensorPerdio) {
        round1Terminado = true;
        console.log('🏆 Round 1 completado! Ganador:', resultadoAtaque.ganador);
      }
      turno++;
    }

    // 3. Probar round 2 con múltiples ataques
    console.log('\n3️⃣ Probando round 2 con múltiples ataques...');
    
    // Primer ataque: Lex Luthor (Equipo 2)
    console.log('\n📤 Primer ataque: Lex Luthor');
    const round2Ataque1 = await fetch(`${BASE_URL}/partidas/equipos/round/2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        partidaId: partida.Partida_ID,
        idPersonajeAtacante: "5", // Lex Luthor
        tipoGolpe: "golpeBasico"
      })
    });

    if (!round2Ataque1.ok) {
      const error = await round2Ataque1.text();
      console.log('❌ Error en primer ataque round 2:', error);
    } else {
      const resultado1 = await round2Ataque1.json();
      console.log('✅ Primer ataque exitoso:');
      console.log('- Atacante:', resultado1.accion.atacante.nombre);
      console.log('- Defensor:', resultado1.accion.defensor.nombre);
      console.log('- Daño:', resultado1.accion.danio);
      console.log('- Vida restante:', resultado1.accion.vidaRestante);
      console.log('- Personajes disponibles:', resultado1.personajesDisponiblesRound2.map(p => p.nombre));
    }

    // Segundo ataque: Batman (Equipo 1)
    console.log('\n📤 Segundo ataque: Batman');
    const round2Ataque2 = await fetch(`${BASE_URL}/partidas/equipos/round/2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        partidaId: partida.Partida_ID,
        idPersonajeAtacante: "2", // Batman
        tipoGolpe: "golpeCritico"
      })
    });

    if (!round2Ataque2.ok) {
      const error = await round2Ataque2.text();
      console.log('❌ Error en segundo ataque round 2:', error);
    } else {
      const resultado2 = await round2Ataque2.json();
      console.log('✅ Segundo ataque exitoso:');
      console.log('- Atacante:', resultado2.accion.atacante.nombre);
      console.log('- Defensor:', resultado2.accion.defensor.nombre);
      console.log('- Daño:', resultado2.accion.danio);
      console.log('- Vida restante:', resultado2.accion.vidaRestante);
      console.log('- Personajes disponibles:', resultado2.personajesDisponiblesRound2.map(p => p.nombre));
      console.log('- Round finalizado:', resultado2.defensorPerdio);
    }

    console.log('\n🎉 Prueba completada!');

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  }
}

testReglasRound2(); 