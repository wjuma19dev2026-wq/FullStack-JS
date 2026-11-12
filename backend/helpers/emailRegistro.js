import { transporter } from '../services/index.js'

const emailRegistro = async datos => {
  const { nombre, email, token } = datos

  try {
    const info = await transporter.sendMail({
      from: 'APV - Administrador de Pacientes de Veterinaria',
      to: email,
      subject: 'Comprueba tu cuenta',
      text: 'Comprueba tu cuenta',
      html: `
      <p>Hola ${nombre}!, comprueba tu cuenta en APV</p>
      <p>
        Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}">Comprobar Cuenta</a>
      </p>
      <p>Si tu no creaste esta cuenta, puedes ignorar este mensaje</p>
    `,
    })

    console.log('Mensaje enviado: %s', info.messageId)
  } catch (err) {
    console.log(err)
  }
}

export default emailRegistro
