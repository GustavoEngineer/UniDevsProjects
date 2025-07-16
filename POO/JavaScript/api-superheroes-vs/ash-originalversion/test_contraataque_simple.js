const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testContraataqueSimple() {
  console.log('🧪 Probando contraataque simple...\n');

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

    // 3. Probar contraataque específico
    console.log('\n3️⃣ Probando contraataque específico...');
    
    // Primer ataque: Lex Luthor → Batman
    console.log('\n📤 Primer ataque: Lex Luthor → Batman');
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
      console.log('❌ Error en primer ataque:', error);
    } else {
      const resultado1 = await round2Ataque1.json();
      console.log('✅ Primer ataque:');
      console.log('- Atacante:', resultado1.accion.atacante.nombre);
      console.log('- Defensor:', resultado1.accion.defensor.nombre);
    }

    // Segundo ataque: Batman → Lex Luthor (contraataque)
    console.log('\n📤 Segundo ataque: Batman → Lex Luthor (contraataque)');
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
      console.log('❌ Error en segundo ataque:', error);
    } else {
      const resultado2 = await round2Ataque2.json();
      console.log('✅ Segundo ataque:');
      console.log('- Atacante:', resultado2.accion.atacante.nombre);
      console.log('- Defensor:', resultado2.accion.defensor.nombre);
      console.log('- ¿Es contraataque correcto?', resultado2.accion.defensor.nombre === 'Lex Luthor' ? '✅ SÍ' : '❌ NO');
    }

    console.log('\n🎉 Prueba completada!');

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  }
}

testContraataqueSimple(); 