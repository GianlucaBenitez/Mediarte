import express from 'express';
const router = express.Router()

// Importamos controlador
import audiosController from '../controllers/audiosController.js';

// Importamos el middleware
import upload from '../middleware/multer.js'

// rutas
router.get("/", audiosController.obtenerTodos);
router.get("/:tipo", audiosController.obtenerPorTipo);
router.put("/",audiosController.actualizar);
router.delete("/",audiosController.borrar);
router.post("/",upload,audiosController.crear);
  
export default router