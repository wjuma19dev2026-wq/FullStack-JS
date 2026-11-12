export const ErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500
  let message = err.message || 'Error interno del servidor'
  const { status, stack, isOperational } = err

  // 2. Errores específicos de Mongoose
  if (err.name === 'CastError') {
    // ID con formato inválido (ej. ObjectId malformado)
    statusCode = 400
    message = `Recurso no encontrado. ID inválido: ${err.value}`
  }

  if (err.name === 'INVALID_CREDENTIALS') {
    statusCode = 401
    message = 'Invalid email or password'
  }

  if (err.name === 'CONFLICT') {
    statusCode = 409
    message = 'Email already exists'
  }

  if (err.name === 'TOKEN_INVALID') {
    statusCode = 401
    message = 'Invalid authentication token'
  }

  if (err.name === 'TOKEN_EXPIRED') {
    statusCode = 401
    message = 'Authentication token has expired'
  }

  if (err.name === 'ValidationError') {
    // Datos que no pasan la validación del schema
    statusCode = 400
    const errores = Object.values(err.errors).map(e => e.message)
    message = `Datos inválidos: ${errores.join(', ')}`
  }

  if (err.code === 11000) {
    // Duplicado de clave única (ej. email ya registrado)
    statusCode = 400
    const campo = Object.keys(err.keyValue)[0]
    message = `El campo '${campo}' ya existe. Usa otro valor.`
  }

  // 3. Errores de JWT
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401
    message = 'Token inválido. Inicia sesión de nuevo.'
  }

  if (err.name === 'TokenExpiredError') {
    statusCode = 401
    message = 'Tu sesión ha expirado. Inicia sesión de nuevo.'
  }

  // 4. Errores de Argon2 (como el que tuviste con 'pchstr')
  if (err.message?.includes('pchstr must be a non-empty string')) {
    statusCode = 500
    message = 'Error al verificar credenciales. Contacta al soporte.'
    // Aquí podrías incluso alertar a un servicio de monitoreo
  }

  // 5. Registro interno (siempre, con el error original completo)
  if (statusCode >= 500) {
    console.error('💥 ERROR DEL SERVIDOR:', err)
  } else {
    console.warn(`⚠️  WARNING DEL CLIENTE: ${err.message}`.yellow)
  }

  res.status(statusCode).json({
    message,
    status,
    statusCode,
    ...(process.env.NODE_ENV === 'development' && { isOperational }),
    ...(process.env.NODE_ENV === 'development' && { stack }),
  })
}
