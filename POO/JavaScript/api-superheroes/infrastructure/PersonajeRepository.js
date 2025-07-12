const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, 'personajes.json');

function loadPersonajes() {
  if (fs.existsSync(DATA_FILE)) {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  }
  // Si no existe, usar los 20 iniciales
  return [
    { id: '1', nombre: 'Superman', categoria: 'Heroe', ciudad: 'Metrópolis', golpeBasico: 'Puñetazo', golpeEspecial: 'Visión láser', golpeCritico: 'Vuelo supersónico', nivelVida: 100 },
    { id: '2', nombre: 'Batman', categoria: 'Heroe', ciudad: 'Gotham', golpeBasico: 'Patada', golpeEspecial: 'Batarang', golpeCritico: 'Ataque sigiloso', nivelVida: 100 },
    { id: '3', nombre: 'Joker', categoria: 'Villano', ciudad: 'Gotham', golpeBasico: 'Bastón', golpeEspecial: 'Gas de la risa', golpeCritico: 'Explosivos', nivelVida: 100 },
    { id: '4', nombre: 'Wonder Woman', categoria: 'Heroe', ciudad: 'Themyscira', golpeBasico: 'Látigo', golpeEspecial: 'Brazaletes', golpeCritico: 'Golpe divino', nivelVida: 100 },
    { id: '5', nombre: 'Lex Luthor', categoria: 'Villano', ciudad: 'Metrópolis', golpeBasico: 'Tecnología', golpeEspecial: 'Armadura', golpeCritico: 'Kriptonita', nivelVida: 100 },
    { id: '6', nombre: 'Harley Quinn', categoria: 'Villano', ciudad: 'Gotham', golpeBasico: 'Martillo', golpeEspecial: 'Explosivos', golpeCritico: 'Ataque sorpresa', nivelVida: 100 },
    { id: '7', nombre: 'Flash', categoria: 'Heroe', ciudad: 'Central City', golpeBasico: 'Golpe rápido', golpeEspecial: 'Vibración', golpeCritico: 'Viaje en el tiempo', nivelVida: 100 },
    { id: '8', nombre: 'Reverse Flash', categoria: 'Villano', ciudad: 'Central City', golpeBasico: 'Golpe rápido', golpeEspecial: 'Desfase temporal', golpeCritico: 'Asesinato', nivelVida: 100 },
    { id: '9', nombre: 'Aquaman', categoria: 'Heroe', ciudad: 'Atlantis', golpeBasico: 'Tridente', golpeEspecial: 'Control del agua', golpeCritico: 'Llamado de criaturas', nivelVida: 100 },
    { id: '10', nombre: 'Black Manta', categoria: 'Villano', ciudad: 'Atlantis', golpeBasico: 'Rayos ópticos', golpeEspecial: 'Armadura', golpeCritico: 'Explosivos', nivelVida: 100 },
    { id: '11', nombre: 'Catwoman', categoria: 'Antivillano', ciudad: 'Gotham', golpeBasico: 'Látigo', golpeEspecial: 'Agilidad', golpeCritico: 'Robo maestro', nivelVida: 100 },
    { id: '12', nombre: 'Deadpool', categoria: 'Antiheroe', ciudad: 'Nueva York', golpeBasico: 'Espada', golpeEspecial: 'Regeneración', golpeCritico: 'Ataque loco', nivelVida: 100 },
    { id: '13', nombre: 'Magneto', categoria: 'Villano', ciudad: 'Genosha', golpeBasico: 'Metal', golpeEspecial: 'Campo magnético', golpeCritico: 'Onda magnética', nivelVida: 100 },
    { id: '14', nombre: 'Iron Man', categoria: 'Heroe', ciudad: 'Nueva York', golpeBasico: 'Repulsor', golpeEspecial: 'Misiles', golpeCritico: 'Unibeam', nivelVida: 100 },
    { id: '15', nombre: 'Thanos', categoria: 'Villano', ciudad: 'Titán', golpeBasico: 'Puñetazo', golpeEspecial: 'Guantelete', golpeCritico: 'Chasquido', nivelVida: 100 },
    { id: '16', nombre: 'Loki', categoria: 'Antivillano', ciudad: 'Asgard', golpeBasico: 'Magia', golpeEspecial: 'Ilusión', golpeCritico: 'Engaño', nivelVida: 100 },
    { id: '17', nombre: 'Venom', categoria: 'Antivillano', ciudad: 'Nueva York', golpeBasico: 'Simbiote', golpeEspecial: 'Transformación', golpeCritico: 'Furia', nivelVida: 100 },
    { id: '18', nombre: 'Spider-Man', categoria: 'Heroe', ciudad: 'Nueva York', golpeBasico: 'Telaraña', golpeEspecial: 'Sentido arácnido', golpeCritico: 'Golpe acrobático', nivelVida: 100 },
    { id: '19', nombre: 'Doctor Octopus', categoria: 'Villano', ciudad: 'Nueva York', golpeBasico: 'Brazos mecánicos', golpeEspecial: 'Ataque múltiple', golpeCritico: 'Aplastamiento', nivelVida: 100 },
    { id: '20', nombre: 'Punisher', categoria: 'Antiheroe', ciudad: 'Nueva York', golpeBasico: 'Armas de fuego', golpeEspecial: 'Estrategia', golpeCritico: 'Venganza', nivelVida: 100 },
  ];
}

function savePersonajes(personajes) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(personajes, null, 2), 'utf-8');
}

let personajes = loadPersonajes();
let currentId = personajes.length > 0 ? Math.max(...personajes.map(p => parseInt(p.id))) : 0;

class PersonajeRepository {
  getAll() {
    return personajes;
  }

  getById(id) {
    return personajes.find(p => p.id === id);
  }

  create(personaje) {
    currentId++;
    const newPersonaje = { ...personaje, id: String(currentId) };
    personajes.push(newPersonaje);
    savePersonajes(personajes);
    return newPersonaje;
  }

  update(id, data) {
    const index = personajes.findIndex(p => p.id === id);
    if (index === -1) return null;
    personajes[index] = { ...personajes[index], ...data, id };
    savePersonajes(personajes);
    return personajes[index];
  }

  delete(id) {
    const index = personajes.findIndex(p => p.id === id);
    if (index === -1) return false;
    personajes.splice(index, 1);
    savePersonajes(personajes);
    return true;
  }
}

module.exports = new PersonajeRepository(); 