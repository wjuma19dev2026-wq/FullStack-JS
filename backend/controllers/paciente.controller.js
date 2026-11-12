// @ts-check
/** @typedef { import('../types/paciente.type.js').Paciente } Paciente */
/** @typedef { import('../types/veterinario.type.js').Veterinario } Veterinario */

//- Imports
import { Paciente } from '../models/index.js'
import { ValidationError, UnauthorizedError, NotFoundError } from '../utils/AppError.js'

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
    throw validationError
  }
  try {
    const paciente = new Paciente(req.body)
    paciente.veterinario = req.veterinario?._id
    const pacienteAlmacenado = await paciente.save()

    if (!pacienteAlmacenado) {
      const notFoundError = new NotFoundError()
      notFoundError.isOperational = false
      throw notFoundError
    }

    return res.status(200).json({ message: 'Paciente creado!.', paciente: pacienteAlmacenado })
  } catch (err) {
    next(err)
  }
}

/**
 * Obtener un paciente por pacienteId
 * @param { import('express').Request<{ pacienteId: string }, {}, > & {veterinario?: Veterinario} } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */
export const obtenerPaciente = async (req, res, next) => {
  const { pacienteId } = req.params
  const veterinarioId = req.veterinario?._id

  try {
    const paciente_db = await Paciente.findById(pacienteId)

    if (!paciente_db) {
      const notFoundError = new NotFoundError()
      notFoundError.isOperational = false
      throw notFoundError
    }

    if (veterinarioId?.toString() !== paciente_db.veterinario.toString()) {
      const unauthorizedError = new UnauthorizedError()
      unauthorizedError.isOperational = false
      throw unauthorizedError
    }

    return res.status(200).json({ paciente: paciente_db })
  } catch (err) {
    return next(err)
  }
}

/**
 * Actualiza un pacientes de la base de datos
 * @param { import('express').Request<{ pacienteId: string }, {}, import('../types/paciente.type.js').Paciente > & {veterinario?: Veterinario} } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */
export const actualizarPaciente = async (req, res, next) => {
  const { pacienteId } = req.params
  const { nombre } = req.body
  const veterinarioId = req.veterinario?._id

  try {
    const paciente_db = await Paciente.findById(pacienteId)

    if (!paciente_db) {
      const notFoundError = new NotFoundError()
      notFoundError.isOperational = false
      throw notFoundError
    }

    if (veterinarioId?.toString() !== paciente_db.veterinario.toString()) {
      const unauthorizedError = new UnauthorizedError()
      unauthorizedError.isOperational = false
      throw unauthorizedError
    }

    //- Modificar paciente y guardarlo en la db
    paciente_db.nombre = nombre
    await paciente_db.save()

    res.status(200).json({ message: 'Paciente actualizado exitosamente.' })
  } catch (err) {
    next(err)
  }
}

/**
 * Elimina un pacientes de la base de datos
 * @param { import('express').Request<{ pacienteId: string }, {}, > & {veterinario?: Veterinario} } req
 * @param { import('express').Response } res
 * @param { import('express').NextFunction } next
 */
export const eliminarPaciente = async (req, res, next) => {
  const { pacienteId } = req.params
  const veterinarioId = req.veterinario?._id

  try {
    const paciente_db = await Paciente.findById(pacienteId)

    if (!paciente_db) {
      const notFoundError = new NotFoundError()
      notFoundError.isOperational = false
      throw notFoundError
    }

    if (veterinarioId?.toString() !== paciente_db.veterinario.toString()) {
      const unauthorizedError = new UnauthorizedError()
      unauthorizedError.isOperational = false
      throw unauthorizedError
    }

    //- Eliminar paciente
    await paciente_db.deleteOne()

    res.status(200).json({ message: 'Paciente eliminado exitosamente.' })
  } catch (err) {
    next(err)
  }
}
