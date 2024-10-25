import jwt from "jsonwebtoken";
import {config} from "dotenv";
config();

const verificarToken = (req, res, next) => {
  const token = req.cookies.token || req.cookies.token_login || req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Acceso denegado. Token no proporcionado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.usuario = decoded;
    console.log(req.usuario)

    next();
  } catch (error) {
    return res.status(403).json({ error: "Token no válido o expirado." });
  }
};

export default verificarToken;
