const express = require('express');
const router = express.Router();
const MantenimientoService = require('../../application/services/MantenimientoService');

router.get('/', async (req, res) => {
  try {
    const mantenimientos = await MantenimientoService.getAll();
    res.json(mantenimientos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const mantenimiento = await MantenimientoService.getById(req.params.id);
    if (!mantenimiento) return res.status(404).json({ error: 'Mantenimiento no encontrado' });
    res.json(mantenimiento);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevo = await MantenimientoService.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const actualizado = await MantenimientoService.update(req.params.id, req.body);
    res.json(actualizado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await MantenimientoService.delete(req.params.id);
    res.json({ message: 'Mantenimiento eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 