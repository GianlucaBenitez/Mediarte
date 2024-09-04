// Importamos modelo de Guardado
import Audio from '../models/Audio.js';
import Guardado from '../models/Guardados.js';

// Controlador de guardados
const guardadosController = {
  obtener: async (req, res) => {
    try {
      const {id_usuario} = req.params;
      const guardados = await Guardado.findAll({where: id_usuario})

      if (!guardados) {
        return res.status(404).json({ error: "Guardados no encontrado" });
      }
        
      return res.status(200).json({message: guardados}) 
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  },    

  crear: async (req, res) => {
    try {
      const { id_audio } = req.body;
      const { id_usuario } = req.params;

      const guardadoNuevo = await Guardado.create({ 
        id_audio,
        id_usuario
      });

      guardadoNuevo.save();
  
      return res.status(200).json({
        message: "guardado creado!",
        data: guardadoNuevo
      })
  
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  },
  
  borrar: async (req, res) => {
    try {
      const {id_guardado} = req.params;
  
      const guardado = await Guardado.findByPk(id_guardado);

      if (!guardado) {
        return res.status(404).json({ error: "Guardado no encontrado" });
      }

      const guardadoBorrado = guardado;
  
      await guardado.destroy({ where: id_guardado });
  
      return res.status(200).json({ message: "Guardado borrado", data: guardadoBorrado});
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  }
}

export default guardadosController;