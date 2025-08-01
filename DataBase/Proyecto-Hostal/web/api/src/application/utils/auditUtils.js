/**
 * Utilidades para manejar campos de auditoría en las operaciones de actualización
 */

/**
 * Filtra los campos de auditoría (fecha_creacion, fecha_modificacion) de los datos
 * y valida que no se intenten modificar manualmente
 * @param {Object} data - Datos que se van a actualizar
 * @returns {Object} Datos filtrados sin campos de auditoría
 * @throws {Error} Si se intenta modificar campos de auditoría
 */
function filterAuditFields(data) {
  const { fecha_creacion, fecha_modificacion, ...updateData } = data;
  
  // Función auxiliar para verificar si un valor es "vacío" o no válido
  const isEmptyValue = (value) => {
    return value === undefined || 
           value === null || 
           value === '' || 
           value === 'null' || 
           value === 'undefined' ||
           (typeof value === 'string' && value.trim() === '');
  };
  
  // Validar que no se intenten modificar las fechas de auditoría
  // Solo lanzar error si realmente se están enviando valores válidos y no vacíos
  if (!isEmptyValue(fecha_creacion) || !isEmptyValue(fecha_modificacion)) {
    throw new Error('No se permite modificar las fechas de creación o modificación');
  }
  
  return updateData;
}

module.exports = {
  filterAuditFields
}; 