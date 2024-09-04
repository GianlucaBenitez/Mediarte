// Importamos modelo de Audio
import Audio from '../models/Audio.js';

// Controlador de audios
const audiosController = {
  obtenerTodos: async (req, res) => {
    try {
      const audios = await Audio.findAll()
      return res.status(200).json({message: audios}) 
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  },
  
  obtenerPorTipo: async (req, res) => {
    try {
        const tipo = req.params.tipo
        const audios = await Audio.findAll({ where: { tipo_meditacion: tipo } });
  
        if(audios.length === 0){
          return res.status(404).json({error: "El tipo de meditación buscado no existe"})
        }
        
        return res.status(200).json({message: audios}) 
    }catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  },

  obtenerTodos: async (req, res) => {
    try {
      const audios = await Audio.findAll()
      return res.status(200).json({message: audios}) 
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  },

  obtenerPorTipo: async (req, res) => {
    try {
        const tipo = req.params.tipo
        const audios = await Audio.findAll({ where: { tipo_meditacion: tipo } });

        if(audios.length === 0){
          return res.status(404).json({error: "El tipo de meditación buscado no existe"})
        }
        
        return res.status(200).json({message: audios}) 
    }catch (error) {
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
  
      const nombreAudio = await Audio.findByPk(id);
      if (!Audio) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
  
      await Audio.destroy({ where: { id_audio: id } });
  
      return res.status(200).json({ message: "Audio borrado", data: usuario});
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  }
}

export default audiosController;