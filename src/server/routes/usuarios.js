const express = require('express');
const router = express.Router()

// Importamos controlador
const usuariosController = require('../controllers/usuariosController')

// rutas
router.get("/", usuariosController.obtenerTodos);
router.post("/", usuariosController.crear);
router.put("/:id", usuariosController.actualizar);
router.delete("/:id", usuariosController.borrar);
router.get("/:id", usuariosController.obtener);

module.exports = router