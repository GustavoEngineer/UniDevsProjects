const fetch = require('node-fetch');

async function testTurnosAlternos() {
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
    
    const partida = await partidaRes.json();
    console.log('Partida creada con ID:', partida.Partida_ID);

    // Simular turnos alternos hasta que uno pierda
    let turno = 0;
    const personajes = ["1", "4"]; // Superman vs Wonder Woman
    
    while (true) {
      const personajeAtacante = personajes[turno % 2];
      const tiposGolpe = ["golpeBasico", "golpeEspecial", "golpeCritico"];
      const tipoGolpe = tiposGolpe[Math.floor(Math.random() * tiposGolpe.length)];
      
      console.log(`\n--- Turno ${turno + 1} ---`);
      console.log(`Personaje ${personajeAtacante} ataca con ${tipoGolpe}`);
      
      const roundData = {
        Partida_ID: partida.Partida_ID,
        idPersonajeAtacante: personajeAtacante,
        tipoGolpe: tipoGolpe
      };
      
      const roundRes = await fetch('http://localhost:3000/partidas/equipos/round/1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roundData)
      });
      
      if (!roundRes.ok) {
        const error = await roundRes.text();
        console.error('Error:', error);
        break;
      }
      
      const roundResult = await roundRes.json();
      const ultimaAccion = roundResult.rounds[0].acciones[roundResult.rounds[0].acciones.length - 1];
      
      console.log(`Atacante: ${ultimaAccion.atacante.nombre}`);
      console.log(`Defensor: ${ultimaAccion.defensor.nombre}`);
      console.log(`Daño: ${ultimaAccion.danio}`);
      console.log(`Vida restante del defensor: ${ultimaAccion.vidaRestante}`);
      
      // Verificar si el round terminó
      if (roundResult.rounds[0].finalizado) {
        console.log(`\n🎉 ROUND TERMINADO! Ganador: ${roundResult.rounds[0].ganador}`);
        break;
      }
      
      turno++;
      
      // Pausa para ver los resultados
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Mostrar resultado final
    console.log('\n=== RESULTADO FINAL ===');
    const historialRes = await fetch('http://localhost:3000/partidas/historial/equipos');
    const historial = await historialRes.json();
    console.log(JSON.stringify(historial, null, 2));

  } catch (error) {
    console.error('Error:', error.message);
  }
}

testTurnosAlternos(); 