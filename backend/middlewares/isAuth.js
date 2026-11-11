import jwt from 'jsonwebtoken'

import Veterinario from '../models/veterinario.model.js'
import { UnauthorizedError } from '../utils/index.js'

export const isAuth = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.decode(token, process.env.JWT_SECRET)

      if (!decoded) {
        throw new Error()
      }

      const veterinario = await Veterinario.findById(decoded.id).select(
        '-password -token -confirmado',
      )
      req.veterinario = veterinario
      return next()
    } catch (error) {
      const tokenExpiredError = new UnauthorizedError()
      tokenExpiredError.isOperational = false
      tokenExpiredError.name = 'TokenExpiredError'
      return next(tokenExpiredError)
    }
  }

  // No hay tokon, mostrar error
  const jsonWebTokenError = new UnauthorizedError()
  jsonWebTokenError.name = 'JsonWebTokenError'
  jsonWebTokenError.isOperational = false
  return next(jsonWebTokenError)
}
