const fetch = require('node-fetch');
const fs = require('fs');

async function testRound1() {
  try {
    // Primero crear una partida
    console.log('Creando partida...');
    const partidaData = JSON.parse(fs.readFileSync('test_partida.json', 'utf-8'));
    const partidaRes = await fetch('http://localhost:3000/partidas/equipos/iniciar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partidaData)
    });
    const partida = await partidaRes.json();
    console.log('Partida creada:', partida);

    // Ahora jugar round 1
    console.log('\nJugando round 1...');
    const roundData = JSON.parse(fs.readFileSync('test_round1_new.json', 'utf-8'));
    roundData.partidaId = partida.partidaId;
    
    const roundRes = await fetch('http://localhost:3000/partidas/equipos/round/1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roundData)
    });
    const roundResult = await roundRes.json();
    console.log('Resultado del round:', roundResult);

    // Ver el historial actualizado
    console.log('\nVerificando historial...');
    const historialRes = await fetch('http://localhost:3000/partidas/historial/equipos');
    const historial = await historialRes.json();
    console.log('Historial actualizado:', JSON.stringify(historial, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testRound1(); 