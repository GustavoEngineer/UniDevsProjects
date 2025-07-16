const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testNuevaPartidaRound2() {
  console.log('🧪 Probando Round 2 con nueva partida...\n');

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
    let resultadoAtaque = null;
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
      
      resultadoAtaque = await response.json();
      console.log(`Ataque #${turno + 1}:`, resultadoAtaque.accion.atacante.nombre, '->', resultadoAtaque.accion.defensor.nombre, '| Daño:', resultadoAtaque.accion.danio, '| Vida restante:', resultadoAtaque.accion.vidaRestante);
      
      if (resultadoAtaque.defensorPerdio) {
        round1Terminado = true;
        console.log('🏆 Round 1 completado! Ganador:', resultadoAtaque.ganador);
      }
      turno++;
    }

    // 3. Probar round 2 con personaje 5 (Lex Luthor)
    console.log('\n3️⃣ Probando round 2 con Lex Luthor (personaje 5)...');
    
    const round2Response = await fetch(`${BASE_URL}/partidas/equipos/round/2`, {
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

    if (!round2Response.ok) {
      const error = await round2Response.text();
      console.log('❌ Error en round 2:', error);
    } else {
      const resultadoRound2 = await round2Response.json();
      console.log('✅ Round 2 exitoso:');
      console.log('- Atacante:', resultadoRound2.accion.atacante.nombre, '(Equipo', resultadoRound2.accion.atacante.id === "5" ? "2" : "1", ')');
      console.log('- Defensor:', resultadoRound2.accion.defensor.nombre, '(Equipo', resultadoRound2.accion.defensor.id === "5" ? "2" : "1", ')');
      console.log('- Daño:', resultadoRound2.accion.danio);
      console.log('- Vida restante:', resultadoRound2.accion.vidaRestante);
      
      // Verificar que no sean del mismo equipo
      const equipoAtacante = resultadoRound2.accion.atacante.id === "5" ? 2 : 1;
      const equipoDefensor = resultadoRound2.accion.defensor.id === "5" ? 2 : 1;
      
      if (equipoAtacante === equipoDefensor) {
        console.log('❌ ERROR: Ambos personajes son del mismo equipo!');
      } else {
        console.log('✅ CORRECTO: Los personajes son de equipos diferentes');
      }
    }

    console.log('\n🎉 Prueba completada!');

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  }
}

testNuevaPartidaRound2(); 