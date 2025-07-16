const fetch = require('node-fetch');

async function testGolpesNumerados() {
  try {
    console.log('=== Probando Golpes Numerados ===');
    
    // Crear partida
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
    
    // Simular varios golpes para ver la numeración
    const golpes = [
      { atacante: "1", tipo: "golpeBasico" },
      { atacante: "4", tipo: "golpeEspecial" },
      { atacante: "1", tipo: "golpeCritico" },
      { atacante: "4", tipo: "golpeBasico" }
    ];
    
    for (let i = 0; i < golpes.length; i++) {
      const golpe = golpes[i];
      console.log(`\n${i + 1}. Ejecutando ${golpe.tipo} con ${golpe.atacante}...`);
      
      const roundData = {
        Partida_ID: partida.Partida_ID,
        idPersonajeAtacante: golpe.atacante,
        tipoGolpe: golpe.tipo
      };
      
      const roundRes = await fetch('http://localhost:3000/partidas/equipos/round/1', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(roundData)
      });
      
      if (!roundRes.ok) {
        const errorText = await roundRes.text();
        console.error('Error:', errorText);
        break;
      }
      
      const roundResult = await roundRes.json();
      const ultimaAccion = roundResult.rounds[0].acciones[roundResult.rounds[0].acciones.length - 1];
      
      console.log(`   Golpe ${ultimaAccion.numeroGolpe}: ${ultimaAccion.atacante.nombre} → ${ultimaAccion.defensor.nombre}`);
      console.log(`   Tipo: ${ultimaAccion.tipoGolpe}, Daño: ${ultimaAccion.danio}, Vida restante: ${ultimaAccion.vidaRestante}`);
      
      // Verificar si el round terminó
      if (roundResult.rounds[0].finalizado) {
        console.log(`\n🎉 ROUND TERMINADO! Ganador: ${roundResult.rounds[0].ganador}`);
        break;
      }
      
      // Pausa entre golpes
      await new Promise(resolve => setTimeout(resolve, 500));
    }
    
    // Mostrar resumen final
    console.log('\n=== RESUMEN FINAL ===');
    const finalRes = await fetch(`http://localhost:3000/partidas/equipos/${partida.Partida_ID}`);
    const partidaFinal = await finalRes.json();
    
    console.log('Secuencia de golpes:');
    partidaFinal.rounds[0].acciones.forEach(accion => {
      console.log(`   Golpe ${accion.numeroGolpe}: ${accion.atacante.nombre} (${accion.tipoGolpe}) → ${accion.defensor.nombre} [Daño: ${accion.danio}]`);
    });
    
  } catch (error) {
    console.error('Error:', error.message);
  }
}

testGolpesNumerados(); 