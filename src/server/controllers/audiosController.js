// Importamos modelo de Audio
import Audio from '../models/Audio.js';
import cloudinary from "../config/cloudinary.js";

const subirACloudinary = async (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: "File not found" });
  }

  const fName = file.originalname.split(".")[0];

  try {
    const audio = await cloudinary.uploader.upload(file.path, {
      resource_type: "video",
      public_id: `audios/${fName}`,
      format: 'mp3', 
      transformation: [
        { quality: 'auto:low', audio_codec: 'mp3', audio_bitrate: '96k' }
      ]
    });

    return audio;
  } catch (error) {
    console.log(error);
    return res.status(400).json({error: "Internal Server Error"});
  }
};

const borrarDeCloudinary = async (url_audio) => {
  try {
    const urlArray = url_audio.split('/');
    const nombreArchivo = urlArray[urlArray.length - 1].split('.')[0];
    const publicId = `audios/${nombreArchivo}`;

    await cloudinary.uploader.destroy(publicId, { resource_type: 'video' });

  } catch (error) {
    console.log(error);
    return res.status(500).json({error: "Internal Server Error"})
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

  obtenerPorId: async (req, res) => {
    try {
      const {id_audio} = req.params
      const audio = await Audio.findByPk(id_audio);

      if(!audio){
        return res.status(404).json({ error: "El audio buscado no existe" })
      }
        
      return res.status(200).json({message: audio}) 
    }catch (error) {
      console.log(error);
      return res.status(500).json({error: "Internal Server Error"})
    }
  },

  crear: async (req, res) => {
    try {
      if(req.usuario.rol !== "admin"){
        return res.status(401).json({error: "Debes de ser un admin"}) 
      }

      if (req.fileValidationError) {
        return res
          .status(400)
          .json({ error: req.fileValidationError });
      }

      const audio = await subirACloudinary(req, res);

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
      console.log(error)
      return res.status(500).json({error: "Internal Server Error"})
    }
  },

  actualizar: async (req, res) => {
    try {
      if(req.usuario.rol !== "admin"){
        return res.status(401).json({error: "Debes de ser un admin"}) 
      }

      const { nombre_audio, tipo_meditacion } = req.body;
      const {id_audio} = req.params;
      const file = req.file;
      let url_audio;

      const audio = await Audio.findByPk(id_audio)

      if (!audio) {
        return res.status(404).json({ error: "Audio no encontrado" });
      }

      if(!nombre_audio || nombre_audio.length > 50){
        return res.status(401).json({ error: "Nombre del audio inválido" });
      }
      if(!tipo_meditacion || nombre_audio.length > 50){
        return res.status(401).json({ error: "Tipo del audio inválido" });
      }
      if (req.fileValidationError) {
        return res
          .status(400)
          .json({ error: req.fileValidationError });
      }

      if(file){
        borrarDeCloudinary(audio.url_audio)
        const audioNuevo = await subirACloudinary(req, res);
        url_audio = audioNuevo.secure_url;
        audio.cant_reprod = 0;
      }else{
        url_audio = audio.url_audio;
      }

      audio.nombre_audio = nombre_audio;
      audio.tipo_meditacion = tipo_meditacion;
      audio.url_audio = url_audio;
  
      await audio.save();
  
      return res.status(200).json({ message: "Audio actualizado exitosamente", data: audio});
    } catch (error) {
      console.log(error)
      return res.status(500).json({error: "Internal Server Error"})
    }
  },

  actualizarReproducciones : async (req, res) => {
    try {
      const {id_audio} = req.params;

      const audio = await Audio.findByPk(id_audio)

      if (!audio) {
        return res.status(404).json({ error: "Audio no encontrado" });
      }

      audio.cant_reprod += 1; 

      await audio.save();
      return res.status(200).json({ message: "Audio actualizado exitosamente", data: audio});
    } catch (error) {
      console.log(error)
      return res.status(500).json({error: "Internal Server Error"})
    }
  },
  
  borrar: async (req, res) => {
    try {
      if(req.usuario.rol !== "admin"){
        return res.status(401).json({error: "Debes de ser un admin"}) 
      }

      const {id_audio} = req.params;
  
      const audio = await Audio.findByPk(id_audio);

      if (!audio) {
        return res.status(404).json({ error: "audio no encontrado" });
      }

      const audioBorrado = audio;
      
      borrarDeCloudinary(audio.url_audio);
      await Audio.destroy({ where: { id_audio } });
  
      return res.status(200).json({ message: "Audio borrado", data: audioBorrado});
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  }
}


export default audiosController;