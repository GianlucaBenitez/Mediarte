// Importamos modelo de Audio
const Audio = require('../models/Audio.js');

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
  }
}

module.exports = audiosController;