const express = require('express');
const router = express.Router();
const HuespedService = require('../../application/services/HuespedService');

// Obtener todos los huéspedes
router.get('/', async (req, res) => {
  try {
    const huespedes = await HuespedService.getAll();
    res.json(huespedes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Obtener un huésped por ID
router.get('/:id', async (req, res) => {
  try {
    const huesped = await HuespedService.getById(req.params.id);
    if (!huesped) return res.status(404).json({ error: 'Huésped no encontrado' });
    res.json(huesped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear un huésped
router.post('/', async (req, res) => {
  try {
    const nuevo = await HuespedService.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar un huésped
router.put('/:id', async (req, res) => {
  try {
    const actualizado = await HuespedService.update(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar un huésped
router.delete('/:id', async (req, res) => {
  try {
    await HuespedService.delete(req.params.id);
    res.json({ message: 'Huésped eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 