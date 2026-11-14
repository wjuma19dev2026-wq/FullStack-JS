import jwt from 'jsonwebtoken'
import { environments } from '../utils/index.js'

export const generarJWT = payload => {
  return jwt.sign(payload, environments.client_secret, {
    expiresIn: '1h',
  })
}
