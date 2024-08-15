// Importamos modelo de Usuario
const Usuario = require('../models/Usuario.js');

// Creamos los Regex para las validaciones
const emailregex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
const contrasenaregex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/

// Controlador de usuarios
const menu = async (req, res) => {
    try {
      res.send("Menu de Usuarios");
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
}

const configuracion = async (req, res) => {
    try {
      res.send("Menú de configuraciones");
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
}

const ayuda = async (req, res) => {
    try {
      res.send("Menú de ayuda");
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
}

const obtenerTodos = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll()
    return res.status(200).json({message: usuarios}) 
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const obtener = async (req, res) => {
    try {
      const id = req.params.id;
      const usuario = await Usuario.findByPk(id)
      
      if(!usuario){
        return res.status(404).json({error: "Usuario no existe"})
      }

      return res.status(200).json({message: usuario}) 
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
}

const crear = async (req, res) => {
  try {
    const { nombre, email, contrasena } = req.body

    // Validaciones
    if (!nombre || nombre.length < 5) {
      return res.status(401).json({error: "Nombre inválido"})
    }
    if (!email || !emailregex.test(email)) {
      return res.status(401).json({error: "Email inválido"})
    }
    if (!contrasena || !contrasenaregex.test(contrasena)) {
      return res.status(401).json({error: "Contrasena inválido"})
    }

    const emailEnUso = await Usuario.findOne({ where: { email: email } });
    if (emailEnUso) {
      return res.status(409).json({ error: "Email ya está en uso" });
    }

    const usuarioNuevo = await Usuario.create({ 
      nombre: nombre, email: email, contrasena: contrasena 
    });
    usuarioNuevo.save();

    return res.status(200).json({
      message: "Usuario creado!",
      data: usuarioNuevo
    })

  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const actualizar = async (req, res) => {
  try {
    const { nombre, email, contrasena } = req.body;
    const id = req.params.id;

    // Validaciones
    if (!nombre || nombre.length < 5) {
      return res.status(401).json({ error: "Nombre inválido" });
    }
    if (!email || !emailregex.test(email)) {
      return res.status(401).json({ error: "Email inválido" });
    }
    if (!contrasena || !contrasenaregex.test(contrasena)) {
      return res.status(401).json({ error: "Contrasena inválida" });
    }

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const emailEnUso = await Usuario.findOne({ where: { email: email } });
    if (emailEnUso && emailEnUso.id_usuario != id) {
      return res.status(409).json({ error: "Email ya está en uso" });
    }

    usuario.nombre = nombre;
    usuario.email = email;
    usuario.contrasena = contrasena;
    
    await usuario.save();

    return res.status(200).json({ message: "Usuario actualizado exitosamente", data: usuario});
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

const borrar = async (req, res) => {
  try {
    const id = req.params.id;

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await Usuario.destroy({ where: { id_usuario: id } });

    return res.status(200).json({ message: "Usuario borrado", data: usuario});
  } catch (error) {
    return res.status(500).json({error: "Internal Server Error"})
  }
}

module.exports = {
    menu,
    obtener,
    configuracion,
    ayuda,
    obtenerTodos,
    crear,
    actualizar,
    borrar
}