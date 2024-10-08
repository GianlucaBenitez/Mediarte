import express from 'express';
const router = express.Router()

// Importamos controlador
import usuariosController from '../controllers/usuariosController.js';

// Importamos middleware
import verificarToken from '../middleware/verificarToken.js';

// rutas
router.get("/", verificarToken, usuariosController.obtenerTodos);
router.post("/registro", usuariosController.registro);
router.post("/login", usuariosController.login);
router.post("/validar", usuariosController.validar);
router.post("/logout", verificarToken, usuariosController.logout);
router.put("/:id", verificarToken, usuariosController.actualizar);
router.delete("/:id",verificarToken, usuariosController.borrar);
router.get("/:id", verificarToken, usuariosController.obtener);

export default router