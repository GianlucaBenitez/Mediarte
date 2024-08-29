// Importamos modelo de Guardado
const Guardado = require('../models/Guardados.js');

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
  }
}

module.exports = guardadosController;