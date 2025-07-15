const fetch = require('node-fetch');

async function testGetById() {
  try {
    console.log('=== Probando GET por ID ===');
    
    // Primero crear una partida
    const partidaData = {
      equipo1: ["1", "2", "3"],
      equipo2: ["4", "5", "6"]
    };
    
    console.log('1. Creando partida...');
    const partidaRes = await fetch('http://localhost:3000/partidas/equipos/iniciar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partidaData)
    });
    
    const partida = await partidaRes.json();
    console.log('Partida creada con ID:', partida.Partida_ID);
    
    // Ahora obtener la partida por ID
    console.log('\n2. Obteniendo partida por ID...');
    const getByIdRes = await fetch(`http://localhost:3000/partidas/equipos/${partida.Partida_ID}`);
    
    if (!getByIdRes.ok) {
      const errorText = await getByIdRes.text();
      console.error('Error:', errorText);
      return;
    }
    
    const partidaObtenida = await getByIdRes.json();
    console.log('Partida obtenida:');
    console.log(JSON.stringify(partidaObtenida, null, 2));
    
    // Probar con un ID que no existe
    console.log('\n3. Probando con ID inexistente...');
    const notFoundRes = await fetch('http://localhost:3000/partidas/equipos/999');
    
    if (notFoundRes.status === 404) {
      const errorData = await notFoundRes.json();
      console.log('Error esperado:', errorData.error);
    } else {
      console.log('Respuesta inesperada:', notFoundRes.status);
    }
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testGetById(); 