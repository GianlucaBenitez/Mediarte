import transporter from "../config/nodemailer.js";

const enviarMail = async (correo, titulo, html) => {
    try {
      let mail = await transporter.sendMail({
        from: '"Mediarte" <mediarte2024@gmail.com>',
        to: correo,
        subject: titulo,
        html: html,
      });
      return mail;
    } catch (error) {
      console.log(error);
      return res.status(500).json({error: "Error al enviar el mail"})
    }
};

export default enviarMail;