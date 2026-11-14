import jwt from 'jsonwebtoken'

import Veterinario from '../models/veterinario.model.js'
import { UnauthorizedError, environments } from '../utils/index.js'

export const isAuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const secret = process.env.JWT_SECRET
      const token = req.headers.authorization.split(' ')[1]
      const payload = jwt.verify(token, environments.client_secret)
      if (!payload) {
        const unauthorizedError = new UnauthorizedError(
          'El token de acceso ha expirado. Por favor, vuelve a solicitar uno.',
        )
        unauthorizedError.name = 'TOKEN_INVALID'
        throw unauthorizedError
      }

      const decoded = jwt.decode(token, process.env.JWT_SECRET)
      if (!decoded) {
        const unauthorizedError = new UnauthorizedError(
          'El token de acceso ha expirado. Por favor, refresca tu sesión.',
        )
        unauthorizedError.name = 'TOKEN_EXPIRED'
        throw unauthorizedError
      }

      const veterinario = await Veterinario.findById(decoded.id).select(
        '-password -token -confirmado',
      )
      req.veterinario = veterinario
      return next()
    } catch (err) {
      if (err.message === 'invalid signature') {
        const unauthorizedError = new UnauthorizedError('Token inválido.')
        return next(unauthorizedError)
      }
      if (err.message === 'jwt expired') {
        const unauthorizedError = new UnauthorizedError('Token ha expirado.')
        return next(unauthorizedError)
      }
      return next(err)
    }
  } else {
    // No hay tokon, mostrar error
    const err = new UnauthorizedError(
      'Token de autenticación no proporcionado.',
    )
    err.name = 'JsonWebTokenError'
    return next(err)
  }
}
