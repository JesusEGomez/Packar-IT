import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  port: 587,
  secure: true,
  debug: true,
  secureConnection: false,
  auth: {
    user: process.env.CORREO_GMAIL,
    pass: process.env.CONTRASENA_GMAIL
  },
  tls:{
    rejectUnauthorized: true
  }
});

export default transporter;
