const express = require('express');
const router = express.Router();
const HuespedEstanciaService = require('../../application/services/HuespedEstanciaService');

router.get('/', async (req, res) => {
  try {
    const items = await HuespedEstanciaService.getAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id_estancia/:id_huesped', async (req, res) => {
  try {
    const item = await HuespedEstanciaService.getById(req.params.id_estancia, req.params.id_huesped);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevo = await HuespedEstanciaService.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id_estancia/:id_huesped', async (req, res) => {
  try {
    await HuespedEstanciaService.delete(req.params.id_estancia, req.params.id_huesped);
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 