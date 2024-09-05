// Importamos modelo de Audio
import Audio from '../models/Audio.js';
import cloudinary from "../config/cloudinary.js";

const cloudinaryUploader = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "File not found" });
  }

  const fName = file.originalname.split(".")[0];

  try {
    const uploadAudio = await cloudinary.uploader.upload(file.path, {
      resource_type: "raw",
      public_id: `audios/${fName}`,
    });

    return uploadAudio;
  } catch (error) {
    console.log(error);
    return res.status(400).json({error: "Internal Server Error"});
  }
};

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
      if (req.fileValidationError) {
        return res
          .status(400)
          .json({ error: `File validation error: ${req.fileValidationError}` });
      }

      const audio = await cloudinaryUploader(req, res);

      const { nombre_audio, tipo_meditacion } = req.body;
  
      if(!nombre_audio || nombre_audio.length > 50){
        return res.status(401).json({ error: "Nombre del audio inválido" });
      }
      if(!tipo_meditacion || nombre_audio.length > 50){
        return res.status(401).json({ error: "Tipo del audio inválido" });
      }

      const audioNuevo = await Audio.create({ 
        nombre_audio, 
        tipo_meditacion, 
        url_audio: audio.secure_url
      });

      audioNuevo.save();
  
      return res.status(200).json({
        message: "Audio creado!",
        data: audioNuevo
      })
  
    } catch (error) {
      return res.status(500).json({error: error.message})
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