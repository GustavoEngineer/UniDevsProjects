# Utilidades de Auditoría

## Descripción

Este directorio contiene utilidades para manejar campos de auditoría en las operaciones de la aplicación.

## auditUtils.js

### Función: `filterAuditFields(data)`

Esta función se encarga de filtrar y validar los campos de auditoría en las operaciones de actualización.

#### Propósito

- **Filtrar campos de auditoría**: Remueve `fecha_creacion` y `fecha_modificacion` de los datos de entrada
- **Validar integridad**: Lanza un error si se intenta modificar manualmente estos campos
- **Mantener consistencia**: Asegura que las fechas de auditoría solo se manejen automáticamente por la base de datos

#### Uso

```javascript
const { filterAuditFields } = require('../utils/auditUtils');

async update(id, data) {
  // Filtrar campos que no deben modificarse (fechas de auditoría)
  const updateData = filterAuditFields(data);
  return await Repository.update(id, updateData);
}
```

#### Comportamiento

- **Campos filtrados**: `fecha_creacion`, `fecha_modificacion`
- **Validación**: Si estos campos están presentes en los datos, se lanza un error
- **Retorno**: Objeto con los datos filtrados, sin los campos de auditoría

#### Campos de Auditoría en la Base de Datos

Los siguientes campos se manejan automáticamente:

- `fecha_creacion`: Se establece automáticamente al crear un registro
- `fecha_modificacion`: Se actualiza automáticamente con `ON UPDATE CURRENT_TIMESTAMP`

#### Entidades que usan Auditoría

- Empleado
- Huesped
- Reserva
- Mantenimiento
- Pago

## Implementación en Repositorios

Los repositorios NO incluyen estos campos en las consultas UPDATE para evitar modificaciones manuales:

```sql
-- ❌ NO incluir estos campos en UPDATE
UPDATE tabla SET fecha_creacion=?, fecha_modificacion=? WHERE id=?

-- ✅ Solo incluir campos editables
UPDATE tabla SET campo1=?, campo2=? WHERE id=?
```

## Seguridad

Esta implementación garantiza que:

1. **No se pueden modificar fechas de creación** manualmente
2. **No se pueden modificar fechas de modificación** manualmente
3. **La auditoría se mantiene intacta** y confiable
4. **Se lanzan errores descriptivos** si se intenta modificar estos campos 