import express from 'express';
const router = express.Router()

// Importamos controlador
import guardadosController from '../controllers/guardadosController.js';

// rutas
router.get("/:id_usuario", guardadosController.obtener);
router.post("/:id_usuario", guardadosController.crear);
router.delete("/:id_guardado", guardadosController.borrar);
  
export default router