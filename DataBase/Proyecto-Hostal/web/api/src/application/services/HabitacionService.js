const HabitacionRepository = require('../../infrastructure/repositories/HabitacionRepository');
const TipoHabitacionRepository = require('../../infrastructure/repositories/TipoHabitacionRepository');

class HabitacionService {
  async getAll() {
    return await HabitacionRepository.findAll();
  }

  async getById(id) {
    return await HabitacionRepository.findById(id);
  }

  async create(data) {
    return await HabitacionRepository.create(data);
  }

  async update(id, data) {
    // Si se está actualizando el precio, también actualizar el tipo de habitación
    if (data.precio_base_por_noche !== undefined) {
      // Obtener la habitación actual para saber el tipo
      const habitacion = await HabitacionRepository.findById(id);
      
      if (habitacion && habitacion.id_tipo_habitacion) {
        // Obtener los datos completos del tipo de habitación
        const tipoHabitacion = await TipoHabitacionRepository.findById(habitacion.id_tipo_habitacion);
        
        if (tipoHabitacion) {
          // Actualizar el precio en el tipo de habitación manteniendo los otros datos
          await TipoHabitacionRepository.update(habitacion.id_tipo_habitacion, {
            nombre_tipo: tipoHabitacion.nombre_tipo,
            capacidad_maxima: tipoHabitacion.capacidad_maxima,
            precio_base_por_noche: data.precio_base_por_noche
          });
        }
      }
    }
    
    // Remover precio_base_por_noche de los datos antes de actualizar la habitación
    const { precio_base_por_noche, ...habitacionData } = data;
    
    return await HabitacionRepository.update(id, habitacionData);
  }

  async delete(id) {
    return await HabitacionRepository.delete(id);
  }
}

module.exports = new HabitacionService(); 