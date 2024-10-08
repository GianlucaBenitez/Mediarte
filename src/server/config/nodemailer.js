import nodemailer from "nodemailer";
import {config} from "dotenv";
config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "mediarte2024@gmail.com",
      pass: process.env.EMAIL_PASSWORD,
    },
});

export default transporter;