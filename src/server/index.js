import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
    cors({
      credentials: true,
      origin: "https://mediarte.vercel.app",
      //origin: "http://localhost:5501",
      methods: "GET,OPTIONS,PUT,PATCH,POST,DELETE",
    })
  );

app.listen(3000, () => {
 console.log("La app funciona")
})

// Referencia a las rutas

import usuarios from "./routes/usuarios.js";
app.use("/usuarios", usuarios)

import audios from "./routes/audios.js";
app.use("/audios", audios)

import guardados from "./routes/guardados.js";
app.use("/guardados", guardados)

// Menu de inicio

app.get("/", (req, res) =>{
 res.send("Este es el menú principal de Mediarte")
})