import { mailtrapClient } from './client.mailtrap.js'

/**
 * Envía un correo electrónico usando Mailtrap.
 *
 * @async
 * @param {Object} params - Datos del correo a enviar.
 * @param {string} params.sender - Dirección de correo del remitente.
 * @param {string|string[]} params.recipients - Dirección o lista de destinatarios.
 * @param {string} params.subject - Asunto del correo.
 * @param {string} params.text - Versión de texto plano del correo.
 * @param {string} params.html - Versión HTML del correo.
 * @returns {Promise<Object>} Resultado devuelto por Mailtrap.
 * @returns {boolean} result.success - Indica si el envío fue exitoso.
 * @returns {string[]} result.message_ids - Identificadores de los mensajes enviados.
 */
export const clientSendMailtrap = async ({
  sender,
  recipients,
  subject,
  text,
  html,
}) => {
  // Servicio de mailtrap
  const results = await mailtrapClient.send({
    from: sender,
    to: recipients,
    subject,
    text,
    html,
  })

  return results
}
