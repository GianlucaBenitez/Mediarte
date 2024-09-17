import express from 'express';
const router = express.Router()

// Importamos controlador
import audiosController from '../controllers/audiosController.js';

// Importamos el middleware
import upload from '../middleware/multer.js'

// rutas
router.get("/", audiosController.obtenerTodos);
router.get("/:tipo", audiosController.obtenerPorTipo);
router.put("/:id_audio",audiosController.actualizar);
router.delete("/:id_audio",audiosController.borrar);
router.post("/",upload,audiosController.crear);
  
export default router