const express = require('express');
const router = express.Router()

// Importamos controlador
const audiosController = require('../controllers/audiosController');

// rutas
router.get("/", audiosController.obtenerTodos);
router.get("/:tipo", audiosController.obtenerPorTipo);
  
module.exports = router