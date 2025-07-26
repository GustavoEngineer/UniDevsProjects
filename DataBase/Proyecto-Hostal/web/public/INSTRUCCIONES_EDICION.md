# Instrucciones para Probar la Funcionalidad de Edición

## Funcionalidad Implementada

Se ha implementado la funcionalidad completa de edición para todos los registros del sistema de hostal. Ahora puedes:

1. **Editar cualquier registro** haciendo clic en el botón de editar (ícono de lápiz) que aparece al expandir una carta
2. **Modificar los campos** en un modal de edición intuitivo
3. **Guardar los cambios** que se actualizarán automáticamente en la base de datos
4. **Ver confirmación** de que los cambios se guardaron correctamente

## Cómo Probar

### 1. Iniciar los Servidores

```bash
# Terminal 1 - API Backend
cd web/api
npm start

# Terminal 2 - Servidor Frontend (opcional)
cd web/public
python -m http.server 8080
```

### 2. Acceder a la Aplicación

- Abre tu navegador y ve a `http://localhost:3000` (si usas el servidor de la API)
- O `http://localhost:8080/pages/homePage.html` (si usas el servidor Python)

### 3. Probar la Edición

1. **Selecciona una entidad** del menú desplegable (Huésped, Habitación, Empleado, etc.)
2. **Expande una carta** haciendo clic en la flecha hacia abajo
3. **Haz clic en el botón de editar** (ícono de lápiz)
4. **Modifica los campos** que desees cambiar
5. **Haz clic en "Guardar Cambios"**
6. **Verifica** que los cambios se reflejen en la interfaz

## Entidades Soportadas

- ✅ **Huésped**: nombre, apellidos, teléfono, email, fecha de nacimiento, nacionalidad
- ✅ **Habitación**: número, tipo, estado
- ✅ **Empleado**: nombre, apellidos, teléfono, email, fecha de contratación, rol, turno
- ✅ **Reservas**: huésped, habitación, fechas, tipo de reserva, precio
- ✅ **Estancia**: reserva, estado, huésped, horas, número de personas, vehículo
- ✅ **Mantenimiento**: habitación, estado, descripción, fechas

## Características Técnicas

### Frontend
- Modal de edición responsivo y moderno
- Validación de tipos de campos (fecha, hora, email, teléfono, etc.)
- Manejo de errores con mensajes claros
- Confirmación visual de cambios exitosos
- Recarga automática de datos después de la edición

### Backend
- Endpoints PUT implementados para todas las entidades
- Validación de datos en el servidor
- Manejo de errores robusto
- Actualización segura en la base de datos

### Base de Datos
- Todos los repositorios tienen método `update` implementado
- Mapeo correcto de campos entre frontend y backend
- Integridad referencial mantenida

## Notas Importantes

- Los campos de ID (claves primarias) no se pueden editar
- Los campos de fecha se muestran en formato YYYY-MM-DD para facilitar la edición
- Los campos de hora se muestran en formato HH:MM:SS
- Los campos de descripción larga usan textarea para mejor usabilidad
- Los errores se muestran claramente en el modal de edición

## Solución de Problemas

### Si no aparece el botón de editar:
- Asegúrate de expandir la carta primero
- Verifica que el servidor API esté corriendo

### Si los cambios no se guardan:
- Revisa la consola del navegador para errores
- Verifica que la API esté respondiendo correctamente
- Asegúrate de que los datos del formulario sean válidos

### Si hay errores de conexión:
- Verifica que el servidor API esté corriendo en el puerto 3000
- Revisa que no haya problemas de CORS
- Asegúrate de que la base de datos esté accesible 