const express = require('express');
const router = express.Router()

// Importamos controlador
const usuariosController = require('../controllers/usuariosController')

// rutas
router.get("/", usuariosController.menu);
router.get("/config",usuariosController.configuracion);
router.get("/ayuda",usuariosController.ayuda);
router.get("/admin", usuariosController.obtenerTodos);
router.post("/admin", usuariosController.crear);
router.put("/admin/:id", usuariosController.actualizar);
router.delete("/admin/:id", usuariosController.borrar);
router.get("/:id", usuariosController.obtener);

module.exports = router