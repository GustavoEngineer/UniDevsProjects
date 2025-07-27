# Solución: Selector de Empleados de Limpieza en Mantenimiento

## Problema
El formulario de edición de mantenimiento necesitaba un selector específico para empleados del área de limpieza, ya que son los responsables de realizar las tareas de mantenimiento.

## Análisis del Sistema

### Roles de Empleado Disponibles
Según la base de datos, existen tres roles de empleado:
1. **Recepcionista** (ID: 1)
2. **Limpieza** (ID: 2) ← **Relevante para mantenimiento**
3. **Administrador** (ID: 3)

### Empleados de Limpieza en los Datos
Según los datos de ejemplo, los empleados con rol de limpieza son:
- **Lucía Morales Castro** (ID: 2, id_rol_empleado: 2)
- **Diego Vargas Silva** (ID: 5, id_rol_empleado: 2)

## Solución Implementada

### 1. Filtrado de Empleados por Rol
Se modificó la lógica del selector de empleados para filtrar solo aquellos del área de limpieza:

```javascript
if (col === 'id_empleado') {
  console.log(`🎯 Generando selector de empleado para mantenimiento. Valor actual: ${value}`);
  const empleados = window.empleados || [];
  // Filtrar solo empleados del área de limpieza (id_rol_empleado = 2)
  const empleadosLimpieza = empleados.filter(empleado => empleado.id_rol_empleado === 2);
  formHtml += `
    <div class="form-field" style="margin-bottom: 15px;">
      <label for="${col}" style="display: block; margin-bottom: 5px; font-weight: 600; color: #333;">
        Empleado de Limpieza:
      </label>
      <select id="${col}" name="${col}" style="width: 100%; padding: 8px; border: 1px solid #ddd; border-radius: 4px;">
        <option value="">Sin asignar</option>
        ${empleadosLimpieza.map(empleado => 
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

### 2. Actualización de Etiquetas
Se actualizó la etiqueta del campo para ser más específica:

```javascript
// ANTES:
'id_empleado': 'Empleado Responsable',

// DESPUÉS:
'id_empleado': 'Empleado de Limpieza',
```

## Funcionalidad del Selector

### Opciones Disponibles
1. **"Sin asignar"**: Para casos donde no hay empleado asignado (valor vacío)
2. **Empleados de limpieza**: Solo muestra empleados con `id_rol_empleado = 2`

### Comportamiento
- **Filtrado automático**: Solo se muestran empleados del área de limpieza
- **Selección actual**: Si el registro ya tiene un empleado asignado, se preselecciona
- **Envío de ID**: Al guardar, se envía el `id_empleado` correspondiente a la base de datos

## Resultado

Ahora el formulario de edición de mantenimiento incluye:

1. **🏠 Habitación**: Selector con todas las habitaciones
2. **🧹 Empleado de Limpieza**: Selector solo con empleados del área de limpieza
3. **📊 Estado de Mantenimiento**: Selector con los estados disponibles
4. **📝 Descripción**: Campo de texto
5. **📅 Fecha de Solicitud**: Campo de fecha
6. **📅 Fecha Inicio**: Campo de fecha
7. **📅 Fecha Fin**: Campo de fecha

## Ventajas de la Implementación

1. **Especificidad**: Solo muestra empleados relevantes para mantenimiento
2. **Claridad**: La etiqueta "Empleado de Limpieza" es más descriptiva
3. **Flexibilidad**: Permite no asignar empleado si es necesario
4. **Consistencia**: Mantiene el patrón de envío de IDs a la base de datos

## Archivos Modificados
- `web/public/pages/homePage.html`: Lógica de filtrado y etiquetas actualizadas

## Verificación
Para verificar que funciona correctamente:
1. Abrir el formulario de edición de mantenimiento
2. Verificar que el selector "Empleado de Limpieza" aparezca
3. Verificar que solo muestre empleados del área de limpieza
4. Verificar que se pueda seleccionar "Sin asignar" o un empleado específico 