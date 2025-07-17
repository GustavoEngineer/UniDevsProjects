const express = require('express');
const router = express.Router();
const Batalla3v3Repo = require('../../infrastructure/repositories/Batalla3v3Repository');
const PersonajeRepo = require('../../infrastructure/repositories/PersonajeRepository');

/**
 * @swagger
 * components:
 *   schemas:
 *     PersonajeBatalla3v3:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *         nombre:
 *           type: string
 *         hp:
 *           type: integer
 *         energia:
 *           type: integer
 *         combo:
 *           type: integer
 *         ultra:
 *           type: integer
 *         estado:
 *           type: string
 *           description: Estado actual (normal, defendiendo, KO, etc.)
 *         historial:
 *           type: array
 *           items:
 *             type: string
 *       required: [id, nombre, hp, energia, combo, ultra, estado]
 *
 *     Batalla3v3:
 *       type: object
 *       properties:
 *         BatallaID:
 *           type: integer
 *         Equipo1:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PersonajeBatalla3v3'
 *         Equipo2:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/PersonajeBatalla3v3'
 *         Estado:
 *           type: string
 *           enum: [En curso, Finalizada]
 *         Ganador:
 *           type: string
 *           nullable: true
 *         TurnoActual:
 *           type: integer
 *           enum: [1, 2]
 *         idxActivo1:
 *           type: integer
 *           description: Índice del personaje activo en Equipo1
 *         idxActivo2:
 *           type: integer
 *           description: Índice del personaje activo en Equipo2
 *         historial:
 *           type: array
 *           items:
 *             type: string
 *       required: [BatallaID, Equipo1, Equipo2, Estado, TurnoActual, idxActivo1, idxActivo2]
 *     CrearBatalla3v3Input:
 *       type: object
 *       properties:
 *         equipo1:
 *           type: array
 *           items:
 *             type: integer
 *         equipo2:
 *           type: array
 *           items:
 *             type: integer
 *       required: [equipo1, equipo2]
 *     AccionBatalla3v3Input:
 *       type: object
 *       properties:
 *         batallaId:
 *           type: integer
 *         personajeId:
 *           type: integer
 *         accion:
 *           type: string
 *           enum: ["Ataque Básico", "Ataque Fuerte", "Combo", "Defender", "Cargar Energía", "Ultra Move"]
 *       required: [batallaId, personajeId, accion]
 *     ResultadoAccion3v3:
 *       type: object
 *       properties:
 *         mensaje:
 *           type: string
 *         efectos:
 *           type: object
 *         estado:
 *           type: object
 *         turnoSiguiente:
 *           type: integer
 *         ganador:
 *           type: string
 *           nullable: true
 *     ErrorAccion3v3:
 *       type: object
 *       properties:
 *         error:
 *           type: string
 *         posiblesAcciones:
 *           type: array
 *           items:
 *             type: string
 *       example:
 *         error: "No tienes suficiente energía para Ataque Fuerte."
 *         posiblesAcciones: ["Ataque Básico", "Defender", "Cargar Energía"]
 *     Golpe3v3:
 *       type: object
 *       properties:
 *         golpe:
 *           type: integer
 *         atacante:
 *           type: object
 *           properties:
 *             id: { type: integer }
 *             nombre: { type: string }
 *             hp: { type: integer }
 *             energia: { type: integer }
 *             combo: { type: integer }
 *             ultra: { type: integer }
 *             estado: { type: string }
 *         defensor:
 *           type: object
 *           properties:
 *             id: { type: integer }
 *             nombre: { type: string }
 *             hp: { type: integer }
 *             energia: { type: integer }
 *             combo: { type: integer }
 *             ultra: { type: integer }
 *             estado: { type: string }
 *         accion:
 *           type: string
 *         mensaje:
 *           type: string
 *         efectos:
 *           type: object
 *         turnoSiguiente:
 *           type: integer
 *         idSiguiente:
 *           type: integer
 *         ganador:
 *           type: string
 *           nullable: true
 */

/**
 * @swagger
 * tags:
 *   - name: Batalla3v3
 *     description: Batallas 3v3
 */

