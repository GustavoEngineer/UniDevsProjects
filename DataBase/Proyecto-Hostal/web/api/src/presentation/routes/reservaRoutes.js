const express = require('express');
const router = express.Router();
const ReservaService = require('../../application/services/ReservaService');

router.get('/', async (req, res) => {
  try {
    const items = await ReservaService.getAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint para verificar disponibilidad de habitación (DEBE ir antes de /:id)
router.get('/verificar-disponibilidad/:habitacionId', async (req, res) => {
  try {
    const { habitacionId } = req.params;
    const { fecha_checkin, fecha_checkout, reserva_id } = req.query;
    
    if (!fecha_checkin || !fecha_checkout) {
      return res.status(400).json({ error: 'Se requieren fecha_checkin y fecha_checkout' });
    }
    
    const conflictos = await ReservaService.verificarDisponibilidadHabitacion(
      parseInt(habitacionId), 
      fecha_checkin, 
      fecha_checkout, 
      reserva_id ? parseInt(reserva_id) : null
    );
    
    res.json({
      disponible: conflictos.length === 0,
      conflictos: conflictos,
      mensaje: conflictos.length === 0 
        ? 'Habitación disponible en las fechas seleccionadas' 
        : `La habitación no está disponible. ${conflictos.length} conflicto(s) encontrado(s)`
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const item = await ReservaService.getById(req.params.id);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevo = await ReservaService.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const actualizado = await ReservaService.update(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await ReservaService.delete(req.params.id);
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 