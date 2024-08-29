const express = require('express');
const router = express.Router()

// Importamos controlador
const guardadosController = require('../controllers/guardadosController');

// rutas
router.get("/:id", guardadosController.obtener);

  
module.exports = router