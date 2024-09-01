import express from 'express';
const router = express.Router()

// Importamos controlador
import guardadosController from '../controllers/guardadosController.js';

// rutas
router.get("/:id", guardadosController.obtener);

  
export default router