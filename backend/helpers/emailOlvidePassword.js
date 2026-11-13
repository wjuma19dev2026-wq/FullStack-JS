import { clientSendMailtrap } from '../mailtrap/client-send.mailtrp.js'

/**
 * Envía un correo electrónico para recuperar la contraseña del usuario.
 *
 * @async
 * @param {Object} params - Datos necesarios para crear el correo de recuperación.
 * @param {string} params.token - Token de recuperación de contraseña.
 * @param {string} params.email - Correo electrónico del usuario destinatario.
 * @param {string} params.nombre - Nombre del usuario destinatario.
 * @returns {Promise<string>} Mensaje de confirmación con la respuesta del envío.
 */
const emailOlvidePassword = async ({ token, email, nombre }) => {
  // sender, recipients, subject, text, html,

  const sender = {
    email: 'wjuma19dev2026@gmail.com',
    name: 'VPA administrador de Veterinario y Pacientes',
  }

  const recipients = [
    {
      email,
      name: nombre,
    },
  ]

  const subject = 'Reestablece tu contraseña'
  const text = 'Reestablece tu contraseña'

  const html = `
      <p>Hola ${nombre}!, has solicitado reestablecer contraseña.</p>
      <p>
        Sigue el siguiente enlace para generar un nuevo password,
        <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablece password</a>
      </p>
      <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
  `

  const results = await clientSendMailtrap({
    html,
    recipients,
    sender,
    subject,
    text,
  })

  return `Mensaje enviado: ${results.message_ids}`
}

export default emailOlvidePassword
