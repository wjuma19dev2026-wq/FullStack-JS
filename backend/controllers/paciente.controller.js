// @ts-check
/** @typedef { import('../types/paciente.type.js').Paciente } Paciente */
/** @typedef { import('../types/veterinario.type.js').Veterinario } Veterinario */

//- Imports
import { Paciente } from '../models/index.js'
import { AppError, ValidationError } from '../utils/AppError.js'

/**
 * Obtener Listado de Pacientes
 * @param { import('express').Request } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */
export const obtenerPacientes = (req, res, next) => {
  res.status(200).json({ message: 'todosLosPacientes' })
}

/**
 * Registrar un paciente
 * @param { import('express').Request<{}, {}, import('../types/paciente.type.js').Paciente> & {veterinario?: Veterinario} } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */
export const registrarPaciente = async (req, res, next) => {
  if (
    !req.body ||
    typeof req.body !== 'object' ||
    Object.keys(req.body).length === 0
  ) {
    const validationError = new ValidationError(
      'El cuerpo de la petición está vacío o no es válido',
    )
    return next(validationError)
  }
  try {
    const paciente = new Paciente(req.body)
    paciente.veterinario = req.veterinario?._id
    const pacienteAlmacenado = await paciente.save()

    return res
      .status(200)
      .json({ message: 'Paciente creado!.', paciente: pacienteAlmacenado })
  } catch (err) {
    if (err instanceof Error) {
      const appError = new AppError(err.message, 500)
      return next(appError)
    }
  }
}
