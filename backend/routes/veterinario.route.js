import { Router } from 'express'
import {
  getProfile,
  getVeterinarios,
  postProfile,
  postVeterinarios,
  confirmar,
} from '../controllers/veterinario.controller.js'
import { login } from '../controllers/auth.controller.js'
const router = Router()

router.get('/', getVeterinarios)

router.post('/', postVeterinarios)

router.post('/login', login)

router.get('/confirmar/:token', confirmar)

router.get('/profile', getProfile)

router.post('/profile', postProfile)

router.get('/login', login)

export default router
