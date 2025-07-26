const express = require('express');
const router = express.Router();
const EstadoHabitacionService = require('../../application/services/EstadoHabitacionService');

router.get('/', async (req, res) => {
  try {
    const estados = await EstadoHabitacionService.getAll();
    res.json(estados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const estado = await EstadoHabitacionService.getById(req.params.id);
    if (!estado) return res.status(404).json({ error: 'Estado no encontrado' });
    res.json(estado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevo = await EstadoHabitacionService.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const actualizado = await EstadoHabitacionService.update(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await EstadoHabitacionService.delete(req.params.id);
    res.json({ message: 'Estado eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 