/**
 * @swagger
 * /api/batallas3v3:
 *   post:
 *     summary: Crear una nueva batalla 3vs3
 *     tags: [Batalla3v3]
 *     description: |
 *       Crea una batalla 3v3 entre dos equipos. Cada equipo debe estar compuesto por exactamente 3 personajes diferentes (IDs únicos por equipo y entre equipos).
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CrearBatalla3v3Input'
 *           example:
 *             equipo1: [1, 2, 3]
 *             equipo2: [4, 5, 6]
 *     responses:
 *       201:
 *         description: Batalla 3v3 creada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Batalla3v3'
 *       400:
 *         description: Error de validación (por ejemplo, menos o más de 3 personajes por equipo, IDs repetidos, etc.)
 *       404:
 *         description: Personaje no encontrado
 *   get:
 *     summary: Obtener todas las batallas 3v3
 *     tags: [Batalla3v3]
 *     responses:
 *       200:
 *         description: Lista de batallas 3v3
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Batalla3v3'
 */

/**
 * @swagger
 * /api/batallas3v3/accion:
 *   post:
 *     summary: Ejecutar una acción en una batalla 3vs3 por turnos
 *     tags: [Batalla3v3]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AccionBatalla3v3Input'
 *     responses:
 *       200:
 *         description: Resultado de la acción y estado actualizado de la batalla 3v3
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Golpe3v3'
 *       400:
 *         description: Error de validación o acción inválida
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorAccion3v3'
 *       404:
 *         description: Batalla o personaje no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorAccion3v3'
 */

/**
 * @swagger
 * /api/batallas3v3/reglas:
 *   get:
 *     summary: Obtener las reglas básicas del juego y los movimientos posibles para 3v3
 *     tags: [Batalla3v3]
 *     responses:
 *       200:
 *         description: Reglas y movimientos del juego 3v3
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reglas:
 *                   type: string
 *                   example: |
 *                     - Los equipos se alternan por turnos: solo el personaje activo de cada equipo puede ejecutar acciones.
 *                     - Si un personaje es derrotado, el siguiente entra automáticamente al inicio del siguiente turno.
 *                     - No se permite el cambio manual de personajes (el cambio es automático al ser derrotado).
 *                     - Todos los recursos (HP, energía, combo, ultra) son individuales por personaje y no se comparten entre miembros del equipo.
 *                     - Gana el equipo que elimine a los tres personajes rivales.
 *                     - Se puede jugar al mejor de 3 rondas (Best of 3), reiniciando vida y recursos en cada ronda, manteniendo el mismo orden de aparición.
 *                 movimientos:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombre:
 *                         type: string
 *                       descripcion:
 *                         type: string
 *                       requisitos:
 *                         type: string
 *                       efectos:
 *                         type: string
 *                 efectosEspeciales:
 *                   type: array
 *                   items:
 *                     type: string
 */

/**
 * @swagger
 * /api/batallas3v3/{id}:
 *   delete:
 *     summary: Eliminar una batalla 3v3 por ID
 *     tags: [Batalla3v3]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la batalla 3v3
 *     responses:
 *       200:
 *         description: Batalla 3v3 eliminada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensaje:
 *                   type: string
 *       404:
 *         description: Batalla 3v3 no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

/**
 * @swagger
 * /api/batallas3v3/{id}/historial:
 *   get:
 *     summary: Obtener el historial de acciones de una batalla 3v3 (todas las rondas o una ronda específica)
 *     tags: [Batalla3v3]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la batalla 3v3
 *       - in: query
 *         name: ronda
 *         required: false
 *         schema:
 *           type: integer
 *         description: Número de ronda a consultar (si se omite, devuelve todas las rondas)
 *     responses:
 *       200:
 *         description: Historial de la batalla 3v3 (todas las rondas o solo la ronda solicitada)
 *         content:
 *           application/json:
 *             schema:
 *               oneOf:
 *                 - type: object
 *                   properties:
 *                     rondas:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           numero:
 *                             type: integer
 *                           inicio:
 *                             type: string
 *                           acciones:
 *                             type: array
 *                             items:
 *                               $ref: '#/components/schemas/Golpe3v3'
 *                           fin:
 *                             type: string
 *                 - type: object
 *                   properties:
 *                     ronda:
 *                       type: object
 *                       properties:
 *                         numero:
 *                           type: integer
 *                         inicio:
 *                           type: string
 *                         acciones:
 *                           type: array
 *                           items:
 *                             $ref: '#/components/schemas/Golpe3v3'
 *                         fin:
 *                           type: string
 *       404:
 *         description: Batalla 3v3 o ronda no encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */

