// @ts-check
/** @typedef { import('../types/paciente.type.js').Paciente } Paciente */
/** @typedef { import('../types/veterinario.type.js').Veterinario } Veterinario */

//- Imports
import { Paciente } from '../models/index.js'
import { AppError, ValidationError, UnauthorizedError, NotFoundError } from '../utils/AppError.js'

/**
 * Obtener Listado de Pacientes
 * @param { import('express').Request & {veterinario?: Veterinario} } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 * @returns { Promise<Record<string, any>> }
 */
export const obtenerPacientes = async (req, res, next) => {
  const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario)

  return res.status(200).json({ pacientes })
}

/**
 * Registrar un paciente
 * @param { import('express').Request<{}, {}, import('../types/paciente.type.js').Paciente> & {veterinario?: Veterinario} } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */
export const registrarPaciente = async (req, res, next) => {
  if (!req.body || typeof req.body !== 'object' || Object.keys(req.body).length === 0) {
    const validationError = new ValidationError(
      'El cuerpo de la petición está vacío o no es válido',
    )
    return next(validationError)
  }
  try {
    const paciente = new Paciente(req.body)
    paciente.veterinario = req.veterinario?._id
    const pacienteAlmacenado = await paciente.save()

    return res.status(200).json({ message: 'Paciente creado!.', paciente: pacienteAlmacenado })
  } catch (err) {
    if (err instanceof Error) {
      const appError = new AppError(err.message, 500)
      return next(appError)
    }
  }
}

/**
 * Obtener Listado de Pacientes
 * @param { import('express').Request<{ pacienteId: string }, {}, > & {veterinario?: Veterinario} } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */
export const obtenerPaciente = async (req, res, next) => {
  const { pacienteId } = req.params
  const veterinarioId = req.veterinario?._id

  const paciente_db = await Paciente.findById(pacienteId)

  if (!paciente_db) {
    const notFoundError = new NotFoundError()
    notFoundError.isOperational = false
    return next(notFoundError)
  }

  if (veterinarioId?.toString() !== paciente_db.veterinario.toString()) {
    const unauthorizedError = new UnauthorizedError()
    unauthorizedError.isOperational = false
    return next(unauthorizedError)
  }

  res.status(200).json({ paciente: paciente_db })
}
