ñ// Importamos modelo de Guardado
import Audio from '../models/Audio.js';
import Audio from '../models/Audio.js';
import Guardado from '../models/Guardados.js';

// Controlador de guardados
const guardadosController = {
  obtener: async (req, res) => {
    try {
      const id = req.params.id ;
      const guardados = await Guardado.findByPk(id)

      if (!guardados) {
        return res.status(404).json({ error: "Guardado no encontrado" });
      }
        
      return res.status(200).json({message: guardados}) 
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  },    
  crear: async (req, res) => {
    try {
      const {  guardados } = req.body
  
      // Validaciones
      if (!guardados || !Audioregex.test(guardados)) {
        return res.status(401).json({error: "Audio inválido"})
      }
    const AudioNuevo = await Audio.create({ 
        nombre: guardados, 
      });
      AudioNuevo.save();
  
      return res.status(200).json({
        message: "Audio creado!",
        data: usuarioNuevo
      })
  
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  },
  
  actualizar: async (req, res) => {
    try {
      const { guardados } = req.body;
      const id = req.params.id;
      if (!usuario) {
        return res.status(404).json({ error: "Audio no encontrado" });
      }
  
      const audioEnUso = await Audio.findOne({ where: { Audio: Audio } });
      if (audioEnUso && audioEnUso.id_audio != id) {
        return res.status(409).json({ error: "Ese audio ya esta guardado" });
      }
  
      
      await usuario.save();
  
      return res.status(200).json({ message: "Audio  actualizado exitosamente", data: Audio});
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  },
  
  borrar: async (req, res) => {
    try {
      const id = req.params.id;
  
      const Audio = await Audio.findByPk(id);
      if (!Audio) {
        return res.status(404).json({ error: "Audio no encontrado" });
      }
  
      await Audio.destroy({ where: { id_audio: id } });
  
      return res.status(200).json({ message: "Audio borrado", data: usuario});
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  }
}

export default guardadosController;