// Crear una nueva batalla 3v3
router.post('/api/batallas3v3', (req, res) => {
  const { equipo1, equipo2 } = req.body;
  if (!Array.isArray(equipo1) || !Array.isArray(equipo2) || equipo1.length !== 3 || equipo2.length !== 3) {
    return res.status(400).json({ error: '⚠️ Debes seleccionar exactamente 3 personajes por equipo.' });
  }
  // Validar que no haya IDs repetidos entre ambos equipos
  const ids = [...equipo1, ...equipo2];
  if (new Set(ids).size !== 6) {
    return res.status(400).json({ error: '⚠️ No puede haber personajes repetidos entre los equipos.' });
  }
  // Obtener personajes y validar existencia
  const personajes1 = equipo1.map(id => PersonajeRepo.getById(id));
  const personajes2 = equipo2.map(id => PersonajeRepo.getById(id));
  if (personajes1.includes(undefined) || personajes2.includes(undefined)) {
    return res.status(404).json({ error: '⚠️ Uno o más personajes no existen.' });
  }
  // Inicializar personajes de batalla
  function initPersonaje(p) {
    return {
      id: p.PersonajeID,
      nombre: p.Nombre,
      hp: 100,
      energia: 50,
      combo: 0,
      ultra: 0,
      estado: 'Normal',
      historial: []
    };
  }
  const eq1 = personajes1.map(initPersonaje);
  const eq2 = personajes2.map(initPersonaje);
  const batalla = Batalla3v3Repo.create({
    Equipo1: eq1,
    Equipo2: eq2,
    Estado: 'En curso',
    TurnoActual: 1,
    idxActivo1: 0,
    idxActivo2: 0,
    rondas: [{
      numero: 1,
      inicio: `${eq1[0].nombre} vs ${eq2[0].nombre}`,
      acciones: [],
      fin: null
    }],
    rondaActual: 1
  });
  res.status(201).json(batalla);
});

// Listar todas las batallas 3v3
router.get('/api/batallas3v3', (req, res) => {
  res.json(Batalla3v3Repo.getAll());
});

