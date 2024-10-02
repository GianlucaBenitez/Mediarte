// Importamos modelo de Usuario
import Usuario from "../models/Usuario.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import transporter from "../config/nodemailer.js";
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
        const { nombre, email, contrasena, confirmarContrasena } = req.body;

        const errores = [];

        // Validaciones
    
        // Validaciones nombres
        if (!nombre) {
          errores.push("Nombre no puede estar vacío");
        }else{
          if (nombre.length < 5 || nombre.length > 25) {
            errores.push("Nombre debe tener entre 5 y 25 caracteres");
          }
          if (nombre && !/^[A-Za-z]+$/.test(nombre)) {
            errores.push("Nombre solo puede contener letras");
          }
        }

        // Validación Email
        if (!email) {
          errores.push("Email no puede estar vacío");
        } else if (!emailregex.test(email)) {
          errores.push("Email inválido");
        }

        // Validaciones de contraseña
        if (!contrasena) {
          errores.push("Contraseña no puede estar vacía");
        } else {
          if (contrasena.length < 8) {
            errores.push("Contraseña debe tener al menos 8 caracteres");
          }
          if (!/[A-Z]/.test(contrasena)) {
            errores.push("Contraseña debe contener al menos una letra mayúscula");
          }
          if (!/[a-z]/.test(contrasena)) {
            errores.push("Contraseña debe contener al menos una letra minúscula");
          }
          if (!/\d/.test(contrasena)) {
            errores.push("Contraseña debe contener al menos un número");
          }
          if (!/[!@#$%^&*.,:;?+=\-*/=%&^_~|\\()[\]{}"']/.test(contrasena)) {
            errores.push("Contraseña debe contener al menos un carácter especial");
          }
        }

        // Validaciones Confirmar Contraseña
        if (!confirmarContrasena) {
          errores.push("Confirmar Contraseña no puede estar vacío");
        } else if (contrasena !== confirmarContrasena) {
          errores.push("Contraseñas no coinciden");
        }

        const emailEnUso = await Usuario.findOne({ where: { email: email } });
        if (emailEnUso) {
          return res.status(409).json({ error: "Email ya está en uso" });
        }

        if (errores.length > 0) {
          return res.status(400).json({ error: errores });
        }

        const contrasenaHasheada = await bcrypt.hash(contrasena, salt)
        
        const usuarioNuevo = await Usuario.create({ 
          nombre: nombre, email: email, contrasena: contrasenaHasheada 
        });
        usuarioNuevo.save();

        const usuarioData = usuarioNuevo.toJSON();
        delete usuarioData.contrasena;

        await transporter.sendMail({
          from: '"Mediarte" <mediarte2024@gmail.com>',
          to: usuarioNuevo.email, 
          subject: "Bienvenido a Mediarte ⋆౨ৎ˚⟡˖",
          html: `
          Muchas gracias ${usuarioNuevo.nombre} por registrarte en <b>Mediarte</b>
          `,
        }, (error, info) => {
          if (error) {
            console.error("Error al enviar el correo:", error); // Imprimir el error exacto
            return res.status(500).json({ error: "Error al enviar el correo" });
          } else {
            console.log("Correo enviado: ", info.response);
          }
        });
    
        return res.status(200).json({
          message: "Usuario creado!",
          data: usuarioData
        })
    
      } catch (error) {
        console.log(error);
        return res.status(500).json({error: "Internal Server Error"})
      }
    },

  login: async (req, res) => {
    try {
      const { email, contrasena } = req.body;

      if (!email) {
        return res.status(401).json({error: "Campo Email no puede estar vacio"})
      }
      if (!contrasena) {
        return res.status(401).json({error: "Campo Contrasena no puede estar vacio"})
      }

      let usuario = await Usuario.findOne({where: {email}});
      if (!usuario) {
        usuario = {contrasena: "123ñ"} // No pasa el regex, por lo cual nadie puede tener estar contraseña
      }

      const contrasenaCorrecta = bcrypt.compareSync(contrasena, usuario.contrasena);
      if (!contrasenaCorrecta) {
        return res.status(404).json({error:"Contraseña o Usuario incorrectos"});
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

      const usuarioData = usuario.toJSON();
      delete usuarioData.contrasena;
  
      return res.status(200).json({ message: "Usuario actualizado exitosamente", data: usuarioData});
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