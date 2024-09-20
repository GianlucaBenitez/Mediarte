import express from 'express';
const router = express.Router()

// Importamos controlador
import audiosController from '../controllers/audiosController.js';

// Importamos el middleware
import upload from '../middleware/multer.js';
import verificarToken from '../middleware/verificarToken.js'

// rutas
router.get("/", audiosController.obtenerTodos);
router.get("/:tipo", audiosController.obtenerPorTipo);
router.get("/obtenerId/:id_audio", audiosController.obtenerPorId);
router.put("/:id_audio", verificarToken, upload, audiosController.actualizar);
router.delete("/:id_audio", verificarToken, audiosController.borrar);
router.post("/", verificarToken, upload, audiosController.crear);
router.put("/reproducciones/:id_audio",audiosController.actualizarReproducciones)
  
export default router