import { Types } from 'mongoose'
import { PasswordReset, Veterinario } from '../models/index.js'
import { mailtrapSenderEmail } from '../services/index.js'
import {
  generateUniqueId,
  generarJWT,
  emailOlvidePassword,
} from '../helpers/index.js'
import {
  AppError,
  NotFoundError,
  ValidationError,
  UnauthorizedError,
} from '../utils/index.js'
import { mailtrapClient } from '../mailtrap/client.mailtrap.js'

const postVeterinarios = async (req, res, next) => {
  const { email, nombre } = req.body

  const existUser = await Veterinario.findOne({ email })
  if (existUser) {
    const validationError = new ValidationError()
    validationError.name = 'CONFLICT'
    validationError.isOperational = false
    throw validationError
  }

  try {
    req.body.token = generateUniqueId()
    const veterinario = new Veterinario(req.body)
    await veterinario.save()

    // ENVIAR CORREO DE VERIFICACION
    // emailRegistro({
    //   email,
    //   nombre,
    //   token: veterinario.token,
    // })
    mailtrapSenderEmail({
      email,
      nombre,
      token: veterinario.token,
    })

    return res
      .status(201)
      .json({ message: 'Veterinario registrado con exito, revisa tu correo.' })
  } catch (err) {
    return next(err)
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

const confirmar = async (req, res, next) => {
  //- Validar Token
  const { token } = req.params
  const veterinario = await Veterinario.findOne({ token })
  console.log(veterinario)

  if (!veterinario) {
    const unauthorizedError = new UnauthorizedError()
    throw unauthorizedError
  }

  try {
    veterinario.token = null
    veterinario.confirmado = true
    await veterinario.save()
    return res.json({ message: 'Cuenta confirmada exitosamente.' })
  } catch (err) {
    return next(err)
  }
}

const login = async (req, res, next) => {
  const { email, password } = req.body
  const veterinario = await Veterinario.findOne({ email })

  try {
    if (!veterinario) {
      const notFoundError = new NotFoundError()
      notFoundError.name = 'INVALID_CREDENTIALS'
      notFoundError.isOperational = false
      throw notFoundError
    }

    //- Credentials Validations
    const comprobarPassword = await veterinario.comprobarPassword(password)
    if (!comprobarPassword) {
      const notFoundError = new NotFoundError()
      notFoundError.name = 'INVALID_CREDENTIALS'
      notFoundError.isOperational = false
      throw notFoundError
    }

    //- Token Payload
    const payload = {
      id: veterinario._id,
    }
    return res.json({ message: 'Auth ', token: generarJWT(payload) })
  } catch (err) {
    next(err)
  }
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

  // Token que se le va a enviar al cliente para validar contra la base de datos
  //- Se puede eliminar para produccion
  if (process.env.NODE_ENV === 'development') {
    console.log(resetToken)
  }

  try {
    //- Existe veterinario
    const veterinario = await Veterinario.findOne({ email })

    if (!veterinario) {
      const notFoundError = new NotFoundError()
      notFoundError.name = 'INVALID_CREDENTIALS'
      notFoundError.isOperational = false
      throw notFoundError
    }

    // If user exists, gen token
    const userId = new Types.ObjectId(veterinario._id)
    // Se crea una nueva instancia DB passwordReset
    const passwordReset = new PasswordReset({ userId })
    // Se hashea el token a travez del metodo statico del modelo y se guarda token hasheado en la DB
    passwordReset.tokenHash = PasswordReset.hashToken(resetToken)

    //- Eliminar de la base de datos cualquier otro token que el usuario tenga solicitado previa a esta.
    await PasswordReset.deleteMany({ userId, usedAt: null })

    // Se guarda el registro de la nueva solicitud del token en la DB
    await passwordReset.save()

    //- ENVIAR CORREO CON EL TOKEN AL CLIENTE
    const mailtrapResults = await emailOlvidePassword({
      token: resetToken,
      email,
      nombre: veterinario.nombre,
    })

    //- Se puede eliminar para produccion
    if (process.env.NODE_ENV === 'development') {
      console.log(mailtrapResults)
    }

    return res.status(200).json({
      message: 'Te hemos enviado un coreeo electronico.',
    })
  } catch (err) {
    next(err)
  }
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
