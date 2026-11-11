import { Types } from 'mongoose'
import { PasswordReset, Veterinario } from '../models/index.js'

import { generateUniqueId, generarJWT } from '../helpers/index.js'
import {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
} from '../utils/index.js'

const postVeterinarios = async (req, res) => {
  //- User already registered
  const { email } = req.body
  const existUser = await Veterinario.findOne({ email })
  if (existUser) {
    const error = new Error('User already registered')
    return res.status(403).json({ error, message: error.message })
  }

  try {
    req.body.token = generateUniqueId()
    const veterinario = new Veterinario(req.body)
    await veterinario.save()
    return res.json({ url: 'Veterinario registrado con exito.' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getVeterinarios = (req, res, next) => {
  try {
    return res.json({
      url: 'Desde API/VETERINARIOS',
      veterinario: req.veterinario,
    })
  } catch (error) {
    const appError = new AppError(error.message, 500)
    return next(appError)
  }
}

const confirmar = async (req, res) => {
  //- Validar Token
  const { token } = req.params
  const veterinario = await Veterinario.findOne({ token })
  if (!veterinario) {
    const error = new Error('Token no valido o ha expirado')
    return res.status(404).json({ message: error.message })
  }

  try {
    veterinario.token = null
    veterinario.confirmado = true
    await veterinario.save()
    return res.json({ veterinario, message: 'Confirmando el token, espere...' })
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const login = async (req, res) => {
  //- Exists Veterinario
  const { email, password } = req.body
  const veterinario = await Veterinario.findOne({ email })
  if (!veterinario) {
    return res.status(404).json({ message: "Veterinario dosn't exists" })
  }

  //- Is Active
  if (!veterinario.confirmado) {
    return res.status(404).json({ message: 'Veterinario no active' })
  }

  //- Credentials Validations
  const comprobarPassword = await veterinario.comprobarPassword(password)
  if (!comprobarPassword) {
    return res.status(404).json({ message: 'Credentials no valid' })
  }

  //- Token Payload
  const payload = {
    id: veterinario._id,
  }
  return res.json({ message: 'Auth ', token: generarJWT(payload) })
}

const getProfile = (req, res) => {
  return res.json({ url: 'Mostrando Perfil de Veterinario' })
}

const postProfile = (req, res) => {
  return res.json({ url: 'Desde API/VETERINARIOS/PROFILE' })
}

export const forgotPassword = async (req, res, next) => {
  const { email } = req.body
  //- Toquen que le vamos a enviar al cliente por correo
  const resetToken = generateUniqueId()
  console.log(resetToken)

  //- Exist veterinario
  const veterinario = await Veterinario.findOne({ email })
  if (!veterinario) {
    const notFoundError = new NotFoundError()
    notFoundError.name = 'INVALID_CREDENTIALS'
    notFoundError.isOperational = false
    return next(notFoundError)
  }

  // If user exists, gen token
  const userId = new Types.ObjectId(veterinario._id)
  const passwordReset = new PasswordReset({ userId })
  passwordReset.tokenHash = PasswordReset.hashToken(resetToken)

  //- Eliminar de la base de datos cualquier otro token que el usuario tenga solicitado previa a esta.
  await PasswordReset.deleteMany({ userId, usedAt: null })

  await passwordReset.save()
  return res.status(200).json({
    message: 'Te hemos enviado un coreeo electronico.',
  })
}

/*
  Method: GET
  Url: localhost://4000/api/veterinarios/forgot-password/:token
  Params: Token
 */
export const forgotPasswordTokenVerify = async (req, res, next) => {
  const { token } = req.params

  //- Token Compare
  const tokenHash = PasswordReset.hashToken(token)
  const tokenDb = await PasswordReset.findOne({ tokenHash, usedAt: null })

  //- TODO: Si no existe el tokenDb devolver error 'INVALID-TOKEN'
  if (!tokenDb) {
    const validationError = new ValidationError()
    validationError.name = 'TOKEN_INVALID'
    validationError.isOperational = false
    return next(validationError)
  }

  const compareToken = tokenDb.compareToken(token)

  //- TODO: Si !compareToken, entonces TOKEN_EXPIRES
  if (!compareToken) {
    const validationError = new ValidationError()
    validationError.name = 'TOKEN_EXPIRED'
    validationError.isOperational = false
    return next(validationError)
  }

  return res.status(200).json({ message: 'forgotPasswordTokenVerify', token })
}

/*
  Method: POST
  Url: localhost://4000/api/veterinarios/forgot-password/:token
  Params: Token
 */
export const forgotPasswordChangePassword = async (req, res, next) => {
  const { password } = req.body
  const { token } = req.params

  //- Token Compare
  const tokenHash = PasswordReset.hashToken(token)
  const tokenDb = await PasswordReset.findOne({ tokenHash, usedAt: null })

  //- TODO: Si no existe el tokenDb devolver error 'INVALID-TOKEN'
  if (!tokenDb) {
    const validationError = new ValidationError()
    validationError.name = 'TOKEN_INVALID'
    validationError.isOperational = false
    return next(validationError)
  }

  //- Setter new password
  const veterinario = await Veterinario.findOne({ _id: tokenDb.userId })
  veterinario.password = password
  await veterinario.save()

  //- Delete tokenDb
  // await tokenDb.deleteOne()

  //- Update tokenDb to usedAt date
  tokenDb.usedAt = Date.now()
  await tokenDb.save()

  res.status(200).json({ message: 'Password changed succesfully!.' })
}

export {
  getVeterinarios,
  postVeterinarios,
  getProfile,
  postProfile,
  confirmar,
  login,
}