// Ejecutar acción en batalla 3v3
router.post('/api/batallas3v3/accion', (req, res) => {
  const { batallaId, personajeId, accion } = req.body;
  const batalla = Batalla3v3Repo.getById(batallaId);
  if (!batalla) {
    return res.status(404).json({ error: '⚠️ Batalla no encontrada.' });
  }
  if (batalla.Estado === 'Finalizada') {
    return res.status(400).json({ error: '⚠️ La batalla ya ha finalizado.', ganador: batalla.Ganador });
  }
  // Determinar equipo y personaje activo
  const equipoActivo = batalla.TurnoActual === 1 ? batalla.Equipo1 : batalla.Equipo2;
  const idxActivo = batalla.TurnoActual === 1 ? batalla.idxActivo1 : batalla.idxActivo2;
  const personajeActivo = equipoActivo[idxActivo];
  if (!personajeActivo || personajeActivo.estado === 'KO') {
    return res.status(400).json({ error: '⚠️ No hay personaje activo disponible para este equipo.' });
  }
  if (personajeActivo.id !== personajeId) {
    return res.status(400).json({ error: '⚠️ Solo el personaje activo puede ejecutar acciones en su turno.' });
  }
  // Determinar equipo rival y personaje rival activo
  const equipoRival = batalla.TurnoActual === 1 ? batalla.Equipo2 : batalla.Equipo1;
  const idxRival = batalla.TurnoActual === 1 ? batalla.idxActivo2 : batalla.idxActivo1;
  const personajeRival = equipoRival[idxRival];
  if (!personajeRival || personajeRival.estado === 'KO') {
    return res.status(400).json({ error: '⚠️ No hay personaje rival activo disponible.' });
  }
  // Obtener datos completos del personaje activo para combos/ultra
  const personajeData = PersonajeRepo.getById(personajeActivo.id);
  // Resetear estado de defensa al inicio del turno
  if (personajeActivo.estado === 'Defendiendo' || personajeActivo.estado === 'Vulnerable') personajeActivo.estado = 'Normal';
  let mensaje = '';
  let efectos = {};
  let danoReal = 0;
  let nombreCombo = null;
  let nombreUltra = null;
  let contraataqueRealizado = false;
  // Acciones
  switch (accion) {
    case 'Ataque Básico': {
      const dmg = Math.floor(Math.random() * 5) + 12; // 12-16
      danoReal = dmg;
      personajeRival.hp = Math.max(personajeRival.hp - dmg, 0);
      personajeActivo.combo = Math.min(personajeActivo.combo + 10, 100);
      personajeActivo.ultra = Math.min(personajeActivo.ultra + 7, 100);
      mensaje = `🗡️ ${personajeActivo.nombre} realizó un Ataque Básico a ${personajeRival.nombre}, causando ${danoReal} de daño. ¡Gana +10 combo y +7 ultra!`;
      efectos = { dano: dmg, comboGanado: 10, ultraGanado: 7 };
      break;
    }
    case 'Ataque Fuerte': {
      if (personajeActivo.energia < 20) {
        return res.status(400).json({ error: '⚠️ No tienes suficiente energía para Ataque Fuerte. Prueba con Ataque Básico, Defender o Cargar Energía.', posiblesAcciones: ['Ataque Básico', 'Defender', 'Cargar Energía'] });
      }
      const dmg = Math.floor(Math.random() * 7) + 22; // 22-28
      danoReal = dmg;
      personajeRival.hp = Math.max(personajeRival.hp - dmg, 0);
      personajeActivo.energia = Math.max(personajeActivo.energia - 20, 0);
      personajeActivo.combo = Math.min(personajeActivo.combo + 15, 100);
      personajeActivo.ultra = Math.min(personajeActivo.ultra + 8, 100);
      mensaje = `💪 ${personajeActivo.nombre} realizó un Ataque Fuerte a ${personajeRival.nombre}, causando ${danoReal} de daño. ¡Gana +15 combo y +8 ultra!`;
      efectos = { dano: dmg, energiaGastada: 20, comboGanado: 15, ultraGanado: 8 };
      break;
    }
    case 'Combo': {
      if (personajeActivo.combo < 30) {
        return res.status(400).json({ error: '⚠️ Necesitas al menos 30 de combo para usar Combo. Prueba con Ataque Básico, Ataque Fuerte, Defender o Cargar Energía.', posiblesAcciones: ['Ataque Básico', 'Ataque Fuerte', 'Defender', 'Cargar Energía'] });
      }
      if (personajeActivo.energia < 30) {
        return res.status(400).json({ error: '⚠️ No tienes suficiente energía para Combo. Prueba con Ataque Básico, Ataque Fuerte, Defender o Cargar Energía.', posiblesAcciones: ['Ataque Básico', 'Ataque Fuerte', 'Defender', 'Cargar Energía'] });
      }
      let dmg = 0;
      if (personajeActivo.combo >= 30 && personajeActivo.combo < 60) {
        dmg = Math.floor(Math.random() * 9) + 30; // 30-38
        nombreCombo = personajeData?.combo1Name || 'Combo Especial';
      } else if (personajeActivo.combo >= 60 && personajeActivo.combo < 90) {
        dmg = Math.floor(Math.random() * 11) + 45; // 45-55
        nombreCombo = personajeData?.combo2Name || 'Combo Especial';
      } else if (personajeActivo.combo >= 90) {
        dmg = Math.floor(Math.random() * 16) + 60; // 60-75
        nombreCombo = personajeData?.combo3Name || 'Combo Especial';
      }
      danoReal = dmg;
      personajeRival.hp = Math.max(personajeRival.hp - dmg, 0);
      personajeActivo.energia = Math.max(personajeActivo.energia - 30, 0);
      personajeActivo.combo = Math.max(personajeActivo.combo - 30, 0);
      personajeActivo.ultra = Math.min(personajeActivo.ultra + 10, 100);
      mensaje = `💥 ${personajeActivo.nombre} realizó su combo "${nombreCombo}" sobre ${personajeRival.nombre}, causando ${danoReal} de daño. ¡Gana +10 ultra!`;
      efectos = { dano: dmg, energiaGastada: 30, comboGastado: 30, ultraGanado: 10, nombreCombo };
      break;
    }
    case 'Defender': {
      personajeActivo.estado = 'Defendiendo';
      mensaje = `🛡️ ${personajeActivo.nombre} se puso en defensa.`;
      efectos = { defensa: true };
      break;
    }
    case 'Cargar Energía': {
      personajeActivo.energia = Math.min(personajeActivo.energia + 30, 100);
      personajeActivo.ultra = Math.min(personajeActivo.ultra + 15, 100);
      personajeActivo.estado = 'Vulnerable';
      mensaje = `⚡ ${personajeActivo.nombre} cargó energía y quedó vulnerable. ¡Gana +30 energía y +15 ultra!`;
      efectos = { energiaGanada: 30, ultraGanado: 15 };
      break;
    }
    case 'Ultra Move': {
      if (personajeActivo.ultra < 100) {
        return res.status(400).json({ error: '⚠️ La barra de ultra debe estar al 100% para usar Ultra Move. Prueba con Ataque Básico, Ataque Fuerte, Combo, Defender o Cargar Energía.', posiblesAcciones: ['Ataque Básico', 'Ataque Fuerte', 'Combo', 'Defender', 'Cargar Energía'] });
      }
      if (personajeActivo.ultraUsado) {
        return res.status(400).json({ error: '⚠️ Ultra Move solo puede usarse una vez por ronda. Prueba con Ataque Básico, Ataque Fuerte, Combo, Defender o Cargar Energía.', posiblesAcciones: ['Ataque Básico', 'Ataque Fuerte', 'Combo', 'Defender', 'Cargar Energía'] });
      }
      const dmg = Math.floor(Math.random() * 21) + 90; // 90-110
      danoReal = dmg;
      personajeRival.hp = Math.max(personajeRival.hp - dmg, 0);
      personajeActivo.ultraUsado = true;
      personajeActivo.ultra = 0;
      nombreUltra = personajeData?.ultraName || 'Ultra Final';
      mensaje = `⚡ ${personajeActivo.nombre} usó su ultra "${nombreUltra}" contra ${personajeRival.nombre}, causando ${danoReal} de daño. ¡Gana +100 ultra!`;
      efectos = { dano: dmg, ultraGastado: 100, nombreUltra };
      break;
    }
    default:
      return res.status(400).json({ error: '⚠️ Acción no reconocida. Prueba con Ataque Básico, Ataque Fuerte, Combo, Defender, Cargar Energía o Ultra Move.', posiblesAcciones: ['Ataque Básico', 'Ataque Fuerte', 'Combo', 'Defender', 'Cargar Energía', 'Ultra Move'] });
  }
  // --- EFECTOS DEFENSOR Y ULTRA ---
  // Si el defensor estaba defendiendo y recibe golpe
  if (personajeRival.estado === 'Defendiendo' && ['Ataque Básico', 'Ataque Fuerte', 'Combo', 'Ultra Move'].includes(accion)) {
    const reduccion = Math.random() * 0.2 + 0.5; // 50-70%
    const danoOriginal = efectos.dano || 0;
    const danoReducido = Math.round(danoOriginal * reduccion);
    personajeRival.hp = Math.max(personajeRival.hp + danoOriginal - danoReducido, 0);
    personajeRival.energia = Math.min(personajeRival.energia + 10, 100);
    personajeRival.ultra = Math.min(personajeRival.ultra + 20, 100);
    efectos.danoReducido = danoReducido;
    efectos.defensaBonus = { energiaGanada: 10, ultraGanado: 20 };
    danoReal = danoReducido;
    // Contraataque especial
    if ((accion === 'Ataque Fuerte' || accion === 'Combo') && personajeRival.energia >= 10) {
      personajeActivo.hp = Math.max(personajeActivo.hp - 5, 0);
      personajeRival.energia = Math.max(personajeRival.energia - 10, 0);
      contraataqueRealizado = true;
      efectos.contraataque = {
        mensaje: `${personajeRival.nombre} realizó un contraataque automático y causó 5 de daño a ${personajeActivo.nombre}.`,
        dano: 5,
        energiaGastada: 10
      };
    }
  }
  // Si el atacante estaba vulnerable y fue atacado, gana ultra extra
  if (personajeActivo.estado === 'Vulnerable' && ['Ataque Básico', 'Ataque Fuerte', 'Combo', 'Ultra Move'].includes(accion)) {
    personajeActivo.ultra = Math.min(personajeActivo.ultra + 10, 100);
    efectos.ultraGanadoPorVulnerable = 10;
  }
  // Cada vez que un personaje recibe daño, gana +10 ultra adicional
  if (danoReal > 0) {
    personajeRival.ultra = Math.min(personajeRival.ultra + 10, 100);
    efectos.ultraGanadoPorRecibirDanio = 10;
  }
  // Si el rival cae a 0, marcar KO y pasar al siguiente
  if (personajeRival.hp <= 0) {
    personajeRival.estado = 'KO';
    mensaje += ` 💀 ${personajeRival.nombre} ha sido derrotado!`;
    if (batalla.TurnoActual === 1) {
      if (batalla.idxActivo2 < batalla.Equipo2.length - 1) {
        batalla.idxActivo2++;
      }
    } else {
      if (batalla.idxActivo1 < batalla.Equipo1.length - 1) {
        batalla.idxActivo1++;
      }
    }
  }
  // Verificar condición de victoria
  const equipo1KOs = batalla.Equipo1.filter(p => p.estado === 'KO').length;
  const equipo2KOs = batalla.Equipo2.filter(p => p.estado === 'KO').length;
  let ganador = null;
  if (equipo1KOs === 3) {
    batalla.Estado = 'Finalizada';
    batalla.Ganador = 'Equipo 2';
    ganador = 'Equipo 2';
    mensaje += ' 🎉 ¡Equipo 2 gana la batalla!';
  } else if (equipo2KOs === 3) {
    batalla.Estado = 'Finalizada';
    batalla.Ganador = 'Equipo 1';
    ganador = 'Equipo 1';
    mensaje += ' 🎉 ¡Equipo 1 gana la batalla!';
  } else {
    batalla.TurnoActual = batalla.TurnoActual === 1 ? 2 : 1;
  }
  // Determinar el id del personaje que sigue
  let idSiguiente = null;
  if (batalla.Estado !== 'Finalizada') {
    if (batalla.TurnoActual === 1) {
      idSiguiente = batalla.Equipo1[batalla.idxActivo1]?.id;
    } else {
      idSiguiente = batalla.Equipo2[batalla.idxActivo2]?.id;
    }
  }
  // Guardar en historial optimizado
  if (!Array.isArray(batalla.historial)) batalla.historial = [];
  const golpeN = batalla.historial.length + 1;
  const registroHistorial = {
    golpe: golpeN,
    atacante: {
      id: personajeActivo.id,
      nombre: personajeActivo.nombre,
      hp: personajeActivo.hp,
      energia: personajeActivo.energia,
      combo: personajeActivo.combo,
      ultra: personajeActivo.ultra,
      estado: personajeActivo.estado
    },
    defensor: {
      id: personajeRival.id,
      nombre: personajeRival.nombre,
      hp: personajeRival.hp,
      energia: personajeRival.energia,
      combo: personajeRival.combo,
      ultra: personajeRival.ultra,
      estado: personajeRival.estado
    },
    accion,
    mensaje,
    efectos,
    turnoSiguiente: batalla.TurnoActual,
    idSiguiente,
    ganador
  };
  batalla.historial.push(registroHistorial);
  Batalla3v3Repo.update(batalla.BatallaID, batalla);
  // Obtener la ronda actual
  if (!Array.isArray(batalla.rondas)) batalla.rondas = [];
  let ronda = batalla.rondas[batalla.rondaActual - 1];
  if (!ronda) {
    ronda = {
      numero: batalla.rondaActual,
      inicio: `${batalla.Equipo1[batalla.idxActivo1]?.nombre} vs ${batalla.Equipo2[batalla.idxActivo2]?.nombre}`,
      acciones: [],
      fin: null
    };
    batalla.rondas.push(ronda);
  }
  ronda.acciones.push(registroHistorial);
  // Si hubo KO, cerrar la ronda y abrir la siguiente si la batalla sigue
  let nuevoKO = false;
  if (personajeRival.hp <= 0) {
    ronda.fin = `☠️ ${personajeRival.nombre} ha caído. El siguiente luchador entra en combate.`;
    nuevoKO = true;
  }
  // Si la batalla sigue y hubo KO, iniciar nueva ronda
  if (nuevoKO && batalla.Estado !== 'Finalizada') {
    batalla.rondaActual++;
    batalla.rondas.push({
      numero: batalla.rondaActual,
      inicio: `${batalla.Equipo1[batalla.idxActivo1]?.nombre} vs ${batalla.Equipo2[batalla.idxActivo2]?.nombre}`,
      acciones: [],
      fin: null
    });
  }
  Batalla3v3Repo.update(batalla.BatallaID, batalla);
  res.json({
    ...registroHistorial,
    ronda: batalla.rondaActual
  });
});

