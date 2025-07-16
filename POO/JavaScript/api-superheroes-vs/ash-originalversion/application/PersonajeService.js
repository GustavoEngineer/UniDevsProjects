const Personaje = require('../domain/Personaje');
const repo = require('../infrastructure/PersonajeRepository');
const { v4: uuidv4 } = require('uuid');

class PersonajeService {
  getAll() {
    return repo.getAll();
  }

  getById(id) {
    return repo.getById(id);
  }

  create(data) {
    // Solo tomar los campos permitidos
    const { nombre, categoria, ciudad, golpeBasico, golpeEspecial, golpeCritico, nivelVida } = data;
    const personaje = new Personaje({
      nombre,
      categoria,
      ciudad,
      golpeBasico,
      golpeEspecial,
      golpeCritico,
      nivelVida
    });
    return repo.create(personaje);
  }

  update(id, data) {
    return repo.update(id, data);
  }

  delete(id) {
    return repo.delete(id);
  }
}

module.exports = new PersonajeService(); 