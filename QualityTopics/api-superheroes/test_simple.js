const fetch = require('node-fetch');

async function testSimple() {
  try {
    // Crear partida
    const partidaData = {
      equipo1: ["1", "2", "3"],
      equipo2: ["4", "5", "6"]
    };
    
    console.log('Creando partida...');
    const partidaRes = await fetch('http://localhost:3000/partidas/equipos/iniciar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partidaData)
    });
    
    if (!partidaRes.ok) {
      throw new Error(`HTTP error! status: ${partidaRes.status}`);
    }
    
    const partida = await partidaRes.json();
    console.log('Partida creada:', partida);

    // Jugar round 1
    const roundData = {
      Partida_ID: partida.Partida_ID,
      idPersonajeAtacante: "1",
      tipoGolpe: "golpeBasico"
    };
    
    console.log('\nJugando round 1...');
    const roundRes = await fetch('http://localhost:3000/partidas/equipos/round/1', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(roundData)
    });
    
    if (!roundRes.ok) {
      const errorText = await roundRes.text();
      console.error('Error response:', errorText);
      throw new Error(`HTTP error! status: ${roundRes.status}`);
    }
    
    const roundResult = await roundRes.json();
    console.log('Resultado del round:', JSON.stringify(roundResult, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testSimple(); 