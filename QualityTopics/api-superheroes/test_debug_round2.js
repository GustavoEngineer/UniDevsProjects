const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function debugRound2() {
  console.log('🔍 Depurando Round 2...\n');

  try {
    // Primero, obtener la partida para ver su estado
    const partidaResponse = await fetch(`${BASE_URL}/partidas/equipos/1`);
    if (!partidaResponse.ok) {
      throw new Error('No se pudo obtener la partida');
    }
    
    const partida = await partidaResponse.json();
    console.log('📋 Estado de la partida:');
    console.log('- ID:', partida.Partida_ID);
    console.log('- Finalizada:', partida.finalizada);
    console.log('- Rounds:', partida.rounds.length);
    
    if (partida.rounds.length > 0) {
      const round1 = partida.rounds[0];
      console.log('- Round 1 finalizado:', round1.finalizado);
      console.log('- Ganador Round 1:', round1.ganador);
      console.log('- Personajes Round 1:', round1.personajes.map(p => `${p.nombre} (${p.id})`));
    }
    
    if (partida.rounds.length > 1) {
      const round2 = partida.rounds[1];
      console.log('- Round 2 personajes:', round2.personajes.map(p => `${p.nombre} (${p.id})`));
    }

    console.log('\n🏃‍♂️ Equipos:');
    console.log('- Equipo 1:', partida.equipo1.map(p => `${p.nombre} (${p.id})`));
    console.log('- Equipo 2:', partida.equipo2.map(p => `${p.nombre} (${p.id})`));

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

debugRound2(); 