export const isAuth = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    //- Validar el token contra JWT
    const token = req.headers.authorization
    console.log(token)
    next()
  }

  // No hay tokon, mostrar error
  next()
}
