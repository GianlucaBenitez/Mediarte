// Importamos modelo de Guardado
import Audio from '../models/Audio.js';
import Usuario from '../models/Usuario.js';
import Guardado from '../models/Guardados.js';

// Controlador de guardados
const guardadosController = {
  obtenerTodos: async (req, res) => {
    try {
      const {id_usuario} = req.params;
      const guardados = await Guardado.findAll({ where: {id_usuario} })

      if (guardados.length === 0) {
        return res.status(404).json({ error: "Este usuario no tiene guardados" });
      }
        
      return res.status(200).json({message: "Guardados obtenidos", data:guardados}) 
    } catch (error) {
      console.log(error)
      return res.status(500).json({error: "Internal Server Error"})
    }
  },    

  crear: async (req, res) => {
    try {
      let { id_usuario } = req.params
      let { id_audio } = req.body;

      id_usuario = parseInt(id_usuario)
  
      // Validaciones
      if (!id_usuario || typeof(id_usuario) !== "number") {
        return res.status(401).json({error: "ID de Usuario inválido"})
      }

      if (!id_audio || typeof(id_audio) !== "number") {
        return res.status(401).json({error: "ID de Audio inválido"})
      }

      const usuario = await Usuario.findByPk(id_usuario);
      if(!usuario){
        return res.status(404).json({error: "ID de Usuario no existe"})
      }

      const audio = await Audio.findByPk(id_audio);
      if(!audio){
        return res.status(404).json({error: "ID de Audio no existe"})
      }

      const guardado = await Guardado.findOne({ where: { id_usuario, id_audio } })
      if(guardado){
        return res.status(401).json({error: "Guardado ya existe"})
      }

      const guardadoNuevo = await Guardado.create({ 
        id_usuario,
        id_audio 
      });

      guardadoNuevo.save();
  
      return res.status(200).json({
        message: "Guardado creado!",
        data: guardadoNuevo
      })
  
    } catch (error) {
      console.log(error)
      return res.status(500).json({error: "Internal Server Error"})
    }
  },
  
  borrar: async (req, res) => {
    try {
      const { id_usuario } = req.params
      const { id_audio } = req.body;
  
      const guardado = await Guardado.findOne({ where: { id_usuario, id_audio } })
      if (!guardado) {
        return res.status(404).json({ error: "Guardado no encontrado" });
      }

      const guardadoBorrado = guardado;
      await Guardado.destroy({ where: { id_usuario, id_audio }  });
  
      return res.status(200).json({ message: "Guardado borrado", data: guardadoBorrado});
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: "Internal Server Error"})
    }
  }
}

export default guardadosController;