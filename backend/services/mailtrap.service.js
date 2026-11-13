import { MailtrapClient } from 'mailtrap'

const TOKEN = process.env.MAILTRAP_SANDBOX_ID

const client = new MailtrapClient({
  token: TOKEN,
  sandbox: true,
  testInboxId: 5021285,
})

const mailtrapSenderEmail = async datos => {
  const { email, nombre, token } = datos

  try {
    const sender = {
      email: 'wjuma19dev2026@gmail.com',
      name: 'VPA administrador de Veterinario y Pacientes',
    }
    const recipients = [
      {
        email,
      },
    ]

    const htmlContent = `
      <p>Hola ${nombre}!, comprueba tu cuenta en APV</p>
      <p>
        Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}">Comprobar Cuenta</a>
      </p>
      <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
  `

    const info = await client.send({
      from: sender,
      to: recipients,
      subject: 'Comprueba tu cuenta!',
      text: 'Gracias por registrarte.!',
      html: htmlContent,
    })

    console.log('Mensaje enviado: %s', info.message_ids)
  } catch (err) {
    console.log(err)
  }
}

export default mailtrapSenderEmail
