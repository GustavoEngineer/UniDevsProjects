# Solución: Campos Adicionales en Mantenimiento

## Problema
Al editar un registro de mantenimiento, faltaban campos importantes:
- **Habitación**: Para identificar qué habitación necesita mantenimiento
- **Empleado**: Para identificar qué empleado está realizando el mantenimiento
- **Fecha de Solicitud**: Para registrar cuándo se solicitó el mantenimiento

## Análisis del Sistema
Al revisar la base de datos, se encontró que la tabla `mantenimiento` ya tenía estos campos:
- `id_habitacion` (NOT NULL)
- `id_empleado` (DEFAULT NULL)
- `fecha_solicitud` (NOT NULL DEFAULT CURRENT_TIMESTAMP)

Sin embargo, estos campos no estaban siendo utilizados correctamente en el frontend.

## Solución Implementada

### 1. Actualización del Backend

#### Repositorio (MantenimientoRepository.js)
Se actualizaron las consultas para incluir información del empleado:

```javascript
// Consulta actualizada para incluir datos del empleado
SELECT m.*, em.nombre_estado, hab.numero_habitacion,
       emp.nombre as nombre_empleado, emp.apellido_paterno as apellido_empleado
FROM mantenimiento m
LEFT JOIN estado_mantenimiento em ON m.id_estado_mantenimiento = em.id_estado_mantenimiento
LEFT JOIN habitacion hab ON m.id_habitacion = hab.id_habitacion
LEFT JOIN empleado emp ON m.id_empleado = emp.id_empleado
```

#### Modelo (Mantenimiento.js)
Se agregaron los nuevos campos al constructor:

```javascript
constructor({
  id_mantenimiento,
  id_habitacion,
  id_empleado,           // ← Nuevo
  id_estado_mantenimiento,
  descripcion,
  fecha_solicitud,       // ← Nuevo
  fecha_inicio,
  fecha_fin,
  fecha_creacion,
  fecha_modificacion,
  nombre_estado,
  numero_habitacion,
  nombre_empleado,       // ← Nuevo
  apellido_empleado      // ← Nuevo
}) {
  // ... asignación de propiedades
}
```

### 2. Actualización del Frontend

#### Carga de Datos Adicionales
Se modificó la función `loadEditFormData()` para cargar datos de habitaciones y empleados:

```javascript
if (entity === 'Mantenimiento') {
  try {
    console.log('🔄 Cargando datos para mantenimiento...');
    const [estadosRes, habitacionesRes, empleadosRes] = await Promise.all([
      fetch(`${API_BASE_URL}/api/estado_mantenimiento`),
      fetch(`${API_BASE_URL}/api/habitacion`),
      fetch(`${API_BASE_URL}/api/empleado`)
    ]);
    
    // Cargar estados de mantenimiento
    if (estadosRes.ok) {
      window.estadosMantenimiento = await estadosRes.json();
    }
    
    // Cargar habitaciones
    if (habitacionesRes.ok) {
      window.habitaciones = await habitacionesRes.json();
    }
    
    // Cargar empleados
    if (empleadosRes.ok) {
      window.empleados = await empleadosRes.json();
    }
  } catch (error) {
    console.error('Error cargando datos para selectores de mantenimiento:', error);
  }
}
```

#### Selectores en el Formulario
Se agregaron selectores dropdown para los nuevos campos:

**Selector de Habitación:**
```javascript
if (col === 'id_habitacion') {
  const habitaciones = window.habitaciones || [];
  formHtml += `
    <div class="form-field" style="margin-bottom: 15px;">
      <label for="${col}" style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">
        Habitación:
      </label>
      <select id="${col}" name="${col}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
        ${habitaciones.map(habitacion => 
          `<option value="${habitacion.id_habitacion}" ${habitacion.id_habitacion == value ? 'selected' : ''}>
            Habitación ${habitacion.numero_habitacion}
          </option>`
        ).join('')}
      </select>
    </div>
  `;
  return;
}
```

**Selector de Empleado:**
```javascript
if (col === 'id_empleado') {
  const empleados = window.empleados || [];
  formHtml += `
    <div class="form-field" style="margin-bottom: 15px;">
      <label for="${col}" style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">
        Empleado Responsable:
      </label>
      <select id="${col}" name="${col}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
        <option value="">Sin asignar</option>
        ${empleados.map(empleado => 
          `<option value="${empleado.id_empleado}" ${empleado.id_empleado == value ? 'selected' : ''}>
            ${empleado.nombre} ${empleado.apellido_paterno}
          </option>`
        ).join('')}
      </select>
    </div>
  `;
  return;
}
```

#### Visualización en la Tabla
Se actualizó la función `formatFieldValue()` para mostrar nombres descriptivos:

```javascript
if (fieldName === 'id_habitacion' && row.numero_habitacion) {
  return `Habitación ${row.numero_habitacion}`;
}
if (fieldName === 'id_empleado' && row.nombre_empleado) {
  return `${row.nombre_empleado} ${row.apellido_empleado || ''}`;
}
```

#### Etiquetas de Campos
Se actualizaron las etiquetas para mostrar nombres más descriptivos:

```javascript
// Mantenimiento
'id_mantenimiento': 'ID Mantenimiento',
'id_habitacion': 'Habitación',                    // ← Actualizado
'id_empleado': 'Empleado Responsable',            // ← Nuevo
'descripcion': 'Descripción',
'fecha_solicitud': 'Fecha de Solicitud',          // ← Nuevo
'fecha_inicio': 'Fecha Inicio',
'fecha_fin': 'Fecha Fin',
'id_estado_mantenimiento': 'Estado'
```

## Campos Disponibles en el Formulario

Ahora el formulario de edición de mantenimiento incluye:

1. **Habitación**: Selector con todas las habitaciones disponibles
2. **Empleado Responsable**: Selector con todos los empleados (incluye opción "Sin asignar")
3. **Estado de Mantenimiento**: Selector con los estados disponibles
4. **Descripción**: Campo de texto para la descripción del mantenimiento
5. **Fecha de Solicitud**: Campo de fecha (solo lectura, se genera automáticamente)
6. **Fecha Inicio**: Campo de fecha para cuando comenzó el mantenimiento
7. **Fecha Fin**: Campo de fecha para cuando terminó el mantenimiento

## Resultado

Ahora cuando el usuario edite un registro de mantenimiento:

1. **En la tabla**: Se muestran nombres descriptivos para habitación y empleado
2. **En el formulario**: Aparecen selectores dropdown para habitación y empleado
3. **Al guardar**: Se envían los IDs correspondientes a la base de datos
4. **Campos completos**: Se incluyen todos los campos relevantes del mantenimiento

## Archivos Modificados
- `web/api/src/infrastructure/repositories/MantenimientoRepository.js`: Consultas actualizadas
- `web/api/src/domain/models/Mantenimiento.js`: Modelo actualizado
- `web/public/pages/homePage.html`: Frontend actualizado 