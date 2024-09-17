// Importamos modelo de Usuario
import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {config} from "dotenv";
config();
const salt = Number(process.env.SALT)

// Creamos los Regex para las validaciones
const emailregex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
const contrasenaregex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*.,:;?+=\-*/=%&^_~|\\()[\]{}"'])[A-Za-z\d!@#$%^&*.,:;?+=\-*/=%&^_~|\\()[\]{}"']{8,}$/;
const usuarioregex = /^[A-Za-z\d]{5,}$/;

// Controlador de usuarios
const usuariosController = {
  obtenerTodos: async (req, res) => {
    try {
      if(req.usuario.rol !== "admin"){
        return res.status(401).json({error: "Debes de ser un admin"}) 
      }

      const usuarios = await Usuario.findAll()
      return res.status(200).json({message: "Usuarios obtenidos", data: usuarios}) 
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  },
  
  obtener: async (req, res) => {
      try {
        const {id} = req.params;
        const usuario = await Usuario.findByPk(id)
        
        if(!usuario){
          return res.status(404).json({error: "Usuario no existe"})
        }
  
        return res.status(200).json({message: "Usuario obtenido", data: usuario}) 
      } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal Server Error"})
      }
  },
  
  registro: async (req, res) => {
    try {
      const { nombre, email, contrasena, confirmarContrasena } = req.body
  
      // Validaciones
      if (!nombre || !usuarioregex.test(nombre)) {
        return res.status(401).json({error: "Nombre inválido"})
      }
      if (!email || !emailregex.test(email)) {
        return res.status(401).json({error: "Email inválido"})
      }
      if (!contrasena || !contrasenaregex.test(contrasena)) {
        return res.status(401).json({error: "Contrasena inválido"})
      }
      if (!confirmarContrasena){
        return res.status(401).json({error: "El campo confirmar contrasena no puede estar vacio"})
      }
      if (contrasena !== confirmarContrasena) {
        return res.status(400).json(["Las contraseñas no coinciden"]);
      }
  
      const emailEnUso = await Usuario.findOne({ where: { email: email } });
      if (emailEnUso) {
        return res.status(409).json({ error: "Email ya está en uso" });
      }

      const contrasenaHasheada = await bcrypt.hash(contrasena, salt)
  
      const usuarioNuevo = await Usuario.create({ 
        nombre: nombre, email: email, contrasena: contrasenaHasheada 
      });
      usuarioNuevo.save();
  
      return res.status(200).json({
        message: "Usuario creado!",
        data: usuarioNuevo
      })
  
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  },

  login: async (req, res) => {
    try {
      const { email, contrasena } = req.body;

      if (!email || !emailregex.test(email)) {
        return res.status(401).json({error: "Email inválido"})
      }
      if (!contrasena || !contrasenaregex.test(contrasena)) {
        return res.status(401).json({error: "Contrasena inválido"})
      }

      const usuario = await Usuario.findOne({where: {email}});
      if (!usuario) {
        return res.status(401).json({error:"El usuario no existe"});
      }

      const contrasenaCorrecta = bcrypt.compareSync(contrasena, usuario.contrasena);
      if (!contrasenaCorrecta) {
        return res.status(404).json({error:"Contraseña incorrecta"});
      }

      const usuarioToken = usuario.toJSON();
      delete usuarioToken.contrasena;

      const token = jwt.sign(usuarioToken, process.env.SECRET_KEY, {expiresIn: "1h"});

      res.cookie("token",token,{
        httpOnly: true,
        // secure: true,
        sameSite: "none",
      })

      return res.status(200).json({message: "Login exitoso", data: {usuarioToken, token}})
  
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: "Internal Server Error"})
    }
  },

  logout: async (req, res) => {
    try {
      res.clearCookie("token");

      return res.status(200).json({ message: "Usuario deslogueado exitosamente"});
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: "Internal Server Error"})
    }
  },
  
  actualizar: async (req, res) => {
    try {
      const { nombre, email, contrasena } = req.body;
      const {id} = req.params;
  
      // Validaciones
      if (!nombre || !usuarioregex.test(nombre)) {
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

      const contrasenaHasheada = await bcrypt.hash(contrasena, salt)
  
      usuario.nombre = nombre;
      usuario.email = email;
      usuario.contrasena = contrasenaHasheada;
      
      await usuario.save();
  
      return res.status(200).json({ message: "Usuario actualizado exitosamente", data: usuario});
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: "Internal Server Error"})
    }
  },
  
  borrar: async (req, res) => {
    try {
      const id = req.params.id;
  
      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ error: "Usuario no encontrado" });
      }
  
      await Usuario.destroy({ where: { id_usuario: id } });
      res.clearCookie("token");
  
      return res.status(200).json({ message: "Usuario borrado", data: usuario});
    } catch (error) {
      return res.status(500).json({error: "Internal Server Error"})
    }
  }
}

export default usuariosController;