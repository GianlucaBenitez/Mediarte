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
        const {tipo} = req.params
        const audios = await Audio.findAll({ where: { tipo_meditacion: tipo } });
  
        if(audios.length === 0){
          return res.status(404).json({ error: "El tipo de meditación buscado no existe" })
        }
        
        return res.status(200).json({message: audios}) 
    }catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  },

  crear: async (req, res) => {
    try {
      const { nombre_audio, tipo_meditacion, url_audio } = req.body;
  
      if(!nombre_audio || nombre_audio.length > 50){
        return res.status(401).json({ error: "Nombre del audio inválido" });
      }
      if(!tipo_meditacion || nombre_audio.length > 50){
        return res.status(401).json({ error: "Tipo del audio inválido" });
      }
      if(!url_audio){
        return res.status(401).json({ error: "url del audio inválido" });
      }
  
      const audioNuevo = await Usuario.create({ 
        nombre_audio, 
        tipo_meditacion, 
        url_audio
      });

      audioNuevo.save();
  
      return res.status(200).json({
        message: "Audio creado!",
        data: audioNuevo
      })
  
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  },

  actualizar: async (req, res) => {
    try {
      const { nombre_audio, tipo_meditacion, url_audio } = req.body;
      const {id} = req.params;

      const audio = Audio.findByPk(id)

      if (!audio) {
        return res.status(404).json({ error: "Audio no encontrado" });
      }

      if(!nombre_audio || nombre_audio.length > 50){
        return res.status(401).json({ error: "Nombre del audio inválido" });
      }
      if(!tipo_meditacion || nombre_audio.length > 50){
        return res.status(401).json({ error: "Tipo del audio inválido" });
      }
      if(!url_audio){
        return res.status(401).json({ error: "url del audio inválido" });
      }

      audio.nombre_audio = nombre_audio;
      audio.tipo_meditacion = tipo_meditacion;
      audio.url_audio = url_audio;
  
      await audio.save();
  
      return res.status(200).json({ message: "Audio  actualizado exitosamente", data: audio});
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  },
  
  borrar: async (req, res) => {
    try {
      const {id} = req.params;
  
      const audio = await Audio.findByPk(id);

      if (!audio) {
        return res.status(404).json({ error: "audio no encontrado" });
      }

      const audioBorrado = audio;
  
      await Audio.destroy({ where: { id_audio: id } });
  
      return res.status(200).json({ message: "Audio borrado", data: audioBorrado});
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  }
}

export default audiosController;