/**
 * @swagger
 * /api/batallas3v3/{id}/historial:
 *   get:
 *     summary: Obtener el historial de acciones de una batalla 3v3
 *     tags: [Batalla3v3]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la batalla 3v3
 *     responses:
 *       200:
 *         description: Historial de la batalla 3v3
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 historial:
 *                   type: array
 *                   items:
 *                     type: string
 *       404:
 *         description: Batalla 3v3 no encontrada
 */

// Eliminar una batalla 3v3 por ID
router.delete('/api/batallas3v3/:id', (req, res) => {
  const id = parseInt(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    return res.status(400).json({ error: '⚠️ El ID debe ser un entero positivo.' });
  }
  const batallas = Batalla3v3Repo.getAll();
  const idx = batallas.findIndex(b => b.BatallaID === id);
  if (idx === -1) {
    return res.status(404).json({ error: '⚠️ Batalla 3v3 no encontrada.' });
  }
  batallas.splice(idx, 1);
  Batalla3v3Repo.batallas = batallas;
  Batalla3v3Repo.saveData = Batalla3v3Repo.saveData || require('fs').writeFileSync;
  require('fs').writeFileSync(require('path').join(__dirname, '../../infrastructure/repositories/batallas3v3.json'), JSON.stringify({ batallas, currentId: Batalla3v3Repo.currentId }, null, 2));
  res.json({ mensaje: 'Batalla 3v3 eliminada' });
});

// Obtener historial de una batalla 3v3 (por id y opcionalmente por número de ronda)
router.get('/api/batallas3v3/:id/historial', (req, res) => {
  const id = parseInt(req.params.id);
  const rondaN = req.query.ronda ? parseInt(req.query.ronda) : null;
  const batalla = Batalla3v3Repo.getById(id);
  if (!batalla) {
    return res.status(404).json({ error: '⚠️ Batalla 3v3 no encontrada.' });
  }
  if (rondaN) {
    const ronda = (batalla.rondas || []).find(r => r.numero === rondaN);
    if (!ronda) {
      return res.status(404).json({ error: `⚠️ No existe la ronda ${rondaN} en esta batalla.` });
    }
    return res.json({ ronda });
  }
  res.json({ rondas: batalla.rondas || [] });
});

module.exports = router; 