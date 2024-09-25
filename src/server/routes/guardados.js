import express from 'express';
const router = express.Router()

// Importamos controlador
import guardadosController from '../controllers/guardadosController.js';


// Importamos el Middleware 
import verificarToken from '../middleware/verificarToken.js';

// rutas
router.get("/:id_usuario", verificarToken, guardadosController.obtenerTodos);
router.post("/:id_usuario", verificarToken, guardadosController.crear);
router.delete("/:id_usuario", verificarToken, guardadosController.borrar);
  
export default router