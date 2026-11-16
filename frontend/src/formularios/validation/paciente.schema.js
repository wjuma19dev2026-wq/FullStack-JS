import { z } from 'zod'
import { TodayStr } from '../../admin/helpers'

const pacienteSchema = z.object({
  mascota: z
    .string()
    .trim()
    .min(2, 'minimo 2 caracteres')
    .max(40, 'maximo 40 caracteres')
    .describe('nombre de la mascota'),
})

/**
 * Tipo **inferido automáticamente** desde {@link pacienteSchema}
 * gracias a `z.infer`. Si cambias una regla del esquema, este tipo
 * se actualiza solo. No lo escribas a mano.
 * @typedef {import('zod').infer<typeof pacienteSchema>} PacienteForm
 */

/**
 * Resultado de una validación exitosa del esquema.
 * @typedef {import('zod').SafeParseSuccess<PacienteForm>} PacienteParseOk
 */

/**
 * Resultado de una validación fallida del esquema.
 * @typedef {import('zod').SafeParseError<PacienteForm>} PacienteParseError
 */

export default pacienteSchema
