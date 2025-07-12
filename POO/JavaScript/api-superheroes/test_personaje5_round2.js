const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

async function testPersonaje5Round2() {
  console.log('🧪 Probando Round 2 con Personaje 5 (Lex Luthor)...\n');

  try {
    // Probar directamente con la partida existente (ID = 1)
    const partidaId = "1";
    const idPersonajeAtacante = "5"; // Lex Luthor
    const tipoGolpe = "golpeBasico";

    console.log(`📋 Datos de la prueba:`);
    console.log(`- Partida ID: ${partidaId}`);
    console.log(`- Personaje atacante: ${idPersonajeAtacante} (Lex Luthor)`);
    console.log(`- Tipo de golpe: ${tipoGolpe}`);

    const requestBody = {
      partidaId: partidaId,
      idPersonajeAtacante: idPersonajeAtacante,
      tipoGolpe: tipoGolpe
    };

    console.log('\n📤 Enviando request con body:', JSON.stringify(requestBody, null, 2));

    const response = await fetch(`${BASE_URL}/partidas/equipos/round/2`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    });

    console.log(`\n📥 Response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('❌ Error response:', errorText);
      
      try {
        const errorJson = JSON.parse(errorText);
        console.log('❌ Error JSON:', errorJson);
      } catch (e) {
        console.log('❌ Error no es JSON válido');
      }
    } else {
      const result = await response.json();
      console.log('✅ Success response:');
      console.log(JSON.stringify(result, null, 2));
    }

  } catch (error) {
    console.error('❌ Error en la prueba:', error.message);
  }
}

// Ejecutar la prueba
testPersonaje5Round2(); 