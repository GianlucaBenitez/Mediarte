import express from 'express';
const router = express.Router()

// Importamos controlador
import audiosController from '../controllers/audiosController.js';

// rutas
router.get("/", audiosController.obtenerTodos);
router.get("/:tipo", audiosController.obtenerPorTipo);
  
export default router