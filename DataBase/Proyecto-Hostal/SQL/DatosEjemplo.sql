-- Inserciones para tablas de catálogo
INSERT INTO Tipo_Habitacion (nombre_tipo, capacidad_maxima, precio_base_por_noche) VALUES
  ('Individual', 1, 500.00),
  ('Matrimonial', 2, 800.00),
  ('Familiar', 4, 1200.00);

INSERT INTO Estado_Habitacion (nombre_estado) VALUES
  ('Ocupada'),
  ('Disponible'),
  ('Reservada'),
  ('Fuera de Servicio');

INSERT INTO Tipo_Reserva (nombre_tipo) VALUES
  ('Online'),
  ('En persona'),
  ('Telefonica'),
  ('Por Intermediarios');

INSERT INTO Estado_Estancia (nombre_estado) VALUES
  ('En estancia'),
  ('Extendida'),
  ('Completada');

INSERT INTO Metodo_Pago (nombre_metodo) VALUES
  ('Tarjeta'),
  ('Transferencia'),
  ('Efectivo');

INSERT INTO Rol_Empleado (nombre_rol) VALUES
  ('Recepcionista'),
  ('Limpieza'),
  ('Administrador');

INSERT INTO Turno_Empleado (nombre_turno, hora_inicio, hora_fin) VALUES
  ('Matutino', '07:00:00', '15:00:00'),
  ('Nocturno', '15:00:00', '23:00:00');

INSERT INTO Estado_Mantenimiento (nombre_estado) VALUES
  ('En limpieza'),
  ('Disponible'),
  ('Sucio'),
  ('En reparación');

-- Inserciones para Huesped (5 registros)
INSERT INTO Huesped (nombre, apellido_paterno, apellido_materno, numero_celular, correo, fecha_nacimiento, nacionalidad) VALUES
  ('Juan', 'Pérez', 'García', 521234567890, 'juan.perez@example.com', '1990-05-10', 'Mexicana'),
  ('Ana', 'López', 'Martínez', 521234567891, 'ana.lopez@example.com', '1985-08-22', 'Mexicana'),
  ('Carlos', 'Ramírez', 'Sánchez', 521234567892, 'carlos.ramirez@example.com', '1992-12-01', 'Mexicana'),
  ('María', 'Hernández', 'Díaz', 521234567893, 'maria.hernandez@example.com', '1988-03-15', 'Mexicana'),
  ('Luis', 'Torres', 'Vega', 521234567894, 'luis.torres@example.com', '1995-07-30', 'Mexicana');

-- Inserciones para Habitacion (5 registros)
INSERT INTO Habitacion (numero_habitacion, id_tipo_habitacion, id_estado_habitacion) VALUES
  ('101', 1, 2),
  ('102', 2, 2),
  ('103', 3, 2),
  ('104', 1, 3),
  ('105', 2, 4);

-- Inserciones para Empleado (5 registros)
INSERT INTO Empleado (nombre, apellido_paterno, apellido_materno, id_rol_empleado, id_turno_empleado, telefono, email, fecha_contratacion) VALUES
  ('Pedro', 'Gómez', 'Ruiz', 1, 1, 521234567895, 'pedro.gomez@example.com', '2022-01-10'),
  ('Lucía', 'Morales', 'Castro', 2, 2, 521234567896, 'lucia.morales@example.com', '2021-11-05'),
  ('Miguel', 'Santos', 'Flores', 3, 1, 521234567897, 'miguel.santos@example.com', '2020-09-20'),
  ('Sofía', 'Navarro', 'Mendoza', 1, 2, 521234567898, 'sofia.navarro@example.com', '2023-02-14'),
  ('Diego', 'Vargas', 'Silva', 2, 1, 521234567899, 'diego.vargas@example.com', '2022-06-18');

-- Inserciones para Reserva (5 registros)
INSERT INTO Reserva (id_huesped, id_habitacion, fecha_reserva, fecha_checkin_prevista, fecha_checkout_prevista, id_tipo_reserva, precio_total_estimado) VALUES
  (1, 1, '2024-06-01 12:00:00', '2024-06-05', '2024-06-07', 1, 1000.00),
  (2, 2, '2024-06-02 13:00:00', '2024-06-08', '2024-06-10', 2, 1600.00),
  (3, 3, '2024-06-03 14:00:00', '2024-06-11', '2024-06-13', 3, 2400.00),
  (4, 4, '2024-06-04 15:00:00', '2024-06-14', '2024-06-16', 4, 800.00),
  (5, 5, '2024-06-05 16:00:00', '2024-06-17', '2024-06-19', 1, 1600.00);

-- Inserciones para Estancia (5 registros)
INSERT INTO Estancia (id_reserva, id_estado_estancia, id_huesped, hora_checkin, hora_checkout, numero_personas, vehiculo_registrado, placa_vehiculo, requiere_factura) VALUES
  (1, 1, 1, '2024-06-05 14:00:00', '2024-06-07 12:00:00', 1, 0, NULL, 0),
  (2, 2, 2, '2024-06-08 15:00:00', NULL, 2, 1, 'ABC123', 1),
  (3, 3, 3, '2024-06-11 13:00:00', '2024-06-13 11:00:00', 3, 0, NULL, 0),
  (4, 1, 4, '2024-06-14 16:00:00', NULL, 2, 1, 'XYZ789', 1),
  (5, 2, 5, '2024-06-17 17:00:00', NULL, 4, 0, NULL, 0);

-- Inserciones para Mantenimiento (5 registros)
INSERT INTO Mantenimiento (id_habitacion, id_empleado, id_estado_mantenimiento, fecha_solicitud, fecha_inicio, fecha_fin, descripcion) VALUES
  (1, 1, 1, '2024-06-01 10:00:00', '2024-06-01', '2024-06-02', 'Limpieza general'),
  (2, 2, 2, '2024-06-03 11:00:00', '2024-06-03', '2024-06-04', 'Revisión de aire acondicionado'),
  (3, 3, 3, '2024-06-05 12:00:00', '2024-06-05', '2024-06-06', 'Cambio de sábanas'),
  (4, 4, 4, '2024-06-07 13:00:00', '2024-06-07', NULL, 'Reparación de baño'),
  (5, 5, 1, '2024-06-09 14:00:00', '2024-06-09', NULL, 'Limpieza profunda');

-- Inserciones para Pago (5 registros)
INSERT INTO Pago (id_estancia, fecha_pago, monto, id_metodo_pago) VALUES
  (1, '2024-06-07 12:30:00', 1000.00, 1),
  (2, '2024-06-10 13:30:00', 1600.00, 2),
  (3, '2024-06-13 11:30:00', 2400.00, 3),
  (4, '2024-06-16 12:00:00', 800.00, 1),
  (5, '2024-06-19 13:00:00', 1600.00, 2);

-- Inserciones para Huesped_Estancia (5 registros)
INSERT INTO Huesped_Estancia (id_estancia, id_huesped) VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5);

-- Inserciones para Estancia_Empleado (5 registros)
INSERT INTO Estancia_Empleado (id_estancia, id_empleado) VALUES
  (1, 1),
  (2, 2),
  (3, 3),
  (4, 4),
  (5, 5); 