import nodemailer from 'nodemailer'

// 1. Crear el transporter
const transporter = nodemailer.createTransport({
  host: process.env.GOOGLE_EMAIL_HOST,
  port: process.env.GOOGLE_EMAIL_PORT, // Puerto para STARTTLS
  secure: false, // 'false' porque el puerto 587 inicia la conexión sin cifrar y luego la actualiza a TLS
  auth: {
    user: process.env.GOOGLE_EMAIL_USER, // Tu dirección de Gmail
    pass: process.env.GOOGLE_EMAIL_PASS, // La Contraseña de Aplicación de 16 caracteres
  },
})

export default transporter
