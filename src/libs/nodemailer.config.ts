import nodemailer, { Transporter } from 'nodemailer';

const transporterOptions = {
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.CORREO_GMAIL,
    pass: process.env.CONTRASENA_GMAIL,
  },
  tls: {
    rejectUnauthorized: true,
  },
};

const transporter: Transporter = nodemailer.createTransport(transporterOptions);

export default transporter;
