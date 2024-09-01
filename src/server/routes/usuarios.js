import express from 'express';
const router = express.Router()

// Importamos controlador
import usuariosController from '../controllers/usuariosController.js';

// rutas
router.get("/", usuariosController.obtenerTodos);
router.post("/", usuariosController.crear);
router.put("/:id", usuariosController.actualizar);
router.delete("/:id", usuariosController.borrar);
router.get("/:id", usuariosController.obtener);

export default router