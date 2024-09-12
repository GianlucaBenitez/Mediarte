import express from 'express';
const router = express.Router()

// Importamos controlador
import usuariosController from '../controllers/usuariosController.js';

// Importamos middleware
import verificarToken from '../middleware/verificarToken.js';

// rutas
router.get("/", usuariosController.obtenerTodos);
router.post("/registro", usuariosController.registro);
router.post("/login", usuariosController.login);
router.put("/:id", verificarToken, usuariosController.actualizar);
router.delete("/:id", usuariosController.borrar);
router.get("/:id", usuariosController.obtener);

export default router