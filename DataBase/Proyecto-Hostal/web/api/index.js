require('dotenv').config();
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('DB_NAME:', process.env.DB_NAME);

const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const huespedRoutes = require('./src/presentation/routes/huespedRoutes');
const empleadoRoutes = require('./src/presentation/routes/empleadoRoutes');
const estadoEstanciaRoutes = require('./src/presentation/routes/estadoEstanciaRoutes');
const estadoHabitacionRoutes = require('./src/presentation/routes/estadoHabitacionRoutes');
const estadoMantenimientoRoutes = require('./src/presentation/routes/estadoMantenimientoRoutes');
const mantenimientoRoutes = require('./src/presentation/routes/mantenimientoRoutes');
const huespedEstanciaRoutes = require('./src/presentation/routes/huespedEstanciaRoutes');
const habitacionRoutes = require('./src/presentation/routes/habitacionRoutes');
const estanciaEmpleadoRoutes = require('./src/presentation/routes/estanciaEmpleadoRoutes');
const estanciaRoutes = require('./src/presentation/routes/estanciaRoutes');
const metodoPagoRoutes = require('./src/presentation/routes/metodoPagoRoutes');
const reservaRoutes = require('./src/presentation/routes/reservaRoutes');
const pagoRoutes = require('./src/presentation/routes/pagoRoutes');
const rolEmpleadoRoutes = require('./src/presentation/routes/rolEmpleadoRoutes');
const tipoHabitacionRoutes = require('./src/presentation/routes/tipoHabitacionRoutes');
const tipoReservaRoutes = require('./src/presentation/routes/tipoReservaRoutes');
const turnoEmpleadoRoutes = require('./src/presentation/routes/turnoEmpleadoRoutes');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Conexión a la base de datos
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);
  }
  console.log('Conexión a la base de datos exitosa');
});

app.get('/', (req, res) => {
  res.send('API de Hostal funcionando');
});

// Montar rutas Onion
app.use('/api/huesped', huespedRoutes);
app.use('/api/empleado', empleadoRoutes);
app.use('/api/estado_estancia', estadoEstanciaRoutes);
app.use('/api/estado_habitacion', estadoHabitacionRoutes);
app.use('/api/estado_mantenimiento', estadoMantenimientoRoutes);
app.use('/api/mantenimiento', mantenimientoRoutes);
app.use('/api/huesped_estancia', huespedEstanciaRoutes);
app.use('/api/habitacion', habitacionRoutes);
app.use('/api/estancia_empleado', estanciaEmpleadoRoutes);
app.use('/api/estancia', estanciaRoutes);
app.use('/api/metodo_pago', metodoPagoRoutes);
app.use('/api/reserva', reservaRoutes);
app.use('/api/pago', pagoRoutes);
app.use('/api/rol_empleado', rolEmpleadoRoutes);
app.use('/api/tipo_habitacion', tipoHabitacionRoutes);
app.use('/api/tipo_reserva', tipoReservaRoutes);
app.use('/api/turno_empleado', turnoEmpleadoRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
}); 