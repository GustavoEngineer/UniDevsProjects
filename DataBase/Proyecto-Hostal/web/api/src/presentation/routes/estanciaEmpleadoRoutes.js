const express = require('express');
const router = express.Router();
const EstanciaEmpleadoService = require('../../application/services/EstanciaEmpleadoService');

router.get('/', async (req, res) => {
  try {
    const items = await EstanciaEmpleadoService.getAll();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id_estancia/:id_empleado', async (req, res) => {
  try {
    const item = await EstanciaEmpleadoService.getById(req.params.id_estancia, req.params.id_empleado);
    if (!item) return res.status(404).json({ error: 'No encontrado' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const nuevo = await EstanciaEmpleadoService.create(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id_estancia/:id_empleado', async (req, res) => {
  try {
    await EstanciaEmpleadoService.delete(req.params.id_estancia, req.params.id_empleado);
    res.json({ message: 'Eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; 