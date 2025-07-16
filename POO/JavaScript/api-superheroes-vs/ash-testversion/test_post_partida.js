const fetch = require('node-fetch');
const fs = require('fs');

(async () => {
  const data = JSON.parse(fs.readFileSync('test_partida.json', 'utf-8'));
  const res = await fetch('http://localhost:3000/partidas/equipos/iniciar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  const json = await res.json();
  console.log('Respuesta:', json);
})(); 